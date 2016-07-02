Ext.define('Personify.controller.phone.note.NoteNavigation', {
    extend: 'Personify.base.Controller',
    config: {
        listNote: null
    },

    control: {
        noteNavigationView: true,
        addNotePanel: {
            live: true,
            listeners: {
                backtomenu: 'onBackMenu',
                back: 'onBack'
            }
        },
        noteListPanel: {
            live: true,
            listeners: {
                backtomenu: 'onBackMenu',
                requestopendetail: 'openView'
            }
        }
    },

    init: function() {
        var eventId = this.getView().getEventId();
        var sessionId = this.getView().getSessionId();

        if (sessionId) {
            var addNotePanel = Ext.create('Personify.view.phone.note.AddNote', {
                xtype: 'addnotepanelphone'
            });
            addNotePanel.setItemId('addNotePanel');
            addNotePanel.setEventId(eventId);
            addNotePanel.setSessionId(sessionId);
            this.openView(addNotePanel, null);
        } else {
            var meetingRecord = this.getView().getRecord();
            var eventTitle = meetingRecord.get('shortName');
            var noteListPanel = Ext.create('Personify.view.phone.note.NoteListPanel', {
                xtype: 'notelistpanelphone',
                itemId: 'noteListPanel',
                eventId: eventId,
                title: eventTitle
            });
            this.openView(noteListPanel, null);
        }

        this.loadNoteList();
    },

    openView: function(view, config) {
        if (typeof view == 'string') {
            view = Ext.create(view, config);
        }
        view.addListener('back', this.onBack, this);
        view.addListener('backtomenu', this.onBackMenu, this);
        view.addListener('requestopendetail', this.openView, this);
        view.addListener('addnewnote', this.addNewNote, this);

        if (config && config.record) {
            var listeners = config.record.get('listeners');

            if (listeners) {
                for (var event in listeners) {
                    this.getView().addListener(event, listeners[event], view);
                }
            }
        }
        this.getView().fireEvent('updatelistnote');
        var noteNavigation = this.getNoteNavigationView();
        if (!noteNavigation.getActiveItem() || noteNavigation.getActiveItem().xtype != view.xtype) {
            noteNavigation.push(view);
        }
    },

    onRequestChangeView: function(view, config) {
        this.getView().fireEvent('requestchangeview', view, config);
    },

    onBackMenu: function() {
        this.getView().fireEvent('updatelistnote', this);
        this.getView().fireEvent('back', this);
    },

    onBack: function() {
        this.loadNoteList();
        this.getNoteNavigationView().pop();
    },

    addNewNote: function() {
        this.onBack();
        var record = this.getView().getRecord();
        var eventId = this.getView().getEventId();
        var sessionId = this.getView().getSessionId();
        this.openView('Personify.view.phone.note.ViewNote', {record: record, eventId: eventId, sessionId: sessionId});
    },

    loadNoteList: function() {
        var me = this;
        var eventId = this.getView().getEventId();
        var sessionId = this.getView().getSessionId();

        var attributes = {
            "eventId": eventId,
            "sessionId": sessionId
        };

        var storeManager = Personify.utils.ServiceManager.getStoreManager();
        var store = Ext.create(storeManager.getNoteListStore());
        store.setDataRequest(attributes);
        store.load({callback: function(records, operation, success) {
            if (sessionId) {//one note
                var record = me.getView().getRecord();
                var title = me.getView().getTitle() || record.get('shortName');
                me.getAddNotePanel().setTitle(title);

                if (records[0]) {
                    me.getAddNotePanel().setRecord(records[0]);
                    me.getAddNotePanel().getController().hiddenDeleteNoteButton(false);
                } else {
                    me.getAddNotePanel().getController().setNoteTitle(title);
                    me.getAddNotePanel().getController().hiddenDeleteNoteButton(true);
                }
            } else {// note list
                me.getNoteListPanel().setStore(store);
            }
        }});
    }
});
