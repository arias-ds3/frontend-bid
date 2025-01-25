import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendURL } from "../Globals";
import { timeStampToDate } from "../Utils";
import { List } from "antd";

let ListBidsComponent = () => {
    let [bids, setBids] = useState([])
    let { itemId } = useParams();


    useEffect(() => {
        getBids();
    },[])

    let getBids = async () => {
        let response = await fetch(backendURL+"/bids?idItem"+itemId+"&apiKey="+localStorage.getItem("apiKey"))
        if ( response.ok ){
            let bids = await response.json();
            setBids(bids)
        }
    }

    return (
        <List size="large"
            header={<h2>List of bids</h2>}
            bordered
            dataSource={bids}
            renderItem={ (bid) => (
            <List.Item>
                <h3>{bid.amount} $</h3>
                <p>{ bid.email }</p>
                <p>{timeStampToDate(bid.date)}</p>
            </List.Item>
        )}>
        </List>
       
    )
}

export default ListBidsComponent;