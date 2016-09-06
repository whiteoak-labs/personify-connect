Ext.define('Personify.controller.event.EventMenuList', {
    extend: 'Personify.base.Controller',

    control: {
        titleLabel: {},
        eventMenuList: {
            itemtap: 'onMenuItemTapped'
        }
    },

    setTitle: function(newTitle) {
        if(this.getView()) {
            this.getTitleLabel().setHtml(newTitle);
            this.getTitleLabel().setHidden(false);
        }
    },
    
    updateScrollable: function(value){
           
        this.getEventMenuList().setScrollable(value);
        if(value){
            this.getEventMenuList().setStyle('-webkit-box-flex: 1;');
        }else{
            this.getEventMenuList().setStyle('-webkit-box-flex: 0;');
        }
    },
    
    setStore: function(store) {
         
        this.getEventMenuList().setStore(store);
    },

    setSelectedMenu: function(index) {
        
       this.getEventMenuList().select(index);
       this.getView().fireEvent('onMenuItemTapped', this.getEventMenuList().getStore().getAt(index));
    },
    
    onMenuItemTapped: function(dataView, index, target, record, event, eOpts) {
           
        if (Personify.utils.Configuration.getAllowChangeView()) {
            this.getView().fireEvent('onMenuItemTapped', record);
        } else {
            Ext.Msg.alert('', 'Please enter the note title.', Ext.emptyFn);
        }
    }
});