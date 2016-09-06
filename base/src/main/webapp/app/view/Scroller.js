Ext.define('Personify.view.Scroller', {
    override: 'Ext.scroll.Scroller',

    stopAnimation: function() {
        if (this.getTranslatable()) {
            this.getTranslatable().stopAnimation();
        }
    }
});
