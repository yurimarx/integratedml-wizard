package com.intersystems.community.integratedml.vo;

public class ColumnDefinition {

	private String columnName;
	private String columnType;
	private String sqlName;
	private String sqlType;
		
	
	public ColumnDefinition(String columnName, String columnType, String sqlName, String sqlType) {
		super();
		this.columnName = columnName;
		this.columnType = columnType;
		this.sqlName = sqlName;
		this.sqlType = sqlType;
	}

	public String getColumnName() {
		return columnName;
	}
	
	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}
	
	public String getColumnType() {
		return columnType;
	}
	
	public void setColumnType(String columnType) {
		this.columnType = columnType;
	}

	public String getSqlName() {
		return sqlName;
	}

	public void setSqlName(String sqlName) {
		this.sqlName = sqlName;
	}

	public String getSqlType() {
		return sqlType;
	}

	public void setSqlType(String sqlType) {
		this.sqlType = sqlType;
	}
}
