import { Divider, Loader, Skeleton, Stack } from '@mantine/core'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import CoupleCard from './coupleCard'

export type ResponseCouples = {
  id: String
  creatorId: String
  joinerId: String | undefined
  created: String
}

const CoupleList = () => { 

    const [state, setState] = useState(true)
    const [data, setData] = useState<ResponseCouples[]>()
    const [id, setId] = useState("")
    useEffect(() => {
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
      return <Skeleton height="50" circle mb="xl" />
    }

    return (
          <Stack justify="flex-start" spacing="lg">
            {data?.map((couple) => {
              return (
                <div key={couple.id.toString()} >
                  <CoupleCard couple={couple} id={id} />
                  <Divider />
                </div>
              )
            })}
          </Stack>


    )
}

export default CoupleList
