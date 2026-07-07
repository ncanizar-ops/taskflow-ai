export function EmptyState() {
  return (
    <div className="flex animate-fade-in flex-col items-center gap-2 rounded-xl border border-dashed border-neutral-800 py-16 text-center">
      <div className="text-5xl">🗒️</div>
      <p className="text-neutral-300">No tasks here yet</p>
      <p className="text-sm text-neutral-500">
        Add your first task above to get started.
      </p>
    </div>
  );
}
