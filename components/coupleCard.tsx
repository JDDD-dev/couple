import { ResponseCouples } from "./coupleList"

type Props = {
    couple: ResponseCouples
}


const CoupleCard = ({couple}: Props) => {
    return (
        <div>
            <h1>{couple.id}{couple.creatorId}</h1>
        </div>
    )
}

export default CoupleCard