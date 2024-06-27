export const getRandomQuote = async () => {
    try {
      const response = await fetch('http://localhost:8088/imperiumQuotes');
      const quotes = await response.json();
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    } catch (error) {
      console.error('Failed to fetch quote', error);
      return { text: 'The Emperor Protects' }; // Default quote in case of error
    }
  };
  