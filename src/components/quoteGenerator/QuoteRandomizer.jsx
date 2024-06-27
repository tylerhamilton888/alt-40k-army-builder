import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Quotes.css';

export const QuoteRandomizer = () => {
  const [quote, setQuote] = useState('');
  const location = useLocation();

  const fetchQuote = () => {
    fetch('http://localhost:8088/imperiumQuotes')
      .then(response => response.json())
      .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuote(data[randomIndex].text);
      })
      .catch(error => console.error('Error fetching quotes:', error));
  };

  useEffect(() => {
    fetchQuote();
  }, [location]);

  return (
    <div className="quote-container">
      {quote}
    </div>
  );
};
