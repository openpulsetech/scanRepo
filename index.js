const core = require('@actions/core');
const github = require('@actions/github');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Checkout the repository
  execSync('git checkout HEAD', { stdio: 'inherit' });

  // Function to recursively get all files in a directory
  function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        fileList = getAllFiles(filePath, fileList);
      } else {
        fileList.push(filePath);
      }
    });
    return fileList;
  }

  // Get all files in the repository
  const allFiles = getAllFiles('.');
  
  // Filter .xml files
  const xmlFiles = allFiles.filter(file => file.endsWith('.xml'));

  // Print .xml files
  if (xmlFiles.length > 0) {
    console.log('XML Files:');
    xmlFiles.forEach(file => console.log(file));
  } else {
    console.log('No XML files found.');
  }
  
} catch (error) {
  core.setFailed(`Action failed with error ${error.message}`);
}
