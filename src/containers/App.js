import React, { Component } from 'react';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

// parent feeds state into a child component, and when child component receives the state,
// it's a property. STATE >> props. The child can't change the prop.

class App extends Component {
	constructor() {
		super();
		this.state = { // initial value of App's state
			robots: [],
			searchfield: ''
		};
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => {this.setState({ robots: users})});
	}

	// arrow syntax is needed when creating your own methods in classes that extend Component
	// in order for this value to be set correct. we want this to refer to the App object in this case
	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value });
	}

	render() {
		const { robots, searchfield } = this.state;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		});
		return (!robots.length ?
			<h1>Loading</h1> :
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={this.onSearchChange} />
				<Scroll>
					<ErrorBoundary>
					<CardList robots={filteredRobots}/>
					</ErrorBoundary>
				</Scroll>
			</div>
		);
	}
}

export default App;