import { Button, Modal, TextInput, Group } from "@mantine/core"
import { useForm } from "@mantine/form"
import { showNotification } from "@mantine/notifications"
import { useState } from "react"
import { AlertTriangle, At, Check } from "tabler-icons-react"

const CreateCouple = () => { 
    const [opened, setOpened] = useState(false)

    const handleSubmit = async (values: {email: string}) => {
      setOpened(false)
      form.reset()
      const res = await fetch('/api/coupleRequest/create', {
        method: 'POST',
        body: JSON.stringify(values.email)
      })

      if (res.status == 400){
        showNotification({
          title: "ERROR",
          message: await res.text(),
          color: 'red',
          icon: <AlertTriangle />
        })
        return
      }
      showNotification({
        title: "OK",
        message: await res.text(),
        color: 'green',
        icon: <Check />
      })
    }

    const form = useForm({
      initialValues: {
        email: ''
      },
      validate : {
        email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      },
    }) 

    return (
        <>
        <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create New Couple"
        centered
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            placeholder="E-mail"
            label="Enter user's e-mail"
            required
            description="Remember that the user will have to accept the request"
            {...form.getInputProps('email')}
            icon={<At size={14} />} />
          <Group position="right">
            <Button
              mt="md"
              type="submit"
            >
              Send Request!
            </Button>
          </Group>
        </form>
      </Modal><Button
        onClick={() => setOpened(true)}
      >
          Create new Couple
        </Button>
        </>
    )
}

export default CreateCouple
