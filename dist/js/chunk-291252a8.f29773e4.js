(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-291252a8"],{2286:function(t,a,e){"use strict";var s=e("98d5"),i=e.n(s);i.a},"98d5":function(t,a,e){},ab3a:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{attrs:{"fill-height":"",fluid:"","grid-list-xl":""}},[e("v-layout",{attrs:{"justify-center":"",wrap:""}},[e("v-flex",{attrs:{xs12:"",md8:""}},[e("material-card",{attrs:{title:t.title}},[e("v-list",{attrs:{"two-line":""}},[t._l(t.items,(function(a,s){return[e("v-list-tile",{key:a.username,attrs:{avatar:"",ripple:""},on:{click:function(e){return t.go(a.username)}}},[e("v-list-tile-content",[e("v-list-tile-title",[t._v(t._s(a.username))]),e("v-list-tile-sub-title",[t._v(t._s(a.introduction))])],1)],1),s+1<t.items.length?e("v-divider",{key:s}):t._e()]}))],2)],1)],1),e("v-flex",{attrs:{xs12:"",md4:""}},[e("material-card",{staticClass:"v-card-profile"},[e("v-avatar",{staticClass:"mx-auto d-block",attrs:{slot:"offset",size:"130"},slot:"offset"},[e("img",{attrs:{src:"https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"}})]),e("v-spacer"),e("v-card-text",{staticClass:"text-xs-center"},[e("h6",{staticClass:"category text-gray font-weight-thin mb-3"},[t._v(t._s(t.email))]),e("h4",{staticClass:"card-title font-weight-light"},[t._v(t._s(t.username))]),e("p",{staticClass:"card-description font-weight-light"},[t._v(t._s(t.about))]),e("v-card-text",{attrs:{color:"lightinfo"}},[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{md4:""}},[e("span",[t._v("Follow: "+t._s(t.follow))])]),e("v-flex",{attrs:{md4:""}},[e("span",[t._v("Star: "+t._s(t.star))])]),e("v-flex",{attrs:{md4:""}},[e("span",[t._v("Fans: "+t._s(t.fans))])]),e("v-btn",{attrs:{block:"",color:"secondary",dark:""},on:{click:t.goback}},[t._v("返回用户主页")])],1)],1)],1)],1)],1)],1)],1)},i=[],r=(e("a481"),{data:function(){return{username:"",email:"",about:"",follow:0,star:0,fans:0,pixels:[{}],title:"",items:[{username:"",introduction:""}]}},created:function(){var t=this;switch(this.$api.user.getInfo({uid:this.$route.params.id}).then((function(a){var e=a.data.userInfo;t.username=e.username,t.email=e.email,t.about=e.introduction,t.follow=e.follow,t.star=e.star,t.fans=e.fans})).catch((function(t){})),this.$route.params.type){case"follow":this.title="我关注的人",this.$api.user.getFollowers({uid:this.$route.params.id}).then((function(a){console.log(a),t.items=a.data.followers})).catch((function(t){}));break;case"fans":this.title="我的粉丝们",this.$api.user.getFans({uid:this.$route.params.id}).then((function(a){console.log(a),t.items=a.data.fans})).catch((function(t){}));break}},methods:{goback:function(){var t="/user-profile/"+this.$route.params.id+"/type/info";this.$router.replace(t)},go:function(t){var a=this;this.$api.user.getUid({username:t}).then((function(t){var e=t.data.uid,s="/user-profile/"+e+"/type/info";a.$router.replace(s)})).catch((function(t){}))}}}),n=r,o=(e("2286"),e("2877")),l=Object(o["a"])(n,s,i,!1,null,null,null);a["default"]=l.exports}}]);
//# sourceMappingURL=chunk-291252a8.f29773e4.js.map