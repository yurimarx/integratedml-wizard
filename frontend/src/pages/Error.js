import React, {Component} from 'react';
import {Button} from 'primereact/button';

export default class Error extends Component {

	render() {
		return <div className="exception-body  error">
					<div className="exception-panel">
						<div className="exception-image">
							<img src="assets/layout/images/exception/icon-error.png" alt="sapphire"/>
						</div>

						<div className="exception-detail">
							<h1>ERROR OCCURED</h1>
							<p>Something went wrong.</p>
							<Button label="GO TO DASHBOARD" onClick={() => {window.location = "/#"}} />
					</div>
				</div>
		</div>
	}
}