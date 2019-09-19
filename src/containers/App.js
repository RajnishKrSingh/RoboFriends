import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
//import { robots } from './robots.js';
import './App.css';
import Scroll from '../components/Scroll';


class  App extends Component {
	constructor(){
		super();
		this.state = {
			robots: [],
	        searchfield: ''
		}
	}

	componentDidMount() {
		fetch("https://jsonplaceholder.typicode.com/users")
		.then(response =>{
			return response.json();
		})
		.then(users =>{
			this.setState({robots:users});
		});
	}

	onSearchChange = (event) => {
		this.setState({searchfield:event.target.value});
		
	}

	render(){
		//can do destructuring and use this.state as robots and searchfield respectively -> const {robots,searchfield}=this.state

		const filteredRobots = this.state.robots.filter(robot => {
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		})

		if(this.state.robots.length===0){
			return <h1 className="tc f1">Loading</h1>
		}
		else{
            return(
		        <div className="tc">
		            <h1 className="f1">RoboFriends</h1>
		            <SearchBox searchChange={this.onSearchChange} />
		            <Scroll>
		                <CardList robots={filteredRobots}/>
		            </Scroll>
		        </div>
            );
	    }
	}    
}
export default App;