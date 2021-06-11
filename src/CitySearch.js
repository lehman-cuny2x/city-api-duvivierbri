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
        let length = array.length;
        let results = document.getElementById("displayResults");

        //Make an array of the zip codes
        for (let i = 0; i < length; i++){
            zipInfo[i] = array[i];
        }

        this.setState({zips: zipInfo});

        //Now take those zip codes and plug them into the zip URL, and return info in divs
        results.innerHTML = "";

        for(let i = 0; i < length; i++){
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

    }

    fetchStateInfo(array){ //get states for each array
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