Ext.define("Ext.mixin.Sortable",{extend:"Ext.mixin.Mixin",requires:["Ext.util.Sorter"],mixinConfig:{id:"sortable"},config:{sorters:null,defaultSortDirection:"ASC",sortRoot:null},dirtySortFn:false,sortFn:null,sorted:false,applySorters:function(a,b){if(!b){b=this.createSortersCollection()}b.clear();this.sorted=false;if(a){this.addSorters(a)}return b},createSortersCollection:function(){this._sorters=Ext.create("Ext.util.Collection",function(a){return a.getId()});return this._sorters},addSorter:function(b,a){this.addSorters([b],a)},addSorters:function(c,a){var b=this.getSorters();return this.insertSorters(b?b.length:0,c,a)},insertSorter:function(a,c,b){return this.insertSorters(a,[c],b)},insertSorters:function(e,h,a){if(!Ext.isArray(h)){h=[h]}var f=h.length,j=a||this.getDefaultSortDirection(),c=this.getSortRoot(),k=this.getSorters(),l=[],g,b,m,d;if(!k){k=this.createSortersCollection()}for(b=0;b<f;b++){m=h[b];g={direction:j,root:c};if(typeof m==="string"){d=k.get(m);if(!d){g.property=m}else{if(a){d.setDirection(a)}else{d.toggle()}continue}}else{if(Ext.isFunction(m)){g.sorterFn=m}else{if(Ext.isObject(m)){if(!m.isSorter){if(m.fn){m.sorterFn=m.fn;delete m.fn}g=Ext.apply(g,m)}else{l.push(m);if(!m.getRoot()){m.setRoot(c)}continue}}else{Ext.Logger.warn("Invalid sorter specified:",m)}}}m=Ext.create("Ext.util.Sorter",g);l.push(m)}for(b=0,f=l.length;b<f;b++){k.insert(e+b,l[b])}this.dirtySortFn=true;if(k.length){this.sorted=true}return k},removeSorter:function(a){return this.removeSorters([a])},removeSorters:function(d){if(!Ext.isArray(d)){d=[d]}var b=d.length,c=this.getSorters(),a,e;for(a=0;a<b;a++){e=d[a];if(typeof e==="string"){c.removeAtKey(e)}else{if(typeof e==="function"){c.each(function(f){if(f.getSorterFn()===e){c.remove(f)}})}else{if(e.isSorter){c.remove(e)}}}}if(!c.length){this.sorted=false}},updateSortFn:function(){var a=this.getSorters().items;this.sortFn=function(d,c){var f=a.length,b,e;for(e=0;e<f;e++){b=a[e].sort.call(this,d,c);if(b!==0){break}}return b};this.dirtySortFn=false;return this.sortFn},getSortFn:function(){if(this.dirtySortFn){return this.updateSortFn()}return this.sortFn},sort:function(a){Ext.Array.sort(a,this.getSortFn());return a},findInsertionIndex:function(b,e,g){var h=0,a=b.length-1,d=g||this.getSortFn(),c,f;while(h<=a){c=(h+a)>>1;f=d(e,b[c]);if(f>=0){h=c+1}else{if(f<0){a=c-1}}}return h}});