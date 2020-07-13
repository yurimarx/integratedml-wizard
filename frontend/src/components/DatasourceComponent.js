import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Growl } from 'primereact/growl';
import { DataTable, Column } from 'primereact/datatable';
import axios from 'axios';

export class DatasourceComponent extends Component {

    backend = process.env.REACT_APP_BACKEND;

    constructor() {
        super();

        this.state = {
            row: {
                id: null,
                modelSource: '',
                modelName: '',
                problem: '',
                modelFeature: '',
                modelLabels: '',
                irisSchema: ''
            },
            rows: [],
            problem: {},
            problems: [],
            tables: [],
            table: {},
            columns: [],
            column: {},
            labels: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.loadProblems = this.loadProblems.bind(this);
        this.listTables = this.listTables.bind(this);
        this.listTables = this.listTables.bind(this);
        this.list = this.list.bind(this);
        this.load = this.load.bind(this);
        this.delete = this.delete.bind(this);
        this.reset = this.reset.bind(this);
        this.getTableFromName = this.getTableFromName.bind(this);
        this.getFeatureFromName = this.getFeatureFromName.bind(this);
        this.getLabelsFromName = this.getLabelsFromName.bind(this);
        this.createModel = this.createModel.bind(this);
    }

    componentDidMount() {
        this.list();
        this.loadProblems();
    }

    reset() {
        this.setState({
            row: {
                id: null,
                modelSource: '',
                modelName: '',
                problem: '',
                modelFeature: '',
                modelLabels: '',
                irisSchema: ''
            },
            problem: {},
            tables: [],
            table: {},
            columns: [],
            column: {},
            labels: [],
        });
    }

    list() {

        axios.get(`${this.backend}/datasources`).then(resp => {

            this.setState({
                rows: resp.data._embedded.datasources,
            })

        })
    }

    createModel() {

        axios.post(`${this.backend}/create-model?problemId=${this.state.problem.id}`, this.state.row).then(
            () => {
                this.growl.show({ severity: 'info', summary: 'Information', detail: 'ML Model created in the IntegratedML' });
            },
            error => {
                this.growl.show({ severity: 'error', summary: 'Erro', detail: 'Error: ' + error });
            })
    }

    delete() {

        axios.delete(`${this.backend}/datasources/${this.state.row.id}`).then(
            () => {
                this.growl.show({ severity: 'info', summary: 'Information', detail: 'Model deleted' });
                this.list();
                this.reset();
            },
            error => {
                this.growl.show({ severity: 'error', summary: 'Erro', detail: 'Error: ' + error.statusText });
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
            this.getLabelsFromName();

        })
    }

    getLabelsFromName() {

        const labelList = this.state.row.modelLabels.split(',');

        let labelColumns = [];

        this.state.columns.forEach(elementColumn => {

            labelList.forEach(elementLabel => {
                if (elementColumn.name === elementLabel) {
                    labelColumns.push(elementColumn);
                }
            });

            if (elementColumn.name === this.state.row.modelFeature) {
                this.setState({ feature: elementColumn });
            }
        });

        this.setState({ labels: labelColumns });

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

    save() {

        let post = this.state.row;
        post.problem = this.state.problem._links.self.href;
        post.modelFeature = this.state.feature.name;
        post.modelSource = this.state.table.name;
        post.modelLabels = this.labelsToString(this.state.labels);

        axios.post(`${this.backend}/datasources`, post).then(
            resp => {
                this.setState({ row: resp.data });
                this.growl.show({ severity: 'info', summary: 'Information', detail: 'Model saved' });
                this.list();
            },
            error => {
                this.growl.show({ severity: 'error', summary: 'Erro', detail: 'Error: ' + error.statusText });
            })
    }

    labelsToString(labels) {

        let result = '';

        labels.forEach(element => {
            result = result + element.name + ',';
        });

        result = result.substring(0, result.length - 1);

        return result;
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

                        <div className="card-title">Create your model</div>

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


                            <div className="p-col-12 p-md-2">
                                <br />
                                <div>
                                    <Button label="Get tables" onClick={this.listTables} />
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
                                    <label>Labels</label>
                                </div>
                                <div>
                                    <MultiSelect options={this.state.columns} value={this.state.labels} optionLabel="name"
                                        onChange={(e) => this.setState({ labels: e.value })} autoWidth={true} />
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
                                <Button label="New" onClick={this.reset} />
                            </div>
                            <div className="p-col-2">
                                <Button label="Save" className="p-button-success" onClick={this.save} />
                            </div>
                            <div className="p-col-2">
                                <Button label="Delete" className="p-button-danger" onClick={this.delete} />
                            </div>
                            <div className="p-col-2">
                                <Button label="Create Model" className="p-button-success" onClick={this.createModel} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}