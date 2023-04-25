import { MusicNotes, SpeakerSimpleHigh, SpeakerSimpleSlash } from '@phosphor-icons/react';
import {Howl, Howler} from 'howler'
import { useState } from 'react';

export const Music = () => {
  
  const [musicId, setMusicId] = useState<number>()
  
  const music = new Howl({
    src: ['/sounds/music.mp3'],
    loop: true,
    volume: 0.05,
    onend: function() {
      console.log('Finished!')
    }
  })

  const handleClick = () => {
    if (musicId) {
      console.log( 'musicaTocando:' + musicId)
      Howler.stop()
      setMusicId(undefined)
    } else {
      const musicIdtemp = music.play()
      console.log( musicIdtemp )
      setMusicId( musicIdtemp )
    }
  };
  
  return (
    <>
      <button className='p-4' onClick={handleClick}>
        {musicId ?
          <SpeakerSimpleHigh size={24} weight="fill" />:
          <SpeakerSimpleSlash size={24} weight="fill" />
        }
      </button>
    </>
  )
}