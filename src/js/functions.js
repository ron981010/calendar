async function addEventsFromMongoDB() {
    try {
      // Fetch events from MongoDB
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events from MongoDB');
      }
      const eventsFromMongoDB = await response.json();
  
      // Merge events from MongoDB with the existing events
      events = [...events, ...eventsFromMongoDB];
  
      // Update localStorage with the updated events array
      localStorage.setItem('events', JSON.stringify(events));
  
      // Close the modal
      closeModal();
    } catch (error) {
      console.error('Error adding events from MongoDB:', error);
    }
  }


  document.getElementById('addEventMongoButton').addEventListener('click', addEventsFromMongoDB);