import { useState } from "react";
import Nav from "./Nav";
import Img from "../images/mars.jpg";

const Download = () => {

    const [hover, sethover] = useState(false);

    const handleMouseEnter = () => {sethover(true);};
    const handleMouseLeave = () => {sethover(false);};

    return(
        <>
            <div style={{padding:'50px'}}>
                <div style={{display:'flex',justifyContent: 'space-between'}}>
                    <Nav/>
                </div>
                
                <div style={{textAlign:'center'}}>
                    <img src={Img} width="40%" /><br/>
                    <button 
                        style={{fontFamily:'Montserrat',padding:'10px',
                                cursor:'pointer',background:'none',
                                border:'none',color:hover ? '#658BD6' : 'white'}}
                                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <h4>DOWNLOAD</h4>
                    </button>
                </div>
            </div>
        </>
    )
}
export default Download;