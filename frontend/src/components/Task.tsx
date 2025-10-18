import { useState } from "react";


const Task = ({ task, onUpdate, onDelete, }: Props) => {


    const [editingId, setEditingId] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [assignedTo, setAssignedTo] = useState('');

    const startEdit = (task) => {
        setEditingId(task.id);
        setTitle(task.title);
        setContent(task.content || '');
        setDueDate(task.dueDate);
        setAssignedTo(task.assignedTo)
    };

    const save = async () => {
        await onUpdate(editingId, { title, content, dueDate, assignedTo });
        setEditingId(null);
        setTitle('');
        setContent('');
        setDueDate('');
        setAssignedTo('')
    };

    return (
        <div className="flex justify-between items-center gap-5 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-6 w-full max-w-2xl mb-5">
            {editingId === task.id ? (
                <div className="flex flex-col gap-2 ">
                    <input value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-3 mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] focus:ring-2 focus:ring-[var(--accent)] outline-none transition"
                    />
                    <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full px-4 py-3 mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] focus:ring-2 focus:ring-[var(--accent)] outline-none transition"
                    />
                    <div className="flex gap-2 justify-end mt-4">
                        <button onClick={() => save()} className='w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl py-3 transition-all active:scale-95'>Save</button>
                        <button onClick={() => setEditingId(null)} className='w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl py-3 transition-all active:scale-95'>Cancel</button>
                    </div>

                </div>
            ) : (
                <>
                    <div className="">

                        <strong>{task.title}</strong>
                        <p>{task.content}</p>
                        <small>Due: {new Date(task.dueDate).toLocaleString()}</small>
                    </div>
                    <p>Assigned To: {task.assignedTo.name}</p>
                    <div className="flex flex-col gap-2">
                        <button onClick={() => startEdit(task)} className='w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl py-3 transition-all active:scale-95'>Edit</button>
                        <button onClick={() => onDelete(task.id)} className='w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl py-3 transition-all active:scale-95'>Delete</button>

                    </div>
                </>

            )}
        </div>
    )
}

export default Task