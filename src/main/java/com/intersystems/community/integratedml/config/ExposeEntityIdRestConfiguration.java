package com.intersystems.community.integratedml.config;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.stereotype.Component;

import com.intersystems.community.integratedml.model.Datasource;
import com.intersystems.community.integratedml.model.Problem;

@SuppressWarnings("deprecation")
@Component
public class ExposeEntityIdRestConfiguration extends RepositoryRestConfigurerAdapter {

  @Override
  public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
    config.exposeIdsFor(Problem.class);
    config.exposeIdsFor(Datasource.class);
  }
}