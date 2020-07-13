import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AppBreadcrumb extends Component {

    static propTypes = {
        match: PropTypes.object
    }

    render() {
        const { location } = this.props;

        return (
            <div className="layout-breadcrumb">
                <ul>
                    <li><button className="p-link" onClick={() => {window.location = "/#"}} ><i className="material-icons">home</i></button></li>
					<li><i className="material-icons">chevron_right</i></li>
                    <li>{location.pathname.split('/')[1]}</li>
                </ul>
            </div>
        );
    }
}