if(!self.define){let e,r={};const s=(s,i)=>(s=new URL(s+".js",i).href,r[s]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=r,document.head.appendChild(e)}else e=s,importScripts(s),r()})).then((()=>{let e=r[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,t)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(r[n])return;let d={};const l=e=>s(e,n),o={module:{uri:n},exports:d,require:l};r[n]=Promise.all(i.map((e=>o[e]||l(e)))).then((e=>(t(...e),d)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"rss-reader-mailer"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/rss-reader-mailer/dist/css/app.a282d0b4.css",revision:null},{url:"/rss-reader-mailer/dist/index.html",revision:"8af9f1c415e28ff33cccd8ddb07a6684"},{url:"/rss-reader-mailer/dist/js/app.53575f43.js",revision:null},{url:"/rss-reader-mailer/dist/js/chunk-vendors.d11bc917.js",revision:null},{url:"/rss-reader-mailer/dist/manifest.json",revision:"511dcfca3bb1891e84993424309ce03e"},{url:"/rss-reader-mailer/dist/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
