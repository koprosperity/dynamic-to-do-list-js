// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from localStorage when the page loads
    function loadTasks() {
        // Retrieve the tasks array from localStorage, or initialize an empty array if none exist
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Loop through the stored tasks and add them to the task list without re-saving to localStorage
        storedTasks.forEach(taskText => addTask(taskText, false)); // Pass 'false' to avoid duplication
    }

    // Function to add a new task to the DOM and optionally save it to localStorage
    function addTask(taskText, save = true) {
        // Ensure that the task text is not empty
        if (taskText.trim() === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new list item (li) element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the "Remove" button for each task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Add event listener to remove the task when the remove button is clicked
        removeButton.addEventListener('click', () => {
            // Remove the task from the DOM
            li.remove();

            // Remove the task from localStorage
            removeTaskFromStorage(taskText);
        });

        // Append the remove button to the list item
        li.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(li);

        // If save is true, save the new task to localStorage
        if (save) {
            saveTaskToStorage(taskText);
        }

        // Clear the task input field after adding the task
        taskInput.value = '';
    }

    // Function to save a task to localStorage
    function saveTaskToStorage(taskText) {
        // Retrieve the current list of tasks from localStorage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Add the new task to the array
        storedTasks.push(taskText);

        // Save the updated array back to localStorage
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from localStorage
    function removeTaskFromStorage(taskText) {
        // Retrieve the current list of tasks from localStorage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Find the index of the task to remove and remove it from the array
        const updatedTasks = storedTasks.filter(task => task !== taskText);

        // Save the updated array back to localStorage
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Event listener for adding a task when the button is clicked
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim(); // Use trim to get the value without whitespace
        addTask(taskText); // By default, save = true
    });

    // Event listener for adding a task when the 'Enter' key is pressed
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim(); // Use trim to get the value without whitespace
            addTask(taskText); // By default, save = true
        }
    });

    // Load tasks from localStorage when the page loads
    loadTasks();
});
