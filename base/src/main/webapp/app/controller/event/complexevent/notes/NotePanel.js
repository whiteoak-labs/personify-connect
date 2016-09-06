Ext.define('Personify.controller.event.complexevent.notes.NotePanel', {
    extend: 'Personify.base.Controller',
    config: {
        addButton: null
    },
    
    control: {
        addNotePanel: {
            addnotesuccess: 'onAddNoteSuccess',
            canceladdnote: 'onCancelAddNote'
        },
        viewNotePanel:{
            onloadnotes: 'loadNoteList',
            addnewnote: 'openAddNewNotePanel'
        },
        noteListPanel: {
            onloadnotes: 'loadNoteList',
            onselectnote: 'onSelectNote',
            oncleartextfields: 'onClearTextFields',
            addnewnote: 'openAddNewNotePanel'
        }
    },
    
    init: function() {
        var eventId = this.getView().getMeetingRecord()? this.getView().getMeetingRecord().get('productID'): null;
        var noteTitle = this.getView().getMeetingRecord().get('shortName');
        this.getViewNotePanel().getController().setNoteTitle(noteTitle);
        this.getViewNotePanel().getController().setEventId(eventId);
        this.loadNoteList();
    },
    
    onAddNoteSuccess: function() {
        this.loadNoteList();
    },
    
    openAddNewNotePanel: function() {
        var noteTitle = this.getView().getMeetingRecord().get('shortName');
        this.getViewNotePanel().getController().onClearTextFields();
        this.getViewNotePanel().getController().setNoteTitle(noteTitle);
        this.getViewNotePanel().getController().clearNoteId();
        this.loadNoteList(true);
    },
    
    onCancelAddNote: function(){
        this.getAddNotePanel().hide();
        this.getViewNotePanel().show();
    },
    
    loadNoteList: function(isClearFields) {
        var me = this;
        var eventId = me.getView().getMeetingRecord()? me.getView().getMeetingRecord().get('productID'): null;
        var attributes = {
            "eventId": eventId 
        };
        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var store = Ext.create(storeManager.getNoteListStore());
        store.setDataRequest(attributes);
        store.load({callback: function(records, operation, success) {
            me.getNoteListPanel().getController().setStore(store);
            if (isClearFields) {

            } else {
                if (records.length > 0) {
                    me.onSelectNote(records[0]);
                    me.getNoteListPanel().getController().setSelectedItem(0);
                }
            }

        }});
    },
    
    onSelectNote: function(record) {
        this.getViewNotePanel().getController().setRecord(record);
    },

    onClearTextFields: function() {
        this.getViewNotePanel().getController().onClearTextFields();
    }
});
