Ext.data.utilities={delegate:function(c,b,a){if(b===undefined){throw"Error - Tried to delegate '"+a+"' to undefined instance."}a.forEach(function(e){var d=b[e];if(d===undefined){throw"Error - Tried to delegate undefined method '"+e+"' to "+b}c[e]=function(){return d.apply(b,arguments)}})},apply:function(b,d,c,e,f){var g=true;Ext.data.array.forEachAsync(d,function(i,a,h){if(g){c.push(a);c.push(h);g=false}b[i].apply(b,c)},b,e,f)},copy:function(d,b,a){var c=false;a.forEach(function(g){var f=d[g];var e=b[g];if(f!==undefined&&f!==e){b[g]=f;c=true}});return c},copyIfUndefined:function(d,b,a){var c=false;a.forEach(function(g){var f=d[g];var e=b[g];if(f!==undefined&&e===undefined){b[g]=f;c=true}});return c},check:function(f,c,e,a,b){if(a===undefined){var d="Error - "+f+"."+c+" - "+e+" not provided.";console.log(d);throw d}else{b.forEach(function(i){var h=a[i];if(h===undefined){var g="Error - "+f+"."+c+" - "+e+"."+i+" not provided.";console.log(g);throw g}})}},minus:function(d,c){var f,e={};for(f in d){if(d.hasOwnProperty(f)){if(c[f]===undefined){e[f]=d[f]}}}return e},intersection:function(d,c){var f,e={};for(f in d){if(d.hasOwnProperty(f)){if(c[f]!==undefined){e[f]=d[f]}}}return e}};