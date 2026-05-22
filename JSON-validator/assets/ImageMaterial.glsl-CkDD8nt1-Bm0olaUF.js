import{t as e}from"./ShaderBuilder-qfzG-N7a-_MHxoFkL.js";import{n as t,t as n}from"./glsl-EDZkDhgF-CdQT_T3M.js";import{t as r}from"./FloatPassUniform-gHcGW-mi-C4YRZdNT.js";import{t as i}from"./Texture2DPassUniform-RVTT2Sjh-DNHX-w6c.js";import{t as a}from"./NoParameters-DvFAVXX5-D4-4keqN.js";import{r as o,t as s}from"./AlphaCutoff-CYKfZXRg-DXT1fwYN.js";import{n as c}from"./View.glsl-DtKDkY_h-CX2rKRzP.js";import{t as l}from"./TerrainDepthTest.glsl-D0F_r5xM-CwcBX4pv.js";import{t as u}from"./OutputColorHighlightOLID.glsl-DuYrVBF1-Dc5MS-j7.js";import{r as d}from"./Transform.glsl-B8LYsJdc-DxbZLP5s.js";var f=class extends a{};function p(a){let f=new e,{vertex:p,fragment:m,varyings:h}=f,{output:g,perspectiveInterpolation:_}=a;return c(p,a),f.include(d),f.include(l,a),f.fragment.include(s,a),f.fragment.code.add(n`void outputObjectAndLayerIdColor() {
    ${t(g===9,`fragColor = vec4(0, 0, 0, 1);`)}
    }`),f.include(u,a),f.attributes.add(`position`,`vec3`),f.attributes.add(`uv0`,`vec2`),_&&f.attributes.add(`perspectiveDivide`,`float`),p.main.add(n`
    vpos = position;
    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    vTexCoord = uv0;
    gl_Position = transformPosition(proj, view, vpos);
    ${t(_,`gl_Position *= perspectiveDivide;`)}`),h.add(`vpos`,`vec3`,{invariant:!0}),h.add(`vTexCoord`,`vec2`),m.include(o),m.uniforms.add(new r(`opacity`,e=>e.opacity),new i(`tex`,e=>e.texture)).main.add(n`discardBySlice(vpos);
discardByTerrainDepth();
vec4 finalColor = texture(tex, vTexCoord) * opacity;
outputColorHighlightOLID(applySlice(finalColor, vpos), finalColor.rgb);`),f}var m=Object.freeze(Object.defineProperty({__proto__:null,ImageMaterialPassParameters:f,build:p},Symbol.toStringTag,{value:`Module`}));export{m as n,p as r,f as t};