import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const QuoteRandomizer = () => {
    const [quote, setQuote] = useState('');
    const location = useLocation();

    const fetchQuote = async () => {
        try {
            const response = await fetch('http://localhost:8088/imperiumQuotes');
            const quotes = await response.json();
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setQuote(randomQuote.text);
        } catch (error) {
            console.error('Failed to fetch quotes:', error);
        }
    };

    useEffect(() => {
        fetchQuote();
    }, [location]);

    return (
        <div className="quote-container">
            <p>{quote}</p>
        </div>
    );
};

export default QuoteRandomizer;
