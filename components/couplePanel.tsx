import { Center, Text } from "@mantine/core"
import { Session } from "next-auth"

type Props = {
    session: Session
  }
  

const CouplePanel = ({session}: Props) => {
    return(
        <Center sx={{
            height: '100%'
        }}>
            <Text>Welcome back, {session.user?.name}</Text>
        </Center>
    )
}

export default CouplePanel