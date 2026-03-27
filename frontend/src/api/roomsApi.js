import apiClient from "./client.js";

export async function listRooms() {
  const { data } = await apiClient.get("/api/v1/rooms");
  return Array.isArray(data) ? data : [];
}

export async function createRoom({ name, memberIds }) {
  const { data } = await apiClient.post("/api/v1/rooms", { name, memberIds });
  return data;
}

export async function getRoom(id) {
  const { data } = await apiClient.get(`/api/v1/rooms/${id}`);
  return data;
}
