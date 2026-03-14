'use client';
import { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { TaskService } from '@/services/taskService';

const COLUMNS = [
  { id: 'backlog', title: 'Backlog', color: 'bg-slate-100' },
  { id: 'todo', title: 'To Do', color: 'bg-blue-50' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-amber-50' },
  { id: 'review', title: 'Review', color: 'bg-purple-50' },
  { id: 'done', title: 'Done', color: 'bg-emerald-50' },
];

export default function SprintBoard({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Optimistic Update: Update UI dulu agar cepat
    const newTasks = Array.from(tasks);
    const taskIndex = newTasks.findIndex(t => t.id.toString() === draggableId);
    newTasks[taskIndex].status = destination.droppableId;
    setTasks(newTasks);

    // Kirim ke Supabase
    try {
      await TaskService.updateStatus(draggableId, destination.droppableId);
    } catch (err) {
      console.error("Gagal update database:", err);
      alert("Gagal menyimpan perubahan!");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-10 min-h-[70vh]">
        {COLUMNS.map((col) => (
          <div key={col.id} className={`w-80 flex-shrink-0 rounded-2xl ${col.color} p-4`}>
            <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="font-extrabold text-slate-700 text-xs uppercase tracking-widest">{col.title}</h3>
              <span className="text-xs font-bold bg-white px-2 py-0.5 rounded-full text-slate-400 shadow-sm">
                {tasks.filter(t => t.status === col.id).length}
              </span>
            </div>

            <Droppable droppableId={col.id}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`min-h-[400px] transition-all rounded-xl ${
                    snapshot.isDraggingOver ? 'bg-white/40' : ''
                  }`}
                >
                  {tasks
                    .filter(t => t.status === col.id)
                    .map((task, index) => (
                      <TaskCard key={task.id} task={task} index={index} />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
