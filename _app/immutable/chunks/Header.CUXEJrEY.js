import{r as O,s as F,n as V}from"./scheduler.yTk1AoD9.js";import{e as J,t as K,S as P,i as Q,h as E,s as j,j as B,k as b,l as A,q as W,b as q,f as u,n as G,r as w,x as M,d as D,o as k,p as X,u as Y}from"./index.nO60KfFV.js";function x(t){return(t==null?void 0:t.length)!==void 0?t:Array.from(t)}function Z(t,s){J(t,1,1,()=>{s.delete(t.key)})}function ae(t,s){t.f(),Z(t,s)}function le(t,s,i,v,f,c,n,y,h,H,_,N){let d=t.length,a=c.length,e=d;const o={};for(;e--;)o[t[e].key]=e;const l=[],p=new Map,C=new Map,S=[];for(e=a;e--;){const r=N(f,c,e),g=i(r);let m=n.get(g);m?S.push(()=>m.p(r,s)):(m=H(g,r),m.c()),p.set(g,l[e]=m),g in o&&C.set(g,Math.abs(e-o[g]))}const U=new Set,L=new Set;function T(r){K(r,1),r.m(y,_),n.set(r.key,r),_=r.first,a--}for(;d&&a;){const r=l[a-1],g=t[d-1],m=r.key,I=g.key;r===g?(_=r.first,d--,a--):p.has(I)?!n.has(m)||U.has(m)?T(r):L.has(I)?d--:C.get(m)>C.get(I)?(L.add(m),T(r)):(U.add(I),d--):(h(g,n),d--)}for(;d--;){const r=t[d];p.has(r.key)||h(r,n)}for(;a;)T(l[a-1]);return O(S),l}function R(t,s,i){const v=t.slice();return v[3]=s[i],v}function z(t){let s,i,v=t[3]+"",f;return{c(){s=E("li"),i=E("a"),f=B(v),this.h()},l(c){s=b(c,"LI",{class:!0});var n=A(s);i=b(n,"A",{href:!0,class:!0});var y=A(i);f=G(y,v),y.forEach(u),n.forEach(u),this.h()},h(){w(i,"href",`/${t[3].toLowerCase()}`),w(i,"class","svelte-3wivy0"),w(s,"class","svelte-3wivy0")},m(c,n){D(c,s,n),k(s,i),k(i,f)},p:V,d(c){c&&u(s)}}}function $(t){let s,i,v='<a href="/" class="svelte-3wivy0">Ariel Raizman</a>',f,c,n,y,h,H,_,N,d=x(t[2]),a=[];for(let e=0;e<d.length;e+=1)a[e]=z(R(t,d,e));return{c(){s=E("header"),i=E("div"),i.innerHTML=v,f=j(),c=E("nav"),n=E("ul");for(let e=0;e<a.length;e+=1)a[e].c();y=j(),h=E("section"),H=E("div"),_=E("h1"),N=B(t[0]),this.h()},l(e){s=b(e,"HEADER",{class:!0});var o=A(s);i=b(o,"DIV",{class:!0,"data-svelte-h":!0}),W(i)!=="svelte-16b69in"&&(i.innerHTML=v),f=q(o),c=b(o,"NAV",{class:!0});var l=A(c);n=b(l,"UL",{class:!0});var p=A(n);for(let L=0;L<a.length;L+=1)a[L].l(p);p.forEach(u),l.forEach(u),o.forEach(u),y=q(e),h=b(e,"SECTION",{style:!0,class:!0});var C=A(h);H=b(C,"DIV",{class:!0});var S=A(H);_=b(S,"H1",{class:!0});var U=A(_);N=G(U,t[0]),U.forEach(u),S.forEach(u),C.forEach(u),this.h()},h(){w(i,"class","logo svelte-3wivy0"),w(n,"class","svelte-3wivy0"),w(c,"class","svelte-3wivy0"),w(s,"class","nav-list svelte-3wivy0"),w(_,"class","svelte-3wivy0"),w(H,"class","overlay svelte-3wivy0"),M(h,"background","url("+t[1]+") no-repeat center center/cover"),M(h,"position","relative"),M(h,"height","60vh"),M(h,"background-color","rgba(0, 0, 0, 0.20)"),M(h,"background-blend-mode","darken"),w(h,"class","svelte-3wivy0")},m(e,o){D(e,s,o),k(s,i),k(s,f),k(s,c),k(c,n);for(let l=0;l<a.length;l+=1)a[l]&&a[l].m(n,null);D(e,y,o),D(e,h,o),k(h,H),k(H,_),k(_,N)},p(e,[o]){if(o&4){d=x(e[2]);let l;for(l=0;l<d.length;l+=1){const p=R(e,d,l);a[l]?a[l].p(p,o):(a[l]=z(p),a[l].c(),a[l].m(n,null))}for(;l<a.length;l+=1)a[l].d(1);a.length=d.length}o&1&&X(N,e[0]),o&2&&M(h,"background","url("+e[1]+") no-repeat center center/cover")},i:V,o:V,d(e){e&&(u(s),u(y),u(h)),Y(a,e)}}}function ee(t,s,i){let v=["About","Galleries","Blog","Contact"],{pageName:f="Home"}=s,{headerUrl:c="../assets/galleries/gallery_header.jpg"}=s;return t.$$set=n=>{"pageName"in n&&i(0,f=n.pageName),"headerUrl"in n&&i(1,c=n.headerUrl)},[f,c,v]}class ne extends P{constructor(s){super(),Q(this,s,ee,$,F,{pageName:0,headerUrl:1})}}export{ne as H,x as e,ae as f,Z as o,le as u};
