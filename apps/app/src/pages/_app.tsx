import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { NotificationsProvider } from '@mantine/notifications'
import Head from 'next/head'

function MyApp({ 
  Component,
  pageProps}: AppProps) {

    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
      key: 'mantine-color-scheme',
      defaultValue: 'dark',
      getInitialValueInEffect: true,
    })
    const toggleColorScheme = (value?: ColorScheme) =>
      setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <>
      <Head>
      <title>Couple</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <SessionProvider session={pageProps.session}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider withNormalizeCSS withGlobalStyles theme={{ colorScheme, fontSizes: { xl: 100 } }}>
            <NotificationsProvider autoClose={4000}>
                <Component {...pageProps} />
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </SessionProvider>
    </>
  )
}

export default MyApp;
