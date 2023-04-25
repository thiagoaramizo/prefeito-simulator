
import { Header } from '@/components/Header'

import { NewRegion } from '@/components/NewRegion'
import { Region } from '@/components/Region'
import { GameContext } from '@/contexts/GameContext'

import { useContext } from 'react'

export default function PlayPage() {

  const {regions } = useContext(GameContext)

  return (
   <>

    <Header/>

    <div className='grid gap-8 my-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start'>
      {regions.map( (region) => {
        return <Region key={region.id} region={region} />
      } )}
      <NewRegion />
    </div>

    



   </>
  )
}
