import mongoose from "mongoose";

const messageModel = new mongoose.Schema(
  {
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    roomID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GroupRoom",
      default: null,
    },
    message: {
      type: String,
      required: true,
    },
    /** Client-generated id for optimistic UI reconciliation */
    clientMessageId: {
      type: String,
      sparse: true,
    },
    /** Receiver's device was online when message was sent */
    deliveredAt: {
      type: Date,
      default: null,
    },
    deliveredTo: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        deliveredAt: {
          type: Date,
          required: true,
        },
      },
    ],
    /** Receiver opened the thread and marked read */
    readAt: {
      type: Date,
      default: null,
    },
    readBy: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        readAt: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

messageModel.index({ senderID: 1, receiverID: 1, createdAt: -1 });
messageModel.index({ roomID: 1, createdAt: -1 });

messageModel.pre("validate", function validateMessageTarget() {
  const hasReceiver = Boolean(this.receiverID);
  const hasRoom = Boolean(this.roomID);

  if (hasReceiver === hasRoom) {
    throw new Error("Message must target exactly one receiver or one room");
  }
});

export const Message = mongoose.model("Message", messageModel);
