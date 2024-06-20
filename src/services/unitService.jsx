const factionEndpoints = {
    "Adeptus Custodes": "custodesUnits",
    "Grey Knights": "greyKnightUnits"
    // Add other factions as needed
  };
  
  export const getUnitsByFaction = async (factionName) => {
    try {
      const endpoint = factionEndpoints[factionName];
      if (!endpoint) {
        throw new Error(`No endpoint found for faction: ${factionName}`);
      }
      const response = await fetch(`http://localhost:8088/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch units for ${factionName}`);
      }
      const units = await response.json();
      return units;
    } catch (error) {
      console.error(error);
      return [];
    }
  };