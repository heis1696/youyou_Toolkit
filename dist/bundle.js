var ti=Object.defineProperty;var D=(t,e)=>()=>(t&&(e=t(t=0)),e);var J=(t,e)=>{for(var s in e)ti(t,s,{get:e[s],enumerable:!0})};function bo(){let t=h;return t._getStorage(),t._storage}function F(){return h.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function ne(t){h.set("settings",t)}var Fe,h,N,mo,Lt,He=D(()=>{Fe=class t{constructor(e="youyou_toolkit"){this.namespace=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespace]||(s.extensionSettings[this.namespace]={}),this._storage={_target:s.extensionSettings[this.namespace],getItem:r=>{let o=s.extensionSettings[this.namespace][r];return typeof o=="string"?o:o?JSON.stringify(o):null},setItem:(r,o)=>{s.extensionSettings[this.namespace][r]=o,this._saveSettings(s)},removeItem:r=>{delete s.extensionSettings[this.namespace][r],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespace}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,s)=>{try{localStorage.setItem(e,s)}catch(r){console.error(`[${this.namespace}] localStorage\u5199\u5165\u5931\u8D25:`,r)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,s=null){let r=`${this.namespace}:${e}`;if(this._cache.has(r))return this._cache.get(r);let o=this._getStorage(),n=this._getFullKey(e),i=o.getItem(n);if(i===null)return s;try{let a=JSON.parse(i);return this._cache.set(r,a),a}catch{return i}}set(e,s){let r=this._getStorage(),o=this._getFullKey(e),n=`${this.namespace}:${e}`;this._cache.set(n,s);try{r.setItem(o,JSON.stringify(s))}catch(i){console.error(`[${this.namespace}] \u5B58\u50A8\u5931\u8D25:`,i)}}remove(e){let s=this._getStorage(),r=this._getFullKey(e),o=`${this.namespace}:${e}`;this._cache.delete(o),s.removeItem(r)}has(e){let s=this._getStorage(),r=this._getFullKey(e);return s.getItem(r)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let r=s.SillyTavern.getContext();r?.extensionSettings?.[this.namespace]&&(r.extensionSettings[this.namespace]={},this._saveSettings(r))}}else{let s=`${this.namespace}_`,r=[];for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);n&&n.startsWith(s)&&r.push(n)}r.forEach(o=>localStorage.removeItem(o))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespace}_${e}`}namespace(e){return new t(`${this.namespace}:${e}`)}getMultiple(e){let s={};return e.forEach(r=>{s[r]=this.get(r)}),s}setMultiple(e){Object.entries(e).forEach(([s,r])=>{this.set(s,r)})}exportAll(){let e=this._getStorage(),s={};if(e._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let n=r.SillyTavern.getContext()?.extensionSettings?.[this.namespace]||{};Object.entries(n).forEach(([i,a])=>{s[i]=typeof a=="string"?JSON.parse(a):a})}}else{let r=`${this.namespace}_`;for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);if(n&&n.startsWith(r)){let i=n.slice(r.length);try{s[i]=JSON.parse(localStorage.getItem(n))}catch{s[i]=localStorage.getItem(n)}}}}return s}},h=new Fe("youyou_toolkit"),N=new Fe("youyou_toolkit:tools"),mo=new Fe("youyou_toolkit:presets"),Lt=new Fe("youyou_toolkit:windows")});var xo={};J(xo,{DEFAULT_API_PRESETS:()=>ri,DEFAULT_SETTINGS:()=>si,STORAGE_KEYS:()=>Nt,StorageService:()=>Fe,deepMerge:()=>ho,getCurrentPresetName:()=>We,getStorage:()=>bo,loadApiPresets:()=>Q,loadSettings:()=>F,presetStorage:()=>mo,saveApiPresets:()=>Oe,saveSettings:()=>ne,setCurrentPresetName:()=>bt,storage:()=>h,toolStorage:()=>N,windowStorage:()=>Lt});function Q(){return h.get(Nt.API_PRESETS)||[]}function Oe(t){h.set(Nt.API_PRESETS,t)}function We(){return h.get(Nt.CURRENT_PRESET)||""}function bt(t){h.set(Nt.CURRENT_PRESET,t||"")}function ho(t,e){let s=o=>o&&typeof o=="object"&&!Array.isArray(o),r={...t};return s(t)&&s(e)&&Object.keys(e).forEach(o=>{s(e[o])?o in t?r[o]=ho(t[o],e[o]):Object.assign(r,{[o]:e[o]}):Object.assign(r,{[o]:e[o]})}),r}var Nt,si,ri,Ut=D(()=>{He();He();Nt={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},si={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},ri=[]});var wo={};J(wo,{API_STATUS:()=>oi,fetchAvailableModels:()=>or,getApiConfig:()=>qe,getEffectiveApiConfig:()=>zt,hasEffectiveApiPreset:()=>tr,sendApiRequest:()=>rr,sendWithPreset:()=>ii,testApiConnection:()=>pi,updateApiConfig:()=>ht,validateApiConfig:()=>xt});function er(t,e={}){let s=new Error(t);return s.allowDirectFallback=e.allowDirectFallback===!0,s}function vo(t,e="chat_completions"){let s=String(t||"").trim();if(!s)return"";let r=null;try{r=new URL(s)}catch{return s}let o=r.pathname.replace(/\/+$/,""),n=o;return e==="chat_completions"?!/\/chat\/completions$/i.test(o)&&!/\/completions$/i.test(o)&&(n=`${o||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(o)?n=o.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(o)?n=o.replace(/\/completions$/i,"/models"):/\/models$/i.test(o)||(n=`${o||""}/models`)),r.pathname=n.replace(/\/+/g,"/"),r.toString()}function ni(t){let e=String(t||"").trim();if(!e)return"";try{let s=new URL(e);return s.pathname=s.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",s.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function qe(){return F().apiConfig||{}}function ht(t){let e=F();e.apiConfig={...e.apiConfig,...t},ne(e)}function xt(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function zt(t=""){let e=F(),s=t||We()||"";if(s){let o=(Q()||[]).find(n=>n.name===s);if(o&&o.apiConfig)return{...o.apiConfig,presetName:o.name}}return e.apiConfig||{}}function tr(t=""){return t?(Q()||[]).some(s=>s?.name===t):!1}async function ii(t,e,s={},r=null){let o=zt(t);return await rr(e,{...s,apiConfig:o},r)}function To(t,e={}){let s=e.apiConfig||qe();return{messages:t,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:!1,...e.extraParams}}function sr(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function rr(t,e={},s=null){let r=e.apiConfig||qe(),o=r.useMainApi,n=xt(r);if(!n.valid&&!o)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${n.errors.join(", ")}`);return o?await ai(t,e,s):await li(t,r,e,s)}async function ai(t,e,s){let r=typeof window.parent<"u"?window.parent:window;if(!r.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let o=await r.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,...e.extraParams});if(typeof o!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return o.trim()}catch(o){throw o.name==="AbortError"?o:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${o.message}`)}}async function li(t,e,s,r){let o=typeof window.parent<"u"?window.parent:window;if(o.TavernHelper?.generateRaw)try{return await ci(t,e,s,r,o)}catch(n){console.warn("[youyou_toolkit] TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",n)}if(o.SillyTavern?.getRequestHeaders)try{return await di(t,e,s,r,o)}catch(n){if(!n?.allowDirectFallback)throw n}return await ui(t,e,s,r)}async function ci(t,e,s,r,o){if(r?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let n=await o.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,max_chat_history:0,custom_api:{apiurl:ni(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...s.extraParams||{}});return typeof n=="string"?n.trim():sr(n)}async function di(t,e,s,r,o){let n=String(e.url||"").trim(),i={...To(t,{apiConfig:e,...s}),chat_completion_source:"custom",reverse_proxy:n,proxy_password:"",custom_url:n,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},a={...typeof o.SillyTavern?.getRequestHeaders=="function"?o.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:a,body:JSON.stringify(i),signal:r})}catch(p){throw p?.name==="AbortError"?p:er(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${p.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let p=[404,405,501,502].includes(l.status);throw er(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:p})}let d=null;try{d=c?JSON.parse(c):{}}catch{let b=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw er(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${b||"(\u7A7A\u54CD\u5E94)"}`)}return sr(d)}async function ui(t,e,s,r){let o=To(t,{apiConfig:e,...s}),n=vo(e.url,"chat_completions"),i={"Content-Type":"application/json"};e.apiKey&&(i.Authorization=`Bearer ${e.apiKey}`);let a=await fetch(n,{method:"POST",headers:i,body:JSON.stringify(o),signal:r}),l=await a.text().catch(()=>"");if(!a.ok){let d=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${a.status}): ${d}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let p=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${p||"(\u7A7A\u54CD\u5E94)"}`)}return sr(c)}async function pi(t=null){let e=t||qe(),s=Date.now();try{await rr([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let o=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${o}ms)`,latency:o}}catch(r){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${r.message}`,latency:Date.now()-s}}}async function or(t=null){let e=t||qe();return e.useMainApi?await yi():await gi(e)}async function yi(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function gi(t){if(!t.url||!t.apiKey)return[];try{let e=vo(t.url,"models"),s=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!s.ok)return[];let r=await s.json();return r.data&&Array.isArray(r.data)?r.data.map(o=>o.id||o.name).filter(Boolean).sort():[]}catch{return[]}}var oi,ls=D(()=>{Ut();oi={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var Eo={};J(Eo,{createPreset:()=>cs,createPresetFromCurrentConfig:()=>hi,deletePreset:()=>ds,duplicatePreset:()=>bi,exportPresets:()=>cr,generateUniquePresetName:()=>ur,getActiveConfig:()=>lr,getActivePresetName:()=>us,getAllPresets:()=>vt,getPreset:()=>st,getPresetNames:()=>fi,getStarredPresets:()=>ar,importPresets:()=>dr,presetExists:()=>Bt,renamePreset:()=>mi,switchToPreset:()=>rt,togglePresetStar:()=>ir,updatePreset:()=>nr,validatePreset:()=>xi});function vt(){return Q()}function fi(){return Q().map(e=>e.name)}function st(t){return!t||typeof t!="string"?null:Q().find(s=>s.name===t)||null}function Bt(t){return!t||typeof t!="string"?!1:Q().some(s=>s.name===t)}function cs(t){let{name:e,description:s,apiConfig:r}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let o=e.trim();if(Bt(o))return{success:!1,message:`\u9884\u8BBE "${o}" \u5DF2\u5B58\u5728`};let n={name:o,description:s||"",apiConfig:{url:r?.url||"",apiKey:r?.apiKey||"",model:r?.model||"",useMainApi:r?.useMainApi??!0,max_tokens:r?.max_tokens||4096,temperature:r?.temperature??.7,top_p:r?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},i=Q();return i.push(n),Oe(i),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:n}}function nr(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=Q(),r=s.findIndex(i=>i.name===t);if(r===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let o=s[r],n={...o,...e,name:o.name,updatedAt:Date.now()};return e.apiConfig&&(n.apiConfig={...o.apiConfig,...e.apiConfig}),s[r]=n,Oe(s),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:n}}function ds(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=Q(),s=e.findIndex(r=>r.name===t);return s===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(s,1),Oe(e),We()===t&&bt(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function mi(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(!Bt(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Bt(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let r=Q(),o=r.find(n=>n.name===t);return o&&(o.name=s,o.updatedAt=Date.now(),Oe(r),We()===t&&bt(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function bi(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim(),r=st(t);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Bt(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(r)),name:s,createdAt:Date.now(),updatedAt:Date.now()},n=Q();return n.push(o),Oe(n),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:o}}function ir(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=Q(),s=e.find(r=>r.name===t);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),Oe(e),{success:!0,message:s.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function ar(){return Q().filter(e=>e.starred===!0)}function rt(t){if(!t)return bt(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=st(t);return e?(bt(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function us(){return We()}function lr(){let t=We();if(t){let s=st(t);if(s)return{presetName:t,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:F().apiConfig||{}}}function cr(t=null){if(t){let s=st(t);if(!s)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let e=Q();return JSON.stringify(e,null,2)}function dr(t,e={overwrite:!1}){let s;try{s=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let r=Array.isArray(s)?s:[s];if(r.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let o=Q(),n=0;for(let i of r){if(!i.name||typeof i.name!="string"||!i.apiConfig||typeof i.apiConfig!="object")continue;let a=o.findIndex(l=>l.name===i.name);a>=0?e.overwrite&&(i.updatedAt=Date.now(),o[a]=i,n++):(i.createdAt=i.createdAt||Date.now(),i.updatedAt=Date.now(),o.push(i),n++)}return n>0&&Oe(o),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${n} \u4E2A\u9884\u8BBE`,imported:n}}function hi(t,e=""){let s=F();return cs({name:t,description:e,apiConfig:s.apiConfig})}function xi(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function ur(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=Q(),s=new Set(e.map(o=>o.name));if(!s.has(t))return t;let r=1;for(;s.has(`${t} (${r})`);)r++;return`${t} (${r})`}var ps=D(()=>{Ut()});var w,pr,E,re=D(()=>{w={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",TOOL_TRIGGER_INITIALIZED:"tool:triggerInitialized",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",TRIGGER_REGISTERED:"trigger:registered",TRIGGER_UNREGISTERED:"trigger:unregistered",TRIGGER_FIRED:"trigger:fired",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_EXECUTION_REQUESTED:"tool:executionRequested",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},pr=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,s,r={}){if(!e||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:o=0}=r;this.listeners.has(e)||this.listeners.set(e,new Set);let n={callback:s,priority:o};return this.listeners.get(e).add(n),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,s)}off(e,s){let r=this.listeners.get(e);if(r){for(let o of r)if(o.callback===s){r.delete(o);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,s),this._addToHistory(e,s);let r=this.listeners.get(e);if(!r||r.size===0)return;let o=Array.from(r).sort((n,i)=>i.priority-n.priority);for(let{callback:n}of o)try{n(s)}catch(i){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,i)}}once(e,s){let r=o=>{this.off(e,r),s(o)};return this.on(e,r)}wait(e,s=0){return new Promise((r,o)=>{let n=null,i=this.once(e,a=>{n&&clearTimeout(n),r(a)});s>0&&(n=setTimeout(()=>{i(),o(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},s))})}hasListeners(e){let s=this.listeners.get(e);return s&&s.size>0}listenerCount(e){let s=this.listeners.get(e);return s?s.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,s){this.history.push({event:e,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(s=>s.event===e):[...this.history]}clearHistory(){this.history=[]}},E=new pr});function x(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function y(t,e,s=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let r=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(r.toastr){r.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}vi(t,e,s),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${t.toUpperCase()}] ${e}`)}function Pe(t,e,s={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:r=3500,sticky:o=!1,noticeId:n=""}=s,i=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!i?.body){y(t,e,r);return}let a="yyt-top-notice-container",l="yyt-top-notice-styles",c=i.getElementById(a);if(c||(c=i.createElement("div"),c.id=a,c.style.cssText=`
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
    `,i.body.appendChild(c)),!i.getElementById(l)){let O=i.createElement("style");O.id=l,O.textContent=`
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
    `,i.head.appendChild(O)}if(n){let O=c.querySelector(`[data-notice-id="${n}"]`);O&&O.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},p=i.createElement("div");p.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,n&&(p.dataset.noticeId=n);let b=i.createElement("span");b.className="yyt-top-notice__icon",b.textContent=d[t]||d.info;let f=i.createElement("div");f.className="yyt-top-notice__content",f.textContent=e;let M=i.createElement("button");M.className="yyt-top-notice__close",M.type="button",M.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),M.textContent="\xD7";let ee=()=>{p.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>p.remove(),180)};M.addEventListener("click",ee),p.appendChild(b),p.appendChild(f),p.appendChild(M),c.appendChild(p),o||setTimeout(ee,r)}function vi(t,e,s){let r=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!r)return;let o=r.getElementById("yyt-fallback-toast");o&&o.remove();let n={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},i=n[t]||n.info,a=r.createElement("div");if(a.id="yyt-fallback-toast",a.style.cssText=`
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    background: ${i.bg};
    color: #0b0f15;
    border-radius: 8px;
    border: 2px solid ${i.border};
    font-size: 14px;
    font-weight: 500;
    z-index: 99999;
    max-width: 350px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    animation: yyt-toast-in 0.3s ease;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
  `,a.textContent=e,!r.getElementById("yyt-toast-styles")){let l=r.createElement("style");l.id="yyt-toast-styles",l.textContent=`
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `,r.head.appendChild(l)}r.body.appendChild(a),setTimeout(()=>{a.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{a.remove()},300)},s)}function L(){if(ot)return ot;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return ot=window.parent.jQuery,ot}catch{}return window.jQuery&&(ot=window.jQuery),ot}function Ti(){ot=null}function U(t){return t&&t.length>0}function Ke(t,e=u){if(!L()||!U(t))return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let r=t.find(`#${e}-model`).val()?.trim()||"",o=t.find(`#${e}-model-select`);return o.is(":visible")&&(r=o.val()||r),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:r,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function nt(t,e,s=u){if(!L()||!U(t)||!e)return;t.find(`#${s}-api-url`).val(e.url||""),t.find(`#${s}-api-key`).val(e.apiKey||""),t.find(`#${s}-model`).val(e.model||""),t.find(`#${s}-max-tokens`).val(e.max_tokens||4096),t.find(`#${s}-temperature`).val(e.temperature??.7),t.find(`#${s}-top-p`).val(e.top_p??.9);let o=e.useMainApi??!0;t.find(`#${s}-use-main-api`).prop("checked",o);let i=t.find(`#${s}-custom-api-fields`);o?i.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):i.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${s}-model`).show(),t.find(`#${s}-model-select`).hide()}function yr(t){let{id:e,title:s,body:r,width:o="380px",wide:n=!1}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${n?"yyt-dialog-wide":""}" style="${o!=="380px"?`width: ${o};`:""} max-height: calc(100vh - 32px);">
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
  `}function gr(t,e,s={}){if(!L())return()=>{};let o=t.find(`#${e}-overlay`),n=()=>{o.remove(),s.onClose&&s.onClose()};return o.find(`#${e}-close, #${e}-cancel`).on("click",n),o.on("click",function(i){i.target===this&&n()}),o.find(`#${e}-save`).on("click",function(){s.onSave&&s.onSave(n)}),n}function Le(t,e){let s=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(s),o=document.createElement("a");o.href=r,o.download=e,o.click(),URL.revokeObjectURL(r)}function Ne(t){return new Promise((e,s)=>{let r=new FileReader;r.onload=o=>e(o.target.result),r.onerror=o=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),r.readAsText(t)})}var u,ot,Me=D(()=>{u="youyou_toolkit";ot=null});var jt,q,fr=D(()=>{re();Me();jt=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,E.emit(w.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(e,s){return!e||!s?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,s,r={}){let o=L();if(!o){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let n=this.components.get(e);if(!n){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);return}let i;if(typeof s=="string"?i=o(s):s&&s.jquery?i=s:s&&(i=o(s)),!U(i)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}this.destroyInstance(e);let a=n.render({...r,dependencies:this.dependencies});i.html(a),n.bindEvents(i,this.dependencies),this.activeInstances.set(e,{container:i,component:n,props:r}),E.emit(w.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let s=this.activeInstances.get(e);s&&(s.component.destroy(s.container),this.activeInstances.delete(e))}switchTab(e){let s=this.currentTab;this.currentTab=e,E.emit(w.UI_TAB_CHANGED,{tabId:e,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(e,s){this.currentSubTab[e]=s,E.emit(w.UI_SUBTAB_CHANGED,{mainTab:e,subTab:s})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((s,r)=>{s.getStyles&&(e+=s.getStyles())}),e}injectStyles(e=document){let s="yyt-component-styles";if(e.getElementById(s))return;let r=e.createElement("style");r.id=s,r.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(r)}setDependency(e,s){this.dependencies[e]=s}getDependency(e){return this.dependencies[e]}_subscribeEvents(){E.on(w.PRESET_UPDATED,()=>{}),E.on(w.TOOL_UPDATED,()=>{})}},q=new jt});function ys(t){return String(t||"").trim()}var Ce,he,mr=D(()=>{re();Me();ls();ps();Ce=null;he={id:"apiPresetPanel",render(t){let e=lr(),s=e?.apiConfig||qe(),r=ys(e?.presetName||us()),o=vt(),a=ar().slice(0,8),l=a.length>0?a.map(p=>this._renderPresetItem(p)).join(""):"",c=Ce===null?r||"":ys(Ce),d=c||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
                  ${o.length>0?o.map(p=>this._renderSelectOption(p,c)).join(""):""}
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
    `},_renderSelectOption(t,e){let s=t.starred===!0,r=s?"yyt-option-star yyt-starred":"yyt-option-star",o=s?"\u2605":"\u2606";return`
      <div class="yyt-select-option ${t.name===e?"yyt-selected":""}" data-value="${x(t.name)}">
        <button class="${r}" data-preset="${x(t.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${o}</button>
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
    `},bindEvents(t,e){let s=L();!s||!U(t)||(this._bindDropdownEvents(t,s),this._bindPresetListEvents(t,s),this._bindApiConfigEvents(t,s),this._bindFileEvents(t,s))},_bindDropdownEvents(t,e){let s=t.find(`#${u}-preset-dropdown`),r=s.find(".yyt-select-trigger"),o=s.find(".yyt-select-value"),n=()=>{let i=String(o.data("value")||"").trim();if(!i){Ce="",rt(""),nt(t,qe(),u),t.find(".yyt-preset-item").removeClass("yyt-loaded"),y("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let a=st(i);if(!a){y("error",`\u9884\u8BBE "${i}" \u4E0D\u5B58\u5728`);return}Ce=i,rt(i),nt(t,a.apiConfig,u),t.find(".yyt-preset-item").removeClass("yyt-loaded"),t.find(`.yyt-preset-item[data-preset-name="${i.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),y("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${i}"\uFF0C\u4FEE\u6539\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u914D\u7F6E\u201D\u4F1A\u8986\u76D6\u8BE5\u9884\u8BBE`)};r.on("click",function(i){i.stopPropagation(),s.toggleClass("yyt-open")}),s.find(".yyt-select-option").on("click",i=>{if(e(i.target).hasClass("yyt-option-star"))return;let a=e(i.currentTarget),l=a.data("value"),c=a.find(".yyt-option-text").text();Ce=String(l||"").trim(),o.text(c).data("value",l),s.find(".yyt-select-option").removeClass("yyt-selected"),a.addClass("yyt-selected"),s.removeClass("yyt-open")}),t.find(`#${u}-load-preset`).on("click",()=>{n()}),s.find(".yyt-option-star").on("click",i=>{i.preventDefault(),i.stopPropagation();let a=e(i.currentTarget).data("preset");if(!a)return;let l=ir(a);if(l.success){y("success",l.message);let c=t.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}else y("error",l.message)}),e(document).on("click.yyt-dropdown",i=>{e(i.target).closest(s).length||s.removeClass("yyt-open")})},_bindPresetListEvents(t,e){t.find(".yyt-preset-item").on("click",s=>{let o=e(s.currentTarget).data("preset-name"),n=e(s.target).closest("[data-action]").data("action");if(n)switch(s.stopPropagation(),n){case"load":t.find(".yyt-select-value").text(o).data("value",o),t.find(".yyt-select-option").removeClass("yyt-selected"),t.find(`.yyt-select-option[data-value="${o.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),t.find(`#${u}-load-preset`).trigger("click");break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${o}" \u5417\uFF1F`)){let i=ds(o);if(y(i.success?"info":"error",i.message),i.success){ys(Ce)===o&&(Ce=null);let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}}break}})},_bindApiConfigEvents(t,e){t.find(`#${u}-use-main-api`).on("change",function(){let s=e(this).is(":checked"),r=t.find(`#${u}-custom-api-fields`);s?r.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):r.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),t.find(`#${u}-toggle-key-visibility`).on("click",function(){let s=t.find(`#${u}-api-key`),r=s.attr("type");s.attr("type",r==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),t.find(`#${u}-load-models`).on("click",async()=>{let s=t.find(`#${u}-load-models`),r=t.find(`#${u}-model`),o=t.find(`#${u}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let n=Ke(t,u),i=await or(n);if(i.length>0){o.empty(),i.forEach(l=>{o.append(`<option value="${x(l)}">${x(l)}</option>`)}),r.hide(),o.show();let a=r.val();a&&i.includes(a)&&o.val(a),o.off("change").on("change",function(){r.val(e(this).val())}),y("success",`\u5DF2\u52A0\u8F7D ${i.length} \u4E2A\u6A21\u578B`)}else y("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(n){y("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${n.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${u}-model`).on("focus",function(){let s=t.find(`#${u}-model-select`);e(this).show(),s.hide()}),t.find(`#${u}-save-api-config`).on("click",()=>{let s=Ke(t,u),r=ys(us()),o=xt(s);if(!o.valid&&!s.useMainApi){y("error",o.errors.join(", "));return}if(r){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${r}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230\u201C\u5F53\u524D\u914D\u7F6E\u201D`)){ht(s),rt(""),Ce="",y("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");let i=t.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i);return}ht(s);let n=nr(r,{apiConfig:s});if(n.success){Ce=r,y("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${r}"`),rt(r),E.emit(w.PRESET_UPDATED,{name:r});let i=t.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}else y("error",n.message);return}ht(s),y("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),t.find(`#${u}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){rt(""),Ce="",ht({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9});let s=t.closest(".yyt-api-manager").parent();s.length&&this.renderTo(s),y("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),t.find(`#${u}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(t,e)})},_bindFileEvents(t,e){t.find(`#${u}-export-presets`).on("click",()=>{try{let s=cr();Le(s,`youyou_toolkit_presets_${Date.now()}.json`),y("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){y("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${u}-import-presets`).on("click",()=>{t.find(`#${u}-import-file`).click()}),t.find(`#${u}-import-file`).on("change",async s=>{let r=s.target.files[0];if(r){try{let o=await Ne(r),n=dr(o,{overwrite:!0});if(y(n.success?"success":"error",n.message),n.imported>0){let i=t.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}}catch(o){y("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}})},_showSavePresetDialog(t,e){let r=vt().map(d=>d.name),o=ur("\u65B0\u9884\u8BBE"),n=`
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
                     value="${x(o)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
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
    `;e(`#${u}-dialog-overlay`).remove(),t.append(n);let i=e(`#${u}-dialog-overlay`),a=e(`#${u}-dialog-preset-name`),l=e(`#${u}-dialog-preset-desc`);a.focus().select();let c=()=>i.remove();i.find(`#${u}-dialog-close, #${u}-dialog-cancel`).on("click",c),i.on("click",function(d){d.target===this&&c()}),i.find(`#${u}-dialog-save`).on("click",()=>{let d=a.val().trim(),p=l.val().trim();if(!d){y("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),a.focus();return}if(r.includes(d)){if(!confirm(`\u9884\u8BBE "${d}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;ds(d)}let b=Ke(t,u),f=cs({name:d,description:p,apiConfig:b});if(f.success){y("success",f.message),c(),E.emit(w.PRESET_CREATED,{preset:f.preset});let M=t.closest(".yyt-api-manager").parent();M.length&&this.renderTo(M)}else y("error",f.message)}),a.on("keypress",function(d){d.which===13&&i.find(`#${u}-dialog-save`).click()})},destroy(t){let e=L();!e||!U(t)||(t.find("*").off(),e(document).off("click.yyt-dropdown"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Oo={};J(Oo,{MESSAGE_MACROS:()=>Do,addTagRule:()=>Tt,createRuleTemplate:()=>Co,default:()=>Ei,deleteRulePreset:()=>Ro,deleteRuleTemplate:()=>Io,deleteTagRule:()=>Gt,escapeRegex:()=>it,exportRulesConfig:()=>Ts,extractComplexTag:()=>_o,extractCurlyBraceTag:()=>vr,extractHtmlFormatTag:()=>Ao,extractSimpleTag:()=>xr,extractTagContent:()=>at,generateTagSuggestions:()=>ms,getAllRulePresets:()=>xs,getAllRuleTemplates:()=>Po,getContentBlacklist:()=>lt,getRuleTemplate:()=>Mo,getTagRules:()=>Ue,importRulesConfig:()=>ws,isValidTagName:()=>hr,loadRulePreset:()=>vs,saveRulesAsPreset:()=>hs,scanTextForTags:()=>fs,setContentBlacklist:()=>Yt,setTagRules:()=>bs,shouldSkipContent:()=>br,testRegex:()=>$o,updateRuleTemplate:()=>ko,updateTagRule:()=>wt});function gs(){let t=F();return oe=t.ruleTemplates||[...So],H=t.tagRules||[],le=t.contentBlacklist||[],{ruleTemplates:oe,tagRules:H,contentBlacklist:le}}function it(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function br(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let s=t.toLowerCase();return e.some(r=>{let o=r.trim().toLowerCase();return o&&s.includes(o)})}function hr(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!wi.includes(t.toLowerCase())}function xr(t,e){if(!t||!e)return[];let s=[],r=it(e),o=new RegExp(`<${r}>([\\s\\S]*?)<\\/${r}>`,"gi");[...t.matchAll(o)].forEach(l=>{l[1]&&s.push(l[1].trim())});let i=(t.match(new RegExp(`<${r}>`,"gi"))||[]).length,a=(t.match(new RegExp(`<\\/${r}>`,"gi"))||[]).length;return i>a&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${i-a} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),s}function vr(t,e){if(!t||!e)return[];let s=[],r=it(e),o=new RegExp(`\\{${r}\\|`,"gi"),n;for(;(n=o.exec(t))!==null;){let i=n.index,a=i+n[0].length,l=1,c=a;for(;c<t.length&&l>0;)t[c]==="{"?l++:t[c]==="}"&&l--,c++;if(l===0){let d=t.substring(a,c-1);d.trim()&&s.push(d.trim())}o.lastIndex=i+1}return s}function _o(t,e){if(!t||!e)return[];let s=e.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let r=s[0].trim(),o=s[1].trim(),n=o.match(/<\/(\w+)>/);if(!n)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${o}`),[];let i=n[1],a=new RegExp(`${it(r)}([\\s\\S]*?)<\\/${i}>`,"gi"),l=[];return[...t.matchAll(a)].forEach(d=>{d[1]&&l.push(d[1].trim())}),l}function Ao(t,e){if(!t||!e)return[];let s=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let r=s[1],o=[],n=new RegExp(`<${r}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${r}>`,"gi");[...t.matchAll(n)].forEach(c=>{c[1]&&o.push(c[1].trim())});let a=(t.match(new RegExp(`<${r}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${r}>`,"gi"))||[]).length;return a>l&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${a-l} \u4E2A\u672A\u95ED\u5408\u7684 <${r}> \u6807\u7B7E`),o}function at(t,e,s=[]){if(!t)return"";if(!e||e.length===0)return t;let r=e.filter(d=>d.type==="exclude"&&d.enabled),o=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),n=e.filter(d=>d.type==="regex_exclude"&&d.enabled),i=t;for(let d of r)try{let p=new RegExp(`<${it(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${it(d.value)}>`,"gi");i=i.replace(p,"")}catch(p){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:d,error:p})}let a=[];if(o.length>0)for(let d of o){let p=[];try{if(d.type==="include")p.push(...xr(i,d.value)),p.push(...vr(i,d.value));else if(d.type==="regex_include"){let b=new RegExp(d.value,"gi");[...i.matchAll(b)].forEach(M=>{M[1]&&p.push(M[1])})}}catch(b){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:d,error:b})}p.forEach(b=>a.push(b.trim()))}else a.push(i);let l=[];for(let d of a){for(let p of n)try{let b=new RegExp(p.value,"gi");d=d.replace(b,"")}catch(b){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:p,error:b})}br(d,s)||l.push(d)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function fs(t,e={}){let s=performance.now(),{chunkSize:r=5e4,maxTags:o=100,timeoutMs:n=5e3}=e,i=new Set,a=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let p=0;p<t.length;p+=r){let b=t.slice(p,Math.min(p+r,t.length));if(c++,l+=b.length,performance.now()-s>n){console.warn(`[YouYouToolkit] Tag scanning timed out after ${n}ms`);break}let f;for(;(f=a.exec(b))!==null&&i.size<o;){let M=(f[1]||f[2]).toLowerCase();hr(M)&&i.add(M)}if(i.size>=o)break;c%5===0&&await new Promise(M=>setTimeout(M,0))}let d=performance.now();return{tags:Array.from(i).sort(),stats:{processingTimeMs:Math.round(d-s),processedChars:l,totalChars:t.length,chunkCount:c,tagsFound:i.size}}}function ms(t,e=25){let s=t.tags.slice(0,e);return{suggestions:s,stats:{totalFound:t.stats.tagsFound,finalCount:s.length}}}function Po(){return oe.length===0&&gs(),oe}function Mo(t){return oe.find(e=>e.id===t)}function Co(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return oe.push(e),Tr(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function ko(t,e){let s=oe.findIndex(r=>r.id===t);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(oe[s]={...oe[s],...e,updatedAt:new Date().toISOString()},Tr(),{success:!0,template:oe[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function Io(t){let e=oe.findIndex(s=>s.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(oe.splice(e,1),Tr(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function Tr(){let t=F();t.ruleTemplates=oe,ne(t)}function Ue(){return H||gs(),H}function bs(t){H=t||[];let e=F();e.tagRules=H,ne(e)}function Tt(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};H.push(e);let s=F();return s.tagRules=H,ne(s),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function wt(t,e){if(t<0||t>=H.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};H[t]={...H[t],...e};let s=F();return s.tagRules=H,ne(s),{success:!0,rule:H[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function Gt(t){if(t<0||t>=H.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};H.splice(t,1);let e=F();return e.tagRules=H,ne(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function lt(){return le||gs(),le}function Yt(t){le=t||[];let e=F();e.contentBlacklist=le,ne(e)}function hs(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=F();s.tagRulePresets||(s.tagRulePresets={});let r=`preset-${Date.now()}`;return s.tagRulePresets[r]={id:r,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(H)),blacklist:JSON.parse(JSON.stringify(le)),createdAt:new Date().toISOString()},ne(s),{success:!0,preset:s.tagRulePresets[r],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function xs(){let e=F().tagRulePresets||{};return Object.values(e)}function vs(t){let e=F(),r=(e.tagRulePresets||{})[t];return r?(H=JSON.parse(JSON.stringify(r.rules||[])),le=JSON.parse(JSON.stringify(r.blacklist||[])),e.tagRules=H,e.contentBlacklist=le,ne(e),{success:!0,preset:r,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Ro(t){let e=F(),s=e.tagRulePresets||{};return s[t]?(delete s[t],e.tagRulePresets=s,ne(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Ts(){return JSON.stringify({tagRules:H,contentBlacklist:le,ruleTemplates:oe,tagRulePresets:F().tagRulePresets||{}},null,2)}function ws(t,e={overwrite:!0}){try{let s=JSON.parse(t);if(e.overwrite)H=s.tagRules||[],le=s.contentBlacklist||[],oe=s.ruleTemplates||So;else if(s.tagRules&&H.push(...s.tagRules),s.contentBlacklist){let o=new Set(le.map(n=>n.toLowerCase()));s.contentBlacklist.forEach(n=>{o.has(n.toLowerCase())||le.push(n)})}let r=F();return r.tagRules=H,r.contentBlacklist=le,r.ruleTemplates=oe,s.tagRulePresets&&(r.tagRulePresets={...r.tagRulePresets||{},...s.tagRulePresets}),ne(r),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function $o(t,e,s="g",r=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let o=new RegExp(t,s),n=[];if(s.includes("g")){let i;for(;(i=o.exec(e))!==null;)i.length>1?n.push({fullMatch:i[0],groups:i.slice(1),index:i.index,extracted:i[r]||i[1]||i[0]}):n.push({fullMatch:i[0],groups:[],index:i.index,extracted:i[0]})}else{let i=o.exec(e);i&&n.push({fullMatch:i[0],groups:i.length>1?i.slice(1):[],index:i.index,extracted:i.length>1?i[r]||i[1]:i[0]})}return{success:!0,matches:n,count:n.length,extracted:n.map(i=>i.extracted)}}catch(o){return{success:!1,error:o.message,matches:[]}}}var wi,So,oe,H,le,Do,Ei,Es=D(()=>{Ut();wi=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],So=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],oe=[],H=[],le=[];Do={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};gs();Ei={extractTagContent:at,extractSimpleTag:xr,extractCurlyBraceTag:vr,extractComplexTag:_o,extractHtmlFormatTag:Ao,escapeRegex:it,shouldSkipContent:br,isValidTagName:hr,scanTextForTags:fs,generateTagSuggestions:ms,getAllRuleTemplates:Po,getRuleTemplate:Mo,createRuleTemplate:Co,updateRuleTemplate:ko,deleteRuleTemplate:Io,getTagRules:Ue,setTagRules:bs,addTagRule:Tt,updateTagRule:wt,deleteTagRule:Gt,getContentBlacklist:lt,setContentBlacklist:Yt,saveRulesAsPreset:hs,getAllRulePresets:xs,loadRulePreset:vs,deleteRulePreset:Ro,exportRulesConfig:Ts,importRulesConfig:ws,testRegex:$o,MESSAGE_MACROS:Do}});var xe,wr=D(()=>{re();Me();Es();xe={id:"regexExtractPanel",render(t){let e=Ue(),s=lt(),r=xs();return`
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
    `},_renderRulesEditor(t,e,s){let r=t.length>0?t.map((n,i)=>this._renderRuleItem(n,i)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',o=s.length>0?s.map(n=>`<option value="${n.id}">${x(n.name)}</option>`).join(""):"";return`
      <div class="yyt-tag-rules-editor">
        ${o?`
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${u}-rule-preset-select">
            <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
            ${o}
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
    `},bindEvents(t,e){let s=L();!s||!U(t)||(this._bindRuleEditorEvents(t,s),this._bindPresetEvents(t,s),this._bindTestEvents(t,s),this._bindFileEvents(t,s))},_bindRuleEditorEvents(t,e){t.find(".yyt-rule-type").on("change",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).val();wt(r,{type:o}),y("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),t.find(".yyt-rule-value").on("change",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).val().trim();wt(r,{value:o})}),t.find(".yyt-rule-enabled").on("change",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).is(":checked");wt(r,{enabled:o}),y("info",o?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),t.find(".yyt-rule-delete").on("click",()=>{let r=t.find(".yyt-rule-delete").closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(Gt(r),this.renderTo(t),y("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.on("click",".yyt-rule-delete",s=>{let o=e(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(Gt(o),this.renderTo(t),y("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.find(`#${u}-add-rule`).on("click",()=>{Tt({type:"include",value:"",enabled:!0}),this.renderTo(t),y("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),t.find(`#${u}-scan-tags`).on("click",async()=>{let s=t.find(`#${u}-scan-tags`),r=t.find(`#${u}-test-input`).val();if(!r||!r.trim()){y("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let o=await fs(r,{maxTags:50,timeoutMs:3e3}),{suggestions:n,stats:i}=ms(o,25);if(n.length===0){y("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),t.find(`#${u}-tag-suggestions-container`).hide();return}let a=t.find(`#${u}-tag-list`);t.find(`#${u}-tag-scan-stats`).text(`${i.finalCount}/${i.totalFound} \u4E2A\u6807\u7B7E, ${o.stats.processingTimeMs}ms`),a.empty(),n.forEach(c=>{let d=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${x(c)}</button>`);d.on("click",()=>{if(Ue().some(f=>f.type==="include"&&f.value===c)){y("warning",`\u89C4\u5219 "\u5305\u542B: ${c}" \u5DF2\u5B58\u5728`);return}Tt({type:"include",value:c,enabled:!0}),this.renderTo(t),y("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${c}"`)}),a.append(d)}),t.find(`#${u}-tag-suggestions-container`).show(),y("success",`\u53D1\u73B0 ${n.length} \u4E2A\u6807\u7B7E`)}catch(o){y("error",`\u626B\u63CF\u5931\u8D25: ${o.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${u}-add-exclude-cot`).on("click",()=>{let s=Ue(),r="<!--[\\s\\S]*?-->";if(s.some(n=>n.type==="regex_exclude"&&n.value===r)){y("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}Tt({type:"regex_exclude",value:r,enabled:!0}),this.renderTo(t),y("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),t.find(`#${u}-content-blacklist`).on("change",function(){let r=e(this).val().split(",").map(o=>o.trim()).filter(o=>o);Yt(r),y("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${r.length} \u4E2A\u5173\u952E\u8BCD`)}),t.find(`#${u}-show-examples`).on("click",()=>{alert(`
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
      `)})},_bindPresetEvents(t,e){t.find(`#${u}-load-rule-preset`).on("click",()=>{let s=t.find(`#${u}-rule-preset-select`).val();if(!s){y("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let r=vs(s);r.success?(this.renderTo(t),y("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${r.preset.name}`),E.emit(w.REGEX_PRESET_LOADED,{preset:r.preset})):y("error",r.message)}),t.find(`#${u}-save-rule-preset`).on("click",()=>{let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let r=hs(s.trim());r.success?(this.renderTo(t),y("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):y("error",r.message)})},_bindTestEvents(t,e){t.find(`#${u}-test-extract`).on("click",()=>{let s=t.find(`#${u}-test-input`).val();if(!s||!s.trim()){y("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let r=Ue(),o=lt(),n=at(s,r,o),i=t.find(`#${u}-test-result-container`),a=t.find(`#${u}-test-result`);i.show(),!n||!n.trim()?(a.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),y("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(a.html(`<pre class="yyt-code-block">${x(n)}</pre>`),y("success","\u63D0\u53D6\u5B8C\u6210"),E.emit(w.REGEX_EXTRACTED,{result:n}))}),t.find(`#${u}-test-clear`).on("click",()=>{t.find(`#${u}-test-input`).val(""),t.find(`#${u}-test-result-container`).hide()})},_bindFileEvents(t,e){t.find(`#${u}-import-rules`).on("click",()=>{t.find(`#${u}-import-rules-file`).click()}),t.find(`#${u}-import-rules-file`).on("change",async s=>{let r=s.target.files[0];if(r){try{let o=await Ne(r),n=ws(o,{overwrite:!0});n.success?(this.renderTo(t),y("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):y("error",n.message)}catch(o){y("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.find(`#${u}-export-rules`).on("click",()=>{try{let s=Ts();Le(s,`youyou_toolkit_rules_${Date.now()}.json`),y("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){y("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${u}-reset-rules`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(bs([]),Yt([]),this.renderTo(t),y("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(t){!L()||!U(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Lo={};J(Lo,{DEFAULT_TOOL_PRESETS:()=>ke,DEFAULT_TOOL_STRUCTURE:()=>ie,TOOL_STORAGE_KEYS:()=>G,cloneTool:()=>Ai,createDefaultToolDefinition:()=>Ft,deleteTool:()=>Sr,deleteToolPreset:()=>Ci,exportTools:()=>Pr,getAllToolPresets:()=>Ar,getAllTools:()=>ct,getCurrentToolPresetId:()=>ki,getTool:()=>St,getToolPreset:()=>Pi,importTools:()=>Mr,normalizeToolDefinitionToRuntimeConfig:()=>Ss,resetTools:()=>Cr,saveTool:()=>_s,saveToolPreset:()=>Mi,setCurrentToolPreset:()=>Ii,setToolEnabled:()=>_r,validateTool:()=>Ri});function Et(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function Er(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>0?s:e}function Si(t=[]){let e=Array.isArray(t)?t.map(s=>({role:String(s?.role||"user").trim().toUpperCase(),content:String(s?.content||"").trim()})).filter(s=>s.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(s=>`\u3010${s.role||"USER"}\u3011
${s.content}`).join(`

`)}function _i(t,e={}){let s=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(s)return s;let r=Si(e?.config?.messages||[]);return r||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function Ft(t={}){let e=new Date().toISOString(),s=t?.config||{};return{...ie,...t,id:t?.id||ie.id,icon:t?.icon||ie.icon,order:Number.isFinite(t?.order)?t.order:ie.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:ie.promptTemplate,extractTags:Et(t?.extractTags),config:{...ie.config,...s,trigger:{...ie.config.trigger,...s.trigger||{},events:Et(s?.trigger?.events)},execution:{...ie.config.execution,...s.execution||{},timeout:Er(s?.execution?.timeout,ie.config.execution.timeout),retries:Math.max(0,parseInt(s?.execution?.retries,10)||ie.config.execution.retries)},api:{...ie.config.api,...s.api||{}},messages:Array.isArray(s?.messages)?s.messages:[],context:{...ie.config.context,...s.context||{},depth:Er(s?.context?.depth,ie.config.context.depth),includeTags:Et(s?.context?.includeTags),excludeTags:Et(s?.context?.excludeTags)}},enabled:t?.enabled!==!1,metadata:{...ie.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function Ss(t,e={},s={}){let r=Ft({...e,id:t||e?.id||""}),o=Et(r?.config?.trigger?.events),n=Et(r?.extractTags?.length?r.extractTags:r?.config?.context?.includeTags),i=String(e?.output?.apiPreset||r?.config?.api?.preset||"").trim(),a=_i(t,r),l=o[0]||"GENERATION_ENDED",c=o.includes("GENERATION_ENDED"),d=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():s.defaultOutputMode||"follow_ai";return{id:r.id||t,name:r.name||t,icon:r.icon||"fa-screwdriver-wrench",description:r.description||"",enabled:r.enabled!==!1,order:Number.isFinite(r.order)?r.order:100,trigger:{event:l,enabled:c},bypass:{enabled:r?.config?.api?.useBypass===!0&&!!r?.config?.api?.bypassPreset,presetId:r?.config?.api?.bypassPreset||""},output:{mode:d,apiPreset:i,overwrite:!0,enabled:d==="post_response_api"?c:!1},extraction:{enabled:!0,maxMessages:Er(r?.config?.context?.depth,5),selectors:n},promptTemplate:a,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:i,extractTags:n,isCustom:!0,category:r.category||"utility",metadata:{...r.metadata||{}}}}function ct(){let t=N.get(G.TOOLS),e=t&&typeof t=="object"?{...ke,...t}:{...ke};return Object.fromEntries(Object.entries(e).map(([s,r])=>[s,Ft({...r||{},id:s})]))}function St(t){return ct()[t]||null}function _s(t,e){if(!t||!e)return!1;let s=N.get(G.TOOLS)||{},r=!s[t]&&!ke[t],o=Ft({...s[t]||{},...e,id:t,metadata:{...s[t]?.metadata||{},...e.metadata||{},createdAt:s[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return s[t]=o,N.set(G.TOOLS,s),E.emit(r?w.TOOL_REGISTERED:w.TOOL_UPDATED,{toolId:t,tool:o}),!0}function Sr(t){if(ke[t])return!1;let e=N.get(G.TOOLS)||{};return e[t]?(delete e[t],N.set(G.TOOLS,e),E.emit(w.TOOL_UNREGISTERED,{toolId:t}),!0):!1}function _r(t,e){let s=St(t);if(!s)return!1;let r=N.get(G.TOOLS)||{};return r[t]||(r[t]={...s}),r[t].enabled=e,r[t].metadata={...r[t].metadata,updatedAt:new Date().toISOString()},N.set(G.TOOLS,r),E.emit(e?w.TOOL_ENABLED:w.TOOL_DISABLED,{toolId:t}),!0}function Ai(t,e,s){let r=St(t);if(!r)return!1;let o=JSON.parse(JSON.stringify(r));return o.name=s||`${r.name} (\u526F\u672C)`,o.metadata={...o.metadata,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},_s(e,o)}function Ar(){let t=N.get(G.PRESETS);return t&&typeof t=="object"?{...ke,...t}:{...ke}}function Pi(t){return Ar()[t]||null}function Mi(t,e){if(!t||!e)return!1;let s=N.get(G.PRESETS)||{};return s[t]={...e,metadata:{...e.metadata,updatedAt:new Date().toISOString()}},N.set(G.PRESETS,s),!0}function Ci(t){if(ke[t])return!1;let e=N.get(G.PRESETS)||{};return e[t]?(delete e[t],N.set(G.PRESETS,e),!0):!1}function ki(){return N.get(G.CURRENT_PRESET)||null}function Ii(t){return Ar()[t]?(N.set(G.CURRENT_PRESET,t),!0):!1}function Pr(){let t=N.get(G.TOOLS)||{},e=N.get(G.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function Mr(t,e=!1){try{let s=typeof e=="object"?!!e?.overwrite:!!e,r=JSON.parse(t);if(!r||typeof r!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let o=s?{}:N.get(G.TOOLS)||{},n=s?{}:N.get(G.PRESETS)||{},i=0,a=0;if(r.tools&&typeof r.tools=="object"){for(let[l,c]of Object.entries(r.tools))ke[l]&&!s||c&&typeof c=="object"&&(o[l]=Ft({...c,id:l}),i++);N.set(G.TOOLS,o)}if(r.presets&&typeof r.presets=="object"){for(let[l,c]of Object.entries(r.presets))ke[l]&&!s||c&&typeof c=="object"&&(n[l]=c,a++);N.set(G.PRESETS,n)}return{success:!0,toolsImported:i,presetsImported:a,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u5DE5\u5177\u548C ${a} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function Cr(){N.remove(G.TOOLS),N.remove(G.PRESETS),N.remove(G.CURRENT_PRESET)}function Ri(t){let e=[];if(!t)return{valid:!1,errors:["\u5DE5\u5177\u5B9A\u4E49\u4E3A\u7A7A"]};if((!t.name||typeof t.name!="string")&&e.push("\u5DE5\u5177\u540D\u79F0\u65E0\u6548"),(!t.category||typeof t.category!="string")&&e.push("\u5DE5\u5177\u5206\u7C7B\u65E0\u6548"),t.config){let{trigger:s,execution:r,api:o,context:n}=t.config;s&&!["manual","event","scheduled"].includes(s.type)&&e.push("\u89E6\u53D1\u7C7B\u578B\u65E0\u6548"),r&&((typeof r.timeout!="number"||r.timeout<0)&&e.push("\u8D85\u65F6\u65F6\u95F4\u5FC5\u987B\u4E3A\u6B63\u6570"),(typeof r.retries!="number"||r.retries<0)&&e.push("\u91CD\u8BD5\u6B21\u6570\u5FC5\u987B\u4E3A\u6B63\u6570")),n&&typeof n.depth!="number"&&e.push("\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u5FC5\u987B\u4E3A\u6570\u5B57")}return{valid:e.length===0,errors:e}}var ie,ke,G,As=D(()=>{He();re();ie={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{trigger:{type:"manual",events:[]},execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},ke={},G={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"}});var Zo={};J(Zo,{TOOL_CATEGORIES:()=>No,TOOL_REGISTRY:()=>_t,clearToolApiPreset:()=>Wo,default:()=>zi,ensureToolRuntimeConfig:()=>Cs,getAllDefaultToolConfigs:()=>Jo,getAllToolApiBindings:()=>qo,getAllToolFullConfigs:()=>Or,getEnabledTools:()=>ks,getToolApiPreset:()=>$r,getToolBaseConfig:()=>Ms,getToolConfig:()=>Wt,getToolFullConfig:()=>K,getToolList:()=>Go,getToolSubTabs:()=>Yo,getToolWindowState:()=>Qo,hasTool:()=>Rr,onPresetDeleted:()=>Ko,patchToolRuntime:()=>At,registerTool:()=>Bo,resetToolConfig:()=>Vo,resetToolRegistry:()=>Fo,saveToolConfig:()=>ze,saveToolWindowState:()=>Xo,setToolApiPreset:()=>Ho,setToolApiPresetConfig:()=>Li,setToolBypassConfig:()=>Ni,setToolOutputMode:()=>Oi,setToolPromptTemplate:()=>Ui,unregisterTool:()=>jo,updateToolRuntime:()=>Dr});function Ps(t={}){return{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0,lastTriggerAt:0,lastTriggerEvent:"",lastMessageKey:"",lastSkipReason:"",lastExecutionPath:"",lastWritebackStatus:"",lastFailureStage:"",...t}}function Uo(){let t=ct()||{};return Object.entries(t).filter(([e])=>!Ht[e]).map(([e,s])=>[e,s||{}])}function zo(){let t=Array.isArray(_t.tools?.subTabs)?[..._t.tools.subTabs]:[],e=Uo().map(([s,r],o)=>{let n=Ss(s,r);return{id:s,name:n.name||s,icon:n.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(n.order)?n.order:100+o,isCustom:!0,description:n.description||""}});return[...t,...e].sort((s,r)=>(s.order??0)-(r.order??0))}function $i(t,e={}){let s=Ss(t,e,{defaultOutputMode:"follow_ai"});return{...s,runtime:Ps(s.runtime)}}function Ir(t){let e=Ht[t];if(e)return{...e,trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{}},runtime:Ps(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let r=(ct()||{})[t]||null;return r?$i(t,r):Wt(t)}function Ms(t){let e=Ir(t);return e?{...e,trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function Di(t,e={},s=""){if(!t)return null;let r={...t,...e,id:t.id||e.id};r.trigger={...t.trigger||{},...e.trigger||{}},r.output={...t.output||{},...e.output||{}},r.bypass={...t.bypass||{},...e.bypass||{}},r.runtime=Ps({...t.runtime||{},...e.runtime||{}}),r.extraction={...t.extraction||{},...e.extraction||{}};let o=e?.output?.apiPreset||e?.apiPreset||r.output?.apiPreset||r.apiPreset||s||"";return r.output={...r.output||{},apiPreset:o},r.apiPreset=o,(!Array.isArray(r.extraction.selectors)||r.extraction.selectors.length===0)&&Array.isArray(r.extractTags)&&r.extractTags.length>0&&(r.extraction.selectors=[...r.extractTags]),(!Array.isArray(r.extractTags)||r.extractTags.length===0)&&(r.extractTags=Array.isArray(r.extraction.selectors)?[...r.extraction.selectors]:[]),t.isCustom?r.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?r.enabled=e.enabled:r.enabled=t.enabled!==!1,r}function Bo(t,e){if(!t||typeof t!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let r of s)if(!e[r])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${r}`),!1;return Ie[t]={id:t,...e,order:e.order??Object.keys(Ie).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function jo(t){return Ie[t]?(delete Ie[t],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function Go(t=!0){let e=Object.values(Ie).map(s=>s.id==="tools"?{...s,subTabs:zo()}:s);return t?e.sort((s,r)=>(s.order??0)-(r.order??0)):e}function Wt(t){return t==="tools"&&Ie[t]?{...Ie[t],subTabs:zo()}:Ie[t]||null}function Rr(t){return!!Ie[t]}function Yo(t){let e=Wt(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function Fo(){Ie={..._t},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Ho(t,e){if(!Rr(t))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let s=h.get(pe)||{};return s[t]=e||"",h.set(pe,s),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function $r(t){return(h.get(pe)||{})[t]||""}function Wo(t){let e=h.get(pe)||{};delete e[t],h.set(pe,e),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function qo(){return h.get(pe)||{}}function Ko(t){let e=h.get(pe)||{},s=!1;for(let r in e)e[r]===t&&(e[r]="",s=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${r}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&h.set(pe,e)}function K(t){let e=Ir(t);if(!e)return Wt(t);let r=(h.get(dt)||{})[t]||{},o=$r(t);return Di({...e,id:t},r,o)}function Cs(t){if(!t)return!1;let e=Ir(t);if(!e)return!1;let s=h.get(dt)||{};if(s[t])return!0;let r={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}}};s[t]=r,h.set(dt,s);let o=h.get(pe)||{};return o[t]=r.output?.apiPreset||r.apiPreset||"",h.set(pe,o),E.emit(w.TOOL_UPDATED,{toolId:t,config:r}),!0}function ze(t,e,s={}){if(!t||!K(t))return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:r=!0}=s,o=h.get(dt)||{},n=h.get(pe)||{},i=e?.output?.apiPreset??e?.apiPreset??"",a=["promptTemplate","enabled","extractTags","apiPreset","trigger","output","bypass","extraction","runtime"];return o[t]={},a.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){o[t][l]={...e.output,apiPreset:i};return}if(l==="apiPreset"){o[t][l]=i;return}o[t][l]=e[l]}}),o[t].apiPreset===void 0&&(o[t].apiPreset=i),!o[t].output&&e.output!==void 0&&(o[t].output={...e.output||{},apiPreset:i}),h.set(dt,o),n[t]=i,h.set(pe,n),r&&E.emit(w.TOOL_UPDATED,{toolId:t,config:o[t]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function Oi(t,e){let s=K(t);return s?ze(t,{...s,output:{...s.output,mode:e}}):!1}function Li(t,e){let s=K(t);return s?ze(t,{...s,apiPreset:e,output:{...s.output,apiPreset:e}}):!1}function Ni(t,e){let s=K(t);return s?ze(t,{...s,bypass:{...s.bypass,...e}}):!1}function Ui(t,e){let s=K(t);return s?ze(t,{...s,promptTemplate:e}):!1}function At(t,e,s={}){let r=K(t);if(!r)return!1;let{touchLastRunAt:o=!1,emitEvent:n=!1}=s,i=Ps({...r.runtime||{},...e||{}});return o&&(i.lastRunAt=Date.now()),ze(t,{...r,runtime:i},{emitEvent:n})}function Dr(t,e){return At(t,e,{touchLastRunAt:!0,emitEvent:!0})}function Vo(t){if(!t||!Ht[t])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=h.get(dt)||{};return delete e[t],h.set(dt,e),E.emit(w.TOOL_UPDATED,{toolId:t,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function Jo(){return{...Ht}}function Or(){let t=new Set([...Object.keys(Ht),...Uo().map(([e])=>e)]);return Array.from(t).map(e=>K(e)).filter(Boolean)}function ks(){return Or().filter(t=>t&&t.enabled)}function Xo(t,e){let s=h.get(kr)||{};s[t]={...e,updatedAt:Date.now()},h.set(kr,s)}function Qo(t){return(h.get(kr)||{})[t]||null}var dt,pe,kr,Ht,_t,No,Ie,zi,Pt=D(()=>{He();re();As();dt="tool_configs",pe="tool_api_bindings",kr="tool_window_states";Ht={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]}},_t={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{trigger:{type:"manual",events:[]},execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},toolManage:{id:"toolManage",name:"\u5DE5\u5177\u5217\u8868",icon:"fa-screwdriver-wrench",hasSubTabs:!1,description:"\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u7BA1\u7406\u81EA\u5B9A\u4E49\u5DE5\u5177",component:"ToolManagePanel",order:3},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel"}]},bypass:{id:"bypass",name:"\u7834\u9650\u8BCD",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406\u7834\u9650\u8BCD\u9884\u8BBE",component:"BypassPanel",order:5},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:6}},No={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},Ie={..._t};zi={TOOL_REGISTRY:_t,TOOL_CATEGORIES:No,registerTool:Bo,unregisterTool:jo,getToolList:Go,getToolConfig:Wt,hasTool:Rr,getToolSubTabs:Yo,resetToolRegistry:Fo,setToolApiPreset:Ho,getToolApiPreset:$r,clearToolApiPreset:Wo,getAllToolApiBindings:qo,onPresetDeleted:Ko,saveToolWindowState:Xo,getToolWindowState:Qo,getToolBaseConfig:Ms,ensureToolRuntimeConfig:Cs,getToolFullConfig:K,patchToolRuntime:At,saveToolConfig:ze,resetToolConfig:Vo,getAllDefaultToolConfigs:Jo,getAllToolFullConfigs:Or,getEnabledTools:ks}});var ve,Lr=D(()=>{Me();As();Pt();ve={id:"toolManagePanel",_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let s=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!s){y("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}s.switchMainTab("tools"),s.switchSubTab("tools",t)},render(t){let e=ct();return`
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
      `},bindEvents(t,e){let s=L();!s||!U(t)||(this._bindToolEvents(t,s),this._bindFileEvents(t,s))},_bindToolEvents(t,e){t.find(".yyt-tool-toggle input").on("change",s=>{let r=e(s.currentTarget).closest(".yyt-tool-item"),o=r.data("tool-id"),n=e(s.currentTarget).is(":checked");_r(o,n),r.toggleClass("yyt-enabled",n).toggleClass("yyt-disabled",!n),y("info",n?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.find("#yyt-add-tool").on("click",()=>{this._showToolEditDialog(t,e,null)}),t.find('.yyt-tool-item [data-action="config"]').on("click",s=>{let r=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._openToolConfig(r)}),t.find('.yyt-tool-item [data-action="edit"]').on("click",s=>{let r=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._showToolEditDialog(t,e,r)}),t.find('.yyt-tool-item [data-action="delete"]').on("click",s=>{let r=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id"),o=St(r);if(!r||!o||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177\u201C${o.name}\u201D\u5417\uFF1F`))return;if(!Sr(r)){y("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),y("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.find("#yyt-import-tools").on("click",()=>{t.find("#yyt-import-tools-file").click()}),t.find("#yyt-import-tools-file").on("change",async s=>{let r=s.target.files[0];if(r){try{let o=await Ne(r),n=Mr(o,{overwrite:!1});y(n.success?"success":"error",n.message),n.success&&this.renderTo(t)}catch(o){y("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.find("#yyt-export-tools").on("click",()=>{try{let s=Pr();Le(s,`youyou_toolkit_tools_${Date.now()}.json`),y("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){y("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find("#yyt-reset-tools").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(Cr(),this.renderTo(t),y("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,s){let r=s?St(s):null,o=!!r,n=`
      <div class="yyt-dialog-overlay" id="yyt-tool-dialog-overlay">
        <div class="yyt-dialog yyt-dialog-wide">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${o?"\u7F16\u8F91\u5DE5\u5177":"\u65B0\u5EFA\u5DE5\u5177"}</span>
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
    `;e("#yyt-tool-dialog-overlay").remove(),t.append(n);let i=e("#yyt-tool-dialog-overlay"),a=()=>i.remove();i.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",a),i.on("click",function(l){l.target===this&&a()}),i.find("#yyt-tool-dialog-save").on("click",()=>{let l=e("#yyt-tool-name").val().trim(),c=e("#yyt-tool-category").val(),d=e("#yyt-tool-desc").val().trim(),p=parseInt(e("#yyt-tool-timeout").val())||6e4,b=parseInt(e("#yyt-tool-retries").val())||3;if(!l){y("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let f=s||`tool_${Date.now()}`;if(!_s(f,{name:l,category:c,description:d,promptTemplate:r?.promptTemplate||"",extractTags:Array.isArray(r?.extractTags)?r.extractTags:[],config:{trigger:r?.config?.trigger||{type:"manual",events:[]},execution:{timeout:p,retries:b},api:r?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(r?.config?.messages)?r.config.messages:[],context:{depth:r?.config?.context?.depth||3,includeTags:Array.isArray(r?.config?.context?.includeTags)?r.config.context.includeTags:[],excludeTags:Array.isArray(r?.config?.context?.excludeTags)?r.config.context.excludeTags:[]}},enabled:r?.enabled!==!1})){y("error",o?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}Cs(f),a(),this.renderTo(t),y("success",o?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),o||this._openToolConfig(f)})},destroy(t){!L()||!U(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var en={};J(en,{BypassManager:()=>Is,DEFAULT_BYPASS_PRESETS:()=>je,addMessage:()=>Ji,buildBypassMessages:()=>ta,bypassManager:()=>I,createPreset:()=>Yi,default:()=>sa,deleteMessage:()=>Qi,deletePreset:()=>Hi,duplicatePreset:()=>Wi,exportPresets:()=>Zi,getAllPresets:()=>ji,getDefaultPresetId:()=>qi,getEnabledMessages:()=>Vi,getPreset:()=>Gi,getPresetList:()=>Ur,importPresets:()=>ea,setDefaultPresetId:()=>Ki,updateMessage:()=>Xi,updatePreset:()=>Fi});var Be,Mt,Nr,je,Bi,Is,I,ji,Ur,Gi,Yi,Fi,Hi,Wi,qi,Ki,Vi,Ji,Xi,Qi,Zi,ea,ta,sa,qt=D(()=>{He();re();Be="bypass_presets",Mt="default_bypass_preset",Nr="current_bypass_preset",je={},Bi=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),Is=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=h.get(Be,{});return this._cache={...je,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((s,r)=>(r.updatedAt||0)-(s.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:s,name:r,description:o,messages:n}=e;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let i=s.trim();if(this.presetExists(i))return{success:!1,message:`\u9884\u8BBE "${i}" \u5DF2\u5B58\u5728`};let a={id:i,name:r.trim(),description:o||"",enabled:!0,messages:n||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(i,a),E.emit(w.BYPASS_PRESET_CREATED,{presetId:i,preset:a}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${i}`),{success:!0,message:`\u9884\u8BBE "${r}" \u521B\u5EFA\u6210\u529F`,preset:a}}updatePreset(e,s){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let o={...r,...s,id:e,updatedAt:Date.now()};return this._savePreset(e,o),E.emit(w.BYPASS_PRESET_UPDATED,{presetId:e,preset:o}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u66F4\u65B0\u6210\u529F`,preset:o}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(je[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r=h.get(Be,{});return delete r[e],h.set(Be,r),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),E.emit(w.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,s,r){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${e}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(o)),id:s.trim(),name:r||`${o.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),n),E.emit(w.BYPASS_PRESET_CREATED,{presetId:s,preset:n}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${n.name}"`,preset:n}}addMessage(e,s){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o={id:`msg_${Date.now()}`,role:s.role||"SYSTEM",content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1},n=[...r.messages||[],o];return this.updatePreset(e,{messages:n})}updateMessage(e,s,r){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=o.messages||[],i=n.findIndex(l=>l.id===s);if(i===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let a=[...n];return a[i]={...a[i],...r},this.updatePreset(e,{messages:a})}deleteMessage(e,s){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=r.messages||[],n=o.find(a=>a.id===s);if(!n)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(n.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let i=o.filter(a=>a.id!==s);return this.updatePreset(e,{messages:i})}getEnabledMessages(e){let s=this.getPreset(e);return!s||!s.enabled?[]:(s.messages||[]).filter(r=>r.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=h.get(Mt,null);return e==="undefined"||e==="null"||e===""?(h.remove(Mt),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(h.set(Mt,e),E.emit(w.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let r=this.getPreset(e);if(!r)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(e,s={}){let{overwrite:r=!1}=s,o;try{o=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(o)?o:o.presets?o.presets:[o];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let i=h.get(Be,{}),a=0;for(let l of n)!l.id||typeof l.id!="string"||l.name&&(je[l.id]&&!r||!r&&i[l.id]||(i[l.id]={...l,updatedAt:Date.now()},a++));return a>0&&(h.set(Be,i),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u9884\u8BBE`,imported:a}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let s=e?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(e){let s=this.getToolBypassPreset(e);return s?this.getEnabledMessages(s.id):[]}_savePreset(e,s){let r=h.get(Be,{});r[e]=s,h.set(Be,r),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=h.get(Be,{}),s={},r=!1,o=Array.isArray(e)?e.map((n,i)=>[n?.id||n?.name||`legacy_${i}`,n]):Object.entries(e||{});for(let[n,i]of o){let a=this._normalizePreset(n,i,s);if(!a){r=!0;continue}s[a.id]=a,(!e?.[a.id]||e?.[a.id]?.id!==a.id)&&(r=!0)}r&&h.set(Be,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(e,s,r={}){if(!s||typeof s!="object")return null;let o=typeof s.name=="string"?s.name.trim():"",n=typeof s.id=="string"?s.id.trim():"",i=typeof e=="string"?e.trim():"";if(!o&&i&&i!=="undefined"&&i!=="null"&&(o=i),this._isLegacySamplePreset(o,n)||(!n&&i&&i!=="undefined"&&i!=="null"&&(n=i),!n&&o&&o!=="undefined"&&o!=="null"&&(n=this._generatePresetId(o,r)),!o||!n||n==="undefined"||o==="undefined"))return null;let l=Array.isArray(s.messages)?s.messages.filter(c=>c&&typeof c=="object").map((c,d)=>({id:typeof c.id=="string"&&c.id.trim()?c.id.trim():`${n}_msg_${d+1}`,role:c.role||"SYSTEM",content:typeof c.content=="string"?c.content:"",enabled:c.enabled!==!1,deletable:c.deletable!==!1})):[];return{...s,id:n,name:o,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:l,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(e){let s=h.get(Mt,null),r=h.get(Nr,null),o=s??r;(o==="undefined"||o==="null"||o==="")&&(o=null),o&&!e[o]&&(o=Object.values(e).find(i=>i.name===o)?.id||null),o?h.set(Mt,o):h.remove(Mt),h.has(Nr)&&h.remove(Nr)}_isLegacySamplePreset(e,s=""){return e?s==="standard"||s==="enhanced"||s==="jailbreak"||Bi.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,s={}){let r=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,o=r,n=1;for(;s[o];)o=`${r}_${n++}`;return o}_log(...e){this.debugMode&&console.log("[BypassManager]",...e)}},I=new Is,ji=()=>I.getAllPresets(),Ur=()=>I.getPresetList(),Gi=t=>I.getPreset(t),Yi=t=>I.createPreset(t),Fi=(t,e)=>I.updatePreset(t,e),Hi=t=>I.deletePreset(t),Wi=(t,e,s)=>I.duplicatePreset(t,e,s),qi=()=>I.getDefaultPresetId(),Ki=t=>I.setDefaultPresetId(t),Vi=t=>I.getEnabledMessages(t),Ji=(t,e)=>I.addMessage(t,e),Xi=(t,e,s)=>I.updateMessage(t,e,s),Qi=(t,e)=>I.deleteMessage(t,e),Zi=t=>I.exportPresets(t),ea=(t,e)=>I.importPresets(t,e),ta=t=>I.buildBypassMessages(t),sa=I});var tn={};J(tn,{DEFAULT_SETTINGS:()=>Kt,SettingsService:()=>Rs,default:()=>ra,settingsService:()=>Te});var Kt,zr,Rs,Te,ra,Vt=D(()=>{He();re();Kt={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},listener:{listenGenerationEnded:!0,ignoreQuietGeneration:!0,ignoreAutoTrigger:!0,debounceMs:300},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue"}},zr="settings_v2",Rs=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=h.get(zr,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),h.set(zr,this._cache),E.emit(w.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let s=this.getSettings(),r=this._deepMerge(s,e);this.saveSettings(r)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getListenerSettings(){return this.getSettings().listener}updateListenerSettings(e){this.updateSettings({listener:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(Kt)),h.set(zr,this._cache),E.emit(w.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,s=null){let r=this.getSettings(),o=e.split("."),n=r;for(let i of o)if(n&&typeof n=="object"&&i in n)n=n[i];else return s;return n}set(e,s){let r=JSON.parse(JSON.stringify(this.getSettings())),o=e.split("."),n=r;for(let i=0;i<o.length-1;i++){let a=o[i];a in n||(n[a]={}),n=n[a]}n[o[o.length-1]]=s,this.saveSettings(r)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(Kt)),e)}_deepMerge(e,s){let r={...e};for(let o in s)s[o]&&typeof s[o]=="object"&&!Array.isArray(s[o])?r[o]=this._deepMerge(e[o]||{},s[o]):r[o]=s[o];return r}},Te=new Rs,ra=Te});var nn={};J(nn,{abortAllTasks:()=>la,abortTask:()=>aa,buildToolMessages:()=>on,clearExecutionHistory:()=>ya,createExecutionContext:()=>ba,createResult:()=>$s,enhanceMessagesWithBypass:()=>ha,executeBatch:()=>ia,executeTool:()=>rn,executeToolWithConfig:()=>Ds,executeToolsBatch:()=>Ta,executorState:()=>W,extractFailed:()=>ma,extractSuccessful:()=>fa,generateTaskId:()=>ut,getExecutionHistory:()=>pa,getExecutorStatus:()=>ua,getScheduler:()=>Ct,getToolsForEvent:()=>jr,mergeResults:()=>ga,pauseExecutor:()=>ca,resumeExecutor:()=>da,setMaxConcurrent:()=>na});function $s(t,e,s,r,o,n,i=0){return{success:s,taskId:t,toolId:e,data:r,error:o,duration:n,retries:i,timestamp:Date.now(),metadata:{}}}function ut(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function oa(t,e={}){return{id:ut(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function Ct(){return Jt||(Jt=new Br(W.maxConcurrent)),Jt}function na(t){W.maxConcurrent=Math.max(1,Math.min(10,t)),Jt&&(Jt.maxConcurrent=W.maxConcurrent)}async function rn(t,e={},s){let r=Ct(),o=oa(t,e);for(;W.isPaused;)await new Promise(n=>setTimeout(n,100));try{let n=await r.enqueue(async i=>{if(i.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(i,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},o);return sn(n),n}catch(n){let i=$s(o.id,t,!1,null,n,Date.now()-o.createdAt,o.retries);return sn(i),i}}async function ia(t,e={}){let{failFast:s=!1,concurrency:r=W.maxConcurrent}=e,o=[],n=Ct(),i=n.maxConcurrent;n.maxConcurrent=r;try{let a=t.map(({toolId:l,options:c,executor:d})=>rn(l,c,d));if(s)for(let l of a){let c=await l;if(o.push(c),!c.success){n.abortAll();break}}else{let l=await Promise.allSettled(a);for(let c of l)c.status==="fulfilled"?o.push(c.value):o.push($s(ut(),"unknown",!1,null,c.reason,0,0))}}finally{n.maxConcurrent=i}return o}function aa(t){return Ct().abort(t)}function la(){Ct().abortAll(),W.executionQueue=[]}function ca(){W.isPaused=!0}function da(){W.isPaused=!1}function ua(){return{...Ct().getStatus(),isPaused:W.isPaused,activeControllers:W.activeControllers.size,historyCount:W.executionHistory.length}}function sn(t){W.executionHistory.push(t),W.executionHistory.length>100&&W.executionHistory.shift()}function pa(t={}){let e=[...W.executionHistory];return t.toolId&&(e=e.filter(s=>s.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(s=>s.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function ya(){W.executionHistory=[]}function ga(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of t)e.totalDuration+=s.duration,s.success?(e.successCount++,s.data!==void 0&&s.data!==null&&e.data.push(s.data)):(e.success=!1,e.failureCount++,s.error&&e.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return e}function fa(t){return t.filter(e=>e.success).map(e=>e.data)}function ma(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function ba(t={}){return{taskId:ut(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function ha(t,e){return!e||e.length===0?t:[...e,...t]}function xa(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function on(t,e){let s=[],r=t.promptTemplate||"",o={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[n,i]of Object.entries(o))r=r.replace(new RegExp(xa(n),"g"),i);return s.push({role:"USER",content:r}),s}async function Ds(t,e,s={}){let r=K(t);if(!r)return{success:!1,taskId:ut(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!r.enabled)return{success:!1,taskId:ut(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let o=Date.now(),n=ut();try{E.emit(w.TOOL_EXECUTION_STARTED,{toolId:t,taskId:n,context:e});let i=on(r,e);if(typeof s.callApi=="function"){let a=r.output?.apiPreset||r.apiPreset||"",l=a?{preset:a}:null,c=await s.callApi(i,l,s.signal),d=c;r.outputMode==="separate"&&r.extractTags?.length>0&&(d=va(c,r.extractTags));let p={success:!0,taskId:n,toolId:t,data:d,duration:Date.now()-o};return E.emit(w.TOOL_EXECUTED,{toolId:t,taskId:n,result:p}),p}else return{success:!0,taskId:n,toolId:t,data:{messages:i,config:{apiPreset:r.output?.apiPreset||r.apiPreset||"",outputMode:r.outputMode,extractTags:r.extractTags}},duration:Date.now()-o,needsExecution:!0}}catch(i){let a={success:!1,taskId:n,toolId:t,error:i.message||String(i),duration:Date.now()-o};return E.emit(w.TOOL_EXECUTION_FAILED,{toolId:t,taskId:n,error:i}),a}}function va(t,e){let s={};for(let r of e){let o=new RegExp(`<${r}[^>]*>([\\s\\S]*?)<\\/${r}>`,"gi"),n=t.match(o);n&&(s[r]=n.map(i=>{let a=i.match(new RegExp(`<${r}[^>]*>([\\s\\S]*?)<\\/${r}>`,"i"));return a?a[1].trim():""}))}return s}async function Ta(t,e,s={}){let r=[];for(let o of t){let n=K(o);if(n&&n.enabled){let i=await Ds(o,e,s);r.push(i)}}return r}function jr(t){let e=[],s=ks();for(let r of s){let o=r?.trigger?.enabled&&r?.trigger?.event===t,n=Array.isArray(r?.triggerEvents)&&r.triggerEvents.includes(t);r&&r.enabled&&(o||n)&&e.push(r)}return e}var W,Br,Jt,Gr=D(()=>{Pt();re();W={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};Br=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,s){return new Promise((r,o)=>{this.queue.push({executor:e,task:s,resolve:r,reject:o}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:s,task:r,resolve:o,reject:n}=e,i=new AbortController;r.abortController=i,r.status="running",r.startedAt=Date.now(),this.running.set(r.id,r),W.activeControllers.set(r.id,i),this.executeTask(s,r,i.signal).then(a=>{r.status="completed",r.completedAt=Date.now(),o(a)}).catch(a=>{r.status=a.name==="AbortError"?"aborted":"failed",r.completedAt=Date.now(),n(a)}).finally(()=>{this.running.delete(r.id),W.activeControllers.delete(r.id),W.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,s,r){let o=Date.now(),n=null;for(let i=0;i<=s.maxRetries;i++){if(r.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let a=await e(r);return $s(s.id,s.toolId,!0,a,null,Date.now()-o,i)}catch(a){if(n=a,a.name==="AbortError")throw a;i<s.maxRetries&&(await this.delay(1e3*(i+1)),s.retries=i+1)}}throw n}delay(e){return new Promise(s=>setTimeout(s,e))}abort(e){let s=W.activeControllers.get(e);return s?(s.abort(),!0):!1}abortAll(){for(let e of W.activeControllers.values())e.abort();W.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},Jt=null});var ln={};J(ln,{ContextInjector:()=>Ls,DEFAULT_INJECTION_OPTIONS:()=>an,contextInjector:()=>Ns,default:()=>wa});var Re,Os,an,Ls,Ns,wa,Yr=D(()=>{re();Re="YouYouToolkit_toolOutputs",Os="YouYouToolkit_injectedContext",an={overwrite:!0,enabled:!0},Ls=class{constructor(){this.debugMode=!1}async inject(e,s,r={}){if(!e||s===void 0||s===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),!1;let o={...an,...r},n=this._getCurrentChatId(),i={toolId:e,content:String(s),updatedAt:Date.now(),sourceMessageId:r.sourceMessageId||null,options:o};return E.emit(w.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:n,content:i.content,options:o}),await this._insertToolOutputToLatestAssistantMessage(e,i,o)?(this._log(`\u6CE8\u5165\u6210\u529F: ${e} -> ${n}`),!0):!1}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:s}=this._getChatRuntime(),r=this._findAssistantMessageIndex(s,e);if(r<0)return"";let o=s[r]||{},n=o[Os];if(typeof n=="string"&&n.trim())return n.trim();let i=o[Re];return i&&typeof i=="object"?this._buildMessageInjectedContext(i).trim():""}catch(s){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",s),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),s=this._findAssistantMessageIndex(e,null);if(s<0)return{};let o=(e[s]||{})[Re];return o&&typeof o=="object"?o:{}}catch(e){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",e),{}}}getToolContext(e,s){if(!s)return null;try{let{chat:r}=this._getChatRuntime(),o=this._findAssistantMessageIndex(r,null);return o<0?null:r[o]?.[Re]?.[s]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,s){if(!s)return!1;try{let{api:r,context:o,chat:n}=this._getChatRuntime(),i=this._findAssistantMessageIndex(n,null);if(i<0)return!1;let a=n[i],l=a?.[Re];if(!l||!l[s])return!1;delete l[s],a[Re]=l,a[Os]=this._buildMessageInjectedContext(l);let c=o?.saveChat||r?.saveChat||null;return typeof c=="function"&&await c.call(o||r),E.emit(w.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:s}),!0}catch(r){return this._log("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",r),!1}}async clearAllContext(e){try{let{api:s,context:r,chat:o}=this._getChatRuntime(),n=this._findAssistantMessageIndex(o,null);if(n<0)return!1;let i=o[n];delete i[Re],delete i[Os];let a=r?.saveChat||s?.saveChat||null;return typeof a=="function"&&await a.call(r||s),E.emit(w.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(s){return this._log("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",s),!1}}clearAllChatsContexts(){this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,s){return!!this.getToolContext(e,s)}getContextSummary(e){let s=this._getLatestAssistantMessageOutputs(),r=Object.entries(s).map(([o,n])=>({toolId:o,updatedAt:n.updatedAt,contentLength:n.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:r,totalCount:r.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,s={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,s=e.SillyTavern||null,r=s?.getContext?.()||null,o=Array.isArray(r?.chat)?r.chat:[],n=Array.isArray(s?.chat)?s.chat:[],i=o.length?o:n;return{topWindow:e,api:s,context:r,chat:i,contextChat:o,apiChat:n}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_syncMessageToRuntimeChats(e,s,r){let{contextChat:o,apiChat:n}=e||{},i=a=>{!Array.isArray(a)||s<0||s>=a.length||a[s]!==r&&(a[s]={...a[s]||{},...r})};i(o),i(n)}_notifyMessageUpdated(e,s){try{let{api:r,topWindow:o}=e||{},n=r?.eventSource||null,a=(r?.eventTypes||{}).MESSAGE_UPDATED||"MESSAGE_UPDATED";n&&typeof n.emit=="function"&&(n.emit(a,s),typeof o?.requestAnimationFrame=="function"?o.requestAnimationFrame(()=>{n.emit(a,s)}):typeof o?.setTimeout=="function"&&o.setTimeout(()=>{n.emit(a,s)},30))}catch(r){this._log("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",r)}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let s=String(e.role||"").toLowerCase();return s==="assistant"||s==="ai"||!s}_findAssistantMessageIndex(e,s){let r=Array.isArray(e)?e:[];if(!r.length)return-1;let o=(n,i)=>{if(!this._isAssistantMessage(n)||s==null||s==="")return!1;let a=String(s).trim();return a?[n.message_id,n.id,n.messageId,n.mes_id,n.swipe_id,i].map(c=>c==null?"":String(c).trim()).includes(a):!1};for(let n=r.length-1;n>=0;n-=1)if(o(r[n],n))return n;for(let n=r.length-1;n>=0;n-=1)if(this._isAssistantMessage(r[n]))return n;return-1}_buildMessageInjectedContext(e){let r=Object.entries(e&&typeof e=="object"?e:{}).sort(([,n],[,i])=>(n?.updatedAt||0)-(i?.updatedAt||0));if(!r.length)return"";let o=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[n,i]of r)o.push(`[${n}]`),o.push(i?.content||""),o.push("");return o.join(`
`)}_getWritableMessageField(e){let s=["mes","message","content","text"];for(let r of s)if(typeof e?.[r]=="string")return{key:r,text:e[r]};return{key:"mes",text:""}}_applyMessageText(e,s){let r=e&&typeof e=="object"?e:{},o=["mes","message","content","text"],n=!1;return o.forEach(i=>{typeof r[i]=="string"&&(r[i]=s,n=!0)}),n||(r.mes=s,r.message=s),r}_stripExistingToolOutput(e,s=[]){let r=String(e||"");return(Array.isArray(s)?s:[]).forEach(n=>{let i=String(n||"").trim();if(!i)return;if(i.startsWith("regex:")){try{let d=new RegExp(i.slice(6).trim(),"gis");r=r.replace(d,"")}catch(d){this._log("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",i,d)}return}let a=i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${a}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${a}>\\s*`,"gi"),c=new RegExp(`\\{${a}\\|[\\s\\S]*?\\}\\s*`,"gi");r=r.replace(l,""),r=r.replace(c,"")}),r.trimEnd()}_stripPreviousStoredToolContent(e,s){let r=String(e||""),o=String(s||"").trim();return o?r.replace(o,"").trimEnd():r.trimEnd()}async _insertToolOutputToLatestAssistantMessage(e,s,r={}){try{let o=this._getChatRuntime(),{api:n,context:i,chat:a}=o;if(!Array.isArray(a)||!a.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),!1;let l=this._findAssistantMessageIndex(a,r.sourceMessageId);if(l<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),!1;let c=a[l],{key:d,text:p}=this._getWritableMessageField(c),b=c[Re]&&typeof c[Re]=="object"?c[Re]:{},f=b?.[e]?.content||"",M=r.overwrite===!1?String(p||""):this._stripPreviousStoredToolContent(this._stripExistingToolOutput(p,r.extractionSelectors),f),ee=String(s.content||"").trim(),O=[M.trimEnd(),ee].filter(Boolean).join(`

`).trim(),te={...b,[e]:{toolId:e,content:ee,updatedAt:s.updatedAt,sourceMessageId:s.sourceMessageId||null}};c[d]=O,this._applyMessageText(c,O),c[Re]=te,c[Os]=this._buildMessageInjectedContext(te),this._syncMessageToRuntimeChats(o,l,c);let se=i?.setChatMessages||n?.setChatMessages||o?.topWindow?.setChatMessages||null,V=i?.setChatMessage||n?.setChatMessage||o?.topWindow?.setChatMessage||null;if(typeof se=="function")try{await se.call(i||n||o?.topWindow,[{message_id:l,message:O,mes:O,content:O,text:O}],{refresh:"affected"})}catch(_){this._log("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",_)}else if(typeof V=="function")try{await V.call(i||n||o?.topWindow,{message:O,mes:O,content:O,text:O},l)}catch(_){this._log("setChatMessage \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",_)}if(typeof V=="function")try{await V.call(i||n||o?.topWindow,{},l)}catch(_){this._log("\u4F7F\u7528\u7A7A setChatMessage \u5F3A\u5236\u5237\u65B0\u5931\u8D25",_)}let v=i?.saveChat||n?.saveChat||null,S=i?.saveChatDebounced||n?.saveChatDebounced||null;return typeof S=="function"&&S.call(i||n),typeof v=="function"&&await v.call(i||n),this._notifyMessageUpdated(o,l),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587: ${e} -> #${l}`),!0}catch(o){return this._log("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",o),!1}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext(),o=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(i=>typeof i=="string"&&i.trim());if(o)return o;let n=e.SillyTavern?.this_chid;if(n!=null)return`chat_char_${n}`}return"chat_default"}catch{return"chat_default"}}_log(...e){this.debugMode&&console.log("[ContextInjector]",...e)}},Ns=new Ls,wa=Ns});var dn={};J(dn,{BUILTIN_VARIABLES:()=>cn,VariableResolver:()=>Us,default:()=>Ea,variableResolver:()=>Ve});var cn,Us,Ve,Ea,Fr=D(()=>{re();cn={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},Us=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,s){if(typeof e!="string")return e;let r=e;return r=this._resolveBuiltinVariables(r,s),r=this._resolveCustomVariables(r,s),r=this._resolveRegexVariables(r,s),r}resolveObject(e,s){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(o=>this.resolveObject(o,s));let r={};for(let[o,n]of Object.entries(e))typeof n=="string"?r[o]=this.resolveTemplate(n,s):typeof n=="object"&&n!==null?r[o]=this.resolveObject(n,s):r[o]=n;return r}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,s){e&&(this.customVariables.set(e,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,s){!e||typeof s!="function"||(this.variableHandlers.set(e,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,s]of Object.entries(cn))e.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,r]of this.customVariables)e.push({name:`{{${s}}}`,description:typeof r=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},r={};for(let o of this.getAvailableVariables())r[o.category]||(r[o.category]=[]),r[o.category].push(o);for(let[o,n]of Object.entries(s))if(r[o]&&r[o].length>0){e.push(`\u3010${n}\u3011`);for(let i of r[o])e.push(`  ${i.name} - ${i.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,s)=>(s.regexResults||s.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,s){let r=e;return r=r.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),r=r.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),r=r.replace(/\{\{chatHistory\}\}/gi,()=>{let o=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(o)}),r=r.replace(/\{\{characterCard\}\}/gi,()=>{let o=s.characterCard||s.raw?.characterCard;return o?this._formatCharacterCard(o):""}),r=r.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),r=r.replace(/\{\{toolId\}\}/gi,s.toolId||s.raw?.toolId||""),r=r.replace(/\{\{toolPromptMacro\}\}/gi,s.toolPromptMacro||s.raw?.toolPromptMacro||""),r=r.replace(/\{\{toolContentMacro\}\}/gi,s.toolContentMacro||s.raw?.toolContentMacro||""),r=r.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),r=r.replace(/\{\{extractedContent\}\}/gi,s.extractedContent||s.raw?.extractedContent||""),r=r.replace(/\{\{recentMessagesText\}\}/gi,s.recentMessagesText||s.raw?.recentMessagesText||""),r=r.replace(/\{\{rawRecentMessagesText\}\}/gi,s.rawRecentMessagesText||s.raw?.rawRecentMessagesText||""),r=r.replace(/\{\{userMessage\}\}/gi,s.userMessage||s.raw?.userMessage||""),r=r.replace(/\{\{previousToolOutput\}\}/gi,s.previousToolOutput||s.raw?.previousToolOutput||""),r}_resolveCustomVariables(e,s){let r=e;for(let[o,n]of this.customVariables){let i=new RegExp(`\\{\\{${this._escapeRegex(o)}\\}\\}`,"gi");typeof n=="function"?r=r.replace(i,()=>{try{return n(s)}catch(a){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}:`,a),""}}):r=r.replace(i,String(n))}return r}_resolveRegexVariables(e,s){let r=e;for(let[o,n]of this.variableHandlers){let i=new RegExp(`\\{\\{${o}\\.([^}]+)\\}\\}`,"gi");r=r.replace(i,(a,l)=>{try{return n(l,s)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}.${l}:`,c),""}})}return r}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(s=>{let r=s.role||"unknown",o=s.content||s.mes||"";return`[${r}]: ${o}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let s=[];return e.name&&s.push(`\u59D3\u540D: ${e.name}`),e.description&&s.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&s.push(`\u6027\u683C: ${e.personality}`),e.scenario&&s.push(`\u573A\u666F: ${e.scenario}`),s.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){this.debugMode&&console.log("[VariableResolver]",...e)}},Ve=new Us,Ea=Ve});var pn={};J(pn,{DEFAULT_PROMPT_TEMPLATE:()=>un,ToolPromptService:()=>zs,default:()=>Sa,toolPromptService:()=>Bs});var un,zs,Bs,Sa,Hr=D(()=>{re();qt();Fr();un="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",zs=class{constructor(){this.debugMode=!1}_buildVariableContext(e,s={}){let r=this._getPromptTemplate(e),o=Ve.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||""}),n=Ve.resolveTemplate(r,o).trim(),i=String(s?.toolContentMacro||s?.input?.toolContentMacro||"").trim();return Ve.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolPromptMacro:n,toolContentMacro:i})}buildToolMessages(e,s){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let r=[],o=this._buildVariableContext(e,s),n=this._getBypassMessages(e);if(n&&n.length>0)for(let a of n)a.enabled!==!1&&r.push({role:this._normalizeRole(a.role),content:Ve.resolveTemplate(a.content||"",o)});let i=this._buildUserContent(this._getPromptTemplate(e),o);return i&&r.push({role:"user",content:i}),this._log(`\u6784\u5EFA\u6D88\u606F: ${r.length} \u6761`),r}buildPromptText(e,s){return this._buildVariableContext(e,s).toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:un}_getBypassMessages(e){return e.bypass?.enabled?I.buildBypassMessages(e):[]}_buildUserContent(e,s){return!e||!e.trim()?"":Ve.resolveTemplate(e,s).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){this.debugMode&&console.log("[ToolPromptService]",...e)}setDebugMode(e){this.debugMode=e}},Bs=new zs,Sa=Bs});var yn={};J(yn,{LEGACY_OUTPUT_MODES:()=>_a,OUTPUT_MODES:()=>Je,TOOL_FAILURE_STAGES:()=>we,TOOL_RUNTIME_STATUS:()=>Aa,TOOL_WRITEBACK_STATUS:()=>ce,ToolOutputService:()=>js,default:()=>Pa,toolOutputService:()=>kt});var Je,_a,Aa,we,ce,js,kt,Pa,Wr=D(()=>{re();Vt();Yr();Hr();Es();ls();Je={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},_a={inline:"follow_ai"},Aa={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},we={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},ce={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"},js=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled?!1:e.output?.mode===Je.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled)return!1;let s=e.output?.mode;return s===Je.FOLLOW_AI||s==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,s){let r=Date.now(),o=e.id,n=this._getExtractionSelectors(e),i=e.output?.apiPreset||e.apiPreset||"",a="",l=ce.NOT_APPLICABLE,c=[],d="";this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${o}`),E.emit(w.TOOL_EXECUTION_STARTED,{toolId:o,mode:Je.POST_RESPONSE_API});try{if(a=we.BUILD_MESSAGES,c=await this._buildToolMessages(e,s),!c||c.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");this._log(`\u6784\u5EFA\u4E86 ${c.length} \u6761\u6D88\u606F`);let p=await this._getRequestTimeout();a=we.SEND_API_REQUEST;let b=await this._sendApiRequest(i,c,{timeoutMs:p,signal:s.signal});if(a=we.EXTRACT_OUTPUT,d=this._extractOutputContent(b,e),d){if(a=we.INJECT_CONTEXT,!await Ns.inject(o,d,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.messageId||"",extractionSelectors:n}))throw l=ce.FAILED,new Error("\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");l=ce.SUCCESS}else l=ce.SKIPPED_EMPTY_OUTPUT;a="";let f=Date.now()-r;return E.emit(w.TOOL_EXECUTED,{toolId:o,success:!0,duration:f,mode:Je.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${o}, \u8017\u65F6 ${f}ms`),{success:!0,toolId:o,output:d,duration:f,meta:{messageCount:c.length,selectors:n,apiPreset:i,writebackStatus:l,failureStage:""}}}catch(p){let b=Date.now()-r,f=a||we.UNKNOWN,M=l||ce.NOT_APPLICABLE;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${o}`,p),E.emit(w.TOOL_EXECUTION_FAILED,{toolId:o,error:p.message||String(p),duration:b}),{success:!1,toolId:o,error:p.message||String(p),duration:b,meta:{messageCount:c.length,selectors:n,apiPreset:i,writebackStatus:M,failureStage:f}}}}async runToolInline(e,s){let r=Date.now(),o=e.id;try{let n=await this._buildToolMessages(e,s);return{success:!0,toolId:o,messages:n,duration:Date.now()-r}}catch(n){return{success:!1,toolId:o,error:n.message||String(n),duration:Date.now()-r}}}async previewExtraction(e,s){let r=this._buildRecentMessageExtractionEntries(e,s),o=this._joinMessageBlocks(r,"rawText"),n=this._joinMessageBlocks(r,"filteredText"),i=this._joinMessageBlocks(r,"extractedText",{skipEmpty:!0});return{success:!0,sourceText:o,filteredSourceText:n,extractedText:i,messageEntries:r,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,s){let r=this._buildRecentMessageExtractionEntries(e,s),o=this._joinMessageBlocks(r,"rawText"),n=this._joinMessageBlocks(r,"filteredText"),i=this._joinMessageBlocks(r,"extractedText",{skipEmpty:!0}),a={...s,rawRecentMessagesText:o,recentMessagesText:n,extractedContent:i,toolContentMacro:this._buildToolContentMacro(r),toolName:e.name,toolId:e.id};return Bs.buildToolMessages(e,a)}_normalizeRole(e){if(!e)return"user";let s=String(e).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,s,r={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:o=9e4,signal:n}=r,i=null;if(e){if(!tr(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);i=zt(e)}else i=zt();let a=xt(i||{});if(!a.valid&&!i?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${a.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:o,apiConfig:i},n);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Te.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,s){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,s);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,s);if(e.content)return this._applyOutputExtractionSelectors(e.content,s);if(e.text)return this._applyOutputExtractionSelectors(e.text,s);if(e.message)return this._applyOutputExtractionSelectors(e.message,s);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),s)}catch{return this._applyOutputExtractionSelectors(String(e),s)}}return this._applyOutputExtractionSelectors(String(e),s)}_applyOutputExtractionSelectors(e,s){let r=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(s);if(!o.length)return r.trim();let n=[];for(let i of o){let a=String(i||"").trim();if(!a)continue;if(a.startsWith("regex:")){let c=a.slice(6).trim();if(!c)continue;try{let d=new RegExp(c,"gi");[...r.matchAll(d)].forEach(b=>{let f=String(b?.[0]||"").trim();f&&n.push(f)})}catch(d){this._log("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:a,error:d})}continue}let l=a.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(r.match(c)||[]).forEach(p=>{let b=String(p||"").trim();b&&n.push(b)})}catch(c){this._log("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:a,error:c})}}return n.length>0?n.join(`

`).trim():r.trim()}_getExtractionSelectors(e){let s=e?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(r=>String(r||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(r=>String(r||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,s){return this._applyExtractionSelectorsInternal(e,s,{strict:!1})}_applyExtractionSelectorsInternal(e,s,r={}){let o=typeof e=="string"?e:String(e||""),n=this._getExtractionSelectors(s),{strict:i=!1}=r;if(!n.length)return o.trim();let a=n.map((c,d)=>{let p=String(c||"").trim(),b=p.startsWith("regex:");return{id:`tool-extract-${d}`,type:b?"regex_include":"include",value:b?p.slice(6).trim():p,enabled:!0}}).filter(c=>c.value),l=at(o,a,[]);return i?(l||"").trim():l||o.trim()}_extractToolContent(e,s){let r=typeof s=="string"?s:String(s||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(r,e,{strict:!0}):r.trim()}_applyGlobalContextRules(e){let s=typeof e=="string"?e:String(e||"");if(!s.trim())return"";try{let r=Ue()||[],o=lt()||[];return!Array.isArray(r)||r.length===0?s.trim():at(s,r,o)||s.trim()}catch(r){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",r),s.trim()}}_getMessageText(e){if(!e)return"";let s=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let r of s)if(typeof r=="string"&&r.trim())return r.trim();return""}_collectRecentAssistantMessages(e,s){return this._collectRecentAssistantMessageEntries(e,s).map(r=>r.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,s){let r=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),o=Array.isArray(s?.chatMessages)?s.chatMessages:[],n=[];for(let a=o.length-1;a>=0&&n.length<r;a-=1){let l=o[a],c=String(l?.role||"").toLowerCase(),d=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,p=this._getMessageText(l);d&&p&&n.unshift({text:p,message:l,chatIndex:a})}if(n.length>0)return n;let i=s?.lastAiMessage||s?.input?.lastAiMessage||"";return i?[{text:i,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,s){return this._collectRecentAssistantMessageEntries(e,s).map((o,n)=>{let i=o.text||"",a=this._applyGlobalContextRules(i),l=this._extractToolContent(e,i);return{...o,order:n+1,rawText:i,filteredText:a,extractedText:l}})}_joinMessageBlocks(e,s,r={}){let o=Array.isArray(e)?e:[],{skipEmpty:n=!1}=r;return o.map(a=>{let l=String(a?.[s]||"").trim();return n&&!l?"":`${`\u3010\u7B2C ${a?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(o=>{let n=`\u3010\u7B2C ${o?.order||0} \u6761 AI \u6D88\u606F\u3011`,i=String(o?.filteredText||"").trim()||"(\u7A7A)",a=String(o?.extractedText||"").trim()||"(\u7A7A)";return`${n}
\u6B63\u6587\uFF1A
${i}

\u5DE5\u5177\uFF1A
${a}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(e){this.debugMode=e}_log(...e){(this.debugMode||Te.getDebugSettings()?.enableDebugLog)&&console.log("[ToolOutputService]",...e)}},kt=new js,Pa=kt});var wn={};J(wn,{AUTO_TRIGGER_SKIP_REASONS:()=>Ge,EVENT_TYPES:()=>Z,TOOL_EXECUTION_PATHS:()=>It,checkGate:()=>Qr,destroyToolTriggerManager:()=>Ka,getChatContext:()=>Zr,getCurrentCharacter:()=>eo,getFullContext:()=>Ba,getToolTriggerManagerState:()=>Va,getWorldbookContent:()=>bn,initToolTriggerManager:()=>xn,initTriggerModule:()=>Tn,previewToolExtraction:()=>ro,registerEventListener:()=>Xe,registerTriggerHandler:()=>ja,removeAllListeners:()=>Ua,removeAllTriggerHandlers:()=>Ya,resetGateState:()=>za,runToolManually:()=>so,setDebugMode:()=>Ja,setTriggerHandlerEnabled:()=>Ga,triggerState:()=>B,unregisterEventListener:()=>Fs,updateGateState:()=>Qt});function Qe(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Kr(t){if(!t)return"";let e=[t.mes,t.message,t.content,t.text,t?.data?.content];for(let s of e)if(typeof s=="string"&&s.trim())return s;return""}function Ma(t){return new Promise(e=>setTimeout(e,t))}function Ca(t,e){let s=[t?.message_id,t?.messageId,t?.id,t?.mes_id,e];for(let r of s){if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"&&r.trim())return r.trim()}return e}function ka(t){let e=String(t||"").trim();return!(!e||e.length<5||/^[.。·•…\s]+$/.test(e))}function Ia(t,e=null){let r=(Array.isArray(t)?t:[]).map((a,l)=>({role:fn(a),content:Kr(a),name:a?.name||"",timestamp:a?.send_date||a?.timestamp||"",isSystem:!!a?.is_system,isUser:!!a?.is_user,sourceId:Ca(a,l),chatIndex:l,originalMessage:a})),o=e==null||e===""?null:String(e).trim(),n=null,i=null;for(let a=r.length-1;a>=0;a-=1){let l=r[a];if(!n&&l.role==="assistant"&&ka(l.content)&&(!o||String(l.sourceId).trim()===o||l.chatIndex===Number(o)?n=l:n||(n=l)),!i&&l.role==="user"&&l.content&&(i=l),n&&i)break}return{messages:r,lastUserMessage:i,lastAiMessage:n}}async function Ra(t={}){let{preferredMessageId:e=null,retries:s=0,retryDelayMs:r=250}=t,o={messages:[],lastUserMessage:null,lastAiMessage:null};for(let n=0;n<=s;n+=1){let i=await mn();if(o=Ia(i,e),o.lastAiMessage?.content)return o;n<s&&await Ma(r)}return o}function Gs(){Qt({lastUserSendIntentAt:Date.now()})}function $a(){let t=Qe(),e=t?.document;if(!e?.body)return!1;if(t.__YYT_sendIntentHooksInstalled)return!0;let s=["#send_but","#option_send","#send_button",'button[title*="\u53D1\u9001"]','button[title*="Send"]'],r=["#send_textarea","#send_textarea textarea","textarea#send_textarea",'textarea[data-testid="send_textarea"]'],o=(n,i,a)=>{n.forEach(l=>{let c=e.querySelector(l);c&&c.addEventListener(i,a,!0)})};return o(s,"click",()=>Gs()),o(s,"pointerup",()=>Gs()),o(s,"touchend",()=>Gs()),o(r,"keydown",n=>{let i=n?.key||"";(i==="Enter"||i==="NumpadEnter")&&!n.shiftKey&&Gs()}),t.__YYT_sendIntentHooksInstalled=!0,C("\u5DF2\u5B89\u88C5\u53D1\u9001\u610F\u56FE\u6355\u83B7\u94A9\u5B50"),!0}function Da(t,e={},s=!1){return s?!0:String(t||e?.type||"").trim().toLowerCase().includes("quiet")||e?.quiet===!0||e?.isQuiet===!0||e?.quiet_prompt===!0}function Rt(){return Qe().SillyTavern||null}function Oa(){return Qe().TavernHelper||null}function Jr(){let e=Qe().SillyTavern;return e&&e.eventSource?e.eventSource:null}function Xr(){let e=Qe().SillyTavern;return e&&e.eventTypes?e.eventTypes:Z}function C(...t){(B.debugMode||Te.getDebugSettings()?.enableDebugLog)&&console.log("[YouYouToolkit:Trigger]",...t)}function La(t={}){return{triggerEvent:"",messageId:"",messageKey:"",selectedToolIds:[],skipReason:"",lockedAiMessageId:"",triggeredAt:Date.now(),...t}}function Xt(t={}){let e=La(t);return Y.lastAutoTriggerSnapshot=e,C("\u81EA\u52A8\u89E6\u53D1\u5FEB\u7167:",e),e}function qr(t,e){(Array.isArray(t)?t:[]).forEach(r=>{r?.id&&At(r.id,{lastTriggerAt:Date.now(),...e},{touchLastRunAt:!1,emitEvent:!1})})}function Na(t,e,s){let o=[e?.chatId,e?.chat_id,e?.chat_filename,e?.chatMetadata?.chatId,e?.chatMetadata?.chat_id,e?.chatMetadata?.file_name,e?.chatMetadata?.name,t?.chatId,t?.chat_id,t?.chat_filename].find(n=>typeof n=="string"&&n.trim());return o||(s?.id!==void 0&&s?.id!==null?`chat_char_${s.id}`:t?.this_chid!==void 0&&t?.this_chid!==null?`chat_char_${t.this_chid}`:"chat_default")}function Xe(t,e,s={}){if(!t||typeof e!="function")return C("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u51FD\u6570"),()=>{};let{once:r=!1,priority:o=0}=s,n=Jr(),a=Xr()[t]||t,l=async(...c)=>{try{if(s.gateCheck&&!await Qr(s.gateCheck)){C(`\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6: ${t}`);return}await e(...c),r&&Fs(t,l)}catch(d){console.error("[YouYouToolkit:Trigger] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF:",d)}};if(B.listeners.has(t)||B.listeners.set(t,new Set),B.listeners.get(t).add(l),n&&typeof n.on=="function")n.on(a,l),C(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`);else{let c=Qe();c.addEventListener&&(c.addEventListener(a,l),C(`\u5DF2\u6CE8\u518CDOM\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`))}return()=>Fs(t,l)}function Fs(t,e){let s=B.listeners.get(t);if(s&&s.has(e)){s.delete(e);let r=Jr(),n=Xr()[t]||t;if(r&&typeof r.off=="function")r.off(n,e),C(`\u5DF2\u53D6\u6D88\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`);else{let i=Qe();i.removeEventListener&&i.removeEventListener(n,e)}}}function Ua(){let t=Jr(),e=Xr();for(let[s,r]of B.listeners){let o=e[s]||s;for(let n of r)if(t&&typeof t.off=="function")t.off(o,n);else{let i=Qe();i.removeEventListener&&i.removeEventListener(o,n)}}B.listeners.clear(),C("\u5DF2\u79FB\u9664\u6240\u6709\u4E8B\u4EF6\u76D1\u542C\u5668")}async function Qr(t){if(!t)return!0;let e=Date.now(),s=B.gateState;if(t.minInterval&&s.lastGenerationAt&&e-s.lastGenerationAt<t.minInterval)return C("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u77ED"),!1;if(t.maxInterval&&s.lastUserMessageAt&&e-s.lastUserMessageAt>t.maxInterval)return C("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u957F"),!1;if(t.requireUserMessage&&!s.lastUserMessageId)return C("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u7F3A\u5C11\u7528\u6237\u6D88\u606F"),!1;if(t.excludeQuietGeneration&&s.lastGenerationType==="quiet")return C("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: quiet\u751F\u6210\u88AB\u6392\u9664"),!1;if(t.customCheck&&typeof t.customCheck=="function")try{if(!await t.customCheck(s))return C("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u81EA\u5B9A\u4E49\u68C0\u67E5\u8FD4\u56DEfalse"),!1}catch(r){return console.error("[YouYouToolkit:Trigger] \u81EA\u5B9A\u4E49\u95E8\u63A7\u68C0\u67E5\u9519\u8BEF:",r),!1}return!0}function Qt(t){Object.assign(B.gateState,t)}function za(){B.gateState={lastUserSendIntentAt:0,lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationType:null,lastGenerationParams:null,lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1}}async function Zr(t={}){let{depth:e=3,includeUser:s=!0,includeAssistant:r=!0,includeSystem:o=!1,format:n="messages"}=t;if(!Rt())return C("\u65E0\u6CD5\u83B7\u53D6SillyTavern API"),null;try{let a=await mn(),l=[],c=Math.max(0,a.length-e);for(let d=c;d<a.length;d++){let p=a[d];if(!p)continue;let b=fn(p);if(!(b==="user"&&!s)&&!(b==="system"&&!o)&&!(b==="assistant"&&!r))if(n==="messages"){let f=Kr(p);l.push({role:b,content:f,name:p.name||"",timestamp:p.send_date||p.timestamp,isSystem:!!p.is_system,isUser:!!p.is_user})}else l.push(Kr(p))}return{messages:l,totalMessages:a.length,startIndex:c,endIndex:a.length-1}}catch(a){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u804A\u5929\u4E0A\u4E0B\u6587\u5931\u8D25:",a),null}}function fn(t){if(!t)return"assistant";if(t.is_user)return"user";if(t.is_system)return"system";let e=String(t.role||"").toLowerCase();return e==="user"||e==="assistant"||e==="system"?e:"assistant"}async function mn(){let t=Oa(),e=Rt();if(t?.getChatMessages)try{let s=-1;if(typeof t.getLastMessageId=="function"&&(s=t.getLastMessageId()),!Number.isFinite(s)||s<0){let r=e?.getContext?.()||null,o=Array.isArray(r?.chat)?r.chat:[],n=Array.isArray(e?.chat)?e.chat:[];s=(o.length?o:n).length-1}if(Number.isFinite(s)&&s>=0){let r=await t.getChatMessages(`0-${s}`,{include_swipes:!1,include_hidden:!0});if(Array.isArray(r)&&r.length>0)return r}}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 TavernHelper \u8BFB\u53D6\u804A\u5929\u6D88\u606F\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u9ED8\u8BA4\u6765\u6E90:",s)}try{let s=e?.getContext?.()||null;if(Array.isArray(s?.chat)&&s.chat.length>0)return s.chat}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 getContext() \u8BFB\u53D6\u804A\u5929\u5931\u8D25:",s)}return Array.isArray(e?.chat)?e.chat:[]}async function eo(){let t=Rt();if(!t)return null;try{let e=t.this_chid,s=t.characters||[];if(e>=0&&e<s.length){let r=s[e];return{id:e,name:r.name||"",description:r.description||"",personality:r.personality||"",scenario:r.scenario||"",firstMes:r.first_mes||"",mesExample:r.mes_example||""}}return null}catch(e){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e),null}}async function bn(t={}){let{enabledOnly:e=!0,maxLength:s=1e4}=t,r=Rt();if(!r)return"";try{let n=(r.lorebook||[]).entries||[],i=[],a=0;for(let l of n){if(e&&!l.enabled)continue;let c=l.content||"";c&&a+c.length<=s&&(i.push(c),a+=c.length)}return i.join(`

`)}catch(o){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u5931\u8D25:",o),""}}async function Ba(t={}){let[e,s,r]=await Promise.all([Zr(t.chat||{}),eo(),bn(t.worldbook||{})]);return{chat:e,character:s,worldbook:r,timestamp:Date.now()}}function ja(t,e){if(!t||!e)return C("\u65E0\u6548\u7684\u5904\u7406\u5668ID\u6216\u914D\u7F6E"),()=>{};let{eventType:s,handler:r,gateCondition:o,priority:n=0}=e;if(!s||typeof r!="function")return C("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u5904\u7406\u5668\u51FD\u6570"),()=>{};B.handlers.set(t,{eventType:s,handler:r,gateCondition:o,priority:n,enabled:!0});let i=Xe(s,async(...a)=>{let l=B.handlers.get(t);!l||!l.enabled||l.gateCondition&&!await Qr(l.gateCondition)||await l.handler(...a)},{priority:n});return C(`\u5DF2\u6CE8\u518C\u89E6\u53D1\u5904\u7406\u5668: ${t}`),()=>{i(),B.handlers.delete(t),C(`\u5DF2\u53D6\u6D88\u89E6\u53D1\u5904\u7406\u5668: ${t}`)}}function Ga(t,e){let s=B.handlers.get(t);s&&(s.enabled=e,C(`\u89E6\u53D1\u5904\u7406\u5668 ${t} \u5DF2${e?"\u542F\u7528":"\u7981\u7528"}`))}function Ya(){B.handlers.clear(),C("\u5DF2\u79FB\u9664\u6240\u6709\u89E6\u53D1\u5904\u7406\u5668")}function gn(t,e,s=0){let r=`${t}::${typeof e=="object"?e?.messageId||e?.id||"latest":String(e??"latest")}`,o=Y.pendingMessageTimers.get(r);o&&clearTimeout(o);let n=setTimeout(async()=>{Y.pendingMessageTimers.delete(r),await hn(t,e)},s);Y.pendingMessageTimers.set(r,n)}function Vr(t){let e=t?.chatId||"chat_default",s=t?.messageId===void 0||t?.messageId===null||t?.messageId===""?"latest":String(t.messageId);return`${e}::${s}`}function Fa(t,e){return e?.triggerEvent==="MANUAL"?t.output?.mode===Je.POST_RESPONSE_API?It.MANUAL_POST_RESPONSE_API:It.MANUAL_COMPATIBILITY:It.AUTO_POST_RESPONSE_API}async function hn(t,e){C(`${t}\u89E6\u53D1:`,e);let s=qa(Z.GENERATION_ENDED),r=s.map(a=>a.id);if(Da(B.gateState.lastGenerationType,B.gateState.lastGenerationParams,B.gateState.lastGenerationDryRun)){C("\u68C0\u6D4B\u5230 quiet / dryRun \u751F\u6210\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u81EA\u52A8\u6267\u884C"),Xt({triggerEvent:t,selectedToolIds:r,skipReason:Ge.QUIET_GENERATION}),qr(s,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:Ge.QUIET_GENERATION,lastExecutionPath:"",lastWritebackStatus:ce.NOT_APPLICABLE,lastFailureStage:""});return}let o=await to({...typeof e=="object"&&e?e:{},triggerEvent:t,messageId:typeof e=="string"||typeof e=="number"?e:e?.messageId||e?.id||""});if(!o?.lastAiMessage){C(`${t} \u540E\u672A\u8BFB\u53D6\u5230\u6700\u65B0 AI \u56DE\u590D\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u6267\u884C`);let a=Vr(o||{});Xt({triggerEvent:t,messageId:o?.messageId||"",messageKey:a,selectedToolIds:r,skipReason:Ge.MISSING_AI_MESSAGE,lockedAiMessageId:o?.messageId||""}),qr(s,{lastTriggerEvent:t,lastMessageKey:a,lastSkipReason:Ge.MISSING_AI_MESSAGE,lastExecutionPath:"",lastWritebackStatus:ce.NOT_APPLICABLE,lastFailureStage:""});return}let n=Vr(o);if(Y.lastHandledMessageKey===n){C(`\u68C0\u6D4B\u5230\u91CD\u590D\u81EA\u52A8\u89E6\u53D1\uFF0C\u8DF3\u8FC7: ${n}`),Xt({triggerEvent:t,messageId:o?.messageId||"",messageKey:n,selectedToolIds:r,skipReason:Ge.DUPLICATE_MESSAGE,lockedAiMessageId:o?.messageId||""}),qr(s,{lastTriggerEvent:t,lastMessageKey:n,lastSkipReason:Ge.DUPLICATE_MESSAGE,lastExecutionPath:"",lastWritebackStatus:ce.NOT_APPLICABLE,lastFailureStage:""});return}let i=s;if(i.length===0){C("\u6CA1\u6709\u9700\u8981\u6267\u884C\u7684\u5DE5\u5177"),Xt({triggerEvent:t,messageId:o?.messageId||"",messageKey:n,selectedToolIds:[],skipReason:Ge.NO_ELIGIBLE_TOOLS,lockedAiMessageId:o?.messageId||""});return}Y.lastHandledMessageKey=n,o.messageKey=n,Xt({triggerEvent:t,messageId:o?.messageId||"",messageKey:n,selectedToolIds:i.map(a=>a.id),skipReason:"",lockedAiMessageId:o?.messageId||""}),C(`\u9700\u8981\u6267\u884C ${i.length} \u4E2A\u5DE5\u5177:`,i.map(a=>a.id)),Pe("info",`\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u5F00\u59CB\u81EA\u52A8\u6267\u884C ${i.length} \u4E2A\u5DE5\u5177`,{duration:2400,noticeId:"yyt-tool-batch-start"});for(let a of i)try{let l=await vn(a,o);l.success?(C(`\u5DE5\u5177 ${a.id} \u6267\u884C\u6210\u529F`),E.emit(w.TOOL_EXECUTED,{toolId:a.id,result:l.result||l.data||l})):C(`\u5DE5\u5177 ${a.id} \u6267\u884C\u5931\u8D25:`,l.error)}catch(l){console.error(`[ToolTrigger] \u5DE5\u5177\u6267\u884C\u5931\u8D25: ${a.id}`,l)}Y.lastExecutionContext=o}async function Ha(t,e,s){return s||t.output?.mode===Je.POST_RESPONSE_API?kt.runToolPostResponse(t,e):Ds(t.id,e)}function xn(){if(Y.initialized){C("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316");return}Wa(),Y.initialized=!0,C("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316"),E.emit(w.TOOL_TRIGGER_INITIALIZED)}function Wa(){let t=Xe(Z.GENERATION_ENDED,async r=>{await hn(Z.GENERATION_ENDED,r)}),e=Xe(Z.GENERATION_AFTER_COMMANDS,async r=>{gn(Z.GENERATION_AFTER_COMMANDS,r,180)}),s=Xe(Z.MESSAGE_RECEIVED,async r=>{gn(Z.MESSAGE_RECEIVED,r,420)});Y.listeners.set(Z.GENERATION_ENDED,t),Y.listeners.set(Z.GENERATION_AFTER_COMMANDS,e),Y.listeners.set(Z.MESSAGE_RECEIVED,s)}async function to(t){let e=await eo(),s=Rt(),r=s?.getContext?.()||null,o=typeof t=="string"||typeof t=="number"?t:t?.messageId||t?.id||"",n=t?.triggerEvent||"GENERATION_ENDED",i=await Ra({preferredMessageId:o,retries:n==="MANUAL"||n==="MANUAL_PREVIEW"?2:8,retryDelayMs:n==="MANUAL"||n==="MANUAL_PREVIEW"?120:260}),a=i.messages||[],l=i.lastUserMessage,c=i.lastAiMessage,d=c?.sourceId??o??"";return{triggeredAt:Date.now(),triggerEvent:n,chatId:Na(s,r,e),messageId:d,lastAiMessage:c?.content||"",userMessage:l?.content||B.gateState.lastUserMessageText||"",chatMessages:a,input:{userMessage:l?.content||B.gateState.lastUserMessageText||"",lastAiMessage:c?.content||"",extractedContent:"",previousToolOutput:"",context:{character:e?.name||"",chatLength:a.length||0}},config:{},status:"pending"}}function qa(t){return jr(t).filter(s=>kt.shouldRunPostResponse(s))}function Ys(t,e){try{Dr(t,e)}catch(s){console.warn("[ToolTrigger] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",t,s)}}async function vn(t,e){let s=Date.now(),r=t.id,o=e?.triggerEvent==="MANUAL",n=`yyt-tool-run-${r}`,i=Fa(t,e),a=e?.messageKey||Vr(e||{});Ys(r,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||Z.GENERATION_ENDED,lastMessageKey:a,lastSkipReason:"",lastExecutionPath:i,lastWritebackStatus:"",lastFailureStage:""}),E.emit(w.TOOL_EXECUTION_REQUESTED,{toolId:r,triggerEvent:e?.triggerEvent||"GENERATION_ENDED",context:e}),Pe("info",`${o?"\u6B63\u5728\u624B\u52A8\u6267\u884C":"\u5DF2\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u6B63\u5728\u81EA\u52A8\u6267\u884C"} ${t.name}`,{sticky:!0,noticeId:n});try{let l=await Ha(t,e,o),c=Date.now()-s;if(l?.success){let b=K(r);Ys(r,{lastStatus:"success",lastError:"",lastDurationMs:c,successCount:(b?.runtime?.successCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||Z.GENERATION_ENDED,lastMessageKey:a,lastSkipReason:"",lastExecutionPath:i,lastWritebackStatus:l?.meta?.writebackStatus||ce.NOT_APPLICABLE,lastFailureStage:l?.meta?.failureStage||""});let f=o?`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`:`\u5DF2\u76D1\u542C AI \u56DE\u590D\u5E76\u6267\u884C ${t.name}`;return y("success",f),Pe("success",f,{duration:3200,noticeId:n}),{success:!0,duration:c,result:l}}let d=K(r),p=l?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25";return Ys(r,{lastStatus:"error",lastError:p,lastDurationMs:c,errorCount:(d?.runtime?.errorCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||Z.GENERATION_ENDED,lastMessageKey:a,lastSkipReason:"",lastExecutionPath:i,lastWritebackStatus:l?.meta?.writebackStatus||ce.NOT_APPLICABLE,lastFailureStage:l?.meta?.failureStage||(i===It.MANUAL_COMPATIBILITY?we.COMPATIBILITY_EXECUTE:we.UNKNOWN)}),y("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${p}`),Pe("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${p}`,{sticky:!0,noticeId:n}),{success:!1,duration:c,error:p,result:l}}catch(l){let c=Date.now()-s,d=K(r),p=l?.message||String(l);throw Ys(r,{lastStatus:"error",lastError:p,lastDurationMs:c,errorCount:(d?.runtime?.errorCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||Z.GENERATION_ENDED,lastMessageKey:a,lastSkipReason:"",lastExecutionPath:i,lastWritebackStatus:ce.NOT_APPLICABLE,lastFailureStage:i===It.MANUAL_COMPATIBILITY?we.COMPATIBILITY_EXECUTE:we.UNKNOWN}),y("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${p}`),Pe("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${p}`,{sticky:!0,noticeId:n}),l}}async function so(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=K(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return At(t,{lastTriggerAt:Date.now(),lastTriggerEvent:"MANUAL",lastMessageKey:"",lastSkipReason:Ge.TOOL_DISABLED,lastExecutionPath:"",lastWritebackStatus:ce.NOT_APPLICABLE,lastFailureStage:""},{touchLastRunAt:!1,emitEvent:!1}),Pe("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let s=await to({triggerEvent:"MANUAL"});return vn(e,s)}async function ro(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=K(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await to({triggerEvent:"MANUAL_PREVIEW"});return kt.previewExtraction(e,s)}function Ka(){for(let t of Y.pendingMessageTimers.values())clearTimeout(t);Y.pendingMessageTimers.clear();for(let[t,e]of Y.listeners)Fs(t,e);Y.listeners.clear(),Y.initialized=!1,Y.lastExecutionContext=null,Y.lastHandledMessageKey="",Y.lastAutoTriggerSnapshot=null,C("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u9500\u6BC1")}function Va(){return{initialized:Y.initialized,listenersCount:Y.listeners.size,lastExecutionContext:Y.lastExecutionContext,lastAutoTriggerSnapshot:Y.lastAutoTriggerSnapshot}}async function Tn(){if(B.isInitialized){C("\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316");return}if(!Rt()){C("\u65E0\u6CD5\u83B7\u53D6SillyTavern API\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),setTimeout(Tn,1e3);return}$a(),Xe(Z.MESSAGE_SENT,async e=>{let r=(await Zr({depth:10,includeAssistant:!1,includeSystem:!1}))?.messages?.filter(o=>o.role==="user").pop();Qt({lastUserSendIntentAt:Date.now(),lastUserMessageId:e,lastUserMessageAt:Date.now(),lastUserMessageText:r?.content||B.gateState.lastUserMessageText||""}),C(`\u7528\u6237\u6D88\u606F\u5DF2\u53D1\u9001: ${e}`)}),Xe(Z.GENERATION_STARTED,(e,s,r)=>{Qt({lastGenerationType:e,lastGenerationParams:s||null,lastGenerationDryRun:!!r,isGenerating:!0}),C(`\u751F\u6210\u5F00\u59CB: ${e}`)}),Xe(Z.GENERATION_ENDED,()=>{Qt({lastGenerationAt:Date.now(),isGenerating:!1}),C("\u751F\u6210\u7ED3\u675F")}),xn(),B.isInitialized=!0,C("\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function Ja(t){B.debugMode=t}var Z,B,Ge,It,Y,oo=D(()=>{re();Vt();Pt();Gr();Wr();Me();Z={MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHARACTER_LOADED:"CHARACTER_LOADED",CHARACTER_DELETED:"CHARACTER_DELETED",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",WORLDBOOK_UPDATED:"WORLDBOOK_UPDATED",EXTENSIONS_LOADED:"EXTENSIONS_LOADED",SETTINGS_LOADED:"SETTINGS_LOADED"},B={listeners:new Map,handlers:new Map,gateState:{lastUserSendIntentAt:0,lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationType:null,lastGenerationParams:null,lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1},isInitialized:!1,debugMode:!1},Ge={QUIET_GENERATION:"quiet_generation",MISSING_AI_MESSAGE:"missing_ai_message",DUPLICATE_MESSAGE:"duplicate_message",NO_ELIGIBLE_TOOLS:"no_eligible_tools",TOOL_DISABLED:"tool_disabled"},It={AUTO_POST_RESPONSE_API:"auto_post_response_api",MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_COMPATIBILITY:"manual_compatibility"};Y={initialized:!1,listeners:new Map,lastExecutionContext:null,lastHandledMessageKey:"",pendingMessageTimers:new Map,lastAutoTriggerSnapshot:null}});var Sn={};J(Sn,{TOOL_CONFIG_PANEL_STYLES:()=>En,createToolConfigPanel:()=>Ze,default:()=>Xa});function Ze(t){let{id:e,toolId:s,postResponseHint:r,extractionPlaceholder:o,previewDialogId:n,previewTitle:i="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:s,render(){let a=K(this.toolId);if(!a)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let l=this._getApiPresets(),c=a.output?.apiPreset||a.apiPreset||"",d=this._getBypassPresets(),p=a.output?.mode||"follow_ai",b=a.bypass?.enabled||!1,f=a.bypass?.presetId||"",M=a.runtime?.lastStatus||"idle",ee=a.runtime?.lastRunAt?new Date(a.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",O=a.runtime?.lastError||"",te=a.extraction||{},se=Array.isArray(te.selectors)?te.selectors.join(`
`):"",V=p==="post_response_api"?r:"\u968F AI \u8F93\u51FA\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002",v=this._buildDiagnosticsHtml(a.runtime||{});return`
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
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${V}</div>
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
                <input type="number" class="yyt-input" id="${u}-tool-max-messages" min="1" max="50" value="${Number(te.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${u}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${x(o)}">${x(se)}</textarea>
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
                        placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${x(a.promptTemplate||"")}</textarea>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${x(M)}">${x(M)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${x(ee)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${a.runtime?.successCount||0} / ${a.runtime?.errorCount||0}</span>
                </div>
                ${O?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${x(O)}</span>
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
      `},_formatDiagnosticValue(a,l="\u672A\u8BB0\u5F55"){let c=String(a||"").trim();return x(c||l)},_formatDiagnosticTime(a){let l=Number(a)||0;return l>0?new Date(l).toLocaleString():"\u672A\u8BB0\u5F55"},_formatSkipReason(a){return{quiet_generation:"\u5DF2\u8DF3\u8FC7\uFF1Aquiet / dryRun \u751F\u6210",missing_ai_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u672A\u8BFB\u53D6\u5230\u6709\u6548 AI \u56DE\u590D",duplicate_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u547D\u4E2D\u81EA\u52A8\u53BB\u91CD",no_eligible_tools:"\u5DF2\u8DF3\u8FC7\uFF1A\u6CA1\u6709\u547D\u4E2D\u53EF\u6267\u884C\u5DE5\u5177",tool_disabled:"\u5DF2\u8DF3\u8FC7\uFF1A\u5DE5\u5177\u672A\u542F\u7528"}[a]||a||"\u65E0"},_formatExecutionPath(a){return{auto_post_response_api:"\u81EA\u52A8\u94FE\uFF1Apost_response_api",manual_post_response_api:"\u624B\u52A8\u94FE\uFF1Apost_response_api",manual_compatibility:"\u624B\u52A8\u94FE\uFF1Acompatibility \u56DE\u9000"}[a]||a||"\u672A\u8BB0\u5F55"},_formatWritebackStatus(a){return{success:"\u5199\u56DE\u6210\u529F",failed:"\u5199\u56DE\u5931\u8D25",skipped_empty_output:"\u65E0\u8F93\u51FA\uFF0C\u8DF3\u8FC7\u5199\u56DE",not_applicable:"\u4E0D\u9002\u7528"}[a]||a||"\u672A\u8BB0\u5F55"},_formatFailureStage(a){return{build_messages:"\u6784\u9020\u8BF7\u6C42\u6D88\u606F",send_api_request:"\u53D1\u9001 API \u8BF7\u6C42",extract_output:"\u63D0\u53D6\u5DE5\u5177\u8F93\u51FA",inject_context:"\u5199\u56DE\u4E0A\u4E0B\u6587",compatibility_execute:"\u517C\u5BB9\u6267\u884C\u5165\u53E3",unknown:"\u672A\u77E5\u9636\u6BB5"}[a]||a||"\u65E0"},_buildDiagnosticsHtml(a){let l=a||{};return!(l.lastTriggerAt||l.lastTriggerEvent||l.lastMessageKey||l.lastSkipReason||l.lastExecutionPath||l.lastWritebackStatus||l.lastFailureStage)?"":`
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
      `},_getApiPresets(){try{return vt()||[]}catch{return[]}},_getBypassPresets(){try{return Ur()||[]}catch{return[]}},_getFormData(a){let l=K(this.toolId),c=a.find(`#${u}-tool-output-mode`).val()||"follow_ai",d=a.find(`#${u}-tool-bypass-enabled`).is(":checked"),p=c==="post_response_api",b=(a.find(`#${u}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(f=>f.trim()).filter(Boolean);return{enabled:l?.enabled!==!1,promptTemplate:a.find(`#${u}-tool-prompt-template`).val()||"",apiPreset:a.find(`#${u}-tool-api-preset`).val()||"",extractTags:b,trigger:{event:"GENERATION_ENDED",enabled:p},output:{mode:c,apiPreset:a.find(`#${u}-tool-api-preset`).val()||"",overwrite:!0,enabled:p},bypass:{enabled:d,presetId:d&&a.find(`#${u}-tool-bypass-preset`).val()||""},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(a.find(`#${u}-tool-max-messages`).val(),10)||5),selectors:b}}},_showExtractionPreview(a,l){if(!L())return;let d=`${u}-${n}`,p=Array.isArray(l.messageEntries)?l.messageEntries:[],b=p.length>0?`
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
        `:"";a.append(yr({id:d,title:i,width:"720px",wide:!0,body:`
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
        `})),gr(a,d,{onSave:f=>f()}),a.find(`#${d}-save`).text("\u5173\u95ED"),a.find(`#${d}-cancel`).remove()},bindEvents(a){let l=L();!l||!U(a)||(a.find(`#${u}-tool-output-mode`).on("change",()=>{let d=(a.find(`#${u}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?r:"\u968F AI \u8F93\u51FA\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002";a.find(".yyt-tool-mode-hint").text(d)}),a.find(`#${u}-tool-bypass-enabled`).on("change",c=>{let d=l(c.currentTarget).is(":checked");a.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!d)}),a.find(`#${u}-tool-save`).on("click",()=>{this._saveConfig(a,{silent:!1})}),a.find(`#${u}-tool-reset-template`).on("click",()=>{let c=Ms(this.toolId);c?.promptTemplate&&(a.find(`#${u}-tool-prompt-template`).val(c.promptTemplate),y("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),a.find(`#${u}-tool-run-manual`).on("click",async()=>{if(this._saveConfig(a,{silent:!0}))try{let d=await so(this.toolId);!d?.success&&d?.error&&Pe("warning",d.error,{duration:3200,noticeId:`yyt-tool-run-${this.toolId}`})}catch(d){y("error",d?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{this.renderTo(a)}}),a.find(`#${u}-tool-preview-extraction`).on("click",async()=>{if(this._saveConfig(a,{silent:!0}))try{let d=await ro(this.toolId);if(!d?.success){y("error",d?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}this._showExtractionPreview(a,d)}catch(d){y("error",d?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}))},_saveConfig(a,l={}){let c=this._getFormData(a),{silent:d=!1}=l,p=ze(this.toolId,c);return p?d||y("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):y("error","\u4FDD\u5B58\u5931\u8D25"),p},destroy(a){!L()||!U(a)||a.find("*").off()},getStyles(){return En},renderTo(a){a.html(this.render({})),this.bindEvents(a,{})}}}var En,Xa,Zt=D(()=>{Me();Pt();ps();qt();oo();En=`
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
`;Xa=Ze});var Ee,no=D(()=>{Zt();Ee=Ze({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var Se,io=D(()=>{Zt();Se=Ze({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var _e,ao=D(()=>{Zt();_e=Ze({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"})});var pt,lo=D(()=>{re();qt();Me();pt={id:"bypassPanel",render(t){let e=I.getPresetList(),s=I.getDefaultPresetId();return`
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
    `},_renderPresetItem(t,e){let s=je&&je[t.id];return`
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
      `;let e=I.getDefaultPresetId()===t.id,s=je&&je[t.id];return`
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
    `},bindEvents(t,e){let s=L();!s||!U(t)||(this._bindPresetListEvents(t,s),this._bindEditorEvents(t,s),this._bindFileEvents(t,s))},_bindPresetListEvents(t,e){t.on("click",".yyt-bypass-preset-item",s=>{if(e(s.target).closest(".yyt-bypass-quick-delete").length)return;let r=e(s.currentTarget).data("presetId");this._selectPreset(t,e,r)}),t.on("click",".yyt-bypass-quick-delete",s=>{s.stopPropagation();let r=e(s.currentTarget).data("presetId");if(!r||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let o=I.deletePreset(r);o.success?(t.find(".yyt-bypass-editor-content").data("presetId")===r&&t.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),y("success","\u9884\u8BBE\u5DF2\u5220\u9664")):y("error",o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.find("#yyt-bypass-add").on("click",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click",".yyt-bypass-delete-message",s=>{let r=e(s.currentTarget).closest(".yyt-bypass-message"),o=r.data("messageId");r.remove()}),t.on("change",".yyt-bypass-message-enabled",s=>{e(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(s.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.find("#yyt-bypass-import").on("click",()=>{t.find("#yyt-bypass-import-file").click()}),t.find("#yyt-bypass-import-file").on("change",async s=>{let r=s.target.files[0];if(r){try{let o=await Ne(r),n=I.importPresets(o);y(n.success?"success":"error",n.message),n.success&&this.renderTo(t)}catch(o){y("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.find("#yyt-bypass-export").on("click",()=>{try{let s=I.exportPresets();Le(s,`bypass_presets_${Date.now()}.json`),y("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){y("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(t,e,s){let r=I.getPreset(s);r&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),t.find("#yyt-bypass-editor").html(this._renderEditor(r)))},_createNewPreset(t,e){let s=`bypass_${Date.now()}`,r=I.createPreset({id:s,name:"\u65B0\u7834\u9650\u8BCD\u9884\u8BBE",description:"",messages:[]});r.success?(this.renderTo(t),this._selectPreset(t,e,s),y("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):y("error",r?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content"),r=s.data("presetId");if(!r)return;let o=s.find(".yyt-bypass-name-input").val().trim(),n=s.find("#yyt-bypass-description").val().trim();if(!o){y("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let i=[];s.find(".yyt-bypass-message").each(function(){let l=e(this);i.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let a=I.updatePreset(r,{name:o,description:n,messages:i});a.success?(y("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):y("error",a?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let o=I.deletePreset(r);o.success?(this.renderTo(t),y("success","\u9884\u8BBE\u5DF2\u5220\u9664")):y("error",o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r)return;let o=`bypass_${Date.now()}`,n=I.duplicatePreset(r,o);n.success?(this.renderTo(t),this._selectPreset(t,e,o),y("success","\u9884\u8BBE\u5DF2\u590D\u5236")):y("error",n?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");r&&(I.setDefaultPresetId(r),t.find(".yyt-bypass-preset-item").removeClass("yyt-default"),t.find(`.yyt-bypass-preset-item[data-preset-id="${r}"]`).addClass("yyt-default"),t.find(".yyt-bypass-default-badge").remove(),t.find(`.yyt-bypass-preset-item[data-preset-id="${r}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>'),y("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE"))},_addMessage(t,e){let s=t.find("#yyt-bypass-messages"),r={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};s.append(this._renderMessageItem(r))},_refreshPresetList(t,e){let s=I.getPresetList(),r=I.getDefaultPresetId();t.find(".yyt-bypass-preset-list").html(s.map(o=>this._renderPresetItem(o,o.id===r)).join(""))},destroy(t){!L()||!U(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Pn={};J(Pn,{SettingsPanel:()=>Ye,THEME_CONFIGS:()=>co,applyTheme:()=>An,applyUiPreferences:()=>uo,default:()=>Za});function es(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent.document||document}catch{}return document}function _n(t=es()){return t?.documentElement||document.documentElement}function An(t,e=es()){let s=_n(e),r={...Qa,...co[t]||co["dark-blue"]};Object.entries(r).forEach(([o,n])=>{s.style.setProperty(o,n)}),s.setAttribute("data-yyt-theme",t)}function uo(t={},e=es()){let s=_n(e),{theme:r="dark-blue",compactMode:o=!1,animationEnabled:n=!0}=t||{};An(r,e),s.classList.toggle("yyt-compact-mode",!!o),s.classList.toggle("yyt-no-animation",!n)}var Qa,co,Ye,Za,Hs=D(()=>{re();Vt();Me();Qa={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)","--yyt-surface":"rgba(255, 255, 255, 0.03)","--yyt-surface-hover":"rgba(255, 255, 255, 0.06)","--yyt-surface-active":"rgba(255, 255, 255, 0.08)","--yyt-border":"rgba(255, 255, 255, 0.08)","--yyt-border-strong":"rgba(255, 255, 255, 0.15)","--yyt-text":"rgba(255, 255, 255, 0.95)","--yyt-text-secondary":"rgba(255, 255, 255, 0.7)","--yyt-text-muted":"rgba(255, 255, 255, 0.45)","--yyt-on-accent":"#0b0f15"},co={"dark-blue":{"--yyt-on-accent":"#0b0f15"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#120b1f"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#0b150f"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.7)","--yyt-text-muted":"rgba(15, 23, 42, 0.45)","--yyt-surface":"rgba(0, 0, 0, 0.03)","--yyt-surface-hover":"rgba(0, 0, 0, 0.06)","--yyt-surface-active":"rgba(0, 0, 0, 0.08)","--yyt-border":"rgba(0, 0, 0, 0.08)","--yyt-border-strong":"rgba(0, 0, 0, 0.15)","--yyt-on-accent":"#0f172a"}};Ye={id:"settingsPanel",render(t){let e=Te.getSettings();return`
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
              <span>\u76D1\u542C AI \u56DE\u590D\u5B8C\u6210\u4E8B\u4EF6</span>
            </label>
            <div class="yyt-form-hint">\u542F\u7528\u540E\u5C06\u5728 AI \u56DE\u590D\u5B8C\u6210\u65F6\u81EA\u52A8\u89E6\u53D1\u5DE5\u5177</div>
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
            <div class="yyt-form-hint">Quiet \u6A21\u5F0F\u7684\u751F\u6210\u4E0D\u4F1A\u89E6\u53D1\u5DE5\u5177</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-ignoreAutoTrigger" 
                     ${t.ignoreAutoTrigger?"checked":""}>
              <span>\u5FFD\u7565\u81EA\u52A8\u89E6\u53D1</span>
            </label>
            <div class="yyt-form-hint">\u81EA\u52A8\u89E6\u53D1\u7684\u751F\u6210\u4E0D\u4F1A\u6267\u884C\u5DE5\u5177</div>
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u9632\u6296\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label>\u9632\u6296\u65F6\u95F4 (ms)</label>
            <div class="yyt-form-hint">\u8FDE\u7EED\u4E8B\u4EF6\u89E6\u53D1\u7684\u6700\u5C0F\u95F4\u9694</div>
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
    `},bindEvents(t,e){let s=L();!s||!U(t)||(t.find(".yyt-settings-tab").on("click",r=>{let o=s(r.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),s(r.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${o}"]`).addClass("yyt-active")}),t.find("#yyt-settings-save").on("click",()=>{this._saveSettings(t,s)}),t.find("#yyt-settings-reset").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(Te.resetSettings(),uo(Kt.ui,es()),this.renderTo(t),y("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}))},_saveSettings(t,e){let s={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val())||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val())||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val())||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val())||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},listener:{listenGenerationEnded:t.find("#yyt-setting-listenGenerationEnded").is(":checked"),ignoreQuietGeneration:t.find("#yyt-setting-ignoreQuietGeneration").is(":checked"),ignoreAutoTrigger:t.find("#yyt-setting-ignoreAutoTrigger").is(":checked"),debounceMs:parseInt(t.find("#yyt-setting-debounceMs").val())||300},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};Te.saveSettings(s),uo(s.ui,es()),y("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},destroy(t){!L()||!U(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},Za=Ye});var Dn={};J(Dn,{ApiPresetPanel:()=>he,BypassPanel:()=>pt,RegexExtractPanel:()=>xe,SCRIPT_ID:()=>u,SettingsPanel:()=>Ye,StatusBlockPanel:()=>Se,SummaryToolPanel:()=>Ee,ToolManagePanel:()=>ve,UIManager:()=>jt,YouyouReviewPanel:()=>_e,bindDialogEvents:()=>gr,createDialogHtml:()=>yr,default:()=>el,downloadJson:()=>Le,escapeHtml:()=>x,fillFormWithConfig:()=>nt,getAllStyles:()=>$n,getFormApiConfig:()=>Ke,getJQuery:()=>L,initUI:()=>ts,isContainerValid:()=>U,readFileContent:()=>Ne,registerComponents:()=>$t,renderApiPanel:()=>Ws,renderBypassPanel:()=>In,renderRegexPanel:()=>qs,renderSettingsPanel:()=>Rn,renderStatusBlockPanel:()=>Cn,renderSummaryToolPanel:()=>Mn,renderToolPanel:()=>Ks,renderYouyouReviewPanel:()=>kn,resetJQueryCache:()=>Ti,showToast:()=>y,showTopNotice:()=>Pe,uiManager:()=>q});function $t(){q.register(he.id,he),q.register(xe.id,xe),q.register(ve.id,ve),q.register(Ee.id,Ee),q.register(Se.id,Se),q.register(_e.id,_e),q.register(pt.id,pt),q.register(Ye.id,Ye),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function ts(t={}){let{autoInjectStyles:e=!0,targetDocument:s,...r}=t;q.init(r),$t(),e&&q.injectStyles(s),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function et(t,e,s={}){q.render(t,e,s)}function Ws(t){et(he.id,t)}function qs(t){et(xe.id,t)}function Ks(t){et(ve.id,t)}function Mn(t){et(Ee.id,t)}function Cn(t){et(Se.id,t)}function kn(t){et(_e.id,t)}function In(t){et(pt.id,t)}function Rn(t){et(Ye.id,t)}function $n(){return q.getAllStyles()}var el,po=D(()=>{fr();mr();wr();Lr();no();io();ao();lo();Hs();Me();fr();mr();wr();Lr();no();io();ao();lo();Hs();el={uiManager:q,ApiPresetPanel:he,RegexExtractPanel:xe,ToolManagePanel:ve,SummaryToolPanel:Ee,StatusBlockPanel:Se,YouyouReviewPanel:_e,BypassPanel:pt,SettingsPanel:Ye,registerComponents:$t,initUI:ts,renderApiPanel:Ws,renderRegexPanel:qs,renderToolPanel:Ks,renderSummaryToolPanel:Mn,renderStatusBlockPanel:Cn,renderYouyouReviewPanel:kn,renderBypassPanel:In,renderSettingsPanel:Rn,getAllStyles:$n}});var Yn={};J(Yn,{ApiPresetPanel:()=>he,RegexExtractPanel:()=>xe,SCRIPT_ID:()=>u,StatusBlockPanel:()=>Se,SummaryToolPanel:()=>Ee,ToolManagePanel:()=>ve,YouyouReviewPanel:()=>_e,default:()=>tl,escapeHtml:()=>x,fillFormWithConfig:()=>nt,getCurrentTab:()=>jn,getFormApiConfig:()=>Ke,getJQuery:()=>L,getRegexStyles:()=>zn,getStyles:()=>Un,getToolStyles:()=>Bn,initUI:()=>ts,isContainerValid:()=>U,registerComponents:()=>$t,render:()=>On,renderRegex:()=>Ln,renderTool:()=>Nn,setCurrentTab:()=>Gn,showToast:()=>y,uiManager:()=>q});function yo(t,e){let s=L();return s?t?typeof t=="string"?s(t):t?.jquery?t:s(t):e:(console.error("[YouYouToolkit] jQuery not available"),null)}function On(t){if(ss=yo(t,ss),!ss||!ss.length){console.error("[YouYouToolkit] Container not found or invalid");return}Ws(ss)}function Ln(t){if(rs=yo(t,rs),!rs||!rs.length){console.error("[YouYouToolkit] Regex container not found");return}qs(rs)}function Nn(t){if(os=yo(t,os),!os||!os.length){console.error("[YouYouToolkit] Tool container not found");return}Ks(os)}function Un(){return he.getStyles()}function zn(){return xe.getStyles()}function Bn(){return[ve.getStyles(),Ee.getStyles(),Se.getStyles(),_e.getStyles()].join(`
`)}function jn(){return q.getCurrentTab()}function Gn(t){q.switchTab(t)}var ss,rs,os,tl,Fn=D(()=>{po();ss=null,rs=null,os=null;tl={render:On,renderRegex:Ln,renderTool:Nn,getStyles:Un,getRegexStyles:zn,getToolStyles:Bn,getCurrentTab:jn,setCurrentTab:Gn,uiManager:q,ApiPresetPanel:he,RegexExtractPanel:xe,ToolManagePanel:ve,SummaryToolPanel:Ee,StatusBlockPanel:Se,YouyouReviewPanel:_e,registerComponents:$t,initUI:ts,SCRIPT_ID:u,escapeHtml:x,showToast:y,getJQuery:L,isContainerValid:U,getFormApiConfig:Ke,fillFormWithConfig:nt}});var Wn={};J(Wn,{WindowManager:()=>Vs,closeWindow:()=>nl,createWindow:()=>ol,windowManager:()=>ue});function rl(){if(ue.stylesInjected)return;ue.stylesInjected=!0;let t=`
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
  `,e=document.createElement("style");e.id=sl+"_styles",e.textContent=t,(document.head||document.documentElement).appendChild(e)}function ol(t){let{id:e,title:s="\u7A97\u53E3",content:r="",width:o=900,height:n=700,modal:i=!1,resizable:a=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:d=!0,onClose:p,onReady:b}=t;rl();let f=window.jQuery||window.parent?.jQuery;if(!f)return console.error("[WindowManager] jQuery not available"),null;if(ue.isOpen(e))return ue.bringToFront(e),ue.getWindow(e);let M=window.innerWidth||1200,ee=window.innerHeight||800,O=M<=1100,te=null,se=!1;d&&(te=ue.getState(e),te&&!O&&(se=!0));let V,v;se&&te.width&&te.height?(V=Math.max(400,Math.min(te.width,M-40)),v=Math.max(300,Math.min(te.height,ee-40))):(V=Math.max(400,Math.min(o,M-40)),v=Math.max(300,Math.min(n,ee-40)));let S=Math.max(20,Math.min((M-V)/2,M-V-20)),_=Math.max(20,Math.min((ee-v)/2,ee-v-20)),Ae=l&&!O,de=`
    <div class="yyt-window" id="${e}" style="left:${S}px; top:${_}px; width:${V}px; height:${v}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${il(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${Ae?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
          <button class="yyt-window-btn close" title="\u5173\u95ED"><i class="fa-solid fa-times"></i></button>
        </div>
      </div>
      <div class="yyt-window-body">${r}</div>
      ${a?`
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
  `,ye=null;i&&(ye=f(`<div class="yyt-window-overlay" data-for="${e}"></div>`),f(document.body).append(ye));let k=f(de);f(document.body).append(k),ue.register(e,k),k.on("mousedown",()=>ue.bringToFront(e));let ge=!1,fe={left:S,top:_,width:V,height:v},$e=()=>{fe={left:parseInt(k.css("left")),top:parseInt(k.css("top")),width:k.width(),height:k.height()},k.addClass("maximized"),k.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),ge=!0},Zs=()=>{k.removeClass("maximized"),k.css({left:fe.left+"px",top:fe.top+"px",width:fe.width+"px",height:fe.height+"px"}),k.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),ge=!1};k.find(".yyt-window-btn.maximize").on("click",()=>{ge?Zs():$e()}),(O&&l||se&&te.isMaximized&&l||c&&l)&&$e(),k.find(".yyt-window-btn.close").on("click",()=>{if(d&&l){let A={width:ge?fe.width:k.width(),height:ge?fe.height:k.height(),isMaximized:ge};ue.saveState(e,A)}p&&p(),ye&&ye.remove(),k.remove(),ue.unregister(e),f(document).off(".yytWindowDrag"+e),f(document).off(".yytWindowResize"+e)}),ye&&ye.on("click",A=>{A.target,ye[0]});let g=!1,m,T,P,j;if(k.find(".yyt-window-header").on("mousedown",A=>{f(A.target).closest(".yyt-window-controls").length||ge||(g=!0,m=A.clientX,T=A.clientY,P=parseInt(k.css("left")),j=parseInt(k.css("top")),f(document.body).css("user-select","none"))}),f(document).on("mousemove.yytWindowDrag"+e,A=>{if(!g)return;let $=A.clientX-m,R=A.clientY-T;k.css({left:Math.max(0,P+$)+"px",top:Math.max(0,j+R)+"px"})}),f(document).on("mouseup.yytWindowDrag"+e,()=>{g&&(g=!1,f(document.body).css("user-select",""))}),a){let A=!1,$="",R,z,X,me,yt,gt;k.find(".yyt-window-resize-handle").on("mousedown",function(De){ge||(A=!0,$="",f(this).hasClass("se")?$="se":f(this).hasClass("e")?$="e":f(this).hasClass("s")?$="s":f(this).hasClass("w")?$="w":f(this).hasClass("n")?$="n":f(this).hasClass("nw")?$="nw":f(this).hasClass("ne")?$="ne":f(this).hasClass("sw")&&($="sw"),R=De.clientX,z=De.clientY,X=k.width(),me=k.height(),yt=parseInt(k.css("left")),gt=parseInt(k.css("top")),f(document.body).css("user-select","none"),De.stopPropagation())}),f(document).on("mousemove.yytWindowResize"+e,De=>{if(!A)return;let ft=De.clientX-R,ae=De.clientY-z,be=400,mt=300,Dt=X,Ot=me,is=yt,as=gt;if($.includes("e")&&(Dt=Math.max(be,X+ft)),$.includes("s")&&(Ot=Math.max(mt,me+ae)),$.includes("w")){let tt=X-ft;tt>=be&&(Dt=tt,is=yt+ft)}if($.includes("n")){let tt=me-ae;tt>=mt&&(Ot=tt,as=gt+ae)}k.css({width:Dt+"px",height:Ot+"px",left:is+"px",top:as+"px"})}),f(document).on("mouseup.yytWindowResize"+e,()=>{A&&(A=!1,f(document.body).css("user-select",""))})}return k.on("remove",()=>{f(document).off(".yytWindowDrag"+e),f(document).off(".yytWindowResize"+e)}),b&&setTimeout(()=>b(k),50),k}function nl(t){let e=ue.getWindow(t);if(e){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${t}"]`).remove(),s(document).off(".yytWindowDrag"+t),s(document).off(".yytWindowResize"+t)),e.remove(),ue.unregister(t)}}function il(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}var sl,Hn,Vs,ue,qn=D(()=>{He();sl="youyou_toolkit_window_manager",Hn="window_states",Vs=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,s){this.topZIndex++,this.windows.set(e,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let s=this.windows.get(e);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,s)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,s){let r=this.loadStates();r[e]={...s,updatedAt:Date.now()},Lt.set(Hn,r)}loadStates(){return Lt.get(Hn)||{}}getState(e){return this.loadStates()[e]||null}},ue=new Vs});var Kn={};J(Kn,{DEFAULT_PROMPT_SEGMENTS:()=>Js,PromptEditor:()=>Xs,default:()=>gl,getPromptEditorStyles:()=>dl,messagesToSegments:()=>yl,segmentsToMessages:()=>pl,validatePromptSegments:()=>ul});function dl(){return`
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
  `}function ul(t){let e=[];return Array.isArray(t)?(t.forEach((s,r)=>{s.id||e.push(`\u6BB5\u843D ${r+1} \u7F3A\u5C11ID`),s.role||e.push(`\u6BB5\u843D ${r+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(s.role)||e.push(`\u6BB5\u843D ${r+1} \u7684role\u503C\u65E0\u6548: ${s.role}`)}),{valid:e.length===0,errors:e}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function pl(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function yl(t){return Array.isArray(t)?t.map((e,s)=>({id:`segment_${s}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...Js]}var al,ll,cl,Js,Xs,gl,Vn=D(()=>{al="youyou_toolkit_prompt_editor",ll={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},cl={system:"fa-server",ai:"fa-robot",user:"fa-user"},Js=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],Xs=class{constructor(e={}){this.containerId=e.containerId||al,this.segments=e.segments||[...Js],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...Js],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let s=ll[e.type]||e.type,r=cl[e.type]||"fa-file",o=e.mainSlot==="A"||e.isMain,n=e.mainSlot==="B"||e.isMain2,i=o?"var(--yyt-accent, #7bb7ff)":n?"#ffb74d":"",a=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${o?"yyt-main-a":""} ${n?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
           style="${i?`border-left: 3px solid ${i};`:""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${r}"></i>
            <span class="yyt-prompt-segment-title">${s}</span>
            <div class="yyt-prompt-segment-badges">
              ${l}
              ${a}
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
    `}bindEvents(){this.$container&&(this.$container.find(".yyt-prompt-toggle").on("click",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.find(".yyt-prompt-delete").on("click",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.find(".yyt-prompt-role").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),r=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{role:r})}),this.$container.find(".yyt-prompt-main-slot").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),r=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:r})}),this.$container.find(".yyt-prompt-textarea").on("input",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.find(`#${this.containerId}-add-segment`).on("click",()=>{this.addSegment()}),this.$container.find(`#${this.containerId}-import-prompt`).on("click",()=>{this.importPrompt()}),this.$container.find(`#${this.containerId}-export-prompt`).on("click",()=>{this.exportPrompt()}))}addSegment(e=null){let s=`segment_${Date.now()}`,r=e||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};r.id||(r.id=s),this.segments.push(r),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let s=this.segments.findIndex(o=>o.id===e);if(s===-1)return;if(this.segments[s].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,s){let r=this.segments.find(o=>o.id===e);r&&(Object.assign(r,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=s=>{let r=s.target.files[0];if(!r)return;let o=new FileReader;o.onload=n=>{try{let i=JSON.parse(n.target.result);Array.isArray(i)?(this.setSegments(i),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(i){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",i)}},o.readAsText(r)},e.click()}exportPrompt(){let e=this.getSegments(),s=JSON.stringify(e,null,2),r=new Blob([s],{type:"application/json"}),o=URL.createObjectURL(r),n=document.createElement("a");n.href=o,n.download=`prompt_group_${Date.now()}.json`,n.click(),URL.revokeObjectURL(o),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}};gl=Xs});function Jn(t,e={}){let{constants:s,topLevelWindow:r,modules:o}=t,{SCRIPT_ID:n,SCRIPT_VERSION:i,MENU_ITEM_ID:a,MENU_CONTAINER_ID:l}=s,c=null,d=!1;function p(...v){console.log(`[${n}]`,...v)}function b(...v){console.error(`[${n}]`,...v)}async function f(){return c||(c=(async()=>{try{return o.storageModule=await Promise.resolve().then(()=>(Ut(),xo)),o.apiConnectionModule=await Promise.resolve().then(()=>(ls(),wo)),o.presetManagerModule=await Promise.resolve().then(()=>(ps(),Eo)),o.uiModule=await Promise.resolve().then(()=>(po(),Dn)),o.uiComponentsModule=await Promise.resolve().then(()=>(Fn(),Yn)),o.regexExtractorModule=await Promise.resolve().then(()=>(Es(),Oo)),o.toolManagerModule=await Promise.resolve().then(()=>(As(),Lo)),o.toolExecutorModule=await Promise.resolve().then(()=>(Gr(),nn)),o.toolTriggerModule=await Promise.resolve().then(()=>(oo(),wn)),o.windowManagerModule=await Promise.resolve().then(()=>(qn(),Wn)),o.toolRegistryModule=await Promise.resolve().then(()=>(Pt(),Zo)),o.promptEditorModule=await Promise.resolve().then(()=>(Vn(),Kn)),o.settingsServiceModule=await Promise.resolve().then(()=>(Vt(),tn)),o.bypassManagerModule=await Promise.resolve().then(()=>(qt(),en)),o.variableResolverModule=await Promise.resolve().then(()=>(Fr(),dn)),o.contextInjectorModule=await Promise.resolve().then(()=>(Yr(),ln)),o.toolPromptServiceModule=await Promise.resolve().then(()=>(Hr(),pn)),o.toolOutputServiceModule=await Promise.resolve().then(()=>(Wr(),yn)),o.toolOutputServiceModule?.toolOutputService&&o.apiConnectionModule&&o.toolOutputServiceModule.toolOutputService.setApiConnection(o.apiConnectionModule),!0}catch(v){return c=null,console.warn(`[${n}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,v),!1}})(),c)}function M(){return`
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

      #${a} {
        display: flex; align-items: center; gap: 8px;
        padding: 10px 14px; cursor: pointer;
        transition: all 0.2s ease; border-radius: 8px; margin: 2px;
      }

      #${a}:hover {
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
      }

      #${a} .fa-fw {
        font-size: 16px; color: var(--yyt-accent);
        filter: drop-shadow(0 0 6px var(--yyt-accent-glow));
      }

      #${a} span { font-weight: 500; letter-spacing: 0.3px; }

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
    `}async function ee(){let v=`${n}-styles`,S=r.document||document;if(S.getElementById(v))return;let _="";try{let de=await fetch("./styles/main.css");de.ok&&(_=await de.text())}catch{p("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F")}_||(_=M());let Ae=S.createElement("style");Ae.id=v,Ae.textContent=_,(S.head||S.documentElement).appendChild(Ae),p("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function O(){let v=r.document||document;if(o.uiModule?.getAllStyles){let S=`${n}-ui-styles`;if(!v.getElementById(S)){let _=v.createElement("style");_.id=S,_.textContent=o.uiModule.getAllStyles(),(v.head||v.documentElement).appendChild(_)}}else if(o.uiComponentsModule){let S=`${n}-ui-styles`;if(!v.getElementById(S)){let _=v.createElement("style");_.id=S,_.textContent=[o.uiComponentsModule.getStyles?.()||"",o.uiComponentsModule.getRegexStyles?.()||"",o.uiComponentsModule.getToolStyles?.()||""].join(`
`),(v.head||v.documentElement).appendChild(_)}}if(o.promptEditorModule&&o.promptEditorModule.getPromptEditorStyles){let S=`${n}-prompt-styles`;if(!v.getElementById(S)){let _=v.createElement("style");_.id=S,_.textContent=o.promptEditorModule.getPromptEditorStyles(),(v.head||v.documentElement).appendChild(_)}}}async function te(){try{let{applyUiPreferences:v}=await Promise.resolve().then(()=>(Hs(),Pn));if(o.settingsServiceModule?.settingsService){let S=o.settingsServiceModule.settingsService.getUiSettings();if(S&&S.theme){let _=r.document||document;v(S,_),p(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${S.theme}`)}}}catch(v){p("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",v)}}function se(){let v=r.jQuery||window.jQuery;if(!v){b("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(se,1e3);return}let S=r.document||document,_=v("#extensionsMenu",S);if(!_.length){p("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(se,2e3);return}if(v(`#${l}`,_).length>0){p("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let de=v(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),ye=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${a}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,k=v(ye);k.on("click",function(fe){fe.stopPropagation(),p("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let $e=v("#extensionsMenuButton",S);$e.length&&_.is(":visible")&&$e.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),de.append(k),_.append(de),p("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function V(){if(p(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${i}`),await ee(),await f()){if(p("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),!d&&o.uiModule?.initUI)try{o.uiModule.initUI({services:o,autoInjectStyles:!1,targetDocument:r.document||document}),d=!0,p("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(_){console.error(`[${n}] UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,_)}if(o.toolTriggerModule?.initTriggerModule)try{o.toolTriggerModule.initTriggerModule(),p("\u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316")}catch(_){console.error(`[${n}] \u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,_)}O(),await te()}else p("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let S=r.document||document;S.readyState==="loading"?S.addEventListener("DOMContentLoaded",()=>{setTimeout(se,1e3)}):setTimeout(se,1e3),p("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:f,injectStyles:ee,addMenuItem:se,init:V,log:p,logError:b}}function Xn(t){let{constants:e,topLevelWindow:s,modules:r,caches:o,uiState:n}=t,{SCRIPT_ID:i,SCRIPT_VERSION:a,POPUP_ID:l}=e,c={cleanup:null};function d(...g){console.log(`[${i}]`,...g)}function p(...g){console.error(`[${i}]`,...g)}function b(g){return typeof g!="string"?"":g.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function f(){return s.jQuery||window.jQuery}function M(){return s.document||document}function ee(g){if(!g)return"\u672A\u9009\u62E9\u9875\u9762";let m=r.toolRegistryModule?.getToolConfig(g);if(!m)return g;if(!m.hasSubTabs)return m.name||g;let T=n.currentSubTab[g]||m.subTabs?.[0]?.id||"",P=m.subTabs?.find(j=>j.id===T);return P?.name?`${m.name} / ${P.name}`:m.name||g}function O(){let g=n.currentPopup;if(!g)return;let m=g.querySelector(".yyt-popup-active-label");m&&(m.textContent=`\u5F53\u524D\uFF1A${ee(n.currentMainTab)}`)}function te(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function se(){let g=M(),m=n.currentPopup,T=m?.querySelector(".yyt-popup-header");if(!m||!T||!g)return;let P=!1,j=0,A=0,$=0,R=0,z="",X=()=>({width:s.innerWidth||g.documentElement?.clientWidth||window.innerWidth||0,height:s.innerHeight||g.documentElement?.clientHeight||window.innerHeight||0}),me=(ae,be,mt)=>Math.min(Math.max(ae,be),mt),yt=()=>{P&&(P=!1,m.classList.remove("yyt-popup-dragging"),g.body.style.userSelect=z)},gt=ae=>{if(!P||!n.currentPopup)return;let be=ae.clientX-j,mt=ae.clientY-A,{width:Dt,height:Ot}=X(),is=m.offsetWidth||0,as=m.offsetHeight||0,tt=Math.max(0,Dt-is),ei=Math.max(0,Ot-as);m.style.left=`${me($+be,0,tt)}px`,m.style.top=`${me(R+mt,0,ei)}px`,m.style.transform="none",m.style.right="auto",m.style.bottom="auto"},De=()=>{yt()},ft=ae=>{if(ae.button!==0||ae.target?.closest(".yyt-popup-close"))return;P=!0,j=ae.clientX,A=ae.clientY;let be=m.getBoundingClientRect();$=be.left,R=be.top,m.style.left=`${be.left}px`,m.style.top=`${be.top}px`,m.style.transform="none",m.style.right="auto",m.style.bottom="auto",m.classList.add("yyt-popup-dragging"),z=g.body.style.userSelect||"",g.body.style.userSelect="none",ae.preventDefault()};T.addEventListener("mousedown",ft),g.addEventListener("mousemove",gt),g.addEventListener("mouseup",De),c.cleanup=()=>{yt(),T.removeEventListener("mousedown",ft),g.removeEventListener("mousemove",gt),g.removeEventListener("mouseup",De)}}function V(){te(),n.currentPopup&&(n.currentPopup.remove(),n.currentPopup=null),n.currentOverlay&&(n.currentOverlay.remove(),n.currentOverlay=null),d("\u5F39\u7A97\u5DF2\u5173\u95ED")}function v(g){n.currentMainTab=g;let m=f();if(!m||!n.currentPopup)return;m(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),m(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${g}"]`).addClass("active");let T=r.toolRegistryModule?.getToolConfig(g);T?.hasSubTabs?(m(n.currentPopup).find(".yyt-sub-nav").show(),_(g,T.subTabs)):m(n.currentPopup).find(".yyt-sub-nav").hide(),m(n.currentPopup).find(".yyt-tab-content").removeClass("active"),m(n.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`).addClass("active"),Ae(g),O()}function S(g,m){n.currentSubTab[g]=m;let T=f();!T||!n.currentPopup||(T(n.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),T(n.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${m}"]`).addClass("active"),de(g,m),O())}function _(g,m){let T=f();if(!T||!n.currentPopup||!m)return;let P=n.currentSubTab[g]||m[0]?.id,j=m.map(A=>`
      <div class="yyt-sub-nav-item ${A.id===P?"active":""}" data-subtab="${A.id}">
        <i class="fa-solid ${A.icon||"fa-file"}"></i>
        <span>${A.name}</span>
      </div>
    `).join("");T(n.currentPopup).find(".yyt-sub-nav").html(j),T(n.currentPopup).find(".yyt-sub-nav-item").on("click",function(){let $=T(this).data("subtab");S(g,$)})}async function Ae(g){let m=f();if(!m||!n.currentPopup)return;let T=m(n.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!T.length)return;let P=r.toolRegistryModule?.getToolConfig(g);switch(g){case"apiPresets":r.uiModule?.renderApiPanel?r.uiModule.renderApiPanel(T):r.uiComponentsModule?.render&&r.uiComponentsModule.render(T);break;case"toolManage":r.uiModule?.renderToolPanel?r.uiModule.renderToolPanel(T):r.uiComponentsModule?.renderTool&&r.uiComponentsModule.renderTool(T);break;case"regexExtract":r.uiModule?.renderRegexPanel?r.uiModule.renderRegexPanel(T):r.uiComponentsModule?.renderRegex&&r.uiComponentsModule.renderRegex(T);break;case"tools":if(P?.hasSubTabs&&P.subTabs?.length>0){let j=n.currentSubTab[g]||P.subTabs[0].id;de(g,j)}else T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":r.uiModule?.renderBypassPanel?r.uiModule.renderBypassPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"settings":r.uiModule?.renderSettingsPanel?r.uiModule.renderSettingsPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:k(g,T);break}}function de(g,m){let T=f();if(!T||!n.currentPopup)return;let P=T(n.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!P.length)return;let j=r.toolRegistryModule?.getToolConfig(g);if(j?.hasSubTabs){let $=j.subTabs?.find(R=>R.id===m);if($){let R=P.find(".yyt-sub-content");switch(R.length||(P.html('<div class="yyt-sub-content"></div>'),R=P.find(".yyt-sub-content")),$.component){case"SummaryToolPanel":r.uiModule?.renderSummaryToolPanel?r.uiModule.renderSummaryToolPanel(R):r.uiComponentsModule?.SummaryToolPanel?r.uiComponentsModule.SummaryToolPanel.renderTo(R):R.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"StatusBlockPanel":r.uiModule?.renderStatusBlockPanel?r.uiModule.renderStatusBlockPanel(R):r.uiComponentsModule?.StatusBlockPanel?r.uiComponentsModule.StatusBlockPanel.renderTo(R):R.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"YouyouReviewPanel":r.uiModule?.renderYouyouReviewPanel?r.uiModule.renderYouyouReviewPanel(R):r.uiComponentsModule?.YouyouReviewPanel?r.uiComponentsModule.YouyouReviewPanel.renderTo(R):R.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"GenericToolConfigPanel":ye($,R);break;default:R.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}return}let A=P.find(".yyt-sub-content");if(A.length)switch(m){case"config":ge(g,A);break;case"prompts":fe(g,A);break;case"presets":$e(g,A);break;default:A.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}async function ye(g,m){if(!(!f()||!m?.length||!g?.id))try{let P=o.dynamicToolPanelCache.get(g.id);if(!P){let A=(await Promise.resolve().then(()=>(Zt(),Sn)))?.createToolConfigPanel;if(typeof A!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");P=A({id:`${g.id}Panel`,toolId:g.id,postResponseHint:`\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${g.name||g.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${g.id}-extraction-preview`,previewTitle:`${g.name||g.id} \u63D0\u53D6\u9884\u89C8`}),o.dynamicToolPanelCache.set(g.id,P)}P.renderTo(m)}catch(P){console.error(`[${i}] \u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,P),m.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function k(g,m){if(!f())return;let P=r.toolRegistryModule?.getToolConfig(g);if(!P){m.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let j=n.currentSubTab[g]||P.subTabs?.[0]?.id||"config";m.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${j}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),de(g,j)}function ge(g,m){if(!f())return;let P=r.toolManagerModule?.getTool(g),j=r.presetManagerModule?.getAllPresets()||[],A=r.toolRegistryModule?.getToolApiPreset(g)||"",$=j.map(R=>`<option value="${b(R.name)}" ${R.name===A?"selected":""}>${b(R.name)}</option>`).join("");m.html(`
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
    `),m.find("#yyt-save-tool-preset").on("click",function(){let z=m.find("#yyt-tool-api-preset").val();r.toolRegistryModule?.setToolApiPreset(g,z);let X=s.toastr;X&&X.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}function fe(g,m){if(!f()||!r.promptEditorModule){m.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let j=r.toolManagerModule?.getTool(g)?.config?.messages||[],A=r.promptEditorModule.messagesToSegments?r.promptEditorModule.messagesToSegments(j):r.promptEditorModule.DEFAULT_PROMPT_SEGMENTS,$=new r.promptEditorModule.PromptEditor({containerId:`yyt-prompt-editor-${g}`,segments:A,onChange:z=>{let X=r.promptEditorModule.segmentsToMessages?r.promptEditorModule.segmentsToMessages(z):[];d("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",X.length,"\u6761\u6D88\u606F")}});m.html(`<div id="yyt-prompt-editor-${g}" class="yyt-prompt-editor-container"></div>`),$.init(m.find(`#yyt-prompt-editor-${g}`));let R=r.promptEditorModule.getPromptEditorStyles?r.promptEditorModule.getPromptEditorStyles():"";if(R){let z="yyt-prompt-editor-styles",X=s.document||document;if(!X.getElementById(z)){let me=X.createElement("style");me.id=z,me.textContent=R,(X.head||X.documentElement).appendChild(me)}}}function $e(g,m){f()&&m.html(`
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
    `)}function Zs(){if(n.currentPopup){d("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let g=f(),m=M();if(!g){p("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let T=r.toolRegistryModule?.getToolList()||[];if(!T.length){p("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}T.some(z=>z.id===n.currentMainTab)||(n.currentMainTab=T[0].id),n.currentOverlay=m.createElement("div"),n.currentOverlay.className="yyt-popup-overlay",n.currentOverlay.addEventListener("click",z=>{z.target===n.currentOverlay&&V()}),m.body.appendChild(n.currentOverlay);let P=T.map(z=>`
      <div class="yyt-main-nav-item ${z.id===n.currentMainTab?"active":""}" data-tab="${z.id}">
        <i class="fa-solid ${z.icon}"></i>
        <span>${z.name}</span>
      </div>
    `).join(""),j=T.map(z=>`
      <div class="yyt-tab-content ${z.id===n.currentMainTab?"active":""}" data-tab="${z.id}">
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
              <span class="yyt-popup-version">v${a}</span>
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
                ${j}
              </div>
            </div>
          </div>
        </div>

        <div class="yyt-popup-footer">
          <div class="yyt-popup-footer-left">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${ee(n.currentMainTab)}</span>
            </div>
          </div>
          <div class="yyt-popup-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${i}-close-btn">\u5173\u95ED</button>
          </div>
        </div>
      </div>
    `,$=m.createElement("div");$.innerHTML=A,n.currentPopup=$.firstElementChild,m.body.appendChild(n.currentPopup),g(n.currentPopup).find(".yyt-popup-close").on("click",V),g(n.currentPopup).find(`#${i}-close-btn`).on("click",V),g(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let X=g(this).data("tab");X&&v(X)}),se(),Ae(n.currentMainTab);let R=r.toolRegistryModule?.getToolConfig(n.currentMainTab);R?.hasSubTabs&&(g(n.currentPopup).find(".yyt-sub-nav").show(),_(n.currentMainTab,R.subTabs)),O(),d("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:Zs,closePopup:V,switchMainTab:v,switchSubTab:S,renderTabContent:Ae,renderSubTabContent:de}}function Qn(t,e={}){let{constants:s,modules:r}=t,{SCRIPT_ID:o,SCRIPT_VERSION:n}=s,{init:i,loadModules:a,addMenuItem:l,popupShell:c}=e;return{version:n,id:o,init:i,openPopup:c?.openPopup,closePopup:c?.closePopup,switchMainTab:c?.switchMainTab,switchSubTab:c?.switchSubTab,addMenuItem:l,getStorage:()=>r.storageModule,getApiConnection:()=>r.apiConnectionModule,getPresetManager:()=>r.presetManagerModule,getUi:()=>r.uiModule,getUiModule:()=>r.uiModule,getUiComponents:()=>r.uiComponentsModule,getRegexExtractor:()=>r.regexExtractorModule,getToolManager:()=>r.toolManagerModule,getToolExecutor:()=>r.toolExecutorModule,getToolTrigger:()=>r.toolTriggerModule,getWindowManager:()=>r.windowManagerModule,getToolRegistry:()=>r.toolRegistryModule,getPromptEditor:()=>r.promptEditorModule,getSettingsService:()=>r.settingsServiceModule,getBypassManager:()=>r.bypassManagerModule,getVariableResolver:()=>r.variableResolverModule,getContextInjector:()=>r.contextInjectorModule,getToolPromptService:()=>r.toolPromptServiceModule,getToolOutputService:()=>r.toolOutputServiceModule,async getApiConfig(){return await a(),r.storageModule?r.storageModule.loadSettings().apiConfig:null},async saveApiConfig(d){return await a(),r.apiConnectionModule?(r.apiConnectionModule.updateApiConfig(d),!0):!1},async getPresets(){return await a(),r.presetManagerModule?r.presetManagerModule.getAllPresets():[]},async sendApiRequest(d,p){if(await a(),r.apiConnectionModule)return r.apiConnectionModule.sendApiRequest(d,p);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await a(),r.apiConnectionModule?r.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(d,p){return r.toolRegistryModule?.registerTool(d,p)||!1},unregisterTool(d){return r.toolRegistryModule?.unregisterTool(d)||!1},getToolList(){return r.toolRegistryModule?.getToolList()||[]},createWindow(d){return r.windowManagerModule?.createWindow(d)||null},closeWindow(d){r.windowManagerModule?.closeWindow(d)}}}var ns="youyou_toolkit",fl="0.6.2",ml=`${ns}-menu-item`,bl=`${ns}-menu-container`,hl=`${ns}-popup`,xl=typeof window.parent<"u"?window.parent:window,fo={constants:{SCRIPT_ID:ns,SCRIPT_VERSION:fl,MENU_ITEM_ID:ml,MENU_CONTAINER_ID:bl,POPUP_ID:hl},topLevelWindow:xl,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,uiComponentsModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,promptEditorModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null},caches:{dynamicToolPanelCache:new Map},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"apiPresets",currentSubTab:{}}},Zn=Xn(fo),Qs=Jn(fo,{openPopup:Zn.openPopup}),go=Qn(fo,{init:Qs.init,loadModules:Qs.loadModules,addMenuItem:Qs.addMenuItem,popupShell:Zn});if(typeof window<"u"&&(window.YouYouToolkit=go,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=go}catch{}var Td=go;Qs.init();console.log(`[${ns}] \u6A21\u5757\u52A0\u8F7D\u5B8C\u6210`);export{Td as default};
