json.workout do
  json.extract! @workout, :id, :title, :description, :duration, :speed, :route_id, :created_at
end

json.route do
  json.extract! @workout.route, :id, :title, :polyline, :distance, :elevation, :created_at
end
