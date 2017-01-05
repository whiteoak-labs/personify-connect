#import "AppDelegate+notification.h"
#import "PushNotification.h"
#import <objc/runtime.h>
#import <Security/Security.h>
#import <CoreFoundation/CoreFoundation.h>

@implementation AppDelegate(notification)

static const int blurViewTag = 8675309;

- (id) getCommandInstance:(NSString*)className
{
	return [self.viewController getCommandInstance:className];
}

//lets do a little swizzling
+ (void)load
{
    Method originalInit, customInit,
	       originalDidLaunchWithOptions, 
		   customDidLaunchWithOptions;
    //initialization
    originalInit = class_getInstanceMethod(self, @selector(init));
    customInit = class_getInstanceMethod(self, @selector(custom_init));
    method_exchangeImplementations(originalInit, customInit);
    //didFinishLauchingWithOptions
    originalDidLaunchWithOptions = class_getInstanceMethod(self, @selector(application:didFinishLaunchingWithOptions:));
    customDidLaunchWithOptions = class_getInstanceMethod(self, @selector(customApplication:didFinishLaunchingWithOptions:));
    method_exchangeImplementations(originalDidLaunchWithOptions, customDidLaunchWithOptions);
}

- (AppDelegate*)custom_init
{
    if ([[UIApplication sharedApplication] respondsToSelector:@selector(registerUserNotificationSettings:)]){
        [[UIApplication sharedApplication] registerUserNotificationSettings:[UIUserNotificationSettings settingsForTypes:(UIUserNotificationTypeSound | UIUserNotificationTypeAlert) categories:nil]];
        [[UIApplication sharedApplication] registerForRemoteNotifications];
    }
    else{
        [[UIApplication sharedApplication] registerForRemoteNotificationTypes:
         (UIUserNotificationTypeSound | UIUserNotificationTypeAlert)];
    }
    
    return [self custom_init];
}

- (BOOL)customApplication:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions {	
	PushNotification* push = [self getCommandInstance:@"PushNotification"];
	push.hostUrl = [launchOptions objectForKey:@"UIApplicationLaunchOptionsURLKey"];
    
	[self customApplication:application didFinishLaunchingWithOptions:launchOptions];
	return YES;
}

-(void) application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
	PushNotification* push = [self getCommandInstance:@"PushNotification"];
	[push didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
	PushNotification* push = [self getCommandInstance:@"PushNotification"];
	[push didFailToRegisterForRemoteNotificationsWithError:error];
}

-(void) application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
	PushNotification *push = [self getCommandInstance:@"PushNotification"];
	[push didReceiveRemoteNotification:userInfo];
}

// repost the localnotification using the default NSNotificationCenter so multiple plugins may respond
- (void)application:(UIApplication*)application didReceiveLocalNotification:(UILocalNotification*)notification
{
	// re-post ( broadcast )
	[[NSNotificationCenter defaultCenter] postNotificationName:CDVLocalNotification object:notification];
}

- (void)applicationWillResignActive:(UIApplication *)application {
    [self blurView];
}

- (void) applicationDidBecomeActive:(UIApplication *)application {
    [self unblurView];
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    [self unblurView];
}

- (void) blurView {
    if ([self.window viewWithTag:blurViewTag]){
        return;
    }
    
    [self.window addSubview:[self _blurView]];
}

- (void) unblurView {
    [[self.window viewWithTag:blurViewTag] removeFromSuperview];
}

- (UIView *) _blurView {
    
    UIView *snapshot = [self.window snapshotViewAfterScreenUpdates:NO];
    
    UIView *blurView = nil;
    
    if ([UIVisualEffectView class]){
        UIVisualEffectView *aView = [[UIVisualEffectView alloc]initWithEffect:[UIBlurEffect effectWithStyle:UIBlurEffectStyleExtraLight]];
        blurView = aView;
        blurView.frame = snapshot.bounds;
        [snapshot addSubview:aView];
    } else {
        UIToolbar *toolBar = [[UIToolbar alloc] initWithFrame:snapshot.bounds];
        toolBar.barStyle = UIBarStyleBlackTranslucent;
        [snapshot addSubview:toolBar];
    }
    
    
    snapshot.tag = blurViewTag;
    return snapshot;
}

@end