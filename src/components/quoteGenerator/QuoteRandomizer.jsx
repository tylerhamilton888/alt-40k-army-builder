import { useEffect, useState } from 'react';
import { getRandomQuote } from '../../services/quoteService';
import './Quotes.css';

const QuoteRandomizer = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      const fetchedQuote = await getRandomQuote();
      setQuote(fetchedQuote.text);
    };

    fetchQuote();
  }, []);

  return (
    <div className="quote-container">
      <p>{quote}</p>
    </div>
  );
};

export default QuoteRandomizer;
