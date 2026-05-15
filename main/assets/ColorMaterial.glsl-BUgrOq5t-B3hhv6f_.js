import{t as e}from"./ShaderBuilder-aUMFb5cS-D2OCjrzz.js";import{t}from"./glsl-EDZkDhgF-YpsCyUYs.js";import{r as n,t as r}from"./AlphaCutoff-lGKpUdxr-B7eCn2-f.js";import{t as i}from"./ObjectAndLayerIdColor.glsl-C3sEfoJy-DswcUPCV.js";import{t as a}from"./Float4PassUniform-R_rVPKlL-u0XYS7xz.js";import{a as o}from"./VisualVariables.glsl-CLB2wooA-CrMz7C1Y.js";import{n as s}from"./View.glsl-YsNDLcX0-CjGrhnxM.js";import{t as c}from"./TerrainDepthTest.glsl-DZ7tKbZj-B76V56mr.js";import{t as l}from"./OutputColorHighlightOLID.glsl-vs7-ar26-DvrWbQfE.js";import{r as u}from"./Transform.glsl-B8LYsJdc-D1_LreiC.js";import{t as d}from"./VertexColor.glsl-DkZ0DT-i-DmlgS3gQ.js";function f(f){let p=new e,{vertex:m,fragment:h,attributes:g,varyings:_}=p,{hasVVColor:v,hasVertexColors:y}=f;return s(m,f),p.include(u),p.include(d,f),p.include(o,f),p.include(i,f),h.include(r,f),p.include(l,f),p.include(c,f),g.add(`position`,`vec3`),v&&g.add(`colorFeatureAttribute`,`float`),y||_.add(`vColor`,`vec4`),_.add(`vpos`,`vec3`,{invariant:!0}),m.uniforms.add(new a(`uColor`,e=>e.color)),m.main.add(t`
      vpos = position;
      forwardVertexColor();
      forwardObjectAndLayerIdColor();

      ${y?`vColor *= uColor;`:v?`vColor = uColor * interpolateVVColor(colorFeatureAttribute);`:`vColor = uColor;`}
      forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
      gl_Position = transformPosition(proj, view, vpos);`),h.include(n),h.main.add(t`discardBySlice(vpos);
discardByTerrainDepth();
outputColorHighlightOLID(applySlice(vColor, vpos), vColor.rgb);`),p}var p=Object.freeze(Object.defineProperty({__proto__:null,build:f},Symbol.toStringTag,{value:`Module`}));export{p as n,f as t};