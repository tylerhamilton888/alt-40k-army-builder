export const getFactions = async () => {
    try {
      const response = await fetch('http://localhost:8088/factions'); 
      if (!response.ok) {
        throw new Error('Failed to fetch factions');
      }
      const factions = await response.json();
      return factions;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  