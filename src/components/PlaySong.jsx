import React, { useEffect, useState } from 'react'
import * as Tone from 'tone'

export const PlaySong = () => {
  const pitch = ['C4', 'C#4','D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4'];
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(1000);
  useEffect(()=> {
    let interval;
    if(start){
      interval = setInterval(() => {
        let i = Math.floor((Math.random() * (pitch.length +1)));
        const synth = new Tone.Synth().toDestination();
          synth.triggerAttackRelease(pitch[i], "8n");
            
     }, time)
    }
      return () => clearInterval(interval);
  }, [start])

    const handleClick = () => {
      
      setStart(true);
        
      
    }
    const handleStop = () => {
       setStart(false);
       console.log(stop);
    }
    const handleTime = (e) =>{
      setTime(e.target.value * 1000);
      setStart(false);
      setTimeout(()=> {
        setStart(true)
      }, 100)
    }
  return (
    <>
    <input type="number" onChange={handleTime}/>
    <div>
    <button onClick={handleClick}>
        Play song
    </button>
    <button onClick={handleStop}>
      Stop
    </button>
    </div>
    
    </>
   
  )
}

