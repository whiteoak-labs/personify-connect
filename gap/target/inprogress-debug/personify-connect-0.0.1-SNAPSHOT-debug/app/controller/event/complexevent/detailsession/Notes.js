Ext.define('Personify.controller.event.complexevent.detailsession.Notes', {
    extend: 'Personify.base.Controller',
    config: {
        addButton: null
    },
    
    control: {
        addNotePanel: {
            addnotesuccess: 'onAddNoteSuccess',
            canceladdnote: 'onCancelAddNote'
        },
        shareCurrentButton: {
            tap: 'onShareCurrentButton'
        },
        deleteNoteButton: {
            tap: 'onDeleteNoteButton'
        },
        closeButton: {
            tap: 'onCloseNote'
        },
        addNotePanel: {},
        inputTitleNote: {},
        inputDescriptionNote: {}
    },
    
    init: function() {
        this.callParent(arguments);

        var eventId = this.getView().getEventId();
        var sessionId = this.getView().getSessionId();
        this.getAddNotePanel().setEventId(eventId);
        this.getAddNotePanel().setSessionId(sessionId);
        this.loadNoteList();

        if (this.getView().getShowCloseButton()) {
            this.getCloseButton().show();
        }
    },
    
    onAddNoteSuccess: function(){
        this.loadNoteList();
        this.onCancelAddNote();
    },
    
    openAddNewNotePanel: function() {
        var record = this.getView().getRecord();
        var title = record.get('title')? record.get('title'): record.get('name');
        this.getAddNotePanel().getController().onClearTextFields();
        this.getAddNotePanel().getController().getInputTitleNote().setValue(title);
        this.getAddNotePanel().show();
        this.getNoteListPanel().hide();
    },
    
    onCancelAddNote: function(){
        this.getAddNotePanel().hide();
        this.getNoteListPanel().show();
    },
    
    loadNoteList: function() {
        var me = this;
        var attributes = {
            "eventId": me.getView().getEventId(),
            "sessionId": me.getView().getSessionId()
        };
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var store = Ext.create(storeManager.getNoteListStore());
        store.setDataRequest(attributes);
        store.load({callback: function(records, operation, success) {
            if (records[0]) {
                var item = records[0];
                me.getInputTitleNote().setValue(item.get('title'));
                me.getInputDescriptionNote().setValue(item.get('description'));
                me.getAddNotePanel().getController().setNoteItemId(item.get('noteId'));
                me.getDeleteNoteButton().show();
            } else {
                var record = me.getView().getRecord();
                var title = record.get('title')? record.get('title'): record.get('name');
                me.getAddNotePanel().getController().getInputTitleNote().setValue(title);
                me.getDeleteNoteButton().hide();
            }
        }});
    },

    onShareCurrentButton: function() {
        this.getAddNotePanel().getController().onShareCurrentNote();
    },

    onDeleteNoteButton: function() {
        var me = this;
        Ext.Msg.confirm('', "Do you want to delete the note?", processResult);
        function processResult(clickedButton) {
            if (clickedButton == 'yes') {
                me.getAddNotePanel().getController().onDeleteNoteButton(function() {
                    var record = me.getView().getRecord();
                    me.getDeleteNoteButton().hide();
                    var title = record.get('title')? record.get('title'): record.get('name');
                    me.getAddNotePanel().getController().getInputTitleNote().setValue(title);
                });
            }
        }
    },

    onCloseNote: function() {
        this.getView().fireEvent('close');
    }
});
