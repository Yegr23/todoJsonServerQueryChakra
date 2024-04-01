import { useState } from "react"
import { TodoAppLayout } from "../layouts/TodoAppLayout"
import { TodoList } from "./TodoList"
import { NewTodo } from "./NewTodo"
import { TodoFilterType } from "../../types/todo"
import { TodoSearch } from "./TodoSearch"
import { TodoFilter } from "./TodoFilter"

export function TodoApp() {
	const [filter, setFilter] = useState<TodoFilterType>("all")
	const [query, setQuery] = useState("")

	return (
		<TodoAppLayout
			newTodoForm={<NewTodo />}
			todoList={<TodoList filter={filter} query={query} />}
			todoFilter={<TodoFilter filter={filter} setFilter={setFilter} />}
			todoSearch={<TodoSearch query={query} setQuery={setQuery} />}
		/>
	)
}
