/*
 riff-chunks
 Read and write the chunks of RIFF and RIFX files.
 Copyright (c) 2017 Rafael da Silva Rocha.
 https://github.com/rochars/riff-chunks

 byte-data
 Readable data to and from byte buffers.
 Copyright (c) 2017 Rafael da Silva Rocha.
 https://github.com/rochars/byte-data

 endianness
 Swap endianness in byte arrays.
 Copyright (c) 2017 Rafael da Silva Rocha.
 https://github.com/rochars/endianness

*/
for(var m="function"==typeof Object.defineProperties?Object.defineProperty:function(c,k,g){c!=Array.prototype&&c!=Object.prototype&&(c[k]=g.value)},n="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,r=["Object","assign"],t=0;t<r.length-1;t++){var u=r[t];u in n||(n[u]={});n=n[u]}
var v=r[r.length-1],x=n[v],D=x?x:function(c,k){for(var g=1;g<arguments.length;g++){var h=arguments[g];if(h)for(var f in h)Object.prototype.hasOwnProperty.call(h,f)&&(c[f]=h[f])}return c};D!=x&&null!=D&&m(n,v,{configurable:!0,writable:!0,value:D});
(function(c){function k(h){if(g[h])return g[h].a;var f=g[h]={pa:h,V:!1,a:{}};c[h].call(f.a,f,f.a,k);f.V=!0;return f.a}var g={};k.oa=c;k.ga=g;k.M=function(c,f){k.N(c)||Object.defineProperty(c,"a",{configurable:!1,enumerable:!0,get:f})};k.ha=function(c){var f=c&&c.da?function(){return c["default"]}:function(){return c};k.M(f,f);return f};k.N=function(c){return Object.prototype.hasOwnProperty.call(c,"a")};k.ma="";return k(k.ya=4)})([function(c,k,g){function h(a,d,e){a[e]=f(a[e],d)}function f(d,e){var b=
d.length+1;2==e?b=8:16==e&&(b=2);return a(d,b)}function l(a,d,e){2==d&&4>a[e].length&&(a[e]=Array(5-a[e].length).join("0")+a[e])}function b(a,d,e){(2==d||16==d)&&2>a[e].length&&(a[e]="0"+a[e])}function a(a,d){for(;a.length<d;)a="0"+a;return a}function e(a,d,e){e=void 0===e?h:e;if(10!=d)for(var b=0,c=a.length;b<c;)a[b]=a[b].toString(d),e(a,d,b),b++}var d=g(8),w=g(1);c.a.F=function(a,e,b){e&&d(a,w.j[b])};c.a.fa=e;c.a.W=function(a,d,c){4==d?e(a,c,l):2==d?e(a,c,b):1==d?e(a,c,function(){}):e(a,c)};c.a.aa=
function(a){Array.isArray(a)||"string"==typeof a||(a=[a]);return a};c.a.i=function(a,d){a>parseInt(d/2,10)-1&&(a-=d);return a};c.a.P=function(a,d){if(10!=d)for(var e=0,b=a.length;e<b;)a[e]=parseInt(a[e],d),e++};c.a.D=function(a,d){var e=0,b=a.length%d;if(b)for(b=-1*(b-d);e<b;)a.push(0),e++};c.a.padding=h;c.a.Aa=l;c.a.za=b;c.a.O=f;c.a.b=a},function(c){c.a.j={1:1,2:1,4:1,8:1,16:2,24:3,32:4,40:5,48:6,64:8};c.a.c={1:2,2:4,4:16,8:256,16:65536,24:16777216,32:4294967296,40:1099511627776,48:281474976710656,
64:Infinity}},function(c,k,g){function h(a,e){e=void 0===e?!1:e;for(var d="",b=0,c=a.length;b<c;){var l=f.b(a[b].toString(2),8);d=e?d+l:l+d;b++}return d}var f=g(0),l=new Float32Array(1),b=new Int32Array(l.buffer);c.a.na=h;c.a.T=function(a){a=parseInt(h(a,!0),2);var e=(a&31744)>>10,d=a&1023;return(e?Math.pow(2,e-15)*(1+d/1024):d/1024*.00006103515625)*(a>>15?-1:1)};c.a.U=function(a){if("0,0,0,0,0,0,0,0"==a.toString())return 0;a=h(a);for(var e="1"+a.substr(12,52),d=1,b=0,c=0;c<e.length;)b+=d*parseInt(e.charAt(c),
10),d/=2,c++;return("1"==a.charAt(0)?-1:1)*b*Math.pow(2,parseInt(a.substr(1,11),2)-1023)};c.a.Z=function(a){if(0==a)return[0,0];var e=0;0>=a&&(e=2147483648,a=-a);var d=Math.floor(Math.log(a)/Math.log(2)),b=Math.floor(a/Math.pow(2,d)*Math.pow(2,52));a=b&4294967295;b/=Math.pow(2,32);return[e|d+1023<<20|b&1048575,a]};c.a.$=function(a){l[0]=a;var e=b[0];a=e>>16&32768;var d=e>>12&2047;e=e>>23&255;return 103>e?a:(a|e-112<<10|d>>1)+(d&1)}},function(c){function k(c){h[0]=c;return f[0]}var g=new Int8Array(4),
h=new Int32Array(g.buffer,0,1),f=new Float32Array(g.buffer,0,1);c.a=k;c.a.s=k;c.a.w=function(c){f[0]=c;return h[0]}},function(c,k,g){function h(b,c){void 0!==c&&c||(e.l="RIFX"==b.f);c=a.C(b.f,d).concat(a.s(b.o,e),a.C(b.format,d),f(b.Y,e.l));if("RIFF"==b.f||"RIFX"==b.f)c=new Uint8Array(c);return c}function f(b,c){for(var f=[],l=0;l<b.length;)f="LIST"==b[l].f?f.concat(h(b[l],c)):f.concat(a.C(b[l].f,d),a.s(b[l].o,e),b[l].S),l++;return f}function l(a){for(var d=[],e=12;e<a.length;)d.push(b(a,e)),e+=8+
d[d.length-1].o;return d}function b(b,c){var f={chunkId:a.A(b.slice(c,c+4),d),chunkSize:a.w(b.slice(c+4,c+8),e)};"LIST"==f.f?(f.format=a.A(b.slice(8,12),d),f.Y=l(b.slice(c,c+f.o))):f.S=b.slice(c+8,c+8+f.o);return f}var a=g(5),e=a.ba,d=a.R;window.riffChunks=window.riffChunks||{};window.riffChunks.read=function(b){b=[].slice.call(b);var c=a.A(b.slice(0,4),d);e.l="RIFX"==c;var f=a.w(b.slice(4,8),e);return{chunkId:c,chunkSize:f,format:a.A(b.slice(8,12),d),subChunks:l(b)}};window.riffChunks.write=h},function(c,
k,g){var h=g(6),f=g(9);k=g(11);g=g(1);c.a.s=function(c,b,a){a=void 0===a?10:a;b=Object.assign({},b);b.g=a;b.u=!0;c=b.char?c[0]:c;return h.v(c,b.m,b)};c.a.w=function(c,b,a){a=void 0===a?10:a;b=Object.assign({},b);b.g=a;b.u=!0;return f.h(c,b.m,b)};c.a.C=function(c,b){var a=void 0===a?10:a;b=Object.assign({},b);b.g=a;b.u=!1;return h.v(c,b.m,b)};c.a.A=function(c,b){var a=void 0===a?10:a;b=Object.assign({},b);b.g=a;b.u=!1;return f.h(c,b.m,b)};c.a.R={bits:8,"char":!0,single:!0};c.a.ea={bits:1,single:!0};
c.a.ra={bits:2,signed:!0,single:!0};c.a.Ma={bits:2,single:!0};c.a.ua={bits:4,signed:!0,single:!0};c.a.Oa={bits:4,single:!0};c.a.xa={bits:8,signed:!0,single:!0};c.a.Ra={bits:8,single:!0};c.a.qa={bits:16,signed:!0,single:!0};c.a.La={bits:16,single:!0};c.a.ja={bits:16,"float":!0,single:!0};c.a.sa={bits:24,signed:!0,single:!0};c.a.Na={bits:24,single:!0};c.a.ta={bits:32,signed:!0,single:!0};c.a.ba={bits:32,single:!0};c.a.ka={bits:32,"float":!0,single:!0};c.a.va={bits:40,signed:!0,single:!0};c.a.Pa={bits:40,
single:!0};c.a.wa={bits:48,signed:!0,single:!0};c.a.Qa={bits:48,single:!0};c.a.la={bits:64,"float":!0,single:!0};c.a.ia=function(c,b){for(var a,e=0;e<c.length;e++)if(a=f.h(c.slice(e,e+b.length),8,{"char":!0}),a==b)return e;return-1};c.a.v=h.v;c.a.h=f.h;c.a.G=k.G;c.a.J=k.J;c.a.H=k.H;c.a.K=k.K;c.a.I=k.I;c.a.L=k.L;c.a.j=g.j;c.a.c=g.c},function(c,k,g){var h=g(7),f=g(0),l=g(1);c.a.v=function(b,a,e){e=void 0===e?{base:10,signed:!1}:e;64==a&&(e.B=!0);e.B&&(e.i=!0);e.m=a;b=f.aa(b);var d=e;var c=d.char?h.ca:
h["write"+a+"Bit"+(d.B?"Float":"")];var g=0,k=0,E=b.length,y=[];if(d.i){var z=l.c[a]/2-1;var A=l.c[a]/2*-1}else z=l.c[a]-1,A=0;for(;g<E;){var p=b,q=g,B=A,C=z;p[q]>C?p[q]=C:p[q]<B&&(p[q]=B);k=c(y,b,g,k,d.i);g++}b=y;f.F(b,e.l,a);f.W(b,a,e.g);e.buffer&&(b=new Uint8Array(b));return b}},function(c,k,g){function h(b,a,e,d){b[d++]=a[e]&255;b[d++]=a[e]>>>8&255;b[d++]=a[e]>>>16&255;b[d++]=a[e]>>>24&255;return d}var f=g(2),l=g(3);c.a.bb=function(b,a,e,d){a=f.Z(a[e]);d=h(b,a,1,d);return h(b,a,0,d)};c.a.$a=function(b,
a,e,d){b[d++]=a[e]&255;b[d++]=a[e]>>8&255;b[d++]=a[e]>>16&255;b[d++]=a[e]>>24&255;b[d++]=a[e]/4294967296&255;b[d++]=a[e]/1099511627776&255;return d};c.a.Za=function(b,a,e,d){b[d++]=a[e]&255;b[d++]=a[e]>>8&255;b[d++]=a[e]>>16&255;b[d++]=a[e]>>24&255;b[d++]=a[e]/4294967296&255;return d};c.a.Ya=function(b,a,e,d){a=l.w(a[e]);b[d++]=a&255;b[d++]=a>>>8&255;b[d++]=a>>>16&255;b[d++]=a>>>24&255;return d};c.a.Xa=h;c.a.Va=function(b,a,e,d){b[d++]=a[e]&255;b[d++]=a[e]>>>8&255;b[d++]=a[e]>>>16&255;return d};c.a.Sa=
function(b,a,e,d){b[d++]=a[e]&255;b[d++]=a[e]>>>8&255;return d};c.a.Ta=function(b,a,e,d){a=f.$(a[e]);b[d++]=a>>>8&255;b[d++]=a&255;return d};c.a.cb=function(b,a,e,d){b[d++]=a[e]&255;return d};c.a.ab=function(b,a,e,d){b[d++]=a[e]&15;return d};c.a.Wa=function(b,a,e,d){b[d++]=0>a[e]?a[e]+4:a[e];return d};c.a.Ua=function(b,a,e,d){b[d++]=a[e]?1:0;return d};c.a.ca=function(b,a,e,d){b[d++]=a.charCodeAt(e);return d}},function(c){c.a=function(c,g){for(var h=c.length,f=0;f<h;){for(var l=c,b=f,a=0,e=g-1,d=parseInt(g/
2,10);a<d;){var k=l[b+a];l[b+a]=l[b+e];l[b+e]=k;a++;e--}f+=g}}},function(c,k,g){function h(a,e,d,c){var f=[],g=0,h=0,k=l.j[e],w=a.length-(k-1);e=l.c[e];for(d=d?b.i:function(a){return a};g<w;)f[h]=d(c(a,g),e),g+=k,h++;return f}var f=g(10),l=g(1),b=g(0);c.a.h=function(a,e,d){d=void 0===d?{base:10}:d;b.F(a,d.l,e);b.P(a,d.g);a=h(a,e,d.i,d.char?f.X:f["read"+(2==e||4==e?8:e)+"Bit"+(d.B?"Float":"")]);d.char&&(a=a.join(""));d.u&&(a=a[0]);return a}},function(c,k,g){function h(a,b,c){--c;for(var d="";0<=c;)d+=
l.O(a[c+b].toString(2),2),c--;return parseInt(d,2)}function f(a,b){return(a[3+b]<<24|a[2+b]<<16|a[1+b]<<8|a[b])>>>0}var l=g(0),b=g(2),a=g(3);c.a.X=function(a,b){return String.fromCharCode(a[b])};c.a.Da=function(a,b){return parseInt(a[b],2)};c.a.Ka=function(a,b){return a[b]};c.a.Ba=function(a,b){return a[1+b]<<8|a[b]};c.a.Ca=function(a,c){return b.T(a.slice(c,c+2))};c.a.Ea=function(a,b){return a[2+b]<<16|a[1+b]<<8|a[b]};c.a.Fa=f;c.a.Ga=function(b,c){return a.s(f(b,c))};c.a.Ha=function(a,b){return h(a,
b,5)};c.a.Ia=function(a,b){return h(a,b,6)};c.a.Ja=function(a,c){return b.U(a.slice(c,c+8))}},function(c,k,g){var h=g(0);c.a.G=function(c){var f=[],b=0,a=0;h.D(c,8);for(var e=c.length-7;b<e;)f[a++]=parseInt(c[b].toString(2)+c[b+1].toString(2)+c[b+2].toString(2)+c[b+3].toString(2)+c[b+4].toString(2)+c[b+5].toString(2)+c[b+6].toString(2)+c[b+7].toString(2),2),b+=8;return f};c.a.J=function(c){for(var f=[],b=0,a=0,e=c.length,d;b<e;)d=h.b(c[b].toString(2),8),f[a++]=parseInt(d[0],2),f[a++]=parseInt(d[1],
2),f[a++]=parseInt(d[2],2),f[a++]=parseInt(d[3],2),f[a++]=parseInt(d[4],2),f[a++]=parseInt(d[5],2),f[a++]=parseInt(d[6],2),f[a++]=parseInt(d[7],2),b++;return f};c.a.H=function(c){var f=[],b=0,a=0;h.D(c,4);for(var e=c.length-3;b<e;)f[a++]=parseInt(h.b(c[b].toString(2),2)+h.b(c[b+1].toString(2),2)+h.b(c[b+2].toString(2),2)+h.b(c[b+3].toString(2),2),2),b+=4;return f};c.a.K=function(c){for(var f=[],b=0,a=0,e=c.length,d;b<e;)d=h.b(c[b].toString(2),8),f[a++]=parseInt(d[0]+d[1],2),f[a++]=parseInt(d[2]+d[3],
2),f[a++]=parseInt(d[4]+d[5],2),f[a++]=parseInt(d[6]+d[7],2),b++;return f};c.a.I=function(c){var f=[],b=0,a=0,e=c.length;for(e%2&&c.push(0);b<e;)f[a++]=parseInt(c[b].toString(16)+c[b+1].toString(16),16),b+=2;return f};c.a.L=function(c){for(var f=[],b=0,a=0,e=c.length;b<e;)f[a++]=parseInt(c[b].toString(16)[0],16),f[a++]=parseInt(c[b].toString(16)[1],16),b++;return f}}]);
