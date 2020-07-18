package com.intersystems.community.integratedml.servlet;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import com.intersystems.community.integratedml.util.OSValidator;

@WebServlet("/upload")
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 2, // 2MB
		maxFileSize = 1024 * 1024 * 10, // 10MB
		maxRequestSize = 1024 * 1024 * 50) // 50MB
public class UploadServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	private String getRepository() {
		if (OSValidator.isWindows()) {
			return "c:/repository/";
		} else {
			return "/var/docs/";
		}

	}

	private String extractFileName(Part part) {
		String contentDisp = part.getHeader("content-disposition");
		String[] items = contentDisp.split(";");
		for (String s : items) {
			if (s.trim().startsWith("filename")) {
				return s.substring(s.indexOf("=") + 2, s.length() - 1);
			}
		}
		return "";
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String uploadPath = getRepository();
		String savePath = uploadPath;

		try {
			File fileSaveDir = new File(savePath);
			if (!fileSaveDir.exists()) {
				fileSaveDir.mkdir();
			}

			for (Part part : request.getParts()) {
				String fileName = extractFileName(part);
				fileName = new File(fileName).getName();
				part.write(savePath + File.separator + fileName);
			}
			
			request.setAttribute("message", "Upload has been done successfully!");

			response.setStatus(201);

		} catch (Exception ex) {
			request.setAttribute("message", "There was an error: " + ex.getMessage());
			ex.printStackTrace();
			response.setStatus(500);
			
		}
	}

}
