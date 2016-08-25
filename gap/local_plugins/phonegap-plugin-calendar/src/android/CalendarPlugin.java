package net.dynagility.personify.plugin;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONObject;

import android.app.Activity;
import android.content.Intent;

public class CalendarPlugin extends CordovaPlugin 
{
	public static final String ACTION_ADD_TO_CALENDAR = "addToCalendar";
	public static final Integer RESULT_CODE_CREATE = 0;

	public boolean execute(String action, JSONArray args, CallbackContext callbackContext)
	{
		try 
		{
			if (ACTION_ADD_TO_CALENDAR.equals(action)) 
			{
				JSONObject arg_object = args.getJSONObject(0);
				JSONObject checkTimeZone = args.getJSONObject(1);
				
				Long startTime = null;
				Long endTime = null;

				if (checkTimeZone.getBoolean("timeZone")) {
					startTime = arg_object.getLong("startDate");
					endTime = arg_object.getLong("endDate");
				}
				else {
					String startDate = arg_object.getString("startDate").toUpperCase();
					String endDate = arg_object.getString("endDate").toUpperCase();
					startDate = startDate.contains("T") ? startDate.replace("T", " ") : startDate ;
					endDate = endDate.contains("T") ? endDate.replace("T", " ") : endDate ;
					
					DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd HH:mm:ss");
					startTime = dateFormat.parse(startDate).getTime();
					endTime = dateFormat.parse(endDate).getTime();
				}
				
				Intent calIntent = new Intent(Intent.ACTION_EDIT)
						.setType("vnd.android.cursor.item/event")
						.putExtra("beginTime", startTime)
						.putExtra("endTime", endTime)
						.putExtra("title", arg_object.getString("title"))
						.putExtra("description", arg_object.getString("body"))
						.putExtra("eventLocation", arg_object.getString("location"));

				this.cordova.startActivityForResult(this, calIntent, RESULT_CODE_CREATE);
				callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK));
				return true;
			}
		} 
		catch (Exception e) {
			System.err.println("Exception: " + e.getMessage());
			callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR));
			return false;
		}
		
		callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR));
		return false;
	}

	public void onActivityResult(int requestCode, int resultCode, Intent data) 
	{
		if (requestCode == RESULT_CODE_CREATE) 
		{
			if (resultCode == Activity.RESULT_OK) {
				new PluginResult(PluginResult.Status.OK);
			}
			else {
				new PluginResult(PluginResult.Status.ERROR,  "Activity result code " + resultCode);
			}
		}
	}
}