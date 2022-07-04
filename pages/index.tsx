import { AppShell, Button, Center, Header, Loader, Navbar, Text, Stack } from '@mantine/core'
import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import CoupleList from '../components/coupleList'
import CouplePanel from '../components/couplePanel'
import HeaderData from '../components/headerData'
import UserShell from '../components/user'

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  if (status == 'authenticated'){
    return (
      <>
        <AppShell padding="md"
          navbar={<Navbar width={{ base: 300 }} p="xs">{<><Navbar.Section grow mt="md"><CoupleList session={session} /></Navbar.Section><Navbar.Section><UserShell session={session} /></Navbar.Section></>}</Navbar>}
          header={<Header height={80} p="xs">{<HeaderData />}</Header>}
          styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
          })}>
          {<CouplePanel />}
        </AppShell>
      </>
    )
  }else if (status == 'unauthenticated'){
    return (
      <>
        <Center sx={{
          height: '100vh'
        }}>
            <Button type="button" onClick={() => signIn('google')} >
              Sign in with Google
            </Button>
        </Center>
      </>
    )
  }else{
    return (
      <>
        <Center inline sx={{
          height: '100vh',
          width: '100vw'
        }}>
          <Stack align="center" spacing="xl">
            <Text size="xl" weight="bold" variant="gradient" gradient={{ from: '#F03E3E', to: '#FFE066', deg: 45}}>Couple-APP</Text>
            <Loader size={100} variant="bars" />
          </Stack>
        </Center>
      </>
    )
  }
}

export default Home
