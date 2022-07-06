import { Skeleton, Stack, Text } from "@mantine/core"
import { useEffect, useState } from "react"
import { CoupleRequestResponse, CouplesResponse } from "../lib/types"
import CoupleRequestUser from "./coupleRequestUser"

type Props = {
    usersData: CouplesResponse[] | undefined
    setUsersData: Function
}

const CoupleRequest = ({usersData, setUsersData} :Props) => {
    const [loading, setLoading] = useState(true)
    const [cRequestArray, setCRequest] = useState<CoupleRequestResponse[]>()

    useEffect(() => {
        (async () => {
            const data = await (await fetch('api/coupleRequest/get')).json()
            setCRequest(data)
            setLoading(false)
        })()
    }, [])

    if (!loading){
        return (
            <Stack justify="flex-start" spacing="lg">
                {cRequestArray?.map((cRequest) => {
                    return (
                        <CoupleRequestUser  key={cRequest.sender.id} sender={cRequest.sender} id={cRequest.id} cRequestArray={cRequestArray} setCRequest={setCRequest}/>
                    )
                })}
            </Stack>
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