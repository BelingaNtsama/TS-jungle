import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axiosInstance from '@services/axiosInstance';
import {
  MessageSquare,
  Send,
  X,
  Bot,
  User,
  Sparkles,
  Leaf,
  Mic,
  Paperclip,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX,
  RefreshCw,
  Zap,
  Shield,
  Clock
} from 'lucide-react';

const suggestedQuestions = [
  "Quelle plante pour une pièce sombre ?",
  "Pourquoi mes feuilles jaunissent ?",
  "Fréquence d'arrosage recommandée ?"
];

const chatFeatures = [
  { icon: Zap, text: "Réponses instantanées" },
  { icon: Shield, text: "Conseils d'experts" },
  { icon: Clock, text: "Disponible 24/7" }
];

const AiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Bonjour ! 🌱 Je suis PlantBot, votre assistant personnel pour les plantes. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date(),
      type: 'welcome'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [position, setPosition] = useState({ x: window.innerWidth - 70, y: window.innerHeight - 70 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatRef = useRef(null);

  const profileImage = JSON.parse(localStorage.getItem('user'))?.picture || User;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current && !isMinimized) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date(),
      type: 'message'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);
    setShowSuggestions(false);

    try {
      const typingDuration = Math.min(input.length * 50 + 1000, 3000);

      setTimeout(async () => {
        const response = await axiosInstance.post('/chat', { message: input });
        setIsTyping(false);

        const aiResponse = {
          role: 'assistant',
          content: response.data.reply || "Désolé, je n'ai pas compris votre question.",
          timestamp: new Date(),
          type: 'response'
        };

        setMessages(prev => [...prev, aiResponse]);
      }, typingDuration);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        timestamp: new Date(),
        type: 'error'
      }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      scrollToBottom();
    }
  };

  const handleSuggestedQuestion = (question) => {
    setInput(question);
    inputRef.current?.focus();
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: 'Chat effacé ! Comment puis-je vous aider ? 🌱',
      timestamp: new Date(),
      type: 'welcome'
    }]);
    setShowSuggestions(true);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = chatRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    let newX = e.clientX - dragOffset.x;
    let newY = e.clientY - dragOffset.y;

    // Limiter la position à l'intérieur de la fenêtre
    const maxX = window.innerWidth - (chatRef.current?.offsetWidth || 0);
    const maxY = window.innerHeight - (chatRef.current?.offsetHeight || 0);

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  if (!isOpen) {
    return (
      <motion.div
        ref={chatRef}
        className={`fixed z-50 ${isMobile ? 'bottom-4 right-4' : 'cursor-move'}`}
        style={isMobile 
          ? undefined 
          : {
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: 'translate(-50%, -50%)'
            }
        }
        onMouseDown={!isMobile ? handleMouseDown : undefined}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="relative w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-2xl shadow-2xl flex items-center justify-center group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20"
            animate={{
              background: [
                "linear-gradient(45deg, #10b981, #059669)",
                "linear-gradient(45deg, #059669, #047857)",
                "linear-gradient(45deg, #047857, #10b981)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <MessageSquare className="h-7 w-7 group-hover:scale-110 transition-transform relative z-10 text-green-200" />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <Sparkles className="h-3 w-3 text-white" />
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-green-400"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={chatRef}
      className={`fixed z-50 ${isMobile 
        ? 'inset-0 w-screen h-screen' 
        : 'w-full max-w-xs md:max-w-sm cursor-move'}`}
      style={isMobile 
        ? undefined 
        : {
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
      initial={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        height: isMinimized ? "auto" : "100%",
        width: isMobile ? "100%" : "auto"
      }}
      exit={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseDown={handleMouseDown}
    >
      <div className={`bg-white flex flex-col overflow-hidden border border-gray-100 h-full ${!isMobile ? 'rounded-3xl shadow-2xl' : ''}`}>
        <motion.div className="bg-gradient-to-r from-green-600 to-teal-600 p-4 text-white relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <Leaf className="h-7 w-7 text-green-200" />
              </div>
              <div>
                <h3 className="font-bold text-lg">PlantBot</h3>
                <p className="text-green-100 text-sm">Assistant plantes IA</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                className="p-2 hover:bg-white/20 rounded-xl"
              >
                {isSoundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-white/20 rounded-xl"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={clearChat}
                className="p-2 hover:bg-white/20 rounded-xl"
              >
                <RefreshCw className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-xl"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
          <motion.div className="mt-3 flex flex-wrap gap-2 text-xs">
            {chatFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-1 bg-white/10 px-2 py-1 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <feature.icon className="h-3 w-3" />
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {!isMinimized && (
          <>
            <div className={`messages-container flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-gray-50 ${!isMobile ? 'max-h-96' : ''}`}>
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end space-x-2 max-w-[85%] ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <motion.div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                          message.role === 'user'
                            ? ''
                            : 'bg-gradient-to-r from-emerald-500 to-green-500'
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {message.role === 'user' ? (
                          <img src={profileImage} className="h-8 w-8 rounded-full" alt="User" />
                        ) : (
                          <Bot className="h-5 w-5 text-white" />
                        )}
                      </motion.div>
                      <motion.div
                        className={`px-4 py-3 rounded-2xl shadow-sm ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-br-md'
                            : 'bg-gradient-to-r from-blue-50 to-green-50 text-gray-800 rounded-bl-md border border-green-100'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="text-sm leading-relaxed whitespace-pre-line">
                          {message.content}
                        </div>
                        <p className={`text-xs mt-2 ${
                          message.role === 'user' ? 'text-green-100' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-start"
                >
                  <div className="flex items-end space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center shadow-md">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{
                              scale: [1, 1.3, 1],
                              backgroundColor: ["#9ca3af", "#10b981", "#9ca3af"]
                            }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {showSuggestions && messages.length <= 1 && (
              <motion.div
                className="p-4 bg-gradient-to-r from-gray-50 to-green-50 border-t border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm text-gray-600 mb-3 font-medium">💬 Questions populaires :</p>
                <div className="space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="w-full text-left p-3 text-sm text-gray-700 bg-white rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-700 transition-all border border-gray-200 hover:border-green-200 shadow-sm hover:shadow-md"
                    >
                      <span className="text-green-600 mr-2">•</span>
                      {question}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.form
              onSubmit={handleSubmit}
              className="p-4 border-t bg-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Posez votre question sur les plantes..."
                    className="w-full px-4 py-3 pr-20 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                    disabled={isLoading}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                    >
                      <Paperclip className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                    >
                      <Mic className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <RefreshCw className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </motion.button>
              </div>
            </motion.form>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default AiChat;
