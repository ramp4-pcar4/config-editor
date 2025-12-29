import{is as me,eq as O,hN as Ze,kB as Bt,P as Dt,i4 as He,ak as Ht,b7 as qt,kj as Gt,e2 as nt,ar as Jt,am as Ve,aq as Xt,lO as le,mZ as Zt,cE as Yt,N as Qt,m as z}from"./index-BeTPrQ6f.js";import{S as Kt,X as K,g as Ye,_ as ee,j as Ce,R as ei,A as ae,q as ve,z as ot,E as Fe,b as ti}from"./vec32-CI1xtKog-DFVYRcgb.js";import{I as ii,o as Qe,r as ai,m as si}from"./vec4f64-DD-nkcCV-CSNWKRqG.js";import{o as qe}from"./projectBuffer-CMNsPBq1-CMpE7Jo3.js";import{g as ri}from"./orientedBoundingBox-DAJ-bKlA-DbqXagWB.js";import{aY as ni,aZ as oi,z as li,aP as ci,U as fe,a_ as di,a$ as lt,b0 as pi,D as ce,b1 as hi,j as ui,e as Ot,aS as fi,L as mi,b2 as ct,f as vi,h as gi,aW as Si,a8 as dt,a9 as bi,aa as pt,ab as Te,a7 as yi,ac as _i,V as xi,P as Ti,b3 as Pi,b4 as ht,b5 as zi,b6 as wi,b7 as ut,aD as Di,q as Oi,A as Ci,R as J,o as Li,aX as Ri,at as Ai,Q as Ei,i as Ke,k as et,al as Wi,am as Vi,l as Fi,g as Le,m as ji,H as Mi,t as Ct,b8 as $i,an as he,b9 as ft,u as Ii,F as ki,ba as Ui,Z as w}from"./OutputColorHighlightOID.glsl-fUhBGshN-Ctm9N97M.js";import{Y as Ge,k as mt,h as Ni,Z as Bi,N as Hi}from"./mat4-R0VY9B_E-DoEP887i.js";import{v as qi,a as Gi,A as Ji}from"./sphere-CIGsF4vz-C3zVQu9y.js";import{D as Xi,X as Pe,L as Re,q as Y,Z as vt}from"./plane-wUwHaY3K-ZwGBF7HQ.js";import{d as Zi,f as Yi,h as Qi}from"./BufferView-B6RYETl3-CMoUTBv6.js";import{V as Ki}from"./Octree-CuXix3EP-CfBHKjXe.js";import{y as ge}from"./vec42-DHp-FUwt-Br7hmYJs.js";import{S as ea,R as je,M as Lt,W as ta}from"./lineSegment-D8lwRkdT-CnWWOaLb.js";import{h as ia}from"./InterleavedLayout-CuMGnz6O-DkraWivs.js";import{E as gt}from"./enums-DDJfd4_p-D3z9tmVA.js";import{N as ze,O as Me,w as St}from"./renderState-CsafAKLy-B8R8ns_l.js";import{T as aa}from"./computeTranslationToOriginAndRotation-CsOb5S2S-CE5ZgVBy.js";import{b as Rt}from"./HUDMaterial.glsl-CxXm6elT-D8B376d1.js";import{b as sa,j as ra}from"./ElevationInfo-tlrAM5SV-D86C1F9d.js";import{h as na}from"./hydratedFeatures-82j52esm-6EbRngQ4.js";import{o as c,i as $}from"./glsl-CfY1Aoj6-DPHSeNd9.js";import"./lengthUtils-CopeXEyE-DjCEitlq.js";import"./Texture-DLw7oaIg-fTsxdRzn.js";import"./vec2f64-CkowXrDb-3zFQ3LNH.js";import{T as oa}from"./ShaderBuilder-ufvKEDd5-DMnPqr6U.js";function la(t){return t==="position"}function ca(t,e){return t==null&&(t=[]),t.push(e),t}function da(t,e){if(t==null)return null;const i=t.filter(a=>a!==e);return i.length===0?null:i}function Ls(t,e,i,a,s){we[0]=t.get(e,0),we[1]=t.get(e,1),we[2]=t.get(e,2),Ui(we,ne,3),i.set(s,0,ne[0]),a.set(s,0,ne[1]),i.set(s,1,ne[2]),a.set(s,1,ne[3]),i.set(s,2,ne[4]),a.set(s,2,ne[5])}const we=O(),ne=new Float32Array(6);let pa=class{constructor(t={}){this.id=Ze(),this._highlightIds=new Set,this._shaderTransformation=null,this._visible=!0,this.castShadow=t.castShadow??!0,this.usesVerticalDistanceToGround=t.usesVerticalDistanceToGround??!1,this.graphicUid=t.graphicUid,this.layerViewUid=t.layerViewUid,t.isElevationSource&&(this.lastValidElevationBB=new At),this._geometries=t.geometries?Array.from(t.geometries):new Array}dispose(){this._geometries.length=0}get layer(){return this._layer}set layer(t){Zi(this._layer==null||t==null,"Object3D can only be added to a single Layer"),this._layer=t}addGeometry(t){t.visible=this._visible,this._geometries.push(t);for(const e of this._highlightIds)t.addHighlight(e);this._emit("geometryAdded",{object:this,geometry:t}),this._highlightIds.size&&this._emit("highlightChanged",this),this._invalidateBoundingVolume()}removeGeometry(t){const e=this._geometries.splice(t,1)[0];if(e){for(const i of this._highlightIds)e.removeHighlight(i);this._emit("geometryRemoved",{object:this,geometry:e}),this._highlightIds.size&&this._emit("highlightChanged",this),this._invalidateBoundingVolume()}}removeAllGeometries(){for(;this._geometries.length>0;)this.removeGeometry(0)}geometryVertexAttributeUpdated(t,e,i=!1){this._emit("attributesChanged",{object:this,geometry:t,attribute:e,sync:i}),la(e)&&this._invalidateBoundingVolume()}get visible(){return this._visible}set visible(t){if(this._visible!==t){this._visible=t;for(const e of this._geometries)e.visible=this._visible;this._emit("visibilityChanged",this)}}maskOccludee(){const t=new ni;for(const e of this._geometries)e.occludees=ca(e.occludees,t);return this._emit("occlusionChanged",this),t}removeOcclude(t){for(const e of this._geometries)e.occludees=da(e.occludees,t);this._emit("occlusionChanged",this)}highlight(t){const e=new oi(t);for(const i of this._geometries)i.addHighlight(e);return this._emit("highlightChanged",this),this._highlightIds.add(e),e}removeHighlight(t){this._highlightIds.delete(t);for(const e of this._geometries)e.removeHighlight(t);this._emit("highlightChanged",this)}removeStateID(t){t.channel===0?this.removeHighlight(t):this.removeOcclude(t)}getCombinedStaticTransformation(t,e){return mt(e,this.transformation,t.transformation)}getCombinedShaderTransformation(t,e=me()){return mt(e,this.effectiveTransformation,t.transformation)}get boundingVolumeWorldSpace(){return this._bvWorldSpace||(this._bvWorldSpace=this._bvWorldSpace||new bt,this._validateBoundingVolume(this._bvWorldSpace,0)),this._bvWorldSpace}get boundingVolumeObjectSpace(){return this._bvObjectSpace||(this._bvObjectSpace=this._bvObjectSpace||new bt,this._validateBoundingVolume(this._bvObjectSpace,1)),this._bvObjectSpace}_validateBoundingVolume(t,e){const i=e===1;for(const a of this._geometries){const s=a.boundingInfo;s&&ha(s,t,i?a.transformation:this.getCombinedShaderTransformation(a))}qi(t.bounds,Kt($e,t.min,t.max,.5));for(const a of this._geometries){const s=a.boundingInfo;if(s==null)continue;const r=i?a.transformation:this.getCombinedShaderTransformation(a),o=Xi(r);K($e,s.center,r);const l=Ye($e,Gi(t.bounds)),n=s.radius*o;t.bounds[3]=Math.max(t.bounds[3],l+n)}}_invalidateBoundingVolume(){var e;const t=(e=this._bvWorldSpace)==null?void 0:e.bounds;this._bvObjectSpace=this._bvWorldSpace=void 0,this.layer&&t&&this.layer.notifyObjectBBChanged(this,t)}_emit(t,e){var i;(i=this.layer)==null||i.events.emit(t,e)}get geometries(){return this._geometries}get transformation(){return this._transformation??Bt}set transformation(t){this._transformation=Ge(this._transformation??me(),t),this._invalidateBoundingVolume(),this._emit("transformationChanged",this)}get shaderTransformation(){return this._shaderTransformation}set shaderTransformation(t){this._shaderTransformation=t?Ge(this._shaderTransformation??me(),t):null,this._invalidateBoundingVolume(),this._emit("shaderTransformationChanged",this)}get effectiveTransformation(){return this.shaderTransformation??this.transformation}get test(){}},At=class{constructor(){this._data=[Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE]}get min(){return He(this._data[0],this._data[1],this._data[2])}get max(){return He(this._data[3],this._data[4],this._data[5])}minWith(t){const{_data:e}=this;e[0]=Math.min(e[0],t[0]),e[1]=Math.min(e[1],t[1]),e[2]=Math.min(e[2],t[2])}maxWith(t){const{_data:e}=this;e[3]=Math.max(e[3],t[0]),e[4]=Math.max(e[4],t[1]),e[5]=Math.max(e[5],t[2])}assignMinMax(t,e){for(let i=0;i<3;++i)this._data[0+i]=t[i],this._data[3+i]=e[i]}isEmpty(){return this._data[3]<this._data[0]&&this._data[4]<this._data[1]&&this._data[5]<this._data[2]}};class bt extends At{constructor(){super(...arguments),this.bounds=Ji()}}function ha(t,e,i){const a=t.bbMin,s=t.bbMax;if(Ni(i)){const r=ee(ua,i[12],i[13],i[14]);return Ce(B,a,r),Ce(G,s,r),e.minWith(B),void e.maxWith(G)}if(K(B,a,i),ei(a,s))return e.minWith(B),void e.maxWith(B);K(G,s,i),e.minWith(B),e.minWith(G),e.maxWith(B),e.maxWith(G);for(let r=0;r<3;++r)ae(B,a),ae(G,s),B[r]=s[r],G[r]=a[r],K(B,B,i),K(G,G,i),e.minWith(B),e.minWith(G),e.maxWith(B),e.maxWith(G)}const ua=O(),B=O(),G=O(),$e=O(),fa=["layerObjectAdded","layerObjectRemoved","layerObjectsAdded","layerObjectsRemoved","transformationChanged","shaderTransformationChanged","visibilityChanged","occlusionChanged","highlightChanged","geometryAdded","geometryRemoved","attributesChanged"];let ma=class{constructor(t,e,i=""){this.stage=t,this.apiLayerViewUid=i,this.id=Ze(),this.events=new Ht,this.visible=!0,this.sliceable=!1,this._objectsAdded=new Array,this._handles=new qt,this._objects=new Map,this._pickable=!0,this.visible=(e==null?void 0:e.visible)??!0,this._pickable=(e==null?void 0:e.pickable)??!0,this.updatePolicy=(e==null?void 0:e.updatePolicy)??0,t.addLayer(this);for(const a of fa)this._handles.add(this.events.on(a,s=>t.handleEvent(a,s)))}destroy(){this._handles.size&&(this._handles.destroy(),this.stage.removeLayer(this),this.invalidateSpatialQueryAccelerator())}get objects(){return this._objects}getObject(t){return Gt(this._objects.get(t))}set pickable(t){this._pickable=t}get pickable(){return this._pickable&&this.visible}add(t){this._objects.set(t.id,t),t.layer=this,this.events.emit("layerObjectAdded",t),this._octree!=null&&this._objectsAdded.push(t)}remove(t){this._objects.delete(t.id)&&(this.events.emit("layerObjectRemoved",t),t.layer=null,this._octree!=null&&(nt(this._objectsAdded,t)||this._octree.remove([t])))}addMany(t){for(const e of t)this._objects.set(e.id,e),e.layer=this;this.events.emit("layerObjectsAdded",t),this._octree!=null&&this._objectsAdded.push(...t)}removeMany(t){const e=new Array;for(const i of t)this._objects.delete(i.id)&&e.push(i);if(e.length!==0&&(this.events.emit("layerObjectsRemoved",e),e.forEach(i=>i.layer=null),this._octree!=null)){for(let i=0;i<e.length;)nt(this._objectsAdded,e[i])?(e[i]=e[e.length-1],e.length-=1):++i;this._octree.remove(e)}}commit(){this.stage.commitLayer(this)}sync(){this.updatePolicy!==1&&this.stage.syncLayer(this.id)}notifyObjectBBChanged(t,e){this._octree==null||this._objectsAdded.includes(t)||this._octree.update(t,e)}getSpatialQueryAccelerator(){return this._octree==null&&this._objects.size>50?(this._octree=new Ki(t=>t.boundingVolumeWorldSpace.bounds),this._octree.add(this._objects.values())):this._octree!=null&&this._objectsAdded.length>0&&(this._octree.add(this._objectsAdded),this._objectsAdded.length=0),this._octree}invalidateSpatialQueryAccelerator(){this._octree=Jt(this._octree),this._objectsAdded.length=0}get test(){}},va=class{constructor(t,e){this.vec3=t,this.id=e}};function yt(t,e,i,a){return new va(He(t,e,i),a)}const _t=8;function ga(t,e){const{vertex:i,attributes:a}=t;i.uniforms.add(new J("intrinsicWidth",o=>o.width));const{hasScreenSizePerspective:s,spherical:r}=e;s?(t.include(ji,e),Mi(i),Ct(i,e),i.uniforms.add(new $i("inverseViewMatrix",(o,l)=>Bi(xt,Hi(xt,l.camera.viewMatrix,o.origin)))),i.code.add(c`
      float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
        vec3 worldPos = (inverseViewMatrix * vec4(pos, 1)).xyz;
        vec3 groundUp = ${r?c`normalize(worldPos + localOrigin)`:c`vec3(0.0, 0.0, 1.0)`};
        float absCosAngle = abs(dot(groundUp, normalize(worldPos - cameraPosition)));

        return screenSizePerspectiveScaleFloat(size, absCosAngle, length(pos), screenSizePerspective);
      }
    `)):i.code.add(c`float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
return size;
}`),e.hasVVSize?(a.add("sizeFeatureAttribute","float"),i.uniforms.add(new he("vvSizeMinSize",o=>o.vvSize.minSize),new he("vvSizeMaxSize",o=>o.vvSize.maxSize),new he("vvSizeOffset",o=>o.vvSize.offset),new he("vvSizeFactor",o=>o.vvSize.factor),new he("vvSizeFallback",o=>o.vvSize.fallback)),i.code.add(c`
    float getSize(${$(s,"vec3 pos")}) {
      float size = isnan(sizeFeatureAttribute)
        ? vvSizeFallback.x
        : intrinsicWidth * clamp(vvSizeOffset + sizeFeatureAttribute * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).x;

      return ${$(s,"applyLineSizeScreenSizePerspective(size, pos)","size")};
    }
    `)):(a.add("size","float"),i.code.add(c`
    float getSize(${$(s,"vec3 pos")}) {
      float fullSize = intrinsicWidth * size;
      return ${$(s,"applyLineSizeScreenSizePerspective(fullSize, pos)","fullSize")};
    }
    `)),e.hasVVOpacity?(a.add("opacityFeatureAttribute","float"),i.constants.add("vvOpacityNumber","int",8),i.uniforms.add(new ft("vvOpacityValues",o=>o.vvOpacity.values,_t),new ft("vvOpacityOpacities",o=>o.vvOpacity.opacityValues,_t),new J("vvOpacityFallback",o=>o.vvOpacity.fallback,{supportsNaN:!0})),i.code.add(c`
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
        return ${$(e.hasVVColor,"color","vec4(color.rgb, vvOpacityFallback)")};
      }

      return vec4(color.rgb, interpolateOpacity(opacityFeatureAttribute));
    }
    `)):i.code.add(c`vec4 applyOpacity(vec4 color) {
return color;
}`),e.hasVVColor?(t.include(Ii,e),a.add("colorFeatureAttribute","float"),i.code.add(c`vec4 getColor() {
vec4 color = interpolateVVColor(colorFeatureAttribute);
if (isnan(color.r)) {
return vec4(0);
}
return applyOpacity(color);
}`)):(a.add("color","vec4"),i.code.add(c`vec4 getColor() {
return applyOpacity(color);
}`))}const xt=me();function Sa(t){t.vertex.code.add("#define noPerspectiveWrite(x, w) (x * w)")}function Je(t){t.fragment.code.add("#define noPerspectiveRead(x) (x * gl_FragCoord.w)")}function ba(t){return t.pattern.map(e=>Math.round(e*t.pixelRatio))}function ya(t){if(t==null)return 1;const e=ba(t);return Math.floor(e.reduce((i,a)=>i+a))}function _a(t){return t==null?si:t.length===4?t:ge(xa,t[0],t[1],t[2],1)}const xa=Qe();function Ta(t,e){if(!e.stippleEnabled)return void t.fragment.code.add(c`float getStippleAlpha(float lineWidth) { return 1.0; }
void discardByStippleAlpha(float stippleAlpha, float threshold) {}
vec4 blendStipple(vec4 color, float stippleAlpha) { return color; }`);const i=!(e.draped&&e.stipplePreferContinuous),{vertex:a,fragment:s}=t;e.draped||(Ct(a,e),a.uniforms.add(new et("worldToScreenPerDistanceRatio",({camera:r})=>1/r.perScreenPixelRatio)).code.add(c`float computeWorldToScreenRatio(vec3 segmentCenter) {
float segmentDistanceToCamera = length(segmentCenter - cameraPosition);
return worldToScreenPerDistanceRatio / segmentDistanceToCamera;
}`)),t.varyings.add("vStippleDistance","float"),t.varyings.add("vStippleDistanceLimits","vec2"),t.varyings.add("vStipplePatternStretch","float"),a.code.add(c`
    float discretizeWorldToScreenRatio(float worldToScreenRatio) {
      float step = ${c.float(Pa)};

      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);
      return discreteWorldToScreenRatio;
    }
  `),Ke(a),a.code.add(c`
    vec2 computeStippleDistanceLimits(float startPseudoScreen, float segmentLengthPseudoScreen, float segmentLengthScreen, float patternLength) {

      // First check if the segment is long enough to support fully screen space patterns.
      // Force sparse mode for segments that are very large in screen space even if it is not allowed,
      // to avoid imprecision from calculating with large floats.
      if (segmentLengthPseudoScreen >= ${i?"patternLength":"1e4"}) {
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
  `),s.uniforms.add(new ki("stipplePatternTexture",r=>r.stippleTexture),new J("stipplePatternPixelSizeInv",r=>1/Et(r))),e.stippleOffColorEnabled&&s.uniforms.add(new Le("stippleOffColor",r=>_a(r.stippleOffColor))),t.include(Je),s.code.add(c`float getStippleSDF(out bool isClamped) {
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
}`),s.code.add(c`
    void discardByStippleAlpha(float stippleAlpha, float threshold) {
     ${$(!e.stippleOffColorEnabled,"if (stippleAlpha < threshold) { discard; }")}
    }

    vec4 blendStipple(vec4 color, float stippleAlpha) {
      return ${e.stippleOffColorEnabled?"mix(color, stippleOffColor, stippleAlpha)":"vec4(color.rgb, color.a * stippleAlpha)"};
    }
  `)}function Et(t){const e=t.stipplePattern;return e?ya(t.stipplePattern)/e.pixelRatio:1}const Pa=.4,Wt=64,za=Wt/2,wa=za/5,Da=Wt/wa,Rs=.25;function Oa(t,e){const i=t.vertex,a=e.hasScreenSizePerspective;Ke(i),i.uniforms.get("markerScale")==null&&i.constants.add("markerScale","float",1),i.constants.add("markerSizePerLineWidth","float",Da).code.add(c`
  float getLineWidth(${$(a,"vec3 pos")}) {
     return max(getSize(${$(a,"pos")}), 1.0) * pixelRatio;
  }

  float getScreenMarkerSize(float lineWidth) {
    return markerScale * markerSizePerLineWidth * lineWidth;
  }
  `),e.space===2&&(i.constants.add("maxSegmentLengthFraction","float",.45),i.uniforms.add(new et("perRenderPixelRatio",s=>s.camera.perRenderPixelRatio)),i.code.add(c`
  bool areWorldMarkersHidden(vec3 pos, vec3 other) {
    vec3 midPoint = mix(pos, other, 0.5);
    float distanceToCamera = length(midPoint);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    float worldMarkerSize = getScreenMarkerSize(getLineWidth(${$(a,"pos")})) * screenToWorldRatio;
    float segmentLen = length(pos - other);
    return worldMarkerSize > maxSegmentLengthFraction * segmentLen;
  }

  float getWorldMarkerSize(vec3 pos) {
    float distanceToCamera = length(pos);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    return getScreenMarkerSize(getLineWidth(${$(a,"pos")})) * screenToWorldRatio;
  }
  `))}function Ca(t,e){if(!e.hasAnimation)return;const{attributes:i,varyings:a,vertex:s,fragment:r}=t;i.add("timeStamps","vec4"),a.add("vTimeStamp","float"),a.add("vFirstTime","float"),a.add("vLastTime","float"),a.add("vTransitionType","float"),s.main.add(c`vTimeStamp = timeStamps.x;
vFirstTime = timeStamps.y;
vLastTime = timeStamps.z;
vTransitionType = timeStamps.w;`);const{animation:o}=e;o===3&&r.constants.add("decayRate","float",2.3),r.code.add(c`
    float getTrailOpacity(float x) {
      ${La(o)}
    }`),r.uniforms.add(new J("timeElapsed",l=>l.timeElapsed),new J("trailLength",l=>l.trailLength),new J("speed",l=>l.animationSpeed),new Le("timingOptions",l=>ge(Ra,l.startTime,l.endTime,l.fadeInTime,l.fadeOutTime))),r.code.add(c`float fadeIn(float x) {
return smoothstep(0.0, timingOptions[2], x);
}
float fadeOut(float x) {
return isinf(timingOptions[3]) ? 1.0 : smoothstep(timingOptions[3], 0.0, x);
}`),r.code.add(c`vec4 animate(vec4 color) {
float startTime = timingOptions[0];
float endTime = timingOptions[1];
float totalTime = vLastTime - vFirstTime;
float actualEndTime = int(vTransitionType) == 2 ? min(endTime, startTime + vLastTime / speed) : endTime;
vec4 animatedColor = color;
if (speed == 0.0) {
animatedColor.a *= getTrailOpacity((totalTime - (vTimeStamp - vFirstTime)) / trailLength);
animatedColor.a *= isinf(actualEndTime) ? 1.0 : fadeOut(timeElapsed - actualEndTime);
animatedColor.a *= fadeIn(timeElapsed - startTime);
return animatedColor;
}
float relativeStartTime = mod(startTime, totalTime);
float vHeadRelativeToFirst = mod((timeElapsed - relativeStartTime) * speed - vFirstTime, totalTime);
float vRelativeToHead = vHeadRelativeToFirst + vFirstTime - vTimeStamp;
bool inPreviousCycle = vRelativeToHead < 0.0;
vRelativeToHead += inPreviousCycle ? totalTime : 0.0;
float vAbsoluteTime = timeElapsed - vRelativeToHead / speed;
if (vAbsoluteTime > actualEndTime) {
vRelativeToHead = (timeElapsed - relativeStartTime) * speed - vTimeStamp;
vAbsoluteTime = timeElapsed - vRelativeToHead / speed;
}
animatedColor *= step(startTime, vAbsoluteTime);
animatedColor *= step(vAbsoluteTime, actualEndTime);
animatedColor.a *= isinf(actualEndTime) ? 1.0 : fadeOut(timeElapsed - actualEndTime);
animatedColor.a *= inPreviousCycle ? fadeOut(vHeadRelativeToFirst / speed) : 1.0;
animatedColor.a *= getTrailOpacity(vRelativeToHead / trailLength);
animatedColor.a *= int(vTransitionType) == 0 ? fadeIn(vAbsoluteTime - startTime) : 1.0;
animatedColor.a *= fadeIn(vTimeStamp - vFirstTime);
return animatedColor;
}`)}function La(t){switch(t){case 2:return"return x >= 0.0 && x <= 1.0 ? 1.0 : 0.0;";case 3:return`float cutOff = exp(-decayRate);
        return (exp(-decayRate * x) - cutOff) / (1.0 - cutOff);`;default:return"return 1.0;"}}const Ra=Qe(),Se=1;function Vt(t){const e=new oa,{attributes:i,varyings:a,vertex:s,fragment:r}=e,{applyMarkerOffset:o,draped:l,output:n,capType:p,stippleEnabled:u,falloffEnabled:g,roundJoins:d,wireframe:b,innerColorEnabled:m,hasAnimation:y,hasScreenSizePerspective:S}=t;r.include(Di),e.include(ga,t),e.include(Ta,t),e.include(Oi,t),e.include(Ci,t),e.include(Ca,t);const U=o&&!l;U&&(s.uniforms.add(new J("markerScale",f=>f.markerScale)),e.include(Oa,{space:2,hasScreenSizePerspective:S})),Li(s,t),s.uniforms.add(new Ri("inverseProjectionMatrix",f=>f.camera.inverseProjectionMatrix),new Ai("nearFar",f=>f.camera.nearFar),new J("miterLimit",f=>f.join!=="miter"?0:f.miterLimit),new Ei("viewport",f=>f.camera.fullViewport)),s.constants.add("LARGE_HALF_FLOAT","float",65500),i.add("position","vec3"),i.add("previousDelta","vec4"),i.add("nextDelta","vec4"),i.add("lineParameters","vec2"),i.add("u0","float"),a.add("vColor","vec4"),a.add("vpos","vec3",{invariant:!0}),a.add("vLineDistance","float"),a.add("vLineWidth","float");const X=u;X&&a.add("vLineSizeInv","float");const h=p===2,R=u&&h,A=g||R;A&&a.add("vLineDistanceNorm","float"),h&&(a.add("vSegmentSDF","float"),a.add("vReverseSegmentSDF","float")),s.code.add(c`vec2 perpendicular(vec2 v) {
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
}`),s.code.add(c`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),s.code.add(c`void clip(
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
}`),Ke(s),s.constants.add("aaWidth","float",u?0:1).main.add(c`bool isStartVertex = abs(abs(lineParameters.y) - 3.0) == 1.0;
vec3 prevPosition = position + previousDelta.xyz * previousDelta.w;
vec3 nextPosition = position + nextDelta.xyz * nextDelta.w;
float coverage = 1.0;
if (lineParameters.y == 0.0) {
gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
}
else {
vec4 pos  = view * vec4(position, 1.0);
vec4 prev = view * vec4(prevPosition, 1.0);
vec4 next = view * vec4(nextPosition, 1.0);
bool isJoin = abs(lineParameters.y) < 3.0;`),U&&s.main.add(c`vec4 other = isStartVertex ? next : prev;
bool markersHidden = areWorldMarkersHidden(pos.xyz, other.xyz);
if (!isJoin && !markersHidden) {
pos.xyz += normalize(other.xyz - pos.xyz) * getWorldMarkerSize(pos.xyz) * 0.5;
}`),e.include(Sa),s.main.add(c`
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

      float lineSize = getSize(${$(S,"clippedPos")});
      ${$(u&&S,"float patternLineSize = getSize(clippedCenter);")}
      ${$(u&&!S,"float patternLineSize = lineSize;")}

      if (lineSize < 1.0) {
        coverage = lineSize; // convert sub-pixel coverage to alpha
        lineSize = 1.0;
      }
      lineSize += aaWidth;

      float lineWidth = lineSize * pixelRatio;
      vLineWidth = noPerspectiveWrite(lineWidth, pos.w);
      ${X?c`vLineSizeInv = noPerspectiveWrite(1.0 / lineSize, pos.w);`:""}
  `),(u||h)&&s.main.add(c`
      float isEndVertex = float(!isStartVertex);
      vec2 segmentOrigin = mix(pos.xy, prev.xy, isEndVertex);
      vec2 segment = mix(right, left, isEndVertex);
      ${h?c`vec2 segmentEnd = mix(next.xy, pos.xy, isEndVertex);`:""}
    `),s.main.add(c`left = (leftLen > 0.001) ? left/leftLen : vec2(0.0, 0.0);
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
if (isOutside && (displacementLen > miterLimit * lineWidth)) {`),d?s.main.add(c`
        vec2 startDir = leftLen < 0.001 ? right : left;
        startDir = perpendicular(startDir);

        vec2 endDir = rightLen < 0.001 ? left : right;
        endDir = perpendicular(endDir);

        float factor = ${u?c`min(1.0, subdivisionFactor * ${c.float((Se+2)/(Se+1))})`:c`subdivisionFactor`};

        float rotationAngle = acos(clamp(dot(startDir, endDir), -1.0, 1.0));
        joinDisplacementDir = rotate(startDir, -sign(lineParameters.y) * factor * rotationAngle);
      `):s.main.add(c`if (leftLen < 0.001) {
joinDisplacementDir = right;
}
else if (rightLen < 0.001) {
joinDisplacementDir = left;
}
else {
joinDisplacementDir = (isStartVertex || subdivisionFactor > 0.0) ? right : left;
}
joinDisplacementDir = perpendicular(joinDisplacementDir);`);const E=p!==0;return s.main.add(c`
        displacementLen = lineWidth;
      }
    } else {
      // CAP handling ---------------------------------------------------
      joinDisplacementDir = isStartVertex ? right : left;
      joinDisplacementDir = perpendicular(joinDisplacementDir);

      ${E?c`capDisplacementDir = isStartVertex ? -right : left;`:""}
    }
  `),s.main.add(c`
    // Displacement (in pixels) caused by join/or cap
    vec2 dpos = joinDisplacementDir * sign(lineParameters.y) * displacementLen + capDisplacementDir * displacementLen;
    float lineDistNorm = noPerspectiveWrite(sign(lineParameters.y), pos.w);

    vLineDistance = lineWidth * lineDistNorm;
    ${A?c`vLineDistanceNorm = lineDistNorm;`:""}

    pos.xy += dpos;
  `),h&&s.main.add(c`vec2 segmentDir = normalize(segment);
vSegmentSDF = noPerspectiveWrite((isJoin && isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentOrigin, segmentDir)), pos.w);
vReverseSegmentSDF = noPerspectiveWrite((isJoin && !isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentEnd, -segmentDir)), pos.w);`),u&&(l?s.uniforms.add(new et("worldToScreenRatio",f=>1/f.screenToPCSRatio)):s.main.add(c`vec3 segmentCenter = mix((nextPosition + position) * 0.5, (position + prevPosition) * 0.5, isEndVertex);
float worldToScreenRatio = computeWorldToScreenRatio(segmentCenter);`),s.main.add(c`float segmentLengthScreenDouble = length(segment);
float segmentLengthScreen = segmentLengthScreenDouble * 0.5;
float discreteWorldToScreenRatio = discretizeWorldToScreenRatio(worldToScreenRatio);
float segmentLengthRender = length(mix(nextPosition - position, position - prevPosition, isEndVertex));
vStipplePatternStretch = worldToScreenRatio / discreteWorldToScreenRatio;`),l?s.main.add(c`float segmentLengthPseudoScreen = segmentLengthScreen / pixelRatio * discreteWorldToScreenRatio / worldToScreenRatio;
float startPseudoScreen = u0 * discreteWorldToScreenRatio - mix(0.0, segmentLengthPseudoScreen, isEndVertex);`):s.main.add(c`float startPseudoScreen = mix(u0, u0 - segmentLengthRender, isEndVertex) * discreteWorldToScreenRatio;
float segmentLengthPseudoScreen = segmentLengthRender * discreteWorldToScreenRatio;`),s.uniforms.add(new J("stipplePatternPixelSize",f=>Et(f))),s.main.add(c`float patternLength = patternLineSize * stipplePatternPixelSize;
vStippleDistanceLimits = computeStippleDistanceLimits(startPseudoScreen, segmentLengthPseudoScreen, segmentLengthScreen, patternLength);
vStippleDistance = mix(vStippleDistanceLimits.x, vStippleDistanceLimits.y, isEndVertex);
if (segmentLengthScreenDouble >= 0.001) {
vec2 stippleDisplacement = pos.xy - segmentOrigin;
float stippleDisplacementFactor = dot(segment, stippleDisplacement) / (segmentLengthScreenDouble * segmentLengthScreenDouble);
vStippleDistance += (stippleDisplacementFactor - isEndVertex) * (vStippleDistanceLimits.y - vStippleDistanceLimits.x);
}
vStippleDistanceLimits = noPerspectiveWrite(vStippleDistanceLimits, pos.w);
vStippleDistance = noPerspectiveWrite(vStippleDistance, pos.w);
vStippleDistanceLimits = isJoin ?
vStippleDistanceLimits :
isStartVertex ?
vec2(-1e34, vStippleDistanceLimits.y) :
vec2(vStippleDistanceLimits.x, 1e34);`)),s.main.add(c`
      // Convert back into NDC
      pos.xy = (pos.xy / viewport.zw) * pos.w;

      vColor = getColor();
      vColor.a = noPerspectiveWrite(vColor.a * coverage, pos.w);

      ${b&&!l?"pos.z -= 0.001 * pos.w;":""}

      // transform final position to camera space for slicing
      vpos = (inverseProjectionMatrix * pos).xyz;
      gl_Position = pos;
      forwardObjectAndLayerIdColor();
    }`),e.fragment.include(Wi,t),e.include(Vi,t),r.include(Fi),r.main.add(c`discardBySlice(vpos);
discardByTerrainDepth();`),e.include(Je),r.main.add(c`
    float lineWidth = noPerspectiveRead(vLineWidth);
    float lineDistance = noPerspectiveRead(vLineDistance);
    ${$(A,c`float lineDistanceNorm = noPerspectiveRead(vLineDistanceNorm);`)}
  `),b?r.main.add(c`vec4 finalColor = vec4(1.0, 0.0, 1.0, 1.0);`):(h&&r.main.add(c`
        float sdf = noPerspectiveRead(min(vSegmentSDF, vReverseSegmentSDF));
        vec2 fragmentPosition = vec2(min(sdf, 0.0), lineDistance);

        float fragmentRadius = length(fragmentPosition);
        float fragmentCapSDF = (fragmentRadius - lineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
        float capCoverage = clamp(0.5 - fragmentCapSDF, 0.0, 1.0);

        if (capCoverage < ${c.float(ce)}) {
          discard;
        }
      `),R?r.main.add(c`
      vec2 stipplePosition = vec2(
        min(getStippleSDF() * 2.0 - 1.0, 0.0),
        lineDistanceNorm
      );
      float stippleRadius = length(stipplePosition * lineWidth);
      float stippleCapSDF = (stippleRadius - lineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
      float stippleCoverage = clamp(0.5 - stippleCapSDF, 0.0, 1.0);
      float stippleAlpha = step(${c.float(ce)}, stippleCoverage);
      `):r.main.add(c`float stippleAlpha = getStippleAlpha(lineWidth);`),n!==10&&r.main.add(c`discardByStippleAlpha(stippleAlpha, ${c.float(ce)});`),e.include(Je),r.uniforms.add(new Le("intrinsicColor",f=>f.color)).main.add(c`vec4 color = intrinsicColor * vColor;
color.a = noPerspectiveRead(color.a);`),m&&r.uniforms.add(new Le("innerColor",f=>f.innerColor??f.color),new J("innerWidth",(f,P)=>f.innerWidth*P.camera.pixelRatio)).main.add(c`float distToInner = abs(lineDistance) - innerWidth;
float innerAA = clamp(0.5 - distToInner, 0.0, 1.0);
float innerAlpha = innerColor.a + color.a * (1.0 - innerColor.a);
color = mix(color, vec4(innerColor.rgb, innerAlpha), innerAA);`),r.main.add(c`vec4 finalColor = blendStipple(color, stippleAlpha);`),g&&(r.uniforms.add(new J("falloff",f=>f.falloff)),r.main.add(c`finalColor.a *= pow(max(0.0, 1.0 - abs(lineDistanceNorm)), falloff);`)),u||r.main.add(c`float featherStartDistance = max(lineWidth - 2.0, 0.0);
float value = abs(lineDistance);
float feather = (value - featherStartDistance) / (lineWidth - featherStartDistance);
finalColor.a *= 1.0 - clamp(feather, 0.0, 1.0);`),y&&r.main.add(c`
        finalColor = animate(finalColor);

        ${$(n!==10,c`
            if (finalColor.a <= ${c.float(ce)}) {
              discard;
            }`)}
      `)),r.main.add(c`outputColorHighlightOID(finalColor, vpos, finalColor.rgb);`),e}const Aa=Object.freeze(Object.defineProperty({__proto__:null,build:Vt,ribbonlineNumRoundJoinSubdivisions:Se},Symbol.toStringTag,{value:"Module"}));class Ea extends vi{constructor(e,i){super(e,i,new gi(Aa,()=>Promise.resolve().then(()=>ss)),Ft(i).locations),this.primitiveType=i.wireframe?gt.LINES:gt.TRIANGLE_STRIP}_makePipelineState(e,i){const{oitPass:a,output:s,hasOccludees:r,hasPolygonOffset:o}=e,l=a===0,n=a===2;return ze({blending:fe(s)?xi(a):null,depthTest:{func:_i(a)},depthWrite:yi(e),drawBuffers:Te(s,Ti(a,s)),colorWrite:Me,stencilWrite:r?pt:null,stencilTest:r?i?dt:bi:null,polygonOffset:l||n?o?Tt:null:Si})}initializePipeline(e){if(e.occluder){const i=e.hasPolygonOffset?Tt:null,{output:a,hasOccludees:s}=e;this._occluderPipelineTransparent=ze({blending:St,polygonOffset:i,depthTest:ht,depthWrite:null,colorWrite:Me,stencilWrite:null,stencilTest:s?Pi:null,drawBuffers:Te(a)}),this._occluderPipelineOpaque=ze({blending:St,polygonOffset:i,depthTest:s?ht:ut,depthWrite:null,colorWrite:Me,stencilWrite:s?wi:null,stencilTest:s?zi:null,drawBuffers:Te(a)}),this._occluderPipelineMaskWrite=ze({blending:null,polygonOffset:i,depthTest:ut,depthWrite:null,colorWrite:null,stencilWrite:s?pt:null,stencilTest:s?dt:null,drawBuffers:Te(a)})}return this._occludeePipeline=this._makePipelineState(e,!0),this._makePipelineState(e,!1)}getPipeline(e,i){if(e)return this._occludeePipeline;switch(i){case 11:return this._occluderPipelineTransparent??super.getPipeline();case 10:return this._occluderPipelineOpaque??super.getPipeline();default:return this._occluderPipelineMaskWrite??super.getPipeline()}}}const Tt={factor:0,units:-4};function Ft(t){const e=ia().vec3f("position").vec4f16("previousDelta").vec4f16("nextDelta").f32("u0").vec2f16("lineParameters");return t.hasVVColor?e.f32("colorFeatureAttribute"):e.vec4u8("color",{glNormalized:!0}),t.hasVVSize?e.f32("sizeFeatureAttribute"):e.f32("size"),t.hasVVOpacity&&e.f32("opacityFeatureAttribute"),Ot()&&e.vec4u8("olidColor"),t.hasAnimation&&e.vec4f16("timeStamps"),e}let T=class extends ui{constructor(t){super(),this.spherical=t,this.capType=0,this.emissionSource=0,this.hasPolygonOffset=!1,this.writeDepth=!1,this.draped=!1,this.stippleEnabled=!1,this.stippleOffColorEnabled=!1,this.stipplePreferContinuous=!0,this.roundJoins=!1,this.applyMarkerOffset=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.hasVVOpacity=!1,this.falloffEnabled=!1,this.innerColorEnabled=!1,this.hasOccludees=!1,this.occluder=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.wireframe=!1,this.discardInvisibleFragments=!1,this.animation=2,this.hasScreenSizePerspective=!1,this.textureCoordinateType=0,this.occlusionPass=!1,this.hasVVInstancing=!1,this.hasSliceTranslatedView=!0,this.overlayEnabled=!1,this.snowCover=!1}get hasAnimation(){return this.animation!==0}};z([w({count:3})],T.prototype,"capType",void 0),z([w({count:8})],T.prototype,"emissionSource",void 0),z([w()],T.prototype,"hasPolygonOffset",void 0),z([w()],T.prototype,"writeDepth",void 0),z([w()],T.prototype,"draped",void 0),z([w()],T.prototype,"stippleEnabled",void 0),z([w()],T.prototype,"stippleOffColorEnabled",void 0),z([w()],T.prototype,"stipplePreferContinuous",void 0),z([w()],T.prototype,"roundJoins",void 0),z([w()],T.prototype,"applyMarkerOffset",void 0),z([w()],T.prototype,"hasVVSize",void 0),z([w()],T.prototype,"hasVVColor",void 0),z([w()],T.prototype,"hasVVOpacity",void 0),z([w()],T.prototype,"falloffEnabled",void 0),z([w()],T.prototype,"innerColorEnabled",void 0),z([w()],T.prototype,"hasOccludees",void 0),z([w()],T.prototype,"occluder",void 0),z([w()],T.prototype,"terrainDepthTest",void 0),z([w()],T.prototype,"cullAboveTerrain",void 0),z([w()],T.prototype,"wireframe",void 0),z([w()],T.prototype,"discardInvisibleFragments",void 0),z([w({count:4})],T.prototype,"animation",void 0),z([w()],T.prototype,"hasScreenSizePerspective",void 0);class Wa extends li{constructor(e,i){super(e,Fa),this.produces=new Map([[2,a=>ci(a)||fe(a)&&this.parameters.renderOccluded===8],[3,a=>di(a)],[10,a=>lt(a)&&this.parameters.renderOccluded===8],[11,a=>lt(a)&&this.parameters.renderOccluded===8],[4,a=>fe(a)&&this.parameters.writeDepth&&this.parameters.renderOccluded!==8],[8,a=>fe(a)&&!this.parameters.writeDepth&&this.parameters.renderOccluded!==8],[18,a=>pi(a)]]),this._configuration=new T(i)}getConfiguration(e,i){super.getConfiguration(e,i,this._configuration),this._configuration.oitPass=i.oitPass,this._configuration.draped=i.slot===18;const a=this.parameters.stipplePattern!=null&&e!==9;return this._configuration.stippleEnabled=a,this._configuration.stippleOffColorEnabled=a&&this.parameters.stippleOffColor!=null,this._configuration.stipplePreferContinuous=a&&this.parameters.stipplePreferContinuous,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.roundJoins=this.parameters.join==="round",this._configuration.capType=this.parameters.cap,this._configuration.applyMarkerOffset=this.parameters.markerParameters!=null&&Ma(this.parameters.markerParameters),this._configuration.hasPolygonOffset=this.parameters.hasPolygonOffset,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.hasVVSize=this.parameters.hasVVSize,this._configuration.hasVVColor=this.parameters.hasVVColor,this._configuration.hasVVOpacity=this.parameters.hasVVOpacity,this._configuration.innerColorEnabled=this.parameters.innerWidth>0&&this.parameters.innerColor!=null,this._configuration.falloffEnabled=this.parameters.falloff>0,this._configuration.hasOccludees=i.hasOccludees,this._configuration.occluder=this.parameters.renderOccluded===8,this._configuration.terrainDepthTest=i.terrainDepthTest&&fe(e),this._configuration.cullAboveTerrain=i.cullAboveTerrain,this._configuration.wireframe=this.parameters.wireframe,this._configuration.animation=this.parameters.animation,this._configuration.emissionSource=this.hasEmissions?1:0,this._configuration.hasScreenSizePerspective=!!this.parameters.screenSizePerspective,this._configuration}get visible(){var e;return this.parameters.color[3]>=ce||this.parameters.stipplePattern!=null&&(((e=this.parameters.stippleOffColor)==null?void 0:e[3])??0)>ce}setParameters(e,i){e.animation=this.parameters.animation,super.setParameters(e,i)}intersectDraped({attributes:e,screenToWorldRatio:i},a,s,r,o){if(!a.options.selectionMode)return;const l=e.get("size");let n=this.parameters.width;if(this.parameters.vvSize){const S=e.get("sizeFeatureAttribute").data[0];Number.isNaN(S)?n*=this.parameters.vvSize.fallback[0]:n*=Ve(this.parameters.vvSize.offset[0]+S*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0])}else l&&(n*=l.data[0]);const p=s[0],u=s[1],g=(n/2+4)*i;let d=Number.MAX_VALUE,b=0;const m=e.get("position").data,y=Xe(this.parameters,e)?m.length-2:m.length-5;for(let S=0;S<y;S+=3){const U=m[S],X=m[S+1],h=(S+3)%m.length,R=p-U,A=u-X,E=m[h]-U,f=m[h+1]-X,P=Ve((E*R+f*A)/(E*E+f*f),0,1),W=E*P-R,V=f*P-A,Z=W*W+V*V;Z<d&&(d=Z,b=S/3)}d<g*g&&r(o.distance,o.normal,b)}intersect(e,i,a,s,r,o){const{options:l,camera:n,rayBegin:p,rayEnd:u}=a;if(!l.selectionMode||!e.visible||!n)return;if(!Yi(i))return void Dt.getLogger("esri.views.3d.webgl-engine.materials.RibbonLineMaterial").error("intersection assumes a translation-only matrix");const g=e.attributes,d=g.get("position").data;let b=this.parameters.width;if(this.parameters.vvSize){const h=g.get("sizeFeatureAttribute").data[0];Number.isNaN(h)||(b*=Ve(this.parameters.vvSize.offset[0]+h*this.parameters.vvSize.factor[0],this.parameters.vvSize.minSize[0],this.parameters.vvSize.maxSize[0]))}else g.has("size")&&(b*=g.get("size").data[0]);const m=$a;Xt(m,a.point);const y=b*n.pixelRatio/2+4*n.pixelRatio;ee(ue[0],m[0]-y,m[1]+y,0),ee(ue[1],m[0]+y,m[1]+y,0),ee(ue[2],m[0]+y,m[1]-y,0),ee(ue[3],m[0]-y,m[1]-y,0);for(let h=0;h<4;h++)if(!n.unprojectFromRenderScreen(ue[h],ie[h]))return;Pe(n.eye,ie[0],ie[1],ke),Pe(n.eye,ie[1],ie[2],Ue),Pe(n.eye,ie[2],ie[3],Ne),Pe(n.eye,ie[3],ie[0],Be);let S=Number.MAX_VALUE,U=0;const X=Xe(this.parameters,g)?d.length-2:d.length-5;for(let h=0;h<X;h+=3){F[0]=d[h]+i[12],F[1]=d[h+1]+i[13],F[2]=d[h+2]+i[14];const R=(h+3)%d.length;if(j[0]=d[R]+i[12],j[1]=d[R+1]+i[13],j[2]=d[R+2]+i[14],Y(ke,F)<0&&Y(ke,j)<0||Y(Ue,F)<0&&Y(Ue,j)<0||Y(Ne,F)<0&&Y(Ne,j)<0||Y(Be,F)<0&&Y(Be,j)<0)continue;const A=n.projectToRenderScreen(F,Ia),E=n.projectToRenderScreen(j,ka);if(A==null||E==null)continue;if(A[2]<0&&E[2]>0){ve(Q,F,j);const P=n.frustum,W=-Y(P[4],F)/ot(Q,vt(P[4]));if(Fe(Q,Q,W),Ce(F,F,Q),!n.projectToRenderScreen(F,A))continue}else if(A[2]>0&&E[2]<0){ve(Q,j,F);const P=n.frustum,W=-Y(P[4],j)/ot(Q,vt(P[4]));if(Fe(Q,Q,W),Ce(j,j,Q),!n.projectToRenderScreen(j,E))continue}else if(A[2]<0&&E[2]<0)continue;A[2]=0,E[2]=0;const f=ea(je(A,E,wt),m);f<S&&(S=f,ae(Pt,F),ae(zt,j),U=h/3)}if(S<y*y){let h=Number.MAX_VALUE;if(ta(je(Pt,zt,wt),je(p,u,Ua),oe)){ve(oe,oe,p);const R=ti(oe);Fe(oe,oe,1/R),h=R/Ye(p,u)}o(h,oe,U)}}get hasEmissions(){return this.parameters.emissiveStrength>0}createBufferWriter(){return new ja(Ft(this.parameters),this.parameters)}createGLMaterial(e){return new Va(e)}validateParameters(e){e.join!=="miter"&&(e.miterLimit=0),e.markerParameters!=null&&(e.markerScale=e.markerParameters.width/e.width)}update(e){const{hasAnimation:i}=this.parameters;return!!i&&(this.setParameters({timeElapsed:Zt(e.time)},!1),e.dt!==0)}}class Va extends fi{constructor(){super(...arguments),this._stipplePattern=null}dispose(){var e;super.dispose(),(e=this._stippleTextures)==null||e.release(this._stipplePattern),this._stipplePattern=null}beginSlot(e){const i=this._material.parameters.stipplePattern;return this._stipplePattern!==i&&(this._material.setParameters({stippleTexture:this._stippleTextures.swap(i,this._stipplePattern)}),this._stipplePattern=i),this.getTechnique(Ea,e)}}class Fa extends hi{constructor(){super(...arguments),this.width=0,this.color=ii,this.join="miter",this.cap=0,this.miterLimit=5,this.writeDepth=!0,this.hasPolygonOffset=!1,this.stippleTexture=null,this.stipplePreferContinuous=!0,this.markerParameters=null,this.markerScale=1,this.hasSlicePlane=!1,this.vvFastUpdate=!1,this.isClosed=!1,this.falloff=0,this.innerWidth=0,this.wireframe=!1,this.timeElapsed=0,this.animation=0,this.animationSpeed=1,this.trailLength=1,this.startTime=0,this.endTime=1/0,this.fadeInTime=0,this.fadeOutTime=1/0,this.emissiveStrength=0}get transparent(){var e;return this.color[3]<1||this.hasAnimation||this.stipplePattern!=null&&(((e=this.stippleOffColor)==null?void 0:e[3])??0)<1}get hasAnimation(){return this.animation!==0}}class ja{constructor(e,i){this.layout=e,this._parameters=i;const a=i.stipplePattern?1:0;switch(this._parameters.join){case"miter":case"bevel":this.numJoinSubdivisions=a;break;case"round":this.numJoinSubdivisions=Se+a}}_isClosed(e){return Xe(this._parameters,e)}allocate(e){return this.layout.createBuffer(e)}elementCount(e){const i=e.get("position").indices.length/2+1,a=this._isClosed(e);let s=a?2:4;return s+=((a?i:i-1)-(a?0:1))*(2*this.numJoinSubdivisions+4),s+=2,this._parameters.wireframe&&(s=2+4*(s-2)),s}write(e,i,a,s,r,o){var it,at,st,rt;const l=this.layout,n=a.get("position"),p=n.indices,u=n.data.length/3,g=(it=a.get("distanceToStart"))==null?void 0:it.data;p&&p.length!==2*(u-1)&&console.warn("RibbonLineMaterial does not support indices");const d=l.fields.has("sizeFeatureAttribute");let b=1,m=null;if(d){const v=a.get("sizeFeatureAttribute");v.data.length===1?b=v.data[0]:m=v.data}else b=((at=a.get("size"))==null?void 0:at.data[0])??1;let y=[1,1,1,1],S=0,U=null;const X=l.fields.has("colorFeatureAttribute");if(X){const v=a.get("colorFeatureAttribute");v.data.length===1?S=v.data[0]:U=v.data}else y=((st=a.get("color"))==null?void 0:st.data)??y;const h=(rt=a.get("timeStamps"))==null?void 0:rt.data,R=h&&l.fields.has("timeStamps"),A=l.fields.has("opacityFeatureAttribute");let E=0,f=null;if(A){const v=a.get("opacityFeatureAttribute");v.data.length===1?E=v.data[0]:f=v.data}const P=new Float32Array(r.buffer),W=Qi(r.buffer),V=new Uint8Array(r.buffer),Z=l.stride/4;let x=o*Z;const Ae=x;let I=0;const Ee=g?(v,q,re)=>I=g[re]:(v,q,re)=>I+=Ye(v,q),se=P.BYTES_PER_ELEMENT/W.BYTES_PER_ELEMENT,tt=4/se,kt=Ot(),H=(v,q,re,N,ye,Ut,_e,Nt)=>{P[x++]=q[0],P[x++]=q[1],P[x++]=q[2],ct(v,q,W,x*se),x+=tt,ct(re,q,W,x*se),x+=tt,P[x++]=Nt;let te=x*se;if(W[te++]=ye,W[te++]=Ut,x=Math.ceil(te/se),X)P[x]=(U==null?void 0:U[_e])??S;else{const k=Math.min(4*_e,y.length-4),xe=4*x;V[xe]=255*y[k],V[xe+1]=255*y[k+1],V[xe+2]=255*y[k+2],V[xe+3]=255*y[k+3]}if(x++,P[x++]=(m==null?void 0:m[_e])??b,A&&(P[x++]=(f==null?void 0:f[_e])??E),kt){let k=4*x;s?(V[k++]=s[0],V[k++]=s[1],V[k++]=s[2],V[k++]=s[3]):(V[k++]=0,V[k++]=0,V[k++]=0,V[k++]=0),x=Math.ceil(.25*k)}R&&(te=x*se,W[te++]=N[0],W[te++]=N[1],W[te++]=N[2],W[te++]=N[3],x=Math.ceil(te/se))};x+=Z,ee(_,n.data[0],n.data[1],n.data[2]),R&&ge(M,h[0],h[1],h[2],h[3]),e&&K(_,_,e);const be=this._isClosed(a);if(be){const v=n.data.length-3;ee(L,n.data[v],n.data[v+1],n.data[v+2]),e&&K(L,L,e)}else ee(D,n.data[3],n.data[4],n.data[5]),e&&K(D,D,e),H(_,_,D,M,1,-4,0,0),H(_,_,D,M,1,4,0,0),ae(L,_),ae(_,D),R&&ge(M,h[4],h[5],h[6],h[7]);const We=be?0:1,pe=be?u:u-1;for(let v=We;v<pe;v++){const q=(v+1)%u*3;ee(D,n.data[q],n.data[q+1],n.data[q+2]),e&&K(D,D,e),Ee(L,_,v),H(L,_,D,M,0,-1,v,I),H(L,_,D,M,0,1,v,I);const re=this.numJoinSubdivisions;for(let N=0;N<re;++N){const ye=(N+1)/(re+1);H(L,_,D,M,ye,-1,v,I),H(L,_,D,M,ye,1,v,I)}if(H(L,_,D,M,1,-2,v,I),H(L,_,D,M,1,2,v,I),ae(L,_),ae(_,D),R){const N=(v+1)%u*4;ge(M,h[N],h[N+1],h[N+2],h[N+3])}}return be?(ee(D,n.data[3],n.data[4],n.data[5]),e&&K(D,D,e),I=Ee(L,_,pe),H(L,_,D,M,0,-1,We,I),H(L,_,D,M,0,1,We,I)):(I=Ee(L,_,pe),H(L,_,_,M,0,-5,pe,I),H(L,_,_,M,0,5,pe,I)),Ie(P,Ae+Z,P,Ae,Z),x=Ie(P,x-Z,P,x,Z),this._parameters.wireframe&&this._addWireframeVertices(r,Ae,x,Z),null}_addWireframeVertices(e,i,a,s){const r=new Float32Array(e.buffer,a*Float32Array.BYTES_PER_ELEMENT),o=new Float32Array(e.buffer,i*Float32Array.BYTES_PER_ELEMENT,a-i);let l=0;const n=p=>l=Ie(o,p,r,l,s);for(let p=0;p<o.length-1;p+=2*s)n(p),n(p+2*s),n(p+1*s),n(p+2*s),n(p+1*s),n(p+3*s)}}function Ie(t,e,i,a,s){for(let r=0;r<s;r++)i[a++]=t[e++];return a}function Xe(t,e){return t.isClosed?e.get("position").indices.length>2:!1}function Ma(t){return t.anchor===1&&t.hideOnShortSegments&&t.placement==="begin-end"&&t.worldSpace}const F=O(),j=O(),Q=O(),oe=O(),$a=O(),Ia=le(),ka=le(),Pt=O(),zt=O(),wt=Lt(),Ua=Lt(),L=O(),_=O(),D=O(),M=Qe(),ue=[le(),le(),le(),le()],ie=[O(),O(),O(),O()],ke=Re(),Ue=Re(),Ne=Re(),Be=Re();let As=class{constructor(t){this._originSR=t,this._rootOriginId="root/"+Ze(),this._origins=new Map,this._objects=new Map,this._gridSize=5e5}getOrigin(t){const e=this._origins.get(this._rootOriginId);if(e==null){const p=yt(t[0]+Math.random()-.5,t[1]+Math.random()-.5,t[2]+Math.random()-.5,this._rootOriginId);return this._origins.set(this._rootOriginId,p),p}const i=this._gridSize,a=Math.round(t[0]/i),s=Math.round(t[1]/i),r=Math.round(t[2]/i),o=`${a}/${s}/${r}`;let l=this._origins.get(o);const n=.5*i;if(ve(C,t,e.vec3),C[0]=Math.abs(C[0]),C[1]=Math.abs(C[1]),C[2]=Math.abs(C[2]),C[0]<n&&C[1]<n&&C[2]<n){if(l){const p=Math.max(...C);if(ve(C,t,l.vec3),C[0]=Math.abs(C[0]),C[1]=Math.abs(C[1]),C[2]=Math.abs(C[2]),Math.max(...C)<p)return l}return e}return l||(l=yt(a*i,s*i,r*i,o),this._origins.set(o,l)),l}_drawOriginBox(t,e=ai(1,1,0,1)){const i=window.view,a=i.stage,s=e.toString();if(!this._objects.has(s)){this._material=new Wa({width:2,color:e},!1);const d=new ma(a,{pickable:!1}),b=new pa({castShadow:!1});d.add(b),this._objects.set(s,b)}const r=this._objects.get(s),o=[0,1,5,4,0,2,1,7,6,2,0,1,3,7,5,4,6,2,0],l=o.length,n=new Array(3*l),p=new Array,u=.5*this._gridSize;for(let d=0;d<l;d++)n[3*d]=t[0]+(1&o[d]?u:-u),n[3*d+1]=t[1]+(2&o[d]?u:-u),n[3*d+2]=t[2]+(4&o[d]?u:-u),d>0&&p.push(d-1,d);qe(n,this._originSR,0,n,i.renderSpatialReference,0,l);const g=new mi(this._material,[["position",new ri(n,p,3,!0)]],null,2);r.addGeometry(g)}get test(){}};const C=O();class Es{constructor(e,i=null,a=0){this.array=e,this.spatialReference=i,this.offset=a}}function jt(t){return"array"in t}function De(t,e,i="ground"){if(Rt(e))return t.getElevation(e.x,e.y,e.z||0,e.spatialReference,i);if(jt(e)){let a=e.offset;return t.getElevation(e.array[a++],e.array[a++],e.array[a]||0,e.spatialReference??t.spatialReference,i)}return t.getElevation(e[0],e[1],e[2]||0,t.spatialReference,i)}function Ws(t,e,i,a,s,r,o,l,n,p,u){const g=Za[u.mode];let d,b,m=0;if(qe(t,e,i,a,n.spatialReference,s,l))return g!=null&&g.requiresAlignment(u)?(m=g.applyElevationAlignmentBuffer(a,s,r,o,l,n,p,u),d=r,b=o):(d=a,b=s),qe(d,n.spatialReference,b,r,p.spatialReference,o,l)?m:void 0}function Mt(t,e,i,a,s){const r=(Rt(t)?t.z:jt(t)?t.array[t.offset+2]:t[2])||0;switch(i.mode){case"on-the-ground":{const o=De(e,t,"ground")??0;return s.verticalDistanceToGround=0,s.sampledElevation=o,void(s.z=o)}case"relative-to-ground":{const o=De(e,t,"ground")??0,l=i.geometryZWithOffset(r,a);return s.verticalDistanceToGround=l,s.sampledElevation=o,void(s.z=l+o)}case"relative-to-scene":{const o=De(e,t,"scene")??0,l=i.geometryZWithOffset(r,a);return s.verticalDistanceToGround=l,s.sampledElevation=o,void(s.z=l+o)}case"absolute-height":{const o=i.geometryZWithOffset(r,a),l=De(e,t,"ground")??0;return s.verticalDistanceToGround=o-l,s.sampledElevation=l,void(s.z=o)}default:return void(s.z=0)}}function Vs(t,e,i,a){return Mt(t,e,i,a,de),de.z}function Fs(t,e,i){return e==="on-the-ground"&&i==="on-the-ground"?t.staysOnTheGround:e===i||e!=="on-the-ground"&&i!=="on-the-ground"?e==null||i==null?t.definedChanged:1:t.onTheGroundChanged}function js(t){return t==="relative-to-ground"||t==="relative-to-scene"}function Ms(t){return t!=="absolute-height"}function $s(t,e,i,a,s){Mt(e,i,s,a,de),Na(t,de.verticalDistanceToGround);const r=de.sampledElevation,o=Ge(Ya,t.transformation);return Oe[0]=e.x,Oe[1]=e.y,Oe[2]=de.z,aa(e.spatialReference,Oe,o,a.spatialReference)?t.transformation=o:console.warn("Could not locate symbol object properly, it might be misplaced"),r}function Na(t,e){for(let i=0;i<t.geometries.length;++i){const a=t.geometries[i].getMutableAttribute("centerOffsetAndDistance");a&&a.data[3]!==e&&(a.data[3]=e,t.geometryVertexAttributeUpdated(t.geometries[i],"centerOffsetAndDistance"))}}function Ba(t,e,i,a,s,r){let o=0;const l=r.spatialReference;e*=3,a*=3;for(let n=0;n<s;++n){const p=t[e],u=t[e+1],g=t[e+2],d=r.getElevation(p,u,g,l,"ground")??0;o+=d,i[a]=p,i[a+1]=u,i[a+2]=d,e+=3,a+=3}return o/s}function Ha(t,e,i,a,s,r,o,l){let n=0;const p=l.calculateOffsetRenderUnits(o),u=l.featureExpressionInfoContext,g=r.spatialReference;e*=3,a*=3;for(let d=0;d<s;++d){const b=t[e],m=t[e+1],y=t[e+2],S=r.getElevation(b,m,y,g,"ground")??0;n+=S,i[a]=b,i[a+1]=m,i[a+2]=u==null?y+S+p:S+p,e+=3,a+=3}return n/s}function qa(t,e,i,a,s,r,o,l){let n=0;const p=l.calculateOffsetRenderUnits(o),u=l.featureExpressionInfoContext,g=r.spatialReference;e*=3,a*=3;for(let d=0;d<s;++d){const b=t[e],m=t[e+1],y=t[e+2],S=r.getElevation(b,m,y,g,"scene")??0;n+=S,i[a]=b,i[a+1]=m,i[a+2]=u==null?y+S+p:S+p,e+=3,a+=3}return n/s}function Ga(t){const e=t.meterUnitOffset,i=t.featureExpressionInfoContext;return e!==0||i!=null}function Ja(t,e,i,a,s,r,o,l){const n=l.calculateOffsetRenderUnits(o),p=l.featureExpressionInfoContext;e*=3,a*=3;for(let u=0;u<s;++u){const g=t[e],d=t[e+1],b=t[e+2];i[a]=g,i[a+1]=d,i[a+2]=p==null?b+n:n,e+=3,a+=3}return 0}class Xa{constructor(){this.verticalDistanceToGround=0,this.sampledElevation=0,this.z=0}}const Za={"absolute-height":{applyElevationAlignmentBuffer:Ja,requiresAlignment:Ga},"on-the-ground":{applyElevationAlignmentBuffer:Ba,requiresAlignment:()=>!0},"relative-to-ground":{applyElevationAlignmentBuffer:Ha,requiresAlignment:()=>!0},"relative-to-scene":{applyElevationAlignmentBuffer:qa,requiresAlignment:()=>!0}},Ya=me(),de=new Xa,Oe=O(),Qa=()=>Dt.getLogger("esri.views.3d.layers.graphics.featureExpressionInfoUtils");function Ka(t){return{cachedResult:t.cachedResult,arcade:t.arcade?{func:t.arcade.func,context:t.arcade.modules.arcadeUtils.createExecContext(null,{sr:t.arcade.context.spatialReference}),modules:t.arcade.modules}:null}}async function Is(t,e,i,a){const s=t==null?void 0:t.expression;if(typeof s!="string")return null;const r=as(s);if(r!=null)return{cachedResult:r};const o=await Yt();Qt(i);const l=o.arcadeUtils,n=l.createSyntaxTree(s);return l.dependsOnView(n)?(a==null||a.error("Expressions containing '$view' are not supported on ElevationInfo"),{cachedResult:0}):{arcade:{func:l.createFunction(n),context:l.createExecContext(null,{sr:e}),modules:o}}}function es(t,e,i){return t.arcadeUtils.createFeature(e.attributes,e.geometry,i)}function ts(t,e){if(t!=null&&!$t(t)){if(!e||!t.arcade)return void Qa().errorOncePerTick("Arcade support required but not provided");const i=e;i._geometry&&(i._geometry=na(i._geometry)),t.arcade.modules.arcadeUtils.updateExecContext(t.arcade.context,e)}}function is(t){if(t!=null){if($t(t))return t.cachedResult;const e=t.arcade;let i=e==null?void 0:e.modules.arcadeUtils.executeFunction(e.func,e.context);return typeof i!="number"&&(t.cachedResult=0,i=0),i}return 0}function ks(t,e=!1){let i=t==null?void 0:t.featureExpressionInfo;const a=i==null?void 0:i.expression;return e||a==="0"||(i=null),i??null}const Us={cachedResult:0};function $t(t){return t.cachedResult!=null}function as(t){return t==="0"?0:null}class It{constructor(){this._meterUnitOffset=0,this._renderUnitOffset=0,this._unit="meters",this._metersPerElevationInfoUnit=1,this._featureExpressionInfoContext=null,this.mode=null,this.centerInElevationSR=null}get featureExpressionInfoContext(){return this._featureExpressionInfoContext}get meterUnitOffset(){return this._meterUnitOffset}get unit(){return this._unit}set unit(e){this._unit=e,this._metersPerElevationInfoUnit=sa(e)}get requiresSampledElevationInfo(){return this.mode!=="absolute-height"}reset(){this.mode=null,this._meterUnitOffset=0,this._renderUnitOffset=0,this._featureExpressionInfoContext=null,this.unit="meters"}set offsetMeters(e){this._meterUnitOffset=e,this._renderUnitOffset=0}set offsetElevationInfoUnits(e){this._meterUnitOffset=e*this._metersPerElevationInfoUnit,this._renderUnitOffset=0}addOffsetRenderUnits(e){this._renderUnitOffset+=e}geometryZWithOffset(e,i){const a=this.calculateOffsetRenderUnits(i);return this.featureExpressionInfoContext!=null?a:e+a}calculateOffsetRenderUnits(e){let i=this._meterUnitOffset;const a=this.featureExpressionInfoContext;return a!=null&&(i+=is(a)*this._metersPerElevationInfoUnit),i/e.unitInMeters+this._renderUnitOffset}setFromElevationInfo(e){this.mode=e.mode,this.unit=ra(e.unit)?e.unit:"meters",this.offsetElevationInfoUnits=e.offset??0}setFeatureExpressionInfoContext(e){this._featureExpressionInfoContext=e}updateFeatureExpressionInfoContextForGraphic(e,i,a){e.arcade?(this._featureExpressionInfoContext=Ka(e),this.updateFeatureExpressionFeature(i,a)):this._featureExpressionInfoContext=e}updateFeatureExpressionFeature(e,i){const a=this.featureExpressionInfoContext;a!=null&&a.arcade&&(a.cachedResult=void 0,ts(this._featureExpressionInfoContext,e.geometry?es(a.arcade.modules,e,i):null))}static fromElevationInfo(e){const i=new It;return e!=null&&i.setFromElevationInfo(e),i}}const ss=Object.freeze(Object.defineProperty({__proto__:null,build:Vt,ribbonlineNumRoundJoinSubdivisions:Se},Symbol.toStringTag,{value:"Module"}));export{As as $,ga as A,Na as B,Rs as C,ma as D,Ws as G,Vs as H,Wa as I,Fs as J,Je as L,la as P,Sa as R,Oa as V,za as W,js as X,$s as Y,Mt as a,De as b,Xa as c,Es as d,Ms as e,Wt as f,Us as h,It as n,Is as o,ks as p,yt as q,Ls as v,pa as w};
