package com.intersystems.community.integratedml.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "problem")
public class Problem {
	
	@Id
    @GeneratedValue
	private Integer id;
	
	@Column(name = "subject", length = 100)
	private String subject;
	
	private Double accuracy;
	
	@Column(name = "datasourceurl")
	private String datasourceUrl;
	
	@Column(name = "username", length = 50)
	private String userName;
	
	@Column(name = "userpassword", length = 50)
	private String userPassword;
	
	@Column(name = "businesscase")
	@Lob
	private String businessCase;
	
	@OneToMany(mappedBy = "problem")
	private List<Datasource> datasources;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public Double getAccuracy() {
		return accuracy;
	}

	public void setAccuracy(Double accuracy) {
		this.accuracy = accuracy;
	}

	public String getDatasourceUrl() {
		return datasourceUrl;
	}

	public void setDatasourceUrl(String datasourceUrl) {
		this.datasourceUrl = datasourceUrl;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public String getBusinessCase() {
		return businessCase;
	}

	public void setBusinessCase(String businessCase) {
		this.businessCase = businessCase;
	}

	public List<Datasource> getDatasources() {
		return datasources;
	}

	public void setDatasources(List<Datasource> datasources) {
		this.datasources = datasources;
	}
	
	

}
