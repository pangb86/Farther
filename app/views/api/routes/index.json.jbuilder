@routes.each do |route|
  json.set! route.id do
    json.extract! route, :id, :title, :polyline, :distance, :elevation, :created_at
  end
end
