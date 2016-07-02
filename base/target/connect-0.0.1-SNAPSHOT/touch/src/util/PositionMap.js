Ext.define("Ext.util.PositionMap",{config:{minimumHeight:50},constructor:function(a){this.map=[];this.adjustments={};this.offset=0;this.initConfig(a)},populate:function(d,g){var f=this.map=this.map||[],a=this.getMinimumHeight(),b,e,c;g=g||0;d++;f.length=d;f[0]=0;for(b=g+1,c=d-1;b<=c;b++){e=b-1;f[b]=f[e]+a}this.adjustments={indices:[],heights:{}};this.offset=0;for(b=1,c=d-1;b<=c;b++){e=b-1;this.offset+=f[b]-f[e]-a}},setItemHeight:function(b,a){a=Math.max(a,this.getMinimumHeight());if(a!==this.getItemHeight(b)){var c=this.adjustments;c.indices.push(parseInt(b,10));c.heights[b]=a}},update:function(){var d=this.adjustments,n=d.indices,l=d.heights,a=this.map,k=n.length,o=this.getMinimumHeight(),c=0,f,e,m,h,g,b;if(!d.indices.length){return false}Ext.Array.sort(n,function(j,i){return j-i});for(f=0;f<k;f++){h=n[f];g=n[f+1]||a.length-1;b=(a[h+1]!==undefined)?(a[h+1]-a[h]+c):o;m=l[h];c+=m-b;for(e=h+1;e<=g;e++){a[e]+=c}}this.offset+=c;this.adjustments={indices:[],heights:{}};return true},getItemHeight:function(a){return this.map[a+1]-this.map[a]},getTotalHeight:function(){return((this.map.length-1)*this.getMinimumHeight())+this.offset},findIndex:function(a){return this.map.length?this.binarySearch(this.map,a):0},binarySearch:function(b,d){var f=0,a=b.length;if(d<b[0]){return 0}if(d>b[a-1]){return a-1}while(f+1<a){var c=(f+a)>>1,e=b[c];if(e==d){return c}else{if(e<d){f=c}else{a=c}}}return f}});