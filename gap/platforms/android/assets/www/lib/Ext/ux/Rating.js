Ext.define('Ext.ux.Rating', {
    extend: 'Ext.field.Field',
    xtype: 'rating',

    config: {
        baseCls: Ext.baseCSSPrefix + 'field x-rating-field',
        minValue: -1,
        defaultValue: -1,
        value: -1,
        clearCls: 'x-rating-clear',
        clearIcon: false,
        itemsCount: 5,
        itemCls: 'x-rating-star',
        itemHoverCls: 'x-rating-item-hover',
        tooltips: '',
        disabled: false,

        component: {
            xtype: 'component',
            tpl: [
                '<tpl for="items">',
                '<div index="{[xindex - 1]}" class="{parent.itemCls} x-rating-item">',
                '</div>',
                '</tpl>',
                '<tpl if="clearIcon">',
                '<div class="{clearCls}">',
                '</div>',
                '</tpl>'].join(""),
            cls: 'x-rating-inner'
        }
    },

    initialize: function() {
        var me = this;
        Ext.ux.Rating.superclass.initialize.apply(me, arguments);

        me.element.on({
            scope: me,
            touchstart: me.onTouchStart,
            touchmove: me.onTouchMove,
            preventDefault: true
        });
    },

    updateComponent: function(newComponent, oldComponent) {
        this.callParent(arguments);
        if (oldComponent) {
        }

        this.getComponent(); //why do we make this call?        
        var newConfig = Ext.applyIf({
            items: new Array(this.getItemsCount() || 0)
        }, this.config);
        newComponent._tpl.overwrite(newComponent.element.dom, newConfig);
        this.items = newComponent.element.select('.x-rating-item', newComponent.element.dom);
        if (this.config.clearIcon) {
            this.clearBtn = newComponent.element.down('.' + this.getClearCls());
            this.clearBtn.on('tap', this.onClear, this);
        }
    },

    onTouchStart: function(e) {
        if (this.clearBtn && e.target == this.clearBtn.dom) {
            this.onClear();
            return;
        }
        this.onTouchMove(e);
    },

    onTouchMove: function(e) {
        if (this.getDisabled()) {
            return;
        }
        var offset = this.innerElement.getXY();
        var x = e.touches[0].pageX - offset[0];
        if (!Ext.isDefined(this.diameter)) {
            if (this.items.getCount()) {
                var size = this.items.first().getSize();
                this.diameter = Math.min(size.height, size.width);
            }
            else {
                this.diameter = 0;
            }
        }
        var targetIndex = Math.floor(x / this.diameter);
        if (targetIndex > -1) {
            this.setValue(targetIndex);
        }
    },

    applyValue: function(value) {
        value = parseFloat(value);
        if (isNaN(value) || value === null) {
            value = this.getDefaultValue();
        }
        //round the value to 1 decimal
        value = Math.round(value * 10) / 10;

        this._value = value;
    },

    displayValue: function(value) {
        if (!this.rendered) {
            this.on('painted', Ext.Function.bind(this.displayValue, this, [value]), this, { single: true });
            return;
        }
        var items = this.items;
        var count = items.getCount();
        var itemCls = this.getItemCls();
        var hoverCls = this.getItemHoverCls();

        for (var i = 0; i < count; i++) {
            var item = items.item(i);
            item[i <= value ? 'addCls' : 'removeCls'](hoverCls);
            item[i <= value ? 'removeCls' : 'addCls'](itemCls);
        }
    },

    setValue: function(value) {
        var currentValue = this._value;
        value = parseFloat(value);
        if (isNaN(value) || value === null) {
            throw 'Argument exception: value argument is not a number.';
        }
        var minValue = this.getMinValue();
        //auto-correct user's input
        if (Ext.isNumber(minValue) && value < minValue) {
            value = minValue;
        }
        var count = this.items ? this.items.getCount() : this.itemsCount;
        if (this.items && value > this.items.getCount()) {
            value = this.items.getCount() - 1;
        }
        this.callParent([value]);
        this.displayValue(value);
        this.fireEvent('change', this, value, currentValue);
    },

    reset: function() {
        this.setValue(this.getDefaultValue());
    },

    onClear: function() {
        if (!this.getDisabled()) {
            this.setValue(this.getDefaultValue());
        }
    }
}, function() {
    Ext.deprecateProperty(this, 'showClear', 'clearIcon', "Ext.ux.Rating.showClear has been removed, use showClear instead");
    Ext.deprecateProperty(this, 'singleColorPerValue', null, "Ext.ux.Rating.singleColorPerValue has been removed");
    Ext.deprecateProperty(this, 'useClearIcon', null, "Ext.Rating.useClearIcon has been removed");
});
