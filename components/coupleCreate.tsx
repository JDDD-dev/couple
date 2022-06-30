import { Button } from "@mantine/core"
import { useState } from "react"

const CreateCouple = () => { 
    
    const [visible, setVisible] = useState(false)
    const handler = () => setVisible(true)
    const closeHandler = () => {
      setVisible(false)
    }

    return (
        <Button>Create new Couple</Button>
    )
}

export default CreateCouple
