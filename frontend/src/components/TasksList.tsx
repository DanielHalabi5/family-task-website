

import Task from './Task';

export default function TasksList({ tasks, onUpdate, onDelete }) {


  return (
    <div className='min-h-screen flex flex-col items-center py-10 bg-[var(--bg)] text-[var(--text)] transition-all duration-300'>
      <h2 className="mb-5 text-4xl font-bold text-[var(--accent)]">Family tasks</h2>
      {tasks.length === 0 && <p>No tasks yet.</p>}
      {tasks.map(task => <Task key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />)}
    </div>
  );
}