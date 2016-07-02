Ext.define("Ext.util.Sortable",{extend:"Ext.mixin.Mixin",isSortable:true,mixinConfig:{hooks:{destroy:"destroy"}},defaultSortDirection:"ASC",requires:["Ext.util.Sorter"],initSortable:function(){var a=this,b=a.sorters;a.sorters=Ext.create("Ext.util.AbstractMixedCollection",false,function(c){return c.id||c.property});if(b){a.sorters.addAll(a.decodeSorters(b))}},sort:function(g,f,c,e){var d=this,h,b,a;if(Ext.isArray(g)){e=c;c=f;a=g}else{if(Ext.isObject(g)){e=c;c=f;a=[g]}else{if(Ext.isString(g)){h=d.sorters.get(g);if(!h){h={property:g,direction:f};a=[h]}else{if(f===undefined){h.toggle()}else{h.setDirection(f)}}}}}if(a&&a.length){a=d.decodeSorters(a);if(Ext.isString(c)){if(c==="prepend"){g=d.sorters.clone().items;d.sorters.clear();d.sorters.addAll(a);d.sorters.addAll(g)}else{d.sorters.addAll(a)}}else{d.sorters.clear();d.sorters.addAll(a)}if(e!==false){d.onBeforeSort(a)}}if(e!==false){g=d.sorters.items;if(g.length){b=function(l,k){var j=g[0].sort(l,k),n=g.length,m;for(m=1;m<n;m++){j=j||g[m].sort.call(this,l,k)}return j};d.doSort(b)}}return g},onBeforeSort:Ext.emptyFn,decodeSorters:function(f){if(!Ext.isArray(f)){if(f===undefined){f=[]}else{f=[f]}}var d=f.length,g=Ext.util.Sorter,a=this.model?this.model.prototype.fields:null,e,b,c;for(c=0;c<d;c++){b=f[c];if(!(b instanceof g)){if(Ext.isString(b)){b={property:b}}Ext.applyIf(b,{root:this.sortRoot,direction:"ASC"});if(b.fn){b.sorterFn=b.fn}if(typeof b=="function"){b={sorterFn:b}}if(a&&!b.transform){e=a.get(b.property);b.transform=e?e.sortType:undefined}f[c]=Ext.create("Ext.util.Sorter",b)}}return f},getSorters:function(){return this.sorters.items},destroy:function(){this.callSuper();Ext.destroy(this.sorters)}});