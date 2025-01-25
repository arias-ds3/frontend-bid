
import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input, Row, Col } from "antd";


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
        <Row align="middle" justify="center" style={{minHeight:"70vh"}}>
            <Col>
                <Card title="Login" style={{ minWidth: "300px", maxWidth: "500px"}}>
                    <Input size="large" style={{marginBottom: "10px"}} type="text" placeholder="you email" onChange={changeEmail}/>
                    <Input size="large" style={{marginBottom: "10px"}} type="text" placeholder="you password" onChange={changePassword}/>
                    <Button type="primary" style={{marginBottom: "10px"}} onClick={clickLoginButton} block>Login</Button>
                </Card>
             </Col>
        </Row>
    )

}

export default LoginUserComponent;