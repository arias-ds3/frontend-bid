import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useNavigate } from "react-router-dom";

let CreateUserComponent = (props) => {
    let { createNotification } = props;

    let [email, setEmail] = useState(null);
    let [password, setPassword] = useState(null);
    let [message, setMessage] = useState("");
    let navigate = useNavigate();
    let [error, setError] = useState({})

    useEffect( () => {
        checkInputErrors();
    }, [email,password])

    let checkInputErrors = () => {
        let updatedErrors = {}

        if (email == "" || email?.length < 3){
            updatedErrors.email = "Incorret email format"
        }
        if (password == "" || password?.length < 5){
            updatedErrors.password = "To short password"
        }
        setError(updatedErrors)
    }

    let changeEmail = (e) => {
        setEmail(e.currentTarget.value)
    }
    let changePassword = (e) => {
        setPassword(e.currentTarget.value)
    }
    
    let clickCreate = async () => {
        try {
            let response = await fetch(backendURL + "/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
    
            if (response.ok) {
                let jsonData = await response.json();
                createNotification("user created successfully")
                navigate("/login");
                // setMessage("New user created");
            } else {
                let jsonData = await response.json();
    
                if (Array.isArray(jsonData.errors)) {
                    let finalErrorMessage = "";
                    jsonData.errors.forEach(obj => {
                        finalErrorMessage += obj.error + " ";
                    });
                    setMessage(finalErrorMessage.trim()); // Quita espacios finales
                } else {
                    setMessage(jsonData.errors);
                }
            }
        } catch {
            setMessage("An unexpected error occurred");
        }
    };
    

    return (
        <div>
            <h2>Register user</h2>
            <h3>{ message }</h3>
            <div className="center-box">
                <div className="form-group">
                    <input type="text" placeholder="your email" onChange={changeEmail} />
                </div>
                { error.email && <p className="errorForm">{error.email} </p>}
                <div className="form-group">
                    <input type="text" placeholder="your password"  onChange={changePassword} />
                </div>
                { error.password && <p className="errorForm">{error.password} </p>}
                <button onClick={clickCreate}>Create Acount</button>
            </div>
        </div>
    )

}

export default CreateUserComponent;