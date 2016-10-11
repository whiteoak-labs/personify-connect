Ext.define('Personify.controller.phone.note.AddNote', {
    extend: 'Personify.base.Controller',
    control: {
        inputTitleNote: {
            keyup: 'onTitleChange',
            clearicontap: 'onTitleChange'
        },
        inputDescriptionNote: {
            keyup: 'onTextChange',
            change: 'onTextChange',
            show: 'onShow',
            clearicontap: 'onClearText'
        },
        eventToolbar: {
            onNavigationButtonTap: 'onBack'
        },
        view: {
            updaterecord: 'onUpdateRecord',
            painted: 'onPainted'
        },
        shareCurrentButton: {
            tap: 'onShareCurrentNote'
        },
        deleteNoteButton: {
            tap: 'onDeleteNoteButton'
        }
    },

    config: {
        noteId: null
    },

    init: function() {
        this.getEventToolbar().getController().setHiddenActionButton(true);
        if (this.getView().getIsNoteList()) {
            this.onUpdateRecord();
            this.hiddenDeleteNoteButton(false);
        }
        if (this.getView().getIsAddNew()) {
            var title = this.getView().getTitle();
            this.setNoteTitle(title);
            this.hiddenDeleteNoteButton(true);
        }
    },

    onPainted: function() {
        var me = this;

        if (window.plugins.applicationPreferences) {
            window.plugins.applicationPreferences.get('noteDescriptionHeight', function(result) {
                var noteHeight = parseInt(result);
                var description = me.getInputDescriptionNote().getValue();
                if (noteHeight > 0 && description.length) {
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
        var record = this.getView().getRecord();
        var title = me.getInputTitleNote().getValue();
        var description = me.getInputDescriptionNote().getValue();
        var eventId = me.getView().getEventId();
        var sessionId = me.getView().getSessionId() || '';
        var noteId = null;

        me.getInputTitleNote().blur();
        me.getInputDescriptionNote().blur();

        if (record) {
            noteId = record.get('noteId');
        }

        if (description.length) {
            Ext.Viewport.setMasked({xtype: 'loadmask'});
            Personify.utils.Sqlite.insertTableNotes(title, description, sessionId, eventId, noteId, function(success) {
                Ext.Viewport.setMasked(false);
                if (success) {

                } else {
                    Ext.Msg.alert('', 'Cannot add this note.', Ext.emptyFn);
                }
            });
        }
    },

    onUpdateRecord: function() {
        var record = this.getView().getRecord();
        if (record) {
            this.getInputTitleNote().setValue(record.get('title'));
            this.getInputDescriptionNote().setValue(record.get('description'));
        }
    },

    onTextChange: function(field) {
        var textarea = Ext.DomQuery.select("textarea",field.element.dom)[0];
        var scrollHeight = textarea.scrollHeight;
        var clientHeight = textarea.clientHeight;
        var selectionEnd = textarea.selectionEnd;
        var textLength = textarea.textLength;

        if (clientHeight < scrollHeight) {
            this.getInputDescriptionNote().setHeight(scrollHeight);

            if (window.plugins.applicationPreferences) {
                window.plugins.applicationPreferences.set('noteDescriptionHeight', scrollHeight, Ext.emptyFn,  Ext.emptyFn);
            }

            if (selectionEnd == textLength) {
                this.getInputDescriptionNote().getParent().getScrollable().getScroller().scrollToEnd();
            } else {
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

    onBack: function() {
        this.getInputTitleNote().blur();
        this.getInputDescriptionNote().blur();

        if (Personify.utils.Configuration.getAllowChangeView()) {
            this.onAutoSaveNote();
            if (this.getView().getIsNoteList()) {
                this.getView().fireEvent('back');
            } else {
                this.getView().fireEvent('backtomenu', this);
            }
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    },

    setContent: function(title, description) {
        this.getInputTitleNote().setValue(title);
        this.getInputDescriptionNote().setValue(description);
    },

    onClearTextFields: function() {
        this.getInputTitleNote().setValue('');
        this.getInputDescriptionNote().setValue('');
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

    onTitleChange: function() {
        this.setConfigChangeView();
    },

    setNoteTitle: function(title) {
        this.getInputTitleNote().setValue(title);
    },

    onShareCurrentNote: function() {
        this.getInputTitleNote().blur();
        this.getInputDescriptionNote().blur();

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

    onDeleteNoteButton: function() {
        var me = this;

        me.getInputTitleNote().blur();
        me.getInputDescriptionNote().blur();

        Ext.Msg.confirm('', "Do you want to delete the note?", processResult);
        function processResult(clickedButton) {
            if (clickedButton == 'yes') {
                var record = me.getView().getRecord();
                var noteId = null;
                if (record) {
                    noteId = record.get('noteId');
                }

                if (noteId) {
                    Personify.utils.Sqlite.deleteMyNote(noteId, function(success) {
                        if (success) {
                            record.set('noteId', null);
                            me.hiddenDeleteNoteButton(true);
                            me.onClearTextFields();
                            me.setNoteTitle(me.getView().getTitle());
                            Ext.Msg.alert('', 'The note has been deleted.', Ext.emptyFn);
                        }
                    });
                }

                Personify.utils.Configuration.setAllowChangeView(true);
            }
        }
    },

    hiddenDeleteNoteButton: function(hidden) {
        this.getDeleteNoteButton().setHidden(hidden);
    }
});
