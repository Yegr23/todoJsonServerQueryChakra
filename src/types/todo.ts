export type TodoFilterType = "all" | "open" | "completed"

export interface Todo {
	title: string
	id: number
	completed: boolean
}
