package net.dynagility.personify.plugin;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.google.android.gcm.GCMBroadcastReceiver;
import static com.google.android.gcm.GCMConstants.DEFAULT_INTENT_SERVICE_CLASS_NAME;

public class SimpleGCMBroadcastReceiver extends GCMBroadcastReceiver {

	@Override
	protected String getGCMIntentServiceClassName(Context context) {
    	return "net.dynagility.personify" + DEFAULT_INTENT_SERVICE_CLASS_NAME;
    }
}