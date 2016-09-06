Ext.define('Personify.controller.tablet.schedule.ScheduleAndEventDetail', {
	extend : 'Personify.base.Controller',
	control : {
		eventListPage : {
			eventitemlistselect : 'onItemSelect',
			gotomyevent : 'onGoToMyEvent',
			removeagenda : 'getObjectDelectMeetingAgenda',
			copyagendalist : 'onCopyAgendaList'
		},
		complexeventPage : {
			backtoevent : 'onBackToEvent',
			refreshmyschedule : 'refreshMySchedule',
			updateagendalist : 'refreshMySchedule'
		},
		simpleEventPage : {
			backtoevent : 'onBackToEvent',
			refreshmyschedule : 'refreshMySchedule',
			updatemeetinglist : 'onUpdateEventList'
		},
		view : {
			painted : 'onPainted'
		}
	},

	init : function() {
		this.getSimpleEventPage().getController().setBackToEventButtonText('< Back to Schedule');
		this.getComplexeventPage().getController().setBackToEventButtonText('< Back to Schedule');
		this.getView().setMasked(false);
	},

	onPainted : function() {
		Ext.Viewport.setMasked(false);
	},

	onItemSelect : function(record) {
		var meetingID = record.get('meetingId');
		var me = this;
		if (record.get('type').toUpperCase() == 'PERSONAL') {
			me.openPesonalMeetingView(record);
		} else {
           var storeSchedule = Ext.getStore('scheduleListtingMain');
           if (storeSchedule && storeSchedule.getCount()>0 && storeSchedule.getAt(0).get('productID') == meetingID) {
                me.gotoMeetingDetail(storeSchedule.getAt(0), record);
           }
           else
            {
                var store = Ext.getStore('meetingListtingMain');
           
                if (store) {
                    var noMeetingFound = true;
                    store.each(function(recordEvent) {
                        if (recordEvent.get('productID') == meetingID) {
                            noMeetingFound = false;
                            me.gotoMeetingDetail(recordEvent, record);
                        }
                    });
           
                if (noMeetingFound) {
                    me.downloadSelectedEvent(record, meetingID);
                }
           }
           else
           {
                me.downloadSelectedEvent(record,meetingID);
           }
           }
		}
	},
    downloadSelectedEvent: function(record, meetingID)
    {
        if (!navigator.onLine) {
           Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
           return;
        }
        Ext.Viewport.setMasked({xtype : 'loadmask',message : 'Loading...'});
        var me = this;
        var currentUser = Personify.utils.Configuration.getCurrentUser();
        var attributes = {
           IsStaffMember: currentUser? currentUser.isStaffMember().toString() : false,
           IsMember: true,
           FromMonth: '-6',
           ToMonth: '12',
           OrgID: currentUser.get('organizationId'),
           OrgUnitID:  currentUser.get('organizationUnitId'),
           MasterCustomerID: (currentUser && currentUser.isLogged())? currentUser.get('masterCustomerId'): '' ,
           SubCustomerID:(currentUser && currentUser.isLogged())? currentUser.get('subCustomerId'): '0',
           StartIndex: 1,
           ItemsPerPage: 1,
           MeetingID: meetingID
        };
           
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var iCalendarStoreName = storeManager.getICalendarStore();
        var iCalStore = Ext.create(iCalendarStoreName);
        var scheduleListStore = storeManager.getEventListStore();
        var scheduleStore = Ext.create(scheduleListStore);
        scheduleStore.setStoreId('scheduleListtingMain');
        var agendaStore = Ext.getStore('agendaStoreListMain');
           
        iCalStore.setDataRequest(attributes);
        iCalStore.load({
            callback: function(records, operation, success) {
                if(success){
                    if(iCalStore && iCalStore.getAt(0).EventListStore && iCalStore.getAt(0).EventListStore.getCount()>0)
                    {
                        var evenrRecord =iCalStore.getAt(0).EventListStore.getAt(0);
                        if (agendaStore) {
                            for (var i = 0; i < agendaStore.getCount(); i++) {
                                var recordAgenda = agendaStore.getAt(i);
                                if (recordAgenda.get('type') != 'PERSONAL') {
                                    if (!recordAgenda.get('sessionID') || recordAgenda.get('sessionID') == "" || recordAgenda.get('sessionID') == "0") {
                                        if (recordAgenda.get('meetingId') == evenrRecord.get('productID')) {
                                            if (!evenrRecord.get('appointmentId') || evenrRecord.get('appointmentId') == '') {
                                                evenrRecord.set('appointmentId', recordAgenda.get('appointmentId'));
                                            }
                                            if (!evenrRecord.get('isAdded')) {
                                                evenrRecord.set('isAdded', true);
                                            }
                                            break;
                                        }
                                    }
                                }
                            };
                        }
                        scheduleStore.add(evenrRecord);
                        me.gotoMeetingDetail(scheduleStore.getAt(0), record);
                    }
                    else
                    {
                        Ext.Msg.alert('', 'Cannot find associated meeting, please help to report this problem.');
                    }
                }                
            }
        });
    },
	onBackToEvent : function() {
		var me = this;
		this.getView().setActiveItem(0);
		var eventPanel = me.getView();

		if (!this.getView().getActiveItem().getController()['getExpandEvent']) {
			return;
		}

		var eventPanelViewController = eventPanel.getActiveItem().getController(), itemExpanded = eventPanelViewController.getExpandEvent(), eventRecord = eventPanelViewController.getEventRecord(), index = 0;

		eventPanelViewController.setFlagSelected(false);
		eventPanelViewController.setItemSelected(false);

		if (itemExpanded != null) {
			for (var item in eventRecord) {
				if (index === itemExpanded) {

					setTimeout(function() {
						Ext.Viewport.setMasked({
							xtype : 'loadmask',
							message : 'Loading...'
						});

						if (Ext.get(eventPanelViewController.getSelectScheduleItem().getViewItems()[index].id.trim()).down('.p-filter-button-new')) {
							eventPanelViewController.getSelectScheduleItem().select(eventRecord[item]);
						}

						Ext.Viewport.setMasked(false);
					}, 100);
					break;
				}
				index++;
			}
		}

		this.getView().fireEvent('updatetitle', 'My Schedule', 'schedulemenuitem', true);
	},

	refreshMySchedule : function() {
		this.getEventListPage().refresh();
		this.getEventListPage().getController().combineFilter();
	},
	onGoToMyEvent : function() {
		this.getView().fireEvent('requestchangeview', 'Personify.view.EventAndEventDetail', null, 'Events', 'eventmenuitem');
	},

	refreshData : function() {
		this.getEventListPage().refresh();
		this.getComplexeventPage().refresh();
		this.getSimpleEventPage().refresh();
	},

	gotoMeetingDetail : function(recordEvent, record) {
		var isConference = recordEvent.get('isConference');
		var activity = isConference ? 1 : 2;
		if (isConference) {
			var clsLoadMask = '';
			/* var temp = recordEvent.data.shortName.toLowerCase();

			 if (temp.indexOf('july week-end retreat') == 0 || temp.indexOf('tma resources annual users group 2013') == 0){
			 if (Ext.Viewport.getOrientation() == 'landscape') {
			 clsLoadMask = 'p-loading-special-events-landscape';
			 } else {
			 clsLoadMask = 'p-loading-special-events-portrait';
			 }
			 } else {*/
			if (Ext.Viewport.getOrientation() == 'landscape') {
				clsLoadMask = 'p-loading-normal-events-landscape';
			} else {
				clsLoadMask = 'p-loading-normal-events-portrait';
			}
			/*}*/

			var mask = {
				xtype : 'loadmask',
				message : 'Loading..',
				fullscreen : true,
				centered : true,
				cls : clsLoadMask
			};
            Ext.Viewport.setMasked(false);
            if(Ext.Viewport.getMasked().getHidden())
            {
                Ext.Viewport.setMasked(mask);
            }
			var me = this;

			Ext.callback(function() {
				me.getComplexeventPage().setRecord(recordEvent);
				me.getComplexeventPage().getController().setCountLoad(0);

				if (recordEvent.get('isAdded')) {
					if (!record.get('sessionID') || record.get('sessionID') == '' || record.get('sessionID') == '0') {
						me.getComplexeventPage().getController().getAllDataOfChild(recordEvent, 'sessionsAndDetail');
					} else {
						me.getComplexeventPage().getController().getAllDataOfChildAndGoToSession(recordEvent, 'sessionsAndDetail', record);
					}
				} else {
					me.getComplexeventPage().getController().getAllDataOfChildAndGoToSession(recordEvent, 'sessionsAndDetail', record);
				}
			}, me, [], 1);
		} else {
			this.getSimpleEventPage().setRecord(recordEvent);
			this.getSimpleEventPage().getController().initView();
		}
		this.getView().setActiveItem(activity);
		this.getView().fireEvent('updatetitle', recordEvent.get('shortName'));
	},

	openPesonalMeetingView : function(record) {
		var me = this;
		var panel = Ext.Viewport.add([{
			xtype : 'personalagenda',
			record : record,
			listeners : {
				removeagenda : function(record, msgSuccess) {
					me.getObjectDelectMeetingAgenda(record, msgSuccess);
				}
			}
		}]);
		panel.show();
	},

	getObjectDelectMeetingAgenda : function(record, msgSuccess) {
        if (!navigator.onLine) {
           Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
           return;
        }
		Ext.Viewport.setMasked({
			xtype : 'loadmask'
		});
		var me = this;
		var proxy = {
			type : 'ajax',
			method : 'GET',
			url : Personify.utils.ServiceManager.getUrlWS('eventGetDeleteMeetingAgenda') + record.get('appointmentId'),
			headers : Personify.utils.ServiceManager.getHeaders(),
			reader : {
				type : 'json',
				rootProperty : 'd'
			}
		}
		var storeManager = Personify.utils.ServiceManager.getStoreManager();
		var customerMeetingAgendaStoreName = storeManager.getObjectDeleteMeetingAgenda();
		var customerMeetingAgenda = Ext.create(customerMeetingAgendaStoreName);
		customerMeetingAgenda.setProxy(proxy);
		customerMeetingAgenda.load({
			callback : function(records, operation, success) {
				if (records.length > 0) {
					var currentUser = Personify.utils.Configuration.getCurrentUser();
					var recordsResponse = records[0];
					var attributes = {
						"EntityGUID" : recordsResponse.get('entityGUID'),
						"AppointmentId" : recordsResponse.get('appointmentId'),
						"OrganizationId" : recordsResponse.get('organizationId'),
						"OrganizationUnitId" : recordsResponse.get('organizationUnitId'),
						"MasterCustomerId" : currentUser.get('masterCustomerId'),
						"SubCustomerId" : currentUser.get('subCustomerId'),
						"AddedBy" : recordsResponse.get('addedBy'),
						"ChangedBy" : recordsResponse.get('changedBy'),
						"AddedOn" : Personify.utils.ItemUtil.formatDateMSMySchedule(recordsResponse.get('addedOn')),
						"AppointmentDescription" : record.get('description'),
						"AppointmentEndDateTime" : Personify.utils.ItemUtil.formatDateTimeSession(record.get('endDateTime')),
						"AppointmentStartDateTime" : Personify.utils.ItemUtil.formatDateTimeSession(record.get('startDateTime')),
						"AppointmentTitle" : record.get('title'),
						"AppointmentTypeCodeString" : "Meeting",
						"AvailableToOrders" : recordsResponse.get('availableToOrders'),
						"ChangedBy" : "",
						"ChangedOn" : Ext.Date.format(new Date(), "c"),
						"ConcurrencyId" : recordsResponse.get('concurrencyId'),
						"MeetingParentProductCode" : "",
						"MeetingProductCode" : "",
						"MeetingProductId" : record.get('meetingId'),
						"SessionFee" : record.get('price'),
						"sessionLocation" : record.get('location'),
						"SessionParentProductCode" : "",
						"SessionProductCode" : "",
						"SessionProductId" : record.get('sessionID'),
						"SessionTrackCode" : "",
						"SessionTypeCode" : "",
						"SpeakerName" : ""
					}
					me.saveDeleteMeetingAgenda(attributes, record, msgSuccess);
				} else {
					Ext.Msg.alert('', 'Cannot get agenda information to delete.');
					Ext.Viewport.setMasked(false);
				}
			},
			scope : this
		});
	},

	saveDeleteMeetingAgenda : function(attributes, record, msgSuccess) {

		var me = this;
		var storeManager = Personify.utils.ServiceManager.getStoreManager();
		var saveMeetingAgendaStoreName = storeManager.getSaveDeleteMeetingAgenda();
		var customerMeetingAgenda = Ext.create(saveMeetingAgendaStoreName);
		customerMeetingAgenda.setDataRequest(attributes);
		customerMeetingAgenda.load({
			callback : function(records, operation, success) {
				if (success) {
					if (record.get('meetingId') && record.get('meetingId') != "") {
						var meetingId = record.get('meetingId');
                                   
						if (me.getEventListPage().getRecord()) {
                            var meetingRecord = null;
                            var storeSchedule = Ext.getStore('scheduleListtingMain');
                            if (storeSchedule && storeSchedule.getCount()>0 && storeSchedule.getAt(0).get('productID') == meetingId) {
                                meetingRecord = storeSchedule.getAt(0);
                            }
                            else
                            {
                                var eventListStore = Ext.getStore('meetingListtingMain');
							
                                for (var i = 0; i < eventListStore.getCount(); i++) {
                                   if (eventListStore.getAt(i).get('productID') == meetingId) {
                                        meetingRecord = eventListStore.getAt(i);
                                        break;
                                   }
                                }
                            }
                            if(meetingRecord)
                            {
                                if (record.get('sessionID') && record.get('sessionID') != "" && record.get('sessionID') != "0") {
                                   var sessionID = record.get('sessionID');
                                   var sessionStore = meetingRecord.SessionStore;

                                   if (sessionStore) {
                                        for (var i = 0; i < sessionStore.getCount(); i++) {
                                            if (sessionStore.getAt(i).get('sessionID') == sessionID) {
                                                sessionStore.getAt(i).set('isAdded', false);
                                                break;
                                            }
                                        }

                                        Ext.Msg.alert('', msgSuccess);
                                   } else {
                                        /*me.onGetSesstionListData(meetingRecord, sessionID).then({
                                            success : function(tempSessionStore) {
                                                meetingRecord.SessionStore = tempSessionStore;

                                                for (var i = 0; i < tempSessionStore.getCount(); i++) {
                                                    if (tempSessionStore.getAt(i).get('sessionID') == sessionID) {
                                                        tempSessionStore.getAt(i).set('isAdded', false);
                                                        break;
                                                    }
                                                }

                                                Ext.Msg.alert('', msgSuccess);
                                            },
                                            failure : function() {
                                                Ext.Msg.alert('', 'Error occurred while deleting agenda.');
                                            }
                                        });*/
                                        Ext.Msg.alert('', msgSuccess);
                                   }
                                   me.getEventListPage().refresh();
                                } else {
                                   if (meetingRecord) {
                                        meetingRecord.set('isAdded', false);
                                   }
                                   me.getEventListPage().refresh();
                                   Ext.Msg.alert('', msgSuccess);
                                }
                            }
                            else
                            {
                                me.getEventListPage().refresh();
                                Ext.Msg.alert('', msgSuccess);
                            }
						} else {
							Ext.Msg.alert('', 'Error occurred while deleting agenda.');
						}
					} else {
						Ext.Msg.alert('', 'Error occurred while deleting agenda.');
					}
				} else {
					Ext.Msg.alert('', 'Error occurred while deleting agenda.');
				}
				Ext.Viewport.setMasked(false);
			},
			scope : this
		})
	},

	onUpdateEventList : function() {
		this.getView().getParent().fireEvent('updatemeetinglist');
	},

	onCopyAgendaList : function(store) {
		this.getView().getParent().fireEvent('copyagendalist', store);
	},

	onGetSesstionListData : function(record, sessionID) {

		var deferred = Ext.create('Deft.promise.Deferred');
		var currentUser = Personify.utils.Configuration.getCurrentUser();
		var attributes = {
			"MeetingID" : record.get('productID'),
			"IsStaffMember" : currentUser ? currentUser.isStaffMember().toString() : false,
			"IsMember" : currentUser ? currentUser.isMember().toString() : false,
			"ItemsPerPage" : "10000",
			"StartIndex" : "1",
			"SessionDate" : "",
//           "SessionID" : sessionID
		};

		var storeManager = Personify.utils.ServiceManager.getStoreManager();
		var storeSessionName = storeManager.getSessionListStore();
		var storeListSession = Ext.create(storeSessionName);
		storeListSession.setDataRequest(attributes);
		storeListSession.load({
			scope : me,
			callback : function(records, operation, success) {
				if (records.length > 0) {
					record.SessionStore = Ext.create(storeManager.getSessionStore());
					record.SessionDatesStore = records[0].SessionDatesStore;
					var storeSession = records[0].SessionStore;
					deferred.resolve(storeSession);
				} else {
					deferred.reject();
				}
				me.removeMask();
			}
		});

		return deferred.promise;
	}
});
