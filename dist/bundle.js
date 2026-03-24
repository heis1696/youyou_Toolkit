var ia=Object.defineProperty;var D=(t,e)=>()=>(t&&(e=t(t=0)),e);var X=(t,e)=>{for(var s in e)ia(t,s,{get:e[s],enumerable:!0})};function wn(){let t=h;return t._getStorage(),t._storage}function F(){return h.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function le(t){h.set("settings",t)}var He,h,U,Tn,Ut,We=D(()=>{He=class t{constructor(e="youyou_toolkit"){this.namespace=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespace]||(s.extensionSettings[this.namespace]={}),this._storage={_target:s.extensionSettings[this.namespace],getItem:r=>{let n=s.extensionSettings[this.namespace][r];return typeof n=="string"?n:n?JSON.stringify(n):null},setItem:(r,n)=>{s.extensionSettings[this.namespace][r]=n,this._saveSettings(s)},removeItem:r=>{delete s.extensionSettings[this.namespace][r],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespace}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,s)=>{try{localStorage.setItem(e,s)}catch(r){console.error(`[${this.namespace}] localStorage\u5199\u5165\u5931\u8D25:`,r)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,s=null){let r=`${this.namespace}:${e}`;if(this._cache.has(r))return this._cache.get(r);let n=this._getStorage(),o=this._getFullKey(e),a=n.getItem(o);if(a===null)return s;try{let i=JSON.parse(a);return this._cache.set(r,i),i}catch{return a}}set(e,s){let r=this._getStorage(),n=this._getFullKey(e),o=`${this.namespace}:${e}`;this._cache.set(o,s);try{r.setItem(n,JSON.stringify(s))}catch(a){console.error(`[${this.namespace}] \u5B58\u50A8\u5931\u8D25:`,a)}}remove(e){let s=this._getStorage(),r=this._getFullKey(e),n=`${this.namespace}:${e}`;this._cache.delete(n),s.removeItem(r)}has(e){let s=this._getStorage(),r=this._getFullKey(e);return s.getItem(r)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let r=s.SillyTavern.getContext();r?.extensionSettings?.[this.namespace]&&(r.extensionSettings[this.namespace]={},this._saveSettings(r))}}else{let s=`${this.namespace}_`,r=[];for(let n=0;n<localStorage.length;n++){let o=localStorage.key(n);o&&o.startsWith(s)&&r.push(o)}r.forEach(n=>localStorage.removeItem(n))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespace}_${e}`}namespace(e){return new t(`${this.namespace}:${e}`)}getMultiple(e){let s={};return e.forEach(r=>{s[r]=this.get(r)}),s}setMultiple(e){Object.entries(e).forEach(([s,r])=>{this.set(s,r)})}exportAll(){let e=this._getStorage(),s={};if(e._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let o=r.SillyTavern.getContext()?.extensionSettings?.[this.namespace]||{};Object.entries(o).forEach(([a,i])=>{s[a]=typeof i=="string"?JSON.parse(i):i})}}else{let r=`${this.namespace}_`;for(let n=0;n<localStorage.length;n++){let o=localStorage.key(n);if(o&&o.startsWith(r)){let a=o.slice(r.length);try{s[a]=JSON.parse(localStorage.getItem(o))}catch{s[a]=localStorage.getItem(o)}}}}return s}},h=new He("youyou_toolkit"),U=new He("youyou_toolkit:tools"),Tn=new He("youyou_toolkit:presets"),Ut=new He("youyou_toolkit:windows")});var Sn={};X(Sn,{DEFAULT_API_PRESETS:()=>ca,DEFAULT_SETTINGS:()=>la,STORAGE_KEYS:()=>zt,StorageService:()=>He,deepMerge:()=>En,getCurrentPresetName:()=>qe,getStorage:()=>wn,loadApiPresets:()=>te,loadSettings:()=>F,presetStorage:()=>Tn,saveApiPresets:()=>Le,saveSettings:()=>le,setCurrentPresetName:()=>ht,storage:()=>h,toolStorage:()=>U,windowStorage:()=>Ut});function te(){return h.get(zt.API_PRESETS)||[]}function Le(t){h.set(zt.API_PRESETS,t)}function qe(){return h.get(zt.CURRENT_PRESET)||""}function ht(t){h.set(zt.CURRENT_PRESET,t||"")}function En(t,e){let s=n=>n&&typeof n=="object"&&!Array.isArray(n),r={...t};return s(t)&&s(e)&&Object.keys(e).forEach(n=>{s(e[n])?n in t?r[n]=En(t[n],e[n]):Object.assign(r,{[n]:e[n]}):Object.assign(r,{[n]:e[n]})}),r}var zt,la,ca,Bt=D(()=>{We();We();zt={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},la={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},ca=[]});var Mn={};X(Mn,{API_STATUS:()=>da,fetchAvailableModels:()=>cr,getApiConfig:()=>Ke,getEffectiveApiConfig:()=>jt,hasEffectiveApiPreset:()=>ar,sendApiRequest:()=>lr,sendWithPreset:()=>pa,testApiConnection:()=>ha,updateApiConfig:()=>xt,validateApiConfig:()=>vt});function or(t,e={}){let s=new Error(t);return s.allowDirectFallback=e.allowDirectFallback===!0,s}function _n(t,e="chat_completions"){let s=String(t||"").trim();if(!s)return"";let r=null;try{r=new URL(s)}catch{return s}let n=r.pathname.replace(/\/+$/,""),o=n;return e==="chat_completions"?!/\/chat\/completions$/i.test(n)&&!/\/completions$/i.test(n)&&(o=`${n||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(n)?o=n.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(n)?o=n.replace(/\/completions$/i,"/models"):/\/models$/i.test(n)||(o=`${n||""}/models`)),r.pathname=o.replace(/\/+/g,"/"),r.toString()}function ua(t){let e=String(t||"").trim();if(!e)return"";try{let s=new URL(e);return s.pathname=s.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",s.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function Ke(){return F().apiConfig||{}}function xt(t){let e=F();e.apiConfig={...e.apiConfig,...t},le(e)}function vt(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function jt(t=""){let e=F(),s=t||qe()||"";if(s){let n=(te()||[]).find(o=>o.name===s);if(n&&n.apiConfig)return{...n.apiConfig,presetName:n.name}}return e.apiConfig||{}}function ar(t=""){return t?(te()||[]).some(s=>s?.name===t):!1}async function pa(t,e,s={},r=null){let n=jt(t);return await lr(e,{...s,apiConfig:n},r)}function An(t,e={}){let s=e.apiConfig||Ke();return{messages:t,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:!1,...e.extraParams}}function ir(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function lr(t,e={},s=null){let r=e.apiConfig||Ke(),n=r.useMainApi,o=vt(r);if(!o.valid&&!n)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${o.errors.join(", ")}`);return n?await ya(t,e,s):await ga(t,r,e,s)}async function ya(t,e,s){let r=typeof window.parent<"u"?window.parent:window;if(!r.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let n=await r.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,...e.extraParams});if(typeof n!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return n.trim()}catch(n){throw n.name==="AbortError"?n:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${n.message}`)}}async function ga(t,e,s,r){let n=typeof window.parent<"u"?window.parent:window;if(n.TavernHelper?.generateRaw)try{return await fa(t,e,s,r,n)}catch(o){console.warn("[youyou_toolkit] TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",o)}if(n.SillyTavern?.getRequestHeaders)try{return await ma(t,e,s,r,n)}catch(o){if(!o?.allowDirectFallback)throw o}return await ba(t,e,s,r)}async function fa(t,e,s,r,n){if(r?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let o=await n.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,max_chat_history:0,custom_api:{apiurl:ua(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...s.extraParams||{}});return typeof o=="string"?o.trim():ir(o)}async function ma(t,e,s,r,n){let o=String(e.url||"").trim(),a={...An(t,{apiConfig:e,...s}),chat_completion_source:"custom",reverse_proxy:o,proxy_password:"",custom_url:o,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof n.SillyTavern?.getRequestHeaders=="function"?n.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(a),signal:r})}catch(p){throw p?.name==="AbortError"?p:or(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${p.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let p=[404,405,501,502].includes(l.status);throw or(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:p})}let d=null;try{d=c?JSON.parse(c):{}}catch{let b=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw or(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${b||"(\u7A7A\u54CD\u5E94)"}`)}return ir(d)}async function ba(t,e,s,r){let n=An(t,{apiConfig:e,...s}),o=_n(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(o,{method:"POST",headers:a,body:JSON.stringify(n),signal:r}),l=await i.text().catch(()=>"");if(!i.ok){let d=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${d}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let p=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${p||"(\u7A7A\u54CD\u5E94)"}`)}return ir(c)}async function ha(t=null){let e=t||Ke(),s=Date.now();try{await lr([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let n=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${n}ms)`,latency:n}}catch(r){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${r.message}`,latency:Date.now()-s}}}async function cr(t=null){let e=t||Ke();return e.useMainApi?await xa():await va(e)}async function xa(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function va(t){if(!t.url||!t.apiKey)return[];try{let e=_n(t.url,"models"),s=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!s.ok)return[];let r=await s.json();return r.data&&Array.isArray(r.data)?r.data.map(n=>n.id||n.name).filter(Boolean).sort():[]}catch{return[]}}var da,ps=D(()=>{Bt();da={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var Pn={};X(Pn,{createPreset:()=>ys,createPresetFromCurrentConfig:()=>Sa,deletePreset:()=>gs,duplicatePreset:()=>Ea,exportPresets:()=>gr,generateUniquePresetName:()=>mr,getActiveConfig:()=>yr,getActivePresetName:()=>fs,getAllPresets:()=>Tt,getPreset:()=>rt,getPresetNames:()=>Ta,getStarredPresets:()=>pr,importPresets:()=>fr,presetExists:()=>Gt,renamePreset:()=>wa,switchToPreset:()=>nt,togglePresetStar:()=>ur,updatePreset:()=>dr,validatePreset:()=>_a});function Tt(){return te()}function Ta(){return te().map(e=>e.name)}function rt(t){return!t||typeof t!="string"?null:te().find(s=>s.name===t)||null}function Gt(t){return!t||typeof t!="string"?!1:te().some(s=>s.name===t)}function ys(t){let{name:e,description:s,apiConfig:r}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let n=e.trim();if(Gt(n))return{success:!1,message:`\u9884\u8BBE "${n}" \u5DF2\u5B58\u5728`};let o={name:n,description:s||"",apiConfig:{url:r?.url||"",apiKey:r?.apiKey||"",model:r?.model||"",useMainApi:r?.useMainApi??!0,max_tokens:r?.max_tokens||4096,temperature:r?.temperature??.7,top_p:r?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=te();return a.push(o),Le(a),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:o}}function dr(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=te(),r=s.findIndex(a=>a.name===t);if(r===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let n=s[r],o={...n,...e,name:n.name,updatedAt:Date.now()};return e.apiConfig&&(o.apiConfig={...n.apiConfig,...e.apiConfig}),s[r]=o,Le(s),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:o}}function gs(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=te(),s=e.findIndex(r=>r.name===t);return s===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(s,1),Le(e),qe()===t&&ht(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function wa(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(!Gt(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Gt(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let r=te(),n=r.find(o=>o.name===t);return n&&(n.name=s,n.updatedAt=Date.now(),Le(r),qe()===t&&ht(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function Ea(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim(),r=rt(t);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Gt(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(r)),name:s,createdAt:Date.now(),updatedAt:Date.now()},o=te();return o.push(n),Le(o),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:n}}function ur(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=te(),s=e.find(r=>r.name===t);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),Le(e),{success:!0,message:s.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function pr(){return te().filter(e=>e.starred===!0)}function nt(t){if(!t)return ht(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=rt(t);return e?(ht(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function fs(){return qe()}function yr(){let t=qe();if(t){let s=rt(t);if(s)return{presetName:t,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:F().apiConfig||{}}}function gr(t=null){if(t){let s=rt(t);if(!s)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let e=te();return JSON.stringify(e,null,2)}function fr(t,e={overwrite:!1}){let s;try{s=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let r=Array.isArray(s)?s:[s];if(r.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let n=te(),o=0;for(let a of r){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let i=n.findIndex(l=>l.name===a.name);i>=0?e.overwrite&&(a.updatedAt=Date.now(),n[i]=a,o++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),n.push(a),o++)}return o>0&&Le(n),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${o} \u4E2A\u9884\u8BBE`,imported:o}}function Sa(t,e=""){let s=F();return ys({name:t,description:e,apiConfig:s.apiConfig})}function _a(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function mr(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=te(),s=new Set(e.map(n=>n.name));if(!s.has(t))return t;let r=1;for(;s.has(`${t} (${r})`);)r++;return`${t} (${r})`}var ms=D(()=>{Bt()});var w,br,E,oe=D(()=>{w={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",TOOL_TRIGGER_INITIALIZED:"tool:triggerInitialized",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",TRIGGER_REGISTERED:"trigger:registered",TRIGGER_UNREGISTERED:"trigger:unregistered",TRIGGER_FIRED:"trigger:fired",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_EXECUTION_REQUESTED:"tool:executionRequested",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},br=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,s,r={}){if(!e||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:n=0}=r;this.listeners.has(e)||this.listeners.set(e,new Set);let o={callback:s,priority:n};return this.listeners.get(e).add(o),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,s)}off(e,s){let r=this.listeners.get(e);if(r){for(let n of r)if(n.callback===s){r.delete(n);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,s),this._addToHistory(e,s);let r=this.listeners.get(e);if(!r||r.size===0)return;let n=Array.from(r).sort((o,a)=>a.priority-o.priority);for(let{callback:o}of n)try{o(s)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,s){let r=n=>{this.off(e,r),s(n)};return this.on(e,r)}wait(e,s=0){return new Promise((r,n)=>{let o=null,a=this.once(e,i=>{o&&clearTimeout(o),r(i)});s>0&&(o=setTimeout(()=>{a(),n(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},s))})}hasListeners(e){let s=this.listeners.get(e);return s&&s.size>0}listenerCount(e){let s=this.listeners.get(e);return s?s.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,s){this.history.push({event:e,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(s=>s.event===e):[...this.history]}clearHistory(){this.history=[]}},E=new br});function x(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function y(t,e,s=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let r=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(r.toastr){r.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}Aa(t,e,s),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${t.toUpperCase()}] ${e}`)}function Re(t,e,s={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:r=3500,sticky:n=!1,noticeId:o=""}=s,a=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!a?.body){y(t,e,r);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",c=a.getElementById(i);if(c||(c=a.createElement("div"),c.id=i,c.style.cssText=`
      position: fixed;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: min(560px, calc(100vw - 24px));
      z-index: 100000;
      pointer-events: none;
    `,a.body.appendChild(c)),!a.getElementById(l)){let K=a.createElement("style");K.id=l,K.textContent=`
      .yyt-top-notice {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 14px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        color: rgba(255, 255, 255, 0.95);
        background: rgba(11, 15, 21, 0.92);
        box-shadow: 0 10px 32px rgba(0, 0, 0, 0.35);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        pointer-events: auto;
        animation: yyt-top-notice-in 0.18s ease-out;
      }

      .yyt-top-notice__icon {
        width: 24px;
        height: 24px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        font-size: 12px;
        font-weight: 700;
      }

      .yyt-top-notice__content {
        flex: 1;
        min-width: 0;
        font-size: 13px;
        line-height: 1.5;
        word-break: break-word;
      }

      .yyt-top-notice__close {
        border: none;
        background: transparent;
        color: rgba(255, 255, 255, 0.72);
        cursor: pointer;
        width: 24px;
        height: 24px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: background 0.15s ease, color 0.15s ease;
      }

      .yyt-top-notice__close:hover {
        background: rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.95);
      }

      .yyt-top-notice--success {
        border-color: rgba(74, 222, 128, 0.35);
      }

      .yyt-top-notice--success .yyt-top-notice__icon {
        background: rgba(74, 222, 128, 0.18);
        color: #4ade80;
      }

      .yyt-top-notice--error {
        border-color: rgba(248, 113, 113, 0.38);
      }

      .yyt-top-notice--error .yyt-top-notice__icon {
        background: rgba(248, 113, 113, 0.18);
        color: #f87171;
      }

      .yyt-top-notice--warning {
        border-color: rgba(251, 191, 36, 0.38);
      }

      .yyt-top-notice--warning .yyt-top-notice__icon {
        background: rgba(251, 191, 36, 0.18);
        color: #fbbf24;
      }

      .yyt-top-notice--info {
        border-color: rgba(123, 183, 255, 0.38);
      }

      .yyt-top-notice--info .yyt-top-notice__icon {
        background: rgba(123, 183, 255, 0.18);
        color: #7bb7ff;
      }

      @keyframes yyt-top-notice-in {
        from {
          opacity: 0;
          transform: translateY(-8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes yyt-top-notice-out {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-8px);
        }
      }
    `,a.head.appendChild(K)}if(o){let K=c.querySelector(`[data-notice-id="${o}"]`);K&&K.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},p=a.createElement("div");p.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,o&&(p.dataset.noticeId=o);let b=a.createElement("span");b.className="yyt-top-notice__icon",b.textContent=d[t]||d.info;let f=a.createElement("div");f.className="yyt-top-notice__content",f.textContent=e;let _=a.createElement("button");_.className="yyt-top-notice__close",_.type="button",_.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),_.textContent="\xD7";let Z=()=>{p.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>p.remove(),180)};_.addEventListener("click",Z),p.appendChild(b),p.appendChild(f),p.appendChild(_),c.appendChild(p),n||setTimeout(Z,r)}function Aa(t,e,s){let r=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!r)return;let n=r.getElementById("yyt-fallback-toast");n&&n.remove();let o={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=o[t]||o.info,i=r.createElement("div");if(i.id="yyt-fallback-toast",i.style.cssText=`
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    background: ${a.bg};
    color: #0b0f15;
    border-radius: 8px;
    border: 2px solid ${a.border};
    font-size: 14px;
    font-weight: 500;
    z-index: 99999;
    max-width: 350px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    animation: yyt-toast-in 0.3s ease;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
  `,i.textContent=e,!r.getElementById("yyt-toast-styles")){let l=r.createElement("style");l.id="yyt-toast-styles",l.textContent=`
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `,r.head.appendChild(l)}r.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},s)}function O(){if(ot)return ot;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return ot=window.parent.jQuery,ot}catch{}return window.jQuery&&(ot=window.jQuery),ot}function Ma(){ot=null}function z(t){return t&&t.length>0}function Ve(t,e=u){if(!O()||!z(t))return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let r=t.find(`#${e}-model`).val()?.trim()||"",n=t.find(`#${e}-model-select`);return n.is(":visible")&&(r=n.val()||r),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:r,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function at(t,e,s=u){if(!O()||!z(t)||!e)return;t.find(`#${s}-api-url`).val(e.url||""),t.find(`#${s}-api-key`).val(e.apiKey||""),t.find(`#${s}-model`).val(e.model||""),t.find(`#${s}-max-tokens`).val(e.max_tokens||4096),t.find(`#${s}-temperature`).val(e.temperature??.7),t.find(`#${s}-top-p`).val(e.top_p??.9);let n=e.useMainApi??!0;t.find(`#${s}-use-main-api`).prop("checked",n);let a=t.find(`#${s}-custom-api-fields`);n?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${s}-model`).show(),t.find(`#${s}-model-select`).hide()}function hr(t){let{id:e,title:s,body:r,width:n="380px",wide:o=!1}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${o?"yyt-dialog-wide":""}" style="${n!=="380px"?`width: ${n};`:""} max-height: calc(100vh - 32px);">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${s}</span>
          <button class="yyt-dialog-close" id="${e}-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body" style="overflow-y: auto; overflow-x: hidden; max-height: calc(100vh - 160px);">
          ${r}
        </div>
        <div class="yyt-dialog-footer">
          <button class="yyt-btn yyt-btn-secondary" id="${e}-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${e}-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `}function xr(t,e,s={}){if(!O())return()=>{};let n=t.find(`#${e}-overlay`),o=()=>{n.remove(),s.onClose&&s.onClose()};return n.find(`#${e}-close, #${e}-cancel`).on("click",o),n.on("click",function(a){a.target===this&&o()}),n.find(`#${e}-save`).on("click",function(){s.onSave&&s.onSave(o)}),o}function Ue(t,e){let s=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(s),n=document.createElement("a");n.href=r,n.download=e,n.click(),URL.revokeObjectURL(r)}function ze(t){return new Promise((e,s)=>{let r=new FileReader;r.onload=n=>e(n.target.result),r.onerror=n=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),r.readAsText(t)})}var u,ot,ke=D(()=>{u="youyou_toolkit";ot=null});var Yt,J,vr=D(()=>{oe();ke();Yt=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,E.emit(w.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(e,s){return!e||!s?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,s,r={}){let n=O();if(!n){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let o=this.components.get(e);if(!o){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);return}let a;if(typeof s=="string"?a=n(s):s&&s.jquery?a=s:s&&(a=n(s)),!z(a)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}this.destroyInstance(e);let i=o.render({...r,dependencies:this.dependencies});a.html(i),o.bindEvents(a,this.dependencies),this.activeInstances.set(e,{container:a,component:o,props:r}),E.emit(w.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let s=this.activeInstances.get(e);s&&(s.component.destroy(s.container),this.activeInstances.delete(e))}switchTab(e){let s=this.currentTab;this.currentTab=e,E.emit(w.UI_TAB_CHANGED,{tabId:e,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(e,s){this.currentSubTab[e]=s,E.emit(w.UI_SUBTAB_CHANGED,{mainTab:e,subTab:s})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((s,r)=>{s.getStyles&&(e+=s.getStyles())}),e}injectStyles(e=document){let s="yyt-component-styles";if(e.getElementById(s))return;let r=e.createElement("style");r.id=s,r.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(r)}setDependency(e,s){this.dependencies[e]=s}getDependency(e){return this.dependencies[e]}_subscribeEvents(){E.on(w.PRESET_UPDATED,()=>{}),E.on(w.TOOL_UPDATED,()=>{})}},J=new Yt});function bs(t){return String(t||"").trim()}var $e,Ee,Tr=D(()=>{oe();ke();ps();ms();$e=null;Ee={id:"apiPresetPanel",render(t){let e=yr(),s=e?.apiConfig||Ke(),r=bs(e?.presetName||fs()),n=Tt(),i=pr().slice(0,8),l=i.length>0?i.map(p=>this._renderPresetItem(p)).join(""):"",c=$e===null?r||"":bs($e),d=c||"-- \u5F53\u524D\u914D\u7F6E --";return`
      <div class="yyt-api-manager">
        <div class="yyt-panel">
          <!-- \u9884\u8BBE\u9009\u62E9\u533A -->
          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-bookmark"></i>
              <span>\u9884\u8BBE\u9009\u62E9</span>
            </div>
            
            <div class="yyt-preset-selector">
              <!-- \u81EA\u5B9A\u4E49\u4E0B\u62C9\u6846 -->
              <div class="yyt-custom-select" id="${u}-preset-dropdown">
                <div class="yyt-select-trigger">
                  <span class="yyt-select-value" data-value="${x(c)}">${x(d)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${c?"":"yyt-selected"}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                  </div>
                  ${n.length>0?n.map(p=>this._renderSelectOption(p,c)).join(""):""}
                </div>
              </div>
              <button class="yyt-btn yyt-btn-secondary" id="${u}-load-preset" title="\u52A0\u8F7D\u9009\u4E2D\u9884\u8BBE">
                <i class="fa-solid fa-download"></i> \u52A0\u8F7D
              </button>
            </div>
            
            ${l?`
            <div class="yyt-preset-list-compact">
              ${l}
            </div>
            `:""}
          </div>
          
          <!-- API\u914D\u7F6E\u533A -->
          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-sliders"></i>
              <span>API\u914D\u7F6E</span>
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${u}-save-as-preset" style="margin-left: auto;">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
              </button>
            </div>
            
            ${this._renderApiConfigForm(s)}
          </div>
          
          <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
          <div class="yyt-panel-footer">
            <div class="yyt-footer-left">
              <button class="yyt-btn yyt-btn-secondary" id="${u}-import-presets">
                <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
              </button>
              <button class="yyt-btn yyt-btn-secondary" id="${u}-export-presets">
                <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
              </button>
              <input type="file" id="${u}-import-file" accept=".json" style="display:none">
            </div>
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-secondary" id="${u}-reset-api-config">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
              </button>
              <button class="yyt-btn yyt-btn-primary" id="${u}-save-api-config">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>
        </div>
      </div>
    `},_renderPresetItem(t){return`
      <div class="yyt-preset-item" data-preset-name="${x(t.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${x(t.name)}</div>
          <div class="yyt-preset-meta">
            ${t.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${x(t.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
    `},_renderSelectOption(t,e){let s=t.starred===!0,r=s?"yyt-option-star yyt-starred":"yyt-option-star",n=s?"\u2605":"\u2606";return`
      <div class="yyt-select-option ${t.name===e?"yyt-selected":""}" data-value="${x(t.name)}">
        <button class="${r}" data-preset="${x(t.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${n}</button>
        <span class="yyt-option-text">${x(t.name)}</span>
      </div>
    `},_renderApiConfigForm(t){return`
      <div class="yyt-form-group">
        <div class="yyt-toggle-row">
          <div class="yyt-toggle-label">
            <span>\u4F7F\u7528SillyTavern\u4E3BAPI</span>
            <span class="yyt-toggle-hint">\u542F\u7528\u540E\u5C06\u4F7F\u7528SillyTavern\u5185\u7F6E\u7684API\u914D\u7F6E</span>
          </div>
          <label class="yyt-toggle">
            <input type="checkbox" id="${u}-use-main-api" ${t.useMainApi?"checked":""}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div id="${u}-custom-api-fields" class="${t.useMainApi?"yyt-disabled":""}">
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API URL</label>
            <input type="text" class="yyt-input" id="${u}-api-url" 
                   value="${x(t.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${u}-api-key" 
                     value="${x(t.apiKey||"")}" 
                     placeholder="sk-...">
              <button class="yyt-btn yyt-btn-icon" id="${u}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>\u6A21\u578B</label>
            <div class="yyt-model-row">
              <input type="text" class="yyt-input yyt-model-input" id="${u}-model" 
                     value="${x(t.model||"")}" 
                     placeholder="gpt-4">
              <select class="yyt-select yyt-model-select" id="${u}-model-select" style="display: none;">
              </select>
              <button class="yyt-btn yyt-btn-secondary yyt-model-btn" id="${u}-load-models" title="\u83B7\u53D6\u6A21\u578B\u5217\u8868">
                <i class="fa-solid fa-sync-alt"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row yyt-form-row-2col">
          <div class="yyt-form-group">
            <label>Max Tokens</label>
            <input type="number" class="yyt-input" id="${u}-max-tokens" 
                   value="${t.max_tokens||4096}" min="1" max="128000">
          </div>
          
          <div class="yyt-form-group">
            <label>Temperature</label>
            <input type="number" class="yyt-input" id="${u}-temperature" 
                   value="${t.temperature??.7}" min="0" max="2" step="0.1">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>Top P</label>
            <input type="number" class="yyt-input" id="${u}-top-p" 
                   value="${t.top_p??.9}" min="0" max="1" step="0.1">
          </div>
        </div>
      </div>
    `},bindEvents(t,e){let s=O();!s||!z(t)||(this._bindDropdownEvents(t,s),this._bindPresetListEvents(t,s),this._bindApiConfigEvents(t,s),this._bindFileEvents(t,s))},_bindDropdownEvents(t,e){let s=t.find(`#${u}-preset-dropdown`),r=s.find(".yyt-select-trigger"),n=s.find(".yyt-select-value"),o=()=>{let a=String(n.data("value")||"").trim();if(!a){$e="",nt(""),at(t,Ke(),u),t.find(".yyt-preset-item").removeClass("yyt-loaded"),y("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let i=rt(a);if(!i){y("error",`\u9884\u8BBE "${a}" \u4E0D\u5B58\u5728`);return}$e=a,nt(a),at(t,i.apiConfig,u),t.find(".yyt-preset-item").removeClass("yyt-loaded"),t.find(`.yyt-preset-item[data-preset-name="${a.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),y("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${a}"\uFF0C\u4FEE\u6539\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u914D\u7F6E\u201D\u4F1A\u8986\u76D6\u8BE5\u9884\u8BBE`)};r.on("click",function(a){a.stopPropagation(),s.toggleClass("yyt-open")}),s.find(".yyt-select-option").on("click",a=>{if(e(a.target).hasClass("yyt-option-star"))return;let i=e(a.currentTarget),l=i.data("value"),c=i.find(".yyt-option-text").text();$e=String(l||"").trim(),n.text(c).data("value",l),s.find(".yyt-select-option").removeClass("yyt-selected"),i.addClass("yyt-selected"),s.removeClass("yyt-open")}),t.find(`#${u}-load-preset`).on("click",()=>{o()}),s.find(".yyt-option-star").on("click",a=>{a.preventDefault(),a.stopPropagation();let i=e(a.currentTarget).data("preset");if(!i)return;let l=ur(i);if(l.success){y("success",l.message);let c=t.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}else y("error",l.message)}),e(document).on("click.yyt-dropdown",a=>{e(a.target).closest(s).length||s.removeClass("yyt-open")})},_bindPresetListEvents(t,e){t.find(".yyt-preset-item").on("click",s=>{let n=e(s.currentTarget).data("preset-name"),o=e(s.target).closest("[data-action]").data("action");if(o)switch(s.stopPropagation(),o){case"load":t.find(".yyt-select-value").text(n).data("value",n),t.find(".yyt-select-option").removeClass("yyt-selected"),t.find(`.yyt-select-option[data-value="${n.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),t.find(`#${u}-load-preset`).trigger("click");break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${n}" \u5417\uFF1F`)){let a=gs(n);if(y(a.success?"info":"error",a.message),a.success){bs($e)===n&&($e=null);let i=t.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}}break}})},_bindApiConfigEvents(t,e){t.find(`#${u}-use-main-api`).on("change",function(){let s=e(this).is(":checked"),r=t.find(`#${u}-custom-api-fields`);s?r.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):r.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),t.find(`#${u}-toggle-key-visibility`).on("click",function(){let s=t.find(`#${u}-api-key`),r=s.attr("type");s.attr("type",r==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),t.find(`#${u}-load-models`).on("click",async()=>{let s=t.find(`#${u}-load-models`),r=t.find(`#${u}-model`),n=t.find(`#${u}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let o=Ve(t,u),a=await cr(o);if(a.length>0){n.empty(),a.forEach(l=>{n.append(`<option value="${x(l)}">${x(l)}</option>`)}),r.hide(),n.show();let i=r.val();i&&a.includes(i)&&n.val(i),n.off("change").on("change",function(){r.val(e(this).val())}),y("success",`\u5DF2\u52A0\u8F7D ${a.length} \u4E2A\u6A21\u578B`)}else y("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(o){y("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${o.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${u}-model`).on("focus",function(){let s=t.find(`#${u}-model-select`);e(this).show(),s.hide()}),t.find(`#${u}-save-api-config`).on("click",()=>{let s=Ve(t,u),r=bs(fs()),n=vt(s);if(!n.valid&&!s.useMainApi){y("error",n.errors.join(", "));return}if(r){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${r}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230\u201C\u5F53\u524D\u914D\u7F6E\u201D`)){xt(s),nt(""),$e="",y("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a);return}xt(s);let o=dr(r,{apiConfig:s});if(o.success){$e=r,y("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${r}"`),nt(r),E.emit(w.PRESET_UPDATED,{name:r});let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}else y("error",o.message);return}xt(s),y("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),t.find(`#${u}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){nt(""),$e="",xt({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9});let s=t.closest(".yyt-api-manager").parent();s.length&&this.renderTo(s),y("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),t.find(`#${u}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(t,e)})},_bindFileEvents(t,e){t.find(`#${u}-export-presets`).on("click",()=>{try{let s=gr();Ue(s,`youyou_toolkit_presets_${Date.now()}.json`),y("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){y("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${u}-import-presets`).on("click",()=>{t.find(`#${u}-import-file`).click()}),t.find(`#${u}-import-file`).on("change",async s=>{let r=s.target.files[0];if(r){try{let n=await ze(r),o=fr(n,{overwrite:!0});if(y(o.success?"success":"error",o.message),o.imported>0){let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}}catch(n){y("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}e(s.target).val("")}})},_showSavePresetDialog(t,e){let r=Tt().map(d=>d.name),n=mr("\u65B0\u9884\u8BBE"),o=`
      <div class="yyt-dialog-overlay" id="${u}-dialog-overlay">
        <div class="yyt-dialog">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">\u4FDD\u5B58\u4E3A\u65B0\u9884\u8BBE</span>
            <button class="yyt-dialog-close" id="${u}-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-group">
              <label>\u9884\u8BBE\u540D\u79F0</label>
              <input type="text" class="yyt-input" id="${u}-dialog-preset-name" 
                     value="${x(n)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09</label>
              <textarea class="yyt-textarea" id="${u}-dialog-preset-desc" rows="2" 
                        placeholder="\u9884\u8BBE\u63CF\u8FF0..."></textarea>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${u}-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="${u}-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;e(`#${u}-dialog-overlay`).remove(),t.append(o);let a=e(`#${u}-dialog-overlay`),i=e(`#${u}-dialog-preset-name`),l=e(`#${u}-dialog-preset-desc`);i.focus().select();let c=()=>a.remove();a.find(`#${u}-dialog-close, #${u}-dialog-cancel`).on("click",c),a.on("click",function(d){d.target===this&&c()}),a.find(`#${u}-dialog-save`).on("click",()=>{let d=i.val().trim(),p=l.val().trim();if(!d){y("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),i.focus();return}if(r.includes(d)){if(!confirm(`\u9884\u8BBE "${d}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;gs(d)}let b=Ve(t,u),f=ys({name:d,description:p,apiConfig:b});if(f.success){y("success",f.message),c(),E.emit(w.PRESET_CREATED,{preset:f.preset});let _=t.closest(".yyt-api-manager").parent();_.length&&this.renderTo(_)}else y("error",f.message)}),i.on("keypress",function(d){d.which===13&&a.find(`#${u}-dialog-save`).click()})},destroy(t){let e=O();!e||!z(t)||(t.find("*").off(),e(document).off("click.yyt-dropdown"))},getStyles(){return`
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
      
      /* Toggle\u5F00\u5173 */
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
      
      /* \u8F93\u5165\u6846 */
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
      
      .yyt-select option,
      select.yyt-select option {
        background-color: #1a1a2e !important;
        background: #1a1a2e !important;
        color: #ffffff !important;
        padding: 8px 12px;
        margin: 2px 0;
        border-radius: 4px;
        filter: none !important;
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
      
      .yyt-input,
      .yyt-textarea {
        background-color: #1a1a2e !important;
        color: #ffffff !important;
        filter: none !important;
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
      
      /* \u6A21\u578B\u884C */
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
      
      /* \u6309\u94AE */
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Bn={};X(Bn,{MESSAGE_MACROS:()=>zn,addTagRule:()=>wt,createRuleTemplate:()=>Dn,default:()=>Ca,deleteRulePreset:()=>Ln,deleteRuleTemplate:()=>Nn,deleteTagRule:()=>Ft,escapeRegex:()=>it,exportRulesConfig:()=>_s,extractComplexTag:()=>In,extractCurlyBraceTag:()=>_r,extractHtmlFormatTag:()=>Rn,extractSimpleTag:()=>Sr,extractTagContent:()=>lt,generateTagSuggestions:()=>vs,getAllRulePresets:()=>Es,getAllRuleTemplates:()=>kn,getContentBlacklist:()=>ct,getRuleTemplate:()=>$n,getTagRules:()=>Be,importRulesConfig:()=>As,isValidTagName:()=>Er,loadRulePreset:()=>Ss,saveRulesAsPreset:()=>ws,scanTextForTags:()=>xs,setContentBlacklist:()=>Ht,setTagRules:()=>Ts,shouldSkipContent:()=>wr,testRegex:()=>Un,updateRuleTemplate:()=>On,updateTagRule:()=>Et});function hs(){let t=F();return ae=t.ruleTemplates||[...Cn],H=t.tagRules||[],fe=t.contentBlacklist||[],{ruleTemplates:ae,tagRules:H,contentBlacklist:fe}}function it(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function wr(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let s=t.toLowerCase();return e.some(r=>{let n=r.trim().toLowerCase();return n&&s.includes(n)})}function Er(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!Pa.includes(t.toLowerCase())}function Sr(t,e){if(!t||!e)return[];let s=[],r=it(e),n=new RegExp(`<${r}>([\\s\\S]*?)<\\/${r}>`,"gi");[...t.matchAll(n)].forEach(l=>{l[1]&&s.push(l[1].trim())});let a=(t.match(new RegExp(`<${r}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${r}>`,"gi"))||[]).length;return a>i&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${a-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),s}function _r(t,e){if(!t||!e)return[];let s=[],r=it(e),n=new RegExp(`\\{${r}\\|`,"gi"),o;for(;(o=n.exec(t))!==null;){let a=o.index,i=a+o[0].length,l=1,c=i;for(;c<t.length&&l>0;)t[c]==="{"?l++:t[c]==="}"&&l--,c++;if(l===0){let d=t.substring(i,c-1);d.trim()&&s.push(d.trim())}n.lastIndex=a+1}return s}function In(t,e){if(!t||!e)return[];let s=e.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let r=s[0].trim(),n=s[1].trim(),o=n.match(/<\/(\w+)>/);if(!o)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${n}`),[];let a=o[1],i=new RegExp(`${it(r)}([\\s\\S]*?)<\\/${a}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(d=>{d[1]&&l.push(d[1].trim())}),l}function Rn(t,e){if(!t||!e)return[];let s=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let r=s[1],n=[],o=new RegExp(`<${r}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${r}>`,"gi");[...t.matchAll(o)].forEach(c=>{c[1]&&n.push(c[1].trim())});let i=(t.match(new RegExp(`<${r}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${r}>`,"gi"))||[]).length;return i>l&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${r}> \u6807\u7B7E`),n}function lt(t,e,s=[]){if(!t)return"";if(!e||e.length===0)return t;let r=e.filter(d=>d.type==="exclude"&&d.enabled),n=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),o=e.filter(d=>d.type==="regex_exclude"&&d.enabled),a=t;for(let d of r)try{let p=new RegExp(`<${it(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${it(d.value)}>`,"gi");a=a.replace(p,"")}catch(p){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:d,error:p})}let i=[];if(n.length>0)for(let d of n){let p=[];try{if(d.type==="include")p.push(...Sr(a,d.value)),p.push(..._r(a,d.value));else if(d.type==="regex_include"){let b=new RegExp(d.value,"gi");[...a.matchAll(b)].forEach(_=>{_[1]&&p.push(_[1])})}}catch(b){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:d,error:b})}p.forEach(b=>i.push(b.trim()))}else i.push(a);let l=[];for(let d of i){for(let p of o)try{let b=new RegExp(p.value,"gi");d=d.replace(b,"")}catch(b){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:p,error:b})}wr(d,s)||l.push(d)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function xs(t,e={}){let s=performance.now(),{chunkSize:r=5e4,maxTags:n=100,timeoutMs:o=5e3}=e,a=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let p=0;p<t.length;p+=r){let b=t.slice(p,Math.min(p+r,t.length));if(c++,l+=b.length,performance.now()-s>o){console.warn(`[YouYouToolkit] Tag scanning timed out after ${o}ms`);break}let f;for(;(f=i.exec(b))!==null&&a.size<n;){let _=(f[1]||f[2]).toLowerCase();Er(_)&&a.add(_)}if(a.size>=n)break;c%5===0&&await new Promise(_=>setTimeout(_,0))}let d=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(d-s),processedChars:l,totalChars:t.length,chunkCount:c,tagsFound:a.size}}}function vs(t,e=25){let s=t.tags.slice(0,e);return{suggestions:s,stats:{totalFound:t.stats.tagsFound,finalCount:s.length}}}function kn(){return ae.length===0&&hs(),ae}function $n(t){return ae.find(e=>e.id===t)}function Dn(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return ae.push(e),Ar(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function On(t,e){let s=ae.findIndex(r=>r.id===t);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(ae[s]={...ae[s],...e,updatedAt:new Date().toISOString()},Ar(),{success:!0,template:ae[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function Nn(t){let e=ae.findIndex(s=>s.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(ae.splice(e,1),Ar(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function Ar(){let t=F();t.ruleTemplates=ae,le(t)}function Be(){return H||hs(),H}function Ts(t){H=t||[];let e=F();e.tagRules=H,le(e)}function wt(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};H.push(e);let s=F();return s.tagRules=H,le(s),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function Et(t,e){if(t<0||t>=H.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};H[t]={...H[t],...e};let s=F();return s.tagRules=H,le(s),{success:!0,rule:H[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function Ft(t){if(t<0||t>=H.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};H.splice(t,1);let e=F();return e.tagRules=H,le(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function ct(){return fe||hs(),fe}function Ht(t){fe=t||[];let e=F();e.contentBlacklist=fe,le(e)}function ws(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=F();s.tagRulePresets||(s.tagRulePresets={});let r=`preset-${Date.now()}`;return s.tagRulePresets[r]={id:r,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(H)),blacklist:JSON.parse(JSON.stringify(fe)),createdAt:new Date().toISOString()},le(s),{success:!0,preset:s.tagRulePresets[r],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function Es(){let e=F().tagRulePresets||{};return Object.values(e)}function Ss(t){let e=F(),r=(e.tagRulePresets||{})[t];return r?(H=JSON.parse(JSON.stringify(r.rules||[])),fe=JSON.parse(JSON.stringify(r.blacklist||[])),e.tagRules=H,e.contentBlacklist=fe,le(e),{success:!0,preset:r,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Ln(t){let e=F(),s=e.tagRulePresets||{};return s[t]?(delete s[t],e.tagRulePresets=s,le(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function _s(){return JSON.stringify({tagRules:H,contentBlacklist:fe,ruleTemplates:ae,tagRulePresets:F().tagRulePresets||{}},null,2)}function As(t,e={overwrite:!0}){try{let s=JSON.parse(t);if(e.overwrite)H=s.tagRules||[],fe=s.contentBlacklist||[],ae=s.ruleTemplates||Cn;else if(s.tagRules&&H.push(...s.tagRules),s.contentBlacklist){let n=new Set(fe.map(o=>o.toLowerCase()));s.contentBlacklist.forEach(o=>{n.has(o.toLowerCase())||fe.push(o)})}let r=F();return r.tagRules=H,r.contentBlacklist=fe,r.ruleTemplates=ae,s.tagRulePresets&&(r.tagRulePresets={...r.tagRulePresets||{},...s.tagRulePresets}),le(r),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function Un(t,e,s="g",r=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let n=new RegExp(t,s),o=[];if(s.includes("g")){let a;for(;(a=n.exec(e))!==null;)a.length>1?o.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[r]||a[1]||a[0]}):o.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=n.exec(e);a&&o.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[r]||a[1]:a[0]})}return{success:!0,matches:o,count:o.length,extracted:o.map(a=>a.extracted)}}catch(n){return{success:!1,error:n.message,matches:[]}}}var Pa,Cn,ae,H,fe,zn,Ca,Ms=D(()=>{Bt();Pa=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],Cn=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],ae=[],H=[],fe=[];zn={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};hs();Ca={extractTagContent:lt,extractSimpleTag:Sr,extractCurlyBraceTag:_r,extractComplexTag:In,extractHtmlFormatTag:Rn,escapeRegex:it,shouldSkipContent:wr,isValidTagName:Er,scanTextForTags:xs,generateTagSuggestions:vs,getAllRuleTemplates:kn,getRuleTemplate:$n,createRuleTemplate:Dn,updateRuleTemplate:On,deleteRuleTemplate:Nn,getTagRules:Be,setTagRules:Ts,addTagRule:wt,updateTagRule:Et,deleteTagRule:Ft,getContentBlacklist:ct,setContentBlacklist:Ht,saveRulesAsPreset:ws,getAllRulePresets:Es,loadRulePreset:Ss,deleteRulePreset:Ln,exportRulesConfig:_s,importRulesConfig:As,testRegex:Un,MESSAGE_MACROS:zn}});var Se,Mr=D(()=>{oe();ke();Ms();Se={id:"regexExtractPanel",render(t){let e=Be(),s=ct(),r=Es();return`
      <div class="yyt-regex-panel">
        <!-- \u89C4\u5219\u7F16\u8F91\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-filter"></i>
            <span>\u6807\u7B7E\u63D0\u53D6\u89C4\u5219</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${u}-show-examples" style="margin-left: auto;">
              <i class="fa-solid fa-lightbulb"></i> \u67E5\u770B\u793A\u4F8B
            </button>
          </div>
          
          ${this._renderRulesEditor(e,s,r)}
        </div>
        
        <!-- \u6D4B\u8BD5\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-flask"></i>
            <span>\u6D4B\u8BD5\u63D0\u53D6</span>
          </div>
          
          ${this._renderTestSection()}
        </div>
        
        <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
        <div class="yyt-panel-footer">
          <div class="yyt-footer-left">
            <button class="yyt-btn yyt-btn-secondary" id="${u}-import-rules">
              <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${u}-export-rules">
              <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
            </button>
            <input type="file" id="${u}-import-rules-file" accept=".json" style="display:none">
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${u}-reset-rules">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
            </button>
          </div>
        </div>
        
        <!-- \u6807\u7B7E\u626B\u63CF\u7ED3\u679C\u5BB9\u5668 -->
        <div id="${u}-tag-suggestions-container" style="display: none;">
          <div class="yyt-tag-suggestions">
            <div class="yyt-tag-suggestions-header">
              <span>\u53D1\u73B0\u7684\u6807\u7B7E:</span>
              <span id="${u}-tag-scan-stats"></span>
            </div>
            <div class="yyt-tag-list" id="${u}-tag-list"></div>
          </div>
        </div>
      </div>
    `},_renderRulesEditor(t,e,s){let r=t.length>0?t.map((o,a)=>this._renderRuleItem(o,a)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',n=s.length>0?s.map(o=>`<option value="${o.id}">${x(o.name)}</option>`).join(""):"";return`
      <div class="yyt-tag-rules-editor">
        ${n?`
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${u}-rule-preset-select">
            <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
            ${n}
          </select>
          <button class="yyt-btn yyt-btn-secondary" id="${u}-load-rule-preset">
            <i class="fa-solid fa-download"></i> \u52A0\u8F7D
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${u}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u9884\u8BBE
          </button>
        </div>
        `:`
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-secondary" id="${u}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
          </button>
        </div>
        `}
        
        <div class="yyt-rules-list">
          ${r}
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${u}-add-rule">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u89C4\u5219
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${u}-scan-tags">
            <i class="fa-solid fa-search"></i> \u626B\u63CF\u6807\u7B7E
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${u}-add-exclude-cot">
            <i class="fa-solid fa-ban"></i> \u6392\u9664\u5C0FCoT
          </button>
        </div>
        
        <!-- \u9ED1\u540D\u5355\u8BBE\u7F6E -->
        <div class="yyt-form-group">
          <label>\u5185\u5BB9\u9ED1\u540D\u5355\uFF08\u5305\u542B\u8FD9\u4E9B\u5173\u952E\u8BCD\u7684\u5185\u5BB9\u5C06\u88AB\u8FC7\u6EE4\uFF0C\u7528\u9017\u53F7\u5206\u9694\uFF09</label>
          <input type="text" class="yyt-input" id="${u}-content-blacklist" 
                 value="${x(e.join(", "))}" 
                 placeholder="\u5173\u952E\u8BCD1, \u5173\u952E\u8BCD2, ...">
        </div>
      </div>
    `},_renderRuleItem(t,e){return`
      <div class="yyt-rule-item" data-rule-index="${e}">
        <select class="yyt-select yyt-rule-type" style="flex: 2; min-width: 100px;">
          <option value="include" ${t.type==="include"?"selected":""}>\u5305\u542B</option>
          <option value="regex_include" ${t.type==="regex_include"?"selected":""}>\u6B63\u5219\u5305\u542B</option>
          <option value="exclude" ${t.type==="exclude"?"selected":""}>\u6392\u9664</option>
          <option value="regex_exclude" ${t.type==="regex_exclude"?"selected":""}>\u6B63\u5219\u6392\u9664</option>
        </select>
        <input type="text" class="yyt-input yyt-rule-value" style="flex: 5;" 
               placeholder="\u6807\u7B7E\u540D\u6216\u6B63\u5219\u8868\u8FBE\u5F0F" 
               value="${x(t.value||"")}">
        <label class="yyt-checkbox-label yyt-rule-enabled-label">
          <input type="checkbox" class="yyt-rule-enabled" ${t.enabled?"checked":""}>
          <span>\u542F\u7528</span>
        </label>
        <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-btn-danger yyt-rule-delete" title="\u5220\u9664\u89C4\u5219">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `},_renderTestSection(){return`
      <div class="yyt-test-section">
        <div class="yyt-form-group">
          <label>\u6D4B\u8BD5\u6587\u672C</label>
          <textarea class="yyt-textarea" id="${u}-test-input" rows="6" 
                    placeholder="\u8F93\u5165\u8981\u6D4B\u8BD5\u63D0\u53D6\u7684\u6587\u672C\u5185\u5BB9..."></textarea>
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${u}-test-extract">
            <i class="fa-solid fa-play"></i> \u6D4B\u8BD5\u63D0\u53D6
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${u}-test-clear">
            <i class="fa-solid fa-eraser"></i> \u6E05\u7A7A
          </button>
        </div>
        
        <div class="yyt-form-group" id="${u}-test-result-container" style="display: none;">
          <label>\u63D0\u53D6\u7ED3\u679C</label>
          <div class="yyt-test-result" id="${u}-test-result"></div>
        </div>
      </div>
    `},bindEvents(t,e){let s=O();!s||!z(t)||(this._bindRuleEditorEvents(t,s),this._bindPresetEvents(t,s),this._bindTestEvents(t,s),this._bindFileEvents(t,s))},_bindRuleEditorEvents(t,e){t.find(".yyt-rule-type").on("change",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),n=e(this).val();Et(r,{type:n}),y("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),t.find(".yyt-rule-value").on("change",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),n=e(this).val().trim();Et(r,{value:n})}),t.find(".yyt-rule-enabled").on("change",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),n=e(this).is(":checked");Et(r,{enabled:n}),y("info",n?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),t.find(".yyt-rule-delete").on("click",()=>{let r=t.find(".yyt-rule-delete").closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(Ft(r),this.renderTo(t),y("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.on("click",".yyt-rule-delete",s=>{let n=e(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(Ft(n),this.renderTo(t),y("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.find(`#${u}-add-rule`).on("click",()=>{wt({type:"include",value:"",enabled:!0}),this.renderTo(t),y("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),t.find(`#${u}-scan-tags`).on("click",async()=>{let s=t.find(`#${u}-scan-tags`),r=t.find(`#${u}-test-input`).val();if(!r||!r.trim()){y("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let n=await xs(r,{maxTags:50,timeoutMs:3e3}),{suggestions:o,stats:a}=vs(n,25);if(o.length===0){y("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),t.find(`#${u}-tag-suggestions-container`).hide();return}let i=t.find(`#${u}-tag-list`);t.find(`#${u}-tag-scan-stats`).text(`${a.finalCount}/${a.totalFound} \u4E2A\u6807\u7B7E, ${n.stats.processingTimeMs}ms`),i.empty(),o.forEach(c=>{let d=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${x(c)}</button>`);d.on("click",()=>{if(Be().some(f=>f.type==="include"&&f.value===c)){y("warning",`\u89C4\u5219 "\u5305\u542B: ${c}" \u5DF2\u5B58\u5728`);return}wt({type:"include",value:c,enabled:!0}),this.renderTo(t),y("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${c}"`)}),i.append(d)}),t.find(`#${u}-tag-suggestions-container`).show(),y("success",`\u53D1\u73B0 ${o.length} \u4E2A\u6807\u7B7E`)}catch(n){y("error",`\u626B\u63CF\u5931\u8D25: ${n.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${u}-add-exclude-cot`).on("click",()=>{let s=Be(),r="<!--[\\s\\S]*?-->";if(s.some(o=>o.type==="regex_exclude"&&o.value===r)){y("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}wt({type:"regex_exclude",value:r,enabled:!0}),this.renderTo(t),y("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),t.find(`#${u}-content-blacklist`).on("change",function(){let r=e(this).val().split(",").map(n=>n.trim()).filter(n=>n);Ht(r),y("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${r.length} \u4E2A\u5173\u952E\u8BCD`)}),t.find(`#${u}-show-examples`).on("click",()=>{alert(`
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
   - \u793A\u4F8B:<!--[\\s\\S]*?--> (\u79FB\u9664HTML\u6CE8\u91CA)

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
      `)})},_bindPresetEvents(t,e){t.find(`#${u}-load-rule-preset`).on("click",()=>{let s=t.find(`#${u}-rule-preset-select`).val();if(!s){y("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let r=Ss(s);r.success?(this.renderTo(t),y("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${r.preset.name}`),E.emit(w.REGEX_PRESET_LOADED,{preset:r.preset})):y("error",r.message)}),t.find(`#${u}-save-rule-preset`).on("click",()=>{let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let r=ws(s.trim());r.success?(this.renderTo(t),y("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):y("error",r.message)})},_bindTestEvents(t,e){t.find(`#${u}-test-extract`).on("click",()=>{let s=t.find(`#${u}-test-input`).val();if(!s||!s.trim()){y("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let r=Be(),n=ct(),o=lt(s,r,n),a=t.find(`#${u}-test-result-container`),i=t.find(`#${u}-test-result`);a.show(),!o||!o.trim()?(i.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),y("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(i.html(`<pre class="yyt-code-block">${x(o)}</pre>`),y("success","\u63D0\u53D6\u5B8C\u6210"),E.emit(w.REGEX_EXTRACTED,{result:o}))}),t.find(`#${u}-test-clear`).on("click",()=>{t.find(`#${u}-test-input`).val(""),t.find(`#${u}-test-result-container`).hide()})},_bindFileEvents(t,e){t.find(`#${u}-import-rules`).on("click",()=>{t.find(`#${u}-import-rules-file`).click()}),t.find(`#${u}-import-rules-file`).on("change",async s=>{let r=s.target.files[0];if(r){try{let n=await ze(r),o=As(n,{overwrite:!0});o.success?(this.renderTo(t),y("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):y("error",o.message)}catch(n){y("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}e(s.target).val("")}}),t.find(`#${u}-export-rules`).on("click",()=>{try{let s=_s();Ue(s,`youyou_toolkit_rules_${Date.now()}.json`),y("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){y("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${u}-reset-rules`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(Ts([]),Ht([]),this.renderTo(t),y("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(t){!O()||!z(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var jn={};X(jn,{DEFAULT_TOOL_PRESETS:()=>De,DEFAULT_TOOL_STRUCTURE:()=>ce,TOOL_STORAGE_KEYS:()=>Y,cloneTool:()=>ka,createDefaultToolDefinition:()=>Wt,deleteTool:()=>Cr,deleteToolPreset:()=>Oa,exportTools:()=>kr,getAllToolPresets:()=>Rr,getAllTools:()=>dt,getCurrentToolPresetId:()=>Na,getTool:()=>_t,getToolPreset:()=>$a,importTools:()=>$r,normalizeToolDefinitionToRuntimeConfig:()=>Ps,resetTools:()=>Dr,saveTool:()=>Cs,saveToolPreset:()=>Da,setCurrentToolPreset:()=>La,setToolEnabled:()=>Ir,validateTool:()=>Ua});function St(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function Pr(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>0?s:e}function Ia(t=[]){let e=Array.isArray(t)?t.map(s=>({role:String(s?.role||"user").trim().toUpperCase(),content:String(s?.content||"").trim()})).filter(s=>s.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(s=>`\u3010${s.role||"USER"}\u3011
${s.content}`).join(`

`)}function Ra(t,e={}){let s=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(s)return s;let r=Ia(e?.config?.messages||[]);return r||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function Wt(t={}){let e=new Date().toISOString(),s=t?.config||{};return{...ce,...t,id:t?.id||ce.id,icon:t?.icon||ce.icon,order:Number.isFinite(t?.order)?t.order:ce.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:ce.promptTemplate,extractTags:St(t?.extractTags),config:{...ce.config,...s,trigger:{...ce.config.trigger,...s.trigger||{},events:St(s?.trigger?.events)},execution:{...ce.config.execution,...s.execution||{},timeout:Pr(s?.execution?.timeout,ce.config.execution.timeout),retries:Math.max(0,parseInt(s?.execution?.retries,10)||ce.config.execution.retries)},api:{...ce.config.api,...s.api||{}},messages:Array.isArray(s?.messages)?s.messages:[],context:{...ce.config.context,...s.context||{},depth:Pr(s?.context?.depth,ce.config.context.depth),includeTags:St(s?.context?.includeTags),excludeTags:St(s?.context?.excludeTags)}},enabled:t?.enabled!==!1,metadata:{...ce.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function Ps(t,e={},s={}){let r=Wt({...e,id:t||e?.id||""}),n=St(r?.config?.trigger?.events),o=St(r?.extractTags?.length?r.extractTags:r?.config?.context?.includeTags),a=String(e?.output?.apiPreset||r?.config?.api?.preset||"").trim(),i=Ra(t,r),l=n[0]||"GENERATION_ENDED",c=n.includes("GENERATION_ENDED"),d=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():s.defaultOutputMode||"follow_ai";return{id:r.id||t,name:r.name||t,icon:r.icon||"fa-screwdriver-wrench",description:r.description||"",enabled:r.enabled!==!1,order:Number.isFinite(r.order)?r.order:100,trigger:{event:l,enabled:c},bypass:{enabled:r?.config?.api?.useBypass===!0&&!!r?.config?.api?.bypassPreset,presetId:r?.config?.api?.bypassPreset||""},output:{mode:d,apiPreset:a,overwrite:!0,enabled:d==="post_response_api"?c:!1},extraction:{enabled:!0,maxMessages:Pr(r?.config?.context?.depth,5),selectors:o},promptTemplate:i,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:a,extractTags:o,isCustom:!0,category:r.category||"utility",metadata:{...r.metadata||{}}}}function dt(){let t=U.get(Y.TOOLS),e=t&&typeof t=="object"?{...De,...t}:{...De};return Object.fromEntries(Object.entries(e).map(([s,r])=>[s,Wt({...r||{},id:s})]))}function _t(t){return dt()[t]||null}function Cs(t,e){if(!t||!e)return!1;let s=U.get(Y.TOOLS)||{},r=!s[t]&&!De[t],n=Wt({...s[t]||{},...e,id:t,metadata:{...s[t]?.metadata||{},...e.metadata||{},createdAt:s[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return s[t]=n,U.set(Y.TOOLS,s),E.emit(r?w.TOOL_REGISTERED:w.TOOL_UPDATED,{toolId:t,tool:n}),!0}function Cr(t){if(De[t])return!1;let e=U.get(Y.TOOLS)||{};return e[t]?(delete e[t],U.set(Y.TOOLS,e),E.emit(w.TOOL_UNREGISTERED,{toolId:t}),!0):!1}function Ir(t,e){let s=_t(t);if(!s)return!1;let r=U.get(Y.TOOLS)||{};return r[t]||(r[t]={...s}),r[t].enabled=e,r[t].metadata={...r[t].metadata,updatedAt:new Date().toISOString()},U.set(Y.TOOLS,r),E.emit(e?w.TOOL_ENABLED:w.TOOL_DISABLED,{toolId:t}),!0}function ka(t,e,s){let r=_t(t);if(!r)return!1;let n=JSON.parse(JSON.stringify(r));return n.name=s||`${r.name} (\u526F\u672C)`,n.metadata={...n.metadata,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},Cs(e,n)}function Rr(){let t=U.get(Y.PRESETS);return t&&typeof t=="object"?{...De,...t}:{...De}}function $a(t){return Rr()[t]||null}function Da(t,e){if(!t||!e)return!1;let s=U.get(Y.PRESETS)||{};return s[t]={...e,metadata:{...e.metadata,updatedAt:new Date().toISOString()}},U.set(Y.PRESETS,s),!0}function Oa(t){if(De[t])return!1;let e=U.get(Y.PRESETS)||{};return e[t]?(delete e[t],U.set(Y.PRESETS,e),!0):!1}function Na(){return U.get(Y.CURRENT_PRESET)||null}function La(t){return Rr()[t]?(U.set(Y.CURRENT_PRESET,t),!0):!1}function kr(){let t=U.get(Y.TOOLS)||{},e=U.get(Y.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function $r(t,e=!1){try{let s=typeof e=="object"?!!e?.overwrite:!!e,r=JSON.parse(t);if(!r||typeof r!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let n=s?{}:U.get(Y.TOOLS)||{},o=s?{}:U.get(Y.PRESETS)||{},a=0,i=0;if(r.tools&&typeof r.tools=="object"){for(let[l,c]of Object.entries(r.tools))De[l]&&!s||c&&typeof c=="object"&&(n[l]=Wt({...c,id:l}),a++);U.set(Y.TOOLS,n)}if(r.presets&&typeof r.presets=="object"){for(let[l,c]of Object.entries(r.presets))De[l]&&!s||c&&typeof c=="object"&&(o[l]=c,i++);U.set(Y.PRESETS,o)}return{success:!0,toolsImported:a,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function Dr(){U.remove(Y.TOOLS),U.remove(Y.PRESETS),U.remove(Y.CURRENT_PRESET)}function Ua(t){let e=[];if(!t)return{valid:!1,errors:["\u5DE5\u5177\u5B9A\u4E49\u4E3A\u7A7A"]};if((!t.name||typeof t.name!="string")&&e.push("\u5DE5\u5177\u540D\u79F0\u65E0\u6548"),(!t.category||typeof t.category!="string")&&e.push("\u5DE5\u5177\u5206\u7C7B\u65E0\u6548"),t.config){let{trigger:s,execution:r,api:n,context:o}=t.config;s&&!["manual","event","scheduled"].includes(s.type)&&e.push("\u89E6\u53D1\u7C7B\u578B\u65E0\u6548"),r&&((typeof r.timeout!="number"||r.timeout<0)&&e.push("\u8D85\u65F6\u65F6\u95F4\u5FC5\u987B\u4E3A\u6B63\u6570"),(typeof r.retries!="number"||r.retries<0)&&e.push("\u91CD\u8BD5\u6B21\u6570\u5FC5\u987B\u4E3A\u6B63\u6570")),o&&typeof o.depth!="number"&&e.push("\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u5FC5\u987B\u4E3A\u6570\u5B57")}return{valid:e.length===0,errors:e}}var ce,De,Y,Is=D(()=>{We();oe();ce={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{trigger:{type:"manual",events:[]},execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},De={},Y={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"}});var no={};X(no,{TOOL_CATEGORIES:()=>Gn,TOOL_REGISTRY:()=>At,clearToolApiPreset:()=>Qn,default:()=>Ha,ensureToolRuntimeConfig:()=>$s,getAllDefaultToolConfigs:()=>to,getAllToolApiBindings:()=>Xn,getAllToolFullConfigs:()=>Br,getEnabledTools:()=>Ds,getToolApiPreset:()=>Ur,getToolBaseConfig:()=>ks,getToolConfig:()=>Kt,getToolFullConfig:()=>Q,getToolList:()=>qn,getToolSubTabs:()=>Kn,getToolWindowState:()=>ro,hasTool:()=>Lr,onPresetDeleted:()=>Zn,patchToolRuntime:()=>Mt,registerTool:()=>Hn,resetToolConfig:()=>eo,resetToolRegistry:()=>Vn,saveToolConfig:()=>je,saveToolWindowState:()=>so,setToolApiPreset:()=>Jn,setToolApiPresetConfig:()=>Ga,setToolBypassConfig:()=>Ya,setToolOutputMode:()=>ja,setToolPromptTemplate:()=>Fa,unregisterTool:()=>Wn,updateToolRuntime:()=>zr});function Rs(t={}){return{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0,lastTriggerAt:0,lastTriggerEvent:"",lastMessageKey:"",lastSkipReason:"",lastExecutionPath:"",lastWritebackStatus:"",lastFailureStage:"",...t}}function Yn(){let t=dt()||{};return Object.entries(t).filter(([e])=>!qt[e]).map(([e,s])=>[e,s||{}])}function Fn(){let t=Array.isArray(At.tools?.subTabs)?[...At.tools.subTabs]:[],e=Yn().map(([s,r],n)=>{let o=Ps(s,r);return{id:s,name:o.name||s,icon:o.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(o.order)?o.order:100+n,isCustom:!0,description:o.description||""}});return[...t,...e].sort((s,r)=>(s.order??0)-(r.order??0))}function za(t,e={}){let s=Ps(t,e,{defaultOutputMode:"follow_ai"});return{...s,runtime:Rs(s.runtime)}}function Nr(t){let e=qt[t];if(e)return{...e,trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{}},runtime:Rs(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let r=(dt()||{})[t]||null;return r?za(t,r):Kt(t)}function ks(t){let e=Nr(t);return e?{...e,trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function Ba(t,e={},s=""){if(!t)return null;let r={...t,...e,id:t.id||e.id};r.trigger={...t.trigger||{},...e.trigger||{}},r.output={...t.output||{},...e.output||{}},r.bypass={...t.bypass||{},...e.bypass||{}},r.runtime=Rs({...t.runtime||{},...e.runtime||{}}),r.extraction={...t.extraction||{},...e.extraction||{}};let n=e?.output?.apiPreset||e?.apiPreset||r.output?.apiPreset||r.apiPreset||s||"";return r.output={...r.output||{},apiPreset:n},r.apiPreset=n,(!Array.isArray(r.extraction.selectors)||r.extraction.selectors.length===0)&&Array.isArray(r.extractTags)&&r.extractTags.length>0&&(r.extraction.selectors=[...r.extractTags]),(!Array.isArray(r.extractTags)||r.extractTags.length===0)&&(r.extractTags=Array.isArray(r.extraction.selectors)?[...r.extraction.selectors]:[]),t.isCustom?r.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?r.enabled=e.enabled:r.enabled=t.enabled!==!1,r}function Hn(t,e){if(!t||typeof t!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let r of s)if(!e[r])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${r}`),!1;return Oe[t]={id:t,...e,order:e.order??Object.keys(Oe).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function Wn(t){return Oe[t]?(delete Oe[t],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function qn(t=!0){let e=Object.values(Oe).map(s=>s.id==="tools"?{...s,subTabs:Fn()}:s);return t?e.sort((s,r)=>(s.order??0)-(r.order??0)):e}function Kt(t){return t==="tools"&&Oe[t]?{...Oe[t],subTabs:Fn()}:Oe[t]||null}function Lr(t){return!!Oe[t]}function Kn(t){let e=Kt(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function Vn(){Oe={...At},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Jn(t,e){if(!Lr(t))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let s=h.get(xe)||{};return s[t]=e||"",h.set(xe,s),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function Ur(t){return(h.get(xe)||{})[t]||""}function Qn(t){let e=h.get(xe)||{};delete e[t],h.set(xe,e),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function Xn(){return h.get(xe)||{}}function Zn(t){let e=h.get(xe)||{},s=!1;for(let r in e)e[r]===t&&(e[r]="",s=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${r}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&h.set(xe,e)}function Q(t){let e=Nr(t);if(!e)return Kt(t);let r=(h.get(ut)||{})[t]||{},n=Ur(t);return Ba({...e,id:t},r,n)}function $s(t){if(!t)return!1;let e=Nr(t);if(!e)return!1;let s=h.get(ut)||{};if(s[t])return!0;let r={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}}};s[t]=r,h.set(ut,s);let n=h.get(xe)||{};return n[t]=r.output?.apiPreset||r.apiPreset||"",h.set(xe,n),E.emit(w.TOOL_UPDATED,{toolId:t,config:r}),!0}function je(t,e,s={}){if(!t||!Q(t))return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:r=!0}=s,n=h.get(ut)||{},o=h.get(xe)||{},a=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","trigger","output","bypass","extraction","runtime"];return n[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){n[t][l]={...e.output,apiPreset:a};return}if(l==="apiPreset"){n[t][l]=a;return}n[t][l]=e[l]}}),n[t].apiPreset===void 0&&(n[t].apiPreset=a),!n[t].output&&e.output!==void 0&&(n[t].output={...e.output||{},apiPreset:a}),h.set(ut,n),o[t]=a,h.set(xe,o),r&&E.emit(w.TOOL_UPDATED,{toolId:t,config:n[t]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function ja(t,e){let s=Q(t);return s?je(t,{...s,output:{...s.output,mode:e}}):!1}function Ga(t,e){let s=Q(t);return s?je(t,{...s,apiPreset:e,output:{...s.output,apiPreset:e}}):!1}function Ya(t,e){let s=Q(t);return s?je(t,{...s,bypass:{...s.bypass,...e}}):!1}function Fa(t,e){let s=Q(t);return s?je(t,{...s,promptTemplate:e}):!1}function Mt(t,e,s={}){let r=Q(t);if(!r)return!1;let{touchLastRunAt:n=!1,emitEvent:o=!1}=s,a=Rs({...r.runtime||{},...e||{}});return n&&(a.lastRunAt=Date.now()),je(t,{...r,runtime:a},{emitEvent:o})}function zr(t,e){return Mt(t,e,{touchLastRunAt:!0,emitEvent:!0})}function eo(t){if(!t||!qt[t])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=h.get(ut)||{};return delete e[t],h.set(ut,e),E.emit(w.TOOL_UPDATED,{toolId:t,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function to(){return{...qt}}function Br(){let t=new Set([...Object.keys(qt),...Yn().map(([e])=>e)]);return Array.from(t).map(e=>Q(e)).filter(Boolean)}function Ds(){return Br().filter(t=>t&&t.enabled)}function so(t,e){let s=h.get(Or)||{};s[t]={...e,updatedAt:Date.now()},h.set(Or,s)}function ro(t){return(h.get(Or)||{})[t]||null}var ut,xe,Or,qt,At,Gn,Oe,Ha,Pt=D(()=>{We();oe();Is();ut="tool_configs",xe="tool_api_bindings",Or="tool_window_states";qt={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

\u8F93\u51FA\u683C\u5F0F\uFF1A
<boo_FM>
<pg>\u9875\u7801</pg>
<time>\u65F6\u95F4</time>
<scene>\u573A\u666F</scene>
<plot>\u5267\u60C5\u6982\u8981</plot>
<event>\u4E8B\u4EF6\u63CF\u8FF0</event>
<defined>\u5DF2\u5B9A\u4E49\u5143\u7D20</defined>
<status>\u72B6\u6001</status>
<seeds>\u4F0F\u7B14</seeds>
</boo_FM>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["boo_FM"]},statusBlock:{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",description:"\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u4EE3\u7801\u5757",enabled:!0,order:4,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["status_block"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0B\u5BF9\u8BDD\u5185\u5BB9\u751F\u6210\u89D2\u8272\u72B6\u6001\u5757\uFF1A

\u8F93\u51FA\u683C\u5F0F\uFF1A
<status_block>
<name>\u89D2\u8272\u540D</name>
<location>\u4F4D\u7F6E</location>
<condition>\u72B6\u6001</condition>
<equipment>\u88C5\u5907</equipment>
<skills>\u6280\u80FD</skills>
</status_block>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["status_block"]},youyouReview:{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",description:"\u5728\u56DE\u590D\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50",enabled:!0,order:5,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["youyou"]},promptTemplate:`\u8BF7\u57FA\u4E8E\u4EE5\u4E0B\u6700\u65B0\u5267\u60C5\u56DE\u590D\uFF0C\u751F\u6210\u201C\u5C0F\u5E7D\u70B9\u8BC4\u201D\u3002

\u786C\u6027\u8981\u6C42\uFF1A
1. \u53EA\u8F93\u51FA\u4E00\u4E2A <youyou>...</youyou> \u5757\uFF0C\u4E0D\u8981\u8F93\u51FA\u5176\u5B83\u8BF4\u660E\u3002
2. <youyou> \u5185\u5148\u5199\u4E00\u6574\u6BB5\u201C\u5C0F\u5E7D\u70B9\u8BC4\u201D\u6B63\u6587\uFF0C\u6B63\u6587\u4E0D\u6362\u884C\uFF0C\u5FC5\u987B\u4F7F\u7528\u5C0F\u5E7D\u7B2C\u4E00\u4EBA\u79F0\u53E3\u543B\uFF0C\u5E26\u4E00\u70B9\u81EA\u5938\u3001\u5410\u69FD\u3001\u7280\u5229\u70B9\u8BC4\u7684\u4E2A\u6027\u3002
3. \u70B9\u8BC4\u5185\u5BB9\u5FC5\u987B\u8986\u76D6\uFF1A\u672C\u6B21\u521B\u4F5C\u4EAE\u70B9\u4E0E\u7EDD\u5999\u4E4B\u5904\u3001\u5267\u60C5\u63A8\u8FDB\u60C5\u51B5\u3001\u4F0F\u7B14\u57CB\u8BBE\u3001\u540E\u7EED\u6CE8\u610F\u4E8B\u9879\u3002
4. \u7ED3\u5C3E\u5355\u72EC\u8FFD\u52A0\u4E00\u4E2A <gouzi>...</gouzi>\uFF0C\u7528\u4E8E\u7559\u4E0B\u5267\u60C5\u94A9\u5B50\u3002
5. <gouzi> \u5FC5\u987B\u653E\u5728 <youyou> \u5185\u90E8\uFF0C\u5E76\u4E14\u5355\u72EC\u6210\u6BB5\uFF0C\u4F46\u6574\u4F53\u4ECD\u53EA\u8FD4\u56DE\u4E00\u4E2A <youyou> \u5757\u3002

\u8F93\u51FA\u6A21\u677F\uFF1A
<youyou>
\u8FD9\u91CC\u662F\u4E00\u6574\u6BB5\u4E0D\u6362\u884C\u70B9\u8BC4\u6B63\u6587
<gouzi>\u8FD9\u91CC\u5199\u5267\u60C5\u94A9\u5B50</gouzi>
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]}},At={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{trigger:{type:"manual",events:[]},execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},toolManage:{id:"toolManage",name:"\u5DE5\u5177\u5217\u8868",icon:"fa-screwdriver-wrench",hasSubTabs:!1,description:"\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u7BA1\u7406\u81EA\u5B9A\u4E49\u5DE5\u5177",component:"ToolManagePanel",order:3},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel"}]},bypass:{id:"bypass",name:"\u7834\u9650\u8BCD",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406\u7834\u9650\u8BCD\u9884\u8BBE",component:"BypassPanel",order:5},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:6}},Gn={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},Oe={...At};Ha={TOOL_REGISTRY:At,TOOL_CATEGORIES:Gn,registerTool:Hn,unregisterTool:Wn,getToolList:qn,getToolConfig:Kt,hasTool:Lr,getToolSubTabs:Kn,resetToolRegistry:Vn,setToolApiPreset:Jn,getToolApiPreset:Ur,clearToolApiPreset:Qn,getAllToolApiBindings:Xn,onPresetDeleted:Zn,saveToolWindowState:so,getToolWindowState:ro,getToolBaseConfig:ks,ensureToolRuntimeConfig:$s,getToolFullConfig:Q,patchToolRuntime:Mt,saveToolConfig:je,resetToolConfig:eo,getAllDefaultToolConfigs:to,getAllToolFullConfigs:Br,getEnabledTools:Ds}});var _e,jr=D(()=>{ke();Is();Pt();_e={id:"toolManagePanel",_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let s=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!s){y("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}s.switchMainTab("tools"),s.switchSubTab("tools",t)},render(t){let e=dt();return`
      <div class="yyt-tool-manager">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-circle-info"></i>
            <span>\u8BF4\u660E</span>
          </div>
          <div class="yyt-tool-manage-hint">
            \u5728\u8FD9\u91CC\u65B0\u5EFA\u7684\u5DE5\u5177\u4F1A\u81EA\u52A8\u51FA\u73B0\u5728\u4E0A\u65B9\u201C\u5DE5\u5177\u201D\u9875\u7B7E\u91CC\uFF0C\u53EF\u7EE7\u7EED\u914D\u7F6E\u6A21\u677F\u3001\u63D0\u53D6\u89C4\u5219\u3001API \u9884\u8BBE\uFF0C\u5E76\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002
          </div>
        </div>

        <!-- \u5DE5\u5177\u5217\u8868 -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-tools"></i>
            <span>\u5DE5\u5177\u5217\u8868</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-add-tool" style="margin-left: auto;">
              <i class="fa-solid fa-plus"></i> \u65B0\u5EFA\u5DE5\u5177
            </button>
          </div>
          <div class="yyt-tool-list">
            ${this._renderToolList(e)}
          </div>
        </div>
        
        <!-- \u5E95\u90E8\u64CD\u4F5C -->
        <div class="yyt-panel-footer">
          <div class="yyt-footer-left">
            <button class="yyt-btn yyt-btn-secondary" id="yyt-import-tools">
              <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="yyt-export-tools">
              <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
            </button>
            <input type="file" id="yyt-import-tools-file" accept=".json" style="display:none">
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="yyt-reset-tools">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
            </button>
          </div>
        </div>
      </div>
    `},_renderToolList(t){let e=Object.entries(t);return e.length?e.map(([s,r])=>`
      <div class="yyt-tool-item ${r.enabled?"yyt-enabled":"yyt-disabled"}" data-tool-id="${s}">
        <div class="yyt-tool-header">
          <div class="yyt-tool-info">
            <span class="yyt-tool-name">${x(r.name)}</span>
            <span class="yyt-tool-category">${x(r.category)}</span>
          </div>
          <div class="yyt-tool-controls">
            <label class="yyt-toggle yyt-tool-toggle">
              <input type="checkbox" ${r.enabled?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="yyt-tool-desc">${x(r.description)}</div>
        <div class="yyt-tool-actions">
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-action="config">
            <i class="fa-solid fa-sliders"></i> \u914D\u7F6E
          </button>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-action="edit">
            <i class="fa-solid fa-pen"></i> \u7F16\u8F91
          </button>
          <button class="yyt-btn yyt-btn-small yyt-btn-danger" data-action="delete">
            <i class="fa-solid fa-trash"></i> \u5220\u9664
          </button>
        </div>
      </div>
    `).join(""):`
        <div class="yyt-empty-state-small">
          <i class="fa-solid fa-toolbox"></i>
          <span>\u8FD8\u6CA1\u6709\u81EA\u5B9A\u4E49\u5DE5\u5177\uFF0C\u70B9\u51FB\u53F3\u4E0A\u89D2\u201C\u65B0\u5EFA\u5DE5\u5177\u201D\u5F00\u59CB\u521B\u5EFA</span>
        </div>
      `},bindEvents(t,e){let s=O();!s||!z(t)||(this._bindToolEvents(t,s),this._bindFileEvents(t,s))},_bindToolEvents(t,e){t.find(".yyt-tool-toggle input").on("change",s=>{let r=e(s.currentTarget).closest(".yyt-tool-item"),n=r.data("tool-id"),o=e(s.currentTarget).is(":checked");Ir(n,o),r.toggleClass("yyt-enabled",o).toggleClass("yyt-disabled",!o),y("info",o?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.find("#yyt-add-tool").on("click",()=>{this._showToolEditDialog(t,e,null)}),t.find('.yyt-tool-item [data-action="config"]').on("click",s=>{let r=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._openToolConfig(r)}),t.find('.yyt-tool-item [data-action="edit"]').on("click",s=>{let r=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._showToolEditDialog(t,e,r)}),t.find('.yyt-tool-item [data-action="delete"]').on("click",s=>{let r=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id"),n=_t(r);if(!r||!n||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177\u201C${n.name}\u201D\u5417\uFF1F`))return;if(!Cr(r)){y("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),y("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.find("#yyt-import-tools").on("click",()=>{t.find("#yyt-import-tools-file").click()}),t.find("#yyt-import-tools-file").on("change",async s=>{let r=s.target.files[0];if(r){try{let n=await ze(r),o=$r(n,{overwrite:!1});y(o.success?"success":"error",o.message),o.success&&this.renderTo(t)}catch(n){y("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}e(s.target).val("")}}),t.find("#yyt-export-tools").on("click",()=>{try{let s=kr();Ue(s,`youyou_toolkit_tools_${Date.now()}.json`),y("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){y("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find("#yyt-reset-tools").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(Dr(),this.renderTo(t),y("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,s){let r=s?_t(s):null,n=!!r,o=`
      <div class="yyt-dialog-overlay" id="yyt-tool-dialog-overlay">
        <div class="yyt-dialog yyt-dialog-wide">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${n?"\u7F16\u8F91\u5DE5\u5177":"\u65B0\u5EFA\u5DE5\u5177"}</span>
            <button class="yyt-dialog-close" id="yyt-tool-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u5DE5\u5177\u540D\u79F0</label>
                <input type="text" class="yyt-input" id="yyt-tool-name" 
                       value="${r?x(r.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u5206\u7C7B</label>
                <select class="yyt-select" id="yyt-tool-category">
                  <option value="api" ${r?.category==="api"?"selected":""}>API</option>
                  <option value="prompt" ${r?.category==="prompt"?"selected":""}>Prompt</option>
                  <option value="utility" ${r?.category==="utility"?"selected":""}>Utility</option>
                </select>
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0</label>
              <input type="text" class="yyt-input" id="yyt-tool-desc" 
                     value="${r?x(r.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u8D85\u65F6\u65F6\u95F4(ms)</label>
                <input type="number" class="yyt-input" id="yyt-tool-timeout" 
                       value="${r?.config?.execution?.timeout||6e4}">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u91CD\u8BD5\u6B21\u6570</label>
                <input type="number" class="yyt-input" id="yyt-tool-retries" 
                       value="${r?.config?.execution?.retries||3}">
              </div>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="yyt-tool-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="yyt-tool-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;e("#yyt-tool-dialog-overlay").remove(),t.append(o);let a=e("#yyt-tool-dialog-overlay"),i=()=>a.remove();a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",i),a.on("click",function(l){l.target===this&&i()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let l=e("#yyt-tool-name").val().trim(),c=e("#yyt-tool-category").val(),d=e("#yyt-tool-desc").val().trim(),p=parseInt(e("#yyt-tool-timeout").val())||6e4,b=parseInt(e("#yyt-tool-retries").val())||3;if(!l){y("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let f=s||`tool_${Date.now()}`;if(!Cs(f,{name:l,category:c,description:d,promptTemplate:r?.promptTemplate||"",extractTags:Array.isArray(r?.extractTags)?r.extractTags:[],config:{trigger:r?.config?.trigger||{type:"manual",events:[]},execution:{timeout:p,retries:b},api:r?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(r?.config?.messages)?r.config.messages:[],context:{depth:r?.config?.context?.depth||3,includeTags:Array.isArray(r?.config?.context?.includeTags)?r.config.context.includeTags:[],excludeTags:Array.isArray(r?.config?.context?.excludeTags)?r.config.context.excludeTags:[]}},enabled:r?.enabled!==!1})){y("error",n?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}$s(f),i(),this.renderTo(t),y("success",n?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),n||this._openToolConfig(f)})},destroy(t){!O()||!z(t)||t.find("*").off()},getStyles(){return`
      /* \u5DE5\u5177\u7BA1\u7406\u9762\u677F\u6837\u5F0F */
      .yyt-tool-manager {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      
      .yyt-tool-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: 300px;
        overflow-y: auto;
      }

      .yyt-tool-manage-hint {
        font-size: 13px;
        color: var(--yyt-text-secondary);
        line-height: 1.7;
      }
      
      .yyt-tool-item {
        padding: 14px;
        background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        transition: all 0.2s ease;
      }
      
      .yyt-tool-item:hover {
        border-color: rgba(255, 255, 255, 0.15);
      }
      
      .yyt-tool-item.yyt-disabled {
        opacity: 0.5;
      }
      
      .yyt-tool-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }
      
      .yyt-tool-info {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .yyt-tool-name {
        font-weight: 600;
        font-size: 14px;
        color: var(--yyt-text);
      }
      
      .yyt-tool-category {
        font-size: 11px;
        padding: 2px 8px;
        background: rgba(123, 183, 255, 0.1);
        border-radius: 4px;
        color: var(--yyt-accent);
      }
      
      .yyt-tool-desc {
        font-size: 12px;
        color: var(--yyt-text-muted);
        margin-bottom: 10px;
      }

      .yyt-tool-actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      
      .yyt-dialog-wide {
        width: 480px;
      }
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var oo={};X(oo,{BypassManager:()=>Os,DEFAULT_BYPASS_PRESETS:()=>Ye,addMessage:()=>si,buildBypassMessages:()=>ii,bypassManager:()=>R,createPreset:()=>Va,default:()=>li,deleteMessage:()=>ni,deletePreset:()=>Qa,duplicatePreset:()=>Xa,exportPresets:()=>oi,getAllPresets:()=>qa,getDefaultPresetId:()=>Za,getEnabledMessages:()=>ti,getPreset:()=>Ka,getPresetList:()=>Yr,importPresets:()=>ai,setDefaultPresetId:()=>ei,updateMessage:()=>ri,updatePreset:()=>Ja});var Ge,Ct,Gr,Ye,Wa,Os,R,qa,Yr,Ka,Va,Ja,Qa,Xa,Za,ei,ti,si,ri,ni,oi,ai,ii,li,Vt=D(()=>{We();oe();Ge="bypass_presets",Ct="default_bypass_preset",Gr="current_bypass_preset",Ye={},Wa=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),Os=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=h.get(Ge,{});return this._cache={...Ye,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((s,r)=>(r.updatedAt||0)-(s.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:s,name:r,description:n,messages:o}=e;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=s.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let i={id:a,name:r.trim(),description:n||"",enabled:!0,messages:o||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,i),E.emit(w.BYPASS_PRESET_CREATED,{presetId:a,preset:i}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${r}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,s){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let n={...r,...s,id:e,updatedAt:Date.now()};return this._savePreset(e,n),E.emit(w.BYPASS_PRESET_UPDATED,{presetId:e,preset:n}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u66F4\u65B0\u6210\u529F`,preset:n}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(Ye[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r=h.get(Ge,{});return delete r[e],h.set(Ge,r),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),E.emit(w.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,s,r){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${e}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(n)),id:s.trim(),name:r||`${n.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),o),E.emit(w.BYPASS_PRESET_CREATED,{presetId:s,preset:o}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${o.name}"`,preset:o}}addMessage(e,s){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n={id:`msg_${Date.now()}`,role:s.role||"SYSTEM",content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1},o=[...r.messages||[],n];return this.updatePreset(e,{messages:o})}updateMessage(e,s,r){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=n.messages||[],a=o.findIndex(l=>l.id===s);if(a===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let i=[...o];return i[a]={...i[a],...r},this.updatePreset(e,{messages:i})}deleteMessage(e,s){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=r.messages||[],o=n.find(i=>i.id===s);if(!o)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(o.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=n.filter(i=>i.id!==s);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let s=this.getPreset(e);return!s||!s.enabled?[]:(s.messages||[]).filter(r=>r.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=h.get(Ct,null);return e==="undefined"||e==="null"||e===""?(h.remove(Ct),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(h.set(Ct,e),E.emit(w.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let r=this.getPreset(e);if(!r)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(e,s={}){let{overwrite:r=!1}=s,n;try{n=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let o=Array.isArray(n)?n:n.presets?n.presets:[n];if(o.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let a=h.get(Ge,{}),i=0;for(let l of o)!l.id||typeof l.id!="string"||l.name&&(Ye[l.id]&&!r||!r&&a[l.id]||(a[l.id]={...l,updatedAt:Date.now()},i++));return i>0&&(h.set(Ge,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u9884\u8BBE`,imported:i}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let s=e?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(e){let s=this.getToolBypassPreset(e);return s?this.getEnabledMessages(s.id):[]}_savePreset(e,s){let r=h.get(Ge,{});r[e]=s,h.set(Ge,r),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=h.get(Ge,{}),s={},r=!1,n=Array.isArray(e)?e.map((o,a)=>[o?.id||o?.name||`legacy_${a}`,o]):Object.entries(e||{});for(let[o,a]of n){let i=this._normalizePreset(o,a,s);if(!i){r=!0;continue}s[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(r=!0)}r&&h.set(Ge,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(e,s,r={}){if(!s||typeof s!="object")return null;let n=typeof s.name=="string"?s.name.trim():"",o=typeof s.id=="string"?s.id.trim():"",a=typeof e=="string"?e.trim():"";if(!n&&a&&a!=="undefined"&&a!=="null"&&(n=a),this._isLegacySamplePreset(n,o)||(!o&&a&&a!=="undefined"&&a!=="null"&&(o=a),!o&&n&&n!=="undefined"&&n!=="null"&&(o=this._generatePresetId(n,r)),!n||!o||o==="undefined"||n==="undefined"))return null;let l=Array.isArray(s.messages)?s.messages.filter(c=>c&&typeof c=="object").map((c,d)=>({id:typeof c.id=="string"&&c.id.trim()?c.id.trim():`${o}_msg_${d+1}`,role:c.role||"SYSTEM",content:typeof c.content=="string"?c.content:"",enabled:c.enabled!==!1,deletable:c.deletable!==!1})):[];return{...s,id:o,name:n,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:l,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(e){let s=h.get(Ct,null),r=h.get(Gr,null),n=s??r;(n==="undefined"||n==="null"||n==="")&&(n=null),n&&!e[n]&&(n=Object.values(e).find(a=>a.name===n)?.id||null),n?h.set(Ct,n):h.remove(Ct),h.has(Gr)&&h.remove(Gr)}_isLegacySamplePreset(e,s=""){return e?s==="standard"||s==="enhanced"||s==="jailbreak"||Wa.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,s={}){let r=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,n=r,o=1;for(;s[n];)n=`${r}_${o++}`;return n}_log(...e){this.debugMode&&console.log("[BypassManager]",...e)}},R=new Os,qa=()=>R.getAllPresets(),Yr=()=>R.getPresetList(),Ka=t=>R.getPreset(t),Va=t=>R.createPreset(t),Ja=(t,e)=>R.updatePreset(t,e),Qa=t=>R.deletePreset(t),Xa=(t,e,s)=>R.duplicatePreset(t,e,s),Za=()=>R.getDefaultPresetId(),ei=t=>R.setDefaultPresetId(t),ti=t=>R.getEnabledMessages(t),si=(t,e)=>R.addMessage(t,e),ri=(t,e,s)=>R.updateMessage(t,e,s),ni=(t,e)=>R.deleteMessage(t,e),oi=t=>R.exportPresets(t),ai=(t,e)=>R.importPresets(t,e),ii=t=>R.buildBypassMessages(t),li=R});var ao={};X(ao,{DEFAULT_SETTINGS:()=>Jt,SettingsService:()=>Ns,default:()=>ci,settingsService:()=>be});var Jt,Fr,Ns,be,ci,Qt=D(()=>{We();oe();Jt={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},listener:{listenGenerationEnded:!0,ignoreQuietGeneration:!0,ignoreAutoTrigger:!1,debounceMs:300},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue"}},Fr="settings_v2",Ns=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=h.get(Fr,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),h.set(Fr,this._cache),E.emit(w.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let s=this.getSettings(),r=this._deepMerge(s,e);this.saveSettings(r)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getListenerSettings(){return this.getSettings().listener}updateListenerSettings(e){this.updateSettings({listener:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(Jt)),h.set(Fr,this._cache),E.emit(w.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,s=null){let r=this.getSettings(),n=e.split("."),o=r;for(let a of n)if(o&&typeof o=="object"&&a in o)o=o[a];else return s;return o}set(e,s){let r=JSON.parse(JSON.stringify(this.getSettings())),n=e.split("."),o=r;for(let a=0;a<n.length-1;a++){let i=n[a];i in o||(o[i]={}),o=o[i]}o[n[n.length-1]]=s,this.saveSettings(r)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(Jt)),e)}_deepMerge(e,s){let r={...e};for(let n in s)s[n]&&typeof s[n]=="object"&&!Array.isArray(s[n])?r[n]=this._deepMerge(e[n]||{},s[n]):r[n]=s[n];return r}},be=new Ns,ci=be});var uo={};X(uo,{abortAllTasks:()=>gi,abortTask:()=>yi,buildToolMessages:()=>co,clearExecutionHistory:()=>xi,createExecutionContext:()=>Ei,createResult:()=>Ls,enhanceMessagesWithBypass:()=>Si,executeBatch:()=>pi,executeTool:()=>lo,executeToolWithConfig:()=>Us,executeToolsBatch:()=>Mi,executorState:()=>W,extractFailed:()=>wi,extractSuccessful:()=>Ti,generateTaskId:()=>pt,getExecutionHistory:()=>hi,getExecutorStatus:()=>bi,getScheduler:()=>It,getToolsForEvent:()=>Wr,mergeResults:()=>vi,pauseExecutor:()=>fi,resumeExecutor:()=>mi,setMaxConcurrent:()=>ui});function Ls(t,e,s,r,n,o,a=0){return{success:s,taskId:t,toolId:e,data:r,error:n,duration:o,retries:a,timestamp:Date.now(),metadata:{}}}function pt(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function di(t,e={}){return{id:pt(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function It(){return Xt||(Xt=new Hr(W.maxConcurrent)),Xt}function ui(t){W.maxConcurrent=Math.max(1,Math.min(10,t)),Xt&&(Xt.maxConcurrent=W.maxConcurrent)}async function lo(t,e={},s){let r=It(),n=di(t,e);for(;W.isPaused;)await new Promise(o=>setTimeout(o,100));try{let o=await r.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},n);return io(o),o}catch(o){let a=Ls(n.id,t,!1,null,o,Date.now()-n.createdAt,n.retries);return io(a),a}}async function pi(t,e={}){let{failFast:s=!1,concurrency:r=W.maxConcurrent}=e,n=[],o=It(),a=o.maxConcurrent;o.maxConcurrent=r;try{let i=t.map(({toolId:l,options:c,executor:d})=>lo(l,c,d));if(s)for(let l of i){let c=await l;if(n.push(c),!c.success){o.abortAll();break}}else{let l=await Promise.allSettled(i);for(let c of l)c.status==="fulfilled"?n.push(c.value):n.push(Ls(pt(),"unknown",!1,null,c.reason,0,0))}}finally{o.maxConcurrent=a}return n}function yi(t){return It().abort(t)}function gi(){It().abortAll(),W.executionQueue=[]}function fi(){W.isPaused=!0}function mi(){W.isPaused=!1}function bi(){return{...It().getStatus(),isPaused:W.isPaused,activeControllers:W.activeControllers.size,historyCount:W.executionHistory.length}}function io(t){W.executionHistory.push(t),W.executionHistory.length>100&&W.executionHistory.shift()}function hi(t={}){let e=[...W.executionHistory];return t.toolId&&(e=e.filter(s=>s.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(s=>s.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function xi(){W.executionHistory=[]}function vi(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of t)e.totalDuration+=s.duration,s.success?(e.successCount++,s.data!==void 0&&s.data!==null&&e.data.push(s.data)):(e.success=!1,e.failureCount++,s.error&&e.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return e}function Ti(t){return t.filter(e=>e.success).map(e=>e.data)}function wi(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function Ei(t={}){return{taskId:pt(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function Si(t,e){return!e||e.length===0?t:[...e,...t]}function _i(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function co(t,e){let s=[],r=t.promptTemplate||"",n={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[o,a]of Object.entries(n))r=r.replace(new RegExp(_i(o),"g"),a);return s.push({role:"USER",content:r}),s}async function Us(t,e,s={}){let r=Q(t);if(!r)return{success:!1,taskId:pt(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!r.enabled)return{success:!1,taskId:pt(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let n=Date.now(),o=pt();try{E.emit(w.TOOL_EXECUTION_STARTED,{toolId:t,taskId:o,context:e});let a=co(r,e);if(typeof s.callApi=="function"){let i=r.output?.apiPreset||r.apiPreset||"",l=i?{preset:i}:null,c=await s.callApi(a,l,s.signal),d=c;r.outputMode==="separate"&&r.extractTags?.length>0&&(d=Ai(c,r.extractTags));let p={success:!0,taskId:o,toolId:t,data:d,duration:Date.now()-n};return E.emit(w.TOOL_EXECUTED,{toolId:t,taskId:o,result:p}),p}else return{success:!0,taskId:o,toolId:t,data:{messages:a,config:{apiPreset:r.output?.apiPreset||r.apiPreset||"",outputMode:r.outputMode,extractTags:r.extractTags}},duration:Date.now()-n,needsExecution:!0}}catch(a){let i={success:!1,taskId:o,toolId:t,error:a.message||String(a),duration:Date.now()-n};return E.emit(w.TOOL_EXECUTION_FAILED,{toolId:t,taskId:o,error:a}),i}}function Ai(t,e){let s={};for(let r of e){let n=new RegExp(`<${r}[^>]*>([\\s\\S]*?)<\\/${r}>`,"gi"),o=t.match(n);o&&(s[r]=o.map(a=>{let i=a.match(new RegExp(`<${r}[^>]*>([\\s\\S]*?)<\\/${r}>`,"i"));return i?i[1].trim():""}))}return s}async function Mi(t,e,s={}){let r=[];for(let n of t){let o=Q(n);if(o&&o.enabled){let a=await Us(n,e,s);r.push(a)}}return r}function Wr(t){let e=[],s=Ds();for(let r of s){let n=r?.trigger?.enabled&&r?.trigger?.event===t,o=Array.isArray(r?.triggerEvents)&&r.triggerEvents.includes(t);r&&r.enabled&&(n||o)&&e.push(r)}return e}var W,Hr,Xt,qr=D(()=>{Pt();oe();W={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};Hr=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,s){return new Promise((r,n)=>{this.queue.push({executor:e,task:s,resolve:r,reject:n}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:s,task:r,resolve:n,reject:o}=e,a=new AbortController;r.abortController=a,r.status="running",r.startedAt=Date.now(),this.running.set(r.id,r),W.activeControllers.set(r.id,a),this.executeTask(s,r,a.signal).then(i=>{r.status="completed",r.completedAt=Date.now(),n(i)}).catch(i=>{r.status=i.name==="AbortError"?"aborted":"failed",r.completedAt=Date.now(),o(i)}).finally(()=>{this.running.delete(r.id),W.activeControllers.delete(r.id),W.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,s,r){let n=Date.now(),o=null;for(let a=0;a<=s.maxRetries;a++){if(r.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(r);return Ls(s.id,s.toolId,!0,i,null,Date.now()-n,a)}catch(i){if(o=i,i.name==="AbortError")throw i;a<s.maxRetries&&(await this.delay(1e3*(a+1)),s.retries=a+1)}}throw o}delay(e){return new Promise(s=>setTimeout(s,e))}abort(e){let s=W.activeControllers.get(e);return s?(s.abort(),!0):!1}abortAll(){for(let e of W.activeControllers.values())e.abort();W.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},Xt=null});var yo={};X(yo,{ContextInjector:()=>js,DEFAULT_INJECTION_OPTIONS:()=>po,WRITEBACK_METHODS:()=>Zt,WRITEBACK_RESULT_STATUS:()=>Bs,contextInjector:()=>Gs,default:()=>Pi});var Ae,zs,po,Bs,Zt,js,Gs,Pi,Kr=D(()=>{oe();Ae="YouYouToolkit_toolOutputs",zs="YouYouToolkit_injectedContext",po={overwrite:!0,enabled:!0},Bs={SUCCESS:"success",FAILED:"failed"},Zt={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},js=class{constructor(){this.debugMode=!1}async inject(e,s,r={}){return(await this.injectDetailed(e,s,r)).success}async injectDetailed(e,s,r={}){let n={...po,...r},o=this._createWritebackResult(e,n);if(!e||s===void 0||s===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),o.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",o;let a=o.chatId,i={toolId:e,content:String(s),updatedAt:Date.now(),sourceMessageId:r.sourceMessageId||null,options:n};E.emit(w.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:i.content,options:n});let l=await this._insertToolOutputToLatestAssistantMessage(e,i,n,o);return l.success&&this._log(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,l),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:s}=this._getChatRuntime(),r=this._findAssistantMessageIndex(s,e);if(r<0)return"";let n=s[r]||{},o=n[zs];if(typeof o=="string"&&o.trim())return o.trim();let a=n[Ae];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(s){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",s),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),s=this._findAssistantMessageIndex(e,null);if(s<0)return{};let n=(e[s]||{})[Ae];return n&&typeof n=="object"?n:{}}catch(e){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",e),{}}}getToolContext(e,s){if(!s)return null;try{let{chat:r}=this._getChatRuntime(),n=this._findAssistantMessageIndex(r,null);return n<0?null:r[n]?.[Ae]?.[s]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,s){if(!s)return!1;try{let{api:r,context:n,chat:o}=this._getChatRuntime(),a=this._findAssistantMessageIndex(o,null);if(a<0)return!1;let i=o[a],l=i?.[Ae];if(!l||!l[s])return!1;delete l[s],i[Ae]=l,i[zs]=this._buildMessageInjectedContext(l);let c=n?.saveChat||r?.saveChat||null;return typeof c=="function"&&await c.call(n||r),E.emit(w.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:s}),!0}catch(r){return this._log("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",r),!1}}async clearAllContext(e){try{let{api:s,context:r,chat:n}=this._getChatRuntime(),o=this._findAssistantMessageIndex(n,null);if(o<0)return!1;let a=n[o];delete a[Ae],delete a[zs];let i=r?.saveChat||s?.saveChat||null;return typeof i=="function"&&await i.call(r||s),E.emit(w.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(s){return this._log("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",s),!1}}clearAllChatsContexts(){this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,s){return!!this.getToolContext(e,s)}getContextSummary(e){let s=this._getLatestAssistantMessageOutputs(),r=Object.entries(s).map(([n,o])=>({toolId:n,updatedAt:o.updatedAt,contentLength:o.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:r,totalCount:r.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,s={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,s=e.SillyTavern||null,r=s?.getContext?.()||null,n=Array.isArray(r?.chat)?r.chat:[],o=Array.isArray(s?.chat)?s.chat:[],a=n.length?n:o;return{topWindow:e,api:s,context:r,chat:a,contextChat:n,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,s={}){return{success:!1,toolId:e,chatId:this._getCurrentChatId(),sourceMessageId:s.sourceMessageId||null,messageIndex:-1,textField:"",hostUpdateMethod:Zt.NONE,writebackStatus:Bs.FAILED,error:"",errors:[],steps:{foundTargetMessage:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1},verification:{textIncludesContent:!1,mirrorStored:!1}}}_syncMessageToRuntimeChats(e,s,r){let{contextChat:n,apiChat:o}=e||{},a=i=>{!Array.isArray(i)||s<0||s>=i.length||i[s]!==r&&(i[s]={...i[s]||{},...r})};a(n),a(o)}_notifyMessageUpdated(e,s){try{let{api:r,topWindow:n}=e||{},o=r?.eventSource||null,i=(r?.eventTypes||{}).MESSAGE_UPDATED||"MESSAGE_UPDATED";o&&typeof o.emit=="function"&&(o.emit(i,s),typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(()=>{o.emit(i,s)}):typeof n?.setTimeout=="function"&&n.setTimeout(()=>{o.emit(i,s)},30))}catch(r){this._log("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",r)}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let s=String(e.role||"").toLowerCase();return s==="assistant"||s==="ai"||!s}_findAssistantMessageIndex(e,s){let r=Array.isArray(e)?e:[];if(!r.length)return-1;let n=(o,a)=>{if(!this._isAssistantMessage(o)||s==null||s==="")return!1;let i=String(s).trim();return i?[o.message_id,o.id,o.messageId,o.mes_id,o.swipe_id,a].map(c=>c==null?"":String(c).trim()).includes(i):!1};for(let o=r.length-1;o>=0;o-=1)if(n(r[o],o))return o;for(let o=r.length-1;o>=0;o-=1)if(this._isAssistantMessage(r[o]))return o;return-1}_buildMessageInjectedContext(e){let r=Object.entries(e&&typeof e=="object"?e:{}).sort(([,o],[,a])=>(o?.updatedAt||0)-(a?.updatedAt||0));if(!r.length)return"";let n=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[o,a]of r)n.push(`[${o}]`),n.push(a?.content||""),n.push("");return n.join(`
`)}_getWritableMessageField(e){let s=["mes","message","content","text"];for(let r of s)if(typeof e?.[r]=="string")return{key:r,text:e[r]};return{key:"mes",text:""}}_applyMessageText(e,s){let r=e&&typeof e=="object"?e:{},n=["mes","message","content","text"],o=!1;return n.forEach(a=>{typeof r[a]=="string"&&(r[a]=s,o=!0)}),o||(r.mes=s,r.message=s),r}_stripExistingToolOutput(e,s=[]){let r=String(e||"");return(Array.isArray(s)?s:[]).forEach(o=>{let a=String(o||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let d=new RegExp(a.slice(6).trim(),"gis");r=r.replace(d,"")}catch(d){this._log("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",a,d)}return}let i=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),c=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");r=r.replace(l,""),r=r.replace(c,"")}),r.trimEnd()}_stripPreviousStoredToolContent(e,s){let r=String(e||""),n=String(s||"").trim();return n?r.replace(n,"").trimEnd():r.trimEnd()}async _insertToolOutputToLatestAssistantMessage(e,s,r={},n=null){let o=n||this._createWritebackResult(e,r);try{let a=this._getChatRuntime(),{api:i,context:l,chat:c}=a;if(!Array.isArray(c)||!c.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),o.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",o;let d=this._findAssistantMessageIndex(c,r.sourceMessageId);if(d<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),o.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",o;o.messageIndex=d,o.steps.foundTargetMessage=!0;let p=c[d],{key:b,text:f}=this._getWritableMessageField(p);o.textField=b;let _=p[Ae]&&typeof p[Ae]=="object"?p[Ae]:{},Z=_?.[e]?.content||"",K=r.overwrite===!1?String(f||""):this._stripPreviousStoredToolContent(this._stripExistingToolOutput(f,r.extractionSelectors),Z),se=String(s.content||"").trim(),j=[K.trimEnd(),se].filter(Boolean).join(`

`).trim(),re={..._,[e]:{toolId:e,content:se,updatedAt:s.updatedAt,sourceMessageId:s.sourceMessageId||null}};p[b]=j,this._applyMessageText(p,j),p[Ae]=re,p[zs]=this._buildMessageInjectedContext(re),o.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,d,p),o.steps.runtimeSynced=!0;let v=l?.setChatMessages||i?.setChatMessages||a?.topWindow?.setChatMessages||null,S=l?.setChatMessage||i?.setChatMessage||a?.topWindow?.setChatMessage||null,M=!1;if(typeof v=="function")try{await v.call(l||i||a?.topWindow,[{message_id:d,message:j,mes:j,content:j,text:j}],{refresh:"affected"}),o.steps.hostSetChatMessages=!0,o.hostUpdateMethod=Zt.SET_CHAT_MESSAGES,M=!0}catch(V){this._log("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",V),o.errors.push(`setChatMessages: ${V?.message||String(V)}`)}if(!M&&typeof S=="function")try{await S.call(l||i||a?.topWindow,{message:j,mes:j,content:j,text:j},d),o.steps.hostSetChatMessage=!0,o.hostUpdateMethod=Zt.SET_CHAT_MESSAGE,M=!0}catch(V){this._log("setChatMessage \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",V),o.errors.push(`setChatMessage: ${V?.message||String(V)}`)}if(M||(o.hostUpdateMethod=Zt.LOCAL_ONLY),typeof S=="function")try{await S.call(l||i||a?.topWindow,{},d)}catch(V){this._log("\u4F7F\u7528\u7A7A setChatMessage \u5F3A\u5236\u5237\u65B0\u5931\u8D25",V),o.errors.push(`setChatMessage(refresh): ${V?.message||String(V)}`)}let me=l?.saveChat||i?.saveChat||null,ne=l?.saveChatDebounced||i?.saveChatDebounced||null;typeof ne=="function"&&(ne.call(l||i),o.steps.saveChatDebounced=!0),typeof me=="function"&&(await me.call(l||i),o.steps.saveChat=!0),this._notifyMessageUpdated(a,d),o.steps.notifiedMessageUpdated=!0;let pe=a?.contextChat?.[d]||a?.apiChat?.[d]||c[d]||p,I=this._getWritableMessageField(pe).text||"",ie=String(s.content||"").trim(),ye=pe?.[Ae]?.[e];return o.verification.textIncludesContent=ie?I.includes(ie):!0,o.verification.mirrorStored=!!(ye&&String(ye.content||"").trim()===ie),o.steps.verifiedAfterWrite=o.verification.textIncludesContent&&o.verification.mirrorStored,o.success=o.steps.localTextApplied&&o.steps.runtimeSynced&&o.steps.verifiedAfterWrite,o.writebackStatus=o.success?Bs.SUCCESS:Bs.FAILED,!o.success&&!o.error&&(o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587: ${e} -> #${d}`),o}catch(a){return this._log("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",a),o.error=a?.message||String(a),o.errors.push(o.error),o}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext(),n=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(n)return n;let o=e.SillyTavern?.this_chid;if(o!=null)return`chat_char_${o}`}return"chat_default"}catch{return"chat_default"}}_log(...e){this.debugMode&&console.log("[ContextInjector]",...e)}},Gs=new js,Pi=Gs});var fo={};X(fo,{BUILTIN_VARIABLES:()=>go,VariableResolver:()=>Ys,default:()=>Ci,variableResolver:()=>Je});var go,Ys,Je,Ci,Vr=D(()=>{oe();go={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},Ys=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,s){if(typeof e!="string")return e;let r=e;return r=this._resolveBuiltinVariables(r,s),r=this._resolveCustomVariables(r,s),r=this._resolveRegexVariables(r,s),r}resolveObject(e,s){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(n=>this.resolveObject(n,s));let r={};for(let[n,o]of Object.entries(e))typeof o=="string"?r[n]=this.resolveTemplate(o,s):typeof o=="object"&&o!==null?r[n]=this.resolveObject(o,s):r[n]=o;return r}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,s){e&&(this.customVariables.set(e,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,s){!e||typeof s!="function"||(this.variableHandlers.set(e,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,s]of Object.entries(go))e.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,r]of this.customVariables)e.push({name:`{{${s}}}`,description:typeof r=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},r={};for(let n of this.getAvailableVariables())r[n.category]||(r[n.category]=[]),r[n.category].push(n);for(let[n,o]of Object.entries(s))if(r[n]&&r[n].length>0){e.push(`\u3010${o}\u3011`);for(let a of r[n])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,s)=>(s.regexResults||s.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,s){let r=e;return r=r.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),r=r.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),r=r.replace(/\{\{chatHistory\}\}/gi,()=>{let n=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(n)}),r=r.replace(/\{\{characterCard\}\}/gi,()=>{let n=s.characterCard||s.raw?.characterCard;return n?this._formatCharacterCard(n):""}),r=r.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),r=r.replace(/\{\{toolId\}\}/gi,s.toolId||s.raw?.toolId||""),r=r.replace(/\{\{toolPromptMacro\}\}/gi,s.toolPromptMacro||s.raw?.toolPromptMacro||""),r=r.replace(/\{\{toolContentMacro\}\}/gi,s.toolContentMacro||s.raw?.toolContentMacro||""),r=r.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),r=r.replace(/\{\{extractedContent\}\}/gi,s.extractedContent||s.raw?.extractedContent||""),r=r.replace(/\{\{recentMessagesText\}\}/gi,s.recentMessagesText||s.raw?.recentMessagesText||""),r=r.replace(/\{\{rawRecentMessagesText\}\}/gi,s.rawRecentMessagesText||s.raw?.rawRecentMessagesText||""),r=r.replace(/\{\{userMessage\}\}/gi,s.userMessage||s.raw?.userMessage||""),r=r.replace(/\{\{previousToolOutput\}\}/gi,s.previousToolOutput||s.raw?.previousToolOutput||""),r}_resolveCustomVariables(e,s){let r=e;for(let[n,o]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(n)}\\}\\}`,"gi");typeof o=="function"?r=r.replace(a,()=>{try{return o(s)}catch(i){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${n}:`,i),""}}):r=r.replace(a,String(o))}return r}_resolveRegexVariables(e,s){let r=e;for(let[n,o]of this.variableHandlers){let a=new RegExp(`\\{\\{${n}\\.([^}]+)\\}\\}`,"gi");r=r.replace(a,(i,l)=>{try{return o(l,s)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${n}.${l}:`,c),""}})}return r}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(s=>{let r=s.role||"unknown",n=s.content||s.mes||"";return`[${r}]: ${n}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let s=[];return e.name&&s.push(`\u59D3\u540D: ${e.name}`),e.description&&s.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&s.push(`\u6027\u683C: ${e.personality}`),e.scenario&&s.push(`\u573A\u666F: ${e.scenario}`),s.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){this.debugMode&&console.log("[VariableResolver]",...e)}},Je=new Ys,Ci=Je});var bo={};X(bo,{DEFAULT_PROMPT_TEMPLATE:()=>mo,ToolPromptService:()=>Fs,default:()=>Ii,toolPromptService:()=>Hs});var mo,Fs,Hs,Ii,Jr=D(()=>{oe();Vt();Vr();mo="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",Fs=class{constructor(){this.debugMode=!1}_buildVariableContext(e,s={}){let r=this._getPromptTemplate(e),n=Je.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||""}),o=Je.resolveTemplate(r,n).trim(),a=String(s?.toolContentMacro||s?.input?.toolContentMacro||"").trim();return Je.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolPromptMacro:o,toolContentMacro:a})}buildToolMessages(e,s){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let r=[],n=this._buildVariableContext(e,s),o=this._getBypassMessages(e);if(o&&o.length>0)for(let i of o)i.enabled!==!1&&r.push({role:this._normalizeRole(i.role),content:Je.resolveTemplate(i.content||"",n)});let a=this._buildUserContent(this._getPromptTemplate(e),n);return a&&r.push({role:"user",content:a}),this._log(`\u6784\u5EFA\u6D88\u606F: ${r.length} \u6761`),r}buildPromptText(e,s){return this._buildVariableContext(e,s).toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:mo}_getBypassMessages(e){return e.bypass?.enabled?R.buildBypassMessages(e):[]}_buildUserContent(e,s){return!e||!e.trim()?"":Je.resolveTemplate(e,s).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){this.debugMode&&console.log("[ToolPromptService]",...e)}setDebugMode(e){this.debugMode=e}},Hs=new Fs,Ii=Hs});var ho={};X(ho,{LEGACY_OUTPUT_MODES:()=>Ri,OUTPUT_MODES:()=>Qe,TOOL_FAILURE_STAGES:()=>Me,TOOL_RUNTIME_STATUS:()=>ki,TOOL_WRITEBACK_STATUS:()=>de,ToolOutputService:()=>Ws,default:()=>$i,toolOutputService:()=>Rt});var Qe,Ri,ki,Me,de,Ws,Rt,$i,Qr=D(()=>{oe();Qt();Kr();Jr();Ms();ps();Qe={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},Ri={inline:"follow_ai"},ki={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},Me={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},de={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"},Ws=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled?!1:e.output?.mode===Qe.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled)return!1;let s=e.output?.mode;return s===Qe.FOLLOW_AI||s==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,s){let r=Date.now(),n=e.id,o=this._getExtractionSelectors(e),a=e.output?.apiPreset||e.apiPreset||"",i="",l=de.NOT_APPLICABLE,c=null,d=[],p="";this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${n}`),E.emit(w.TOOL_EXECUTION_STARTED,{toolId:n,mode:Qe.POST_RESPONSE_API});try{if(i=Me.BUILD_MESSAGES,d=await this._buildToolMessages(e,s),!d||d.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");this._log(`\u6784\u5EFA\u4E86 ${d.length} \u6761\u6D88\u606F`);let b=await this._getRequestTimeout();i=Me.SEND_API_REQUEST;let f=await this._sendApiRequest(a,d,{timeoutMs:b,signal:s.signal});if(i=Me.EXTRACT_OUTPUT,p=this._extractOutputContent(f,e),p){if(i=Me.INJECT_CONTEXT,c=await Gs.injectDetailed(n,p,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.messageId||"",extractionSelectors:o}),!c?.success)throw l=de.FAILED,new Error(c?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");l=de.SUCCESS}else l=de.SKIPPED_EMPTY_OUTPUT;i="";let _=Date.now()-r;return E.emit(w.TOOL_EXECUTED,{toolId:n,success:!0,duration:_,mode:Qe.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${n}, \u8017\u65F6 ${_}ms`),{success:!0,toolId:n,output:p,duration:_,meta:{messageCount:d.length,selectors:o,apiPreset:a,writebackStatus:l,failureStage:"",writebackDetails:c}}}catch(b){let f=Date.now()-r,_=i||Me.UNKNOWN,Z=l||de.NOT_APPLICABLE;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${n}`,b),E.emit(w.TOOL_EXECUTION_FAILED,{toolId:n,error:b.message||String(b),duration:f}),{success:!1,toolId:n,error:b.message||String(b),duration:f,meta:{messageCount:d.length,selectors:o,apiPreset:a,writebackStatus:Z,failureStage:_,writebackDetails:c}}}}async runToolInline(e,s){let r=Date.now(),n=e.id;try{let o=await this._buildToolMessages(e,s);return{success:!0,toolId:n,messages:o,duration:Date.now()-r}}catch(o){return{success:!1,toolId:n,error:o.message||String(o),duration:Date.now()-r}}}async previewExtraction(e,s){let r=this._buildRecentMessageExtractionEntries(e,s),n=this._joinMessageBlocks(r,"rawText"),o=this._joinMessageBlocks(r,"filteredText"),a=this._joinMessageBlocks(r,"extractedText",{skipEmpty:!0});return{success:!0,sourceText:n,filteredSourceText:o,extractedText:a,messageEntries:r,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,s){let r=this._buildRecentMessageExtractionEntries(e,s),n=this._joinMessageBlocks(r,"rawText"),o=this._joinMessageBlocks(r,"filteredText"),a=this._joinMessageBlocks(r,"extractedText",{skipEmpty:!0}),i={...s,rawRecentMessagesText:n,recentMessagesText:o,extractedContent:a,toolContentMacro:this._buildToolContentMacro(r),toolName:e.name,toolId:e.id};return Hs.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let s=String(e).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,s,r={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:n=9e4,signal:o}=r,a=null;if(e){if(!ar(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=jt(e)}else a=jt();let i=vt(a||{});if(!i.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:n,apiConfig:a},o);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return be.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,s){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,s);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,s);if(e.content)return this._applyOutputExtractionSelectors(e.content,s);if(e.text)return this._applyOutputExtractionSelectors(e.text,s);if(e.message)return this._applyOutputExtractionSelectors(e.message,s);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),s)}catch{return this._applyOutputExtractionSelectors(String(e),s)}}return this._applyOutputExtractionSelectors(String(e),s)}_applyOutputExtractionSelectors(e,s){let r=typeof e=="string"?e:String(e||""),n=this._getExtractionSelectors(s);if(!n.length)return r.trim();let o=[];for(let a of n){let i=String(a||"").trim();if(!i)continue;if(i.startsWith("regex:")){let c=i.slice(6).trim();if(!c)continue;try{let d=new RegExp(c,"gi");[...r.matchAll(d)].forEach(b=>{let f=String(b?.[0]||"").trim();f&&o.push(f)})}catch(d){this._log("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:d})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(r.match(c)||[]).forEach(p=>{let b=String(p||"").trim();b&&o.push(b)})}catch(c){this._log("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}}return o.length>0?o.join(`

`).trim():r.trim()}_getExtractionSelectors(e){let s=e?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(r=>String(r||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(r=>String(r||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,s){return this._applyExtractionSelectorsInternal(e,s,{strict:!1})}_applyExtractionSelectorsInternal(e,s,r={}){let n=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(s),{strict:a=!1}=r;if(!o.length)return n.trim();let i=o.map((c,d)=>{let p=String(c||"").trim(),b=p.startsWith("regex:");return{id:`tool-extract-${d}`,type:b?"regex_include":"include",value:b?p.slice(6).trim():p,enabled:!0}}).filter(c=>c.value),l=lt(n,i,[]);return a?(l||"").trim():l||n.trim()}_extractToolContent(e,s){let r=typeof s=="string"?s:String(s||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(r,e,{strict:!0}):r.trim()}_applyGlobalContextRules(e){let s=typeof e=="string"?e:String(e||"");if(!s.trim())return"";try{let r=Be()||[],n=ct()||[];return!Array.isArray(r)||r.length===0?s.trim():lt(s,r,n)||s.trim()}catch(r){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",r),s.trim()}}_getMessageText(e){if(!e)return"";let s=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let r of s)if(typeof r=="string"&&r.trim())return r.trim();return""}_collectRecentAssistantMessages(e,s){return this._collectRecentAssistantMessageEntries(e,s).map(r=>r.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,s){let r=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),n=Array.isArray(s?.chatMessages)?s.chatMessages:[],o=[];for(let i=n.length-1;i>=0&&o.length<r;i-=1){let l=n[i],c=String(l?.role||"").toLowerCase(),d=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,p=this._getMessageText(l);d&&p&&o.unshift({text:p,message:l,chatIndex:i})}if(o.length>0)return o;let a=s?.lastAiMessage||s?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,s){return this._collectRecentAssistantMessageEntries(e,s).map((n,o)=>{let a=n.text||"",i=this._applyGlobalContextRules(a),l=this._extractToolContent(e,a);return{...n,order:o+1,rawText:a,filteredText:i,extractedText:l}})}_joinMessageBlocks(e,s,r={}){let n=Array.isArray(e)?e:[],{skipEmpty:o=!1}=r;return n.map(i=>{let l=String(i?.[s]||"").trim();return o&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(n=>{let o=`\u3010\u7B2C ${n?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(n?.filteredText||"").trim()||"(\u7A7A)",i=String(n?.extractedText||"").trim()||"(\u7A7A)";return`${o}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(e){this.debugMode=e}_log(...e){(this.debugMode||be.getDebugSettings()?.enableDebugLog)&&console.log("[ToolOutputService]",...e)}},Rt=new Ws,$i=Rt});var Po={};X(Po,{AUTO_TRIGGER_SKIP_REASONS:()=>ue,EVENT_TYPES:()=>q,TOOL_EXECUTION_PATHS:()=>$t,checkGate:()=>rn,destroyToolTriggerManager:()=>rl,getChatContext:()=>nn,getCurrentCharacter:()=>on,getFullContext:()=>Vi,getToolTriggerManagerState:()=>nl,getWorldbookContent:()=>Eo,initToolTriggerManager:()=>_o,initTriggerModule:()=>Mo,previewToolExtraction:()=>cn,registerEventListener:()=>Xe,registerTriggerHandler:()=>Ji,removeAllListeners:()=>qi,removeAllTriggerHandlers:()=>Xi,resetGateState:()=>Ki,runToolManually:()=>ln,setDebugMode:()=>ol,setTriggerHandlerEnabled:()=>Qi,triggerState:()=>L,unregisterEventListener:()=>Zr,updateGateState:()=>ts});function Ze(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Xr(t){if(!t)return"";let e=[t.mes,t.message,t.content,t.text,t?.data?.content];for(let s of e)if(typeof s=="string"&&s.trim())return s;return""}function Oi(t){return new Promise(e=>setTimeout(e,t))}function Ni(t,e){let s=[t?.message_id,t?.messageId,t?.id,t?.mes_id,e];for(let r of s){if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"&&r.trim())return r.trim()}return e}function Li(t){let e=String(t||"").trim();return!(!e||e.length<5||/^[.。·•…\s]+$/.test(e))}function Ui(t,e=null){let r=(Array.isArray(t)?t:[]).map((i,l)=>({role:To(i),content:Xr(i),name:i?.name||"",timestamp:i?.send_date||i?.timestamp||"",isSystem:!!i?.is_system,isUser:!!i?.is_user,sourceId:Ni(i,l),chatIndex:l,originalMessage:i})),n=e==null||e===""?null:String(e).trim(),o=null,a=null;for(let i=r.length-1;i>=0;i-=1){let l=r[i];if(!o&&l.role==="assistant"&&Li(l.content)&&(!n||String(l.sourceId).trim()===n||l.chatIndex===Number(n)?o=l:o||(o=l)),!a&&l.role==="user"&&l.content&&(a=l),o&&a)break}return{messages:r,lastUserMessage:a,lastAiMessage:o}}async function zi(t={}){let{preferredMessageId:e=null,retries:s=0,retryDelayMs:r=250}=t,n={messages:[],lastUserMessage:null,lastAiMessage:null};for(let o=0;o<=s;o+=1){let a=await wo();if(n=Ui(a,e),n.lastAiMessage?.content)return n;o<s&&await Oi(r)}return n}function qs(){ts({lastUserSendIntentAt:Date.now()})}function Bi(){let t=Ze(),e=t?.document;if(!e?.body)return!1;if(t.__YYT_sendIntentHooksInstalled)return!0;let s=["#send_but","#option_send","#send_button",'button[title*="\u53D1\u9001"]','button[title*="Send"]'],r=["#send_textarea","#send_textarea textarea","textarea#send_textarea",'textarea[data-testid="send_textarea"]'],n=(o,a,i)=>{o.forEach(l=>{let c=e.querySelector(l);c&&c.addEventListener(a,i,!0)})};return n(s,"click",()=>qs()),n(s,"pointerup",()=>qs()),n(s,"touchend",()=>qs()),n(r,"keydown",o=>{let a=o?.key||"";(a==="Enter"||a==="NumpadEnter")&&!o.shiftKey&&qs()}),t.__YYT_sendIntentHooksInstalled=!0,C("\u5DF2\u5B89\u88C5\u53D1\u9001\u610F\u56FE\u6355\u83B7\u94A9\u5B50"),!0}function ji(t,e={},s=!1){return s?!0:String(t||e?.type||"").trim().toLowerCase().includes("quiet")||e?.quiet===!0||e?.isQuiet===!0||e?.quiet_prompt===!0}function Dt(){return Ze().SillyTavern||null}function Gi(){return Ze().TavernHelper||null}function tn(){let e=Ze().SillyTavern;return e&&e.eventSource?e.eventSource:null}function sn(){let e=Ze().SillyTavern;return e&&e.eventTypes?e.eventTypes:q}function C(...t){(L.debugMode||be.getDebugSettings()?.enableDebugLog)&&console.log("[YouYouToolkit:Trigger]",...t)}function ss(){let t=be.getListenerSettings?.()||be.getSettings?.()?.listener||{},e=parseInt(t?.debounceMs,10);return{listenGenerationEnded:t?.listenGenerationEnded!==!1,ignoreQuietGeneration:t?.ignoreQuietGeneration!==!1,ignoreAutoTrigger:t?.ignoreAutoTrigger===!0,debounceMs:Number.isFinite(e)?Math.max(0,e):300}}function es(t){return typeof t=="string"||typeof t=="number"?String(t):t?.messageId||t?.id||t?.message_id||""}function vo(t=Date.now()){return[L.gateState.lastUserSendIntentAt,L.gateState.lastUserMessageAt].filter(s=>Number(s)>0).some(s=>t-s<=Di)}function Yi(t={}){return{stage:"",eventType:"",messageId:"",messageKey:"",reason:"",scheduledDelayMs:0,candidateToolIds:[],receivedAt:Date.now(),handledAt:0,registeredEvents:Array.from(N.listeners.keys()),listenerSettings:ss(),hasRecentUserTriggerIntent:vo(),...t}}function ve(t={}){let e=Yi(t);return N.lastEventDebugSnapshot=e,C("\u81EA\u52A8\u89E6\u53D1\u4E8B\u4EF6\u5FEB\u7167:",e),e}function Fi(){let t=ss();return t.listenGenerationEnded===!1?{skip:!0,reason:ue.LISTENER_DISABLED,listenerSettings:t}:t.ignoreAutoTrigger&&!vo()?{skip:!0,reason:ue.IGNORED_AUTO_TRIGGER,listenerSettings:t}:{skip:!1,reason:"",listenerSettings:t}}function Hi(t={}){return{triggerEvent:"",messageId:"",messageKey:"",selectedToolIds:[],skipReason:"",lockedAiMessageId:"",triggeredAt:Date.now(),...t}}function kt(t={}){let e=Hi(t);return N.lastAutoTriggerSnapshot=e,C("\u81EA\u52A8\u89E6\u53D1\u5FEB\u7167:",e),e}function Ks(t,e){(Array.isArray(t)?t:[]).forEach(r=>{r?.id&&Mt(r.id,{lastTriggerAt:Date.now(),...e},{touchLastRunAt:!1,emitEvent:!1})})}function Wi(t,e,s){let n=[e?.chatId,e?.chat_id,e?.chat_filename,e?.chatMetadata?.chatId,e?.chatMetadata?.chat_id,e?.chatMetadata?.file_name,e?.chatMetadata?.name,t?.chatId,t?.chat_id,t?.chat_filename].find(o=>typeof o=="string"&&o.trim());return n||(s?.id!==void 0&&s?.id!==null?`chat_char_${s.id}`:t?.this_chid!==void 0&&t?.this_chid!==null?`chat_char_${t.this_chid}`:"chat_default")}function Xe(t,e,s={}){if(!t||typeof e!="function")return C("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u51FD\u6570"),()=>{};let{once:r=!1,priority:n=0}=s,o=tn(),i=sn()[t]||t,l=async(...c)=>{try{if(s.gateCheck&&!await rn(s.gateCheck)){C(`\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6: ${t}`);return}await e(...c),r&&Zr(t,l)}catch(d){console.error("[YouYouToolkit:Trigger] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF:",d)}};if(L.listeners.has(t)||L.listeners.set(t,new Set),L.listeners.get(t).add(l),o&&typeof o.on=="function")o.on(i,l),C(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`);else{let c=Ze();c.addEventListener&&(c.addEventListener(i,l),C(`\u5DF2\u6CE8\u518CDOM\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`))}return()=>Zr(t,l)}function Zr(t,e){let s=L.listeners.get(t);if(s&&s.has(e)){s.delete(e);let r=tn(),o=sn()[t]||t;if(r&&typeof r.off=="function")r.off(o,e),C(`\u5DF2\u53D6\u6D88\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`);else{let a=Ze();a.removeEventListener&&a.removeEventListener(o,e)}}}function qi(){let t=tn(),e=sn();for(let[s,r]of L.listeners){let n=e[s]||s;for(let o of r)if(t&&typeof t.off=="function")t.off(n,o);else{let a=Ze();a.removeEventListener&&a.removeEventListener(n,o)}}L.listeners.clear(),C("\u5DF2\u79FB\u9664\u6240\u6709\u4E8B\u4EF6\u76D1\u542C\u5668")}async function rn(t){if(!t)return!0;let e=Date.now(),s=L.gateState;if(t.minInterval&&s.lastGenerationAt&&e-s.lastGenerationAt<t.minInterval)return C("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u77ED"),!1;if(t.maxInterval&&s.lastUserMessageAt&&e-s.lastUserMessageAt>t.maxInterval)return C("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u957F"),!1;if(t.requireUserMessage&&!s.lastUserMessageId)return C("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u7F3A\u5C11\u7528\u6237\u6D88\u606F"),!1;if(t.excludeQuietGeneration&&s.lastGenerationType==="quiet")return C("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: quiet\u751F\u6210\u88AB\u6392\u9664"),!1;if(t.customCheck&&typeof t.customCheck=="function")try{if(!await t.customCheck(s))return C("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u81EA\u5B9A\u4E49\u68C0\u67E5\u8FD4\u56DEfalse"),!1}catch(r){return console.error("[YouYouToolkit:Trigger] \u81EA\u5B9A\u4E49\u95E8\u63A7\u68C0\u67E5\u9519\u8BEF:",r),!1}return!0}function ts(t){Object.assign(L.gateState,t)}function Ki(){L.gateState={lastUserSendIntentAt:0,lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationType:null,lastGenerationParams:null,lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1}}async function nn(t={}){let{depth:e=3,includeUser:s=!0,includeAssistant:r=!0,includeSystem:n=!1,format:o="messages"}=t;if(!Dt())return C("\u65E0\u6CD5\u83B7\u53D6SillyTavern API"),null;try{let i=await wo(),l=[],c=Math.max(0,i.length-e);for(let d=c;d<i.length;d++){let p=i[d];if(!p)continue;let b=To(p);if(!(b==="user"&&!s)&&!(b==="system"&&!n)&&!(b==="assistant"&&!r))if(o==="messages"){let f=Xr(p);l.push({role:b,content:f,name:p.name||"",timestamp:p.send_date||p.timestamp,isSystem:!!p.is_system,isUser:!!p.is_user})}else l.push(Xr(p))}return{messages:l,totalMessages:i.length,startIndex:c,endIndex:i.length-1}}catch(i){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u804A\u5929\u4E0A\u4E0B\u6587\u5931\u8D25:",i),null}}function To(t){if(!t)return"assistant";if(t.is_user)return"user";if(t.is_system)return"system";let e=String(t.role||"").toLowerCase();return e==="user"||e==="assistant"||e==="system"?e:"assistant"}async function wo(){let t=Gi(),e=Dt();if(t?.getChatMessages)try{let s=-1;if(typeof t.getLastMessageId=="function"&&(s=t.getLastMessageId()),!Number.isFinite(s)||s<0){let r=e?.getContext?.()||null,n=Array.isArray(r?.chat)?r.chat:[],o=Array.isArray(e?.chat)?e.chat:[];s=(n.length?n:o).length-1}if(Number.isFinite(s)&&s>=0){let r=await t.getChatMessages(`0-${s}`,{include_swipes:!1,include_hidden:!0});if(Array.isArray(r)&&r.length>0)return r}}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 TavernHelper \u8BFB\u53D6\u804A\u5929\u6D88\u606F\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u9ED8\u8BA4\u6765\u6E90:",s)}try{let s=e?.getContext?.()||null;if(Array.isArray(s?.chat)&&s.chat.length>0)return s.chat}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 getContext() \u8BFB\u53D6\u804A\u5929\u5931\u8D25:",s)}return Array.isArray(e?.chat)?e.chat:[]}async function on(){let t=Dt();if(!t)return null;try{let e=t.this_chid,s=t.characters||[];if(e>=0&&e<s.length){let r=s[e];return{id:e,name:r.name||"",description:r.description||"",personality:r.personality||"",scenario:r.scenario||"",firstMes:r.first_mes||"",mesExample:r.mes_example||""}}return null}catch(e){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e),null}}async function Eo(t={}){let{enabledOnly:e=!0,maxLength:s=1e4}=t,r=Dt();if(!r)return"";try{let o=(r.lorebook||[]).entries||[],a=[],i=0;for(let l of o){if(e&&!l.enabled)continue;let c=l.content||"";c&&i+c.length<=s&&(a.push(c),i+=c.length)}return a.join(`

`)}catch(n){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u5931\u8D25:",n),""}}async function Vi(t={}){let[e,s,r]=await Promise.all([nn(t.chat||{}),on(),Eo(t.worldbook||{})]);return{chat:e,character:s,worldbook:r,timestamp:Date.now()}}function Ji(t,e){if(!t||!e)return C("\u65E0\u6548\u7684\u5904\u7406\u5668ID\u6216\u914D\u7F6E"),()=>{};let{eventType:s,handler:r,gateCondition:n,priority:o=0}=e;if(!s||typeof r!="function")return C("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u5904\u7406\u5668\u51FD\u6570"),()=>{};L.handlers.set(t,{eventType:s,handler:r,gateCondition:n,priority:o,enabled:!0});let a=Xe(s,async(...i)=>{let l=L.handlers.get(t);!l||!l.enabled||l.gateCondition&&!await rn(l.gateCondition)||await l.handler(...i)},{priority:o});return C(`\u5DF2\u6CE8\u518C\u89E6\u53D1\u5904\u7406\u5668: ${t}`),()=>{a(),L.handlers.delete(t),C(`\u5DF2\u53D6\u6D88\u89E6\u53D1\u5904\u7406\u5668: ${t}`)}}function Qi(t,e){let s=L.handlers.get(t);s&&(s.enabled=e,C(`\u89E6\u53D1\u5904\u7406\u5668 ${t} \u5DF2${e?"\u542F\u7528":"\u7981\u7528"}`))}function Xi(){L.handlers.clear(),C("\u5DF2\u79FB\u9664\u6240\u6709\u89E6\u53D1\u5904\u7406\u5668")}function xo(t,e,s=0){let r=Number.isFinite(s)?Math.max(0,s):ss().debounceMs,n=es(e),o=`${t}::${typeof e=="object"?e?.messageId||e?.id||"latest":String(e??"latest")}`,a=N.pendingMessageTimers.get(o);a&&clearTimeout(a),ve({stage:"scheduled",eventType:t,messageId:n,scheduledDelayMs:r});let i=setTimeout(async()=>{N.pendingMessageTimers.delete(o),ve({stage:"dispatching",eventType:t,messageId:n,scheduledDelayMs:r}),await So(t,e)},r);N.pendingMessageTimers.set(o,i)}function en(t){let e=t?.chatId||"chat_default",s=t?.messageId===void 0||t?.messageId===null||t?.messageId===""?"latest":String(t.messageId);return`${e}::${s}`}function Zi(t,e){return e?.triggerEvent==="MANUAL"?t.output?.mode===Qe.POST_RESPONSE_API?$t.MANUAL_POST_RESPONSE_API:$t.MANUAL_COMPATIBILITY:$t.AUTO_POST_RESPONSE_API}async function So(t,e){C(`${t}\u89E6\u53D1:`,e);let s=sl(q.GENERATION_ENDED),r=s.map(c=>c.id),n=Fi(),o=es(e);if(ve({stage:"handling",eventType:t,messageId:o,candidateToolIds:r,handledAt:Date.now()}),n.skip){kt({triggerEvent:t,messageId:o,selectedToolIds:r,skipReason:n.reason,lockedAiMessageId:o||""}),Ks(s,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:n.reason,lastExecutionPath:"",lastWritebackStatus:de.NOT_APPLICABLE,lastFailureStage:""}),ve({stage:"skipped",eventType:t,messageId:o,reason:n.reason,candidateToolIds:r,handledAt:Date.now()});return}if(n.listenerSettings.ignoreQuietGeneration&&ji(L.gateState.lastGenerationType,L.gateState.lastGenerationParams,L.gateState.lastGenerationDryRun)){C("\u68C0\u6D4B\u5230 quiet / dryRun \u751F\u6210\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u81EA\u52A8\u6267\u884C"),kt({triggerEvent:t,selectedToolIds:r,skipReason:ue.QUIET_GENERATION}),Ks(s,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:ue.QUIET_GENERATION,lastExecutionPath:"",lastWritebackStatus:de.NOT_APPLICABLE,lastFailureStage:""}),ve({stage:"skipped",eventType:t,messageId:o,reason:ue.QUIET_GENERATION,candidateToolIds:r,handledAt:Date.now()});return}let a=await an({...typeof e=="object"&&e?e:{},triggerEvent:t,messageId:typeof e=="string"||typeof e=="number"?e:e?.messageId||e?.id||""});if(!a?.lastAiMessage){C(`${t} \u540E\u672A\u8BFB\u53D6\u5230\u6700\u65B0 AI \u56DE\u590D\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u6267\u884C`);let c=en(a||{});kt({triggerEvent:t,messageId:a?.messageId||"",messageKey:c,selectedToolIds:r,skipReason:ue.MISSING_AI_MESSAGE,lockedAiMessageId:a?.messageId||""}),Ks(s,{lastTriggerEvent:t,lastMessageKey:c,lastSkipReason:ue.MISSING_AI_MESSAGE,lastExecutionPath:"",lastWritebackStatus:de.NOT_APPLICABLE,lastFailureStage:""}),ve({stage:"skipped",eventType:t,messageId:a?.messageId||o,messageKey:c,reason:ue.MISSING_AI_MESSAGE,candidateToolIds:r,handledAt:Date.now()});return}let i=en(a);if(N.lastHandledMessageKey===i){C(`\u68C0\u6D4B\u5230\u91CD\u590D\u81EA\u52A8\u89E6\u53D1\uFF0C\u8DF3\u8FC7: ${i}`),kt({triggerEvent:t,messageId:a?.messageId||"",messageKey:i,selectedToolIds:r,skipReason:ue.DUPLICATE_MESSAGE,lockedAiMessageId:a?.messageId||""}),Ks(s,{lastTriggerEvent:t,lastMessageKey:i,lastSkipReason:ue.DUPLICATE_MESSAGE,lastExecutionPath:"",lastWritebackStatus:de.NOT_APPLICABLE,lastFailureStage:""}),ve({stage:"skipped",eventType:t,messageId:a?.messageId||o,messageKey:i,reason:ue.DUPLICATE_MESSAGE,candidateToolIds:r,handledAt:Date.now()});return}let l=s;if(l.length===0){C("\u6CA1\u6709\u9700\u8981\u6267\u884C\u7684\u5DE5\u5177"),kt({triggerEvent:t,messageId:a?.messageId||"",messageKey:i,selectedToolIds:[],skipReason:ue.NO_ELIGIBLE_TOOLS,lockedAiMessageId:a?.messageId||""}),ve({stage:"skipped",eventType:t,messageId:a?.messageId||o,messageKey:i,reason:ue.NO_ELIGIBLE_TOOLS,candidateToolIds:[],handledAt:Date.now()});return}N.lastHandledMessageKey=i,a.messageKey=i,kt({triggerEvent:t,messageId:a?.messageId||"",messageKey:i,selectedToolIds:l.map(c=>c.id),skipReason:"",lockedAiMessageId:a?.messageId||""}),C(`\u9700\u8981\u6267\u884C ${l.length} \u4E2A\u5DE5\u5177:`,l.map(c=>c.id)),Re("info",`\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u5F00\u59CB\u81EA\u52A8\u6267\u884C ${l.length} \u4E2A\u5DE5\u5177`,{duration:2400,noticeId:"yyt-tool-batch-start"});for(let c of l)try{let d=await Ao(c,a);d.success?(C(`\u5DE5\u5177 ${c.id} \u6267\u884C\u6210\u529F`),E.emit(w.TOOL_EXECUTED,{toolId:c.id,result:d.result||d.data||d})):C(`\u5DE5\u5177 ${c.id} \u6267\u884C\u5931\u8D25:`,d.error)}catch(d){console.error(`[ToolTrigger] \u5DE5\u5177\u6267\u884C\u5931\u8D25: ${c.id}`,d)}N.lastExecutionContext=a,ve({stage:"completed",eventType:t,messageId:a?.messageId||o,messageKey:i,candidateToolIds:l.map(c=>c.id),handledAt:Date.now()})}async function el(t,e,s){return s||t.output?.mode===Qe.POST_RESPONSE_API?Rt.runToolPostResponse(t,e):Us(t.id,e)}function _o(){if(N.initialized){C("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316");return}tl(),N.initialized=!0,C("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316"),E.emit(w.TOOL_TRIGGER_INITIALIZED)}function tl(){let t=Xe(q.GENERATION_ENDED,async r=>{ve({stage:"received",eventType:q.GENERATION_ENDED,messageId:es(r),receivedAt:Date.now()}),await So(q.GENERATION_ENDED,r)}),e=Xe(q.GENERATION_AFTER_COMMANDS,async r=>{let{debounceMs:n}=ss();ve({stage:"received",eventType:q.GENERATION_AFTER_COMMANDS,messageId:es(r),receivedAt:Date.now(),scheduledDelayMs:n}),xo(q.GENERATION_AFTER_COMMANDS,r,n)}),s=Xe(q.MESSAGE_RECEIVED,async r=>{let{debounceMs:n}=ss();ve({stage:"received",eventType:q.MESSAGE_RECEIVED,messageId:es(r),receivedAt:Date.now(),scheduledDelayMs:n}),xo(q.MESSAGE_RECEIVED,r,n)});N.listeners.set(q.GENERATION_ENDED,t),N.listeners.set(q.GENERATION_AFTER_COMMANDS,e),N.listeners.set(q.MESSAGE_RECEIVED,s)}async function an(t){let e=await on(),s=Dt(),r=s?.getContext?.()||null,n=typeof t=="string"||typeof t=="number"?t:t?.messageId||t?.id||"",o=t?.triggerEvent||"GENERATION_ENDED",a=await zi({preferredMessageId:n,retries:o==="MANUAL"||o==="MANUAL_PREVIEW"?2:8,retryDelayMs:o==="MANUAL"||o==="MANUAL_PREVIEW"?120:260}),i=a.messages||[],l=a.lastUserMessage,c=a.lastAiMessage,d=c?.sourceId??n??"";return{triggeredAt:Date.now(),triggerEvent:o,chatId:Wi(s,r,e),messageId:d,lastAiMessage:c?.content||"",userMessage:l?.content||L.gateState.lastUserMessageText||"",chatMessages:i,input:{userMessage:l?.content||L.gateState.lastUserMessageText||"",lastAiMessage:c?.content||"",extractedContent:"",previousToolOutput:"",context:{character:e?.name||"",chatLength:i.length||0}},config:{},status:"pending"}}function sl(t){return Wr(t).filter(s=>Rt.shouldRunPostResponse(s))}function Vs(t,e){try{zr(t,e)}catch(s){console.warn("[ToolTrigger] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",t,s)}}async function Ao(t,e){let s=Date.now(),r=t.id,n=e?.triggerEvent==="MANUAL",o=`yyt-tool-run-${r}`,a=Zi(t,e),i=e?.messageKey||en(e||{});Vs(r,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||q.GENERATION_ENDED,lastMessageKey:i,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:"",lastFailureStage:""}),E.emit(w.TOOL_EXECUTION_REQUESTED,{toolId:r,triggerEvent:e?.triggerEvent||"GENERATION_ENDED",context:e}),Re("info",`${n?"\u6B63\u5728\u624B\u52A8\u6267\u884C":"\u5DF2\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u6B63\u5728\u81EA\u52A8\u6267\u884C"} ${t.name}`,{sticky:!0,noticeId:o});try{let l=await el(t,e,n),c=Date.now()-s;if(l?.success){let b=Q(r);Vs(r,{lastStatus:"success",lastError:"",lastDurationMs:c,successCount:(b?.runtime?.successCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||q.GENERATION_ENDED,lastMessageKey:i,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:l?.meta?.writebackStatus||de.NOT_APPLICABLE,lastFailureStage:l?.meta?.failureStage||""});let f=n?`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`:`\u5DF2\u76D1\u542C AI \u56DE\u590D\u5E76\u6267\u884C ${t.name}`;return y("success",f),Re("success",f,{duration:3200,noticeId:o}),{success:!0,duration:c,result:l}}let d=Q(r),p=l?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25";return Vs(r,{lastStatus:"error",lastError:p,lastDurationMs:c,errorCount:(d?.runtime?.errorCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||q.GENERATION_ENDED,lastMessageKey:i,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:l?.meta?.writebackStatus||de.NOT_APPLICABLE,lastFailureStage:l?.meta?.failureStage||(a===$t.MANUAL_COMPATIBILITY?Me.COMPATIBILITY_EXECUTE:Me.UNKNOWN)}),y("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${p}`),Re("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${p}`,{sticky:!0,noticeId:o}),{success:!1,duration:c,error:p,result:l}}catch(l){let c=Date.now()-s,d=Q(r),p=l?.message||String(l);throw Vs(r,{lastStatus:"error",lastError:p,lastDurationMs:c,errorCount:(d?.runtime?.errorCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||q.GENERATION_ENDED,lastMessageKey:i,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:de.NOT_APPLICABLE,lastFailureStage:a===$t.MANUAL_COMPATIBILITY?Me.COMPATIBILITY_EXECUTE:Me.UNKNOWN}),y("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${p}`),Re("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${p}`,{sticky:!0,noticeId:o}),l}}async function ln(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=Q(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return Mt(t,{lastTriggerAt:Date.now(),lastTriggerEvent:"MANUAL",lastMessageKey:"",lastSkipReason:ue.TOOL_DISABLED,lastExecutionPath:"",lastWritebackStatus:de.NOT_APPLICABLE,lastFailureStage:""},{touchLastRunAt:!1,emitEvent:!1}),Re("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let s=await an({triggerEvent:"MANUAL"});return Ao(e,s)}async function cn(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=Q(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await an({triggerEvent:"MANUAL_PREVIEW"});return Rt.previewExtraction(e,s)}function rl(){for(let t of N.pendingMessageTimers.values())clearTimeout(t);N.pendingMessageTimers.clear();for(let t of N.listeners.values())typeof t=="function"&&t();N.listeners.clear(),N.initialized=!1,N.lastExecutionContext=null,N.lastHandledMessageKey="",N.lastAutoTriggerSnapshot=null,N.lastEventDebugSnapshot=null,C("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u9500\u6BC1")}function nl(){return{initialized:N.initialized,listenersCount:N.listeners.size,lastExecutionContext:N.lastExecutionContext,lastAutoTriggerSnapshot:N.lastAutoTriggerSnapshot,lastEventDebugSnapshot:N.lastEventDebugSnapshot}}async function Mo(){if(L.isInitialized){C("\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316");return}if(!Dt()){C("\u65E0\u6CD5\u83B7\u53D6SillyTavern API\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),setTimeout(Mo,1e3);return}Bi(),Xe(q.MESSAGE_SENT,async e=>{let r=(await nn({depth:10,includeAssistant:!1,includeSystem:!1}))?.messages?.filter(n=>n.role==="user").pop();ts({lastUserSendIntentAt:Date.now(),lastUserMessageId:e,lastUserMessageAt:Date.now(),lastUserMessageText:r?.content||L.gateState.lastUserMessageText||""}),C(`\u7528\u6237\u6D88\u606F\u5DF2\u53D1\u9001: ${e}`)}),Xe(q.GENERATION_STARTED,(e,s,r)=>{ts({lastGenerationType:e,lastGenerationParams:s||null,lastGenerationDryRun:!!r,isGenerating:!0}),C(`\u751F\u6210\u5F00\u59CB: ${e}`)}),Xe(q.GENERATION_ENDED,()=>{ts({lastGenerationAt:Date.now(),isGenerating:!1}),C("\u751F\u6210\u7ED3\u675F")}),_o(),L.isInitialized=!0,C("\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function ol(t){L.debugMode=t}var q,L,ue,$t,Di,N,dn=D(()=>{oe();Qt();Pt();qr();Qr();ke();q={MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHARACTER_LOADED:"CHARACTER_LOADED",CHARACTER_DELETED:"CHARACTER_DELETED",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",WORLDBOOK_UPDATED:"WORLDBOOK_UPDATED",EXTENSIONS_LOADED:"EXTENSIONS_LOADED",SETTINGS_LOADED:"SETTINGS_LOADED"},L={listeners:new Map,handlers:new Map,gateState:{lastUserSendIntentAt:0,lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationType:null,lastGenerationParams:null,lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1},isInitialized:!1,debugMode:!1},ue={LISTENER_DISABLED:"listener_disabled",QUIET_GENERATION:"quiet_generation",IGNORED_AUTO_TRIGGER:"ignored_auto_trigger",MISSING_AI_MESSAGE:"missing_ai_message",DUPLICATE_MESSAGE:"duplicate_message",NO_ELIGIBLE_TOOLS:"no_eligible_tools",TOOL_DISABLED:"tool_disabled"},$t={AUTO_POST_RESPONSE_API:"auto_post_response_api",MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_COMPATIBILITY:"manual_compatibility"},Di=15e3;N={initialized:!1,listeners:new Map,lastExecutionContext:null,lastHandledMessageKey:"",pendingMessageTimers:new Map,lastAutoTriggerSnapshot:null,lastEventDebugSnapshot:null}});var Io={};X(Io,{TOOL_CONFIG_PANEL_STYLES:()=>Co,createToolConfigPanel:()=>et,default:()=>al});function et(t){let{id:e,toolId:s,postResponseHint:r,extractionPlaceholder:n,previewDialogId:o,previewTitle:a="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:s,render(){let i=Q(this.toolId);if(!i)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let l=this._getApiPresets(),c=i.output?.apiPreset||i.apiPreset||"",d=this._getBypassPresets(),p=i.output?.mode||"follow_ai",b=i.bypass?.enabled||!1,f=i.bypass?.presetId||"",_=i.runtime?.lastStatus||"idle",Z=i.runtime?.lastRunAt?new Date(i.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",K=i.runtime?.lastError||"",se=i.extraction||{},j=Array.isArray(se.selectors)?se.selectors.join(`
`):"",re=p==="post_response_api"?r:"\u968F AI \u8F93\u51FA\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002",v=this._buildDiagnosticsHtml(i.runtime||{});return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>\u8F93\u51FA\u6A21\u5F0F</span>
            </div>
            <div class="yyt-form-group">
              <label>\u8F93\u51FA\u6A21\u5F0F</label>
              <select class="yyt-select" id="${u}-tool-output-mode">
                <option value="follow_ai" ${p==="follow_ai"?"selected":""}>\u968F AI \u8F93\u51FA\uFF08\u652F\u6301\u624B\u52A8\u6267\u884C\uFF09</option>
                <option value="post_response_api" ${p==="post_response_api"?"selected":""}>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790</option>
              </select>
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${re}</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-database"></i>
              <span>API \u9884\u8BBE</span>
            </div>
            <div class="yyt-form-group">
              <label>\u89E3\u6790\u4F7F\u7528\u7684 API \u9884\u8BBE</label>
              <select class="yyt-select" id="${u}-tool-api-preset">
                <option value="">\u4F7F\u7528\u5F53\u524DAPI\u914D\u7F6E</option>
                ${l.map(S=>`
                  <option value="${x(S.name)}" ${S.name===c?"selected":""}>
                    ${x(S.name)}
                  </option>
                `).join("")}
              </select>
              <div class="yyt-tool-compact-hint">\u4EC5\u5728\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u6A21\u5F0F\u4E0B\u751F\u6548\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-shield-halved"></i>
              <span>\u7834\u9650\u9884\u8BBE</span>
            </div>
            <div class="yyt-form-group">
              <label class="yyt-checkbox-label">
                <input type="checkbox" id="${u}-tool-bypass-enabled" ${b?"checked":""}>
                <span>\u542F\u7528\u7834\u9650\u8BCD</span>
              </label>
            </div>
            <div class="yyt-form-group yyt-bypass-preset-select ${b?"":"yyt-hidden"}">
              <label>\u7ED1\u5B9A\u7834\u9650\u8BCD\u9884\u8BBE</label>
              <select class="yyt-select" id="${u}-tool-bypass-preset">
                <option value="">\u9009\u62E9\u9884\u8BBE</option>
                ${d.map(S=>`
                  <option value="${x(S.id)}" ${S.id===f?"selected":""}>
                    ${x(S.name)}${S.isDefault?" [\u9ED8\u8BA4]":""}
                  </option>
                `).join("")}
              </select>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-filter"></i>
              <span>\u63D0\u53D6\u914D\u7F6E</span>
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570</label>
                <input type="number" class="yyt-input" id="${u}-tool-max-messages" min="1" max="50" value="${Number(se.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${u}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${x(n)}">${x(j)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u63D0\u53D6\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u63D0\u53D6\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-file-code"></i>
              <span>\u6A21\u677F\u4FEE\u6539\u6846</span>
              <div class="yyt-title-actions">
                <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${u}-tool-reset-template">
                  <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u6A21\u677F
                </button>
              </div>
            </div>
            <div class="yyt-form-group">
              <textarea class="yyt-textarea yyt-code-textarea"
                        id="${u}-tool-prompt-template"
                        rows="12"
                        placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${x(i.promptTemplate||"")}</textarea>
              <div class="yyt-tool-compact-hint">\u8FD9\u91CC\u76F4\u63A5\u586B\u5199\u53D1\u9001\u7ED9\u989D\u5916\u89E3\u6790\u6A21\u578B\u7684\u5B8C\u6574\u6A21\u677F\uFF1B\u53EF\u5728\u6B63\u6587\u4E2D\u663E\u5F0F\u4F7F\u7528 <code>{{toolContentMacro}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{userMessage}}</code> \u7B49\u5B8F\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-hand-pointer"></i>
              <span>\u624B\u52A8\u64CD\u4F5C\u533A</span>
            </div>
            <div class="yyt-tool-manual-area">
              <div class="yyt-tool-runtime-card">
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u5F53\u524D\u72B6\u6001</span>
                  <span class="yyt-tool-runtime-badge yyt-status-${x(_)}">${x(_)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${x(Z)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${i.runtime?.successCount||0} / ${i.runtime?.errorCount||0}</span>
                </div>
                ${K?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${x(K)}</span>
                  </div>
                `:""}
              </div>
              <div class="yyt-tool-manual-actions">
                <button class="yyt-btn yyt-btn-primary" id="${u}-tool-run-manual">
                  <i class="fa-solid fa-play"></i> \u7ACB\u5373\u6267\u884C\u4E00\u6B21
                </button>
                <button class="yyt-btn yyt-btn-secondary" id="${u}-tool-preview-extraction">
                  <i class="fa-solid fa-vial"></i> \u6D4B\u8BD5\u63D0\u53D6
                </button>
                <div class="yyt-tool-compact-hint">\u7528\u4E8E\u624B\u52A8\u9A8C\u8BC1\u5F53\u524D\u6A21\u677F\u3001API\u9884\u8BBE\u548C\u7834\u9650\u9884\u8BBE\u662F\u5426\u80FD\u6B63\u5E38\u5DE5\u4F5C\u3002</div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-footer yyt-panel-footer-end">
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-primary" id="${u}-tool-save">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>

          <div class="yyt-tool-macro-hint">
            \u8BF4\u660E\uFF1A\u5DE5\u5177\u4F1A\u628A\u5F53\u524D\u6A21\u677F\u89E3\u6790\u540E\u4F5C\u4E3A\u6700\u7EC8\u7528\u6237\u8BF7\u6C42\u53D1\u9001\u7ED9\u989D\u5916\u6A21\u578B\uFF1B\u82E5\u542F\u7528\u4E86\u7834\u9650\u8BCD\uFF0C\u5219\u4F1A\u4F5C\u4E3A\u524D\u7F6E\u6D88\u606F\u4E00\u5E76\u53D1\u9001\u3002\u53EF\u7528\u5B8F\u5305\u62EC <code>{{toolPromptMacro}}</code>\u3001<code>{{toolContentMacro}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{recentMessagesText}}</code>\u3001<code>{{rawRecentMessagesText}}</code>\u3001<code>{{userMessage}}</code>\u3001<code>{{toolName}}</code>\u3001<code>{{toolId}}</code>\u3002
          </div>

          ${v}
        </div>
      `},_formatDiagnosticValue(i,l="\u672A\u8BB0\u5F55"){let c=String(i||"").trim();return x(c||l)},_formatDiagnosticTime(i){let l=Number(i)||0;return l>0?new Date(l).toLocaleString():"\u672A\u8BB0\u5F55"},_formatSkipReason(i){return{listener_disabled:"\u5DF2\u8DF3\u8FC7\uFF1A\u81EA\u52A8\u76D1\u542C\u5DF2\u5173\u95ED",quiet_generation:"\u5DF2\u8DF3\u8FC7\uFF1Aquiet / dryRun \u751F\u6210",ignored_auto_trigger:"\u5DF2\u8DF3\u8FC7\uFF1A\u5224\u5B9A\u4E3A\u975E\u7528\u6237\u4E3B\u52A8\u89E6\u53D1\u751F\u6210",missing_ai_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u672A\u8BFB\u53D6\u5230\u6709\u6548 AI \u56DE\u590D",duplicate_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u547D\u4E2D\u81EA\u52A8\u53BB\u91CD",no_eligible_tools:"\u5DF2\u8DF3\u8FC7\uFF1A\u6CA1\u6709\u547D\u4E2D\u53EF\u6267\u884C\u5DE5\u5177",tool_disabled:"\u5DF2\u8DF3\u8FC7\uFF1A\u5DE5\u5177\u672A\u542F\u7528"}[i]||i||"\u65E0"},_formatExecutionPath(i){return{auto_post_response_api:"\u81EA\u52A8\u94FE\uFF1Apost_response_api",manual_post_response_api:"\u624B\u52A8\u94FE\uFF1Apost_response_api",manual_compatibility:"\u624B\u52A8\u94FE\uFF1Acompatibility \u56DE\u9000"}[i]||i||"\u672A\u8BB0\u5F55"},_formatWritebackStatus(i){return{success:"\u5199\u56DE\u6210\u529F",failed:"\u5199\u56DE\u5931\u8D25",skipped_empty_output:"\u65E0\u8F93\u51FA\uFF0C\u8DF3\u8FC7\u5199\u56DE",not_applicable:"\u4E0D\u9002\u7528"}[i]||i||"\u672A\u8BB0\u5F55"},_formatFailureStage(i){return{build_messages:"\u6784\u9020\u8BF7\u6C42\u6D88\u606F",send_api_request:"\u53D1\u9001 API \u8BF7\u6C42",extract_output:"\u63D0\u53D6\u5DE5\u5177\u8F93\u51FA",inject_context:"\u5199\u56DE\u4E0A\u4E0B\u6587",compatibility_execute:"\u517C\u5BB9\u6267\u884C\u5165\u53E3",unknown:"\u672A\u77E5\u9636\u6BB5"}[i]||i||"\u65E0"},_buildDiagnosticsHtml(i){let l=i||{};return!(l.lastTriggerAt||l.lastTriggerEvent||l.lastMessageKey||l.lastSkipReason||l.lastExecutionPath||l.lastWritebackStatus||l.lastFailureStage)?"":`
        <details class="yyt-tool-debug-panel">
          <summary class="yyt-tool-debug-summary">\u6700\u8FD1\u89E6\u53D1\u8BCA\u65AD</summary>
          <div class="yyt-tool-debug-content">
            ${[["\u6700\u8FD1\u89E6\u53D1\u65F6\u95F4",this._formatDiagnosticTime(l.lastTriggerAt)],["\u6700\u8FD1\u89E6\u53D1\u4E8B\u4EF6",this._formatDiagnosticValue(l.lastTriggerEvent)],["\u6700\u8FD1\u6D88\u606F\u952E",this._formatDiagnosticValue(l.lastMessageKey)],["\u6700\u8FD1\u8DF3\u8FC7\u539F\u56E0",this._formatDiagnosticValue(this._formatSkipReason(l.lastSkipReason),"\u65E0")],["\u6700\u8FD1\u6267\u884C\u8DEF\u5F84",this._formatDiagnosticValue(this._formatExecutionPath(l.lastExecutionPath))],["\u6700\u8FD1\u5199\u56DE\u72B6\u6001",this._formatDiagnosticValue(this._formatWritebackStatus(l.lastWritebackStatus))],["\u6700\u8FD1\u5931\u8D25\u9636\u6BB5",this._formatDiagnosticValue(this._formatFailureStage(l.lastFailureStage),"\u65E0")]].map(([p,b])=>`
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">${p}</span>
                <span class="yyt-tool-runtime-value">${b}</span>
              </div>
            `).join("")}
          </div>
        </details>
      `},_getApiPresets(){try{return Tt()||[]}catch{return[]}},_getBypassPresets(){try{return Yr()||[]}catch{return[]}},_getFormData(i){let l=Q(this.toolId),c=i.find(`#${u}-tool-output-mode`).val()||"follow_ai",d=i.find(`#${u}-tool-bypass-enabled`).is(":checked"),p=c==="post_response_api",b=(i.find(`#${u}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(f=>f.trim()).filter(Boolean);return{enabled:l?.enabled!==!1,promptTemplate:i.find(`#${u}-tool-prompt-template`).val()||"",apiPreset:i.find(`#${u}-tool-api-preset`).val()||"",extractTags:b,trigger:{event:"GENERATION_ENDED",enabled:p},output:{mode:c,apiPreset:i.find(`#${u}-tool-api-preset`).val()||"",overwrite:!0,enabled:p},bypass:{enabled:d,presetId:d&&i.find(`#${u}-tool-bypass-preset`).val()||""},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(i.find(`#${u}-tool-max-messages`).val(),10)||5),selectors:b}}},_showExtractionPreview(i,l){if(!O())return;let d=`${u}-${o}`,p=Array.isArray(l.messageEntries)?l.messageEntries:[],b=p.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${p.map(f=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">\u7B2C ${f.order} \u6761 AI \u6D88\u606F</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${x(f.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${x(f.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${x(f.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";i.append(hr({id:d,title:a,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${x((l.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6700\u8FD1 ${l.maxMessages} \u6761 AI \u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${x(l.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${x(l.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${x(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${b}
        `})),xr(i,d,{onSave:f=>f()}),i.find(`#${d}-save`).text("\u5173\u95ED"),i.find(`#${d}-cancel`).remove()},bindEvents(i){let l=O();!l||!z(i)||(i.find(`#${u}-tool-output-mode`).on("change",()=>{let d=(i.find(`#${u}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?r:"\u968F AI \u8F93\u51FA\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002";i.find(".yyt-tool-mode-hint").text(d)}),i.find(`#${u}-tool-bypass-enabled`).on("change",c=>{let d=l(c.currentTarget).is(":checked");i.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!d)}),i.find(`#${u}-tool-save`).on("click",()=>{this._saveConfig(i,{silent:!1})}),i.find(`#${u}-tool-reset-template`).on("click",()=>{let c=ks(this.toolId);c?.promptTemplate&&(i.find(`#${u}-tool-prompt-template`).val(c.promptTemplate),y("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),i.find(`#${u}-tool-run-manual`).on("click",async()=>{if(this._saveConfig(i,{silent:!0}))try{let d=await ln(this.toolId);!d?.success&&d?.error&&Re("warning",d.error,{duration:3200,noticeId:`yyt-tool-run-${this.toolId}`})}catch(d){y("error",d?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{this.renderTo(i)}}),i.find(`#${u}-tool-preview-extraction`).on("click",async()=>{if(this._saveConfig(i,{silent:!0}))try{let d=await cn(this.toolId);if(!d?.success){y("error",d?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}this._showExtractionPreview(i,d)}catch(d){y("error",d?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}))},_saveConfig(i,l={}){let c=this._getFormData(i),{silent:d=!1}=l,p=je(this.toolId,c);return p?d||y("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):y("error","\u4FDD\u5B58\u5931\u8D25"),p},destroy(i){!O()||!z(i)||i.find("*").off()},getStyles(){return Co},renderTo(i){i.html(this.render({})),this.bindEvents(i,{})}}}var Co,al,rs=D(()=>{ke();Pt();ms();Vt();dn();Co=`
  .yyt-tool-panel {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .yyt-tool-compact-hint {
    font-size: 12px;
    color: var(--yyt-text-muted);
    line-height: 1.6;
  }

  .yyt-hidden {
    display: none !important;
  }

  .yyt-code-textarea {
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 13px;
    line-height: 1.5;
    tab-size: 2;
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.1);
    resize: vertical;
    min-height: 220px;
  }

  .yyt-code-textarea-small {
    min-height: 120px;
  }

  .yyt-code-textarea:focus {
    border-color: var(--yyt-accent);
    box-shadow: 0 0 0 2px rgba(123, 183, 255, 0.15);
  }

  .yyt-title-actions {
    margin-left: auto;
  }

  .yyt-btn-small {
    padding: 4px 10px;
    font-size: 12px;
  }

  .yyt-checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;
  }

  .yyt-checkbox-label input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  .yyt-tool-manual-area {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 16px;
    align-items: start;
  }

  .yyt-tool-runtime-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px;
    background: rgba(0, 0, 0, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: var(--yyt-radius-sm);
  }

  .yyt-tool-runtime-line {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    font-size: 12px;
  }

  .yyt-tool-runtime-label {
    color: var(--yyt-text-muted);
    flex-shrink: 0;
  }

  .yyt-tool-runtime-value {
    color: var(--yyt-text);
    text-align: right;
    word-break: break-word;
  }

  .yyt-tool-runtime-badge {
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  .yyt-status-idle {
    color: var(--yyt-text-secondary);
    background: rgba(255, 255, 255, 0.06);
  }

  .yyt-status-running {
    color: var(--yyt-accent);
    background: rgba(123, 183, 255, 0.12);
  }

  .yyt-status-success {
    color: var(--yyt-success);
    background: rgba(74, 222, 128, 0.12);
  }

  .yyt-status-error {
    color: var(--yyt-error);
    background: rgba(255, 107, 107, 0.12);
  }

  .yyt-tool-runtime-error .yyt-tool-runtime-value {
    color: var(--yyt-error);
  }

  .yyt-tool-manual-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 180px;
  }

  .yyt-preview-box {
    padding: 10px 12px;
    border-radius: var(--yyt-radius-sm);
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(0, 0, 0, 0.2);
    color: var(--yyt-text);
    font-size: 12px;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .yyt-preview-pre {
    max-height: 220px;
    overflow: auto;
    margin: 0;
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  }

  .yyt-preview-message-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .yyt-preview-message-item {
    padding: 12px;
    border-radius: var(--yyt-radius-sm);
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.02);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .yyt-preview-message-title {
    font-size: 12px;
    font-weight: 700;
    color: var(--yyt-accent);
  }

  .yyt-tool-macro-hint {
    font-size: 12px;
    color: var(--yyt-text-muted);
    line-height: 1.7;
    padding: 12px 14px;
    border-radius: var(--yyt-radius-sm);
    border: 1px dashed rgba(123, 183, 255, 0.25);
    background: rgba(123, 183, 255, 0.06);
  }

  .yyt-tool-macro-hint code {
    color: var(--yyt-accent);
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  }

  .yyt-error {
    padding: 20px;
    text-align: center;
    color: var(--yyt-error);
    background: rgba(255, 107, 107, 0.1);
    border: 1px solid rgba(255, 107, 107, 0.3);
    border-radius: var(--yyt-radius-sm);
  }

  .yyt-panel-footer-end {
    justify-content: flex-end;
  }

  .yyt-tool-debug-panel {
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: var(--yyt-radius-sm);
    padding: 12px 14px;
    background: rgba(255, 255, 255, 0.02);
  }

  .yyt-tool-debug-summary {
    cursor: pointer;
    list-style: none;
    font-size: 12px;
    font-weight: 700;
    color: var(--yyt-text-secondary);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .yyt-tool-debug-summary::-webkit-details-marker {
    display: none;
  }

  .yyt-tool-debug-summary::before {
    content: '\u25B8';
    color: var(--yyt-accent);
    transition: transform 0.18s ease;
  }

  .yyt-tool-debug-panel[open] .yyt-tool-debug-summary::before {
    transform: rotate(90deg);
  }

  .yyt-tool-debug-content {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .yyt-tool-debug-content .yyt-tool-runtime-line {
    padding-top: 0;
  }

  @media screen and (max-width: 768px) {
    .yyt-tool-manual-area {
      grid-template-columns: 1fr;
    }

    .yyt-tool-manual-actions {
      min-width: 0;
    }
  }
`;al=et});var Pe,un=D(()=>{rs();Pe=et({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var Ce,pn=D(()=>{rs();Ce=et({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var Ie,yn=D(()=>{rs();Ie=et({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"})});var yt,gn=D(()=>{oe();Vt();ke();yt={id:"bypassPanel",render(t){let e=R.getPresetList(),s=R.getDefaultPresetId();return`
      <div class="yyt-bypass-panel">
        <!-- \u5DE6\u4FA7\u9884\u8BBE\u5217\u8868 -->
        <div class="yyt-bypass-sidebar">
          <div class="yyt-bypass-sidebar-header">
            <span class="yyt-bypass-sidebar-title">\u7834\u9650\u8BCD\u9884\u8BBE</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-primary" id="yyt-bypass-add">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <div class="yyt-bypass-preset-list">
            ${e.map(r=>this._renderPresetItem(r,r.id===s)).join("")}
          </div>
          <div class="yyt-bypass-sidebar-footer">
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-import" title="\u5BFC\u5165">
              <i class="fa-solid fa-file-import"></i>
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-export" title="\u5BFC\u51FA\u5168\u90E8">
              <i class="fa-solid fa-file-export"></i>
            </button>
            <input type="file" id="yyt-bypass-import-file" accept=".json" style="display:none">
          </div>
        </div>
        
        <!-- \u53F3\u4FA7\u7F16\u8F91\u533A -->
        <div class="yyt-bypass-editor" id="yyt-bypass-editor">
          <div class="yyt-bypass-empty">
            <i class="fa-solid fa-shield-halved"></i>
            <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
          </div>
        </div>
      </div>
    `},_renderPresetItem(t,e){let s=Ye&&Ye[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${x(t.name)}</span>
          <span class="yyt-bypass-preset-count">${t.messages?.length||0} \u6761\u6D88\u606F</span>
        </div>
        <div class="yyt-bypass-preset-actions">
          ${e?'<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>':""}
          ${s?"":`
            <button class="yyt-btn yyt-btn-icon yyt-btn-danger yyt-bypass-quick-delete" title="\u5220\u9664\u9884\u8BBE" data-preset-id="${t.id}">
              <i class="fa-solid fa-trash"></i>
            </button>
          `}
        </div>
      </div>
    `},_renderEditor(t){if(!t)return`
        <div class="yyt-bypass-empty">
          <i class="fa-solid fa-shield-halved"></i>
          <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
        </div>
      `;let e=R.getDefaultPresetId()===t.id,s=Ye&&Ye[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${x(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
          </div>
          <div class="yyt-bypass-editor-actions">
            ${s?"":`
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-duplicate" title="\u590D\u5236">
                <i class="fa-solid fa-copy"></i>
              </button>
              <button class="yyt-btn yyt-btn-small yyt-btn-danger" id="yyt-bypass-delete" title="\u5220\u9664">
                <i class="fa-solid fa-trash"></i>
              </button>
            `}
            <button class="yyt-btn yyt-btn-small ${e?"yyt-btn-primary":"yyt-btn-secondary"}" 
                    id="yyt-bypass-set-default" title="\u8BBE\u4E3A\u9ED8\u8BA4">
              <i class="fa-solid fa-star"></i>
            </button>
          </div>
        </div>
        
        <div class="yyt-bypass-editor-desc">
          <input type="text" class="yyt-input" id="yyt-bypass-description" 
                 value="${x(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
        </div>
        
        <div class="yyt-bypass-messages-header">
          <span>\u6D88\u606F\u5217\u8868</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-add-message">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u6D88\u606F
          </button>
        </div>
        
        <div class="yyt-bypass-messages" id="yyt-bypass-messages">
          ${(t.messages||[]).map(r=>this._renderMessageItem(r)).join("")}
        </div>
        
        <div class="yyt-bypass-editor-footer">
          <button class="yyt-btn yyt-btn-primary" id="yyt-bypass-save">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58
          </button>
        </div>
      </div>
    `},_renderMessageItem(t){let e={SYSTEM:"fa-server",USER:"fa-user",assistant:"fa-robot"};return`
      <div class="yyt-bypass-message ${t.enabled===!1?"yyt-disabled":""}" data-message-id="${t.id}">
        <div class="yyt-bypass-message-header">
          <div class="yyt-bypass-message-role">
            <i class="fa-solid ${e[t.role]||"fa-comment"}"></i>
            <select class="yyt-select yyt-bypass-role-select">
              <option value="SYSTEM" ${t.role==="SYSTEM"?"selected":""}>SYSTEM</option>
              <option value="USER" ${t.role==="USER"?"selected":""}>USER</option>
              <option value="assistant" ${t.role==="assistant"?"selected":""}>assistant</option>
            </select>
          </div>
          <div class="yyt-bypass-message-controls">
            <label class="yyt-toggle yyt-small">
              <input type="checkbox" class="yyt-bypass-message-enabled" ${t.enabled!==!1?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
            ${t.deletable!==!1?`
              <button class="yyt-btn yyt-btn-icon yyt-btn-danger yyt-bypass-delete-message" title="\u5220\u9664">
                <i class="fa-solid fa-times"></i>
              </button>
            `:""}
          </div>
        </div>
        <textarea class="yyt-textarea yyt-bypass-message-content" rows="3" 
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${x(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let s=O();!s||!z(t)||(this._bindPresetListEvents(t,s),this._bindEditorEvents(t,s),this._bindFileEvents(t,s))},_bindPresetListEvents(t,e){t.on("click",".yyt-bypass-preset-item",s=>{if(e(s.target).closest(".yyt-bypass-quick-delete").length)return;let r=e(s.currentTarget).data("presetId");this._selectPreset(t,e,r)}),t.on("click",".yyt-bypass-quick-delete",s=>{s.stopPropagation();let r=e(s.currentTarget).data("presetId");if(!r||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let n=R.deletePreset(r);n.success?(t.find(".yyt-bypass-editor-content").data("presetId")===r&&t.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),y("success","\u9884\u8BBE\u5DF2\u5220\u9664")):y("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.find("#yyt-bypass-add").on("click",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click",".yyt-bypass-delete-message",s=>{let r=e(s.currentTarget).closest(".yyt-bypass-message"),n=r.data("messageId");r.remove()}),t.on("change",".yyt-bypass-message-enabled",s=>{e(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(s.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.find("#yyt-bypass-import").on("click",()=>{t.find("#yyt-bypass-import-file").click()}),t.find("#yyt-bypass-import-file").on("change",async s=>{let r=s.target.files[0];if(r){try{let n=await ze(r),o=R.importPresets(n);y(o.success?"success":"error",o.message),o.success&&this.renderTo(t)}catch(n){y("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}e(s.target).val("")}}),t.find("#yyt-bypass-export").on("click",()=>{try{let s=R.exportPresets();Ue(s,`bypass_presets_${Date.now()}.json`),y("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){y("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(t,e,s){let r=R.getPreset(s);r&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),t.find("#yyt-bypass-editor").html(this._renderEditor(r)))},_createNewPreset(t,e){let s=`bypass_${Date.now()}`,r=R.createPreset({id:s,name:"\u65B0\u7834\u9650\u8BCD\u9884\u8BBE",description:"",messages:[]});r.success?(this.renderTo(t),this._selectPreset(t,e,s),y("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):y("error",r?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content"),r=s.data("presetId");if(!r)return;let n=s.find(".yyt-bypass-name-input").val().trim(),o=s.find("#yyt-bypass-description").val().trim();if(!n){y("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let a=[];s.find(".yyt-bypass-message").each(function(){let l=e(this);a.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let i=R.updatePreset(r,{name:n,description:o,messages:a});i.success?(y("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):y("error",i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let n=R.deletePreset(r);n.success?(this.renderTo(t),y("success","\u9884\u8BBE\u5DF2\u5220\u9664")):y("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r)return;let n=`bypass_${Date.now()}`,o=R.duplicatePreset(r,n);o.success?(this.renderTo(t),this._selectPreset(t,e,n),y("success","\u9884\u8BBE\u5DF2\u590D\u5236")):y("error",o?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");r&&(R.setDefaultPresetId(r),t.find(".yyt-bypass-preset-item").removeClass("yyt-default"),t.find(`.yyt-bypass-preset-item[data-preset-id="${r}"]`).addClass("yyt-default"),t.find(".yyt-bypass-default-badge").remove(),t.find(`.yyt-bypass-preset-item[data-preset-id="${r}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>'),y("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE"))},_addMessage(t,e){let s=t.find("#yyt-bypass-messages"),r={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};s.append(this._renderMessageItem(r))},_refreshPresetList(t,e){let s=R.getPresetList(),r=R.getDefaultPresetId();t.find(".yyt-bypass-preset-list").html(s.map(n=>this._renderPresetItem(n,n.id===r)).join(""))},destroy(t){!O()||!z(t)||t.find("*").off()},getStyles(){return`
      /* \u7834\u9650\u8BCD\u9762\u677F\u6837\u5F0F */
      .yyt-bypass-panel {
        display: flex;
        height: 100%;
        gap: 16px;
      }
      
      .yyt-bypass-sidebar {
        width: 220px;
        display: flex;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.02);
        border-radius: 12px;
        flex-shrink: 0;
      }
      
      .yyt-bypass-sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      
      .yyt-bypass-sidebar-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--yyt-text);
      }
      
      .yyt-bypass-preset-list {
        flex: 1;
        overflow-y: auto;
        padding: 8px;
      }
      
      .yyt-bypass-preset-item {
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      
      .yyt-bypass-preset-item:hover {
        background: rgba(255, 255, 255, 0.04);
      }
      
      .yyt-bypass-preset-item.yyt-active {
        background: rgba(123, 183, 255, 0.1);
      }
      
      .yyt-bypass-preset-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
        min-width: 0;
      }
      
      .yyt-bypass-preset-actions {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
        opacity: 0.5;
        transition: opacity 0.2s ease;
      }
      
      .yyt-bypass-preset-item:hover .yyt-bypass-preset-actions {
        opacity: 1;
      }
      
      .yyt-bypass-quick-delete {
        padding: 4px 8px !important;
        font-size: 10px !important;
      }
      
      .yyt-bypass-preset-name {
        font-size: 13px;
        font-weight: 500;
        color: var(--yyt-text);
      }
      
      .yyt-bypass-preset-count {
        font-size: 11px;
        color: var(--yyt-text-muted);
      }
      
      .yyt-bypass-default-badge {
        font-size: 10px;
        padding: 2px 6px;
        background: rgba(123, 183, 255, 0.15);
        color: var(--yyt-accent);
        border-radius: 4px;
        margin-top: 4px;
        display: inline-block;
      }
      
      .yyt-bypass-sidebar-footer {
        display: flex;
        gap: 8px;
        padding: 12px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }
      
      .yyt-bypass-sidebar-footer .yyt-btn {
        flex: 1;
      }
      
      .yyt-bypass-editor {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.02);
        border-radius: 12px;
        overflow: hidden;
      }
      
      .yyt-bypass-empty {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--yyt-text-muted);
      }
      
      .yyt-bypass-empty i {
        font-size: 48px;
        margin-bottom: 16px;
        opacity: 0.3;
      }
      
      .yyt-bypass-editor-content {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      
      .yyt-bypass-editor-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      
      .yyt-bypass-editor-title {
        flex: 1;
        margin-right: 16px;
      }
      
      .yyt-bypass-name-input {
        font-size: 15px;
        font-weight: 600;
        background: transparent;
        border: none;
        padding: 8px 0;
      }
      
      .yyt-bypass-name-input:focus {
        border-bottom: 1px solid var(--yyt-accent);
      }
      
      .yyt-bypass-editor-actions {
        display: flex;
        gap: 8px;
      }
      
      .yyt-bypass-editor-desc {
        padding: 12px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      
      .yyt-bypass-messages-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        font-size: 12px;
        font-weight: 600;
        color: var(--yyt-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .yyt-bypass-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .yyt-bypass-message {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        padding: 14px;
      }
      
      .yyt-bypass-message.yyt-disabled {
        opacity: 0.5;
      }
      
      .yyt-bypass-message-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      
      .yyt-bypass-message-role {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .yyt-bypass-message-role i {
        color: var(--yyt-accent);
      }
      
      .yyt-bypass-role-select {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 6px;
        padding: 4px 8px;
        font-size: 12px;
        color: var(--yyt-text);
      }
      
      .yyt-bypass-message-controls {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .yyt-bypass-message-content {
        min-height: 80px;
      }
      
      .yyt-bypass-editor-footer {
        padding: 16px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        justify-content: flex-end;
      }
      
      .yyt-toggle.yyt-small {
        transform: scale(0.8);
      }
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var $o={};X($o,{SettingsPanel:()=>Fe,THEME_CONFIGS:()=>fn,applyTheme:()=>ko,applyUiPreferences:()=>mn,default:()=>ll});function ns(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent.document||document}catch{}return document}function Ro(t=ns()){return t?.documentElement||document.documentElement}function ko(t,e=ns()){let s=Ro(e),r={...il,...fn[t]||fn["dark-blue"]};Object.entries(r).forEach(([n,o])=>{s.style.setProperty(n,o)}),s.setAttribute("data-yyt-theme",t)}function mn(t={},e=ns()){let s=Ro(e),{theme:r="dark-blue",compactMode:n=!1,animationEnabled:o=!0}=t||{};ko(r,e),s.classList.toggle("yyt-compact-mode",!!n),s.classList.toggle("yyt-no-animation",!o)}var il,fn,Fe,ll,Js=D(()=>{oe();Qt();ke();il={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)","--yyt-surface":"rgba(255, 255, 255, 0.03)","--yyt-surface-hover":"rgba(255, 255, 255, 0.06)","--yyt-surface-active":"rgba(255, 255, 255, 0.08)","--yyt-border":"rgba(255, 255, 255, 0.08)","--yyt-border-strong":"rgba(255, 255, 255, 0.15)","--yyt-text":"rgba(255, 255, 255, 0.95)","--yyt-text-secondary":"rgba(255, 255, 255, 0.7)","--yyt-text-muted":"rgba(255, 255, 255, 0.45)","--yyt-on-accent":"#0b0f15"},fn={"dark-blue":{"--yyt-on-accent":"#0b0f15"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#120b1f"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#0b150f"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.7)","--yyt-text-muted":"rgba(15, 23, 42, 0.45)","--yyt-surface":"rgba(0, 0, 0, 0.03)","--yyt-surface-hover":"rgba(0, 0, 0, 0.06)","--yyt-surface-active":"rgba(0, 0, 0, 0.08)","--yyt-border":"rgba(0, 0, 0, 0.08)","--yyt-border-strong":"rgba(0, 0, 0, 0.15)","--yyt-on-accent":"#0f172a"}};Fe={id:"settingsPanel",render(t){let e=be.getSettings();return`
      <div class="yyt-settings-panel">
        <!-- \u6807\u7B7E\u9875\u5BFC\u822A -->
        <div class="yyt-settings-tabs">
          <button class="yyt-settings-tab yyt-active" data-tab="executor">
            <i class="fa-solid fa-microchip"></i> \u6267\u884C\u5668
          </button>
          <button class="yyt-settings-tab" data-tab="listener">
            <i class="fa-solid fa-ear-listen"></i> \u76D1\u542C\u5668
          </button>
          <button class="yyt-settings-tab" data-tab="debug">
            <i class="fa-solid fa-bug"></i> \u8C03\u8BD5
          </button>
          <button class="yyt-settings-tab" data-tab="ui">
            <i class="fa-solid fa-palette"></i> \u5916\u89C2
          </button>
        </div>
        
        <!-- \u6807\u7B7E\u9875\u5185\u5BB9 -->
        <div class="yyt-settings-content">
          ${this._renderExecutorTab(e.executor)}
          ${this._renderListenerTab(e.listener)}
          ${this._renderDebugTab(e.debug)}
          ${this._renderUiTab(e.ui)}
        </div>
        
        <!-- \u5E95\u90E8\u64CD\u4F5C -->
        <div class="yyt-settings-footer">
          <button class="yyt-btn yyt-btn-secondary" id="yyt-settings-reset">
            <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u4E3A\u9ED8\u8BA4
          </button>
          <button class="yyt-btn yyt-btn-primary" id="yyt-settings-save">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u8BBE\u7F6E
          </button>
        </div>
      </div>
    `},_renderExecutorTab(t){return`
      <div class="yyt-settings-tab-content yyt-active" data-tab="executor">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u5E76\u53D1\u63A7\u5236</div>
          <div class="yyt-form-group">
            <label>\u6700\u5927\u5E76\u53D1\u6570</label>
            <div class="yyt-form-hint">\u540C\u65F6\u6267\u884C\u7684\u5DE5\u5177\u6570\u91CF\u4E0A\u9650</div>
            <input type="number" class="yyt-input" id="yyt-setting-maxConcurrent" 
                   value="${t.maxConcurrent}" min="1" max="10">
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u91CD\u8BD5\u7B56\u7565</div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u6700\u5927\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-setting-maxRetries" 
                     value="${t.maxRetries}" min="0" max="10">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u95F4\u9694 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-retryDelayMs" 
                     value="${t.retryDelayMs}" min="1000" max="60000" step="1000">
            </div>
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u8D85\u65F6\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label>\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4 (ms)</label>
            <div class="yyt-form-hint">\u5355\u4E2A\u8BF7\u6C42\u7684\u8D85\u65F6\u65F6\u95F4\uFF0C\u8D85\u8FC7\u5C06\u81EA\u52A8\u4E2D\u65AD</div>
            <input type="number" class="yyt-input" id="yyt-setting-requestTimeoutMs" 
                   value="${t.requestTimeoutMs}" min="10000" max="300000" step="10000">
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u961F\u5217\u7B56\u7565</div>
          <div class="yyt-form-group">
            <label>\u961F\u5217\u5904\u7406\u65B9\u5F0F</label>
            <select class="yyt-select" id="yyt-setting-queueStrategy">
              <option value="fifo" ${t.queueStrategy==="fifo"?"selected":""}>FIFO (\u5148\u8FDB\u5148\u51FA)</option>
              <option value="lifo" ${t.queueStrategy==="lifo"?"selected":""}>LIFO (\u540E\u8FDB\u5148\u51FA)</option>
              <option value="priority" ${t.queueStrategy==="priority"?"selected":""}>\u4F18\u5148\u7EA7\u6392\u5E8F</option>
            </select>
          </div>
        </div>
      </div>
    `},_renderListenerTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="listener">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u4E8B\u4EF6\u76D1\u542C</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-listenGenerationEnded" 
                     ${t.listenGenerationEnded?"checked":""}>
              <span>\u542F\u7528\u81EA\u52A8\u5DE5\u5177\u76D1\u542C</span>
            </label>
            <div class="yyt-form-hint">\u542F\u7528\u540E\u4F1A\u76D1\u542C GENERATION_ENDED\uFF0C\u5E76\u7ED3\u5408 GENERATION_AFTER_COMMANDS / MESSAGE_RECEIVED \u4F5C\u4E3A\u515C\u5E95\u6765\u6E90\u81EA\u52A8\u89E6\u53D1\u5DE5\u5177\u3002</div>
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u8FC7\u6EE4\u89C4\u5219</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-ignoreQuietGeneration" 
                     ${t.ignoreQuietGeneration?"checked":""}>
              <span>\u5FFD\u7565\u9759\u9ED8\u751F\u6210</span>
            </label>
            <div class="yyt-form-hint">\u542F\u7528\u540E\u4F1A\u8DF3\u8FC7 quiet / dryRun / \u540E\u53F0\u751F\u6210\uFF0C\u51CF\u5C11\u672A\u771F\u6B63\u4EA7\u751F\u56DE\u590D\u65F6\u7684\u8BEF\u89E6\u53D1\u3002</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-ignoreAutoTrigger" 
                     ${t.ignoreAutoTrigger?"checked":""}>
              <span>\u5FFD\u7565\u81EA\u52A8\u89E6\u53D1</span>
            </label>
            <div class="yyt-form-hint">\u542F\u7528\u540E\u4F1A\u5C3D\u91CF\u8DF3\u8FC7\u201C\u6CA1\u6709\u6700\u8FD1\u7528\u6237\u53D1\u9001\u610F\u56FE\u201D\u7684\u751F\u6210\uFF0C\u51CF\u5C11\u5176\u4ED6\u63D2\u4EF6/\u811A\u672C\u89E6\u53D1\u751F\u6210\u65F6\u7684\u8BEF\u6267\u884C\u3002</div>
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u9632\u6296\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label>\u9632\u6296\u65F6\u95F4 (ms)</label>
            <div class="yyt-form-hint">\u7528\u4E8E GENERATION_AFTER_COMMANDS / MESSAGE_RECEIVED \u7B49\u515C\u5E95\u4E8B\u4EF6\u7684\u5EF6\u8FDF\u8C03\u5EA6\u4E0E\u53BB\u6296\u3002</div>
            <input type="number" class="yyt-input" id="yyt-setting-debounceMs" 
                   value="${t.debounceMs}" min="0" max="5000" step="100">
          </div>
        </div>
      </div>
    `},_renderDebugTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u65E5\u5FD7\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-enableDebugLog" 
                     ${t.enableDebugLog?"checked":""}>
              <span>\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7</span>
            </label>
            <div class="yyt-form-hint">\u5728\u63A7\u5236\u53F0\u8F93\u51FA\u8BE6\u7EC6\u7684\u8C03\u8BD5\u4FE1\u606F</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-saveExecutionHistory" 
                     ${t.saveExecutionHistory?"checked":""}>
              <span>\u4FDD\u5B58\u6267\u884C\u5386\u53F2</span>
            </label>
            <div class="yyt-form-hint">\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5</div>
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">UI \u663E\u793A</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-showRuntimeBadge" 
                     ${t.showRuntimeBadge?"checked":""}>
              <span>\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0</span>
            </label>
            <div class="yyt-form-hint">\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668</div>
          </div>
        </div>
      </div>
    `},_renderUiTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="ui">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u5916\u89C2\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label>\u4E3B\u9898</label>
            <select class="yyt-select" id="yyt-setting-theme">
              <option value="dark-blue" ${t.theme==="dark-blue"?"selected":""}>\u6DF1\u84DD</option>
              <option value="dark-purple" ${t.theme==="dark-purple"?"selected":""}>\u6DF1\u7D2B</option>
              <option value="dark-green" ${t.theme==="dark-green"?"selected":""}>\u6DF1\u7EFF</option>
              <option value="light" ${t.theme==="light"?"selected":""}>\u6D45\u8272</option>
            </select>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-compactMode" 
                     ${t.compactMode?"checked":""}>
              <span>\u7D27\u51D1\u6A21\u5F0F</span>
            </label>
            <div class="yyt-form-hint">\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-animationEnabled" 
                     ${t.animationEnabled?"checked":""}>
              <span>\u542F\u7528\u52A8\u753B\u6548\u679C</span>
            </label>
            <div class="yyt-form-hint">\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B</div>
          </div>
        </div>
      </div>
    `},bindEvents(t,e){let s=O();!s||!z(t)||(t.find(".yyt-settings-tab").on("click",r=>{let n=s(r.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),s(r.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${n}"]`).addClass("yyt-active")}),t.find("#yyt-settings-save").on("click",()=>{this._saveSettings(t,s)}),t.find("#yyt-settings-reset").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(be.resetSettings(),mn(Jt.ui,ns()),this.renderTo(t),y("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}))},_saveSettings(t,e){let s={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val())||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val())||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val())||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val())||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},listener:{listenGenerationEnded:t.find("#yyt-setting-listenGenerationEnded").is(":checked"),ignoreQuietGeneration:t.find("#yyt-setting-ignoreQuietGeneration").is(":checked"),ignoreAutoTrigger:t.find("#yyt-setting-ignoreAutoTrigger").is(":checked"),debounceMs:parseInt(t.find("#yyt-setting-debounceMs").val())||300},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};be.saveSettings(s),mn(s.ui,ns()),y("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},destroy(t){!O()||!z(t)||t.find("*").off()},getStyles(){return`
      /* \u8BBE\u7F6E\u9762\u677F\u6837\u5F0F */
      .yyt-settings-panel {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      
      .yyt-settings-tabs {
        display: flex;
        gap: 4px;
        padding: 12px 16px;
        background: rgba(255, 255, 255, 0.02);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        flex-shrink: 0;
      }
      
      .yyt-settings-tab {
        padding: 10px 16px;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 8px;
        color: var(--yyt-text-muted);
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .yyt-settings-tab:hover {
        background: rgba(255, 255, 255, 0.04);
        color: var(--yyt-text);
      }
      
      .yyt-settings-tab.yyt-active {
        background: rgba(123, 183, 255, 0.1);
        border-color: rgba(123, 183, 255, 0.3);
        color: var(--yyt-accent);
      }
      
      .yyt-settings-content {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
      }
      
      .yyt-settings-tab-content {
        display: none;
      }
      
      .yyt-settings-tab-content.yyt-active {
        display: block;
      }
      
      .yyt-settings-section {
        margin-bottom: 24px;
      }
      
      .yyt-settings-section-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--yyt-text);
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }
      
      .yyt-form-row {
        display: flex;
        gap: 16px;
      }
      
      .yyt-form-group {
        margin-bottom: 16px;
      }
      
      .yyt-form-group label {
        display: block;
        font-size: 12px;
        font-weight: 500;
        color: var(--yyt-text);
        margin-bottom: 6px;
      }
      
      .yyt-form-hint {
        font-size: 11px;
        color: var(--yyt-text-muted);
        margin-bottom: 8px;
      }
      
      .yyt-toggle-label {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
      }
      
      .yyt-toggle-label span {
        font-size: 13px;
        color: var(--yyt-text);
      }
      
      .yyt-settings-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 16px;
        background: rgba(255, 255, 255, 0.02);
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        flex-shrink: 0;
      }
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},ll=Fe});var Bo={};X(Bo,{ApiPresetPanel:()=>Ee,BypassPanel:()=>yt,RegexExtractPanel:()=>Se,SCRIPT_ID:()=>u,SettingsPanel:()=>Fe,StatusBlockPanel:()=>Ce,SummaryToolPanel:()=>Pe,ToolManagePanel:()=>_e,UIManager:()=>Yt,YouyouReviewPanel:()=>Ie,bindDialogEvents:()=>xr,createDialogHtml:()=>hr,default:()=>cl,downloadJson:()=>Ue,escapeHtml:()=>x,fillFormWithConfig:()=>at,getAllStyles:()=>zo,getFormApiConfig:()=>Ve,getJQuery:()=>O,initUI:()=>os,isContainerValid:()=>z,readFileContent:()=>ze,registerComponents:()=>Ot,renderApiPanel:()=>Qs,renderBypassPanel:()=>Lo,renderRegexPanel:()=>Xs,renderSettingsPanel:()=>Uo,renderStatusBlockPanel:()=>Oo,renderSummaryToolPanel:()=>Do,renderToolPanel:()=>Zs,renderYouyouReviewPanel:()=>No,resetJQueryCache:()=>Ma,showToast:()=>y,showTopNotice:()=>Re,uiManager:()=>J});function Ot(){J.register(Ee.id,Ee),J.register(Se.id,Se),J.register(_e.id,_e),J.register(Pe.id,Pe),J.register(Ce.id,Ce),J.register(Ie.id,Ie),J.register(yt.id,yt),J.register(Fe.id,Fe),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function os(t={}){let{autoInjectStyles:e=!0,targetDocument:s,...r}=t;J.init(r),Ot(),e&&J.injectStyles(s),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function tt(t,e,s={}){J.render(t,e,s)}function Qs(t){tt(Ee.id,t)}function Xs(t){tt(Se.id,t)}function Zs(t){tt(_e.id,t)}function Do(t){tt(Pe.id,t)}function Oo(t){tt(Ce.id,t)}function No(t){tt(Ie.id,t)}function Lo(t){tt(yt.id,t)}function Uo(t){tt(Fe.id,t)}function zo(){return J.getAllStyles()}var cl,bn=D(()=>{vr();Tr();Mr();jr();un();pn();yn();gn();Js();ke();vr();Tr();Mr();jr();un();pn();yn();gn();Js();cl={uiManager:J,ApiPresetPanel:Ee,RegexExtractPanel:Se,ToolManagePanel:_e,SummaryToolPanel:Pe,StatusBlockPanel:Ce,YouyouReviewPanel:Ie,BypassPanel:yt,SettingsPanel:Fe,registerComponents:Ot,initUI:os,renderApiPanel:Qs,renderRegexPanel:Xs,renderToolPanel:Zs,renderSummaryToolPanel:Do,renderStatusBlockPanel:Oo,renderYouyouReviewPanel:No,renderBypassPanel:Lo,renderSettingsPanel:Uo,getAllStyles:zo}});var Vo={};X(Vo,{ApiPresetPanel:()=>Ee,RegexExtractPanel:()=>Se,SCRIPT_ID:()=>u,StatusBlockPanel:()=>Ce,SummaryToolPanel:()=>Pe,ToolManagePanel:()=>_e,YouyouReviewPanel:()=>Ie,default:()=>dl,escapeHtml:()=>x,fillFormWithConfig:()=>at,getCurrentTab:()=>qo,getFormApiConfig:()=>Ve,getJQuery:()=>O,getRegexStyles:()=>Ho,getStyles:()=>Fo,getToolStyles:()=>Wo,initUI:()=>os,isContainerValid:()=>z,registerComponents:()=>Ot,render:()=>jo,renderRegex:()=>Go,renderTool:()=>Yo,setCurrentTab:()=>Ko,showToast:()=>y,uiManager:()=>J});function hn(t,e){let s=O();return s?t?typeof t=="string"?s(t):t?.jquery?t:s(t):e:(console.error("[YouYouToolkit] jQuery not available"),null)}function jo(t){if(as=hn(t,as),!as||!as.length){console.error("[YouYouToolkit] Container not found or invalid");return}Qs(as)}function Go(t){if(is=hn(t,is),!is||!is.length){console.error("[YouYouToolkit] Regex container not found");return}Xs(is)}function Yo(t){if(ls=hn(t,ls),!ls||!ls.length){console.error("[YouYouToolkit] Tool container not found");return}Zs(ls)}function Fo(){return Ee.getStyles()}function Ho(){return Se.getStyles()}function Wo(){return[_e.getStyles(),Pe.getStyles(),Ce.getStyles(),Ie.getStyles()].join(`
`)}function qo(){return J.getCurrentTab()}function Ko(t){J.switchTab(t)}var as,is,ls,dl,Jo=D(()=>{bn();as=null,is=null,ls=null;dl={render:jo,renderRegex:Go,renderTool:Yo,getStyles:Fo,getRegexStyles:Ho,getToolStyles:Wo,getCurrentTab:qo,setCurrentTab:Ko,uiManager:J,ApiPresetPanel:Ee,RegexExtractPanel:Se,ToolManagePanel:_e,SummaryToolPanel:Pe,StatusBlockPanel:Ce,YouyouReviewPanel:Ie,registerComponents:Ot,initUI:os,SCRIPT_ID:u,escapeHtml:x,showToast:y,getJQuery:O,isContainerValid:z,getFormApiConfig:Ve,fillFormWithConfig:at}});var Xo={};X(Xo,{WindowManager:()=>er,closeWindow:()=>gl,createWindow:()=>yl,windowManager:()=>he});function pl(){if(he.stylesInjected)return;he.stylesInjected=!0;let t=`
    /* ============================================================
       YouYou Toolkit - \u72EC\u7ACB\u7A97\u53E3\u7CFB\u7EDF\u6837\u5F0F
       ============================================================ */
    
    .yyt-window-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      z-index: 9999;
      animation: yytWindowFadeIn 0.2s ease-out;
    }
    
    @keyframes yytWindowFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .yyt-window {
      position: fixed;
      display: flex;
      flex-direction: column;
      background:
        radial-gradient(1200px 600px at 10% -10%, var(--yyt-bg-gradient-1, rgba(123, 183, 255, 0.12)), transparent 60%),
        radial-gradient(900px 500px at 100% 0%, var(--yyt-bg-gradient-2, rgba(155, 123, 255, 0.10)), transparent 55%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 22%),
        var(--yyt-bg-base, #0b0f15);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      box-shadow: 
        0 0 0 1px rgba(255, 255, 255, 0.05),
        0 25px 80px rgba(0, 0, 0, 0.65),
        0 0 60px rgba(123, 183, 255, 0.1);
      min-width: 400px;
      min-height: 300px;
      animation: yytWindowSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
      color: rgba(255, 255, 255, 0.92);
    }
    
    @keyframes yytWindowSlideIn {
      from { 
        opacity: 0; 
        transform: scale(0.95) translateY(-20px); 
      }
      to { 
        opacity: 1; 
        transform: scale(1) translateY(0); 
      }
    }
    
    .yyt-window.maximized {
      top: 10px !important;
      left: 10px !important;
      width: calc(100vw - 20px) !important;
      height: calc(100vh - 20px) !important;
      border-radius: 12px;
    }
    
    /* \u7A84\u5C4F\u6A21\u5F0F */
    @media screen and (max-width: 1100px) {
      .yyt-window.maximized {
        top: 5px !important;
        left: 5px !important;
        width: calc(100vw - 10px) !important;
        height: calc(100vh - 10px) !important;
        border-radius: 8px;
      }
      
      .yyt-window-header {
        padding: 10px 12px;
      }
      
      .yyt-window-controls {
        gap: 6px;
        margin-right: 0;
      }
      
      .yyt-window-btn {
        width: 32px;
        height: 32px;
      }
      
      .yyt-window {
        min-width: 320px;
      }
    }
    
    /* \u8D85\u7A84\u5C4F\u6A21\u5F0F */
    @media screen and (max-width: 768px) {
      .yyt-window {
        min-width: 100vw !important;
        min-height: 100vh !important;
      }
      
      .yyt-window.maximized {
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        border-radius: 0;
        border: none;
      }
      
      .yyt-window-header {
        padding: 8px 10px;
        min-height: 44px;
        flex-shrink: 0;
      }
      
      .yyt-window-controls {
        margin-right: 0;
      }
      
      .yyt-window-title {
        font-size: 13px;
      }
      
      .yyt-window-btn {
        width: 36px;
        height: 36px;
        font-size: 16px;
      }
      
      .yyt-window-body {
        max-width: 100vw;
        overflow-x: hidden;
        overflow-y: auto;
        flex: 1 1 0;
        min-height: 0;
      }
    }
    
    .yyt-window-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      cursor: move;
      user-select: none;
      flex-shrink: 0;
    }
    
    .yyt-window-title {
      font-size: 14px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.95);
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }
    
    .yyt-window-title i {
      color: rgba(123, 183, 255, 0.85);
      flex-shrink: 0;
    }
    
    .yyt-window-title span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .yyt-window-controls {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
      margin-left: 8px;
    }
    
    .yyt-window-btn {
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.06);
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }
    
    .yyt-window-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.95);
    }
    
    .yyt-window-btn.close:hover {
      background: rgba(255, 107, 107, 0.25);
      color: #ff6b6b;
    }
    
    .yyt-window-body {
      flex: 1 1 0;
      min-height: 0;
      overflow: auto;
      overflow-x: hidden;
      padding: 0;
      display: flex;
      flex-direction: column;
    }
    
    .yyt-window-body > * {
      flex: 1 1 0;
      min-height: 0;
      overflow-y: auto;
      box-sizing: border-box;
    }
    
    /* \u7A97\u53E3\u5927\u5C0F\u8C03\u6574\u624B\u67C4 */
    .yyt-window-resize-handle {
      position: absolute;
      background: transparent;
    }
    
    .yyt-window-resize-handle.se {
      right: 0;
      bottom: 0;
      width: 20px;
      height: 20px;
      cursor: se-resize;
    }
    
    .yyt-window-resize-handle.se::after {
      content: '';
      position: absolute;
      right: 4px;
      bottom: 4px;
      width: 10px;
      height: 10px;
      border-right: 2px solid rgba(255, 255, 255, 0.25);
      border-bottom: 2px solid rgba(255, 255, 255, 0.25);
    }
    
    .yyt-window-resize-handle.e {
      right: 0;
      top: 40px;
      bottom: 20px;
      width: 6px;
      cursor: e-resize;
    }
    
    .yyt-window-resize-handle.s {
      left: 20px;
      right: 20px;
      bottom: 0;
      height: 6px;
      cursor: s-resize;
    }
    
    .yyt-window-resize-handle.w {
      left: 0;
      top: 40px;
      bottom: 20px;
      width: 6px;
      cursor: w-resize;
    }
    
    .yyt-window-resize-handle.n {
      left: 20px;
      right: 20px;
      top: 0;
      height: 6px;
      cursor: n-resize;
    }
    
    .yyt-window-resize-handle.nw {
      left: 0;
      top: 0;
      width: 20px;
      height: 20px;
      cursor: nw-resize;
    }
    
    .yyt-window-resize-handle.ne {
      right: 0;
      top: 0;
      width: 20px;
      height: 20px;
      cursor: ne-resize;
    }
    
    .yyt-window-resize-handle.sw {
      left: 0;
      bottom: 0;
      width: 20px;
      height: 20px;
      cursor: sw-resize;
    }
  `,e=document.createElement("style");e.id=ul+"_styles",e.textContent=t,(document.head||document.documentElement).appendChild(e)}function yl(t){let{id:e,title:s="\u7A97\u53E3",content:r="",width:n=900,height:o=700,modal:a=!1,resizable:i=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:d=!0,onClose:p,onReady:b}=t;pl();let f=window.jQuery||window.parent?.jQuery;if(!f)return console.error("[WindowManager] jQuery not available"),null;if(he.isOpen(e))return he.bringToFront(e),he.getWindow(e);let _=window.innerWidth||1200,Z=window.innerHeight||800,K=_<=1100,se=null,j=!1;d&&(se=he.getState(e),se&&!K&&(j=!0));let re,v;j&&se.width&&se.height?(re=Math.max(400,Math.min(se.width,_-40)),v=Math.max(300,Math.min(se.height,Z-40))):(re=Math.max(400,Math.min(n,_-40)),v=Math.max(300,Math.min(o,Z-40)));let S=Math.max(20,Math.min((_-re)/2,_-re-20)),M=Math.max(20,Math.min((Z-v)/2,Z-v-20)),me=l&&!K,ne=`
    <div class="yyt-window" id="${e}" style="left:${S}px; top:${M}px; width:${re}px; height:${v}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${fl(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${me?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
          <button class="yyt-window-btn close" title="\u5173\u95ED"><i class="fa-solid fa-times"></i></button>
        </div>
      </div>
      <div class="yyt-window-body">${r}</div>
      ${i?`
        <div class="yyt-window-resize-handle se"></div>
        <div class="yyt-window-resize-handle e"></div>
        <div class="yyt-window-resize-handle s"></div>
        <div class="yyt-window-resize-handle w"></div>
        <div class="yyt-window-resize-handle n"></div>
        <div class="yyt-window-resize-handle nw"></div>
        <div class="yyt-window-resize-handle ne"></div>
        <div class="yyt-window-resize-handle sw"></div>
      `:""}
    </div>
  `,pe=null;a&&(pe=f(`<div class="yyt-window-overlay" data-for="${e}"></div>`),f(document.body).append(pe));let I=f(ne);f(document.body).append(I),he.register(e,I),I.on("mousedown",()=>he.bringToFront(e));let ie=!1,ye={left:S,top:M,width:re,height:v},V=()=>{ye={left:parseInt(I.css("left")),top:parseInt(I.css("top")),width:I.width(),height:I.height()},I.addClass("maximized"),I.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),ie=!0},nr=()=>{I.removeClass("maximized"),I.css({left:ye.left+"px",top:ye.top+"px",width:ye.width+"px",height:ye.height+"px"}),I.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),ie=!1};I.find(".yyt-window-btn.maximize").on("click",()=>{ie?nr():V()}),(K&&l||j&&se.isMaximized&&l||c&&l)&&V(),I.find(".yyt-window-btn.close").on("click",()=>{if(d&&l){let A={width:ie?ye.width:I.width(),height:ie?ye.height:I.height(),isMaximized:ie};he.saveState(e,A)}p&&p(),pe&&pe.remove(),I.remove(),he.unregister(e),f(document).off(".yytWindowDrag"+e),f(document).off(".yytWindowResize"+e)}),pe&&pe.on("click",A=>{A.target,pe[0]});let g=!1,m,T,P,G;if(I.find(".yyt-window-header").on("mousedown",A=>{f(A.target).closest(".yyt-window-controls").length||ie||(g=!0,m=A.clientX,T=A.clientY,P=parseInt(I.css("left")),G=parseInt(I.css("top")),f(document.body).css("user-select","none"))}),f(document).on("mousemove.yytWindowDrag"+e,A=>{if(!g)return;let $=A.clientX-m,k=A.clientY-T;I.css({left:Math.max(0,P+$)+"px",top:Math.max(0,G+k)+"px"})}),f(document).on("mouseup.yytWindowDrag"+e,()=>{g&&(g=!1,f(document.body).css("user-select",""))}),i){let A=!1,$="",k,B,ee,Te,gt,ft;I.find(".yyt-window-resize-handle").on("mousedown",function(Ne){ie||(A=!0,$="",f(this).hasClass("se")?$="se":f(this).hasClass("e")?$="e":f(this).hasClass("s")?$="s":f(this).hasClass("w")?$="w":f(this).hasClass("n")?$="n":f(this).hasClass("nw")?$="nw":f(this).hasClass("ne")?$="ne":f(this).hasClass("sw")&&($="sw"),k=Ne.clientX,B=Ne.clientY,ee=I.width(),Te=I.height(),gt=parseInt(I.css("left")),ft=parseInt(I.css("top")),f(document.body).css("user-select","none"),Ne.stopPropagation())}),f(document).on("mousemove.yytWindowResize"+e,Ne=>{if(!A)return;let mt=Ne.clientX-k,ge=Ne.clientY-B,we=400,bt=300,Nt=ee,Lt=Te,ds=gt,us=ft;if($.includes("e")&&(Nt=Math.max(we,ee+mt)),$.includes("s")&&(Lt=Math.max(bt,Te+ge)),$.includes("w")){let st=ee-mt;st>=we&&(Nt=st,ds=gt+mt)}if($.includes("n")){let st=Te-ge;st>=bt&&(Lt=st,us=ft+ge)}I.css({width:Nt+"px",height:Lt+"px",left:ds+"px",top:us+"px"})}),f(document).on("mouseup.yytWindowResize"+e,()=>{A&&(A=!1,f(document.body).css("user-select",""))})}return I.on("remove",()=>{f(document).off(".yytWindowDrag"+e),f(document).off(".yytWindowResize"+e)}),b&&setTimeout(()=>b(I),50),I}function gl(t){let e=he.getWindow(t);if(e){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${t}"]`).remove(),s(document).off(".yytWindowDrag"+t),s(document).off(".yytWindowResize"+t)),e.remove(),he.unregister(t)}}function fl(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}var ul,Qo,er,he,Zo=D(()=>{We();ul="youyou_toolkit_window_manager",Qo="window_states",er=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,s){this.topZIndex++,this.windows.set(e,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let s=this.windows.get(e);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,s)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,s){let r=this.loadStates();r[e]={...s,updatedAt:Date.now()},Ut.set(Qo,r)}loadStates(){return Ut.get(Qo)||{}}getState(e){return this.loadStates()[e]||null}},he=new er});var ea={};X(ea,{DEFAULT_PROMPT_SEGMENTS:()=>tr,PromptEditor:()=>sr,default:()=>El,getPromptEditorStyles:()=>xl,messagesToSegments:()=>wl,segmentsToMessages:()=>Tl,validatePromptSegments:()=>vl});function xl(){return`
    /* ============================================================
       \u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6837\u5F0F
       ============================================================ */
    
    .yyt-prompt-editor {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: transparent;
    }
    
    .yyt-prompt-editor-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      flex-shrink: 0;
    }
    
    .yyt-prompt-editor-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.9);
    }
    
    .yyt-prompt-editor-title i {
      color: var(--yyt-accent, #7bb7ff);
    }
    
    .yyt-prompt-editor-actions {
      display: flex;
      gap: 8px;
    }
    
    .yyt-prompt-segments {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .yyt-prompt-segment {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.2s ease;
    }
    
    .yyt-prompt-segment:hover {
      border-color: rgba(255, 255, 255, 0.12);
    }
    
    .yyt-prompt-segment.yyt-main-a {
      border-left: 3px solid var(--yyt-accent, #7bb7ff);
    }
    
    .yyt-prompt-segment.yyt-main-b {
      border-left: 3px solid #ffb74d;
    }
    
    .yyt-prompt-segment-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.02);
      cursor: pointer;
      user-select: none;
    }
    
    .yyt-prompt-segment-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .yyt-prompt-segment-info > i {
      color: var(--yyt-accent, #7bb7ff);
      font-size: 14px;
    }
    
    .yyt-prompt-segment-title {
      font-weight: 600;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.9);
    }
    
    .yyt-prompt-segment-badges {
      display: flex;
      gap: 6px;
      margin-left: 8px;
    }
    
    .yyt-prompt-role-badge,
    .yyt-prompt-slot-badge {
      font-size: 10px;
      padding: 3px 8px;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
      font-weight: 500;
    }
    
    .yyt-prompt-role-badge {
      background: rgba(123, 183, 255, 0.1);
      color: var(--yyt-accent, #7bb7ff);
    }
    
    .yyt-prompt-slot-badge {
      background: rgba(255, 183, 77, 0.1);
      color: #ffb74d;
    }
    
    .yyt-prompt-segment-controls {
      display: flex;
      gap: 6px;
    }
    
    .yyt-prompt-segment-body {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
    
    .yyt-prompt-segment.yyt-expanded .yyt-prompt-segment-body {
      max-height: 600px;
    }
    
    .yyt-prompt-segment-meta {
      padding: 12px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    
    .yyt-prompt-segment-meta .yyt-form-row {
      display: flex;
      gap: 12px;
    }
    
    .yyt-prompt-segment-meta .yyt-form-group {
      flex: 1;
    }
    
    .yyt-prompt-segment-meta label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .yyt-prompt-textarea {
      width: 100%;
      min-height: 120px;
      padding: 12px 16px;
      border: none;
      background: transparent;
      color: rgba(255, 255, 255, 0.85);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
      font-size: 13px;
      line-height: 1.6;
      resize: vertical;
    }
    
    .yyt-prompt-textarea:focus {
      outline: none;
    }
    
    .yyt-prompt-textarea::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
  `}function vl(t){let e=[];return Array.isArray(t)?(t.forEach((s,r)=>{s.id||e.push(`\u6BB5\u843D ${r+1} \u7F3A\u5C11ID`),s.role||e.push(`\u6BB5\u843D ${r+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(s.role)||e.push(`\u6BB5\u843D ${r+1} \u7684role\u503C\u65E0\u6548: ${s.role}`)}),{valid:e.length===0,errors:e}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function Tl(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function wl(t){return Array.isArray(t)?t.map((e,s)=>({id:`segment_${s}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...tr]}var ml,bl,hl,tr,sr,El,ta=D(()=>{ml="youyou_toolkit_prompt_editor",bl={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},hl={system:"fa-server",ai:"fa-robot",user:"fa-user"},tr=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],sr=class{constructor(e={}){this.containerId=e.containerId||ml,this.segments=e.segments||[...tr],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...tr],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
      <div class="yyt-prompt-editor" id="${this.containerId}">
        <div class="yyt-prompt-editor-header">
          <div class="yyt-prompt-editor-title">
            <i class="fa-solid fa-file-alt"></i>
            <span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668</span>
          </div>
          <div class="yyt-prompt-editor-actions">
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${this.containerId}-add-segment" title="\u6DFB\u52A0\u6BB5\u843D">
              <i class="fa-solid fa-plus"></i> \u6DFB\u52A0
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${this.containerId}-import-prompt" title="\u5BFC\u5165">
              <i class="fa-solid fa-file-import"></i>
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${this.containerId}-export-prompt" title="\u5BFC\u51FA">
              <i class="fa-solid fa-file-export"></i>
            </button>
          </div>
        </div>
        <div class="yyt-prompt-segments">
          ${this.segments.map(s=>this.renderSegment(s)).join("")}
        </div>
      </div>
    `;this.$container.html(e)}renderSegment(e){let s=bl[e.type]||e.type,r=hl[e.type]||"fa-file",n=e.mainSlot==="A"||e.isMain,o=e.mainSlot==="B"||e.isMain2,a=n?"var(--yyt-accent, #7bb7ff)":o?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${n?"yyt-main-a":""} ${o?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
           style="${a?`border-left: 3px solid ${a};`:""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${r}"></i>
            <span class="yyt-prompt-segment-title">${s}</span>
            <div class="yyt-prompt-segment-badges">
              ${l}
              ${i}
            </div>
          </div>
          <div class="yyt-prompt-segment-controls">
            ${e.deletable!==!1?`
              <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-btn-danger yyt-prompt-delete" title="\u5220\u9664\u6BB5\u843D">
                <i class="fa-solid fa-trash"></i>
              </button>
            `:""}
            <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-prompt-toggle" title="\u5C55\u5F00/\u6298\u53E0">
              <i class="fa-solid ${e.expanded?"fa-chevron-up":"fa-chevron-down"}"></i>
            </button>
          </div>
        </div>
        <div class="yyt-prompt-segment-body">
          <div class="yyt-prompt-segment-meta">
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>Role</label>
                <select class="yyt-select yyt-prompt-role" ${this.editable?"":"disabled"}>
                  <option value="SYSTEM" ${e.role==="SYSTEM"?"selected":""}>SYSTEM</option>
                  <option value="USER" ${e.role==="USER"?"selected":""}>USER</option>
                  <option value="assistant" ${e.role==="assistant"?"selected":""}>assistant</option>
                </select>
              </div>
              ${this.showMainSlot?`
              <div class="yyt-form-group yyt-flex-1">
                <label>Main Slot</label>
                <select class="yyt-select yyt-prompt-main-slot" ${this.editable?"":"disabled"}>
                  <option value="" ${e.mainSlot?"":"selected"}>\u666E\u901A</option>
                  <option value="A" ${e.mainSlot==="A"?"selected":""}>A (\u5EFA\u8BAESystem)</option>
                  <option value="B" ${e.mainSlot==="B"?"selected":""}>B (\u5EFA\u8BAEUser)</option>
                </select>
              </div>
              `:""}
            </div>
          </div>
          <textarea class="yyt-textarea yyt-prompt-textarea" 
                    rows="6" 
                    placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u5185\u5BB9..." 
                    ${this.editable?"":"disabled"}>${this.escapeHtml(e.content||"")}</textarea>
        </div>
      </div>
    `}bindEvents(){this.$container&&(this.$container.find(".yyt-prompt-toggle").on("click",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.find(".yyt-prompt-delete").on("click",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.find(".yyt-prompt-role").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),r=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{role:r})}),this.$container.find(".yyt-prompt-main-slot").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),r=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:r})}),this.$container.find(".yyt-prompt-textarea").on("input",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.find(`#${this.containerId}-add-segment`).on("click",()=>{this.addSegment()}),this.$container.find(`#${this.containerId}-import-prompt`).on("click",()=>{this.importPrompt()}),this.$container.find(`#${this.containerId}-export-prompt`).on("click",()=>{this.exportPrompt()}))}addSegment(e=null){let s=`segment_${Date.now()}`,r=e||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};r.id||(r.id=s),this.segments.push(r),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let s=this.segments.findIndex(n=>n.id===e);if(s===-1)return;if(this.segments[s].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,s){let r=this.segments.find(n=>n.id===e);r&&(Object.assign(r,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=s=>{let r=s.target.files[0];if(!r)return;let n=new FileReader;n.onload=o=>{try{let a=JSON.parse(o.target.result);Array.isArray(a)?(this.setSegments(a),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",a)}},n.readAsText(r)},e.click()}exportPrompt(){let e=this.getSegments(),s=JSON.stringify(e,null,2),r=new Blob([s],{type:"application/json"}),n=URL.createObjectURL(r),o=document.createElement("a");o.href=n,o.download=`prompt_group_${Date.now()}.json`,o.click(),URL.revokeObjectURL(n),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}};El=sr});function sa(t,e={}){let{constants:s,topLevelWindow:r,modules:n}=t,{SCRIPT_ID:o,SCRIPT_VERSION:a,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=s,c=null,d=!1;function p(...v){console.log(`[${o}]`,...v)}function b(...v){console.error(`[${o}]`,...v)}async function f(){return c||(c=(async()=>{try{return n.storageModule=await Promise.resolve().then(()=>(Bt(),Sn)),n.apiConnectionModule=await Promise.resolve().then(()=>(ps(),Mn)),n.presetManagerModule=await Promise.resolve().then(()=>(ms(),Pn)),n.uiModule=await Promise.resolve().then(()=>(bn(),Bo)),n.uiComponentsModule=await Promise.resolve().then(()=>(Jo(),Vo)),n.regexExtractorModule=await Promise.resolve().then(()=>(Ms(),Bn)),n.toolManagerModule=await Promise.resolve().then(()=>(Is(),jn)),n.toolExecutorModule=await Promise.resolve().then(()=>(qr(),uo)),n.toolTriggerModule=await Promise.resolve().then(()=>(dn(),Po)),n.windowManagerModule=await Promise.resolve().then(()=>(Zo(),Xo)),n.toolRegistryModule=await Promise.resolve().then(()=>(Pt(),no)),n.promptEditorModule=await Promise.resolve().then(()=>(ta(),ea)),n.settingsServiceModule=await Promise.resolve().then(()=>(Qt(),ao)),n.bypassManagerModule=await Promise.resolve().then(()=>(Vt(),oo)),n.variableResolverModule=await Promise.resolve().then(()=>(Vr(),fo)),n.contextInjectorModule=await Promise.resolve().then(()=>(Kr(),yo)),n.toolPromptServiceModule=await Promise.resolve().then(()=>(Jr(),bo)),n.toolOutputServiceModule=await Promise.resolve().then(()=>(Qr(),ho)),n.toolOutputServiceModule?.toolOutputService&&n.apiConnectionModule&&n.toolOutputServiceModule.toolOutputService.setApiConnection(n.apiConnectionModule),!0}catch(v){return c=null,console.warn(`[${o}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,v),!1}})(),c)}function _(){return`
      /* CSS\u53D8\u91CF */
      :root {
        --yyt-accent: #7bb7ff;
        --yyt-accent-glow: rgba(123, 183, 255, 0.4);
        --yyt-accent-soft: rgba(123, 183, 255, 0.15);
        --yyt-accent-strong: #a5d4ff;
        --yyt-on-accent: #0b0f15;
        --yyt-success: #4ade80;
        --yyt-success-glow: rgba(74, 222, 128, 0.3);
        --yyt-error: #f87171;
        --yyt-danger: var(--yyt-error);
        --yyt-error-glow: rgba(248, 113, 113, 0.3);
        --yyt-warning: #fbbf24;
        --yyt-bg-base: #0b0f15;
        --yyt-bg-gradient-1: rgba(123, 183, 255, 0.12);
        --yyt-bg-gradient-2: rgba(155, 123, 255, 0.10);
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
      }

      /* \u83DC\u5355\u9879 */
      #${l} { display: flex; align-items: center; }

      #${i} {
        display: flex; align-items: center; gap: 8px;
        padding: 10px 14px; cursor: pointer;
        transition: all 0.2s ease; border-radius: 8px; margin: 2px;
      }

      #${i}:hover {
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
      }

      #${i} .fa-fw {
        font-size: 16px; color: var(--yyt-accent);
        filter: drop-shadow(0 0 6px var(--yyt-accent-glow));
      }

      #${i} span { font-weight: 500; letter-spacing: 0.3px; }

      /* \u4E3B\u5F39\u7A97\u906E\u7F69 */
      .yyt-popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        z-index: 9999;
      }

      /* \u4E3B\u5F39\u7A97 */
      .yyt-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        width: 950px;
        max-width: 95vw;
        height: 85vh;
        max-height: 90vh;
        background:
          radial-gradient(1200px 600px at 10% -10%, var(--yyt-bg-gradient-1), transparent 60%),
          radial-gradient(900px 500px at 100% 0%, var(--yyt-bg-gradient-2), transparent 55%),
          linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 22%),
          var(--yyt-bg-base);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 16px;
        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.65), 0 0 60px rgba(123, 183, 255, 0.1);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
        color: var(--yyt-text);
        z-index: 10000;
      }

      /* \u5F39\u7A97\u5934\u90E8 */
      .yyt-popup-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 20px;
        background: var(--yyt-surface-hover);
        border-bottom: 1px solid var(--yyt-border);
        border-radius: 16px 16px 0 0;
        flex-shrink: 0;
        cursor: grab;
      }

      .yyt-popup-brand {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
      }

      .yyt-popup-title-row {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }

      .yyt-popup.yyt-popup-dragging .yyt-popup-header {
        cursor: grabbing;
      }

      .yyt-popup-title {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 15px;
        font-weight: 700;
        color: var(--yyt-text);
        min-width: 0;
      }

      .yyt-popup-title span:last-child {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .yyt-popup-version {
        display: inline-flex;
        align-items: center;
        padding: 4px 10px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 700;
        color: var(--yyt-accent);
        background: var(--yyt-accent-soft);
        border: 1px solid rgba(123, 183, 255, 0.18);
        flex-shrink: 0;
      }

      .yyt-popup-subtitle {
        font-size: 12px;
        color: var(--yyt-text-muted);
        letter-spacing: 0.3px;
      }

      .yyt-popup-title i {
        color: var(--yyt-accent);
        font-size: 18px;
      }

      .yyt-popup-header-actions {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-shrink: 0;
      }

      .yyt-popup-drag-hint {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 12px;
        color: var(--yyt-text-secondary);
        background: rgba(255, 255, 255, 0.03);
        border: 1px dashed rgba(255, 255, 255, 0.12);
      }

      .yyt-popup-drag-hint i {
        color: var(--yyt-accent);
      }

      .yyt-popup-close {
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 8px;
        background: var(--yyt-surface-hover);
        color: var(--yyt-text-secondary);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
      }

      .yyt-popup-close:hover {
        background: rgba(255, 107, 107, 0.25);
        color: #ff6b6b;
      }

      /* \u5F39\u7A97\u4E3B\u4F53 */
      .yyt-popup-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;
        padding: 16px 20px;
        overflow: hidden;
      }

      .yyt-popup-shell {
        display: flex;
        flex-direction: column;
        min-height: 0;
        flex: 1;
        gap: 14px;
      }

      /* \u5F39\u7A97\u5E95\u90E8 */
      .yyt-popup-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        padding: 14px 20px;
        background: var(--yyt-surface);
        border-top: 1px solid var(--yyt-border);
        border-radius: 0 0 16px 16px;
        flex-shrink: 0;
      }

      .yyt-popup-footer-left,
      .yyt-popup-footer-right {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .yyt-popup-status {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 12px;
        color: var(--yyt-text-secondary);
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .yyt-popup-status i {
        color: var(--yyt-accent);
      }

      /* \u4E3B\u9876\u680F */
      .yyt-main-nav {
        display: flex;
        gap: 4px;
        padding: 8px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
        border-radius: 14px;
        margin-bottom: 16px;
        border: 1px solid var(--yyt-border);
        flex-shrink: 0;
      }

      .yyt-main-nav-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 18px;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.25s ease;
        color: var(--yyt-text-secondary);
        font-weight: 500;
        font-size: 14px;
      }

      .yyt-main-nav-item:hover {
        color: var(--yyt-text);
        background: var(--yyt-surface-hover);
      }

      .yyt-main-nav-item.active {
        color: var(--yyt-on-accent);
        background: linear-gradient(135deg, var(--yyt-accent) 0%, var(--yyt-accent-strong) 100%);
      }

      /* \u6B21\u7EA7\u9876\u680F */
      .yyt-sub-nav {
        display: flex;
        gap: 4px;
        padding: 6px;
        background: rgba(255, 255, 255, 0.02);
        border-radius: 10px;
        margin-bottom: 16px;
        border: 1px solid rgba(255, 255, 255, 0.05);
        flex-shrink: 0;
      }

      .yyt-sub-nav-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 14px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        color: var(--yyt-text-secondary);
        font-weight: 500;
        font-size: 13px;
      }

      .yyt-sub-nav-item:hover {
        color: var(--yyt-text);
        background: rgba(255, 255, 255, 0.05);
      }

      .yyt-sub-nav-item.active {
        color: var(--yyt-accent);
        background: rgba(123, 183, 255, 0.1);
      }

      /* \u5185\u5BB9\u533A\u57DF */
      .yyt-content {
        flex: 1;
        min-height: 0;
        overflow: auto;
        padding: 4px;
        border-radius: calc(var(--yyt-radius) + 2px);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.015) 0%, rgba(255, 255, 255, 0.03) 100%);
        border: 1px solid rgba(255, 255, 255, 0.05);
      }

      .yyt-content-inner {
        min-height: 100%;
      }

      /* \u6807\u7B7E\u5185\u5BB9 */
      .yyt-tab-content {
        display: none;
        flex: 1;
        min-height: 0;
        overflow-y: auto;
      }

      .yyt-tab-content.active {
        display: block;
      }

      /* \u9762\u677F\u6837\u5F0F */
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
      }

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
      }

      /* \u6309\u94AE\u6837\u5F0F */
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
        transition: all 0.25s ease;
      }

      .yyt-btn-primary {
        background: linear-gradient(135deg, var(--yyt-accent) 0%, var(--yyt-accent-strong) 100%);
        color: var(--yyt-on-accent);
      }

      .yyt-btn-primary:hover {
        transform: translateY(-1px);
      }

      .yyt-btn-secondary {
        background: linear-gradient(135deg, var(--yyt-surface-active) 0%, var(--yyt-surface) 100%);
        color: var(--yyt-text);
        border: 1px solid var(--yyt-border);
      }

      .yyt-btn-secondary:hover {
        border-color: var(--yyt-border-strong);
      }

      .yyt-btn-danger {
        background: linear-gradient(135deg, rgba(248, 113, 113, 0.15) 0%, rgba(248, 113, 113, 0.05) 100%);
        color: var(--yyt-error);
        border: 1px solid rgba(248, 113, 113, 0.25);
      }

      .yyt-btn-small {
        padding: 6px 10px;
        font-size: 11px;
      }

      /* \u8868\u5355\u6837\u5F0F */
      .yyt-form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .yyt-form-group label {
        font-size: 12px;
        font-weight: 600;
        color: var(--yyt-text-secondary);
      }

      .yyt-form-row {
        display: flex;
        gap: 12px;
      }

      .yyt-flex-1 {
        flex: 1;
      }

      .yyt-input,
      .yyt-select,
      .yyt-textarea {
        padding: 10px 14px;
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        background: rgba(255, 255, 255, 0.03);
        color: var(--yyt-text);
        font-size: 13px;
      }

      .yyt-input:focus,
      .yyt-select:focus,
      .yyt-textarea:focus {
        outline: none;
        border-color: var(--yyt-accent);
      }

      .yyt-input::placeholder,
      .yyt-textarea::placeholder {
        color: var(--yyt-text-muted);
      }

      .yyt-textarea {
        resize: vertical;
        min-height: 80px;
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

      /* \u5B50\u5185\u5BB9\u533A\u57DF */
      .yyt-sub-content {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
      }

      /* \u5DE5\u5177\u7A97\u53E3\u5BB9\u5668 */
      .yyt-tool-window {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .yyt-compact-mode .yyt-popup-body {
        padding: 12px 16px;
      }

      .yyt-compact-mode .yyt-panel {
        gap: 14px;
      }

      .yyt-compact-mode .yyt-panel-section {
        padding: 14px;
        gap: 10px;
      }

      .yyt-no-animation *,
      .yyt-no-animation *::before,
      .yyt-no-animation *::after {
        animation: none !important;
        transition: none !important;
      }

      /* \u54CD\u5E94\u5F0F */
      @media screen and (max-width: 1100px) {
        .yyt-popup {
          width: 98vw;
          height: 90vh;
        }

        .yyt-popup-header-actions {
          gap: 8px;
        }

        .yyt-popup-drag-hint {
          padding: 6px 10px;
        }
      }

      @media screen and (max-width: 768px) {
        .yyt-popup {
          width: 100vw;
          height: 100vh;
          border-radius: 0;
          border: none;
        }

        .yyt-popup-header-actions {
          gap: 6px;
        }

        .yyt-popup-drag-hint {
          display: none;
        }

        .yyt-popup-footer {
          flex-direction: column;
          align-items: stretch;
        }

        .yyt-popup-footer-left,
        .yyt-popup-footer-right {
          width: 100%;
          justify-content: center;
        }
      }
    `}async function Z(){let v=`${o}-styles`,S=r.document||document;if(S.getElementById(v))return;let M="";try{let ne=await fetch("./styles/main.css");ne.ok&&(M=await ne.text())}catch{p("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F")}M||(M=_());let me=S.createElement("style");me.id=v,me.textContent=M,(S.head||S.documentElement).appendChild(me),p("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function K(){let v=r.document||document;if(n.uiModule?.getAllStyles){let S=`${o}-ui-styles`;if(!v.getElementById(S)){let M=v.createElement("style");M.id=S,M.textContent=n.uiModule.getAllStyles(),(v.head||v.documentElement).appendChild(M)}}else if(n.uiComponentsModule){let S=`${o}-ui-styles`;if(!v.getElementById(S)){let M=v.createElement("style");M.id=S,M.textContent=[n.uiComponentsModule.getStyles?.()||"",n.uiComponentsModule.getRegexStyles?.()||"",n.uiComponentsModule.getToolStyles?.()||""].join(`
`),(v.head||v.documentElement).appendChild(M)}}if(n.promptEditorModule&&n.promptEditorModule.getPromptEditorStyles){let S=`${o}-prompt-styles`;if(!v.getElementById(S)){let M=v.createElement("style");M.id=S,M.textContent=n.promptEditorModule.getPromptEditorStyles(),(v.head||v.documentElement).appendChild(M)}}}async function se(){try{let{applyUiPreferences:v}=await Promise.resolve().then(()=>(Js(),$o));if(n.settingsServiceModule?.settingsService){let S=n.settingsServiceModule.settingsService.getUiSettings();if(S&&S.theme){let M=r.document||document;v(S,M),p(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${S.theme}`)}}}catch(v){p("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",v)}}function j(){let v=r.jQuery||window.jQuery;if(!v){b("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(j,1e3);return}let S=r.document||document,M=v("#extensionsMenu",S);if(!M.length){p("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(j,2e3);return}if(v(`#${l}`,M).length>0){p("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let ne=v(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),pe=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,I=v(pe);I.on("click",function(ye){ye.stopPropagation(),p("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let V=v("#extensionsMenuButton",S);V.length&&M.is(":visible")&&V.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),ne.append(I),M.append(ne),p("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function re(){if(p(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await Z(),await f()){if(p("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),!d&&n.uiModule?.initUI)try{n.uiModule.initUI({services:n,autoInjectStyles:!1,targetDocument:r.document||document}),d=!0,p("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(M){console.error(`[${o}] UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,M)}if(n.toolTriggerModule?.initTriggerModule)try{n.toolTriggerModule.initTriggerModule(),p("\u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316")}catch(M){console.error(`[${o}] \u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,M)}K(),await se()}else p("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let S=r.document||document;S.readyState==="loading"?S.addEventListener("DOMContentLoaded",()=>{setTimeout(j,1e3)}):setTimeout(j,1e3),p("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:f,injectStyles:Z,addMenuItem:j,init:re,log:p,logError:b}}function ra(t){let{constants:e,topLevelWindow:s,modules:r,caches:n,uiState:o}=t,{SCRIPT_ID:a,SCRIPT_VERSION:i,POPUP_ID:l}=e,c={cleanup:null};function d(...g){console.log(`[${a}]`,...g)}function p(...g){console.error(`[${a}]`,...g)}function b(g){return typeof g!="string"?"":g.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function f(){return s.jQuery||window.jQuery}function _(){return s.document||document}function Z(g){if(!g)return"\u672A\u9009\u62E9\u9875\u9762";let m=r.toolRegistryModule?.getToolConfig(g);if(!m)return g;if(!m.hasSubTabs)return m.name||g;let T=o.currentSubTab[g]||m.subTabs?.[0]?.id||"",P=m.subTabs?.find(G=>G.id===T);return P?.name?`${m.name} / ${P.name}`:m.name||g}function K(){let g=o.currentPopup;if(!g)return;let m=g.querySelector(".yyt-popup-active-label");m&&(m.textContent=`\u5F53\u524D\uFF1A${Z(o.currentMainTab)}`)}function se(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function j(){let g=_(),m=o.currentPopup,T=m?.querySelector(".yyt-popup-header");if(!m||!T||!g)return;let P=!1,G=0,A=0,$=0,k=0,B="",ee=()=>({width:s.innerWidth||g.documentElement?.clientWidth||window.innerWidth||0,height:s.innerHeight||g.documentElement?.clientHeight||window.innerHeight||0}),Te=(ge,we,bt)=>Math.min(Math.max(ge,we),bt),gt=()=>{P&&(P=!1,m.classList.remove("yyt-popup-dragging"),g.body.style.userSelect=B)},ft=ge=>{if(!P||!o.currentPopup)return;let we=ge.clientX-G,bt=ge.clientY-A,{width:Nt,height:Lt}=ee(),ds=m.offsetWidth||0,us=m.offsetHeight||0,st=Math.max(0,Nt-ds),aa=Math.max(0,Lt-us);m.style.left=`${Te($+we,0,st)}px`,m.style.top=`${Te(k+bt,0,aa)}px`,m.style.transform="none",m.style.right="auto",m.style.bottom="auto"},Ne=()=>{gt()},mt=ge=>{if(ge.button!==0||ge.target?.closest(".yyt-popup-close"))return;P=!0,G=ge.clientX,A=ge.clientY;let we=m.getBoundingClientRect();$=we.left,k=we.top,m.style.left=`${we.left}px`,m.style.top=`${we.top}px`,m.style.transform="none",m.style.right="auto",m.style.bottom="auto",m.classList.add("yyt-popup-dragging"),B=g.body.style.userSelect||"",g.body.style.userSelect="none",ge.preventDefault()};T.addEventListener("mousedown",mt),g.addEventListener("mousemove",ft),g.addEventListener("mouseup",Ne),c.cleanup=()=>{gt(),T.removeEventListener("mousedown",mt),g.removeEventListener("mousemove",ft),g.removeEventListener("mouseup",Ne)}}function re(){se(),o.currentPopup&&(o.currentPopup.remove(),o.currentPopup=null),o.currentOverlay&&(o.currentOverlay.remove(),o.currentOverlay=null),d("\u5F39\u7A97\u5DF2\u5173\u95ED")}function v(g){o.currentMainTab=g;let m=f();if(!m||!o.currentPopup)return;m(o.currentPopup).find(".yyt-main-nav-item").removeClass("active"),m(o.currentPopup).find(`.yyt-main-nav-item[data-tab="${g}"]`).addClass("active");let T=r.toolRegistryModule?.getToolConfig(g);T?.hasSubTabs?(m(o.currentPopup).find(".yyt-sub-nav").show(),M(g,T.subTabs)):m(o.currentPopup).find(".yyt-sub-nav").hide(),m(o.currentPopup).find(".yyt-tab-content").removeClass("active"),m(o.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`).addClass("active"),me(g),K()}function S(g,m){o.currentSubTab[g]=m;let T=f();!T||!o.currentPopup||(T(o.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),T(o.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${m}"]`).addClass("active"),ne(g,m),K())}function M(g,m){let T=f();if(!T||!o.currentPopup||!m)return;let P=o.currentSubTab[g]||m[0]?.id,G=m.map(A=>`
      <div class="yyt-sub-nav-item ${A.id===P?"active":""}" data-subtab="${A.id}">
        <i class="fa-solid ${A.icon||"fa-file"}"></i>
        <span>${A.name}</span>
      </div>
    `).join("");T(o.currentPopup).find(".yyt-sub-nav").html(G),T(o.currentPopup).find(".yyt-sub-nav-item").on("click",function(){let $=T(this).data("subtab");S(g,$)})}async function me(g){let m=f();if(!m||!o.currentPopup)return;let T=m(o.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!T.length)return;let P=r.toolRegistryModule?.getToolConfig(g);switch(g){case"apiPresets":r.uiModule?.renderApiPanel?r.uiModule.renderApiPanel(T):r.uiComponentsModule?.render&&r.uiComponentsModule.render(T);break;case"toolManage":r.uiModule?.renderToolPanel?r.uiModule.renderToolPanel(T):r.uiComponentsModule?.renderTool&&r.uiComponentsModule.renderTool(T);break;case"regexExtract":r.uiModule?.renderRegexPanel?r.uiModule.renderRegexPanel(T):r.uiComponentsModule?.renderRegex&&r.uiComponentsModule.renderRegex(T);break;case"tools":if(P?.hasSubTabs&&P.subTabs?.length>0){let G=o.currentSubTab[g]||P.subTabs[0].id;ne(g,G)}else T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":r.uiModule?.renderBypassPanel?r.uiModule.renderBypassPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"settings":r.uiModule?.renderSettingsPanel?r.uiModule.renderSettingsPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:I(g,T);break}}function ne(g,m){let T=f();if(!T||!o.currentPopup)return;let P=T(o.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!P.length)return;let G=r.toolRegistryModule?.getToolConfig(g);if(G?.hasSubTabs){let $=G.subTabs?.find(k=>k.id===m);if($){let k=P.find(".yyt-sub-content");switch(k.length||(P.html('<div class="yyt-sub-content"></div>'),k=P.find(".yyt-sub-content")),$.component){case"SummaryToolPanel":r.uiModule?.renderSummaryToolPanel?r.uiModule.renderSummaryToolPanel(k):r.uiComponentsModule?.SummaryToolPanel?r.uiComponentsModule.SummaryToolPanel.renderTo(k):k.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"StatusBlockPanel":r.uiModule?.renderStatusBlockPanel?r.uiModule.renderStatusBlockPanel(k):r.uiComponentsModule?.StatusBlockPanel?r.uiComponentsModule.StatusBlockPanel.renderTo(k):k.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"YouyouReviewPanel":r.uiModule?.renderYouyouReviewPanel?r.uiModule.renderYouyouReviewPanel(k):r.uiComponentsModule?.YouyouReviewPanel?r.uiComponentsModule.YouyouReviewPanel.renderTo(k):k.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"GenericToolConfigPanel":pe($,k);break;default:k.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}return}let A=P.find(".yyt-sub-content");if(A.length)switch(m){case"config":ie(g,A);break;case"prompts":ye(g,A);break;case"presets":V(g,A);break;default:A.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}async function pe(g,m){if(!(!f()||!m?.length||!g?.id))try{let P=n.dynamicToolPanelCache.get(g.id);if(!P){let A=(await Promise.resolve().then(()=>(rs(),Io)))?.createToolConfigPanel;if(typeof A!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");P=A({id:`${g.id}Panel`,toolId:g.id,postResponseHint:`\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${g.name||g.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${g.id}-extraction-preview`,previewTitle:`${g.name||g.id} \u63D0\u53D6\u9884\u89C8`}),n.dynamicToolPanelCache.set(g.id,P)}P.renderTo(m)}catch(P){console.error(`[${a}] \u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,P),m.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function I(g,m){if(!f())return;let P=r.toolRegistryModule?.getToolConfig(g);if(!P){m.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let G=o.currentSubTab[g]||P.subTabs?.[0]?.id||"config";m.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${G}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),ne(g,G)}function ie(g,m){if(!f())return;let P=r.toolManagerModule?.getTool(g),G=r.presetManagerModule?.getAllPresets()||[],A=r.toolRegistryModule?.getToolApiPreset(g)||"",$=G.map(k=>`<option value="${b(k.name)}" ${k.name===A?"selected":""}>${b(k.name)}</option>`).join("");m.html(`
      <div class="yyt-panel">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-plug"></i>
            <span>API\u9884\u8BBE\u7ED1\u5B9A</span>
          </div>
          <div class="yyt-form-group">
            <label>\u9009\u62E9API\u9884\u8BBE</label>
            <select class="yyt-select" id="yyt-tool-api-preset">
              <option value="">\u4F7F\u7528\u5F53\u524D\u914D\u7F6E</option>
              ${$}
            </select>
          </div>
          <button class="yyt-btn yyt-btn-primary" id="yyt-save-tool-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u7ED1\u5B9A
          </button>
        </div>

        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-cog"></i>
            <span>\u6267\u884C\u914D\u7F6E</span>
          </div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u8D85\u65F6\u65F6\u95F4 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${P?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${P?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),m.find("#yyt-save-tool-preset").on("click",function(){let B=m.find("#yyt-tool-api-preset").val();r.toolRegistryModule?.setToolApiPreset(g,B);let ee=s.toastr;ee&&ee.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}function ye(g,m){if(!f()||!r.promptEditorModule){m.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let G=r.toolManagerModule?.getTool(g)?.config?.messages||[],A=r.promptEditorModule.messagesToSegments?r.promptEditorModule.messagesToSegments(G):r.promptEditorModule.DEFAULT_PROMPT_SEGMENTS,$=new r.promptEditorModule.PromptEditor({containerId:`yyt-prompt-editor-${g}`,segments:A,onChange:B=>{let ee=r.promptEditorModule.segmentsToMessages?r.promptEditorModule.segmentsToMessages(B):[];d("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",ee.length,"\u6761\u6D88\u606F")}});m.html(`<div id="yyt-prompt-editor-${g}" class="yyt-prompt-editor-container"></div>`),$.init(m.find(`#yyt-prompt-editor-${g}`));let k=r.promptEditorModule.getPromptEditorStyles?r.promptEditorModule.getPromptEditorStyles():"";if(k){let B="yyt-prompt-editor-styles",ee=s.document||document;if(!ee.getElementById(B)){let Te=ee.createElement("style");Te.id=B,Te.textContent=k,(ee.head||ee.documentElement).appendChild(Te)}}}function V(g,m){f()&&m.html(`
      <div class="yyt-panel">
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-bookmark"></i>
            <span>\u5DE5\u5177\u9884\u8BBE</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" style="margin-left: auto;">
              <i class="fa-solid fa-plus"></i> \u65B0\u5EFA
            </button>
          </div>
          <div class="yyt-empty-state-small">
            <i class="fa-solid fa-bookmark"></i>
            <span>\u6682\u65E0\u4FDD\u5B58\u7684\u9884\u8BBE</span>
          </div>
        </div>
      </div>
    `)}function nr(){if(o.currentPopup){d("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let g=f(),m=_();if(!g){p("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let T=r.toolRegistryModule?.getToolList()||[];if(!T.length){p("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}T.some(B=>B.id===o.currentMainTab)||(o.currentMainTab=T[0].id),o.currentOverlay=m.createElement("div"),o.currentOverlay.className="yyt-popup-overlay",o.currentOverlay.addEventListener("click",B=>{B.target===o.currentOverlay&&re()}),m.body.appendChild(o.currentOverlay);let P=T.map(B=>`
      <div class="yyt-main-nav-item ${B.id===o.currentMainTab?"active":""}" data-tab="${B.id}">
        <i class="fa-solid ${B.icon}"></i>
        <span>${B.name}</span>
      </div>
    `).join(""),G=T.map(B=>`
      <div class="yyt-tab-content ${B.id===o.currentMainTab?"active":""}" data-tab="${B.id}">
        <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
      </div>
    `).join(""),A=`
      <div class="yyt-popup" id="${l}">
        <div class="yyt-popup-header">
          <div class="yyt-popup-brand">
            <div class="yyt-popup-title-row">
              <div class="yyt-popup-title">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
                <span>YouYou \u5DE5\u5177\u7BB1</span>
              </div>
              <span class="yyt-popup-version">v${i}</span>
            </div>
            <div class="yyt-popup-subtitle">\u5DE5\u5177\u7F16\u6392\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u5DE5\u4F5C\u53F0</div>
          </div>
          <div class="yyt-popup-header-actions">
            <div class="yyt-popup-drag-hint">
              <i class="fa-solid fa-grip-lines"></i>
              <span>\u62D6\u52A8\u7A97\u53E3</span>
            </div>
            <button class="yyt-popup-close" title="\u5173\u95ED">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
        </div>

        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-main-nav">
              ${P}
            </div>

            <div class="yyt-sub-nav" style="display: none;">
              <!-- \u6B21\u7EA7\u9876\u680F\u5C06\u52A8\u6001\u6E32\u67D3 -->
            </div>

            <div class="yyt-content">
              <div class="yyt-content-inner">
                ${G}
              </div>
            </div>
          </div>
        </div>

        <div class="yyt-popup-footer">
          <div class="yyt-popup-footer-left">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${Z(o.currentMainTab)}</span>
            </div>
          </div>
          <div class="yyt-popup-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${a}-close-btn">\u5173\u95ED</button>
          </div>
        </div>
      </div>
    `,$=m.createElement("div");$.innerHTML=A,o.currentPopup=$.firstElementChild,m.body.appendChild(o.currentPopup),g(o.currentPopup).find(".yyt-popup-close").on("click",re),g(o.currentPopup).find(`#${a}-close-btn`).on("click",re),g(o.currentPopup).find(".yyt-main-nav-item").on("click",function(){let ee=g(this).data("tab");ee&&v(ee)}),j(),me(o.currentMainTab);let k=r.toolRegistryModule?.getToolConfig(o.currentMainTab);k?.hasSubTabs&&(g(o.currentPopup).find(".yyt-sub-nav").show(),M(o.currentMainTab,k.subTabs)),K(),d("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:nr,closePopup:re,switchMainTab:v,switchSubTab:S,renderTabContent:me,renderSubTabContent:ne}}function na(t,e={}){let{constants:s,modules:r}=t,{SCRIPT_ID:n,SCRIPT_VERSION:o}=s,{init:a,loadModules:i,addMenuItem:l,popupShell:c}=e;return{version:o,id:n,init:a,openPopup:c?.openPopup,closePopup:c?.closePopup,switchMainTab:c?.switchMainTab,switchSubTab:c?.switchSubTab,addMenuItem:l,getStorage:()=>r.storageModule,getApiConnection:()=>r.apiConnectionModule,getPresetManager:()=>r.presetManagerModule,getUi:()=>r.uiModule,getUiModule:()=>r.uiModule,getUiComponents:()=>r.uiComponentsModule,getRegexExtractor:()=>r.regexExtractorModule,getToolManager:()=>r.toolManagerModule,getToolExecutor:()=>r.toolExecutorModule,getToolTrigger:()=>r.toolTriggerModule,getWindowManager:()=>r.windowManagerModule,getToolRegistry:()=>r.toolRegistryModule,getPromptEditor:()=>r.promptEditorModule,getSettingsService:()=>r.settingsServiceModule,getBypassManager:()=>r.bypassManagerModule,getVariableResolver:()=>r.variableResolverModule,getContextInjector:()=>r.contextInjectorModule,getToolPromptService:()=>r.toolPromptServiceModule,getToolOutputService:()=>r.toolOutputServiceModule,async getApiConfig(){return await i(),r.storageModule?r.storageModule.loadSettings().apiConfig:null},async saveApiConfig(d){return await i(),r.apiConnectionModule?(r.apiConnectionModule.updateApiConfig(d),!0):!1},async getPresets(){return await i(),r.presetManagerModule?r.presetManagerModule.getAllPresets():[]},async sendApiRequest(d,p){if(await i(),r.apiConnectionModule)return r.apiConnectionModule.sendApiRequest(d,p);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),r.apiConnectionModule?r.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(d,p){return r.toolRegistryModule?.registerTool(d,p)||!1},unregisterTool(d){return r.toolRegistryModule?.unregisterTool(d)||!1},getToolList(){return r.toolRegistryModule?.getToolList()||[]},createWindow(d){return r.windowManagerModule?.createWindow(d)||null},closeWindow(d){r.windowManagerModule?.closeWindow(d)}}}var cs="youyou_toolkit",Sl="0.6.2",_l=`${cs}-menu-item`,Al=`${cs}-menu-container`,Ml=`${cs}-popup`,Pl=typeof window.parent<"u"?window.parent:window,vn={constants:{SCRIPT_ID:cs,SCRIPT_VERSION:Sl,MENU_ITEM_ID:_l,MENU_CONTAINER_ID:Al,POPUP_ID:Ml},topLevelWindow:Pl,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,uiComponentsModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,promptEditorModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null},caches:{dynamicToolPanelCache:new Map},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"apiPresets",currentSubTab:{}}},oa=ra(vn),rr=sa(vn,{openPopup:oa.openPopup}),xn=na(vn,{init:rr.init,loadModules:rr.loadModules,addMenuItem:rr.addMenuItem,popupShell:oa});if(typeof window<"u"&&(window.YouYouToolkit=xn,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=xn}catch{}var Id=xn;rr.init();console.log(`[${cs}] \u6A21\u5757\u52A0\u8F7D\u5B8C\u6210`);export{Id as default};
