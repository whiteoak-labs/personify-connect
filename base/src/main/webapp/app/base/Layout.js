/*
 * Base class for layout
 *  - Support auto-layout when orientation changes
 */
Ext.define('Personify.base.Layout', {
    extend : 'Ext.Panel',
    
    config : {
        // contains all sub-views object for this layout
        // layout will use this to add or remove sub-views
        subviews: null
    },
    
    applySubviews: function(newSubviews, oldSubviews) {
        // when apply new sub-views, layout will remove all old sub-views first
        for (var container in oldSubviews) {
            var containers = Ext.ComponentQuery.query('#' + container, this);
            
            if (containers.length) {
                containers[0].removeAll();
            }
        }
        
        // then add new sub-views to its container
        for (var container in newSubviews) {
            var containers = Ext.ComponentQuery.query('#' + container, this);
            
            if (containers.length) {
                var subview = newSubviews[container];
                containers[0].add(subview);
            }
        }
    },
    
    destroy: function() {
        // set sub-views to null to remove all sub-views from layout
        this.setSubviews(null);
        
        this.callParent(arguments);
    }
});
