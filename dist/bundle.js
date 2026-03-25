var ai=Object.defineProperty;var H=(t,e)=>()=>(t&&(e=t(t=0)),e);var ue=(t,e)=>{for(var s in e)ai(t,s,{get:e[s],enumerable:!0})};function ao(){let t=I;return t._getStorage(),t._storage}function ee(){return I.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function _e(t){I.set("settings",t)}var mt,I,V,oo,ls,ht=H(()=>{mt=class t{constructor(e="youyou_toolkit"){this.namespace=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespace]||(s.extensionSettings[this.namespace]={}),this._storage={_target:s.extensionSettings[this.namespace],getItem:n=>{let r=s.extensionSettings[this.namespace][n];return typeof r=="string"?r:r?JSON.stringify(r):null},setItem:(n,r)=>{s.extensionSettings[this.namespace][n]=r,this._saveSettings(s)},removeItem:n=>{delete s.extensionSettings[this.namespace][n],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespace}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,s)=>{try{localStorage.setItem(e,s)}catch(n){console.error(`[${this.namespace}] localStorage\u5199\u5165\u5931\u8D25:`,n)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,s=null){let n=`${this.namespace}:${e}`;if(this._cache.has(n))return this._cache.get(n);let r=this._getStorage(),o=this._getFullKey(e),a=r.getItem(o);if(a===null)return s;try{let i=JSON.parse(a);return this._cache.set(n,i),i}catch{return a}}set(e,s){let n=this._getStorage(),r=this._getFullKey(e),o=`${this.namespace}:${e}`;this._cache.set(o,s);try{n.setItem(r,JSON.stringify(s))}catch(a){console.error(`[${this.namespace}] \u5B58\u50A8\u5931\u8D25:`,a)}}remove(e){let s=this._getStorage(),n=this._getFullKey(e),r=`${this.namespace}:${e}`;this._cache.delete(r),s.removeItem(n)}has(e){let s=this._getStorage(),n=this._getFullKey(e);return s.getItem(n)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let n=s.SillyTavern.getContext();n?.extensionSettings?.[this.namespace]&&(n.extensionSettings[this.namespace]={},this._saveSettings(n))}}else{let s=`${this.namespace}_`,n=[];for(let r=0;r<localStorage.length;r++){let o=localStorage.key(r);o&&o.startsWith(s)&&n.push(o)}n.forEach(r=>localStorage.removeItem(r))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespace}_${e}`}namespace(e){return new t(`${this.namespace}:${e}`)}getMultiple(e){let s={};return e.forEach(n=>{s[n]=this.get(n)}),s}setMultiple(e){Object.entries(e).forEach(([s,n])=>{this.set(s,n)})}exportAll(){let e=this._getStorage(),s={};if(e._isTavern){let n=typeof window.parent<"u"?window.parent:window;if(n.SillyTavern?.getContext){let o=n.SillyTavern.getContext()?.extensionSettings?.[this.namespace]||{};Object.entries(o).forEach(([a,i])=>{s[a]=typeof i=="string"?JSON.parse(i):i})}}else{let n=`${this.namespace}_`;for(let r=0;r<localStorage.length;r++){let o=localStorage.key(r);if(o&&o.startsWith(n)){let a=o.slice(n.length);try{s[a]=JSON.parse(localStorage.getItem(o))}catch{s[a]=localStorage.getItem(o)}}}}return s}},I=new mt("youyou_toolkit"),V=new mt("youyou_toolkit:tools"),oo=new mt("youyou_toolkit:presets"),ls=new mt("youyou_toolkit:windows")});var lo={};ue(lo,{DEFAULT_API_PRESETS:()=>li,DEFAULT_SETTINGS:()=>ii,STORAGE_KEYS:()=>cs,StorageService:()=>mt,deepMerge:()=>io,getCurrentPresetName:()=>bt,getStorage:()=>ao,loadApiPresets:()=>ye,loadSettings:()=>ee,presetStorage:()=>oo,saveApiPresets:()=>lt,saveSettings:()=>_e,setCurrentPresetName:()=>Ht,storage:()=>I,toolStorage:()=>V,windowStorage:()=>ls});function ye(){return I.get(cs.API_PRESETS)||[]}function lt(t){I.set(cs.API_PRESETS,t)}function bt(){return I.get(cs.CURRENT_PRESET)||""}function Ht(t){I.set(cs.CURRENT_PRESET,t||"")}function io(t,e){let s=r=>r&&typeof r=="object"&&!Array.isArray(r),n={...t};return s(t)&&s(e)&&Object.keys(e).forEach(r=>{s(e[r])?r in t?n[r]=io(t[r],e[r]):Object.assign(n,{[r]:e[r]}):Object.assign(n,{[r]:e[r]})}),n}var cs,ii,li,ds=H(()=>{ht();ht();cs={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},ii={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},li=[]});var po={};ue(po,{API_STATUS:()=>ci,fetchAvailableModels:()=>Hn,getApiConfig:()=>xt,getEffectiveApiConfig:()=>us,hasEffectiveApiPreset:()=>zn,sendApiRequest:()=>Fn,sendWithPreset:()=>ui,testApiConnection:()=>hi,updateApiConfig:()=>Kt,validateApiConfig:()=>Yt});function Bn(t,e={}){let s=new Error(t);return s.allowDirectFallback=e.allowDirectFallback===!0,s}function co(t,e="chat_completions"){let s=String(t||"").trim();if(!s)return"";let n=null;try{n=new URL(s)}catch{return s}let r=n.pathname.replace(/\/+$/,""),o=r;return e==="chat_completions"?!/\/chat\/completions$/i.test(r)&&!/\/completions$/i.test(r)&&(o=`${r||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(r)?o=r.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(r)?o=r.replace(/\/completions$/i,"/models"):/\/models$/i.test(r)||(o=`${r||""}/models`)),n.pathname=o.replace(/\/+/g,"/"),n.toString()}function di(t){let e=String(t||"").trim();if(!e)return"";try{let s=new URL(e);return s.pathname=s.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",s.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function xt(){return ee().apiConfig||{}}function Kt(t){let e=ee();e.apiConfig={...e.apiConfig,...t},_e(e)}function Yt(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function us(t=""){let e=ee(),s=t||bt()||"";if(s){let r=(ye()||[]).find(o=>o.name===s);if(r&&r.apiConfig)return{...r.apiConfig,presetName:r.name}}return e.apiConfig||{}}function zn(t=""){return t?(ye()||[]).some(s=>s?.name===t):!1}async function ui(t,e,s={},n=null){let r=us(t);return await Fn(e,{...s,apiConfig:r},n)}function uo(t,e={}){let s=e.apiConfig||xt();return{messages:t,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:!1,...e.extraParams}}function jn(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function Fn(t,e={},s=null){let n=e.apiConfig||xt(),r=n.useMainApi,o=Yt(n);if(!o.valid&&!r)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${o.errors.join(", ")}`);return r?await pi(t,e,s):await yi(t,n,e,s)}async function pi(t,e,s){let n=typeof window.parent<"u"?window.parent:window;if(!n.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let r=await n.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,...e.extraParams});if(typeof r!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return r.trim()}catch(r){throw r.name==="AbortError"?r:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${r.message}`)}}async function yi(t,e,s,n){let r=typeof window.parent<"u"?window.parent:window;if(r.TavernHelper?.generateRaw)try{return await gi(t,e,s,n,r)}catch(o){console.warn("[youyou_toolkit] TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",o)}if(r.SillyTavern?.getRequestHeaders)try{return await fi(t,e,s,n,r)}catch(o){if(!o?.allowDirectFallback)throw o}return await mi(t,e,s,n)}async function gi(t,e,s,n,r){if(n?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let o=await r.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,max_chat_history:0,custom_api:{apiurl:di(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...s.extraParams||{}});return typeof o=="string"?o.trim():jn(o)}async function fi(t,e,s,n,r){let o=String(e.url||"").trim(),a={...uo(t,{apiConfig:e,...s}),chat_completion_source:"custom",reverse_proxy:o,proxy_password:"",custom_url:o,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof r.SillyTavern?.getRequestHeaders=="function"?r.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(a),signal:n})}catch(d){throw d?.name==="AbortError"?d:Bn(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${d.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let d=[404,405,501,502].includes(l.status);throw Bn(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:d})}let u=null;try{u=c?JSON.parse(c):{}}catch{let p=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw Bn(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${p||"(\u7A7A\u54CD\u5E94)"}`)}return jn(u)}async function mi(t,e,s,n){let r=uo(t,{apiConfig:e,...s}),o=co(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(o,{method:"POST",headers:a,body:JSON.stringify(r),signal:n}),l=await i.text().catch(()=>"");if(!i.ok){let u=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${u}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let d=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${d||"(\u7A7A\u54CD\u5E94)"}`)}return jn(c)}async function hi(t=null){let e=t||xt(),s=Date.now();try{await Fn([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let r=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${r}ms)`,latency:r}}catch(n){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${n.message}`,latency:Date.now()-s}}}async function Hn(t=null){let e=t||xt();return e.useMainApi?await bi():await xi(e)}async function bi(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function xi(t){if(!t.url||!t.apiKey)return[];try{let e=co(t.url,"models"),s=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!s.ok)return[];let n=await s.json();return n.data&&Array.isArray(n.data)?n.data.map(r=>r.id||r.name).filter(Boolean).sort():[]}catch{return[]}}var ci,Ls=H(()=>{ds();ci={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var yo={};ue(yo,{createPreset:()=>Us,createPresetFromCurrentConfig:()=>Ti,deletePreset:()=>Bs,duplicatePreset:()=>Ei,exportPresets:()=>qn,generateUniquePresetName:()=>Xn,getActiveConfig:()=>Vn,getActivePresetName:()=>zs,getAllPresets:()=>Wt,getPreset:()=>It,getPresetNames:()=>vi,getStarredPresets:()=>Wn,importPresets:()=>Jn,presetExists:()=>ps,renamePreset:()=>Si,switchToPreset:()=>Rt,togglePresetStar:()=>Yn,updatePreset:()=>Kn,validatePreset:()=>_i});function Wt(){return ye()}function vi(){return ye().map(e=>e.name)}function It(t){return!t||typeof t!="string"?null:ye().find(s=>s.name===t)||null}function ps(t){return!t||typeof t!="string"?!1:ye().some(s=>s.name===t)}function Us(t){let{name:e,description:s,apiConfig:n}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(ps(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let o={name:r,description:s||"",apiConfig:{url:n?.url||"",apiKey:n?.apiKey||"",model:n?.model||"",useMainApi:n?.useMainApi??!0,max_tokens:n?.max_tokens||4096,temperature:n?.temperature??.7,top_p:n?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=ye();return a.push(o),lt(a),{success:!0,message:`\u9884\u8BBE "${r}" \u521B\u5EFA\u6210\u529F`,preset:o}}function Kn(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=ye(),n=s.findIndex(a=>a.name===t);if(n===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let r=s[n],o={...r,...e,name:r.name,updatedAt:Date.now()};return e.apiConfig&&(o.apiConfig={...r.apiConfig,...e.apiConfig}),s[n]=o,lt(s),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:o}}function Bs(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=ye(),s=e.findIndex(n=>n.name===t);return s===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(s,1),lt(e),bt()===t&&Ht(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function Si(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(!ps(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(ps(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n=ye(),r=n.find(o=>o.name===t);return r&&(r.name=s,r.updatedAt=Date.now(),lt(n),bt()===t&&Ht(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function Ei(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim(),n=It(t);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(ps(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let r={...JSON.parse(JSON.stringify(n)),name:s,createdAt:Date.now(),updatedAt:Date.now()},o=ye();return o.push(r),lt(o),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:r}}function Yn(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=ye(),s=e.find(n=>n.name===t);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),lt(e),{success:!0,message:s.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Wn(){return ye().filter(e=>e.starred===!0)}function Rt(t){if(!t)return Ht(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=It(t);return e?(Ht(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function zs(){return bt()}function Vn(){let t=bt();if(t){let s=It(t);if(s)return{presetName:t,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:ee().apiConfig||{}}}function qn(t=null){if(t){let s=It(t);if(!s)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let e=ye();return JSON.stringify(e,null,2)}function Jn(t,e={overwrite:!1}){let s;try{s=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(s)?s:[s];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let r=ye(),o=0;for(let a of n){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let i=r.findIndex(l=>l.name===a.name);i>=0?e.overwrite&&(a.updatedAt=Date.now(),r[i]=a,o++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),r.push(a),o++)}return o>0&&lt(r),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${o} \u4E2A\u9884\u8BBE`,imported:o}}function Ti(t,e=""){let s=ee();return Us({name:t,description:e,apiConfig:s.apiConfig})}function _i(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function Xn(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=ye(),s=new Set(e.map(r=>r.name));if(!s.has(t))return t;let n=1;for(;s.has(`${t} (${n})`);)n++;return`${t} (${n})`}var js=H(()=>{ds()});var C,Qn,k,Se=H(()=>{C={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",TOOL_TRIGGER_INITIALIZED:"tool:triggerInitialized",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",TRIGGER_REGISTERED:"trigger:registered",TRIGGER_UNREGISTERED:"trigger:unregistered",TRIGGER_FIRED:"trigger:fired",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_EXECUTION_REQUESTED:"tool:executionRequested",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},Qn=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,s,n={}){if(!e||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:r=0}=n;this.listeners.has(e)||this.listeners.set(e,new Set);let o={callback:s,priority:r};return this.listeners.get(e).add(o),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,s)}off(e,s){let n=this.listeners.get(e);if(n){for(let r of n)if(r.callback===s){n.delete(r);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,s),this._addToHistory(e,s);let n=this.listeners.get(e);if(!n||n.size===0)return;let r=Array.from(n).sort((o,a)=>a.priority-o.priority);for(let{callback:o}of r)try{o(s)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,s){let n=r=>{this.off(e,n),s(r)};return this.on(e,n)}wait(e,s=0){return new Promise((n,r)=>{let o=null,a=this.once(e,i=>{o&&clearTimeout(o),n(i)});s>0&&(o=setTimeout(()=>{a(),r(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},s))})}hasListeners(e){let s=this.listeners.get(e);return s&&s.size>0}listenerCount(e){let s=this.listeners.get(e);return s?s.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,s){this.history.push({event:e,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(s=>s.event===e):[...this.history]}clearHistory(){this.history=[]}},k=new Qn});function E(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function h(t,e,s=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let n=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(n.toastr){n.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}wi(t,e,s),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${t.toUpperCase()}] ${e}`)}function Ve(t,e,s={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:n=3500,sticky:r=!1,noticeId:o=""}=s,a=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!a?.body){h(t,e,n);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",c=a.getElementById(i);if(c||(c=a.createElement("div"),c.id=i,c.style.cssText=`
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
    `,a.body.appendChild(c)),!a.getElementById(l)){let S=a.createElement("style");S.id=l,S.textContent=`
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
    `,a.head.appendChild(S)}if(o){let S=c.querySelector(`[data-notice-id="${o}"]`);S&&S.remove()}let u={success:"\u2713",error:"!",warning:"\u2022",info:"i"},d=a.createElement("div");d.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,o&&(d.dataset.noticeId=o);let p=a.createElement("span");p.className="yyt-top-notice__icon",p.textContent=u[t]||u.info;let m=a.createElement("div");m.className="yyt-top-notice__content",m.textContent=e;let b=a.createElement("button");b.className="yyt-top-notice__close",b.type="button",b.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),b.textContent="\xD7";let R=()=>{d.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>d.remove(),180)};b.addEventListener("click",R),d.appendChild(p),d.appendChild(m),d.appendChild(b),c.appendChild(d),r||setTimeout(R,n)}function wi(t,e,s){let n=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!n)return;let r=n.getElementById("yyt-fallback-toast");r&&r.remove();let o={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=o[t]||o.info,i=n.createElement("div");if(i.id="yyt-fallback-toast",i.style.cssText=`
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
  `,i.textContent=e,!n.getElementById("yyt-toast-styles")){let l=n.createElement("style");l.id="yyt-toast-styles",l.textContent=`
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `,n.head.appendChild(l)}n.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},s)}function Y(){if(Mt)return Mt;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Mt=window.parent.jQuery,Mt}catch{}return window.jQuery&&(Mt=window.jQuery),Mt}function Ai(){Mt=null}function q(t){return t&&t.length>0}function vt(t,e=g){if(!Y()||!q(t))return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let n=t.find(`#${e}-model`).val()?.trim()||"",r=t.find(`#${e}-model-select`);return r.is(":visible")&&(n=r.val()||n),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:n,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function Ct(t,e,s=g){if(!Y()||!q(t)||!e)return;t.find(`#${s}-api-url`).val(e.url||""),t.find(`#${s}-api-key`).val(e.apiKey||""),t.find(`#${s}-model`).val(e.model||""),t.find(`#${s}-max-tokens`).val(e.max_tokens||4096),t.find(`#${s}-temperature`).val(e.temperature??.7),t.find(`#${s}-top-p`).val(e.top_p??.9);let r=e.useMainApi??!0;t.find(`#${s}-use-main-api`).prop("checked",r);let a=t.find(`#${s}-custom-api-fields`);r?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${s}-model`).show(),t.find(`#${s}-model-select`).hide()}function Zn(t){let{id:e,title:s,body:n,width:r="380px",wide:o=!1}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${o?"yyt-dialog-wide":""}" style="${r!=="380px"?`width: ${r};`:""} max-height: calc(100vh - 32px);">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${s}</span>
          <button class="yyt-dialog-close" id="${e}-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body" style="overflow-y: auto; overflow-x: hidden; max-height: calc(100vh - 160px);">
          ${n}
        </div>
        <div class="yyt-dialog-footer">
          <button class="yyt-btn yyt-btn-secondary" id="${e}-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${e}-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `}function er(t,e,s={}){if(!Y())return()=>{};let r=t.find(`#${e}-overlay`),o=()=>{r.remove(),s.onClose&&s.onClose()};return r.find(`#${e}-close, #${e}-cancel`).on("click",o),r.on("click",function(a){a.target===this&&o()}),r.find(`#${e}-save`).on("click",function(){s.onSave&&s.onSave(o)}),o}function ct(t,e){let s=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(s),r=document.createElement("a");r.href=n,r.download=e,r.click(),URL.revokeObjectURL(n)}function dt(t){return new Promise((e,s)=>{let n=new FileReader;n.onload=r=>e(r.target.result),n.onerror=r=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),n.readAsText(t)})}var g,Mt,qe=H(()=>{g="youyou_toolkit";Mt=null});var ys,le,tr=H(()=>{Se();qe();ys=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,k.emit(C.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(e,s){return!e||!s?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,s,n={}){let r=Y();if(!r){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let o=this.components.get(e);if(!o){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);return}let a;if(typeof s=="string"?a=r(s):s&&s.jquery?a=s:s&&(a=r(s)),!q(a)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}this.destroyInstance(e);let i=o.render({...n,dependencies:this.dependencies});a.html(i),o.bindEvents(a,this.dependencies),this.activeInstances.set(e,{container:a,component:o,props:n}),k.emit(C.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let s=this.activeInstances.get(e);s&&(s.component.destroy(s.container),this.activeInstances.delete(e))}switchTab(e){let s=this.currentTab;this.currentTab=e,k.emit(C.UI_TAB_CHANGED,{tabId:e,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(e,s){this.currentSubTab[e]=s,k.emit(C.UI_SUBTAB_CHANGED,{mainTab:e,subTab:s})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((s,n)=>{s.getStyles&&(e+=s.getStyles())}),e}injectStyles(e=document){let s="yyt-component-styles";if(e.getElementById(s))return;let n=e.createElement("style");n.id=s,n.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(n)}setDependency(e,s){this.dependencies[e]=s}getDependency(e){return this.dependencies[e]}_subscribeEvents(){k.on(C.PRESET_UPDATED,()=>{}),k.on(C.TOOL_UPDATED,()=>{})}},le=new ys});function Fs(t){return String(t||"").trim()}var Je,Ge,sr=H(()=>{Se();qe();Ls();js();Je=null;Ge={id:"apiPresetPanel",render(t){let e=Vn(),s=e?.apiConfig||xt(),n=Fs(e?.presetName||zs()),r=Wt(),i=Wn().slice(0,8),l=i.length>0?i.map(d=>this._renderPresetItem(d)).join(""):"",c=Je===null?n||"":Fs(Je),u=c||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
              <div class="yyt-custom-select" id="${g}-preset-dropdown">
                <div class="yyt-select-trigger">
                  <span class="yyt-select-value" data-value="${E(c)}">${E(u)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${c?"":"yyt-selected"}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                  </div>
                  ${r.length>0?r.map(d=>this._renderSelectOption(d,c)).join(""):""}
                </div>
              </div>
              <button class="yyt-btn yyt-btn-secondary" id="${g}-load-preset" title="\u52A0\u8F7D\u9009\u4E2D\u9884\u8BBE">
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
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${g}-save-as-preset" style="margin-left: auto;">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
              </button>
            </div>
            
            ${this._renderApiConfigForm(s)}
          </div>
          
          <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
          <div class="yyt-panel-footer">
            <div class="yyt-footer-left">
              <button class="yyt-btn yyt-btn-secondary" id="${g}-import-presets">
                <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
              </button>
              <button class="yyt-btn yyt-btn-secondary" id="${g}-export-presets">
                <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
              </button>
              <input type="file" id="${g}-import-file" accept=".json" style="display:none">
            </div>
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-secondary" id="${g}-reset-api-config">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
              </button>
              <button class="yyt-btn yyt-btn-primary" id="${g}-save-api-config">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>
        </div>
      </div>
    `},_renderPresetItem(t){return`
      <div class="yyt-preset-item" data-preset-name="${E(t.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${E(t.name)}</div>
          <div class="yyt-preset-meta">
            ${t.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${E(t.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
    `},_renderSelectOption(t,e){let s=t.starred===!0,n=s?"yyt-option-star yyt-starred":"yyt-option-star",r=s?"\u2605":"\u2606";return`
      <div class="yyt-select-option ${t.name===e?"yyt-selected":""}" data-value="${E(t.name)}">
        <button class="${n}" data-preset="${E(t.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${r}</button>
        <span class="yyt-option-text">${E(t.name)}</span>
      </div>
    `},_renderApiConfigForm(t){return`
      <div class="yyt-form-group">
        <div class="yyt-toggle-row">
          <div class="yyt-toggle-label">
            <span>\u4F7F\u7528SillyTavern\u4E3BAPI</span>
            <span class="yyt-toggle-hint">\u542F\u7528\u540E\u5C06\u4F7F\u7528SillyTavern\u5185\u7F6E\u7684API\u914D\u7F6E</span>
          </div>
          <label class="yyt-toggle">
            <input type="checkbox" id="${g}-use-main-api" ${t.useMainApi?"checked":""}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div id="${g}-custom-api-fields" class="${t.useMainApi?"yyt-disabled":""}">
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API URL</label>
            <input type="text" class="yyt-input" id="${g}-api-url" 
                   value="${E(t.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${g}-api-key" 
                     value="${E(t.apiKey||"")}" 
                     placeholder="sk-...">
              <button class="yyt-btn yyt-btn-icon" id="${g}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>\u6A21\u578B</label>
            <div class="yyt-model-row">
              <input type="text" class="yyt-input yyt-model-input" id="${g}-model" 
                     value="${E(t.model||"")}" 
                     placeholder="gpt-4">
              <select class="yyt-select yyt-model-select" id="${g}-model-select" style="display: none;">
              </select>
              <button class="yyt-btn yyt-btn-secondary yyt-model-btn" id="${g}-load-models" title="\u83B7\u53D6\u6A21\u578B\u5217\u8868">
                <i class="fa-solid fa-sync-alt"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row yyt-form-row-2col">
          <div class="yyt-form-group">
            <label>Max Tokens</label>
            <input type="number" class="yyt-input" id="${g}-max-tokens" 
                   value="${t.max_tokens||4096}" min="1" max="128000">
          </div>
          
          <div class="yyt-form-group">
            <label>Temperature</label>
            <input type="number" class="yyt-input" id="${g}-temperature" 
                   value="${t.temperature??.7}" min="0" max="2" step="0.1">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>Top P</label>
            <input type="number" class="yyt-input" id="${g}-top-p" 
                   value="${t.top_p??.9}" min="0" max="1" step="0.1">
          </div>
        </div>
      </div>
    `},bindEvents(t,e){let s=Y();!s||!q(t)||(this._bindDropdownEvents(t,s),this._bindPresetListEvents(t,s),this._bindApiConfigEvents(t,s),this._bindFileEvents(t,s))},_bindDropdownEvents(t,e){let s=t.find(`#${g}-preset-dropdown`),n=s.find(".yyt-select-trigger"),r=s.find(".yyt-select-value"),o=()=>{let a=String(r.data("value")||"").trim();if(!a){Je="",Rt(""),Ct(t,xt(),g),t.find(".yyt-preset-item").removeClass("yyt-loaded"),h("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let i=It(a);if(!i){h("error",`\u9884\u8BBE "${a}" \u4E0D\u5B58\u5728`);return}Je=a,Rt(a),Ct(t,i.apiConfig,g),t.find(".yyt-preset-item").removeClass("yyt-loaded"),t.find(`.yyt-preset-item[data-preset-name="${a.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),h("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${a}"\uFF0C\u4FEE\u6539\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u914D\u7F6E\u201D\u4F1A\u8986\u76D6\u8BE5\u9884\u8BBE`)};n.on("click",function(a){a.stopPropagation(),s.toggleClass("yyt-open")}),s.find(".yyt-select-option").on("click",a=>{if(e(a.target).hasClass("yyt-option-star"))return;let i=e(a.currentTarget),l=i.data("value"),c=i.find(".yyt-option-text").text();Je=String(l||"").trim(),r.text(c).data("value",l),s.find(".yyt-select-option").removeClass("yyt-selected"),i.addClass("yyt-selected"),s.removeClass("yyt-open")}),t.find(`#${g}-load-preset`).on("click",()=>{o()}),s.find(".yyt-option-star").on("click",a=>{a.preventDefault(),a.stopPropagation();let i=e(a.currentTarget).data("preset");if(!i)return;let l=Yn(i);if(l.success){h("success",l.message);let c=t.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}else h("error",l.message)}),e(document).on("click.yyt-dropdown",a=>{e(a.target).closest(s).length||s.removeClass("yyt-open")})},_bindPresetListEvents(t,e){t.find(".yyt-preset-item").on("click",s=>{let r=e(s.currentTarget).data("preset-name"),o=e(s.target).closest("[data-action]").data("action");if(o)switch(s.stopPropagation(),o){case"load":t.find(".yyt-select-value").text(r).data("value",r),t.find(".yyt-select-option").removeClass("yyt-selected"),t.find(`.yyt-select-option[data-value="${r.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),t.find(`#${g}-load-preset`).trigger("click");break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${r}" \u5417\uFF1F`)){let a=Bs(r);if(h(a.success?"info":"error",a.message),a.success){Fs(Je)===r&&(Je=null);let i=t.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}}break}})},_bindApiConfigEvents(t,e){t.find(`#${g}-use-main-api`).on("change",function(){let s=e(this).is(":checked"),n=t.find(`#${g}-custom-api-fields`);s?n.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):n.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),t.find(`#${g}-toggle-key-visibility`).on("click",function(){let s=t.find(`#${g}-api-key`),n=s.attr("type");s.attr("type",n==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),t.find(`#${g}-load-models`).on("click",async()=>{let s=t.find(`#${g}-load-models`),n=t.find(`#${g}-model`),r=t.find(`#${g}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let o=vt(t,g),a=await Hn(o);if(a.length>0){r.empty(),a.forEach(l=>{r.append(`<option value="${E(l)}">${E(l)}</option>`)}),n.hide(),r.show();let i=n.val();i&&a.includes(i)&&r.val(i),r.off("change").on("change",function(){n.val(e(this).val())}),h("success",`\u5DF2\u52A0\u8F7D ${a.length} \u4E2A\u6A21\u578B`)}else h("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(o){h("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${o.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${g}-model`).on("focus",function(){let s=t.find(`#${g}-model-select`);e(this).show(),s.hide()}),t.find(`#${g}-save-api-config`).on("click",()=>{let s=vt(t,g),n=Fs(zs()),r=Yt(s);if(!r.valid&&!s.useMainApi){h("error",r.errors.join(", "));return}if(n){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${n}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230\u201C\u5F53\u524D\u914D\u7F6E\u201D`)){Kt(s),Rt(""),Je="",h("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a);return}Kt(s);let o=Kn(n,{apiConfig:s});if(o.success){Je=n,h("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${n}"`),Rt(n),k.emit(C.PRESET_UPDATED,{name:n});let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}else h("error",o.message);return}Kt(s),h("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),t.find(`#${g}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){Rt(""),Je="",Kt({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9});let s=t.closest(".yyt-api-manager").parent();s.length&&this.renderTo(s),h("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),t.find(`#${g}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(t,e)})},_bindFileEvents(t,e){t.find(`#${g}-export-presets`).on("click",()=>{try{let s=qn();ct(s,`youyou_toolkit_presets_${Date.now()}.json`),h("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){h("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${g}-import-presets`).on("click",()=>{t.find(`#${g}-import-file`).click()}),t.find(`#${g}-import-file`).on("change",async s=>{let n=s.target.files[0];if(n){try{let r=await dt(n),o=Jn(r,{overwrite:!0});if(h(o.success?"success":"error",o.message),o.imported>0){let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}}catch(r){h("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}})},_showSavePresetDialog(t,e){let n=Wt().map(u=>u.name),r=Xn("\u65B0\u9884\u8BBE"),o=`
      <div class="yyt-dialog-overlay" id="${g}-dialog-overlay">
        <div class="yyt-dialog">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">\u4FDD\u5B58\u4E3A\u65B0\u9884\u8BBE</span>
            <button class="yyt-dialog-close" id="${g}-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-group">
              <label>\u9884\u8BBE\u540D\u79F0</label>
              <input type="text" class="yyt-input" id="${g}-dialog-preset-name" 
                     value="${E(r)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09</label>
              <textarea class="yyt-textarea" id="${g}-dialog-preset-desc" rows="2" 
                        placeholder="\u9884\u8BBE\u63CF\u8FF0..."></textarea>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${g}-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="${g}-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;e(`#${g}-dialog-overlay`).remove(),t.append(o);let a=e(`#${g}-dialog-overlay`),i=e(`#${g}-dialog-preset-name`),l=e(`#${g}-dialog-preset-desc`);i.focus().select();let c=()=>a.remove();a.find(`#${g}-dialog-close, #${g}-dialog-cancel`).on("click",c),a.on("click",function(u){u.target===this&&c()}),a.find(`#${g}-dialog-save`).on("click",()=>{let u=i.val().trim(),d=l.val().trim();if(!u){h("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),i.focus();return}if(n.includes(u)){if(!confirm(`\u9884\u8BBE "${u}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;Bs(u)}let p=vt(t,g),m=Us({name:u,description:d,apiConfig:p});if(m.success){h("success",m.message),c(),k.emit(C.PRESET_CREATED,{preset:m.preset});let b=t.closest(".yyt-api-manager").parent();b.length&&this.renderTo(b)}else h("error",m.message)}),i.on("keypress",function(u){u.which===13&&a.find(`#${g}-dialog-save`).click()})},destroy(t){let e=Y();!e||!q(t)||(t.find("*").off(),e(document).off("click.yyt-dropdown"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var wo={};ue(wo,{MESSAGE_MACROS:()=>_o,addTagRule:()=>Vt,createRuleTemplate:()=>xo,default:()=>Ri,deleteRulePreset:()=>Eo,deleteRuleTemplate:()=>So,deleteTagRule:()=>gs,escapeRegex:()=>Pt,exportRulesConfig:()=>Xs,extractComplexTag:()=>fo,extractCurlyBraceTag:()=>ar,extractHtmlFormatTag:()=>mo,extractSimpleTag:()=>or,extractTagContent:()=>kt,generateTagSuggestions:()=>Ys,getAllRulePresets:()=>qs,getAllRuleTemplates:()=>ho,getContentBlacklist:()=>Dt,getRuleTemplate:()=>bo,getTagRules:()=>ut,importRulesConfig:()=>Qs,isValidTagName:()=>rr,loadRulePreset:()=>Js,saveRulesAsPreset:()=>Vs,scanTextForTags:()=>Ks,setContentBlacklist:()=>fs,setTagRules:()=>Ws,shouldSkipContent:()=>nr,testRegex:()=>To,updateRuleTemplate:()=>vo,updateTagRule:()=>qt});function Hs(){let t=ee();return Ee=t.ruleTemplates||[...go],te=t.tagRules||[],Ce=t.contentBlacklist||[],{ruleTemplates:Ee,tagRules:te,contentBlacklist:Ce}}function Pt(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function nr(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let s=t.toLowerCase();return e.some(n=>{let r=n.trim().toLowerCase();return r&&s.includes(r)})}function rr(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!Ii.includes(t.toLowerCase())}function or(t,e){if(!t||!e)return[];let s=[],n=Pt(e),r=new RegExp(`<${n}>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(r)].forEach(l=>{l[1]&&s.push(l[1].trim())});let a=(t.match(new RegExp(`<${n}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return a>i&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${a-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),s}function ar(t,e){if(!t||!e)return[];let s=[],n=Pt(e),r=new RegExp(`\\{${n}\\|`,"gi"),o;for(;(o=r.exec(t))!==null;){let a=o.index,i=a+o[0].length,l=1,c=i;for(;c<t.length&&l>0;)t[c]==="{"?l++:t[c]==="}"&&l--,c++;if(l===0){let u=t.substring(i,c-1);u.trim()&&s.push(u.trim())}r.lastIndex=a+1}return s}function fo(t,e){if(!t||!e)return[];let s=e.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let n=s[0].trim(),r=s[1].trim(),o=r.match(/<\/(\w+)>/);if(!o)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${r}`),[];let a=o[1],i=new RegExp(`${Pt(n)}([\\s\\S]*?)<\\/${a}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(u=>{u[1]&&l.push(u[1].trim())}),l}function mo(t,e){if(!t||!e)return[];let s=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let n=s[1],r=[],o=new RegExp(`<${n}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(o)].forEach(c=>{c[1]&&r.push(c[1].trim())});let i=(t.match(new RegExp(`<${n}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return i>l&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${n}> \u6807\u7B7E`),r}function kt(t,e,s=[]){if(!t)return"";if(!e||e.length===0)return t;let n=e.filter(u=>u.type==="exclude"&&u.enabled),r=e.filter(u=>(u.type==="include"||u.type==="regex_include")&&u.enabled),o=e.filter(u=>u.type==="regex_exclude"&&u.enabled),a=t;for(let u of n)try{let d=new RegExp(`<${Pt(u.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Pt(u.value)}>`,"gi");a=a.replace(d,"")}catch(d){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:u,error:d})}let i=[];if(r.length>0)for(let u of r){let d=[];try{if(u.type==="include")d.push(...or(a,u.value)),d.push(...ar(a,u.value));else if(u.type==="regex_include"){let p=new RegExp(u.value,"gi");[...a.matchAll(p)].forEach(b=>{b[1]&&d.push(b[1])})}}catch(p){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:u,error:p})}d.forEach(p=>i.push(p.trim()))}else i.push(a);let l=[];for(let u of i){for(let d of o)try{let p=new RegExp(d.value,"gi");u=u.replace(p,"")}catch(p){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:d,error:p})}nr(u,s)||l.push(u)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function Ks(t,e={}){let s=performance.now(),{chunkSize:n=5e4,maxTags:r=100,timeoutMs:o=5e3}=e,a=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let d=0;d<t.length;d+=n){let p=t.slice(d,Math.min(d+n,t.length));if(c++,l+=p.length,performance.now()-s>o){console.warn(`[YouYouToolkit] Tag scanning timed out after ${o}ms`);break}let m;for(;(m=i.exec(p))!==null&&a.size<r;){let b=(m[1]||m[2]).toLowerCase();rr(b)&&a.add(b)}if(a.size>=r)break;c%5===0&&await new Promise(b=>setTimeout(b,0))}let u=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(u-s),processedChars:l,totalChars:t.length,chunkCount:c,tagsFound:a.size}}}function Ys(t,e=25){let s=t.tags.slice(0,e);return{suggestions:s,stats:{totalFound:t.stats.tagsFound,finalCount:s.length}}}function ho(){return Ee.length===0&&Hs(),Ee}function bo(t){return Ee.find(e=>e.id===t)}function xo(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return Ee.push(e),ir(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function vo(t,e){let s=Ee.findIndex(n=>n.id===t);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(Ee[s]={...Ee[s],...e,updatedAt:new Date().toISOString()},ir(),{success:!0,template:Ee[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function So(t){let e=Ee.findIndex(s=>s.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(Ee.splice(e,1),ir(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function ir(){let t=ee();t.ruleTemplates=Ee,_e(t)}function ut(){return te||Hs(),te}function Ws(t){te=t||[];let e=ee();e.tagRules=te,_e(e)}function Vt(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};te.push(e);let s=ee();return s.tagRules=te,_e(s),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function qt(t,e){if(t<0||t>=te.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};te[t]={...te[t],...e};let s=ee();return s.tagRules=te,_e(s),{success:!0,rule:te[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function gs(t){if(t<0||t>=te.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};te.splice(t,1);let e=ee();return e.tagRules=te,_e(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Dt(){return Ce||Hs(),Ce}function fs(t){Ce=t||[];let e=ee();e.contentBlacklist=Ce,_e(e)}function Vs(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=ee();s.tagRulePresets||(s.tagRulePresets={});let n=`preset-${Date.now()}`;return s.tagRulePresets[n]={id:n,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(te)),blacklist:JSON.parse(JSON.stringify(Ce)),createdAt:new Date().toISOString()},_e(s),{success:!0,preset:s.tagRulePresets[n],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function qs(){let e=ee().tagRulePresets||{};return Object.values(e)}function Js(t){let e=ee(),n=(e.tagRulePresets||{})[t];return n?(te=JSON.parse(JSON.stringify(n.rules||[])),Ce=JSON.parse(JSON.stringify(n.blacklist||[])),e.tagRules=te,e.contentBlacklist=Ce,_e(e),{success:!0,preset:n,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Eo(t){let e=ee(),s=e.tagRulePresets||{};return s[t]?(delete s[t],e.tagRulePresets=s,_e(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Xs(){return JSON.stringify({tagRules:te,contentBlacklist:Ce,ruleTemplates:Ee,tagRulePresets:ee().tagRulePresets||{}},null,2)}function Qs(t,e={overwrite:!0}){try{let s=JSON.parse(t);if(e.overwrite)te=s.tagRules||[],Ce=s.contentBlacklist||[],Ee=s.ruleTemplates||go;else if(s.tagRules&&te.push(...s.tagRules),s.contentBlacklist){let r=new Set(Ce.map(o=>o.toLowerCase()));s.contentBlacklist.forEach(o=>{r.has(o.toLowerCase())||Ce.push(o)})}let n=ee();return n.tagRules=te,n.contentBlacklist=Ce,n.ruleTemplates=Ee,s.tagRulePresets&&(n.tagRulePresets={...n.tagRulePresets||{},...s.tagRulePresets}),_e(n),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function To(t,e,s="g",n=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let r=new RegExp(t,s),o=[];if(s.includes("g")){let a;for(;(a=r.exec(e))!==null;)a.length>1?o.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[n]||a[1]||a[0]}):o.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=r.exec(e);a&&o.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[n]||a[1]:a[0]})}return{success:!0,matches:o,count:o.length,extracted:o.map(a=>a.extracted)}}catch(r){return{success:!1,error:r.message,matches:[]}}}var Ii,go,Ee,te,Ce,_o,Ri,Zs=H(()=>{ds();Ii=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],go=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],Ee=[],te=[],Ce=[];_o={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};Hs();Ri={extractTagContent:kt,extractSimpleTag:or,extractCurlyBraceTag:ar,extractComplexTag:fo,extractHtmlFormatTag:mo,escapeRegex:Pt,shouldSkipContent:nr,isValidTagName:rr,scanTextForTags:Ks,generateTagSuggestions:Ys,getAllRuleTemplates:ho,getRuleTemplate:bo,createRuleTemplate:xo,updateRuleTemplate:vo,deleteRuleTemplate:So,getTagRules:ut,setTagRules:Ws,addTagRule:Vt,updateTagRule:qt,deleteTagRule:gs,getContentBlacklist:Dt,setContentBlacklist:fs,saveRulesAsPreset:Vs,getAllRulePresets:qs,loadRulePreset:Js,deleteRulePreset:Eo,exportRulesConfig:Xs,importRulesConfig:Qs,testRegex:To,MESSAGE_MACROS:_o}});var Le,lr=H(()=>{Se();qe();Zs();Le={id:"regexExtractPanel",render(t){let e=ut(),s=Dt(),n=qs();return`
      <div class="yyt-regex-panel">
        <!-- \u89C4\u5219\u7F16\u8F91\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-filter"></i>
            <span>\u6807\u7B7E\u63D0\u53D6\u89C4\u5219</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${g}-show-examples" style="margin-left: auto;">
              <i class="fa-solid fa-lightbulb"></i> \u67E5\u770B\u793A\u4F8B
            </button>
          </div>
          
          ${this._renderRulesEditor(e,s,n)}
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
            <button class="yyt-btn yyt-btn-secondary" id="${g}-import-rules">
              <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${g}-export-rules">
              <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
            </button>
            <input type="file" id="${g}-import-rules-file" accept=".json" style="display:none">
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${g}-reset-rules">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
            </button>
          </div>
        </div>
        
        <!-- \u6807\u7B7E\u626B\u63CF\u7ED3\u679C\u5BB9\u5668 -->
        <div id="${g}-tag-suggestions-container" style="display: none;">
          <div class="yyt-tag-suggestions">
            <div class="yyt-tag-suggestions-header">
              <span>\u53D1\u73B0\u7684\u6807\u7B7E:</span>
              <span id="${g}-tag-scan-stats"></span>
            </div>
            <div class="yyt-tag-list" id="${g}-tag-list"></div>
          </div>
        </div>
      </div>
    `},_renderRulesEditor(t,e,s){let n=t.length>0?t.map((o,a)=>this._renderRuleItem(o,a)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',r=s.length>0?s.map(o=>`<option value="${o.id}">${E(o.name)}</option>`).join(""):"";return`
      <div class="yyt-tag-rules-editor">
        ${r?`
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${g}-rule-preset-select">
            <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
            ${r}
          </select>
          <button class="yyt-btn yyt-btn-secondary" id="${g}-load-rule-preset">
            <i class="fa-solid fa-download"></i> \u52A0\u8F7D
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${g}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u9884\u8BBE
          </button>
        </div>
        `:`
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-secondary" id="${g}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
          </button>
        </div>
        `}
        
        <div class="yyt-rules-list">
          ${n}
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${g}-add-rule">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u89C4\u5219
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${g}-scan-tags">
            <i class="fa-solid fa-search"></i> \u626B\u63CF\u6807\u7B7E
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${g}-add-exclude-cot">
            <i class="fa-solid fa-ban"></i> \u6392\u9664\u5C0FCoT
          </button>
        </div>
        
        <!-- \u9ED1\u540D\u5355\u8BBE\u7F6E -->
        <div class="yyt-form-group">
          <label>\u5185\u5BB9\u9ED1\u540D\u5355\uFF08\u5305\u542B\u8FD9\u4E9B\u5173\u952E\u8BCD\u7684\u5185\u5BB9\u5C06\u88AB\u8FC7\u6EE4\uFF0C\u7528\u9017\u53F7\u5206\u9694\uFF09</label>
          <input type="text" class="yyt-input" id="${g}-content-blacklist" 
                 value="${E(e.join(", "))}" 
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
               value="${E(t.value||"")}">
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
          <textarea class="yyt-textarea" id="${g}-test-input" rows="6" 
                    placeholder="\u8F93\u5165\u8981\u6D4B\u8BD5\u63D0\u53D6\u7684\u6587\u672C\u5185\u5BB9..."></textarea>
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${g}-test-extract">
            <i class="fa-solid fa-play"></i> \u6D4B\u8BD5\u63D0\u53D6
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${g}-test-clear">
            <i class="fa-solid fa-eraser"></i> \u6E05\u7A7A
          </button>
        </div>
        
        <div class="yyt-form-group" id="${g}-test-result-container" style="display: none;">
          <label>\u63D0\u53D6\u7ED3\u679C</label>
          <div class="yyt-test-result" id="${g}-test-result"></div>
        </div>
      </div>
    `},bindEvents(t,e){let s=Y();!s||!q(t)||(this._bindRuleEditorEvents(t,s),this._bindPresetEvents(t,s),this._bindTestEvents(t,s),this._bindFileEvents(t,s))},_bindRuleEditorEvents(t,e){t.find(".yyt-rule-type").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).val();qt(n,{type:r}),h("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),t.find(".yyt-rule-value").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).val().trim();qt(n,{value:r})}),t.find(".yyt-rule-enabled").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).is(":checked");qt(n,{enabled:r}),h("info",r?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),t.find(".yyt-rule-delete").on("click",()=>{let n=t.find(".yyt-rule-delete").closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(gs(n),this.renderTo(t),h("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.on("click",".yyt-rule-delete",s=>{let r=e(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(gs(r),this.renderTo(t),h("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.find(`#${g}-add-rule`).on("click",()=>{Vt({type:"include",value:"",enabled:!0}),this.renderTo(t),h("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),t.find(`#${g}-scan-tags`).on("click",async()=>{let s=t.find(`#${g}-scan-tags`),n=t.find(`#${g}-test-input`).val();if(!n||!n.trim()){h("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let r=await Ks(n,{maxTags:50,timeoutMs:3e3}),{suggestions:o,stats:a}=Ys(r,25);if(o.length===0){h("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),t.find(`#${g}-tag-suggestions-container`).hide();return}let i=t.find(`#${g}-tag-list`);t.find(`#${g}-tag-scan-stats`).text(`${a.finalCount}/${a.totalFound} \u4E2A\u6807\u7B7E, ${r.stats.processingTimeMs}ms`),i.empty(),o.forEach(c=>{let u=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${E(c)}</button>`);u.on("click",()=>{if(ut().some(m=>m.type==="include"&&m.value===c)){h("warning",`\u89C4\u5219 "\u5305\u542B: ${c}" \u5DF2\u5B58\u5728`);return}Vt({type:"include",value:c,enabled:!0}),this.renderTo(t),h("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${c}"`)}),i.append(u)}),t.find(`#${g}-tag-suggestions-container`).show(),h("success",`\u53D1\u73B0 ${o.length} \u4E2A\u6807\u7B7E`)}catch(r){h("error",`\u626B\u63CF\u5931\u8D25: ${r.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${g}-add-exclude-cot`).on("click",()=>{let s=ut(),n="<!--[\\s\\S]*?-->";if(s.some(o=>o.type==="regex_exclude"&&o.value===n)){h("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}Vt({type:"regex_exclude",value:n,enabled:!0}),this.renderTo(t),h("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),t.find(`#${g}-content-blacklist`).on("change",function(){let n=e(this).val().split(",").map(r=>r.trim()).filter(r=>r);fs(n),h("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${n.length} \u4E2A\u5173\u952E\u8BCD`)}),t.find(`#${g}-show-examples`).on("click",()=>{alert(`
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
      `)})},_bindPresetEvents(t,e){t.find(`#${g}-load-rule-preset`).on("click",()=>{let s=t.find(`#${g}-rule-preset-select`).val();if(!s){h("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let n=Js(s);n.success?(this.renderTo(t),h("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${n.preset.name}`),k.emit(C.REGEX_PRESET_LOADED,{preset:n.preset})):h("error",n.message)}),t.find(`#${g}-save-rule-preset`).on("click",()=>{let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let n=Vs(s.trim());n.success?(this.renderTo(t),h("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):h("error",n.message)})},_bindTestEvents(t,e){t.find(`#${g}-test-extract`).on("click",()=>{let s=t.find(`#${g}-test-input`).val();if(!s||!s.trim()){h("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let n=ut(),r=Dt(),o=kt(s,n,r),a=t.find(`#${g}-test-result-container`),i=t.find(`#${g}-test-result`);a.show(),!o||!o.trim()?(i.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),h("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(i.html(`<pre class="yyt-code-block">${E(o)}</pre>`),h("success","\u63D0\u53D6\u5B8C\u6210"),k.emit(C.REGEX_EXTRACTED,{result:o}))}),t.find(`#${g}-test-clear`).on("click",()=>{t.find(`#${g}-test-input`).val(""),t.find(`#${g}-test-result-container`).hide()})},_bindFileEvents(t,e){t.find(`#${g}-import-rules`).on("click",()=>{t.find(`#${g}-import-rules-file`).click()}),t.find(`#${g}-import-rules-file`).on("change",async s=>{let n=s.target.files[0];if(n){try{let r=await dt(n),o=Qs(r,{overwrite:!0});o.success?(this.renderTo(t),h("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):h("error",o.message)}catch(r){h("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.find(`#${g}-export-rules`).on("click",()=>{try{let s=Xs();ct(s,`youyou_toolkit_rules_${Date.now()}.json`),h("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){h("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${g}-reset-rules`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(Ws([]),fs([]),this.renderTo(t),h("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(t){!Y()||!q(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Ao={};ue(Ao,{DEFAULT_TOOL_PRESETS:()=>Xe,DEFAULT_TOOL_STRUCTURE:()=>we,TOOL_STORAGE_KEYS:()=>Z,cloneTool:()=>Pi,createDefaultToolDefinition:()=>ms,deleteTool:()=>dr,deleteToolPreset:()=>$i,exportTools:()=>yr,getAllToolPresets:()=>pr,getAllTools:()=>$t,getCurrentToolPresetId:()=>Oi,getTool:()=>Xt,getToolPreset:()=>ki,importTools:()=>gr,normalizeToolDefinitionToRuntimeConfig:()=>en,resetTools:()=>fr,saveTool:()=>tn,saveToolPreset:()=>Di,setCurrentToolPreset:()=>Ni,setToolEnabled:()=>ur,validateTool:()=>Gi});function Jt(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function cr(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>0?s:e}function Mi(t=[]){let e=Array.isArray(t)?t.map(s=>({role:String(s?.role||"user").trim().toUpperCase(),content:String(s?.content||"").trim()})).filter(s=>s.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(s=>`\u3010${s.role||"USER"}\u3011
${s.content}`).join(`

`)}function Ci(t,e={}){let s=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(s)return s;let n=Mi(e?.config?.messages||[]);return n||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function ms(t={}){let e=new Date().toISOString(),s=t?.config||{};return{...we,...t,id:t?.id||we.id,icon:t?.icon||we.icon,order:Number.isFinite(t?.order)?t.order:we.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:we.promptTemplate,extractTags:Jt(t?.extractTags),config:{...we.config,...s,trigger:{...we.config.trigger,...s.trigger||{},events:Jt(s?.trigger?.events)},execution:{...we.config.execution,...s.execution||{},timeout:cr(s?.execution?.timeout,we.config.execution.timeout),retries:Math.max(0,parseInt(s?.execution?.retries,10)||we.config.execution.retries)},api:{...we.config.api,...s.api||{}},messages:Array.isArray(s?.messages)?s.messages:[],context:{...we.config.context,...s.context||{},depth:cr(s?.context?.depth,we.config.context.depth),includeTags:Jt(s?.context?.includeTags),excludeTags:Jt(s?.context?.excludeTags)}},enabled:t?.enabled!==!1,metadata:{...we.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function en(t,e={},s={}){let n=ms({...e,id:t||e?.id||""}),r=Jt(n?.config?.trigger?.events),o=Jt(n?.extractTags?.length?n.extractTags:n?.config?.context?.includeTags),a=String(e?.output?.apiPreset||n?.config?.api?.preset||"").trim(),i=Ci(t,n),l=r[0]||"GENERATION_ENDED",c=r.includes("GENERATION_ENDED"),u=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():s.defaultOutputMode||"follow_ai";return{id:n.id||t,name:n.name||t,icon:n.icon||"fa-screwdriver-wrench",description:n.description||"",enabled:n.enabled!==!1,order:Number.isFinite(n.order)?n.order:100,trigger:{event:l,enabled:c},bypass:{enabled:n?.config?.api?.useBypass===!0&&!!n?.config?.api?.bypassPreset,presetId:n?.config?.api?.bypassPreset||""},output:{mode:u,apiPreset:a,overwrite:!0,enabled:u==="post_response_api"?c:!1},extraction:{enabled:!0,maxMessages:cr(n?.config?.context?.depth,5),selectors:o},promptTemplate:i,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:a,extractTags:o,isCustom:!0,category:n.category||"utility",metadata:{...n.metadata||{}}}}function $t(){let t=V.get(Z.TOOLS),e=t&&typeof t=="object"?{...Xe,...t}:{...Xe};return Object.fromEntries(Object.entries(e).map(([s,n])=>[s,ms({...n||{},id:s})]))}function Xt(t){return $t()[t]||null}function tn(t,e){if(!t||!e)return!1;let s=V.get(Z.TOOLS)||{},n=!s[t]&&!Xe[t],r=ms({...s[t]||{},...e,id:t,metadata:{...s[t]?.metadata||{},...e.metadata||{},createdAt:s[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return s[t]=r,V.set(Z.TOOLS,s),k.emit(n?C.TOOL_REGISTERED:C.TOOL_UPDATED,{toolId:t,tool:r}),!0}function dr(t){if(Xe[t])return!1;let e=V.get(Z.TOOLS)||{};return e[t]?(delete e[t],V.set(Z.TOOLS,e),k.emit(C.TOOL_UNREGISTERED,{toolId:t}),!0):!1}function ur(t,e){let s=Xt(t);if(!s)return!1;let n=V.get(Z.TOOLS)||{};return n[t]||(n[t]={...s}),n[t].enabled=e,n[t].metadata={...n[t].metadata,updatedAt:new Date().toISOString()},V.set(Z.TOOLS,n),k.emit(e?C.TOOL_ENABLED:C.TOOL_DISABLED,{toolId:t}),!0}function Pi(t,e,s){let n=Xt(t);if(!n)return!1;let r=JSON.parse(JSON.stringify(n));return r.name=s||`${n.name} (\u526F\u672C)`,r.metadata={...r.metadata,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},tn(e,r)}function pr(){let t=V.get(Z.PRESETS);return t&&typeof t=="object"?{...Xe,...t}:{...Xe}}function ki(t){return pr()[t]||null}function Di(t,e){if(!t||!e)return!1;let s=V.get(Z.PRESETS)||{};return s[t]={...e,metadata:{...e.metadata,updatedAt:new Date().toISOString()}},V.set(Z.PRESETS,s),!0}function $i(t){if(Xe[t])return!1;let e=V.get(Z.PRESETS)||{};return e[t]?(delete e[t],V.set(Z.PRESETS,e),!0):!1}function Oi(){return V.get(Z.CURRENT_PRESET)||null}function Ni(t){return pr()[t]?(V.set(Z.CURRENT_PRESET,t),!0):!1}function yr(){let t=V.get(Z.TOOLS)||{},e=V.get(Z.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function gr(t,e=!1){try{let s=typeof e=="object"?!!e?.overwrite:!!e,n=JSON.parse(t);if(!n||typeof n!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let r=s?{}:V.get(Z.TOOLS)||{},o=s?{}:V.get(Z.PRESETS)||{},a=0,i=0;if(n.tools&&typeof n.tools=="object"){for(let[l,c]of Object.entries(n.tools))Xe[l]&&!s||c&&typeof c=="object"&&(r[l]=ms({...c,id:l}),a++);V.set(Z.TOOLS,r)}if(n.presets&&typeof n.presets=="object"){for(let[l,c]of Object.entries(n.presets))Xe[l]&&!s||c&&typeof c=="object"&&(o[l]=c,i++);V.set(Z.PRESETS,o)}return{success:!0,toolsImported:a,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function fr(){V.remove(Z.TOOLS),V.remove(Z.PRESETS),V.remove(Z.CURRENT_PRESET)}function Gi(t){let e=[];if(!t)return{valid:!1,errors:["\u5DE5\u5177\u5B9A\u4E49\u4E3A\u7A7A"]};if((!t.name||typeof t.name!="string")&&e.push("\u5DE5\u5177\u540D\u79F0\u65E0\u6548"),(!t.category||typeof t.category!="string")&&e.push("\u5DE5\u5177\u5206\u7C7B\u65E0\u6548"),t.config){let{trigger:s,execution:n,api:r,context:o}=t.config;s&&!["manual","event","scheduled"].includes(s.type)&&e.push("\u89E6\u53D1\u7C7B\u578B\u65E0\u6548"),n&&((typeof n.timeout!="number"||n.timeout<0)&&e.push("\u8D85\u65F6\u65F6\u95F4\u5FC5\u987B\u4E3A\u6B63\u6570"),(typeof n.retries!="number"||n.retries<0)&&e.push("\u91CD\u8BD5\u6B21\u6570\u5FC5\u987B\u4E3A\u6B63\u6570")),o&&typeof o.depth!="number"&&e.push("\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u5FC5\u987B\u4E3A\u6570\u5B57")}return{valid:e.length===0,errors:e}}var we,Xe,Z,sn=H(()=>{ht();Se();we={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{trigger:{type:"manual",events:[]},execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},Xe={},Z={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"}});var Fo={};ue(Fo,{TOOL_CATEGORIES:()=>Io,TOOL_REGISTRY:()=>Qt,appendToolRuntimeHistory:()=>vs,clearToolApiPreset:()=>No,default:()=>Ki,ensureToolRuntimeConfig:()=>rn,getAllDefaultToolConfigs:()=>Bo,getAllToolApiBindings:()=>Go,getAllToolFullConfigs:()=>Sr,getEnabledTools:()=>on,getToolApiPreset:()=>xr,getToolBaseConfig:()=>nn,getToolConfig:()=>xs,getToolFullConfig:()=>oe,getToolList:()=>ko,getToolSubTabs:()=>Do,getToolWindowState:()=>jo,hasTool:()=>br,onPresetDeleted:()=>Lo,patchToolRuntime:()=>Zt,registerTool:()=>Co,resetToolConfig:()=>Uo,resetToolRegistry:()=>$o,saveToolConfig:()=>Ze,saveToolWindowState:()=>zo,setToolApiPreset:()=>Oo,setToolApiPresetConfig:()=>ji,setToolBypassConfig:()=>Fi,setToolOutputMode:()=>zi,setToolPromptTemplate:()=>Hi,unregisterTool:()=>Po,updateToolRuntime:()=>vr});function hs(t={}){let e=Array.isArray(t?.recentTriggerHistory)?t.recentTriggerHistory.filter(Boolean):[],s=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0,lastTriggerAt:0,lastTriggerEvent:"",lastMessageKey:"",lastSkipReason:"",lastExecutionPath:"",lastWritebackStatus:"",lastFailureStage:"",lastTraceId:"",...t,recentTriggerHistory:e,recentWritebackHistory:s}}function Li(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function Ro(){let t=$t()||{};return Object.entries(t).filter(([e])=>!bs[e]).map(([e,s])=>[e,s||{}])}function Mo(){let t=Array.isArray(Qt.tools?.subTabs)?[...Qt.tools.subTabs]:[],e=Ro().map(([s,n],r)=>{let o=en(s,n);return{id:s,name:o.name||s,icon:o.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(o.order)?o.order:100+r,isCustom:!0,description:o.description||""}});return[...t,...e].sort((s,n)=>(s.order??0)-(n.order??0))}function Ui(t,e={}){let s=en(t,e,{defaultOutputMode:"follow_ai"});return{...s,runtime:hs(s.runtime)}}function hr(t){let e=bs[t];if(e)return{...e,trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{}},runtime:hs(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let n=($t()||{})[t]||null;return n?Ui(t,n):xs(t)}function nn(t){let e=hr(t);return e?{...e,trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function Bi(t,e={},s=""){if(!t)return null;let n={...t,...e,id:t.id||e.id};n.trigger={...t.trigger||{},...e.trigger||{}},n.output={...t.output||{},...e.output||{}},n.bypass={...t.bypass||{},...e.bypass||{}},n.runtime=hs({...t.runtime||{},...e.runtime||{}}),n.extraction={...t.extraction||{},...e.extraction||{}};let r=e?.output?.apiPreset||e?.apiPreset||n.output?.apiPreset||n.apiPreset||s||"";return n.output={...n.output||{},apiPreset:r},n.apiPreset=r,(!Array.isArray(n.extraction.selectors)||n.extraction.selectors.length===0)&&Array.isArray(n.extractTags)&&n.extractTags.length>0&&(n.extraction.selectors=[...n.extractTags]),(!Array.isArray(n.extractTags)||n.extractTags.length===0)&&(n.extractTags=Array.isArray(n.extraction.selectors)?[...n.extraction.selectors]:[]),t.isCustom?n.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?n.enabled=e.enabled:n.enabled=t.enabled!==!1,n}function Co(t,e){if(!t||typeof t!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let n of s)if(!e[n])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${n}`),!1;return Qe[t]={id:t,...e,order:e.order??Object.keys(Qe).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function Po(t){return Qe[t]?(delete Qe[t],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function ko(t=!0){let e=Object.values(Qe).map(s=>s.id==="tools"?{...s,subTabs:Mo()}:s);return t?e.sort((s,n)=>(s.order??0)-(n.order??0)):e}function xs(t){return t==="tools"&&Qe[t]?{...Qe[t],subTabs:Mo()}:Qe[t]||null}function br(t){return!!Qe[t]}function Do(t){let e=xs(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function $o(){Qe={...Qt},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Oo(t,e){if(!br(t))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let s=I.get($e)||{};return s[t]=e||"",I.set($e,s),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function xr(t){return(I.get($e)||{})[t]||""}function No(t){let e=I.get($e)||{};delete e[t],I.set($e,e),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function Go(){return I.get($e)||{}}function Lo(t){let e=I.get($e)||{},s=!1;for(let n in e)e[n]===t&&(e[n]="",s=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${n}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&I.set($e,e)}function oe(t){let e=hr(t);if(!e)return xs(t);let n=(I.get(Ot)||{})[t]||{},r=xr(t);return Bi({...e,id:t},n,r)}function rn(t){if(!t)return!1;let e=hr(t);if(!e)return!1;let s=I.get(Ot)||{};if(s[t])return!0;let n={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}}};s[t]=n,I.set(Ot,s);let r=I.get($e)||{};return r[t]=n.output?.apiPreset||n.apiPreset||"",I.set($e,r),k.emit(C.TOOL_UPDATED,{toolId:t,config:n}),!0}function Ze(t,e,s={}){if(!t||!oe(t))return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:n=!0}=s,r=I.get(Ot)||{},o=I.get($e)||{},a=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","trigger","output","bypass","extraction","runtime"];return r[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){r[t][l]={...e.output,apiPreset:a};return}if(l==="apiPreset"){r[t][l]=a;return}r[t][l]=e[l]}}),r[t].apiPreset===void 0&&(r[t].apiPreset=a),!r[t].output&&e.output!==void 0&&(r[t].output={...e.output||{},apiPreset:a}),I.set(Ot,r),o[t]=a,I.set($e,o),n&&k.emit(C.TOOL_UPDATED,{toolId:t,config:r[t]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function zi(t,e){let s=oe(t);return s?Ze(t,{...s,output:{...s.output,mode:e}}):!1}function ji(t,e){let s=oe(t);return s?Ze(t,{...s,apiPreset:e,output:{...s.output,apiPreset:e}}):!1}function Fi(t,e){let s=oe(t);return s?Ze(t,{...s,bypass:{...s.bypass,...e}}):!1}function Hi(t,e){let s=oe(t);return s?Ze(t,{...s,promptTemplate:e}):!1}function Zt(t,e,s={}){let n=oe(t);if(!n)return!1;let{touchLastRunAt:r=!1,emitEvent:o=!1}=s,a=hs({...n.runtime||{},...e||{}});return r&&(a.lastRunAt=Date.now()),Ze(t,{...n,runtime:a},{emitEvent:o})}function vs(t,e,s={},n={}){let r=oe(t);if(!r)return!1;let{limit:o=10,emitEvent:a=!1}=n,i=hs(r.runtime||{}),l=e==="writeback"?"recentWritebackHistory":"recentTriggerHistory",c={id:s?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:s?.at||Date.now(),...s};return i[l]=Li([...Array.isArray(i[l])?i[l]:[],c],o),c?.traceId&&(i.lastTraceId=c.traceId),Ze(t,{...r,runtime:i},{emitEvent:a})}function vr(t,e){return Zt(t,e,{touchLastRunAt:!0,emitEvent:!0})}function Uo(t){if(!t||!bs[t])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=I.get(Ot)||{};return delete e[t],I.set(Ot,e),k.emit(C.TOOL_UPDATED,{toolId:t,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function Bo(){return{...bs}}function Sr(){let t=new Set([...Object.keys(bs),...Ro().map(([e])=>e)]);return Array.from(t).map(e=>oe(e)).filter(Boolean)}function on(){return Sr().filter(t=>t&&t.enabled)}function zo(t,e){let s=I.get(mr)||{};s[t]={...e,updatedAt:Date.now()},I.set(mr,s)}function jo(t){return(I.get(mr)||{})[t]||null}var Ot,$e,mr,bs,Qt,Io,Qe,Ki,es=H(()=>{ht();Se();sn();Ot="tool_configs",$e="tool_api_bindings",mr="tool_window_states";bs={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]}},Qt={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{trigger:{type:"manual",events:[]},execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},toolManage:{id:"toolManage",name:"\u5DE5\u5177\u5217\u8868",icon:"fa-screwdriver-wrench",hasSubTabs:!1,description:"\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u7BA1\u7406\u81EA\u5B9A\u4E49\u5DE5\u5177",component:"ToolManagePanel",order:3},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel"}]},bypass:{id:"bypass",name:"\u7834\u9650\u8BCD",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406\u7834\u9650\u8BCD\u9884\u8BBE",component:"BypassPanel",order:5},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:6}},Io={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},Qe={...Qt};Ki={TOOL_REGISTRY:Qt,TOOL_CATEGORIES:Io,registerTool:Co,unregisterTool:Po,getToolList:ko,getToolConfig:xs,hasTool:br,getToolSubTabs:Do,resetToolRegistry:$o,setToolApiPreset:Oo,getToolApiPreset:xr,clearToolApiPreset:No,getAllToolApiBindings:Go,onPresetDeleted:Lo,saveToolWindowState:zo,getToolWindowState:jo,getToolBaseConfig:nn,ensureToolRuntimeConfig:rn,getToolFullConfig:oe,patchToolRuntime:Zt,appendToolRuntimeHistory:vs,saveToolConfig:Ze,resetToolConfig:Uo,getAllDefaultToolConfigs:Bo,getAllToolFullConfigs:Sr,getEnabledTools:on}});var Ue,Er=H(()=>{qe();sn();es();Ue={id:"toolManagePanel",_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let s=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!s){h("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}s.switchMainTab("tools"),s.switchSubTab("tools",t)},render(t){let e=$t(),s=Object.entries(e),n=s.filter(([,r])=>r?.enabled!==!1).length;return`
      <div class="yyt-tool-manager">
        <div class="yyt-tool-manage-hero yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-screwdriver-wrench"></i>
            <span>\u5DE5\u5177\u5DE5\u4F5C\u533A</span>
          </div>
          <div class="yyt-tool-manage-hero-grid">
            <div class="yyt-tool-manage-copy">
              <div class="yyt-tool-manage-lead">\u5728\u8FD9\u91CC\u96C6\u4E2D\u521B\u5EFA\u3001\u6574\u7406\u548C\u7EF4\u62A4\u81EA\u5B9A\u4E49\u5DE5\u5177\u3002</div>
              <div class="yyt-tool-manage-hint">
                \u65B0\u5EFA\u5DE5\u5177\u540E\u4F1A\u81EA\u52A8\u51FA\u73B0\u5728\u4E0A\u65B9\u201C\u5DE5\u5177\u201D\u9875\u7B7E\u91CC\uFF0C\u53EF\u7EE7\u7EED\u914D\u7F6E\u6A21\u677F\u3001\u63D0\u53D6\u89C4\u5219\u3001API \u9884\u8BBE\uFF0C\u5E76\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002
              </div>
            </div>
            <div class="yyt-tool-manage-stats">
              <div class="yyt-tool-manage-stat">
                <span class="yyt-tool-manage-stat-label">\u5DE5\u5177\u603B\u6570</span>
                <strong class="yyt-tool-manage-stat-value">${s.length}</strong>
              </div>
              <div class="yyt-tool-manage-stat">
                <span class="yyt-tool-manage-stat-label">\u5DF2\u542F\u7528</span>
                <strong class="yyt-tool-manage-stat-value">${n}</strong>
              </div>
            </div>
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
    `},_renderToolList(t){let e=Object.entries(t);return e.length?e.map(([s,n])=>`
      <div class="yyt-tool-item ${n.enabled?"yyt-enabled":"yyt-disabled"}" data-tool-id="${s}">
        <div class="yyt-tool-header">
          <div class="yyt-tool-info">
            <span class="yyt-tool-name">${E(n.name)}</span>
            <span class="yyt-tool-category">${E(n.category)}</span>
          </div>
          <div class="yyt-tool-controls">
            <label class="yyt-toggle yyt-tool-toggle">
              <input type="checkbox" ${n.enabled?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="yyt-tool-desc">${E(n.description)}</div>
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
      `},bindEvents(t,e){let s=Y();!s||!q(t)||(this._bindToolEvents(t,s),this._bindFileEvents(t,s))},_bindToolEvents(t,e){t.find(".yyt-tool-toggle input").on("change",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item"),r=n.data("tool-id"),o=e(s.currentTarget).is(":checked");ur(r,o),n.toggleClass("yyt-enabled",o).toggleClass("yyt-disabled",!o),h("info",o?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.find("#yyt-add-tool").on("click",()=>{this._showToolEditDialog(t,e,null)}),t.find('.yyt-tool-item [data-action="config"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._openToolConfig(n)}),t.find('.yyt-tool-item [data-action="edit"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._showToolEditDialog(t,e,n)}),t.find('.yyt-tool-item [data-action="delete"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id"),r=Xt(n);if(!n||!r||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177\u201C${r.name}\u201D\u5417\uFF1F`))return;if(!dr(n)){h("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),h("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.find("#yyt-import-tools").on("click",()=>{t.find("#yyt-import-tools-file").click()}),t.find("#yyt-import-tools-file").on("change",async s=>{let n=s.target.files[0];if(n){try{let r=await dt(n),o=gr(r,{overwrite:!1});h(o.success?"success":"error",o.message),o.success&&this.renderTo(t)}catch(r){h("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.find("#yyt-export-tools").on("click",()=>{try{let s=yr();ct(s,`youyou_toolkit_tools_${Date.now()}.json`),h("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){h("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find("#yyt-reset-tools").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(fr(),this.renderTo(t),h("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,s){let n=s?Xt(s):null,r=!!n,o=`
      <div class="yyt-dialog-overlay" id="yyt-tool-dialog-overlay">
        <div class="yyt-dialog yyt-dialog-wide">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${r?"\u7F16\u8F91\u5DE5\u5177":"\u65B0\u5EFA\u5DE5\u5177"}</span>
            <button class="yyt-dialog-close" id="yyt-tool-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u5DE5\u5177\u540D\u79F0</label>
                <input type="text" class="yyt-input" id="yyt-tool-name" 
                       value="${n?E(n.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u5206\u7C7B</label>
                <select class="yyt-select" id="yyt-tool-category">
                  <option value="api" ${n?.category==="api"?"selected":""}>API</option>
                  <option value="prompt" ${n?.category==="prompt"?"selected":""}>Prompt</option>
                  <option value="utility" ${n?.category==="utility"?"selected":""}>Utility</option>
                </select>
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0</label>
              <input type="text" class="yyt-input" id="yyt-tool-desc" 
                     value="${n?E(n.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u8D85\u65F6\u65F6\u95F4(ms)</label>
                <input type="number" class="yyt-input" id="yyt-tool-timeout" 
                       value="${n?.config?.execution?.timeout||6e4}">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u91CD\u8BD5\u6B21\u6570</label>
                <input type="number" class="yyt-input" id="yyt-tool-retries" 
                       value="${n?.config?.execution?.retries||3}">
              </div>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="yyt-tool-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="yyt-tool-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;e("#yyt-tool-dialog-overlay").remove(),t.append(o);let a=e("#yyt-tool-dialog-overlay"),i=()=>a.remove();a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",i),a.on("click",function(l){l.target===this&&i()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let l=e("#yyt-tool-name").val().trim(),c=e("#yyt-tool-category").val(),u=e("#yyt-tool-desc").val().trim(),d=parseInt(e("#yyt-tool-timeout").val())||6e4,p=parseInt(e("#yyt-tool-retries").val())||3;if(!l){h("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let m=s||`tool_${Date.now()}`;if(!tn(m,{name:l,category:c,description:u,promptTemplate:n?.promptTemplate||"",extractTags:Array.isArray(n?.extractTags)?n.extractTags:[],config:{trigger:n?.config?.trigger||{type:"manual",events:[]},execution:{timeout:d,retries:p},api:n?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(n?.config?.messages)?n.config.messages:[],context:{depth:n?.config?.context?.depth||3,includeTags:Array.isArray(n?.config?.context?.includeTags)?n.config.context.includeTags:[],excludeTags:Array.isArray(n?.config?.context?.excludeTags)?n.config.context.excludeTags:[]}},enabled:n?.enabled!==!1})){h("error",r?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}rn(m),i(),this.renderTo(t),h("success",r?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),r||this._openToolConfig(m)})},destroy(t){!Y()||!q(t)||t.find("*").off()},getStyles(){return`
      /* \u5DE5\u5177\u7BA1\u7406\u9762\u677F\u6837\u5F0F */
      .yyt-tool-manager {
        display: flex;
        flex-direction: column;
        gap: 14px;
        min-height: 100%;
      }

      .yyt-tool-manage-hero {
        gap: 12px;
      }

      .yyt-tool-manage-hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 12px;
        align-items: stretch;
      }

      .yyt-tool-manage-copy {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .yyt-tool-manage-lead {
        font-size: 16px;
        font-weight: 800;
        line-height: 1.2;
        color: var(--yyt-text);
      }
      
      .yyt-tool-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-height: 0;
        overflow-y: auto;
        padding-right: 4px;
      }

      .yyt-tool-manage-hint {
        font-size: 12px;
        color: var(--yyt-text-secondary);
        line-height: 1.55;
      }

      .yyt-tool-manage-stats {
        display: grid;
        grid-template-columns: repeat(2, minmax(110px, 1fr));
        gap: 10px;
      }

      .yyt-tool-manage-stat {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 6px;
        padding: 10px 12px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        min-width: 110px;
      }

      .yyt-tool-manage-stat-label {
        font-size: 11px;
        color: var(--yyt-text-muted);
      }

      .yyt-tool-manage-stat-value {
        font-size: 18px;
        font-weight: 800;
        color: var(--yyt-text);
        line-height: 1;
      }
      
      .yyt-tool-item {
        padding: 12px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        transition: all 0.2s ease;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
      }
      
      .yyt-tool-item:hover {
        border-color: rgba(255, 255, 255, 0.16);
        transform: translateY(-1px);
      }
      
      .yyt-tool-item.yyt-disabled {
        opacity: 0.62;
      }
      
      .yyt-tool-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        gap: 12px;
      }
      
      .yyt-tool-info {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
        flex-wrap: wrap;
      }
      
      .yyt-tool-name {
        font-weight: 600;
        font-size: 15px;
        color: var(--yyt-text);
      }
      
      .yyt-tool-category {
        font-size: 11px;
        padding: 4px 8px;
        background: rgba(123, 183, 255, 0.1);
        border-radius: 999px;
        color: var(--yyt-accent);
      }
      
      .yyt-tool-desc {
        font-size: 12px;
        color: var(--yyt-text-muted);
        margin-bottom: 12px;
        line-height: 1.7;
      }

      .yyt-tool-actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .yyt-tool-controls {
        flex-shrink: 0;
      }
      
      .yyt-dialog-wide {
        width: 480px;
      }

      @media screen and (max-width: 768px) {
        .yyt-tool-manage-hero-grid {
          grid-template-columns: 1fr;
        }

        .yyt-tool-manage-stats {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .yyt-tool-header {
          align-items: flex-start;
          flex-direction: column;
        }
      }
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Ho={};ue(Ho,{BypassManager:()=>an,DEFAULT_BYPASS_PRESETS:()=>yt,addMessage:()=>sl,buildBypassMessages:()=>il,bypassManager:()=>B,createPreset:()=>qi,default:()=>ll,deleteMessage:()=>rl,deletePreset:()=>Xi,duplicatePreset:()=>Qi,exportPresets:()=>ol,getAllPresets:()=>Wi,getDefaultPresetId:()=>Zi,getEnabledMessages:()=>tl,getPreset:()=>Vi,getPresetList:()=>_r,importPresets:()=>al,setDefaultPresetId:()=>el,updateMessage:()=>nl,updatePreset:()=>Ji});var pt,ts,Tr,yt,Yi,an,B,Wi,_r,Vi,qi,Ji,Xi,Qi,Zi,el,tl,sl,nl,rl,ol,al,il,ll,Ss=H(()=>{ht();Se();pt="bypass_presets",ts="default_bypass_preset",Tr="current_bypass_preset",yt={},Yi=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),an=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=I.get(pt,{});return this._cache={...yt,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((s,n)=>(n.updatedAt||0)-(s.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:s,name:n,description:r,messages:o}=e;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!n||typeof n!="string"||!n.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=s.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let i={id:a,name:n.trim(),description:r||"",enabled:!0,messages:o||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,i),k.emit(C.BYPASS_PRESET_CREATED,{presetId:a,preset:i}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,s){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let r={...n,...s,id:e,updatedAt:Date.now()};return this._savePreset(e,r),k.emit(C.BYPASS_PRESET_UPDATED,{presetId:e,preset:r}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${n.name}" \u66F4\u65B0\u6210\u529F`,preset:r}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(yt[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=I.get(pt,{});return delete n[e],I.set(pt,n),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),k.emit(C.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,s,n){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${e}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(r)),id:s.trim(),name:n||`${r.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),o),k.emit(C.BYPASS_PRESET_CREATED,{presetId:s,preset:o}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${o.name}"`,preset:o}}addMessage(e,s){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r={id:`msg_${Date.now()}`,role:s.role||"SYSTEM",content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1},o=[...n.messages||[],r];return this.updatePreset(e,{messages:o})}updateMessage(e,s,n){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=r.messages||[],a=o.findIndex(l=>l.id===s);if(a===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let i=[...o];return i[a]={...i[a],...n},this.updatePreset(e,{messages:i})}deleteMessage(e,s){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r=n.messages||[],o=r.find(i=>i.id===s);if(!o)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(o.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=r.filter(i=>i.id!==s);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let s=this.getPreset(e);return!s||!s.enabled?[]:(s.messages||[]).filter(n=>n.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=I.get(ts,null);return e==="undefined"||e==="null"||e===""?(I.remove(ts),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(I.set(ts,e),k.emit(C.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let n=this.getPreset(e);if(!n)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(n,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(e,s={}){let{overwrite:n=!1}=s,r;try{r=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let o=Array.isArray(r)?r:r.presets?r.presets:[r];if(o.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let a=I.get(pt,{}),i=0;for(let l of o)!l.id||typeof l.id!="string"||l.name&&(yt[l.id]&&!n||!n&&a[l.id]||(a[l.id]={...l,updatedAt:Date.now()},i++));return i>0&&(I.set(pt,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u9884\u8BBE`,imported:i}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let s=e?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(e){let s=this.getToolBypassPreset(e);return s?this.getEnabledMessages(s.id):[]}_savePreset(e,s){let n=I.get(pt,{});n[e]=s,I.set(pt,n),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=I.get(pt,{}),s={},n=!1,r=Array.isArray(e)?e.map((o,a)=>[o?.id||o?.name||`legacy_${a}`,o]):Object.entries(e||{});for(let[o,a]of r){let i=this._normalizePreset(o,a,s);if(!i){n=!0;continue}s[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(n=!0)}n&&I.set(pt,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(e,s,n={}){if(!s||typeof s!="object")return null;let r=typeof s.name=="string"?s.name.trim():"",o=typeof s.id=="string"?s.id.trim():"",a=typeof e=="string"?e.trim():"";if(!r&&a&&a!=="undefined"&&a!=="null"&&(r=a),this._isLegacySamplePreset(r,o)||(!o&&a&&a!=="undefined"&&a!=="null"&&(o=a),!o&&r&&r!=="undefined"&&r!=="null"&&(o=this._generatePresetId(r,n)),!r||!o||o==="undefined"||r==="undefined"))return null;let l=Array.isArray(s.messages)?s.messages.filter(c=>c&&typeof c=="object").map((c,u)=>({id:typeof c.id=="string"&&c.id.trim()?c.id.trim():`${o}_msg_${u+1}`,role:c.role||"SYSTEM",content:typeof c.content=="string"?c.content:"",enabled:c.enabled!==!1,deletable:c.deletable!==!1})):[];return{...s,id:o,name:r,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:l,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(e){let s=I.get(ts,null),n=I.get(Tr,null),r=s??n;(r==="undefined"||r==="null"||r==="")&&(r=null),r&&!e[r]&&(r=Object.values(e).find(a=>a.name===r)?.id||null),r?I.set(ts,r):I.remove(ts),I.has(Tr)&&I.remove(Tr)}_isLegacySamplePreset(e,s=""){return e?s==="standard"||s==="enhanced"||s==="jailbreak"||Yi.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,s={}){let n=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,r=n,o=1;for(;s[r];)r=`${n}_${o++}`;return r}_log(...e){this.debugMode&&console.log("[BypassManager]",...e)}},B=new an,Wi=()=>B.getAllPresets(),_r=()=>B.getPresetList(),Vi=t=>B.getPreset(t),qi=t=>B.createPreset(t),Ji=(t,e)=>B.updatePreset(t,e),Xi=t=>B.deletePreset(t),Qi=(t,e,s)=>B.duplicatePreset(t,e,s),Zi=()=>B.getDefaultPresetId(),el=t=>B.setDefaultPresetId(t),tl=t=>B.getEnabledMessages(t),sl=(t,e)=>B.addMessage(t,e),nl=(t,e,s)=>B.updateMessage(t,e,s),rl=(t,e)=>B.deleteMessage(t,e),ol=t=>B.exportPresets(t),al=(t,e)=>B.importPresets(t,e),il=t=>B.buildBypassMessages(t),ll=B});var Ko={};ue(Ko,{DEFAULT_SETTINGS:()=>Es,SettingsService:()=>ln,default:()=>cl,settingsService:()=>ke});var Es,wr,ln,ke,cl,Ts=H(()=>{ht();Se();Es={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},listener:{listenGenerationEnded:!0,ignoreQuietGeneration:!0,ignoreAutoTrigger:!1,debounceMs:300,useMessageReceivedFallback:!0,useGenerationAfterCommandsFallback:!0,messageSessionWindowMs:1800,historyRetentionLimit:10},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue"}},wr="settings_v2",ln=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=I.get(wr,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),I.set(wr,this._cache),k.emit(C.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let s=this.getSettings(),n=this._deepMerge(s,e);this.saveSettings(n)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getListenerSettings(){return this.getSettings().listener}updateListenerSettings(e){this.updateSettings({listener:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(Es)),I.set(wr,this._cache),k.emit(C.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,s=null){let n=this.getSettings(),r=e.split("."),o=n;for(let a of r)if(o&&typeof o=="object"&&a in o)o=o[a];else return s;return o}set(e,s){let n=JSON.parse(JSON.stringify(this.getSettings())),r=e.split("."),o=n;for(let a=0;a<r.length-1;a++){let i=r[a];i in o||(o[i]={}),o=o[i]}o[r[r.length-1]]=s,this.saveSettings(n)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(Es)),e)}_deepMerge(e,s){let n={...e};for(let r in s)s[r]&&typeof s[r]=="object"&&!Array.isArray(s[r])?n[r]=this._deepMerge(e[r]||{},s[r]):n[r]=s[r];return n}},ke=new ln,cl=ke});var qo={};ue(qo,{abortAllTasks:()=>gl,abortTask:()=>yl,buildToolMessages:()=>Vo,clearExecutionHistory:()=>xl,createExecutionContext:()=>Tl,createResult:()=>cn,enhanceMessagesWithBypass:()=>_l,executeBatch:()=>pl,executeTool:()=>Wo,executeToolWithConfig:()=>dn,executeToolsBatch:()=>Il,executorState:()=>se,extractFailed:()=>El,extractSuccessful:()=>Sl,generateTaskId:()=>Nt,getExecutionHistory:()=>bl,getExecutorStatus:()=>hl,getScheduler:()=>ss,getToolsForEvent:()=>Ir,mergeResults:()=>vl,pauseExecutor:()=>fl,resumeExecutor:()=>ml,setMaxConcurrent:()=>ul});function cn(t,e,s,n,r,o,a=0){return{success:s,taskId:t,toolId:e,data:n,error:r,duration:o,retries:a,timestamp:Date.now(),metadata:{}}}function Nt(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function dl(t,e={}){return{id:Nt(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function ss(){return _s||(_s=new Ar(se.maxConcurrent)),_s}function ul(t){se.maxConcurrent=Math.max(1,Math.min(10,t)),_s&&(_s.maxConcurrent=se.maxConcurrent)}async function Wo(t,e={},s){let n=ss(),r=dl(t,e);for(;se.isPaused;)await new Promise(o=>setTimeout(o,100));try{let o=await n.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},r);return Yo(o),o}catch(o){let a=cn(r.id,t,!1,null,o,Date.now()-r.createdAt,r.retries);return Yo(a),a}}async function pl(t,e={}){let{failFast:s=!1,concurrency:n=se.maxConcurrent}=e,r=[],o=ss(),a=o.maxConcurrent;o.maxConcurrent=n;try{let i=t.map(({toolId:l,options:c,executor:u})=>Wo(l,c,u));if(s)for(let l of i){let c=await l;if(r.push(c),!c.success){o.abortAll();break}}else{let l=await Promise.allSettled(i);for(let c of l)c.status==="fulfilled"?r.push(c.value):r.push(cn(Nt(),"unknown",!1,null,c.reason,0,0))}}finally{o.maxConcurrent=a}return r}function yl(t){return ss().abort(t)}function gl(){ss().abortAll(),se.executionQueue=[]}function fl(){se.isPaused=!0}function ml(){se.isPaused=!1}function hl(){return{...ss().getStatus(),isPaused:se.isPaused,activeControllers:se.activeControllers.size,historyCount:se.executionHistory.length}}function Yo(t){se.executionHistory.push(t),se.executionHistory.length>100&&se.executionHistory.shift()}function bl(t={}){let e=[...se.executionHistory];return t.toolId&&(e=e.filter(s=>s.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(s=>s.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function xl(){se.executionHistory=[]}function vl(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of t)e.totalDuration+=s.duration,s.success?(e.successCount++,s.data!==void 0&&s.data!==null&&e.data.push(s.data)):(e.success=!1,e.failureCount++,s.error&&e.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return e}function Sl(t){return t.filter(e=>e.success).map(e=>e.data)}function El(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function Tl(t={}){return{taskId:Nt(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function _l(t,e){return!e||e.length===0?t:[...e,...t]}function wl(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Vo(t,e){let s=[],n=t.promptTemplate||"",r={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[o,a]of Object.entries(r))n=n.replace(new RegExp(wl(o),"g"),a);return s.push({role:"USER",content:n}),s}async function dn(t,e,s={}){let n=oe(t);if(!n)return{success:!1,taskId:Nt(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!n.enabled)return{success:!1,taskId:Nt(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let r=Date.now(),o=Nt();try{k.emit(C.TOOL_EXECUTION_STARTED,{toolId:t,taskId:o,context:e});let a=Vo(n,e);if(typeof s.callApi=="function"){let i=n.output?.apiPreset||n.apiPreset||"",l=i?{preset:i}:null,c=await s.callApi(a,l,s.signal),u=c;n.outputMode==="separate"&&n.extractTags?.length>0&&(u=Al(c,n.extractTags));let d={success:!0,taskId:o,toolId:t,data:u,duration:Date.now()-r};return k.emit(C.TOOL_EXECUTED,{toolId:t,taskId:o,result:d}),d}else return{success:!0,taskId:o,toolId:t,data:{messages:a,config:{apiPreset:n.output?.apiPreset||n.apiPreset||"",outputMode:n.outputMode,extractTags:n.extractTags}},duration:Date.now()-r,needsExecution:!0}}catch(a){let i={success:!1,taskId:o,toolId:t,error:a.message||String(a),duration:Date.now()-r};return k.emit(C.TOOL_EXECUTION_FAILED,{toolId:t,taskId:o,error:a}),i}}function Al(t,e){let s={};for(let n of e){let r=new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"gi"),o=t.match(r);o&&(s[n]=o.map(a=>{let i=a.match(new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"i"));return i?i[1].trim():""}))}return s}async function Il(t,e,s={}){let n=[];for(let r of t){let o=oe(r);if(o&&o.enabled){let a=await dn(r,e,s);n.push(a)}}return n}function Ir(t){let e=[],s=on();for(let n of s){let r=n?.trigger?.enabled&&n?.trigger?.event===t,o=Array.isArray(n?.triggerEvents)&&n.triggerEvents.includes(t);n&&n.enabled&&(r||o)&&e.push(n)}return e}var se,Ar,_s,Rr=H(()=>{es();Se();se={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};Ar=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,s){return new Promise((n,r)=>{this.queue.push({executor:e,task:s,resolve:n,reject:r}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:s,task:n,resolve:r,reject:o}=e,a=new AbortController;n.abortController=a,n.status="running",n.startedAt=Date.now(),this.running.set(n.id,n),se.activeControllers.set(n.id,a),this.executeTask(s,n,a.signal).then(i=>{n.status="completed",n.completedAt=Date.now(),r(i)}).catch(i=>{n.status=i.name==="AbortError"?"aborted":"failed",n.completedAt=Date.now(),o(i)}).finally(()=>{this.running.delete(n.id),se.activeControllers.delete(n.id),se.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,s,n){let r=Date.now(),o=null;for(let a=0;a<=s.maxRetries;a++){if(n.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(n);return cn(s.id,s.toolId,!0,i,null,Date.now()-r,a)}catch(i){if(o=i,i.name==="AbortError")throw i;a<s.maxRetries&&(await this.delay(1e3*(a+1)),s.retries=a+1)}}throw o}delay(e){return new Promise(s=>setTimeout(s,e))}abort(e){let s=se.activeControllers.get(e);return s?(s.abort(),!0):!1}abortAll(){for(let e of se.activeControllers.values())e.abort();se.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},_s=null});var Xo={};ue(Xo,{ContextInjector:()=>yn,DEFAULT_INJECTION_OPTIONS:()=>Jo,WRITEBACK_METHODS:()=>ws,WRITEBACK_RESULT_STATUS:()=>pn,contextInjector:()=>gn,default:()=>Rl});var Be,un,Jo,pn,ws,yn,gn,Rl,Mr=H(()=>{Se();Be="YouYouToolkit_toolOutputs",un="YouYouToolkit_injectedContext",Jo={overwrite:!0,enabled:!0},pn={SUCCESS:"success",FAILED:"failed"},ws={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},yn=class{constructor(){this.debugMode=!1}async inject(e,s,n={}){return(await this.injectDetailed(e,s,n)).success}async injectDetailed(e,s,n={}){let r={...Jo,...n},o=this._createWritebackResult(e,r);if(!e||s===void 0||s===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),o.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",o;let a=o.chatId,i={toolId:e,content:String(s),updatedAt:Date.now(),sourceMessageId:n.sourceMessageId||null,options:r};k.emit(C.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:i.content,options:r});let l=await this._insertToolOutputToLatestAssistantMessage(e,i,r,o);return l.success&&this._log(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,l),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:s}=this._getChatRuntime(),n=this._findAssistantMessageIndex(s,e);if(n<0)return"";let r=s[n]||{},o=r[un];if(typeof o=="string"&&o.trim())return o.trim();let a=r[Be];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(s){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",s),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),s=this._findAssistantMessageIndex(e,null);if(s<0)return{};let r=(e[s]||{})[Be];return r&&typeof r=="object"?r:{}}catch(e){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",e),{}}}getToolContext(e,s){if(!s)return null;try{let{chat:n}=this._getChatRuntime(),r=this._findAssistantMessageIndex(n,null);return r<0?null:n[r]?.[Be]?.[s]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,s){if(!s)return!1;try{let{api:n,context:r,chat:o}=this._getChatRuntime(),a=this._findAssistantMessageIndex(o,null);if(a<0)return!1;let i=o[a],l=i?.[Be];if(!l||!l[s])return!1;delete l[s],i[Be]=l,i[un]=this._buildMessageInjectedContext(l);let c=r?.saveChat||n?.saveChat||null;return typeof c=="function"&&await c.call(r||n),k.emit(C.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:s}),!0}catch(n){return this._log("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",n),!1}}async clearAllContext(e){try{let{api:s,context:n,chat:r}=this._getChatRuntime(),o=this._findAssistantMessageIndex(r,null);if(o<0)return!1;let a=r[o];delete a[Be],delete a[un];let i=n?.saveChat||s?.saveChat||null;return typeof i=="function"&&await i.call(n||s),k.emit(C.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(s){return this._log("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",s),!1}}clearAllChatsContexts(){this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,s){return!!this.getToolContext(e,s)}getContextSummary(e){let s=this._getLatestAssistantMessageOutputs(),n=Object.entries(s).map(([r,o])=>({toolId:r,updatedAt:o.updatedAt,contentLength:o.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:n,totalCount:n.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,s={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,s=e.SillyTavern||null,n=s?.getContext?.()||null,r=Array.isArray(n?.chat)?n.chat:[],o=Array.isArray(s?.chat)?s.chat:[],a=r.length?r:o;return{topWindow:e,api:s,context:n,chat:a,contextChat:r,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,s={}){return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:s.traceId||"",sessionKey:s.sessionKey||"",sourceMessageId:s.sourceMessageId||null,messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:ws.NONE,writebackStatus:pn.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1},verification:{textIncludesContent:!1,mirrorStored:!1}}}_inferBlockType(e){let s=String(e||"").trim();if(!s)return"empty";let n=s.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return n?.[1]?n[1]:"plain_text"}_stripExactStoredBlock(e,s){let n=String(e||""),r=String(s||"").trim();return r?n.includes(r)?{text:n.replace(r,"").trimEnd(),removed:!0}:{text:n,removed:!1}:{text:n,removed:!1}}_syncMessageToRuntimeChats(e,s,n){let{contextChat:r,apiChat:o}=e||{},a=i=>{!Array.isArray(i)||s<0||s>=i.length||i[s]!==n&&(i[s]={...i[s]||{},...n})};a(r),a(o)}_notifyMessageUpdated(e,s){try{let{api:n,topWindow:r}=e||{},o=n?.eventSource||null,i=(n?.eventTypes||{}).MESSAGE_UPDATED||"MESSAGE_UPDATED";o&&typeof o.emit=="function"&&(o.emit(i,s),typeof r?.requestAnimationFrame=="function"?r.requestAnimationFrame(()=>{o.emit(i,s)}):typeof r?.setTimeout=="function"&&r.setTimeout(()=>{o.emit(i,s)},30))}catch(n){this._log("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",n)}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let s=String(e.role||"").toLowerCase();return s==="assistant"||s==="ai"||!s}_findAssistantMessageIndex(e,s){let n=Array.isArray(e)?e:[];if(!n.length)return-1;let r=(o,a)=>{if(!this._isAssistantMessage(o)||s==null||s==="")return!1;let i=String(s).trim();return i?[o.message_id,o.id,o.messageId,o.mes_id,o.swipe_id,a].map(c=>c==null?"":String(c).trim()).includes(i):!1};for(let o=n.length-1;o>=0;o-=1)if(r(n[o],o))return o;for(let o=n.length-1;o>=0;o-=1)if(this._isAssistantMessage(n[o]))return o;return-1}_buildMessageInjectedContext(e){let n=Object.entries(e&&typeof e=="object"?e:{}).sort(([,o],[,a])=>(o?.updatedAt||0)-(a?.updatedAt||0));if(!n.length)return"";let r=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[o,a]of n)r.push(`[${o}]`),r.push(a?.content||""),r.push("");return r.join(`
`)}_getWritableMessageField(e){let s=["mes","message","content","text"];for(let n of s)if(typeof e?.[n]=="string")return{key:n,text:e[n]};return{key:"mes",text:""}}_applyMessageText(e,s){let n=e&&typeof e=="object"?e:{},r=["mes","message","content","text"],o=!1;return r.forEach(a=>{typeof n[a]=="string"&&(n[a]=s,o=!0)}),o||(n.mes=s,n.message=s),n}_stripExistingToolOutput(e,s=[]){let n=String(e||"");return(Array.isArray(s)?s:[]).forEach(o=>{let a=String(o||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let u=new RegExp(a.slice(6).trim(),"gis");n=n.replace(u,"")}catch(u){this._log("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",a,u)}return}let i=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),c=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");n=n.replace(l,""),n=n.replace(c,"")}),n.trimEnd()}_stripPreviousStoredToolContent(e,s){let n=String(e||""),r=String(s||"").trim();return r?n.replace(r,"").trimEnd():n.trimEnd()}async _insertToolOutputToLatestAssistantMessage(e,s,n={},r=null){let o=r||this._createWritebackResult(e,n);try{let a=this._getChatRuntime(),{api:i,context:l,chat:c}=a;if(!Array.isArray(c)||!c.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),o.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",o;let u=this._findAssistantMessageIndex(c,n.sourceMessageId);if(u<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),o.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",o;o.messageIndex=u,o.steps.foundTargetMessage=!0;let d=c[u],{key:p,text:m}=this._getWritableMessageField(d);o.textField=p;let b=d[Be]&&typeof d[Be]=="object"?d[Be]:{},R=b?.[e]||{},S=R?.content||"",L=R?.blockText||S||"",ae=Object.entries(b).filter(([v])=>v!==e).map(([,v])=>v||{}),fe=String(s.content||"").trim(),M=this._inferBlockType(fe),z={toolId:e,messageId:n.sourceMessageId||d?.message_id||d?.messageId||u,blockType:M,insertedAt:s.updatedAt,replaceable:n.overwrite!==!1};o.blockIdentity=z;let N=n.overwrite===!1?{text:String(m||""),removed:!1}:this._stripExactStoredBlock(m,L),K=N.text,Ie="";n.overwrite!==!1&&L&&!N.removed&&(Ie="previous_block_not_found");let me=n.overwrite===!1?K:this._stripExistingToolOutput(K,n.extractionSelectors),P=me!==K;K=me;let Re=n.overwrite===!1?K:this._stripPreviousStoredToolContent(K,S),be=Re!==K;K=Re,o.replacedExistingBlock=N.removed||P||be;let xe=[(n.overwrite===!1?String(m||""):K).trimEnd(),fe].filter(Boolean).join(`

`).trim();o.insertedNewBlock=!!fe;let Ke=ae.every(v=>{let _=String(v?.blockText||v?.content||"").trim();return _?xe.includes(_):!0});o.preservedOtherToolBlocks=Ke,Ke?Ie&&(o.conflictDetected=!0,o.conflictReason=Ie):(o.conflictDetected=!0,o.conflictReason="other_tool_block_removed");let nt={...b,[e]:{toolId:e,content:fe,blockText:fe,blockType:M,blockIdentity:z,updatedAt:s.updatedAt,sourceMessageId:s.sourceMessageId||null}};d[p]=xe,this._applyMessageText(d,xe),d[Be]=nt,d[un]=this._buildMessageInjectedContext(nt),o.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,u,d),o.steps.runtimeSynced=!0;let Ye=l?.setChatMessages||i?.setChatMessages||a?.topWindow?.setChatMessages||null,rt=l?.setChatMessage||i?.setChatMessage||a?.topWindow?.setChatMessage||null,ot=!1;if(typeof Ye=="function")try{await Ye.call(l||i||a?.topWindow,[{message_id:u,message:xe,mes:xe,content:xe,text:xe}],{refresh:"affected"}),o.steps.hostSetChatMessages=!0,o.hostUpdateMethod=ws.SET_CHAT_MESSAGES,ot=!0}catch(v){this._log("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",v),o.errors.push(`setChatMessages: ${v?.message||String(v)}`)}if(!ot&&typeof rt=="function")try{await rt.call(l||i||a?.topWindow,{message:xe,mes:xe,content:xe,text:xe},u),o.steps.hostSetChatMessage=!0,o.hostUpdateMethod=ws.SET_CHAT_MESSAGE,ot=!0}catch(v){this._log("setChatMessage \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",v),o.errors.push(`setChatMessage: ${v?.message||String(v)}`)}if(ot||(o.hostUpdateMethod=ws.LOCAL_ONLY),typeof rt=="function")try{await rt.call(l||i||a?.topWindow,{},u)}catch(v){this._log("\u4F7F\u7528\u7A7A setChatMessage \u5F3A\u5236\u5237\u65B0\u5931\u8D25",v),o.errors.push(`setChatMessage(refresh): ${v?.message||String(v)}`)}let ce=l?.saveChat||i?.saveChat||null,de=l?.saveChatDebounced||i?.saveChatDebounced||null;typeof de=="function"&&(de.call(l||i),o.steps.saveChatDebounced=!0),typeof ce=="function"&&(await ce.call(l||i),o.steps.saveChat=!0),this._notifyMessageUpdated(a,u),o.steps.notifiedMessageUpdated=!0;let at=a?.contextChat?.[u]||a?.apiChat?.[u]||c[u]||d,Ft=this._getWritableMessageField(at).text||"",y=String(s.content||"").trim(),f=at?.[Be]?.[e];return o.verification.textIncludesContent=y?Ft.includes(y):!0,o.verification.mirrorStored=!!(f&&String(f.content||"").trim()===y),o.steps.verifiedAfterWrite=o.verification.textIncludesContent&&o.verification.mirrorStored,o.success=o.steps.localTextApplied&&o.steps.runtimeSynced&&o.steps.verifiedAfterWrite,o.writebackStatus=o.success?pn.SUCCESS:pn.FAILED,!o.success&&!o.error&&(o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),o.conflictDetected&&!o.error&&(o.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${o.conflictReason}`),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587: ${e} -> #${u}`),o}catch(a){return this._log("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",a),o.error=a?.message||String(a),o.errors.push(o.error),o}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext(),r=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(r)return r;let o=e.SillyTavern?.this_chid;if(o!=null)return`chat_char_${o}`}return"chat_default"}catch{return"chat_default"}}_log(...e){this.debugMode&&console.log("[ContextInjector]",...e)}},gn=new yn,Rl=gn});var Zo={};ue(Zo,{BUILTIN_VARIABLES:()=>Qo,VariableResolver:()=>fn,default:()=>Ml,variableResolver:()=>St});var Qo,fn,St,Ml,Cr=H(()=>{Se();Qo={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},fn=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,s){if(typeof e!="string")return e;let n=e;return n=this._resolveBuiltinVariables(n,s),n=this._resolveCustomVariables(n,s),n=this._resolveRegexVariables(n,s),n}resolveObject(e,s){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(r=>this.resolveObject(r,s));let n={};for(let[r,o]of Object.entries(e))typeof o=="string"?n[r]=this.resolveTemplate(o,s):typeof o=="object"&&o!==null?n[r]=this.resolveObject(o,s):n[r]=o;return n}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,s){e&&(this.customVariables.set(e,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,s){!e||typeof s!="function"||(this.variableHandlers.set(e,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,s]of Object.entries(Qo))e.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,n]of this.customVariables)e.push({name:`{{${s}}}`,description:typeof n=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},n={};for(let r of this.getAvailableVariables())n[r.category]||(n[r.category]=[]),n[r.category].push(r);for(let[r,o]of Object.entries(s))if(n[r]&&n[r].length>0){e.push(`\u3010${o}\u3011`);for(let a of n[r])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,s)=>(s.regexResults||s.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,s){let n=e;return n=n.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),n=n.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),n=n.replace(/\{\{chatHistory\}\}/gi,()=>{let r=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(r)}),n=n.replace(/\{\{characterCard\}\}/gi,()=>{let r=s.characterCard||s.raw?.characterCard;return r?this._formatCharacterCard(r):""}),n=n.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),n=n.replace(/\{\{toolId\}\}/gi,s.toolId||s.raw?.toolId||""),n=n.replace(/\{\{toolPromptMacro\}\}/gi,s.toolPromptMacro||s.raw?.toolPromptMacro||""),n=n.replace(/\{\{toolContentMacro\}\}/gi,s.toolContentMacro||s.raw?.toolContentMacro||""),n=n.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),n=n.replace(/\{\{extractedContent\}\}/gi,s.extractedContent||s.raw?.extractedContent||""),n=n.replace(/\{\{recentMessagesText\}\}/gi,s.recentMessagesText||s.raw?.recentMessagesText||""),n=n.replace(/\{\{rawRecentMessagesText\}\}/gi,s.rawRecentMessagesText||s.raw?.rawRecentMessagesText||""),n=n.replace(/\{\{userMessage\}\}/gi,s.userMessage||s.raw?.userMessage||""),n=n.replace(/\{\{previousToolOutput\}\}/gi,s.previousToolOutput||s.raw?.previousToolOutput||""),n}_resolveCustomVariables(e,s){let n=e;for(let[r,o]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(r)}\\}\\}`,"gi");typeof o=="function"?n=n.replace(a,()=>{try{return o(s)}catch(i){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}:`,i),""}}):n=n.replace(a,String(o))}return n}_resolveRegexVariables(e,s){let n=e;for(let[r,o]of this.variableHandlers){let a=new RegExp(`\\{\\{${r}\\.([^}]+)\\}\\}`,"gi");n=n.replace(a,(i,l)=>{try{return o(l,s)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}.${l}:`,c),""}})}return n}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(s=>{let n=s.role||"unknown",r=s.content||s.mes||"";return`[${n}]: ${r}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let s=[];return e.name&&s.push(`\u59D3\u540D: ${e.name}`),e.description&&s.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&s.push(`\u6027\u683C: ${e.personality}`),e.scenario&&s.push(`\u573A\u666F: ${e.scenario}`),s.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){this.debugMode&&console.log("[VariableResolver]",...e)}},St=new fn,Ml=St});var ta={};ue(ta,{DEFAULT_PROMPT_TEMPLATE:()=>ea,ToolPromptService:()=>mn,default:()=>Cl,toolPromptService:()=>hn});var ea,mn,hn,Cl,Pr=H(()=>{Se();Ss();Cr();ea="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",mn=class{constructor(){this.debugMode=!1}_buildVariableContext(e,s={}){let n=this._getPromptTemplate(e),r=St.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||""}),o=St.resolveTemplate(n,r).trim(),a=String(s?.toolContentMacro||s?.input?.toolContentMacro||"").trim();return St.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolPromptMacro:o,toolContentMacro:a})}buildToolMessages(e,s){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let n=[],r=this._buildVariableContext(e,s),o=this._getBypassMessages(e);if(o&&o.length>0)for(let i of o)i.enabled!==!1&&n.push({role:this._normalizeRole(i.role),content:St.resolveTemplate(i.content||"",r)});let a=this._buildUserContent(this._getPromptTemplate(e),r);return a&&n.push({role:"user",content:a}),this._log(`\u6784\u5EFA\u6D88\u606F: ${n.length} \u6761`),n}buildPromptText(e,s){return this._buildVariableContext(e,s).toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:ea}_getBypassMessages(e){return e.bypass?.enabled?B.buildBypassMessages(e):[]}_buildUserContent(e,s){return!e||!e.trim()?"":St.resolveTemplate(e,s).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){this.debugMode&&console.log("[ToolPromptService]",...e)}setDebugMode(e){this.debugMode=e}},hn=new mn,Cl=hn});var sa={};ue(sa,{LEGACY_OUTPUT_MODES:()=>Pl,OUTPUT_MODES:()=>Et,TOOL_FAILURE_STAGES:()=>ze,TOOL_RUNTIME_STATUS:()=>kl,TOOL_WRITEBACK_STATUS:()=>J,ToolOutputService:()=>bn,default:()=>Dl,toolOutputService:()=>ns});var Et,Pl,kl,ze,J,bn,ns,Dl,kr=H(()=>{Se();Ts();Mr();Pr();Zs();Ls();Et={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},Pl={inline:"follow_ai"},kl={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},ze={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},J={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"},bn=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled?!1:e.output?.mode===Et.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled)return!1;let s=e.output?.mode;return s===Et.FOLLOW_AI||s==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,s){let n=Date.now(),r=e.id,o=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=s?.sessionKey||"",i=this._getExtractionSelectors(e),l=e.output?.apiPreset||e.apiPreset||"",c="",u=J.NOT_APPLICABLE,d=null,p=[],m="";this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${r}`),k.emit(C.TOOL_EXECUTION_STARTED,{toolId:r,traceId:o,sessionKey:a,mode:Et.POST_RESPONSE_API});try{if(c=ze.BUILD_MESSAGES,p=await this._buildToolMessages(e,s),!p||p.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");this._log(`\u6784\u5EFA\u4E86 ${p.length} \u6761\u6D88\u606F`);let b=await this._getRequestTimeout();c=ze.SEND_API_REQUEST;let R=await this._sendApiRequest(l,p,{timeoutMs:b,signal:s.signal});if(c=ze.EXTRACT_OUTPUT,m=this._extractOutputContent(R,e),m){if(c=ze.INJECT_CONTEXT,d=await gn.injectDetailed(r,m,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.messageId||"",extractionSelectors:i,traceId:o,sessionKey:a}),!d?.success)throw u=J.FAILED,new Error(d?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=J.SUCCESS}else u=J.SKIPPED_EMPTY_OUTPUT;c="";let S=Date.now()-n;return k.emit(C.TOOL_EXECUTED,{toolId:r,traceId:o,sessionKey:a,success:!0,duration:S,mode:Et.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${r}, \u8017\u65F6 ${S}ms`),{success:!0,toolId:r,output:m,duration:S,meta:{traceId:o,sessionKey:a,messageCount:p.length,selectors:i,apiPreset:l,writebackStatus:u,failureStage:"",writebackDetails:d}}}catch(b){let R=Date.now()-n,S=c||ze.UNKNOWN,L=u||J.NOT_APPLICABLE;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${r}`,b),k.emit(C.TOOL_EXECUTION_FAILED,{toolId:r,traceId:o,sessionKey:a,error:b.message||String(b),duration:R}),{success:!1,toolId:r,error:b.message||String(b),duration:R,meta:{traceId:o,sessionKey:a,messageCount:p.length,selectors:i,apiPreset:l,writebackStatus:L,failureStage:S,writebackDetails:d}}}}async runToolInline(e,s){let n=Date.now(),r=e.id;try{let o=await this._buildToolMessages(e,s);return{success:!0,toolId:r,messages:o,duration:Date.now()-n}}catch(o){return{success:!1,toolId:r,error:o.message||String(o),duration:Date.now()-n}}}async previewExtraction(e,s){let n=this._buildRecentMessageExtractionEntries(e,s),r=this._joinMessageBlocks(n,"rawText"),o=this._joinMessageBlocks(n,"filteredText"),a=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0});return{success:!0,sourceText:r,filteredSourceText:o,extractedText:a,messageEntries:n,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,s){let n=this._buildRecentMessageExtractionEntries(e,s),r=this._joinMessageBlocks(n,"rawText"),o=this._joinMessageBlocks(n,"filteredText"),a=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0}),i={...s,rawRecentMessagesText:r,recentMessagesText:o,extractedContent:a,toolContentMacro:this._buildToolContentMacro(n),toolName:e.name,toolId:e.id};return hn.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let s=String(e).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,s,n={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:r=9e4,signal:o}=n,a=null;if(e){if(!zn(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=us(e)}else a=us();let i=Yt(a||{});if(!i.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:r,apiConfig:a},o);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return ke.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,s){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,s);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,s);if(e.content)return this._applyOutputExtractionSelectors(e.content,s);if(e.text)return this._applyOutputExtractionSelectors(e.text,s);if(e.message)return this._applyOutputExtractionSelectors(e.message,s);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),s)}catch{return this._applyOutputExtractionSelectors(String(e),s)}}return this._applyOutputExtractionSelectors(String(e),s)}_applyOutputExtractionSelectors(e,s){let n=typeof e=="string"?e:String(e||""),r=this._getExtractionSelectors(s);if(!r.length)return n.trim();let o=[];for(let a of r){let i=String(a||"").trim();if(!i)continue;if(i.startsWith("regex:")){let c=i.slice(6).trim();if(!c)continue;try{let u=new RegExp(c,"gi");[...n.matchAll(u)].forEach(p=>{let m=String(p?.[0]||"").trim();m&&o.push(m)})}catch(u){this._log("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:u})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(n.match(c)||[]).forEach(d=>{let p=String(d||"").trim();p&&o.push(p)})}catch(c){this._log("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}}return o.length>0?o.join(`

`).trim():n.trim()}_getExtractionSelectors(e){let s=e?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(n=>String(n||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(n=>String(n||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,s){return this._applyExtractionSelectorsInternal(e,s,{strict:!1})}_applyExtractionSelectorsInternal(e,s,n={}){let r=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(s),{strict:a=!1}=n;if(!o.length)return r.trim();let i=o.map((c,u)=>{let d=String(c||"").trim(),p=d.startsWith("regex:");return{id:`tool-extract-${u}`,type:p?"regex_include":"include",value:p?d.slice(6).trim():d,enabled:!0}}).filter(c=>c.value),l=kt(r,i,[]);return a?(l||"").trim():l||r.trim()}_extractToolContent(e,s){let n=typeof s=="string"?s:String(s||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(n,e,{strict:!0}):n.trim()}_applyGlobalContextRules(e){let s=typeof e=="string"?e:String(e||"");if(!s.trim())return"";try{let n=ut()||[],r=Dt()||[];return!Array.isArray(n)||n.length===0?s.trim():kt(s,n,r)||s.trim()}catch(n){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",n),s.trim()}}_getMessageText(e){if(!e)return"";let s=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let n of s)if(typeof n=="string"&&n.trim())return n.trim();return""}_collectRecentAssistantMessages(e,s){return this._collectRecentAssistantMessageEntries(e,s).map(n=>n.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,s){let n=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),r=Array.isArray(s?.chatMessages)?s.chatMessages:[],o=[];for(let i=r.length-1;i>=0&&o.length<n;i-=1){let l=r[i],c=String(l?.role||"").toLowerCase(),u=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,d=this._getMessageText(l);u&&d&&o.unshift({text:d,message:l,chatIndex:i})}if(o.length>0)return o;let a=s?.lastAiMessage||s?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,s){return this._collectRecentAssistantMessageEntries(e,s).map((r,o)=>{let a=r.text||"",i=this._applyGlobalContextRules(a),l=this._extractToolContent(e,a);return{...r,order:o+1,rawText:a,filteredText:i,extractedText:l}})}_joinMessageBlocks(e,s,n={}){let r=Array.isArray(e)?e:[],{skipEmpty:o=!1}=n;return r.map(i=>{let l=String(i?.[s]||"").trim();return o&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(r=>{let o=`\u3010\u7B2C ${r?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(r?.filteredText||"").trim()||"(\u7A7A)",i=String(r?.extractedText||"").trim()||"(\u7A7A)";return`${o}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(e){this.debugMode=e}_log(...e){(this.debugMode||ke.getDebugSettings()?.enableDebugLog)&&console.log("[ToolOutputService]",...e)}},ns=new bn,Dl=ns});var _a={};ue(_a,{AUTO_TRIGGER_SKIP_REASONS:()=>A,EVENT_TYPES:()=>w,TOOL_EXECUTION_PATHS:()=>Ut,checkGate:()=>zr,destroyToolTriggerManager:()=>_c,getAutoTriggerDiagnostics:()=>Ac,getChatContext:()=>jr,getCurrentCharacter:()=>Fr,getFullContext:()=>pc,getToolTriggerManagerState:()=>wc,getWorldbookContent:()=>fa,initToolTriggerManager:()=>Ea,initTriggerModule:()=>Nr,previewToolExtraction:()=>Wr,registerEventListener:()=>et,registerTriggerHandler:()=>yc,removeAllListeners:()=>dc,removeAllTriggerHandlers:()=>fc,resetGateState:()=>uc,runToolManually:()=>Yr,setDebugMode:()=>Ic,setTriggerHandlerEnabled:()=>gc,triggerState:()=>x,unregisterEventListener:()=>Or,updateGateState:()=>_t});function Bt(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Tn(t){if(!t)return"";let e=[t.mes,t.message,t.content,t.text,t?.data?.content];for(let s of e)if(typeof s=="string"&&s.trim())return s;return""}function W(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function _n(t){return new Promise(e=>setTimeout(e,t))}function wn(t,e){let s=[t?.message_id,t?.messageId,t?.id,t?.mes_id,e];for(let n of s){if(typeof n=="number"&&Number.isFinite(n))return n;if(typeof n=="string"&&n.trim())return n.trim()}return e}function Gr(t=[]){return(Array.isArray(t)?t:[]).map((s,n)=>({role:Cn(s),content:Tn(s),name:s?.name||"",timestamp:s?.send_date||s?.timestamp||"",isSystem:!!s?.is_system,isUser:!!s?.is_user,sourceId:wn(s,n),chatIndex:n,originalMessage:s}))}function An(t){let e=String(t||"").trim();return!(!e||e.length<5||/^[.。·•…\s]+$/.test(e))}function Ll(t,e=null,s={}){let{lockToMessageId:n=!1}=s,r=Gr(t),o=e==null||e===""?null:String(e).trim(),a=null,i=null;for(let l=r.length-1;l>=0;l-=1){let c=r[l],u=W(c.sourceId),d=o&&(u===o||String(c.chatIndex)===o);if(!a&&c.role==="assistant"&&An(c.content)&&(!o||!n||d)&&(a=c),!i&&c.role==="user"&&c.content&&(i=c),a&&i)break}return{messages:r,lastUserMessage:i,lastAiMessage:a}}async function Ul(t={}){let{preferredMessageId:e=null,retries:s=0,retryDelayMs:n=250,lockToMessageId:r=!1}=t,o={messages:[],lastUserMessage:null,lastAiMessage:null};for(let a=0;a<=s;a+=1){let i=await Rs();if(o=Ll(i,e,{lockToMessageId:r}),o.lastAiMessage?.content)return o;a<s&&await _n(n)}return o}function Bl(t="user_trigger_intent"){_t({lastUserSendIntentAt:Date.now(),lastUserIntentSource:t||"user_trigger_intent"})}function xn(){Bl("send_button_or_enter")}function zl(){let t=Bt(),e=t?.document;if(!e?.body)return!1;if(t.__YYT_sendIntentHooksInstalled)return!0;let s=["#send_but","#option_send","#send_button",'button[title*="\u53D1\u9001"]','button[title*="Send"]'],n=["#send_textarea","#send_textarea textarea","textarea#send_textarea",'textarea[data-testid="send_textarea"]'],r=(o,a,i)=>{o.forEach(l=>{let c=e.querySelector(l);c&&c.addEventListener(a,i,!0)})};return r(s,"click",()=>xn()),r(s,"pointerup",()=>xn()),r(s,"touchend",()=>xn()),r(n,"keydown",o=>{let a=o?.key||"";(a==="Enter"||a==="NumpadEnter")&&!o.shiftKey&&xn()}),t.__YYT_sendIntentHooksInstalled=!0,$("\u5DF2\u5B89\u88C5\u53D1\u9001\u610F\u56FE\u6355\u83B7\u94A9\u5B50"),!0}function jl(t,e={},s=!1){return s?!0:String(t||e?.type||"").trim().toLowerCase().includes("quiet")||e?.quiet===!0||e?.isQuiet===!0||e?.quiet_prompt===!0}function st(){return Bt().SillyTavern||null}function Fl(){return Bt().TavernHelper||null}function Hl(){let t=st();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function Kl(t=""){return t===w.MESSAGE_RECEIVED||t===w.MESSAGE_SENT||t===w.MESSAGE_UPDATED||t===w.MESSAGE_DELETED}function Lr(t){return!!t&&(typeof t.on=="function"||typeof t.addEventListener=="function")}function ua(t,e,s){if(!t||typeof s!="function")return!1;try{if(typeof t.off=="function")return t.off(e,s),!0;if(typeof t.removeListener=="function")return t.removeListener(e,s),!0;if(typeof t.removeEventListener=="function")return t.removeEventListener(e,s),!0}catch(n){D("warn","\u79FB\u9664\u4E8B\u4EF6\u76D1\u542C\u5931\u8D25",{eventName:e,error:n?.message||String(n)})}return!1}function Yl(t,e,s){Lr(t)&&(ne.eventSource=t,ne.eventTypes=e||ne.eventTypes||null,ne.source=s||ne.source||"unknown",D("info","\u7F13\u5B58\u4E8B\u4EF6\u6865\u63A5\u6210\u529F",{source:ne.source,hasOff:typeof t.off=="function",hasRemoveListener:typeof t.removeListener=="function",hasAddEventListener:typeof t.addEventListener=="function"}))}function As(){let t=Bt(),e=t.SillyTavern||null,s=e?.getContext?.()||null,n=[{source:"SillyTavern.eventSource",eventSource:e?.eventSource,eventTypes:e?.eventTypes||e?.event_types||null},{source:"topWindow.eventSource",eventSource:t?.eventSource,eventTypes:t?.event_types||t?.eventTypes||null},{source:"SillyTavern.getContext()",eventSource:s?.eventSource||null,eventTypes:s?.eventTypes||s?.event_types||null},{source:"scriptModule exports",eventSource:ne.scriptModule?.eventSource||null,eventTypes:ne.scriptModule?.event_types||ne.scriptModule?.eventTypes||null}];for(let r of n)if(Lr(r.eventSource))return Yl(r.eventSource,r.eventTypes,r.source),r;return{source:"",eventSource:null,eventTypes:null}}async function Wl(){let t=As();if(t.eventSource)return t;ne.loadingPromise||(ne.loadingPromise=(async()=>{try{let s=$l;ne.scriptModule=await import(s)}catch(s){ne.importError=s,D("warn","\u52A0\u8F7D /script.js \u4E8B\u4EF6\u6865\u63A5\u5931\u8D25",s?.message||String(s))}finally{ne.loadingPromise=null}})()),await ne.loadingPromise;let e=As();return e.eventSource?e:{source:"",eventSource:null,eventTypes:null}}function In(){return As().eventSource||ne.eventSource||null}function Rn(){return As().eventTypes||ne.eventTypes||w}function $(...t){(x.debugMode||ke.getDebugSettings()?.enableDebugLog)&&console.log("[YouYouToolkit:Trigger]",...t)}function D(t="info",...e){(typeof console[t]=="function"?console[t]:console.log)("[youyou_trigger]",...e)}function Ae(){let t=ke.getListenerSettings?.()||ke.getSettings?.()?.listener||{},e=parseInt(t?.debounceMs,10),s=parseInt(t?.messageSessionWindowMs,10),n=parseInt(t?.historyRetentionLimit,10);return{listenGenerationEnded:t?.listenGenerationEnded!==!1,ignoreQuietGeneration:t?.ignoreQuietGeneration!==!1,ignoreAutoTrigger:t?.ignoreAutoTrigger===!0,debounceMs:Number.isFinite(e)?Math.max(0,e):300,useMessageReceivedFallback:t?.useMessageReceivedFallback!==!1,useGenerationAfterCommandsFallback:t?.useGenerationAfterCommandsFallback!==!1,messageSessionWindowMs:Number.isFinite(s)?Math.max(300,s):1800,historyRetentionLimit:Number.isFinite(n)?Math.max(1,Math.min(50,n)):10}}function tt(t,e=""){if(t&&typeof t=="object")return W(t?.messageId??t?.id??t?.message_id??t?.mes_id);if(e===w.GENERATION_ENDED){if(typeof t=="number"&&Number.isFinite(t))return String(t);if(typeof t=="string"&&/^\d+$/.test(t.trim()))return t.trim()}return Kl(e)?W(t):""}function Vl(t,e,s){let n=W(s);if(!n)return!1;let r=W(wn(t,e));if(r&&r===n)return!0;let o=Number(n);return Number.isInteger(o)&&e===o}async function ql(t){let e=W(t);if(!e)return null;let s=await Rs();for(let n=s.length-1;n>=0;n-=1){let r=s[n];if(Vl(r,n,e))return{message:r,index:n}}return null}async function Jl(t,e={}){let{retries:s=0,retryDelayMs:n=80}=e,r=null;for(let o=0;o<=s;o+=1){if(r=await ql(t),r)return r;o<s&&await _n(n)}return null}function Xl(t,e,s){return W(s)?t===w.MESSAGE_RECEIVED||t===w.MESSAGE_UPDATED?!0:!!(e&&typeof e=="object"&&(e?.messageId!==void 0||e?.message_id!==void 0||e?.id!==void 0||e?.mes_id!==void 0)):!1}function pa(){let t=[x.gateState.lastUserSendIntentAt,x.gateState.lastUserMessageAt].filter(e=>Number(e)>0);return t.length>0?Math.max(...t):0}function ya(t=Date.now()){let e=pa();return e>0&&t-e<=da}function Ql(t="",e=null){return String(t||e?.type||"").trim().toLowerCase()}function Zl(t,e=null,s=Date.now()){let n=pa(),r=Ql(t,e);return n>0&&s-n<=da?{startedByUserIntent:!0,userIntentDetectedAt:n,userIntentSource:"recent_user_trigger_intent",userIntentDetail:"recent_user_send_or_message"}:Gl.has(r)?{startedByUserIntent:!0,userIntentDetectedAt:s,userIntentSource:`explicit_generation_action:${r}`,userIntentDetail:`generation_type_${r}`}:{startedByUserIntent:!1,userIntentDetectedAt:n,userIntentSource:"none",userIntentDetail:"no_recent_user_intent_or_explicit_generation_action"}}function Is(t=Cs()){let e=x.gateState.lastGenerationBaseline;return!e||t&&e.chatId&&e.chatId!==t?null:e}function Ur(t=Date.now()){return ya(t)?!0:!!Is()?.startedByUserIntent}function ra(t=null){let e=t||Is();return e?x.gateState.lastGenerationDryRun||e.dryRun?{eligible:!1,baseline:e,reason:A.DRY_RUN_GENERATION,detail:"dry_run_generation"}:{eligible:!0,baseline:e,reason:"",detail:""}:{eligible:!1,baseline:null,reason:A.NO_CONFIRMED_ASSISTANT_MESSAGE,detail:"missing_generation_baseline"}}function Br(t=Date.now()){return Number(x.gateState.uiTransitionGuardUntil)>t}function oa(t=""){let e=Date.now();_t({uiTransitionGuardUntil:e+na,lastUiTransitionAt:e,lastUiTransitionSource:t||""}),D("info","\u8FDB\u5165\u5BBF\u4E3B UI \u8FC7\u6E21\u5B88\u536B",{source:t||"unknown",guardUntil:e+na})}function aa(t=""){for(let e of T.pendingMessageTimers.values())clearTimeout(e);T.pendingMessageTimers.clear(),t&&D("info","\u5DF2\u6E05\u7406\u5F85\u6267\u884C\u81EA\u52A8\u89E6\u53D1\u5B9A\u65F6\u5668",{reason:t})}function ga(t=[],e={}){let s=st(),n=s?.getContext?.()||null,r=Gr(t),o=null;for(let a=r.length-1;a>=0;a-=1){let i=r[a];if(i.role==="assistant"&&An(i.content)){o=i;break}}return{traceId:e.traceId||Ms("generation"),startedAt:Number(e.startedAt)||Date.now(),capturedAt:Date.now(),chatId:Mn(s,n,null),messageCount:r.length,lastAssistantIndex:o?.chatIndex??-1,lastAssistantMessageId:W(o?.sourceId),lastAssistantPreview:String(o?.content||"").slice(0,160),dryRun:!!e.dryRun,generationType:e.type||"",generationParams:e.params||null,startedByUserIntent:!!e.startedByUserIntent,userIntentDetectedAt:Number(e.userIntentDetectedAt)||0,userIntentSource:e.userIntentSource||"",userIntentDetail:e.userIntentDetail||"",baselineResolved:e.baselineResolved!==void 0?!!e.baselineResolved:!0,baselineResolutionAt:Number(e.baselineResolutionAt)||0,provisional:!!e.provisional,baselineSource:e.baselineSource||""}}async function ec(t={}){let e=await Rs();return ga(e,{...t,baselineResolved:t.baselineResolved!==void 0?t.baselineResolved:!0,baselineResolutionAt:Number(t.baselineResolutionAt)||Date.now(),provisional:t.provisional===!0,baselineSource:t.baselineSource||"captured_chat_snapshot"})}function tc(t={}){return ga(Hl(),{...t,baselineResolved:!1,baselineResolutionAt:0,provisional:!0,baselineSource:t.baselineSource||"provisional_immediate_snapshot"})}async function Dr(t={}){let{chatId:e=Cs(),traceId:s="",retries:n=4,retryDelayMs:r=80}=t,o=null;for(let i=0;i<=n;i+=1){o=Is(e);let l=!s||!o?.traceId||o.traceId===s;if(o&&l&&o.baselineResolved!==!1)return o;i<n&&await _n(r)}return o&&(!s||!o?.traceId||o.traceId===s)?o:null}function sc(t=Date.now(),e=Is()){if(x.gateState.isGenerating)return!0;if(!e)return!1;let s=Number(x.gateState.lastGenerationAt)||0;return s<=0?!1:t-s<=Nl}function nc(t){return t?.message?{role:Cn(t.message),content:Tn(t.message),chatIndex:t.index,sourceId:W(wn(t.message,t.index))}:null}async function rc(t,e={}){let s=Date.now(),n=e?.traceId||x.gateState.lastGenerationTraceId||"",r=nc(t),o=await Dr({traceId:n,retries:4,retryDelayMs:80})||Is(),a=sc(s,o),i=!!(r&&o&&$r(r,o)),l=!n||!o?.traceId||o.traceId===n;return r?o?o.baselineResolved===!1?{allowed:!1,baseline:o,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",reason:A.NO_CONFIRMED_ASSISTANT_MESSAGE,detail:"generation_baseline_pending_resolution"}:l?!x.gateState.isGenerating&&!a?{allowed:!1,baseline:o,eventBelongsToCurrentGeneration:i,historicalReplayBlocked:!0,historicalReplayReason:"message_received_outside_active_generation",reason:A.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION,detail:"message_received_outside_active_generation"}:i?{allowed:!0,baseline:o,eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:"",reason:"",detail:"",messageEntry:r}:{allowed:!1,baseline:o,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!0,historicalReplayReason:"message_received_before_generation_baseline",reason:A.HISTORICAL_REPLAY_MESSAGE_RECEIVED,detail:"message_received_before_generation_baseline"}:{allowed:!1,baseline:o,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!0,historicalReplayReason:"message_received_trace_mismatch",reason:A.HISTORICAL_REPLAY_MESSAGE_RECEIVED,detail:"message_received_trace_mismatch"}:{allowed:!1,baseline:null,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!0,historicalReplayReason:"message_received_without_generation_baseline",reason:A.MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION,detail:"message_received_without_generation_baseline"}:{allowed:!1,baseline:o,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",reason:A.NO_CONFIRMED_ASSISTANT_MESSAGE,detail:"message_received_identity_not_resolved"}}function $r(t,e){if(!t||t.role!=="assistant"||!An(t.content))return!1;if(!e)return!0;if(Number.isInteger(e.lastAssistantIndex)&&e.lastAssistantIndex>=0)return t.chatIndex>e.lastAssistantIndex;let s=Number.isFinite(e.messageCount)?e.messageCount:0;return t.chatIndex>=s}async function oc(t=""){let e=W(t),s=st(),n=s?.getContext?.()||null,r=Mn(s,n,null),o=await Rs(),a=Gr(o),i=x.gateState.lastGenerationBaseline?.chatId===r?x.gateState.lastGenerationBaseline:null;if(e){let l=a.find(c=>W(c.sourceId)===e||String(c.chatIndex)===e);return l&&An(l.content)&&l.role==="assistant"&&(!i||$r(l,i))?l:null}if(!i)return null;for(let l=a.length-1;l>=0;l-=1){let c=a[l];if($r(c,i))return c}return null}async function Sn(t="",e={}){let{retries:s=0,retryDelayMs:n=250}=e,r=null;for(let o=0;o<=s;o+=1){if(r=await oc(t),r)return r;o<s&&await _n(n)}return null}function zt(){let t=x.gateState.lastGenerationBaseline;return{baselineResolved:t?.baselineResolved??!1,baselineResolutionAt:t?.baselineResolutionAt||0,provisionalBaseline:!!t?.provisional,generationStartedByUserIntent:!!t?.startedByUserIntent,generationUserIntentSource:t?.userIntentSource||"",generationUserIntentDetail:t?.userIntentDetail||"",lastUserIntentSource:x.gateState.lastUserIntentSource||""}}function ac(){let t=x.gateState.lastGenerationBaseline;return{sessionGenerationTraceId:x.gateState.lastGenerationTraceId||"",sessionGenerationStartedAt:t?.startedAt||0,sessionBaselineResolvedAtCreation:t?.baselineResolved??!1,sessionBaselineResolutionAtCreation:t?.baselineResolutionAt||0,sessionProvisionalBaselineAtCreation:!!t?.provisional,sessionGenerationStartedByUserIntent:!!t?.startedByUserIntent,sessionGenerationUserIntentSource:t?.userIntentSource||"",sessionGenerationUserIntentDetail:t?.userIntentDetail||"",sessionLastUserIntentSourceAtCreation:x.gateState.lastUserIntentSource||"",sessionGenerationCapturedAt:Date.now()}}function ic(t={}){let e=zt();return{stage:"",eventType:"",traceId:"",sessionKey:"",messageId:"",messageKey:"",messageRole:"",reason:"",skipReasonDetailed:"",confirmedAssistantMessageId:"",scheduledDelayMs:0,candidateToolIds:[],receivedAt:Date.now(),handledAt:0,generationTraceId:x.gateState.lastGenerationTraceId||"",generationDryRun:!!x.gateState.lastGenerationDryRun,generationStartedAt:x.gateState.lastGenerationBaseline?.startedAt||0,uiTransitionGuardActive:Br(),uiTransitionGuardUntil:x.gateState.uiTransitionGuardUntil||0,lastUiTransitionSource:x.gateState.lastUiTransitionSource||"",baselineMessageCount:x.gateState.lastGenerationBaseline?.messageCount||0,baselineAssistantId:x.gateState.lastGenerationBaseline?.lastAssistantMessageId||"",generationBaselineMessageCount:x.gateState.lastGenerationBaseline?.messageCount||0,generationBaselineAssistantId:x.gateState.lastGenerationBaseline?.lastAssistantMessageId||"",confirmationSource:"",isSpeculativeSession:!1,eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",registeredEvents:Array.from(T.listeners.keys()),listenerSettings:Ae(),hasRecentUserTriggerIntent:ya(),hasConfirmedUserTriggerIntent:Ur(),...e,...t}}function he(t={}){let e=ic(t);return T.lastEventDebugSnapshot=e,$("\u81EA\u52A8\u89E6\u53D1\u4E8B\u4EF6\u5FEB\u7167:",e),e}function lc(){let t=Ae();return t.listenGenerationEnded===!1?{skip:!0,reason:A.LISTENER_DISABLED,listenerSettings:t}:t.ignoreAutoTrigger&&!Ur()?{skip:!0,reason:A.IGNORED_AUTO_TRIGGER,listenerSettings:t}:{skip:!1,reason:"",listenerSettings:t}}function cc(t={}){let e=zt();return{triggerEvent:"",traceId:"",sessionKey:"",messageId:"",messageKey:"",selectedToolIds:[],skipReason:"",skipReasonDetailed:"",lockedAiMessageId:"",confirmedAssistantMessageId:"",confirmationSource:"",eventBelongsToCurrentGeneration:!1,historicalReplayBlocked:!1,historicalReplayReason:"",generationTraceId:x.gateState.lastGenerationTraceId||"",...e,triggeredAt:Date.now(),...t}}function Tt(t={}){let e=cc(t);return T.lastAutoTriggerSnapshot=e,$("\u81EA\u52A8\u89E6\u53D1\u5FEB\u7167:",e),e}function rs(t,e){(Array.isArray(t)?t:[]).forEach(n=>{n?.id&&Zt(n.id,{lastTriggerAt:Date.now(),...e},{touchLastRunAt:!1,emitEvent:!1})})}function Mn(t,e,s){let r=[e?.chatId,e?.chat_id,e?.chat_filename,e?.chatMetadata?.chatId,e?.chatMetadata?.chat_id,e?.chatMetadata?.file_name,e?.chatMetadata?.name,t?.chatId,t?.chat_id,t?.chat_filename].find(o=>typeof o=="string"&&o.trim());return r||(s?.id!==void 0&&s?.id!==null?`chat_char_${s.id}`:t?.this_chid!==void 0&&t?.this_chid!==null?`chat_char_${t.this_chid}`:"chat_default")}function et(t,e,s={}){if(!t||typeof e!="function")return $("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u51FD\u6570"),D("warn","\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5931\u8D25\uFF1A\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u65E0\u6548",{eventType:t}),()=>{};let{once:n=!1,priority:r=0}=s,o=In(),i=Rn()[t]||t,l=async(...c)=>{try{if(D("info","\u6536\u5230\u4E8B\u4EF6",t,c[0]??null),s.gateCheck&&!await zr(s.gateCheck)){$(`\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6: ${t}`),D("warn","\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6",t);return}await e(...c),n&&Or(t,l)}catch(u){console.error("[YouYouToolkit:Trigger] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF:",u)}};if(x.listeners.has(t)||x.listeners.set(t,new Set),x.listeners.get(t).add(l),o&&typeof o.on=="function")o.on(i,l),$(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),D("info","\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u6E90\u76D1\u542C",{eventType:t,stEventType:i});else if(o&&typeof o.addEventListener=="function")o.addEventListener(i,l),$(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),D("info","\u5DF2\u6CE8\u518C addEventListener \u4E8B\u4EF6\u76D1\u542C",{eventType:t,stEventType:i});else{let c=Bt();c.addEventListener&&(c.addEventListener(i,l),$(`\u5DF2\u6CE8\u518CDOM\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),D("warn","\u4E8B\u4EF6\u6E90\u4E0D\u53EF\u7528\uFF0C\u56DE\u9000\u4E3A DOM \u4E8B\u4EF6\u76D1\u542C",{eventType:t,stEventType:i}))}return()=>Or(t,l)}function Or(t,e){let s=x.listeners.get(t);if(s&&s.has(e)){s.delete(e);let n=In(),o=Rn()[t]||t;if(ua(n,o,e))$(`\u5DF2\u53D6\u6D88\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`);else{let a=Bt();a.removeEventListener&&a.removeEventListener(o,e)}}}function dc(){let t=In(),e=Rn();for(let[s,n]of x.listeners){let r=e[s]||s;for(let o of n)if(!ua(t,r,o)){let a=Bt();a.removeEventListener&&a.removeEventListener(r,o)}}x.listeners.clear(),$("\u5DF2\u79FB\u9664\u6240\u6709\u4E8B\u4EF6\u76D1\u542C\u5668")}async function zr(t){if(!t)return!0;let e=Date.now(),s=x.gateState;if(t.minInterval&&s.lastGenerationAt&&e-s.lastGenerationAt<t.minInterval)return $("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u77ED"),!1;if(t.maxInterval&&s.lastUserMessageAt&&e-s.lastUserMessageAt>t.maxInterval)return $("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u957F"),!1;if(t.requireUserMessage&&!s.lastUserMessageId)return $("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u7F3A\u5C11\u7528\u6237\u6D88\u606F"),!1;if(t.excludeQuietGeneration&&s.lastGenerationType==="quiet")return $("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: quiet\u751F\u6210\u88AB\u6392\u9664"),!1;if(t.customCheck&&typeof t.customCheck=="function")try{if(!await t.customCheck(s))return $("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u81EA\u5B9A\u4E49\u68C0\u67E5\u8FD4\u56DEfalse"),!1}catch(n){return console.error("[YouYouToolkit:Trigger] \u81EA\u5B9A\u4E49\u95E8\u63A7\u68C0\u67E5\u9519\u8BEF:",n),!1}return!0}function _t(t){Object.assign(x.gateState,t)}function uc(){x.gateState={lastUserSendIntentAt:0,lastUserIntentSource:"",lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationTraceId:"",lastGenerationType:null,lastGenerationParams:null,lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1,lastGenerationBaseline:null,uiTransitionGuardUntil:0,lastUiTransitionAt:0,lastUiTransitionSource:""}}async function jr(t={}){let{depth:e=3,includeUser:s=!0,includeAssistant:n=!0,includeSystem:r=!1,format:o="messages"}=t;if(!st())return $("\u65E0\u6CD5\u83B7\u53D6SillyTavern API"),null;try{let i=await Rs(),l=[],c=Math.max(0,i.length-e);for(let u=c;u<i.length;u++){let d=i[u];if(!d)continue;let p=Cn(d);if(!(p==="user"&&!s)&&!(p==="system"&&!r)&&!(p==="assistant"&&!n))if(o==="messages"){let m=Tn(d);l.push({role:p,content:m,name:d.name||"",timestamp:d.send_date||d.timestamp,isSystem:!!d.is_system,isUser:!!d.is_user})}else l.push(Tn(d))}return{messages:l,totalMessages:i.length,startIndex:c,endIndex:i.length-1}}catch(i){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u804A\u5929\u4E0A\u4E0B\u6587\u5931\u8D25:",i),null}}function Cn(t){if(!t)return"assistant";if(t.is_user)return"user";if(t.is_system)return"system";let e=String(t.role||"").toLowerCase();return e==="user"||e==="assistant"||e==="system"?e:"assistant"}async function Rs(){let t=Fl(),e=st();if(t?.getChatMessages)try{let s=-1;if(typeof t.getLastMessageId=="function"&&(s=t.getLastMessageId()),!Number.isFinite(s)||s<0){let n=e?.getContext?.()||null,r=Array.isArray(n?.chat)?n.chat:[],o=Array.isArray(e?.chat)?e.chat:[];s=(r.length?r:o).length-1}if(Number.isFinite(s)&&s>=0){let n=await t.getChatMessages(`0-${s}`,{include_swipes:!1,include_hidden:!0});if(Array.isArray(n)&&n.length>0)return n}}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 TavernHelper \u8BFB\u53D6\u804A\u5929\u6D88\u606F\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u9ED8\u8BA4\u6765\u6E90:",s)}try{let s=e?.getContext?.()||null;if(Array.isArray(s?.chat)&&s.chat.length>0)return s.chat}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 getContext() \u8BFB\u53D6\u804A\u5929\u5931\u8D25:",s)}return Array.isArray(e?.chat)?e.chat:[]}async function Fr(){let t=st();if(!t)return null;try{let e=t.this_chid,s=t.characters||[];if(e>=0&&e<s.length){let n=s[e];return{id:e,name:n.name||"",description:n.description||"",personality:n.personality||"",scenario:n.scenario||"",firstMes:n.first_mes||"",mesExample:n.mes_example||""}}return null}catch(e){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e),null}}async function fa(t={}){let{enabledOnly:e=!0,maxLength:s=1e4}=t,n=st();if(!n)return"";try{let o=(n.lorebook||[]).entries||[],a=[],i=0;for(let l of o){if(e&&!l.enabled)continue;let c=l.content||"";c&&i+c.length<=s&&(a.push(c),i+=c.length)}return a.join(`

`)}catch(r){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u5931\u8D25:",r),""}}async function pc(t={}){let[e,s,n]=await Promise.all([jr(t.chat||{}),Fr(),fa(t.worldbook||{})]);return{chat:e,character:s,worldbook:n,timestamp:Date.now()}}function yc(t,e){if(!t||!e)return $("\u65E0\u6548\u7684\u5904\u7406\u5668ID\u6216\u914D\u7F6E"),()=>{};let{eventType:s,handler:n,gateCondition:r,priority:o=0}=e;if(!s||typeof n!="function")return $("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u5904\u7406\u5668\u51FD\u6570"),()=>{};x.handlers.set(t,{eventType:s,handler:n,gateCondition:r,priority:o,enabled:!0});let a=et(s,async(...i)=>{let l=x.handlers.get(t);!l||!l.enabled||l.gateCondition&&!await zr(l.gateCondition)||await l.handler(...i)},{priority:o});return $(`\u5DF2\u6CE8\u518C\u89E6\u53D1\u5904\u7406\u5668: ${t}`),()=>{a(),x.handlers.delete(t),$(`\u5DF2\u53D6\u6D88\u89E6\u53D1\u5904\u7406\u5668: ${t}`)}}function gc(t,e){let s=x.handlers.get(t);s&&(s.enabled=e,$(`\u89E6\u53D1\u5904\u7406\u5668 ${t} \u5DF2${e?"\u542F\u7528":"\u7981\u7528"}`))}function fc(){x.handlers.clear(),$("\u5DF2\u79FB\u9664\u6240\u6709\u89E6\u53D1\u5904\u7406\u5668")}function Ms(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function ma(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function Cs(){let t=st(),e=t?.getContext?.()||null;return Mn(t,e,null)}function Hr(t,e,s=""){let n=t||Cs(),r=W(e);return`${n}::${r||`event:${s||"unknown"}:latest`}`}function mc(t,e,s={}){let n=W(s?.messageId||tt(e,t)),r=s?.chatId||Cs(),o=s?.sessionKey||Hr(r,n,t),a=Date.now(),i=zt(),l=ac();return{sessionKey:o,traceId:s?.traceId||Ms("session"),chatId:r,messageId:n,messageKey:s?.messageKey||"",messageRole:s?.messageRole||"",confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"",isSpeculativeSession:!!s?.isSpeculativeSession,eventBelongsToCurrentGeneration:!!s?.eventBelongsToCurrentGeneration,historicalReplayBlocked:!!s?.historicalReplayBlocked,historicalReplayReason:s?.historicalReplayReason||"",skipReasonDetailed:s?.skipReasonDetailed||"",firstEventType:s?.eventType||t||"",receivedEvents:t?[t]:[],phase:s?.phase||G.RECEIVED,skipReason:s?.skipReason||"",scheduledAt:0,handledAt:0,completedAt:0,candidateToolIds:Array.isArray(s?.candidateToolIds)?[...s.candidateToolIds]:[],executionPathIds:Array.isArray(s?.executionPathIds)?[...s.executionPathIds]:[],sourceMessageLocked:!!n,baselineResolved:s?.baselineResolved??i.baselineResolved,baselineResolutionAt:s?.baselineResolutionAt??i.baselineResolutionAt,provisionalBaseline:s?.provisionalBaseline??i.provisionalBaseline,generationStartedByUserIntent:s?.generationStartedByUserIntent??i.generationStartedByUserIntent,generationUserIntentSource:s?.generationUserIntentSource||i.generationUserIntentSource,generationUserIntentDetail:s?.generationUserIntentDetail||i.generationUserIntentDetail,lastUserIntentSource:s?.lastUserIntentSource||i.lastUserIntentSource,sessionGenerationTraceId:s?.sessionGenerationTraceId||l.sessionGenerationTraceId,sessionGenerationStartedAt:s?.sessionGenerationStartedAt??l.sessionGenerationStartedAt,sessionBaselineResolvedAtCreation:s?.sessionBaselineResolvedAtCreation??l.sessionBaselineResolvedAtCreation,sessionBaselineResolutionAtCreation:s?.sessionBaselineResolutionAtCreation??l.sessionBaselineResolutionAtCreation,sessionProvisionalBaselineAtCreation:s?.sessionProvisionalBaselineAtCreation??l.sessionProvisionalBaselineAtCreation,sessionGenerationStartedByUserIntent:s?.sessionGenerationStartedByUserIntent??l.sessionGenerationStartedByUserIntent,sessionGenerationUserIntentSource:s?.sessionGenerationUserIntentSource||l.sessionGenerationUserIntentSource,sessionGenerationUserIntentDetail:s?.sessionGenerationUserIntentDetail||l.sessionGenerationUserIntentDetail,sessionLastUserIntentSourceAtCreation:s?.sessionLastUserIntentSourceAtCreation||l.sessionLastUserIntentSourceAtCreation,sessionGenerationCapturedAt:s?.sessionGenerationCapturedAt??l.sessionGenerationCapturedAt,createdAt:a,updatedAt:a}}function hc(t=Date.now()){let{messageSessionWindowMs:e}=Ae();for(let[s,n]of T.messageSessions.entries()){let r=n?.completedAt||n?.handledAt||n?.updatedAt||n?.createdAt||0;r>0&&t-r>e&&T.messageSessions.delete(s)}}function as(t,e,s={}){hc();let n=W(s?.messageId||tt(e,t)),r=s?.chatId||Cs(),o=s?.sessionKey||Hr(r,n,t),a=T.messageSessions.get(o);return a?(t&&!a.receivedEvents.includes(t)&&a.receivedEvents.push(t),n&&!a.messageId&&(a.messageId=n,a.sourceMessageLocked=!0),s?.messageRole&&(a.messageRole=s.messageRole),s?.confirmedAssistantMessageId&&(a.confirmedAssistantMessageId=s.confirmedAssistantMessageId),s?.confirmationSource&&(a.confirmationSource=s.confirmationSource),s?.skipReasonDetailed&&(a.skipReasonDetailed=s.skipReasonDetailed),s?.eventBelongsToCurrentGeneration!==void 0&&(a.eventBelongsToCurrentGeneration=!!s.eventBelongsToCurrentGeneration),s?.historicalReplayBlocked!==void 0&&(a.historicalReplayBlocked=!!s.historicalReplayBlocked),s?.historicalReplayReason&&(a.historicalReplayReason=s.historicalReplayReason),s?.isSpeculativeSession!==void 0&&(a.isSpeculativeSession=!!s.isSpeculativeSession),s?.candidateToolIds&&(a.candidateToolIds=[...s.candidateToolIds]),ge(a,{})):(a=mc(t,e,{...s,chatId:r,sessionKey:o,messageId:n}),T.messageSessions.set(o,a),a)}function ge(t,e={}){if(!t)return null;let s=zt();return Object.assign(t,s,e,{updatedAt:Date.now()}),t}function bc(t,e){return!t||!e||t.sessionKey===e||(T.messageSessions.delete(t.sessionKey),t.sessionKey=e,t.updatedAt=Date.now(),T.messageSessions.set(e,t)),t}function pe(t,e={}){if(!t)return null;let{historyRetentionLimit:s}=Ae(),n=zt(),r={id:e?.id||Ms("session_hist"),at:e?.at||Date.now(),traceId:t.traceId,sessionKey:t.sessionKey,phase:e?.phase||t.phase,eventType:e?.eventType||t.firstEventType,messageId:e?.messageId||t.messageId,messageKey:e?.messageKey||t.messageKey,messageRole:e?.messageRole||t.messageRole,confirmedAssistantMessageId:e?.confirmedAssistantMessageId||t.confirmedAssistantMessageId||"",confirmationSource:e?.confirmationSource||t.confirmationSource||"",isSpeculativeSession:e?.isSpeculativeSession??t.isSpeculativeSession??!1,eventBelongsToCurrentGeneration:e?.eventBelongsToCurrentGeneration??t.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:e?.historicalReplayBlocked??t.historicalReplayBlocked??!1,historicalReplayReason:e?.historicalReplayReason||t.historicalReplayReason||"",generationTraceId:e?.generationTraceId||x.gateState.lastGenerationTraceId||"",generationStartedAt:e?.generationStartedAt||x.gateState.lastGenerationBaseline?.startedAt||0,generationDryRun:e?.generationDryRun??!!x.gateState.lastGenerationDryRun,baselineResolved:e?.baselineResolved??t.baselineResolved??n.baselineResolved,baselineResolutionAt:e?.baselineResolutionAt??t.baselineResolutionAt??n.baselineResolutionAt,provisionalBaseline:e?.provisionalBaseline??t.provisionalBaseline??n.provisionalBaseline,generationStartedByUserIntent:e?.generationStartedByUserIntent??t.generationStartedByUserIntent??n.generationStartedByUserIntent,generationUserIntentSource:e?.generationUserIntentSource||t.generationUserIntentSource||n.generationUserIntentSource,generationUserIntentDetail:e?.generationUserIntentDetail||t.generationUserIntentDetail||n.generationUserIntentDetail,lastUserIntentSource:e?.lastUserIntentSource||t.lastUserIntentSource||n.lastUserIntentSource,sessionGenerationTraceId:e?.sessionGenerationTraceId||t.sessionGenerationTraceId||"",sessionGenerationStartedAt:e?.sessionGenerationStartedAt??t.sessionGenerationStartedAt??0,sessionBaselineResolvedAtCreation:e?.sessionBaselineResolvedAtCreation??t.sessionBaselineResolvedAtCreation??!1,sessionBaselineResolutionAtCreation:e?.sessionBaselineResolutionAtCreation??t.sessionBaselineResolutionAtCreation??0,sessionProvisionalBaselineAtCreation:e?.sessionProvisionalBaselineAtCreation??t.sessionProvisionalBaselineAtCreation??!1,sessionGenerationStartedByUserIntent:e?.sessionGenerationStartedByUserIntent??t.sessionGenerationStartedByUserIntent??!1,sessionGenerationUserIntentSource:e?.sessionGenerationUserIntentSource||t.sessionGenerationUserIntentSource||"",sessionGenerationUserIntentDetail:e?.sessionGenerationUserIntentDetail||t.sessionGenerationUserIntentDetail||"",sessionLastUserIntentSourceAtCreation:e?.sessionLastUserIntentSourceAtCreation||t.sessionLastUserIntentSourceAtCreation||"",sessionGenerationCapturedAt:e?.sessionGenerationCapturedAt??t.sessionGenerationCapturedAt??Date.now(),skipReason:e?.skipReason||t.skipReason||"",skipReasonDetailed:e?.skipReasonDetailed||t.skipReasonDetailed||"",candidateToolIds:Array.isArray(e?.candidateToolIds)?[...e.candidateToolIds]:[...t.candidateToolIds||[]],executionPathIds:Array.isArray(e?.executionPathIds)?[...e.executionPathIds]:[...t.executionPathIds||[]]};return T.recentSessionHistory=ma([...T.recentSessionHistory,r],s),r}function Gt(t,e={}){let s=Array.isArray(t)?t:[],{historyRetentionLimit:n}=Ae();s.forEach(r=>{r?.id&&vs(r.id,"trigger",e,{limit:n,emitEvent:!1})})}function xc(t,e={}){if(!t)return;let{historyRetentionLimit:s}=Ae();vs(t,"writeback",e,{limit:s,emitEvent:!1})}function os(t){if(!t||typeof t!="object")return t;let e=ha(t);return{...t,...e,receivedEvents:Array.isArray(t.receivedEvents)?[...t.receivedEvents]:void 0,candidateToolIds:Array.isArray(t.candidateToolIds)?[...t.candidateToolIds]:void 0,executionPathIds:Array.isArray(t.executionPathIds)?[...t.executionPathIds]:void 0,driftReasons:Array.isArray(e.driftReasons)?[...e.driftReasons]:[]}}function Lt(t){return String(t||"").trim()}function ha(t){if(!t||typeof t!="object")return{driftDetected:!1,generationTraceDrifted:!1,generationUserIntentDrifted:!1,baselineResolvedStateChanged:!1,baselineResolutionAdvancedSinceSessionCreation:!1,driftReasons:[]};if(!(t.sessionGenerationCapturedAt!==void 0||t.sessionGenerationTraceId!==void 0||t.sessionBaselineResolvedAtCreation!==void 0||t.sessionGenerationStartedByUserIntent!==void 0||t.sessionGenerationUserIntentSource!==void 0||t.sessionGenerationUserIntentDetail!==void 0))return{driftDetected:!1,generationTraceDrifted:!1,generationUserIntentDrifted:!1,baselineResolvedStateChanged:!1,baselineResolutionAdvancedSinceSessionCreation:!1,driftReasons:[]};let s=Lt(t.sessionGenerationTraceId),n=Lt(t.generationTraceId),r=Lt(t.sessionGenerationUserIntentSource),o=Lt(t.generationUserIntentSource),a=Lt(t.sessionGenerationUserIntentDetail),i=Lt(t.generationUserIntentDetail),l=!!s&&!!n&&s!==n,c=!!t.sessionGenerationStartedByUserIntent!=!!t.generationStartedByUserIntent||(r||o?r!==o:!1)||(a||i?a!==i:!1),u=!!t.sessionBaselineResolvedAtCreation!=!!t.baselineResolved,d=(Number(t.baselineResolutionAt)||0)>(Number(t.sessionBaselineResolutionAtCreation)||0),p=[];return l&&p.push("generation_trace_changed"),c&&p.push("generation_user_intent_changed"),u&&p.push("baseline_resolved_state_changed"),d&&p.push("baseline_resolution_advanced"),{driftDetected:p.length>0,generationTraceDrifted:l,generationUserIntentDrifted:c,baselineResolvedStateChanged:u,baselineResolutionAdvancedSinceSessionCreation:d,driftReasons:p}}function ia(t=[]){return(Array.isArray(t)?t:[]).reduce((e,s)=>{let n=Lt(s?.phase)||"unknown";return e[n]=(e[n]||0)+1,e},{})}function la(t=[]){let e={entryCount:0,driftDetectedCount:0,generationTraceDriftCount:0,generationUserIntentDriftCount:0,baselineResolvedStateChangedCount:0,baselineResolutionAdvancedCount:0};for(let s of Array.isArray(t)?t:[]){let n=ha(s);e.entryCount+=1,n.driftDetected&&(e.driftDetectedCount+=1),n.generationTraceDrifted&&(e.generationTraceDriftCount+=1),n.generationUserIntentDrifted&&(e.generationUserIntentDriftCount+=1),n.baselineResolvedStateChanged&&(e.baselineResolvedStateChangedCount+=1),n.baselineResolutionAdvancedSinceSessionCreation&&(e.baselineResolutionAdvancedCount+=1)}return e}function ba(){let t=As(),e=t.eventSource||ne.eventSource||null;return{source:t.source||ne.source||"",ready:Lr(e),hasImportedScriptModule:!!ne.scriptModule,importError:ne.importError?.message||""}}function xa(){let t=x.gateState.lastGenerationBaseline;return{lastUserSendIntentAt:x.gateState.lastUserSendIntentAt||0,lastUserIntentSource:x.gateState.lastUserIntentSource||"",lastUserMessageId:W(x.gateState.lastUserMessageId),lastUserMessageAt:x.gateState.lastUserMessageAt||0,lastGenerationTraceId:x.gateState.lastGenerationTraceId||"",lastGenerationType:x.gateState.lastGenerationType||"",lastGenerationDryRun:!!x.gateState.lastGenerationDryRun,lastGenerationAt:x.gateState.lastGenerationAt||0,isGenerating:!!x.gateState.isGenerating,uiTransitionGuardUntil:x.gateState.uiTransitionGuardUntil||0,lastUiTransitionAt:x.gateState.lastUiTransitionAt||0,lastUiTransitionSource:x.gateState.lastUiTransitionSource||"",baselineMessageCount:t?.messageCount||0,baselineAssistantId:t?.lastAssistantMessageId||"",...zt()}}function vc(t){let e=Date.now();return T.lastDuplicateMessageKey===t&&e-T.lastDuplicateMessageAt<Ol?!1:(T.lastDuplicateMessageKey=t,T.lastDuplicateMessageAt=e,!0)}function gt(t,e,s={}){let n=W(s?.messageId||tt(e,t)),r=as(t,e,{eventType:t,messageId:n,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",skipReasonDetailed:s?.skipReasonDetailed||"speculative_session_only",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeSession:!0}),o=s?.reason||A.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,a=s?.skipReasonDetailed||"speculative_session_only";return D("info","\u8BB0\u5F55 speculative session\uFF0C\u672A\u8FDB\u5165\u6267\u884C\u8C03\u5EA6",{eventType:t,traceId:r?.traceId||"",sessionKey:r?.sessionKey||"",messageId:n,reason:o,detail:a}),he({stage:"speculative_observed",eventType:t,traceId:r?.traceId||"",sessionKey:r?.sessionKey||"",messageId:n,reason:o,skipReasonDetailed:a,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",isSpeculativeSession:!0,eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",handledAt:Date.now()}),ge(r,{phase:G.IGNORED,skipReason:o,skipReasonDetailed:a,confirmationSource:s?.confirmationSource||"none",confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeSession:!0,completedAt:Date.now()}),pe(r,{phase:G.IGNORED,eventType:t,messageId:n,skipReason:o,skipReasonDetailed:a,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",eventBelongsToCurrentGeneration:s?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:s?.historicalReplayBlocked??!1,historicalReplayReason:s?.historicalReplayReason||"",isSpeculativeSession:!0}),r}function ca(t,e,s=0,n={}){let r=W(n?.confirmedAssistantMessageId||n?.messageId||tt(e,t));if(!r)return gt(t,e,{...n,reason:n?.reason||A.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:n?.skipReasonDetailed||"missing_confirmed_message_identity",confirmationSource:n?.confirmationSource||"none"});let o=typeof e=="object"&&e?{...e,messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||e?.confirmationSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??e?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??e?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||e?.historicalReplayReason||""}:{messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||""},a=as(t,o,{...n,eventType:t,messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??o.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??o.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||o.historicalReplayReason||"",isSpeculativeSession:!1}),i=Number.isFinite(s)?Math.max(0,s):Ae().debounceMs,l=a?.sessionKey||`message::${r}`,c=T.pendingMessageTimers.get(l);c&&clearTimeout(c),ge(a,{phase:G.SCHEDULED,messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??o.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??o.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||o.historicalReplayReason||"",isSpeculativeSession:!1,scheduledAt:Date.now()}),pe(a,{phase:G.SCHEDULED,eventType:t,messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??o.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??o.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||o.historicalReplayReason||"",isSpeculativeSession:!1}),he({stage:"scheduled",eventType:t,traceId:a?.traceId||"",sessionKey:a?.sessionKey||"",messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",isSpeculativeSession:!1,eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||"",scheduledDelayMs:i}),D("info","\u5DF2\u8C03\u5EA6\u786E\u8BA4\u540E\u7684\u81EA\u52A8\u89E6\u53D1",{eventType:t,messageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",delayMs:i});let u=setTimeout(async()=>{T.pendingMessageTimers.delete(l),ge(a,{phase:G.DISPATCHING,confirmationSource:n?.confirmationSource||o.confirmationSource||"",confirmedAssistantMessageId:r,isSpeculativeSession:!1}),pe(a,{phase:G.DISPATCHING,eventType:t,messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",isSpeculativeSession:!1}),he({stage:"dispatching",eventType:t,traceId:a?.traceId||"",sessionKey:a?.sessionKey||"",messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",isSpeculativeSession:!1,eventBelongsToCurrentGeneration:n?.eventBelongsToCurrentGeneration??!1,historicalReplayBlocked:n?.historicalReplayBlocked??!1,historicalReplayReason:n?.historicalReplayReason||"",scheduledDelayMs:i}),await Sa(t,o)},i);return T.pendingMessageTimers.set(l,u),a}function En(t){let e=t?.chatId||"chat_default",s=t?.messageId===void 0||t?.messageId===null||t?.messageId===""?"latest":String(t.messageId);return`${e}::${s}`}function va(t,e){return e?.triggerEvent==="MANUAL"?t.output?.mode===Et.POST_RESPONSE_API?Ut.MANUAL_POST_RESPONSE_API:Ut.MANUAL_COMPATIBILITY:Ut.AUTO_POST_RESPONSE_API}async function Sa(t,e){$(`${t}\u89E6\u53D1:`,e);let s=typeof e=="object"&&e?String(e?.confirmationSource||"").trim():"";D("info","\u5F00\u59CB\u5904\u7406\u81EA\u52A8\u89E6\u53D1",{eventType:t,incomingMessageId:tt(e,t),confirmationSource:s});let n=Tc(w.GENERATION_ENDED),r=n.map(S=>S.id),o=lc(),a=tt(e,t),i=!!(typeof e=="object"&&e&&e?.eventBelongsToCurrentGeneration),l=!!(typeof e=="object"&&e&&e?.historicalReplayBlocked),c=typeof e=="object"&&e?String(e?.historicalReplayReason||"").trim():"",u=W((typeof e=="object"&&e?e?.confirmedAssistantMessageId:"")||a),d=as(t,e,{eventType:t,messageId:a,confirmedAssistantMessageId:u,confirmationSource:s,eventBelongsToCurrentGeneration:i,historicalReplayBlocked:l,historicalReplayReason:c,candidateToolIds:r});if(ge(d,{phase:G.HANDLING,handledAt:Date.now(),confirmedAssistantMessageId:u,confirmationSource:s,isSpeculativeSession:!1,eventBelongsToCurrentGeneration:i,historicalReplayBlocked:l,historicalReplayReason:c,candidateToolIds:r}),pe(d,{phase:G.HANDLING,eventType:t,messageId:a,confirmedAssistantMessageId:u,confirmationSource:s,isSpeculativeSession:!1,eventBelongsToCurrentGeneration:i,historicalReplayBlocked:l,historicalReplayReason:c,candidateToolIds:r}),he({stage:"handling",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:a,confirmedAssistantMessageId:u,confirmationSource:s,isSpeculativeSession:!1,eventBelongsToCurrentGeneration:i,historicalReplayBlocked:l,historicalReplayReason:c,candidateToolIds:r,handledAt:Date.now()}),Br()&&!Ur()){D("warn","\u5F53\u524D\u5904\u4E8E\u5BBF\u4E3B UI \u8FC7\u6E21\u5B88\u536B\u7A97\u53E3\uFF0C\u81EA\u52A8\u89E6\u53D1\u76F4\u63A5\u5FFD\u7565",{eventType:t,candidateToolIds:r,uiTransitionGuardUntil:x.gateState.uiTransitionGuardUntil,lastUiTransitionSource:x.gateState.lastUiTransitionSource||""}),Tt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:a,selectedToolIds:r,skipReason:A.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:u,confirmationSource:s,lockedAiMessageId:a||""}),rs(n,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:A.UNRELATED_UI_EVENT,lastExecutionPath:"",lastWritebackStatus:J.NOT_APPLICABLE,lastFailureStage:""}),he({stage:"ignored_ui_transition_guard",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:a,reason:A.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r,handledAt:Date.now()}),ge(d,{phase:G.IGNORED,skipReason:A.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:u,confirmationSource:s,completedAt:Date.now(),candidateToolIds:r}),pe(d,{phase:G.IGNORED,eventType:t,messageId:a,skipReason:A.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r}),Gt(n,{traceId:d?.traceId||"",eventType:t,messageId:a,messageKey:"",skipReason:A.UNRELATED_UI_EVENT,executionPath:"",writebackStatus:J.NOT_APPLICABLE,failureStage:""});return}if(x.gateState.lastGenerationDryRun){D("warn","\u5F53\u524D generation \u4E3A dryRun\uFF0C\u81EA\u52A8\u89E6\u53D1\u76F4\u63A5\u963B\u65AD",{eventType:t,candidateToolIds:r,generationTraceId:x.gateState.lastGenerationTraceId||""}),Tt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:a,selectedToolIds:r,skipReason:A.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:u,confirmationSource:s,lockedAiMessageId:a||""}),rs(n,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:A.DRY_RUN_GENERATION,lastExecutionPath:"",lastWritebackStatus:J.NOT_APPLICABLE,lastFailureStage:""}),he({stage:"skipped",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:a,reason:A.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r,handledAt:Date.now()}),ge(d,{phase:G.SKIPPED,skipReason:A.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:u,confirmationSource:s,completedAt:Date.now(),candidateToolIds:r}),pe(d,{phase:G.SKIPPED,eventType:t,messageId:a,skipReason:A.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r}),Gt(n,{traceId:d?.traceId||"",eventType:t,messageId:a,messageKey:"",skipReason:A.DRY_RUN_GENERATION,executionPath:"",writebackStatus:J.NOT_APPLICABLE,failureStage:""});return}if(o.skip){D("warn","\u6839\u636E\u76D1\u542C\u5668\u8BBE\u7F6E\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1",{eventType:t,reason:o.reason,listenerSettings:o.listenerSettings,candidateToolIds:r}),Tt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:a,selectedToolIds:r,skipReason:o.reason,skipReasonDetailed:`listener_setting_${o.reason}`,confirmedAssistantMessageId:u,confirmationSource:s,lockedAiMessageId:a||""}),rs(n,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:o.reason,lastExecutionPath:"",lastWritebackStatus:J.NOT_APPLICABLE,lastFailureStage:""}),he({stage:"skipped",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:a,reason:o.reason,skipReasonDetailed:`listener_setting_${o.reason}`,confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r,handledAt:Date.now()}),ge(d,{phase:G.SKIPPED,skipReason:o.reason,skipReasonDetailed:`listener_setting_${o.reason}`,confirmedAssistantMessageId:u,confirmationSource:s,completedAt:Date.now(),candidateToolIds:r}),pe(d,{phase:G.SKIPPED,eventType:t,messageId:a,skipReason:o.reason,skipReasonDetailed:`listener_setting_${o.reason}`,confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r}),Gt(n,{traceId:d?.traceId||"",eventType:t,messageId:a,messageKey:"",skipReason:o.reason,executionPath:"",writebackStatus:J.NOT_APPLICABLE,failureStage:""});return}if(o.listenerSettings.ignoreQuietGeneration&&jl(x.gateState.lastGenerationType,x.gateState.lastGenerationParams,x.gateState.lastGenerationDryRun)){$("\u68C0\u6D4B\u5230 quiet / dryRun \u751F\u6210\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u81EA\u52A8\u6267\u884C"),D("warn","\u68C0\u6D4B\u5230 quiet/dryRun\uFF0C\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1",{eventType:t,candidateToolIds:r}),Tt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",selectedToolIds:r,skipReason:A.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:u,confirmationSource:s}),rs(n,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:A.QUIET_GENERATION,lastExecutionPath:"",lastWritebackStatus:J.NOT_APPLICABLE,lastFailureStage:""}),he({stage:"skipped",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:a,reason:A.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r,handledAt:Date.now()}),ge(d,{phase:G.SKIPPED,skipReason:A.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:u,confirmationSource:s,completedAt:Date.now(),candidateToolIds:r}),pe(d,{phase:G.SKIPPED,eventType:t,messageId:a,skipReason:A.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:u,confirmationSource:s,candidateToolIds:r}),Gt(n,{traceId:d?.traceId||"",eventType:t,messageId:a,messageKey:"",skipReason:A.QUIET_GENERATION,executionPath:"",writebackStatus:J.NOT_APPLICABLE,failureStage:""});return}let p=await Kr({...typeof e=="object"&&e?e:{},triggerEvent:t,...a?{messageId:a}:{},...u?{confirmedAssistantMessageId:u}:{},...s?{confirmationSource:s}:{},traceId:d?.traceId||"",sessionKey:d?.sessionKey||""});p.traceId=d?.traceId||p.traceId||Ms("exec"),p.sessionKey=d?.sessionKey||p.sessionKey||"";let m=Hr(p.chatId,p.messageId,t);if(bc(d,m),ge(d,{messageId:p.messageId||a,messageKey:En(p),confirmedAssistantMessageId:p.confirmedAssistantMessageId||u,confirmationSource:p.confirmationSource||s,sourceMessageLocked:!!p.messageId}),!p?.lastAiMessage){$(`${t} \u540E\u672A\u8BFB\u53D6\u5230\u6700\u65B0 AI \u56DE\u590D\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u6267\u884C`),D("warn","\u672A\u8BFB\u53D6\u5230\u6709\u6548 AI \u56DE\u590D\uFF0C\u81EA\u52A8\u89E6\u53D1\u4E2D\u6B62",{eventType:t,preferredMessageId:a,candidateToolIds:r});let S=En(p||{});Tt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||"",messageKey:S,selectedToolIds:r,skipReason:A.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,lockedAiMessageId:p?.messageId||""}),rs(n,{lastTriggerEvent:t,lastMessageKey:S,lastSkipReason:A.MISSING_AI_MESSAGE,lastExecutionPath:"",lastWritebackStatus:J.NOT_APPLICABLE,lastFailureStage:""}),he({stage:"skipped",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||a,messageKey:S,reason:A.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:r,handledAt:Date.now()}),ge(d,{phase:G.SKIPPED,skipReason:A.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",messageKey:S,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,completedAt:Date.now(),candidateToolIds:r}),pe(d,{phase:G.SKIPPED,eventType:t,messageId:p?.messageId||a,messageKey:S,skipReason:A.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:r}),Gt(n,{traceId:d?.traceId||"",eventType:t,messageId:p?.messageId||a,messageKey:S,skipReason:A.MISSING_AI_MESSAGE,executionPath:"",writebackStatus:J.NOT_APPLICABLE,failureStage:""});return}let b=En(p);if(T.lastHandledMessageKey===b){vc(b)&&($(`\u68C0\u6D4B\u5230\u91CD\u590D\u81EA\u52A8\u89E6\u53D1\uFF0C\u8DF3\u8FC7: ${b}`),D("warn","\u547D\u4E2D\u81EA\u52A8\u53BB\u91CD\uFF0C\u8DF3\u8FC7\u6267\u884C",{eventType:t,messageKey:b,candidateToolIds:r}),Tt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||"",messageKey:b,selectedToolIds:r,skipReason:A.DUPLICATE_MESSAGE,skipReasonDetailed:"message_key_already_handled",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,lockedAiMessageId:p?.messageId||""}),rs(n,{lastTriggerEvent:t,lastMessageKey:b,lastSkipReason:A.DUPLICATE_MESSAGE,lastExecutionPath:"",lastWritebackStatus:J.NOT_APPLICABLE,lastFailureStage:""}),he({stage:"skipped",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||a,messageKey:b,reason:A.DUPLICATE_MESSAGE,skipReasonDetailed:"message_key_already_handled",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:r,handledAt:Date.now()}),ge(d,{phase:G.SKIPPED,skipReason:A.DUPLICATE_MESSAGE,skipReasonDetailed:"message_key_already_handled",messageKey:b,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,completedAt:Date.now(),candidateToolIds:r}),pe(d,{phase:G.SKIPPED,eventType:t,messageId:p?.messageId||a,messageKey:b,skipReason:A.DUPLICATE_MESSAGE,skipReasonDetailed:"message_key_already_handled",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:r}),Gt(n,{traceId:d?.traceId||"",eventType:t,messageId:p?.messageId||a,messageKey:b,skipReason:A.DUPLICATE_MESSAGE,executionPath:"",writebackStatus:J.NOT_APPLICABLE,failureStage:""}));return}let R=n;if(R.length===0){$("\u6CA1\u6709\u9700\u8981\u6267\u884C\u7684\u5DE5\u5177"),D("warn","\u5F53\u524D\u4E8B\u4EF6\u672A\u547D\u4E2D\u4EFB\u4F55\u53EF\u6267\u884C\u5DE5\u5177",{eventType:t,messageKey:b,candidateToolIds:r}),Tt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||"",messageKey:b,selectedToolIds:[],skipReason:A.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,lockedAiMessageId:p?.messageId||""}),he({stage:"skipped",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||a,messageKey:b,reason:A.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:[],handledAt:Date.now()}),ge(d,{phase:G.SKIPPED,skipReason:A.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",messageKey:b,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,completedAt:Date.now(),candidateToolIds:[]}),pe(d,{phase:G.SKIPPED,eventType:t,messageId:p?.messageId||a,messageKey:b,skipReason:A.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:[]});return}T.lastHandledMessageKey=b,T.lastDuplicateMessageKey="",T.lastDuplicateMessageAt=0,p.messageKey=b,Tt({triggerEvent:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||"",messageKey:b,selectedToolIds:R.map(S=>S.id),skipReason:"",confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,lockedAiMessageId:p?.messageId||""}),$(`\u9700\u8981\u6267\u884C ${R.length} \u4E2A\u5DE5\u5177:`,R.map(S=>S.id)),D("info","\u81EA\u52A8\u89E6\u53D1\u547D\u4E2D\u5DE5\u5177",{eventType:t,messageKey:b,toolIds:R.map(S=>S.id)}),Ve("info",`\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u5F00\u59CB\u81EA\u52A8\u6267\u884C ${R.length} \u4E2A\u5DE5\u5177`,{duration:2400,noticeId:"yyt-tool-batch-start"}),ge(d,{messageKey:b,candidateToolIds:R.map(S=>S.id),executionPathIds:[],confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,phase:G.DISPATCHING}),pe(d,{phase:G.DISPATCHING,eventType:t,messageId:p?.messageId||a,messageKey:b,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:R.map(S=>S.id)}),Gt(R,{traceId:d?.traceId||"",eventType:t,messageId:p?.messageId||a,messageKey:b,skipReason:"",executionPath:Ut.AUTO_POST_RESPONSE_API,writebackStatus:"",failureStage:""});for(let S of R)try{let L=await Ta(S,p),ae=va(S,p);d.executionPathIds.includes(ae)||d.executionPathIds.push(ae),xc(S.id,{traceId:d?.traceId||"",eventType:t,messageId:p?.messageId||a,messageKey:b,executionPath:ae,writebackStatus:L?.result?.meta?.writebackStatus||L?.meta?.writebackStatus||J.NOT_APPLICABLE,failureStage:L?.result?.meta?.failureStage||L?.meta?.failureStage||"",success:!!L?.success}),L.success?($(`\u5DE5\u5177 ${S.id} \u6267\u884C\u6210\u529F`),k.emit(C.TOOL_EXECUTED,{toolId:S.id,result:L.result||L.data||L})):$(`\u5DE5\u5177 ${S.id} \u6267\u884C\u5931\u8D25:`,L.error)}catch(L){console.error(`[ToolTrigger] \u5DE5\u5177\u6267\u884C\u5931\u8D25: ${S.id}`,L)}T.lastExecutionContext=p,he({stage:"completed",eventType:t,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:p?.messageId||a,messageKey:b,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:R.map(S=>S.id),handledAt:Date.now()}),ge(d,{phase:G.COMPLETED,messageKey:b,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,completedAt:Date.now(),candidateToolIds:R.map(S=>S.id)}),pe(d,{phase:G.COMPLETED,eventType:t,messageId:p?.messageId||a,messageKey:b,confirmedAssistantMessageId:p?.confirmedAssistantMessageId||u,confirmationSource:p?.confirmationSource||s,candidateToolIds:R.map(S=>S.id),executionPathIds:[...d.executionPathIds||[]]})}async function Sc(t,e,s){return s||t.output?.mode===Et.POST_RESPONSE_API?ns.runToolPostResponse(t,e):dn(t.id,e)}function Ea(){if(T.initialized){$("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316");return}Ec(),T.initialized=!0,$("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316"),k.emit(C.TOOL_TRIGGER_INITIALIZED)}function Ec(){let t=et(w.GENERATION_ENDED,async n=>{let r=tt(n,w.GENERATION_ENDED),o=x.gateState.lastGenerationTraceId||"",a=as(w.GENERATION_ENDED,n,{eventType:w.GENERATION_ENDED,messageId:r});he({stage:"received",eventType:w.GENERATION_ENDED,traceId:a?.traceId||"",sessionKey:a?.sessionKey||"",messageId:r,receivedAt:Date.now()}),pe(a,{phase:G.RECEIVED,eventType:w.GENERATION_ENDED,messageId:r});let i=await Dr({traceId:o,retries:6,retryDelayMs:80}),l=ra(i);if(!l.eligible){gt(w.GENERATION_ENDED,n,{messageId:r,reason:l.reason,skipReasonDetailed:l.detail,confirmationSource:"none"});return}let c=await Sn(r,{retries:r?3:8,retryDelayMs:r?120:260}),u=W(c?.sourceId);if(!u){gt(w.GENERATION_ENDED,n,{messageId:r,reason:A.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:"missing_new_assistant_message_after_generation",confirmationSource:"none",eventBelongsToCurrentGeneration:!!i,historicalReplayBlocked:!1,historicalReplayReason:""});return}await Sa(w.GENERATION_ENDED,{...typeof n=="object"&&n?n:{},messageId:u,confirmedAssistantMessageId:u,confirmationSource:"generation_ended",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""})}),e=et(w.GENERATION_AFTER_COMMANDS,async n=>{let r=tt(n,w.GENERATION_AFTER_COMMANDS),o=x.gateState.lastGenerationTraceId||"",{debounceMs:a}=Ae(),i=as(w.GENERATION_AFTER_COMMANDS,n,{eventType:w.GENERATION_AFTER_COMMANDS,messageId:r});if(he({stage:"received",eventType:w.GENERATION_AFTER_COMMANDS,traceId:i?.traceId||"",sessionKey:i?.sessionKey||"",messageId:r,receivedAt:Date.now(),scheduledDelayMs:a}),pe(i,{phase:G.RECEIVED,eventType:w.GENERATION_AFTER_COMMANDS,messageId:r}),!Ae().useGenerationAfterCommandsFallback){ge(i,{phase:G.IGNORED,skipReason:"generation_after_commands_fallback_disabled",completedAt:Date.now()}),pe(i,{phase:G.IGNORED,eventType:w.GENERATION_AFTER_COMMANDS,messageId:r,skipReason:"generation_after_commands_fallback_disabled"});return}let l=await Dr({traceId:o,retries:6,retryDelayMs:80}),c=ra(l);if(!r){gt(w.GENERATION_AFTER_COMMANDS,n,{reason:A.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,skipReasonDetailed:c.eligible?"generation_after_commands_without_message_identity":c.detail,confirmationSource:"none"});return}if(!c.eligible){gt(w.GENERATION_AFTER_COMMANDS,n,{messageId:r,reason:c.reason,skipReasonDetailed:c.detail,confirmationSource:"none"});return}let u=await Sn(r,{retries:2,retryDelayMs:120}),d=W(u?.sourceId);if(!d){gt(w.GENERATION_AFTER_COMMANDS,n,{messageId:r,reason:A.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,skipReasonDetailed:"generation_after_commands_message_not_confirmed",confirmationSource:"none",eventBelongsToCurrentGeneration:!!l,historicalReplayBlocked:!1,historicalReplayReason:""});return}ca(w.GENERATION_AFTER_COMMANDS,n,a,{messageId:r,confirmedAssistantMessageId:d,confirmationSource:"generation_after_commands",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""})}),s=et(w.MESSAGE_RECEIVED,async n=>{let r=tt(n,w.MESSAGE_RECEIVED),o=r?await Jl(r,{retries:3,retryDelayMs:120}):null,a=o?.message||null,i=a?Cn(a):"",l=o?W(wn(a,o.index)):"",c=r||l,{debounceMs:u}=Ae(),d=as(w.MESSAGE_RECEIVED,n,{eventType:w.MESSAGE_RECEIVED,messageId:c,messageRole:i});if(!r){D("info","MESSAGE_RECEIVED \u7F3A\u5C11\u6D88\u606F\u8EAB\u4EFD\uFF0C\u5224\u5B9A\u4E3A\u5BBF\u4E3B UI \u5E72\u6270\u4E8B\u4EF6\uFF0C\u8DF3\u8FC7",{rawEventData:n??null}),he({stage:"ignored_ui_side_effect",eventType:w.MESSAGE_RECEIVED,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:"",messageRole:i,reason:A.UNRELATED_UI_EVENT,handledAt:Date.now()}),ge(d,{phase:G.IGNORED,skipReason:A.UNRELATED_UI_EVENT,completedAt:Date.now(),messageRole:i}),pe(d,{phase:G.IGNORED,eventType:w.MESSAGE_RECEIVED,messageId:"",messageRole:i,skipReason:A.UNRELATED_UI_EVENT});return}if(he({stage:"received",eventType:w.MESSAGE_RECEIVED,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:c,messageRole:i,receivedAt:Date.now(),scheduledDelayMs:u}),pe(d,{phase:G.RECEIVED,eventType:w.MESSAGE_RECEIVED,messageId:c,messageRole:i}),!Ae().useMessageReceivedFallback){ge(d,{phase:G.IGNORED,skipReason:"message_received_fallback_disabled",completedAt:Date.now(),messageRole:i}),pe(d,{phase:G.IGNORED,eventType:w.MESSAGE_RECEIVED,messageId:c,messageRole:i,skipReason:"message_received_fallback_disabled"});return}if(!o){gt(w.MESSAGE_RECEIVED,n,{messageId:r,reason:A.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:"message_received_identity_not_resolved",confirmationSource:"none"});return}if(a&&i!=="assistant"){D("info","MESSAGE_RECEIVED \u547D\u4E2D\u975E AI \u6D88\u606F\uFF0C\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1\u8C03\u5EA6",{messageId:c,messageRole:i}),he({stage:"ignored_non_assistant",eventType:w.MESSAGE_RECEIVED,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:c,messageRole:i,reason:A.NON_ASSISTANT_MESSAGE,handledAt:Date.now()}),ge(d,{phase:G.IGNORED,skipReason:A.NON_ASSISTANT_MESSAGE,completedAt:Date.now(),messageRole:i}),pe(d,{phase:G.IGNORED,eventType:w.MESSAGE_RECEIVED,messageId:c,messageRole:i,skipReason:A.NON_ASSISTANT_MESSAGE});return}let p=await rc(o,{traceId:x.gateState.lastGenerationTraceId||""});if(!p.allowed){gt(w.MESSAGE_RECEIVED,n,{messageId:c,reason:p.reason,skipReasonDetailed:p.detail,confirmationSource:"none",eventBelongsToCurrentGeneration:p.eventBelongsToCurrentGeneration,historicalReplayBlocked:p.historicalReplayBlocked,historicalReplayReason:p.historicalReplayReason});return}let m=await Sn(c,{retries:3,retryDelayMs:120}),b=W(m?.sourceId);if(!b){gt(w.MESSAGE_RECEIVED,n,{messageId:c,reason:A.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:"message_received_not_confirmed_as_new_assistant",confirmationSource:"none",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""});return}ca(w.MESSAGE_RECEIVED,n,u,{messageId:c,confirmedAssistantMessageId:b,confirmationSource:"message_received",eventBelongsToCurrentGeneration:!0,historicalReplayBlocked:!1,historicalReplayReason:""})});T.listeners.set(w.GENERATION_ENDED,t),T.listeners.set(w.GENERATION_AFTER_COMMANDS,e),T.listeners.set(w.MESSAGE_RECEIVED,s)}async function Kr(t){let e=await Fr(),s=st(),n=s?.getContext?.()||null,r=t?.triggerEvent||"GENERATION_ENDED",o=W(t?.confirmedAssistantMessageId||tt(t,r)),a=String(t?.confirmationSource||"").trim(),i=r==="MANUAL"||r==="MANUAL_PREVIEW",l=null,c=W(o);i||(l=await Sn(c,{retries:c?3:8,retryDelayMs:c?120:260}),l&&(c=W(l.sourceId)));let u=Xl(r,t,c)||!!c,d=await Ul({preferredMessageId:c||null,retries:i||c?2:0,retryDelayMs:120,lockToMessageId:u}),p=d.messages||[],m=d.lastUserMessage,b=d.lastAiMessage;i||(l?W(b?.sourceId)!==c&&(b=l):b=null);let R=c||W(b?.sourceId)||"";return{triggeredAt:Date.now(),triggerEvent:r,traceId:t?.traceId||"",sessionKey:t?.sessionKey||"",confirmationSource:a,confirmedAssistantMessageId:R,chatId:Mn(s,n,e),messageId:R,lastAiMessage:b?.content||"",userMessage:m?.content||x.gateState.lastUserMessageText||"",chatMessages:p,input:{userMessage:m?.content||x.gateState.lastUserMessageText||"",lastAiMessage:b?.content||"",extractedContent:"",previousToolOutput:"",context:{character:e?.name||"",chatLength:p.length||0}},config:{},status:"pending"}}function Tc(t){return Ir(t).filter(s=>ns.shouldRunPostResponse(s))}function vn(t,e){try{vr(t,e)}catch(s){console.warn("[ToolTrigger] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",t,s)}}async function Ta(t,e){let s=Date.now(),n=t.id,r=e?.triggerEvent==="MANUAL",o=`yyt-tool-run-${n}`,a=va(t,e),i=e?.messageKey||En(e||{});vn(n,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||w.GENERATION_ENDED,lastMessageKey:i,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:"",lastFailureStage:""}),k.emit(C.TOOL_EXECUTION_REQUESTED,{toolId:n,traceId:e?.traceId||"",triggerEvent:e?.triggerEvent||"GENERATION_ENDED",context:e}),Ve("info",`${r?"\u6B63\u5728\u624B\u52A8\u6267\u884C":"\u5DF2\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u6B63\u5728\u81EA\u52A8\u6267\u884C"} ${t.name}`,{sticky:!0,noticeId:o}),D("info","\u5F00\u59CB\u6267\u884C\u5DE5\u5177",{toolId:n,toolName:t.name,triggerEvent:e?.triggerEvent,executionPath:a,messageKey:i});try{let l=await Sc(t,e,r),c=Date.now()-s;if(l?.success){let p=oe(n);vn(n,{lastStatus:"success",lastError:"",lastDurationMs:c,lastTraceId:e?.traceId||"",successCount:(p?.runtime?.successCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||w.GENERATION_ENDED,lastMessageKey:i,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:l?.meta?.writebackStatus||J.NOT_APPLICABLE,lastFailureStage:l?.meta?.failureStage||""});let m=r?`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`:`\u5DF2\u76D1\u542C AI \u56DE\u590D\u5E76\u6267\u884C ${t.name}`;return h("success",m),Ve("success",m,{duration:3200,noticeId:o}),D("info","\u5DE5\u5177\u6267\u884C\u6210\u529F",{toolId:n,traceId:e?.traceId||"",executionPath:a,duration:c,writebackStatus:l?.meta?.writebackStatus||J.NOT_APPLICABLE}),{success:!0,duration:c,result:l}}let u=oe(n),d=l?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25";return vn(n,{lastStatus:"error",lastError:d,lastDurationMs:c,lastTraceId:e?.traceId||"",errorCount:(u?.runtime?.errorCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||w.GENERATION_ENDED,lastMessageKey:i,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:l?.meta?.writebackStatus||J.NOT_APPLICABLE,lastFailureStage:l?.meta?.failureStage||(a===Ut.MANUAL_COMPATIBILITY?ze.COMPATIBILITY_EXECUTE:ze.UNKNOWN)}),h("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),Ve("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),D("error","\u5DE5\u5177\u6267\u884C\u5931\u8D25",{toolId:n,traceId:e?.traceId||"",executionPath:a,duration:c,error:d,failureStage:l?.meta?.failureStage||""}),{success:!1,duration:c,error:d,result:l}}catch(l){let c=Date.now()-s,u=oe(n),d=l?.message||String(l);throw vn(n,{lastStatus:"error",lastError:d,lastDurationMs:c,lastTraceId:e?.traceId||"",errorCount:(u?.runtime?.errorCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||w.GENERATION_ENDED,lastMessageKey:i,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:J.NOT_APPLICABLE,lastFailureStage:a===Ut.MANUAL_COMPATIBILITY?ze.COMPATIBILITY_EXECUTE:ze.UNKNOWN}),h("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),Ve("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),D("error","\u5DE5\u5177\u6267\u884C\u629B\u51FA\u5F02\u5E38",{toolId:n,traceId:e?.traceId||"",executionPath:a,duration:c,error:d}),l}}async function Yr(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=oe(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return Zt(t,{lastTriggerAt:Date.now(),lastTriggerEvent:"MANUAL",lastMessageKey:"",lastSkipReason:A.TOOL_DISABLED,lastExecutionPath:"",lastWritebackStatus:J.NOT_APPLICABLE,lastFailureStage:""},{touchLastRunAt:!1,emitEvent:!1}),Ve("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let s=await Kr({triggerEvent:"MANUAL"});return D("info","\u624B\u52A8\u6267\u884C\u5DE5\u5177",{toolId:t}),Ta(e,s)}async function Wr(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=oe(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await Kr({triggerEvent:"MANUAL_PREVIEW"});return ns.previewExtraction(e,s)}function _c(){for(let t of T.pendingMessageTimers.values())clearTimeout(t);T.pendingMessageTimers.clear();for(let t of T.listeners.values())typeof t=="function"&&t();T.listeners.clear(),T.messageSessions.clear(),T.recentSessionHistory=[],T.initialized=!1,T.lastExecutionContext=null,T.lastHandledMessageKey="",T.lastAutoTriggerSnapshot=null,T.lastEventDebugSnapshot=null,T.lastDuplicateMessageKey="",T.lastDuplicateMessageAt=0,$("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u9500\u6BC1")}function wc(){let t=Array.from(T.messageSessions.values()).map(os).filter(Boolean).sort((s,n)=>(Number(s?.updatedAt)||0)-(Number(n?.updatedAt)||0)),e=[...T.recentSessionHistory].map(os).filter(Boolean);return{initialized:T.initialized,listenersCount:T.listeners.size,activeSessionCount:T.messageSessions.size,activeSessions:t,recentSessionHistory:e,lastExecutionContext:T.lastExecutionContext,lastAutoTriggerSnapshot:T.lastAutoTriggerSnapshot,lastEventDebugSnapshot:T.lastEventDebugSnapshot,registeredEvents:Array.from(T.listeners.keys()),pendingTimerCount:T.pendingMessageTimers.size,lastHandledMessageKey:T.lastHandledMessageKey,listenerSettings:Ae(),eventBridge:ba(),gateState:xa()}}function Ac(t={}){let e=parseInt(t?.historyLimit,10),s=Number.isFinite(e)?Math.max(1,Math.min(50,e)):8,n=x.gateState.lastGenerationBaseline,r=Array.from(T.messageSessions.values()).map(os).filter(Boolean).sort((l,c)=>(Number(l?.updatedAt)||0)-(Number(c?.updatedAt)||0)),o=ma([...T.recentSessionHistory],s).map(os),a={activeSessions:ia(r),recentSessionHistory:ia(o)},i={activeSessions:la(r),recentSessionHistory:la(o)};return{summary:{generationTraceId:x.gateState.lastGenerationTraceId||"",generationType:x.gateState.lastGenerationType||"",generationDryRun:!!x.gateState.lastGenerationDryRun,generationStartedAt:n?.startedAt||0,generationEndedAt:x.gateState.lastGenerationAt||0,isGenerating:!!x.gateState.isGenerating,baselineMessageCount:n?.messageCount||0,baselineAssistantId:n?.lastAssistantMessageId||"",uiTransitionGuardActive:Br(),uiTransitionGuardUntil:x.gateState.uiTransitionGuardUntil||0,lastUiTransitionSource:x.gateState.lastUiTransitionSource||"",activeSessionCount:T.messageSessions.size,pendingTimerCount:T.pendingMessageTimers.size,lastHandledMessageKey:T.lastHandledMessageKey||"",lastDuplicateMessageKey:T.lastDuplicateMessageKey||"",registeredEvents:Array.from(T.listeners.keys()),listenerSettings:Ae(),eventBridge:ba(),gateState:xa(),phaseCounts:a,consistency:i,...zt()},activeSessions:r,recentSessionHistory:o,lastEventDebugSnapshot:os(T.lastEventDebugSnapshot),lastAutoTriggerSnapshot:os(T.lastAutoTriggerSnapshot)}}async function Nr(){if(x.isInitialized){$("\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316"),D("info","\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316\uFF0C\u8DF3\u8FC7\u91CD\u590D\u521D\u59CB\u5316");return}let t=st();if(!t){$("\u65E0\u6CD5\u83B7\u53D6SillyTavern API\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),D("warn","\u7B49\u5F85\u9152\u9986\u4E8B\u4EF6\u6E90\u5C31\u7EEA\u540E\u518D\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!1,hasEventTypes:!1}),setTimeout(Nr,1e3);return}let e=await Wl(),s=e?.eventSource||In(),n=e?.eventTypes||Rn();if(!s){$("\u65E0\u6CD5\u83B7\u53D6SillyTavern\u4E8B\u4EF6\u6E90\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),D("warn","\u7B49\u5F85\u9152\u9986\u4E8B\u4EF6\u6E90\u5C31\u7EEA\u540E\u518D\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!!s,hasEventTypes:!!n,importError:ne.importError?.message||""}),setTimeout(Nr,1e3);return}D("info","\u5F00\u59CB\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!!s,hasEventTypes:!!n,listenerSettings:Ae()}),D("info","\u4F7F\u7528\u4E8B\u4EF6\u6E90",{source:e?.source||ne.source||"unknown"}),zl(),et(w.MESSAGE_SENT,async r=>{let a=(await jr({depth:10,includeAssistant:!1,includeSystem:!1}))?.messages?.filter(i=>i.role==="user").pop();_t({lastUserSendIntentAt:Date.now(),lastUserIntentSource:"message_sent",lastUserMessageId:r,lastUserMessageAt:Date.now(),lastUserMessageText:a?.content||x.gateState.lastUserMessageText||""}),$(`\u7528\u6237\u6D88\u606F\u5DF2\u53D1\u9001: ${r}`),D("info","\u8BB0\u5F55\u7528\u6237\u53D1\u9001\u610F\u56FE",{messageId:r,lastUserMessage:a?.content||""})}),et(w.GENERATION_STARTED,async(r,o,a)=>{let i=Date.now(),l=Ms("generation"),c=Zl(r,o||null,i),u=c.startedByUserIntent,d=c.userIntentDetectedAt,p=c.userIntentSource,m=c.userIntentDetail,b=tc({traceId:l,startedAt:i,type:r,params:o||null,dryRun:!!a,startedByUserIntent:u,userIntentDetectedAt:d,userIntentSource:p,userIntentDetail:m,baselineResolved:!1,provisional:!0,baselineSource:"generation_started_sync_provisional"});_t({lastGenerationTraceId:l,lastGenerationType:r,lastGenerationParams:o||null,lastGenerationDryRun:!!a,isGenerating:!0,lastGenerationBaseline:b}),$(`\u751F\u6210\u5F00\u59CB: ${r}`),D("info","\u6536\u5230\u751F\u6210\u5F00\u59CB\u4E8B\u4EF6",{type:r,dryRun:!!a,params:o||null,traceId:l,startedByUserIntent:u,userIntentSource:p,userIntentDetail:m,baseline:b}),ec({traceId:l,startedAt:i,type:r,params:o||null,dryRun:!!a,startedByUserIntent:u,userIntentDetectedAt:d,userIntentSource:p,userIntentDetail:m,baselineResolved:!0,provisional:!1,baselineResolutionAt:Date.now(),baselineSource:"generation_started_async_resolved"}).then(R=>{let S=x.gateState.lastGenerationBaseline;if(!S||S.traceId!==l){D("info","generation baseline \u5DF2\u8FC7\u671F\uFF0C\u653E\u5F03\u56DE\u586B",{traceId:l,currentTraceId:S?.traceId||""});return}_t({lastGenerationBaseline:R}),D("info","generation baseline \u5DF2\u5B8C\u6210\u89E3\u6790",{traceId:l,baseline:R})}).catch(R=>{let S=x.gateState.lastGenerationBaseline;if(!S||S.traceId!==l)return;let L={...S,baselineResolved:!0,baselineResolutionAt:Date.now(),provisional:!1,baselineSource:"generation_started_async_failed_fallback"};_t({lastGenerationBaseline:L}),D("warn","generation baseline \u89E3\u6790\u5931\u8D25\uFF0C\u5DF2\u56DE\u9000\u5230 provisional baseline",{traceId:l,error:R?.message||String(R),baseline:L})})}),et(w.GENERATION_ENDED,()=>{_t({lastGenerationAt:Date.now(),isGenerating:!1}),$("\u751F\u6210\u7ED3\u675F"),D("info","\u6536\u5230\u751F\u6210\u7ED3\u675F\u4E8B\u4EF6")}),et(w.CHAT_CHANGED,r=>{oa(w.CHAT_CHANGED),aa("chat_changed"),D("info","\u6536\u5230\u804A\u5929\u5207\u6362\u4E8B\u4EF6",{data:r??null})}),et(w.CHAT_CREATED,r=>{oa(w.CHAT_CREATED),aa("chat_created"),D("info","\u6536\u5230\u804A\u5929\u521B\u5EFA\u4E8B\u4EF6",{data:r??null})}),Ea(),x.isInitialized=!0,$("\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210"),D("info","\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210",{listenerSettings:Ae()})}function Ic(t){x.debugMode=t}var w,x,$l,ne,A,Ut,G,da,Ol,na,Nl,Gl,T,Vr=H(()=>{Se();Ts();es();Rr();kr();qe();w={MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHARACTER_LOADED:"CHARACTER_LOADED",CHARACTER_DELETED:"CHARACTER_DELETED",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",WORLDBOOK_UPDATED:"WORLDBOOK_UPDATED",EXTENSIONS_LOADED:"EXTENSIONS_LOADED",SETTINGS_LOADED:"SETTINGS_LOADED"},x={listeners:new Map,handlers:new Map,gateState:{lastUserSendIntentAt:0,lastUserIntentSource:"",lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationTraceId:"",lastGenerationType:null,lastGenerationParams:null,lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1,lastGenerationBaseline:null,uiTransitionGuardUntil:0,lastUiTransitionAt:0,lastUiTransitionSource:""},isInitialized:!1,debugMode:!1},$l="/script.js",ne={eventSource:null,eventTypes:null,source:"",scriptModule:null,loadingPromise:null,importError:null},A={LISTENER_DISABLED:"listener_disabled",QUIET_GENERATION:"quiet_generation",DRY_RUN_GENERATION:"dry_run_generation",IGNORED_AUTO_TRIGGER:"ignored_auto_trigger",UNRELATED_UI_EVENT:"ui_side_effect_event",SPECULATIVE_FALLBACK_WITHOUT_MESSAGE:"speculative_generation_after_commands",NO_CONFIRMED_ASSISTANT_MESSAGE:"no_confirmed_assistant_message",HISTORICAL_REPLAY_MESSAGE_RECEIVED:"historical_replay_message_received",MESSAGE_RECEIVED_OUTSIDE_ACTIVE_GENERATION:"message_received_outside_active_generation",NON_ASSISTANT_MESSAGE:"non_assistant_message",MISSING_AI_MESSAGE:"missing_ai_message",DUPLICATE_MESSAGE:"duplicate_message",NO_ELIGIBLE_TOOLS:"no_eligible_tools",TOOL_DISABLED:"tool_disabled"},Ut={AUTO_POST_RESPONSE_API:"auto_post_response_api",MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_COMPATIBILITY:"manual_compatibility"},G={RECEIVED:"received",SCHEDULED:"scheduled",DISPATCHING:"dispatching",HANDLING:"handling",COMPLETED:"completed",SKIPPED:"skipped",IGNORED:"ignored"},da=15e3,Ol=1500,na=1800,Nl=5e3,Gl=new Set(["regenerate","swipe"]);T={initialized:!1,listeners:new Map,messageSessions:new Map,recentSessionHistory:[],lastExecutionContext:null,lastHandledMessageKey:"",pendingMessageTimers:new Map,lastAutoTriggerSnapshot:null,lastEventDebugSnapshot:null,lastDuplicateMessageKey:"",lastDuplicateMessageAt:0}});var Aa={};ue(Aa,{TOOL_CONFIG_PANEL_STYLES:()=>wa,createToolConfigPanel:()=>wt,default:()=>Rc});function wt(t){let{id:e,toolId:s,postResponseHint:n,extractionPlaceholder:r,previewDialogId:o,previewTitle:a="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:s,render(){let i=oe(this.toolId);if(!i)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let l=this._getApiPresets(),c=i.output?.apiPreset||i.apiPreset||"",u=this._getBypassPresets(),d=i.output?.mode||"follow_ai",p=i.bypass?.enabled||!1,m=i.bypass?.presetId||"",b=i.runtime?.lastStatus||"idle",R=i.runtime?.lastRunAt?new Date(i.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",S=i.runtime?.lastError||"",L=i.extraction||{},ae=Array.isArray(L.selectors)?L.selectors.join(`
`):"",fe=d==="post_response_api"?n:"\u968F AI \u8F93\u51FA\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002",M=this._buildDiagnosticsHtml(i.runtime||{}),z=d==="post_response_api"?"\u989D\u5916\u89E3\u6790":"\u968F AI \u8F93\u51FA",N=c||"\u5F53\u524D\u914D\u7F6E";return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${E(i.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${E(i.description||"\u914D\u7F6E\u6A21\u677F\u3001\u63D0\u53D6\u89C4\u5219\u3001API \u9884\u8BBE\u4E0E\u624B\u52A8\u8C03\u8BD5\u80FD\u529B\u3002")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u6A21\u5F0F ${E(z)}</span>
              <span class="yyt-tool-hero-chip">\u9884\u8BBE ${E(N)}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${E(b)}</span>
              <div class="yyt-tool-panel-hero-actions">
                <button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-tool-save-top" id="${g}-tool-save-top">
                  <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
                </button>
              </div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>\u8F93\u51FA\u6A21\u5F0F</span>
            </div>
            <div class="yyt-form-group">
              <label>\u8F93\u51FA\u6A21\u5F0F</label>
              <select class="yyt-select" id="${g}-tool-output-mode">
                <option value="follow_ai" ${d==="follow_ai"?"selected":""}>\u968F AI \u8F93\u51FA\uFF08\u652F\u6301\u624B\u52A8\u6267\u884C\uFF09</option>
                <option value="post_response_api" ${d==="post_response_api"?"selected":""}>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790</option>
              </select>
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${fe}</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-database"></i>
              <span>API \u9884\u8BBE</span>
            </div>
            <div class="yyt-form-group">
              <label>\u89E3\u6790\u4F7F\u7528\u7684 API \u9884\u8BBE</label>
              <select class="yyt-select" id="${g}-tool-api-preset">
                <option value="">\u4F7F\u7528\u5F53\u524DAPI\u914D\u7F6E</option>
                ${l.map(K=>`
                  <option value="${E(K.name)}" ${K.name===c?"selected":""}>
                    ${E(K.name)}
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
                <input type="checkbox" id="${g}-tool-bypass-enabled" ${p?"checked":""}>
                <span>\u542F\u7528\u7834\u9650\u8BCD</span>
              </label>
            </div>
            <div class="yyt-form-group yyt-bypass-preset-select ${p?"":"yyt-hidden"}">
              <label>\u7ED1\u5B9A\u7834\u9650\u8BCD\u9884\u8BBE</label>
              <select class="yyt-select" id="${g}-tool-bypass-preset">
                <option value="">\u9009\u62E9\u9884\u8BBE</option>
                ${u.map(K=>`
                  <option value="${E(K.id)}" ${K.id===m?"selected":""}>
                    ${E(K.name)}${K.isDefault?" [\u9ED8\u8BA4]":""}
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
                <input type="number" class="yyt-input" id="${g}-tool-max-messages" min="1" max="50" value="${Number(L.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${g}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${E(r)}">${E(ae)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u63D0\u53D6\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u63D0\u53D6\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-file-code"></i>
              <span>\u6A21\u677F\u4FEE\u6539\u6846</span>
              <div class="yyt-title-actions">
                <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${g}-tool-reset-template">
                  <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u6A21\u677F
                </button>
              </div>
            </div>
            <div class="yyt-form-group">
              <textarea class="yyt-textarea yyt-code-textarea"
                        id="${g}-tool-prompt-template"
                        rows="12"
                        placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${E(i.promptTemplate||"")}</textarea>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${E(b)}">${E(b)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${E(R)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${i.runtime?.successCount||0} / ${i.runtime?.errorCount||0}</span>
                </div>
                ${S?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${E(S)}</span>
                  </div>
                `:""}
              </div>
              <div class="yyt-tool-manual-actions">
                <button class="yyt-btn yyt-btn-primary" id="${g}-tool-run-manual">
                  <i class="fa-solid fa-play"></i> \u7ACB\u5373\u6267\u884C\u4E00\u6B21
                </button>
                <button class="yyt-btn yyt-btn-secondary" id="${g}-tool-preview-extraction">
                  <i class="fa-solid fa-vial"></i> \u6D4B\u8BD5\u63D0\u53D6
                </button>
                <div class="yyt-tool-compact-hint">\u7528\u4E8E\u624B\u52A8\u9A8C\u8BC1\u5F53\u524D\u6A21\u677F\u3001API\u9884\u8BBE\u548C\u7834\u9650\u9884\u8BBE\u662F\u5426\u80FD\u6B63\u5E38\u5DE5\u4F5C\u3002</div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-footer yyt-panel-footer-end">
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-primary" id="${g}-tool-save">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>

          <div class="yyt-tool-macro-hint">
            \u8BF4\u660E\uFF1A\u5DE5\u5177\u4F1A\u628A\u5F53\u524D\u6A21\u677F\u89E3\u6790\u540E\u4F5C\u4E3A\u6700\u7EC8\u7528\u6237\u8BF7\u6C42\u53D1\u9001\u7ED9\u989D\u5916\u6A21\u578B\uFF1B\u82E5\u542F\u7528\u4E86\u7834\u9650\u8BCD\uFF0C\u5219\u4F1A\u4F5C\u4E3A\u524D\u7F6E\u6D88\u606F\u4E00\u5E76\u53D1\u9001\u3002\u53EF\u7528\u5B8F\u5305\u62EC <code>{{toolPromptMacro}}</code>\u3001<code>{{toolContentMacro}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{recentMessagesText}}</code>\u3001<code>{{rawRecentMessagesText}}</code>\u3001<code>{{userMessage}}</code>\u3001<code>{{toolName}}</code>\u3001<code>{{toolId}}</code>\u3002
          </div>

          ${M}
        </div>
      `},_formatDiagnosticValue(i,l="\u672A\u8BB0\u5F55"){let c=String(i||"").trim();return E(c||l)},_formatDiagnosticTime(i){let l=Number(i)||0;return l>0?new Date(l).toLocaleString():"\u672A\u8BB0\u5F55"},_formatSkipReason(i){return{listener_disabled:"\u5DF2\u8DF3\u8FC7\uFF1A\u81EA\u52A8\u76D1\u542C\u5DF2\u5173\u95ED",quiet_generation:"\u5DF2\u8DF3\u8FC7\uFF1Aquiet / dryRun \u751F\u6210",dry_run_generation:"\u5DF2\u8DF3\u8FC7\uFF1A\u5F53\u524D generation \u4E3A dryRun",ignored_auto_trigger:"\u5DF2\u8DF3\u8FC7\uFF1A\u76D1\u542C\u5668\u8BBE\u7F6E\u5FFD\u7565\u4E86\u975E\u7528\u6237\u610F\u56FE\u751F\u6210",ui_side_effect_event:"\u5DF2\u5FFD\u7565\uFF1A\u5BBF\u4E3B UI \u526F\u4F5C\u7528\u4E8B\u4EF6",speculative_generation_after_commands:"\u5DF2\u5FFD\u7565\uFF1A\u4EC5\u8BB0\u5F55 GENERATION_AFTER_COMMANDS \u89C2\u5BDF\u6001 session",no_confirmed_assistant_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u672A\u786E\u8BA4\u5230\u672C\u8F6E assistant \u65B0\u697C\u5C42",historical_replay_message_received:"\u5DF2\u62E6\u622A\uFF1A\u5386\u53F2 assistant \u6D88\u606F\u91CD\u653E\u4E8B\u4EF6",message_received_outside_active_generation:"\u5DF2\u62E6\u622A\uFF1AMESSAGE_RECEIVED \u4E0D\u5C5E\u4E8E\u5F53\u524D\u751F\u6210\u7A97\u53E3",non_assistant_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u547D\u4E2D\u7684\u5E76\u975E AI \u697C\u5C42",missing_ai_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u672A\u8BFB\u53D6\u5230\u6709\u6548 AI \u56DE\u590D",duplicate_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u547D\u4E2D\u81EA\u52A8\u53BB\u91CD",no_eligible_tools:"\u5DF2\u8DF3\u8FC7\uFF1A\u6CA1\u6709\u547D\u4E2D\u53EF\u6267\u884C\u5DE5\u5177",tool_disabled:"\u5DF2\u8DF3\u8FC7\uFF1A\u5DE5\u5177\u672A\u542F\u7528",generation_after_commands_fallback_disabled:"\u5DF2\u5FFD\u7565\uFF1AGENERATION_AFTER_COMMANDS \u515C\u5E95\u5DF2\u5173\u95ED",message_received_fallback_disabled:"\u5DF2\u5FFD\u7565\uFF1AMESSAGE_RECEIVED \u515C\u5E95\u5DF2\u5173\u95ED"}[i]||i||"\u65E0"},_formatExecutionPath(i){return{auto_post_response_api:"\u81EA\u52A8\u94FE\uFF1Apost_response_api",manual_post_response_api:"\u624B\u52A8\u94FE\uFF1Apost_response_api",manual_compatibility:"\u624B\u52A8\u94FE\uFF1Acompatibility \u56DE\u9000"}[i]||i||"\u672A\u8BB0\u5F55"},_formatWritebackStatus(i){return{success:"\u5199\u56DE\u6210\u529F",failed:"\u5199\u56DE\u5931\u8D25",skipped_empty_output:"\u65E0\u8F93\u51FA\uFF0C\u8DF3\u8FC7\u5199\u56DE",not_applicable:"\u4E0D\u9002\u7528"}[i]||i||"\u672A\u8BB0\u5F55"},_formatFailureStage(i){return{build_messages:"\u6784\u9020\u8BF7\u6C42\u6D88\u606F",send_api_request:"\u53D1\u9001 API \u8BF7\u6C42",extract_output:"\u63D0\u53D6\u5DE5\u5177\u8F93\u51FA",inject_context:"\u5199\u56DE\u4E0A\u4E0B\u6587",compatibility_execute:"\u517C\u5BB9\u6267\u884C\u5165\u53E3",unknown:"\u672A\u77E5\u9636\u6BB5"}[i]||i||"\u65E0"},_formatHistoryTime(i){return this._formatDiagnosticTime(i)},_buildHistorySection(i,l=[],c="trigger"){let u=Array.isArray(l)?l.filter(Boolean).slice().reverse():[];if(!u.length)return`
          <div class="yyt-tool-debug-history">
            <div class="yyt-tool-debug-history-title">${E(i)}</div>
            <div class="yyt-tool-debug-history-empty">\u6682\u65E0\u8BB0\u5F55</div>
          </div>
        `;let d=u.map(p=>{let m=this._formatDiagnosticValue(p.eventType,"\u672A\u8BB0\u5F55"),b=this._formatDiagnosticValue(p.messageKey||p.messageId,"\u672A\u8BB0\u5F55"),R=this._formatDiagnosticValue(p.traceId,"\u65E0"),S=c==="writeback"?`\u6267\u884C\u8DEF\u5F84\uFF1A${this._formatExecutionPath(p.executionPath)} / \u5199\u56DE\uFF1A${this._formatWritebackStatus(p.writebackStatus)} / \u5931\u8D25\u9636\u6BB5\uFF1A${this._formatFailureStage(p.failureStage)}`:`\u8DF3\u8FC7\u539F\u56E0\uFF1A${this._formatSkipReason(p.skipReason)} / \u6267\u884C\u8DEF\u5F84\uFF1A${this._formatExecutionPath(p.executionPath)} / \u5199\u56DE\uFF1A${this._formatWritebackStatus(p.writebackStatus)}`;return`
          <div class="yyt-tool-debug-history-item">
            <div class="yyt-tool-debug-history-meta">
              <span>${E(this._formatHistoryTime(p.at))}</span>
              <span>trace ${R}</span>
            </div>
            <div class="yyt-tool-debug-history-main">
              \u4E8B\u4EF6\uFF1A${m}<br>
              \u6D88\u606F\uFF1A${b}<br>
              ${E(S)}
            </div>
          </div>
        `}).join("");return`
        <div class="yyt-tool-debug-history">
          <div class="yyt-tool-debug-history-title">${E(i)}</div>
          <div class="yyt-tool-debug-history-list">${d}</div>
        </div>
      `},_buildDiagnosticsHtml(i){let l=i||{};if(!!!(l.lastTriggerAt||l.lastTriggerEvent||l.lastMessageKey||l.lastSkipReason||l.lastExecutionPath||l.lastWritebackStatus||l.lastFailureStage||l.lastTraceId||Array.isArray(l.recentTriggerHistory)&&l.recentTriggerHistory.length>0||Array.isArray(l.recentWritebackHistory)&&l.recentWritebackHistory.length>0))return"";let u=[["\u6700\u8FD1\u89E6\u53D1\u65F6\u95F4",this._formatDiagnosticTime(l.lastTriggerAt)],["\u6700\u8FD1\u89E6\u53D1\u4E8B\u4EF6",this._formatDiagnosticValue(l.lastTriggerEvent)],["\u6700\u8FD1 Trace",this._formatDiagnosticValue(l.lastTraceId,"\u65E0")],["\u6700\u8FD1\u6D88\u606F\u952E",this._formatDiagnosticValue(l.lastMessageKey)],["\u6700\u8FD1\u8DF3\u8FC7\u539F\u56E0",this._formatDiagnosticValue(this._formatSkipReason(l.lastSkipReason),"\u65E0")],["\u6700\u8FD1\u6267\u884C\u8DEF\u5F84",this._formatDiagnosticValue(this._formatExecutionPath(l.lastExecutionPath))],["\u6700\u8FD1\u5199\u56DE\u72B6\u6001",this._formatDiagnosticValue(this._formatWritebackStatus(l.lastWritebackStatus))],["\u6700\u8FD1\u5931\u8D25\u9636\u6BB5",this._formatDiagnosticValue(this._formatFailureStage(l.lastFailureStage),"\u65E0")]],d=this._buildHistorySection("\u6700\u8FD1\u89E6\u53D1\u5386\u53F2",l.recentTriggerHistory||[],"trigger"),p=this._buildHistorySection("\u6700\u8FD1\u5199\u56DE\u5386\u53F2",l.recentWritebackHistory||[],"writeback");return`
        <details class="yyt-tool-debug-panel">
          <summary class="yyt-tool-debug-summary">\u6700\u8FD1\u89E6\u53D1\u8BCA\u65AD</summary>
          <div class="yyt-tool-debug-content">
            ${u.map(([m,b])=>`
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">${m}</span>
                <span class="yyt-tool-runtime-value">${b}</span>
              </div>
            `).join("")}
            ${d}
            ${p}
          </div>
        </details>
      `},_getApiPresets(){try{return Wt()||[]}catch{return[]}},_getBypassPresets(){try{return _r()||[]}catch{return[]}},_getFormData(i){let l=oe(this.toolId),c=i.find(`#${g}-tool-output-mode`).val()||"follow_ai",u=i.find(`#${g}-tool-bypass-enabled`).is(":checked"),d=c==="post_response_api",p=(i.find(`#${g}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(m=>m.trim()).filter(Boolean);return{enabled:l?.enabled!==!1,promptTemplate:i.find(`#${g}-tool-prompt-template`).val()||"",apiPreset:i.find(`#${g}-tool-api-preset`).val()||"",extractTags:p,trigger:{event:"GENERATION_ENDED",enabled:d},output:{mode:c,apiPreset:i.find(`#${g}-tool-api-preset`).val()||"",overwrite:!0,enabled:d},bypass:{enabled:u,presetId:u&&i.find(`#${g}-tool-bypass-preset`).val()||""},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(i.find(`#${g}-tool-max-messages`).val(),10)||5),selectors:p}}},_showExtractionPreview(i,l){if(!Y())return;let u=`${g}-${o}`,d=Array.isArray(l.messageEntries)?l.messageEntries:[],p=d.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${d.map(m=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">\u7B2C ${m.order} \u6761 AI \u6D88\u606F</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${E(m.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${E(m.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${E(m.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";i.append(Zn({id:u,title:a,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${E((l.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6700\u8FD1 ${l.maxMessages} \u6761 AI \u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${E(l.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${E(l.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${E(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${p}
        `})),er(i,u,{onSave:m=>m()}),i.find(`#${u}-save`).text("\u5173\u95ED"),i.find(`#${u}-cancel`).remove()},bindEvents(i){let l=Y();!l||!q(i)||(i.find(`#${g}-tool-output-mode`).on("change",()=>{let u=(i.find(`#${g}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?n:"\u968F AI \u8F93\u51FA\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002";i.find(".yyt-tool-mode-hint").text(u)}),i.find(`#${g}-tool-bypass-enabled`).on("change",c=>{let u=l(c.currentTarget).is(":checked");i.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!u)}),i.find(`#${g}-tool-save, #${g}-tool-save-top`).on("click",()=>{this._saveConfig(i,{silent:!1})}),i.find(`#${g}-tool-reset-template`).on("click",()=>{let c=nn(this.toolId);c?.promptTemplate&&(i.find(`#${g}-tool-prompt-template`).val(c.promptTemplate),h("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),i.find(`#${g}-tool-run-manual`).on("click",async()=>{if(this._saveConfig(i,{silent:!0}))try{let u=await Yr(this.toolId);!u?.success&&u?.error&&Ve("warning",u.error,{duration:3200,noticeId:`yyt-tool-run-${this.toolId}`})}catch(u){h("error",u?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{this.renderTo(i)}}),i.find(`#${g}-tool-preview-extraction`).on("click",async()=>{if(this._saveConfig(i,{silent:!0}))try{let u=await Wr(this.toolId);if(!u?.success){h("error",u?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}this._showExtractionPreview(i,u)}catch(u){h("error",u?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}))},_saveConfig(i,l={}){let c=this._getFormData(i),{silent:u=!1}=l,d=Ze(this.toolId,c);return d?u||h("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):h("error","\u4FDD\u5B58\u5931\u8D25"),d},destroy(i){!Y()||!q(i)||i.find("*").off()},getStyles(){return wa},renderTo(i){i.html(this.render({})),this.bindEvents(i,{})}}}var wa,Rc,Ps=H(()=>{qe();es();js();Ss();Vr();wa=`
  .yyt-tool-panel {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .yyt-tool-panel-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;
    align-items: stretch;
    padding: 12px 14px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
  }

  .yyt-tool-panel-hero-copy {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }

  .yyt-tool-panel-hero-title {
    font-size: 18px;
    font-weight: 800;
    line-height: 1.15;
    color: var(--yyt-text);
  }

  .yyt-tool-panel-hero-desc {
    font-size: 12px;
    line-height: 1.55;
    color: var(--yyt-text-secondary);
  }

  .yyt-tool-panel-hero-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: flex-start;
    justify-content: flex-end;
  }

  .yyt-tool-panel-hero-actions {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-left: 4px;
  }

  .yyt-tool-save-top {
    white-space: nowrap;
  }

  .yyt-tool-hero-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 700;
    border: 1px solid rgba(255, 255, 255, 0.08);
    letter-spacing: 0.3px;
    color: var(--yyt-text-secondary);
    background: rgba(255, 255, 255, 0.04);
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
    min-height: 180px;
  }

  .yyt-code-textarea-small {
    min-height: 96px;
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
    grid-template-columns: minmax(0, 1.2fr) minmax(220px, 0.8fr);
    gap: 12px;
    align-items: start;
  }

  .yyt-tool-runtime-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
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
    gap: 8px;
    min-width: 0;
    padding: 12px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
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
    border-radius: 14px;
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
    border-radius: 14px;
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

  .yyt-tool-debug-history {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 6px;
  }

  .yyt-tool-debug-history-title {
    font-size: 11px;
    font-weight: 700;
    color: var(--yyt-text-secondary);
    letter-spacing: 0.2px;
    text-transform: uppercase;
  }

  .yyt-tool-debug-history-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .yyt-tool-debug-history-item {
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.02);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .yyt-tool-debug-history-meta {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    font-size: 11px;
    color: var(--yyt-text-secondary);
  }

  .yyt-tool-debug-history-main {
    font-size: 12px;
    color: var(--yyt-text);
    line-height: 1.6;
    word-break: break-word;
  }

  .yyt-tool-debug-history-empty {
    font-size: 12px;
    color: var(--yyt-text-muted);
  }

  .yyt-tool-debug-content .yyt-tool-runtime-line {
    padding-top: 0;
  }

  @media screen and (max-width: 768px) {
    .yyt-tool-panel-hero {
      grid-template-columns: 1fr;
    }

    .yyt-tool-panel-hero-tags {
      justify-content: flex-start;
    }

    .yyt-tool-manual-area {
      grid-template-columns: 1fr;
    }

    .yyt-tool-manual-actions {
      min-width: 0;
    }
  }
`;Rc=wt});var je,qr=H(()=>{Ps();je=wt({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var Fe,Jr=H(()=>{Ps();Fe=wt({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var He,Xr=H(()=>{Ps();He=wt({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"})});var jt,Qr=H(()=>{Se();Ss();qe();jt={id:"bypassPanel",render(t){let e=B.getPresetList(),s=B.getDefaultPresetId();return`
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
            ${e.map(n=>this._renderPresetItem(n,n.id===s)).join("")}
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
    `},_renderPresetItem(t,e){let s=yt&&yt[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${E(t.name)}</span>
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
      `;let e=B.getDefaultPresetId()===t.id,s=yt&&yt[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${E(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
                 value="${E(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
        </div>
        
        <div class="yyt-bypass-messages-header">
          <span>\u6D88\u606F\u5217\u8868</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-add-message">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u6D88\u606F
          </button>
        </div>
        
        <div class="yyt-bypass-messages" id="yyt-bypass-messages">
          ${(t.messages||[]).map(n=>this._renderMessageItem(n)).join("")}
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${E(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let s=Y();!s||!q(t)||(this._bindPresetListEvents(t,s),this._bindEditorEvents(t,s),this._bindFileEvents(t,s))},_bindPresetListEvents(t,e){t.on("click",".yyt-bypass-preset-item",s=>{if(e(s.target).closest(".yyt-bypass-quick-delete").length)return;let n=e(s.currentTarget).data("presetId");this._selectPreset(t,e,n)}),t.on("click",".yyt-bypass-quick-delete",s=>{s.stopPropagation();let n=e(s.currentTarget).data("presetId");if(!n||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=B.deletePreset(n);r.success?(t.find(".yyt-bypass-editor-content").data("presetId")===n&&t.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),h("success","\u9884\u8BBE\u5DF2\u5220\u9664")):h("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.find("#yyt-bypass-add").on("click",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click",".yyt-bypass-delete-message",s=>{let n=e(s.currentTarget).closest(".yyt-bypass-message"),r=n.data("messageId");n.remove()}),t.on("change",".yyt-bypass-message-enabled",s=>{e(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(s.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.find("#yyt-bypass-import").on("click",()=>{t.find("#yyt-bypass-import-file").click()}),t.find("#yyt-bypass-import-file").on("change",async s=>{let n=s.target.files[0];if(n){try{let r=await dt(n),o=B.importPresets(r);h(o.success?"success":"error",o.message),o.success&&this.renderTo(t)}catch(r){h("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.find("#yyt-bypass-export").on("click",()=>{try{let s=B.exportPresets();ct(s,`bypass_presets_${Date.now()}.json`),h("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){h("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(t,e,s){let n=B.getPreset(s);n&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),t.find("#yyt-bypass-editor").html(this._renderEditor(n)))},_createNewPreset(t,e){let s=`bypass_${Date.now()}`,n=B.createPreset({id:s,name:"\u65B0\u7834\u9650\u8BCD\u9884\u8BBE",description:"",messages:[]});n.success?(this.renderTo(t),this._selectPreset(t,e,s),h("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):h("error",n?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content"),n=s.data("presetId");if(!n)return;let r=s.find(".yyt-bypass-name-input").val().trim(),o=s.find("#yyt-bypass-description").val().trim();if(!r){h("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let a=[];s.find(".yyt-bypass-message").each(function(){let l=e(this);a.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let i=B.updatePreset(n,{name:r,description:o,messages:a});i.success?(h("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):h("error",i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=B.deletePreset(n);r.success?(this.renderTo(t),h("success","\u9884\u8BBE\u5DF2\u5220\u9664")):h("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n)return;let r=`bypass_${Date.now()}`,o=B.duplicatePreset(n,r);o.success?(this.renderTo(t),this._selectPreset(t,e,r),h("success","\u9884\u8BBE\u5DF2\u590D\u5236")):h("error",o?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");n&&(B.setDefaultPresetId(n),t.find(".yyt-bypass-preset-item").removeClass("yyt-default"),t.find(`.yyt-bypass-preset-item[data-preset-id="${n}"]`).addClass("yyt-default"),t.find(".yyt-bypass-default-badge").remove(),t.find(`.yyt-bypass-preset-item[data-preset-id="${n}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>'),h("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE"))},_addMessage(t,e){let s=t.find("#yyt-bypass-messages"),n={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};s.append(this._renderMessageItem(n))},_refreshPresetList(t,e){let s=B.getPresetList(),n=B.getDefaultPresetId();t.find(".yyt-bypass-preset-list").html(s.map(r=>this._renderPresetItem(r,r.id===n)).join(""))},destroy(t){!Y()||!q(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Ma={};ue(Ma,{SettingsPanel:()=>ft,THEME_CONFIGS:()=>Zr,applyTheme:()=>Ra,applyUiPreferences:()=>eo,default:()=>Cc});function ks(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent.document||document}catch{}return document}function Ia(t=ks()){return t?.documentElement||document.documentElement}function Ra(t,e=ks()){let s=Ia(e),n={...Mc,...Zr[t]||Zr["dark-blue"]};Object.entries(n).forEach(([r,o])=>{s.style.setProperty(r,o)}),s.setAttribute("data-yyt-theme",t)}function eo(t={},e=ks()){let s=Ia(e),{theme:n="dark-blue",compactMode:r=!1,animationEnabled:o=!0}=t||{};Ra(n,e),s.classList.toggle("yyt-compact-mode",!!r),s.classList.toggle("yyt-no-animation",!o)}var Mc,Zr,ft,Cc,Pn=H(()=>{Se();Ts();qe();Mc={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)","--yyt-surface":"rgba(255, 255, 255, 0.03)","--yyt-surface-hover":"rgba(255, 255, 255, 0.06)","--yyt-surface-active":"rgba(255, 255, 255, 0.08)","--yyt-border":"rgba(255, 255, 255, 0.08)","--yyt-border-strong":"rgba(255, 255, 255, 0.15)","--yyt-text":"rgba(255, 255, 255, 0.95)","--yyt-text-secondary":"rgba(255, 255, 255, 0.7)","--yyt-text-muted":"rgba(255, 255, 255, 0.45)","--yyt-on-accent":"#0b0f15"},Zr={"dark-blue":{"--yyt-on-accent":"#0b0f15"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#120b1f"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#0b150f"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.7)","--yyt-text-muted":"rgba(15, 23, 42, 0.45)","--yyt-surface":"rgba(0, 0, 0, 0.03)","--yyt-surface-hover":"rgba(0, 0, 0, 0.06)","--yyt-surface-active":"rgba(0, 0, 0, 0.08)","--yyt-border":"rgba(0, 0, 0, 0.08)","--yyt-border-strong":"rgba(0, 0, 0, 0.15)","--yyt-on-accent":"#0f172a"}};ft={id:"settingsPanel",render(t){let e=ke.getSettings(),s=e.listener?.listenGenerationEnded!==!1,n=e.debug?.enableDebugLog===!0;return`
      <div class="yyt-settings-panel">
        <div class="yyt-settings-hero">
          <div class="yyt-settings-hero-copy">
            <div class="yyt-settings-hero-title">\u5168\u5C40\u504F\u597D\u4E0E\u8FD0\u884C\u7B56\u7565</div>
            <div class="yyt-settings-hero-desc">\u7EDF\u4E00\u7BA1\u7406\u6267\u884C\u5668\u3001\u76D1\u542C\u5668\u3001\u8C03\u8BD5\u4E0E\u5916\u89C2\u8BBE\u7F6E\uFF0C\u8BA9\u5DE5\u5177\u94FE\u884C\u4E3A\u4E0E\u754C\u9762\u4F53\u9A8C\u4FDD\u6301\u4E00\u81F4\u3002</div>
          </div>
          <div class="yyt-settings-hero-status">
            <span class="yyt-settings-status-chip ${s?"is-on":"is-off"}">\u76D1\u542C ${s?"\u5F00\u542F":"\u5173\u95ED"}</span>
            <span class="yyt-settings-status-chip ${n?"is-on":"is-off"}">\u8C03\u8BD5 ${n?"\u5F00\u542F":"\u5173\u95ED"}</span>
            <span class="yyt-settings-status-chip is-neutral">\u4E3B\u9898 ${e.ui?.theme||"dark-blue"}</span>
          </div>
        </div>

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

          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-useGenerationAfterCommandsFallback" 
                     ${t.useGenerationAfterCommandsFallback!==!1?"checked":""}>
              <span>\u542F\u7528 GENERATION_AFTER_COMMANDS \u515C\u5E95</span>
            </label>
            <div class="yyt-form-hint">\u5173\u95ED\u540E\uFF0C\u81EA\u52A8\u94FE\u4E0D\u518D\u628A GENERATION_AFTER_COMMANDS \u4F5C\u4E3A\u6D88\u606F\u7EA7 session \u7684\u8865\u5145\u4E8B\u4EF6\u6E90\u3002</div>
          </div>

          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-useMessageReceivedFallback" 
                     ${t.useMessageReceivedFallback!==!1?"checked":""}>
              <span>\u542F\u7528 MESSAGE_RECEIVED \u515C\u5E95</span>
            </label>
            <div class="yyt-form-hint">\u5173\u95ED\u540E\uFF0C\u81EA\u52A8\u94FE\u4E0D\u518D\u4F7F\u7528 MESSAGE_RECEIVED \u515C\u5E95\uFF1B\u542F\u7528\u65F6\u4E5F\u53EA\u4F1A\u5438\u6536 assistant \u697C\u5C42\u8FDB\u5165\u540C\u4E00\u6D88\u606F session\u3002</div>
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
          <div class="yyt-settings-section-title">Session \u4E0E\u9632\u6296</div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u9632\u6296\u65F6\u95F4 (ms)</label>
              <div class="yyt-form-hint">\u7528\u4E8E GENERATION_AFTER_COMMANDS / MESSAGE_RECEIVED \u7B49\u515C\u5E95\u4E8B\u4EF6\u7684\u5EF6\u8FDF\u8C03\u5EA6\u4E0E\u53BB\u6296\u3002</div>
              <input type="number" class="yyt-input" id="yyt-setting-debounceMs" 
                     value="${t.debounceMs}" min="0" max="5000" step="100">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u6D88\u606F Session \u7A97\u53E3 (ms)</label>
              <div class="yyt-form-hint">\u540C\u4E00\u6761\u6D88\u606F\u5728\u8BE5\u7A97\u53E3\u5185\u547D\u4E2D\u7684\u591A\u79CD\u5BBF\u4E3B\u4E8B\u4EF6\u4F1A\u88AB\u805A\u5408\u8FDB\u540C\u4E00 session\u3002</div>
              <input type="number" class="yyt-input" id="yyt-setting-messageSessionWindowMs" 
                     value="${t.messageSessionWindowMs||1800}" min="300" max="10000" step="100">
            </div>
          </div>
          <div class="yyt-form-group">
            <label>\u8BCA\u65AD\u5386\u53F2\u4FDD\u7559\u6761\u6570</label>
            <div class="yyt-form-hint">\u63A7\u5236\u6D88\u606F\u7EA7 session \u5386\u53F2\u4E0E\u5355\u5DE5\u5177\u6700\u8FD1\u89E6\u53D1 / \u5199\u56DE\u5386\u53F2\u7684\u4FDD\u7559\u6570\u91CF\uFF0C\u907F\u514D\u8BCA\u65AD\u4FE1\u606F\u65E0\u9650\u81A8\u80C0\u3002</div>
            <input type="number" class="yyt-input" id="yyt-setting-historyRetentionLimit" 
                   value="${t.historyRetentionLimit||10}" min="1" max="50" step="1">
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
    `},bindEvents(t,e){let s=Y();!s||!q(t)||(t.find(".yyt-settings-tab").on("click",n=>{let r=s(n.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),s(n.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${r}"]`).addClass("yyt-active")}),t.find("#yyt-settings-save").on("click",()=>{this._saveSettings(t,s)}),t.find("#yyt-settings-reset").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(ke.resetSettings(),eo(Es.ui,ks()),this.renderTo(t),h("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}))},_saveSettings(t,e){let s={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val())||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val())||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val())||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val())||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},listener:{listenGenerationEnded:t.find("#yyt-setting-listenGenerationEnded").is(":checked"),ignoreQuietGeneration:t.find("#yyt-setting-ignoreQuietGeneration").is(":checked"),ignoreAutoTrigger:t.find("#yyt-setting-ignoreAutoTrigger").is(":checked"),debounceMs:parseInt(t.find("#yyt-setting-debounceMs").val())||300,useGenerationAfterCommandsFallback:t.find("#yyt-setting-useGenerationAfterCommandsFallback").is(":checked"),useMessageReceivedFallback:t.find("#yyt-setting-useMessageReceivedFallback").is(":checked"),messageSessionWindowMs:parseInt(t.find("#yyt-setting-messageSessionWindowMs").val())||1800,historyRetentionLimit:parseInt(t.find("#yyt-setting-historyRetentionLimit").val())||10},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};ke.saveSettings(s),eo(s.ui,ks()),h("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},destroy(t){!Y()||!q(t)||t.find("*").off()},getStyles(){return`
      /* \u8BBE\u7F6E\u9762\u677F\u6837\u5F0F */
      .yyt-settings-panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 10px;
      }

      .yyt-settings-hero {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 14px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
      }

      .yyt-settings-hero-copy {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
      }

      .yyt-settings-hero-title {
        font-size: 18px;
        font-weight: 800;
        color: var(--yyt-text);
        line-height: 1.15;
      }

      .yyt-settings-hero-desc {
        font-size: 12px;
        color: var(--yyt-text-secondary);
        line-height: 1.55;
        max-width: 72ch;
      }

      .yyt-settings-hero-status {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      .yyt-settings-status-chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.3px;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .yyt-settings-status-chip.is-on {
        color: var(--yyt-success);
        background: rgba(74, 222, 128, 0.1);
      }

      .yyt-settings-status-chip.is-off {
        color: var(--yyt-text-secondary);
        background: rgba(255, 255, 255, 0.05);
      }

      .yyt-settings-status-chip.is-neutral {
        color: var(--yyt-accent);
        background: rgba(123, 183, 255, 0.1);
      }
      
      .yyt-settings-tabs {
        display: flex;
        gap: 4px;
        padding: 6px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        flex-shrink: 0;
      }
      
      .yyt-settings-tab {
        padding: 8px 12px;
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
        padding: 4px;
      }
      
      .yyt-settings-tab-content {
        display: none;
      }
      
      .yyt-settings-tab-content.yyt-active {
        display: block;
      }
      
      .yyt-settings-section {
        margin-bottom: 14px;
        padding: 14px;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.015) 100%);
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
        padding: 10px 0 0;
        background: rgba(255, 255, 255, 0.02);
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        flex-shrink: 0;
      }

      @media screen and (max-width: 768px) {
        .yyt-settings-hero {
          flex-direction: column;
        }

        .yyt-settings-hero-status {
          justify-content: flex-start;
        }

        .yyt-form-row {
          flex-direction: column;
        }
      }
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},Cc=ft});var Na={};ue(Na,{ApiPresetPanel:()=>Ge,BypassPanel:()=>jt,RegexExtractPanel:()=>Le,SCRIPT_ID:()=>g,SettingsPanel:()=>ft,StatusBlockPanel:()=>Fe,SummaryToolPanel:()=>je,ToolManagePanel:()=>Ue,UIManager:()=>ys,YouyouReviewPanel:()=>He,bindDialogEvents:()=>er,createDialogHtml:()=>Zn,default:()=>Pc,downloadJson:()=>ct,escapeHtml:()=>E,fillFormWithConfig:()=>Ct,getAllStyles:()=>Oa,getFormApiConfig:()=>vt,getJQuery:()=>Y,initUI:()=>Ds,isContainerValid:()=>q,readFileContent:()=>dt,registerComponents:()=>is,renderApiPanel:()=>kn,renderBypassPanel:()=>Da,renderRegexPanel:()=>Dn,renderSettingsPanel:()=>$a,renderStatusBlockPanel:()=>Pa,renderSummaryToolPanel:()=>Ca,renderToolPanel:()=>$n,renderYouyouReviewPanel:()=>ka,resetJQueryCache:()=>Ai,showToast:()=>h,showTopNotice:()=>Ve,uiManager:()=>le});function is(){le.register(Ge.id,Ge),le.register(Le.id,Le),le.register(Ue.id,Ue),le.register(je.id,je),le.register(Fe.id,Fe),le.register(He.id,He),le.register(jt.id,jt),le.register(ft.id,ft),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function Ds(t={}){let{autoInjectStyles:e=!0,targetDocument:s,...n}=t;le.init(n),is(),e&&le.injectStyles(s),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function At(t,e,s={}){le.render(t,e,s)}function kn(t){At(Ge.id,t)}function Dn(t){At(Le.id,t)}function $n(t){At(Ue.id,t)}function Ca(t){At(je.id,t)}function Pa(t){At(Fe.id,t)}function ka(t){At(He.id,t)}function Da(t){At(jt.id,t)}function $a(t){At(ft.id,t)}function Oa(){return le.getAllStyles()}var Pc,to=H(()=>{tr();sr();lr();Er();qr();Jr();Xr();Qr();Pn();qe();tr();sr();lr();Er();qr();Jr();Xr();Qr();Pn();Pc={uiManager:le,ApiPresetPanel:Ge,RegexExtractPanel:Le,ToolManagePanel:Ue,SummaryToolPanel:je,StatusBlockPanel:Fe,YouyouReviewPanel:He,BypassPanel:jt,SettingsPanel:ft,registerComponents:is,initUI:Ds,renderApiPanel:kn,renderRegexPanel:Dn,renderToolPanel:$n,renderSummaryToolPanel:Ca,renderStatusBlockPanel:Pa,renderYouyouReviewPanel:ka,renderBypassPanel:Da,renderSettingsPanel:$a,getAllStyles:Oa}});var Ka={};ue(Ka,{ApiPresetPanel:()=>Ge,RegexExtractPanel:()=>Le,SCRIPT_ID:()=>g,StatusBlockPanel:()=>Fe,SummaryToolPanel:()=>je,ToolManagePanel:()=>Ue,YouyouReviewPanel:()=>He,default:()=>kc,escapeHtml:()=>E,fillFormWithConfig:()=>Ct,getCurrentTab:()=>Fa,getFormApiConfig:()=>vt,getJQuery:()=>Y,getRegexStyles:()=>za,getStyles:()=>Ba,getToolStyles:()=>ja,initUI:()=>Ds,isContainerValid:()=>q,registerComponents:()=>is,render:()=>Ga,renderRegex:()=>La,renderTool:()=>Ua,setCurrentTab:()=>Ha,showToast:()=>h,uiManager:()=>le});function so(t,e){let s=Y();return s?t?typeof t=="string"?s(t):t?.jquery?t:s(t):e:(console.error("[YouYouToolkit] jQuery not available"),null)}function Ga(t){if($s=so(t,$s),!$s||!$s.length){console.error("[YouYouToolkit] Container not found or invalid");return}kn($s)}function La(t){if(Os=so(t,Os),!Os||!Os.length){console.error("[YouYouToolkit] Regex container not found");return}Dn(Os)}function Ua(t){if(Ns=so(t,Ns),!Ns||!Ns.length){console.error("[YouYouToolkit] Tool container not found");return}$n(Ns)}function Ba(){return Ge.getStyles()}function za(){return Le.getStyles()}function ja(){return[Ue.getStyles(),je.getStyles(),Fe.getStyles(),He.getStyles()].join(`
`)}function Fa(){return le.getCurrentTab()}function Ha(t){le.switchTab(t)}var $s,Os,Ns,kc,Ya=H(()=>{to();$s=null,Os=null,Ns=null;kc={render:Ga,renderRegex:La,renderTool:Ua,getStyles:Ba,getRegexStyles:za,getToolStyles:ja,getCurrentTab:Fa,setCurrentTab:Ha,uiManager:le,ApiPresetPanel:Ge,RegexExtractPanel:Le,ToolManagePanel:Ue,SummaryToolPanel:je,StatusBlockPanel:Fe,YouyouReviewPanel:He,registerComponents:is,initUI:Ds,SCRIPT_ID:g,escapeHtml:E,showToast:h,getJQuery:Y,isContainerValid:q,getFormApiConfig:vt,fillFormWithConfig:Ct}});var Va={};ue(Va,{WindowManager:()=>On,closeWindow:()=>Nc,createWindow:()=>Oc,windowManager:()=>De});function $c(){if(De.stylesInjected)return;De.stylesInjected=!0;let t=`
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
  `,e=document.createElement("style");e.id=Dc+"_styles",e.textContent=t,(document.head||document.documentElement).appendChild(e)}function Oc(t){let{id:e,title:s="\u7A97\u53E3",content:n="",width:r=900,height:o=700,modal:a=!1,resizable:i=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:u=!0,onClose:d,onReady:p}=t;$c();let m=window.jQuery||window.parent?.jQuery;if(!m)return console.error("[WindowManager] jQuery not available"),null;if(De.isOpen(e))return De.bringToFront(e),De.getWindow(e);let b=window.innerWidth||1200,R=window.innerHeight||800,S=b<=1100,L=null,ae=!1;u&&(L=De.getState(e),L&&!S&&(ae=!0));let fe,M;ae&&L.width&&L.height?(fe=Math.max(400,Math.min(L.width,b-40)),M=Math.max(300,Math.min(L.height,R-40))):(fe=Math.max(400,Math.min(r,b-40)),M=Math.max(300,Math.min(o,R-40)));let z=Math.max(20,Math.min((b-fe)/2,b-fe-20)),N=Math.max(20,Math.min((R-M)/2,R-M-20)),K=l&&!S,Ie=`
    <div class="yyt-window" id="${e}" style="left:${z}px; top:${N}px; width:${fe}px; height:${M}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${Gc(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${K?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
          <button class="yyt-window-btn close" title="\u5173\u95ED"><i class="fa-solid fa-times"></i></button>
        </div>
      </div>
      <div class="yyt-window-body">${n}</div>
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
  `,me=null;a&&(me=m(`<div class="yyt-window-overlay" data-for="${e}"></div>`),m(document.body).append(me));let P=m(Ie);m(document.body).append(P),De.register(e,P),P.on("mousedown",()=>De.bringToFront(e));let Re=!1,be={left:z,top:N,width:fe,height:M},Oe=()=>{be={left:parseInt(P.css("left")),top:parseInt(P.css("top")),width:P.width(),height:P.height()},P.addClass("maximized"),P.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),Re=!0},xe=()=>{P.removeClass("maximized"),P.css({left:be.left+"px",top:be.top+"px",width:be.width+"px",height:be.height+"px"}),P.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),Re=!1};P.find(".yyt-window-btn.maximize").on("click",()=>{Re?xe():Oe()}),(S&&l||ae&&L.isMaximized&&l||c&&l)&&Oe(),P.find(".yyt-window-btn.close").on("click",()=>{if(u&&l){let ce={width:Re?be.width:P.width(),height:Re?be.height:P.height(),isMaximized:Re};De.saveState(e,ce)}d&&d(),me&&me.remove(),P.remove(),De.unregister(e),m(document).off(".yytWindowDrag"+e),m(document).off(".yytWindowResize"+e)}),me&&me.on("click",ce=>{ce.target,me[0]});let Ke=!1,nt,Ye,rt,ot;if(P.find(".yyt-window-header").on("mousedown",ce=>{m(ce.target).closest(".yyt-window-controls").length||Re||(Ke=!0,nt=ce.clientX,Ye=ce.clientY,rt=parseInt(P.css("left")),ot=parseInt(P.css("top")),m(document.body).css("user-select","none"))}),m(document).on("mousemove.yytWindowDrag"+e,ce=>{if(!Ke)return;let de=ce.clientX-nt,at=ce.clientY-Ye;P.css({left:Math.max(0,rt+de)+"px",top:Math.max(0,ot+at)+"px"})}),m(document).on("mouseup.yytWindowDrag"+e,()=>{Ke&&(Ke=!1,m(document.body).css("user-select",""))}),i){let ce=!1,de="",at,Ft,y,f,v,_;P.find(".yyt-window-resize-handle").on("mousedown",function(U){Re||(ce=!0,de="",m(this).hasClass("se")?de="se":m(this).hasClass("e")?de="e":m(this).hasClass("s")?de="s":m(this).hasClass("w")?de="w":m(this).hasClass("n")?de="n":m(this).hasClass("nw")?de="nw":m(this).hasClass("ne")?de="ne":m(this).hasClass("sw")&&(de="sw"),at=U.clientX,Ft=U.clientY,y=P.width(),f=P.height(),v=parseInt(P.css("left")),_=parseInt(P.css("top")),m(document.body).css("user-select","none"),U.stopPropagation())}),m(document).on("mousemove.yytWindowResize"+e,U=>{if(!ce)return;let j=U.clientX-at,X=U.clientY-Ft,O=400,re=300,ie=y,Te=f,We=v,Ne=_;if(de.includes("e")&&(ie=Math.max(O,y+j)),de.includes("s")&&(Te=Math.max(re,f+X)),de.includes("w")){let Me=y-j;Me>=O&&(ie=Me,We=v+j)}if(de.includes("n")){let Me=f-X;Me>=re&&(Te=Me,Ne=_+X)}P.css({width:ie+"px",height:Te+"px",left:We+"px",top:Ne+"px"})}),m(document).on("mouseup.yytWindowResize"+e,()=>{ce&&(ce=!1,m(document.body).css("user-select",""))})}return P.on("remove",()=>{m(document).off(".yytWindowDrag"+e),m(document).off(".yytWindowResize"+e)}),p&&setTimeout(()=>p(P),50),P}function Nc(t){let e=De.getWindow(t);if(e){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${t}"]`).remove(),s(document).off(".yytWindowDrag"+t),s(document).off(".yytWindowResize"+t)),e.remove(),De.unregister(t)}}function Gc(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}var Dc,Wa,On,De,qa=H(()=>{ht();Dc="youyou_toolkit_window_manager",Wa="window_states",On=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,s){this.topZIndex++,this.windows.set(e,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let s=this.windows.get(e);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,s)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,s){let n=this.loadStates();n[e]={...s,updatedAt:Date.now()},ls.set(Wa,n)}loadStates(){return ls.get(Wa)||{}}getState(e){return this.loadStates()[e]||null}},De=new On});var Ja={};ue(Ja,{DEFAULT_PROMPT_SEGMENTS:()=>Nn,PromptEditor:()=>Gn,default:()=>Kc,getPromptEditorStyles:()=>zc,messagesToSegments:()=>Hc,segmentsToMessages:()=>Fc,validatePromptSegments:()=>jc});function zc(){return`
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
  `}function jc(t){let e=[];return Array.isArray(t)?(t.forEach((s,n)=>{s.id||e.push(`\u6BB5\u843D ${n+1} \u7F3A\u5C11ID`),s.role||e.push(`\u6BB5\u843D ${n+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(s.role)||e.push(`\u6BB5\u843D ${n+1} \u7684role\u503C\u65E0\u6548: ${s.role}`)}),{valid:e.length===0,errors:e}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function Fc(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function Hc(t){return Array.isArray(t)?t.map((e,s)=>({id:`segment_${s}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...Nn]}var Lc,Uc,Bc,Nn,Gn,Kc,Xa=H(()=>{Lc="youyou_toolkit_prompt_editor",Uc={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},Bc={system:"fa-server",ai:"fa-robot",user:"fa-user"},Nn=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],Gn=class{constructor(e={}){this.containerId=e.containerId||Lc,this.segments=e.segments||[...Nn],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...Nn],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let s=Uc[e.type]||e.type,n=Bc[e.type]||"fa-file",r=e.mainSlot==="A"||e.isMain,o=e.mainSlot==="B"||e.isMain2,a=r?"var(--yyt-accent, #7bb7ff)":o?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${r?"yyt-main-a":""} ${o?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
           style="${a?`border-left: 3px solid ${a};`:""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${n}"></i>
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
    `}bindEvents(){this.$container&&(this.$container.find(".yyt-prompt-toggle").on("click",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.find(".yyt-prompt-delete").on("click",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.find(".yyt-prompt-role").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{role:n})}),this.$container.find(".yyt-prompt-main-slot").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:n})}),this.$container.find(".yyt-prompt-textarea").on("input",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.find(`#${this.containerId}-add-segment`).on("click",()=>{this.addSegment()}),this.$container.find(`#${this.containerId}-import-prompt`).on("click",()=>{this.importPrompt()}),this.$container.find(`#${this.containerId}-export-prompt`).on("click",()=>{this.exportPrompt()}))}addSegment(e=null){let s=`segment_${Date.now()}`,n=e||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};n.id||(n.id=s),this.segments.push(n),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let s=this.segments.findIndex(r=>r.id===e);if(s===-1)return;if(this.segments[s].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,s){let n=this.segments.find(r=>r.id===e);n&&(Object.assign(n,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=s=>{let n=s.target.files[0];if(!n)return;let r=new FileReader;r.onload=o=>{try{let a=JSON.parse(o.target.result);Array.isArray(a)?(this.setSegments(a),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",a)}},r.readAsText(n)},e.click()}exportPrompt(){let e=this.getSegments(),s=JSON.stringify(e,null,2),n=new Blob([s],{type:"application/json"}),r=URL.createObjectURL(n),o=document.createElement("a");o.href=r,o.download=`prompt_group_${Date.now()}.json`,o.click(),URL.revokeObjectURL(r),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}};Kc=Gn});function Qa(t,e={}){let{constants:s,topLevelWindow:n,modules:r}=t,{SCRIPT_ID:o,SCRIPT_VERSION:a,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=s,c=null,u=!1;function d(...M){console.log(`[${o}]`,...M)}function p(...M){console.error(`[${o}]`,...M)}async function m(){return c||(c=(async()=>{try{return r.storageModule=await Promise.resolve().then(()=>(ds(),lo)),r.apiConnectionModule=await Promise.resolve().then(()=>(Ls(),po)),r.presetManagerModule=await Promise.resolve().then(()=>(js(),yo)),r.uiModule=await Promise.resolve().then(()=>(to(),Na)),r.uiComponentsModule=await Promise.resolve().then(()=>(Ya(),Ka)),r.regexExtractorModule=await Promise.resolve().then(()=>(Zs(),wo)),r.toolManagerModule=await Promise.resolve().then(()=>(sn(),Ao)),r.toolExecutorModule=await Promise.resolve().then(()=>(Rr(),qo)),r.toolTriggerModule=await Promise.resolve().then(()=>(Vr(),_a)),r.windowManagerModule=await Promise.resolve().then(()=>(qa(),Va)),r.toolRegistryModule=await Promise.resolve().then(()=>(es(),Fo)),r.promptEditorModule=await Promise.resolve().then(()=>(Xa(),Ja)),r.settingsServiceModule=await Promise.resolve().then(()=>(Ts(),Ko)),r.bypassManagerModule=await Promise.resolve().then(()=>(Ss(),Ho)),r.variableResolverModule=await Promise.resolve().then(()=>(Cr(),Zo)),r.contextInjectorModule=await Promise.resolve().then(()=>(Mr(),Xo)),r.toolPromptServiceModule=await Promise.resolve().then(()=>(Pr(),ta)),r.toolOutputServiceModule=await Promise.resolve().then(()=>(kr(),sa)),r.toolOutputServiceModule?.toolOutputService&&r.apiConnectionModule&&r.toolOutputServiceModule.toolOutputService.setApiConnection(r.apiConnectionModule),!0}catch(M){return c=null,console.warn(`[${o}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,M),!1}})(),c)}function b(){return`
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
        width: min(1500px, calc(100vw - 4px));
        max-width: calc(100vw - 4px);
        height: min(1120px, calc(100vh - 4px));
        max-height: calc(100vh - 4px);
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
        padding: 18px 20px;
        overflow: hidden;
      }

      .yyt-popup-shell {
        display: flex;
        flex-direction: column;
        min-height: 0;
        flex: 1;
        gap: 14px;
      }

      .yyt-content-frame {
        flex: 1;
        min-height: 0;
        padding: 6px;
        border-radius: 18px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.015) 100%);
        border: 1px solid rgba(255, 255, 255, 0.06);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
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
      .yyt-shell-topbar {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(280px, 340px);
        gap: 18px;
        padding: 18px 20px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.07);
        background:
          radial-gradient(600px 240px at 0% 0%, rgba(123, 183, 255, 0.12), transparent 65%),
          linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.02) 100%);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
      }

      .yyt-shell-topbar-main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        min-width: 0;
      }

      .yyt-shell-topbar-side {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .yyt-shell-kicker {
        display: inline-flex;
        align-items: center;
        width: fit-content;
        padding: 5px 10px;
        border-radius: 999px;
        background: rgba(123, 183, 255, 0.12);
        border: 1px solid rgba(123, 183, 255, 0.18);
        color: var(--yyt-accent);
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.4px;
        text-transform: uppercase;
      }

      .yyt-shell-heading {
        font-size: 24px;
        font-weight: 800;
        line-height: 1.1;
        color: var(--yyt-text);
      }

      .yyt-shell-overview-text {
        font-size: 13px;
        line-height: 1.7;
        color: var(--yyt-text-secondary);
      }

      .yyt-shell-current-card {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
        padding: 14px 16px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .yyt-shell-current-label {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        color: var(--yyt-text-muted);
      }

      .yyt-shell-current-page {
        font-size: 15px;
        font-weight: 800;
        line-height: 1.3;
        color: var(--yyt-text);
        word-break: break-word;
      }

      .yyt-shell-current-desc {
        font-size: 12px;
        line-height: 1.6;
        color: var(--yyt-text-secondary);
      }

      .yyt-shell-stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(90px, 1fr));
        gap: 10px;
      }

      .yyt-shell-stat {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 6px;
        min-width: 92px;
        padding: 14px 14px 12px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .yyt-shell-stat-label {
        font-size: 11px;
        color: var(--yyt-text-muted);
      }

      .yyt-shell-stat-value {
        font-size: 22px;
        font-weight: 800;
        line-height: 1;
        color: var(--yyt-text);
      }

      .yyt-shell-workspace {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: minmax(220px, 248px) minmax(0, 1fr);
        gap: 14px;
      }

      .yyt-shell-sidebar {
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .yyt-shell-sidebar-card {
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
        overflow: hidden;
        padding: 16px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.07);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.015) 100%);
      }

      .yyt-shell-sidebar-title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      .yyt-shell-sidebar-title {
        font-size: 13px;
        font-weight: 700;
        color: var(--yyt-text);
      }

      .yyt-shell-sidebar-hint {
        font-size: 11px;
        color: var(--yyt-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.4px;
      }

      .yyt-main-nav {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 0;
        margin-bottom: 0;
        background: transparent;
        border: none;
        min-height: 0;
        overflow-y: auto;
      }

      .yyt-main-nav-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 14px 16px;
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

      .yyt-main-nav-icon {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.08);
        flex-shrink: 0;
      }

      .yyt-main-nav-copy {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
        flex: 1;
      }

      .yyt-main-nav-name {
        font-size: 13px;
        font-weight: 700;
        color: inherit;
      }

      .yyt-main-nav-desc {
        font-size: 11px;
        line-height: 1.45;
        color: inherit;
        opacity: 0.72;
      }

      .yyt-shell-sidebar-note {
        padding: 14px 16px;
        border-radius: 16px;
        border: 1px dashed rgba(123, 183, 255, 0.18);
        background: rgba(123, 183, 255, 0.05);
        color: var(--yyt-text-secondary);
        font-size: 12px;
        line-height: 1.65;
      }

      .yyt-shell-main {
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .yyt-shell-main-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 16px 18px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.07);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.015) 100%);
      }

      .yyt-shell-main-actions {
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        gap: 10px;
        flex-wrap: wrap;
        margin-left: auto;
      }

      .yyt-shell-main-heading-block {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
      }

      .yyt-shell-main-label {
        font-size: 11px;
        font-weight: 700;
        color: var(--yyt-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .yyt-shell-main-title {
        font-size: 20px;
        font-weight: 800;
        line-height: 1.15;
        color: var(--yyt-text);
      }

      .yyt-shell-main-description {
        font-size: 13px;
        line-height: 1.65;
        color: var(--yyt-text-secondary);
      }

      .yyt-shell-main-meta {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: var(--yyt-text-secondary);
        font-size: 12px;
        line-height: 1.5;
      }

      .yyt-shell-main-save-btn {
        white-space: nowrap;
        flex-shrink: 0;
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
        height: 100%;
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
        height: 100%;
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
      @media screen and (max-width: 980px) {
        .yyt-popup {
          width: calc(100vw - 4px);
          max-width: calc(100vw - 4px);
          height: calc(100vh - 4px);
          max-height: calc(100vh - 4px);
        }

        .yyt-shell-topbar {
          grid-template-columns: 1fr;
        }

        .yyt-shell-topbar-side {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, auto);
          align-items: stretch;
        }

        .yyt-shell-stats {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .yyt-popup-header-actions {
          gap: 8px;
        }

        .yyt-popup-drag-hint {
          padding: 6px 10px;
        }
      }

      @media screen and (max-width: 860px) {
        .yyt-shell-workspace {
          grid-template-columns: 1fr;
        }

        .yyt-shell-topbar-side {
          grid-template-columns: 1fr;
        }

        .yyt-main-nav {
          flex-direction: row;
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 4px;
        }

        .yyt-main-nav-item {
          min-width: 220px;
        }
      }

      @media screen and (max-height: 860px) {
        .yyt-popup {
          height: calc(100vh - 4px);
          max-height: calc(100vh - 4px);
        }

        .yyt-popup-body {
          padding: 10px 12px;
        }

        .yyt-popup-shell {
          gap: 8px;
        }

        .yyt-shell-topbar,
        .yyt-shell-main-header,
        .yyt-shell-sidebar-card {
          padding: 12px;
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

        .yyt-popup-body {
          padding: 10px 14px;
        }

        .yyt-shell-topbar,
        .yyt-shell-main-header,
        .yyt-shell-sidebar-card {
          padding: 14px;
          border-radius: 16px;
        }

        .yyt-shell-heading {
          font-size: 20px;
        }

        .yyt-shell-main-header {
          flex-direction: column;
          align-items: flex-start;
        }

        .yyt-shell-main-actions {
          width: 100%;
          justify-content: flex-start;
          margin-left: 0;
        }

        .yyt-shell-stats {
          grid-template-columns: 1fr;
        }

        .yyt-shell-topbar-side {
          display: flex;
        }

        .yyt-main-nav {
          flex-direction: column;
          overflow: visible;
        }

        .yyt-main-nav-item {
          min-width: 0;
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
    `}async function R(){let M=`${o}-styles`,z=n.document||document;if(z.getElementById(M))return;let N="",K=[];try{K.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{K.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}K.push("./styles/main.css");for(let me of[...new Set(K.filter(Boolean))])try{let P=await fetch(me);if(P.ok){N=await P.text();break}}catch{}N||(d("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),N=b());let Ie=z.createElement("style");Ie.id=M,Ie.textContent=N,(z.head||z.documentElement).appendChild(Ie),d("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function S(){let M=n.document||document;if(r.uiModule?.getAllStyles){let z=`${o}-ui-styles`;if(!M.getElementById(z)){let N=M.createElement("style");N.id=z,N.textContent=r.uiModule.getAllStyles(),(M.head||M.documentElement).appendChild(N)}}else if(r.uiComponentsModule){let z=`${o}-ui-styles`;if(!M.getElementById(z)){let N=M.createElement("style");N.id=z,N.textContent=[r.uiComponentsModule.getStyles?.()||"",r.uiComponentsModule.getRegexStyles?.()||"",r.uiComponentsModule.getToolStyles?.()||""].join(`
`),(M.head||M.documentElement).appendChild(N)}}if(r.promptEditorModule&&r.promptEditorModule.getPromptEditorStyles){let z=`${o}-prompt-styles`;if(!M.getElementById(z)){let N=M.createElement("style");N.id=z,N.textContent=r.promptEditorModule.getPromptEditorStyles(),(M.head||M.documentElement).appendChild(N)}}}async function L(){try{let{applyUiPreferences:M}=await Promise.resolve().then(()=>(Pn(),Ma));if(r.settingsServiceModule?.settingsService){let z=r.settingsServiceModule.settingsService.getUiSettings();if(z&&z.theme){let N=n.document||document;M(z,N),d(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${z.theme}`)}}}catch(M){d("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",M)}}function ae(){let M=n.jQuery||window.jQuery;if(!M){p("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(ae,1e3);return}let z=n.document||document,N=M("#extensionsMenu",z);if(!N.length){d("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(ae,2e3);return}if(M(`#${l}`,N).length>0){d("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let Ie=M(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),me=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,P=M(me);P.on("click",function(be){be.stopPropagation(),d("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let Oe=M("#extensionsMenuButton",z);Oe.length&&N.is(":visible")&&Oe.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),Ie.append(P),N.append(Ie),d("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function fe(){if(d(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await R(),await m()){if(d("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),!u&&r.uiModule?.initUI)try{r.uiModule.initUI({services:r,autoInjectStyles:!1,targetDocument:n.document||document}),u=!0,d("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(N){console.error(`[${o}] UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,N)}if(r.toolTriggerModule?.initTriggerModule)try{r.toolTriggerModule.initTriggerModule(),d("\u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316")}catch(N){console.error(`[${o}] \u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,N)}S(),await L()}else d("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let z=n.document||document;z.readyState==="loading"?z.addEventListener("DOMContentLoaded",()=>{setTimeout(ae,1e3)}):setTimeout(ae,1e3),d("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:m,injectStyles:R,addMenuItem:ae,init:fe,log:d,logError:p}}function Za(t){let{constants:e,topLevelWindow:s,modules:n,caches:r,uiState:o}=t,{SCRIPT_ID:a,SCRIPT_VERSION:i,POPUP_ID:l}=e,c={cleanup:null},u={cleanups:[]};function d(...y){console.log(`[${a}]`,...y)}function p(...y){console.error(`[${a}]`,...y)}function m(y){return typeof y!="string"?"":y.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function b(){return s.jQuery||window.jQuery}function R(){return s.document||document}function S(y){if(!y)return"\u672A\u9009\u62E9\u9875\u9762";let f=n.toolRegistryModule?.getToolConfig(y);if(!f)return y;if(!f.hasSubTabs)return f.name||y;let v=o.currentSubTab[y]||f.subTabs?.[0]?.id||"",_=f.subTabs?.find(U=>U.id===v);return _?.name?`${f.name} / ${_.name}`:f.name||y}function L(y){if(!y)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let f=n.toolRegistryModule?.getToolConfig(y);if(!f)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!f.hasSubTabs)return f.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let v=o.currentSubTab[y]||f.subTabs?.[0]?.id||"";return f.subTabs?.find(U=>U.id===v)?.description||f.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function ae(){let y=o.currentPopup;if(!y)return;let f=S(o.currentMainTab),v=L(o.currentMainTab),_=y.querySelector(".yyt-popup-active-label");_&&(_.textContent=`\u5F53\u524D\uFF1A${f}`);let U=y.querySelector(".yyt-shell-breadcrumb");U&&(U.textContent=f);let j=y.querySelector(".yyt-shell-main-title");j&&(j.textContent=f);let X=y.querySelector(".yyt-shell-main-description");X&&(X.textContent=v);let O=y.querySelector(".yyt-shell-current-page");O&&(O.textContent=f);let re=y.querySelector(".yyt-shell-current-desc");re&&(re.textContent=v)}function fe(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function M(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(y=>{typeof y=="function"&&y()}),u.cleanups=[])}function z(y){return!!y?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown"].join(","))}function N(y){let f=y?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-dialog-body"].join(","));return f?f.scrollHeight>f.clientHeight+2||f.scrollWidth>f.clientWidth+2:!1}function K(y,f){return f?.closest?.(".yyt-scrollable-surface")===y}function Ie(y,f){return!y||!f?null:[f.closest?.(".yyt-tool-list"),f.closest?.(".yyt-settings-content"),f.closest?.(".yyt-sub-content"),f.closest?.(".yyt-tab-content.active"),y].filter(Boolean).find(_=>_!==y&&!y.contains(_)?!1:_.scrollHeight>_.clientHeight+2||_.scrollWidth>_.clientWidth+2)||y}function me(y){let f=R();if(!y||!f)return;y.classList.add("yyt-scrollable-surface");let v=!1,_=!1,U=0,j=0,X=0,O=0,re=!1,ie=!1,Te=()=>{v=!1,_=!1,y.classList.remove("yyt-scroll-dragging")},We=F=>{F.button===0&&(z(F.target)||K(y,F.target)&&(re=y.scrollWidth>y.clientWidth+2,ie=y.scrollHeight>y.clientHeight+2,!(!re&&!ie)&&(F.stopPropagation(),v=!0,_=!1,U=F.clientX,j=F.clientY,X=y.scrollLeft,O=y.scrollTop)))},Ne=F=>{if(!v)return;let it=F.clientX-U,Pe=F.clientY-j;!(Math.abs(it)>4||Math.abs(Pe)>4)&&!_||(_=!0,y.classList.add("yyt-scroll-dragging"),re&&(y.scrollLeft=X-it),ie&&(y.scrollTop=O-Pe),F.preventDefault())},Me=()=>{Te()},Q=F=>{if(F.ctrlKey||N(F.target))return;let it=y.classList.contains("yyt-content");if(!it&&!K(y,F.target))return;let Pe=Ie(y,F.target);!Pe||!(Pe.scrollHeight>Pe.clientHeight+2||Pe.scrollWidth>Pe.clientWidth+2)||(Math.abs(F.deltaY)>0&&(Pe.scrollTop+=F.deltaY),Math.abs(F.deltaX)>0&&(Pe.scrollLeft+=F.deltaX),F.preventDefault(),(!it||Pe!==y)&&F.stopPropagation())},ve=F=>{_&&F.preventDefault()};y.addEventListener("mousedown",We),y.addEventListener("wheel",Q,{passive:!1}),y.addEventListener("dragstart",ve),f.addEventListener("mousemove",Ne),f.addEventListener("mouseup",Me),u.cleanups.push(()=>{Te(),y.classList.remove("yyt-scrollable-surface"),y.removeEventListener("mousedown",We),y.removeEventListener("wheel",Q),y.removeEventListener("dragstart",ve),f.removeEventListener("mousemove",Ne),f.removeEventListener("mouseup",Me)})}function P(){let y=o.currentPopup;if(!y)return;M();let f=[...y.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...y.querySelectorAll(".yyt-sub-nav"),...y.querySelectorAll(".yyt-content"),...y.querySelectorAll(".yyt-tab-content.active"),...y.querySelectorAll(".yyt-tab-content.active .yyt-sub-content"),...y.querySelectorAll(".yyt-settings-content"),...y.querySelectorAll(".yyt-tool-list")];[...new Set(f)].forEach(me)}function Re(){let y=R(),f=o.currentPopup,v=f?.querySelector(".yyt-popup-header");if(!f||!v||!y)return;let _=!1,U=0,j=0,X=0,O=0,re="",ie=()=>({width:s.innerWidth||y.documentElement?.clientWidth||window.innerWidth||0,height:s.innerHeight||y.documentElement?.clientHeight||window.innerHeight||0}),Te=(ve,F,it)=>Math.min(Math.max(ve,F),it),We=()=>{_&&(_=!1,f.classList.remove("yyt-popup-dragging"),y.body.style.userSelect=re)},Ne=ve=>{if(!_||!o.currentPopup)return;let F=ve.clientX-U,it=ve.clientY-j,{width:Pe,height:Un}=ie(),si=f.offsetWidth||0,ni=f.offsetHeight||0,ri=Math.max(0,Pe-si),oi=Math.max(0,Un-ni);f.style.left=`${Te(X+F,0,ri)}px`,f.style.top=`${Te(O+it,0,oi)}px`,f.style.transform="none",f.style.right="auto",f.style.bottom="auto"},Me=()=>{We()},Q=ve=>{if(ve.button!==0||ve.target?.closest(".yyt-popup-close"))return;_=!0,U=ve.clientX,j=ve.clientY;let F=f.getBoundingClientRect();X=F.left,O=F.top,f.style.left=`${F.left}px`,f.style.top=`${F.top}px`,f.style.transform="none",f.style.right="auto",f.style.bottom="auto",f.classList.add("yyt-popup-dragging"),re=y.body.style.userSelect||"",y.body.style.userSelect="none",ve.preventDefault()};v.addEventListener("mousedown",Q),y.addEventListener("mousemove",Ne),y.addEventListener("mouseup",Me),c.cleanup=()=>{We(),v.removeEventListener("mousedown",Q),y.removeEventListener("mousemove",Ne),y.removeEventListener("mouseup",Me)}}function be(){fe(),M(),o.currentPopup&&(o.currentPopup.remove(),o.currentPopup=null),o.currentOverlay&&(o.currentOverlay.remove(),o.currentOverlay=null),d("\u5F39\u7A97\u5DF2\u5173\u95ED")}function Oe(y){o.currentMainTab=y;let f=b();if(!f||!o.currentPopup)return;f(o.currentPopup).find(".yyt-main-nav-item").removeClass("active"),f(o.currentPopup).find(`.yyt-main-nav-item[data-tab="${y}"]`).addClass("active");let v=n.toolRegistryModule?.getToolConfig(y);v?.hasSubTabs?(f(o.currentPopup).find(".yyt-sub-nav").show(),Ke(y,v.subTabs)):f(o.currentPopup).find(".yyt-sub-nav").hide(),f(o.currentPopup).find(".yyt-tab-content").removeClass("active"),f(o.currentPopup).find(`.yyt-tab-content[data-tab="${y}"]`).addClass("active"),nt(y),ae(),P()}function xe(y,f){o.currentSubTab[y]=f;let v=b();!v||!o.currentPopup||(v(o.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),v(o.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${f}"]`).addClass("active"),Ye(y,f),ae(),P())}function Ke(y,f){let v=b();if(!v||!o.currentPopup||!f)return;let _=o.currentSubTab[y]||f[0]?.id,U=f.map(j=>`
      <div class="yyt-sub-nav-item ${j.id===_?"active":""}" data-subtab="${j.id}">
        <i class="fa-solid ${j.icon||"fa-file"}"></i>
        <span>${j.name}</span>
      </div>
    `).join("");v(o.currentPopup).find(".yyt-sub-nav").html(U),v(o.currentPopup).find(".yyt-sub-nav-item").on("click",function(){let X=v(this).data("subtab");xe(y,X)}),P()}async function nt(y){let f=b();if(!f||!o.currentPopup)return;let v=f(o.currentPopup).find(`.yyt-tab-content[data-tab="${y}"]`);if(!v.length)return;let _=n.toolRegistryModule?.getToolConfig(y);switch(y){case"apiPresets":n.uiModule?.renderApiPanel?n.uiModule.renderApiPanel(v):n.uiComponentsModule?.render&&n.uiComponentsModule.render(v);break;case"toolManage":n.uiModule?.renderToolPanel?n.uiModule.renderToolPanel(v):n.uiComponentsModule?.renderTool&&n.uiComponentsModule.renderTool(v);break;case"regexExtract":n.uiModule?.renderRegexPanel?n.uiModule.renderRegexPanel(v):n.uiComponentsModule?.renderRegex&&n.uiComponentsModule.renderRegex(v);break;case"tools":if(_?.hasSubTabs&&_.subTabs?.length>0){let U=o.currentSubTab[y]||_.subTabs[0].id;Ye(y,U)}else v.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":n.uiModule?.renderBypassPanel?n.uiModule.renderBypassPanel(v):v.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"settings":n.uiModule?.renderSettingsPanel?n.uiModule.renderSettingsPanel(v):v.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:ot(y,v);break}P()}function Ye(y,f){let v=b();if(!v||!o.currentPopup)return;let _=v(o.currentPopup).find(`.yyt-tab-content[data-tab="${y}"]`);if(!_.length)return;let U=n.toolRegistryModule?.getToolConfig(y);if(U?.hasSubTabs){let X=U.subTabs?.find(O=>O.id===f);if(X){let O=_.find(".yyt-sub-content");switch(O.length||(_.html('<div class="yyt-sub-content"></div>'),O=_.find(".yyt-sub-content")),X.component){case"SummaryToolPanel":n.uiModule?.renderSummaryToolPanel?n.uiModule.renderSummaryToolPanel(O):n.uiComponentsModule?.SummaryToolPanel?n.uiComponentsModule.SummaryToolPanel.renderTo(O):O.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"StatusBlockPanel":n.uiModule?.renderStatusBlockPanel?n.uiModule.renderStatusBlockPanel(O):n.uiComponentsModule?.StatusBlockPanel?n.uiComponentsModule.StatusBlockPanel.renderTo(O):O.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"YouyouReviewPanel":n.uiModule?.renderYouyouReviewPanel?n.uiModule.renderYouyouReviewPanel(O):n.uiComponentsModule?.YouyouReviewPanel?n.uiComponentsModule.YouyouReviewPanel.renderTo(O):O.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"GenericToolConfigPanel":rt(X,O);break;default:O.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}return}let j=_.find(".yyt-sub-content");if(j.length){switch(f){case"config":ce(y,j);break;case"prompts":de(y,j);break;case"presets":at(y,j);break;default:j.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}P()}}async function rt(y,f){if(!(!b()||!f?.length||!y?.id))try{let _=r.dynamicToolPanelCache.get(y.id);if(!_){let j=(await Promise.resolve().then(()=>(Ps(),Aa)))?.createToolConfigPanel;if(typeof j!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");_=j({id:`${y.id}Panel`,toolId:y.id,postResponseHint:`\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${y.name||y.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${y.id}-extraction-preview`,previewTitle:`${y.name||y.id} \u63D0\u53D6\u9884\u89C8`}),r.dynamicToolPanelCache.set(y.id,_)}_.renderTo(f),P()}catch(_){console.error(`[${a}] \u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,_),f.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function ot(y,f){if(!b())return;let _=n.toolRegistryModule?.getToolConfig(y);if(!_){f.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let U=o.currentSubTab[y]||_.subTabs?.[0]?.id||"config";f.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${U}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),Ye(y,U)}function ce(y,f){if(!b())return;let _=n.toolManagerModule?.getTool(y),U=n.presetManagerModule?.getAllPresets()||[],j=n.toolRegistryModule?.getToolApiPreset(y)||"",X=U.map(O=>`<option value="${m(O.name)}" ${O.name===j?"selected":""}>${m(O.name)}</option>`).join("");f.html(`
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
              ${X}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${_?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${_?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),f.find("#yyt-save-tool-preset").on("click",function(){let re=f.find("#yyt-tool-api-preset").val();n.toolRegistryModule?.setToolApiPreset(y,re);let ie=s.toastr;ie&&ie.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}function de(y,f){if(!b()||!n.promptEditorModule){f.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let U=n.toolManagerModule?.getTool(y)?.config?.messages||[],j=n.promptEditorModule.messagesToSegments?n.promptEditorModule.messagesToSegments(U):n.promptEditorModule.DEFAULT_PROMPT_SEGMENTS,X=new n.promptEditorModule.PromptEditor({containerId:`yyt-prompt-editor-${y}`,segments:j,onChange:re=>{let ie=n.promptEditorModule.segmentsToMessages?n.promptEditorModule.segmentsToMessages(re):[];d("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",ie.length,"\u6761\u6D88\u606F")}});f.html(`<div id="yyt-prompt-editor-${y}" class="yyt-prompt-editor-container"></div>`),X.init(f.find(`#yyt-prompt-editor-${y}`));let O=n.promptEditorModule.getPromptEditorStyles?n.promptEditorModule.getPromptEditorStyles():"";if(O){let re="yyt-prompt-editor-styles",ie=s.document||document;if(!ie.getElementById(re)){let Te=ie.createElement("style");Te.id=re,Te.textContent=O,(ie.head||ie.documentElement).appendChild(Te)}}}function at(y,f){b()&&f.html(`
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
    `)}function Ft(){if(o.currentPopup){d("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let y=b(),f=R();if(!y){p("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let v=n.toolRegistryModule?.getToolList()||[];if(!v.length){p("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}v.some(Q=>Q.id===o.currentMainTab)||(o.currentMainTab=v[0].id);let _=n.toolRegistryModule?.getToolConfig("tools"),U=Array.isArray(_?.subTabs)?_.subTabs:[],j=U.filter(Q=>Q?.isCustom).length,X=U.filter(Q=>!Q?.isCustom).length,O=S(o.currentMainTab),re=L(o.currentMainTab);o.currentOverlay=f.createElement("div"),o.currentOverlay.className="yyt-popup-overlay",o.currentOverlay.addEventListener("click",Q=>{Q.target===o.currentOverlay&&be()}),f.body.appendChild(o.currentOverlay);let ie=v.map(Q=>`
      <div class="yyt-main-nav-item ${Q.id===o.currentMainTab?"active":""}" data-tab="${Q.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${m(Q.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${m(Q.name||Q.id)}</span>
          <span class="yyt-main-nav-desc">${m(Q.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join(""),Te=v.map(Q=>`
      <div class="yyt-tab-content ${Q.id===o.currentMainTab?"active":""}" data-tab="${Q.id}">
        <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
      </div>
    `).join(""),We=`
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
            <div class="yyt-shell-topbar">
              <div class="yyt-shell-topbar-main">
                <div class="yyt-shell-kicker">Workspace</div>
                <div class="yyt-shell-heading">\u7EDF\u4E00\u5DE5\u5177\u5DE5\u4F5C\u53F0</div>
                <div class="yyt-shell-overview-text">\u5C06 API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001\u7834\u9650\u8BCD\u4E0E\u6267\u884C\u8BCA\u65AD\u6536\u53E3\u5230\u4E00\u4E2A\u66F4\u7D27\u51D1\u7684\u5DE5\u4F5C\u533A\u91CC\uFF0C\u4F18\u5148\u4FDD\u8BC1\u53EF\u8BFB\u6027\u548C\u53EF\u64CD\u4F5C\u7A7A\u95F4\u3002</div>
              </div>
              <div class="yyt-shell-topbar-side">
                <div class="yyt-shell-current-card">
                  <span class="yyt-shell-current-label">\u5F53\u524D\u9875\u9762</span>
                  <strong class="yyt-shell-current-page">${m(O)}</strong>
                  <span class="yyt-shell-current-desc">${m(re)}</span>
                </div>
                <div class="yyt-shell-stats">
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u4E3B\u9875\u9762</span>
                    <strong class="yyt-shell-stat-value">${v.length}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${X}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${j}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="yyt-shell-workspace">
              <aside class="yyt-shell-sidebar">
                <div class="yyt-shell-sidebar-card">
                  <div class="yyt-shell-sidebar-title-row">
                    <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
                    <span class="yyt-shell-sidebar-hint">${v.length} tabs</span>
                  </div>
                  <div class="yyt-main-nav">
                    ${ie}
                  </div>
                  <div class="yyt-shell-sidebar-note">
                    \u4FDD\u5B58\u540E\uFF0C\u81EA\u52A8\u76D1\u542C\u3001\u624B\u52A8\u6267\u884C\u4E0E\u5199\u56DE\u94FE\u90FD\u4F1A\u4EE5\u6700\u65B0\u914D\u7F6E\u4E3A\u51C6\u3002
                  </div>
                </div>
              </aside>

              <section class="yyt-shell-main">
                <div class="yyt-shell-main-header">
                  <div class="yyt-shell-main-heading-block">
                    <div class="yyt-shell-main-label">\u5F53\u524D\u9875\u9762</div>
                    <div class="yyt-shell-main-title">${m(O)}</div>
                    <div class="yyt-shell-main-description">${m(re)}</div>
                  </div>
                  <div class="yyt-shell-main-actions">
                    <div class="yyt-shell-main-meta">
                      <i class="fa-solid fa-circle-info"></i>
                      <span>\u4FDD\u5B58\u540E\u81EA\u52A8\u76D1\u542C\u4E0E\u5199\u56DE\u94FE\u4F1A\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
                    </div>
                  </div>
                </div>

                <div class="yyt-sub-nav" style="display: none;">
                  <!-- \u6B21\u7EA7\u9876\u680F\u5C06\u52A8\u6001\u6E32\u67D3 -->
                </div>

                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${Te}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div class="yyt-popup-footer">
          <div class="yyt-popup-footer-left">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${m(O)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
            </div>
          </div>
          <div class="yyt-popup-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${a}-close-btn">\u5173\u95ED</button>
          </div>
        </div>
      </div>
    `,Ne=f.createElement("div");Ne.innerHTML=We,o.currentPopup=Ne.firstElementChild,f.body.appendChild(o.currentPopup),y(o.currentPopup).find(".yyt-popup-close").on("click",be),y(o.currentPopup).find(`#${a}-close-btn`).on("click",be),y(o.currentPopup).find(".yyt-main-nav-item").on("click",function(){let ve=y(this).data("tab");ve&&Oe(ve)}),Re(),nt(o.currentMainTab);let Me=n.toolRegistryModule?.getToolConfig(o.currentMainTab);Me?.hasSubTabs&&(y(o.currentPopup).find(".yyt-sub-nav").show(),Ke(o.currentMainTab,Me.subTabs)),ae(),P(),d("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:Ft,closePopup:be,switchMainTab:Oe,switchSubTab:xe,renderTabContent:nt,renderSubTabContent:Ye}}function ei(t,e={}){let{constants:s,modules:n}=t,{SCRIPT_ID:r,SCRIPT_VERSION:o}=s,{init:a,loadModules:i,addMenuItem:l,popupShell:c}=e;return{version:o,id:r,init:a,openPopup:c?.openPopup,closePopup:c?.closePopup,switchMainTab:c?.switchMainTab,switchSubTab:c?.switchSubTab,addMenuItem:l,getStorage:()=>n.storageModule,getApiConnection:()=>n.apiConnectionModule,getPresetManager:()=>n.presetManagerModule,getUi:()=>n.uiModule,getUiModule:()=>n.uiModule,getUiComponents:()=>n.uiComponentsModule,getRegexExtractor:()=>n.regexExtractorModule,getToolManager:()=>n.toolManagerModule,getToolExecutor:()=>n.toolExecutorModule,getToolTrigger:()=>n.toolTriggerModule,getAutoTriggerDiagnostics:u=>n.toolTriggerModule?.getAutoTriggerDiagnostics?.(u)||null,getWindowManager:()=>n.windowManagerModule,getToolRegistry:()=>n.toolRegistryModule,getPromptEditor:()=>n.promptEditorModule,getSettingsService:()=>n.settingsServiceModule,getBypassManager:()=>n.bypassManagerModule,getVariableResolver:()=>n.variableResolverModule,getContextInjector:()=>n.contextInjectorModule,getToolPromptService:()=>n.toolPromptServiceModule,getToolOutputService:()=>n.toolOutputServiceModule,async getApiConfig(){return await i(),n.storageModule?n.storageModule.loadSettings().apiConfig:null},async saveApiConfig(u){return await i(),n.apiConnectionModule?(n.apiConnectionModule.updateApiConfig(u),!0):!1},async getPresets(){return await i(),n.presetManagerModule?n.presetManagerModule.getAllPresets():[]},async sendApiRequest(u,d){if(await i(),n.apiConnectionModule)return n.apiConnectionModule.sendApiRequest(u,d);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),n.apiConnectionModule?n.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(u,d){return n.toolRegistryModule?.registerTool(u,d)||!1},unregisterTool(u){return n.toolRegistryModule?.unregisterTool(u)||!1},getToolList(){return n.toolRegistryModule?.getToolList()||[]},createWindow(u){return n.windowManagerModule?.createWindow(u)||null},closeWindow(u){n.windowManagerModule?.closeWindow(u)}}}var Gs="youyou_toolkit",Yc="0.6.2",Wc=`${Gs}-menu-item`,Vc=`${Gs}-menu-container`,qc=`${Gs}-popup`,Jc=typeof window.parent<"u"?window.parent:window,ro={constants:{SCRIPT_ID:Gs,SCRIPT_VERSION:Yc,MENU_ITEM_ID:Wc,MENU_CONTAINER_ID:Vc,POPUP_ID:qc},topLevelWindow:Jc,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,uiComponentsModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,promptEditorModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null},caches:{dynamicToolPanelCache:new Map},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"apiPresets",currentSubTab:{}}},ti=Za(ro),Ln=Qa(ro,{openPopup:ti.openPopup}),no=ei(ro,{init:Ln.init,loadModules:Ln.loadModules,addMenuItem:Ln.addMenuItem,popupShell:ti});if(typeof window<"u"&&(window.YouYouToolkit=no,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=no}catch{}var Qu=no;Ln.init();console.log(`[${Gs}] \u6A21\u5757\u52A0\u8F7D\u5B8C\u6210`);export{Qu as default};
