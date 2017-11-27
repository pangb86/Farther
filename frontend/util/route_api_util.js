export const fetchRoutes = () => (
  $.ajax({
    method: "GET",
    url: "/api/routes"
  })
);

export const fetchSingleRoute = (routeId) => (
  $.ajax({
    method: "GET",
    url: `/api/routes/${routeId}`
  })
);

export const createRoute = (route) => (
  $.ajax({
    method: "POST",
    url: "api/routes",
    data: route
  })
);

export const deleteRoute = (routeId) => (
  $.ajax({
    method: "DELETE",
    url: `/api/routes/${routeId}`
  })
);
