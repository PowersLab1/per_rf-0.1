(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{23:function(e,t,n){"use strict";(function(e){n.d(t,"b",function(){return i}),n.d(t,"a",function(){return c});var a=n(53),o=n(39),r=n(40);function i(t,n){return new Promise(function(i,c){var s=o.stringify({encrypted_metadata:t,data:n}),d={hostname:r.awsLambda.saveTaskData.host,port:443,path:r.awsLambda.saveTaskData.path,method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded","Content-Length":e.byteLength(s)}},u=a.request(d,function(e){e.setEncoding("utf8"),e.on("data",function(){}),e.on("end",i)});u.on("error",function(e){r.debug&&(console.log("ERROR:"),console.log(e)),c(e)}),u.write(s),u.end()})}function c(t){return new Promise(function(n,i){var c=o.stringify({encrypted_metadata:t}),s={hostname:r.awsLambda.fetchLink.host,port:443,path:r.awsLambda.fetchLink.path,method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded","Content-Length":e.byteLength(c)}},d=a.request(s,function(e){e.setEncoding("utf8");var t="";e.on("data",function(e){t+=e}),e.on("end",function(){return n(t)})});d.on("error",function(e){r.debug&&(console.log("ERROR:"),console.log(e)),i(e)}),d.write(c),d.end()})}}).call(this,n(9).Buffer)},40:function(e){e.exports={taskVersion:"1.0.0",taskName:"visualQualifying",debug:!0,awsLambda:{saveTaskData:{host:"de8cnjde61.execute-api.us-east-2.amazonaws.com",path:"/default/saveTaskData"},fetchLink:{host:"3pnzb6n9vf.execute-api.us-east-2.amazonaws.com",path:"/default/fetchLink"}}}},45:function(e,t,n){e.exports=n(94)},57:function(e,t){},59:function(e,t){},71:function(e,t,n){},94:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(42),i=n.n(r),c=n(16),s=n(17),d=n(19),u=n(18),l=n(20),f=n(6),p=n(23),m=(n(71),n(40)),h=n(72),b=n(73);n(85);var v=function(e){function t(e){var n;Object(c.a)(this,t),n=Object(d.a)(this,Object(u.a)(t).call(this,e));var a=b.parse(n.props.location.search,{ignoreQueryPrefix:!0});return n.state={encryptedMetadata:a.id,sendingData:!1,link:void 0},h.isUndefined(n.state.encryptedMetadata)||(n.addScript("/LabJsWrapper/external/lab.js",!1,"module"),n.addScript("/LabJsWrapper/script.js",!0)),n}return Object(l.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;window.addEventListener("message",function(t){if("labjs.data"===t.data.type){var n=t.data.json;if(m.debug)return void console.log(n);e.setState({sendingData:!0}),Object(p.b)(e.state.encryptedMetadata,n).then(function(){Object(p.a)(e.state.encryptedMetadata).then(function(t){return e.setState({link:t})})})}})}},{key:"addScript",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,a=document.createElement("script");a.src=e,a.defer=t,n&&(a.type=n),document.body.appendChild(a)}},{key:"render",value:function(){return h.isUndefined(this.state.encryptedMetadata)?o.a.createElement("div",null,o.a.createElement("h2",null,"Something went wrong. Please try again.")):this.state.sendingData?(h.isUndefined(this.state.link)||window.location.assign(this.state.link),o.a.createElement("div",null,o.a.createElement("h2",null,"Please wait... Do not exit window!"))):o.a.createElement("div",{className:"container fullscreen","data-labjs-section":"main"},o.a.createElement("main",{className:"content-vertical-center content-horizontal-center"},o.a.createElement("div",null,o.a.createElement("h2",null,"Loading Experiment"),o.a.createElement("p",null,"The experiment is loading and should start in a few seconds"))))}}]),t}(a.Component),w=function(){return o.a.createElement(f.c,null,o.a.createElement(f.a,{path:"/",exact:!0,component:v}))},g=function(e){function t(){return Object(c.a)(this,t),Object(d.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(w,null))}}]),t}(a.Component),y=n(22),E=n(3);n.d(t,"history",function(){return k});var k=Object(E.a)();i.a.render(o.a.createElement(y.a,{history:k,basename:"/LabJsWrapper"},o.a.createElement(g,null)),document.getElementById("root"))}},[[45,1,2]]]);
//# sourceMappingURL=main.3671bfa9.chunk.js.map