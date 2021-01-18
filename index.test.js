const core = require("@actions/core");

test("true is true", async () => {
  const githubToken = core.getInput("github_token");

  core.info(`github token: ${githubToken}`);

  expect(true).toBeTruthy();
});
