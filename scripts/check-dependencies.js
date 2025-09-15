#!/usr/bin/env node

/**
 * LibreChat Dependency Health Check Script
 * Helps identify and fix common dependency issues
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 LibreChat Dependency Health Check Starting...\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json') || !fs.existsSync('api/package.json')) {
  console.error('❌ This script must be run from the LibreChat root directory');
  process.exit(1);
}

const workspaces = ['api', 'client', 'packages/data-provider', 'packages/data-schemas', 'packages/api', 'packages/client'];

async function checkWorkspace(workspace) {
  console.log(`📦 Checking workspace: ${workspace}`);
  
  if (!fs.existsSync(path.join(workspace, 'package.json'))) {
    console.log(`⚠️  Package.json not found in ${workspace}, skipping...`);
    return;
  }

  try {
    // Check for missing dependencies
    execSync(`cd ${workspace} && npm ls --depth=0`, { stdio: 'pipe' });
    console.log(`✅ ${workspace}: All dependencies resolved`);
  } catch (error) {
    console.log(`⚠️  ${workspace}: Missing dependencies detected`);
    
    try {
      console.log(`🔧 Installing missing dependencies for ${workspace}...`);
      execSync(`cd ${workspace} && npm install --legacy-peer-deps`, { stdio: 'inherit' });
      console.log(`✅ ${workspace}: Dependencies fixed`);
    } catch (installError) {
      console.log(`❌ ${workspace}: Failed to fix dependencies`);
    }
  }
}

async function runHealthCheck() {
  // Check root workspace
  console.log('📦 Checking root workspace dependencies...');
  try {
    execSync('npm ls --depth=0', { stdio: 'pipe' });
    console.log('✅ Root: All dependencies resolved\n');
  } catch (error) {
    console.log('⚠️  Root: Missing dependencies detected');
    try {
      console.log('🔧 Installing root dependencies...');
      execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
      console.log('✅ Root: Dependencies fixed\n');
    } catch (installError) {
      console.log('❌ Root: Failed to fix dependencies\n');
    }
  }

  // Check each workspace
  for (const workspace of workspaces) {
    await checkWorkspace(workspace);
  }

  console.log('\n🏥 Health Check Summary:');
  console.log('- Run this script periodically to catch dependency issues early');
  console.log('- If nodemon issues persist, use: npm run backend:dev:direct');
  console.log('- For Node.js native watching: npm run backend:dev:watch');
  
  // Check for security vulnerabilities
  console.log('\n🔒 Security Check:');
  try {
    execSync('npm audit --audit-level=high', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️  Security vulnerabilities found. Run: npm audit fix');
  }

  console.log('\n✨ Dependency health check completed!');
}

runHealthCheck().catch(console.error);