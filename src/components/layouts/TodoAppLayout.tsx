import { Flex, Stack } from "@chakra-ui/react"
import { ReactNode } from "react"

export function TodoAppLayout({
	todoList,
	newTodoForm,
	todoFilter,
	todoSearch,
}: {
	todoList: ReactNode
	newTodoForm: ReactNode
	todoFilter?: ReactNode
	todoSearch?: ReactNode
}) {
	return (
		<Stack
			rounded={3}
			p={3}
			h="400px"
			maxW="400px"
			bg="brand.100"
		>
			<Flex align="center" justify="right" gap={2}>
				{todoSearch}
				{todoFilter}
				{newTodoForm}
			</Flex>
			{todoList}
		</Stack>
	)
}
