import { ActionIcon, Avatar, Group, Text } from "@mantine/core"
import { Check, X } from "tabler-icons-react"
import { CoupleRequestResponse } from "../lib/types"

type Props = {
    sender: {
        email: string,
        id: string,
        image: string,
        name: string
    }
    id: string
    cRequestArray: CoupleRequestResponse[]
    setCRequest: Function
    setState: Function
}

const CoupleRequestUser = ({sender, id, cRequestArray, setCRequest, setState}: Props) => {

    const acceptRequest = async (id: string) => {
        await fetch('api/coupleRequest/activate', {
            method: 'POST',
            body: JSON.stringify(id)
        })
        const newArray = cRequestArray.filter(cRequest => cRequest.id != id)
        setState(true)
        setCRequest(newArray)
    }
    
    const denyRequest = async (id: string) => {
        await fetch('api/coupleRequest/cancel', {
            method: 'POST',
            body: JSON.stringify(id)
        })
        const newArray = cRequestArray.filter(cRequest => cRequest.id != id)
        console.log(newArray)
        setCRequest(newArray)
    }

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