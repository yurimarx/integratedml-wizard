package com.intersystems.community.integratedml.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.rest.core.annotation.RestResource;

@Entity
@Table(name = "datasourcecolumn")
public class DatasourceColumn {

	@Id
    @GeneratedValue
	private Integer id;
	
	@Column(name = "columnname", length = 30)
	private String columnName;
	
	@Column(name = "columntype", length = 20)
	private String columnType;
	
	@ManyToOne
	@JoinColumn(name = "datasource_id")
	@RestResource(path = "datasource", rel="datasource")
	private Datasource datasource;
	
	public DatasourceColumn(String columnName, String columnType) {
		super();
		this.columnName = columnName;
		this.columnType = columnType;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public Datasource getDatasource() {
		return datasource;
	}

	public void setDatasource(Datasource datasource) {
		this.datasource = datasource;
	}


			
}
