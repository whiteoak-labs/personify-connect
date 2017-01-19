//
//  PushNotication.m
//
//  Created by Timothy Cook on 11/23/2013.
//
//

#import "PushNotification.h"
#import "AppDelegate.h"
#import "Base64.h"
#import <Security/Security.h>
#import <SystemConfiguration/SystemConfiguration.h>

@implementation PushNotication

@synthesize token;

-(void) getDeviceToken:(CDVInvokedUrlCommand*)command
{
    NSLog(@"Entering PushNotication.getDeviceToken");
    CDVPluginResult* pluginResult = nil;

    if([self.token length] > 0){    	
        NSLog(@"PushNotication accessing device token");
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:self.token];
        NSLog(@"PushNotication sucessfully obtained device token %@", self.token);
    }
    else {
        NSLog(@"PushNotication.getDeviceToken token unavailable.");
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }

    NSLog(@"Exiting PushNotication.getDeviceToken");
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
};

-(void) notify:(CDVInvokedUrlCommand*)command
{
   NSLog(@"Entering PushNotication.notify");
   CDVPluginResult* pluginResult = nil;
   
   @try{
      NSString* alertMsg = [command.arguments objectAtIndex:0];

      pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
//    TODO determine what the notification should be.
//      UIApplication* app = [UIApplication sharedApplication];
//
//      NSDate *alertTime = [[NSDate date] dateByAddingTimeInterval:1];
//      UILocalNotification* notifyAlarm = [[UILocalNotification alloc] init];
//      if (notifyAlarm) {
//         notifyAlarm.fireDate = alertTime;
//         notifyAlarm.timeZone = [NSTimeZone defaultTimeZone];
//         notifyAlarm.repeatInterval = 0;
//         notifyAlarm.alertBody = alertMsg;
//         [app scheduleLocalNotification:notifyAlarm];
//      }
   }
   @catch (NSException* e) {
      NSLog(@"PushNotication.notify caught %@: %@", [e name], [e reason]);
      pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
   }
   
   NSLog(@"Exiting PushNotication.notify");
   [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
};

-(void)didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken 
{
	NSString* tok = [[deviceToken description] stringByTrimmingCharactersInSet: [NSCharacterSet characterSetWithCharactersInString:@"<>"]];
	self.token = [tok stringByReplacingOccurrencesOfString:@" " withString:@""];
}

-(void)didFailToRegisterForRemoteNotificationsWithError:(NSError *)error 
{
	//TODO Implement me.
}

-(void)didReceiveRemoteNotification:(NSDictionary *)userInfo 
{
//	TODO Need to determine what we need to do on receipt of notification.
//
//	UIApplication* application = [UIApplication sharedApplication];
//	NSString* playAudio = (application.applicationState == UIApplicationStateInactive) ? @"false" : @"true";
//	NSString* type = [userInfo objectForKey:@"type"];
//	NSMutableString* javascriptCallback = [NSMutableString stringWithString:@"$jsNotificationCallback("];
//    [javascriptCallback appendString:type];
//    [javascriptCallback appendString:@");"];
//    NSLog(@"javascript = %@", javascriptCallback);
//    [((UIWebView*) self.webView) stringByEvaluatingJavaScriptFromString: javascriptCallback];
}

@end
