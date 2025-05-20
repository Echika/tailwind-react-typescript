import type { FilterStatus } from "../types/Task";

interface TaskFilterProps {
  currentFilter: FilterStatus;
  setFilter: (filter: FilterStatus) => void;
}

const TaskFilter = ({ currentFilter, setFilter }: TaskFilterProps) => {
  return (
    <div className="mb-4 flex space-x-2">
      <button
        onClick={() => setFilter("all")}
        className={`px-3 py-1 rounded ${
          currentFilter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        All
      </button>
      <button
        onClick={() => setFilter("active")}
        className={`px-3 py-1 rounded ${
          currentFilter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Active
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`px-3 py-1 rounded ${
          currentFilter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Completed
      </button>
    </div>
  );
};

export default TaskFilter;
