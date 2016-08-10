#import "AppDelegate+App47.h"
#import <objc/runtime.h>
#import "EmbeddedAgent.h"
#import "SSZipArchive.h"
#import <CoreFoundation/CoreFoundation.h>

@implementation AppDelegate(notification)

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
    NSHTTPCookieStorage* cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
        
    [cookieStorage setCookieAcceptPolicy:NSHTTPCookieAcceptPolicyAlways];
        
    int cacheSizeMemory = 8 * 1024 * 1024; // 8MB
    int cacheSizeDisk = 32 * 1024 * 1024; // 32MB
    
    #if __has_feature(objc_arc)
        NSURLCache* sharedCache = [[NSURLCache alloc] initWithMemoryCapacity:cacheSizeMemory diskCapacity:cacheSizeDisk diskPath:@"nsurlcache"];
    #else
        NSURLCache* sharedCache = [[[NSURLCache alloc] initWithMemoryCapacity:cacheSizeMemory diskCapacity:cacheSizeDisk diskPath:@"nsurlcache"] autorelease];
    #endif
        [NSURLCache setSharedURLCache:sharedCache];

        return [self custom_init];
}

- (BOOL)customApplication:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions 
{	
	NSLog(@"%@ %@", [self class], NSStringFromSelector(_cmd));
	    
	[[NSUserDefaults standardUserDefaults] setBool:NO forKey:@"configurationUpdated"];
    [[NSUserDefaults standardUserDefaults] synchronize];
    NSString *appId = [[NSUserDefaults standardUserDefaults] stringForKey:@"app47Id"];
	    
    if (!appId || [appId isEqualToString:@""]) {
    	[EmbeddedAgent configureAgent];
	} 
    else {
        [EmbeddedAgent configureAgentWithAppID:appId];
    }
	    
    [EmbeddedAgent InstallExceptionHandlers];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(configurationFinished:) name:EmbeddedAgentAppConfigurationUpdateDidFinish object:nil];    
	[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(configurationUpdated:) name:EmbeddedAgentAppConfigurationGroupDidChange object:nil];

	[self customApplication:application didFinishLaunchingWithOptions:launchOptions];
	return YES;
}

- (void)configurationFinished:(NSNotification *)notification
{
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *documentsDirectory = [paths objectAtIndex:0];
    NSData *resourcesData = [EmbeddedAgent configurationFileForKey:@"resources-url" group:@"Stylesheet"];
    
    if (resourcesData) {
        NSString *resourcesFilePath = [documentsDirectory stringByAppendingPathComponent:@"resources.zip"];
        [resourcesData writeToFile:resourcesFilePath atomically:YES];
        
        [SSZipArchive unzipFileAtPath:resourcesFilePath toDestination:documentsDirectory];
    }
    
    [[NSUserDefaults standardUserDefaults] setBool:YES forKey:@"configurationLoaded"];
    [[NSUserDefaults standardUserDefaults] synchronize];
    NSLog(@"App47: Configuration loaded");
}

- (void)configurationUpdated:(NSNotification *)notification
{
    NSLog(@"App47: Configuration updated");
    
    if ([[NSUserDefaults standardUserDefaults] boolForKey:@"configurationLoaded"]) {
        [[NSUserDefaults standardUserDefaults] setBool:YES forKey:@"configurationUpdated"];
        [[NSUserDefaults standardUserDefaults] synchronize];
    }
}

@end