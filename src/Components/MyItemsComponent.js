import { useEffect, useState } from "react"
import { backendURL } from "../Globals"
import { timeStampToDate } from "../Utils"
import { useNavigate } from "react-router-dom"
import { Table, Button } from "antd"

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
            createNotification("Item deleted successfully", "error")
            setItems(updatedItems)
        } else {
            let jsonData = await response.json();
            setMessage(jsonData.error)
            
        }
    }

    let editItem = (id) => {
        navigate("/item/edit/"+id)
    }

    let columns = [
        {
            title: "name item",
            dataIndex: "name"
        },
        {
            title: "description",
            dataIndex: "description"
        },
        {
            title: "seller",
            dataIndex: "email"
        },
        {
            title: "Start",
            dataIndex: "formatDateStart"
        },
        {
            title: "End",
            dataIndex: "formatDateFinish"
        },
        {
            title: "Delete",
            dataIndex: "id",
            render: (id) => <Button onClick={  () => {deleteItem(id)}}>Delete</Button>
        },
        {
            title: "Edit",
            dataIndex: "id",
            render: (id) => <Button onClick={  () => {editItem(id)}}>Edit</Button>
        },


    ]

    items.map( item => {
        item.formatDateStart = timeStampToDate(item.dateStart)
        item.formatDateFinish = timeStampToDate(item.dateFinish)
        return item
    })


    return (

        <div>
            <h2>Items</h2>
            { message != "" && <h3 className="errorMessage">{message}</h3>}
            <Table columns={columns} dataSource={items}/>
        </div>
    )

}

export default MyItemsComponent