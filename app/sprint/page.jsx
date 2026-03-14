import { TaskService } from '@/services/taskService';
import SprintBoard from '@/components/SprintBoard';

export default async function SprintPage() {
  // Masukkan ID Sprint yang ada di database Anda
  const SPRINT_ID = "YOUR_SPRINT_ID_HERE"; 
  
  let initialTasks = [];
  try {
    initialTasks = await TaskService.getTasks(SPRINT_ID);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1600px] mx-auto p-8">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Sprint Kanban</h1>
            <p className="text-slate-500 font-medium">SprintClass: Project-Based Agile Learning</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
            + New Task
          </button>
        </header>

        <SprintBoard initialTasks={initialTasks} />
      </div>
    </div>
  );
}
