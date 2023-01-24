import { useState } from "react";
import { useNavigate } from "react-router";
import image from '../images/star.png'
import Img1 from '../images/mars.jpg'
const PostDescrip = () => {

    const navigate = useNavigate();

    const [hover, setHover] = useState(false);
    const [hover1, setHover1] = useState(false);

    const handleMouseEnter = () => {setHover(true);};
    const handleMouseLeave = () => {setHover(false);};
    const handleMouseEnter1 = () => {setHover1(true);};
    const handleMouseLeave1 = () => {setHover1(false);};

    const tab = {
        background: 'linear-gradient(180deg, rgba(0, 13, 46, 0.7) 7.81%, rgba(0, 0, 0, 0) 100%)',
        padding: '0px'
    }

    return(
        <div>
            <div style={{padding:'60px'}}>
                <div style={{display:'flex',justifyContent: 'space-between'}}>
                    {/* <SignIn /> */}
                    <div style={{cursor: 'pointer'}} onClick={()=>navigate("/")}>
                        <h1>MEMO</h1>
                        <h5>01.01.2023</h5>
                    </div>
                    <div style={{cursor: 'pointer'}}>
                        <h4>CONNECT WALLET<br/>
                        <span 
                        style={{color: hover ? '#658BD6' : 'white'}}
                        onClick={()=>navigate("/explore")}
                        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            EXPLORE MEMOS
                        </span><br/>
                        <span 
                        style={{color: hover1 ? '#658BD6' : 'white'}} 
                        onClick={()=>navigate("/post")}
                        onMouseEnter={handleMouseEnter1} onMouseLeave={handleMouseLeave1}>
                            POST A MEMO
                        </span></h4>
                    </div>
                </div>
                <div>
                    <table>
                        <tr>
                            <td style={{width:'700px',backgroundColor:'black'}}>
                                <div>
                                    <h4>PROJECT TITLE</h4>
                                    <img src={Img1} style={{width:'400px'}} />
                                    <h4>PROJECT DESCRIPTION</h4>
                                    <h4>CREATORS</h4>
                                </div>
                            </td>
                            <td style={{paddingLeft:'20px'}}>
                                <table style={tab}>
                                    <tr>
                                        <td><h4>MUSIC</h4></td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'200px'}}>
                                            <h5>18.05.2023</h5>
                                        </td>
                                        <td style={{width:'200px'}}></td>
                                        <td style={{width:'200px'}}>
                                            <h4>WISHLIST<span style={{marginLeft:'30px'}}>PURCHASE</span></h4>
                                        </td>
                                    </tr>
                                </table>
                                <table style={tab}>
                                    <tr>
                                        <td><h4>MUSIC</h4></td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'200px'}}>
                                            <h5>18.05.2023</h5>
                                        </td>
                                        <td style={{width:'200px'}}></td>
                                        <td style={{width:'200px'}}>
                                            <h4>WISHLIST<span style={{marginLeft:'30px'}}>PURCHASE</span></h4>
                                        </td>
                                    </tr>
                                </table>
                                <table style={tab}>
                                    <tr>
                                        <td><h4>MUSIC</h4></td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'200px'}}>
                                            <h5>18.05.2023</h5>
                                        </td>
                                        <td style={{width:'200px'}}></td>
                                        <td style={{width:'200px'}}>
                                            <h4>WISHLIST<span style={{marginLeft:'30px'}}>PURCHASE</span></h4>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PostDescrip;