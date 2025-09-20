// Import the required modules first
const path = require('path');
const { execSync } = require('child_process');

// First, compile the TypeScript files to JavaScript
try {
  console.log("Compiling TypeScript files...");
  execSync('npx tsc --allowJs --esModuleInterop --skipLibCheck src/lib/utils.ts src/scripts/test-utils.ts --outDir dist', { 
    stdio: 'inherit' 
  });
  
  console.log("\nCompilation successful! Now running the test...\n");
  
  // Now try to run the compiled JavaScript
  // We need to modify how we import the modules since the compiled JS will be in CommonJS format
  console.log("Test results:");
  execSync('node dist/scripts/test-utils.js', { 
    stdio: 'inherit' 
  });
} catch (error) {
  console.error("Error:", error.message);
}