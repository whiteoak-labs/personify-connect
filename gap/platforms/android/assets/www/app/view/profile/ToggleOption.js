Ext.define('Personify.view.profile.ToggleOption', {
    extend: 'Ext.Panel',
    xtype: 'toggleoption',
    requires: [
        'Personify.controller.profile.ToggleOption',
        'Ext.field.Toggle'
    ],
    controller: 'Personify.controller.profile.ToggleOption',
    config: {
        cls: 'toggle-option',
        items: [
            {
                xtype: 'togglefield',
                itemId: 'toggleDirectory',
                labelAlign: 'top',
                label: 'Include in Print Directory',
                cls: 'ios5_toggle',
                labelCls: 'ios5_toggle_label',
                listeners: {
                    initialize: function () {
                        
                        var me = this;
                        var mec = this.getComponent();
                        var mythumb = this.element.down('.x-thumb');
                        var mytoggle = this.element.down('.x-toggle');
                        var myelement = this.element;
                        
                        mythumb.on({
                            // this improves the ON/OFF effect 
                            drag: {
                                fn: function () {
                                    var value,oldvalue,onCls,offCls;
                                    oldvalue=null;
                                    value = me.getValue();
                                    onCls = me.getMaxValueCls(),
                                    offCls = me.getMinValueCls();
                                    if(value != oldvalue) {
                                        mytoggle.addCls(value ? onCls : offCls);
                                        mytoggle.removeCls(value ? offCls : onCls);
                                    }
                                    oldvalue = value;
                                }
                            },
                            /* this improves the tap action (responds to tap on thumb) */
                            tap: {
                                fn: function (e,t) {
                                    var value,oldValue,onCls,offCls,thumb;
                                    oldValue=null;
                                    thumb=null;
                                    oldValue = me.getValue();
                                    value = ((me.getValue()==1) ? 0 : 1);
                                    mec.setIndexValue(0, value, mec.getAnimation());
                                    onCls = me.getMaxValueCls(),
                                    offCls = me.getMinValueCls();
                                    mytoggle.addCls(value ? onCls : offCls);
                                    mytoggle.removeCls(value ? offCls : onCls);
                                }
                            }
                        });
                        
                    } // initialize
                }//listensers
            },
            {
                xtype: 'togglefield',
                label: 'In Web/Mobile Directory',
                itemId: 'toggleMobileDirectory',
                labelAlign: 'top',
                cls: 'ios5_toggle',
                labelCls: 'ios5_toggle_label',
                
                listeners: {
                    initialize: function () {
                        var me = this;
                        var mec = this.getComponent();
                        var mythumb = this.element.down('.x-thumb');
                        var mytoggle = this.element.down('.x-toggle');
                        var myelement = this.element;
                        
                        mythumb.on({
                            // this improves the ON/OFF effect 
                            drag: {
                                fn: function () {
                                    var value,oldvalue,onCls,offCls;
                                    oldvalue=null;
                                    value = me.getValue();
                                    onCls = me.getMaxValueCls(),
                                    offCls = me.getMinValueCls();
                                    if(value != oldvalue) {
                                        mytoggle.addCls(value ? onCls : offCls);
                                        mytoggle.removeCls(value ? offCls : onCls);
                                    }
                                    oldvalue = value;
                                }
                            },
                            // this improves the tap action (responds to tap on thumb)
                            tap: {
                                fn: function (e,t) {
                                    var value,oldValue,onCls,offCls,thumb;
                                    oldValue=null;
                                    thumb=null;
                                    oldValue = me.getValue();
                                    value = ((me.getValue()==1) ? 0 : 1);
                                    mec.setIndexValue(0, value, mec.getAnimation());
                                    onCls = me.getMaxValueCls(),
                                    offCls = me.getMinValueCls();
                                    mytoggle.addCls(value ? onCls : offCls);
                                    mytoggle.removeCls(value ? offCls : onCls);
                                }
                            }
                        });
                    } // initialize
                }//listensers
            }
        ]
    },
   updateRecord: function(record) {
           if(record) {
            this.getController().setRecord(record);
           }
       }
});
