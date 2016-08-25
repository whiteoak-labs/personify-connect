//
//  Social.m
//
//  Cameron Lerch
//  Sponsored by Brightflock: http://brightflock.com
//

#import "Social.h"
#import "REActivityViewController.h"

@interface Social ()

@end

@implementation Social

- (void)available:(CDVInvokedUrlCommand*)command
{
    NSString* callbackID = command.callbackId;
    NSArray *arguments = command.arguments;
    //NSDictionary *options = [arguments objectAtIndex:0];
    BOOL avail = true;
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:avail];
    [self writeJavascript:[pluginResult toSuccessCallbackString:callbackID]];
}

- (void)share:(CDVInvokedUrlCommand*)command
{
   // NSString* callbackID = command.callbackId;
    NSArray *arguments = command.arguments;
   // NSDictionary *options = [arguments objectAtIndex:0];
    REFacebookActivity *facebookActivity = [[REFacebookActivity alloc] init];
    RETwitterActivity *twitterActivity = [[RETwitterActivity alloc] init];
    REMessageActivity *messageActivity = [[REMessageActivity alloc] init];
    REMailActivity *mailActivity = [[REMailActivity alloc] init];
    
    NSArray *activities = @[mailActivity, messageActivity, facebookActivity, twitterActivity];
    
    REActivityViewController *activityViewController = [[REActivityViewController alloc] initWithViewController:self.viewController activities:activities];
    
    NSMutableDictionary *items = [NSMutableDictionary dictionary];
    NSString *text = [arguments objectAtIndex:0];
    [items setObject:text forKey:@"text"];
    
    NSString *imageName = [arguments objectAtIndex:1];
    UIImage *image = nil;
    
    if (imageName && ![imageName isEqualToString:@""]) {
        image = [UIImage imageNamed:imageName];
        
        if (image) {
            [items setObject:image forKey:@"image"];
        }
    }
    
    NSString *urlString = [arguments objectAtIndex:2];
    NSURL *url = nil;
    
    if (urlString && ![urlString isEqualToString:@""]) {
        url = [NSURL URLWithString:urlString];
        
        if (url) {
            [items setObject:url forKey:@"url"];
        }
    }

    activityViewController.userInfo = items;
    
    if (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad) {
        UIPopoverController *popoverController = [[UIPopoverController alloc] initWithContentViewController:activityViewController];
        activityViewController.presentingPopoverController = popoverController;
        CGRect screenSize = [[UIScreen mainScreen] bounds];
        
        UIInterfaceOrientation orientation = [[UIApplication sharedApplication] statusBarOrientation];
        
        if ((orientation == UIDeviceOrientationPortrait) || (orientation == UIDeviceOrientationPortraitUpsideDown)) {
            [popoverController presentPopoverFromRect:screenSize inView:self.viewController.view permittedArrowDirections:0 animated:YES];
        } else {
             [popoverController presentPopoverFromRect:CGRectMake(0, 0, screenSize.size.height, screenSize.size.width) inView:self.viewController.view permittedArrowDirections:0 animated:YES];
        }
    } else {
        [activityViewController presentFromRootViewController];
    }
}

@end
