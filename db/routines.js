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

    const { rows: routine } = await client.query(`
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
    
    const { rows: allRoutines } = await client.query(`
    
        SELECT  routine_activities.id, activities.id as "routineActivityId", routines."creatorId", routines.id as "routineId", 
          routines."isPublic", routines.name, routine_activities.duration, routine_activities.count, routines.goal,
          activities.name as "activityName", activities.description, users.username as "creatorName"
        FROM routine_activities
        JOIN routines ON routine_activities."routineId"=routines.id
        JOIN users ON routines."creatorId"=users.id
        JOIN activities ON routine_activities."activityId"=activities.id
        
    `);
    // console.log(allRoutines)
    return allRoutines;
  
``
  } catch (error) {

    console.error('getroutineswithoutactiviers error');
    throw error;

  }
}

async function getAllPublicRoutines() {

  try {

    const { rows: publicRoutines } = await client.query(`
        SELECT  routine_activities.id, routine_activities."activityId", routines."creatorId", routines.id as "routineId", 
                routines."isPublic", routines.name, routine_activities.duration, routine_activities.count, routines.goal,
                activities.name as "activityName", activities.description, users.username as "creatorName"
        FROM routine_activities
        JOIN routines ON routine_activities."routineId"=routines.id
        JOIN users ON routines."creatorId"=users.id
        JOIN activities ON routine_activities."activityId"=activities.id
        WHERE routines."isPublic"=true;
      `);

    console.log(publicRoutines)
    return publicRoutines;

  } catch (error) {

    console.error('all public routines error');
    throw error;

  }

}
async function getAllRoutinesByUser({ username }) {
  try {

    if(!username){
      return;
    }

    const { rows: routinesByUser } = await client.query(`
        SELECT  routine_activities.id, routine_activities."activityId", routines."creatorId", routines.id as "routineId", 
                routines."isPublic", routines.name, routine_activities.duration, routine_activities.count, routines.goal,
                activities.name as "activityName", activities.description, users.username as "creatorName"
        FROM routine_activities
        JOIN routines ON routine_activities."routineId"=routines.id
        JOIN users ON routines."creatorId"=users.id
        JOIN activities ON routine_activities."activityId"=activities.id
        WHERE users.username = $1;
    `, [username]);
    
    // console.log(routinesByUser);
    return routinesByUser;

  } catch (error) {

    console.error('get routines by user error');
    throw error;

  }

}
async function getPublicRoutinesByUser({ username }) {
  try {

    if(!username){
      return;
    }

    const { rows: publicroutinesbyuser } = await client.query(`
        SELECT  routine_activities.id, routine_activities."activityId", routines."creatorId", routines.id as "routineId", 
                routines."isPublic", routines.name, routine_activities.duration, routine_activities.count, routines.goal,
                activities.name as "activityName", activities.description, users.username as "creatorName"
        FROM routine_activities
        JOIN routines ON routine_activities."routineId"=routines.id
        JOIN users ON routines."creatorId"=users.id
        JOIN activities ON routine_activities."activityId"=activities.id
        WHERE users.username = $1 AND routines."isPublic"=true;
    `, [username]);
    
    // console.log(publicroutinesbyuser);
    return publicroutinesbyuser;

  } catch (error) {

    console.error('get public routines by user error');
    throw error;

  }
 }

async function getPublicRoutinesByActivity({ id }) { 
  try {

    if(!id){
      return;
    }

    const { rows: publicroutinesbyactivity } = await client.query(`
        SELECT  routine_activities.id, routine_activities."activityId", routines."creatorId", routines.id as "routineId", 
                routines."isPublic", routines.name, routine_activities.duration, routine_activities.count, routines.goal,
                activities.name as "activityName", activities.description, users.username as "creatorName"
        FROM routine_activities
        JOIN routines ON routine_activities."routineId"=routines.id
        JOIN users ON routines."creatorId"=users.id
        JOIN activities ON routine_activities."activityId"=activities.id
        WHERE routines_activities."activityId" = $1 AND routines."isPublic"=true;
    `, [id]);
    
    return publicroutinesbyactivity;

  } catch (error) {

    console.error('get public routines by activity error');
    throw error;

  }
}

async function updateRoutine({ id, ...fields }) {

  try {
    
    const { rows: [ routine ] } = await client.query (`
      UPDATE routines SET "isPublic" = $2, name = $3, goal = $4
      WHERE id = $1 RETURNING *;
    `, [id, fields.isPublic, fields.name, fields.goal])
    console.log(routine);
    return routine;
    
  } catch (error) {
    console.error('update routine error');
    throw error;

  }
 }
 
async function destroyRoutine(id) {

  try {

    const { rows: routineActivities } = await client.query (`
      DELETE FROM routine_activities WHERE routine_activities."routineId" = ${id} RETURNING *;
    `);
    
    const { rows: routines } = await client.query (`
    DELETE FROM routines WHERE routines.id = ${id} RETURNING *;
  `);
  
  } catch(error){
    console.error('xdfgadfgad');
    throw error;
  }  
 }

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
