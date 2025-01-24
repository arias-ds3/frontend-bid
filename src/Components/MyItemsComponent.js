import { useEffect, useState } from "react"
import { backendURL } from "../Globals"
import { timeStampToDate } from "../Utils"
import { useNavigate } from "react-router-dom"

let MyItemsComponent = (props) => {
    let { createNotification } = props;

    let [items, setItems] = useState([])
    let [message, setMessage] = useState("")
    let navigate = useNavigate();

    useEffect( () => {
        getItems();
    }, [])

    let getItems = async () => {
        let response = await  fetch(backendURL+"/items?apiKey="+localStorage.getItem("apiKey")
        +"&idUser="+localStorage.getItem("userId"))

        if (response.status == 401){
            navigate("/login")
            return
        }

        if (response.ok){
            let jsonData = await response.json()
            setItems(jsonData)
        } else {
            setMessage("Error")
        }
    }

    let deleteItem = async (id) => {
         let response = await fetch(backendURL+"/items/"+id+"?apiKey="+localStorage.getItem("apiKey"),{
            method: "DELETE"
        })
        if (response.ok){
            //getItems();
            let updatedItems = items.filter(item => item.id != id)
            createNotification("Item deleted successfully")
            setItems(updatedItems)
        } else {
            let jsonData = await response.json();
            setMessage(jsonData.error)
            
        }
    }

    let editItem = (id) => {
        navigate("/item/edit/"+id)
    }

    return (
        <div>
            <h2>Items</h2>
            { message != "" && <h3 className="errorMessage">{message}</h3>}
            <div class="item-list">
                { items.map ( item =>
                    (
                        <div className="item">
                            <h3>{item.name}</h3>
                            <p className="description">{item.description}</p>
                            <p className="price">{item.price}</p>
                            <p>Seller: {item.email}</p>
                            <p>Start: {timeStampToDate(item.dateStart)}</p>
                            <p>Finish: {timeStampToDate(item.dateFinish)}</p>
                            <button onClick={() => {deleteItem(item.id)}}>Delete</button>
                            <button onClick={() => {editItem(item.id)}}>Edit</button>
                        </div>
                    )
                )}
            </div>
        </div>
    )

}

export default MyItemsComponent