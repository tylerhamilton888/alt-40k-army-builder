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


export const addFaction = async (faction) => {
  try {
    const response = await fetch('http://localhost:8088/factions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(faction),
    });
    if (!response.ok) {
      throw new Error('Failed to add faction');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding faction:', error);
    throw error;
  }
};

export const updateFaction = async (factionId, faction) => {
  try {
    const response = await fetch(`http://localhost:8088/factions/${factionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(faction),
    });
    if (!response.ok) {
      throw new Error('Failed to update faction');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating faction:', error);
    throw error;
  }
};

export const deleteFaction = async (factionId) => {
  try {
    const response = await fetch(`http://localhost:8088/factions/${factionId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete faction');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting faction:', error);
    throw error;
  }
};