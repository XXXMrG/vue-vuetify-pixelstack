(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d237582"],{fb5e:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{"fill-height":"",fluid:"","grid-list-xl":""}},[a("v-layout",{attrs:{"justify-center":"",wrap:""}},[a("v-flex",{attrs:{xs12:"",md8:""}},[a("material-card",{attrs:{color:"myinfo",title:"Edit Profile",text:"Complete your profile"}},[a("v-form",{ref:"form"},[a("v-container",{attrs:{"py-0":""}},[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs12:"",md4:""}},[a("v-text-field",{attrs:{color:"myprimary",label:"User Name"},model:{value:t.newName,callback:function(e){t.newName=e},expression:"newName"}})],1),a("v-flex",{attrs:{xs12:"",md8:""}},[a("v-text-field",{attrs:{label:"Email Address",color:"myprimary"},model:{value:t.newEmail,callback:function(e){t.newEmail=e},expression:"newEmail"}})],1),a("v-flex",{attrs:{xs12:"",md6:""}},[a("v-text-field",{attrs:{label:"New Password",color:"myprimary",type:"password",hint:"修改密码需要重新登录哦"},model:{value:t.newPwd,callback:function(e){t.newPwd=e},expression:"newPwd"}})],1),a("v-flex",{attrs:{xs12:"",md6:""}},[a("v-text-field",{attrs:{rules:t.rules,label:"Repeat Password",color:"myprimary",type:"password"},model:{value:t.match,callback:function(e){t.match=e},expression:"match"}})],1),a("v-flex",{attrs:{xs12:""}},[a("v-textarea",{attrs:{color:"myprimary",label:"About Me",value:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",clearable:"",hint:"向大家介绍一下自己吧"},model:{value:t.about,callback:function(e){t.about=e},expression:"about"}})],1),a("v-flex",{attrs:{xs12:"","text-xs-right":""}},[a("v-btn",{staticClass:"mx-0 font-weight-light",attrs:{color:"myprimary"},on:{click:function(e){return t.commit()}}},[t._v("Update Profile")])],1)],1)],1)],1)],1)],1),a("v-flex",{attrs:{xs12:"",md4:""}},[a("material-card",{staticClass:"v-card-profile"},[a("v-avatar",{staticClass:"mx-auto d-block",attrs:{slot:"offset",size:"130"},slot:"offset"},[a("img",{attrs:{src:"https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"}})]),a("v-card-text",{staticClass:"text-xs-center"},[a("h6",{staticClass:"category text-gray font-weight-thin mb-3"},[t._v(t._s(this.newName))]),a("h4",{staticClass:"card-title font-weight-light"},[t._v(t._s(this.newEmail))]),a("p",{staticClass:"card-description font-weight-light"},[t._v(t._s(this.about))])])],1)],1)],1)],1)},r=[],i=(a("a481"),{data:function(){return{newName:"",newEmail:"",newPwd:"",match:"",about:""}},computed:{rules:function(){var t=this,e=[];if(this.newPwd){var a=function(e){return(!!e&&e)===t.newPwd||"两次密码输入不一致"};e.push(a)}return e}},watch:{match:"validateField"},created:function(){var t=this;this.$api.user.getInfo({uid:window.localStorage.uid}).then((function(e){var a=e.data.userInfo;t.newName=a.username,t.newEmail=a.email,t.about=a.introduction})).catch((function(t){}))},methods:{validateField:function(){this.$refs.form.validate()},commit:function(){var t=this;this.$refs.form.validate()&&this.$api.user.edit({username:this.newName,email:this.newEmail,password:this.newPwd,introduction:this.about,uid:window.localStorage.uid}).then((function(e){switch(console.log(e),e.data.status){case"200":t.$message({message:"信息修改成功！",type:"success"});var a="/user-profile/"+window.localStorage.uid+"/type/info";t.$router.replace(a);break;case"201":t.$message({message:"信息修改成功！需要重新登录",type:"success"}),window.localStorage.clear(),t.$router.replace({path:"/login",query:{redirect:"/user-profile"}});break;default:t.$message.error(e.data.message)}})).catch((function(t){}))}}}),l=i,o=a("2877"),n=Object(o["a"])(l,s,r,!1,null,null,null);e["default"]=n.exports}}]);
//# sourceMappingURL=chunk-2d237582.fb16992c.js.map