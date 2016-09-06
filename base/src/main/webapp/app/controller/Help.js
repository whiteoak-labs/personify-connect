Ext.define('Personify.controller.Help', {
    extend: 'Personify.base.Controller',
    control: {
       view: {
           show:'onShow',
           hide:'onHide',
       }
    },

    onHide: function() {
           Personify.utils.BackHandler.popActionAndTarget('hide', this.getView());
   },
   
   onShow: function() {
           Personify.utils.BackHandler.pushActionAndTarget('hide', this.getView());
   },   
});