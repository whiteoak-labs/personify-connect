Ext.define("Ext.util.translatable.CssTransform",{extend:"Ext.util.translatable.Dom",doTranslate:function(a,c){var b=this.getElement();if(!this.isDestroyed&&!b.isDestroyed){b.translate(a,c)}},destroy:function(){var a=this.getElement();if(a&&!a.isDestroyed){a.dom.style.webkitTransform=null}this.callSuper()}});