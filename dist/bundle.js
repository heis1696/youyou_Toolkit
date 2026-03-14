var _n=Object.defineProperty;var A=(e,t)=>()=>(e&&(t=e(e=0)),t);var q=(e,t)=>{for(var s in t)_n(e,s,{get:t[s],enumerable:!0})};function io(){let e=v;return e._getStorage(),e._storage}function $(){return v.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function j(e){v.set("settings",e)}var re,v,T,ro,qe,Ce=A(()=>{re=class e{constructor(t="youyou_toolkit"){this.namespace=t,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let t=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(t.SillyTavern?.getContext){let s=t.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespace]||(s.extensionSettings[this.namespace]={}),this._storage={_target:s.extensionSettings[this.namespace],getItem:o=>{let n=s.extensionSettings[this.namespace][o];return typeof n=="string"?n:n?JSON.stringify(n):null},setItem:(o,n)=>{s.extensionSettings[this.namespace][o]=n,this._saveSettings(s)},removeItem:o=>{delete s.extensionSettings[this.namespace][o],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespace}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:t=>{try{return localStorage.getItem(t)}catch{return null}},setItem:(t,s)=>{try{localStorage.setItem(t,s)}catch(o){console.error(`[${this.namespace}] localStorage\u5199\u5165\u5931\u8D25:`,o)}},removeItem:t=>{try{localStorage.removeItem(t)}catch{}},_isTavern:!1},this._storage}_saveSettings(t){if(typeof t.saveSettings=="function")try{t.saveSettings()}catch{}else if(typeof t.saveSettingsDebounced=="function")try{t.saveSettingsDebounced()}catch{}}get(t,s=null){let o=`${this.namespace}:${t}`;if(this._cache.has(o))return this._cache.get(o);let n=this._getStorage(),r=this._getFullKey(t),i=n.getItem(r);if(i===null)return s;try{let l=JSON.parse(i);return this._cache.set(o,l),l}catch{return i}}set(t,s){let o=this._getStorage(),n=this._getFullKey(t),r=`${this.namespace}:${t}`;this._cache.set(r,s);try{o.setItem(n,JSON.stringify(s))}catch(i){console.error(`[${this.namespace}] \u5B58\u50A8\u5931\u8D25:`,i)}}remove(t){let s=this._getStorage(),o=this._getFullKey(t),n=`${this.namespace}:${t}`;this._cache.delete(n),s.removeItem(o)}has(t){let s=this._getStorage(),o=this._getFullKey(t);return s.getItem(o)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let o=s.SillyTavern.getContext();o?.extensionSettings?.[this.namespace]&&(o.extensionSettings[this.namespace]={},this._saveSettings(o))}}else{let s=`${this.namespace}_`,o=[];for(let n=0;n<localStorage.length;n++){let r=localStorage.key(n);r&&r.startsWith(s)&&o.push(r)}o.forEach(n=>localStorage.removeItem(n))}this._cache.clear()}_getFullKey(t){return this._getStorage()._isTavern?t:`${this.namespace}_${t}`}namespace(t){return new e(`${this.namespace}:${t}`)}getMultiple(t){let s={};return t.forEach(o=>{s[o]=this.get(o)}),s}setMultiple(t){Object.entries(t).forEach(([s,o])=>{this.set(s,o)})}exportAll(){let t=this._getStorage(),s={};if(t._isTavern){let o=typeof window.parent<"u"?window.parent:window;if(o.SillyTavern?.getContext){let r=o.SillyTavern.getContext()?.extensionSettings?.[this.namespace]||{};Object.entries(r).forEach(([i,l])=>{s[i]=typeof l=="string"?JSON.parse(l):l})}}else{let o=`${this.namespace}_`;for(let n=0;n<localStorage.length;n++){let r=localStorage.key(n);if(r&&r.startsWith(o)){let i=r.slice(o.length);try{s[i]=JSON.parse(localStorage.getItem(r))}catch{s[i]=localStorage.getItem(r)}}}}return s}},v=new re("youyou_toolkit"),T=new re("youyou_toolkit:tools"),ro=new re("youyou_toolkit:presets"),qe=new re("youyou_toolkit:windows")});var lo={};q(lo,{DEFAULT_API_PRESETS:()=>An,DEFAULT_SETTINGS:()=>kn,STORAGE_KEYS:()=>Je,StorageService:()=>re,deepMerge:()=>ao,getCurrentPresetName:()=>_e,getStorage:()=>io,loadApiPresets:()=>O,loadSettings:()=>$,presetStorage:()=>ro,saveApiPresets:()=>X,saveSettings:()=>j,setCurrentPresetName:()=>ke,storage:()=>v,toolStorage:()=>T,windowStorage:()=>qe});function O(){return v.get(Je.API_PRESETS)||[]}function X(e){v.set(Je.API_PRESETS,e)}function _e(){return v.get(Je.CURRENT_PRESET)||""}function ke(e){v.set(Je.CURRENT_PRESET,e||"")}function ao(e,t){let s=n=>n&&typeof n=="object"&&!Array.isArray(n),o={...e};return s(e)&&s(t)&&Object.keys(t).forEach(n=>{s(t[n])?n in e?o[n]=ao(e[n],t[n]):Object.assign(o,{[n]:t[n]}):Object.assign(o,{[n]:t[n]})}),o}var Je,kn,An,Ke=A(()=>{Ce();Ce();Je={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},kn={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},An=[]});var po={};q(po,{API_STATUS:()=>Pn,fetchAvailableModels:()=>ss,getApiConfig:()=>ge,getEffectiveApiConfig:()=>Rn,sendApiRequest:()=>co,testApiConnection:()=>Mn,updateApiConfig:()=>me,validateApiConfig:()=>mt});function ge(){return $().apiConfig||{}}function me(e){let t=$();t.apiConfig={...t.apiConfig,...e},j(t)}function mt(e){let t=[];if(e.useMainApi)return{valid:!0,errors:[]};if(!e.url||!e.url.trim())t.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(e.url)}catch{t.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!e.model||!e.model.trim())&&t.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:t.length===0,errors:t}}function Rn(e=""){let t=$();if(e){let o=(t.apiPresets||[]).find(n=>n.name===e);if(o&&o.apiConfig)return{...o.apiConfig,presetName:o.name}}return t.apiConfig||{}}function In(e,t={}){let s=t.apiConfig||ge();return{messages:e,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:!1,...t.extraParams}}async function co(e,t={},s=null){let o=t.apiConfig||ge(),n=o.useMainApi,r=mt(o);if(!r.valid&&!n)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${r.errors.join(", ")}`);return n?await Dn(e,t,s):await On(e,o,t,s)}async function Dn(e,t,s){let o=typeof window.parent<"u"?window.parent:window;if(!o.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let n=await o.TavernHelper.generateRaw({ordered_prompts:e,should_stream:!1,...t.extraParams});if(typeof n!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return n.trim()}catch(n){throw n.name==="AbortError"?n:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${n.message}`)}}async function On(e,t,s,o){let n=In(e,{apiConfig:t,...s}),r={"Content-Type":"application/json"};t.apiKey&&(r.Authorization=`Bearer ${t.apiKey}`);let i=await fetch(t.url,{method:"POST",headers:r,body:JSON.stringify(n),signal:o});if(!i.ok){let p=await i.text().catch(()=>"Unknown error");throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${p}`)}let l=await i.json(),c="";if(l.choices&&l.choices[0]?.message?.content)c=l.choices[0].message.content;else if(l.content)c=l.content;else if(l.text)c=l.text;else if(l.response)c=l.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(l).slice(0,200)}`);return c.trim()}async function Mn(e=null){let t=e||ge(),s=Date.now();try{await co([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:t});let n=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${n}ms)`,latency:n}}catch(o){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${o.message}`,latency:Date.now()-s}}}async function ss(e=null){let t=e||ge();return t.useMainApi?await Nn():await Ln(t)}async function Nn(){let e=typeof window.parent<"u"?window.parent:window;try{if(e.SillyTavern?.getContext){let t=e.SillyTavern.getContext();if(t.settings?.api_server)return[t.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function Ln(e){if(!e.url||!e.apiKey)return[];try{let s=`${e.url.replace(/\/chat\/completions$/,"").replace(/\/completions$/,"")}/models`,o=await fetch(s,{method:"GET",headers:{Authorization:`Bearer ${e.apiKey}`}});if(!o.ok)return[];let n=await o.json();return n.data&&Array.isArray(n.data)?n.data.map(r=>r.id||r.name).filter(Boolean).sort():[]}catch{return[]}}var Pn,os=A(()=>{Ke();Pn={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var yo={};q(yo,{createPreset:()=>xt,createPresetFromCurrentConfig:()=>Bn,deletePreset:()=>ht,duplicatePreset:()=>Un,exportPresets:()=>as,generateUniquePresetName:()=>cs,getActiveConfig:()=>is,getActivePresetName:()=>vt,getAllPresets:()=>ie,getPreset:()=>ae,getPresetNames:()=>zn,getStarredPresets:()=>rs,importPresets:()=>ls,presetExists:()=>Xe,renamePreset:()=>jn,switchToPreset:()=>Gn,togglePresetStar:()=>ns,updatePreset:()=>bt,validatePreset:()=>Yn});function ie(){return O()}function zn(){return O().map(t=>t.name)}function ae(e){return!e||typeof e!="string"?null:O().find(s=>s.name===e)||null}function Xe(e){return!e||typeof e!="string"?!1:O().some(s=>s.name===e)}function xt(e){let{name:t,description:s,apiConfig:o}=e;if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let n=t.trim();if(Xe(n))return{success:!1,message:`\u9884\u8BBE "${n}" \u5DF2\u5B58\u5728`};let r={name:n,description:s||"",apiConfig:{url:o?.url||"",apiKey:o?.apiKey||"",model:o?.model||"",useMainApi:o?.useMainApi??!0,max_tokens:o?.max_tokens||4096,temperature:o?.temperature??.7,top_p:o?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},i=O();return i.push(r),X(i),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:r}}function bt(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=O(),o=s.findIndex(i=>i.name===e);if(o===-1)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(t.name&&t.name!==e)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let n=s[o],r={...n,...t,name:n.name,updatedAt:Date.now()};return t.apiConfig&&(r.apiConfig={...n.apiConfig,...t.apiConfig}),s[o]=r,X(s),{success:!0,message:`\u9884\u8BBE "${e}" \u66F4\u65B0\u6210\u529F`,preset:r}}function ht(e){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=O(),s=t.findIndex(o=>o.name===e);return s===-1?{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}:(t.splice(s,1),X(t),_e()===e&&ke(""),{success:!0,message:`\u9884\u8BBE "${e}" \u5DF2\u5220\u9664`})}function jn(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=t.trim();if(!Xe(e))return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(Xe(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o=O(),n=o.find(r=>r.name===e);return n&&(n.name=s,n.updatedAt=Date.now(),X(o),_e()===e&&ke(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function Un(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=t.trim(),o=ae(e);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(Xe(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(o)),name:s,createdAt:Date.now(),updatedAt:Date.now()},r=O();return r.push(n),X(r),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:n}}function ns(e){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=O(),s=t.find(o=>o.name===e);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),X(t),{success:!0,message:s.starred?`\u5DF2\u5C06 "${e}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${e}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}}function rs(){return O().filter(t=>t.starred===!0)}function Gn(e){if(!e)return ke(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let t=ae(e);return t?(ke(e),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${e}"`,apiConfig:t.apiConfig}):{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}}function vt(){return _e()}function is(){let e=_e();if(e){let s=ae(e);if(s)return{presetName:e,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:$().apiConfig||{}}}function as(e=null){if(e){let s=ae(e);if(!s)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let t=O();return JSON.stringify(t,null,2)}function ls(e,t={overwrite:!1}){let s;try{s=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let o=Array.isArray(s)?s:[s];if(o.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let n=O(),r=0;for(let i of o){if(!i.name||typeof i.name!="string"||!i.apiConfig||typeof i.apiConfig!="object")continue;let l=n.findIndex(c=>c.name===i.name);l>=0?t.overwrite&&(i.updatedAt=Date.now(),n[l]=i,r++):(i.createdAt=i.createdAt||Date.now(),i.updatedAt=Date.now(),n.push(i),r++)}return r>0&&X(n),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${r} \u4E2A\u9884\u8BBE`,imported:r}}function Bn(e,t=""){let s=$();return xt({name:e,description:t,apiConfig:s.apiConfig})}function Yn(e){let t=[];return(!e.name||typeof e.name!="string"||!e.name.trim())&&t.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!e.apiConfig||typeof e.apiConfig!="object")&&t.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:t.length===0,errors:t}}function cs(e){(!e||typeof e!="string")&&(e="\u65B0\u9884\u8BBE");let t=O(),s=new Set(t.map(n=>n.name));if(!s.has(e))return e;let o=1;for(;s.has(`${e} (${o})`);)o++;return`${e} (${o})`}var Ve=A(()=>{Ke()});var m,ds,x,J=A(()=>{m={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",TOOL_TRIGGER_INITIALIZED:"tool:triggerInitialized",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",TRIGGER_REGISTERED:"trigger:registered",TRIGGER_UNREGISTERED:"trigger:unregistered",TRIGGER_FIRED:"trigger:fired",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error"},ds=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(t,s,o={}){if(!t||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:n=0}=o;this.listeners.has(t)||this.listeners.set(t,new Set);let r={callback:s,priority:n};return this.listeners.get(t).add(r),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${t}`),()=>this.off(t,s)}off(t,s){let o=this.listeners.get(t);if(o){for(let n of o)if(n.callback===s){o.delete(n);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${t}`)}}emit(t,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${t}`,s),this._addToHistory(t,s);let o=this.listeners.get(t);if(!o||o.size===0)return;let n=Array.from(o).sort((r,i)=>i.priority-r.priority);for(let{callback:r}of n)try{r(s)}catch(i){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${t}):`,i)}}once(t,s){let o=n=>{this.off(t,o),s(n)};return this.on(t,o)}wait(t,s=0){return new Promise((o,n)=>{let r=null,i=this.once(t,l=>{r&&clearTimeout(r),o(l)});s>0&&(r=setTimeout(()=>{i(),n(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${t}`))},s))})}hasListeners(t){let s=this.listeners.get(t);return s&&s.size>0}listenerCount(t){let s=this.listeners.get(t);return s?s.size:0}removeAllListeners(t){t?this.listeners.delete(t):this.listeners.clear()}setDebugMode(t){this.debugMode=t}_addToHistory(t,s){this.history.push({event:t,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(t){return t?this.history.filter(s=>s.event===t):[...this.history]}clearHistory(){this.history=[]}},x=new ds});function g(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function d(e,t,s=3e3){let o=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(o.toastr){o.toastr[e](t,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}console.log(`[${e.toUpperCase()}] ${t}`)}function E(){if(Ae)return Ae;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Ae=window.parent.jQuery,Ae}catch{}return window.jQuery&&(Ae=window.jQuery),Ae}function k(e){return e&&e.length>0}function xe(e,t=a){if(!E()||!k(e))return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let o=e.find(`#${t}-model`).val()?.trim()||"",n=e.find(`#${t}-model-select`);return n.is(":visible")&&(o=n.val()||o),{url:e.find(`#${t}-api-url`).val()?.trim()||"",apiKey:e.find(`#${t}-api-key`).val()||"",model:o,useMainApi:e.find(`#${t}-use-main-api`).is(":checked"),max_tokens:parseInt(e.find(`#${t}-max-tokens`).val())||4096,temperature:parseFloat(e.find(`#${t}-temperature`).val())??.7,top_p:parseFloat(e.find(`#${t}-top-p`).val())??.9}}function Pe(e,t,s=a){if(!E()||!k(e)||!t)return;e.find(`#${s}-api-url`).val(t.url||""),e.find(`#${s}-api-key`).val(t.apiKey||""),e.find(`#${s}-model`).val(t.model||""),e.find(`#${s}-max-tokens`).val(t.max_tokens||4096),e.find(`#${s}-temperature`).val(t.temperature??.7),e.find(`#${s}-top-p`).val(t.top_p??.9);let n=t.useMainApi??!0;e.find(`#${s}-use-main-api`).prop("checked",n);let i=e.find(`#${s}-custom-api-fields`);n?i.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):i.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),e.find(`#${s}-model`).show(),e.find(`#${s}-model-select`).hide()}function Re(e,t){let s=new Blob([e],{type:"application/json"}),o=URL.createObjectURL(s),n=document.createElement("a");n.href=o,n.download=t,n.click(),URL.revokeObjectURL(o)}function Ie(e){return new Promise((t,s)=>{let o=new FileReader;o.onload=n=>t(n.target.result),o.onerror=n=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),o.readAsText(e)})}var a,Ae,le=A(()=>{a="youyou_toolkit";Ae=null});var wt,B,ps=A(()=>{J();le();wt=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(t={}){this.initialized||(this.dependencies=t.services||{},this._subscribeEvents(),this.initialized=!0,x.emit(m.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(t,s){return!t||!s?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(t,{id:t,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(t){this.destroyInstance(t),this.components.delete(t)}getComponent(t){return this.components.get(t)}render(t,s,o={}){let n=E();if(!n){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let r=this.components.get(t);if(!r){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${t}`);return}let i;if(typeof s=="string"?i=n(s):s&&s.jquery?i=s:s&&(i=n(s)),!k(i)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}this.destroyInstance(t);let l=r.render({...o,dependencies:this.dependencies});i.html(l),r.bindEvents(i,this.dependencies),this.activeInstances.set(t,{container:i,component:r,props:o}),x.emit(m.UI_RENDER_REQUESTED,{componentId:t})}destroyInstance(t){let s=this.activeInstances.get(t);s&&(s.component.destroy(s.container),this.activeInstances.delete(t))}switchTab(t){let s=this.currentTab;this.currentTab=t,x.emit(m.UI_TAB_CHANGED,{tabId:t,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(t,s){this.currentSubTab[t]=s,x.emit(m.UI_SUBTAB_CHANGED,{mainTab:t,subTab:s})}getCurrentSubTab(t){return this.currentSubTab[t]||""}getAllStyles(){let t="";return this.components.forEach((s,o)=>{s.getStyles&&(t+=s.getStyles())}),t}injectStyles(){let t="yyt-component-styles";if(document.getElementById(t))return;let s=document.createElement("style");s.id=t,s.textContent=this.getAllStyles(),document.head.appendChild(s)}setDependency(t,s){this.dependencies[t]=s}getDependency(t){return this.dependencies[t]}_subscribeEvents(){x.on(m.PRESET_UPDATED,()=>{}),x.on(m.TOOL_UPDATED,()=>{})}},B=new wt});var V,Z,ys=A(()=>{J();le();os();Ve();V="",Z={id:"apiPresetPanel",render(e){let t=ge(),s=is(),o=vt(),n=ie(),l=rs().slice(0,8),c=l.length>0?l.map(f=>this._renderPresetItem(f)).join(""):"",p=V||o||"",y=p||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
              <div class="yyt-custom-select" id="${a}-preset-dropdown">
                <div class="yyt-select-trigger">
                  <span class="yyt-select-value" data-value="${g(p)}">${g(y)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${p?"":"yyt-selected"}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                  </div>
                  ${n.length>0?n.map(f=>this._renderSelectOption(f,p)).join(""):""}
                </div>
              </div>
              <button class="yyt-btn yyt-btn-secondary" id="${a}-load-preset" title="\u52A0\u8F7D\u9009\u4E2D\u9884\u8BBE">
                <i class="fa-solid fa-download"></i> \u52A0\u8F7D
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
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${a}-save-as-preset" style="margin-left: auto;">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
              </button>
            </div>
            
            ${this._renderApiConfigForm(t)}
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
      </div>
    `},_renderPresetItem(e){return`
      <div class="yyt-preset-item" data-preset-name="${g(e.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${g(e.name)}</div>
          <div class="yyt-preset-meta">
            ${e.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${g(e.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
    `},_renderSelectOption(e,t){let s=e.starred===!0,o=s?"yyt-option-star yyt-starred":"yyt-option-star",n=s?"\u2605":"\u2606";return`
      <div class="yyt-select-option ${e.name===t?"yyt-selected":""}" data-value="${g(e.name)}">
        <button class="${o}" data-preset="${g(e.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${n}</button>
        <span class="yyt-option-text">${g(e.name)}</span>
      </div>
    `},_renderApiConfigForm(e){return`
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
                   value="${g(e.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${a}-api-key" 
                     value="${g(e.apiKey||"")}" 
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
                     value="${g(e.model||"")}" 
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
    `},bindEvents(e,t){let s=E();!s||!k(e)||(this._bindDropdownEvents(e,s),this._bindPresetListEvents(e,s),this._bindApiConfigEvents(e,s),this._bindFileEvents(e,s))},_bindDropdownEvents(e,t){let s=e.find(`#${a}-preset-dropdown`),o=s.find(".yyt-select-trigger"),n=s.find(".yyt-select-value");o.on("click",function(r){r.stopPropagation(),s.toggleClass("yyt-open")}),s.find(".yyt-select-option").on("click",r=>{if(t(r.target).hasClass("yyt-option-star"))return;let i=t(r.currentTarget),l=i.data("value"),c=i.find(".yyt-option-text").text();if(n.text(c).data("value",l),s.find(".yyt-select-option").removeClass("yyt-selected"),i.addClass("yyt-selected"),s.removeClass("yyt-open"),l){let p=ae(l);p&&Pe(e,p.apiConfig,a)}}),s.find(".yyt-option-star").on("click",r=>{r.preventDefault(),r.stopPropagation();let i=t(r.currentTarget).data("preset");if(!i)return;let l=ns(i);if(l.success){d("success",l.message);let c=e.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}else d("error",l.message)}),t(document).on("click.yyt-dropdown",r=>{t(r.target).closest(s).length||s.removeClass("yyt-open")})},_bindPresetListEvents(e,t){e.find(".yyt-preset-item").on("click",s=>{let o=t(s.currentTarget),n=o.data("preset-name"),r=t(s.target).closest("[data-action]").data("action");if(r)switch(s.stopPropagation(),r){case"load":let i=ae(n);i&&(Pe(e,i.apiConfig,a),V=n,e.find(".yyt-preset-item").removeClass("yyt-loaded"),o.addClass("yyt-loaded"),d("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${n}"\uFF0C\u4FEE\u6539\u540E\u53EF\u70B9\u51FB"\u4FDD\u5B58\u914D\u7F6E"\u8986\u76D6\u6B64\u9884\u8BBE`));break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${n}" \u5417\uFF1F`)){let l=ht(n);if(d(l.success?"info":"error",l.message),l.success){V===n&&(V="");let c=e.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}}break}})},_bindApiConfigEvents(e,t){e.find(`#${a}-use-main-api`).on("change",function(){let s=t(this).is(":checked"),o=e.find(`#${a}-custom-api-fields`);s?o.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):o.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),e.find(`#${a}-toggle-key-visibility`).on("click",function(){let s=e.find(`#${a}-api-key`),o=s.attr("type");s.attr("type",o==="password"?"text":"password"),t(this).find("i").toggleClass("fa-eye fa-eye-slash")}),e.find(`#${a}-load-models`).on("click",async()=>{let s=e.find(`#${a}-load-models`),o=e.find(`#${a}-model`),n=e.find(`#${a}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let r=xe(e,a),i=await ss(r);if(i.length>0){n.empty(),i.forEach(c=>{n.append(`<option value="${g(c)}">${g(c)}</option>`)}),o.hide(),n.show();let l=o.val();l&&i.includes(l)&&n.val(l),n.off("change").on("change",function(){o.val(t(this).val())}),d("success",`\u5DF2\u52A0\u8F7D ${i.length} \u4E2A\u6A21\u578B`)}else d("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(r){d("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${r.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),e.find(`#${a}-model`).on("focus",function(){let s=e.find(`#${a}-model-select`);t(this).show(),s.hide()}),e.find(`#${a}-save-api-config`).on("click",()=>{let s=xe(e,a),o=mt(s);if(!o.valid&&!s.useMainApi){d("error",o.errors.join(", "));return}if(V){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${V}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E`)){me(s),d("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58");return}me(s);let r=bt(V,{apiConfig:s});if(r.success){d("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${V}"`),x.emit(m.PRESET_UPDATED,{name:V});let i=e.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}else d("error",r.message);return}let n=vt();if(n){me(s),bt(n,{apiConfig:s}),d("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58");return}me(s),d("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),e.find(`#${a}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){me({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9});let s=e.closest(".yyt-api-manager").parent();s.length&&this.renderTo(s),d("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),e.find(`#${a}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(e,t)})},_bindFileEvents(e,t){e.find(`#${a}-export-presets`).on("click",()=>{try{let s=as();Re(s,`youyou_toolkit_presets_${Date.now()}.json`),d("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){d("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),e.find(`#${a}-import-presets`).on("click",()=>{e.find(`#${a}-import-file`).click()}),e.find(`#${a}-import-file`).on("change",async s=>{let o=s.target.files[0];if(o){try{let n=await Ie(o),r=ls(n,{overwrite:!0});if(d(r.success?"success":"error",r.message),r.imported>0){let i=e.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}}catch(n){d("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}t(s.target).val("")}})},_showSavePresetDialog(e,t){let o=ie().map(y=>y.name),n=cs("\u65B0\u9884\u8BBE"),r=`
      <div class="yyt-dialog-overlay" id="${a}-dialog-overlay">
        <div class="yyt-dialog">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">\u4FDD\u5B58\u4E3A\u65B0\u9884\u8BBE</span>
            <button class="yyt-dialog-close" id="${a}-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-group">
              <label>\u9884\u8BBE\u540D\u79F0</label>
              <input type="text" class="yyt-input" id="${a}-dialog-preset-name" 
                     value="${g(n)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
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
    `;t(`#${a}-dialog-overlay`).remove(),e.append(r);let i=t(`#${a}-dialog-overlay`),l=t(`#${a}-dialog-preset-name`),c=t(`#${a}-dialog-preset-desc`);l.focus().select();let p=()=>i.remove();i.find(`#${a}-dialog-close, #${a}-dialog-cancel`).on("click",p),i.on("click",function(y){y.target===this&&p()}),i.find(`#${a}-dialog-save`).on("click",()=>{let y=l.val().trim(),f=c.val().trim();if(!y){d("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),l.focus();return}if(o.includes(y)){if(!confirm(`\u9884\u8BBE "${y}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;ht(y)}let P=xe(e,a),u=xt({name:y,description:f,apiConfig:P});if(u.success){d("success",u.message),p(),x.emit(m.PRESET_CREATED,{preset:u.preset});let D=e.closest(".yyt-api-manager").parent();D.length&&this.renderTo(D)}else d("error",u.message)}),l.on("keypress",function(y){y.which===13&&i.find(`#${a}-dialog-save`).click()})},destroy(e){let t=E();!t||!k(e)||(e.find("*").off(),t(document).off("click.yyt-dropdown"))},getStyles(){return`
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
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}}});var So={};q(So,{MESSAGE_MACROS:()=>Eo,addTagRule:()=>De,createRuleTemplate:()=>bo,default:()=>Hn,deleteRulePreset:()=>wo,deleteRuleTemplate:()=>vo,deleteTagRule:()=>Ze,escapeRegex:()=>be,exportRulesConfig:()=>Pt,extractComplexTag:()=>fo,extractCurlyBraceTag:()=>ms,extractHtmlFormatTag:()=>go,extractSimpleTag:()=>gs,extractTagContent:()=>Et,generateTagSuggestions:()=>$t,getAllRulePresets:()=>kt,getAllRuleTemplates:()=>mo,getContentBlacklist:()=>et,getRuleTemplate:()=>xo,getTagRules:()=>he,importRulesConfig:()=>Rt,isValidTagName:()=>fs,loadRulePreset:()=>At,saveRulesAsPreset:()=>_t,scanTextForTags:()=>St,setContentBlacklist:()=>tt,setTagRules:()=>Ct,shouldSkipContent:()=>us,testRegex:()=>To,updateRuleTemplate:()=>ho,updateTagRule:()=>Oe});function Tt(){let e=$();return M=e.ruleTemplates||[...uo],C=e.tagRules||[],Y=e.contentBlacklist||[],{ruleTemplates:M,tagRules:C,contentBlacklist:Y}}function be(e){return typeof e!="string"?"":e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function us(e,t){if(!t||t.length===0||!e||typeof e!="string")return!1;let s=e.toLowerCase();return t.some(o=>{let n=o.trim().toLowerCase();return n&&s.includes(n)})}function fs(e){return!e||typeof e!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(e)&&!Fn.includes(e.toLowerCase())}function gs(e,t){if(!e||!t)return[];let s=[],o=be(t),n=new RegExp(`<${o}>([\\s\\S]*?)<\\/${o}>`,"gi");[...e.matchAll(n)].forEach(c=>{c[1]&&s.push(c[1].trim())});let i=(e.match(new RegExp(`<${o}>`,"gi"))||[]).length,l=(e.match(new RegExp(`<\\/${o}>`,"gi"))||[]).length;return i>l&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${t}> \u6807\u7B7E`),s}function ms(e,t){if(!e||!t)return[];let s=[],o=be(t),n=new RegExp(`\\{${o}\\|`,"gi"),r;for(;(r=n.exec(e))!==null;){let i=r.index,l=i+r[0].length,c=1,p=l;for(;p<e.length&&c>0;)e[p]==="{"?c++:e[p]==="}"&&c--,p++;if(c===0){let y=e.substring(l,p-1);y.trim()&&s.push(y.trim())}n.lastIndex=i+1}return s}function fo(e,t){if(!e||!t)return[];let s=t.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${t}`),[];let o=s[0].trim(),n=s[1].trim(),r=n.match(/<\/(\w+)>/);if(!r)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${n}`),[];let i=r[1],l=new RegExp(`${be(o)}([\\s\\S]*?)<\\/${i}>`,"gi"),c=[];return[...e.matchAll(l)].forEach(y=>{y[1]&&c.push(y[1].trim())}),c}function go(e,t){if(!e||!t)return[];let s=t.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${t}`),[];let o=s[1],n=[],r=new RegExp(`<${o}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${o}>`,"gi");[...e.matchAll(r)].forEach(p=>{p[1]&&n.push(p[1].trim())});let l=(e.match(new RegExp(`<${o}(?:\\s[^>]*)?>`,"gi"))||[]).length,c=(e.match(new RegExp(`<\\/${o}>`,"gi"))||[]).length;return l>c&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${l-c} \u4E2A\u672A\u95ED\u5408\u7684 <${o}> \u6807\u7B7E`),n}function Et(e,t,s=[]){if(!e)return"";if(!t||t.length===0)return e;let o=t.filter(y=>y.type==="exclude"&&y.enabled),n=t.filter(y=>(y.type==="include"||y.type==="regex_include")&&y.enabled),r=t.filter(y=>y.type==="regex_exclude"&&y.enabled),i=e;for(let y of o)try{let f=new RegExp(`<${be(y.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${be(y.value)}>`,"gi");i=i.replace(f,"")}catch(f){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:y,error:f})}let l=[];if(n.length>0)for(let y of n){let f=[];try{if(y.type==="include")f.push(...gs(i,y.value)),f.push(...ms(i,y.value));else if(y.type==="regex_include"){let P=new RegExp(y.value,"gi");[...i.matchAll(P)].forEach(D=>{D[1]&&f.push(D[1])})}}catch(P){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:y,error:P})}f.forEach(P=>l.push(P.trim()))}else l.push(i);let c=[];for(let y of l){for(let f of r)try{let P=new RegExp(f.value,"gi");y=y.replace(P,"")}catch(P){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:f,error:P})}us(y,s)||c.push(y)}return c.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function St(e,t={}){let s=performance.now(),{chunkSize:o=5e4,maxTags:n=100,timeoutMs:r=5e3}=t,i=new Set,l=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,c=0,p=0;for(let f=0;f<e.length;f+=o){let P=e.slice(f,Math.min(f+o,e.length));if(p++,c+=P.length,performance.now()-s>r){console.warn(`[YouYouToolkit] Tag scanning timed out after ${r}ms`);break}let u;for(;(u=l.exec(P))!==null&&i.size<n;){let D=(u[1]||u[2]).toLowerCase();fs(D)&&i.add(D)}if(i.size>=n)break;p%5===0&&await new Promise(D=>setTimeout(D,0))}let y=performance.now();return{tags:Array.from(i).sort(),stats:{processingTimeMs:Math.round(y-s),processedChars:c,totalChars:e.length,chunkCount:p,tagsFound:i.size}}}function $t(e,t=25){let s=e.tags.slice(0,t);return{suggestions:s,stats:{totalFound:e.stats.tagsFound,finalCount:s.length}}}function mo(){return M.length===0&&Tt(),M}function xo(e){return M.find(t=>t.id===e)}function bo(e){let t={id:`rule-${Date.now()}`,name:e.name||"\u65B0\u89C4\u5219",description:e.description||"",type:e.type||"include",value:e.value||"",enabled:e.enabled!==!1,createdAt:new Date().toISOString()};return M.push(t),xs(),{success:!0,template:t,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function ho(e,t){let s=M.findIndex(o=>o.id===e);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(M[s]={...M[s],...t,updatedAt:new Date().toISOString()},xs(),{success:!0,template:M[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function vo(e){let t=M.findIndex(s=>s.id===e);return t===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(M.splice(t,1),xs(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function xs(){let e=$();e.ruleTemplates=M,j(e)}function he(){return C||Tt(),C}function Ct(e){C=e||[];let t=$();t.tagRules=C,j(t)}function De(e){let t={id:`tag-${Date.now()}`,type:e.type||"include",value:e.value||"",enabled:e.enabled!==!1};C.push(t);let s=$();return s.tagRules=C,j(s),{success:!0,rule:t,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function Oe(e,t){if(e<0||e>=C.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};C[e]={...C[e],...t};let s=$();return s.tagRules=C,j(s),{success:!0,rule:C[e],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function Ze(e){if(e<0||e>=C.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};C.splice(e,1);let t=$();return t.tagRules=C,j(t),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function et(){return Y||Tt(),Y}function tt(e){Y=e||[];let t=$();t.contentBlacklist=Y,j(t)}function _t(e,t=""){if(!e||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=$();s.tagRulePresets||(s.tagRulePresets={});let o=`preset-${Date.now()}`;return s.tagRulePresets[o]={id:o,name:e.trim(),description:t.trim(),rules:JSON.parse(JSON.stringify(C)),blacklist:JSON.parse(JSON.stringify(Y)),createdAt:new Date().toISOString()},j(s),{success:!0,preset:s.tagRulePresets[o],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function kt(){let t=$().tagRulePresets||{};return Object.values(t)}function At(e){let t=$(),o=(t.tagRulePresets||{})[e];return o?(C=JSON.parse(JSON.stringify(o.rules||[])),Y=JSON.parse(JSON.stringify(o.blacklist||[])),t.tagRules=C,t.contentBlacklist=Y,j(t),{success:!0,preset:o,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function wo(e){let t=$(),s=t.tagRulePresets||{};return s[e]?(delete s[e],t.tagRulePresets=s,j(t),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Pt(){return JSON.stringify({tagRules:C,contentBlacklist:Y,ruleTemplates:M,tagRulePresets:$().tagRulePresets||{}},null,2)}function Rt(e,t={overwrite:!0}){try{let s=JSON.parse(e);if(t.overwrite)C=s.tagRules||[],Y=s.contentBlacklist||[],M=s.ruleTemplates||uo;else if(s.tagRules&&C.push(...s.tagRules),s.contentBlacklist){let n=new Set(Y.map(r=>r.toLowerCase()));s.contentBlacklist.forEach(r=>{n.has(r.toLowerCase())||Y.push(r)})}let o=$();return o.tagRules=C,o.contentBlacklist=Y,o.ruleTemplates=M,s.tagRulePresets&&(o.tagRulePresets={...o.tagRulePresets||{},...s.tagRulePresets}),j(o),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function To(e,t,s="g",o=0){try{if(!e||typeof e!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let n=new RegExp(e,s),r=[];if(s.includes("g")){let i;for(;(i=n.exec(t))!==null;)i.length>1?r.push({fullMatch:i[0],groups:i.slice(1),index:i.index,extracted:i[o]||i[1]||i[0]}):r.push({fullMatch:i[0],groups:[],index:i.index,extracted:i[0]})}else{let i=n.exec(t);i&&r.push({fullMatch:i[0],groups:i.length>1?i.slice(1):[],index:i.index,extracted:i.length>1?i[o]||i[1]:i[0]})}return{success:!0,matches:r,count:r.length,extracted:r.map(i=>i.extracted)}}catch(n){return{success:!1,error:n.message,matches:[]}}}var Fn,uo,M,C,Y,Eo,Hn,bs=A(()=>{Ke();Fn=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],uo=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],M=[],C=[],Y=[];Eo={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};Tt();Hn={extractTagContent:Et,extractSimpleTag:gs,extractCurlyBraceTag:ms,extractComplexTag:fo,extractHtmlFormatTag:go,escapeRegex:be,shouldSkipContent:us,isValidTagName:fs,scanTextForTags:St,generateTagSuggestions:$t,getAllRuleTemplates:mo,getRuleTemplate:xo,createRuleTemplate:bo,updateRuleTemplate:ho,deleteRuleTemplate:vo,getTagRules:he,setTagRules:Ct,addTagRule:De,updateTagRule:Oe,deleteTagRule:Ze,getContentBlacklist:et,setContentBlacklist:tt,saveRulesAsPreset:_t,getAllRulePresets:kt,loadRulePreset:At,deleteRulePreset:wo,exportRulesConfig:Pt,importRulesConfig:Rt,testRegex:To,MESSAGE_MACROS:Eo}});var ee,hs=A(()=>{J();le();bs();ee={id:"regexExtractPanel",render(e){let t=he(),s=et(),o=kt();return`
      <div class="yyt-regex-panel">
        <!-- \u89C4\u5219\u7F16\u8F91\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-filter"></i>
            <span>\u6807\u7B7E\u63D0\u53D6\u89C4\u5219</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${a}-show-examples" style="margin-left: auto;">
              <i class="fa-solid fa-lightbulb"></i> \u67E5\u770B\u793A\u4F8B
            </button>
          </div>
          
          ${this._renderRulesEditor(t,s,o)}
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
            <button class="yyt-btn yyt-btn-secondary" id="${a}-import-rules">
              <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${a}-export-rules">
              <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
            </button>
            <input type="file" id="${a}-import-rules-file" accept=".json" style="display:none">
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${a}-reset-rules">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
            </button>
          </div>
        </div>
        
        <!-- \u6807\u7B7E\u626B\u63CF\u7ED3\u679C\u5BB9\u5668 -->
        <div id="${a}-tag-suggestions-container" style="display: none;">
          <div class="yyt-tag-suggestions">
            <div class="yyt-tag-suggestions-header">
              <span>\u53D1\u73B0\u7684\u6807\u7B7E:</span>
              <span id="${a}-tag-scan-stats"></span>
            </div>
            <div class="yyt-tag-list" id="${a}-tag-list"></div>
          </div>
        </div>
      </div>
    `},_renderRulesEditor(e,t,s){let o=e.length>0?e.map((r,i)=>this._renderRuleItem(r,i)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',n=s.length>0?s.map(r=>`<option value="${r.id}">${g(r.name)}</option>`).join(""):"";return`
      <div class="yyt-tag-rules-editor">
        ${n?`
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${a}-rule-preset-select">
            <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
            ${n}
          </select>
          <button class="yyt-btn yyt-btn-secondary" id="${a}-load-rule-preset">
            <i class="fa-solid fa-download"></i> \u52A0\u8F7D
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${a}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u9884\u8BBE
          </button>
        </div>
        `:`
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-secondary" id="${a}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
          </button>
        </div>
        `}
        
        <div class="yyt-rules-list">
          ${o}
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${a}-add-rule">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u89C4\u5219
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${a}-scan-tags">
            <i class="fa-solid fa-search"></i> \u626B\u63CF\u6807\u7B7E
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${a}-add-exclude-cot">
            <i class="fa-solid fa-ban"></i> \u6392\u9664\u5C0FCoT
          </button>
        </div>
        
        <!-- \u9ED1\u540D\u5355\u8BBE\u7F6E -->
        <div class="yyt-form-group">
          <label>\u5185\u5BB9\u9ED1\u540D\u5355\uFF08\u5305\u542B\u8FD9\u4E9B\u5173\u952E\u8BCD\u7684\u5185\u5BB9\u5C06\u88AB\u8FC7\u6EE4\uFF0C\u7528\u9017\u53F7\u5206\u9694\uFF09</label>
          <input type="text" class="yyt-input" id="${a}-content-blacklist" 
                 value="${g(t.join(", "))}" 
                 placeholder="\u5173\u952E\u8BCD1, \u5173\u952E\u8BCD2, ...">
        </div>
      </div>
    `},_renderRuleItem(e,t){return`
      <div class="yyt-rule-item" data-rule-index="${t}">
        <select class="yyt-select yyt-rule-type" style="flex: 2; min-width: 100px;">
          <option value="include" ${e.type==="include"?"selected":""}>\u5305\u542B</option>
          <option value="regex_include" ${e.type==="regex_include"?"selected":""}>\u6B63\u5219\u5305\u542B</option>
          <option value="exclude" ${e.type==="exclude"?"selected":""}>\u6392\u9664</option>
          <option value="regex_exclude" ${e.type==="regex_exclude"?"selected":""}>\u6B63\u5219\u6392\u9664</option>
        </select>
        <input type="text" class="yyt-input yyt-rule-value" style="flex: 5;" 
               placeholder="\u6807\u7B7E\u540D\u6216\u6B63\u5219\u8868\u8FBE\u5F0F" 
               value="${g(e.value||"")}">
        <label class="yyt-checkbox-label yyt-rule-enabled-label">
          <input type="checkbox" class="yyt-rule-enabled" ${e.enabled?"checked":""}>
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
          <textarea class="yyt-textarea" id="${a}-test-input" rows="6" 
                    placeholder="\u8F93\u5165\u8981\u6D4B\u8BD5\u63D0\u53D6\u7684\u6587\u672C\u5185\u5BB9..."></textarea>
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${a}-test-extract">
            <i class="fa-solid fa-play"></i> \u6D4B\u8BD5\u63D0\u53D6
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${a}-test-clear">
            <i class="fa-solid fa-eraser"></i> \u6E05\u7A7A
          </button>
        </div>
        
        <div class="yyt-form-group" id="${a}-test-result-container" style="display: none;">
          <label>\u63D0\u53D6\u7ED3\u679C</label>
          <div class="yyt-test-result" id="${a}-test-result"></div>
        </div>
      </div>
    `},bindEvents(e,t){let s=E();!s||!k(e)||(this._bindRuleEditorEvents(e,s),this._bindPresetEvents(e,s),this._bindTestEvents(e,s),this._bindFileEvents(e,s))},_bindRuleEditorEvents(e,t){e.find(".yyt-rule-type").on("change",function(){let o=t(this).closest(".yyt-rule-item").data("rule-index"),n=t(this).val();Oe(o,{type:n}),d("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),e.find(".yyt-rule-value").on("change",function(){let o=t(this).closest(".yyt-rule-item").data("rule-index"),n=t(this).val().trim();Oe(o,{value:n})}),e.find(".yyt-rule-enabled").on("change",function(){let o=t(this).closest(".yyt-rule-item").data("rule-index"),n=t(this).is(":checked");Oe(o,{enabled:n}),d("info",n?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),e.find(".yyt-rule-delete").on("click",()=>{let o=e.find(".yyt-rule-delete").closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(Ze(o),this.renderTo(e),d("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),e.on("click",".yyt-rule-delete",s=>{let n=t(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(Ze(n),this.renderTo(e),d("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),e.find(`#${a}-add-rule`).on("click",()=>{De({type:"include",value:"",enabled:!0}),this.renderTo(e),d("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),e.find(`#${a}-scan-tags`).on("click",async()=>{let s=e.find(`#${a}-scan-tags`),o=e.find(`#${a}-test-input`).val();if(!o||!o.trim()){d("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let n=await St(o,{maxTags:50,timeoutMs:3e3}),{suggestions:r,stats:i}=$t(n,25);if(r.length===0){d("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),e.find(`#${a}-tag-suggestions-container`).hide();return}let l=e.find(`#${a}-tag-list`);e.find(`#${a}-tag-scan-stats`).text(`${i.finalCount}/${i.totalFound} \u4E2A\u6807\u7B7E, ${n.stats.processingTimeMs}ms`),l.empty(),r.forEach(p=>{let y=t(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${g(p)}</button>`);y.on("click",()=>{if(he().some(u=>u.type==="include"&&u.value===p)){d("warning",`\u89C4\u5219 "\u5305\u542B: ${p}" \u5DF2\u5B58\u5728`);return}De({type:"include",value:p,enabled:!0}),this.renderTo(e),d("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${p}"`)}),l.append(y)}),e.find(`#${a}-tag-suggestions-container`).show(),d("success",`\u53D1\u73B0 ${r.length} \u4E2A\u6807\u7B7E`)}catch(n){d("error",`\u626B\u63CF\u5931\u8D25: ${n.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),e.find(`#${a}-add-exclude-cot`).on("click",()=>{let s=he(),o="<!--[\\s\\S]*?-->";if(s.some(r=>r.type==="regex_exclude"&&r.value===o)){d("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}De({type:"regex_exclude",value:o,enabled:!0}),this.renderTo(e),d("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),e.find(`#${a}-content-blacklist`).on("change",function(){let o=t(this).val().split(",").map(n=>n.trim()).filter(n=>n);tt(o),d("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${o.length} \u4E2A\u5173\u952E\u8BCD`)}),e.find(`#${a}-show-examples`).on("click",()=>{alert(`
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
      `)})},_bindPresetEvents(e,t){e.find(`#${a}-load-rule-preset`).on("click",()=>{let s=e.find(`#${a}-rule-preset-select`).val();if(!s){d("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let o=At(s);o.success?(this.renderTo(e),d("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${o.preset.name}`),x.emit(m.REGEX_PRESET_LOADED,{preset:o.preset})):d("error",o.message)}),e.find(`#${a}-save-rule-preset`).on("click",()=>{let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let o=_t(s.trim());o.success?(this.renderTo(e),d("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):d("error",o.message)})},_bindTestEvents(e,t){e.find(`#${a}-test-extract`).on("click",()=>{let s=e.find(`#${a}-test-input`).val();if(!s||!s.trim()){d("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let o=he(),n=et(),r=Et(s,o,n),i=e.find(`#${a}-test-result-container`),l=e.find(`#${a}-test-result`);i.show(),!r||!r.trim()?(l.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),d("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(l.html(`<pre class="yyt-code-block">${g(r)}</pre>`),d("success","\u63D0\u53D6\u5B8C\u6210"),x.emit(m.REGEX_EXTRACTED,{result:r}))}),e.find(`#${a}-test-clear`).on("click",()=>{e.find(`#${a}-test-input`).val(""),e.find(`#${a}-test-result-container`).hide()})},_bindFileEvents(e,t){e.find(`#${a}-import-rules`).on("click",()=>{e.find(`#${a}-import-rules-file`).click()}),e.find(`#${a}-import-rules-file`).on("change",async s=>{let o=s.target.files[0];if(o){try{let n=await Ie(o),r=Rt(n,{overwrite:!0});r.success?(this.renderTo(e),d("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):d("error",r.message)}catch(n){d("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}t(s.target).val("")}}),e.find(`#${a}-export-rules`).on("click",()=>{try{let s=Pt();Re(s,`youyou_toolkit_rules_${Date.now()}.json`),d("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){d("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),e.find(`#${a}-reset-rules`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(Ct([]),tt([]),this.renderTo(e),d("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(e){!E()||!k(e)||e.find("*").off()},getStyles(){return`
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
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}}});var $o={};q($o,{DEFAULT_TOOL_PRESETS:()=>te,DEFAULT_TOOL_STRUCTURE:()=>vs,TOOL_STORAGE_KEYS:()=>S,cloneTool:()=>Qn,deleteTool:()=>Wn,deleteToolPreset:()=>Kn,exportTools:()=>Es,getAllToolPresets:()=>Ts,getAllTools:()=>It,getCurrentToolPresetId:()=>Xn,getTool:()=>st,getToolPreset:()=>qn,importTools:()=>Ss,resetTools:()=>$s,saveTool:()=>Dt,saveToolPreset:()=>Jn,setCurrentToolPreset:()=>Vn,setToolEnabled:()=>ws,validateTool:()=>Zn});function It(){let e=T.get(S.TOOLS);return e&&typeof e=="object"?{...te,...e}:{...te}}function st(e){return It()[e]||null}function Dt(e,t){if(!e||!t)return!1;let s=T.get(S.TOOLS)||{},o={...vs,...t,id:e,metadata:{...vs.metadata,...t.metadata,updatedAt:new Date().toISOString()}};return s[e]||(o.metadata.createdAt=new Date().toISOString()),s[e]=o,T.set(S.TOOLS,s),x.emit(m.TOOL_UPDATED,{toolId:e,tool:o}),!0}function Wn(e){if(te[e])return!1;let t=T.get(S.TOOLS)||{};return t[e]?(delete t[e],T.set(S.TOOLS,t),x.emit(m.TOOL_UNREGISTERED,{toolId:e}),!0):!1}function ws(e,t){let s=st(e);if(!s)return!1;let o=T.get(S.TOOLS)||{};return o[e]||(o[e]={...s}),o[e].enabled=t,o[e].metadata={...o[e].metadata,updatedAt:new Date().toISOString()},T.set(S.TOOLS,o),x.emit(t?m.TOOL_ENABLED:m.TOOL_DISABLED,{toolId:e}),!0}function Qn(e,t,s){let o=st(e);if(!o)return!1;let n=JSON.parse(JSON.stringify(o));return n.name=s||`${o.name} (\u526F\u672C)`,n.metadata={...n.metadata,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},Dt(t,n)}function Ts(){let e=T.get(S.PRESETS);return e&&typeof e=="object"?{...te,...e}:{...te}}function qn(e){return Ts()[e]||null}function Jn(e,t){if(!e||!t)return!1;let s=T.get(S.PRESETS)||{};return s[e]={...t,metadata:{...t.metadata,updatedAt:new Date().toISOString()}},T.set(S.PRESETS,s),!0}function Kn(e){if(te[e])return!1;let t=T.get(S.PRESETS)||{};return t[e]?(delete t[e],T.set(S.PRESETS,t),!0):!1}function Xn(){return T.get(S.CURRENT_PRESET)||null}function Vn(e){return Ts()[e]?(T.set(S.CURRENT_PRESET,e),!0):!1}function Es(){let e=T.get(S.TOOLS)||{},t=T.get(S.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:e,presets:t},null,2)}function Ss(e,t=!1){try{let s=JSON.parse(e);if(!s||typeof s!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let o=t?{}:T.get(S.TOOLS)||{},n=t?{}:T.get(S.PRESETS)||{},r=0,i=0;if(s.tools&&typeof s.tools=="object"){for(let[l,c]of Object.entries(s.tools))te[l]&&!t||c&&typeof c=="object"&&(o[l]=c,r++);T.set(S.TOOLS,o)}if(s.presets&&typeof s.presets=="object"){for(let[l,c]of Object.entries(s.presets))te[l]&&!t||c&&typeof c=="object"&&(n[l]=c,i++);T.set(S.PRESETS,n)}return{success:!0,toolsImported:r,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${r} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function $s(){T.remove(S.TOOLS),T.remove(S.PRESETS),T.remove(S.CURRENT_PRESET)}function Zn(e){let t=[];if(!e)return{valid:!1,errors:["\u5DE5\u5177\u5B9A\u4E49\u4E3A\u7A7A"]};if((!e.name||typeof e.name!="string")&&t.push("\u5DE5\u5177\u540D\u79F0\u65E0\u6548"),(!e.category||typeof e.category!="string")&&t.push("\u5DE5\u5177\u5206\u7C7B\u65E0\u6548"),e.config){let{trigger:s,execution:o,api:n,context:r}=e.config;s&&!["manual","event","scheduled"].includes(s.type)&&t.push("\u89E6\u53D1\u7C7B\u578B\u65E0\u6548"),o&&((typeof o.timeout!="number"||o.timeout<0)&&t.push("\u8D85\u65F6\u65F6\u95F4\u5FC5\u987B\u4E3A\u6B63\u6570"),(typeof o.retries!="number"||o.retries<0)&&t.push("\u91CD\u8BD5\u6B21\u6570\u5FC5\u987B\u4E3A\u6B63\u6570")),r&&typeof r.depth!="number"&&t.push("\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u5FC5\u987B\u4E3A\u6570\u5B57")}return{valid:t.length===0,errors:t}}var vs,te,S,Cs=A(()=>{Ce();J();vs={id:"",name:"",description:"",category:"utility",config:{trigger:{type:"manual",events:[]},execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!0,bypassPreset:"standard"},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},te={},S={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"}});var se,_s=A(()=>{J();le();Cs();se={id:"toolManagePanel",render(e){let t=It();return`
      <div class="yyt-tool-manager">
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
            ${this._renderToolList(t)}
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
    `},_renderToolList(e){return Object.entries(e).map(([t,s])=>`
      <div class="yyt-tool-item ${s.enabled?"yyt-enabled":"yyt-disabled"}" data-tool-id="${t}">
        <div class="yyt-tool-header">
          <div class="yyt-tool-info">
            <span class="yyt-tool-name">${g(s.name)}</span>
            <span class="yyt-tool-category">${g(s.category)}</span>
          </div>
          <div class="yyt-tool-controls">
            <label class="yyt-toggle yyt-tool-toggle">
              <input type="checkbox" ${s.enabled?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="yyt-tool-desc">${g(s.description)}</div>
      </div>
    `).join("")},bindEvents(e,t){let s=E();!s||!k(e)||(this._bindToolEvents(e,s),this._bindFileEvents(e,s))},_bindToolEvents(e,t){e.find(".yyt-tool-toggle input").on("change",s=>{let o=t(s.currentTarget).closest(".yyt-tool-item"),n=o.data("tool-id"),r=t(s.currentTarget).is(":checked");ws(n,r),o.toggleClass("yyt-enabled",r).toggleClass("yyt-disabled",!r),d("info",r?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528"),x.emit(r?m.TOOL_ENABLED:m.TOOL_DISABLED,{toolId:n})}),e.find("#yyt-add-tool").on("click",()=>{this._showToolEditDialog(e,t,null)})},_bindFileEvents(e,t){e.find("#yyt-import-tools").on("click",()=>{e.find("#yyt-import-tools-file").click()}),e.find("#yyt-import-tools-file").on("change",async s=>{let o=s.target.files[0];if(o){try{let n=await Ie(o),r=Ss(n,{overwrite:!1});d(r.success?"success":"error",r.message),r.success&&this.renderTo(e)}catch(n){d("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}t(s.target).val("")}}),e.find("#yyt-export-tools").on("click",()=>{try{let s=Es();Re(s,`youyou_toolkit_tools_${Date.now()}.json`),d("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){d("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),e.find("#yyt-reset-tools").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&($s(),this.renderTo(e),d("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(e,t,s){let o=s?st(s):null,n=!!o,r=`
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
                       value="${o?g(o.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u5206\u7C7B</label>
                <select class="yyt-select" id="yyt-tool-category">
                  <option value="api" ${o?.category==="api"?"selected":""}>API</option>
                  <option value="prompt" ${o?.category==="prompt"?"selected":""}>Prompt</option>
                  <option value="utility" ${o?.category==="utility"?"selected":""}>Utility</option>
                </select>
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0</label>
              <input type="text" class="yyt-input" id="yyt-tool-desc" 
                     value="${o?g(o.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u8D85\u65F6\u65F6\u95F4(ms)</label>
                <input type="number" class="yyt-input" id="yyt-tool-timeout" 
                       value="${o?.config?.execution?.timeout||6e4}">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u91CD\u8BD5\u6B21\u6570</label>
                <input type="number" class="yyt-input" id="yyt-tool-retries" 
                       value="${o?.config?.execution?.retries||3}">
              </div>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="yyt-tool-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="yyt-tool-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;t("#yyt-tool-dialog-overlay").remove(),e.append(r);let i=t("#yyt-tool-dialog-overlay"),l=()=>i.remove();i.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",l),i.on("click",function(c){c.target===this&&l()}),i.find("#yyt-tool-dialog-save").on("click",()=>{let c=t("#yyt-tool-name").val().trim(),p=t("#yyt-tool-category").val(),y=t("#yyt-tool-desc").val().trim(),f=parseInt(t("#yyt-tool-timeout").val())||6e4,P=parseInt(t("#yyt-tool-retries").val())||3;if(!c){d("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let u=s||`tool_${Date.now()}`;Dt(u,{name:c,category:p,description:y,config:{trigger:{type:"manual",events:[]},execution:{timeout:f,retries:P},api:{preset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0}),l(),this.renderTo(e),d("success",n?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),x.emit(n?m.TOOL_UPDATED:m.TOOL_REGISTERED,{toolId:u})})},destroy(e){!E()||!k(e)||e.find("*").off()},getStyles(){return`
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
      }
      
      .yyt-dialog-wide {
        width: 480px;
      }
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}}});var Uo={};q(Uo,{TOOL_CATEGORIES:()=>Co,TOOL_REGISTRY:()=>Ot,clearToolApiPreset:()=>Oo,default:()=>er,getAllDefaultToolConfigs:()=>Le,getAllToolApiBindings:()=>Mo,getAllToolFullConfigs:()=>Rs,getEnabledTools:()=>Lo,getToolApiPreset:()=>Do,getToolConfig:()=>As,getToolFullConfig:()=>H,getToolList:()=>Ao,getToolSubTabs:()=>Po,getToolWindowState:()=>jo,hasTool:()=>Ps,onPresetDeleted:()=>No,registerTool:()=>_o,resetToolConfig:()=>Ne,resetToolRegistry:()=>Ro,saveToolConfig:()=>Me,saveToolWindowState:()=>zo,setToolApiPreset:()=>Io,unregisterTool:()=>ko});function _o(e,t){if(!e||typeof e!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!t||typeof t!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let o of s)if(!t[o])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${o}`),!1;return oe[e]={id:e,...t,order:t.order??Object.keys(oe).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${e}`),!0}function ko(e){return oe[e]?(delete oe[e],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${e}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${e}`),!1)}function Ao(e=!0){let t=Object.values(oe);return e?t.sort((s,o)=>(s.order??0)-(o.order??0)):t}function As(e){return oe[e]||null}function Ps(e){return!!oe[e]}function Po(e){let t=oe[e];return!t||!t.hasSubTabs?[]:t.subTabs||[]}function Ro(){oe={...Ot},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Io(e,t){if(!Ps(e))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${e}`),!1;let s=v.get(ce)||{};return s[e]=t||"",v.set(ce,s),console.log(`[ToolRegistry] \u5DE5\u5177 "${e}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${t||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function Do(e){return(v.get(ce)||{})[e]||""}function Oo(e){let t=v.get(ce)||{};delete t[e],v.set(ce,t),console.log(`[ToolRegistry] \u5DE5\u5177 "${e}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function Mo(){return v.get(ce)||{}}function No(e){let t=v.get(ce)||{},s=!1;for(let o in t)t[o]===e&&(t[o]="",s=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${o}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&v.set(ce,t)}function H(e){let t=nt[e];if(!t)return As(e);let o=(v.get(ot)||{})[e]||{};return{...t,...o,id:e}}function Me(e,t){if(!e||!nt[e])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",e),!1;let s=v.get(ot)||{},o=["promptTemplate","apiPreset","bypassPreset","outputMode","extractTags","enabled","triggerEvents"];return s[e]={},o.forEach(n=>{t[n]!==void 0&&(s[e][n]=t[n])}),v.set(ot,s),x.emit(m.TOOL_UPDATED,{toolId:e,config:s[e]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${e}`),!0}function Ne(e){if(!e||!nt[e])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",e),!1;let t=v.get(ot)||{};return delete t[e],v.set(ot,t),x.emit(m.TOOL_UPDATED,{toolId:e,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${e}`),!0}function Le(){return{...nt}}function Rs(){return Object.keys(nt).map(e=>H(e))}function Lo(){return Rs().filter(e=>e&&e.enabled)}function zo(e,t){let s=v.get(ks)||{};s[e]={...t,updatedAt:Date.now()},v.set(ks,s)}function jo(e){return(v.get(ks)||{})[e]||null}var ot,ce,ks,nt,Ot,Co,oe,er,ze=A(()=>{Ce();J();ot="tool_configs",ce="tool_api_bindings",ks="tool_window_states",nt={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",promptTemplate:`<boo_FM>
<pg>No.{{pg}}</pg>
<time>{{time}}</time>
<scene>{{scene}}</scene>

<plot>
{{plot}}
</plot>

<event>
MQ.{{mq}} | {{mqStatus}}
SQ.{{sq}} | {{sqStatus}}
\u672C\u8F6E\u5B8C\u6210\uFF1A{{completed}}
\u6700\u65B0\u652F\u7EBF\u7F16\u53F7\uFF1ASQ.{{latestSq}}
</event>

<defined>
{{defined}}
</defined>

<status>
{{status}}
</status>

<seeds>
{{seeds}}
</seeds>
</boo_FM>`,apiPreset:"",bypassPreset:"",outputMode:"inline",extractTags:["boo_FM"],triggerEvents:["GENERATION_ENDED"],enabled:!0,order:3},statusBlock:{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",description:"\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u4EE3\u7801\u5757",promptTemplate:`<status_block>
<name>{{name}}</name>
<location>{{location}}</location>
<condition>{{condition}}</condition>
<equipment>{{equipment}}</equipment>
<skills>{{skills}}</skills>
</status_block>`,apiPreset:"",bypassPreset:"",outputMode:"inline",extractTags:["status_block"],triggerEvents:["GENERATION_ENDED"],enabled:!0,order:4}},Ot={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},bypassPanel:{id:"bypassPanel",name:"\u7834\u9650\u8BCD",icon:"fa-shield-alt",hasSubTabs:!1,description:"\u7BA1\u7406\u7834\u9650\u8BCD\u9884\u8BBE",component:"BypassPanel",order:1},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{trigger:{type:"manual",events:[]},execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:3,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel"}]}},Co={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},oe={...Ot};er={TOOL_REGISTRY:Ot,TOOL_CATEGORIES:Co,registerTool:_o,unregisterTool:ko,getToolList:Ao,getToolConfig:As,hasTool:Ps,getToolSubTabs:Po,resetToolRegistry:Ro,setToolApiPreset:Io,getToolApiPreset:Do,clearToolApiPreset:Oo,getAllToolApiBindings:Mo,onPresetDeleted:No,saveToolWindowState:zo,getToolWindowState:jo,getToolFullConfig:H,saveToolConfig:Me,resetToolConfig:Ne,getAllDefaultToolConfigs:Le,getAllToolFullConfigs:Rs,getEnabledTools:Lo}});var ve,Is=A(()=>{J();le();ze();Ve();ve={id:"summaryToolPanel",toolId:"summaryTool",render(e){let t=H(this.toolId);if(!t)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let s=this._getApiPresets();return`
      <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
        <!-- \u5DE5\u5177\u914D\u7F6E\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-cog"></i>
            <span>\u5DE5\u5177\u914D\u7F6E</span>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>API\u9884\u8BBE</label>
              <select class="yyt-select" id="${a}-tool-api-preset">
                <option value="">\u4F7F\u7528\u5F53\u524DAPI\u914D\u7F6E</option>
                ${s.map(o=>`<option value="${g(o.name)}" ${o.name===t.apiPreset?"selected":""}>
                    ${g(o.name)}
                  </option>`).join("")}
              </select>
            </div>
            
            <div class="yyt-form-group yyt-flex-1">
              <label>\u8F93\u51FA\u6A21\u5F0F</label>
              <select class="yyt-select" id="${a}-tool-output-mode">
                <option value="inline" ${t.outputMode==="inline"?"selected":""}>
                  \u968FAI\u8F93\u51FA
                </option>
                <option value="separate" ${t.outputMode==="separate"?"selected":""}>
                  \u989D\u5916AI\u89E3\u6790
                </option>
              </select>
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u63D0\u53D6\u6807\u7B7E (\u9017\u53F7\u5206\u9694)</label>
              <input type="text" class="yyt-input" id="${a}-tool-extract-tags" 
                     value="${g((t.extractTags||[]).join(", "))}" 
                     placeholder="boo_FM, status_block">
            </div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${a}-tool-enabled" ${t.enabled?"checked":""}>
              <span>\u542F\u7528\u6B64\u5DE5\u5177</span>
            </label>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${a}-tool-auto-trigger" ${t.triggerEvents?.includes("GENERATION_ENDED")?"checked":""}>
              <span>\u81EA\u52A8\u89E6\u53D1 (GENERATION_ENDED)</span>
            </label>
          </div>
        </div>
        
        <!-- \u63D0\u793A\u8BCD\u6A21\u677F\u7F16\u8F91\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-file-code"></i>
            <span>\u63D0\u793A\u8BCD\u6A21\u677F</span>
            <div class="yyt-title-actions">
              <button class="yyt-btn yyt-btn-small" id="${a}-tool-reset-template">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u6A21\u677F
              </button>
            </div>
          </div>
          
          <div class="yyt-form-group">
            <textarea class="yyt-textarea yyt-code-textarea" 
                      id="${a}-tool-prompt-template" 
                      rows="15" 
                      placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${g(t.promptTemplate||"")}</textarea>
          </div>
          
          <div class="yyt-help-text">
            <p><strong>\u53EF\u7528\u53D8\u91CF:</strong></p>
            <code>{{userMessage}}</code> - \u7528\u6237\u6D88\u606F
            <code>{{lastAiMessage}}</code> - \u4E0A\u4E00\u6761AI\u6D88\u606F
            <code>{{extractedContent}}</code> - \u6B63\u5219\u63D0\u53D6\u7684\u5185\u5BB9
            <code>{{previousToolOutput}}</code> - \u4E0A\u4E00\u8F6E\u5DE5\u5177\u8F93\u51FA
            <br>
            <code>{{pg}}</code> - \u9875\u7801
            <code>{{time}}</code> - \u65F6\u95F4
            <code>{{scene}}</code> - \u573A\u666F
            <code>{{plot}}</code> - \u5267\u60C5
            <code>{{mq}}</code> - \u4E3B\u7EBF
            <code>{{sq}}</code> - \u652F\u7EBF
          </div>
        </div>
        
        <!-- \u64CD\u4F5C\u6309\u94AE -->
        <div class="yyt-panel-footer">
          <div class="yyt-footer-left">
            <button class="yyt-btn yyt-btn-secondary" id="${a}-tool-reset">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u5168\u90E8
            </button>
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-primary" id="${a}-tool-save">
              <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${a}-tool-copy-template">
              <i class="fa-solid fa-copy"></i> \u590D\u5236\u6A21\u677F
            </button>
          </div>
        </div>
      </div>
    `},_getApiPresets(){try{return ie()||[]}catch{return[]}},_getFormData(e,t){let s=e.find(`#${a}-tool-auto-trigger`).is(":checked");return{apiPreset:e.find(`#${a}-tool-api-preset`).val()||"",outputMode:e.find(`#${a}-tool-output-mode`).val()||"inline",extractTags:(e.find(`#${a}-tool-extract-tags`).val()||"").split(",").map(o=>o.trim()).filter(Boolean),promptTemplate:e.find(`#${a}-tool-prompt-template`).val()||"",enabled:e.find(`#${a}-tool-enabled`).is(":checked"),triggerEvents:s?["GENERATION_ENDED"]:[]}},_refreshUI(e,t){let s=H(this.toolId);s&&(e.find(`#${a}-tool-api-preset`).val(s.apiPreset||""),e.find(`#${a}-tool-output-mode`).val(s.outputMode||"inline"),e.find(`#${a}-tool-extract-tags`).val((s.extractTags||[]).join(", ")),e.find(`#${a}-tool-prompt-template`).val(s.promptTemplate||""),e.find(`#${a}-tool-enabled`).prop("checked",s.enabled),e.find(`#${a}-tool-auto-trigger`).prop("checked",s.triggerEvents?.includes("GENERATION_ENDED")))},bindEvents(e,t){let s=E();if(!s||!k(e))return;let o=this;e.find(`#${a}-tool-save`).on("click",()=>{this._saveConfig(e,s)}),e.find(`#${a}-tool-reset`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u914D\u7F6E\u5417\uFF1F")&&(Ne(this.toolId),this._refreshUI(e,s),d("info","\u5DF2\u91CD\u7F6E"))}),e.find(`#${a}-tool-reset-template`).on("click",()=>{let r=Le()[this.toolId];r&&r.promptTemplate&&(e.find(`#${a}-tool-prompt-template`).val(r.promptTemplate),d("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),e.find(`#${a}-tool-copy-template`).on("click",async()=>{let n=e.find(`#${a}-tool-prompt-template`).val();if(!n){d("warning","\u6A21\u677F\u5185\u5BB9\u4E3A\u7A7A");return}try{await navigator.clipboard.writeText(n),d("success","\u6A21\u677F\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F")}catch{d("error","\u590D\u5236\u5931\u8D25")}})},_saveConfig(e,t){let s=this._getFormData(e,t);Me(this.toolId,s)?(d("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"),x.emit(m.TOOL_UPDATED,{toolId:this.toolId,config:s})):d("error","\u4FDD\u5B58\u5931\u8D25")},destroy(e){!E()||!k(e)||e.find("*").off()},getStyles(){return`
      /* \u5DE5\u5177\u9762\u677F\u6837\u5F0F */
      .yyt-tool-panel {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      
      .yyt-code-textarea {
        font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
        font-size: 13px;
        line-height: 1.5;
        tab-size: 2;
        background: rgba(0, 0, 0, 0.2);
        border-color: rgba(255, 255, 255, 0.1);
      }
      
      .yyt-code-textarea:focus {
        border-color: var(--yyt-accent);
        box-shadow: 0 0 0 2px rgba(123, 183, 255, 0.15);
      }
      
      .yyt-help-text {
        font-size: 12px;
        color: var(--yyt-text-muted);
        padding: 12px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        line-height: 1.8;
      }
      
      .yyt-help-text code {
        background: rgba(123, 183, 255, 0.15);
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 11px;
        color: #7bb7ff;
        margin: 0 2px;
      }
      
      .yyt-help-text p {
        margin: 0 0 8px 0;
        font-weight: 500;
        color: var(--yyt-text);
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
      
      .yyt-checkbox-label:hover {
        color: var(--yyt-text);
      }
      
      .yyt-panel-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 16px;
        border-top: 1px solid var(--yyt-border);
      }
      
      .yyt-footer-left,
      .yyt-footer-right {
        display: flex;
        gap: 8px;
      }
      
      .yyt-error {
        padding: 20px;
        text-align: center;
        color: var(--yyt-danger);
        background: rgba(255, 107, 107, 0.1);
        border: 1px solid rgba(255, 107, 107, 0.3);
        border-radius: var(--yyt-radius-sm);
      }
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}}});var we,Ds=A(()=>{J();le();ze();Ve();we={id:"statusBlockPanel",toolId:"statusBlock",render(e){let t=H(this.toolId);if(!t)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let s=this._getApiPresets();return`
      <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
        <!-- \u5DE5\u5177\u914D\u7F6E\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-cog"></i>
            <span>\u5DE5\u5177\u914D\u7F6E</span>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>API\u9884\u8BBE</label>
              <select class="yyt-select" id="${a}-tool-api-preset">
                <option value="">\u4F7F\u7528\u5F53\u524DAPI\u914D\u7F6E</option>
                ${s.map(o=>`<option value="${g(o.name)}" ${o.name===t.apiPreset?"selected":""}>
                    ${g(o.name)}
                  </option>`).join("")}
              </select>
            </div>
            
            <div class="yyt-form-group yyt-flex-1">
              <label>\u8F93\u51FA\u6A21\u5F0F</label>
              <select class="yyt-select" id="${a}-tool-output-mode">
                <option value="inline" ${t.outputMode==="inline"?"selected":""}>
                  \u968FAI\u8F93\u51FA
                </option>
                <option value="separate" ${t.outputMode==="separate"?"selected":""}>
                  \u989D\u5916AI\u89E3\u6790
                </option>
              </select>
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u63D0\u53D6\u6807\u7B7E (\u9017\u53F7\u5206\u9694)</label>
              <input type="text" class="yyt-input" id="${a}-tool-extract-tags" 
                     value="${g((t.extractTags||[]).join(", "))}" 
                     placeholder="status_block">
            </div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${a}-tool-enabled" ${t.enabled?"checked":""}>
              <span>\u542F\u7528\u6B64\u5DE5\u5177</span>
            </label>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${a}-tool-auto-trigger" ${t.triggerEvents?.includes("GENERATION_ENDED")?"checked":""}>
              <span>\u81EA\u52A8\u89E6\u53D1 (GENERATION_ENDED)</span>
            </label>
          </div>
        </div>
        
        <!-- \u63D0\u793A\u8BCD\u6A21\u677F\u7F16\u8F91\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-file-code"></i>
            <span>\u63D0\u793A\u8BCD\u6A21\u677F</span>
            <div class="yyt-title-actions">
              <button class="yyt-btn yyt-btn-small" id="${a}-tool-reset-template">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u6A21\u677F
              </button>
            </div>
          </div>
          
          <div class="yyt-form-group">
            <textarea class="yyt-textarea yyt-code-textarea" 
                      id="${a}-tool-prompt-template" 
                      rows="15" 
                      placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${g(t.promptTemplate||"")}</textarea>
          </div>
          
          <div class="yyt-help-text">
            <p><strong>\u53EF\u7528\u53D8\u91CF:</strong></p>
            <code>{{userMessage}}</code> - \u7528\u6237\u6D88\u606F
            <code>{{lastAiMessage}}</code> - \u4E0A\u4E00\u6761AI\u6D88\u606F
            <code>{{extractedContent}}</code> - \u6B63\u5219\u63D0\u53D6\u7684\u5185\u5BB9
            <code>{{previousToolOutput}}</code> - \u4E0A\u4E00\u8F6E\u5DE5\u5177\u8F93\u51FA
            <br>
            <code>{{name}}</code> - \u89D2\u8272\u540D\u79F0
            <code>{{location}}</code> - \u4F4D\u7F6E
            <code>{{condition}}</code> - \u72B6\u6001
            <code>{{equipment}}</code> - \u88C5\u5907
            <code>{{skills}}</code> - \u6280\u80FD
          </div>
        </div>
        
        <!-- \u64CD\u4F5C\u6309\u94AE -->
        <div class="yyt-panel-footer">
          <div class="yyt-footer-left">
            <button class="yyt-btn yyt-btn-secondary" id="${a}-tool-reset">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u5168\u90E8
            </button>
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-primary" id="${a}-tool-save">
              <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${a}-tool-copy-template">
              <i class="fa-solid fa-copy"></i> \u590D\u5236\u6A21\u677F
            </button>
          </div>
        </div>
      </div>
    `},_getApiPresets(){try{return ie()||[]}catch{return[]}},_getFormData(e,t){let s=e.find(`#${a}-tool-auto-trigger`).is(":checked");return{apiPreset:e.find(`#${a}-tool-api-preset`).val()||"",outputMode:e.find(`#${a}-tool-output-mode`).val()||"inline",extractTags:(e.find(`#${a}-tool-extract-tags`).val()||"").split(",").map(o=>o.trim()).filter(Boolean),promptTemplate:e.find(`#${a}-tool-prompt-template`).val()||"",enabled:e.find(`#${a}-tool-enabled`).is(":checked"),triggerEvents:s?["GENERATION_ENDED"]:[]}},_refreshUI(e,t){let s=H(this.toolId);s&&(e.find(`#${a}-tool-api-preset`).val(s.apiPreset||""),e.find(`#${a}-tool-output-mode`).val(s.outputMode||"inline"),e.find(`#${a}-tool-extract-tags`).val((s.extractTags||[]).join(", ")),e.find(`#${a}-tool-prompt-template`).val(s.promptTemplate||""),e.find(`#${a}-tool-enabled`).prop("checked",s.enabled),e.find(`#${a}-tool-auto-trigger`).prop("checked",s.triggerEvents?.includes("GENERATION_ENDED")))},bindEvents(e,t){let s=E();if(!s||!k(e))return;let o=this;e.find(`#${a}-tool-save`).on("click",()=>{this._saveConfig(e,s)}),e.find(`#${a}-tool-reset`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u914D\u7F6E\u5417\uFF1F")&&(Ne(this.toolId),this._refreshUI(e,s),d("info","\u5DF2\u91CD\u7F6E"))}),e.find(`#${a}-tool-reset-template`).on("click",()=>{let r=Le()[this.toolId];r&&r.promptTemplate&&(e.find(`#${a}-tool-prompt-template`).val(r.promptTemplate),d("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),e.find(`#${a}-tool-copy-template`).on("click",async()=>{let n=e.find(`#${a}-tool-prompt-template`).val();if(!n){d("warning","\u6A21\u677F\u5185\u5BB9\u4E3A\u7A7A");return}try{await navigator.clipboard.writeText(n),d("success","\u6A21\u677F\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F")}catch{d("error","\u590D\u5236\u5931\u8D25")}})},_saveConfig(e,t){let s=this._getFormData(e,t);Me(this.toolId,s)?(d("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"),x.emit(m.TOOL_UPDATED,{toolId:this.toolId,config:s})):d("error","\u4FDD\u5B58\u5931\u8D25")},destroy(e){!E()||!k(e)||e.find("*").off()},getStyles(){return`
      /* \u5DE5\u5177\u9762\u677F\u6837\u5F0F */
      .yyt-tool-panel {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      
      .yyt-code-textarea {
        font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
        font-size: 13px;
        line-height: 1.5;
        tab-size: 2;
        background: rgba(0, 0, 0, 0.2);
        border-color: rgba(255, 255, 255, 0.1);
      }
      
      .yyt-code-textarea:focus {
        border-color: var(--yyt-accent);
        box-shadow: 0 0 0 2px rgba(123, 183, 255, 0.15);
      }
      
      .yyt-help-text {
        font-size: 12px;
        color: var(--yyt-text-muted);
        padding: 12px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        line-height: 1.8;
      }
      
      .yyt-help-text code {
        background: rgba(123, 183, 255, 0.15);
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 11px;
        color: #7bb7ff;
        margin: 0 2px;
      }
      
      .yyt-help-text p {
        margin: 0 0 8px 0;
        font-weight: 500;
        color: var(--yyt-text);
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
      
      .yyt-checkbox-label:hover {
        color: var(--yyt-text);
      }
      
      .yyt-panel-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 16px;
        border-top: 1px solid var(--yyt-border);
      }
      
      .yyt-footer-left,
      .yyt-footer-right {
        display: flex;
        gap: 8px;
      }
      
      .yyt-error {
        padding: 20px;
        text-align: center;
        color: var(--yyt-danger);
        background: rgba(255, 107, 107, 0.1);
        border: 1px solid rgba(255, 107, 107, 0.3);
        border-radius: var(--yyt-radius-sm);
      }
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}}});function Mt(){B.register(Z.id,Z),B.register(ee.id,ee),B.register(se.id,se),B.register(ve.id,ve),B.register(we.id,we),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function Os(e={}){B.init(e),Mt(),B.injectStyles(),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}var Go=A(()=>{ps();ys();hs();_s();Is();Ds();le();ps();ys();hs();_s();Is();Ds()});var Ko={};q(Ko,{ApiPresetPanel:()=>Z,RegexExtractPanel:()=>ee,SCRIPT_ID:()=>a,StatusBlockPanel:()=>we,SummaryToolPanel:()=>ve,ToolManagePanel:()=>se,default:()=>tr,escapeHtml:()=>g,fillFormWithConfig:()=>Pe,getCurrentTab:()=>qo,getFormApiConfig:()=>xe,getJQuery:()=>E,getRegexStyles:()=>Wo,getStyles:()=>Ho,getToolStyles:()=>Qo,initUI:()=>Os,isContainerValid:()=>k,registerComponents:()=>Mt,render:()=>Bo,renderRegex:()=>Yo,renderTool:()=>Fo,setCurrentTab:()=>Jo,showToast:()=>d,uiManager:()=>B});function Bo(e){let t=E();if(!t){console.error("[YouYouToolkit] jQuery not available");return}if(e&&(typeof e=="string"?je=t(e):e&&e.jquery?je=e:e&&(je=t(e))),!je||!je.length){console.error("[YouYouToolkit] Container not found or invalid");return}Z.renderTo(je)}function Yo(e){let t=E();if(!t){console.error("[YouYouToolkit] jQuery not available");return}if(e&&(typeof e=="string"?Ue=t(e):e&&e.jquery?Ue=e:e&&(Ue=t(e))),!Ue||!Ue.length){console.error("[YouYouToolkit] Regex container not found");return}ee.renderTo(Ue)}function Fo(e){let t=E();if(!t){console.error("[YouYouToolkit] jQuery not available");return}if(e&&(typeof e=="string"?Ge=t(e):e&&e.jquery?Ge=e:e&&(Ge=t(e))),!Ge||!Ge.length){console.error("[YouYouToolkit] Tool container not found");return}se.renderTo(Ge)}function Ho(){return Z.getStyles()}function Wo(){return ee.getStyles()}function Qo(){return se.getStyles()}function qo(){return B.getCurrentTab()}function Jo(e){B.switchTab(e)}var je,Ue,Ge,tr,Xo=A(()=>{Go();je=null,Ue=null,Ge=null;tr={render:Bo,renderRegex:Yo,renderTool:Fo,getStyles:Ho,getRegexStyles:Wo,getToolStyles:Qo,getCurrentTab:qo,setCurrentTab:Jo,uiManager:B,ApiPresetPanel:Z,RegexExtractPanel:ee,ToolManagePanel:se,SummaryToolPanel:ve,StatusBlockPanel:we,registerComponents:Mt,initUI:Os,SCRIPT_ID:a,escapeHtml:g,showToast:d,getJQuery:E,isContainerValid:k,getFormApiConfig:xe,fillFormWithConfig:Pe}});var tn={};q(tn,{abortAllTasks:()=>ir,abortTask:()=>rr,buildToolMessages:()=>en,clearExecutionHistory:()=>pr,createExecutionContext:()=>gr,createResult:()=>Nt,enhanceMessagesWithBypass:()=>mr,executeBatch:()=>nr,executeTool:()=>Zo,executeToolWithConfig:()=>Lt,executeToolsBatch:()=>hr,executorState:()=>_,extractFailed:()=>fr,extractSuccessful:()=>ur,generateTaskId:()=>Te,getExecutionHistory:()=>dr,getExecutorStatus:()=>cr,getScheduler:()=>Be,getToolsForEvent:()=>Ns,mergeResults:()=>yr,pauseExecutor:()=>ar,resumeExecutor:()=>lr,setMaxConcurrent:()=>or});function Nt(e,t,s,o,n,r,i=0){return{success:s,taskId:e,toolId:t,data:o,error:n,duration:r,retries:i,timestamp:Date.now(),metadata:{}}}function Te(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function sr(e,t={}){return{id:Te(),toolId:e,options:t,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:t.maxRetries||3}}function Be(){return rt||(rt=new Ms(_.maxConcurrent)),rt}function or(e){_.maxConcurrent=Math.max(1,Math.min(10,e)),rt&&(rt.maxConcurrent=_.maxConcurrent)}async function Zo(e,t={},s){let o=Be(),n=sr(e,t);for(;_.isPaused;)await new Promise(r=>setTimeout(r,100));try{let r=await o.enqueue(async i=>{if(i.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(i,t);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},n);return Vo(r),r}catch(r){let i=Nt(n.id,e,!1,null,r,Date.now()-n.createdAt,n.retries);return Vo(i),i}}async function nr(e,t={}){let{failFast:s=!1,concurrency:o=_.maxConcurrent}=t,n=[],r=Be(),i=r.maxConcurrent;r.maxConcurrent=o;try{let l=e.map(({toolId:c,options:p,executor:y})=>Zo(c,p,y));if(s)for(let c of l){let p=await c;if(n.push(p),!p.success){r.abortAll();break}}else{let c=await Promise.allSettled(l);for(let p of c)p.status==="fulfilled"?n.push(p.value):n.push(Nt(Te(),"unknown",!1,null,p.reason,0,0))}}finally{r.maxConcurrent=i}return n}function rr(e){return Be().abort(e)}function ir(){Be().abortAll(),_.executionQueue=[]}function ar(){_.isPaused=!0}function lr(){_.isPaused=!1}function cr(){return{...Be().getStatus(),isPaused:_.isPaused,activeControllers:_.activeControllers.size,historyCount:_.executionHistory.length}}function Vo(e){_.executionHistory.push(e),_.executionHistory.length>100&&_.executionHistory.shift()}function dr(e={}){let t=[..._.executionHistory];return e.toolId&&(t=t.filter(s=>s.toolId===e.toolId)),e.success!==void 0&&(t=t.filter(s=>s.success===e.success)),e.limit&&(t=t.slice(-e.limit)),t}function pr(){_.executionHistory=[]}function yr(e){let t={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of e)t.totalDuration+=s.duration,s.success?(t.successCount++,s.data!==void 0&&s.data!==null&&t.data.push(s.data)):(t.success=!1,t.failureCount++,s.error&&t.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return t}function ur(e){return e.filter(t=>t.success).map(t=>t.data)}function fr(e){return e.filter(t=>!t.success).map(t=>({taskId:t.taskId,toolId:t.toolId,error:t.error}))}function gr(e={}){return{taskId:Te(),startTime:Date.now(),signal:e.signal||null,apiConfig:e.apiConfig||null,bypassMessages:e.bypassMessages||[],context:e.context||{},metadata:e.metadata||{}}}function mr(e,t){return!t||t.length===0?e:[...t,...e]}function xr(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function en(e,t){let s=[],o=e.promptTemplate||"",n={"{{userMessage}}":t.input?.userMessage||"","{{lastAiMessage}}":t.input?.lastAiMessage||"","{{extractedContent}}":t.input?.extractedContent||"","{{previousToolOutput}}":t.input?.previousToolOutput||"","{{context}}":JSON.stringify(t.input?.context||{}),"{{pg}}":t.input?.context?.pg||"1","{{time}}":t.input?.context?.time||"","{{scene}}":t.input?.context?.scene||"","{{plot}}":t.input?.context?.plot||"","{{mq}}":t.input?.context?.mq||"\u2160","{{mqStatus}}":t.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":t.input?.context?.sq||"1","{{sqStatus}}":t.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":t.input?.context?.latestSq||"1","{{completed}}":t.input?.context?.completed||"\u65E0","{{defined}}":t.input?.context?.defined||"","{{status}}":t.input?.context?.status||"","{{seeds}}":t.input?.context?.seeds||"","{{name}}":t.input?.context?.name||"","{{location}}":t.input?.context?.location||"","{{condition}}":t.input?.context?.condition||"","{{equipment}}":t.input?.context?.equipment||"","{{skills}}":t.input?.context?.skills||""};for(let[r,i]of Object.entries(n))o=o.replace(new RegExp(xr(r),"g"),i);return s.push({role:"USER",content:o}),s}async function Lt(e,t,s={}){let o=H(e);if(!o)return{success:!1,taskId:Te(),toolId:e,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!o.enabled)return{success:!1,taskId:Te(),toolId:e,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let n=Date.now(),r=Te();try{x.emit(m.TOOL_EXECUTION_STARTED,{toolId:e,taskId:r,context:t});let i=en(o,t);if(typeof s.callApi=="function"){let l=o.apiPreset?{preset:o.apiPreset}:null,c=await s.callApi(i,l,s.signal),p=c;o.outputMode==="separate"&&o.extractTags?.length>0&&(p=br(c,o.extractTags));let y={success:!0,taskId:r,toolId:e,data:p,duration:Date.now()-n};return x.emit(m.TOOL_EXECUTED,{toolId:e,taskId:r,result:y}),y}else return{success:!0,taskId:r,toolId:e,data:{messages:i,config:{apiPreset:o.apiPreset,outputMode:o.outputMode,extractTags:o.extractTags}},duration:Date.now()-n,needsExecution:!0}}catch(i){let l={success:!1,taskId:r,toolId:e,error:i.message||String(i),duration:Date.now()-n};return x.emit(m.TOOL_EXECUTION_FAILED,{toolId:e,taskId:r,error:i}),l}}function br(e,t){let s={};for(let o of t){let n=new RegExp(`<${o}[^>]*>([\\s\\S]*?)<\\/${o}>`,"gi"),r=e.match(n);r&&(s[o]=r.map(i=>{let l=i.match(new RegExp(`<${o}[^>]*>([\\s\\S]*?)<\\/${o}>`,"i"));return l?l[1].trim():""}))}return s}async function hr(e,t,s={}){let o=[];for(let n of e){let r=H(n);if(r&&r.enabled){let i=await Lt(n,t,s);o.push(i)}}return o}function Ns(e){let t=[],s=["summaryTool","statusBlock"];for(let o of s){let n=H(o);n&&n.enabled&&n.triggerEvents?.includes(e)&&t.push(n)}return t}var _,Ms,rt,Ls=A(()=>{ze();J();_={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};Ms=class{constructor(t=3){this.maxConcurrent=t,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(t,s){return new Promise((o,n)=>{this.queue.push({executor:t,task:s,resolve:o,reject:n}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let t=this.queue.shift();if(!t)continue;let{executor:s,task:o,resolve:n,reject:r}=t,i=new AbortController;o.abortController=i,o.status="running",o.startedAt=Date.now(),this.running.set(o.id,o),_.activeControllers.set(o.id,i),this.executeTask(s,o,i.signal).then(l=>{o.status="completed",o.completedAt=Date.now(),n(l)}).catch(l=>{o.status=l.name==="AbortError"?"aborted":"failed",o.completedAt=Date.now(),r(l)}).finally(()=>{this.running.delete(o.id),_.activeControllers.delete(o.id),_.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(t,s,o){let n=Date.now(),r=null;for(let i=0;i<=s.maxRetries;i++){if(o.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let l=await t(o);return Nt(s.id,s.toolId,!0,l,null,Date.now()-n,i)}catch(l){if(r=l,l.name==="AbortError")throw l;i<s.maxRetries&&(await this.delay(1e3*(i+1)),s.retries=i+1)}}throw r}delay(t){return new Promise(s=>setTimeout(s,t))}abort(t){let s=_.activeControllers.get(t);return s?(s.abort(),!0):!1}abortAll(){for(let t of _.activeControllers.values())t.abort();_.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},rt=null});var rn={};q(rn,{EVENT_TYPES:()=>zs,checkGate:()=>Us,destroyToolTriggerManager:()=>Ar,getChatContext:()=>Gs,getCurrentCharacter:()=>Bs,getFullContext:()=>Tr,getToolTriggerManagerState:()=>Pr,getWorldbookContent:()=>sn,initToolTriggerManager:()=>on,initTriggerModule:()=>nn,registerEventListener:()=>Ye,registerTriggerHandler:()=>Er,removeAllListeners:()=>vr,removeAllTriggerHandlers:()=>$r,resetGateState:()=>wr,setDebugMode:()=>Rr,setTriggerHandlerEnabled:()=>Sr,triggerState:()=>R,unregisterEventListener:()=>jt,updateGateState:()=>zt});function Fe(){return typeof window.parent<"u"?window.parent:window}function Ut(){return Fe().SillyTavern||null}function js(){let t=Fe().SillyTavern;return t&&t.eventSource?t.eventSource:null}function Gt(){let t=Fe().SillyTavern;return t&&t.eventTypes?t.eventTypes:zs}function b(...e){R.debugMode&&console.log("[YouYouToolkit:Trigger]",...e)}function Ye(e,t,s={}){if(!e||typeof t!="function")return b("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u51FD\u6570"),()=>{};let{once:o=!1,priority:n=0}=s,r=js(),l=Gt()[e]||e,c=async(...p)=>{try{if(s.gateCheck&&!await Us(s.gateCheck)){b(`\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6: ${e}`);return}await t(...p),o&&jt(e,c)}catch(y){console.error("[YouYouToolkit:Trigger] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF:",y)}};if(R.listeners.has(e)||R.listeners.set(e,new Set),R.listeners.get(e).add(c),r&&typeof r.on=="function")r.on(l,c),b(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${e}`);else{let p=Fe();p.addEventListener&&(p.addEventListener(l,c),b(`\u5DF2\u6CE8\u518CDOM\u4E8B\u4EF6\u76D1\u542C\u5668: ${e}`))}return()=>jt(e,c)}function jt(e,t){let s=R.listeners.get(e);if(s&&s.has(t)){s.delete(t);let o=js(),r=Gt()[e]||e;if(o&&typeof o.off=="function")o.off(r,t),b(`\u5DF2\u53D6\u6D88\u4E8B\u4EF6\u76D1\u542C\u5668: ${e}`);else{let i=Fe();i.removeEventListener&&i.removeEventListener(r,t)}}}function vr(){let e=js(),t=Gt();for(let[s,o]of R.listeners){let n=t[s]||s;for(let r of o)if(e&&typeof e.off=="function")e.off(n,r);else{let i=Fe();i.removeEventListener&&i.removeEventListener(n,r)}}R.listeners.clear(),b("\u5DF2\u79FB\u9664\u6240\u6709\u4E8B\u4EF6\u76D1\u542C\u5668")}async function Us(e){if(!e)return!0;let t=Date.now(),s=R.gateState;if(e.minInterval&&s.lastGenerationAt&&t-s.lastGenerationAt<e.minInterval)return b("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u77ED"),!1;if(e.maxInterval&&s.lastUserMessageAt&&t-s.lastUserMessageAt>e.maxInterval)return b("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u957F"),!1;if(e.requireUserMessage&&!s.lastUserMessageId)return b("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u7F3A\u5C11\u7528\u6237\u6D88\u606F"),!1;if(e.excludeQuietGeneration&&s.lastGenerationType==="quiet")return b("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: quiet\u751F\u6210\u88AB\u6392\u9664"),!1;if(e.customCheck&&typeof e.customCheck=="function")try{if(!await e.customCheck(s))return b("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u81EA\u5B9A\u4E49\u68C0\u67E5\u8FD4\u56DEfalse"),!1}catch(o){return console.error("[YouYouToolkit:Trigger] \u81EA\u5B9A\u4E49\u95E8\u63A7\u68C0\u67E5\u9519\u8BEF:",o),!1}return!0}function zt(e){Object.assign(R.gateState,e)}function wr(){R.gateState={lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationType:null,lastGenerationAt:0,isGenerating:!1}}async function Gs(e={}){let{depth:t=3,includeUser:s=!0,includeAssistant:o=!0,includeSystem:n=!1,format:r="messages"}=e,i=Ut();if(!i)return b("\u65E0\u6CD5\u83B7\u53D6SillyTavern API"),null;try{let l=i.chat||[],c=[],p=Math.max(0,l.length-t);for(let y=p;y<l.length;y++){let f=l[y];f&&(f.is_user&&!s||!f.is_user&&f.is_system&&!n||!f.is_user&&!f.is_system&&!o||(r==="messages"?c.push({role:f.is_user?"user":f.is_system?"system":"assistant",content:f.mes||"",name:f.name||"",timestamp:f.send_date}):c.push(f.mes||"")))}return{messages:c,totalMessages:l.length,startIndex:p,endIndex:l.length-1}}catch(l){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u804A\u5929\u4E0A\u4E0B\u6587\u5931\u8D25:",l),null}}async function Bs(){let e=Ut();if(!e)return null;try{let t=e.this_chid,s=e.characters||[];if(t>=0&&t<s.length){let o=s[t];return{id:t,name:o.name||"",description:o.description||"",personality:o.personality||"",scenario:o.scenario||"",firstMes:o.first_mes||"",mesExample:o.mes_example||""}}return null}catch(t){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",t),null}}async function sn(e={}){let{enabledOnly:t=!0,maxLength:s=1e4}=e,o=Ut();if(!o)return"";try{let r=(o.lorebook||[]).entries||[],i=[],l=0;for(let c of r){if(t&&!c.enabled)continue;let p=c.content||"";p&&l+p.length<=s&&(i.push(p),l+=p.length)}return i.join(`

`)}catch(n){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u5931\u8D25:",n),""}}async function Tr(e={}){let[t,s,o]=await Promise.all([Gs(e.chat||{}),Bs(),sn(e.worldbook||{})]);return{chat:t,character:s,worldbook:o,timestamp:Date.now()}}function Er(e,t){if(!e||!t)return b("\u65E0\u6548\u7684\u5904\u7406\u5668ID\u6216\u914D\u7F6E"),()=>{};let{eventType:s,handler:o,gateCondition:n,priority:r=0}=t;if(!s||typeof o!="function")return b("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u5904\u7406\u5668\u51FD\u6570"),()=>{};R.handlers.set(e,{eventType:s,handler:o,gateCondition:n,priority:r,enabled:!0});let i=Ye(s,async(...l)=>{let c=R.handlers.get(e);!c||!c.enabled||c.gateCondition&&!await Us(c.gateCondition)||await c.handler(...l)},{priority:r});return b(`\u5DF2\u6CE8\u518C\u89E6\u53D1\u5904\u7406\u5668: ${e}`),()=>{i(),R.handlers.delete(e),b(`\u5DF2\u53D6\u6D88\u89E6\u53D1\u5904\u7406\u5668: ${e}`)}}function Sr(e,t){let s=R.handlers.get(e);s&&(s.enabled=t,b(`\u89E6\u53D1\u5904\u7406\u5668 ${e} \u5DF2${t?"\u542F\u7528":"\u7981\u7528"}`))}function $r(){R.handlers.clear(),b("\u5DF2\u79FB\u9664\u6240\u6709\u89E6\u53D1\u5904\u7406\u5668")}function on(){if(K.initialized){b("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316");return}Cr(),K.initialized=!0,b("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316"),x.emit(m.TOOL_TRIGGER_INITIALIZED)}function Cr(){let e=zs.GENERATION_ENDED,t=Ye(e,async s=>{b("GENERATION_ENDED\u89E6\u53D1:",s);let o=await _r(s),n=kr(e);if(n.length===0){b("\u6CA1\u6709\u9700\u8981\u6267\u884C\u7684\u5DE5\u5177");return}b(`\u9700\u8981\u6267\u884C ${n.length} \u4E2A\u5DE5\u5177:`,n.map(r=>r.id));for(let r of n)try{let i=await Lt(r.id,o);i.success?(b(`\u5DE5\u5177 ${r.id} \u6267\u884C\u6210\u529F`),x.emit(m.TOOL_EXECUTED,{toolId:r.id,result:i.data})):b(`\u5DE5\u5177 ${r.id} \u6267\u884C\u5931\u8D25:`,i.error)}catch(i){console.error(`[ToolTrigger] \u5DE5\u5177\u6267\u884C\u5931\u8D25: ${r.id}`,i)}K.lastExecutionContext=o});K.listeners.set(e,t)}async function _r(e){let t=await Gs({depth:5}),s=await Bs(),o=t?.messages||[],n=o.filter(i=>i.role==="user").pop(),r=o.filter(i=>i.role==="assistant").pop();return{triggeredAt:Date.now(),triggerEvent:"GENERATION_ENDED",input:{userMessage:n?.content||"",lastAiMessage:r?.content||"",extractedContent:"",previousToolOutput:"",context:{character:s?.name||"",chatLength:t?.totalMessages||0}},config:{},status:"pending"}}function kr(e){return Ns(e)}function Ar(){for(let[e,t]of K.listeners)jt(e,t);K.listeners.clear(),K.initialized=!1,K.lastExecutionContext=null,b("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u9500\u6BC1")}function Pr(){return{initialized:K.initialized,listenersCount:K.listeners.size,lastExecutionContext:K.lastExecutionContext}}async function nn(){if(R.isInitialized){b("\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316");return}if(!Ut()){b("\u65E0\u6CD5\u83B7\u53D6SillyTavern API\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),setTimeout(nn,1e3);return}let t=Gt();t.MESSAGE_SENT&&Ye(t.MESSAGE_SENT,s=>{zt({lastUserMessageId:s,lastUserMessageAt:Date.now()}),b(`\u7528\u6237\u6D88\u606F\u5DF2\u53D1\u9001: ${s}`)}),t.GENERATION_STARTED&&Ye(t.GENERATION_STARTED,(s,o)=>{zt({lastGenerationType:s,isGenerating:!0}),b(`\u751F\u6210\u5F00\u59CB: ${s}`)}),t.GENERATION_ENDED&&Ye(t.GENERATION_ENDED,()=>{zt({lastGenerationAt:Date.now(),isGenerating:!1}),b("\u751F\u6210\u7ED3\u675F")}),on(),R.isInitialized=!0,b("\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function Rr(e){R.debugMode=e}var zs,R,K,an=A(()=>{J();ze();Ls();zs={MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHARACTER_LOADED:"CHARACTER_LOADED",CHARACTER_DELETED:"CHARACTER_DELETED",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",WORLDBOOK_UPDATED:"WORLDBOOK_UPDATED",EXTENSIONS_LOADED:"EXTENSIONS_LOADED",SETTINGS_LOADED:"SETTINGS_LOADED"},R={listeners:new Map,handlers:new Map,gateState:{lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationType:null,lastGenerationAt:0,isGenerating:!1},isInitialized:!1,debugMode:!1};K={initialized:!1,listeners:new Map,lastExecutionContext:null}});var cn={};q(cn,{WindowManager:()=>Bt,closeWindow:()=>Mr,createWindow:()=>Or,windowManager:()=>W});function Dr(){if(W.stylesInjected)return;W.stylesInjected=!0;let e=`
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
        radial-gradient(1200px 600px at 10% -10%, rgba(123, 183, 255, 0.12), transparent 60%),
        radial-gradient(900px 500px at 100% 0%, rgba(155, 123, 255, 0.10), transparent 55%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 22%),
        #0b0f15;
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
  `,t=document.createElement("style");t.id=Ir+"_styles",t.textContent=e,(document.head||document.documentElement).appendChild(t)}function Or(e){let{id:t,title:s="\u7A97\u53E3",content:o="",width:n=900,height:r=700,modal:i=!1,resizable:l=!0,maximizable:c=!0,startMaximized:p=!1,rememberState:y=!0,onClose:f,onReady:P}=e;Dr();let u=window.jQuery||window.parent?.jQuery;if(!u)return console.error("[WindowManager] jQuery not available"),null;if(W.isOpen(t))return W.bringToFront(t),W.getWindow(t);let D=window.innerWidth||1200,dt=window.innerHeight||800,qt=D<=1100,ye=null,Jt=!1;y&&(ye=W.getState(t),ye&&!qt&&(Jt=!0));let Ee,Se;Jt&&ye.width&&ye.height?(Ee=Math.max(400,Math.min(ye.width,D-40)),Se=Math.max(300,Math.min(ye.height,dt-40))):(Ee=Math.max(400,Math.min(n,D-40)),Se=Math.max(300,Math.min(r,dt-40)));let qs=Math.max(20,Math.min((D-Ee)/2,D-Ee-20)),Js=Math.max(20,Math.min((dt-Se)/2,dt-Se-20)),Sn=c&&!qt,$n=`
    <div class="yyt-window" id="${t}" style="left:${qs}px; top:${Js}px; width:${Ee}px; height:${Se}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${Nr(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${Sn?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
          <button class="yyt-window-btn close" title="\u5173\u95ED"><i class="fa-solid fa-times"></i></button>
        </div>
      </div>
      <div class="yyt-window-body">${o}</div>
      ${l?`
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
  `,ue=null;i&&(ue=u(`<div class="yyt-window-overlay" data-for="${t}"></div>`),u(document.body).append(ue));let h=u($n);u(document.body).append(h),W.register(t,h),h.on("mousedown",()=>W.bringToFront(t));let ne=!1,fe={left:qs,top:Js,width:Ee,height:Se},pt=()=>{fe={left:parseInt(h.css("left")),top:parseInt(h.css("top")),width:h.width(),height:h.height()},h.addClass("maximized"),h.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),ne=!0},Cn=()=>{h.removeClass("maximized"),h.css({left:fe.left+"px",top:fe.top+"px",width:fe.width+"px",height:fe.height+"px"}),h.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),ne=!1};h.find(".yyt-window-btn.maximize").on("click",()=>{ne?Cn():pt()}),(qt&&c||Jt&&ye.isMaximized&&c||p&&c)&&pt(),h.find(".yyt-window-btn.close").on("click",()=>{if(y&&c){let L={width:ne?fe.width:h.width(),height:ne?fe.height:h.height(),isMaximized:ne};W.saveState(t,L)}f&&f(),ue&&ue.remove(),h.remove(),W.unregister(t),u(document).off(".yytWindowDrag"+t),u(document).off(".yytWindowResize"+t)}),ue&&ue.on("click",L=>{L.target,ue[0]});let yt=!1,Ks,Xs,Vs,Zs;if(h.find(".yyt-window-header").on("mousedown",L=>{u(L.target).closest(".yyt-window-controls").length||ne||(yt=!0,Ks=L.clientX,Xs=L.clientY,Vs=parseInt(h.css("left")),Zs=parseInt(h.css("top")),u(document.body).css("user-select","none"))}),u(document).on("mousemove.yytWindowDrag"+t,L=>{if(!yt)return;let z=L.clientX-Ks,ut=L.clientY-Xs;h.css({left:Math.max(0,Vs+z)+"px",top:Math.max(0,Zs+ut)+"px"})}),u(document).on("mouseup.yytWindowDrag"+t,()=>{yt&&(yt=!1,u(document.body).css("user-select",""))}),l){let L=!1,z="",ut,eo,ft,gt,Kt,Xt;h.find(".yyt-window-resize-handle").on("mousedown",function($e){ne||(L=!0,z="",u(this).hasClass("se")?z="se":u(this).hasClass("e")?z="e":u(this).hasClass("s")?z="s":u(this).hasClass("w")?z="w":u(this).hasClass("n")?z="n":u(this).hasClass("nw")?z="nw":u(this).hasClass("ne")?z="ne":u(this).hasClass("sw")&&(z="sw"),ut=$e.clientX,eo=$e.clientY,ft=h.width(),gt=h.height(),Kt=parseInt(h.css("left")),Xt=parseInt(h.css("top")),u(document.body).css("user-select","none"),$e.stopPropagation())}),u(document).on("mousemove.yytWindowResize"+t,$e=>{if(!L)return;let Vt=$e.clientX-ut,Zt=$e.clientY-eo,to=400,so=300,es=ft,ts=gt,oo=Kt,no=Xt;if(z.includes("e")&&(es=Math.max(to,ft+Vt)),z.includes("s")&&(ts=Math.max(so,gt+Zt)),z.includes("w")){let Qe=ft-Vt;Qe>=to&&(es=Qe,oo=Kt+Vt)}if(z.includes("n")){let Qe=gt-Zt;Qe>=so&&(ts=Qe,no=Xt+Zt)}h.css({width:es+"px",height:ts+"px",left:oo+"px",top:no+"px"})}),u(document).on("mouseup.yytWindowResize"+t,()=>{L&&(L=!1,u(document.body).css("user-select",""))})}return h.on("remove",()=>{u(document).off(".yytWindowDrag"+t),u(document).off(".yytWindowResize"+t)}),P&&setTimeout(()=>P(h),50),h}function Mr(e){let t=W.getWindow(e);if(t){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${e}"]`).remove(),s(document).off(".yytWindowDrag"+e),s(document).off(".yytWindowResize"+e)),t.remove(),W.unregister(e)}}function Nr(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}var Ir,ln,Bt,W,dn=A(()=>{Ce();Ir="youyou_toolkit_window_manager",ln="window_states",Bt=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(t,s){this.topZIndex++,this.windows.set(t,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(t){this.windows.delete(t)}bringToFront(t){let s=this.windows.get(t);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(t){return this.windows.get(t)?.$el||null}isOpen(t){return this.windows.has(t)}closeAll(){this.windows.forEach((t,s)=>{t.$el&&t.$el.remove()}),this.windows.clear()}saveState(t,s){let o=this.loadStates();o[t]={...s,updatedAt:Date.now()},qe.set(ln,o)}loadStates(){return qe.get(ln)||{}}getState(t){return this.loadStates()[t]||null}},W=new Bt});var pn={};q(pn,{DEFAULT_PROMPT_SEGMENTS:()=>Yt,PromptEditor:()=>Ft,default:()=>Fr,getPromptEditorStyles:()=>Ur,messagesToSegments:()=>Yr,segmentsToMessages:()=>Br,validatePromptSegments:()=>Gr});function Ur(){return`
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
  `}function Gr(e){let t=[];return Array.isArray(e)?(e.forEach((s,o)=>{s.id||t.push(`\u6BB5\u843D ${o+1} \u7F3A\u5C11ID`),s.role||t.push(`\u6BB5\u843D ${o+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(s.role)||t.push(`\u6BB5\u843D ${o+1} \u7684role\u503C\u65E0\u6548: ${s.role}`)}),{valid:t.length===0,errors:t}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function Br(e){return e.filter(t=>t.content&&t.content.trim()).map(t=>({role:t.role,content:t.content,deletable:t.deletable,mainSlot:t.mainSlot}))}function Yr(e){return Array.isArray(e)?e.map((t,s)=>({id:`segment_${s}_${Date.now()}`,type:t.role==="SYSTEM"?"system":t.role==="assistant"?"ai":"user",role:t.role,mainSlot:t.mainSlot||"",content:t.content||"",deletable:t.deletable!==!1,expanded:!0,isMain:t.mainSlot==="A"||t.isMain,isMain2:t.mainSlot==="B"||t.isMain2})):[...Yt]}var Lr,zr,jr,Yt,Ft,Fr,yn=A(()=>{Lr="youyou_toolkit_prompt_editor",zr={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},jr={system:"fa-server",ai:"fa-robot",user:"fa-user"},Yt=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],Ft=class{constructor(t={}){this.containerId=t.containerId||Lr,this.segments=t.segments||[...Yt],this.onChange=t.onChange||null,this.editable=t.editable!==!1,this.showMainSlot=t.showMainSlot!==!1,this.$container=null,this.$=null}init(t){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=t,this.render(),this.bindEvents()}setSegments(t){this.segments=t&&Array.isArray(t)?[...t]:[...Yt],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(t=>({...t,content:this.getSegmentContent(t.id)}))}getSegmentContent(t){return this.$container&&this.$container.find(`[data-segment-id="${t}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let t=`
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
    `;this.$container.html(t)}renderSegment(t){let s=zr[t.type]||t.type,o=jr[t.type]||"fa-file",n=t.mainSlot==="A"||t.isMain,r=t.mainSlot==="B"||t.isMain2,i=n?"var(--yyt-accent, #7bb7ff)":r?"#ffb74d":"",l=this.showMainSlot&&t.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${t.mainSlot}</span>`:"",c=`<span class="yyt-prompt-role-badge">role: ${t.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${t.expanded?"yyt-expanded":""} ${n?"yyt-main-a":""} ${r?"yyt-main-b":""}" 
           data-segment-id="${t.id}" 
           data-segment-type="${t.type}"
           style="${i?`border-left: 3px solid ${i};`:""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${o}"></i>
            <span class="yyt-prompt-segment-title">${s}</span>
            <div class="yyt-prompt-segment-badges">
              ${c}
              ${l}
            </div>
          </div>
          <div class="yyt-prompt-segment-controls">
            ${t.deletable!==!1?`
              <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-btn-danger yyt-prompt-delete" title="\u5220\u9664\u6BB5\u843D">
                <i class="fa-solid fa-trash"></i>
              </button>
            `:""}
            <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-prompt-toggle" title="\u5C55\u5F00/\u6298\u53E0">
              <i class="fa-solid ${t.expanded?"fa-chevron-up":"fa-chevron-down"}"></i>
            </button>
          </div>
        </div>
        <div class="yyt-prompt-segment-body">
          <div class="yyt-prompt-segment-meta">
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>Role</label>
                <select class="yyt-select yyt-prompt-role" ${this.editable?"":"disabled"}>
                  <option value="SYSTEM" ${t.role==="SYSTEM"?"selected":""}>SYSTEM</option>
                  <option value="USER" ${t.role==="USER"?"selected":""}>USER</option>
                  <option value="assistant" ${t.role==="assistant"?"selected":""}>assistant</option>
                </select>
              </div>
              ${this.showMainSlot?`
              <div class="yyt-form-group yyt-flex-1">
                <label>Main Slot</label>
                <select class="yyt-select yyt-prompt-main-slot" ${this.editable?"":"disabled"}>
                  <option value="" ${t.mainSlot?"":"selected"}>\u666E\u901A</option>
                  <option value="A" ${t.mainSlot==="A"?"selected":""}>A (\u5EFA\u8BAESystem)</option>
                  <option value="B" ${t.mainSlot==="B"?"selected":""}>B (\u5EFA\u8BAEUser)</option>
                </select>
              </div>
              `:""}
            </div>
          </div>
          <textarea class="yyt-textarea yyt-prompt-textarea" 
                    rows="6" 
                    placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u5185\u5BB9..." 
                    ${this.editable?"":"disabled"}>${this.escapeHtml(t.content||"")}</textarea>
        </div>
      </div>
    `}bindEvents(){this.$container&&(this.$container.find(".yyt-prompt-toggle").on("click",t=>{this.$(t.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(t.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.find(".yyt-prompt-delete").on("click",t=>{let s=this.$(t.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.find(".yyt-prompt-role").on("change",t=>{let s=this.$(t.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),o=this.$(t.currentTarget).val();this.updateSegmentMeta(s,{role:o})}),this.$container.find(".yyt-prompt-main-slot").on("change",t=>{let s=this.$(t.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),o=this.$(t.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:o})}),this.$container.find(".yyt-prompt-textarea").on("input",t=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.find(`#${this.containerId}-add-segment`).on("click",()=>{this.addSegment()}),this.$container.find(`#${this.containerId}-import-prompt`).on("click",()=>{this.importPrompt()}),this.$container.find(`#${this.containerId}-export-prompt`).on("click",()=>{this.exportPrompt()}))}addSegment(t=null){let s=`segment_${Date.now()}`,o=t||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};o.id||(o.id=s),this.segments.push(o),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(t){let s=this.segments.findIndex(n=>n.id===t);if(s===-1)return;if(this.segments[s].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(t,s){let o=this.segments.find(n=>n.id===t);o&&(Object.assign(o,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let t=document.createElement("input");t.type="file",t.accept=".json",t.onchange=s=>{let o=s.target.files[0];if(!o)return;let n=new FileReader;n.onload=r=>{try{let i=JSON.parse(r.target.result);Array.isArray(i)?(this.setSegments(i),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(i){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",i)}},n.readAsText(o)},t.click()}exportPrompt(){let t=this.getSegments(),s=JSON.stringify(t,null,2),o=new Blob([s],{type:"application/json"}),n=URL.createObjectURL(o),r=document.createElement("a");r.href=n,r.download=`prompt_group_${Date.now()}.json`,r.click(),URL.revokeObjectURL(n),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}escapeHtml(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}};Fr=Ft});var U="youyou_toolkit",Hs="0.4.0",it=`${U}-menu-item`,Ys=`${U}-menu-container`,Hr=`${U}-popup`,I=typeof window.parent<"u"?window.parent:window,Ht=null,de=null,at=null,N=null,fn=null,Qt=null,gn=null,mn=null,lt=null,Q=null,F=null;async function He(){try{return Ht=await Promise.resolve().then(()=>(Ke(),lo)),de=await Promise.resolve().then(()=>(os(),po)),at=await Promise.resolve().then(()=>(Ve(),yo)),N=await Promise.resolve().then(()=>(Xo(),Ko)),fn=await Promise.resolve().then(()=>(bs(),So)),Qt=await Promise.resolve().then(()=>(Cs(),$o)),gn=await Promise.resolve().then(()=>(Ls(),tn)),mn=await Promise.resolve().then(()=>(an(),rn)),lt=await Promise.resolve().then(()=>(dn(),cn)),Q=await Promise.resolve().then(()=>(ze(),Uo)),F=await Promise.resolve().then(()=>(yn(),pn)),!0}catch(e){return console.warn(`[${U}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,e),!1}}function G(...e){console.log(`[${U}]`,...e)}function xn(...e){console.error(`[${U}]`,...e)}function un(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}async function Wr(){let e=`${U}-styles`,t=I.document||document;if(t.getElementById(e))return;let s="";try{let n=await fetch("./styles/main.css");n.ok&&(s=await n.text())}catch{G("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F")}s||(s=Qr());let o=t.createElement("style");o.id=e,o.textContent=s,(t.head||t.documentElement).appendChild(o),G("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function Qr(){return`
    /* CSS\u53D8\u91CF */
    :root {
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
    }
    
    /* \u83DC\u5355\u9879 */
    #${Ys} { display: flex; align-items: center; }
    
    #${it} {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 14px; cursor: pointer;
      transition: all 0.2s ease; border-radius: 8px; margin: 2px;
    }
    
    #${it}:hover {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
    }
    
    #${it} .fa-fw {
      font-size: 16px; color: var(--yyt-accent);
      filter: drop-shadow(0 0 6px var(--yyt-accent-glow));
    }
    
    #${it} span { font-weight: 500; letter-spacing: 0.3px; }
    
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
        radial-gradient(1200px 600px at 10% -10%, rgba(123, 183, 255, 0.12), transparent 60%),
        radial-gradient(900px 500px at 100% 0%, rgba(155, 123, 255, 0.10), transparent 55%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 22%),
        #0b0f15;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.65), 0 0 60px rgba(123, 183, 255, 0.1);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
      color: rgba(255, 255, 255, 0.92);
      z-index: 10000;
    }
    
    /* \u5F39\u7A97\u5934\u90E8 */
    .yyt-popup-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 20px;
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px 16px 0 0;
      flex-shrink: 0;
    }
    
    .yyt-popup-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 15px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.95);
    }
    
    .yyt-popup-title i {
      color: rgba(123, 183, 255, 0.85);
      font-size: 18px;
    }
    
    .yyt-popup-close {
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.06);
      color: rgba(255, 255, 255, 0.7);
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
    
    /* \u5F39\u7A97\u5E95\u90E8 */
    .yyt-popup-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      padding: 14px 20px;
      background: rgba(255, 255, 255, 0.02);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 0 0 16px 16px;
      flex-shrink: 0;
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
      color: #0b0f15;
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #a5d4ff 100%);
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
      padding: 0 4px;
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
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #5a9cf0 100%);
      color: #0b0f15;
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
    
    /* \u54CD\u5E94\u5F0F */
    @media screen and (max-width: 1100px) {
      .yyt-popup {
        width: 98vw;
        height: 90vh;
      }
    }
    
    @media screen and (max-width: 768px) {
      .yyt-popup {
        width: 100vw;
        height: 100vh;
        border-radius: 0;
        border: none;
      }
    }
  `}var w=null,pe=null,We="apiPresets",Ws={};function Wt(){w&&(w.remove(),w=null),pe&&(pe.remove(),pe=null),G("\u5F39\u7A97\u5DF2\u5173\u95ED")}function bn(e){We=e;let t=I.jQuery||window.jQuery;if(!t||!w)return;t(w).find(".yyt-main-nav-item").removeClass("active"),t(w).find(`.yyt-main-nav-item[data-tab="${e}"]`).addClass("active");let s=Q?.getToolConfig(e);s?.hasSubTabs?(t(w).find(".yyt-sub-nav").show(),vn(e,s.subTabs)):t(w).find(".yyt-sub-nav").hide(),t(w).find(".yyt-tab-content").removeClass("active"),t(w).find(`.yyt-tab-content[data-tab="${e}"]`).addClass("active"),wn(e)}function hn(e,t){Ws[e]=t;let s=I.jQuery||window.jQuery;!s||!w||(s(w).find(".yyt-sub-nav-item").removeClass("active"),s(w).find(`.yyt-sub-nav-item[data-subtab="${t}"]`).addClass("active"),Qs(e,t))}function vn(e,t){let s=I.jQuery||window.jQuery;if(!s||!w||!t)return;let o=Ws[e]||t[0]?.id,n=t.map(r=>`
    <div class="yyt-sub-nav-item ${r.id===o?"active":""}" data-subtab="${r.id}">
      <i class="fa-solid ${r.icon||"fa-file"}"></i>
      <span>${r.name}</span>
    </div>
  `).join("");s(w).find(".yyt-sub-nav").html(n),s(w).find(".yyt-sub-nav-item").on("click",function(){let r=s(this).data("subtab");hn(e,r)})}function wn(e){let t=I.jQuery||window.jQuery;if(!t||!w)return;let s=t(w).find(`.yyt-tab-content[data-tab="${e}"]`);if(!s.length)return;let o=Q?.getToolConfig(e);switch(e){case"apiPresets":N&&N.render(s);break;case"regexExtract":N&&N.renderRegex(s);break;case"tools":if(o?.hasSubTabs&&o.subTabs?.length>0){let n=o.subTabs[0].id;Qs(e,n)}else s.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:qr(e,s);break}}function Qs(e,t){let s=I.jQuery||window.jQuery;if(!s||!w)return;let o=s(w).find(`.yyt-tab-content[data-tab="${e}"]`);if(!o.length)return;let n=Q?.getToolConfig(e);if(n?.hasSubTabs){let i=n.subTabs?.find(l=>l.id===t);if(i){let l=o.find(".yyt-sub-content");switch(l.length||(o.html('<div class="yyt-sub-content"></div>'),l=o.find(".yyt-sub-content")),i.component){case"SummaryToolPanel":N?.SummaryToolPanel?N.SummaryToolPanel.renderTo(l):l.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"StatusBlockPanel":N?.StatusBlockPanel?N.StatusBlockPanel.renderTo(l):l.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:l.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}return}let r=o.find(".yyt-sub-content");if(r.length)switch(t){case"config":Jr(e,r);break;case"prompts":Kr(e,r);break;case"presets":Xr(e,r);break;default:r.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}function qr(e,t){if(!(I.jQuery||window.jQuery))return;let o=Q?.getToolConfig(e);if(!o){t.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let n=Ws[e]||o.subTabs?.[0]?.id||"config";t.html(`
    <div class="yyt-tool-window">
      <div class="yyt-sub-content" data-subtab="${n}">
        <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
      </div>
    </div>
  `),Qs(e,n)}function Jr(e,t){if(!(I.jQuery||window.jQuery))return;let o=Qt?.getTool(e),n=at?.getAllPresets()||[],r=Q?.getToolApiPreset(e)||"",i=n.map(l=>`<option value="${un(l.name)}" ${l.name===r?"selected":""}>${un(l.name)}</option>`).join("");t.html(`
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
            ${i}
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
            <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${o?.config?.execution?.timeout||6e4}">
          </div>
          <div class="yyt-form-group yyt-flex-1">
            <label>\u91CD\u8BD5\u6B21\u6570</label>
            <input type="number" class="yyt-input" id="yyt-tool-retries" value="${o?.config?.execution?.retries||3}">
          </div>
        </div>
      </div>
    </div>
  `),t.find("#yyt-save-tool-preset").on("click",function(){let l=t.find("#yyt-tool-api-preset").val();Q?.setToolApiPreset(e,l);let c=I.toastr;c&&c.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}function Kr(e,t){if(!(I.jQuery||window.jQuery)||!F){t.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let n=Qt?.getTool(e)?.config?.messages||[],r=F.messagesToSegments?F.messagesToSegments(n):F.DEFAULT_PROMPT_SEGMENTS,i=new F.PromptEditor({containerId:`yyt-prompt-editor-${e}`,segments:r,onChange:c=>{let p=F.segmentsToMessages?F.segmentsToMessages(c):[];G("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",p.length,"\u6761\u6D88\u606F")}});t.html(`<div id="yyt-prompt-editor-${e}" class="yyt-prompt-editor-container"></div>`),i.init(t.find(`#yyt-prompt-editor-${e}`));let l=F.getPromptEditorStyles?F.getPromptEditorStyles():"";if(l){let c="yyt-prompt-editor-styles";if(!document.getElementById(c)){let p=document.createElement("style");p.id=c,p.textContent=l,document.head.appendChild(p)}}}function Xr(e,t){(I.jQuery||window.jQuery)&&t.html(`
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
  `)}function Tn(){if(w){G("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let e=I.jQuery||window.jQuery,t=I.document||document;if(!e){xn("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let s=Q?.getToolList()||[];pe=t.createElement("div"),pe.className="yyt-popup-overlay",pe.addEventListener("click",c=>{c.target===pe&&Wt()}),t.body.appendChild(pe);let o=s.map(c=>`
    <div class="yyt-main-nav-item ${c.id===We?"active":""}" data-tab="${c.id}">
      <i class="fa-solid ${c.icon}"></i>
      <span>${c.name}</span>
    </div>
  `).join(""),n=s.map(c=>`
    <div class="yyt-tab-content ${c.id===We?"active":""}" data-tab="${c.id}">
      <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
    </div>
  `).join(""),r=`
    <div class="yyt-popup" id="${Hr}">
      <div class="yyt-popup-header">
        <div class="yyt-popup-title">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span>YouYou \u5DE5\u5177\u7BB1</span>
          <span style="font-size: 12px; opacity: 0.6;">v${Hs}</span>
        </div>
        <button class="yyt-popup-close" title="\u5173\u95ED">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      
      <div class="yyt-popup-body">
        <div class="yyt-main-nav">
          ${o}
        </div>
        
        <div class="yyt-sub-nav" style="display: none;">
          <!-- \u6B21\u7EA7\u9876\u680F\u5C06\u52A8\u6001\u6E32\u67D3 -->
        </div>
        
        <div class="yyt-content">
          ${n}
        </div>
      </div>
      
      <div class="yyt-popup-footer">
        <button class="yyt-btn yyt-btn-secondary" id="${U}-close-btn">\u5173\u95ED</button>
      </div>
    </div>
  `,i=t.createElement("div");i.innerHTML=r,w=i.firstElementChild,t.body.appendChild(w),e(w).find(".yyt-popup-close").on("click",Wt),e(w).find(`#${U}-close-btn`).on("click",Wt),e(w).find(".yyt-main-nav-item").on("click",function(){let c=e(this).data("tab");c&&bn(c)}),wn(We);let l=Q?.getToolConfig(We);l?.hasSubTabs&&(e(w).find(".yyt-sub-nav").show(),vn(We,l.subTabs)),G("\u5F39\u7A97\u5DF2\u6253\u5F00")}function ct(){let e=I.jQuery||window.jQuery;if(!e){xn("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(ct,1e3);return}let t=I.document||document,s=e("#extensionsMenu",t);if(!s.length){G("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(ct,2e3);return}if(e(`#${Ys}`,s).length>0){G("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let n=e(`<div class="extension_container interactable" id="${Ys}" tabindex="0"></div>`),r=`
    <div class="list-group-item flex-container flexGap5 interactable" id="${it}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
      <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
      <span>YouYou \u5DE5\u5177\u7BB1</span>
    </div>
  `,i=e(r);i.on("click",async function(l){l.stopPropagation(),G("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let c=e("#extensionsMenuButton",t);c.length&&s.is(":visible")&&c.trigger("click"),Tn()}),n.append(i),s.append(n),G("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}var Fs={version:Hs,id:U,init:En,openPopup:Tn,closePopup:Wt,switchMainTab:bn,switchSubTab:hn,addMenuItem:ct,getStorage:()=>Ht,getApiConnection:()=>de,getPresetManager:()=>at,getUiComponents:()=>N,getRegexExtractor:()=>fn,getToolManager:()=>Qt,getToolExecutor:()=>gn,getToolTrigger:()=>mn,getWindowManager:()=>lt,getToolRegistry:()=>Q,getPromptEditor:()=>F,async getApiConfig(){return await He(),Ht?Ht.loadSettings().apiConfig:null},async saveApiConfig(e){return await He(),de?(de.updateApiConfig(e),!0):!1},async getPresets(){return await He(),at?at.getAllPresets():[]},async sendApiRequest(e,t){if(await He(),de)return de.sendApiRequest(e,t);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await He(),de?de.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(e,t){return Q?.registerTool(e,t)||!1},unregisterTool(e){return Q?.unregisterTool(e)||!1},getToolList(){return Q?.getToolList()||[]},createWindow(e){return lt?.createWindow(e)||null},closeWindow(e){lt?.closeWindow(e)}};async function En(){if(G(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${Hs}`),await Wr(),await He()){G("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F");let s=I.document||document;if(N){let o=`${U}-ui-styles`;if(!s.getElementById(o)){let i=s.createElement("style");i.id=o,i.textContent=N.getStyles(),(s.head||s.documentElement).appendChild(i)}let n=`${U}-regex-styles`;if(!s.getElementById(n)&&N.getRegexStyles){let i=s.createElement("style");i.id=n,i.textContent=N.getRegexStyles(),(s.head||s.documentElement).appendChild(i)}let r=`${U}-tool-styles`;if(!s.getElementById(r)&&N.getToolStyles){let i=s.createElement("style");i.id=r,i.textContent=N.getToolStyles(),(s.head||s.documentElement).appendChild(i)}}if(lt){let o=`${U}-window-styles`;s.getElementById(o)}if(F&&F.getPromptEditorStyles){let o=`${U}-prompt-styles`;if(!s.getElementById(o)){let n=s.createElement("style");n.id=o,n.textContent=F.getPromptEditorStyles(),(s.head||s.documentElement).appendChild(n)}}}else G("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let t=I.document||document;t.readyState==="loading"?t.addEventListener("DOMContentLoaded",()=>{setTimeout(ct,1e3)}):setTimeout(ct,1e3),G("\u521D\u59CB\u5316\u5B8C\u6210")}if(typeof window<"u"&&(window.YouYouToolkit=Fs,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=Fs}catch{}var ma=Fs;En();G("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210");export{ma as default};
