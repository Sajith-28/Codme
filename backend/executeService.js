const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { v4: uuidv4 } = require('uuid');

const TEMP_DIR = path.join(__dirname, 'temp');

if (!fsSync.existsSync(TEMP_DIR)) {
  fsSync.mkdirSync(TEMP_DIR);
}

const cleanup = async (dirPath) => {
  try {
    await fs.rm(dirPath, { recursive: true, force: true });
  } catch (e) {
    console.error('Failed to clean up:', dirPath);
  }
};

const executeJava = async (code, input, socket) => {
  const runId = uuidv4();
  const runDir = path.join(TEMP_DIR, runId);

  await fs.mkdir(runDir);
  const filePath = path.join(runDir, 'Main.java');
  await fs.writeFile(filePath, code);

  socket.emit('status', 'Compiling...');

  // Convert Windows path to a format Docker for Windows likes, or just use absolute path
  // Since we are running in Windows, path.resolve(runDir) works with Docker Desktop usually.
  const volumePath = path.resolve(runDir);

  // Compile Phase
  const compileProcess = spawn('docker', [
    'run',
    '--rm',
    '-v',
    `${volumePath}:/app`,
    '-w',
    '/app',
    'openjdk:21-jdk-slim',
    'javac',
    'Main.java'
  ]);

  let compileError = '';

  compileProcess.stderr.on('data', (data) => {
    compileError += data.toString();
  });

  await new Promise((resolve) => {
    compileProcess.on('close', (code) => {
      resolve(code);
    });
  });

  if (compileError) {
    socket.emit('output', { type: 'stderr', data: compileError });
    socket.emit('status', 'Compilation Error');
    await cleanup(runDir);
    return;
  }

  socket.emit('status', 'Running...');
  socket.emit('clear'); // Clear output for run phase

  // Run Phase
  const startTime = process.hrtime();
  
  const runProcess = spawn('docker', [
    'run',
    '--rm',
    '-i',
    '--memory=512m',
    '--cpus=1',
    '--network=none',
    '-v',
    `${volumePath}:/app`,
    '-w',
    '/app',
    'openjdk:21-jdk-slim',
    'java',
    'Main'
  ]);

  if (input) {
    runProcess.stdin.write(input);
    runProcess.stdin.end();
  }

  runProcess.stdout.on('data', (data) => {
    socket.emit('output', { type: 'stdout', data: data.toString() });
  });

  runProcess.stderr.on('data', (data) => {
    socket.emit('output', { type: 'stderr', data: data.toString() });
  });

  // Timeout logic to prevent infinite loops
  const timeout = setTimeout(() => {
    runProcess.kill();
    socket.emit('output', { type: 'stderr', data: '\nExecution Timed Out (10s)' });
    socket.emit('status', 'Timeout');
    cleanup(runDir);
  }, 10000);

  runProcess.on('close', (code) => {
    clearTimeout(timeout);
    const diff = process.hrtime(startTime);
    const executionTimeMs = (diff[0] * 1000 + diff[1] / 1000000).toFixed(2);
    
    socket.emit('metrics', { time: executionTimeMs, memory: 'N/A' }); // Docker stats can be used for memory if needed
    
    if (code !== 0 && code !== null) {
      socket.emit('status', `Exited with code ${code}`);
    } else {
      socket.emit('status', 'Completed');
    }
    
    cleanup(runDir);
  });
};

module.exports = { executeJava };
