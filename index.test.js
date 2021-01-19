const action = require("./src/action");

let token;
let owner = "hcancelik";
let repo = "pr-approval-tracker";

beforeAll(() => {
  token = process.env.GITHUB_TOKEN;
});

test("true is true", async () => {
  // TODO: Update tests

  expect(true).toBeTruthy();
});
