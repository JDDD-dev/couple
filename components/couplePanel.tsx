import { Button, Center, Grid, Stack, Text } from "@mantine/core"
import { Session } from "next-auth"
import { CouplesResponse } from "../lib/types"
import CoupleRequest from "./coupleRequest"

type Props = {
    session: Session
    panelState: string
    usersData: CouplesResponse[] | undefined
    setUsersData: Function
  }
  

const CouplePanel = ({session, panelState, usersData, setUsersData}: Props) => {

    if (panelState == 'coupleRequest'){
        return <CoupleRequest usersData={usersData} setUsersData={setUsersData} />
    }

    return(
        <Center sx={{
            height: '100%'
        }}>
            <Stack align="center" spacing="lg">
                <Text>Welcome back, {session.user?.name}!</Text>
                <Grid justify="center">
                    <Grid.Col span={6}><Button sx={{width: '100%'}}>Test</Button></Grid.Col>
                    <Grid.Col span={6}><Button sx={{width: '100%'}}>Test</Button></Grid.Col>
                    <Grid.Col span={6}><Button sx={{width: '100%'}}>Test</Button></Grid.Col>
                    <Grid.Col span={6}><Button sx={{width: '100%'}}>Test</Button></Grid.Col>
                </Grid>
            </Stack>
        </Center>
    )
}

export default CouplePanel