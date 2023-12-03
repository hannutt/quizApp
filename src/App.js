import { useState,useEffect, Component } from 'react';
import axios from "axios";
import './App.css';
import question from "./images/question.png";
import thumbup  from "./images/thumb-up.png"
import thumbdown from "./images/thumb-down.png"
import BGmusic from "./music/BGmusic.mp3"
import BGmusic2 from "./music/BGmusic2.mp3"
import Boost from "./music/boost.mp3"
import musicIcon from "./images/double-quaver.png"
import click from "./images/click.png"
import trophy from "./images/trophy.png"
import Points from './Points';
import MusicPlayer from './MusicPlayer';
import ProgressBar from './ProgressBar';


//globaali muuttuja
var isTimeLeft = true

var correctAnswer = 'x'
//var audio = new Audio(BGmusic)

function App() {
const [showScores,setShowscores] = useState(false)
const [showPlayer,setShowPlayer] = useState(false)
const [isOpen,setIsOpen] = useState(false)
const [openSel,setOpenSel] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        {/*}
        <button onClick={()=>setShowPlayer(!showPlayer)}>Open music player</button>
  {showPlayer && <MusicPlayer/>}*/}

        <h3>History Quiz</h3>
      
       

        {/*onclickissä muutetaan showScores tilaa painiketta painamalla
        <button onClick={()=>setShowscores(!showScores)}>Show scores</button>
        {/*jos showscoresin arvo on true, kutsutaan (eli näytetään) results komponentti*
        {showScores && <Results/>}*/}
        
        {/*tässä tehdään kuvasta klikattava*/}
        <div className='menuTrigger' onClick={()=>setIsOpen(!isOpen)}>
          <img src={click} width={60} height={60}/>
        </div>
        {/*nämä näytetään / piilotetaan klikkaamalla, yhdistetään isOpen state ja css active / inactive käyttö*/}
        <div className={`DropdownMenu ${isOpen? 'active':'inactive'}`}>
          {/*img property välitetään dropdownitem komponentille*/}
        <DropDownItem img={musicIcon}/>
        
        <button onClick={()=>setOpenSel(!openSel)}>Open</button>
        {openSel && <OpenSelection/>}
        <DropDownItem img={trophy}/>
        <button onClick={()=>setShowscores(!showScores)}>Show scores</button>
        {/*jos showscoresin arvo on true, kutsutaan (eli näytetään) results komponentti*/}
        {showScores && <Results/>}
       
        </div>
        <Checkboxes/>
        
        
       
       
        
       
      </header>
    </div>
  );
}

function Results() {
  const [results,setResults] = useState([])

 
  useEffect(()=> {

    axios.get("http://localhost:3001/getResults")
    .then(results => setResults(results.data))
    .catch(err=>console.log(err))
    // console.log(results)

  },)



  const delById = (id) => {
    //alert(id)
    console.log(id)
    axios.delete(`http://localhost:3001/deleteResult/${id}`)

 
    
    
    //alert(val)
  }

  return(
    <div>
      <p>Results:</p>
      {
        results.map(result =>{

          return <div key={result._id}>
    
          <p>{result.name} {result.points}</p>
          <button onClick={()=>delById(result._id)}>x</button>
       
         
          
          </div>
        })

      }
      
    </div>
  )
}

function TimeLeft() {
  const [timeLeft,setTimeLeft] = useState(0)
  const [isBlocked,setIsBlocked] = useState(true)
  //const [isTimeLeft,setIsTimeLeft] = useState(true)

 
 
  //css-määritys jonka toteutetaan timebar palkki
  const timeBarStyle = {
    marginLeft:'auto',
    marginRight:'auto',
    height:'100%',
    //width saa arvoksi timeleft state muuttujan, kun muuttujan arvo vaihtuu, myös palkin pituus muuttuu
    width: `${timeLeft}%`,
    backgroundColor:'lightblue',
    textAlign:'center'
}




//settimeout päivittää 1 sekunnin välein timeleft statemuuttujaa,
//tässä tapauksessa siitä vähennetään luku 1 sekunnin välein
//metodi talletetaan timeoutid muuttujaan, että sitä voidaan myöhemmin käyttää cleartimeoutin parametrina
  const timeoutId = setTimeout(
    ()=>setTimeLeft(timeLeft-1),
    1000
  )
  //jos timeleft on nolla, cleartimeoutilla pysäytetään settimeout metodin suoritus
  if (timeLeft===0)
  {

   
    clearTimeout(timeoutId)
    isTimeLeft = false
    console.log(isTimeLeft)
   
  }
  //settimeout 2 kertaa koska jos istimeleft statea yrittää muuttaa if-lohkossa
  //ohjelma kaatuu
  const CBstyle = {
    backgroundColor:'white',
    textAlign:'right'
    
  }

  //vaihdetaan CBcontent divin class-property Cbcontent2-luokkaan
  const changeStyle = () =>{
    document.getElementById('CBcontent').setAttribute("class","CBcontentVisible")
  }


  
  return(
    <div>

    <p>Select time limit:</p>
    <p hidden class="show"></p>
    <div>
    <select id="setTime" class="setTime" onChange={event=>{setTimeLeft(event.target.value);changeStyle()}} name="setTime">
      <option value="00" selected>Select difficulty</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
   
  
    </div>
    
    <div style={timeBarStyle}><p>{timeLeft}</p>
    </div>
   
    </div>
    
    
   
   
    
  
   
  )
}


function DropDownItem(props) {
  return(
    <div>
    
      {/*propsin sisältämä kuva on määritelty komponentin kutsussa*/}
       <img src={props.img} width={30} height={30}></img>
    </div>
  
  )
}

function OpenSelection () {
  const [selected,setSelected] = useState('')
  const [autoRepeat,setAutoRepeat] = useState(false)
  const [ifSelected,setIfSelected] = useState(false)



  

  //ilman erillistä tapahtumankäsittelijää tässä tapauksessa ohjelma kaatuu
  const repeatHandler = () => {
    setAutoRepeat(!autoRepeat)

  }
  
  


  return(
    <div>
      {/*TALLETETAAN VALITTU OPTION ARVO SELECTED STATE MUUTTUJAAN*/}
      <select onChange={event=>setSelected(event.target.value)} name="tracks" id="tracks">
      <option value="bgmusic">Bg music track 1</option>
      <option value="bgmusic2">Bg music track 2</option>
      <option value="bgmusic3">Bg music track 3</option>
     
      </select>
      
      <br></br>
      {/*jos näytetään useampi kuin yksi html elementti ehdon ollessa true, ne täytyy kääriä esim. yhden divin
      sisään jos selected staten arvo on tyhjä (eli ? jälkeinen) niin piilotetan input ja label elementit
      muussa tapauksessa eli : jälkeen näytetään em. elementit*/}
      { (selected === '') ? <div> <input hidden id="autorepCB" type='checkbox' onChange={repeatHandler}></input> 
      <label hidden for="autorepCB">Auto repeat?</label></div>:
      <div> <input id="autorepCB" type='checkbox' onChange={repeatHandler}></input> 
      <label  for="autorepCB">Auto repeat?</label></div>}
      
      
      <br></br>
      {/*
      <button onClick={()=>setSelected('pause')}>Pause</button>*/}
      <button onClick={()=>console.log(selected)}>Select</button>
      <MusicPlayer selected={selected} autoRepeat={autoRepeat}/>
    </div>
  )
}






    


function Checkboxes(props) {


  console.log('time left status ',isTimeLeft)
  const [listindex,setListindex] = useState(0)
  const [message,setMessage] = useState(false)
  var [checked,setChecked] = useState(false)
  const [correct,setCorrect] = useState(false)
  const [questionNum,setQuestionNum] = useState(0)
  const [yesAns,setYesAns] = useState('yes')
  const [noAns,setNoAns] = useState('no')
  const [points,setPoints] = useState(0)
  const [progressTracker,setProgressTracker] = useState(0)
  const [wrong,setWrong] = useState(false)
  
  
  const questions = ['Did WW2 started in 1939?','Was Franklin D Roosevelt prerident in 1943?','Was Finland part of Soviet Union in 1965?',
  'Did Cold War started in 1947?','Was Stalingrad the actual city name of present-day Volgograd in 1960?','Did Argentina win the Falklands War?',
'Was Francisco franco the dictator of Spain?']
  const answers = ['yes','yes','no','no','yes','no','yes']



  {/*tämä funktio suoritetaan aina kun checkboksi on valittu*/}
  const handleChange = (e) => {
    //listindex state pitää kirjaa answer-listan meneillään olevasta "kohdasta" eli ensimmäisen kysymyksen
    //vastaus on listassa sijalla nolla, seuraavan sijalla 1 jne.
    setListindex(listindex+1)
    console.log(listindex)
    
    //muuttujaan tallennetaan klikatun checkboksin value kentän arvo.
    const CBvalue = e.target.value;
    console.log(CBvalue)
    //vastauksen tarkistus
    if (CBvalue === answers[listindex])
    {
    
      
      setCorrect(true);
      setQuestionNum(questionNum+1)
      console.log(correct)
      console.log(questionNum)
      setChecked(false)
      correctAnswer = true
      setTimeout(()=>{
        correctAnswer = 'x'
      },3000)
      //jos aikaa on jäljellä pisteitä saa enemmän
      if (isTimeLeft === true)
      {
        setPoints(points+2)
        //progress barin päivitys 10% kerrallaan
        setProgressTracker(progressTracker+10)
       

      }
      else {
        setPoints(points+1)
        setProgressTracker(progressTracker+10)
      }
     
      setMessage(true)
      setTimeout(()=>{
        setMessage(false)
      },3000)
    }
    else if (CBvalue !== answers[listindex])
    {
      correctAnswer = false
    
      setCorrect(true);
      setQuestionNum(questionNum+1)
      setChecked(false)
      setPoints(points-1)
      setWrong(true)
     
      

    }
      {/*wrong state falseksi 3 sekunnin jälkeen, jolloin myös ImagesWrong komponentti piilotetaan
    suoritetaan tässä koska return lausekkeen jälkeen suoritettaessa ruudulle tulee interval id tms. numeroita*/}
    {setTimeout(() => {setWrong(false) },3000)}

    
    
  };
  return (
    <div>
    
      {/*points funktion kutsu ja points-propertyn määritys property saa arvokseen points staten*/}
      <Points points={points}/>
      <ProgressBar completed={progressTracker}/>
      
      <TimeLeft/>
      {wrong && <ImagesWrong/> }
    
      
      <Images/>
    

      
     
    
      
       {/*EHDOLLINEN REDERÖINTI, JOS CORRECT STATE MUUTTUJAN ARVON ON TRUE NÄYTETÄÄN SEURAAVA KYSYMYS, MUUTEN
       LISTAN ENSIMMÄINEN KYSYMYS*/}
      
      <div id="CBcontent" className='CBcontent'>
      {correct ? <p id="Question">{questions[questionNum]}</p>:<p id="Question">{questions[0]}</p>}
      
      {message && <h3>Correct</h3>}
      {wrong && <h3>Wrong</h3>}
      {listindex==3 && <InputForm points={points}/>}
      <label>
      <input type="checkbox" value={yesAns} onChange={handleChange} checked={checked}></input>
      Yes
      </label>
      <br></br>
      <label>
      <input type="checkbox" value={noAns} onChange={handleChange} checked={checked}></input>
      No
      </label>
      </div>
     
    </div>
       

  )
}

function Images() {
  if (correctAnswer === true)
  {
    return (
      <img src={thumbup} width={70} height={70}/>
    )
  }
  
  else  {
    return(
      <img src={question} width={70} height={70}/>
  
    )
    
  }
 
}
//tumbs downille oma komponentti, koska jostain syystä se ei muuten poistu settimeout funktiota käyttämällä
function ImagesWrong() {
  return (
    <img src={thumbdown} width={70} height={70}/>

  )

}

function InputForm(props) {
  const [playerName,setPlayerName] = useState('')
  const [timeLimit,setTimeLimit] = useState(15)
  //pisteet talletetaan points stateen joka on alustettu Checkbox komponentissa.
  //tähän komponenttiin se saadaan käytettäväksi props parametrin avulla
  //alla playerpointsin arvoksi asetetaan props.points eli checkboksin staten arvo
  const [playerPoints,setPlayerPoints] = useState(props.points)

 
  const inputFormtimeoutId = setTimeout(
    ()=>setTimeLimit(timeLimit-1),
    1000)
    

  if (timeLimit===0)
  {
    
    const playerPointsVar = document.getElementById("playerPoints").value
    const playerNameVar = document.getElementById("playerName").value
 
    clearTimeout(inputFormtimeoutId)
    //tarkistus, jos nimi kenttä on tyhjä näytetään siitä ilmoitus
    //muussa tapauksessa tallennetaan nimi ja piste kentän sisältö localstorageen
    //heti kun state muuttuja saavuttaa nollan.
    if (document.getElementById("playerName").value === '')
    {
      console.log("player name is empty")
      //localStorage.setItem("points",playerPointsVar)
    }
    else if (document.getElementById("playerName").value !== '')
    {
      localStorage.setItem("Name",playerNameVar)
      localStorage.setItem("points",playerPointsVar)
    }

  
    //kenttien tyhjennys ja arvojen tallenus localstorageen
    document.getElementById("playerPoints").value = ''
    document.getElementById("playerName").value = ''
    
  }


  const newGame = () => {
    window.location.reload()

    
  }

  const saveToMongo = (e) => {
    //setPlayerPoints(props.points)
    console.log(playerPoints)
    
  
    axios.post("http://localhost:3001/save",{
        name:playerName,
        points:playerPoints,
    }) 

    
  } 
  return(
    <div>
      <p>You finished QuizGame </p>
      <p>Enter your name</p>
      <p>If you don't save your results within 60 seconds, <br></br>they will be automatically saved to
      localStorage</p>
      {/*onchangessa tallennetaan kenttään syötetty teksti statemuuttujaan*/}
      <input type='text' id="playerName" onChange={(e)=>setPlayerName(e.target.value)} placeholder='Your name'></input>
      {/*input kenttä saa props parametrina points statemuuttujan arvon ja sen arvo asetetaan input kentän arvoksi*/}
      <input type='number' id="playerPoints" value={props.points}></input>
      <button onClick={saveToMongo} >Save</button>
      <button onClick={newGame}>Try again</button>
    </div>
  )
}



export default App;
