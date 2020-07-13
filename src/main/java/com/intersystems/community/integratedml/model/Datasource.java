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
@Table(name = "datasource")
public class Datasource {

	@Id
    @GeneratedValue
	private Integer id;
	
	@Column(name = "modelname", length = 50)
	private String modelName;
	
	@Column(name = "irisschema", length = 50)
	private String irisSchema;
	
	@Column(name = "modelsource", length = 50)
	private String modelSource;
	
	@Column(name = "modelfeature", length = 50)
	private String modelFeature;
	
	@Lob
	private String modelLabels;
	
	@ManyToOne
	@JoinColumn(name = "problem_id")
	@RestResource(path = "problem", rel="problem")
	private Problem problem;

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

	public String getIrisSchema() {
		return irisSchema;
	}

	public void setIrisSchema(String irisSchema) {
		this.irisSchema = irisSchema;
	}

	public String getModelSource() {
		return modelSource;
	}

	public void setModelSource(String modelSource) {
		this.modelSource = modelSource;
	}

	public String getModelFeature() {
		return modelFeature;
	}

	public void setModelFeature(String modelFeature) {
		this.modelFeature = modelFeature;
	}

	public String getModelLabels() {
		return modelLabels;
	}

	public void setModelLabels(String modelLabels) {
		this.modelLabels = modelLabels;
	}

	public Problem getProblem() {
		return problem;
	}

	public void setProblem(Problem problem) {
		this.problem = problem;
	}

		
}
