import { Button } from '@nextui-org/react'
import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import CoupleList from '../components/coupleList'

const Home: NextPage = () => {
  const { data: session } = useSession()

  if (session){
    return (
      <>
        <Head>
          <title>Couple</title>
        </Head>
        <CoupleList />
      </>
    )
  }else{
    return (
      <>
        <Head>
          <title>Couple</title>
        </Head>
        <Button onPress={() => signIn('discord')} css={{
            '&:hover': {
              background: '$red700'
            }
          }} color="error">
          Login
        </Button>
      </>
    )
  }
}

export default Home
