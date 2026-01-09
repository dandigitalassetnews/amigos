import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  avatarColor: string;
}

const INITIAL_MESSAGES: Message[] = [
  { id: 1, sender: 'Maria (Volunteer)', text: 'Just walked Boricua, he is such a good boy! 🌴', time: '10:30 AM', avatarColor: 'bg-emerald-500' },
  { id: 2, sender: 'Dr. Carlos (Vet)', text: 'Mango’s checkup went great. Ready for adoption! ✅', time: '10:45 AM', avatarColor: 'bg-blue-500' },
  { id: 3, sender: 'Sofia', text: 'Anyone free to help with feeding time later?', time: '10:52 AM', avatarColor: 'bg-purple-500' },
];

const SENDERS = [
  { name: 'Maria (Volunteer)', color: 'bg-emerald-500' },
  { name: 'Jose (Staff)', color: 'bg-orange-500' },
  { name: 'Ana (Volunteer)', color: 'bg-pink-500' },
  { name: 'Dr. Carlos (Vet)', color: 'bg-blue-500' },
  { name: 'Luis', color: 'bg-indigo-500' },
];

// Pre-written messages to simulate AI without using quota
const SIMULATED_MESSAGES = [
  "Chico is playing so well with the other pups today! 🎾",
  "Just gave Sol a bath, she is so fluffy now 🛁",
  "Pucho is napping in the sun again ☀️",
  "Donation drop-off just arrived! Thanks everyone! 🙏",
  "Coquí learned 'sit' today! So smart 🧠",
  "Walking Luna at the beach, she loves the sand 🏖️",
  "Cutie is demanding belly rubs... I can't say no 😍",
  "Mango found a new squeaky toy and won't let go 🧸",
  "Anyone bringing extra towels tomorrow?",
  "The puppies are finally asleep! 😴",
  "Boricua gave me the biggest smile today 😁",
  "Adoption application just came in for Sol! Fingers crossed 🤞",
  "Getting ready for the weekend adoption drive! 🚐",
  "Who wants to walk the big dogs this afternoon?",
  "Found a stray kitten near the gate, she's safe now 🐱"
];

const WhatsAppFeed: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchNewMessage = () => {
      // Pick a random message from the local list instead of calling API
      const randomMsg = SIMULATED_MESSAGES[Math.floor(Math.random() * SIMULATED_MESSAGES.length)];
      const randomSender = SENDERS[Math.floor(Math.random() * SENDERS.length)];
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const newMessage: Message = {
        id: Date.now(),
        sender: randomSender.name,
        text: randomMsg,
        time: timeString,
        avatarColor: randomSender.color
      };
      
      setMessages(prev => [...prev.slice(-8), newMessage]); // Keep last 9 messages
    };

    // Add a new message every 8 seconds (faster update rate since it's free now)
    const intervalId = setInterval(fetchNewMessage, 8000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-24 bg-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
            {/* Phone Mockup Container */}
            <div className="mx-auto max-w-[380px] bg-slate-900 rounded-[50px] p-3 shadow-2xl border-4 border-slate-800 relative z-10">
              {/* Screen */}
              <div className="bg-[#E5DDD5] rounded-[40px] overflow-hidden h-[600px] flex flex-col relative">
                {/* Chat Header */}
                <div className="bg-[#008069] p-4 flex items-center gap-3 text-white shadow-md z-10">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6ZM12 20C9.33 20 7 18 7 15.5C7 15 9.24 13.1 12 13.1C14.76 13.1 17 15 17 15.5C17 18 14.67 20 12 20Z"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-base leading-none">Shelter Volunteers 🇵🇷</h4>
                    <p className="text-[11px] opacity-90 truncate w-40">Maria, Carlos, Sofia, You...</p>
                  </div>
                  <div className="ml-auto opacity-80">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                  </div>
                </div>

                {/* Chat Area */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
                  style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: '400px' }}
                >
                  <div className="flex justify-center mb-4">
                     <span className="bg-[#dcf8c6] text-[#555] text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase">Today</span>
                  </div>

                  {messages.map((msg) => (
                    <div key={msg.id} className="flex flex-col items-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className={`bg-white rounded-lg p-2 max-w-[85%] shadow-sm relative rounded-tl-none`}>
                         <div className="absolute top-0 left-[-8px]">
                           <svg viewBox="0 0 8 13" height="13" width="8"><path opacity=".13" fill="#00000000" d="M1.533 3.568 8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path><path fill="currentColor" className="text-white" d="M1.533 3.568 8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path></svg>
                         </div>
                         <p className={`text-[10px] font-bold mb-0.5 ${msg.avatarColor.replace('bg-', 'text-')}`}>{msg.sender}</p>
                         <p className="text-sm text-slate-800 leading-snug">{msg.text}</p>
                         <div className="text-[9px] text-slate-400 text-right mt-1 flex justify-end items-center gap-1">
                           {msg.time}
                         </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area (Mock) */}
                <div className="bg-[#F0F2F5] p-2 flex items-center gap-2">
                  <div className="p-2 text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  </div>
                  <div className="flex-1 bg-white h-9 rounded-full px-4 text-sm text-slate-400 flex items-center">
                    Type a message
                  </div>
                  <div className="p-2 bg-[#008069] rounded-full text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decor Elements */}
            <div className="absolute top-1/2 -left-12 w-24 h-24 bg-teal-500 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 -right-12 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-2 block">Live Community Feed</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              See what's happening <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Right Now.</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Our shelter is a hive of activity! While we can't invite everyone into our private group chats, we've created this live feed to show you the real-time love, walks, and updates happening with our dogs every day.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-slate-200">🐕</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Daily Updates</h4>
                  <p className="text-slate-500">See when dogs get walked, fed, or learn a new trick.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-slate-200">💬</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Volunteer Buzz</h4>
                  <p className="text-slate-500">Get a feel for the amazing community behind the shelter.</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <p className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">Follow Us On Our WhatsAPP Group for LIVE updates!</p>
              <a 
                href="https://chat.whatsapp.com/DxKsRsQRiIEKKCIu0qQn9x"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold rounded-2xl hover:bg-[#128C7E] transition-all shadow-xl hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.888.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.978zm11.374-10.277c-.353-.176-2.095-1.032-2.419-1.149-.321-.119-.556-.177-.79.178-.235.353-.908 1.149-1.114 1.386-.205.235-.411.265-.764.089-1.802-.898-2.986-2.037-3.687-3.243-.176-.304-.019-.469.134-.621.14-.139.309-.368.463-.551.155-.184.206-.309.309-.516.103-.205.051-.385-.026-.539-.077-.154-.79-1.906-1.082-2.608-.284-.684-.576-.591-.79-.602-.206-.011-.441-.011-.676-.011-.235 0-.618.089-.941.442-.324.353-1.235 1.207-1.235 2.943 0 1.737 1.264 3.416 1.441 3.652.176.236 2.488 3.799 6.027 5.327 2.361 1.019 2.842.816 3.368.766.794-.075 2.095-.857 2.39-1.684.294-.827.294-1.535.206-1.684-.088-.149-.324-.235-.677-.411z"/></svg>
                Join Our WhatsApp Group
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppFeed;
