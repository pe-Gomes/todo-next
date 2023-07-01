export declare class DatabaseController {
  loadUserTasks(user: string | null): Promise<any[]>
  deleteTask(id: string | null): Promise<void>
}
