import { Avatar, Card, Container, Grid, Row, Text, User } from "@nextui-org/react"
import { ResponseCouples } from "./coupleList"

type Props = {
    couple: ResponseCouples
}


const CoupleCard = ({couple}: Props) => {
    return (
            <Card>
                <Card.Header>
                    <User name={couple.id} src="https://i.pravatar.cc/150?u=a042581f4e29026024d"></User>
                </Card.Header>
            </Card>
    )
}

export default CoupleCard