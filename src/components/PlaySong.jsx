import React, { useEffect, useState } from 'react'
import * as Tone from 'tone'

export const PlaySong = () => {
  const pitch = ['C4', 'C#4','D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4'];
  const talk = ['dó', 'dó sustenido', 'ré', 'ré sustenido','mi', 'fá', 'fá sustenido', 'sol', 'sol sustenido','lá', 'lá sustenido', 'see' ]
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(1000);
  const funcTalk = (i, callback) => {
    var mensagem = new SpeechSynthesisUtterance('pt-br');
    mensagem.text = talk[i];
    
    speechSynthesis.speak(mensagem);
    console.log(mensagem);
    setTimeout(()=>{
      callback(i);
    },2000)
    
}

const funcSong = (i) => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(pitch[i], "8n");
}
  useEffect(()=> {
    let interval;
    if(start){
      interval = setInterval(() => {
         
        setTimeout(()=>{
          let i = Math.floor((Math.random() * (pitch.length)));
        funcTalk(i, funcSong);
        }, 1000)
        
        

            
     }, time)
    }
      return () => clearInterval(interval);
  }, [start])

    const handleClick = () => {
      
      setStart(true);
        
      
    }
    const handleStop = () => {
       setStart(false);
     
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
    <input type="number" value= {time/1000} onChange={handleTime}/>
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

