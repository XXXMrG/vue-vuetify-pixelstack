(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0daee4"],{"6e65":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{"fill-height":"",fluid:"","grid-list-xl":""}},[a("v-layout",{attrs:{"justify-center":"",wrap:""}},[a("v-flex",{attrs:{md12:""}},[a("material-card",{attrs:{color:"green",flat:"","full-width":"",title:"Table on Plain Background",text:"Here is a subtitle for this table"}},[a("v-data-table",{attrs:{headers:t.headers,items:t.items.slice(0,7),"hide-actions":""},scopedSlots:t._u([{key:"headerCell",fn:function(e){var s=e.header;return[a("span",{staticClass:"subheading font-weight-light text--darken-3",domProps:{textContent:t._s(s.text)}})]}},{key:"items",fn:function(e){var s=e.item;return[a("td",[t._v(t._s(s.name))]),a("td",[t._v(t._s(s.country))]),a("td",[t._v(t._s(s.city))]),a("td",{staticClass:"text-xs-right"},[t._v(t._s(s.salary))])]}}])})],1)],1),a("v-flex",{attrs:{xs12:""}},[a("material-card",{staticClass:"card-tabs",attrs:{color:"green"}},[a("v-flex",{attrs:{slot:"header"},slot:"header"},[a("v-tabs",{attrs:{color:"transparent","slider-color":"white"},model:{value:t.tabs,callback:function(e){t.tabs=e},expression:"tabs"}},[a("span",{staticClass:"subheading font-weight-light mr-3",staticStyle:{"align-self":"center"}},[t._v("Tasks:")]),a("v-tab",{staticClass:"mr-3"},[a("v-icon",{staticClass:"mr-2"},[t._v("mdi-bug")]),t._v("Bugs\n            ")],1),a("v-tab",{staticClass:"mr-3"},[a("v-icon",{staticClass:"mr-2"},[t._v("mdi-code-tags")]),t._v("Website\n            ")],1),a("v-tab",[a("v-icon",{staticClass:"mr-2"},[t._v("mdi-cloud")]),t._v("Server\n            ")],1)],1)],1),a("v-flex",{attrs:{xs4:"","offset-xs8":""}},[a("v-text-field",{attrs:{label:"Search","append-icon":"mdi-account-search","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),a("v-tabs-items",{model:{value:t.tabs,callback:function(e){t.tabs=e},expression:"tabs"}},t._l(3,function(e){return a("v-tab-item",{key:e},[a("v-data-table",{attrs:{headers:t.headers,items:t.items,search:t.search},scopedSlots:t._u([{key:"headerCell",fn:function(e){var s=e.header;return[a("span",{staticClass:"subheading font-weight-light text--darken-3",domProps:{textContent:t._s(s.text)}})]}},{key:"items",fn:function(e){var s=e.item;return[a("td",[t._v(t._s(s.uid))]),a("td",[t._v(t._s(s.username))]),a("td",[t._v(t._s(s.email))]),a("td",[t._v(t._s(s.authority))]),a("td",[a("v-edit-dialog",{attrs:{lazy:""},on:{save:function(e){return t.save(s.uid,s.status)}},scopedSlots:t._u([{key:"input",fn:function(){return[a("v-select",{attrs:{items:t.status,label:"封禁或解封账户"},model:{value:s.status,callback:function(e){t.$set(s,"status",e)},expression:"item.status"}})]},proxy:!0}],null,!0)},[t._v("\n                    "+t._s(s.status)+"\n                    ")])],1)]}}],null,!0)},[a("v-alert",{attrs:{value:!0,color:"error",icon:"warning"},scopedSlots:t._u([{key:"no-results",fn:function(){return[t._v('Your search for "'+t._s(t.search)+'" found no results.')]},proxy:!0}],null,!0)})],1)],1)}),1)],1)],1)],1)],1)},r=[],n={data:function(){return{search:"",tabs:0,status:["normal","frozen","terminate"],headers:[{sortable:!1,text:"uid",value:"uid"},{sortable:!1,text:" 用户名",value:"username"},{sortable:!1,text:"用户邮箱",value:"email"},{sortable:!1,text:"用户权限",value:"authority"},{sortable:!1,text:"用户账号状态",value:"status"}],items:[{uid:"Dakota Rice",username:"Niger",authority:"Oud-Tunrhout",email:"$35,738",status:"root"}]}},created:function(){var t=this;this.$api.admin.getUserList({pageNo:1,pageSize:10,type:0}).then(function(e){t.items=e.data.userList}).catch(function(t){})},methods:{save:function(t,e){console.log(t,e);var a='{"'+t+'":"'+e+'"}';this.$api.admin.manageStatus(a).then(function(t){console.log(t)}).catch(function(t){console.log(t)})}}},i=n,l=a("8c9c"),o=Object(l["a"])(i,s,r,!1,null,null,null);e["default"]=o.exports}}]);
//# sourceMappingURL=chunk-2d0daee4.21af5c04.js.map