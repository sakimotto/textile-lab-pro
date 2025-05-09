// Main JavaScript for Textile Lab HTML Preview

document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Sidebar toggle for mobile
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    
    // Dashboard charts
    renderCharts();
    
    // Test Method Builder drag and drop
    setupDragAndDrop();
    
    // Calendar functionality
    setupCalendar();
    
    // Chatbot functionality
    setupChatbot();
});

// Chart rendering for dashboard
function renderCharts() {
    // Only run on dashboard page
    if (!document.getElementById('test-status-chart')) return;
    
    // Test Status Chart (Donut)
    const testStatusCtx = document.getElementById('test-status-chart').getContext('2d');
    const testStatusData = {
        labels: ['Passed', 'Failed', 'In Progress', 'Scheduled'],
        datasets: [{
            data: [68, 12, 15, 25],
            backgroundColor: ['#4caf50', '#f44336', '#2196f3', '#ff9800'],
            borderWidth: 0
        }]
    };
    
    if (window.Chart) {
        new Chart(testStatusCtx, {
            type: 'doughnut',
            data: testStatusData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
        
        // Equipment Utilization Chart (Horizontal Bar)
        const equipmentCtx = document.getElementById('equipment-chart').getContext('2d');
        const equipmentData = {
            labels: ['Instron 5967', 'SDL Atlas MM', 'MESDAN LAB', 'Instron 5966', 'SDL Atlas CM'],
            datasets: [
                {
                    label: 'Active',
                    data: [78, 65, 82, 45, 70],
                    backgroundColor: '#4caf50',
                    barPercentage: 0.8,
                    categoryPercentage: 0.9
                },
                {
                    label: 'Maintenance',
                    data: [5, 10, 3, 8, 5],
                    backgroundColor: '#ff9800',
                    barPercentage: 0.8,
                    categoryPercentage: 0.9
                },
                {
                    label: 'Idle',
                    data: [17, 25, 15, 47, 25],
                    backgroundColor: '#e0e0e0',
                    barPercentage: 0.8,
                    categoryPercentage: 0.9
                }
            ]
        };
        
        new Chart(equipmentCtx, {
            type: 'bar',
            data: equipmentData,
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                        max: 100
                    },
                    y: {
                        stacked: true
                    }
                }
            }
        });
        
        // Test Results Trend Chart (Line)
        const resultsCtx = document.getElementById('results-chart').getContext('2d');
        const resultsData = {
            labels: ['Mar 22', 'Mar 23', 'Mar 24', 'Mar 25', 'Mar 26', 'Mar 27', 'Mar 28'],
            datasets: [
                {
                    label: 'Automotive',
                    data: [85, 82, 86, 80, 84, 87, 85],
                    borderColor: '#f44336',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    tension: 0.3,
                    borderWidth: 2,
                    pointRadius: 3
                },
                {
                    label: 'Sportswear',
                    data: [78, 80, 75, 82, 85, 83, 86],
                    borderColor: '#2196f3',
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    tension: 0.3,
                    borderWidth: 2,
                    pointRadius: 3
                },
                {
                    label: 'Camping',
                    data: [92, 88, 90, 85, 87, 91, 89],
                    borderColor: '#4caf50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.3,
                    borderWidth: 2,
                    pointRadius: 3
                }
            ]
        };
        
        new Chart(resultsCtx, {
            type: 'line',
            data: resultsData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: 50,
                        max: 100
                    }
                }
            }
        });
    }
}

// Drag and drop functionality for Test Method Builder
function setupDragAndDrop() {
    const draggables = document.querySelectorAll('.parameter-item');
    const dropZone = document.querySelector('.builder-workspace');
    
    if (!draggables.length || !dropZone) return;
    
    draggables.forEach(item => {
        item.addEventListener('dragstart', () => {
            item.classList.add('dragging');
        });
        
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
    });
    
    if (dropZone) {
        dropZone.addEventListener('dragover', e => {
            e.preventDefault();
            const dragging = document.querySelector('.dragging');
            if (dragging) {
                const clone = dragging.cloneNode(true);
                clone.classList.add('workspace-item');
                clone.classList.remove('parameter-item', 'dragging');
                
                // Add remove button
                const removeBtn = document.createElement('button');
                removeBtn.className = 'btn btn-danger btn-sm';
                removeBtn.style.position = 'absolute';
                removeBtn.style.right = '10px';
                removeBtn.style.top = '10px';
                removeBtn.innerHTML = 'Remove';
                removeBtn.addEventListener('click', () => {
                    clone.remove();
                });
                
                clone.appendChild(removeBtn);
                dropZone.appendChild(clone);
            }
        });
    }
}

// Calendar functionality
function setupCalendar() {
    const calendarContainer = document.querySelector('.calendar-grid');
    if (!calendarContainer) return;
    
    // Add day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarContainer.appendChild(dayHeader);
    });
    
    // Add calendar days
    const currentDate = new Date();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        emptyDay.style.backgroundColor = '#f9f9f9';
        calendarContainer.appendChild(emptyDay);
    }
    
    // Sample events data
    const events = [
        { 
            day: 3, 
            title: 'Abrasion Test - Automotive', 
            type: 'automotive' 
        },
        { 
            day: 5, 
            title: 'UV Resistance - Camping', 
            type: 'camping' 
        },
        { 
            day: 8, 
            title: 'Moisture Wicking - Sportswear', 
            type: 'sportswear' 
        },
        { 
            day: 12, 
            title: 'Tensile Strength - Automotive', 
            type: 'automotive' 
        },
        { 
            day: 15, 
            title: 'Water Repellency - Camping', 
            type: 'camping' 
        },
        { 
            day: 18, 
            title: 'Elasticity - Sportswear', 
            type: 'sportswear' 
        },
        { 
            day: 22, 
            title: 'Flammability - Automotive', 
            type: 'automotive' 
        },
        { 
            day: 25, 
            title: 'Color Fastness - Sportswear', 
            type: 'sportswear' 
        }
    ];
    
    // Add actual days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        
        const dayNumber = document.createElement('div');
        dayNumber.style.fontWeight = 'bold';
        dayNumber.style.padding = '5px';
        dayNumber.textContent = i;
        day.appendChild(dayNumber);
        
        // Add events for this day
        const dayEvents = events.filter(event => event.day === i);
        dayEvents.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.className = `calendar-event event-${event.type}`;
            eventDiv.textContent = event.title;
            day.appendChild(eventDiv);
        });
        
        calendarContainer.appendChild(day);
    }
}

// Chatbot functionality
function setupChatbot() {
    const chatbotContainer = document.querySelector('.chatbot-container');
    if (!chatbotContainer) return;
    
    const chatMessages = document.querySelector('.chatbot-messages');
    const chatInput = document.querySelector('.chatbot-input input');
    const chatButton = document.querySelector('.chatbot-input button');
    
    // Sample responses
    const botResponses = [
        "I can help you with that test method. What specific parameters are you looking for?",
        "The recommended pressure setting for that test is 5.5 kPa according to the ASTM standard.",
        "I've found 3 similar test failures in our database. The most common cause was improper sample preparation.",
        "The Instron 5967 is currently scheduled for maintenance on Friday. Would you like to reschedule your test?",
        "Based on your test requirements, I recommend using the SDL Atlas MM equipment for optimal results.",
        "I've analyzed your test results. The failure appears to be due to excessive humidity during testing.",
        "The ISO standard for that test method was updated last month. Would you like me to show you the changes?",
        "I can help you create a custom test protocol. What industry is this for - automotive, sportswear, or camping?"
    ];
    
    // Add initial bot message
    addMessage("Hello! I'm your textile testing assistant. How can I help you today?", 'bot');
    
    // Handle send button click
    chatButton.addEventListener('click', sendMessage);
    
    // Handle enter key press
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Simulate bot thinking
            setTimeout(() => {
                // Get random response
                const response = botResponses[Math.floor(Math.random() * botResponses.length)];
                addMessage(response, 'bot');
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${sender}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}
