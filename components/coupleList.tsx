import { Container, Grid, Loading, Row, Spacer, User } from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'
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
      return <Loading color="warning">Loading...</Loading>
    }

    return (
      <>
        <Grid.Container>
          <Grid xs={3}>
          <Container fluid>
          {session && session.user && session.user.image && <User name={session.user.name} size="lg" pointer src={session.user.image} onClick={() => signOut()} bordered color="warning"></User>}
          {data?.map((couple) => {
              return (
                <div key={couple.id.toString()} ><Row>
                  <CoupleCard couple={couple} id={id} />
                </Row><Spacer y={1} /></div>
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
