const { registerUser } = require("./register");

test("registers a user correctly", () => {
  const user = registerUser("Ruhul", "test@example.com");

  expect(user.username).toBe("Ruhul");
  expect(user.email).toBe("test@example.com");
});
