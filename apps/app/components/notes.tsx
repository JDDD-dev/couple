import { Text } from '@mantine/core'

type Props = {
    coupleId: string
}

const Notes = ({coupleId}: Props) => {
    return (
        <Text>{coupleId}</Text>
    )
}

export default Notes