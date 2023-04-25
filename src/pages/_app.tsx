import { GameOver } from '@/components/GameOver'
import { GameContextProvider } from '@/contexts/GameContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {

  return (
    <main className='w-full h-screen overflow-y-scroll bg-game bg-cover bg-scroll p-4 relative'>
    <GameContextProvider>
      <GameOver />
      <Component {...pageProps} />
    </GameContextProvider>
    </main>
  ) 
}
