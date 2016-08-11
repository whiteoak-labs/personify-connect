//
//  applicationPreferences.h
//  
//
//  Created by Tue Topholm on 31/01/11.
//  Copyright 2011 Sugee. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

@interface ApplicationPreferences : CDVPlugin

-	(void) getSetting:(CDVInvokedUrlCommand*)command;
-	(void) setSetting:(CDVInvokedUrlCommand*)command;
-	(void) getString:(CDVInvokedUrlCommand*)command;
-	(void) setString:(CDVInvokedUrlCommand*)command;
-	(NSString*) getSettingFromBundle:(NSString*)settingName;


@end
