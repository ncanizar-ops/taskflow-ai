import {
  useTaskStore,
  type PriorityFilter,
  type StatusFilter,
} from '../store/taskStore';

const STATUS: StatusFilter[] = ['all', 'active', 'completed'];
const PRIORITY: PriorityFilter[] = ['all', 'high', 'medium', 'low'];

function Pill({
  active,
  label,
  onClick,
  first,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  first?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      data-filter-first={first ? '' : undefined}
      className={`rounded-full px-3 py-1 text-sm capitalize transition ${
        active
          ? 'bg-accent text-white'
          : 'bg-neutral-800 text-neutral-400 hover:text-neutral-200'
      }`}
    >
      {label}
    </button>
  );
}

export function FilterBar() {
  const { statusFilter, priorityFilter, setStatusFilter, setPriorityFilter } =
    useTaskStore();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex gap-2">
        {STATUS.map((s, i) => (
          <Pill
            key={s}
            label={s}
            first={i === 0}
            active={statusFilter === s}
            onClick={() => setStatusFilter(s)}
          />
        ))}
      </div>
      <div className="h-4 w-px bg-neutral-700" />
      <div className="flex gap-2">
        {PRIORITY.map((p) => (
          <Pill
            key={p}
            label={p}
            active={priorityFilter === p}
            onClick={() => setPriorityFilter(p)}
          />
        ))}
      </div>
    </div>
  );
}
