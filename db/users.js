const client = require("./client");

// database functions

// user functions
async function createUser({ username, password }) {
  try {
    const { rows: [ user ] } = await client.query(`
      INSERT INTO users(username, password) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING id, username;
    `, [username, password]);

    return user;
  } catch (error) {
    console.error("Error creating user!");
    throw error;
  }
}

async function getUser({ username, password }) {
  
    if(!username || !password){
      return;
    }
    try{
      const user = await getUserByUsername(username);
      if(!user){
        return
      }
      if(password === user.password){
        delete user.password;
        return user;

      } 
      return;
      
      
    } catch (error) {
      console.error('get user error')
      throw error;
    }

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
      delete user.password;
      return user;
    } catch (error) {
      console.error('failed to find user by id');
      throw error;
      
    }

    

}

async function getUserByUsername(userName) {
  try {
    const { rows : [user]} = await client.query(`
    SELECT *
    FROM users
    WHERE username=$1`, [userName]);

    if(!user){
      return null;
    }
    

    return user;
  } catch (error) {
    console.error('failed to find user by name');
    throw error;
    
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
