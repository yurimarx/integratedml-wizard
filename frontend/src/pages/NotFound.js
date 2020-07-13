import React, {Component} from 'react';
import {Button} from 'primereact/button';

export default class NotFound extends Component {

	render() {
		return <div className="exception-body notfound">
			<div className="exception-panel">
				<div className="exception-image">
					<img src="assets/layout/images/exception/icon-404.png" alt="sapphire"/>
				</div>

				<div className="exception-detail">
					<h1>PAGE NOT FOUND</h1>
					<p>Requested resource is not available.</p>
					<Button label="GO TO DASHBOARD" onClick={() => {window.location = "/#"}} />
				</div>
			</div>
		</div>
	}
}