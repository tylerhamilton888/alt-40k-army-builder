// src/services/armyService.jsx
export const getArmiesByUserId = async (userId) => {
  try {
    const response = await fetch(`http://localhost:8088/armies?userId=${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch armies', error);
    return [];
  }
};

export const getArmyById = async (armyId) => {
  try {
    const response = await fetch(`http://localhost:8088/armies/${armyId}`);
    const armyData = await response.json();

    const factionUnitsEndpoint = armyData.armyFaction === 1 ? 'custodesUnits' : 'greyKnightUnits';

    const unitsPromises = armyData.units.map(async (unit) => {
      const unitResponse = await fetch(`http://localhost:8088/${factionUnitsEndpoint}/${unit.unitId}`);
      const unitData = await unitResponse.json();
      return { ...unitData, quantity: unit.quantity };
    });

    const units = await Promise.all(unitsPromises);
    return { ...armyData, units };
  } catch (error) {
    console.error('Failed to fetch army details:', error);
    throw new Error('Failed to fetch army details');
  }
};

export const saveArmy = async (army) => {
  try {
    const response = await fetch('http://localhost:8088/armies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(army),
    });
    return response;
  } catch (error) {
    console.error('Failed to save army', error);
    return { ok: false };
  }
};

export const updateArmy = async (armyId, army) => {
  try {
    const response = await fetch(`http://localhost:8088/armies/${armyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(army),
    });
    return response;
  } catch (error) {
    console.error('Failed to update army', error);
    return { ok: false };
  }
};

export const deleteArmyById = async (armyId) => {
  try {
    const response = await fetch(`http://localhost:8088/armies/${armyId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete army');
    }
   
  } catch (error) {
    console.error(error);
  }
};
