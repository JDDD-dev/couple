import { Avatar, Box, Group, UnstyledButton, useMantineTheme, Text, Menu, Divider } from "@mantine/core"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import { Friends, Logout, Settings } from "tabler-icons-react"

type Props = {
    session: Session
}

const UserShell = ({session}: Props) => {
    const theme = useMantineTheme()

    return (
    <Group>
      <Menu withArrow placement="center" position="top" control={
        <Box
        sx={{
          paddingTop: theme.spacing.sm,
          borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
          }`,
        }}
      >
      <UnstyledButton
        sx={{
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          },
        }}
        >
        <Group>
          <Avatar
            src={session?.user?.image}
            radius="xl"
          />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {session.user?.name}
            </Text>
            <Text color="dimmed" size="xs">
              {session.user?.email}
            </Text>
          </Box>
        </Group>
      </UnstyledButton>
    </Box>
      }>
      <Menu.Item
        icon={<Settings />}>
        Settings
      </Menu.Item>
      <Divider />
      <Menu.Item
        icon={<Friends />}>
        Couple Requests
      </Menu.Item>
      <Divider />
      <Menu.Item
        icon={<Logout/>}
        color="red"
        onClick={() => signOut()}>
        Logout
      </Menu.Item>
      </Menu>
      
    </Group>
    
    )
}

export default UserShell