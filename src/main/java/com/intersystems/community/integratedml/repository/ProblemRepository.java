package com.intersystems.community.integratedml.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.intersystems.community.integratedml.model.Problem;

@RepositoryRestResource(collectionResourceRel = "problems", path = "problems")
public interface ProblemRepository extends CrudRepository<Problem, Integer> {

	
}
