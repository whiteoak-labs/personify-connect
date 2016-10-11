Ext.define('Personify.controller.event.complexevent.notes.NoteListPanel', {
    extend: 'Personify.base.Controller',
    
    control: {
        noteList: {
            itemtap: 'onItemTapNoteList'
        },
        shareAllNote: {
            tap: 'onTapShareAllNote'
        },
        addNewButton: {
            tap: 'onAddNewNoteButtonTap'
        }
    },
    
    init: function() {
        
    },
    
    setStore: function(store){
        if(store){
            this.getNoteList().setStore(store);
        }
    },
    
    onItemTapNoteList: function(list, index, target, record, e, eOpts) {
        var me = this;
        if (e.target.className.indexOf('x-button') >= 0) {
            Ext.Msg.confirm('', "Are you sure you want to delete the Note", processResult);
            function processResult(clickedButton) {
                Ext.Msg.hide();
                if(clickedButton == 'yes'){
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
        }else{
            this.getView().fireEvent('onselectnote', record);
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
        this.getView().fireEvent('addnewnote');
    },
    
    setSelectedItem: function(index) {
        this.getNoteList().select(index);
     }
});
