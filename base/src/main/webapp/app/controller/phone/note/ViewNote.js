Ext.define('Personify.controller.phone.note.ViewNote', {
    extend: 'Personify.base.Controller',

    control: {
        eventToolbar: {
            onNavigationButtonTap: 'onBack',
            actionButtonTap: 'onAddNewNoteButtonTap'
        },
        deleteNoteButton: {
            tap: 'onDeleteNote'
        },
        shareCurrentButton: {
            tap: 'onShareCurrentNote'
        },
        addNotePanel: {},
        inputTitleNote: {},
        inputDescriptionNote: {}
    },

    init: function() {
        this.getEventToolbar().getController().setActionText('+ Add');
        var record = this.getView().getRecord();
        this.setRecord(record);
        this.getEventToolbar().updateHiddenActionButton(true);
    },

    setRecord: function(record) {
        if(record){
            var title = record.get('title') || record.get('shortName');
            var description = record.get('description');
            if (this.getView().getIsAddNew()) {
                description = null;
            }
            var eventId = this.getView().getEventId();
            var sessionId = this.getView().getSessionId();
            this.getAddNotePanel().getController().setContent(title, description);
            this.getAddNotePanel().setRecord(record);
            this.getAddNotePanel().setEventId(eventId);
            this.getAddNotePanel().setSessionId(sessionId);
        }
    },

    onShareCurrentNote: function() {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            var me = this;
            if (window.plugins.socialsharing && window.plugins.socialsharing['shareWithOptions']) {
                var title = me.getInputTitleNote().getValue() || '';
                var description = me.getInputDescriptionNote().getValue() || '';
                var content = "Title: " + title + "\n" + "Note: " + description + "\n";
                var opts = {
                	subject: title,
                	message: content
                };
                
                window.plugins.socialsharing.shareWithOptions(opts, Ext.emptyFn, Ext.emptyFn);                
            }
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },

    onDeleteNote: function(){
        if (Personify.utils.Configuration.getAllowChangeView()) {
            var record = this.getView().getRecord();
            var eventId = this.getView().getEventId();
            var sessionId = this.getView().getSessionId();
            var me = this;
            Ext.Msg.confirm('', "Are you sure you want to delete the Note", processResult);
            function processResult(clickedButton) {
                Ext.Msg.hide();
                if(clickedButton == 'yes'){
                    if(record){
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
                                    Ext.Msg.alert('', 'Note has been deleted.', Ext.emptyFn);
                                    me.getView().fireEvent('requestopendetail', 'Personify.view.phone.note.NoteListPanel', {record: record, eventId: eventId, sessionId: sessionId, store: store});
                                }});
                            } else {
                                Ext.Msg.alert('', 'Delete Note Failed.', Ext.emptyFn);
                            }
                        });
                    }
                }
            }
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },

    onAddNewNoteButtonTap: function() {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            this.getAddNotePanel().getController().onAutoSaveNote();
            this.getAddNotePanel().getController().onClearTextFields();
            this.getView().fireEvent('back', this);
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },

    onBack: function() {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            this.getAddNotePanel().getController().onAutoSaveNote();
            this.getView().fireEvent('back', this);
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    }
});
