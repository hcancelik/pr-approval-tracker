test("true is true", async () => {
  console.log(`github token: ${process.env.TEST_KEY}`);

  expect(true).toBeTruthy();
});
