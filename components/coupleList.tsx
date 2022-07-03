import { Divider, Skeleton, Stack } from '@mantine/core'
import { Session } from 'next-auth'
import { useEffect, useState } from 'react'
import { CouplesResponse } from '../lib/types'
import CoupleCard from './coupleCard'
import CreateCouple from './coupleCreate'

type Props = {
  session: Session
}

const CoupleList = ({session}: Props) => { 

    const [state, setState] = useState(true)
    const [data, setData] = useState<CouplesResponse[]>()
    useEffect(() => {
      const fetchData = async () => {
        const dataResponse = await fetch('api/couples/getCouples')
        const jsondata = await dataResponse.json()
        setData(jsondata)
        setState(false)
      }

      fetchData().catch(console.error)
    }, [])

    if (state){
      return (
        <>
          <Skeleton height={50} circle mb="xl" />
          <Skeleton height={8} radius="xl" />
        </>
      )
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
            {data && data.length <= 2 && <CreateCouple />}
          </Stack>
    )
}

export default CoupleList
