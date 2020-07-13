package com.intersystems.community.integratedml.service;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.intersystems.community.integratedml.model.Datasource;
import com.intersystems.community.integratedml.model.Problem;
import com.intersystems.community.integratedml.vo.SQLElement;

@RestController
public class CatalogService {

	@PersistenceContext
	private EntityManager em;

	@GetMapping(path = "/columns")
	public ResponseEntity<List<SQLElement>> getCatalogColumns(@RequestParam Integer problemId,
			@RequestParam String schema, @RequestParam String table) {

		Problem problem = em.createQuery("SELECT p FROM Problem p WHERE p.id = " + problemId, Problem.class)
				.getSingleResult();

		Connection iris = getIrisConnection(problem);

		if (iris != null) {

			ArrayList<SQLElement> result = new ArrayList<SQLElement>();

			try {
				ResultSet rs = iris.createStatement()
						.executeQuery("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '" + table
								+ "' AND TABLE_SCHEMA = '" + schema + "'");
				while (rs.next()) {
					SQLElement row = new SQLElement(rs.getString("COLUMN_NAME"), rs.getString("DATA_TYPE"));
					result.add(row);
				}

				return ResponseEntity.ok(result);

			} catch (SQLException e) {
				e.printStackTrace();
				return ResponseEntity.badRequest().body(null);
			} finally {
				try {
					iris.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		} else {
			return ResponseEntity.badRequest().body(null);
		}

	}

	@GetMapping(path = "/tables")
	public ResponseEntity<List<SQLElement>> getCatalogTables(@RequestParam Integer problemId,
			@RequestParam String schema) {

		Problem problem = em.createQuery("SELECT p FROM Problem p WHERE p.id = " + problemId, Problem.class)
				.getSingleResult();

		Connection iris = getIrisConnection(problem);

		if (iris != null) {

			ArrayList<SQLElement> result = new ArrayList<SQLElement>();

			try {
				ResultSet rs = iris.createStatement().executeQuery(
						"SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA = '"
								+ schema + "'");
				while (rs.next()) {
					SQLElement row = new SQLElement(rs.getString("TABLE_NAME"), "Table");
					result.add(row);
				}

				return ResponseEntity.ok(result);

			} catch (SQLException e) {
				e.printStackTrace();
				return ResponseEntity.badRequest().body(null);
			} finally {
				try {
					iris.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		} else {
			return ResponseEntity.badRequest().body(null);
		}

	}

	@GetMapping(path = "/connection-status")
	public ResponseEntity<String> getConnectionStatus(@RequestParam Integer problemId) {

		Problem problem = em.createQuery("SELECT p FROM Problem p WHERE p.id = " + problemId, Problem.class)
				.getSingleResult();

		Connection iris = getIrisConnection(problem);

		if (iris != null) {
			return ResponseEntity.ok("Connection is ok");
		} else {
			return ResponseEntity.badRequest().body("Connection error");
		}

	}

	@PostMapping(path = "/create-model")
	public ResponseEntity<String> createModel(@RequestParam Integer problemId, @RequestBody Datasource datasource) {
		
		Problem problem = em.createQuery("SELECT p FROM Problem p WHERE p.id = " + problemId, Problem.class)
				.getSingleResult();

		
		Connection iris = getIrisConnection(problem);

		try {
			
			String sql = "CREATE MODEL " + datasource.getModelName() + 
							" PREDICTING (" + datasource.getModelFeature() + 
							") FROM " + datasource.getIrisSchema() + "." + datasource.getModelSource();
			
			Statement statement = iris.createStatement();  
			statement.executeUpdate(sql);
			
			return ResponseEntity.ok("Model created");

		} catch (SQLException e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(e.getMessage());
		} finally {
			try {
				iris.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	
	}

	private Connection getIrisConnection(Problem problem) {

		try {

			Class.forName("com.intersystems.jdbc.IRISDriver").newInstance();
			String url = problem.getDatasourceUrl();
			String username = problem.getUserName();
			String password = problem.getUserPassword();

			return DriverManager.getConnection(url, username, password);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
