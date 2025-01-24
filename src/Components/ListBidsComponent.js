import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendURL } from "../Globals";
import { timeStampToDate } from "../Utils";


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
        <div className="item-list">
            <h2>Bids </h2>
            {
                bids.map(bid => (
                    <div className="item">
                        <h3>{bid.amount} $</h3>
                        <p>{ bid.email }</p>
                        <p>{timeStampToDate(bid.date)}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default ListBidsComponent;