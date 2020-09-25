(this["webpackJsonptic-tac-toe"]=this["webpackJsonptic-tac-toe"]||[]).push([[0],{10:function(e,t,n){e.exports={header:"Leaderboard_header__-t5o-",list:"Leaderboard_list__3WqsC",username:"Leaderboard_username__2LSQf",points:"Leaderboard_points__3_iQs",item:"Leaderboard_item__2-gnA"}},11:function(e,t,n){e.exports={container:"App_container__1MQN3",button:"App_button__13pio",header:"App_header__3ZZ1n",gridContainer:"App_gridContainer__20VCH",section:"App_section__1OL6S"}},123:function(e,t){},126:function(e,t,n){},129:function(e,t,n){},131:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(22),i=n.n(c),l=n(2),o=n(9),u=n(61),s=n(23),b=n.n(s),d=function(e,t){return{type:"PLAYED",box:e,side:t}},f=function(){return function(e){e({type:"LEADERBOARD_START"}),b.a.get("https://playtttoe.herokuapp.com/api/leaderBoard").then((function(t){e({type:"SET_LEADERBOARD",leaders:t.data.leaders})})).catch((function(t){e({type:"LEADERBOARD_FAILED"})}))}},m=function(e,t){return{type:"AUTH_SUCCESS",token:e,user:t}},h=function(){return localStorage.removeItem("token"),localStorage.removeItem("user"),{type:"AUTH_LOGOUT"}},p=n(62),v=n.n(p)()("https://playtttoe.herokuapp.com/"),g=Object(a.createContext)(null),O=function(e){var t,n=e.children,c=Object(l.b)(),i=Object(l.c)((function(e){return e.game})),o=i.toPlay,u=i.players,s=i.opponentId,b=i.winner,m=i.onlineGame,h=Object(a.useCallback)((function(){return c(f())}),[c]),p=Object(l.c)((function(e){return null!==e.auth.token})),O=Object(l.c)((function(e){return e.auth})),E=O.user,_=O.token,j=Object(a.useCallback)((function(e){return c(d(e))}),[c]),y=Object(a.useCallback)((function(e){return c(function(e){return{type:"SET_WINNER",side:e}}(e))}),[c]);Object(a.useEffect)((function(){b&&E&&m&&b.username===E.username&&v.emit("updateuserpoints",_)}),[_,E,b,m]);return v.on("play",(function(e){return j(e)})),v.on("updated",(function(){h()})),v.on("winner",(function(e){return y(e)})),v.on("an error",(function(e){return console.log(e)})),t={play:function(e){o===u[0].side&&(v.emit("play",{box:e,opponentId:s}),j(e))},setPlayers:function(e,t,n){p?(n(!0),v.emit("setPlayers",e.username)):t(!0)},fixWinner:function(e){p&&v.emit("winner",{side:e,opponentId:s}),y(e)}},r.a.createElement(g.Provider,{value:t},n)},E=n(1);function _(){for(var e=arguments.length,t=1;t<e;t++)if(""===arguments[t]||arguments[t]!==arguments[t-1])return[arguments[t],!1];return[arguments[0],!0]}var j=function(e){return"X"===e?"O":"X"},y=function(e,t){return Object(E.a)(Object(E.a)({},e),t)},S=function(e,t){return e?t:null},C={token:null,user:null,error:null,loading:!1},k=function(e,t){return y(e,{error:null,loading:!0})},T=function(e,t){return y(e,{token:t.token,user:t.user,error:null,loading:!1})},N=function(e,t){return y(e,{error:t.error,loading:!1})},x=function(e,t){return y(e,{token:null,user:null})},w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"AUTH_START":return k(e);case"AUTH_SUCCESS":return T(e,t);case"AUTH_FAIL":return N(e,t);case"AUTH_LOGOUT":return x(e);default:return e}},A=n(4),I=n(8),L=new function(e){this.initial=e.initial,this.choices=e.choices,this.getInitial=function(){if(!this.initial)throw new Error("DecisionTree: no initial choice(s) specified");return this.getChoices(this.initial)},this.getChoice=function(e){return e in this.choices&&("id"in this.choices[e]||(this.choices[e].id=e),this.choices[e])},this.getChoices=function(e){if(!e)return[];for(var t=[],n=0;n<e.length;n++){var a=this.getChoice(e[n]);t.push(a)}return t},this.getChildren=function(e){if(!(e in this.choices))return!1;if(!("children"in this.choices[e]))return!1;var t=this.choices[e].children;return this.getChoices(t)},this.init=function(){var e=[];for(var t in this.choices){if(-1!==e.indexOf(t))throw new Error('DecisionTree: duplicate ID "'+t+'" in choice set');var n=this.getChoice(t);n.id=t;for(var a=this.getChildren(t),r=0;r<a.length;r++){var c=a[r];if(c.parent)throw new Error('DecisionTree: tried to assign parent "'+t+'" to child "'+n.children[r]+'" which already has parent "'+c.parent+'"');c.parent=t}}}}({initial:["a1","a2","a3","b1","b2","b3","c1","c2","c3"],choices:{a1:{children:["a1 c3","a1 b3","a1 c2"]},a2:{children:["a2 b1","a2 b3","a2 c1"," a2 c3"]},a3:{children:["a3 c1","a3 c2","a3 b1"]},b1:{children:["b1 a2","b1 a3","b1 c2","b1 c3"]},b2:{children:["b2 a1","b2 a3","b2 c1","b2 c3"]},b3:{children:["b3 a2","b3 a1","b3 c2","b3 c1"]},c1:{children:["c1 a3","c1 a2","c1 b3"]},c2:{children:["c2 b1","c2 b3","c2 a1","c2 a3"]},c3:{children:["c3 a1","c3 b1","c3 a2"]},"a1 c3":{children:["c1","a3"]},"a1 b3":{children:["a3"]},"a1 c2":{children:["c1"]},"a2 b1":{children:["a1"]},"a2 b3":{children:["a3"]},"a2 c1":{children:["a1"]},"a2 c3":{children:["a3"]},"a3 c1":{children:["a1","c3"]},"a3 c2":{children:["c3"]},"a3 b1":{children:["a1"]},"b1 a2":{children:["a1"]},"b1 a3":{children:["a1"]},"b1 c2":{children:["c1"]},"b1 c3":{children:["c1"]},"b2 a1":{children:["a3","c1"]},"b2 a3":{children:["a1","c3"]},"b2 c1":{children:["a1","c3"]},"b2 c3":{children:["a3","c1"]},"b3 a2":{children:["a3"]},"b3 a1":{children:["a3"]},"b3 c2":{children:["c3"]},"b3 c1":{children:["c3"]},"c1 a3":{children:["a1","c3"]},"c1 a2":{children:["a1"]},"c1 b3":{children:["c3"]},"c2 b1":{children:["c1"]},"c2 b3":{children:["c3"]},"c2 a1":{children:["c1"]},"c2 a3":{children:["c3"]},"c3 a1":{children:["c1","a3"]},"c3 b1":{children:["c1"]},"c3 a2":{children:["a3"]}}}),P=["a1","a3","c1","c3"],R=["a2","b1","b3","c2"],D=[["a2","b1","a1"],["a2","b3","a3"],["c2","b1","c1"],["c2","b3","c3"],["a1","b3","a3"],["a1","c2","c1"],["a3","c2","c3"],["a3","b1","a1"],["c1","a2","a1"],["c1","b3","c3"],["c3","b1","c1"],["c3","a2","a3"]],G=[["a1","c3"],["a3","c1"]],B=[["a2","c2"],["b1","b3"]],H=[["a1","a2","a3"],["b1","b2","b3"],["c1","c2","c3"],["a1","b1","c1"],["a2","b2","c2"],["a3","b3","c3"],["a1","b2","c3"],["a3","b2","c1"]],U=function(e){return Math.floor(Math.random()*e)},z=function(e){var t=[];for(var n in e)""===e[n]&&t.push(n);return t},W=function(e,t,n){for(var a=j(t),r=0;r<H.length;r++){var c=H[r],i=[e[c[0]],e[c[1]],e[c[2]]];if(!(n?i[0]===t||i[1]===t||i[2]===t:i[0]===a||i[1]===a||i[2]===a)){var l=i.reduce((function(e,t,n){return""===t&&e.push(n),e}),[]);if(1===l.length)return c[l[0]]}}return null},X=function(e,t){var n,a=Object(I.a)(t);try{for(a.s();!(n=a.n()).done;){if(n.value===e)return!0}}catch(r){a.e(r)}finally{a.f()}return!1},M=function(e,t){var n=function(n){var a=Object(E.a)({},t);return a[n]=e,a},a=z(t);if(1===a.length)return n(a[0]);var r=W(t,e,!1);if(r)return n(r);var c=W(t,e,!0);if(c)return n(c);if("X"===e)return n(function(e,t){if(9===t.length)return t[U(t.length)];if(7===t.length)for(var n in e)if("X"===e[n]){var a=function(){var e=L.getChoice(n).children.map((function(e){return e.split(" ")[1]})),a=e[U(e.length)];if(X(a,t))return{v:a};var r=e.filter((function(e){return e!==a}));return{v:r[U(r.length)]}}();if("object"===typeof a)return a.v}if(5===t.length){var r=function(e){var t=[];for(var n in e)"X"===e[n]&&t.push(n);return t}(e),c=L.getChoice(r.join(" ")).children;if(1===c.length)return X(c[0],t)?c[0]:t[U(t.length)];var i=U(c.length);return X(c[i],t)?c[i]:c[1-i]}return t[U(t.length)]}(t,a));if(8===a.length)return n(function(e){return""===e.b2?"b2":P[U(P.length)]}(t));if(6===a.length){var i=function(e,t){var n,a=j(t),r=Object(I.a)(D);try{for(r.s();!(n=r.n()).done;){var c=n.value,i=Object(A.a)(c,3),l=i[0],o=i[1],u=i[2];if(e[l]===a&&e[o]===a)return u}}catch(C){r.e(C)}finally{r.f()}var s,b=Object(I.a)(G);try{for(b.s();!(s=b.n()).done;){var d=s.value,f=Object(A.a)(d,2),m=f[0],h=f[1];if(e[m]===a&&e[h]===a)return R[U(R.length)]}}catch(C){b.e(C)}finally{b.f()}var p,v=Object(I.a)(B);try{for(v.s();!(p=v.n()).done;){var g=p.value,O=Object(A.a)(g,2),E=O[0],_=O[1];if(e[E]===a&&e[_]===a)return P[U(P.length)]}}catch(C){v.e(C)}finally{v.f()}var y,S=Object(I.a)(P);try{for(S.s();!(y=S.n()).done;){if(e[y.value]===a&&e.b2===a)return P[U(P.length)]}}catch(C){S.e(C)}finally{S.f()}}(t,e);if(i)return n(i)}return n(a[U(a.length)])},Y=function(e){for(var t=[[e.a1,e.a2,e.a3],[e.b1,e.b2,e.b3],[e.c1,e.c2,e.c3],[e.a1,e.b1,e.c1],[e.a2,e.b2,e.c2],[e.a3,e.b3,e.c3],[e.a1,e.b2,e.c3],[e.a3,e.b2,e.c1]],n=0;n<t.length;n++){var a=_(t[n][0],t[n][1],t[n][2]),r=Object(A.a)(a,2),c=r[0];if(r[1])return c}return null},q=function(e,t){for(var n=0;n<e.length;n++)if(e[n].side===t)return{winner:e[n],gameOver:!0,gameStarted:!1}},F=function(e,t,n){if(n){var a=Y(e);if(a)return a===t[0].side?{winner:t[0],gameOver:!0,gameStarted:!1}:{winner:{username:"Computer"},gameOver:!0,gameStarted:!1}}var r=Y(e);if(r)return q(t,r);for(var c in e)if(""===e[c])return{gameOver:!1};return{gameOver:!0,draw:!0,gameStarted:!1}},J=function(e,t,n,a,r){if(9!==z(e).length||"O"!==n[0].side||1!==n.length){var c=Object(E.a)({},e);c[t]=a;var i=F(c,n,r),l=j(a);if(r&&!i.gameOver){var o=M(l,c),u=F(o,n,r),s=j(l);return Object(E.a)(Object(E.a)({},u),{},{boxes:o,toPlay:s})}return Object(E.a)(Object(E.a)({},i),{},{boxes:c,toPlay:l})}},V={boxes:{a1:"",a2:"",a3:"",b1:"",b2:"",b3:"",c1:"",c2:"",c3:""},onlineGame:!1,username:"Testing t",opponentId:null,gameOver:!1,gameStarted:!1,won:null,draw:!1,players:[{username:"Player One",side:"X"},{username:"Player Two",side:"O"}],winner:null,toPlay:"X",leaders:[],error:!1,loading:!1},K=function(e,t){return function(e,t){if(e.gameOver||""!==e.boxes[t.box])return e;if(1===e.players.length){var n=J(e.boxes,t.box,e.players,e.toPlay,!0);return Object(E.a)(Object(E.a)({},e),n)}var a=J(e.boxes,t.box,e.players,e.toPlay,!1);return Object(E.a)(Object(E.a)({},e),a)}(e,t)},Q=function(e,t){var n,a=["X","O"],r=Math.floor(2*Math.random()),c=a[r],i=a[1-r];if("O"===(n=2===t.number?[{username:"Player One",side:c},{username:"Player Two",side:i}]:[{username:"Player One",side:c}])[0].side&&1===n.length){var l=M("X",V.boxes);return Object(E.a)(Object(E.a)({},V),{},{leaders:e.leaders,players:n,gameStarted:!0,boxes:l,toPlay:"O"})}return Object(E.a)(Object(E.a)({},V),{},{leaders:e.leaders,players:n,gameStarted:!0})},Z=function(e,t){var n=j(t.opponentSide),a=[{username:t.username,side:n},{username:t.opponentUsername,side:t.opponentSide}];return Object(E.a)(Object(E.a)({},V),{},{players:a,leaders:e.leaders,gameStarted:!0,onlineGame:!0,opponentId:t.opponentId})},$=function(e,t){return Object(E.a)(Object(E.a)({},e),q(e.players,t.side))},ee=function(e,t){return Object(E.a)(Object(E.a)({},e),{},{leaders:t.leaders,error:!1,loading:!1})},te=function(e,t){return Object(E.a)(Object(E.a)({},e),{},{loading:!0})},ne=function(e,t){return Object(E.a)(Object(E.a)({},e),{},{loading:!1,error:!0})},ae=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"PLAYED":return K(e,t);case"SET_PLAYERS":return Q(e,t);case"SET_WINNER":return $(e,t);case"SET_ONLINE_PLAYERS":return Z(e,t);case"SET_LEADERBOARD":return ee(e,t);case"LEADERBOARD_START":return te(e);case"LEADERBOARD_FAILED":return ne(e);default:return e}},re=(n(126),n(63)),ce=n(68),ie=n(25),le=n.n(ie),oe=function(e){return r.a.createElement("button",{style:e.style,disabled:e.disabled,className:[le.a.Button,le.a[e.btnType],le.a[e.size],e.className].join(" "),onClick:e.onClick},e.children)},ue=function(e){var t=Object(a.useState)(e),n=Object(A.a)(t,2),r=n[0],c=n[1],i=Object(a.useState)(!0),l=Object(A.a)(i,2),o=l[0],u=l[1],s=Object(a.useCallback)((function(){return u(!1)}),[]),b=Object(a.useCallback)((function(){return u(!0)}),[]),d=Object(a.useCallback)((function(){c(e),u(!0)}),[e]);return Object(a.useEffect)((function(){r&&!o&&setTimeout((function(){return c((function(e){return e-1}))}),1e3)}),[r,o]),[r,s,b,d]},se=(n(129),function(){return r.a.createElement("div",{className:"lds-ring"},r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null))}),be=n(64),de=n.n(be),fe=function(e){var t=e.showPreGame,n=ue(4),c=Object(A.a)(n,2),i=c[0],o=c[1],u=Object(a.useState)(!1),s=Object(A.a)(u,2),b=s[0],d=s[1],f=Object(a.useState)(null),m=Object(A.a)(f,2),h=m[0],p=m[1],g=Object(l.c)((function(e){return e.auth})).user,O=Object(l.b)(),E=Object(a.useCallback)((function(e,t){return O(function(e,t){return{type:"SET_ONLINE_PLAYERS",username:e,opponentId:t.id,opponentSide:t.side,opponentUsername:t.username}}(e,t))}),[O]);Object(a.useEffect)((function(){return v.on("matched",(function(e){d(!0),p(e)})),function(){return v.off("matched")}}),[d]),Object(a.useEffect)((function(){b&&o()}),[b,o]),Object(a.useEffect)((function(){0===i&&(t(!1),E(g.username,h))}),[E,g.username,t,h,i]);var _=r.a.createElement("div",null,b?r.a.createElement("p",null,"Game Starts in ",i):r.a.createElement("div",null,r.a.createElement(se,null),r.a.createElement("p",null,"Searching for Opponents"),r.a.createElement(oe,{btnType:"Success",size:"Small",onClick:function(){return t(!1)}},"cancel")));return r.a.createElement("div",{className:de.a.container},_)},me=function(e){var t=e.side,n=Object(a.useContext)(g),c=Object(l.c)((function(e){return e.game})),i=c.toPlay,o=c.gameStarted,u=c.gameOver,s=ue(10),b=Object(A.a)(s,4),d=b[0],f=b[1],m=b[2],h=b[3];return Object(a.useEffect)((function(){o&&h()}),[o,h]),Object(a.useEffect)((function(){0===d&&o&&(n.fixWinner(j(t)),h())}),[o,n,t,d,h]),Object(a.useEffect)((function(){o&&i===t?f():m(),u&&m()}),[o,u,f,m,h,i,t,d]),r.a.createElement("div",null,d)},he=n(24),pe=n(16),ve=n.n(pe),ge=function(e){var t,n=e.children,a=e.loc,c=e.onClick,i=e.disable;if(a){var l=a.split(" ").map((function(e){return ve.a[e]}));t=[ve.a.box].concat(Object(he.a)(l))}else t=[ve.a.box];return r.a.createElement("div",{className:t.join(" "),onClick:i?function(){}:c},r.a.createElement("p",{className:ve.a.text},n))},Oe=n(17),Ee=n.n(Oe),_e=function(){var e=Object(a.useContext)(g),t=Object(l.b)(),n=Object(l.c)((function(e){return e.game})),c=n.boxes,i=n.onlineGame,o=n.gameStarted,u=Object(a.useCallback)((function(e){return t(d(e))}),[t]),s=function(t){return i?e.play(t):u(t)};return r.a.createElement("div",{className:Ee.a.board},r.a.createElement("div",{className:Ee.a.row},r.a.createElement(ge,{loc:"right bottom",onClick:function(){return s("a1")},disable:!o},c.a1),r.a.createElement(ge,{loc:"right bottom",onClick:function(){return s("a2")},disable:!o},c.a2),r.a.createElement(ge,{loc:"bottom",onClick:function(){return s("a3")},disable:!o},c.a3)),r.a.createElement("div",{className:Ee.a.row},r.a.createElement(ge,{loc:"right bottom",onClick:function(){return s("b1")},disable:!o},c.b1),r.a.createElement(ge,{loc:"right bottom",onClick:function(){return s("b2")},disable:!o},c.b2),r.a.createElement(ge,{loc:"bottom",onClick:function(){return s("b3")},disable:!o},c.b3)),r.a.createElement("div",{className:Ee.a.row},r.a.createElement(ge,{loc:"right",onClick:function(){return s("c1")},disable:!o},c.c1),r.a.createElement(ge,{loc:"right",onClick:function(){return s("c2")},disable:!o},c.c2),r.a.createElement(ge,{onClick:function(){return s("c3")},disable:!o},c.c3)))},je=n(6),ye=n.n(je),Se=function(e){var t=e.callback,n=Object(a.useContext)(g),c=Object(l.b)(),i=Object(a.useState)(!1),o=Object(A.a)(i,2),u=o[0],s=o[1],b=Object(l.c)((function(e){return e.game})),d=b.gameOver,f=b.onlineGame,m=b.winner,h=b.draw,p=b.players,v=b.gameStarted,O=Object(l.c)((function(e){return e.auth})).user,E=Object(a.useCallback)((function(e){return c(function(e){return{type:"SET_PLAYERS",number:e}}(e))}),[c]);return r.a.createElement("div",{className:ye.a.container},u?r.a.createElement("div",{className:ye.a.preGame},r.a.createElement(fe,{showPreGame:s})):null,d?h?r.a.createElement("div",null,r.a.createElement("h6",{className:ye.a.miniHeaders},"Game ended in a draw")):r.a.createElement("div",null,r.a.createElement("h6",{className:ye.a.miniHeaders},m.username," won")):null,S(v,r.a.createElement("h6",{className:ye.a.miniHeaders},2===p.length?"".concat(p[1].username," is ").concat(p[1].side):"Computer is ".concat(j(p[0].side)),f?r.a.createElement(me,{side:"".concat(p[1].side)}):null)),r.a.createElement("div",{className:ye.a.board},r.a.createElement(_e,null)),S(v,r.a.createElement("h6",{className:ye.a.miniHeaders},f?r.a.createElement(me,{side:p[0].side}):null,p[0].username,", you're ",p[0].side)),S(!v,r.a.createElement("div",{className:ye.a.buttons},r.a.createElement(oe,{btnType:"Success",size:"Small",onClick:function(){return E(1)},style:{margin:10}},"Play Against Computer?"),r.a.createElement(oe,{btnType:"Success",size:"Small",onClick:function(){return E(2)},style:{margin:10}},"Pass and Play"),r.a.createElement(oe,{btnType:"Success",size:"Small",onClick:function(){return n.setPlayers(O,t,s)},style:{margin:10}},"Play online"))))},Ce=n(36),ke=n.n(Ce),Te=n(65),Ne=n(18),xe=n.n(Ne),we=function(e){var t=null,n=[xe.a.InputElement];switch(e.invalid&&e.shouldValidate&&e.touched&&n.push(xe.a.Invalid),e.elementType){case"input":t=r.a.createElement("input",Object.assign({className:n.join(" ")},e.elementConfig,{value:e.value,ref:e.inputRef,onChange:e.changed}));break;case"textarea":t=r.a.createElement("textarea",Object.assign({className:n.join(" ")},e.elementConfig,{value:e.value,ref:e.inputRef,onChange:e.changed}));break;case"select":t=r.a.createElement("select",{className:n.join(" "),value:e.value,ref:e.inputRef,onChange:e.changed},e.elementConfig.options.map((function(e){return r.a.createElement("option",{key:e.value,value:e.value},e.displayValue)})));break;default:t=r.a.createElement("input",Object.assign({className:n.join(" ")},e.elementConfig,{value:e.value,ref:e.inputRef,onChange:e.changed}))}return r.a.createElement("div",{className:xe.a.Input},r.a.createElement("label",{className:xe.a.Label},e.label),t)},Ae=n(66),Ie=n.n(Ae),Le=function(){return r.a.createElement("div",{className:Ie.a.Loader},"Loading...")},Pe=n(67),Re=n.n(Pe),De=function(e){var t=e.callback,n=Object(l.c)((function(e){return null!==e.auth.token}));Object(a.useEffect)((function(){n&&t(!1)}),[n,t]);var c=Object(a.useState)([{label:"Username",elementType:"input",elementConfig:{type:"text",placeholder:"Username"},value:"",validation:{required:!0},valid:!1,touched:!1},{label:"Password",elementType:"input",elementConfig:{type:"password",placeholder:"Password"},value:"",validation:{required:!0,minLength:7},valid:!1,touched:!1}]),i=Object(A.a)(c,2),o=i[0],u=i[1],s=Object(a.useState)(!0),d=Object(A.a)(s,2),f=d[0],h=d[1],p=Object(a.useState)(!1),v=Object(A.a)(p,2),g=v[0],O=v[1],_=Object(l.b)(),j=Object(l.c)((function(e){return e.auth.loading})),y=Object(l.c)((function(e){return e.auth.error})),S=Object(a.useCallback)((function(e,t){return _((n=e,a=t,function(e){e({type:"AUTH_START"});var t=a?"https://playtttoe.herokuapp.com/api/signup":"https://playtttoe.herokuapp.com/api/login";b.a.post(t,n).then((function(t){localStorage.setItem("token",t.data.token),localStorage.setItem("user",JSON.stringify(t.data.user)),e(m(t.data.token,t.data.user))})).catch((function(t){e({type:"AUTH_FAIL",error:t.response.data})}))}));var n,a}),[_]),C=function(){var e=Object(Te.a)(ke.a.mark((function e(t){var n,a,r,c,i;return ke.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),n={},a=Object(I.a)(o);try{for(a.s();!(r=a.n()).done;)c=r.value,i=void 0,i="Username"===c.label?"username":"password",n[i]=c.value}catch(l){a.e(l)}finally{a.f()}S(n,f);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=r.a.createElement("form",{onSubmit:C},o.map((function(e){return r.a.createElement(we,{key:e.label,label:e.label,elementType:e.elementType,elementConfig:e.elementConfig,invalid:!e.valid,touched:e.touched,value:e.value,changed:function(t){return function(e,t){var n=Object(he.a)(o),a=n.findIndex((function(e){return e.label===t})),r=Object(E.a)({},n[a]);r.value=e.target.value,r.valid=function(e,t){var n=!0;if(!t)return!0;if(t.required&&(n=""!==e.trim()&&n),t.minLength&&(n=e.length>=t.minLength&&n),t.maxLength&&(n=e.length<=t.maxLength&&n),t.isEmail){n=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(e)&&n}if(t.isNumeric){n=/^\d+$/.test(e)&&n}return n}(r.value,r.validation),r.touched=!0,n[a]=r;var c=!0;for(var i in n)c=n[i].valid&&c;O(c),u(n)}(t,e.label)}})})),r.a.createElement(oe,{btnType:"Success",disabled:!g},"SUBMIT"));j&&(k=r.a.createElement(Le,null));var T=null;return y&&(T=r.a.createElement("p",null,y)),r.a.createElement("div",{className:Re.a.Auth},r.a.createElement("div",{style:{textAlign:"right"}},r.a.createElement("button",{onClick:function(){return t(!1)}},"X")),T,k,r.a.createElement(oe,{onClick:function(){h((function(e){return!e}))},btnType:"Danger"},"SWITCH TO ",f?"SIGNIN":"SIGNUP"))},Ge=n(10),Be=n.n(Ge),He=function(){var e=Object(l.b)(),t=Object(a.useCallback)((function(){return e(f())}),[e]),n=Object(l.c)((function(e){return e.game})),c=n.loading,i=n.error,o=n.leaders;Object(a.useEffect)((function(){t()}),[t]);var u=c?r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement(se,null)):i?r.a.createElement("div",null,"An Error Occurred"):r.a.createElement("div",{className:Be.a.list},o.map((function(e){return r.a.createElement("div",{key:e._id,className:Be.a.item},r.a.createElement("div",{className:Be.a.username},e.username),r.a.createElement("div",{className:Be.a.points},e.points))})));return r.a.createElement("div",{className:Be.a.container},r.a.createElement("h3",{className:Be.a.header}," Top 100 Leaderboard"),u)},Ue=n(11),ze=n.n(Ue),We=function(){var e=Object(l.b)(),t=Object(a.useCallback)((function(){return e((function(e){var t=localStorage.getItem("token"),n=localStorage.getItem("user"),a=JSON.parse(n);e(t?m(t,a):h())}))}),[e]),n=Object(a.useCallback)((function(){return e(h())}),[e]),c=Object(l.c)((function(e){return null!==e.auth.token}));Object(a.useEffect)((function(){t()}),[t]);var i=Object(a.useState)(!1),o=Object(A.a)(i,2),u=o[0],s=o[1];return r.a.createElement("div",null,u?r.a.createElement(De,{callback:s}):r.a.createElement("div",{className:ze.a.container},r.a.createElement("div",{className:ze.a.button},r.a.createElement("a",{href:"https://github.com/Kpoke/tictactoe",target:"_blank",rel:"noopener noreferrer"},r.a.createElement(re.a,{icon:ce.a,transform:"grow-13 down-12",style:{margin:"10px"}})),c?r.a.createElement(oe,{onClick:n,size:"Small",btnType:"Danger"},"Logout"):null),r.a.createElement("div",{className:ze.a.gridContainer},r.a.createElement("div",{className:ze.a.section},r.a.createElement("h2",{className:ze.a.header},"TicTacToe Online"),r.a.createElement(Se,{callback:s})),r.a.createElement("div",{className:ze.a.section},r.a.createElement(He,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Xe=o.d,Me=Object(o.c)({game:ae,auth:w}),Ye=Object(o.e)(Me,Xe(Object(o.a)(u.a))),qe=r.a.createElement(l.a,{store:Ye},r.a.createElement(O,null,r.a.createElement(We,null)));i.a.render(r.a.createElement(r.a.StrictMode,null,qe),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},16:function(e,t,n){e.exports={box:"Box_box__2nHJZ",text:"Box_text__14c5g",bottom:"Box_bottom__3LPrh",right:"Box_right__3f8f8"}},17:function(e,t,n){e.exports={board:"Board_board__1Y7VT",row:"Board_row__1KseF"}},18:function(e,t,n){e.exports={Input:"input_Input__3BPgK",Label:"input_Label__24bIE",InputElement:"input_InputElement__2HI6E",Invalid:"input_Invalid__3QqA4"}},25:function(e,t,n){e.exports={Button:"button_Button__2rvm5",Small:"button_Small__3W1mq",Success:"button_Success__2fkNB",Danger:"button_Danger__3R9zs"}},6:function(e,t,n){e.exports={miniHeaders:"Game_miniHeaders__27TGH",board:"Game_board__1pZF_",preGame:"Game_preGame__CnfJy",buttons:"Game_buttons__1WDPG"}},64:function(e,t,n){e.exports={container:"PreGame_container__2oV7D"}},66:function(e,t,n){e.exports={Loader:"Spinner_Loader__1twK-",load2:"Spinner_load2__2gkgc"}},67:function(e,t,n){e.exports={Auth:"Auth_Auth__3RyTI"}},69:function(e,t,n){e.exports=n(131)}},[[69,1,2]]]);
//# sourceMappingURL=main.ff9762a2.chunk.js.map