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
        </>
    );
}
export default Display;
// import { useState } from "react";

// function Form(props) {
//     const [validationMessages, setValidationMessages] = useState([]);
//     const [formData, setFormData] = useState({});
//     const handleChange = ({ target }) => {
//      setFormData({ ...formData, [target.name]: target.value });
//     }
//     const handleClick = (evt) => {
//         validateForm();
//         if (validationMessages.length > 0) {
//             evt.preventDefault();
//         }
//         console.log({"Name" : formData.fullName,"Contact": formData.contact })
//     }
//     const validateForm = () => {
//         const { fullName, contact } = formData;
//         setValidationMessages([]);
//         let messages = [];
//         if (!fullName) {
//             messages.push("Name is required");
//         }
//         if (!contact) {
//             messages.push("Contact is required");
//         }
//         setValidationMessages(messages);
//     }
    
//     return (
//         <div >
//             <form>
//                 <label>Name</label>
//                 <input value={formData.fullName || ''} onChange={handleChange} type="text" name="fullName" />
//                 <label>Contact</label>
//                 <input value={formData.contact || ''} onChange={handleChange} type="text" name="contact" />
//                 <button type="button" onClick={handleClick}>Save</button>
//             </form>
//             <br></br>
//             <div>{validationMessages.length > 0 && <span>Validation Summary</span>}
//                 <ul>
//                     {validationMessages.map(vm => <li key={vm}>{vm}</li>)}
//                 </ul>
//             </div>
//         </div>);
// }

// export default Form;