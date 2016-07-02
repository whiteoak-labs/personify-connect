//// Added new Global Variable to hold map data
var globalMapDataAll=null;

Ext.define('Personify.controller.event.map.Map',{
           extend: 'Personify.base.Controller',
           control:{
           agendaMap: {
           tap: 'getAgendaList'
           },
           agendaExhibitor: {
           tap: 'getExhibitorList'
           },
           myAgenda: {
           oneventitemtap: 'onTapMyAgenda',
           deletesession: 'onDeleteSessionToAgenda'
           },
           myExhibitor: {
           tapAllExhibitorItem: 'onMyExhibitorItemTapped',
           onTapBtnDelProductAllExhibitor: 'onTapBtnDelProductAllExhibitor'
           },
           mapPanel: true,
           mapSegmentedButton: {
           toggle: 'onMapSegmentedButtonToggled'
           },
           mapAndAgendaPanel: true,
           tabMapEvent: true,
           agendaAndExhibitorCardLayout: true
           },
           
           config: {
           mapData: null,
           currentLocation: null
           },
           
           
           init: function() {
           var me = this;
           allExhibitorList = me.getMyExhibitor();
           
           if (window.plugins.app47) {
           window.plugins.app47.sendGenericEvent('Map Detail');
           }
           
           /* Commented OLD Code
            var mapData = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('mapData');
            
            me.setMapData(mapData);
            me.initMap(mapData);
            */
           
           me.filterMapsByProduct();
           
           var record = me.getView().getRecord();
           me.setRecord(record);
           
           },
           
           filterMapsByProduct: function()
           {
           var me = this;
           //// Array to store filtered maps
           var arrMapDataFiltered=[];
           
           //// To Get Product ID
           var productId = me.getView().getRecord() ? me.getView().getRecord().get('productID') : '0';
           var mapData = Personify.utils.Configuration.getConfiguration().getAt(0).EventsStore.get('mapData');
           
           if (productId!='0')
           {
           //// Array to store All maps
           var arrAllMapData=[];
           
           if (mapData !=null && mapData.maps!=null
               && mapData.maps.length>0)
           {
           
           if (globalMapDataAll===null)
           {
           for (var i = 0; i < mapData.maps.length; i++) {
           var map = mapData.maps[i];
           arrAllMapData.push(map); //// Push all maps to array
           }
           //// Added all maps to Global Variable
           globalMapDataAll=arrAllMapData;
           }
           
           for (var i = 0; i < mapData.maps.length; i++) {
           var map = mapData.maps[i];
           //// Match Product ID
           if (map.productId===productId)
           {
           arrMapDataFiltered.push(map);
           }
           }
           
           
           if(arrMapDataFiltered!=null && arrMapDataFiltered.length>0)
           {
           mapData.maps =arrMapDataFiltered;
           me.setMapData(mapData);
           me.initMap(mapData);
           }
           
           }
           }
           else
           {
           if (globalMapDataAll!=null
               && globalMapDataAll.length>0)
           {
           mapData.maps=globalMapDataAll;
           }
           }
           },
           
           initMap: function(mapData) {
           var me = this;
           var mapSegmentedButton = me.getMapSegmentedButton();
           var mapPanel = me.getMapPanel();
           
           if (mapData.maps.length <= 0) {
           mapSegmentedButton.hide();
           } else {
           for (var i = 0; i < mapData.maps.length; i++) {
           var map = mapData.maps[i];
           map.mapIndex = i;
           
           var cls = 'my-schedule-tab';
           if (i == 0) {
           var cls = 'event-schedule-tab';
           }
           
           mapSegmentedButton.add({
                                  text: map.name,
                                  flex: 1,
                                  cls: cls,
                                  data: map
                                  });
           }
           
           mapSegmentedButton.setPressedButtons([mapSegmentedButton.getAt(0)]);
           
           //// commented to display header of TAB for Single MAP
           /*
            if (mapData.maps.length == 1) {
            mapSegmentedButton.hide();
            } */
           
           }
           
           var locationSelected = me.getView().getRecord();
           
           if (locationSelected) {
           if (!locationSelected.get('location')) {
           me.showMarker(me.getView().getBoothNosPresent());
           } else {
           me.showMarker(locationSelected.get('location'));
           }
           } else {
           me.showMarker();
           }
           },
           
           setRecord: function(record){
           var view = this.getView();
           if (view && !view.isDestroyed) {
           if(record) {
           var currentUser = Personify.utils.Configuration.getCurrentUser();
           var storeManager = Personify.utils.ServiceManager.getStoreManager();
           this.getAgendaAndExhibitorCardLayout().setRecord(record);
           if(!record.get('location')) {
           this.showMarker(this.getView().getBoothNosPresent());
           } else {
           this.showMarker(record.get('location'));
           }
           
           this.getExhibitorStore();
           
           var meetingRecord = this.getView().getMeetingRecord();
           if(meetingRecord.MeetingAgendaStore){
           var agendaStoreName = storeManager.getAgendaStore();
           var agendaStoreMap = Ext.create(agendaStoreName);
           meetingRecord.MeetingAgendaStore.each(function(recordAgenda){
                                                 if(recordAgenda.get('type').toUpperCase() != 'PERSONAL'){
                                                 agendaStoreMap.add(recordAgenda);
                                                 }
                                                 });
           agendaStoreMap.setGrouper({
                                     groupFn: function(record) {
                                     var startDateTime = Personify.utils.ItemUtil.convertStringToDate(record.get('startDateTimeString'));
                                     return Ext.Date.format(startDateTime,'l, F j');
                                     },
                                     sorterFn: function(record1, record2) {
                                     var date1 = record1.get('startDateTime');
                                     var date2 = record2.get('startDateTime');
                                     
                                     if (date1 > date2) {
                                     return 1;
                                     } else if (date1 < date2) {
                                     return -1;
                                     } else {
                                     var title1 = record1.get('title');
                                     var title2 = record2.get('title');
                                     
                                     return title1 > title2 ? 1 : (title1 == title2 ? 0 : -1);
                                     }
                                     },
                                     direction: 'ASC'
                                     });
           this.getMyAgenda().setStore(agendaStoreMap);
           this.getMyAgenda().refresh();
           }else{
           if(currentUser && currentUser.isLogged()){
           this.getAgendaStore();
           }else{
           this.getMapAndAgendaPanel().hide();
           }
           }
           }
           }
           },
           
           getExhibitorStore: function() {
           var me = this;
           var currentUser = Personify.utils.Configuration.getCurrentUser();
           var record = this.getView().getMeetingRecord();
           if(record.ExhibitorStore && record.ExhibitorStore.getCount() > 0){
           me.getAllExhibitorFromSql(record, currentUser, record.ExhibitorStore);
           }else {
           var attributes = {
           "ItemsPerPage": "100000",
           "XbtID": record.get('xbtProductID'),
           "XbtParentProduct": record.get('xbtParentProduct'),
           "StartIndex": "0",
           "XbtProductCode": record.get('xbtProductCode')
           };
           var storeManager = Personify.utils.ServiceManager.getStoreManager();
           var exhibitorStore = storeManager.getExhibitorStore();
           var storeExhibitor = Ext.create(exhibitorStore);
           
           storeExhibitor.setDataRequest(attributes);
           record.ExhibitorStore = storeExhibitor;
           storeExhibitor.load({scope: me, callback: function(records, operation, success){
                               me.getAllExhibitorFromSql(record, currentUser, storeExhibitor);
                               }});
           }
           },
           
           getAllExhibitorFromSql: function(record, currentUser, exhibitorStore) {
           var me = this;
           var storeManager = Personify.utils.ServiceManager.getStoreManager();
           var exhibitorStoreName = storeManager.getExhibitorStore();
           var storeMyExhibitor = Ext.create(exhibitorStoreName);
           var productId = record.get('productID') || null;
           var customerId = currentUser.get('masterCustomerId');
           var subCustomerId = currentUser.get('subCustomerId');
           Personify.utils.Sqlite.getMyExhibitor(productId, customerId, subCustomerId, function(result) {
                                                 if(typeof result == 'object' && result.length > 0) {
                                                 exhibitorStore.each(function(recordEx) {
                                                                     for (var i = 0; i < result.length; i++) {
                                                                     if (result[i].exhibitorId == recordEx.get('recordId')) {
                                                                     if (!recordEx.get('isAdded')) {
                                                                     recordEx.set('isAdded', true);
                                                                     }
                                                                     
                                                                     storeMyExhibitor.add(recordEx);
                                                                     break;
                                                                     }
                                                                     }
                                                                     });
                                                 }
                                                 record.MyExhibitorStore = storeMyExhibitor;
                                                 me.getMyExhibitor().setStore(storeMyExhibitor);
                                                 });
           },
           
           getAgendaStore: function() {
           var meetingRecord = this.getView().getMeetingRecord();
           var me = this;
           this.getMyAgenda().setMasked({xtype: 'loadmask'});
           var currentUser = Personify.utils.Configuration.getCurrentUser();
           if (currentUser && currentUser.isLogged()) {
           var masterCustomerId = currentUser.get('masterCustomerId');
           var subCustomerId = currentUser.get('subCustomerId');
           var storeManager = Personify.utils.ServiceManager.getStoreManager();
           var agendaStoreName = storeManager.getAgendaStore();
           var attributes = {
           "SubCustomerID": subCustomerId,
           "MeetingID": meetingRecord.get('productID'),
           "MasterCustomerID": masterCustomerId
           };
           
           var agendaStoreMap = Ext.create(agendaStoreName);
           var meetingAgendaStore = Ext.create(agendaStoreName);
           meetingAgendaStore.setDataRequest(attributes);
           meetingAgendaStore.load({
                                   callback: function(records, operation, success) {
                                   meetingAgendaStore.each(function(recordAgenda){
                                                           if(recordAgenda.get('type').toUpperCase() != 'PERSONAL'){
                                                           agendaStoreMap.add(recordAgenda);
                                                           }
                                                           });
                                   agendaStoreMap.setGrouper({
                                                             groupFn: function(record) {
                                                             var startDateTime = Personify.utils.ItemUtil.convertStringToDate(record.get('startDateTimeString'));
                                                             return Ext.Date.format(startDateTime,'l, F j');
                                                             },
                                                             sorterFn: function(record1, record2) {
                                                             var date1 = record1.get('startDateTime');
                                                             var date2 = record2.get('startDateTime');
                                                             
                                                             if (date1 > date2) {
                                                             return 1;
                                                             } else if (date1 < date2) {
                                                             return -1;
                                                             } else {
                                                             var title1 = record1.get('title');
                                                             var title2 = record2.get('title');
                                                             
                                                             return title1 > title2 ? 1 : (title1 == title2 ? 0 : -1);
                                                             }
                                                             },
                                                             direction: 'ASC'
                                                             });
                                   me.getMyAgenda().setStore(agendaStoreMap);
                                   meetingRecord.MeetingAgendaStore = meetingAgendaStore;
                                   me.getMyAgenda().setMasked(false);
                                   },
                                   scope: this
                                   });
           }
           },
           
           showMarker: function(locationName) {
           if (!locationName) {
           locationName = this.getCurrentLocation();
           }
           var mapData = this.getMapData();
           this.clearAllMarker();
           
           if (mapData && locationName) {
           var location = mapData.locations[locationName];
           
           if (location) {
           var mapButtons = this.getMapSegmentedButton().getItems().items;
           
           for (var i = 0; i < mapButtons.length; i++) {
           var map = mapButtons[i].getData();
           
           if (map.mapId == location.mapId) {
           var pressedButtons = this.getMapSegmentedButton().getPressedButtons();
           
           if (pressedButtons.length && pressedButtons[0] == mapButtons[i]) {
           this.createMap(map.mapIndex, { x: location.coords[0], y: location.coords[1] });
           } else {
           this.getMapSegmentedButton().setPressedButtons([mapButtons[i]]);
           }
           break;
           }
           }
           } else {
           this.createMap(0);
           }
           }
           },
           
           createMap: function(mapIndex, position) {
           var mapPanel = this.getMapPanel();
           var map = this.getMapData().maps[mapIndex];
           var location = this.getMapData().locations[this.getCurrentLocation()];
           
           mapPanel.removeAll(true);
           var mapView = mapPanel.add({
                                      xtype: 'pinchzoomimage',
                                      cls: 'map-schema',
                                      src: map.image
                                      });
           
           if (location && location.mapId == map.mapId) {
           mapView.updateMarkerPosition( { x: location.coords[0], y: location.coords[1] } );
           } else {
           mapView.updateMarkerPosition();
           }
           },
           
           clearAllMarker: function() {
           Ext.Array.each(this.getMapPanel().getItems().items, function(mapView) {
                          mapView.showMarker(false);
                          });
           },
           
           getExhibitorList: function() {
           this.getMyExhibitor().show();
           this.getMyAgenda().hide();
           },
           
           getAgendaList: function() {
           this.getMyExhibitor().hide();
           this.getMyAgenda().show();
           },
           
           onMapSegmentedButtonToggled: function(segmentedButton, button, isPressed, eOpts) {
           if (isPressed) {
           var mapIndex = button.getData().mapIndex;
           this.createMap(mapIndex);
           }
           },
           
           onMyExhibitorItemTapped: function(list, index, target, record, e, eOpts) {
           this.setCurrentLocation(record.get('boothNos'));
           this.showMarker();
           list.select(index);
           },
           
           onTapMyAgenda: function(list, index, target, record, e, eOpts) {
           this.setCurrentLocation(record.get('location'));
           this.showMarker();
           list.select(index);
           },
           
           onDeleteSessionToAgenda: function(record){
           this.getView().getParent().fireEvent("deletesession", record.record, this.getView(), null, record.callback);
           },
           
           refreshMySchedule: function(sessionID){
           this.getAgendaStore();
           var record = this.getView().getRecord();
           if(record.SessionStore){
           record.SessionStore.each(function(recordSession){
                                    if(recordSession.get('sessionID') == sessionID){
                                    if (recordSession.get('isAdded')) {
                                    recordSession.set('isAdded', false);
                                    }
                                    }
                                    });
           }
           },
           
           onTapBtnDelProductAllExhibitor: function(record) {
           var me = this;
           var currentUser = Personify.utils.Configuration.getCurrentUser();
           var statusRecordSelected = null,
           exhibitorId = record.get('recordId') || null,
           customerId = currentUser.get('masterCustomerId') || null,
           subCustomerId = currentUser.get('subCustomerId') || null,
           productId = me.getView().getRecord().get('productID') || null;
           
           Personify.utils.Sqlite.deleteMyExhibitor(exhibitorId, productId, customerId, subCustomerId, function(success) {
                                                    if(success) {
                                                    if (record.get('isAdded')) {
                                                    record.set('isAdded', false);
                                                    }
                                                    
                                                    me.getMyExhibitor().getStore().remove(record);
                                                    me.getView().fireEvent('removeexhibitorsuccess');
                                                    Ext.Msg.alert('', 'Exhibitor has been removed.', Ext.emptyFn);
                                                    } else {
                                                    Ext.Msg.alert('', 'Delete Exhibitor Failed.', Ext.emptyFn);
                                                    }
                                                    });
           },
           
           selectItemExhibitor: function(record){
           if (allExhibitorList && !allExhibitorList.isDestroyed) {
           var store = allExhibitorList.getStore();
           if(store){
           allExhibitorList.deselectAll();
           allExhibitorList.select(record);
           }
           }
           },
           
           selectItemMyAgenda: function(record){
           if (this.getMyAgenda() && !this.getMyAgenda().isDestroyed) {
           var store = this.getMyAgenda().getStore();
           if(store){
           this.getMyAgenda().deselectAll();
           this.getMyAgenda().select(record);
           }
           }
           }
           
           });
