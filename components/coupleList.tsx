import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import CoupleCard from './coupleCard'
import CreateCouple from './coupleCreate'

export type ResponseCouples = {
  id: String
  creatorId: String
  joinerId: String | undefined
  created: String
}

const CoupleList = () => { 
    const { data: session } = useSession()

    const [state, setState] = useState(false)
    const [data, setData] = useState<ResponseCouples[]>()
    const [id, setId] = useState("")
    useEffect(() => {
      setState(true)
      const fetchData = async () => {
        const dataResponse = await fetch('api/couples/getCouples')
        const jsondata: ResponseCouples[] = await dataResponse.json()
        setData(jsondata)
        

        const idResponse = await fetch('api/couples/getUserId')
        const jsonId: string = await idResponse.json()
        setId(jsonId) 
        setState(false)
      }

      fetchData().catch(console.error)
    }, [])

    if (state){
      return <p>Loading...</p>
    }

    return (
          <>
            <div className='container sm bg-slate-400'>
              <Image src={session?.user?.image!} layout="responsive" width="50" height="50" />
              <p>{session?.user?.name}</p>
              <p className='text-gray-500'>{session?.user?.email}</p>
            </div>
            {data?.map((couple) => {
              return (
                <div key={couple.id.toString()} >
                  <CoupleCard couple={couple} id={id} />
                </div>
              )
            })}
            {data?.length! < 3 && <CreateCouple />}
          </>
    )
}

export default CoupleList
