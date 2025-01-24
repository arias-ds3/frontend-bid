
import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useNavigate } from "react-router-dom";

let LoginUserComponent = (props) => {
    let { setLogin } = props;

    let [email, setEmail] = useState(null);
    let [password, setPassword] = useState(null);
    let [message, setMessage] = useState("");
    let [error, setError] = useState({})

    let navigate = useNavigate();

    useEffect(() => {
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

    let clickLoginButton = async () => {
        let response = await fetch(backendURL+"/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body : JSON.stringify({
                email: email,
                password: password
            })
        })
        
        if ( response.ok ){
            let jsonData = await response.json();

            if (jsonData.apiKey != null){
                localStorage.setItem("apiKey",jsonData.apiKey)
                localStorage.setItem("userId",jsonData.id)
                localStorage.setItem("email",jsonData.email)
            }
            setLogin(true)
            navigate("/myItems")
    
        } else {
            let jsonData = await response.json();
            setMessage(jsonData.error)

        }
    }


    return (
        <div>
            <h2>Login</h2>
             { message  != "" && <h3 className="errorMessage"> {message} </h3>}
            <div className="center-box">
                <div className="form-group">
                    <input type="text" placeholder="your email" onChange={changeEmail} />
                </div>
                { error.email && <p className="errorForm">{error.email} </p>}
                <div className="form-group">
                    <input type="text" placeholder="your password"  onChange={changePassword} />
                 </div>
                 { error.password && <p className="errorForm">{error.password}</p>}
                <button onClick={clickLoginButton}>Login</button>
             </div>
        </div>
    )

}

export default LoginUserComponent;