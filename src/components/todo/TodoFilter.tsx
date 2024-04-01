import {
	Button,
	Menu,
	MenuButton,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
} from "@chakra-ui/react"
import { TodoFilterType } from "../../types/todo"
import { memo } from "react"

export const TodoFilter = memo(function TodoFilter({
	filter,
	setFilter,
}: {
	filter: TodoFilterType
	setFilter: React.Dispatch<React.SetStateAction<TodoFilterType>>
}) {
	console.log("render filter")
	return (
		<Menu matchWidth>
			<MenuButton minW="120px" as={Button} colorScheme="brand">
				{filter}
			</MenuButton>
			<MenuList minWidth="240px">
				<MenuOptionGroup
					onChange={(e) => {
						setFilter(e as TodoFilterType)
					}}
				>
					<MenuItemOption value="all">All</MenuItemOption>
					<MenuItemOption value="open">open</MenuItemOption>
					<MenuItemOption value="completed">completed</MenuItemOption>
				</MenuOptionGroup>
			</MenuList>
		</Menu>
	)
})
