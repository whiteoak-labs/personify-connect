Ext.define("Ext.data.writer.Xml",{extend:"Ext.data.writer.Writer",alternateClassName:"Ext.data.XmlWriter",alias:"writer.xml",config:{documentRoot:"xmlData",defaultDocumentRoot:"xmlData",header:"",record:"record"},writeRecords:function(a,b){var g=this,d=[],c=0,f=b.length,h=g.getDocumentRoot(),e=g.getRecord(),l=b.length!==1,k,j;d.push(g.getHeader()||"");if(!h&&l){h=g.getDefaultDocumentRoot()}if(h){d.push("<",h,">")}for(;c<f;++c){k=b[c];d.push("<",e,">");for(j in k){if(k.hasOwnProperty(j)){d.push("<",j,">",k[j],"</",j,">")}}d.push("</",e,">")}if(h){d.push("</",h,">")}a.setXmlData(d.join(""));return a}});