export const login = user => (
  $.ajax({
    method: "POST",
    url: "api/session",
    data: user
  })
);
