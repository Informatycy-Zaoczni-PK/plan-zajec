(this["webpackJsonpxlsx-client"]=this["webpackJsonpxlsx-client"]||[]).push([[0],{35:function(e,c,s){},53:function(e,c,s){},54:function(e,c,s){},60:function(e,c,s){"use strict";s.r(c);var r=s(0),a=s(1),n=s.n(a),l=s(26),i=s.n(l),t=(s(35),s(28)),d=s(2),o=s(10),j=s(13),b=s(16),u=s(27),m=s.n(u),h=(s(53),s(54),function(){var e=Object(a.useState)([]),c=Object(b.a)(e,2),s=c[0],n=c[1],l=Object(a.useState)({w:1,c:1,l:1}),i=Object(b.a)(l,2),t=i[0],d=i[1];Object(a.useEffect)((function(){}),[t]),Object(a.useEffect)((function(){m.a.get("".concat("https://plan-zajec.herokuapp.com","/lessons")).then((function(e){200===e.status&&n(e.data)})).catch((function(e){return console.log(e)}))}),[]);var u=function(e,c){d(Object(j.a)(Object(j.a)({},t),{},Object(o.a)({},e,c)))};return Object(r.jsx)("div",{className:"container container_full",children:Object(r.jsxs)("div",{className:"row",children:[Object(r.jsxs)("div",{className:"col_auto",children:[Object(r.jsx)("h1",{className:"h1 color_white",children:"Grupy"}),Object(r.jsxs)("div",{className:"card card_bg-4",children:[Object(r.jsxs)("div",{className:"row row_vcenter mb-2",children:[Object(r.jsx)("p",{className:"size_xl color_light",children:"\u0106wiczenia"}),Object(r.jsxs)("select",{className:"size_xl",value:t.c,onChange:function(e){return u("c",Number(e.target.value))},children:[Object(r.jsx)("option",{value:"1",children:"1"}),Object(r.jsx)("option",{value:"2",children:"2"}),Object(r.jsx)("option",{value:"3",children:"3"})]})]}),Object(r.jsxs)("div",{className:"row row_vcenter",children:[Object(r.jsx)("p",{className:"size_xl color_light",children:"Laborki"}),Object(r.jsxs)("select",{className:"size_xl",value:t.l,onChange:function(e){return u("l",Number(e.target.value))},children:[Object(r.jsx)("option",{value:"1",children:"1"}),Object(r.jsx)("option",{value:"2",children:"2"}),Object(r.jsx)("option",{value:"3",children:"3"}),Object(r.jsx)("option",{value:"4",children:"4"}),Object(r.jsx)("option",{value:"5",children:"5"}),Object(r.jsx)("option",{value:"6",children:"6"})]})]})]})]}),Object(r.jsx)("div",{className:"col_grow",children:Object(r.jsxs)("table",{className:"table",children:[Object(r.jsx)("thead",{children:Object(r.jsxs)("tr",{children:[Object(r.jsx)("th",{children:Object(r.jsx)("p",{className:"size_xl color_light",children:"Dni"})}),Object(r.jsx)("th",{children:Object(r.jsx)("p",{className:"size_xl color_light",children:"8:00-10:30"})}),Object(r.jsx)("th",{children:Object(r.jsx)("p",{className:"size_xl color_light",children:"10:45-13:15"})}),Object(r.jsx)("th",{children:Object(r.jsx)("p",{className:"size_xl color_light",children:"14:00-16:30"})}),Object(r.jsx)("th",{children:Object(r.jsx)("p",{className:"size_xl color_light",children:"16:45-19:15"})})]})}),Object(r.jsx)("tbody",{className:"color_white",children:s.map((function(e){return Object.keys(e).map((function(c,s){var a=c;return console.log(e[a]),Object(r.jsxs)("tr",{children:[Object(r.jsx)("td",{className:"border_top",children:Object(r.jsx)("p",{children:e[a].date})}),Object(r.jsx)("td",{className:"border_top",children:e[a]["8:00-10:30"].lessons.map((function(c,s){if(s>0){if(c.name===e[a]["8:00-10:30"].lessons[s-1].name)return Object(r.jsx)(r.Fragment,{});if(c.name.includes("wyk\u0142ad"))return Object(r.jsx)("div",{className:"card card_bg-color-1 card-lesson",children:c.name});if(c.name.includes("\u0107wiczenia")){if(c.groups.c===t.c)return Object(r.jsx)("div",{className:"card card_bg-color-2 card-lesson",children:c.name})}else if(c.groups.l===t.l)return Object(r.jsx)("div",{className:"card card_bg-color-3 card-lesson",children:c.name})}else{if(c.name.includes("wyk\u0142ad"))return Object(r.jsx)("div",{className:"card card_bg-color-1 card-lesson",children:c.name});if(c.name.includes("\u0107wiczenia")){if(c.groups.c===t.c)return Object(r.jsx)("div",{className:"card card_bg-color-2 card-lesson",children:c.name})}else if(c.groups.l===t.l)return Object(r.jsx)("div",{className:"card card_bg-color-3 card-lesson",children:c.name})}}))}),Object(r.jsx)("td",{className:"border_top",children:e[a]["10:45-13:15"].lessons.map((function(c,s){if(s>0){if(c.name===e[a]["10:45-13:15"].lessons[s-1].name)return Object(r.jsx)(r.Fragment,{});if(c.name.includes("wyk\u0142ad"))return Object(r.jsx)("div",{className:"card card_bg-color-1 card-lesson",children:c.name});if(c.name.includes("\u0107wiczenia")){if(c.groups.c===t.c)return Object(r.jsx)("div",{className:"card card_bg-color-2 card-lesson",children:c.name})}else if(c.groups.l===t.l)return Object(r.jsx)("div",{className:"card card_bg-color-3 card-lesson",children:c.name})}else{if(c.name.includes("wyk\u0142ad"))return Object(r.jsx)("div",{className:"card card_bg-color-1 card-lesson",children:c.name});if(c.name.includes("\u0107wiczenia")){if(c.groups.c===t.c)return Object(r.jsx)("div",{className:"card card_bg-color-2 card-lesson",children:c.name})}else if(c.groups.l===t.l)return Object(r.jsx)("div",{className:"card card_bg-color-3 card-lesson",children:c.name})}}))}),Object(r.jsx)("td",{className:"border_top",children:e[a]["14:00-16:30"].lessons.map((function(c,s){if(s>0){if(c.name===e[a]["14:00-16:30"].lessons[s-1].name)return Object(r.jsx)(r.Fragment,{});if(c.name.includes("wyk\u0142ad"))return Object(r.jsx)("div",{className:"card card_bg-color-1 card-lesson",children:c.name});if(c.name.includes("\u0107wiczenia")){if(c.groups.c===t.c)return Object(r.jsx)("div",{className:"card card_bg-color-2 card-lesson",children:c.name})}else if(c.groups.l===t.l)return Object(r.jsx)("div",{className:"card card_bg-color-3 card-lesson",children:c.name})}else{if(c.name.includes("wyk\u0142ad"))return Object(r.jsx)("div",{className:"card card_bg-color-1 card-lesson",children:c.name});if(c.name.includes("\u0107wiczenia")){if(c.groups.c===t.c)return Object(r.jsx)("div",{className:"card card_bg-color-2 card-lesson",children:c.name})}else if(c.groups.l===t.l)return Object(r.jsx)("div",{className:"card card_bg-color-3 card-lesson",children:c.name})}}))}),Object(r.jsx)("td",{className:"border_top",children:e[a]["16:45-19:15"].lessons.map((function(c,s){if(s>0){if(c.name===e[a]["16:45-19:15"].lessons[s-1].name)return Object(r.jsx)(r.Fragment,{});if(c.name.includes("wyk\u0142ad"))return Object(r.jsx)("div",{className:"card card_bg-color-1 card-lesson",children:c.name});if(c.name.includes("\u0107wiczenia")){if(c.groups.c===t.c)return Object(r.jsx)("div",{className:"card card_bg-color-2 card-lesson",children:c.name})}else if(c.groups.l===t.l)return Object(r.jsx)("div",{className:"card card_bg-color-3 card-lesson",children:c.name})}else{if(c.name.includes("wyk\u0142ad"))return Object(r.jsx)("div",{className:"card card_bg-color-1 card-lesson",children:c.name});if(c.name.includes("\u0107wiczenia")){if(c.groups.c===t.c)return Object(r.jsx)("div",{className:"card card_bg-color-2 card-lesson",children:c.name})}else if(c.groups.l===t.l)return Object(r.jsx)("div",{className:"card card_bg-color-3 card-lesson",children:c.name})}}))})]})}))}))})]})})]})})});var x=function(){return Object(r.jsx)(t.a,{children:Object(r.jsx)(d.c,{children:Object(r.jsx)(d.a,{exact:!0,path:"/",component:h})})})},O=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,61)).then((function(c){var s=c.getCLS,r=c.getFID,a=c.getFCP,n=c.getLCP,l=c.getTTFB;s(e),r(e),a(e),n(e),l(e)}))};i.a.render(Object(r.jsx)(n.a.StrictMode,{children:Object(r.jsx)(x,{})}),document.getElementById("root")),O()}},[[60,1,2]]]);
//# sourceMappingURL=main.eea0823b.chunk.js.map