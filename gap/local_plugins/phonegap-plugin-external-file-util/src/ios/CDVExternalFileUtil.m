//
//  CDVOpenWith.m
//  OpenWith
//
//  Created by Andrew Trice on 8/15/12.
//
//  THIS SOFTWARE IS PROVIDED BY ANDREW TRICE "AS IS" AND ANY EXPRESS OR
//  IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
//  MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
//  EVENT SHALL ANDREW TRICE OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
//  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
//  BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
//  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
//  OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
//  ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//

#import "CDVExternalFileUtil.h"

@implementation CDVExternalFileUtil


- (void) openWith:(CDVInvokedUrlCommand*)command
{
    NSString* callbackID = command.callbackId;
    NSArray *arguments = command.arguments;
    NSDictionary *options = [arguments objectAtIndex:0];
    CDVPluginResult* pluginResult;
    //NSString* callbackID = [arguments pop];
    [callbackID retain];
    
    NSString *path = [arguments objectAtIndex:0];
    [path retain];
    
    NSString *uti = [arguments objectAtIndex:1];
    [uti retain];    
    
    // Get file again from Documents directory
    NSURL *fileURL = [NSURL fileURLWithPath:path];
    
    UIDocumentInteractionController *controller = [UIDocumentInteractionController  interactionControllerWithURL:fileURL];
    [controller retain];
    controller.delegate = self;
    controller.UTI = uti;
    
    CDVViewController* cont = (CDVViewController*)[ super viewController ];
    
    CGRect screenSize = [[UIScreen mainScreen] bounds];
    CGRect rectPortrait = CGRectMake(screenSize.size.width/2 - 150, screenSize.size.height/2 + 150, 300, 300);
    CGRect rectLandcape = CGRectMake(screenSize.size.width/2, screenSize.size.height/2, 300, 300);
    
    UIInterfaceOrientation orientation = [[UIApplication sharedApplication] statusBarOrientation];
    
    if ((orientation == UIDeviceOrientationPortrait) || (orientation == UIDeviceOrientationPortraitUpsideDown)) {
        [controller presentOptionsMenuFromRect:rectPortrait inView:cont.view animated:YES];
    } else {
        [controller presentOptionsMenuFromRect:rectLandcape inView:cont.view animated:YES];
    }

    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: @""];
    [self writeJavascript: [pluginResult toSuccessCallbackString:callbackID]];
    
    [callbackID release];
    [path release];
    [uti release];
}

- (void) documentInteractionControllerDidDismissOpenInMenu:(UIDocumentInteractionController *)controller {
    //NSLog(@"documentInteractionControllerDidDismissOpenInMenu");
    
    [self cleanupTempFile:controller];
}

- (void) documentInteractionController: (UIDocumentInteractionController *) controller didEndSendingToApplication: (NSString *) application {
    //NSLog(@"didEndSendingToApplication: %@", application);
    
    [self cleanupTempFile:controller];
}

- (void) cleanupTempFile: (UIDocumentInteractionController *) controller
{
    
    
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSError *error;
    BOOL fileExists = [fileManager fileExistsAtPath:localFile];
    
    //NSLog(@"Path to file: %@", localFile);
    //NSLog(@"File exists: %d", fileExists);
    //NSLog(@"Is deletable file at path: %d", [fileManager isDeletableFileAtPath:localFile]);
    
    if (fileExists)
    {
        BOOL success = [fileManager removeItemAtPath:localFile error:&error];
        if (!success) NSLog(@"Error: %@", [error localizedDescription]);
    }
    [localFile release];
    [controller release];
}

@end