import { useEffect, useState } from "react"
import { backendURL } from "../Globals"
import { timeStampToDate } from "../Utils"
import { Link, useParams } from "react-router-dom"

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
            <h2>Items</h2>
            { message != "" && <h3 className="errorMessage">{message}</h3>}
            <div class="item-list">
                        <div className="item">
                            <h3>{item.name}</h3>
                            <p className="description">{item.description}</p>
                            <p className="price">{item.initialPrice} $</p>
                            <p>Seller: {item.email}</p>
                            <p>Start: {timeStampToDate(item.dateStart)}</p>
                            <p>Finish: {timeStampToDate(item.dateFinish)}</p>
                            <p>higher bid: { higherBid }</p>
                            <h3>New bid for this item</h3>
                                <div className="form-gruop">
                                    <input type="number" placeholder="Bid" onChange={onChangeBid}></input>
                                </div>  
                                <button onClick={clickBidButton}>Send bid</button>
                                <Link to={"/item/+item.id"+"/bids"}> See all bids</Link>
                        </div>
    
            </div>
        </div>
    )

}

export default DetailsItemComponent