Ext.define("Ext.mixin.Traversable",{extend:"Ext.mixin.Mixin",mixinConfig:{id:"traversable"},setParent:function(a){this.parent=a;return this},hasParent:function(){return Boolean(this.parent)},getParent:function(){return this.parent},getAncestors:function(){var b=[],a=this.getParent();while(a){b.push(a);a=a.getParent()}return b},getAncestorIds:function(){var b=[],a=this.getParent();while(a){b.push(a.getId());a=a.getParent()}return b}});