Ext.define('Personify.view.phone.exhibitor.DetailItemListExhibitorPhone', {
    extend: 'Ext.Container',
    xtype: 'detailItemListExhibitorPhone',
    controller: 'Personify.controller.phone.exhibitor.DetailItemListExhibitorPhone',

    requires: [
        'Personify.controller.phone.exhibitor.DetailItemListExhibitorPhone',
        'Personify.view.phone.common.Toolbar',
        'Personify.view.phone.exhibitor.ProductExItemPhone',
        'Personify.view.phone.exhibitor.ContactExItemPhone',
        'Personify.view.phone.note.NoteNavigation'
    ],

    config: {
        layout: 'vbox',
        flex: 1,
        meetingRecord: null,
        items: [
            {
                xtype: 'ptoolbar',
                itemId: 'ptoolbarDetailItemListExhibitorPhone',
                title: 'Exhibitor Detail'
            },
            {
                xtype: 'panel',
                cls: 'exhibitorScreenPhone',
                padding: '10px 10px 0px',
                flex: 1,
                scrollable: {
                    direction: 'vertical'
                },
                items: [
                    {
                        itemId: 'namePanel',
                        tpl: '<p><b>{name}</b></p>',
                        cls: 'nameProExItemDetailPhone'
                    },
                    {
                        xtype: 'button',
                        itemId: 'btnExihibitorDetailLocationPhone',
                        cls: 'btnExihibitorDetailPhone',
                        tpl: '<b>Booth:</b> {boothNos}'
                    },
                    {
                        layout: 'hbox',
                        flex: 1,
                        items: [
                            {
                                xtype: 'panel',
                                cls: 'panelExDesc',
                                height: '70px',
                                width: '60px',
                                items: [
                                    {
                                        itemId: 'imagePanel',
                                        xtype: 'panel',
                                        cls: 'extend-panelImgContEx',
                                        centered: true,
                                        tpl: '<img src="{imageURL}" width ="50px" height ="50px"/>'
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                cls: 'productListExItem',
                                flex: 1,
                                layout: 'vbox',
                                items: [
                                    {
                                        itemId: 'descPanel',
                                        tpl: '<p>{directoryDescription}</p>'
                                    },
                                    {
                                        style: 'margin-top: 5px;',
                                        html: '',
                                        docked: 'bottom'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        itemId: 'phonePanel',
                        cls: 'panelContactExItemDetailPhone',
                        tpl: '<p><b>Phone:</b> {phone} - Main</p>',
                        style: 'margin-top: 10px;'
                    },
                    {
                        itemId: 'faxPanel',
                        cls: 'panelContactExItemDetailPhone',
                        tpl: '<p><b>Fax:</b> {fax}</p>',
                        style: 'margin-top: 10px;'
                    },
                    {
                        xtyle: 'label',
                        itemId: 'websitePanel',
                        cls: 'panelContactExItemDetailPhone',
                        tpl: '<p><b>Web:</b> {webSiteURL}</p>'
                    },
                    {
                        html: '<b>Related:</b>',
                        style: 'font-size: 11pt;'
                    },
                    {
                        xtype: 'button',
                        itemId: 'btnExihibitorDetailProductPhone',
                        cls: 'btnExihibitorDetailPhone',
                        style: 'margin-top: 10px;'
                    },
                    {
                        xtype: 'button',
                        itemId: 'btnExihibitorDetailContactPhone',
                        cls: 'btnExihibitorDetailPhone'
                    },
                    {
                        xtype: 'button',
                        itemId: 'btnExihibitorDetailNotePhone',
                        cls: 'btnExihibitorDetailPhone'
                    },
                    {
                        layout: 'vbox',
                        docked: 'bottom',
                        items:[
                            {
                                xtype: 'button',
                                cls: 'btnAddMyExihibitorPhone',
                                text: 'Add to My Exhibitor',
                                itemId: 'addToMyExhibitor'
                            }
                        ]
                    }
                ]
            }
        ]
    },

    updateRecord: function(record) {
        if(record) {
            this.down('#namePanel').setRecord(record);
            this.down('#imagePanel').setRecord(record);
            this.down('#descPanel').setRecord(record);

            if (!record.get('boothNos') || record.get('boothNos') == '') {
                this.down('#btnExihibitorDetailLocationPhone').hide();
            } else {
                this.down('#btnExihibitorDetailLocationPhone').setRecord(record);
            }

            if (!record.get('phone') || record.get('phone') == '') {
                this.down('#phonePanel').hide();
            } else {
                this.down('#phonePanel').setRecord(record);
            }

            if (!record.get('fax') || record.get('fax') == '') {
                this.down('#faxPanel').hide();
            } else {
                this.down('#faxPanel').setRecord(record);
            }

            if (!record.get('webSiteURL') || record.get('webSiteURL') == '') {
                this.down('#websitePanel').hide();
            } else {
                this.down('#websitePanel').setRecord(record);
            }
        }
    }
});
