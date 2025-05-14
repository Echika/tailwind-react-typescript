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
      </div>
    </div>
  );
};