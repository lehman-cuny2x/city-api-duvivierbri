import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ZipSearch extends Component{
    constructor(){
        super();
        
        this.state = {
            zip:"00000",
            results: [] //information that will be displayed
        }
    }

    saveZip(){ //saves the zip code the user enters and updates the state 
        let currZip = document.getElementById("userZip").value;
        this.setState({zip: currZip});
    }

    makeResultsArray(array){ //used in fetchInformation()
        let newArray = [];
        let length = array.length;
        let results = document.getElementById("displayResults");

        for (let i = 0; i < length; i++){
            newArray[i] = array[i];
        }
    
        this.setState({results: newArray});
        console.log(this.state.results);

        results.innerHTML = "";

        //now iterate through the information and pick out what we need 
        this.state.results.map((data) => {
            let title = "<p class=resultHeader>" + data.LocationText + "</p>";
            let city = "<p>City: " + data.City + "</p>";
            let state = "<p>State: " + data.State + "</p>";
            let population = "<p>Population (estimated): " + data.EstimatedPopulation + "</p>";
            let totalWages = "<p>Total Wages: " + data.TotalWages + "</p>";
            let newObject = "<div class=userResults>" + title + city + state + population + totalWages + "</div>";

            //Add the information to the div element already created
            results.innerHTML += newObject + "<br/>";
        })
    }

    fetchInformation(){ //this gets the information from the api
        let baseUrl = "http://ctp-zip-api.herokuapp.com/zip/";
        let currZip = document.getElementById("userZip").value;
        let results = document.getElementById("displayResults");

        fetch(baseUrl + currZip)
            .then(response => response.json())
            .then(data => this.makeResultsArray(data))
            .catch(function() {
                results.innerHTML = "NO RESULTS FOUND";
                console.log("error");
            }); 
    }

    displayInformation(){ //this displays the info from the 

    }

    render(){
        return <div>
            <h1 class="pageHeader">Zip Code Search</h1>

            <div class="userInputDisplay">
                <p id="prompt">Zip Code: </p>
                <input type="text" id="userZip"></input><br/>
                <button onClick={this.fetchInformation.bind(this)}>Search</button>
            </div>

            <div id="displayResults">

            </div>
        </div>
    }
}
export default ZipSearch;