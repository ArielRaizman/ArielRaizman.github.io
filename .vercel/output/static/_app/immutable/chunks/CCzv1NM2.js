import{a as k,f as H}from"./Bo59PrWI.js";import{i as M,s as _,l as x}from"./CfWgSRpd.js";import{o as B,a as D}from"./D0KDTagp.js";import{p as E,m as d,C as L,D as N,x as S,o as A,s as f,g as e,A as C,v as m,w as c}from"./Cvrd6Uc1.js";import{p as u,s as F}from"./BOFEsjJc.js";var I=H('<section class="svelte-6wdrfy"><div><h1 class="svelte-6wdrfy"> </h1></div></section>');function O(b,t){E(t,!1);const p=d();let o=u(t,"pageName",8,"Home"),v=u(t,"headerUrl",8,""),h=u(t,"mobileHeaderUrl",8,""),r=d(!1),w=d(v());function y(s,U){return U?s.length<=8?"3rem":s.length<=15?"2.5rem":"2rem":s.length<=10?"4rem":(s.length<=15,"3rem")}const n=()=>{typeof window<"u"&&(f(r,window.matchMedia("(max-width: 768px)").matches),f(w,e(r)&&h()?h():v()))};B(()=>{typeof window<"u"&&(n(),window.addEventListener("resize",n))}),D(()=>{typeof window<"u"&&window.removeEventListener("resize",n)}),L(()=>(C(o()),e(r)),()=>{f(p,y(o(),e(r)))}),N(),M();var a=I(),i=m(a);let g;var l=m(i),z=m(l,!0);c(l),c(i),c(a),S(()=>{_(a,`
    background: url(${e(w)??""}) no-repeat center center/cover;
    position: relative;
    height: ${e(r)?"40vh":"45vh"};
    background-color: rgba(0, 0, 0, 0.30);
    background-blend-mode: darken;
  `),g=x(i,1,"overlay svelte-6wdrfy",null,g,{mobile:e(r)}),_(l,`font-size: ${e(p)??""};`),F(z,o())}),k(b,a),A()}export{O as B};
