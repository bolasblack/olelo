(function(b){b.fn.treeView=function(a){function l(c,e){if(a.stateStore){var d=b.storage.get(a.stateStore,[]);if(e)b.inArray(c,d)<0&&d.push(c);else d=b.grep(d,function(f){return f!=c});b.storage.set(a.stateStore,d)}}function m(c){var e=c[2],d=b('<li><div class="'+(c[0]?"hitarea collapsed":"placeholder")+'"><div class="arrow"/><div class="'+c[1]+'"/></div><a href="'+e+'">'+c[3]+"</a></li>"),f=d.children(".hitarea");d.data("name",c[3]);f.click(function(){if(f.hasClass("collapsed")){n(d,e);f.removeClass("collapsed").addClass("expanded")}else{d.children("ul").hide();
f.removeClass("expanded").addClass("collapsed")}l(e,f.hasClass("expanded"));return false});if(a.stateStore&&b.inArray(e,b.storage.get(a.stateStore,[]))>=0){n(d,e);f.removeClass("collapsed").addClass("expanded")}return d}function n(c,e){function d(i){var j=b("<ul/>");b.each(i,function(o,k){j.append(m(k))});e==a.root&&c.empty();c.children("ul").remove();c.append(j)}function f(i){g&&b.storage.set(g,i);var j={},o=[];b.each(i,function(k,h){j[h[3]]=h});b("> ul > li",c).each(function(){var k=b(this),h=k.data("name");
if(j[h])delete j[h];else k.remove();o.push(b(this))});b.each(j,function(k,h){var p=false;b.each(o,function(t,q){if(k<q.data("name")){p=true;q.before(m(h));return false}});p||c.children("ul").append(m(h))})}function r(){setTimeout(function(){a.ajax(e,f,function(){g&&b.storage.remove(g)})},a.delay)}var g=a.cacheStore?a.cacheStore+":"+e:null;if(c.children("ul").length!==0){c.children("ul").show();r()}else{var s=g?b.storage.get(g):null;if(s){d(s);r()}else{c.addClass("wait");a.ajax(e,function(i){c.removeClass("wait");
d(i);g&&b.storage.set(g,i)},function(){c.removeClass("wait")})}}}a||(a={});if(!a.root)a.root="/";if(!a.url)a.url="/treeview.json";if(!a.delay)a.delay=2E3;if(!a.ajax)a.ajax=function(c,e,d){b.ajax({url:a.url,data:{dir:c},success:e,error:d,dataType:"json"})};this.each(function(){n(b(this),a.root)})}})(jQuery);$(function(){$.translations({en:{menu:"Menu",tree:"Tree"},de:{menu:"Men\u00fc",tree:"Baumansicht"},cs:{menu:"Menu",tree:"Strom"}});$("#sidebar").wrapInner('<div id="sidebar-menu"/>').prepend('<div id="sidebar-tree" style="display: none"><h1>'+$.t("tree")+'</h1><div id="treeview"/></div>');$("#menu").prepend('<ul><li class="selected" id="sidebar-tab-menu"><a href="#sidebar-menu">'+$.t("menu")+'</a></li><li id="sidebar-tab-tree"><a href="#sidebar-tree">'+$.t("tree")+"</a></li></ul>");$("#sidebar-tab-menu, #sidebar-tab-tree").tabWidget({store:"sidebar-tab"});
$("#treeview").treeView({stateStore:"treeview-state",cacheStore:"treeview-cache",root:Olelo.base_path,ajax:function(b,a,l){$.ajax({url:b,data:{aspect:"treeview"},success:a,error:l,dataType:"json"})}})});
