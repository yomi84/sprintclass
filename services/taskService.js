import { supabase } from '@/lib/supabase';

export const TaskService = {
  // Ambil semua task berdasarkan sprint ID
  async getTasks(sprintId) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('sprint_id', sprintId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data;
  },

  // Update status task saat di-drag
  async updateStatus(taskId, newStatus) {
    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId);
    if (error) throw error;
  }
};
