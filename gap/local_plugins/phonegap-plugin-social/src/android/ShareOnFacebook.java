package net.dynagility.personify.plugin;

import org.apache.cordova.facebook.Feed;
import org.apache.cordova.facebook.Permissions;
import org.apache.cordova.facebook.SimpleFacebook;
import org.apache.cordova.facebook.SimpleFacebook.OnLoginListener;
import org.apache.cordova.facebook.SimpleFacebook.OnPublishListener;
import org.apache.cordova.facebook.SimpleFacebookConfiguration;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.res.Resources;
import android.os.Bundle;

public class ShareOnFacebook extends Activity {	
	private SimpleFacebook mSimpleFacebook;
	protected static final String TAG = ShareOnFacebook.class.getName();


	// Login listener
	private OnLoginListener mOnLoginListener = new OnLoginListener()
	{

		@Override
		public void onFail(String reason)
		{
			postFailed();
		}

		@Override
		public void onException(Throwable throwable)
		{
			postFailed();
		}

		@Override
		public void onThinking()
		{
		}

		@Override
		public void onLogin()
		{
			mSimpleFacebook.publish(mFeed, mOnPublishListener);
		}

		@Override
		public void onNotAcceptingPermissions()
		{
			postFailed();
		}
	};
	
	final OnPublishListener mOnPublishListener = new SimpleFacebook.OnPublishListener()
	{

		@Override
		public void onFail(String reason)
		{
			postFailed();
		}

		@Override
		public void onException(Throwable throwable)
		{
			postFailed();
		}

		@Override
		public void onThinking()
		{
		}

		@Override
		public void onComplete(String postId)
		{
			postSuccess();
		}
	};

	Feed mFeed = null;
	
	protected void postSuccess() {
		AlertDialog alert = new AlertDialog.Builder(ShareOnFacebook.this).create();
        alert.setTitle("Facebook");
        alert.setMessage("Posted to wall successfully");
        alert.setCancelMessage(null);

        alert.setButton("OK", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
            	finish();
            }
        });

        alert.show();
	}
	
	protected void postFailed() {
		AlertDialog alert = new AlertDialog.Builder(ShareOnFacebook.this).create();
        alert.setTitle("Facebook");
        alert.setMessage("Posted to wall failed");
        alert.setCancelMessage(null);

        alert.setButton("OK", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
            	finish();
            }
        });

        alert.show();
	}	
	
	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		mSimpleFacebook = SimpleFacebook.getInstance(this);
		
		Permissions[] permissions = new Permissions[]
		{
			Permissions.BASIC_INFO,
			Permissions.EMAIL,
			Permissions.USER_BIRTHDAY,
			Permissions.USER_PHOTOS,
			Permissions.PUBLISH_ACTION,
			Permissions.PUBLISH_STREAM
		};
		
		Resources resources = this.getResources();
		String appId = resources.getString(resources.getIdentifier("app_id", "string", this.getPackageName()));
		
		SimpleFacebookConfiguration configuration = new SimpleFacebookConfiguration.Builder()
			.setAppId(appId)
			.setPermissions(permissions)
			.build();
		
		SimpleFacebook.setConfiguration(configuration);
		
		String message = this.getIntent().getExtras().get("facebookContent").toString();
		String url = null;
		
		if (this.getIntent().getExtras().get("facebookUrl") != null) {
			url = this.getIntent().getExtras().get("facebookUrl").toString();
		}
		
		mFeed = new Feed.Builder()
		.setMessage(message)
		.build();
	}
	
	@Override
    protected void onStart()
	{
        super.onStart();
		mSimpleFacebook.login(mOnLoginListener);	
	}

	@Override
	protected void onResume()
	{
		super.onResume();
		mSimpleFacebook = SimpleFacebook.getInstance(this);
	}

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data)
	{
		mSimpleFacebook.onActivityResult(this, requestCode, resultCode, data);
		super.onActivityResult(requestCode, resultCode, data);
	}
}