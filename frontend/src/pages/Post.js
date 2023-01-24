import { useState } from "react";
import { useNavigate } from "react-router";
import image from '../images/star.png'

const Post = () =>{

    const navigate = useNavigate();

    const [hover, setHover] = useState(false);
    const [hover1, setHover1] = useState(false);

    const handleMouseEnter = () => {setHover(true);};
    const handleMouseLeave = () => {setHover(false);};
    const handleMouseEnter1 = () => {setHover1(true);};
    const handleMouseLeave1 = () => {setHover1(false);};

    const post={
        backgroundImage: `url(${image})`,
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center',
    }

    return(
        <div style={post}>
            <div style={{padding:'50px'}}>
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
                            <span style={{color:'#658BD6'}}>
                                POST A MEMO
                            </span></h4>
                        </div>
                </div>

                <div>
                    <table style={{width:'100%'}}>
                        <tr>
                            <td style={{width:'20%',padding:'15px',cursor:'pointer'}}>
                                <h4
                                style={{color: hover1 ? '#658BD6' : 'white'}} 
                                onClick={()=>navigate("/createpost")}
                                onMouseEnter={handleMouseEnter1} onMouseLeave={handleMouseLeave1}>
                                    CREATE
                                </h4>
                                <h4>STORAGE</h4>
                                <h4>MY MEMOS</h4>
                                <h4>ANALYTICS</h4>
                                <h4>ACCOUNT</h4>
                            </td>
                            <td style={{width:'80%',padding:'10px'}}>
                                <h3>ACTIVE PROJECTS</h3>
                                <table style={{background: 'linear-gradient(180deg, rgba(0, 27, 96, 0.7) 0%, rgba(127, 1, 1, 0) 100%)',padding:'0px'}}>
                                    <tr>
                                        <td style={{paddingLeft:'40px'}}><h5>MUSIC</h5></td>
                                        <td style={{paddingLeft:'80px'}}><h5>CREATORS</h5></td>
                                    </tr>
                                    <tr>
                                        <td style={{width:'340px',paddingLeft:'40px'}}>
                                            <h5>This record is made up of music from around the globe.</h5>
                                            <h5>18. 05. 2020</h5>
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
                </div>
                
            </div>
        </div>
    );
}
export default Post;