import type { Task, FilterStatus } from "../types/Task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  filter: FilterStatus;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TaskList = ({ tasks, filter, toggleTask, deleteTask }: TaskListProps) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
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

export default TaskList;
