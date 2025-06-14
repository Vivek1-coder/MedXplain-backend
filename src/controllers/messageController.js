import Chat from "../models/Chat.model.js";

export const addMessage = async (req, res) => {
  try {
    const { role, content } = req.body;
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    chat.messages.push({ role, content });
    await chat.save();

    res.json({ messages: chat.messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
