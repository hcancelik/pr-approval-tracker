let token;

beforeAll(() => {
  token = process.env.TEST_KEY;
})

test("true is true", async () => {


  expect(true).toBeTruthy();
});
