const client = require("./client");

async function createRoutine({ creatorId, isPublic, name, goal }) {

  try {

    const { rows: [routine] } = await client.query(`
    INSERT INTO routines("creatorId", "isPublic", name, goal)
    VALUES($1, $2, $3, $4)
    RETURNING *;
    `, [creatorId, isPublic, name, goal]);

    return routine;

  } catch (error) {

    console.error("Failed to create routine!")
    throw error;

  }
}

async function getRoutineById(id) {

  try {

    const { rows: [routine] } = await client.query(`
      SELECT routines.*
      FROM routines
      WHERE routines.id=$1`, [id]);

    if (!routine) {
      return null
    }
    return routine;
  } catch (error) {

    console.error('failed to find routine by id');
    throw error;

  }
}

async function getRoutinesWithoutActivities() {

  try {

    const { rows } = await client.query(`
      SELECT * FROM routines;
    `);
    return rows;
  } catch (error) {

    console.error('getroutineswithoutactiviers error');
    throw error;

  }
}

async function getAllRoutines() {

  try {

    const { rows: allroutines } = await client.query(`
      SELECT  routines.*, 
              users.username as "creatorName", 
              routine_activities.*, 
              activities.name as "activityName", 
              activities.description
      FROM routines
      JOIN routine_activities ON routines.id=routine_activities."routineId"
      JOIN users ON routines."creatorId"=users.id
      JOIN activities ON routine_activities."activityId"=activities.id;
    `);

    // console.log(allroutines);
    return allroutines;

  } catch (error) {

    console.error('getroutineswithoutactiviers error');
    throw error;

  }
}

async function getAllPublicRoutines() {

  try {

    const { rows: publicroutines } = await client.query(`
        SELECT  routines.*, 
                users.username as "creatorName", 
                routine_activities.*, 
                activities.name as "activityName", 
                activities.description
                FROM routines
        JOIN routine_activities ON routines.id=routine_activities."routineId"
        JOIN users ON routines."creatorId"=users.id
        JOIN activities ON routine_activities."activityId"=activities.id
        WHERE routines."isPublic"=true;
      `);

    console.log(publicroutines)
    return publicroutines;

  } catch (error) {

    console.error('all public routines error');
    throw error;

  }

}
async function getAllRoutinesByUser({ username }) {
  try {

    const { rows: routinesbyuser } = await client.query(`
      SELECT  routines.*, 
              users.username as "creatorName", 
              routine_activities.*, 
              activities.name as "activityName", 
              activities.description
      FROM routines
      JOIN routine_activities ON routines.id=routine_activities."routineId"
      JOIN users ON routines."creatorId"=users.id
      JOIN activities ON routine_activities."activityId"=activities.id
      WHERE users.username = $1;
    `, [username]);
    
    // console.log(routinesbyuser);
    return routinesbyuser;

  } catch (error) {

    console.error('get routines by user error');
    throw error;

  }

}
async function getPublicRoutinesByUser({ username }) {
  try {

    const { rows: publicroutinesbyuser } = await client.query(`
      SELECT  routines.*, 
              users.username as "creatorName", 
              routine_activities.*, 
              activities.name as "activityName", 
              activities.description
      FROM routines
      JOIN routine_activities ON routines.id=routine_activities."routineId"
      JOIN users ON routines."creatorId"=users.id
      JOIN activities ON routine_activities."activityId"=activities.id
      WHERE users.username = $1 AND routines."isPublic" = true;
    `, [username]);
    
    console.log(publicroutinesbyuser);
    return publicroutinesbyuser;

  } catch (error) {

    console.error('get public routines by user error');
    throw error;

  }
 }

async function getPublicRoutinesByActivity({ id }) { 
  try {

    const { rows: publicroutinesbyactivity } = await client.query(`
      SELECT  routines.*, 
              users.username as "creatorName", 
              routine_activities.*, 
              activities.name as "activityName", 
              activities.description
      FROM routines
      JOIN routine_activities ON routines.id=routine_activities."routineId"
      JOIN users ON routines."creatorId"=users.id
      JOIN activities ON routine_activities."activityId"=activities.id
      WHERE routines_activities."activityId" = $1 AND routines."isPublic" = true;
    `, [id]);
    
    console.log(publicroutinesbyactivity);
    return publicroutinesbyactivity;

  } catch (error) {

    console.error('get public routines by activity error');
    throw error;

  }
}

async function updateRoutine({ id, ...fields }) { }

async function destroyRoutine(id) { }

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
