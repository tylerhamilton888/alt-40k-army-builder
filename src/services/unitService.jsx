const factionEndpoints = {
  1: 'custodesUnits',
  2: 'greyKnightUnits'
};

export const getUnitsByFaction = async (factionIdentifier) => {
  let endpoint;

  console.log(`Faction Identifier: ${factionIdentifier}`);
  
  if (typeof factionIdentifier === 'number') {
    endpoint = factionEndpoints[factionIdentifier];
  } else {
    endpoint = Object.keys(factionEndpoints).find(
      key => factionEndpoints[key] === factionIdentifier
    );
  }

  console.log(`Endpoint: ${endpoint}`);
  
  if (!endpoint) {
    throw new Error(`No endpoint found for faction: ${factionIdentifier}`);
  }

  try {
    const response = await fetch(`http://localhost:8088/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch units for ${factionIdentifier}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch units for ${factionIdentifier}`, error);
    throw error;
  }
};

export const addUnit = async (factionId, unit) => {
  const endpoint = factionEndpoints[factionId];
  if (!endpoint) {
    throw new Error(`No endpoint found for faction: ${factionId}`);
  }
  try {
    const response = await fetch(`http://localhost:8088/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(unit),
    });
    if (!response.ok) {
      throw new Error(`Failed to add unit to faction ${factionId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error adding unit to faction ${factionId}`, error);
    throw error;
  }
};

export const editUnit = async (factionId, unitId, unit) => {
  const endpoint = factionEndpoints[factionId];
  if (!endpoint) {
    throw new Error(`No endpoint found for faction: ${factionId}`);
  }
  try {
    const response = await fetch(`http://localhost:8088/${endpoint}/${unitId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(unit),
    });
    if (!response.ok) {
      throw new Error(`Failed to edit unit ${unitId} in faction ${factionId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error editing unit ${unitId} in faction ${factionId}`, error);
    throw error;
  }
};

export const deleteUnit = async (factionId, unitId) => {
  const endpoint = factionEndpoints[factionId];
  if (!endpoint) {
    throw new Error(`No endpoint found for faction: ${factionId}`);
  }
  try {
    const response = await fetch(`http://localhost:8088/${endpoint}/${unitId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete unit ${unitId} from faction ${factionId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deleting unit ${unitId} from faction ${factionId}`, error);
    throw error;
  }
};
