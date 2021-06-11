/*

NOT WORKING

My reflection

What IS NOT working: 
    - States come back as undefined when I try to display them
    - Not sure how to organize the data so I can organize the zip codes by states (again, I have an idea...
        not sure how to execute it though)
    - Cannot filter an array (the states array) to delete duplicates

What IS Working:
    - App can create a list of all the states each zip comes from 
    - All zipcodes are displayed
    - CSS / styling is okay for now (until I'm able to display the rest of the information)
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class CitySearch extends Component{
    constructor(){
        super();
        
        this.state = {
            states: [],
            zips: [],
            results: [] //information that will be displayed
        }
    }

    makeResultsArray(array){ //used in fetchInformation()
        let zipUrl = "http://ctp-zip-api.herokuapp.com/zip/";
        let zipInfo = [];
        let stateInfo = [];
        let length = array.length;
        let results = document.getElementById("displayResults");
        

        for (let i = 0; i < length; i++){
            zipInfo[i] = array[i];
        }

        this.setState({zips: zipInfo});
        console.log(this.state.zips);

        //Now take those zip codes and plug them into the zip URL
        for(let i = 0; i < length; i++){
            let n = this.state.states;
            fetch(zipUrl + this.state.zips[i])
            .then(response => response.json())
            .then(data => {
                data.map((s) => {
                    results.innerHTML +=  "<div class=userResults> " + 
                    this.state.zips[i] + "<br/>" 
                    + "City: " + s.City + "<br/>" 
                    + "State: " + s.State + "<br/>"
                    + "Population (estimated): " + s.EstimatedPopulation + "<br/>"
                    + "Total Wages: " + s.TotalWages + "<br/>"
                    + "<div/>";
                })
            })
            .catch(function() {
                results.innerHTML = "NO RESULTS FOUND";
                console.log("error");
            }); 
        }

        //const newSI = Array.from(new Set(stateInfo));
        this.setState({states: stateInfo});
        console.log(this.state.states);

        //this.makeResults(); //display the results
    }

    makeResults(){
        console.log(this.state.states);
        let results = document.getElementById("displayResults");
        results.innerHTML = "";

        //Now put them all together and display
        for (let i = 0; i < this.state.zips.length; i++){
            //This returns undefined for the state because for some reason the states are objects, not strings
            //I do not know how to parse an object to a string
            let newObject = "<div class=userResults>" + this.state.zips[i] + "<br/>" + this.state.states[i] + "</div>"

            results.innerHTML += newObject;
        }
    }

    fetchStateInfo(array){ //get states for each array
        //let zipUrl = "http://ctp-zip-api.herokuapp.com/zip/";
        let newArray = [];

        for (let i = 0; i < array.length; i++){
            newArray[i] = array.State;
        }

        this.setState({states: newArray});
        console.log(this.state.states);

    }

    fetchInformation(){ //this gets the information from the api
        let cityUrl = "http://ctp-zip-api.herokuapp.com/city/";
        let currZip = document.getElementById("userCity").value;
        let results = document.getElementById("displayResults");

        fetch(cityUrl + currZip.toUpperCase())
            .then(response => response.json())
            .then(data => this.makeResultsArray(data))
            .catch(function() {
                results.innerHTML = "NO RESULTS FOUND";
                console.log("error");
            }); 
    }

    render(){
        return <div>
            <h1 class="pageHeader">City Search</h1>

            <div class="userInputDisplay">
                <p id="prompt">City: </p>
                <input type="text" id="userCity"></input><br/>
                <button onClick={this.fetchInformation.bind(this)}>Search</button>
            </div>

            <div id="displayResults">

            </div>
        </div>
    }
}
export default CitySearch;