Ext.define('Personify.view.phone.session.SessionItem', {
    extend: 'Ext.Panel',
    config: {
        layout: 'vbox',
        items: [
            {
                html: '{title}',
                cls: 'p-phone-lable-sessionitem'
            },
            {
                html: '{[Personify.utils.ItemUtil.getHourEventView(Personify.utils.ItemUtil.convertStringToDateSession(values.startDateTimeString))]}{[this.checkLocationNull(values.locationDescription)]}',
                cls: 'p-phone-lable-sessionitem'
            },
            {
                html: ''
            }
        ]
    }
});
