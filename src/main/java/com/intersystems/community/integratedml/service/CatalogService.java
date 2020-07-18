package com.intersystems.community.integratedml.service;

import java.io.File;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.intersystems.community.integratedml.model.Datasource;
import com.intersystems.community.integratedml.model.Problem;
import com.intersystems.community.integratedml.util.CleanString;
import com.intersystems.community.integratedml.util.OSValidator;
import com.intersystems.community.integratedml.vo.ColumnDefinition;
import com.intersystems.community.integratedml.vo.ConnectionVO;
import com.intersystems.community.integratedml.vo.Definition;
import com.intersystems.community.integratedml.vo.ImportDefinition;
import com.intersystems.community.integratedml.vo.SQLDefinition;
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
	
	private String getRepository() {
		if (OSValidator.isWindows()) {
			return "c:/repository/";
		} else {
			return "/var/docs/";
		}

	}
	
	
	@PostMapping(path = "/import-csv")
	public ResponseEntity<String> importCsv(@RequestBody ImportDefinition importDefinition) {
		
		Connection iris = getIrisConnection(importDefinition.getConnection());
		
		try {
			
			
			if(importDefinition.getNewTable()) {
				String ddl = "CREATE TABLE " + importDefinition.getConnection().getSchema() + "." + importDefinition.getConnection().getTable() + "(";
				
				for(ColumnDefinition column:importDefinition.getColumnDefinitions()) {
					ddl = ddl.trim() + column.getSqlName().trim() + " " + column.getSqlType().trim() + ", ";
				}
				
				ddl = ddl.substring(0, ddl.length() - 2);
				
				ddl = ddl + ")";
				
				ddl = CleanString.cleanTextContent(ddl);
				
				Statement st = iris.createStatement();
				
				st.executeUpdate(ddl);
			}
			
			String[] headers = new String[importDefinition.getColumnDefinitions().size()];
			String sqlColumns = "";
			
			Integer idx = 0;
			for(ColumnDefinition column:importDefinition.getColumnDefinitions()) {
				headers[idx++] = column.getColumnName();
				sqlColumns = sqlColumns + column.getSqlName() + ", ";
			}
			
			sqlColumns = sqlColumns.substring(0, sqlColumns.length() - 2);
			
			Reader reader = Files.newBufferedReader(Paths.get(getRepository() + File.separator + importDefinition.getFileName()));
			
			CSVFormat format = CSVFormat.newFormat(importDefinition.getDelimiter().charAt(0));
			
			if(importDefinition.getQuote() != null && importDefinition.getQuote().length() > 0) {
				format = format.withQuote(importDefinition.getQuote().charAt(0));
			}
			
			Iterable<CSVRecord> records = format
				      .withHeader(headers)
				      .withFirstRecordAsHeader()
				      .parse(reader);
			
			Statement stInsert = null;
			
			String sql  = "INSERT INTO " + importDefinition.getConnection().getSchema().trim() + "." 
										 + importDefinition.getConnection().getTable().trim() + "(" 
										 + sqlColumns + ") VALUES(" ;
			
			for (CSVRecord record : records) {
		        
				String sqlValues = "";
				
				for(ColumnDefinition column:importDefinition.getColumnDefinitions()) {
					if(column.getColumnType().equals("Number")) {
						sqlValues = sqlValues + record.get(column.getColumnName()) + ",";
					} else {
						sqlValues = sqlValues + "'" + record.get(column.getColumnName()) + "',";
					}
				}
				
				sqlValues = sqlValues.substring(0, sqlValues.length()-1);
				
				stInsert = iris.createStatement();
				
				String sqlInsert = sql + sqlValues + ")";
				
				sqlInsert = CleanString.cleanTextContent(sqlInsert);
				
				stInsert.executeUpdate(sqlInsert);
				
		    }
			
			
			return ResponseEntity.ok("File exported");

		} catch (SQLException | IOException e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(null);
		} finally {
			try {
				iris.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	
	}

	
	@PostMapping(path = "/definitions")
	public ResponseEntity<Definition> getDefinitions(@RequestParam String fileName, @RequestParam String delimiter, @RequestParam String quote, @RequestBody ConnectionVO connection) {
		
		Definition result = new Definition();
		
		Connection iris = getIrisConnection(connection);
		
		result.setCsvFile(fileName);
		
		result.setSqlTable(connection.getTable());
		
		try {
			
			ResultSet rs = iris.createStatement()
					.executeQuery("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '" + connection.getTable()
							+ "' AND TABLE_SCHEMA = '" + connection.getSchema() + "'");
			
			
			Iterable<CSVRecord> records;
			
			Reader reader = Files.newBufferedReader(Paths.get(getRepository() + File.separator + fileName));
			
			CSVFormat format = CSVFormat.newFormat(delimiter.charAt(0));
			
			if(quote != null && quote.length() > 0) {
				format = format.withQuote(quote.charAt(0));
			}
			
			records = format.withHeader().withSkipHeaderRecord(false).parse(reader);
			
			Set<String> headers = records.iterator().next().toMap().keySet();
			
			List<ColumnDefinition> columns = new ArrayList<ColumnDefinition>();
			
			for(String header:headers) {
				columns.add(new ColumnDefinition(header, "String", header, "VARCHAR(255)"));
			}
			
			result.setColumnDefinitions(columns);
			
			List<SQLDefinition> sqlColumns = new ArrayList<SQLDefinition>();
			
			while (rs.next()) {
				sqlColumns.add(new SQLDefinition(rs.getString("COLUMN_NAME"), rs.getString("DATA_TYPE")));
			}

			return ResponseEntity.ok(result);

		} catch (SQLException | IOException e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(null);
		} finally {
			try {
				iris.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	
	}
	
	@PostMapping(path = "/tables-connection")
	public ResponseEntity<List<SQLElement>> getConnectionTables(@RequestBody ConnectionVO connection) {

		
		Connection iris = getIrisConnection(connection);

		if (iris != null) {

			ArrayList<SQLElement> result = new ArrayList<SQLElement>();

			try {
				ResultSet rs = iris.createStatement().executeQuery(
						"SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA = '"
								+ connection.getSchema() + "'");
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
	
	@PostMapping(path = "/train-model")
	public ResponseEntity<String> trainModel(@RequestParam Integer problemId, @RequestBody Datasource datasource) {
		
		Problem problem = em.createQuery("SELECT p FROM Problem p WHERE p.id = " + problemId, Problem.class)
				.getSingleResult();

		
		Connection iris = getIrisConnection(problem);

		try {
			
			String sql = "TRAIN MODEL " + datasource.getModelName() + " FROM " + datasource.getIrisSchema() + "." + datasource.getModelSource();
			
			Statement statement = iris.createStatement();  
			statement.executeUpdate(sql);
			
			return ResponseEntity.ok("Model trained");

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
	
	private Connection getIrisConnection(ConnectionVO connection) {

		try {

			Class.forName("com.intersystems.jdbc.IRISDriver").newInstance();
			String url = connection.getDatasourceUrl();
			String username = connection.getUserName();
			String password = connection.getUserPassword();

			return DriverManager.getConnection(url, username, password);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
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
