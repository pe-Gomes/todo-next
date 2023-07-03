// E-mail on sessions but called user on db
export interface ITask {
  id: string
  user: string
  public: boolean
  task: string
  createdAt: Date | string
}
