import { Divider, Skeleton, Stack } from '@mantine/core'
import { Session } from 'next-auth'
import { useEffect, useState } from 'react'
import { CouplesResponse } from '../lib/types'
import CoupleCard from './coupleCard'
import CreateCouple from './coupleCreate'

type Props = {
  session: Session
  state: Boolean
  usersData: CouplesResponse[] | undefined
}

const CoupleList = ({session, state, usersData}: Props) => { 

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
            {usersData?.map((couple) => {
              return (
                <div key={couple.id.toString()} >
                  <CoupleCard couple={couple} id={session.userId} />
                  <Divider />
                </div>
              )
            })}
            {usersData && usersData.length <= 2 && <CreateCouple />}
          </Stack>
    )
}

export default CoupleList
