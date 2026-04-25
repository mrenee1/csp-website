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
  'hey': 'Hey! Welcome to CSP. I can tell you about our solutions, our team, or how to partner with us. What are you looking for?',
  'help': 'I can help with information about our Health, Wealth, and Technology solutions, our partnership opportunities, our team, or connect you directly with our team. What would you like to know?',

  'services': 'CSP offers solutions across three pillars:\n\n• Health — Creative Care (employer health solutions)\n• Wealth — WealthWave (financial education) and Impact Payments (payment infrastructure)\n• Technology — Creative Web (web design & branding) and Clarity Commissions (commission tracking)\n\nWhich area interests you?',
  'solutions': 'We provide solutions across three pillars:\n\n• Health — Creative Care (employer health solutions)\n• Wealth — WealthWave (financial education) and Impact Payments (payment infrastructure)\n• Technology — Creative Web (web design & branding) and Clarity Commissions (commission tracking)\n\nWhich would you like to learn more about?',
  'pillars': 'Our three pillars are Health, Wealth, and Technology. Each one has dedicated solutions designed to help businesses grow, save money, and run more efficiently.',

  'creative care': 'Creative Care is our Health solution. It helps employers reduce healthcare costs while improving employee wellbeing through modern benefits strategies. We focus on employee wellness programs, corporate healthcare strategy, mental health & resilience training, and healthcare cost reduction.',
  'wealthwave': 'WealthWave is The How Money Works® Company. It provides financial literacy and wealth-building education — not sales. With over 500,000 people educated, WealthWave helps employees and business owners build stronger financial futures through the HowMoneyWorks book and personalized financial strategies.',
  'how money works': 'How Money Works® is the educational foundation behind WealthWave. It\'s a book and methodology that teaches financial literacy through clear, actionable concepts — helping people understand and manage their money better.',
  'impact payments': 'Impact Payments is our finance solution providing modern payment infrastructure and merchant services for mission-driven businesses. It handles payment processing, merchant services, and financial infrastructure so you can focus on growth.',
  'creative web': 'Creative Web is our technology solution for professional websites, brand identity, social media management, SEO & ads, email marketing, and business consulting. It\'s built to help modern businesses establish a strong digital presence and grow online.',
  'clarity commissions': 'Clarity Commissions is our automated commission tracking and compensation transparency platform. It\'s built for organizations with complex payout structures — providing audit-grade accuracy, automated processing, and payroll efficiency so teams can trust their numbers.',
  'clarity': 'Clarity Commissions is our commission tracking platform that automates complex payout calculations, provides compensation transparency, and integrates with payroll systems. It eliminates manual spreadsheets and reduces errors.',

  'promise': 'The CSP Promise: We partner with growing businesses to make you money, save you money, and run more efficiently. If we can\'t do at least one of those three things for you — we won\'t ask for your time.',
  'csp promise': 'The CSP Promise: We partner with growing businesses to make you money, save you money, and run more efficiently. If we can\'t do at least one of those three things for you — we won\'t ask for your time.',
  'what is the csp promise': 'The CSP Promise: We partner with growing businesses to make you money, save you money, and run more efficiently. If we can\'t do at least one of those three things for you — we won\'t ask for your time.',
  'guarantee': 'Our promise is simple: We partner with growing businesses to make you money, save you money, and run more efficiently. If we can\'t do at least one of those three things — we won\'t ask for your time.',

  'partner': 'CSP offers two types of partnerships:\n\n• Referral Partner — Introduce clients to solutions and earn when they move forward. Flexible, no operational overhead.\n• Strategic Partner — Work alongside CSP to deliver aligned solutions. These are selective partnerships built around impact, integrity, and long-term value.\n\nEmail michelle@creativesolutionspartners.com or visit our Partners page to learn more.',
  'partnership': 'Partnership is our product. We offer Referral Partnerships (flexible, earn by introducing clients) and Strategic Partnerships (selective, premium collaboration). Visit our Partners page or email michelle@creativesolutionspartners.com to get started.',
  'referral': 'As a Referral Partner, you introduce clients to solutions that help them save money, grow revenue, and improve operations — and you earn when they move forward. It\'s flexible with no operational overhead.',
  'strategic partner': 'Strategic Partnerships are selective and built around companies and individuals who align with CSP\'s standard for impact, integrity, and long-term value. These partnerships involve working alongside CSP to deliver premium, aligned solutions.',
  'become a partner': 'We\'d love to explore a partnership! You can apply through our Partner Application page or email michelle@creativesolutionspartners.com directly. We offer both Referral and Strategic partnership opportunities.',

  'about': 'Creative Solutions Partners is a strategic growth firm founded in 2025. We align healthcare, financial solutions, and technology infrastructure to help organizations scale with clarity. Our tagline says it best: "Our goal is to grow. Our product is partnership."',
  'csp': 'CSP stands for Creative Solutions Partners — a strategic growth firm that helps businesses grow, expand, and simplify. We provide solutions across Health, Wealth, and Technology. Founded in 2025, our promise is to make you money, save you money, or help you run more efficiently.',
  'what is csp': 'Creative Solutions Partners (CSP) is a strategic growth firm founded in 2025. We align healthcare, financial solutions, and technology to help businesses scale with clarity. Our three pillars are Health (Creative Care), Wealth (WealthWave, Impact Payments), and Technology (Creative Web, Clarity Commissions).',
  'what do you do': 'We help businesses grow, save money, and run more efficiently through three solution pillars: Health (Creative Care), Wealth (WealthWave, Impact Payments), and Technology (Creative Web, Clarity Commissions). We don\'t just recommend tools — we put expert solution advisors alongside you to solve problems in the field.',
  'mission': 'Our goal is to grow. Our product is partnership. We partner with growing businesses to make them money, save them money, and run more efficiently. We don\'t recommend tools we haven\'t vetted, and we send our people — expert solution advisors who solve problems alongside you.',
  'tagline': '"Our goal is to grow. Our product is partnership."',

  'team': 'Creative Solutions Partners is led by two Co-Chief Executive Officers: Ricky Ballard and Robin Bundy. Together they bring expertise in strategic growth, partnership development, collaboration, and long-term vision.',
  'leadership': 'Our leadership team consists of:\n\n• Ricky Ballard — Co-CEO, focused on strategic growth, partnership development, and long-term vision.\n• Robin Bundy — Co-CEO, focused on collaboration, innovation, and service.\n\nBoth are committed to building solutions that create meaningful impact.',
  'ceo': 'CSP has two Co-Chief Executive Officers: Ricky Ballard and Robin Bundy. They jointly lead the company with complementary strengths in strategy, partnerships, collaboration, and innovation.',
  'robin': 'Robin Bundy is Co-Chief Executive Officer at CSP. Robin plays a key leadership role in shaping the company\'s direction with a strong emphasis on collaboration, innovation, and service, helping guide CSP\'s mission and future growth.',
  'robin bundy': 'Robin Bundy is Co-Chief Executive Officer at CSP. Robin plays a key leadership role in shaping the company\'s direction with a strong emphasis on collaboration, innovation, and service, helping guide CSP\'s mission and future growth.',
  'ricky': 'Ricky Ballard is Co-Chief Executive Officer at CSP. He focuses on strategic growth, partnership development, and long-term vision, committed to building solutions that create meaningful impact for businesses, families, and communities.',
  'ricky ballard': 'Ricky Ballard is Co-Chief Executive Officer at CSP. He focuses on strategic growth, partnership development, and long-term vision, committed to building solutions that create meaningful impact for businesses, families, and communities.',
  'founders': 'CSP was founded in 2025 and is led by Co-CEOs Ricky Ballard and Robin Bundy. Ricky brings strategic growth and partnership development expertise, while Robin focuses on collaboration, innovation, and service.',

  'health': 'Our Health pillar offers Creative Care — modern employer health solutions that reduce healthcare costs while improving employee wellbeing. Services include employee wellness programs, corporate healthcare strategy, mental health & resilience training, and healthcare cost reduction.',
  'wealth': 'Our Wealth pillar includes two solutions:\n\n• WealthWave — Financial literacy and wealth-building education (The How Money Works® Company)\n• Impact Payments — Modern payment infrastructure and merchant services for mission-driven businesses',
  'finance': 'Our Finance/Wealth pillar includes WealthWave (financial literacy and wealth-building education) and Impact Payments (modern payment infrastructure and merchant services).',
  'technology': 'Our Technology pillar includes two solutions:\n\n• Creative Web — Professional websites, brand identity, social media, SEO & ads, email marketing, and consulting\n• Clarity Commissions — Automated commission tracking and compensation transparency for complex payout structures',
  'tech': 'Our Technology solutions include Creative Web (web design, branding, and digital growth) and Clarity Commissions (automated commission tracking and compensation transparency).',

  'contact': 'You can reach us at michelle@creativesolutionspartners.com or click "Start the Conversation" on our website. We\'re also on LinkedIn, Instagram, and Facebook.',
  'email': 'Our contact email is michelle@creativesolutionspartners.com — feel free to reach out anytime.',
  'phone': 'The best way to reach us is by email at michelle@creativesolutionspartners.com. We\'ll get back to you promptly to schedule a call.',
  'social media': 'You can find us on:\n• LinkedIn — Creative Solutions Partners\n• Instagram — @creativesolutionspartners\n• Facebook — Creative Solutions Partners\n\nOr visit our website at creativesolutionspartners.com',
  'linkedin': 'You can find us on LinkedIn at linkedin.com/company/creative-solutions-partners/',
  'instagram': 'Follow us on Instagram @creativesolutionspartners',
  'website': 'Our website is creativesolutionspartners.com — you\'re here right now!',

  'pricing': 'Our solutions are customized to each business\'s needs. Rather than one-size-fits-all pricing, we tailor everything to your goals. Email michelle@creativesolutionspartners.com to schedule a consultation.',
  'cost': 'We customize our solutions based on your business size, industry, and needs. Let\'s schedule a consultation to find what works best for you. Email michelle@creativesolutionspartners.com',
  'consultation': 'I\'d love to connect you with our team! Email michelle@creativesolutionspartners.com or click "Start the Conversation" to begin. We provide personalized consultations, not generic pitches.',
  'demo': 'We provide personalized consultations tailored to your specific business needs — not generic demos. Email michelle@creativesolutionspartners.com to set one up.',

  'how it works': 'CSP puts expert solution advisors alongside business owners — in their operations, understanding their specific context, and staying until the problem is actually solved. We don\'t just hand you a recommendation. We solve problems with you.',
  'different': 'What makes CSP different? Most companies hand you a recommendation and wish you luck. CSP puts expert solution advisors alongside you — in your operations, understanding your specific context, and staying until the problem is actually solved. Partnership is literally our product.',
  'why csp': 'CSP is different because we don\'t just sell solutions — we partner with you. We put expert advisors in the field alongside you, we only recommend tools we\'ve vetted, and our promise is simple: if we can\'t make you money, save you money, or help you run more efficiently, we won\'t ask for your time.',

  'insights': 'CSP Insights is our content and thought leadership platform. Visit creativesolutionsinsights.com for articles, resources, and strategic perspectives on business growth.',
  'blog': 'Check out CSP Insights at creativesolutionsinsights.com for our latest articles and thought leadership on business strategy, health, wealth, and technology.',

  'biz boost': 'Creative Web (formerly associated with Biz Boost Agency) provides web design, brand identity, social media management, SEO & ads, email marketing, and business consulting for modern businesses.',
  'bizboost': 'Creative Web provides professional web design, brand identity, social media management, SEO & ads, email marketing, and business consulting.',

  'portal': 'The CSP Portal is our partner workspace at https://creative-client-n9pkx5rcs-michellewilliamsdev.vercel.app. Existing partners can access it through the "CSP Portal" button in the navigation.',
  'login': 'The CSP Portal is available at https://creative-client-n9pkx5rcs-michellewilliamsdev.vercel.app and through the navigation bar. Existing partners can log in there to access partner resources.',

  'founded': 'Creative Solutions Partners was founded in 2025 as a strategic growth firm.',
  'location': 'CSP serves businesses across the United States. Reach us at michelle@creativesolutionspartners.com.',
  'size': 'CSP is a focused team of 2-10 professionals dedicated to strategic growth and partnership solutions.',

  'thank you': 'You\'re welcome! Is there anything else I can help you with?',
  'thanks': 'You\'re welcome! Feel free to ask if you have more questions about our solutions or how we can help your business.',
  'bye': 'Thanks for chatting! Remember, if you ever need us — michelle@creativesolutionspartners.com. Have a great day!',
  'goodbye': 'Have a great day! Reach out anytime at michelle@creativesolutionspartners.com.',
};

const getBotResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase().trim();

  if (FAQ_RESPONSES[lowerMessage]) {
    return FAQ_RESPONSES[lowerMessage];
  }

  for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }

  if (lowerMessage.includes('price') || lowerMessage.includes('how much') || lowerMessage.includes('fee') || lowerMessage.includes('rate')) {
    return 'Our solutions are customized to each business. Rather than fixed pricing, we tailor everything to your goals and needs. Email michelle@creativesolutionspartners.com to schedule a free consultation.';
  }

  if (lowerMessage.includes('schedule') || lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('call') || lowerMessage.includes('meet')) {
    return 'You can schedule a consultation by emailing michelle@creativesolutionspartners.com or clicking "Start the Conversation" on our site. We\'ll set up a time that works for you.';
  }

  if (lowerMessage.includes('join') || lowerMessage.includes('apply') || lowerMessage.includes('become') || lowerMessage.includes('sign up')) {
    return 'We\'d love to explore a partnership! We offer Referral Partnerships (flexible, earn by introducing clients) and Strategic Partnerships (selective, premium collaboration). Visit our Partners page or email michelle@creativesolutionspartners.com to get started.';
  }

  if (lowerMessage.includes('save') || lowerMessage.includes('money') || lowerMessage.includes('grow') || lowerMessage.includes('revenue')) {
    return 'That\'s exactly what we do. The CSP Promise: we partner with growing businesses to make you money, save you money, and run more efficiently. If we can\'t do at least one of those three things — we won\'t ask for your time. Email michelle@creativesolutionspartners.com to get started.';
  }

  if (lowerMessage.includes('insurance') || lowerMessage.includes('benefits') || lowerMessage.includes('healthcare') || lowerMessage.includes('wellness')) {
    return 'Our Health pillar — Creative Care — helps employers reduce healthcare costs while improving employee wellbeing through modern benefits strategies, wellness programs, and healthcare cost reduction. Email michelle@creativesolutionspartners.com to learn more.';
  }

  if (lowerMessage.includes('payment') || lowerMessage.includes('merchant') || lowerMessage.includes('processing')) {
    return 'Impact Payments provides modern payment infrastructure and merchant services for mission-driven businesses. We handle payment processing, merchant services, and financial infrastructure. Email michelle@creativesolutionspartners.com for details.';
  }

  if (lowerMessage.includes('website') || lowerMessage.includes('web design') || lowerMessage.includes('branding') || lowerMessage.includes('seo') || lowerMessage.includes('marketing')) {
    return 'Creative Web handles web design, brand identity, social media management, SEO & ads, email marketing, and business consulting. We build digital presence for modern businesses. Email michelle@creativesolutionspartners.com to discuss your project.';
  }

  if (lowerMessage.includes('commission') || lowerMessage.includes('payroll') || lowerMessage.includes('compensation') || lowerMessage.includes('tracking')) {
    return 'Clarity Commissions automates commission tracking and provides compensation transparency for organizations with complex payout structures. No more manual spreadsheets or payroll errors. Email michelle@creativesolutionspartners.com to learn more.';
  }

  if (lowerMessage.includes('financial') || lowerMessage.includes('literacy') || lowerMessage.includes('education') || lowerMessage.includes('wealth building')) {
    return 'WealthWave is The How Money Works® Company — providing financial literacy and wealth-building education for employees and business owners. Over 500,000 people educated. Email michelle@creativesolutionspartners.com to bring WealthWave to your organization.';
  }

  if (lowerMessage.includes('who') || lowerMessage.includes('leader') || lowerMessage.includes('run') || lowerMessage.includes('owner')) {
    return 'CSP is led by Co-CEOs Ricky Ballard and Robin Bundy. Ricky focuses on strategic growth and partnership development, while Robin drives collaboration, innovation, and service. Together they guide CSP\'s mission and vision.';
  }

  return 'I appreciate your question! I can help with information about our Health, Wealth, and Technology solutions, our partnership opportunities, our team, or how CSP works. You can also email michelle@creativesolutionspartners.com for personalized assistance. What would you like to know?';
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
    'What is the CSP Promise?',
    'What services do you offer?',
    'How do I become a partner?',
    'Who leads CSP?',
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
