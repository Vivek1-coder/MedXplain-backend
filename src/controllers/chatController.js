import Chat from "../models/Chat.model.js";

// Create a new chat for the logged-in user
export const createNewChat = async (req, res) => {
  try {
    const userId = req.user._id;

    const chat = await Chat.create({ userId });
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all chats of the logged-in user
export const getUserChats = async (req, res) => {
  try {
    const userId = req.user._id;

    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Get a specific chat by ID (only if owned by user)
export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    if (chat.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized access to chat" });
    }

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Rename a chat (only if owned by user)
export const renameChat = async (req, res) => {
  try {
    const { newTitle } = req.body;
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    if (chat.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized to rename this chat" });
    }

    chat.title = newTitle || chat.title;
    await chat.save();

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Delete a chat (only if owned by user)
export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    if (chat.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized to delete this chat" });
    }

    await Chat.findByIdAndDelete(chat._id);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
