Ext.define('Personify.view.community.CommunityList', {
    extend: 'Ext.dataview.List',
    xtype: 'communitylist',
    
    requires: [
        'Personify.store.base.Community',
        'Personify.view.community.CommunityItem'
    ],
    config: {
        cls: 'panel-left',
        store: null,
        xtype: 'list',
        pressedCls: '',
        selectedCls: '',
        disableSelection: true,
        itemTpl: null,
            
        
        listeners: {
            itemtap: function(bookmarkView, index, item, record, event) {
                var me = this;
                if (event.target.className.indexOf('x-button') >= 0) {
                    me.fireEvent('gotoprofile', record);
                }
            },
            
            itemtouchstart: function(dataview, index, target, record, e, eOpts){
                if(e.target.className.indexOf('x-button') < 0) {
                    target.addCls('x-item-pressed');
                }
            },
            
            itemtouchend: function(dataview, index, target, record, e, eOpts){
                target.removeCls('x-item-pressed');
            }
        }
    }, //end config
    
    initialize: function() {
        var template = Ext.create('Personify.view.community.CommunityItem');
        this.setItemTpl(new Ext.XTemplate(template.element.dom.innerHTML,
            {
                getTypeCls: function(type){
                    if (type =="t"){
                        return 'p-button-community-twitter-type'
                    }else{
                        return 'p-button-community-conversation-type'
                    }
                }
            }
        ));
        this.callParent(arguments);
        template.destroy();
        this.setStore(Ext.create('Personify.store.base.Community'));
    }
});
