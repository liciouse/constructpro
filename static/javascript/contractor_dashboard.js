document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnMenuToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideSidebar && !isClickOnMenuToggle && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Notifications dropdown functionality can be added here
    const notificationsIcon = document.querySelector('.notifications');
    if (notificationsIcon) {
        notificationsIcon.addEventListener('click', function() {
            // Toggle notifications panel
            console.log('Notifications clicked');
            // Implementation would go here
        });
    }

    // User profile dropdown functionality can be added here
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            // Toggle user menu
            console.log('User profile clicked');
            // Implementation would go here
        });
    }

    // Animation for stats cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Simulate loading data for charts
    // In a real application, this would fetch data from an API
    simulateChartData();
});

function simulateChartData() {
    // This function simulates API data loading
    // In a real application, you would fetch this data from your backend
    
    console.log('Loading chart data...');

    // For a real implementation, you could use Chart.js or other libraries
    // Example with Chart.js would be:
    /*
    if (typeof Chart !== 'undefined') {
        // Projects Chart
        const projectsCtx = document.getElementById('projects-chart-canvas').getContext('2d');
        new Chart(projectsCtx, {
            type: 'bar',
            data: {
                labels: ['Planning', 'In Progress', 'Under Review', 'Completed'],
                datasets: [{
                    label: 'Projects',
                    data: [3, 5, 2, 4],
                    backgroundColor: [
                        '#3498db',
                        '#2ecc71',
                        '#f39c12',
                        '#e74c3c'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // Hours Chart
        const hoursCtx = document.getElementById('hours-chart-canvas').getContext('2d');
        new Chart(hoursCtx, {
            type: 'doughnut',
            data: {
                labels: ['Project A', 'Project B', 'Project C'],
                datasets: [{
                    data: [45, 30, 25],
                    backgroundColor: [
                        '#4CAF50',
                        '#2196F3',
                        '#FFC107'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                cutout: '60%'
            }
        });
    }
    */

    // For now, we'll use our CSS-based charts
    animateCharts();
}

function animateCharts() {
    // Animate bar chart
    const bars = document.querySelectorAll('.placeholder-chart .bar');
    bars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.opacity = '1';
        }, 200 * index);
    });

    // Animate donut chart segments
    const segments = document.querySelectorAll('.donut-segment');
    segments.forEach((segment, index) => {
        setTimeout(() => {
            segment.style.opacity = '1';
        }, 200 * index);
    });
}

// Add some interactivity to the deadline items
const deadlineItems = document.querySelectorAll('.deadline-item');
deadlineItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Add some interactivity to the activity items
const activityItems = document.querySelectorAll('.activity-item');
activityItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
    });
});

// Simulate notifications update
function updateNotifications() {
    const badge = document.querySelector('.badge');
    if (badge) {
        // Simulate getting new notifications
        const notificationCount = Math.floor(Math.random() * 5);
        badge.textContent = notificationCount;
        
        if (notificationCount > 0) {
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

// Demo function to add a new activity (for demonstration purposes)
function addNewActivity(activity, time) {
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        const newItem = document.createElement('div');
        newItem.className = 'activity-item';
        newItem.innerHTML = `
            <div class="activity-icon"><i class="fas fa-bell"></i></div>
            <div class="activity-info">
                <p>${activity}</p>
                <span class="timestamp">${time}</span>
            </div>
        `;
        
        // Apply fade in animation
        newItem.style.opacity = '0';
        activityList.prepend(newItem);
        
        setTimeout(() => {
            newItem.style.opacity = '1';
        }, 100);
        
        // Keep the list to a reasonable size
        if (activityList.children.length > 5) {
            activityList.removeChild(activityList.lastElementChild);
        }
    }
}

// For demonstration purposes, periodically add a new activity
let demoActivities = [
    'New comment added to Project A',
    'Client reviewed your latest submission',
    'New project milestone reached',
    'Invoice payment received',
    'Project deadline extended',
    'New task assigned to you'
];

// Setup periodic updates for demo purposes
// In a real application, these would be triggered by real events
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Only run demo updates in development environment
    setInterval(() => {
        updateNotifications();
    }, 30000); // Every 30 seconds
    
    // Randomly add a new activity every 45-60 seconds
    setInterval(() => {
        const randomActivity = demoActivities[Math.floor(Math.random() * demoActivities.length)];
        const now = new Date();
        const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        addNewActivity(randomActivity, `Today, ${timeString}`);
    }, Math.random() * 15000 + 45000);
}

// Add CSS-in-JS styles for animations that we want to control via JavaScript
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .stat-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .placeholder-chart .bar {
            opacity: 0;
            transition: opacity 0.5s ease, height 0.5s ease;
        }
        
        .donut-segment {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        .activity-item, .deadline-item {
            transition: all 0.3s ease;
        }
    </style>
`);

document.addEventListener("DOMContentLoaded", function () {
    console.log("Client Dashboard JS loaded");

    const statusScript = document.getElementById('status-data');
    if (!statusScript) {
        console.error("status-data element not found.");
        return;
    }

    const statusData = JSON.parse(statusScript.textContent);

    const labels = statusData.map(item => item.status);
    const values = statusData.map(item => item.count);

    const colors = {
        started: '#f6c23e',
        ongoing: '#36b9cc',
        completed: '#1cc88a',
        paused: '#e74a3b'
    };

    const backgroundColors = labels.map(label => colors[label] || '#858796');

    const ctx = document.getElementById('projectProgressChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Projects',
                    data: values,
                    backgroundColor: backgroundColors
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Project Status Summary'
                    }
                }
            }
        });
    } else {
        console.error("Canvas #projectProgressChart not found");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    console.log("Client Dashboard JS loaded");

    // Payment History Chart
    const paymentScript = document.getElementById('payment-data');
    if (paymentScript) {
        const paymentData = JSON.parse(paymentScript.textContent);
        const paymentLabels = paymentData.map(item => item.method);
        const paymentCounts = paymentData.map(item => item.count);
        const paymentColors = {
            mpesa: '#1cc88a',
            bank: '#4e73df',
            cash: '#f6c23e'
        };
        const colorSet = paymentLabels.map(label => paymentColors[label] || '#858796');

        const paymentCtx = document.getElementById('paymentHistoryChart');
        if (paymentCtx) {
            new Chart(paymentCtx, {
                type: 'doughnut',
                data: {
                    labels: paymentLabels,
                    datasets: [{
                        data: paymentCounts,
                        backgroundColor: colorSet
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Payment Methods Distribution'
                        }
                    }
                }
            });
        }
    }
});

