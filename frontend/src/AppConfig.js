import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TabView, TabPanel } from 'primereact/tabview';

export class AppConfig extends Component {


	static defaultProps = {
		topbarSize: 'large',
		topbarColor: 'layout-topbar-blue',
		menuColor: 'layout-menu-light',
		themeColor: 'blue',
		layoutColor: 'blue',
		horizontal: null,
		onToggleBlockBodyScroll: null
	}

	static propTypes = {
		topbarSize: PropTypes.string.isRequired,
		topbarColor: PropTypes.string.isRequired,
		menuColor: PropTypes.string.isRequired,
		themeColor: PropTypes.string.isRequired,
		layoutColor: PropTypes.string.isRequired,
		horizontal: PropTypes.bool.isRequired,
		onToggleBlockBodyScroll: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			configDialogActive: false
		};

		this.onConfigButtonClick = this.onConfigButtonClick.bind(this);
		this.onConfigCloseClick = this.onConfigCloseClick.bind(this);
	}

	onConfigButtonClick(event) {
		this.setState({ configDialogActive: true });
		this.props.onToggleBlockBodyScroll(true);
	}

	onConfigCloseClick(event) {
		this.setState({ configDialogActive: false });
		this.props.onToggleBlockBodyScroll(false);
	}

	render() {

		let topbarThemes = [
			{ name: 'Blue', file: 'blue', image: 'blue.svg' },
			{ name: 'Ash', file: 'ash', image: 'ash.svg' },
			{ name: 'Kashmir', file: 'kashmir', image: 'kashmir.svg' },
			{ name: 'Orange', file: 'orange', image: 'orange.svg' },
			{ name: 'Midnight', file: 'midnight', image: 'midnight.svg' },
			{ name: 'Sunset', file: 'sunset', image: 'sunset.svg' },
			{ name: 'Marley', file: 'marley', image: 'marley.svg' },
			{ name: 'Harvey', file: 'harvey', image: 'harvey.svg' },
			{ name: 'Vanusa', file: 'vanusa', image: 'vanusa.svg' },
			{ name: 'Skyline', file: 'skyline', image: 'skyline.svg' },
			{ name: 'Royal', file: 'royal', image: 'royal.svg' },
			{ name: 'Disco', file: 'disco', image: 'disco.svg' },
			{ name: 'Sky', file: 'sky', image: 'sky.svg' },
			{ name: 'Rose', file: 'rose', image: 'rose.svg' },
			{ name: 'Revolt', file: 'revolt', image: 'revolt.svg' },
			{ name: 'Forest', file: 'forest', image: 'forest.svg' },
			{ name: 'Night', file: 'night', image: 'night.svg' },
			{ name: 'Apricot', file: 'apricot', image: 'apricot.svg' },
			{ name: 'Faraway', file: 'faraway', image: 'faraway.svg' },
			{ name: 'Grape', file: 'grape', image: 'grape.svg' },
			{ name: 'River', file: 'river', image: 'river.svg' },
			{ name: 'Dock', file: 'dock', image: 'dock.svg' },
			{ name: 'Material One', file: 'materialone', image: 'materialone.png' },
			{ name: 'Material Two', file: 'materialtwo', image: 'materialtwo.png' },
			{ name: 'Polygons', file: 'polygons', image: 'polygons.png' },
			{ name: 'Connections One', file: 'connectionsone', image: 'connectionsone.png' },
			{ name: 'Connections Two', file: 'connectionstwo', image: 'connectionstwo.png' },
			{ name: 'Road', file: 'road', image: 'road.png' },
			{ name: 'Reflection', file: 'reflection', image: 'reflection.png' },
			{ name: 'Waves', file: 'waves', image: 'waves.png' },
			{ name: 'Sandiego', file: 'sandiego', image: 'sandiego.png' },
			{ name: 'Architecture', file: 'architecture', image: 'architecture.png' },
			{ name: 'Snow', file: 'snow', image: 'snow.png' },
			{ name: 'Palm', file: 'palm', image: 'palm.png' },
			{ name: 'Fluid', file: 'fluid', image: 'fluid.png' },
			{ name: 'Balloon', file: 'balloon', image: 'balloon.png' },
			{ name: 'Downtown', file: 'downtown', image: 'downtown.png' },
			{ name: 'Perfection', file: 'perfection', image: 'perfection.png' },
			{ name: 'Northern', file: 'northern', image: 'northern.png' },
			{ name: 'Highline', file: 'highline', image: 'highline.png' },
			{ name: 'Mural', file: 'mural', image: 'mural.png' },
			{ name: 'Aeriel', file: 'aeriel', image: 'aeriel.png' },
			{ name: 'Wing', file: 'wing', image: 'wing.png' },
			{ name: 'Skyscraper', file: 'skyscraper', image: 'skyscraper.png' },
			{ name: 'Wall', file: 'wall', image: 'wall.png' },
			{ name: 'Dawn', file: 'dawn', image: 'dawn.png' },
			{ name: 'Lille', file: 'lille', image: 'lille.png' },
			{ name: 'Condo', file: 'condo', image: 'condo.png' },
			{ name: 'Waterfall', file: 'waterfall', image: 'waterfall.png' },
			{ name: 'Coffee', file: 'coffee', image: 'coffee.png' },
			{ name: 'Mountain', file: 'mountain', image: 'mountain.png' },
			{ name: 'Lights', file: 'lights', image: 'lights.png' },
			{ name: 'Desert', file: 'desert', image: 'desert.png' },
			{ name: 'Beach', file: 'beach', image: 'beach.png' },
			{ name: 'Classic', file: 'classic', image: 'classic.png' },
			{ name: 'Hazy', file: 'hazy', image: 'hazy.png' },
			{ name: 'Exposure', file: 'exposure', image: 'exposure.png' },
			{ name: 'Norge', file: 'norge', image: 'norge.png' },
			{ name: 'Island', file: 'island', image: 'island.png' },
			{ name: 'Station', file: 'station', image: 'station.png' },
			{ name: 'Fruity', file: 'fruity', image: 'fruity.png' },
			{ name: 'Tropical', file: 'tropical', image: 'tropical.png' },
			{ name: 'Beyoglu', file: 'beyoglu', image: 'beyoglu.png' },
			{ name: 'Timelapse', file: 'timelapse', image: 'timelapse.png' },
			{ name: 'Crystal', file: 'crystal', image: 'crystal.png' },
			{ name: 'Aquarelle', file: 'aquarelle', image: 'aquarelle.png' },
			{ name: 'Canvas', file: 'canvas', image: 'canvas.png' },
			{ name: 'Olympic', file: 'olympic', image: 'olympic.png' },
			{ name: 'Circuit', file: 'circuit', image: 'circuit.png' },
			{ name: 'Flamingo', file: 'flamingo', image: 'flamingo.png' },
			{ name: 'Flight', file: 'flight', image: 'flight.png' },
			{ name: 'Tractor', file: 'tractor', image: 'tractor.png' },
			{ name: 'Volcano', file: 'volcano', image: 'volcano.png' },
			{ name: 'Pine', file: 'pine', image: 'pine.png' },
			{ name: 'Emptiness', file: 'emptiness', image: 'emptiness.png' },
			{ name: 'Splash', file: 'splash', image: 'splash.png' },
			{ name: 'Urban', file: 'urban', image: 'urban.png' },
			{ name: 'Bloom', file: 'bloom', image: 'bloom.png' },
			{ name: 'Tinfoil', file: 'tinfoil', image: 'tinfoil.png' },
			{ name: 'Hallway', file: 'hallway', image: 'hallway.png' },
			{ name: 'Seagull', file: 'seagull', image: 'seagull.png' },
			{ name: 'City', file: 'city', image: 'city.png' },
			{ name: 'Jet', file: 'jet', image: 'jet.png' },
			{ name: 'Louisville', file: 'louisville', image: 'louisville.png' },
			{ name: 'Spray', file: 'spray', image: 'spray.png' },
			{ name: 'Symmetry', file: 'symmetry', image: 'symmetry.png' },
			{ name: 'Destination', file: 'destination', image: 'destination.png' }
		];

		let menuThemes = [
			{ name: 'Light', file: 'light', image: 'light.svg' },
			{ name: 'Dark', file: 'dark', image: 'dark.svg' },
			{ name: 'Blue', file: 'blue', image: 'blue.svg' },
			{ name: 'Ash', file: 'ash', image: 'ash.svg' },
			{ name: 'Kashmir', file: 'kashmir', image: 'kashmir.svg' },
			{ name: 'Orange', file: 'orange', image: 'orange.svg' },
			{ name: 'Midnight', file: 'midnight', image: 'midnight.svg' },
			{ name: 'Sunset', file: 'sunset', image: 'sunset.svg' },
			{ name: 'Marley', file: 'marley', image: 'marley.svg' },
			{ name: 'Harvey', file: 'harvey', image: 'harvey.svg' },
			{ name: 'Vanusa', file: 'vanusa', image: 'vanusa.svg' },
			{ name: 'Skyline', file: 'skyline', image: 'skyline.svg' },
			{ name: 'Royal', file: 'royal', image: 'royal.svg' },
			{ name: 'Disco', file: 'disco', image: 'disco.svg' },
			{ name: 'Sky', file: 'sky', image: 'sky.svg' },
			{ name: 'Rose', file: 'rose', image: 'rose.svg' },
			{ name: 'Revolt', file: 'revolt', image: 'revolt.svg' },
			{ name: 'Forest', file: 'forest', image: 'forest.svg' },
			{ name: 'Night', file: 'night', image: 'night.svg' },
			{ name: 'Apricot', file: 'apricot', image: 'apricot.svg' },
			{ name: 'Faraway', file: 'faraway', image: 'faraway.svg' },
			{ name: 'Grape', file: 'grape', image: 'grape.svg' },
			{ name: 'River', file: 'river', image: 'river.svg' },
			{ name: 'Dock', file: 'dock', image: 'dock.svg' },
			{ name: 'Material One', file: 'materialone', image: 'materialone.png' },
			{ name: 'Material Two', file: 'materialtwo', image: 'materialtwo.png' },
			{ name: 'Polygons', file: 'polygons', image: 'polygons.png' },
			{ name: 'Connections One', file: 'connectionsone', image: 'connectionsone.png' },
			{ name: 'Connections Two', file: 'connectionstwo', image: 'connectionstwo.png' },
			{ name: 'Road', file: 'road', image: 'road.png' },
			{ name: 'Reflection', file: 'reflection', image: 'reflection.png' },
			{ name: 'Waves', file: 'waves', image: 'waves.png' },
			{ name: 'Sandiego', file: 'sandiego', image: 'sandiego.png' },
			{ name: 'Architecture', file: 'architecture', image: 'architecture.png' },
			{ name: 'Snow', file: 'snow', image: 'snow.png' },
			{ name: 'Palm', file: 'palm', image: 'palm.png' },
			{ name: 'Fluid', file: 'fluid', image: 'fluid.png' },
			{ name: 'Balloon', file: 'balloon', image: 'balloon.png' },
			{ name: 'Downtown', file: 'downtown', image: 'downtown.png' },
			{ name: 'Perfection', file: 'perfection', image: 'perfection.png' },
			{ name: 'Northern', file: 'northern', image: 'northern.png' },
			{ name: 'Highline', file: 'highline', image: 'highline.png' },
			{ name: 'Mural', file: 'mural', image: 'mural.png' },
			{ name: 'Aeriel', file: 'aeriel', image: 'aeriel.png' },
			{ name: 'Wing', file: 'wing', image: 'wing.png' },
			{ name: 'Skyscraper', file: 'skyscraper', image: 'skyscraper.png' },
			{ name: 'Wall', file: 'wall', image: 'wall.png' },
			{ name: 'Dawn', file: 'dawn', image: 'dawn.png' },
			{ name: 'Lille', file: 'lille', image: 'lille.png' },
			{ name: 'Condo', file: 'condo', image: 'condo.png' },
			{ name: 'Waterfall', file: 'waterfall', image: 'waterfall.png' },
			{ name: 'Coffee', file: 'coffee', image: 'coffee.png' },
			{ name: 'Mountain', file: 'mountain', image: 'mountain.png' },
			{ name: 'Lights', file: 'lights', image: 'lights.png' },
			{ name: 'Desert', file: 'desert', image: 'desert.png' },
			{ name: 'Beach', file: 'beach', image: 'beach.png' },
			{ name: 'Classic', file: 'classic', image: 'classic.png' },
			{ name: 'Hazy', file: 'hazy', image: 'hazy.png' },
			{ name: 'Exposure', file: 'exposure', image: 'exposure.png' },
			{ name: 'Norge', file: 'norge', image: 'norge.png' },
			{ name: 'Island', file: 'island', image: 'island.png' },
			{ name: 'Station', file: 'station', image: 'station.png' },
			{ name: 'Fruity', file: 'fruity', image: 'fruity.png' },
			{ name: 'Tropical', file: 'tropical', image: 'tropical.png' },
			{ name: 'Beyoglu', file: 'beyoglu', image: 'beyoglu.png' },
			{ name: 'Timelapse', file: 'timelapse', image: 'timelapse.png' },
			{ name: 'Crystal', file: 'crystal', image: 'crystal.png' },
			{ name: 'Aquarelle', file: 'aquarelle', image: 'aquarelle.png' },
			{ name: 'Canvas', file: 'canvas', image: 'canvas.png' },
			{ name: 'Olympic', file: 'olympic', image: 'olympic.png' },
			{ name: 'Circuit', file: 'circuit', image: 'circuit.png' },
			{ name: 'Flamingo', file: 'flamingo', image: 'flamingo.png' },
			{ name: 'Flight', file: 'flight', image: 'flight.png' },
			{ name: 'Tractor', file: 'tractor', image: 'tractor.png' },
			{ name: 'Volcano', file: 'volcano', image: 'volcano.png' },
			{ name: 'Pine', file: 'pine', image: 'pine.png' },
			{ name: 'Emptiness', file: 'emptiness', image: 'emptiness.png' },
			{ name: 'Splash', file: 'splash', image: 'splash.png' },
			{ name: 'Urban', file: 'urban', image: 'urban.png' },
			{ name: 'Bloom', file: 'bloom', image: 'bloom.png' },
			{ name: 'Tinfoil', file: 'tinfoil', image: 'tinfoil.png' },
			{ name: 'Hallway', file: 'hallway', image: 'hallway.png' },
			{ name: 'Seagull', file: 'seagull', image: 'seagull.png' },
			{ name: 'City', file: 'city', image: 'city.png' },
			{ name: 'Jet', file: 'jet', image: 'jet.png' },
			{ name: 'Louisville', file: 'louisville', image: 'louisville.png' },
			{ name: 'Spray', file: 'spray', image: 'spray.png' },
			{ name: 'Symmetry', file: 'symmetry', image: 'symmetry.png' },
			{ name: 'Destination', file: 'destination', image: 'destination.png' }
		];

		let primaryColors = [
			{ name: 'Amber', file: 'amber', color: '#FFC107' },
			{ name: 'Blue', file: 'blue', color: '#457fca' },
			{ name: 'BlueGray', file: 'bluegray', color: '#607D8B' },
			{ name: 'Brown', file: 'brown', color: '#795548' },
			{ name: 'Cyan', file: 'cyan', color: '#00ACC1' },
			{ name: 'DeepOrange', file: 'deeporange', color: '#FF5722' },
			{ name: 'DeepPurple', file: 'deeppurple', color: '#673AB7' },
			{ name: 'Gray', file: 'gray', color: '#757575' },
			{ name: 'Green', file: 'green', color: '#4CAF50' },
			{ name: 'Indigo', file: 'indigo', color: '#3F51B5' },
			{ name: 'LightBlue', file: 'lightblue', color: '#03A9F4' },
			{ name: 'LightGreen', file: 'lightgreen', color: '#8BC34A' },
			{ name: 'Lime', file: 'lime', color: '#C0CA33' },
			{ name: 'Orange', file: 'orange', color: '#FF9800' },
			{ name: 'Pink', file: 'pink', color: '#E91E63' },
			{ name: 'Purple', file: 'purple', color: '#9C27B0' },
			{ name: 'Teal', file: 'teal', color: '#009688' },
			{ name: 'Yellow', file: 'yellow', color: '#FDD835' },
		];

		let componentThemes = [
			{ name: 'Amber', file: 'amber', image: 'amber.svg' },
			{ name: 'Blue', file: 'blue', image: 'blue.svg' },
			{ name: 'Bluegray', file: 'bluegray', image: 'bluegray.svg' },
			{ name: 'Brown', file: 'brown', image: 'brown.svg' },
			{ name: 'Cyan', file: 'cyan', image: 'cyan.svg' },
			{ name: 'Deep Orange', file: 'deeporange', image: 'deeporange.svg' },
			{ name: 'Deep Purple', file: 'deeppurple', image: 'deeppurple.svg' },
			{ name: 'Gray', file: 'gray', image: 'gray.svg' },
			{ name: 'Green', file: 'green', image: 'green.svg' },
			{ name: 'Indigo', file: 'indigo', image: 'indigo.svg' },
			{ name: 'Light Blue', file: 'lightblue', image: 'lightblue.svg' },
			{ name: 'Light Green', file: 'lightgreen', image: 'lightgreen.svg' },
			{ name: 'Lime', file: 'lime', image: 'lime.svg' },
			{ name: 'Orange', file: 'orange', image: 'orange.svg' },
			{ name: 'Pink', file: 'pink', image: 'pink.svg' },
			{ name: 'Purple', file: 'purple', image: 'purple.svg' },
			{ name: 'Teal', file: 'teal', image: 'teal.svg' },
			{ name: 'Yellow', file: 'yellow', image: 'yellow.svg' }
		];

		return (
			<React.Fragment>
				<button className="layout-config-button p-link " onClick={this.onConfigButtonClick}>
					<i className="material-icons">settings</i>
				</button>

				<CSSTransition classNames="layout-config" timeout={{ enter: 150, exit: 150 }} in={this.state.configDialogActive}>
					<div className="layout-config">
						<div className="layout-config-content">
							<button className="layout-config-close" onClick={this.onConfigCloseClick}>
								<i className="material-icons">close</i>
							</button>

							<TabView>
								<TabPanel header="TopBar">
									<div className="layout-config-subtitle">Size</div>
									<div className="p-grid">
										<div className="p-col p-col-fixed">
											<button className="p-link layout-config-option layout-config-option-image layout-config-option-light ui-shadow-1"
												onClick={event => this.props.changeTopbarSize({ originalEvent: event, size: 'large' })}>
												<img src="assets/layout/images/configurator/topbar-large.png" alt="sapphire" style={{ width: '100%' }} />
												{this.props.topbarSize === 'large' && <i className="material-icons">check</i>}
											</button>
										</div>
										<div className="p-col p-col-fixed">
											<button className="p-link layout-config-option layout-config-option-image layout-config-option-light ui-shadow-1"
												onClick={event => this.props.changeTopbarSize({ originalEvent: event, size: 'medium' })}>
												<img src="assets/layout/images/configurator/topbar-medium.png" alt="sapphire" style={{ width: '100%' }} />
												{this.props.topbarSize === 'medium' && <i className="material-icons">check</i>}
											</button>
										</div>
										<div className="p-col p-col-fixed">
											<button className="p-link layout-config-option layout-config-option-image layout-config-option-light ui-shadow-1"
												onClick={event => this.props.changeTopbarSize({ originalEvent: event, size: 'small' })}>
												<img src="assets/layout/images/configurator/topbar-small.png" alt="sapphire" style={{ width: '100%' }} />
												{this.props.topbarSize === 'small' && <i className="material-icons">check</i>}
											</button>
										</div>
									</div>
									<div className="layout-config-subtitle">Themes</div>
									<div className="p-grid">
										{topbarThemes && topbarThemes.map((topbarTheme, index) => {
											return <div className="p-col" key={index}>
												<button className="p-link layout-config-option layout-config-option-image ui-shadow-1"
													onClick={event => this.props.changeTopbarTheme({ originalEvent: event, color: topbarTheme.file })}>
													<img src={"assets/layout/images/configurator/" + topbarTheme.image} alt={topbarTheme.name} />
													{'layout-topbar-' + topbarTheme.file === this.props.topbarColor && <i className="material-icons">check</i>}
												</button>
											</div>
										})
										}
									</div>

								</TabPanel>
								<TabPanel header="Menu">
									<div className="layout-config-subtitle">Orientation</div>
									<div className="p-grid">
										<div className="p-col p-col-fixed">
											<button className="p-link layout-config-option layout-config-option-image layout-config-option-light ui-shadow-1"
												onClick={event => this.props.changeMenuToHorizontal({ originalEvent: event, mode: true })}>
												<img src="assets/layout/images/configurator/horizontal.png" alt="sapphire" style={{ width: '100%' }} />
												{this.props.horizontal && <i className="material-icons">check</i>}
											</button>
										</div>
										<div className="p-col p-col-fixed">
											<button className="p-link layout-config-option layout-config-option-image layout-config-option-light ui-shadow-1"
												onClick={event => this.props.changeMenuToHorizontal({ originalEvent: event, mode: false })}>
												<img src="assets/layout/images/configurator/vertical.png" alt="sapphire" style={{ width: '100%' }} />
												{!this.props.horizontal && <i className="material-icons">check</i>}
											</button>
										</div>
									</div>
									<div className="layout-config-subtitle">Theme</div>
									<div className="p-grid">
										{menuThemes && menuThemes.map((menuTheme, index) => {
											return <div className="p-col" key={index}>
												<button className={classNames('p-link layout-config-option layout-config-option-image ui-shadow-1',
													{ 'layout-config-option-light': menuTheme.file === 'light' })} onClick={event => this.props.changeMenuTheme({ originalEvent: event, color: menuTheme.file })}>
													<img src={"assets/layout/images/configurator/" + menuTheme.image} alt={menuTheme.name} />
													{'layout-menu-' + menuTheme.file === this.props.menuColor && <i className="material-icons">check</i>}
												</button>
											</div>
										})
										}
									</div>
								</TabPanel>
								<TabPanel header="Components">
									<div className="p-grid">
										{componentThemes && componentThemes.map((componentTheme, index) => {
											return <div className="p-col" key={index}>
												<button className='p-link layout-config-option layout-config-option-image ui-shadow-1'
													onClick={event => this.props.changeComponentTheme({ originalEvent: event, theme: componentTheme.file })}>
													<img src={"assets/layout/images/configurator/theme/" + componentTheme.image} alt={componentTheme.name} />
													{componentTheme.file === this.props.themeColor && <i className="material-icons">check</i>}
												</button>
											</div>
										})
										}
									</div>
								</TabPanel>
								<TabPanel header="Primary Color">
									<p>Primary Color defines the highlight color of active menus. Note that this setting is only utilized in
										<b>light</b> and <b>light</b>menu modes as other menu themes have their own color to highlight the active
										menus.</p>
									<div className="p-grid p-primary-colors-grid">
										{primaryColors && primaryColors.map((primaryColor, index) => {
											return <div className="p-col" key={index}>
												<button className='p-link layout-config-option ui-shadow-1' style={{ background: primaryColor.color }}
													onClick={event => this.props.changePrimaryColor({ originalEvent: event, color: primaryColor.file })}>
													{primaryColor.file === this.props.layoutColor && <i className="material-icons">check</i>}
												</button>
											</div>
										})
										}
									</div>
								</TabPanel>
							</TabView>
						</div>
					</div>
				</CSSTransition>

				{this.state.configDialogActive && <div className="layout-config-mask"/>}
			</React.Fragment>
		);
	}
}