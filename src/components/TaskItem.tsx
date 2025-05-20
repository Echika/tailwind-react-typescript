import type { Task } from "../types/Task";

interface TaskItemProps {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TaskItem = ({ task, toggleTask, deleteTask }: TaskItemProps) => {
  const priortiyColors: Record<string, string> = {
    low: "bg-green-100 border-green-300",
    medium: "bg-yellow-100 border-yellow-300",
    high: "bg-red-100 border-red-300",
  };

  return (
    <div
      className={`p-4 mb-3 border-l-4 rounded-lg flex items-center justify-between ${
        priortiyColors[task.priority]
      }`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="mr-3 h-5 w-5"
        />
        <div>
          <p
            className={`font-medium ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </p>
          <span className="text-sm text-gray-600">
            Priority:{" "}
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
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

export default TaskItem;
