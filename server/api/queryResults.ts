export default defineEventHandler((event) => {
  const { page, param } = getQuery(event);

  return {
    text: "Test Endpoint for Search Query Pages",
    page,
    param,
    method: event.method
  };
});
