Ext.define("Ext.util.Collection",{config:{autoFilter:true,autoSort:true},mixins:{sortable:"Ext.mixin.Sortable",filterable:"Ext.mixin.Filterable"},constructor:function(b,a){var c=this;c.all=[];c.items=[];c.keys=[];c.indices={};c.map={};c.length=0;if(b){c.getKey=b}this.initConfig(a)},updateAutoSort:function(a,b){if(b===false&&a&&this.items.length){this.sort()}},updateAutoFilter:function(b,a){if(a===false&&b&&this.all.length){this.filter()}},insertSorters:function(){this.mixins.sortable.insertSorters.apply(this,arguments);if(this.getAutoSort()&&this.items.length){this.sort()}return this},removeSorters:function(a){this.mixins.sortable.removeSorters.call(this,a);if(this.sorted&&this.getAutoSort()&&this.items.length){this.sort()}return this},applyFilters:function(a){var b=this.mixins.filterable.applyFilters.call(this,a);if(!a&&this.all.length&&this.getAutoFilter()){this.filter()}return b},addFilters:function(a){this.mixins.filterable.addFilters.call(this,a);if(this.items.length&&this.getAutoFilter()){this.filter()}return this},removeFilters:function(a){this.mixins.filterable.removeFilters.call(this,a);if(this.filtered&&this.all.length&&this.getAutoFilter()){this.filter()}return this},filter:function(c,b,d,a){if(c){if(Ext.isString(c)){this.addFilters({property:c,value:b,anyMatch:d,caseSensitive:a});return this.items}else{this.addFilters(c);return this.items}}this.items=this.mixins.filterable.filter.call(this,this.all.slice());this.updateAfterFilter();if(this.sorted&&this.getAutoSort()){this.sort()}},updateAfterFilter:function(){var a=this.items,f=this.keys,g=this.indices={},e=a.length,c,d,b;f.length=0;for(c=0;c<e;c++){d=a[c];b=this.getKey(d);g[b]=c;f[c]=b}this.length=a.length;this.dirtyIndices=false},sort:function(e,a){var d=this.items,h=this.keys,g=this.indices,c=d.length,b,j,f;if(e){this.addSorters(e,a);return this.items}for(b=0;b<c;b++){d[b]._current_key=h[b]}this.handleSort(d);for(b=0;b<c;b++){j=d[b];f=j._current_key;h[b]=f;g[f]=b;delete j._current_key}this.dirtyIndices=true},handleSort:function(a){this.mixins.sortable.sort.call(this,a)},add:function(i,k){var g=this,d=this.filtered,e=this.sorted,h=this.all,f=this.items,l=this.keys,j=this.indices,a=this.mixins.filterable,b=f.length,c=b;if(arguments.length==1){k=i;i=g.getKey(k)}if(typeof i!="undefined"&&i!==null){if(typeof g.map[i]!="undefined"){return g.replace(i,k)}g.map[i]=k}h.push(k);if(d&&this.getAutoFilter()&&a.isFiltered.call(g,k)){return null}g.length++;if(e&&this.getAutoSort()){c=this.findInsertionIndex(f,k)}if(c!==b){this.dirtyIndices=true;Ext.Array.splice(l,c,0,i);Ext.Array.splice(f,c,0,k)}else{j[i]=b;l.push(i);f.push(k)}return k},getKey:function(a){return a.id},replace:function(d,m){var i=this,g=i.sorted,f=i.filtered,b=i.mixins.filterable,h=i.items,n=i.keys,k=i.all,c=i.map,l=null,a=h.length,o,e,j;if(arguments.length==1){m=d;d=j=i.getKey(m)}else{j=i.getKey(m)}o=c[d];if(typeof d=="undefined"||d===null||typeof o=="undefined"){return i.add(j,m)}i.map[j]=m;if(j!==d){delete i.map[d]}if(g&&i.getAutoSort()){Ext.Array.remove(h,o);Ext.Array.remove(n,d);Ext.Array.remove(k,o);k.push(m);i.dirtyIndices=true;if(f&&i.getAutoFilter()){if(b.isFiltered.call(i,m)){if(a!==h.length){i.length--}return null}else{if(a===h.length){i.length++;l=m}}}e=this.findInsertionIndex(h,m);Ext.Array.splice(n,e,0,j);Ext.Array.splice(h,e,0,m)}else{if(f){if(i.getAutoFilter()&&b.isFiltered.call(i,m)){if(i.indexOf(o)!==-1){Ext.Array.remove(h,o);Ext.Array.remove(n,d);i.length--;i.dirtyIndices=true}return null}else{if(i.indexOf(o)===-1){h.push(m);n.push(j);i.indices[j]=i.length;i.length++;return m}}}e=i.indexOf(o);n[e]=j;h[e]=m;if(j!==d){this.dirtyIndices=true}}return l},addAll:function(h){var q=this,e=q.filtered,a=q.sorted,b=q.all,k=q.items,j=q.keys,p=q.map,l=q.getAutoFilter(),m=q.getAutoSort(),r=[],f=[],c=q.mixins.filterable,d=[],g,s,n,o;if(Ext.isObject(h)){for(s in h){if(h.hasOwnProperty(s)){f.push(k[s]);r.push(s)}}}else{f=h;g=h.length;for(n=0;n<g;n++){r.push(q.getKey(h[n]))}}for(n=0;n<g;n++){s=r[n];o=f[n];if(typeof s!="undefined"&&s!==null){if(typeof p[s]!="undefined"){q.replace(s,o);continue}p[s]=o}b.push(o);if(e&&l&&c.isFiltered.call(q,o)){continue}q.length++;j.push(s);k.push(o);d.push(o)}if(d.length){q.dirtyIndices=true;if(a&&m){q.sort()}return d}return null},each:function(e,d){var b=this.items.slice(),c=0,a=b.length,f;for(;c<a;c++){f=b[c];if(e.call(d||f,f,c,a)===false){break}}},eachKey:function(d,c){var f=this.keys,a=this.items,e=f.length,b;for(b=0;b<e;b++){d.call(c||window,f[b],a[b],b,e)}},findBy:function(e,d){var f=this.keys,b=this.items,c=0,a=b.length;for(;c<a;c++){if(e.call(d||window,b[c],f[c])){return b[c]}}return null},filterBy:function(e,d){var h=this,c=new this.self(),g=h.keys,a=h.all,f=a.length,b;c.getKey=h.getKey;for(b=0;b<f;b++){if(e.call(d||h,a[b],h.getKey(a[b]))){c.add(g[b],a[b])}}return c},insert:function(c,d,f){var e=this,a=this.sorted,g=this.map,b=this.filtered;if(arguments.length==2){f=d;d=e.getKey(f)}if(c>=e.length||(a&&e.getAutoSort())){return e.add(d,f)}if(typeof d!="undefined"&&d!==null){if(typeof g[d]!="undefined"){e.replace(d,f);return false}g[d]=f}this.all.push(f);if(b&&this.getAutoFilter()&&this.mixins.filterable.isFiltered.call(e,f)){return null}e.length++;Ext.Array.splice(e.items,c,0,f);Ext.Array.splice(e.keys,c,0,d);e.dirtyIndices=true;return f},insertAll:function(g,d){if(g>=this.items.length||(this.sorted&&this.getAutoSort())){return this.addAll(d)}var s=this,h=this.filtered,a=this.sorted,b=this.all,m=this.items,l=this.keys,r=this.map,n=this.getAutoFilter(),o=this.getAutoSort(),t=[],j=[],f=[],c=this.mixins.filterable,e=false,k,u,p,q;if(a&&this.getAutoSort()){Ext.Logger.error("Inserting a collection of items into a sorted Collection is invalid. Please just add these items or remove the sorters.")}if(Ext.isObject(d)){for(u in d){if(d.hasOwnProperty(u)){j.push(m[u]);t.push(u)}}}else{j=d;k=d.length;for(p=0;p<k;p++){t.push(s.getKey(d[p]))}}for(p=0;p<k;p++){u=t[p];q=j[p];if(typeof u!="undefined"&&u!==null){if(typeof r[u]!="undefined"){s.replace(u,q);continue}r[u]=q}b.push(q);if(h&&n&&c.isFiltered.call(s,q)){continue}s.length++;Ext.Array.splice(m,g+p,0,q);Ext.Array.splice(l,g+p,0,u);e=true;f.push(q)}if(e){this.dirtyIndices=true;if(a&&o){this.sort()}return f}return null},remove:function(c){var a=this.items.indexOf(c);if(a===-1){Ext.Array.remove(this.all,c);if(typeof this.getKey=="function"){var b=this.getKey(c);if(b!==undefined){delete this.map[b]}}return c}return this.removeAt(this.items.indexOf(c))},removeAll:function(a){if(a){var c=a.length,b;for(b=0;b<c;b++){this.remove(a[b])}}return this},removeAt:function(b){var g=this,a=g.items,f=g.keys,d=g.all,e,c;if(b<g.length&&b>=0){e=a[b];c=f[b];if(typeof c!="undefined"){delete g.map[c]}Ext.Array.erase(a,b,1);Ext.Array.erase(f,b,1);Ext.Array.remove(d,e);delete g.indices[c];g.length--;this.dirtyIndices=true;return e}return false},removeAtKey:function(a){return this.removeAt(this.indexOfKey(a))},getCount:function(){return this.length},indexOf:function(b){if(this.dirtyIndices){this.updateIndices()}var a=b?this.indices[this.getKey(b)]:-1;return(a===undefined)?-1:a},indexOfKey:function(b){if(this.dirtyIndices){this.updateIndices()}var a=this.indices[b];return(a===undefined)?-1:a},updateIndices:function(){var a=this.items,e=a.length,f=this.indices={},c,d,b;for(c=0;c<e;c++){d=a[c];b=this.getKey(d);f[b]=c}this.dirtyIndices=false},get:function(b){var d=this,a=d.map[b],c;if(a!==undefined){c=a}else{if(typeof b=="number"){c=d.items[b]}}return typeof c!="function"||d.getAllowFunctions()?c:null},getAt:function(a){return this.items[a]},getByKey:function(a){return this.map[a]},contains:function(b){var a=this.getKey(b);if(a){return this.containsKey(a)}else{return Ext.Array.contains(this.items,b)}},containsKey:function(a){return typeof this.map[a]!="undefined"},clear:function(){var a=this;a.length=0;a.items.length=0;a.keys.length=0;a.all.length=0;a.dirtyIndices=true;a.indices={};a.map={}},first:function(){return this.items[0]},last:function(){return this.items[this.length-1]},getRange:function(f,a){var e=this,c=e.items,b=[],d;if(c.length<1){return b}f=f||0;a=Math.min(typeof a=="undefined"?e.length-1:a,e.length-1);if(f<=a){for(d=f;d<=a;d++){b[b.length]=c[d]}}else{for(d=f;d>=a;d--){b[b.length]=c[d]}}return b},findIndexBy:function(d,c,h){var g=this,f=g.keys,a=g.items,b=h||0,e=a.length;for(;b<e;b++){if(d.call(c||g,a[b],f[b])){return b}}return -1},clone:function(){var e=this,f=new this.self(),d=e.keys,a=e.items,b=0,c=a.length;for(;b<c;b++){f.add(d[b],a[b])}f.getKey=e.getKey;return f},destroy:function(){this.callSuper();this.clear()}});