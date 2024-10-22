// app/utils/auth.js
export async function getUserFromRequest(request) {
  // Simulating user extraction from session/token
  const url = new URL(request.url);
  const role = url.searchParams.get("role") || "faculty"; // Default role
  return { role };
}
