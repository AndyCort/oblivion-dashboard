import { useState, useEffect } from 'react';

const quotes = [
  { text: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.", author: "Alan Watts" },
  { text: "Life is a series of natural and spontaneous changes. Don't resist them; that only creates sorrow. Let reality be reality.", author: "Lao Tzu" },
  { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
  { text: "To love at all is to be vulnerable.", author: "C.S. Lewis" },
  { text: "The world breaks everyone, and afterward, some are strong at the broken places.", author: "Ernest Hemingway" },
  { text: "There is a crack in everything. That's how the light gets in.", author: "Leonard Cohen" }
];

export function Quotes() {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    // Pick a random quote on mount
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    
    // Change quote every hour
    const timer = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 60 * 60 * 1000);
    
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="widget quotes-widget">
      <h2 className="greeting">{getGreeting()}.</h2>
      <div className="quote-text">"{quote.text}"</div>
      <div className="quote-author">— {quote.author}</div>
    </div>
  );
}
