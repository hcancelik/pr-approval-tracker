const core = require("@actions/core");
const { context: github } = require("@actions/github");
const action = require("./src/action");

async function run() {
  try {
    const token = core.getInput("SECRET_TOKEN");
    const { owner, repo,  } = github.repo;
    const { ref } = github;

    core.info(`Ref is ${ref}`);
    core.info(`G is ${JSON.stringify(github)}`);

    await action.run(token, owner, repo);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
