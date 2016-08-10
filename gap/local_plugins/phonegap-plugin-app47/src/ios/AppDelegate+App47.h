#import "AppDelegate.h"

@interface AppDelegate (notification)
    - (BOOL)customApplication:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions;
    - (id) getCommandInstance:(NSString*)className;
@end
