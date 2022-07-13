import { Text } from "@mantine/core"

type Props = {
    coupleId: string
}

const Gallery = ({coupleId}: Props) => {
    return (
        <Text>{coupleId}</Text>
    )
}

export default Gallery