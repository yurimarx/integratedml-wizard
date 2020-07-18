package com.intersystems.community.integratedml.vo;

import java.util.List;

public class ImportDefinition {


	private String fileName;  
	private String delimiter;
	private String quote; 
	private ConnectionVO connection;
	private Boolean newTable;
	private List<ColumnDefinition> columnDefinitions;
	
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getDelimiter() {
		return delimiter;
	}
	public void setDelimiter(String delimiter) {
		this.delimiter = delimiter;
	}
	public String getQuote() {
		return quote;
	}
	public void setQuote(String quote) {
		this.quote = quote;
	}
	public ConnectionVO getConnection() {
		return connection;
	}
	public void setConnection(ConnectionVO connection) {
		this.connection = connection;
	}
	public List<ColumnDefinition> getColumnDefinitions() {
		return columnDefinitions;
	}
	public void setColumnDefinitions(List<ColumnDefinition> columnDefinitions) {
		this.columnDefinitions = columnDefinitions;
	}
	public Boolean getNewTable() {
		return newTable;
	}
	public void setNewTable(Boolean newTable) {
		this.newTable = newTable;
	}
		
}
