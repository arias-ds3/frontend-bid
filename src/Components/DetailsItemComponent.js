import { useEffect, useState } from "react"
import { backendURL } from "../Globals"
import { timeStampToDate } from "../Utils"
import { Link, useParams } from "react-router-dom"
import { Descriptions, Input, Button, Row, Col } from "antd"

let DetailsItemComponent = (props) => {
    let { createNotification } = props;

    let [item, setItem] = useState({})
    let [message, setMessage] = useState("")
    let [bid, setBid] = useState(0);
    let [higherBid, setHigherBid] = useState(0);
    let { itemId } = useParams();

    useEffect( () => {
        getItem();
        getHigherBid();
    }, [])

    let getHigherBid = async () => {
        let response = await  fetch(backendURL+"/bids/higher?idItem="+itemId+"&apiKey="+localStorage.getItem("apiKey"))

        if (response.ok){
            let bids = await response.json()
            if (bids.length > 0){
                setHigherBid(bids[0].amount)
            }
           
        } else {
            setMessage("Error")
        }
    }

    let getItem = async () => {
        let response = await  fetch(backendURL+"/items/"+itemId+"?apiKey="+localStorage.getItem("apiKey"))

        if (response.ok){
            let jsonData = await response.json()
            setItem(jsonData)
        } else {
            setMessage("Error")
        }
    }
    let onChangeBid = (e) => {
        let value = e.currentTarget.value
        setBid(parseFloat(value))
    }

    let clickBidButton = async () => {
        let response = await  fetch(backendURL+"/bids?apiKey="+localStorage.getItem("apiKey"), {
            method: "POST",
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify({
                idItem: itemId,
                amount: bid
            })
        })

        if (response.ok){
            let jsonData = await response.json()
            createNotification("New bid added")
            getHigherBid();
        } else {
            let jsonData = await response.json()
            setMessage(jsonData.error)
        }
    }

    return (
        <div>
            <Descriptions title={item.name} layout="vertical" >
                <Descriptions.Item label="Description" span={3}>{item.description} </Descriptions.Item>
                <Descriptions.Item label="initial price">{item.initialPrice} $ </Descriptions.Item>
                <Descriptions.Item label="Description">{item.description} </Descriptions.Item>
                <Descriptions.Item label="Seller">{item.email} </Descriptions.Item>
                <Descriptions.Item label="Start">{timeStampToDate(item.dateStart)} </Descriptions.Item>
                <Descriptions.Item label="Finish">{timeStampToDate(item.dateFinish)} </Descriptions.Item>
                <Descriptions.Item label="higher bid">
                    {higherBid}
                     <Link to={"/item/+item.id"+"/bids"}> See all bids</Link> 
                </Descriptions.Item>
                <Descriptions.Item span={3}></Descriptions.Item>
                <Descriptions.Item span={3}> 
                    <Row justify="center" style={{width: "100%"}}>
                        <Col>
                            <Input size="large" style={{ marginBottom: "10px"}} type="number" placeholder="bid" onChange={onChangeBid}></Input>
                            <Button type="primary" onClick={clickBidButton} block>Send bid</Button>
                            </Col>
                    </Row>
                </Descriptions.Item>
            </Descriptions>
            
        </div>
    )

}

export default DetailsItemComponent