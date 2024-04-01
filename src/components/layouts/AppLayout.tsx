import { Box,  Stack } from "@chakra-ui/react"
import { ReactNode } from "react"

export function AppLayout({ children }: { children: ReactNode }) {
	return (
		<Box p={4} bg="brand.300">
			<Stack>{children}</Stack>
		</Box>
	)
}
