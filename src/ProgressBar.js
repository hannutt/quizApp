import { useState } from "react"

function ProgressBar (props) {
  

    //css-määrityksiä jotka annetaan div-elementeille style={nimi} komenolla
    const containerStyle = {
        height:25,
        width:'100%',
        backgroundColor:'gray',
        borderRadius:50,
        margin:'auto'

    }

    const barChartStyle = {
        height:'100%',
        width: `${props.completed}%`,
        backgroundColor:'lightblue',
        borderRadius:'inherit',
        textAlign:'right'
    }

    const lblStyle={
        padding:5,
        color:'white'
    }


    return (
        
        <div style={containerStyle}>
            <div style={barChartStyle}>
            <span style={lblStyle}> {`${props.completed}`}%</span>
            { (props.completed === 30) ? <p id="threeInRow"> three in a row, good progress!</p>:<p id="threeInRow" hidden></p>}
            </div>
        </div>
       
    )
}

export default ProgressBar