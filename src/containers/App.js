import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import { setSearchField } from '../actions';

const mapStatetoProps = state => {
	return {
		searchField: state.searchField
	}
}

// dispatch triggers (Sends) actions we create to the reducer
const mapDispatchToProps = (dispatch) => {
	return {
		// setSearchField is an action that receives a text
		onSearchChange: (event) => dispatch(setSearchField(event.target.value))
	}
}

// parent feeds state into a child component, and when child component receives the state,
// it's a property. STATE >> props. The child can't change the prop.

class App extends Component {
	constructor() {
		super();
		this.state = { // initial value of App's state
			robots: []
		};
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => {
			// apparently, the API has changed and now returns an 11th "user" which is actually just {products: 1, id: 11}
			// so this needs to be popped from the array
			users.pop();
			this.setState({ robots: users });
		});
	}

	render() {
		const { robots } = this.state;
		const { searchField, onSearchChange } = this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		});
		return (!robots.length ?
			<h1>Loading</h1> :
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={onSearchChange} />
				<Scroll>
					<ErrorBoundary>
					<CardList robots={filteredRobots}/>
					</ErrorBoundary>
				</Scroll>
			</div>
		);
	}
}

// this part of the state, these actions. get those props to the App
export default connect(mapStatetoProps, mapDispatchToProps)(App);