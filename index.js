const core = require("@actions/core");
const github = require("@actions/github");
const action = require("./src/action");

async function run() {
  try {
    const token = github.token;
    const { owner, repo } = github.context.repo;

    await action.run(token, owner, repo);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
