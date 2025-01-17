import { useState } from "react";
import { backendURL } from "../Globals";

let CreateUserComponent = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [message, setMessage] = useState("");

    let changeEmail = (e) => {
        setEmail(e.currentTarget.value)
    }
    let changePassword = (e) => {
        setPassword(e.currentTarget.value)
    }
    
    let clickCreate = async () => {
        let response = await fetch(backendURL+"/users", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body : JSON.stringify({
                email: email,
                password: password
            })
        })
        
        if ( response.ok ){
            let jsonData = await response.json();
            setMessage("New user created")
        } else {
            setMessage("Error")

        }
    }

    return (
        <div>
            <h2>Register user</h2>
            <h3>{ message }</h3>
            <div className="center-box">
                <div className="form-group">
                    <input type="text" placeholder="your email" onChange={changeEmail} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="your password"  onChange={changePassword} />
                </div>
                <button onClick={clickCreate}>Create Acount</button>
            </div>
        </div>
    )

}

export default CreateUserComponent;