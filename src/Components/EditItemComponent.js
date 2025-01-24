import { useEffect, useState } from "react"
import { backendURL } from "../Globals"
import { timeStampString, timeStampToDate } from "../Utils"
import { useNavigate, useParams } from "react-router-dom"

let EditItemComponent = () => {

    let [item, setItem] = useState({})
    let [message, setMessage] = useState("")
    let { itemId } = useParams();
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
    let clickEdit = async () => {
        let response = await fetch(backendURL+"/items/"+itemId+"?apiKey="+localStorage.getItem("apiKey"), {
                   method: "PUT",
                   headers: { "Content-Type": "application/json"},
                   body : JSON.stringify(item)
               })
               
               if ( response.ok ){
                   let jsonData = await response.json();
                   navigate("/myItems")

               } else {
                    let jsonData = await response.json();
                   setMessage(jsonData.error)
       
               }
   }


    useEffect( () => {
        getItem();
    }, [])

    let getItem = async () => {
        let response = await  fetch(backendURL+"/items/"+itemId+"?apiKey="+localStorage.getItem("apiKey"))

        if (response.ok){
            let jsonData = await response.json()
            setItem(jsonData)
        } else {
            setMessage("Error")
        }
    }

    return (
        <div>
            <h2>Edit Items</h2>
            { message != "" && <h3 className="errorMessage">{message}</h3>}
            <div class="center-box">
                        <div className="form-group">
                            <input type="text" placeholder="name" value = {item.name} 
                            onChange={ (e) => {changeProperty("name",e)}} />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="description" value = {item.description} 
                            onChange={(e) => {changeProperty("description",e)}}/>
                        </div>
                        <div className="form-group">
                            <input type="number" placeholder="price" value = {item.initialPrice}
                            onChange={(e) => {changeProperty("initialPrice",e)}} />
                        </div>
                        <div className="form-group">
                            <input type="datetime-local" placeholder="dateFinish" value={timeStampString(item.dateFinish)}
                             onChange={ (e) => {changeDate(e)}}/>
                        </div>
                        <button onClick={clickEdit}>Edit Item</button>

                            <h3>{item.name}</h3>
                            <p className="description">{item.description}</p>
                            <p className="price">{item.price}</p>
                            <p>Seller: {item.email}</p>
                            <p>Start: {timeStampToDate(item.dateStart)}</p>
                            <p>Finish: {timeStampToDate(item.dateFinish)}</p>
                       
    
            </div>
        </div>
    )

}

export default EditItemComponent