export const NavBarButton = (props) => {
    const putInput = props.name === 'Search'

    if (putInput){
    return (
        <>
        <button className={props.clas}> {props.name} </button>
            <input className="searchInput"></input>
        </>
    )} else {
        return (
        <button className={props.clas}> {props.name} </button>)
    }
}