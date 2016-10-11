Ext.define('Personify.controller.event.complexevent.notes.AddNote', {
    extend: 'Personify.base.Controller',
    control: {
        inputTitleNote: {
            keyup: 'onTitleChange',
            clearicontap: 'onClearTitle'
        },
        inputDescriptionNote: {
            keyup: 'onTextChange',
            change: 'onTextChange',
            show: 'onShow',
            clearicontap: 'onClearText'
        },
        view: {
            painted: 'onPainted'
        },
        panelOfContent: {}
    },

    config: {
        noteId: null,
        screenHeight : 0
    },

    init:function(){
        this.callParent();

        if (Ext.os.is.Android) {
            this.setScreenHeight(Ext.getBody().getHeight());
        }
    },

    onPainted: function() {
        var me = this;

        if (window.plugins.applicationPreferences) {
            window.plugins.applicationPreferences.get('noteDescriptionHeight', function(result) {
                var noteHeight = parseInt(result);
                var description = me.getInputDescriptionNote().getValue();

                if (noteHeight > 0 && description.length ) {
                    me.getInputDescriptionNote().setHeight(noteHeight);
                } else {
                    me.getInputDescriptionNote().setHeight(82);
                }
            }, function() {
                me.getInputDescriptionNote().setHeight(82);
            });
        }
    },
    onShow: function() {
        this.getInputDescriptionNote().getParent().getScrollable().getScroller().scrollToTop();
        this.setConfigChangeView();
    },

    onAutoSaveNote: function() {
        var me = this;
        var title = this.getInputTitleNote().getValue();
        var description = this.getInputDescriptionNote().getValue();
        var eventId = me.getView().getEventId();
        var sessionId = me.getView().getSessionId() || '';
        var noteId = me.getNoteId();
        if (description.length) {
            Personify.utils.Sqlite.insertTableNotes(title, description, sessionId, eventId, noteId, function(success) {

            });
        }
    },

    onClearTextFields: function() {
        this.getInputTitleNote().setValue(''),
        this.getInputDescriptionNote().setValue('');
    },
    
    onTextChange: function(field) {
        var textarea = Ext.DomQuery.select("textarea",field.element.dom)[0];
        var scrollHeight = textarea.scrollHeight;
        var clientHeight = textarea.clientHeight;
        var selectionEnd = textarea.selectionEnd;
        var textLength = textarea.textLength;
        
        if(clientHeight < scrollHeight){
            this.getInputDescriptionNote().setHeight(scrollHeight);

            if (window.plugins.applicationPreferences) {
                window.plugins.applicationPreferences.set('noteDescriptionHeight', scrollHeight, Ext.emptyFn,  Ext.emptyFn);
            }

            if(selectionEnd == textLength){
                this.getInputDescriptionNote().getParent().getScrollable().getScroller().scrollToEnd();
            }else{
                var scroll = this.getInputDescriptionNote().getParent().getScrollable().getScroller();
                scroll.scrollBy(0, scrollHeight - clientHeight);
            }
        }

        this.setConfigChangeView();
    },
    
    onClearText: function() {
        this.getInputDescriptionNote().setHeight(82);
        this.getInputDescriptionNote().getParent().getScrollable().getScroller().scrollToTop();
        this.setConfigChangeView();
    },

    destroy: function() {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            this.onAutoSaveNote();
            this.callParent(arguments);
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }

        return this.callParent(arguments);
    },

    setNoteTitle: function(title) {
        this.getInputTitleNote().setValue(title);
    },

    setNoteItemId: function(noteId) {
        this.setNoteId(noteId);
    },

    onTitleChange: function() {
        this.setConfigChangeView();
    },

    setConfigChangeView: function() {
        var title = this.getInputTitleNote().getValue();
        var description = this.getInputDescriptionNote().getValue();
        if (description.length > 0) {
            if (title.length == 0) {
                Personify.utils.Configuration.setAllowChangeView(false);
            } else {
                Personify.utils.Configuration.setAllowChangeView(true);
            }
        } else {
            Personify.utils.Configuration.setAllowChangeView(true);
        }
    },

    onClearTitle: function() {
        this.setConfigChangeView();
    },

    setContent: function(title, description) {
        this.getInputTitleNote().setValue(title);
        this.getInputDescriptionNote().setValue(description);
    },

    onShareCurrentNote: function() {
        if (Personify.utils.Configuration.getAllowChangeView()) {
            var me = this;
            if (window.plugins.socialsharing && window.plugins.socialsharing['shareWithOptions']) {
            	var title = me.getInputTitleNote().getValue() || '';
            	var description = me.getInputDescriptionNote().getValue() || '';
            	var content = "Title: " + title + "\n" + "Note: " + description + "\n";
            	var opts = {
            		message: content,
            		subject: title
            	};
                  
                window.plugins.socialsharing.shareWithOptions(opts, Ext.emptyFn, Ext.emptyFn);
            }
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },

    onDeleteNoteButton: function(callback) {
        var me = this;
        var noteId = me.getNoteId();
        if (noteId) {
            Personify.utils.Sqlite.deleteMyNote(noteId, function(success) {
                if (success) {
                    me.setNoteItemId(null);
                    me.onClearTextFields();

                    if (typeof callback == 'function') {
                        callback();
                    }
                    Ext.Msg.alert('', 'The note has been deleted.', Ext.emptyFn);
                }
            });
        }
        Personify.utils.Configuration.setAllowChangeView(true);
    }
});
