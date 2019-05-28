import React, {Component} from 'react';
import Select from 'react-select';
//import InputNumber from 'react-input-number';

class CatalogItem extends Component {
    constructor(props){
        super();
        this.state = {
            id: props.id,
            name: props.itemName,
            quantity: 1,
            inCart: false,
            unit: ""
        };
        console.log("constructor");
    }
    

    handleChangeUnit = selectedUnit => {
        const state = this.state;
        console.log("LABEL", selectedUnit.name);
        state.unit = selectedUnit.name;
        this.setState(state);
        console.log(`Options selected:`, JSON.stringify(state, null, 4));
        console.log("STATE", state);
    };
    
    handleChangeQuantity = selectedQuantity => {
        const state = this.state;
        state.quantity = selectedQuantity.target.value;
        this.setState(state);
        console.log("STATE", state);
    };

    handeSubmitItem = () => {
        const state = this.state;
        state.inCart = true;
        this.setState(state);
        console.log("STATE", state);
        this.props.updateCart(this.state);
    };

    render(){
        const {itemInCart, itemCartQuantity, itemCartName, itemCartUnit, itemName, itemUnit} = this.props;
        if(this.props.itemInCart===true){
                console.log("catalogItemInCart", itemCartName, itemCartUnit);
                return( 
                    <tr>
                                        <td>{itemCartName}</td>
                                        <td align="center">{itemCartUnit} </td>
                                        <td align="center">{itemCartQuantity}</td>
                                        <td align="center">{itemInCart}</td>
                    </tr>
                )
        }else{
            console.log("catalogItem", itemName, itemUnit);
            return( 
                <tr>
                                    <td>{itemName}</td>
                                    <td align="center">
                                        <Select 
                                            options={itemUnit} 
                                            placeholder={"select Unit"} 
                                            onChange={this.handleChangeUnit}  
                                            getOptionLabel={(itemUnit)=>itemUnit.name} 
                                            getOptionValue={(itemUnit)=>itemUnit.alias} />
                                    </td>
                                    <td align="center">
                                        <input
                                            name="quantityOfItem"
                                            type="number"
                                            placeholder={this.state.quantity}
                                            onChange={this.handleChangeQuantity} />
                                    </td>
                                    <td align="center">
                                        <button onClick={this.handeSubmitItem} >Add to cart!</button>
                                    </td>
                </tr>
            )
        }
    }
}
export default CatalogItem;

