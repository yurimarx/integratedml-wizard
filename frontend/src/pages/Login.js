import React, {Component} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';

export default class Login extends Component {

	render() {
		return <div className="login-body">
			<div className="login-panel ui-fluid">
				<div className="login-panel-header">
					<img src="assets/layout/images/login/logo-sapphire-color.png" alt="sapphire"/>
				</div>
				<div className="login-panel-content">
					<div className="p-grid">
						<div className="p-col-12">
							<h1>SAPPHIRE NETWORK</h1>
							<h2>Welcome, please use the form to sign-in</h2>
						</div>
						<div className="p-col-12">
                        <span className="md-inputfield">
							<InputText style={{width: '100%'}}/>
                            <label>Username</label>
                        </span>
						</div>
						<div className="p-col-12">
                        <span className="md-inputfield">
							<InputText type="password" style={{width: '100%'}}/>
                            <label>Password</label>
                        </span>
						</div>
						<div className="p-col-6">
							<button className="p-link">Forget Password?</button>
						</div>
						<div className="p-col-6" style={{textAlign: "right"}}>
							<Button label="NEXT" onClick={() => {window.location = "/#"}} style={{width:'100%'}}/>
						</div>
					</div>
				</div>
			</div>
		</div>
	}
}