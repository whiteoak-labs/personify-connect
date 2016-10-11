//
//  calendarPlugin.m
//  Author: Felix Montanez
//  Date: 01-17-2011
//  Notes: 


#import "calendarPlugin.h"
#import <EventKitUI/EventKitUI.h>
#import <EventKit/EventKit.h>

@interface calendarPlugin ()

- (void)createEventInStore:(EKEventStore *)store command:(CDVInvokedUrlCommand*)command;

@end

@implementation calendarPlugin
@synthesize eventStore;
@synthesize defaultCalendar;

-(void)createEvent:(CDVInvokedUrlCommand*)command
{
    //NSArray *arguments = command.arguments;
    //NSDictionary *options = [arguments objectAtIndex:0];    //Get the Event store object
	if ([[[UIDevice currentDevice] systemVersion] compare:@"6.0" options:NSNumericSearch] == NSOrderedAscending) {
        EKEventStore *store = [[EKEventStore alloc] init];
        [self createEventInStore:store command:command];
	} else {
        if ([EKEventStore authorizationStatusForEntityType:EKEntityTypeEvent] == EKAuthorizationStatusNotDetermined) {
            EKEventStore *store = [[EKEventStore alloc] init];
            
            [store requestAccessToEntityType:EKEntityTypeEvent completion:^(BOOL granted, NSError *error) {
                if (granted) {
                    [self createEventInStore:store command:command];
                } else {
                    [self createEventInStore:nil command:command];
                }
            }];
        } else if ([EKEventStore authorizationStatusForEntityType:EKEntityTypeEvent] == EKAuthorizationStatusAuthorized) {
            EKEventStore *store = [[EKEventStore alloc] init];
            [self createEventInStore:store command:command];
        } else {
            [self createEventInStore:nil command:command];        }
	}
}

- (void)createEventInStore:(EKEventStore *)store command:(CDVInvokedUrlCommand*)command;
{
    NSString* callbackID = command.callbackId;
    NSArray *arguments = command.arguments;
    NSDictionary *options = [arguments objectAtIndex:0];
	NSString* jsString = nil;
    CDVPluginResult* result = nil;

	if (!store) {
		result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ILLEGAL_ACCESS_EXCEPTION];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        return;
	}
	
    EKEvent *myEvent = [EKEvent eventWithEventStore: store];
    
	NSDictionary *eventInfo = options;
	
    NSString* title         = [eventInfo objectForKey:@"title"];
    NSString* location      = [eventInfo objectForKey:@"location"];
    NSString* message       = [eventInfo objectForKey:@"body"];
    NSString* startDate     = [eventInfo objectForKey:@"startDate"];
    NSString* endDate       = [eventInfo objectForKey:@"endDate"];
    NSString* calendarTitle = [eventInfo objectForKey:@"calendarName"];
    
    EKCalendar* calendar = nil;
    if(calendarTitle == nil){
        calendar = store.defaultCalendarForNewEvents;
    } else {
        NSIndexSet* indexes = [[store calendarsForEntityType:EKEntityTypeEvent] indexesOfObjectsPassingTest:^BOOL(id obj, NSUInteger idx, BOOL *stop) {
            *stop = false;
            EKCalendar* cal = (EKCalendar*)obj;
            if(cal.title == calendarTitle){
                *stop = true;
            }
            return *stop;
        }];
        if (indexes.count == 0) {
            calendar = store.defaultCalendarForNewEvents;
        } else {
            calendar = [[store calendarsForEntityType:EKEntityTypeEvent] objectAtIndex:[indexes firstIndex]];
        }
    }
    
    //creating the dateformatter object
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ss"];
    NSDateFormatter *dateFormatterWithTimeZone = [[NSDateFormatter alloc] init];
    [dateFormatterWithTimeZone setDateFormat:@"yyyy-MM-dd'T'HH:mm:ssZZZZZ"];
    
    NSDate *myStartDate = [dateFormatterWithTimeZone dateFromString:startDate];
    
    if (!myStartDate) {
        myStartDate = [dateFormatter dateFromString:startDate];
    }
    
    
    NSDate *myEndDate = [dateFormatterWithTimeZone dateFromString:endDate];
    
    if (!myEndDate) {
        myEndDate = [dateFormatter dateFromString:endDate];
    }
    
    
    myEvent.title = title;
    myEvent.location = location;
    myEvent.notes = message;
    myEvent.startDate = myStartDate;
    myEvent.endDate = myEndDate;
    myEvent.calendar = calendar;
    
    
    EKAlarm *reminder = [EKAlarm alarmWithRelativeOffset:-2*60*60];
    
    [myEvent addAlarm:reminder];
    
    NSError *error;
    BOOL saved = [store saveEvent:myEvent span:EKSpanThisEvent error:&error];
	
    if (saved) {
		result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    } else {
		result = [CDVPluginResult resultWithStatus:CDVCommandStatus_IO_EXCEPTION];
	}
	
	[self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

/***** NOT YET IMPLEMENTED BELOW ************/

//-(void)deleteEvent:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options {}

/*
-(void)findEvent:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options {
 
 EKEventStore* store = [[EKEventStore alloc] init];
 EKEvent* myEvent = [EKEvent eventWithEventStore: store];
 
 NSString *startSearchDate  = [arguments objectAtIndex:1];
 NSString *endSearchDate    = [arguments objectAtIndex:2];
 
 
 //creating the dateformatter object
 NSDateFormatter *sDate = [[[NSDateFormatter alloc] init] autorelease];
 [sDate setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
 NSDate *myStartDate = [sDate dateFromString:startSearchDate];
 
 
 NSDateFormatter *eDate = [[[NSDateFormatter alloc] init] autorelease];
 [eDate setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
 NSDate *myEndDate = [eDate dateFromString:endSearchDate];
 
 
 // Create the predicate
 NSPredicate *predicate = [eventStore predicateForEventsWithStartDate:myStartDate endDate:myEndDate calendars:defaultCalendar]; 
 
 
 // eventStore is an instance variable.
 // Fetch all events that match the predicate.
 NSArray *events = [eventStore eventsMatchingPredicate:predicate];
 [self setEvents:events];
 
 
}
 */

-(void)getCalendarList:(CDVInvokedUrlCommand*)command
{
    NSString* callbackID = command.callbackId;
   // NSArray *arguments = command.arguments;
    //NSDictionary *options = [arguments objectAtIndex:0];
   // NSString *callback = [arguments objectAtIndex:0];
    EKEventStore* store = [[EKEventStore alloc] init];
    NSString* js = nil;
    CDVPluginResult* pluginResult;
    
    NSArray *calendars = [store calendarsForEntityType:EKEntityTypeEvent];
	
    if (store != nil && calendars.count > 0) {
        NSMutableArray *titles = [[calendars valueForKey:@"title"] mutableCopy];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:titles];
        
    }
    else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"no calendars found"];
    }
	
	[self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}
 
 
/*-(void)modifyEvent:(NSMutableArray *)arguments withDict:(NSMutableDictionary *)options{
 EKEventViewController *eventViewController = [[EKEventViewController alloc] init];
 eventViewController.event = myEvent;
 eventViewController.allowsEditing = YES;
 navigationController we
= [[UINavigationController alloc]
 initWithRootViewController:eventViewController];
 [eventViewController release];
} */


//delegate method for EKEventEditViewDelegate
-(void)eventEditViewController:(EKEventEditViewController *)controller didCompleteWithAction:(EKEventEditViewAction)action {
    [(UIViewController*)self dismissViewControllerAnimated:YES completion:nil];
}
@end
