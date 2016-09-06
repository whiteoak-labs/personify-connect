Ext.define('Personify.controller.phone.common.Toolbar', {
    extend: 'Personify.base.Controller',
    
    control: {
        view: {
           painted: 'onPainted'
        },
        navigationButton: {
            tap: 'onNavigationButtonTap',
            release: 'onReleaseNavigationButtonTap'
        },
        actionButton: {
            tap: 'onActionButtonTap'
        },
        backButtonArrow: true
    },
    init: function() {
        var me = this;
        this.getNavigationButton().element.addListener('touchstart', function() {
            me.onTapHoldNavigationButtion();
        }, this);

        this.getNavigationButton().setHidden(this.getView().getHiddenNavigationButton());
        this.getActionButton().setHidden(this.getView().getHiddenActionButton());
        this.setUI(this.getView().getUi());
    },
           
    onPainted: function() {
           // Adjust toolbar height when running in iOS to fit with new iOS 7 style
           if (Ext.os.is.iOS && Ext.os.version.major >= 7) {
            Ext.select(".p-toolbar-container").applyStyles("height: 62px; padding-top: 15px;");
           }
           
        var toolbarTitle = this.getView().getTitle(),
            navigationButtonWidth = this.getNavigationButton().element.dom.offsetWidth + 13,
            actionButtonWidth = this.getActionButton().element.dom.offsetWidth,
            windowWidth = this.getView().element.dom.offsetWidth;
        var reserveTitleSpace = windowWidth - (navigationButtonWidth + actionButtonWidth + 20);

        if (actionButtonWidth == 0) {
            reserveTitleSpace = windowWidth - (navigationButtonWidth + 55 + 20);
        }

        if (toolbarTitle.element.dom.offsetWidth > reserveTitleSpace) {
            var innerHtmlTitle = toolbarTitle.element.dom.firstChild,
                fontSize = 20;

            for (var i = fontSize; i > 0; i--) {
                innerHtmlTitle.setAttribute('style', 'font-size:' + i + 'px');
                if (toolbarTitle.element.dom.offsetWidth <= reserveTitleSpace) {
                    break;
                }
            }
        }
           
        Personify.utils.BackHandler.pushActionAndTarget('onNavigationButtonTap', this);
    },

    onNavigationButtonTap: function() {
        this.getView().fireEvent('onNavigationButtonTap', null);
       Personify.utils.BackHandler.popActionAndTarget('onNavigationButtonTap', this);
    },

    onActionButtonTap: function() {
        this.getView().fireEvent('actionButtonTap');
    },

    setActionText: function(text) {
        this.getActionButton().setText(text);
    },

    setActionCls: function(value){
        this.getActionButton().setCls(value);
    },

    setNavigationText: function(text) {
        this.getNavigationButton().setText(text);
    },

    setHiddenActionButton: function(value) {
        if(this.getView()) {
            this.getActionButton().setHidden(value);
        }
    },

    setHiddenNavigationButton: function(value) {
        if(this.getView()) {
            this.getNavigationButton().setHidden(value);
        }
    },

    setUI: function(UIString) {
        if(this.getView()) {
            var me = this;
            switch(UIString) {
                case 'gray': 
                    me.getView().setCls('p-toolbar p-toolbar-gray');
                    // me.getNavigationButton().setUi('back');
                    // me.getActionButton().setUi('gray');
                    break;
                
                case 'blue': 
                    me.getView().setCls('p-toolbar p-toolbar-blue');
                    // me.getNavigationButton().setUi('blue-back');
                    // me.getActionButton().setUi('blue');
                    break;
            }
            me.getView().setUi(UIString);
        }
    },

    onReleaseNavigationButtonTap: function() {
        this.getBackButtonArrow().setCls('p-button-back-arrow');
    },

    onTapHoldNavigationButtion: function() {
        this.getBackButtonArrow().setCls('p-pressed-button-back-arrow');
    }
});