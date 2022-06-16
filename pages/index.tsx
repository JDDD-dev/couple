import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import CoupleList from '../components/coupleList'

const Home: NextPage = () => {
  const { data: session } = useSession()

  if (session){
    return (
      <div>
        <Head>
          <title>Couple</title>
        </Head>
        <CoupleList session={session}/>
      </div>
    )
  }else{
    return (
      <div>
        <Head>
          <title>Couple</title>
        </Head>
        <Link href="/api/auth/signin">
          <a>Login</a>
        </Link>
      </div>
    )
  }
}

export default Home
