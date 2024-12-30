//Orange assignment for WT
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [completedCount, setCompletedCount] = useState(0);

  // Function to add a new task or update an existing one
  const handleAddOrUpdateTask = (task) => {
    if (taskToEdit) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t))); //update the task
      setTaskToEdit(null); // Clear edit mode after update
    } else {
      setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);//create a new task after update
    }
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Function to toggle task completion
  const toggleCompletion = (taskId) => {
    setTasks(tasks.map((task) => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Update completed tasks count whenever tasks change
  useEffect(() => {
    setCompletedCount(tasks.filter(task => task.completed).length);
  }, [tasks]);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>To Do List</h1>
      <TodoForm
        onSubmit={handleAddOrUpdateTask}
        taskToEdit={taskToEdit}
        setTaskToEdit={setTaskToEdit}
      />
      <TodoList tasks={tasks} setTaskToEdit={setTaskToEdit} deleteTask={deleteTask} toggleCompletion={toggleCompletion} />
      <p style={styles.completedCount}>Total Completed Tasks: {completedCount}</p>
    </div>
  );
}

function TodoForm({ onSubmit, taskToEdit, setTaskToEdit }) {
  const [task, setTask] = useState({ description: '', category: '', schedule: '' });//state initialization with 3 properties: description, category, schedule
  
  // for editing an existing task where task to edit contains the task details to be edited
  useEffect(() => {
    if (taskToEdit) setTask(taskToEdit);
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask({ description: '', category: '', schedule: '' });
    setTaskToEdit(null); // Reset to "Add Task" mode
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
       <input
        type="text"
        placeholder="Task Name"
        value={task.category}
        onChange={(e) => setTask({ ...task, category: e.target.value })}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Task Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        required
        style={styles.input}
      />
     
      <input
        type="datetime-local"
        value={task.schedule}
        onChange={(e) => setTask({ ...task, schedule: e.target.value })}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        {taskToEdit ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}




function TodoList({ tasks, setTaskToEdit, deleteTask, toggleCompletion }) {
  return (
    <ul style={styles.taskList}>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          setTaskToEdit={setTaskToEdit}
          deleteTask={deleteTask}
          toggleCompletion={toggleCompletion}
        />
      ))}
    </ul>
  );
}

function TodoItem({ task, setTaskToEdit, deleteTask, toggleCompletion }) {
  return (
    <li style={task.completed ? styles.completedTask : styles.task}>
      <span>{task.description}</span> - <span>{task.category}</span> - 
      <span>{new Date(task.schedule).toLocaleString()}</span> - 
      <span style={styles.status}>{task.completed ? 'Completed' : 'Scheduled'}</span>
       {/* above part displays the task's description, category, and scheduled time. 
      The scheduled time is formatted to a locale-specific string using toLocaleString(). */}
      <button onClick={() => setTaskToEdit(task)} style={styles.editButton}>Edit</button>
      <button onClick={() => deleteTask(task.id)} style={styles.deleteButton}>Delete</button>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleCompletion(task.id)}
        style={styles.checkbox}
      />
    </li>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '2em',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '1em',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '1em',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  taskList: {
    listStyleType: 'none',
    padding: '0',
  },
  task: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  completedTask: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    textDecoration: 'line-through',
    color: 'red',
  },
  status: {
    fontStyle: 'italic',
    color: '#555',
  },
  editButton: {
    marginLeft: '10px',
    color: '#FFF',
    backgroundColor: '#28A745',
    padding: '5px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  deleteButton: {
    marginLeft: '10px',
    color: '#FFF',
    backgroundColor: '#DC3545',
    padding: '5px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  checkbox: {
    marginLeft: '10px',
  },
  completedCount: {
    marginTop: '20px',
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
};

export default App;
