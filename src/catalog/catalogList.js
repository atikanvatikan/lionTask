import React, {Component} from 'react';
import CatalogData from './items-example.json';
import CatalogItem from './catalogItem.js';
import CartModal from './cartModal.js';
import './catalogList.css';
import { tsImportEqualsDeclaration } from '@babel/types';

class CatalogList extends Component {
    constructor(){
        super();
        this.state = {
            catalog: CatalogData,
            itemsInCart:[],
            filteredCart:[],
            showCart: false  
        }
        this.updateCart = this.updateCart;
    }
    
    updateCart = (item) => {
        this.setState({ itemsInCart: [...this.state.itemsInCart, item], filteredCart: [...this.state.filteredCart, item] }) 
    }

    toggleCart = () => {
        this.setState({
            showCart: !this.state.showCart
        })
    }

    searchChangeAll = (e) => {
        console.log("SUCHE", e.target.value);
        const state = this.state;
        state.catalog = CatalogData.filter(item => {
            return item.item_name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        console.log("FILTERED", state.catalog);
        this.setState(state);
    }

    searchChangeCart = (e) => {
        console.log("SUCHECART", e.target.value);
        const state = this.state;
        state.filteredCart = state.itemsInCart.filter(item => {
            return item.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        console.log("FILTEREDCART", state.catalog);
        this.setState(state);
    }

    render(){   
        console.log("itemsInCart", this.state.itemsInCart); 
        const { showCart } = this.state;
        return( 
            <div className="container"> 
            <div className="box"> 
            <div className="box-row"> 
                <div className="box-cell box1">
                    <h2>Sortiment:</h2><h3>Suche... 
                        <input
                            type='search' 
                            placeholder='search for item'
                            onChange={this.searchChangeAll}  /> </h3>
                            
                    <table border="3px solid">
                        <tbody>
                                <tr>
                                    <th>Item</th>
                                    <th>Unit</th>
                                    <th>Quantity</th>
                                    <th>Submit</th>
                                </tr>
                                {this.state.catalog.map((catalogElement, index)=>{
                                    return <CatalogItem key={catalogElement._id} updateCart={this.updateCart} id={catalogElement._id} itemName={catalogElement.item_name} itemUnit={catalogElement.units} />
                                })}
                        </tbody>
                    </table>
                </div>
                <div className="box-cell box2">
                <React.Fragment>
          <CartModal>
            {
              showCart ?
                <div className="box-cell box2">
                    <h2>Warenkorb:</h2><h3>Suche... 
                                <input
                                type='search' 
                                placeholder='search for item'
                                onChange={this.searchChangeCart}  /> </h3>
                        <table border="3px solid">
                            <tbody>
                                    <tr>
                                        <th>Item</th>
                                        <th>Unit</th>
                                        <th>Quantity</th>
                                        <th>Submit</th>
                                    </tr>
                                    {this.state.filteredCart.map((cartElement, index)=>{
                                        return <CatalogItem key={cartElement.id} id={cartElement.id} itemCartQuantity={cartElement.quantity} itemInCart={cartElement.inCart} itemCartName={cartElement.name} itemCartUnit={cartElement.unit} />
                                    })}
                            </tbody>
                        </table>
                </div>
              : null
            }
        
                  
                        
                    </CartModal>
                    </React.Fragment>
                    <button onClick={this.toggleCart}>Show Cart?</button> 
                </div>
            </div>
            </div>
            </div>
        )
    }
}

export default CatalogList;
