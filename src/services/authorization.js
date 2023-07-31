import { mutate, query } from "@/db";

export async function createUser({ name, email, hashed_password }) {
  try {
    // Check if the user already exists based on the email
    const [existingUsers] = await query({
      query: "SELECT * FROM users WHERE email = :email",
      values: { email },
    });

    if (existingUsers) {
      // User already exists, throw an error
      throw new Error("User with this email already exists.");
    } else {
      // User does not exist, create a new user
      const results = await mutate({
        query:
          "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)",
        values: { name, email, password: hashed_password },
      });
      const insertedId = results[0].insertId;

      const newUser = {
        id: insertedId,
        name,
        email,
        password: hashed_password,
      };

      return newUser;
    }
  } catch (error) {
    throw Error(error.message);
  }
}

export async function findUserByEmail(email) {
  try {
    // Query the database to find the user with the provided email
    const results = await query({
      query: "SELECT * FROM users WHERE email = :email LIMIT 1",
      values: { email },
    });

    return results.length > 0 ? results[0] : null;
  } catch (error) {
    throw Error(error.message);
  }
}
