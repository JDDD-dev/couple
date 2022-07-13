import { Button, Center, Grid, Stack, Text } from "@mantine/core"

type Props = {
    coupleId: string
    setPanelState: Function
}

const CoupleData = ({coupleId, setPanelState}: Props) => {
    return (
        <Center sx={{
            height: '100%'
        }}>
            <Stack align="center" spacing="lg">
                <Grid justify="center">
                    <Grid.Col span={6}><Button onClick={() => setPanelState('gallery:' + coupleId)} sx={{width: '100%'}}>Gallery</Button></Grid.Col>
                    <Grid.Col span={6}><Button onClick={() => setPanelState('links:' + coupleId)} sx={{width: '100%'}}>Links Safe</Button></Grid.Col>
                    <Grid.Col span={6}><Button onClick={() => setPanelState('notes:' + coupleId)} sx={{width: '100%'}}>Notes</Button></Grid.Col>
                    <Grid.Col span={6}><Button disabled sx={{width: '100%'}}>Coming Soon...</Button></Grid.Col>
                </Grid>
            </Stack>
        </Center>
    )
}

export default CoupleData