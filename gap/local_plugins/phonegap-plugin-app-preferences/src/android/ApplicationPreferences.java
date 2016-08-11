package net.dynagility.personify.plugin;

import java.util.Iterator;
import java.util.Map;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.SuppressLint;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.preference.PreferenceManager;
import android.util.Log;

public class ApplicationPreferences extends CordovaPlugin {

    private static final String LOG_TAG = "AppPrefs";
    private static final int NO_PROPERTY = 0;
    private static final int NO_PREFERENCE_ACTIVITY = 1;

	@SuppressLint("DefaultLocale")
	@SuppressWarnings("rawtypes")
	@Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) {
        PluginResult.Status status = PluginResult.Status.OK;
        String result = "";

        SharedPreferences sharedPrefs = PreferenceManager.getDefaultSharedPreferences(this.cordova.getActivity());
        
        try {
        	Log.d(LOG_TAG, action);
        	JSONObject args = data.getJSONObject(0);
            if (action.equals("getSetting") || action.equals("getString")) {
                String key = args.getString("key");
                if (sharedPrefs.contains(key)) {
                    Object obj = sharedPrefs.getAll().get(key);
                    callbackContext.sendPluginResult(new PluginResult(status, obj.toString()));
                } else {
                    callbackContext.sendPluginResult(createErrorObj(NO_PROPERTY, "No such property called " + key));
                }
            } else if (action.equals("setSetting") || action.equals("setString")) {
                String key = args.getString("key");
                String value = args.getString("value");
                Editor editor = sharedPrefs.edit();
                if ("true".equals(value.toLowerCase()) || "false".equals(value.toLowerCase())) {
                    editor.putBoolean(key, Boolean.parseBoolean(value));
                } else {
                    editor.putString(key, value);
                }
                callbackContext.sendPluginResult(new PluginResult(status, editor.commit()));
            } else if (action.equals("load")) {
                JSONObject obj = new JSONObject();
                Map prefs = sharedPrefs.getAll();
                Iterator it = prefs.entrySet().iterator();
                while (it.hasNext()) {
                    Map.Entry pairs = (Map.Entry)it.next();
                    obj.put(pairs.getKey().toString(), pairs.getValue().toString());
                }
                callbackContext.sendPluginResult(new PluginResult(status, obj));
            } else if (action.equals("show")) {
                String activityName = args.getString("key");
                Intent intent = new Intent(Intent.ACTION_VIEW);
                intent.setClassName(this.cordova.getActivity(), activityName);
                try {
                    this.cordova.getActivity().startActivity(intent);
                } catch (ActivityNotFoundException e) {
                    callbackContext.sendPluginResult(createErrorObj(NO_PREFERENCE_ACTIVITY, "No preferences activity called " + activityName));
                }
            } else if (action.equals("clear")) {
             Editor editor = sharedPrefs.edit();
             editor.clear();
             callbackContext.sendPluginResult(new PluginResult(status, editor.commit()));
            } else if (action.equals("remove")) {
             String key = args.getString("key");
             if (sharedPrefs.contains(key)) {
             Editor editor = sharedPrefs.edit();
                 editor.remove(key);
                 editor.commit();
                 callbackContext.sendPluginResult(new PluginResult(status, editor.commit()));
                } else {
                    callbackContext.sendPluginResult(createErrorObj(NO_PROPERTY, "No such property called " + key));
                }
            }
            return true;
        } catch (JSONException e) {
            status = PluginResult.Status.JSON_EXCEPTION;
        }
        callbackContext.sendPluginResult(new PluginResult(status, result));
        return false;
    }

    private PluginResult createErrorObj(int code, String message) throws JSONException {
        JSONObject errorObj = new JSONObject();
        errorObj.put("code", code);
        errorObj.put("message", message);
        return new PluginResult(PluginResult.Status.ERROR, errorObj);
    }

}
