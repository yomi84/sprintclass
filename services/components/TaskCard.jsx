'use client';
import { Draggable } from '@hello-pangea/dnd';

export default function TaskCard({ task, index }) {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white p-4 mb-3 rounded-xl border border-slate-200 shadow-sm transition-all ${
            snapshot.isDragging ? 'rotate-2 shadow-xl border-blue-500 ring-2 ring-blue-200' : ''
          }`}
        >
          <h4 className="text-sm font-bold text-slate-800 mb-1">{task.title}</h4>
          <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
            {task.description || 'Tidak ada deskripsi.'}
          </p>
          
          <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-50 text-[10px] font-medium uppercase tracking-wider">
            <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              📅 {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No Deadline'}
            </span>
            <div className="flex items-center gap-1 text-slate-400 font-bold">
              <div className="w-5 h-5 bg-indigo-500 text-white rounded-full flex items-center justify-center scale-90">S</div>
              STUDENT
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
