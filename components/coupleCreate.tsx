import { useState } from "react"

const CreateCouple = () => { 
    
    const [visible, setVisible] = useState(false)
    const handler = () => setVisible(true)
    const closeHandler = () => {
      setVisible(false)
    }

    return (
        <button className="">Create new Couple</button>
    )
}

export default CreateCouple
