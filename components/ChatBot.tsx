import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const LEAD_EMAIL = 'michelle@creativesolutionspartners.com';

const FAQ_RESPONSES: Record<string, string> = {
  'hello': 'Hello! Welcome to Creative Solutions Partners. How can I help you today?',
  'hi': 'Hi there! How can I assist you with your business needs?',
  'help': 'I can help you with information about our services, partnerships, or connect you with our team. What would you like to know?',
  'services': 'We offer solutions across three pillars: Health (Creative Care), Wealth (WealthWave, Impact Payments), and Technology (Creative Web, Clarity Commissions). Which area interests you?',
  'creative care': 'Creative Care helps reduce healthcare costs while improving employee wellbeing through modern employer health solutions. Would you like to learn more?',
  'wealthwave': 'WealthWave provides financial literacy and wealth-building education for employees and business owners. Shall I connect you with our team?',
  'impact payments': 'Impact Payment Group offers modern payment infrastructure and merchant services for mission-driven businesses.',
  'creative web': 'Creative Web, powered by Biz Boost Agency, provides professional websites, branding, and digital growth systems.',
  'clarity commissions': 'Clarity Commissions is an audit-grade commission tracking system for organizations with complex payout structures.',
  'partner': 'We\'re always looking for strategic partners! You can apply to become a partner or email us directly at michelle@creativesolutionspartners.com',
  'contact': 'You can reach us at michelle@creativesolutionspartners.com or click "Start the Conversation" anywhere on the site.',
  'email': 'Our main contact email is michelle@creativesolutionspartners.com',
  'pricing': 'Our pricing varies based on your specific needs. Let\'s schedule a consultation to discuss what would work best for your business.',
  'cost': 'We customize solutions based on your business size and needs. Would you like to schedule a consultation?',
  'consultation': 'I\'d be happy to connect you with our team for a consultation. Click "Start the Conversation" or email michelle@creativesolutionspartners.com',
  'demo': 'We offer personalized consultations rather than generic demos. This ensures we address your specific business needs.',
  'about': 'Creative Solutions Partners provides modern business solutions across Health, Wealth, and Technology. Our goal is to grow, and our product is partnership.',
  'csp': 'CSP stands for Creative Solutions Partners. We\'re a partnership-driven company that helps businesses grow, expand, and simplify.',
  'team': 'Our leadership includes Robin Bundy and Ricky Ballard, who serve as Co-Chief Executive Officers.',
  'robin bundy': 'Robin Bundy is Co-Chief Executive Officer, playing a key leadership role in shaping the direction of Creative Solutions Partners with emphasis on collaboration, innovation, and service.',
  'ricky ballard': 'Ricky Ballard is Co-Chief Executive Officer, focusing on strategic growth, partnership development, and long-term vision.',
  'health': 'Our Health pillar includes Creative Care - modern employer health solutions that reduce costs while improving wellbeing.',
  'wealth': 'Our Wealth pillar includes WealthWave (financial education) and Impact Payments (payment solutions).',
  'technology': 'Our Technology pillar includes Creative Web (web design & branding) and Clarity Commissions (commission tracking).',
  'thank you': 'You\'re welcome! Is there anything else I can help you with?',
  'thanks': 'You\'re welcome! Feel free to ask if you have more questions.',
  'bye': 'Goodbye! Feel free to come back if you have more questions.',
  'goodbye': 'Have a great day! Reach out anytime.',
};

const getBotResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase().trim();

  // Check for exact matches first
  if (FAQ_RESPONSES[lowerMessage]) {
    return FAQ_RESPONSES[lowerMessage];
  }

  // Check for partial matches
  for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }

  // Check for specific keywords
  if (lowerMessage.includes('price') || lowerMessage.includes('how much') || lowerMessage.includes('fee')) {
    return 'Our pricing is customized based on your business needs. Let\'s schedule a consultation to discuss the best solution for you. Email us at michelle@creativesolutionspartners.com';
  }

  if (lowerMessage.includes('schedule') || lowerMessage.includes('book') || lowerMessage.includes('appointment')) {
    return 'You can schedule a consultation by emailing michelle@creativesolutionspartners.com or clicking "Start the Conversation" on our website.';
  }

  if (lowerMessage.includes('join') || lowerMessage.includes('apply') || lowerMessage.includes('become')) {
    return 'Interested in partnering with us? Visit our Partners section or email michelle@creativesolutionspartners.com to start the conversation.';
  }

  if (lowerMessage.includes('question') || lowerMessage.includes('?')) {
    return 'That\'s a great question! For detailed information, I recommend reaching out to our team directly at michelle@creativesolutionspartners.com. They\'ll provide personalized guidance for your specific situation.';
  }

  // Default response
  return 'I\'m not sure I understand. I can help with information about our services (Health, Wealth, Technology), partnerships, or connecting you with our team. What would you like to know? Or email us at michelle@creativesolutionspartners.com for personalized assistance.';
};

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to Creative Solutions Partners. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking and typing
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickReplies = [
    'What services do you offer?',
    'How do I become a partner?',
    'Schedule a consultation',
    'Tell me about Creative Care',
  ];

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-red-500 hover:bg-red-600 rotate-90'
            : 'bg-[#C5A059] hover:bg-[#D4AF37] hover:scale-110'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageCircle size={28} className="text-[#0a0a0a]" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-[#18181b] rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#C5A059] to-[#8E7036] p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">CSP Assistant</h3>
              <p className="text-xs text-white/80">Here to help you</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[300px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.sender === 'user'
                      ? 'bg-[#C5A059]'
                      : 'bg-white/10'
                  }`}
                >
                  {message.sender === 'user' ? (
                    <User size={16} className="text-[#0a0a0a]" />
                  ) : (
                    <Bot size={16} className="text-[#C5A059]" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                    message.sender === 'user'
                      ? 'bg-[#C5A059] text-[#0a0a0a] rounded-br-none'
                      : 'bg-white/10 text-white rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Bot size={16} className="text-[#C5A059]" />
                </div>
                <div className="bg-white/10 text-white p-3 rounded-2xl rounded-bl-none text-sm">
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(reply);
                    setTimeout(handleSend, 100);
                  }}
                  className="text-xs bg-white/5 hover:bg-white/10 text-white/80 px-3 py-1.5 rounded-full transition-colors border border-white/10"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-[#0f0f0f]">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#C5A059]"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="w-10 h-10 bg-[#C5A059] rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4AF37] transition-colors"
              >
                <Send size={18} className="text-[#0a0a0a]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
