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
      className="flex min-h-0 flex-1 flex-col space-y-3 overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(36,69,52,0.16),transparent_28%)] px-3 py-4 pb-2 sm:space-y-4 sm:p-6"
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
        <div className="mx-auto my-auto max-w-sm rounded-[30px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(20,20,21,0.88),rgba(13,13,14,0.82))] px-6 py-8 text-center shadow-[0_18px_45px_rgba(0,0,0,0.16)]">
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
