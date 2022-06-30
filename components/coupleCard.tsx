import { Avatar, Box, Group, UnstyledButton, Text, useMantineTheme } from "@mantine/core"
import { useEffect, useState } from "react"
import { ResponseCouples } from "./coupleList"

type Props = {
    couple: ResponseCouples
    id: String
}

type User = {
    name: String
    id: String
    image: string
    email: string
}

const CoupleCard = ({couple, id}: Props) => {
    const theme = useMantineTheme()
    const [userData, setUserData] = useState<User>()
    useEffect(() => {
        const fetchData = async () => {
            let user
            if (couple.creatorId == id){
                user = await fetch("/api/user/" + couple.joinerId)
            }else{
                user = await fetch("/api/user/" + couple.creatorId)
            }
            const userJson = await user.json()
            setUserData(userJson)
        }
        
        fetchData().catch(console.error)
    }, [couple.creatorId, couple.joinerId, id])


    return (
        <UnstyledButton
            sx={{
            display: 'block',
            width: '100%',
            padding: theme.spacing.md,
            marginBottom: theme.spacing.md,
            borderRadius: theme.radius.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

            '&:hover': {
                backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            },
            }}
        >
            <Group>
                <Avatar
                    src={userData?.image}
                    radius="xl"
                />
                <Box sx={{ flex: 1 }}>
                    <Text size="sm" weight={500}>
                        {userData?.name}
                    </Text>
                    <Text color="dimmed" size="xs">
                        {userData?.email}
                    </Text>
                </Box>
            </Group>
        </UnstyledButton>
    )
}

export default CoupleCard