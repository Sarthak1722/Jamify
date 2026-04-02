import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ChatSidebar from "../components/ChatSidebar.jsx";
import MessageContainer from "../components/MessageContainer.jsx";
import useGetOtherUsers from "../hooks/useGetOtherUsers.jsx";
import { listRooms } from "../api/roomsApi.js";
import { setRoomsList } from "../redux/roomsSlice.js";

const MessagesPage = () => {
  const dispatch = useDispatch();
  useGetOtherUsers();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const rooms = await listRooms();
        if (!cancelled) {
          dispatch(setRoomsList(rooms));
        }
      } catch (error) {
        console.error("Failed to load rooms", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  return (
    <div className="flex min-h-0 min-w-0 flex-1">
      <ChatSidebar />
      <MessageContainer />
    </div>
  );
};

export default MessagesPage;
