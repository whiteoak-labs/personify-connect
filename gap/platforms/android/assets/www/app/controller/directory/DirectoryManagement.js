Ext.define('Personify.controller.directory.DirectoryManagement', {
    extend : 'Personify.base.Controller',

    inject: [
        'personify',
        'currentUser'
    ],

    config: {
        personify: null,
        currentUser: null,
        params: null,
        flagNeedLoad: null,
        itemPerPage: null,
        totalDirectoryResult: 0
    },

    control: {
        searchDirectoryPanel : true,
        directorylist: true,
        view: {
            painted: 'onPaint'
        }
    },

    init: function() {
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Directory List');
        }

        Ext.Viewport.setMasked({xtype: 'loadmask'});
        var me = this;

        Ext.callback(
            me.onGetData,
            me, [], 1
        );
    },

    onPaint: function() {
        var me = this;
        if (me.getFlagNeedLoad()) {
            me.getDirectorylist().getStore().removeAll(true);
            Ext.Viewport.setMasked({xtype: 'loadmask'});

            Ext.callback(
                me.onGetData,
                me, [], 1
            );
        }
    },

    onGetData: function() {
        Ext.Viewport.setMasked({xtype: 'loadmask'});
        var me = this,
            currentUser = Personify.utils.Configuration.getCurrentUser(),
            config = Personify.utils.Configuration.getConfiguration().getAt(0).ConfigStore.DefaultListingParamsStore.getAt(0);

        Ext.callback(function() {
            var searchTerm = Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('defaultSearchTerm');
            var itemPerPage = Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('itemPerPage');

            var phoneDirectorySearch = Ext.ComponentQuery.query('#directorySearchField');
            if (phoneDirectorySearch[0]) {
                var directorySearchField = me.getView().getController().getDirectorySearchField()
                if (directorySearchField && directorySearchField.getValue() != "") {
                    searchTerm = directorySearchField.getValue();
                }
            }

            var params = {
                MasterCustomerID: currentUser.get('masterCustomerId'),
                SubCustomerID: currentUser.get('subCustomerId'),
                OrgID: currentUser? currentUser.get('organizationId') : config.get('orgId'),
                OrgUnitID: currentUser? currentUser.get('organizationUnitId') : config.get('orgUnitId'),
                SearchTerm: searchTerm,
                StartIndex: 1,
                ItemsPerPage: itemPerPage,
                IsStaffMember: currentUser.isStaffMember().toString(),
                IsMember: currentUser.isMember().toString()
            };
            me.setParams(params);
            me.loadDirectoryMangementModel();

            Ext.Viewport.setMasked(false);
            me.setFlagNeedLoad(null);
        }, me, [], 1);
    },

    onSearchTextChanged : function(newText) {
        if(window.plugins.app47) {
            window.plugins.app47.sendGenericEvent('Directory Search');
        }

        var me = this;

        if (newText) {
            var minSearchCharacter = Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('minSearchCharacters');

            if (newText.length >= minSearchCharacter) {
                if (me.getDirectorylist().getSelectionCount() > 0) {
                    me.getDirectorylist().deselectAll();
                }

                me.getParams()['SearchTerm'] = newText;
                me.getParams()['StartIndex'] = 1;
                me.getDirectorylist().getStore().removeAll(true);
                me.loadDirectoryMangementModel();
            } else {
                Ext.Msg.alert('','Please enter at least ' + minSearchCharacter + ' characters to search');
            }
        }
    },

    loadDirectoryMangementModel: function() {
        var me = this;
        me.getView().setMasked({xtype:'loadmask'});
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var directoryStoreName = storeManager.getDirectoryStore();
        var directoryStore = Ext.create(directoryStoreName, {
            dataRequest: me.getParams()
        });

        directoryStore.load({
            callback: function(records, operation, success) {
                if (success && records.length) {
                    var directoryManagement = records[0];
                    var currentStore = me.getDirectorylist().getStore();
                    if (currentStore) {
                        currentStore.suspendEvents();
                        directoryManagement.DirectoryStore.each(function(directoryRecord) {
                            if(directoryRecord) {
                                currentStore.add(directoryRecord);
                            }
                        }, me);
                        currentStore.sync();
                        currentStore.resumeEvents(true);
                        me.getDirectorylist().setStore(currentStore);
                        me.getDirectorylist().refresh();
                    } else {
                        me.getDirectorylist().setStore(directoryManagement.DirectoryStore);
                        currentStore = directoryManagement.DirectoryStore;
                    }


                    if (directoryManagement) {
                        me.setTotalDirectoryResult(directoryManagement.get('totalResults'));
                    }
                }

                me.getView().setMasked(false);
            },
            scope: me
        });
    },

    onClearIconTap : function() {
        if (this.getDirectorylist().getSelectionCount() > 0) {
            this.getDirectorylist().deselectAll();
        }

        this.getParams()['SearchTerm'] = '';
        this.getParams()['StartIndex'] = 1;
        this.getDirectorylist().getStore().removeAll(true);
        this.loadDirectoryMangementModel();
    },

    setStore: function(store) {
        this.getDirectorylist().setStore(store);
    },

    updateContactDetails: function(updatedDetails) {
        this.getDirectorylist().getSelection()[0]['data']['details'] = updatedDetails;
    },

    onNextButtonTap: function() {
        var directoryStore = this.getDirectorylist().getStore();
        var currentDirectoryItem = 0;

        if (directoryStore) {
            currentDirectoryItem = directoryStore.getCount();
        }

        if (currentDirectoryItem < this.getTotalDirectoryResult()) {
            this.getParams()['StartIndex'] = this.getParams()['StartIndex'] + (Personify.utils.Configuration.getConfiguration().getAt(0).DirectoryStore.get('itemPerPage'));
            this.loadDirectoryMangementModel();
        }
    },

    getSelection: function() {
        return this.getDirectorylist().getSelection()[0];
    }
})