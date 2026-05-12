FROM python:3.11-slim-bullseye

# Install system dependencies (Java 17, GCC, G++)
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk-slim \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables for Java
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH=$PATH:$JAVA_HOME/bin

WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port 8000
EXPOSE 8000

# Run the application using the port assigned by Render
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
