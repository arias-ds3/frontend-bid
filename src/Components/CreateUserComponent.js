import { useEffect, useState } from "react";
import { backendURL } from "../Globals";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input, Row, Col, Typography, Alert }from "antd";

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
        if (password == "" || password?.length < 3){
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
   
    let { Text } = Typography;

    return (
        <Row align="middle" justify="center" style={{minHeight:"70vh"}}>
           
            <Col>
                { message != "" && <Alert type="error" message={ message } /> }
                <Card title="Create user" style={{ width: "500px"}}>
                    <Input size="large" type="text" placeholder="your email" onChange={changeEmail}/>
                    { error.email && <Text type="danger">{error.email}</Text> }
                    <Input size="large" style={{marginInTop: "10px"}} type="text" placeholder="your password" onChange={changePassword}/>
                    { error.password && <Text type="danger">{error.password}</Text> }
                    <Button type="primary" style={{marginInTop: "10px"}} onClick={clickCreate} block>Create Acount</Button>
                </Card>
            </Col>
        </Row>
    )

}

export default CreateUserComponent;