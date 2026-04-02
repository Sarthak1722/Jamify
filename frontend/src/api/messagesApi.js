import apiClient from "./client.js";

const DEFAULT_LIMIT = 40;

/**
 * Persist a message. UI confirms via socket `newMessage` (with optional clientMessageId).
 */
export async function sendChatMessage(receiverId, text, clientMessageId) {
  const { data } = await apiClient.post(
    `/api/v1/message/send/${receiverId}`,
    { message: text, clientMessageId },
  );
  return data;
}

export async function sendGroupChatMessage(roomId, text, clientMessageId) {
  const { data } = await apiClient.post(
    `/api/v1/message/group/send/${roomId}`,
    { message: text, clientMessageId },
  );
  return data;
}

/**
 * Paginated thread: omit `before` for newest page; pass oldest message _id for older.
 */
export async function fetchMessagesPage(peerId, { before, limit = DEFAULT_LIMIT } = {}) {
  const params = { limit };
  if (before) params.before = before;
  const { data } = await apiClient.get(`/api/v1/message/${peerId}`, {
    params,
  });
  return {
    messages: Array.isArray(data.messages) ? data.messages : [],
    hasMore: Boolean(data.hasMore),
  };
}

export async function fetchGroupMessagesPage(roomId, { before, limit = DEFAULT_LIMIT } = {}) {
  const params = { limit };
  if (before) params.before = before;
  const { data } = await apiClient.get(`/api/v1/message/group/${roomId}`, { params });
  return {
    messages: Array.isArray(data.messages) ? data.messages : [],
    hasMore: Boolean(data.hasMore),
  };
}

export async function markGroupMessagesRead(roomId) {
  const { data } = await apiClient.post(`/api/v1/message/group/read/${roomId}`);
  return {
    messageIds: Array.isArray(data.messageIds) ? data.messageIds : [],
    userId: data.userId,
    readAt: data.readAt,
  };
}
