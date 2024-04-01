import { Button, Text } from "@chakra-ui/react"
import { ReactNode, useLayoutEffect, useRef, useState } from "react"

export const ExpandableText = ({
	children,
	noOfLines,
}: {
	children: ReactNode
	noOfLines: number
}) => {
	const [expandedCount, setExpandedCount] = useState<number | undefined>(
		noOfLines,
	)
	const [isClicked, setIsClicked] = useState(false)
	const handleToggle = () => {
		setIsClicked(true)
		setExpandedCount(expandedCount ? undefined : noOfLines)
	}
	const [isTextClamped, setIsTextClamped] = useState(false)

	const ref = useRef<HTMLParagraphElement>(null)

	useLayoutEffect(() => {
		let textClamped = false
		if (ref.current && ref.current.clientHeight) {
			textClamped =
				(ref.current?.scrollHeight as number) >
					(ref.current?.clientHeight as number) || isClicked
			setIsTextClamped(textClamped)
		}
	}, [setIsTextClamped])

	return (
		<Text>
			<Text
				as="span"
				ref={ref}
				noOfLines={expandedCount}
				wordBreak="break-word"
			>
				{children}
			</Text>{" "}
			<Button
				as="span"
				display={isTextClamped ? "inline" : "none"}
				size="sm"
				onClick={handleToggle}
				p={1}
			>
				{!expandedCount ? "Show less" : "Show more"}
			</Button>
		</Text>
	)
}
