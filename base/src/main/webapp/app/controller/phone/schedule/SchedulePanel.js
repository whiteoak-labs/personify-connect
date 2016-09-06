Ext.define('Personify.controller.phone.schedule.SchedulePanel', {
	extend : 'Personify.base.Controller',

	config : {
		eventRecord : null,
		flagSelected : false,
		futureEvents : null,
		currentStore : null,
		itemSelected : false,
		expandEvent : null,
		indexExpandEvent : null,
		isSelectAll : false
	},

	control : {
		eventToolbar : {
			onNavigationButtonTap : 'onBack',
			actionButtonTap : 'addPersonalEvent'
		},
		searchField : {
			change : 'onTapSearchButton',
			clearicontap : 'onClearIconTap',
			keyup : 'onTapSearchButton',
		},
		selectScheduleItem : {
			removeitem : 'removeMyScheduleItem',
			eventitemtap : 'openMyScheduleItem',
			select : 'onSelectMyScheduleItem'
		},
		selectSchedulePanel : true,
		allEventButton : {
			tap : 'goToAllEvent'
		}
	},

	init : function() {
		this.getEventToolbar().getController().setActionText(' + Add');
	},

	updateRecordForSelectItems : function(scheduleStore) {
		var currentUser = Personify.utils.Configuration.getCurrentUser();
		var store = currentUser.getScheduleMonthStore(scheduleStore);
		this.getSelectScheduleItem().setStore(store);
		this.getSelectSchedulePanel().setStore(scheduleStore);
	},

	onGetData : function() {
		Ext.Viewport.setMasked({
			xtype : 'loadmask'
		});
		var me = this;

		Ext.callback(function() {
			var store = Ext.getStore('agendaStoreListMain');
			if (store && store.getCount() > 0) {
				var storeManager = Personify.utils.ServiceManager.getStoreManager();
				var agendaStoreName = storeManager.getAgendaStore();
				var agendaStore = Ext.create(agendaStoreName);
				store.each(function(record) {
					agendaStore.add(record);
				});
				me.updateRecordForSelectItems(agendaStore);
			} else {
				me.onUpdateMySchedule();
			}

			Ext.Viewport.setMasked(false);
		}, me, [], 1);
	},

	onUpdateMySchedule : function(isLogin) {
		var currentUser = Personify.utils.Configuration.getCurrentUser();
		if (currentUser && currentUser.isLogged()) {
			if (window.plugins.app47) {
				window.plugins.app47.sendGenericEvent('Agenda List');
			}

			var me = this;
			me.getView().setMasked({
				xtype : 'loadmask'
			});

			var attributes = {
				MasterCustomerID : currentUser ? currentUser.get('masterCustomerId') : '',
				SubCustomerID : currentUser ? currentUser.get('subCustomerId') : '',
				MeetingID : ''
			};

			var storeManager = Personify.utils.ServiceManager.getStoreManager();
			var agendaStoreName = storeManager.getAgendaStore();
			var store = Ext.create(agendaStoreName);
			var agendaStore = Ext.create(agendaStoreName);
			store.setDataRequest(attributes);
			store.setStoreId('agendaStoreListMain');
			store.load({
				callback : function(records, operation, success) {
					me.getView().setMasked(false);
					if (records.length > 0) {
						store.each(function(record) {
							agendaStore.add(record);
						});
					}

					me.updateRecordForSelectItems(agendaStore);
					me.getView().setMasked(false);
				},
				scope : this
			});
		}
	},

	onBack : function() {
		this.getView().fireEvent('backtomain', this);
	},

	onTapSearchButton : function(field, e) {
		var value = field.getValue().trim();
		var store = this.getSelectSchedulePanel().getStore();
		store.clearFilter();
		if (value != '') {
			store.filter(function(record) {
				didMatch = (record.get('title').trim().toLowerCase() + " " + record.get('description').trim().toLowerCase() + " " + record.get('type').trim().toLowerCase() + " " + record.get('speakerName').trim().toLowerCase()
				).match(value.trim().toLowerCase());

				if (record.eventData) {
					var speakers = record.eventData.SpeakersListEvent;
					speakers.each(function(speaker) {
						didMatch = didMatch || speaker.get('name').trim().toLowerCase().match(value.trim().toLowerCase());
					});
				}

				if (didMatch) {
					return record;
				}
			});
			this.updateRecordForSelectItems(store);
			this.setIsSelectAll(true);
			this.getSelectScheduleItem().selectAll();
			this.setIsSelectAll(false);
		}
	},

	addOrRemoveRecordToStore : function(records) {
		var store = this.getSelectSchedulePanel().getStore();
		store.removeAll();

		for (var i = 0; i < records.length; i++) {
			store.add(records[i]);
		}
		this.updateRecordForSelectItems(store);
		Ext.Viewport.setMasked(false);
	},

	addOrRemoveByMeetingRecord : function(record, add, records) {
		var me = this;
		me.addOrRemoveRecordToStore(records);
	},

	addPersonalEvent : function() {
		this.getView().fireEvent('requestopendetail', 'Personify.view.phone.addevent.AddEvent', null);
	},

	onClearIconTap : function() {
		var store = this.getSelectSchedulePanel().getStore();
		store.clearFilter();
		this.updateRecordForSelectItems(store);
	},

	removeItemsInnerSelectItem : function() {
		var viewItems = this.getSelectScheduleItem().getViewItems();

		for (var i = 0; i < viewItems.length; i++) {
			var viewItem = Ext.get(viewItems[i].id);

			if (viewItem.eventList) {
				viewItem.eventList.destroy();
				viewItem.eventList = null;
			}
		}
	},

	goToAllEvent : function() {
		this.getView().fireEvent('requestchangeview', 'Personify.view.phone.Event', null);
	},

	removeMyScheduleItem : function(record) {
		var me = this;
		if (!navigator.onLine) {
			Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
			return;
		}

		var message = Personify.utils.ItemUtil.getMessageMatchTypeOfEvent(record);

		Ext.Msg.confirm('', message.msg, processResult);
		function processResult(clickedButton) {
			Ext.Msg.hide();
			if (clickedButton == 'yes') {
				Ext.Viewport.setMasked(false);
				Ext.Viewport.setMasked({
					xtype : 'loadmask'
				});
				me.getView().fireEvent('removeagenda', record, function(success) {
					if (success) {
						me.getSelectSchedulePanel().getStore().remove(record);
						Ext.Msg.alert('', message.msgSuccess, Ext.emptyFn);
						Ext.Viewport.setMasked(false);
					}
				});
			}
		}

	},

	openMyScheduleItem : function(record) {

		var me = this;

        if (record.get('type').toUpperCase() == 'PERSONAL') {
			me.getView().fireEvent('requestopendetail', 'Personify.view.phone.schedule.PersonalAgenda', {
				record : record
			});
		} else {
			var meetingID = record.get('meetingId'), sessionID = record.get('sessionID'), store = Ext.getStore('meetingListtingMain');
            var scheduleListStore = Ext.getStore('scheduleListtingMain');
            var isEventAvailable=false;
            var noMeetingFound = true;
            var appointmentId=0;
           
          
           
           if(scheduleListStore && scheduleListStore.getCount()>0)
           {
                    var recordSchedule = scheduleListStore.getAt(0);
                    var existingMeetingID=recordSchedule.get('productID');
                    var existingSessionID=recordSchedule.get('sessionId');
           
                    /// Means Events are available for Selected Schedule
                    if(existingMeetingID==record.get('meetingId'))
                    {
                            appointmentId=record.get('appointmentId');
                            isEventAvailable=true;
                            me.storeDetailsAssignmenttoEvents(recordSchedule,scheduleListStore,existingMeetingID,sessionID,appointmentId);
                    }
            }
           
           
			if (store && !isEventAvailable) {
                var noMeetingFound = true;
                noMeetingFound=me.storeDetailsAssignmenttoEvents(record,store,meetingID,sessionID,appointmentId);
           
				if (noMeetingFound) {
					////Ext.Msg.alert('', 'Cannot find associated meeting, please help to report this problem.');
                    me.loadEventsByID(record,meetingID,sessionID);
				}
			}
		}
	},
           
    storeDetailsAssignmenttoEvents:function(record,store,meetingID,sessionID,appointmentId)
    {
           var me=this;
           
           var noMeetingFound = true;
           store.each(function(recordEvent) {
                if (recordEvent.get('productID') == meetingID)
                {
                      noMeetingFound = false;
                      recordEvent.set('appointmentId', record.get('appointmentId'));
                      if (sessionID > 0)
                      {
                            var storeSession = recordEvent.SessionStore;
                            if (!storeSession || storeSession.getCount() <= 0)
                            {
                                var clsLoadMask = '';
                                var mask = {
                                    xtype : 'loadmask',
                                    message : 'Loading..',
                                    fullscreen : true,
                                    centered : true,
                                    cls : clsLoadMask
                                };
                                Ext.Viewport.setMasked(mask);
                                var currentUser = Personify.utils.Configuration.getCurrentUser();
                                var attributes = {
                                                    "MeetingID" : meetingID,///record.get('meetingId') ? record.get('meetingId') : record.get('productID'),
                                                    "IsStaffMember" : currentUser ? currentUser.isStaffMember().toString() : false,
                                                    "IsMember" : currentUser ? currentUser.isMember().toString() : false,
                                                    "ItemsPerPage" : "10000",
                                                    "StartIndex" : "1",
                                                    "SessionDate" : ""
                                                };
                                var storeManager = Personify.utils.ServiceManager.getStoreManager();
                                var storeSessionName = storeManager.getSessionListStore();
                                var storeListSession = Ext.create(storeSessionName);
                                storeListSession.setDataRequest(attributes);
                                storeListSession.load({
                                            scope : me,
                                            callback : function(records, operation, success) {
                                            Ext.Viewport.setMasked(false);
                                            if (records.length > 0) {
											record.SessionStore = Ext.create(storeManager.getSessionStore());
											record.SessionDatesStore = records[0].SessionDatesStore;
											var storeSession = records[0].SessionsStore;
                                           
                                            /////record.SessionStore =storeSession;
                                                      
											storeSession.each(function(recordSession)
                                            {
                                                    if (recordSession.get('sessionID') == sessionID)
                                                    {
                                                              
                                                              recordSession.set('productID',recordEvent.get('productID'));
                                                              
                                                              if(appointmentId>0)
                                                              {
                                                                    recordSession.set('appointmentId', appointmentId);
                                                              }
                                                              else
                                                              {
                                                                    recordSession.set('appointmentId', record.get('appointmentId'));
                                                              }
                                                              
                                                              if (!recordSession.get('isAdded'))
                                                              {
                                                                    recordSession.set('isAdded', true);
                                                              }
                                                              
                                                              me.getView().fireEvent('requestopendetail', 'Personify.view.phone.session.SessionDetail',
                                                              {
                                                                     record : recordSession,
                                                                     meetingRecord : recordEvent,
                                                                     locationDescription : recordSession.get('locationDescription'),
                                                                     sessionRecords : recordSession
                                                               });
                                                    }
                                            });
                                            
                                             record.SessionStore =storeSession;
                                             record.SessionStore.sync();
                                            ////store.sync();
                                                      
                                                      
                                          }
                                        }
                                    });
                         }
                         else
                         {
                            storeSession.each(function(recordSession)
                            {
                                        if (recordSession.get('sessionID') == sessionID)
                                        {
                                              recordSession.set('productID',recordEvent.get('productID'));
                                              
                                              if(appointmentId>0)
                                              {
                                                    recordSession.set('appointmentId', appointmentId);
                                              }
                                              else
                                              {
                                                    recordSession.set('appointmentId', record.get('appointmentId'));
                                              }
                                        
                                               if (!recordSession.get('isAdded')) {
                                                    recordSession.set('isAdded', true);
                                               }
                                              
                                               me.getView().fireEvent('requestopendetail', 'Personify.view.phone.session.SessionDetail',
                                               {
                                                     record : recordSession,
                                                      meetingRecord : recordEvent,
                                                      locationDescription : recordSession.get('locationDescription'),
                                                      sessionRecords : recordSession
                                               });
                                              
                                        }
                            });
                        }
                    }
                    else
                    {
                            recordEvent.set('isAdded', true);
                            me.getView().fireEvent('requestopendetail', 'Personify.view.phone.event.EventDetail', {
                                             record : recordEvent
                                             });
                    }
                }
            });
           
           return noMeetingFound;
    },

    loadEventsByID:function(recordMain,meetingID,sessionID)
    {
           if (!navigator.onLine) {
                Ext.Msg.alert('Connection', 'Please check your internet connection.', Ext.emptyFn);
                return;
           }
           var me = this;
           
           var clsLoadMask = '';
           var mask = {
                xtype : 'loadmask',
                message : 'Loading..',
                fullscreen : true,
                centered : true,
                cls : clsLoadMask
           };
           
           Ext.Viewport.setMasked(mask);
           
           var currentUser = Personify.utils.Configuration.getCurrentUser();
           var params = {
                IsStaffMember: currentUser? currentUser.isStaffMember().toString() : false,
                IsMember: true,
                FromMonth: '-6',
                ToMonth: '12',
                OrgID: currentUser.get('organizationId'),
                OrgUnitID:  currentUser.get('organizationUnitId'),
                MasterCustomerID: (currentUser && currentUser.isLogged())? currentUser.get('masterCustomerId'): '' ,
                SubCustomerID:(currentUser && currentUser.isLogged())? currentUser.get('subCustomerId'): '0',
                MeetingID: meetingID
           };
           
           var storeManager = Personify.utils.ServiceManager.getStoreManager();
           var iCalendarStoreName = storeManager.getICalendarStore();
           var store = Ext.create(iCalendarStoreName);
           
           var scheduleListingStore = Ext.getStore('scheduleListtingMain');
           if(scheduleListingStore)
           {
                scheduleListingStore.removeAll();
           }
           else
           {
                var eventListStore = storeManager.getEventListStore();
                scheduleListingStore = Ext.create(eventListStore);
                scheduleListingStore.setStoreId('scheduleListtingMain');
           }
           
           var agendaStore = Ext.getStore('agendaStoreListMain');
           
           store.setDataRequest(params);
           
           store.load({
                callback: function(records, operation, success)
                {
                      if (success)
                      {
                            store.getAt(0).EventListStore.each(function(record)
                            {
                                if (agendaStore)
                                {
                                    for (var i = 0; i < agendaStore.getCount(); i++)
                                    {
                                        var recordAgenda = agendaStore.getAt(i);
                                        if (recordAgenda.get('type') != 'PERSONAL')
                                        {
                                            if (!recordAgenda.get('sessionID') || recordAgenda.get('sessionID') == "" || recordAgenda.get('sessionID') == "0")
                                            {
                                                if (recordAgenda.get('meetingId') == record.get('productID'))
                                                {
                                                    if (!record.get('appointmentId') || record.get('appointmentId') == '')
                                                    {
                                                        record.set('appointmentId', recordAgenda.get('appointmentId'));
                                                     }
                                                         
                                                     if (!record.get('isAdded'))
                                                     {
                                                        record.set('isAdded', true);
                                                     }
                                                     break;
                                                 }
                                            }
                                        }
                                     };
                                }
                                                         
                            scheduleListingStore.add(record);
                                                               

                        });
                    
                        Ext.Viewport.setMasked(false);
                      
                        var recordSchedule = scheduleListingStore.getAt(0);
                        var appointmentId=recordMain.get('appointmentId');
                        me.storeDetailsAssignmenttoEvents(recordSchedule,scheduleListingStore,meetingID,sessionID,appointmentId);
                      }
                      else
                      {
                        Ext.Viewport.setMasked(false);
                        Ext.Msg.alert('', 'Cannot find associated meeting, please help to report this problem.');
                      }
                },
             scope: this
        });
    },
           
	onSelectMyScheduleItem : function(list, record) {
		if (this.getIsSelectAll() && !record.get('expanded'))
			record.set('expanded', true);
	},

	loadDetailSessionStore : function(record, callback) {
		Ext.Viewport.setMasked({
			xtype : 'loadmask'
		});
		var attributes = {
			"sessionID" : record.get('sessionID')
		};
		var storeManager = Personify.utils.ServiceManager.getStoreManager();
		var sessionDetailStoreName = storeManager.getSessionDetailStore();
		var sessionDetailStore = Ext.create(sessionDetailStoreName);
		sessionDetailStore.setDataRequest(attributes);
		sessionDetailStore.load({
			callback : function(records, operation, success) {
				if (success) {
					if (records.length > 0) {
						var recordSession = records[0];

						if (recordSession.get('isAdded') != record.get('isAdded')) {
							recordSession.set('isAdded', record.get('isAdded'));
						}

						recordSession.set('appointmentId', record.get('appointmentId'));
					}

					if ( typeof callback == 'function') {
						callback(records);
					}
				} else {
					Ext.Msg.alert('', 'Error occurred while loading session detail.');
				}
				Ext.Viewport.setMasked(false);
			},
			scope : this
		});
	}
});
