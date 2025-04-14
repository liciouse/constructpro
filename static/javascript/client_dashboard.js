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

