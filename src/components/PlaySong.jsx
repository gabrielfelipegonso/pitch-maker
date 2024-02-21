import React, { useEffect, useState } from 'react'
import * as Tone from 'tone'
import classes from './PlaySong.module.css'
export const PlaySong = () => {
  const pitch = ['C4', 'C#4','D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4'];
  const talk = ['dó', 'dó sustenido', 'ré', 'ré sustenido','mi', 'fá', 'fá sustenido', 'sol', 'sol sustenido','lá', 'lá sustenido', 'see' ]
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(0);
  const [warning, setWarning] = useState(false);
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
         
        
          let i = Math.floor((Math.random() * (pitch.length)));
        funcTalk(i, funcSong);
    
        
        

            
     }, time*1000 + 4000);
    }
      return () => clearInterval(interval);
  }, [start])

    const handleClick = () => {
      if(time >0){
        setStart(true);
        setWarning(false);
      }else {
        setWarning(true);
      }
      
        
      
    }
    const handleStop = () => {
       setStart(false);
     
    }
    const handleTime = (e) =>{
      if((e.target.value == 0) || e.target.value == null){
       

        setTime(e.target.value.replace(/^0+(?!\.|$)/, ''));  
        if(start){
       setStart(false);
      setTimeout(()=> {
        setStart(true)
      }, 100);
       
        
      }}else{
          setTime(e.target.value.replace(/^0+(?!\.|$)/, ''));
          if(start){
       setStart(false);
      setTimeout(()=> {
        setStart(true)
      }, 100)
      }
    
    }}
    const handleTimePlus = () =>{
    
        setTime(parseInt(time) + 10);
        if(time == '')
        {
          setTime(10);
        }
      
    if(start){
       setStart(false);
      setTimeout(()=> {
        setStart(true)
      }, 100)
    }
     
    }

    const handleTimeMinus = () =>{
      if(time != ''){
        if(parseInt(time) - 10<0){
           setTime(0);
         }else{
             setTime(parseInt(time) - 10);
         }
       if(start){
          setStart(false);
         setTimeout(()=> {
           setStart(true)
         }, 100)
       }

      }
        }
  return (
    <>
    <h1 className={classes.titulo}>Digite intervalo em segundos</h1>
    <input className={`${classes.input} ${warning? classes.red: ''} `} type="number" value= {time} onChange={handleTime}/>
    <div className={classes.div}>
    <button className={classes.button} onClick={handleClick}>
        Play song
    </button>
    <button className={classes.button} onClick={handleStop}>
      Stop
    </button>

    </div>
    <div className={classes.div}>
      <button className={classes.button} onClick={handleTimePlus}>+10</button>
    <button className={classes.button} onClick={handleTimeMinus}>-10</button>
    </div>
    </>
   
  )
}

