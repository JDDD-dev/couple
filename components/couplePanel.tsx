import { Button, Center, Grid, Stack, Text } from "@mantine/core"
import { Session } from "next-auth"
import CoupleRequest from "./coupleRequest"

type Props = {
    session: Session
    panelState: string
  }
  

const CouplePanel = ({session, panelState}: Props) => {

    if (panelState == 'coupleRequest'){
        return <CoupleRequest />
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