import { useLocation } from "react-router";

function Display() {
    const location = useLocation();
    // console.log('location', location)

    return (
        <>
        <h4>{location.state.title}</h4>
        <h4>{location.state.desc}</h4>
        <h4>{location.state.price}</h4>
        <h4>{location.state.creators}</h4>
        <h4>{location.state.royal}</h4>
        </>
    );
}
export default Display;