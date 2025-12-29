import{kF as wt,ir as yt,eq as F,is as bt,am as kt,aM as Pt,aq as Nt,i4 as Ot,a2 as Ye,lB as Yt,aO as Wt,gx as Xt,lw as Jt,em as Kt,a4 as Qt,lC as Zt,lD as eo,lE as to,lF as oo,lb as io,lG as no,lH as so,i6 as Ze,m as I}from"./index-BeTPrQ6f.js";import{Z as St,L as ro,J as ao,K as lo}from"./mat4-R0VY9B_E-DoEP887i.js";import{z as co,y as uo}from"./vec42-DHp-FUwt-Br7hmYJs.js";import{a as et,o as Te,f as tt,c as fo,I as po,m as ho,r as go}from"./vec4f64-DD-nkcCV-CSNWKRqG.js";import{$ as vo}from"./projectionUtils-CsX1UTBu-DsZaU4xz.js";import{m as mo}from"./meshVertexSpaceUtils-EbHpWZGf-CmRuaT8m.js";import{n as We}from"./projectVectorToVector-OCoJKalB-CQIDHzSm.js";import{m as xo,P as wo}from"./hydratedFeatures-82j52esm-6EbRngQ4.js";import{_ as oe,X as ae,l as L,q as Y,E as G,A as k,b as ye,g as Ct,j as q,k as yo,Y as bo,z as Xe,Q as ie}from"./vec32-CI1xtKog-DFVYRcgb.js";import{r as H,u as ot,o as W}from"./vec3f32-GX_cKsFD-UJPpzdNc.js";import{z as Po,O as Fe,U as zt,w as Oo,a as So,D as te,I as Co,j as zo,E as Ao,T as Do,W as Mo,G as Vo,X as To,C as it,r as jo,d as nt,s as st,Y as $o,_ as Fo,e as Ro,f as _o,h as Eo,b as Io,m as At,u as Uo,q as Bo,l as Ho,Q as Je,c as rt,g as Re,R as He,F as at,i as Dt,H as Go,v as Mt,p as Vt,k as Me,n as Lo,o as qo,t as ko,y as No,x as Yo,A as Wo,B as Xo,J as Jo,K as X,L as J,N as Ko,P as Qo,V as Zo,Z as U,$ as lt}from"./OutputColorHighlightOID.glsl-fUhBGshN-Ctm9N97M.js";import{s as Tt,w as ei}from"./Indices-CAn-HCVv-hWNN5onC.js";import{L as ti,W as oi,c as ii}from"./plane-wUwHaY3K-ZwGBF7HQ.js";import{y as ni}from"./sphere-CIGsF4vz-C3zVQu9y.js";import{r as jt,o as Ke}from"./vec2f64-CkowXrDb-3zFQ3LNH.js";import"./projectBuffer-CMNsPBq1-CMpE7Jo3.js";import{g as M}from"./orientedBoundingBox-DAJ-bKlA-DbqXagWB.js";import{d as $t,O as si}from"./BufferView-B6RYETl3-CMoUTBv6.js";import{h as Ft,G as ri}from"./InterleavedLayout-CuMGnz6O-DkraWivs.js";import{E as ct}from"./enums-DDJfd4_p-D3z9tmVA.js";import{N as ai,O as li,D as ci}from"./renderState-CsafAKLy-B8R8ns_l.js";import{o as ui}from"./VertexAttributeLocations-DBgVVQz--D3wovAvC.js";import{o as O,i as B}from"./glsl-CfY1Aoj6-DPHSeNd9.js";import"./lengthUtils-CopeXEyE-DjCEitlq.js";import{T as fi}from"./ShaderBuilder-ufvKEDd5-DMnPqr6U.js";function Cn(o,e){if(o.type==="point")return ee(o,e,!1);if(xo(o))switch(o.type){case"extent":return ee(o.center,e,!1);case"polygon":return ee(ft(o),e,!1);case"polyline":return ee(ut(o),e,!0);case"mesh":return ee(mo(o.vertexSpace,o.spatialReference)??o.extent.center,e,!1);case"multipoint":return}else switch(o.type){case"extent":return ee(pi(o),e,!0);case"polygon":return ee(ft(o),e,!0);case"polyline":return ee(ut(o),e,!0);case"multipoint":return}}function ut(o){const e=o.paths[0];if(!e||e.length===0)return null;const i=oo(e,io(e)/2);return We(i[0],i[1],i[2],o.spatialReference)}function pi(o){return We(.5*(o.xmax+o.xmin),.5*(o.ymax+o.ymin),o.zmin!=null&&o.zmax!=null&&isFinite(o.zmin)&&isFinite(o.zmax)?.5*(o.zmax+o.zmin):void 0,o.spatialReference)}function ft(o){const e=o.rings[0];if(!e||e.length===0)return null;const i=no(o.rings,!!o.hasZ);return We(i[0],i[1],i[2],o.spatialReference)}function ee(o,e,i){const t=i?o:wo(o);return e&&o?vo(o,t,e)?t:null:t}function zn(o,e,i,t=0){if(o){e||(e=Pt());const n=o;let r=.5*n.width*(i-1),s=.5*n.height*(i-1);return n.width<1e-7*n.height?r+=s/20:n.height<1e-7*n.width&&(s+=r/20),uo(e,n.xmin-r-t,n.ymin-s-t,n.xmax+r+t,n.ymax+s+t),e}return null}function An(o,e,i=null){const t=fo(po);return o!=null&&(t[0]=o[0],t[1]=o[1],t[2]=o[2],o.length>3&&(t[3]=o[3])),e!=null&&(t[3]=e),i&&co(t,t,i),t}function Dn(o=Xt,e,i,t=1){const n=new Array(3);if(e==null||i==null)n[0]=1,n[1]=1,n[2]=1;else{let r,s=0;for(let a=2;a>=0;a--){const c=o[a],l=c!=null,u=a===0&&!r&&!l,f=i[a];let h;c==="symbol-value"||u?h=f!==0?e[a]/f:1:l&&c!=="proportional"&&isFinite(c)&&(h=f!==0?c/f:1),h!=null&&(n[a]=h,r=h,s=Math.max(s,Math.abs(h)))}for(let a=2;a>=0;a--)n[a]==null?n[a]=r:n[a]===0&&(n[a]=.001*s)}for(let r=2;r>=0;r--)n[r]/=t;return Jt(n)}function di(o){return o.isPrimitive!=null}function Mn(o){return hi(di(o)?[o.width,o.depth,o.height]:o)?null:"Symbol sizes may not be negative values"}function hi(o){const e=i=>i==null||i>=0;return Array.isArray(o)?o.every(e):e(o)}function Vn(o,e,i,t=bt()){return o&&ro(t,t,-o/180*Math.PI),e&&ao(t,t,e/180*Math.PI),i&&lo(t,t,i/180*Math.PI),t}function Tn(o,e,i){if(i.minDemResolution!=null)return i.minDemResolution;const t=Qt(e),n=Zt(o)*t,r=eo(o)*t,s=to(o)*(e.isGeographic?1:t);return n===0&&r===0&&s===0?i.minDemResolutionForPoints:.01*Math.max(n,r,s)}function pt(o,e){const i=o[e],t=o[e+1],n=o[e+2];return Math.sqrt(i*i+t*t+n*n)}function gi(o,e){const i=o[e],t=o[e+1],n=o[e+2],r=1/Math.sqrt(i*i+t*t+n*n);o[e]*=r,o[e+1]*=r,o[e+2]*=r}function dt(o,e,i){o[e]*=i,o[e+1]*=i,o[e+2]*=i}function vi(o,e,i,t,n,r=e){(n=n||o)[r]=o[e]+i[t],n[r+1]=o[e+1]+i[t+1],n[r+2]=o[e+2]+i[t+2]}function mi(){return ht??(ht=xi()),ht}function xi(){const o=new M([0,0,0,255,255,0,255,255],[0,1,2,3],2,!0);return new Ko([["uv0",o]])}let ht=null;const _e=[[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5],[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5]],wi=[0,0,1,-1,0,0,1,0,0,0,-1,0,0,1,0,0,0,-1],yi=[0,0,1,0,1,1,0,1],bi=[0,1,2,2,3,0,4,0,3,3,7,4,1,5,6,6,2,1,1,0,4,4,5,1,3,2,6,6,7,3,5,4,7,7,6,5],Rt=new Array(36);for(let o=0;o<6;o++)for(let e=0;e<6;e++)Rt[6*o+e]=o;const se=new Array(36);for(let o=0;o<6;o++)se[6*o]=0,se[6*o+1]=1,se[6*o+2]=2,se[6*o+3]=2,se[6*o+4]=3,se[6*o+5]=0;function jn(o,e){Array.isArray(e)||(e=[e,e,e]);const i=new Array(24);for(let t=0;t<8;t++)i[3*t]=_e[t][0]*e[0],i[3*t+1]=_e[t][1]*e[1],i[3*t+2]=_e[t][2]*e[2];return new J(o,[["position",new M(i,bi,3,!0)],["normal",new M(wi,Rt,3)],["uv0",new M(yi,se,2)]])}const Ee=[[-.5,0,-.5],[.5,0,-.5],[.5,0,.5],[-.5,0,.5],[0,-.5,0],[0,.5,0]],Pi=[0,1,-1,1,1,0,0,1,1,-1,1,0,0,-1,-1,1,-1,0,0,-1,1,-1,-1,0],Oi=[5,1,0,5,2,1,5,3,2,5,0,3,4,0,1,4,1,2,4,2,3,4,3,0],Si=[0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7];function $n(o,e){Array.isArray(e)||(e=[e,e,e]);const i=new Array(18);for(let t=0;t<6;t++)i[3*t]=Ee[t][0]*e[0],i[3*t+1]=Ee[t][1]*e[1],i[3*t+2]=Ee[t][2]*e[2];return new J(o,[["position",new M(i,Oi,3,!0)],["normal",new M(Pi,Si,3)]])}const Oe=H(-.5,0,-.5),Se=H(.5,0,-.5),Ce=H(0,0,.5),ze=H(0,.5,0),ce=W(),ue=W(),pe=W(),de=W(),he=W();Y(ce,Oe,ze),Y(ue,Oe,Se),ie(pe,ce,ue),L(pe,pe),Y(ce,Se,ze),Y(ue,Se,Ce),ie(de,ce,ue),L(de,de),Y(ce,Ce,ze),Y(ue,Ce,Oe),ie(he,ce,ue),L(he,he);const Ie=[Oe,Se,Ce,ze],Ci=[0,-1,0,pe[0],pe[1],pe[2],de[0],de[1],de[2],he[0],he[1],he[2]],zi=[0,1,2,3,1,0,3,2,1,3,0,2],Ai=[0,0,0,1,1,1,2,2,2,3,3,3];function Fn(o,e){Array.isArray(e)||(e=[e,e,e]);const i=new Array(12);for(let t=0;t<4;t++)i[3*t]=Ie[t][0]*e[0],i[3*t+1]=Ie[t][1]*e[1],i[3*t+2]=Ie[t][2]*e[2];return new J(o,[["position",new M(i,zi,3,!0)],["normal",new M(Ci,Ai,3)]])}function Rn(o,e,i,t,n={uv:!0}){const r=-Math.PI,s=2*Math.PI,a=-Math.PI/2,c=Math.PI,l=Math.max(3,Math.floor(i)),u=Math.max(2,Math.floor(t)),f=(l+1)*(u+1),h=X(3*f),y=X(3*f),P=X(2*f),m=[];let d=0;for(let x=0;x<=u;x++){const A=[],p=x/u,z=a+p*c,C=Math.cos(z);for(let b=0;b<=l;b++){const R=b/l,w=r+R*s,j=Math.cos(w)*C,T=Math.sin(z),K=-Math.sin(w)*C;h[3*d]=j*e,h[3*d+1]=T*e,h[3*d+2]=K*e,y[3*d]=j,y[3*d+1]=T,y[3*d+2]=K,P[2*d]=R,P[2*d+1]=p,A.push(d),++d}m.push(A)}const g=new Array;for(let x=0;x<u;x++)for(let A=0;A<l;A++){const p=m[x][A],z=m[x][A+1],C=m[x+1][A+1],b=m[x+1][A];x===0?(g.push(p),g.push(C),g.push(b)):x===u-1?(g.push(p),g.push(z),g.push(C)):(g.push(p),g.push(z),g.push(C),g.push(C),g.push(b),g.push(p))}const v=[["position",new M(h,g,3,!0)],["normal",new M(y,g,3,!0)]];return n.uv&&v.push(["uv0",new M(P,g,2,!0)]),n.offset&&(v[0][0]="offset",v.push(["position",new M(Float64Array.from(n.offset),Tt(g.length),3,!0)])),new J(o,v)}function _n(o,e,i,t){const n=Di(e,i);return new J(o,n)}function Di(o,e,i){let t,n;t=[0,-1,0,1,0,0,0,0,1,-1,0,0,0,0,-1,0,1,0],n=[0,1,2,0,2,3,0,3,4,0,4,1,1,5,2,2,5,3,3,5,4,4,5,1];for(let c=0;c<t.length;c+=3)dt(t,c,o/pt(t,c));let r={};function s(c,l){c>l&&([c,l]=[l,c]);const u=c.toString()+"."+l.toString();if(r[u])return r[u];let f=t.length;return t.length+=3,vi(t,3*c,t,3*l,t,f),dt(t,f,o/pt(t,f)),f/=3,r[u]=f,f}for(let c=0;c<e;c++){const l=n.length,u=new Array(4*l);for(let f=0;f<l;f+=3){const h=n[f],y=n[f+1],P=n[f+2],m=s(h,y),d=s(y,P),g=s(P,h),v=4*f;u[v]=h,u[v+1]=m,u[v+2]=g,u[v+3]=y,u[v+4]=d,u[v+5]=m,u[v+6]=P,u[v+7]=g,u[v+8]=d,u[v+9]=m,u[v+10]=d,u[v+11]=g}n=u,r={}}const a=lt(t);for(let c=0;c<a.length;c+=3)gi(a,c);return[["position",new M(lt(t),n,3,!0)],["normal",new M(a,n,3,!0)]]}function En(o,{normal:e,position:i,color:t,rotation:n,size:r,centerOffsetAndDistance:s,uvi:a,featureAttribute:c,olidColor:l=null}={}){const u=i?Ze(i):F(),f=e?Ze(e):Ot(0,0,1),h=t?[t[0],t[1],t[2],t.length>3?t[3]:255]:[255,255,255,255],y=r!=null&&r.length===2?r:[1,1],P=n!=null?[n]:[0],m=Tt(1),d=[["position",new M(u,m,3,!0)],["normal",new M(f,m,3,!0)],["color",new M(h,m,4,!0)],["size",new M(y,m,2)],["rotation",new M(P,m,1,!0)]];if(a&&d.push(["uvi",new M(a,m,a.length)]),s!=null){const g=[s[0],s[1],s[2],s[3]];d.push(["centerOffsetAndDistance",new M(g,m,4)])}if(c){const g=[c[0],c[1],c[2],c[3]];d.push(["featureAttribute",new M(g,m,4)])}return new J(o,d,null,1,l,void 0,mi())}function Mi(o,e,i,t,n=!0,r=!0){let s=0;const a=e,c=o;let l=H(0,s,0),u=H(0,s+c,0),f=H(0,-1,0),h=H(0,1,0);t&&(s=c,u=H(0,0,0),l=H(0,s,0),f=H(0,1,0),h=H(0,-1,0));const y=[u,l],P=[f,h],m=i+2,d=Math.sqrt(c*c+a*a);if(t)for(let p=i-1;p>=0;p--){const z=p*(2*Math.PI/i),C=H(Math.cos(z)*a,s,Math.sin(z)*a);y.push(C);const b=H(c*Math.cos(z)/d,-a/d,c*Math.sin(z)/d);P.push(b)}else for(let p=0;p<i;p++){const z=p*(2*Math.PI/i),C=H(Math.cos(z)*a,s,Math.sin(z)*a);y.push(C);const b=H(c*Math.cos(z)/d,a/d,c*Math.sin(z)/d);P.push(b)}const g=new Array,v=new Array;if(n){for(let p=3;p<y.length;p++)g.push(1),g.push(p-1),g.push(p),v.push(0),v.push(0),v.push(0);g.push(y.length-1),g.push(2),g.push(1),v.push(0),v.push(0),v.push(0)}if(r){for(let p=3;p<y.length;p++)g.push(p),g.push(p-1),g.push(0),v.push(p),v.push(p-1),v.push(1);g.push(0),g.push(2),g.push(y.length-1),v.push(1),v.push(2),v.push(P.length-1)}const x=X(3*m);for(let p=0;p<m;p++)x[3*p]=y[p][0],x[3*p+1]=y[p][1],x[3*p+2]=y[p][2];const A=X(3*m);for(let p=0;p<m;p++)A[3*p]=P[p][0],A[3*p+1]=P[p][1],A[3*p+2]=P[p][2];return[["position",new M(x,g,3,!0)],["normal",new M(A,v,3,!0)]]}function In(o,e,i,t,n,r=!0,s=!0){return new J(o,Mi(e,i,t,n,r,s))}function Un(o,e,i,t,n,r,s){const a=n?ot(n):H(1,0,0),c=r?ot(r):H(0,0,0);s??(s=!0);const l=W();L(l,a);const u=W();G(u,l,Math.abs(e));const f=W();G(f,u,-.5),q(f,f,c);const h=H(0,1,0);Math.abs(1-Xe(l,h))<.2&&oe(h,0,0,1);const y=W();ie(y,l,h),L(y,y),ie(h,y,l);const P=2*t+(s?2:0),m=t+(s?2:0),d=X(3*P),g=X(3*m),v=X(2*P),x=new Array(3*t*(s?4:2)),A=new Array(3*t*(s?4:2));s&&(d[3*(P-2)]=f[0],d[3*(P-2)+1]=f[1],d[3*(P-2)+2]=f[2],v[2*(P-2)]=0,v[2*(P-2)+1]=0,d[3*(P-1)]=d[3*(P-2)]+u[0],d[3*(P-1)+1]=d[3*(P-2)+1]+u[1],d[3*(P-1)+2]=d[3*(P-2)+2]+u[2],v[2*(P-1)]=1,v[2*(P-1)+1]=1,g[3*(m-2)]=-l[0],g[3*(m-2)+1]=-l[1],g[3*(m-2)+2]=-l[2],g[3*(m-1)]=l[0],g[3*(m-1)+1]=l[1],g[3*(m-1)+2]=l[2]);const p=(w,j,T)=>{x[w]=j,A[w]=T};let z=0;const C=W(),b=W();for(let w=0;w<t;w++){const j=w*(2*Math.PI/t);G(C,h,Math.sin(j)),G(b,y,Math.cos(j)),q(C,C,b),g[3*w]=C[0],g[3*w+1]=C[1],g[3*w+2]=C[2],G(C,C,i),q(C,C,f),d[3*w]=C[0],d[3*w+1]=C[1],d[3*w+2]=C[2],v[2*w]=w/t,v[2*w+1]=0,d[3*(w+t)]=d[3*w]+u[0],d[3*(w+t)+1]=d[3*w+1]+u[1],d[3*(w+t)+2]=d[3*w+2]+u[2],v[2*(w+t)]=w/t,v[2*w+1]=1;const T=(w+1)%t;p(z++,w,w),p(z++,w+t,w),p(z++,T,T),p(z++,T,T),p(z++,w+t,w),p(z++,T+t,T)}if(s){for(let w=0;w<t;w++){const j=(w+1)%t;p(z++,P-2,m-2),p(z++,w,m-2),p(z++,j,m-2)}for(let w=0;w<t;w++){const j=(w+1)%t;p(z++,w+t,m-1),p(z++,P-1,m-1),p(z++,j+t,m-1)}}const R=[["position",new M(d,x,3,!0)],["normal",new M(g,A,3,!0)],["uv0",new M(v,x,2,!0)]];return new J(o,R)}function Bn(o,e,i,t,n,r){t=t||10,n=n==null||n,$t(e.length>1);const s=[[0,0,0]],a=[],c=[];for(let l=0;l<t;l++){a.push([0,-l-1,-(l+1)%t-1]);const u=l/t*2*Math.PI;c.push([Math.cos(u)*i,Math.sin(u)*i])}return Vi(o,c,e,s,a,n,r)}function Vi(o,e,i,t,n,r,s=H(0,0,0)){const a=e.length,c=X(i.length*a*3+(6*t.length||0)),l=X(i.length*a*3+(t?6:0)),u=new Array,f=new Array;let h=0,y=0;const P=F(),m=F(),d=F(),g=F(),v=F(),x=F(),A=F(),p=F(),z=F(),C=F(),b=F(),R=F(),w=F(),j=ti();oe(z,0,1,0),Y(m,i[1],i[0]),L(m,m),r?(q(p,i[0],s),L(d,p)):oe(d,0,0,1),gt(m,d,z,z,v,d,vt),k(g,d),k(R,v);for(let S=0;S<t.length;S++)G(x,v,t[S][0]),G(p,d,t[S][2]),q(x,x,p),q(x,x,i[0]),c[h++]=x[0],c[h++]=x[1],c[h++]=x[2];l[y++]=-m[0],l[y++]=-m[1],l[y++]=-m[2];for(let S=0;S<n.length;S++)u.push(n[S][0]>0?n[S][0]:-n[S][0]-1+t.length),u.push(n[S][1]>0?n[S][1]:-n[S][1]-1+t.length),u.push(n[S][2]>0?n[S][2]:-n[S][2]-1+t.length),f.push(0),f.push(0),f.push(0);let T=t.length;const K=t.length-1;for(let S=0;S<i.length;S++){let me=!1;S>0&&(k(P,m),S<i.length-1?(Y(m,i[S+1],i[S]),L(m,m)):me=!0,q(C,P,m),L(C,C),q(b,i[S-1],g),oi(i[S],C,j),ii(j,ni(b,P),p)?(Y(p,p,i[S]),L(d,p),ie(v,C,d),L(v,v)):gt(C,g,R,z,v,d,vt),k(g,d),k(R,v)),r&&(q(p,i[S],s),L(w,p));for(let Z=0;Z<a;Z++)if(G(x,v,e[Z][0]),G(p,d,e[Z][1]),q(x,x,p),L(A,x),l[y++]=A[0],l[y++]=A[1],l[y++]=A[2],q(x,x,i[S]),c[h++]=x[0],c[h++]=x[1],c[h++]=x[2],!me){const je=(Z+1)%a;u.push(T+Z),u.push(T+a+Z),u.push(T+je),u.push(T+je),u.push(T+a+Z),u.push(T+a+je);for(let $e=0;$e<6;$e++){const qt=u.length-6;f.push(u[qt+$e]-K)}}T+=a}const le=i[i.length-1];for(let S=0;S<t.length;S++)G(x,v,t[S][0]),G(p,d,t[S][1]),q(x,x,p),q(x,x,le),c[h++]=x[0],c[h++]=x[1],c[h++]=x[2];const Q=y/3;l[y++]=m[0],l[y++]=m[1],l[y++]=m[2];const N=T-a;for(let S=0;S<n.length;S++)u.push(n[S][0]>=0?T+n[S][0]:-n[S][0]-1+N),u.push(n[S][2]>=0?T+n[S][2]:-n[S][2]-1+N),u.push(n[S][1]>=0?T+n[S][1]:-n[S][1]-1+N),f.push(Q),f.push(Q),f.push(Q);const ne=[["position",new M(c,u,3,!0)],["normal",new M(l,f,3,!0)]];return new J(o,ne)}function Hn(o,e,i,t,n){const r=so(3*e.length),s=new Array(2*(e.length-1));let a=0,c=0;for(let u=0;u<e.length;u++){for(let f=0;f<3;f++)r[a++]=e[u][f];u>0&&(s[c++]=u-1,s[c++]=u)}const l=[["position",new M(r,s,3,!0)]];if(i&&i.length===e.length&&i[0].length===3){const u=X(3*i.length);let f=0;for(let h=0;h<e.length;h++)for(let y=0;y<3;y++)u[f++]=i[h][y];l.push(["normal",new M(u,s,3,!0)])}return t&&l.push(["color",new M(t,ei(t.length/4),4)]),new J(o,l,null,2)}function Gn(o,e,i,t,n,r=0){const s=new Array(18),a=[[-i,r,n/2],[t,r,n/2],[0,e+r,n/2],[-i,r,-n/2],[t,r,-n/2],[0,e+r,-n/2]],c=[0,1,2,3,0,2,2,5,3,1,4,5,5,2,1,1,0,3,3,4,1,4,3,5];for(let l=0;l<6;l++)s[3*l]=a[l][0],s[3*l+1]=a[l][1],s[3*l+2]=a[l][2];return new J(o,[["position",new M(s,c,3,!0)]])}function Ln(o,e){const i=o.getMutableAttribute("position").data;for(let t=0;t<i.length;t+=3){const n=i[t],r=i[t+1],s=i[t+2];oe(fe,n,r,s),ae(fe,fe,e),i[t]=fe[0],i[t+1]=fe[1],i[t+2]=fe[2]}}function qn(o,e=o){const i=o.attributes,t=i.get("position").data,n=i.get("normal").data;if(n){const r=e.getMutableAttribute("normal").data;for(let s=0;s<n.length;s+=3){const a=n[s+1];r[s+1]=-n[s+2],r[s+2]=a}}if(t){const r=e.getMutableAttribute("position").data;for(let s=0;s<t.length;s+=3){const a=t[s+1];r[s+1]=-t[s+2],r[s+2]=a}}}function Ue(o,e,i,t,n){return!(Math.abs(Xe(e,o))>n)&&(ie(i,o,e),L(i,i),ie(t,i,o),L(t,t),!0)}function gt(o,e,i,t,n,r,s){return Ue(o,e,n,r,s)||Ue(o,i,n,r,s)||Ue(o,t,n,r,s)}const vt=.99619469809,fe=F();function Ti(o){return o instanceof Float32Array&&o.length>=16}function ji(o){return Array.isArray(o)&&o.length>=16}function $i(o){return Ti(o)||ji(o)}const _t=.5;function Fi(o,e){o.include(At),o.attributes.add("position","vec3"),o.attributes.add("normal","vec3"),o.attributes.add("centerOffsetAndDistance","vec4");const i=o.vertex;qo(i,e),ko(i,e),i.uniforms.add(new Je("viewport",t=>t.camera.fullViewport),new He("polygonOffset",t=>t.shaderPolygonOffset),new Me("cameraGroundRelative",t=>t.camera.aboveGround?1:-1)),e.hasVerticalOffset&&No(i),i.code.add(O`struct ProjectHUDAux {
vec3 posModel;
vec3 posView;
vec3 vnormal;
float distanceToCamera;
float absCosAngle;
};`),i.code.add(O`
    float applyHUDViewDependentPolygonOffset(float pointGroundDistance, float absCosAngle, inout vec3 posView) {
      float pointGroundSign = ${e.terrainDepthTest?O.float(0):O`sign(pointGroundDistance)`};
      if (pointGroundSign == 0.0) {
        pointGroundSign = cameraGroundRelative;
      }

      // cameraGroundRelative is -1 if camera is below ground, 1 if above ground
      // groundRelative is 1 if both camera and symbol are on the same side of the ground, -1 otherwise
      float groundRelative = cameraGroundRelative * pointGroundSign;

      // view angle dependent part of polygon offset emulation: we take the absolute value because the sign that is
      // dropped is instead introduced using the ground-relative position of the symbol and the camera
      if (polygonOffset > .0) {
        float cosAlpha = clamp(absCosAngle, 0.01, 1.0);
        float tanAlpha = sqrt(1.0 - cosAlpha * cosAlpha) / cosAlpha;
        float factor = (1.0 - tanAlpha / viewport[2]);

        // same side of the terrain
        if (groundRelative > 0.0) {
          posView *= factor;
        }
        // opposite sides of the terrain
        else {
          posView /= factor;
        }
      }

      return groundRelative;
    }
  `),e.draped&&!e.hasVerticalOffset||Yo(i),e.draped||(i.uniforms.add(new Me("perDistancePixelRatio",t=>Math.tan(t.camera.fovY/2)/(t.camera.fullViewport[2]/2))),i.code.add(O`
    void applyHUDVerticalGroundOffset(vec3 normalModel, inout vec3 posModel, inout vec3 posView) {
      float distanceToCamera = length(posView);

      // Compute offset in world units for a half pixel shift
      float pixelOffset = distanceToCamera * perDistancePixelRatio * ${O.float(_t)};

      // Apply offset along normal in the direction away from the ground surface
      vec3 modelOffset = normalModel * cameraGroundRelative * pixelOffset;

      // Apply the same offset also on the view space position
      vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;

      posModel += modelOffset;
      posView += viewOffset;
    }
  `)),e.screenCenterOffsetUnitsEnabled&&Dt(i),e.hasScreenSizePerspective&&Mt(i),i.code.add(O`
    vec4 projectPositionHUD(out ProjectHUDAux aux) {
      vec3 centerOffset = centerOffsetAndDistance.xyz;
      float pointGroundDistance = centerOffsetAndDistance.w;

      aux.posModel = position;
      aux.posView = (view * vec4(aux.posModel, 1.0)).xyz;
      aux.vnormal = normal;
      ${e.draped?"":"applyHUDVerticalGroundOffset(aux.vnormal, aux.posModel, aux.posView);"}

      // Screen sized offset in world space, used for example for line callouts
      // Note: keep this implementation in sync with the CPU implementation, see
      //   - MaterialUtil.verticalOffsetAtDistance
      //   - HUDMaterial.applyVerticalOffsetTransformation

      aux.distanceToCamera = length(aux.posView);

      vec3 viewDirObjSpace = normalize(cameraPosition - aux.posModel);
      float cosAngle = dot(aux.vnormal, viewDirObjSpace);

      aux.absCosAngle = abs(cosAngle);

      ${e.hasScreenSizePerspective&&(e.hasVerticalOffset||e.screenCenterOffsetUnitsEnabled)?"vec3 perspectiveFactor = screenSizePerspectiveScaleFactor(aux.absCosAngle, aux.distanceToCamera, screenSizePerspectiveAlignment);":""}

      ${e.hasVerticalOffset?e.hasScreenSizePerspective?"float verticalOffsetScreenHeight = applyScreenSizePerspectiveScaleFactorFloat(verticalOffset.x, perspectiveFactor);":"float verticalOffsetScreenHeight = verticalOffset.x;":""}

      ${e.hasVerticalOffset?O`
            float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * aux.distanceToCamera, verticalOffset.z, verticalOffset.w);
            vec3 modelOffset = aux.vnormal * worldOffset;
            aux.posModel += modelOffset;
            vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;
            aux.posView += viewOffset;
            // Since we elevate the object, we need to take that into account
            // in the distance to ground
            pointGroundDistance += worldOffset;`:""}

      float groundRelative = applyHUDViewDependentPolygonOffset(pointGroundDistance, aux.absCosAngle, aux.posView);

      ${e.screenCenterOffsetUnitsEnabled?"":O`
            // Apply x/y in view space, but z in screen space (i.e. along posView direction)
            aux.posView += vec3(centerOffset.x, centerOffset.y, 0.0);

            // Same material all have same z != 0.0 condition so should not lead to
            // branch fragmentation and will save a normalization if it's not needed
            if (centerOffset.z != 0.0) {
              aux.posView -= normalize(aux.posView) * centerOffset.z;
            }
          `}

      vec4 posProj = proj * vec4(aux.posView, 1.0);

      ${e.screenCenterOffsetUnitsEnabled?e.hasScreenSizePerspective?"float centerOffsetY = applyScreenSizePerspectiveScaleFactorFloat(centerOffset.y, perspectiveFactor);":"float centerOffsetY = centerOffset.y;":""}

      ${e.screenCenterOffsetUnitsEnabled?"posProj.xy += vec2(centerOffset.x, centerOffsetY) * pixelRatio * 2.0 / viewport.zw * posProj.w;":""}

      // constant part of polygon offset emulation
      posProj.z -= groundRelative * polygonOffset * posProj.w;
      return posProj;
    }
  `)}function Qe(o){o.uniforms.add(new Jo("alignPixelEnabled",e=>e.alignPixelEnabled)),o.code.add(O`vec4 alignToPixelCenter(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.500123) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = (floor(xy * widthHeight) + vec2(0.5)) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`),o.code.add(O`vec4 alignToPixelOrigin(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.5) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = floor((xy + 0.5 * pixelSz) * widthHeight) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`)}function Ri(o,e){const{vertex:i,fragment:t}=o;o.include(Wo,e),i.include(Qe),i.main.add(O`vec4 posProjCenter;
if (dot(position, position) > 0.0) {
ProjectHUDAux projectAux;
vec4 posProj = projectPositionHUD(projectAux);
posProjCenter = alignToPixelCenter(posProj, viewport.zw);
forwardViewPosDepth(projectAux.posView);
vec3 vpos = projectAux.posModel;
if (rejectBySlice(vpos)) {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
} else {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
gl_Position = posProjCenter;
gl_PointSize = 1.0;`),t.main.add(O`fragColor = vec4(1);
if(discardByTerrainDepth()) {
fragColor.g = 0.5;
}`)}function _i(o){o.vertex.uniforms.add(new Me("renderTransparentlyOccludedHUD",e=>e.hudRenderStyle===0?1:e.hudRenderStyle===1?0:.75),new Je("viewport",e=>e.camera.fullViewport),new Vt("hudVisibilityTexture",e=>{var i;return(i=e.hudVisibility)==null?void 0:i.getTexture()})),o.vertex.include(Qe),o.vertex.code.add(O`bool testHUDVisibility(vec4 posProj) {
vec4 posProjCenter = alignToPixelCenter(posProj, viewport.zw);
vec4 occlusionPixel = texture(hudVisibilityTexture, .5 + .5 * posProjCenter.xy / posProjCenter.w);
if (renderTransparentlyOccludedHUD > 0.5) {
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g * renderTransparentlyOccludedHUD < 1.0;
}
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g == 1.0;
}`)}class Ei extends Xo{constructor(e,i,t){super(e,"vec4",2,(n,r,s)=>n.setUniform4fv(e,i(r,s),t))}}function Et(o){const e=new fi,{signedDistanceFieldEnabled:i,occlusionTestEnabled:t,horizonCullingEnabled:n,pixelSnappingEnabled:r,hasScreenSizePerspective:s,debugDrawLabelBorder:a,hasVVSize:c,hasVVColor:l,hasRotation:u,occludedFragmentFade:f,sampleSignedDistanceFieldTexelCenter:h}=o;e.include(Fi,o),e.vertex.include(Io,o);const{occlusionPass:y,output:P,oitPass:m}=o;if(y)return e.include(Ri,o),e;const{vertex:d,fragment:g}=e;e.include(At),e.include(Uo,o),e.include(Bo,o),t&&e.include(_i),g.include(Ho),e.varyings.add("vcolor","vec4"),e.varyings.add("vtc","vec2"),e.varyings.add("vsize","vec2");const v=P===9,x=v&&t;x&&e.varyings.add("voccluded","float"),d.uniforms.add(new Je("viewport",b=>b.camera.fullViewport),new rt("screenOffset",(b,R)=>Ye(Ae,2*b.screenOffset[0]*R.camera.pixelRatio,2*b.screenOffset[1]*R.camera.pixelRatio)),new rt("anchorPosition",b=>ve(b)),new Re("materialColor",b=>b.color),new He("materialRotation",b=>b.rotation),new at("tex",b=>b.texture)),Dt(d),i&&(d.uniforms.add(new Re("outlineColor",b=>b.outlineColor)),g.uniforms.add(new Re("outlineColor",b=>mt(b)?b.outlineColor:ho),new He("outlineSize",b=>mt(b)?b.outlineSize:0))),n&&d.uniforms.add(new Ei("pointDistanceSphere",(b,R)=>{const w=R.camera.eye,j=b.origin;return go(j[0]-w[0],j[1]-w[1],j[2]-w[2],Kt.radius)})),r&&d.include(Qe),s&&(Go(d),Mt(d)),a&&e.varyings.add("debugBorderCoords","vec4"),e.attributes.add("uv0","vec2"),e.attributes.add("uvi","vec4"),e.attributes.add("color","vec4"),e.attributes.add("size","vec2"),e.attributes.add("rotation","float"),(c||l)&&e.attributes.add("featureAttribute","vec4"),d.code.add(n?O`bool behindHorizon(vec3 posModel) {
vec3 camToEarthCenter = pointDistanceSphere.xyz - localOrigin;
vec3 camToPos = pointDistanceSphere.xyz + posModel;
float earthRadius = pointDistanceSphere.w;
float a = dot(camToPos, camToPos);
float b = dot(camToPos, camToEarthCenter);
float c = dot(camToEarthCenter, camToEarthCenter) - earthRadius * earthRadius;
return b > 0.0 && b < a && b * b  > a * c;
}`:O`bool behindHorizon(vec3 posModel) { return false; }`),d.main.add(O`
    ProjectHUDAux projectAux;
    vec4 posProj = projectPositionHUD(projectAux);
    forwardObjectAndLayerIdColor();

    if (rejectBySlice(projectAux.posModel)) {
      // Project outside of clip plane
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    if (behindHorizon(projectAux.posModel)) {
      // Project outside of clip plane
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    vec2 inputSize;
    ${B(s,O`
        inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
        vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);`,O`
        inputSize = size;
        vec2 screenOffsetScaled = screenOffset;`)}
    ${B(c,O`inputSize *= vvScale(featureAttribute).xx;`)}

    vec2 combinedSize = inputSize * pixelRatio;
    vec4 quadOffset = vec4(0.0);

    ${B(t,O`
    bool visible = testHUDVisibility(posProj);
    if (!visible) {
      vtc = vec2(0.0);
      ${B(a,"debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);")}
      return;
    }`)}
    ${B(x,O`voccluded = visible ? 0.0 : 1.0;`)}
  `);const A=O`
      vec2 uv = mix(uvi.xy, uvi.zw, bvec2(uv0));
      vec2 texSize = vec2(textureSize(tex, 0));
      uv = mix(vec2(1.0), uv / texSize, lessThan(uv, vec2(${Ui})));
      quadOffset.xy = (uv0 - anchorPosition) * 2.0 * combinedSize;

      ${B(u,O`
          float angle = radians(materialRotation + rotation);
          float cosAngle = cos(angle);
          float sinAngle = sin(angle);
          mat2 rotate = mat2(cosAngle, -sinAngle, sinAngle,  cosAngle);

          quadOffset.xy = rotate * quadOffset.xy;
        `)}

      quadOffset.xy = (quadOffset.xy + screenOffsetScaled) / viewport.zw * posProj.w;
  `,p=r?i?O`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:O`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:O`posProj += quadOffset;`;d.main.add(O`
    ${A}
    ${l?"vcolor = interpolateVVColor(featureAttribute.y) * materialColor;":"vcolor = color / 255.0 * materialColor;"}

    ${B(P===10,O`vcolor.a = 1.0;`)}

    bool alphaDiscard = vcolor.a < ${O.float(te)};
    ${B(i,`alphaDiscard = alphaDiscard && outlineColor.a < ${O.float(te)};`)}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${p}
      gl_Position = posProj;
    }

    vtc = uv;

    ${B(a,O`debugBorderCoords = vec4(uv01, 1.5 / combinedSize);`)}
    vsize = inputSize;
  `),g.uniforms.add(new at("tex",b=>b.texture)),f&&!v&&g.uniforms.add(new Vt("depthMap",b=>b.mainDepth),new Me("occludedOpacity",b=>b.hudOccludedFragmentOpacity));const z=a?O`(isBorder > 0.0 ? 0.0 : ${O.float(te)})`:O.float(te),C=O`
    ${B(a,O`float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`)}

    vec2 samplePos = vtc;

    ${B(h,O`
      float txSize = float(textureSize(tex, 0).x);
      float texelSize = 1.0 / txSize;

      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      samplePos += (vec2(1.0, -1.0) * texelSize) * scaleFactor;`)}

    ${i?O`
      vec4 fillPixelColor = vcolor;

      // Get distance in output units (i.e. pixels)

      float sdf = texture(tex, samplePos).r;
      float pixelDistance = sdf * vsize.x;

      // Create smooth transition from the icon into its outline
      float fillAlphaFactor = clamp(0.5 - pixelDistance, 0.0, 1.0);
      fillPixelColor.a *= fillAlphaFactor;

      if (outlineSize > 0.25) {
        vec4 outlinePixelColor = outlineColor;
        float clampedOutlineSize = min(outlineSize, 0.5*vsize.x);

        // Create smooth transition around outline
        float outlineAlphaFactor = clamp(0.5 - (abs(pixelDistance) - 0.5*clampedOutlineSize), 0.0, 1.0);
        outlinePixelColor.a *= outlineAlphaFactor;

        if (
          outlineAlphaFactor + fillAlphaFactor < ${z} ||
          fillPixelColor.a + outlinePixelColor.a < ${O.float(te)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
          vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        ${B(!v,O`fragColor = vec4(compositeColor, compositeAlpha);`)}
      } else {
        if (fillAlphaFactor < ${z}) {
          discard;
        }

        ${B(!v,O`fragColor = premultiplyAlpha(fillPixelColor);`)}
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-pixelDistance/vsize.x*2.0, 0.0, 1.0), clamp(pixelDistance/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:O`
          vec4 texColor = texture(tex, samplePos, -0.5);
          if (texColor.a < ${z}) {
            discard;
          }
          ${B(!v,O`fragColor = texColor * premultiplyAlpha(vcolor);`)}
          `}

    ${B(f&&!v,O`
        float zSample = texelFetch(depthMap, ivec2(gl_FragCoord.xy), 0).x;
        if (zSample < gl_FragCoord.z) {
          fragColor *= occludedOpacity;
        }
        `)}

    ${B(!v&&a,O`fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);`)}
  `;switch(P){case 0:case 1:e.outputs.add("fragColor","vec4",0),P===1&&e.outputs.add("fragEmission","vec4",1),m===1&&e.outputs.add("fragAlpha","float",P===1?2:1),g.main.add(O`
        ${C}
        ${B(m===2,O`fragColor.rgb /= fragColor.a;`)}
        ${B(P===1,O`fragEmission = vec4(0.0);`)}
        ${B(m===1,O`fragAlpha = fragColor.a;`)}`);break;case 10:g.main.add(O`
        ${C}
        outputObjectAndLayerIdColor();`);break;case 9:e.include(Lo,o),g.main.add(O`
        ${C}
        outputHighlight(${B(x,O`voccluded == 1.0`,O`false`)});`)}return e}function mt(o){return o.outlineColor[3]>0&&o.outlineSize>0}function ve(o){return o.textureIsSignedDistanceField?Ii(o.anchorPosition,o.distanceFieldBoundingBox,Ae):Nt(Ae,o.anchorPosition),Ae}function Ii(o,e,i){Ye(i,o[0]*(e[2]-e[0])+e[0],o[1]*(e[3]-e[1])+e[1])}const Ae=Ke(),be=32e3,Ui=O.float(be),Bi=Object.freeze(Object.defineProperty({__proto__:null,build:Et,calculateAnchorPosition:ve,fullUV:be},Symbol.toStringTag,{value:"Module"}));class Hi extends _o{constructor(e,i){super(e,i,new Eo(Bi,()=>Promise.resolve().then(()=>Qi)),ui([It,Bt()].map(ri))),this.primitiveType=i.occlusionPass?ct.POINTS:ct.TRIANGLE_STRIP}initializePipeline(e){const{oitPass:i,hasPolygonOffset:t,draped:n,output:r,depthTestEnabled:s,occlusionPass:a}=e,c=s&&!n&&i!==1&&!a&&r!==9;return ai({blending:zt(r)?Zo(i,!0):null,depthTest:s&&!n?{func:515}:null,depthWrite:c?ci:null,drawBuffers:Qo(i,r),colorWrite:li,polygonOffset:t?Gi:null})}}const Gi={factor:0,units:-4},It=Ft().vec2u8("uv0",{glNormalized:!0}),Ut=Ft().vec3f("position").vec3f("normal").vec4i16("uvi").vec4u8("color").vec2f("size").f32("rotation").vec4f("centerOffsetAndDistance").vec4f("featureAttribute"),Li=Ut.clone().vec4u8("olidColor");function Bt(){return Ro()?Li:Ut}class _ extends zo{constructor(e){super(),this.spherical=e,this.screenCenterOffsetUnitsEnabled=!1,this.occlusionTestEnabled=!0,this.signedDistanceFieldEnabled=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.hasVerticalOffset=!1,this.hasScreenSizePerspective=!1,this.hasRotation=!1,this.debugDrawLabelBorder=!1,this.hasPolygonOffset=!1,this.depthTestEnabled=!0,this.pixelSnappingEnabled=!0,this.draped=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.occlusionPass=!1,this.occludedFragmentFade=!1,this.horizonCullingEnabled=!0,this.isFocused=!0,this.olidColorInstanced=!1,this.textureCoordinateType=0,this.emissionSource=0,this.discardInvisibleFragments=!0,this.hasVVInstancing=!1,this.snowCover=!1}}I([U()],_.prototype,"screenCenterOffsetUnitsEnabled",void 0),I([U()],_.prototype,"occlusionTestEnabled",void 0),I([U()],_.prototype,"signedDistanceFieldEnabled",void 0),I([U()],_.prototype,"sampleSignedDistanceFieldTexelCenter",void 0),I([U()],_.prototype,"hasVVSize",void 0),I([U()],_.prototype,"hasVVColor",void 0),I([U()],_.prototype,"hasVerticalOffset",void 0),I([U()],_.prototype,"hasScreenSizePerspective",void 0),I([U()],_.prototype,"hasRotation",void 0),I([U()],_.prototype,"debugDrawLabelBorder",void 0),I([U()],_.prototype,"hasPolygonOffset",void 0),I([U()],_.prototype,"depthTestEnabled",void 0),I([U()],_.prototype,"pixelSnappingEnabled",void 0),I([U()],_.prototype,"draped",void 0),I([U()],_.prototype,"terrainDepthTest",void 0),I([U()],_.prototype,"cullAboveTerrain",void 0),I([U()],_.prototype,"occlusionPass",void 0),I([U()],_.prototype,"occludedFragmentFade",void 0),I([U()],_.prototype,"horizonCullingEnabled",void 0),I([U()],_.prototype,"isFocused",void 0);class kn extends Po{constructor(e,i){super(e,Ji),this.produces=new Map([[13,t=>Fe(t)&&!this.parameters.drawAsLabel],[14,t=>Fe(t)&&this.parameters.drawAsLabel],[12,()=>this.parameters.occlusionTest],[18,t=>this.parameters.draped&&Fe(t)]]),this._visible=!0,this._configuration=new _(i)}getConfiguration(e,i){const t=this.parameters.draped;return super.getConfiguration(e,i,this._configuration),this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasVerticalOffset=!!this.parameters.verticalOffset,this._configuration.hasScreenSizePerspective=!!this.parameters.screenSizePerspective,this._configuration.screenCenterOffsetUnitsEnabled=this.parameters.centerOffsetUnits==="screen",this._configuration.hasPolygonOffset=this.parameters.polygonOffset,this._configuration.draped=t,this._configuration.occlusionTestEnabled=this.parameters.occlusionTest,this._configuration.pixelSnappingEnabled=this.parameters.pixelSnappingEnabled,this._configuration.signedDistanceFieldEnabled=this.parameters.textureIsSignedDistanceField,this._configuration.sampleSignedDistanceFieldTexelCenter=this.parameters.sampleSignedDistanceFieldTexelCenter,this._configuration.hasRotation=this.parameters.hasRotation,this._configuration.hasVVSize=!!this.parameters.vvSize,this._configuration.hasVVColor=!!this.parameters.vvColor,this._configuration.occlusionPass=i.slot===12,this._configuration.occludedFragmentFade=!t&&this.parameters.occludedFragmentFade,this._configuration.horizonCullingEnabled=this.parameters.horizonCullingEnabled,this._configuration.isFocused=this.parameters.isFocused,this._configuration.depthTestEnabled=this.parameters.depthEnabled||i.slot===12,zt(e)&&(this._configuration.debugDrawLabelBorder=!!Oo.LABELS_SHOW_BORDER),this._configuration.oitPass=i.oitPass,this._configuration.terrainDepthTest=i.terrainDepthTest,this._configuration.cullAboveTerrain=i.cullAboveTerrain,this._configuration}intersect(e,i,t,n,r,s){const{options:{selectionMode:a,hud:c,excludeLabels:l},point:u,camera:f}=t,{parameters:h}=this;if(!a||!c||l&&h.isLabel||!e.visible||!u||!f)return;const y=e.attributes.get("featureAttribute"),P=y==null?null:et(y.data,qe),{scaleX:m,scaleY:d}=ke(P,h,f.pixelRatio);wt(De,i),e.attributes.has("featureAttribute")&&Ni(De);const g=e.attributes.get("position"),v=e.attributes.get("size"),x=e.attributes.get("normal"),A=e.attributes.get("rotation"),p=e.attributes.get("centerOffsetAndDistance");$t(g.size>=3);const z=ve(h),C=this.parameters.centerOffsetUnits==="screen";for(let b=0;b<g.data.length/g.size;b++){const R=b*g.size;oe(D,g.data[R],g.data[R+1],g.data[R+2]),ae(D,D,i),ae(D,D,f.viewMatrix);const w=b*p.size;if(oe($,p.data[w],p.data[w+1],p.data[w+2]),!C&&(D[0]+=$[0],D[1]+=$[1],$[2]!==0)){const T=$[2];L($,D),Y(D,D,G($,$,T))}const j=b*x.size;if(oe(re,x.data[j],x.data[j+1],x.data[j+2]),Ge(re,De,f,we),Ne(this.parameters,D,we,f,ge),f.applyProjection(D,V),V[0]>-1){C&&($[0]||$[1])&&(V[0]+=$[0]*f.pixelRatio,$[1]!==0&&(V[1]+=ge.alignmentEvaluator.apply($[1])*f.pixelRatio),f.unapplyProjection(V,D)),V[0]+=this.parameters.screenOffset[0]*f.pixelRatio,V[1]+=this.parameters.screenOffset[1]*f.pixelRatio,V[0]=Math.floor(V[0]),V[1]=Math.floor(V[1]);const T=b*v.size;E[0]=v.data[T],E[1]=v.data[T+1],ge.evaluator.applyVec2(E,E);const K=Lt*f.pixelRatio;let le=0;h.textureIsSignedDistanceField&&(le=Math.min(h.outlineSize,.5*E[0])*f.pixelRatio/2),E[0]*=m,E[1]*=d;const Q=b*A.size,N=h.rotation+A.data[Q];if(Le(u,V[0],V[1],E,K,le,N,h,z)){const ne=t.ray;if(ae(Ve,D,St(Gt,f.viewMatrix)),V[0]=u[0],V[1]=u[1],f.unprojectFromRenderScreen(V,D)){const S=F();k(S,ne.direction);const me=1/ye(S);G(S,S,me),s(Ct(ne.origin,D)*me,S,-1,Ve)}}}}}intersectDraped(e,i,t,n,r){const s=e.attributes.get("position"),a=e.attributes.get("size"),c=e.attributes.get("rotation"),l=this.parameters,u=ve(l),f=e.attributes.get("featureAttribute"),h=f==null?null:et(f.data,qe),{scaleX:y,scaleY:P}=ke(h,l,e.screenToWorldRatio),m=Wi*e.screenToWorldRatio;for(let d=0;d<s.data.length/s.size;d++){const g=d*s.size,v=s.data[g],x=s.data[g+1],A=d*a.size;E[0]=a.data[A],E[1]=a.data[A+1];let p=0;l.textureIsSignedDistanceField&&(p=Math.min(l.outlineSize,.5*E[0])*e.screenToWorldRatio/2),E[0]*=y,E[1]*=P;const z=d*c.size,C=l.rotation+c.data[z];Le(t,v,x,E,m,p,C,l,u)&&n(r.distance,r.normal,-1)}}createBufferWriter(){return new Ki}applyShaderOffsetsView(e,i,t,n,r,s,a){const c=Ge(i,t,r,we);return this._applyVerticalGroundOffsetView(e,c,r,a),Ne(this.parameters,a,c,r,s),this._applyPolygonOffsetView(a,c,n[3],r,a),this._applyCenterOffsetView(a,n,a),a}applyShaderOffsetsNDC(e,i,t,n,r){return this._applyCenterOffsetNDC(e,i,t,n),r!=null&&k(r,n),this._applyPolygonOffsetNDC(n,i,t,n),n}_applyPolygonOffsetView(e,i,t,n,r){const s=n.aboveGround?1:-1;let a=Math.sign(t);a===0&&(a=s);const c=s*a;if(this.parameters.shaderPolygonOffset<=0)return k(r,e);const l=kt(Math.abs(i.cosAngle),.01,1),u=1-Math.sqrt(1-l*l)/l/n.viewport[2];return G(r,e,c>0?u:1/u),r}_applyVerticalGroundOffsetView(e,i,t,n){const r=ye(e),s=t.aboveGround?1:-1,a=t.computeRenderPixelSizeAtDist(r)*_t,c=G(D,i.normal,s*a);return q(n,e,c),n}_applyCenterOffsetView(e,i,t){const n=this.parameters.centerOffsetUnits!=="screen";return t!==e&&k(t,e),n&&(t[0]+=i[0],t[1]+=i[1],i[2]&&(L(re,t),yo(t,t,G(re,re,i[2])))),t}_applyCenterOffsetNDC(e,i,t,n){const r=this.parameters.centerOffsetUnits!=="screen";return n!==e&&k(n,e),r||(n[0]+=i[0]/t.fullWidth*2,n[1]+=i[1]/t.fullHeight*2),n}_applyPolygonOffsetNDC(e,i,t,n){const r=this.parameters.shaderPolygonOffset;if(e!==n&&k(n,e),r){const s=t.aboveGround?1:-1,a=s*Math.sign(i[3]);n[2]-=(a||s)*r}return n}set visible(e){this._visible=e}get visible(){const{color:e,outlineSize:i,outlineColor:t}=this.parameters,n=e[3]>=te||i>=te&&t[3]>=te;return this._visible&&n}createGLMaterial(e){return new qi(e)}calculateRelativeScreenBounds(e,i,t=Pt()){return ki(this.parameters,e,i,t),t[2]=t[0]+e[0],t[3]=t[1]+e[1],t}}class qi extends Fo{constructor(e){super({...e,...e.material.parameters})}beginSlot(e){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.getTechnique(Hi,e)}}function ki(o,e,i,t){t[0]=o.anchorPosition[0]*-e[0]+o.screenOffset[0]*i,t[1]=o.anchorPosition[1]*-e[1]+o.screenOffset[1]*i}function Ge(o,e,i,t){return $i(e)&&(e=wt(Yi,e)),bo(t.normal,o,e),ae(t.normal,t.normal,i.viewInverseTransposeMatrix),t.cosAngle=Xe(Ht,Xi),t}function Ni(o){const e=o[0],i=o[1],t=o[2],n=o[3],r=o[4],s=o[5],a=o[6],c=o[7],l=o[8],u=1/Math.sqrt(e*e+i*i+t*t),f=1/Math.sqrt(n*n+r*r+s*s),h=1/Math.sqrt(a*a+c*c+l*l);return o[0]=e*u,o[1]=i*u,o[2]=t*u,o[3]=n*f,o[4]=r*f,o[5]=s*f,o[6]=a*h,o[7]=c*h,o[8]=l*h,o}function Le(o,e,i,t,n,r,s,a,c){let l=e-n-t[0]*c[0],u=l+t[0]+2*n,f=i-n-t[1]*c[1],h=f+t[1]+2*n;const y=a.distanceFieldBoundingBox;return a.textureIsSignedDistanceField&&y!=null&&(l+=t[0]*y[0],f+=t[1]*y[1],u-=t[0]*(1-y[2]),h-=t[1]*(1-y[3]),l-=r,u+=r,f-=r,h+=r),Ye(xt,e,i),Yt(xe,o,xt,Wt(s)),xe[0]>l&&xe[0]<u&&xe[1]>f&&xe[1]<h}const ge=new So,D=F(),re=F(),V=Te(),Ht=F(),Ve=F(),xe=Ke(),xt=Ke(),De=yt(),Yi=yt(),Gt=bt(),Pe=Te(),$=F(),Be=F(),qe=Te(),we={normal:Ht,cosAngle:0},Lt=1,Wi=2,E=jt(0,0),Xi=Ot(0,0,1);class Ji extends Co{constructor(){super(...arguments),this.renderOccluded=1,this.isDecoration=!1,this.color=tt(1,1,1,1),this.polygonOffset=!1,this.anchorPosition=jt(.5,.5),this.screenOffset=[0,0],this.shaderPolygonOffset=1e-5,this.textureIsSignedDistanceField=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.outlineColor=tt(1,1,1,1),this.outlineSize=0,this.distanceFieldBoundingBox=Te(),this.rotation=0,this.hasRotation=!1,this.vvSizeEnabled=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.hasSlicePlane=!1,this.pixelSnappingEnabled=!0,this.occlusionTest=!0,this.occludedFragmentFade=!1,this.horizonCullingEnabled=!1,this.centerOffsetUnits="world",this.drawAsLabel=!1,this.depthEnabled=!0,this.isFocused=!0,this.focusStyle="bright",this.draped=!1,this.isLabel=!1}get hasVVSize(){return!!this.vvSize}get hasVVColor(){return!!this.vvColor}get hasVVOpacity(){return!!this.vvOpacity}}class Ki{constructor(){this.layout=It,this.instanceLayout=Bt()}elementCount(e){return e.get("position").indices.length}elementCountBaseInstance(e){return e.get("uv0").indices.length}write(e,i,t,n,r,s){var p,z;const{position:a,normal:c,color:l,size:u,rotation:f,centerOffsetAndDistance:h,featureAttribute:y,uvi:P}=r;Mo(t.get("position"),e,a,s),Vo(t.get("normal"),i,c,s);const m=t.get("position").indices.length;let d=0,g=0,v=be,x=be;const A=(p=t.get("uvi"))==null?void 0:p.data;A&&A.length>=4&&(d=A[0],g=A[1],v=A[2],x=A[3]);for(let C=0;C<m;++C){const b=s+C;P.setValues(b,d,g,v,x)}if(To(t.get("color"),4,l,s),it(t.get("size"),u,s),jo(t.get("rotation"),f,s),t.get("centerOffsetAndDistance")?nt(t.get("centerOffsetAndDistance"),h,s):st(h,s,m),t.get("featureAttribute")?nt(t.get("featureAttribute"),y,s):st(y,s,m),n!=null){const C=(z=t.get("position"))==null?void 0:z.indices;if(C){const b=C.length,R=r.getField("olidColor",si);$o(n,R,b,s)}}return{numVerticesPerItem:1,numItems:m}}writeBaseInstance(e,i){const{uv0:t}=i;it(e.get("uv0"),t,0)}intersect(e,i,t,n,r,s,a){const{options:{selectionMode:c,hud:l,excludeLabels:u},point:f,camera:h}=n;if(!c||!l||u&&i.isLabel||!f)return;const y=this.instanceLayout.createView(e),{position:P,normal:m,rotation:d,size:g,featureAttribute:v,centerOffsetAndDistance:x}=y,A=i.centerOffsetUnits==="screen",p=ve(i);if(P==null||m==null||d==null||g==null||x==null||h==null)return;const z=v==null?null:v.getVec(0,qe),{scaleX:C,scaleY:b}=ke(z,i,h.pixelRatio),R=P.count;for(let w=0;w<R;w++){if(P.getVec(w,D),t!=null&&q(D,D,t),ae(D,D,h.viewMatrix),x.getVec(w,Pe),oe($,Pe[0],Pe[1],Pe[2]),!A&&(D[0]+=$[0],D[1]+=$[1],$[2]!==0)){const j=$[2];L($,D),Y(D,D,G($,$,j))}if(m.getVec(w,re),Ge(re,De,h,we),Ne(i,D,we,h,ge),h.applyProjection(D,V),V[0]>-1){A&&($[0]||$[1])&&(V[0]+=$[0]*h.pixelRatio,$[1]!==0&&(V[1]+=ge.alignmentEvaluator.apply($[1])*h.pixelRatio),h.unapplyProjection(V,D)),V[0]+=i.screenOffset[0]*h.pixelRatio,V[1]+=i.screenOffset[1]*h.pixelRatio,V[0]=Math.floor(V[0]),V[1]=Math.floor(V[1]),g.getVec(w,E),ge.evaluator.applyVec2(E,E);const j=Lt*h.pixelRatio;let T=0;i.textureIsSignedDistanceField&&(T=Math.min(i.outlineSize,.5*E[0])*h.pixelRatio/2),E[0]*=C,E[1]*=b;const K=d.get(w),le=i.rotation+K;if(Le(f,V[0],V[1],E,j,T,le,i,p)){const Q=n.ray;if(ae(Ve,D,St(Gt,h.viewMatrix)),V[0]=f[0],V[1]=f[1],h.unprojectFromRenderScreen(V,D)){const N=F();k(N,Q.direction);const ne=1/ye(N);G(N,N,ne),a(Ct(Q.origin,D)*ne,N,w,Ve)}}}}}}function ke(o,e,i){return o==null||e.vvSize==null?{scaleX:i,scaleY:i}:(Ao(Be,e,o),{scaleX:Be[0]*i,scaleY:Be[1]*i})}function Ne(o,e,i,t,n){var c;if(!((c=o.verticalOffset)!=null&&c.screenLength)){const l=ye(e);return n.update(i.cosAngle,l,o.screenSizePerspective,o.screenSizePerspectiveMinPixelReferenceSize,o.screenSizePerspectiveAlignment,null),e}const r=ye(e),s=o.screenSizePerspectiveAlignment??o.screenSizePerspective,a=Do(t,r,o.verticalOffset,i.cosAngle,s,o.screenSizePerspectiveMinPixelReferenceSize);return n.update(i.cosAngle,r,o.screenSizePerspective,o.screenSizePerspectiveMinPixelReferenceSize,o.screenSizePerspectiveAlignment,null),G(i.normal,i.normal,a),q(e,e,i.normal)}function Nn(o){return o.type==="point"}const Qi=Object.freeze(Object.defineProperty({__proto__:null,build:Et,calculateAnchorPosition:ve,fullUV:be},Symbol.toStringTag,{value:"Module"}));export{Fi as B,Tn as C,Qe as D,Vi as E,Fn as G,_i as H,Ln as J,qn as K,Rn as L,En as N,Vn as O,Dn as P,Gn as Q,Di as R,Mn as S,$n as U,hi as V,Un as W,Hn as X,Bn as Y,Mi as _,jn as a,Nn as b,zn as c,gt as d,In as k,kn as p,_n as q,Cn as x,An as y};
