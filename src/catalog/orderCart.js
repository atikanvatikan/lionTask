import React, {Component} from 'react';
import CatalogItem from './catalogItem.js';

class OrderCart extends Component {
    constructor(){
        super();
        this.state = {
            itemsInCart: [],
            visible: false
        }
    }

    render(){
        console.log("itemsInCartWARENKORB", this.state.itemsInCart);    
        return( 
            <div>
                <h2>Warenkorb:</h2>
                {this.state.itemsInCart.map((cartElement, index)=>{
                    return <CatalogItem key={cartElement._id} itemName={cartElement.item_name} itemUnit={cartElement.units} />
                })}
            </div>
        )
    }
}

export default OrderCart;
