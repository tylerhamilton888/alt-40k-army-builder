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

export const getFactionById = async (factionId) => {
  try {
    const response = await fetch(`http://localhost:8088/factions/${factionId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch faction');
    }
    const faction = await response.json();
    return faction;
  } catch (error) {
    console.error(error);
    return null;
  }
};
