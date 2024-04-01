import {
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	useDisclosure,
	useToast,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { memo, useState } from "react"
import { createTodo } from "../../services/todo"
import { Todo } from "../../types/todo"

export const NewTodo = memo(function NewTodo() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const newTodoCreatedToast = useToast({
		title: "new todo created",
		colorScheme: "lime",
	})
	const errorToast = useToast({
		title: "new todo created",
		colorScheme: "red",
	})

	const client = useQueryClient()

	const [title, setTitle] = useState("")
	const { mutate: createNewTodo } = useMutation({
		mutationFn: () => createTodo(title),
		// onSuccess: () => {
		// 	client.invalidateQueries({
		// 		queryKey: ["todos"],
		// 	})
		// 	newTodoCreatedToast()
		// },
		onSuccess: (newTodo) => {
			client.setQueryData<Todo[]>(["todos"], (oldTodos) => [
				...(oldTodos || []),
				newTodo,
			])
			newTodoCreatedToast()
		},
		onError: errorToast,
	})

	console.log("render new todo")
	return (
		<>
			<Button onClick={onOpen} colorScheme="brand">
				create
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>New Todo</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex gap={2}>
							<Textarea
								value={title}
								onChange={(e) => {
									setTitle(e.target.value)
								}}
							/>
						</Flex>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
						<Button
							onClick={() => {
								if (title.trim()) createNewTodo()
							}}
						>
							submit
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
})
