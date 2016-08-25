package net.dynagility.personify.plugin;

import java.util.ArrayList;
import java.util.List;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONArray;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ResolveInfo;
import android.os.Parcelable;

public class Social extends CordovaPlugin 
{
    public final String AVAILABLE = "available";
    public final String SHARE = "share";
    private final String MMS_PACKAGE_NAME = "com.android.mms";
    private final String EMAIL_PACKAGE_NAME = "com.android.email";
    private final String GOOGLE_MAIL_PACKAGE_NAME = "com.google.android.gm";

    PluginResult result;
    
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) 
    {
    	Activity activity = this.cordova.getActivity();
    	
        try 
        {
            if (action.equals(AVAILABLE)) 
            {
                result = new PluginResult(Status.OK, "1");
            }
            else if (action.equals(SHARE)) {
                // [message, image, url]
                String message = (String) data.get(0);
                List<Intent> targetedShareIntents = new ArrayList<Intent>();
                Intent shareIntent = new Intent(android.content.Intent.ACTION_SEND);
                shareIntent.setType("text/plain");
                List<ResolveInfo> resInfo = activity.getPackageManager().queryIntentActivities(shareIntent, 0);
                
                if (!resInfo.isEmpty()) 
                {
                    for (ResolveInfo resolveInfo : resInfo) 
                    {
                        String packageName = resolveInfo.activityInfo.packageName;
                        Intent targetedShareIntent = null;
                        
                        if (packageName.equals(MMS_PACKAGE_NAME) || packageName.equals(EMAIL_PACKAGE_NAME)
                            || packageName.equals(GOOGLE_MAIL_PACKAGE_NAME) || packageName.contains("twitter")
                            || (!packageName.contains("facebook.katana") && packageName.contains("facebook"))) 
                        {
                            targetedShareIntent = new Intent(android.content.Intent.ACTION_SEND);
                            targetedShareIntent.setType("text/plain");
                            targetedShareIntent.putExtra(android.content.Intent.EXTRA_TEXT, message);
                            targetedShareIntent.setPackage(packageName);
                            targetedShareIntents.add(targetedShareIntent);
                        } 
                        else if (packageName.contains("facebook.katana")) {
//                        	targetedShareIntent = new Intent(activity, net.dynagility.personify.plugin.ShareOnFacebook.class);
//                        	targetedShareIntent.setType("text/plain");
//                            targetedShareIntent.putExtra("facebookContent", message);
//                            targetedShareIntents.add(targetedShareIntent);
                        }
                    }
                    
                    Intent chooserIntent = Intent.createChooser(targetedShareIntents.remove(0), "Select application to share");
                    chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS,targetedShareIntents.toArray(new Parcelable[] {}));
                    activity.startActivity(chooserIntent);
                }
            }
        } 
        catch(Exception e) {
            result = new PluginResult(Status.ERROR, e.getMessage());
        }
        
        callbackContext.sendPluginResult(result);
        return true;
    }
}
