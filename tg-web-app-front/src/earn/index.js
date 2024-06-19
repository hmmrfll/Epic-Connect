document.addEventListener("DOMContentLoaded", () => {
    const tasksList = document.getElementById('tasks-list');
    const balanceElement = document.getElementById('balance');
    let balance = 1000; // Replace with actual balance fetched from backend

    // Mock data for tasks (replace with actual data from backend)
    const tasks = [
        { name: 'Fill your profile', points: 50, completed: false },
        { name: 'Respond to other users’ requests', points: 100, completed: false },
        { name: 'Invite friends', points: 100, completed: false },
        { name: 'Claim daily reward', points: 100, completed: false },
        { name: 'Follow Epic Connect', points: 50, completed: false }
    ];

    // Display initial balance
    balanceElement.textContent = balance;

    // Render tasks
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        const taskTitle = document.createElement('h2');
        taskTitle.textContent = task.name;
        taskElement.appendChild(taskTitle);

        const taskPoints = document.createElement('p');
        taskPoints.textContent = `Points: ${task.points}`;
        taskElement.appendChild(taskPoints);

        const actionButton = document.createElement('button');
        actionButton.textContent = 'Do Task';
        actionButton.addEventListener('click', () => {
            // Simulate task completion
            if (!task.completed) {
                balance += task.points;
                balanceElement.textContent = balance;
                task.completed = true;
                actionButton.textContent = 'Completed';
                actionButton.disabled = true;
                actionButton.style.backgroundColor = '#ccc';
            }
        });
        taskElement.appendChild(actionButton);

        tasksList.appendChild(taskElement);
    });
});
