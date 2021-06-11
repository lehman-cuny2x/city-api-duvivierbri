import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class CitySearch extends Component{
    constructor(){
        super();
        
        this.state = {
            city:"default",
            results: [] //information to be displayed
        }
    }

    render(){
        return <div>
            <h1>Hello</h1>
        </div>
    }
}
export default CitySearch;