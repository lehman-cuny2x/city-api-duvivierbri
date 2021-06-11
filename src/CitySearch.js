import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class CitySearch extends Component{
    constructor(){
        super();
        
        this.state = {
            city:"default",
            states: [],
            zips: [],
            results: [] //information that will be displayed
        }
    }

    saveZip(){ //saves the zip code the user enters and updates the state 
        let currZip = document.getElementById("userCity").value;
        this.setState({zip: currZip});
    }

    make

    makeResultsArray(array){ //used in fetchInformation()
        let zipUrl = "http://ctp-zip-api.herokuapp.com/zip/";
        let state = "";
        let detailedInfo = [];
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
                    stateInfo.push(s.State);
                })
            })
            .catch(function() {
                results.innerHTML = "NO RESULTS FOUND";
                console.log("error");
            }); 
        }

        //remove duplicates

        this.setState({states: stateInfo});
        console.log(this.state.states);

        const newStates = new Set(this.state.states);
        let n = Array.from(newStates);
        console.log(n);
        /*
        for (let i = 0; i < length; i++){
            newArray[i] = array[i];
        }
    
        this.setState({results: newArray});
        console.log(this.state.results);

        results.innerHTML = "";

        //now iterate through the information and pick out what we need 
        this.state.results.map((data) => {
            let zip = data;
            let newObject = "<div class=userResults>" + zip + "</div>";

            //Add the information to the div element already created
            results.innerHTML += newObject + "<br/>";
        })
        */
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

    displayInformation(){ //this displays the info from the 

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