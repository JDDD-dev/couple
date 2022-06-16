import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import CoupleCard from './coupleCard'
import CreateCouple from './coupleCreate'

type Props = {
  session: Session
}

export type ResponseCouples = {
  id: String
  creatorId: String
  joinerId: String | undefined
}

const CoupleList = ({session}: Props) => { 
    const [state, setState] = useState(false)
    const [data, setData] = useState<ResponseCouples[]>()
    useEffect(() => {
      setState(true)
      const fetchData = async () => {
        const dataResponse = await fetch('api/couples/getCouples')
        const jsondata: ResponseCouples[] = await dataResponse.json()
        setData(jsondata)
        setState(false)
      }

      fetchData().catch(console.error)
    }, [])

    if (state){
      return <h1>Loading...</h1>
    }

    return (
        <>
          <Image src={session.user?.image!} width="100" height="100" layout="intrinsic" />
          <button onClick={() => signOut()}>Logout</button>
            {data?.map((couple) => {
              return (
                <div key={couple.id.toString()}>
                  <CoupleCard couple={couple} />
                </div>
              )
            })}
          {data?.length! < 3 && <CreateCouple />}
        </>
    )
}

export default CoupleList
