import { TaskService } from '@/services/taskService';
import SprintBoard from '@/components/SprintBoard';

export default async function HomePage() {
  // Ganti dengan ID Sprint yang ada di database Anda
  const SPRINT_ID = "ganti-pake-id-sprint-kamu"; 
  
  let initialTasks = [];
  try {
    initialTasks = await TaskService.getTasks(SPRINT_ID);
  } catch (error) {
    console.error("Fetch error:", error);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-slate-900">SprintClass Kanban</h1>
        <p className="text-slate-500">Project-Based Learning Management</p>
      </header>
      
      <SprintBoard initialTasks={initialTasks} />
    </div>
  );
}
