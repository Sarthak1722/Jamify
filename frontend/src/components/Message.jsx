import { useSelector } from "react-redux";
import React from "react";
import { IoCheckmark, IoTimeOutline } from "react-icons/io5";
import { normalizeUserId } from "../utils/messageConversation.js";

function formatMessageTime(value) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function OutgoingStatus({ message }) {
  if (message._optimistic && message.sendState === "sending") {
    return (
      <span className="flex items-center justify-end gap-1 text-[10px] text-zinc-400">
        <IoTimeOutline className="text-xs" />
        Sending…
      </span>
    );
  }

  const read = Boolean(message.readAt);
  const delivered = Boolean(message.deliveredAt);

  if (read) {
    return (
      <span className="flex items-center justify-end gap-px text-[11px] font-semibold text-sky-400" title="Read">
        <IoCheckmark />
        <IoCheckmark className="-ml-1" />
      </span>
    );
  }
  if (delivered) {
    return (
      <span className="flex items-center justify-end gap-px text-[11px] text-zinc-400" title="Delivered">
        <IoCheckmark />
        <IoCheckmark className="-ml-1" />
      </span>
    );
  }
  return (
    <span className="flex justify-end text-[11px] text-zinc-500" title="Sent">
      <IoCheckmark />
    </span>
  );
}

function GroupOutgoingStatus({ message, authUserId, roomMembers = [] }) {
  if (message._optimistic && message.sendState === "sending") {
    return (
      <span className="flex items-center justify-end gap-1 text-[10px] text-zinc-400">
        <IoTimeOutline className="text-xs" />
        Sending…
      </span>
    );
  }

  const deliveredCount = (message.deliveredTo || []).filter(
    (entry) => normalizeUserId(entry.userId) !== normalizeUserId(authUserId),
  ).length;
  const memberNameMap = new Map(
    roomMembers.map((member) => [normalizeUserId(member?._id), member?.fullName || "Someone"]),
  );
  const readNames = (message.readBy || [])
    .filter((entry) => normalizeUserId(entry.userId) !== normalizeUserId(authUserId))
    .map((entry) => memberNameMap.get(normalizeUserId(entry.userId)) || "Someone");

  if (readNames.length > 0) {
    return (
      <span className="flex items-center justify-end gap-1 text-[11px] font-semibold text-sky-400" title="Read">
        <IoCheckmark />
        {`Seen by ${readNames.join(", ")}`}
      </span>
    );
  }
  if (deliveredCount > 0) {
    return (
      <span className="flex items-center justify-end gap-1 text-[11px] text-zinc-400" title="Delivered">
        <IoCheckmark />
        Delivered
      </span>
    );
  }
  return (
    <span className="flex justify-end text-[11px] text-zinc-500" title="Sent">
      <IoCheckmark />
      Sent
    </span>
  );
}

const Message = ({ message }) => {
  const { authUser, selectedUser } = useSelector((store) => store.user);
  const selectedRoomChat = useSelector((store) => store.rooms.selectedRoomChat);
  const isSender = normalizeUserId(message.senderID) === normalizeUserId(authUser?._id);
  const isGroupThread = Boolean(selectedRoomChat?._id);
  const timeLabel = formatMessageTime(message.createdAt);
  const senderProfile =
    typeof message.senderID === "object" && message.senderID !== null ? message.senderID : null;
  const senderName = isSender
    ? authUser?.fullName
    : senderProfile?.fullName || selectedUser?.fullName || "Unknown";
  const senderPhoto = isSender
    ? authUser?.profilePhoto
    : senderProfile?.profilePhoto || selectedUser?.profilePhoto;

  return (
    <div className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={senderPhoto}
            alt=""
          />
        </div>
      </div>

      <div className="chat-header text-xs text-zinc-500">
        {isGroupThread ? senderName : isSender ? authUser.fullName : selectedUser?.fullName}
        {timeLabel ? <time className="ml-2 text-[10px] uppercase tracking-[0.18em]">{timeLabel}</time> : null}
      </div>

      <div
        className={`chat-bubble bg-linear-to-r
          ${
            isSender
              ? "from-violet-500 to-indigo-500"
              : "from-indigo-500 to-violet-500"
          }
        text-white
        px-4
        py-2.5
        rounded-2xl
        text-sm
        max-w-[20rem]
        leading-6
        backdrop-blur-md`}
      >
        {message.message}
      </div>

      <div className="chat-footer min-h-[14px] opacity-90">
        {isSender ? (
          isGroupThread ? (
            <GroupOutgoingStatus
              message={message}
              authUserId={authUser?._id}
              roomMembers={selectedRoomChat?.members || []}
            />
          ) : (
            <OutgoingStatus message={message} />
          )
        ) : null}
      </div>
    </div>
  );
};

export default Message;
