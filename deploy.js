const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Deploying standalone-web-app to Vercel...\n');

try {
  // Change to the standalone-web-app directory
  process.chdir(__dirname);
  
  console.log('Current directory:', process.cwd());
  console.log('Deploying to Vercel (production)...\n');
  
  // Deploy to Vercel
  execSync('vercel --prod --yes --name standalone-web-app', {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  console.log('\n✅ Deployment successful!');
} catch (error) {
  console.error('\n❌ Deployment failed:', error.message);
  console.log('\nTrying alternative method...');
  
  try {
    // Try without --name flag
    execSync('vercel --prod --yes', {
      stdio: 'inherit',
      cwd: __dirname
    });
  } catch (err) {
    console.error('Alternative deployment also failed:', err.message);
    process.exit(1);
  }
}


