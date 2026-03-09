var et=Object.defineProperty;var K=(e,t)=>()=>(e&&(t=e(e=0)),t);var H=(e,t)=>{for(var r in t)et(e,r,{get:t[r],enumerable:!0})};var ze={};H(ze,{DEFAULT_API_PRESETS:()=>je,DEFAULT_SETTINGS:()=>fe,STORAGE_KEYS:()=>M,deepMerge:()=>me,getCurrentPresetName:()=>N,loadApiPresets:()=>b,loadSettings:()=>v,saveApiPresets:()=>A,saveSettings:()=>j,setCurrentPresetName:()=>L});function tt(){try{let e=typeof window.parent<"u"?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext();if(r?.extensionSettings)return r.extensionSettings}if(e.extension_settings)return e.extension_settings;let t=e.jQuery||window.jQuery;return null}catch(e){return console.warn("[YouYouToolkit] \u65E0\u6CD5\u83B7\u53D6SillyTavern extensionSettings:",e),null}}function Me(){try{let e=typeof window.parent<"u"?window.parent:window;if(typeof e.saveSettings=="function")return e.saveSettings;if(e.SillyTavern?.getContext){let t=e.SillyTavern.getContext();if(typeof t.saveSettings=="function")return t.saveSettings;if(typeof t.saveSettingsDebounced=="function")return t.saveSettingsDebounced}return null}catch{return null}}function U(){let e=tt(),t="youyou_toolkit";return e?(e[t]||(e[t]={}),{getItem:r=>{let n=e[t][r];return typeof n=="string"?n:n?JSON.stringify(n):null},setItem:(r,n)=>{e[t][r]=n;let i=Me();if(i)try{i()}catch(o){console.warn("[YouYouToolkit] \u4FDD\u5B58\u8BBE\u7F6E\u5931\u8D25:",o)}},removeItem:r=>{delete e[t][r];let n=Me();if(n)try{n()}catch{}},_isTavern:!0}):(console.warn("[YouYouToolkit] \u4F7F\u7528localStorage\u4F5C\u4E3A\u56DE\u9000\u5B58\u50A8"),{getItem:r=>{try{return localStorage.getItem(r)}catch{return null}},setItem:(r,n)=>{try{localStorage.setItem(r,n)}catch(i){console.error("[YouYouToolkit] localStorage\u5199\u5165\u5931\u8D25:",i)}},removeItem:r=>{try{localStorage.removeItem(r)}catch{}},_isTavern:!1})}function Re(e,t=null){if(!e||typeof e!="string")return t;try{return JSON.parse(e)}catch{return t}}function Ye(e,t="{}"){try{return JSON.stringify(e)}catch{return t}}function v(){let t=U().getItem(M.SETTINGS);if(t){let r=Re(t,null);if(r&&typeof r=="object")return me(JSON.parse(JSON.stringify(fe)),r)}return JSON.parse(JSON.stringify(fe))}function j(e){U().setItem(M.SETTINGS,Ye(e))}function b(){let t=U().getItem(M.API_PRESETS);if(t){let r=Re(t,null);if(Array.isArray(r))return r}return JSON.parse(JSON.stringify(je))}function A(e){U().setItem(M.API_PRESETS,Ye(e))}function N(){return U().getItem(M.CURRENT_PRESET)||""}function L(e){U().setItem(M.CURRENT_PRESET,e||"")}function me(e,t){let r=i=>i&&typeof i=="object"&&!Array.isArray(i),n={...e};return r(e)&&r(t)&&Object.keys(t).forEach(i=>{r(t[i])?i in e?n[i]=me(e[i],t[i]):Object.assign(n,{[i]:t[i]}):Object.assign(n,{[i]:t[i]})}),n}var M,fe,je,J=K(()=>{M={SETTINGS:"youyou_toolkit_settings",API_PRESETS:"youyou_toolkit_api_presets",CURRENT_PRESET:"youyou_toolkit_current_preset"},fe={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},je=[]});var De={};H(De,{API_STATUS:()=>rt,fetchAvailableModels:()=>xe,getApiConfig:()=>R,getEffectiveApiConfig:()=>at,sendApiRequest:()=>Oe,testApiConnection:()=>ot,updateApiConfig:()=>Y,validateApiConfig:()=>te});function R(){return v().apiConfig||{}}function Y(e){let t=v();t.apiConfig={...t.apiConfig,...e},j(t)}function te(e){let t=[];if(e.useMainApi)return{valid:!0,errors:[]};if(!e.url||!e.url.trim())t.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(e.url)}catch{t.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!e.model||!e.model.trim())&&t.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:t.length===0,errors:t}}function at(e=""){let t=v();if(e){let n=(t.apiPresets||[]).find(i=>i.name===e);if(n&&n.apiConfig)return{...n.apiConfig,presetName:n.name}}return t.apiConfig||{}}function nt(e,t={}){let r=t.apiConfig||R();return{messages:e,model:r.model||"gpt-3.5-turbo",max_tokens:r.max_tokens||4096,temperature:r.temperature??.7,top_p:r.top_p??.9,stream:!1,...t.extraParams}}async function Oe(e,t={},r=null){let n=t.apiConfig||R(),i=n.useMainApi,o=te(n);if(!o.valid&&!i)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${o.errors.join(", ")}`);return i?await it(e,t,r):await st(e,n,t,r)}async function it(e,t,r){let n=typeof window.parent<"u"?window.parent:window;if(!n.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let i=await n.TavernHelper.generateRaw({ordered_prompts:e,should_stream:!1,...t.extraParams});if(typeof i!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return i.trim()}catch(i){throw i.name==="AbortError"?i:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${i.message}`)}}async function st(e,t,r,n){let i=nt(e,{apiConfig:t,...r}),o={"Content-Type":"application/json"};t.apiKey&&(o.Authorization=`Bearer ${t.apiKey}`);let s=await fetch(t.url,{method:"POST",headers:o,body:JSON.stringify(i),signal:n});if(!s.ok){let g=await s.text().catch(()=>"Unknown error");throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${s.status}): ${g}`)}let d=await s.json(),p="";if(d.choices&&d.choices[0]?.message?.content)p=d.choices[0].message.content;else if(d.content)p=d.content;else if(d.text)p=d.text;else if(d.response)p=d.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(d).slice(0,200)}`);return p.trim()}async function ot(e=null){let t=e||R(),r=Date.now();try{await Oe([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:t});let i=Date.now()-r;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${i}ms)`,latency:i}}catch(n){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${n.message}`,latency:Date.now()-r}}}async function xe(e=null){let t=e||R();return t.useMainApi?await lt():await ct(t)}async function lt(){let e=typeof window.parent<"u"?window.parent:window;try{if(e.SillyTavern?.getContext){let t=e.SillyTavern.getContext();if(t.settings?.api_server)return[t.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function ct(e){if(!e.url||!e.apiKey)return[];try{let r=`${e.url.replace(/\/chat\/completions$/,"").replace(/\/completions$/,"")}/models`,n=await fetch(r,{method:"GET",headers:{Authorization:`Bearer ${e.apiKey}`}});if(!n.ok)return[];let i=await n.json();return i.data&&Array.isArray(i.data)?i.data.map(o=>o.id||o.name).filter(Boolean).sort():[]}catch{return[]}}var rt,be=K(()=>{J();rt={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var Ue={};H(Ue,{createPreset:()=>ae,createPresetFromCurrentConfig:()=>ut,deletePreset:()=>q,duplicatePreset:()=>yt,exportPresets:()=>we,generateUniquePresetName:()=>ke,getActiveConfig:()=>he,getActivePresetName:()=>ie,getAllPresets:()=>re,getPreset:()=>w,getPresetNames:()=>dt,importPresets:()=>$e,presetExists:()=>G,renamePreset:()=>pt,switchToPreset:()=>ve,updatePreset:()=>ne,validatePreset:()=>gt});function re(){return b()}function dt(){return b().map(t=>t.name)}function w(e){return!e||typeof e!="string"?null:b().find(r=>r.name===e)||null}function G(e){return!e||typeof e!="string"?!1:b().some(r=>r.name===e)}function ae(e){let{name:t,description:r,apiConfig:n}=e;if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let i=t.trim();if(G(i))return{success:!1,message:`\u9884\u8BBE "${i}" \u5DF2\u5B58\u5728`};let o={name:i,description:r||"",apiConfig:{url:n?.url||"",apiKey:n?.apiKey||"",model:n?.model||"",useMainApi:n?.useMainApi??!0,max_tokens:n?.max_tokens||4096,temperature:n?.temperature??.7,top_p:n?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},s=b();return s.push(o),A(s),{success:!0,message:`\u9884\u8BBE "${i}" \u521B\u5EFA\u6210\u529F`,preset:o}}function ne(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=b(),n=r.findIndex(s=>s.name===e);if(n===-1)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(t.name&&t.name!==e)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let i=r[n],o={...i,...t,name:i.name,updatedAt:Date.now()};return t.apiConfig&&(o.apiConfig={...i.apiConfig,...t.apiConfig}),r[n]=o,A(r),{success:!0,message:`\u9884\u8BBE "${e}" \u66F4\u65B0\u6210\u529F`,preset:o}}function q(e){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=b(),r=t.findIndex(n=>n.name===e);return r===-1?{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}:(t.splice(r,1),A(t),N()===e&&L(""),{success:!0,message:`\u9884\u8BBE "${e}" \u5DF2\u5220\u9664`})}function pt(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=t.trim();if(!G(e))return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(G(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let n=b(),i=n.find(o=>o.name===e);return i&&(i.name=r,i.updatedAt=Date.now(),A(n),N()===e&&L(r)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${r}"`}}function yt(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=t.trim(),n=w(e);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(G(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let i={...JSON.parse(JSON.stringify(n)),name:r,createdAt:Date.now(),updatedAt:Date.now()},o=b();return o.push(i),A(o),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${r}"`,preset:i}}function ve(e){if(!e)return L(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let t=w(e);return t?(L(e),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${e}"`,apiConfig:t.apiConfig}):{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}}function ie(){return N()}function he(){let e=N();if(e){let r=w(e);if(r)return{presetName:e,apiConfig:r.apiConfig}}return{presetName:"",apiConfig:v().apiConfig||{}}}function we(e=null){if(e){let r=w(e);if(!r)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let t=b();return JSON.stringify(t,null,2)}function $e(e,t={overwrite:!1}){let r;try{r=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(r)?r:[r];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let i=b(),o=0;for(let s of n){if(!s.name||typeof s.name!="string"||!s.apiConfig||typeof s.apiConfig!="object")continue;let d=i.findIndex(p=>p.name===s.name);d>=0?t.overwrite&&(s.updatedAt=Date.now(),i[d]=s,o++):(s.createdAt=s.createdAt||Date.now(),s.updatedAt=Date.now(),i.push(s),o++)}return o>0&&A(i),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${o} \u4E2A\u9884\u8BBE`,imported:o}}function ut(e,t=""){let r=v();return ae({name:e,description:t,apiConfig:r.apiConfig})}function gt(e){let t=[];return(!e.name||typeof e.name!="string"||!e.name.trim())&&t.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!e.apiConfig||typeof e.apiConfig!="object")&&t.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:t.length===0,errors:t}}function ke(e){(!e||typeof e!="string")&&(e="\u65B0\u9884\u8BBE");let t=b(),r=new Set(t.map(i=>i.name));if(!r.has(e))return e;let n=1;for(;r.has(`${e} (${n})`);)n++;return`${e} (${n})`}var Se=K(()=>{J()});var Qe={};H(Qe,{MESSAGE_MACROS:()=>O,createTemplate:()=>oe,default:()=>mt,deleteTemplate:()=>ce,exportTemplates:()=>pe,extractWithTemplate:()=>Le,generateExtractionScript:()=>Je,generateReplaceScript:()=>Fe,getAllTemplates:()=>se,getTemplate:()=>z,importTemplates:()=>V,testRegex:()=>W,updateTemplate:()=>le});function Ne(){return f=v().regexTemplates||[...ft],f}function se(){return f.length===0&&Ne(),f}function z(e){return f.find(t=>t.id===e)}function oe(e){let t={id:`custom-${Date.now()}`,name:e.name||"\u65B0\u6A21\u677F",description:e.description||"",pattern:e.pattern||"",flags:e.flags||"g",groupIndex:e.groupIndex||0,createdAt:new Date().toISOString()};return f.push(t),de(),{success:!0,template:t,message:"\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function le(e,t){let r=f.findIndex(n=>n.id===e);return r===-1?{success:!1,message:"\u6A21\u677F\u4E0D\u5B58\u5728"}:(f[r]={...f[r],...t,updatedAt:new Date().toISOString()},de(),{success:!0,template:f[r],message:"\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function ce(e){let t=f.findIndex(r=>r.id===e);return t===-1?{success:!1,message:"\u6A21\u677F\u4E0D\u5B58\u5728"}:(f.splice(t,1),de(),{success:!0,message:"\u6A21\u677F\u5DF2\u5220\u9664"})}function de(){let e=v();e.regexTemplates=f,j(e)}function W(e,t,r="g",n=0){try{if(!e||typeof e!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let i=new RegExp(e,r),o=[];if(r.includes("g")){let s;for(;(s=i.exec(t))!==null;)s.length>1?o.push({fullMatch:s[0],groups:s.slice(1),index:s.index,extracted:s[n]||s[1]||s[0]}):o.push({fullMatch:s[0],groups:[],index:s.index,extracted:s[0]})}else{let s=i.exec(t);s&&o.push({fullMatch:s[0],groups:s.length>1?s.slice(1):[],index:s.index,extracted:s.length>1?s[n]||s[1]:s[0]})}return{success:!0,matches:o,count:o.length,extracted:o.map(s=>s.extracted)}}catch(i){return{success:!1,error:i.message,matches:[]}}}function Le(e,t){let r=z(e);return r?W(r.pattern,t,r.flags,r.groupIndex):{success:!1,error:"\u6A21\u677F\u4E0D\u5B58\u5728"}}function Je(e,t="lastMessage",r="extracted_content"){let n=z(e);if(!n)return null;let i=O[t]?.macro||"{{lastMessage}}";return`/match pattern="${n.pattern.replace(/"/g,'\\"')}" ${i} | /setvar key=${r}`}function Fe(e,t,r="lastMessage"){let n=O[r]?.macro||"{{lastMessage}}";return`/replace mode=regex pattern="${e.replace(/"/g,'\\"')}" replacer="${t.replace(/"/g,'\\"')}" ${n}`}function pe(){return JSON.stringify(f,null,2)}function V(e,t={overwrite:!1}){try{let r=JSON.parse(e);if(!Array.isArray(r))return{success:!1,message:"\u65E0\u6548\u7684\u6A21\u677F\u683C\u5F0F"};if(t.overwrite)f=r;else{let n=new Set(f.map(o=>o.id)),i=r.filter(o=>!n.has(o.id));f.push(...i)}return de(),{success:!0,imported:r.length,message:`\u6210\u529F\u5BFC\u5165 ${r.length} \u4E2A\u6A21\u677F`}}catch(r){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}var ft,f,O,mt,Ce=K(()=>{J();ft=[{id:"json-content",name:"JSON\u5185\u5BB9\u63D0\u53D6",description:"\u63D0\u53D6JSON\u683C\u5F0F\u7684\u5185\u5BB9",pattern:'"content"\\s*:\\s*"([^"]+)"',flags:"g",groupIndex:1},{id:"code-block",name:"\u4EE3\u7801\u5757\u63D0\u53D6",description:"\u63D0\u53D6```\u5305\u88F9\u7684\u4EE3\u7801\u5757",pattern:"```[\\s\\S]*?\\n([\\s\\S]*?)```",flags:"g",groupIndex:1},{id:"thinking-tag",name:"\u601D\u8003\u6807\u7B7E\u5185\u5BB9",description:"\u63D0\u53D6<thinking>\u6807\u7B7E\u5185\u5BB9",pattern:"<thinking>([\\s\\S]*?)</thinking>",flags:"g",groupIndex:1},{id:"dialogue-quote",name:"\u5BF9\u8BDD\u5F15\u53F7\u5185\u5BB9",description:"\u63D0\u53D6\u5F15\u53F7\u4E2D\u7684\u5BF9\u8BDD",pattern:'"([^"]+)"',flags:"g",groupIndex:1},{id:"paragraph",name:"\u6BB5\u843D\u63D0\u53D6",description:"\u63D0\u53D6\u975E\u7A7A\u6BB5\u843D",pattern:"([^\\n]+)",flags:"g",groupIndex:1}],f=[];O={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};Ne();mt={getAllTemplates:se,getTemplate:z,createTemplate:oe,updateTemplate:le,deleteTemplate:ce,testRegex:W,extractWithTemplate:Le,generateExtractionScript:Je,generateReplaceScript:Fe,exportTemplates:pe,importTemplates:V,MESSAGE_MACROS:O}});var Ke={};H(Ke,{getCurrentTab:()=>Ct,getRegexStyles:()=>St,getStyles:()=>ht,render:()=>D,renderRegex:()=>X,setCurrentTab:()=>At});function u(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function c(e,t,r=3e3){let n=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(n.toastr){n.toastr[e](t,"YouYou \u5DE5\u5177\u7BB1",{timeOut:r,progressBar:!0});return}console.log(`[${e.toUpperCase()}] ${t}`)}function I(){if(F)return F;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return F=window.parent.jQuery,F}catch{}return window.jQuery&&(F=window.jQuery),F}function Pe(){return l&&l.length>0}function xt(){let e=R(),t=he(),r=ie(),n=re(),i=n.length>0?n.map(p=>`<option value="${u(p.name)}" ${p.name===r?"selected":""}>\u2606 ${u(p.name)}</option>`).join(""):"",s=n.slice(0,8),d=s.length>0?s.map(p=>`
        <div class="yyt-preset-item" data-preset-name="${u(p.name)}">
          <div class="yyt-preset-info">
            <div class="yyt-preset-name">${u(p.name)}</div>
            <div class="yyt-preset-meta">
              ${p.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${u(p.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
            </div>
          </div>
          <div class="yyt-preset-actions">
            <button class="yyt-btn yyt-btn-small yyt-btn-icon" data-action="load" title="\u52A0\u8F7D\u914D\u7F6E">
              <i class="fa-solid fa-download"></i>
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-btn-danger" data-action="delete" title="\u5220\u9664">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `).join(""):"";return`
    <div class="yyt-panel">
      <!-- \u9884\u8BBE\u9009\u62E9\u533A -->
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-bookmark"></i>
          <span>\u9884\u8BBE\u9009\u62E9</span>
        </div>
        
        <div class="yyt-preset-selector">
          <select class="yyt-select yyt-flex-1" id="${a}-preset-select">
            <option value="">-- \u5F53\u524D\u914D\u7F6E --</option>
            ${i}
          </select>
          <button class="yyt-btn yyt-btn-primary" id="${a}-apply-preset">
            <i class="fa-solid fa-check"></i> \u5E94\u7528
          </button>
        </div>
        
        ${d?`
        <div class="yyt-preset-list-compact">
          ${d}
        </div>
        `:""}
      </div>
      
      <!-- API\u914D\u7F6E\u533A -->
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-sliders"></i>
          <span>API\u914D\u7F6E</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${a}-save-as-preset" style="margin-left: auto;">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
          </button>
        </div>
        
        <div class="yyt-form-group">
          <div class="yyt-toggle-row">
            <div class="yyt-toggle-label">
              <span>\u4F7F\u7528SillyTavern\u4E3BAPI</span>
              <span class="yyt-toggle-hint">\u542F\u7528\u540E\u5C06\u4F7F\u7528SillyTavern\u5185\u7F6E\u7684API\u914D\u7F6E</span>
            </div>
            <label class="yyt-toggle">
              <input type="checkbox" id="${a}-use-main-api" ${e.useMainApi?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div id="${a}-custom-api-fields" class="${e.useMainApi?"yyt-disabled":""}">
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>API URL</label>
              <input type="text" class="yyt-input" id="${a}-api-url" 
                     value="${u(e.url||"")}" 
                     placeholder="https://api.openai.com/v1/chat/completions">
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>API Key</label>
              <div class="yyt-input-group">
                <input type="password" class="yyt-input" id="${a}-api-key" 
                       value="${u(e.apiKey||"")}" 
                       placeholder="sk-...">
                <button class="yyt-btn yyt-btn-icon" id="${a}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                  <i class="fa-solid fa-eye"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u6A21\u578B</label>
              <div class="yyt-model-row">
                <input type="text" class="yyt-input yyt-model-input" id="${a}-model" 
                       value="${u(e.model||"")}" 
                       placeholder="gpt-4">
                <select class="yyt-select yyt-model-select" id="${a}-model-select" style="display: none;">
                </select>
                <button class="yyt-btn yyt-btn-secondary yyt-model-btn" id="${a}-load-models" title="\u83B7\u53D6\u6A21\u578B\u5217\u8868">
                  <i class="fa-solid fa-sync-alt"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="yyt-form-row yyt-form-row-2col">
            <div class="yyt-form-group">
              <label>Max Tokens</label>
              <input type="number" class="yyt-input" id="${a}-max-tokens" 
                     value="${e.max_tokens||4096}" min="1" max="128000">
            </div>
            
            <div class="yyt-form-group">
              <label>Temperature</label>
              <input type="number" class="yyt-input" id="${a}-temperature" 
                     value="${e.temperature??.7}" min="0" max="2" step="0.1">
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>Top P</label>
              <input type="number" class="yyt-input" id="${a}-top-p" 
                     value="${e.top_p??.9}" min="0" max="1" step="0.1">
            </div>
          </div>
        </div>
      </div>
      
      <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
      <div class="yyt-panel-footer">
        <div class="yyt-footer-left">
          <button class="yyt-btn yyt-btn-secondary" id="${a}-import-presets">
            <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${a}-export-presets">
            <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
          </button>
          <input type="file" id="${a}-import-file" accept=".json" style="display:none">
        </div>
        <div class="yyt-footer-right">
          <button class="yyt-btn yyt-btn-secondary" id="${a}-reset-api-config">
            <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
          </button>
          <button class="yyt-btn yyt-btn-primary" id="${a}-save-api-config">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
          </button>
        </div>
      </div>
    </div>
  `}function bt(e=null){let t=I();if(!t)return;let n=re().map(y=>y.name),i=e||ke("\u65B0\u9884\u8BBE"),o=`
    <div class="yyt-dialog-overlay" id="${a}-dialog-overlay">
      <div class="yyt-dialog">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${e?"\u7F16\u8F91\u9884\u8BBE":"\u4FDD\u5B58\u4E3A\u65B0\u9884\u8BBE"}</span>
          <button class="yyt-dialog-close" id="${a}-dialog-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body">
          <div class="yyt-form-group">
            <label>\u9884\u8BBE\u540D\u79F0</label>
            <input type="text" class="yyt-input" id="${a}-dialog-preset-name" 
                   value="${u(i)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
          </div>
          <div class="yyt-form-group">
            <label>\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09</label>
            <textarea class="yyt-textarea" id="${a}-dialog-preset-desc" rows="2" 
                      placeholder="\u9884\u8BBE\u63CF\u8FF0..."></textarea>
          </div>
        </div>
        <div class="yyt-dialog-footer">
          <button class="yyt-btn yyt-btn-secondary" id="${a}-dialog-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${a}-dialog-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `;t(`#${a}-dialog-overlay`).remove(),l.append(o);let s=t(`#${a}-dialog-overlay`),d=t(`#${a}-dialog-preset-name`),p=t(`#${a}-dialog-preset-desc`);if(d.focus().select(),e){let y=w(e);y&&y.description&&p.val(y.description)}let g=()=>{s.remove()};s.find(`#${a}-dialog-close, #${a}-dialog-cancel`).on("click",g),s.on("click",function(y){y.target===this&&g()}),s.find(`#${a}-dialog-save`).on("click",function(){let y=d.val().trim(),_=p.val().trim();if(!y){c("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),d.focus();return}if(n.includes(y)&&y!==e){if(!confirm(`\u9884\u8BBE "${y}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;q(y)}e&&y!==e&&q(e);let ee=Ie(),S=ae({name:y,description:_,apiConfig:ee});S.success?(c("success",S.message),g(),D()):c("error",S.message)}),d.on("keypress",function(y){y.which===13&&s.find(`#${a}-dialog-save`).click()})}function vt(){let e=I();if(!e||!Pe()){console.warn("[YouYouToolkit] bindEvents: jQuery\u6216\u5BB9\u5668\u4E0D\u53EF\u7528");return}l.find(`#${a}-preset-select`).on("change",function(){let t=e(this).val();if(t){let r=w(t);r&&Ae(r.apiConfig)}}),l.find(`#${a}-apply-preset`).on("click",function(){let t=l.find(`#${a}-preset-select`).val();if(!t){ve(""),C="",l.find(".yyt-preset-item").removeClass("yyt-loaded"),c("info","\u5DF2\u5207\u6362\u5230\u5F53\u524D\u914D\u7F6E"),D();return}let r=w(t);r?(Ae(r.apiConfig),C=t,l.find(".yyt-preset-item").removeClass("yyt-loaded"),l.find(`.yyt-preset-item[data-preset-name="${t}"]`).addClass("yyt-loaded"),c("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${t}"`)):c("error",`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`)}),l.find(".yyt-preset-item").on("click",function(t){let r=e(this),n=r.data("preset-name"),i=e(t.target).closest("[data-action]").data("action");if(i)switch(t.stopPropagation(),i){case"load":let o=w(n);o&&(Ae(o.apiConfig),C=n,l.find(`#${a}-preset-select`).val(n),l.find(".yyt-preset-item").removeClass("yyt-loaded"),r.addClass("yyt-loaded"),c("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${n}"\uFF0C\u4FEE\u6539\u540E\u53EF\u70B9\u51FB"\u4FDD\u5B58\u914D\u7F6E"\u8986\u76D6\u6B64\u9884\u8BBE`));break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${n}" \u5417\uFF1F`)){let s=q(n);c(s.success?"info":"error",s.message),s.success&&(C===n&&(C=""),D())}break}}),l.find(`#${a}-use-main-api`).on("change",function(){let t=e(this).is(":checked"),r=l.find(`#${a}-custom-api-fields`);t?r.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):r.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),l.find(`#${a}-toggle-key-visibility`).on("click",function(){let t=l.find(`#${a}-api-key`),r=t.attr("type");t.attr("type",r==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),l.find(`#${a}-load-models`).on("click",async function(){let t=e(this),r=l.find(`#${a}-model`),n=l.find(`#${a}-model-select`);t.prop("disabled",!0).find("i").addClass("fa-spin");try{let i=Ie(),o=await xe(i);if(o.length>0){n.empty(),o.forEach(d=>{n.append(`<option value="${u(d)}">${u(d)}</option>`)}),r.hide(),n.show();let s=r.val();s&&o.includes(s)&&n.val(s),n.off("change").on("change",function(){r.val(e(this).val())}),c("success",`\u5DF2\u52A0\u8F7D ${o.length} \u4E2A\u6A21\u578B`)}else c("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(i){c("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${i.message}`)}finally{t.prop("disabled",!1).find("i").removeClass("fa-spin")}}),l.find(`#${a}-model`).on("focus",function(){let t=l.find(`#${a}-model-select`);e(this).show(),t.hide()}),l.find(`#${a}-save-api-config`).on("click",function(){let t=Ie(),r=te(t);if(!r.valid&&!t.useMainApi){c("error",r.errors.join(", "));return}if(C){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${C}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E`)){Y(t),c("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58");return}Y(t);let i=ne(C,{apiConfig:t});i.success?(c("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${C}"`),D()):c("error",i.message);return}let n=ie();if(n){Y(t),ne(n,{apiConfig:t}),c("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58");return}Y(t),c("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),l.find(`#${a}-reset-api-config`).on("click",function(){confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")&&(Y({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9}),D(),c("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E"))}),l.find(`#${a}-save-as-preset`).on("click",function(){bt()}),l.find(`#${a}-export-presets`).on("click",function(){try{let t=we(),r=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(r),i=document.createElement("a");i.href=n,i.download=`youyou_toolkit_presets_${Date.now()}.json`,i.click(),URL.revokeObjectURL(n),c("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(t){c("error",`\u5BFC\u51FA\u5931\u8D25: ${t.message}`)}}),l.find(`#${a}-import-presets`).on("click",function(){l.find(`#${a}-import-file`).click()}),l.find(`#${a}-import-file`).on("change",async function(t){let r=t.target.files[0];if(r){try{let n=await r.text(),i=$e(n,{overwrite:!0});c(i.success?"success":"error",i.message),i.imported>0&&D()}catch(n){c("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}e(this).val("")}})}function Ie(){if(!I()||!Pe())return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let t=l.find(`#${a}-model`).val()?.trim()||"",r=l.find(`#${a}-model-select`);return r.is(":visible")&&(t=r.val()||t),{url:l.find(`#${a}-api-url`).val()?.trim()||"",apiKey:l.find(`#${a}-api-key`).val()||"",model:t,useMainApi:l.find(`#${a}-use-main-api`).is(":checked"),max_tokens:parseInt(l.find(`#${a}-max-tokens`).val())||4096,temperature:parseFloat(l.find(`#${a}-temperature`).val())??.7,top_p:parseFloat(l.find(`#${a}-top-p`).val())??.9}}function Ae(e){if(!I()||!Pe()||!e)return;l.find(`#${a}-api-url`).val(e.url||""),l.find(`#${a}-api-key`).val(e.apiKey||""),l.find(`#${a}-model`).val(e.model||""),l.find(`#${a}-max-tokens`).val(e.max_tokens||4096),l.find(`#${a}-temperature`).val(e.temperature??.7),l.find(`#${a}-top-p`).val(e.top_p??.9);let r=e.useMainApi??!0;l.find(`#${a}-use-main-api`).prop("checked",r);let i=l.find(`#${a}-custom-api-fields`);r?i.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):i.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),l.find(`#${a}-model`).show(),l.find(`#${a}-model-select`).hide()}function D(e){let t=I();if(!t){console.error("[YouYouToolkit] jQuery not available");return}if(e&&(typeof e=="string"?l=t(e):e&&e.jquery?l=e:e&&(l=t(e))),!l||!l.length){console.error("[YouYouToolkit] Container not found or invalid");return}let r=`<div class="yyt-api-manager">${xt()}</div>`;l.html(r),vt()}function ht(){return`
    /* ============================================================
       YouYou Toolkit - \u73B0\u4EE3\u5316UI\u6837\u5F0F\uFF08\u5408\u5E76\u7248\uFF09
       ============================================================ */
    
    /* CSS\u53D8\u91CF\u5B9A\u4E49 */
    .yyt-api-manager {
      --yyt-accent: #7bb7ff;
      --yyt-accent-glow: rgba(123, 183, 255, 0.4);
      --yyt-accent-soft: rgba(123, 183, 255, 0.15);
      --yyt-success: #4ade80;
      --yyt-success-glow: rgba(74, 222, 128, 0.3);
      --yyt-error: #f87171;
      --yyt-error-glow: rgba(248, 113, 113, 0.3);
      --yyt-warning: #fbbf24;
      --yyt-surface: rgba(255, 255, 255, 0.03);
      --yyt-surface-hover: rgba(255, 255, 255, 0.06);
      --yyt-surface-active: rgba(255, 255, 255, 0.08);
      --yyt-border: rgba(255, 255, 255, 0.08);
      --yyt-border-strong: rgba(255, 255, 255, 0.15);
      --yyt-text: rgba(255, 255, 255, 0.95);
      --yyt-text-secondary: rgba(255, 255, 255, 0.7);
      --yyt-text-muted: rgba(255, 255, 255, 0.45);
      --yyt-radius: 12px;
      --yyt-radius-sm: 8px;
      --yyt-radius-lg: 16px;
      --yyt-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
      --yyt-shadow-glow: 0 0 20px var(--yyt-accent-glow);
      
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    /* \u9762\u677F */
    .yyt-panel {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .yyt-panel-section {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 18px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, transparent 100%);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius);
      transition: border-color 0.2s ease;
    }
    
    .yyt-panel-section:hover {
      border-color: var(--yyt-border-strong);
    }
    
    /* \u6807\u9898 */
    .yyt-section-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      font-size: 14px;
      color: var(--yyt-text);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .yyt-section-title i {
      color: var(--yyt-accent);
      font-size: 16px;
      filter: drop-shadow(0 0 8px var(--yyt-accent-glow));
    }
    
    /* \u9884\u8BBE\u9009\u62E9\u5668 */
    .yyt-preset-selector {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    
    .yyt-preset-list-compact {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 150px;
      overflow-y: auto;
      padding-right: 4px;
    }
    
    .yyt-preset-list-compact::-webkit-scrollbar {
      width: 4px;
    }
    
    .yyt-preset-list-compact::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .yyt-preset-list-compact::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 2px;
    }
    
    /* \u9884\u8BBE\u9879 - \u7D27\u51D1\u6837\u5F0F */
    .yyt-preset-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius-sm);
      transition: all 0.2s ease;
    }
    
    .yyt-preset-item:hover {
      background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
      border-color: rgba(255, 255, 255, 0.12);
    }
    
    .yyt-preset-item.active {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
      border-color: rgba(123, 183, 255, 0.3);
    }
    
    .yyt-preset-item.yyt-loaded {
      background: linear-gradient(135deg, rgba(74, 222, 128, 0.12) 0%, rgba(74, 222, 128, 0.04) 100%);
      border-color: rgba(74, 222, 128, 0.3);
    }
    
    .yyt-preset-info {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .yyt-preset-name {
      font-weight: 500;
      font-size: 13px;
      color: var(--yyt-text);
    }
    
    .yyt-preset-meta {
      display: flex;
      gap: 6px;
    }
    
    .yyt-preset-actions {
      display: flex;
      gap: 4px;
      opacity: 0.5;
      transition: opacity 0.2s ease;
    }
    
    .yyt-preset-item:hover .yyt-preset-actions {
      opacity: 1;
    }
    
    /* \u5FBD\u7AE0 */
    .yyt-badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
    }
    
    .yyt-badge-small {
      padding: 2px 8px;
      font-size: 10px;
      background: linear-gradient(135deg, var(--yyt-accent-soft) 0%, rgba(123, 183, 255, 0.08) 100%);
      color: var(--yyt-accent);
      border: 1px solid rgba(123, 183, 255, 0.2);
    }
    
    /* \u7A7A\u72B6\u6001 */
    .yyt-empty-state-small {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      color: var(--yyt-text-muted);
      gap: 8px;
    }
    
    .yyt-empty-state-small i {
      font-size: 24px;
      opacity: 0.4;
    }
    
    .yyt-empty-state-small span {
      font-size: 12px;
    }
    
    /* \u8868\u5355 */
    .yyt-form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .yyt-form-group label {
      font-size: 12px;
      font-weight: 600;
      color: var(--yyt-text-secondary);
      letter-spacing: 0.3px;
    }
    
    .yyt-form-row {
      display: flex;
      gap: 12px;
    }
    
    .yyt-form-row-2col > .yyt-form-group {
      flex: 1;
    }
    
    .yyt-flex-1 {
      flex: 1;
    }
    
    /* Toggle\u5F00\u5173 - \u7F8E\u89C2\u6837\u5F0F */
    .yyt-toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 16px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius-sm);
      transition: all 0.2s ease;
    }
    
    .yyt-toggle-row:hover {
      background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
      border-color: var(--yyt-border-strong);
    }
    
    .yyt-toggle-label {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    
    .yyt-toggle-label > span:first-child {
      font-weight: 600;
      font-size: 14px;
      color: var(--yyt-text);
    }
    
    .yyt-toggle-hint {
      font-size: 11px;
      color: var(--yyt-text-muted);
    }
    
    .yyt-toggle {
      position: relative;
      display: inline-block;
      width: 48px;
      height: 26px;
      flex-shrink: 0;
    }
    
    .yyt-toggle input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .yyt-toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
      border: 1px solid var(--yyt-border);
      border-radius: 26px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .yyt-toggle-slider::before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 2px;
      bottom: 2px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
      border-radius: 50%;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    .yyt-toggle input:checked + .yyt-toggle-slider {
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #5a9cf0 100%);
      border-color: var(--yyt-accent);
      box-shadow: 0 0 12px var(--yyt-accent-glow);
    }
    
    .yyt-toggle input:checked + .yyt-toggle-slider::before {
      transform: translateX(22px);
    }
    
    .yyt-toggle input:focus + .yyt-toggle-slider {
      box-shadow: 0 0 0 3px var(--yyt-accent-soft);
    }
    
    /* \u8F93\u5165\u6846 - \u73B0\u4EE3\u5316\u8BBE\u8BA1 */
    .yyt-input,
    .yyt-select,
    .yyt-textarea {
      padding: 10px 14px;
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius-sm);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
      color: var(--yyt-text);
      font-size: 13px;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    
    .yyt-select {
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E") !important;
      background-repeat: no-repeat !important;
      background-position: right 12px center !important;
      padding-right: 32px;
      background-color: #1a1a2e !important;
      color: #ffffff !important;
      filter: none !important;
    }
    
    /* \u4E0B\u62C9\u6846\u9009\u9879\u6837\u5F0F - \u4F7F\u7528\u66F4\u5F3A\u7684\u9009\u62E9\u5668\u786E\u4FDD\u4E0D\u88AB\u8986\u76D6 */
    .yyt-select option,
    .yyt-select optgroup,
    .yyt-select > option,
    .yyt-select > optgroup,
    select.yyt-select option,
    select.yyt-select optgroup {
      background-color: #1a1a2e !important;
      background: #1a1a2e !important;
      color: #ffffff !important;
      padding: 8px 12px;
      margin: 2px 0;
      border-radius: 4px;
      filter: none !important;
    }
    
    .yyt-select option:hover,
    select.yyt-select option:hover {
      background-color: #2a2a4e !important;
      background: #2a2a4e !important;
    }
    
    .yyt-select option:checked,
    select.yyt-select option:checked {
      background-color: #3a3a6e !important;
      background: #3a3a6e !important;
    }
    
    .yyt-input:hover,
    .yyt-select:hover,
    .yyt-textarea:hover {
      border-color: rgba(255, 255, 255, 0.2);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
    }
    
    .yyt-input:focus,
    .yyt-select:focus,
    .yyt-textarea:focus {
      outline: none;
      border-color: var(--yyt-accent);
      background: linear-gradient(180deg, rgba(123, 183, 255, 0.05) 0%, rgba(123, 183, 255, 0.02) 100%);
      box-shadow: 0 0 0 3px var(--yyt-accent-soft), inset 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    
    .yyt-input::placeholder,
    .yyt-textarea::placeholder {
      color: var(--yyt-text-muted);
    }
    
    .yyt-input-group {
      display: flex;
      gap: 8px;
    }
    
    .yyt-input-group .yyt-input {
      flex: 1;
    }
    
    /* \u6A21\u578B\u884C - \u4FEE\u590D\u4E0B\u62C9\u6846\u53D8\u77ED\u95EE\u9898 */
    .yyt-model-row {
      display: flex;
      gap: 8px;
      align-items: stretch;
    }
    
    .yyt-model-input {
      flex: 1;
      min-width: 0;
    }
    
    .yyt-model-select {
      flex: 1;
      min-width: 0;
    }
    
    .yyt-model-btn {
      flex-shrink: 0;
      min-width: 40px;
      color: var(--yyt-accent);
      border-color: rgba(123, 183, 255, 0.25);
    }
    
    .yyt-model-btn:hover {
      color: var(--yyt-accent);
    }
    
    .yyt-model-btn i {
      color: var(--yyt-accent);
    }
    
    .yyt-disabled {
      opacity: 0.4;
      pointer-events: none;
      filter: grayscale(0.5);
    }
    
    /* \u9762\u677F\u5E95\u90E8 */
    .yyt-panel-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding-top: 16px;
      margin-top: 4px;
      border-top: 1px solid var(--yyt-border);
    }
    
    .yyt-footer-left,
    .yyt-footer-right {
      display: flex;
      gap: 8px;
    }
    
    /* \u6309\u94AE - \u73B0\u4EE3\u5316\u8BBE\u8BA1 */
    .yyt-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 16px;
      border: none;
      border-radius: var(--yyt-radius-sm);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      letter-spacing: 0.2px;
    }
    
    .yyt-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 50%);
      pointer-events: none;
    }
    
    .yyt-btn-primary {
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #5a9cf0 100%);
      color: #0b0f15;
      box-shadow: 0 4px 15px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    
    .yyt-btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.25);
    }
    
    .yyt-btn-primary:active {
      transform: translateY(0);
      box-shadow: 0 2px 10px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.15);
    }
    
    .yyt-btn-secondary {
      background: linear-gradient(135deg, var(--yyt-surface-active) 0%, var(--yyt-surface) 100%);
      color: var(--yyt-text);
      border: 1px solid var(--yyt-border);
    }
    
    .yyt-btn-secondary:hover {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, var(--yyt-surface-hover) 100%);
      border-color: var(--yyt-border-strong);
      transform: translateY(-1px);
    }
    
    .yyt-btn-danger {
      background: linear-gradient(135deg, rgba(248, 113, 113, 0.15) 0%, rgba(248, 113, 113, 0.05) 100%);
      color: var(--yyt-error);
      border: 1px solid rgba(248, 113, 113, 0.25);
    }
    
    .yyt-btn-danger:hover {
      background: linear-gradient(135deg, rgba(248, 113, 113, 0.25) 0%, rgba(248, 113, 113, 0.1) 100%);
      box-shadow: 0 4px 15px var(--yyt-error-glow);
    }
    
    .yyt-btn-edit {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.15) 0%, rgba(123, 183, 255, 0.05) 100%);
      color: var(--yyt-accent);
      border: 1px solid rgba(123, 183, 255, 0.25);
    }
    
    .yyt-btn-edit:hover {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.25) 0%, rgba(123, 183, 255, 0.1) 100%);
      box-shadow: 0 4px 15px var(--yyt-accent-glow);
    }
    
    .yyt-btn-icon {
      padding: 8px;
      min-width: 36px;
    }
    
    .yyt-btn-small {
      padding: 6px 10px;
      font-size: 11px;
    }
    
    .yyt-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }
    
    /* \u5BF9\u8BDD\u6846 */
    .yyt-dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10001;
      animation: yytFadeIn 0.2s ease-out;
    }
    
    @keyframes yytFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .yyt-dialog {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 30%), #0d1117;
      border: 1px solid var(--yyt-border-strong);
      border-radius: var(--yyt-radius);
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
      width: 380px;
      max-width: 90vw;
      animation: yytSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    @keyframes yytSlideIn {
      from {
        opacity: 0;
        transform: scale(0.95) translateY(-10px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    
    .yyt-dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid var(--yyt-border);
    }
    
    .yyt-dialog-title {
      font-weight: 600;
      font-size: 15px;
      color: var(--yyt-text);
    }
    
    .yyt-dialog-close {
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 6px;
      background: transparent;
      color: var(--yyt-text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    
    .yyt-dialog-close:hover {
      background: rgba(248, 113, 113, 0.15);
      color: var(--yyt-error);
    }
    
    .yyt-dialog-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .yyt-dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      padding: 16px 20px;
      border-top: 1px solid var(--yyt-border);
    }
    
    /* \u52A8\u753B */
    @keyframes yytFadeSlideIn {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .yyt-panel-section {
      animation: yytFadeSlideIn 0.25s ease-out backwards;
    }
    
    .yyt-panel-section:nth-child(1) { animation-delay: 0s; }
    .yyt-panel-section:nth-child(2) { animation-delay: 0.05s; }
    .yyt-panel-section:nth-child(3) { animation-delay: 0.1s; }
  `}function $t(){let e=se(),t=e.length>0?e.map(n=>`
        <div class="yyt-template-item" data-template-id="${u(n.id)}">
          <div class="yyt-template-info">
            <div class="yyt-template-name">${u(n.name)}</div>
            <div class="yyt-template-desc">${u(n.description||"\u65E0\u63CF\u8FF0")}</div>
          </div>
          <div class="yyt-template-actions">
            <button class="yyt-btn yyt-btn-small yyt-btn-icon" data-action="use" title="\u4F7F\u7528\u6B64\u6A21\u677F">
              <i class="fa-solid fa-play"></i>
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-btn-edit" data-action="edit" title="\u7F16\u8F91">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-btn-danger" data-action="delete" title="\u5220\u9664">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-regex"></i><span>\u6682\u65E0\u6A21\u677F</span></div>',r=Object.entries(O).map(([n,i])=>`<option value="${n}">${i.description} (${i.macro})</option>`).join("");return`
    <div class="yyt-regex-panel">
      <!-- \u6A21\u677F\u7BA1\u7406\u533A -->
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-regex"></i>
          <span>\u6B63\u5219\u6A21\u677F</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-primary" id="${a}-new-template" style="margin-left: auto;">
            <i class="fa-solid fa-plus"></i> \u65B0\u5EFA
          </button>
        </div>
        
        <div class="yyt-template-list">
          ${t}
        </div>
      </div>
      
      <!-- \u6D4B\u8BD5\u533A -->
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-flask"></i>
          <span>\u6B63\u5219\u6D4B\u8BD5</span>
        </div>
        
        <div class="yyt-form-group">
          <label>\u6B63\u5219\u8868\u8FBE\u5F0F</label>
          <div class="yyt-regex-input-row">
            <input type="text" class="yyt-input yyt-flex-1" id="${a}-regex-pattern" 
                   placeholder="\u8F93\u5165\u6B63\u5219\u8868\u8FBE\u5F0F\uFF0C\u5982: ([^
]+)">
            <div class="yyt-regex-flags">
              <label class="yyt-checkbox-label" title="\u5168\u5C40\u5339\u914D">
                <input type="checkbox" id="${a}-regex-flag-g" checked> g
              </label>
              <label class="yyt-checkbox-label" title="\u5FFD\u7565\u5927\u5C0F\u5199">
                <input type="checkbox" id="${a}-regex-flag-i"> i
              </label>
              <label class="yyt-checkbox-label" title="\u591A\u884C\u6A21\u5F0F">
                <input type="checkbox" id="${a}-regex-flag-m"> m
              </label>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-group">
          <label>\u6355\u83B7\u7EC4\u7D22\u5F15\uFF080=\u5B8C\u6574\u5339\u914D\uFF0C1=\u7B2C\u4E00\u4E2A\u6355\u83B7\u7EC4\uFF09</label>
          <input type="number" class="yyt-input" id="${a}-regex-group-index" 
                 value="1" min="0" max="99" style="width: 80px;">
        </div>
        
        <div class="yyt-form-group">
          <label>\u6D4B\u8BD5\u6587\u672C</label>
          <textarea class="yyt-textarea" id="${a}-regex-test-text" rows="4" 
                    placeholder="\u8F93\u5165\u8981\u6D4B\u8BD5\u7684\u6587\u672C\u5185\u5BB9..."></textarea>
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${a}-regex-test">
            <i class="fa-solid fa-play"></i> \u6D4B\u8BD5\u5339\u914D
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${a}-regex-clear">
            <i class="fa-solid fa-eraser"></i> \u6E05\u7A7A
          </button>
        </div>
        
        <div class="yyt-form-group" id="${a}-regex-result-container" style="display: none;">
          <label>\u5339\u914D\u7ED3\u679C</label>
          <div class="yyt-regex-result" id="${a}-regex-result"></div>
        </div>
      </div>
      
      <!-- \u6D88\u606F\u63D0\u53D6\u533A -->
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-file-code"></i>
          <span>\u6D88\u606F\u63D0\u53D6</span>
        </div>
        
        <div class="yyt-form-group">
          <label>\u6D88\u606F\u6765\u6E90</label>
          <select class="yyt-select" id="${a}-regex-source">
            ${r}
          </select>
        </div>
        
        <div class="yyt-form-group">
          <label>\u4FDD\u5B58\u5230\u53D8\u91CF\u540D</label>
          <input type="text" class="yyt-input" id="${a}-regex-var-name" 
                 value="extracted_content" placeholder="\u53D8\u91CF\u540D">
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${a}-regex-generate-script">
            <i class="fa-solid fa-code"></i> \u751F\u6210\u811A\u672C
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${a}-regex-copy-script">
            <i class="fa-solid fa-copy"></i> \u590D\u5236\u811A\u672C
          </button>
        </div>
        
        <div class="yyt-form-group" id="${a}-regex-script-container" style="display: none;">
          <label>\u751F\u6210\u7684STScript</label>
          <textarea class="yyt-textarea yyt-code-textarea" id="${a}-regex-script" 
                    rows="3" readonly></textarea>
        </div>
      </div>
      
      <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
      <div class="yyt-panel-footer">
        <div class="yyt-footer-left">
          <button class="yyt-btn yyt-btn-secondary" id="${a}-import-regex-templates">
            <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${a}-export-regex-templates">
            <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
          </button>
          <input type="file" id="${a}-import-regex-file" accept=".json" style="display:none">
        </div>
        <div class="yyt-footer-right">
          <button class="yyt-btn yyt-btn-secondary" id="${a}-reset-regex">
            <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
          </button>
        </div>
      </div>
    </div>
  `}function Be(e=null){let t=I();if(!t)return;let r=e?z(e):null,n=!!r,i=`
    <div class="yyt-dialog-overlay" id="${a}-template-dialog-overlay">
      <div class="yyt-dialog yyt-dialog-wide">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${n?"\u7F16\u8F91\u6A21\u677F":"\u65B0\u5EFA\u6B63\u5219\u6A21\u677F"}</span>
          <button class="yyt-dialog-close" id="${a}-template-dialog-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body">
          <div class="yyt-form-group">
            <label>\u6A21\u677F\u540D\u79F0</label>
            <input type="text" class="yyt-input" id="${a}-template-name" 
                   value="${r?u(r.name):""}" placeholder="\u8F93\u5165\u6A21\u677F\u540D\u79F0">
          </div>
          <div class="yyt-form-group">
            <label>\u63CF\u8FF0</label>
            <input type="text" class="yyt-input" id="${a}-template-desc" 
                   value="${r?u(r.description||""):""}" placeholder="\u6A21\u677F\u63CF\u8FF0">
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u5219\u8868\u8FBE\u5F0F</label>
            <input type="text" class="yyt-input" id="${a}-template-pattern" 
                   value="${r?u(r.pattern):""}" placeholder="\u6B63\u5219\u8868\u8FBE\u5F0F">
          </div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u6807\u5FD7\u4F4D</label>
              <input type="text" class="yyt-input" id="${a}-template-flags" 
                     value="${r?u(r.flags||"g"):"g"}" placeholder="gim">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u6355\u83B7\u7EC4\u7D22\u5F15</label>
              <input type="number" class="yyt-input" id="${a}-template-group" 
                     value="${r?r.groupIndex||0:1}" min="0" max="99">
            </div>
          </div>
        </div>
        <div class="yyt-dialog-footer">
          <button class="yyt-btn yyt-btn-secondary" id="${a}-template-dialog-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${a}-template-dialog-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `;t(`#${a}-template-dialog-overlay`).remove(),$?$.append(i):l.append(i);let o=t(`#${a}-template-dialog-overlay`),s=t(`#${a}-template-name`);s.focus();let d=()=>{o.remove(),wt=null};o.find(`#${a}-template-dialog-close, #${a}-template-dialog-cancel`).on("click",d),o.on("click",function(p){p.target===this&&d()}),o.find(`#${a}-template-dialog-save`).on("click",function(){let p=s.val().trim(),g=t(`#${a}-template-desc`).val().trim(),y=t(`#${a}-template-pattern`).val().trim(),_=t(`#${a}-template-flags`).val().trim()||"g",ee=parseInt(t(`#${a}-template-group`).val())||0;if(!p){c("warning","\u8BF7\u8F93\u5165\u6A21\u677F\u540D\u79F0"),s.focus();return}if(!y){c("warning","\u8BF7\u8F93\u5165\u6B63\u5219\u8868\u8FBE\u5F0F"),t(`#${a}-template-pattern`).focus();return}try{new RegExp(y,_)}catch(Ze){c("error",`\u6B63\u5219\u8868\u8FBE\u5F0F\u65E0\u6548: ${Ze.message}`);return}let S;n&&e?S=le(e,{name:p,description:g,pattern:y,flags:_,groupIndex:ee}):S=oe({name:p,description:g,pattern:y,flags:_,groupIndex:ee}),S.success?(c("success",S.message),d(),X($||l)):c("error",S.message)})}function kt(){let e=I();if(!e)return;let t=$||l;!t||!t.length||(t.find(`#${a}-new-template`).on("click",function(){Be()}),t.find(".yyt-template-item").on("click",function(r){let i=e(this).data("template-id"),o=e(r.target).closest("[data-action]").data("action");if(!o)return;r.stopPropagation();let s=z(i);switch(o){case"use":if(s){t.find(`#${a}-regex-pattern`).val(s.pattern),t.find(`#${a}-regex-group-index`).val(s.groupIndex||0);let d=s.flags||"g";t.find(`#${a}-regex-flag-g`).prop("checked",d.includes("g")),t.find(`#${a}-regex-flag-i`).prop("checked",d.includes("i")),t.find(`#${a}-regex-flag-m`).prop("checked",d.includes("m")),c("info",`\u5DF2\u52A0\u8F7D\u6A21\u677F: ${s.name}`)}break;case"edit":Be(i);break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u6A21\u677F "${s?.name||i}" \u5417\uFF1F`)){let d=ce(i);c(d.success?"info":"error",d.message),d.success&&X(t)}break}}),t.find(`#${a}-regex-test`).on("click",function(){let r=t.find(`#${a}-regex-pattern`).val().trim(),n=t.find(`#${a}-regex-test-text`).val(),i=parseInt(t.find(`#${a}-regex-group-index`).val())||0,o="";if(t.find(`#${a}-regex-flag-g`).is(":checked")&&(o+="g"),t.find(`#${a}-regex-flag-i`).is(":checked")&&(o+="i"),t.find(`#${a}-regex-flag-m`).is(":checked")&&(o+="m"),!r){c("warning","\u8BF7\u8F93\u5165\u6B63\u5219\u8868\u8FBE\u5F0F");return}if(!n){c("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let s=W(r,n,o,i),d=t.find(`#${a}-regex-result-container`),p=t.find(`#${a}-regex-result`);if(s.success)if(d.show(),s.count===0)p.html('<div class="yyt-result-empty">\u672A\u627E\u5230\u5339\u914D</div>');else{let g=`<div class="yyt-result-header">\u627E\u5230 ${s.count} \u4E2A\u5339\u914D:</div>`;g+='<div class="yyt-result-list">',s.matches.forEach((y,_)=>{g+=`
            <div class="yyt-result-item">
              <div class="yyt-result-index">#${_+1}</div>
              <div class="yyt-result-content">${u(y.extracted)}</div>
            </div>
          `}),g+="</div>",g+='<div class="yyt-result-extracted">',g+='<div class="yyt-result-header">\u63D0\u53D6\u5185\u5BB9:</div>',g+='<pre class="yyt-code-block">'+u(s.extracted.join(`
`))+"</pre>",g+="</div>",p.html(g),c("success",`\u627E\u5230 ${s.count} \u4E2A\u5339\u914D`)}else d.show(),p.html(`<div class="yyt-result-error"><i class="fa-solid fa-exclamation-triangle"></i> ${u(s.error)}</div>`),c("error",s.error)}),t.find(`#${a}-regex-clear`).on("click",function(){t.find(`#${a}-regex-pattern`).val(""),t.find(`#${a}-regex-test-text`).val(""),t.find(`#${a}-regex-group-index`).val(1),t.find(`#${a}-regex-flag-g`).prop("checked",!0),t.find(`#${a}-regex-flag-i`).prop("checked",!1),t.find(`#${a}-regex-flag-m`).prop("checked",!1),t.find(`#${a}-regex-result-container`).hide()}),t.find(`#${a}-regex-generate-script`).on("click",function(){let r=t.find(`#${a}-regex-pattern`).val().trim(),n=t.find(`#${a}-regex-source`).val(),i=t.find(`#${a}-regex-var-name`).val().trim()||"extracted_content";if(!r){c("warning","\u8BF7\u8F93\u5165\u6B63\u5219\u8868\u8FBE\u5F0F");return}let o=O[n]?.macro||"{{lastMessage}}",s=`/match pattern="${r.replace(/"/g,'\\"')}" ${o} | /setvar key=${i}`;t.find(`#${a}-regex-script`).val(s),t.find(`#${a}-regex-script-container`).show(),c("success","\u811A\u672C\u5DF2\u751F\u6210")}),t.find(`#${a}-regex-copy-script`).on("click",function(){let r=t.find(`#${a}-regex-script`).val();if(!r){c("warning","\u8BF7\u5148\u751F\u6210\u811A\u672C");return}navigator.clipboard.writeText(r).then(()=>{c("success","\u811A\u672C\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F")}).catch(()=>{c("error","\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236")})}),t.find(`#${a}-import-regex-templates`).on("click",function(){t.find(`#${a}-import-regex-file`).click()}),t.find(`#${a}-import-regex-file`).on("change",async function(r){let n=r.target.files[0];if(n){try{let i=await n.text(),o=V(i,{overwrite:!1});c(o.success?"success":"error",o.message),o.success&&o.imported>0&&X(t)}catch(i){c("error",`\u5BFC\u5165\u5931\u8D25: ${i.message}`)}e(this).val("")}}),t.find(`#${a}-export-regex-templates`).on("click",function(){try{let r=pe(),n=new Blob([r],{type:"application/json"}),i=URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.download=`youyou_toolkit_regex_templates_${Date.now()}.json`,o.click(),URL.revokeObjectURL(i),c("success","\u6A21\u677F\u5DF2\u5BFC\u51FA")}catch(r){c("error",`\u5BFC\u51FA\u5931\u8D25: ${r.message}`)}}),t.find(`#${a}-reset-regex`).on("click",function(){if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u6B63\u5219\u6A21\u677F\u5417\uFF1F\u8FD9\u5C06\u6062\u590D\u9ED8\u8BA4\u6A21\u677F\u3002")){let r=v();delete r.regexTemplates,j(r),V(JSON.stringify([]),{overwrite:!0}),X(t),c("info","\u6B63\u5219\u6A21\u677F\u5DF2\u91CD\u7F6E")}}))}function X(e){let t=I();if(!t){console.error("[YouYouToolkit] jQuery not available");return}if(e&&(typeof e=="string"?$=t(e):e&&e.jquery?$=e:e&&($=t(e))),!$||!$.length){console.error("[YouYouToolkit] Regex container not found");return}let r=$t();$.html(r),kt()}function St(){return`
    /* \u6B63\u5219\u63D0\u53D6\u9762\u677F\u6837\u5F0F */
    .yyt-regex-panel {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .yyt-template-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 180px;
      overflow-y: auto;
      padding-right: 4px;
    }
    
    .yyt-template-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius-sm);
      transition: all 0.2s ease;
    }
    
    .yyt-template-item:hover {
      background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
      border-color: rgba(255, 255, 255, 0.12);
    }
    
    .yyt-template-info {
      flex: 1;
      min-width: 0;
    }
    
    .yyt-template-name {
      font-weight: 600;
      font-size: 13px;
      color: var(--yyt-text);
      margin-bottom: 2px;
    }
    
    .yyt-template-desc {
      font-size: 11px;
      color: var(--yyt-text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .yyt-template-actions {
      display: flex;
      gap: 4px;
      opacity: 0.5;
      transition: opacity 0.2s ease;
    }
    
    .yyt-template-item:hover .yyt-template-actions {
      opacity: 1;
    }
    
    .yyt-regex-input-row {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    
    .yyt-regex-flags {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }
    
    .yyt-checkbox-label {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: var(--yyt-text-secondary);
      cursor: pointer;
    }
    
    .yyt-checkbox-label input {
      width: 14px;
      height: 14px;
      cursor: pointer;
    }
    
    .yyt-regex-result {
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius-sm);
      padding: 14px;
      max-height: 250px;
      overflow-y: auto;
    }
    
    .yyt-result-header {
      font-size: 12px;
      font-weight: 600;
      color: var(--yyt-text-secondary);
      margin-bottom: 10px;
    }
    
    .yyt-result-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 14px;
    }
    
    .yyt-result-item {
      display: flex;
      gap: 10px;
      padding: 8px 10px;
      background: rgba(123, 183, 255, 0.05);
      border-radius: 6px;
      border: 1px solid rgba(123, 183, 255, 0.1);
    }
    
    .yyt-result-index {
      font-size: 11px;
      font-weight: 700;
      color: var(--yyt-accent);
      min-width: 24px;
    }
    
    .yyt-result-content {
      font-size: 12px;
      color: var(--yyt-text);
      word-break: break-all;
    }
    
    .yyt-result-extracted {
      padding-top: 10px;
      border-top: 1px solid var(--yyt-border);
    }
    
    .yyt-code-block {
      background: rgba(0, 0, 0, 0.3);
      border-radius: 6px;
      padding: 10px;
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 11px;
      color: var(--yyt-success);
      white-space: pre-wrap;
      word-break: break-all;
      margin: 8px 0 0 0;
      max-height: 150px;
      overflow-y: auto;
    }
    
    .yyt-code-textarea {
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 11px;
    }
    
    .yyt-result-empty {
      text-align: center;
      color: var(--yyt-text-muted);
      padding: 20px;
    }
    
    .yyt-result-error {
      color: var(--yyt-error);
      padding: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .yyt-dialog-wide {
      width: 480px;
    }
  `}function Ct(){return"main"}function At(e){}var a,l,F,C,$,wt,He=K(()=>{be();Se();J();Ce();a="youyou_toolkit";l=null,F=null,C="";$=null,wt=null});var x="youyou_toolkit",_e="0.2.0",Q=`${x}-menu-item`,Te=`${x}-menu-container`,It=`${x}-popup`,E=typeof window.parent<"u"?window.parent:window,ye=null,P=null,ue=null,k=null,Ge=null;async function B(){try{return ye=await Promise.resolve().then(()=>(J(),ze)),P=await Promise.resolve().then(()=>(be(),De)),ue=await Promise.resolve().then(()=>(Se(),Ue)),k=await Promise.resolve().then(()=>(He(),Ke)),Ge=await Promise.resolve().then(()=>(Ce(),Qe)),!0}catch(e){return console.warn(`[${x}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,e),!1}}function h(...e){console.log(`[${x}]`,...e)}function qe(...e){console.error(`[${x}]`,...e)}function Pt(){let e=`${x}-styles`,t=E.document||document;if(t.getElementById(e))return;let r=`
    /* ============================================================
       YouYou Toolkit - \u73B0\u4EE3\u5316\u5F39\u7A97\u6837\u5F0F
       ============================================================ */
    
    /* CSS\u53D8\u91CF */
    :root {
      --yyt-accent: #7bb7ff;
      --yyt-accent-glow: rgba(123, 183, 255, 0.4);
      --yyt-accent-soft: rgba(123, 183, 255, 0.15);
      --yyt-success: #4ade80;
      --yyt-error: #f87171;
      --yyt-surface: rgba(255, 255, 255, 0.03);
      --yyt-surface-hover: rgba(255, 255, 255, 0.06);
      --yyt-border: rgba(255, 255, 255, 0.08);
      --yyt-border-strong: rgba(255, 255, 255, 0.15);
      --yyt-text: rgba(255, 255, 255, 0.95);
      --yyt-text-secondary: rgba(255, 255, 255, 0.7);
      --yyt-text-muted: rgba(255, 255, 255, 0.45);
    }
    
    /* \u83DC\u5355\u9879\u6837\u5F0F */
    #${Te} {
      display: flex;
      align-items: center;
    }
    
    #${Q} {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      border-radius: 8px;
      margin: 2px;
    }
    
    #${Q}:hover {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
    }
    
    #${Q} .fa-fw {
      font-size: 16px;
      color: var(--yyt-accent);
      filter: drop-shadow(0 0 6px var(--yyt-accent-glow));
      transition: transform 0.2s ease;
    }
    
    #${Q}:hover .fa-fw {
      transform: scale(1.1);
    }
    
    #${Q} span {
      font-weight: 500;
      letter-spacing: 0.3px;
    }
    
    /* \u5F39\u7A97\u906E\u7F69 */
    .yyt-popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 9999;
      animation: yytFadeIn 0.25s ease-out;
    }
    
    @keyframes yytFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    /* \u5F39\u7A97\u4E3B\u4F53 */
    .yyt-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: 
        radial-gradient(ellipse at top, rgba(123, 183, 255, 0.08) 0%, transparent 50%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, transparent 30%),
        #0d1117;
      border: 1px solid var(--yyt-border-strong);
      border-radius: 20px;
      box-shadow: 
        0 0 0 1px rgba(255, 255, 255, 0.05),
        0 25px 80px rgba(0, 0, 0, 0.7),
        0 0 60px rgba(123, 183, 255, 0.1);
      width: 680px;
      min-height: 480px;
      max-width: 92vw;
      max-height: 88vh;
      z-index: 10000;
      animation: yytSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
      color: var(--yyt-text);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    @keyframes yytSlideIn {
      from { 
        opacity: 0; 
        transform: translate(-50%, -50%) scale(0.92) translateY(20px); 
      }
      to { 
        opacity: 1; 
        transform: translate(-50%, -50%) scale(1) translateY(0); 
      }
    }
    
    /* \u5F39\u7A97\u5934\u90E8 */
    .yyt-popup-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 24px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
      border-bottom: 1px solid var(--yyt-border);
      flex-shrink: 0;
    }
    
    .yyt-popup-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 17px;
      font-weight: 700;
      color: var(--yyt-text);
      letter-spacing: 0.3px;
    }
    
    .yyt-popup-title i {
      font-size: 18px;
      color: var(--yyt-accent);
      filter: drop-shadow(0 0 10px var(--yyt-accent-glow));
    }
    
    .yyt-popup-close {
      width: 32px;
      height: 32px;
      border: 1px solid var(--yyt-border);
      border-radius: 10px;
      background: var(--yyt-surface);
      color: var(--yyt-text-secondary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      font-size: 14px;
    }
    
    .yyt-popup-close:hover {
      background: linear-gradient(135deg, rgba(248, 113, 113, 0.2) 0%, rgba(248, 113, 113, 0.08) 100%);
      border-color: rgba(248, 113, 113, 0.35);
      color: #f87171;
      transform: rotate(90deg);
    }
    
    /* \u5F39\u7A97\u5185\u5BB9 */
    .yyt-popup-body {
      flex: 1;
      padding: 24px;
      overflow: auto;
    }
    
    .yyt-popup-body::-webkit-scrollbar {
      width: 8px;
    }
    
    .yyt-popup-body::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .yyt-popup-body::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.12);
      border-radius: 4px;
    }
    
    .yyt-popup-body::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    
    /* \u5F39\u7A97\u5E95\u90E8 */
    .yyt-popup-footer {
      padding: 18px 24px;
      background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.02) 100%);
      border-top: 1px solid var(--yyt-border);
      flex-shrink: 0;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    
    /* \u6309\u94AE */
    .yyt-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      display: inline-flex;
      align-items: center;
      gap: 8px;
      letter-spacing: 0.3px;
      position: relative;
      overflow: hidden;
    }
    
    .yyt-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 50%);
      pointer-events: none;
    }
    
    .yyt-btn-primary {
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #5a9cf0 100%);
      color: #0b0f15;
      box-shadow: 0 4px 15px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    
    .yyt-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 25px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.25);
    }
    
    .yyt-btn-secondary {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, var(--yyt-surface) 100%);
      color: var(--yyt-text);
      border: 1px solid var(--yyt-border);
    }
    
    .yyt-btn-secondary:hover {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, var(--yyt-surface-hover) 100%);
      border-color: var(--yyt-border-strong);
      transform: translateY(-1px);
    }
    
    /* \u4E3B\u5BFC\u822A\u6837\u5F0F */
    .yyt-nav {
      display: flex;
      gap: 8px;
      padding: 6px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
      border-radius: 14px;
      margin-bottom: 24px;
      border: 1px solid var(--yyt-border);
    }
    
    .yyt-nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 20px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      color: var(--yyt-text-secondary);
      font-weight: 500;
      position: relative;
      overflow: hidden;
    }
    
    .yyt-nav-item:hover {
      color: var(--yyt-text);
      background: var(--yyt-surface-hover);
    }
    
    .yyt-nav-item.active {
      color: #0b0f15;
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #a5d4ff 100%);
      box-shadow: 0 4px 15px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    
    .yyt-nav-item i {
      font-size: 15px;
      transition: transform 0.25s ease;
    }
    
    .yyt-nav-item:hover i {
      transform: scale(1.15);
    }
    
    /* \u9875\u9762\u5185\u5BB9 */
    .yyt-page {
      display: none;
      animation: yytPageIn 0.3s ease-out;
    }
    
    @keyframes yytPageIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .yyt-page.active {
      display: block;
    }
    
    /* \u6B22\u8FCE\u9875\u9762 */
    .yyt-welcome {
      text-align: center;
      padding: 50px 30px;
    }
    
    .yyt-welcome h2 {
      margin: 0 0 12px 0;
      font-size: 26px;
      font-weight: 700;
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #a5d4ff 50%, var(--yyt-accent) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: yytGradient 3s linear infinite;
    }
    
    @keyframes yytGradient {
      0% { background-position: 0% center; }
      100% { background-position: 200% center; }
    }
    
    .yyt-welcome p {
      color: var(--yyt-text-secondary);
      line-height: 1.7;
      margin: 0 0 20px 0;
      font-size: 15px;
    }
    
    .yyt-version {
      font-size: 12px;
      color: var(--yyt-text-muted);
      margin-top: 35px;
      padding: 10px 20px;
      background: var(--yyt-surface);
      border-radius: 20px;
      display: inline-block;
      border: 1px solid var(--yyt-border);
      letter-spacing: 0.5px;
    }
    
    .yyt-features {
      text-align: left;
      max-width: 450px;
      margin: 30px auto;
    }
    
    .yyt-feature-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      border-radius: 12px;
      margin-bottom: 10px;
      border: 1px solid var(--yyt-border);
      transition: all 0.25s ease;
    }
    
    .yyt-feature-item:hover {
      background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
      border-color: rgba(123, 183, 255, 0.2);
      transform: translateX(6px);
    }
    
    .yyt-feature-item i {
      color: var(--yyt-accent);
      font-size: 22px;
      width: 28px;
      filter: drop-shadow(0 0 8px var(--yyt-accent-glow));
      transition: transform 0.25s ease;
    }
    
    .yyt-feature-item:hover i {
      transform: scale(1.1);
    }
    
    .yyt-feature-item span {
      color: var(--yyt-text);
      font-size: 14px;
      font-weight: 500;
    }
  `,n=t.createElement("style");n.id=e,n.textContent=r,(t.head||t.documentElement).appendChild(n),h("\u6837\u5F0F\u5DF2\u6CE8\u5165")}var m=null,T=null,Tt="welcome";function ge(){m&&(m.remove(),m=null),T&&(T.remove(),T=null),h("\u5F39\u7A97\u5DF2\u5173\u95ED")}function We(e){Tt=e;let t=E.jQuery||window.jQuery;if(!(!t||!m)){if(t(m).find(".yyt-nav-item").removeClass("active"),t(m).find(`.yyt-nav-item[data-page="${e}"]`).addClass("active"),t(m).find(".yyt-page").removeClass("active"),t(m).find(`.yyt-page[data-page="${e}"]`).addClass("active"),e==="api"&&k){let r=t(m).find("#youyou_toolkit-api-container");r.length&&k.render(r)}if(e==="regex"&&k){let r=t(m).find("#youyou_toolkit-regex-container");r.length&&k.renderRegex(r)}}}function Ve(){if(m){h("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let e=E.jQuery||window.jQuery,t=E.document||document;if(!e){qe("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}T=t.createElement("div"),T.className="yyt-popup-overlay",T.addEventListener("click",i=>{i.target===T&&ge()}),t.body.appendChild(T);let r=`
    <div class="yyt-popup" id="${It}">
      <div class="yyt-popup-header">
        <div class="yyt-popup-title">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span>YouYou \u5DE5\u5177\u7BB1</span>
          <span style="font-size: 12px; opacity: 0.6;">v${_e}</span>
        </div>
        <button class="yyt-popup-close" title="\u5173\u95ED">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      
      <div class="yyt-popup-body">
        <div class="yyt-nav">
          <div class="yyt-nav-item active" data-page="welcome">
            <i class="fa-solid fa-home"></i>
            <span>\u9996\u9875</span>
          </div>
          <div class="yyt-nav-item" data-page="api">
            <i class="fa-solid fa-plug"></i>
            <span>API\u7BA1\u7406</span>
          </div>
          <div class="yyt-nav-item" data-page="regex">
            <i class="fa-solid fa-regex"></i>
            <span>\u6B63\u5219\u63D0\u53D6</span>
          </div>
        </div>
        
        <div class="yyt-page active" data-page="welcome">
          <div class="yyt-welcome">
            <h2>\u{1F6E0}\uFE0F \u6B22\u8FCE\u4F7F\u7528 YouYou \u5DE5\u5177\u7BB1</h2>
            <p>\u8FD9\u662F\u4E00\u4E2A\u4E3A SillyTavern \u8BBE\u8BA1\u7684\u5DE5\u5177\u63D2\u4EF6\u6846\u67B6\u3002</p>
            
            <div class="yyt-features">
              <div class="yyt-feature-item">
                <i class="fa-solid fa-plug"></i>
                <span>API\u8FDE\u63A5\u7BA1\u7406 - \u652F\u6301\u81EA\u5B9A\u4E49API\u548C\u4E3BAPI\u5207\u6362</span>
              </div>
              <div class="yyt-feature-item">
                <i class="fa-solid fa-bookmark"></i>
                <span>\u9884\u8BBE\u7BA1\u7406 - \u4FDD\u5B58\u548C\u5207\u6362\u591A\u5957API\u914D\u7F6E</span>
              </div>
              <div class="yyt-feature-item">
                <i class="fa-solid fa-regex"></i>
                <span>\u6B63\u5219\u63D0\u53D6 - \u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9</span>
              </div>
              <div class="yyt-feature-item">
                <i class="fa-solid fa-file-import"></i>
                <span>\u5BFC\u5165\u5BFC\u51FA - \u65B9\u4FBF\u5907\u4EFD\u548C\u5206\u4EAB\u914D\u7F6E</span>
              </div>
            </div>
            
            <div class="yyt-version">
              \u63D2\u4EF6ID: ${x}
            </div>
          </div>
        </div>
        
        <div class="yyt-page" data-page="api">
          <div id="${x}-api-container"></div>
        </div>
        
        <div class="yyt-page" data-page="regex">
          <div id="${x}-regex-container"></div>
        </div>
      </div>
      
      <div class="yyt-popup-footer">
        <button class="yyt-btn yyt-btn-secondary" id="${x}-close-btn">\u5173\u95ED</button>
      </div>
    </div>
  `,n=t.createElement("div");n.innerHTML=r,m=n.firstElementChild,t.body.appendChild(m),e(m).find(".yyt-popup-close").on("click",ge),e(m).find(`#${x}-close-btn`).on("click",ge),e(m).find(".yyt-nav-item").on("click",function(){let i=e(this).data("page");i&&We(i)}),h("\u5F39\u7A97\u5DF2\u6253\u5F00")}function Z(){let e=E.jQuery||window.jQuery;if(!e){qe("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(Z,1e3);return}let t=E.document||document,r=e("#extensionsMenu",t);if(!r.length){h("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(Z,2e3);return}if(e(`#${Te}`,r).length>0){h("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let i=e(`<div class="extension_container interactable" id="${Te}" tabindex="0"></div>`),o=`
    <div class="list-group-item flex-container flexGap5 interactable" id="${Q}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
      <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
      <span>YouYou \u5DE5\u5177\u7BB1</span>
    </div>
  `,s=e(o);s.on("click",async function(d){d.stopPropagation(),h("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let p=e("#extensionsMenuButton",t);p.length&&r.is(":visible")&&p.trigger("click"),Ve()}),i.append(s),r.append(i),h("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}var Ee={version:_e,id:x,init:Xe,openPopup:Ve,closePopup:ge,switchPage:We,addMenuItem:Z,getStorage:()=>ye,getApiConnection:()=>P,getPresetManager:()=>ue,getUiComponents:()=>k,getRegexExtractor:()=>Ge,async getApiConfig(){return await B(),ye?ye.loadSettings().apiConfig:null},async saveApiConfig(e){return await B(),P?(P.updateApiConfig(e),!0):!1},async getPresets(){return await B(),ue?ue.getAllPresets():[]},async sendApiRequest(e,t){if(await B(),P)return P.sendApiRequest(e,t);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await B(),P?P.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}}};async function Xe(){if(h(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${_e}`),Pt(),await B()){if(h("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),k){let r=E.document||document,n=`${x}-ui-styles`;if(!r.getElementById(n)){let o=r.createElement("style");o.id=n,o.textContent=k.getStyles(),(r.head||r.documentElement).appendChild(o)}let i=`${x}-regex-styles`;if(!r.getElementById(i)&&k.getRegexStyles){let o=r.createElement("style");o.id=i,o.textContent=k.getRegexStyles(),(r.head||r.documentElement).appendChild(o)}}}else h("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let t=E.document||document;t.readyState==="loading"?t.addEventListener("DOMContentLoaded",()=>{setTimeout(Z,1e3)}):setTimeout(Z,1e3),h("\u521D\u59CB\u5316\u5B8C\u6210")}if(typeof window<"u"&&(window.YouYouToolkit=Ee,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=Ee}catch{}var Qt=Ee;Xe();h("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210");export{Qt as default};
