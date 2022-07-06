import { Center, Skeleton, Stack, Text } from "@mantine/core"
import { useEffect, useState } from "react"
import { FriendsOff } from "tabler-icons-react"
import { CoupleRequestResponse, CouplesResponse } from "../lib/types"
import CoupleRequestUser from "./coupleRequestUser"

type Props = {
    setState: Function
}

const CoupleRequest = ({setState} :Props) => {
    const [loading, setLoading] = useState(true)
    const [cRequestArray, setCRequest] = useState<CoupleRequestResponse[]>()

    useEffect(() => {
        (async () => {
            const data = await (await fetch('api/coupleRequest/get')).json()
            setCRequest(data)
            setLoading(false)
        })()
    }, [])

    if (!loading && cRequestArray && cRequestArray.length > 0){
        return (
            <Stack justify="flex-start" spacing="lg">
                {cRequestArray?.map((cRequest) => {
                    return (
                        <CoupleRequestUser  key={cRequest.sender.id} sender={cRequest.sender} id={cRequest.id} cRequestArray={cRequestArray} setCRequest={setCRequest} setState={setState}/>
                    )
                })}
            </Stack>
        )
         
    }

    if (cRequestArray && cRequestArray.length == 0){
        return(
            <Center>
                <FriendsOff/>
                <Text>No Friend Requests</Text>
            </Center>
        )
    }

    return (
        <>
          <Skeleton height={50} circle mb="xl" />
          <Skeleton height={8} radius="xl" />
        </>
    )
}

export default CoupleRequest