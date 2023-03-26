const client = require("./client");

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const { rows: [ routineActivity ] } = await client.query(`
    INSERT INTO routine_activities("routineId", "activityId", count, duration)
    VALUES($1, $2, $3, $4)
    RETURNING *;
  `, [routineId, activityId, count, duration]);
  return routineActivity;
  } catch (error) {
    console.error('Failed to add activity to routine');
    throw error;
  }
}

async function getRoutineActivityById(id) {
  try {

    if(!id){
      return null;
    }

    const { rows: routineactivity } = (`
      SELECT routine_activities.*
      FROM routine_activities
      WHERE routine_activities.id = $1;
      `, [id]);
  } catch(error){
    console.error('get routine activity by id error');
    throw error;
  }
}

async function getRoutineActivitiesByRoutine({ id }) {
    try {
      if (!id) {
        return null;
      }
      const { rows: routineactivity } = (`
        SELECT routine_activities.*
        FROM routine_activities
        WHERE routine_activities."routineId"=$1;
        `, [id]);
    } catch(error) {
      console.error ('get routineactivity by routine');
      throw error;
    }
}

async function updateRoutineActivity({ id, ...fields }) {
  try{
    const { rows: activity } = (`
      UPDATE activities
      SET activities.* = $2
      WHERE activities.id = $1
    `, [id, ...fields])
  } catch(error){
    console.error('update routine activity error');
    throw error;
  }
}

async function destroyRoutineActivity(id) {}

async function canEditRoutineActivity(routineActivityId, userId) {}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
