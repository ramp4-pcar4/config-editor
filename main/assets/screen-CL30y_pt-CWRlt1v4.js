import{$t as e,Dt as t,Et as n,K as r,Kt as i,M as a,Ot as o,St as s,Tt as c,Vt as l,Xt as u,_n as d,d as f,en as p,fn as m,gn as h,in as g,nn as _,pt as v,un as y,vt as b,yn as x}from"./main-CNZ6Q9g2.js";import{t as S}from"./marked.esm-erzOXD1Y-DIXEDvve.js";l();var C=`<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:gmd="http://www.isotc211.org/2005/gmd"
                xmlns:gco="http://www.isotc211.org/2005/gco"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:gmdl="http://www.canada.gc.ca/ns/gmdl"
                xmlns:napec="http://www.ec.gc.ca/data_donnees/standards/schemas/napec"
                xmlns:gml="http://www.opengis.net/gml"
                xmlns:geonet="http://www.fao.org/geonetwork"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:schemaLocation="http://www.ec.gc.ca/data_donnees/standards/schemas/napec/schema.xsd">

  <xsl:param name="catalogue_url" />
  <xsl:decimal-format NaN=""/>

  <xsl:template match="/">

    <div class="metadata-view">

      <xsl:if test="//gmd:abstract/gco:CharacterString/text() != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.Abstract}}</h5>
        <p>
          <xsl:value-of select="//gmd:abstract/gco:CharacterString/text()" />
        </p>
      </xsl:if>

      <xsl:comment>
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.Scope}}</h5>
        <p>{{metadata.xslt.hereBeScope}}</p>
      </xsl:comment>

      <xsl:if test="//gml:TimePeriod//* != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.timePeriod}}</h5>
        <p>
          <xsl:value-of select="//gml:TimePeriod//gml:beginPosition" />
          <xsl:if test="//gml:TimePeriod//gml:beginPosition/text() != '' and //gml:TimePeriod//gml:endPosition/text() != ''">
            -
          </xsl:if>
          <xsl:value-of select="//gml:TimePeriod//gml:endPosition" />
        </p>
      </xsl:if>

      <xsl:comment>
        <xsl:if test="//gmd:supplementalInformation/gco:CharacterString/text() != ''">
          <h5 class="text-xl font-bold mb-3">{{metadata.xslt.supplementalData}}</h5>
          <p>
            <xsl:value-of select="//gmd:supplementalInformation/gco:CharacterString/text()" />
          </p>
        </xsl:if>
      </xsl:comment>

      <xsl:if test="//gmd:citedResponsibleParty//gmd:individualName/* != '' 
              or //gmd:citedResponsibleParty//gmd:organisationName/gco:CharacterString/text() != ''
              or //gmd:citedResponsibleParty//gmd:positionName/gco:CharacterString/text() != ''
              or //gmd:citedResponsibleParty//gmd:electronicMailAddress/* != ''
              or //gmd:citedResponsibleParty//gmd:role/gmd:CI_RoleCode/@codeListValue != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.contactInfo}}</h5>
        <p>
          <xsl:value-of select="//gmd:citedResponsibleParty//gmd:individualName" />
        </p>
        <p>
          <xsl:value-of select="//gmd:citedResponsibleParty//gmd:organisationName/gco:CharacterString/text()" />
        </p>
        <p>
          <xsl:value-of select="//gmd:citedResponsibleParty//gmd:positionName/gco:CharacterString/text()" />
        </p>
        <p>
          <a href="mailto:{//gmd:citedResponsibleParty//gmd:electronicMailAddress/gco:CharacterString/text()}?Subject={//gmd:identificationInfo//gmd:title/gco:CharacterString/text()}">
            <xsl:value-of select="//gmd:citedResponsibleParty//gmd:electronicMailAddress" />
          </a>
        </p>
        <p>
          <xsl:variable name="roleCode" >
            <xsl:value-of select="concat(substring(//gmd:citedResponsibleParty//gmd:role/gmd:CI_RoleCode/@codeListValue,1,1),
                        substring(//gmd:citedResponsibleParty//gmd:role/gmd:CI_RoleCode/@codeListValue, 2))" />
          </xsl:variable>

          <xsl:choose>
            <xsl:when test="$roleCode = 'resourceProvider'">{{metadata.xslt.resourceProvider}}</xsl:when>
            <xsl:when test="$roleCode = 'custodian'">{{metadata.xslt.custodian}}</xsl:when>
            <xsl:when test="$roleCode = 'owner'">{{metadata.xslt.owner}}</xsl:when>
            <xsl:when test="$roleCode = 'user'">{{metadata.xslt.user}}</xsl:when>
            <xsl:when test="$roleCode = 'distributor'">{{metadata.xslt.distributor}}</xsl:when>
            <xsl:when test="$roleCode = 'originator'">{{metadata.xslt.originator}}</xsl:when>
            <xsl:when test="$roleCode = 'pointOfContact'">{{metadata.xslt.pointOfContact}}</xsl:when>
            <xsl:when test="$roleCode = 'principalInvestigator'">{{metadata.xslt.principalInvestigator}}</xsl:when>
            <xsl:when test="$roleCode = 'processor'">{{metadata.xslt.processor}}</xsl:when>
            <xsl:when test="$roleCode = 'publisher'">{{metadata.xslt.publisher}}</xsl:when>
            <xsl:when test="$roleCode = 'author'">{{metadata.xslt.author}}</xsl:when>
            <xsl:when test="$roleCode = 'collaborator'">{{metadata.xslt.collaborator}}</xsl:when>
            <xsl:when test="$roleCode = 'editor'">{{metadata.xslt.editor}}</xsl:when>
            <xsl:when test="$roleCode = 'mediator'">{{metadata.xslt.mediator}}</xsl:when>
            <xsl:when test="$roleCode = 'rightsHolder'">{{metadata.xslt.rightsHolder}}</xsl:when>
          </xsl:choose>
        </p>
      </xsl:if>

      <xsl:if test="$catalogue_url != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.cataloguePage}}</h5>
        <p>
          <a href="{$catalogue_url}"
             rel="external" target="_blank" class="ui-link">
            {{metadata.xslt.metadata}}
          </a>
        </p>
      </xsl:if>
    </div>
  </xsl:template>
</xsl:stylesheet>
`,w=`<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:gmd="http://www.isotc211.org/2005/gmd"
                xmlns:gco="http://www.isotc211.org/2005/gco"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:gmdl="http://www.canada.gc.ca/ns/gmdl"
                xmlns:napec="http://www.ec.gc.ca/data_donnees/standards/schemas/napec"
                xmlns:gml="http://www.opengis.net/gml"
                xmlns:geonet="http://www.fao.org/geonetwork"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:schemaLocation="http://www.ec.gc.ca/data_donnees/standards/schemas/napec/schema.xsd">

  <xsl:param name="catalogue_url" />
  <xsl:decimal-format NaN=""/>

  <xsl:template match="/">

    <div class="metadata-view">

      <xsl:if test="//gmd:abstract//gmd:LocalisedCharacterString[@locale='#fra']/text() != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.Abstract}}</h5>
        <p>
          <xsl:value-of select="//gmd:abstract//gmd:LocalisedCharacterString[@locale='#fra']/text()" />
        </p>
      </xsl:if>

      <xsl:comment>
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.Scope}}</h5>
        <p>{{metadata.xslt.hereBeScope}}</p>
      </xsl:comment>

      <xsl:if test="//gml:TimePeriod//* != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.timePeriod}}</h5>
        <p>
          <xsl:value-of select="//gml:TimePeriod//gml:beginPosition" />
          <xsl:if test="//gml:TimePeriod//gml:beginPosition/text() != '' and //gml:TimePeriod//gml:endPosition/text() != ''">
            -
          </xsl:if>
          <xsl:value-of select="//gml:TimePeriod//gml:endPosition" />
        </p>
      </xsl:if>

      <xsl:comment>
        <xsl:if test="//gmd:supplementalInformation//gmd:LocalisedCharacterString[@locale='#fra']/text() != ''">
          <h5 class="text-xl font-bold mb-3">{{metadata.xslt.supplementalData}}</h5>
          <p>
            <xsl:value-of select="//gmd:supplementalInformation//gmd:LocalisedCharacterString[@locale='#fra']/text()" />
          </p>
        </xsl:if>
      </xsl:comment>

      <xsl:if test="//gmd:citedResponsibleParty//gmd:individualName/* != '' 
              or //gmd:citedResponsibleParty//gmd:organisationName//gmd:LocalisedCharacterString[@locale='#fra']/text() != ''
              or //gmd:citedResponsibleParty//gmd:positionName//gmd:LocalisedCharacterString[@locale='#fra']/text() != ''
              or //gmd:citedResponsibleParty//gmd:electronicMailAddress/* != ''
              or //gmd:citedResponsibleParty//gmd:role/gmd:CI_RoleCode/@codeListValue != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.contactInfo}}</h5>
        <p>
          <xsl:value-of select="//gmd:citedResponsibleParty//gmd:individualName" />
        </p>
        <p>
          <xsl:value-of select="//gmd:citedResponsibleParty//gmd:organisationName//gmd:LocalisedCharacterString[@locale='#fra']/text()" />
        </p>
        <p>
          <xsl:value-of select="//gmd:citedResponsibleParty//gmd:positionName//gmd:LocalisedCharacterString[@locale='#fra']/text()" />
        </p>
        <p>
          <a href="mailto:{//gmd:citedResponsibleParty//gmd:electronicMailAddress//gmd:LocalisedCharacterString[@locale='#fra']/text()}?Subject={//gmd:identificationInfo//gmd:title//gmd:LocalisedCharacterString[@locale='#fra']/text()}">
            <xsl:value-of select="//gmd:citedResponsibleParty//gmd:electronicMailAddress" />
          </a>
        </p>
        <p>
          <xsl:variable name="roleCode" >
            <xsl:value-of select="concat(substring(//gmd:citedResponsibleParty//gmd:role/gmd:CI_RoleCode/@codeListValue,1,1),
                        substring(//gmd:citedResponsibleParty//gmd:role/gmd:CI_RoleCode/@codeListValue, 2))" />
          </xsl:variable>

          <xsl:choose>
            <xsl:when test="$roleCode = 'resourceProvider'">{{metadata.xslt.resourceProvider}}</xsl:when>
            <xsl:when test="$roleCode = 'custodian'">{{metadata.xslt.custodian}}</xsl:when>
            <xsl:when test="$roleCode = 'owner'">{{metadata.xslt.owner}}</xsl:when>
            <xsl:when test="$roleCode = 'user'">{{metadata.xslt.user}}</xsl:when>
            <xsl:when test="$roleCode = 'distributor'">{{metadata.xslt.distributor}}</xsl:when>
            <xsl:when test="$roleCode = 'originator'">{{metadata.xslt.originator}}</xsl:when>
            <xsl:when test="$roleCode = 'pointOfContact'">{{metadata.xslt.pointOfContact}}</xsl:when>
            <xsl:when test="$roleCode = 'principalInvestigator'">{{metadata.xslt.principalInvestigator}}</xsl:when>
            <xsl:when test="$roleCode = 'processor'">{{metadata.xslt.processor}}</xsl:when>
            <xsl:when test="$roleCode = 'publisher'">{{metadata.xslt.publisher}}</xsl:when>
            <xsl:when test="$roleCode = 'author'">{{metadata.xslt.author}}</xsl:when>
            <xsl:when test="$roleCode = 'collaborator'">{{metadata.xslt.collaborator}}</xsl:when>
            <xsl:when test="$roleCode = 'editor'">{{metadata.xslt.editor}}</xsl:when>
            <xsl:when test="$roleCode = 'mediator'">{{metadata.xslt.mediator}}</xsl:when>
            <xsl:when test="$roleCode = 'rightsHolder'">{{metadata.xslt.rightsHolder}}</xsl:when>
          </xsl:choose>
        </p>
      </xsl:if>

      <xsl:if test="$catalogue_url != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.cataloguePage}}</h5>
        <p>
          <a href="{$catalogue_url}"
             rel="external" target="_blank" class="ui-link">
            {{metadata.xslt.metadata}}
          </a>
        </p>
      </xsl:if>
    </div>
  </xsl:template>
</xsl:stylesheet>
`,T=`<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:dct="http://purl.org/dc/terms/"
                xmlns:vcard="http://www.w3.org/2006/vcard/ns#"
                xmlns:dcat="http://www.w3.org/ns/dcat#"
                xmlns:locn="http://www.w3.org/ns/locn#"
                xmlns:foaf="http://xmlns.com/foaf/0.1/"
                xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">

  <xsl:param name="catalogue_url" />
  <xsl:decimal-format NaN=""/>

  <xsl:template match="/">

    <div class="metadata-view">

      <xsl:if test="//dct:description[@xml:lang='en']/text() != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.Abstract}}</h5>
        <p>
          <xsl:value-of select="//dct:description[@xml:lang='en']/text()" />
        </p>
      </xsl:if>

      <xsl:comment>
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.Scope}}</h5>
        <p>{{metadata.xslt.hereBeScope}}</p>
      </xsl:comment>

      <!-- xsl:if test="//gml:TimePeriod//* != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.timePeriod}}</h5>
        <p>
          <xsl:value-of select="//gml:TimePeriod//gml:beginPosition" />
          <xsl:if test="//gml:TimePeriod//gml:beginPosition/text() != '' and //gml:TimePeriod//gml:endPosition/text() != ''">
            -
          </xsl:if>
          <xsl:value-of select="//gml:TimePeriod//gml:endPosition" />
        </p>
      </xsl:if -->

      <!-- xsl:comment>
        <xsl:if test="//gmd:supplementalInformation/gco:CharacterString/text() != ''">
          <h5 class="text-xl font-bold mb-3">{{metadata.xslt.supplementalData}}</h5>
          <p>
            <xsl:value-of select="//gmd:supplementalInformation/gco:CharacterString/text()" />
          </p>
        </xsl:if>
      </xsl:comment -->

      <xsl:if test="//dct:publisher//foaf:Organization/* != '' 
              or //dcat:contactPoint//vcard:hasEmail != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.contactInfo}}</h5>
        <p>
          <xsl:value-of select="//dct:publisher//foaf:name[@xml:lang='en']/text()" />
        </p>
        <p>
          <a href="mailto:{substring-after(//dcat:contactPoint//vcard:hasEmail/@rdf:resource, 'mailto:')}">
            <xsl:value-of select="substring-after(//dcat:contactPoint//vcard:hasEmail/@rdf:resource, 'mailto:')" />
          </a>
        </p>
      </xsl:if>

      <xsl:if test="$catalogue_url != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.cataloguePage}}</h5>
        <p>
          <a href="{$catalogue_url}"
             rel="external" target="_blank" class="ui-link">
            {{metadata.xslt.metadata}}
          </a>
        </p>
      </xsl:if>
    </div>
  </xsl:template>
</xsl:stylesheet>
`,E=`<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:dct="http://purl.org/dc/terms/"
                xmlns:vcard="http://www.w3.org/2006/vcard/ns#"
                xmlns:dcat="http://www.w3.org/ns/dcat#"
                xmlns:locn="http://www.w3.org/ns/locn#"
                xmlns:foaf="http://xmlns.com/foaf/0.1/"
                xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">

  <xsl:param name="catalogue_url" />
  <xsl:decimal-format NaN=""/>

  <xsl:template match="/">

    <div class="metadata-view">

      <xsl:if test="//dct:description[@xml:lang='fr']/text() != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.Abstract}}</h5>
        <p>
          <xsl:value-of select="//dct:description[@xml:lang='fr']/text()" />
        </p>
      </xsl:if>

      <xsl:comment>
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.Scope}}</h5>
        <p>{{metadata.xslt.hereBeScope}}</p>
      </xsl:comment>

      <!-- xsl:if test="//gml:TimePeriod//* != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.timePeriod}}</h5>
        <p>
          <xsl:value-of select="//gml:TimePeriod//gml:beginPosition" />
          <xsl:if test="//gml:TimePeriod//gml:beginPosition/text() != '' and //gml:TimePeriod//gml:endPosition/text() != ''">
            -
          </xsl:if>
          <xsl:value-of select="//gml:TimePeriod//gml:endPosition" />
        </p>
      </xsl:if -->

      <!-- xsl:comment>
        <xsl:if test="//gmd:supplementalInformation/gco:CharacterString/text() != ''">
          <h5 class="text-xl font-bold mb-3">{{metadata.xslt.supplementalData}}</h5>
          <p>
            <xsl:value-of select="//gmd:supplementalInformation/gco:CharacterString/text()" />
          </p>
        </xsl:if>
      </xsl:comment -->

      <xsl:if test="//dct:publisher//foaf:Organization/* != '' 
              or //dcat:contactPoint//vcard:hasEmail != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.contactInfo}}</h5>
        <p>
          <xsl:value-of select="//dct:publisher//foaf:name[@xml:lang='fr']/text()" />
        </p>
        <p>
          <a href="mailto:{substring-after(//dcat:contactPoint//vcard:hasEmail/@rdf:resource, 'mailto:')}">
            <xsl:value-of select="substring-after(//dcat:contactPoint//vcard:hasEmail/@rdf:resource, 'mailto:')" />
          </a>
        </p>
      </xsl:if>

      <xsl:if test="$catalogue_url != ''">
        <h5 class="text-xl font-bold mb-3">{{metadata.xslt.cataloguePage}}</h5>
        <p>
          <a href="{$catalogue_url}"
             rel="external" target="_blank" class="ui-link">
            {{metadata.xslt.metadata}}
          </a>
        </p>
      </xsl:if>
    </div>
  </xsl:template>
</xsl:stylesheet>
`,D={key:0},O={class:`flex justify-center`},k={key:0,class:`flex flex-col justify-center text-center`},A=[`innerHTML`],j=[`innerHTML`],M={key:3,class:`flex flex-col justify-center text-center`},N={class:`text-xl mt-20`},P={key:1,class:`p-5`},F=t({__name:`screen`,props:{panel:{type:Object,required:!0},payload:{type:Object,required:!0}},setup(t){let l=r(),{t:F}=v(),I=g(`iApi`),L=p(),R=t,z=i(()=>l.status),B=i(()=>l.response),V=p(!1),H=h({}),U=h([]),W=h([]);_(()=>{l.status=`loading`,G(),U.push(I.event.on(f.LAYER_REMOVE,e=>{R.payload.layer?.uid===e.uid&&R.panel.close()})),W.push(d(()=>R.payload.layer.uid,(e,t)=>{e!==t&&(l.status=`loading`,G())}))}),u(()=>{U.forEach(e=>I.event.off(e)),W.forEach(e=>e())});let G=()=>{V.value=R.payload.layer!==void 0&&!R.payload.layer.isRemoved,R.payload.type===`xml`?K(R.payload.url,[]).then(e=>{if(l.status=`success`,e!==null){let t=document.createElement(`div`);t.appendChild(Y(`${e.firstElementChild.outerHTML}`)),(R.payload.catalogueUrl||R.payload.url)&&t.appendChild(Y(`<h5 class="text-xl font-bold mb-3">${F(`metadata.xslt.metadata`)}</h5>`)),R.payload.catalogueUrl&&t.appendChild(Y(`<p><a style="color: blue;" href="${R.payload.catalogueUrl}" target="_blank">${F(`metadata.xslt.cataloguePage`)}</a></p>`)),t.appendChild(Y(`<p><a style="color: blue;" href="${R.payload.url}" target="_blank">${F(`metadata.xslt.metadataPage`)}</a> (xml)</p>`)),l.response=t.outerHTML}}):R.payload.type===`html`?J(R.payload.url).then(e=>{l.status=e.status,l.response=e.response}):R.payload.type===`md`&&J(R.payload.url).then(e=>{l.status=e.status,l.response=S(e.response)})},K=(e,t)=>{let n;return n=R.payload.xmlType&&R.payload.xmlType===`DCAT`?I.language===`en`?T:E:I.language===`en`?C:w,n=n.replace(/\{\{([\w.]+)\}\}/g,(e,t)=>F(t)),H[e]?Promise.resolve(q(H[e],n,t)):J(e).then(r=>(H[e]=r.response,q(H[e],n,t)))},q=(e,t,n)=>{let r=null;if(window.XSLTProcessor){let i=new window.XSLTProcessor,o=new DOMParser,s=o.parseFromString(e,`text/xml`),c=o.parseFromString(t,`text/xml`);i.importStylesheet(c),n&&n.forEach(e=>i.setParameter(``,e.key,e.value||``)),r=i.transformToFragment(s,document);let l={className:`underline text-blue-700 break-all`,target:`_blank`,validate:{url:e=>/^https?:\/\//.test(e)}},u=r.firstElementChild;u&&(R.payload.treatXmlAsMarkdown?u.innerHTML=S.parse(u.innerHTML,{async:!1}):u.innerHTML=a(u.innerHTML,l))}return r},J=e=>new Promise(t=>{let n=new XMLHttpRequest;n.open(`GET`,e,!0),n.responseType=`text`,n.onload=()=>{n.status===200?t({status:`success`,response:n.response}):t({status:`error`,response:`Could not load results from remote service.`})},n.onerror=()=>{t({status:`error`,response:`Could not load results from remote service.`})},n.send()});function Y(e){let t=document.createElement(`div`);return t.innerHTML=e,t}return(r,i)=>{let a=y(`panel-screen`);return s(),e(a,{panel:t.panel,ref_key:`el`,ref:L},{header:m(()=>[x(n(o(F)(`metadata.title`))+`: `+n(t.payload.layerName),1)]),content:m(()=>[V.value?(s(),b(`div`,D,[c(`div`,O,[z.value==`loading`?(s(),b(`div`,k,n(o(F)(`metadata.loading`)),1)):t.payload.type===`xml`&&z.value==`success`?(s(),b(`div`,{key:1,innerHTML:B.value,class:`flex flex-col justify-center max-w-full xml-content`},null,8,A)):(t.payload.type===`html`||t.payload.type===`md`)&&z.value==`success`?(s(),b(`div`,{key:2,innerHTML:B.value,class:`flex flex-col justify-center max-w-full metadata-view`},null,8,j)):(s(),b(`div`,M,[i[0]||=c(`img`,{src:`https://i.imgur.com/fA5EqV6.png`},null,-1),c(`span`,N,n(o(F)(`metadata.error`)),1)]))])])):(s(),b(`div`,P,[c(`span`,null,n(o(F)(`metadata.label.no.layer`)),1)]))]),_:1},8,[`panel`])}}});export{F as default};