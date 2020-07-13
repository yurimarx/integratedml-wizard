import React, {Component} from 'react';
import classNames from 'classnames';
import {AppTopbar} from './AppTopbar';
import {AppBreadcrumb} from "./AppBreadcrumb";
import {AppFooter} from './AppFooter';
import {Route} from 'react-router-dom'
import { withRouter } from 'react-router';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import './ripple.js';
import './App.css';
import {AppConfig} from "./AppConfig";
import { ProblemComponent } from './components/ProblemComponent';
import { DatasourceComponent } from './components/DatasourceComponent';
import { TrainComponent } from './components/TrainComponent';

class App extends Component {

	constructor() {
		super();
		this.state = {
			horizontal: true,
			topbarSize: 'large',
			topbarColor: 'layout-topbar-blue',
			menuColor: 'layout-menu-light',
			layoutColor: 'blue',
			themeColor: 'blue',
			menuActive: false,
			configDialogActive: false
		};

		this.onWrapperClick = this.onWrapperClick.bind(this);
		this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
		this.onTopbarUserMenuButtonClick = this.onTopbarUserMenuButtonClick.bind(this);
		this.onTopbarUserMenuClick = this.onTopbarUserMenuClick.bind(this);
		this.onRootMenuItemClick = this.onRootMenuItemClick.bind(this);
		this.onMenuItemClick = this.onMenuItemClick.bind(this);
		this.onSidebarClick = this.onSidebarClick.bind(this);
		this.changeTopbarTheme = this.changeTopbarTheme.bind(this);
		this.changeTopbarSize = this.changeTopbarSize.bind(this);
		this.changeMenuToHorizontal = this.changeMenuToHorizontal.bind(this);
		this.changeMenuTheme = this.changeMenuTheme.bind(this);
		this.changeComponentTheme = this.changeComponentTheme.bind(this);
		this.changePrimaryColor = this.changePrimaryColor.bind(this);
		this.onToggleBlockBodyScroll = this.onToggleBlockBodyScroll.bind(this);
		this.isHorizontalMenuActive = this.isHorizontalMenuActive.bind(this);
		this.createMenu();
	}

	onWrapperClick(event) {
		if (!this.menuClick) {
			this.setState({menuActive: false});

			if (!this.configMenuClick) {
				this.unblockBodyScroll();
			}
		}

		if (!this.userMenuClick) {
			this.setState({topbarUserMenuActive: false});
		}

		this.userMenuClick = false;
		this.menuClick = false;
		this.configMenuClick = false;
	}

	onMenuButtonClick(event, isMenuButtonActive) {
		this.menuClick = true;

		if (!this.isHorizontalMenuActive()) {
			this.setState({menuActive: !isMenuButtonActive}, () => {
				if (this.state.menuActive) {
					this.blockBodyScroll();
				} else {
					this.unblockBodyScroll();
				}
			});
		}

		event.preventDefault();
	}

	onToggleBlockBodyScroll(add) {
		if (add)
			this.blockBodyScroll();
		else
			this.unblockBodyScroll();

		this.configMenuClick = true;
	}

	blockBodyScroll() {
		let className = `blocked-scroll${this.state.horizontal ? '-horizontal-menu': ''}`;
		if (document.body.classList) {
			document.body.classList.add(className);
		} else {
			document.body.className += ` ${className}`;
		}
	}

	unblockBodyScroll() {
		let className = `blocked-scroll${this.state.horizontal ? '-horizontal-menu': ''}`;
		if (document.body.classList) {
			document.body.classList.remove(className);
		} else {
			document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
				`${className}`.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}

	onTopbarUserMenuButtonClick(event) {
		this.userMenuClick = true;
		this.setState({topbarUserMenuActive: !this.state.topbarUserMenuActive});

		event.preventDefault();
	}

	onTopbarUserMenuClick(event) {
		this.userMenuClick = true;

		if (event.target.nodeName === 'BUTTON' || event.target.parentNode.nodeName === 'BUTTON') {
			this.setState({topbarUserMenuActive: false});
		}
		event.preventDefault();
	}

	onRootMenuItemClick(event) {
		this.menuClick = true;

		if (this.isHorizontalMenuActive()) {
			this.setState({
				menuActive: !this.state.menuActive
			});
		}
	}

	onMenuItemClick(event) {
		if(!event.item.items) {
			this.setState({menuActive: false});
			this.unblockBodyScroll();
		}
	}

	onSidebarClick(event) {
		this.menuClick = true;
	}

	isMobile() {
		return window.innerWidth <= 1024;
	}

	isHorizontalMenuActive() {
		return this.state.horizontal && !this.isMobile();
	}

	changeTopbarSize(event) {
		this.setState({topbarSize: event.size});

		event.originalEvent.preventDefault();
	}

	changeTopbarTheme(event) {
		this.setState({topbarColor: 'layout-topbar-' + event.color});

		event.originalEvent.preventDefault();
	}

	changeMenuToHorizontal(event) {
		this.setState({horizontal: event.mode});

		event.originalEvent.preventDefault();
	}

	changeMenuTheme(event) {
		this.setState({menuColor: 'layout-menu-' + event.color});

		event.originalEvent.preventDefault();
	}

	changeComponentTheme(event) {
		this.setState({themeColor: event.theme});

		let element = document.getElementById('theme-css');
		let urlTokens = element.getAttribute('href').split('/');
		urlTokens[urlTokens.length - 1] = 'theme-' + event.theme + '.css';
		let newURL = urlTokens.join('/');

		this.replaceLink(element, newURL);

		event.originalEvent.preventDefault();
	}

	changePrimaryColor(event) {
		this.setState({layoutColor: event.color});

		let element = document.getElementById('layout-css');
		let urlTokens = element.getAttribute('href').split('/');
		urlTokens[urlTokens.length - 1] = 'layout-' + event.color + '.css';
		let newURL = urlTokens.join('/');

		this.replaceLink(element, newURL);

		event.originalEvent.preventDefault();
	}

	isIE() {
		return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent)
	}

	replaceLink(linkElement, href) {
		if(this.isIE()){
			linkElement.setAttribute('href', href);
		}
		else {
			const id = linkElement.getAttribute('id');
			const cloneLinkElement = linkElement.cloneNode(true);

			cloneLinkElement.setAttribute('href', href);
			cloneLinkElement.setAttribute('id', id + '-clone');

			linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

			cloneLinkElement.addEventListener('load', () => {
				linkElement.remove();
				cloneLinkElement.setAttribute('id', id);
			});
		}
	}

	createMenu() {
		this.menu = [
			{
				label: 'AutoML', icon: 'list',
				items: [
					{label: 'Problem Definition', icon: 'input', to: '/problem'},
					{label: 'Model Definition', icon: 'grid_on', to: '/datasource'},
					{label: 'Train Model', icon: 'toys', to: '/train'},
				]
			}
		];
	}

	render() {
		const layoutContainerClassName = classNames('layout-container', {
			'layout-menu-horizontal': this.state.horizontal,
			'layout-menu-active': this.state.menuActive && !this.isHorizontalMenuActive(),
			'layout-top-small': this.state.topbarSize === 'small',
			'layout-top-medium': this.state.topbarSize === 'medium',
			'layout-top-large': this.state.topbarSize === 'large'
		}, this.state.topbarColor, this.state.menuColor);

		const AppBreadCrumbWithRouter = withRouter(AppBreadcrumb);

		return (
			<div ref={(el) => this.layoutContainer = el} className={layoutContainerClassName}  onClick={this.onWrapperClick}>
				<div className="layout-top">
					<AppTopbar topbarUserMenuActive={this.state.topbarUserMenuActive} menuActive={this.state.menuActive}
							   onMenuButtonClick={this.onMenuButtonClick} onTopbarUserMenuButtonClick={this.onTopbarUserMenuButtonClick}
							   onTopbarUserMenuClick={this.onTopbarUserMenuClick} model={this.menu} horizontal={this.state.horizontal} onSidebarClick={this.onSidebarClick}
							   onRootMenuItemClick={this.onRootMenuItemClick} onMenuItemClick={this.onMenuItemClick} isHorizontalMenuActive={this.isHorizontalMenuActive}/>

					<div className="layout-topbar-separator"/>

					<AppBreadCrumbWithRouter />
				</div>

				<div className="layout-content">
					<Route path="/" exact component={ProblemComponent} />
					<Route path="/problem" component={ProblemComponent} />
					<Route path="/datasource" component={DatasourceComponent} />
					<Route path="/train" component={TrainComponent} />
				</div>

				<AppConfig topbarColor={this.state.topbarColor} horizontal={this.state.horizontal}
						layoutColor={this.state.layoutColor} menuColor={this.state.menuColor} themeColor={this.state.themeColor}
						topbarSize={this.state.topbarSize} changeTopbarTheme={this.changeTopbarTheme}
						changeMenuToHorizontal={this.changeMenuToHorizontal} changeMenuTheme={this.changeMenuTheme} changeComponentTheme={this.changeComponentTheme}
						changePrimaryColor={this.changePrimaryColor} changeTopbarSize={this.changeTopbarSize} onToggleBlockBodyScroll={this.onToggleBlockBodyScroll}/>

				{(!this.isHorizontalMenuActive() && this.state.menuActive) && <div className="layout-mask"/>}

				<AppFooter />

			</div>
		);
	}
}

export default App;
