import { Button } from '@nextui-org/react'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import NextLink from 'next/link'
import CoupleList from '../components/coupleList'

const Home: NextPage = () => {
  const { data: session } = useSession()

  if (session){
    return (
      <>
        <Head>
          <title>Couple</title>
        </Head>
        <CoupleList session={session}/>
      </>
    )
  }else{
    return (
      <>
        <Head>
          <title>Couple</title>
        </Head>
        <NextLink href="/api/auth/signin">
          <Button css={{
            '&:hover': {
              background: '$red700'
            }
          }} color="error">
          Login
          </Button>
        </NextLink>
      </>
    )
  }
}

export default Home
