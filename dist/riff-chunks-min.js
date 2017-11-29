/*
 endianness: Swap byte endianness in arrays.
 Copyright (c) 2017 Rafael da Silva Rocha.
 https://github.com/rochars/endianness

 riff-chunks
 Get the chunks of RIFF and RIFX files.
 Copyright (c) 2017 Rafael da Silva Rocha.
 https://github.com/rochars/riff-chunks

 byte-data
 Readable data to and from byte buffers.
 Copyright (c) 2017 Rafael da Silva Rocha.
 https://github.com/rochars/byte-data

*/
(function(a){function l(k){if(h[k])return h[k].a;var e=h[k]={ca:k,I:!1,a:{}};a[k].call(e.a,e,e.a,l);e.I=!0;return e.a}var h={};l.ba=a;l.T=h;l.w=function(a,e){l.A(a)||Object.defineProperty(a,"a",{configurable:!1,enumerable:!0,get:e})};l.U=function(a){var e=a&&a.S?function(){return a["default"]}:function(){return a};l.w(e,e);return e};l.A=function(a){return Object.prototype.hasOwnProperty.call(a,"a")};l.$="";return l(l.ha=5)})([function(a){function l(a,e){var g=a.length+1;2==e?g=8:16==e&&(g=2);return h(a,
g)}function h(a,e){for(;a.length<e;)a="0"+a;return a}a.a.i=function(a,e){var g=0,f=a.length%e;if(f)for(f=-1*(f-e);g<f;)a.push(0),g++};a.a.padding=function(a,e,g){a[g]=l(a[g],e)};a.a.L=function(a,e,g){2==e&&4>a[g].length&&(a[g]=Array(5-a[g].length).join("0")+a[g])};a.a.K=function(a,e,g){(2==e||16==e)&&2>a[g].length&&(a[g]="0"+a[g])};a.a.D=l;a.a.c=h},function(a){function l(a){k[0]=a;return e[0]}var h=new Int8Array(4),k=new Int32Array(h.buffer,0,1),e=new Float32Array(h.buffer,0,1);a.a=l;a.a.J=l;a.a.P=
function(a){e[0]=a;return k[0]}},function(a){a.a.f={1:1,2:1,4:1,8:1,16:2,24:3,32:4,40:5,48:6,64:8};a.a.g={2:4,4:16,8:256,16:65536,24:16777216,32:4294967296,40:1099511627776,48:281474976710656}},function(a){a.a.h=function(a,h){for(var k=a.length,e=0;e<k;){for(var g,f=a,c=e,d=0,b=h-1,m=parseInt(h/2,10);d<m;)g=f[c+d],f[c+d]=f[c+b],f[c+b]=g,d++,b--;e+=h}}},function(a,l,h){function k(a,d){d=void 0===d?!1:d;for(var b="",c=0,f=a.length;c<f;){var g=e.c(a[c].toString(2),8);b=d?b+g:g+b;c++}return b}var e=h(0),
g=new Float32Array(1),f=new Int32Array(g.buffer);a.a.aa=k;a.a.F=function(a){a=parseInt(k(a,!0),2);var d=(a&31744)>>10,b=a&1023;return(d?Math.pow(2,d-15)*(1+b/1024):b/1024*.00006103515625)*(a>>15?-1:1)};a.a.G=function(a){if("0,0,0,0,0,0,0,0"==a.toString())return 0;a=k(a);for(var d="1"+a.substr(12,52),b=1,f=0,c=0;c<d.length;)f+=b*parseInt(d.charAt(c),10),b/=2,c++;return("1"==a.charAt(0)?-1:1)*f*Math.pow(2,parseInt(a.substr(1,11),2)-1023)};a.a.N=function(a){if(0==a)return[0,0];var d=0;0>=a&&(d=2147483648,
a=-a);var b=Math.floor(Math.log(a)/Math.log(2)),f=Math.floor(a/Math.pow(2,b)*Math.pow(2,52));a=f&4294967295;f/=Math.pow(2,32);return[d|b+1023<<20|f&1048575,a]};a.a.O=function(a){g[0]=a;var d=f[0];a=d>>16&32768;var b=d>>12&2047;d=d>>23&255;return 103>d?a:(a|d-112<<10|b>>1)+(b&1)}},function(a,l,h){function k(a,f){for(var c=[],d=12;d<a.length;){var b=e.b(a.slice(d,d+4),8,{"char":!0}),g=e.b(a.slice(d+4,d+8),32,{be:f})[0];"LIST"==b?c.push({subChunkId:b,subChunkSize:g,subChunks:k(a.slice(d,d+g),f)}):c.push({subChunkId:b,
subChunkSize:g,subChunkData:a.slice(d+8,d+8+g)});d=d+8+g}return c}var e=h(6);window.getChunks=function(a,f){f=void 0===f?!1:f;return{chunkId:e.b(a.slice(0,4),8,{"char":!0}),chunkSize:e.b(a.slice(4,8),32,{be:f})[0],format:e.b(a.slice(8,12),8,{"char":!0}),subChunks:k(a,f)}}},function(a,l,h){l=h(7);var k=h(9),e=h(11);h=h(2);a.a.V=function(a,f){for(var c,d=0;d<a.length;d++)if(c=k.b(a.slice(d,d+f.length),8,{"char":!0}),c==f)return d;return-1};a.a.o=l.o;a.a.b=k.b;a.a.j=e.j;a.a.s=e.s;a.a.l=e.l;a.a.u=e.u;
a.a.m=e.m;a.a.v=e.v;a.a.f=h.f;a.a.g=h.g;a.a.Z={"float":!0,single:!0};a.a.ga={signed:!0,single:!0};a.a.ya={single:!0};a.a.Y={"float":!0,single:!0,be:!0};a.a.fa={signed:!0,single:!0,be:!0};a.a.xa={single:!0,be:!0};a.a.char={"char":!0,single:!0};a.a.X={"float":!0};a.a.ea={signed:!0};a.a.wa={};a.a.W={"float":!0,be:!0};a.a.da={signed:!0,be:!0};a.a.va={be:!0};a.a.ua={"char":!0}},function(a,l,h){function k(a,d,f){4==d?e(a,f,g.L):2==d?e(a,f,g.K):1==d?e(a,f,function(){}):e(a,f)}function e(a,d,f){f=void 0===
f?g.padding:f;if(10!=d)for(var b=0,c=a.length;b<c;)a[b]=a[b].toString(d),f(a,d,b),b++}h(1);var g=h(0),f=h(3),c=h(8),d=h(2);a.a.o=function(a,e,g){g=void 0===g?{}:g;if(!g.char&&"string"!=typeof a){var b=a;Array.isArray(b)||(b=[b]);a=b}b=10;"base"in g&&(b=g.B);var h=g.char?c.R:c["write"+e+"Bit"+(g.H?"Float":"")];for(var l=0,m=0,p=a.length,n=[];l<p;)m=h(n,a,l,m),l++;a=n;g.C&&f.h(a,d.f[e]);k(a,e,b);g.buffer&&(a=new Uint8Array(a));return a}},function(a,l,h){function k(a,c,d,b){a[b++]=c[d]&255;a[b++]=c[d]>>>
8&255;a[b++]=c[d]>>>16&255;a[b++]=c[d]>>>24&255;return b}var e=h(4),g=h(1);a.a.Ja=function(a,c,d,b){c=e.N(c[d]);b=k(a,c,1,b);return k(a,c,0,b)};a.a.Ha=function(a,c,d,b){a[b++]=c[d]&255;a[b++]=c[d]>>8&255;a[b++]=c[d]>>16&255;a[b++]=c[d]>>24&255;a[b++]=c[d]/4294967296&255;a[b++]=c[d]/1099511627776&255;return b};a.a.Ga=function(a,c,d,b){a[b++]=c[d]&255;a[b++]=c[d]>>8&255;a[b++]=c[d]>>16&255;a[b++]=c[d]>>24&255;a[b++]=c[d]/4294967296&255;return b};a.a.Fa=function(a,c,d,b){c=g.P(c[d]);a[b++]=c&255;a[b++]=
c>>>8&255;a[b++]=c>>>16&255;a[b++]=c>>>24&255;return b};a.a.Ea=k;a.a.Ca=function(a,c,d,b){a[b++]=c[d]&255;a[b++]=c[d]>>>8&255;a[b++]=c[d]>>>16&255;return b};a.a.za=function(a,c,d,b){a[b++]=c[d]&255;a[b++]=c[d]>>>8&255;return b};a.a.Aa=function(a,c,d,b){c=e.O(c[d]);a[b++]=c>>>8&255;a[b++]=c&255;return b};a.a.Ka=function(a,c,d,b){a[b++]=c[d]&255;return b};a.a.Ia=function(a,c,d,b){a[b++]=c[d]&15;return b};a.a.Da=function(a,c,d,b){a[b++]=0>c[d]?c[d]+4:c[d];return b};a.a.Ba=function(a,c,d,b){a[b++]=c[d]?
1:0;return b};a.a.R=function(a,c,d,b){a[b++]=c.charCodeAt(d);return b}},function(a,l,h){function k(a,b,f,g){var d=[],h=0,k=0,l=c.f[b],m=a.length-(l-1);b=c.g[b];for(f=f?e:function(a){return a};h<m;)d[k]=f(g(a,h),b),h+=l,k++;return d}function e(a,b){a>parseInt(b/2,10)-1&&(a-=b);return a}var g=h(3),f=h(10),c=h(2);a.a.b=function(a,b,c){c=void 0===c?{}:c;var d=10;"base"in c&&(d=c.B);c.C&&g.h(a,b/8);if(10!=d)for(var e=0,h=a.length;e<h;)a[e]=parseInt(a[e],d),e++;a=k(a,b,c.sa,c.char?f.M:f["read"+(2==b||4==
b?8:b)+"Bit"+(c.H?"Float":"")]);c.char&&(a=a.join(""));c.ta&&(a=a[0]);return a}},function(a,l,h){function k(a,b,c){--c;for(var d="";0<=c;)d+=g.D(a[c+b].toString(2),2),c--;return parseInt(d,2)}function e(a,b){return(a[3+b]<<24|a[2+b]<<16|a[1+b]<<8|a[b])>>>0}var g=h(0),f=h(4),c=h(1);a.a.M=function(a,b){return String.fromCharCode(a[b])};a.a.ka=function(a,b){return parseInt(a[b],2)};a.a.ra=function(a,b){return a[b]};a.a.ia=function(a,b){return a[1+b]<<8|a[b]};a.a.ja=function(a,b){return f.F(a.slice(b,
b+2))};a.a.la=function(a,b){return a[2+b]<<16|a[1+b]<<8|a[b]};a.a.ma=e;a.a.na=function(a,b){return c.J(e(a,b))};a.a.oa=function(a,b){return k(a,b,5)};a.a.pa=function(a,b){return k(a,b,6)};a.a.qa=function(a,b){return f.G(a.slice(b,b+8))}},function(a,l,h){var k=h(0);a.a.j=function(a){var e=[],f=0,c=0;k.i(a,8);for(var d=a.length-7;f<d;)e[c++]=parseInt(a[f].toString(2)+a[f+1].toString(2)+a[f+2].toString(2)+a[f+3].toString(2)+a[f+4].toString(2)+a[f+5].toString(2)+a[f+6].toString(2)+a[f+7].toString(2),
2),f+=8;return e};a.a.s=function(a){for(var e=[],f=0,c=0,d=a.length,b;f<d;)b=k.c(a[f].toString(2),8),e[c++]=parseInt(b[0],2),e[c++]=parseInt(b[1],2),e[c++]=parseInt(b[2],2),e[c++]=parseInt(b[3],2),e[c++]=parseInt(b[4],2),e[c++]=parseInt(b[5],2),e[c++]=parseInt(b[6],2),e[c++]=parseInt(b[7],2),f++;return e};a.a.l=function(a){var e=[],f=0,c=0;k.i(a,4);for(var d=a.length-3;f<d;)e[c++]=parseInt(k.c(a[f].toString(2),2)+k.c(a[f+1].toString(2),2)+k.c(a[f+2].toString(2),2)+k.c(a[f+3].toString(2),2),2),f+=
4;return e};a.a.u=function(a){var e=[],f=0,c=0,d=a.length;for(console.log(d);f<d;){var b=k.c(a[f].toString(2),8);e[c++]=parseInt(b[0]+b[1],2);e[c++]=parseInt(b[2]+b[3],2);e[c++]=parseInt(b[4]+b[5],2);e[c++]=parseInt(b[6]+b[7],2);f++}return e};a.a.m=function(a){var e=[],f=0,c=0,d=a.length;for(d%2&&a.push(0);f<d;)e[c++]=parseInt(a[f].toString(16)+a[f+1].toString(16),16),f+=2;return e};a.a.v=function(a){for(var e=[],f=0,c=0,d=a.length;f<d;)e[c++]=parseInt(a[f].toString(16)[0],16),e[c++]=parseInt(a[f].toString(16)[1],
16),f++;return e}}]);
