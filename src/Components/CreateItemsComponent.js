import { use, useEffect, useState } from "react"
import { backendURL } from "../Globals";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input, Row, Col, Typography, Alert }from "antd";

let CreateItemComponent = (props) => {
    let { createNotification } = props;

    let [message, setMessage] = useState("");
    let [item, setItem] = useState({})
    let [error,setError] = useState({})

    useEffect(() => {
        checkIFlogin();
    }, [])

    useEffect (() => {
        checkInputErrors();
    }, [item])

    let checkIFlogin = async () => {
        let response = await fetch(backendURL+"/items?apiKey="+localStorage.getItem("apiKey"))
        
        if (response.status == 401){
            navigate("/login")
        }
    }

    let checkInputErrors = () => {
        let updatedErrors = {}

        if (item.name == "" || item.name?.length < 5){
            updatedErrors.name = "To short name"
        }
        if (item.description == "" || item.description?.length < 5){
            updatedErrors.description = "To short description"
        }
        if (item.initialPrice == "" || item.initialPrice < 0 ){
            updatedErrors.initialPrice = "Must 0 or positive"
        }
        if (item.dateFinish < new Date().getTime()){
            updatedErrors.dateFinish = "Cannot be earlier than the current date"
        }
       
        setError(updatedErrors)
    }

    let navigate = useNavigate();

    let changeProperty = (propertyName, e) => {
        let itemNew = { ...item , [propertyName] : e.currentTarget.value }
        setItem(itemNew)
    }

    let changeDate = (e) => {
        let value = e.currentTarget.value;
        let dateTimeStamp = Date.parse(value)

        let itemNew = { ...item , dateFinish : dateTimeStamp }
        setItem(itemNew)
    }
    let clickCreate = async () => {
         let response = await fetch(backendURL+"/items?apiKey="+localStorage.getItem("apiKey"), {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body : JSON.stringify(item)
                })
                
                if ( response.ok ){
                    let jsonData = await response.json();
                    createNotification("Item created")
                    navigate("/myItems")

                } else {
                    let jsonData = await response.json();
                    setMessage(jsonData.error)
        
                }
    }

    let { Text } = Typography;

    return (
        <Row align="middle" justify="center" style={{minHeight:"70vh"}}>
        
        <Col>
            { message != "" && <Alert type="error" message={ message } /> }
            <Card title="Create Item" style={{ width: "500px"}}>

                <Input size="large" type="text" placeholder="name" onChange={ (e) => changeProperty("name",e)}/>
                { error.name && <Text type="danger">{error.name}</Text> }

                <Input size="large" style={{marginInTop: "10px"}} type="text" placeholder=" description" onChange={ (e) => changeProperty("description",e)}/>
                { error.description && <Text type="danger">{error.description}</Text> }

                <Input size="large" style={{marginInTop: "10px"}} type="number" placeholder=" price"  onChange={ (e) => changeProperty("initialPrice",e)}/>
                { error.initialPrice && <Text type="danger">{error.initialPrice}</Text> }

                <Input size="large" style={{marginInTop: "10px"}} type="datetime-local" placeholder=" date finish"  onChange={(e) => changeDate(e)}/>
                { error.dateFinish && <Text type="danger">{error.dateFinish}</Text> }

                <Button type="primary" style={{marginInTop: "10px"}} onClick={clickCreate} block>Create Item</Button>
            </Card>
        </Col>
    </Row>
    )
}

export default CreateItemComponent;