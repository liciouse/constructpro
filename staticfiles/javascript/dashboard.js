document.addEventListener('DOMContentLoaded', function() {
    // Sidebar collapse functionality
    const collapseBtn = document.querySelector('.collapse-btn');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const menuLabels = document.querySelectorAll('.nav-item span, .search-box span');
    const menuHeader = document.querySelector('.menu-header');
    const userInfo = document.querySelector('.user-info');
    
    collapseBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
        
        if (sidebar.classList.contains('collapsed')) {
            sidebar.style.width = '70px';
            mainContent.style.marginLeft = '70px';
            collapseBtn.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
            menuLabels.forEach(label => label.style.display = 'none');
            menuHeader.style.display = 'none';
            userInfo.style.display = 'none';
        } else {
            sidebar.style.width = '250px';
            mainContent.style.marginLeft = '0';
            collapseBtn.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
            menuLabels.forEach(label => label.style.display = 'block');
            menuHeader.style.display = 'block';
            userInfo.style.display = 'block';
        }
    });
    
    // Navigation item active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Task progress calculation and display
    function updateTaskProgress() {
        const taskCards = document.querySelectorAll('.task-card');
        
        taskCards.forEach(card => {
            const checkboxes = card.querySelectorAll('.checkbox');
            const checkedBoxes = card.querySelectorAll('.checkbox.checked');
            const progressText = card.querySelector('.progress-text');
            
            if (checkboxes.length > 0 && progressText) {
                const progress = Math.round((checkedBoxes.length / checkboxes.length) * 100);
                progressText.textContent = progress + '%';
                
                // Update progress icon color based on progress
                const progressIcon = card.querySelector('.progress-icon');
                if (progress < 60) {
                    progressIcon.className = 'progress-icon warning';
                    progressIcon.innerHTML = '<i class="fa-solid fa-exclamation"></i>';
                } else if (progress < 100) {
                    progressIcon.className = 'progress-icon warning';
                    progressIcon.innerHTML = '<i class="fa-solid fa-exclamation"></i>';
                } else {
                    progressIcon.className = 'progress-icon success';
                    progressIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
                }
            }
        });
    }
    
    // Initialize task progress
    updateTaskProgress();
    
    // Handle checkbox toggling for task steps
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            this.classList.toggle('checked');
            if (this.classList.contains('checked')) {
                this.innerHTML = '<i class="fa-solid fa-check"></i>';
            } else {
                this.innerHTML = '';
            }
            updateTaskProgress();
        });
    });
    
    // Clock In/Out functionality
    const clockButtons = document.querySelectorAll('.clock-in-btn');
    clockButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.querySelector('span');
            const buttonIcon = this.querySelector('i');
            
            if (buttonText.textContent === 'Clock In') {
                buttonText.textContent = 'Clock Out';
                this.style.backgroundColor = '#ffebee';
                this.style.color = '#e53935';
                buttonIcon.className = 'fa-regular fa-clock-rotate-left';
                
                // You could add a timer functionality here
                
            } else {
                buttonText.textContent = 'Clock In';
                this.style.backgroundColor = '#f0f0ff';
                this.style.color = '#7b68ee';
                buttonIcon.className = 'fa-regular fa-clock';
                
                // You could log the time worked here
            }
        });
    });
    
    // Filter dropdown functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        if (button.querySelector('.fa-chevron-down')) {
            button.addEventListener('click', function() {
                // Create dropdown menu
                const dropdown = document.createElement('div');
                dropdown.className = 'filter-dropdown';
                dropdown.style.position = 'absolute';
                dropdown.style.top = (this.offsetTop + this.offsetHeight) + 'px';
                dropdown.style.left = this.offsetLeft + 'px';
                dropdown.style.backgroundColor = '#fff';
                dropdown.style.borderRadius = '6px';
                dropdown.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                dropdown.style.zIndex = '100';
                dropdown.style.minWidth = '150px';
                
                // Example filter options
                const options = ['All', 'Today', 'This Week', 'This Month', 'Custom'];
                
                options.forEach(option => {
                    const item = document.createElement('div');
                    item.className = 'dropdown-item';
                    item.textContent = option;
                    item.style.padding = '8px 16px';
                    item.style.cursor = 'pointer';
                    
                    item.addEventListener('mouseenter', function() {
                        this.style.backgroundColor = '#f0f2f5';
                    });
                    
                    item.addEventListener('mouseleave', function() {
                        this.style.backgroundColor = 'transparent';
                    });
                    
                    item.addEventListener('click', function() {
                        const buttonSpan = button.querySelector('span');
                        if (buttonSpan) {
                            buttonSpan.textContent = option;
                        }
                        document.body.removeChild(dropdown);
                    });
                    
                    dropdown.appendChild(item);
                });
                
                document.body.appendChild(dropdown);
                
                // Close dropdown when clicking outside
                document.addEventListener('click', function closeDropdown(e) {
                    if (!dropdown.contains(e.target) && !button.contains(e.target)) {
                        if (document.body.contains(dropdown)) {
                            document.body.removeChild(dropdown);
                        }
                        document.removeEventListener('click', closeDropdown);
                    }
                });
            });
        }
    });

    // New Task button functionality
    const newTaskBtn = document.querySelector('.add-task-btn');
    if (newTaskBtn) {
        newTaskBtn.addEventListener('click', function() {
            // Modal for creating a new task
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '1000';
            
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            modalContent.style.backgroundColor = '#fff';
            modalContent.style.borderRadius = '12px';
            modalContent.style.padding = '24px';
            modalContent.style.width = '600px';
            modalContent.style.maxWidth = '90%';
            
            const modalHeader = document.createElement('div');
            modalHeader.style.display = 'flex';
            modalHeader.style.justifyContent = 'space-between';
            modalHeader.style.alignItems = 'center';
            modalHeader.style.marginBottom = '24px';
            
            const modalTitle = document.createElement('h2');
            modalTitle.textContent = 'Create New Task';
            modalTitle.style.fontSize = '20px';
            modalTitle.style.fontWeight = '600';
            
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
            closeBtn.style.background = 'none';
            closeBtn.style.border = 'none';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.fontSize = '18px';
            
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            modalHeader.appendChild(modalTitle);
            modalHeader.appendChild(closeBtn);
            
            // Simple form for new task
            const form = document.createElement('form');
            form.innerHTML = `
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Task Title</label>
                    <input type="text" placeholder="Enter task title" style="width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px;">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Project</label>
                    <select style="width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px;">
                        <option>Kitchen Remodel</option>
                        <option>Bathroom Renovation</option>
                        <option>Deck Construction</option>
                    </select>
                </div>
                <div style="display: flex; gap: 16px; margin-bottom: 16px;">
                    <div style="flex: 1;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Start Date</label>
                        <input type="date" style="width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px;">
                    </div>
                    <div style="flex: 1;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 500;">End Date</label>
                        <input type="date" style="width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px;">
                    </div>
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Assign To</label>
                    <select style="width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px;">
                        <option>Courtney Henry</option>
                        <option>Cody Fisher</option>
                        <option>Royal Parvej</option>
                    </select>
                </div>
                <div style="margin-bottom: 24px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Notes</label>
                    <textarea placeholder="Enter task notes" style="width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 6px; min-height: 100px;"></textarea>
                </div>
                <div style="display: flex; justify-content: flex-end; gap: 12px;">
                    <button type="button" class="cancel-btn" style="padding: 10px 16px; border: 1px solid #e2e8f0; background-color: #fff; border-radius: 6px; cursor: pointer;">Cancel</button>
                    <button type="submit" style="padding: 10px 16px; background-color: #7b68ee; color: #fff; border: none; border-radius: 6px; cursor: pointer;">Create Task</button>
                </div>
            `;
            
            form.querySelector('.cancel-btn').addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                // Here you would typically save the new task data
                // For this demo, we'll just close the modal
                document.body.removeChild(modal);
                
                // Show a notification
                showNotification('New task created successfully!');
            });
            
            modalContent.appendChild(modalHeader);
            modalContent.appendChild(form);
            modal.appendChild(modalContent);
            
            document.body.appendChild(modal);
        });
    }
    
    // Notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '24px';
        notification.style.right = '24px';
        notification.style.backgroundColor = '#4caf50';
        notification.style.color = '#fff';
        notification.style.padding = '12px 24px';
        notification.style.borderRadius = '6px';
        notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        notification.style.transition = 'opacity 0.3s, transform 0.3s';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Initialize tooltip functionality for action buttons
    function initTooltips() {
        const actionButtons = document.querySelectorAll('.action-btn');
        
        actionButtons.forEach(button => {
            button.addEventListener('mouseenter', function(e) {
                const tooltipText = this.getAttribute('data-tooltip') || getTooltipText(this);
                
                if (!tooltipText) return;
                
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = tooltipText;
                tooltip.style.position = 'absolute';
                tooltip.style.backgroundColor = '#333';
                tooltip.style.color = '#fff';
                tooltip.style.padding = '6px 10px';
                tooltip.style.borderRadius = '4px';
                tooltip.style.fontSize = '12px';
                tooltip.style.zIndex = '1000';
                tooltip.style.pointerEvents = 'none';
                
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.top = (rect.bottom + 5) + 'px';
                tooltip.style.left = (rect.left + rect.width/2 - tooltip.offsetWidth/2) + 'px';
                
                this.addEventListener('mouseleave', function() {
                    document.body.removeChild(tooltip);
                }, { once: true });
            });
        });
    }
    
    function getTooltipText(button) {
        const icon = button.querySelector('i');
        if (!icon) return '';
        
        if (icon.classList.contains('fa-tag')) return 'Manage Tags';
        if (icon.classList.contains('fa-pencil')) return 'Edit Task';
        if (icon.classList.contains('fa-grip')) return 'Move Task';
        if (icon.classList.contains('fa-ellipsis')) return 'More Options';
        
        return '';
    }
    
    initTooltips();
    
    // Add data-tooltip attributes to buttons
    const tagButtons = document.querySelectorAll('.action-btn i.fa-tag');
    tagButtons.forEach(icon => {
        icon.parentElement.setAttribute('data-tooltip', 'Manage Tags');
    });
    
    const editButtons = document.querySelectorAll('.action-btn i.fa-pencil');
    editButtons.forEach(icon => {
        icon.parentElement.setAttribute('data-tooltip', 'Edit Task');
    });
    
    const moveButtons = document.querySelectorAll('.action-btn i.fa-grip');
    moveButtons.forEach(icon => {
        icon.parentElement.setAttribute('data-tooltip', 'Move Task');
    });
    
    const moreButtons = document.querySelectorAll('.action-btn i.fa-ellipsis');
    moreButtons.forEach(icon => {
        icon.parentElement.setAttribute('data-tooltip', 'More Options');
    });
    
    // Add search functionality
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Search...';
            input.style.width = '100%';
            input.style.padding = '8px';
            input.style.border = 'none';
            input.style.borderRadius = '4px';
            input.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            input.style.color = '#fff';
            input.style.outline = 'none';
            
            this.innerHTML = '';
            this.appendChild(input);
            input.focus();
            
            input.addEventListener('blur', function() {
                searchBox.innerHTML = '<i class="fa-solid fa-search"></i><span>Search</span>';
            });
            
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    // Perform search
                    showNotification('Searching for: ' + this.value);
                    this.blur();
                }
            });
        });
    }
});