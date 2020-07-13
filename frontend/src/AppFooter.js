import React, { Component } from 'react';

export class AppFooter extends Component {

    render() {
        return <div className="layout-footer">
            <div className="p-grid">
                <div className="p-col">
                    <img src="assets/layout/images/logo-white.svg" alt="sapphire-layout" />
                    <div className="layout-footer-appname">AutoML UI to Intersystems IntegratedML</div>
                </div>
                <div className="p-col p-col-align-right">
                    <span>MIT License</span>
                </div>
            </div>
        </div>
    }
}