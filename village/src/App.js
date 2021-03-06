import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import { Route, NavLink } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {

    axios

      .get("http://localhost:3333/smurfs")

      .then(response => {
       console.log(response);
       this.setState({ smurfs: response.data });
     })

      .catch(err => {
       console.log(err);
     });
 }

 deleteSmurfFromServer = id => {
  axios

  .delete(`http://localhost:3333/smurfs/${id}`)

  .then(response => {
   console.log(response);
   this.setState({ smurfs: response.data });
 })

  .catch(err => {
   console.log(err);
 });  
}

 updateSmurfListOnServer = smurfData => {
  this.setState({smurfs: smurfData});
}
  
  render() {
    return (
      <div className="App">
        <div className="navBar">
      <NavLink to="/smurf-form">Smurf Form </NavLink>
      <NavLink exact to="/"> Smurfs</NavLink> 
      </div>
        <Route 
           path ="/smurf-form"
           render={props=>
            <SmurfForm {...props} smurfs={this.state.smurfs} updateSmurfListOnServer={this.updateSmurfListOnServer}/> } />
        <Route 
          exact path ="/"
          render ={props =>
         <Smurfs  {...props} smurfs={this.state.smurfs} deleteSmurfFromServer={this.deleteSmurfFromServer} /> } />
      </div>
    );
  }
}

export default App;
