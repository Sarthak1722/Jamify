import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setotherUsers } from "../redux/userSlice.js";
import { useSocket } from "../context/SocketContext.jsx";
import apiClient from "../api/client.js";

/**
 * Load directory once and again after Socket.IO reconnects so the inbox stays fresh.
 */
const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const { socket } = useSocket();

  const fetchOtherUsers = useCallback(async () => {
    try {
      const res = await apiClient.get("/api/v1/user");
      dispatch(setotherUsers(res.data));
    } catch (error) {
      console.error("fetchOtherUsers failed", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchOtherUsers();
  }, [fetchOtherUsers]);

  useEffect(() => {
    if (!socket) return;
    const onConnect = () => fetchOtherUsers();
    socket.on("connect", onConnect);
    return () => socket.off("connect", onConnect);
  }, [socket, fetchOtherUsers]);
};

export default useGetOtherUsers;
