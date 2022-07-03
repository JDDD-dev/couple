import { Button, Modal, TextInput, Group } from "@mantine/core"
import { useState } from "react"
import { At } from "tabler-icons-react"

const CreateCouple = () => { 
    const [opened, setOpened] = useState(false)

    return (
      <>
        <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create New Couple"
        centered
        >
          <TextInput
            placeholder="E-mail"
            label="Enter user's e-mail"
            required
            description="Remember that the user will have to accept the request"
            icon={<At size={14} />}
          />
          <Group position="right">
            <Button
              mt="md"
            >
              Send Request!
            </Button>
          </Group>
        </Modal>
        <Button
          onClick={() => setOpened(true)}
        >
          Create new Couple
        </Button>
      </>
    )
}

export default CreateCouple
