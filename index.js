const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path');
const { readdirSync } = require('fs')

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

try {
  // `who-to-greet` input defined in action metadata file
  const parentDir = core.getInput('parentDir');
  console.log(`Getting files from  ${parentDir}!`);
  const dirs = getDirectories(parentDir);
  core.setOutput("dirs", JSON.stringify(dirs));
  core.setOutput("hasData", (dirs.length > 0));
  core.setOutput("directoryCount", dirs.length);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
