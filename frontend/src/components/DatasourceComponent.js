import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import axios from 'axios';

export class DatasourceComponent extends Component {

    backend = process.env.REACT_APP_BACKEND;

    constructor() {
        super();

        this.state = {
            row: {
                id: null,
                name: '',
                modelsource: '',
                problem: '',
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
    }

    componentDidMount() {
        this.loadProblems();
    }

    listTables() {
        axios.get(`${this.backend}/tables?problemId=${this.state.problem.id}&schema=${this.state.row.irisSchema}`).then(resp => {

            this.setState({
                tables: resp.data,
            })

        })
    }

    listColumns(table) {
        axios.get(`${this.backend}/columns?problemId=${this.state.problem.id}&schema=${this.state.row.irisSchema}&table=${table}`).then(resp => {

            this.setState({
                columns: resp.data,
            })

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

    save() {

        let post = this.state.row;
        post.problem = this.state.problem.self;

        axios.post(`${this.backend}/datasources`, post).then(resp => {
            console.log("sucesso");
        })
    }

    render() {
        return (
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-12">
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
                                    <InputText value={this.state.row.modelname} name="modelname"
                                        onChange={e => this.handleChange(e)}
                                        placeholder="Model name" />
                                </div>
                            </div>


                        </div>

                    </div>

                    <div className="card">
                        <div className="p-grid">
                            <div className="p-col-2">
                                <Button label="Save" className="p-button-success" onClick={this.save} />
                            </div>
                            <div className="p-col-2">
                                <Button label="Delete" className="p-button-danger" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}