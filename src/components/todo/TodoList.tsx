import { Center, Heading, Spinner, Stack, StackDivider } from "@chakra-ui/react"
import { TodoFilterType } from "../../types/todo"
import { useQuery } from "@tanstack/react-query"
import { fetchTodos } from "../../services/todo"
import { TodoItem } from "./TodoItem"
import { useMemo } from "react"

export function TodoList({
	filter,
	query,
}: {
	filter: TodoFilterType
	query: string
}) {
	const {
		data: todos,
		isLoading,
		error,
		isSuccess,
	} = useQuery({
		queryFn: () => fetchTodos(),
		queryKey: ["todos"],
		staleTime: 5000,
	})

	const filteredTodos = useMemo(() => {
		if (isSuccess)
			switch (filter) {
				case "completed": {
					return todos.filter((todo) => todo.completed)
				}
				case "open": {
					return todos.filter((todo) => !todo.completed)
				}
				default: {
					return todos
				}
			}
	}, [todos, filter])

	const preparedTodos = useMemo(() => {
		return filteredTodos?.filter((todo) =>
			todo.title.toLowerCase().includes(query.toLowerCase().trim()),
		)
	}, [filteredTodos, query])

	if (isLoading) return <Spinner />
	if (error)
		return (
			<Center>
				<Heading size="md">{error.message}</Heading>
			</Center>
		)
	return (
		<Stack divider={<StackDivider borderColor="brand.500" />}>
			{preparedTodos?.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</Stack>
	)
}
