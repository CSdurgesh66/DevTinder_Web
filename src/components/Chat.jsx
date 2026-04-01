import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../utils/constants";
import { Send, ArrowLeft, Loader2 } from "lucide-react";

const Chat = () => {
  const { targetUserId } = useParams();
  const navigate = useNavigate();

  const [messages,   setMessages]   = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [sending,    setSending]    = useState(false);
  const [error,      setError]      = useState("");

  const socketRef      = useRef(null); // holds live socket so sendMessage reuses it
  const messagesEndRef = useRef(null); // scroll anchor
  const inputRef       = useRef(null); // auto-focus after send

  const userData = useSelector((store) => store.user);
  const userId   = userData?._id;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Load chat history
  useEffect(() => {
    if (!userId || !targetUserId) return;

    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
          withCredentials: true,
        });

        const msgs = res.data.messages || [];

        setMessages(
          msgs.map((m) => ({
            _id:       m._id,
            senderId:  m.senderId._id,
            firstName: m.senderId.firstName,
            photoUrl:  m.senderId.photoUrl,
            text:      m.text,
            createdAt: m.createdAt,
          }))
        );

        // Derive target user info from history to populate the header
        const other = msgs.find((m) => m.senderId._id.toString() !== userId.toString());
        if (other) {
          setTargetUser({
            _id:       other.senderId._id,
            firstName: other.senderId.firstName,
            photoUrl:  other.senderId.photoUrl,
          });
        }
      } catch (err) {
        if (err.response?.status === 403) {
          setError("You're not connected with this user.");
        } else {
          setError("Failed to load chat history.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId, targetUserId]);

  // Open socket and listen 
  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", { userId, targetUserId });

    socket.on("messageReceived", (msg) => {
        console.log("the is msg",msg);
        console.log(msg.text," -> ",msg.targetUserId)
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("error", ({ message }) => {
      setError(message);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId]);

  const sendMessage = useCallback(() => {
    const text = newMessage.trim();
    console.log("this is message that he want to send",text)
    if (!text || sending || !socketRef.current) return;

    setSending(true);
    socketRef.current.emit("sendMessage", { userId, targetUserId, text });
    setNewMessage("");
    setSending(false);
    inputRef.current?.focus();
  }, [newMessage, sending, userId, targetUserId]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const isMine = (msg) => msg.senderId?.toString() === userId?.toString();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        <span className="ml-3 text-gray-600 text-lg">Loading chat…</span>
      </div>
    );
  }

  //  Error state 
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <p className="text-red-500 text-lg font-medium">{error}</p>
        <button
          onClick={() => navigate("/connection")}
          className="btn btn-outline btn-sm"
        >
          ← Back to Connections
        </button>
      </div>
    );
  }

  //  Main render 
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">

      {/*Header*/}
      <div className="flex items-center gap-4 px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm mt-16">
        <button
          onClick={() => navigate("/connection")}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>

        {targetUser ? (
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={
                  targetUser.photoUrl ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt={targetUser.firstName}
                className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-lg leading-tight">
                {targetUser.firstName}
              </h2>
              <p className="text-xs text-green-500 font-medium">Online</p>
            </div>
          </div>
        ) : (
          <h2 className="font-bold text-gray-800 text-lg">Chat</h2>
        )}
      </div>

      {/*Message list */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3">

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="text-5xl mb-3">💬</div>
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm">Say hi to start the conversation!</p>
          </div>
        )}

        {messages.map((msg, index) => {
          const mine = isMine(msg);
          const showName =
            !mine &&
            (index === 0 ||
              messages[index - 1]?.senderId?.toString() !== msg.senderId?.toString());

          return (
            <div
              key={msg._id || index}
              className={`flex ${mine ? "justify-end" : "justify-start"} items-end gap-2`}
            >
              {/* image for other person */}
              {!mine && (
                <img
                  src={
                    msg.photoUrl ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt={msg.firstName}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0 mb-1"
                />
              )}

              <div className={`flex flex-col max-w-[70%] ${mine ? "items-end" : "items-start"}`}>
                {showName && (
                  <span className="text-xs text-gray-500 font-medium mb-1 px-1">
                    {msg.firstName}
                  </span>
                )}

                {/* chat bubble */}
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    mine
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
                  }`}
                >
                  {msg.text}
                </div>

                <span className="text-xs text-gray-400 mt-1 px-1">
                  {formatTime(msg.createdAt)}
                </span>
              </div>

              {/* Spacer so my bubbles don't touch the edge */}
              {mine && <div className="w-8 flex-shrink-0" />}
            </div>
          );
        })}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/*Input*/}
      <div className="px-4 py-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-200 shadow-sm px-4 py-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message…"
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent py-1"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={2000}
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || sending}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-2">Press Enter to send</p>
      </div>
    </div>
  );
};

export default Chat;