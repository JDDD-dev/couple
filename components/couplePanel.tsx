import { Center } from "@mantine/core"
import Image from "next/image"

const CouplePanel = () => {
    return(
        <Center sx={{
            height: '100%'
        }}>
            <Image src="/heart.svg" height="60" width="60" alt="" />
        </Center>
    )
}

export default CouplePanel