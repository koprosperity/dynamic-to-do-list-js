// Ensure the script runs after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get the input value and trim it

        // If the input field is empty, prompt the user
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create a new list item (li) element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        
        // Use classList.add to add the 'remove-btn' class to the button
        removeButton.classList.add('remove-btn');

        // Attach an event listener to the remove button
        removeButton.onclick = function () {
            taskList.removeChild(li); // Remove the task (li) from the list
        };

        // Append the remove button to the li
        li.appendChild(removeButton);

        // Append the new task (li) to the task list (ul)
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }

    // Attach event listeners
    addButton.addEventListener('click', addTask); // Add task when button is clicked

    // Allow adding tasks by pressing 'Enter' key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(); // Call addTask if Enter is pressed
        }
    });
});
