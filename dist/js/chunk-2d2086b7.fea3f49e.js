(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2086b7"],{a55b:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",[s("v-layout",{attrs:{"justify-center":""}},[s("v-flex",{attrs:{xs12:"",sm10:"",md8:""}},[s("material-card",{attrs:{color:"info",title:"登录 PixelStack",text:"fuck the world"}},[s("v-form",{ref:"form"},[s("v-container",{attrs:{"justify-start":""}},[s("v-layout",{attrs:{wrap:"",row:""}},[s("v-flex",{attrs:{md6:"","offset-md1":""}},[s("v-text-field",{staticClass:"purple-input",attrs:{label:"输入用户名",rules:t.nameRules},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}})],1),s("v-flex",{attrs:{md6:"","offset-md1":""}},[s("v-text-field",{staticClass:"purple-input",attrs:{label:"输入密码",type:"password",rules:t.pwdRules,clearable:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.login(e)}},model:{value:t.pwd,callback:function(e){t.pwd=e},expression:"pwd"}})],1),s("v-flex",{attrs:{md6:"","offset-md6":""}},[s("router-link",{attrs:{to:"/register"}},[s("p",{staticClass:"text-info"},[t._v("还没有账户？点击注册")])])],1),s("v-flex",{attrs:{xs12:"","text-xs-right":""}},[s("v-btn",{staticClass:"mx-0 font-weight-light",attrs:{color:"success"},on:{click:function(e){return t.login()}}},[t._v("登录")])],1)],1)],1)],1)],1)],1)],1)],1)},r=[],n=(s("f91a"),{data:function(){return{username:"",pwd:"",nameRules:[function(t){return!!t||"用户名不能为空"}],pwdRules:[function(t){return!!t||"密码不能为空"}]}},watch:{username:"validateField",pwd:"validateField"},methods:{validateField:function(){this.$refs.form.validate()},go:function(){this.$refs.form.validate()&&(console.log("yyyy"),this.$api.user.test().then(function(t){console.log(t)}))},login:function(){var t=this;this.$refs.form.validate()&&this.$api.user.login({username:this.username,password:this.pwd}).then(function(e){switch(console.log(e),e.data.status){case"200":t.$store.commit("setToken",e.data.userInfo.token),t.$store.commit("setUser",e.data.userInfo),t.$message({type:"success",message:"登录成功"}),t.$router.replace({path:"/pixel"});break;default:t.$message.error(e.data.message)}}).catch(function(t){console.log(t)})}}}),o=n,l=s("8c9c"),i=Object(l["a"])(o,a,r,!1,null,null,null);e["default"]=i.exports}}]);
//# sourceMappingURL=chunk-2d2086b7.fea3f49e.js.map