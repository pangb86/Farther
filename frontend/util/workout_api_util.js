export const fetchWorkouts = () => (
  $.ajax({
    method: "GET",
    url: "/api/workouts"
  })
);

export const fetchSingleWorkout = (workoutId) => (
  $.ajax({
    method: "GET",
    url: `/api/workouts/${workoutId}`
  })
);

export const createWorkout = (workout) => (
  $.ajax({
    method: "POST",
    url: "/api/workouts",
    data: workout
  })
);

export const updateWorkout = (workout) => (
  $.ajax({
    method: "PATCH",
    url: `/api/workouts/${workout.workouts.id}`,
    data: workout
  })
);

export const deleteWorkout = (workoutId) => (
  $.ajax({
    method: "DELETE",
    url: `/api/workouts/${workoutId}`
  })
);
