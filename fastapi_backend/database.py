import os
import json
import asyncio
from copy import deepcopy
from datetime import datetime
from types import SimpleNamespace
from uuid import uuid4

from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
os.makedirs(DATA_DIR, exist_ok=True)

client = AsyncIOMotorClient(MONGO_URI, serverSelectionTimeoutMS=800)
db = client.java_palani_db
storage_status = {
    "mode": "mongodb",
    "healthy": False,
    "message": "MongoDB not checked yet",
}


def _json_default(value):
    if isinstance(value, datetime):
        return value.isoformat()
    return str(value)


class JsonCollection:
    def __init__(self, name: str):
        self.path = os.path.join(DATA_DIR, f"{name}.json")
        self._lock = asyncio.Lock()
        if not os.path.exists(self.path):
            with open(self.path, "w", encoding="utf-8") as handle:
                json.dump([], handle)

    async def _read(self):
        async with self._lock:
            try:
                with open(self.path, "r", encoding="utf-8") as handle:
                    return json.load(handle)
            except (json.JSONDecodeError, FileNotFoundError):
                return []

    async def _write(self, records):
        async with self._lock:
            with open(self.path, "w", encoding="utf-8") as handle:
                json.dump(records, handle, indent=2, default=_json_default)

    async def find_one(self, query: dict):
        records = await self._read()
        for record in records:
            if all(record.get(key) == value for key, value in query.items()):
                return deepcopy(record)
        return None

    async def insert_one(self, document: dict):
        records = await self._read()
        item = deepcopy(document)
        item["_id"] = item.get("_id", uuid4().hex)
        records.append(item)
        await self._write(records)
        return SimpleNamespace(inserted_id=item["_id"])


class ResilientCollection:
    def __init__(self, mongo_collection, fallback_collection: JsonCollection):
        self.mongo_collection = mongo_collection
        self.fallback_collection = fallback_collection

    async def find_one(self, query: dict):
        if storage_status["mode"] == "mongodb":
            try:
                return await asyncio.wait_for(self.mongo_collection.find_one(query), timeout=1.2)
            except Exception as exc:
                use_local_storage(f"MongoDB read failed: {exc}")
        return await self.fallback_collection.find_one(query)

    async def insert_one(self, document: dict):
        if storage_status["mode"] == "mongodb":
            try:
                return await asyncio.wait_for(self.mongo_collection.insert_one(document), timeout=1.2)
            except Exception as exc:
                use_local_storage(f"MongoDB write failed: {exc}")
        return await self.fallback_collection.insert_one(document)


def use_local_storage(message: str):
    storage_status.update({
        "mode": "local-json",
        "healthy": True,
        "message": message,
    })


async def init_database():
    try:
        await asyncio.wait_for(client.admin.command("ping"), timeout=1.2)
        storage_status.update({
            "mode": "mongodb",
            "healthy": True,
            "message": "MongoDB connected",
        })
    except Exception as exc:
        use_local_storage(f"MongoDB unavailable, using local JSON storage: {exc}")
    return storage_status


def get_storage_status():
    return dict(storage_status)


users_collection = ResilientCollection(db.get_collection("users"), JsonCollection("users"))
activities_collection = ResilientCollection(db.get_collection("activities"), JsonCollection("activities"))
