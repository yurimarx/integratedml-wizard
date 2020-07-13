import React, { Component } from 'react';
import { Growl } from 'primereact/growl';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { DataTable, Column } from 'primereact/datatable';
import axios from 'axios';

export class ProblemComponent extends Component {

    backend = process.env.REACT_APP_BACKEND;

    constructor() {
        super();

        this.state = {
            row: {
                id: null,
                subject: '',
                accuracy: 0.0,
                datasourceUrl: '',
                userName: '',
                userPassword: '',
                businessCase: ''
            },
            rows: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.test = this.test.bind(this);
        this.list = this.list.bind(this);
        this.new = this.new.bind(this);
    }

    componentDidMount() {
        this.list();
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

    test() {
        axios.get(`${this.backend}/connection-status?problemId=${this.state.row.id}`).then(
            resp => {
                this.growl.show({ severity: 'info', summary: 'Information', detail: resp.data});
            },
            error => {
                this.growl.show({ severity: 'error', summary: 'Erro', detail: 'Error: ' + error.statusText });
            })
    }

    new() {
        this.setState({
            row: {
                id: null,
                subject: '',
                accuracy: 0.0,
                datasourceUrl: '',
                userName: '',
                userPassword: '',
                businessCase: ''
            }})
    }

    save() {

        let post = this.state.row;
        
        axios.post(`${this.backend}/problems`, post).then(
            resp => {
                this.setState({row: resp.data});
                this.growl.show({ severity: 'info', summary: 'Information', detail: 'Problem saved'});
                this.list();
            },
            error => {
                this.growl.show({ severity: 'error', summary: 'Erro', detail: 'Error: ' + error.statusText });
            })
    }

    list() {
        
        axios.get(`${this.backend}/problems`).then(
            resp => {
                this.setState({rows: resp.data._embedded.problems});
            },
            error => {
                this.growl.show({ severity: 'error', summary: 'Erro', detail: 'Error: ' + error.statusText });
            })
    }

    render() {
        return (
            <div className="p-grid p-fluid">
                <Growl ref={(el) => this.growl = el}></Growl>
                
                <div className="p-col-12 p-lg-4">
                    <div className="card card-w-title datatable-demo">
                        <div className="card-title">Problem List</div>
                        <DataTable value={this.state.rows} selectionMode="single" paginator={true} rows={10}
                                   responsive={true} selection={this.state.row} onSelectionChange={event => this.setState({row: event.value})}>
                            <Column field="subject" header="Subject" sortable={true} />
                            
                        </DataTable>
                    </div>
                </div>
                
                <div className="p-col-12 p-lg-8">
                    <div className="card">

                        <div className="card-title">Define the problem</div>

                        <div className="p-grid form-group">

                            <div className="p-col-12 p-md-10">
                                <div className="formlabel">
                                    <label>What do you want?</label>
                                </div>
                                <div>
                                    <InputText value={this.state.row.subject} name="subject"
                                        onChange={e => this.handleChange(e)}
                                        placeholder="What is the the analysis function" />
                                </div>
                            </div>

                            <div className="p-col-12 p-md-2">
                                <div className="formlabel">
                                    <label>Accuracy</label>
                                </div>
                                <div>
                                    <InputText keyfilter="num" value={this.state.row.accuracy} name="accuracy"
                                        onChange={e => this.handleChange(e)} />
                                </div>
                            </div>

                            <div className="p-col-12 p-md-6">
                                <div className="formlabel">
                                    <label>IntegratedML JDBC URL</label>
                                </div>
                                <div>
                                    <InputText value={this.state.row.datasourceUrl} name="datasourceUrl"
                                        onChange={e => this.handleChange(e)}
                                        placeholder="JDBC URL to connect InterSystems IntegratedML instance" />
                                </div>
                            </div>

                            <div className="p-col-12 p-md-3">
                                <div className="formlabel">
                                    <label>Username</label>
                                </div>
                                <div>
                                    <InputText value={this.state.row.userName} name="userName"
                                        onChange={e => this.handleChange(e)}
                                        placeholder="User name to connect IRIS" />
                                </div>
                            </div>

                            <div className="p-col-12 p-md-3">
                                <div className="formlabel">
                                    <label>Password</label>
                                </div>
                                <div>
                                    <InputText value={this.state.row.userPassword} name="userPassword"
                                        onChange={e => this.handleChange(e)}
                                        placeholder="Password to connect IRIS" />
                                </div>
                            </div>

                            <div className="p-col-12 p-md-12">
                                <div className="formlabel">
                                    <label>How will your app use these predictions? </label>
                                </div>
                                <div>
                                    <InputTextarea value={this.state.row.businessCase}
                                        rows={3} cols={30} autoResize={true}
                                        placeholder="Detail your Business case" name="businessCase"
                                        onChange={e => this.handleChange(e)} />

                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="card">
                        <div className="p-grid">
                            <div className="p-col-2">
                                <Button label="New" className="p-button-default" onClick={this.new} />
                            </div>
                            <div className="p-col-2">
                                <Button label="Save" className="p-button-success" onClick={this.save} />
                            </div>
                            <div className="p-col-2">
                                <Button label="Delete" className="p-button-danger" />
                            </div>
                            <div className="p-col-2">
                                <Button label="Test" className="p-button-success" onClick={this.test} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}