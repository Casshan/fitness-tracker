const client = require('./client');

// database functions
async function createActivity({ name, description }) {
  // return the new activity
  try {
    const { rows: [activity] } = await client.query(`
      INSERT INTO activities(name, description)
      VALUES($1, $2) 
      RETURNING *; 
      `, [ name, description ]);

      return activity; 
  } catch (error){ 
      console.error("Failed to create activity!");
      throw error;
  }
}

async function getAllActivities() {
  // select and return an array of all activities
  try {
    const { rows: [ activities ] } = await client.query(`

        SELECT activities.* 
        FROM activities;

    `)
    console.log(activities);
    return activities;

  } catch (error){
    console.error('getAllActivities error');
    throw error;

  }
  
}

async function getActivityById(id) {
  try{

    if(!id){
      return null;
    }

    const { rows: activitybyid } = (`
          
          SELECT activities.*
          FROM activities
          WHERE activities.id = $1

          `, [id]);
    // console.log(activitybyid);
    return activitybyid;

  } catch (error) {
    console.error('get activity by id error');
    throw error;
  }
 }

async function getActivityByName(name) { 

  try {
    
    if(!name){
      return null;
    }

    const { rows: activitybyname} = (`
      SELECT activities.* 
      FROM activities
      WHERE activities.name = $1
      `, [name]);
  } catch(error){
    console.error('get activity by name error');
    throw error;
  }
}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) { }

async function updateActivity({ id, ...fields }) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
