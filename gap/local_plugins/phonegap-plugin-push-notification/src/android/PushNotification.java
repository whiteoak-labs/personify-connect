package net.dynagility.personify.plugin;

import android.app.Activity;
import android.app.NotificationManager;
import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.util.Log;

import com.google.android.gcm.GCMRegistrar;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * Created by ticook on 12/5/16.
 */
public class PushNotification extends CordovaPlugin {

    public static final String LOG_TAG = PushNotification.class.getName();
    //actions
    public static final String ACTION_REGISTER = "register";
    public static final String ACTION_GET_TOKEN = "get-token";
    public static final String ACTION_SEND_LOCAL = "send-local";
    public static final String ACTION_SET_ALIAS = "set-alias";
    //keys
    public static final String PREFERENCE_KEY = "gcm.push.preferences";
    public static final String SENDER_KEY = "gcm.sender.id";
    public static final String TOKEN_KEY = "gcm.push.token";
    public static final String ALIAS_KEY = "gcm.push.alias";
    public static final String REGISTRATION_KEY = "gcm.push.registration.id";

    private String alias = null;
    private String token = null;

    public PushNotification(){}

    protected void pluginInitialize() {
        this.token = PreferenceManager.getDefaultSharedPreferences(this.cordova.getActivity()).getString(TOKEN_KEY, token);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        boolean result = true;

        if(action == null || action.length() == 0) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.INVALID_ACTION, "Action is required!"));
            result = false;
        }
        else {

            if(ACTION_GET_TOKEN.equals(action)) {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, this.getToken()));
            }
            else if(ACTION_REGISTER.equals((action))) {
                String senderId = args.optString(0);
                if(senderId != null && senderId.length() > 0) {
                    register(senderId);
                    callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK));
                }
                else {
                    callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, "SenderID is required!"));
                    result = false;
                }
            }
            else if(ACTION_SEND_LOCAL.equals(action)) {
                //TODO implement?
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK));
            }
            else if(ACTION_SET_ALIAS.equals((action))) {
                String alias = args.optString(0);
                if(alias != null && alias.length() > 0) {
                    setAlias(alias);
                }
                else {
                    callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, "Alias is required!"));
                    result = false;
                }
            }
            else {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.INVALID_ACTION,
                        ("Action is required and should be one of these values +" + this.getActions())));
                result = false;
            }
        }

        return result;
    }

    public String getToken() {
        if(token == null || token.length() == 0) {
            token = PreferenceManager.getDefaultSharedPreferences(this.cordova.getActivity()).getString(TOKEN_KEY, null);
        }

        return token;
    }

    public String getAlias() {
        return alias;
    }

    public void onResume(boolean multitasking) {
        super.onResume(multitasking);
        final NotificationManager notificationManager = (NotificationManager) this.cordova.getActivity().getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.cancelAll();
    }

    private void setAlias(final String alias) {
        final Activity activity = this.cordova.getActivity();

        activity.runOnUiThread(new Runnable() {
            public void run() {
                Log.d(LOG_TAG, "Calling PushNotification.setToken(" + token + ")");
                SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(activity);

                if(alias == null || alias.length() == 0) {
                    PushNotification.this.alias = prefs.getString(ALIAS_KEY, alias);
                }
                else {
                    PushNotification.this.alias = alias;
                    prefs.edit().putString(ALIAS_KEY, alias).commit();
                }
            }
        });
    }

    private void register(final String senderId) {
        final Activity activity = this.cordova.getActivity();

        activity.runOnUiThread(new Runnable() {
            public void run() {
                Log.d(LOG_TAG, "Calling GCMRegistrar.checkDevice");
                GCMRegistrar.checkDevice(activity);

                Log.d(LOG_TAG, "Calling GCMRegistrar.checkManifest");
                GCMRegistrar.checkManifest(activity);

                final String regId = GCMRegistrar.getRegistrationId(activity);

                Log.d(LOG_TAG, "Registering [" + regId + "] with senderID [" + senderId + ']');
                if (regId == null || regId.length() == 0) {
                    Log.d(LOG_TAG, "Calling GCMRegistrar.register");
                    PreferenceManager.getDefaultSharedPreferences(activity)
                            .edit()
                            .putString(SENDER_KEY, senderId)
                            .commit();
                    GCMRegistrar.register(activity, new String[]{senderId});
                } else {
                    Log.v(LOG_TAG, "Already registered for push notifications");
                }
            }
        });
    }

    private String[] getActions() {
        return new String[] {ACTION_SET_ALIAS, ACTION_REGISTER, ACTION_SEND_LOCAL, ACTION_GET_TOKEN};
    }
}
