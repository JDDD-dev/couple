import { Text } from '@mantine/core'

type Props = {
    coupleId: string
}

const Links = ({coupleId}: Props) => {
    return (
        <Text>{coupleId}</Text>
    )
}

export default Links