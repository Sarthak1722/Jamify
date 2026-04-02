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

export async function updateRoom(id, payload) {
  const { data } = await apiClient.patch(`/api/v1/rooms/${id}`, payload);
  return data;
}

export async function deleteRoom(id) {
  const { data } = await apiClient.delete(`/api/v1/rooms/${id}`);
  return data;
}

export async function addRoomMembers(id, memberIds) {
  const { data } = await apiClient.post(`/api/v1/rooms/${id}/members`, { memberIds });
  return data;
}

export async function leaveRoom(id) {
  const { data } = await apiClient.post(`/api/v1/rooms/${id}/leave`);
  return data;
}

export async function updateRoomAdmin(id, memberId, makeAdmin) {
  const { data } = await apiClient.post(`/api/v1/rooms/${id}/admins`, { memberId, makeAdmin });
  return data;
}
