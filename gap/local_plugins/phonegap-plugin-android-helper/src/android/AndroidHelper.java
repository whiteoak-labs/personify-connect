package net.dynagility.personify.plugin;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONArray;
import org.json.JSONObject;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.net.Uri;
import android.util.Log;
import android.view.inputmethod.InputMethodManager;

public class AndroidHelper extends CordovaPlugin 
{
	public final String PORTRAIT_MODE = "portrait";
	public final String LOG_TAG = "AndroidHelper";
	public final String GEOCODER_MAPS = "geocoderMaps";
	public final String ADJUST_PAN = "adjustPan";
	public final String ADJUST_RESIZE = "adjustResize";
	public final String CLEAR_HISTORY = "clearHistory";
	public final String GET_PERSONIFY_DATA_PATH = "personifyDataPath";
	public final String WRITE_INTERNAL_STORAGE_FILE = "writeInternalFile";
	public final String HIDE_SOFT_KEYBOARD = "hideKeyBoard";
	public final String BACK_HIDE_KEYBOARD ="backhideandroidkeyboard";
	PluginResult result = new PluginResult(Status.INVALID_ACTION);
	public static CordovaWebView webview;
	public static boolean enterKey=false;

	@Override
	public boolean execute(String action, JSONArray data, CallbackContext callbackContext) 
	{
		Activity activity = this.cordova.getActivity();
		try 
		{
			if (action.equals(PORTRAIT_MODE)) 
			{
				Log.d(LOG_TAG, "set portrait mode successfully");
				activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
				result = new PluginResult(Status.OK);
			} 
			else if(action.equals(CLEAR_HISTORY))
			{
				Log.d(LOG_TAG, "clear cache");
				webview = this.webView;
				activity.runOnUiThread(new Runnable() {
					@Override
					public void run() {
						webview.clearHistory();
						webview.clearCache(false);
					}
				});
				result = new PluginResult(Status.OK);
			}
			else if (action.equals(GEOCODER_MAPS))
			{
				JSONObject dataObj = data.getJSONObject(0);
				String latitude = dataObj.getString("latitude");
				String longitude = dataObj.getString("longitude");
				String formattedAddress = dataObj.getString("address");
				
				Intent intent = new Intent(Intent.ACTION_VIEW,
	                      Uri.parse(String.format("geo:0,0?q=%s,%s (%s)",latitude, longitude, formattedAddress)));
				activity.startActivity(intent);
			}
			else if (action.equals(GET_PERSONIFY_DATA_PATH)) 
			{
				PluginResult.Status status = PluginResult.Status.OK;
				String personifyDataPath = activity.getFilesDir().getAbsolutePath();
				result = new PluginResult(status, personifyDataPath);
			}
			else if (action.equals(WRITE_INTERNAL_STORAGE_FILE))
			{
				JSONObject dataObj = data.getJSONObject(0);
				String path = dataObj.getString("filePath");
				String content = dataObj.getString("content");
				//write file
				File file = new File(path);
				file.createNewFile();
				FileOutputStream fOut = new FileOutputStream(file);
	            OutputStreamWriter myOutWriter =new OutputStreamWriter(fOut);
	            myOutWriter.append(content);
	            myOutWriter.close();
	            fOut.close();
	            
	            result = new PluginResult(Status.OK);
			}
			else if(action.equals(ADJUST_PAN))
			{
				System.out.println("action.equals(ADJUST_PAN)");
				enterKey=true;
			}
			else if(action.equals(ADJUST_RESIZE))
			{
				System.out.println("action.equals(ADJUST_RESIZE)");
			}
			else if (action.equals(HIDE_SOFT_KEYBOARD)) 
			{
				System.out.println("action.equals(HIDE_SOFT_KEYBOARD)");							     
				KeyBoard.hide(activity);
			} 
			else if (action.equals(BACK_HIDE_KEYBOARD)) {
				System.out.println("action.equals(BACK_HIDE_KEYBOARD)");
				KeyBoard.hide(activity);
			}
			else {
				result = new PluginResult(Status.ERROR, "The action error");
			}
		} catch (Exception ex) 
		{
			Log.e(LOG_TAG, ex.getMessage());
			result = new PluginResult(Status.ERROR, ex.getMessage());
		}
		
		callbackContext.sendPluginResult(result);
		return true;
	}
	
	public static class KeyBoard {
	    public static void hide(Activity activity) {
	        InputMethodManager imm = (InputMethodManager) activity.getSystemService(Context.INPUT_METHOD_SERVICE);
	        imm.hideSoftInputFromWindow(activity.getCurrentFocus().getWindowToken(), 0); // hide
	    }
	}
}

