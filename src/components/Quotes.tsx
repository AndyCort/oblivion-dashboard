import { useState, useEffect } from "react";
import styled from "styled-components";
import { WidgetBase } from "./ui/Shared";

const quotes = [
  {
    text: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
    author: "Alan Watts",
  },
  {
    text: "Life is a series of natural and spontaneous changes. Don't resist them; that only creates sorrow. Let reality be reality.",
    author: "Lao Tzu",
  },
  {
    text: "We suffer more often in imagination than in reality.",
    author: "Seneca",
  },
  { text: "To love at all is to be vulnerable.", author: "C.S. Lewis" },
  {
    text: "The world breaks everyone, and afterward, some are strong at the broken places.",
    author: "Ernest Hemingway",
  },
  {
    text: "There is a crack in everything. That's how the light gets in.",
    author: "Leonard Cohen",
  },
];

const QuotesWidget = styled(WidgetBase)`
  align-items: flex-start;
  padding: 1.5rem;
  white-space: nowrap;
`;

const QuoteText = styled.div`
  font-size: 1.1rem;
  font-style: italic;
  font-weight: 300;
  flex: 1;
  display: flex;
  align-items: center;
`;
/*
const QuoteAuthor = styled.div`
  font-size: 0.9rem;
  opacity: 0.6;
  text-align: right;
  margin-top: 0.5rem;
  align-self: flex-end;
`;
*/
export function Quotes({ className = "" }: { className?: string }) {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    // Pick a random quote on mount
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    // Change quote every hour
    const timer = setInterval(
      () => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      },
      60 * 60 * 1000,
    );

    return () => clearInterval(timer);
  }, []);

  return (
    <QuotesWidget className={className}>
      <QuoteText>"{quote.text}"</QuoteText>
      {/* <QuoteAuthor>— {quote.author}</QuoteAuthor> */}
    </QuotesWidget>
  );
}
