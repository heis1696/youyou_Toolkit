var $t=Object.defineProperty;var X=(e,t)=>()=>(e&&(t=e(e=0)),t);var ee=(e,t)=>{for(var s in t)$t(e,s,{get:t[s],enumerable:!0})};var Xe={};ee(Xe,{DEFAULT_API_PRESETS:()=>Ve,DEFAULT_SETTINGS:()=>Te,STORAGE_KEYS:()=>O,deepMerge:()=>Pe,getCurrentPresetName:()=>H,loadApiPresets:()=>v,loadSettings:()=>m,saveApiPresets:()=>E,saveSettings:()=>k,setCurrentPresetName:()=>Q});function kt(){try{let e=typeof window.parent<"u"?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings}if(e.extension_settings)return e.extension_settings;let t=e.jQuery||window.jQuery;return null}catch(e){return console.warn("[YouYouToolkit] \u65E0\u6CD5\u83B7\u53D6SillyTavern extensionSettings:",e),null}}function qe(){try{let e=typeof window.parent<"u"?window.parent:window;if(typeof e.saveSettings=="function")return e.saveSettings;if(e.SillyTavern?.getContext){let t=e.SillyTavern.getContext();if(typeof t.saveSettings=="function")return t.saveSettings;if(typeof t.saveSettingsDebounced=="function")return t.saveSettingsDebounced}return null}catch{return null}}function J(){let e=kt(),t="youyou_toolkit";return e?(e[t]||(e[t]={}),{getItem:s=>{let r=e[t][s];return typeof r=="string"?r:r?JSON.stringify(r):null},setItem:(s,r)=>{e[t][s]=r;let n=qe();if(n)try{n()}catch(a){console.warn("[YouYouToolkit] \u4FDD\u5B58\u8BBE\u7F6E\u5931\u8D25:",a)}},removeItem:s=>{delete e[t][s];let r=qe();if(r)try{r()}catch{}},_isTavern:!0}):(console.warn("[YouYouToolkit] \u4F7F\u7528localStorage\u4F5C\u4E3A\u56DE\u9000\u5B58\u50A8"),{getItem:s=>{try{return localStorage.getItem(s)}catch{return null}},setItem:(s,r)=>{try{localStorage.setItem(s,r)}catch(n){console.error("[YouYouToolkit] localStorage\u5199\u5165\u5931\u8D25:",n)}},removeItem:s=>{try{localStorage.removeItem(s)}catch{}},_isTavern:!1})}function We(e,t=null){if(!e||typeof e!="string")return t;try{return JSON.parse(e)}catch{return t}}function Ze(e,t="{}"){try{return JSON.stringify(e)}catch{return t}}function m(){let t=J().getItem(O.SETTINGS);if(t){let s=We(t,null);if(s&&typeof s=="object")return Pe(JSON.parse(JSON.stringify(Te)),s)}return JSON.parse(JSON.stringify(Te))}function k(e){J().setItem(O.SETTINGS,Ze(e))}function v(){let t=J().getItem(O.API_PRESETS);if(t){let s=We(t,null);if(Array.isArray(s))return s}return JSON.parse(JSON.stringify(Ve))}function E(e){J().setItem(O.API_PRESETS,Ze(e))}function H(){return J().getItem(O.CURRENT_PRESET)||""}function Q(e){J().setItem(O.CURRENT_PRESET,e||"")}function Pe(e,t){let s=n=>n&&typeof n=="object"&&!Array.isArray(n),r={...e};return s(e)&&s(t)&&Object.keys(t).forEach(n=>{s(t[n])?n in e?r[n]=Pe(e[n],t[n]):Object.assign(r,{[n]:t[n]}):Object.assign(r,{[n]:t[n]})}),r}var O,Te,Ve,K=X(()=>{O={SETTINGS:"youyou_toolkit_settings",API_PRESETS:"youyou_toolkit_api_presets",CURRENT_PRESET:"youyou_toolkit_current_preset"},Te={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},Ve=[]});var tt={};ee(tt,{API_STATUS:()=>Ct,fetchAvailableModels:()=>Ae,getApiConfig:()=>D,getEffectiveApiConfig:()=>St,sendApiRequest:()=>et,testApiConnection:()=>Rt,updateApiConfig:()=>L,validateApiConfig:()=>oe});function D(){return m().apiConfig||{}}function L(e){let t=m();t.apiConfig={...t.apiConfig,...e},k(t)}function oe(e){let t=[];if(e.useMainApi)return{valid:!0,errors:[]};if(!e.url||!e.url.trim())t.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(e.url)}catch{t.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!e.model||!e.model.trim())&&t.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:t.length===0,errors:t}}function St(e=""){let t=m();if(e){let r=(t.apiPresets||[]).find(n=>n.name===e);if(r&&r.apiConfig)return{...r.apiConfig,presetName:r.name}}return t.apiConfig||{}}function Tt(e,t={}){let s=t.apiConfig||D();return{messages:e,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:!1,...t.extraParams}}async function et(e,t={},s=null){let r=t.apiConfig||D(),n=r.useMainApi,a=oe(r);if(!a.valid&&!n)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${a.errors.join(", ")}`);return n?await Pt(e,t,s):await At(e,r,t,s)}async function Pt(e,t,s){let r=typeof window.parent<"u"?window.parent:window;if(!r.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let n=await r.TavernHelper.generateRaw({ordered_prompts:e,should_stream:!1,...t.extraParams});if(typeof n!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return n.trim()}catch(n){throw n.name==="AbortError"?n:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${n.message}`)}}async function At(e,t,s,r){let n=Tt(e,{apiConfig:t,...s}),a={"Content-Type":"application/json"};t.apiKey&&(a.Authorization=`Bearer ${t.apiKey}`);let o=await fetch(t.url,{method:"POST",headers:a,body:JSON.stringify(n),signal:r});if(!o.ok){let u=await o.text().catch(()=>"Unknown error");throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${o.status}): ${u}`)}let c=await o.json(),p="";if(c.choices&&c.choices[0]?.message?.content)p=c.choices[0].message.content;else if(c.content)p=c.content;else if(c.text)p=c.text;else if(c.response)p=c.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(c).slice(0,200)}`);return p.trim()}async function Rt(e=null){let t=e||D(),s=Date.now();try{await et([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:t});let n=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${n}ms)`,latency:n}}catch(r){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${r.message}`,latency:Date.now()-s}}}async function Ae(e=null){let t=e||D();return t.useMainApi?await It():await Et(t)}async function It(){let e=typeof window.parent<"u"?window.parent:window;try{if(e.SillyTavern?.getContext){let t=e.SillyTavern.getContext();if(t.settings?.api_server)return[t.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function Et(e){if(!e.url||!e.apiKey)return[];try{let s=`${e.url.replace(/\/chat\/completions$/,"").replace(/\/completions$/,"")}/models`,r=await fetch(s,{method:"GET",headers:{Authorization:`Bearer ${e.apiKey}`}});if(!r.ok)return[];let n=await r.json();return n.data&&Array.isArray(n.data)?n.data.map(a=>a.id||a.name).filter(Boolean).sort():[]}catch{return[]}}var Ct,Re=X(()=>{K();Ct={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var st={};ee(st,{createPreset:()=>le,createPresetFromCurrentConfig:()=>jt,deletePreset:()=>se,duplicatePreset:()=>Yt,exportPresets:()=>Me,generateUniquePresetName:()=>je,getActiveConfig:()=>_e,getActivePresetName:()=>ye,getAllPresets:()=>ie,getPreset:()=>A,getPresetNames:()=>_t,getStarredPresets:()=>Ie,importPresets:()=>Ye,presetExists:()=>te,renamePreset:()=>Mt,switchToPreset:()=>Ee,togglePresetStar:()=>de,updatePreset:()=>ce,validatePreset:()=>zt});function ie(){return v()}function _t(){return v().map(t=>t.name)}function A(e){return!e||typeof e!="string"?null:v().find(s=>s.name===e)||null}function te(e){return!e||typeof e!="string"?!1:v().some(s=>s.name===e)}function le(e){let{name:t,description:s,apiConfig:r}=e;if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let n=t.trim();if(te(n))return{success:!1,message:`\u9884\u8BBE "${n}" \u5DF2\u5B58\u5728`};let a={name:n,description:s||"",apiConfig:{url:r?.url||"",apiKey:r?.apiKey||"",model:r?.model||"",useMainApi:r?.useMainApi??!0,max_tokens:r?.max_tokens||4096,temperature:r?.temperature??.7,top_p:r?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},o=v();return o.push(a),E(o),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:a}}function ce(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=v(),r=s.findIndex(o=>o.name===e);if(r===-1)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(t.name&&t.name!==e)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let n=s[r],a={...n,...t,name:n.name,updatedAt:Date.now()};return t.apiConfig&&(a.apiConfig={...n.apiConfig,...t.apiConfig}),s[r]=a,E(s),{success:!0,message:`\u9884\u8BBE "${e}" \u66F4\u65B0\u6210\u529F`,preset:a}}function se(e){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=v(),s=t.findIndex(r=>r.name===e);return s===-1?{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}:(t.splice(s,1),E(t),H()===e&&Q(""),{success:!0,message:`\u9884\u8BBE "${e}" \u5DF2\u5220\u9664`})}function Mt(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=t.trim();if(!te(e))return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(te(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let r=v(),n=r.find(a=>a.name===e);return n&&(n.name=s,n.updatedAt=Date.now(),E(r),H()===e&&Q(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function Yt(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=t.trim(),r=A(e);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(te(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(r)),name:s,createdAt:Date.now(),updatedAt:Date.now()},a=v();return a.push(n),E(a),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:n}}function de(e){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=v(),s=t.find(r=>r.name===e);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),E(t),{success:!0,message:s.starred?`\u5DF2\u5C06 "${e}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${e}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}}function Ie(){return v().filter(t=>t.starred===!0)}function Ee(e){if(!e)return Q(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let t=A(e);return t?(Q(e),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${e}"`,apiConfig:t.apiConfig}):{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}}function ye(){return H()}function _e(){let e=H();if(e){let s=A(e);if(s)return{presetName:e,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:m().apiConfig||{}}}function Me(e=null){if(e){let s=A(e);if(!s)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let t=v();return JSON.stringify(t,null,2)}function Ye(e,t={overwrite:!1}){let s;try{s=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let r=Array.isArray(s)?s:[s];if(r.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let n=v(),a=0;for(let o of r){if(!o.name||typeof o.name!="string"||!o.apiConfig||typeof o.apiConfig!="object")continue;let c=n.findIndex(p=>p.name===o.name);c>=0?t.overwrite&&(o.updatedAt=Date.now(),n[c]=o,a++):(o.createdAt=o.createdAt||Date.now(),o.updatedAt=Date.now(),n.push(o),a++)}return a>0&&E(n),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u9884\u8BBE`,imported:a}}function jt(e,t=""){let s=m();return le({name:e,description:t,apiConfig:s.apiConfig})}function zt(e){let t=[];return(!e.name||typeof e.name!="string"||!e.name.trim())&&t.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!e.apiConfig||typeof e.apiConfig!="object")&&t.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:t.length===0,errors:t}}function je(e){(!e||typeof e!="string")&&(e="\u65B0\u9884\u8BBE");let t=v(),s=new Set(t.map(n=>n.name));if(!s.has(e))return e;let r=1;for(;s.has(`${e} (${r})`);)r++;return`${e} (${r})`}var ze=X(()=>{K()});var gt={};ee(gt,{MESSAGE_MACROS:()=>ut,addTagRule:()=>G,createRuleTemplate:()=>lt,default:()=>Dt,deleteRulePreset:()=>yt,deleteRuleTemplate:()=>dt,deleteTagRule:()=>xe,escapeRegex:()=>N,exportRulesConfig:()=>we,extractComplexTag:()=>rt,extractCurlyBraceTag:()=>Ne,extractHtmlFormatTag:()=>at,extractSimpleTag:()=>Le,extractTagContent:()=>ue,generateTagSuggestions:()=>fe,getAllRulePresets:()=>ve,getAllRuleTemplates:()=>ot,getContentBlacklist:()=>ne,getRuleTemplate:()=>it,getTagRules:()=>U,importRulesConfig:()=>$e,isValidTagName:()=>De,loadRulePreset:()=>he,saveRulesAsPreset:()=>be,scanTextForTags:()=>ge,setContentBlacklist:()=>re,setTagRules:()=>me,shouldSkipContent:()=>Oe,testRegex:()=>pt,updateRuleTemplate:()=>ct,updateTagRule:()=>q});function pe(){let e=m();return h=e.ruleTemplates||[...nt],f=e.tagRules||[],C=e.contentBlacklist||[],{ruleTemplates:h,tagRules:f,contentBlacklist:C}}function N(e){return typeof e!="string"?"":e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Oe(e,t){if(!t||t.length===0||!e||typeof e!="string")return!1;let s=e.toLowerCase();return t.some(r=>{let n=r.trim().toLowerCase();return n&&s.includes(n)})}function De(e){return!e||typeof e!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(e)&&!Ot.includes(e.toLowerCase())}function Le(e,t){if(!e||!t)return[];let s=[],r=N(t),n=new RegExp(`<${r}>([\\s\\S]*?)<\\/${r}>`,"gi");[...e.matchAll(n)].forEach(p=>{p[1]&&s.push(p[1].trim())});let o=(e.match(new RegExp(`<${r}>`,"gi"))||[]).length,c=(e.match(new RegExp(`<\\/${r}>`,"gi"))||[]).length;return o>c&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${o-c} \u4E2A\u672A\u95ED\u5408\u7684 <${t}> \u6807\u7B7E`),s}function Ne(e,t){if(!e||!t)return[];let s=[],r=N(t),n=new RegExp(`\\{${r}\\|`,"gi"),a;for(;(a=n.exec(e))!==null;){let o=a.index,c=o+a[0].length,p=1,u=c;for(;u<e.length&&p>0;)e[u]==="{"?p++:e[u]==="}"&&p--,u++;if(p===0){let l=e.substring(c,u-1);l.trim()&&s.push(l.trim())}n.lastIndex=o+1}return s}function rt(e,t){if(!e||!t)return[];let s=t.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${t}`),[];let r=s[0].trim(),n=s[1].trim(),a=n.match(/<\/(\w+)>/);if(!a)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${n}`),[];let o=a[1],c=new RegExp(`${N(r)}([\\s\\S]*?)<\\/${o}>`,"gi"),p=[];return[...e.matchAll(c)].forEach(l=>{l[1]&&p.push(l[1].trim())}),p}function at(e,t){if(!e||!t)return[];let s=t.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${t}`),[];let r=s[1],n=[],a=new RegExp(`<${r}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${r}>`,"gi");[...e.matchAll(a)].forEach(u=>{u[1]&&n.push(u[1].trim())});let c=(e.match(new RegExp(`<${r}(?:\\s[^>]*)?>`,"gi"))||[]).length,p=(e.match(new RegExp(`<\\/${r}>`,"gi"))||[]).length;return c>p&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${c-p} \u4E2A\u672A\u95ED\u5408\u7684 <${r}> \u6807\u7B7E`),n}function ue(e,t,s=[]){if(!e)return"";if(!t||t.length===0)return e;let r=t.filter(l=>l.type==="exclude"&&l.enabled),n=t.filter(l=>(l.type==="include"||l.type==="regex_include")&&l.enabled),a=t.filter(l=>l.type==="regex_exclude"&&l.enabled),o=e;for(let l of r)try{let g=new RegExp(`<${N(l.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${N(l.value)}>`,"gi");o=o.replace(g,"")}catch(g){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:l,error:g})}let c=[];if(n.length>0)for(let l of n){let g=[];try{if(l.type==="include")g.push(...Le(o,l.value)),g.push(...Ne(o,l.value));else if(l.type==="regex_include"){let b=new RegExp(l.value,"gi");[...o.matchAll(b)].forEach(P=>{P[1]&&g.push(P[1])})}}catch(b){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:l,error:b})}g.forEach(b=>c.push(b.trim()))}else c.push(o);let p=[];for(let l of c){for(let g of a)try{let b=new RegExp(g.value,"gi");l=l.replace(b,"")}catch(b){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:g,error:b})}Oe(l,s)||p.push(l)}return p.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function ge(e,t={}){let s=performance.now(),{chunkSize:r=5e4,maxTags:n=100,timeoutMs:a=5e3}=t,o=new Set,c=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,p=0,u=0;for(let g=0;g<e.length;g+=r){let b=e.slice(g,Math.min(g+r,e.length));if(u++,p+=b.length,performance.now()-s>a){console.warn(`[YouYouToolkit] Tag scanning timed out after ${a}ms`);break}let T;for(;(T=c.exec(b))!==null&&o.size<n;){let P=(T[1]||T[2]).toLowerCase();De(P)&&o.add(P)}if(o.size>=n)break;u%5===0&&await new Promise(P=>setTimeout(P,0))}let l=performance.now();return{tags:Array.from(o).sort(),stats:{processingTimeMs:Math.round(l-s),processedChars:p,totalChars:e.length,chunkCount:u,tagsFound:o.size}}}function fe(e,t=25){let s=e.tags.slice(0,t);return{suggestions:s,stats:{totalFound:e.stats.tagsFound,finalCount:s.length}}}function ot(){return h.length===0&&pe(),h}function it(e){return h.find(t=>t.id===e)}function lt(e){let t={id:`rule-${Date.now()}`,name:e.name||"\u65B0\u89C4\u5219",description:e.description||"",type:e.type||"include",value:e.value||"",enabled:e.enabled!==!1,createdAt:new Date().toISOString()};return h.push(t),Ue(),{success:!0,template:t,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function ct(e,t){let s=h.findIndex(r=>r.id===e);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(h[s]={...h[s],...t,updatedAt:new Date().toISOString()},Ue(),{success:!0,template:h[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function dt(e){let t=h.findIndex(s=>s.id===e);return t===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(h.splice(t,1),Ue(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function Ue(){let e=m();e.ruleTemplates=h,k(e)}function U(){return f||pe(),f}function me(e){f=e||[];let t=m();t.tagRules=f,k(t)}function G(e){let t={id:`tag-${Date.now()}`,type:e.type||"include",value:e.value||"",enabled:e.enabled!==!1};f.push(t);let s=m();return s.tagRules=f,k(s),{success:!0,rule:t,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function q(e,t){if(e<0||e>=f.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};f[e]={...f[e],...t};let s=m();return s.tagRules=f,k(s),{success:!0,rule:f[e],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function xe(e){if(e<0||e>=f.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};f.splice(e,1);let t=m();return t.tagRules=f,k(t),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function ne(){return C||pe(),C}function re(e){C=e||[];let t=m();t.contentBlacklist=C,k(t)}function be(e,t=""){if(!e||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=m();s.tagRulePresets||(s.tagRulePresets={});let r=`preset-${Date.now()}`;return s.tagRulePresets[r]={id:r,name:e.trim(),description:t.trim(),rules:JSON.parse(JSON.stringify(f)),blacklist:JSON.parse(JSON.stringify(C)),createdAt:new Date().toISOString()},k(s),{success:!0,preset:s.tagRulePresets[r],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function ve(){let t=m().tagRulePresets||{};return Object.values(t)}function he(e){let t=m(),r=(t.tagRulePresets||{})[e];return r?(f=JSON.parse(JSON.stringify(r.rules||[])),C=JSON.parse(JSON.stringify(r.blacklist||[])),t.tagRules=f,t.contentBlacklist=C,k(t),{success:!0,preset:r,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function yt(e){let t=m(),s=t.tagRulePresets||{};return s[e]?(delete s[e],t.tagRulePresets=s,k(t),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function we(){return JSON.stringify({tagRules:f,contentBlacklist:C,ruleTemplates:h,tagRulePresets:m().tagRulePresets||{}},null,2)}function $e(e,t={overwrite:!0}){try{let s=JSON.parse(e);if(t.overwrite)f=s.tagRules||[],C=s.contentBlacklist||[],h=s.ruleTemplates||nt;else if(s.tagRules&&f.push(...s.tagRules),s.contentBlacklist){let n=new Set(C.map(a=>a.toLowerCase()));s.contentBlacklist.forEach(a=>{n.has(a.toLowerCase())||C.push(a)})}let r=m();return r.tagRules=f,r.contentBlacklist=C,r.ruleTemplates=h,s.tagRulePresets&&(r.tagRulePresets={...r.tagRulePresets||{},...s.tagRulePresets}),k(r),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function pt(e,t,s="g",r=0){try{if(!e||typeof e!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let n=new RegExp(e,s),a=[];if(s.includes("g")){let o;for(;(o=n.exec(t))!==null;)o.length>1?a.push({fullMatch:o[0],groups:o.slice(1),index:o.index,extracted:o[r]||o[1]||o[0]}):a.push({fullMatch:o[0],groups:[],index:o.index,extracted:o[0]})}else{let o=n.exec(t);o&&a.push({fullMatch:o[0],groups:o.length>1?o.slice(1):[],index:o.index,extracted:o.length>1?o[r]||o[1]:o[0]})}return{success:!0,matches:a,count:a.length,extracted:a.map(o=>o.extracted)}}catch(n){return{success:!1,error:n.message,matches:[]}}}var Ot,nt,h,f,C,ut,Dt,Be=X(()=>{K();Ot=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],nt=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],h=[],f=[],C=[];ut={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};pe();Dt={extractTagContent:ue,extractSimpleTag:Le,extractCurlyBraceTag:Ne,extractComplexTag:rt,extractHtmlFormatTag:at,escapeRegex:N,shouldSkipContent:Oe,isValidTagName:De,scanTextForTags:ge,generateTagSuggestions:fe,getAllRuleTemplates:ot,getRuleTemplate:it,createRuleTemplate:lt,updateRuleTemplate:ct,deleteRuleTemplate:dt,getTagRules:U,setTagRules:me,addTagRule:G,updateTagRule:q,deleteTagRule:xe,getContentBlacklist:ne,setContentBlacklist:re,saveRulesAsPreset:be,getAllRulePresets:ve,loadRulePreset:he,deleteRulePreset:yt,exportRulesConfig:we,importRulesConfig:$e,testRegex:pt,MESSAGE_MACROS:ut}});var ft={};ee(ft,{getCurrentTab:()=>Gt,getRegexStyles:()=>Kt,getStyles:()=>Bt,render:()=>M,renderRegex:()=>_,setCurrentTab:()=>qt});function x(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function d(e,t,s=3e3){let r=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(r.toastr){r.toastr[e](t,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}console.log(`[${e.toUpperCase()}] ${t}`)}function F(){if(V)return V;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return V=window.parent.jQuery,V}catch{}return window.jQuery&&(V=window.jQuery),V}function He(){return y&&y.length>0}function Lt(){let e=D(),t=_e(),s=ye(),r=ie(),o=Ie().slice(0,8),c=o.length>0?o.map(l=>`
        <div class="yyt-preset-item" data-preset-name="${x(l.name)}">
          <div class="yyt-preset-info">
            <div class="yyt-preset-name">${x(l.name)}</div>
            <div class="yyt-preset-meta">
              ${l.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${x(l.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
      `).join(""):"",p=R||s||"",u=p||"-- \u5F53\u524D\u914D\u7F6E --";return`
    <div class="yyt-panel">
      <!-- \u9884\u8BBE\u9009\u62E9\u533A -->
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-bookmark"></i>
          <span>\u9884\u8BBE\u9009\u62E9</span>
        </div>
        
        <div class="yyt-preset-selector">
          <!-- \u81EA\u5B9A\u4E49\u4E0B\u62C9\u6846 -->
          <div class="yyt-custom-select" id="${i}-preset-dropdown">
            <div class="yyt-select-trigger">
              <span class="yyt-select-value" data-value="${x(p)}">${x(u)}</span>
              <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
            </div>
            <div class="yyt-select-dropdown">
              <div class="yyt-select-option ${p?"":"yyt-selected"}" data-value="">
                <span class="yyt-option-star yyt-placeholder"></span>
                <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
              </div>
              ${r.length>0?r.map(l=>{let g=l.starred===!0,b=g?"yyt-option-star yyt-starred":"yyt-option-star",T=g?"\u2605":"\u2606";return`
                  <div class="yyt-select-option ${l.name===p?"yyt-selected":""}" data-value="${x(l.name)}">
                    <button class="${b}" data-preset="${x(l.name)}" title="${g?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${T}</button>
                    <span class="yyt-option-text">${x(l.name)}</span>
                  </div>
                `}).join(""):""}
            </div>
          </div>
          <button class="yyt-btn yyt-btn-primary" id="${i}-apply-preset">
            <i class="fa-solid fa-check"></i> \u5E94\u7528
          </button>
        </div>
        
        ${c?`
        <div class="yyt-preset-list-compact">
          ${c}
        </div>
        `:""}
      </div>
      
      <!-- API\u914D\u7F6E\u533A -->
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-sliders"></i>
          <span>API\u914D\u7F6E</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${i}-save-as-preset" style="margin-left: auto;">
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
              <input type="checkbox" id="${i}-use-main-api" ${e.useMainApi?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div id="${i}-custom-api-fields" class="${e.useMainApi?"yyt-disabled":""}">
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>API URL</label>
              <input type="text" class="yyt-input" id="${i}-api-url" 
                     value="${x(e.url||"")}" 
                     placeholder="https://api.openai.com/v1/chat/completions">
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>API Key</label>
              <div class="yyt-input-group">
                <input type="password" class="yyt-input" id="${i}-api-key" 
                       value="${x(e.apiKey||"")}" 
                       placeholder="sk-...">
                <button class="yyt-btn yyt-btn-icon" id="${i}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                  <i class="fa-solid fa-eye"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u6A21\u578B</label>
              <div class="yyt-model-row">
                <input type="text" class="yyt-input yyt-model-input" id="${i}-model" 
                       value="${x(e.model||"")}" 
                       placeholder="gpt-4">
                <select class="yyt-select yyt-model-select" id="${i}-model-select" style="display: none;">
                </select>
                <button class="yyt-btn yyt-btn-secondary yyt-model-btn" id="${i}-load-models" title="\u83B7\u53D6\u6A21\u578B\u5217\u8868">
                  <i class="fa-solid fa-sync-alt"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="yyt-form-row yyt-form-row-2col">
            <div class="yyt-form-group">
              <label>Max Tokens</label>
              <input type="number" class="yyt-input" id="${i}-max-tokens" 
                     value="${e.max_tokens||4096}" min="1" max="128000">
            </div>
            
            <div class="yyt-form-group">
              <label>Temperature</label>
              <input type="number" class="yyt-input" id="${i}-temperature" 
                     value="${e.temperature??.7}" min="0" max="2" step="0.1">
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>Top P</label>
              <input type="number" class="yyt-input" id="${i}-top-p" 
                     value="${e.top_p??.9}" min="0" max="1" step="0.1">
            </div>
          </div>
        </div>
      </div>
      
      <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
      <div class="yyt-panel-footer">
        <div class="yyt-footer-left">
          <button class="yyt-btn yyt-btn-secondary" id="${i}-import-presets">
            <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${i}-export-presets">
            <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
          </button>
          <input type="file" id="${i}-import-file" accept=".json" style="display:none">
        </div>
        <div class="yyt-footer-right">
          <button class="yyt-btn yyt-btn-secondary" id="${i}-reset-api-config">
            <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
          </button>
          <button class="yyt-btn yyt-btn-primary" id="${i}-save-api-config">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
          </button>
        </div>
      </div>
    </div>
  `}function Nt(e=null){let t=F();if(!t)return;let r=ie().map(l=>l.name),n=e||je("\u65B0\u9884\u8BBE"),a=`
    <div class="yyt-dialog-overlay" id="${i}-dialog-overlay">
      <div class="yyt-dialog">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${e?"\u7F16\u8F91\u9884\u8BBE":"\u4FDD\u5B58\u4E3A\u65B0\u9884\u8BBE"}</span>
          <button class="yyt-dialog-close" id="${i}-dialog-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body">
          <div class="yyt-form-group">
            <label>\u9884\u8BBE\u540D\u79F0</label>
            <input type="text" class="yyt-input" id="${i}-dialog-preset-name" 
                   value="${x(n)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
          </div>
          <div class="yyt-form-group">
            <label>\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09</label>
            <textarea class="yyt-textarea" id="${i}-dialog-preset-desc" rows="2" 
                      placeholder="\u9884\u8BBE\u63CF\u8FF0..."></textarea>
          </div>
        </div>
        <div class="yyt-dialog-footer">
          <button class="yyt-btn yyt-btn-secondary" id="${i}-dialog-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${i}-dialog-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `;t(`#${i}-dialog-overlay`).remove(),y.append(a);let o=t(`#${i}-dialog-overlay`),c=t(`#${i}-dialog-preset-name`),p=t(`#${i}-dialog-preset-desc`);if(c.focus().select(),e){let l=A(e);l&&l.description&&p.val(l.description)}let u=()=>{o.remove()};o.find(`#${i}-dialog-close, #${i}-dialog-cancel`).on("click",u),o.on("click",function(l){l.target===this&&u()}),o.find(`#${i}-dialog-save`).on("click",function(){let l=c.val().trim(),g=p.val().trim();if(!l){d("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),c.focus();return}if(r.includes(l)&&l!==e){if(!confirm(`\u9884\u8BBE "${l}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;se(l)}e&&l!==e&&se(e);let b=Je(),T=le({name:l,description:g,apiConfig:b});T.success?(d("success",T.message),u(),M()):d("error",T.message)}),c.on("keypress",function(l){l.which===13&&o.find(`#${i}-dialog-save`).click()})}function Ut(){let e=F();if(!e||!He()){console.warn("[YouYouToolkit] bindEvents: jQuery\u6216\u5BB9\u5668\u4E0D\u53EF\u7528");return}let t=y.find(`#${i}-preset-dropdown`),s=t.find(".yyt-select-trigger"),r=t.find(".yyt-select-value");s.on("click",function(n){n.stopPropagation(),t.toggleClass("yyt-open")}),t.find(".yyt-select-option").on("click",function(n){if(e(n.target).hasClass("yyt-option-star"))return;let a=e(this).data("value"),o=e(this).find(".yyt-option-text").text();if(r.text(o).data("value",a),t.find(".yyt-select-option").removeClass("yyt-selected"),e(this).addClass("yyt-selected"),t.removeClass("yyt-open"),a){let c=A(a);c&&Fe(c.apiConfig)}}),t.find(".yyt-option-star").on("click",function(n){n.preventDefault(),n.stopPropagation();let a=e(this).data("preset");if(!a)return;let o=de(a);o.success?(d("success",o.message),M()):d("error",o.message)}),e(document).on("click.yyt-dropdown",function(n){e(n.target).closest(t).length||t.removeClass("yyt-open")}),y.find(".yyt-star-btn").on("click",function(n){n.preventDefault(),n.stopPropagation();let a=e(this).data("preset");if(!a)return;let o=de(a);o.success?(d("success",o.message),M()):d("error",o.message)}),y.find(`#${i}-apply-preset`).on("click",function(){let n=t.find(".yyt-select-value").data("value");if(!n){Ee(""),R="",y.find(".yyt-preset-item").removeClass("yyt-loaded"),d("info","\u5DF2\u5207\u6362\u5230\u5F53\u524D\u914D\u7F6E"),M();return}let a=A(n);a?(Fe(a.apiConfig),R=n,y.find(".yyt-preset-item").removeClass("yyt-loaded"),y.find(`.yyt-preset-item[data-preset-name="${n}"]`).addClass("yyt-loaded"),d("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${n}"`)):d("error",`\u9884\u8BBE "${n}" \u4E0D\u5B58\u5728`)}),y.find(".yyt-preset-item").on("click",function(n){let a=e(this),o=a.data("preset-name"),c=e(n.target).closest("[data-action]").data("action");if(c)switch(n.stopPropagation(),c){case"load":let p=A(o);p&&(Fe(p.apiConfig),R=o,y.find(`#${i}-preset-select`).val(o),y.find(".yyt-preset-item").removeClass("yyt-loaded"),a.addClass("yyt-loaded"),d("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${o}"\uFF0C\u4FEE\u6539\u540E\u53EF\u70B9\u51FB"\u4FDD\u5B58\u914D\u7F6E"\u8986\u76D6\u6B64\u9884\u8BBE`));break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${o}" \u5417\uFF1F`)){let u=se(o);d(u.success?"info":"error",u.message),u.success&&(R===o&&(R=""),M())}break}}),y.find(`#${i}-use-main-api`).on("change",function(){let n=e(this).is(":checked"),a=y.find(`#${i}-custom-api-fields`);n?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),y.find(`#${i}-toggle-key-visibility`).on("click",function(){let n=y.find(`#${i}-api-key`),a=n.attr("type");n.attr("type",a==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),y.find(`#${i}-load-models`).on("click",async function(){let n=e(this),a=y.find(`#${i}-model`),o=y.find(`#${i}-model-select`);n.prop("disabled",!0).find("i").addClass("fa-spin");try{let c=Je(),p=await Ae(c);if(p.length>0){o.empty(),p.forEach(l=>{o.append(`<option value="${x(l)}">${x(l)}</option>`)}),a.hide(),o.show();let u=a.val();u&&p.includes(u)&&o.val(u),o.off("change").on("change",function(){a.val(e(this).val())}),d("success",`\u5DF2\u52A0\u8F7D ${p.length} \u4E2A\u6A21\u578B`)}else d("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(c){d("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${c.message}`)}finally{n.prop("disabled",!1).find("i").removeClass("fa-spin")}}),y.find(`#${i}-model`).on("focus",function(){let n=y.find(`#${i}-model-select`);e(this).show(),n.hide()}),y.find(`#${i}-save-api-config`).on("click",function(){let n=Je(),a=oe(n);if(!a.valid&&!n.useMainApi){d("error",a.errors.join(", "));return}if(R){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${R}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E`)){L(n),d("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58");return}L(n);let c=ce(R,{apiConfig:n});c.success?(d("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${R}"`),M()):d("error",c.message);return}let o=ye();if(o){L(n),ce(o,{apiConfig:n}),d("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58");return}L(n),d("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),y.find(`#${i}-reset-api-config`).on("click",function(){confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")&&(L({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9}),M(),d("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E"))}),y.find(`#${i}-save-as-preset`).on("click",function(){Nt()}),y.find(`#${i}-export-presets`).on("click",function(){try{let n=Me(),a=new Blob([n],{type:"application/json"}),o=URL.createObjectURL(a),c=document.createElement("a");c.href=o,c.download=`youyou_toolkit_presets_${Date.now()}.json`,c.click(),URL.revokeObjectURL(o),d("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(n){d("error",`\u5BFC\u51FA\u5931\u8D25: ${n.message}`)}}),y.find(`#${i}-import-presets`).on("click",function(){y.find(`#${i}-import-file`).click()}),y.find(`#${i}-import-file`).on("change",async function(n){let a=n.target.files[0];if(a){try{let o=await a.text(),c=Ye(o,{overwrite:!0});d(c.success?"success":"error",c.message),c.imported>0&&M()}catch(o){d("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(this).val("")}})}function Je(){if(!F()||!He())return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let t=y.find(`#${i}-model`).val()?.trim()||"",s=y.find(`#${i}-model-select`);return s.is(":visible")&&(t=s.val()||t),{url:y.find(`#${i}-api-url`).val()?.trim()||"",apiKey:y.find(`#${i}-api-key`).val()||"",model:t,useMainApi:y.find(`#${i}-use-main-api`).is(":checked"),max_tokens:parseInt(y.find(`#${i}-max-tokens`).val())||4096,temperature:parseFloat(y.find(`#${i}-temperature`).val())??.7,top_p:parseFloat(y.find(`#${i}-top-p`).val())??.9}}function Fe(e){if(!F()||!He()||!e)return;y.find(`#${i}-api-url`).val(e.url||""),y.find(`#${i}-api-key`).val(e.apiKey||""),y.find(`#${i}-model`).val(e.model||""),y.find(`#${i}-max-tokens`).val(e.max_tokens||4096),y.find(`#${i}-temperature`).val(e.temperature??.7),y.find(`#${i}-top-p`).val(e.top_p??.9);let s=e.useMainApi??!0;y.find(`#${i}-use-main-api`).prop("checked",s);let n=y.find(`#${i}-custom-api-fields`);s?n.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):n.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),y.find(`#${i}-model`).show(),y.find(`#${i}-model-select`).hide()}function M(e){let t=F();if(!t){console.error("[YouYouToolkit] jQuery not available");return}if(e&&(typeof e=="string"?y=t(e):e&&e.jquery?y=e:e&&(y=t(e))),!y||!y.length){console.error("[YouYouToolkit] Container not found or invalid");return}let s=`<div class="yyt-api-manager">${Lt()}</div>`;y.html(s),Ut()}function Bt(){return`
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
    
    /* \u81EA\u5B9A\u4E49\u4E0B\u62C9\u6846 */
    .yyt-custom-select {
      position: relative;
      flex: 1;
      min-width: 0;
    }
    
    .yyt-select-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius-sm);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
      color: var(--yyt-text);
      font-size: 13px;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    
    .yyt-select-trigger:hover {
      border-color: rgba(255, 255, 255, 0.2);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
    }
    
    .yyt-custom-select.yyt-open .yyt-select-trigger {
      border-color: var(--yyt-accent);
      box-shadow: 0 0 0 3px var(--yyt-accent-soft), inset 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    
    .yyt-select-value {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .yyt-select-arrow {
      color: var(--yyt-text-muted);
      transition: transform 0.2s ease;
      margin-left: 8px;
    }
    
    .yyt-custom-select.yyt-open .yyt-select-arrow {
      transform: rotate(180deg);
    }
    
    .yyt-select-dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      max-height: 0;
      overflow: hidden;
      background: linear-gradient(180deg, rgba(20, 20, 35, 0.98) 0%, rgba(15, 15, 28, 0.98) 100%);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius-sm);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      z-index: 1000;
      opacity: 0;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .yyt-custom-select.yyt-open .yyt-select-dropdown {
      max-height: 300px;
      overflow-y: auto;
      opacity: 1;
    }
    
    .yyt-select-option {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      cursor: pointer;
      transition: background 0.15s ease;
    }
    
    .yyt-select-option:hover {
      background: rgba(123, 183, 255, 0.1);
    }
    
    .yyt-select-option.yyt-selected {
      background: rgba(123, 183, 255, 0.15);
    }
    
    .yyt-option-star {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 24px;
      border: none;
      border-radius: 4px;
      background: transparent;
      color: var(--yyt-text-muted);
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    
    .yyt-option-star.yyt-placeholder {
      width: 28px;
      visibility: hidden;
    }
    
    .yyt-option-star:hover {
      color: var(--yyt-accent);
      background: rgba(123, 183, 255, 0.1);
    }
    
    .yyt-option-star.yyt-starred {
      color: #fbbf24;
    }
    
    .yyt-option-star.yyt-starred:hover {
      color: #fcd34d;
      background: rgba(251, 191, 36, 0.15);
    }
    
    .yyt-option-text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--yyt-text);
      font-size: 13px;
    }
    
    /* \u9884\u8BBE\u5217\u8868 - \u7D27\u51D1\u6837\u5F0F */
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
  `}function Ft(){let e=U(),t=ne(),s=ve(),r=e.length>0?e.map((a,o)=>`
        <div class="yyt-rule-item" data-rule-index="${o}">
          <select class="yyt-select yyt-rule-type" style="flex: 2; min-width: 100px;">
            <option value="include" ${a.type==="include"?"selected":""}>\u5305\u542B</option>
            <option value="regex_include" ${a.type==="regex_include"?"selected":""}>\u6B63\u5219\u5305\u542B</option>
            <option value="exclude" ${a.type==="exclude"?"selected":""}>\u6392\u9664</option>
            <option value="regex_exclude" ${a.type==="regex_exclude"?"selected":""}>\u6B63\u5219\u6392\u9664</option>
          </select>
          <input type="text" class="yyt-input yyt-rule-value" style="flex: 5;" 
                 placeholder="\u6807\u7B7E\u540D\u6216\u6B63\u5219\u8868\u8FBE\u5F0F" 
                 value="${x(a.value||"")}">
          <label class="yyt-checkbox-label yyt-rule-enabled-label">
            <input type="checkbox" class="yyt-rule-enabled" ${a.enabled?"checked":""}>
            <span>\u542F\u7528</span>
          </label>
          <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-btn-danger yyt-rule-delete" title="\u5220\u9664\u89C4\u5219">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',n=s.length>0?s.map(a=>`<option value="${a.id}">${x(a.name)}</option>`).join(""):"";return`
    <div class="yyt-tag-rules-editor">
      ${n?`
      <div class="yyt-form-row">
        <select class="yyt-select yyt-flex-1" id="${i}-rule-preset-select">
          <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
          ${n}
        </select>
        <button class="yyt-btn yyt-btn-secondary" id="${i}-load-rule-preset">
          <i class="fa-solid fa-download"></i> \u52A0\u8F7D
        </button>
        <button class="yyt-btn yyt-btn-secondary" id="${i}-save-rule-preset">
          <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u9884\u8BBE
        </button>
      </div>
      `:`
      <div class="yyt-form-row">
        <button class="yyt-btn yyt-btn-secondary" id="${i}-save-rule-preset">
          <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
        </button>
      </div>
      `}
      
      <div class="yyt-rules-list">
        ${r}
      </div>
      
      <div class="yyt-form-row">
        <button class="yyt-btn yyt-btn-primary" id="${i}-add-rule">
          <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u89C4\u5219
        </button>
        <button class="yyt-btn yyt-btn-secondary" id="${i}-scan-tags">
          <i class="fa-solid fa-search"></i> \u626B\u63CF\u6807\u7B7E
        </button>
        <button class="yyt-btn yyt-btn-secondary" id="${i}-add-exclude-cot">
          <i class="fa-solid fa-ban"></i> \u6392\u9664\u5C0FCoT
        </button>
      </div>
      
      <!-- \u9ED1\u540D\u5355\u8BBE\u7F6E -->
      <div class="yyt-form-group">
        <label>\u5185\u5BB9\u9ED1\u540D\u5355\uFF08\u5305\u542B\u8FD9\u4E9B\u5173\u952E\u8BCD\u7684\u5185\u5BB9\u5C06\u88AB\u8FC7\u6EE4\uFF0C\u7528\u9017\u53F7\u5206\u9694\uFF09</label>
        <input type="text" class="yyt-input" id="${i}-content-blacklist" 
               value="${x(t.join(", "))}" 
               placeholder="\u5173\u952E\u8BCD1, \u5173\u952E\u8BCD2, ...">
      </div>
    </div>
  `}function Jt(){return`
    <div class="yyt-test-section">
      <div class="yyt-form-group">
        <label>\u6D4B\u8BD5\u6587\u672C</label>
        <textarea class="yyt-textarea" id="${i}-test-input" rows="6" 
                  placeholder="\u8F93\u5165\u8981\u6D4B\u8BD5\u63D0\u53D6\u7684\u6587\u672C\u5185\u5BB9..."></textarea>
      </div>
      
      <div class="yyt-form-row">
        <button class="yyt-btn yyt-btn-primary" id="${i}-test-extract">
          <i class="fa-solid fa-play"></i> \u6D4B\u8BD5\u63D0\u53D6
        </button>
        <button class="yyt-btn yyt-btn-secondary" id="${i}-test-clear">
          <i class="fa-solid fa-eraser"></i> \u6E05\u7A7A
        </button>
      </div>
      
      <div class="yyt-form-group" id="${i}-test-result-container" style="display: none;">
        <label>\u63D0\u53D6\u7ED3\u679C</label>
        <div class="yyt-test-result" id="${i}-test-result"></div>
      </div>
    </div>
  `}function Ht(){return`
    <div class="yyt-regex-panel">
      <!-- \u89C4\u5219\u7F16\u8F91\u533A -->
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-filter"></i>
          <span>\u6807\u7B7E\u63D0\u53D6\u89C4\u5219</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${i}-show-examples" style="margin-left: auto;">
            <i class="fa-solid fa-lightbulb"></i> \u67E5\u770B\u793A\u4F8B
          </button>
        </div>
        
        ${Ft()}
      </div>
      
      <!-- \u6D4B\u8BD5\u533A -->
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-flask"></i>
          <span>\u6D4B\u8BD5\u63D0\u53D6</span>
        </div>
        
        ${Jt()}
      </div>
      
      <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
      <div class="yyt-panel-footer">
        <div class="yyt-footer-left">
          <button class="yyt-btn yyt-btn-secondary" id="${i}-import-rules">
            <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${i}-export-rules">
            <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
          </button>
          <input type="file" id="${i}-import-rules-file" accept=".json" style="display:none">
        </div>
        <div class="yyt-footer-right">
          <button class="yyt-btn yyt-btn-secondary" id="${i}-reset-rules">
            <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
          </button>
        </div>
      </div>
      
      <!-- \u6807\u7B7E\u626B\u63CF\u7ED3\u679C\u5BB9\u5668 -->
      <div id="${i}-tag-suggestions-container" style="display: none;">
        <div class="yyt-tag-suggestions">
          <div class="yyt-tag-suggestions-header">
            <span>\u53D1\u73B0\u7684\u6807\u7B7E:</span>
            <span id="${i}-tag-scan-stats"></span>
          </div>
          <div class="yyt-tag-list" id="${i}-tag-list"></div>
        </div>
      </div>
    </div>
  `}function Qt(){let e=F();if(!e)return;let t=B||y;!t||!t.length||(t.find(".yyt-rule-type").on("change",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),n=e(this).val();q(r,{type:n}),d("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),t.find(".yyt-rule-value").on("change",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),n=e(this).val().trim();q(r,{value:n})}),t.find(".yyt-rule-enabled").on("change",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),n=e(this).is(":checked");q(r,{enabled:n}),d("info",n?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),t.find(".yyt-rule-delete").on("click",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(xe(r),_(t),d("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.find(`#${i}-add-rule`).on("click",function(){G({type:"include",value:"",enabled:!0}),_(t),d("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),t.find(`#${i}-scan-tags`).on("click",async function(){let s=e(this),r=t.find(`#${i}-test-input`).val();if(!r||!r.trim()){d("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let n=await ge(r,{maxTags:50,timeoutMs:3e3}),{suggestions:a,stats:o}=fe(n,25);if(a.length===0){d("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),t.find(`#${i}-tag-suggestions-container`).hide();return}let c=t.find(`#${i}-tag-suggestions-container`),p=t.find(`#${i}-tag-list`);t.find(`#${i}-tag-scan-stats`).text(`${o.finalCount}/${o.totalFound} \u4E2A\u6807\u7B7E, ${n.stats.processingTimeMs}ms`),p.empty(),a.forEach(l=>{let g=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${x(l)}</button>`);g.on("click",function(){if(U().some(P=>P.type==="include"&&P.value===l)){d("warning",`\u89C4\u5219 "\u5305\u542B: ${l}" \u5DF2\u5B58\u5728`);return}G({type:"include",value:l,enabled:!0}),_(t),d("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${l}"`)}),p.append(g)}),c.show(),d("success",`\u53D1\u73B0 ${a.length} \u4E2A\u6807\u7B7E`)}catch(n){d("error",`\u626B\u63CF\u5931\u8D25: ${n.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${i}-add-exclude-cot`).on("click",function(){let s=U(),r="<!--[\\s\\S]*?-->";if(s.some(a=>a.type==="regex_exclude"&&a.value===r)){d("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}G({type:"regex_exclude",value:r,enabled:!0}),_(t),d("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),t.find(`#${i}-content-blacklist`).on("change",function(){let r=e(this).val().split(",").map(n=>n.trim()).filter(n=>n);re(r),d("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${r.length} \u4E2A\u5173\u952E\u8BCD`)}),t.find(`#${i}-load-rule-preset`).on("click",function(){let s=t.find(`#${i}-rule-preset-select`).val();if(!s){d("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let r=he(s);r.success?(_(t),d("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${r.preset.name}`)):d("error",r.message)}),t.find(`#${i}-save-rule-preset`).on("click",function(){let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let r=be(s.trim());r.success?(_(t),d("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):d("error",r.message)}),t.find(`#${i}-test-extract`).on("click",function(){let s=t.find(`#${i}-test-input`).val();if(!s||!s.trim()){d("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let r=U(),n=ne(),a=ue(s,r,n),o=t.find(`#${i}-test-result-container`),c=t.find(`#${i}-test-result`);o.show(),!a||!a.trim()?(c.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),d("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(c.html(`<pre class="yyt-code-block">${x(a)}</pre>`),d("success","\u63D0\u53D6\u5B8C\u6210"))}),t.find(`#${i}-test-clear`).on("click",function(){t.find(`#${i}-test-input`).val(""),t.find(`#${i}-test-result-container`).hide()}),t.find(`#${i}-import-rules`).on("click",function(){t.find(`#${i}-import-rules-file`).click()}),t.find(`#${i}-import-rules-file`).on("change",async function(s){let r=s.target.files[0];if(r){try{let n=await r.text(),a=$e(n,{overwrite:!0});a.success?(_(t),d("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):d("error",a.message)}catch(n){d("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}e(this).val("")}}),t.find(`#${i}-export-rules`).on("click",function(){try{let s=we(),r=new Blob([s],{type:"application/json"}),n=URL.createObjectURL(r),a=document.createElement("a");a.href=n,a.download=`youyou_toolkit_rules_${Date.now()}.json`,a.click(),URL.revokeObjectURL(n),d("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){d("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${i}-reset-rules`).on("click",function(){confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(me([]),re([]),_(t),d("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))}),t.find(`#${i}-show-examples`).on("click",function(){alert(`
\u89C4\u5219\u7C7B\u578B\u8BF4\u660E:

1. \u3010\u5305\u542B\u3011include
   - \u7B80\u5355\u6807\u7B7E\u540D\u63D0\u53D6
   - \u540C\u65F6\u5339\u914D <tag>\u5185\u5BB9</tag> \u548C {tag|\u5185\u5BB9}
   - \u793A\u4F8B\u503C: content, thinking, story

2. \u3010\u6B63\u5219\u5305\u542B\u3011regex_include
   - \u4F7F\u7528\u6B63\u5219\u8868\u8FBE\u5F0F\u63D0\u53D6
   - \u5FC5\u987B\u5305\u542B\u6355\u83B7\u7EC4 ()
   - \u7CFB\u7EDF\u63D0\u53D6\u7B2C\u4E00\u4E2A\u6355\u83B7\u7EC4\u7684\u5185\u5BB9
   - \u793A\u4F8B: <details[^>]*>([\\s\\S]*?)</details>

3. \u3010\u6392\u9664\u3011exclude
   - \u5757\u7EA7\u6392\u9664\uFF0C\u79FB\u9664\u6574\u4E2A\u6807\u7B7E\u5757
   - \u5728\u63D0\u53D6\u4E4B\u524D\u6267\u884C
   - \u793A\u4F8B\u503C: thinking, analysis

4. \u3010\u6B63\u5219\u6392\u9664\u3011regex_exclude
   - \u5BF9\u5DF2\u63D0\u53D6\u7684\u5185\u5BB9\u8FDB\u884C\u6E05\u7406
   - \u79FB\u9664\u5339\u914D\u7684\u5185\u5BB9
   - \u793A\u4F8B: <!--[\\s\\S]*?--> (\u79FB\u9664HTML\u6CE8\u91CA)

\u5904\u7406\u987A\u5E8F:
Phase 1: \u6267\u884C\u3010\u6392\u9664\u3011\u89C4\u5219\uFF0C\u79FB\u9664\u4E0D\u9700\u8981\u7684\u6807\u7B7E\u5757
Phase 2: \u6267\u884C\u3010\u5305\u542B\u3011\u548C\u3010\u6B63\u5219\u5305\u542B\u3011\u89C4\u5219\uFF0C\u63D0\u53D6\u5185\u5BB9
Phase 3: \u6267\u884C\u3010\u6B63\u5219\u6392\u9664\u3011\u89C4\u5219\uFF0C\u6E05\u7406\u63D0\u53D6\u7684\u5185\u5BB9
Phase 4: \u5E94\u7528\u9ED1\u540D\u5355\u8FC7\u6EE4

\u5E38\u7528\u89C4\u5219\u793A\u4F8B:
\u2022 \u6392\u9664\u601D\u8003\u8FC7\u7A0B: \u7C7B\u578B=\u6392\u9664, \u503C=thinking
\u2022 \u63D0\u53D6\u5185\u5BB9\u6807\u7B7E: \u7C7B\u578B=\u5305\u542B, \u503C=content
\u2022 \u6392\u9664HTML\u6CE8\u91CA: \u7C7B\u578B=\u6B63\u5219\u6392\u9664, \u503C=<!--[\\s\\S]*?-->
\u2022 \u63D0\u53D6\u82B1\u62EC\u53F7\u5185\u5BB9: \u7C7B\u578B=\u5305\u542B, \u503C=story
    `)}))}function _(e){let t=F();if(!t){console.error("[YouYouToolkit] jQuery not available");return}if(e&&(typeof e=="string"?B=t(e):e&&e.jquery?B=e:e&&(B=t(e))),!B||!B.length){console.error("[YouYouToolkit] Regex container not found");return}let s=Ht();B.html(s),Qt()}function Kt(){return`
    /* \u6B63\u5219\u63D0\u53D6\u9762\u677F\u6837\u5F0F */
    .yyt-regex-panel {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    /* \u89C4\u5219\u7F16\u8F91\u5668\u6837\u5F0F */
    .yyt-tag-rules-editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .yyt-rules-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 250px;
      overflow-y: auto;
      padding-right: 4px;
    }
    
    .yyt-rule-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius-sm);
      transition: all 0.2s ease;
    }
    
    .yyt-rule-item:hover {
      background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
      border-color: rgba(255, 255, 255, 0.12);
    }
    
    .yyt-rule-enabled-label {
      flex-shrink: 0;
      white-space: nowrap;
    }
    
    /* \u6807\u7B7E\u5EFA\u8BAE\u533A\u57DF */
    .yyt-tag-suggestions {
      margin-top: 12px;
      padding: 12px;
      background: linear-gradient(135deg, rgba(74, 222, 128, 0.08) 0%, rgba(74, 222, 128, 0.02) 100%);
      border: 1px solid rgba(74, 222, 128, 0.2);
      border-radius: var(--yyt-radius-sm);
    }
    
    .yyt-tag-suggestions-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-size: 12px;
      font-weight: 600;
      color: var(--yyt-text-secondary);
    }
    
    .yyt-tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    
    .yyt-tag-list .yyt-btn {
      cursor: pointer;
    }
    
    .yyt-tag-list .yyt-btn:hover {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.2) 0%, rgba(123, 183, 255, 0.1) 100%);
      border-color: rgba(123, 183, 255, 0.4);
    }
    
    /* \u6D4B\u8BD5\u533A\u57DF */
    .yyt-test-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .yyt-test-result {
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid var(--yyt-border);
      border-radius: var(--yyt-radius-sm);
      padding: 14px;
      max-height: 300px;
      overflow-y: auto;
    }
    
    /* \u6A21\u677F\u5217\u8868\u6837\u5F0F */
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
      max-height: 200px;
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
  `}function Gt(){return"main"}function qt(e){}var i,y,V,R,B,mt=X(()=>{Re();ze();K();Be();i="youyou_toolkit";y=null,V=null,R="";B=null});var $="youyou_toolkit",Ge="0.3.0",W=`${$}-menu-item`,Qe=`${$}-menu-container`,Vt=`${$}-popup`,z=typeof window.parent<"u"?window.parent:window,ke=null,Y=null,Ce=null,I=null,xt=null;async function Z(){try{return ke=await Promise.resolve().then(()=>(K(),Xe)),Y=await Promise.resolve().then(()=>(Re(),tt)),Ce=await Promise.resolve().then(()=>(ze(),st)),I=await Promise.resolve().then(()=>(mt(),ft)),xt=await Promise.resolve().then(()=>(Be(),gt)),!0}catch(e){return console.warn(`[${$}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,e),!1}}function S(...e){console.log(`[${$}]`,...e)}function bt(...e){console.error(`[${$}]`,...e)}function Wt(){let e=`${$}-styles`,t=z.document||document;if(t.getElementById(e))return;let s=`
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
    #${Qe} {
      display: flex;
      align-items: center;
    }
    
    #${W} {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      border-radius: 8px;
      margin: 2px;
    }
    
    #${W}:hover {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
    }
    
    #${W} .fa-fw {
      font-size: 16px;
      color: var(--yyt-accent);
      filter: drop-shadow(0 0 6px var(--yyt-accent-glow));
      transition: transform 0.2s ease;
    }
    
    #${W}:hover .fa-fw {
      transform: scale(1.1);
    }
    
    #${W} span {
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
  `,r=t.createElement("style");r.id=e,r.textContent=s,(t.head||t.documentElement).appendChild(r),S("\u6837\u5F0F\u5DF2\u6CE8\u5165")}var w=null,j=null,Zt="welcome";function Se(){w&&(w.remove(),w=null),j&&(j.remove(),j=null),S("\u5F39\u7A97\u5DF2\u5173\u95ED")}function vt(e){Zt=e;let t=z.jQuery||window.jQuery;if(!(!t||!w)){if(t(w).find(".yyt-nav-item").removeClass("active"),t(w).find(`.yyt-nav-item[data-page="${e}"]`).addClass("active"),t(w).find(".yyt-page").removeClass("active"),t(w).find(`.yyt-page[data-page="${e}"]`).addClass("active"),e==="api"&&I){let s=t(w).find("#youyou_toolkit-api-container");s.length&&I.render(s)}if(e==="regex"&&I){let s=t(w).find("#youyou_toolkit-regex-container");s.length&&I.renderRegex(s)}}}function ht(){if(w){S("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let e=z.jQuery||window.jQuery,t=z.document||document;if(!e){bt("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}j=t.createElement("div"),j.className="yyt-popup-overlay",j.addEventListener("click",n=>{n.target===j&&Se()}),t.body.appendChild(j);let s=`
    <div class="yyt-popup" id="${Vt}">
      <div class="yyt-popup-header">
        <div class="yyt-popup-title">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span>YouYou \u5DE5\u5177\u7BB1</span>
          <span style="font-size: 12px; opacity: 0.6;">v${Ge}</span>
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
              \u63D2\u4EF6ID: ${$}
            </div>
          </div>
        </div>
        
        <div class="yyt-page" data-page="api">
          <div id="${$}-api-container"></div>
        </div>
        
        <div class="yyt-page" data-page="regex">
          <div id="${$}-regex-container"></div>
        </div>
      </div>
      
      <div class="yyt-popup-footer">
        <button class="yyt-btn yyt-btn-secondary" id="${$}-close-btn">\u5173\u95ED</button>
      </div>
    </div>
  `,r=t.createElement("div");r.innerHTML=s,w=r.firstElementChild,t.body.appendChild(w),e(w).find(".yyt-popup-close").on("click",Se),e(w).find(`#${$}-close-btn`).on("click",Se),e(w).find(".yyt-nav-item").on("click",function(){let n=e(this).data("page");n&&vt(n)}),S("\u5F39\u7A97\u5DF2\u6253\u5F00")}function ae(){let e=z.jQuery||window.jQuery;if(!e){bt("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(ae,1e3);return}let t=z.document||document,s=e("#extensionsMenu",t);if(!s.length){S("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(ae,2e3);return}if(e(`#${Qe}`,s).length>0){S("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let n=e(`<div class="extension_container interactable" id="${Qe}" tabindex="0"></div>`),a=`
    <div class="list-group-item flex-container flexGap5 interactable" id="${W}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
      <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
      <span>YouYou \u5DE5\u5177\u7BB1</span>
    </div>
  `,o=e(a);o.on("click",async function(c){c.stopPropagation(),S("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let p=e("#extensionsMenuButton",t);p.length&&s.is(":visible")&&p.trigger("click"),ht()}),n.append(o),s.append(n),S("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}var Ke={version:Ge,id:$,init:wt,openPopup:ht,closePopup:Se,switchPage:vt,addMenuItem:ae,getStorage:()=>ke,getApiConnection:()=>Y,getPresetManager:()=>Ce,getUiComponents:()=>I,getRegexExtractor:()=>xt,async getApiConfig(){return await Z(),ke?ke.loadSettings().apiConfig:null},async saveApiConfig(e){return await Z(),Y?(Y.updateApiConfig(e),!0):!1},async getPresets(){return await Z(),Ce?Ce.getAllPresets():[]},async sendApiRequest(e,t){if(await Z(),Y)return Y.sendApiRequest(e,t);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await Z(),Y?Y.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}}};async function wt(){if(S(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${Ge}`),Wt(),await Z()){if(S("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),I){let s=z.document||document,r=`${$}-ui-styles`;if(!s.getElementById(r)){let a=s.createElement("style");a.id=r,a.textContent=I.getStyles(),(s.head||s.documentElement).appendChild(a)}let n=`${$}-regex-styles`;if(!s.getElementById(n)&&I.getRegexStyles){let a=s.createElement("style");a.id=n,a.textContent=I.getRegexStyles(),(s.head||s.documentElement).appendChild(a)}}}else S("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let t=z.document||document;t.readyState==="loading"?t.addEventListener("DOMContentLoaded",()=>{setTimeout(ae,1e3)}):setTimeout(ae,1e3),S("\u521D\u59CB\u5316\u5B8C\u6210")}if(typeof window<"u"&&(window.YouYouToolkit=Ke,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=Ke}catch{}var Ps=Ke;wt();S("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210");export{Ps as default};
