import { Button, Container, Grid, Image, Loading, Row, Spacer, User } from '@nextui-org/react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
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
      return <Loading color="warning">Loading...</Loading>
    }

    return (
      <>
        <Container>
          <User name={session.user?.name} size="lg" pointer src={session.user?.image!} bordered color="warning"></User>
          <Button onClick={() => signOut()}>Logout</Button>
        </Container>
        <Grid.Container>
          <Grid xs={3}>
          <Container fluid>
          {data?.map((couple) => {
              return (
                <><Row key={couple.id.toString()}>
                  <CoupleCard couple={couple} />
                </Row><Spacer y={1} /></>
              )
          })}
          {data?.length! < 3 && <CreateCouple />}
          </Container>
          </Grid>
          <Grid xs css={{
            backgroundColor: '$blue300'
          }}>

          </Grid>
        </Grid.Container>
      </>
    )
}

export default CoupleList
