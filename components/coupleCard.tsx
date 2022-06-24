import { Avatar, Card, Container, Grid, Row, Text, User } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { ResponseCouples } from "./coupleList"

type Props = {
    couple: ResponseCouples
    id: String
}

type User = {
    name: String
    id: String
    image: string
}

const CoupleCard = ({couple, id}: Props) => {
    const [userData, setUserData] = useState<User>()
    useEffect(() => {
        const fetchData = async () => {
            let user
            if (couple.creatorId == id){
                user = await fetch("/api/user/" + couple.joinerId)
            }else{
                user = await fetch("/api/user/" + couple.creatorId)
            }
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