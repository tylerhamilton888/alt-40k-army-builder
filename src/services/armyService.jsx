

export const saveArmy = async (army) => {
    try {
      const response = await fetch('http://localhost:8088/armies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(army)
      });
      return response;
    } catch (error) {
      console.error('Failed to save army', error);
      return { ok: false };
    }
  };
  