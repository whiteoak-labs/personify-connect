//
//  PushNotification.h
//  FieldServiceMobile
//
//  Created by Timothy Cook on 11/23/16.
//
//

#import <CORDOVA/CDVPlugin.h>

@interface PushNotification : CDVPlugin
    -(void)getDeviceToken:(CDVInvokedUrlCommand*) command;
    -(void)notify:(CDVInvokedUrlCommand*) command;
    -(void)didRegisterForRemoteNotificationsWithDeviceToken:(NSData*) token;
    -(void)didFailToRegisterForRemoteNotificationsWithError:(NSError*) error;
    -(void)didReceiveRemoteNotification:(NSDictionary*) userInfo;

    @property (nonatomic, retain) NSString* token;
@end
