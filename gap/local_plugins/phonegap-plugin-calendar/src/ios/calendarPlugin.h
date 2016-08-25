//
//  calendarPlugin.h
//  Author: Felix Montanez
//  Date: 01-17-2011
//  Notes:
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>
#import <EventKitUI/EventKitUI.h>
#import <EventKit/EventKit.h>


@interface calendarPlugin : CDVPlugin <EKEventEditViewDelegate> {
    
	EKEventStore *eventStore;
    EKCalendar *defaultCalendar;
    //NSArray *events;
    
    //future plan to have global type variables
    
    
}

@property (nonatomic,retain) EKEventStore *eventStore;
@property (nonatomic,retain) EKCalendar *defaultCalendar;

//-(NSArray *)fetchEvents;

// Calendar Instance methods
- (void)createEvent:(CDVInvokedUrlCommand*)command;
- (void)getCalendarList:(CDVInvokedUrlCommand*)command;
//- (void)modifyEvent:(CDVInvokedUrlCommand*)command;

//- (void)findEvent:(CDVInvokedUrlCommand*)command;

//- (void)deleteEvent:(CDVInvokedUrlCommand*)command;

@end