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

public class SendSMS extends CordovaPlugin {
	public final String ACTION_SEND_SMS = "sendSMS";

	public boolean execute(String action, JSONArray data, CallbackContext callbackContext) {

		Activity activity = this.cordova.getActivity();
		PluginResult result = new PluginResult(Status.INVALID_ACTION);
		Log.d("SendSMS", "Send SMS Android plugin");

		if (action.equals(ACTION_SEND_SMS)) {
			try {
				String phoneNumber = data.getJSONObject(0).getString("phoneNumber");
				phoneNumber = phoneNumber.replaceAll("[^0-9+]", "");
				activity.startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("sms:"+ phoneNumber)));
				result = new PluginResult(Status.OK);
			} catch (JSONException ex) {
				result = new PluginResult(Status.ERROR, ex.getMessage());
			}
		}
		callbackContext.sendPluginResult(result);
		return true;
	}
}
