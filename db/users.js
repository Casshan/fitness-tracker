const client = require("./client");

// database functions

// user functions
async function createUser({ username, password }) {
  try {
    const { rows: [ user ] } = await client.query(`
      INSERT INTO users(username, password) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `, [username, password]);

    return user;
  } catch (error) {
    console.error("Error creating user!");
    throw error;
  }
}

async function getUser({ username, password }) {

}

async function getUserById(userId) {
    try {
      const { rows : [user]} = await client.query(`
      SELECT id, username, password
      FROM users
      WHERE id=${userId}`);

      if (!user) {
        return null
      }

      return user;
    } catch (error) {
      console.error('failed to find user by id');
      throw error;
      
    }

    

}

async function getUserByUsername(userName) {

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
