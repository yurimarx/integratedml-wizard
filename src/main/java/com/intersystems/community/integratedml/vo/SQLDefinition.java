package com.intersystems.community.integratedml.vo;

public class SQLDefinition {
	
	private String sqlName;
	private String sqlType;
	
	public SQLDefinition(String sqlName, String sqlType) {
		super();
		this.sqlName = sqlName;
		this.sqlType = sqlType;
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
