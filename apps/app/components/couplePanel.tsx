import { Button, Center, Grid, Stack, Text } from "@mantine/core"
import { Session } from "next-auth"
import CoupleData from "./coupleData"
import CoupleRequest from "./coupleRequest"
import Gallery from "./gallery"
import Links from "./links"
import Notes from "./notes"

type Props = {
    session: Session
    panelState: string
    setState: Function
    setPanelState: Function
  }
  

const CouplePanel = ({session, panelState, setState, setPanelState}: Props) => {

    if (panelState == 'coupleRequest'){
        return <CoupleRequest setState={setState} />
    }

    if (Number.isInteger(panelState)){
        return (
            <CoupleData coupleId={panelState} setPanelState={setPanelState}/>
        )
    }

    if (panelState.includes('gallery:')){
        return (
            <Gallery coupleId={panelState.split(':')[1]}/>
        )
    }

    if (panelState.includes('links:')){
        return (
            <Links coupleId={panelState.split(':')[1]}/>
        )
    }

    if (panelState.includes('notes:')){
        return (
            <Notes coupleId={panelState.split(':')[1]}/>
        )
    }

    return(
        <Center sx={{
            height: '100%'
        }}>
            <Stack align="center" spacing="lg">
                <Text>Welcome back, {session.user?.name}!</Text>
                <Grid justify="center">
                    <Grid.Col span={6}><Button component="a" href="https://coupleapp.vercel.app/" sx={{width: '100%'}}>Docs</Button></Grid.Col>
                    <Grid.Col span={6}><Button sx={{width: '100%'}}>Test</Button></Grid.Col>
                    <Grid.Col span={6}><Button sx={{width: '100%'}}>Test</Button></Grid.Col>
                    <Grid.Col span={6}><Button sx={{width: '100%'}}>Test</Button></Grid.Col>
                </Grid>
            </Stack>
        </Center>
    )
}

export default CouplePanel