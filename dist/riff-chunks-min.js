(function(a){function e(d){if(b[d])return b[d].a;var c=b[d]={O:d,s:!1,a:{}};a[d].call(c.a,c,c.a,e);c.s=!0;return c.a}var b={};e.l=a;e.g=b;e.b=function(a,b){e.c(a)||Object.defineProperty(a,"a",{configurable:!1,enumerable:!0,get:b})};e.i=function(a){var b=a&&a.D?function(){return a["default"]}:function(){return a};e.b(b,b);return b};e.c=function(a){return Object.prototype.hasOwnProperty.call(a,"a")};e.j="";return e(e.m=0)})([function(a,e,b){a=b(1);window.riffChunks=a;window.riffChunks.read=a.read;window.riffChunks.write=
a.write},function(a,e,b){function d(a,b){b=void 0===b?!1:b;n.be="RIFX"==a.chunkId;a=h.h(a.chunkId,l).concat(h.h(a.chunkSize,n),h.h(a.format,l),c(a.subChunks));b||(a=new Uint8Array(a));return a}function c(a){for(var b=[],c=0;c<a.length;)b="LIST"==a[c].chunkId?b.concat(d(a[c],!0)):b.concat(h.h(a[c].chunkId,l),h.h(a[c].chunkSize,n),a[c].chunkData),c++;return b}function p(a){for(var b=[],c=q(a,12);c<=a.length-8;)b.push(m(a,c)),c+=8+b[b.length-1].chunkSize;return b}function m(a,b){b=q(a,b);var c={chunkId:h.f(a.slice(b,
b+4),l),chunkSize:h.f(a.slice(b+4,b+8),n)};"LIST"==c.chunkId?(c.format=h.f(a.slice(b+8,b+12),l),c.subChunks=p(a.slice(b))):c.chunkData=a.slice(b+8,b+8+c.chunkSize);return c}function q(a,b){for(;0==a[b]||0==a[b+1]||0==a[b+2]||0==a[b+3];)b++;return b}var h=b(2),n={bits:32},l={bits:32,"char":!0};a.a.read=function(a){a=[].slice.call(a);var b=h.f(a.slice(0,4),l);n.be="RIFX"==b;return{chunkId:b,chunkSize:h.f(a.slice(4,8),n),format:h.f(a.slice(8,12),l),subChunks:p(a)}};a.a.write=d},function(a,e,b){function d(a,
b,c){b.be&&y(a,b.offset);var f=a.length;if(10!=c)for(var g=0;g<f;g++)a[g]=parseInt(a[g],c);c=[];f-=b.offset-1;for(g=0;g<f;g+=b.offset)c.push(t(a,g));return c}function c(a,b,c){for(var f=0,g=[],d=a.length,w=0;w<d;w++)f=u(g,a[w],f);b.be&&y(g,b.offset);if(10!=c)for(a=(2==c?8:2)+1,d=g.length,b=0;b<d;b++)g[b]=g[b].toString(c),g[b]=Array(a-g[b].length).join("0")+g[b];return g}function p(a,b){return k.read(a,b)}function m(a,b){a=k.read(a,b);b=(a&31744)>>10;var f=a&1023;return(b?Math.pow(2,b-15)*(1+f/1024):
f/1024*.00006103515625)*(a>>15?-1:1)}function q(a,b){r[0]=k.read(a,b);return x[0]}function h(a,b){r[0]=k.read(a,b);r[1]=k.read(a,b+4);return z[0]}function n(a,b){for(var f="",c=0;c<k.offset;c++)f+=String.fromCharCode(a[b+c]);return f}function l(a,b,c){return k.write(a,b,c)}function B(a,b,c){x[0]=b;var f=r[0];b=f>>16&32768;var d=f>>12&2047;f=f>>23&255;103<=f&&(b=(b|f-112<<10|d>>1)+(d&1));a[c++]=b&255;a[c++]=b>>>8&255;return c}function C(a,b,c){x[0]=b;return k.write(a,r[0],c)}function D(a,b,c){z[0]=
b;c=k.write(a,r[0],c);return k.write(a,r[1],c)}function E(a,b,c){for(var f=0;f<b.length;f++)a[c++]=b.charCodeAt(f);return c}function v(a){if(!a)throw Error("Undefined type.");if(a["float"]){if(-1==[16,32,64].indexOf(a.bits))throw Error("Not a supported float type.");}else if(a["char"]){if(8>a.bits||a.bits%2)throw Error("Wrong offset for type char.");}else if(1>a.bits||53<a.bits)throw Error("Not a supported type.");a.offset=8>a.bits?1:Math.ceil(a.bits/8);a["float"]?16==a.bits?t=m:32==a.bits?t=q:64==
a.bits&&(t=h):a["char"]?t=n:t=p;a["float"]?16==a.bits?u=B:32==a.bits?u=C:64==a.bits&&(u=D):a["char"]?u=E:u=l;a["char"]?k.offset=8>a.bits?1:Math.ceil(a.bits/8):k=new F(64==a.bits?32:a.bits,a["float"]?!1:a.signed)}function A(a,b){a.constructor==String&&(a=a.length>=b.offset?a.slice(0,b.offset):"");return a}var y=b(3),F=b(4);e=new Int8Array(8);var r=new Uint32Array(e.buffer),x=new Float32Array(e.buffer),z=new Float64Array(e.buffer),t,u,k={};a.a.G={bits:8,"char":!0};a.a.N={bits:32,"char":!0};a.a.F={bits:1};
a.a.S={bits:2,signed:!0};a.a.fa={bits:2};a.a.X={bits:4,signed:!0};a.a.ka={bits:4};a.a.ba={bits:8,signed:!0};a.a.pa={bits:8};a.a.P={bits:16,signed:!0};a.a.da={bits:16};a.a.H={bits:16,"float":!0};a.a.T={bits:24,signed:!0};a.a.ga={bits:24};a.a.V={bits:32,signed:!0};a.a.ia={bits:32};a.a.J={bits:32,"float":!0};a.a.Y={bits:40,signed:!0};a.a.la={bits:40};a.a.$={bits:48,signed:!0};a.a.na={bits:48};a.a.L={bits:64,"float":!0};a.a.R={bits:16,signed:!0,be:!0};a.a.ea={bits:16,be:!0};a.a.I={bits:16,"float":!0,
be:!0};a.a.U={bits:24,signed:!0,be:!0};a.a.ha={bits:24,be:!0};a.a.W={bits:32,signed:!0,be:!0};a.a.ja={bits:32,be:!0};a.a.K={bits:32,"float":!0,be:!0};a.a.Z={bits:40,signed:!0,be:!0};a.a.ma={bits:40,be:!0};a.a.aa={bits:48,signed:!0,be:!0};a.a.oa={bits:48,be:!0};a.a.M={bits:64,"float":!0,be:!0};a.a.h=function(a,b){var d=void 0===d?10:d;v(b);var e=[];if(void 0===a)return e;a=A(a,b);return c([a],b,d)};a.a.f=function(a,b){var c=void 0===c?10:c;v(b);return(a=d(a.slice(0,b.offset),b,c))?a[0]:b["char"]?"":
null};a.a.ca=function(a,b,d){d=void 0===d?10:d;v(b);if(b["char"])for(var e=a.length,p=0;p<e;p++)a[p]=A(a[p],b);return c(a,b,d)};a.a.qa=function(a,b,c){c=void 0===c?10:c;v(b);return d(a,b,c)}},function(a){a.a=function(a,b){for(var d=a.length,c=0;c<d;){for(var e=a,m=c,q=0,h=b-1,n=parseInt(b/2,10);q<n;){var l=e[m+q];e[m+q]=e[m+h];e[m+h]=l;q++;h--}c+=b}}},function(a){function e(a,d){this.b=a;this.A=void 0===d?!1:d;this.offset=0;this.min=-Infinity;this.max=Infinity;this.g=this.b;this.i=255;this.l()}e.prototype.read=
function(a,d){d=void 0===d?0:d;for(var b=0,e=this.offset-1;0<e;)b|=a[e+d]<<8*e,e--;b=(a[d]|b)>>>0;return this.c(this.j(b))};e.prototype.write=function(a,d,c){c=void 0===c?0:c;d=this.c(d);a[c++]=d&255;for(var b=2;b<=this.offset;b++)a[c++]=Math.floor(d/Math.pow(2,8*(b-1)))&255;return c};e.prototype.C=function(a,d,c){d=this.c(d);c=this.o(a,d,void 0===c?0:c);for(var b=2;b<this.offset;b++)a[c++]=Math.floor(d/Math.pow(2,8*(b-1)))&255;8<this.b&&(a[c++]=Math.floor(d/Math.pow(2,8*(this.offset-1)))&this.i);
return c};e.prototype.m=function(a,d){d=void 0===d?0:d;for(var b="",e=0;e<this.offset;){var m=a[d+e].toString(2);b=Array(9-m.length).join("0")+m+b;e++}return this.c(this.j(parseInt(b,2)))};e.prototype.l=function(){this.B();this.w();this.u();this.v();this.offset=8>this.b?1:Math.ceil(this.g/8);if(this.g!=this.b||8>this.b||32<this.b)this.write=this.C,this.read=this.m};e.prototype.j=function(a){a>this.max&&(a-=2*this.max+2);return a};e.prototype.c=function(a){a>this.max?a=this.max:a<this.min&&(a=this.min);
return a};e.prototype.v=function(){var a=Math.pow(2,this.b);this.A?(this.max=a/2-1,this.min=-a/2):(this.max=a-1,this.min=0)};e.prototype.B=function(){if(1>this.b||64<this.b)throw Error("Not a supported type.");};e.prototype.w=function(){8<this.b&&(this.g=(this.b-1|7)+1)};e.prototype.u=function(){var a=8-(this.g-this.b);this.i=Math.pow(2,0<a?a:8)-1};e.prototype.o=function(a,d,c){8>this.b?a[c++]=0>d?d+Math.pow(2,this.b):d:a[c++]=d&255;return c};a.a=e}]);