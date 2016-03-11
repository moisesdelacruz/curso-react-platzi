//Modules Dependencies
import React from 'react';

export default class PokeMassege extends React.Component {
	render() {
		return <li className="pokemessege">{ this.props.message.text }</li>
	}
}