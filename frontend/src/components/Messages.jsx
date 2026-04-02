import React, { useEffect, useRef, useCallback } from "react";
import Message from "./Message.jsx";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";

const Messages = () => {
  const { loadingInitial, loadingOlder, loadOlder, hasMoreOlder } = useGetMessages();
  const messages = useSelector((store) => store.messages.messages);
  const selectedRoomChat = useSelector((store) => store.rooms.selectedRoomChat);
  const bottomRef = useRef(null);
  const scrollRef = useRef(null);
  const nearBottomRef = useRef(true);
  const olderGuardRef = useRef(false);

  useEffect(() => {
    if (nearBottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const threshold = 120;
    nearBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

    if (
      el.scrollTop < 90 &&
      hasMoreOlder &&
      !loadingOlder &&
      !olderGuardRef.current
    ) {
      olderGuardRef.current = true;
      const prevHeight = el.scrollHeight;
      loadOlder()
        .then(() => {
          requestAnimationFrame(() => {
            const box = scrollRef.current;
            if (box) box.scrollTop = box.scrollHeight - prevHeight;
          });
        })
        .finally(() => {
          olderGuardRef.current = false;
        });
    }
  }, [loadOlder, loadingOlder, hasMoreOlder]);

  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className="flex min-h-0 flex-1 flex-col space-y-4 overflow-y-auto p-6"
    >
      {loadingOlder ? (
        <p className="text-center text-xs text-zinc-500">Loading older messages…</p>
      ) : null}
      {!loadingOlder && hasMoreOlder && messages.length > 0 ? (
        <p className="text-center text-[10px] text-zinc-600">Scroll up for older</p>
      ) : null}
      {loadingInitial ? (
        <p className="text-center text-sm text-zinc-400">Loading messages…</p>
      ) : null}
      {!loadingInitial && messages.length === 0 ? (
        <div className="mx-auto my-auto max-w-sm rounded-3xl border border-white/[0.08] bg-white/[0.03] px-6 py-8 text-center">
          <p className="text-sm font-semibold text-white">No messages yet</p>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            {selectedRoomChat
              ? "Start the group with a quick hello or drop a track for everyone."
              : "Start the conversation with something small. A song recommendation works well."}
          </p>
        </div>
      ) : null}
      {messages?.map((m) => (
        <Message key={m.clientMessageId || m._id} message={m} />
      ))}
      <div ref={bottomRef} aria-hidden />
    </div>
  );
};

export default Messages;
