Ext.define('Personify.view.phone.map.Map', {
    extend: 'Ext.Panel',
    xtype: 'mappanelphone',
    controller: 'Personify.controller.phone.map.Map',

    requires: [
        'Personify.controller.phone.map.Map',
        'Personify.view.phone.common.APAPanel'
    ],

    config: {
        layout: 'vbox',
        cls: 'exhibitorScreenPhone',
        items: [
            {
                xtype: 'apaPanel',
                itemId: 'apaPanelMap',
                cls: 'apaPanelExhibitor',
                flex: 0.94
            },
            {
                
                flex: 5,
                layout: 'hbox',
                items: [
                    {
                        xtype: 'image',
                        cls: 'prev-map-phone',
                        flex: 1,
                        itemId: 'prevMapPhone',
                        src: 'resources/images/home/next.png'
                    },
                    {
                        xtype: 'container',
                        flex: 4,
                        scrollable: {
                            direction: 'vertical',
                            directionLock: true
                        },
                        items: [
                            {
                                itemId: 'mapSchema',
                                cls: 'map-schema-phone',
                                xtype: 'mapschema',
                                listeners : {
                                    tap : function (eventt, node, options, eOpts) {
                                        var x = node.event.layerX; 
                                        var y = node.event.layerY;
                                        var popup = Ext.create('Ext.Panel', {
                                                    modal      : true,
                                                    centered   : true,
                                                    width      : 400,
                                                    height     : 300,
                                                    layout     : 'fit',
                                                    scrollable : true,
                                                    html: x+' -- '+ y,
                                                    hideOnMaskTap: true
                                                });
                                                Ext.Viewport.add(popup);
                                                popup.show();
                                    }
                                }
                            },
                            {
                                xtype: 'label',
                                itemId: 'markerMap'
//                                cls: 'marker-map'
                            }
                        ]
                    },
                    {
                        xtype: 'image',
                        cls: 'next-map-phone',
                        flex: 1,
                        itemId: 'nextMapPhone',
                        src: 'resources/images/home/next.png'
                    }
                ]
            }
        ]
    }
});