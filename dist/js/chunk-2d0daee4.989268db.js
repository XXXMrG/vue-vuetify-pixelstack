(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0daee4"],{"6e65":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{"fill-height":"",fluid:"","grid-list-xl":""}},[a("v-layout",{attrs:{"justify-center":"",wrap:""}},[a("v-flex",{attrs:{xs12:""}},[a("material-card",{staticClass:"card-tabs",attrs:{color:"myinfo"}},[a("v-flex",{attrs:{slot:"header"},slot:"header"},[a("v-tabs",{attrs:{color:"transparent","slider-color":"white"},model:{value:t.tabs,callback:function(e){t.tabs=e},expression:"tabs"}},[a("span",{staticClass:"subheading font-weight-light mr-3",staticStyle:{"align-self":"center"}},[t._v("用户身份：")]),a("v-tab",{staticClass:"mr-3"},[a("v-icon",{staticClass:"mr-2"},[t._v("mdi-bug")]),t._v("Users\n            ")],1),a("v-tab",{staticClass:"mr-3"},[a("v-icon",{staticClass:"mr-2"},[t._v("mdi-code-tags")]),t._v("Admin\n            ")],1),a("v-spacer"),a("v-btn",{attrs:{small:"",color:"pink",bottom:""},on:{click:function(e){t.dialogVisible=!0}}},[a("v-icon",[t._v("edit")]),t._v("添加管理员\n            ")],1)],1)],1),a("v-flex",{attrs:{xs4:"","offset-xs8":""}},[a("v-text-field",{attrs:{label:"Search","append-icon":"mdi-account-search","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),a("v-tabs-items",{model:{value:t.tabs,callback:function(e){t.tabs=e},expression:"tabs"}},t._l(2,(function(e){return a("v-tab-item",{key:e},[a("v-data-table",{attrs:{headers:t.headers,items:t.datas[e-1],search:t.search},scopedSlots:t._u([{key:"headerCell",fn:function(e){var s=e.header;return[a("span",{staticClass:"subheading font-weight-light text--darken-3",domProps:{textContent:t._s(s.text)}})]}},{key:"items",fn:function(e){var s=e.item;return[a("td",[t._v(t._s(s.uid))]),a("td",[a("router-link",{attrs:{to:t.getPath(s.uid)}},[t._v(t._s(s.username))])],1),a("td",[t._v(t._s(s.email))]),a("td",[t._v(t._s(s.authority))]),a("td",[a("v-edit-dialog",{attrs:{lazy:""},on:{save:function(e){return t.save(s.uid,s.status)}},scopedSlots:t._u([{key:"input",fn:function(){return[a("v-select",{attrs:{items:t.status,label:"封禁或解封账户"},model:{value:s.status,callback:function(e){t.$set(s,"status",e)},expression:"item.status"}})]},proxy:!0}],null,!0)},[t._v("\n                    "+t._s(s.status)+"\n                    ")])],1)]}}],null,!0)},[a("v-alert",{attrs:{value:!0,color:"error",icon:"warning"},scopedSlots:t._u([{key:"no-results",fn:function(){return[t._v('Your search for "'+t._s(t.search)+'" found no results.')]},proxy:!0}],null,!0)})],1)],1)})),1)],1),a("el-dialog",{attrs:{visible:t.dialogVisible,title:"增加管理员"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{md6:"","offset-md3":""}},[a("v-text-field",{attrs:{color:"myinfo",label:"输入新管理员用户名"},model:{value:t.adminname,callback:function(e){t.adminname=e},expression:"adminname"}})],1),a("v-flex",{attrs:{md6:"","offset-md3":""}},[a("v-text-field",{attrs:{color:"myinfo",label:"输入新管理员邮箱"},model:{value:t.adminEmail,callback:function(e){t.adminEmail=e},expression:"adminEmail"}})],1),a("v-flex",{attrs:{md6:"","offset-md3":""}},[a("v-text-field",{attrs:{color:"myinfo",label:"设置密码",type:"password"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.create(e)}},model:{value:t.adminpwd,callback:function(e){t.adminpwd=e},expression:"adminpwd"}})],1),a("v-flex",{attrs:{md6:"","offset-md3":""}},[a("v-btn",{attrs:{block:"",color:"pink"},on:{click:t.create}},[t._v("新建管理员")])],1)],1)],1)],1)],1)],1)},i=[],n={data:function(){return{search:"",tabs:0,status:["normal","frozen","terminate"],headers:[{sortable:!1,text:"uid",value:"uid"},{sortable:!1,text:" 用户名",value:"username"},{sortable:!1,text:"用户邮箱",value:"email"},{sortable:!1,text:"用户权限",value:"authority"},{sortable:!1,text:"用户账号状态",value:"status"}],users:[{uid:"",username:"",authority:"",email:"",status:""}],datas:[],dialogVisible:!1,adminname:"",adminpwd:"",adminEmail:""}},created:function(){this.getUser(0),this.getUser(1)},methods:{save:function(t,e){var a=this;console.log(t,e);var s='{"'+t+'":"'+e+'"}';this.$api.admin.manageStatus(s).then((function(t){a.$message({type:"success",message:t.data.message})})).catch((function(t){console.log(t)}))},getUser:function(t){var e=this;this.$api.admin.getUserList({type:t}).then((function(t){e.datas.push(t.data.userList)})).catch((function(t){}))},getPath:function(t){return"/user-profile/"+t+"/type/info"},create:function(){var t=this;this.$api.admin.createCount({username:this.adminname,email:this.admiEmail,password:this.adminpwd,authority:window.localStorage.authority}).then((function(e){console.log(e),200==e.data.status?(t.$message({type:"success",message:"添加管理员成功"}),t.dialogVisible=!1,t.getUser(1)):(t.$message.error(e.data.message),t.dialogVisible=!1)})).catch((function(t){}))}}},l=n,r=a("2877"),o=Object(r["a"])(l,s,i,!1,null,null,null);e["default"]=o.exports}}]);
//# sourceMappingURL=chunk-2d0daee4.989268db.js.map