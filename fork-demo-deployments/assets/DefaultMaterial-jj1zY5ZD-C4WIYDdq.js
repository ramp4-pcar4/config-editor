const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./SSAOBlur.glsl-BTh5NKLE-DM9kQYDE.js","./FloatArray-CCh0HzKA--k3dBsyW.js","./main-B1TNKY4t.js","./main-B9u8RD3p.css","./BufferView-CaQh6oW7-B_VDFHn5.js","./Camera-C6ZYw0bi-C0uQ3X2_.js","./Cyclical-BjJNcAOg-tltRd7GG.js","./enums-cvV1PmS2-BsxoWakL.js","./Emissions.glsl-BNo-_bKx-DBo2FP_u.js","./glsl-BgsHvHfn-CIx088aE.js","./HUDIntersectorResult-C0pNXxO1-CPykq28N.js","./Indices-D5qpZcs5-CmTGFA5H.js","./VertexAttributeLocations-D2hs-LKp-DaOAs1Fw.js","./VertexElementDescriptor-Dnz2rXn2-BXdFiJz_.js","./computeTranslationToOriginAndRotation-Cb8-ziPp-WtvYZQV4.js","./frustum-BstsxTJu-DaogKoLM.js","./image-CiG47ANU-Dk8EEsjf.js","./normalizeUtils-K0wQEAxX-BJbKg6dc.js","./normalizeUtilsCommon-DHgomPS0-BV1RvPll.js","./utils-BaQh2ebF-CEvGEfZU.js","./utils-D0-60cws-B9zpwua0.js","./orientedBoundingBox-lwWeAO-o-BIJye_HT.js","./quat-CRVOUtT3-BrEhHRxN.js","./renderState-Czn0_0yu-De_eC1UE.js","./videoUtils-KSo3pCAl-Dt7OMdf_.js","./ShaderBuilder-Dy-kUWY5-CiPIRO_O.js","./SSAO.glsl-B4NeVtCM-DbcX-6gj.js","./DefaultMaterial.glsl-Bi-z-FG8-B3dqTAyd.js","./RealisticTree.glsl-D9cSq_IA-DWtfP_Wv.js"])))=>i.map(i=>d[i]);
import{$D as e,$_ as t,BS as n,B_ as r,Bc as i,Cc as a,DS as o,Ds as s,ES as c,FD as l,H_ as u,IS as d,IT as f,Jb as p,K_ as m,Ms as h,Nc as g,Nk as ee,OS as _,Oc as v,QE as y,Rs as b,Sc as te,UA as ne,Vc as re,X_ as ie,ZA as ae,ZO as oe,dC as se,eO as x,hD as ce,ms as le,nD as ue,pc as de,qs as S,tv as fe,vc as pe,vd as me,wS as C,ws as he,zc as ge}from"./main-B1TNKY4t.js";import{d as _e}from"./enums-cvV1PmS2-BsxoWakL.js";import{a as ve,o as ye}from"./Camera-C6ZYw0bi-C0uQ3X2_.js";import{t as be}from"./VertexBuffer-C6C7NE2b-DB3QGS-y.js";import{t as w}from"./ShaderBuilder-Dy-kUWY5-CiPIRO_O.js";import{n as T,t as E}from"./glsl-BgsHvHfn-CIx088aE.js";import{_ as D,b as xe,c as O,g as k,h as Se,i as Ce,m as A,r as j,t as we,u as Te,v as Ee,y as De}from"./Emissions.glsl-BNo-_bKx-DBo2FP_u.js";import{$ as Oe,$t as ke,Bt as Ae,Ct as je,Dn as Me,Dt as M,E as Ne,Et as Pe,Ft as N,Gt as P,Ht as Fe,I as Ie,It as Le,J as Re,K as ze,Lt as Be,M as Ve,Mt as He,Nt as Ue,On as We,Pt as Ge,Q as F,Qt as Ke,R as qe,Rt as Je,St as Ye,Tn as Xe,Tt as Ze,U as Qe,Ut as $e,V as et,Vt as tt,Wt as nt,X as rt,Xt as I,Y as it,Z as at,Zt as L,_n as ot,ct as st,dt as ct,en as lt,et as ut,ft as dt,g as ft,gn as pt,ht as mt,in as ht,j as gt,jt as _t,k as vt,mt as yt,nn as R,nt as bt,ot as xt,pt as St,q as Ct,qt as wt,rn as z,rt as Tt,tn as Et,vn as B,vt as Dt,wn as V,xn as Ot,yn as H,z as kt,zt as At}from"./FloatArray-CCh0HzKA--k3dBsyW.js";import{i as jt,r as Mt,u as Nt}from"./renderState-Czn0_0yu-De_eC1UE.js";import{X as U,a as Pt,o as Ft,v as W}from"./BufferView-CaQh6oW7-B_VDFHn5.js";import{i as It,t as Lt}from"./InterleavedLayout-BhgcrY-S-CE8XVfSk.js";var Rt=3e5,zt=5e5;function Bt(e,t){let n=t.lightingSphericalHarmonicsOrder===void 0?2:t.lightingSphericalHarmonicsOrder;n===0?(e.uniforms.add(new L(`lightingAmbientSH0`,({lighting:e})=>v(Vt,e.sh.r[0],e.sh.g[0],e.sh.b[0]))),e.code.add(E`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
return ambientLight * (1.0 - ambientOcclusion);
}`)):n===1?(e.uniforms.add(new F(`lightingAmbientSH_R`,({lighting:e})=>S(G,e.sh.r[0],e.sh.r[1],e.sh.r[2],e.sh.r[3])),new F(`lightingAmbientSH_G`,({lighting:e})=>S(G,e.sh.g[0],e.sh.g[1],e.sh.g[2],e.sh.g[3])),new F(`lightingAmbientSH_B`,({lighting:e})=>S(G,e.sh.b[0],e.sh.b[1],e.sh.b[2],e.sh.b[3]))),e.code.add(E`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec4 sh0 = vec4(
0.282095,
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y
);
vec3 ambientLight = vec3(
dot(lightingAmbientSH_R, sh0),
dot(lightingAmbientSH_G, sh0),
dot(lightingAmbientSH_B, sh0)
);
return ambientLight * (1.0 - ambientOcclusion);
}`)):n===2&&(e.uniforms.add(new L(`lightingAmbientSH0`,({lighting:e})=>v(Vt,e.sh.r[0],e.sh.g[0],e.sh.b[0])),new F(`lightingAmbientSH_R1`,({lighting:e})=>S(G,e.sh.r[1],e.sh.r[2],e.sh.r[3],e.sh.r[4])),new F(`lightingAmbientSH_G1`,({lighting:e})=>S(G,e.sh.g[1],e.sh.g[2],e.sh.g[3],e.sh.g[4])),new F(`lightingAmbientSH_B1`,({lighting:e})=>S(G,e.sh.b[1],e.sh.b[2],e.sh.b[3],e.sh.b[4])),new F(`lightingAmbientSH_R2`,({lighting:e})=>S(G,e.sh.r[5],e.sh.r[6],e.sh.r[7],e.sh.r[8])),new F(`lightingAmbientSH_G2`,({lighting:e})=>S(G,e.sh.g[5],e.sh.g[6],e.sh.g[7],e.sh.g[8])),new F(`lightingAmbientSH_B2`,({lighting:e})=>S(G,e.sh.b[5],e.sh.b[6],e.sh.b[7],e.sh.b[8]))),e.code.add(E`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight * (1.0 - ambientOcclusion);
}`),t.pbrMode!==1&&t.pbrMode!==2||e.code.add(E`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance(float ambientOcclusion)
{
vec3 ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2;
return ambientLight *= (1.0 - ambientOcclusion) * skyTransmittance;
}`))}var Vt=m(),G=he();function K(e){e.uniforms.add(new L(`mainLightDirection`,e=>e.lighting.mainLight.direction))}function q(e){e.uniforms.add(new L(`mainLightIntensity`,e=>e.lighting.mainLight.intensity))}function Ht(e){K(e),q(e),e.code.add(E`vec3 applyShading(vec3 shadingNormal, float shadow) {
float dotVal = clamp(dot(shadingNormal, mainLightDirection), 0.0, 1.0);
return mainLightIntensity * ((1.0 - shadow) * dotVal);
}`)}function Ut(e){e.code.add(E`vec3 evaluateDiffuseIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float NdotNG) {
return ((1.0 - NdotNG) * ambientGround + (1.0 + NdotNG) * ambientSky) * 0.5;
}`),e.code.add(E`float integratedRadiance(float cosTheta2, float roughness) {
return (cosTheta2 - 1.0) / (cosTheta2 * (1.0 - roughness * roughness) - 1.0);
}`),e.code.add(E`vec3 evaluateSpecularIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float RdotNG, float roughness) {
float cosTheta2 = 1.0 - RdotNG * RdotNG;
float intRadTheta = integratedRadiance(cosTheta2, roughness);
float ground = RdotNG < 0.0 ? 1.0 - intRadTheta : 1.0 + intRadTheta;
float sky = 2.0 - ground;
return (ground * ambientGround + sky * ambientSky) * 0.5;
}`)}function Wt(e,t){e.include(ut),t.pbrMode!==1&&t.pbrMode!==2&&t.pbrMode!==5&&t.pbrMode!==6||(e.code.add(E`float normalDistribution(float NdotH, float roughness)
{
float a = NdotH * roughness;
float b = roughness / (1.0 - NdotH * NdotH + a * a);
return b * b * INV_PI;
}`),e.code.add(E`const vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022);
const vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040);
const vec2 c2 = vec2(-1.04, 1.04);
vec2 prefilteredDFGAnalytical(float roughness, float NdotV) {
vec4 r = roughness * c0 + c1;
float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * r.x + r.y;
return c2 * a004 + r.zw;
}`)),t.pbrMode!==1&&t.pbrMode!==2||(e.include(Ut),e.code.add(E`struct PBRShadingInfo
{
float NdotV;
float LdotH;
float NdotNG;
float RdotNG;
float NdotAmbDir;
float NdotH_Horizon;
vec3 skyRadianceToSurface;
vec3 groundRadianceToSurface;
vec3 skyIrradianceToSurface;
vec3 groundIrradianceToSurface;
float averageAmbientRadiance;
float ssao;
vec3 albedoLinear;
vec3 f0;
vec3 f90;
vec3 diffuseColor;
float metalness;
float roughness;
};`),e.code.add(E`vec3 evaluateEnvironmentIllumination(PBRShadingInfo inputs) {
vec3 indirectDiffuse = evaluateDiffuseIlluminationHemisphere(inputs.groundIrradianceToSurface, inputs.skyIrradianceToSurface, inputs.NdotNG);
vec3 indirectSpecular = evaluateSpecularIlluminationHemisphere(inputs.groundRadianceToSurface, inputs.skyRadianceToSurface, inputs.RdotNG, inputs.roughness);
vec3 diffuseComponent = inputs.diffuseColor * indirectDiffuse * INV_PI;
vec2 dfg = prefilteredDFGAnalytical(inputs.roughness, inputs.NdotV);
vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;
vec3 specularComponent = specularColor * indirectSpecular;
return (diffuseComponent + specularComponent);
}`))}function Gt(e,t){e.include(ut),e.code.add(E`
    struct PBRShadingWater {
        float NdotL;   // cos angle between normal and light direction
        float NdotV;   // cos angle between normal and view direction
        float NdotH;   // cos angle between normal and half vector
        float VdotH;   // cos angle between view direction and half vector
        float LdotH;   // cos angle between light direction and half vector
        float VdotN;   // cos angle between view direction and normal vector
    };

    float dtrExponent = ${t.useCustomDTRExponentForWater?`2.2`:`2.0`};
  `),e.code.add(E`vec3 fresnelReflection(float angle, vec3 f0, float f90) {
return f0 + (f90 - f0) * pow(1.0 - angle, 5.0);
}`),e.code.add(E`float normalDistributionWater(float NdotH, float roughness) {
float r2 = roughness * roughness;
float NdotH2 = NdotH * NdotH;
float denom = pow((NdotH2 * (r2 - 1.0) + 1.0), dtrExponent) * PI;
return r2 / denom;
}`),e.code.add(E`float geometricOcclusionKelemen(float LoH) {
return 0.25 / (LoH * LoH);
}`),e.code.add(E`vec3 brdfSpecularWater(in PBRShadingWater props, float roughness, vec3 F0, float F0Max) {
vec3  F = fresnelReflection(props.VdotH, F0, F0Max);
float dSun = normalDistributionWater(props.NdotH, roughness);
float V = geometricOcclusionKelemen(props.LdotH);
float diffusionSunHaze = mix(roughness + 0.045, roughness + 0.385, 1.0 - props.VdotH);
float strengthSunHaze  = 1.2;
float dSunHaze = normalDistributionWater(props.NdotH, diffusionSunHaze) * strengthSunHaze;
return ((dSun + dSunHaze) * V) * F;
}`)}function Kt(e){e.code.add(E`vec3 tonemapACES(vec3 x) {
return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}`),e.code.add(E`vec3 tonemapKhronosNeutral(vec3 color, float exposure) {
const float startCompression = 0.76;
const float desaturation = 0.15;
color *= exposure;
float x = min( color.r, min( color.g, color.b ) );
float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
color -= offset;
float peak = max( color.r, max( color.g, color.b ) );
if ( peak < startCompression ) {
return color;
}
float d = 1.0 - startCompression;
float newPeak = 1.0 - d * d / ( peak + d - startCompression );
color *= newPeak / peak;
float g = 1.0 - 1.0 / ( desaturation * ( peak - newPeak ) + 1.0 );
return mix( color, vec3( newPeak ), g );
}`)}function qt(e,t){let n=O(t.output)&&t.receiveShadows;n&&Le(e,!0),e.vertex.code.add(E`
    void forwardLinearDepthToReadShadowMap() { ${T(n,`forwardLinearDepth(gl_Position.w);`)} }
  `)}var Jt=class extends De{constructor(e,t,n,r){super(e,`mat4`,2,(n,i,a,o)=>n.setUniformMatrices4fv(e,t(i,a,o),r),n)}},Yt=class extends De{constructor(e,t,n,r){super(e,`mat4`,1,(n,i,a)=>n.setUniformMatrices4fv(e,t(i,a),r),n)}};function Xt(e){e.fragment.uniforms.add(new Yt(`shadowMapMatrix`,(e,t)=>t.shadowMap.getShadowMapMatrices(e.origin),4)),Qt(e)}function Zt(e){e.fragment.uniforms.add(new Jt(`shadowMapMatrix`,(e,t)=>t.shadowMap.getShadowMapMatrices(e.origin),4)),Qt(e)}function Qt(e){let{fragment:t}=e;t.uniforms.add(new F(`cascadeDistances`,e=>e.shadowMap.cascadeDistances),new Xe(`numCascades`,e=>e.shadowMap.numCascades)),t.code.add(E`const vec3 invalidShadowmapUVZ = vec3(0.0, 0.0, -1.0);
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, ivec2 textureSize, vec3 lvpos) {
float xScale = float(textureSize.y) / float(textureSize.x);
return vec2((float(i) + lvpos.x) * xScale, lvpos.y);
}
vec3 calculateUVZShadow(in vec3 _worldPos, in float _linearDepth, in ivec2 shadowMapSize) {
int i = _linearDepth < cascadeDistances[1] ? 0 : _linearDepth < cascadeDistances[2] ? 1 : _linearDepth < cascadeDistances[3] ? 2 : 3;
if (i >= numCascades) {
return invalidShadowmapUVZ;
}
mat4 shadowMatrix = i == 0 ? shadowMapMatrix[0] : i == 1 ? shadowMapMatrix[1] : i == 2 ? shadowMapMatrix[2] : shadowMapMatrix[3];
vec3 lvpos = lightSpacePosition(_worldPos, shadowMatrix);
if (lvpos.z >= 1.0 || lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) {
return invalidShadowmapUVZ;
}
vec2 uvShadow = cascadeCoordinates(i, shadowMapSize, lvpos);
return vec3(uvShadow, lvpos.z);
}`)}function $t(e){e.fragment.code.add(E`float readShadowMapUVZ(vec3 uvzShadow, sampler2DShadow _shadowMap) {
return texture(_shadowMap, uvzShadow);
}`)}var en=class extends De{constructor(e,t){super(e,`sampler2DShadow`,0,(n,r)=>n.bindTexture(e,t(r)))}};function tn(e,t){t.receiveShadows&&e.include(Xt),rn(e,t)}function nn(e,t){t.receiveShadows&&e.include(Zt),rn(e,t)}function rn(e,t){e.fragment.uniforms.add(new I(`lightingGlobalFactor`,e=>e.lighting.globalFactor));let{receiveShadows:n,spherical:r}=t;e.include(qt,t),n&&an(e),e.fragment.code.add(E`
    float readShadow(float additionalAmbientScale, vec3 vpos) {
      return ${n?`max(lightingGlobalFactor * (1.0 - additionalAmbientScale), readShadowMap(vpos, linearDepth))`:T(r,`lightingGlobalFactor * (1.0 - additionalAmbientScale)`,`0.0`)};
    }
  `)}function an(e){e.include($t),e.fragment.uniforms.add(new en(`shadowMap`,({shadowMap:e})=>e.depthTexture)).code.add(E`float readShadowMap(const in vec3 _worldPos, float _linearDepth) {
vec3 uvzShadow = calculateUVZShadow(_worldPos, _linearDepth, textureSize(shadowMap,0));
if (uvzShadow.z < 0.0) {
return 0.0;
}
return readShadowMapUVZ(uvzShadow, shadowMap);
}`)}var on=16;function sn(){let e=new w,t=e.fragment;return e.include(_t),e.include(at),t.include(Fe),t.include(xe),t.uniforms.add(new I(`radius`,e=>cn(e.camera))).code.add(E`vec3 sphere[16] = vec3[16](
vec3(0.186937, 0.0, 0.0),
vec3(0.700542, 0.0, 0.0),
vec3(-0.864858, -0.481795, -0.111713),
vec3(-0.624773, 0.102853, -0.730153),
vec3(-0.387172, 0.260319, 0.007229),
vec3(-0.222367, -0.642631, -0.707697),
vec3(-0.01336, -0.014956, 0.169662),
vec3(0.122575, 0.1544, -0.456944),
vec3(-0.177141, 0.85997, -0.42346),
vec3(-0.131631, 0.814545, 0.524355),
vec3(-0.779469, 0.007991, 0.624833),
vec3(0.308092, 0.209288,0.35969),
vec3(0.359331, -0.184533, -0.377458),
vec3(0.192633, -0.482999, -0.065284),
vec3(0.233538, 0.293706, -0.055139),
vec3(0.417709, -0.386701, 0.442449)
);
float fallOffFunction(float vv, float vn, float bias) {
float f = max(radius * radius - vv, 0.0);
return f * f * f * max(vn - bias, 0.0);
}`),t.code.add(E`float aoValueFromPositionsAndNormal(vec3 C, vec3 n_C, vec3 Q) {
vec3 v = Q - C;
float vv = dot(v, v);
float vn = dot(normalize(v), n_C);
return fallOffFunction(vv, vn, 0.1);
}`),e.outputs.add(`fragOcclusion`,`float`),t.uniforms.add(new A(`normalMap`,e=>e.normalTexture),new A(`depthMap`,e=>e.depthTexture),new k(`projScale`,e=>e.projScale),new A(`rnm`,e=>e.noiseTexture),new rt(`rnmScale`,(e,t)=>se(ln,t.camera.fullWidth/e.noiseTexture.descriptor.width,t.camera.fullHeight/e.noiseTexture.descriptor.height)),new k(`intensity`,e=>e.intensity),new $e(`screenSize`,e=>se(ln,e.camera.fullWidth,e.camera.fullHeight))).main.add(E`
    float depth = depthFromTexture(depthMap, uv);

    // Early out if depth is out of range, such as in the sky
    if (depth >= 1.0 || depth <= 0.0) {
      fragOcclusion = 1.0;
      return;
    }

    // get the normal of current fragment
    ivec2 iuv = ivec2(uv * vec2(textureSize(normalMap, 0)));
    vec4 norm4 = texelFetch(normalMap, iuv, 0);
    if(norm4.a != 1.0) {
      fragOcclusion = 1.0;
      return;
    }
    vec3 norm = normalize(norm4.xyz * 2.0 - 1.0);

    float currentPixelDepth = linearizeDepth(depth);
    vec3 currentPixelPos = reconstructPosition(gl_FragCoord.xy, currentPixelDepth);

    float sum = 0.0;
    vec3 tapPixelPos;

    vec3 fres = normalize(2.0 * texture(rnm, uv * rnmScale).xyz - 1.0);

    // note: the factor 2.0 should not be necessary, but makes ssao much nicer.
    // bug or deviation from CE somewhere else?
    float ps = projScale / (2.0 * currentPixelPos.z * zScale.x + zScale.y);

    for(int i = 0; i < ${E.int(on)}; ++i) {
      vec2 unitOffset = reflect(sphere[i], fres).xy;
      vec2 offset = vec2(-unitOffset * radius * ps);

      // don't use current or very nearby samples
      if( abs(offset.x) < 2.0 || abs(offset.y) < 2.0){
        continue;
      }

      vec2 tc = vec2(gl_FragCoord.xy + offset);
      if (tc.x < 0.0 || tc.y < 0.0 || tc.x > screenSize.x || tc.y > screenSize.y) continue;
      vec2 tcTap = tc / screenSize;
      float occluderFragmentDepth = linearDepthFromTexture(depthMap, tcTap);

      tapPixelPos = reconstructPosition(tc, occluderFragmentDepth);

      sum += aoValueFromPositionsAndNormal(currentPixelPos, norm, tapPixelPos);
    }

    // output the result
    float A = max(1.0 - sum * intensity / float(${E.int(on)}), 0.0);

    // Anti-tone map to reduce contrast and drag dark region farther: (x^0.2 + 1.2 * x^4) / 2.2
    A = (pow(A, 0.2) + 1.2 * pow(A, 4.0)) * INV_GAMMA;

    fragOcclusion = A;
  `),e}function cn(e){return Math.max(10,20*e.computeScreenPixelSizeAtDist(Math.abs(4*e.relativeElevation)))}var ln=h(),un=Object.freeze(Object.defineProperty({__proto__:null,build:sn,getRadius:cn},Symbol.toStringTag,{value:`Module`})),dn=4;function fn(){let e=new w,t=e.fragment;e.include(_t);let n=(dn+1)/2,r=1/(2*n*n);return t.include(Fe),t.uniforms.add(new A(`depthMap`,e=>e.depthTexture),new Se(`tex`,e=>e.colorTexture),new it(`blurSize`,e=>e.blurSize),new k(`projScale`,(e,t)=>{let n=t.camera.distance;return n>5e4?Math.max(0,e.projScale-(n-5e4)):e.projScale})),t.code.add(E`
    void blurFunction(vec2 uv, float r, float center_d, float sharpness, inout float wTotal, inout float bTotal) {
      float c = texture(tex, uv).r;
      float d = linearDepthFromTexture(depthMap, uv);

      float ddiff = d - center_d;

      float w = exp(-r * r * ${E.float(r)} - ddiff * ddiff * sharpness);
      wTotal += w;
      bTotal += w * c;
    }
  `),e.outputs.add(`fragBlur`,`float`),t.main.add(E`
    float b = 0.0;
    float w_total = 0.0;

    float center_d = linearDepthFromTexture(depthMap, uv);

    float sharpness = -0.05 * projScale / center_d;
    for (int r = -${E.int(dn)}; r <= ${E.int(dn)}; ++r) {
      float rf = float(r);
      vec2 uvOffset = uv + rf * blurSize;
      blurFunction(uvOffset, rf, center_d, sharpness, w_total, b);
    }
    fragBlur = b / w_total;`),e}var pn=Object.freeze(Object.defineProperty({__proto__:null,build:fn},Symbol.toStringTag,{value:`Module`}));function mn({normalTexture:e,metallicRoughnessTexture:t,metallicFactor:n,roughnessFactor:r,emissiveTexture:i,emissiveFactor:o,occlusionTexture:s}){return e==null&&t==null&&i==null&&(o==null||a(o,fe))&&s==null&&(r==null||r===1)&&(n==null||n===1)}var hn=t(1,1,.5),gn=t(0,.6,.2),_n=t(0,1,.2);function vn(e,t){switch(t.output){case 3:case 4:case 5:case 6:e.fragment.code.add(E`float _calculateFragDepth(const in float depth) {
const float SLOPE_SCALE = 2.0;
const float BIAS = 20.0 * .000015259;
float m = max(abs(dFdx(depth)), abs(dFdy(depth)));
return depth + SLOPE_SCALE * m + BIAS;
}
void outputDepth(float _linearDepth){
float fragDepth = _calculateFragDepth(_linearDepth);
gl_FragDepth = fragDepth;
}`);break;case 7:e.fragment.code.add(E`void outputDepth(float _linearDepth){
gl_FragDepth = _linearDepth;
}`)}}var yn=class extends dt{constructor(){super(...arguments),this.shader=new st(pn,()=>y(()=>import(`./SSAOBlur.glsl-BTh5NKLE-DM9kQYDE.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]),import.meta.url))}initializePipeline(){return Mt({colorWrite:Nt})}};yn=f([x(`esri.views.3d.webgl-engine.effects.ssao.SSAOBlurTechnique`)],yn);var bn=`eXKEvZaUc66cjIKElE1jlJ6MjJ6Ufkl+jn2fcXp5jBx7c6KEflSGiXuXeW6OWs+tfqZ2Yot2Y7Zzfo2BhniEj3xoiXuXj4eGZpqEaHKDWjSMe7palFlzc3BziYOGlFVzg6Zzg7CUY5JrjFF7eYJ4jIKEcyyEonSXe7qUfqZ7j3xofqZ2c4R5lFZ5Y0WUbppoe1l2cIh2ezyUho+BcHN2cG6DbpqJhqp2e1GcezhrdldzjFGUcyxjc3aRjDyEc1h7Sl17c6aMjH92pb6Mjpd4dnqBjMOEhqZleIOBYzB7gYx+fnqGjJuEkWlwnCx7fGl+c4hjfGyRe5qMlNOMfnqGhIWHc6OMi4GDc6aMfqZuc6aMzqJzlKZ+lJ6Me3qRfoFue0WUhoR5UraEa6qMkXiPjMOMlJOGe7JrUqKMjK6MeYRzdod+Sl17boiPc6qEeYBlcIh2c1WEe7GDiWCDa0WMjEmMdod+Y0WcdntzhmN8WjyMjKJjiXtzgYxYaGd+a89zlEV7e2GJfnd+lF1rcK5zc4p5cHuBhL6EcXp5eYB7fnh8iX6HjIKEeaxuiYOGc66RfG2Ja5hzjlGMjEmMe9OEgXuPfHyGhPeEdl6JY02McGuMfnqGhFiMa3WJfnx2l4hwcG1uhmN8c0WMc39og1GBbrCEjE2EZY+JcIh2cIuGhIWHe0mEhIVrc09+gY5+eYBlnCyMhGCDl3drfmmMgX15aGd+gYx+fnuRfnhzY1SMsluJfnd+hm98WtNrcIuGh4SEj0qPdkqOjFF7jNNjdnqBgaqUjMt7boeBhnZ4jDR7c5pze4GGjEFrhLqMjHyMc0mUhKZze4WEa117kWlwbpqJjHZ2eX2Bc09zeId+e0V7WlF7jHJ2l72BfId8l3eBgXyBe897jGl7c66cgW+Xc76EjKNbgaSEjGx4fId8jFFjgZB8cG6DhlFziZhrcIh2fH6HgUqBgXiPY8dahGFzjEmMhEFre2dxhoBzc5SGfleGe6alc7aUeYBlhKqUdlp+cH5za4OEczxza0Gcc4J2jHZ5iXuXjH2Jh5yRjH2JcFx+hImBjH+MpddCl3dreZeJjIt8ZW18bm1zjoSEeIOBlF9oh3N7hlqBY4+UeYFwhLJjeYFwaGd+gUqBYxiEYot2fqZ2ondzhL6EYyiEY02Ea0VjgZB8doaGjHxoc66cjEGEiXuXiXWMiZhreHx8frGMe75rY02Ec5pzfnhzlEp4a3VzjM+EhFFza3mUY7Zza1V5e2iMfGyRcziEhDyEkXZ2Y4OBnCx7g5t2eyBjgV6EhEFrcIh2dod+c4Z+nJ5zjm15jEmUeYxijJp7nL6clIpjhoR5WrZraGd+fnuRa6pzlIiMg6ZzfHx5foh+eX1ufnB5eX1ufnB5aJt7UqKMjIh+e3aBfm5lbYSBhGFze6J4c39oc0mUc4Z+e0V7fKFVe0WEdoaGY02Ec4Z+Y02EZYWBfH6HgU1+gY5+hIWUgW+XjJ57ebWRhFVScHuBfJ6PhBx7WqJzlM+Ujpd4gHZziX6HjHmEgZN+lJt5boiPe2GJgX+GjIGJgHZzeaxufnB5hF2JtdN7jJ57hp57hK6ElFVzg6ZzbmiEbndzhIWHe3uJfoFue3qRhJd2j3xoc65zlE1jc3p8lE1jhniEgXJ7e657vZaUc3qBh52BhIF4aHKDa9drgY5+c52GWqZzbpqJe8tjnM+UhIeMfo2BfGl+hG1zSmmMjKJjZVaGgX15c1lze0mEp4OHa3mUhIWHhDyclJ6MeYOJkXiPc0VzhFiMlKaEboSJa5Jze41re3qRhn+HZYWBe0mEc4p5fnORbox5lEp4hGFjhGGEjJuEc1WEhLZjeHeGa7KlfHx2hLaMeX1ugY5+hIWHhKGPjMN7c1WEho1zhoBzZYx7fnhzlJt5exyUhFFziXtzfmmMa6qMYyiEiXxweV12kZSMeWqXSl17fnhzxmmMrVGEe1mcc4p5eHeGjK6MgY5+doaGa6pzlGV7g1qBh4KHkXiPeW6OaKqafqZ2eXZ5e1V7jGd7boSJc3BzhJd2e0mcYot2h1RoY8dahK6EQmWEWjx7e1l2lL6UgXyBdnR4eU9zc0VreX1umqaBhld7fo2Bc6KEc5Z+hDyEcIeBWtNrfHyGe5qMhMuMe5qMhEGEbVVupcNzg3aHhIF4boeBe0mEdlptc39ofFl5Y8uUlJOGiYt2UmGEcyxjjGx4jFF7a657ZYWBnElzhp57iXtrgZN+tfOEhIOBjE2HgU1+e8tjjKNbiWCDhE15gUqBgYN7fnqGc66ce9d7iYSBj0qPcG6DnGGcT3eGa6qMZY+JlIiMl4hwc3aRdnqBlGV7eHJ2hLZjfnuRhDyEeX6MSk17g6Z+c6aUjHmEhIF4gXyBc76EZW18fGl+fkl+jCxrhoVwhDyUhIqGlL2DlI6EhJd2tdN7eYORhEGMa2Faa6pzc3Bzc4R5lIRznM+UY9eMhDycc5Z+c4p5c4iGY117pb6MgXuPrbJafnx2eYOJeXZ5e657hDyEcziElKZjfoB5eHeGj4WRhGGEe6KGeX1utTStc76EhFGJnCyMa5hzfH6HnNeceYB7hmN8gYuMhIVrczSMgYF8h3N7c5pza5hzjJqEYIRdgYuMlL2DeYRzhGGEeX1uhLaEc4iGeZ1zdl6JhrVteX6Me2iMfm5lWqJzSpqEa6pzdnmchHx2c6OMhNdrhoR5g3aHczxzeW52gV6Ejm15frGMc0Vzc4Z+l3drfniJe+9rWq5rlF1rhGGEhoVwe9OEfoh+e7pac09+c3qBY0lrhDycdnp2lJ6MiYOGhGCDc3aRlL2DlJt5doaGdnp2gYF8gWeOjF2Uc4R5c5Z+jEmMe7KEc4mEeYJ4dmyBe0mcgXiPbqJ7eYB7fmGGiYSJjICGlF1reZ2PnElzbpqJfH6Hc39oe4WEc5eJhK6EhqyJc3qBgZB8c09+hEmEaHKDhFGJc5SGiXWMUpaEa89zc6OMnCyMiXtrho+Be5qMc7KEjJ57dmN+hKGPjICGbmiEe7prdod+hGCDdnmchBx7eX6MkXZ2hGGEa657hm98jFFjY5JreYOJgY2EjHZ2a295Y3FajJ6Mc1J+YzB7e4WBjF2Uc4R5eV12gYxzg1qBeId+c9OUc5pzjFFjgY5+hFiMlIaPhoR5lIpjjIKBlNdSe7KEeX2BfrGMhIqGc65zjE2UhK6EklZ+QmWEeziMWqZza3VzdnR4foh+gYF8n3iJiZhrnKp7gYF8eId+lJ6Me1lrcIuGjKJjhmN8c66MjFF7a6prjJ6UnJ5zezyUfruRWlF7nI5zfHyGe657h4SEe8tjhBx7jFFjc09+c39ojICMeZeJeXt+YzRzjHZ2c0WEcIeBeXZ5onSXkVR+gYJ+eYFwdldzgYF7eX2BjJ6UiXuXlE1jh4SEe1mchLJjc4Z+hqZ7eXZ5bm1zlL6Ue5p7iWeGhKqUY5pzjKJjcIeBe8t7gXyBYIRdlEp4a3mGnK6EfmmMZpqEfFl5gYxzjKZuhGFjhoKGhHx2fnx2eXuMe3aBiWeGvbKMe6KGa5hzYzB7gZOBlGV7hmN8hqZlYot2Y117a6pzc6KEfId8foB5rctrfneJfJ6PcHN2hFiMc5pzjH92c0VzgY2EcElzdmCBlFVzg1GBc65zY4OBboeBcHiBeYJ4ewxzfHx5lIRzlEmEnLKEbk1zfJ6PhmN8eYBljBiEnMOEiXxwezyUcIeBe76EdsKEeX2BdnR4jGWUrXWMjGd7fkl+j4WRlEGMa5Jzho+BhDyEfnqMeXt+g3aHlE1jczClhNN7ZW18eHx8hGFjZW18iXWMjKJjhH57gYuMcIuGWjyMe4ZtjJuExmmMj4WRdntzi4GDhFFzYIRdnGGcjJp7Y0F7e4WEkbCGiX57fnSHa657a6prhBCMe3Z+SmmMjH92eHJ2hK6EY1FzexhrvbKMnI5za4OEfnd+eXuMhImBe897hLaMjN+EfG+BeIOBhF1+eZeJi4GDkXZ2eXKEgZ6Ejpd4c2GHa1V5e5KUfqZuhCx7jKp7lLZrg11+hHx2hFWUoot2nI5zgbh5mo9zvZaUe3qRbqKMfqZ2kbCGhFiM`,xn=class extends Me{constructor(){super(...arguments),this.projScale=1}},Sn=class extends xn{constructor(){super(...arguments),this.intensity=1}},Cn=class extends Me{},wn=class extends Cn{constructor(){super(...arguments),this.blurSize=h()}},Tn=class extends dt{constructor(){super(...arguments),this.shader=new st(un,()=>y(()=>import(`./SSAO.glsl-B4NeVtCM-DbcX-6gj.js`),__vite__mapDeps([26,2,3,1,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]),import.meta.url))}initializePipeline(){return Mt({colorWrite:Nt})}};Tn=f([x(`esri.views.3d.webgl-engine.effects.ssao.SSAOTechnique`)],Tn);var J=class extends xt{constructor(e){super(e),this.consumes={required:[`normals`]},this.produces=St.SSAO,this.isEnabled=()=>!1,this._enableTime=l(0),this._passParameters=new Sn,this._drawParameters=new wn}initialize(){let e=Uint8Array.from(atob(bn),e=>e.charCodeAt(0)),t=new ve(32);t.wrapMode=33071,t.pixelFormat=6407,t.wrapMode=10497,t.hasMipmap=!0,this._passParameters.noiseTexture=new ye(this.renderingContext,t,e),this.techniques.precompile(Tn),this.techniques.precompile(yn),this.addHandles(ue(()=>this.isEnabled(),()=>this._enableTime=l(0)))}destroy(){this._passParameters.noiseTexture=oe(this._passParameters.noiseTexture)}render(e){let t=e.find(({name:e})=>e===`normals`),n=t?.getTexture(),r=t?.getTexture(_e);if(!n||!r)return;let i=this.techniques.get(Tn),a=this.techniques.get(yn);if(!i.compiled||!a.compiled)return this._enableTime=l(performance.now()),void this.requestRender(1);this._enableTime===0&&(this._enableTime=l(performance.now()));let o=this.renderingContext,s=this.view.qualitySettings.fadeDuration,c=this.bindParameters,u=c.camera,d=u.relativeElevation,f=ee((zt-d)/(zt-Rt),0,1),p=s>0?Math.min(s,performance.now()-this._enableTime)/s:1,m=p*f;this._passParameters.normalTexture=n,this._passParameters.depthTexture=r,this._passParameters.projScale=1/u.computeScreenPixelSizeAtDist(1),this._passParameters.intensity=4*En/cn(u)**6*m;let h=u.fullViewport[2],g=u.fullViewport[3],_=this.fboCache.acquire(h,g,`ssao input`,2);o.bindFramebuffer(_.fbo),o.setViewport(0,0,h,g),o.bindTechnique(i,c,this._passParameters,this._drawParameters),o.screen.draw();let v=Math.round(h/2),y=Math.round(g/2),b=this.fboCache.acquire(v,y,`ssao blur`,0);o.bindFramebuffer(b.fbo),this._drawParameters.colorTexture=_.getTexture(),se(this._drawParameters.blurSize,0,2/g),o.bindTechnique(a,c,this._passParameters,this._drawParameters),o.setViewport(0,0,v,y),o.screen.draw(),_.release();let te=this.fboCache.acquire(v,y,St.SSAO,0);return o.bindFramebuffer(te.fbo),o.setViewport(0,0,h,g),o.setClearColor(1,1,1,0),o.clear(16384),this._drawParameters.colorTexture=b.getTexture(),se(this._drawParameters.blurSize,2/h,0),o.bindTechnique(a,c,this._passParameters,this._drawParameters),o.setViewport(0,0,v,y),o.screen.draw(),o.setViewport4fv(u.fullViewport),b.release(),p<1&&this.requestRender(2),te}};f([e()],J.prototype,`consumes`,void 0),f([e()],J.prototype,`produces`,void 0),f([e({constructOnly:!0})],J.prototype,`isEnabled`,void 0),J=f([x(`esri.views.3d.webgl-engine.effects.ssao.SSAO`)],J);var En=.5;function Dn(e,t){t.receiveAmbientOcclusion?(e.uniforms.add(new We(`ssaoTex`,e=>e.ssao?.getTexture())),e.constants.add(`blurSizePixelsInverse`,`float`,1/2),e.code.add(E`float evaluateAmbientOcclusionInverse() {
vec2 ssaoTextureSizeInverse = 1.0 / vec2(textureSize(ssaoTex, 0));
return texture(ssaoTex, gl_FragCoord.xy * blurSizePixelsInverse * ssaoTextureSizeInverse).r;
}
float evaluateAmbientOcclusion() {
return 1.0 - evaluateAmbientOcclusionInverse();
}`)):e.code.add(E`float evaluateAmbientOcclusionInverse() { return 1.0; }
float evaluateAmbientOcclusion() { return 0.0; }`)}function On(e){e.code.add(E`float mapChannel(float x, vec2 p) {
return (x < p.x) ? mix(0.0, p.y, x/p.x) : mix(p.y, 1.0, (x - p.x) / (1.0 - p.x) );
}`),e.code.add(E`vec3 blackLevelSoftCompression(vec3 color, float averageAmbientRadiance) {
vec2 p = vec2(0.02, 0.0075) * averageAmbientRadiance;
return vec3(mapChannel(color.x, p), mapChannel(color.y, p), mapChannel(color.z, p));
}`)}function kn(e){e.constants.add(`ambientBoostFactor`,`float`,Tt)}function An(e){e.uniforms.add(new I(`lightingGlobalFactor`,e=>e.lighting.globalFactor))}function jn(e,t){let{pbrMode:n,spherical:r,hasColorTexture:i}=t;e.include(Dn,t),n!==0&&e.include(Wt,t),e.include(Bt,t),e.include(ut),e.include(Kt,t),e.include(xe);let a=!(n===2&&!i);switch(a&&e.include(On),e.code.add(E`
    ${T(n!==0,`const float GROUND_REFLECTANCE = 0.2;`)}
  `),kn(e),An(e),K(e),e.code.add(E`
    float additionalDirectedAmbientLight(float lightAlignment) {
      return smoothstep(0.0, 1.0, clamp(lightAlignment * 2.5, 0.0, 1.0));
    }

    float additionalDirectedAmbientLight(vec3 vPosWorld) {
      float lightAlignment = dot(${r?E`normalize(vPosWorld)`:E`vec3(0.0, 0.0, 1.0)`}, mainLightDirection);
      return smoothstep(0.0, 1.0, clamp(lightAlignment * 2.5, 0.0, 1.0));
    }
  `),q(e),e.code.add(E`vec3 evaluateAdditionalLighting(float ambientOcclusion, vec3 vPosWorld) {
float additionalAmbientScale = additionalDirectedAmbientLight(vPosWorld);
return (1.0 - ambientOcclusion) * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor * mainLightIntensity;
}`),n){case 0:case 4:case 3:e.include(Ht),e.code.add(E`vec3 evaluateSceneLighting(vec3 normalWorld, vec3 albedo, float shadow, float ssao, vec3 additionalLight) {
vec3 mainLighting = applyShading(normalWorld, shadow);
vec3 ambientLighting = calculateAmbientIrradiance(normalWorld, ssao);
vec3 albedoLinear = linearizeGamma(albedo);
vec3 totalLight = mainLighting + ambientLighting + additionalLight;
totalLight = min(totalLight, vec3(PI));
vec3 outColor = vec3((albedoLinear / PI) * totalLight);
return delinearizeGamma(outColor);
}`);break;case 1:case 2:e.code.add(E`const float fillLightIntensity = 0.25;
const float horizonLightDiffusion = 0.4;
const float additionalAmbientIrradianceFactor = 0.02;
vec3 evaluateSceneLightingPBR(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight,
vec3 viewDir, vec3 groundNormal, vec3 mrr, float additionalAmbientIrradiance) {
vec3 viewDirection = -viewDir;
vec3 h = normalize(viewDirection + mainLightDirection);
PBRShadingInfo inputs;
inputs.NdotV = clamp(abs(dot(normal, viewDirection)), 0.001, 1.0);
inputs.NdotNG = clamp(dot(normal, groundNormal), -1.0, 1.0);
vec3 reflectedView = normalize(reflect(viewDirection, normal));
inputs.RdotNG = clamp(dot(reflectedView, groundNormal), -1.0, 1.0);
inputs.albedoLinear = linearizeGamma(albedo);
inputs.ssao = ssao;
inputs.metalness = mrr[0];
inputs.roughness = clamp(mrr[1] * mrr[1], 0.001, 0.99);`),e.code.add(E`inputs.f0 = (0.16 * mrr[2] * mrr[2]) * (1.0 - inputs.metalness) + inputs.albedoLinear * inputs.metalness;
inputs.f90 = vec3(clamp(dot(inputs.f0, vec3(50.0 * 0.33)), 0.0, 1.0));
inputs.diffuseColor = inputs.albedoLinear * (vec3(1.0) - inputs.f0) * (1.0 - inputs.metalness);`),t.useFillLights?e.uniforms.add(new Oe(`hasFillLights`,e=>e.enableFillLights)):e.constants.add(`hasFillLights`,`bool`,!1),e.code.add(E`vec3 ambientDir = vec3(5.0 * groundNormal[1] - groundNormal[0] * groundNormal[2], - 5.0 * groundNormal[0] - groundNormal[2] * groundNormal[1], groundNormal[1] * groundNormal[1] + groundNormal[0] * groundNormal[0]);
ambientDir = ambientDir != vec3(0.0) ? normalize(ambientDir) : normalize(vec3(5.0, -1.0, 0.0));
inputs.NdotAmbDir = hasFillLights ? abs(dot(normal, ambientDir)) : 1.0;
float NdotL = clamp(dot(normal, mainLightDirection), 0.001, 1.0);
vec3 mainLightIrradianceComponent = NdotL * (1.0 - shadow) * mainLightIntensity;
vec3 fillLightsIrradianceComponent = inputs.NdotAmbDir * mainLightIntensity * fillLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(normal, ssao) + additionalLight;
inputs.skyIrradianceToSurface = ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
inputs.groundIrradianceToSurface = GROUND_REFLECTANCE * ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;`),e.uniforms.add(new I(`lightingSpecularStrength`,e=>e.lighting.mainLight.specularStrength),new I(`lightingEnvironmentStrength`,e=>e.lighting.mainLight.environmentStrength)).code.add(E`vec3 horizonRingDir = inputs.RdotNG * groundNormal - reflectedView;
vec3 horizonRingH = normalize(viewDirection + horizonRingDir);
inputs.NdotH_Horizon = dot(normal, horizonRingH);
float NdotH = clamp(dot(normal, h), 0.0, 1.0);
vec3 mainLightRadianceComponent = lightingSpecularStrength * normalDistribution(NdotH, inputs.roughness) * mainLightIntensity * (1.0 - shadow);
vec3 horizonLightRadianceComponent = lightingEnvironmentStrength * normalDistribution(inputs.NdotH_Horizon, min(inputs.roughness + horizonLightDiffusion, 1.0)) * mainLightIntensity * fillLightIntensity;
vec3 ambientLightRadianceComponent = lightingEnvironmentStrength * calculateAmbientRadiance(ssao) + additionalLight;
float normalDirectionModifier = mix(1., min(mix(0.1, 2.0, (inputs.NdotNG + 1.) * 0.5), 1.0), clamp(inputs.roughness * 5.0, 0.0 , 1.0));
inputs.skyRadianceToSurface = (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;
inputs.groundRadianceToSurface = 0.5 * GROUND_REFLECTANCE * (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;
inputs.averageAmbientRadiance = ambientLightIrradianceComponent[1] * (1.0 + GROUND_REFLECTANCE);`),e.code.add(E`
        vec3 reflectedColorComponent = evaluateEnvironmentIllumination(inputs);
        vec3 additionalMaterialReflectanceComponent = inputs.albedoLinear * additionalAmbientIrradiance;
        vec3 outColorLinear = reflectedColorComponent + additionalMaterialReflectanceComponent;
        ${a?E`vec3 outColor = blackLevelSoftCompression(outColorLinear, inputs.averageAmbientRadiance);`:E`vec3 outColor = max(vec3(0.0), outColorLinear - 0.005 * inputs.averageAmbientRadiance);`}
        return delinearizeGamma(outColor);
      }
    `);break;case 5:case 6:K(e),q(e),e.code.add(E`const float roughnessTerrain = 0.5;
const float specularityTerrain = 0.5;
const vec3 fresnelReflectionTerrain = vec3(0.04);
vec3 evaluatePBRSimplifiedLighting(vec3 n, vec3 c, float shadow, float ssao, vec3 al, vec3 vd, vec3 nup) {
vec3 viewDirection = -vd;
vec3 h = normalize(viewDirection + mainLightDirection);
float NdotL = clamp(dot(n, mainLightDirection), 0.001, 1.0);
float NdotV = clamp(abs(dot(n, viewDirection)), 0.001, 1.0);
float NdotH = clamp(dot(n, h), 0.0, 1.0);
float NdotNG = clamp(dot(n, nup), -1.0, 1.0);
vec3 albedoLinear = linearizeGamma(c);
float lightness = 0.3 * albedoLinear[0] + 0.5 * albedoLinear[1] + 0.2 * albedoLinear[2];
vec3 f0 = (0.85 * lightness + 0.15) * fresnelReflectionTerrain;
vec3 f90 =  vec3(clamp(dot(f0, vec3(50.0 * 0.33)), 0.0, 1.0));
vec3 mainLightIrradianceComponent = (1. - shadow) * NdotL * mainLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(n, ssao) + al;
vec3 ambientSky = ambientLightIrradianceComponent + mainLightIrradianceComponent;
vec3 indirectDiffuse = ((1.0 - NdotNG) * mainLightIrradianceComponent + (1.0 + NdotNG ) * ambientSky) * 0.5;
vec3 outDiffColor = albedoLinear * (1.0 - f0) * indirectDiffuse / PI;
vec3 mainLightRadianceComponent = normalDistribution(NdotH, roughnessTerrain) * mainLightIntensity;
vec2 dfg = prefilteredDFGAnalytical(roughnessTerrain, NdotV);
vec3 specularColor = f0 * dfg.x + f90 * dfg.y;
vec3 specularComponent = specularityTerrain * specularColor * mainLightRadianceComponent;
vec3 outColorLinear = outDiffColor + specularComponent;
vec3 outColor = delinearizeGamma(outColorLinear);
return outColor;
}`)}}function Mn(e,t){let n=t.pbrMode,r=e.fragment;if(n!==2&&n!==0&&n!==1)return void r.code.add(E`void applyPBRFactors() {}`);if(n===0)return void r.code.add(E`void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);if(n===2)return void r.code.add(E`vec3 mrr = vec3(0.0, 0.6, 0.2);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);let{hasMetallicRoughnessTexture:i,hasMetallicRoughnessTextureTransform:a,hasOcclusionTexture:o,hasOcclusionTextureTransform:s,bindType:c}=t;(i||o)&&e.include(we,t),r.code.add(E`vec3 mrr;
float occlusion;`),i&&r.uniforms.add(c===1?new A(`texMetallicRoughness`,e=>e.textureMetallicRoughness):new Se(`texMetallicRoughness`,e=>e.textureMetallicRoughness)),o&&r.uniforms.add(c===1?new A(`texOcclusion`,e=>e.textureOcclusion):new Se(`texOcclusion`,e=>e.textureOcclusion)),r.uniforms.add(c===1?new D(`mrrFactors`,e=>e.mrrFactors):new Ee(`mrrFactors`,e=>e.mrrFactors)),r.code.add(E`
    ${T(i,E`void applyMetallicRoughness(vec2 uv) {
            vec3 metallicRoughness = textureLookup(texMetallicRoughness, uv).rgb;
            mrr[0] *= metallicRoughness.b;
            mrr[1] *= metallicRoughness.g;
          }`)}

    ${T(o,`void applyOcclusion(vec2 uv) { occlusion *= textureLookup(texOcclusion, uv).r; }`)}

    float getBakedOcclusion() {
      return ${o?`occlusion`:`1.0`};
    }

    void applyPBRFactors() {
      mrr = mrrFactors;
      occlusion = 1.0;

      ${T(i,`applyMetallicRoughness(${a?`metallicRoughnessUV`:`vuv0`});`)}
      ${T(o,`applyOcclusion(${s?`occlusionUV`:`vuv0`});`)}
    }
  `)}function Nn(e,t){t.snowCover&&(e.uniforms.add(new I(`snowCover`,e=>e.snowCover)).code.add(E`float getSnow(vec3 normal, vec3 groundNormal) {
return smoothstep(0.5, 0.55, dot(normal, groundNormal)) * snowCover;
}
float getRealisticTreeSnow(vec3 faceNormal, vec3 shadingNormal, vec3 groundNormal) {
float snow = min(1.0, smoothstep(0.5, 0.55, dot(faceNormal, groundNormal)) +
smoothstep(0.5, 0.55, dot(-faceNormal, groundNormal)) +
smoothstep(0.0, 0.1, dot(shadingNormal, groundNormal)));
return snow * snowCover;
}`),e.code.add(E`vec3 applySnowToMRR(vec3 mrr, float snow) {
return mix(mrr, vec3(0.0, 1.0, 0.04), snow);
}`))}function Pn(e,t){switch(e.fragment.code.add(E`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`),t.normalType){case 1:e.attributes.add(`normalCompressed`,`vec2`),e.vertex.code.add(E`vec3 decompressNormal(vec2 normal) {
float z = 1.0 - abs(normal.x) - abs(normal.y);
return vec3(normal + sign(normal) * min(z, 0.0), z);
}
vec3 normalModel() {
return decompressNormal(normalCompressed);
}`);break;case 0:e.attributes.add(`normal`,`vec3`),e.vertex.code.add(E`vec3 normalModel() {
return normal;
}`);break;default:t.normalType;case 2:case 3:}}function Fn(e,t){let{vertex:n,varyings:r}=e;switch(t.normalType){case 0:case 1:{e.include(Pn,t),r.add(`vNormalWorld`,`vec3`),r.add(`vNormalView`,`vec3`),n.uniforms.add(new z(`transformNormalViewFromGlobal`,e=>e.transformNormalViewFromGlobal));let{hasModelRotationScale:i}=t;i&&n.uniforms.add(new Ue(`transformNormalGlobalFromModel`,e=>e.transformNormalGlobalFromModel)),n.code.add(E`
        void forwardNormal() {
          vNormalWorld = ${T(i,E`transformNormalGlobalFromModel * `)} normalModel();
          vNormalView = transformNormalViewFromGlobal * vNormalWorld;
        }
      `);break}case 2:e.vertex.code.add(E`void forwardNormal() {}`);break;default:t.normalType;case 3:}}var In=class extends Ge{constructor(){super(...arguments),this.transformNormalViewFromGlobal=C()}},Ln=class extends Je{constructor(){super(...arguments),this.transformNormalGlobalFromModel=C(),this.toMapSpace=he()}};function Rn(e){e.vertex.code.add(E`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}function zn(e,t){t.instancedColor?(e.attributes.add(`instanceColor`,`vec4`),e.vertex.include(lt),e.vertex.include(Et),e.vertex.include(Ke),e.vertex.code.add(E`
      MaskedColor applyInstanceColor(MaskedColor color) {
        return multiplyMaskedColors( color, createMaskedFromUInt8NaNColor(${`instanceColor`}));
      }
    `)):e.vertex.code.add(E`MaskedColor applyInstanceColor(MaskedColor color) {
return color;
}`)}var Bn=C();function Vn(e,t){let{hasModelTransformation:n,instancedDoublePrecision:r,instanced:i,output:a,hasVertexTangents:o}=t;n&&(e.vertex.uniforms.add(new mt(`model`,e=>e.modelTransformation??u)),e.vertex.uniforms.add(new z(`normalLocalOriginFromModel`,e=>(_(Bn,e.modelTransformation??u),Bn)))),i&&r&&(e.attributes.add(`instanceModelOriginHi`,`vec3`),e.attributes.add(`instanceModelOriginLo`,`vec3`),e.attributes.add(`instanceModel`,`mat3`),e.attributes.add(`instanceModelNormal`,`mat3`));let s=e.vertex;r&&(s.include(At,t),s.uniforms.add(new L(`viewOriginHi`,e=>Pe(v(Hn,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]),Hn)),new L(`viewOriginLo`,e=>je(v(Hn,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]),Hn)))),s.code.add(E`
    vec3 getVertexInLocalOriginSpace() {
      return ${n?r?`(model * vec4(instanceModel * localPosition().xyz, 1.0)).xyz`:`(model * localPosition()).xyz`:r?`instanceModel * localPosition().xyz`:`localPosition().xyz`};
    }

    vec3 subtractOrigin(vec3 _pos) {
      ${r?E`
          // Issue: (should be resolved now with invariant position) https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/56280
          vec3 originDelta = dpAdd(viewOriginHi, viewOriginLo, -instanceModelOriginHi, -instanceModelOriginLo);
          return _pos - originDelta;`:`return vpos;`}
    }
    `),s.code.add(E`
    vec3 dpNormal(vec4 _normal) {
      return normalize(${n?r?`normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz)`:`normalLocalOriginFromModel * _normal.xyz`:r?`instanceModelNormal * _normal.xyz`:`_normal.xyz`});
    }
    `),a===2&&(wt(s),s.code.add(E`
    vec3 dpNormalView(vec4 _normal) {
      return normalize((viewNormal * ${n?r?`vec4(normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz), 1.0)`:`vec4(normalLocalOriginFromModel * _normal.xyz, 1.0)`:r?`vec4(instanceModelNormal * _normal.xyz, 1.0)`:`_normal`}).xyz);
    }
    `)),o&&s.code.add(E`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${n?r?`return vec4(normalLocalOriginFromModel * (instanceModelNormal * _tangent.xyz), _tangent.w);`:`return vec4(normalLocalOriginFromModel * _tangent.xyz, _tangent.w);`:r?`return vec4(instanceModelNormal * _tangent.xyz, _tangent.w);`:`return _tangent;`}
    }`)}var Hn=m();function Un(e,t){e.varyings.add(`colorMixMode`,`int`),e.varyings.add(`opacityMixMode`,`int`),e.vertex.uniforms.add(new yt(`symbolColorMixMode`,e=>M[e.colorMixMode])),t.hasSymbolColors?(e.vertex.include(lt),e.vertex.include(Et),e.vertex.include(Ke),e.attributes.add(`symbolColor`,`vec4`),e.vertex.code.add(E`
    MaskedColor applySymbolColor(MaskedColor color) {
      return multiplyMaskedColors(color, createMaskedFromUInt8NaNColor(${`symbolColor`}));
    }
  `)):e.vertex.code.add(E`MaskedColor applySymbolColor(MaskedColor color) {
return color;
}`),e.vertex.code.add(E`
    void forwardColorMixMode(bvec4 mask) {
      colorMixMode = mask.r ? ${E.int(M.ignore)} : symbolColorMixMode;
      opacityMixMode = mask.a ? ${E.int(M.ignore)} : symbolColorMixMode;
    }
  `)}function Y(e,t){Wn(e,t,new k(`textureAlphaCutoff`,e=>e.textureAlphaCutoff))}function Wn(e,t,n){let r=e.fragment,i=t.alphaDiscardMode,a=i===0;i!==2&&i!==3||r.uniforms.add(n),r.code.add(E`
    void discardOrAdjustAlpha(inout vec4 color) {
      ${i===1?`color.a = 1.0;`:`if (color.a < ${a?E.float(H):`textureAlphaCutoff`}) {\n              discard;\n             } ${T(i===2,`else { color.a = 1.0; }`)}`}
    }
  `)}function Gn(e,t){let{vertex:n,fragment:r,varyings:i}=e,{hasColorTexture:a,alphaDiscardMode:o}=t,s=a&&o!==1,{output:c,normalType:l,hasColorTextureTransform:u}=t;switch(c){case 1:P(n,t),e.include(N),r.include(B,t),e.include(j,t),s&&r.uniforms.add(new A(`tex`,e=>e.texture)),n.main.add(E`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),e.include(Y,t),r.main.add(E`
        discardBySlice(vpos);
        ${T(s,E`vec4 texColor = texture(tex, ${u?`colorUV`:`vuv0`});
                discardOrAdjustAlpha(texColor);`)}`);break;case 3:case 4:case 5:case 6:case 9:P(n,t),e.include(N),e.include(j,t),e.include(R,t),e.include(vn,t),r.include(B,t),e.include(ot,t),Be(e),i.add(`depth`,`float`,{invariant:!0}),s&&r.uniforms.add(new A(`tex`,e=>e.texture)),n.main.add(E`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
forwardTextureCoordinates();
forwardObjectAndLayerIdColor();`),e.include(Y,t),r.main.add(E`
        discardBySlice(vpos);
        ${T(s,E`vec4 texColor = texture(tex, ${u?`colorUV`:`vuv0`});
               discardOrAdjustAlpha(texColor);`)}
        ${c===9?E`outputObjectAndLayerIdColor();`:E`outputDepth(depth);`}`);break;case 2:{P(n,t),e.include(N),e.include(Pn,t),e.include(Fn,t),e.include(j,t),e.include(R,t),s&&r.uniforms.add(new A(`tex`,e=>e.texture)),l===2&&i.add(`vPositionView`,`vec3`,{invariant:!0});let a=l===0||l===1;n.main.add(E`
        vpos = getVertexInLocalOriginSpace();
        ${a?E`vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:E`vPositionView = (view * vec4(vpos, 1.0)).xyz;`}
        vpos = subtractOrigin(vpos);
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, vpos);
        forwardTextureCoordinates();`),r.include(B,t),e.include(Y,t),r.main.add(E`
        discardBySlice(vpos);
        ${T(s,E`vec4 texColor = texture(tex, ${u?`colorUV`:`vuv0`});
                discardOrAdjustAlpha(texColor);`)}

        ${l===2?E`vec3 normal = screenDerivativeNormal(vPositionView);`:E`vec3 normal = normalize(vNormalWorld);
                    if (gl_FrontFacing == false){
                      normal = -normal;
                    }`}
        fragColor = vec4(0.5 + 0.5 * normal, 1.0);`);break}case 8:P(n,t),e.include(N),e.include(j,t),e.include(R,t),s&&r.uniforms.add(new A(`tex`,e=>e.texture)),n.main.add(E`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),r.include(B,t),e.include(Y,t),e.include(Ot,t),r.main.add(E`
        discardBySlice(vpos);
        ${T(s,E`vec4 texColor = texture(tex, ${u?`colorUV`:`vuv0`});
                discardOrAdjustAlpha(texColor);`)}
        calculateOcclusionAndOutputHighlight();`)}}function Kn(e,t){let n=e.fragment;switch(n.code.add(E`struct ShadingNormalParameters {
vec3 normalView;
vec3 viewDirection;
} shadingParams;`),t.doubleSidedMode){case 0:n.code.add(E`vec3 shadingNormal(ShadingNormalParameters params) {
return normalize(params.normalView);
}`);break;case 1:n.code.add(E`vec3 shadingNormal(ShadingNormalParameters params) {
return dot(params.normalView, params.viewDirection) > 0.0 ? normalize(-params.normalView) : normalize(params.normalView);
}`);break;case 2:n.code.add(E`vec3 shadingNormal(ShadingNormalParameters params) {
return gl_FrontFacing ? normalize(params.normalView) : normalize(-params.normalView);
}`);break;default:t.doubleSidedMode;case 3:}}function qn(e,t){return Jn(e,t)}function Jn(e,t){let n=e.fragment,{hasVertexTangents:r,doubleSidedMode:i,hasNormalTexture:a,textureCoordinateType:o,bindType:s,hasNormalTextureTransform:l}=t;r?(e.attributes.add(`tangent`,`vec4`),e.varyings.add(`vTangent`,`vec4`),i===2?n.code.add(E`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):n.code.add(E`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):n.code.add(E`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`),a&&o!==0&&(e.include(we,t),n.uniforms.add(s===1?new A(`normalTexture`,e=>e.textureNormal):new Se(`normalTexture`,e=>e.textureNormal)),l&&(n.uniforms.add(s===1?new rt(`scale`,e=>e.scale??b):new it(`scale`,e=>e.scale??b)),n.uniforms.add(new z(`normalTextureTransformMatrix`,e=>e.normalTextureTransformMatrix??c))),n.code.add(E`vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
vec3 rawNormal = textureLookup(normalTexture, uv).rgb * 2.0 - 1.0;`),l&&n.code.add(E`mat3 normalRotation = mat3(normalTextureTransformMatrix[0][0]/scale[0], normalTextureTransformMatrix[0][1]/scale[1], 0.0,
normalTextureTransformMatrix[1][0]/scale[0], normalTextureTransformMatrix[1][1]/scale[1], 0.0,
0.0, 0.0, 0.0 );
rawNormal.xy = (normalRotation * vec3(rawNormal.x, rawNormal.y, 1.0)).xy;`),n.code.add(E`return tangentSpace * rawNormal;
}`))}function Yn(e,t){t.hasColorTextureTransform?(e.varyings.add(`colorUV`,`vec2`),e.vertex.uniforms.add(new z(`colorTextureTransformMatrix`,e=>e.colorTextureTransformMatrix??c)).code.add(E`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(E`void forwardColorUV(){}`)}function Xn(e,t){t.hasNormalTextureTransform&&t.textureCoordinateType!==0?(e.varyings.add(`normalUV`,`vec2`),e.vertex.uniforms.add(new z(`normalTextureTransformMatrix`,e=>e.normalTextureTransformMatrix??c)).code.add(E`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(E`void forwardNormalUV(){}`)}function Zn(e,t){t.hasEmissionTextureTransform&&t.textureCoordinateType!==0?(e.varyings.add(`emissiveUV`,`vec2`),e.vertex.uniforms.add(new z(`emissiveTextureTransformMatrix`,e=>e.emissiveTextureTransformMatrix??c)).code.add(E`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(E`void forwardEmissiveUV(){}`)}function Qn(e,t){t.hasOcclusionTextureTransform&&t.textureCoordinateType!==0?(e.varyings.add(`occlusionUV`,`vec2`),e.vertex.uniforms.add(new z(`occlusionTextureTransformMatrix`,e=>e.occlusionTextureTransformMatrix??c)).code.add(E`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(E`void forwardOcclusionUV(){}`)}function $n(e,t){t.hasMetallicRoughnessTextureTransform&&t.textureCoordinateType!==0?(e.varyings.add(`metallicRoughnessUV`,`vec2`),e.vertex.uniforms.add(new z(`metallicRoughnessTextureTransformMatrix`,e=>e.metallicRoughnessTextureTransformMatrix??c)).code.add(E`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(E`void forwardMetallicRoughnessUV(){}`)}function er(e){let t=new w,{attributes:n,vertex:r,fragment:i,varyings:a}=t,{output:o,normalType:s,offsetBackfaces:c,spherical:l,snowCover:u,pbrMode:d,textureAlphaPremultiplied:f,instancedDoublePrecision:p,hasVertexColors:m,hasVertexTangents:h,hasColorTexture:g,hasNormalTexture:ee,hasNormalTextureTransform:_,hasColorTextureTransform:v}=e;if(P(r,e),n.add(`position`,`vec3`),a.add(`vpos`,`vec3`,{invariant:!0}),t.include(R,e),t.include(Vn,e),t.include(Dt,e),t.include(Yn,e),!O(o))return t.include(Gn,e),t;t.include(Xn,e),t.include(Zn,e),t.include(Qn,e),t.include($n,e),nt(r,e),t.include(Pn,e),t.include(N);let y=s===0||s===1;return y&&c&&t.include(Rn),t.include(qn,e),t.include(Fn,e),t.include(zn,e),a.add(`vPositionLocal`,`vec3`),t.include(j,e),t.include(Un,e),t.include(He,e),r.uniforms.add(new pt(`externalColor`,e=>e.externalColor,{supportsNaN:!0})),a.add(`vcolorExt`,`vec4`),t.include(tt,e),r.include(lt),r.include(ke),t.include(p?tn:nn,e),r.main.add(E`
    forwardVertexColor();

    MaskedColor maskedColor =
      applySymbolColor(applyVVColor(applyInstanceColor(createMaskedFromNaNColor(externalColor))));

    vcolorExt = maskedColor.color;
    forwardColorMixMode(maskedColor.mask);

    vpos = getVertexInLocalOriginSpace();
    vPositionLocal = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    ${T(y,`vNormalWorld = dpNormal(vvLocalNormal(normalModel()));`)}
    vpos = addVerticalOffset(vpos, localOrigin);
    ${T(h,`vTangent = dpTransformVertexTangent(tangent);`)}
    gl_Position = transformPosition(proj, view, vpos);
    ${T(y&&c,`gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);`)}

    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardTextureCoordinates();
    forwardColorUV();
    forwardNormalUV();
    forwardEmissiveUV();
    forwardOcclusionUV();
    forwardMetallicRoughnessUV();

    if (opacityMixMode != ${E.int(M.ignore)} && vcolorExt.a < ${E.float(H)}) {
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
    }
    forwardLinearDepthToReadShadowMap();
  `),i.include(jn,e),i.include(Dn,e),t.include(Y,e),i.include(B,e),t.include(Ae,e),nt(i,e),i.uniforms.add(r.uniforms.get(`localOrigin`),new D(`ambient`,e=>e.ambient),new D(`diffuse`,e=>e.diffuse),new k(`opacity`,e=>e.opacity),new k(`layerOpacity`,e=>e.layerOpacity)),g&&i.uniforms.add(new A(`tex`,e=>e.texture)),t.include(Mn,e),i.include(Wt,e),i.include(Ye),t.include(Kn,e),i.include(Nn,e),kn(i),An(i),q(i),i.main.add(E`
    discardBySlice(vpos);
    discardByTerrainDepth();
    ${g?E`
            vec4 texColor = texture(tex, ${v?`colorUV`:`vuv0`});
            ${T(f,`texColor.rgb /= texColor.a;`)}
            discardOrAdjustAlpha(texColor);`:E`vec4 texColor = vec4(1.0);`}
    shadingParams.viewDirection = normalize(vpos - cameraPosition);
    ${s===2?E`vec3 normal = screenDerivativeNormal(vPositionLocal);`:E`shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
    applyPBRFactors();
    float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

    vec3 posWorld = vpos + localOrigin;

    float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
    float shadow = readShadow(additionalAmbientScale, vpos);

    vec3 matColor = max(ambient, diffuse);
    vec3 albedo = mixExternalColor(${T(m,`vColor.rgb *`)} matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
    float opacity_ = layerOpacity * mixExternalOpacity(${T(m,`vColor.a * `)} opacity, texColor.a, vcolorExt.a, opacityMixMode);

    ${ee?`mat3 tangentSpace = computeTangentSpace(${h?`normal`:`normal, vpos, vuv0`});\n            vec3 shadingNormal = computeTextureNormal(tangentSpace, ${_?`normalUV`:`vuv0`});`:`vec3 shadingNormal = normal;`}
    vec3 normalGround = ${l?`normalize(posWorld);`:`vec3(0.0, 0.0, 1.0);`}

    ${T(u,E`
          float snow = getSnow(normal, normalGround);
          albedo = mix(albedo, vec3(1), snow);
          shadingNormal = mix(shadingNormal, normal, snow);
          ssao = mix(ssao, 1.0, snow);`)}

    vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

    ${d===1||d===2?E`
            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
            ${T(u,`mrr = applySnowToMRR(mrr, snow);`)}
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, additionalAmbientIrradiance);`:E`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
    vec4 finalColor = vec4(shadedColor, opacity_);
    outputColorHighlightOLID(applySlice(finalColor, vpos), albedo ${T(u,`, snow`)});
  `),t}var tr=Object.freeze(Object.defineProperty({__proto__:null,build:er},Symbol.toStringTag,{value:`Module`}));function nr(e){let t=new w,{attributes:n,vertex:r,fragment:i,varyings:a}=t,{output:o,offsetBackfaces:s,pbrMode:c,snowCover:l,spherical:u}=e,d=c===1||c===2;if(P(r,e),n.add(`position`,`vec3`),a.add(`vpos`,`vec3`,{invariant:!0}),t.include(R,e),t.include(Vn,e),t.include(Dt,e),t.include(tt,e),!O(o))return t.include(Gn,e),t;nt(t.vertex,e),t.include(Pn,e),t.include(N),s&&t.include(Rn),a.add(`vNormalWorld`,`vec3`),a.add(`localvpos`,`vec3`,{invariant:!0}),t.include(j,e),t.include(Un,e),t.include(zn,e),t.include(He,e),r.include(lt),r.include(ke),r.uniforms.add(new pt(`externalColor`,e=>e.externalColor,{supportsNaN:!0})),a.add(`vcolorExt`,`vec4`),t.include(e.instancedDoublePrecision?tn:nn,e),r.main.add(E`
    forwardVertexColor();

    MaskedColor maskedColorExt =
      applySymbolColor(applyVVColor(applyInstanceColor(createMaskedFromNaNColor(externalColor))));

    vcolorExt = maskedColorExt.color;
    forwardColorMixMode(maskedColorExt.mask);

    bool alphaCut = opacityMixMode != ${E.int(M.ignore)} && vcolorExt.a < ${E.float(H)};
    vpos = getVertexInLocalOriginSpace();

    localvpos = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
    vpos = addVerticalOffset(vpos, localOrigin);
    vec4 basePosition = transformPosition(proj, view, vpos);

    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardTextureCoordinates();
    forwardLinearDepthToReadShadowMap();
    gl_Position = alphaCut ? vec4(1e38, 1e38, 1e38, 1.0) :
    ${T(s,`offsetBackfacingClipPosition(basePosition, vpos, vNormalWorld, cameraPosition);`,`basePosition;`)}
  `);let{hasColorTexture:f,hasColorTextureTransform:p}=e;return i.include(jn,e),i.include(Dn,e),t.include(Y,e),i.include(B,e),t.include(Ae,e),nt(i,e),K(i),kn(i),An(i),i.uniforms.add(r.uniforms.get(`localOrigin`),r.uniforms.get(`view`),new D(`ambient`,e=>e.ambient),new D(`diffuse`,e=>e.diffuse),new k(`opacity`,e=>e.opacity),new k(`layerOpacity`,e=>e.layerOpacity)),f&&i.uniforms.add(new A(`tex`,e=>e.texture)),t.include(Mn,e),i.include(Wt,e),i.include(Ye),i.include(Nn,e),q(i),i.main.add(E`
      discardBySlice(vpos);
      discardByTerrainDepth();
      vec4 texColor = ${f?`texture(tex, ${p?`colorUV`:`vuv0`})`:` vec4(1.0)`};
      ${T(f,`${T(e.textureAlphaPremultiplied,`texColor.rgb /= texColor.a;`)}\n        discardOrAdjustAlpha(texColor);`)}
      vec3 viewDirection = normalize(vpos - cameraPosition);
      applyPBRFactors();
      float ssao = evaluateAmbientOcclusionInverse();
      ssao *= getBakedOcclusion();

      float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
      vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
      float shadow = readShadow(additionalAmbientScale, vpos);
      vec3 matColor = max(ambient, diffuse);
      ${e.hasVertexColors?E`vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
             float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, opacityMixMode);`:E`vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
             float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, opacityMixMode);`}

      vec3 shadingNormal = normalize(vNormalWorld);
      vec3 groundNormal = ${u?`normalize(vpos + localOrigin)`:`vec3(0.0, 0.0, 1.0)`};

      ${T(l,`vec3 faceNormal = screenDerivativeNormal(vpos);
         float snow = getRealisticTreeSnow(faceNormal, shadingNormal, groundNormal);
         albedo = mix(albedo, vec3(1), snow);`)}

      ${E`albedo *= 1.2;
             vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
             float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
             float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
             float treeRadialFalloff = vColor.r;
             float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
             additionalLight += backLightFactor * mainLightIntensity;`}

      ${d?E`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
            ${T(l,`mrr = applySnowToMRR(mrr, snow);`)}
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, groundNormal, mrr, additionalAmbientIrradiance);`:E`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
      vec4 finalColor = vec4(shadedColor, opacity_);
      outputColorHighlightOLID(applySlice(finalColor, vpos), albedo ${T(l,`, 1.0`)});`),t}var rr=Object.freeze(Object.defineProperty({__proto__:null,build:nr},Symbol.toStringTag,{value:`Module`})),ir=class{constructor(e,t,n){this.elementSize=t.stride,this._buffer=new be(e,Lt(t,1)),this.resize(n)}destroy(){this._buffer.dispose()}get capacity(){return this._capacity}get array(){return this._array}get buffer(){return this._buffer}get usedMemory(){return this._array.byteLength+this._buffer.usedMemory}copyRange(e,t,n,r=0){let i=new Uint8Array(this.array,e*this.elementSize,(t-e)*this.elementSize);new Uint8Array(n.array,r*this.elementSize).set(i)}transferAll(){this._buffer.setData(this._array)}transferRange(e,t){let n=e*this.elementSize,r=t*this.elementSize;this._buffer.setSubData(new Uint8Array(this._array),n,n,r)}resize(e){let t=e*this.elementSize,n=new ArrayBuffer(t);this._array&&(e>=this._capacity?new Uint8Array(n).set(new Uint8Array(this._array)):new Uint8Array(n).set(new Uint8Array(this._array).subarray(0,e*this.elementSize))),this._array=n,this._buffer.setSize(t),this._capacity=e}},ar=class{constructor(e){this.localTransform=e.localTransform,this.globalTransform=e.globalTransform,this.modelOrigin=e.modelOrigin,this.model=e.instanceModel,this.modelNormal=e.instanceModelNormal,this.modelScaleFactors=e.modelScaleFactors,this.boundingSphere=e.boundingSphere,this.featureAttribute=e.getField(`instanceFeatureAttribute`,Pt),this.color=e.getField(`instanceColor`,W),this.olidColor=e.getField(`instanceOlidColor`,W),this.state=e.getField(`state`,Ft),this.lodLevel=e.getField(`lodLevel`,Ft)}},X=class extends ce{constructor(e,t){super(e),this.events=new p,this._capacity=0,this._size=0,this._next=0,this._highlightOptionsMap=new Map,this._highlightOptionsMapPrev=new Map,this._layout=cr(t),this._capacity=64,this._buffer=this._layout.createBuffer(this._capacity),this._view=new ar(this._buffer)}get capacity(){return this._capacity}get size(){return this._size}get view(){return this._view}addInstance(){this._size+1>this._capacity&&this._grow();let e=this._findSlot();return this._view.state.set(e,1),this._size++,this.events.emit(`instances-changed`),e}removeInstance(e){let t=this._view.state;U(e>=0&&e<this._capacity&&!!(1&t.get(e)),`invalid instance handle`),this._getStateFlag(e,18)?this._setStateFlags(e,32):this.freeInstance(e),this.events.emit(`instances-changed`)}freeInstance(e){let t=this._view.state;U(e>=0&&e<this._capacity&&!!(1&t.get(e)),`invalid instance handle`),t.set(e,0),this._size--}setLocalTransform(e,t,n=!0){this._view.localTransform.setMat(e,t),n&&this.updateModelTransform(e)}getLocalTransform(e,t){this._view.localTransform.getMat(e,t)}setGlobalTransform(e,t,n=!0){this._view.globalTransform.setMat(e,t),n&&this.updateModelTransform(e)}getGlobalTransform(e,t){this._view.globalTransform.getMat(e,t)}updateModelTransform(e){let t=this._view,r=Z,i=Q;t.localTransform.getMat(e,ur),t.globalTransform.getMat(e,dr);let a=me(dr,dr,ur);v(r,a[12],a[13],a[14]),t.modelOrigin.setVec(e,r),n(i,a),t.model.setMat(e,i);let s=le(Z,a);s.sort(),t.modelScaleFactors.set(e,0,s[1]),t.modelScaleFactors.set(e,1,s[2]),d(i,i),o(i,i),t.modelNormal.setMat(e,i),this._setStateFlags(e,64),this.events.emit(`instance-transform-changed`,{index:e})}getModelTransform(e,t){let n=this._view;n.model.getMat(e,Q),n.modelOrigin.getVec(e,Z),t[0]=Q[0],t[1]=Q[1],t[2]=Q[2],t[3]=0,t[4]=Q[3],t[5]=Q[4],t[6]=Q[5],t[7]=0,t[8]=Q[6],t[9]=Q[7],t[10]=Q[8],t[11]=0,t[12]=Z[0],t[13]=Z[1],t[14]=Z[2],t[15]=1}applyShaderTransformation(e,t){this.shaderTransformation!=null&&this.shaderTransformation.applyTransform(this,e,t)}getCombinedModelTransform(e,t){return this.getModelTransform(e,t),this.shaderTransformation!=null&&this.shaderTransformation.applyTransform(this,e,t),t}getCombinedLocalTransform(e,t){this._view.localTransform.getMat(e,t),this.shaderTransformation!=null&&this.shaderTransformation.applyTransform(this,e,t)}getCombinedMaxScaleFactor(e){let t=this._view.modelScaleFactors.get(e,1);return this.shaderTransformation!=null&&(this.shaderTransformation.scaleFactor(Z,this,e),t*=Math.max(Z[0],Z[1],Z[2])),t}getCombinedMedianScaleFactor(e){let t=this._view.modelScaleFactors.get(e,0);return this.shaderTransformation!=null&&(this.shaderTransformation.scaleFactor(Z,this,e),t*=or(Z[0],Z[1],Z[2])),t}getModel(e,t){this._view.model.getMat(e,t)}setFeatureAttribute(e,t){this._view.featureAttribute?.setVec(e,t)}getFeatureAttribute(e,t){this._view.featureAttribute?.getVec(e,t)}setColor(e,t){this._view.color?.setVec(e,t)}setObjectAndLayerIdColor(e,t){this._view.olidColor?.setVec(e,t)}setVisible(e,t){t!==this.getVisible(e)&&(this._setStateFlag(e,4,t),this.events.emit(`instance-visibility-changed`,{index:e}))}getVisible(e){return this._getStateFlag(e,4)}setHighlight(e,t){let{_highlightOptionsMap:n}=this,r=n.get(e);t?t!==r&&(n.set(e,t),this._setStateFlag(e,8,!0),this.events.emit(`instance-highlight-changed`)):r&&(n.delete(e),this._setStateFlag(e,8,!1),this.events.emit(`instance-highlight-changed`))}get highlightOptionsMap(){return this._highlightOptionsMap}getHighlightStateFlag(e){return this._getStateFlag(e,8)}geHighlightOptionsPrev(e){let t=this._highlightOptionsMapPrev.get(e)??null;return this._highlightOptionsMapPrev.delete(e),t}getHighlightName(e){let t=this.highlightOptionsMap.get(e)??null;return t?this._highlightOptionsMapPrev.set(e,t):this._highlightOptionsMapPrev.delete(e),t}getState(e){return this._view.state.get(e)}getLodLevel(e){return this._view.lodLevel.get(e)}countFlags(e){let t=0;for(let n=0;n<this._capacity;++n)this.getState(n)&e&&++t;return t}_setStateFlags(e,t){let n=this._view.state;t=n.get(e)|t,n.set(e,t)}_clearStateFlags(e,t){let n=this._view.state;t=n.get(e)&~t,n.set(e,t)}_setStateFlag(e,t,n){n?this._setStateFlags(e,t):this._clearStateFlags(e,t)}_getStateFlag(e,t){return!!(this._view.state.get(e)&t)}_grow(){this._capacity=Math.max(64,Math.floor(this._capacity*ae)),this._buffer=this._layout.createBuffer(this._capacity).copyFrom(this._buffer),this._view=new ar(this._buffer)}_findSlot(){let e=this._view.state,t=this._next;for(;1&e.get(t);)t=t+1===this._capacity?0:t+1;return this._next=t+1===this._capacity?0:t+1,t}};function or(e,t,n){return Math.max(Math.min(e,t),Math.min(Math.max(e,t),n))}f([e({constructOnly:!0})],X.prototype,`shaderTransformation`,void 0),f([e()],X.prototype,`_size`,void 0),f([e({readOnly:!0})],X.prototype,`size`,null),X=f([x(`esri.views.3d.webgl-engine.lib.lodRendering.InstanceData`)],X);var sr=It().mat4f64(`localTransform`).mat4f64(`globalTransform`).vec4f64(`boundingSphere`).vec3f64(`modelOrigin`).mat3f(`instanceModel`).mat3f(`instanceModelNormal`).vec2f(`modelScaleFactors`);function cr(e){return lr(sr.clone(),e).u8(`state`).u8(`lodLevel`)}function lr(e,t){return t.instancedFeatureAttribute&&e.vec4f(`instanceFeatureAttribute`),t.instancedColor&&e.vec4u8(`instanceColor`),ht()&&e.vec4u8(`instanceOlidColor`),e}var Z=m(),Q=C(),ur=r(),dr=r(),fr=class{constructor(e){this.model=e.instanceModel,this.modelNormal=e.instanceModelNormal,this.modelOriginHi=e.instanceModelOriginHi,this.modelOriginLo=e.instanceModelOriginLo,this.featureAttribute=e.getField(`instanceFeatureAttribute`,Pt),this.color=e.getField(`instanceColor`,W),this.olidColor=e.getField(`instanceOlidColor`,W)}},pr=class{constructor(e,t){this._rctx=e,this._layout=t,this._headIndex=0,this._tailIndex=0,this._firstIndex=null,this._captureFirstIndex=!0,this._updating=!1,this._prevHeadIndex=0,this._resized=!1,this._capacity=1}destroy(){this._buffer&&this._buffer.destroy()}get buffer(){return this._buffer.buffer}get view(){return this._view}get capacity(){return this._capacity}get size(){let e=this._headIndex,t=this._tailIndex;return e>=t?e-t:e+this._capacity-t}get isEmpty(){return this._headIndex===this._tailIndex}get isFull(){return this._tailIndex===(this._headIndex+1)%this._capacity}get headIndex(){return this._headIndex}get tailIndex(){return this._tailIndex}get firstIndex(){return this._firstIndex}get usedMemory(){return this._buffer?.usedMemory??0}reset(){this._headIndex=0,this._tailIndex=0,this._firstIndex=null}startUpdateCycle(){this._captureFirstIndex=!0}beginUpdate(){U(!this._updating,`already updating`),this._updating=!0,this._prevHeadIndex=this._headIndex}endUpdate(){U(this._updating,`not updating`),this.size<.5*this.capacity&&this._shrink(),this._resized?(this._buffer.transferAll(),this._resized=!1):this._transferRange(this._prevHeadIndex,this._headIndex),this._updating=!1}allocateHead(){U(this._updating,`not updating`),this.isFull&&this._grow();let e=this.headIndex;return this._captureFirstIndex&&=(this._firstIndex=e,!1),this._incrementHead(),U(this._headIndex!==this._tailIndex,`invalid pointers`),e}freeTail(){U(this._updating,`not updating`),U(this.size>0,`invalid size`);let e=this._tailIndex===this._firstIndex;this._incrementTail(),e&&(this._firstIndex=this._tailIndex)}_grow(){let e=Math.max(64,Math.floor(this._capacity*ae));this._resize(e)}_shrink(){let e=Math.max(64,Math.floor(this._capacity*ne));this._resize(e)}_resize(e){if(U(this._updating,`not updating`),e===this._capacity)return;let t=new ir(this._rctx,this._layout,e);if(this._buffer){this._firstIndex&&=(this._firstIndex+this._capacity-this._tailIndex)%this._capacity;let e=this.size,n=this._compactInstances(t);U(n===e,`invalid compaction`),this._buffer.destroy(),this._tailIndex=0,this._headIndex=n,this._prevHeadIndex=0}this._resized=!0,this._capacity=e,this._buffer=t,this._view=new fr(this._layout.createView(this._buffer.array))}_compactInstances(e){let t=this._headIndex,n=this._tailIndex;return n<t?(this._buffer.copyRange(n,t,e),t-n):n>t?(this._buffer.copyRange(n,this._capacity,e),t>0&&this._buffer.copyRange(0,t,e,this._capacity-n),t+(this._capacity-n)):0}_incrementHead(e=1){this._headIndex=(this._headIndex+e)%this._capacity}_incrementTail(e=1){this._tailIndex=(this._tailIndex+e)%this._capacity}_transferRange(e,t){e<t?this._buffer.transferRange(e,t):e>t&&(t>0&&this._buffer.transferRange(0,t),this._buffer.transferRange(e,this._capacity))}},mr=It().vec3f(`instanceModelOriginHi`).vec3f(`instanceModelOriginLo`).mat3f(`instanceModel`).mat3f(`instanceModelNormal`);function hr(e){return lr(mr.clone(),e)}var gr=class extends In{constructor(){super(...arguments),this.isSchematic=!1,this.usePBR=!1,this.mrrFactors=hn,this.hasVertexColors=!1,this.hasSymbolColors=!1,this.doubleSided=!1,this.doubleSidedType=`normal`,this.cullFace=2,this.instanced=!1,this.instancedFeatureAttribute=!1,this.instancedColor=!1,this.instanceColorEncodesAlphaIgnore=!1,this.emissiveStrengthFromSymbol=0,this.emissiveStrengthKHR=1,this.emissiveSource=1,this.emissiveBaseColor=fe,this.instancedDoublePrecision=!1,this.normalType=0,this.receiveShadows=!0,this.receiveAmbientOcclusion=!0,this.castShadows=!0,this.ambient=t(.2,.2,.2),this.diffuse=t(.8,.8,.8),this.externalColor=s(1,1,1,1),this.colorMixMode=`multiply`,this.opacity=1,this.layerOpacity=1,this.origin=m(),this.hasSlicePlane=!1,this.offsetTransparentBackfaces=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.modelTransformation=null,this.drivenOpacity=!1,this.writeDepth=!0,this.customDepthTest=0,this.textureAlphaMode=0,this.textureAlphaCutoff=H,this.textureAlphaPremultiplied=!1,this.renderOccluded=1,this.testsTransparentRenderOrder=0,this.isDecoration=!1}get hasVVSize(){return!!this.vvSize}get hasVVColor(){return!!this.vvColor}get hasVVOpacity(){return!!this.vvOpacity}},_r=class extends Ln{constructor(){super(...arguments),this.origin=m(),this.slicePlaneLocalOrigin=this.origin}},vr=class extends dt{constructor(e,t){let n=Lt(xr(t));t.instanced&&t.instancedDoublePrecision&&(n=n.concat(Lt(hr(t)))),super(e,t,n),this.shader=new st(tr,()=>y(()=>import(`./DefaultMaterial.glsl-Bi-z-FG8-B3dqTAyd.js`),__vite__mapDeps([27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]),import.meta.url))}_makePipeline(e,t){let{oitPass:n,output:r,hasEmission:i,transparent:a,cullFace:o,customDepthTest:s,hasOccludees:c}=e;return Mt({blending:O(r)&&a?Qe(n):null,culling:br(e)?jt(o):null,depthTest:qe(n,yr(s)),depthWrite:kt(e),drawBuffers:ct(r,Ve(n,i)),colorWrite:Nt,stencilWrite:c?ft:null,stencilTest:c?t?vt:Ne:null,polygonOffset:Ct(e)})}initializePipeline(e){return this._occludeePipelineState=this._makePipeline(e,!0),this._makePipeline(e,!1)}getPipeline(e,t){return t?this._occludeePipelineState:super.getPipeline(e)}};function yr(e){switch(e){case 1:return 515;case 0:case 3:return 513;case 2:return 516}}function br(e){return e.cullFace!==0||!e.hasSlicePlane&&!e.transparent&&!e.doubleSidedMode}function xr(e){let t=It().vec3f(`position`);return e.normalType===1?t.vec2i16(`normalCompressed`,{glNormalized:!0}):t.vec3f(`normal`),e.hasVertexTangents&&t.vec4f(`tangent`),e.hasTextures&&t.vec2f16(`uv0`),e.hasVertexColors&&t.vec4u8(`color`,{glNormalized:!0}),e.hasSymbolColors&&t.vec4u8(`symbolColor`),!e.instanced&&ht()&&t.vec4u8(`olidColor`),t}vr=f([x(`esri.views.3d.webgl-engine.shaders.DefaultMaterialTechnique`)],vr);var $=class extends Re{constructor(e){super(),this.spherical=e,this.alphaDiscardMode=1,this.doubleSidedMode=0,this.pbrMode=0,this.cullFace=0,this.normalType=0,this.customDepthTest=0,this.emissionSource=0,this.hasVertexColors=!1,this.hasSymbolColors=!1,this.hasVerticalOffset=!1,this.hasColorTexture=!1,this.hasMetallicRoughnessTexture=!1,this.hasOcclusionTexture=!1,this.hasNormalTexture=!1,this.hasScreenSizePerspective=!1,this.hasVertexTangents=!1,this.hasOccludees=!1,this.instanced=!1,this.instancedDoublePrecision=!1,this.hasModelTransformation=!1,this.offsetBackfaces=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.receiveShadows=!1,this.receiveAmbientOcclusion=!1,this.textureAlphaPremultiplied=!1,this.instancedFeatureAttribute=!1,this.instancedColor=!1,this.writeDepth=!0,this.transparent=!1,this.enableOffset=!0,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.snowCover=!1,this.hasColorTextureTransform=!1,this.hasEmissionTextureTransform=!1,this.hasNormalTextureTransform=!1,this.hasOcclusionTextureTransform=!1,this.hasMetallicRoughnessTextureTransform=!1,this.occlusionPass=!1,this.useCustomDTRExponentForWater=!1,this.useFillLights=!0,this.draped=!1}get textureCoordinateType(){return+!!this.hasTextures}get hasTextures(){return this.hasColorTexture||this.hasNormalTexture||this.hasMetallicRoughnessTexture||this.emissionSource===3||this.hasOcclusionTexture}get hasVVInstancing(){return this.instanced}get discardInvisibleFragments(){return this.transparent}};f([V({count:4})],$.prototype,`alphaDiscardMode`,void 0),f([V({count:3})],$.prototype,`doubleSidedMode`,void 0),f([V({count:7})],$.prototype,`pbrMode`,void 0),f([V({count:3})],$.prototype,`cullFace`,void 0),f([V({count:3})],$.prototype,`normalType`,void 0),f([V({count:3})],$.prototype,`customDepthTest`,void 0),f([V({count:8})],$.prototype,`emissionSource`,void 0),f([V()],$.prototype,`hasVertexColors`,void 0),f([V()],$.prototype,`hasSymbolColors`,void 0),f([V()],$.prototype,`hasVerticalOffset`,void 0),f([V()],$.prototype,`hasColorTexture`,void 0),f([V()],$.prototype,`hasMetallicRoughnessTexture`,void 0),f([V()],$.prototype,`hasOcclusionTexture`,void 0),f([V()],$.prototype,`hasNormalTexture`,void 0),f([V()],$.prototype,`hasScreenSizePerspective`,void 0),f([V()],$.prototype,`hasVertexTangents`,void 0),f([V()],$.prototype,`hasOccludees`,void 0),f([V()],$.prototype,`instanced`,void 0),f([V()],$.prototype,`instancedDoublePrecision`,void 0),f([V()],$.prototype,`hasModelTransformation`,void 0),f([V()],$.prototype,`offsetBackfaces`,void 0),f([V()],$.prototype,`hasVVSize`,void 0),f([V()],$.prototype,`hasVVColor`,void 0),f([V()],$.prototype,`receiveShadows`,void 0),f([V()],$.prototype,`receiveAmbientOcclusion`,void 0),f([V()],$.prototype,`textureAlphaPremultiplied`,void 0),f([V()],$.prototype,`instancedFeatureAttribute`,void 0),f([V()],$.prototype,`instancedColor`,void 0),f([V()],$.prototype,`writeDepth`,void 0),f([V()],$.prototype,`transparent`,void 0),f([V()],$.prototype,`enableOffset`,void 0),f([V()],$.prototype,`terrainDepthTest`,void 0),f([V()],$.prototype,`cullAboveTerrain`,void 0),f([V()],$.prototype,`snowCover`,void 0),f([V()],$.prototype,`hasColorTextureTransform`,void 0),f([V()],$.prototype,`hasEmissionTextureTransform`,void 0),f([V()],$.prototype,`hasNormalTextureTransform`,void 0),f([V()],$.prototype,`hasOcclusionTextureTransform`,void 0),f([V()],$.prototype,`hasMetallicRoughnessTextureTransform`,void 0);var Sr=class extends vr{constructor(){super(...arguments),this.shader=new st(rr,()=>y(()=>import(`./RealisticTree.glsl-D9cSq_IA-DWtfP_Wv.js`),__vite__mapDeps([28,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]),import.meta.url))}};Sr=f([x(`esri.views.3d.webgl-engine.shaders.RealisticTreeTechnique`)],Sr);var Cr=class extends et{constructor(e,t){super(e,Tr),this.materialType=`default`,this.supportsEdges=!0,this.intersectDraped=void 0,this.produces=new Map([[2,e=>(Ce(e)||Te(e))&&!this.transparent],[4,e=>(Ce(e)||Te(e))&&this.transparent&&this.parameters.writeDepth],[9,e=>(Ce(e)||Te(e))&&this.transparent&&!this.parameters.writeDepth]]),this._layout=xr(this.parameters),this._configuration=new $(t.spherical)}isVisibleForOutput(e){return e!==3&&e!==5&&e!==4||this.parameters.castShadows}get visible(){let{layerOpacity:e,colorMixMode:t,opacity:n,externalColor:r}=this.parameters;return e*(t===`replace`?1:n)*(t===`ignore`||isNaN(r[3])?1:r[3])>=H}get _hasEmissiveBase(){return!!this.parameters.emissiveTextureId||!a(this.parameters.emissiveBaseColor,fe)}get hasEmissions(){return this.parameters.emissiveStrength>0&&(this.parameters.emissiveSource===0&&this._hasEmissiveBase||this.parameters.emissiveSource===1)}getConfiguration(e,t){let{parameters:n,_configuration:r}=this,{treeRendering:i,doubleSided:a,doubleSidedType:o}=n;return super.getConfiguration(e,t,this._configuration),r.hasNormalTexture=n.hasNormalTexture,r.hasColorTexture=n.hasColorTexture,r.hasMetallicRoughnessTexture=n.hasMetallicRoughnessTexture,r.hasOcclusionTexture=n.hasOcclusionTexture,r.hasVertexTangents=!i&&n.hasVertexTangents,r.instanced=n.instanced,r.instancedDoublePrecision=n.instancedDoublePrecision,r.hasVVColor=!!n.vvColor,r.hasVVSize=!!n.vvSize,r.hasVerticalOffset=n.verticalOffset!=null,r.hasScreenSizePerspective=n.screenSizePerspective!=null,r.hasSlicePlane=n.hasSlicePlane,r.alphaDiscardMode=n.textureAlphaMode,r.normalType=i?0:n.normalType,r.transparent=this.transparent,r.writeDepth=n.writeDepth,r.customDepthTest=n.customDepthTest??0,r.hasOccludees=t.hasOccludees,r.cullFace=n.hasSlicePlane?0:n.cullFace,r.cullAboveTerrain=t.cullAboveTerrain,r.hasModelTransformation=!i&&n.modelTransformation!=null,r.hasVertexColors=n.hasVertexColors,r.hasSymbolColors=n.hasSymbolColors,r.doubleSidedMode=i?2:a&&o===`normal`?1:a&&o===`winding-order`?2:0,r.instancedFeatureAttribute=n.instancedFeatureAttribute,r.instancedColor=n.instancedColor,O(e)?(r.terrainDepthTest=t.terrainDepthTest,r.receiveShadows=n.receiveShadows,r.receiveAmbientOcclusion=n.receiveAmbientOcclusion&&t.ssao!=null):(r.terrainDepthTest=!1,r.receiveShadows=r.receiveAmbientOcclusion=!1),r.textureAlphaPremultiplied=!!n.textureAlphaPremultiplied,r.pbrMode=n.usePBR?n.isSchematic?2:1:0,r.emissionSource=n.emissionSource,r.offsetBackfaces=!(!this.transparent||!n.offsetTransparentBackfaces),r.enableOffset=t.enableOffset,r.snowCover=t.snowCover>0,r.hasColorTextureTransform=!!n.colorTextureTransformMatrix,r.hasNormalTextureTransform=!!n.normalTextureTransformMatrix,r.hasEmissionTextureTransform=!!n.emissiveTextureTransformMatrix,r.hasOcclusionTextureTransform=!!n.occlusionTextureTransformMatrix,r.hasMetallicRoughnessTextureTransform=!!n.metallicRoughnessTextureTransformMatrix,r}intersect(e,t,n,r,a,o){if(this.parameters.verticalOffset!=null){let e=n.camera;v(Mr,t[12],t[13],t[14]);let o=null;switch(n.viewingMode){case 1:o=te(Ar,Mr);break;case 2:o=g(Ar,kr)}let s=i(Nr,Mr,e.eye),c=ge(s),l=re(s,s,1/c),u=null;this.parameters.screenSizePerspective&&(u=de(o,l));let d=Ze(e,c,this.parameters.verticalOffset,u??0,this.parameters.screenSizePerspective,null);re(o,o,d),pe(jr,o,n.transform.inverseRotation),r=i(Dr,r,jr),a=i(Or,a,jr)}gt(e,n,r,a,bt(n.verticalOffset),o)}createGLMaterial(e){return new wr(e)}createBufferWriter(){return new ze(this._layout)}get transparent(){return Er(this.parameters)}},wr=class extends Ie{constructor(e){super({...e,...e.material.parameters})}beginSlot(e){this._material.setParameters({receiveShadows:e.shadowMap.enabled});let t=this._material.parameters;this.updateTexture(t.textureId);let n=e.camera.viewInverseTransposeMatrix;return v(t.origin,n[3],n[7],n[11]),this._material.setParameters(this.textureBindParameters),this.getTechnique(t.treeRendering?Sr:vr,e)}},Tr=class extends gr{constructor(){super(...arguments),this.treeRendering=!1,this.hasVertexTangents=!1}get hasNormalTexture(){return!this.treeRendering&&!!this.normalTextureId}get hasColorTexture(){return!!this.textureId}get hasMetallicRoughnessTexture(){return!this.treeRendering&&!!this.metallicRoughnessTextureId}get hasOcclusionTexture(){return!this.treeRendering&&!!this.occlusionTextureId}get emissiveStrength(){return this.emissiveStrengthFromSymbol*this.emissiveStrengthKHR}get emissionSource(){return this.treeRendering?0:this.emissiveTextureId!=null&&this.emissiveSource===0?3:this.emissiveSource===0?2:1}get hasTextures(){return this.hasColorTexture||this.hasNormalTexture||this.hasMetallicRoughnessTexture||this.emissionSource===3||this.hasOcclusionTexture}};function Er(e){let{drivenOpacity:t,opacity:n,externalColor:r,layerOpacity:i,texture:a,textureId:o,textureAlphaMode:s,colorMixMode:c}=e,l=r[3];return t||n<1&&c!==`replace`||l<1&&c!==`ignore`||i<1||(a!=null||o!=null)&&s!==1&&s!==2&&c!==`replace`}var Dr=m(),Or=m(),kr=ie(0,0,1),Ar=m(),jr=m(),Mr=m(),Nr=m();export{K as A,nn as C,zt as D,Bt as E,Rt as O,sn as S,q as T,Mn as _,X as a,fn as b,Kn as c,hn as d,kn as f,Dn as g,_n as h,pr as i,Gt as k,An as l,mn as m,hr as n,nr as o,gn as p,_r as r,er as s,Cr as t,vn as u,Nn as v,Kt as w,cn as x,jn as y};