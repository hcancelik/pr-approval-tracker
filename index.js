const core = require("@actions/core");
const { context: github } = require("@actions/github");
const Action = require("./src/action");

async function run() {
  try {
    const token = core.getInput("SECRET_TOKEN");
    const { owner, repo } = github.repo;

    let pr = null;

    if (github.payload && github.payload.pull_request) {
      pr = github.payload.pull_request;
    }

    const action = new Action(token, owner, repo);

    await action.run(pr);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
