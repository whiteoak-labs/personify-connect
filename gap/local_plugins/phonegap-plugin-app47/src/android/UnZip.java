package net.dynagility.personify.plugin;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import org.apache.commons.io.IOUtils;

import android.util.Log;

public class UnZip {
	public void unZipFile(File archive, File outputDir) {
		try {
			ZipFile zipfile = new ZipFile(archive);
			for (Enumeration e = zipfile.entries(); e.hasMoreElements();) {
				ZipEntry entry = (ZipEntry) e.nextElement();
				unzipEntry(zipfile, entry, outputDir);
			}
		} catch (Exception e) {
			Log.d("control", "ZipHelper.unzip() - Error extracting file "
					+ archive + ": " + e);
		}
	}

	static private void unzipEntry(ZipFile zipfile, ZipEntry entry,
			File outputDir) throws IOException {
		if (entry.isDirectory()) {
			createDirectory(new File(outputDir, entry.getName()));
			return;
		}

		File outputFile = new File(outputDir, entry.getName());
		if (!outputFile.getParentFile().exists()) {
			createDirectory(outputFile.getParentFile());
		}

		BufferedInputStream inputStream = new BufferedInputStream(
				zipfile.getInputStream(entry));
		BufferedOutputStream outputStream = new BufferedOutputStream(
				new FileOutputStream(outputFile));

		try {
			IOUtils.copy(inputStream, outputStream);
		} catch (Exception e) {
			Log.d("control", "ZipHelper.unzipEntry() - Error: " + e);
		} finally {
			outputStream.close();
			inputStream.close();
		}
	}

	static private void createDirectory(File dir) {
		Log.d("control",
				"ZipHelper.createDir() - Creating directory: " + dir.getName());
		if (!dir.exists()) {
			if (!dir.mkdirs())
				throw new RuntimeException("Can't create directory " + dir);
		} else
			Log.d("control",
					"ZipHelper.createDir() - Exists directory: "
							+ dir.getName());
	}
}