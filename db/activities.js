const client = require('./client');

// database functions
async function createActivity({ name, description }) {
  // return the new activity
  try {
    const { rows: [activity] } = await client.query(`
      INSERT INTO activities(name, description)
      VALUES($1, $2) 
      RETURNING *; 
      `, [name, description]);

    return activity;
  } catch (error) {
    console.error("Failed to create activity!");
    throw error;
  }
}

async function getAllActivities() {
  // select and return an array of all activities
  try {
    const { rows: activities } = await client.query(`
        SELECT * FROM activities;
    `);
    return activities;
  } catch (error) {
    console.error('getAllActivities error');
    throw error;
  }
}

async function getActivityById(id) {

  try {
    if (!id) {
      return null;
    };
    const { rows: [activityById] } = await client.query(`    
          SELECT * FROM activities WHERE id = $1;
          `, [id]);

    return activityById;

  } catch (error) {
    console.error('get activity by id error');
    throw error;
  }
}

async function getActivityByName(name) {

  try {
    if (!name) {
      return null;
    }
    const { rows: [activityByName] } = await client.query(`
      SELECT activities.* FROM activities WHERE activities.name = $1
      `, [name]);

    return activityByName;

  } catch (error) {
    console.error('get activity by name error');
    throw error;
  }
}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {
  //join activity row to routines
  try {
    const { rows: [activitiesToRoutines] } = await client.query(`
      SELECT activites.*, routine_activities.* FROM activities
      JOIN activities ON routine_activities."activityId" = activities`);

    return activitiesToRoutines;

  } catch (error) {
    console.error('attachActivitiesToRoutines error');
    throw error;
  }
}

async function updateActivity({ id, ...fields }) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
  try {

    if (!fields.description) {
      const { rows: [updatedActivityName] } = await client.query(`
        UPDATE activities SET name = $2 WHERE id = $1 RETURNING *;
      `, [id, fields.name])

      return updatedActivityName;

    }
    if (!fields.name) {
      const { rows: [updatedActivityDescription] } = await client.query(`
        UPDATE activities SET description = $2 WHERE id = $1 RETURNING *;
    `, [id, fields.description])

      return updatedActivityDescription;

    }
  } catch (error) {
    console.error('update routine error');
    throw error;
  }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
