import { Button, Flex, Input } from "@chakra-ui/react"
import { SearchIcon } from "../icons/SearchIcon"
import React from "react"

export function TodoSearch({
	query,
	setQuery,
}: {
	query: string
	setQuery: React.Dispatch<React.SetStateAction<string>>
}) {
	return (
		<Flex
			color="gray.400"
			position="relative"
			bg="white"
			border="2px"
			borderColor="gray.300"
			rounded="lg"
			overflow="hidden"
			transition="ease 200ms"
			_hover={{
				"borderColor": "brand.600",
				"> Button": {
					backgroundColor: "brand.600",
					borderColor: "brand.600",
				},
			}}
			_focusWithin={{
				"borderColor": "brand.700",
				"> Button": {
					backgroundColor: "brand.700",
					borderColor: "brand.700",
				},
			}}
			h="40px"
		>
			<Input
				type="text"
				variant="none"
				bg="brand.100"
				h="100%"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<Button
				bg="gray.300"
				rounded="none"
				borderLeft="2px"
				borderColor="gray.300"
				h="100%"
				colorScheme="brand"
				color="brand.100"
			>
				<SearchIcon />
			</Button>
		</Flex>
	)
}
