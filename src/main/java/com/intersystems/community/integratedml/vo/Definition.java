package com.intersystems.community.integratedml.vo;

import java.util.ArrayList;
import java.util.List;

public class Definition {
	
	private List<ColumnDefinition> columnDefinitions = new ArrayList<ColumnDefinition>();
	private List<SQLDefinition> sqlDefinitions = new ArrayList<SQLDefinition>();
	
	private String csvFile;
	private String sqlTable;
	
	public List<ColumnDefinition> getColumnDefinitions() {
		return columnDefinitions;
	}
	public void setColumnDefinitions(List<ColumnDefinition> columnDefinitions) {
		this.columnDefinitions = columnDefinitions;
	}
	public List<SQLDefinition> getSqlDefinitions() {
		return sqlDefinitions;
	}
	public void setSqlDefinitions(List<SQLDefinition> sqlDefinitions) {
		this.sqlDefinitions = sqlDefinitions;
	}
	public String getCsvFile() {
		return csvFile;
	}
	public void setCsvFile(String csvFile) {
		this.csvFile = csvFile;
	}
	public String getSqlTable() {
		return sqlTable;
	}
	public void setSqlTable(String sqlTable) {
		this.sqlTable = sqlTable;
	}
	
	
	
}
