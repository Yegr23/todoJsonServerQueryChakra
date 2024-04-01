import { Box, Button, Checkbox, Flex } from "@chakra-ui/react"
import { Todo } from "../../types/todo"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTodo, toggleTodoCompleted } from "../../services/todo"
import { memo } from "react"
import { ExpandableText } from "../uikit/ExpandableText"

export const TodoItem = memo(function TodoItem({ todo }: { todo: Todo }) {
	console.log("item ", todo.id)
	const client = useQueryClient()

	const { mutate: deleteThisTodo } = useMutation({
		mutationFn: () => deleteTodo(todo.id),
		onSuccess: (deletedTodo) => {
			// client.invalidateQueries({
			// 	queryKey: ["todos"],
			// })

			client.setQueryData<Todo[]>(["todos"], (oldTodos) =>
				oldTodos?.filter((todo) => todo.id !== deletedTodo.id),
			)
		},
	})
	const { mutate: toggleTodoStatus } = useMutation({
		mutationFn: () => toggleTodoCompleted(todo.id, !todo.completed),
		onSuccess: (toggledTodo) => {
			// client.invalidateQueries({
			// 	queryKey: ["todos"],
			// })
			client.setQueryData<Todo[]>(["todos"], (oldTodos) =>
				oldTodos?.map((todo) =>
					todo.id === toggledTodo.id ? toggledTodo : todo,
				),
			)
		},
	})
	return (
		<Flex alignItems="center" gap={2}>
			<Checkbox
				isChecked={todo.completed}
				onChange={() => toggleTodoStatus()}
			/>
			<ExpandableText noOfLines={2}>{todo.title}</ExpandableText>
			<Button
				size="xs"
				ml="auto"
				colorScheme="brand"
				fontSize={20}
				p="0"
				onClick={() => deleteThisTodo()}
			>
				<Box transform="translateY(-6%)">&times;</Box>
			</Button>
		</Flex>
	)
})
