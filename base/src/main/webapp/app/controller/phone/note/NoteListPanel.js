Ext.define('Personify.controller.phone.note.NoteListPanel', {
    extend: 'Personify.base.Controller',

    control: {
        eventToolbar: {
            onNavigationButtonTap: 'onBack',
            actionButtonTap: 'onAddNewNoteButtonTap'
        },
        noteList: {
            itemtap: 'onItemTapNoteList'
        },
        shareAllNote: {
            tap: 'onTapShareAllNote'
        },
        noteTitleBar: true
    },

    init: function() {
        this.getEventToolbar().getController().setActionText('+ Add');
        var title = this.getView().getTitle();

        if (title) {
            this.getNoteTitleBar().setHtml(Personify.utils.ItemUtil.getShortContent(title, 48));
        }
    },

    setRecord: function(record) {
        var title = '';

        if (record.get('shortName')) {
            title = record.get('shortName');
        } else {
            if (record.get('title')) {
                title = record.get('title');
            }
        }
        this.getNoteTitleBar().setHtml(Personify.utils.ItemUtil.getShortContent(title, 48));
    },

    updateListNote: function(store, sessionId) {
        if (store) {
            this.getNoteList().setStore(store);
            //show hide add button
            if (sessionId) {
                if (store.getCount() > 0) {
                    this.getEventToolbar().updateHiddenActionButton(true);
                } else {
                    this.getEventToolbar().updateHiddenActionButton(false);
                }
            }
        }
    },

    onItemTapNoteList: function(list, index, target, record, e, eOpts) {
        var me = this;
        var eventId = me.getView().getEventId();
        var sessionId = me.getView().getSessionId();
        if (e.target.className.indexOf('x-button') >= 0) {
            Ext.Msg.confirm('', "Are you sure you want to delete the Note", processResult);
            function processResult(clickedButton) {
                Ext.Msg.hide();
                if(clickedButton == 'yes'){
                    Ext.Viewport.setMasked({xtype: 'loadmask'});
                    Personify.utils.Sqlite.deleteMyNote(record.get('noteId'), function(success) {
                        Ext.Viewport.setMasked(false);
                        if(success) {
                            var attributes = {
                                "eventId": eventId,
                                "sessionId" : sessionId
                            };
                            var storeManager = Personify.utils.ServiceManager.getStoreManager();
                            var store = Ext.create(storeManager.getNoteListStore());
                            store.setDataRequest(attributes);
                            Ext.Viewport.setMasked({xtype: 'loadmask'});
                            store.load({callback: function(records, operation, success) {
                                Ext.Viewport.setMasked(false);
                                me.getNoteList().setStore(store);
                                if (records.length == 0) {
                                    me.onAddNewNoteButtonTap();
                                }
                                Ext.Msg.alert('', 'Note has been deleted.', Ext.emptyFn);
                            }});
                        } else {
                            Ext.Msg.alert('', 'Delete Note Failed.', Ext.emptyFn);
                        }
                    });
                }
            }
        } else {
            var title = this.getView().getTitle();
            this.getView().fireEvent('requestopendetail', 'Personify.view.phone.note.AddNote', {record: record, eventId: eventId, sessionId: sessionId, title: title, isNoteList: true});
        }
    },

    onTapShareAllNote: function() {
        var me = this;
        if (window.plugins.socialsharing && window.plugins.socialsharing['shareWithOptions']) {
	        var noteListStore = me.getNoteList().getStore();
	        var content = "";
	            
	        for (var i = 0; i < noteListStore.getAllCount(); i++) {
	        	var record = noteListStore.getAt(i);
	        	var title = record.get('title');
	        	var description = record.get('description');
	        	content += "Title: " + title + "\n" + "Note: " + description + "\n\n";
	        }
	        
	        var opts = {
	        	message: content	
	        };
	            
	        window.plugins.socialsharing.shareWithOptions(opts, Ext.emptyFn, Ext.emptyFn);                
        }
    },

    onAddNewNoteButtonTap: function() {
        var eventId = this.getView().getEventId();
        var title = this.getView().getTitle();
        this.getView().fireEvent('requestopendetail', 'Personify.view.phone.note.AddNote', {eventId: eventId, title: title, isAddNew: true, isNoteList: true});
    },

    onBack: function() {
        this.getView().fireEvent('backtomenu', this);
    }
});
