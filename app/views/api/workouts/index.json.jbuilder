json.workouts do
  @workouts.each do |workout|
    json.set! workout.id do
      json.extract! workout, :id, :title, :description, :duration, :speed, :route_id, :created_at
    end
  end
end

json.routes do
  @workouts.each do |workout|
    json.set! workout.route.id do
      json.extract! workout.route, :id, :title, :polyline, :distance, :elevation, :created_at
    end
  end
end
