import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Growl } from 'primereact/growl';
import {ProgressSpinner} from 'primereact/progressspinner';
import { DataTable, Column } from 'primereact/datatable';
import axios from 'axios';

export class TrainComponent extends Component {

    backend = process.env.REACT_APP_BACKEND;

    constructor() {
        super();

        this.state = {
            row: {
                id: null,
                modelSource: '',
                modelName: '',
                modelFeature: ''
            },
            rows: [],
            problem: {},
            problems: [],
            tables: [],
            table: {},
            columns: [],
            column: {},
            inProgress: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.loadProblems = this.loadProblems.bind(this);
        this.listTables = this.listTables.bind(this);
        this.list = this.list.bind(this);
        this.load = this.load.bind(this);
        this.getTableFromName = this.getTableFromName.bind(this);
        this.getFeatureFromName = this.getFeatureFromName.bind(this);
        this.trainModel = this.trainModel.bind(this);
    }

    componentDidMount() {
        this.list();
        this.loadProblems();
    }

    list() {

        axios.get(`${this.backend}/datasources`).then(resp => {

            this.setState({
                rows: resp.data._embedded.datasources,
            })

        })
    }

    trainModel() {

        this.setState({inProgress: true});

        axios.post(`${this.backend}/train-model?problemId=${this.state.problem.id}`, this.state.row).then(
            () => {
                this.growl.show({ severity: 'info', summary: 'Information', detail: 'ML Model trained' });
                this.setState({inProgress: false});
            },
            error => {
                this.setState({inProgress: false});
                this.growl.show({ severity: 'error', summary: 'Erro', detail: 'Error: ' + error });
            })
    }

    
    listTables() {
        axios.get(`${this.backend}/tables?problemId=${this.state.problem.id}&schema=${this.state.row.irisSchema}`).then(resp => {

            this.setState({
                tables: resp.data,
            })

            this.getTableFromName(this.state.row.modelSource);

        })
    }

    listColumns(table) {
        axios.get(`${this.backend}/columns?problemId=${this.state.problem.id}&schema=${this.state.row.irisSchema}&table=${table}`).then(resp => {

            this.setState({
                columns: resp.data,
            })

            this.getFeatureFromName();
            
        })
    }
    
    loadProblems() {

        axios.get(`${this.backend}/problems`).then(resp => {

            this.setState({
                problems: resp.data._embedded.problems,
            })

        })
    }

    handleChange(event) {

        const { target: { name, value } } = event

        this.setState(prevState => ({
            row: {
                ...prevState.row,
                [name]: value
            }
        }));

    }

    load(event) {

        this.setState({
            row: event.value
        })

        axios.get(event.value._links.problem.href).then(resp => {

            this.setState({
                problem: resp.data
            })

            this.listTables();

        })

    }

    getTableFromName(name) {

        this.state.tables.forEach(element => {
            if (element.name === name) {
                this.setState({ table: element });
                this.listColumns(element.name);
            }
        });
    }

    getFeatureFromName() {

        this.state.columns.forEach(element => {
            if (element.name === this.state.row.modelFeature) {
                this.setState({ feature: element });
            }
        });

    }
    
    render() {
        return (
            <div className="p-grid p-fluid">
                <Growl ref={(el) => this.growl = el}></Growl>

                <div className="p-col-12 p-lg-3">

                    <div className="card card-w-title datatable-demo">
                        <div className="card-title">Model List</div>
                        <DataTable value={this.state.rows} selectionMode="single" paginator={true} rows={10}
                            responsive={true} selection={this.state.row}
                            onSelectionChange={(e) => this.load(e)}>
                            <Column field="modelName" header="ML Model" sortable={true} />

                        </DataTable>
                    </div>
                </div>

                <div className="p-col-12 p-lg-9">
                    <div className="card">

                        <div className="card-title">Train your model</div>

                        <div className="p-grid form-group">

                            <div className="p-col-12 p-md-6">

                                <div className="formlabel">
                                    <label>Problem</label>
                                </div>
                                <div>
                                    <Dropdown options={this.state.problems} value={this.state.problem} optionLabel="subject"
                                        onChange={(e) => this.setState({ problem: e.value })} autoWidth={true} />
                                </div>
                            </div>


                            <div className="p-col-12 p-md-3">
                                <div className="formlabel">
                                    <label>IRIS Schema</label>
                                </div>
                                <div>
                                    <InputText value={this.state.row.irisSchema} name="irisSchema"
                                        onChange={e => this.handleChange(e)}
                                        placeholder="IRIS Schema" />
                                </div>
                            </div>

                            <div className="p-col-12 p-md-3">
                                <div className="formlabel">
                                    <label>IRIS Table</label>
                                </div>
                                <div>
                                    <Dropdown options={this.state.tables} value={this.state.table} optionLabel="name"
                                        onChange={(e) => {
                                            this.setState({ table: e.value });
                                            this.listColumns(e.value.name);
                                        }} autoWidth={true} />
                                </div>
                            </div>
                            
                            <div className="p-col-12 p-md-3">
                                <div className="formlabel">
                                    <label>Feature</label>
                                </div>
                                <div>
                                    <Dropdown options={this.state.columns} value={this.state.feature} optionLabel="name"
                                        onChange={(e) => this.setState({ feature: e.value })} autoWidth={true} />
                                </div>
                            </div>

                            
                            <div className="p-col-12 p-md-3">
                                <div className="formlabel">
                                    <label>Model Name</label>
                                </div>
                                <div>
                                    <InputText value={this.state.row.modelName} name="modelName"
                                        onChange={e => this.handleChange(e)}
                                        placeholder="Model name" />
                                </div>
                            </div>


                        </div>

                    </div>

                    <div className="card">
                        <div className="p-grid">
                            <div className="p-col-2">
                                <Button label="Train Model" className="p-button-success" onClick={this.trainModel} />
                            </div>
                            {this.state.inProgress &&
                                <div className="p-col-2">
                                    <h4>Training model in progress, wait...</h4><ProgressSpinner/>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}