import { useEffect, useState } from "react"
import { backendURL } from "../Globals"
import { timeStampToDate } from "../Utils"
import { Link, useNavigate } from "react-router-dom"
import { Card, List } from "antd"

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
        <>
            <h2>Items</h2>
            { message != "" && <h3 className="errorMessage">{message}</h3>}

            <List grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 6
            }}
             dataSource={items} renderItem={(item) => (
                <List.Item>
                    <Card hoverable title={item.name} style={{height:"300px"}} >
                        <Link to={"/items/"+item.id} >
                            <p className="description">{item.description}</p>
                            <p className="price">{item.price}</p>
                            <p>Seller: {item.email}</p>
                            <p>Start: {timeStampToDate(item.dateStart)}</p>
                            <p>Finish: {timeStampToDate(item.dateFinish)}</p>
                        </Link>
                    </Card>
                </List.Item>
            )}>

            </List>
           
        </>
    )

}

export default ItemsComponent