Ext.define("Ext.ux.MenuButton",{extend:"Ext.Button",requires:["Ext.ux.ContextMenu"],config:{ui:"tab",cls:"menu",menuConfig:{},menuItems:[],menuSide:"right",menuCover:false,menuCls:null,listeners:{tap:"onTap"}},onTap:function(a){if(this.$menu){this.$menu.destroy()}this.element.addCls("x-open");this.$menu=Ext.create("Ext.ux.ContextMenu",Ext.apply({},this.getMenuConfig(),{cls:this.getMenuCls(),items:this.getMenuItems(),listeners:{scope:this,hide:function(){if(this.$menu){this.element.removeCls("x-open");Ext.Viewport.removeMenu(this.getMenuSide());this.$menu.destroy()}}}}));this.$menu.on({scope:this,tap:this.onMenuButtonTap,delegate:"button"});Ext.Viewport.setMenu(this.$menu,{side:this.getMenuSide(),cover:this.getMenuCover()});Ext.Viewport.showMenu(this.getMenuSide())},onMenuButtonTap:Ext.emptyFn});