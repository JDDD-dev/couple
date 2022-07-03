import { AppShell, Button, Header, Navbar, Text } from '@mantine/core'
import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import CoupleList from '../components/coupleList'
import HeaderData from '../components/headerData'
import UserShell from '../components/user'

const Home: NextPage = () => {
  const { data: session } = useSession()

  if (session){
    return (
      <>
      <AppShell padding="md"
        navbar={<Navbar width={{ base: 300 }} p="xs">{<><Navbar.Section grow mt="md"><CoupleList session={session} /></Navbar.Section><Navbar.Section><UserShell session={session} /></Navbar.Section></>}</Navbar>}
        header={<Header height={80} p="xs">{<HeaderData />}</Header>}
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}>
        {<Text>Couple data goes here</Text>}
      </AppShell>
      </>
    )
  }else{
    return (
      <>
        <Button type="button" onClick={() => signIn('google')} >
          Sign in with Google
        </Button>
      </>
    )
  }
}

export default Home
