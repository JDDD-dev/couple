import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'

function MyApp({ 
  Component,
  pageProps: { session, ...pageProps} }: AppProps) {

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
        <meta name='viewport' />
      </Head>
      <SessionProvider session={session}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider withNormalizeCSS withGlobalStyles theme={{ colorScheme }}>
            <Component {...pageProps} />
          </MantineProvider>
        </ColorSchemeProvider>
      </SessionProvider>
      </>
  )
}

export default MyApp
