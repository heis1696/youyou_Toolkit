var rt=Object.defineProperty;var H=(e,t)=>()=>(e&&(t=e(e=0)),t);var G=(e,t)=>{for(var r in t)rt(e,r,{get:t[r],enumerable:!0})};var De={};G(De,{DEFAULT_API_PRESETS:()=>Ye,DEFAULT_SETTINGS:()=>fe,STORAGE_KEYS:()=>R,deepMerge:()=>me,getCurrentPresetName:()=>L,loadApiPresets:()=>m,loadSettings:()=>w,saveApiPresets:()=>A,saveSettings:()=>Y,setCurrentPresetName:()=>J});function at(){try{let e=typeof window.parent<"u"?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext();if(r?.extensionSettings)return r.extensionSettings}if(e.extension_settings)return e.extension_settings;let t=e.jQuery||window.jQuery;return null}catch(e){return console.warn("[YouYouToolkit] \u65E0\u6CD5\u83B7\u53D6SillyTavern extensionSettings:",e),null}}function Re(){try{let e=typeof window.parent<"u"?window.parent:window;if(typeof e.saveSettings=="function")return e.saveSettings;if(e.SillyTavern?.getContext){let t=e.SillyTavern.getContext();if(typeof t.saveSettings=="function")return t.saveSettings;if(typeof t.saveSettingsDebounced=="function")return t.saveSettingsDebounced}return null}catch{return null}}function N(){let e=at(),t="youyou_toolkit";return e?(e[t]||(e[t]={}),{getItem:r=>{let a=e[t][r];return typeof a=="string"?a:a?JSON.stringify(a):null},setItem:(r,a)=>{e[t][r]=a;let s=Re();if(s)try{s()}catch(o){console.warn("[YouYouToolkit] \u4FDD\u5B58\u8BBE\u7F6E\u5931\u8D25:",o)}},removeItem:r=>{delete e[t][r];let a=Re();if(a)try{a()}catch{}},_isTavern:!0}):(console.warn("[YouYouToolkit] \u4F7F\u7528localStorage\u4F5C\u4E3A\u56DE\u9000\u5B58\u50A8"),{getItem:r=>{try{return localStorage.getItem(r)}catch{return null}},setItem:(r,a)=>{try{localStorage.setItem(r,a)}catch(s){console.error("[YouYouToolkit] localStorage\u5199\u5165\u5931\u8D25:",s)}},removeItem:r=>{try{localStorage.removeItem(r)}catch{}},_isTavern:!1})}function ze(e,t=null){if(!e||typeof e!="string")return t;try{return JSON.parse(e)}catch{return t}}function Oe(e,t="{}"){try{return JSON.stringify(e)}catch{return t}}function w(){let t=N().getItem(R.SETTINGS);if(t){let r=ze(t,null);if(r&&typeof r=="object")return me(JSON.parse(JSON.stringify(fe)),r)}return JSON.parse(JSON.stringify(fe))}function Y(e){N().setItem(R.SETTINGS,Oe(e))}function m(){let t=N().getItem(R.API_PRESETS);if(t){let r=ze(t,null);if(Array.isArray(r))return r}return JSON.parse(JSON.stringify(Ye))}function A(e){N().setItem(R.API_PRESETS,Oe(e))}function L(){return N().getItem(R.CURRENT_PRESET)||""}function J(e){N().setItem(R.CURRENT_PRESET,e||"")}function me(e,t){let r=s=>s&&typeof s=="object"&&!Array.isArray(s),a={...e};return r(e)&&r(t)&&Object.keys(t).forEach(s=>{r(t[s])?s in e?a[s]=me(e[s],t[s]):Object.assign(a,{[s]:t[s]}):Object.assign(a,{[s]:t[s]})}),a}var R,fe,Ye,F=H(()=>{R={SETTINGS:"youyou_toolkit_settings",API_PRESETS:"youyou_toolkit_api_presets",CURRENT_PRESET:"youyou_toolkit_current_preset"},fe={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},Ye=[]});var Ne={};G(Ne,{API_STATUS:()=>nt,fetchAvailableModels:()=>xe,getApiConfig:()=>z,getEffectiveApiConfig:()=>st,sendApiRequest:()=>Ue,testApiConnection:()=>ct,updateApiConfig:()=>O,validateApiConfig:()=>te});function z(){return w().apiConfig||{}}function O(e){let t=w();t.apiConfig={...t.apiConfig,...e},Y(t)}function te(e){let t=[];if(e.useMainApi)return{valid:!0,errors:[]};if(!e.url||!e.url.trim())t.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(e.url)}catch{t.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!e.model||!e.model.trim())&&t.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:t.length===0,errors:t}}function st(e=""){let t=w();if(e){let a=(t.apiPresets||[]).find(s=>s.name===e);if(a&&a.apiConfig)return{...a.apiConfig,presetName:a.name}}return t.apiConfig||{}}function it(e,t={}){let r=t.apiConfig||z();return{messages:e,model:r.model||"gpt-3.5-turbo",max_tokens:r.max_tokens||4096,temperature:r.temperature??.7,top_p:r.top_p??.9,stream:!1,...t.extraParams}}async function Ue(e,t={},r=null){let a=t.apiConfig||z(),s=a.useMainApi,o=te(a);if(!o.valid&&!s)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${o.errors.join(", ")}`);return s?await ot(e,t,r):await lt(e,a,t,r)}async function ot(e,t,r){let a=typeof window.parent<"u"?window.parent:window;if(!a.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let s=await a.TavernHelper.generateRaw({ordered_prompts:e,should_stream:!1,...t.extraParams});if(typeof s!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return s.trim()}catch(s){throw s.name==="AbortError"?s:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${s.message}`)}}async function lt(e,t,r,a){let s=it(e,{apiConfig:t,...r}),o={"Content-Type":"application/json"};t.apiKey&&(o.Authorization=`Bearer ${t.apiKey}`);let i=await fetch(t.url,{method:"POST",headers:o,body:JSON.stringify(s),signal:a});if(!i.ok){let g=await i.text().catch(()=>"Unknown error");throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${g}`)}let d=await i.json(),y="";if(d.choices&&d.choices[0]?.message?.content)y=d.choices[0].message.content;else if(d.content)y=d.content;else if(d.text)y=d.text;else if(d.response)y=d.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(d).slice(0,200)}`);return y.trim()}async function ct(e=null){let t=e||z(),r=Date.now();try{await Ue([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:t});let s=Date.now()-r;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${s}ms)`,latency:s}}catch(a){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${a.message}`,latency:Date.now()-r}}}async function xe(e=null){let t=e||z();return t.useMainApi?await dt():await pt(t)}async function dt(){let e=typeof window.parent<"u"?window.parent:window;try{if(e.SillyTavern?.getContext){let t=e.SillyTavern.getContext();if(t.settings?.api_server)return[t.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function pt(e){if(!e.url||!e.apiKey)return[];try{let r=`${e.url.replace(/\/chat\/completions$/,"").replace(/\/completions$/,"")}/models`,a=await fetch(r,{method:"GET",headers:{Authorization:`Bearer ${e.apiKey}`}});if(!a.ok)return[];let s=await a.json();return s.data&&Array.isArray(s.data)?s.data.map(o=>o.id||o.name).filter(Boolean).sort():[]}catch{return[]}}var nt,be=H(()=>{F();nt={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var Le={};G(Le,{createPreset:()=>ae,createPresetFromCurrentConfig:()=>ft,deletePreset:()=>W,duplicatePreset:()=>gt,exportPresets:()=>ke,generateUniquePresetName:()=>Ce,getActiveConfig:()=>$e,getActivePresetName:()=>se,getAllPresets:()=>re,getPreset:()=>k,getPresetNames:()=>yt,getStarredPresets:()=>he,importPresets:()=>Se,presetExists:()=>q,renamePreset:()=>ut,switchToPreset:()=>we,togglePresetStar:()=>ve,updatePreset:()=>ne,validatePreset:()=>mt});function re(){return m()}function yt(){return m().map(t=>t.name)}function k(e){return!e||typeof e!="string"?null:m().find(r=>r.name===e)||null}function q(e){return!e||typeof e!="string"?!1:m().some(r=>r.name===e)}function ae(e){let{name:t,description:r,apiConfig:a}=e;if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=t.trim();if(q(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={name:s,description:r||"",apiConfig:{url:a?.url||"",apiKey:a?.apiKey||"",model:a?.model||"",useMainApi:a?.useMainApi??!0,max_tokens:a?.max_tokens||4096,temperature:a?.temperature??.7,top_p:a?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},i=m();return i.push(o),A(i),{success:!0,message:`\u9884\u8BBE "${s}" \u521B\u5EFA\u6210\u529F`,preset:o}}function ne(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=m(),a=r.findIndex(i=>i.name===e);if(a===-1)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(t.name&&t.name!==e)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let s=r[a],o={...s,...t,name:s.name,updatedAt:Date.now()};return t.apiConfig&&(o.apiConfig={...s.apiConfig,...t.apiConfig}),r[a]=o,A(r),{success:!0,message:`\u9884\u8BBE "${e}" \u66F4\u65B0\u6210\u529F`,preset:o}}function W(e){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=m(),r=t.findIndex(a=>a.name===e);return r===-1?{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}:(t.splice(r,1),A(t),L()===e&&J(""),{success:!0,message:`\u9884\u8BBE "${e}" \u5DF2\u5220\u9664`})}function ut(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=t.trim();if(!q(e))return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(q(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let a=m(),s=a.find(o=>o.name===e);return s&&(s.name=r,s.updatedAt=Date.now(),A(a),L()===e&&J(r)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${r}"`}}function gt(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=t.trim(),a=k(e);if(!a)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(q(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let s={...JSON.parse(JSON.stringify(a)),name:r,createdAt:Date.now(),updatedAt:Date.now()},o=m();return o.push(s),A(o),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${r}"`,preset:s}}function ve(e){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=m(),r=t.find(a=>a.name===e);return r?(r.starred=!r.starred,r.updatedAt=Date.now(),A(t),{success:!0,message:r.starred?`\u5DF2\u5C06 "${e}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${e}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:r.starred}):{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}}function he(){return m().filter(t=>t.starred===!0)}function we(e){if(!e)return J(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let t=k(e);return t?(J(e),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${e}"`,apiConfig:t.apiConfig}):{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}}function se(){return L()}function $e(){let e=L();if(e){let r=k(e);if(r)return{presetName:e,apiConfig:r.apiConfig}}return{presetName:"",apiConfig:w().apiConfig||{}}}function ke(e=null){if(e){let r=k(e);if(!r)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let t=m();return JSON.stringify(t,null,2)}function Se(e,t={overwrite:!1}){let r;try{r=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let a=Array.isArray(r)?r:[r];if(a.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let s=m(),o=0;for(let i of a){if(!i.name||typeof i.name!="string"||!i.apiConfig||typeof i.apiConfig!="object")continue;let d=s.findIndex(y=>y.name===i.name);d>=0?t.overwrite&&(i.updatedAt=Date.now(),s[d]=i,o++):(i.createdAt=i.createdAt||Date.now(),i.updatedAt=Date.now(),s.push(i),o++)}return o>0&&A(s),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${o} \u4E2A\u9884\u8BBE`,imported:o}}function ft(e,t=""){let r=w();return ae({name:e,description:t,apiConfig:r.apiConfig})}function mt(e){let t=[];return(!e.name||typeof e.name!="string"||!e.name.trim())&&t.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!e.apiConfig||typeof e.apiConfig!="object")&&t.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:t.length===0,errors:t}}function Ce(e){(!e||typeof e!="string")&&(e="\u65B0\u9884\u8BBE");let t=m(),r=new Set(t.map(s=>s.name));if(!r.has(e))return e;let a=1;for(;r.has(`${e} (${a})`);)a++;return`${e} (${a})`}var Ae=H(()=>{F()});var Ke={};G(Ke,{MESSAGE_MACROS:()=>U,createTemplate:()=>oe,default:()=>bt,deleteTemplate:()=>ce,exportTemplates:()=>pe,extractWithTemplate:()=>Fe,generateExtractionScript:()=>Qe,generateReplaceScript:()=>Be,getAllTemplates:()=>ie,getTemplate:()=>D,importTemplates:()=>X,testRegex:()=>V,updateTemplate:()=>le});function Je(){return f=w().regexTemplates||[...xt],f}function ie(){return f.length===0&&Je(),f}function D(e){return f.find(t=>t.id===e)}function oe(e){let t={id:`custom-${Date.now()}`,name:e.name||"\u65B0\u6A21\u677F",description:e.description||"",pattern:e.pattern||"",flags:e.flags||"g",groupIndex:e.groupIndex||0,createdAt:new Date().toISOString()};return f.push(t),de(),{success:!0,template:t,message:"\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function le(e,t){let r=f.findIndex(a=>a.id===e);return r===-1?{success:!1,message:"\u6A21\u677F\u4E0D\u5B58\u5728"}:(f[r]={...f[r],...t,updatedAt:new Date().toISOString()},de(),{success:!0,template:f[r],message:"\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function ce(e){let t=f.findIndex(r=>r.id===e);return t===-1?{success:!1,message:"\u6A21\u677F\u4E0D\u5B58\u5728"}:(f.splice(t,1),de(),{success:!0,message:"\u6A21\u677F\u5DF2\u5220\u9664"})}function de(){let e=w();e.regexTemplates=f,Y(e)}function V(e,t,r="g",a=0){try{if(!e||typeof e!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let s=new RegExp(e,r),o=[];if(r.includes("g")){let i;for(;(i=s.exec(t))!==null;)i.length>1?o.push({fullMatch:i[0],groups:i.slice(1),index:i.index,extracted:i[a]||i[1]||i[0]}):o.push({fullMatch:i[0],groups:[],index:i.index,extracted:i[0]})}else{let i=s.exec(t);i&&o.push({fullMatch:i[0],groups:i.length>1?i.slice(1):[],index:i.index,extracted:i.length>1?i[a]||i[1]:i[0]})}return{success:!0,matches:o,count:o.length,extracted:o.map(i=>i.extracted)}}catch(s){return{success:!1,error:s.message,matches:[]}}}function Fe(e,t){let r=D(e);return r?V(r.pattern,t,r.flags,r.groupIndex):{success:!1,error:"\u6A21\u677F\u4E0D\u5B58\u5728"}}function Qe(e,t="lastMessage",r="extracted_content"){let a=D(e);if(!a)return null;let s=U[t]?.macro||"{{lastMessage}}";return`/match pattern="${a.pattern.replace(/"/g,'\\"')}" ${s} | /setvar key=${r}`}function Be(e,t,r="lastMessage"){let a=U[r]?.macro||"{{lastMessage}}";return`/replace mode=regex pattern="${e.replace(/"/g,'\\"')}" replacer="${t.replace(/"/g,'\\"')}" ${a}`}function pe(){return JSON.stringify(f,null,2)}function X(e,t={overwrite:!1}){try{let r=JSON.parse(e);if(!Array.isArray(r))return{success:!1,message:"\u65E0\u6548\u7684\u6A21\u677F\u683C\u5F0F"};if(t.overwrite)f=r;else{let a=new Set(f.map(o=>o.id)),s=r.filter(o=>!a.has(o.id));f.push(...s)}return de(),{success:!0,imported:r.length,message:`\u6210\u529F\u5BFC\u5165 ${r.length} \u4E2A\u6A21\u677F`}}catch(r){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}var xt,f,U,bt,Pe=H(()=>{F();xt=[{id:"json-content",name:"JSON\u5185\u5BB9\u63D0\u53D6",description:"\u63D0\u53D6JSON\u683C\u5F0F\u7684\u5185\u5BB9",pattern:'"content"\\s*:\\s*"([^"]+)"',flags:"g",groupIndex:1},{id:"code-block",name:"\u4EE3\u7801\u5757\u63D0\u53D6",description:"\u63D0\u53D6```\u5305\u88F9\u7684\u4EE3\u7801\u5757",pattern:"```[\\s\\S]*?\\n([\\s\\S]*?)```",flags:"g",groupIndex:1},{id:"thinking-tag",name:"\u601D\u8003\u6807\u7B7E\u5185\u5BB9",description:"\u63D0\u53D6<thinking>\u6807\u7B7E\u5185\u5BB9",pattern:"<thinking>([\\s\\S]*?)</thinking>",flags:"g",groupIndex:1},{id:"dialogue-quote",name:"\u5BF9\u8BDD\u5F15\u53F7\u5185\u5BB9",description:"\u63D0\u53D6\u5F15\u53F7\u4E2D\u7684\u5BF9\u8BDD",pattern:'"([^"]+)"',flags:"g",groupIndex:1},{id:"paragraph",name:"\u6BB5\u843D\u63D0\u53D6",description:"\u63D0\u53D6\u975E\u7A7A\u6BB5\u843D",pattern:"([^\\n]+)",flags:"g",groupIndex:1}],f=[];U={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};Je();bt={getAllTemplates:ie,getTemplate:D,createTemplate:oe,updateTemplate:le,deleteTemplate:ce,testRegex:V,extractWithTemplate:Fe,generateExtractionScript:Qe,generateReplaceScript:Be,exportTemplates:pe,importTemplates:X,MESSAGE_MACROS:U}});var Ge={};G(Ge,{getCurrentTab:()=>Pt,getRegexStyles:()=>At,getStyles:()=>$t,render:()=>I,renderRegex:()=>Z,setCurrentTab:()=>It});function u(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function c(e,t,r=3e3){let a=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(a.toastr){a.toastr[e](t,"YouYou \u5DE5\u5177\u7BB1",{timeOut:r,progressBar:!0});return}console.log(`[${e.toUpperCase()}] ${t}`)}function T(){if(Q)return Q;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Q=window.parent.jQuery,Q}catch{}return window.jQuery&&(Q=window.jQuery),Q}function Ee(){return l&&l.length>0}function vt(){let e=z(),t=$e(),r=se(),a=re(),s=he(),o=a.length>0?a.map(p=>{let v=p.starred===!0,j=v?"yyt-star-btn yyt-starred":"yyt-star-btn",h=v?"\u2605":"\u2606";return`<option value="${u(p.name)}" ${p.name===r?"selected":""}>${h} ${u(p.name)}</option>`}).join(""):"",d=s.slice(0,8),y=d.length>0?d.map(p=>`
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
      `).join(""):"",g=a.length>0?a.map(p=>{let v=p.starred===!0,j=v?"yyt-star-btn yyt-starred":"yyt-star-btn",h=v?"\u2605":"\u2606";return`<button class="${j}" data-preset="${u(p.name)}" title="${v?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${h}</button>`}).join(""):"";return`
    <div class="yyt-panel">
      <!-- \u9884\u8BBE\u9009\u62E9\u533A -->
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-bookmark"></i>
          <span>\u9884\u8BBE\u9009\u62E9</span>
        </div>
        
        <div class="yyt-preset-selector">
          <select class="yyt-select yyt-flex-1" id="${n}-preset-select">
            <option value="">-- \u5F53\u524D\u914D\u7F6E --</option>
            ${o}
          </select>
          <button class="yyt-btn yyt-btn-primary" id="${n}-apply-preset">
            <i class="fa-solid fa-check"></i> \u5E94\u7528
          </button>
        </div>
        
        ${g?`
        <div class="yyt-preset-star-bar">
          <span class="yyt-star-label">\u661F\u6807\u9884\u8BBE:</span>
          <div class="yyt-star-buttons">
            ${g}
          </div>
        </div>
        `:""}
        
        ${y?`
        <div class="yyt-preset-list-compact">
          ${y}
        </div>
        `:""}
      </div>
      
      <!-- API\u914D\u7F6E\u533A -->
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-sliders"></i>
          <span>API\u914D\u7F6E</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${n}-save-as-preset" style="margin-left: auto;">
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
              <input type="checkbox" id="${n}-use-main-api" ${e.useMainApi?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div id="${n}-custom-api-fields" class="${e.useMainApi?"yyt-disabled":""}">
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>API URL</label>
              <input type="text" class="yyt-input" id="${n}-api-url" 
                     value="${u(e.url||"")}" 
                     placeholder="https://api.openai.com/v1/chat/completions">
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>API Key</label>
              <div class="yyt-input-group">
                <input type="password" class="yyt-input" id="${n}-api-key" 
                       value="${u(e.apiKey||"")}" 
                       placeholder="sk-...">
                <button class="yyt-btn yyt-btn-icon" id="${n}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                  <i class="fa-solid fa-eye"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u6A21\u578B</label>
              <div class="yyt-model-row">
                <input type="text" class="yyt-input yyt-model-input" id="${n}-model" 
                       value="${u(e.model||"")}" 
                       placeholder="gpt-4">
                <select class="yyt-select yyt-model-select" id="${n}-model-select" style="display: none;">
                </select>
                <button class="yyt-btn yyt-btn-secondary yyt-model-btn" id="${n}-load-models" title="\u83B7\u53D6\u6A21\u578B\u5217\u8868">
                  <i class="fa-solid fa-sync-alt"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="yyt-form-row yyt-form-row-2col">
            <div class="yyt-form-group">
              <label>Max Tokens</label>
              <input type="number" class="yyt-input" id="${n}-max-tokens" 
                     value="${e.max_tokens||4096}" min="1" max="128000">
            </div>
            
            <div class="yyt-form-group">
              <label>Temperature</label>
              <input type="number" class="yyt-input" id="${n}-temperature" 
                     value="${e.temperature??.7}" min="0" max="2" step="0.1">
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>Top P</label>
              <input type="number" class="yyt-input" id="${n}-top-p" 
                     value="${e.top_p??.9}" min="0" max="1" step="0.1">
            </div>
          </div>
        </div>
      </div>
      
      <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
      <div class="yyt-panel-footer">
        <div class="yyt-footer-left">
          <button class="yyt-btn yyt-btn-secondary" id="${n}-import-presets">
            <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${n}-export-presets">
            <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
          </button>
          <input type="file" id="${n}-import-file" accept=".json" style="display:none">
        </div>
        <div class="yyt-footer-right">
          <button class="yyt-btn yyt-btn-secondary" id="${n}-reset-api-config">
            <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
          </button>
          <button class="yyt-btn yyt-btn-primary" id="${n}-save-api-config">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
          </button>
        </div>
      </div>
    </div>
  `}function ht(e=null){let t=T();if(!t)return;let a=re().map(p=>p.name),s=e||Ce("\u65B0\u9884\u8BBE"),o=`
    <div class="yyt-dialog-overlay" id="${n}-dialog-overlay">
      <div class="yyt-dialog">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${e?"\u7F16\u8F91\u9884\u8BBE":"\u4FDD\u5B58\u4E3A\u65B0\u9884\u8BBE"}</span>
          <button class="yyt-dialog-close" id="${n}-dialog-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body">
          <div class="yyt-form-group">
            <label>\u9884\u8BBE\u540D\u79F0</label>
            <input type="text" class="yyt-input" id="${n}-dialog-preset-name" 
                   value="${u(s)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
          </div>
          <div class="yyt-form-group">
            <label>\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09</label>
            <textarea class="yyt-textarea" id="${n}-dialog-preset-desc" rows="2" 
                      placeholder="\u9884\u8BBE\u63CF\u8FF0..."></textarea>
          </div>
        </div>
        <div class="yyt-dialog-footer">
          <button class="yyt-btn yyt-btn-secondary" id="${n}-dialog-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${n}-dialog-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `;t(`#${n}-dialog-overlay`).remove(),l.append(o);let i=t(`#${n}-dialog-overlay`),d=t(`#${n}-dialog-preset-name`),y=t(`#${n}-dialog-preset-desc`);if(d.focus().select(),e){let p=k(e);p&&p.description&&y.val(p.description)}let g=()=>{i.remove()};i.find(`#${n}-dialog-close, #${n}-dialog-cancel`).on("click",g),i.on("click",function(p){p.target===this&&g()}),i.find(`#${n}-dialog-save`).on("click",function(){let p=d.val().trim(),v=y.val().trim();if(!p){c("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),d.focus();return}if(a.includes(p)&&p!==e){if(!confirm(`\u9884\u8BBE "${p}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;W(p)}e&&p!==e&&W(e);let j=Te(),h=ae({name:p,description:v,apiConfig:j});h.success?(c("success",h.message),g(),I()):c("error",h.message)}),d.on("keypress",function(p){p.which===13&&i.find(`#${n}-dialog-save`).click()})}function wt(){let e=T();if(!e||!Ee()){console.warn("[YouYouToolkit] bindEvents: jQuery\u6216\u5BB9\u5668\u4E0D\u53EF\u7528");return}l.find(".yyt-star-btn").on("click",function(t){t.preventDefault(),t.stopPropagation();let r=e(this).data("preset");if(!r)return;let a=ve(r);a.success?(c("success",a.message),I()):c("error",a.message)}),l.find(`#${n}-preset-select`).on("change",function(){let t=e(this).val();if(t){let r=k(t);r&&Ie(r.apiConfig)}}),l.find(`#${n}-apply-preset`).on("click",function(){let t=l.find(`#${n}-preset-select`).val();if(!t){we(""),P="",l.find(".yyt-preset-item").removeClass("yyt-loaded"),c("info","\u5DF2\u5207\u6362\u5230\u5F53\u524D\u914D\u7F6E"),I();return}let r=k(t);r?(Ie(r.apiConfig),P=t,l.find(".yyt-preset-item").removeClass("yyt-loaded"),l.find(`.yyt-preset-item[data-preset-name="${t}"]`).addClass("yyt-loaded"),c("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${t}"`)):c("error",`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`)}),l.find(".yyt-preset-item").on("click",function(t){let r=e(this),a=r.data("preset-name"),s=e(t.target).closest("[data-action]").data("action");if(s)switch(t.stopPropagation(),s){case"load":let o=k(a);o&&(Ie(o.apiConfig),P=a,l.find(`#${n}-preset-select`).val(a),l.find(".yyt-preset-item").removeClass("yyt-loaded"),r.addClass("yyt-loaded"),c("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${a}"\uFF0C\u4FEE\u6539\u540E\u53EF\u70B9\u51FB"\u4FDD\u5B58\u914D\u7F6E"\u8986\u76D6\u6B64\u9884\u8BBE`));break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${a}" \u5417\uFF1F`)){let i=W(a);c(i.success?"info":"error",i.message),i.success&&(P===a&&(P=""),I())}break}}),l.find(`#${n}-use-main-api`).on("change",function(){let t=e(this).is(":checked"),r=l.find(`#${n}-custom-api-fields`);t?r.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):r.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),l.find(`#${n}-toggle-key-visibility`).on("click",function(){let t=l.find(`#${n}-api-key`),r=t.attr("type");t.attr("type",r==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),l.find(`#${n}-load-models`).on("click",async function(){let t=e(this),r=l.find(`#${n}-model`),a=l.find(`#${n}-model-select`);t.prop("disabled",!0).find("i").addClass("fa-spin");try{let s=Te(),o=await xe(s);if(o.length>0){a.empty(),o.forEach(d=>{a.append(`<option value="${u(d)}">${u(d)}</option>`)}),r.hide(),a.show();let i=r.val();i&&o.includes(i)&&a.val(i),a.off("change").on("change",function(){r.val(e(this).val())}),c("success",`\u5DF2\u52A0\u8F7D ${o.length} \u4E2A\u6A21\u578B`)}else c("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(s){c("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${s.message}`)}finally{t.prop("disabled",!1).find("i").removeClass("fa-spin")}}),l.find(`#${n}-model`).on("focus",function(){let t=l.find(`#${n}-model-select`);e(this).show(),t.hide()}),l.find(`#${n}-save-api-config`).on("click",function(){let t=Te(),r=te(t);if(!r.valid&&!t.useMainApi){c("error",r.errors.join(", "));return}if(P){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${P}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E`)){O(t),c("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58");return}O(t);let s=ne(P,{apiConfig:t});s.success?(c("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${P}"`),I()):c("error",s.message);return}let a=se();if(a){O(t),ne(a,{apiConfig:t}),c("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58");return}O(t),c("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),l.find(`#${n}-reset-api-config`).on("click",function(){confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")&&(O({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9}),I(),c("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E"))}),l.find(`#${n}-save-as-preset`).on("click",function(){ht()}),l.find(`#${n}-export-presets`).on("click",function(){try{let t=ke(),r=new Blob([t],{type:"application/json"}),a=URL.createObjectURL(r),s=document.createElement("a");s.href=a,s.download=`youyou_toolkit_presets_${Date.now()}.json`,s.click(),URL.revokeObjectURL(a),c("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(t){c("error",`\u5BFC\u51FA\u5931\u8D25: ${t.message}`)}}),l.find(`#${n}-import-presets`).on("click",function(){l.find(`#${n}-import-file`).click()}),l.find(`#${n}-import-file`).on("change",async function(t){let r=t.target.files[0];if(r){try{let a=await r.text(),s=Se(a,{overwrite:!0});c(s.success?"success":"error",s.message),s.imported>0&&I()}catch(a){c("error",`\u5BFC\u5165\u5931\u8D25: ${a.message}`)}e(this).val("")}})}function Te(){if(!T()||!Ee())return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let t=l.find(`#${n}-model`).val()?.trim()||"",r=l.find(`#${n}-model-select`);return r.is(":visible")&&(t=r.val()||t),{url:l.find(`#${n}-api-url`).val()?.trim()||"",apiKey:l.find(`#${n}-api-key`).val()||"",model:t,useMainApi:l.find(`#${n}-use-main-api`).is(":checked"),max_tokens:parseInt(l.find(`#${n}-max-tokens`).val())||4096,temperature:parseFloat(l.find(`#${n}-temperature`).val())??.7,top_p:parseFloat(l.find(`#${n}-top-p`).val())??.9}}function Ie(e){if(!T()||!Ee()||!e)return;l.find(`#${n}-api-url`).val(e.url||""),l.find(`#${n}-api-key`).val(e.apiKey||""),l.find(`#${n}-model`).val(e.model||""),l.find(`#${n}-max-tokens`).val(e.max_tokens||4096),l.find(`#${n}-temperature`).val(e.temperature??.7),l.find(`#${n}-top-p`).val(e.top_p??.9);let r=e.useMainApi??!0;l.find(`#${n}-use-main-api`).prop("checked",r);let s=l.find(`#${n}-custom-api-fields`);r?s.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):s.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),l.find(`#${n}-model`).show(),l.find(`#${n}-model-select`).hide()}function I(e){let t=T();if(!t){console.error("[YouYouToolkit] jQuery not available");return}if(e&&(typeof e=="string"?l=t(e):e&&e.jquery?l=e:e&&(l=t(e))),!l||!l.length){console.error("[YouYouToolkit] Container not found or invalid");return}let r=`<div class="yyt-api-manager">${vt()}</div>`;l.html(r),wt()}function $t(){return`
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
    
    /* \u661F\u6807\u6309\u94AE\u680F */
    .yyt-preset-star-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius-sm);
    }
    
    .yyt-star-label {
      font-size: 12px;
      font-weight: 500;
      color: var(--yyt-text-secondary);
      white-space: nowrap;
    }
    
    .yyt-star-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    
    .yyt-star-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 28px;
      border: 1px solid var(--yyt-border);
      border-radius: 6px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      color: var(--yyt-text-muted);
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .yyt-star-btn:hover {
      background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
      border-color: var(--yyt-accent);
      color: var(--yyt-accent);
      transform: translateY(-1px);
    }
    
    .yyt-star-btn.yyt-starred {
      background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.05) 100%);
      border-color: rgba(251, 191, 36, 0.4);
      color: #fbbf24;
    }
    
    .yyt-star-btn.yyt-starred:hover {
      background: linear-gradient(135deg, rgba(251, 191, 36, 0.25) 0%, rgba(251, 191, 36, 0.1) 100%);
      border-color: rgba(251, 191, 36, 0.6);
      color: #fcd34d;
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
  `}function St(){let e=ie(),t=e.length>0?e.map(a=>`
        <div class="yyt-template-item" data-template-id="${u(a.id)}">
          <div class="yyt-template-info">
            <div class="yyt-template-name">${u(a.name)}</div>
            <div class="yyt-template-desc">${u(a.description||"\u65E0\u63CF\u8FF0")}</div>
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
      `).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-regex"></i><span>\u6682\u65E0\u6A21\u677F</span></div>',r=Object.entries(U).map(([a,s])=>`<option value="${a}">${s.description} (${s.macro})</option>`).join("");return`
    <div class="yyt-regex-panel">
      <!-- \u6A21\u677F\u7BA1\u7406\u533A -->
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-regex"></i>
          <span>\u6B63\u5219\u6A21\u677F</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-primary" id="${n}-new-template" style="margin-left: auto;">
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
            <input type="text" class="yyt-input yyt-flex-1" id="${n}-regex-pattern" 
                   placeholder="\u8F93\u5165\u6B63\u5219\u8868\u8FBE\u5F0F\uFF0C\u5982: ([^
]+)">
            <div class="yyt-regex-flags">
              <label class="yyt-checkbox-label" title="\u5168\u5C40\u5339\u914D">
                <input type="checkbox" id="${n}-regex-flag-g" checked> g
              </label>
              <label class="yyt-checkbox-label" title="\u5FFD\u7565\u5927\u5C0F\u5199">
                <input type="checkbox" id="${n}-regex-flag-i"> i
              </label>
              <label class="yyt-checkbox-label" title="\u591A\u884C\u6A21\u5F0F">
                <input type="checkbox" id="${n}-regex-flag-m"> m
              </label>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-group">
          <label>\u6355\u83B7\u7EC4\u7D22\u5F15\uFF080=\u5B8C\u6574\u5339\u914D\uFF0C1=\u7B2C\u4E00\u4E2A\u6355\u83B7\u7EC4\uFF09</label>
          <input type="number" class="yyt-input" id="${n}-regex-group-index" 
                 value="1" min="0" max="99" style="width: 80px;">
        </div>
        
        <div class="yyt-form-group">
          <label>\u6D4B\u8BD5\u6587\u672C</label>
          <textarea class="yyt-textarea" id="${n}-regex-test-text" rows="4" 
                    placeholder="\u8F93\u5165\u8981\u6D4B\u8BD5\u7684\u6587\u672C\u5185\u5BB9..."></textarea>
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${n}-regex-test">
            <i class="fa-solid fa-play"></i> \u6D4B\u8BD5\u5339\u914D
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${n}-regex-clear">
            <i class="fa-solid fa-eraser"></i> \u6E05\u7A7A
          </button>
        </div>
        
        <div class="yyt-form-group" id="${n}-regex-result-container" style="display: none;">
          <label>\u5339\u914D\u7ED3\u679C</label>
          <div class="yyt-regex-result" id="${n}-regex-result"></div>
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
          <select class="yyt-select" id="${n}-regex-source">
            ${r}
          </select>
        </div>
        
        <div class="yyt-form-group">
          <label>\u4FDD\u5B58\u5230\u53D8\u91CF\u540D</label>
          <input type="text" class="yyt-input" id="${n}-regex-var-name" 
                 value="extracted_content" placeholder="\u53D8\u91CF\u540D">
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${n}-regex-generate-script">
            <i class="fa-solid fa-code"></i> \u751F\u6210\u811A\u672C
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${n}-regex-copy-script">
            <i class="fa-solid fa-copy"></i> \u590D\u5236\u811A\u672C
          </button>
        </div>
        
        <div class="yyt-form-group" id="${n}-regex-script-container" style="display: none;">
          <label>\u751F\u6210\u7684STScript</label>
          <textarea class="yyt-textarea yyt-code-textarea" id="${n}-regex-script" 
                    rows="3" readonly></textarea>
        </div>
      </div>
      
      <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
      <div class="yyt-panel-footer">
        <div class="yyt-footer-left">
          <button class="yyt-btn yyt-btn-secondary" id="${n}-import-regex-templates">
            <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${n}-export-regex-templates">
            <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
          </button>
          <input type="file" id="${n}-import-regex-file" accept=".json" style="display:none">
        </div>
        <div class="yyt-footer-right">
          <button class="yyt-btn yyt-btn-secondary" id="${n}-reset-regex">
            <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
          </button>
        </div>
      </div>
    </div>
  `}function He(e=null){let t=T();if(!t)return;let r=e?D(e):null,a=!!r,s=`
    <div class="yyt-dialog-overlay" id="${n}-template-dialog-overlay">
      <div class="yyt-dialog yyt-dialog-wide">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${a?"\u7F16\u8F91\u6A21\u677F":"\u65B0\u5EFA\u6B63\u5219\u6A21\u677F"}</span>
          <button class="yyt-dialog-close" id="${n}-template-dialog-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body">
          <div class="yyt-form-group">
            <label>\u6A21\u677F\u540D\u79F0</label>
            <input type="text" class="yyt-input" id="${n}-template-name" 
                   value="${r?u(r.name):""}" placeholder="\u8F93\u5165\u6A21\u677F\u540D\u79F0">
          </div>
          <div class="yyt-form-group">
            <label>\u63CF\u8FF0</label>
            <input type="text" class="yyt-input" id="${n}-template-desc" 
                   value="${r?u(r.description||""):""}" placeholder="\u6A21\u677F\u63CF\u8FF0">
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u5219\u8868\u8FBE\u5F0F</label>
            <input type="text" class="yyt-input" id="${n}-template-pattern" 
                   value="${r?u(r.pattern):""}" placeholder="\u6B63\u5219\u8868\u8FBE\u5F0F">
          </div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u6807\u5FD7\u4F4D</label>
              <input type="text" class="yyt-input" id="${n}-template-flags" 
                     value="${r?u(r.flags||"g"):"g"}" placeholder="gim">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u6355\u83B7\u7EC4\u7D22\u5F15</label>
              <input type="number" class="yyt-input" id="${n}-template-group" 
                     value="${r?r.groupIndex||0:1}" min="0" max="99">
            </div>
          </div>
        </div>
        <div class="yyt-dialog-footer">
          <button class="yyt-btn yyt-btn-secondary" id="${n}-template-dialog-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${n}-template-dialog-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `;t(`#${n}-template-dialog-overlay`).remove(),S?S.append(s):l.append(s);let o=t(`#${n}-template-dialog-overlay`),i=t(`#${n}-template-name`);i.focus();let d=()=>{o.remove(),kt=null};o.find(`#${n}-template-dialog-close, #${n}-template-dialog-cancel`).on("click",d),o.on("click",function(y){y.target===this&&d()}),o.find(`#${n}-template-dialog-save`).on("click",function(){let y=i.val().trim(),g=t(`#${n}-template-desc`).val().trim(),p=t(`#${n}-template-pattern`).val().trim(),v=t(`#${n}-template-flags`).val().trim()||"g",j=parseInt(t(`#${n}-template-group`).val())||0;if(!y){c("warning","\u8BF7\u8F93\u5165\u6A21\u677F\u540D\u79F0"),i.focus();return}if(!p){c("warning","\u8BF7\u8F93\u5165\u6B63\u5219\u8868\u8FBE\u5F0F"),t(`#${n}-template-pattern`).focus();return}try{new RegExp(p,v)}catch(tt){c("error",`\u6B63\u5219\u8868\u8FBE\u5F0F\u65E0\u6548: ${tt.message}`);return}let h;a&&e?h=le(e,{name:y,description:g,pattern:p,flags:v,groupIndex:j}):h=oe({name:y,description:g,pattern:p,flags:v,groupIndex:j}),h.success?(c("success",h.message),d(),Z(S||l)):c("error",h.message)})}function Ct(){let e=T();if(!e)return;let t=S||l;!t||!t.length||(t.find(`#${n}-new-template`).on("click",function(){He()}),t.find(".yyt-template-item").on("click",function(r){let s=e(this).data("template-id"),o=e(r.target).closest("[data-action]").data("action");if(!o)return;r.stopPropagation();let i=D(s);switch(o){case"use":if(i){t.find(`#${n}-regex-pattern`).val(i.pattern),t.find(`#${n}-regex-group-index`).val(i.groupIndex||0);let d=i.flags||"g";t.find(`#${n}-regex-flag-g`).prop("checked",d.includes("g")),t.find(`#${n}-regex-flag-i`).prop("checked",d.includes("i")),t.find(`#${n}-regex-flag-m`).prop("checked",d.includes("m")),c("info",`\u5DF2\u52A0\u8F7D\u6A21\u677F: ${i.name}`)}break;case"edit":He(s);break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u6A21\u677F "${i?.name||s}" \u5417\uFF1F`)){let d=ce(s);c(d.success?"info":"error",d.message),d.success&&Z(t)}break}}),t.find(`#${n}-regex-test`).on("click",function(){let r=t.find(`#${n}-regex-pattern`).val().trim(),a=t.find(`#${n}-regex-test-text`).val(),s=parseInt(t.find(`#${n}-regex-group-index`).val())||0,o="";if(t.find(`#${n}-regex-flag-g`).is(":checked")&&(o+="g"),t.find(`#${n}-regex-flag-i`).is(":checked")&&(o+="i"),t.find(`#${n}-regex-flag-m`).is(":checked")&&(o+="m"),!r){c("warning","\u8BF7\u8F93\u5165\u6B63\u5219\u8868\u8FBE\u5F0F");return}if(!a){c("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let i=V(r,a,o,s),d=t.find(`#${n}-regex-result-container`),y=t.find(`#${n}-regex-result`);if(i.success)if(d.show(),i.count===0)y.html('<div class="yyt-result-empty">\u672A\u627E\u5230\u5339\u914D</div>');else{let g=`<div class="yyt-result-header">\u627E\u5230 ${i.count} \u4E2A\u5339\u914D:</div>`;g+='<div class="yyt-result-list">',i.matches.forEach((p,v)=>{g+=`
            <div class="yyt-result-item">
              <div class="yyt-result-index">#${v+1}</div>
              <div class="yyt-result-content">${u(p.extracted)}</div>
            </div>
          `}),g+="</div>",g+='<div class="yyt-result-extracted">',g+='<div class="yyt-result-header">\u63D0\u53D6\u5185\u5BB9:</div>',g+='<pre class="yyt-code-block">'+u(i.extracted.join(`
`))+"</pre>",g+="</div>",y.html(g),c("success",`\u627E\u5230 ${i.count} \u4E2A\u5339\u914D`)}else d.show(),y.html(`<div class="yyt-result-error"><i class="fa-solid fa-exclamation-triangle"></i> ${u(i.error)}</div>`),c("error",i.error)}),t.find(`#${n}-regex-clear`).on("click",function(){t.find(`#${n}-regex-pattern`).val(""),t.find(`#${n}-regex-test-text`).val(""),t.find(`#${n}-regex-group-index`).val(1),t.find(`#${n}-regex-flag-g`).prop("checked",!0),t.find(`#${n}-regex-flag-i`).prop("checked",!1),t.find(`#${n}-regex-flag-m`).prop("checked",!1),t.find(`#${n}-regex-result-container`).hide()}),t.find(`#${n}-regex-generate-script`).on("click",function(){let r=t.find(`#${n}-regex-pattern`).val().trim(),a=t.find(`#${n}-regex-source`).val(),s=t.find(`#${n}-regex-var-name`).val().trim()||"extracted_content";if(!r){c("warning","\u8BF7\u8F93\u5165\u6B63\u5219\u8868\u8FBE\u5F0F");return}let o=U[a]?.macro||"{{lastMessage}}",i=`/match pattern="${r.replace(/"/g,'\\"')}" ${o} | /setvar key=${s}`;t.find(`#${n}-regex-script`).val(i),t.find(`#${n}-regex-script-container`).show(),c("success","\u811A\u672C\u5DF2\u751F\u6210")}),t.find(`#${n}-regex-copy-script`).on("click",function(){let r=t.find(`#${n}-regex-script`).val();if(!r){c("warning","\u8BF7\u5148\u751F\u6210\u811A\u672C");return}navigator.clipboard.writeText(r).then(()=>{c("success","\u811A\u672C\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F")}).catch(()=>{c("error","\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236")})}),t.find(`#${n}-import-regex-templates`).on("click",function(){t.find(`#${n}-import-regex-file`).click()}),t.find(`#${n}-import-regex-file`).on("change",async function(r){let a=r.target.files[0];if(a){try{let s=await a.text(),o=X(s,{overwrite:!1});c(o.success?"success":"error",o.message),o.success&&o.imported>0&&Z(t)}catch(s){c("error",`\u5BFC\u5165\u5931\u8D25: ${s.message}`)}e(this).val("")}}),t.find(`#${n}-export-regex-templates`).on("click",function(){try{let r=pe(),a=new Blob([r],{type:"application/json"}),s=URL.createObjectURL(a),o=document.createElement("a");o.href=s,o.download=`youyou_toolkit_regex_templates_${Date.now()}.json`,o.click(),URL.revokeObjectURL(s),c("success","\u6A21\u677F\u5DF2\u5BFC\u51FA")}catch(r){c("error",`\u5BFC\u51FA\u5931\u8D25: ${r.message}`)}}),t.find(`#${n}-reset-regex`).on("click",function(){if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u6B63\u5219\u6A21\u677F\u5417\uFF1F\u8FD9\u5C06\u6062\u590D\u9ED8\u8BA4\u6A21\u677F\u3002")){let r=w();delete r.regexTemplates,Y(r),X(JSON.stringify([]),{overwrite:!0}),Z(t),c("info","\u6B63\u5219\u6A21\u677F\u5DF2\u91CD\u7F6E")}}))}function Z(e){let t=T();if(!t){console.error("[YouYouToolkit] jQuery not available");return}if(e&&(typeof e=="string"?S=t(e):e&&e.jquery?S=e:e&&(S=t(e))),!S||!S.length){console.error("[YouYouToolkit] Regex container not found");return}let r=St();S.html(r),Ct()}function At(){return`
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
  `}function Pt(){return"main"}function It(e){}var n,l,Q,P,S,kt,qe=H(()=>{be();Ae();F();Pe();n="youyou_toolkit";l=null,Q=null,P="";S=null,kt=null});var b="youyou_toolkit",je="0.3.0",B=`${b}-menu-item`,_e=`${b}-menu-container`,Tt=`${b}-popup`,M=typeof window.parent<"u"?window.parent:window,ye=null,E=null,ue=null,C=null,We=null;async function K(){try{return ye=await Promise.resolve().then(()=>(F(),De)),E=await Promise.resolve().then(()=>(be(),Ne)),ue=await Promise.resolve().then(()=>(Ae(),Le)),C=await Promise.resolve().then(()=>(qe(),Ge)),We=await Promise.resolve().then(()=>(Pe(),Ke)),!0}catch(e){return console.warn(`[${b}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,e),!1}}function $(...e){console.log(`[${b}]`,...e)}function Ve(...e){console.error(`[${b}]`,...e)}function Et(){let e=`${b}-styles`,t=M.document||document;if(t.getElementById(e))return;let r=`
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
    #${_e} {
      display: flex;
      align-items: center;
    }
    
    #${B} {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      border-radius: 8px;
      margin: 2px;
    }
    
    #${B}:hover {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
    }
    
    #${B} .fa-fw {
      font-size: 16px;
      color: var(--yyt-accent);
      filter: drop-shadow(0 0 6px var(--yyt-accent-glow));
      transition: transform 0.2s ease;
    }
    
    #${B}:hover .fa-fw {
      transform: scale(1.1);
    }
    
    #${B} span {
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
  `,a=t.createElement("style");a.id=e,a.textContent=r,(t.head||t.documentElement).appendChild(a),$("\u6837\u5F0F\u5DF2\u6CE8\u5165")}var x=null,_=null,_t="welcome";function ge(){x&&(x.remove(),x=null),_&&(_.remove(),_=null),$("\u5F39\u7A97\u5DF2\u5173\u95ED")}function Xe(e){_t=e;let t=M.jQuery||window.jQuery;if(!(!t||!x)){if(t(x).find(".yyt-nav-item").removeClass("active"),t(x).find(`.yyt-nav-item[data-page="${e}"]`).addClass("active"),t(x).find(".yyt-page").removeClass("active"),t(x).find(`.yyt-page[data-page="${e}"]`).addClass("active"),e==="api"&&C){let r=t(x).find("#youyou_toolkit-api-container");r.length&&C.render(r)}if(e==="regex"&&C){let r=t(x).find("#youyou_toolkit-regex-container");r.length&&C.renderRegex(r)}}}function Ze(){if(x){$("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let e=M.jQuery||window.jQuery,t=M.document||document;if(!e){Ve("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}_=t.createElement("div"),_.className="yyt-popup-overlay",_.addEventListener("click",s=>{s.target===_&&ge()}),t.body.appendChild(_);let r=`
    <div class="yyt-popup" id="${Tt}">
      <div class="yyt-popup-header">
        <div class="yyt-popup-title">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span>YouYou \u5DE5\u5177\u7BB1</span>
          <span style="font-size: 12px; opacity: 0.6;">v${je}</span>
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
              \u63D2\u4EF6ID: ${b}
            </div>
          </div>
        </div>
        
        <div class="yyt-page" data-page="api">
          <div id="${b}-api-container"></div>
        </div>
        
        <div class="yyt-page" data-page="regex">
          <div id="${b}-regex-container"></div>
        </div>
      </div>
      
      <div class="yyt-popup-footer">
        <button class="yyt-btn yyt-btn-secondary" id="${b}-close-btn">\u5173\u95ED</button>
      </div>
    </div>
  `,a=t.createElement("div");a.innerHTML=r,x=a.firstElementChild,t.body.appendChild(x),e(x).find(".yyt-popup-close").on("click",ge),e(x).find(`#${b}-close-btn`).on("click",ge),e(x).find(".yyt-nav-item").on("click",function(){let s=e(this).data("page");s&&Xe(s)}),$("\u5F39\u7A97\u5DF2\u6253\u5F00")}function ee(){let e=M.jQuery||window.jQuery;if(!e){Ve("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(ee,1e3);return}let t=M.document||document,r=e("#extensionsMenu",t);if(!r.length){$("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(ee,2e3);return}if(e(`#${_e}`,r).length>0){$("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let s=e(`<div class="extension_container interactable" id="${_e}" tabindex="0"></div>`),o=`
    <div class="list-group-item flex-container flexGap5 interactable" id="${B}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
      <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
      <span>YouYou \u5DE5\u5177\u7BB1</span>
    </div>
  `,i=e(o);i.on("click",async function(d){d.stopPropagation(),$("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let y=e("#extensionsMenuButton",t);y.length&&r.is(":visible")&&y.trigger("click"),Ze()}),s.append(i),r.append(s),$("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}var Me={version:je,id:b,init:et,openPopup:Ze,closePopup:ge,switchPage:Xe,addMenuItem:ee,getStorage:()=>ye,getApiConnection:()=>E,getPresetManager:()=>ue,getUiComponents:()=>C,getRegexExtractor:()=>We,async getApiConfig(){return await K(),ye?ye.loadSettings().apiConfig:null},async saveApiConfig(e){return await K(),E?(E.updateApiConfig(e),!0):!1},async getPresets(){return await K(),ue?ue.getAllPresets():[]},async sendApiRequest(e,t){if(await K(),E)return E.sendApiRequest(e,t);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await K(),E?E.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}}};async function et(){if($(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${je}`),Et(),await K()){if($("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),C){let r=M.document||document,a=`${b}-ui-styles`;if(!r.getElementById(a)){let o=r.createElement("style");o.id=a,o.textContent=C.getStyles(),(r.head||r.documentElement).appendChild(o)}let s=`${b}-regex-styles`;if(!r.getElementById(s)&&C.getRegexStyles){let o=r.createElement("style");o.id=s,o.textContent=C.getRegexStyles(),(r.head||r.documentElement).appendChild(o)}}}else $("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let t=M.document||document;t.readyState==="loading"?t.addEventListener("DOMContentLoaded",()=>{setTimeout(ee,1e3)}):setTimeout(ee,1e3),$("\u521D\u59CB\u5316\u5B8C\u6210")}if(typeof window<"u"&&(window.YouYouToolkit=Me,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=Me}catch{}var Kt=Me;et();$("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210");export{Kt as default};
