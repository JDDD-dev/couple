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
    email: string
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
    }, [couple.creatorId, couple.joinerId, id])


    return (
        <div></div>
    )
}

export default CoupleCard