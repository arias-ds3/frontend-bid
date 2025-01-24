import { use, useEffect, useState } from "react"
import { backendURL } from "../Globals";
import { useNavigate } from "react-router-dom";

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

    return (
        <div>
            <h2>Create Item</h2>
            { message != "" && <h3 className="errorMessage">{message}</h3>}
            <div className="center-box">
                <div className="form-group">
                    <input type="text" placeholder="name" onChange={ (e) => changeProperty("name",e)} />
                </div>
                { error.name && <p className="errorForm">{error.name} </p>}
                <div className="form-group">
                    <input type="text" placeholder="description"  onChange={ (e) => changeProperty("description",e)} />
                </div>
                { error.description && <p className="errorForm">{error.description} </p>}
                <div className="form-group">
                    <input type="number" placeholder="price"  onChange={ (e) => changeProperty("initialPrice",e)} />
                </div>
                { error.initialPrice && <p className="errorForm">{error.initialPrice} </p>}
                <div className="form-group">
                    <input type="datetime-local" placeholder="date finish"  onChange={(e) => changeDate(e)} />
                </div>
                { error.dateFinish && <p className="errorForm">{error.dateFinish} </p>}
                <button onClick={clickCreate}>Create Item</button>
            </div>
        </div>
    )
}

export default CreateItemComponent