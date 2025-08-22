import{a6 as w,h as f}from"./index-JysQxb7m.js";import{n as c}from"./BindType-CKbZk6AG-Bqvzo9NX.js";const g=()=>w.getLogger("esri.views.3d.webgl-engine.core.shaderModules.shaderBuilder");class S{constructor(){this._includedModules=new Map}include(e,t){this._includedModules.has(e)?this._includedModules.get(e):(this._includedModules.set(e,t),e(this.builder,t))}}class k extends S{constructor(){super(...arguments),this.vertex=new b,this.fragment=new b,this.attributes=new E,this.varyings=new F,this.extensions=new l,this.outputs=new p}get fragmentUniforms(){return this.fragment.uniforms.entries}get builder(){return this}generate(e,t=!1){const r=this.extensions.generateSource(e),s=this.attributes.generateSource(e),a=this.varyings.generateSource(e),i=e==="vertex"?this.vertex:this.fragment,u=i.uniforms.generateSource(),d=i.code.generateSource(),_=i.main.generateSource(t),$=e==="vertex"?x:L,T=i.constants.generateSource(),v=this.outputs.generateSource(e);return`#version 300 es
${r.join(`
`)}
${$}
${T.join(`
`)}
${u.join(`
`)}
${s.join(`
`)}
${a.join(`
`)}
${v.join(`
`)}
${d.join(`
`)}
${_.join(`
`)}`}generateBind(e){const t=new Map;this.vertex.uniforms.entries.forEach(a=>{const i=a.bind[c.Bind];i&&t.set(a.name,i)}),this.fragment.uniforms.entries.forEach(a=>{const i=a.bind[c.Bind];i&&t.set(a.name,i)});const r=Array.from(t.values()),s=r.length;return a=>{for(let i=0;i<s;++i)r[i](e,a)}}generateBindPass(e){const t=new Map;this.vertex.uniforms.entries.forEach(a=>{const i=a.bind[c.Pass];i&&t.set(a.name,i)}),this.fragment.uniforms.entries.forEach(a=>{const i=a.bind[c.Pass];i&&t.set(a.name,i)});const r=Array.from(t.values()),s=r.length;return(a,i)=>{for(let u=0;u<s;++u)r[u](e,a,i)}}generateBindDraw(e){const t=new Map;this.vertex.uniforms.entries.forEach(a=>{const i=a.bind[c.Draw];i&&t.set(a.name,i)}),this.fragment.uniforms.entries.forEach(a=>{const i=a.bind[c.Draw];i&&t.set(a.name,i)});const r=Array.from(t.values()),s=r.length;return(a,i,u)=>{for(let d=0;d<s;++d)r[d](e,u,a,i)}}}class y{constructor(e){this._stage=e,this._entries=new Map}add(...e){for(const t of e)this._add(t);return this._stage}get(e){return this._entries.get(e)}_add(e){if(e!=null){if(this._entries.has(e.name)&&!this._entries.get(e.name).equals(e))throw new f("shaderbuilder:duplicate-uniform",`Duplicate uniform name ${e.name} for different uniform type`);this._entries.set(e.name,e)}else g().error(`Trying to add null Uniform from ${new Error().stack}.`)}generateSource(){return Array.from(this._entries.values()).map(({name:e,arraySize:t,type:r})=>t!=null?`uniform ${r} ${e}[${t}];`:`uniform ${r} ${e};`)}get entries(){return Array.from(this._entries.values())}}class I{constructor(e){this._stage=e,this._bodies=new Array}add(e){return this._bodies.push(e),this._stage}generateSource(e){if(this._bodies.length>0)return[`void main() {
 ${this._bodies.join(`
`)||""} 
}`];if(e)throw new f("shaderbuilder:missing-main","Shader does not contain main function body.");return[]}}class A{constructor(e){this._stage=e,this._entries=new Array}add(e){return this._entries.push(e),this._stage}generateSource(){return this._entries}}class b extends S{constructor(){super(...arguments),this.uniforms=new y(this),this.main=new I(this),this.code=new A(this),this.constants=new n(this)}get builder(){return this}}class E{constructor(){this._entries=new Array}add(e,t){this._entries.push([e,t])}generateSource(e){return e==="fragment"?[]:this._entries.map(t=>`in ${t[1]} ${t[0]};`)}}class F{constructor(){this._entries=new Map}add(e,t,r){this._entries.has(e)?g().warn(`Ignoring duplicate varying ${t} ${e}`):this._entries.set(e,{type:t,invariant:(r==null?void 0:r.invariant)??!1})}generateSource(e){const t=new Array;return this._entries.forEach((r,s)=>t.push((r.invariant&&e==="vertex"?"invariant ":"")+(e==="vertex"?"out":"in")+` ${r.type} ${s};`)),t}}const h=class h{constructor(){this._entries=new Set}add(e){this._entries.add(e)}generateSource(e){const t=e==="vertex"?h.ALLOWLIST_VERTEX:h.ALLOWLIST_FRAGMENT;return Array.from(this._entries).filter(r=>t.includes(r)).map(r=>`#extension ${r} : enable`)}};h.ALLOWLIST_FRAGMENT=["GL_EXT_shader_texture_lod","GL_OES_standard_derivatives"],h.ALLOWLIST_VERTEX=[];let l=h;const m=class m{constructor(){this._entries=new Map}add(e,t,r=0){const s=this._entries.get(r);(s==null?void 0:s.name)!==e||(s==null?void 0:s.type)!==t?this._entries.set(r,{name:e,type:t}):g().warn(`Fragment shader output location ${r} occupied`)}generateSource(e){if(e==="vertex")return[];this._entries.size===0&&this._entries.set(0,{name:m.DEFAULT_NAME,type:m.DEFAULT_TYPE});const t=new Array;return this._entries.forEach((r,s)=>t.push(`layout(location = ${s}) out ${r.type} ${r.name};`)),t}};m.DEFAULT_TYPE="vec4",m.DEFAULT_NAME="fragColor";let p=m;class n{constructor(e){this._stage=e,this._entries=new Set}add(e,t,r){let s="ERROR_CONSTRUCTOR_STRING";switch(t){case"float":s=n._numberToFloatStr(r);break;case"int":s=n._numberToIntStr(r);break;case"bool":s=r.toString();break;case"vec2":s=`vec2(${n._numberToFloatStr(r[0])},                            ${n._numberToFloatStr(r[1])})`;break;case"vec3":s=`vec3(${n._numberToFloatStr(r[0])},                            ${n._numberToFloatStr(r[1])},                            ${n._numberToFloatStr(r[2])})`;break;case"vec4":s=`vec4(${n._numberToFloatStr(r[0])},                            ${n._numberToFloatStr(r[1])},                            ${n._numberToFloatStr(r[2])},                            ${n._numberToFloatStr(r[3])})`;break;case"ivec2":s=`ivec2(${n._numberToIntStr(r[0])},                             ${n._numberToIntStr(r[1])})`;break;case"ivec3":s=`ivec3(${n._numberToIntStr(r[0])},                             ${n._numberToIntStr(r[1])},                             ${n._numberToIntStr(r[2])})`;break;case"ivec4":s=`ivec4(${n._numberToIntStr(r[0])},                             ${n._numberToIntStr(r[1])},                             ${n._numberToIntStr(r[2])},                             ${n._numberToIntStr(r[3])})`;break;case"uvec2":s=`uvec2(${n._numberToIntStr(r[0])},                             ${n._numberToIntStr(r[1])})`;break;case"uvec3":s=`uvec3(${n._numberToIntStr(r[0])},                             ${n._numberToIntStr(r[1])},                             ${n._numberToIntStr(r[2])})`;break;case"uvec4":s=`uvec4(${n._numberToIntStr(r[0])},                             ${n._numberToIntStr(r[1])},                             ${n._numberToIntStr(r[2])},                             ${n._numberToIntStr(r[3])})`;break;case"mat2":case"mat3":case"mat4":s=`${t}(${Array.prototype.map.call(r,a=>n._numberToFloatStr(a)).join(", ")})`}return this._entries.add(`const ${t} ${e} = ${s};`),this._stage}static _numberToIntStr(e){return e.toFixed(0)}static _numberToFloatStr(e){return Number.isInteger(e)?e.toFixed(1):e.toString()}generateSource(){return Array.from(this._entries)}}const L=`#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  precision highp int;
  precision highp sampler2D;
  precision highp usampler2D;
  precision highp sampler2DArray;
  precision highp sampler2DShadow;
#else
  precision mediump float;
  precision mediump int;
  precision mediump sampler2D;
  precision mediump usampler2D;
  precision mediump sampler2DArray;
  precision mediump sampler2DShadow;
#endif`,x=`precision highp float;
 precision highp sampler2D;
 precision highp usampler2D;
 precision highp sampler2DArray;
 precision highp sampler2DShadow;


 invariant gl_Position;
 `;export{k as v};
