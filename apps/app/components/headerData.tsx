import { ActionIcon, Group, useMantineColorScheme, Text } from "@mantine/core"
import Image from "next/image"
import { MoonStars, Sun } from "tabler-icons-react"

const HeaderData = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()

    return (
        <Group sx={{ height: '100%' }} px={20} position="apart">
            <Image src="/heart.svg" height="60" width="60" alt="" />
            <Text size="lg" weight="bold" variant="gradient" gradient={{ from: '#F03E3E', to: '#FFE066', deg: 45}}>Couple-APP</Text>
            <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
              {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
            </ActionIcon>
          </Group>
    )
}

export default HeaderData