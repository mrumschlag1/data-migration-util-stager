const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path');
const { readdirSync, existsSync } = require('fs')

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

try {
  const parentDir = core.getInput('parentDir');
  if(existsSync(parentDir)){
      console.log(`Getting files from  ${parentDir}!`);
      const dirs = getDirectories(process.env['GITHUB_WORKSPACE'] + '/' + parentDir);
      core.setOutput("dirs", JSON.stringify(dirs));
      core.setOutput("hasData", (dirs.length > 0));
      core.setOutput("directoryCount", dirs.length);
  }else{
    core.setOutput("hasData", false);
  }


  
} catch (error) {
  core.setFailed(error.message);
}
