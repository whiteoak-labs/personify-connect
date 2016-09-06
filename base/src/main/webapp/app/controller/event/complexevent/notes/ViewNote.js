Ext.define('Personify.controller.event.complexevent.notes.ViewNote', {
    extend: 'Personify.base.Controller',

    control: {
        inputTitleNote: true,
        inputDescriptionNote: true,
        deleteNoteButton: {
            tap: 'onDeleteNote'
        },
        shareCurrentButton: {
            tap: 'onShareCurrentNote'
        },
        addNewButton: {
            tap: 'onAddNewNoteButtonTap'
        },
        addNotePanel: {}
    },
    
    setRecord: function(record) {
        if(record){
            this.getView().setRecord(record);
            this.getInputTitleNote().setValue(record.get('title'));
            this.getInputDescriptionNote().setValue(record.get('description'));
            this.getAddNotePanel().getController().setNoteItemId(record.get('noteId'));
        }
    },

    onShareCurrentNote: function() {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            var me = this;
            if (window.plugins.social && window.plugins.social['available']) {
                window.plugins.social.available(function(result) {
                    if (result == 1) {
                        var title = me.getInputTitleNote().getValue() || '';
                        var description = me.getInputDescriptionNote().getValue() || '';
                        var content = "Title: " + title + "\n" + "Note: " + description + "\n";
                        window.plugins.social.share(content, '', '');
                    } else {
                        Ext.Msg.alert('', 'Social network plugins is not supported.', Ext.emptyFn);
                    }
                });
            }
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },

    onDeleteNote: function() {
        var record = this.getView().getRecord();
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
                            me.getView().fireEvent('addnewnote');
                            Ext.Msg.alert('', 'Note has been deleted.', Ext.emptyFn);
                        } else {
                            Ext.Msg.alert('', 'Delete Note Failed.', Ext.emptyFn);
                        }
                    });
                }
            }
        }
    },

    onAddNewNoteButtonTap: function() {
        this.getAddNotePanel().getController().onAutoSaveNote();
        this.getView().fireEvent('addnewnote');
    },

    setNoteTitle: function(title) {
        this.getAddNotePanel().getController().setNoteTitle(title);
    },

    onClearTextFields: function() {
        this.getAddNotePanel().getController().onClearTextFields();
    },

    setEventId: function(eventId) {
        this.getAddNotePanel().setEventId(eventId);
    },

    setNoteItemId: function(noteId) {
        this.getAddNotePanel().getController().setNoteItemId(noteId);
    },

    clearNoteId: function() {
        this.getAddNotePanel().getController().setNoteItemId(null);
    }
});
