var Cr=Object.defineProperty;var E=(e,t)=>()=>(e&&(t=e(e=0)),t);var O=(e,t)=>{for(var s in t)Cr(e,s,{get:t[s],enumerable:!0})};function Go(){let e=u;return e._getStorage(),e._storage}function $(){return u.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function H(e){u.set("settings",e)}var pt,u,C,Yo,se,et=E(()=>{pt=class e{constructor(t="youyou_toolkit"){this.namespace=t,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let t=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(t.SillyTavern?.getContext){let s=t.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespace]||(s.extensionSettings[this.namespace]={}),this._storage={_target:s.extensionSettings[this.namespace],getItem:o=>{let n=s.extensionSettings[this.namespace][o];return typeof n=="string"?n:n?JSON.stringify(n):null},setItem:(o,n)=>{s.extensionSettings[this.namespace][o]=n,this._saveSettings(s)},removeItem:o=>{delete s.extensionSettings[this.namespace][o],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespace}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:t=>{try{return localStorage.getItem(t)}catch{return null}},setItem:(t,s)=>{try{localStorage.setItem(t,s)}catch(o){console.error(`[${this.namespace}] localStorage\u5199\u5165\u5931\u8D25:`,o)}},removeItem:t=>{try{localStorage.removeItem(t)}catch{}},_isTavern:!1},this._storage}_saveSettings(t){if(typeof t.saveSettings=="function")try{t.saveSettings()}catch{}else if(typeof t.saveSettingsDebounced=="function")try{t.saveSettingsDebounced()}catch{}}get(t,s=null){let o=`${this.namespace}:${t}`;if(this._cache.has(o))return this._cache.get(o);let n=this._getStorage(),r=this._getFullKey(t),i=n.getItem(r);if(i===null)return s;try{let a=JSON.parse(i);return this._cache.set(o,a),a}catch{return i}}set(t,s){let o=this._getStorage(),n=this._getFullKey(t),r=`${this.namespace}:${t}`;this._cache.set(r,s);try{o.setItem(n,JSON.stringify(s))}catch(i){console.error(`[${this.namespace}] \u5B58\u50A8\u5931\u8D25:`,i)}}remove(t){let s=this._getStorage(),o=this._getFullKey(t),n=`${this.namespace}:${t}`;this._cache.delete(n),s.removeItem(o)}has(t){let s=this._getStorage(),o=this._getFullKey(t);return s.getItem(o)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let o=s.SillyTavern.getContext();o?.extensionSettings?.[this.namespace]&&(o.extensionSettings[this.namespace]={},this._saveSettings(o))}}else{let s=`${this.namespace}_`,o=[];for(let n=0;n<localStorage.length;n++){let r=localStorage.key(n);r&&r.startsWith(s)&&o.push(r)}o.forEach(n=>localStorage.removeItem(n))}this._cache.clear()}_getFullKey(t){return this._getStorage()._isTavern?t:`${this.namespace}_${t}`}namespace(t){return new e(`${this.namespace}:${t}`)}getMultiple(t){let s={};return t.forEach(o=>{s[o]=this.get(o)}),s}setMultiple(t){Object.entries(t).forEach(([s,o])=>{this.set(s,o)})}exportAll(){let t=this._getStorage(),s={};if(t._isTavern){let o=typeof window.parent<"u"?window.parent:window;if(o.SillyTavern?.getContext){let r=o.SillyTavern.getContext()?.extensionSettings?.[this.namespace]||{};Object.entries(r).forEach(([i,a])=>{s[i]=typeof a=="string"?JSON.parse(a):a})}}else{let o=`${this.namespace}_`;for(let n=0;n<localStorage.length;n++){let r=localStorage.key(n);if(r&&r.startsWith(o)){let i=r.slice(o.length);try{s[i]=JSON.parse(localStorage.getItem(r))}catch{s[i]=localStorage.getItem(r)}}}}return s}},u=new pt("youyou_toolkit"),C=new pt("youyou_toolkit:tools"),Yo=new pt("youyou_toolkit:presets"),se=new pt("youyou_toolkit:windows")});var Ho={};O(Ho,{DEFAULT_API_PRESETS:()=>$r,DEFAULT_SETTINGS:()=>Pr,STORAGE_KEYS:()=>oe,StorageService:()=>pt,deepMerge:()=>Fo,getCurrentPresetName:()=>Ot,getStorage:()=>Go,loadApiPresets:()=>U,loadSettings:()=>$,presetStorage:()=>Yo,saveApiPresets:()=>st,saveSettings:()=>H,setCurrentPresetName:()=>Lt,storage:()=>u,toolStorage:()=>C,windowStorage:()=>se});function U(){return u.get(oe.API_PRESETS)||[]}function st(e){u.set(oe.API_PRESETS,e)}function Ot(){return u.get(oe.CURRENT_PRESET)||""}function Lt(e){u.set(oe.CURRENT_PRESET,e||"")}function Fo(e,t){let s=n=>n&&typeof n=="object"&&!Array.isArray(n),o={...e};return s(e)&&s(t)&&Object.keys(t).forEach(n=>{s(t[n])?n in e?o[n]=Fo(e[n],t[n]):Object.assign(o,{[n]:t[n]}):Object.assign(o,{[n]:t[n]})}),o}var oe,Pr,$r,ne=E(()=>{et();et();oe={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},Pr={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},$r=[]});var Qo={};O(Qo,{API_STATUS:()=>Ar,fetchAvailableModels:()=>$s,getApiConfig:()=>St,getEffectiveApiConfig:()=>Wo,sendApiRequest:()=>Ps,sendWithPreset:()=>kr,testApiConnection:()=>Mr,updateApiConfig:()=>_t,validateApiConfig:()=>ke});function St(){return $().apiConfig||{}}function _t(e){let t=$();t.apiConfig={...t.apiConfig,...e},H(t)}function ke(e){let t=[];if(e.useMainApi)return{valid:!0,errors:[]};if(!e.url||!e.url.trim())t.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(e.url)}catch{t.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!e.model||!e.model.trim())&&t.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:t.length===0,errors:t}}function Wo(e=""){let t=$();if(e){let o=(t.apiPresets||[]).find(n=>n.name===e);if(o&&o.apiConfig)return{...o.apiConfig,presetName:o.name}}return t.apiConfig||{}}async function kr(e,t,s={},o=null){let n=Wo(e);return await Ps(t,{...s,apiConfig:n},o)}function Rr(e,t={}){let s=t.apiConfig||St();return{messages:e,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:!1,...t.extraParams}}async function Ps(e,t={},s=null){let o=t.apiConfig||St(),n=o.useMainApi,r=ke(o);if(!r.valid&&!n)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${r.errors.join(", ")}`);return n?await Ir(e,t,s):await Dr(e,o,t,s)}async function Ir(e,t,s){let o=typeof window.parent<"u"?window.parent:window;if(!o.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let n=await o.TavernHelper.generateRaw({ordered_prompts:e,should_stream:!1,...t.extraParams});if(typeof n!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return n.trim()}catch(n){throw n.name==="AbortError"?n:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${n.message}`)}}async function Dr(e,t,s,o){let n=Rr(e,{apiConfig:t,...s}),r={"Content-Type":"application/json"};t.apiKey&&(r.Authorization=`Bearer ${t.apiKey}`);let i=await fetch(t.url,{method:"POST",headers:r,body:JSON.stringify(n),signal:o});if(!i.ok){let y=await i.text().catch(()=>"Unknown error");throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${y}`)}let a=await i.json(),c="";if(a.choices&&a.choices[0]?.message?.content)c=a.choices[0].message.content;else if(a.content)c=a.content;else if(a.text)c=a.text;else if(a.response)c=a.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(a).slice(0,200)}`);return c.trim()}async function Mr(e=null){let t=e||St(),s=Date.now();try{await Ps([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:t});let n=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${n}ms)`,latency:n}}catch(o){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${o.message}`,latency:Date.now()-s}}}async function $s(e=null){let t=e||St();return t.useMainApi?await Or():await Lr(t)}async function Or(){let e=typeof window.parent<"u"?window.parent:window;try{if(e.SillyTavern?.getContext){let t=e.SillyTavern.getContext();if(t.settings?.api_server)return[t.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function Lr(e){if(!e.url||!e.apiKey)return[];try{let s=`${e.url.replace(/\/chat\/completions$/,"").replace(/\/completions$/,"")}/models`,o=await fetch(s,{method:"GET",headers:{Authorization:`Bearer ${e.apiKey}`}});if(!o.ok)return[];let n=await o.json();return n.data&&Array.isArray(n.data)?n.data.map(r=>r.id||r.name).filter(Boolean).sort():[]}catch{return[]}}var Ar,As=E(()=>{ne();Ar={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var qo={};O(qo,{createPreset:()=>Re,createPresetFromCurrentConfig:()=>Br,deletePreset:()=>De,duplicatePreset:()=>zr,exportPresets:()=>Ds,generateUniquePresetName:()=>Os,getActiveConfig:()=>Is,getActivePresetName:()=>Me,getAllPresets:()=>ut,getPreset:()=>gt,getPresetNames:()=>Nr,getStarredPresets:()=>Rs,importPresets:()=>Ms,presetExists:()=>re,renamePreset:()=>jr,switchToPreset:()=>Ur,togglePresetStar:()=>ks,updatePreset:()=>Ie,validatePreset:()=>Yr});function ut(){return U()}function Nr(){return U().map(t=>t.name)}function gt(e){return!e||typeof e!="string"?null:U().find(s=>s.name===e)||null}function re(e){return!e||typeof e!="string"?!1:U().some(s=>s.name===e)}function Re(e){let{name:t,description:s,apiConfig:o}=e;if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let n=t.trim();if(re(n))return{success:!1,message:`\u9884\u8BBE "${n}" \u5DF2\u5B58\u5728`};let r={name:n,description:s||"",apiConfig:{url:o?.url||"",apiKey:o?.apiKey||"",model:o?.model||"",useMainApi:o?.useMainApi??!0,max_tokens:o?.max_tokens||4096,temperature:o?.temperature??.7,top_p:o?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},i=U();return i.push(r),st(i),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:r}}function Ie(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=U(),o=s.findIndex(i=>i.name===e);if(o===-1)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(t.name&&t.name!==e)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let n=s[o],r={...n,...t,name:n.name,updatedAt:Date.now()};return t.apiConfig&&(r.apiConfig={...n.apiConfig,...t.apiConfig}),s[o]=r,st(s),{success:!0,message:`\u9884\u8BBE "${e}" \u66F4\u65B0\u6210\u529F`,preset:r}}function De(e){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=U(),s=t.findIndex(o=>o.name===e);return s===-1?{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}:(t.splice(s,1),st(t),Ot()===e&&Lt(""),{success:!0,message:`\u9884\u8BBE "${e}" \u5DF2\u5220\u9664`})}function jr(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=t.trim();if(!re(e))return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(re(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o=U(),n=o.find(r=>r.name===e);return n&&(n.name=s,n.updatedAt=Date.now(),st(o),Ot()===e&&Lt(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function zr(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=t.trim(),o=gt(e);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(re(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(o)),name:s,createdAt:Date.now(),updatedAt:Date.now()},r=U();return r.push(n),st(r),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:n}}function ks(e){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=U(),s=t.find(o=>o.name===e);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),st(t),{success:!0,message:s.starred?`\u5DF2\u5C06 "${e}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${e}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}}function Rs(){return U().filter(t=>t.starred===!0)}function Ur(e){if(!e)return Lt(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let t=gt(e);return t?(Lt(e),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${e}"`,apiConfig:t.apiConfig}):{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}}function Me(){return Ot()}function Is(){let e=Ot();if(e){let s=gt(e);if(s)return{presetName:e,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:$().apiConfig||{}}}function Ds(e=null){if(e){let s=gt(e);if(!s)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let t=U();return JSON.stringify(t,null,2)}function Ms(e,t={overwrite:!1}){let s;try{s=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let o=Array.isArray(s)?s:[s];if(o.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let n=U(),r=0;for(let i of o){if(!i.name||typeof i.name!="string"||!i.apiConfig||typeof i.apiConfig!="object")continue;let a=n.findIndex(c=>c.name===i.name);a>=0?t.overwrite&&(i.updatedAt=Date.now(),n[a]=i,r++):(i.createdAt=i.createdAt||Date.now(),i.updatedAt=Date.now(),n.push(i),r++)}return r>0&&st(n),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${r} \u4E2A\u9884\u8BBE`,imported:r}}function Br(e,t=""){let s=$();return Re({name:e,description:t,apiConfig:s.apiConfig})}function Yr(e){let t=[];return(!e.name||typeof e.name!="string"||!e.name.trim())&&t.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!e.apiConfig||typeof e.apiConfig!="object")&&t.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:t.length===0,errors:t}}function Os(e){(!e||typeof e!="string")&&(e="\u65B0\u9884\u8BBE");let t=U(),s=new Set(t.map(n=>n.name));if(!s.has(e))return e;let o=1;for(;s.has(`${e} (${o})`);)o++;return`${e} (${o})`}var ie=E(()=>{ne()});var g,Ls,f,L=E(()=>{g={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",TOOL_TRIGGER_INITIALIZED:"tool:triggerInitialized",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",TRIGGER_REGISTERED:"trigger:registered",TRIGGER_UNREGISTERED:"trigger:unregistered",TRIGGER_FIRED:"trigger:fired",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_EXECUTION_REQUESTED:"tool:executionRequested",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},Ls=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(t,s,o={}){if(!t||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:n=0}=o;this.listeners.has(t)||this.listeners.set(t,new Set);let r={callback:s,priority:n};return this.listeners.get(t).add(r),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${t}`),()=>this.off(t,s)}off(t,s){let o=this.listeners.get(t);if(o){for(let n of o)if(n.callback===s){o.delete(n);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${t}`)}}emit(t,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${t}`,s),this._addToHistory(t,s);let o=this.listeners.get(t);if(!o||o.size===0)return;let n=Array.from(o).sort((r,i)=>i.priority-r.priority);for(let{callback:r}of n)try{r(s)}catch(i){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${t}):`,i)}}once(t,s){let o=n=>{this.off(t,o),s(n)};return this.on(t,o)}wait(t,s=0){return new Promise((o,n)=>{let r=null,i=this.once(t,a=>{r&&clearTimeout(r),o(a)});s>0&&(r=setTimeout(()=>{i(),n(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${t}`))},s))})}hasListeners(t){let s=this.listeners.get(t);return s&&s.size>0}listenerCount(t){let s=this.listeners.get(t);return s?s.size:0}removeAllListeners(t){t?this.listeners.delete(t):this.listeners.clear()}setDebugMode(t){this.debugMode=t}_addToHistory(t,s){this.history.push({event:t,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(t){return t?this.history.filter(s=>s.event===t):[...this.history]}clearHistory(){this.history=[]}},f=new Ls});function m(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function d(e,t,s=3e3){t||(t=e==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let o=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(o.toastr){o.toastr[e](t,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}Gr(e,t,s),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${e.toUpperCase()}] ${t}`)}function Gr(e,t,s){let o=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!o)return;let n=o.getElementById("yyt-fallback-toast");n&&n.remove();let r={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},i=r[e]||r.info,a=o.createElement("div");if(a.id="yyt-fallback-toast",a.style.cssText=`
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
  `,a.textContent=t,!o.getElementById("yyt-toast-styles")){let c=o.createElement("style");c.id="yyt-toast-styles",c.textContent=`
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `,o.head.appendChild(c)}o.body.appendChild(a),setTimeout(()=>{a.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{a.remove()},300)},s)}function w(){if(Nt)return Nt;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Nt=window.parent.jQuery,Nt}catch{}return window.jQuery&&(Nt=window.jQuery),Nt}function S(e){return e&&e.length>0}function Ct(e,t=l){if(!w()||!S(e))return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let o=e.find(`#${t}-model`).val()?.trim()||"",n=e.find(`#${t}-model-select`);return n.is(":visible")&&(o=n.val()||o),{url:e.find(`#${t}-api-url`).val()?.trim()||"",apiKey:e.find(`#${t}-api-key`).val()||"",model:o,useMainApi:e.find(`#${t}-use-main-api`).is(":checked"),max_tokens:parseInt(e.find(`#${t}-max-tokens`).val())||4096,temperature:parseFloat(e.find(`#${t}-temperature`).val())??.7,top_p:parseFloat(e.find(`#${t}-top-p`).val())??.9}}function jt(e,t,s=l){if(!w()||!S(e)||!t)return;e.find(`#${s}-api-url`).val(t.url||""),e.find(`#${s}-api-key`).val(t.apiKey||""),e.find(`#${s}-model`).val(t.model||""),e.find(`#${s}-max-tokens`).val(t.max_tokens||4096),e.find(`#${s}-temperature`).val(t.temperature??.7),e.find(`#${s}-top-p`).val(t.top_p??.9);let n=t.useMainApi??!0;e.find(`#${s}-use-main-api`).prop("checked",n);let i=e.find(`#${s}-custom-api-fields`);n?i.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):i.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),e.find(`#${s}-model`).show(),e.find(`#${s}-model-select`).hide()}function ft(e,t){let s=new Blob([e],{type:"application/json"}),o=URL.createObjectURL(s),n=document.createElement("a");n.href=o,n.download=t,n.click(),URL.revokeObjectURL(o)}function mt(e){return new Promise((t,s)=>{let o=new FileReader;o.onload=n=>t(n.target.result),o.onerror=n=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),o.readAsText(e)})}var l,Nt,K=E(()=>{l="youyou_toolkit";Nt=null});var Oe,W,Ns=E(()=>{L();K();Oe=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(t={}){this.initialized||(this.dependencies=t.services||{},this._subscribeEvents(),this.initialized=!0,f.emit(g.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(t,s){return!t||!s?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(t,{id:t,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(t){this.destroyInstance(t),this.components.delete(t)}getComponent(t){return this.components.get(t)}render(t,s,o={}){let n=w();if(!n){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let r=this.components.get(t);if(!r){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${t}`);return}let i;if(typeof s=="string"?i=n(s):s&&s.jquery?i=s:s&&(i=n(s)),!S(i)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}this.destroyInstance(t);let a=r.render({...o,dependencies:this.dependencies});i.html(a),r.bindEvents(i,this.dependencies),this.activeInstances.set(t,{container:i,component:r,props:o}),f.emit(g.UI_RENDER_REQUESTED,{componentId:t})}destroyInstance(t){let s=this.activeInstances.get(t);s&&(s.component.destroy(s.container),this.activeInstances.delete(t))}switchTab(t){let s=this.currentTab;this.currentTab=t,f.emit(g.UI_TAB_CHANGED,{tabId:t,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(t,s){this.currentSubTab[t]=s,f.emit(g.UI_SUBTAB_CHANGED,{mainTab:t,subTab:s})}getCurrentSubTab(t){return this.currentSubTab[t]||""}getAllStyles(){let t="";return this.components.forEach((s,o)=>{s.getStyles&&(t+=s.getStyles())}),t}injectStyles(){let t="yyt-component-styles";if(document.getElementById(t))return;let s=document.createElement("style");s.id=t,s.textContent=this.getAllStyles(),document.head.appendChild(s)}setDependency(t,s){this.dependencies[t]=s}getDependency(t){return this.dependencies[t]}_subscribeEvents(){f.on(g.PRESET_UPDATED,()=>{}),f.on(g.TOOL_UPDATED,()=>{})}},W=new Oe});var ot,nt,js=E(()=>{L();K();As();ie();ot="",nt={id:"apiPresetPanel",render(e){let t=St(),s=Is(),o=Me(),n=ut(),a=Rs().slice(0,8),c=a.length>0?a.map(h=>this._renderPresetItem(h)).join(""):"",y=ot||o||"",p=y||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
              <div class="yyt-custom-select" id="${l}-preset-dropdown">
                <div class="yyt-select-trigger">
                  <span class="yyt-select-value" data-value="${m(y)}">${m(p)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${y?"":"yyt-selected"}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                  </div>
                  ${n.length>0?n.map(h=>this._renderSelectOption(h,y)).join(""):""}
                </div>
              </div>
              <button class="yyt-btn yyt-btn-secondary" id="${l}-load-preset" title="\u52A0\u8F7D\u9009\u4E2D\u9884\u8BBE">
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
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${l}-save-as-preset" style="margin-left: auto;">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
              </button>
            </div>
            
            ${this._renderApiConfigForm(t)}
          </div>
          
          <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
          <div class="yyt-panel-footer">
            <div class="yyt-footer-left">
              <button class="yyt-btn yyt-btn-secondary" id="${l}-import-presets">
                <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
              </button>
              <button class="yyt-btn yyt-btn-secondary" id="${l}-export-presets">
                <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
              </button>
              <input type="file" id="${l}-import-file" accept=".json" style="display:none">
            </div>
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-secondary" id="${l}-reset-api-config">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
              </button>
              <button class="yyt-btn yyt-btn-primary" id="${l}-save-api-config">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>
        </div>
      </div>
    `},_renderPresetItem(e){return`
      <div class="yyt-preset-item" data-preset-name="${m(e.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${m(e.name)}</div>
          <div class="yyt-preset-meta">
            ${e.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${m(e.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
      <div class="yyt-select-option ${e.name===t?"yyt-selected":""}" data-value="${m(e.name)}">
        <button class="${o}" data-preset="${m(e.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${n}</button>
        <span class="yyt-option-text">${m(e.name)}</span>
      </div>
    `},_renderApiConfigForm(e){return`
      <div class="yyt-form-group">
        <div class="yyt-toggle-row">
          <div class="yyt-toggle-label">
            <span>\u4F7F\u7528SillyTavern\u4E3BAPI</span>
            <span class="yyt-toggle-hint">\u542F\u7528\u540E\u5C06\u4F7F\u7528SillyTavern\u5185\u7F6E\u7684API\u914D\u7F6E</span>
          </div>
          <label class="yyt-toggle">
            <input type="checkbox" id="${l}-use-main-api" ${e.useMainApi?"checked":""}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div id="${l}-custom-api-fields" class="${e.useMainApi?"yyt-disabled":""}">
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API URL</label>
            <input type="text" class="yyt-input" id="${l}-api-url" 
                   value="${m(e.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${l}-api-key" 
                     value="${m(e.apiKey||"")}" 
                     placeholder="sk-...">
              <button class="yyt-btn yyt-btn-icon" id="${l}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>\u6A21\u578B</label>
            <div class="yyt-model-row">
              <input type="text" class="yyt-input yyt-model-input" id="${l}-model" 
                     value="${m(e.model||"")}" 
                     placeholder="gpt-4">
              <select class="yyt-select yyt-model-select" id="${l}-model-select" style="display: none;">
              </select>
              <button class="yyt-btn yyt-btn-secondary yyt-model-btn" id="${l}-load-models" title="\u83B7\u53D6\u6A21\u578B\u5217\u8868">
                <i class="fa-solid fa-sync-alt"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row yyt-form-row-2col">
          <div class="yyt-form-group">
            <label>Max Tokens</label>
            <input type="number" class="yyt-input" id="${l}-max-tokens" 
                   value="${e.max_tokens||4096}" min="1" max="128000">
          </div>
          
          <div class="yyt-form-group">
            <label>Temperature</label>
            <input type="number" class="yyt-input" id="${l}-temperature" 
                   value="${e.temperature??.7}" min="0" max="2" step="0.1">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>Top P</label>
            <input type="number" class="yyt-input" id="${l}-top-p" 
                   value="${e.top_p??.9}" min="0" max="1" step="0.1">
          </div>
        </div>
      </div>
    `},bindEvents(e,t){let s=w();!s||!S(e)||(this._bindDropdownEvents(e,s),this._bindPresetListEvents(e,s),this._bindApiConfigEvents(e,s),this._bindFileEvents(e,s))},_bindDropdownEvents(e,t){let s=e.find(`#${l}-preset-dropdown`),o=s.find(".yyt-select-trigger"),n=s.find(".yyt-select-value");o.on("click",function(r){r.stopPropagation(),s.toggleClass("yyt-open")}),s.find(".yyt-select-option").on("click",r=>{if(t(r.target).hasClass("yyt-option-star"))return;let i=t(r.currentTarget),a=i.data("value"),c=i.find(".yyt-option-text").text();if(n.text(c).data("value",a),s.find(".yyt-select-option").removeClass("yyt-selected"),i.addClass("yyt-selected"),s.removeClass("yyt-open"),a){let y=gt(a);y&&jt(e,y.apiConfig,l)}}),s.find(".yyt-option-star").on("click",r=>{r.preventDefault(),r.stopPropagation();let i=t(r.currentTarget).data("preset");if(!i)return;let a=ks(i);if(a.success){d("success",a.message);let c=e.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}else d("error",a.message)}),t(document).on("click.yyt-dropdown",r=>{t(r.target).closest(s).length||s.removeClass("yyt-open")})},_bindPresetListEvents(e,t){e.find(".yyt-preset-item").on("click",s=>{let o=t(s.currentTarget),n=o.data("preset-name"),r=t(s.target).closest("[data-action]").data("action");if(r)switch(s.stopPropagation(),r){case"load":let i=gt(n);i&&(jt(e,i.apiConfig,l),ot=n,e.find(".yyt-preset-item").removeClass("yyt-loaded"),o.addClass("yyt-loaded"),d("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${n}"\uFF0C\u4FEE\u6539\u540E\u53EF\u70B9\u51FB"\u4FDD\u5B58\u914D\u7F6E"\u8986\u76D6\u6B64\u9884\u8BBE`));break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${n}" \u5417\uFF1F`)){let a=De(n);if(d(a.success?"info":"error",a.message),a.success){ot===n&&(ot="");let c=e.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}}break}})},_bindApiConfigEvents(e,t){e.find(`#${l}-use-main-api`).on("change",function(){let s=t(this).is(":checked"),o=e.find(`#${l}-custom-api-fields`);s?o.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):o.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),e.find(`#${l}-toggle-key-visibility`).on("click",function(){let s=e.find(`#${l}-api-key`),o=s.attr("type");s.attr("type",o==="password"?"text":"password"),t(this).find("i").toggleClass("fa-eye fa-eye-slash")}),e.find(`#${l}-load-models`).on("click",async()=>{let s=e.find(`#${l}-load-models`),o=e.find(`#${l}-model`),n=e.find(`#${l}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let r=Ct(e,l),i=await $s(r);if(i.length>0){n.empty(),i.forEach(c=>{n.append(`<option value="${m(c)}">${m(c)}</option>`)}),o.hide(),n.show();let a=o.val();a&&i.includes(a)&&n.val(a),n.off("change").on("change",function(){o.val(t(this).val())}),d("success",`\u5DF2\u52A0\u8F7D ${i.length} \u4E2A\u6A21\u578B`)}else d("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(r){d("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${r.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),e.find(`#${l}-model`).on("focus",function(){let s=e.find(`#${l}-model-select`);t(this).show(),s.hide()}),e.find(`#${l}-save-api-config`).on("click",()=>{let s=Ct(e,l),o=ke(s);if(!o.valid&&!s.useMainApi){d("error",o.errors.join(", "));return}if(ot){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${ot}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E`)){_t(s),d("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58");return}_t(s);let r=Ie(ot,{apiConfig:s});if(r.success){d("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${ot}"`),f.emit(g.PRESET_UPDATED,{name:ot});let i=e.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}else d("error",r.message);return}let n=Me();if(n){_t(s),Ie(n,{apiConfig:s}),d("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58");return}_t(s),d("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),e.find(`#${l}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){_t({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9});let s=e.closest(".yyt-api-manager").parent();s.length&&this.renderTo(s),d("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),e.find(`#${l}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(e,t)})},_bindFileEvents(e,t){e.find(`#${l}-export-presets`).on("click",()=>{try{let s=Ds();ft(s,`youyou_toolkit_presets_${Date.now()}.json`),d("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){d("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),e.find(`#${l}-import-presets`).on("click",()=>{e.find(`#${l}-import-file`).click()}),e.find(`#${l}-import-file`).on("change",async s=>{let o=s.target.files[0];if(o){try{let n=await mt(o),r=Ms(n,{overwrite:!0});if(d(r.success?"success":"error",r.message),r.imported>0){let i=e.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}}catch(n){d("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}t(s.target).val("")}})},_showSavePresetDialog(e,t){let o=ut().map(p=>p.name),n=Os("\u65B0\u9884\u8BBE"),r=`
      <div class="yyt-dialog-overlay" id="${l}-dialog-overlay">
        <div class="yyt-dialog">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">\u4FDD\u5B58\u4E3A\u65B0\u9884\u8BBE</span>
            <button class="yyt-dialog-close" id="${l}-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-group">
              <label>\u9884\u8BBE\u540D\u79F0</label>
              <input type="text" class="yyt-input" id="${l}-dialog-preset-name" 
                     value="${m(n)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09</label>
              <textarea class="yyt-textarea" id="${l}-dialog-preset-desc" rows="2" 
                        placeholder="\u9884\u8BBE\u63CF\u8FF0..."></textarea>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${l}-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="${l}-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;t(`#${l}-dialog-overlay`).remove(),e.append(r);let i=t(`#${l}-dialog-overlay`),a=t(`#${l}-dialog-preset-name`),c=t(`#${l}-dialog-preset-desc`);a.focus().select();let y=()=>i.remove();i.find(`#${l}-dialog-close, #${l}-dialog-cancel`).on("click",y),i.on("click",function(p){p.target===this&&y()}),i.find(`#${l}-dialog-save`).on("click",()=>{let p=a.val().trim(),h=c.val().trim();if(!p){d("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),a.focus();return}if(o.includes(p)){if(!confirm(`\u9884\u8BBE "${p}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;De(p)}let D=Ct(e,l),b=Re({name:p,description:h,apiConfig:D});if(b.success){d("success",b.message),y(),f.emit(g.PRESET_CREATED,{preset:b.preset});let z=e.closest(".yyt-api-manager").parent();z.length&&this.renderTo(z)}else d("error",b.message)}),a.on("keypress",function(p){p.which===13&&i.find(`#${l}-dialog-save`).click()})},destroy(e){let t=w();!t||!S(e)||(e.find("*").off(),t(document).off("click.yyt-dropdown"))},getStyles(){return`
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
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}}});var an={};O(an,{MESSAGE_MACROS:()=>rn,addTagRule:()=>zt,createRuleTemplate:()=>tn,default:()=>Hr,deleteRulePreset:()=>on,deleteRuleTemplate:()=>sn,deleteTagRule:()=>ae,escapeRegex:()=>Pt,exportRulesConfig:()=>Fe,extractComplexTag:()=>Vo,extractCurlyBraceTag:()=>Ys,extractHtmlFormatTag:()=>Ko,extractSimpleTag:()=>Bs,extractTagContent:()=>Ne,generateTagSuggestions:()=>ze,getAllRulePresets:()=>Ye,getAllRuleTemplates:()=>Xo,getContentBlacklist:()=>le,getRuleTemplate:()=>Zo,getTagRules:()=>$t,importRulesConfig:()=>He,isValidTagName:()=>Us,loadRulePreset:()=>Ge,saveRulesAsPreset:()=>Be,scanTextForTags:()=>je,setContentBlacklist:()=>ce,setTagRules:()=>Ue,shouldSkipContent:()=>zs,testRegex:()=>nn,updateRuleTemplate:()=>en,updateTagRule:()=>Ut});function Le(){let e=$();return B=e.ruleTemplates||[...Jo],A=e.tagRules||[],Q=e.contentBlacklist||[],{ruleTemplates:B,tagRules:A,contentBlacklist:Q}}function Pt(e){return typeof e!="string"?"":e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function zs(e,t){if(!t||t.length===0||!e||typeof e!="string")return!1;let s=e.toLowerCase();return t.some(o=>{let n=o.trim().toLowerCase();return n&&s.includes(n)})}function Us(e){return!e||typeof e!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(e)&&!Fr.includes(e.toLowerCase())}function Bs(e,t){if(!e||!t)return[];let s=[],o=Pt(t),n=new RegExp(`<${o}>([\\s\\S]*?)<\\/${o}>`,"gi");[...e.matchAll(n)].forEach(c=>{c[1]&&s.push(c[1].trim())});let i=(e.match(new RegExp(`<${o}>`,"gi"))||[]).length,a=(e.match(new RegExp(`<\\/${o}>`,"gi"))||[]).length;return i>a&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${i-a} \u4E2A\u672A\u95ED\u5408\u7684 <${t}> \u6807\u7B7E`),s}function Ys(e,t){if(!e||!t)return[];let s=[],o=Pt(t),n=new RegExp(`\\{${o}\\|`,"gi"),r;for(;(r=n.exec(e))!==null;){let i=r.index,a=i+r[0].length,c=1,y=a;for(;y<e.length&&c>0;)e[y]==="{"?c++:e[y]==="}"&&c--,y++;if(c===0){let p=e.substring(a,y-1);p.trim()&&s.push(p.trim())}n.lastIndex=i+1}return s}function Vo(e,t){if(!e||!t)return[];let s=t.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${t}`),[];let o=s[0].trim(),n=s[1].trim(),r=n.match(/<\/(\w+)>/);if(!r)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${n}`),[];let i=r[1],a=new RegExp(`${Pt(o)}([\\s\\S]*?)<\\/${i}>`,"gi"),c=[];return[...e.matchAll(a)].forEach(p=>{p[1]&&c.push(p[1].trim())}),c}function Ko(e,t){if(!e||!t)return[];let s=t.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${t}`),[];let o=s[1],n=[],r=new RegExp(`<${o}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${o}>`,"gi");[...e.matchAll(r)].forEach(y=>{y[1]&&n.push(y[1].trim())});let a=(e.match(new RegExp(`<${o}(?:\\s[^>]*)?>`,"gi"))||[]).length,c=(e.match(new RegExp(`<\\/${o}>`,"gi"))||[]).length;return a>c&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${a-c} \u4E2A\u672A\u95ED\u5408\u7684 <${o}> \u6807\u7B7E`),n}function Ne(e,t,s=[]){if(!e)return"";if(!t||t.length===0)return e;let o=t.filter(p=>p.type==="exclude"&&p.enabled),n=t.filter(p=>(p.type==="include"||p.type==="regex_include")&&p.enabled),r=t.filter(p=>p.type==="regex_exclude"&&p.enabled),i=e;for(let p of o)try{let h=new RegExp(`<${Pt(p.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Pt(p.value)}>`,"gi");i=i.replace(h,"")}catch(h){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:p,error:h})}let a=[];if(n.length>0)for(let p of n){let h=[];try{if(p.type==="include")h.push(...Bs(i,p.value)),h.push(...Ys(i,p.value));else if(p.type==="regex_include"){let D=new RegExp(p.value,"gi");[...i.matchAll(D)].forEach(z=>{z[1]&&h.push(z[1])})}}catch(D){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:p,error:D})}h.forEach(D=>a.push(D.trim()))}else a.push(i);let c=[];for(let p of a){for(let h of r)try{let D=new RegExp(h.value,"gi");p=p.replace(D,"")}catch(D){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:h,error:D})}zs(p,s)||c.push(p)}return c.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function je(e,t={}){let s=performance.now(),{chunkSize:o=5e4,maxTags:n=100,timeoutMs:r=5e3}=t,i=new Set,a=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,c=0,y=0;for(let h=0;h<e.length;h+=o){let D=e.slice(h,Math.min(h+o,e.length));if(y++,c+=D.length,performance.now()-s>r){console.warn(`[YouYouToolkit] Tag scanning timed out after ${r}ms`);break}let b;for(;(b=a.exec(D))!==null&&i.size<n;){let z=(b[1]||b[2]).toLowerCase();Us(z)&&i.add(z)}if(i.size>=n)break;y%5===0&&await new Promise(z=>setTimeout(z,0))}let p=performance.now();return{tags:Array.from(i).sort(),stats:{processingTimeMs:Math.round(p-s),processedChars:c,totalChars:e.length,chunkCount:y,tagsFound:i.size}}}function ze(e,t=25){let s=e.tags.slice(0,t);return{suggestions:s,stats:{totalFound:e.stats.tagsFound,finalCount:s.length}}}function Xo(){return B.length===0&&Le(),B}function Zo(e){return B.find(t=>t.id===e)}function tn(e){let t={id:`rule-${Date.now()}`,name:e.name||"\u65B0\u89C4\u5219",description:e.description||"",type:e.type||"include",value:e.value||"",enabled:e.enabled!==!1,createdAt:new Date().toISOString()};return B.push(t),Gs(),{success:!0,template:t,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function en(e,t){let s=B.findIndex(o=>o.id===e);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(B[s]={...B[s],...t,updatedAt:new Date().toISOString()},Gs(),{success:!0,template:B[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function sn(e){let t=B.findIndex(s=>s.id===e);return t===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(B.splice(t,1),Gs(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function Gs(){let e=$();e.ruleTemplates=B,H(e)}function $t(){return A||Le(),A}function Ue(e){A=e||[];let t=$();t.tagRules=A,H(t)}function zt(e){let t={id:`tag-${Date.now()}`,type:e.type||"include",value:e.value||"",enabled:e.enabled!==!1};A.push(t);let s=$();return s.tagRules=A,H(s),{success:!0,rule:t,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function Ut(e,t){if(e<0||e>=A.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};A[e]={...A[e],...t};let s=$();return s.tagRules=A,H(s),{success:!0,rule:A[e],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function ae(e){if(e<0||e>=A.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};A.splice(e,1);let t=$();return t.tagRules=A,H(t),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function le(){return Q||Le(),Q}function ce(e){Q=e||[];let t=$();t.contentBlacklist=Q,H(t)}function Be(e,t=""){if(!e||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=$();s.tagRulePresets||(s.tagRulePresets={});let o=`preset-${Date.now()}`;return s.tagRulePresets[o]={id:o,name:e.trim(),description:t.trim(),rules:JSON.parse(JSON.stringify(A)),blacklist:JSON.parse(JSON.stringify(Q)),createdAt:new Date().toISOString()},H(s),{success:!0,preset:s.tagRulePresets[o],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function Ye(){let t=$().tagRulePresets||{};return Object.values(t)}function Ge(e){let t=$(),o=(t.tagRulePresets||{})[e];return o?(A=JSON.parse(JSON.stringify(o.rules||[])),Q=JSON.parse(JSON.stringify(o.blacklist||[])),t.tagRules=A,t.contentBlacklist=Q,H(t),{success:!0,preset:o,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function on(e){let t=$(),s=t.tagRulePresets||{};return s[e]?(delete s[e],t.tagRulePresets=s,H(t),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Fe(){return JSON.stringify({tagRules:A,contentBlacklist:Q,ruleTemplates:B,tagRulePresets:$().tagRulePresets||{}},null,2)}function He(e,t={overwrite:!0}){try{let s=JSON.parse(e);if(t.overwrite)A=s.tagRules||[],Q=s.contentBlacklist||[],B=s.ruleTemplates||Jo;else if(s.tagRules&&A.push(...s.tagRules),s.contentBlacklist){let n=new Set(Q.map(r=>r.toLowerCase()));s.contentBlacklist.forEach(r=>{n.has(r.toLowerCase())||Q.push(r)})}let o=$();return o.tagRules=A,o.contentBlacklist=Q,o.ruleTemplates=B,s.tagRulePresets&&(o.tagRulePresets={...o.tagRulePresets||{},...s.tagRulePresets}),H(o),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function nn(e,t,s="g",o=0){try{if(!e||typeof e!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let n=new RegExp(e,s),r=[];if(s.includes("g")){let i;for(;(i=n.exec(t))!==null;)i.length>1?r.push({fullMatch:i[0],groups:i.slice(1),index:i.index,extracted:i[o]||i[1]||i[0]}):r.push({fullMatch:i[0],groups:[],index:i.index,extracted:i[0]})}else{let i=n.exec(t);i&&r.push({fullMatch:i[0],groups:i.length>1?i.slice(1):[],index:i.index,extracted:i.length>1?i[o]||i[1]:i[0]})}return{success:!0,matches:r,count:r.length,extracted:r.map(i=>i.extracted)}}catch(n){return{success:!1,error:n.message,matches:[]}}}var Fr,Jo,B,A,Q,rn,Hr,Fs=E(()=>{ne();Fr=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],Jo=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],B=[],A=[],Q=[];rn={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};Le();Hr={extractTagContent:Ne,extractSimpleTag:Bs,extractCurlyBraceTag:Ys,extractComplexTag:Vo,extractHtmlFormatTag:Ko,escapeRegex:Pt,shouldSkipContent:zs,isValidTagName:Us,scanTextForTags:je,generateTagSuggestions:ze,getAllRuleTemplates:Xo,getRuleTemplate:Zo,createRuleTemplate:tn,updateRuleTemplate:en,deleteRuleTemplate:sn,getTagRules:$t,setTagRules:Ue,addTagRule:zt,updateTagRule:Ut,deleteTagRule:ae,getContentBlacklist:le,setContentBlacklist:ce,saveRulesAsPreset:Be,getAllRulePresets:Ye,loadRulePreset:Ge,deleteRulePreset:on,exportRulesConfig:Fe,importRulesConfig:He,testRegex:nn,MESSAGE_MACROS:rn}});var rt,Hs=E(()=>{L();K();Fs();rt={id:"regexExtractPanel",render(e){let t=$t(),s=le(),o=Ye();return`
      <div class="yyt-regex-panel">
        <!-- \u89C4\u5219\u7F16\u8F91\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-filter"></i>
            <span>\u6807\u7B7E\u63D0\u53D6\u89C4\u5219</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${l}-show-examples" style="margin-left: auto;">
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
            <button class="yyt-btn yyt-btn-secondary" id="${l}-import-rules">
              <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${l}-export-rules">
              <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
            </button>
            <input type="file" id="${l}-import-rules-file" accept=".json" style="display:none">
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${l}-reset-rules">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
            </button>
          </div>
        </div>
        
        <!-- \u6807\u7B7E\u626B\u63CF\u7ED3\u679C\u5BB9\u5668 -->
        <div id="${l}-tag-suggestions-container" style="display: none;">
          <div class="yyt-tag-suggestions">
            <div class="yyt-tag-suggestions-header">
              <span>\u53D1\u73B0\u7684\u6807\u7B7E:</span>
              <span id="${l}-tag-scan-stats"></span>
            </div>
            <div class="yyt-tag-list" id="${l}-tag-list"></div>
          </div>
        </div>
      </div>
    `},_renderRulesEditor(e,t,s){let o=e.length>0?e.map((r,i)=>this._renderRuleItem(r,i)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',n=s.length>0?s.map(r=>`<option value="${r.id}">${m(r.name)}</option>`).join(""):"";return`
      <div class="yyt-tag-rules-editor">
        ${n?`
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${l}-rule-preset-select">
            <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
            ${n}
          </select>
          <button class="yyt-btn yyt-btn-secondary" id="${l}-load-rule-preset">
            <i class="fa-solid fa-download"></i> \u52A0\u8F7D
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${l}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u9884\u8BBE
          </button>
        </div>
        `:`
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-secondary" id="${l}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
          </button>
        </div>
        `}
        
        <div class="yyt-rules-list">
          ${o}
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${l}-add-rule">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u89C4\u5219
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${l}-scan-tags">
            <i class="fa-solid fa-search"></i> \u626B\u63CF\u6807\u7B7E
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${l}-add-exclude-cot">
            <i class="fa-solid fa-ban"></i> \u6392\u9664\u5C0FCoT
          </button>
        </div>
        
        <!-- \u9ED1\u540D\u5355\u8BBE\u7F6E -->
        <div class="yyt-form-group">
          <label>\u5185\u5BB9\u9ED1\u540D\u5355\uFF08\u5305\u542B\u8FD9\u4E9B\u5173\u952E\u8BCD\u7684\u5185\u5BB9\u5C06\u88AB\u8FC7\u6EE4\uFF0C\u7528\u9017\u53F7\u5206\u9694\uFF09</label>
          <input type="text" class="yyt-input" id="${l}-content-blacklist" 
                 value="${m(t.join(", "))}" 
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
               value="${m(e.value||"")}">
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
          <textarea class="yyt-textarea" id="${l}-test-input" rows="6" 
                    placeholder="\u8F93\u5165\u8981\u6D4B\u8BD5\u63D0\u53D6\u7684\u6587\u672C\u5185\u5BB9..."></textarea>
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${l}-test-extract">
            <i class="fa-solid fa-play"></i> \u6D4B\u8BD5\u63D0\u53D6
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${l}-test-clear">
            <i class="fa-solid fa-eraser"></i> \u6E05\u7A7A
          </button>
        </div>
        
        <div class="yyt-form-group" id="${l}-test-result-container" style="display: none;">
          <label>\u63D0\u53D6\u7ED3\u679C</label>
          <div class="yyt-test-result" id="${l}-test-result"></div>
        </div>
      </div>
    `},bindEvents(e,t){let s=w();!s||!S(e)||(this._bindRuleEditorEvents(e,s),this._bindPresetEvents(e,s),this._bindTestEvents(e,s),this._bindFileEvents(e,s))},_bindRuleEditorEvents(e,t){e.find(".yyt-rule-type").on("change",function(){let o=t(this).closest(".yyt-rule-item").data("rule-index"),n=t(this).val();Ut(o,{type:n}),d("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),e.find(".yyt-rule-value").on("change",function(){let o=t(this).closest(".yyt-rule-item").data("rule-index"),n=t(this).val().trim();Ut(o,{value:n})}),e.find(".yyt-rule-enabled").on("change",function(){let o=t(this).closest(".yyt-rule-item").data("rule-index"),n=t(this).is(":checked");Ut(o,{enabled:n}),d("info",n?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),e.find(".yyt-rule-delete").on("click",()=>{let o=e.find(".yyt-rule-delete").closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(ae(o),this.renderTo(e),d("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),e.on("click",".yyt-rule-delete",s=>{let n=t(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(ae(n),this.renderTo(e),d("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),e.find(`#${l}-add-rule`).on("click",()=>{zt({type:"include",value:"",enabled:!0}),this.renderTo(e),d("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),e.find(`#${l}-scan-tags`).on("click",async()=>{let s=e.find(`#${l}-scan-tags`),o=e.find(`#${l}-test-input`).val();if(!o||!o.trim()){d("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let n=await je(o,{maxTags:50,timeoutMs:3e3}),{suggestions:r,stats:i}=ze(n,25);if(r.length===0){d("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),e.find(`#${l}-tag-suggestions-container`).hide();return}let a=e.find(`#${l}-tag-list`);e.find(`#${l}-tag-scan-stats`).text(`${i.finalCount}/${i.totalFound} \u4E2A\u6807\u7B7E, ${n.stats.processingTimeMs}ms`),a.empty(),r.forEach(y=>{let p=t(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${m(y)}</button>`);p.on("click",()=>{if($t().some(b=>b.type==="include"&&b.value===y)){d("warning",`\u89C4\u5219 "\u5305\u542B: ${y}" \u5DF2\u5B58\u5728`);return}zt({type:"include",value:y,enabled:!0}),this.renderTo(e),d("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${y}"`)}),a.append(p)}),e.find(`#${l}-tag-suggestions-container`).show(),d("success",`\u53D1\u73B0 ${r.length} \u4E2A\u6807\u7B7E`)}catch(n){d("error",`\u626B\u63CF\u5931\u8D25: ${n.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),e.find(`#${l}-add-exclude-cot`).on("click",()=>{let s=$t(),o="<!--[\\s\\S]*?-->";if(s.some(r=>r.type==="regex_exclude"&&r.value===o)){d("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}zt({type:"regex_exclude",value:o,enabled:!0}),this.renderTo(e),d("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),e.find(`#${l}-content-blacklist`).on("change",function(){let o=t(this).val().split(",").map(n=>n.trim()).filter(n=>n);ce(o),d("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${o.length} \u4E2A\u5173\u952E\u8BCD`)}),e.find(`#${l}-show-examples`).on("click",()=>{alert(`
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
      `)})},_bindPresetEvents(e,t){e.find(`#${l}-load-rule-preset`).on("click",()=>{let s=e.find(`#${l}-rule-preset-select`).val();if(!s){d("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let o=Ge(s);o.success?(this.renderTo(e),d("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${o.preset.name}`),f.emit(g.REGEX_PRESET_LOADED,{preset:o.preset})):d("error",o.message)}),e.find(`#${l}-save-rule-preset`).on("click",()=>{let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let o=Be(s.trim());o.success?(this.renderTo(e),d("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):d("error",o.message)})},_bindTestEvents(e,t){e.find(`#${l}-test-extract`).on("click",()=>{let s=e.find(`#${l}-test-input`).val();if(!s||!s.trim()){d("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let o=$t(),n=le(),r=Ne(s,o,n),i=e.find(`#${l}-test-result-container`),a=e.find(`#${l}-test-result`);i.show(),!r||!r.trim()?(a.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),d("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(a.html(`<pre class="yyt-code-block">${m(r)}</pre>`),d("success","\u63D0\u53D6\u5B8C\u6210"),f.emit(g.REGEX_EXTRACTED,{result:r}))}),e.find(`#${l}-test-clear`).on("click",()=>{e.find(`#${l}-test-input`).val(""),e.find(`#${l}-test-result-container`).hide()})},_bindFileEvents(e,t){e.find(`#${l}-import-rules`).on("click",()=>{e.find(`#${l}-import-rules-file`).click()}),e.find(`#${l}-import-rules-file`).on("change",async s=>{let o=s.target.files[0];if(o){try{let n=await mt(o),r=He(n,{overwrite:!0});r.success?(this.renderTo(e),d("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):d("error",r.message)}catch(n){d("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}t(s.target).val("")}}),e.find(`#${l}-export-rules`).on("click",()=>{try{let s=Fe();ft(s,`youyou_toolkit_rules_${Date.now()}.json`),d("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){d("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),e.find(`#${l}-reset-rules`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(Ue([]),ce([]),this.renderTo(e),d("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(e){!w()||!S(e)||e.find("*").off()},getStyles(){return`
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
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}}});var ln={};O(ln,{DEFAULT_TOOL_PRESETS:()=>it,DEFAULT_TOOL_STRUCTURE:()=>Ws,TOOL_STORAGE_KEYS:()=>P,cloneTool:()=>Qr,deleteTool:()=>Wr,deleteToolPreset:()=>Vr,exportTools:()=>Js,getAllToolPresets:()=>qs,getAllTools:()=>We,getCurrentToolPresetId:()=>Kr,getTool:()=>de,getToolPreset:()=>qr,importTools:()=>Vs,resetTools:()=>Ks,saveTool:()=>Qe,saveToolPreset:()=>Jr,setCurrentToolPreset:()=>Xr,setToolEnabled:()=>Qs,validateTool:()=>Zr});function We(){let e=C.get(P.TOOLS);return e&&typeof e=="object"?{...it,...e}:{...it}}function de(e){return We()[e]||null}function Qe(e,t){if(!e||!t)return!1;let s=C.get(P.TOOLS)||{},o={...Ws,...t,id:e,metadata:{...Ws.metadata,...t.metadata,updatedAt:new Date().toISOString()}};return s[e]||(o.metadata.createdAt=new Date().toISOString()),s[e]=o,C.set(P.TOOLS,s),f.emit(g.TOOL_UPDATED,{toolId:e,tool:o}),!0}function Wr(e){if(it[e])return!1;let t=C.get(P.TOOLS)||{};return t[e]?(delete t[e],C.set(P.TOOLS,t),f.emit(g.TOOL_UNREGISTERED,{toolId:e}),!0):!1}function Qs(e,t){let s=de(e);if(!s)return!1;let o=C.get(P.TOOLS)||{};return o[e]||(o[e]={...s}),o[e].enabled=t,o[e].metadata={...o[e].metadata,updatedAt:new Date().toISOString()},C.set(P.TOOLS,o),f.emit(t?g.TOOL_ENABLED:g.TOOL_DISABLED,{toolId:e}),!0}function Qr(e,t,s){let o=de(e);if(!o)return!1;let n=JSON.parse(JSON.stringify(o));return n.name=s||`${o.name} (\u526F\u672C)`,n.metadata={...n.metadata,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},Qe(t,n)}function qs(){let e=C.get(P.PRESETS);return e&&typeof e=="object"?{...it,...e}:{...it}}function qr(e){return qs()[e]||null}function Jr(e,t){if(!e||!t)return!1;let s=C.get(P.PRESETS)||{};return s[e]={...t,metadata:{...t.metadata,updatedAt:new Date().toISOString()}},C.set(P.PRESETS,s),!0}function Vr(e){if(it[e])return!1;let t=C.get(P.PRESETS)||{};return t[e]?(delete t[e],C.set(P.PRESETS,t),!0):!1}function Kr(){return C.get(P.CURRENT_PRESET)||null}function Xr(e){return qs()[e]?(C.set(P.CURRENT_PRESET,e),!0):!1}function Js(){let e=C.get(P.TOOLS)||{},t=C.get(P.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:e,presets:t},null,2)}function Vs(e,t=!1){try{let s=JSON.parse(e);if(!s||typeof s!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let o=t?{}:C.get(P.TOOLS)||{},n=t?{}:C.get(P.PRESETS)||{},r=0,i=0;if(s.tools&&typeof s.tools=="object"){for(let[a,c]of Object.entries(s.tools))it[a]&&!t||c&&typeof c=="object"&&(o[a]=c,r++);C.set(P.TOOLS,o)}if(s.presets&&typeof s.presets=="object"){for(let[a,c]of Object.entries(s.presets))it[a]&&!t||c&&typeof c=="object"&&(n[a]=c,i++);C.set(P.PRESETS,n)}return{success:!0,toolsImported:r,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${r} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function Ks(){C.remove(P.TOOLS),C.remove(P.PRESETS),C.remove(P.CURRENT_PRESET)}function Zr(e){let t=[];if(!e)return{valid:!1,errors:["\u5DE5\u5177\u5B9A\u4E49\u4E3A\u7A7A"]};if((!e.name||typeof e.name!="string")&&t.push("\u5DE5\u5177\u540D\u79F0\u65E0\u6548"),(!e.category||typeof e.category!="string")&&t.push("\u5DE5\u5177\u5206\u7C7B\u65E0\u6548"),e.config){let{trigger:s,execution:o,api:n,context:r}=e.config;s&&!["manual","event","scheduled"].includes(s.type)&&t.push("\u89E6\u53D1\u7C7B\u578B\u65E0\u6548"),o&&((typeof o.timeout!="number"||o.timeout<0)&&t.push("\u8D85\u65F6\u65F6\u95F4\u5FC5\u987B\u4E3A\u6B63\u6570"),(typeof o.retries!="number"||o.retries<0)&&t.push("\u91CD\u8BD5\u6B21\u6570\u5FC5\u987B\u4E3A\u6B63\u6570")),r&&typeof r.depth!="number"&&t.push("\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u5FC5\u987B\u4E3A\u6570\u5B57")}return{valid:t.length===0,errors:t}}var Ws,it,P,Xs=E(()=>{et();L();Ws={id:"",name:"",description:"",category:"utility",config:{trigger:{type:"manual",events:[]},execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!0,bypassPreset:"standard"},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},it={},P={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"}});var at,Zs=E(()=>{L();K();Xs();at={id:"toolManagePanel",render(e){let t=We();return`
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
            <span class="yyt-tool-name">${m(s.name)}</span>
            <span class="yyt-tool-category">${m(s.category)}</span>
          </div>
          <div class="yyt-tool-controls">
            <label class="yyt-toggle yyt-tool-toggle">
              <input type="checkbox" ${s.enabled?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="yyt-tool-desc">${m(s.description)}</div>
      </div>
    `).join("")},bindEvents(e,t){let s=w();!s||!S(e)||(this._bindToolEvents(e,s),this._bindFileEvents(e,s))},_bindToolEvents(e,t){e.find(".yyt-tool-toggle input").on("change",s=>{let o=t(s.currentTarget).closest(".yyt-tool-item"),n=o.data("tool-id"),r=t(s.currentTarget).is(":checked");Qs(n,r),o.toggleClass("yyt-enabled",r).toggleClass("yyt-disabled",!r),d("info",r?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528"),f.emit(r?g.TOOL_ENABLED:g.TOOL_DISABLED,{toolId:n})}),e.find("#yyt-add-tool").on("click",()=>{this._showToolEditDialog(e,t,null)})},_bindFileEvents(e,t){e.find("#yyt-import-tools").on("click",()=>{e.find("#yyt-import-tools-file").click()}),e.find("#yyt-import-tools-file").on("change",async s=>{let o=s.target.files[0];if(o){try{let n=await mt(o),r=Vs(n,{overwrite:!1});d(r.success?"success":"error",r.message),r.success&&this.renderTo(e)}catch(n){d("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}t(s.target).val("")}}),e.find("#yyt-export-tools").on("click",()=>{try{let s=Js();ft(s,`youyou_toolkit_tools_${Date.now()}.json`),d("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){d("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),e.find("#yyt-reset-tools").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(Ks(),this.renderTo(e),d("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(e,t,s){let o=s?de(s):null,n=!!o,r=`
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
                       value="${o?m(o.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${o?m(o.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;t("#yyt-tool-dialog-overlay").remove(),e.append(r);let i=t("#yyt-tool-dialog-overlay"),a=()=>i.remove();i.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",a),i.on("click",function(c){c.target===this&&a()}),i.find("#yyt-tool-dialog-save").on("click",()=>{let c=t("#yyt-tool-name").val().trim(),y=t("#yyt-tool-category").val(),p=t("#yyt-tool-desc").val().trim(),h=parseInt(t("#yyt-tool-timeout").val())||6e4,D=parseInt(t("#yyt-tool-retries").val())||3;if(!c){d("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let b=s||`tool_${Date.now()}`;Qe(b,{name:c,category:y,description:p,config:{trigger:{type:"manual",events:[]},execution:{timeout:h,retries:D},api:{preset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0}),a(),this.renderTo(e),d("success",n?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),f.emit(n?g.TOOL_UPDATED:g.TOOL_REGISTERED,{toolId:b})})},destroy(e){!w()||!S(e)||e.find("*").off()},getStyles(){return`
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
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}}});var En={};O(En,{TOOL_CATEGORIES:()=>cn,TOOL_REGISTRY:()=>qe,clearToolApiPreset:()=>bn,default:()=>ni,getAllDefaultToolConfigs:()=>Yt,getAllToolApiBindings:()=>hn,getAllToolFullConfigs:()=>no,getEnabledTools:()=>vn,getToolApiPreset:()=>mn,getToolConfig:()=>eo,getToolFullConfig:()=>R,getToolList:()=>pn,getToolSubTabs:()=>un,getToolWindowState:()=>Tn,hasTool:()=>so,onPresetDeleted:()=>xn,registerTool:()=>dn,resetToolConfig:()=>Bt,resetToolRegistry:()=>gn,saveToolConfig:()=>X,saveToolWindowState:()=>wn,setToolApiPreset:()=>fn,setToolApiPresetConfig:()=>ei,setToolBypassConfig:()=>si,setToolOutputMode:()=>ti,setToolPromptTemplate:()=>oi,unregisterTool:()=>yn,updateToolRuntime:()=>oo});function dn(e,t){if(!e||typeof e!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!t||typeof t!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let o of s)if(!t[o])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${o}`),!1;return lt[e]={id:e,...t,order:t.order??Object.keys(lt).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${e}`),!0}function yn(e){return lt[e]?(delete lt[e],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${e}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${e}`),!1)}function pn(e=!0){let t=Object.values(lt);return e?t.sort((s,o)=>(s.order??0)-(o.order??0)):t}function eo(e){return lt[e]||null}function so(e){return!!lt[e]}function un(e){let t=lt[e];return!t||!t.hasSubTabs?[]:t.subTabs||[]}function gn(){lt={...qe},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function fn(e,t){if(!so(e))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${e}`),!1;let s=u.get(bt)||{};return s[e]=t||"",u.set(bt,s),console.log(`[ToolRegistry] \u5DE5\u5177 "${e}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${t||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function mn(e){return(u.get(bt)||{})[e]||""}function bn(e){let t=u.get(bt)||{};delete t[e],u.set(bt,t),console.log(`[ToolRegistry] \u5DE5\u5177 "${e}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function hn(){return u.get(bt)||{}}function xn(e){let t=u.get(bt)||{},s=!1;for(let o in t)t[o]===e&&(t[o]="",s=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${o}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&u.set(bt,t)}function R(e){let t=pe[e];if(!t)return eo(e);let o=(u.get(ye)||{})[e]||{};return{...t,...o,id:e}}function X(e,t){if(!e||!pe[e])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",e),!1;let s=u.get(ye)||{},o=["promptTemplate","enabled","extractTags","trigger","output","bypass","runtime"];return s[e]={},o.forEach(n=>{t[n]!==void 0&&(s[e][n]=t[n])}),u.set(ye,s),f.emit(g.TOOL_UPDATED,{toolId:e,config:s[e]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${e}`),!0}function ti(e,t){let s=R(e);return s?X(e,{...s,output:{...s.output,mode:t}}):!1}function ei(e,t){let s=R(e);return s?X(e,{...s,output:{...s.output,apiPreset:t}}):!1}function si(e,t){let s=R(e);return s?X(e,{...s,bypass:{...s.bypass,...t}}):!1}function oi(e,t){let s=R(e);return s?X(e,{...s,promptTemplate:t}):!1}function oo(e,t){let s=R(e);return s?X(e,{...s,runtime:{...s.runtime,...t,lastRunAt:Date.now()}}):!1}function Bt(e){if(!e||!pe[e])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",e),!1;let t=u.get(ye)||{};return delete t[e],u.set(ye,t),f.emit(g.TOOL_UPDATED,{toolId:e,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${e}`),!0}function Yt(){return{...pe}}function no(){return Object.keys(pe).map(e=>R(e))}function vn(){return no().filter(e=>e&&e.enabled)}function wn(e,t){let s=u.get(to)||{};s[e]={...t,updatedAt:Date.now()},u.set(to,s)}function Tn(e){return(u.get(to)||{})[e]||null}var ye,bt,to,pe,qe,cn,lt,ni,Gt=E(()=>{et();L();ye="tool_configs",bt="tool_api_bindings",to="tool_window_states",pe={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</boo_FM>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["boo_FM"]},statusBlock:{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",description:"\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u4EE3\u7801\u5757",enabled:!0,order:4,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0B\u5BF9\u8BDD\u5185\u5BB9\u751F\u6210\u89D2\u8272\u72B6\u6001\u5757\uFF1A

\u8F93\u51FA\u683C\u5F0F\uFF1A
<status_block>
<name>\u89D2\u8272\u540D</name>
<location>\u4F4D\u7F6E</location>
<condition>\u72B6\u6001</condition>
<equipment>\u88C5\u5907</equipment>
<skills>\u6280\u80FD</skills>
</status_block>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["status_block"]}},qe={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{trigger:{type:"manual",events:[]},execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:3,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel"}]},bypass:{id:"bypass",name:"\u7834\u9650\u8BCD",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406\u7834\u9650\u8BCD\u9884\u8BBE",component:"BypassPanel",order:4},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:5}},cn={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},lt={...qe};ni={TOOL_REGISTRY:qe,TOOL_CATEGORIES:cn,registerTool:dn,unregisterTool:yn,getToolList:pn,getToolConfig:eo,hasTool:so,getToolSubTabs:un,resetToolRegistry:gn,setToolApiPreset:fn,getToolApiPreset:mn,clearToolApiPreset:bn,getAllToolApiBindings:hn,onPresetDeleted:xn,saveToolWindowState:wn,getToolWindowState:Tn,getToolFullConfig:R,saveToolConfig:X,resetToolConfig:Bt,getAllDefaultToolConfigs:Yt,getAllToolFullConfigs:no,getEnabledTools:vn}});var Sn={};O(Sn,{BypassManager:()=>Je,DEFAULT_BYPASS_PRESETS:()=>dt,addMessage:()=>fi,buildBypassMessages:()=>vi,bypassManager:()=>x,createPreset:()=>li,default:()=>wi,deleteMessage:()=>bi,deletePreset:()=>di,duplicatePreset:()=>yi,exportPresets:()=>hi,getAllPresets:()=>ii,getDefaultPresetId:()=>pi,getEnabledMessages:()=>gi,getPreset:()=>ai,getPresetList:()=>ue,importPresets:()=>xi,setDefaultPresetId:()=>ui,updateMessage:()=>mi,updatePreset:()=>ci});var ct,Ft,ro,dt,ri,Je,x,ii,ue,ai,li,ci,di,yi,pi,ui,gi,fi,mi,bi,hi,xi,vi,wi,Ht=E(()=>{et();L();ct="bypass_presets",Ft="default_bypass_preset",ro="current_bypass_preset",dt={},ri=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),Je=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let t=u.get(ct,{});return this._cache={...dt,...t},this._cache}getPresetList(){let t=this.getAllPresets();return Object.values(t).sort((s,o)=>(o.updatedAt||0)-(s.updatedAt||0))}getPreset(t){return t&&this.getAllPresets()[t]||null}presetExists(t){return!!this.getPreset(t)}createPreset(t){let{id:s,name:o,description:n,messages:r}=t;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!o||typeof o!="string"||!o.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let i=s.trim();if(this.presetExists(i))return{success:!1,message:`\u9884\u8BBE "${i}" \u5DF2\u5B58\u5728`};let a={id:i,name:o.trim(),description:n||"",enabled:!0,messages:r||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(i,a),f.emit(g.BYPASS_PRESET_CREATED,{presetId:i,preset:a}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${i}`),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:a}}updatePreset(t,s){if(!t)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let o=this.getPreset(t);if(!o)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==t)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let n={...o,...s,id:t,updatedAt:Date.now()};return this._savePreset(t,n),f.emit(g.BYPASS_PRESET_UPDATED,{presetId:t,preset:n}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${t}`),{success:!0,message:`\u9884\u8BBE "${o.name}" \u66F4\u65B0\u6210\u529F`,preset:n}}deletePreset(t){if(!t)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(dt[t])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(t);if(!s)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};let o=u.get(ct,{});return delete o[t],u.set(ct,o),this._cache=null,this.getDefaultPresetId()===t&&this.setDefaultPresetId(null),f.emit(g.BYPASS_PRESET_DELETED,{presetId:t}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${t}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(t,s,o){let n=this.getPreset(t);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${t}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let r={...JSON.parse(JSON.stringify(n)),id:s.trim(),name:o||`${n.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),r),f.emit(g.BYPASS_PRESET_CREATED,{presetId:s,preset:r}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${r.name}"`,preset:r}}addMessage(t,s){let o=this.getPreset(t);if(!o)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};let n={id:`msg_${Date.now()}`,role:s.role||"SYSTEM",content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1},r=[...o.messages||[],n];return this.updatePreset(t,{messages:r})}updateMessage(t,s,o){let n=this.getPreset(t);if(!n)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};let r=n.messages||[],i=r.findIndex(c=>c.id===s);if(i===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let a=[...r];return a[i]={...a[i],...o},this.updatePreset(t,{messages:a})}deleteMessage(t,s){let o=this.getPreset(t);if(!o)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};let n=o.messages||[],r=n.find(a=>a.id===s);if(!r)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(r.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let i=n.filter(a=>a.id!==s);return this.updatePreset(t,{messages:i})}getEnabledMessages(t){let s=this.getPreset(t);return!s||!s.enabled?[]:(s.messages||[]).filter(o=>o.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let t=u.get(Ft,null);return t==="undefined"||t==="null"||t===""?(u.remove(Ft),null):t}setDefaultPresetId(t){return t&&!this.presetExists(t)?!1:(u.set(Ft,t),f.emit(g.BYPASS_PRESET_ACTIVATED,{presetId:t}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${t}`),!0)}getDefaultPreset(){let t=this.getDefaultPresetId();return t?this.getPreset(t):null}exportPresets(t=null){if(t){let o=this.getPreset(t);if(!o)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(o,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(t,s={}){let{overwrite:o=!1}=s,n;try{n=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let r=Array.isArray(n)?n:n.presets?n.presets:[n];if(r.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let i=u.get(ct,{}),a=0;for(let c of r)!c.id||typeof c.id!="string"||c.name&&(dt[c.id]&&!o||!o&&i[c.id]||(i[c.id]={...c,updatedAt:Date.now()},a++));return a>0&&(u.set(ct,i),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u9884\u8BBE`,imported:a}}getToolBypassPreset(t){if(!t?.bypass?.enabled)return null;let s=t?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(t){let s=this.getToolBypassPreset(t);return s?this.getEnabledMessages(s.id):[]}_savePreset(t,s){let o=u.get(ct,{});o[t]=s,u.set(ct,o),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let t=u.get(ct,{}),s={},o=!1,n=Array.isArray(t)?t.map((r,i)=>[r?.id||r?.name||`legacy_${i}`,r]):Object.entries(t||{});for(let[r,i]of n){let a=this._normalizePreset(r,i,s);if(!a){o=!0;continue}s[a.id]=a,(!t?.[a.id]||t?.[a.id]?.id!==a.id)&&(o=!0)}o&&u.set(ct,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(t,s,o={}){if(!s||typeof s!="object")return null;let n=typeof s.name=="string"?s.name.trim():"",r=typeof s.id=="string"?s.id.trim():"",i=typeof t=="string"?t.trim():"";if(!n&&i&&i!=="undefined"&&i!=="null"&&(n=i),this._isLegacySamplePreset(n,r)||(!r&&i&&i!=="undefined"&&i!=="null"&&(r=i),!r&&n&&n!=="undefined"&&n!=="null"&&(r=this._generatePresetId(n,o)),!n||!r||r==="undefined"||n==="undefined"))return null;let c=Array.isArray(s.messages)?s.messages.filter(y=>y&&typeof y=="object").map((y,p)=>({id:typeof y.id=="string"&&y.id.trim()?y.id.trim():`${r}_msg_${p+1}`,role:y.role||"SYSTEM",content:typeof y.content=="string"?y.content:"",enabled:y.enabled!==!1,deletable:y.deletable!==!1})):[];return{...s,id:r,name:n,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:c,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(t){let s=u.get(Ft,null),o=u.get(ro,null),n=s??o;(n==="undefined"||n==="null"||n==="")&&(n=null),n&&!t[n]&&(n=Object.values(t).find(i=>i.name===n)?.id||null),n?u.set(Ft,n):u.remove(Ft),u.has(ro)&&u.remove(ro)}_isLegacySamplePreset(t,s=""){return t?s==="standard"||s==="enhanced"||s==="jailbreak"||ri.has(t)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(t):!1}_generatePresetId(t,s={}){let o=String(t).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,n=o,r=1;for(;s[n];)n=`${o}_${r++}`;return n}_log(...t){this.debugMode&&console.log("[BypassManager]",...t)}},x=new Je,ii=()=>x.getAllPresets(),ue=()=>x.getPresetList(),ai=e=>x.getPreset(e),li=e=>x.createPreset(e),ci=(e,t)=>x.updatePreset(e,t),di=e=>x.deletePreset(e),yi=(e,t,s)=>x.duplicatePreset(e,t,s),pi=()=>x.getDefaultPresetId(),ui=e=>x.setDefaultPresetId(e),gi=e=>x.getEnabledMessages(e),fi=(e,t)=>x.addMessage(e,t),mi=(e,t,s)=>x.updateMessage(e,t,s),bi=(e,t)=>x.deleteMessage(e,t),hi=e=>x.exportPresets(e),xi=(e,t)=>x.importPresets(e,t),vi=e=>x.buildBypassMessages(e),wi=x});var At,io=E(()=>{L();K();Gt();ie();Ht();At={id:"summaryToolPanel",toolId:"summaryTool",render(e){let t=R(this.toolId);if(!t)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let s=this._getApiPresets(),o=this._getBypassPresets(),n=t.output?.mode||"follow_ai",r=t.bypass?.enabled||!1,i=t.bypass?.presetId||"";return`
      <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
        <!-- \u57FA\u7840\u914D\u7F6E -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-cog"></i>
            <span>\u57FA\u7840\u914D\u7F6E</span>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${l}-tool-enabled" ${t.enabled?"checked":""}>
              <span>\u542F\u7528\u5DE5\u5177</span>
            </label>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${l}-tool-auto-trigger" ${t.trigger?.enabled?"checked":""}>
              <span>\u81EA\u52A8\u89E6\u53D1\uFF08GENERATION_ENDED\uFF09</span>
            </label>
          </div>
        </div>
        
        <!-- \u8F93\u51FA\u914D\u7F6E -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-output"></i>
            <span>\u8F93\u51FA\u914D\u7F6E</span>
          </div>
          
          <div class="yyt-form-group">
            <label>\u8F93\u51FA\u6A21\u5F0F</label>
            <select class="yyt-select" id="${l}-tool-output-mode">
              <option value="follow_ai" ${n==="follow_ai"?"selected":""}>
                \u968F AI \u8F93\u51FA
              </option>
              <option value="post_response_api" ${n==="post_response_api"?"selected":""}>
                \u989D\u5916 AI \u6A21\u578B\u89E3\u6790
              </option>
            </select>
            <div class="yyt-help-text yyt-inline-help">
              <small>\u968F AI \u8F93\u51FA\uFF1A\u4E0D\u6267\u884C\u989D\u5916\u89E3\u6790\u94FE</small><br>
              <small>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\uFF1A\u56DE\u590D\u540E\u8C03\u7528\u989D\u5916\u6A21\u578B\u5904\u7406</small>
            </div>
          </div>
          
          <div class="yyt-form-group yyt-output-extra ${n==="post_response_api"?"":"yyt-hidden"}">
            <label>API \u9884\u8BBE</label>
            <select class="yyt-select" id="${l}-tool-api-preset">
              <option value="">\u4F7F\u7528\u5F53\u524DAPI\u914D\u7F6E</option>
              ${s.map(a=>`<option value="${m(a.name)}" ${a.name===t.output?.apiPreset?"selected":""}>
                  ${m(a.name)}
                </option>`).join("")}
            </select>
          </div>
          
          <div class="yyt-form-group yyt-output-extra ${n==="post_response_api"?"":"yyt-hidden"}">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${l}-tool-overwrite" ${t.output?.overwrite!==!1?"checked":""}>
              <span>\u8986\u76D6\u65E7\u6CE8\u5165\u7ED3\u679C</span>
            </label>
          </div>
        </div>
        
        <!-- \u7834\u9650\u8BCD\u7ED1\u5B9A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-shield-halved"></i>
            <span>\u7834\u9650\u8BCD\u7ED1\u5B9A</span>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${l}-tool-bypass-enabled" ${r?"checked":""}>
              <span>\u542F\u7528\u7834\u9650\u8BCD</span>
            </label>
          </div>
          
          <div class="yyt-form-group yyt-bypass-preset-select ${r?"":"yyt-hidden"}">
            <label>\u7834\u9650\u8BCD\u9884\u8BBE</label>
            <select class="yyt-select" id="${l}-tool-bypass-preset">
              <option value="">\u9009\u62E9\u9884\u8BBE</option>
              ${o.map(a=>`<option value="${m(a.id)}" ${a.id===i?"selected":""}>
                  ${m(a.name)}${a.isDefault?" [\u9ED8\u8BA4]":""}
                </option>`).join("")}
            </select>
          </div>
        </div>
        
        <!-- \u63D0\u793A\u8BCD\u6A21\u677F\u7F16\u8F91\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-file-code"></i>
            <span>\u63D0\u793A\u8BCD\u6A21\u677F</span>
            <div class="yyt-title-actions">
              <button class="yyt-btn yyt-btn-small" id="${l}-tool-reset-template">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u6A21\u677F
              </button>
            </div>
          </div>
          
          <div class="yyt-form-group">
            <textarea class="yyt-textarea yyt-code-textarea" 
                      id="${l}-tool-prompt-template" 
                      rows="12" 
                      placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${m(t.promptTemplate||"")}</textarea>
          </div>
        </div>
        
        <!-- \u8C03\u8BD5\u4FE1\u606F\uFF08\u53EF\u6298\u53E0\uFF09 -->
        <div class="yyt-panel-section yyt-collapsible">
          <div class="yyt-section-title yyt-collapsible-header">
            <i class="fa-solid fa-bug"></i>
            <span>\u8C03\u8BD5\u4FE1\u606F</span>
            <i class="fa-solid fa-chevron-down yyt-collapse-icon"></i>
          </div>
          <div class="yyt-collapsible-content">
            <div class="yyt-debug-info">
              <div class="yyt-debug-row">
                <span class="yyt-debug-label">\u8FD0\u884C\u72B6\u6001:</span>
                <span class="yyt-debug-value" id="${l}-tool-runtime-status">${t.runtime?.lastStatus||"idle"}</span>
              </div>
              <div class="yyt-debug-row">
                <span class="yyt-debug-label">\u6700\u8FD1\u8FD0\u884C:</span>
                <span class="yyt-debug-value" id="${l}-tool-runtime-last">${t.runtime?.lastRunAt?new Date(t.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C"}</span>
              </div>
              <div class="yyt-debug-row">
                <span class="yyt-debug-label">\u6210\u529F/\u5931\u8D25:</span>
                <span class="yyt-debug-value" id="${l}-tool-runtime-counts">${t.runtime?.successCount||0} / ${t.runtime?.errorCount||0}</span>
              </div>
              ${t.runtime?.lastError?`
              <div class="yyt-debug-row yyt-debug-error">
                <span class="yyt-debug-label">\u6700\u8FD1\u9519\u8BEF:</span>
                <span class="yyt-debug-value">${m(t.runtime.lastError)}</span>
              </div>
              `:""}
            </div>
          </div>
        </div>
        
        <!-- \u64CD\u4F5C\u6309\u94AE -->
        <div class="yyt-panel-footer">
          <div class="yyt-footer-left">
            <button class="yyt-btn yyt-btn-secondary" id="${l}-tool-reset">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u914D\u7F6E
            </button>
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-primary" id="${l}-tool-save">
              <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${l}-tool-copy-template">
              <i class="fa-solid fa-copy"></i> \u590D\u5236\u6A21\u677F
            </button>
          </div>
        </div>
      </div>
    `},_getApiPresets(){try{return ut()||[]}catch{return[]}},_getBypassPresets(){try{return ue()||[]}catch{return[]}},_getFormData(e,t){let s=e.find(`#${l}-tool-auto-trigger`).is(":checked"),o=e.find(`#${l}-tool-output-mode`).val()||"follow_ai",n=e.find(`#${l}-tool-bypass-enabled`).is(":checked");return{enabled:e.find(`#${l}-tool-enabled`).is(":checked"),promptTemplate:e.find(`#${l}-tool-prompt-template`).val()||"",trigger:{event:"GENERATION_ENDED",enabled:s},output:{mode:o,apiPreset:e.find(`#${l}-tool-api-preset`).val()||"",overwrite:e.find(`#${l}-tool-overwrite`).is(":checked"),enabled:!0},bypass:{enabled:n,presetId:n&&e.find(`#${l}-tool-bypass-preset`).val()||""}}},_refreshUI(e,t){let s=R(this.toolId);if(!s)return;let o=s.output?.mode||"follow_ai",n=s.bypass?.enabled||!1;e.find(`#${l}-tool-enabled`).prop("checked",s.enabled),e.find(`#${l}-tool-auto-trigger`).prop("checked",s.trigger?.enabled),e.find(`#${l}-tool-output-mode`).val(o),e.find(`#${l}-tool-api-preset`).val(s.output?.apiPreset||""),e.find(`#${l}-tool-overwrite`).prop("checked",s.output?.overwrite!==!1),e.find(".yyt-output-extra").toggleClass("yyt-hidden",o!=="post_response_api"),e.find(`#${l}-tool-bypass-enabled`).prop("checked",n),e.find(`#${l}-tool-bypass-preset`).val(s.bypass?.presetId||""),e.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!n),e.find(`#${l}-tool-prompt-template`).val(s.promptTemplate||"")},bindEvents(e,t){let s=w();if(!s||!S(e))return;let o=this;e.find(`#${l}-tool-output-mode`).on("change",n=>{let r=s(n.target).val();e.find(".yyt-output-extra").toggleClass("yyt-hidden",r!=="post_response_api")}),e.find(`#${l}-tool-bypass-enabled`).on("change",n=>{let r=s(n.target).is(":checked");e.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!r)}),e.find(".yyt-collapsible-header").on("click",n=>{s(n.currentTarget).closest(".yyt-collapsible").toggleClass("yyt-collapsed")}),e.find(`#${l}-tool-save`).on("click",()=>{this._saveConfig(e,s)}),e.find(`#${l}-tool-reset`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u914D\u7F6E\u5417\uFF1F")&&(Bt(this.toolId),this.renderTo(e),d("info","\u5DF2\u91CD\u7F6E"))}),e.find(`#${l}-tool-reset-template`).on("click",()=>{let r=Yt()[this.toolId];r&&r.promptTemplate&&(e.find(`#${l}-tool-prompt-template`).val(r.promptTemplate),d("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),e.find(`#${l}-tool-copy-template`).on("click",async()=>{let n=e.find(`#${l}-tool-prompt-template`).val();if(!n){d("warning","\u6A21\u677F\u5185\u5BB9\u4E3A\u7A7A");return}try{await navigator.clipboard.writeText(n),d("success","\u6A21\u677F\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F")}catch{d("error","\u590D\u5236\u5931\u8D25")}})},_saveConfig(e,t){let s=this._getFormData(e,t);X(this.toolId,s)?(d("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"),f.emit(g.TOOL_UPDATED,{toolId:this.toolId,config:s})):d("error","\u4FDD\u5B58\u5931\u8D25")},destroy(e){!w()||!S(e)||e.find("*").off()},getStyles(){return`
      /* \u5DE5\u5177\u9762\u677F\u6837\u5F0F - v0.6 \u7B80\u5316\u7248 */
      .yyt-tool-panel {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      /* \u9690\u85CF\u5143\u7D20 */
      .yyt-hidden {
        display: none !important;
      }
      
      /* \u4EE3\u7801\u6587\u672C\u6846 */
      .yyt-code-textarea {
        font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
        font-size: 13px;
        line-height: 1.5;
        tab-size: 2;
        background: rgba(0, 0, 0, 0.2);
        border-color: rgba(255, 255, 255, 0.1);
        resize: vertical;
        min-height: 200px;
      }
      
      .yyt-code-textarea:focus {
        border-color: var(--yyt-accent);
        box-shadow: 0 0 0 2px rgba(123, 183, 255, 0.15);
      }
      
      /* \u5185\u8054\u5E2E\u52A9\u6587\u672C */
      .yyt-inline-help {
        margin-top: 8px;
        padding: 8px 12px;
        font-size: 11px;
        line-height: 1.6;
      }
      
      .yyt-inline-help small {
        color: var(--yyt-text-muted);
      }
      
      /* \u5E2E\u52A9\u6587\u672C */
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
      
      /* \u6807\u9898\u64CD\u4F5C\u533A */
      .yyt-title-actions {
        margin-left: auto;
      }
      
      .yyt-btn-small {
        padding: 4px 10px;
        font-size: 12px;
      }
      
      /* \u590D\u9009\u6846\u6807\u7B7E */
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
      
      /* \u9762\u677F\u5E95\u90E8 */
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
      
      /* \u9519\u8BEF\u63D0\u793A */
      .yyt-error {
        padding: 20px;
        text-align: center;
        color: var(--yyt-danger);
        background: rgba(255, 107, 107, 0.1);
        border: 1px solid rgba(255, 107, 107, 0.3);
        border-radius: var(--yyt-radius-sm);
      }
      
      /* \u6298\u53E0\u9762\u677F */
      .yyt-collapsible .yyt-collapsible-content {
        overflow: hidden;
        max-height: 500px;
        transition: max-height 0.3s ease, opacity 0.3s ease;
        opacity: 1;
      }
      
      .yyt-collapsible.yyt-collapsed .yyt-collapsible-content {
        max-height: 0;
        opacity: 0;
      }
      
      .yyt-collapsible-header {
        cursor: pointer;
      }
      
      .yyt-collapsible-header .yyt-collapse-icon {
        margin-left: auto;
        transition: transform 0.3s ease;
      }
      
      .yyt-collapsible.yyt-collapsed .yyt-collapse-icon {
        transform: rotate(-90deg);
      }
      
      /* \u8C03\u8BD5\u4FE1\u606F */
      .yyt-debug-info {
        padding: 12px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: var(--yyt-radius-sm);
      }
      
      .yyt-debug-row {
        display: flex;
        justify-content: space-between;
        padding: 6px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }
      
      .yyt-debug-row:last-child {
        border-bottom: none;
      }
      
      .yyt-debug-label {
        color: var(--yyt-text-muted);
        font-size: 12px;
      }
      
      .yyt-debug-value {
        color: var(--yyt-text);
        font-size: 12px;
        font-family: 'Fira Code', monospace;
      }
      
      .yyt-debug-error .yyt-debug-value {
        color: var(--yyt-danger);
      }
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}}});var kt,ao=E(()=>{L();K();Gt();ie();Ht();kt={id:"statusBlockPanel",toolId:"statusBlock",render(e){let t=R(this.toolId);if(!t)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let s=this._getApiPresets(),o=this._getBypassPresets(),n=t.output?.mode||"follow_ai",r=t.bypass?.enabled||!1,i=t.bypass?.presetId||"";return`
      <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
        <!-- \u57FA\u7840\u914D\u7F6E -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-cog"></i>
            <span>\u57FA\u7840\u914D\u7F6E</span>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${l}-tool-enabled" ${t.enabled?"checked":""}>
              <span>\u542F\u7528\u5DE5\u5177</span>
            </label>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${l}-tool-auto-trigger" ${t.trigger?.enabled?"checked":""}>
              <span>\u81EA\u52A8\u89E6\u53D1\uFF08GENERATION_ENDED\uFF09</span>
            </label>
          </div>
          
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u6807\u7B7E\uFF08\u9017\u53F7\u5206\u9694\uFF09</label>
            <input type="text" class="yyt-input" id="${l}-tool-extract-tags" 
                   value="${m((t.extractTags||[]).join(", "))}" 
                   placeholder="status_block">
          </div>
        </div>
        
        <!-- \u8F93\u51FA\u914D\u7F6E -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-output"></i>
            <span>\u8F93\u51FA\u914D\u7F6E</span>
          </div>
          
          <div class="yyt-form-group">
            <label>\u8F93\u51FA\u6A21\u5F0F</label>
            <select class="yyt-select" id="${l}-tool-output-mode">
              <option value="follow_ai" ${n==="follow_ai"?"selected":""}>
                \u968F AI \u8F93\u51FA
              </option>
              <option value="post_response_api" ${n==="post_response_api"?"selected":""}>
                \u989D\u5916 AI \u6A21\u578B\u89E3\u6790
              </option>
            </select>
            <div class="yyt-help-text yyt-inline-help">
              <small>\u968F AI \u8F93\u51FA\uFF1A\u4E0D\u6267\u884C\u989D\u5916\u89E3\u6790\u94FE</small><br>
              <small>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\uFF1A\u56DE\u590D\u540E\u8C03\u7528\u989D\u5916\u6A21\u578B\u5904\u7406</small>
            </div>
          </div>
          
          <div class="yyt-form-group yyt-output-extra ${n==="post_response_api"?"":"yyt-hidden"}">
            <label>API \u9884\u8BBE</label>
            <select class="yyt-select" id="${l}-tool-api-preset">
              <option value="">\u4F7F\u7528\u5F53\u524DAPI\u914D\u7F6E</option>
              ${s.map(a=>`<option value="${m(a.name)}" ${a.name===t.output?.apiPreset?"selected":""}>
                  ${m(a.name)}
                </option>`).join("")}
            </select>
          </div>
          
          <div class="yyt-form-group yyt-output-extra ${n==="post_response_api"?"":"yyt-hidden"}">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${l}-tool-overwrite" ${t.output?.overwrite!==!1?"checked":""}>
              <span>\u8986\u76D6\u65E7\u6CE8\u5165\u7ED3\u679C</span>
            </label>
          </div>
        </div>
        
        <!-- \u7834\u9650\u8BCD\u7ED1\u5B9A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-shield-halved"></i>
            <span>\u7834\u9650\u8BCD\u7ED1\u5B9A</span>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${l}-tool-bypass-enabled" ${r?"checked":""}>
              <span>\u542F\u7528\u7834\u9650\u8BCD</span>
            </label>
          </div>
          
          <div class="yyt-form-group yyt-bypass-preset-select ${r?"":"yyt-hidden"}">
            <label>\u7834\u9650\u8BCD\u9884\u8BBE</label>
            <select class="yyt-select" id="${l}-tool-bypass-preset">
              <option value="">\u9009\u62E9\u9884\u8BBE</option>
              ${o.map(a=>`<option value="${m(a.id)}" ${a.id===i?"selected":""}>
                  ${m(a.name)}${a.isDefault?" [\u9ED8\u8BA4]":""}
                </option>`).join("")}
            </select>
          </div>
        </div>
        
        <!-- \u63D0\u793A\u8BCD\u6A21\u677F\u7F16\u8F91\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-file-code"></i>
            <span>\u63D0\u793A\u8BCD\u6A21\u677F</span>
            <div class="yyt-title-actions">
              <button class="yyt-btn yyt-btn-small" id="${l}-tool-reset-template">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u6A21\u677F
              </button>
            </div>
          </div>
          
          <div class="yyt-form-group">
            <textarea class="yyt-textarea yyt-code-textarea" 
                      id="${l}-tool-prompt-template" 
                      rows="12" 
                      placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${m(t.promptTemplate||"")}</textarea>
          </div>
        </div>
        
        <!-- \u8C03\u8BD5\u4FE1\u606F\uFF08\u53EF\u6298\u53E0\uFF09 -->
        <div class="yyt-panel-section yyt-collapsible">
          <div class="yyt-section-title yyt-collapsible-header">
            <i class="fa-solid fa-bug"></i>
            <span>\u8C03\u8BD5\u4FE1\u606F</span>
            <i class="fa-solid fa-chevron-down yyt-collapse-icon"></i>
          </div>
          <div class="yyt-collapsible-content">
            <div class="yyt-debug-info">
              <div class="yyt-debug-row">
                <span class="yyt-debug-label">\u8FD0\u884C\u72B6\u6001:</span>
                <span class="yyt-debug-value" id="${l}-tool-runtime-status">${t.runtime?.lastStatus||"idle"}</span>
              </div>
              <div class="yyt-debug-row">
                <span class="yyt-debug-label">\u6700\u8FD1\u8FD0\u884C:</span>
                <span class="yyt-debug-value" id="${l}-tool-runtime-last">${t.runtime?.lastRunAt?new Date(t.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C"}</span>
              </div>
              <div class="yyt-debug-row">
                <span class="yyt-debug-label">\u6210\u529F/\u5931\u8D25:</span>
                <span class="yyt-debug-value" id="${l}-tool-runtime-counts">${t.runtime?.successCount||0} / ${t.runtime?.errorCount||0}</span>
              </div>
              ${t.runtime?.lastError?`
              <div class="yyt-debug-row yyt-debug-error">
                <span class="yyt-debug-label">\u6700\u8FD1\u9519\u8BEF:</span>
                <span class="yyt-debug-value">${m(t.runtime.lastError)}</span>
              </div>
              `:""}
            </div>
          </div>
        </div>
        
        <!-- \u64CD\u4F5C\u6309\u94AE -->
        <div class="yyt-panel-footer">
          <div class="yyt-footer-left">
            <button class="yyt-btn yyt-btn-secondary" id="${l}-tool-reset">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u914D\u7F6E
            </button>
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-primary" id="${l}-tool-save">
              <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${l}-tool-copy-template">
              <i class="fa-solid fa-copy"></i> \u590D\u5236\u6A21\u677F
            </button>
          </div>
        </div>
      </div>
    `},_getApiPresets(){try{return ut()||[]}catch{return[]}},_getBypassPresets(){try{return ue()||[]}catch{return[]}},_getFormData(e,t){let s=e.find(`#${l}-tool-auto-trigger`).is(":checked"),o=e.find(`#${l}-tool-output-mode`).val()||"follow_ai",n=e.find(`#${l}-tool-bypass-enabled`).is(":checked");return{enabled:e.find(`#${l}-tool-enabled`).is(":checked"),promptTemplate:e.find(`#${l}-tool-prompt-template`).val()||"",extractTags:(e.find(`#${l}-tool-extract-tags`).val()||"").split(",").map(r=>r.trim()).filter(Boolean),trigger:{event:"GENERATION_ENDED",enabled:s},output:{mode:o,apiPreset:e.find(`#${l}-tool-api-preset`).val()||"",overwrite:e.find(`#${l}-tool-overwrite`).is(":checked"),enabled:!0},bypass:{enabled:n,presetId:n&&e.find(`#${l}-tool-bypass-preset`).val()||""}}},_refreshUI(e,t){let s=R(this.toolId);if(!s)return;let o=s.output?.mode||"follow_ai",n=s.bypass?.enabled||!1;e.find(`#${l}-tool-enabled`).prop("checked",s.enabled),e.find(`#${l}-tool-auto-trigger`).prop("checked",s.trigger?.enabled),e.find(`#${l}-tool-extract-tags`).val((s.extractTags||[]).join(", ")),e.find(`#${l}-tool-output-mode`).val(o),e.find(`#${l}-tool-api-preset`).val(s.output?.apiPreset||""),e.find(`#${l}-tool-overwrite`).prop("checked",s.output?.overwrite!==!1),e.find(".yyt-output-extra").toggleClass("yyt-hidden",o!=="post_response_api"),e.find(`#${l}-tool-bypass-enabled`).prop("checked",n),e.find(`#${l}-tool-bypass-preset`).val(s.bypass?.presetId||""),e.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!n),e.find(`#${l}-tool-prompt-template`).val(s.promptTemplate||"")},bindEvents(e,t){let s=w();if(!s||!S(e))return;let o=this;e.find(`#${l}-tool-output-mode`).on("change",n=>{let r=s(n.target).val();e.find(".yyt-output-extra").toggleClass("yyt-hidden",r!=="post_response_api")}),e.find(`#${l}-tool-bypass-enabled`).on("change",n=>{let r=s(n.target).is(":checked");e.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!r)}),e.find(".yyt-collapsible-header").on("click",n=>{s(n.currentTarget).closest(".yyt-collapsible").toggleClass("yyt-collapsed")}),e.find(`#${l}-tool-save`).on("click",()=>{this._saveConfig(e,s)}),e.find(`#${l}-tool-reset`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u914D\u7F6E\u5417\uFF1F")&&(Bt(this.toolId),this.renderTo(e),d("info","\u5DF2\u91CD\u7F6E"))}),e.find(`#${l}-tool-reset-template`).on("click",()=>{let r=Yt()[this.toolId];r&&r.promptTemplate&&(e.find(`#${l}-tool-prompt-template`).val(r.promptTemplate),d("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),e.find(`#${l}-tool-copy-template`).on("click",async()=>{let n=e.find(`#${l}-tool-prompt-template`).val();if(!n){d("warning","\u6A21\u677F\u5185\u5BB9\u4E3A\u7A7A");return}try{await navigator.clipboard.writeText(n),d("success","\u6A21\u677F\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F")}catch{d("error","\u590D\u5236\u5931\u8D25")}})},_saveConfig(e,t){let s=this._getFormData(e,t);X(this.toolId,s)?(d("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"),f.emit(g.TOOL_UPDATED,{toolId:this.toolId,config:s})):d("error","\u4FDD\u5B58\u5931\u8D25")},destroy(e){!w()||!S(e)||e.find("*").off()},getStyles(){return`
      /* \u5DE5\u5177\u9762\u677F\u6837\u5F0F - v0.6 \u7B80\u5316\u7248 */
      .yyt-tool-panel {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      /* \u9690\u85CF\u5143\u7D20 */
      .yyt-hidden {
        display: none !important;
      }
      
      /* \u4EE3\u7801\u6587\u672C\u6846 */
      .yyt-code-textarea {
        font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
        font-size: 13px;
        line-height: 1.5;
        tab-size: 2;
        background: rgba(0, 0, 0, 0.2);
        border-color: rgba(255, 255, 255, 0.1);
        resize: vertical;
        min-height: 200px;
      }
      
      .yyt-code-textarea:focus {
        border-color: var(--yyt-accent);
        box-shadow: 0 0 0 2px rgba(123, 183, 255, 0.15);
      }
      
      /* \u5185\u8054\u5E2E\u52A9\u6587\u672C */
      .yyt-inline-help {
        margin-top: 8px;
        padding: 8px 12px;
        font-size: 11px;
        line-height: 1.6;
      }
      
      .yyt-inline-help small {
        color: var(--yyt-text-muted);
      }
      
      /* \u5E2E\u52A9\u6587\u672C */
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
      
      /* \u6807\u9898\u64CD\u4F5C\u533A */
      .yyt-title-actions {
        margin-left: auto;
      }
      
      .yyt-btn-small {
        padding: 4px 10px;
        font-size: 12px;
      }
      
      /* \u590D\u9009\u6846\u6807\u7B7E */
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
      
      /* \u9762\u677F\u5E95\u90E8 */
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
      
      /* \u9519\u8BEF\u63D0\u793A */
      .yyt-error {
        padding: 20px;
        text-align: center;
        color: var(--yyt-danger);
        background: rgba(255, 107, 107, 0.1);
        border: 1px solid rgba(255, 107, 107, 0.3);
        border-radius: var(--yyt-radius-sm);
      }
      
      /* \u6298\u53E0\u9762\u677F */
      .yyt-collapsible .yyt-collapsible-content {
        overflow: hidden;
        max-height: 500px;
        transition: max-height 0.3s ease, opacity 0.3s ease;
        opacity: 1;
      }
      
      .yyt-collapsible.yyt-collapsed .yyt-collapsible-content {
        max-height: 0;
        opacity: 0;
      }
      
      .yyt-collapsible-header {
        cursor: pointer;
      }
      
      .yyt-collapsible-header .yyt-collapse-icon {
        margin-left: auto;
        transition: transform 0.3s ease;
      }
      
      .yyt-collapsible.yyt-collapsed .yyt-collapse-icon {
        transform: rotate(-90deg);
      }
      
      /* \u8C03\u8BD5\u4FE1\u606F */
      .yyt-debug-info {
        padding: 12px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: var(--yyt-radius-sm);
      }
      
      .yyt-debug-row {
        display: flex;
        justify-content: space-between;
        padding: 6px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }
      
      .yyt-debug-row:last-child {
        border-bottom: none;
      }
      
      .yyt-debug-label {
        color: var(--yyt-text-muted);
        font-size: 12px;
      }
      
      .yyt-debug-value {
        color: var(--yyt-text);
        font-size: 12px;
        font-family: 'Fira Code', monospace;
      }
      
      .yyt-debug-error .yyt-debug-value {
        color: var(--yyt-danger);
      }
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}}});var _n={};O(_n,{BypassPanel:()=>Wt,default:()=>Ti});var Wt,Ti,Ve=E(()=>{L();Ht();K();Wt={id:"bypassPanel",render(e){let t=x.getPresetList(),s=x.getDefaultPresetId();return`
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
            ${t.map(o=>this._renderPresetItem(o,o.id===s)).join("")}
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
    `},_renderPresetItem(e,t){let s=dt&&dt[e.id];return`
      <div class="yyt-bypass-preset-item ${t?"yyt-default":""}" data-preset-id="${e.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${m(e.name)}</span>
          <span class="yyt-bypass-preset-count">${e.messages?.length||0} \u6761\u6D88\u606F</span>
        </div>
        <div class="yyt-bypass-preset-actions">
          ${t?'<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>':""}
          ${s?"":`
            <button class="yyt-btn yyt-btn-icon yyt-btn-danger yyt-bypass-quick-delete" title="\u5220\u9664\u9884\u8BBE" data-preset-id="${e.id}">
              <i class="fa-solid fa-trash"></i>
            </button>
          `}
        </div>
      </div>
    `},_renderEditor(e){if(!e)return`
        <div class="yyt-bypass-empty">
          <i class="fa-solid fa-shield-halved"></i>
          <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
        </div>
      `;let t=x.getDefaultPresetId()===e.id,s=dt&&dt[e.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${e.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${m(e.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
            <button class="yyt-btn yyt-btn-small ${t?"yyt-btn-primary":"yyt-btn-secondary"}" 
                    id="yyt-bypass-set-default" title="\u8BBE\u4E3A\u9ED8\u8BA4">
              <i class="fa-solid fa-star"></i>
            </button>
          </div>
        </div>
        
        <div class="yyt-bypass-editor-desc">
          <input type="text" class="yyt-input" id="yyt-bypass-description" 
                 value="${m(e.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
        </div>
        
        <div class="yyt-bypass-messages-header">
          <span>\u6D88\u606F\u5217\u8868</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-add-message">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u6D88\u606F
          </button>
        </div>
        
        <div class="yyt-bypass-messages" id="yyt-bypass-messages">
          ${(e.messages||[]).map(o=>this._renderMessageItem(o)).join("")}
        </div>
        
        <div class="yyt-bypass-editor-footer">
          <button class="yyt-btn yyt-btn-primary" id="yyt-bypass-save">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58
          </button>
        </div>
      </div>
    `},_renderMessageItem(e){let t={SYSTEM:"fa-server",USER:"fa-user",assistant:"fa-robot"};return`
      <div class="yyt-bypass-message ${e.enabled===!1?"yyt-disabled":""}" data-message-id="${e.id}">
        <div class="yyt-bypass-message-header">
          <div class="yyt-bypass-message-role">
            <i class="fa-solid ${t[e.role]||"fa-comment"}"></i>
            <select class="yyt-select yyt-bypass-role-select">
              <option value="SYSTEM" ${e.role==="SYSTEM"?"selected":""}>SYSTEM</option>
              <option value="USER" ${e.role==="USER"?"selected":""}>USER</option>
              <option value="assistant" ${e.role==="assistant"?"selected":""}>assistant</option>
            </select>
          </div>
          <div class="yyt-bypass-message-controls">
            <label class="yyt-toggle yyt-small">
              <input type="checkbox" class="yyt-bypass-message-enabled" ${e.enabled!==!1?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
            ${e.deletable!==!1?`
              <button class="yyt-btn yyt-btn-icon yyt-btn-danger yyt-bypass-delete-message" title="\u5220\u9664">
                <i class="fa-solid fa-times"></i>
              </button>
            `:""}
          </div>
        </div>
        <textarea class="yyt-textarea yyt-bypass-message-content" rows="3" 
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${m(e.content||"")}</textarea>
      </div>
    `},bindEvents(e,t){let s=w();!s||!S(e)||(this._bindPresetListEvents(e,s),this._bindEditorEvents(e,s),this._bindFileEvents(e,s))},_bindPresetListEvents(e,t){e.on("click",".yyt-bypass-preset-item",s=>{if(t(s.target).closest(".yyt-bypass-quick-delete").length)return;let o=t(s.currentTarget).data("presetId");this._selectPreset(e,t,o)}),e.on("click",".yyt-bypass-quick-delete",s=>{s.stopPropagation();let o=t(s.currentTarget).data("presetId");if(!o||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let n=x.deletePreset(o);n.success?(e.find(".yyt-bypass-editor-content").data("presetId")===o&&e.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(e,t),d("success","\u9884\u8BBE\u5DF2\u5220\u9664")):d("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),e.find("#yyt-bypass-add").on("click",()=>{this._createNewPreset(e,t)})},_bindEditorEvents(e,t){e.on("click","#yyt-bypass-save",()=>{this._saveCurrentPreset(e,t)}),e.on("click","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(e,t)}),e.on("click","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(e,t)}),e.on("click","#yyt-bypass-set-default",()=>{this._setAsDefault(e,t)}),e.on("click","#yyt-bypass-add-message",()=>{this._addMessage(e,t)}),e.on("click",".yyt-bypass-delete-message",s=>{let o=t(s.currentTarget).closest(".yyt-bypass-message"),n=o.data("messageId");o.remove()}),e.on("change",".yyt-bypass-message-enabled",s=>{t(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!t(s.currentTarget).is(":checked"))})},_bindFileEvents(e,t){e.find("#yyt-bypass-import").on("click",()=>{e.find("#yyt-bypass-import-file").click()}),e.find("#yyt-bypass-import-file").on("change",async s=>{let o=s.target.files[0];if(o){try{let n=await mt(o),r=x.importPresets(n);d(r.success?"success":"error",r.message),r.success&&this.renderTo(e)}catch(n){d("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}t(s.target).val("")}}),e.find("#yyt-bypass-export").on("click",()=>{try{let s=x.exportPresets();ft(s,`bypass_presets_${Date.now()}.json`),d("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){d("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(e,t,s){let o=x.getPreset(s);o&&(e.find(".yyt-bypass-preset-item").removeClass("yyt-active"),e.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),e.find("#yyt-bypass-editor").html(this._renderEditor(o)))},_createNewPreset(e,t){let s=`bypass_${Date.now()}`,o=x.createPreset({id:s,name:"\u65B0\u7834\u9650\u8BCD\u9884\u8BBE",description:"",messages:[]});o.success?(this.renderTo(e),this._selectPreset(e,t,s),d("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):d("error",o?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(e,t){let s=e.find(".yyt-bypass-editor-content"),o=s.data("presetId");if(!o)return;let n=s.find(".yyt-bypass-name-input").val().trim(),r=s.find("#yyt-bypass-description").val().trim();if(!n){d("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let i=[];s.find(".yyt-bypass-message").each(function(){let c=t(this);i.push({id:c.data("messageId"),role:c.find(".yyt-bypass-role-select").val(),content:c.find(".yyt-bypass-message-content").val(),enabled:c.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let a=x.updatePreset(o,{name:n,description:r,messages:i});a.success?(d("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(e,t)):d("error",a?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(e,t){let o=e.find(".yyt-bypass-editor-content").data("presetId");if(!o||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let n=x.deletePreset(o);n.success?(this.renderTo(e),d("success","\u9884\u8BBE\u5DF2\u5220\u9664")):d("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(e,t){let o=e.find(".yyt-bypass-editor-content").data("presetId");if(!o)return;let n=`bypass_${Date.now()}`,r=x.duplicatePreset(o,n);r.success?(this.renderTo(e),this._selectPreset(e,t,n),d("success","\u9884\u8BBE\u5DF2\u590D\u5236")):d("error",r?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(e,t){let o=e.find(".yyt-bypass-editor-content").data("presetId");o&&(x.setDefaultPresetId(o),e.find(".yyt-bypass-preset-item").removeClass("yyt-default"),e.find(`.yyt-bypass-preset-item[data-preset-id="${o}"]`).addClass("yyt-default"),e.find(".yyt-bypass-default-badge").remove(),e.find(`.yyt-bypass-preset-item[data-preset-id="${o}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>'),d("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE"))},_addMessage(e,t){let s=e.find("#yyt-bypass-messages"),o={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};s.append(this._renderMessageItem(o))},_refreshPresetList(e,t){let s=x.getPresetList(),o=x.getDefaultPresetId();e.find(".yyt-bypass-preset-list").html(s.map(n=>this._renderPresetItem(n,n.id===o)).join(""))},destroy(e){!w()||!S(e)||e.find("*").off()},getStyles(){return`
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
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}},Ti=Wt});function Ke(){W.register(nt.id,nt),W.register(rt.id,rt),W.register(at.id,at),W.register(At.id,At),W.register(kt.id,kt),W.register(Wt.id,Wt),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function lo(e={}){W.init(e),Ke(),W.injectStyles(),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}var Cn=E(()=>{Ns();js();Hs();Zs();io();ao();Ve();K();Ns();js();Hs();Zs();io();ao();Ve()});var On={};O(On,{ApiPresetPanel:()=>nt,RegexExtractPanel:()=>rt,SCRIPT_ID:()=>l,StatusBlockPanel:()=>kt,SummaryToolPanel:()=>At,ToolManagePanel:()=>at,default:()=>Ei,escapeHtml:()=>m,fillFormWithConfig:()=>jt,getCurrentTab:()=>Dn,getFormApiConfig:()=>Ct,getJQuery:()=>w,getRegexStyles:()=>Rn,getStyles:()=>kn,getToolStyles:()=>In,initUI:()=>lo,isContainerValid:()=>S,registerComponents:()=>Ke,render:()=>Pn,renderRegex:()=>$n,renderTool:()=>An,setCurrentTab:()=>Mn,showToast:()=>d,uiManager:()=>W});function Pn(e){let t=w();if(!t){console.error("[YouYouToolkit] jQuery not available");return}if(e&&(typeof e=="string"?Qt=t(e):e&&e.jquery?Qt=e:e&&(Qt=t(e))),!Qt||!Qt.length){console.error("[YouYouToolkit] Container not found or invalid");return}nt.renderTo(Qt)}function $n(e){let t=w();if(!t){console.error("[YouYouToolkit] jQuery not available");return}if(e&&(typeof e=="string"?qt=t(e):e&&e.jquery?qt=e:e&&(qt=t(e))),!qt||!qt.length){console.error("[YouYouToolkit] Regex container not found");return}rt.renderTo(qt)}function An(e){let t=w();if(!t){console.error("[YouYouToolkit] jQuery not available");return}if(e&&(typeof e=="string"?Jt=t(e):e&&e.jquery?Jt=e:e&&(Jt=t(e))),!Jt||!Jt.length){console.error("[YouYouToolkit] Tool container not found");return}at.renderTo(Jt)}function kn(){return nt.getStyles()}function Rn(){return rt.getStyles()}function In(){return at.getStyles()}function Dn(){return W.getCurrentTab()}function Mn(e){W.switchTab(e)}var Qt,qt,Jt,Ei,Ln=E(()=>{Cn();Qt=null,qt=null,Jt=null;Ei={render:Pn,renderRegex:$n,renderTool:An,getStyles:kn,getRegexStyles:Rn,getToolStyles:In,getCurrentTab:Dn,setCurrentTab:Mn,uiManager:W,ApiPresetPanel:nt,RegexExtractPanel:rt,ToolManagePanel:at,SummaryToolPanel:At,StatusBlockPanel:kt,registerComponents:Ke,initUI:lo,SCRIPT_ID:l,escapeHtml:m,showToast:d,getJQuery:w,isContainerValid:S,getFormApiConfig:Ct,fillFormWithConfig:jt}});var Un={};O(Un,{abortAllTasks:()=>$i,abortTask:()=>Pi,buildToolMessages:()=>zn,clearExecutionHistory:()=>Di,createExecutionContext:()=>Ni,createResult:()=>Xe,enhanceMessagesWithBypass:()=>ji,executeBatch:()=>Ci,executeTool:()=>jn,executeToolWithConfig:()=>Ze,executeToolsBatch:()=>Bi,executorState:()=>k,extractFailed:()=>Li,extractSuccessful:()=>Oi,generateTaskId:()=>Rt,getExecutionHistory:()=>Ii,getExecutorStatus:()=>Ri,getScheduler:()=>Vt,getToolsForEvent:()=>yo,mergeResults:()=>Mi,pauseExecutor:()=>Ai,resumeExecutor:()=>ki,setMaxConcurrent:()=>_i});function Xe(e,t,s,o,n,r,i=0){return{success:s,taskId:e,toolId:t,data:o,error:n,duration:r,retries:i,timestamp:Date.now(),metadata:{}}}function Rt(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function Si(e,t={}){return{id:Rt(),toolId:e,options:t,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:t.maxRetries||3}}function Vt(){return ge||(ge=new co(k.maxConcurrent)),ge}function _i(e){k.maxConcurrent=Math.max(1,Math.min(10,e)),ge&&(ge.maxConcurrent=k.maxConcurrent)}async function jn(e,t={},s){let o=Vt(),n=Si(e,t);for(;k.isPaused;)await new Promise(r=>setTimeout(r,100));try{let r=await o.enqueue(async i=>{if(i.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(i,t);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},n);return Nn(r),r}catch(r){let i=Xe(n.id,e,!1,null,r,Date.now()-n.createdAt,n.retries);return Nn(i),i}}async function Ci(e,t={}){let{failFast:s=!1,concurrency:o=k.maxConcurrent}=t,n=[],r=Vt(),i=r.maxConcurrent;r.maxConcurrent=o;try{let a=e.map(({toolId:c,options:y,executor:p})=>jn(c,y,p));if(s)for(let c of a){let y=await c;if(n.push(y),!y.success){r.abortAll();break}}else{let c=await Promise.allSettled(a);for(let y of c)y.status==="fulfilled"?n.push(y.value):n.push(Xe(Rt(),"unknown",!1,null,y.reason,0,0))}}finally{r.maxConcurrent=i}return n}function Pi(e){return Vt().abort(e)}function $i(){Vt().abortAll(),k.executionQueue=[]}function Ai(){k.isPaused=!0}function ki(){k.isPaused=!1}function Ri(){return{...Vt().getStatus(),isPaused:k.isPaused,activeControllers:k.activeControllers.size,historyCount:k.executionHistory.length}}function Nn(e){k.executionHistory.push(e),k.executionHistory.length>100&&k.executionHistory.shift()}function Ii(e={}){let t=[...k.executionHistory];return e.toolId&&(t=t.filter(s=>s.toolId===e.toolId)),e.success!==void 0&&(t=t.filter(s=>s.success===e.success)),e.limit&&(t=t.slice(-e.limit)),t}function Di(){k.executionHistory=[]}function Mi(e){let t={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of e)t.totalDuration+=s.duration,s.success?(t.successCount++,s.data!==void 0&&s.data!==null&&t.data.push(s.data)):(t.success=!1,t.failureCount++,s.error&&t.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return t}function Oi(e){return e.filter(t=>t.success).map(t=>t.data)}function Li(e){return e.filter(t=>!t.success).map(t=>({taskId:t.taskId,toolId:t.toolId,error:t.error}))}function Ni(e={}){return{taskId:Rt(),startTime:Date.now(),signal:e.signal||null,apiConfig:e.apiConfig||null,bypassMessages:e.bypassMessages||[],context:e.context||{},metadata:e.metadata||{}}}function ji(e,t){return!t||t.length===0?e:[...t,...e]}function zi(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function zn(e,t){let s=[],o=e.promptTemplate||"",n={"{{userMessage}}":t.input?.userMessage||"","{{lastAiMessage}}":t.input?.lastAiMessage||"","{{extractedContent}}":t.input?.extractedContent||"","{{previousToolOutput}}":t.input?.previousToolOutput||"","{{context}}":JSON.stringify(t.input?.context||{}),"{{pg}}":t.input?.context?.pg||"1","{{time}}":t.input?.context?.time||"","{{scene}}":t.input?.context?.scene||"","{{plot}}":t.input?.context?.plot||"","{{mq}}":t.input?.context?.mq||"\u2160","{{mqStatus}}":t.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":t.input?.context?.sq||"1","{{sqStatus}}":t.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":t.input?.context?.latestSq||"1","{{completed}}":t.input?.context?.completed||"\u65E0","{{defined}}":t.input?.context?.defined||"","{{status}}":t.input?.context?.status||"","{{seeds}}":t.input?.context?.seeds||"","{{name}}":t.input?.context?.name||"","{{location}}":t.input?.context?.location||"","{{condition}}":t.input?.context?.condition||"","{{equipment}}":t.input?.context?.equipment||"","{{skills}}":t.input?.context?.skills||""};for(let[r,i]of Object.entries(n))o=o.replace(new RegExp(zi(r),"g"),i);return s.push({role:"USER",content:o}),s}async function Ze(e,t,s={}){let o=R(e);if(!o)return{success:!1,taskId:Rt(),toolId:e,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!o.enabled)return{success:!1,taskId:Rt(),toolId:e,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let n=Date.now(),r=Rt();try{f.emit(g.TOOL_EXECUTION_STARTED,{toolId:e,taskId:r,context:t});let i=zn(o,t);if(typeof s.callApi=="function"){let a=o.apiPreset?{preset:o.apiPreset}:null,c=await s.callApi(i,a,s.signal),y=c;o.outputMode==="separate"&&o.extractTags?.length>0&&(y=Ui(c,o.extractTags));let p={success:!0,taskId:r,toolId:e,data:y,duration:Date.now()-n};return f.emit(g.TOOL_EXECUTED,{toolId:e,taskId:r,result:p}),p}else return{success:!0,taskId:r,toolId:e,data:{messages:i,config:{apiPreset:o.apiPreset,outputMode:o.outputMode,extractTags:o.extractTags}},duration:Date.now()-n,needsExecution:!0}}catch(i){let a={success:!1,taskId:r,toolId:e,error:i.message||String(i),duration:Date.now()-n};return f.emit(g.TOOL_EXECUTION_FAILED,{toolId:e,taskId:r,error:i}),a}}function Ui(e,t){let s={};for(let o of t){let n=new RegExp(`<${o}[^>]*>([\\s\\S]*?)<\\/${o}>`,"gi"),r=e.match(n);r&&(s[o]=r.map(i=>{let a=i.match(new RegExp(`<${o}[^>]*>([\\s\\S]*?)<\\/${o}>`,"i"));return a?a[1].trim():""}))}return s}async function Bi(e,t,s={}){let o=[];for(let n of e){let r=R(n);if(r&&r.enabled){let i=await Ze(n,t,s);o.push(i)}}return o}function yo(e){let t=[],s=["summaryTool","statusBlock"];for(let o of s){let n=R(o),r=n?.trigger?.enabled&&n?.trigger?.event===e,i=Array.isArray(n?.triggerEvents)&&n.triggerEvents.includes(e);n&&n.enabled&&(r||i)&&t.push(n)}return t}var k,co,ge,po=E(()=>{Gt();L();k={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};co=class{constructor(t=3){this.maxConcurrent=t,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(t,s){return new Promise((o,n)=>{this.queue.push({executor:t,task:s,resolve:o,reject:n}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let t=this.queue.shift();if(!t)continue;let{executor:s,task:o,resolve:n,reject:r}=t,i=new AbortController;o.abortController=i,o.status="running",o.startedAt=Date.now(),this.running.set(o.id,o),k.activeControllers.set(o.id,i),this.executeTask(s,o,i.signal).then(a=>{o.status="completed",o.completedAt=Date.now(),n(a)}).catch(a=>{o.status=a.name==="AbortError"?"aborted":"failed",o.completedAt=Date.now(),r(a)}).finally(()=>{this.running.delete(o.id),k.activeControllers.delete(o.id),k.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(t,s,o){let n=Date.now(),r=null;for(let i=0;i<=s.maxRetries;i++){if(o.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let a=await t(o);return Xe(s.id,s.toolId,!0,a,null,Date.now()-n,i)}catch(a){if(r=a,a.name==="AbortError")throw a;i<s.maxRetries&&(await this.delay(1e3*(i+1)),s.retries=i+1)}}throw r}delay(t){return new Promise(s=>setTimeout(s,t))}abort(t){let s=k.activeControllers.get(t);return s?(s.abort(),!0):!1}abortAll(){for(let t of k.activeControllers.values())t.abort();k.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},ge=null});var Bn={};O(Bn,{DEFAULT_SETTINGS:()=>go,SettingsService:()=>ts,default:()=>Yi,settingsService:()=>ht});var go,uo,ts,ht,Yi,es=E(()=>{et();L();go={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},listener:{listenGenerationEnded:!0,ignoreQuietGeneration:!0,ignoreAutoTrigger:!0,debounceMs:300},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue"}},uo="settings_v2",ts=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let t=u.get(uo,{});return this._cache=this._mergeWithDefaults(t),this._cache}saveSettings(t){this._cache=this._mergeWithDefaults(t),u.set(uo,this._cache),f.emit(g.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(t){let s=this.getSettings(),o=this._deepMerge(s,t);this.saveSettings(o)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(t){this.updateSettings({executor:t})}getListenerSettings(){return this.getSettings().listener}updateListenerSettings(t){this.updateSettings({listener:t})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(t){this.updateSettings({debug:t})}getUiSettings(){return this.getSettings().ui}updateUiSettings(t){this.updateSettings({ui:t})}resetSettings(){this._cache=JSON.parse(JSON.stringify(go)),u.set(uo,this._cache),f.emit(g.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(t,s=null){let o=this.getSettings(),n=t.split("."),r=o;for(let i of n)if(r&&typeof r=="object"&&i in r)r=r[i];else return s;return r}set(t,s){let o=JSON.parse(JSON.stringify(this.getSettings())),n=t.split("."),r=o;for(let i=0;i<n.length-1;i++){let a=n[i];a in r||(r[a]={}),r=r[a]}r[n[n.length-1]]=s,this.saveSettings(o)}_mergeWithDefaults(t){return this._deepMerge(JSON.parse(JSON.stringify(go)),t)}_deepMerge(t,s){let o={...t};for(let n in s)s[n]&&typeof s[n]=="object"&&!Array.isArray(s[n])?o[n]=this._deepMerge(t[n]||{},s[n]):o[n]=s[n];return o}},ht=new ts,Yi=ht});var Gn={};O(Gn,{ContextInjector:()=>ss,DEFAULT_INJECTION_OPTIONS:()=>Yn,contextInjector:()=>me,default:()=>Gi});var fe,Yn,ss,me,Gi,fo=E(()=>{et();L();fe="context_injection",Yn={target:"context",scope:"chat",overwrite:!0,enabled:!0},ss=class{constructor(){this._cache=new Map,this.debugMode=!1}inject(t,s,o={}){if(!t||s===void 0||s===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),!1;let n={...Yn,...o},r=o.chatId||this._getCurrentChatId();if(!r)return this._log("\u6CE8\u5165\u5931\u8D25: \u65E0\u6CD5\u83B7\u53D6\u804A\u5929ID"),!1;let i=this._getStorageKey(r),a=this._getChatContexts(r),c={toolId:t,content:String(s),updatedAt:Date.now(),sourceMessageId:o.sourceMessageId||null,options:n};return n.overwrite||!a[t]?a[t]=c:a[t]={...c,content:(a[t]?.content||"")+`

`+s},this._saveChatContexts(r,a),f.emit(g.TOOL_CONTEXT_INJECTED,{toolId:t,chatId:r,content:c.content,options:n}),this._log(`\u6CE8\u5165\u6210\u529F: ${t} -> ${r}`),!0}getAggregatedContext(t){let s=t||this._getCurrentChatId();if(!s)return"";let o=this._getChatContexts(s),n=Object.entries(o);if(n.length===0)return"";let r=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[i,a]of n)r.push(`[${i}]`),r.push(a.content||""),r.push("");return r.join(`
`)}getToolContext(t,s){let o=t||this._getCurrentChatId();return!o||!s?null:this._getChatContexts(o)[s]||null}getAllToolContexts(t){let s=t||this._getCurrentChatId();return s?this._getChatContexts(s):{}}clearToolContext(t,s){let o=t||this._getCurrentChatId();if(!o||!s)return!1;let n=this._getChatContexts(o);return n[s]?(delete n[s],this._saveChatContexts(o,n),f.emit(g.TOOL_CONTEXT_CLEARED,{chatId:o,toolId:s}),this._log(`\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587: ${s}`),!0):!1}clearAllContext(t){let s=t||this._getCurrentChatId();if(!s)return!1;let o=this._getAllContexts();return delete o[s],u.set(fe,o),this._cache.delete(s),f.emit(g.TOOL_CONTEXT_CLEARED,{chatId:s,allTools:!0}),this._log(`\u6E05\u9664\u804A\u5929\u6240\u6709\u4E0A\u4E0B\u6587: ${s}`),!0}clearAllChatsContexts(){u.remove(fe),this._cache.clear(),this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(t,s){let o=t||this._getCurrentChatId();return!o||!s?!1:!!this._getChatContexts(o)[s]}getContextSummary(t){let s=t||this._getCurrentChatId();if(!s)return{tools:[],totalCount:0};let o=this._getChatContexts(s),n=Object.entries(o).map(([r,i])=>({toolId:r,updatedAt:i.updatedAt,contentLength:i.content?.length||0}));return{chatId:s,tools:n,totalCount:n.length}}exportContext(t){let s=t||this._getCurrentChatId();return s?{chatId:s,contexts:this._getChatContexts(s),exportedAt:Date.now()}:{}}importContext(t,s={}){if(!t||!t.chatId||!t.contexts)return!1;let{overwrite:o=!1}=s;if(o)this._saveChatContexts(t.chatId,t.contexts);else{let r={...this._getChatContexts(t.chatId),...t.contexts};this._saveChatContexts(t.chatId,r)}return this._log(`\u5BFC\u5165\u4E0A\u4E0B\u6587: ${t.chatId}`),!0}_getStorageKey(t){return`${fe}:${t}`}_getCurrentChatId(){try{let t=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(t.SillyTavern?.getContext){let s=t.SillyTavern.getContext();return s.chatId||s.chat_filename||`chat_${Date.now()}`}return`chat_${Date.now()}`}catch{return`chat_${Date.now()}`}}_getAllContexts(){return u.get(fe,{})}_getChatContexts(t){if(this._cache.has(t))return this._cache.get(t);let o=this._getAllContexts()[t]||{};return this._cache.set(t,o),o}_saveChatContexts(t,s){let o=this._getAllContexts();o[t]=s,u.set(fe,o),this._cache.set(t,s)}_log(...t){this.debugMode&&console.log("[ContextInjector]",...t)}},me=new ss,Gi=me});var Hn={};O(Hn,{DEFAULT_PROMPT_TEMPLATE:()=>Fn,ToolPromptService:()=>os,default:()=>Fi,toolPromptService:()=>ns});var Fn,os,ns,Fi,mo=E(()=>{L();Ht();Fn="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",os=class{constructor(){this.debugMode=!1}buildToolMessages(t,s){if(!t)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let o=[],n=this._getBypassMessages(t);if(n&&n.length>0)for(let a of n)a.enabled!==!1&&o.push({role:this._normalizeRole(a.role),content:a.content||""});let r=this._getPromptTemplate(t),i=this._buildUserContent(r,s);return i.trim()&&o.push({role:"user",content:i}),this._log(`\u6784\u5EFA\u6D88\u606F: ${o.length} \u6761`),o}buildPromptText(t,s){let o=this._getPromptTemplate(t);return this._buildUserContent(o,s)}getToolPromptTemplate(t){return this._getPromptTemplate(t)}_getPromptTemplate(t){return t.promptTemplate&&typeof t.promptTemplate=="string"?t.promptTemplate:Fn}_getBypassMessages(t){return t.bypass?.enabled?x.buildBypassMessages(t):[]}_buildUserContent(t,s){let o=[],n=s?.lastAiMessage||s?.input?.lastAiMessage||"";return t&&t.trim()&&o.push(t.trim()),n&&o.push(`
\u4EE5\u4E0B\u662F\u9700\u8981\u5904\u7406\u7684AI\u56DE\u590D\u5185\u5BB9\uFF1A
${n}`),o.join(`
`)}_normalizeRole(t){if(!t)return"user";switch(String(t).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...t){this.debugMode&&console.log("[ToolPromptService]",...t)}setDebugMode(t){this.debugMode=t}},ns=new os,Fi=ns});var Wn={};O(Wn,{LEGACY_OUTPUT_MODES:()=>Hi,OUTPUT_MODES:()=>xt,TOOL_RUNTIME_STATUS:()=>Wi,ToolOutputService:()=>rs,default:()=>Qi,toolOutputService:()=>is});var xt,Hi,Wi,rs,is,Qi,bo=E(()=>{L();es();fo();mo();xt={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},Hi={inline:"follow_ai"},Wi={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},rs=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(t){return!t||!t.enabled||!t.trigger?.enabled||!t.output?.enabled?!1:t.output?.mode===xt.POST_RESPONSE_API}shouldRunFollowAi(t){if(!t||!t.enabled||!t.trigger?.enabled||!t.output?.enabled)return!1;let s=t.output?.mode;return s===xt.FOLLOW_AI||s==="inline"}shouldRunInline(t){return this.shouldRunFollowAi(t)}async runToolPostResponse(t,s){let o=Date.now(),n=t.id;this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${n}`),f.emit(g.TOOL_EXECUTION_STARTED,{toolId:n,mode:xt.POST_RESPONSE_API});try{let r=await this._buildToolMessages(t,s);if(!r||r.length===0)throw new Error("\u65E0\u6CD5\u6784\u5EFA\u6709\u6548\u7684\u6D88\u606F");this._log(`\u6784\u5EFA\u4E86 ${r.length} \u6761\u6D88\u606F`);let i=t.output?.apiPreset,a=await this._getRequestTimeout(),c=await this._sendApiRequest(i,r,{timeoutMs:a,signal:s.signal}),y=this._extractOutputContent(c,t);y&&await me.inject(n,y,{chatId:s.chatId,overwrite:t.output?.overwrite!==!1,sourceMessageId:s.messageId||""});let p=Date.now()-o;return f.emit(g.TOOL_EXECUTED,{toolId:n,success:!0,duration:p,mode:xt.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${n}, \u8017\u65F6 ${p}ms`),{success:!0,toolId:n,output:y,duration:p}}catch(r){let i=Date.now()-o;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${n}`,r),f.emit(g.TOOL_EXECUTION_FAILED,{toolId:n,error:r.message||String(r),duration:i}),{success:!1,toolId:n,error:r.message||String(r),duration:i}}}async runToolInline(t,s){let o=Date.now(),n=t.id;try{let r=await this._buildToolMessages(t,s);return{success:!0,toolId:n,messages:r,duration:Date.now()-o}}catch(r){return{success:!1,toolId:n,error:r.message||String(r),duration:Date.now()-o}}}async _buildToolMessages(t,s){let o=await me.getAggregatedContext(s.chatId),n={...s,injectedContext:o,toolName:t.name,toolId:t.id};return ns.buildToolMessages(t,n)}_normalizeRole(t){if(!t)return"user";let s=String(t).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(t){this._apiConnection=t}async _sendApiRequest(t,s,o={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:n=9e4,signal:r}=o;if(t&&this._apiConnection.sendWithPreset)return await this._apiConnection.sendWithPreset(t,s,{timeoutMs:n},r);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:n},r);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return ht.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(t,s){if(!t)return"";if(typeof t=="string")return t;if(typeof t=="object"){if(t.choices&&t.choices[0]?.message?.content)return t.choices[0].message.content;if(t.content)return t.content;if(t.text)return t.text;if(t.message)return t.message;try{return JSON.stringify(t,null,2)}catch{return String(t)}}return String(t)}filterPostResponseTools(t){return Array.isArray(t)?t.filter(s=>this.shouldRunPostResponse(s)):[]}filterInlineTools(t){return Array.isArray(t)?t.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(t){this.debugMode=t}_log(...t){this.debugMode&&console.log("[ToolOutputService]",...t)}},is=new rs,Qi=is});var Vn={};O(Vn,{EVENT_TYPES:()=>ho,checkGate:()=>vo,destroyToolTriggerManager:()=>na,getChatContext:()=>wo,getCurrentCharacter:()=>To,getFullContext:()=>Vi,getToolTriggerManagerState:()=>ra,getWorldbookContent:()=>Qn,initToolTriggerManager:()=>qn,initTriggerModule:()=>Jn,registerEventListener:()=>Kt,registerTriggerHandler:()=>Ki,removeAllListeners:()=>qi,removeAllTriggerHandlers:()=>Zi,resetGateState:()=>Ji,setDebugMode:()=>ia,setTriggerHandlerEnabled:()=>Xi,triggerState:()=>N,unregisterEventListener:()=>cs,updateGateState:()=>ls});function Xt(){return typeof window.parent<"u"?window.parent:window}function be(){return Xt().SillyTavern||null}function xo(){let t=Xt().SillyTavern;return t&&t.eventSource?t.eventSource:null}function ds(){let t=Xt().SillyTavern;return t&&t.eventTypes?t.eventTypes:ho}function v(...e){N.debugMode&&console.log("[YouYouToolkit:Trigger]",...e)}function Kt(e,t,s={}){if(!e||typeof t!="function")return v("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u51FD\u6570"),()=>{};let{once:o=!1,priority:n=0}=s,r=xo(),a=ds()[e]||e,c=async(...y)=>{try{if(s.gateCheck&&!await vo(s.gateCheck)){v(`\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6: ${e}`);return}await t(...y),o&&cs(e,c)}catch(p){console.error("[YouYouToolkit:Trigger] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF:",p)}};if(N.listeners.has(e)||N.listeners.set(e,new Set),N.listeners.get(e).add(c),r&&typeof r.on=="function")r.on(a,c),v(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${e}`);else{let y=Xt();y.addEventListener&&(y.addEventListener(a,c),v(`\u5DF2\u6CE8\u518CDOM\u4E8B\u4EF6\u76D1\u542C\u5668: ${e}`))}return()=>cs(e,c)}function cs(e,t){let s=N.listeners.get(e);if(s&&s.has(t)){s.delete(t);let o=xo(),r=ds()[e]||e;if(o&&typeof o.off=="function")o.off(r,t),v(`\u5DF2\u53D6\u6D88\u4E8B\u4EF6\u76D1\u542C\u5668: ${e}`);else{let i=Xt();i.removeEventListener&&i.removeEventListener(r,t)}}}function qi(){let e=xo(),t=ds();for(let[s,o]of N.listeners){let n=t[s]||s;for(let r of o)if(e&&typeof e.off=="function")e.off(n,r);else{let i=Xt();i.removeEventListener&&i.removeEventListener(n,r)}}N.listeners.clear(),v("\u5DF2\u79FB\u9664\u6240\u6709\u4E8B\u4EF6\u76D1\u542C\u5668")}async function vo(e){if(!e)return!0;let t=Date.now(),s=N.gateState;if(e.minInterval&&s.lastGenerationAt&&t-s.lastGenerationAt<e.minInterval)return v("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u77ED"),!1;if(e.maxInterval&&s.lastUserMessageAt&&t-s.lastUserMessageAt>e.maxInterval)return v("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u957F"),!1;if(e.requireUserMessage&&!s.lastUserMessageId)return v("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u7F3A\u5C11\u7528\u6237\u6D88\u606F"),!1;if(e.excludeQuietGeneration&&s.lastGenerationType==="quiet")return v("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: quiet\u751F\u6210\u88AB\u6392\u9664"),!1;if(e.customCheck&&typeof e.customCheck=="function")try{if(!await e.customCheck(s))return v("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u81EA\u5B9A\u4E49\u68C0\u67E5\u8FD4\u56DEfalse"),!1}catch(o){return console.error("[YouYouToolkit:Trigger] \u81EA\u5B9A\u4E49\u95E8\u63A7\u68C0\u67E5\u9519\u8BEF:",o),!1}return!0}function ls(e){Object.assign(N.gateState,e)}function Ji(){N.gateState={lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationType:null,lastGenerationAt:0,isGenerating:!1}}async function wo(e={}){let{depth:t=3,includeUser:s=!0,includeAssistant:o=!0,includeSystem:n=!1,format:r="messages"}=e,i=be();if(!i)return v("\u65E0\u6CD5\u83B7\u53D6SillyTavern API"),null;try{let a=i.chat||[],c=[],y=Math.max(0,a.length-t);for(let p=y;p<a.length;p++){let h=a[p];h&&(h.is_user&&!s||!h.is_user&&h.is_system&&!n||!h.is_user&&!h.is_system&&!o||(r==="messages"?c.push({role:h.is_user?"user":h.is_system?"system":"assistant",content:h.mes||"",name:h.name||"",timestamp:h.send_date}):c.push(h.mes||"")))}return{messages:c,totalMessages:a.length,startIndex:y,endIndex:a.length-1}}catch(a){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u804A\u5929\u4E0A\u4E0B\u6587\u5931\u8D25:",a),null}}async function To(){let e=be();if(!e)return null;try{let t=e.this_chid,s=e.characters||[];if(t>=0&&t<s.length){let o=s[t];return{id:t,name:o.name||"",description:o.description||"",personality:o.personality||"",scenario:o.scenario||"",firstMes:o.first_mes||"",mesExample:o.mes_example||""}}return null}catch(t){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",t),null}}async function Qn(e={}){let{enabledOnly:t=!0,maxLength:s=1e4}=e,o=be();if(!o)return"";try{let r=(o.lorebook||[]).entries||[],i=[],a=0;for(let c of r){if(t&&!c.enabled)continue;let y=c.content||"";y&&a+y.length<=s&&(i.push(y),a+=y.length)}return i.join(`

`)}catch(n){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u5931\u8D25:",n),""}}async function Vi(e={}){let[t,s,o]=await Promise.all([wo(e.chat||{}),To(),Qn(e.worldbook||{})]);return{chat:t,character:s,worldbook:o,timestamp:Date.now()}}function Ki(e,t){if(!e||!t)return v("\u65E0\u6548\u7684\u5904\u7406\u5668ID\u6216\u914D\u7F6E"),()=>{};let{eventType:s,handler:o,gateCondition:n,priority:r=0}=t;if(!s||typeof o!="function")return v("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u5904\u7406\u5668\u51FD\u6570"),()=>{};N.handlers.set(e,{eventType:s,handler:o,gateCondition:n,priority:r,enabled:!0});let i=Kt(s,async(...a)=>{let c=N.handlers.get(e);!c||!c.enabled||c.gateCondition&&!await vo(c.gateCondition)||await c.handler(...a)},{priority:r});return v(`\u5DF2\u6CE8\u518C\u89E6\u53D1\u5904\u7406\u5668: ${e}`),()=>{i(),N.handlers.delete(e),v(`\u5DF2\u53D6\u6D88\u89E6\u53D1\u5904\u7406\u5668: ${e}`)}}function Xi(e,t){let s=N.handlers.get(e);s&&(s.enabled=t,v(`\u89E6\u53D1\u5904\u7406\u5668 ${e} \u5DF2${t?"\u542F\u7528":"\u7981\u7528"}`))}function Zi(){N.handlers.clear(),v("\u5DF2\u79FB\u9664\u6240\u6709\u89E6\u53D1\u5904\u7406\u5668")}function qn(){if(Z.initialized){v("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316");return}ta(),Z.initialized=!0,v("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316"),f.emit(g.TOOL_TRIGGER_INITIALIZED)}function ta(){let e=ho.GENERATION_ENDED,t=Kt(e,async s=>{v("GENERATION_ENDED\u89E6\u53D1:",s);let o=await ea(s),n=sa(e);if(n.length===0){v("\u6CA1\u6709\u9700\u8981\u6267\u884C\u7684\u5DE5\u5177");return}v(`\u9700\u8981\u6267\u884C ${n.length} \u4E2A\u5DE5\u5177:`,n.map(r=>r.id));for(let r of n)try{let i=await oa(r,o);i.success?(v(`\u5DE5\u5177 ${r.id} \u6267\u884C\u6210\u529F`),f.emit(g.TOOL_EXECUTED,{toolId:r.id,result:i.result||i.data||i})):v(`\u5DE5\u5177 ${r.id} \u6267\u884C\u5931\u8D25:`,i.error)}catch(i){console.error(`[ToolTrigger] \u5DE5\u5177\u6267\u884C\u5931\u8D25: ${r.id}`,i)}Z.lastExecutionContext=o});Z.listeners.set(e,t)}async function ea(e){let t=await wo({depth:5}),s=await To(),n=be()?.getContext?.()||null,r=t?.messages||[],i=r.filter(c=>c.role==="user").pop(),a=r.filter(c=>c.role==="assistant").pop();return{triggeredAt:Date.now(),triggerEvent:"GENERATION_ENDED",chatId:n?.chatId||n?.chat_id||n?.chat_filename||"",messageId:e?.messageId||e?.id||"",lastAiMessage:a?.content||"",userMessage:i?.content||"",input:{userMessage:i?.content||"",lastAiMessage:a?.content||"",extractedContent:"",previousToolOutput:"",context:{character:s?.name||"",chatLength:t?.totalMessages||0}},config:{},status:"pending"}}function sa(e){return yo(e)}function as(e,t){try{oo(e,t)}catch(s){console.warn("[ToolTrigger] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",e,s)}}async function oa(e,t){let s=Date.now(),o=e.id;as(o,{lastStatus:"running",lastError:"",lastDurationMs:0});try{let n;e.output?.mode===xt.POST_RESPONSE_API?n=await is.runToolPostResponse(e,t):n=await Ze(o,t);let r=Date.now()-s;if(n?.success){let c=R(o);as(o,{lastStatus:"success",lastError:"",lastDurationMs:r,successCount:(c?.runtime?.successCount||0)+1});let y=e.output?.mode===xt.POST_RESPONSE_API?`\u5DF2\u76D1\u542C AI \u56DE\u590D\u5E76\u6267\u884C ${e.name}`:`\u5DF2\u76D1\u542C AI \u56DE\u590D\uFF1A${e.name} \u5DF2\u89E6\u53D1`;return d("success",y),{success:!0,duration:r,result:n}}let i=R(o),a=n?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25";return as(o,{lastStatus:"error",lastError:a,lastDurationMs:r,errorCount:(i?.runtime?.errorCount||0)+1}),d("error",`${e.name} \u6267\u884C\u5931\u8D25\uFF1A${a}`),{success:!1,duration:r,error:a,result:n}}catch(n){let r=Date.now()-s,i=R(o),a=n?.message||String(n);throw as(o,{lastStatus:"error",lastError:a,lastDurationMs:r,errorCount:(i?.runtime?.errorCount||0)+1}),d("error",`${e.name} \u6267\u884C\u5931\u8D25\uFF1A${a}`),n}}function na(){for(let[e,t]of Z.listeners)cs(e,t);Z.listeners.clear(),Z.initialized=!1,Z.lastExecutionContext=null,v("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u9500\u6BC1")}function ra(){return{initialized:Z.initialized,listenersCount:Z.listeners.size,lastExecutionContext:Z.lastExecutionContext}}async function Jn(){if(N.isInitialized){v("\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316");return}if(!be()){v("\u65E0\u6CD5\u83B7\u53D6SillyTavern API\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),setTimeout(Jn,1e3);return}let t=ds();t.MESSAGE_SENT&&Kt(t.MESSAGE_SENT,s=>{ls({lastUserMessageId:s,lastUserMessageAt:Date.now()}),v(`\u7528\u6237\u6D88\u606F\u5DF2\u53D1\u9001: ${s}`)}),t.GENERATION_STARTED&&Kt(t.GENERATION_STARTED,(s,o)=>{ls({lastGenerationType:s,isGenerating:!0}),v(`\u751F\u6210\u5F00\u59CB: ${s}`)}),t.GENERATION_ENDED&&Kt(t.GENERATION_ENDED,()=>{ls({lastGenerationAt:Date.now(),isGenerating:!1}),v("\u751F\u6210\u7ED3\u675F")}),qn(),N.isInitialized=!0,v("\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function ia(e){N.debugMode=e}var ho,N,Z,Kn=E(()=>{L();Gt();po();bo();K();ho={MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHARACTER_LOADED:"CHARACTER_LOADED",CHARACTER_DELETED:"CHARACTER_DELETED",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",WORLDBOOK_UPDATED:"WORLDBOOK_UPDATED",EXTENSIONS_LOADED:"EXTENSIONS_LOADED",SETTINGS_LOADED:"SETTINGS_LOADED"},N={listeners:new Map,handlers:new Map,gateState:{lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationType:null,lastGenerationAt:0,isGenerating:!1},isInitialized:!1,debugMode:!1};Z={initialized:!1,listeners:new Map,lastExecutionContext:null}});var Zn={};O(Zn,{WindowManager:()=>ys,closeWindow:()=>da,createWindow:()=>ca,windowManager:()=>J});function la(){if(J.stylesInjected)return;J.stylesInjected=!0;let e=`
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
  `,t=document.createElement("style");t.id=aa+"_styles",t.textContent=e,(document.head||document.documentElement).appendChild(t)}function ca(e){let{id:t,title:s="\u7A97\u53E3",content:o="",width:n=900,height:r=700,modal:i=!1,resizable:a=!0,maximizable:c=!0,startMaximized:y=!1,rememberState:p=!0,onClose:h,onReady:D}=e;la();let b=window.jQuery||window.parent?.jQuery;if(!b)return console.error("[WindowManager] jQuery not available"),null;if(J.isOpen(t))return J.bringToFront(t),J.getWindow(t);let z=window.innerWidth||1200,Se=window.innerHeight||800,xs=z<=1100,wt=null,vs=!1;p&&(wt=J.getState(t),wt&&!xs&&(vs=!0));let It,Dt;vs&&wt.width&&wt.height?(It=Math.max(400,Math.min(wt.width,z-40)),Dt=Math.max(300,Math.min(wt.height,Se-40))):(It=Math.max(400,Math.min(n,z-40)),Dt=Math.max(300,Math.min(r,Se-40)));let Ro=Math.max(20,Math.min((z-It)/2,z-It-20)),Io=Math.max(20,Math.min((Se-Dt)/2,Se-Dt-20)),Er=c&&!xs,Sr=`
    <div class="yyt-window" id="${t}" style="left:${Ro}px; top:${Io}px; width:${It}px; height:${Dt}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${ya(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${Er?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
          <button class="yyt-window-btn close" title="\u5173\u95ED"><i class="fa-solid fa-times"></i></button>
        </div>
      </div>
      <div class="yyt-window-body">${o}</div>
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
  `,Tt=null;i&&(Tt=b(`<div class="yyt-window-overlay" data-for="${t}"></div>`),b(document.body).append(Tt));let T=b(Sr);b(document.body).append(T),J.register(t,T),T.on("mousedown",()=>J.bringToFront(t));let yt=!1,Et={left:Ro,top:Io,width:It,height:Dt},_e=()=>{Et={left:parseInt(T.css("left")),top:parseInt(T.css("top")),width:T.width(),height:T.height()},T.addClass("maximized"),T.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),yt=!0},_r=()=>{T.removeClass("maximized"),T.css({left:Et.left+"px",top:Et.top+"px",width:Et.width+"px",height:Et.height+"px"}),T.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),yt=!1};T.find(".yyt-window-btn.maximize").on("click",()=>{yt?_r():_e()}),(xs&&c||vs&&wt.isMaximized&&c||y&&c)&&_e(),T.find(".yyt-window-btn.close").on("click",()=>{if(p&&c){let G={width:yt?Et.width:T.width(),height:yt?Et.height:T.height(),isMaximized:yt};J.saveState(t,G)}h&&h(),Tt&&Tt.remove(),T.remove(),J.unregister(t),b(document).off(".yytWindowDrag"+t),b(document).off(".yytWindowResize"+t)}),Tt&&Tt.on("click",G=>{G.target,Tt[0]});let Ce=!1,Do,Mo,Oo,Lo;if(T.find(".yyt-window-header").on("mousedown",G=>{b(G.target).closest(".yyt-window-controls").length||yt||(Ce=!0,Do=G.clientX,Mo=G.clientY,Oo=parseInt(T.css("left")),Lo=parseInt(T.css("top")),b(document.body).css("user-select","none"))}),b(document).on("mousemove.yytWindowDrag"+t,G=>{if(!Ce)return;let F=G.clientX-Do,Pe=G.clientY-Mo;T.css({left:Math.max(0,Oo+F)+"px",top:Math.max(0,Lo+Pe)+"px"})}),b(document).on("mouseup.yytWindowDrag"+t,()=>{Ce&&(Ce=!1,b(document.body).css("user-select",""))}),a){let G=!1,F="",Pe,No,$e,Ae,ws,Ts;T.find(".yyt-window-resize-handle").on("mousedown",function(Mt){yt||(G=!0,F="",b(this).hasClass("se")?F="se":b(this).hasClass("e")?F="e":b(this).hasClass("s")?F="s":b(this).hasClass("w")?F="w":b(this).hasClass("n")?F="n":b(this).hasClass("nw")?F="nw":b(this).hasClass("ne")?F="ne":b(this).hasClass("sw")&&(F="sw"),Pe=Mt.clientX,No=Mt.clientY,$e=T.width(),Ae=T.height(),ws=parseInt(T.css("left")),Ts=parseInt(T.css("top")),b(document.body).css("user-select","none"),Mt.stopPropagation())}),b(document).on("mousemove.yytWindowResize"+t,Mt=>{if(!G)return;let Es=Mt.clientX-Pe,Ss=Mt.clientY-No,jo=400,zo=300,_s=$e,Cs=Ae,Uo=ws,Bo=Ts;if(F.includes("e")&&(_s=Math.max(jo,$e+Es)),F.includes("s")&&(Cs=Math.max(zo,Ae+Ss)),F.includes("w")){let ee=$e-Es;ee>=jo&&(_s=ee,Uo=ws+Es)}if(F.includes("n")){let ee=Ae-Ss;ee>=zo&&(Cs=ee,Bo=Ts+Ss)}T.css({width:_s+"px",height:Cs+"px",left:Uo+"px",top:Bo+"px"})}),b(document).on("mouseup.yytWindowResize"+t,()=>{G&&(G=!1,b(document.body).css("user-select",""))})}return T.on("remove",()=>{b(document).off(".yytWindowDrag"+t),b(document).off(".yytWindowResize"+t)}),D&&setTimeout(()=>D(T),50),T}function da(e){let t=J.getWindow(e);if(t){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${e}"]`).remove(),s(document).off(".yytWindowDrag"+e),s(document).off(".yytWindowResize"+e)),t.remove(),J.unregister(e)}}function ya(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}var aa,Xn,ys,J,tr=E(()=>{et();aa="youyou_toolkit_window_manager",Xn="window_states",ys=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(t,s){this.topZIndex++,this.windows.set(t,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(t){this.windows.delete(t)}bringToFront(t){let s=this.windows.get(t);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(t){return this.windows.get(t)?.$el||null}isOpen(t){return this.windows.has(t)}closeAll(){this.windows.forEach((t,s)=>{t.$el&&t.$el.remove()}),this.windows.clear()}saveState(t,s){let o=this.loadStates();o[t]={...s,updatedAt:Date.now()},se.set(Xn,o)}loadStates(){return se.get(Xn)||{}}getState(t){return this.loadStates()[t]||null}},J=new ys});var er={};O(er,{DEFAULT_PROMPT_SEGMENTS:()=>ps,PromptEditor:()=>us,default:()=>xa,getPromptEditorStyles:()=>fa,messagesToSegments:()=>ha,segmentsToMessages:()=>ba,validatePromptSegments:()=>ma});function fa(){return`
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
  `}function ma(e){let t=[];return Array.isArray(e)?(e.forEach((s,o)=>{s.id||t.push(`\u6BB5\u843D ${o+1} \u7F3A\u5C11ID`),s.role||t.push(`\u6BB5\u843D ${o+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(s.role)||t.push(`\u6BB5\u843D ${o+1} \u7684role\u503C\u65E0\u6548: ${s.role}`)}),{valid:t.length===0,errors:t}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function ba(e){return e.filter(t=>t.content&&t.content.trim()).map(t=>({role:t.role,content:t.content,deletable:t.deletable,mainSlot:t.mainSlot}))}function ha(e){return Array.isArray(e)?e.map((t,s)=>({id:`segment_${s}_${Date.now()}`,type:t.role==="SYSTEM"?"system":t.role==="assistant"?"ai":"user",role:t.role,mainSlot:t.mainSlot||"",content:t.content||"",deletable:t.deletable!==!1,expanded:!0,isMain:t.mainSlot==="A"||t.isMain,isMain2:t.mainSlot==="B"||t.isMain2})):[...ps]}var pa,ua,ga,ps,us,xa,sr=E(()=>{pa="youyou_toolkit_prompt_editor",ua={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},ga={system:"fa-server",ai:"fa-robot",user:"fa-user"},ps=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],us=class{constructor(t={}){this.containerId=t.containerId||pa,this.segments=t.segments||[...ps],this.onChange=t.onChange||null,this.editable=t.editable!==!1,this.showMainSlot=t.showMainSlot!==!1,this.$container=null,this.$=null}init(t){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=t,this.render(),this.bindEvents()}setSegments(t){this.segments=t&&Array.isArray(t)?[...t]:[...ps],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(t=>({...t,content:this.getSegmentContent(t.id)}))}getSegmentContent(t){return this.$container&&this.$container.find(`[data-segment-id="${t}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let t=`
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
    `;this.$container.html(t)}renderSegment(t){let s=ua[t.type]||t.type,o=ga[t.type]||"fa-file",n=t.mainSlot==="A"||t.isMain,r=t.mainSlot==="B"||t.isMain2,i=n?"var(--yyt-accent, #7bb7ff)":r?"#ffb74d":"",a=this.showMainSlot&&t.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${t.mainSlot}</span>`:"",c=`<span class="yyt-prompt-role-badge">role: ${t.role||"USER"}</span>`;return`
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
              ${a}
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
    `}bindEvents(){this.$container&&(this.$container.find(".yyt-prompt-toggle").on("click",t=>{this.$(t.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(t.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.find(".yyt-prompt-delete").on("click",t=>{let s=this.$(t.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.find(".yyt-prompt-role").on("change",t=>{let s=this.$(t.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),o=this.$(t.currentTarget).val();this.updateSegmentMeta(s,{role:o})}),this.$container.find(".yyt-prompt-main-slot").on("change",t=>{let s=this.$(t.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),o=this.$(t.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:o})}),this.$container.find(".yyt-prompt-textarea").on("input",t=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.find(`#${this.containerId}-add-segment`).on("click",()=>{this.addSegment()}),this.$container.find(`#${this.containerId}-import-prompt`).on("click",()=>{this.importPrompt()}),this.$container.find(`#${this.containerId}-export-prompt`).on("click",()=>{this.exportPrompt()}))}addSegment(t=null){let s=`segment_${Date.now()}`,o=t||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};o.id||(o.id=s),this.segments.push(o),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(t){let s=this.segments.findIndex(n=>n.id===t);if(s===-1)return;if(this.segments[s].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(t,s){let o=this.segments.find(n=>n.id===t);o&&(Object.assign(o,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let t=document.createElement("input");t.type="file",t.accept=".json",t.onchange=s=>{let o=s.target.files[0];if(!o)return;let n=new FileReader;n.onload=r=>{try{let i=JSON.parse(r.target.result);Array.isArray(i)?(this.setSegments(i),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(i){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",i)}},n.readAsText(o)},t.click()}exportPrompt(){let t=this.getSegments(),s=JSON.stringify(t,null,2),o=new Blob([s],{type:"application/json"}),n=URL.createObjectURL(o),r=document.createElement("a");r.href=n,r.download=`prompt_group_${Date.now()}.json`,r.click(),URL.revokeObjectURL(n),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}escapeHtml(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}};xa=us});var rr={};O(rr,{BUILTIN_VARIABLES:()=>or,VariableResolver:()=>gs,default:()=>va,variableResolver:()=>nr});var or,gs,nr,va,ir=E(()=>{L();or={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"}},gs=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(t,s){if(typeof t!="string")return t;let o=t;return o=this._resolveBuiltinVariables(o,s),o=this._resolveCustomVariables(o,s),o=this._resolveRegexVariables(o,s),o}resolveObject(t,s){if(!t||typeof t!="object")return t;if(Array.isArray(t))return t.map(n=>this.resolveObject(n,s));let o={};for(let[n,r]of Object.entries(t))typeof r=="string"?o[n]=this.resolveTemplate(r,s):typeof r=="object"&&r!==null?o[n]=this.resolveObject(r,s):o[n]=r;return o}buildToolContext(t){return{lastUserMessage:t.lastUserMessage||"",lastAiMessage:t.lastAiMessage||"",chatHistory:t.chatHistory||[],characterCard:t.characterCard||null,characterName:t.characterCard?.name||"",toolName:t.toolName||"",toolId:t.toolId||"",injectedContext:t.injectedContext||"",regexResults:t.regexResults||{},raw:t,timestamp:Date.now()}}registerVariable(t,s){t&&(this.customVariables.set(t,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${t}`))}unregisterVariable(t){this.customVariables.delete(t),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${t}`)}registerHandler(t,s){!t||typeof s!="function"||(this.variableHandlers.set(t,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${t}`))}getAvailableVariables(){let t=[];for(let[,s]of Object.entries(or))t.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,o]of this.customVariables)t.push({name:`{{${s}}}`,description:typeof o=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return t}getVariableHelp(){let t=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},o={};for(let n of this.getAvailableVariables())o[n.category]||(o[n.category]=[]),o[n.category].push(n);for(let[n,r]of Object.entries(s))if(o[n]&&o[n].length>0){t.push(`\u3010${r}\u3011`);for(let i of o[n])t.push(`  ${i.name} - ${i.description}`);t.push("")}return t.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),t.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),t.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(t,s)=>(s.regexResults||s.raw?.regexResults||{})[t]||"")}_resolveBuiltinVariables(t,s){let o=t;return o=o.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),o=o.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),o=o.replace(/\{\{chatHistory\}\}/gi,()=>{let n=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(n)}),o=o.replace(/\{\{characterCard\}\}/gi,()=>{let n=s.characterCard||s.raw?.characterCard;return n?this._formatCharacterCard(n):""}),o=o.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),o=o.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),o}_resolveCustomVariables(t,s){let o=t;for(let[n,r]of this.customVariables){let i=new RegExp(`\\{\\{${this._escapeRegex(n)}\\}\\}`,"gi");typeof r=="function"?o=o.replace(i,()=>{try{return r(s)}catch(a){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${n}:`,a),""}}):o=o.replace(i,String(r))}return o}_resolveRegexVariables(t,s){let o=t;for(let[n,r]of this.variableHandlers){let i=new RegExp(`\\{\\{${n}\\.([^}]+)\\}\\}`,"gi");o=o.replace(i,(a,c)=>{try{return r(c,s)}catch(y){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${n}.${c}:`,y),""}})}return o}_formatChatHistory(t){return!Array.isArray(t)||t.length===0?"":t.map(s=>{let o=s.role||"unknown",n=s.content||s.mes||"";return`[${o}]: ${n}`}).join(`

`)}_formatCharacterCard(t){if(!t)return"";let s=[];return t.name&&s.push(`\u59D3\u540D: ${t.name}`),t.description&&s.push(`\u63CF\u8FF0: ${t.description}`),t.personality&&s.push(`\u6027\u683C: ${t.personality}`),t.scenario&&s.push(`\u573A\u666F: ${t.scenario}`),s.join(`

`)}_escapeRegex(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...t){this.debugMode&&console.log("[VariableResolver]",...t)}},nr=new gs,va=nr});var So={};O(So,{SettingsPanel:()=>lr,THEME_CONFIGS:()=>Eo,applyTheme:()=>ar,default:()=>wa});function ar(e){let t=document.documentElement,s=Eo[e]||Eo["dark-blue"];Object.entries(s).forEach(([o,n])=>{t.style.setProperty(o,n)}),t.setAttribute("data-yyt-theme",e),e==="light"?t.style.setProperty("--yyt-text","rgba(15, 23, 42, 0.95)"):t.style.setProperty("--yyt-text","rgba(255, 255, 255, 0.95)")}var Eo,lr,wa,_o=E(()=>{L();es();K();Eo={"dark-blue":{"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.7)","--yyt-text-muted":"rgba(15, 23, 42, 0.45)","--yyt-surface":"rgba(0, 0, 0, 0.03)","--yyt-surface-hover":"rgba(0, 0, 0, 0.06)","--yyt-surface-active":"rgba(0, 0, 0, 0.08)","--yyt-border":"rgba(0, 0, 0, 0.08)","--yyt-border-strong":"rgba(0, 0, 0, 0.15)"}};lr={id:"settingsPanel",render(e){let t=ht.getSettings();return`
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
          ${this._renderExecutorTab(t.executor)}
          ${this._renderListenerTab(t.listener)}
          ${this._renderDebugTab(t.debug)}
          ${this._renderUiTab(t.ui)}
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
    `},_renderExecutorTab(e){return`
      <div class="yyt-settings-tab-content yyt-active" data-tab="executor">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u5E76\u53D1\u63A7\u5236</div>
          <div class="yyt-form-group">
            <label>\u6700\u5927\u5E76\u53D1\u6570</label>
            <div class="yyt-form-hint">\u540C\u65F6\u6267\u884C\u7684\u5DE5\u5177\u6570\u91CF\u4E0A\u9650</div>
            <input type="number" class="yyt-input" id="yyt-setting-maxConcurrent" 
                   value="${e.maxConcurrent}" min="1" max="10">
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u91CD\u8BD5\u7B56\u7565</div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u6700\u5927\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-setting-maxRetries" 
                     value="${e.maxRetries}" min="0" max="10">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u95F4\u9694 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-retryDelayMs" 
                     value="${e.retryDelayMs}" min="1000" max="60000" step="1000">
            </div>
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u8D85\u65F6\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label>\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4 (ms)</label>
            <div class="yyt-form-hint">\u5355\u4E2A\u8BF7\u6C42\u7684\u8D85\u65F6\u65F6\u95F4\uFF0C\u8D85\u8FC7\u5C06\u81EA\u52A8\u4E2D\u65AD</div>
            <input type="number" class="yyt-input" id="yyt-setting-requestTimeoutMs" 
                   value="${e.requestTimeoutMs}" min="10000" max="300000" step="10000">
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u961F\u5217\u7B56\u7565</div>
          <div class="yyt-form-group">
            <label>\u961F\u5217\u5904\u7406\u65B9\u5F0F</label>
            <select class="yyt-select" id="yyt-setting-queueStrategy">
              <option value="fifo" ${e.queueStrategy==="fifo"?"selected":""}>FIFO (\u5148\u8FDB\u5148\u51FA)</option>
              <option value="lifo" ${e.queueStrategy==="lifo"?"selected":""}>LIFO (\u540E\u8FDB\u5148\u51FA)</option>
              <option value="priority" ${e.queueStrategy==="priority"?"selected":""}>\u4F18\u5148\u7EA7\u6392\u5E8F</option>
            </select>
          </div>
        </div>
      </div>
    `},_renderListenerTab(e){return`
      <div class="yyt-settings-tab-content" data-tab="listener">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u4E8B\u4EF6\u76D1\u542C</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-listenGenerationEnded" 
                     ${e.listenGenerationEnded?"checked":""}>
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
                     ${e.ignoreQuietGeneration?"checked":""}>
              <span>\u5FFD\u7565\u9759\u9ED8\u751F\u6210</span>
            </label>
            <div class="yyt-form-hint">Quiet \u6A21\u5F0F\u7684\u751F\u6210\u4E0D\u4F1A\u89E6\u53D1\u5DE5\u5177</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-ignoreAutoTrigger" 
                     ${e.ignoreAutoTrigger?"checked":""}>
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
                   value="${e.debounceMs}" min="0" max="5000" step="100">
          </div>
        </div>
      </div>
    `},_renderDebugTab(e){return`
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u65E5\u5FD7\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-enableDebugLog" 
                     ${e.enableDebugLog?"checked":""}>
              <span>\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7</span>
            </label>
            <div class="yyt-form-hint">\u5728\u63A7\u5236\u53F0\u8F93\u51FA\u8BE6\u7EC6\u7684\u8C03\u8BD5\u4FE1\u606F</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-saveExecutionHistory" 
                     ${e.saveExecutionHistory?"checked":""}>
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
                     ${e.showRuntimeBadge?"checked":""}>
              <span>\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0</span>
            </label>
            <div class="yyt-form-hint">\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668</div>
          </div>
        </div>
      </div>
    `},_renderUiTab(e){return`
      <div class="yyt-settings-tab-content" data-tab="ui">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u5916\u89C2\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label>\u4E3B\u9898</label>
            <select class="yyt-select" id="yyt-setting-theme">
              <option value="dark-blue" ${e.theme==="dark-blue"?"selected":""}>\u6DF1\u84DD</option>
              <option value="dark-purple" ${e.theme==="dark-purple"?"selected":""}>\u6DF1\u7D2B</option>
              <option value="dark-green" ${e.theme==="dark-green"?"selected":""}>\u6DF1\u7EFF</option>
              <option value="light" ${e.theme==="light"?"selected":""}>\u6D45\u8272</option>
            </select>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-compactMode" 
                     ${e.compactMode?"checked":""}>
              <span>\u7D27\u51D1\u6A21\u5F0F</span>
            </label>
            <div class="yyt-form-hint">\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-animationEnabled" 
                     ${e.animationEnabled?"checked":""}>
              <span>\u542F\u7528\u52A8\u753B\u6548\u679C</span>
            </label>
            <div class="yyt-form-hint">\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B</div>
          </div>
        </div>
      </div>
    `},bindEvents(e,t){let s=w();!s||!S(e)||(e.find(".yyt-settings-tab").on("click",o=>{let n=s(o.currentTarget).data("tab");e.find(".yyt-settings-tab").removeClass("yyt-active"),s(o.currentTarget).addClass("yyt-active"),e.find(".yyt-settings-tab-content").removeClass("yyt-active"),e.find(`.yyt-settings-tab-content[data-tab="${n}"]`).addClass("yyt-active")}),e.find("#yyt-settings-save").on("click",()=>{this._saveSettings(e,s)}),e.find("#yyt-settings-reset").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(ht.resetSettings(),this.renderTo(e),d("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}))},_saveSettings(e,t){let s={executor:{maxConcurrent:parseInt(e.find("#yyt-setting-maxConcurrent").val())||3,maxRetries:parseInt(e.find("#yyt-setting-maxRetries").val())||2,retryDelayMs:parseInt(e.find("#yyt-setting-retryDelayMs").val())||5e3,requestTimeoutMs:parseInt(e.find("#yyt-setting-requestTimeoutMs").val())||9e4,queueStrategy:e.find("#yyt-setting-queueStrategy").val()||"fifo"},listener:{listenGenerationEnded:e.find("#yyt-setting-listenGenerationEnded").is(":checked"),ignoreQuietGeneration:e.find("#yyt-setting-ignoreQuietGeneration").is(":checked"),ignoreAutoTrigger:e.find("#yyt-setting-ignoreAutoTrigger").is(":checked"),debounceMs:parseInt(e.find("#yyt-setting-debounceMs").val())||300},debug:{enableDebugLog:e.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:e.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:e.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:e.find("#yyt-setting-theme").val()||"dark-blue",compactMode:e.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:e.find("#yyt-setting-animationEnabled").is(":checked")}};ht.saveSettings(s),ar(s.ui.theme),document.documentElement.classList.toggle("yyt-compact-mode",s.ui.compactMode),document.documentElement.classList.toggle("yyt-no-animation",!s.ui.animationEnabled),d("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},destroy(e){!w()||!S(e)||e.find("*").off()},getStyles(){return`
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
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}},wa=lr});var M="youyou_toolkit",$o="0.6.2",he=`${M}-menu-item`,Co=`${M}-menu-container`,Ta=`${M}-popup`,I=typeof window.parent<"u"?window.parent:window,fs=null,tt=null,xe=null,Y=null,dr=null,hs=null,yr=null,ve=null,we=null,V=null,q=null,Te=null,pr=null,ur=null,gr=null,fr=null,ms=null;async function Zt(){try{return fs=await Promise.resolve().then(()=>(ne(),Ho)),tt=await Promise.resolve().then(()=>(As(),Qo)),xe=await Promise.resolve().then(()=>(ie(),qo)),Y=await Promise.resolve().then(()=>(Ln(),On)),dr=await Promise.resolve().then(()=>(Fs(),an)),hs=await Promise.resolve().then(()=>(Xs(),ln)),yr=await Promise.resolve().then(()=>(po(),Un)),ve=await Promise.resolve().then(()=>(Kn(),Vn)),we=await Promise.resolve().then(()=>(tr(),Zn)),V=await Promise.resolve().then(()=>(Gt(),En)),q=await Promise.resolve().then(()=>(sr(),er)),Te=await Promise.resolve().then(()=>(es(),Bn)),pr=await Promise.resolve().then(()=>(Ht(),Sn)),ur=await Promise.resolve().then(()=>(ir(),rr)),gr=await Promise.resolve().then(()=>(fo(),Gn)),fr=await Promise.resolve().then(()=>(mo(),Hn)),ms=await Promise.resolve().then(()=>(bo(),Wn)),ms?.toolOutputService&&tt&&ms.toolOutputService.setApiConnection(tt),!0}catch(e){return console.warn(`[${M}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,e),!1}}function j(...e){console.log(`[${M}]`,...e)}function mr(...e){console.error(`[${M}]`,...e)}function cr(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}async function Ea(){let e=`${M}-styles`,t=I.document||document;if(t.getElementById(e))return;let s="";try{let n=await fetch("./styles/main.css");n.ok&&(s=await n.text())}catch{j("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F")}s||(s=Sa());let o=t.createElement("style");o.id=e,o.textContent=s,(t.head||t.documentElement).appendChild(o),j("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function Sa(){return`
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
    #${Co} { display: flex; align-items: center; }
    
    #${he} {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 14px; cursor: pointer;
      transition: all 0.2s ease; border-radius: 8px; margin: 2px;
    }
    
    #${he}:hover {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
    }
    
    #${he} .fa-fw {
      font-size: 16px; color: var(--yyt-accent);
      filter: drop-shadow(0 0 6px var(--yyt-accent-glow));
    }
    
    #${he} span { font-weight: 500; letter-spacing: 0.3px; }
    
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
  `}var _=null,vt=null,te="apiPresets",Ao={};function bs(){_&&(_.remove(),_=null),vt&&(vt.remove(),vt=null),j("\u5F39\u7A97\u5DF2\u5173\u95ED")}function br(e){te=e;let t=I.jQuery||window.jQuery;if(!t||!_)return;t(_).find(".yyt-main-nav-item").removeClass("active"),t(_).find(`.yyt-main-nav-item[data-tab="${e}"]`).addClass("active");let s=V?.getToolConfig(e);s?.hasSubTabs?(t(_).find(".yyt-sub-nav").show(),xr(e,s.subTabs)):t(_).find(".yyt-sub-nav").hide(),t(_).find(".yyt-tab-content").removeClass("active"),t(_).find(`.yyt-tab-content[data-tab="${e}"]`).addClass("active"),vr(e)}function hr(e,t){Ao[e]=t;let s=I.jQuery||window.jQuery;!s||!_||(s(_).find(".yyt-sub-nav-item").removeClass("active"),s(_).find(`.yyt-sub-nav-item[data-subtab="${t}"]`).addClass("active"),ko(e,t))}function xr(e,t){let s=I.jQuery||window.jQuery;if(!s||!_||!t)return;let o=Ao[e]||t[0]?.id,n=t.map(r=>`
    <div class="yyt-sub-nav-item ${r.id===o?"active":""}" data-subtab="${r.id}">
      <i class="fa-solid ${r.icon||"fa-file"}"></i>
      <span>${r.name}</span>
    </div>
  `).join("");s(_).find(".yyt-sub-nav").html(n),s(_).find(".yyt-sub-nav-item").on("click",function(){let r=s(this).data("subtab");hr(e,r)})}async function vr(e){let t=I.jQuery||window.jQuery;if(!t||!_)return;let s=t(_).find(`.yyt-tab-content[data-tab="${e}"]`);if(!s.length)return;let o=V?.getToolConfig(e);switch(e){case"apiPresets":Y&&Y.render(s);break;case"regexExtract":Y&&Y.renderRegex(s);break;case"tools":if(o?.hasSubTabs&&o.subTabs?.length>0){let n=o.subTabs[0].id;ko(e,n)}else s.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":await _a(s);break;case"settings":await Ca(s);break;default:Pa(e,s);break}}async function _a(e){if(I.jQuery||window.jQuery)try{let{BypassPanel:s}=await Promise.resolve().then(()=>(Ve(),_n)),o=`${M}-bypass-styles`,n=I.document||document;if(!n.getElementById(o)&&s.getStyles){let r=n.createElement("style");r.id=o,r.textContent=s.getStyles(),(n.head||n.documentElement).appendChild(r)}s.renderTo(e)}catch(s){console.error(`[${M}] \u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,s),e.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}async function Ca(e){if(I.jQuery||window.jQuery)try{let{SettingsPanel:s}=await Promise.resolve().then(()=>(_o(),So)),o=`${M}-settings-styles`,n=I.document||document;if(!n.getElementById(o)&&s.getStyles){let r=n.createElement("style");r.id=o,r.textContent=s.getStyles(),(n.head||n.documentElement).appendChild(r)}s.renderTo(e)}catch(s){console.error(`[${M}] \u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,s),e.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function ko(e,t){let s=I.jQuery||window.jQuery;if(!s||!_)return;let o=s(_).find(`.yyt-tab-content[data-tab="${e}"]`);if(!o.length)return;let n=V?.getToolConfig(e);if(n?.hasSubTabs){let i=n.subTabs?.find(a=>a.id===t);if(i){let a=o.find(".yyt-sub-content");switch(a.length||(o.html('<div class="yyt-sub-content"></div>'),a=o.find(".yyt-sub-content")),i.component){case"SummaryToolPanel":Y?.SummaryToolPanel?Y.SummaryToolPanel.renderTo(a):a.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"StatusBlockPanel":Y?.StatusBlockPanel?Y.StatusBlockPanel.renderTo(a):a.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:a.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}return}let r=o.find(".yyt-sub-content");if(r.length)switch(t){case"config":$a(e,r);break;case"prompts":Aa(e,r);break;case"presets":ka(e,r);break;default:r.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}function Pa(e,t){if(!(I.jQuery||window.jQuery))return;let o=V?.getToolConfig(e);if(!o){t.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let n=Ao[e]||o.subTabs?.[0]?.id||"config";t.html(`
    <div class="yyt-tool-window">
      <div class="yyt-sub-content" data-subtab="${n}">
        <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
      </div>
    </div>
  `),ko(e,n)}function $a(e,t){if(!(I.jQuery||window.jQuery))return;let o=hs?.getTool(e),n=xe?.getAllPresets()||[],r=V?.getToolApiPreset(e)||"",i=n.map(a=>`<option value="${cr(a.name)}" ${a.name===r?"selected":""}>${cr(a.name)}</option>`).join("");t.html(`
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
  `),t.find("#yyt-save-tool-preset").on("click",function(){let a=t.find("#yyt-tool-api-preset").val();V?.setToolApiPreset(e,a);let c=I.toastr;c&&c.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}function Aa(e,t){if(!(I.jQuery||window.jQuery)||!q){t.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let n=hs?.getTool(e)?.config?.messages||[],r=q.messagesToSegments?q.messagesToSegments(n):q.DEFAULT_PROMPT_SEGMENTS,i=new q.PromptEditor({containerId:`yyt-prompt-editor-${e}`,segments:r,onChange:c=>{let y=q.segmentsToMessages?q.segmentsToMessages(c):[];j("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",y.length,"\u6761\u6D88\u606F")}});t.html(`<div id="yyt-prompt-editor-${e}" class="yyt-prompt-editor-container"></div>`),i.init(t.find(`#yyt-prompt-editor-${e}`));let a=q.getPromptEditorStyles?q.getPromptEditorStyles():"";if(a){let c="yyt-prompt-editor-styles";if(!document.getElementById(c)){let y=document.createElement("style");y.id=c,y.textContent=a,document.head.appendChild(y)}}}function ka(e,t){(I.jQuery||window.jQuery)&&t.html(`
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
  `)}function wr(){if(_){j("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let e=I.jQuery||window.jQuery,t=I.document||document;if(!e){mr("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let s=V?.getToolList()||[];vt=t.createElement("div"),vt.className="yyt-popup-overlay",vt.addEventListener("click",c=>{c.target===vt&&bs()}),t.body.appendChild(vt);let o=s.map(c=>`
    <div class="yyt-main-nav-item ${c.id===te?"active":""}" data-tab="${c.id}">
      <i class="fa-solid ${c.icon}"></i>
      <span>${c.name}</span>
    </div>
  `).join(""),n=s.map(c=>`
    <div class="yyt-tab-content ${c.id===te?"active":""}" data-tab="${c.id}">
      <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
    </div>
  `).join(""),r=`
    <div class="yyt-popup" id="${Ta}">
      <div class="yyt-popup-header">
        <div class="yyt-popup-title">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span>YouYou \u5DE5\u5177\u7BB1</span>
          <span style="font-size: 12px; opacity: 0.6;">v${$o}</span>
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
        <button class="yyt-btn yyt-btn-secondary" id="${M}-close-btn">\u5173\u95ED</button>
      </div>
    </div>
  `,i=t.createElement("div");i.innerHTML=r,_=i.firstElementChild,t.body.appendChild(_),e(_).find(".yyt-popup-close").on("click",bs),e(_).find(`#${M}-close-btn`).on("click",bs),e(_).find(".yyt-main-nav-item").on("click",function(){let c=e(this).data("tab");c&&br(c)}),vr(te);let a=V?.getToolConfig(te);a?.hasSubTabs&&(e(_).find(".yyt-sub-nav").show(),xr(te,a.subTabs)),j("\u5F39\u7A97\u5DF2\u6253\u5F00")}function Ee(){let e=I.jQuery||window.jQuery;if(!e){mr("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(Ee,1e3);return}let t=I.document||document,s=e("#extensionsMenu",t);if(!s.length){j("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(Ee,2e3);return}if(e(`#${Co}`,s).length>0){j("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let n=e(`<div class="extension_container interactable" id="${Co}" tabindex="0"></div>`),r=`
    <div class="list-group-item flex-container flexGap5 interactable" id="${he}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
      <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
      <span>YouYou \u5DE5\u5177\u7BB1</span>
    </div>
  `,i=e(r);i.on("click",async function(a){a.stopPropagation(),j("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let c=e("#extensionsMenuButton",t);c.length&&s.is(":visible")&&c.trigger("click"),wr()}),n.append(i),s.append(n),j("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}var Po={version:$o,id:M,init:Tr,openPopup:wr,closePopup:bs,switchMainTab:br,switchSubTab:hr,addMenuItem:Ee,getStorage:()=>fs,getApiConnection:()=>tt,getPresetManager:()=>xe,getUiComponents:()=>Y,getRegexExtractor:()=>dr,getToolManager:()=>hs,getToolExecutor:()=>yr,getToolTrigger:()=>ve,getWindowManager:()=>we,getToolRegistry:()=>V,getPromptEditor:()=>q,getSettingsService:()=>Te,getBypassManager:()=>pr,getVariableResolver:()=>ur,getContextInjector:()=>gr,getToolPromptService:()=>fr,getToolOutputService:()=>ms,async getApiConfig(){return await Zt(),fs?fs.loadSettings().apiConfig:null},async saveApiConfig(e){return await Zt(),tt?(tt.updateApiConfig(e),!0):!1},async getPresets(){return await Zt(),xe?xe.getAllPresets():[]},async sendApiRequest(e,t){if(await Zt(),tt)return tt.sendApiRequest(e,t);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await Zt(),tt?tt.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(e,t){return V?.registerTool(e,t)||!1},unregisterTool(e){return V?.unregisterTool(e)||!1},getToolList(){return V?.getToolList()||[]},createWindow(e){return we?.createWindow(e)||null},closeWindow(e){we?.closeWindow(e)}};async function Tr(){if(j(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${$o}`),await Ea(),await Zt()){if(j("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),ve&&ve.initTriggerModule)try{ve.initTriggerModule(),j("\u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316")}catch(o){console.error(`[${M}] \u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,o)}let s=I.document||document;if(Y){let o=`${M}-ui-styles`;if(!s.getElementById(o)){let i=s.createElement("style");i.id=o,i.textContent=Y.getStyles(),(s.head||s.documentElement).appendChild(i)}let n=`${M}-regex-styles`;if(!s.getElementById(n)&&Y.getRegexStyles){let i=s.createElement("style");i.id=n,i.textContent=Y.getRegexStyles(),(s.head||s.documentElement).appendChild(i)}let r=`${M}-tool-styles`;if(!s.getElementById(r)&&Y.getToolStyles){let i=s.createElement("style");i.id=r,i.textContent=Y.getToolStyles(),(s.head||s.documentElement).appendChild(i)}}if(we){let o=`${M}-window-styles`;s.getElementById(o)}if(q&&q.getPromptEditorStyles){let o=`${M}-prompt-styles`;if(!s.getElementById(o)){let n=s.createElement("style");n.id=o,n.textContent=q.getPromptEditorStyles(),(s.head||s.documentElement).appendChild(n)}}try{let{applyTheme:o}=await Promise.resolve().then(()=>(_o(),So));if(Te&&Te.settingsService){let n=Te.settingsService.getUiSettings();n&&n.theme&&(o(n.theme),j(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${n.theme}`),n.compactMode&&document.documentElement.classList.add("yyt-compact-mode"),n.animationEnabled||document.documentElement.classList.add("yyt-no-animation"))}}catch(o){j("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",o)}}else j("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let t=I.document||document;t.readyState==="loading"?t.addEventListener("DOMContentLoaded",()=>{setTimeout(Ee,1e3)}):setTimeout(Ee,1e3),j("\u521D\u59CB\u5316\u5B8C\u6210")}if(typeof window<"u"&&(window.YouYouToolkit=Po,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=Po}catch{}var Sc=Po;Tr();j("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210");export{Sc as default};
