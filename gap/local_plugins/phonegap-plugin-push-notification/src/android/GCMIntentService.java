package net.dynagility.personify;

import com.google.android.gcm.GCMBaseIntentService;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.preference.PreferenceManager;
import android.util.Log;

import net.dynagility.personify.plugin.PushNotification;

public class GCMIntentService extends GCMBaseIntentService 
{
	private static final String LOG_TAG = GCMIntentService.class.getName();

	public static final String MSG_KEY = "msg";
	public static final String CALLBACK_KEY = "notification_callback";   
	public static final String CALLBACK_TYPE = "notification_type";
	public static final int GCM_RECEIVER_HIGHEST_PRIORITY = 1;

	protected void onMessage(Context context, Intent intent) {
		Log.d(LOG_TAG, "onMessage: Received PUSH message from Server!!", null);
		final String pushType = intent.getStringExtra("type");
		Log.d(LOG_TAG, "onMessage: Generating notification message for type [" + pushType + "]", null);
		createNotification(context, intent);
	}

	protected void onRegistered(Context context, String registeredId) {
		Log.i(LOG_TAG, "Registered with GCM [" + registeredId + "]", null);
		PreferenceManager.getDefaultSharedPreferences(context).edit()
				.putString(PushNotification.REGISTRATION_KEY, registeredId)
				.commit();
	}

	protected void onUnregistered(Context context, String registeredId) {
		Log.i(LOG_TAG, "Unregistered with GCM [" + registeredId + "]", null);
		PreferenceManager.getDefaultSharedPreferences(context)
				.edit()
				.remove(PushNotification.TOKEN_KEY)
				.commit();
	}

	protected String[] getSenderIds(Context context) {
		return new String[] {PreferenceManager.getDefaultSharedPreferences(context)
				.getString(PushNotification.SENDER_KEY, null)};
	}

	protected void onError(Context context, String error) {
		Log.d(LOG_TAG, "Google Cloud Messaging error encountered");
		
		if (error == "SERVICE_NOT_AVAILABLE") {
			Log.d(LOG_TAG, "SERVICE_NOT_AVAILABLE");
		} 
		else if (error == "ACCOUNT_MISSING") {
			Log.d(LOG_TAG, "ACCOUNT_MISSING");
		}
		else if (error == "AUTHENTICATION_FAILED") {
			Log.d(LOG_TAG, "AUTHENTICATION_FAILED");
		}
		else if (error == "TOO_MANY_REGISTRATIONS") {
			Log.d(LOG_TAG, "TOO_MANY_REGISTRATIONS");
		}
		else if (error == "INVALID_SENDER") {
			Log.d(LOG_TAG, "INVALID_SENDER");
		}
		else if (error == "PHONE_REGISTRATION_ERROR") {
			Log.d(LOG_TAG, "PHONE_REGISTRATION_ERROR");
		}

		Log.e(LOG_TAG, "GCM error encountered [" + error + "]", null);
	}

	/** A few overrides for logging to provide a view of the service's lifecycle */

	@Override
	public void onCreate() {
		Log.d(LOG_TAG, "onCreate");
		super.onCreate();
	}

	@Override
	public void onStart(Intent intent, int startId) {
		Log.d(LOG_TAG, "onStart");
		super.onStart(intent, startId);
	}

	@Override
	public int onStartCommand(Intent intent, int flags, int startId) {
		Log.d(LOG_TAG, "onStartCommand");
		return super.onStartCommand(intent, flags, startId);
	}

	@Override
	public void onDestroy() {
		Log.d(LOG_TAG, "onDestroy");
		super.onDestroy();
	}

	private void createNotification(Context context, Intent intent) {
		Log.i(LOG_TAG, "Creating notification");
//		final String pushType = intent.getStringExtra("type");
//		// Create pending intent for broadcast.
//	    Intent notificationIntent = new Intent(context, MainActivity.class);
//	    notificationIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
//	    notificationIntent.putExtra(CALLBACK_KEY, true);
//	    notificationIntent.putExtra(CALLBACK_TYPE, pushType);
//
//	    PendingIntent pendingIntent = PendingIntent.getActivity(context,
//	            (ITINERARY_CHANGED.equals(pushType) ? ITINERARY_CHANGED_ID : WORK_QUEUE_CHANGED_ID),
//	               notificationIntent, PendingIntent.FLAG_ONE_SHOT);
//
//		String msg = intent.getStringExtra("msg");
//		Notification notification = new Notification.Builder(context)
//				.setAutoCancel(true)
//				.setContentIntent(pendingIntent)
//				.setContentTitle(context.getString(resources.getIdentifier("fsm_app_name", "string", context.getPackageName())))
//				.setContentText(tickerText)
//				.setSmallIcon(R.drawable.icon)
//				.setWhen(System.currentTimeMillis()).build();
//
//		String sound = intent.getStringExtra("alertSound");
//		Uri alertSoundUri = getAlertSoundUri(context, sound, resources);
//
//		if ((sound == null || sound.length() = 0) || alertSoundUri == null) {
//			notification.defaults |= Notification.DEFAULT_SOUND;
//		}
//		else {
//			notification.sound = alertSoundUri;
//		}
//
//		NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
//
//		if (GCMIntentService.ITINERARY_CHANGED.equals(pushType)) {
//			notificationManager.notify(GCMIntentService.ITINERARY_CHANGED_ID, notification);
//		}
//		else {
//			notificationManager.notify(GCMIntentService.WORK_QUEUE_CHANGED_ID, notification);
//		}
	}

//	private Uri getAlertSoundUri(Context context, String alertSound, Resources resources) {
//		if (alertSound != null && alertSound.length() > 0) {
//			int resourceReference = getAlertResourceReference(alertSound, context, resources);
//			if (resourceReference != -1) {
//				String finalPath = ("android.resource://" + context.getPackageName() + "/" + resourceReference);
//				return Uri.parse(finalPath);
//			}
//		}
//
//		return null;
//	}
//
//	private int getAlertResourceReference(String alertSound, Context context, Resources resources) {
//		if (alertSound != null) {
//			if ("pager.mp3".equals(alertSound)) {
//				return resources.getIdentifier("pager", "raw", context.getPackageName());
//			}
//			else if ("pager2x.mp3".equals(alertSound)) {
//				return resources.getIdentifier("pager2x", "raw", context.getPackageName());
//			}
//			else if ("pager3x.mp3".equals(alertSound)) {
//				return resources.getIdentifier("pager3x", "raw", context.getPackageName());
//			}
//			else if ("pager10x.mp3".equals(alertSound)) {
//				return resources.getIdentifier("pager10x", "raw", context.getPackageName());
//			}
//		}
//
//		return -1;
//	}
}
