const factionEndpoints = {
  1: 'custodesUnits', 
  2: 'greyKnightUnits' 
};

export const getUnitsByFaction = async (factionIdentifier) => {
  let endpoint;
  
  if (typeof factionIdentifier === 'number') {
    endpoint = factionEndpoints[factionIdentifier];
  } else {
    endpoint = Object.keys(factionEndpoints).find(
      key => factionEndpoints[key] === factionIdentifier
    );
  }

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
