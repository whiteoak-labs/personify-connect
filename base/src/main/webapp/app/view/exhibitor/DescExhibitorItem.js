Ext.define('Personify.view.exhibitor.DescExhibitorItem', {
    extend: 'Ext.Panel',
    xtype: 'descExhibitorItem',

    config: {
        layout: 'hbox',
        items:[
            {
                xtype: 'panel',
                cls: 'panelExDesc',
                height: '110px',
                width: '126px',
                items: [
                    {
                        itemId: 'imagePanel',
                        xtype: 'panel',
                        cls: 'panelImgContExDesc',
                        height: '90px',
                        centered: true,
                        tpl: '<img src="{imageURL}" width ="116px" height ="90px"/>'
                    }
                ]
            },
            {
                xtype: 'panel',
                cls: 'panelContentExDesc',
                flex: 3,
                layout: 'vbox',
                items: [
                    {
                        itemId: 'namePanel',
                        tpl: '<p style="margin-bottom: 8px;"><b>{name}</b></p>'
                    },
                    {
                        itemId: 'locationPanel',
                        tpl: 'Booth: <b>{boothNos}</b>'
                    },
                    {
                        itemId: 'phonePanel',
                        tpl: '{phone} - Main'
                    },
                    {
                        itemId: 'faxPanel',
                        tpl: '{fax} - Fax'
                    },
                    {
                        itemId: 'websitePanel',
                        tpl: '{webSiteURL}'
                    }
                ]
            }
        ]
    },

    updateRecord: function(record) {
        if(record) {
            this.down('#namePanel').setRecord(record);
            this.down('#imagePanel').setRecord(record);

            if (!record.get('boothNos') || record.get('boothNos') == '') {
                this.down('#locationPanel').hide();
            } else {
                this.down('#locationPanel').setRecord(record);
                this.down('#locationPanel').show();
            }

            if (!record.get('phone') || record.get('phone') == '') {
                this.down('#phonePanel').hide();
            } else {
                this.down('#phonePanel').setRecord(record);
                this.down('#phonePanel').show();
            }

            if (!record.get('fax') || record.get('fax') == '') {
                this.down('#faxPanel').hide();
            } else {
                this.down('#faxPanel').setRecord(record);
                this.down('#faxPanel').show();
            }

            if (!record.get('webSiteURL') || record.get('webSiteURL') == '') {
                this.down('#websitePanel').hide();
            } else {
                this.down('#websitePanel').setRecord(record);
                this.down('#websitePanel').show();
            }
        }
    }
});
