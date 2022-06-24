import { Avatar, Card, Container, Grid, Row, Text, User } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { ResponseCouples } from "./coupleList"

type Props = {
    couple: ResponseCouples
}

type User = {
    name: String
    id: String
    image: string
}

const CoupleCard = ({couple}: Props) => {
    const [id, setId] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            const myId = await fetch("/api/couples/getUserId")
            setId(await myId.json())
        }
        
        fetchData().catch(console.error)
    }, [])

    const [userData, setUserData] = useState<User>()
    useEffect(() => {
        const fetchData = async () => {
            const user = await fetch("/api/user/" + couple.joinerId)
            const userJson = await user.json()
            setUserData(userJson)
        }
        
        fetchData().catch(console.error)
    }, [])


    return (
            <Card>
                <Card.Header>
                    <User name={userData?.name} src={userData?.image}></User>
                </Card.Header>
            </Card>
    )
}

export default CoupleCard