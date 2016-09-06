package net.dynagility.personify.plugin;

import net.dynagility.personify.ApplicationCtx;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Intent;
import android.net.Uri;
import android.util.Log;

public class PhoneDialer extends CordovaPlugin{
	public final String ACTION_PHONE_DIAL = "dialPhone";
	PluginResult result = new PluginResult(Status.INVALID_ACTION);
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) {
		Log.d("PhoneDialer", "Android phone dial function");
		if (action.equals(ACTION_PHONE_DIAL)) {
			try {
			    String phoneNumber = data.getJSONObject(0).getString("number");
			    //Execute call function
			    String number = "tel:" + phoneNumber;
		        Intent callIntent = new Intent(Intent.ACTION_CALL, Uri.parse(number));
		        ApplicationCtx.context.startActivity(callIntent);
			    result = new PluginResult(Status.OK);
			}
			catch (JSONException ex) {
			   result = new PluginResult(Status.ERROR, ex.getMessage());
			}   
		}
		callbackContext.sendPluginResult(result);
		return true;
	}
}
