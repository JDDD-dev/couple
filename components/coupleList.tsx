import { Divider, Skeleton, Stack } from '@mantine/core'
import { Session } from 'next-auth'
import { useEffect, useState } from 'react'
import CoupleCard from './coupleCard'

export type ResponseCouples = {
  id: String
  creatorId: String
  joinerId: String | undefined
  created: String
}

type Props = {
  session: Session
}

const CoupleList = ({session}: Props) => { 

    const [state, setState] = useState(true)
    const [data, setData] = useState<ResponseCouples[]>()
    useEffect(() => {
      const fetchData = async () => {
        const dataResponse = await fetch('api/couples/getCouples')
        const jsondata: ResponseCouples[] = await dataResponse.json()
        setData(jsondata)
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
                  <CoupleCard couple={couple} id={session.userId} />
                  <Divider />
                </div>
              )
            })}
          </Stack>


    )
}

export default CoupleList
