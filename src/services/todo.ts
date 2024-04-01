import { Todo } from "../types/todo"

const BASE = "http://localhost:3004/todos"

export async function fetchTodos(): Promise<Todo[]> {
	const res = await fetch(`${BASE}`)
	if (!res.ok) {
		throw new Error("can't fetch todos")
	}
	return res.json()
}

export async function toggleTodoCompleted(
	todoId: number,
	completed: boolean,
): Promise<Todo> {
	const res = await fetch(`${BASE}/${todoId}`, {
		method: "PATCH",
		body: JSON.stringify({ completed: completed }),
		headers: {
			"Content-Type": "application/json",
		},
	})
	if (!res.ok) {
		throw new Error("can't toggle todo's status")
	}
	return res.json()
}

export async function createTodo(title: string): Promise<Todo> {
	const res = await fetch(BASE, {
		method: "POST",
		body: JSON.stringify({ title, completed: false }),
		headers: {
			"Content-Type": "application/json",
		},
	})
	if (!res.ok) {
		throw new Error("can't create todo")
	}
	return res.json()
}

export async function deleteTodo(id: number): Promise<Todo> {
	const res = await fetch(`${BASE}/${id}`, {
		method: "DELETE",
	})
	if (!res.ok) {
		throw new Error("can't delete todo")
	}
	return res.json()
}
