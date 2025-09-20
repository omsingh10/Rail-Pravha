// ESM version of the test runner
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("Creating a simple Vite demo app to test the utils.ts functionality...");

// Create a simple demo component that uses the cn function
const runTsc = spawn('npx', ['tsc', 
  '--esModuleInterop', 
  '--skipLibCheck', 
  '--module', 'esnext',
  '--moduleResolution', 'node',
  '--target', 'es2020',
  '--jsx', 'react',
  '--outDir', './dist',
  './src/lib/utils.ts', 
  './src/scripts/test-utils.ts'
], {
  stdio: 'inherit',
  shell: true
});

runTsc.on('close', code => {
  if (code !== 0) {
    console.error(`TypeScript compilation failed with code ${code}`);
    return;
  }
  
  console.log("\nCompilation successful! Now running the test...\n");
  
  // Run the compiled JavaScript
  const runNode = spawn('node', ['./dist/scripts/test-utils.js'], {
    stdio: 'inherit',
    shell: true
  });
  
  runNode.on('close', code => {
    if (code !== 0) {
      console.error(`Test execution failed with code ${code}`);
    } else {
      console.log("\nTests completed successfully!");
    }
  });
});