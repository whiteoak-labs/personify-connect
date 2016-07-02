Ext.define("Personify.controller.event.complexevent.notes.NoteListPanel",{extend:"Personify.base.Controller",control:{noteList:{itemtap:"onItemTapNoteList"},shareAllNote:{tap:"onTapShareAllNote"},addNewButton:{tap:"onAddNewNoteButtonTap"}},init:function(){},setStore:function(a){if(a){this.getNoteList().setStore(a)}},onItemTapNoteList:function(g,c,i,a,h,d){var f=this;if(h.target.className.indexOf("x-button")>=0){Ext.Msg.confirm("","Are you sure you want to delete the Note",b);function b(e){Ext.Msg.hide();if(e=="yes"){Ext.Viewport.setMasked({xtype:"loadmask"});Personify.utils.Sqlite.deleteMyNote(a.get("noteId"),function(j){Ext.Viewport.setMasked(false);if(j){f.getView().fireEvent("addnewnote");Ext.Msg.alert("","Note has been deleted.",Ext.emptyFn)}else{Ext.Msg.alert("","Delete Note Failed.",Ext.emptyFn)}})}}}else{this.getView().fireEvent("onselectnote",a)}},onTapShareAllNote:function(){var a=this;if(window.plugins.social&&window.plugins.social.available){window.plugins.social.available(function(c){if(c==1){var b=a.getNoteList().getStore();var g="";for(var e=0;e<b.getAllCount();e++){var d=b.getAt(e);var h=d.get("title");var f=d.get("description");g+="Title: "+h+"\nNote: "+f+"\n\n"}window.plugins.social.share(g,"","")}else{target.addCls("x-item-pressed");Ext.Msg.alert("","Social network plugins is not supported.",Ext.emptyFn)}})}},onAddNewNoteButtonTap:function(){this.getView().fireEvent("addnewnote")},setSelectedItem:function(a){this.getNoteList().select(a)}});