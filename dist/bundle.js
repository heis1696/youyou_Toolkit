var jo=Object.defineProperty;var E=(e,t)=>()=>(e&&(t=e(e=0)),t);var N=(e,t)=>{for(var s in t)jo(e,s,{get:t[s],enumerable:!0})};function Kn(){let e=b;return e._getStorage(),e._storage}function R(){return b.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function Q(e){b.set("settings",e)}var vt,b,P,Vn,ie,at=E(()=>{vt=class e{constructor(t="youyou_toolkit"){this.namespace=t,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let t=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(t.SillyTavern?.getContext){let s=t.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespace]||(s.extensionSettings[this.namespace]={}),this._storage={_target:s.extensionSettings[this.namespace],getItem:n=>{let r=s.extensionSettings[this.namespace][n];return typeof r=="string"?r:r?JSON.stringify(r):null},setItem:(n,r)=>{s.extensionSettings[this.namespace][n]=r,this._saveSettings(s)},removeItem:n=>{delete s.extensionSettings[this.namespace][n],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespace}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:t=>{try{return localStorage.getItem(t)}catch{return null}},setItem:(t,s)=>{try{localStorage.setItem(t,s)}catch(n){console.error(`[${this.namespace}] localStorage\u5199\u5165\u5931\u8D25:`,n)}},removeItem:t=>{try{localStorage.removeItem(t)}catch{}},_isTavern:!1},this._storage}_saveSettings(t){if(typeof t.saveSettings=="function")try{t.saveSettings()}catch{}else if(typeof t.saveSettingsDebounced=="function")try{t.saveSettingsDebounced()}catch{}}get(t,s=null){let n=`${this.namespace}:${t}`;if(this._cache.has(n))return this._cache.get(n);let r=this._getStorage(),o=this._getFullKey(t),i=r.getItem(o);if(i===null)return s;try{let a=JSON.parse(i);return this._cache.set(n,a),a}catch{return i}}set(t,s){let n=this._getStorage(),r=this._getFullKey(t),o=`${this.namespace}:${t}`;this._cache.set(o,s);try{n.setItem(r,JSON.stringify(s))}catch(i){console.error(`[${this.namespace}] \u5B58\u50A8\u5931\u8D25:`,i)}}remove(t){let s=this._getStorage(),n=this._getFullKey(t),r=`${this.namespace}:${t}`;this._cache.delete(r),s.removeItem(n)}has(t){let s=this._getStorage(),n=this._getFullKey(t);return s.getItem(n)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let n=s.SillyTavern.getContext();n?.extensionSettings?.[this.namespace]&&(n.extensionSettings[this.namespace]={},this._saveSettings(n))}}else{let s=`${this.namespace}_`,n=[];for(let r=0;r<localStorage.length;r++){let o=localStorage.key(r);o&&o.startsWith(s)&&n.push(o)}n.forEach(r=>localStorage.removeItem(r))}this._cache.clear()}_getFullKey(t){return this._getStorage()._isTavern?t:`${this.namespace}_${t}`}namespace(t){return new e(`${this.namespace}:${t}`)}getMultiple(t){let s={};return t.forEach(n=>{s[n]=this.get(n)}),s}setMultiple(t){Object.entries(t).forEach(([s,n])=>{this.set(s,n)})}exportAll(){let t=this._getStorage(),s={};if(t._isTavern){let n=typeof window.parent<"u"?window.parent:window;if(n.SillyTavern?.getContext){let o=n.SillyTavern.getContext()?.extensionSettings?.[this.namespace]||{};Object.entries(o).forEach(([i,a])=>{s[i]=typeof a=="string"?JSON.parse(a):a})}}else{let n=`${this.namespace}_`;for(let r=0;r<localStorage.length;r++){let o=localStorage.key(r);if(o&&o.startsWith(n)){let i=o.slice(n.length);try{s[i]=JSON.parse(localStorage.getItem(o))}catch{s[i]=localStorage.getItem(o)}}}}return s}},b=new vt("youyou_toolkit"),P=new vt("youyou_toolkit:tools"),Vn=new vt("youyou_toolkit:presets"),ie=new vt("youyou_toolkit:windows")});var Zn={};N(Zn,{DEFAULT_API_PRESETS:()=>zo,DEFAULT_SETTINGS:()=>Uo,STORAGE_KEYS:()=>ae,StorageService:()=>vt,deepMerge:()=>Xn,getCurrentPresetName:()=>Ft,getStorage:()=>Kn,loadApiPresets:()=>U,loadSettings:()=>R,presetStorage:()=>Vn,saveApiPresets:()=>lt,saveSettings:()=>Q,setCurrentPresetName:()=>Ht,storage:()=>b,toolStorage:()=>P,windowStorage:()=>ie});function U(){return b.get(ae.API_PRESETS)||[]}function lt(e){b.set(ae.API_PRESETS,e)}function Ft(){return b.get(ae.CURRENT_PRESET)||""}function Ht(e){b.set(ae.CURRENT_PRESET,e||"")}function Xn(e,t){let s=r=>r&&typeof r=="object"&&!Array.isArray(r),n={...e};return s(e)&&s(t)&&Object.keys(t).forEach(r=>{s(t[r])?r in e?n[r]=Xn(e[r],t[r]):Object.assign(n,{[r]:t[r]}):Object.assign(n,{[r]:t[r]})}),n}var ae,Uo,zo,le=E(()=>{at();at();ae={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},Uo={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},zo=[]});var er={};N(er,{API_STATUS:()=>Bo,fetchAvailableModels:()=>Ds,getApiConfig:()=>It,getEffectiveApiConfig:()=>tr,sendApiRequest:()=>Ms,sendWithPreset:()=>Yo,testApiConnection:()=>Wo,updateApiConfig:()=>Mt,validateApiConfig:()=>Oe});function It(){return R().apiConfig||{}}function Mt(e){let t=R();t.apiConfig={...t.apiConfig,...e},Q(t)}function Oe(e){let t=[];if(e.useMainApi)return{valid:!0,errors:[]};if(!e.url||!e.url.trim())t.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(e.url)}catch{t.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!e.model||!e.model.trim())&&t.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:t.length===0,errors:t}}function tr(e=""){let t=R();if(e){let n=(t.apiPresets||[]).find(r=>r.name===e);if(n&&n.apiConfig)return{...n.apiConfig,presetName:n.name}}return t.apiConfig||{}}async function Yo(e,t,s={},n=null){let r=tr(e);return await Ms(t,{...s,apiConfig:r},n)}function Go(e,t={}){let s=t.apiConfig||It();return{messages:e,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:!1,...t.extraParams}}async function Ms(e,t={},s=null){let n=t.apiConfig||It(),r=n.useMainApi,o=Oe(n);if(!o.valid&&!r)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${o.errors.join(", ")}`);return r?await Fo(e,t,s):await Ho(e,n,t,s)}async function Fo(e,t,s){let n=typeof window.parent<"u"?window.parent:window;if(!n.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let r=await n.TavernHelper.generateRaw({ordered_prompts:e,should_stream:!1,...t.extraParams});if(typeof r!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return r.trim()}catch(r){throw r.name==="AbortError"?r:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${r.message}`)}}async function Ho(e,t,s,n){let r=Go(e,{apiConfig:t,...s}),o={"Content-Type":"application/json"};t.apiKey&&(o.Authorization=`Bearer ${t.apiKey}`);let i=await fetch(t.url,{method:"POST",headers:o,body:JSON.stringify(r),signal:n});if(!i.ok){let l=await i.text().catch(()=>"Unknown error");throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${l}`)}let a=await i.json(),c="";if(a.choices&&a.choices[0]?.message?.content)c=a.choices[0].message.content;else if(a.content)c=a.content;else if(a.text)c=a.text;else if(a.response)c=a.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(a).slice(0,200)}`);return c.trim()}async function Wo(e=null){let t=e||It(),s=Date.now();try{await Ms([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:t});let r=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${r}ms)`,latency:r}}catch(n){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${n.message}`,latency:Date.now()-s}}}async function Ds(e=null){let t=e||It();return t.useMainApi?await Qo():await qo(t)}async function Qo(){let e=typeof window.parent<"u"?window.parent:window;try{if(e.SillyTavern?.getContext){let t=e.SillyTavern.getContext();if(t.settings?.api_server)return[t.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function qo(e){if(!e.url||!e.apiKey)return[];try{let s=`${e.url.replace(/\/chat\/completions$/,"").replace(/\/completions$/,"")}/models`,n=await fetch(s,{method:"GET",headers:{Authorization:`Bearer ${e.apiKey}`}});if(!n.ok)return[];let r=await n.json();return r.data&&Array.isArray(r.data)?r.data.map(o=>o.id||o.name).filter(Boolean).sort():[]}catch{return[]}}var Bo,Os=E(()=>{le();Bo={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var sr={};N(sr,{createPreset:()=>Le,createPresetFromCurrentConfig:()=>Zo,deletePreset:()=>je,duplicatePreset:()=>Ko,exportPresets:()=>Us,generateUniquePresetName:()=>Bs,getActiveConfig:()=>js,getActivePresetName:()=>Ue,getAllPresets:()=>Wt,getPreset:()=>wt,getPresetNames:()=>Jo,getStarredPresets:()=>Ns,importPresets:()=>zs,presetExists:()=>ce,renamePreset:()=>Vo,switchToPreset:()=>Xo,togglePresetStar:()=>Ls,updatePreset:()=>Ne,validatePreset:()=>ti});function Wt(){return U()}function Jo(){return U().map(t=>t.name)}function wt(e){return!e||typeof e!="string"?null:U().find(s=>s.name===e)||null}function ce(e){return!e||typeof e!="string"?!1:U().some(s=>s.name===e)}function Le(e){let{name:t,description:s,apiConfig:n}=e;if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=t.trim();if(ce(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let o={name:r,description:s||"",apiConfig:{url:n?.url||"",apiKey:n?.apiKey||"",model:n?.model||"",useMainApi:n?.useMainApi??!0,max_tokens:n?.max_tokens||4096,temperature:n?.temperature??.7,top_p:n?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},i=U();return i.push(o),lt(i),{success:!0,message:`\u9884\u8BBE "${r}" \u521B\u5EFA\u6210\u529F`,preset:o}}function Ne(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=U(),n=s.findIndex(i=>i.name===e);if(n===-1)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(t.name&&t.name!==e)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let r=s[n],o={...r,...t,name:r.name,updatedAt:Date.now()};return t.apiConfig&&(o.apiConfig={...r.apiConfig,...t.apiConfig}),s[n]=o,lt(s),{success:!0,message:`\u9884\u8BBE "${e}" \u66F4\u65B0\u6210\u529F`,preset:o}}function je(e){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=U(),s=t.findIndex(n=>n.name===e);return s===-1?{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}:(t.splice(s,1),lt(t),Ft()===e&&Ht(""),{success:!0,message:`\u9884\u8BBE "${e}" \u5DF2\u5220\u9664`})}function Vo(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=t.trim();if(!ce(e))return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(ce(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n=U(),r=n.find(o=>o.name===e);return r&&(r.name=s,r.updatedAt=Date.now(),lt(n),Ft()===e&&Ht(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function Ko(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=t.trim(),n=wt(e);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(ce(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let r={...JSON.parse(JSON.stringify(n)),name:s,createdAt:Date.now(),updatedAt:Date.now()},o=U();return o.push(r),lt(o),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:r}}function Ls(e){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=U(),s=t.find(n=>n.name===e);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),lt(t),{success:!0,message:s.starred?`\u5DF2\u5C06 "${e}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${e}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}}function Ns(){return U().filter(t=>t.starred===!0)}function Xo(e){if(!e)return Ht(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let t=wt(e);return t?(Ht(e),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${e}"`,apiConfig:t.apiConfig}):{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}}function Ue(){return Ft()}function js(){let e=Ft();if(e){let s=wt(e);if(s)return{presetName:e,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:R().apiConfig||{}}}function Us(e=null){if(e){let s=wt(e);if(!s)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let t=U();return JSON.stringify(t,null,2)}function zs(e,t={overwrite:!1}){let s;try{s=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(s)?s:[s];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let r=U(),o=0;for(let i of n){if(!i.name||typeof i.name!="string"||!i.apiConfig||typeof i.apiConfig!="object")continue;let a=r.findIndex(c=>c.name===i.name);a>=0?t.overwrite&&(i.updatedAt=Date.now(),r[a]=i,o++):(i.createdAt=i.createdAt||Date.now(),i.updatedAt=Date.now(),r.push(i),o++)}return o>0&&lt(r),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${o} \u4E2A\u9884\u8BBE`,imported:o}}function Zo(e,t=""){let s=R();return Le({name:e,description:t,apiConfig:s.apiConfig})}function ti(e){let t=[];return(!e.name||typeof e.name!="string"||!e.name.trim())&&t.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!e.apiConfig||typeof e.apiConfig!="object")&&t.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:t.length===0,errors:t}}function Bs(e){(!e||typeof e!="string")&&(e="\u65B0\u9884\u8BBE");let t=U(),s=new Set(t.map(r=>r.name));if(!s.has(e))return e;let n=1;for(;s.has(`${e} (${n})`);)n++;return`${e} (${n})`}var ze=E(()=>{le()});var h,Ys,x,z=E(()=>{h={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",TOOL_TRIGGER_INITIALIZED:"tool:triggerInitialized",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",TRIGGER_REGISTERED:"trigger:registered",TRIGGER_UNREGISTERED:"trigger:unregistered",TRIGGER_FIRED:"trigger:fired",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_EXECUTION_REQUESTED:"tool:executionRequested",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},Ys=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(t,s,n={}){if(!t||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:r=0}=n;this.listeners.has(t)||this.listeners.set(t,new Set);let o={callback:s,priority:r};return this.listeners.get(t).add(o),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${t}`),()=>this.off(t,s)}off(t,s){let n=this.listeners.get(t);if(n){for(let r of n)if(r.callback===s){n.delete(r);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${t}`)}}emit(t,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${t}`,s),this._addToHistory(t,s);let n=this.listeners.get(t);if(!n||n.size===0)return;let r=Array.from(n).sort((o,i)=>i.priority-o.priority);for(let{callback:o}of r)try{o(s)}catch(i){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${t}):`,i)}}once(t,s){let n=r=>{this.off(t,n),s(r)};return this.on(t,n)}wait(t,s=0){return new Promise((n,r)=>{let o=null,i=this.once(t,a=>{o&&clearTimeout(o),n(a)});s>0&&(o=setTimeout(()=>{i(),r(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${t}`))},s))})}hasListeners(t){let s=this.listeners.get(t);return s&&s.size>0}listenerCount(t){let s=this.listeners.get(t);return s?s.size:0}removeAllListeners(t){t?this.listeners.delete(t):this.listeners.clear()}setDebugMode(t){this.debugMode=t}_addToHistory(t,s){this.history.push({event:t,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(t){return t?this.history.filter(s=>s.event===t):[...this.history]}clearHistory(){this.history=[]}},x=new Ys});function m(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function p(e,t,s=3e3){t||(t=e==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let n=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(n.toastr){n.toastr[e](t,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}ei(e,t,s),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${e.toUpperCase()}] ${t}`)}function nt(e,t,s={}){t||(t=e==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:n=3500,sticky:r=!1,noticeId:o=""}=s,i=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!i?.body){p(e,t,n);return}let a="yyt-top-notice-container",c="yyt-top-notice-styles",l=i.getElementById(a);if(l||(l=i.createElement("div"),l.id=a,l.style.cssText=`
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
    `,i.body.appendChild(l)),!i.getElementById(c)){let J=i.createElement("style");J.id=c,J.textContent=`
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
    `,i.head.appendChild(J)}if(o){let J=l.querySelector(`[data-notice-id="${o}"]`);J&&J.remove()}let y={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=i.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${e||"info"}`,o&&(u.dataset.noticeId=o);let g=i.createElement("span");g.className="yyt-top-notice__icon",g.textContent=y[e]||y.info;let f=i.createElement("div");f.className="yyt-top-notice__content",f.textContent=t;let T=i.createElement("button");T.className="yyt-top-notice__close",T.type="button",T.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),T.textContent="\xD7";let G=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};T.addEventListener("click",G),u.appendChild(g),u.appendChild(f),u.appendChild(T),l.appendChild(u),r||setTimeout(G,n)}function ei(e,t,s){let n=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!n)return;let r=n.getElementById("yyt-fallback-toast");r&&r.remove();let o={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},i=o[e]||o.info,a=n.createElement("div");if(a.id="yyt-fallback-toast",a.style.cssText=`
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
    `,n.head.appendChild(c)}n.body.appendChild(a),setTimeout(()=>{a.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{a.remove()},300)},s)}function S(){if(Qt)return Qt;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Qt=window.parent.jQuery,Qt}catch{}return window.jQuery&&(Qt=window.jQuery),Qt}function $(e){return e&&e.length>0}function Dt(e,t=d){if(!S()||!$(e))return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let n=e.find(`#${t}-model`).val()?.trim()||"",r=e.find(`#${t}-model-select`);return r.is(":visible")&&(n=r.val()||n),{url:e.find(`#${t}-api-url`).val()?.trim()||"",apiKey:e.find(`#${t}-api-key`).val()||"",model:n,useMainApi:e.find(`#${t}-use-main-api`).is(":checked"),max_tokens:parseInt(e.find(`#${t}-max-tokens`).val())||4096,temperature:parseFloat(e.find(`#${t}-temperature`).val())??.7,top_p:parseFloat(e.find(`#${t}-top-p`).val())??.9}}function qt(e,t,s=d){if(!S()||!$(e)||!t)return;e.find(`#${s}-api-url`).val(t.url||""),e.find(`#${s}-api-key`).val(t.apiKey||""),e.find(`#${s}-model`).val(t.model||""),e.find(`#${s}-max-tokens`).val(t.max_tokens||4096),e.find(`#${s}-temperature`).val(t.temperature??.7),e.find(`#${s}-top-p`).val(t.top_p??.9);let r=t.useMainApi??!0;e.find(`#${s}-use-main-api`).prop("checked",r);let i=e.find(`#${s}-custom-api-fields`);r?i.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):i.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),e.find(`#${s}-model`).show(),e.find(`#${s}-model-select`).hide()}function nr(e){let{id:t,title:s,body:n,width:r="380px",wide:o=!1}=e;return`
    <div class="yyt-dialog-overlay" id="${t}-overlay">
      <div class="yyt-dialog ${o?"yyt-dialog-wide":""}" style="${r!=="380px"?`width: ${r}`:""}">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${s}</span>
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
  `}function rr(e,t,s={}){if(!S())return()=>{};let r=e.find(`#${t}-overlay`),o=()=>{r.remove(),s.onClose&&s.onClose()};return r.find(`#${t}-close, #${t}-cancel`).on("click",o),r.on("click",function(i){i.target===this&&o()}),r.find(`#${t}-save`).on("click",function(){s.onSave&&s.onSave(o)}),o}function Tt(e,t){let s=new Blob([e],{type:"application/json"}),n=URL.createObjectURL(s),r=document.createElement("a");r.href=n,r.download=t,r.click(),URL.revokeObjectURL(n)}function _t(e){return new Promise((t,s)=>{let n=new FileReader;n.onload=r=>t(r.target.result),n.onerror=r=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),n.readAsText(e)})}var d,Qt,rt=E(()=>{d="youyou_toolkit";Qt=null});var Be,q,Gs=E(()=>{z();rt();Be=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(t={}){this.initialized||(this.dependencies=t.services||{},this._subscribeEvents(),this.initialized=!0,x.emit(h.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(t,s){return!t||!s?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(t,{id:t,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(t){this.destroyInstance(t),this.components.delete(t)}getComponent(t){return this.components.get(t)}render(t,s,n={}){let r=S();if(!r){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let o=this.components.get(t);if(!o){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${t}`);return}let i;if(typeof s=="string"?i=r(s):s&&s.jquery?i=s:s&&(i=r(s)),!$(i)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}this.destroyInstance(t);let a=o.render({...n,dependencies:this.dependencies});i.html(a),o.bindEvents(i,this.dependencies),this.activeInstances.set(t,{container:i,component:o,props:n}),x.emit(h.UI_RENDER_REQUESTED,{componentId:t})}destroyInstance(t){let s=this.activeInstances.get(t);s&&(s.component.destroy(s.container),this.activeInstances.delete(t))}switchTab(t){let s=this.currentTab;this.currentTab=t,x.emit(h.UI_TAB_CHANGED,{tabId:t,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(t,s){this.currentSubTab[t]=s,x.emit(h.UI_SUBTAB_CHANGED,{mainTab:t,subTab:s})}getCurrentSubTab(t){return this.currentSubTab[t]||""}getAllStyles(){let t="";return this.components.forEach((s,n)=>{s.getStyles&&(t+=s.getStyles())}),t}injectStyles(){let t="yyt-component-styles";if(document.getElementById(t))return;let s=document.createElement("style");s.id=t,s.textContent=this.getAllStyles(),document.head.appendChild(s)}setDependency(t,s){this.dependencies[t]=s}getDependency(t){return this.dependencies[t]}_subscribeEvents(){x.on(h.PRESET_UPDATED,()=>{}),x.on(h.TOOL_UPDATED,()=>{})}},q=new Be});var ct,dt,Fs=E(()=>{z();rt();Os();ze();ct="",dt={id:"apiPresetPanel",render(e){let t=It(),s=js(),n=Ue(),r=Wt(),a=Ns().slice(0,8),c=a.length>0?a.map(u=>this._renderPresetItem(u)).join(""):"",l=ct||n||"",y=l||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
    `},_renderSelectOption(e,t){let s=e.starred===!0,n=s?"yyt-option-star yyt-starred":"yyt-option-star",r=s?"\u2605":"\u2606";return`
      <div class="yyt-select-option ${e.name===t?"yyt-selected":""}" data-value="${m(e.name)}">
        <button class="${n}" data-preset="${m(e.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${r}</button>
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
            <input type="checkbox" id="${d}-use-main-api" ${e.useMainApi?"checked":""}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div id="${d}-custom-api-fields" class="${e.useMainApi?"yyt-disabled":""}">
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API URL</label>
            <input type="text" class="yyt-input" id="${d}-api-url" 
                   value="${m(e.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${d}-api-key" 
                     value="${m(e.apiKey||"")}" 
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
                     value="${m(e.model||"")}" 
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
                   value="${e.max_tokens||4096}" min="1" max="128000">
          </div>
          
          <div class="yyt-form-group">
            <label>Temperature</label>
            <input type="number" class="yyt-input" id="${d}-temperature" 
                   value="${e.temperature??.7}" min="0" max="2" step="0.1">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>Top P</label>
            <input type="number" class="yyt-input" id="${d}-top-p" 
                   value="${e.top_p??.9}" min="0" max="1" step="0.1">
          </div>
        </div>
      </div>
    `},bindEvents(e,t){let s=S();!s||!$(e)||(this._bindDropdownEvents(e,s),this._bindPresetListEvents(e,s),this._bindApiConfigEvents(e,s),this._bindFileEvents(e,s))},_bindDropdownEvents(e,t){let s=e.find(`#${d}-preset-dropdown`),n=s.find(".yyt-select-trigger"),r=s.find(".yyt-select-value");n.on("click",function(o){o.stopPropagation(),s.toggleClass("yyt-open")}),s.find(".yyt-select-option").on("click",o=>{if(t(o.target).hasClass("yyt-option-star"))return;let i=t(o.currentTarget),a=i.data("value"),c=i.find(".yyt-option-text").text();if(r.text(c).data("value",a),s.find(".yyt-select-option").removeClass("yyt-selected"),i.addClass("yyt-selected"),s.removeClass("yyt-open"),a){let l=wt(a);l&&qt(e,l.apiConfig,d)}}),s.find(".yyt-option-star").on("click",o=>{o.preventDefault(),o.stopPropagation();let i=t(o.currentTarget).data("preset");if(!i)return;let a=Ls(i);if(a.success){p("success",a.message);let c=e.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}else p("error",a.message)}),t(document).on("click.yyt-dropdown",o=>{t(o.target).closest(s).length||s.removeClass("yyt-open")})},_bindPresetListEvents(e,t){e.find(".yyt-preset-item").on("click",s=>{let n=t(s.currentTarget),r=n.data("preset-name"),o=t(s.target).closest("[data-action]").data("action");if(o)switch(s.stopPropagation(),o){case"load":let i=wt(r);i&&(qt(e,i.apiConfig,d),ct=r,e.find(".yyt-preset-item").removeClass("yyt-loaded"),n.addClass("yyt-loaded"),p("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${r}"\uFF0C\u4FEE\u6539\u540E\u53EF\u70B9\u51FB"\u4FDD\u5B58\u914D\u7F6E"\u8986\u76D6\u6B64\u9884\u8BBE`));break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${r}" \u5417\uFF1F`)){let a=je(r);if(p(a.success?"info":"error",a.message),a.success){ct===r&&(ct="");let c=e.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}}break}})},_bindApiConfigEvents(e,t){e.find(`#${d}-use-main-api`).on("change",function(){let s=t(this).is(":checked"),n=e.find(`#${d}-custom-api-fields`);s?n.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):n.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),e.find(`#${d}-toggle-key-visibility`).on("click",function(){let s=e.find(`#${d}-api-key`),n=s.attr("type");s.attr("type",n==="password"?"text":"password"),t(this).find("i").toggleClass("fa-eye fa-eye-slash")}),e.find(`#${d}-load-models`).on("click",async()=>{let s=e.find(`#${d}-load-models`),n=e.find(`#${d}-model`),r=e.find(`#${d}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let o=Dt(e,d),i=await Ds(o);if(i.length>0){r.empty(),i.forEach(c=>{r.append(`<option value="${m(c)}">${m(c)}</option>`)}),n.hide(),r.show();let a=n.val();a&&i.includes(a)&&r.val(a),r.off("change").on("change",function(){n.val(t(this).val())}),p("success",`\u5DF2\u52A0\u8F7D ${i.length} \u4E2A\u6A21\u578B`)}else p("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(o){p("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${o.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),e.find(`#${d}-model`).on("focus",function(){let s=e.find(`#${d}-model-select`);t(this).show(),s.hide()}),e.find(`#${d}-save-api-config`).on("click",()=>{let s=Dt(e,d),n=Oe(s);if(!n.valid&&!s.useMainApi){p("error",n.errors.join(", "));return}if(ct){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${ct}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E`)){Mt(s),p("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58");return}Mt(s);let o=Ne(ct,{apiConfig:s});if(o.success){p("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${ct}"`),x.emit(h.PRESET_UPDATED,{name:ct});let i=e.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}else p("error",o.message);return}let r=Ue();if(r){Mt(s),Ne(r,{apiConfig:s}),p("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58");return}Mt(s),p("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),e.find(`#${d}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){Mt({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9});let s=e.closest(".yyt-api-manager").parent();s.length&&this.renderTo(s),p("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),e.find(`#${d}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(e,t)})},_bindFileEvents(e,t){e.find(`#${d}-export-presets`).on("click",()=>{try{let s=Us();Tt(s,`youyou_toolkit_presets_${Date.now()}.json`),p("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){p("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),e.find(`#${d}-import-presets`).on("click",()=>{e.find(`#${d}-import-file`).click()}),e.find(`#${d}-import-file`).on("change",async s=>{let n=s.target.files[0];if(n){try{let r=await _t(n),o=zs(r,{overwrite:!0});if(p(o.success?"success":"error",o.message),o.imported>0){let i=e.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}}catch(r){p("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}t(s.target).val("")}})},_showSavePresetDialog(e,t){let n=Wt().map(y=>y.name),r=Bs("\u65B0\u9884\u8BBE"),o=`
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
    `;t(`#${d}-dialog-overlay`).remove(),e.append(o);let i=t(`#${d}-dialog-overlay`),a=t(`#${d}-dialog-preset-name`),c=t(`#${d}-dialog-preset-desc`);a.focus().select();let l=()=>i.remove();i.find(`#${d}-dialog-close, #${d}-dialog-cancel`).on("click",l),i.on("click",function(y){y.target===this&&l()}),i.find(`#${d}-dialog-save`).on("click",()=>{let y=a.val().trim(),u=c.val().trim();if(!y){p("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),a.focus();return}if(n.includes(y)){if(!confirm(`\u9884\u8BBE "${y}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;je(y)}let g=Dt(e,d),f=Le({name:y,description:u,apiConfig:g});if(f.success){p("success",f.message),l(),x.emit(h.PRESET_CREATED,{preset:f.preset});let T=e.closest(".yyt-api-manager").parent();T.length&&this.renderTo(T)}else p("error",f.message)}),a.on("keypress",function(y){y.which===13&&i.find(`#${d}-dialog-save`).click()})},destroy(e){let t=S();!t||!$(e)||(e.find("*").off(),t(document).off("click.yyt-dropdown"))},getStyles(){return`
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
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}}});var mr={};N(mr,{MESSAGE_MACROS:()=>fr,addTagRule:()=>Jt,createRuleTemplate:()=>dr,default:()=>ni,deleteRulePreset:()=>ur,deleteRuleTemplate:()=>pr,deleteTagRule:()=>de,escapeRegex:()=>Ot,exportRulesConfig:()=>Je,extractComplexTag:()=>ir,extractCurlyBraceTag:()=>qs,extractHtmlFormatTag:()=>ar,extractSimpleTag:()=>Qs,extractTagContent:()=>Lt,generateTagSuggestions:()=>Fe,getAllRulePresets:()=>Qe,getAllRuleTemplates:()=>lr,getContentBlacklist:()=>Nt,getRuleTemplate:()=>cr,getTagRules:()=>yt,importRulesConfig:()=>Ve,isValidTagName:()=>Ws,loadRulePreset:()=>qe,saveRulesAsPreset:()=>We,scanTextForTags:()=>Ge,setContentBlacklist:()=>ye,setTagRules:()=>He,shouldSkipContent:()=>Hs,testRegex:()=>gr,updateRuleTemplate:()=>yr,updateTagRule:()=>Vt});function Ye(){let e=R();return B=e.ruleTemplates||[...or],I=e.tagRules||[],V=e.contentBlacklist||[],{ruleTemplates:B,tagRules:I,contentBlacklist:V}}function Ot(e){return typeof e!="string"?"":e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Hs(e,t){if(!t||t.length===0||!e||typeof e!="string")return!1;let s=e.toLowerCase();return t.some(n=>{let r=n.trim().toLowerCase();return r&&s.includes(r)})}function Ws(e){return!e||typeof e!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(e)&&!si.includes(e.toLowerCase())}function Qs(e,t){if(!e||!t)return[];let s=[],n=Ot(t),r=new RegExp(`<${n}>([\\s\\S]*?)<\\/${n}>`,"gi");[...e.matchAll(r)].forEach(c=>{c[1]&&s.push(c[1].trim())});let i=(e.match(new RegExp(`<${n}>`,"gi"))||[]).length,a=(e.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return i>a&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${i-a} \u4E2A\u672A\u95ED\u5408\u7684 <${t}> \u6807\u7B7E`),s}function qs(e,t){if(!e||!t)return[];let s=[],n=Ot(t),r=new RegExp(`\\{${n}\\|`,"gi"),o;for(;(o=r.exec(e))!==null;){let i=o.index,a=i+o[0].length,c=1,l=a;for(;l<e.length&&c>0;)e[l]==="{"?c++:e[l]==="}"&&c--,l++;if(c===0){let y=e.substring(a,l-1);y.trim()&&s.push(y.trim())}r.lastIndex=i+1}return s}function ir(e,t){if(!e||!t)return[];let s=t.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${t}`),[];let n=s[0].trim(),r=s[1].trim(),o=r.match(/<\/(\w+)>/);if(!o)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${r}`),[];let i=o[1],a=new RegExp(`${Ot(n)}([\\s\\S]*?)<\\/${i}>`,"gi"),c=[];return[...e.matchAll(a)].forEach(y=>{y[1]&&c.push(y[1].trim())}),c}function ar(e,t){if(!e||!t)return[];let s=t.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${t}`),[];let n=s[1],r=[],o=new RegExp(`<${n}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${n}>`,"gi");[...e.matchAll(o)].forEach(l=>{l[1]&&r.push(l[1].trim())});let a=(e.match(new RegExp(`<${n}(?:\\s[^>]*)?>`,"gi"))||[]).length,c=(e.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return a>c&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${a-c} \u4E2A\u672A\u95ED\u5408\u7684 <${n}> \u6807\u7B7E`),r}function Lt(e,t,s=[]){if(!e)return"";if(!t||t.length===0)return e;let n=t.filter(y=>y.type==="exclude"&&y.enabled),r=t.filter(y=>(y.type==="include"||y.type==="regex_include")&&y.enabled),o=t.filter(y=>y.type==="regex_exclude"&&y.enabled),i=e;for(let y of n)try{let u=new RegExp(`<${Ot(y.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Ot(y.value)}>`,"gi");i=i.replace(u,"")}catch(u){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:y,error:u})}let a=[];if(r.length>0)for(let y of r){let u=[];try{if(y.type==="include")u.push(...Qs(i,y.value)),u.push(...qs(i,y.value));else if(y.type==="regex_include"){let g=new RegExp(y.value,"gi");[...i.matchAll(g)].forEach(T=>{T[1]&&u.push(T[1])})}}catch(g){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:y,error:g})}u.forEach(g=>a.push(g.trim()))}else a.push(i);let c=[];for(let y of a){for(let u of o)try{let g=new RegExp(u.value,"gi");y=y.replace(g,"")}catch(g){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:u,error:g})}Hs(y,s)||c.push(y)}return c.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function Ge(e,t={}){let s=performance.now(),{chunkSize:n=5e4,maxTags:r=100,timeoutMs:o=5e3}=t,i=new Set,a=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,c=0,l=0;for(let u=0;u<e.length;u+=n){let g=e.slice(u,Math.min(u+n,e.length));if(l++,c+=g.length,performance.now()-s>o){console.warn(`[YouYouToolkit] Tag scanning timed out after ${o}ms`);break}let f;for(;(f=a.exec(g))!==null&&i.size<r;){let T=(f[1]||f[2]).toLowerCase();Ws(T)&&i.add(T)}if(i.size>=r)break;l%5===0&&await new Promise(T=>setTimeout(T,0))}let y=performance.now();return{tags:Array.from(i).sort(),stats:{processingTimeMs:Math.round(y-s),processedChars:c,totalChars:e.length,chunkCount:l,tagsFound:i.size}}}function Fe(e,t=25){let s=e.tags.slice(0,t);return{suggestions:s,stats:{totalFound:e.stats.tagsFound,finalCount:s.length}}}function lr(){return B.length===0&&Ye(),B}function cr(e){return B.find(t=>t.id===e)}function dr(e){let t={id:`rule-${Date.now()}`,name:e.name||"\u65B0\u89C4\u5219",description:e.description||"",type:e.type||"include",value:e.value||"",enabled:e.enabled!==!1,createdAt:new Date().toISOString()};return B.push(t),Js(),{success:!0,template:t,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function yr(e,t){let s=B.findIndex(n=>n.id===e);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(B[s]={...B[s],...t,updatedAt:new Date().toISOString()},Js(),{success:!0,template:B[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function pr(e){let t=B.findIndex(s=>s.id===e);return t===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(B.splice(t,1),Js(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function Js(){let e=R();e.ruleTemplates=B,Q(e)}function yt(){return I||Ye(),I}function He(e){I=e||[];let t=R();t.tagRules=I,Q(t)}function Jt(e){let t={id:`tag-${Date.now()}`,type:e.type||"include",value:e.value||"",enabled:e.enabled!==!1};I.push(t);let s=R();return s.tagRules=I,Q(s),{success:!0,rule:t,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function Vt(e,t){if(e<0||e>=I.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};I[e]={...I[e],...t};let s=R();return s.tagRules=I,Q(s),{success:!0,rule:I[e],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function de(e){if(e<0||e>=I.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};I.splice(e,1);let t=R();return t.tagRules=I,Q(t),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Nt(){return V||Ye(),V}function ye(e){V=e||[];let t=R();t.contentBlacklist=V,Q(t)}function We(e,t=""){if(!e||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=R();s.tagRulePresets||(s.tagRulePresets={});let n=`preset-${Date.now()}`;return s.tagRulePresets[n]={id:n,name:e.trim(),description:t.trim(),rules:JSON.parse(JSON.stringify(I)),blacklist:JSON.parse(JSON.stringify(V)),createdAt:new Date().toISOString()},Q(s),{success:!0,preset:s.tagRulePresets[n],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function Qe(){let t=R().tagRulePresets||{};return Object.values(t)}function qe(e){let t=R(),n=(t.tagRulePresets||{})[e];return n?(I=JSON.parse(JSON.stringify(n.rules||[])),V=JSON.parse(JSON.stringify(n.blacklist||[])),t.tagRules=I,t.contentBlacklist=V,Q(t),{success:!0,preset:n,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function ur(e){let t=R(),s=t.tagRulePresets||{};return s[e]?(delete s[e],t.tagRulePresets=s,Q(t),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Je(){return JSON.stringify({tagRules:I,contentBlacklist:V,ruleTemplates:B,tagRulePresets:R().tagRulePresets||{}},null,2)}function Ve(e,t={overwrite:!0}){try{let s=JSON.parse(e);if(t.overwrite)I=s.tagRules||[],V=s.contentBlacklist||[],B=s.ruleTemplates||or;else if(s.tagRules&&I.push(...s.tagRules),s.contentBlacklist){let r=new Set(V.map(o=>o.toLowerCase()));s.contentBlacklist.forEach(o=>{r.has(o.toLowerCase())||V.push(o)})}let n=R();return n.tagRules=I,n.contentBlacklist=V,n.ruleTemplates=B,s.tagRulePresets&&(n.tagRulePresets={...n.tagRulePresets||{},...s.tagRulePresets}),Q(n),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function gr(e,t,s="g",n=0){try{if(!e||typeof e!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let r=new RegExp(e,s),o=[];if(s.includes("g")){let i;for(;(i=r.exec(t))!==null;)i.length>1?o.push({fullMatch:i[0],groups:i.slice(1),index:i.index,extracted:i[n]||i[1]||i[0]}):o.push({fullMatch:i[0],groups:[],index:i.index,extracted:i[0]})}else{let i=r.exec(t);i&&o.push({fullMatch:i[0],groups:i.length>1?i.slice(1):[],index:i.index,extracted:i.length>1?i[n]||i[1]:i[0]})}return{success:!0,matches:o,count:o.length,extracted:o.map(i=>i.extracted)}}catch(r){return{success:!1,error:r.message,matches:[]}}}var si,or,B,I,V,fr,ni,Ke=E(()=>{le();si=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],or=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],B=[],I=[],V=[];fr={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};Ye();ni={extractTagContent:Lt,extractSimpleTag:Qs,extractCurlyBraceTag:qs,extractComplexTag:ir,extractHtmlFormatTag:ar,escapeRegex:Ot,shouldSkipContent:Hs,isValidTagName:Ws,scanTextForTags:Ge,generateTagSuggestions:Fe,getAllRuleTemplates:lr,getRuleTemplate:cr,createRuleTemplate:dr,updateRuleTemplate:yr,deleteRuleTemplate:pr,getTagRules:yt,setTagRules:He,addTagRule:Jt,updateTagRule:Vt,deleteTagRule:de,getContentBlacklist:Nt,setContentBlacklist:ye,saveRulesAsPreset:We,getAllRulePresets:Qe,loadRulePreset:qe,deleteRulePreset:ur,exportRulesConfig:Je,importRulesConfig:Ve,testRegex:gr,MESSAGE_MACROS:fr}});var pt,Vs=E(()=>{z();rt();Ke();pt={id:"regexExtractPanel",render(e){let t=yt(),s=Nt(),n=Qe();return`
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
          
          ${this._renderRulesEditor(t,s,n)}
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
    `},_renderRulesEditor(e,t,s){let n=e.length>0?e.map((o,i)=>this._renderRuleItem(o,i)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',r=s.length>0?s.map(o=>`<option value="${o.id}">${m(o.name)}</option>`).join(""):"";return`
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
    `},bindEvents(e,t){let s=S();!s||!$(e)||(this._bindRuleEditorEvents(e,s),this._bindPresetEvents(e,s),this._bindTestEvents(e,s),this._bindFileEvents(e,s))},_bindRuleEditorEvents(e,t){e.find(".yyt-rule-type").on("change",function(){let n=t(this).closest(".yyt-rule-item").data("rule-index"),r=t(this).val();Vt(n,{type:r}),p("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),e.find(".yyt-rule-value").on("change",function(){let n=t(this).closest(".yyt-rule-item").data("rule-index"),r=t(this).val().trim();Vt(n,{value:r})}),e.find(".yyt-rule-enabled").on("change",function(){let n=t(this).closest(".yyt-rule-item").data("rule-index"),r=t(this).is(":checked");Vt(n,{enabled:r}),p("info",r?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),e.find(".yyt-rule-delete").on("click",()=>{let n=e.find(".yyt-rule-delete").closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(de(n),this.renderTo(e),p("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),e.on("click",".yyt-rule-delete",s=>{let r=t(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(de(r),this.renderTo(e),p("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),e.find(`#${d}-add-rule`).on("click",()=>{Jt({type:"include",value:"",enabled:!0}),this.renderTo(e),p("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),e.find(`#${d}-scan-tags`).on("click",async()=>{let s=e.find(`#${d}-scan-tags`),n=e.find(`#${d}-test-input`).val();if(!n||!n.trim()){p("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let r=await Ge(n,{maxTags:50,timeoutMs:3e3}),{suggestions:o,stats:i}=Fe(r,25);if(o.length===0){p("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),e.find(`#${d}-tag-suggestions-container`).hide();return}let a=e.find(`#${d}-tag-list`);e.find(`#${d}-tag-scan-stats`).text(`${i.finalCount}/${i.totalFound} \u4E2A\u6807\u7B7E, ${r.stats.processingTimeMs}ms`),a.empty(),o.forEach(l=>{let y=t(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${m(l)}</button>`);y.on("click",()=>{if(yt().some(f=>f.type==="include"&&f.value===l)){p("warning",`\u89C4\u5219 "\u5305\u542B: ${l}" \u5DF2\u5B58\u5728`);return}Jt({type:"include",value:l,enabled:!0}),this.renderTo(e),p("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${l}"`)}),a.append(y)}),e.find(`#${d}-tag-suggestions-container`).show(),p("success",`\u53D1\u73B0 ${o.length} \u4E2A\u6807\u7B7E`)}catch(r){p("error",`\u626B\u63CF\u5931\u8D25: ${r.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),e.find(`#${d}-add-exclude-cot`).on("click",()=>{let s=yt(),n="<!--[\\s\\S]*?-->";if(s.some(o=>o.type==="regex_exclude"&&o.value===n)){p("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}Jt({type:"regex_exclude",value:n,enabled:!0}),this.renderTo(e),p("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),e.find(`#${d}-content-blacklist`).on("change",function(){let n=t(this).val().split(",").map(r=>r.trim()).filter(r=>r);ye(n),p("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${n.length} \u4E2A\u5173\u952E\u8BCD`)}),e.find(`#${d}-show-examples`).on("click",()=>{alert(`
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
      `)})},_bindPresetEvents(e,t){e.find(`#${d}-load-rule-preset`).on("click",()=>{let s=e.find(`#${d}-rule-preset-select`).val();if(!s){p("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let n=qe(s);n.success?(this.renderTo(e),p("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${n.preset.name}`),x.emit(h.REGEX_PRESET_LOADED,{preset:n.preset})):p("error",n.message)}),e.find(`#${d}-save-rule-preset`).on("click",()=>{let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let n=We(s.trim());n.success?(this.renderTo(e),p("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):p("error",n.message)})},_bindTestEvents(e,t){e.find(`#${d}-test-extract`).on("click",()=>{let s=e.find(`#${d}-test-input`).val();if(!s||!s.trim()){p("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let n=yt(),r=Nt(),o=Lt(s,n,r),i=e.find(`#${d}-test-result-container`),a=e.find(`#${d}-test-result`);i.show(),!o||!o.trim()?(a.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),p("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(a.html(`<pre class="yyt-code-block">${m(o)}</pre>`),p("success","\u63D0\u53D6\u5B8C\u6210"),x.emit(h.REGEX_EXTRACTED,{result:o}))}),e.find(`#${d}-test-clear`).on("click",()=>{e.find(`#${d}-test-input`).val(""),e.find(`#${d}-test-result-container`).hide()})},_bindFileEvents(e,t){e.find(`#${d}-import-rules`).on("click",()=>{e.find(`#${d}-import-rules-file`).click()}),e.find(`#${d}-import-rules-file`).on("change",async s=>{let n=s.target.files[0];if(n){try{let r=await _t(n),o=Ve(r,{overwrite:!0});o.success?(this.renderTo(e),p("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):p("error",o.message)}catch(r){p("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}t(s.target).val("")}}),e.find(`#${d}-export-rules`).on("click",()=>{try{let s=Je();Tt(s,`youyou_toolkit_rules_${Date.now()}.json`),p("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){p("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),e.find(`#${d}-reset-rules`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(He([]),ye([]),this.renderTo(e),p("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(e){!S()||!$(e)||e.find("*").off()},getStyles(){return`
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
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}}});var br={};N(br,{DEFAULT_TOOL_PRESETS:()=>ot,DEFAULT_TOOL_STRUCTURE:()=>Ks,TOOL_STORAGE_KEYS:()=>k,cloneTool:()=>oi,deleteTool:()=>ri,deleteToolPreset:()=>li,exportTools:()=>tn,getAllToolPresets:()=>Zs,getAllTools:()=>Xe,getCurrentToolPresetId:()=>ci,getTool:()=>pe,getToolPreset:()=>ii,importTools:()=>en,resetTools:()=>sn,saveTool:()=>Ze,saveToolPreset:()=>ai,setCurrentToolPreset:()=>di,setToolEnabled:()=>Xs,validateTool:()=>yi});function Xe(){let e=P.get(k.TOOLS);return e&&typeof e=="object"?{...ot,...e}:{...ot}}function pe(e){return Xe()[e]||null}function Ze(e,t){if(!e||!t)return!1;let s=P.get(k.TOOLS)||{},n=!s[e]&&!ot[e],r={...Ks,...t,id:e,metadata:{...Ks.metadata,...t.metadata,updatedAt:new Date().toISOString()}};return s[e]||(r.metadata.createdAt=new Date().toISOString()),s[e]=r,P.set(k.TOOLS,s),x.emit(n?h.TOOL_REGISTERED:h.TOOL_UPDATED,{toolId:e,tool:r}),!0}function ri(e){if(ot[e])return!1;let t=P.get(k.TOOLS)||{};return t[e]?(delete t[e],P.set(k.TOOLS,t),x.emit(h.TOOL_UNREGISTERED,{toolId:e}),!0):!1}function Xs(e,t){let s=pe(e);if(!s)return!1;let n=P.get(k.TOOLS)||{};return n[e]||(n[e]={...s}),n[e].enabled=t,n[e].metadata={...n[e].metadata,updatedAt:new Date().toISOString()},P.set(k.TOOLS,n),x.emit(t?h.TOOL_ENABLED:h.TOOL_DISABLED,{toolId:e}),!0}function oi(e,t,s){let n=pe(e);if(!n)return!1;let r=JSON.parse(JSON.stringify(n));return r.name=s||`${n.name} (\u526F\u672C)`,r.metadata={...r.metadata,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},Ze(t,r)}function Zs(){let e=P.get(k.PRESETS);return e&&typeof e=="object"?{...ot,...e}:{...ot}}function ii(e){return Zs()[e]||null}function ai(e,t){if(!e||!t)return!1;let s=P.get(k.PRESETS)||{};return s[e]={...t,metadata:{...t.metadata,updatedAt:new Date().toISOString()}},P.set(k.PRESETS,s),!0}function li(e){if(ot[e])return!1;let t=P.get(k.PRESETS)||{};return t[e]?(delete t[e],P.set(k.PRESETS,t),!0):!1}function ci(){return P.get(k.CURRENT_PRESET)||null}function di(e){return Zs()[e]?(P.set(k.CURRENT_PRESET,e),!0):!1}function tn(){let e=P.get(k.TOOLS)||{},t=P.get(k.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:e,presets:t},null,2)}function en(e,t=!1){try{let s=typeof t=="object"?!!t?.overwrite:!!t,n=JSON.parse(e);if(!n||typeof n!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let r=s?{}:P.get(k.TOOLS)||{},o=s?{}:P.get(k.PRESETS)||{},i=0,a=0;if(n.tools&&typeof n.tools=="object"){for(let[c,l]of Object.entries(n.tools))ot[c]&&!s||l&&typeof l=="object"&&(r[c]=l,i++);P.set(k.TOOLS,r)}if(n.presets&&typeof n.presets=="object"){for(let[c,l]of Object.entries(n.presets))ot[c]&&!s||l&&typeof l=="object"&&(o[c]=l,a++);P.set(k.PRESETS,o)}return{success:!0,toolsImported:i,presetsImported:a,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u5DE5\u5177\u548C ${a} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function sn(){P.remove(k.TOOLS),P.remove(k.PRESETS),P.remove(k.CURRENT_PRESET)}function yi(e){let t=[];if(!e)return{valid:!1,errors:["\u5DE5\u5177\u5B9A\u4E49\u4E3A\u7A7A"]};if((!e.name||typeof e.name!="string")&&t.push("\u5DE5\u5177\u540D\u79F0\u65E0\u6548"),(!e.category||typeof e.category!="string")&&t.push("\u5DE5\u5177\u5206\u7C7B\u65E0\u6548"),e.config){let{trigger:s,execution:n,api:r,context:o}=e.config;s&&!["manual","event","scheduled"].includes(s.type)&&t.push("\u89E6\u53D1\u7C7B\u578B\u65E0\u6548"),n&&((typeof n.timeout!="number"||n.timeout<0)&&t.push("\u8D85\u65F6\u65F6\u95F4\u5FC5\u987B\u4E3A\u6B63\u6570"),(typeof n.retries!="number"||n.retries<0)&&t.push("\u91CD\u8BD5\u6B21\u6570\u5FC5\u987B\u4E3A\u6B63\u6570")),o&&typeof o.depth!="number"&&t.push("\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u5FC5\u987B\u4E3A\u6570\u5B57")}return{valid:t.length===0,errors:t}}var Ks,ot,k,nn=E(()=>{at();z();Ks={id:"",name:"",description:"",category:"utility",config:{trigger:{type:"manual",events:[]},execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!0,bypassPreset:"standard"},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},ot={},k={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"}});var ut,rn=E(()=>{rt();nn();ut={id:"toolManagePanel",render(e){let t=Xe();return`
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
    `).join("")},bindEvents(e,t){let s=S();!s||!$(e)||(this._bindToolEvents(e,s),this._bindFileEvents(e,s))},_bindToolEvents(e,t){e.find(".yyt-tool-toggle input").on("change",s=>{let n=t(s.currentTarget).closest(".yyt-tool-item"),r=n.data("tool-id"),o=t(s.currentTarget).is(":checked");Xs(r,o),n.toggleClass("yyt-enabled",o).toggleClass("yyt-disabled",!o),p("info",o?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),e.find("#yyt-add-tool").on("click",()=>{this._showToolEditDialog(e,t,null)})},_bindFileEvents(e,t){e.find("#yyt-import-tools").on("click",()=>{e.find("#yyt-import-tools-file").click()}),e.find("#yyt-import-tools-file").on("change",async s=>{let n=s.target.files[0];if(n){try{let r=await _t(n),o=en(r,{overwrite:!1});p(o.success?"success":"error",o.message),o.success&&this.renderTo(e)}catch(r){p("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}t(s.target).val("")}}),e.find("#yyt-export-tools").on("click",()=>{try{let s=tn();Tt(s,`youyou_toolkit_tools_${Date.now()}.json`),p("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){p("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),e.find("#yyt-reset-tools").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(sn(),this.renderTo(e),p("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(e,t,s){let n=s?pe(s):null,r=!!n,o=`
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
    `;t("#yyt-tool-dialog-overlay").remove(),e.append(o);let i=t("#yyt-tool-dialog-overlay"),a=()=>i.remove();i.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",a),i.on("click",function(c){c.target===this&&a()}),i.find("#yyt-tool-dialog-save").on("click",()=>{let c=t("#yyt-tool-name").val().trim(),l=t("#yyt-tool-category").val(),y=t("#yyt-tool-desc").val().trim(),u=parseInt(t("#yyt-tool-timeout").val())||6e4,g=parseInt(t("#yyt-tool-retries").val())||3;if(!c){p("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let f=s||`tool_${Date.now()}`;Ze(f,{name:c,category:l,description:y,config:{trigger:{type:"manual",events:[]},execution:{timeout:u,retries:g},api:{preset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0}),a(),this.renderTo(e),p("success",r?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA")})},destroy(e){!S()||!$(e)||e.find("*").off()},getStyles(){return`
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
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}}});var Mr={};N(Mr,{TOOL_CATEGORIES:()=>hr,TOOL_REGISTRY:()=>ts,clearToolApiPreset:()=>Cr,default:()=>mi,getAllDefaultToolConfigs:()=>es,getAllToolApiBindings:()=>Pr,getAllToolFullConfigs:()=>dn,getEnabledTools:()=>kr,getToolApiPreset:()=>Sr,getToolConfig:()=>an,getToolFullConfig:()=>D,getToolList:()=>wr,getToolSubTabs:()=>Tr,getToolWindowState:()=>Ir,hasTool:()=>ln,onPresetDeleted:()=>$r,registerTool:()=>xr,resetToolConfig:()=>Ar,resetToolRegistry:()=>_r,saveToolConfig:()=>ft,saveToolWindowState:()=>Rr,setToolApiPreset:()=>Er,setToolApiPresetConfig:()=>ui,setToolBypassConfig:()=>gi,setToolOutputMode:()=>pi,setToolPromptTemplate:()=>fi,unregisterTool:()=>vr,updateToolRuntime:()=>cn});function xr(e,t){if(!e||typeof e!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!t||typeof t!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let n of s)if(!t[n])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${n}`),!1;return gt[e]={id:e,...t,order:t.order??Object.keys(gt).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${e}`),!0}function vr(e){return gt[e]?(delete gt[e],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${e}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${e}`),!1)}function wr(e=!0){let t=Object.values(gt);return e?t.sort((s,n)=>(s.order??0)-(n.order??0)):t}function an(e){return gt[e]||null}function ln(e){return!!gt[e]}function Tr(e){let t=gt[e];return!t||!t.hasSubTabs?[]:t.subTabs||[]}function _r(){gt={...ts},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Er(e,t){if(!ln(e))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${e}`),!1;let s=b.get(Et)||{};return s[e]=t||"",b.set(Et,s),console.log(`[ToolRegistry] \u5DE5\u5177 "${e}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${t||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function Sr(e){return(b.get(Et)||{})[e]||""}function Cr(e){let t=b.get(Et)||{};delete t[e],b.set(Et,t),console.log(`[ToolRegistry] \u5DE5\u5177 "${e}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function Pr(){return b.get(Et)||{}}function $r(e){let t=b.get(Et)||{},s=!1;for(let n in t)t[n]===e&&(t[n]="",s=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${n}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&b.set(Et,t)}function D(e){let t=ge[e];if(!t)return an(e);let n=(b.get(ue)||{})[e]||{},r={...t,...n,id:e};return r.trigger={...t.trigger||{},...n.trigger||{}},r.output={...t.output||{},...n.output||{}},r.bypass={...t.bypass||{},...n.bypass||{}},r.runtime={...t.runtime||{},...n.runtime||{}},r.extraction={...t.extraction||{},...n.extraction||{}},r.injection={...t.injection||{},...n.injection||{}},(!Array.isArray(r.extraction.selectors)||r.extraction.selectors.length===0)&&Array.isArray(r.extractTags)&&r.extractTags.length>0&&(r.extraction.selectors=[...r.extractTags]),(!Array.isArray(r.extractTags)||r.extractTags.length===0)&&(r.extractTags=Array.isArray(r.extraction.selectors)?[...r.extraction.selectors]:[]),r}function ft(e,t){if(!e||!ge[e])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",e),!1;let s=b.get(ue)||{},n=["promptTemplate","enabled","extractTags","trigger","output","bypass","extraction","injection","runtime"];return s[e]={},n.forEach(r=>{t[r]!==void 0&&(s[e][r]=t[r])}),b.set(ue,s),x.emit(h.TOOL_UPDATED,{toolId:e,config:s[e]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${e}`),!0}function pi(e,t){let s=D(e);return s?ft(e,{...s,output:{...s.output,mode:t}}):!1}function ui(e,t){let s=D(e);return s?ft(e,{...s,output:{...s.output,apiPreset:t}}):!1}function gi(e,t){let s=D(e);return s?ft(e,{...s,bypass:{...s.bypass,...t}}):!1}function fi(e,t){let s=D(e);return s?ft(e,{...s,promptTemplate:t}):!1}function cn(e,t){let s=D(e);return s?ft(e,{...s,runtime:{...s.runtime,...t,lastRunAt:Date.now()}}):!1}function Ar(e){if(!e||!ge[e])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",e),!1;let t=b.get(ue)||{};return delete t[e],b.set(ue,t),x.emit(h.TOOL_UPDATED,{toolId:e,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${e}`),!0}function es(){return{...ge}}function dn(){return Object.keys(ge).map(e=>D(e))}function kr(){return dn().filter(e=>e&&e.enabled)}function Rr(e,t){let s=b.get(on)||{};s[e]={...t,updatedAt:Date.now()},b.set(on,s)}function Ir(e){return(b.get(on)||{})[e]||null}var ue,Et,on,ge,ts,hr,gt,mi,fe=E(()=>{at();z();ue="tool_configs",Et="tool_api_bindings",on="tool_window_states",ge={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},injection:{enabled:!0,target:"__character__",comment:"YouYouToolkit:summaryTool",position:"at_depth_as_system",depth:4,order:1e4},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</status_block>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["status_block"]}},ts={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{trigger:{type:"manual",events:[]},execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:3,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel"}]},bypass:{id:"bypass",name:"\u7834\u9650\u8BCD",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406\u7834\u9650\u8BCD\u9884\u8BBE",component:"BypassPanel",order:4},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:5}},hr={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},gt={...ts};mi={TOOL_REGISTRY:ts,TOOL_CATEGORIES:hr,registerTool:xr,unregisterTool:vr,getToolList:wr,getToolConfig:an,hasTool:ln,getToolSubTabs:Tr,resetToolRegistry:_r,setToolApiPreset:Er,getToolApiPreset:Sr,clearToolApiPreset:Cr,getAllToolApiBindings:Pr,onPresetDeleted:$r,saveToolWindowState:Rr,getToolWindowState:Ir,getToolFullConfig:D,saveToolConfig:ft,resetToolConfig:Ar,getAllDefaultToolConfigs:es,getAllToolFullConfigs:dn,getEnabledTools:kr}});var Dr={};N(Dr,{BypassManager:()=>ss,DEFAULT_BYPASS_PRESETS:()=>bt,addMessage:()=>Pi,buildBypassMessages:()=>Ii,bypassManager:()=>v,createPreset:()=>vi,default:()=>Mi,deleteMessage:()=>Ai,deletePreset:()=>Ti,duplicatePreset:()=>_i,exportPresets:()=>ki,getAllPresets:()=>hi,getDefaultPresetId:()=>Ei,getEnabledMessages:()=>Ci,getPreset:()=>xi,getPresetList:()=>pn,importPresets:()=>Ri,setDefaultPresetId:()=>Si,updateMessage:()=>$i,updatePreset:()=>wi});var mt,Kt,yn,bt,bi,ss,v,hi,pn,xi,vi,wi,Ti,_i,Ei,Si,Ci,Pi,$i,Ai,ki,Ri,Ii,Mi,me=E(()=>{at();z();mt="bypass_presets",Kt="default_bypass_preset",yn="current_bypass_preset",bt={},bi=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),ss=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let t=b.get(mt,{});return this._cache={...bt,...t},this._cache}getPresetList(){let t=this.getAllPresets();return Object.values(t).sort((s,n)=>(n.updatedAt||0)-(s.updatedAt||0))}getPreset(t){return t&&this.getAllPresets()[t]||null}presetExists(t){return!!this.getPreset(t)}createPreset(t){let{id:s,name:n,description:r,messages:o}=t;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!n||typeof n!="string"||!n.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let i=s.trim();if(this.presetExists(i))return{success:!1,message:`\u9884\u8BBE "${i}" \u5DF2\u5B58\u5728`};let a={id:i,name:n.trim(),description:r||"",enabled:!0,messages:o||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(i,a),x.emit(h.BYPASS_PRESET_CREATED,{presetId:i,preset:a}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${i}`),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:a}}updatePreset(t,s){if(!t)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let n=this.getPreset(t);if(!n)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==t)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let r={...n,...s,id:t,updatedAt:Date.now()};return this._savePreset(t,r),x.emit(h.BYPASS_PRESET_UPDATED,{presetId:t,preset:r}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${t}`),{success:!0,message:`\u9884\u8BBE "${n.name}" \u66F4\u65B0\u6210\u529F`,preset:r}}deletePreset(t){if(!t)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(bt[t])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(t);if(!s)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};let n=b.get(mt,{});return delete n[t],b.set(mt,n),this._cache=null,this.getDefaultPresetId()===t&&this.setDefaultPresetId(null),x.emit(h.BYPASS_PRESET_DELETED,{presetId:t}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${t}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(t,s,n){let r=this.getPreset(t);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${t}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(r)),id:s.trim(),name:n||`${r.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),o),x.emit(h.BYPASS_PRESET_CREATED,{presetId:s,preset:o}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${o.name}"`,preset:o}}addMessage(t,s){let n=this.getPreset(t);if(!n)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};let r={id:`msg_${Date.now()}`,role:s.role||"SYSTEM",content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1},o=[...n.messages||[],r];return this.updatePreset(t,{messages:o})}updateMessage(t,s,n){let r=this.getPreset(t);if(!r)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};let o=r.messages||[],i=o.findIndex(c=>c.id===s);if(i===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let a=[...o];return a[i]={...a[i],...n},this.updatePreset(t,{messages:a})}deleteMessage(t,s){let n=this.getPreset(t);if(!n)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};let r=n.messages||[],o=r.find(a=>a.id===s);if(!o)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(o.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let i=r.filter(a=>a.id!==s);return this.updatePreset(t,{messages:i})}getEnabledMessages(t){let s=this.getPreset(t);return!s||!s.enabled?[]:(s.messages||[]).filter(n=>n.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let t=b.get(Kt,null);return t==="undefined"||t==="null"||t===""?(b.remove(Kt),null):t}setDefaultPresetId(t){return t&&!this.presetExists(t)?!1:(b.set(Kt,t),x.emit(h.BYPASS_PRESET_ACTIVATED,{presetId:t}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${t}`),!0)}getDefaultPreset(){let t=this.getDefaultPresetId();return t?this.getPreset(t):null}exportPresets(t=null){if(t){let n=this.getPreset(t);if(!n)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(n,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(t,s={}){let{overwrite:n=!1}=s,r;try{r=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let o=Array.isArray(r)?r:r.presets?r.presets:[r];if(o.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let i=b.get(mt,{}),a=0;for(let c of o)!c.id||typeof c.id!="string"||c.name&&(bt[c.id]&&!n||!n&&i[c.id]||(i[c.id]={...c,updatedAt:Date.now()},a++));return a>0&&(b.set(mt,i),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u9884\u8BBE`,imported:a}}getToolBypassPreset(t){if(!t?.bypass?.enabled)return null;let s=t?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(t){let s=this.getToolBypassPreset(t);return s?this.getEnabledMessages(s.id):[]}_savePreset(t,s){let n=b.get(mt,{});n[t]=s,b.set(mt,n),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let t=b.get(mt,{}),s={},n=!1,r=Array.isArray(t)?t.map((o,i)=>[o?.id||o?.name||`legacy_${i}`,o]):Object.entries(t||{});for(let[o,i]of r){let a=this._normalizePreset(o,i,s);if(!a){n=!0;continue}s[a.id]=a,(!t?.[a.id]||t?.[a.id]?.id!==a.id)&&(n=!0)}n&&b.set(mt,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(t,s,n={}){if(!s||typeof s!="object")return null;let r=typeof s.name=="string"?s.name.trim():"",o=typeof s.id=="string"?s.id.trim():"",i=typeof t=="string"?t.trim():"";if(!r&&i&&i!=="undefined"&&i!=="null"&&(r=i),this._isLegacySamplePreset(r,o)||(!o&&i&&i!=="undefined"&&i!=="null"&&(o=i),!o&&r&&r!=="undefined"&&r!=="null"&&(o=this._generatePresetId(r,n)),!r||!o||o==="undefined"||r==="undefined"))return null;let c=Array.isArray(s.messages)?s.messages.filter(l=>l&&typeof l=="object").map((l,y)=>({id:typeof l.id=="string"&&l.id.trim()?l.id.trim():`${o}_msg_${y+1}`,role:l.role||"SYSTEM",content:typeof l.content=="string"?l.content:"",enabled:l.enabled!==!1,deletable:l.deletable!==!1})):[];return{...s,id:o,name:r,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:c,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(t){let s=b.get(Kt,null),n=b.get(yn,null),r=s??n;(r==="undefined"||r==="null"||r==="")&&(r=null),r&&!t[r]&&(r=Object.values(t).find(i=>i.name===r)?.id||null),r?b.set(Kt,r):b.remove(Kt),b.has(yn)&&b.remove(yn)}_isLegacySamplePreset(t,s=""){return t?s==="standard"||s==="enhanced"||s==="jailbreak"||bi.has(t)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(t):!1}_generatePresetId(t,s={}){let n=String(t).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,r=n,o=1;for(;s[r];)r=`${n}_${o++}`;return r}_log(...t){this.debugMode&&console.log("[BypassManager]",...t)}},v=new ss,hi=()=>v.getAllPresets(),pn=()=>v.getPresetList(),xi=e=>v.getPreset(e),vi=e=>v.createPreset(e),wi=(e,t)=>v.updatePreset(e,t),Ti=e=>v.deletePreset(e),_i=(e,t,s)=>v.duplicatePreset(e,t,s),Ei=()=>v.getDefaultPresetId(),Si=e=>v.setDefaultPresetId(e),Ci=e=>v.getEnabledMessages(e),Pi=(e,t)=>v.addMessage(e,t),$i=(e,t,s)=>v.updateMessage(e,t,s),Ai=(e,t)=>v.deleteMessage(e,t),ki=e=>v.exportPresets(e),Ri=(e,t)=>v.importPresets(e,t),Ii=e=>v.buildBypassMessages(e),Mi=v});var jr={};N(jr,{abortAllTasks:()=>ji,abortTask:()=>Ni,buildToolMessages:()=>Nr,clearExecutionHistory:()=>Gi,createExecutionContext:()=>Qi,createResult:()=>ns,enhanceMessagesWithBypass:()=>qi,executeBatch:()=>Li,executeTool:()=>Lr,executeToolWithConfig:()=>rs,executeToolsBatch:()=>Ki,executorState:()=>M,extractFailed:()=>Wi,extractSuccessful:()=>Hi,generateTaskId:()=>jt,getExecutionHistory:()=>Yi,getExecutorStatus:()=>Bi,getScheduler:()=>Xt,getToolsForEvent:()=>gn,mergeResults:()=>Fi,pauseExecutor:()=>Ui,resumeExecutor:()=>zi,setMaxConcurrent:()=>Oi});function ns(e,t,s,n,r,o,i=0){return{success:s,taskId:e,toolId:t,data:n,error:r,duration:o,retries:i,timestamp:Date.now(),metadata:{}}}function jt(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function Di(e,t={}){return{id:jt(),toolId:e,options:t,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:t.maxRetries||3}}function Xt(){return be||(be=new un(M.maxConcurrent)),be}function Oi(e){M.maxConcurrent=Math.max(1,Math.min(10,e)),be&&(be.maxConcurrent=M.maxConcurrent)}async function Lr(e,t={},s){let n=Xt(),r=Di(e,t);for(;M.isPaused;)await new Promise(o=>setTimeout(o,100));try{let o=await n.enqueue(async i=>{if(i.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(i,t);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},r);return Or(o),o}catch(o){let i=ns(r.id,e,!1,null,o,Date.now()-r.createdAt,r.retries);return Or(i),i}}async function Li(e,t={}){let{failFast:s=!1,concurrency:n=M.maxConcurrent}=t,r=[],o=Xt(),i=o.maxConcurrent;o.maxConcurrent=n;try{let a=e.map(({toolId:c,options:l,executor:y})=>Lr(c,l,y));if(s)for(let c of a){let l=await c;if(r.push(l),!l.success){o.abortAll();break}}else{let c=await Promise.allSettled(a);for(let l of c)l.status==="fulfilled"?r.push(l.value):r.push(ns(jt(),"unknown",!1,null,l.reason,0,0))}}finally{o.maxConcurrent=i}return r}function Ni(e){return Xt().abort(e)}function ji(){Xt().abortAll(),M.executionQueue=[]}function Ui(){M.isPaused=!0}function zi(){M.isPaused=!1}function Bi(){return{...Xt().getStatus(),isPaused:M.isPaused,activeControllers:M.activeControllers.size,historyCount:M.executionHistory.length}}function Or(e){M.executionHistory.push(e),M.executionHistory.length>100&&M.executionHistory.shift()}function Yi(e={}){let t=[...M.executionHistory];return e.toolId&&(t=t.filter(s=>s.toolId===e.toolId)),e.success!==void 0&&(t=t.filter(s=>s.success===e.success)),e.limit&&(t=t.slice(-e.limit)),t}function Gi(){M.executionHistory=[]}function Fi(e){let t={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of e)t.totalDuration+=s.duration,s.success?(t.successCount++,s.data!==void 0&&s.data!==null&&t.data.push(s.data)):(t.success=!1,t.failureCount++,s.error&&t.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return t}function Hi(e){return e.filter(t=>t.success).map(t=>t.data)}function Wi(e){return e.filter(t=>!t.success).map(t=>({taskId:t.taskId,toolId:t.toolId,error:t.error}))}function Qi(e={}){return{taskId:jt(),startTime:Date.now(),signal:e.signal||null,apiConfig:e.apiConfig||null,bypassMessages:e.bypassMessages||[],context:e.context||{},metadata:e.metadata||{}}}function qi(e,t){return!t||t.length===0?e:[...t,...e]}function Ji(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Nr(e,t){let s=[],n=e.promptTemplate||"",r={"{{userMessage}}":t.input?.userMessage||"","{{lastAiMessage}}":t.input?.lastAiMessage||"","{{extractedContent}}":t.input?.extractedContent||"","{{previousToolOutput}}":t.input?.previousToolOutput||"","{{context}}":JSON.stringify(t.input?.context||{}),"{{pg}}":t.input?.context?.pg||"1","{{time}}":t.input?.context?.time||"","{{scene}}":t.input?.context?.scene||"","{{plot}}":t.input?.context?.plot||"","{{mq}}":t.input?.context?.mq||"\u2160","{{mqStatus}}":t.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":t.input?.context?.sq||"1","{{sqStatus}}":t.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":t.input?.context?.latestSq||"1","{{completed}}":t.input?.context?.completed||"\u65E0","{{defined}}":t.input?.context?.defined||"","{{status}}":t.input?.context?.status||"","{{seeds}}":t.input?.context?.seeds||"","{{name}}":t.input?.context?.name||"","{{location}}":t.input?.context?.location||"","{{condition}}":t.input?.context?.condition||"","{{equipment}}":t.input?.context?.equipment||"","{{skills}}":t.input?.context?.skills||""};for(let[o,i]of Object.entries(r))n=n.replace(new RegExp(Ji(o),"g"),i);return s.push({role:"USER",content:n}),s}async function rs(e,t,s={}){let n=D(e);if(!n)return{success:!1,taskId:jt(),toolId:e,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!n.enabled)return{success:!1,taskId:jt(),toolId:e,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let r=Date.now(),o=jt();try{x.emit(h.TOOL_EXECUTION_STARTED,{toolId:e,taskId:o,context:t});let i=Nr(n,t);if(typeof s.callApi=="function"){let a=n.apiPreset?{preset:n.apiPreset}:null,c=await s.callApi(i,a,s.signal),l=c;n.outputMode==="separate"&&n.extractTags?.length>0&&(l=Vi(c,n.extractTags));let y={success:!0,taskId:o,toolId:e,data:l,duration:Date.now()-r};return x.emit(h.TOOL_EXECUTED,{toolId:e,taskId:o,result:y}),y}else return{success:!0,taskId:o,toolId:e,data:{messages:i,config:{apiPreset:n.apiPreset,outputMode:n.outputMode,extractTags:n.extractTags}},duration:Date.now()-r,needsExecution:!0}}catch(i){let a={success:!1,taskId:o,toolId:e,error:i.message||String(i),duration:Date.now()-r};return x.emit(h.TOOL_EXECUTION_FAILED,{toolId:e,taskId:o,error:i}),a}}function Vi(e,t){let s={};for(let n of t){let r=new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"gi"),o=e.match(r);o&&(s[n]=o.map(i=>{let a=i.match(new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"i"));return a?a[1].trim():""}))}return s}async function Ki(e,t,s={}){let n=[];for(let r of e){let o=D(r);if(o&&o.enabled){let i=await rs(r,t,s);n.push(i)}}return n}function gn(e){let t=[],s=["summaryTool","statusBlock"];for(let n of s){let r=D(n),o=r?.trigger?.enabled&&r?.trigger?.event===e,i=Array.isArray(r?.triggerEvents)&&r.triggerEvents.includes(e);r&&r.enabled&&(o||i)&&t.push(r)}return t}var M,un,be,fn=E(()=>{fe();z();M={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};un=class{constructor(t=3){this.maxConcurrent=t,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(t,s){return new Promise((n,r)=>{this.queue.push({executor:t,task:s,resolve:n,reject:r}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let t=this.queue.shift();if(!t)continue;let{executor:s,task:n,resolve:r,reject:o}=t,i=new AbortController;n.abortController=i,n.status="running",n.startedAt=Date.now(),this.running.set(n.id,n),M.activeControllers.set(n.id,i),this.executeTask(s,n,i.signal).then(a=>{n.status="completed",n.completedAt=Date.now(),r(a)}).catch(a=>{n.status=a.name==="AbortError"?"aborted":"failed",n.completedAt=Date.now(),o(a)}).finally(()=>{this.running.delete(n.id),M.activeControllers.delete(n.id),M.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(t,s,n){let r=Date.now(),o=null;for(let i=0;i<=s.maxRetries;i++){if(n.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let a=await t(n);return ns(s.id,s.toolId,!0,a,null,Date.now()-r,i)}catch(a){if(o=a,a.name==="AbortError")throw a;i<s.maxRetries&&(await this.delay(1e3*(i+1)),s.retries=i+1)}}throw o}delay(t){return new Promise(s=>setTimeout(s,t))}abort(t){let s=M.activeControllers.get(t);return s?(s.abort(),!0):!1}abortAll(){for(let t of M.activeControllers.values())t.abort();M.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},be=null});var Ur={};N(Ur,{DEFAULT_SETTINGS:()=>bn,SettingsService:()=>os,default:()=>Xi,settingsService:()=>St});var bn,mn,os,St,Xi,is=E(()=>{at();z();bn={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},listener:{listenGenerationEnded:!0,ignoreQuietGeneration:!0,ignoreAutoTrigger:!0,debounceMs:300},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue"}},mn="settings_v2",os=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let t=b.get(mn,{});return this._cache=this._mergeWithDefaults(t),this._cache}saveSettings(t){this._cache=this._mergeWithDefaults(t),b.set(mn,this._cache),x.emit(h.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(t){let s=this.getSettings(),n=this._deepMerge(s,t);this.saveSettings(n)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(t){this.updateSettings({executor:t})}getListenerSettings(){return this.getSettings().listener}updateListenerSettings(t){this.updateSettings({listener:t})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(t){this.updateSettings({debug:t})}getUiSettings(){return this.getSettings().ui}updateUiSettings(t){this.updateSettings({ui:t})}resetSettings(){this._cache=JSON.parse(JSON.stringify(bn)),b.set(mn,this._cache),x.emit(h.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(t,s=null){let n=this.getSettings(),r=t.split("."),o=n;for(let i of r)if(o&&typeof o=="object"&&i in o)o=o[i];else return s;return o}set(t,s){let n=JSON.parse(JSON.stringify(this.getSettings())),r=t.split("."),o=n;for(let i=0;i<r.length-1;i++){let a=r[i];a in o||(o[a]={}),o=o[a]}o[r[r.length-1]]=s,this.saveSettings(n)}_mergeWithDefaults(t){return this._deepMerge(JSON.parse(JSON.stringify(bn)),t)}_deepMerge(t,s){let n={...t};for(let r in s)s[r]&&typeof s[r]=="object"&&!Array.isArray(s[r])?n[r]=this._deepMerge(t[r]||{},s[r]):n[r]=s[r];return n}},St=new os,Xi=St});var Br={};N(Br,{ContextInjector:()=>as,DEFAULT_INJECTION_OPTIONS:()=>zr,contextInjector:()=>Ut,default:()=>Zi});var he,zr,as,Ut,Zi,ls=E(()=>{at();z();he="context_injection",zr={target:"context",scope:"chat",overwrite:!0,enabled:!0,worldbookTarget:"__character__",comment:"",position:"at_depth_as_system",depth:4,order:1e4},as=class{constructor(){this._cache=new Map,this.debugMode=!1}async inject(t,s,n={}){if(!t||s===void 0||s===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),!1;let r={...zr,...n},o=n.chatId||this._getCurrentChatId();if(!o)return this._log("\u6CE8\u5165\u5931\u8D25: \u65E0\u6CD5\u83B7\u53D6\u804A\u5929ID"),!1;let i=this._getStorageKey(o),a=this._getChatContexts(o),c={toolId:t,content:String(s),updatedAt:Date.now(),sourceMessageId:n.sourceMessageId||null,options:r};return r.overwrite||!a[t]?a[t]=c:a[t]={...c,content:(a[t]?.content||"")+`

`+s},this._saveChatContexts(o,a),x.emit(h.TOOL_CONTEXT_INJECTED,{toolId:t,chatId:o,content:c.content,options:r}),r.enabled!==!1&&r.target==="worldbook"&&!await this._syncWorldbookEntry(t,c.content,r)?(this._log(`\u4E16\u754C\u4E66\u6CE8\u5165\u5931\u8D25: ${t}`),!1):(this._log(`\u6CE8\u5165\u6210\u529F: ${t} -> ${o}`),!0)}async getAvailableLorebooks(){let t=this._getTavernHelper(),s=[],n=new Set;if(s.push({value:"__character__",label:"\u5F53\u524D\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66",kind:"character",isPrimary:!0}),n.add("__character__"),!t)return s;try{let r="";typeof t.getCurrentCharPrimaryLorebook=="function"?r=await t.getCurrentCharPrimaryLorebook():typeof t.getCharLorebooks=="function"&&(r=(await t.getCharLorebooks({type:"all"}))?.primary||""),r&&!n.has(r)&&(s.push({value:r,label:`${r} [\u89D2\u8272\u4E3B\u4E16\u754C\u4E66]`,kind:"lorebook",isPrimary:!0}),n.add(r))}catch(r){this._log("\u83B7\u53D6\u89D2\u8272\u4E3B\u4E16\u754C\u4E66\u5931\u8D25",r)}try{if(typeof t.getLorebooks=="function"){let r=await Promise.resolve(t.getLorebooks());(Array.isArray(r)?r:[]).forEach(i=>{!i||n.has(i)||(s.push({value:i,label:i,kind:"lorebook"}),n.add(i))})}}catch(r){this._log("\u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25",r)}return s}getAggregatedContext(t){let s=t||this._getCurrentChatId();if(!s)return"";let n=this._getChatContexts(s),r=Object.entries(n);if(r.length===0)return"";let o=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[i,a]of r)o.push(`[${i}]`),o.push(a.content||""),o.push("");return o.join(`
`)}getToolContext(t,s){let n=t||this._getCurrentChatId();return!n||!s?null:this._getChatContexts(n)[s]||null}getAllToolContexts(t){let s=t||this._getCurrentChatId();return s?this._getChatContexts(s):{}}clearToolContext(t,s){let n=t||this._getCurrentChatId();if(!n||!s)return!1;let r=this._getChatContexts(n);return r[s]?(delete r[s],this._saveChatContexts(n,r),x.emit(h.TOOL_CONTEXT_CLEARED,{chatId:n,toolId:s}),this._log(`\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587: ${s}`),!0):!1}clearAllContext(t){let s=t||this._getCurrentChatId();if(!s)return!1;let n=this._getAllContexts();return delete n[s],b.set(he,n),this._cache.delete(s),x.emit(h.TOOL_CONTEXT_CLEARED,{chatId:s,allTools:!0}),this._log(`\u6E05\u9664\u804A\u5929\u6240\u6709\u4E0A\u4E0B\u6587: ${s}`),!0}clearAllChatsContexts(){b.remove(he),this._cache.clear(),this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(t,s){let n=t||this._getCurrentChatId();return!n||!s?!1:!!this._getChatContexts(n)[s]}getContextSummary(t){let s=t||this._getCurrentChatId();if(!s)return{tools:[],totalCount:0};let n=this._getChatContexts(s),r=Object.entries(n).map(([o,i])=>({toolId:o,updatedAt:i.updatedAt,contentLength:i.content?.length||0}));return{chatId:s,tools:r,totalCount:r.length}}exportContext(t){let s=t||this._getCurrentChatId();return s?{chatId:s,contexts:this._getChatContexts(s),exportedAt:Date.now()}:{}}importContext(t,s={}){if(!t||!t.chatId||!t.contexts)return!1;let{overwrite:n=!1}=s;if(n)this._saveChatContexts(t.chatId,t.contexts);else{let o={...this._getChatContexts(t.chatId),...t.contexts};this._saveChatContexts(t.chatId,o)}return this._log(`\u5BFC\u5165\u4E0A\u4E0B\u6587: ${t.chatId}`),!0}_getStorageKey(t){return`${he}:${t}`}_getTavernHelper(){try{return(typeof window.parent<"u"&&window.parent!==window?window.parent:window).TavernHelper||null}catch{return null}}_normalizeWorldbookPosition(t){let s=String(t||"").trim().toLowerCase();return s==="before_char"||s==="after_char"||s==="at_depth_as_system"?s:"at_depth_as_system"}async _resolveWorldbookTarget(t){let s=this._getTavernHelper();return s?!t||t==="__character__"?typeof s.getCurrentCharPrimaryLorebook=="function"?await s.getCurrentCharPrimaryLorebook():typeof s.getCharLorebooks=="function"&&(await s.getCharLorebooks({type:"all"}))?.primary||"":t:""}async _syncWorldbookEntry(t,s,n){let r=this._getTavernHelper();if(!r||typeof r.getLorebookEntries!="function")return this._log("TavernHelper \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u5199\u5165\u4E16\u754C\u4E66"),!1;let o=await this._resolveWorldbookTarget(n.worldbookTarget||n.targetName||n.target);if(!o)return this._log("\u672A\u627E\u5230\u53EF\u7528\u4E16\u754C\u4E66\uFF0C\u65E0\u6CD5\u5199\u5165"),!1;let i=n.comment||`YouYouToolkit:${t}`,a=this._normalizeWorldbookPosition(n.position),c=Number.isFinite(Number(n.depth))?Number(n.depth):4,l=Number.isFinite(Number(n.order))?Number(n.order):1e4;try{let y=await r.getLorebookEntries(o),g=(Array.isArray(y)?y:[]).find(G=>G?.comment===i||G?.key===i),f=String(s);g&&n.overwrite===!1&&(f=[g.content||"",s].filter(Boolean).join(`

`));let T={key:i,comment:i,content:f,type:"constant",enabled:!0,disable:!1,prevent_recursion:!0,position:a,order:l};if(a==="at_depth_as_system"&&(T.depth=c),g?.uid!=null&&typeof r.setLorebookEntries=="function")return await r.setLorebookEntries(o,[{...T,uid:g.uid}]),!0;if(typeof r.createLorebookEntries=="function")return await r.createLorebookEntries(o,[T]),!0}catch(y){this._log("\u5199\u5165\u4E16\u754C\u4E66\u5931\u8D25",y)}return!1}_getCurrentChatId(){try{let t=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(t.SillyTavern?.getContext){let s=t.SillyTavern.getContext(),r=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,t.SillyTavern?.chatId,t.SillyTavern?.chat_id,t.SillyTavern?.chat_filename].find(i=>typeof i=="string"&&i.trim());if(r)return r;let o=t.SillyTavern?.this_chid;if(o!=null)return`chat_char_${o}`}return"chat_default"}catch{return"chat_default"}}_getAllContexts(){return b.get(he,{})}_getChatContexts(t){if(this._cache.has(t))return this._cache.get(t);let n=this._getAllContexts()[t]||{};return this._cache.set(t,n),n}_saveChatContexts(t,s){let n=this._getAllContexts();n[t]=s,b.set(he,n),this._cache.set(t,s)}_log(...t){this.debugMode&&console.log("[ContextInjector]",...t)}},Ut=new as,Zi=Ut});var Gr={};N(Gr,{DEFAULT_PROMPT_TEMPLATE:()=>Yr,ToolPromptService:()=>cs,default:()=>ta,toolPromptService:()=>ds});var Yr,cs,ds,ta,hn=E(()=>{z();me();Yr="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",cs=class{constructor(){this.debugMode=!1}buildToolMessages(t,s){if(!t)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let n=[],r=this._getBypassMessages(t);if(r&&r.length>0)for(let a of r)a.enabled!==!1&&n.push({role:this._normalizeRole(a.role),content:a.content||""});let o=this._getPromptTemplate(t),i=this._buildUserContent(o,s);return i.trim()&&n.push({role:"user",content:i}),this._log(`\u6784\u5EFA\u6D88\u606F: ${n.length} \u6761`),n}buildPromptText(t,s){let n=this._getPromptTemplate(t);return this._buildUserContent(n,s)}getToolPromptTemplate(t){return this._getPromptTemplate(t)}_getPromptTemplate(t){return t.promptTemplate&&typeof t.promptTemplate=="string"?t.promptTemplate:Yr}_getBypassMessages(t){return t.bypass?.enabled?v.buildBypassMessages(t):[]}_buildUserContent(t,s){let n=[],r=s?.lastAiMessage||s?.input?.lastAiMessage||"",o=s?.extractedContent||s?.input?.extractedContent||"",i=s?.recentMessagesText||"";if(t&&t.trim()){let a=t;Object.entries({"{{lastAiMessage}}":r,"{{extractedContent}}":o,"{{recentMessagesText}}":i}).forEach(([l,y])=>{a=a.split(l).join(y||"")}),n.push(a.trim())}return o&&n.push(`
\u4EE5\u4E0B\u662F\u57FA\u4E8E\u63D0\u53D6\u89C4\u5219\u7B5B\u51FA\u7684\u5185\u5BB9\uFF1A
${o}`),r&&n.push(`
\u4EE5\u4E0B\u662F\u9700\u8981\u5904\u7406\u7684AI\u56DE\u590D\u5185\u5BB9\uFF1A
${r}`),n.join(`
`)}_normalizeRole(t){if(!t)return"user";switch(String(t).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...t){this.debugMode&&console.log("[ToolPromptService]",...t)}setDebugMode(t){this.debugMode=t}},ds=new cs,ta=ds});var Fr={};N(Fr,{LEGACY_OUTPUT_MODES:()=>ea,OUTPUT_MODES:()=>zt,TOOL_RUNTIME_STATUS:()=>sa,ToolOutputService:()=>ys,default:()=>na,toolOutputService:()=>Bt});var zt,ea,sa,ys,Bt,na,xn=E(()=>{z();is();ls();hn();Ke();zt={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},ea={inline:"follow_ai"},sa={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},ys=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(t){return!t||!t.enabled||!t.trigger?.enabled||!t.output?.enabled?!1:t.output?.mode===zt.POST_RESPONSE_API}shouldRunFollowAi(t){if(!t||!t.enabled||!t.trigger?.enabled||!t.output?.enabled)return!1;let s=t.output?.mode;return s===zt.FOLLOW_AI||s==="inline"}shouldRunInline(t){return this.shouldRunFollowAi(t)}async runToolPostResponse(t,s){let n=Date.now(),r=t.id;this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${r}`),x.emit(h.TOOL_EXECUTION_STARTED,{toolId:r,mode:zt.POST_RESPONSE_API});try{let o=await this._buildToolMessages(t,s);if(!o||o.length===0)throw new Error("\u65E0\u6CD5\u6784\u5EFA\u6709\u6548\u7684\u6D88\u606F");this._log(`\u6784\u5EFA\u4E86 ${o.length} \u6761\u6D88\u606F`);let i=t.output?.apiPreset,a=await this._getRequestTimeout(),c=await this._sendApiRequest(i,o,{timeoutMs:a,signal:s.signal}),l=this._extractOutputContent(c,t);if(l&&!await Ut.inject(r,l,{chatId:s.chatId,overwrite:t.output?.overwrite!==!1,sourceMessageId:s.messageId||"",target:t.injection?.enabled===!1?"context":"worldbook",worldbookTarget:t.injection?.target||"__character__",comment:t.injection?.comment||`YouYouToolkit:${r}`,position:t.injection?.position||"at_depth_as_system",depth:t.injection?.depth??4,order:t.injection?.order??1e4,enabled:t.injection?.enabled!==!1}))throw new Error("\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");let y=Date.now()-n;return x.emit(h.TOOL_EXECUTED,{toolId:r,success:!0,duration:y,mode:zt.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${r}, \u8017\u65F6 ${y}ms`),{success:!0,toolId:r,output:l,duration:y}}catch(o){let i=Date.now()-n;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${r}`,o),x.emit(h.TOOL_EXECUTION_FAILED,{toolId:r,error:o.message||String(o),duration:i}),{success:!1,toolId:r,error:o.message||String(o),duration:i}}}async runToolInline(t,s){let n=Date.now(),r=t.id;try{let o=await this._buildToolMessages(t,s);return{success:!0,toolId:r,messages:o,duration:Date.now()-n}}catch(o){return{success:!1,toolId:r,error:o.message||String(o),duration:Date.now()-n}}}async previewExtraction(t,s){let n=this._collectRecentAssistantMessages(t,s),r=this._applyGlobalContextRules(n),o=this._applyExtractionSelectors(r,t);return{success:!0,sourceText:n,filteredSourceText:r,extractedText:o,selectors:this._getExtractionSelectors(t),maxMessages:t?.extraction?.maxMessages||5}}async _buildToolMessages(t,s){let n=await Ut.getAggregatedContext(s.chatId),r=this._collectRecentAssistantMessages(t,s),o=this._applyGlobalContextRules(r),i=this._applyExtractionSelectors(o,t),a={...s,injectedContext:n,rawRecentMessagesText:r,recentMessagesText:o,extractedContent:i,toolName:t.name,toolId:t.id};return ds.buildToolMessages(t,a)}_normalizeRole(t){if(!t)return"user";let s=String(t).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(t){this._apiConnection=t}async _sendApiRequest(t,s,n={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:r=9e4,signal:o}=n;if(t&&this._apiConnection.sendWithPreset)return await this._apiConnection.sendWithPreset(t,s,{timeoutMs:r},o);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:r},o);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return St.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(t,s){if(!t)return"";if(typeof t=="string")return this._applyExtractionSelectors(t,s);if(typeof t=="object"){if(t.choices&&t.choices[0]?.message?.content)return this._applyExtractionSelectors(t.choices[0].message.content,s);if(t.content)return this._applyExtractionSelectors(t.content,s);if(t.text)return this._applyExtractionSelectors(t.text,s);if(t.message)return this._applyExtractionSelectors(t.message,s);try{return this._applyExtractionSelectors(JSON.stringify(t,null,2),s)}catch{return this._applyExtractionSelectors(String(t),s)}}return this._applyExtractionSelectors(String(t),s)}_getExtractionSelectors(t){let s=t?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(n=>String(n||"").trim()).filter(Boolean):Array.isArray(t?.extractTags)&&t.extractTags.length>0?t.extractTags.map(n=>String(n||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(t,s){let n=typeof t=="string"?t:String(t||""),r=this._getExtractionSelectors(s);if(!r.length)return n.trim();let o=r.map((a,c)=>{let l=String(a||"").trim(),y=l.startsWith("regex:");return{id:`tool-extract-${c}`,type:y?"regex_include":"include",value:y?l.slice(6).trim():l,enabled:!0}}).filter(a=>a.value);return Lt(n,o,[])||n.trim()}_applyGlobalContextRules(t){let s=typeof t=="string"?t:String(t||"");if(!s.trim())return"";try{let n=yt()||[],r=Nt()||[];return!Array.isArray(n)||n.length===0?s.trim():Lt(s,n,r)||s.trim()}catch(n){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",n),s.trim()}}_getMessageText(t){if(!t)return"";let s=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let n of s)if(typeof n=="string"&&n.trim())return n.trim();return""}_collectRecentAssistantMessages(t,s){let n=Math.max(1,parseInt(t?.extraction?.maxMessages,10)||5),o=(Array.isArray(s?.chatMessages)?s.chatMessages:[]).filter(i=>{let a=String(i?.role||"").toLowerCase();return(a==="assistant"||!i?.is_user&&!i?.is_system&&!a)&&this._getMessageText(i)}).slice(-n).map(i=>this._getMessageText(i)).filter(Boolean);return o.length>0?o.join(`

`):s?.lastAiMessage||s?.input?.lastAiMessage||""}filterPostResponseTools(t){return Array.isArray(t)?t.filter(s=>this.shouldRunPostResponse(s)):[]}filterInlineTools(t){return Array.isArray(t)?t.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(t){this.debugMode=t}_log(...t){this.debugMode&&console.log("[ToolOutputService]",...t)}},Bt=new ys,na=Bt});var Vr={};N(Vr,{EVENT_TYPES:()=>Zt,checkGate:()=>Tn,destroyToolTriggerManager:()=>ha,getChatContext:()=>fs,getCurrentCharacter:()=>_n,getFullContext:()=>pa,getToolTriggerManagerState:()=>xa,getWorldbookContent:()=>Wr,initToolTriggerManager:()=>Qr,initTriggerModule:()=>Jr,previewToolExtraction:()=>Cn,registerEventListener:()=>te,registerTriggerHandler:()=>ua,removeAllListeners:()=>la,removeAllTriggerHandlers:()=>fa,resetGateState:()=>ca,runToolManually:()=>Sn,setDebugMode:()=>va,setTriggerHandlerEnabled:()=>ga,triggerState:()=>A,unregisterEventListener:()=>gs,updateGateState:()=>xe});function Ct(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Hr(e){if(!e)return"";let t=[e.mes,e.message,e.content,e.text,e?.data?.content];for(let s of t)if(typeof s=="string"&&s.trim())return s;return""}function ps(){xe({lastUserSendIntentAt:Date.now()})}function ra(){let e=Ct(),t=e?.document;if(!t?.body)return!1;if(e.__YYT_sendIntentHooksInstalled)return!0;let s=["#send_but","#option_send","#send_button",'button[title*="\u53D1\u9001"]','button[title*="Send"]'],n=["#send_textarea","#send_textarea textarea","textarea#send_textarea",'textarea[data-testid="send_textarea"]'],r=(o,i,a)=>{o.forEach(c=>{let l=t.querySelector(c);l&&l.addEventListener(i,a,!0)})};return r(s,"click",()=>ps()),r(s,"pointerup",()=>ps()),r(s,"touchend",()=>ps()),r(n,"keydown",o=>{let i=o?.key||"";(i==="Enter"||i==="NumpadEnter")&&!o.shiftKey&&ps()}),e.__YYT_sendIntentHooksInstalled=!0,w("\u5DF2\u5B89\u88C5\u53D1\u9001\u610F\u56FE\u6355\u83B7\u94A9\u5B50"),!0}function oa(e,t={},s=!1){return s?!0:String(e||t?.type||"").trim().toLowerCase().includes("quiet")||t?.quiet===!0||t?.isQuiet===!0||t?.quiet_prompt===!0}function ee(){return Ct().SillyTavern||null}function ia(){return Ct().TavernHelper||null}function vn(){let t=Ct().SillyTavern;return t&&t.eventSource?t.eventSource:null}function wn(){let t=Ct().SillyTavern;return t&&t.eventTypes?t.eventTypes:Zt}function w(...e){A.debugMode&&console.log("[YouYouToolkit:Trigger]",...e)}function aa(e,t,s){let r=[t?.chatId,t?.chat_id,t?.chat_filename,t?.chatMetadata?.chatId,t?.chatMetadata?.chat_id,t?.chatMetadata?.file_name,t?.chatMetadata?.name,e?.chatId,e?.chat_id,e?.chat_filename].find(o=>typeof o=="string"&&o.trim());return r||(s?.id!==void 0&&s?.id!==null?`chat_char_${s.id}`:e?.this_chid!==void 0&&e?.this_chid!==null?`chat_char_${e.this_chid}`:"chat_default")}function te(e,t,s={}){if(!e||typeof t!="function")return w("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u51FD\u6570"),()=>{};let{once:n=!1,priority:r=0}=s,o=vn(),a=wn()[e]||e,c=async(...l)=>{try{if(s.gateCheck&&!await Tn(s.gateCheck)){w(`\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6: ${e}`);return}await t(...l),n&&gs(e,c)}catch(y){console.error("[YouYouToolkit:Trigger] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF:",y)}};if(A.listeners.has(e)||A.listeners.set(e,new Set),A.listeners.get(e).add(c),o&&typeof o.on=="function")o.on(a,c),w(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${e}`);else{let l=Ct();l.addEventListener&&(l.addEventListener(a,c),w(`\u5DF2\u6CE8\u518CDOM\u4E8B\u4EF6\u76D1\u542C\u5668: ${e}`))}return()=>gs(e,c)}function gs(e,t){let s=A.listeners.get(e);if(s&&s.has(t)){s.delete(t);let n=vn(),o=wn()[e]||e;if(n&&typeof n.off=="function")n.off(o,t),w(`\u5DF2\u53D6\u6D88\u4E8B\u4EF6\u76D1\u542C\u5668: ${e}`);else{let i=Ct();i.removeEventListener&&i.removeEventListener(o,t)}}}function la(){let e=vn(),t=wn();for(let[s,n]of A.listeners){let r=t[s]||s;for(let o of n)if(e&&typeof e.off=="function")e.off(r,o);else{let i=Ct();i.removeEventListener&&i.removeEventListener(r,o)}}A.listeners.clear(),w("\u5DF2\u79FB\u9664\u6240\u6709\u4E8B\u4EF6\u76D1\u542C\u5668")}async function Tn(e){if(!e)return!0;let t=Date.now(),s=A.gateState;if(e.minInterval&&s.lastGenerationAt&&t-s.lastGenerationAt<e.minInterval)return w("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u77ED"),!1;if(e.maxInterval&&s.lastUserMessageAt&&t-s.lastUserMessageAt>e.maxInterval)return w("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u957F"),!1;if(e.requireUserMessage&&!s.lastUserMessageId)return w("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u7F3A\u5C11\u7528\u6237\u6D88\u606F"),!1;if(e.excludeQuietGeneration&&s.lastGenerationType==="quiet")return w("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: quiet\u751F\u6210\u88AB\u6392\u9664"),!1;if(e.customCheck&&typeof e.customCheck=="function")try{if(!await e.customCheck(s))return w("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u81EA\u5B9A\u4E49\u68C0\u67E5\u8FD4\u56DEfalse"),!1}catch(n){return console.error("[YouYouToolkit:Trigger] \u81EA\u5B9A\u4E49\u95E8\u63A7\u68C0\u67E5\u9519\u8BEF:",n),!1}return!0}function xe(e){Object.assign(A.gateState,e)}function ca(){A.gateState={lastUserSendIntentAt:0,lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationType:null,lastGenerationParams:null,lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1}}async function fs(e={}){let{depth:t=3,includeUser:s=!0,includeAssistant:n=!0,includeSystem:r=!1,format:o="messages"}=e;if(!ee())return w("\u65E0\u6CD5\u83B7\u53D6SillyTavern API"),null;try{let a=await ya(),c=[],l=Math.max(0,a.length-t);for(let y=l;y<a.length;y++){let u=a[y];if(!u)continue;let g=da(u);if(!(g==="user"&&!s)&&!(g==="system"&&!r)&&!(g==="assistant"&&!n))if(o==="messages"){let f=Hr(u);c.push({role:g,content:f,name:u.name||"",timestamp:u.send_date||u.timestamp,isSystem:!!u.is_system,isUser:!!u.is_user})}else c.push(Hr(u))}return{messages:c,totalMessages:a.length,startIndex:l,endIndex:a.length-1}}catch(a){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u804A\u5929\u4E0A\u4E0B\u6587\u5931\u8D25:",a),null}}function da(e){if(!e)return"assistant";if(e.is_user)return"user";if(e.is_system)return"system";let t=String(e.role||"").toLowerCase();return t==="user"||t==="assistant"||t==="system"?t:"assistant"}async function ya(){let e=ia(),t=ee();if(e?.getChatMessages)try{let s=-1;if(typeof e.getLastMessageId=="function"&&(s=e.getLastMessageId()),!Number.isFinite(s)||s<0){let n=t?.getContext?.()||null,r=Array.isArray(n?.chat)?n.chat:[],o=Array.isArray(t?.chat)?t.chat:[];s=(r.length?r:o).length-1}if(Number.isFinite(s)&&s>=0){let n=await e.getChatMessages(`0-${s}`,{include_swipes:!1,include_hidden:!0});if(Array.isArray(n)&&n.length>0)return n}}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 TavernHelper \u8BFB\u53D6\u804A\u5929\u6D88\u606F\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u9ED8\u8BA4\u6765\u6E90:",s)}try{let s=t?.getContext?.()||null;if(Array.isArray(s?.chat)&&s.chat.length>0)return s.chat}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 getContext() \u8BFB\u53D6\u804A\u5929\u5931\u8D25:",s)}return Array.isArray(t?.chat)?t.chat:[]}async function _n(){let e=ee();if(!e)return null;try{let t=e.this_chid,s=e.characters||[];if(t>=0&&t<s.length){let n=s[t];return{id:t,name:n.name||"",description:n.description||"",personality:n.personality||"",scenario:n.scenario||"",firstMes:n.first_mes||"",mesExample:n.mes_example||""}}return null}catch(t){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",t),null}}async function Wr(e={}){let{enabledOnly:t=!0,maxLength:s=1e4}=e,n=ee();if(!n)return"";try{let o=(n.lorebook||[]).entries||[],i=[],a=0;for(let c of o){if(t&&!c.enabled)continue;let l=c.content||"";l&&a+l.length<=s&&(i.push(l),a+=l.length)}return i.join(`

`)}catch(r){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u5931\u8D25:",r),""}}async function pa(e={}){let[t,s,n]=await Promise.all([fs(e.chat||{}),_n(),Wr(e.worldbook||{})]);return{chat:t,character:s,worldbook:n,timestamp:Date.now()}}function ua(e,t){if(!e||!t)return w("\u65E0\u6548\u7684\u5904\u7406\u5668ID\u6216\u914D\u7F6E"),()=>{};let{eventType:s,handler:n,gateCondition:r,priority:o=0}=t;if(!s||typeof n!="function")return w("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u5904\u7406\u5668\u51FD\u6570"),()=>{};A.handlers.set(e,{eventType:s,handler:n,gateCondition:r,priority:o,enabled:!0});let i=te(s,async(...a)=>{let c=A.handlers.get(e);!c||!c.enabled||c.gateCondition&&!await Tn(c.gateCondition)||await c.handler(...a)},{priority:o});return w(`\u5DF2\u6CE8\u518C\u89E6\u53D1\u5904\u7406\u5668: ${e}`),()=>{i(),A.handlers.delete(e),w(`\u5DF2\u53D6\u6D88\u89E6\u53D1\u5904\u7406\u5668: ${e}`)}}function ga(e,t){let s=A.handlers.get(e);s&&(s.enabled=t,w(`\u89E6\u53D1\u5904\u7406\u5668 ${e} \u5DF2${t?"\u542F\u7528":"\u7981\u7528"}`))}function fa(){A.handlers.clear(),w("\u5DF2\u79FB\u9664\u6240\u6709\u89E6\u53D1\u5904\u7406\u5668")}function Qr(){if(et.initialized){w("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316");return}ma(),et.initialized=!0,w("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316"),x.emit(h.TOOL_TRIGGER_INITIALIZED)}function ma(){let e=Zt.GENERATION_ENDED,t=te(e,async s=>{if(w("GENERATION_ENDED\u89E6\u53D1:",s),oa(A.gateState.lastGenerationType,A.gateState.lastGenerationParams,A.gateState.lastGenerationDryRun)){w("\u68C0\u6D4B\u5230 quiet / dryRun \u751F\u6210\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u81EA\u52A8\u6267\u884C");return}let n=await En(s);if(!n?.lastAiMessage){w("\u751F\u6210\u7ED3\u675F\u540E\u672A\u8BFB\u53D6\u5230\u6700\u65B0 AI \u56DE\u590D\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u6267\u884C");return}let r=ba(e);if(r.length===0){w("\u6CA1\u6709\u9700\u8981\u6267\u884C\u7684\u5DE5\u5177");return}w(`\u9700\u8981\u6267\u884C ${r.length} \u4E2A\u5DE5\u5177:`,r.map(o=>o.id)),nt("info",`\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u5F00\u59CB\u81EA\u52A8\u6267\u884C ${r.length} \u4E2A\u5DE5\u5177`,{duration:2400,noticeId:"yyt-tool-batch-start"});for(let o of r)try{let i=await qr(o,n);i.success?(w(`\u5DE5\u5177 ${o.id} \u6267\u884C\u6210\u529F`),x.emit(h.TOOL_EXECUTED,{toolId:o.id,result:i.result||i.data||i})):w(`\u5DE5\u5177 ${o.id} \u6267\u884C\u5931\u8D25:`,i.error)}catch(i){console.error(`[ToolTrigger] \u5DE5\u5177\u6267\u884C\u5931\u8D25: ${o.id}`,i)}et.lastExecutionContext=n});et.listeners.set(e,t)}async function En(e){let t=await fs({depth:50}),s=await _n(),n=ee(),r=n?.getContext?.()||null,o=typeof e=="string"||typeof e=="number"?e:e?.messageId||e?.id||"",i=t?.messages||[],a=i.filter(l=>l.role==="user").pop(),c=i.filter(l=>l.role==="assistant").pop();return{triggeredAt:Date.now(),triggerEvent:e?.triggerEvent||"GENERATION_ENDED",chatId:aa(n,r,s),messageId:o,lastAiMessage:c?.content||"",userMessage:a?.content||A.gateState.lastUserMessageText||"",chatMessages:i,input:{userMessage:a?.content||A.gateState.lastUserMessageText||"",lastAiMessage:c?.content||"",extractedContent:"",previousToolOutput:"",context:{character:s?.name||"",chatLength:t?.totalMessages||0}},config:{},status:"pending"}}function ba(e){return gn(e).filter(s=>Bt.shouldRunPostResponse(s))}function us(e,t){try{cn(e,t)}catch(s){console.warn("[ToolTrigger] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",e,s)}}async function qr(e,t){let s=Date.now(),n=e.id,r=t?.triggerEvent==="MANUAL",o=`yyt-tool-run-${n}`;us(n,{lastStatus:"running",lastError:"",lastDurationMs:0}),x.emit(h.TOOL_EXECUTION_REQUESTED,{toolId:n,triggerEvent:t?.triggerEvent||"GENERATION_ENDED",context:t}),nt("info",`${r?"\u6B63\u5728\u624B\u52A8\u6267\u884C":"\u5DF2\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u6B63\u5728\u81EA\u52A8\u6267\u884C"} ${e.name}`,{sticky:!0,noticeId:o});try{let i;e.output?.mode===zt.POST_RESPONSE_API?i=await Bt.runToolPostResponse(e,t):i=await rs(n,t);let a=Date.now()-s;if(i?.success){let y=D(n);us(n,{lastStatus:"success",lastError:"",lastDurationMs:a,successCount:(y?.runtime?.successCount||0)+1});let u=r?`${e.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`:`\u5DF2\u76D1\u542C AI \u56DE\u590D\u5E76\u6267\u884C ${e.name}`;return p("success",u),nt("success",u,{duration:3200,noticeId:o}),{success:!0,duration:a,result:i}}let c=D(n),l=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25";return us(n,{lastStatus:"error",lastError:l,lastDurationMs:a,errorCount:(c?.runtime?.errorCount||0)+1}),p("error",`${e.name} \u6267\u884C\u5931\u8D25\uFF1A${l}`),nt("error",`${e.name} \u6267\u884C\u5931\u8D25\uFF1A${l}`,{sticky:!0,noticeId:o}),{success:!1,duration:a,error:l,result:i}}catch(i){let a=Date.now()-s,c=D(n),l=i?.message||String(i);throw us(n,{lastStatus:"error",lastError:l,lastDurationMs:a,errorCount:(c?.runtime?.errorCount||0)+1}),p("error",`${e.name} \u6267\u884C\u5931\u8D25\uFF1A${l}`),nt("error",`${e.name} \u6267\u884C\u5931\u8D25\uFF1A${l}`,{sticky:!0,noticeId:o}),i}}async function Sn(e){if(!e)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let t=D(e);if(!t)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!t.enabled)return nt("warning",`${t.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${e}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};if(!Bt.shouldRunPostResponse(t))return nt("warning",`${t.name} \u5F53\u524D\u4E3A\u201C\u968F AI \u8F93\u51FA\u201D\uFF0C\u4E0D\u4F1A\u6267\u884C\u989D\u5916\u89E3\u6790`,{duration:3200,noticeId:`yyt-tool-run-${e}`}),{success:!1,error:"\u5F53\u524D\u8F93\u51FA\u6A21\u5F0F\u4E0D\u6267\u884C\u989D\u5916\u89E3\u6790"};let s=await En({triggerEvent:"MANUAL"});return qr(t,s)}async function Cn(e){if(!e)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let t=D(e);if(!t)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await En({triggerEvent:"MANUAL_PREVIEW"});return Bt.previewExtraction(t,s)}function ha(){for(let[e,t]of et.listeners)gs(e,t);et.listeners.clear(),et.initialized=!1,et.lastExecutionContext=null,w("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u9500\u6BC1")}function xa(){return{initialized:et.initialized,listenersCount:et.listeners.size,lastExecutionContext:et.lastExecutionContext}}async function Jr(){if(A.isInitialized){w("\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316");return}if(!ee()){w("\u65E0\u6CD5\u83B7\u53D6SillyTavern API\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),setTimeout(Jr,1e3);return}ra(),te(Zt.MESSAGE_SENT,async t=>{let n=(await fs({depth:10,includeAssistant:!1,includeSystem:!1}))?.messages?.filter(r=>r.role==="user").pop();xe({lastUserSendIntentAt:Date.now(),lastUserMessageId:t,lastUserMessageAt:Date.now(),lastUserMessageText:n?.content||A.gateState.lastUserMessageText||""}),w(`\u7528\u6237\u6D88\u606F\u5DF2\u53D1\u9001: ${t}`)}),te(Zt.GENERATION_STARTED,(t,s,n)=>{xe({lastGenerationType:t,lastGenerationParams:s||null,lastGenerationDryRun:!!n,isGenerating:!0}),w(`\u751F\u6210\u5F00\u59CB: ${t}`)}),te(Zt.GENERATION_ENDED,()=>{xe({lastGenerationAt:Date.now(),isGenerating:!1}),w("\u751F\u6210\u7ED3\u675F")}),Qr(),A.isInitialized=!0,w("\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function va(e){A.debugMode=e}var Zt,A,et,Pn=E(()=>{z();fe();fn();xn();rt();Zt={MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHARACTER_LOADED:"CHARACTER_LOADED",CHARACTER_DELETED:"CHARACTER_DELETED",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",WORLDBOOK_UPDATED:"WORLDBOOK_UPDATED",EXTENSIONS_LOADED:"EXTENSIONS_LOADED",SETTINGS_LOADED:"SETTINGS_LOADED"},A={listeners:new Map,handlers:new Map,gateState:{lastUserSendIntentAt:0,lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationType:null,lastGenerationParams:null,lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1},isInitialized:!1,debugMode:!1};et={initialized:!1,listeners:new Map,lastExecutionContext:null}});function ms(e){let{id:t,toolId:s,postResponseHint:n,extractionPlaceholder:r,previewDialogId:o,previewTitle:i="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",defaultInjectionOrder:a=1e4,lorebookLogTag:c="ToolConfigPanel"}=e;return{id:t,toolId:s,render(){let l=D(this.toolId);if(!l)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let y=this._getApiPresets(),u=this._getBypassPresets(),g=l.output?.mode||"follow_ai",f=l.bypass?.enabled||!1,T=l.bypass?.presetId||"",G=l.runtime?.lastStatus||"idle",J=l.runtime?.lastRunAt?new Date(l.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",st=l.runtime?.lastError||"",At=l.extraction||{},F=l.injection||{},ht=Array.isArray(At.selectors)?At.selectors.join(`
`):"",Ae=g==="post_response_api"?n:"\u968F AI \u8F93\u51FA\u5373\u4E0D\u542F\u7528\u989D\u5916\u5DE5\u5177\u94FE\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\u3002";return`
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
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${Ae}</div>
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
                ${y.map(tt=>`
                  <option value="${m(tt.name)}" ${tt.name===l.output?.apiPreset?"selected":""}>
                    ${m(tt.name)}
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
                ${u.map(tt=>`
                  <option value="${m(tt.id)}" ${tt.id===T?"selected":""}>
                    ${m(tt.name)}${tt.isDefault?" [\u9ED8\u8BA4]":""}
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
                <label>\u6700\u5927\u63D0\u53D6\u6D88\u606F\u6570</label>
                <input type="number" class="yyt-input" id="${d}-tool-max-messages" min="1" max="50" value="${Number(At.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${d}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${m(r)}">${m(ht)}</textarea>
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
                <input type="checkbox" id="${d}-tool-injection-enabled" ${F.enabled!==!1?"checked":""}>
                <span>\u6267\u884C\u540E\u5199\u5165\u4E16\u754C\u4E66</span>
              </label>
            </div>
            <div class="yyt-injection-fields ${F.enabled===!1?"yyt-hidden":""}">
              <div class="yyt-form-group">
                <label>\u76EE\u6807\u4E16\u754C\u4E66</label>
                <select class="yyt-select" id="${d}-tool-injection-target" data-current-value="${m(F.target||"__character__")}">
                  <option value="__character__">\u5F53\u524D\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66</option>
                </select>
              </div>
              <div class="yyt-form-row">
                <div class="yyt-form-group yyt-flex-1">
                  <label>\u6CE8\u5165\u4F4D\u7F6E</label>
                  <select class="yyt-select" id="${d}-tool-injection-position">
                    <option value="at_depth_as_system" ${F.position==="at_depth_as_system"?"selected":""}>\u7CFB\u7EDF\u6DF1\u5EA6</option>
                    <option value="before_char" ${F.position==="before_char"?"selected":""}>\u89D2\u8272\u5361\u524D</option>
                    <option value="after_char" ${F.position==="after_char"?"selected":""}>\u89D2\u8272\u5361\u540E</option>
                  </select>
                </div>
                <div class="yyt-form-group yyt-flex-1">
                  <label>Depth</label>
                  <input type="number" class="yyt-input" id="${d}-tool-injection-depth" value="${Number(F.depth)||4}">
                </div>
                <div class="yyt-form-group yyt-flex-1">
                  <label>Order</label>
                  <input type="number" class="yyt-input" id="${d}-tool-injection-order" value="${Number(F.order)||a}">
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
                  <span class="yyt-tool-runtime-badge yyt-status-${m(G)}">${m(G)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${m(J)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${l.runtime?.successCount||0} / ${l.runtime?.errorCount||0}</span>
                </div>
                ${st?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${m(st)}</span>
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
      `},_getApiPresets(){try{return Wt()||[]}catch{return[]}},_getBypassPresets(){try{return pn()||[]}catch{return[]}},_getFormData(l){let y=D(this.toolId),u=l.find(`#${d}-tool-output-mode`).val()||"follow_ai",g=l.find(`#${d}-tool-bypass-enabled`).is(":checked"),f=u==="post_response_api",T=(l.find(`#${d}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(J=>J.trim()).filter(Boolean),G=l.find(`#${d}-tool-injection-enabled`).is(":checked");return{enabled:!0,promptTemplate:l.find(`#${d}-tool-prompt-template`).val()||"",extractTags:T,trigger:{event:"GENERATION_ENDED",enabled:f},output:{mode:u,apiPreset:l.find(`#${d}-tool-api-preset`).val()||"",overwrite:!0,enabled:f},bypass:{enabled:g,presetId:g&&l.find(`#${d}-tool-bypass-preset`).val()||""},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(l.find(`#${d}-tool-max-messages`).val(),10)||5),selectors:T},injection:{enabled:G,target:l.find(`#${d}-tool-injection-target`).val()||"__character__",comment:y?.injection?.comment||`YouYouToolkit:${this.toolId}`,position:l.find(`#${d}-tool-injection-position`).val()||"at_depth_as_system",depth:parseInt(l.find(`#${d}-tool-injection-depth`).val(),10)||4,order:parseInt(l.find(`#${d}-tool-injection-order`).val(),10)||a}}},async _populateLorebookOptions(l){try{let y=l.find(`#${d}-tool-injection-target`).data("currentValue")||"__character__",u=await Ut.getAvailableLorebooks(),g=u.map(f=>`
          <option value="${m(f.value)}" ${f.value===y?"selected":""}>${m(f.label)}</option>
        `).join("");l.find(`#${d}-tool-injection-target`).html(g||'<option value="__character__">\u5F53\u524D\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66</option>'),u.some(f=>f.value===y)||l.find(`#${d}-tool-injection-target`).append(`<option value="${m(y)}" selected>${m(y)}</option>`)}catch(y){console.warn(`[${c}] \u52A0\u8F7D\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:`,y)}},_showExtractionPreview(l,y){if(!S())return;let g=`${d}-${o}`;l.append(nr({id:g,title:i,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${m((y.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\uFF08\u6700\u8FD1 ${y.maxMessages} \u6761\u89D2\u8272\u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${m(y.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
        <div class="yyt-form-group">
          <label>\u6B63\u6587\u89C4\u5219\u7B5B\u9009\u540E</label>
          <pre class="yyt-preview-box yyt-preview-pre">${m(y.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D\uFF0C\u56DE\u9000\u539F\u6587")}</pre>
        </div>
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u7ED3\u679C</label>
            <pre class="yyt-preview-box yyt-preview-pre">${m(y.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
        `})),rr(l,g,{onSave:f=>f()}),l.find(`#${g}-save`).text("\u5173\u95ED"),l.find(`#${g}-cancel`).remove()},bindEvents(l){let y=S();!y||!$(l)||(this._populateLorebookOptions(l),l.find(`#${d}-tool-output-mode`).on("change",()=>{let g=(l.find(`#${d}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?n:"\u968F AI \u8F93\u51FA\u5373\u4E0D\u542F\u7528\u989D\u5916\u5DE5\u5177\u94FE\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\u3002";l.find(".yyt-tool-mode-hint").text(g)}),l.find(`#${d}-tool-bypass-enabled`).on("change",u=>{let g=y(u.currentTarget).is(":checked");l.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!g)}),l.find(`#${d}-tool-injection-enabled`).on("change",u=>{let g=y(u.currentTarget).is(":checked");l.find(".yyt-injection-fields").toggleClass("yyt-hidden",!g)}),l.find(`#${d}-tool-save`).on("click",()=>{this._saveConfig(l,{silent:!1})}),l.find(`#${d}-tool-reset-template`).on("click",()=>{let g=es()[this.toolId];g?.promptTemplate&&(l.find(`#${d}-tool-prompt-template`).val(g.promptTemplate),p("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),l.find(`#${d}-tool-run-manual`).on("click",async()=>{if(this._saveConfig(l,{silent:!0}))try{let g=await Sn(this.toolId);!g?.success&&g?.error&&nt("warning",g.error,{duration:3200,noticeId:`yyt-tool-run-${this.toolId}`})}catch(g){p("error",g?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{this.renderTo(l)}}),l.find(`#${d}-tool-preview-extraction`).on("click",async()=>{if(this._saveConfig(l,{silent:!0}))try{let g=await Cn(this.toolId);if(!g?.success){p("error",g?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}this._showExtractionPreview(l,g)}catch(g){p("error",g?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}))},_saveConfig(l,y={}){let u=this._getFormData(l),{silent:g=!1}=y,f=ft(this.toolId,u);return f?g||p("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):p("error","\u4FDD\u5B58\u5931\u8D25"),f},destroy(l){!S()||!$(l)||l.find("*").off()},getStyles(){return wa},renderTo(l){l.html(this.render({})),this.bindEvents(l,{})}}}var wa,$n=E(()=>{rt();fe();ze();me();Pn();ls();wa=`
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
`});var Pt,An=E(()=>{$n();Pt=ms({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var Yt,kn=E(()=>{$n();Yt=ms({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var Kr={};N(Kr,{BypassPanel:()=>se,default:()=>Ta});var se,Ta,bs=E(()=>{z();me();rt();se={id:"bypassPanel",render(e){let t=v.getPresetList(),s=v.getDefaultPresetId();return`
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
            ${t.map(n=>this._renderPresetItem(n,n.id===s)).join("")}
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
    `},_renderPresetItem(e,t){let s=bt&&bt[e.id];return`
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
      `;let t=v.getDefaultPresetId()===e.id,s=bt&&bt[e.id];return`
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
          ${(e.messages||[]).map(n=>this._renderMessageItem(n)).join("")}
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
    `},bindEvents(e,t){let s=S();!s||!$(e)||(this._bindPresetListEvents(e,s),this._bindEditorEvents(e,s),this._bindFileEvents(e,s))},_bindPresetListEvents(e,t){e.on("click",".yyt-bypass-preset-item",s=>{if(t(s.target).closest(".yyt-bypass-quick-delete").length)return;let n=t(s.currentTarget).data("presetId");this._selectPreset(e,t,n)}),e.on("click",".yyt-bypass-quick-delete",s=>{s.stopPropagation();let n=t(s.currentTarget).data("presetId");if(!n||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=v.deletePreset(n);r.success?(e.find(".yyt-bypass-editor-content").data("presetId")===n&&e.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(e,t),p("success","\u9884\u8BBE\u5DF2\u5220\u9664")):p("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),e.find("#yyt-bypass-add").on("click",()=>{this._createNewPreset(e,t)})},_bindEditorEvents(e,t){e.on("click","#yyt-bypass-save",()=>{this._saveCurrentPreset(e,t)}),e.on("click","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(e,t)}),e.on("click","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(e,t)}),e.on("click","#yyt-bypass-set-default",()=>{this._setAsDefault(e,t)}),e.on("click","#yyt-bypass-add-message",()=>{this._addMessage(e,t)}),e.on("click",".yyt-bypass-delete-message",s=>{let n=t(s.currentTarget).closest(".yyt-bypass-message"),r=n.data("messageId");n.remove()}),e.on("change",".yyt-bypass-message-enabled",s=>{t(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!t(s.currentTarget).is(":checked"))})},_bindFileEvents(e,t){e.find("#yyt-bypass-import").on("click",()=>{e.find("#yyt-bypass-import-file").click()}),e.find("#yyt-bypass-import-file").on("change",async s=>{let n=s.target.files[0];if(n){try{let r=await _t(n),o=v.importPresets(r);p(o.success?"success":"error",o.message),o.success&&this.renderTo(e)}catch(r){p("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}t(s.target).val("")}}),e.find("#yyt-bypass-export").on("click",()=>{try{let s=v.exportPresets();Tt(s,`bypass_presets_${Date.now()}.json`),p("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){p("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(e,t,s){let n=v.getPreset(s);n&&(e.find(".yyt-bypass-preset-item").removeClass("yyt-active"),e.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),e.find("#yyt-bypass-editor").html(this._renderEditor(n)))},_createNewPreset(e,t){let s=`bypass_${Date.now()}`,n=v.createPreset({id:s,name:"\u65B0\u7834\u9650\u8BCD\u9884\u8BBE",description:"",messages:[]});n.success?(this.renderTo(e),this._selectPreset(e,t,s),p("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):p("error",n?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(e,t){let s=e.find(".yyt-bypass-editor-content"),n=s.data("presetId");if(!n)return;let r=s.find(".yyt-bypass-name-input").val().trim(),o=s.find("#yyt-bypass-description").val().trim();if(!r){p("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let i=[];s.find(".yyt-bypass-message").each(function(){let c=t(this);i.push({id:c.data("messageId"),role:c.find(".yyt-bypass-role-select").val(),content:c.find(".yyt-bypass-message-content").val(),enabled:c.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let a=v.updatePreset(n,{name:r,description:o,messages:i});a.success?(p("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(e,t)):p("error",a?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(e,t){let n=e.find(".yyt-bypass-editor-content").data("presetId");if(!n||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=v.deletePreset(n);r.success?(this.renderTo(e),p("success","\u9884\u8BBE\u5DF2\u5220\u9664")):p("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(e,t){let n=e.find(".yyt-bypass-editor-content").data("presetId");if(!n)return;let r=`bypass_${Date.now()}`,o=v.duplicatePreset(n,r);o.success?(this.renderTo(e),this._selectPreset(e,t,r),p("success","\u9884\u8BBE\u5DF2\u590D\u5236")):p("error",o?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(e,t){let n=e.find(".yyt-bypass-editor-content").data("presetId");n&&(v.setDefaultPresetId(n),e.find(".yyt-bypass-preset-item").removeClass("yyt-default"),e.find(`.yyt-bypass-preset-item[data-preset-id="${n}"]`).addClass("yyt-default"),e.find(".yyt-bypass-default-badge").remove(),e.find(`.yyt-bypass-preset-item[data-preset-id="${n}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>'),p("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE"))},_addMessage(e,t){let s=e.find("#yyt-bypass-messages"),n={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};s.append(this._renderMessageItem(n))},_refreshPresetList(e,t){let s=v.getPresetList(),n=v.getDefaultPresetId();e.find(".yyt-bypass-preset-list").html(s.map(r=>this._renderPresetItem(r,r.id===n)).join(""))},destroy(e){!S()||!$(e)||e.find("*").off()},getStyles(){return`
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
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}},Ta=se});function hs(){q.register(dt.id,dt),q.register(pt.id,pt),q.register(ut.id,ut),q.register(Pt.id,Pt),q.register(Yt.id,Yt),q.register(se.id,se),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function Rn(e={}){q.init(e),hs(),q.injectStyles(),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}var Xr=E(()=>{Gs();Fs();Vs();rn();An();kn();bs();rt();Gs();Fs();Vs();rn();An();kn();bs()});var ao={};N(ao,{ApiPresetPanel:()=>dt,RegexExtractPanel:()=>pt,SCRIPT_ID:()=>d,StatusBlockPanel:()=>Yt,SummaryToolPanel:()=>Pt,ToolManagePanel:()=>ut,default:()=>_a,escapeHtml:()=>m,fillFormWithConfig:()=>qt,getCurrentTab:()=>oo,getFormApiConfig:()=>Dt,getJQuery:()=>S,getRegexStyles:()=>no,getStyles:()=>so,getToolStyles:()=>ro,initUI:()=>Rn,isContainerValid:()=>$,registerComponents:()=>hs,render:()=>Zr,renderRegex:()=>to,renderTool:()=>eo,setCurrentTab:()=>io,showToast:()=>p,uiManager:()=>q});function In(e,t){let s=S();return s?e?typeof e=="string"?s(e):e?.jquery?e:s(e):t:(console.error("[YouYouToolkit] jQuery not available"),null)}function Zr(e){if(ve=In(e,ve),!ve||!ve.length){console.error("[YouYouToolkit] Container not found or invalid");return}dt.renderTo(ve)}function to(e){if(we=In(e,we),!we||!we.length){console.error("[YouYouToolkit] Regex container not found");return}pt.renderTo(we)}function eo(e){if(Te=In(e,Te),!Te||!Te.length){console.error("[YouYouToolkit] Tool container not found");return}ut.renderTo(Te)}function so(){return dt.getStyles()}function no(){return pt.getStyles()}function ro(){return[ut.getStyles(),Pt.getStyles()].join(`
`)}function oo(){return q.getCurrentTab()}function io(e){q.switchTab(e)}var ve,we,Te,_a,lo=E(()=>{Xr();ve=null,we=null,Te=null;_a={render:Zr,renderRegex:to,renderTool:eo,getStyles:so,getRegexStyles:no,getToolStyles:ro,getCurrentTab:oo,setCurrentTab:io,uiManager:q,ApiPresetPanel:dt,RegexExtractPanel:pt,ToolManagePanel:ut,SummaryToolPanel:Pt,StatusBlockPanel:Yt,registerComponents:hs,initUI:Rn,SCRIPT_ID:d,escapeHtml:m,showToast:p,getJQuery:S,isContainerValid:$,getFormApiConfig:Dt,fillFormWithConfig:qt}});var yo={};N(yo,{WindowManager:()=>xs,closeWindow:()=>Pa,createWindow:()=>Ca,windowManager:()=>X});function Sa(){if(X.stylesInjected)return;X.stylesInjected=!0;let e=`
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
  `,t=document.createElement("style");t.id=Ea+"_styles",t.textContent=e,(document.head||document.documentElement).appendChild(t)}function Ca(e){let{id:t,title:s="\u7A97\u53E3",content:n="",width:r=900,height:o=700,modal:i=!1,resizable:a=!0,maximizable:c=!0,startMaximized:l=!1,rememberState:y=!0,onClose:u,onReady:g}=e;Sa();let f=window.jQuery||window.parent?.jQuery;if(!f)return console.error("[WindowManager] jQuery not available"),null;if(X.isOpen(t))return X.bringToFront(t),X.getWindow(t);let T=window.innerWidth||1200,G=window.innerHeight||800,J=T<=1100,st=null,At=!1;y&&(st=X.getState(t),st&&!J&&(At=!0));let F,ht;At&&st.width&&st.height?(F=Math.max(400,Math.min(st.width,T-40)),ht=Math.max(300,Math.min(st.height,G-40))):(F=Math.max(400,Math.min(r,T-40)),ht=Math.max(300,Math.min(o,G-40)));let Ae=Math.max(20,Math.min((T-F)/2,T-F-20)),tt=Math.max(20,Math.min((G-ht)/2,G-ht-20)),Oo=c&&!J,Lo=`
    <div class="yyt-window" id="${t}" style="left:${Ae}px; top:${tt}px; width:${F}px; height:${ht}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${$a(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${Oo?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
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
  `,kt=null;i&&(kt=f(`<div class="yyt-window-overlay" data-for="${t}"></div>`),f(document.body).append(kt));let _=f(Lo);f(document.body).append(_),X.register(t,_),_.on("mousedown",()=>X.bringToFront(t));let xt=!1,Rt={left:Ae,top:tt,width:F,height:ht},ke=()=>{Rt={left:parseInt(_.css("left")),top:parseInt(_.css("top")),width:_.width(),height:_.height()},_.addClass("maximized"),_.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),xt=!0},No=()=>{_.removeClass("maximized"),_.css({left:Rt.left+"px",top:Rt.top+"px",width:Rt.width+"px",height:Rt.height+"px"}),_.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),xt=!1};_.find(".yyt-window-btn.maximize").on("click",()=>{xt?No():ke()}),(J&&c||At&&st.isMaximized&&c||l&&c)&&ke(),_.find(".yyt-window-btn.close").on("click",()=>{if(y&&c){let H={width:xt?Rt.width:_.width(),height:xt?Rt.height:_.height(),isMaximized:xt};X.saveState(t,H)}u&&u(),kt&&kt.remove(),_.remove(),X.unregister(t),f(document).off(".yytWindowDrag"+t),f(document).off(".yytWindowResize"+t)}),kt&&kt.on("click",H=>{H.target,kt[0]});let Re=!1,Bn,Yn,Gn,Fn;if(_.find(".yyt-window-header").on("mousedown",H=>{f(H.target).closest(".yyt-window-controls").length||xt||(Re=!0,Bn=H.clientX,Yn=H.clientY,Gn=parseInt(_.css("left")),Fn=parseInt(_.css("top")),f(document.body).css("user-select","none"))}),f(document).on("mousemove.yytWindowDrag"+t,H=>{if(!Re)return;let W=H.clientX-Bn,Ie=H.clientY-Yn;_.css({left:Math.max(0,Gn+W)+"px",top:Math.max(0,Fn+Ie)+"px"})}),f(document).on("mouseup.yytWindowDrag"+t,()=>{Re&&(Re=!1,f(document.body).css("user-select",""))}),a){let H=!1,W="",Ie,Hn,Me,De,Ps,$s;_.find(".yyt-window-resize-handle").on("mousedown",function(Gt){xt||(H=!0,W="",f(this).hasClass("se")?W="se":f(this).hasClass("e")?W="e":f(this).hasClass("s")?W="s":f(this).hasClass("w")?W="w":f(this).hasClass("n")?W="n":f(this).hasClass("nw")?W="nw":f(this).hasClass("ne")?W="ne":f(this).hasClass("sw")&&(W="sw"),Ie=Gt.clientX,Hn=Gt.clientY,Me=_.width(),De=_.height(),Ps=parseInt(_.css("left")),$s=parseInt(_.css("top")),f(document.body).css("user-select","none"),Gt.stopPropagation())}),f(document).on("mousemove.yytWindowResize"+t,Gt=>{if(!H)return;let As=Gt.clientX-Ie,ks=Gt.clientY-Hn,Wn=400,Qn=300,Rs=Me,Is=De,qn=Ps,Jn=$s;if(W.includes("e")&&(Rs=Math.max(Wn,Me+As)),W.includes("s")&&(Is=Math.max(Qn,De+ks)),W.includes("w")){let oe=Me-As;oe>=Wn&&(Rs=oe,qn=Ps+As)}if(W.includes("n")){let oe=De-ks;oe>=Qn&&(Is=oe,Jn=$s+ks)}_.css({width:Rs+"px",height:Is+"px",left:qn+"px",top:Jn+"px"})}),f(document).on("mouseup.yytWindowResize"+t,()=>{H&&(H=!1,f(document.body).css("user-select",""))})}return _.on("remove",()=>{f(document).off(".yytWindowDrag"+t),f(document).off(".yytWindowResize"+t)}),g&&setTimeout(()=>g(_),50),_}function Pa(e){let t=X.getWindow(e);if(t){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${e}"]`).remove(),s(document).off(".yytWindowDrag"+e),s(document).off(".yytWindowResize"+e)),t.remove(),X.unregister(e)}}function $a(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}var Ea,co,xs,X,po=E(()=>{at();Ea="youyou_toolkit_window_manager",co="window_states",xs=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(t,s){this.topZIndex++,this.windows.set(t,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(t){this.windows.delete(t)}bringToFront(t){let s=this.windows.get(t);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(t){return this.windows.get(t)?.$el||null}isOpen(t){return this.windows.has(t)}closeAll(){this.windows.forEach((t,s)=>{t.$el&&t.$el.remove()}),this.windows.clear()}saveState(t,s){let n=this.loadStates();n[t]={...s,updatedAt:Date.now()},ie.set(co,n)}loadStates(){return ie.get(co)||{}}getState(t){return this.loadStates()[t]||null}},X=new xs});var uo={};N(uo,{DEFAULT_PROMPT_SEGMENTS:()=>vs,PromptEditor:()=>ws,default:()=>La,getPromptEditorStyles:()=>Ia,messagesToSegments:()=>Oa,segmentsToMessages:()=>Da,validatePromptSegments:()=>Ma});function Ia(){return`
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
  `}function Ma(e){let t=[];return Array.isArray(e)?(e.forEach((s,n)=>{s.id||t.push(`\u6BB5\u843D ${n+1} \u7F3A\u5C11ID`),s.role||t.push(`\u6BB5\u843D ${n+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(s.role)||t.push(`\u6BB5\u843D ${n+1} \u7684role\u503C\u65E0\u6548: ${s.role}`)}),{valid:t.length===0,errors:t}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function Da(e){return e.filter(t=>t.content&&t.content.trim()).map(t=>({role:t.role,content:t.content,deletable:t.deletable,mainSlot:t.mainSlot}))}function Oa(e){return Array.isArray(e)?e.map((t,s)=>({id:`segment_${s}_${Date.now()}`,type:t.role==="SYSTEM"?"system":t.role==="assistant"?"ai":"user",role:t.role,mainSlot:t.mainSlot||"",content:t.content||"",deletable:t.deletable!==!1,expanded:!0,isMain:t.mainSlot==="A"||t.isMain,isMain2:t.mainSlot==="B"||t.isMain2})):[...vs]}var Aa,ka,Ra,vs,ws,La,go=E(()=>{Aa="youyou_toolkit_prompt_editor",ka={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},Ra={system:"fa-server",ai:"fa-robot",user:"fa-user"},vs=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],ws=class{constructor(t={}){this.containerId=t.containerId||Aa,this.segments=t.segments||[...vs],this.onChange=t.onChange||null,this.editable=t.editable!==!1,this.showMainSlot=t.showMainSlot!==!1,this.$container=null,this.$=null}init(t){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=t,this.render(),this.bindEvents()}setSegments(t){this.segments=t&&Array.isArray(t)?[...t]:[...vs],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(t=>({...t,content:this.getSegmentContent(t.id)}))}getSegmentContent(t){return this.$container&&this.$container.find(`[data-segment-id="${t}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let t=`
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
    `;this.$container.html(t)}renderSegment(t){let s=ka[t.type]||t.type,n=Ra[t.type]||"fa-file",r=t.mainSlot==="A"||t.isMain,o=t.mainSlot==="B"||t.isMain2,i=r?"var(--yyt-accent, #7bb7ff)":o?"#ffb74d":"",a=this.showMainSlot&&t.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${t.mainSlot}</span>`:"",c=`<span class="yyt-prompt-role-badge">role: ${t.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${t.expanded?"yyt-expanded":""} ${r?"yyt-main-a":""} ${o?"yyt-main-b":""}" 
           data-segment-id="${t.id}" 
           data-segment-type="${t.type}"
           style="${i?`border-left: 3px solid ${i};`:""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${n}"></i>
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
    `}bindEvents(){this.$container&&(this.$container.find(".yyt-prompt-toggle").on("click",t=>{this.$(t.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(t.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.find(".yyt-prompt-delete").on("click",t=>{let s=this.$(t.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.find(".yyt-prompt-role").on("change",t=>{let s=this.$(t.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(t.currentTarget).val();this.updateSegmentMeta(s,{role:n})}),this.$container.find(".yyt-prompt-main-slot").on("change",t=>{let s=this.$(t.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(t.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:n})}),this.$container.find(".yyt-prompt-textarea").on("input",t=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.find(`#${this.containerId}-add-segment`).on("click",()=>{this.addSegment()}),this.$container.find(`#${this.containerId}-import-prompt`).on("click",()=>{this.importPrompt()}),this.$container.find(`#${this.containerId}-export-prompt`).on("click",()=>{this.exportPrompt()}))}addSegment(t=null){let s=`segment_${Date.now()}`,n=t||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};n.id||(n.id=s),this.segments.push(n),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(t){let s=this.segments.findIndex(r=>r.id===t);if(s===-1)return;if(this.segments[s].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(t,s){let n=this.segments.find(r=>r.id===t);n&&(Object.assign(n,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let t=document.createElement("input");t.type="file",t.accept=".json",t.onchange=s=>{let n=s.target.files[0];if(!n)return;let r=new FileReader;r.onload=o=>{try{let i=JSON.parse(o.target.result);Array.isArray(i)?(this.setSegments(i),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(i){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",i)}},r.readAsText(n)},t.click()}exportPrompt(){let t=this.getSegments(),s=JSON.stringify(t,null,2),n=new Blob([s],{type:"application/json"}),r=URL.createObjectURL(n),o=document.createElement("a");o.href=r,o.download=`prompt_group_${Date.now()}.json`,o.click(),URL.revokeObjectURL(r),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}escapeHtml(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}};La=ws});var bo={};N(bo,{BUILTIN_VARIABLES:()=>fo,VariableResolver:()=>Ts,default:()=>Na,variableResolver:()=>mo});var fo,Ts,mo,Na,ho=E(()=>{z();fo={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"}},Ts=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(t,s){if(typeof t!="string")return t;let n=t;return n=this._resolveBuiltinVariables(n,s),n=this._resolveCustomVariables(n,s),n=this._resolveRegexVariables(n,s),n}resolveObject(t,s){if(!t||typeof t!="object")return t;if(Array.isArray(t))return t.map(r=>this.resolveObject(r,s));let n={};for(let[r,o]of Object.entries(t))typeof o=="string"?n[r]=this.resolveTemplate(o,s):typeof o=="object"&&o!==null?n[r]=this.resolveObject(o,s):n[r]=o;return n}buildToolContext(t){return{lastUserMessage:t.lastUserMessage||"",lastAiMessage:t.lastAiMessage||"",chatHistory:t.chatHistory||[],characterCard:t.characterCard||null,characterName:t.characterCard?.name||"",toolName:t.toolName||"",toolId:t.toolId||"",injectedContext:t.injectedContext||"",regexResults:t.regexResults||{},raw:t,timestamp:Date.now()}}registerVariable(t,s){t&&(this.customVariables.set(t,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${t}`))}unregisterVariable(t){this.customVariables.delete(t),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${t}`)}registerHandler(t,s){!t||typeof s!="function"||(this.variableHandlers.set(t,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${t}`))}getAvailableVariables(){let t=[];for(let[,s]of Object.entries(fo))t.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,n]of this.customVariables)t.push({name:`{{${s}}}`,description:typeof n=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return t}getVariableHelp(){let t=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},n={};for(let r of this.getAvailableVariables())n[r.category]||(n[r.category]=[]),n[r.category].push(r);for(let[r,o]of Object.entries(s))if(n[r]&&n[r].length>0){t.push(`\u3010${o}\u3011`);for(let i of n[r])t.push(`  ${i.name} - ${i.description}`);t.push("")}return t.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),t.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),t.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(t,s)=>(s.regexResults||s.raw?.regexResults||{})[t]||"")}_resolveBuiltinVariables(t,s){let n=t;return n=n.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),n=n.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),n=n.replace(/\{\{chatHistory\}\}/gi,()=>{let r=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(r)}),n=n.replace(/\{\{characterCard\}\}/gi,()=>{let r=s.characterCard||s.raw?.characterCard;return r?this._formatCharacterCard(r):""}),n=n.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),n=n.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),n}_resolveCustomVariables(t,s){let n=t;for(let[r,o]of this.customVariables){let i=new RegExp(`\\{\\{${this._escapeRegex(r)}\\}\\}`,"gi");typeof o=="function"?n=n.replace(i,()=>{try{return o(s)}catch(a){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}:`,a),""}}):n=n.replace(i,String(o))}return n}_resolveRegexVariables(t,s){let n=t;for(let[r,o]of this.variableHandlers){let i=new RegExp(`\\{\\{${r}\\.([^}]+)\\}\\}`,"gi");n=n.replace(i,(a,c)=>{try{return o(c,s)}catch(l){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}.${c}:`,l),""}})}return n}_formatChatHistory(t){return!Array.isArray(t)||t.length===0?"":t.map(s=>{let n=s.role||"unknown",r=s.content||s.mes||"";return`[${n}]: ${r}`}).join(`

`)}_formatCharacterCard(t){if(!t)return"";let s=[];return t.name&&s.push(`\u59D3\u540D: ${t.name}`),t.description&&s.push(`\u63CF\u8FF0: ${t.description}`),t.personality&&s.push(`\u6027\u683C: ${t.personality}`),t.scenario&&s.push(`\u573A\u666F: ${t.scenario}`),s.join(`

`)}_escapeRegex(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...t){this.debugMode&&console.log("[VariableResolver]",...t)}},mo=new Ts,Na=mo});var Dn={};N(Dn,{SettingsPanel:()=>vo,THEME_CONFIGS:()=>Mn,applyTheme:()=>xo,default:()=>ja});function xo(e){let t=document.documentElement,s=Mn[e]||Mn["dark-blue"];Object.entries(s).forEach(([n,r])=>{t.style.setProperty(n,r)}),t.setAttribute("data-yyt-theme",e),e==="light"?t.style.setProperty("--yyt-text","rgba(15, 23, 42, 0.95)"):t.style.setProperty("--yyt-text","rgba(255, 255, 255, 0.95)")}var Mn,vo,ja,On=E(()=>{z();is();rt();Mn={"dark-blue":{"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.7)","--yyt-text-muted":"rgba(15, 23, 42, 0.45)","--yyt-surface":"rgba(0, 0, 0, 0.03)","--yyt-surface-hover":"rgba(0, 0, 0, 0.06)","--yyt-surface-active":"rgba(0, 0, 0, 0.08)","--yyt-border":"rgba(0, 0, 0, 0.08)","--yyt-border-strong":"rgba(0, 0, 0, 0.15)"}};vo={id:"settingsPanel",render(e){let t=St.getSettings();return`
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
    `},bindEvents(e,t){let s=S();!s||!$(e)||(e.find(".yyt-settings-tab").on("click",n=>{let r=s(n.currentTarget).data("tab");e.find(".yyt-settings-tab").removeClass("yyt-active"),s(n.currentTarget).addClass("yyt-active"),e.find(".yyt-settings-tab-content").removeClass("yyt-active"),e.find(`.yyt-settings-tab-content[data-tab="${r}"]`).addClass("yyt-active")}),e.find("#yyt-settings-save").on("click",()=>{this._saveSettings(e,s)}),e.find("#yyt-settings-reset").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(St.resetSettings(),this.renderTo(e),p("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}))},_saveSettings(e,t){let s={executor:{maxConcurrent:parseInt(e.find("#yyt-setting-maxConcurrent").val())||3,maxRetries:parseInt(e.find("#yyt-setting-maxRetries").val())||2,retryDelayMs:parseInt(e.find("#yyt-setting-retryDelayMs").val())||5e3,requestTimeoutMs:parseInt(e.find("#yyt-setting-requestTimeoutMs").val())||9e4,queueStrategy:e.find("#yyt-setting-queueStrategy").val()||"fifo"},listener:{listenGenerationEnded:e.find("#yyt-setting-listenGenerationEnded").is(":checked"),ignoreQuietGeneration:e.find("#yyt-setting-ignoreQuietGeneration").is(":checked"),ignoreAutoTrigger:e.find("#yyt-setting-ignoreAutoTrigger").is(":checked"),debounceMs:parseInt(e.find("#yyt-setting-debounceMs").val())||300},debug:{enableDebugLog:e.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:e.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:e.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:e.find("#yyt-setting-theme").val()||"dark-blue",compactMode:e.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:e.find("#yyt-setting-animationEnabled").is(":checked")}};St.saveSettings(s),xo(s.ui.theme),document.documentElement.classList.toggle("yyt-compact-mode",s.ui.compactMode),document.documentElement.classList.toggle("yyt-no-animation",!s.ui.animationEnabled),p("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},destroy(e){!S()||!$(e)||e.find("*").off()},getStyles(){return`
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
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}},ja=vo});var L="youyou_toolkit",jn="0.6.2",_e=`${L}-menu-item`,Ln=`${L}-menu-container`,Ua=`${L}-popup`,O=typeof window.parent<"u"?window.parent:window,_s=null,it=null,Ee=null,Y=null,To=null,Cs=null,_o=null,Se=null,Ce=null,Z=null,K=null,Pe=null,Eo=null,So=null,Co=null,Po=null,Es=null;async function ne(){try{return _s=await Promise.resolve().then(()=>(le(),Zn)),it=await Promise.resolve().then(()=>(Os(),er)),Ee=await Promise.resolve().then(()=>(ze(),sr)),Y=await Promise.resolve().then(()=>(lo(),ao)),To=await Promise.resolve().then(()=>(Ke(),mr)),Cs=await Promise.resolve().then(()=>(nn(),br)),_o=await Promise.resolve().then(()=>(fn(),jr)),Se=await Promise.resolve().then(()=>(Pn(),Vr)),Ce=await Promise.resolve().then(()=>(po(),yo)),Z=await Promise.resolve().then(()=>(fe(),Mr)),K=await Promise.resolve().then(()=>(go(),uo)),Pe=await Promise.resolve().then(()=>(is(),Ur)),Eo=await Promise.resolve().then(()=>(me(),Dr)),So=await Promise.resolve().then(()=>(ho(),bo)),Co=await Promise.resolve().then(()=>(ls(),Br)),Po=await Promise.resolve().then(()=>(hn(),Gr)),Es=await Promise.resolve().then(()=>(xn(),Fr)),Es?.toolOutputService&&it&&Es.toolOutputService.setApiConnection(it),!0}catch(e){return console.warn(`[${L}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,e),!1}}function j(...e){console.log(`[${L}]`,...e)}function $o(...e){console.error(`[${L}]`,...e)}function wo(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}async function za(){let e=`${L}-styles`,t=O.document||document;if(t.getElementById(e))return;let s="";try{let r=await fetch("./styles/main.css");r.ok&&(s=await r.text())}catch{j("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F")}s||(s=Ba());let n=t.createElement("style");n.id=e,n.textContent=s,(t.head||t.documentElement).appendChild(n),j("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function Ba(){return`
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
    #${Ln} { display: flex; align-items: center; }
    
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
  `}var C=null,$t=null,re="apiPresets",Un={};function Ss(){C&&(C.remove(),C=null),$t&&($t.remove(),$t=null),j("\u5F39\u7A97\u5DF2\u5173\u95ED")}function Ao(e){re=e;let t=O.jQuery||window.jQuery;if(!t||!C)return;t(C).find(".yyt-main-nav-item").removeClass("active"),t(C).find(`.yyt-main-nav-item[data-tab="${e}"]`).addClass("active");let s=Z?.getToolConfig(e);s?.hasSubTabs?(t(C).find(".yyt-sub-nav").show(),Ro(e,s.subTabs)):t(C).find(".yyt-sub-nav").hide(),t(C).find(".yyt-tab-content").removeClass("active"),t(C).find(`.yyt-tab-content[data-tab="${e}"]`).addClass("active"),Io(e)}function ko(e,t){Un[e]=t;let s=O.jQuery||window.jQuery;!s||!C||(s(C).find(".yyt-sub-nav-item").removeClass("active"),s(C).find(`.yyt-sub-nav-item[data-subtab="${t}"]`).addClass("active"),zn(e,t))}function Ro(e,t){let s=O.jQuery||window.jQuery;if(!s||!C||!t)return;let n=Un[e]||t[0]?.id,r=t.map(o=>`
    <div class="yyt-sub-nav-item ${o.id===n?"active":""}" data-subtab="${o.id}">
      <i class="fa-solid ${o.icon||"fa-file"}"></i>
      <span>${o.name}</span>
    </div>
  `).join("");s(C).find(".yyt-sub-nav").html(r),s(C).find(".yyt-sub-nav-item").on("click",function(){let o=s(this).data("subtab");ko(e,o)})}async function Io(e){let t=O.jQuery||window.jQuery;if(!t||!C)return;let s=t(C).find(`.yyt-tab-content[data-tab="${e}"]`);if(!s.length)return;let n=Z?.getToolConfig(e);switch(e){case"apiPresets":Y&&Y.render(s);break;case"regexExtract":Y&&Y.renderRegex(s);break;case"tools":if(n?.hasSubTabs&&n.subTabs?.length>0){let r=n.subTabs[0].id;zn(e,r)}else s.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":await Ya(s);break;case"settings":await Ga(s);break;default:Fa(e,s);break}}async function Ya(e){if(O.jQuery||window.jQuery)try{let{BypassPanel:s}=await Promise.resolve().then(()=>(bs(),Kr)),n=`${L}-bypass-styles`,r=O.document||document;if(!r.getElementById(n)&&s.getStyles){let o=r.createElement("style");o.id=n,o.textContent=s.getStyles(),(r.head||r.documentElement).appendChild(o)}s.renderTo(e)}catch(s){console.error(`[${L}] \u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,s),e.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}async function Ga(e){if(O.jQuery||window.jQuery)try{let{SettingsPanel:s}=await Promise.resolve().then(()=>(On(),Dn)),n=`${L}-settings-styles`,r=O.document||document;if(!r.getElementById(n)&&s.getStyles){let o=r.createElement("style");o.id=n,o.textContent=s.getStyles(),(r.head||r.documentElement).appendChild(o)}s.renderTo(e)}catch(s){console.error(`[${L}] \u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,s),e.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function zn(e,t){let s=O.jQuery||window.jQuery;if(!s||!C)return;let n=s(C).find(`.yyt-tab-content[data-tab="${e}"]`);if(!n.length)return;let r=Z?.getToolConfig(e);if(r?.hasSubTabs){let i=r.subTabs?.find(a=>a.id===t);if(i){let a=n.find(".yyt-sub-content");switch(a.length||(n.html('<div class="yyt-sub-content"></div>'),a=n.find(".yyt-sub-content")),i.component){case"SummaryToolPanel":Y?.SummaryToolPanel?Y.SummaryToolPanel.renderTo(a):a.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"StatusBlockPanel":Y?.StatusBlockPanel?Y.StatusBlockPanel.renderTo(a):a.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:a.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}return}let o=n.find(".yyt-sub-content");if(o.length)switch(t){case"config":Ha(e,o);break;case"prompts":Wa(e,o);break;case"presets":Qa(e,o);break;default:o.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}function Fa(e,t){if(!(O.jQuery||window.jQuery))return;let n=Z?.getToolConfig(e);if(!n){t.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let r=Un[e]||n.subTabs?.[0]?.id||"config";t.html(`
    <div class="yyt-tool-window">
      <div class="yyt-sub-content" data-subtab="${r}">
        <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
      </div>
    </div>
  `),zn(e,r)}function Ha(e,t){if(!(O.jQuery||window.jQuery))return;let n=Cs?.getTool(e),r=Ee?.getAllPresets()||[],o=Z?.getToolApiPreset(e)||"",i=r.map(a=>`<option value="${wo(a.name)}" ${a.name===o?"selected":""}>${wo(a.name)}</option>`).join("");t.html(`
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
  `),t.find("#yyt-save-tool-preset").on("click",function(){let a=t.find("#yyt-tool-api-preset").val();Z?.setToolApiPreset(e,a);let c=O.toastr;c&&c.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}function Wa(e,t){if(!(O.jQuery||window.jQuery)||!K){t.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let r=Cs?.getTool(e)?.config?.messages||[],o=K.messagesToSegments?K.messagesToSegments(r):K.DEFAULT_PROMPT_SEGMENTS,i=new K.PromptEditor({containerId:`yyt-prompt-editor-${e}`,segments:o,onChange:c=>{let l=K.segmentsToMessages?K.segmentsToMessages(c):[];j("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",l.length,"\u6761\u6D88\u606F")}});t.html(`<div id="yyt-prompt-editor-${e}" class="yyt-prompt-editor-container"></div>`),i.init(t.find(`#yyt-prompt-editor-${e}`));let a=K.getPromptEditorStyles?K.getPromptEditorStyles():"";if(a){let c="yyt-prompt-editor-styles";if(!document.getElementById(c)){let l=document.createElement("style");l.id=c,l.textContent=a,document.head.appendChild(l)}}}function Qa(e,t){(O.jQuery||window.jQuery)&&t.html(`
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
  `)}function Mo(){if(C){j("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let e=O.jQuery||window.jQuery,t=O.document||document;if(!e){$o("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let s=Z?.getToolList()||[];$t=t.createElement("div"),$t.className="yyt-popup-overlay",$t.addEventListener("click",c=>{c.target===$t&&Ss()}),t.body.appendChild($t);let n=s.map(c=>`
    <div class="yyt-main-nav-item ${c.id===re?"active":""}" data-tab="${c.id}">
      <i class="fa-solid ${c.icon}"></i>
      <span>${c.name}</span>
    </div>
  `).join(""),r=s.map(c=>`
    <div class="yyt-tab-content ${c.id===re?"active":""}" data-tab="${c.id}">
      <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
    </div>
  `).join(""),o=`
    <div class="yyt-popup" id="${Ua}">
      <div class="yyt-popup-header">
        <div class="yyt-popup-title">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span>YouYou \u5DE5\u5177\u7BB1</span>
          <span style="font-size: 12px; opacity: 0.6;">v${jn}</span>
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
        <button class="yyt-btn yyt-btn-secondary" id="${L}-close-btn">\u5173\u95ED</button>
      </div>
    </div>
  `,i=t.createElement("div");i.innerHTML=o,C=i.firstElementChild,t.body.appendChild(C),e(C).find(".yyt-popup-close").on("click",Ss),e(C).find(`#${L}-close-btn`).on("click",Ss),e(C).find(".yyt-main-nav-item").on("click",function(){let c=e(this).data("tab");c&&Ao(c)}),Io(re);let a=Z?.getToolConfig(re);a?.hasSubTabs&&(e(C).find(".yyt-sub-nav").show(),Ro(re,a.subTabs)),j("\u5F39\u7A97\u5DF2\u6253\u5F00")}function $e(){let e=O.jQuery||window.jQuery;if(!e){$o("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout($e,1e3);return}let t=O.document||document,s=e("#extensionsMenu",t);if(!s.length){j("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout($e,2e3);return}if(e(`#${Ln}`,s).length>0){j("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let r=e(`<div class="extension_container interactable" id="${Ln}" tabindex="0"></div>`),o=`
    <div class="list-group-item flex-container flexGap5 interactable" id="${_e}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
      <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
      <span>YouYou \u5DE5\u5177\u7BB1</span>
    </div>
  `,i=e(o);i.on("click",async function(a){a.stopPropagation(),j("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let c=e("#extensionsMenuButton",t);c.length&&s.is(":visible")&&c.trigger("click"),Mo()}),r.append(i),s.append(r),j("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}var Nn={version:jn,id:L,init:Do,openPopup:Mo,closePopup:Ss,switchMainTab:Ao,switchSubTab:ko,addMenuItem:$e,getStorage:()=>_s,getApiConnection:()=>it,getPresetManager:()=>Ee,getUiComponents:()=>Y,getRegexExtractor:()=>To,getToolManager:()=>Cs,getToolExecutor:()=>_o,getToolTrigger:()=>Se,getWindowManager:()=>Ce,getToolRegistry:()=>Z,getPromptEditor:()=>K,getSettingsService:()=>Pe,getBypassManager:()=>Eo,getVariableResolver:()=>So,getContextInjector:()=>Co,getToolPromptService:()=>Po,getToolOutputService:()=>Es,async getApiConfig(){return await ne(),_s?_s.loadSettings().apiConfig:null},async saveApiConfig(e){return await ne(),it?(it.updateApiConfig(e),!0):!1},async getPresets(){return await ne(),Ee?Ee.getAllPresets():[]},async sendApiRequest(e,t){if(await ne(),it)return it.sendApiRequest(e,t);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await ne(),it?it.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(e,t){return Z?.registerTool(e,t)||!1},unregisterTool(e){return Z?.unregisterTool(e)||!1},getToolList(){return Z?.getToolList()||[]},createWindow(e){return Ce?.createWindow(e)||null},closeWindow(e){Ce?.closeWindow(e)}};async function Do(){if(j(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${jn}`),await za(),await ne()){if(j("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),Se&&Se.initTriggerModule)try{Se.initTriggerModule(),j("\u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316")}catch(n){console.error(`[${L}] \u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,n)}let s=O.document||document;if(Y){let n=`${L}-ui-styles`;if(!s.getElementById(n)){let i=s.createElement("style");i.id=n,i.textContent=Y.getStyles(),(s.head||s.documentElement).appendChild(i)}let r=`${L}-regex-styles`;if(!s.getElementById(r)&&Y.getRegexStyles){let i=s.createElement("style");i.id=r,i.textContent=Y.getRegexStyles(),(s.head||s.documentElement).appendChild(i)}let o=`${L}-tool-styles`;if(!s.getElementById(o)&&Y.getToolStyles){let i=s.createElement("style");i.id=o,i.textContent=Y.getToolStyles(),(s.head||s.documentElement).appendChild(i)}}if(Ce){let n=`${L}-window-styles`;s.getElementById(n)}if(K&&K.getPromptEditorStyles){let n=`${L}-prompt-styles`;if(!s.getElementById(n)){let r=s.createElement("style");r.id=n,r.textContent=K.getPromptEditorStyles(),(s.head||s.documentElement).appendChild(r)}}try{let{applyTheme:n}=await Promise.resolve().then(()=>(On(),Dn));if(Pe&&Pe.settingsService){let r=Pe.settingsService.getUiSettings();r&&r.theme&&(n(r.theme),j(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${r.theme}`),r.compactMode&&document.documentElement.classList.add("yyt-compact-mode"),r.animationEnabled||document.documentElement.classList.add("yyt-no-animation"))}}catch(n){j("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",n)}}else j("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let t=O.document||document;t.readyState==="loading"?t.addEventListener("DOMContentLoaded",()=>{setTimeout($e,1e3)}):setTimeout($e,1e3),j("\u521D\u59CB\u5316\u5B8C\u6210")}if(typeof window<"u"&&(window.YouYouToolkit=Nn,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=Nn}catch{}var jc=Nn;Do();j("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210");export{jc as default};
