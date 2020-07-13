package com.intersystems.community.integratedml.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.rest.core.annotation.RestResource;

@Entity
@Table(name = "model")
public class Model {

	@Id
    @GeneratedValue
	private Integer id;
	
	@Column(name = "modelname", length = 50)
	private String modelName;
	
	@Column(name = "modellabel", length = 50)
	private String modelLabel;
	
	@Column(name = "modelsource", length = 50)
	private String modelSource;
	
	@Lob
	private String features;
	
	@ManyToOne
	@JoinColumn(name = "datasource_id")
	@RestResource(path = "datasource", rel="datasource")
	private Datasource datasource;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getModelName() {
		return modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

	public String getModelLabel() {
		return modelLabel;
	}

	public void setModelLabel(String modelLabel) {
		this.modelLabel = modelLabel;
	}

	public String getModelSource() {
		return modelSource;
	}

	public void setModelSource(String modelSource) {
		this.modelSource = modelSource;
	}

	public String getFeatures() {
		return features;
	}

	public void setFeatures(String features) {
		this.features = features;
	}

	public Datasource getDatasource() {
		return datasource;
	}

	public void setDatasource(Datasource datasource) {
		this.datasource = datasource;
	}

		
}
