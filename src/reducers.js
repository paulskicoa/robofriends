export const CHANGE_SEARCH_FIELD = 'CHANGE_SEARCH_FIELD';

const initialState = {
	searchField: ''
};

// this reducer will take any action that involves searching the robots
export const searchRobots = (state=initialState, action={}) => {
	switch (action.type) {
		case CHANGE_SEARCH_FIELD:
			// return a new state that has everything in the previous state plus
			// the updated search field
			return Object.assign({}, state, {searchField: action.payload});
		default:
			return state;
	}
};