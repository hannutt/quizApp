import { useState } from "react"
import BGmusic from "./music/BGmusic.mp3"
import BGmusic2 from "./music/BGmusic2.mp3"
import Boost from "./music/boost.mp3"
function MusicPlayer(props) {
  const [playing,setPlaying] = useState(false)
  
  console.log(props.selected)

 var lng = 0
 var audio = new Audio()

  const play = () => {
   
    if (props.selected === 'bgmusic')
    {
      audio = new Audio(BGmusic)
      audio.onloadedmetadata = (e) =>{
        if (audio.readyState > 0) {

          lng = audio.duration
          console.log(lng)
        }
      }
     
      audio.play()
      

    }
    else if (props.selected==='bgmusic2')
    {
      audio = new Audio(BGmusic2)
      //kappaleen pituuden haku
      audio.onloadedmetadata = (e) =>{
        if (audio.readyState > 0) {
          lng = audio.duration
          console.log(lng)
        }
      }
     
      audio.play()
    }

    else if (props.selected==='bgmusic3')
    {
      audio = new Audio(Boost)
      //kappaleen pituuden haku
      audio.onloadedmetadata = (e) =>{
        if (audio.readyState > 0) {
          lng = audio.duration
          console.log(lng)
        }
        
      }
     
      audio.play()
      if (props.autoRepeat===true)
      {
        //poistetaan desimaalipisti
        var lngFinal = Math.trunc(lng)
        //muutetaan sekunnit millisekunneiksi
        lngFinal = lngFinal * 1000
        //jos ehto täyttyy, settimeout simuloidaan playbuttonin klikkaus aina soitetun kappaleen keston jälkeen.
        //kappaletta siis soitetaan aina uudelleen sen päättymisen jälkeen.
        setTimeout(()=>{
          document.querySelector('#playBtn').click()

        },lngFinal)
      }
    }
    

    

    
}

const pauseMusic = () => {
  
  audio.pause()
  
}



  return(
    <div>
     
      <button id='playBtn' onClick={play}>Play</button>
      <button onClick={pauseMusic}>Pause</button>

    </div>
  )

}

  export default MusicPlayer