/*
 * Base class for controller
 *  - Support auto-layout when orientation changes
 */
Ext.define('Personify.base.Controller', {
    extend: 'Deft.mvc.ViewController',
    
    config: {

        // contains sub-views configuration 
        subviews: null,
        
        // supported layouts configuration
        layouts: null,
        
        // default orientation name
        defaultOrientation: null,
        
        // current layout of view
        currentLayout: null
    },
    
    init: function() {
        this.callParent(arguments);
        
        var layouts = this.getLayouts();
        var me = this;
        
        // check if layouts exists then initialize them
        if (layouts) {
            this.initLayouts();
            this.initSubviews();
            
            // and re-layout view with current orientation
            var currentOrientation = Ext.Viewport.getOrientation();
            this.relayout(Ext.Viewport, currentOrientation, true);
        }
        
        // add listener to orientation change to re-layout if needed
        Ext.Viewport.setListeners({
            orientationchange: {
                fn: this.onOrientationChange,
                scope: me
            }
        });
    },
    
    destroy: function() {
        var me = this;
        var layouts = this.getLayouts();
        
        // check if layouts exists then destroy them
        if (layouts) {
            // remove orientation change listener
            Ext.Viewport.removeListener({
                orientationchange: {
                    fn: this.onOrientationChange,
                    scope: me
                }
            });
            
            // remove current layout from view
            var view = this.getView();
            var currentLayout = this.getCurrentLayout();
            view.remove(currentLayout, false);
            
            // destroy all layouts
            for (var orientation in layouts) {
                var layout = layouts[orientation];
                layout.destroy();
            }
            
            // destroy all sub-views
            var subviews = this.getSubviews();
            
            for (var container in subviews) {
                var subview = subviews[container];
                subview.destroy();
            }
        }
        
        return this.callParent(arguments);
    },
    
    onOrientationChange: function(viewport, orientation) {
        var layouts = this.getLayouts();
        
        if (layouts) {
            // just re-layout when orientation change
            this.relayout(viewport, orientation, true);
        }
        
        this.updateSize(orientation);
    },
    
    // create all sub-views from class name, override to create custom sub-views objects
    initSubviews: function() {
        var subviews = this.getSubviews();
        
        for (var container in subviews) {
            var subview = subviews[container];
            
            if (typeof subview === 'string') {
                subview = Ext.create(subview);
                subviews[container] = subview;
            }
        }
    },
    
    // create all layouts from class name, override to create custom layouts objects
    initLayouts: function() {
        var layouts = this.getLayouts();
        
        for (var orientation in layouts) {
            var layout = layouts[orientation];
            
            if (typeof layout === 'string') {
                layout = Ext.create(layout);
                layouts[orientation] = layout;
            }
        }
    },
    
    // get layout for a orientation, use default layout or not when that orientation is not available
    getLayout: function(orientation, useDefault) {
        var layouts = this.getLayouts();
        var layout = layouts[orientation];
        
        if (layout) {
            return layout;
        } else {
            if (useDefault) {
                var defaultOrientation = this.getDefaultOrientation();
                return this.getLayout(defaultOrientation, false);
            } else {
                return null;
            }
        }
    },
    
    // does this view have layout for a orientation?
    hasLayoutForOrientation: function(orientation) {
        var layouts = this.getLayouts();
        return (layouts[orientation] == null);
    },
    
    // re-layout view for a orientation with default orientation options
    relayout: function(viewport, orientation, useDefault) {
        var layout = this.getLayout(orientation, useDefault);
        var currentLayout = this.getCurrentLayout();
        
        // if new layout and current layout are the same, we don't need to do anything
        if (layout && layout != currentLayout) {
            var view = this.getView();
            
            // remove current layout from view and remove sub-views from layout
            if (currentLayout) {
                view.remove(currentLayout, false);
                currentLayout.setSubviews(null);
            }
            
            // then add sub-views to new layout and add layout to view
            this.setCurrentLayout(layout);
            view.add(layout);
            
            var subviews = this.getSubviews();
            layout.setSubviews(subviews);
        }
    },
    
    updateSize: function(orientation) {
    }
});
