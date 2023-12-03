//points funktio ottaa props parametrilla vastaan checkboks funktiossa määritellyn points-statemuuttujan
//ja näyttää sen arvon
function Points(props) {

    return(
      <div>
        <p>POINTS: {props.points}</p>
      </div>
    )
  }

  export default Points;