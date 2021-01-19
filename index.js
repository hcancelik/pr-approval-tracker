const core = require("@actions/core");
const github = require("@actions/github");
const action = require("./src/action");

async function run() {
  try {
    const token = core.getInput("github_token");
    const owner = github.repo.owner;
    const repo = github.repo.repo;

    await action.run(token, owner, repo);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
