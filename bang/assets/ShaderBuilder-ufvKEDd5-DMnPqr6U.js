import{P as v,l as b}from"./index-BeTPrQ6f.js";const p=()=>v.getLogger("esri.views.3d.webgl-engine.core.shaderModules.shaderBuilder");class f{constructor(){this._includedModules=new Map}include(e,t){this._includedModules.has(e)?this._includedModules.get(e):(this._includedModules.set(e,t),e(this.builder,t))}}class D extends f{constructor(){super(...arguments),this.vertex=new g,this.fragment=new g,this.attributes=new A,this.varyings=new E,this.extensions=new l,this.outputs=new d}get fragmentUniforms(){return this.fragment.uniforms.entries}get attributeNames(){return this.attributes.names}get builder(){return this}generate(e,t=!1){const r=this.extensions.generateSource(e),s=this.attributes.generateSource(e),a=this.varyings.generateSource(e),i=e==="vertex"?this.vertex:this.fragment,u=i.uniforms.generateSource(),m=i.code.generateSource(),S=i.main.generateSource(t),_=e==="vertex"?x:F,$=i.constants.generateSource(),T=this.outputs.generateSource(e);return`#version 300 es
${r.join(`
`)}
${_}
${$.join(`
`)}
${u.join(`
`)}
${s.join(`
`)}
${a.join(`
`)}
${T.join(`
`)}
${m.join(`
`)}
${S.join(`
`)}`}generateBind(e){const t=new Map;this.vertex.uniforms.entries.forEach(a=>{const i=a.bind[0];i&&t.set(a.name,i)}),this.fragment.uniforms.entries.forEach(a=>{const i=a.bind[0];i&&t.set(a.name,i)});const r=Array.from(t.values()),s=r.length;return a=>{for(let i=0;i<s;++i)r[i](e,a)}}generateBindPass(e){const t=new Map;this.vertex.uniforms.entries.forEach(a=>{const i=a.bind[1];i&&t.set(a.name,i)}),this.fragment.uniforms.entries.forEach(a=>{const i=a.bind[1];i&&t.set(a.name,i)});const r=Array.from(t.values()),s=r.length;return(a,i)=>{for(let u=0;u<s;++u)r[u](e,a,i)}}generateBindDraw(e){const t=new Map;this.vertex.uniforms.entries.forEach(a=>{const i=a.bind[2];i&&t.set(a.name,i)}),this.fragment.uniforms.entries.forEach(a=>{const i=a.bind[2];i&&t.set(a.name,i)});const r=Array.from(t.values()),s=r.length;return(a,i,u)=>{for(let m=0;m<s;++m)r[m](e,u,a,i)}}}class w{constructor(e){this._stage=e,this._entries=new Map}add(...e){for(const t of e)this._add(t);return this._stage}get(e){return this._entries.get(e)}_add(e){if(e!=null){if(this._entries.has(e.name)&&!this._entries.get(e.name).equals(e))throw new b("shaderbuilder:duplicate-uniform",`Duplicate uniform name ${e.name} for different uniform type`);this._entries.set(e.name,e)}else p().error(`Trying to add null Uniform from ${new Error().stack}.`)}generateSource(){return Array.from(this._entries.values()).map(({name:e,arraySize:t,type:r})=>t!=null?`uniform ${r} ${e}[${t}];`:`uniform ${r} ${e};`)}get entries(){return Array.from(this._entries.values())}}class y{constructor(e){this._stage=e,this._bodies=new Array}add(e){return this._bodies.push(e),this._stage}generateSource(e){if(this._bodies.length>0)return[`void main() {
 ${this._bodies.join(`
`)||""} 
}`];if(e)throw new b("shaderbuilder:missing-main","Shader does not contain main function body.");return[]}}class I{constructor(e){this._stage=e,this._entries=new Array}add(e){return this._entries.push(e),this._stage}generateSource(){return this._entries}}class g extends f{constructor(){super(...arguments),this.uniforms=new w(this),this.main=new y(this),this.code=new I(this),this.constants=new n(this)}get builder(){return this}}class A{constructor(){this._entries=new Array}add(e,t){this._entries.push([e,t])}generateSource(e){return e==="fragment"?[]:this._entries.map(t=>`in ${t[1]} ${t[0]};`)}get names(){return this._entries.map(([e])=>e)}}class E{constructor(){this._entries=new Map}add(e,t,r){this._entries.has(e)?p().warn(`Ignoring duplicate varying ${t} ${e}`):this._entries.set(e,{type:t,invariant:(r==null?void 0:r.invariant)??!1})}generateSource(e){const t=new Array;return this._entries.forEach((r,s)=>t.push((r.invariant&&e==="vertex"?"invariant ":"")+(r.type==="int"?"flat ":"")+(e==="vertex"?"out":"in")+` ${r.type} ${s};`)),t}}const c=class c{constructor(){this._entries=new Set}add(e){this._entries.add(e)}generateSource(e){const t=e==="vertex"?c.ALLOWLIST_VERTEX:c.ALLOWLIST_FRAGMENT;return Array.from(this._entries).filter(r=>t.includes(r)).map(r=>`#extension ${r} : enable`)}};c.ALLOWLIST_FRAGMENT=["GL_EXT_shader_texture_lod","GL_OES_standard_derivatives"],c.ALLOWLIST_VERTEX=[];let l=c;const h=class h{constructor(){this._entries=new Map}add(e,t,r=0){const s=this._entries.get(r);(s==null?void 0:s.name)!==e||(s==null?void 0:s.type)!==t?this._entries.set(r,{name:e,type:t}):p().warn(`Fragment shader output location ${r} occupied`)}generateSource(e){if(e==="vertex")return[];this._entries.size===0&&this._entries.set(0,{name:h.DEFAULT_NAME,type:h.DEFAULT_TYPE});const t=new Array;return this._entries.forEach((r,s)=>t.push(`layout(location = ${s}) out ${r.type} ${r.name};`)),t}};h.DEFAULT_TYPE="vec4",h.DEFAULT_NAME="fragColor";let d=h;class n{constructor(e){this._stage=e,this._entries=new Set}add(e,t,r){let s="ERROR_CONSTRUCTOR_STRING";switch(t){case"float":s=n._numberToFloatStr(r);break;case"int":s=n._numberToIntStr(r);break;case"bool":s=r.toString();break;case"vec2":s=`vec2(${n._numberToFloatStr(r[0])},                            ${n._numberToFloatStr(r[1])})`;break;case"vec3":s=`vec3(${n._numberToFloatStr(r[0])},                            ${n._numberToFloatStr(r[1])},                            ${n._numberToFloatStr(r[2])})`;break;case"vec4":s=`vec4(${n._numberToFloatStr(r[0])},                            ${n._numberToFloatStr(r[1])},                            ${n._numberToFloatStr(r[2])},                            ${n._numberToFloatStr(r[3])})`;break;case"ivec2":s=`ivec2(${n._numberToIntStr(r[0])},                             ${n._numberToIntStr(r[1])})`;break;case"ivec3":s=`ivec3(${n._numberToIntStr(r[0])},                             ${n._numberToIntStr(r[1])},                             ${n._numberToIntStr(r[2])})`;break;case"ivec4":s=`ivec4(${n._numberToIntStr(r[0])},                             ${n._numberToIntStr(r[1])},                             ${n._numberToIntStr(r[2])},                             ${n._numberToIntStr(r[3])})`;break;case"uvec2":s=`uvec2(${n._numberToIntStr(r[0])},                             ${n._numberToIntStr(r[1])})`;break;case"uvec3":s=`uvec3(${n._numberToIntStr(r[0])},                             ${n._numberToIntStr(r[1])},                             ${n._numberToIntStr(r[2])})`;break;case"uvec4":s=`uvec4(${n._numberToIntStr(r[0])},                             ${n._numberToIntStr(r[1])},                             ${n._numberToIntStr(r[2])},                             ${n._numberToIntStr(r[3])})`;break;case"mat2":case"mat3":case"mat4":s=`${t}(${Array.prototype.map.call(r,a=>n._numberToFloatStr(a)).join(", ")})`}return this._entries.add(`const ${t} ${e} = ${s};`),this._stage}static _numberToIntStr(e){return e.toFixed(0)}static _numberToFloatStr(e){return Number.isInteger(e)?e.toFixed(1):e.toString()}generateSource(){return Array.from(this._entries)}}const F=`#ifdef GL_FRAGMENT_PRECISION_HIGH
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
 `;export{D as T};
