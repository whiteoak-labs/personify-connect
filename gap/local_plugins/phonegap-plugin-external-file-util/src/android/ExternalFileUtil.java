package net.dynagility.personify.plugin;

import java.io.File;

import net.dynagility.personify.ApplicationCtx;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.util.Log;
import android.webkit.MimeTypeMap;

public class ExternalFileUtil extends CordovaPlugin {
	public final String ACTION_OPEN_WITH = "openWith";
	PluginResult result = new PluginResult(Status.OK);

	public boolean execute(String action, JSONArray data, CallbackContext callbackContext) {
		Log.d("ExternalFileUtil", "openWith " + data);
		
		if (action.equals(ACTION_OPEN_WITH)) {
			try {
				String path = data.getString(0);
				File filePath = new File(path);
				File file = new File(Environment.getExternalStorageDirectory()
						.getAbsoluteFile() + File.separator + filePath.getName());
				if (file.exists()){
					Intent intent = new Intent(Intent.ACTION_VIEW);
					String extension = MimeTypeMap.getFileExtensionFromUrl(path);
					String mimeType = MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension);
					intent.setDataAndType(Uri.fromFile(file), mimeType);
					intent.setFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
					ApplicationCtx.context.startActivity(intent);
				}else{
					result = new PluginResult(Status.ERROR, "File is not found");
				}
				
			} catch (JSONException ex) {
				result = new PluginResult(Status.ERROR, ex.getMessage());
			}
		}
		callbackContext.sendPluginResult(result);
		return true;
	}
}
