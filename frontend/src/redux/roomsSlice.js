import { createSlice } from "@reduxjs/toolkit";

/**
 * Group jam rooms (API list) + which context drives shared playback (DM or group).
 * @typedef {{ kind: 'dm', peerId: string, label: string } | { kind: 'group', roomId: string, label: string, groupId: string }} ActiveJam
 */
const initialState = {
  list: [],
  activeJam: null,
  selectedRoomChat: null,
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRoomsList: (state, action) => {
      state.list = Array.isArray(action.payload) ? action.payload : [];
    },
    upsertRoom: (state, action) => {
      const room = action.payload;
      if (!room?._id) return;
      const index = state.list.findIndex((entry) => String(entry._id) === String(room._id));
      if (index === -1) state.list.unshift(room);
      else state.list[index] = room;
      if (state.selectedRoomChat && String(state.selectedRoomChat._id) === String(room._id)) {
        state.selectedRoomChat = room;
      }
      if (state.activeJam?.kind === "group" && String(state.activeJam.groupId) === String(room._id)) {
        state.activeJam = {
          ...state.activeJam,
          groupId: String(room._id),
          roomId: `group:${room._id}`,
          label: room.name,
        };
      }
    },
    removeRoom: (state, action) => {
      const roomId = String(action.payload);
      state.list = state.list.filter((entry) => String(entry._id) !== roomId);
      if (state.selectedRoomChat && String(state.selectedRoomChat._id) === roomId) {
        state.selectedRoomChat = null;
      }
      if (state.activeJam?.kind === "group" && String(state.activeJam.groupId) === roomId) {
        state.activeJam = null;
      }
    },
    setActiveJam: (state, action) => {
      state.activeJam = action.payload;
    },
    clearActiveJam: (state) => {
      state.activeJam = null;
    },
    setSelectedRoomChat: (state, action) => {
      state.selectedRoomChat = action.payload;
    },
    clearSelectedRoomChat: (state) => {
      state.selectedRoomChat = null;
    },
    resetRooms: () => ({ ...initialState }),
  },
});

export const {
  setRoomsList,
  upsertRoom,
  removeRoom,
  setActiveJam,
  clearActiveJam,
  setSelectedRoomChat,
  clearSelectedRoomChat,
  resetRooms,
} = roomsSlice.actions;

export default roomsSlice.reducer;
