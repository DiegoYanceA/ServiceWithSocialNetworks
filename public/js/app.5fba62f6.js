(function(t){function e(e){for(var s,r,c=e[0],o=e[1],l=e[2],u=0,v=[];u<c.length;u++)r=c[u],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&v.push(i[r][0]),i[r]=0;for(s in o)Object.prototype.hasOwnProperty.call(o,s)&&(t[s]=o[s]);d&&d(e);while(v.length)v.shift()();return n.push.apply(n,l||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],s=!0,r=1;r<a.length;r++){var c=a[r];0!==i[c]&&(s=!1)}s&&(n.splice(e--,1),t=o(o.s=a[0]))}return t}var s={},r={app:0},i={app:0},n=[];function c(t){return o.p+"js/"+({Servers:"Servers"}[t]||t)+"."+{Servers:"a0a03e41"}[t]+".js"}function o(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.e=function(t){var e=[],a={Servers:1};r[t]?e.push(r[t]):0!==r[t]&&a[t]&&e.push(r[t]=new Promise((function(e,a){for(var s="css/"+({Servers:"Servers"}[t]||t)+"."+{Servers:"cf2f0065"}[t]+".css",i=o.p+s,n=document.getElementsByTagName("link"),c=0;c<n.length;c++){var l=n[c],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===s||u===i))return e()}var v=document.getElementsByTagName("style");for(c=0;c<v.length;c++){l=v[c],u=l.getAttribute("data-href");if(u===s||u===i)return e()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=e,d.onerror=function(e){var s=e&&e.target&&e.target.src||i,n=new Error("Loading CSS chunk "+t+" failed.\n("+s+")");n.code="CSS_CHUNK_LOAD_FAILED",n.request=s,delete r[t],d.parentNode.removeChild(d),a(n)},d.href=i;var m=document.getElementsByTagName("head")[0];m.appendChild(d)})).then((function(){r[t]=0})));var s=i[t];if(0!==s)if(s)e.push(s[2]);else{var n=new Promise((function(e,a){s=i[t]=[e,a]}));e.push(s[2]=n);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,o.nc&&u.setAttribute("nonce",o.nc),u.src=c(t);var v=new Error;l=function(e){u.onerror=u.onload=null,clearTimeout(d);var a=i[t];if(0!==a){if(a){var s=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;v.message="Loading chunk "+t+" failed.\n("+s+": "+r+")",v.name="ChunkLoadError",v.type=s,v.request=r,a[1](v)}i[t]=void 0}};var d=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(e)},o.m=t,o.c=s,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(a,s,function(e){return t[e]}.bind(null,s));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/",o.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=e,l=l.slice();for(var v=0;v<l.length;v++)e(l[v]);var d=u;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var s=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{staticStyle:{background:"transparent !important"}},[a("v-main",[a("router-view")],1)],1)},i=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("v-container",{staticStyle:{padding:"0px !important"},attrs:{fluid:""}},[a("v-parallax",{staticStyle:{height:"100vh"},attrs:{dark:"",src:"https://images8.alphacoders.com/954/954228.jpg"}},[a("v-row",{staticClass:"text-center",attrs:{align:"center",justify:"center"}},[a("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[a("h1",{staticClass:"titleServer font-weight-normal mb-4"},[t.channel.names?[t._v(t._s(t.channel.names.youtube))]:t._e()],2),a("h4",{staticClass:"subheading"},[t._v(" Este es una página para conocer un poco más de mi 🙂 ")])]),a("v-col",{attrs:{cols:"12",sm:"6",md:"4",lg:"3"}},[a("v-btn",{staticStyle:{color:"white"},attrs:{large:"",href:"https://discord.gg/AwGHA7mCY2",target:"_blank",color:"#7289da"}},[a("v-icon",{staticStyle:{"margin-right":"5px"}},[t._v("mdi-discord")]),t._v(" Discord ")],1)],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4",lg:"3"}},[a("v-btn",{staticStyle:{color:"white"},attrs:{large:"",href:"https://www.youtube.com/channel/UCH5RD3yCZhuDf8V51rC1R7g",target:"_blank",color:"#c4302b"}},[a("v-icon",{staticStyle:{"margin-right":"5px"}},[t._v("mdi-youtube")]),t._v(" Youtube "),t.channel.subs?[t._v(" || "+t._s(t.channel.subs.youtube)+" subs")]:t._e()],2)],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4",lg:"3"}},[a("v-btn",{staticStyle:{color:"white"},attrs:{large:"",href:"https://www.twitch.tv/asdiegoya",target:"_blank",color:"#6441a5"}},[a("v-icon",{staticStyle:{"margin-right":"5px"}},[t._v("mdi-twitch")]),t._v(" Twitch "),t.channel.subs?[t._v(" || "+t._s(t.channel.subs.twitch)+" followers")]:t._e()],2)],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4",lg:"3"}},[a("router-link",{attrs:{to:"/servers"}},[a("v-btn",{staticStyle:{color:"white"},attrs:{large:"",color:"success"}},[a("v-icon",{staticStyle:{"margin-right":"5px"}},[t._v("mdi-minecraft")]),t._v(" Servers MC ")],1)],1)],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4",lg:"3"}},[a("v-btn",{staticStyle:{color:"white"},attrs:{large:"",href:"https://steamcommunity.com/profiles/76561198881503101/",target:"_blank",color:"#081c3c"}},[a("v-icon",{staticStyle:{"margin-right":"5px"}},[t._v("mdi-steam")]),t._v(" Mi Steam ")],1)],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4",lg:"3"}},[a("v-btn",{staticStyle:{color:"white"},attrs:{large:"",href:"https://www.paypal.com/myaccount/transfer/homepage/external/profile?flowContextData=jybKnxkvchtffK3nombhxOOCEu4i0d7wOYlrNaDiIvWrD5G0etRYrAhJCWQZnudz_30BIGAsZMAW1-lUn0s5L-6b46qiJI7aSdeup4d8U6AJBiEizfR7ouFb-vtG29Kh8lbjYbkSZFhVKpnu_Gq3fmvqn8hCu2s1Yh0Wqv79184TqPlGCXezr-clhkwD2bATlNehLbm7yFKqBUZgSEzsGTZRRvHDRj4MeAtg1eV3CtQtBzhrH4MjetZZAcpwitqgyYHWKhoO5Ok0WqAurlwLZrzzqRwcAGqg7VHV09bw1ELRpdlxFgPwwXATpOe3RqKioy8esS_SFyT9qXdOv1Mzj-un33PmpP1yv1ml8IjItttlxQgsCRAuGJ5D0Ni",target:"_blank",color:"#3b7bbf"}},[a("v-icon",{staticStyle:{"margin-right":"5px"}},[t._v("mdi-gift")]),t._v(" Donaciones ")],1)],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4",lg:"3"}},[a("v-btn",{staticStyle:{color:"white"},attrs:{large:"",href:"https://streamlabs.com/asdiegoya-/tip",target:"_blank",color:"#30C3A2"}},[a("v-icon",{staticStyle:{"margin-right":"5px"}},[t._v("mdi-emoticon")]),t._v(" Streamlabs ")],1)],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4",lg:"3"}},[a("v-btn",{staticStyle:{color:"white"},attrs:{large:"",href:"https://www.streamloots.com/asdiegoya",target:"_blank",color:"#cfc402"}},[a("v-icon",{staticStyle:{"margin-right":"5px"}},[t._v("mdi-emoticon-devil")]),t._v(" StreamLoots ")],1)],1)],1)],1),a("div",{staticClass:"containerWeb",staticStyle:{background:"#1e2460",color:"white !important"},attrs:{dark:""}},[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12",md:"4"}},[a("v-card",{staticClass:"mx-auto",attrs:{"max-width":"500"}},[a("v-toolbar",{attrs:{color:"primary accent-4",dark:""}},[a("v-toolbar-title",[t._v("👑 Moderadores 👑")])],1),a("v-list",{attrs:{subheader:""}},t._l(t.moderators,(function(e,s){return a("v-list-item",{key:s},[a("v-list-item-avatar",[a("v-img",{attrs:{alt:e.channelName+" avatar",src:e.channelPhoto.default.url}})],1),a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.channelName)}})],1),a("v-list-item-icon",[100<e.statistics.subscriberCount?a("v-btn",{staticClass:"btn-yt",staticStyle:{width:"100%"},attrs:{color:"#c4302b",href:e.urlChannel,target:"_blank"}},[a("v-icon",{staticStyle:{"margin-right":"5px"}},[t._v("mdi-youtube")]),t._v(" || "+t._s(e.statistics.subscriberCount)+" ")],1):t._e()],1)],1)})),1)],1)],1),a("v-col",{attrs:{cols:"12",md:"4"}},[a("v-card",{staticClass:"mx-auto",attrs:{"max-width":"500"}},[a("v-toolbar",{attrs:{color:"red accent-4",dark:""}},[a("v-toolbar-title",[a("v-icon",[t._v("mdi-youtube")]),t._v(" Los 10 últimos suscriptores")],1)],1),a("v-list",{attrs:{subheader:""}},t._l(t.mySubscribersYT,(function(e,s){return a("v-list-item",{key:s},[a("v-list-item-avatar",[a("v-img",{attrs:{alt:e.channelName+" avatar",src:e.channelPhoto.default.url}})],1),a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.channelName)}})],1),a("v-list-item-icon",[100<e.statistics.subscriberCount?a("v-btn",{staticClass:"btn-yt",staticStyle:{width:"100%"},attrs:{color:"#c4302b",href:e.urlChannel,target:"_blank"}},[a("v-icon",{staticStyle:{"margin-right":"5px"}},[t._v("mdi-youtube")]),t._v(" || "+t._s(e.statistics.subscriberCount)+" ")],1):t._e()],1)],1)})),1)],1)],1),a("v-col",{attrs:{cols:"12",md:"4"}},[a("v-card",{staticClass:"mx-auto",attrs:{"max-width":"500"}},[a("v-toolbar",{attrs:{color:"deep-purple accent-4",dark:""}},[a("v-toolbar-title",[a("v-icon",[t._v("mdi-twitch")]),t._v(" Los 10 últimos followers")],1)],1),a("v-list",{attrs:{subheader:""}},t._l(t.myFollowersTwitch,(function(e,s){return a("v-list-item",{key:s},[a("v-list-item-avatar",[a("v-img",{attrs:{alt:e.channelName+" avatar",src:e.channelPhoto}})],1),a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.channelName)}})],1)],1)})),1)],1)],1)],1)],1)],1),a("v-row",{staticClass:"text-center"},[a("v-col",{staticClass:"mb-5",attrs:{cols:"12"}}),a("v-col",{staticClass:"mb-5",attrs:{cols:"12"}},[a("h2",{staticClass:"display-1 font-weight-bold mb-3"},[t._v(" Servidores de minecraft ")]),a("h5",[t._v("En donde tengo Rango 💙")]),a("br"),a("v-row",{attrs:{justify:"center"}},t._l(t.servers,(function(e,s){return a("v-col",{key:s,attrs:{cols:"12",sm:"6",md:"4",lg:"4"}},[a("div",{staticClass:"subheading mx-3"},[a("v-img",{staticClass:"shrink mr-2",staticStyle:{"border-radius":"100%","margin-left":"auto","margin-right":"auto !important"},attrs:{src:e.img,alt:"Servers",contain:"",height:"40px",width:"40px"}}),a("h4",[t._v("💙 "+t._s(e.name)+" 💙")]),a("v-icon",{attrs:{color:"blue"}},[t._v("mdi-desktop-classic")]),t._v(" IP: "+t._s(e.pc)+" ")],1)])})),1)],1)],1)],1)],1)},c=[],o=a("d000"),l=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},u=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"fire"},[a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"}),a("div",{staticClass:"particle"})])}],v={name:"Fire",data:function(){return{}}},d=v,m=a("2877"),p=Object(m["a"])(d,l,u,!1,null,null,null),h=p.exports,f={name:"Home",components:{NavBar:o["a"],Fire:h},data:function(){return{channel:{},texturePack:[],servers:[{name:"Unión galactica",img:"https://yt3.ggpht.com/ytc/AAUvwnhlpRNNOkOeZ7Ql5vy56tD8oKzKpcsJWXr2peUOhg=s88-c-k-c0x00ffffff-no-rj",pc:"play.uniongalactica.com"},{name:"Mycraft",img:"https://yt3.ggpht.com/ytc/AAUvwniGOZkdhAxndcIhIQbZ_dvXV4WUEN4ndsddWgp3=s88-c-k-c0x00ffffff-no-rj",pc:"server.mycraft.es"},{name:"Mooncraft",img:"https://yt3.ggpht.com/ytc/AAUvwnjCrsvO1L1kR5CVjJejZbIdCWORfKcdvRYivTfU8g=s88-c-k-c0x00ffffff-no-rj",pc:"mooncraft.es"},{name:"HyCraft",img:"https://yt3.ggpht.com/ytc/AAUvwniItYTVKevfu3Sp8SWF8dIC5uAOTgeB8HFUPweJfQ=s88-c-k-c0x00ffffff-no-rj",pc:"mc.hycraft.us"},{name:"HonlyCraft",img:"https://yt3.ggpht.com/ytc/AAUvwni4e6g3VYz7vk2uI0oc-dFLkHISkm63pubYmlZ3=s88-c-k-c0x00ffffff-no-rj",pc:"mc.honlycraft.us"},{name:"Splindux",img:"https://cdn.discordapp.com/attachments/688566101910880275/830494735956836382/636564639831776656.png",pc:"mc.splindux.com"}],moderators:[],mySubscribersYT:[],myFollowersTwitch:[]}},methods:{getMyChannel:function(){var t=this,e=this.$store.state.URL+"/channels/myChannels";this.axios.get(e).then((function(t){return null==t.data&&console.log("Error"),t.data})).then((function(e){t.channel=e.myChannel})).catch((function(t){console.log(t)}))},getTexturePack:function(){var t=this,e=this.$store.state.URL+"/channels/texturePack";this.axios.get(e).then((function(t){return null==t.data&&console.log("Error"),t.data})).then((function(e){t.texturePack=e.texturePack,t.texturePack=t.texturePack.sort((function(t,e){return t.channelName.localeCompare(e.channelName)}))})).catch((function(t){console.log(t)}))},getMods:function(){var t=this,e=this.$store.state.URL+"/channels/modYoutube";this.axios.get(e).then((function(t){return null==t.data&&console.log("Error"),t.data})).then((function(e){t.moderators=e.moderators,t.moderators=t.moderators.sort((function(t,e){return t.channelName.localeCompare(e.channelName)}))})).catch((function(t){console.log(t)}))},getSubscribers:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:7,a=this.$store.state.URL+"/channels/mySubscribersYT/"+e;this.axios.get(a).then((function(t){return null==t.data&&console.log("Error"),t.data.mySubscribers})).then((function(e){t.mySubscribersYT=e})).catch((function(t){console.log(t)}))},getFollowers:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:7,a=this.$store.state.URL+"/channels/myFollowTwitch/"+e;this.axios.get(a).then((function(t){return null==t.data&&console.log("Error"),t.data.myFollowers})).then((function(e){t.myFollowersTwitch=e})).catch((function(t){console.log(t)}))}},mounted:function(){this.getMyChannel(),this.getMods(),this.getTexturePack(),this.getSubscribers(10),this.getFollowers(10)}},g=f,b=a("6544"),y=a.n(b),C=a("8336"),w=a("b0af"),_=a("62ad"),x=a("a523"),S=a("132d"),k=a("adda"),V=a("8860"),A=a("da13"),j=a("8270"),E=a("5d23"),O=a("34c3"),P=a("8b9c"),T=a("0fd9"),L=a("71d9"),I=a("2a7f"),R=Object(m["a"])(g,n,c,!1,null,null,null),N=R.exports;y()(R,{VBtn:C["a"],VCard:w["a"],VCol:_["a"],VContainer:x["a"],VIcon:S["a"],VImg:k["a"],VList:V["a"],VListItem:A["a"],VListItemAvatar:j["a"],VListItemContent:E["a"],VListItemIcon:O["a"],VListItemTitle:E["b"],VParallax:P["a"],VRow:T["a"],VToolbar:L["a"],VToolbarTitle:I["a"]});var U={name:"App",components:{Home:N},data:function(){return{}}},M=U,F=a("7496"),D=a("f6c4"),Y=Object(m["a"])(M,r,i,!1,null,null,null),B=Y.exports;y()(Y,{VApp:F["a"],VMain:D["a"]});a("d3b7"),a("3ca3"),a("ddb0");var H=a("8c4f"),Z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12",md:"4"}},[a("v-btn",{staticClass:"mr-4",attrs:{type:"submit",color:"primary"},on:{click:t.authenticate}},[t._v(" Authorizar "),a("v-icon",[t._v("mdi-login")])],1)],1),a("v-col",{attrs:{cols:"12",md:"4"}},[a("v-btn",{staticClass:"mr-4",attrs:{type:"submit",color:"primary"},on:{click:t.excute}},[t._v(" Ejecutar ")])],1)],1)],1)],1)},q=[],K={name:"Login",components:{},data:function(){return{}},methods:{authenticate:function(){return gapi.auth2.getAuthInstance().signIn({scope:"https://www.googleapis.com/auth/youtube.readonly"}).then((function(){console.log("Sign-in successful")}),(function(t){console.error("Error signing in",t)}))},excute:function(){return gapi.client.youtube.liveBroadcasts.list({part:["snippet"],id:["2fWdydSyaKE"]}).then((function(t){console.log("Response",t)}),(function(t){console.error("Execute error",t)}))}}},W=K,z=Object(m["a"])(W,Z,q,!1,null,null,null),$=z.exports;y()(z,{VApp:F["a"],VBtn:C["a"],VCol:_["a"],VContainer:x["a"],VIcon:S["a"],VRow:T["a"]}),s["a"].use(H["a"]);var G=[{path:"/",name:"Home",component:N},{path:"/login",name:"Login",component:$},{path:"/servers",name:"Servers",component:function(){return a.e("Servers").then(a.bind(null,"5bc3"))}}],J=new H["a"]({mode:"history",base:"/",routes:G}),Q=J,X=a("2f62"),tt="production",et="development"==tt?"http://localhost:3000/api/v1":"https://asdiegoya.azurewebsites.net/api/v1";s["a"].use(X["a"]);var at=new X["a"].Store({state:{MODE:tt,URL:et},mutations:{},actions:{},modules:{}}),st=a("f309"),rt=a("5e4e");s["a"].use(st["a"]);var it=new st["a"]({lang:{locales:{es:rt["a"]},current:"es"}}),nt=a("bc3a"),ct=a.n(nt),ot=a("2106"),lt=a.n(ot);a("7d05");s["a"].use(lt.a,ct.a),s["a"].config.productionTip=!1,new s["a"]({router:Q,store:at,vuetify:it,render:function(t){return t(B)}}).$mount("#app")},"7d05":function(t,e,a){},d000:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[t.photo?[a("a",{staticClass:"d-flex align-center deleteUnderlined",attrs:{href:"/"}},[a("v-img",{staticClass:"shrink mr-2",staticStyle:{"border-radius":"100%"},attrs:{alt:"Vuetify Logo",contain:"",src:t.photo.youtube.default.url,transition:"scale-transition",width:"40"}}),a("h2",{staticStyle:{color:"white"}},[t.channelName?[t._v(t._s(t.channelName.youtube))]:t._e()],2)],1)]:t._e(),a("v-spacer"),a("v-btn",{attrs:{href:"https://www.youtube.com/channel/UCH5RD3yCZhuDf8V51rC1R7g",target:"_blank",text:""}},[a("span",{staticClass:"mr-2"},[t._v("🙂 Canal principal 🙂")]),a("v-icon",[t._v("mdi-open-in-new")])],1)],2)},r=[],i={name:"NavBar",data:function(){return{}},props:["channelName","photo"]},n=i,c=a("2877"),o=a("6544"),l=a.n(o),u=a("40dc"),v=a("8336"),d=a("132d"),m=a("adda"),p=a("2fa4"),h=Object(c["a"])(n,s,r,!1,null,null,null);e["a"]=h.exports;l()(h,{VAppBar:u["a"],VBtn:v["a"],VIcon:d["a"],VImg:m["a"],VSpacer:p["a"]})}});
//# sourceMappingURL=app.5fba62f6.js.map