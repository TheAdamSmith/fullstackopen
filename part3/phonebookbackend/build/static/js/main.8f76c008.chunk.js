(this.webpackJsonpphonebookfrontend=this.webpackJsonpphonebookfrontend||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),o=t.n(u),c=t(2),i=t(3),l=t.n(i),m="/api/persons",f=function(){return l.a.get(m).catch((function(e){return console.log(e.response)})).then((function(e){return e.data}))},s=function(e){return l.a.post(m,e).then((function(e){return e.data}))},d=function(e){return l.a.delete("".concat(m,"/").concat(e.id),e).then((function(e){return e.data}))},h=function(e){return l.a.put("".concat(m,"/").concat(e.id),e).then((function(e){return e.data}))},b=function(e){var n=e.filter,t=e.onChange;return r.a.createElement("form",null,r.a.createElement("div",null,"filter shown with:",r.a.createElement("input",{value:n,onChange:t})))},p=function(e){var n=e.newName,t=e.newNumber,a=e.onNameChange,u=e.onNumChange,o=e.onSubmit;return r.a.createElement("form",{onSubmit:o},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:n,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:t,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},v=function(e){var n=e.persons,t=e.filter,a=e.onClick;return n.filter((function(e){return e.Name.startsWith(t)})).map((function(e){return r.a.createElement("p",{key:e.Name}," ",e.Name," ",e.Number,r.a.createElement("button",{key:e.Name,onClick:function(){return a(e)}},"delete"))}))},E=function(e){var n=e.message,t=e.error;return t?r.a.createElement("div",{className:"error"},t):n?r.a.createElement("div",{className:"notification"},n):null},N=(t(36),function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],u=n[1],o=Object(a.useState)(""),i=Object(c.a)(o,2),l=i[0],m=i[1],N=Object(a.useState)(""),g=Object(c.a)(N,2),O=g[0],j=g[1],w=Object(a.useState)(""),C=Object(c.a)(w,2),k=C[0],S=C[1],D=Object(a.useState)(null),y=Object(c.a)(D,2),T=y[0],I=y[1],x=Object(a.useState)(null),J=Object(c.a)(x,2),A=J[0],B=J[1];Object(a.useEffect)((function(){f().then((function(e){u(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(E,{message:T,error:A}),r.a.createElement(b,{filter:k,onChange:function(e){e.preventDefault(),S(e.target.value)}}),r.a.createElement("h3",null,"add a new"),r.a.createElement(p,{newName:l,newNumber:O,onNameChange:function(e){e.preventDefault(),m(e.target.value)},onNumChange:function(e){e.preventDefault(),j(e.target.value)},onSubmit:function(e){e.preventDefault();var n,a=t.map((function(e){return e.Name})),r={Name:l,Number:O,id:0};a.includes(l)?(r.id=t[a.indexOf(l)].id,h(r).then((function(e){u(t.map((function(n){return n.Name===e.Name?e:n})))})).catch((function(e){B("Information of ".concat(r.Name," has been removed  from server.\n                    Or the name was less than 5 chars or number less than 8")),setTimeout((function(){B(null)}),5e3)}))):(r.id=((n=t.map((function(e){return e.id}))).sort(),n.reduce((function(e,n){return e===n?n+1:e}),1)),s(r).then((function(e){u(t.concat(e)),j(""),m(""),I("Added "+r.Name),setTimeout((function(){I(null)}),5e3)})).catch((function(e){console.log(e.response.data),B(e.response.data.error),setTimeout((function(){B(null)}),5e3)})))}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(v,{persons:t,filter:k,onClick:function(e){window.confirm("Delete "+e.Name+"?")&&(d(e).then().catch((function(n){B("Information of ".concat(e.Name," has been removed  from server")),setTimeout((function(){B(null)}),5e3)})),u(t.filter((function(n){return n!==e}))))}}))});o.a.render(r.a.createElement(N,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.8f76c008.chunk.js.map