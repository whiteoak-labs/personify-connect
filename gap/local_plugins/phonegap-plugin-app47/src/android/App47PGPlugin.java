package net.dynagility.personify.plugin;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Map;

import org.apache.commons.io.IOUtils;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.SuppressLint;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.preference.PreferenceManager;
import android.util.Log;

import com.app47.embeddedagent.EmbeddedAgent;
import com.app47.embeddedagent.EmbeddedAgentLogger;

@SuppressLint("NewApi")
public class App47PGPlugin extends CordovaPlugin {

	private static final String TYPE = "type";
	private static final String MSG = "msg";
	private static final String KEY = "key";
	private static final String GROUP = "group";
	private static final String ERROR = "error";
	private static final String WARN = "warn";
	private static final String INFO = "info";

	private static final String CONFIGURATION_GROUP_NAMES = "configurationGroupNames";
	private static final String CONFIGURATION_KEYS = "configurationKeys";
	private static final String END_TIMED_EVENT = "endTimedEvent";
	private static final String SEND_GENERIC_EVENT = "sendGenericEvent";
	private static final String CONFIGURATION_AS_MAP = "configurationAsMap";
	private static final String CONFIGURATION_VALUE = "configurationValue";
	private static final String START_TIMED_EVENT = "startTimedEvent";
	private static final String FILE_VALUE = "fileValue";
	private static final String CONFIGURE_AGENT = "configureAgent";
	
	public static final String LOG_TAG = "App47PGPlugin";

	public boolean execute(String method, JSONArray args, CallbackContext callbackContext) throws JSONException {
		if (method.equals(START_TIMED_EVENT)) {
			String udid = handleStartTimedEvent(args);
			callbackContext.success(udid);
			return true;
		} 
		else if (method.equals(CONFIGURATION_VALUE)) {
			Object value = handleConfigurationValue(args);
			handleCallback(callbackContext, value);
			return true;
		} 
		else if (method.equals(CONFIGURATION_AS_MAP)) {
			Map<String, String> value = handleConfigurationAsMap(args);
			
			if (value != null) {
				handleCallback(callbackContext, new JSONObject(value));
			}
			else {
				handleCallback(callbackContext, null);
			}
			
			return true;
		} 
		else if (method.equals(CONFIGURATION_KEYS)) {
			Object value = handleConfigurationKeys(args);
			handleCallback(callbackContext, value);
			return true;
		} 
		else if (method.equals(CONFIGURATION_GROUP_NAMES)) {
			handleGroupNames(callbackContext);
			return true;
		} 
		else if (method.equals(FILE_VALUE)) {
			String value = handleFileValue(args);
			handleCallback(callbackContext, value);
			return true;
		} 
		else if(method.equals(CONFIGURE_AGENT)){
			handleConfigureAgent(args, callbackContext);
			return true;
		} 
		else {
			return handleActionWithCallback(method, args, callbackContext);
		}
	}

	private void handleConfigureAgent(JSONArray args, CallbackContext callbackContext) throws JSONException {
		EmbeddedAgent.configureAgentWithAppID(cordova.getActivity().getApplicationContext(), args.getString(0));
		
		SharedPreferences ref = PreferenceManager.getDefaultSharedPreferences(this.cordova.getActivity());
		Editor editor = ref.edit();
		editor.putString("configurationLoaded", "0");
        editor.commit();
		
		EmbeddedAgent.onResume(cordova.getActivity().getApplicationContext());
		handleCallback(callbackContext, "success");
	}

	private void handleGroupNames(CallbackContext callbackContext) {
		String[] value = EmbeddedAgent.configurationGroupNames();
		Collection<String> collection = new ArrayList<String>(
				Arrays.asList(value));
		handleCallback(callbackContext, new JSONArray(collection));
	}

	private void handleCallback(CallbackContext callbackContext, Object value) {
		if (value != null) {
			callbackContext.success(value.toString());
		} else {
			callbackContext.error("null value received");
		}
	}

	private boolean handleActionWithCallback(String method, JSONArray args,
			CallbackContext callbackContext) {
		if (execute(method, args)) {
			callbackContext.success();
			return true;
		} else {
			callbackContext.error("there was an error!");
			return false;
		}
	}

	public boolean execute(String methodToInvoke, JSONArray data) {
		try {
			if (methodToInvoke.equals(SEND_GENERIC_EVENT)) {
				return handleGenericEvent(data);
			} else if (methodToInvoke.equals(END_TIMED_EVENT)) {
				return handleEndTimedEvent(data);
			} else { // then it is log
				return handleLog(data);
			}
		} catch (JSONException e) {
			return false;
		}
	}

	private Map<String, String> handleConfigurationAsMap(JSONArray data)
			throws JSONException {
		JSONObject values = data.getJSONObject(0);
		String group = values.getString(GROUP);
		return EmbeddedAgent.configurationGroupAsMap(group);
	}

	private Object handleConfigurationKeys(JSONArray data) throws JSONException {
		JSONObject values = data.getJSONObject(0);
		String group = values.getString(GROUP);
		return EmbeddedAgent.allKeysForConfigurationGroup(group);
	}

	private Object handleConfigurationValue(JSONArray data)	throws JSONException {
		JSONObject values = data.getJSONObject(0);
		String group = values.getString(GROUP);
		String key = values.getString(KEY);
		return EmbeddedAgent.configurationObjectForKey(key, group);
	}
	
	private String handleFileValue(JSONArray data) throws JSONException {
		JSONObject values = data.getJSONObject(0);
		String group = values.getString(GROUP);
		String key = values.getString(KEY);
		try
		{
			byte[] fileContent = EmbeddedAgent.configurationFileForKey(key, group);
			if(fileContent != null)
			{
				String result = new String(fileContent, Charset.forName("UTF-8"));
				return  result;
			}
		}
		catch(Exception e)
		{
			
		}
		return  "";
	}
	
	private boolean handleEndTimedEvent(JSONArray data) throws JSONException {
		EmbeddedAgent.endTimedEvent(data.getString(0));
		return true;
	}

	private String handleStartTimedEvent(JSONArray data) throws JSONException {
		return EmbeddedAgent.startTimedEvent(data.getString(0));
	}

	private boolean handleLog(JSONArray data) throws JSONException {
		JSONObject values = data.getJSONObject(0);
		String logLevel = values.getString(TYPE);
		String message = values.getString(MSG);
		if (logLevel.equals(INFO)) {
			EmbeddedAgentLogger.info(message);
		} else if (logLevel.equals(WARN)) {
			EmbeddedAgentLogger.warn(message);
		} else if (logLevel.equals(ERROR)) {
			EmbeddedAgentLogger.error(message);
		} else { // debug
			EmbeddedAgentLogger.debug(message);
		}
		return true;
	}

	private boolean handleGenericEvent(JSONArray data) throws JSONException {
		EmbeddedAgent.sendEvent(data.getString(0));
		return true;
	}
}