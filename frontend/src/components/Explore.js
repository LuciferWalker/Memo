import { useState } from "react";
import { useNavigate } from "react-router";
import image from '../images/star.png'

const Explore = () => {

    const navigate = useNavigate();

    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {setHover(true);};
    const handleMouseLeave = () => {setHover(false);};

    const tab = {
        background: 'linear-gradient(180deg, rgba(0, 13, 46, 0.7) 7.81%, rgba(0, 0, 0, 0) 100%)',
        padding: '1px',
        cursor:'pointer'
    }

    const explore={
        backgroundImage: `url(${image})`,
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center',
    }

    return(
        <div style={explore}>
            <div style={{padding:'40px'}}>
                <div style={{display:'flex',justifyContent: 'space-between'}}>
                    {/* <SignIn /> */}
                    <div style={{cursor: 'pointer'}} onClick={()=>navigate("/")}>
                        <h1>MEMO</h1>
                        <h5>01.01.2023</h5>
                    </div>
                    <div style={{cursor: 'pointer'}}>
                        <h4>CONNECT WALLET<br/><span style={{color:'#658BD6'}}>EXPLORE MEMOS</span><br/>
                        <span 
                        style={{color: hover ? '#658BD6' : 'white'}} 
                        onClick={()=>navigate("/post")}
                        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            POST A MEMO
                        </span></h4>
                    </div>
                </div>

                <table>
                    <tr>
                        <td>
                            <table style={tab} onClick={()=>navigate("/desc")}>
                                <tr>
                                    <td style={{paddingLeft:'40px'}}><h5>MUSIC</h5></td>
                                    <td style={{paddingLeft:'80px'}}><h5>CREATORS</h5></td>
                                </tr>
                                <tr>
                                    <td style={{width:'340px',paddingLeft:'40px'}}>
                                        <h5>This record is made up of music from around the globe.</h5>
                                        <h6>18.05.2023</h6>
                                    </td>
                                    <td style={{width:'270px'}}></td>
                                    <td style={{width:'200px'}}>
                                        <h5> $ LISTEN<br/> $ DOWNLOAD</h5>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td style={{paddingLeft:'20px'}}>
                            <table style={tab} onClick={()=>navigate("/desc")}>
                                <tr>
                                    <td style={{paddingLeft:'40px'}}><h5>MUSIC</h5></td>
                                    <td style={{paddingLeft:'80px'}}><h5>CREATORS</h5></td>
                                </tr>
                                <tr>
                                    <td style={{width:'340px',paddingLeft:'40px'}}>
                                        <h5>This record is made up of music from around the globe.</h5>
                                        <h6>18.05.2023</h6>
                                    </td>
                                    <td style={{width:'270px'}}></td>
                                    <td style={{width:'200px'}}>
                                        <h5> $ LISTEN<br/> $ DOWNLOAD</h5>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <table style={{marginTop:'8px'}}>
                    <tr>
                        <td>
                            <table style={tab} onClick={()=>navigate("/desc")}>
                                <tr>
                                    <td style={{paddingLeft:'40px'}}><h5>ARCHIVES</h5></td>
                                    <td style={{paddingLeft:'80px'}}><h5>CREATORS</h5></td>
                                </tr>
                                <tr>
                                    <td style={{width:'340px',paddingLeft:'40px'}}>
                                        <h5>PROJECT DESCRIPTION</h5>
                                        <h6>18.05.2023</h6>
                                    </td>
                                    <td style={{width:'270px'}}></td>
                                    <td style={{width:'200px'}}>
                                        <h5> $ JOIN COMMUNITY<br/> $ DOWNLOAD</h5>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td style={{paddingLeft:'20px'}}>
                            <table style={tab} onClick={()=>navigate("/desc")}>
                                <tr>
                                    <td style={{paddingLeft:'40px'}}><h5>ARCHIVES</h5></td>
                                    <td style={{paddingLeft:'80px'}}><h5>CREATORS</h5></td>
                                </tr>
                                <tr>
                                    <td style={{width:'340px',paddingLeft:'40px'}}>
                                        <h5>PROJECT DESCRIPTION</h5>
                                        <h6>18.05.2023</h6>
                                    </td>
                                    <td style={{width:'270px'}}></td>
                                    <td style={{width:'200px'}}>
                                        <h5> $ JOIN COMMUNITY<br/> $ DOWNLOAD</h5>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default Explore;
