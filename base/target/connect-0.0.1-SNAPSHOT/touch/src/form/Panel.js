Ext.define("Ext.form.Panel",{alternateClassName:"Ext.form.FormPanel",extend:"Ext.Panel",xtype:"formpanel",requires:["Ext.XTemplate","Ext.field.Checkbox","Ext.Ajax"],config:{baseCls:Ext.baseCSSPrefix+"form",standardSubmit:false,url:null,enctype:null,baseParams:null,submitOnAction:false,record:null,method:"post",scrollable:{translatable:{translationMethod:"scrollposition"}},trackResetOnLoad:false,api:null,paramOrder:null,paramsAsHash:null,timeout:30,multipartDetection:true,enableSubmissionForm:true},getElementConfig:function(){var a=this.callParent();a.tag="form";a.children.push({tag:"input",type:"submit",style:"visibility: hidden; width: 0; height: 0; position: absolute; right: 0; bottom: 0;"});return a},initialize:function(){var a=this;a.callParent();a.element.on({submit:"onSubmit",scope:a})},applyEnctype:function(b){var a=this.element.dom||null;if(a){if(b){a.setAttribute("enctype",b)}else{a.setAttribute("enctype")}}},updateRecord:function(c){var a,b,d;if(c&&(a=c.fields)){b=this.getValues();for(d in b){if(b.hasOwnProperty(d)&&a.containsKey(d)){c.set(d,b[d])}}}return this},setRecord:function(a){var b=this;if(a&&a.data){b.setValues(a.data)}b._record=a;return this},onSubmit:function(b){var a=this;if(b&&!a.getStandardSubmit()){b.stopEvent()}else{if(a.getEnableSubmissionForm()){b.stopEvent()}this.submit(null,b)}},updateSubmitOnAction:function(a){if(a){this.on({action:"onFieldAction",scope:this})}else{this.un({action:"onFieldAction",scope:this})}},onFieldAction:function(a){if(this.getSubmitOnAction()){a.blur();this.submit()}},submit:function(a,f){a=a||{};var c=this,d=c.getValues(c.getStandardSubmit()||!a.submitDisabled),b=c.element.dom||{};if(this.getEnableSubmissionForm()){b=this.createSubmissionForm(b,d)}a=Ext.apply({url:c.getUrl()||b.action,submit:false,form:b,method:c.getMethod()||b.method||"post",autoAbort:false,params:null,waitMsg:null,headers:null,success:null,failure:null},a||{});return c.fireAction("beforesubmit",[c,d,a,f],"doBeforeSubmit")},createSubmissionForm:function(e,c){var a=this.getFields(),d,b,f,g,h;if(e.nodeType===1){e=e.cloneNode(false);for(d in c){b=document.createElement("input");b.setAttribute("type","text");b.setAttribute("name",d);b.setAttribute("value",c[d]);e.appendChild(b)}}for(d in a){if(a.hasOwnProperty(d)){f=a[d];if(f.isFile){if(!e.$fileswap){e.$fileswap=[]}h=f.getComponent().input;g=h.dom;b=g.cloneNode(true);g.parentNode.insertBefore(b,g.nextSibling);e.appendChild(g);e.$fileswap.push({original:g,placeholder:b})}else{if(f.isPassword){if(f.getComponent().getType!=="password"){f.setRevealed(false)}}}}}return e},doBeforeSubmit:function(r,n,d){var c=d.form||{},g=false;if(this.getMultipartDetection()===true){this.getFieldsAsArray().forEach(function(i){if(i.isFile===true){g=true;return false}});if(g){c.setAttribute("enctype","multipart/form-data")}}if(d.enctype){c.setAttribute("enctype",d.enctype)}if(r.getStandardSubmit()){if(d.url&&Ext.isEmpty(c.action)){c.action=d.url}var o=this.query("spinnerfield"),j=o.length,q,b;for(q=0;q<j;q++){b=o[q];if(!b.getDisabled()){b.getComponent().setDisabled(false)}}c.method=(d.method||c.method).toLowerCase();c.submit()}else{var m=r.getApi(),f=d.url||r.getUrl(),a=d.scope||r,h=d.waitMsg,s=function(i,t){if(Ext.isFunction(d.failure)){d.failure.call(a,r,i,t)}r.fireEvent("exception",r,i)},k=function(i,t){if(Ext.isFunction(d.success)){d.success.call(d.scope||r,r,i,t)}r.fireEvent("submit",r,i)},l;if(d.waitMsg){if(typeof h==="string"){h={xtype:"loadmask",message:h}}r.setMasked(h)}if(m){l=m.submit;if(typeof l==="string"){l=Ext.direct.Manager.parseMethod(l);if(l){m.submit=l}}if(l){return l(this.element,function(t,i,u){r.setMasked(false);if(u){if(t.success){k(i,t)}else{s(i,t)}}else{s(i,t)}},this)}}else{var e=Ext.merge({},{url:f,timeout:this.getTimeout()*1000,form:c,scope:r},d);delete e.success;delete e.failure;e.params=Ext.merge(r.getBaseParams()||{},d.params);e.header=Ext.apply({"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},d.headers||{});e.callback=function(t,z,u){var w=u.responseText,y=u.responseXML,A=Ext.Ajax.parseStatus(u.status,u);if(c.$fileswap){var i,x;Ext.each(c.$fileswap,function(B){i=B.original;x=B.placeholder;x.parentNode.insertBefore(i,x.nextSibling);x.parentNode.removeChild(x)});c.$fileswap=null;delete c.$fileswap}r.setMasked(false);if(u.success===false){z=false}if(z){if(A&&w&&w.length==0){z=true}else{if(!Ext.isEmpty(u.responseBytes)){z=A.success}else{if(Ext.isString(w)&&u.request.options.responseType==="text"){u.success=true}else{if(Ext.isString(w)){try{u=Ext.decode(w)}catch(v){u.success=false;u.error=v;u.message=v.message}}else{if(Ext.isSimpleObject(w)){u=w;Ext.applyIf(u,{success:true})}}}if(!Ext.isEmpty(y)){u.success=true}z=!!u.success}}if(z){k(u,w)}else{s(u,w)}}else{s(u,w)}};if(Ext.feature.has.XHR2&&e.xhr2){delete e.form;var p=new FormData(c);if(e.params){Ext.iterate(e.params,function(i,t){if(Ext.isArray(t)){Ext.each(t,function(u){p.append(i,u)})}else{p.append(i,t)}});delete e.params}e.data=p}return Ext.Ajax.request(e)}}},load:function(j){j=j||{};var g=this,d=g.getApi(),b=g.getUrl()||j.url,c=j.waitMsg,i=function(k,l){g.setValues(l.data);if(Ext.isFunction(j.success)){j.success.call(j.scope||g,g,k,l)}g.fireEvent("load",g,k)},f=function(k,l){if(Ext.isFunction(j.failure)){j.failure.call(scope,g,k,l)}g.fireEvent("exception",g,k)},h,a,e;if(j.waitMsg){if(typeof c==="string"){c={xtype:"loadmask",message:c}}g.setMasked(c)}if(d){h=d.load;if(typeof h==="string"){h=Ext.direct.Manager.parseMethod(h);if(h){d.load=h}}if(h){a=h.directCfg.method;e=a.getArgs(g.getParams(j.params),g.getParamOrder(),g.getParamsAsHash());e.push(function(l,k,m){g.setMasked(false);if(m){i(k,l)}else{f(k,l)}},g);return h.apply(window,e)}}else{if(b){return Ext.Ajax.request({url:b,timeout:(j.timeout||this.getTimeout())*1000,method:j.method||"GET",autoAbort:j.autoAbort,headers:Ext.apply({"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},j.headers||{}),callback:function(k,o,l){var n=l.responseText,m=Ext.Ajax.parseStatus(l.status,l);g.setMasked(false);if(o){if(m&&n.length==0){o=true}else{l=Ext.decode(n);o=!!l.success}if(o){i(l,n)}else{f(l,n)}}else{f(l,n)}}})}}},getParams:function(a){return Ext.apply({},a,this.getBaseParams())},setValues:function(k){var c=this.getFields(),g=this,a,h,j,e,b,d;k=k||{};for(a in k){if(k.hasOwnProperty(a)){h=c[a];j=k[a];if(h){if(Ext.isArray(h)){e=h.length;for(b=0;b<e;b++){d=h[b];if(d.isRadio){d.setGroupValue(j);break}else{if(d.isCheckbox){if(Ext.isArray(j)){d.setChecked((j.indexOf(d._value)!=-1))}else{d.setChecked((j==d._value))}}else{if(Ext.isArray(j)){d.setValue(j[b])}}}}}else{if(h.isRadio||h.isCheckbox){h.setChecked(j)}else{h.setValue(j)}}if(g.getTrackResetOnLoad()){h.resetOriginalValue()}}}}return this},getValues:function(g,l){var f=this.getFields(),m={},e=Ext.isArray,j,k,b,c,a,h,d;b=function(n,i){if(!l&&(!i||i==="null")||n.isFile){return}if(n.isCheckbox){k=n.getSubmitValue()}else{k=n.getValue()}if(!(g&&n.getDisabled())){if(n.isRadio){if(n.isChecked()){m[i]=k}}else{c=m[i];if(!Ext.isEmpty(c)){if(!e(c)){c=m[i]=[c]}if(e(k)){c=m[i]=c.concat(k)}else{c.push(k)}}else{m[i]=k}}}};for(a in f){if(f.hasOwnProperty(a)){j=f[a];if(e(j)){h=j.length;for(d=0;d<h;d++){b(j[d],a)}}else{b(j,a)}}}return m},reset:function(){this.getFieldsAsArray().forEach(function(a){a.reset()});return this},doSetDisabled:function(a){this.getFieldsAsArray().forEach(function(b){b.setDisabled(a)});return this},getFieldsAsArray:function(){var a=[],b=function(c){if(c.isField){a.push(c)}if(c.isContainer){c.getItems().each(b)}};this.getItems().each(b);return a},getFields:function(b){var a={},d;var c=function(e){if(e.isField){d=e.getName();if((b&&d==b)||typeof b=="undefined"){if(a.hasOwnProperty(d)){if(!Ext.isArray(a[d])){a[d]=[a[d]]}a[d].push(e)}else{a[d]=e}}}if(e.isContainer){e.items.each(c)}};this.getItems().each(c);return(b)?(a[b]||[]):a},getFieldsArray:function(){var a=[];var b=function(c){if(c.isField){a.push(c)}if(c.isContainer){c.items.each(b)}};this.items.each(b);return a},getFieldsFromItem:Ext.emptyFn,showMask:function(a,b){Ext.Logger.warn("showMask is now deprecated. Please use Ext.form.Panel#setMasked instead");a=Ext.isObject(a)?a.message:a;if(a){this.setMasked({xtype:"loadmask",message:a})}else{this.setMasked(true)}return this},hideMask:function(){this.setMasked(false);return this},getFocusedField:function(){var a=this.getFieldsArray(),c=a.length,d,b;for(b=0;b<c;b++){d=a[b];if(d.isFocused){return d}}return null},getNextField:function(){var a=this.getFieldsArray(),c=this.getFocusedField(),b;if(c){b=a.indexOf(c);if(b!==a.length-1){b++;return a[b]}}return false},focusNextField:function(){var a=this.getNextField();if(a){a.focus();return a}return false},getPreviousField:function(){var a=this.getFieldsArray(),c=this.getFocusedField(),b;if(c){b=a.indexOf(c);if(b!==0){b--;return a[b]}}return false},focusPreviousField:function(){var a=this.getPreviousField();if(a){a.focus();return a}return false}},function(){Ext.deprecateClassMethod(this,{loadRecord:"setRecord",loadModel:"setRecord"});this.override({constructor:function(a){if(a&&a.hasOwnProperty("waitMsgTarget")){delete a.waitMsgTarget}this.callParent([a])}})});