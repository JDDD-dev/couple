import { ActionIcon, Avatar, Group, Text } from "@mantine/core"
import { Check, X } from "tabler-icons-react"
import { CoupleRequestResponse } from "../lib/types"

const acceptRequest = async (id: string) => {
    await fetch('api/coupleRequest/activate', {
        method: 'POST',
        body: JSON.stringify(id)
    })
}

const denyRequest = async (id: string) => {
    await fetch('api/coupleRequest/cancel', {
        method: 'POST',
        body: JSON.stringify(id)
    })
}

const CoupleRequestUser = ({sender, id} : CoupleRequestResponse) => {

    return (
        <Group>
            <Avatar src={sender.image} radius="xl" />

            <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
                {sender.name}
            </Text>

            <Text color="dimmed" size="xs">
                {sender.email}
            </Text>
            </div>
            <ActionIcon color='green' variant="light" onClick={() => acceptRequest(id)}><Check /></ActionIcon>
            <ActionIcon color='red'variant="light" onClick={() => denyRequest(id)}><X /></ActionIcon>
        </Group>
    )
}

export default CoupleRequestUser