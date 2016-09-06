Ext.define('Personify.controller.profile.ToggleOption', {
           extend: 'Personify.base.Controller',
           
           control: {
           toggleDirectory: {
           change: 'onUpdateOptionDirectory'
           },
           
           toggleMobileDirectory: {
           change: 'onUpdateOptionMobileDirectory'
           },
           
           view: {
           painted: 'onPainted'
           }
           },
           
           config: {
           record: null,
           isPainted: false,
           flagToggleDirectory: true,
           flagToggleMobileDirectory: true,
           finishedLoadToggleDirectory: true,
           finishedLoadToggleMobileDirectory: true,
           flagUpdateData: false
           },
           
           onPainted: function() {
           this.setIsPainted(true);
           
           var me = this;
           var record = this.getRecord();
           
           if (record) {
           Ext.defer(function() {
                     me.setFlagUpdateData(false);
                     
                     var toggleDirectory = me.getToggleDirectory(),
                     toggleMobileDirectory = me.getToggleMobileDirectory();
                     
                     toggleDirectory.setValue(record.get('includeInDirectory'));
                     toggleMobileDirectory.setValue(record.get('includeInMobileDirectory'));
                     
                     me.setFlagUpdateData(true);
                     }, 500);
           }
           },
           
           updateRecord: function(newRecord) {
           var me = this;
           var toggleDirectory = this.getToggleDirectory(),
           toggleMobileDirectory = this.getToggleMobileDirectory();
           
           if (newRecord) {
           if(Ext.os.is.Android && Ext.os.is.Tablet){
           Ext.defer(function() {
                     me.setFlagUpdateData(false);
                     toggleDirectory.setValue(newRecord.get('includeInDirectory'));
                     toggleMobileDirectory.setValue(newRecord.get('includeInMobileDirectory'));
                     me.setFlagUpdateData(true);
                     }, 500);
           }
           else
           {
           if (this.getIsPainted()) {
           toggleMobileDirectory.setValue(newRecord.get('includeInMobileDirectory'));
           toggleDirectory.setValue(newRecord.get('includeInDirectory'));
           }
           }
           } else {
           this.setFinishedLoadToggleMobileDirectory(false);
           this.setFinishedLoadToggleDirectory(false);
           toggleDirectory.setValue(false);
           toggleMobileDirectory.setValue(false);
           }
           
           me.setFlagUpdateData(true);
           },
           
           onUpdateOptionMobileDirectory: function(toggle, slider, thumb, newValue, oldValue, eOpts) {
           if (this.getFlagUpdateData()) {
           Ext.Viewport.setMasked({xtype:'loadmask'});
           
           var me = this,
           currentUser = Personify.utils.Configuration.getCurrentUser(),
           toggleMobileDirectory = me.getToggleMobileDirectory(),
           storeManager = Personify.utils.ServiceManager.getStoreManager(),
           customerStoreName = storeManager.getCustomerStore(),
           customerStore = Ext.create(customerStoreName),
           isDirectory = false,
           isMobileDirectory = false,
           isDirectoryValue = false,
           isMobileDirectoryValue = false;
           
           var params = {
           "Type": this.getRecord().get('type') || 'I',
           "MasterCustomerId": currentUser.get('masterCustomerId'),
           "SubCustomerId": currentUser.get('subCustomerId'),
           "OrganizationId": currentUser.get('organizationId'),
           "OrganizationUnitId": currentUser.get('organizationUnitId'),
           "IncludeInMobileDirectory" : (toggleMobileDirectory.getValue() == 1)
           };
           
           var profileUpdatingStoreName = storeManager.getProfileUpdatingStore();
           var profileUpdatingStore = Ext.create(profileUpdatingStoreName, {
                                                 dataRequest: params
                                                 });
           
           var view = this.getView();
           
           profileUpdatingStore.load({
                                     callback: function(records, operation, success) {
                                     if (success && records.length) {
                                     var profile = records[0];
                                     me.setFinishedLoadToggleMobileDirectory(true);
                                     me.setFlagToggleMobileDirectory(false);
                                     
                                     if (profile && profile.EntryProfile.getCount()) {
                                        me.setRecord(profile.EntryProfile.first());
                                     } else {
                                     toggle.setValue(oldValue);
                                     }
                                     
                                     if (me.getFinishedLoadToggleDirectory()) {
                                     Ext.Viewport.setMasked(false);
                                     me.setFinishedLoadToggleMobileDirectory(false);
                                     me.setFinishedLoadToggleDirectory(false);
                                     }
                                     } else {
                                     toggle.setValue(oldValue);
                                     }
                                     
                                     Ext.Viewport.setMasked(false);
                                     }
                                     });
           }
           },
           
           onUpdateOptionDirectory: function(toggle, slider, thumb, newValue, oldValue, eOpts) {
           if (this.getFlagUpdateData()) {
           Ext.Viewport.setMasked({xtype:'loadmask'});
           
           var me = this,
           currentUser = Personify.utils.Configuration.getCurrentUser(),
           toggleDirectory = me.getToggleDirectory(),
           storeManager = Personify.utils.ServiceManager.getStoreManager(),
           customerStoreName = storeManager.getCustomerStore(),
           customerStore = Ext.create(customerStoreName),
           isDirectory = false,
           isMobileDirectory = false,
           isDirectoryValue = false,
           isMobileDirectoryValue = false;
           
           var params = {
           "Type": this.getRecord().get('type') || 'I',
           "MasterCustomerId": currentUser.get('masterCustomerId'),
           "SubCustomerId": currentUser.get('subCustomerId'),
           "OrganizationId": currentUser.get('organizationId'),
           "OrganizationUnitId": currentUser.get('organizationUnitId'),
           "IncludeInDirectory" : (toggleDirectory.getValue() == 1)
           };
           
           var profileUpdatingStoreName = storeManager.getProfileUpdatingStore();
           var profileUpdatingStore = Ext.create(profileUpdatingStoreName, {
                                                 dataRequest: params
                                                 });
           
           profileUpdatingStore.load({
                                     callback: function(records, operation, success) {
                                     if (success && records.length) {
                                     var profile = records[0];
                                     me.setFinishedLoadToggleDirectory(true);
                                     me.setFlagToggleDirectory(false);
                                     
                                     if (profile && profile.EntryProfile.getCount()) {
                                     me.setRecord(profile.EntryProfile.first());
                                     } else {
                                     toggle.setValue(oldValue);
                                     }
                                     
                                     if (me.getFinishedLoadToggleMobileDirectory()) {
                                     me.setFinishedLoadToggleMobileDirectory(false);
                                     me.setFinishedLoadToggleDirectory(false);
                                     }
                                     } else {
                                     toggle.setValue(oldValue);
                                     }
                                     
                                     Ext.Viewport.setMasked(false);
                                     }
                                     });
           }
           }
           });