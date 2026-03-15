var Uo=Object.defineProperty;var E=(s,t)=>()=>(s&&(t=s(s=0)),t);var N=(s,t)=>{for(var e in t)Uo(s,e,{get:t[e],enumerable:!0})};function Xn(){let s=b;return s._getStorage(),s._storage}function I(){return b.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function J(s){b.set("settings",s)}var wt,b,P,Kn,ie,lt=E(()=>{wt=class s{constructor(t="youyou_toolkit"){this.namespace=t,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let t=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e?.extensionSettings)return e.extensionSettings[this.namespace]||(e.extensionSettings[this.namespace]={}),this._storage={_target:e.extensionSettings[this.namespace],getItem:n=>{let r=e.extensionSettings[this.namespace][n];return typeof r=="string"?r:r?JSON.stringify(r):null},setItem:(n,r)=>{e.extensionSettings[this.namespace][n]=r,this._saveSettings(e)},removeItem:n=>{delete e.extensionSettings[this.namespace][n],this._saveSettings(e)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespace}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:t=>{try{return localStorage.getItem(t)}catch{return null}},setItem:(t,e)=>{try{localStorage.setItem(t,e)}catch(n){console.error(`[${this.namespace}] localStorage\u5199\u5165\u5931\u8D25:`,n)}},removeItem:t=>{try{localStorage.removeItem(t)}catch{}},_isTavern:!1},this._storage}_saveSettings(t){if(typeof t.saveSettings=="function")try{t.saveSettings()}catch{}else if(typeof t.saveSettingsDebounced=="function")try{t.saveSettingsDebounced()}catch{}}get(t,e=null){let n=`${this.namespace}:${t}`;if(this._cache.has(n))return this._cache.get(n);let r=this._getStorage(),o=this._getFullKey(t),i=r.getItem(o);if(i===null)return e;try{let a=JSON.parse(i);return this._cache.set(n,a),a}catch{return i}}set(t,e){let n=this._getStorage(),r=this._getFullKey(t),o=`${this.namespace}:${t}`;this._cache.set(o,e);try{n.setItem(r,JSON.stringify(e))}catch(i){console.error(`[${this.namespace}] \u5B58\u50A8\u5931\u8D25:`,i)}}remove(t){let e=this._getStorage(),n=this._getFullKey(t),r=`${this.namespace}:${t}`;this._cache.delete(r),e.removeItem(n)}has(t){let e=this._getStorage(),n=this._getFullKey(t);return e.getItem(n)!==null}clear(){if(this._getStorage()._isTavern){let e=typeof window.parent<"u"?window.parent:window;if(e.SillyTavern?.getContext){let n=e.SillyTavern.getContext();n?.extensionSettings?.[this.namespace]&&(n.extensionSettings[this.namespace]={},this._saveSettings(n))}}else{let e=`${this.namespace}_`,n=[];for(let r=0;r<localStorage.length;r++){let o=localStorage.key(r);o&&o.startsWith(e)&&n.push(o)}n.forEach(r=>localStorage.removeItem(r))}this._cache.clear()}_getFullKey(t){return this._getStorage()._isTavern?t:`${this.namespace}_${t}`}namespace(t){return new s(`${this.namespace}:${t}`)}getMultiple(t){let e={};return t.forEach(n=>{e[n]=this.get(n)}),e}setMultiple(t){Object.entries(t).forEach(([e,n])=>{this.set(e,n)})}exportAll(){let t=this._getStorage(),e={};if(t._isTavern){let n=typeof window.parent<"u"?window.parent:window;if(n.SillyTavern?.getContext){let o=n.SillyTavern.getContext()?.extensionSettings?.[this.namespace]||{};Object.entries(o).forEach(([i,a])=>{e[i]=typeof a=="string"?JSON.parse(a):a})}}else{let n=`${this.namespace}_`;for(let r=0;r<localStorage.length;r++){let o=localStorage.key(r);if(o&&o.startsWith(n)){let i=o.slice(n.length);try{e[i]=JSON.parse(localStorage.getItem(o))}catch{e[i]=localStorage.getItem(o)}}}}return e}},b=new wt("youyou_toolkit"),P=new wt("youyou_toolkit:tools"),Kn=new wt("youyou_toolkit:presets"),ie=new wt("youyou_toolkit:windows")});var tr={};N(tr,{DEFAULT_API_PRESETS:()=>Bo,DEFAULT_SETTINGS:()=>zo,STORAGE_KEYS:()=>ae,StorageService:()=>wt,deepMerge:()=>Zn,getCurrentPresetName:()=>Ft,getStorage:()=>Xn,loadApiPresets:()=>Y,loadSettings:()=>I,presetStorage:()=>Kn,saveApiPresets:()=>ct,saveSettings:()=>J,setCurrentPresetName:()=>Ht,storage:()=>b,toolStorage:()=>P,windowStorage:()=>ie});function Y(){return b.get(ae.API_PRESETS)||[]}function ct(s){b.set(ae.API_PRESETS,s)}function Ft(){return b.get(ae.CURRENT_PRESET)||""}function Ht(s){b.set(ae.CURRENT_PRESET,s||"")}function Zn(s,t){let e=r=>r&&typeof r=="object"&&!Array.isArray(r),n={...s};return e(s)&&e(t)&&Object.keys(t).forEach(r=>{e(t[r])?r in s?n[r]=Zn(s[r],t[r]):Object.assign(n,{[r]:t[r]}):Object.assign(n,{[r]:t[r]})}),n}var ae,zo,Bo,le=E(()=>{lt();lt();ae={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},zo={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},Bo=[]});var sr={};N(sr,{API_STATUS:()=>Yo,fetchAvailableModels:()=>Os,getApiConfig:()=>It,getEffectiveApiConfig:()=>er,sendApiRequest:()=>Ds,sendWithPreset:()=>Go,testApiConnection:()=>Qo,updateApiConfig:()=>Rt,validateApiConfig:()=>Oe});function It(){return I().apiConfig||{}}function Rt(s){let t=I();t.apiConfig={...t.apiConfig,...s},J(t)}function Oe(s){let t=[];if(s.useMainApi)return{valid:!0,errors:[]};if(!s.url||!s.url.trim())t.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(s.url)}catch{t.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!s.model||!s.model.trim())&&t.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:t.length===0,errors:t}}function er(s=""){let t=I();if(s){let n=(t.apiPresets||[]).find(r=>r.name===s);if(n&&n.apiConfig)return{...n.apiConfig,presetName:n.name}}return t.apiConfig||{}}async function Go(s,t,e={},n=null){let r=er(s);return await Ds(t,{...e,apiConfig:r},n)}function Fo(s,t={}){let e=t.apiConfig||It();return{messages:s,model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9,stream:!1,...t.extraParams}}async function Ds(s,t={},e=null){let n=t.apiConfig||It(),r=n.useMainApi,o=Oe(n);if(!o.valid&&!r)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${o.errors.join(", ")}`);return r?await Ho(s,t,e):await Wo(s,n,t,e)}async function Ho(s,t,e){let n=typeof window.parent<"u"?window.parent:window;if(!n.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let r=await n.TavernHelper.generateRaw({ordered_prompts:s,should_stream:!1,...t.extraParams});if(typeof r!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return r.trim()}catch(r){throw r.name==="AbortError"?r:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${r.message}`)}}async function Wo(s,t,e,n){let r=Fo(s,{apiConfig:t,...e}),o={"Content-Type":"application/json"};t.apiKey&&(o.Authorization=`Bearer ${t.apiKey}`);let i=await fetch(t.url,{method:"POST",headers:o,body:JSON.stringify(r),signal:n});if(!i.ok){let l=await i.text().catch(()=>"Unknown error");throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${l}`)}let a=await i.json(),c="";if(a.choices&&a.choices[0]?.message?.content)c=a.choices[0].message.content;else if(a.content)c=a.content;else if(a.text)c=a.text;else if(a.response)c=a.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(a).slice(0,200)}`);return c.trim()}async function Qo(s=null){let t=s||It(),e=Date.now();try{await Ds([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:t});let r=Date.now()-e;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${r}ms)`,latency:r}}catch(n){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${n.message}`,latency:Date.now()-e}}}async function Os(s=null){let t=s||It();return t.useMainApi?await qo():await Jo(t)}async function qo(){let s=typeof window.parent<"u"?window.parent:window;try{if(s.SillyTavern?.getContext){let t=s.SillyTavern.getContext();if(t.settings?.api_server)return[t.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function Jo(s){if(!s.url||!s.apiKey)return[];try{let e=`${s.url.replace(/\/chat\/completions$/,"").replace(/\/completions$/,"")}/models`,n=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${s.apiKey}`}});if(!n.ok)return[];let r=await n.json();return r.data&&Array.isArray(r.data)?r.data.map(o=>o.id||o.name).filter(Boolean).sort():[]}catch{return[]}}var Yo,Ls=E(()=>{le();Yo={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var nr={};N(nr,{createPreset:()=>Le,createPresetFromCurrentConfig:()=>ti,deletePreset:()=>Ne,duplicatePreset:()=>Xo,exportPresets:()=>zs,generateUniquePresetName:()=>Ys,getActiveConfig:()=>Us,getActivePresetName:()=>Ue,getAllPresets:()=>Wt,getPreset:()=>Tt,getPresetNames:()=>Vo,getStarredPresets:()=>Ns,importPresets:()=>Bs,presetExists:()=>ce,renamePreset:()=>Ko,switchToPreset:()=>Zo,togglePresetStar:()=>js,updatePreset:()=>je,validatePreset:()=>ei});function Wt(){return Y()}function Vo(){return Y().map(t=>t.name)}function Tt(s){return!s||typeof s!="string"?null:Y().find(e=>e.name===s)||null}function ce(s){return!s||typeof s!="string"?!1:Y().some(e=>e.name===s)}function Le(s){let{name:t,description:e,apiConfig:n}=s;if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=t.trim();if(ce(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let o={name:r,description:e||"",apiConfig:{url:n?.url||"",apiKey:n?.apiKey||"",model:n?.model||"",useMainApi:n?.useMainApi??!0,max_tokens:n?.max_tokens||4096,temperature:n?.temperature??.7,top_p:n?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},i=Y();return i.push(o),ct(i),{success:!0,message:`\u9884\u8BBE "${r}" \u521B\u5EFA\u6210\u529F`,preset:o}}function je(s,t){if(!s||typeof s!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=Y(),n=e.findIndex(i=>i.name===s);if(n===-1)return{success:!1,message:`\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`};if(t.name&&t.name!==s)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let r=e[n],o={...r,...t,name:r.name,updatedAt:Date.now()};return t.apiConfig&&(o.apiConfig={...r.apiConfig,...t.apiConfig}),e[n]=o,ct(e),{success:!0,message:`\u9884\u8BBE "${s}" \u66F4\u65B0\u6210\u529F`,preset:o}}function Ne(s){if(!s||typeof s!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=Y(),e=t.findIndex(n=>n.name===s);return e===-1?{success:!1,message:`\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`}:(t.splice(e,1),ct(t),Ft()===s&&Ht(""),{success:!0,message:`\u9884\u8BBE "${s}" \u5DF2\u5220\u9664`})}function Ko(s,t){if(!s||typeof s!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=t.trim();if(!ce(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`};if(ce(e))return{success:!1,message:`\u9884\u8BBE "${e}" \u5DF2\u5B58\u5728`};let n=Y(),r=n.find(o=>o.name===s);return r&&(r.name=e,r.updatedAt=Date.now(),ct(n),Ft()===s&&Ht(e)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${e}"`}}function Xo(s,t){if(!s||typeof s!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=t.trim(),n=Tt(s);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`};if(ce(e))return{success:!1,message:`\u9884\u8BBE "${e}" \u5DF2\u5B58\u5728`};let r={...JSON.parse(JSON.stringify(n)),name:e,createdAt:Date.now(),updatedAt:Date.now()},o=Y();return o.push(r),ct(o),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${e}"`,preset:r}}function js(s){if(!s||typeof s!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=Y(),e=t.find(n=>n.name===s);return e?(e.starred=!e.starred,e.updatedAt=Date.now(),ct(t),{success:!0,message:e.starred?`\u5DF2\u5C06 "${s}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${s}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:e.starred}):{success:!1,message:`\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`}}function Ns(){return Y().filter(t=>t.starred===!0)}function Zo(s){if(!s)return Ht(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let t=Tt(s);return t?(Ht(s),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${s}"`,apiConfig:t.apiConfig}):{success:!1,message:`\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`}}function Ue(){return Ft()}function Us(){let s=Ft();if(s){let e=Tt(s);if(e)return{presetName:s,apiConfig:e.apiConfig}}return{presetName:"",apiConfig:I().apiConfig||{}}}function zs(s=null){if(s){let e=Tt(s);if(!e)throw new Error(`\u9884\u8BBE "${s}" \u4E0D\u5B58\u5728`);return JSON.stringify(e,null,2)}let t=Y();return JSON.stringify(t,null,2)}function Bs(s,t={overwrite:!1}){let e;try{e=JSON.parse(s)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(e)?e:[e];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let r=Y(),o=0;for(let i of n){if(!i.name||typeof i.name!="string"||!i.apiConfig||typeof i.apiConfig!="object")continue;let a=r.findIndex(c=>c.name===i.name);a>=0?t.overwrite&&(i.updatedAt=Date.now(),r[a]=i,o++):(i.createdAt=i.createdAt||Date.now(),i.updatedAt=Date.now(),r.push(i),o++)}return o>0&&ct(r),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${o} \u4E2A\u9884\u8BBE`,imported:o}}function ti(s,t=""){let e=I();return Le({name:s,description:t,apiConfig:e.apiConfig})}function ei(s){let t=[];return(!s.name||typeof s.name!="string"||!s.name.trim())&&t.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!s.apiConfig||typeof s.apiConfig!="object")&&t.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:t.length===0,errors:t}}function Ys(s){(!s||typeof s!="string")&&(s="\u65B0\u9884\u8BBE");let t=Y(),e=new Set(t.map(r=>r.name));if(!e.has(s))return s;let n=1;for(;e.has(`${s} (${n})`);)n++;return`${s} (${n})`}var ze=E(()=>{le()});var h,Gs,x,G=E(()=>{h={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",TOOL_TRIGGER_INITIALIZED:"tool:triggerInitialized",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",TRIGGER_REGISTERED:"trigger:registered",TRIGGER_UNREGISTERED:"trigger:unregistered",TRIGGER_FIRED:"trigger:fired",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_EXECUTION_REQUESTED:"tool:executionRequested",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},Gs=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(t,e,n={}){if(!t||typeof e!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:r=0}=n;this.listeners.has(t)||this.listeners.set(t,new Set);let o={callback:e,priority:r};return this.listeners.get(t).add(o),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${t}`),()=>this.off(t,e)}off(t,e){let n=this.listeners.get(t);if(n){for(let r of n)if(r.callback===e){n.delete(r);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${t}`)}}emit(t,e){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${t}`,e),this._addToHistory(t,e);let n=this.listeners.get(t);if(!n||n.size===0)return;let r=Array.from(n).sort((o,i)=>i.priority-o.priority);for(let{callback:o}of r)try{o(e)}catch(i){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${t}):`,i)}}once(t,e){let n=r=>{this.off(t,n),e(r)};return this.on(t,n)}wait(t,e=0){return new Promise((n,r)=>{let o=null,i=this.once(t,a=>{o&&clearTimeout(o),n(a)});e>0&&(o=setTimeout(()=>{i(),r(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${t}`))},e))})}hasListeners(t){let e=this.listeners.get(t);return e&&e.size>0}listenerCount(t){let e=this.listeners.get(t);return e?e.size:0}removeAllListeners(t){t?this.listeners.delete(t):this.listeners.clear()}setDebugMode(t){this.debugMode=t}_addToHistory(t,e){this.history.push({event:t,data:e,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(t){return t?this.history.filter(e=>e.event===t):[...this.history]}clearHistory(){this.history=[]}},x=new Gs});function m(s){return typeof s!="string"?"":s.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function p(s,t,e=3e3){t||(t=s==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let n=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(n.toastr){n.toastr[s](t,"YouYou \u5DE5\u5177\u7BB1",{timeOut:e,progressBar:!0});return}si(s,t,e),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${s.toUpperCase()}] ${t}`)}function nt(s,t,e={}){t||(t=s==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:n=3500,sticky:r=!1,noticeId:o=""}=e,i=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!i?.body){p(s,t,n);return}let a="yyt-top-notice-container",c="yyt-top-notice-styles",l=i.getElementById(a);if(l||(l=i.createElement("div"),l.id=a,l.style.cssText=`
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
    `,i.body.appendChild(l)),!i.getElementById(c)){let z=i.createElement("style");z.id=c,z.textContent=`
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
    `,i.head.appendChild(z)}if(o){let z=l.querySelector(`[data-notice-id="${o}"]`);z&&z.remove()}let y={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=i.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${s||"info"}`,o&&(u.dataset.noticeId=o);let g=i.createElement("span");g.className="yyt-top-notice__icon",g.textContent=y[s]||y.info;let f=i.createElement("div");f.className="yyt-top-notice__content",f.textContent=t;let v=i.createElement("button");v.className="yyt-top-notice__close",v.type="button",v.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),v.textContent="\xD7";let S=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};v.addEventListener("click",S),u.appendChild(g),u.appendChild(f),u.appendChild(v),l.appendChild(u),r||setTimeout(S,n)}function si(s,t,e){let n=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!n)return;let r=n.getElementById("yyt-fallback-toast");r&&r.remove();let o={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},i=o[s]||o.info,a=n.createElement("div");if(a.id="yyt-fallback-toast",a.style.cssText=`
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
  `,a.textContent=t,!n.getElementById("yyt-toast-styles")){let c=n.createElement("style");c.id="yyt-toast-styles",c.textContent=`
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `,n.head.appendChild(c)}n.body.appendChild(a),setTimeout(()=>{a.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{a.remove()},300)},e)}function C(){if(Qt)return Qt;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Qt=window.parent.jQuery,Qt}catch{}return window.jQuery&&(Qt=window.jQuery),Qt}function $(s){return s&&s.length>0}function Dt(s,t=d){if(!C()||!$(s))return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let n=s.find(`#${t}-model`).val()?.trim()||"",r=s.find(`#${t}-model-select`);return r.is(":visible")&&(n=r.val()||n),{url:s.find(`#${t}-api-url`).val()?.trim()||"",apiKey:s.find(`#${t}-api-key`).val()||"",model:n,useMainApi:s.find(`#${t}-use-main-api`).is(":checked"),max_tokens:parseInt(s.find(`#${t}-max-tokens`).val())||4096,temperature:parseFloat(s.find(`#${t}-temperature`).val())??.7,top_p:parseFloat(s.find(`#${t}-top-p`).val())??.9}}function qt(s,t,e=d){if(!C()||!$(s)||!t)return;s.find(`#${e}-api-url`).val(t.url||""),s.find(`#${e}-api-key`).val(t.apiKey||""),s.find(`#${e}-model`).val(t.model||""),s.find(`#${e}-max-tokens`).val(t.max_tokens||4096),s.find(`#${e}-temperature`).val(t.temperature??.7),s.find(`#${e}-top-p`).val(t.top_p??.9);let r=t.useMainApi??!0;s.find(`#${e}-use-main-api`).prop("checked",r);let i=s.find(`#${e}-custom-api-fields`);r?i.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):i.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),s.find(`#${e}-model`).show(),s.find(`#${e}-model-select`).hide()}function rr(s){let{id:t,title:e,body:n,width:r="380px",wide:o=!1}=s;return`
    <div class="yyt-dialog-overlay" id="${t}-overlay">
      <div class="yyt-dialog ${o?"yyt-dialog-wide":""}" style="${r!=="380px"?`width: ${r}`:""}">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${e}</span>
          <button class="yyt-dialog-close" id="${t}-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body">
          ${n}
        </div>
        <div class="yyt-dialog-footer">
          <button class="yyt-btn yyt-btn-secondary" id="${t}-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${t}-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `}function or(s,t,e={}){if(!C())return()=>{};let r=s.find(`#${t}-overlay`),o=()=>{r.remove(),e.onClose&&e.onClose()};return r.find(`#${t}-close, #${t}-cancel`).on("click",o),r.on("click",function(i){i.target===this&&o()}),r.find(`#${t}-save`).on("click",function(){e.onSave&&e.onSave(o)}),o}function _t(s,t){let e=new Blob([s],{type:"application/json"}),n=URL.createObjectURL(e),r=document.createElement("a");r.href=n,r.download=t,r.click(),URL.revokeObjectURL(n)}function Et(s){return new Promise((t,e)=>{let n=new FileReader;n.onload=r=>t(r.target.result),n.onerror=r=>e(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),n.readAsText(s)})}var d,Qt,rt=E(()=>{d="youyou_toolkit";Qt=null});var Be,V,Fs=E(()=>{G();rt();Be=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(t={}){this.initialized||(this.dependencies=t.services||{},this._subscribeEvents(),this.initialized=!0,x.emit(h.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(t,e){return!t||!e?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(t,{id:t,...e,render:e.render||(()=>""),bindEvents:e.bindEvents||(()=>{}),destroy:e.destroy||(()=>{}),getStyles:e.getStyles||(()=>"")}),!0)}unregister(t){this.destroyInstance(t),this.components.delete(t)}getComponent(t){return this.components.get(t)}render(t,e,n={}){let r=C();if(!r){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let o=this.components.get(t);if(!o){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${t}`);return}let i;if(typeof e=="string"?i=r(e):e&&e.jquery?i=e:e&&(i=r(e)),!$(i)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}this.destroyInstance(t);let a=o.render({...n,dependencies:this.dependencies});i.html(a),o.bindEvents(i,this.dependencies),this.activeInstances.set(t,{container:i,component:o,props:n}),x.emit(h.UI_RENDER_REQUESTED,{componentId:t})}destroyInstance(t){let e=this.activeInstances.get(t);e&&(e.component.destroy(e.container),this.activeInstances.delete(t))}switchTab(t){let e=this.currentTab;this.currentTab=t,x.emit(h.UI_TAB_CHANGED,{tabId:t,oldTab:e})}getCurrentTab(){return this.currentTab}switchSubTab(t,e){this.currentSubTab[t]=e,x.emit(h.UI_SUBTAB_CHANGED,{mainTab:t,subTab:e})}getCurrentSubTab(t){return this.currentSubTab[t]||""}getAllStyles(){let t="";return this.components.forEach((e,n)=>{e.getStyles&&(t+=e.getStyles())}),t}injectStyles(){let t="yyt-component-styles";if(document.getElementById(t))return;let e=document.createElement("style");e.id=t,e.textContent=this.getAllStyles(),document.head.appendChild(e)}setDependency(t,e){this.dependencies[t]=e}getDependency(t){return this.dependencies[t]}_subscribeEvents(){x.on(h.PRESET_UPDATED,()=>{}),x.on(h.TOOL_UPDATED,()=>{})}},V=new Be});var dt,yt,Hs=E(()=>{G();rt();Ls();ze();dt="",yt={id:"apiPresetPanel",render(s){let t=It(),e=Us(),n=Ue(),r=Wt(),a=Ns().slice(0,8),c=a.length>0?a.map(u=>this._renderPresetItem(u)).join(""):"",l=dt||n||"",y=l||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
              <div class="yyt-custom-select" id="${d}-preset-dropdown">
                <div class="yyt-select-trigger">
                  <span class="yyt-select-value" data-value="${m(l)}">${m(y)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${l?"":"yyt-selected"}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                  </div>
                  ${r.length>0?r.map(u=>this._renderSelectOption(u,l)).join(""):""}
                </div>
              </div>
              <button class="yyt-btn yyt-btn-secondary" id="${d}-load-preset" title="\u52A0\u8F7D\u9009\u4E2D\u9884\u8BBE">
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
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${d}-save-as-preset" style="margin-left: auto;">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
              </button>
            </div>
            
            ${this._renderApiConfigForm(t)}
          </div>
          
          <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
          <div class="yyt-panel-footer">
            <div class="yyt-footer-left">
              <button class="yyt-btn yyt-btn-secondary" id="${d}-import-presets">
                <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
              </button>
              <button class="yyt-btn yyt-btn-secondary" id="${d}-export-presets">
                <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
              </button>
              <input type="file" id="${d}-import-file" accept=".json" style="display:none">
            </div>
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-secondary" id="${d}-reset-api-config">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
              </button>
              <button class="yyt-btn yyt-btn-primary" id="${d}-save-api-config">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>
        </div>
      </div>
    `},_renderPresetItem(s){return`
      <div class="yyt-preset-item" data-preset-name="${m(s.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${m(s.name)}</div>
          <div class="yyt-preset-meta">
            ${s.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${m(s.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
    `},_renderSelectOption(s,t){let e=s.starred===!0,n=e?"yyt-option-star yyt-starred":"yyt-option-star",r=e?"\u2605":"\u2606";return`
      <div class="yyt-select-option ${s.name===t?"yyt-selected":""}" data-value="${m(s.name)}">
        <button class="${n}" data-preset="${m(s.name)}" title="${e?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${r}</button>
        <span class="yyt-option-text">${m(s.name)}</span>
      </div>
    `},_renderApiConfigForm(s){return`
      <div class="yyt-form-group">
        <div class="yyt-toggle-row">
          <div class="yyt-toggle-label">
            <span>\u4F7F\u7528SillyTavern\u4E3BAPI</span>
            <span class="yyt-toggle-hint">\u542F\u7528\u540E\u5C06\u4F7F\u7528SillyTavern\u5185\u7F6E\u7684API\u914D\u7F6E</span>
          </div>
          <label class="yyt-toggle">
            <input type="checkbox" id="${d}-use-main-api" ${s.useMainApi?"checked":""}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div id="${d}-custom-api-fields" class="${s.useMainApi?"yyt-disabled":""}">
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API URL</label>
            <input type="text" class="yyt-input" id="${d}-api-url" 
                   value="${m(s.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${d}-api-key" 
                     value="${m(s.apiKey||"")}" 
                     placeholder="sk-...">
              <button class="yyt-btn yyt-btn-icon" id="${d}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>\u6A21\u578B</label>
            <div class="yyt-model-row">
              <input type="text" class="yyt-input yyt-model-input" id="${d}-model" 
                     value="${m(s.model||"")}" 
                     placeholder="gpt-4">
              <select class="yyt-select yyt-model-select" id="${d}-model-select" style="display: none;">
              </select>
              <button class="yyt-btn yyt-btn-secondary yyt-model-btn" id="${d}-load-models" title="\u83B7\u53D6\u6A21\u578B\u5217\u8868">
                <i class="fa-solid fa-sync-alt"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row yyt-form-row-2col">
          <div class="yyt-form-group">
            <label>Max Tokens</label>
            <input type="number" class="yyt-input" id="${d}-max-tokens" 
                   value="${s.max_tokens||4096}" min="1" max="128000">
          </div>
          
          <div class="yyt-form-group">
            <label>Temperature</label>
            <input type="number" class="yyt-input" id="${d}-temperature" 
                   value="${s.temperature??.7}" min="0" max="2" step="0.1">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>Top P</label>
            <input type="number" class="yyt-input" id="${d}-top-p" 
                   value="${s.top_p??.9}" min="0" max="1" step="0.1">
          </div>
        </div>
      </div>
    `},bindEvents(s,t){let e=C();!e||!$(s)||(this._bindDropdownEvents(s,e),this._bindPresetListEvents(s,e),this._bindApiConfigEvents(s,e),this._bindFileEvents(s,e))},_bindDropdownEvents(s,t){let e=s.find(`#${d}-preset-dropdown`),n=e.find(".yyt-select-trigger"),r=e.find(".yyt-select-value");n.on("click",function(o){o.stopPropagation(),e.toggleClass("yyt-open")}),e.find(".yyt-select-option").on("click",o=>{if(t(o.target).hasClass("yyt-option-star"))return;let i=t(o.currentTarget),a=i.data("value"),c=i.find(".yyt-option-text").text();if(r.text(c).data("value",a),e.find(".yyt-select-option").removeClass("yyt-selected"),i.addClass("yyt-selected"),e.removeClass("yyt-open"),a){let l=Tt(a);l&&qt(s,l.apiConfig,d)}}),e.find(".yyt-option-star").on("click",o=>{o.preventDefault(),o.stopPropagation();let i=t(o.currentTarget).data("preset");if(!i)return;let a=js(i);if(a.success){p("success",a.message);let c=s.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}else p("error",a.message)}),t(document).on("click.yyt-dropdown",o=>{t(o.target).closest(e).length||e.removeClass("yyt-open")})},_bindPresetListEvents(s,t){s.find(".yyt-preset-item").on("click",e=>{let n=t(e.currentTarget),r=n.data("preset-name"),o=t(e.target).closest("[data-action]").data("action");if(o)switch(e.stopPropagation(),o){case"load":let i=Tt(r);i&&(qt(s,i.apiConfig,d),dt=r,s.find(".yyt-preset-item").removeClass("yyt-loaded"),n.addClass("yyt-loaded"),p("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${r}"\uFF0C\u4FEE\u6539\u540E\u53EF\u70B9\u51FB"\u4FDD\u5B58\u914D\u7F6E"\u8986\u76D6\u6B64\u9884\u8BBE`));break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${r}" \u5417\uFF1F`)){let a=Ne(r);if(p(a.success?"info":"error",a.message),a.success){dt===r&&(dt="");let c=s.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}}break}})},_bindApiConfigEvents(s,t){s.find(`#${d}-use-main-api`).on("change",function(){let e=t(this).is(":checked"),n=s.find(`#${d}-custom-api-fields`);e?n.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):n.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),s.find(`#${d}-toggle-key-visibility`).on("click",function(){let e=s.find(`#${d}-api-key`),n=e.attr("type");e.attr("type",n==="password"?"text":"password"),t(this).find("i").toggleClass("fa-eye fa-eye-slash")}),s.find(`#${d}-load-models`).on("click",async()=>{let e=s.find(`#${d}-load-models`),n=s.find(`#${d}-model`),r=s.find(`#${d}-model-select`);e.prop("disabled",!0).find("i").addClass("fa-spin");try{let o=Dt(s,d),i=await Os(o);if(i.length>0){r.empty(),i.forEach(c=>{r.append(`<option value="${m(c)}">${m(c)}</option>`)}),n.hide(),r.show();let a=n.val();a&&i.includes(a)&&r.val(a),r.off("change").on("change",function(){n.val(t(this).val())}),p("success",`\u5DF2\u52A0\u8F7D ${i.length} \u4E2A\u6A21\u578B`)}else p("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(o){p("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${o.message}`)}finally{e.prop("disabled",!1).find("i").removeClass("fa-spin")}}),s.find(`#${d}-model`).on("focus",function(){let e=s.find(`#${d}-model-select`);t(this).show(),e.hide()}),s.find(`#${d}-save-api-config`).on("click",()=>{let e=Dt(s,d),n=Oe(e);if(!n.valid&&!e.useMainApi){p("error",n.errors.join(", "));return}if(dt){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${dt}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E`)){Rt(e),p("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58");return}Rt(e);let o=je(dt,{apiConfig:e});if(o.success){p("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${dt}"`),x.emit(h.PRESET_UPDATED,{name:dt});let i=s.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}else p("error",o.message);return}let r=Ue();if(r){Rt(e),je(r,{apiConfig:e}),p("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58");return}Rt(e),p("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),s.find(`#${d}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){Rt({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9});let e=s.closest(".yyt-api-manager").parent();e.length&&this.renderTo(e),p("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),s.find(`#${d}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(s,t)})},_bindFileEvents(s,t){s.find(`#${d}-export-presets`).on("click",()=>{try{let e=zs();_t(e,`youyou_toolkit_presets_${Date.now()}.json`),p("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(e){p("error",`\u5BFC\u51FA\u5931\u8D25: ${e.message}`)}}),s.find(`#${d}-import-presets`).on("click",()=>{s.find(`#${d}-import-file`).click()}),s.find(`#${d}-import-file`).on("change",async e=>{let n=e.target.files[0];if(n){try{let r=await Et(n),o=Bs(r,{overwrite:!0});if(p(o.success?"success":"error",o.message),o.imported>0){let i=s.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}}catch(r){p("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}t(e.target).val("")}})},_showSavePresetDialog(s,t){let n=Wt().map(y=>y.name),r=Ys("\u65B0\u9884\u8BBE"),o=`
      <div class="yyt-dialog-overlay" id="${d}-dialog-overlay">
        <div class="yyt-dialog">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">\u4FDD\u5B58\u4E3A\u65B0\u9884\u8BBE</span>
            <button class="yyt-dialog-close" id="${d}-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-group">
              <label>\u9884\u8BBE\u540D\u79F0</label>
              <input type="text" class="yyt-input" id="${d}-dialog-preset-name" 
                     value="${m(r)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09</label>
              <textarea class="yyt-textarea" id="${d}-dialog-preset-desc" rows="2" 
                        placeholder="\u9884\u8BBE\u63CF\u8FF0..."></textarea>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${d}-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="${d}-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;t(`#${d}-dialog-overlay`).remove(),s.append(o);let i=t(`#${d}-dialog-overlay`),a=t(`#${d}-dialog-preset-name`),c=t(`#${d}-dialog-preset-desc`);a.focus().select();let l=()=>i.remove();i.find(`#${d}-dialog-close, #${d}-dialog-cancel`).on("click",l),i.on("click",function(y){y.target===this&&l()}),i.find(`#${d}-dialog-save`).on("click",()=>{let y=a.val().trim(),u=c.val().trim();if(!y){p("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),a.focus();return}if(n.includes(y)){if(!confirm(`\u9884\u8BBE "${y}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;Ne(y)}let g=Dt(s,d),f=Le({name:y,description:u,apiConfig:g});if(f.success){p("success",f.message),l(),x.emit(h.PRESET_CREATED,{preset:f.preset});let v=s.closest(".yyt-api-manager").parent();v.length&&this.renderTo(v)}else p("error",f.message)}),a.on("keypress",function(y){y.which===13&&i.find(`#${d}-dialog-save`).click()})},destroy(s){let t=C();!t||!$(s)||(s.find("*").off(),t(document).off("click.yyt-dropdown"))},getStyles(){return`
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
    `},renderTo(s){let t=this.render({});s.html(t),this.bindEvents(s,{})}}});var br={};N(br,{MESSAGE_MACROS:()=>mr,addTagRule:()=>Jt,createRuleTemplate:()=>yr,default:()=>ri,deleteRulePreset:()=>gr,deleteRuleTemplate:()=>ur,deleteTagRule:()=>de,escapeRegex:()=>Ot,exportRulesConfig:()=>Je,extractComplexTag:()=>ar,extractCurlyBraceTag:()=>Js,extractHtmlFormatTag:()=>lr,extractSimpleTag:()=>qs,extractTagContent:()=>Lt,generateTagSuggestions:()=>Fe,getAllRulePresets:()=>Qe,getAllRuleTemplates:()=>cr,getContentBlacklist:()=>jt,getRuleTemplate:()=>dr,getTagRules:()=>pt,importRulesConfig:()=>Ve,isValidTagName:()=>Qs,loadRulePreset:()=>qe,saveRulesAsPreset:()=>We,scanTextForTags:()=>Ge,setContentBlacklist:()=>ye,setTagRules:()=>He,shouldSkipContent:()=>Ws,testRegex:()=>fr,updateRuleTemplate:()=>pr,updateTagRule:()=>Vt});function Ye(){let s=I();return F=s.ruleTemplates||[...ir],R=s.tagRules||[],K=s.contentBlacklist||[],{ruleTemplates:F,tagRules:R,contentBlacklist:K}}function Ot(s){return typeof s!="string"?"":s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ws(s,t){if(!t||t.length===0||!s||typeof s!="string")return!1;let e=s.toLowerCase();return t.some(n=>{let r=n.trim().toLowerCase();return r&&e.includes(r)})}function Qs(s){return!s||typeof s!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(s)&&!ni.includes(s.toLowerCase())}function qs(s,t){if(!s||!t)return[];let e=[],n=Ot(t),r=new RegExp(`<${n}>([\\s\\S]*?)<\\/${n}>`,"gi");[...s.matchAll(r)].forEach(c=>{c[1]&&e.push(c[1].trim())});let i=(s.match(new RegExp(`<${n}>`,"gi"))||[]).length,a=(s.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return i>a&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${i-a} \u4E2A\u672A\u95ED\u5408\u7684 <${t}> \u6807\u7B7E`),e}function Js(s,t){if(!s||!t)return[];let e=[],n=Ot(t),r=new RegExp(`\\{${n}\\|`,"gi"),o;for(;(o=r.exec(s))!==null;){let i=o.index,a=i+o[0].length,c=1,l=a;for(;l<s.length&&c>0;)s[l]==="{"?c++:s[l]==="}"&&c--,l++;if(c===0){let y=s.substring(a,l-1);y.trim()&&e.push(y.trim())}r.lastIndex=i+1}return e}function ar(s,t){if(!s||!t)return[];let e=t.split(",");if(e.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${t}`),[];let n=e[0].trim(),r=e[1].trim(),o=r.match(/<\/(\w+)>/);if(!o)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${r}`),[];let i=o[1],a=new RegExp(`${Ot(n)}([\\s\\S]*?)<\\/${i}>`,"gi"),c=[];return[...s.matchAll(a)].forEach(y=>{y[1]&&c.push(y[1].trim())}),c}function lr(s,t){if(!s||!t)return[];let e=t.match(/<(\w+)(?:\s[^>]*)?>/);if(!e)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${t}`),[];let n=e[1],r=[],o=new RegExp(`<${n}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${n}>`,"gi");[...s.matchAll(o)].forEach(l=>{l[1]&&r.push(l[1].trim())});let a=(s.match(new RegExp(`<${n}(?:\\s[^>]*)?>`,"gi"))||[]).length,c=(s.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return a>c&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${a-c} \u4E2A\u672A\u95ED\u5408\u7684 <${n}> \u6807\u7B7E`),r}function Lt(s,t,e=[]){if(!s)return"";if(!t||t.length===0)return s;let n=t.filter(y=>y.type==="exclude"&&y.enabled),r=t.filter(y=>(y.type==="include"||y.type==="regex_include")&&y.enabled),o=t.filter(y=>y.type==="regex_exclude"&&y.enabled),i=s;for(let y of n)try{let u=new RegExp(`<${Ot(y.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Ot(y.value)}>`,"gi");i=i.replace(u,"")}catch(u){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:y,error:u})}let a=[];if(r.length>0)for(let y of r){let u=[];try{if(y.type==="include")u.push(...qs(i,y.value)),u.push(...Js(i,y.value));else if(y.type==="regex_include"){let g=new RegExp(y.value,"gi");[...i.matchAll(g)].forEach(v=>{v[1]&&u.push(v[1])})}}catch(g){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:y,error:g})}u.forEach(g=>a.push(g.trim()))}else a.push(i);let c=[];for(let y of a){for(let u of o)try{let g=new RegExp(u.value,"gi");y=y.replace(g,"")}catch(g){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:u,error:g})}Ws(y,e)||c.push(y)}return c.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function Ge(s,t={}){let e=performance.now(),{chunkSize:n=5e4,maxTags:r=100,timeoutMs:o=5e3}=t,i=new Set,a=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,c=0,l=0;for(let u=0;u<s.length;u+=n){let g=s.slice(u,Math.min(u+n,s.length));if(l++,c+=g.length,performance.now()-e>o){console.warn(`[YouYouToolkit] Tag scanning timed out after ${o}ms`);break}let f;for(;(f=a.exec(g))!==null&&i.size<r;){let v=(f[1]||f[2]).toLowerCase();Qs(v)&&i.add(v)}if(i.size>=r)break;l%5===0&&await new Promise(v=>setTimeout(v,0))}let y=performance.now();return{tags:Array.from(i).sort(),stats:{processingTimeMs:Math.round(y-e),processedChars:c,totalChars:s.length,chunkCount:l,tagsFound:i.size}}}function Fe(s,t=25){let e=s.tags.slice(0,t);return{suggestions:e,stats:{totalFound:s.stats.tagsFound,finalCount:e.length}}}function cr(){return F.length===0&&Ye(),F}function dr(s){return F.find(t=>t.id===s)}function yr(s){let t={id:`rule-${Date.now()}`,name:s.name||"\u65B0\u89C4\u5219",description:s.description||"",type:s.type||"include",value:s.value||"",enabled:s.enabled!==!1,createdAt:new Date().toISOString()};return F.push(t),Vs(),{success:!0,template:t,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function pr(s,t){let e=F.findIndex(n=>n.id===s);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(F[e]={...F[e],...t,updatedAt:new Date().toISOString()},Vs(),{success:!0,template:F[e],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function ur(s){let t=F.findIndex(e=>e.id===s);return t===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(F.splice(t,1),Vs(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function Vs(){let s=I();s.ruleTemplates=F,J(s)}function pt(){return R||Ye(),R}function He(s){R=s||[];let t=I();t.tagRules=R,J(t)}function Jt(s){let t={id:`tag-${Date.now()}`,type:s.type||"include",value:s.value||"",enabled:s.enabled!==!1};R.push(t);let e=I();return e.tagRules=R,J(e),{success:!0,rule:t,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function Vt(s,t){if(s<0||s>=R.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};R[s]={...R[s],...t};let e=I();return e.tagRules=R,J(e),{success:!0,rule:R[s],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function de(s){if(s<0||s>=R.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};R.splice(s,1);let t=I();return t.tagRules=R,J(t),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function jt(){return K||Ye(),K}function ye(s){K=s||[];let t=I();t.contentBlacklist=K,J(t)}function We(s,t=""){if(!s||!s.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=I();e.tagRulePresets||(e.tagRulePresets={});let n=`preset-${Date.now()}`;return e.tagRulePresets[n]={id:n,name:s.trim(),description:t.trim(),rules:JSON.parse(JSON.stringify(R)),blacklist:JSON.parse(JSON.stringify(K)),createdAt:new Date().toISOString()},J(e),{success:!0,preset:e.tagRulePresets[n],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function Qe(){let t=I().tagRulePresets||{};return Object.values(t)}function qe(s){let t=I(),n=(t.tagRulePresets||{})[s];return n?(R=JSON.parse(JSON.stringify(n.rules||[])),K=JSON.parse(JSON.stringify(n.blacklist||[])),t.tagRules=R,t.contentBlacklist=K,J(t),{success:!0,preset:n,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function gr(s){let t=I(),e=t.tagRulePresets||{};return e[s]?(delete e[s],t.tagRulePresets=e,J(t),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Je(){return JSON.stringify({tagRules:R,contentBlacklist:K,ruleTemplates:F,tagRulePresets:I().tagRulePresets||{}},null,2)}function Ve(s,t={overwrite:!0}){try{let e=JSON.parse(s);if(t.overwrite)R=e.tagRules||[],K=e.contentBlacklist||[],F=e.ruleTemplates||ir;else if(e.tagRules&&R.push(...e.tagRules),e.contentBlacklist){let r=new Set(K.map(o=>o.toLowerCase()));e.contentBlacklist.forEach(o=>{r.has(o.toLowerCase())||K.push(o)})}let n=I();return n.tagRules=R,n.contentBlacklist=K,n.ruleTemplates=F,e.tagRulePresets&&(n.tagRulePresets={...n.tagRulePresets||{},...e.tagRulePresets}),J(n),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(e){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${e.message}`}}}function fr(s,t,e="g",n=0){try{if(!s||typeof s!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let r=new RegExp(s,e),o=[];if(e.includes("g")){let i;for(;(i=r.exec(t))!==null;)i.length>1?o.push({fullMatch:i[0],groups:i.slice(1),index:i.index,extracted:i[n]||i[1]||i[0]}):o.push({fullMatch:i[0],groups:[],index:i.index,extracted:i[0]})}else{let i=r.exec(t);i&&o.push({fullMatch:i[0],groups:i.length>1?i.slice(1):[],index:i.index,extracted:i.length>1?i[n]||i[1]:i[0]})}return{success:!0,matches:o,count:o.length,extracted:o.map(i=>i.extracted)}}catch(r){return{success:!1,error:r.message,matches:[]}}}var ni,ir,F,R,K,mr,ri,Ke=E(()=>{le();ni=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],ir=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],F=[],R=[],K=[];mr={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};Ye();ri={extractTagContent:Lt,extractSimpleTag:qs,extractCurlyBraceTag:Js,extractComplexTag:ar,extractHtmlFormatTag:lr,escapeRegex:Ot,shouldSkipContent:Ws,isValidTagName:Qs,scanTextForTags:Ge,generateTagSuggestions:Fe,getAllRuleTemplates:cr,getRuleTemplate:dr,createRuleTemplate:yr,updateRuleTemplate:pr,deleteRuleTemplate:ur,getTagRules:pt,setTagRules:He,addTagRule:Jt,updateTagRule:Vt,deleteTagRule:de,getContentBlacklist:jt,setContentBlacklist:ye,saveRulesAsPreset:We,getAllRulePresets:Qe,loadRulePreset:qe,deleteRulePreset:gr,exportRulesConfig:Je,importRulesConfig:Ve,testRegex:fr,MESSAGE_MACROS:mr}});var ut,Ks=E(()=>{G();rt();Ke();ut={id:"regexExtractPanel",render(s){let t=pt(),e=jt(),n=Qe();return`
      <div class="yyt-regex-panel">
        <!-- \u89C4\u5219\u7F16\u8F91\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-filter"></i>
            <span>\u6807\u7B7E\u63D0\u53D6\u89C4\u5219</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${d}-show-examples" style="margin-left: auto;">
              <i class="fa-solid fa-lightbulb"></i> \u67E5\u770B\u793A\u4F8B
            </button>
          </div>
          
          ${this._renderRulesEditor(t,e,n)}
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
            <button class="yyt-btn yyt-btn-secondary" id="${d}-import-rules">
              <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${d}-export-rules">
              <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
            </button>
            <input type="file" id="${d}-import-rules-file" accept=".json" style="display:none">
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${d}-reset-rules">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
            </button>
          </div>
        </div>
        
        <!-- \u6807\u7B7E\u626B\u63CF\u7ED3\u679C\u5BB9\u5668 -->
        <div id="${d}-tag-suggestions-container" style="display: none;">
          <div class="yyt-tag-suggestions">
            <div class="yyt-tag-suggestions-header">
              <span>\u53D1\u73B0\u7684\u6807\u7B7E:</span>
              <span id="${d}-tag-scan-stats"></span>
            </div>
            <div class="yyt-tag-list" id="${d}-tag-list"></div>
          </div>
        </div>
      </div>
    `},_renderRulesEditor(s,t,e){let n=s.length>0?s.map((o,i)=>this._renderRuleItem(o,i)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',r=e.length>0?e.map(o=>`<option value="${o.id}">${m(o.name)}</option>`).join(""):"";return`
      <div class="yyt-tag-rules-editor">
        ${r?`
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${d}-rule-preset-select">
            <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
            ${r}
          </select>
          <button class="yyt-btn yyt-btn-secondary" id="${d}-load-rule-preset">
            <i class="fa-solid fa-download"></i> \u52A0\u8F7D
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${d}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u9884\u8BBE
          </button>
        </div>
        `:`
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-secondary" id="${d}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
          </button>
        </div>
        `}
        
        <div class="yyt-rules-list">
          ${n}
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${d}-add-rule">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u89C4\u5219
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${d}-scan-tags">
            <i class="fa-solid fa-search"></i> \u626B\u63CF\u6807\u7B7E
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${d}-add-exclude-cot">
            <i class="fa-solid fa-ban"></i> \u6392\u9664\u5C0FCoT
          </button>
        </div>
        
        <!-- \u9ED1\u540D\u5355\u8BBE\u7F6E -->
        <div class="yyt-form-group">
          <label>\u5185\u5BB9\u9ED1\u540D\u5355\uFF08\u5305\u542B\u8FD9\u4E9B\u5173\u952E\u8BCD\u7684\u5185\u5BB9\u5C06\u88AB\u8FC7\u6EE4\uFF0C\u7528\u9017\u53F7\u5206\u9694\uFF09</label>
          <input type="text" class="yyt-input" id="${d}-content-blacklist" 
                 value="${m(t.join(", "))}" 
                 placeholder="\u5173\u952E\u8BCD1, \u5173\u952E\u8BCD2, ...">
        </div>
      </div>
    `},_renderRuleItem(s,t){return`
      <div class="yyt-rule-item" data-rule-index="${t}">
        <select class="yyt-select yyt-rule-type" style="flex: 2; min-width: 100px;">
          <option value="include" ${s.type==="include"?"selected":""}>\u5305\u542B</option>
          <option value="regex_include" ${s.type==="regex_include"?"selected":""}>\u6B63\u5219\u5305\u542B</option>
          <option value="exclude" ${s.type==="exclude"?"selected":""}>\u6392\u9664</option>
          <option value="regex_exclude" ${s.type==="regex_exclude"?"selected":""}>\u6B63\u5219\u6392\u9664</option>
        </select>
        <input type="text" class="yyt-input yyt-rule-value" style="flex: 5;" 
               placeholder="\u6807\u7B7E\u540D\u6216\u6B63\u5219\u8868\u8FBE\u5F0F" 
               value="${m(s.value||"")}">
        <label class="yyt-checkbox-label yyt-rule-enabled-label">
          <input type="checkbox" class="yyt-rule-enabled" ${s.enabled?"checked":""}>
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
          <textarea class="yyt-textarea" id="${d}-test-input" rows="6" 
                    placeholder="\u8F93\u5165\u8981\u6D4B\u8BD5\u63D0\u53D6\u7684\u6587\u672C\u5185\u5BB9..."></textarea>
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${d}-test-extract">
            <i class="fa-solid fa-play"></i> \u6D4B\u8BD5\u63D0\u53D6
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${d}-test-clear">
            <i class="fa-solid fa-eraser"></i> \u6E05\u7A7A
          </button>
        </div>
        
        <div class="yyt-form-group" id="${d}-test-result-container" style="display: none;">
          <label>\u63D0\u53D6\u7ED3\u679C</label>
          <div class="yyt-test-result" id="${d}-test-result"></div>
        </div>
      </div>
    `},bindEvents(s,t){let e=C();!e||!$(s)||(this._bindRuleEditorEvents(s,e),this._bindPresetEvents(s,e),this._bindTestEvents(s,e),this._bindFileEvents(s,e))},_bindRuleEditorEvents(s,t){s.find(".yyt-rule-type").on("change",function(){let n=t(this).closest(".yyt-rule-item").data("rule-index"),r=t(this).val();Vt(n,{type:r}),p("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),s.find(".yyt-rule-value").on("change",function(){let n=t(this).closest(".yyt-rule-item").data("rule-index"),r=t(this).val().trim();Vt(n,{value:r})}),s.find(".yyt-rule-enabled").on("change",function(){let n=t(this).closest(".yyt-rule-item").data("rule-index"),r=t(this).is(":checked");Vt(n,{enabled:r}),p("info",r?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),s.find(".yyt-rule-delete").on("click",()=>{let n=s.find(".yyt-rule-delete").closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(de(n),this.renderTo(s),p("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),s.on("click",".yyt-rule-delete",e=>{let r=t(e.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(de(r),this.renderTo(s),p("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),s.find(`#${d}-add-rule`).on("click",()=>{Jt({type:"include",value:"",enabled:!0}),this.renderTo(s),p("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),s.find(`#${d}-scan-tags`).on("click",async()=>{let e=s.find(`#${d}-scan-tags`),n=s.find(`#${d}-test-input`).val();if(!n||!n.trim()){p("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}e.prop("disabled",!0).find("i").addClass("fa-spin");try{let r=await Ge(n,{maxTags:50,timeoutMs:3e3}),{suggestions:o,stats:i}=Fe(r,25);if(o.length===0){p("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),s.find(`#${d}-tag-suggestions-container`).hide();return}let a=s.find(`#${d}-tag-list`);s.find(`#${d}-tag-scan-stats`).text(`${i.finalCount}/${i.totalFound} \u4E2A\u6807\u7B7E, ${r.stats.processingTimeMs}ms`),a.empty(),o.forEach(l=>{let y=t(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${m(l)}</button>`);y.on("click",()=>{if(pt().some(f=>f.type==="include"&&f.value===l)){p("warning",`\u89C4\u5219 "\u5305\u542B: ${l}" \u5DF2\u5B58\u5728`);return}Jt({type:"include",value:l,enabled:!0}),this.renderTo(s),p("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${l}"`)}),a.append(y)}),s.find(`#${d}-tag-suggestions-container`).show(),p("success",`\u53D1\u73B0 ${o.length} \u4E2A\u6807\u7B7E`)}catch(r){p("error",`\u626B\u63CF\u5931\u8D25: ${r.message}`)}finally{e.prop("disabled",!1).find("i").removeClass("fa-spin")}}),s.find(`#${d}-add-exclude-cot`).on("click",()=>{let e=pt(),n="<!--[\\s\\S]*?-->";if(e.some(o=>o.type==="regex_exclude"&&o.value===n)){p("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}Jt({type:"regex_exclude",value:n,enabled:!0}),this.renderTo(s),p("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),s.find(`#${d}-content-blacklist`).on("change",function(){let n=t(this).val().split(",").map(r=>r.trim()).filter(r=>r);ye(n),p("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${n.length} \u4E2A\u5173\u952E\u8BCD`)}),s.find(`#${d}-show-examples`).on("click",()=>{alert(`
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
      `)})},_bindPresetEvents(s,t){s.find(`#${d}-load-rule-preset`).on("click",()=>{let e=s.find(`#${d}-rule-preset-select`).val();if(!e){p("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let n=qe(e);n.success?(this.renderTo(s),p("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${n.preset.name}`),x.emit(h.REGEX_PRESET_LOADED,{preset:n.preset})):p("error",n.message)}),s.find(`#${d}-save-rule-preset`).on("click",()=>{let e=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!e||!e.trim())return;let n=We(e.trim());n.success?(this.renderTo(s),p("success",`\u9884\u8BBE "${e.trim()}" \u5DF2\u4FDD\u5B58`)):p("error",n.message)})},_bindTestEvents(s,t){s.find(`#${d}-test-extract`).on("click",()=>{let e=s.find(`#${d}-test-input`).val();if(!e||!e.trim()){p("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let n=pt(),r=jt(),o=Lt(e,n,r),i=s.find(`#${d}-test-result-container`),a=s.find(`#${d}-test-result`);i.show(),!o||!o.trim()?(a.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),p("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(a.html(`<pre class="yyt-code-block">${m(o)}</pre>`),p("success","\u63D0\u53D6\u5B8C\u6210"),x.emit(h.REGEX_EXTRACTED,{result:o}))}),s.find(`#${d}-test-clear`).on("click",()=>{s.find(`#${d}-test-input`).val(""),s.find(`#${d}-test-result-container`).hide()})},_bindFileEvents(s,t){s.find(`#${d}-import-rules`).on("click",()=>{s.find(`#${d}-import-rules-file`).click()}),s.find(`#${d}-import-rules-file`).on("change",async e=>{let n=e.target.files[0];if(n){try{let r=await Et(n),o=Ve(r,{overwrite:!0});o.success?(this.renderTo(s),p("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):p("error",o.message)}catch(r){p("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}t(e.target).val("")}}),s.find(`#${d}-export-rules`).on("click",()=>{try{let e=Je();_t(e,`youyou_toolkit_rules_${Date.now()}.json`),p("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(e){p("error",`\u5BFC\u51FA\u5931\u8D25: ${e.message}`)}}),s.find(`#${d}-reset-rules`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(He([]),ye([]),this.renderTo(s),p("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(s){!C()||!$(s)||s.find("*").off()},getStyles(){return`
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
    `},renderTo(s){let t=this.render({});s.html(t),this.bindEvents(s,{})}}});var hr={};N(hr,{DEFAULT_TOOL_PRESETS:()=>ot,DEFAULT_TOOL_STRUCTURE:()=>Xs,TOOL_STORAGE_KEYS:()=>M,cloneTool:()=>ii,deleteTool:()=>oi,deleteToolPreset:()=>ci,exportTools:()=>en,getAllToolPresets:()=>tn,getAllTools:()=>Xe,getCurrentToolPresetId:()=>di,getTool:()=>pe,getToolPreset:()=>ai,importTools:()=>sn,resetTools:()=>nn,saveTool:()=>Ze,saveToolPreset:()=>li,setCurrentToolPreset:()=>yi,setToolEnabled:()=>Zs,validateTool:()=>pi});function Xe(){let s=P.get(M.TOOLS);return s&&typeof s=="object"?{...ot,...s}:{...ot}}function pe(s){return Xe()[s]||null}function Ze(s,t){if(!s||!t)return!1;let e=P.get(M.TOOLS)||{},n=!e[s]&&!ot[s],r={...Xs,...t,id:s,metadata:{...Xs.metadata,...t.metadata,updatedAt:new Date().toISOString()}};return e[s]||(r.metadata.createdAt=new Date().toISOString()),e[s]=r,P.set(M.TOOLS,e),x.emit(n?h.TOOL_REGISTERED:h.TOOL_UPDATED,{toolId:s,tool:r}),!0}function oi(s){if(ot[s])return!1;let t=P.get(M.TOOLS)||{};return t[s]?(delete t[s],P.set(M.TOOLS,t),x.emit(h.TOOL_UNREGISTERED,{toolId:s}),!0):!1}function Zs(s,t){let e=pe(s);if(!e)return!1;let n=P.get(M.TOOLS)||{};return n[s]||(n[s]={...e}),n[s].enabled=t,n[s].metadata={...n[s].metadata,updatedAt:new Date().toISOString()},P.set(M.TOOLS,n),x.emit(t?h.TOOL_ENABLED:h.TOOL_DISABLED,{toolId:s}),!0}function ii(s,t,e){let n=pe(s);if(!n)return!1;let r=JSON.parse(JSON.stringify(n));return r.name=e||`${n.name} (\u526F\u672C)`,r.metadata={...r.metadata,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},Ze(t,r)}function tn(){let s=P.get(M.PRESETS);return s&&typeof s=="object"?{...ot,...s}:{...ot}}function ai(s){return tn()[s]||null}function li(s,t){if(!s||!t)return!1;let e=P.get(M.PRESETS)||{};return e[s]={...t,metadata:{...t.metadata,updatedAt:new Date().toISOString()}},P.set(M.PRESETS,e),!0}function ci(s){if(ot[s])return!1;let t=P.get(M.PRESETS)||{};return t[s]?(delete t[s],P.set(M.PRESETS,t),!0):!1}function di(){return P.get(M.CURRENT_PRESET)||null}function yi(s){return tn()[s]?(P.set(M.CURRENT_PRESET,s),!0):!1}function en(){let s=P.get(M.TOOLS)||{},t=P.get(M.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:s,presets:t},null,2)}function sn(s,t=!1){try{let e=typeof t=="object"?!!t?.overwrite:!!t,n=JSON.parse(s);if(!n||typeof n!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let r=e?{}:P.get(M.TOOLS)||{},o=e?{}:P.get(M.PRESETS)||{},i=0,a=0;if(n.tools&&typeof n.tools=="object"){for(let[c,l]of Object.entries(n.tools))ot[c]&&!e||l&&typeof l=="object"&&(r[c]=l,i++);P.set(M.TOOLS,r)}if(n.presets&&typeof n.presets=="object"){for(let[c,l]of Object.entries(n.presets))ot[c]&&!e||l&&typeof l=="object"&&(o[c]=l,a++);P.set(M.PRESETS,o)}return{success:!0,toolsImported:i,presetsImported:a,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u5DE5\u5177\u548C ${a} \u4E2A\u9884\u8BBE`}}catch(e){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${e.message}`}}}function nn(){P.remove(M.TOOLS),P.remove(M.PRESETS),P.remove(M.CURRENT_PRESET)}function pi(s){let t=[];if(!s)return{valid:!1,errors:["\u5DE5\u5177\u5B9A\u4E49\u4E3A\u7A7A"]};if((!s.name||typeof s.name!="string")&&t.push("\u5DE5\u5177\u540D\u79F0\u65E0\u6548"),(!s.category||typeof s.category!="string")&&t.push("\u5DE5\u5177\u5206\u7C7B\u65E0\u6548"),s.config){let{trigger:e,execution:n,api:r,context:o}=s.config;e&&!["manual","event","scheduled"].includes(e.type)&&t.push("\u89E6\u53D1\u7C7B\u578B\u65E0\u6548"),n&&((typeof n.timeout!="number"||n.timeout<0)&&t.push("\u8D85\u65F6\u65F6\u95F4\u5FC5\u987B\u4E3A\u6B63\u6570"),(typeof n.retries!="number"||n.retries<0)&&t.push("\u91CD\u8BD5\u6B21\u6570\u5FC5\u987B\u4E3A\u6B63\u6570")),o&&typeof o.depth!="number"&&t.push("\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u5FC5\u987B\u4E3A\u6570\u5B57")}return{valid:t.length===0,errors:t}}var Xs,ot,M,rn=E(()=>{lt();G();Xs={id:"",name:"",description:"",category:"utility",config:{trigger:{type:"manual",events:[]},execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!0,bypassPreset:"standard"},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},ot={},M={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"}});var gt,on=E(()=>{rt();rn();gt={id:"toolManagePanel",render(s){let t=Xe();return`
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
    `},_renderToolList(s){return Object.entries(s).map(([t,e])=>`
      <div class="yyt-tool-item ${e.enabled?"yyt-enabled":"yyt-disabled"}" data-tool-id="${t}">
        <div class="yyt-tool-header">
          <div class="yyt-tool-info">
            <span class="yyt-tool-name">${m(e.name)}</span>
            <span class="yyt-tool-category">${m(e.category)}</span>
          </div>
          <div class="yyt-tool-controls">
            <label class="yyt-toggle yyt-tool-toggle">
              <input type="checkbox" ${e.enabled?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="yyt-tool-desc">${m(e.description)}</div>
      </div>
    `).join("")},bindEvents(s,t){let e=C();!e||!$(s)||(this._bindToolEvents(s,e),this._bindFileEvents(s,e))},_bindToolEvents(s,t){s.find(".yyt-tool-toggle input").on("change",e=>{let n=t(e.currentTarget).closest(".yyt-tool-item"),r=n.data("tool-id"),o=t(e.currentTarget).is(":checked");Zs(r,o),n.toggleClass("yyt-enabled",o).toggleClass("yyt-disabled",!o),p("info",o?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),s.find("#yyt-add-tool").on("click",()=>{this._showToolEditDialog(s,t,null)})},_bindFileEvents(s,t){s.find("#yyt-import-tools").on("click",()=>{s.find("#yyt-import-tools-file").click()}),s.find("#yyt-import-tools-file").on("change",async e=>{let n=e.target.files[0];if(n){try{let r=await Et(n),o=sn(r,{overwrite:!1});p(o.success?"success":"error",o.message),o.success&&this.renderTo(s)}catch(r){p("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}t(e.target).val("")}}),s.find("#yyt-export-tools").on("click",()=>{try{let e=en();_t(e,`youyou_toolkit_tools_${Date.now()}.json`),p("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(e){p("error",`\u5BFC\u51FA\u5931\u8D25: ${e.message}`)}}),s.find("#yyt-reset-tools").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(nn(),this.renderTo(s),p("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(s,t,e){let n=e?pe(e):null,r=!!n,o=`
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
                       value="${n?m(n.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${n?m(n.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;t("#yyt-tool-dialog-overlay").remove(),s.append(o);let i=t("#yyt-tool-dialog-overlay"),a=()=>i.remove();i.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",a),i.on("click",function(c){c.target===this&&a()}),i.find("#yyt-tool-dialog-save").on("click",()=>{let c=t("#yyt-tool-name").val().trim(),l=t("#yyt-tool-category").val(),y=t("#yyt-tool-desc").val().trim(),u=parseInt(t("#yyt-tool-timeout").val())||6e4,g=parseInt(t("#yyt-tool-retries").val())||3;if(!c){p("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let f=e||`tool_${Date.now()}`;Ze(f,{name:c,category:l,description:y,config:{trigger:{type:"manual",events:[]},execution:{timeout:u,retries:g},api:{preset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0}),a(),this.renderTo(s),p("success",r?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA")})},destroy(s){!C()||!$(s)||s.find("*").off()},getStyles(){return`
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
    `},renderTo(s){let t=this.render({});s.html(t),this.bindEvents(s,{})}}});var Dr={};N(Dr,{TOOL_CATEGORIES:()=>xr,TOOL_REGISTRY:()=>ts,clearToolApiPreset:()=>Ar,default:()=>bi,getAllDefaultToolConfigs:()=>es,getAllToolApiBindings:()=>Pr,getAllToolFullConfigs:()=>yn,getEnabledTools:()=>Mr,getToolApiPreset:()=>Cr,getToolConfig:()=>ln,getToolFullConfig:()=>O,getToolList:()=>Tr,getToolSubTabs:()=>_r,getToolWindowState:()=>Rr,hasTool:()=>cn,onPresetDeleted:()=>$r,registerTool:()=>vr,resetToolConfig:()=>kr,resetToolRegistry:()=>Er,saveToolConfig:()=>mt,saveToolWindowState:()=>Ir,setToolApiPreset:()=>Sr,setToolApiPresetConfig:()=>gi,setToolBypassConfig:()=>fi,setToolOutputMode:()=>ui,setToolPromptTemplate:()=>mi,unregisterTool:()=>wr,updateToolRuntime:()=>dn});function vr(s,t){if(!s||typeof s!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!t||typeof t!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let e=["name","icon","component"];for(let n of e)if(!t[n])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${n}`),!1;return ft[s]={id:s,...t,order:t.order??Object.keys(ft).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${s}`),!0}function wr(s){return ft[s]?(delete ft[s],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${s}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${s}`),!1)}function Tr(s=!0){let t=Object.values(ft);return s?t.sort((e,n)=>(e.order??0)-(n.order??0)):t}function ln(s){return ft[s]||null}function cn(s){return!!ft[s]}function _r(s){let t=ft[s];return!t||!t.hasSubTabs?[]:t.subTabs||[]}function Er(){ft={...ts},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Sr(s,t){if(!cn(s))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${s}`),!1;let e=b.get(St)||{};return e[s]=t||"",b.set(St,e),console.log(`[ToolRegistry] \u5DE5\u5177 "${s}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${t||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function Cr(s){return(b.get(St)||{})[s]||""}function Ar(s){let t=b.get(St)||{};delete t[s],b.set(St,t),console.log(`[ToolRegistry] \u5DE5\u5177 "${s}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function Pr(){return b.get(St)||{}}function $r(s){let t=b.get(St)||{},e=!1;for(let n in t)t[n]===s&&(t[n]="",e=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${n}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));e&&b.set(St,t)}function O(s){let t=ge[s];if(!t)return ln(s);let n=(b.get(ue)||{})[s]||{},r={...t,...n,id:s};return r.trigger={...t.trigger||{},...n.trigger||{}},r.output={...t.output||{},...n.output||{}},r.bypass={...t.bypass||{},...n.bypass||{}},r.runtime={...t.runtime||{},...n.runtime||{}},r.extraction={...t.extraction||{},...n.extraction||{}},r.injection={...t.injection||{},...n.injection||{}},(!Array.isArray(r.extraction.selectors)||r.extraction.selectors.length===0)&&Array.isArray(r.extractTags)&&r.extractTags.length>0&&(r.extraction.selectors=[...r.extractTags]),(!Array.isArray(r.extractTags)||r.extractTags.length===0)&&(r.extractTags=Array.isArray(r.extraction.selectors)?[...r.extraction.selectors]:[]),r}function mt(s,t){if(!s||!ge[s])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",s),!1;let e=b.get(ue)||{},n=["promptTemplate","enabled","extractTags","trigger","output","bypass","extraction","injection","runtime"];return e[s]={},n.forEach(r=>{t[r]!==void 0&&(e[s][r]=t[r])}),b.set(ue,e),x.emit(h.TOOL_UPDATED,{toolId:s,config:e[s]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${s}`),!0}function ui(s,t){let e=O(s);return e?mt(s,{...e,output:{...e.output,mode:t}}):!1}function gi(s,t){let e=O(s);return e?mt(s,{...e,output:{...e.output,apiPreset:t}}):!1}function fi(s,t){let e=O(s);return e?mt(s,{...e,bypass:{...e.bypass,...t}}):!1}function mi(s,t){let e=O(s);return e?mt(s,{...e,promptTemplate:t}):!1}function dn(s,t){let e=O(s);return e?mt(s,{...e,runtime:{...e.runtime,...t,lastRunAt:Date.now()}}):!1}function kr(s){if(!s||!ge[s])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",s),!1;let t=b.get(ue)||{};return delete t[s],b.set(ue,t),x.emit(h.TOOL_UPDATED,{toolId:s,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${s}`),!0}function es(){return{...ge}}function yn(){return Object.keys(ge).map(s=>O(s))}function Mr(){return yn().filter(s=>s&&s.enabled)}function Ir(s,t){let e=b.get(an)||{};e[s]={...t,updatedAt:Date.now()},b.set(an,e)}function Rr(s){return(b.get(an)||{})[s]||null}var ue,St,an,ge,ts,xr,ft,bi,fe=E(()=>{lt();G();ue="tool_configs",St="tool_api_bindings",an="tool_window_states",ge={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},injection:{enabled:!0,target:"__character__",comment:"YouYouToolkit:summaryTool",position:"at_depth_as_system",depth:4,order:1e4},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</boo_FM>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["boo_FM"]},statusBlock:{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",description:"\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u4EE3\u7801\u5757",enabled:!0,order:4,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["status_block"]},injection:{enabled:!0,target:"__character__",comment:"YouYouToolkit:statusBlock",position:"at_depth_as_system",depth:4,order:10001},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0B\u5BF9\u8BDD\u5185\u5BB9\u751F\u6210\u89D2\u8272\u72B6\u6001\u5757\uFF1A

\u8F93\u51FA\u683C\u5F0F\uFF1A
<status_block>
<name>\u89D2\u8272\u540D</name>
<location>\u4F4D\u7F6E</location>
<condition>\u72B6\u6001</condition>
<equipment>\u88C5\u5907</equipment>
<skills>\u6280\u80FD</skills>
</status_block>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["status_block"]}},ts={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{trigger:{type:"manual",events:[]},execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:3,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel"}]},bypass:{id:"bypass",name:"\u7834\u9650\u8BCD",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406\u7834\u9650\u8BCD\u9884\u8BBE",component:"BypassPanel",order:4},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:5}},xr={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},ft={...ts};bi={TOOL_REGISTRY:ts,TOOL_CATEGORIES:xr,registerTool:vr,unregisterTool:wr,getToolList:Tr,getToolConfig:ln,hasTool:cn,getToolSubTabs:_r,resetToolRegistry:Er,setToolApiPreset:Sr,getToolApiPreset:Cr,clearToolApiPreset:Ar,getAllToolApiBindings:Pr,onPresetDeleted:$r,saveToolWindowState:Ir,getToolWindowState:Rr,getToolFullConfig:O,saveToolConfig:mt,resetToolConfig:kr,getAllDefaultToolConfigs:es,getAllToolFullConfigs:yn,getEnabledTools:Mr}});var Or={};N(Or,{BypassManager:()=>ss,DEFAULT_BYPASS_PRESETS:()=>ht,addMessage:()=>Pi,buildBypassMessages:()=>Ri,bypassManager:()=>w,createPreset:()=>wi,default:()=>Di,deleteMessage:()=>ki,deletePreset:()=>_i,duplicatePreset:()=>Ei,exportPresets:()=>Mi,getAllPresets:()=>xi,getDefaultPresetId:()=>Si,getEnabledMessages:()=>Ai,getPreset:()=>vi,getPresetList:()=>un,importPresets:()=>Ii,setDefaultPresetId:()=>Ci,updateMessage:()=>$i,updatePreset:()=>Ti});var bt,Kt,pn,ht,hi,ss,w,xi,un,vi,wi,Ti,_i,Ei,Si,Ci,Ai,Pi,$i,ki,Mi,Ii,Ri,Di,me=E(()=>{lt();G();bt="bypass_presets",Kt="default_bypass_preset",pn="current_bypass_preset",ht={},hi=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),ss=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let t=b.get(bt,{});return this._cache={...ht,...t},this._cache}getPresetList(){let t=this.getAllPresets();return Object.values(t).sort((e,n)=>(n.updatedAt||0)-(e.updatedAt||0))}getPreset(t){return t&&this.getAllPresets()[t]||null}presetExists(t){return!!this.getPreset(t)}createPreset(t){let{id:e,name:n,description:r,messages:o}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!n||typeof n!="string"||!n.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let i=e.trim();if(this.presetExists(i))return{success:!1,message:`\u9884\u8BBE "${i}" \u5DF2\u5B58\u5728`};let a={id:i,name:n.trim(),description:r||"",enabled:!0,messages:o||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(i,a),x.emit(h.BYPASS_PRESET_CREATED,{presetId:i,preset:a}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${i}`),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:a}}updatePreset(t,e){if(!t)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let n=this.getPreset(t);if(!n)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.id&&e.id!==t)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let r={...n,...e,id:t,updatedAt:Date.now()};return this._savePreset(t,r),x.emit(h.BYPASS_PRESET_UPDATED,{presetId:t,preset:r}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${t}`),{success:!0,message:`\u9884\u8BBE "${n.name}" \u66F4\u65B0\u6210\u529F`,preset:r}}deletePreset(t){if(!t)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(ht[t])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let e=this.getPreset(t);if(!e)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};let n=b.get(bt,{});return delete n[t],b.set(bt,n),this._cache=null,this.getDefaultPresetId()===t&&this.setDefaultPresetId(null),x.emit(h.BYPASS_PRESET_DELETED,{presetId:t}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${t}`),{success:!0,message:`\u9884\u8BBE "${e.name}" \u5DF2\u5220\u9664`}}duplicatePreset(t,e,n){let r=this.getPreset(t);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if((!e||!e.trim())&&(e=`${t}_copy_${Date.now()}`),this.presetExists(e))return{success:!1,message:`\u9884\u8BBE "${e}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(r)),id:e.trim(),name:n||`${r.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(e.trim(),o),x.emit(h.BYPASS_PRESET_CREATED,{presetId:e,preset:o}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${o.name}"`,preset:o}}addMessage(t,e){let n=this.getPreset(t);if(!n)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};let r={id:`msg_${Date.now()}`,role:e.role||"SYSTEM",content:e.content||"",enabled:e.enabled!==!1,deletable:e.deletable!==!1},o=[...n.messages||[],r];return this.updatePreset(t,{messages:o})}updateMessage(t,e,n){let r=this.getPreset(t);if(!r)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};let o=r.messages||[],i=o.findIndex(c=>c.id===e);if(i===-1)return{success:!1,message:`\u6D88\u606F "${e}" \u4E0D\u5B58\u5728`};let a=[...o];return a[i]={...a[i],...n},this.updatePreset(t,{messages:a})}deleteMessage(t,e){let n=this.getPreset(t);if(!n)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};let r=n.messages||[],o=r.find(a=>a.id===e);if(!o)return{success:!1,message:`\u6D88\u606F "${e}" \u4E0D\u5B58\u5728`};if(o.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let i=r.filter(a=>a.id!==e);return this.updatePreset(t,{messages:i})}getEnabledMessages(t){let e=this.getPreset(t);return!e||!e.enabled?[]:(e.messages||[]).filter(n=>n.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let t=b.get(Kt,null);return t==="undefined"||t==="null"||t===""?(b.remove(Kt),null):t}setDefaultPresetId(t){return t&&!this.presetExists(t)?!1:(b.set(Kt,t),x.emit(h.BYPASS_PRESET_ACTIVATED,{presetId:t}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${t}`),!0)}getDefaultPreset(){let t=this.getDefaultPresetId();return t?this.getPreset(t):null}exportPresets(t=null){if(t){let n=this.getPreset(t);if(!n)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(n,null,2)}let e=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(e)},null,2)}importPresets(t,e={}){let{overwrite:n=!1}=e,r;try{r=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let o=Array.isArray(r)?r:r.presets?r.presets:[r];if(o.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let i=b.get(bt,{}),a=0;for(let c of o)!c.id||typeof c.id!="string"||c.name&&(ht[c.id]&&!n||!n&&i[c.id]||(i[c.id]={...c,updatedAt:Date.now()},a++));return a>0&&(b.set(bt,i),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u9884\u8BBE`,imported:a}}getToolBypassPreset(t){if(!t?.bypass?.enabled)return null;let e=t?.bypass?.presetId;return e?this.getPreset(e):this.getDefaultPreset()}buildBypassMessages(t){let e=this.getToolBypassPreset(t);return e?this.getEnabledMessages(e.id):[]}_savePreset(t,e){let n=b.get(bt,{});n[t]=e,b.set(bt,n),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let t=b.get(bt,{}),e={},n=!1,r=Array.isArray(t)?t.map((o,i)=>[o?.id||o?.name||`legacy_${i}`,o]):Object.entries(t||{});for(let[o,i]of r){let a=this._normalizePreset(o,i,e);if(!a){n=!0;continue}e[a.id]=a,(!t?.[a.id]||t?.[a.id]?.id!==a.id)&&(n=!0)}n&&b.set(bt,e),this._migrateDefaultPreset(e),this._cache=null,this._migrated=!0}_normalizePreset(t,e,n={}){if(!e||typeof e!="object")return null;let r=typeof e.name=="string"?e.name.trim():"",o=typeof e.id=="string"?e.id.trim():"",i=typeof t=="string"?t.trim():"";if(!r&&i&&i!=="undefined"&&i!=="null"&&(r=i),this._isLegacySamplePreset(r,o)||(!o&&i&&i!=="undefined"&&i!=="null"&&(o=i),!o&&r&&r!=="undefined"&&r!=="null"&&(o=this._generatePresetId(r,n)),!r||!o||o==="undefined"||r==="undefined"))return null;let c=Array.isArray(e.messages)?e.messages.filter(l=>l&&typeof l=="object").map((l,y)=>({id:typeof l.id=="string"&&l.id.trim()?l.id.trim():`${o}_msg_${y+1}`,role:l.role||"SYSTEM",content:typeof l.content=="string"?l.content:"",enabled:l.enabled!==!1,deletable:l.deletable!==!1})):[];return{...e,id:o,name:r,description:typeof e.description=="string"?e.description:"",enabled:e.enabled!==!1,messages:c,createdAt:e.createdAt||Date.now(),updatedAt:e.updatedAt||Date.now()}}_migrateDefaultPreset(t){let e=b.get(Kt,null),n=b.get(pn,null),r=e??n;(r==="undefined"||r==="null"||r==="")&&(r=null),r&&!t[r]&&(r=Object.values(t).find(i=>i.name===r)?.id||null),r?b.set(Kt,r):b.remove(Kt),b.has(pn)&&b.remove(pn)}_isLegacySamplePreset(t,e=""){return t?e==="standard"||e==="enhanced"||e==="jailbreak"||hi.has(t)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(t):!1}_generatePresetId(t,e={}){let n=String(t).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,r=n,o=1;for(;e[r];)r=`${n}_${o++}`;return r}_log(...t){this.debugMode&&console.log("[BypassManager]",...t)}},w=new ss,xi=()=>w.getAllPresets(),un=()=>w.getPresetList(),vi=s=>w.getPreset(s),wi=s=>w.createPreset(s),Ti=(s,t)=>w.updatePreset(s,t),_i=s=>w.deletePreset(s),Ei=(s,t,e)=>w.duplicatePreset(s,t,e),Si=()=>w.getDefaultPresetId(),Ci=s=>w.setDefaultPresetId(s),Ai=s=>w.getEnabledMessages(s),Pi=(s,t)=>w.addMessage(s,t),$i=(s,t,e)=>w.updateMessage(s,t,e),ki=(s,t)=>w.deleteMessage(s,t),Mi=s=>w.exportPresets(s),Ii=(s,t)=>w.importPresets(s,t),Ri=s=>w.buildBypassMessages(s),Di=w});var Ur={};N(Ur,{abortAllTasks:()=>Ui,abortTask:()=>Ni,buildToolMessages:()=>Nr,clearExecutionHistory:()=>Fi,createExecutionContext:()=>qi,createResult:()=>ns,enhanceMessagesWithBypass:()=>Ji,executeBatch:()=>ji,executeTool:()=>jr,executeToolWithConfig:()=>rs,executeToolsBatch:()=>Xi,executorState:()=>D,extractFailed:()=>Qi,extractSuccessful:()=>Wi,generateTaskId:()=>Nt,getExecutionHistory:()=>Gi,getExecutorStatus:()=>Yi,getScheduler:()=>Xt,getToolsForEvent:()=>fn,mergeResults:()=>Hi,pauseExecutor:()=>zi,resumeExecutor:()=>Bi,setMaxConcurrent:()=>Li});function ns(s,t,e,n,r,o,i=0){return{success:e,taskId:s,toolId:t,data:n,error:r,duration:o,retries:i,timestamp:Date.now(),metadata:{}}}function Nt(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function Oi(s,t={}){return{id:Nt(),toolId:s,options:t,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:t.maxRetries||3}}function Xt(){return be||(be=new gn(D.maxConcurrent)),be}function Li(s){D.maxConcurrent=Math.max(1,Math.min(10,s)),be&&(be.maxConcurrent=D.maxConcurrent)}async function jr(s,t={},e){let n=Xt(),r=Oi(s,t);for(;D.isPaused;)await new Promise(o=>setTimeout(o,100));try{let o=await n.enqueue(async i=>{if(i.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof e=="function")return await e(i,t);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},r);return Lr(o),o}catch(o){let i=ns(r.id,s,!1,null,o,Date.now()-r.createdAt,r.retries);return Lr(i),i}}async function ji(s,t={}){let{failFast:e=!1,concurrency:n=D.maxConcurrent}=t,r=[],o=Xt(),i=o.maxConcurrent;o.maxConcurrent=n;try{let a=s.map(({toolId:c,options:l,executor:y})=>jr(c,l,y));if(e)for(let c of a){let l=await c;if(r.push(l),!l.success){o.abortAll();break}}else{let c=await Promise.allSettled(a);for(let l of c)l.status==="fulfilled"?r.push(l.value):r.push(ns(Nt(),"unknown",!1,null,l.reason,0,0))}}finally{o.maxConcurrent=i}return r}function Ni(s){return Xt().abort(s)}function Ui(){Xt().abortAll(),D.executionQueue=[]}function zi(){D.isPaused=!0}function Bi(){D.isPaused=!1}function Yi(){return{...Xt().getStatus(),isPaused:D.isPaused,activeControllers:D.activeControllers.size,historyCount:D.executionHistory.length}}function Lr(s){D.executionHistory.push(s),D.executionHistory.length>100&&D.executionHistory.shift()}function Gi(s={}){let t=[...D.executionHistory];return s.toolId&&(t=t.filter(e=>e.toolId===s.toolId)),s.success!==void 0&&(t=t.filter(e=>e.success===s.success)),s.limit&&(t=t.slice(-s.limit)),t}function Fi(){D.executionHistory=[]}function Hi(s){let t={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let e of s)t.totalDuration+=e.duration,e.success?(t.successCount++,e.data!==void 0&&e.data!==null&&t.data.push(e.data)):(t.success=!1,t.failureCount++,e.error&&t.errors.push({taskId:e.taskId,toolId:e.toolId,error:e.error.message||String(e.error)}));return t}function Wi(s){return s.filter(t=>t.success).map(t=>t.data)}function Qi(s){return s.filter(t=>!t.success).map(t=>({taskId:t.taskId,toolId:t.toolId,error:t.error}))}function qi(s={}){return{taskId:Nt(),startTime:Date.now(),signal:s.signal||null,apiConfig:s.apiConfig||null,bypassMessages:s.bypassMessages||[],context:s.context||{},metadata:s.metadata||{}}}function Ji(s,t){return!t||t.length===0?s:[...t,...s]}function Vi(s){return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Nr(s,t){let e=[],n=s.promptTemplate||"",r={"{{userMessage}}":t.input?.userMessage||"","{{lastAiMessage}}":t.input?.lastAiMessage||"","{{extractedContent}}":t.input?.extractedContent||"","{{previousToolOutput}}":t.input?.previousToolOutput||"","{{context}}":JSON.stringify(t.input?.context||{}),"{{pg}}":t.input?.context?.pg||"1","{{time}}":t.input?.context?.time||"","{{scene}}":t.input?.context?.scene||"","{{plot}}":t.input?.context?.plot||"","{{mq}}":t.input?.context?.mq||"\u2160","{{mqStatus}}":t.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":t.input?.context?.sq||"1","{{sqStatus}}":t.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":t.input?.context?.latestSq||"1","{{completed}}":t.input?.context?.completed||"\u65E0","{{defined}}":t.input?.context?.defined||"","{{status}}":t.input?.context?.status||"","{{seeds}}":t.input?.context?.seeds||"","{{name}}":t.input?.context?.name||"","{{location}}":t.input?.context?.location||"","{{condition}}":t.input?.context?.condition||"","{{equipment}}":t.input?.context?.equipment||"","{{skills}}":t.input?.context?.skills||""};for(let[o,i]of Object.entries(r))n=n.replace(new RegExp(Vi(o),"g"),i);return e.push({role:"USER",content:n}),e}async function rs(s,t,e={}){let n=O(s);if(!n)return{success:!1,taskId:Nt(),toolId:s,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!n.enabled)return{success:!1,taskId:Nt(),toolId:s,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let r=Date.now(),o=Nt();try{x.emit(h.TOOL_EXECUTION_STARTED,{toolId:s,taskId:o,context:t});let i=Nr(n,t);if(typeof e.callApi=="function"){let a=n.apiPreset?{preset:n.apiPreset}:null,c=await e.callApi(i,a,e.signal),l=c;n.outputMode==="separate"&&n.extractTags?.length>0&&(l=Ki(c,n.extractTags));let y={success:!0,taskId:o,toolId:s,data:l,duration:Date.now()-r};return x.emit(h.TOOL_EXECUTED,{toolId:s,taskId:o,result:y}),y}else return{success:!0,taskId:o,toolId:s,data:{messages:i,config:{apiPreset:n.apiPreset,outputMode:n.outputMode,extractTags:n.extractTags}},duration:Date.now()-r,needsExecution:!0}}catch(i){let a={success:!1,taskId:o,toolId:s,error:i.message||String(i),duration:Date.now()-r};return x.emit(h.TOOL_EXECUTION_FAILED,{toolId:s,taskId:o,error:i}),a}}function Ki(s,t){let e={};for(let n of t){let r=new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"gi"),o=s.match(r);o&&(e[n]=o.map(i=>{let a=i.match(new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"i"));return a?a[1].trim():""}))}return e}async function Xi(s,t,e={}){let n=[];for(let r of s){let o=O(r);if(o&&o.enabled){let i=await rs(r,t,e);n.push(i)}}return n}function fn(s){let t=[],e=["summaryTool","statusBlock"];for(let n of e){let r=O(n),o=r?.trigger?.enabled&&r?.trigger?.event===s,i=Array.isArray(r?.triggerEvents)&&r.triggerEvents.includes(s);r&&r.enabled&&(o||i)&&t.push(r)}return t}var D,gn,be,mn=E(()=>{fe();G();D={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};gn=class{constructor(t=3){this.maxConcurrent=t,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(t,e){return new Promise((n,r)=>{this.queue.push({executor:t,task:e,resolve:n,reject:r}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let t=this.queue.shift();if(!t)continue;let{executor:e,task:n,resolve:r,reject:o}=t,i=new AbortController;n.abortController=i,n.status="running",n.startedAt=Date.now(),this.running.set(n.id,n),D.activeControllers.set(n.id,i),this.executeTask(e,n,i.signal).then(a=>{n.status="completed",n.completedAt=Date.now(),r(a)}).catch(a=>{n.status=a.name==="AbortError"?"aborted":"failed",n.completedAt=Date.now(),o(a)}).finally(()=>{this.running.delete(n.id),D.activeControllers.delete(n.id),D.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(t,e,n){let r=Date.now(),o=null;for(let i=0;i<=e.maxRetries;i++){if(n.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let a=await t(n);return ns(e.id,e.toolId,!0,a,null,Date.now()-r,i)}catch(a){if(o=a,a.name==="AbortError")throw a;i<e.maxRetries&&(await this.delay(1e3*(i+1)),e.retries=i+1)}}throw o}delay(t){return new Promise(e=>setTimeout(e,t))}abort(t){let e=D.activeControllers.get(t);return e?(e.abort(),!0):!1}abortAll(){for(let t of D.activeControllers.values())t.abort();D.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},be=null});var zr={};N(zr,{DEFAULT_SETTINGS:()=>hn,SettingsService:()=>os,default:()=>Zi,settingsService:()=>Ct});var hn,bn,os,Ct,Zi,is=E(()=>{lt();G();hn={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},listener:{listenGenerationEnded:!0,ignoreQuietGeneration:!0,ignoreAutoTrigger:!0,debounceMs:300},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue"}},bn="settings_v2",os=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let t=b.get(bn,{});return this._cache=this._mergeWithDefaults(t),this._cache}saveSettings(t){this._cache=this._mergeWithDefaults(t),b.set(bn,this._cache),x.emit(h.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(t){let e=this.getSettings(),n=this._deepMerge(e,t);this.saveSettings(n)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(t){this.updateSettings({executor:t})}getListenerSettings(){return this.getSettings().listener}updateListenerSettings(t){this.updateSettings({listener:t})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(t){this.updateSettings({debug:t})}getUiSettings(){return this.getSettings().ui}updateUiSettings(t){this.updateSettings({ui:t})}resetSettings(){this._cache=JSON.parse(JSON.stringify(hn)),b.set(bn,this._cache),x.emit(h.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(t,e=null){let n=this.getSettings(),r=t.split("."),o=n;for(let i of r)if(o&&typeof o=="object"&&i in o)o=o[i];else return e;return o}set(t,e){let n=JSON.parse(JSON.stringify(this.getSettings())),r=t.split("."),o=n;for(let i=0;i<r.length-1;i++){let a=r[i];a in o||(o[a]={}),o=o[a]}o[r[r.length-1]]=e,this.saveSettings(n)}_mergeWithDefaults(t){return this._deepMerge(JSON.parse(JSON.stringify(hn)),t)}_deepMerge(t,e){let n={...t};for(let r in e)e[r]&&typeof e[r]=="object"&&!Array.isArray(e[r])?n[r]=this._deepMerge(t[r]||{},e[r]):n[r]=e[r];return n}},Ct=new os,Zi=Ct});var Yr={};N(Yr,{ContextInjector:()=>ls,DEFAULT_INJECTION_OPTIONS:()=>Br,contextInjector:()=>Ut,default:()=>ea});var he,as,ta,Br,ls,Ut,ea,cs=E(()=>{lt();G();he="context_injection",as="YouYouToolkit_toolOutputs",ta="YouYouToolkit_injectedContext",Br={target:"context",scope:"chat",overwrite:!0,enabled:!0,worldbookTarget:"__character__",comment:"",position:"at_depth_as_system",depth:4,order:1e4},ls=class{constructor(){this._cache=new Map,this.debugMode=!1}async inject(t,e,n={}){if(!t||e===void 0||e===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),!1;let r={...Br,...n},o=n.chatId||this._getCurrentChatId();if(!o)return this._log("\u6CE8\u5165\u5931\u8D25: \u65E0\u6CD5\u83B7\u53D6\u804A\u5929ID"),!1;let i=this._getStorageKey(o),a=this._getChatContexts(o),c={toolId:t,content:String(e),updatedAt:Date.now(),sourceMessageId:n.sourceMessageId||null,options:r};return r.overwrite||!a[t]?a[t]=c:a[t]={...c,content:(a[t]?.content||"")+`

`+e},this._saveChatContexts(o,a),x.emit(h.TOOL_CONTEXT_INJECTED,{toolId:t,chatId:o,content:c.content,options:r}),r.enabled!==!1&&r.target==="worldbook"&&!await this._syncWorldbookEntry(t,c.content,r)?(this._log(`\u4E16\u754C\u4E66\u6CE8\u5165\u5931\u8D25: ${t}`),!1):(await this._mirrorToolOutputToLatestAssistantMessage(t,c,r),this._log(`\u6CE8\u5165\u6210\u529F: ${t} -> ${o}`),!0)}async getAvailableLorebooks(){let t=this._getTavernHelper(),e=[],n=new Set;if(e.push({value:"__character__",label:"\u5F53\u524D\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66",kind:"character",isPrimary:!0}),n.add("__character__"),!t)return e;try{let r="";typeof t.getCurrentCharPrimaryLorebook=="function"?r=await t.getCurrentCharPrimaryLorebook():typeof t.getCharLorebooks=="function"&&(r=(await t.getCharLorebooks({type:"all"}))?.primary||""),r&&!n.has(r)&&(e.push({value:r,label:`${r} [\u89D2\u8272\u4E3B\u4E16\u754C\u4E66]`,kind:"lorebook",isPrimary:!0}),n.add(r))}catch(r){this._log("\u83B7\u53D6\u89D2\u8272\u4E3B\u4E16\u754C\u4E66\u5931\u8D25",r)}try{if(typeof t.getLorebooks=="function"){let r=await Promise.resolve(t.getLorebooks());(Array.isArray(r)?r:[]).forEach(i=>{!i||n.has(i)||(e.push({value:i,label:i,kind:"lorebook"}),n.add(i))})}}catch(r){this._log("\u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25",r)}return e}getAggregatedContext(t){let e=t||this._getCurrentChatId();if(!e)return"";let n=this._getChatContexts(e),r=Object.entries(n).sort(([,i],[,a])=>(i?.updatedAt||0)-(a?.updatedAt||0));if(r.length===0)return"";let o=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[i,a]of r)o.push(`[${i}]`),o.push(a.content||""),o.push("");return o.join(`
`)}getToolContext(t,e){let n=t||this._getCurrentChatId();return!n||!e?null:this._getChatContexts(n)[e]||null}getAllToolContexts(t){let e=t||this._getCurrentChatId();return e?this._getChatContexts(e):{}}clearToolContext(t,e){let n=t||this._getCurrentChatId();if(!n||!e)return!1;let r=this._getChatContexts(n);return r[e]?(delete r[e],this._saveChatContexts(n,r),x.emit(h.TOOL_CONTEXT_CLEARED,{chatId:n,toolId:e}),this._log(`\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587: ${e}`),!0):!1}clearAllContext(t){let e=t||this._getCurrentChatId();if(!e)return!1;let n=this._getAllContexts();return delete n[e],b.set(he,n),this._cache.delete(e),x.emit(h.TOOL_CONTEXT_CLEARED,{chatId:e,allTools:!0}),this._log(`\u6E05\u9664\u804A\u5929\u6240\u6709\u4E0A\u4E0B\u6587: ${e}`),!0}clearAllChatsContexts(){b.remove(he),this._cache.clear(),this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(t,e){let n=t||this._getCurrentChatId();return!n||!e?!1:!!this._getChatContexts(n)[e]}getContextSummary(t){let e=t||this._getCurrentChatId();if(!e)return{tools:[],totalCount:0};let n=this._getChatContexts(e),r=Object.entries(n).map(([o,i])=>({toolId:o,updatedAt:i.updatedAt,contentLength:i.content?.length||0}));return{chatId:e,tools:r,totalCount:r.length}}exportContext(t){let e=t||this._getCurrentChatId();return e?{chatId:e,contexts:this._getChatContexts(e),exportedAt:Date.now()}:{}}importContext(t,e={}){if(!t||!t.chatId||!t.contexts)return!1;let{overwrite:n=!1}=e;if(n)this._saveChatContexts(t.chatId,t.contexts);else{let o={...this._getChatContexts(t.chatId),...t.contexts};this._saveChatContexts(t.chatId,o)}return this._log(`\u5BFC\u5165\u4E0A\u4E0B\u6587: ${t.chatId}`),!0}_getStorageKey(t){return`${he}:${t}`}_getChatRuntime(){try{let t=typeof window.parent<"u"&&window.parent!==window?window.parent:window,e=t.SillyTavern||null,n=e?.getContext?.()||null,r=Array.isArray(n?.chat)?n.chat:Array.isArray(e?.chat)?e.chat:[];return{topWindow:t,api:e,context:n,chat:r}}catch{return{topWindow:null,api:null,context:null,chat:[]}}}_isAssistantMessage(t){if(!t||t.is_user||t.is_system)return!1;let e=String(t.role||"").toLowerCase();return e==="assistant"||e==="ai"||!e}_findAssistantMessageIndex(t,e){let n=Array.isArray(t)?t:[];if(!n.length)return-1;let r=(o,i)=>{if(!this._isAssistantMessage(o)||e==null||e==="")return!1;if(typeof e=="number")return i===e;let a=String(e).trim();return a?[o.id,o.messageId,o.mes_id,o.swipe_id,i].map(l=>l==null?"":String(l).trim()).includes(a):!1};for(let o=n.length-1;o>=0;o-=1)if(r(n[o],o))return o;for(let o=n.length-1;o>=0;o-=1)if(this._isAssistantMessage(n[o]))return o;return-1}_buildMessageInjectedContext(t){let n=Object.entries(t&&typeof t=="object"?t:{}).sort(([,o],[,i])=>(o?.updatedAt||0)-(i?.updatedAt||0));if(!n.length)return"";let r=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[o,i]of n)r.push(`[${o}]`),r.push(i?.content||""),r.push("");return r.join(`
`)}async _mirrorToolOutputToLatestAssistantMessage(t,e,n={}){try{let{api:r,context:o,chat:i}=this._getChatRuntime();if(!Array.isArray(i)||!i.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u8DF3\u8FC7\u5199\u56DE\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),!1;let a=this._findAssistantMessageIndex(i,n.sourceMessageId);if(a<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),!1;let c=i[a],l=c[as]&&typeof c[as]=="object"?c[as]:{};l[t]={toolId:t,content:e.content,updatedAt:e.updatedAt,sourceMessageId:e.sourceMessageId||null,options:e.options||{}},c[as]=l,c[ta]=this._buildMessageInjectedContext(l);let y=o?.saveChat||r?.saveChat||null;typeof y=="function"&&await y.call(o||r);let u=r?.eventSource||null,f=(r?.eventTypes||{}).MESSAGE_UPDATED||"MESSAGE_UPDATED";return u&&typeof u.emit=="function"&&u.emit(f,a),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u56DE\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F: ${t} -> #${a}`),!0}catch(r){return this._log("\u5199\u56DE\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F\u5931\u8D25",r),!1}}_getTavernHelper(){try{return(typeof window.parent<"u"&&window.parent!==window?window.parent:window).TavernHelper||null}catch{return null}}_normalizeWorldbookPosition(t){let e=String(t||"").trim().toLowerCase();return e==="before_char"||e==="after_char"||e==="at_depth_as_system"?e:"at_depth_as_system"}async _resolveWorldbookTarget(t){let e=this._getTavernHelper();return e?!t||t==="__character__"||t==="character"?typeof e.getCurrentCharPrimaryLorebook=="function"?await e.getCurrentCharPrimaryLorebook():typeof e.getCharLorebooks=="function"&&(await e.getCharLorebooks({type:"all"}))?.primary||"":t:""}async _syncWorldbookEntry(t,e,n){let r=this._getTavernHelper();if(!r||typeof r.getLorebookEntries!="function")return this._log("TavernHelper \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u5199\u5165\u4E16\u754C\u4E66"),!1;let o=await this._resolveWorldbookTarget(n.worldbookTarget||n.targetName||n.target);if(!o)return this._log("\u672A\u627E\u5230\u53EF\u7528\u4E16\u754C\u4E66\uFF0C\u65E0\u6CD5\u5199\u5165"),!1;let i=n.comment||`YouYouToolkit:${t}`,a=this._normalizeWorldbookPosition(n.position),c=Number.isFinite(Number(n.depth))?Number(n.depth):4,l=Number.isFinite(Number(n.order))?Number(n.order):1e4;try{let y=await r.getLorebookEntries(o),g=(Array.isArray(y)?y:[]).find(S=>S?.comment===i||S?.key===i),f=String(e);g&&n.overwrite===!1&&(f=[g.content||"",e].filter(Boolean).join(`

`));let v={key:i,comment:i,content:f,type:"constant",enabled:!0,disable:!1,prevent_recursion:!0,position:a,order:l};if(a==="at_depth_as_system"&&(v.depth=c),g?.uid!=null&&typeof r.setLorebookEntries=="function")return await r.setLorebookEntries(o,[{...v,uid:g.uid}]),!0;if(typeof r.createLorebookEntries=="function")return await r.createLorebookEntries(o,[v]),!0}catch(y){this._log("\u5199\u5165\u4E16\u754C\u4E66\u5931\u8D25",y)}return!1}_getCurrentChatId(){try{let t=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext(),r=[e?.chatId,e?.chat_id,e?.chat_filename,e?.chatMetadata?.chatId,e?.chatMetadata?.chat_id,e?.chatMetadata?.file_name,e?.chatMetadata?.name,t.SillyTavern?.chatId,t.SillyTavern?.chat_id,t.SillyTavern?.chat_filename].find(i=>typeof i=="string"&&i.trim());if(r)return r;let o=t.SillyTavern?.this_chid;if(o!=null)return`chat_char_${o}`}return"chat_default"}catch{return"chat_default"}}_getAllContexts(){return b.get(he,{})}_getChatContexts(t){if(this._cache.has(t))return this._cache.get(t);let n=this._getAllContexts()[t]||{};return this._cache.set(t,n),n}_saveChatContexts(t,e){let n=this._getAllContexts();n[t]=e,b.set(he,n),this._cache.set(t,e)}_log(...t){this.debugMode&&console.log("[ContextInjector]",...t)}},Ut=new ls,ea=Ut});var Fr={};N(Fr,{DEFAULT_PROMPT_TEMPLATE:()=>Gr,ToolPromptService:()=>ds,default:()=>sa,toolPromptService:()=>ys});var Gr,ds,ys,sa,xn=E(()=>{G();me();Gr="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",ds=class{constructor(){this.debugMode=!1}buildToolMessages(t,e){if(!t)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let n=[],r=this._getBypassMessages(t);if(r&&r.length>0)for(let a of r)a.enabled!==!1&&n.push({role:this._normalizeRole(a.role),content:a.content||""});let o=this._getPromptTemplate(t),i=this._buildUserContent(o,e);return i.trim()&&n.push({role:"user",content:i}),this._log(`\u6784\u5EFA\u6D88\u606F: ${n.length} \u6761`),n}buildPromptText(t,e){let n=this._getPromptTemplate(t);return this._buildUserContent(n,e)}getToolPromptTemplate(t){return this._getPromptTemplate(t)}_getPromptTemplate(t){return t.promptTemplate&&typeof t.promptTemplate=="string"?t.promptTemplate:Gr}_getBypassMessages(t){return t.bypass?.enabled?w.buildBypassMessages(t):[]}_buildUserContent(t,e){let n=[],r=e?.lastAiMessage||e?.input?.lastAiMessage||"",o=e?.extractedContent||e?.input?.extractedContent||"",i=e?.recentMessagesText||"",a=e?.rawRecentMessagesText||"",c=e?.injectedContext||e?.input?.injectedContext||"",l=e?.userMessage||e?.input?.userMessage||"",y=e?.previousToolOutput||e?.input?.previousToolOutput||"",u=e?.toolName||"",g=e?.toolId||"",f=new Set;if(t&&t.trim()){let S=t;Object.entries({"{{lastAiMessage}}":r,"{{extractedContent}}":o,"{{recentMessagesText}}":i,"{{rawRecentMessagesText}}":a,"{{injectedContext}}":c,"{{userMessage}}":l,"{{previousToolOutput}}":y,"{{toolName}}":u,"{{toolId}}":g}).forEach(([B,at])=>{S.includes(B)&&f.add(B),S=S.split(B).join(at||"")}),n.push(S.trim())}let v=(S,z,B)=>{!B||f.has(S)||n.push(`
${z}
${B}`)};return v("{{injectedContext}}","\u4EE5\u4E0B\u662F\u5F53\u524D\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587\uFF1A",c),v("{{extractedContent}}","\u4EE5\u4E0B\u662F\u57FA\u4E8E\u63D0\u53D6\u89C4\u5219\u7B5B\u51FA\u7684\u5185\u5BB9\uFF1A",o),i&&!f.has("{{recentMessagesText}}")&&i!==r&&n.push(`
\u4EE5\u4E0B\u662F\u6700\u8FD1\u63D0\u53D6\u5230\u7684 AI \u6D88\u606F\u6B63\u6587\uFF1A
${i}`),v("{{lastAiMessage}}","\u4EE5\u4E0B\u662F\u9700\u8981\u5904\u7406\u7684AI\u56DE\u590D\u5185\u5BB9\uFF1A",r),n.join(`
`)}_normalizeRole(t){if(!t)return"user";switch(String(t).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...t){this.debugMode&&console.log("[ToolPromptService]",...t)}setDebugMode(t){this.debugMode=t}},ys=new ds,sa=ys});var Hr={};N(Hr,{LEGACY_OUTPUT_MODES:()=>na,OUTPUT_MODES:()=>zt,TOOL_RUNTIME_STATUS:()=>ra,ToolOutputService:()=>ps,default:()=>oa,toolOutputService:()=>Bt});var zt,na,ra,ps,Bt,oa,vn=E(()=>{G();is();cs();xn();Ke();zt={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},na={inline:"follow_ai"},ra={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},ps=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(t){return!t||!t.enabled||!t.trigger?.enabled||!t.output?.enabled?!1:t.output?.mode===zt.POST_RESPONSE_API}shouldRunFollowAi(t){if(!t||!t.enabled||!t.trigger?.enabled||!t.output?.enabled)return!1;let e=t.output?.mode;return e===zt.FOLLOW_AI||e==="inline"}shouldRunInline(t){return this.shouldRunFollowAi(t)}async runToolPostResponse(t,e){let n=Date.now(),r=t.id;this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${r}`),x.emit(h.TOOL_EXECUTION_STARTED,{toolId:r,mode:zt.POST_RESPONSE_API});try{let o=await this._buildToolMessages(t,e);if(!o||o.length===0)throw new Error("\u65E0\u6CD5\u6784\u5EFA\u6709\u6548\u7684\u6D88\u606F");this._log(`\u6784\u5EFA\u4E86 ${o.length} \u6761\u6D88\u606F`);let i=t.output?.apiPreset,a=await this._getRequestTimeout(),c=await this._sendApiRequest(i,o,{timeoutMs:a,signal:e.signal}),l=this._extractOutputContent(c,t);if(l&&!await Ut.inject(r,l,{chatId:e.chatId,overwrite:t.output?.overwrite!==!1,sourceMessageId:e.messageId||"",target:t.injection?.enabled===!1?"context":"worldbook",worldbookTarget:t.injection?.target||"__character__",comment:t.injection?.comment||`YouYouToolkit:${r}`,position:t.injection?.position||"at_depth_as_system",depth:t.injection?.depth??4,order:t.injection?.order??1e4,enabled:t.injection?.enabled!==!1}))throw new Error("\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");let y=Date.now()-n;return x.emit(h.TOOL_EXECUTED,{toolId:r,success:!0,duration:y,mode:zt.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${r}, \u8017\u65F6 ${y}ms`),{success:!0,toolId:r,output:l,duration:y}}catch(o){let i=Date.now()-n;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${r}`,o),x.emit(h.TOOL_EXECUTION_FAILED,{toolId:r,error:o.message||String(o),duration:i}),{success:!1,toolId:r,error:o.message||String(o),duration:i}}}async runToolInline(t,e){let n=Date.now(),r=t.id;try{let o=await this._buildToolMessages(t,e);return{success:!0,toolId:r,messages:o,duration:Date.now()-n}}catch(o){return{success:!1,toolId:r,error:o.message||String(o),duration:Date.now()-n}}}async previewExtraction(t,e){let n=this._buildRecentMessageExtractionEntries(t,e),r=this._joinMessageBlocks(n,"rawText"),o=this._joinMessageBlocks(n,"filteredText"),i=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0});return{success:!0,sourceText:r,filteredSourceText:o,extractedText:i,messageEntries:n,selectors:this._getExtractionSelectors(t),maxMessages:t?.extraction?.maxMessages||5}}async _buildToolMessages(t,e){let n=await Ut.getAggregatedContext(e.chatId),r=this._buildRecentMessageExtractionEntries(t,e),o=this._joinMessageBlocks(r,"rawText"),i=this._joinMessageBlocks(r,"filteredText"),a=this._joinMessageBlocks(r,"extractedText",{skipEmpty:!0}),c={...e,injectedContext:n,rawRecentMessagesText:o,recentMessagesText:i,extractedContent:a,toolName:t.name,toolId:t.id};return ys.buildToolMessages(t,c)}_normalizeRole(t){if(!t)return"user";let e=String(t).toLowerCase();return e==="system"?"system":e==="assistant"?"assistant":"user"}setApiConnection(t){this._apiConnection=t}async _sendApiRequest(t,e,n={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:r=9e4,signal:o}=n;if(t&&this._apiConnection.sendWithPreset)return await this._apiConnection.sendWithPreset(t,e,{timeoutMs:r},o);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(e,{timeoutMs:r},o);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Ct.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(t,e){if(!t)return"";if(typeof t=="string")return this._applyExtractionSelectors(t,e);if(typeof t=="object"){if(t.choices&&t.choices[0]?.message?.content)return this._applyExtractionSelectors(t.choices[0].message.content,e);if(t.content)return this._applyExtractionSelectors(t.content,e);if(t.text)return this._applyExtractionSelectors(t.text,e);if(t.message)return this._applyExtractionSelectors(t.message,e);try{return this._applyExtractionSelectors(JSON.stringify(t,null,2),e)}catch{return this._applyExtractionSelectors(String(t),e)}}return this._applyExtractionSelectors(String(t),e)}_getExtractionSelectors(t){let e=t?.extraction?.selectors;return Array.isArray(e)&&e.length>0?e.map(n=>String(n||"").trim()).filter(Boolean):Array.isArray(t?.extractTags)&&t.extractTags.length>0?t.extractTags.map(n=>String(n||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(t,e){return this._applyExtractionSelectorsInternal(t,e,{strict:!1})}_applyExtractionSelectorsInternal(t,e,n={}){let r=typeof t=="string"?t:String(t||""),o=this._getExtractionSelectors(e),{strict:i=!1}=n;if(!o.length)return r.trim();let a=o.map((l,y)=>{let u=String(l||"").trim(),g=u.startsWith("regex:");return{id:`tool-extract-${y}`,type:g?"regex_include":"include",value:g?u.slice(6).trim():u,enabled:!0}}).filter(l=>l.value),c=Lt(r,a,[]);return i?(c||"").trim():c||r.trim()}_extractToolContent(t,e){let n=typeof e=="string"?e:String(e||"");return this._getExtractionSelectors(t).length?this._applyExtractionSelectorsInternal(n,t,{strict:!0}):n.trim()}_applyGlobalContextRules(t){let e=typeof t=="string"?t:String(t||"");if(!e.trim())return"";try{let n=pt()||[],r=jt()||[];return!Array.isArray(n)||n.length===0?e.trim():Lt(e,n,r)||e.trim()}catch(n){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",n),e.trim()}}_getMessageText(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let n of e)if(typeof n=="string"&&n.trim())return n.trim();return""}_collectRecentAssistantMessages(t,e){return this._collectRecentAssistantMessageEntries(t,e).map(n=>n.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(t,e){let n=Math.max(1,parseInt(t?.extraction?.maxMessages,10)||5),r=Array.isArray(e?.chatMessages)?e.chatMessages:[],o=[];for(let a=r.length-1;a>=0&&o.length<n;a-=1){let c=r[a],l=String(c?.role||"").toLowerCase(),y=l==="assistant"||l==="ai"||!c?.is_user&&!c?.is_system&&!l,u=this._getMessageText(c);y&&u&&o.unshift({text:u,message:c,chatIndex:a})}if(o.length>0)return o;let i=e?.lastAiMessage||e?.input?.lastAiMessage||"";return i?[{text:i,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(t,e){return this._collectRecentAssistantMessageEntries(t,e).map((r,o)=>{let i=r.text||"",a=this._applyGlobalContextRules(i),c=this._extractToolContent(t,i);return{...r,order:o+1,rawText:i,filteredText:a,extractedText:c}})}_joinMessageBlocks(t,e,n={}){let r=Array.isArray(t)?t:[],{skipEmpty:o=!1}=n;return r.map(a=>{let c=String(a?.[e]||"").trim();return o&&!c?"":`${`\u3010\u7B2C ${a?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${c||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}filterPostResponseTools(t){return Array.isArray(t)?t.filter(e=>this.shouldRunPostResponse(e)):[]}filterInlineTools(t){return Array.isArray(t)?t.filter(e=>this.shouldRunInline(e)):[]}setDebugMode(t){this.debugMode=t}_log(...t){this.debugMode&&console.log("[ToolOutputService]",...t)}},Bt=new ps,oa=Bt});var Kr={};N(Kr,{EVENT_TYPES:()=>Zt,checkGate:()=>_n,destroyToolTriggerManager:()=>va,getChatContext:()=>ms,getCurrentCharacter:()=>En,getFullContext:()=>ga,getToolTriggerManagerState:()=>wa,getWorldbookContent:()=>Qr,initToolTriggerManager:()=>qr,initTriggerModule:()=>Vr,previewToolExtraction:()=>An,registerEventListener:()=>te,registerTriggerHandler:()=>fa,removeAllListeners:()=>da,removeAllTriggerHandlers:()=>ba,resetGateState:()=>ya,runToolManually:()=>Cn,setDebugMode:()=>Ta,setTriggerHandlerEnabled:()=>ma,triggerState:()=>k,unregisterEventListener:()=>fs,updateGateState:()=>xe});function At(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Wr(s){if(!s)return"";let t=[s.mes,s.message,s.content,s.text,s?.data?.content];for(let e of t)if(typeof e=="string"&&e.trim())return e;return""}function us(){xe({lastUserSendIntentAt:Date.now()})}function ia(){let s=At(),t=s?.document;if(!t?.body)return!1;if(s.__YYT_sendIntentHooksInstalled)return!0;let e=["#send_but","#option_send","#send_button",'button[title*="\u53D1\u9001"]','button[title*="Send"]'],n=["#send_textarea","#send_textarea textarea","textarea#send_textarea",'textarea[data-testid="send_textarea"]'],r=(o,i,a)=>{o.forEach(c=>{let l=t.querySelector(c);l&&l.addEventListener(i,a,!0)})};return r(e,"click",()=>us()),r(e,"pointerup",()=>us()),r(e,"touchend",()=>us()),r(n,"keydown",o=>{let i=o?.key||"";(i==="Enter"||i==="NumpadEnter")&&!o.shiftKey&&us()}),s.__YYT_sendIntentHooksInstalled=!0,T("\u5DF2\u5B89\u88C5\u53D1\u9001\u610F\u56FE\u6355\u83B7\u94A9\u5B50"),!0}function aa(s,t={},e=!1){return e?!0:String(s||t?.type||"").trim().toLowerCase().includes("quiet")||t?.quiet===!0||t?.isQuiet===!0||t?.quiet_prompt===!0}function ee(){return At().SillyTavern||null}function la(){return At().TavernHelper||null}function wn(){let t=At().SillyTavern;return t&&t.eventSource?t.eventSource:null}function Tn(){let t=At().SillyTavern;return t&&t.eventTypes?t.eventTypes:Zt}function T(...s){k.debugMode&&console.log("[YouYouToolkit:Trigger]",...s)}function ca(s,t,e){let r=[t?.chatId,t?.chat_id,t?.chat_filename,t?.chatMetadata?.chatId,t?.chatMetadata?.chat_id,t?.chatMetadata?.file_name,t?.chatMetadata?.name,s?.chatId,s?.chat_id,s?.chat_filename].find(o=>typeof o=="string"&&o.trim());return r||(e?.id!==void 0&&e?.id!==null?`chat_char_${e.id}`:s?.this_chid!==void 0&&s?.this_chid!==null?`chat_char_${s.this_chid}`:"chat_default")}function te(s,t,e={}){if(!s||typeof t!="function")return T("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u51FD\u6570"),()=>{};let{once:n=!1,priority:r=0}=e,o=wn(),a=Tn()[s]||s,c=async(...l)=>{try{if(e.gateCheck&&!await _n(e.gateCheck)){T(`\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6: ${s}`);return}await t(...l),n&&fs(s,c)}catch(y){console.error("[YouYouToolkit:Trigger] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF:",y)}};if(k.listeners.has(s)||k.listeners.set(s,new Set),k.listeners.get(s).add(c),o&&typeof o.on=="function")o.on(a,c),T(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${s}`);else{let l=At();l.addEventListener&&(l.addEventListener(a,c),T(`\u5DF2\u6CE8\u518CDOM\u4E8B\u4EF6\u76D1\u542C\u5668: ${s}`))}return()=>fs(s,c)}function fs(s,t){let e=k.listeners.get(s);if(e&&e.has(t)){e.delete(t);let n=wn(),o=Tn()[s]||s;if(n&&typeof n.off=="function")n.off(o,t),T(`\u5DF2\u53D6\u6D88\u4E8B\u4EF6\u76D1\u542C\u5668: ${s}`);else{let i=At();i.removeEventListener&&i.removeEventListener(o,t)}}}function da(){let s=wn(),t=Tn();for(let[e,n]of k.listeners){let r=t[e]||e;for(let o of n)if(s&&typeof s.off=="function")s.off(r,o);else{let i=At();i.removeEventListener&&i.removeEventListener(r,o)}}k.listeners.clear(),T("\u5DF2\u79FB\u9664\u6240\u6709\u4E8B\u4EF6\u76D1\u542C\u5668")}async function _n(s){if(!s)return!0;let t=Date.now(),e=k.gateState;if(s.minInterval&&e.lastGenerationAt&&t-e.lastGenerationAt<s.minInterval)return T("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u77ED"),!1;if(s.maxInterval&&e.lastUserMessageAt&&t-e.lastUserMessageAt>s.maxInterval)return T("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u957F"),!1;if(s.requireUserMessage&&!e.lastUserMessageId)return T("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u7F3A\u5C11\u7528\u6237\u6D88\u606F"),!1;if(s.excludeQuietGeneration&&e.lastGenerationType==="quiet")return T("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: quiet\u751F\u6210\u88AB\u6392\u9664"),!1;if(s.customCheck&&typeof s.customCheck=="function")try{if(!await s.customCheck(e))return T("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u81EA\u5B9A\u4E49\u68C0\u67E5\u8FD4\u56DEfalse"),!1}catch(n){return console.error("[YouYouToolkit:Trigger] \u81EA\u5B9A\u4E49\u95E8\u63A7\u68C0\u67E5\u9519\u8BEF:",n),!1}return!0}function xe(s){Object.assign(k.gateState,s)}function ya(){k.gateState={lastUserSendIntentAt:0,lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationType:null,lastGenerationParams:null,lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1}}async function ms(s={}){let{depth:t=3,includeUser:e=!0,includeAssistant:n=!0,includeSystem:r=!1,format:o="messages"}=s;if(!ee())return T("\u65E0\u6CD5\u83B7\u53D6SillyTavern API"),null;try{let a=await ua(),c=[],l=Math.max(0,a.length-t);for(let y=l;y<a.length;y++){let u=a[y];if(!u)continue;let g=pa(u);if(!(g==="user"&&!e)&&!(g==="system"&&!r)&&!(g==="assistant"&&!n))if(o==="messages"){let f=Wr(u);c.push({role:g,content:f,name:u.name||"",timestamp:u.send_date||u.timestamp,isSystem:!!u.is_system,isUser:!!u.is_user})}else c.push(Wr(u))}return{messages:c,totalMessages:a.length,startIndex:l,endIndex:a.length-1}}catch(a){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u804A\u5929\u4E0A\u4E0B\u6587\u5931\u8D25:",a),null}}function pa(s){if(!s)return"assistant";if(s.is_user)return"user";if(s.is_system)return"system";let t=String(s.role||"").toLowerCase();return t==="user"||t==="assistant"||t==="system"?t:"assistant"}async function ua(){let s=la(),t=ee();if(s?.getChatMessages)try{let e=-1;if(typeof s.getLastMessageId=="function"&&(e=s.getLastMessageId()),!Number.isFinite(e)||e<0){let n=t?.getContext?.()||null,r=Array.isArray(n?.chat)?n.chat:[],o=Array.isArray(t?.chat)?t.chat:[];e=(r.length?r:o).length-1}if(Number.isFinite(e)&&e>=0){let n=await s.getChatMessages(`0-${e}`,{include_swipes:!1,include_hidden:!0});if(Array.isArray(n)&&n.length>0)return n}}catch(e){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 TavernHelper \u8BFB\u53D6\u804A\u5929\u6D88\u606F\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u9ED8\u8BA4\u6765\u6E90:",e)}try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat)&&e.chat.length>0)return e.chat}catch(e){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 getContext() \u8BFB\u53D6\u804A\u5929\u5931\u8D25:",e)}return Array.isArray(t?.chat)?t.chat:[]}async function En(){let s=ee();if(!s)return null;try{let t=s.this_chid,e=s.characters||[];if(t>=0&&t<e.length){let n=e[t];return{id:t,name:n.name||"",description:n.description||"",personality:n.personality||"",scenario:n.scenario||"",firstMes:n.first_mes||"",mesExample:n.mes_example||""}}return null}catch(t){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",t),null}}async function Qr(s={}){let{enabledOnly:t=!0,maxLength:e=1e4}=s,n=ee();if(!n)return"";try{let o=(n.lorebook||[]).entries||[],i=[],a=0;for(let c of o){if(t&&!c.enabled)continue;let l=c.content||"";l&&a+l.length<=e&&(i.push(l),a+=l.length)}return i.join(`

`)}catch(r){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u5931\u8D25:",r),""}}async function ga(s={}){let[t,e,n]=await Promise.all([ms(s.chat||{}),En(),Qr(s.worldbook||{})]);return{chat:t,character:e,worldbook:n,timestamp:Date.now()}}function fa(s,t){if(!s||!t)return T("\u65E0\u6548\u7684\u5904\u7406\u5668ID\u6216\u914D\u7F6E"),()=>{};let{eventType:e,handler:n,gateCondition:r,priority:o=0}=t;if(!e||typeof n!="function")return T("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u5904\u7406\u5668\u51FD\u6570"),()=>{};k.handlers.set(s,{eventType:e,handler:n,gateCondition:r,priority:o,enabled:!0});let i=te(e,async(...a)=>{let c=k.handlers.get(s);!c||!c.enabled||c.gateCondition&&!await _n(c.gateCondition)||await c.handler(...a)},{priority:o});return T(`\u5DF2\u6CE8\u518C\u89E6\u53D1\u5904\u7406\u5668: ${s}`),()=>{i(),k.handlers.delete(s),T(`\u5DF2\u53D6\u6D88\u89E6\u53D1\u5904\u7406\u5668: ${s}`)}}function ma(s,t){let e=k.handlers.get(s);e&&(e.enabled=t,T(`\u89E6\u53D1\u5904\u7406\u5668 ${s} \u5DF2${t?"\u542F\u7528":"\u7981\u7528"}`))}function ba(){k.handlers.clear(),T("\u5DF2\u79FB\u9664\u6240\u6709\u89E6\u53D1\u5904\u7406\u5668")}function qr(){if(st.initialized){T("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316");return}ha(),st.initialized=!0,T("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316"),x.emit(h.TOOL_TRIGGER_INITIALIZED)}function ha(){let s=Zt.GENERATION_ENDED,t=te(s,async e=>{if(T("GENERATION_ENDED\u89E6\u53D1:",e),aa(k.gateState.lastGenerationType,k.gateState.lastGenerationParams,k.gateState.lastGenerationDryRun)){T("\u68C0\u6D4B\u5230 quiet / dryRun \u751F\u6210\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u81EA\u52A8\u6267\u884C");return}let n=await Sn(e);if(!n?.lastAiMessage){T("\u751F\u6210\u7ED3\u675F\u540E\u672A\u8BFB\u53D6\u5230\u6700\u65B0 AI \u56DE\u590D\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u6267\u884C");return}let r=xa(s);if(r.length===0){T("\u6CA1\u6709\u9700\u8981\u6267\u884C\u7684\u5DE5\u5177");return}T(`\u9700\u8981\u6267\u884C ${r.length} \u4E2A\u5DE5\u5177:`,r.map(o=>o.id)),nt("info",`\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u5F00\u59CB\u81EA\u52A8\u6267\u884C ${r.length} \u4E2A\u5DE5\u5177`,{duration:2400,noticeId:"yyt-tool-batch-start"});for(let o of r)try{let i=await Jr(o,n);i.success?(T(`\u5DE5\u5177 ${o.id} \u6267\u884C\u6210\u529F`),x.emit(h.TOOL_EXECUTED,{toolId:o.id,result:i.result||i.data||i})):T(`\u5DE5\u5177 ${o.id} \u6267\u884C\u5931\u8D25:`,i.error)}catch(i){console.error(`[ToolTrigger] \u5DE5\u5177\u6267\u884C\u5931\u8D25: ${o.id}`,i)}st.lastExecutionContext=n});st.listeners.set(s,t)}async function Sn(s){let t=await ms({depth:50}),e=await En(),n=ee(),r=n?.getContext?.()||null,o=typeof s=="string"||typeof s=="number"?s:s?.messageId||s?.id||"",i=t?.messages||[],a=i.filter(l=>l.role==="user").pop(),c=i.filter(l=>l.role==="assistant").pop();return{triggeredAt:Date.now(),triggerEvent:s?.triggerEvent||"GENERATION_ENDED",chatId:ca(n,r,e),messageId:o,lastAiMessage:c?.content||"",userMessage:a?.content||k.gateState.lastUserMessageText||"",chatMessages:i,input:{userMessage:a?.content||k.gateState.lastUserMessageText||"",lastAiMessage:c?.content||"",extractedContent:"",previousToolOutput:"",context:{character:e?.name||"",chatLength:t?.totalMessages||0}},config:{},status:"pending"}}function xa(s){return fn(s).filter(e=>Bt.shouldRunPostResponse(e))}function gs(s,t){try{dn(s,t)}catch(e){console.warn("[ToolTrigger] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",s,e)}}async function Jr(s,t){let e=Date.now(),n=s.id,r=t?.triggerEvent==="MANUAL",o=`yyt-tool-run-${n}`;gs(n,{lastStatus:"running",lastError:"",lastDurationMs:0}),x.emit(h.TOOL_EXECUTION_REQUESTED,{toolId:n,triggerEvent:t?.triggerEvent||"GENERATION_ENDED",context:t}),nt("info",`${r?"\u6B63\u5728\u624B\u52A8\u6267\u884C":"\u5DF2\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u6B63\u5728\u81EA\u52A8\u6267\u884C"} ${s.name}`,{sticky:!0,noticeId:o});try{let i;s.output?.mode===zt.POST_RESPONSE_API?i=await Bt.runToolPostResponse(s,t):i=await rs(n,t);let a=Date.now()-e;if(i?.success){let y=O(n);gs(n,{lastStatus:"success",lastError:"",lastDurationMs:a,successCount:(y?.runtime?.successCount||0)+1});let u=r?`${s.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`:`\u5DF2\u76D1\u542C AI \u56DE\u590D\u5E76\u6267\u884C ${s.name}`;return p("success",u),nt("success",u,{duration:3200,noticeId:o}),{success:!0,duration:a,result:i}}let c=O(n),l=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25";return gs(n,{lastStatus:"error",lastError:l,lastDurationMs:a,errorCount:(c?.runtime?.errorCount||0)+1}),p("error",`${s.name} \u6267\u884C\u5931\u8D25\uFF1A${l}`),nt("error",`${s.name} \u6267\u884C\u5931\u8D25\uFF1A${l}`,{sticky:!0,noticeId:o}),{success:!1,duration:a,error:l,result:i}}catch(i){let a=Date.now()-e,c=O(n),l=i?.message||String(i);throw gs(n,{lastStatus:"error",lastError:l,lastDurationMs:a,errorCount:(c?.runtime?.errorCount||0)+1}),p("error",`${s.name} \u6267\u884C\u5931\u8D25\uFF1A${l}`),nt("error",`${s.name} \u6267\u884C\u5931\u8D25\uFF1A${l}`,{sticky:!0,noticeId:o}),i}}async function Cn(s){if(!s)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let t=O(s);if(!t)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!t.enabled)return nt("warning",`${t.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${s}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};if(!Bt.shouldRunPostResponse(t))return nt("warning",`${t.name} \u5F53\u524D\u4E3A\u201C\u968F AI \u8F93\u51FA\u201D\uFF0C\u4E0D\u4F1A\u6267\u884C\u989D\u5916\u89E3\u6790`,{duration:3200,noticeId:`yyt-tool-run-${s}`}),{success:!1,error:"\u5F53\u524D\u8F93\u51FA\u6A21\u5F0F\u4E0D\u6267\u884C\u989D\u5916\u89E3\u6790"};let e=await Sn({triggerEvent:"MANUAL"});return Jr(t,e)}async function An(s){if(!s)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let t=O(s);if(!t)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let e=await Sn({triggerEvent:"MANUAL_PREVIEW"});return Bt.previewExtraction(t,e)}function va(){for(let[s,t]of st.listeners)fs(s,t);st.listeners.clear(),st.initialized=!1,st.lastExecutionContext=null,T("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u9500\u6BC1")}function wa(){return{initialized:st.initialized,listenersCount:st.listeners.size,lastExecutionContext:st.lastExecutionContext}}async function Vr(){if(k.isInitialized){T("\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316");return}if(!ee()){T("\u65E0\u6CD5\u83B7\u53D6SillyTavern API\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),setTimeout(Vr,1e3);return}ia(),te(Zt.MESSAGE_SENT,async t=>{let n=(await ms({depth:10,includeAssistant:!1,includeSystem:!1}))?.messages?.filter(r=>r.role==="user").pop();xe({lastUserSendIntentAt:Date.now(),lastUserMessageId:t,lastUserMessageAt:Date.now(),lastUserMessageText:n?.content||k.gateState.lastUserMessageText||""}),T(`\u7528\u6237\u6D88\u606F\u5DF2\u53D1\u9001: ${t}`)}),te(Zt.GENERATION_STARTED,(t,e,n)=>{xe({lastGenerationType:t,lastGenerationParams:e||null,lastGenerationDryRun:!!n,isGenerating:!0}),T(`\u751F\u6210\u5F00\u59CB: ${t}`)}),te(Zt.GENERATION_ENDED,()=>{xe({lastGenerationAt:Date.now(),isGenerating:!1}),T("\u751F\u6210\u7ED3\u675F")}),qr(),k.isInitialized=!0,T("\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function Ta(s){k.debugMode=s}var Zt,k,st,Pn=E(()=>{G();fe();mn();vn();rt();Zt={MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHARACTER_LOADED:"CHARACTER_LOADED",CHARACTER_DELETED:"CHARACTER_DELETED",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",WORLDBOOK_UPDATED:"WORLDBOOK_UPDATED",EXTENSIONS_LOADED:"EXTENSIONS_LOADED",SETTINGS_LOADED:"SETTINGS_LOADED"},k={listeners:new Map,handlers:new Map,gateState:{lastUserSendIntentAt:0,lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationType:null,lastGenerationParams:null,lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1},isInitialized:!1,debugMode:!1};st={initialized:!1,listeners:new Map,lastExecutionContext:null}});function bs(s){let{id:t,toolId:e,postResponseHint:n,extractionPlaceholder:r,previewDialogId:o,previewTitle:i="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",defaultInjectionOrder:a=1e4,lorebookLogTag:c="ToolConfigPanel"}=s;return{id:t,toolId:e,render(){let l=O(this.toolId);if(!l)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let y=this._getApiPresets(),u=this._getBypassPresets(),g=l.output?.mode||"follow_ai",f=l.bypass?.enabled||!1,v=l.bypass?.presetId||"",S=l.runtime?.lastStatus||"idle",z=l.runtime?.lastRunAt?new Date(l.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",B=l.runtime?.lastError||"",at=l.extraction||{},W=l.injection||{},xt=Array.isArray(at.selectors)?at.selectors.join(`
`):"",$e=g==="post_response_api"?n:"\u968F AI \u8F93\u51FA\u5373\u4E0D\u542F\u7528\u989D\u5916\u5DE5\u5177\u94FE\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\u3002";return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>\u8F93\u51FA\u6A21\u5F0F</span>
            </div>
            <div class="yyt-form-group">
              <label>\u8F93\u51FA\u6A21\u5F0F</label>
              <select class="yyt-select" id="${d}-tool-output-mode">
                <option value="follow_ai" ${g==="follow_ai"?"selected":""}>\u968F AI \u8F93\u51FA\uFF08\u4E0D\u542F\u7528\uFF09</option>
                <option value="post_response_api" ${g==="post_response_api"?"selected":""}>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790</option>
              </select>
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${$e}</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-database"></i>
              <span>API \u9884\u8BBE</span>
            </div>
            <div class="yyt-form-group">
              <label>\u89E3\u6790\u4F7F\u7528\u7684 API \u9884\u8BBE</label>
              <select class="yyt-select" id="${d}-tool-api-preset">
                <option value="">\u4F7F\u7528\u5F53\u524DAPI\u914D\u7F6E</option>
                ${y.map(et=>`
                  <option value="${m(et.name)}" ${et.name===l.output?.apiPreset?"selected":""}>
                    ${m(et.name)}
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
                <input type="checkbox" id="${d}-tool-bypass-enabled" ${f?"checked":""}>
                <span>\u542F\u7528\u7834\u9650\u8BCD</span>
              </label>
            </div>
            <div class="yyt-form-group yyt-bypass-preset-select ${f?"":"yyt-hidden"}">
              <label>\u7ED1\u5B9A\u7834\u9650\u8BCD\u9884\u8BBE</label>
              <select class="yyt-select" id="${d}-tool-bypass-preset">
                <option value="">\u9009\u62E9\u9884\u8BBE</option>
                ${u.map(et=>`
                  <option value="${m(et.id)}" ${et.id===v?"selected":""}>
                    ${m(et.name)}${et.isDefault?" [\u9ED8\u8BA4]":""}
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
                <input type="number" class="yyt-input" id="${d}-tool-max-messages" min="1" max="50" value="${Number(at.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${d}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${m(r)}">${m(xt)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u63D0\u53D6\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u63D0\u53D6\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-book"></i>
              <span>\u4E16\u754C\u4E66\u6CE8\u5165</span>
            </div>
            <div class="yyt-form-group">
              <label class="yyt-checkbox-label">
                <input type="checkbox" id="${d}-tool-injection-enabled" ${W.enabled!==!1?"checked":""}>
                <span>\u6267\u884C\u540E\u5199\u5165\u4E16\u754C\u4E66</span>
              </label>
            </div>
            <div class="yyt-injection-fields ${W.enabled===!1?"yyt-hidden":""}">
              <div class="yyt-form-group">
                <label>\u76EE\u6807\u4E16\u754C\u4E66</label>
                <select class="yyt-select" id="${d}-tool-injection-target" data-current-value="${m(W.target||"__character__")}">
                  <option value="__character__">\u5F53\u524D\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66</option>
                </select>
              </div>
              <div class="yyt-form-row">
                <div class="yyt-form-group yyt-flex-1">
                  <label>\u6CE8\u5165\u4F4D\u7F6E</label>
                  <select class="yyt-select" id="${d}-tool-injection-position">
                    <option value="at_depth_as_system" ${W.position==="at_depth_as_system"?"selected":""}>\u7CFB\u7EDF\u6DF1\u5EA6</option>
                    <option value="before_char" ${W.position==="before_char"?"selected":""}>\u89D2\u8272\u5361\u524D</option>
                    <option value="after_char" ${W.position==="after_char"?"selected":""}>\u89D2\u8272\u5361\u540E</option>
                  </select>
                </div>
                <div class="yyt-form-group yyt-flex-1">
                  <label>Depth</label>
                  <input type="number" class="yyt-input" id="${d}-tool-injection-depth" value="${Number(W.depth)||4}">
                </div>
                <div class="yyt-form-group yyt-flex-1">
                  <label>Order</label>
                  <input type="number" class="yyt-input" id="${d}-tool-injection-order" value="${Number(W.order)||a}">
                </div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-file-code"></i>
              <span>\u6A21\u677F\u4FEE\u6539\u6846</span>
              <div class="yyt-title-actions">
                <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${d}-tool-reset-template">
                  <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u6A21\u677F
                </button>
              </div>
            </div>
            <div class="yyt-form-group">
              <textarea class="yyt-textarea yyt-code-textarea"
                        id="${d}-tool-prompt-template"
                        rows="12"
                        placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${m(l.promptTemplate||"")}</textarea>
              <div class="yyt-tool-compact-hint">\u8FD9\u91CC\u76F4\u63A5\u586B\u5199\u53D1\u9001\u7ED9\u989D\u5916\u89E3\u6790\u6A21\u578B\u7684\u5B8C\u6574\u6A21\u677F\u3002</div>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${m(S)}">${m(S)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${m(z)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${l.runtime?.successCount||0} / ${l.runtime?.errorCount||0}</span>
                </div>
                ${B?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${m(B)}</span>
                  </div>
                `:""}
              </div>
              <div class="yyt-tool-manual-actions">
                <button class="yyt-btn yyt-btn-primary" id="${d}-tool-run-manual">
                  <i class="fa-solid fa-play"></i> \u7ACB\u5373\u6267\u884C\u4E00\u6B21
                </button>
                <button class="yyt-btn yyt-btn-secondary" id="${d}-tool-preview-extraction">
                  <i class="fa-solid fa-vial"></i> \u6D4B\u8BD5\u63D0\u53D6
                </button>
                <div class="yyt-tool-compact-hint">\u7528\u4E8E\u624B\u52A8\u9A8C\u8BC1\u5F53\u524D\u6A21\u677F\u3001API\u9884\u8BBE\u548C\u7834\u9650\u9884\u8BBE\u662F\u5426\u80FD\u6B63\u5E38\u5DE5\u4F5C\u3002</div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-footer yyt-panel-footer-end">
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-primary" id="${d}-tool-save">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>
        </div>
      `},_getApiPresets(){try{return Wt()||[]}catch{return[]}},_getBypassPresets(){try{return un()||[]}catch{return[]}},_getFormData(l){let y=O(this.toolId),u=l.find(`#${d}-tool-output-mode`).val()||"follow_ai",g=l.find(`#${d}-tool-bypass-enabled`).is(":checked"),f=u==="post_response_api",v=(l.find(`#${d}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(z=>z.trim()).filter(Boolean),S=l.find(`#${d}-tool-injection-enabled`).is(":checked");return{enabled:!0,promptTemplate:l.find(`#${d}-tool-prompt-template`).val()||"",extractTags:v,trigger:{event:"GENERATION_ENDED",enabled:f},output:{mode:u,apiPreset:l.find(`#${d}-tool-api-preset`).val()||"",overwrite:!0,enabled:f},bypass:{enabled:g,presetId:g&&l.find(`#${d}-tool-bypass-preset`).val()||""},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(l.find(`#${d}-tool-max-messages`).val(),10)||5),selectors:v},injection:{enabled:S,target:l.find(`#${d}-tool-injection-target`).val()||"__character__",comment:y?.injection?.comment||`YouYouToolkit:${this.toolId}`,position:l.find(`#${d}-tool-injection-position`).val()||"at_depth_as_system",depth:parseInt(l.find(`#${d}-tool-injection-depth`).val(),10)||4,order:parseInt(l.find(`#${d}-tool-injection-order`).val(),10)||a}}},async _populateLorebookOptions(l){try{let y=l.find(`#${d}-tool-injection-target`).data("currentValue")||"__character__",u=await Ut.getAvailableLorebooks(),g=u.map(f=>`
          <option value="${m(f.value)}" ${f.value===y?"selected":""}>${m(f.label)}</option>
        `).join("");l.find(`#${d}-tool-injection-target`).html(g||'<option value="__character__">\u5F53\u524D\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66</option>'),u.some(f=>f.value===y)||l.find(`#${d}-tool-injection-target`).append(`<option value="${m(y)}" selected>${m(y)}</option>`)}catch(y){console.warn(`[${c}] \u52A0\u8F7D\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:`,y)}},_showExtractionPreview(l,y){if(!C())return;let g=`${d}-${o}`,f=Array.isArray(y.messageEntries)?y.messageEntries:[],v=f.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${f.map(S=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">\u7B2C ${S.order} \u6761 AI \u6D88\u606F</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${m(S.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${m(S.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${m(S.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";l.append(rr({id:g,title:i,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${m((y.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6700\u8FD1 ${y.maxMessages} \u6761 AI \u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${m(y.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${m(y.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${m(y.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${v}
        `})),or(l,g,{onSave:S=>S()}),l.find(`#${g}-save`).text("\u5173\u95ED"),l.find(`#${g}-cancel`).remove()},bindEvents(l){let y=C();!y||!$(l)||(this._populateLorebookOptions(l),l.find(`#${d}-tool-output-mode`).on("change",()=>{let g=(l.find(`#${d}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?n:"\u968F AI \u8F93\u51FA\u5373\u4E0D\u542F\u7528\u989D\u5916\u5DE5\u5177\u94FE\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\u3002";l.find(".yyt-tool-mode-hint").text(g)}),l.find(`#${d}-tool-bypass-enabled`).on("change",u=>{let g=y(u.currentTarget).is(":checked");l.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!g)}),l.find(`#${d}-tool-injection-enabled`).on("change",u=>{let g=y(u.currentTarget).is(":checked");l.find(".yyt-injection-fields").toggleClass("yyt-hidden",!g)}),l.find(`#${d}-tool-save`).on("click",()=>{this._saveConfig(l,{silent:!1})}),l.find(`#${d}-tool-reset-template`).on("click",()=>{let g=es()[this.toolId];g?.promptTemplate&&(l.find(`#${d}-tool-prompt-template`).val(g.promptTemplate),p("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),l.find(`#${d}-tool-run-manual`).on("click",async()=>{if(this._saveConfig(l,{silent:!0}))try{let g=await Cn(this.toolId);!g?.success&&g?.error&&nt("warning",g.error,{duration:3200,noticeId:`yyt-tool-run-${this.toolId}`})}catch(g){p("error",g?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{this.renderTo(l)}}),l.find(`#${d}-tool-preview-extraction`).on("click",async()=>{if(this._saveConfig(l,{silent:!0}))try{let g=await An(this.toolId);if(!g?.success){p("error",g?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}this._showExtractionPreview(l,g)}catch(g){p("error",g?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}))},_saveConfig(l,y={}){let u=this._getFormData(l),{silent:g=!1}=y,f=mt(this.toolId,u);return f?g||p("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):p("error","\u4FDD\u5B58\u5931\u8D25"),f},destroy(l){!C()||!$(l)||l.find("*").off()},getStyles(){return _a},renderTo(l){l.html(this.render({})),this.bindEvents(l,{})}}}var _a,$n=E(()=>{rt();fe();ze();me();Pn();cs();_a=`
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

  @media screen and (max-width: 768px) {
    .yyt-tool-manual-area {
      grid-template-columns: 1fr;
    }

    .yyt-tool-manual-actions {
      min-width: 0;
    }
  }
`});var Pt,kn=E(()=>{$n();Pt=bs({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var Yt,Mn=E(()=>{$n();Yt=bs({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var Xr={};N(Xr,{BypassPanel:()=>se,default:()=>Ea});var se,Ea,hs=E(()=>{G();me();rt();se={id:"bypassPanel",render(s){let t=w.getPresetList(),e=w.getDefaultPresetId();return`
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
            ${t.map(n=>this._renderPresetItem(n,n.id===e)).join("")}
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
    `},_renderPresetItem(s,t){let e=ht&&ht[s.id];return`
      <div class="yyt-bypass-preset-item ${t?"yyt-default":""}" data-preset-id="${s.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${m(s.name)}</span>
          <span class="yyt-bypass-preset-count">${s.messages?.length||0} \u6761\u6D88\u606F</span>
        </div>
        <div class="yyt-bypass-preset-actions">
          ${t?'<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>':""}
          ${e?"":`
            <button class="yyt-btn yyt-btn-icon yyt-btn-danger yyt-bypass-quick-delete" title="\u5220\u9664\u9884\u8BBE" data-preset-id="${s.id}">
              <i class="fa-solid fa-trash"></i>
            </button>
          `}
        </div>
      </div>
    `},_renderEditor(s){if(!s)return`
        <div class="yyt-bypass-empty">
          <i class="fa-solid fa-shield-halved"></i>
          <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
        </div>
      `;let t=w.getDefaultPresetId()===s.id,e=ht&&ht[s.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${s.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${m(s.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
          </div>
          <div class="yyt-bypass-editor-actions">
            ${e?"":`
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
                 value="${m(s.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
        </div>
        
        <div class="yyt-bypass-messages-header">
          <span>\u6D88\u606F\u5217\u8868</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-add-message">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u6D88\u606F
          </button>
        </div>
        
        <div class="yyt-bypass-messages" id="yyt-bypass-messages">
          ${(s.messages||[]).map(n=>this._renderMessageItem(n)).join("")}
        </div>
        
        <div class="yyt-bypass-editor-footer">
          <button class="yyt-btn yyt-btn-primary" id="yyt-bypass-save">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58
          </button>
        </div>
      </div>
    `},_renderMessageItem(s){let t={SYSTEM:"fa-server",USER:"fa-user",assistant:"fa-robot"};return`
      <div class="yyt-bypass-message ${s.enabled===!1?"yyt-disabled":""}" data-message-id="${s.id}">
        <div class="yyt-bypass-message-header">
          <div class="yyt-bypass-message-role">
            <i class="fa-solid ${t[s.role]||"fa-comment"}"></i>
            <select class="yyt-select yyt-bypass-role-select">
              <option value="SYSTEM" ${s.role==="SYSTEM"?"selected":""}>SYSTEM</option>
              <option value="USER" ${s.role==="USER"?"selected":""}>USER</option>
              <option value="assistant" ${s.role==="assistant"?"selected":""}>assistant</option>
            </select>
          </div>
          <div class="yyt-bypass-message-controls">
            <label class="yyt-toggle yyt-small">
              <input type="checkbox" class="yyt-bypass-message-enabled" ${s.enabled!==!1?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
            ${s.deletable!==!1?`
              <button class="yyt-btn yyt-btn-icon yyt-btn-danger yyt-bypass-delete-message" title="\u5220\u9664">
                <i class="fa-solid fa-times"></i>
              </button>
            `:""}
          </div>
        </div>
        <textarea class="yyt-textarea yyt-bypass-message-content" rows="3" 
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${m(s.content||"")}</textarea>
      </div>
    `},bindEvents(s,t){let e=C();!e||!$(s)||(this._bindPresetListEvents(s,e),this._bindEditorEvents(s,e),this._bindFileEvents(s,e))},_bindPresetListEvents(s,t){s.on("click",".yyt-bypass-preset-item",e=>{if(t(e.target).closest(".yyt-bypass-quick-delete").length)return;let n=t(e.currentTarget).data("presetId");this._selectPreset(s,t,n)}),s.on("click",".yyt-bypass-quick-delete",e=>{e.stopPropagation();let n=t(e.currentTarget).data("presetId");if(!n||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=w.deletePreset(n);r.success?(s.find(".yyt-bypass-editor-content").data("presetId")===n&&s.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(s,t),p("success","\u9884\u8BBE\u5DF2\u5220\u9664")):p("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),s.find("#yyt-bypass-add").on("click",()=>{this._createNewPreset(s,t)})},_bindEditorEvents(s,t){s.on("click","#yyt-bypass-save",()=>{this._saveCurrentPreset(s,t)}),s.on("click","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(s,t)}),s.on("click","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(s,t)}),s.on("click","#yyt-bypass-set-default",()=>{this._setAsDefault(s,t)}),s.on("click","#yyt-bypass-add-message",()=>{this._addMessage(s,t)}),s.on("click",".yyt-bypass-delete-message",e=>{let n=t(e.currentTarget).closest(".yyt-bypass-message"),r=n.data("messageId");n.remove()}),s.on("change",".yyt-bypass-message-enabled",e=>{t(e.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!t(e.currentTarget).is(":checked"))})},_bindFileEvents(s,t){s.find("#yyt-bypass-import").on("click",()=>{s.find("#yyt-bypass-import-file").click()}),s.find("#yyt-bypass-import-file").on("change",async e=>{let n=e.target.files[0];if(n){try{let r=await Et(n),o=w.importPresets(r);p(o.success?"success":"error",o.message),o.success&&this.renderTo(s)}catch(r){p("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}t(e.target).val("")}}),s.find("#yyt-bypass-export").on("click",()=>{try{let e=w.exportPresets();_t(e,`bypass_presets_${Date.now()}.json`),p("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(e){p("error",`\u5BFC\u51FA\u5931\u8D25: ${e.message}`)}})},_selectPreset(s,t,e){let n=w.getPreset(e);n&&(s.find(".yyt-bypass-preset-item").removeClass("yyt-active"),s.find(`.yyt-bypass-preset-item[data-preset-id="${e}"]`).addClass("yyt-active"),s.find("#yyt-bypass-editor").html(this._renderEditor(n)))},_createNewPreset(s,t){let e=`bypass_${Date.now()}`,n=w.createPreset({id:e,name:"\u65B0\u7834\u9650\u8BCD\u9884\u8BBE",description:"",messages:[]});n.success?(this.renderTo(s),this._selectPreset(s,t,e),p("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):p("error",n?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(s,t){let e=s.find(".yyt-bypass-editor-content"),n=e.data("presetId");if(!n)return;let r=e.find(".yyt-bypass-name-input").val().trim(),o=e.find("#yyt-bypass-description").val().trim();if(!r){p("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let i=[];e.find(".yyt-bypass-message").each(function(){let c=t(this);i.push({id:c.data("messageId"),role:c.find(".yyt-bypass-role-select").val(),content:c.find(".yyt-bypass-message-content").val(),enabled:c.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let a=w.updatePreset(n,{name:r,description:o,messages:i});a.success?(p("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(s,t)):p("error",a?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(s,t){let n=s.find(".yyt-bypass-editor-content").data("presetId");if(!n||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=w.deletePreset(n);r.success?(this.renderTo(s),p("success","\u9884\u8BBE\u5DF2\u5220\u9664")):p("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(s,t){let n=s.find(".yyt-bypass-editor-content").data("presetId");if(!n)return;let r=`bypass_${Date.now()}`,o=w.duplicatePreset(n,r);o.success?(this.renderTo(s),this._selectPreset(s,t,r),p("success","\u9884\u8BBE\u5DF2\u590D\u5236")):p("error",o?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(s,t){let n=s.find(".yyt-bypass-editor-content").data("presetId");n&&(w.setDefaultPresetId(n),s.find(".yyt-bypass-preset-item").removeClass("yyt-default"),s.find(`.yyt-bypass-preset-item[data-preset-id="${n}"]`).addClass("yyt-default"),s.find(".yyt-bypass-default-badge").remove(),s.find(`.yyt-bypass-preset-item[data-preset-id="${n}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>'),p("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE"))},_addMessage(s,t){let e=s.find("#yyt-bypass-messages"),n={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};e.append(this._renderMessageItem(n))},_refreshPresetList(s,t){let e=w.getPresetList(),n=w.getDefaultPresetId();s.find(".yyt-bypass-preset-list").html(e.map(r=>this._renderPresetItem(r,r.id===n)).join(""))},destroy(s){!C()||!$(s)||s.find("*").off()},getStyles(){return`
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
    `},renderTo(s){let t=this.render({});s.html(t),this.bindEvents(s,{})}},Ea=se});function xs(){V.register(yt.id,yt),V.register(ut.id,ut),V.register(gt.id,gt),V.register(Pt.id,Pt),V.register(Yt.id,Yt),V.register(se.id,se),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function In(s={}){V.init(s),xs(),V.injectStyles(),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}var Zr=E(()=>{Fs();Hs();Ks();on();kn();Mn();hs();rt();Fs();Hs();Ks();on();kn();Mn();hs()});var lo={};N(lo,{ApiPresetPanel:()=>yt,RegexExtractPanel:()=>ut,SCRIPT_ID:()=>d,StatusBlockPanel:()=>Yt,SummaryToolPanel:()=>Pt,ToolManagePanel:()=>gt,default:()=>Sa,escapeHtml:()=>m,fillFormWithConfig:()=>qt,getCurrentTab:()=>io,getFormApiConfig:()=>Dt,getJQuery:()=>C,getRegexStyles:()=>ro,getStyles:()=>no,getToolStyles:()=>oo,initUI:()=>In,isContainerValid:()=>$,registerComponents:()=>xs,render:()=>to,renderRegex:()=>eo,renderTool:()=>so,setCurrentTab:()=>ao,showToast:()=>p,uiManager:()=>V});function Rn(s,t){let e=C();return e?s?typeof s=="string"?e(s):s?.jquery?s:e(s):t:(console.error("[YouYouToolkit] jQuery not available"),null)}function to(s){if(ve=Rn(s,ve),!ve||!ve.length){console.error("[YouYouToolkit] Container not found or invalid");return}yt.renderTo(ve)}function eo(s){if(we=Rn(s,we),!we||!we.length){console.error("[YouYouToolkit] Regex container not found");return}ut.renderTo(we)}function so(s){if(Te=Rn(s,Te),!Te||!Te.length){console.error("[YouYouToolkit] Tool container not found");return}gt.renderTo(Te)}function no(){return yt.getStyles()}function ro(){return ut.getStyles()}function oo(){return[gt.getStyles(),Pt.getStyles()].join(`
`)}function io(){return V.getCurrentTab()}function ao(s){V.switchTab(s)}var ve,we,Te,Sa,co=E(()=>{Zr();ve=null,we=null,Te=null;Sa={render:to,renderRegex:eo,renderTool:so,getStyles:no,getRegexStyles:ro,getToolStyles:oo,getCurrentTab:io,setCurrentTab:ao,uiManager:V,ApiPresetPanel:yt,RegexExtractPanel:ut,ToolManagePanel:gt,SummaryToolPanel:Pt,StatusBlockPanel:Yt,registerComponents:xs,initUI:In,SCRIPT_ID:d,escapeHtml:m,showToast:p,getJQuery:C,isContainerValid:$,getFormApiConfig:Dt,fillFormWithConfig:qt}});var po={};N(po,{WindowManager:()=>vs,closeWindow:()=>$a,createWindow:()=>Pa,windowManager:()=>Z});function Aa(){if(Z.stylesInjected)return;Z.stylesInjected=!0;let s=`
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
  `,t=document.createElement("style");t.id=Ca+"_styles",t.textContent=s,(document.head||document.documentElement).appendChild(t)}function Pa(s){let{id:t,title:e="\u7A97\u53E3",content:n="",width:r=900,height:o=700,modal:i=!1,resizable:a=!0,maximizable:c=!0,startMaximized:l=!1,rememberState:y=!0,onClose:u,onReady:g}=s;Aa();let f=window.jQuery||window.parent?.jQuery;if(!f)return console.error("[WindowManager] jQuery not available"),null;if(Z.isOpen(t))return Z.bringToFront(t),Z.getWindow(t);let v=window.innerWidth||1200,S=window.innerHeight||800,z=v<=1100,B=null,at=!1;y&&(B=Z.getState(t),B&&!z&&(at=!0));let W,xt;at&&B.width&&B.height?(W=Math.max(400,Math.min(B.width,v-40)),xt=Math.max(300,Math.min(B.height,S-40))):(W=Math.max(400,Math.min(r,v-40)),xt=Math.max(300,Math.min(o,S-40)));let $e=Math.max(20,Math.min((v-W)/2,v-W-20)),et=Math.max(20,Math.min((S-xt)/2,S-xt-20)),Lo=c&&!z,jo=`
    <div class="yyt-window" id="${t}" style="left:${$e}px; top:${et}px; width:${W}px; height:${xt}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${ka(e)}</span>
        </div>
        <div class="yyt-window-controls">
          ${Lo?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
          <button class="yyt-window-btn close" title="\u5173\u95ED"><i class="fa-solid fa-times"></i></button>
        </div>
      </div>
      <div class="yyt-window-body">${n}</div>
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
  `,kt=null;i&&(kt=f(`<div class="yyt-window-overlay" data-for="${t}"></div>`),f(document.body).append(kt));let _=f(jo);f(document.body).append(_),Z.register(t,_),_.on("mousedown",()=>Z.bringToFront(t));let vt=!1,Mt={left:$e,top:et,width:W,height:xt},ke=()=>{Mt={left:parseInt(_.css("left")),top:parseInt(_.css("top")),width:_.width(),height:_.height()},_.addClass("maximized"),_.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),vt=!0},No=()=>{_.removeClass("maximized"),_.css({left:Mt.left+"px",top:Mt.top+"px",width:Mt.width+"px",height:Mt.height+"px"}),_.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),vt=!1};_.find(".yyt-window-btn.maximize").on("click",()=>{vt?No():ke()}),(z&&c||at&&B.isMaximized&&c||l&&c)&&ke(),_.find(".yyt-window-btn.close").on("click",()=>{if(y&&c){let Q={width:vt?Mt.width:_.width(),height:vt?Mt.height:_.height(),isMaximized:vt};Z.saveState(t,Q)}u&&u(),kt&&kt.remove(),_.remove(),Z.unregister(t),f(document).off(".yytWindowDrag"+t),f(document).off(".yytWindowResize"+t)}),kt&&kt.on("click",Q=>{Q.target,kt[0]});let Me=!1,Yn,Gn,Fn,Hn;if(_.find(".yyt-window-header").on("mousedown",Q=>{f(Q.target).closest(".yyt-window-controls").length||vt||(Me=!0,Yn=Q.clientX,Gn=Q.clientY,Fn=parseInt(_.css("left")),Hn=parseInt(_.css("top")),f(document.body).css("user-select","none"))}),f(document).on("mousemove.yytWindowDrag"+t,Q=>{if(!Me)return;let q=Q.clientX-Yn,Ie=Q.clientY-Gn;_.css({left:Math.max(0,Fn+q)+"px",top:Math.max(0,Hn+Ie)+"px"})}),f(document).on("mouseup.yytWindowDrag"+t,()=>{Me&&(Me=!1,f(document.body).css("user-select",""))}),a){let Q=!1,q="",Ie,Wn,Re,De,Ps,$s;_.find(".yyt-window-resize-handle").on("mousedown",function(Gt){vt||(Q=!0,q="",f(this).hasClass("se")?q="se":f(this).hasClass("e")?q="e":f(this).hasClass("s")?q="s":f(this).hasClass("w")?q="w":f(this).hasClass("n")?q="n":f(this).hasClass("nw")?q="nw":f(this).hasClass("ne")?q="ne":f(this).hasClass("sw")&&(q="sw"),Ie=Gt.clientX,Wn=Gt.clientY,Re=_.width(),De=_.height(),Ps=parseInt(_.css("left")),$s=parseInt(_.css("top")),f(document.body).css("user-select","none"),Gt.stopPropagation())}),f(document).on("mousemove.yytWindowResize"+t,Gt=>{if(!Q)return;let ks=Gt.clientX-Ie,Ms=Gt.clientY-Wn,Qn=400,qn=300,Is=Re,Rs=De,Jn=Ps,Vn=$s;if(q.includes("e")&&(Is=Math.max(Qn,Re+ks)),q.includes("s")&&(Rs=Math.max(qn,De+Ms)),q.includes("w")){let oe=Re-ks;oe>=Qn&&(Is=oe,Jn=Ps+ks)}if(q.includes("n")){let oe=De-Ms;oe>=qn&&(Rs=oe,Vn=$s+Ms)}_.css({width:Is+"px",height:Rs+"px",left:Jn+"px",top:Vn+"px"})}),f(document).on("mouseup.yytWindowResize"+t,()=>{Q&&(Q=!1,f(document.body).css("user-select",""))})}return _.on("remove",()=>{f(document).off(".yytWindowDrag"+t),f(document).off(".yytWindowResize"+t)}),g&&setTimeout(()=>g(_),50),_}function $a(s){let t=Z.getWindow(s);if(t){let e=window.jQuery||window.parent?.jQuery;e&&(e(`.yyt-window-overlay[data-for="${s}"]`).remove(),e(document).off(".yytWindowDrag"+s),e(document).off(".yytWindowResize"+s)),t.remove(),Z.unregister(s)}}function ka(s){return typeof s!="string"?"":s.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}var Ca,yo,vs,Z,uo=E(()=>{lt();Ca="youyou_toolkit_window_manager",yo="window_states",vs=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(t,e){this.topZIndex++,this.windows.set(t,{$el:e,zIndex:this.topZIndex}),e.css("z-index",this.topZIndex)}unregister(t){this.windows.delete(t)}bringToFront(t){let e=this.windows.get(t);e&&(this.topZIndex++,e.zIndex=this.topZIndex,e.$el.css("z-index",this.topZIndex))}getWindow(t){return this.windows.get(t)?.$el||null}isOpen(t){return this.windows.has(t)}closeAll(){this.windows.forEach((t,e)=>{t.$el&&t.$el.remove()}),this.windows.clear()}saveState(t,e){let n=this.loadStates();n[t]={...e,updatedAt:Date.now()},ie.set(yo,n)}loadStates(){return ie.get(yo)||{}}getState(t){return this.loadStates()[t]||null}},Z=new vs});var go={};N(go,{DEFAULT_PROMPT_SEGMENTS:()=>ws,PromptEditor:()=>Ts,default:()=>Na,getPromptEditorStyles:()=>Da,messagesToSegments:()=>ja,segmentsToMessages:()=>La,validatePromptSegments:()=>Oa});function Da(){return`
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
  `}function Oa(s){let t=[];return Array.isArray(s)?(s.forEach((e,n)=>{e.id||t.push(`\u6BB5\u843D ${n+1} \u7F3A\u5C11ID`),e.role||t.push(`\u6BB5\u843D ${n+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(e.role)||t.push(`\u6BB5\u843D ${n+1} \u7684role\u503C\u65E0\u6548: ${e.role}`)}),{valid:t.length===0,errors:t}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function La(s){return s.filter(t=>t.content&&t.content.trim()).map(t=>({role:t.role,content:t.content,deletable:t.deletable,mainSlot:t.mainSlot}))}function ja(s){return Array.isArray(s)?s.map((t,e)=>({id:`segment_${e}_${Date.now()}`,type:t.role==="SYSTEM"?"system":t.role==="assistant"?"ai":"user",role:t.role,mainSlot:t.mainSlot||"",content:t.content||"",deletable:t.deletable!==!1,expanded:!0,isMain:t.mainSlot==="A"||t.isMain,isMain2:t.mainSlot==="B"||t.isMain2})):[...ws]}var Ma,Ia,Ra,ws,Ts,Na,fo=E(()=>{Ma="youyou_toolkit_prompt_editor",Ia={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},Ra={system:"fa-server",ai:"fa-robot",user:"fa-user"},ws=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],Ts=class{constructor(t={}){this.containerId=t.containerId||Ma,this.segments=t.segments||[...ws],this.onChange=t.onChange||null,this.editable=t.editable!==!1,this.showMainSlot=t.showMainSlot!==!1,this.$container=null,this.$=null}init(t){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=t,this.render(),this.bindEvents()}setSegments(t){this.segments=t&&Array.isArray(t)?[...t]:[...ws],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(t=>({...t,content:this.getSegmentContent(t.id)}))}getSegmentContent(t){return this.$container&&this.$container.find(`[data-segment-id="${t}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let t=`
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
          ${this.segments.map(e=>this.renderSegment(e)).join("")}
        </div>
      </div>
    `;this.$container.html(t)}renderSegment(t){let e=Ia[t.type]||t.type,n=Ra[t.type]||"fa-file",r=t.mainSlot==="A"||t.isMain,o=t.mainSlot==="B"||t.isMain2,i=r?"var(--yyt-accent, #7bb7ff)":o?"#ffb74d":"",a=this.showMainSlot&&t.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${t.mainSlot}</span>`:"",c=`<span class="yyt-prompt-role-badge">role: ${t.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${t.expanded?"yyt-expanded":""} ${r?"yyt-main-a":""} ${o?"yyt-main-b":""}" 
           data-segment-id="${t.id}" 
           data-segment-type="${t.type}"
           style="${i?`border-left: 3px solid ${i};`:""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${n}"></i>
            <span class="yyt-prompt-segment-title">${e}</span>
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
    `}bindEvents(){this.$container&&(this.$container.find(".yyt-prompt-toggle").on("click",t=>{this.$(t.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(t.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.find(".yyt-prompt-delete").on("click",t=>{let e=this.$(t.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(e)}),this.$container.find(".yyt-prompt-role").on("change",t=>{let e=this.$(t.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(t.currentTarget).val();this.updateSegmentMeta(e,{role:n})}),this.$container.find(".yyt-prompt-main-slot").on("change",t=>{let e=this.$(t.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(t.currentTarget).val();this.updateSegmentMeta(e,{mainSlot:n})}),this.$container.find(".yyt-prompt-textarea").on("input",t=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.find(`#${this.containerId}-add-segment`).on("click",()=>{this.addSegment()}),this.$container.find(`#${this.containerId}-import-prompt`).on("click",()=>{this.importPrompt()}),this.$container.find(`#${this.containerId}-export-prompt`).on("click",()=>{this.exportPrompt()}))}addSegment(t=null){let e=`segment_${Date.now()}`,n=t||{id:e,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};n.id||(n.id=e),this.segments.push(n),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(t){let e=this.segments.findIndex(r=>r.id===t);if(e===-1)return;if(this.segments[e].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(e,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(t,e){let n=this.segments.find(r=>r.id===t);n&&(Object.assign(n,e),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let t=document.createElement("input");t.type="file",t.accept=".json",t.onchange=e=>{let n=e.target.files[0];if(!n)return;let r=new FileReader;r.onload=o=>{try{let i=JSON.parse(o.target.result);Array.isArray(i)?(this.setSegments(i),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(i){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",i)}},r.readAsText(n)},t.click()}exportPrompt(){let t=this.getSegments(),e=JSON.stringify(t,null,2),n=new Blob([e],{type:"application/json"}),r=URL.createObjectURL(n),o=document.createElement("a");o.href=r,o.download=`prompt_group_${Date.now()}.json`,o.click(),URL.revokeObjectURL(r),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}escapeHtml(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}};Na=Ts});var ho={};N(ho,{BUILTIN_VARIABLES:()=>mo,VariableResolver:()=>_s,default:()=>Ua,variableResolver:()=>bo});var mo,_s,bo,Ua,xo=E(()=>{G();mo={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"}},_s=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(t,e){if(typeof t!="string")return t;let n=t;return n=this._resolveBuiltinVariables(n,e),n=this._resolveCustomVariables(n,e),n=this._resolveRegexVariables(n,e),n}resolveObject(t,e){if(!t||typeof t!="object")return t;if(Array.isArray(t))return t.map(r=>this.resolveObject(r,e));let n={};for(let[r,o]of Object.entries(t))typeof o=="string"?n[r]=this.resolveTemplate(o,e):typeof o=="object"&&o!==null?n[r]=this.resolveObject(o,e):n[r]=o;return n}buildToolContext(t){return{lastUserMessage:t.lastUserMessage||"",lastAiMessage:t.lastAiMessage||"",chatHistory:t.chatHistory||[],characterCard:t.characterCard||null,characterName:t.characterCard?.name||"",toolName:t.toolName||"",toolId:t.toolId||"",injectedContext:t.injectedContext||"",regexResults:t.regexResults||{},raw:t,timestamp:Date.now()}}registerVariable(t,e){t&&(this.customVariables.set(t,e),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${t}`))}unregisterVariable(t){this.customVariables.delete(t),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${t}`)}registerHandler(t,e){!t||typeof e!="function"||(this.variableHandlers.set(t,e),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${t}`))}getAvailableVariables(){let t=[];for(let[,e]of Object.entries(mo))t.push({name:`{{${e.name}}}`,description:e.description,category:e.category,type:"builtin"});for(let[e,n]of this.customVariables)t.push({name:`{{${e}}}`,description:typeof n=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return t}getVariableHelp(){let t=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],e={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},n={};for(let r of this.getAvailableVariables())n[r.category]||(n[r.category]=[]),n[r.category].push(r);for(let[r,o]of Object.entries(e))if(n[r]&&n[r].length>0){t.push(`\u3010${o}\u3011`);for(let i of n[r])t.push(`  ${i.name} - ${i.description}`);t.push("")}return t.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),t.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),t.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(t,e)=>(e.regexResults||e.raw?.regexResults||{})[t]||"")}_resolveBuiltinVariables(t,e){let n=t;return n=n.replace(/\{\{lastUserMessage\}\}/gi,e.lastUserMessage||e.raw?.lastUserMessage||""),n=n.replace(/\{\{lastAiMessage\}\}/gi,e.lastAiMessage||e.raw?.lastAiMessage||""),n=n.replace(/\{\{chatHistory\}\}/gi,()=>{let r=e.chatHistory||e.raw?.chatHistory||[];return this._formatChatHistory(r)}),n=n.replace(/\{\{characterCard\}\}/gi,()=>{let r=e.characterCard||e.raw?.characterCard;return r?this._formatCharacterCard(r):""}),n=n.replace(/\{\{toolName\}\}/gi,e.toolName||e.raw?.toolName||""),n=n.replace(/\{\{injectedContext\}\}/gi,e.injectedContext||e.raw?.injectedContext||""),n}_resolveCustomVariables(t,e){let n=t;for(let[r,o]of this.customVariables){let i=new RegExp(`\\{\\{${this._escapeRegex(r)}\\}\\}`,"gi");typeof o=="function"?n=n.replace(i,()=>{try{return o(e)}catch(a){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}:`,a),""}}):n=n.replace(i,String(o))}return n}_resolveRegexVariables(t,e){let n=t;for(let[r,o]of this.variableHandlers){let i=new RegExp(`\\{\\{${r}\\.([^}]+)\\}\\}`,"gi");n=n.replace(i,(a,c)=>{try{return o(c,e)}catch(l){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}.${c}:`,l),""}})}return n}_formatChatHistory(t){return!Array.isArray(t)||t.length===0?"":t.map(e=>{let n=e.role||"unknown",r=e.content||e.mes||"";return`[${n}]: ${r}`}).join(`

`)}_formatCharacterCard(t){if(!t)return"";let e=[];return t.name&&e.push(`\u59D3\u540D: ${t.name}`),t.description&&e.push(`\u63CF\u8FF0: ${t.description}`),t.personality&&e.push(`\u6027\u683C: ${t.personality}`),t.scenario&&e.push(`\u573A\u666F: ${t.scenario}`),e.join(`

`)}_escapeRegex(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...t){this.debugMode&&console.log("[VariableResolver]",...t)}},bo=new _s,Ua=bo});var On={};N(On,{SettingsPanel:()=>wo,THEME_CONFIGS:()=>Dn,applyTheme:()=>vo,default:()=>za});function vo(s){let t=document.documentElement,e=Dn[s]||Dn["dark-blue"];Object.entries(e).forEach(([n,r])=>{t.style.setProperty(n,r)}),t.setAttribute("data-yyt-theme",s),s==="light"?t.style.setProperty("--yyt-text","rgba(15, 23, 42, 0.95)"):t.style.setProperty("--yyt-text","rgba(255, 255, 255, 0.95)")}var Dn,wo,za,Ln=E(()=>{G();is();rt();Dn={"dark-blue":{"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.7)","--yyt-text-muted":"rgba(15, 23, 42, 0.45)","--yyt-surface":"rgba(0, 0, 0, 0.03)","--yyt-surface-hover":"rgba(0, 0, 0, 0.06)","--yyt-surface-active":"rgba(0, 0, 0, 0.08)","--yyt-border":"rgba(0, 0, 0, 0.08)","--yyt-border-strong":"rgba(0, 0, 0, 0.15)"}};wo={id:"settingsPanel",render(s){let t=Ct.getSettings();return`
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
    `},_renderExecutorTab(s){return`
      <div class="yyt-settings-tab-content yyt-active" data-tab="executor">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u5E76\u53D1\u63A7\u5236</div>
          <div class="yyt-form-group">
            <label>\u6700\u5927\u5E76\u53D1\u6570</label>
            <div class="yyt-form-hint">\u540C\u65F6\u6267\u884C\u7684\u5DE5\u5177\u6570\u91CF\u4E0A\u9650</div>
            <input type="number" class="yyt-input" id="yyt-setting-maxConcurrent" 
                   value="${s.maxConcurrent}" min="1" max="10">
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u91CD\u8BD5\u7B56\u7565</div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u6700\u5927\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-setting-maxRetries" 
                     value="${s.maxRetries}" min="0" max="10">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u95F4\u9694 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-retryDelayMs" 
                     value="${s.retryDelayMs}" min="1000" max="60000" step="1000">
            </div>
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u8D85\u65F6\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label>\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4 (ms)</label>
            <div class="yyt-form-hint">\u5355\u4E2A\u8BF7\u6C42\u7684\u8D85\u65F6\u65F6\u95F4\uFF0C\u8D85\u8FC7\u5C06\u81EA\u52A8\u4E2D\u65AD</div>
            <input type="number" class="yyt-input" id="yyt-setting-requestTimeoutMs" 
                   value="${s.requestTimeoutMs}" min="10000" max="300000" step="10000">
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u961F\u5217\u7B56\u7565</div>
          <div class="yyt-form-group">
            <label>\u961F\u5217\u5904\u7406\u65B9\u5F0F</label>
            <select class="yyt-select" id="yyt-setting-queueStrategy">
              <option value="fifo" ${s.queueStrategy==="fifo"?"selected":""}>FIFO (\u5148\u8FDB\u5148\u51FA)</option>
              <option value="lifo" ${s.queueStrategy==="lifo"?"selected":""}>LIFO (\u540E\u8FDB\u5148\u51FA)</option>
              <option value="priority" ${s.queueStrategy==="priority"?"selected":""}>\u4F18\u5148\u7EA7\u6392\u5E8F</option>
            </select>
          </div>
        </div>
      </div>
    `},_renderListenerTab(s){return`
      <div class="yyt-settings-tab-content" data-tab="listener">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u4E8B\u4EF6\u76D1\u542C</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-listenGenerationEnded" 
                     ${s.listenGenerationEnded?"checked":""}>
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
                     ${s.ignoreQuietGeneration?"checked":""}>
              <span>\u5FFD\u7565\u9759\u9ED8\u751F\u6210</span>
            </label>
            <div class="yyt-form-hint">Quiet \u6A21\u5F0F\u7684\u751F\u6210\u4E0D\u4F1A\u89E6\u53D1\u5DE5\u5177</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-ignoreAutoTrigger" 
                     ${s.ignoreAutoTrigger?"checked":""}>
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
                   value="${s.debounceMs}" min="0" max="5000" step="100">
          </div>
        </div>
      </div>
    `},_renderDebugTab(s){return`
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u65E5\u5FD7\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-enableDebugLog" 
                     ${s.enableDebugLog?"checked":""}>
              <span>\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7</span>
            </label>
            <div class="yyt-form-hint">\u5728\u63A7\u5236\u53F0\u8F93\u51FA\u8BE6\u7EC6\u7684\u8C03\u8BD5\u4FE1\u606F</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-saveExecutionHistory" 
                     ${s.saveExecutionHistory?"checked":""}>
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
                     ${s.showRuntimeBadge?"checked":""}>
              <span>\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0</span>
            </label>
            <div class="yyt-form-hint">\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668</div>
          </div>
        </div>
      </div>
    `},_renderUiTab(s){return`
      <div class="yyt-settings-tab-content" data-tab="ui">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u5916\u89C2\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label>\u4E3B\u9898</label>
            <select class="yyt-select" id="yyt-setting-theme">
              <option value="dark-blue" ${s.theme==="dark-blue"?"selected":""}>\u6DF1\u84DD</option>
              <option value="dark-purple" ${s.theme==="dark-purple"?"selected":""}>\u6DF1\u7D2B</option>
              <option value="dark-green" ${s.theme==="dark-green"?"selected":""}>\u6DF1\u7EFF</option>
              <option value="light" ${s.theme==="light"?"selected":""}>\u6D45\u8272</option>
            </select>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-compactMode" 
                     ${s.compactMode?"checked":""}>
              <span>\u7D27\u51D1\u6A21\u5F0F</span>
            </label>
            <div class="yyt-form-hint">\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-animationEnabled" 
                     ${s.animationEnabled?"checked":""}>
              <span>\u542F\u7528\u52A8\u753B\u6548\u679C</span>
            </label>
            <div class="yyt-form-hint">\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B</div>
          </div>
        </div>
      </div>
    `},bindEvents(s,t){let e=C();!e||!$(s)||(s.find(".yyt-settings-tab").on("click",n=>{let r=e(n.currentTarget).data("tab");s.find(".yyt-settings-tab").removeClass("yyt-active"),e(n.currentTarget).addClass("yyt-active"),s.find(".yyt-settings-tab-content").removeClass("yyt-active"),s.find(`.yyt-settings-tab-content[data-tab="${r}"]`).addClass("yyt-active")}),s.find("#yyt-settings-save").on("click",()=>{this._saveSettings(s,e)}),s.find("#yyt-settings-reset").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(Ct.resetSettings(),this.renderTo(s),p("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}))},_saveSettings(s,t){let e={executor:{maxConcurrent:parseInt(s.find("#yyt-setting-maxConcurrent").val())||3,maxRetries:parseInt(s.find("#yyt-setting-maxRetries").val())||2,retryDelayMs:parseInt(s.find("#yyt-setting-retryDelayMs").val())||5e3,requestTimeoutMs:parseInt(s.find("#yyt-setting-requestTimeoutMs").val())||9e4,queueStrategy:s.find("#yyt-setting-queueStrategy").val()||"fifo"},listener:{listenGenerationEnded:s.find("#yyt-setting-listenGenerationEnded").is(":checked"),ignoreQuietGeneration:s.find("#yyt-setting-ignoreQuietGeneration").is(":checked"),ignoreAutoTrigger:s.find("#yyt-setting-ignoreAutoTrigger").is(":checked"),debounceMs:parseInt(s.find("#yyt-setting-debounceMs").val())||300},debug:{enableDebugLog:s.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:s.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:s.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:s.find("#yyt-setting-theme").val()||"dark-blue",compactMode:s.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:s.find("#yyt-setting-animationEnabled").is(":checked")}};Ct.saveSettings(e),vo(e.ui.theme),document.documentElement.classList.toggle("yyt-compact-mode",e.ui.compactMode),document.documentElement.classList.toggle("yyt-no-animation",!e.ui.animationEnabled),p("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},destroy(s){!C()||!$(s)||s.find("*").off()},getStyles(){return`
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
    `},renderTo(s){let t=this.render({});s.html(t),this.bindEvents(s,{})}},za=wo});var j="youyou_toolkit",Un="0.6.2",_e=`${j}-menu-item`,jn=`${j}-menu-container`,Ba=`${j}-popup`,L=typeof window.parent<"u"?window.parent:window,Es=null,it=null,Ee=null,H=null,_o=null,As=null,Eo=null,Se=null,Ce=null,tt=null,X=null,Ae=null,So=null,Co=null,Ao=null,Po=null,Ss=null;async function ne(){try{return Es=await Promise.resolve().then(()=>(le(),tr)),it=await Promise.resolve().then(()=>(Ls(),sr)),Ee=await Promise.resolve().then(()=>(ze(),nr)),H=await Promise.resolve().then(()=>(co(),lo)),_o=await Promise.resolve().then(()=>(Ke(),br)),As=await Promise.resolve().then(()=>(rn(),hr)),Eo=await Promise.resolve().then(()=>(mn(),Ur)),Se=await Promise.resolve().then(()=>(Pn(),Kr)),Ce=await Promise.resolve().then(()=>(uo(),po)),tt=await Promise.resolve().then(()=>(fe(),Dr)),X=await Promise.resolve().then(()=>(fo(),go)),Ae=await Promise.resolve().then(()=>(is(),zr)),So=await Promise.resolve().then(()=>(me(),Or)),Co=await Promise.resolve().then(()=>(xo(),ho)),Ao=await Promise.resolve().then(()=>(cs(),Yr)),Po=await Promise.resolve().then(()=>(xn(),Fr)),Ss=await Promise.resolve().then(()=>(vn(),Hr)),Ss?.toolOutputService&&it&&Ss.toolOutputService.setApiConnection(it),!0}catch(s){return console.warn(`[${j}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,s),!1}}function U(...s){console.log(`[${j}]`,...s)}function $o(...s){console.error(`[${j}]`,...s)}function To(s){return typeof s!="string"?"":s.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}async function Ya(){let s=`${j}-styles`,t=L.document||document;if(t.getElementById(s))return;let e="";try{let r=await fetch("./styles/main.css");r.ok&&(e=await r.text())}catch{U("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F")}e||(e=Ga());let n=t.createElement("style");n.id=s,n.textContent=e,(t.head||t.documentElement).appendChild(n),U("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function Ga(){return`
    /* CSS\u53D8\u91CF */
    :root {
      --yyt-accent: #7bb7ff;
      --yyt-accent-glow: rgba(123, 183, 255, 0.4);
      --yyt-accent-soft: rgba(123, 183, 255, 0.15);
      --yyt-success: #4ade80;
      --yyt-success-glow: rgba(74, 222, 128, 0.3);
      --yyt-error: #f87171;
      --yyt-danger: var(--yyt-error);
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
    #${jn} { display: flex; align-items: center; }
    
    #${_e} {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 14px; cursor: pointer;
      transition: all 0.2s ease; border-radius: 8px; margin: 2px;
    }
    
    #${_e}:hover {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
    }
    
    #${_e} .fa-fw {
      font-size: 16px; color: var(--yyt-accent);
      filter: drop-shadow(0 0 6px var(--yyt-accent-glow));
    }
    
    #${_e} span { font-weight: 500; letter-spacing: 0.3px; }
    
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
  `}var A=null,$t=null,re="apiPresets",zn={};function Cs(){A&&(A.remove(),A=null),$t&&($t.remove(),$t=null),U("\u5F39\u7A97\u5DF2\u5173\u95ED")}function ko(s){re=s;let t=L.jQuery||window.jQuery;if(!t||!A)return;t(A).find(".yyt-main-nav-item").removeClass("active"),t(A).find(`.yyt-main-nav-item[data-tab="${s}"]`).addClass("active");let e=tt?.getToolConfig(s);e?.hasSubTabs?(t(A).find(".yyt-sub-nav").show(),Io(s,e.subTabs)):t(A).find(".yyt-sub-nav").hide(),t(A).find(".yyt-tab-content").removeClass("active"),t(A).find(`.yyt-tab-content[data-tab="${s}"]`).addClass("active"),Ro(s)}function Mo(s,t){zn[s]=t;let e=L.jQuery||window.jQuery;!e||!A||(e(A).find(".yyt-sub-nav-item").removeClass("active"),e(A).find(`.yyt-sub-nav-item[data-subtab="${t}"]`).addClass("active"),Bn(s,t))}function Io(s,t){let e=L.jQuery||window.jQuery;if(!e||!A||!t)return;let n=zn[s]||t[0]?.id,r=t.map(o=>`
    <div class="yyt-sub-nav-item ${o.id===n?"active":""}" data-subtab="${o.id}">
      <i class="fa-solid ${o.icon||"fa-file"}"></i>
      <span>${o.name}</span>
    </div>
  `).join("");e(A).find(".yyt-sub-nav").html(r),e(A).find(".yyt-sub-nav-item").on("click",function(){let o=e(this).data("subtab");Mo(s,o)})}async function Ro(s){let t=L.jQuery||window.jQuery;if(!t||!A)return;let e=t(A).find(`.yyt-tab-content[data-tab="${s}"]`);if(!e.length)return;let n=tt?.getToolConfig(s);switch(s){case"apiPresets":H&&H.render(e);break;case"regexExtract":H&&H.renderRegex(e);break;case"tools":if(n?.hasSubTabs&&n.subTabs?.length>0){let r=n.subTabs[0].id;Bn(s,r)}else e.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":await Fa(e);break;case"settings":await Ha(e);break;default:Wa(s,e);break}}async function Fa(s){if(L.jQuery||window.jQuery)try{let{BypassPanel:e}=await Promise.resolve().then(()=>(hs(),Xr)),n=`${j}-bypass-styles`,r=L.document||document;if(!r.getElementById(n)&&e.getStyles){let o=r.createElement("style");o.id=n,o.textContent=e.getStyles(),(r.head||r.documentElement).appendChild(o)}e.renderTo(s)}catch(e){console.error(`[${j}] \u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,e),s.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}async function Ha(s){if(L.jQuery||window.jQuery)try{let{SettingsPanel:e}=await Promise.resolve().then(()=>(Ln(),On)),n=`${j}-settings-styles`,r=L.document||document;if(!r.getElementById(n)&&e.getStyles){let o=r.createElement("style");o.id=n,o.textContent=e.getStyles(),(r.head||r.documentElement).appendChild(o)}e.renderTo(s)}catch(e){console.error(`[${j}] \u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,e),s.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function Bn(s,t){let e=L.jQuery||window.jQuery;if(!e||!A)return;let n=e(A).find(`.yyt-tab-content[data-tab="${s}"]`);if(!n.length)return;let r=tt?.getToolConfig(s);if(r?.hasSubTabs){let i=r.subTabs?.find(a=>a.id===t);if(i){let a=n.find(".yyt-sub-content");switch(a.length||(n.html('<div class="yyt-sub-content"></div>'),a=n.find(".yyt-sub-content")),i.component){case"SummaryToolPanel":H?.SummaryToolPanel?H.SummaryToolPanel.renderTo(a):a.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"StatusBlockPanel":H?.StatusBlockPanel?H.StatusBlockPanel.renderTo(a):a.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:a.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}return}let o=n.find(".yyt-sub-content");if(o.length)switch(t){case"config":Qa(s,o);break;case"prompts":qa(s,o);break;case"presets":Ja(s,o);break;default:o.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}function Wa(s,t){if(!(L.jQuery||window.jQuery))return;let n=tt?.getToolConfig(s);if(!n){t.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let r=zn[s]||n.subTabs?.[0]?.id||"config";t.html(`
    <div class="yyt-tool-window">
      <div class="yyt-sub-content" data-subtab="${r}">
        <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
      </div>
    </div>
  `),Bn(s,r)}function Qa(s,t){if(!(L.jQuery||window.jQuery))return;let n=As?.getTool(s),r=Ee?.getAllPresets()||[],o=tt?.getToolApiPreset(s)||"",i=r.map(a=>`<option value="${To(a.name)}" ${a.name===o?"selected":""}>${To(a.name)}</option>`).join("");t.html(`
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
            <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${n?.config?.execution?.timeout||6e4}">
          </div>
          <div class="yyt-form-group yyt-flex-1">
            <label>\u91CD\u8BD5\u6B21\u6570</label>
            <input type="number" class="yyt-input" id="yyt-tool-retries" value="${n?.config?.execution?.retries||3}">
          </div>
        </div>
      </div>
    </div>
  `),t.find("#yyt-save-tool-preset").on("click",function(){let a=t.find("#yyt-tool-api-preset").val();tt?.setToolApiPreset(s,a);let c=L.toastr;c&&c.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}function qa(s,t){if(!(L.jQuery||window.jQuery)||!X){t.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let r=As?.getTool(s)?.config?.messages||[],o=X.messagesToSegments?X.messagesToSegments(r):X.DEFAULT_PROMPT_SEGMENTS,i=new X.PromptEditor({containerId:`yyt-prompt-editor-${s}`,segments:o,onChange:c=>{let l=X.segmentsToMessages?X.segmentsToMessages(c):[];U("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",l.length,"\u6761\u6D88\u606F")}});t.html(`<div id="yyt-prompt-editor-${s}" class="yyt-prompt-editor-container"></div>`),i.init(t.find(`#yyt-prompt-editor-${s}`));let a=X.getPromptEditorStyles?X.getPromptEditorStyles():"";if(a){let c="yyt-prompt-editor-styles";if(!document.getElementById(c)){let l=document.createElement("style");l.id=c,l.textContent=a,document.head.appendChild(l)}}}function Ja(s,t){(L.jQuery||window.jQuery)&&t.html(`
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
  `)}function Do(){if(A){U("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let s=L.jQuery||window.jQuery,t=L.document||document;if(!s){$o("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let e=tt?.getToolList()||[];$t=t.createElement("div"),$t.className="yyt-popup-overlay",$t.addEventListener("click",c=>{c.target===$t&&Cs()}),t.body.appendChild($t);let n=e.map(c=>`
    <div class="yyt-main-nav-item ${c.id===re?"active":""}" data-tab="${c.id}">
      <i class="fa-solid ${c.icon}"></i>
      <span>${c.name}</span>
    </div>
  `).join(""),r=e.map(c=>`
    <div class="yyt-tab-content ${c.id===re?"active":""}" data-tab="${c.id}">
      <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
    </div>
  `).join(""),o=`
    <div class="yyt-popup" id="${Ba}">
      <div class="yyt-popup-header">
        <div class="yyt-popup-title">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span>YouYou \u5DE5\u5177\u7BB1</span>
          <span style="font-size: 12px; opacity: 0.6;">v${Un}</span>
        </div>
        <button class="yyt-popup-close" title="\u5173\u95ED">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      
      <div class="yyt-popup-body">
        <div class="yyt-main-nav">
          ${n}
        </div>
        
        <div class="yyt-sub-nav" style="display: none;">
          <!-- \u6B21\u7EA7\u9876\u680F\u5C06\u52A8\u6001\u6E32\u67D3 -->
        </div>
        
        <div class="yyt-content">
          ${r}
        </div>
      </div>
      
      <div class="yyt-popup-footer">
        <button class="yyt-btn yyt-btn-secondary" id="${j}-close-btn">\u5173\u95ED</button>
      </div>
    </div>
  `,i=t.createElement("div");i.innerHTML=o,A=i.firstElementChild,t.body.appendChild(A),s(A).find(".yyt-popup-close").on("click",Cs),s(A).find(`#${j}-close-btn`).on("click",Cs),s(A).find(".yyt-main-nav-item").on("click",function(){let c=s(this).data("tab");c&&ko(c)}),Ro(re);let a=tt?.getToolConfig(re);a?.hasSubTabs&&(s(A).find(".yyt-sub-nav").show(),Io(re,a.subTabs)),U("\u5F39\u7A97\u5DF2\u6253\u5F00")}function Pe(){let s=L.jQuery||window.jQuery;if(!s){$o("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(Pe,1e3);return}let t=L.document||document,e=s("#extensionsMenu",t);if(!e.length){U("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(Pe,2e3);return}if(s(`#${jn}`,e).length>0){U("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let r=s(`<div class="extension_container interactable" id="${jn}" tabindex="0"></div>`),o=`
    <div class="list-group-item flex-container flexGap5 interactable" id="${_e}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
      <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
      <span>YouYou \u5DE5\u5177\u7BB1</span>
    </div>
  `,i=s(o);i.on("click",async function(a){a.stopPropagation(),U("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let c=s("#extensionsMenuButton",t);c.length&&e.is(":visible")&&c.trigger("click"),Do()}),r.append(i),e.append(r),U("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}var Nn={version:Un,id:j,init:Oo,openPopup:Do,closePopup:Cs,switchMainTab:ko,switchSubTab:Mo,addMenuItem:Pe,getStorage:()=>Es,getApiConnection:()=>it,getPresetManager:()=>Ee,getUiComponents:()=>H,getRegexExtractor:()=>_o,getToolManager:()=>As,getToolExecutor:()=>Eo,getToolTrigger:()=>Se,getWindowManager:()=>Ce,getToolRegistry:()=>tt,getPromptEditor:()=>X,getSettingsService:()=>Ae,getBypassManager:()=>So,getVariableResolver:()=>Co,getContextInjector:()=>Ao,getToolPromptService:()=>Po,getToolOutputService:()=>Ss,async getApiConfig(){return await ne(),Es?Es.loadSettings().apiConfig:null},async saveApiConfig(s){return await ne(),it?(it.updateApiConfig(s),!0):!1},async getPresets(){return await ne(),Ee?Ee.getAllPresets():[]},async sendApiRequest(s,t){if(await ne(),it)return it.sendApiRequest(s,t);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await ne(),it?it.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(s,t){return tt?.registerTool(s,t)||!1},unregisterTool(s){return tt?.unregisterTool(s)||!1},getToolList(){return tt?.getToolList()||[]},createWindow(s){return Ce?.createWindow(s)||null},closeWindow(s){Ce?.closeWindow(s)}};async function Oo(){if(U(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${Un}`),await Ya(),await ne()){if(U("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),Se&&Se.initTriggerModule)try{Se.initTriggerModule(),U("\u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316")}catch(n){console.error(`[${j}] \u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,n)}let e=L.document||document;if(H){let n=`${j}-ui-styles`;if(!e.getElementById(n)){let i=e.createElement("style");i.id=n,i.textContent=H.getStyles(),(e.head||e.documentElement).appendChild(i)}let r=`${j}-regex-styles`;if(!e.getElementById(r)&&H.getRegexStyles){let i=e.createElement("style");i.id=r,i.textContent=H.getRegexStyles(),(e.head||e.documentElement).appendChild(i)}let o=`${j}-tool-styles`;if(!e.getElementById(o)&&H.getToolStyles){let i=e.createElement("style");i.id=o,i.textContent=H.getToolStyles(),(e.head||e.documentElement).appendChild(i)}}if(Ce){let n=`${j}-window-styles`;e.getElementById(n)}if(X&&X.getPromptEditorStyles){let n=`${j}-prompt-styles`;if(!e.getElementById(n)){let r=e.createElement("style");r.id=n,r.textContent=X.getPromptEditorStyles(),(e.head||e.documentElement).appendChild(r)}}try{let{applyTheme:n}=await Promise.resolve().then(()=>(Ln(),On));if(Ae&&Ae.settingsService){let r=Ae.settingsService.getUiSettings();r&&r.theme&&(n(r.theme),U(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${r.theme}`),r.compactMode&&document.documentElement.classList.add("yyt-compact-mode"),r.animationEnabled||document.documentElement.classList.add("yyt-no-animation"))}}catch(n){U("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",n)}}else U("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let t=L.document||document;t.readyState==="loading"?t.addEventListener("DOMContentLoaded",()=>{setTimeout(Pe,1e3)}):setTimeout(Pe,1e3),U("\u521D\u59CB\u5316\u5B8C\u6210")}if(typeof window<"u"&&(window.YouYouToolkit=Nn,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=Nn}catch{}var zc=Nn;Oo();U("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210");export{zc as default};
