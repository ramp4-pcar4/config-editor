import{v as z,dh as ut,J as dt,b9 as pt,ay as ft,du as G,gL as ht}from"./index-DBm8NF9m.js";import{a as gt}from"./floatRGBA-DRFmbkvz-pefbXiqw.js";import{m as mt,r as vt,f as Se,a as Fe,o as pe}from"./vec4f64-DD-nkcCV-CSNWKRqG.js";import{q as St,n as xt,d as Ct,f as Ot,U as bt,y as Pt,g as Re,_ as ge,O as Ie,h as we,t as At,o as Tt,b as yt,x as q,c as zt,a as Et,k as Ft,m as oe,p as E,D as Rt,r as It,K as wt,s as Dt,z as _t,v as $t,w as Mt,A as W,u as Lt,B as Ge,C as Ye,F as jt,H as Nt,Y as Ut,I as Bt,N as Vt,V as qt,W as Ht,S as Gt,P as De,Q as _e,R as Yt,Z as Zt,$ as kt,a0 as $e,a1 as Wt,a2 as Xt,a3 as Qt,a4 as Kt}from"./OutputColorHighlightOID.glsl-BdXTjs7_-BmsBOK5J.js";import{U as Me,T as Le,L as Jt}from"./enums-wEDHPbCF-Cf76M5_x.js";import{P as Ze}from"./mat3-DOnW3DjW-C3hbW9XY.js";import{n as ke}from"./mat3f64-BnNZDR5l-Bz3OL2oI.js";import{z as We}from"./mat4-OOmHNWi7-rAOvaUXo.js";import{n as eo}from"./mat4f64-xsZDPPj0-Dq35B4BL.js";import{m as Te,d as to,z as oo}from"./vec2-BnynUbeJ-CKtGJQAy.js";import{o as ye,r as Xe}from"./vec2f64-CkowXrDb-3zFQ3LNH.js";import{A as le,Y as X,l as xe,r as Qe,L as H,_ as Y,b as re,g as Ke,P as ze,k as io,Z as ro,y as ao}from"./vec32-Cj8pVsU0-CrN2kET8.js";import{c as so,U as no,T as je,E as lo,x as co,L as Ne}from"./BufferView-wDxx79o3-BHYF8R-2.js";import{e as uo}from"./InterleavedLayout-C2YUDwKf-BdkWA7b4.js";import{o as U,u as me,h as Je}from"./ShaderOutput-CUn9tpiG-CW1Nc608.js";import{b as po,s as fo,S as ho,j as et,F as go}from"./dehydratedFeatureUtils-OR1UjA48-D8Zmtd6H.js";import{T as u}from"./VertexAttribute-hUz6pozM-Bx3V-z96.js";import{K as mo,D as vo,N as So,m as xo}from"./renderState-BM-MCKUz-CkGIEsl7.js";import{e as d,u as R}from"./glsl-Z5uYj8ka-BRgh2Cgo.js";import{n as Co}from"./BindType-CKbZk6AG-Bqvzo9NX.js";import"./vec42-D8CJyqHG-DnfLTeQH.js";import{v as Oo}from"./ShaderBuilder-CU5v4tk1-Gnlm1V-g.js";let bo=class extends Rt{constructor(e,t){super(e,"vec4",Co.Draw,(o,i,r)=>o.setUniform4fv(e,t(i,r)))}};const Ee=128,k=.5,xi=Se(k/2,k/2,1-k/2,1-k/2);function Ci(e){return e==="cross"||e==="x"}function Oi(e,t=Ee,o=t*k,i=0){const{data:r,parameters:s}=Po(e,t,o,i);return new $t(r,s)}function Po(e,t=Ee,o=t*k,i=0){return{data:Ao(e,t,o,i),parameters:{mipmap:!1,wrap:{s:Me.CLAMP_TO_EDGE,t:Me.CLAMP_TO_EDGE},width:t,height:t,components:4,noUnpackFlip:!0,reloadable:!0}}}function Ao(e,t=Ee,o=t*k,i=0){switch(e){case"circle":default:return To(t,o);case"square":return yo(t,o);case"cross":return Eo(t,o,i);case"x":return Fo(t,o,i);case"kite":return zo(t,o);case"triangle":return Ro(t,o);case"arrow":return Io(t,o)}}function To(e,t){const o=e/2-.5;return se(e,it(o,o,t/2))}function yo(e,t){return tt(e,t,!1)}function zo(e,t){return tt(e,t,!0)}function Eo(e,t,o=0){return ot(e,t,!1,o)}function Fo(e,t,o=0){return ot(e,t,!0,o)}function Ro(e,t){return se(e,rt(e/2,t,t/2))}function Io(e,t){const o=t,i=t/2,r=e/2,s=.8*o,a=it(r,(e-t)/2-s,Math.sqrt(s*s+i*i)),c=rt(r,o,i);return se(e,(l,n)=>Math.max(c(l,n),-a(l,n)))}function tt(e,t,o){return o&&(t/=Math.SQRT2),se(e,(i,r)=>{let s=i-.5*e+.25,a=.5*e-r-.75;if(o){const c=(s+a)/Math.SQRT2;a=(a-s)/Math.SQRT2,s=c}return Math.max(Math.abs(s),Math.abs(a))-.5*t})}function ot(e,t,o,i=0){t-=i,o&&(t*=Math.SQRT2);const r=.5*t;return se(e,(s,a)=>{let c,l=s-.5*e,n=.5*e-a-1;if(o){const f=(l+n)/Math.SQRT2;n=(n-l)/Math.SQRT2,l=f}return l=Math.abs(l),n=Math.abs(n),c=l>n?l>r?Math.sqrt((l-r)*(l-r)+n*n):n:n>r?Math.sqrt(l*l+(n-r)*(n-r)):l,c-=i/2,c})}function it(e,t,o){return(i,r)=>{const s=i-e,a=r-t;return Math.sqrt(s*s+a*a)-o}}function rt(e,t,o){const i=Math.sqrt(t*t+o*o);return(r,s)=>{const a=Math.abs(r-e)-o,c=s-e+t/2+.75,l=(t*a+o*c)/i,n=-c;return Math.max(l,n)}}function se(e,t){const o=new Uint8Array(4*e*e);for(let i=0;i<e;i++)for(let r=0;r<e;r++){const s=r+e*i;let a=t(r,i);a=a/e+.5,gt(a,o,4*s)}return o}function wo(e){return e instanceof Float32Array&&e.length>=16}function Do(e){return Array.isArray(e)&&e.length>=16}function _o(e){return wo(e)||Do(e)}class $o{constructor(){this.factor=new Ue,this.factorAlignment=new Ue}}class Ue{constructor(){this.scale=0,this.factor=0,this.minScaleFactor=0}}function Mo(e,t){const{vertex:o,fragment:i}=e;e.include(It,t),o.include(et),o.main.add(d`vec4 posProjCenter;
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
gl_PointSize = 1.0;`),i.main.add(d`fragColor = vec4(1);
if(discardByTerrainDepth()) {
fragColor.g = 0.5;
}`)}function at(e){const t=new Oo,{signedDistanceFieldEnabled:o,occlusionTestEnabled:i,horizonCullingEnabled:r,pixelSnappingEnabled:s,hasScreenSizePerspective:a,debugDrawLabelBorder:c,vvSize:l,vvColor:n,hasRotation:f,occludedFragmentFade:v,sampleSignedDistanceFieldTexelCenter:g}=e;t.include(po,e),t.vertex.include(St,e);const{occlusionPass:T,output:D,oitPass:y}=e;if(T)return t.include(Mo,e),t;const{vertex:x,fragment:b}=t;t.include(xt),t.include(Ct,e),t.include(Ot,e),i&&t.include(fo),b.include(ho),b.include(bt),t.varyings.add("vcolor","vec4"),t.varyings.add("vtc","vec2"),t.varyings.add("vsize","vec2");const P=D===U.Highlight,_=P&&i;_&&t.varyings.add("voccluded","float"),x.uniforms.add(new Pt("viewport",p=>p.camera.fullViewport),new Re("screenOffset",(p,j)=>Te(ce,2*p.screenOffset[0]*j.camera.pixelRatio,2*p.screenOffset[1]*j.camera.pixelRatio)),new Re("anchorPosition",p=>K(p)),new ge("materialColor",p=>p.color),new Ie("materialRotation",p=>p.rotation),new we("tex",p=>p.texture)),At(x),o&&(x.uniforms.add(new ge("outlineColor",p=>p.outlineColor)),b.uniforms.add(new ge("outlineColor",p=>Be(p)?p.outlineColor:mt),new Ie("outlineSize",p=>Be(p)?p.outlineSize:0))),r&&x.uniforms.add(new bo("pointDistanceSphere",(p,j)=>{const O=j.camera.eye,w=p.origin;return vt(w[0]-O[0],w[1]-O[1],w[2]-O[2],ut.radius)})),s&&x.include(et),a&&(Tt(x),yt(x)),c&&t.varyings.add("debugBorderCoords","vec4"),t.attributes.add(u.UVI,"vec2"),t.attributes.add(u.COLOR,"vec4"),t.attributes.add(u.SIZE,"vec2"),t.attributes.add(u.ROTATION,"float"),(l||n)&&t.attributes.add(u.FEATUREATTRIBUTE,"vec4"),x.code.add(r?d`bool behindHorizon(vec3 posModel) {
vec3 camToEarthCenter = pointDistanceSphere.xyz - localOrigin;
vec3 camToPos = pointDistanceSphere.xyz + posModel;
float earthRadius = pointDistanceSphere.w;
float a = dot(camToPos, camToPos);
float b = dot(camToPos, camToEarthCenter);
float c = dot(camToEarthCenter, camToEarthCenter) - earthRadius * earthRadius;
return b > 0.0 && b < a && b * b  > a * c;
}`:d`bool behindHorizon(vec3 posModel) { return false; }`),x.main.add(d`
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
    ${R(a,d`
        inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
        vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);`,d`
        inputSize = size;
        vec2 screenOffsetScaled = screenOffset;`)}
    ${R(l,d`inputSize *= vvScale(featureAttribute).xx;`)}

    vec2 combinedSize = inputSize * pixelRatio;
    vec4 quadOffset = vec4(0.0);

    ${R(i,d`
    bool visible = testHUDVisibility(posProj);
    if (!visible) {
      vtc = vec2(0.0);
      ${R(c,"debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);")}
      return;
    }`)}
    ${R(_,d`voccluded = visible ? 0.0 : 1.0;`)}
  `);const I=d`
      vec2 uvi1 = vec2(uvi.x < 0.0 ? 1.0 : 0.0, uvi.y < 0.0 ? 1.0 : 0.0);
      vec2 uv = abs(uvi + uvi1);
      vec2 texSize = vec2(textureSize(tex, 0));
      uv.x = uv.x >= ${Ve} ? 1.0 : uv.x / texSize.x;
      uv.y = uv.y >= ${Ve} ? 1.0 : uv.y / texSize.y;
      quadOffset.xy = (uvi1 - anchorPosition) * 2.0 * combinedSize;

      ${R(f,d`
          float angle = radians(materialRotation + rotation);
          float cosAngle = cos(angle);
          float sinAngle = sin(angle);
          mat2 rotate = mat2(cosAngle, -sinAngle, sinAngle,  cosAngle);

          quadOffset.xy = rotate * quadOffset.xy;
        `)}

      quadOffset.xy = (quadOffset.xy + screenOffsetScaled) / viewport.zw * posProj.w;
  `,S=s?o?d`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:d`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:d`posProj += quadOffset;`;x.main.add(d`
    ${I}
    ${n?"vcolor = interpolateVVColor(featureAttribute.y) * materialColor;":"vcolor = color / 255.0 * materialColor;"}

    ${R(D===U.ObjectAndLayerIdColor,d`vcolor.a = 1.0;`)}

    bool alphaDiscard = vcolor.a < ${d.float(q)};
    ${R(o,`alphaDiscard = alphaDiscard && outlineColor.a < ${d.float(q)};`)}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${S}
      gl_Position = posProj;
    }

    vtc = uv;

    ${R(c,d`debugBorderCoords = vec4(uv01, 1.5 / combinedSize);`)}
    vsize = inputSize;
  `),b.uniforms.add(new we("tex",p=>p.texture)),v&&!P&&b.uniforms.add(new zt("depthMap",p=>p.mainDepth),new Et("occludedOpacity",p=>p.hudOccludedFragmentOpacity));const L=c?d`(isBorder > 0.0 ? 0.0 : ${d.float(q)})`:d.float(q),$=d`
    ${R(c,d`float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`)}

    vec2 samplePos = vtc;

    ${R(g,d`
      float txSize = float(textureSize(tex, 0).x);
      float texelSize = 1.0 / txSize;

      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      samplePos += (vec2(1.0, -1.0) * texelSize) * scaleFactor;`)}

    ${o?d`
      vec4 fillPixelColor = vcolor;

      // Get distance and map it into [-0.5, 0.5]
      float d = rgbaTofloat(texture(tex, samplePos)) - 0.5;

      // Distance in output units (i.e. pixels)
      float dist = d * vsize.x;

      // Create smooth transition from the icon into its outline
      float fillAlphaFactor = clamp(0.5 - dist, 0.0, 1.0);
      fillPixelColor.a *= fillAlphaFactor;

      if (outlineSize > 0.25) {
        vec4 outlinePixelColor = outlineColor;
        float clampedOutlineSize = min(outlineSize, 0.5*vsize.x);

        // Create smooth transition around outline
        float outlineAlphaFactor = clamp(0.5 - (abs(dist) - 0.5*clampedOutlineSize), 0.0, 1.0);
        outlinePixelColor.a *= outlineAlphaFactor;

        if (
          outlineAlphaFactor + fillAlphaFactor < ${L} ||
          fillPixelColor.a + outlinePixelColor.a < ${d.float(q)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
          vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        ${R(!P,d`fragColor = vec4(compositeColor, compositeAlpha);`)}
      } else {
        if (fillAlphaFactor < ${L}) {
          discard;
        }

        ${R(!P,d`fragColor = premultiplyAlpha(fillPixelColor);`)}
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-dist/vsize.x*2.0, 0.0, 1.0), clamp(dist/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:d`
          vec4 texColor = texture(tex, samplePos, -0.5);
          if (texColor.a < ${L}) {
            discard;
          }
          ${R(!P,d`fragColor = texColor * premultiplyAlpha(vcolor);`)}
          `}

    ${R(v&&!P,d`
        float zSample = texelFetch(depthMap, ivec2(gl_FragCoord.xy), 0).x;
        if (zSample < gl_FragCoord.z) {
          fragColor *= occludedOpacity;
        }
        `)}

    ${R(!P&&c,d`fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);`)}
  `;switch(D){case U.Color:case U.ColorEmission:t.outputs.add("fragColor","vec4",0),D===U.ColorEmission&&t.outputs.add("fragEmission","vec4",1),y===oe.ColorAlpha&&t.outputs.add("fragAlpha","float",D===U.ColorEmission?2:1),b.main.add(d`
        ${$}
        ${R(y===oe.FrontFace,d`fragColor.rgb /= fragColor.a;`)}
        ${R(D===U.ColorEmission,d`fragEmission = vec4(0.0);`)}
        ${R(y===oe.ColorAlpha,d`fragAlpha = fragColor.a;`)}`);break;case U.ObjectAndLayerIdColor:b.main.add(d`
        ${$}
        outputObjectAndLayerIdColor();`);break;case U.Highlight:t.include(Ft,e),b.main.add(d`
        ${$}
        outputHighlight(${R(_,d`voccluded == 1.0`,d`false`)});`)}return t}function Be(e){return e.outlineColor[3]>0&&e.outlineSize>0}function K(e){return e.textureIsSignedDistanceField?Lo(e.anchorPosition,e.distanceFieldBoundingBox,ce):to(ce,e.anchorPosition),ce}function Lo(e,t,o){Te(o,e[0]*(t[2]-t[0])+t[0],e[1]*(t[3]-t[1])+t[1])}const ce=ye(),ae=32e3,Ve=d.float(ae),jo=Object.freeze(Object.defineProperty({__proto__:null,build:at,calculateAnchorPosition:K,fullUV:ae},Symbol.toStringTag,{value:"Module"}));class No extends Wt{constructor(t,o){super(t,o,new Xt(jo,()=>Promise.resolve().then(()=>Xo))),this.primitiveType=o.occlusionPass?Le.POINTS:Le.TRIANGLES}initializePipeline(t){const{oitPass:o,hasPolygonOffset:i,draped:r,output:s,depthTestEnabled:a,occlusionPass:c}=t,l=o===oe.NONE,n=o===oe.ColorAlpha,f=s===U.Highlight,v=a&&!r&&!n&&!c&&!f;return mo({blending:Je(s)?l?vo:Qt(o):null,depthTest:a&&!r?{func:Jt.LEQUAL}:null,depthWrite:v?So:null,drawBuffers:Kt(o,s),colorWrite:xo,polygonOffset:i?Uo:null})}}const Uo={factor:0,units:-4};class A extends wt{constructor(t){super(),this.spherical=t,this.screenCenterOffsetUnitsEnabled=!1,this.occlusionTestEnabled=!0,this.signedDistanceFieldEnabled=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.vvSize=!1,this.vvColor=!1,this.hasVerticalOffset=!1,this.hasScreenSizePerspective=!1,this.hasRotation=!1,this.debugDrawLabelBorder=!1,this.hasPolygonOffset=!1,this.depthTestEnabled=!0,this.pixelSnappingEnabled=!0,this.draped=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.occlusionPass=!1,this.occludedFragmentFade=!1,this.objectAndLayerIdColorInstanced=!1,this.horizonCullingEnabled=!0,this.isFocused=!0,this.textureCoordinateType=Dt.None,this.emissionSource=_t.None,this.discardInvisibleFragments=!0,this.hasVvInstancing=!1,this.snowCover=!1}}z([E()],A.prototype,"screenCenterOffsetUnitsEnabled",void 0),z([E()],A.prototype,"occlusionTestEnabled",void 0),z([E()],A.prototype,"signedDistanceFieldEnabled",void 0),z([E()],A.prototype,"sampleSignedDistanceFieldTexelCenter",void 0),z([E()],A.prototype,"vvSize",void 0),z([E()],A.prototype,"vvColor",void 0),z([E()],A.prototype,"hasVerticalOffset",void 0),z([E()],A.prototype,"hasScreenSizePerspective",void 0),z([E()],A.prototype,"hasRotation",void 0),z([E()],A.prototype,"debugDrawLabelBorder",void 0),z([E()],A.prototype,"hasPolygonOffset",void 0),z([E()],A.prototype,"depthTestEnabled",void 0),z([E()],A.prototype,"pixelSnappingEnabled",void 0),z([E()],A.prototype,"draped",void 0),z([E()],A.prototype,"terrainDepthTest",void 0),z([E()],A.prototype,"cullAboveTerrain",void 0),z([E()],A.prototype,"occlusionPass",void 0),z([E()],A.prototype,"occludedFragmentFade",void 0),z([E()],A.prototype,"objectAndLayerIdColorInstanced",void 0),z([E()],A.prototype,"horizonCullingEnabled",void 0),z([E()],A.prototype,"isFocused",void 0);let bi=class extends Mt{constructor(e,t){super(e,Zo),this.produces=new Map([[W.HUD_MATERIAL,o=>me(o)&&!this.parameters.drawAsLabel],[W.LABEL_MATERIAL,o=>me(o)&&this.parameters.drawAsLabel],[W.OCCLUSION_PIXELS,()=>this.parameters.occlusionTest],[W.DRAPED_MATERIAL,o=>this.parameters.draped&&me(o)]]),this._visible=!0,this._configuration=new A(t)}getConfiguration(e,t){const o=this.parameters.draped;return super.getConfiguration(e,t,this._configuration),this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasVerticalOffset=!!this.parameters.verticalOffset,this._configuration.hasScreenSizePerspective=!!this.parameters.screenSizePerspective,this._configuration.screenCenterOffsetUnitsEnabled=this.parameters.centerOffsetUnits==="screen",this._configuration.hasPolygonOffset=this.parameters.polygonOffset,this._configuration.draped=o,this._configuration.occlusionTestEnabled=this.parameters.occlusionTest,this._configuration.pixelSnappingEnabled=this.parameters.pixelSnappingEnabled,this._configuration.signedDistanceFieldEnabled=this.parameters.textureIsSignedDistanceField,this._configuration.sampleSignedDistanceFieldTexelCenter=this.parameters.sampleSignedDistanceFieldTexelCenter,this._configuration.hasRotation=this.parameters.hasRotation,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.occlusionPass=t.slot===W.OCCLUSION_PIXELS,this._configuration.occludedFragmentFade=!o&&this.parameters.occludedFragmentFade,this._configuration.horizonCullingEnabled=this.parameters.horizonCullingEnabled,this._configuration.isFocused=this.parameters.isFocused,this._configuration.depthTestEnabled=this.parameters.depthEnabled||t.slot===W.OCCLUSION_PIXELS,Je(e)&&(this._configuration.debugDrawLabelBorder=!!Lt.LABELS_SHOW_BORDER),this._configuration.oitPass=t.oitPass,this._configuration.terrainDepthTest=t.terrainDepthTest,this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration}intersect(e,t,o,i,r,s){const{options:{selectionMode:a,hud:c,excludeLabels:l},point:n,camera:f}=o,{parameters:v}=this;if(!a||!c||l&&v.isLabel||!e.visible||!n||!f)return;const g=e.attributes.get(u.FEATUREATTRIBUTE),T=g==null?null:Fe(g.data,be),{scaleX:D,scaleY:y}=Pe(T,v,f.pixelRatio);Ze(ue,t),e.attributes.has(u.FEATUREATTRIBUTE)&&qo(ue);const x=e.attributes.get(u.POSITION),b=e.attributes.get(u.SIZE),P=e.attributes.get(u.NORMAL),_=e.attributes.get(u.ROTATION),I=e.attributes.get(u.CENTEROFFSETANDDISTANCE);so(x.size>=3);const S=K(v),L=this.parameters.centerOffsetUnits==="screen";for(let $=0;$<x.data.length/x.size;$++){const p=$*x.size;le(h,x.data[p],x.data[p+1],x.data[p+2]),X(h,h,t),X(h,h,f.viewMatrix);const j=$*I.size;if(le(C,I.data[j],I.data[j+1],I.data[j+2]),!L&&(h[0]+=C[0],h[1]+=C[1],C[2]!==0)){const w=C[2];xe(C,h),Qe(h,h,H(C,C,w))}const O=$*P.size;if(le(Z,P.data[O],P.data[O+1],P.data[O+2]),Ce(Z,ue,f,ie),Ae(this.parameters,h,ie,f,Q),f.applyProjection(h,m),m[0]>-1){L&&(C[0]||C[1])&&(m[0]+=C[0]*f.pixelRatio,C[1]!==0&&(m[1]+=Ge(C[1],Q.factorAlignment)*f.pixelRatio),f.unapplyProjection(m,h)),m[0]+=this.parameters.screenOffset[0]*f.pixelRatio,m[1]+=this.parameters.screenOffset[1]*f.pixelRatio,m[0]=Math.floor(m[0]),m[1]=Math.floor(m[1]);const w=$*b.size;F[0]=b.data[w],F[1]=b.data[w+1],Ye(F,Q.factor,F);const B=lt*f.pixelRatio;let V=0;v.textureIsSignedDistanceField&&(V=Math.min(v.outlineSize,.5*F[0])*f.pixelRatio/2),F[0]*=D,F[1]*=y;const fe=$*_.size,he=v.rotation+_.data[fe];if(Oe(n,m[0],m[1],F,B,V,he,v,S)){const J=o.ray;if(X(de,h,We(nt,f.viewMatrix)),m[0]=n[0],m[1]=n[1],f.unprojectFromRenderScreen(m,h)){const N=G();Y(N,J.direction);const ee=1/re(N);H(N,N,ee),s(Ke(J.origin,h)*ee,N,-1,de)}}}}}intersectDraped(e,t,o,i,r){const s=e.attributes.get(u.POSITION),a=e.attributes.get(u.SIZE),c=e.attributes.get(u.ROTATION),l=this.parameters,n=K(l),f=e.attributes.get(u.FEATUREATTRIBUTE),v=f==null?null:Fe(f.data,be),{scaleX:g,scaleY:T}=Pe(v,l,e.screenToWorldRatio),D=Go*e.screenToWorldRatio;for(let y=0;y<s.data.length/s.size;y++){const x=y*s.size,b=s.data[x],P=s.data[x+1],_=y*a.size;F[0]=a.data[_],F[1]=a.data[_+1];let I=0;l.textureIsSignedDistanceField&&(I=Math.min(l.outlineSize,.5*F[0])*e.screenToWorldRatio/2),F[0]*=g,F[1]*=T;const S=y*c.size,L=l.rotation+c.data[S];Oe(o,b,P,F,D,I,L,l,n)&&i(r.distance,r.normal,-1)}}createBufferWriter(){return new Wo}applyShaderOffsetsView(e,t,o,i,r,s,a){const c=Ce(t,o,r,ie);return this._applyVerticalGroundOffsetView(e,c,r,a),Ae(this.parameters,a,c,r,s),this._applyPolygonOffsetView(a,c,i[3],r,a),this._applyCenterOffsetView(a,i,a),a}applyShaderOffsetsNDC(e,t,o,i,r){return this._applyCenterOffsetNDC(e,t,o,i),r!=null&&Y(r,i),this._applyPolygonOffsetNDC(i,t,o,i),i}_applyPolygonOffsetView(e,t,o,i,r){const s=i.aboveGround?1:-1;let a=Math.sign(o);a===0&&(a=s);const c=s*a;if(this.parameters.shaderPolygonOffset<=0)return Y(r,e);const l=dt(Math.abs(t.cosAngle),.01,1),n=1-Math.sqrt(1-l*l)/l/i.viewport[2];return H(r,e,c>0?n:1/n),r}_applyVerticalGroundOffsetView(e,t,o,i){const r=re(e),s=o.aboveGround?1:-1,a=o.computeRenderPixelSizeAtDist(r)*go,c=H(h,t.normal,s*a);return ze(i,e,c),i}_applyCenterOffsetView(e,t,o){const i=this.parameters.centerOffsetUnits!=="screen";return o!==e&&Y(o,e),i&&(o[0]+=t[0],o[1]+=t[1],t[2]&&(xe(Z,o),io(o,o,H(Z,Z,t[2])))),o}_applyCenterOffsetNDC(e,t,o,i){const r=this.parameters.centerOffsetUnits!=="screen";return i!==e&&Y(i,e),r||(i[0]+=t[0]/o.fullWidth*2,i[1]+=t[1]/o.fullHeight*2),i}_applyPolygonOffsetNDC(e,t,o,i){const r=this.parameters.shaderPolygonOffset;if(e!==i&&Y(i,e),r){const s=o.aboveGround?1:-1,a=s*Math.sign(t[3]);i[2]-=(a||s)*r}return i}set visible(e){this._visible=e}get visible(){const{color:e,outlineSize:t,outlineColor:o}=this.parameters,i=e[3]>=q||t>=q&&o[3]>=q;return this._visible&&i}createGLMaterial(e){return new Bo(e)}calculateRelativeScreenBounds(e,t,o=pt()){return Vo(this.parameters,e,t,o),o[2]=o[0]+e[0],o[3]=o[1]+e[1],o}};class Bo extends jt{constructor(t){super({...t,...t.material.parameters})}beginSlot(t){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.getTechnique(No,t)}}function Vo(e,t,o,i){i[0]=e.anchorPosition[0]*-t[0]+e.screenOffset[0]*o,i[1]=e.anchorPosition[1]*-t[1]+e.screenOffset[1]*o}function Ce(e,t,o,i){return _o(t)&&(t=Ze(Ho,t)),ro(i.normal,e,t),X(i.normal,i.normal,o.viewInverseTransposeMatrix),i.cosAngle=ao(st,Yo),i}function qo(e){const t=e[0],o=e[1],i=e[2],r=e[3],s=e[4],a=e[5],c=e[6],l=e[7],n=e[8],f=1/Math.sqrt(t*t+o*o+i*i),v=1/Math.sqrt(r*r+s*s+a*a),g=1/Math.sqrt(c*c+l*l+n*n);return e[0]=t*f,e[1]=o*f,e[2]=i*f,e[3]=r*v,e[4]=s*v,e[5]=a*v,e[6]=c*g,e[7]=l*g,e[8]=n*g,e}function Oe(e,t,o,i,r,s,a,c,l){let n=t-r-i[0]*l[0],f=n+i[0]+2*r,v=o-r-i[1]*l[1],g=v+i[1]+2*r;const T=c.distanceFieldBoundingBox;return c.textureIsSignedDistanceField&&T!=null&&(n+=i[0]*T[0],v+=i[1]*T[1],f-=i[0]*(1-T[2]),g-=i[1]*(1-T[3]),n-=s,f+=s,v-=s,g+=s),Te(qe,t,o),oo(te,e,qe,ft(a)),te[0]>n&&te[0]<f&&te[1]>v&&te[1]<g}const Q=new $o,h=G(),Z=G(),m=pe(),st=G(),de=G(),te=ye(),qe=ye(),ue=ke(),Ho=ke(),nt=eo(),ne=pe(),C=G(),ve=G(),be=pe(),ie={normal:st,cosAngle:0},lt=1,Go=2,F=Xe(0,0),M=6,Yo=ht(0,0,1);class Zo extends Nt{constructor(){super(...arguments),this.renderOccluded=Ut.Occlude,this.isDecoration=!1,this.color=Se(1,1,1,1),this.polygonOffset=!1,this.anchorPosition=Xe(.5,.5),this.screenOffset=[0,0],this.shaderPolygonOffset=1e-5,this.textureIsSignedDistanceField=!1,this.sampleSignedDistanceFieldTexelCenter=!1,this.outlineColor=Se(1,1,1,1),this.outlineSize=0,this.distanceFieldBoundingBox=pe(),this.rotation=0,this.hasRotation=!1,this.vvSizeEnabled=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.hasSlicePlane=!1,this.pixelSnappingEnabled=!0,this.occlusionTest=!0,this.occludedFragmentFade=!1,this.horizonCullingEnabled=!1,this.centerOffsetUnits="world",this.drawAsLabel=!1,this.depthEnabled=!0,this.isFocused=!0,this.focusStyle="bright",this.draped=!1,this.isLabel=!1}}const ct=uo().vec3f(u.POSITION).vec3f(u.NORMAL).vec2i16(u.UVI).vec4u8(u.COLOR).vec2f(u.SIZE).f32(u.ROTATION).vec4f(u.CENTEROFFSETANDDISTANCE).vec4f(u.FEATUREATTRIBUTE),ko=ct.clone().vec4u8(u.OLIDCOLOR);class Wo{constructor(){this.vertexBufferLayout=Bt()?ko:ct}elementCount(t){return t.get(u.POSITION).indices.length*M}write(t,o,i,r,s,a){var p,j;const{position:c,normal:l,uvi:n,color:f,size:v,rotation:g,centerOffsetAndDistance:T,featureAttribute:D}=s;Vt(i.get(u.POSITION),t,c,a,M),qt(i.get(u.NORMAL),o,l,a,M);const y=(p=i.get(u.UVI))==null?void 0:p.data;let x=0,b=0,P=-1-ae,_=-1-ae;y&&y.length>=4&&(x=y[0],b=y[1],P=-1-y[2],_=-1-y[3]);let I=i.get(u.POSITION).indices.length,S=a;for(let O=0;O<I;++O)n.set(S,0,x),n.set(S,1,b),S++,n.set(S,0,P),n.set(S,1,b),S++,n.set(S,0,P),n.set(S,1,_),S++,n.set(S,0,P),n.set(S,1,_),S++,n.set(S,0,x),n.set(S,1,_),S++,n.set(S,0,x),n.set(S,1,b),S++;Ht(i.get(u.COLOR),4,f,a,M);const{data:L,indices:$}=i.get(u.SIZE);I=$.length,S=a;for(let O=0;O<I;++O){const w=L[2*$[O]],B=L[2*$[O]+1];for(let V=0;V<M;++V)v.set(S,0,w),v.set(S,1,B),S++}if(Gt(i.get(u.ROTATION),g,a,M),i.get(u.CENTEROFFSETANDDISTANCE)?De(i.get(u.CENTEROFFSETANDDISTANCE),T,a,M):_e(T,a,I*M),i.get(u.FEATUREATTRIBUTE)?De(i.get(u.FEATUREATTRIBUTE),D,a,M):_e(D,a,I*M),r!=null){const O=(j=i.get(u.POSITION))==null?void 0:j.indices;if(O){const w=O.length,B=s.getField(u.OLIDCOLOR,no);Yt(r,B,w,a,M)}}return{numVerticesPerItem:M,numItems:I}}intersect(t,o,i,r,s,a,c){const{options:{selectionMode:l,hud:n,excludeLabels:f},point:v,camera:g}=r;if(!l||!n||f&&o.isLabel||!v)return;const T=this.vertexBufferLayout.createView(t),D=T.getField(u.POSITION,je),y=T.getField(u.NORMAL,je),x=T.getField(u.ROTATION,lo),b=T.getField(u.SIZE,co),P=T.getField(u.FEATUREATTRIBUTE,Ne),_=T.getField(u.CENTEROFFSETANDDISTANCE,Ne),I=o.centerOffsetUnits==="screen",S=K(o);if(D==null||y==null||x==null||b==null||_==null||g==null)return;const L=P==null?null:P.getVec(0,be),{scaleX:$,scaleY:p}=Pe(L,o,g.pixelRatio),j=D.count/M;for(let O=0;O<j;O++){const w=O*M;if(D.getVec(w,h),i!=null&&ze(h,h,i),X(h,h,g.viewMatrix),_.getVec(w,ne),le(C,ne[0],ne[1],ne[2]),!I&&(h[0]+=C[0],h[1]+=C[1],C[2]!==0)){const B=C[2];xe(C,h),Qe(h,h,H(C,C,B))}if(y.getVec(w,Z),Ce(Z,ue,g,ie),Ae(o,h,ie,g,Q),g.applyProjection(h,m),m[0]>-1){I&&(C[0]||C[1])&&(m[0]+=C[0]*g.pixelRatio,C[1]!==0&&(m[1]+=Ge(C[1],Q.factorAlignment)*g.pixelRatio),g.unapplyProjection(m,h)),m[0]+=o.screenOffset[0]*g.pixelRatio,m[1]+=o.screenOffset[1]*g.pixelRatio,m[0]=Math.floor(m[0]),m[1]=Math.floor(m[1]),b.getVec(w,F),Ye(F,Q.factor,F);const B=lt*g.pixelRatio;let V=0;o.textureIsSignedDistanceField&&(V=Math.min(o.outlineSize,.5*F[0])*g.pixelRatio/2),F[0]*=$,F[1]*=p;const fe=x.get(w),he=o.rotation+fe;if(Oe(v,m[0],m[1],F,B,V,he,o,S)){const J=r.ray;if(X(de,h,We(nt,g.viewMatrix)),m[0]=v[0],m[1]=v[1],g.unprojectFromRenderScreen(m,h)){const N=G();Y(N,J.direction);const ee=1/re(N);H(N,N,ee),c(Ke(J.origin,h)*ee,N,O,de)}}}}}}function Pe(e,t,o){return e==null||t.vvSize==null?{scaleX:o,scaleY:o}:(Zt(ve,t,e),{scaleX:ve[0]*o,scaleY:ve[1]*o})}function Ae(e,t,o,i,r){var l;if(!((l=e.verticalOffset)!=null&&l.screenLength))return e.screenSizePerspective||e.screenSizePerspectiveAlignment?He(e,r,re(t),o.cosAngle):(r.factor.scale=1,r.factorAlignment.scale=1),t;const s=re(t),a=e.screenSizePerspectiveAlignment??e.screenSizePerspective,c=kt(i,s,e.verticalOffset,o.cosAngle,a);return He(e,r,s,o.cosAngle),H(o.normal,o.normal,c),ze(t,t,o.normal)}function He(e,t,o,i){e.screenSizePerspective!=null?$e(i,o,e.screenSizePerspective,t.factor):(t.factor.scale=1,t.factor.factor=0,t.factor.minScaleFactor=0),e.screenSizePerspectiveAlignment!=null?$e(i,o,e.screenSizePerspectiveAlignment,t.factorAlignment):(t.factorAlignment.factor=t.factor.factor,t.factorAlignment.scale=t.factor.scale,t.factorAlignment.minScaleFactor=t.factor.minScaleFactor)}const Xo=Object.freeze(Object.defineProperty({__proto__:null,build:at,calculateAnchorPosition:K,fullUV:ae},Symbol.toStringTag,{value:"Module"}));export{Ci as A,bi as H,xi as P,Po as Z,k as a,Ee as c,Oi as z};
