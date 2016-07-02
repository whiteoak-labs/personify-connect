Ext.define('Personify.view.phone.session.MySessionItem', {
    extend: 'Ext.Panel',
    config: {
        layout: 'vbox',
        items: [
            {
                html: '{title}',
                cls: 'p-phone-lable-sessionitem'
            },
            {
                html: '{[Personify.utils.ItemUtil.getHourEventView(Personify.utils.ItemUtil.convertStringToDate(values.startDateTimeString))]}{[this.checkLocationNull(values.location)]}',
                cls: 'p-phone-lable-sessionitem'
            },
            {
                html: ''
            }
        ]
    }
});
