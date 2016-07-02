Ext.define('Personify.view.phone.exhibitor.ContactItemExItemPhone', {
    extend: 'Ext.Panel',

    config: {
        layout: 'hbox',
        items: [
            {
                layout: 'vbox',
                items: [
                    {
                        html: '<p><b>{name}</b></p>'
                    },
                    {
                        html: '<p><b>Phone:</b> {phone}</p>'
                    },
                    {
                        html: '<p><b>Fax:</b> {fax}</p>'
                    },
                    {
                        html: '<p><b>Email:</b> {email}</p><br />'
                    }
                ]
            }
        ]
    }
});