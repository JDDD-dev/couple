import { AppShell, Button, Center, Header, Navbar } from '@mantine/core'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Session, unstable_getServerSession } from 'next-auth'
import { signIn } from 'next-auth/react'
import CoupleList from '../components/coupleList'
import CouplePanel from '../components/couplePanel'
import HeaderData from '../components/headerData'
import UserShell from '../components/user'
import { authOptions } from './api/auth/[...nextauth]'

const Home = ({session}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  if (session){
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
