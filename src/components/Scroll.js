import React from 'react';
import './Scroll.css';

// every React component has a children prop. This allows us to return whatever is inside of a component, such as
// Scroll, where it doesn't make sense to return anything for Scroll itself because it's just a wrapper 
// note that a tag that isn't self-closing tag is used for Scroll, unlike for CardList, Card, etc.
const Scroll = (props) => {
	return (
		// outer {} is needed with JSX, inner {} is for object. overflow-y becomes overflowY bc camel case must be used in JSX
		<div style={{ overflow: 'scroll', border: '5px solid black', height: '800px'}}> 
			{props.children}
		</div>
	);
};

export default Scroll;