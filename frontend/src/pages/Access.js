import React, {Component} from 'react';
import {Button} from 'primereact/button';

export default class Access extends Component {

	render() {
		return <div className="exception-body accessdenied">
				<div className="exception-panel">
					<div className="exception-image">
						<img src="assets/layout/images/exception/icon-access.png" alt="sapphire"/>
					</div>

					<div className="exception-detail">
						<h1>ACCESS DENIED</h1>
						<p>You do not have the necessary permissons.</p>
						<Button label="GO TO DASHBOARD" onClick={() => {window.location = "/#"}} />
					</div>
				</div>
		</div>
	}
}