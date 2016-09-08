package net.dynagility.personify.plugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

public class PhoneDialer extends CordovaPlugin{
	public final String ACTION_PHONE_DIAL = "dialPhone";
	PluginResult result = new PluginResult(Status.INVALID_ACTION);
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) {
		Activity activity = this.cordova.getActivity();
		Log.d("PhoneDialer", "Android phone dial function");
		if (action.equals(ACTION_PHONE_DIAL)) {
			try {
				String phoneNumber = data.getJSONObject(0).getString("number");
				String option = data.getJSONObject(0).getString("option");
				if(option.equals("CALL"))
				{
					//Execute call function
				    String number = "tel:" + phoneNumber;
			        Intent callIntent = new Intent(Intent.ACTION_CALL, Uri.parse(number));
			        activity.startActivity(callIntent);
				    result = new PluginResult(Status.OK);
				}
				if(option.equals("SMS"))
				{
					phoneNumber = phoneNumber.replaceAll("[^0-9+]", "");
					activity.startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("sms:"+ phoneNumber)));
					result = new PluginResult(Status.OK);
				}

			}
			catch (JSONException ex) {
			   result = new PluginResult(Status.ERROR, ex.getMessage());
			}
		}
		callbackContext.sendPluginResult(result);
		return true;
	}
}
