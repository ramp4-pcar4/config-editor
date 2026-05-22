const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./RibbonLine.glsl-Dh76dtQZ-CsH8b7Rg.js","./FloatArray-BPbliE26-BWWuhS2N.js","./main-oTxL539D.js","./main-Ck4TVEvf.css","./BufferView-UKZ3HTkz-Cq4ITQuh.js","./Camera-NXNsnUPh-Ck_jexVX.js","./Cyclical-DE9y9_k5-PtXQwWx6.js","./enums-BXIvOhb7-DdxAd6mQ.js","./Emissions.glsl-C1fRgyHC-w0vQ71o_.js","./glsl-EDZkDhgF-DQc70waf.js","./HUDIntersectorResult-BtTr0FNs-CH9xVmnR.js","./Indices-1-P90PJ1-C7YVduUv.js","./VertexAttributeLocations-CLj7fE9F-B81C_Mmj.js","./VertexElementDescriptor-m4YY7cFv-D8Uuv_gL.js","./computeTranslationToOriginAndRotation-B_6jc7Rh-BFj5C_9X.js","./frustum-D4WlEIWj-CilQ2wK6.js","./image-DaZlMFyY-BirAFtAK.js","./normalizeUtils-BRX78cJl-BfKjoM1c.js","./normalizeUtilsCommon-KeJ9qxCe-ZJAJ1zyF.js","./utils-DVnBD8Lo-CSN2wWn5.js","./utils-DtsDtyPe-DS5RAUDX.js","./orientedBoundingBox-t0Z2XjHS-B4rdN03q.js","./quat-Ds3I3atR-QfSe2vqA.js","./renderState-DZR-41ug-ux0fr-Co.js","./videoUtils-pxduL-SI-DooWC8U0.js","./ShaderBuilder-aUMFb5cS-BQwZbWwS.js","./HUDMaterial.glsl-BsLjrxV9-BoPlQ798.js"])))=>i.map(i=>d[i]);
import{$E as e,Aa as t,Aw as n,Bp as r,Cs as i,Cu as a,Dw as o,Fi as s,Fp as c,Fv as l,GS as u,Ga as d,Ii as f,Iu as p,Jp as m,KT as h,Ka as g,Kr as _,LC as v,Lu as y,Mi as b,Ml as x,Ng as S,Ni as C,Os as w,Pg as T,Pu as ee,Qb as E,Qg as te,Qp as D,RC as O,RE as ne,Rp as re,T_ as ie,Ta as ae,Ts as k,US as oe,Ua as A,Vr as se,Wa as ce,Wp as j,XS as M,Xa as le,Xc as ue,Xl as de,Xo as fe,Zc as pe,Zl as me,Zo as he,_s as N,bo as ge,co as _e,do as ve,e_ as ye,es as be,fs as P,go as xe,jm as Se,jo as Ce,ju as we,kT as Te,kg as Ee,lC as De,lo as Oe,ns as ke,os as F,pg as Ae,po as je,ps as Me,rw as Ne,so as Pe,ss as Fe,sw as Ie,ts as I,uo as Le,vs as Re,ws as L,xs as R,zT as ze}from"./main-oTxL539D.js";import{a as Be,f as Ve,p as He}from"./enums-BXIvOhb7-DdxAd6mQ.js";import"./Camera-NXNsnUPh-Ck_jexVX.js";import{t as Ue}from"./ShaderBuilder-aUMFb5cS-BQwZbWwS.js";import{n as We}from"./computeTranslationToOriginAndRotation-B_6jc7Rh-BFj5C_9X.js";import{t as z}from"./orientedBoundingBox-t0Z2XjHS-B4rdN03q.js";import{n as B,t as V}from"./glsl-EDZkDhgF-DQc70waf.js";import{_ as Ge,a as Ke,c as qe,d as Je,g as H,l as Ye,m as Xe,n as Ze,o as Qe}from"./Emissions.glsl-C1fRgyHC-w0vQ71o_.js";import{n as U,r as $e,t as et}from"./vec3f32-bmQRds8j-CtMBPFPD.js";import{$ as tt,A as nt,Bt as rt,C as it,Cn as at,D as ot,E as st,F as ct,G as lt,Gt as ut,Ht as dt,I as ft,J as pt,Jt as mt,Kt as ht,L as gt,M as _t,O as vt,On as yt,Q as bt,R as xt,S as St,St as Ct,Tt as wt,U as Tt,Ut as Et,V as Dt,Vt as Ot,W as kt,Wt as At,X as jt,Xt as Mt,Yt as Nt,_ as Pt,_n as Ft,_t as It,a as Lt,an as Rt,b as zt,bn as Bt,bt as Vt,c as Ht,ct as Ut,d as Wt,dn as Gt,dt as Kt,et as qt,f as Jt,ft as Yt,g as Xt,gn as Zt,h as Qt,in as $t,k as en,kt as tn,l as nn,m as rn,mn as an,nn as on,qt as sn,r as cn,s as ln,sn as un,t as dn,u as fn,v as pn,vn as mn,wn as W,wt as hn,x as gn,xn as _n,xt as vn,yn,yt as bn,z as xn}from"./FloatArray-BPbliE26-BWWuhS2N.js";import{n as Sn,o as Cn,r as wn,u as Tn}from"./renderState-DZR-41ug-ux0fr-Co.js";import{n as En}from"./hydratedFeatures-CFf_qx4_-bUMyWwTF.js";import{I as Dn,X as On,q as kn,v as An}from"./BufferView-UKZ3HTkz-Cq4ITQuh.js";import{i as jn,t as Mn}from"./InterleavedLayout-CDRPL8h0-D5O2iLZr.js";import{i as Nn,n as Pn}from"./Indices-1-P90PJ1-C7YVduUv.js";import{t as Fn}from"./Octree-CwFrS5GD-gH84HGjN.js";var In=8;function Ln(e,t){let{vertex:n,attributes:r}=e;n.uniforms.add(new H(`intrinsicWidth`,e=>e.width));let{hasScreenSizePerspective:i,spherical:o}=t;i?(e.include(Vt,t),bn(n),At(n,t),n.uniforms.add(new mt(`inverseViewMatrix`,(e,t)=>p(Rn,a(Rn,t.camera.viewMatrix,e.origin)))),n.code.add(V`
      float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
        vec3 worldPos = (inverseViewMatrix * vec4(pos, 1)).xyz;
        vec3 groundUp = ${o?V`normalize(worldPos + localOrigin)`:V`vec3(0.0, 0.0, 1.0)`};
        float absCosAngle = abs(dot(groundUp, normalize(worldPos - cameraPosition)));

        return screenSizePerspectiveScaleFloat(size, absCosAngle, length(pos), screenSizePerspective);
      }
    `)):n.code.add(V`float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
return size;
}`),t.hasVVSize?(r.add(`sizeFeatureAttribute`,`float`),n.uniforms.add(new Ge(`vvSizeMinSize`,e=>e.vvSize.minSize),new Ge(`vvSizeMaxSize`,e=>e.vvSize.maxSize),new Ge(`vvSizeOffset`,e=>e.vvSize.offset),new Ge(`vvSizeFactor`,e=>e.vvSize.factor),new Ge(`vvSizeFallback`,e=>e.vvSize.fallback)),n.code.add(V`
    float getSize(${B(i,`vec3 pos`)}) {
      float size = isnan(sizeFeatureAttribute)
        ? vvSizeFallback.x
        : intrinsicWidth * clamp(vvSizeOffset + sizeFeatureAttribute * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).x;

      return ${B(i,`applyLineSizeScreenSizePerspective(size, pos)`,`size`)};
    }
    `)):(r.add(`size`,`float`),n.code.add(V`
    float getSize(${B(i,`vec3 pos`)}) {
      float fullSize = intrinsicWidth * size;
      return ${B(i,`applyLineSizeScreenSizePerspective(fullSize, pos)`,`fullSize`)};
    }
    `)),t.hasVVOpacity?(r.add(`opacityFeatureAttribute`,`float`),n.constants.add(`vvOpacityNumber`,`int`,8),n.uniforms.add(new Gt(`vvOpacityValues`,In,e=>e.vvOpacity.values),new Gt(`vvOpacityOpacities`,In,e=>e.vvOpacity.opacityValues),new H(`vvOpacityFallback`,e=>e.vvOpacity.fallback,{supportsNaN:!0})),n.code.add(V`
    float interpolateOpacity(float value) {
      if (value <= vvOpacityValues[0]) {
        return vvOpacityOpacities[0];
      }

      for (int i = 1; i < vvOpacityNumber; ++i) {
        if (vvOpacityValues[i] >= value) {
          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
          return mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f);
        }
      }

      return vvOpacityOpacities[vvOpacityNumber - 1];
    }

    vec4 applyOpacity(vec4 color) {
      if (isnan(opacityFeatureAttribute)) {
        // If there is a color vv then it will already have taken care of applying the fallback
        return ${B(t.hasVVColor,`color`,`vec4(color.rgb, vvOpacityFallback)`)};
      }

      return vec4(color.rgb, interpolateOpacity(opacityFeatureAttribute));
    }
    `)):n.code.add(V`vec4 applyOpacity(vec4 color) {
return color;
}`),t.hasVVColor?(e.include(on,t),r.add(`colorFeatureAttribute`,`float`),n.code.add(V`vec4 getColor() {
vec4 color = interpolateVVColor(colorFeatureAttribute);
if (isnan(color.r)) {
return vec4(0);
}
return applyOpacity(color);
}`)):(r.add(`color`,`vec4`),n.code.add(V`vec4 getColor() {
return applyOpacity(color);
}`))}var Rn=re();function zn(e){e.vertex.code.add(`#define noPerspectiveWrite(x, w) (x * w)`)}function Bn(e){e.fragment.code.add(`#define noPerspectiveRead(x) (x * gl_FragCoord.w)`)}var Vn=.5,Hn=je(Vn/2,Vn/2,1-Vn/2,1-Vn/2);function Un(e){return e===`cross`||e===`x`}function Wn(e,t=128,n=t*Vn,r=0){let{data:i,parameters:a}=Gn(e,t,n,r);return new Lt(i,a)}function Gn(e,t=128,n=t*Vn,r=0){return{data:Kn(e,t,n,r),parameters:{mipmap:!1,wrap:{s:33071,t:33071},width:t,height:t,noUnpackFlip:!0,dataType:He.FLOAT,pixelFormat:6403,internalFormat:Ve.R16F,reloadable:!0}}}function Kn(e,t=128,n=t*Vn,r=0){switch(e){case`circle`:default:return qn(t,n);case`square`:return Jn(t,n);case`cross`:return Xn(t,n,r);case`x`:return Zn(t,n,r);case`kite`:return Yn(t,n);case`triangle`:return Qn(t,n);case`arrow`:return $n(t,n)}}function qn(e,t){let n=e/2-.5;return ir(e,nr(n,n,t/2))}function Jn(e,t){return er(e,t,!1)}function Yn(e,t){return er(e,t,!0)}function Xn(e,t,n=0){return tr(e,t,!1,n)}function Zn(e,t,n=0){return tr(e,t,!0,n)}function Qn(e,t){return ir(e,rr(e/2,t,t/2))}function $n(e,t){let n=t,r=t/2,i=e/2,a=.8*n,o=nr(i,(e-t)/2-a,Math.sqrt(a*a+r*r)),s=rr(i,n,r);return ir(e,(e,t)=>Math.max(s(e,t),-o(e,t)))}function er(e,t,n){return n&&(t/=Math.SQRT2),ir(e,(r,i)=>{let a=r-.5*e+.25,o=.5*e-i-.75;if(n){let e=(a+o)/Math.SQRT2;o=(o-a)/Math.SQRT2,a=e}return Math.max(Math.abs(a),Math.abs(o))-.5*t})}function tr(e,t,n,r=0){t-=r,n&&(t*=Math.SQRT2);let i=.5*t;return ir(e,(t,a)=>{let o,s=t-.5*e,c=.5*e-a-1;if(n){let e=(s+c)/Math.SQRT2;c=(c-s)/Math.SQRT2,s=e}return s=Math.abs(s),c=Math.abs(c),o=s>c?s>i?Math.sqrt((s-i)*(s-i)+c*c):c:c>i?Math.sqrt(s*s+(c-i)*(c-i)):s,o-=r/2,o})}function nr(e,t,n){return(r,i)=>{let a=r-e,o=i-t;return Math.sqrt(a*a+o*o)-n}}function rr(e,t,n){let r=Math.sqrt(t*t+n*n);return(i,a)=>{let o=Math.abs(i-e)-n,s=a-e+t/2+.75,c=(t*o+n*s)/r,l=-s;return Math.max(c,l)}}function ir(e,t){let n=new Float32Array(e*e);for(let r=0;r<e;r++)for(let i=0;i<e;i++)n[i+e*r]=t(i,r)/e;return n}function ar(e,t){let n=e.vertex,r=t.hasScreenSizePerspective;ht(n),n.uniforms.get(`markerScale`)??n.constants.add(`markerScale`,`float`,1),n.constants.add(`markerSizePerLineWidth`,`float`,10).code.add(V`
  float getLineWidth(${B(r,`vec3 pos`)}) {
     return max(getSize(${B(r,`pos`)}), 1.0) * pixelRatio;
  }

  float getScreenMarkerSize(float lineWidth) {
    return markerScale * markerSizePerLineWidth * lineWidth;
  }
  `),t.space===2&&(n.constants.add(`maxSegmentLengthFraction`,`float`,.45),n.uniforms.add(new Mt(`perRenderPixelRatio`,e=>e.camera.perRenderPixelRatio)),n.code.add(V`
  bool areWorldMarkersHidden(vec3 pos, vec3 other) {
    vec3 midPoint = mix(pos, other, 0.5);
    float distanceToCamera = length(midPoint);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    float worldMarkerSize = getScreenMarkerSize(getLineWidth(${B(r,`pos`)})) * screenToWorldRatio;
    float segmentLen = length(pos - other);
    return worldMarkerSize > maxSegmentLengthFraction * segmentLen;
  }

  float getWorldMarkerSize(vec3 pos) {
    float distanceToCamera = length(pos);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    return getScreenMarkerSize(getLineWidth(${B(r,`pos`)})) * screenToWorldRatio;
  }
  `))}var or=V`vec4(0.0, 0.0, 2.0, 1.0)`,G={dash:[4,3],dot:[1,3],"long-dash":[8,3],"short-dash":[4,1],"short-dot":[1,1]},sr={dash:G.dash,"dash-dot":[...G.dash,...G.dot],dot:G.dot,"long-dash":G[`long-dash`],"long-dash-dot":[...G[`long-dash`],...G.dot],"long-dash-dot-dot":[...G[`long-dash`],...G.dot,...G.dot],none:null,"short-dash":G[`short-dash`],"short-dash-dot":[...G[`short-dash`],...G[`short-dot`]],"short-dash-dot-dot":[...G[`short-dash`],...G[`short-dot`],...G[`short-dot`]],"short-dot":G[`short-dot`],solid:null},cr=8,lr=class{constructor(e,t,n){this.image=e,this.width=t,this.length=n,this.uuid=x()}};function ur(e){return e!=null&&`image`in e}function dr(e,t){return e==null?e:{pattern:e.slice(),pixelRatio:t}}function fr(e){return{pattern:[e,e],pixelRatio:2}}function pr(e){switch(e?.type){case`style`:return mr(e.style);case`image`:return new lr(e.image,e.width,e.length);case void 0:case null:return null}return null}function mr(e){return e==null?null:dr(sr[e],cr)}function hr(e){return e.pattern.map(t=>Math.round(t*e.pixelRatio))}function gr(e){if(e==null)return 1;let t=hr(e);return Math.floor(t.reduce((e,t)=>e+t))}function _r(e){return e==null?Pe:e.length===4?e:Ce(vr,e[0],e[1],e[2],1)}var vr=_e();function yr(e,t){if(!t.stippleEnabled)return void e.fragment.code.add(V`float getStippleAlpha(float lineWidth) { return 1.0; }
void discardByStippleAlpha(float stippleAlpha, float threshold) {}
vec4 blendStipple(vec4 color, float stippleAlpha) { return color; }`);let n=!(t.draped&&t.stipplePreferContinuous),{vertex:r,fragment:i}=e;t.draped||(At(r,t),r.uniforms.add(new Mt(`worldToScreenPerDistanceRatio`,({camera:e})=>1/e.perScreenPixelRatio)).code.add(V`float computeWorldToScreenRatio(vec3 segmentCenter) {
float segmentDistanceToCamera = length(segmentCenter - cameraPosition);
return worldToScreenPerDistanceRatio / segmentDistanceToCamera;
}`)),e.varyings.add(`vStippleDistance`,`float`),e.varyings.add(`vStippleDistanceLimits`,`vec2`),e.varyings.add(`vStipplePatternStretch`,`float`),r.code.add(V`
    float discretizeWorldToScreenRatio(float worldToScreenRatio) {
      float step = ${V.float(xr)};

      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);
      return discreteWorldToScreenRatio;
    }
  `),ht(r),r.code.add(V`
    vec2 computeStippleDistanceLimits(float startPseudoScreen, float segmentLengthPseudoScreen, float segmentLengthScreen, float patternLength) {

      // First check if the segment is long enough to support fully screen space patterns.
      // Force sparse mode for segments that are very large in screen space even if it is not allowed,
      // to avoid imprecision from calculating with large floats.
      if (segmentLengthPseudoScreen >= ${n?`patternLength`:`1e4`}) {
        // Round the screen length to get an integer number of pattern repetitions (minimum 1).
        float repetitions = segmentLengthScreen / (patternLength * pixelRatio);
        float flooredRepetitions = max(1.0, floor(repetitions + 0.5));
        float segmentLengthScreenRounded = flooredRepetitions * patternLength;

        float stretch = repetitions / flooredRepetitions;

        // We need to impose a lower bound on the stretch factor to prevent the dots from merging together when there is only 1 repetition.
        // 0.75 is the lowest possible stretch value for flooredRepetitions > 1, so it makes sense as lower bound.
        vStipplePatternStretch = max(0.75, stretch);

        return vec2(0.0, segmentLengthScreenRounded);
      }
      return vec2(startPseudoScreen, startPseudoScreen + segmentLengthPseudoScreen);
    }
  `),i.uniforms.add(new Xe(`stipplePatternTexture`,e=>e.stippleTexture),new H(`stipplePatternPixelSizeInv`,e=>1/br(e))),t.stippleOffColorEnabled&&i.uniforms.add(new Zt(`stippleOffColor`,e=>_r(e.stippleOffColor))),e.include(Bn),t.worldSizedImagePattern?(e.varyings.add(`vStippleV`,`float`),e.fragment.include(Ct),i.code.add(V`vec4 getStippleColor(out bool isClamped) {
vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;
float u = vStippleDistance * stipplePatternPixelSizeInv;
float v = vStippleV == -1.0 ? 0.5 : vStippleV;
return texture(stipplePatternTexture, vec2(u, v));
}
vec4 getStippleColor() {
bool ignored;
return getStippleColor(ignored);
}
float getStippleSDF() {
vec4 color = getStippleColor();
return color.a == 0.0 ? -0.5 : 0.5;
}
float getStippleAlpha(float lineWidth) {
return getStippleColor().a;
}
vec4 blendStipple(vec4 color, float stippleAlpha) {
vec4 stippleColor = getStippleColor();
int mixMode  = 1;
vec3 col = mixExternalColor(color.rgb, vec3(1.0), stippleColor.rgb, mixMode);
float opacity = mixExternalOpacity(color.a, 1.0, stippleColor.a, mixMode);
return vec4(col, opacity);
}`)):i.code.add(V`
    float getStippleSDF(out bool isClamped) {
      float stippleDistanceClamped = noPerspectiveRead(clamp(vStippleDistance, vStippleDistanceLimits.x, vStippleDistanceLimits.y));
      float lineSizeInv = noPerspectiveRead(vLineSizeInv);

      vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
      isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;

      float u = stippleDistanceClamped * stipplePatternPixelSizeInv * lineSizeInv;
      u = fract(u);

      float sdf = texture(stipplePatternTexture, vec2(u, 0.5)).r;

      return (sdf - 0.5) * vStipplePatternStretch + 0.5;
    }

    float getStippleSDF() {
      bool ignored;
      return getStippleSDF(ignored);
    }

    float getStippleAlpha(float lineWidth) {
      bool isClamped;
      float stippleSDF = getStippleSDF(isClamped);
      float antiAliasedResult = clamp(stippleSDF * lineWidth + 0.5, 0.0, 1.0);
      return isClamped ? floor(antiAliasedResult + 0.5) : antiAliasedResult;
    }

    vec4 blendStipple(vec4 color, float stippleAlpha) {
      return ${t.stippleOffColorEnabled?`mix(color, stippleOffColor, stippleAlpha)`:`vec4(color.rgb, color.a * stippleAlpha)`};
    }
  `),i.code.add(V`
    void discardByStippleAlpha(float stippleAlpha, float threshold) {
     ${B(!t.stippleOffColorEnabled,`if (stippleAlpha < threshold) { discard; }`)}
    }
  `)}function br(e){let t=e.stipplePattern;return ur(t)?t.length:t?gr(t)/t.pixelRatio:1}var xr=.4,Sr=v(1),Cr=v(1);function wr(e,t){let{hasAnimation:n,animation:r}=t;if(!n)return;let{attributes:i,varyings:a,vertex:o,fragment:s}=e;i.add(`timeStamps`,`vec4`),a.add(`vTimeStamp`,`float`),a.add(`vFirstTime`,`float`),a.add(`vLastTime`,`float`),a.add(`vTransitionType`,`float`),o.main.add(V`vTimeStamp = timeStamps.x;
vFirstTime = timeStamps.y;
vLastTime = timeStamps.z;
vTransitionType = timeStamps.w;`),r===3&&s.constants.add(`decayRate`,`float`,2.3),s.code.add(V`
    float getTrailOpacity(float x) {
      if (x < 0.0) {
        return 0.0;
      }

      ${Tr(r)}
    }`),s.uniforms.add(new H(`timeElapsed`,e=>e.timeElapsed),new H(`trailLength`,e=>e.trailLength),new H(`speed`,e=>e.animationSpeed),new jt(`startEndTime`,e=>ye(Er,e.startTime,e.endTime))),s.constants.add(`fadeInTime`,`float`,Cr),s.constants.add(`fadeOutTime`,`float`,Sr),s.constants.add(`incomingTransition`,`int`,0),s.constants.add(`outgoingTransition`,`int`,2),s.code.add(V`float fadeIn(float x) {
return smoothstep(0.0, fadeInTime, x);
}
float fadeOut(float x) {
return isinf(fadeOutTime) ? 1.0 : smoothstep(fadeOutTime, 0.0, x);
}
void updateAlphaIf(inout float alpha, bool condition, float newAlpha) {
alpha = condition ? min(alpha, newAlpha) : alpha;
}
vec4 animate(vec4 color) {
float startTime = startEndTime[0];
float endTime = startEndTime[1];
float totalTime = vLastTime - vFirstTime;
float actualFadeOutTime = min(fadeOutTime * speed, trailLength);
float longStreamlineThreshold = (fadeInTime + 1.0) * speed + actualFadeOutTime;
bool longStreamline = totalTime > longStreamlineThreshold;
float totalTimeWithFadeOut = longStreamline && actualFadeOutTime != trailLength ? totalTime : totalTime + actualFadeOutTime;
float fadeOutStartTime = longStreamline ? totalTime - actualFadeOutTime : totalTime;
float originTime =  -vFirstTime;
float actualEndTime = int(vTransitionType) == outgoingTransition ? min(endTime, startTime + vLastTime / speed) : endTime;
vec4 animatedColor = color;
if (speed == 0.0) {
float alpha = getTrailOpacity((totalTimeWithFadeOut - (vTimeStamp - vFirstTime)) / trailLength);
updateAlphaIf(alpha, !isinf(actualEndTime), fadeOut(timeElapsed - actualEndTime));
updateAlphaIf(alpha, true, fadeIn(timeElapsed - startTime));
animatedColor.a *= alpha;
return animatedColor;
}
float relativeStartTime = mod(startTime, totalTimeWithFadeOut);
float shiftedTimeElapsed = timeElapsed - relativeStartTime + originTime;
float headRelativeToFirst = mod(shiftedTimeElapsed * speed, totalTimeWithFadeOut);
float vRelativeToHead = headRelativeToFirst - originTime - vTimeStamp;
float vAbsoluteTime = timeElapsed - vRelativeToHead / speed;
if (startTime > timeElapsed) {
return vec4(0.0);
}
float alpha = getTrailOpacity(vRelativeToHead / trailLength);
updateAlphaIf(alpha, true, fadeIn(timeElapsed - startTime));
updateAlphaIf(alpha, !isinf(actualEndTime), fadeOut(timeElapsed - actualEndTime));
updateAlphaIf(alpha, int(vTransitionType) != incomingTransition, step(startTime, vAbsoluteTime));
updateAlphaIf(alpha, headRelativeToFirst > fadeOutStartTime, fadeOut((headRelativeToFirst - fadeOutStartTime) / speed));
alpha *= fadeIn(vTimeStamp - vFirstTime);
animatedColor.a *= alpha;
return animatedColor;
}`)}function Tr(e){switch(e){case 2:return`return x >= 0.0 && x <= 1.0 ? 1.0 : 0.0;`;case 3:return`float cutOff = exp(-decayRate);
        return (exp(-decayRate * x) - cutOff) / (1.0 - cutOff);`;default:return`return 1.0;`}}var Er=xe(),Dr=1;function Or(e){let t=new Ue,{attributes:n,varyings:r,vertex:i,fragment:a}=t,{applyMarkerOffset:o,draped:s,output:c,capType:l,stippleEnabled:u,falloffEnabled:d,roundJoins:f,wireframe:p,innerColorEnabled:m,hasAnimation:h,hasScreenSizePerspective:g,worldSizedImagePattern:_}=e;a.include(qt),t.include(Ln,e),t.include(yr,e),t.include(Ft,e),t.include(Ot,e),t.include(wr,e);let v=o&&!s;v&&(i.uniforms.add(new H(`markerScale`,e=>e.markerScale)),t.include(ar,{space:2,hasScreenSizePerspective:g})),ut(i,e),i.uniforms.add(new Nt(`inverseProjectionMatrix`,e=>e.camera.inverseProjectionMatrix),new Et(`nearFar`,e=>e.camera.nearFar),new H(`miterLimit`,e=>e.join===`miter`?e.miterLimit:0),new bt(`viewport`,e=>e.camera.fullViewport)),i.constants.add(`LARGE_HALF_FLOAT`,`float`,65500),n.add(`position`,`vec3`),n.add(`previousDelta`,`vec4`),n.add(`nextDelta`,`vec4`),n.add(`lineParameters`,`vec2`),n.add(`u0`,`float`),r.add(`vColor`,`vec4`),r.add(`vpos`,`vec3`,{invariant:!0}),r.add(`vLineDistance`,`float`),r.add(`vLineWidth`,`float`);let y=u;y&&r.add(`vLineSizeInv`,`float`);let b=l===2,x=u&&b,S=d||x;S&&r.add(`vLineDistanceNorm`,`float`),b&&(r.add(`vSegmentSDF`,`float`),r.add(`vReverseSegmentSDF`,`float`)),i.code.add(V`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}
float interp(float ncp, vec4 a, vec4 b) {
return (-ncp - a.z) / (b.z - a.z);
}
vec2 rotate(vec2 v, float a) {
float s = sin(a);
float c = cos(a);
mat2 m = mat2(c, -s, s, c);
return m * v;
}`),i.code.add(V`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),i.code.add(V`void clip(
inout vec4 pos,
inout vec4 prev,
inout vec4 next,
bool isStartVertex
) {
float vnp = nearFar[0] * 0.99;
if (pos.z > -nearFar[0]) {
if (!isStartVertex) {
if (prev.z < -nearFar[0]) {
pos = mix(prev, pos, interp(vnp, prev, pos));
next = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
} else {
if (next.z < -nearFar[0]) {
pos = mix(pos, next, interp(vnp, pos, next));
prev = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
}
} else {
if (prev.z > -nearFar[0]) {
prev = mix(pos, prev, interp(vnp, pos, prev));
}
if (next.z > -nearFar[0]) {
next = mix(next, pos, interp(vnp, next, pos));
}
}
}`),ht(i),i.constants.add(`aaWidth`,`float`,+!u).main.add(V`
    // unpack values from vertex type
    bool isStartVertex = abs(abs(lineParameters.y) - 3.0) == 1.0;
    vec3 prevPosition = position + previousDelta.xyz * previousDelta.w;
    vec3 nextPosition = position + nextDelta.xyz * nextDelta.w;

    float coverage = 1.0;

    // Check for special value of lineParameters.y which is used by the Renderer when graphics are removed before the
    // VBO is recompacted. If this is the case, then we just project outside of clip space.
    if (lineParameters.y == 0.0) {
      gl_Position = ${or};
    }
    else {
      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(prevPosition, 1.0);
      vec4 next = view * vec4(nextPosition, 1.0);

      bool isJoin = abs(lineParameters.y) < 3.0;
  `),v&&i.main.add(V`vec4 other = isStartVertex ? next : prev;
bool markersHidden = areWorldMarkersHidden(pos.xyz, other.xyz);
if (!isJoin && !markersHidden) {
pos.xyz += normalize(other.xyz - pos.xyz) * getWorldMarkerSize(pos.xyz) * 0.5;
}`),t.include(zn),i.main.add(V`
      clip(pos, prev, next, isStartVertex);

      vec3 clippedPos = pos.xyz;
      vec3 clippedCenter = mix(pos.xyz, isStartVertex ? next.xyz : prev.xyz, 0.5);

      forwardViewPosDepth(pos.xyz);

      pos = projectAndScale(pos);
      next = projectAndScale(next);
      prev = projectAndScale(prev);

      vec2 left = (pos.xy - prev.xy);
      vec2 right = (next.xy - pos.xy);

      float leftLen = length(left);
      float rightLen = length(right);

      float lineSize = getSize(${B(g,`clippedPos`)});
      ${B(u&&g,`float patternLineSize = getSize(clippedCenter);`)}
      ${B(u&&!g,`float patternLineSize = lineSize;`)}

      ${B(_,V`
          lineSize += aaWidth;
          float lineWidth = lineSize * pixelRatio * worldToScreenRatio;
          if (lineWidth < 1.0) {
            coverage = lineWidth;
            lineWidth = 1.0;
          }
        `,V`
          if (lineSize < 1.0) {
            coverage = lineSize; // convert sub-pixel coverage to alpha
            lineSize = 1.0;
          }

          lineSize += aaWidth;
          float lineWidth = lineSize * pixelRatio;
        `)}

      vLineWidth = noPerspectiveWrite(lineWidth, pos.w);
      ${y?V`vLineSizeInv = noPerspectiveWrite(1.0 / lineSize, pos.w);`:``}
  `),(u||b)&&i.main.add(V`
      float isEndVertex = float(!isStartVertex);
      vec2 segmentOrigin = mix(pos.xy, prev.xy, isEndVertex);
      vec2 segment = mix(right, left, isEndVertex);
      ${b?V`vec2 segmentEnd = mix(next.xy, pos.xy, isEndVertex);`:``}
    `),i.main.add(V`left = (leftLen > 0.001) ? left/leftLen : vec2(0.0, 0.0);
right = (rightLen > 0.001) ? right/rightLen : vec2(0.0, 0.0);
vec2 capDisplacementDir = vec2(0, 0);
vec2 joinDisplacementDir = vec2(0, 0);
float displacementLen = lineWidth;
if (isJoin) {
bool isOutside = (left.x * right.y - left.y * right.x) * lineParameters.y > 0.0;
joinDisplacementDir = normalize(left + right);
joinDisplacementDir = perpendicular(joinDisplacementDir);
if (leftLen > 0.001 && rightLen > 0.001) {
float nDotSeg = dot(joinDisplacementDir, left);
displacementLen /= length(nDotSeg * left - joinDisplacementDir);
if (!isOutside) {
displacementLen = min(displacementLen, min(leftLen, rightLen)/abs(nDotSeg));
}
}
float subdivisionFactor = lineParameters.x;
if (isOutside && (displacementLen > miterLimit * lineWidth)) {`),f?i.main.add(V`
        vec2 startDir = leftLen < 0.001 ? right : left;
        startDir = perpendicular(startDir);

        vec2 endDir = rightLen < 0.001 ? left : right;
        endDir = perpendicular(endDir);

        float factor = ${u?V`min(1.0, subdivisionFactor * ${V.float(3/2)})`:V`subdivisionFactor`};

        float rotationAngle = acos(clamp(dot(startDir, endDir), -1.0, 1.0));
        joinDisplacementDir = rotate(startDir, -sign(lineParameters.y) * factor * rotationAngle);
      `):i.main.add(V`if (leftLen < 0.001) {
joinDisplacementDir = right;
}
else if (rightLen < 0.001) {
joinDisplacementDir = left;
}
else {
joinDisplacementDir = (isStartVertex || subdivisionFactor > 0.0) ? right : left;
}
joinDisplacementDir = perpendicular(joinDisplacementDir);`);let C=l!==0;return i.main.add(V`
        displacementLen = lineWidth;
      }
    } else {
      // CAP handling ---------------------------------------------------
      joinDisplacementDir = isStartVertex ? right : left;
      joinDisplacementDir = perpendicular(joinDisplacementDir);

      ${C?V`capDisplacementDir = isStartVertex ? -right : left;`:``}
    }
  `),i.main.add(V`
    // Displacement (in pixels) caused by join/or cap
    vec2 dpos = joinDisplacementDir * sign(lineParameters.y) * displacementLen + capDisplacementDir * displacementLen;
    float lineDistNorm = noPerspectiveWrite(sign(lineParameters.y), pos.w);

    vLineDistance = lineWidth * lineDistNorm;
    ${S?V`vLineDistanceNorm = lineDistNorm;`:``}

    pos.xy += dpos;
  `),b&&i.main.add(V`vec2 segmentDir = normalize(segment);
vSegmentSDF = noPerspectiveWrite((isJoin && isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentOrigin, segmentDir)), pos.w);
vReverseSegmentSDF = noPerspectiveWrite((isJoin && !isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentEnd, -segmentDir)), pos.w);`),u&&(s?i.uniforms.add(new Mt(`worldToScreenRatio`,e=>1/e.screenToPCSRatio)):i.main.add(V`vec3 segmentCenter = mix((nextPosition + position) * 0.5, (position + prevPosition) * 0.5, isEndVertex);
float worldToScreenRatio = computeWorldToScreenRatio(segmentCenter);`),i.main.add(V`float segmentLengthScreenDouble = length(segment);
float segmentLengthScreen = segmentLengthScreenDouble * 0.5;
float discreteWorldToScreenRatio = discretizeWorldToScreenRatio(worldToScreenRatio);
float segmentLengthRender = length(mix(nextPosition - position, position - prevPosition, isEndVertex));
vStipplePatternStretch = worldToScreenRatio / discreteWorldToScreenRatio;`),s?i.main.add(V`float segmentLengthPseudoScreen = segmentLengthScreen / pixelRatio * discreteWorldToScreenRatio / worldToScreenRatio;
float startPseudoScreen = u0 * discreteWorldToScreenRatio - mix(0.0, segmentLengthPseudoScreen, isEndVertex);`):i.main.add(V`float startPseudoScreen = mix(u0, u0 - segmentLengthRender, isEndVertex) * discreteWorldToScreenRatio;
float segmentLengthPseudoScreen = segmentLengthRender * discreteWorldToScreenRatio;`),i.uniforms.add(new H(`stipplePatternPixelSize`,e=>br(e))),i.main.add(V`
      float patternLength = patternLineSize * stipplePatternPixelSize;

      ${B(_,V`
          float uu = mix(u0, u0 - segmentLengthRender, isEndVertex);
          vStippleDistanceLimits = vec2(uu, uu + segmentLengthRender);
          vStipplePatternStretch = 1.0;

          // The v-coordinate used in case of an image pattern.
          bool isLeft = sign(lineParameters.y) < 0.0;
          vStippleV = isLeft ? 0.0 : 1.0;
        `,V`
          // Compute the coordinates at both start and end of the line segment, because we need both to clamp to in the
          // fragment shader
          vStippleDistanceLimits = computeStippleDistanceLimits(startPseudoScreen, segmentLengthPseudoScreen, segmentLengthScreen, patternLength);
        `)}

      vStippleDistance = mix(vStippleDistanceLimits.x, vStippleDistanceLimits.y, isEndVertex);

      // Adjust the coordinate to the displaced position (the pattern is shortened/overextended on the in/outside of
      // joins)
      if (segmentLengthScreenDouble >= 0.001) {
        // Project the actual vertex position onto the line segment. Note that the resulting factor is within [0..1]
        // at the original vertex positions, and slightly outside of that range at the displaced positions
        vec2 stippleDisplacement = pos.xy - segmentOrigin;
        float stippleDisplacementFactor = dot(segment, stippleDisplacement) / (segmentLengthScreenDouble * segmentLengthScreenDouble);

        // Apply this offset to the actual vertex coordinate (can be screen or pseudo-screen space)
        vStippleDistance += (stippleDisplacementFactor - isEndVertex) * (vStippleDistanceLimits.y - vStippleDistanceLimits.x);
      }

      // Cancel out perspective correct interpolation because we want this length the really represent the screen
      // distance
      vStippleDistanceLimits = noPerspectiveWrite(vStippleDistanceLimits, pos.w);
      vStippleDistance = noPerspectiveWrite(vStippleDistance, pos.w);

      // Disable stipple distance limits on caps
      vStippleDistanceLimits = isJoin ?
                                 vStippleDistanceLimits :
                                 isStartVertex ?
                                  vec2(-1e34, vStippleDistanceLimits.y) :
                                  vec2(vStippleDistanceLimits.x, 1e34);
    `)),i.main.add(V`
      // Convert back into NDC
      pos.xy = (pos.xy / viewport.zw) * pos.w;

      vColor = getColor();
      vColor.a = noPerspectiveWrite(vColor.a * coverage, pos.w);

      ${p&&!s?`pos.z -= 0.001 * pos.w;`:``}

      // transform final position to camera space for slicing
      vpos = (inverseProjectionMatrix * pos).xyz;
      gl_Position = pos;
      forwardObjectAndLayerIdColor();
    }`),t.fragment.include(mn,e),t.include(rt,e),a.include(Bt),a.main.add(V`discardBySlice(vpos);
discardByTerrainDepth();`),t.include(Bn),a.main.add(V`
    float lineWidth = noPerspectiveRead(vLineWidth);
    float lineDistance = noPerspectiveRead(vLineDistance);
    ${B(S,V`float lineDistanceNorm = noPerspectiveRead(vLineDistanceNorm);`)}
  `),p?a.main.add(V`vec4 finalColor = vec4(1.0, 0.0, 1.0, 1.0);`):(b&&a.main.add(V`
        float sdf = noPerspectiveRead(min(vSegmentSDF, vReverseSegmentSDF));
        vec2 fragmentPosition = vec2(min(sdf, 0.0), lineDistance);

        float fragmentRadius = length(fragmentPosition);
        float fragmentCapSDF = (fragmentRadius - lineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
        float capCoverage = clamp(0.5 - fragmentCapSDF, 0.0, 1.0);

        if (capCoverage < ${V.float(.003913894324853229)}) {
          discard;
        }
      `),x?a.main.add(V`
      vec2 stipplePosition = vec2(
        min(getStippleSDF() * 2.0 - 1.0, 0.0),
        lineDistanceNorm
      );
      float stippleRadius = length(stipplePosition * lineWidth);
      float stippleCapSDF = (stippleRadius - lineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
      float stippleCoverage = clamp(0.5 - stippleCapSDF, 0.0, 1.0);
      float stippleAlpha = step(${V.float(yn)}, stippleCoverage);
      `):a.main.add(V`float stippleAlpha = getStippleAlpha(lineWidth);`),c!==9&&a.main.add(V`discardByStippleAlpha(stippleAlpha, ${V.float(.003913894324853229)});`),t.include(Bn),a.uniforms.add(new Zt(`intrinsicColor`,e=>e.color)).main.add(V`vec4 color = intrinsicColor * vColor;
color.a = noPerspectiveRead(color.a);`),m&&a.uniforms.add(new Zt(`innerColor`,e=>e.innerColor??e.color),new H(`innerWidth`,(e,t)=>e.innerWidth*t.camera.pixelRatio)).main.add(V`float distToInner = abs(lineDistance) - innerWidth;
float innerAA = clamp(0.5 - distToInner, 0.0, 1.0);
float innerAlpha = innerColor.a + color.a * (1.0 - innerColor.a);
color = mix(color, vec4(innerColor.rgb, innerAlpha), innerAA);`),a.main.add(V`vec4 finalColor = blendStipple(color, stippleAlpha);`),d&&(a.uniforms.add(new H(`falloff`,e=>e.falloff)),a.main.add(V`finalColor.a *= pow(max(0.0, 1.0 - abs(lineDistanceNorm)), falloff);`)),u||a.main.add(V`float featherStartDistance = max(lineWidth - 2.0, 0.0);
float value = abs(lineDistance);
float feather = (value - featherStartDistance) / (lineWidth - featherStartDistance);
finalColor.a *= 1.0 - clamp(feather, 0.0, 1.0);`),h&&a.main.add(V`
        finalColor = animate(finalColor);

        ${B(c!==9,V`
            if (finalColor.a <= ${V.float(.003913894324853229)}) {
              discard;
            }`)}
      `)),a.main.add(V`outputColorHighlightOLID(applySlice(finalColor, vpos), finalColor.rgb);`),t}var kr=Object.freeze(Object.defineProperty({__proto__:null,build:Or,ribbonlineNumRoundJoinSubdivisions:1},Symbol.toStringTag,{value:`Module`})),Ar=.5;function jr(e,t){e.include(Vt),e.attributes.add(`position`,`vec3`),e.attributes.add(`normal`,`vec3`),e.attributes.add(`centerOffsetAndDistance`,`vec4`);let n=e.vertex;ut(n,t),At(n,t),n.uniforms.add(new bt(`viewport`,e=>e.camera.fullViewport),new H(`polygonOffset`,e=>e.shaderPolygonOffset),new Mt(`aboveGround`,e=>e.camera.aboveGround?1:-1)),t.hasVerticalOffset&&It(n),n.code.add(V`struct ProjectHUDAux {
vec3 posModel;
vec3 posView;
vec3 vnormal;
float distanceToCamera;
float absCosAngle;
};`),n.code.add(V`
    float applyHUDViewDependentPolygonOffset(float pointGroundDistance, float absCosAngle, inout vec3 posView) {
      float pointGroundSign = ${t.terrainDepthTest?V.float(0):V`sign(pointGroundDistance)`};
      if (pointGroundSign == 0.0) {
        pointGroundSign = aboveGround;
      }

      // aboveGround is -1 if camera is below ground, 1 if above ground
      // groundRelative is 1 if both camera and symbol are on the same side of the ground, -1 otherwise
      float groundRelative = aboveGround * pointGroundSign;

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
  `),t.draped&&!t.hasVerticalOffset||sn(n),t.draped||(n.uniforms.add(new Mt(`perDistancePixelRatio`,e=>Math.tan(e.camera.fovY/2)/(e.camera.fullViewport[2]/2))),n.code.add(V`
      void applyHUDVerticalGroundOffset(vec3 normalModel, inout vec3 posModel, inout vec3 posView) {
        float distanceToCamera = length(posView);

        // Compute offset in world units for a half pixel shift
        float pixelOffset = distanceToCamera * perDistancePixelRatio * ${V.float(.5)};

        // Apply offset along normal in the direction away from the ground surface
        vec3 modelOffset = normalModel * aboveGround * pixelOffset;

        // Apply the same offset also on the view space position
        vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;

        posModel += modelOffset;
        posView += viewOffset;
      }
    `)),t.screenCenterOffsetUnitsEnabled&&ht(n),t.hasScreenSizePerspective&&vn(n),n.code.add(V`
    vec4 projectPositionHUD(out ProjectHUDAux aux) {
      vec3 centerOffset = centerOffsetAndDistance.xyz;
      float pointGroundDistance = centerOffsetAndDistance.w;

      aux.posModel = position;
      aux.posView = (view * vec4(aux.posModel, 1.0)).xyz;
      aux.vnormal = normal;
      ${t.draped?``:`applyHUDVerticalGroundOffset(aux.vnormal, aux.posModel, aux.posView);`}

      // Screen sized offset in world space, used for example for line callouts
      // Note: keep this implementation in sync with the CPU implementation, see
      //   - MaterialUtil.verticalOffsetAtDistance
      //   - HUDMaterial.applyVerticalOffsetTransformation

      aux.distanceToCamera = length(aux.posView);

      vec3 viewDirObjSpace = normalize(cameraPosition - aux.posModel);
      float cosAngle = dot(aux.vnormal, viewDirObjSpace);

      aux.absCosAngle = abs(cosAngle);

      ${t.hasScreenSizePerspective&&(t.hasVerticalOffset||t.screenCenterOffsetUnitsEnabled)?`vec3 perspectiveFactor = screenSizePerspectiveScaleFactor(aux.absCosAngle, aux.distanceToCamera, screenSizePerspectiveAlignment);`:``}

      ${t.hasVerticalOffset?t.hasScreenSizePerspective?`float verticalOffsetScreenHeight = applyScreenSizePerspectiveScaleFactorFloat(verticalOffset.x, perspectiveFactor);`:`float verticalOffsetScreenHeight = verticalOffset.x;`:``}

      ${t.hasVerticalOffset?V`
            float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * aux.distanceToCamera, verticalOffset.z, verticalOffset.w);
            vec3 modelOffset = aux.vnormal * worldOffset;
            aux.posModel += modelOffset;
            vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;
            aux.posView += viewOffset;
            // Since we elevate the object, we need to take that into account
            // in the distance to ground
            pointGroundDistance += worldOffset;`:``}

      float groundRelative = applyHUDViewDependentPolygonOffset(pointGroundDistance, aux.absCosAngle, aux.posView);

      ${t.screenCenterOffsetUnitsEnabled?``:V`
            // Apply x/y in view space, but z in screen space (i.e. along posView direction)
            aux.posView += vec3(centerOffset.x, centerOffset.y, 0.0);

            // Same material all have same z != 0.0 condition so should not lead to
            // branch fragmentation and will save a normalization if it's not needed
            if (centerOffset.z != 0.0) {
              aux.posView -= normalize(aux.posView) * centerOffset.z;
            }
          `}

      vec4 posProj = proj * vec4(aux.posView, 1.0);

      ${t.screenCenterOffsetUnitsEnabled?t.hasScreenSizePerspective?`float centerOffsetY = applyScreenSizePerspectiveScaleFactorFloat(centerOffset.y, perspectiveFactor);`:`float centerOffsetY = centerOffset.y;`:``}

      ${t.screenCenterOffsetUnitsEnabled?`posProj.xy += vec2(centerOffset.x, centerOffsetY) * pixelRatio * 2.0 / viewport.zw * posProj.w;`:``}

      // constant part of polygon offset emulation
      posProj.z -= groundRelative * polygonOffset * posProj.w;
      return posProj;
    }
  `)}function Mr(e){e.uniforms.add(new tt(`alignPixelEnabled`,e=>e.alignPixelEnabled)),e.code.add(V`vec4 alignToPixelCenter(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.500123) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = (floor(xy * widthHeight) + vec2(0.5)) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`),e.code.add(V`vec4 alignToPixelOrigin(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.5) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = floor((xy + 0.5 * pixelSz) * widthHeight) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`)}function Nr(e){e.vertex.uniforms.add(new Mt(`renderTransparentlyOccludedHUD`,e=>e.hudRenderStyle===0?1:e.hudRenderStyle===1?0:.75),new bt(`viewport`,e=>e.camera.fullViewport),new yt(`hudVisibilityTexture`,e=>e.hudVisibility?.getTexture())),e.vertex.include(Mr),e.vertex.code.add(V`bool testHUDVisibility(vec4 posProj) {
vec4 posProjCenter = alignToPixelCenter(posProj, viewport.zw);
vec4 occlusionPixel = texture(hudVisibilityTexture, .5 + .5 * posProjCenter.xy / posProjCenter.w);
if (renderTransparentlyOccludedHUD > 0.5) {
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g * renderTransparentlyOccludedHUD < 1.0;
}
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g == 1.0;
}`)}function Pr(e,t){let{vertex:n,fragment:r}=e;e.include(Ot,t),n.include(Mr),n.main.add(V`vec4 posProjCenter;
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
gl_PointSize = 1.0;`),r.main.add(V`fragColor = vec4(1);
if(discardByTerrainDepth()) {
fragColor.g = 0.5;
}`)}function Fr(e){let t=new Ue;if(t.include(jr,e),t.vertex.include(at,e),e.occlusionPass)return t.include(Pr,e),t;let{output:n,oitPass:r,hasOcclusionTexture:i,signedDistanceFieldEnabled:a,useVisibilityPixel:o,pixelSnappingEnabled:s,hasEmission:c,hasScreenSizePerspective:l,debugDrawLabelBorder:u,hasVVSize:d,hasVVColor:f,hasRotation:p,occludedFragmentFade:m,sampleSignedDistanceFieldTexelCenter:h}=e;t.include(Vt),t.include(on,e),t.include(Ft,e),o&&t.include(Nr);let{vertex:g,fragment:_}=t;_.include(Bt),t.varyings.add(`vcolor`,`vec4`),t.varyings.add(`vtc`,`vec2`),t.varyings.add(`vsize`,`vec2`);let v=n===8,y=v&&o;y&&t.varyings.add(`voccluded`,`float`),g.uniforms.add(new bt(`viewport`,e=>e.camera.fullViewport),new jt(`screenOffset`,(e,t)=>ye(Rr,2*e.screenOffset[0]*t.camera.pixelRatio,2*e.screenOffset[1]*t.camera.pixelRatio)),new jt(`anchorPosition`,e=>Lr(e)),new Zt(`materialColor`,({color:e})=>e),new H(`materialRotation`,e=>e.rotation),new Xe(`tex`,e=>e.texture)),ht(g),a&&(g.uniforms.add(new Zt(`outlineColor`,e=>e.outlineColor)),_.uniforms.add(new Zt(`outlineColor`,e=>Ir(e)?e.outlineColor:Pe),new H(`outlineSize`,e=>Ir(e)?e.outlineSize:0))),s&&g.include(Mr),l&&(bn(g),vn(g)),u&&t.varyings.add(`debugBorderCoords`,`vec4`),t.attributes.add(`uv0`,`vec2`),t.attributes.add(`uvi`,`vec4`),t.attributes.add(`color`,`vec4`),t.attributes.add(`size`,`vec2`),t.attributes.add(`rotation`,`float`),(d||f)&&t.attributes.add(`featureAttribute`,`vec4`),g.main.add(V`
    ProjectHUDAux projectAux;
    vec4 posProj = projectPositionHUD(projectAux);
    forwardObjectAndLayerIdColor();

    if (rejectBySlice(projectAux.posModel)) {
      gl_Position = ${or};
      return;
    }

    vec2 inputSize;
    ${B(l,V`
        inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
        vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);`,V`
        inputSize = size;
        vec2 screenOffsetScaled = screenOffset;`)}
    ${B(d,V`inputSize *= vvScale(featureAttribute).xx;`)}

    vec2 combinedSize = inputSize * pixelRatio;
    vec4 quadOffset = vec4(0.0);

    ${B(o,V`
        bool visible = testHUDVisibility(posProj);
        if (!visible) {
          vtc = vec2(0.0);
          ${B(u,`debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);`)}
          return;
        }
      `)}
    ${B(y,V`voccluded = visible ? 0.0 : 1.0;`)}
  `);let b=V`
    vec2 uv = mix(uvi.xy, uvi.zw, bvec2(uv0));
    vec2 texSize = vec2(textureSize(tex, 0));
    uv = mix(vec2(1.0), uv / texSize, lessThan(uv, vec2(${Hr})));
    quadOffset.xy = (uv0 - anchorPosition) * 2.0 * combinedSize;

    ${B(p,V`
        float angle = radians(materialRotation + rotation);
        float cosAngle = cos(angle);
        float sinAngle = sin(angle);
        mat2 rotate = mat2(cosAngle, -sinAngle, sinAngle,  cosAngle);

        quadOffset.xy = rotate * quadOffset.xy;
      `)}

    quadOffset.xy = (quadOffset.xy + screenOffsetScaled) / viewport.zw * posProj.w;
  `,x=s?a?V`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:V`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:V`posProj += quadOffset;`;g.main.add(V`
    ${b}
    ${f?`vcolor = interpolateVVColor(featureAttribute.y) * materialColor;`:`vcolor = color * materialColor;`}

    ${B(n===9,V`vcolor.a = 1.0;`)}

    bool alphaDiscard = vcolor.a < ${V.float(yn)};
    ${B(a,`alphaDiscard = alphaDiscard && outlineColor.a < ${V.float(yn)};`)}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${x}
      gl_Position = posProj;
    }

    vtc = uv;

    ${B(u,V`debugBorderCoords = vec4(uv0, 1.5 / combinedSize);`)}
    vsize = inputSize;
  `),_.uniforms.add(new Xe(`tex`,e=>e.texture)),m&&!v&&(_.include(dt),_.uniforms.add(new yt(`depthMap`,e=>e.mainDepth),new H(`occludedOpacity`,e=>e.occludedFragmentOpacity?.value??1))),i&&_.uniforms.add(new yt(`texOcclusion`,e=>e.hudOcclusion?.attachment));let S=u?V`(isBorder > 0.0 ? 0.0 : ${V.float(yn)})`:V.float(yn),C=V`
    ${B(u,V`float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`)}

    vec2 samplePos = vtc;

    ${B(h,V`
      float txSize = float(textureSize(tex, 0).x);
      float texelSize = 1.0 / txSize;

      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      samplePos += (vec2(1.0, -1.0) * texelSize) * scaleFactor;`)}

    ${a?V`
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
          outlineAlphaFactor + fillAlphaFactor < ${S} ||
          fillPixelColor.a + outlinePixelColor.a < ${V.float(yn)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
                              vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        ${B(!v,V`fragColor = vec4(compositeColor, compositeAlpha);`)}
      } else {
        if (fillAlphaFactor < ${S}) {
          discard;
        }

        ${B(!v,V`fragColor = premultiplyAlpha(fillPixelColor);`)}
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-pixelDistance/vsize.x*2.0, 0.0, 1.0), clamp(pixelDistance/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:V`
          vec4 texColor = texture(tex, samplePos, -0.5);
          if (texColor.a < ${S}) {
            discard;
          }
          ${B(!v,V`fragColor = texColor * premultiplyAlpha(vcolor);`)}
          `}

    ${B(m&&!v,V`
        float zSample = -linearizeDepth(texelFetch(depthMap, ivec2(gl_FragCoord.xy), 0).x);
        float zFragment = -linearizeDepth(gl_FragCoord.z);
        if (zSample < ${V.float(1-Br)} * zFragment) {
          fragColor *= occludedOpacity;
        }
      `)}
    ${B(i,V`fragColor *= texelFetch(texOcclusion, ivec2(gl_FragCoord.xy), 0).r;`)}

    ${B(!v&&u,V`fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);`)}

    ${B(r===2,V`
    if (fragColor.a < ${V.float(yn)}) {
      discard;
    }`)}
  `;switch(n){case 0:t.outputs.add(`fragColor`,`vec4`,0),c&&t.outputs.add(`fragEmission`,`vec4`,1),r===1&&t.outputs.add(`fragAlpha`,`float`,c?2:1),_.main.add(V`
        ${C}
        // Unlike other materials, the fragment shader outputs premultiplied colors.
        // Disable this for front face rendering for correct OIT compositing.
        ${B(r===2,V`fragColor.rgb /= fragColor.a;`)}
        ${B(c,V`fragEmission = vec4(0.0);`)}
        ${B(r===1,V`fragAlpha = fragColor.a;`)}`);break;case 9:_.main.add(V`
        ${C}
        outputObjectAndLayerIdColor();`);break;case 8:t.include(_n,e),_.main.add(V`
        ${C}
        outputHighlight(${B(y,V`voccluded == 1.0`,V`false`)});`)}return t}function Ir(e){return e.outlineColor[3]>0&&e.outlineSize>0}function Lr(e){return e.textureIsSignedDistanceField?zr(e.anchorPosition,e.distanceFieldBoundingBox,Rr):te(Rr,e.anchorPosition),Rr}var Rr=xe();function zr(e,t,n){ye(n,e[0]*(t[2]-t[0])+t[0],e[1]*(t[3]-t[1])+t[1])}var Br=.08,Vr=32e3,Hr=V.float(Vr),Ur=Object.freeze(Object.defineProperty({__proto__:null,build:Fr,calculateAnchorPosition:Lr,fullUV:Vr},Symbol.toStringTag,{value:`Module`}));function Wr(e){return e===`position`}function Gr(e,t){return e??=[],e.push(t),e}function Kr(e,t){if(e==null)return null;let n=e.filter(e=>e!==t);return n.length===0?null:n}function qr(e,t,n,r,i){Jr[0]=e.get(t,0),Jr[1]=e.get(t,1),Jr[2]=e.get(t,2),tn(Jr,Yr,3),n.set(i,0,Yr[0]),r.set(i,0,Yr[1]),n.set(i,1,Yr[2]),r.set(i,1,Yr[3]),n.set(i,2,Yr[4]),r.set(i,2,Yr[5])}var Jr=j(),Yr=new Float32Array(6),Xr=class{constructor(e={}){this.id=n(),this._highlightIds=new Set,this._shaderTransformation=null,this._visible=!0,this.castShadow=e.castShadow??!0,this.usesVerticalDistanceToGround=e.usesVerticalDistanceToGround??!1,this.graphicUid=e.graphicUid,this.layerViewUid=e.layerViewUid,e.isElevationSource&&(this.lastValidElevationBB=new Zr),this._geometries=e.geometries?Array.from(e.geometries):[]}dispose(){this._geometries.length=0}get layer(){return this._layer}set layer(e){On(this._layer==null||e==null,`Object3D can only be added to a single Layer`),this._layer=e}addGeometry(e){e.visible=this._visible,this._geometries.push(e);for(let t of this._highlightIds)e.addHighlight(t);this._emit(`geometryAdded`,{object:this,geometry:e}),this._highlightIds.size&&this._emit(`highlightChanged`,this),this._invalidateBoundingVolume()}removeGeometry(e){let t=this._geometries.splice(e,1)[0];if(t){for(let e of this._highlightIds)t.removeHighlight(e);this._emit(`geometryRemoved`,{object:this,geometry:t}),this._highlightIds.size&&this._emit(`highlightChanged`,this),this._invalidateBoundingVolume()}}removeAllGeometries(){for(;this._geometries.length>0;)this.removeGeometry(0)}geometryVertexAttributeUpdated(e,t,n=!1){this._emit(`attributesChanged`,{object:this,geometry:e,attribute:t,sync:n}),Wr(t)&&this._invalidateBoundingVolume()}get visible(){return this._visible}set visible(e){if(this._visible!==e){this._visible=e;for(let e of this._geometries)e.visible=this._visible;this._emit(`visibilityChanged`,this)}}maskOccludee(){let e=new gt;for(let t of this._geometries)t.occludees=Gr(t.occludees,e);return this._emit(`occlusionChanged`,this),e}removeOcclude(e){for(let t of this._geometries)t.occludees=Kr(t.occludees,e);this._emit(`occlusionChanged`,this)}highlight(e){let t=new ct(e);for(let e of this._geometries)e.addHighlight(t);return this._emit(`highlightChanged`,this),this._highlightIds.add(t),t}removeHighlight(e){this._highlightIds.delete(e);for(let t of this._geometries)t.removeHighlight(e);this._emit(`highlightChanged`,this)}removeStateID(e){e.channel===0?this.removeHighlight(e):this.removeOcclude(e)}getCombinedStaticTransformation(e,t){return y(t,this.transformation,e.transformation)}getCombinedShaderTransformation(e,t=re()){return y(t,this.effectiveTransformation,e.transformation)}get boundingVolumeWorldSpace(){return this._bvWorldSpace||(this._bvWorldSpace=new Qr,this._validateBoundingVolume(this._bvWorldSpace,0)),this._bvWorldSpace}get boundingVolumeObjectSpace(){return this._bvObjectSpace||(this._bvObjectSpace=new Qr,this._validateBoundingVolume(this._bvObjectSpace,1)),this._bvObjectSpace}_validateBoundingVolume(e,t){let n=t===1;for(let t of this._geometries){let r=t.boundingInfo;r&&$r(r,e,n?t.transformation:this.getCombinedShaderTransformation(t))}Re(e.bounds.center,e.min,e.max,.5);for(let t of this._geometries){let r=t.boundingInfo;if(r==null)continue;let i=n?t.transformation:this.getCombinedShaderTransformation(t),a=le(i);I(ri,r.center,i);let o=Me(ri,e.bounds.center),s=r.radius*a;e.bounds.radius=Math.max(e.bounds.radius,o+s)}}_invalidateBoundingVolume(){let e=this._bvWorldSpace?.bounds;this._bvObjectSpace=this._bvWorldSpace=void 0,this.layer&&e&&this.layer.notifyObjectBBChanged(this,e)}_emit(e,t){this.layer?.events.emit(e,t)}get geometries(){return this._geometries}get transformation(){return this._transformation??r}set transformation(e){this._transformation=we(this._transformation??re(),e),this._invalidateBoundingVolume(),this._emit(`transformationChanged`,this)}get shaderTransformation(){return this._shaderTransformation}set shaderTransformation(e){this._shaderTransformation=e?we(this._shaderTransformation??re(),e):null,this._invalidateBoundingVolume(),this._emit(`shaderTransformationChanged`,this)}get effectiveTransformation(){return this.shaderTransformation??this.transformation}get test(){}},Zr=class{constructor(){this._data=[Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE]}get min(){return m(this._data[0],this._data[1],this._data[2])}get max(){return m(this._data[3],this._data[4],this._data[5])}minWith(e){let{_data:t}=this;t[0]=Math.min(t[0],e[0]),t[1]=Math.min(t[1],e[1]),t[2]=Math.min(t[2],e[2])}maxWith(e){let{_data:t}=this;t[3]=Math.max(t[3],e[0]),t[4]=Math.max(t[4],e[1]),t[5]=Math.max(t[5],e[2])}assignMinMax(e,t){for(let n=0;n<3;++n)this._data[0+n]=e[n],this._data[3+n]=t[n]}isEmpty(){return this._data[3]<this._data[0]&&this._data[4]<this._data[1]&&this._data[5]<this._data[2]}},Qr=class extends Zr{constructor(){super(...arguments),this.bounds=new se}};function $r(e,t,n){let r=e.bbMin,i=e.bbMax;if(ee(n)){let e=P(ei,n[12],n[13],n[14]);R(ti,r,e),R(ni,i,e),t.minWith(ti),t.maxWith(ni);return}if(I(ti,r,n),Fe(r,i))return t.minWith(ti),void t.maxWith(ti);I(ni,i,n),t.minWith(ti),t.minWith(ni),t.maxWith(ti),t.maxWith(ni);for(let e=0;e<3;++e)N(ti,r),N(ni,i),ti[e]=i[e],ni[e]=r[e],I(ti,ti,n),I(ni,ni,n),t.minWith(ti),t.minWith(ni),t.maxWith(ti),t.maxWith(ni)}var ei=j(),ti=j(),ni=j(),ri=j(),ii=[`layerObjectAdded`,`layerObjectRemoved`,`layerObjectsAdded`,`layerObjectsRemoved`,`transformationChanged`,`shaderTransformationChanged`,`visibilityChanged`,`occlusionChanged`,`highlightChanged`,`geometryAdded`,`geometryRemoved`,`attributesChanged`],ai=class{constructor(e,t,r=``){this.stage=e,this.apiLayerViewUid=r,this.id=n(),this.events=new u,this.visible=!0,this.sliceable=!1,this._objectsAdded=[],this._handles=new De,this._objects=new Map,this._pickable=!0,this.visible=t?.visible??!0,this._pickable=t?.pickable??!0,this.updatePolicy=t?.updatePolicy??0,e.addLayer(this);for(let t of ii)this._handles.add(this.events.on(t,n=>e.handleEvent(t,n)))}destroy(){this._handles.size&&(this._handles.destroy(),this.stage.removeLayer(this),this.invalidateSpatialQueryAccelerator())}get objects(){return this._objects}getObject(t){return e(this._objects.get(t))}set pickable(e){this._pickable=e}get pickable(){return this._pickable&&this.visible}add(e){this._objects.set(e.id,e),e.layer=this,this.events.emit(`layerObjectAdded`,e),this._octree!=null&&this._objectsAdded.push(e)}remove(e){this._objects.delete(e.id)&&(this.events.emit(`layerObjectRemoved`,e),e.layer=null,this._octree!=null&&(ne(this._objectsAdded,e)||this._octree.remove([e])))}addMany(e){for(let t of e)this._objects.set(t.id,t),t.layer=this;this.events.emit(`layerObjectsAdded`,e),this._octree!=null&&this._objectsAdded.push(...e)}removeMany(e){let t=[];for(let n of e)this._objects.delete(n.id)&&t.push(n);if(t.length!==0&&(this.events.emit(`layerObjectsRemoved`,t),t.forEach(e=>e.layer=null),this._octree!=null)){for(let e=0;e<t.length;)ne(this._objectsAdded,t[e])?(t[e]=t[t.length-1],--t.length):++e;this._octree.remove(t)}}commit(){this.stage.commitLayer(this)}sync(){this.updatePolicy!==1&&this.stage.syncLayer(this.id)}notifyObjectBBChanged(e,t){this._octree==null||this._objectsAdded.includes(e)||this._octree.update(e,t)}getSpatialQueryAccelerator(){return this._octree==null&&this._objects.size>50?(this._octree=new Fn(e=>e.boundingVolumeWorldSpace.bounds),this._octree.add(this._objects.values())):this._octree!=null&&this._objectsAdded.length>0&&(this._octree.add(this._objectsAdded),this._objectsAdded.length=0),this._octree}invalidateSpatialQueryAccelerator(){this._octree=ze(this._octree),this._objectsAdded.length=0}get test(){}},oi=class{constructor(e,t){this.vec3=e,this.id=t}};function si(e,t,n,r){return new oi(m(e,t,n),r)}var ci={stableRendering:!1},li={rootOrigin:null},ui=class extends Yt{constructor(e,t){super(e,t,Mn(fi(t))),this.shader=new Ut(kr,()=>oe(()=>import(`./RibbonLine.glsl-Dh76dtQZ-CsH8b7Rg.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]),import.meta.url)),this.primitiveType=t.wireframe?Be.LINES:Be.TRIANGLE_STRIP}_makePipelineState(e,t){let{oitPass:n,output:r,hasEmission:i,hasOccludees:a,hasPolygonOffset:o}=e,s=n===0,c=n===2;return wn({blending:qe(r)?Tt(n):null,depthTest:xt(n),depthWrite:xn(e),drawBuffers:Kt(r,_t(n,i)),colorWrite:Tn,stencilWrite:a?Xt:null,stencilTest:a?t?en:st:null,polygonOffset:s||c?o?di:null:nt})}initializePipeline(e){if(e.occluder){let t=e.hasPolygonOffset?di:null,{output:n,hasOccludees:r}=e;this._occluderPipelineTransparent=wn({blending:Sn,polygonOffset:t,depthTest:lt,depthWrite:null,colorWrite:Tn,stencilWrite:null,stencilTest:r?ln:null,drawBuffers:Kt(n)}),this._occluderPipelineOpaque=wn({blending:Sn,polygonOffset:t,depthTest:r?lt:Pt,depthWrite:null,colorWrite:Tn,stencilWrite:r?vt:null,stencilTest:r?gn:null,drawBuffers:Kt(n)}),this._occluderPipelineMaskWrite=wn({blending:null,polygonOffset:t,depthTest:Pt,depthWrite:null,colorWrite:null,stencilWrite:r?Xt:null,stencilTest:r?en:null,drawBuffers:Kt(n)})}return this._occludeePipeline=this._makePipelineState(e,!0),this._makePipelineState(e,!1)}getPipeline(e,t){if(t)return this._occludeePipeline;switch(e.occluder){case 12:return this._occluderPipelineTransparent??super.getPipeline(e);case 11:return this._occluderPipelineOpaque??super.getPipeline(e);default:e.occluder;case void 0:case null:return this._occluderPipelineMaskWrite??super.getPipeline(e)}}};ui=M([o(`esri.views.3d.webgl-engine.shaders.RibbonLineTechnique`)],ui);var di={factor:0,units:-4};function fi(e){let t=jn().vec3f(`position`).vec4f16(`previousDelta`).vec4f16(`nextDelta`).f32(`u0`).vec2f16(`lineParameters`);return e.hasVVColor?t.f32(`colorFeatureAttribute`):t.vec4u8(`color`,{glNormalized:!0}),e.hasVVSize?t.f32(`sizeFeatureAttribute`):t.f32(`size`),e.hasVVOpacity&&t.f32(`opacityFeatureAttribute`),$t()&&t.vec4u8(`olidColor`),e.hasAnimation&&t.vec4f16(`timeStamps`),t}var K=class extends pt{constructor(e){super(),this.spherical=e,this.capType=0,this.emissionSource=0,this.animation=2,this.hasPolygonOffset=!1,this.writeDepth=!1,this.draped=!1,this.stippleEnabled=!1,this.stippleOffColorEnabled=!1,this.stipplePreferContinuous=!0,this.roundJoins=!1,this.applyMarkerOffset=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.hasVVOpacity=!1,this.falloffEnabled=!1,this.innerColorEnabled=!1,this.hasOccludees=!1,this.occluder=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.wireframe=!1,this.discardInvisibleFragments=!1,this.hasScreenSizePerspective=!1,this.worldSizedImagePattern=!1,this.textureCoordinateType=0,this.occlusionPass=!1,this.hasVVInstancing=!1,this.hasSliceTranslatedView=!0,this.overlayEnabled=!1,this.snowCover=!1}get hasAnimation(){return this.animation!==0}};M([W({count:3})],K.prototype,`capType`,void 0),M([W({count:8})],K.prototype,`emissionSource`,void 0),M([W({count:4})],K.prototype,`animation`,void 0),M([W()],K.prototype,`hasPolygonOffset`,void 0),M([W()],K.prototype,`writeDepth`,void 0),M([W()],K.prototype,`draped`,void 0),M([W()],K.prototype,`stippleEnabled`,void 0),M([W()],K.prototype,`stippleOffColorEnabled`,void 0),M([W()],K.prototype,`stipplePreferContinuous`,void 0),M([W()],K.prototype,`roundJoins`,void 0),M([W()],K.prototype,`applyMarkerOffset`,void 0),M([W()],K.prototype,`hasVVSize`,void 0),M([W()],K.prototype,`hasVVColor`,void 0),M([W()],K.prototype,`hasVVOpacity`,void 0),M([W()],K.prototype,`falloffEnabled`,void 0),M([W()],K.prototype,`innerColorEnabled`,void 0),M([W()],K.prototype,`hasOccludees`,void 0),M([W()],K.prototype,`occluder`,void 0),M([W()],K.prototype,`terrainDepthTest`,void 0),M([W()],K.prototype,`cullAboveTerrain`,void 0),M([W()],K.prototype,`wireframe`,void 0),M([W()],K.prototype,`discardInvisibleFragments`,void 0),M([W()],K.prototype,`hasScreenSizePerspective`,void 0),M([W()],K.prototype,`worldSizedImagePattern`,void 0);var pi=class extends Dt{constructor(e,t){super(e,hi),this.produces=new Map([[2,e=>Ke(e)||qe(e)&&this.parameters.renderOccluded===8],[3,e=>Je(e)],[11,e=>Ze(e)&&this.parameters.renderOccluded===8],[12,e=>Ze(e)&&this.parameters.renderOccluded===8],[4,e=>qe(e)&&this.parameters.writeDepth&&this.parameters.renderOccluded!==8],[9,e=>qe(e)&&!this.parameters.writeDepth&&this.parameters.renderOccluded!==8],[20,e=>Ye(e)]]),this._configuration=new K(t)}getConfiguration(e,t){super.getConfiguration(e,t,this._configuration);let n=t.slot===20,r=this.parameters.stipplePattern!=null&&this.parameters.stippleTexture!=null&&e!==8,i=r&&n&&this.parameters.isImagePattern();return this._configuration.draped=n,this._configuration.stippleEnabled=r,this._configuration.stippleOffColorEnabled=r&&this.parameters.stippleOffColor!=null,this._configuration.stipplePreferContinuous=r&&this.parameters.stipplePreferContinuous,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.roundJoins=this.parameters.join===`round`,this._configuration.capType=this.parameters.cap,this._configuration.applyMarkerOffset=this.parameters.markerParameters!=null&&yi(this.parameters.markerParameters),this._configuration.hasPolygonOffset=this.parameters.hasPolygonOffset,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.hasVVSize=this.parameters.hasVVSize,this._configuration.hasVVColor=this.parameters.hasVVColor,this._configuration.hasVVOpacity=this.parameters.hasVVOpacity,this._configuration.innerColorEnabled=this.parameters.innerWidth>0&&this.parameters.innerColor!=null,this._configuration.falloffEnabled=this.parameters.falloff>0,this._configuration.hasOccludees=t.hasOccludees,this._configuration.occluder=this.parameters.renderOccluded===8,this._configuration.terrainDepthTest=t.terrainDepthTest&&qe(e),this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration.wireframe=this.parameters.wireframe,this._configuration.animation=this.parameters.animation,this._configuration.emissionSource=+!!this.hasEmissions,this._configuration.hasScreenSizePerspective=!!this.parameters.screenSizePerspective&&!i,this._configuration.worldSizedImagePattern=i,this._configuration}get visible(){return this.parameters.color[3]>=.003913894324853229||this.parameters.stipplePattern!=null&&(this.parameters.stippleOffColor?.[3]??0)>.003913894324853229}setParameters(e,t){e.animation=this.parameters.animation,super.setParameters(e,t)}intersectDraped({attributes:e,screenToWorldRatio:t},n,r,i,a){if(!n.options.selectionMode)return;let o=e.get(`size`),s=this.parameters.width;if(this.parameters.vvSize){let t=e.get(`sizeFeatureAttribute`).data[0];Number.isNaN(t)?s*=this.parameters.vvSize.fallback[0]:s*=Ne(this.parameters.vvSize.offset[0]+t*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0])}else o&&(s*=o.data[0]);let c=r[0],l=r[1],u=(s/2+4)*t,d=Number.MAX_VALUE,f=0,p=e.get(`position`).data,m=vi(this.parameters,e)?p.length-2:p.length-5;for(let e=0;e<m;e+=3){let t=p[e],n=p[e+1],r=(e+3)%p.length,i=c-t,a=l-n,o=p[r]-t,s=p[r+1]-n,u=Ne((o*i+s*a)/(o*o+s*s),0,1),m=o*u-i,h=s*u-a,g=m*m+h*h;g<d&&(d=g,f=e/3)}d<u*u&&i(a.distance,a.normal,f)}intersect(e,t,n,r,a,o){let{options:s,camera:c,rayBegin:l,rayEnd:u}=n;if(!s.selectionMode||!e.visible||!c)return;if(!kn(t))return void h.getLogger(`esri.views.3d.webgl-engine.materials.RibbonLineMaterial`).error(`intersection assumes a translation-only matrix`);let p=e.attributes,m=p.get(`position`).data,_=this.parameters.width;if(this.parameters.vvSize){let e=p.get(`sizeFeatureAttribute`).data[0];Number.isNaN(e)||(_*=Ne(this.parameters.vvSize.offset[0]+e*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0]))}else p.has(`size`)&&(_*=p.get(`size`).data[0]);let v=wi;te(v,n.point);let y=_*c.pixelRatio/2+4*c.pixelRatio;P(Mi[0],v[0]-y,v[1]+y,0),P(Mi[1],v[0]+y,v[1]+y,0),P(Mi[2],v[0]+y,v[1]-y,0),P(Mi[3],v[0]-y,v[1]-y,0);for(let e=0;e<4;e++)if(!c.unprojectFromRenderScreen(Mi[e],Ni[e]))return;d(c.eye,Ni[0],Ni[1],Pi),d(c.eye,Ni[1],Ni[2],Fi),d(c.eye,Ni[2],Ni[3],Ii),d(c.eye,Ni[3],Ni[0],Li);let x=Number.MAX_VALUE,S=0,w=vi(this.parameters,p)?m.length-2:m.length-5;for(let e=0;e<w;e+=3){bi[0]=m[e]+t[12],bi[1]=m[e+1]+t[13],bi[2]=m[e+2]+t[14];let n=(e+3)%m.length;if(xi[0]=m[n]+t[12],xi[1]=m[n+1]+t[13],xi[2]=m[n+2]+t[14],A(Pi,bi)<0&&A(Pi,xi)<0||A(Fi,bi)<0&&A(Fi,xi)<0||A(Ii,bi)<0&&A(Ii,xi)<0||A(Li,bi)<0&&A(Li,xi)<0)continue;let r=c.projectToRenderScreen(bi,Ti),i=c.projectToRenderScreen(xi,Ei);if(r==null||i==null)continue;if(r[2]<0&&i[2]>0){L(Si,bi,xi);let e=c.frustum;if(k(Si,Si,-A(e[4],bi)/he(Si,g(e[4]))),R(bi,bi,Si),!c.projectToRenderScreen(bi,r))continue}else if(r[2]>0&&i[2]<0){L(Si,xi,bi);let e=c.frustum;if(k(Si,Si,-A(e[4],xi)/he(Si,g(e[4]))),R(xi,xi,Si),!c.projectToRenderScreen(xi,i))continue}else if(r[2]<0&&i[2]<0)continue;r[2]=0,i[2]=0;let a=C(f(r,i,ki),v);a<x&&(x=a,N(Di,bi),N(Oi,xi),S=e/3)}if(x<y*y){let e=Number.MAX_VALUE;if(b(f(Di,Oi,ki),f(l,u,Ai),Ci)){L(Ci,Ci,l);let t=i(Ci);k(Ci,Ci,1/t),e=t/Me(l,u)}o(e,Ci,S)}}get hasEmissions(){return this.parameters.emissiveStrength>0}createBufferWriter(){return new gi(fi(this.parameters),this.parameters)}createGLMaterial(e){return new mi(e)}validateParameters(e){e.join!==`miter`&&(e.miterLimit=0),e.markerParameters!=null&&(e.markerScale=e.markerParameters.width/e.width)}update(e){return!!this.parameters.hasAnimation&&(this.setParameters({timeElapsed:O(e.time)},!1),e.dt!==0)}},mi=class extends Ht{constructor(){super(...arguments),this._stipplePattern=null}dispose(){super.dispose(),this._stippleTextures?.release(this._stipplePattern),this._stipplePattern=null}beginSlot(e){let{stipplePattern:t}=this._material.parameters;return this._stipplePattern!==t&&(this._material.setParameters({stippleTexture:this._stippleTextures.swap(t,this._stipplePattern)}),this._stipplePattern=t),this.getTechnique(ui,e)}},hi=class extends an{constructor(){super(...arguments),this._width=0,this.color=Oe,this.join=`miter`,this.cap=0,this.miterLimit=5,this.writeDepth=!0,this.hasPolygonOffset=!1,this.stippleTexture=null,this.stipplePreferContinuous=!0,this.markerParameters=null,this.markerScale=1,this.hasSlicePlane=!1,this.vvFastUpdate=!1,this.isClosed=!1,this.falloff=0,this.innerWidth=0,this.wireframe=!1,this.timeElapsed=v(0),this.animation=0,this.animationSpeed=1,this.trailLength=1,this.startTime=v(0),this.endTime=v(1/0),this.emissiveStrength=0}get width(){return this.isImagePattern()?this.stipplePattern.width:this._width}set width(e){this._width=e}get transparent(){return this.color[3]<1||this.hasAnimation||this.stipplePattern!=null&&(this.stippleOffColor?.[3]??0)<1}get hasAnimation(){return this.animation!==0}isImagePattern(){return ur(this.stipplePattern)&&this.stippleTexture!=null}},gi=class{constructor(e,t){this.layout=e,this._parameters=t;let n=+!!t.stipplePattern;switch(this._parameters.join){case`miter`:case`bevel`:this.numJoinSubdivisions=n;break;case`round`:this.numJoinSubdivisions=1+n}}_isClosed(e){return vi(this._parameters,e)}allocate(e){return this.layout.createBuffer(e)}elementCount(e){let t=e.get(`position`).indices.length/2+1,n=this._isClosed(e),r=n?2:4;return r+=((n?t:t-1)-+!n)*(2*this.numJoinSubdivisions+4),r+=2,this._parameters.wireframe&&(r=2+4*(r-2)),r}write(e,t,n,r,i,a){let o=this.layout,s=n.get(`position`),c=s.indices,l=s.data.length/3,u=n.get(`distanceToStart`)?.data;c&&c.length!==2*(l-1)&&console.warn(`RibbonLineMaterial does not support indices`);let d=o.fields.has(`sizeFeatureAttribute`),f=1,p=null;if(d){let e=n.get(`sizeFeatureAttribute`);e.data.length===1?f=e.data[0]:p=e.data}else f=n.get(`size`)?.data[0]??1;let m=[1,1,1,1],h=0,g=null,_=o.fields.has(`colorFeatureAttribute`);if(_){let e=n.get(`colorFeatureAttribute`);e.data.length===1?h=e.data[0]:g=e.data}else m=n.get(`color`)?.data??m;let v=n.get(`timeStamps`)?.data,y=v&&o.fields.has(`timeStamps`),b=o.fields.has(`opacityFeatureAttribute`),x=0,S=null;if(b){let e=n.get(`opacityFeatureAttribute`);e.data.length===1?x=e.data[0]:S=e.data}let C=new Float32Array(i.buffer),w=Dn(i.buffer),T=new Uint8Array(i.buffer),ee=o.stride/4,E=a*ee,te=E,D=0,O=u?(e,t,n)=>D=u[n]:(e,t,n)=>D+=Me(e,t),ne=C.BYTES_PER_ELEMENT/w.BYTES_PER_ELEMENT,re=4/ne,ie=$t(),ae=(e,t,n,i,a,o,s,c)=>{C[E++]=t[0],C[E++]=t[1],C[E++]=t[2],rn(e,t,w,E*ne),E+=re,rn(n,t,w,E*ne),E+=re,C[E++]=c;let l=E*ne;if(w[l++]=a,w[l++]=o,E=Math.ceil(l/ne),_)C[E]=g?.[s]??h;else{let e=Math.min(4*s,m.length-4),t=4*E;T[t]=255*m[e],T[t+1]=255*m[e+1],T[t+2]=255*m[e+2],T[t+3]=255*m[e+3]}if(E++,C[E++]=p?.[s]??f,b&&(C[E++]=S?.[s]??x),ie){let e=4*E;r?(T[e++]=r[0],T[e++]=r[1],T[e++]=r[2],T[e++]=r[3]):(T[e++]=0,T[e++]=0,T[e++]=0,T[e++]=0),E=Math.ceil(.25*e)}y&&(l=E*ne,w[l++]=i[0],w[l++]=i[1],w[l++]=i[2],w[l++]=i[3],E=Math.ceil(l/ne))};E+=ee,P(J,s.data[0],s.data[1],s.data[2]),y&&Ce(ji,v[0],v[1],v[2],v[3]),e&&I(J,J,e);let k=this._isClosed(n);if(k){let t=s.data.length-3;P(q,s.data[t],s.data[t+1],s.data[t+2]),e&&I(q,q,e)}else P(Y,s.data[3],s.data[4],s.data[5]),e&&I(Y,Y,e),ae(J,J,Y,ji,1,-4,0,0),ae(J,J,Y,ji,1,4,0,0),N(q,J),N(J,Y),y&&Ce(ji,v[4],v[5],v[6],v[7]);let oe=+!k,A=k?l:l-1;for(let t=oe;t<A;t++){let n=(t+1)%l*3;P(Y,s.data[n],s.data[n+1],s.data[n+2]),e&&I(Y,Y,e),O(q,J,t),ae(q,J,Y,ji,0,-1,t,D),ae(q,J,Y,ji,0,1,t,D);let r=this.numJoinSubdivisions;for(let e=0;e<r;++e){let n=(e+1)/(r+1);ae(q,J,Y,ji,n,-1,t,D),ae(q,J,Y,ji,n,1,t,D)}if(ae(q,J,Y,ji,1,-2,t,D),ae(q,J,Y,ji,1,2,t,D),N(q,J),N(J,Y),y){let e=(t+1)%l*4;Ce(ji,v[e],v[e+1],v[e+2],v[e+3])}}return k?(P(Y,s.data[3],s.data[4],s.data[5]),e&&I(Y,Y,e),D=O(q,J,A),ae(q,J,Y,ji,0,-1,oe,D),ae(q,J,Y,ji,0,1,oe,D)):(D=O(q,J,A),ae(q,J,J,ji,0,-5,A,D),ae(q,J,J,ji,0,5,A,D)),_i(C,te+ee,C,te,ee),E=_i(C,E-ee,C,E,ee),this._parameters.wireframe&&this._addWireframeVertices(i,te,E,ee),null}_addWireframeVertices(e,t,n,r){let i=new Float32Array(e.buffer,n*Float32Array.BYTES_PER_ELEMENT),a=new Float32Array(e.buffer,t*Float32Array.BYTES_PER_ELEMENT,n-t),o=0,s=e=>o=_i(a,e,i,o,r);for(let e=0;e<a.length-1;e+=2*r)s(e),s(e+2*r),s(e+1*r),s(e+2*r),s(e+1*r),s(e+3*r)}};function _i(e,t,n,r,i){for(let a=0;a<i;a++)n[r++]=e[t++];return r}function vi(e,t){return e.isClosed?t.get(`position`).indices.length>2:!1}function yi(e){return e.anchor===1&&e.hideOnShortSegments&&e.placement===`begin-end`&&e.worldSpace}var bi=j(),xi=j(),Si=j(),Ci=j(),wi=j(),Ti=Se(),Ei=Se(),Di=j(),Oi=j(),ki=s(),Ai=s(),q=j(),J=j(),Y=j(),ji=_e(),Mi=[Se(),Se(),Se(),Se()],Ni=[j(),j(),j(),j()],Pi=ce(),Fi=ce(),Ii=ce(),Li=ce(),Ri=class{constructor(e){this._originSR=e,this._rootOriginId=`root/`+n(),this._origins=new Map,this._objects=new Map,this._gridSize=5e5,this._baselineDistance=.5*this._gridSize,this._baselineObjectSize=this._baselineDistance*zi/Bi}getOrigin(e){let t=this._origins.get(this._rootOriginId);if(t==null){let t=li.rootOrigin;if(t!=null)return this._origins.set(this._rootOriginId,si(t[0],t[1],t[2],this._rootOriginId)),this.getOrigin(e);let n=si(e[0]+Math.random()-.5,e[1]+Math.random()-.5,e[2]+Math.random()-.5,this._rootOriginId);return this._origins.set(this._rootOriginId,n),n}let n=this._gridSize,r=Math.round(e[0]/n),i=Math.round(e[1]/n),a=Math.round(e[2]/n),o=`${r}/${i}/${a}`,s=this._origins.get(o),c=.5*n;if(L(X,e,t.vec3),X[0]=Math.abs(X[0]),X[1]=Math.abs(X[1]),X[2]=Math.abs(X[2]),X[0]<c&&X[1]<c&&X[2]<c){if(s){let t=Math.max(...X);if(L(X,e,s.vec3),X[0]=Math.abs(X[0]),X[1]=Math.abs(X[1]),X[2]=Math.abs(X[2]),Math.max(...X)<t)return s}return t}return s||(s=si(r*n,i*n,a*n,o),this._origins.set(o,s)),s}needsOriginUpdate(e,t,n){let r=Me(e.vec3,t),i=Math.max(1,n/this._baselineObjectSize);return r>this._baselineDistance*i}_drawOriginBox(e,t=ve(1,1,0,1)){let n=window.view,r=n.stage,i=t.toString();if(!this._objects.has(i)){this._material=new pi({width:2,color:t},!1);let e=new ai(r,{pickable:!1}),n=new Xr({castShadow:!1});e.add(n),this._objects.set(i,n)}let a=this._objects.get(i),o=[0,1,5,4,0,2,1,7,6,2,0,1,3,7,5,4,6,2,0],s=o.length,c=Array(3*s),l=[],u=.5*this._gridSize;for(let t=0;t<s;t++)c[3*t]=e[0]+(1&o[t]?u:-u),c[3*t+1]=e[1]+(2&o[t]?u:-u),c[3*t+2]=e[2]+(4&o[t]?u:-u),t>0&&l.push(t-1,t);ue(c,this._originSR,0,c,n.renderSpatialReference,0,s);let d=new Wt(this._material,[[`position`,new z(c,l,3,!0)]],null,2);a.addGeometry(d)}get test(){}},X=j(),zi=2**-23,Bi=.05;function Vi(e,t=!1){return e<=1024?t?Array(e).fill(0):Array(e):Dn(e)}function Hi(e,t,n=null){let r=[],i=t.mapPositions,a=Ui(t,r),o=a.data,s=a.indices.length,c=Pn(s);return Wi(t,r,c),qi(t,r,c),Gi(t,r,c),Ki(t,r,a.indices,c),Ji(t,r,a.indices,c),Yi(t,r),Xi(t,r,a.indices,c),Zi(t,r,o),new Wt(e,r,i,2,n)}function Ui(e,t){let{attributeData:{position:n},removeDuplicateStartEnd:r}=e,i=Qi(n)&&r,a=n.length/3-!!i,o=Array(2*(a-1)),s=i?n.slice(0,-3):n,c=0;for(let e=0;e<a-1;e++)o[c++]=e,o[c++]=e+1;let l=new z(s,o,3,i);return t.push([`position`,l]),l}function Wi(e,t,n){if(e.attributeData.colorFeature!=null)return;let r=e.attributeData.color;t.push([`color`,new z(r??Oe,n,4)])}function Gi(e,t,n){e.attributeData.normal&&t.push([`normal`,new z(e.attributeData.normal,n,3)])}function Ki(e,t,n,r){let i=e.attributeData.colorFeature;i!=null&&(typeof i==`number`?t.push([`colorFeatureAttribute`,new z([i],r,1,!0)]):t.push([`colorFeatureAttribute`,new z(i,n,1,!0)]))}function qi(e,t,n){e.attributeData.sizeFeature??t.push([`size`,new z([e.attributeData.size??1],n,1,!0)])}function Ji(e,t,n,r){let i=e.attributeData.sizeFeature;i!=null&&(typeof i==`number`?t.push([`sizeFeatureAttribute`,new z([i],r,1,!0)]):t.push([`sizeFeatureAttribute`,new z(i,n,1,!0)]))}function Yi(e,t){let{attributeData:{position:n,timeStamps:r}}=e;if(!r)return;let i=n.length/3,a=Array(2*(i-1)),o=0;for(let e=0;e<i-1;e++)a[o++]=e,a[o++]=e+1;t.push([`timeStamps`,new z(r,a,4,!0)])}function Xi(e,t,n,r){let i=e.attributeData.opacityFeature;i!=null&&(typeof i==`number`?t.push([`opacityFeatureAttribute`,new z([i],r,1,!0)]):t.push([`opacityFeatureAttribute`,new z(i,n,1,!0)]))}function Zi(e,t,n){if(e.overlayInfo==null||e.overlayInfo.renderCoordsHelper.viewingMode!==1||!e.overlayInfo.spatialReference.isGeographic)return;let r=c(n.length),i=l(e.overlayInfo.spatialReference);for(let e=0;e<r.length;e+=3)pe(n,e,r,e,i);let a=n.length/3,o=dn(a+1),s=$i,u=ea,d=0,f=0;ye(s,r[f++],r[f++]),f++,o[0]=0;for(let e=1;e<a+1;++e)e===a&&(f=0),ye(u,r[f++],r[f++]),f++,d+=T(s,u),o[e]=d,[s,u]=[u,s];t.push([`distanceToStart`,new z(o,t[0][1].indices,1,!0)])}function Qi(e){let t=e.length;return e[0]===e[t-3]&&e[1]===e[t-2]&&e[2]===e[t-1]}var $i=xe(),ea=xe();function ta(e,t){let n=Vi(e.length*4),r=e[0],i=e[e.length-1];for(let a=0;a<e.length;a++)n[a*4]=e[a],n[a*4+1]=r,n[a*4+2]=i,n[a*4+3]=t+.5;return n}function na(e,t){let n=e[t],r=e[t+1],i=e[t+2];return Math.sqrt(n*n+r*r+i*i)}function ra(e,t){let n=e[t],r=e[t+1],i=e[t+2],a=1/Math.sqrt(n*n+r*r+i*i);e[t]*=a,e[t+1]*=a,e[t+2]*=a}function ia(e,t,n){e[t]*=n,e[t+1]*=n,e[t+2]*=n}function aa(e,t,n,r,i,a=t){(i||=e)[a]=e[t]+n[r],i[a+1]=e[t+1]+n[r+1],i[a+2]=e[t+2]+n[r+2]}function oa(){return ca??=sa(),ca}function sa(){return new fn([[`uv0`,new z([0,0,0,255,255,0,255,255],[0,1,2,3],2,!0)]])}var ca=null,la=[[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5],[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5]],ua=[0,0,1,-1,0,0,1,0,0,0,-1,0,0,1,0,0,0,-1],da=[0,0,1,0,1,1,0,1],fa=[0,1,2,2,3,0,4,0,3,3,7,4,1,5,6,6,2,1,1,0,4,4,5,1,3,2,6,6,7,3,5,4,7,7,6,5],pa=Array(36);for(let e=0;e<6;e++)for(let t=0;t<6;t++)pa[6*e+t]=e;var ma=Array(36);for(let e=0;e<6;e++)ma[6*e]=0,ma[6*e+1]=1,ma[6*e+2]=2,ma[6*e+3]=2,ma[6*e+4]=3,ma[6*e+5]=0;function ha(e,t){Array.isArray(t)||(t=[t,t,t]);let n=Array(24);for(let e=0;e<8;e++)n[3*e]=la[e][0]*t[0],n[3*e+1]=la[e][1]*t[1],n[3*e+2]=la[e][2]*t[2];return new Wt(e,[[`position`,new z(n,fa,3,!0)],[`normal`,new z(ua,pa,3)],[`uv0`,new z(da,ma,2)]])}var ga=[[-.5,0,-.5],[.5,0,-.5],[.5,0,.5],[-.5,0,.5],[0,-.5,0],[0,.5,0]],_a=[0,1,-1,1,1,0,0,1,1,-1,1,0,0,-1,-1,1,-1,0,0,-1,1,-1,-1,0],va=[5,1,0,5,2,1,5,3,2,5,0,3,4,0,1,4,1,2,4,2,3,4,3,0],ya=[0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7];function ba(e,t){Array.isArray(t)||(t=[t,t,t]);let n=Array(18);for(let e=0;e<6;e++)n[3*e]=ga[e][0]*t[0],n[3*e+1]=ga[e][1]*t[1],n[3*e+2]=ga[e][2]*t[2];return new Wt(e,[[`position`,new z(n,va,3,!0)],[`normal`,new z(_a,ya,3)]])}var xa=U(-.5,0,-.5),Sa=U(.5,0,-.5),Ca=U(0,0,.5),wa=U(0,.5,0),Ta=et(),Ea=et(),Da=et(),Oa=et(),ka=et();L(Ta,xa,wa),L(Ea,xa,Sa),fe(Da,Ta,Ea),F(Da,Da),L(Ta,Sa,wa),L(Ea,Sa,Ca),fe(Oa,Ta,Ea),F(Oa,Oa),L(Ta,Ca,wa),L(Ea,Ca,xa),fe(ka,Ta,Ea),F(ka,ka);var Aa=[xa,Sa,Ca,wa],ja=[0,-1,0,Da[0],Da[1],Da[2],Oa[0],Oa[1],Oa[2],ka[0],ka[1],ka[2]],Ma=[0,1,2,3,1,0,3,2,1,3,0,2],Na=[0,0,0,1,1,1,2,2,2,3,3,3];function Pa(e,t){Array.isArray(t)||(t=[t,t,t]);let n=Array(12);for(let e=0;e<4;e++)n[3*e]=Aa[e][0]*t[0],n[3*e+1]=Aa[e][1]*t[1],n[3*e+2]=Aa[e][2]*t[2];return new Wt(e,[[`position`,new z(n,Ma,3,!0)],[`normal`,new z(ja,Na,3)]])}function Fa(e,t,n,r,i={uv:!0}){let a=-Math.PI,o=2*Math.PI,s=-Math.PI/2,c=Math.PI,l=Math.max(3,Math.floor(n)),u=Math.max(2,Math.floor(r)),d=(l+1)*(u+1),f=dn(3*d),p=dn(3*d),m=dn(2*d),h=[],g=0;for(let e=0;e<=u;e++){let n=[],r=e/u,i=s+r*c,d=Math.cos(i);for(let e=0;e<=l;e++){let s=e/l,c=a+s*o,u=Math.cos(c)*d,h=Math.sin(i),_=-Math.sin(c)*d;f[3*g]=u*t,f[3*g+1]=h*t,f[3*g+2]=_*t,p[3*g]=u,p[3*g+1]=h,p[3*g+2]=_,m[2*g]=s,m[2*g+1]=r,n.push(g),++g}h.push(n)}let _=[];for(let e=0;e<u;e++)for(let t=0;t<l;t++){let n=h[e][t],r=h[e][t+1],i=h[e+1][t+1],a=h[e+1][t];e===0?(_.push(n),_.push(i),_.push(a)):e===u-1?(_.push(n),_.push(r),_.push(i)):(_.push(n),_.push(r),_.push(i),_.push(i),_.push(a),_.push(n))}let v=[[`position`,new z(f,_,3,!0)],[`normal`,new z(p,_,3,!0)]];return i.uv&&v.push([`uv0`,new z(m,_,2,!0)]),i.offset&&(v[0][0]=`offset`,v.push([`position`,new z(Float64Array.from(i.offset),Pn(_.length),3,!0)])),new Wt(e,v)}function Ia(e,t,n,r){return new Wt(e,La(t,n,r))}function La(e,t,n){let r=e,i,a;if(n)i=[0,-1,0,1,0,0,0,0,1,-1,0,0,0,0,-1,0,1,0],a=[0,1,2,0,2,3,0,3,4,0,4,1,1,5,2,2,5,3,3,5,4,4,5,1];else{let e=r*(1+Math.sqrt(5))/2;i=[-r,e,0,r,e,0,-r,-e,0,r,-e,0,0,-r,e,0,r,e,0,-r,-e,0,r,-e,e,0,-r,e,0,r,-e,0,-r,-e,0,r],a=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1]}for(let t=0;t<i.length;t+=3)ia(i,t,e/na(i,t));let o={};function s(t,n){t>n&&([t,n]=[n,t]);let r=t.toString()+`.`+n.toString();if(o[r])return o[r];let a=i.length;return i.length+=3,aa(i,3*t,i,3*n,i,a),ia(i,a,e/na(i,a)),a/=3,o[r]=a,a}for(let e=0;e<t;e++){let e=a.length,t=Array(4*e);for(let n=0;n<e;n+=3){let e=a[n],r=a[n+1],i=a[n+2],o=s(e,r),c=s(r,i),l=s(i,e),u=4*n;t[u]=e,t[u+1]=o,t[u+2]=l,t[u+3]=r,t[u+4]=c,t[u+5]=o,t[u+6]=i,t[u+7]=l,t[u+8]=c,t[u+9]=o,t[u+10]=c,t[u+11]=l}a=t,o={}}let c=cn(i);for(let e=0;e<c.length;e+=3)ra(c,e);return[[`position`,new z(cn(i),a,3,!0)],[`normal`,new z(c,a,3,!0)]]}function Ra(e,{normal:t,position:n,color:r,rotation:i,size:a,centerOffsetAndDistance:o,uvi:s,featureAttribute:c,olidColor:l=null}={}){let u=n?D(n):j(),d=t?D(t):m(0,0,1),f=r?[r[0],r[1],r[2],r.length>3?r[3]:255]:[255,255,255,255],p=a!=null&&a.length===2?a:[1,1],h=i==null?[0]:[i],g=Pn(1),_=[[`position`,new z(u,g,3,!0)],[`normal`,new z(d,g,3,!0)],[`color`,new z(f,g,4,!0)],[`size`,new z(p,g,2)],[`rotation`,new z(h,g,1,!0)]];if(s&&_.push([`uvi`,new z(s,g,s.length)]),o!=null){let e=[o[0],o[1],o[2],o[3]];_.push([`centerOffsetAndDistance`,new z(e,g,4)])}if(c){let e=[c[0],c[1],c[2],c[3]];_.push([`featureAttribute`,new z(e,g,4)])}return new Wt(e,_,null,1,l,void 0,oa())}function za(e,t,n,r,i=!0,a=!0){let o=0,s=t,c=e,l=U(0,o,0),u=U(0,o+c,0),d=U(0,-1,0),f=U(0,1,0);r&&(o=c,u=U(0,0,0),l=U(0,o,0),d=U(0,1,0),f=U(0,-1,0));let p=[u,l],m=[d,f],h=n+2,g=Math.sqrt(c*c+s*s);if(r)for(let e=n-1;e>=0;e--){let t=e*(2*Math.PI/n),r=U(Math.cos(t)*s,o,Math.sin(t)*s);p.push(r);let i=U(c*Math.cos(t)/g,-s/g,c*Math.sin(t)/g);m.push(i)}else for(let e=0;e<n;e++){let t=e*(2*Math.PI/n),r=U(Math.cos(t)*s,o,Math.sin(t)*s);p.push(r);let i=U(c*Math.cos(t)/g,s/g,c*Math.sin(t)/g);m.push(i)}let _=[],v=[];if(i){for(let e=3;e<p.length;e++)_.push(1),_.push(e-1),_.push(e),v.push(0),v.push(0),v.push(0);_.push(p.length-1),_.push(2),_.push(1),v.push(0),v.push(0),v.push(0)}if(a){for(let e=3;e<p.length;e++)_.push(e),_.push(e-1),_.push(0),v.push(e),v.push(e-1),v.push(1);_.push(0),_.push(2),_.push(p.length-1),v.push(1),v.push(2),v.push(m.length-1)}let y=dn(3*h);for(let e=0;e<h;e++)y[3*e]=p[e][0],y[3*e+1]=p[e][1],y[3*e+2]=p[e][2];let b=dn(3*h);for(let e=0;e<h;e++)b[3*e]=m[e][0],b[3*e+1]=m[e][1],b[3*e+2]=m[e][2];return[[`position`,new z(y,_,3,!0)],[`normal`,new z(b,v,3,!0)]]}function Ba(e,t,n,r,i,a=!0,o=!0){return new Wt(e,za(t,n,r,i,a,o))}function Va(e,t,n,r,i,a,o){let s=i?$e(i):U(1,0,0),c=a?$e(a):U(0,0,0);o??=!0;let l=et();F(l,s);let u=et();k(u,l,Math.abs(t));let d=et();k(d,u,-.5),R(d,d,c);let f=U(0,1,0);Math.abs(1-he(l,f))<.2&&P(f,0,0,1);let p=et();fe(p,l,f),F(p,p),fe(f,p,l);let m=2*r+(o?2:0),h=r+(o?2:0),g=dn(3*m),_=dn(3*h),v=dn(2*m),y=Array(3*r*(o?4:2)),b=Array(3*r*(o?4:2));o&&(g[3*(m-2)]=d[0],g[3*(m-2)+1]=d[1],g[3*(m-2)+2]=d[2],v[2*(m-2)]=0,v[2*(m-2)+1]=0,g[3*(m-1)]=g[3*(m-2)]+u[0],g[3*(m-1)+1]=g[3*(m-2)+1]+u[1],g[3*(m-1)+2]=g[3*(m-2)+2]+u[2],v[2*(m-1)]=1,v[2*(m-1)+1]=1,_[3*(h-2)]=-l[0],_[3*(h-2)+1]=-l[1],_[3*(h-2)+2]=-l[2],_[3*(h-1)]=l[0],_[3*(h-1)+1]=l[1],_[3*(h-1)+2]=l[2]);let x=(e,t,n)=>{y[e]=t,b[e]=n},S=0,C=et(),w=et();for(let e=0;e<r;e++){let t=e*(2*Math.PI/r);k(C,f,Math.sin(t)),k(w,p,Math.cos(t)),R(C,C,w),_[3*e]=C[0],_[3*e+1]=C[1],_[3*e+2]=C[2],k(C,C,n),R(C,C,d),g[3*e]=C[0],g[3*e+1]=C[1],g[3*e+2]=C[2],v[2*e]=e/r,v[2*e+1]=0,g[3*(e+r)]=g[3*e]+u[0],g[3*(e+r)+1]=g[3*e+1]+u[1],g[3*(e+r)+2]=g[3*e+2]+u[2],v[2*(e+r)]=e/r,v[2*e+1]=1;let i=(e+1)%r;x(S++,e,e),x(S++,e+r,e),x(S++,i,i),x(S++,i,i),x(S++,e+r,e),x(S++,i+r,i)}if(o){for(let e=0;e<r;e++){let t=(e+1)%r;x(S++,m-2,h-2),x(S++,e,h-2),x(S++,t,h-2)}for(let e=0;e<r;e++){let t=(e+1)%r;x(S++,e+r,h-1),x(S++,m-1,h-1),x(S++,t+r,h-1)}}return new Wt(e,[[`position`,new z(g,y,3,!0)],[`normal`,new z(_,b,3,!0)],[`uv0`,new z(v,y,2,!0)]])}function Ha(e,t,n,r,i,a){r||=10,i=i==null||i,On(t.length>1);let o=[[0,0,0]],s=[],c=[];for(let e=0;e<r;e++){s.push([0,-e-1,-(e+1)%r-1]);let t=e/r*2*Math.PI;c.push([Math.cos(t)*n,Math.sin(t)*n])}return Ua(e,c,t,o,s,i,a)}function Ua(e,n,r,i,a,o,s=U(0,0,0)){let c=n.length,l=dn(r.length*c*3+(6*i.length||0)),u=dn(r.length*c*3+(i?6:0)),d=[],f=[],p=0,m=0,h=j(),g=j(),v=j(),y=j(),b=j(),x=j(),S=j(),C=j(),w=j(),T=j(),ee=j(),E=j(),te=j(),D=ce();P(w,0,1,0),L(g,r[1],r[0]),F(g,g),o?(R(C,r[0],s),F(v,C)):P(v,0,0,1),Ya(g,v,w,w,b,v,Xa),N(y,v),N(E,b);for(let e=0;e<i.length;e++)k(x,b,i[e][0]),k(C,v,i[e][2]),R(x,x,C),R(x,x,r[0]),l[p++]=x[0],l[p++]=x[1],l[p++]=x[2];u[m++]=-g[0],u[m++]=-g[1],u[m++]=-g[2];for(let e=0;e<a.length;e++)d.push(a[e][0]>0?a[e][0]:-a[e][0]-1+i.length),d.push(a[e][1]>0?a[e][1]:-a[e][1]-1+i.length),d.push(a[e][2]>0?a[e][2]:-a[e][2]-1+i.length),f.push(0),f.push(0),f.push(0);let O=i.length,ne=i.length-1;for(let e=0;e<r.length;e++){let i=!1;e>0&&(N(h,g),e<r.length-1?(L(g,r[e+1],r[e]),F(g,g)):i=!0,R(T,h,g),F(T,T),R(ee,r[e-1],y),ae(r[e],T,D),t(D,_(ee,h),C)?(L(C,C,r[e]),F(v,C),fe(b,T,v),F(b,b)):Ya(T,y,E,w,b,v,Xa),N(y,v),N(E,b)),o&&(R(C,r[e],s),F(te,C));for(let t=0;t<c;t++)if(k(x,b,n[t][0]),k(C,v,n[t][1]),R(x,x,C),F(S,x),u[m++]=S[0],u[m++]=S[1],u[m++]=S[2],R(x,x,r[e]),l[p++]=x[0],l[p++]=x[1],l[p++]=x[2],!i){let e=(t+1)%c;d.push(O+t),d.push(O+c+t),d.push(O+e),d.push(O+e),d.push(O+c+t),d.push(O+c+e);for(let e=0;e<6;e++){let t=d.length-6;f.push(d[t+e]-ne)}}O+=c}let re=r[r.length-1];for(let e=0;e<i.length;e++)k(x,b,i[e][0]),k(C,v,i[e][1]),R(x,x,C),R(x,x,re),l[p++]=x[0],l[p++]=x[1],l[p++]=x[2];let ie=m/3;u[m++]=g[0],u[m++]=g[1],u[m++]=g[2];let oe=O-c;for(let e=0;e<a.length;e++)d.push(a[e][0]>=0?O+a[e][0]:-a[e][0]-1+oe),d.push(a[e][2]>=0?O+a[e][2]:-a[e][2]-1+oe),d.push(a[e][1]>=0?O+a[e][1]:-a[e][1]-1+oe),f.push(ie),f.push(ie),f.push(ie);return new Wt(e,[[`position`,new z(l,d,3,!0)],[`normal`,new z(u,f,3,!0)]])}function Wa(e,t,n,r,i){let a=c(3*t.length),o=Array(2*(t.length-1)),s=0,l=0;for(let e=0;e<t.length;e++){for(let n=0;n<3;n++)a[s++]=t[e][n];e>0&&(o[l++]=e-1,o[l++]=e)}let u=[[`position`,new z(a,o,3,!0)]];if(n?.length===t.length&&n[0].length===3){let e=dn(3*n.length),r=0;for(let i=0;i<t.length;i++)for(let t=0;t<3;t++)e[r++]=n[i][t];u.push([`normal`,new z(e,o,3,!0)])}if(r&&u.push([`color`,new z(r,Nn(r.length/4),4)]),i?.length===t.length){let e=ta(i,1);u.push([`timeStamps`,new z(e,o,4,!0)])}return new Wt(e,u,null,2)}function Ga(e,t,n,r,i,a=0){let o=Array(18),s=[[-n,a,i/2],[r,a,i/2],[0,t+a,i/2],[-n,a,-i/2],[r,a,-i/2],[0,t+a,-i/2]],c=[0,1,2,3,0,2,2,5,3,1,4,5,5,2,1,1,0,3,3,4,1,4,3,5];for(let e=0;e<6;e++)o[3*e]=s[e][0],o[3*e+1]=s[e][1],o[3*e+2]=s[e][2];return new Wt(e,[[`position`,new z(o,c,3,!0)]])}function Ka(e,t){let n=e.getMutableAttribute(`position`).data;for(let e=0;e<n.length;e+=3){let r=n[e],i=n[e+1],a=n[e+2];P(Za,r,i,a),I(Za,Za,t),n[e]=Za[0],n[e+1]=Za[1],n[e+2]=Za[2]}}function qa(e,t=e){let n=e.attributes,r=n.get(`position`).data,i=n.get(`normal`).data;if(i){let e=t.getMutableAttribute(`normal`).data;for(let t=0;t<i.length;t+=3){let n=i[t+1];e[t+1]=-i[t+2],e[t+2]=n}}if(r){let e=t.getMutableAttribute(`position`).data;for(let t=0;t<r.length;t+=3){let n=r[t+1];e[t+1]=-r[t+2],e[t+2]=n}}}function Ja(e,t,n,r,i){return!(Math.abs(he(t,e))>i)&&(fe(n,e,t),F(n,n),fe(r,n,e),F(r,r),!0)}function Ya(e,t,n,r,i,a,o){return Ja(e,t,i,a,o)||Ja(e,n,i,a,o)||Ja(e,r,i,a,o)}var Xa=.99619469809,Za=j();function Qa(e){return e.type===`point`}var $a=class{constructor(e,t=null,n=0){this.array=e,this.spatialReference=t,this.offset=n}};function eo(e){return`array`in e}function to(e,t,n=`ground`){if(Qa(t))return e.getElevation(t.x,t.y,t.z||0,t.spatialReference,n);if(eo(t)){let r=t.offset;return e.getElevation(t.array[r++],t.array[r++],t.array[r]||0,t.spatialReference??e.spatialReference,n)}return e.getElevation(t[0],t[1],t[2]||0,e.spatialReference,n)}function no(e,t,n,r,i,a,o,s,c,l,u){let d=_o[u.mode],f,p,m=0;if(ue(e,t,n,r,c.spatialReference,i,s))return d?.requiresAlignment(u)?(m=d.applyElevationAlignmentBuffer(r,i,a,o,s,c,l,u),f=a,p=o):(f=r,p=i),ue(f,c.spatialReference,p,a,l.spatialReference,o,s)?m:void 0}function ro(e,t,n,r,i){let a=(Qa(e)?e.z:eo(e)?e.array[e.offset+2]:e[2])||0;switch(n.mode){case`on-the-ground`:{let n=to(t,e,`ground`)??0;i.verticalDistanceToGround=0,i.sampledElevation=n,i.z=n;return}case`relative-to-ground`:{let o=to(t,e,`ground`)??0,s=n.geometryZWithOffset(a,r);i.verticalDistanceToGround=s,i.sampledElevation=o,i.z=s+o;return}case`relative-to-scene`:{let o=to(t,e,`scene`)??0,s=n.geometryZWithOffset(a,r);i.verticalDistanceToGround=s,i.sampledElevation=o,i.z=s+o;return}case`absolute-height`:{let o=n.geometryZWithOffset(a,r),s=to(t,e,`ground`)??0;i.verticalDistanceToGround=o-s,i.sampledElevation=s,i.z=o;return}default:i.z=0;return}}function io(e,t,n,r){return ro(e,t,n,r,yo),yo.z}function ao(e,t,n){return t===`on-the-ground`&&n===`on-the-ground`?e.staysOnTheGround:t===n||t!==`on-the-ground`&&n!==`on-the-ground`?t==null||n==null?e.definedChanged:1:e.onTheGroundChanged}function oo(e){return e===`relative-to-ground`||e===`relative-to-scene`}function so(e){return e!==`absolute-height`}function co(e,t,n,r,i){ro(t,n,i,r,yo),lo(e,yo.verticalDistanceToGround);let a=yo.sampledElevation,o=we(vo,e.transformation);return bo[0]=t.x,bo[1]=t.y,bo[2]=yo.z,We(t.spatialReference,bo,o,r.spatialReference)?e.transformation=o:console.warn(`Could not locate symbol object properly, it might be misplaced`),a}function lo(e,t){for(let n=0;n<e.geometries.length;++n){let r=e.geometries[n].getMutableAttribute(`centerOffsetAndDistance`);r&&r.data[3]!==t&&(r.data[3]=t,e.geometryVertexAttributeUpdated(e.geometries[n],`centerOffsetAndDistance`))}}function uo(e,t,n,r,i,a){let o=0,s=a.spatialReference;t*=3,r*=3;for(let c=0;c<i;++c){let i=e[t],c=e[t+1],l=e[t+2],u=a.getElevation(i,c,l,s,`ground`)??0;o+=u,n[r]=i,n[r+1]=c,n[r+2]=u,t+=3,r+=3}return o/i}function fo(e,t,n,r,i,a,o,s){let c=0,l=s.calculateOffsetRenderUnits(o),u=s.featureExpressionInfoContext,d=a.spatialReference;t*=3,r*=3;for(let o=0;o<i;++o){let i=e[t],o=e[t+1],s=e[t+2],f=a.getElevation(i,o,s,d,`ground`)??0;c+=f,n[r]=i,n[r+1]=o,n[r+2]=u==null?s+f+l:f+l,t+=3,r+=3}return c/i}function po(e,t,n,r,i,a,o,s){let c=0,l=s.calculateOffsetRenderUnits(o),u=s.featureExpressionInfoContext,d=a.spatialReference;t*=3,r*=3;for(let o=0;o<i;++o){let i=e[t],o=e[t+1],s=e[t+2],f=a.getElevation(i,o,s,d,`scene`)??0;c+=f,n[r]=i,n[r+1]=o,n[r+2]=u==null?s+f+l:f+l,t+=3,r+=3}return c/i}function mo(e){let t=e.meterUnitOffset,n=e.featureExpressionInfoContext;return t!==0||n!=null}function ho(e,t,n,r,i,a,o,s){let c=s.calculateOffsetRenderUnits(o),l=s.featureExpressionInfoContext;t*=3,r*=3;for(let a=0;a<i;++a){let i=e[t],a=e[t+1],o=e[t+2];n[r]=i,n[r+1]=a,n[r+2]=l==null?o+c:c,t+=3,r+=3}return 0}var go=class{constructor(){this.verticalDistanceToGround=0,this.sampledElevation=0,this.z=0}},_o={"absolute-height":{applyElevationAlignmentBuffer:ho,requiresAlignment:mo},"on-the-ground":{applyElevationAlignmentBuffer:uo,requiresAlignment:()=>!0},"relative-to-ground":{applyElevationAlignmentBuffer:fo,requiresAlignment:()=>!0},"relative-to-scene":{applyElevationAlignmentBuffer:po,requiresAlignment:()=>!0}},vo=re(),yo=new go,bo=j(),xo=()=>h.getLogger(`esri.views.3d.layers.graphics.featureExpressionInfoUtils`);function So(e){return{cachedResult:e.cachedResult,arcade:e.arcade?{func:e.arcade.func,context:e.arcade.modules.arcadeUtils.createExecContext(null,{sr:e.arcade.context.spatialReference}),modules:e.arcade.modules}:null}}async function Co(e,t,n,r){let i=e?.expression;if(typeof i!=`string`)return null;let a=Ao(i);if(a!=null)return{cachedResult:a};let o=await E();Te(n);let s=o.arcadeUtils,c=s.createSyntaxTree(i);return s.dependsOnView(c)?(r?.error(`Expressions containing '$view' are not supported on ElevationInfo`),{cachedResult:0}):{arcade:{func:s.createFunction(c),context:s.createExecContext(null,{sr:t}),modules:o}}}function wo(e,t,n){return e.arcadeUtils.createFeature(t.attributes,t.geometry,n)}function To(e,t){if(e!=null&&!ko(e)){if(!t||!e.arcade)return void xo().errorOncePerTick(`Arcade support required but not provided`);let n=t;n._geometry&&=En(n._geometry),e.arcade.modules.arcadeUtils.updateExecContext(e.arcade.context,t)}}function Eo(e){if(e!=null){if(ko(e))return e.cachedResult;let t=e.arcade,n=t?.modules.arcadeUtils.executeFunction(t.func,t.context);return typeof n!=`number`&&(e.cachedResult=0,n=0),n}return 0}function Do(e,t=!1){let n=e?.featureExpressionInfo,r=n?.expression;return t||r===`0`||(n=null),n??null}var Oo={cachedResult:0};function ko(e){return e.cachedResult!=null}function Ao(e){return e===`0`?0:null}var jo=class e{constructor(){this._meterUnitOffset=0,this._renderUnitOffset=0,this._unit=`meters`,this._metersPerElevationInfoUnit=1,this._featureExpressionInfoContext=null,this.mode=null,this.centerInElevationSR=null}get featureExpressionInfoContext(){return this._featureExpressionInfoContext}get meterUnitOffset(){return this._meterUnitOffset}get unit(){return this._unit}set unit(e){this._unit=e,this._metersPerElevationInfoUnit=me(e)}get requiresSampledElevationInfo(){return this.mode!==`absolute-height`}reset(){this.mode=null,this._meterUnitOffset=0,this._renderUnitOffset=0,this._featureExpressionInfoContext=null,this.unit=`meters`}set offsetMeters(e){this._meterUnitOffset=e,this._renderUnitOffset=0}set offsetElevationInfoUnits(e){this._meterUnitOffset=e*this._metersPerElevationInfoUnit,this._renderUnitOffset=0}addOffsetRenderUnits(e){this._renderUnitOffset+=e}geometryZWithOffset(e,t){let n=this.calculateOffsetRenderUnits(t);return this.featureExpressionInfoContext==null?e+n:n}calculateOffsetRenderUnits(e){let t=this._meterUnitOffset,n=this.featureExpressionInfoContext;return n!=null&&(t+=Eo(n)*this._metersPerElevationInfoUnit),t/e.unitInMeters+this._renderUnitOffset}setFromElevationInfo(e){this.mode=e.mode,this.unit=de(e.unit)?e.unit:`meters`,this.offsetElevationInfoUnits=e.offset??0}setFeatureExpressionInfoContext(e){this._featureExpressionInfoContext=e}updateFeatureExpressionInfoContextForGraphic(e,t,n){e.arcade?(this._featureExpressionInfoContext=So(e),this.updateFeatureExpressionFeature(t,n)):this._featureExpressionInfoContext=e}updateFeatureExpressionFeature(e,t){let n=this.featureExpressionInfoContext;n?.arcade&&(n.cachedResult=void 0,To(this._featureExpressionInfoContext,e.geometry?wo(n.arcade.modules,e,t):null))}static fromElevationInfo(t){let n=new e;return t!=null&&n.setFromElevationInfo(t),n}},Mo=class extends Yt{constructor(e,t){super(e,t,Mn(Po).concat(Mn(Lo()))),this.shader=new Ut(Ur,()=>oe(()=>import(`./HUDMaterial.glsl-BsLjrxV9-BoPlQ798.js`),__vite__mapDeps([26,2,3,1,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]),import.meta.url)),this.primitiveType=t.occlusionPass?Be.POINTS:Be.TRIANGLE_STRIP}initializePipeline(e){let{oitPass:t,hasEmission:n,hasPolygonOffset:r,draped:i,output:a,depthTestEnabled:o,occlusionPass:s}=e,c=o&&!i&&t!==1&&!s&&a!==8;return wn({blending:qe(a)?Tt(t,!0):null,depthTest:o&&!i?{func:515}:null,depthWrite:c?Cn:null,drawBuffers:_t(t,n),colorWrite:Tn,polygonOffset:r?No:null})}};Mo=M([o(`esri.views.3d.webgl-engine.shaders.HUDMaterialTechnique`)],Mo);var No={factor:0,units:-4},Po=jn().vec2u8(`uv0`,{glNormalized:!0}),Fo=jn().vec3f(`position`).vec3f(`normal`).vec4i16(`uvi`).vec4u8(`color`,{glNormalized:!0}).vec2f(`size`).f32(`rotation`).vec4f(`centerOffsetAndDistance`).vec4f(`featureAttribute`),Io=Fo.clone().vec4u8(`olidColor`);function Lo(){return $t()?Io:Fo}var Z=class extends pt{constructor(e,t){super(),this.spherical=e,this.screenCenterOffsetUnitsEnabled=!1,this.useVisibilityPixel=!0,this.signedDistanceFieldEnabled=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.hasVerticalOffset=!1,this.hasScreenSizePerspective=!1,this.hasRotation=!1,this.debugDrawLabelBorder=!1,this.hasPolygonOffset=!1,this.depthTestEnabled=!0,this.pixelSnappingEnabled=!0,this.draped=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.occlusionPass=!1,this.occludedFragmentFade=!1,this.hasOcclusionTexture=!1,this.isFocused=!0,this.olidColorInstanced=!1,this.textureCoordinateType=0,this.emissionSource=0,this.discardInvisibleFragments=!0,this.hasVVInstancing=!1,this.snowCover=!1,this.transparentOccluded=t}};M([W()],Z.prototype,`transparentOccluded`,void 0),M([W()],Z.prototype,`screenCenterOffsetUnitsEnabled`,void 0),M([W()],Z.prototype,`useVisibilityPixel`,void 0),M([W()],Z.prototype,`signedDistanceFieldEnabled`,void 0),M([W()],Z.prototype,`sampleSignedDistanceFieldTexelCenter`,void 0),M([W()],Z.prototype,`hasVVSize`,void 0),M([W()],Z.prototype,`hasVVColor`,void 0),M([W()],Z.prototype,`hasVerticalOffset`,void 0),M([W()],Z.prototype,`hasScreenSizePerspective`,void 0),M([W()],Z.prototype,`hasRotation`,void 0),M([W()],Z.prototype,`debugDrawLabelBorder`,void 0),M([W()],Z.prototype,`hasPolygonOffset`,void 0),M([W()],Z.prototype,`depthTestEnabled`,void 0),M([W()],Z.prototype,`pixelSnappingEnabled`,void 0),M([W()],Z.prototype,`draped`,void 0),M([W()],Z.prototype,`terrainDepthTest`,void 0),M([W()],Z.prototype,`cullAboveTerrain`,void 0),M([W()],Z.prototype,`occlusionPass`,void 0),M([W()],Z.prototype,`occludedFragmentFade`,void 0),M([W()],Z.prototype,`hasOcclusionTexture`,void 0),M([W()],Z.prototype,`isFocused`,void 0);var Ro=class extends Dt{constructor(e,t,n=!1){super(e,as),this.produces=new Map([[14,e=>Qe(e)&&!this.parameters.drawAsLabel&&!this._configuration.transparentOccluded],[15,e=>Qe(e)&&!this.parameters.drawAsLabel&&this._configuration.transparentOccluded],[16,e=>Qe(e)&&this.parameters.drawAsLabel],[13,()=>this.parameters.useVisibilityPixel],[20,e=>this.parameters.draped&&Qe(e)]]),this._visible=!0,this._configuration=new Z(t,n)}getConfiguration(e,t){let n=this.parameters.draped;return super.getConfiguration(e,t,this._configuration),this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasVerticalOffset=!!this.parameters.verticalOffset,this._configuration.hasScreenSizePerspective=!!this.parameters.screenSizePerspective,this._configuration.screenCenterOffsetUnitsEnabled=this.parameters.centerOffsetUnits===`screen`,this._configuration.hasPolygonOffset=this.parameters.polygonOffset,this._configuration.draped=n,this._configuration.useVisibilityPixel=this.parameters.useVisibilityPixel,this._configuration.pixelSnappingEnabled=this.parameters.pixelSnappingEnabled,this._configuration.signedDistanceFieldEnabled=this.parameters.textureIsSignedDistanceField,this._configuration.sampleSignedDistanceFieldTexelCenter=this.parameters.sampleSignedDistanceFieldTexelCenter,this._configuration.hasRotation=this.parameters.hasRotation,this._configuration.hasVVSize=!!this.parameters.vvSize,this._configuration.hasVVColor=!!this.parameters.vvColor,this._configuration.occlusionPass=t.slot===13,this._configuration.occludedFragmentFade=!n&&!!this.parameters.occludedFragmentOpacity,this._configuration.isFocused=this.parameters.isFocused,this._configuration.depthTestEnabled=this.parameters.depthEnabled||t.slot===13,qe(e)&&(this._configuration.debugDrawLabelBorder=!!Rt.LABELS_SHOW_BORDER),this._configuration.terrainDepthTest=t.terrainDepthTest,this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration.hasOcclusionTexture=this._configuration.transparentOccluded&&t.oitPass!==0,this._configuration}intersect(e,t,n,r,a,o){let{options:{selectionMode:s,hud:c,excludeLabels:l},point:u,camera:d}=n,{parameters:f}=this;if(!s||!c||l&&f.isLabel||!e.visible||!u||!d)return;let m=e.attributes.get(`featureAttribute`),{scaleX:h,scaleY:g}=ss(m==null?null:Le(m.data,$o),f,d.pixelRatio),_=e.attributes.get(`position`),v=e.attributes.get(`size`),y=e.attributes.get(`normal`),b=e.attributes.get(`rotation`),x=e.attributes.get(`centerOffsetAndDistance`);On(_.size>=3);let S=Lr(f),C=this.parameters.centerOffsetUnits===`screen`;for(let e=0;e<_.data.length/_.size;e++){let r=e*_.size;P(Q,_.data[r],_.data[r+1],_.data[r+2]),I(Q,Q,t),I(Q,Q,d.viewMatrix);let a=e*x.size;if(P(Zo,x.data[a],x.data[a+1],x.data[a+2]),!C&&(Q[0]+=Zo[0],Q[1]+=Zo[1],Zo[2]!==0)){let e=Zo[2];F(Zo,Q),L(Q,Q,k(Zo,Zo,e))}let s=e*y.size;P(Wo,y.data[s],y.data[s+1],y.data[s+2]),ke(Wo,Wo,Ee(Yo,t));let{normal:c,cosAngle:l}=Vo(Wo,d,es);if(w(Q,Q,c,ls(this.parameters,Q,l,d,Uo)),d.applyProjection(Q,$),$[0]>-1){C&&(Zo[0]||Zo[1])&&($[0]+=Zo[0]*d.pixelRatio,Zo[1]!==0&&($[1]+=Uo.alignmentEvaluator.apply(Zo[1])*d.pixelRatio),d.unapplyProjection($,Q)),$[0]+=this.parameters.screenOffset[0]*d.pixelRatio,$[1]+=this.parameters.screenOffset[1]*d.pixelRatio,$[0]=Math.floor($[0]),$[1]=Math.floor($[1]);let t=e*v.size;rs[0]=v.data[t],rs[1]=v.data[t+1],Uo.evaluator.applyVec2(rs,rs);let r=ts*d.pixelRatio,a=0;f.textureIsSignedDistanceField&&(a=Math.min(f.outlineSize,.5*rs[0])*d.pixelRatio/2),rs[0]*=h,rs[1]*=g;let s=e*b.size,c=f.rotation+b.data[s];if(Ho(u,$[0],$[1],rs,r,a,c,f,S)){let e=n.ray;if(I(Ko,Q,p(Xo,d.viewMatrix)),$[0]=u[0],$[1]=u[1],d.unprojectFromRenderScreen($,Q)){let t=j();N(t,e.direction);let n=1/i(t);k(t,t,n),o(Me(e.origin,Q)*n,t,-1,Ko)}}}}}intersectDraped(e,t,n,r,i){let a=e.attributes.get(`position`),o=e.attributes.get(`size`),s=e.attributes.get(`rotation`),c=this.parameters,l=Lr(c),u=e.attributes.get(`featureAttribute`),{scaleX:d,scaleY:f}=ss(u==null?null:Le(u.data,$o),c,e.screenToWorldRatio),p=ns*e.screenToWorldRatio;for(let t=0;t<a.data.length/a.size;t++){let u=t*a.size,m=a.data[u],h=a.data[u+1],g=t*o.size;rs[0]=o.data[g],rs[1]=o.data[g+1];let _=0;c.textureIsSignedDistanceField&&(_=Math.min(c.outlineSize,.5*rs[0])*e.screenToWorldRatio/2),rs[0]*=d,rs[1]*=f;let v=t*s.size,y=c.rotation+s.data[v];Ho(n,m,h,rs,p,_,y,c,l)&&r(i.distance,i.normal,-1)}}createBufferWriter(){return new os}applyShaderOffsets(e,t,n,r,a,o,s){ke(Go,n,Ee(Yo,r));let c=Vo(Go,o,es),l=cs(i(t),o),u=ls(this.parameters,t,c.cosAngle,o,s);w(t,t,c.normal,u+l),w(e,e,Go,u+l);let d=a[3]+u;this._applyPolygonOffsetView(t,c,d,o,t),this._applyCenterOffsetView(t,a,t)}applyShaderOffsetsNDC(e,t,n,r,i){return this._applyCenterOffsetNDC(e,t,n,r),i!=null&&N(i,r),this._applyPolygonOffsetNDC(r,t,n,r),r}_applyPolygonOffsetView(e,t,n,r,i){let a=r.aboveGround?1:-1,o=Math.sign(n);o===0&&(o=a);let s=a*o;if(this.parameters.shaderPolygonOffset<=0)return N(i,e);let c=Ne(Math.abs(t.cosAngle),.01,1),l=1-Math.sqrt(1-c*c)/c/r.viewport[2];return k(i,e,s>0?l:1/l),i}_applyCenterOffsetView(e,t,n){let r=this.parameters.centerOffsetUnits!==`screen`;return n!==e&&N(n,e),r&&(n[0]+=t[0],n[1]+=t[1],t[2]&&(F(Wo,n),be(n,n,k(Wo,Wo,t[2])))),n}_applyCenterOffsetNDC(e,t,n,r){let i=this.parameters.centerOffsetUnits!==`screen`;return r!==e&&N(r,e),i||(r[0]+=t[0]/n.fullWidth*2,r[1]+=t[1]/n.fullHeight*2),r}_applyPolygonOffsetNDC(e,t,n,r){let i=this.parameters.shaderPolygonOffset;if(e!==r&&N(r,e),i){let e=n.aboveGround?1:-1,a=e*Math.sign(t[3]);r[2]-=(a||e)*i}return r}set visible(e){this._visible=e}get visible(){let{color:e,outlineSize:t,outlineColor:n}=this.parameters,r=e[3]>=.003913894324853229||t>=.003913894324853229&&n[3]>=.003913894324853229;return this._visible&&r}createGLMaterial(e){return new zo(e)}calculateRelativeScreenBounds(e,t,n=ie()){return Bo(this.parameters,e,t,n),n[2]=n[0]+e[0],n[3]=n[1]+e[1],n}},zo=class extends ft{constructor(e){super({...e,...e.material.parameters})}beginSlot(e){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.getTechnique(Mo,e)}};function Bo(e,t,n,r){r[0]=e.anchorPosition[0]*-t[0]+e.screenOffset[0]*n,r[1]=e.anchorPosition[1]*-t[1]+e.screenOffset[1]*n}function Vo(e,t,n){return I(n.normal,e,t.viewInverseTransposeMatrix),n.cosAngle=he(n.normal,is),n}function Ho(e,t,n,r,i,a,o,s,c){let l=t-i-r[0]*c[0],u=l+r[0]+2*i,d=n-i-r[1]*c[1],f=d+r[1]+2*i,p=s.distanceFieldBoundingBox;return s.textureIsSignedDistanceField&&p!=null&&(l+=r[0]*p[0],d+=r[1]*p[1],u-=r[0]*(1-p[2]),f-=r[1]*(1-p[3]),l-=a,u+=a,d-=a,f+=a),ye(Jo,t,n),S(qo,e,Jo,Ie(o)),qo[0]>l&&qo[0]<u&&qo[1]>d&&qo[1]<f}var Uo=new hn,Q=j(),Wo=j(),$=_e(),Go=j(),Ko=j(),qo=xe(),Jo=xe(),Yo=Ae(),Xo=re(),Zo=j(),Qo=j(),$o=_e(),es={normal:j(),cosAngle:0},ts=1,ns=2,rs=ge(0,0),is=m(0,0,1),as=class extends kt{constructor(){super(...arguments),this.renderOccluded=1,this.testsTransparentRenderOrder=0,this.isDecoration=!1,this.color=je(1,1,1,1),this.polygonOffset=!1,this.anchorPosition=ge(.5,.5),this.screenOffset=[0,0],this.shaderPolygonOffset=1e-5,this.textureIsSignedDistanceField=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.outlineColor=je(1,1,1,1),this.outlineSize=0,this.distanceFieldBoundingBox=_e(),this.rotation=0,this.hasRotation=!1,this.vvSizeEnabled=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.hasSlicePlane=!1,this.pixelSnappingEnabled=!0,this.useVisibilityPixel=!0,this.occludedVisibilityMode=`hidden`,this.centerOffsetUnits=`world`,this.drawAsLabel=!1,this.depthEnabled=!0,this.isFocused=!0,this.draped=!1,this.isLabel=!1}get hasVVSize(){return!!this.vvSize}get hasVVColor(){return!!this.vvColor}get hasVVOpacity(){return!!this.vvOpacity}},os=class{constructor(){this.layout=Lo(),this.baseInstanceLayout=Po}elementCount(e){return e.get(`position`).indices.length}elementCountBaseInstance(e){return e.get(`uv0`).indices.length}write(e,t,n,r,i,a){let{position:o,normal:s,color:c,size:l,rotation:u,centerOffsetAndDistance:d,featureAttribute:f,uvi:p}=i;pn(n.get(`position`),e,o,a),St(n.get(`normal`),t,s,a);let m=n.get(`position`).indices.length,h=0,g=0,_=Vr,v=Vr,y=n.get(`uvi`)?.data;y&&y.length>=4&&(h=y[0],g=y[1],_=y[2],v=y[3]);for(let e=0;e<m;++e){let t=a+e;p.setValues(t,h,g,_,v)}if(nn(n.get(`color`),4,c,a),ot(n.get(`size`),l,a),zt(n.get(`rotation`),u,a),n.get(`centerOffsetAndDistance`)?Jt(n.get(`centerOffsetAndDistance`),d,a):Qt(d,a,m),n.get(`featureAttribute`)?Jt(n.get(`featureAttribute`),f,a):Qt(f,a,m),r!=null){let e=n.get(`position`)?.indices;if(e){let t=e.length;it(r,i.getField(`olidColor`,An),t,a)}}return{numVerticesPerItem:1,numItems:m}}writeBaseInstance(e,t){let{uv0:n}=t;ot(e.get(`uv0`),n,0)}};function ss(e,t,n){return e==null||t.vvSize==null?{scaleX:n,scaleY:n}:(un(Qo,t,e),{scaleX:Qo[0]*n,scaleY:Qo[1]*n})}function cs(e,t){let n=t.computeRenderPixelSizeAtDist(e)*Ar;return(t.aboveGround?1:-1)*n}function ls(e,t,n,r,a){if(!e.verticalOffset?.screenLength){let r=i(t);return a.update(n,r,e.screenSizePerspective,e.screenSizePerspectiveMinPixelReferenceSize,e.screenSizePerspectiveAlignment,null),0}let o=i(t),s=e.screenSizePerspectiveAlignment??e.screenSizePerspective,c=wt(r,o,e.verticalOffset,n,s,e.screenSizePerspectiveMinPixelReferenceSize);return a.update(n,o,e.screenSizePerspective,e.screenSizePerspectiveMinPixelReferenceSize,e.screenSizePerspectiveAlignment,null),c}export{Bn as $,io as A,ci as B,to as C,ao as D,oo as E,Ro as F,Nr as G,Lr as H,qa as I,Or as J,Mr as K,Ga as L,Wr as M,qr as N,$a as O,ro as P,or as Q,co as R,si as S,no as T,Fr as U,lo as V,Vr as W,Dr as X,pr as Y,fr as Z,Ba as _,Fa as a,Ln as at,so as b,Ra as c,Co as d,Wn as et,Hi as f,Pa as g,ha as h,pi as i,ar as it,Ka as j,Xr as k,Ia as l,go as m,ba as n,zn as nt,Do as o,Vn as ot,Ha as p,jr as q,jo as r,Hn as rt,Ri as s,Ua as t,Un as tt,Oo as u,Vi as v,Wa as w,Ya as x,Va as y,ai as z};