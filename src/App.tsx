import './index.css'
import { useState, useEffect } from 'react';

// Define our Task type
interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

type FilterStatus = 'all' | 'active' | 'completed';

// TaskForm Component - For adding new tasks
const TaskForm = ({ addTask }: { addTask: (task: Omit<Task, 'id'>) => void }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask({
        title: title.trim(),
        completed: false,
        priority
      });
      setTitle('');
      setPriority('medium');
    }
  };

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <label className="mr-2 font-medium">Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task['priority'])}
            className="p-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button
          onClick={(e) => handleSubmit(e as any)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Task
        </button>
        <div className="min-h-screen bg-purple-100 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-green-700">Hello Tailwind!</h1>
    </div>
      </div>
    </div>
  );
};

// TaskItem Component - Individual task display
const TaskItem = ({
  task,
  toggleTask,
  deleteTask
}: {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}) => {
  // Colors for different priorities
  const priorityColors: Record<string, string> = {
    low: 'bg-green-100 border-green-300',
    medium: 'bg-yellow-100 border-yellow-300',
    high: 'bg-red-100 border-red-300'
  };

  return (
    <div className={`p-4 mb-3 border-l-4 rounded-lg flex items-center justify-between ${priorityColors[task.priority]}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="mr-3 h-5 w-5"
        />
        <div>
          <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </p>
          <span className="text-sm text-gray-600">
            Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        </div>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="ml-2 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
      >
        Delete
      </button>
    </div>
  );
};

// TaskFilter Component - Filters tasks by status
const TaskFilter = ({
  currentFilter,
  setFilter
}: {
  currentFilter: FilterStatus;
  setFilter: (filter: FilterStatus) => void;
}) => {
  return (
    <div className="mb-4 flex space-x-2">
      <button
        onClick={() => setFilter('all')}
        className={`px-3 py-1 rounded ${
          currentFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        All
      </button>
      <button
        onClick={() => setFilter('active')}
        className={`px-3 py-1 rounded ${
          currentFilter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        Active
      </button>
      <button
        onClick={() => setFilter('completed')}
        className={`px-3 py-1 rounded ${
          currentFilter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        Completed
      </button>
    </div>
  );
};

// TaskList Component - Displays the list of filtered tasks
const TaskList = ({
  tasks,
  filter,
  toggleTask,
  deleteTask
}: {
  tasks: Task[];
  filter: FilterStatus;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}) => {
  // Filter tasks based on the current filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div>
      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks to display</p>
      ) : (
        filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        ))
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  // State for tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Load tasks from localStorage on initial render
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    }
    return [];
  });
  
  // State for current filter
  const [filter, setFilter] = useState<FilterStatus>('all');

  // Effect to save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task
  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now()
    };
    setTasks([...tasks, newTask]);
  };

  // Function to toggle task completion status
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to delete a task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">React Task Manager</h1>
      
      <TaskForm addTask={addTask} />
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tasks</h2>
          <TaskFilter currentFilter={filter} setFilter={setFilter} />
        </div>
        
        <TaskList
          tasks={tasks}
          filter={filter}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default App;