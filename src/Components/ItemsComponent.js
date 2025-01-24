import { useEffect, useState } from "react"
import { backendURL } from "../Globals"
import { timeStampToDate } from "../Utils"
import { Link, useNavigate } from "react-router-dom"

let ItemsComponent = () => {

    let [items, setItems] = useState([])
    let [message, setMessage] = useState("")
    let navigate = useNavigate()

    useEffect( () => {
        getItems();
    }, [])

    let getItems = async () => {
        let response = await  fetch(backendURL+"/items?apiKey="+localStorage.getItem("apiKey"))

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

    return (
        <div>
            <h2>Items</h2>
            { message != "" && <h3 className="errorMessage">{message}</h3>}
            <div class="item-list">
                { items.map ( item =>
                    (
                        <Link to={ "/item/"+item.id } >
                            <div className="item">
                                <h3>{item.name}</h3>
                                <p className="description">{item.description}</p>
                                <p className="price">{item.price}</p>
                                <p>Seller: {item.email}</p>
                                <p>Start: {timeStampToDate(item.dateStart)}</p>
                                <p>Finish: {timeStampToDate(item.dateFinish)}</p>
                            </div>
                        </Link>
                    )
                )}
            </div>
        </div>
    )

}

export default ItemsComponent