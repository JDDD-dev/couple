import { AppShell, Button, Center, Header, Navbar } from '@mantine/core'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import CoupleList from '../components/coupleList'
import CouplePanel from '../components/couplePanel'
import HeaderData from '../components/headerData'
import UserShell from '../components/user'
import { CouplesResponse } from '../lib/types'
import { authOptions } from './api/auth/[...nextauth]'

const Home = ({session}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const [panelState, setPanelState] = useState('home')
  const [usersData, setUsersData] = useState<CouplesResponse[]>()
  const [state, setState] = useState(true)
  
  useEffect(() => {
    if (session){
      (async () => {
        const jsondata = await (await fetch('api/couples/getCouples')).json()
        setUsersData(jsondata)
        setState(false)
      })()
    }
  }, [session])

  if (session){
    return (
      <>
        <AppShell padding="md"
          navbar={<Navbar width={{ base: 300 }} p="xs">{<><Navbar.Section grow mt="md"><CoupleList session={session} state={state} usersData={usersData} /></Navbar.Section><Navbar.Section><UserShell session={session} setPanelState={setPanelState} /></Navbar.Section></>}</Navbar>}
          header={<Header height={80} p="xs" >{<HeaderData />}</Header>}
          styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
          })}>
          {<CouplePanel session={session} panelState={panelState} usersData={usersData} setUsersData={setUsersData} />}
        </AppShell>
      </>
    )
  }else{
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
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)

    return {
      props: {
        session
      }
    }

}

export default Home
