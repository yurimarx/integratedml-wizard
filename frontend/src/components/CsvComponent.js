import React, { Component } from 'react';
import { Growl } from 'primereact/growl';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable, Column } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { RadioButton } from 'primereact/radiobutton';
import axios from 'axios';

export class CsvComponent extends Component {

    backend = process.env.REACT_APP_BACKEND;

    constructor() {
        super();

        this.state = {
            row: {
                datasourceUrl: '',
                userName: '',
                userPassword: '',
                schema: ''
            },
            newTable: false,
            table: '',
            tables: [],
            columns: [],
            fileName: '',
            quote: '',
            delimiter: '',

        };

        this.onUpload = this.onUpload.bind(this);
        this.uploadedFiles = [];

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.test = this.test.bind(this);
        this.list = this.list.bind(this);
        this.listHeaders = this.listHeaders.bind(this);
        this.listTables = this.listTables.bind(this);
        this.new = this.new.bind(this);
        this.columnNameEditor = this.columnNameEditor.bind(this);
        this.columnTypeEditor = this.columnTypeEditor.bind(this);
        this.sqlNameEditor = this.sqlNameEditor.bind(this);
        this.sqlTypeEditor = this.sqlTypeEditor.bind(this);
        this.onEditorValueChange = this.onEditorValueChange.bind(this);
    }

    componentDidMount() {
        this.list();
    }

    onEditorValueChange(props, value) {
        let columns = [...props.value];
        columns[props.rowIndex][props.field] = value;
        this.setState({ columns: columns });
    }

    inputTextEditor(props, field) {
        return <InputText type="text" value={props.rowData[field]} onChange={(e) => this.onEditorValueChange(props, e.target.value)} />;
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

    listTables() {
        axios.post(`${this.backend}/tables-connection`, this.state.row).then(resp => {

            this.setState({
                tables: resp.data,
            })

        })
    }

    test() {
        axios.get(`${this.backend}/connection-status?problemId=${this.state.row.id}`).then(
            resp => {
                this.growl.show({ severity: 'info', summary: 'Information', detail: resp.data });
            },
            error => {
                this.growl.show({ severity: 'error', summary: 'Erro', detail: 'Error: ' + error.statusText });
            })
    }

    new() {
        this.setState({
            row: {
                datasourceUrl: '',
                userName: '',
                userPassword: '',
                schema: '',
                table: '',
            },
            newTable: false,
            table: {},
            tables: [],
            columns: [],
            fileName: '',
            delimiter: '',
            quote: '',
        })
    }

    save() {

        const post = {
            fileName: this.state.fileName,
            delimiter: this.state.delimiter,
            quote: this.state.quote,
            connection: this.state.row,
            newTable: this.state.newTable,
            columnDefinitions: this.state.columns
        }

        axios.post(`${this.backend}/import-csv`, post).then(
            resp => {
                this.growl.show({ severity: 'info', summary: 'Information', detail: resp.data });
                this.new();
            },
            error => {
                this.growl.show({ severity: 'error', summary: 'Erro', detail: 'Error: ' + error.statusText });
            })
    }

    onUpload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
            this.setState({ fileName: file.name });
        }

        this.growl.show({ severity: 'info', summary: 'Success', detail: 'File uploaded' });

    }

    listHeaders() {
        axios.post(`${this.backend}/definitions?fileName=${this.state.fileName}&delimiter=${this.state.delimiter}&quote=${this.state.quote}`, this.state.row).then(
            resp => {
                this.setState({ columns: resp.data.columnDefinitions });
            },
            error => {
                this.growl.show({ severity: 'error', summary: 'Erro', detail: 'Error: ' + error.statusText });
            })
    }

    list() {

        axios.get(`${this.backend}/problems`).then(
            resp => {
                this.setState({ rows: resp.data._embedded.problems });
            },
            error => {
                this.growl.show({ severity: 'error', summary: 'Erro', detail: 'Error: ' + error.statusText });
            })
    }

    columnNameEditor(props) {
        return this.inputTextEditor(props, 'columnName');
    }

    columnTypeEditor(props) {
        return this.inputTextEditor(props, 'columnType');
    }

    sqlNameEditor(props) {
        return this.inputTextEditor(props, 'sqlName');
    }

    sqlTypeEditor(props) {
        return this.inputTextEditor(props, 'sqlType');
    }

    render() {
        return (
            <div className="p-grid p-fluid">
                <Growl ref={(el) => this.growl = el}></Growl>


                <div className="p-col-12 p-lg-12">
                    <div className="card">

                        <div className="card-title">Import CSV to a Database IRIS Table</div>

                        <div className="p-grid form-group">

                            <div className="p-col-12 p-md-4">
                                <div className="formlabel">
                                    <label>JDBC URL</label>
                                </div>
                                <div>
                                    <InputText value={this.state.row.datasourceUrl} name="datasourceUrl"
                                        onChange={e => this.handleChange(e)}
                                        placeholder="JDBC URL to connect InterSystems instance" />
                                </div>
                            </div>

                            <div className="p-col-12 p-md-2">
                                <div className="formlabel">
                                    <label>Username</label>
                                </div>
                                <div>
                                    <InputText value={this.state.row.userName} name="userName"
                                        onChange={e => this.handleChange(e)}
                                        placeholder="User name to connect IRIS" />
                                </div>
                            </div>

                            <div className="p-col-12 p-md-2">
                                <div className="formlabel">
                                    <label>Password</label>
                                </div>
                                <div>
                                    <InputText value={this.state.row.userPassword} name="userPassword"
                                        onChange={e => this.handleChange(e)}
                                        placeholder="Password to connect IRIS" />
                                </div>
                            </div>

                            <div className="p-col-12 p-md-2">
                                <div className="formlabel">
                                    <label>Schema</label>
                                </div>
                                <div>
                                    <InputText value={this.state.row.schema} name="schema"
                                        onChange={e => this.handleChange(e)}
                                        placeholder="Database Schema" />
                                </div>
                            </div>

                            <div className="p-col-12 p-md-2">
                                <div className="formlabel">
                                    <label>New Table?</label>
                                </div>
                                <div>
                                    <div className="p-grid form-group">
                                        <div className="p-col-12 p-md-6">
                                            <RadioButton name="newTable" value={true} onChange={(e) => this.setState({ newTable: e.value })}
                                                checked={this.state.newTable === true} />
                                            <label className="p-radiobutton-label">Yes</label>
                                        </div>
                                        <div className="p-col-12 p-md-6">
                                            <RadioButton name="newTable" value={false} onChange={(e) => this.setState({ newTable: e.value })}
                                                checked={this.state.newTable === false} />
                                            <label className="p-radiobutton-label">No</label>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {this.state.newTable &&
                                <div className="p-col-12 p-md-3">
                                    <div className="formlabel">
                                        <label>Table</label>
                                    </div>
                                    <div>
                                        <InputText value={this.state.row.table} name="table"
                                            onChange={e => this.handleChange(e)}
                                            placeholder="Destination table" />
                                    </div>
                                </div>
                            }

                            {!this.state.newTable &&
                                <div className="p-col-12 p-md-3">
                                    <div className="formlabel">
                                        <label>Table</label>
                                    </div>
                                    <div>
                                        <Dropdown options={this.state.tables} value={this.state.table} optionLabel="name"
                                            onChange={(e) => this.setState({ table: e.value })} autoWidth={true} />
                                        <Button label="Get Tables" onClick={this.listTables} />
                                    </div>
                                </div>
                            }

                            <div className="p-col-12 p-md-1">
                                <div className="formlabel">
                                    <label>Delimiter</label>
                                </div>
                                <div>
                                    <InputText value={this.state.delimiter} name="delimiter"
                                        onChange={(e) => this.setState({ delimiter: e.target.value })} />
                                </div>
                            </div>

                            <div className="p-col-12 p-md-1">
                                <div className="formlabel">
                                    <label>Quote</label>
                                </div>
                                <div>
                                    <InputText value={this.state.quote} name="quote"
                                        onChange={e => this.setState({ quote: e.target.value })} />
                                </div>
                            </div>

                            <div className="p-col-12 p-md-7">
                                <div className="formlabel">
                                    <label>File to upload</label>
                                </div>
                                <div>
                                    <FileUpload name="file[]" url={this.backend + "/upload"} onUpload={this.onUpload} multiple={true} accept="image/*" maxFileSize={1000000}>
                                        {this.uploadedFiles.length &&
                                            <ul>
                                                {this.uploadedFiles && this.uploadedFiles.map((file, index) => <li key={index}>{file.name} - {file.size} bytes</li>)}
                                            </ul>}
                                    </FileUpload>

                                </div>
                            </div>

                            <div className="p-col-12 p-md-10">

                            </div>

                            <div className="p-col-12 p-md-2">
                                <Button label="Get Definitions" onClick={this.listHeaders} />
                            </div>

                            <div className="p-col-12 p-md-12">
                                <DataTable value={this.state.columns} header="CSV Export definitions"
                                    responsive={true}>
                                    <Column field="columnName" header="Column Name" editor={this.columnNameEditor} />
                                    <Column field="columnType" header="Column Type" editor={this.columnTypeEditor} />
                                    <Column field="sqlName" header="SQL Column Name" editor={this.sqlNameEditor} />
                                    <Column field="sqlType" header="SQL Column Type" editor={this.sqlTypeEditor} />
                                </DataTable>
                            </div>
                        </div>

                    </div>

                    <div className="card">
                        <div className="p-grid">
                            <div className="p-col-2">
                                <Button label="New" className="p-button-default" onClick={this.new} />
                            </div>
                            <div className="p-col-2">
                                <Button label="Export CSV" className="p-button-success" onClick={this.save} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}