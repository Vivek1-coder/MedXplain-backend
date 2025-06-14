import Chat from "../models/Chat.model.js";

export const createNewChat = async (req, res) => {
  try {
    const { userId } = req.body;
    const chat = await Chat.create({ userId });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserChats = async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) return res.status(404).json({ error: "Chat not found" });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const renameChat = async (req, res) => {
  try {
    const { newTitle } = req.body;
    const chat = await Chat.findByIdAndUpdate(
      req.params.chatId,
      { title: newTitle },
      { new: true }
    );
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteChat = async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.chatId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
