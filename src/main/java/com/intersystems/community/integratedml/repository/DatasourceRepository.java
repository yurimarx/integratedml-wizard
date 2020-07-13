package com.intersystems.community.integratedml.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.intersystems.community.integratedml.model.Datasource;

@RepositoryRestResource(collectionResourceRel = "datasources", path = "datasources")
public interface DatasourceRepository extends CrudRepository<Datasource, Integer> {

	
}
