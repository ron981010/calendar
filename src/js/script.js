function redirectCalendar() {
    window.location.href = "/index.html";
}

function load() {
    fetch('/events')
        .then((response) => response.json())
        .then((data) => {
            const datesContainer = document.getElementById('datesContainer');
            datesContainer.innerHTML = '';

            data.forEach((event) => {
                const eventElement = document.createElement('div');
                eventElement.textContent = `${event.name} - ${event.date}`;
                datesContainer.appendChild(eventElement);
            });
        })
        .catch((error) => console.error('Error fetching events:', error));
}

function initButtons() {
    document.getElementById('backCalendar').addEventListener('click', redirectCalendar);
}

initButtons();
load();


// Function to fetch events from the API and display them on the page
// Function to fetch events from the API and display them on the page
function fetchAndDisplayEvents() {
    // Replace 'https://worldwide-writers2.onrender.com/events/' with your API URL
    fetch('https://worldwide-writers2.onrender.com/events/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(events => {
            // Check if events is an array and has data
            if (Array.isArray(events) && events.length > 0) {
                const datesContainer = document.getElementById('datesContainer');
                datesContainer.innerHTML = ''; // Clear existing content

                events.forEach(event => {
                    // Create a new element for each event
                    const eventElement = document.createElement('div');
                    eventElement.className = 'event';
                    eventElement.innerHTML = `<h3>${event.title}</h3>
                                          <p>Date: ${event.date}</p>
                                          <p>Time: ${formatTime(event.time)}</p>
                                          <p>Description: ${event.description}</p>`;

                    // Append the event element to the dates container
                    datesContainer.appendChild(eventElement);
                });
            } else {
                console.log('No events data found');
            }
        })
        .catch(error => {
            console.error('Error fetching events:', error);
        });
}

// Helper function to format time as "hh:mm AM/PM"
function formatTime(time) {
    const [hour, minute] = time.split(':');
    const formattedHour = (parseInt(hour, 10) % 12 || 12).toString().padStart(2, '0');
    const formattedMinute = minute.padStart(2, '0');
    const amPm = parseInt(hour, 10) >= 12 ? 'PM' : 'AM';
    return `${formattedHour}:${formattedMinute} ${amPm}`;
}

// Call the function to fetch and display events
fetchAndDisplayEvents();

