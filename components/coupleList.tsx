import { Loader } from '@mantine/core'
import { useSession } from 'next-auth/react'
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
      return <Loader />
    }

    return (
          <>
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
