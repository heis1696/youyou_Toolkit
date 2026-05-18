var Tm=Object.defineProperty;var D=(t,e)=>()=>(t&&(e=t(t=0)),e);var re=(t,e)=>{for(var r in e)Tm(t,r,{get:e[r],enumerable:!0})};var B,ci,K,Ye=D(()=>{B={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_RUNTIME_UPDATED:"tool:runtimeUpdated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},ci=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,r,s={}){if(!e||typeof r!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:n=0}=s;this.listeners.has(e)||this.listeners.set(e,new Set);let o={callback:r,priority:n};return this.listeners.get(e).add(o),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,r)}off(e,r){let s=this.listeners.get(e);if(s){for(let n of s)if(n.callback===r){s.delete(n);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,r){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,r),this._addToHistory(e,r);let s=this.listeners.get(e);if(!s||s.size===0)return;let n=Array.from(s).sort((o,a)=>a.priority-o.priority);for(let{callback:o}of n)try{o(r)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,r){let s=n=>{this.off(e,s),r(n)};return this.on(e,s)}wait(e,r=0){return new Promise((s,n)=>{let o=null,a=this.once(e,i=>{o&&clearTimeout(o),s(i)});r>0&&(o=setTimeout(()=>{a(),n(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},r))})}hasListeners(e){let r=this.listeners.get(e);return r&&r.size>0}listenerCount(e){let r=this.listeners.get(e);return r?r.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,r){this.history.push({event:e,data:r,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(r=>r.event===e):[...this.history]}clearHistory(){this.history=[]}},K=new ci});var rd={};re(rd,{LOG_LEVEL:()=>le,LoggerService:()=>Io,default:()=>Sm,logger:()=>I});var le,td,Io,I,Sm,W=D(()=>{Ye();le=Object.freeze({DEBUG:0,INFO:1,WARN:2,ERROR:3}),td=Object.freeze({[le.DEBUG]:"DEBUG",[le.INFO]:"INFO",[le.WARN]:"WARN",[le.ERROR]:"ERROR"}),Io=class{constructor(){this._entries=[],this._maxSize=2e3,this._nextId=1,this._minLevel=le.INFO,this._eventKey="logger:entry",this._statsEventKey="logger:statsChanged",this._pendingFlush=!1}_write(e,r,s,n){let o={id:this._nextId++,timestamp:Date.now(),level:e,scope:r,message:s,data:n};this._entries.push(o),this._entries.length>this._maxSize&&this._entries.shift(),this._forwardToConsole(o),this._pendingFlush||(this._pendingFlush=!0,queueMicrotask(()=>{this._pendingFlush=!1,this._emitEntry(o)}))}_forwardToConsole(e){let r=`[${e.scope}]`;switch(e.level){case le.DEBUG:console.debug(r,e.message,e.data??"");break;case le.INFO:console.log(r,e.message,e.data??"");break;case le.WARN:console.warn(r,e.message,e.data??"");break;case le.ERROR:console.error(r,e.message,e.data??"");break}}_emitEntry(e){try{K?.emit(this._eventKey,e)}catch{}}debug(e,r,s){le.DEBUG<this._minLevel||this._write(le.DEBUG,e,r,s)}info(e,r,s){le.INFO<this._minLevel||this._write(le.INFO,e,r,s)}log(e,r,s){this.info(e,r,s)}warn(e,r,s){le.WARN<this._minLevel||this._write(le.WARN,e,r,s)}error(e,r,s){le.ERROR<this._minLevel||this._write(le.ERROR,e,r,s)}createScope(e){return{debug:(r,s)=>this.debug(e,r,s),info:(r,s)=>this.info(e,r,s),log:(r,s)=>this.log(e,r,s),warn:(r,s)=>this.warn(e,r,s),error:(r,s)=>this.error(e,r,s)}}getEntries(e={}){let{level:r,scope:s,search:n,limit:o=500,offset:a=0}=e,i=this._entries;if(r!=null&&(i=i.filter(c=>c.level>=r)),s&&(i=i.filter(c=>c.scope===s)),n){let c=n.toLowerCase();i=i.filter(d=>d.scope.toLowerCase().includes(c)||d.message.toLowerCase().includes(c))}let l=i.length;return i=i.slice(a,a+o),{entries:i,total:l}}getStats(){let e={total:this._entries.length,byLevel:{DEBUG:0,INFO:0,WARN:0,ERROR:0},byScope:{}};for(let r of this._entries){let s=td[r.level]||"UNKNOWN";e.byLevel[s]=(e.byLevel[s]||0)+1,e.byScope[r.scope]=(e.byScope[r.scope]||0)+1}return e}setLevel(e){this._minLevel=e}getLevel(){return this._minLevel}setMaxSize(e){this._maxSize=Math.max(100,Math.min(1e4,e))}clear(){this._entries=[],this._nextId=1}levelLabel(e){return td[e]||"UNKNOWN"}},I=new Io,Sm=I});var sd={};re(sd,{StorageService:()=>rs,default:()=>Cm,getStorage:()=>_m,loadSettings:()=>Em,presetStorage:()=>Se,saveSettings:()=>Am,storage:()=>$,toolStorage:()=>he,windowStorage:()=>Mo});function _m(){let t=$;return t._getStorage(),t._storage}function Em(){return $.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function Am(t){$.set("settings",t)}var di,rs,$,he,Se,Mo,Cm,Be=D(()=>{W();di=I.createScope("StorageService"),rs=class t{constructor(e="youyou_toolkit"){this.namespaceKey=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext();if(r?.extensionSettings)return r.extensionSettings[this.namespaceKey]||(r.extensionSettings[this.namespaceKey]={}),this._storage={_target:r.extensionSettings[this.namespaceKey],getItem:s=>{let n=r.extensionSettings[this.namespaceKey][s];return typeof n=="string"?n:n?JSON.stringify(n):null},setItem:(s,n)=>{r.extensionSettings[this.namespaceKey][s]=n,this._saveSettings(r)},removeItem:s=>{delete r.extensionSettings[this.namespaceKey][s],this._saveSettings(r)},_isTavern:!0},this._storage}}catch{di.warn("SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage")}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,r)=>{try{localStorage.setItem(e,r)}catch(s){di.error("localStorage\u5199\u5165\u5931\u8D25:",s)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,r=null){let s=`${this.namespaceKey}:${e}`;if(this._cache.has(s))return this._cache.get(s);let n=this._getStorage(),o=this._getFullKey(e),a=n.getItem(o);if(a===null)return r;try{let i=JSON.parse(a);return this._cache.set(s,i),i}catch{return a}}set(e,r){let s=this._getStorage(),n=this._getFullKey(e),o=`${this.namespaceKey}:${e}`;this._cache.set(o,r);try{s.setItem(n,JSON.stringify(r))}catch(a){di.error("\u5B58\u50A8\u5931\u8D25:",a)}}remove(e){let r=this._getStorage(),s=this._getFullKey(e),n=`${this.namespaceKey}:${e}`;this._cache.delete(n),r.removeItem(s)}has(e){let r=this._getStorage(),s=this._getFullKey(e);return r.getItem(s)!==null}clear(){if(this._getStorage()._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let s=r.SillyTavern.getContext();s?.extensionSettings?.[this.namespaceKey]&&(s.extensionSettings[this.namespaceKey]={},this._saveSettings(s))}}else{let r=`${this.namespaceKey}_`,s=[];for(let n=0;n<localStorage.length;n++){let o=localStorage.key(n);o&&o.startsWith(r)&&s.push(o)}s.forEach(n=>localStorage.removeItem(n))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespaceKey}_${e}`}namespace(e){return new t(`${this.namespaceKey}:${e}`)}getMultiple(e){let r={};return e.forEach(s=>{r[s]=this.get(s)}),r}setMultiple(e){Object.entries(e).forEach(([r,s])=>{this.set(r,s)})}exportAll(){let e=this._getStorage(),r={};if(e._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let o=s.SillyTavern.getContext()?.extensionSettings?.[this.namespaceKey]||{};Object.entries(o).forEach(([a,i])=>{r[a]=typeof i=="string"?JSON.parse(i):i})}}else{let s=`${this.namespaceKey}_`;for(let n=0;n<localStorage.length;n++){let o=localStorage.key(n);if(o&&o.startsWith(s)){let a=o.slice(s.length);try{r[a]=JSON.parse(localStorage.getItem(o))}catch{r[a]=localStorage.getItem(o)}}}}return r}},$=new rs("youyou_toolkit"),he=new rs("youyou_toolkit:tools"),Se=new rs("youyou_toolkit:presets"),Mo=new rs("youyou_toolkit:windows");Cm=$});var ld={};re(ld,{API_STATUS:()=>Dm,fetchAvailableModels:()=>Fm,getApiConfig:()=>zs,getEffectiveApiConfig:()=>Rn,hasEffectiveApiPreset:()=>Pn,sendApiRequest:()=>Nn,sendWithPreset:()=>yi,testApiConnection:()=>jm,updateApiConfig:()=>Lm,validateApiConfig:()=>Ro});function Rm(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function pi(){return $.get(nd,Rm())}function Pm(t){$.set(nd,t)}function od(){return $.get(Im,[])}function Nm(){return $.get(Mm,"")}function ui(t,e={}){let r=new Error(t);return r.allowDirectFallback=e.allowDirectFallback===!0,r}function ad(t,e="chat_completions"){let r=String(t||"").trim();if(!r)return"";let s=null;try{s=new URL(r)}catch{return r}let n=s.pathname.replace(/\/+$/,""),o=n;return e==="chat_completions"?!/\/chat\/completions$/i.test(n)&&!/\/completions$/i.test(n)&&(o=`${n||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(n)?o=n.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(n)?o=n.replace(/\/completions$/i,"/models"):/\/models$/i.test(n)||(o=`${n||""}/models`)),s.pathname=o.replace(/\/+/g,"/"),s.toString()}function $m(t){let e=String(t||"").trim();if(!e)return"";try{let r=new URL(e);return r.pathname=r.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",r.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function zs(){return pi().apiConfig||{}}function Lm(t){let e=pi();e.apiConfig={...e.apiConfig,...t},Pm(e)}function Ro(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function Rn(t=""){let e=pi(),r=t||Nm()||"";if(r){let n=od().find(o=>o.name===r);if(n&&n.apiConfig)return{...n.apiConfig,presetName:n.name}}return e.apiConfig||{}}function Pn(t=""){return t?od().some(r=>r?.name===t):!1}async function yi(t,e,r={},s=null){let n=Rn(t);return await Nn(e,{...r,apiConfig:n},s)}function id(t,e={}){let r=e.apiConfig||zs();return{messages:t,model:r.model||"gpt-3.5-turbo",max_tokens:r.max_tokens||4096,temperature:r.temperature??.7,top_p:r.top_p??.9,stream:r.stream??!1,...e.extraParams}}function fi(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function Nn(t,e={},r=null){let s=e.apiConfig||zs(),n=s.useMainApi,o=Ro(s);if(!o.valid&&!n)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${o.errors.join(", ")}`);return n?await Om(t,e,r):await Bm(t,s,e,r)}async function Om(t,e,r){let s=typeof window.parent<"u"?window.parent:window;if(!s.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let n=await s.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.apiConfig?.stream??zs().stream??!1,...e.extraParams});if(typeof n!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return n.trim()}catch(n){throw n.name==="AbortError"?n:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${n.message}`)}}async function Bm(t,e,r,s){let n=typeof window.parent<"u"?window.parent:window;if(n.TavernHelper?.generateRaw)try{return await zm(t,e,r,s,n)}catch(o){let a=String(o?.message||o||"");if(o?.name==="AbortError"||s?.aborted||a.includes("\u505C\u6B62\u6309\u94AE")||a.includes("stop button")||a.includes("Clicked stop")||a==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")throw o;km.warn("TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",o)}if(n.SillyTavern?.getRequestHeaders)try{return await Km(t,e,r,s,n)}catch(o){if(!o?.allowDirectFallback)throw o}return await Um(t,e,r,s)}async function zm(t,e,r,s,n){if(s?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let o=await n.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.stream??!1,max_chat_history:0,custom_api:{apiurl:$m(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...r.extraParams||{}});return typeof o=="string"?o.trim():fi(o)}async function Km(t,e,r,s,n){let o=String(e.url||"").trim(),a={...id(t,{apiConfig:e,...r}),chat_completion_source:"custom",reverse_proxy:o,proxy_password:"",custom_url:o,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof n.SillyTavern?.getRequestHeaders=="function"?n.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(a),signal:s})}catch(u){throw u?.name==="AbortError"?u:ui(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw ui(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:u})}let d=null;try{d=c?JSON.parse(c):{}}catch{let y=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw ui(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${y||"(\u7A7A\u54CD\u5E94)"}`)}return fi(d)}async function Um(t,e,r,s){let n=id(t,{apiConfig:e,...r}),o=ad(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(o,{method:"POST",headers:a,body:JSON.stringify(n),signal:s}),l=await i.text().catch(()=>"");if(!i.ok){let d=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${d}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return fi(c)}async function jm(t=null){let e=t||zs(),r=Date.now();try{await Nn([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let n=Date.now()-r;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${n}ms)`,latency:n}}catch(s){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${s.message}`,latency:Date.now()-r}}}async function Fm(t=null){let e=t||zs();return e.useMainApi?await Wm():await Hm(e)}async function Wm(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function Hm(t){if(!t.url||!t.apiKey)return[];try{let e=ad(t.url,"models"),r=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!r.ok)return[];let s=await r.json();return s.data&&Array.isArray(s.data)?s.data.map(n=>n.id||n.name).filter(Boolean).sort():[]}catch{return[]}}var km,nd,Im,Mm,Dm,Po=D(()=>{Be();W();km=I.createScope("ApiConnection"),nd="settings",Im="api_presets",Mm="current_preset";Dm={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var pd={};re(pd,{createPreset:()=>$o,createPresetFromCurrentConfig:()=>Qm,deletePreset:()=>Lo,duplicatePreset:()=>hi,exportPresets:()=>xi,generateUniquePresetName:()=>eh,getActiveConfig:()=>Xm,getActivePresetName:()=>bi,getAllPresets:()=>Ir,getPreset:()=>ns,getPresetNames:()=>qm,getStarredPresets:()=>Jm,importPresets:()=>wi,presetExists:()=>Dn,renamePreset:()=>mi,switchToPreset:()=>Oo,togglePresetStar:()=>Vm,updatePreset:()=>gi,validatePreset:()=>Zm});function Gm(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function ud(){return $.get(Ym,Gm())}function gt(){return $.get(cd,[])}function ss(t){$.set(cd,t)}function Do(){return $.get(dd,"")}function No(t){$.set(dd,t||"")}function Ir(){return gt()}function qm(){return gt().map(e=>e.name)}function ns(t){return!t||typeof t!="string"?null:gt().find(r=>r.name===t)||null}function Dn(t){return!t||typeof t!="string"?!1:gt().some(r=>r.name===t)}function $o(t){let{name:e,description:r,apiConfig:s}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let n=e.trim();if(Dn(n))return{success:!1,message:`\u9884\u8BBE "${n}" \u5DF2\u5B58\u5728`};let o={name:n,description:r||"",apiConfig:{url:s?.url||"",apiKey:s?.apiKey||"",model:s?.model||"",useMainApi:s?.useMainApi??!0,stream:s?.stream??!1,max_tokens:s?.max_tokens||4096,temperature:s?.temperature??.7,top_p:s?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=gt();return a.push(o),ss(a),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:o}}function gi(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=gt(),s=r.findIndex(a=>a.name===t);if(s===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let n=r[s],o={...n,...e,name:n.name,updatedAt:Date.now()};return e.apiConfig&&(o.apiConfig={...n.apiConfig,...e.apiConfig}),r[s]=o,ss(r),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:o}}function Lo(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=gt(),r=e.findIndex(s=>s.name===t);return r===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(r,1),ss(e),Do()===t&&No(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function mi(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(!Dn(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Dn(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let s=gt(),n=s.find(o=>o.name===t);return n&&(n.name=r,n.updatedAt=Date.now(),ss(s),Do()===t&&No(r)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${r}"`}}function hi(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim(),s=ns(t);if(!s)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Dn(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(s)),name:r,createdAt:Date.now(),updatedAt:Date.now()},o=gt();return o.push(n),ss(o),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${r}"`,preset:n}}function Vm(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=gt(),r=e.find(s=>s.name===t);return r?(r.starred=!r.starred,r.updatedAt=Date.now(),ss(e),{success:!0,message:r.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:r.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Jm(){return gt().filter(e=>e.starred===!0)}function Oo(t){if(!t)return No(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=ns(t);return e?(No(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function bi(){return Do()}function Xm(){let t=Do();if(t){let r=ns(t);if(r)return{presetName:t,apiConfig:r.apiConfig}}return{presetName:"",apiConfig:ud().apiConfig||{}}}function xi(t=null){if(t){let r=ns(t);if(!r)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let e=gt();return JSON.stringify(e,null,2)}function wi(t,e={overwrite:!1}){let r;try{r=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let s=Array.isArray(r)?r:[r];if(s.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let n=gt(),o=0;for(let a of s){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let i=n.findIndex(l=>l.name===a.name);i>=0?e.overwrite&&(a.updatedAt=Date.now(),n[i]=a,o++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),n.push(a),o++)}return o>0&&ss(n),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${o} \u4E2A\u9884\u8BBE`,imported:o}}function Qm(t,e=""){let r=ud();return $o({name:t,description:e,apiConfig:r.apiConfig})}function Zm(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function eh(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=gt(),r=new Set(e.map(n=>n.name));if(!r.has(t))return t;let s=1;for(;r.has(`${t} (${s})`);)s++;return`${t} (${s})`}var Ym,cd,dd,$n=D(()=>{Be();Ym="settings",cd="api_presets",dd="current_preset"});function ur(){return typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function se(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function C(t,e,r=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let s=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(s.toastr){s.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:r,progressBar:!0});return}rh(t,e,r),th.log(`[${t.toUpperCase()}] ${e}`)}function is(t,e,r={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:s=3500,sticky:n=!1,noticeId:o=""}=r,a=ur();if(!a?.body){C(t,e,s);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",c=a.getElementById(i);if(c||(c=a.createElement("div"),c.id=i,c.style.cssText=`
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
    `,a.body.appendChild(c)),!a.getElementById(l)){let h=a.createElement("style");h.id=l,h.textContent=`
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
    `,a.head.appendChild(h)}if(o){let h=c.querySelector(`[data-notice-id="${o}"]`);h&&h.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=a.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,o&&(u.dataset.noticeId=o);let y=a.createElement("span");y.className="yyt-top-notice__icon",y.textContent=d[t]||d.info;let p=a.createElement("div");p.className="yyt-top-notice__content",p.textContent=e;let f=a.createElement("button");f.className="yyt-top-notice__close",f.type="button",f.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),f.textContent="\xD7";let g=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};f.addEventListener("click",g),u.appendChild(y),u.appendChild(p),u.appendChild(f),c.appendChild(u),n||setTimeout(g,s)}function rh(t,e,r){let s=ur();if(!s)return;let n=s.getElementById("yyt-fallback-toast");n&&n.remove();let o={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=o[t]||o.info,i=s.createElement("div");if(i.id="yyt-fallback-toast",i.style.cssText=`
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
  `,i.textContent=e,!s.getElementById("yyt-toast-styles")){let l=s.createElement("style");l.id="yyt-toast-styles",l.textContent=`
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `,s.head.appendChild(l)}s.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},r)}function Q(){if(os)return os;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return os=window.parent.jQuery,os}catch{}return window.jQuery&&(os=window.jQuery),os}function sh(){os=null}function ge(t){if(!t||t.length===0)return!1;let e=t[0];if(!e||e.nodeType!==1)return!1;let r=e.ownerDocument||document;return e.isConnected?r?.documentElement?.contains?r.documentElement.contains(e):!0:!1}function Mr(...t){return t.flat(1/0).flatMap(e=>String(e||"").split(/\s+/)).map(e=>e.trim()).filter(Boolean).join(" ")}function Ks(t={}){return Object.entries(t).filter(([,e])=>e!=null&&e!==!1).map(([e,r])=>r===!0?e:`${e}="${se(String(r))}"`).join(" ")}function md(t=[],e="",r=""){let s=String(e??""),n=t.find(o=>o.value===s)||t.find(o=>o.disabled!==!0)||null;return n||{value:s,label:r||s||"\u8BF7\u9009\u62E9",disabled:!1}}function nh(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(e=>e&&e!=="yyt-select"&&e!=="yyt-native-select-bridge")}function yd(t,e){let r=Q();if(!r||!e?.length)return null;let s=e.attr("id")?`#${e.attr("id")}`:e.attr("data-yyt-select-key")?`[data-yyt-select-key="${e.attr("data-yyt-select-key")}"]`:"";if(!s)return null;let o=t.find("[data-yyt-custom-select]").filter((a,i)=>String(r(i).attr("data-yyt-select-target")||"")===s);return o.length?o.first():null}function hd(t){let e=t?.[0];return e?.ownerDocument?e.ownerDocument:typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function oh(t){if(!Q()||!ge(t))return null;let r=t.find("[data-yyt-custom-select]");return r.length?r:null}function bd(t,e){if(!Q()||!e?.length)return null;let s=e.find("[data-yyt-select-native]").first();if(s.length)return s;let n=String(e.attr("data-yyt-select-target")||"").trim();if(!n)return null;let o=t.find(n).first();return o.length?o:null}function xd(t=null){return t?.jquery&&t[0]?.ownerDocument?t[0].ownerDocument:t?.ownerDocument?t.ownerDocument:t?.nodeType===9?t:ur()}function Vt(t=null){let e=xd(t),r=fd.get(e);return r||(r={targetDoc:e,layer:null,activeRoot:null,activeDropdown:null,placeholder:null,cleanup:null},fd.set(e,r)),r}function ah(t=null){let e=xd(t);if(!e?.body)return null;let r=Vt(e);if(r.layer&&r.layer.isConnected)return r.layer;let s=e.getElementById(gd);return s||(s=e.createElement("div"),s.id=gd,s.className="yyt-select-portal-layer",e.body.appendChild(s)),r.layer=s,s}function Bo(t){if(!Q()||!t?.length)return null;let r=t.find("[data-yyt-select-trigger]").first();return r.length?r:t.find(".yyt-select-trigger").first()}function wd(t){let e=Q();if(!e||!t?.length)return null;let r=Vt(t);if(r.activeRoot===t[0]&&r.activeDropdown)return e(r.activeDropdown);let s=t.find("[data-yyt-select-dropdown]").first();return s.length?s:t.find(".yyt-select-dropdown").first()}function ih(t){t&&(t.classList.remove("yyt-floating-open"),t.removeAttribute("data-yyt-floating"),t.removeAttribute("data-yyt-floating-placement"),t.style.position="",t.style.top="",t.style.left="",t.style.right="",t.style.width="",t.style.minWidth="",t.style.maxWidth="",t.style.maxHeight="",t.style.visibility="",t.style.zIndex="")}function vd(t,e=null){if(!t)return!1;let r=Vt(e||t);return r.activeRoot?.contains?.(t)||r.activeDropdown?.contains?.(t)?!0:!!t.closest?.("[data-yyt-custom-select], .yyt-select-portal-layer")}function lh(t){if(!t?.targetDoc||typeof t.cleanup=="function")return;let e=t.targetDoc,r=e.defaultView||window,s=i=>{!t.activeRoot||!t.activeDropdown||vd(i.target,e)||qt(e)},n=i=>{if(i.key!=="Escape")return;let l=t.activeRoot;qt(e);let c=Q();c&&l&&Bo(c(l))?.trigger("focus")},o=()=>{_i(e)},a=()=>{_i(e)};e.addEventListener("mousedown",s,!0),e.addEventListener("keydown",n,!0),r.addEventListener("resize",o),e.addEventListener("scroll",a,!0),t.cleanup=()=>{e.removeEventListener("mousedown",s,!0),e.removeEventListener("keydown",n,!0),r.removeEventListener("resize",o),e.removeEventListener("scroll",a,!0)}}function ch(t){typeof t?.cleanup=="function"&&t.cleanup(),t&&(t.cleanup=null)}function Si(t){let e=Q();if(!e||!t?.activeRoot||!t?.activeDropdown)return;let r=t.targetDoc;if(!r?.body?.contains?.(t.activeRoot)){qt(r);return}let s=e(t.activeRoot),n=Bo(s),o=t.activeDropdown,a=r?.defaultView||window;if(!n?.length||!o?.isConnected||!s[0]?.isConnected){qt(r);return}let i=n[0].getBoundingClientRect(),l=a.innerWidth||r.documentElement?.clientWidth||0,c=a.innerHeight||r.documentElement?.clientHeight||0,d=12,u=8,y=Math.max(0,c-i.bottom-d-u),p=Math.max(0,i.top-d-u),f=y<220&&p>y,h=Math.max(120,Math.floor((f?p:y)||0));o.setAttribute("data-yyt-floating","true"),o.setAttribute("data-yyt-floating-placement",f?"top":"bottom"),o.classList.add("yyt-floating-open");let x=Math.ceil(i.width),v=Math.max(x,Math.floor(l-d*2)),T=o.style.width,L=o.style.minWidth,M=o.style.maxWidth,_=o.style.visibility;o.style.width="max-content",o.style.minWidth=`${x}px`,o.style.maxWidth=`${v}px`,o.style.visibility="hidden";let A=Math.ceil(o.scrollWidth||o.getBoundingClientRect().width||x),F=Math.max(x,Math.min(v,A)),H=Math.min(o.scrollHeight||h,h);o.style.width=T,o.style.minWidth=L,o.style.maxWidth=M,o.style.visibility=_;let R=Math.round(i.left);R+F>l-d&&(R=Math.max(d,Math.round(l-d-F))),R=Math.max(d,R);let S=Math.round(f?i.top-u-H:i.bottom+u);S=Math.max(d,Math.min(S,Math.round(c-d-H))),o.style.position="fixed",o.style.top=`${S}px`,o.style.left=`${R}px`,o.style.right="auto",o.style.width=`${F}px`,o.style.minWidth=`${x}px`,o.style.maxWidth=`${v}px`,o.style.maxHeight=`${Math.floor(h)}px`,o.style.visibility="",o.style.zIndex="10050"}function qt(t=null){let e=Q(),r=Vt(t);if(!e||!r?.activeRoot)return;let s=r.activeRoot,n=r.activeDropdown,o=r.placeholder,a=e(s),i=Bo(a);n&&(ih(n),o?.parentNode?o.parentNode.insertBefore(n,o):s?.isConnected?s.appendChild(n):n.remove()),o?.parentNode?.removeChild(o),a.removeClass("yyt-open"),i?.attr("aria-expanded","false"),r.activeRoot=null,r.activeDropdown=null,r.placeholder=null,ch(r)}function _i(t=null){let e=Vt(t);!e?.activeRoot||!e?.activeDropdown||Si(e)}function Td(t){if(!Q()||!t?.length)return;let r=t.first(),s=Bo(r),n=wd(r);if(!s?.length||!n?.length||s.prop("disabled"))return;let o=Vt(r);if(o.activeRoot===r[0]){Si(o);return}qt(r);let a=ah(r);if(!a)return;let i=n[0],l=o.targetDoc.createComment("yyt-select-dropdown-placeholder");i.parentNode?.insertBefore(l,i),a.appendChild(i),o.activeRoot=r[0],o.activeDropdown=i,o.placeholder=l,r.addClass("yyt-open"),s.attr("aria-expanded","true"),lh(o),Si(o)}function dh(t,e){let r=Q();if(!r||!e?.length)return null;let s=e.closest("[data-yyt-custom-select]");if(s.length)return s.first();let n=Vt(e);if(n.activeRoot&&n.activeDropdown?.contains?.(e[0])){let o=r(n.activeRoot);return t.has(n.activeRoot).length?o:null}return null}function Ei(t){let e=Vt(t);t?.length&&e.activeRoot&&e.activeRoot!==t[0]||qt(t)}function Sd(t){let e=Vt(t);if(t?.length&&e.activeRoot===t[0]){qt(t);return}Td(t)}function vi(t,e,r=null){let s=Q();if(!s||!e?.length)return;let n=r||bd(t,e);if(!n?.length)return;let o=Array.isArray(n.data("yytCustomSelectOptions"))?n.data("yytCustomSelectOptions"):[],a=md(o,n.val(),e.attr("data-yyt-select-placeholder")||""),i=String(a.value??""),l=String(a.label??""),c=n.is(":disabled");e.find(".yyt-select-value").text(l).attr("data-value",i).data("value",i);let d=wd(e);(d?.length?d.find("[data-yyt-select-option]"):e.find("[data-yyt-select-option]")).each((p,f)=>{let g=s(f),h=String(g.attr("data-value")||"")===i;g.toggleClass("yyt-selected",h).attr("aria-selected",String(h))});let y=e.find("[data-yyt-select-trigger]").first();y.prop("disabled",c),c&&(Ei(e),e.removeClass("yyt-open"),y.attr("aria-expanded","false"))}function _d(t=[]){return Array.isArray(t)?t.map(e=>{if(e&&typeof e=="object"&&!Array.isArray(e)){let s=String(e.value??""),n=String(e.label??e.text??e.name??s);return{value:s,label:n,disabled:e.disabled===!0}}let r=String(e??"");return{value:r,label:r,disabled:!1}}):[]}function Ed(t={}){let{selectedValue:e="",options:r=[],placeholder:s="\u8BF7\u9009\u62E9",disabled:n=!1,includeNative:o=!0,nativeTag:a="input",nativeType:i="hidden",rootAttributes:l={},nativeAttributes:c={},triggerAttributes:d={},dropdownAttributes:u={},optionAttributes:y={},optionClass:p="",optionTextClass:f=""}=t,g=_d(r),h=md(g,e,s),x=n===!0||g.length===0,v=Ks({...l,class:Mr("yyt-custom-select",l.class),"data-yyt-custom-select":l["data-yyt-custom-select"]??"true","data-yyt-select-placeholder":s}),T=Ks({type:"button",...d,class:Mr("yyt-select-trigger",d.class),"data-yyt-select-trigger":d["data-yyt-select-trigger"]??"true","aria-haspopup":d["aria-haspopup"]??"listbox","aria-expanded":d["aria-expanded"]??"false",disabled:x?!0:d.disabled}),L=Ks({...u,class:Mr("yyt-select-dropdown",u.class),"data-yyt-select-dropdown":u["data-yyt-select-dropdown"]??"true",role:u.role??"listbox"}),M=o?(()=>{let _={...c,class:Mr(c.class),"data-yyt-select-native":c["data-yyt-select-native"]??"true",disabled:x?!0:c.disabled};return a==="select"?`<select ${Ks(_)}>${g.map(H=>`
            <option value="${se(H.value)}" ${H.value===String(h.value??"")?"selected":""} ${H.disabled?"disabled":""}>${se(H.label)}</option>
          `).join("")}</select>`:`<input ${Ks({type:i,value:h.value,..._})}>`})():"";return`
    <div ${v}>
      ${M}
      <button ${T}>
        <span class="${se(Mr("yyt-select-value"))}" data-value="${se(h.value)}">${se(h.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${L}>
        ${g.map(_=>{let A=_.value===String(h.value??"");return`
            <button ${Ks({type:"button",...y,class:Mr("yyt-select-option",p,y.class,A?"yyt-selected":""),"data-yyt-select-option":y["data-yyt-select-option"]??"true","data-value":_.value,role:y.role??"option","aria-selected":A?"true":"false",disabled:_.disabled?!0:y.disabled})}>
              <span class="${se(Mr("yyt-option-text",f))}">${se(_.label)}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function ct(t,e="yytCustomSelect"){let r=Q();if(!r||!ge(t))return;let s=hd(t),n=Vt(s);n.activeRoot&&t.has(n.activeRoot).length&&qt(s),t.off(`.${e}`),r(s).off(`click.${e}`),r(s).off(`mousedown.${e}`),t.find('[data-yyt-enhanced-select="true"]').remove(),t.find(".yyt-native-select-bridge").each((o,a)=>{let i=r(a),l=i.attr("data-yyt-original-style");l!==void 0&&l?i.attr("style",l):i.removeAttr("style"),i.removeClass("yyt-native-select-bridge").removeAttr("data-yyt-original-style").removeAttr("data-yyt-select-key").removeData("yytCustomSelectOptions")})}function Nt(t,e={}){let r=Q();if(!r||!ge(t))return;let{namespace:s="yytCustomSelect",selectors:n=[]}=e,o=Array.isArray(n)?n.filter(Boolean):[n].filter(Boolean);if(o.length===0)return;ct(t,s);let a=o.join(", "),i=hd(t);t.find(a).each((l,c)=>{let d=r(c),u=String(d.attr("id")||"").trim(),y=u||`yyt-select-${Date.now()}-${l}`,p=u?`#${u}`:`[data-yyt-select-key="${y}"]`,f=`${y}-dropdown`,g=nh(d.attr("class")),h=d.attr("style"),x=d.find("option").map((L,M)=>{let _=r(M);return{value:String(_.attr("value")??_.val()??""),label:_.text(),disabled:_.is(":disabled")}}).get();d.attr("data-yyt-original-style",h??"").attr("data-yyt-select-key",y).addClass("yyt-native-select-bridge").css("display","none").data("yytCustomSelectOptions",x);let v=Ed({includeNative:!1,selectedValue:d.val(),options:x,disabled:d.is(":disabled"),placeholder:x[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{class:Mr(g),style:h||void 0,"data-yyt-enhanced-select":"true","data-yyt-select-target":p},triggerAttributes:{id:`${y}-trigger`,"aria-controls":f},dropdownAttributes:{id:f}});d.after(v);let T=yd(t,d);vi(t,T,d)}),t.on(`click.${s}`,"[data-yyt-select-trigger]",l=>{l.preventDefault(),l.stopPropagation();let c=r(l.currentTarget);if(c.prop("disabled"))return;let d=c.closest("[data-yyt-custom-select]");Sd(d)}),t.on(`change.${s}`,a,l=>{let c=r(l.currentTarget),d=c.find("option").map((y,p)=>{let f=r(p);return{value:String(f.attr("value")??f.val()??""),label:f.text(),disabled:f.is(":disabled")}}).get();c.data("yytCustomSelectOptions",d);let u=yd(t,c);vi(t,u,c)}),r(i).off(`click.${s}`).on(`click.${s}`,l=>{if(vd(l.target,i))return;let c=oh(t);c?.length&&(qt(i),c.filter(".yyt-open").removeClass("yyt-open").find("[data-yyt-select-trigger]").attr("aria-expanded","false"))}),r(i).off(`mousedown.${s}`,".yyt-select-portal-layer [data-yyt-select-option]").on(`mousedown.${s}`,".yyt-select-portal-layer [data-yyt-select-option]",l=>{l.preventDefault(),l.stopPropagation();let c=r(l.currentTarget);if(c.prop("disabled"))return;let d=dh(t,c);if(!d?.length)return;let u=bd(t,d);if(!u?.length)return;let y=String(c.attr("data-value")||"");u.val(y).trigger("change"),vi(t,d,u),Ei(d)})}function uh(t,e=as){if(!Q()||!ge(t))return{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9};let s=t.find(`#${e}-model`).val()?.trim()||"",n=t.find(`#${e}-model-select`);return n.is(":visible")&&(s=n.val()||s),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:s,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),stream:t.find(`#${e}-stream`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function ph(t,e,r=as){if(!Q()||!ge(t)||!e)return;t.find(`#${r}-api-url`).val(e.url||""),t.find(`#${r}-api-key`).val(e.apiKey||""),t.find(`#${r}-model`).val(e.model||""),t.find(`#${r}-stream`).prop("checked",e.stream===!0),t.find(`#${r}-max-tokens`).val(e.max_tokens||4096),t.find(`#${r}-temperature`).val(e.temperature??.7),t.find(`#${r}-top-p`).val(e.top_p??.9);let n=e.useMainApi??!0;t.find(`#${r}-use-main-api`).prop("checked",n);let a=t.find(`#${r}-custom-api-fields`);n?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${r}-model`).show(),t.find(`#${r}-model-select`).hide()}function Ln(t){let{id:e,title:r,body:s,width:n="380px",wide:o=!1,dialogClass:a="",bodyClass:i="",footerClass:l=""}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${o?"yyt-dialog-wide":""} ${a}" style="${n!=="380px"?`width: ${n};`:""} max-height: calc(100vh - 32px);">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${r}</span>
          <button class="yyt-dialog-close" id="${e}-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body ${i}" style="overflow-y: auto; overflow-x: hidden; max-height: calc(100vh - 160px);">
          ${s}
        </div>
        <div class="yyt-dialog-footer ${l}">
          <button class="yyt-btn yyt-btn-secondary" id="${e}-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${e}-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `}function On(t,e,r={}){if(!Q())return()=>{};let n=t.find(`#${e}-overlay`),o=()=>{n.remove(),a?.removeEventListener("keydown",i),r.onClose&&r.onClose()};n.find(`#${e}-close, #${e}-cancel`).on("click",o),n.on("click",function(l){l.target===this&&o()}),n.find(`#${e}-save`).on("click",function(){r.onSave&&r.onSave(o)});let a=n[0]?.ownerDocument||document,i=l=>{l.key==="Escape"&&(l.stopPropagation(),o())};return a.addEventListener("keydown",i),o}function pr(t,e,r={}){let{confirmText:s="\u786E\u5B9A",cancelText:n="\u53D6\u6D88",danger:o=!1,width:a="380px"}=r,i=Q(),l=ur();if(!i||!l?.body)return Promise.resolve(!1);let c=`yyt-confirm-${++Ad}`;return new Promise(d=>{let u=!1,y=h=>{u||(u=!0,g.remove(),p?.focus(),d(h))},p=l.activeElement,f=`
      <div class="yyt-dialog-overlay" id="${c}-overlay">
        <div class="yyt-dialog" style="${a!=="380px"?`width: ${a};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${se(t)}</span>
            <button class="yyt-dialog-close" id="${c}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${se(e)}</div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${c}-cancel">${se(n)}</button>
            <button class="yyt-btn ${o?"yyt-btn-danger":"yyt-btn-primary"}" id="${c}-confirm">${se(s)}</button>
          </div>
        </div>
      </div>`,g=i(f).appendTo(l.body);g.find(`#${c}-confirm`).on("click",()=>y(!0)),g.find(`#${c}-cancel, #${c}-close`).on("click",()=>y(!1)),g.on("click",function(h){h.target===this&&y(!1)}),g.on("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),y(!1)),h.key==="Enter"&&(h.stopPropagation(),y(!0))}),g.find(`#${c}-${o?"cancel":"confirm"}`).trigger("focus")})}function yh(t,e,r={}){let{defaultValue:s="",placeholder:n="",confirmText:o="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",width:i="380px"}=r,l=Q(),c=ur();if(!l||!c?.body)return Promise.resolve(null);let d=`yyt-prompt-${++Ad}`;return new Promise(u=>{let y=!1,p=T=>{y||(y=!0,h.remove(),f?.focus(),u(T))},f=c.activeElement,g=`
      <div class="yyt-dialog-overlay" id="${d}-overlay">
        <div class="yyt-dialog" style="${i!=="380px"?`width: ${i};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${se(t)}</span>
            <button class="yyt-dialog-close" id="${d}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            ${e?`<div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${se(e)}</div>`:""}
            <input class="yyt-input" id="${d}-input" type="text" value="${se(s)}" placeholder="${se(n)}" />
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${d}-cancel">${se(a)}</button>
            <button class="yyt-btn yyt-btn-primary" id="${d}-confirm">${se(o)}</button>
          </div>
        </div>
      </div>`,h=l(g).appendTo(c.body),x=h.find(`#${d}-input`),v=()=>{let T=x.val().trim();p(T||null)};h.find(`#${d}-confirm`).on("click",v),h.find(`#${d}-cancel, #${d}-close`).on("click",()=>p(null)),h.on("click",function(T){T.target===this&&p(null)}),x.on("keydown",T=>{T.key==="Enter"&&(T.stopPropagation(),v())}),h.on("keydown",T=>{T.key==="Escape"&&(T.stopPropagation(),p(null))}),x.trigger("focus").trigger("select")})}function fh(t,e,r){if(t.prop("disabled")&&t.data("yytLoading"))return Promise.resolve();let s=t.html(),n=t.outerWidth();if(t.prop("disabled",!0).data("yytLoading",!0),t.css("min-width",n+"px"),r)t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${se(r)}`);else{let o=t.find("i.fa-solid, i.fa-regular").first();o.length?(o.data("yytOriginalClass",o.attr("class")),o.attr("class","fa-solid fa-spinner fa-spin")):t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${s}`)}return Promise.resolve().then(()=>e()).finally(()=>{if(r)t.html(s);else{let o=t.find("i.fa-spinner"),a=o.data("yytOriginalClass");a?o.attr("class",a).removeData("yytOriginalClass"):t.html(s)}t.prop("disabled",!1).removeData("yytLoading").css("min-width","")})}function Bn(t,e){let r=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(r),n=document.createElement("a");n.href=s,n.download=e,n.click(),URL.revokeObjectURL(s)}function zn(t){return new Promise((e,r)=>{let s=new FileReader;s.onload=n=>e(n.target.result),s.onerror=n=>r(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),s.readAsText(t)})}var th,as,Ti,os,fd,gd,Ad,Ge=D(()=>{W();th=I.createScope("UIUtils"),as="youyou_toolkit",Ti=class{constructor(e={}){this._state={...e}}get(e){return this._state[e]}set(e,r){return this._state[e]=r,this}reset(e={}){return this._state={...e},this}toJSON(){return{...this._state}}};os=null;fd=new WeakMap,gd="yyt-select-portal-layer";Ad=0});var Us,Kn,jt,Ai=D(()=>{Ye();Ge();W();Us=I.createScope("UIManager"),Kn=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,K.emit(B.UI_INITIALIZED),Us.log("\u521D\u59CB\u5316\u5B8C\u6210"))}register(e,r){return!e||!r?(Us.warn("\u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...r,render:r.render||(()=>""),bindEvents:r.bindEvents||(()=>{}),destroy:r.destroy||(()=>{}),getStyles:r.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,r,s={}){let n=Q();if(!n){Us.error("jQuery\u4E0D\u53EF\u7528");return}let o=this.components.get(e);if(!o){Us.error(`\u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);let i;typeof r=="string"?i=n(r):r&&r.jquery?i=r:r&&(i=n(r)),i?.length&&i.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u672A\u6CE8\u518C\uFF1A${e}</span></div>`);return}let a;if(typeof r=="string"?a=n(r):r&&r.jquery?a=r:r&&(a=n(r)),!ge(a)){Us.warn("\u5BB9\u5668\u4E0D\u5B58\u5728");return}this.activeInstances.forEach((i,l)=>{i?.container?.length&&a.length&&i.container[0]===a[0]&&l!==e&&this.destroyInstance(l)}),this.destroyInstance(e);try{if(typeof o.renderTo=="function")o.renderTo(a,{...s,dependencies:this.dependencies});else{let i=o.render({...s,dependencies:this.dependencies});a.html(i),o.bindEvents(a,this.dependencies)}}catch(i){Us.error(`\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25: ${e}`,i),a.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25\uFF1A${e}${i?.message?` - ${i.message}`:""}</span></div>`);return}this.activeInstances.set(e,{container:a,component:o,props:s}),K.emit(B.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let r=this.activeInstances.get(e);r&&(r.component.destroy(r.container),this.activeInstances.delete(e))}destroyContainerInstance(e){let r=Q();if(!r||!e)return;let s;if(typeof e=="string"?s=r(e):e?.jquery?s=e:s=r(e),!s?.length)return;let n=[];this.activeInstances.forEach((o,a)=>{o?.container?.length&&o.container[0]===s[0]&&n.push(a)}),n.forEach(o=>this.destroyInstance(o))}switchTab(e){let r=this.currentTab;this.currentTab=e,K.emit(B.UI_TAB_CHANGED,{tabId:e,oldTab:r})}getCurrentTab(){return this.currentTab}switchSubTab(e,r){this.currentSubTab[e]=r,K.emit(B.UI_SUBTAB_CHANGED,{mainTab:e,subTab:r})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((r,s)=>{r.getStyles&&(e+=r.getStyles())}),e}injectStyles(e=document){let r="yyt-component-styles";if(e.getElementById(r))return;let s=e.createElement("style");s.id=r,s.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(s)}setDependency(e,r){this.dependencies[e]=r}getDependency(e){return this.dependencies[e]}_subscribeEvents(){K.on(B.PRESET_UPDATED,()=>{}),K.on(B.TOOL_UPDATED,()=>{})}},jt=new Kn});function m(t,e={},...r){let s=document.createElement(t);if(e.className&&(s.className=e.className),e.text!==void 0&&e.text!==null&&(s.textContent=String(e.text)),e.html!==void 0&&e.html!==null&&(s.innerHTML=String(e.html)),e.attrs)for(let[n,o]of Object.entries(e.attrs))o==null||o===!1||s.setAttribute(n,o===!0?"":String(o));if(e.style&&Object.assign(s.style,e.style),e.dataset)for(let[n,o]of Object.entries(e.dataset))s.dataset[n]=String(o);for(let n of r)j(s,n);return s}function j(t,e){if(!(e==null||e===!1)){if(Array.isArray(e)){for(let r of e)j(t,r);return}if(typeof e=="string"||typeof e=="number"){t.appendChild(document.createTextNode(String(e)));return}if(e instanceof Node){t.appendChild(e);return}if(e&&e.el instanceof Node){t.appendChild(e.el);return}}}function Cd(){let t=new Map;return{on(e,r){return!e||typeof r!="function"?()=>{}:(t.has(e)||t.set(e,new Set),t.get(e).add(r),()=>this.off(e,r))},off(e,r){let s=t.get(e);s&&s.delete(r)},emit(e,...r){let s=t.get(e);if(s)for(let n of[...s])try{n(...r)}catch{}},clear(){t.clear()}}}function Ci(t,e){if(!t||!e)return null;if(t._id===e)return t;let r=t._children;if(!r)return null;let s=r instanceof Map?[...r.values()]:Array.isArray(r)?r:[];for(let n of s){let o=Ci(n,e);if(o)return o}return null}function Me({id:t=null,kind:e="control"}={}){let r=Cd();return{_id:t||null,_kind:e,_children:null,_emitter:r,on(s,n){return r.on(s,n)},off(s,n){r.off(s,n)},getControl(s){return Ci(this,s)},get(){},set(s){},destroy(){if(r.clear(),this._children){let s=this._children instanceof Map?[...this._children.values()]:Array.isArray(this._children)?this._children:[];for(let n of s)try{n?.destroy?.()}catch{}this._children instanceof Map?this._children.clear():Array.isArray(this._children)&&(this._children.length=0)}if(this.el?.parentNode)try{this.el.parentNode.removeChild(this.el)}catch{}}}}var dt=D(()=>{});function ce(t={}){let{id:e=null,label:r="",icon:s=null,variant:n="default",size:o="normal",disabled:a=!1,title:i=null,onClick:l=null}=t,c=["yyt-btn"];n==="primary"?c.push("yyt-btn-primary"):n==="danger"?c.push("yyt-btn-danger"):n==="ghost"&&c.push("yyt-btn-secondary"),o==="small"&&c.push("yyt-btn-small");let d=m("button",{className:c.join(" "),attrs:{type:"button",disabled:a?"disabled":null,title:i}}),u=null;s&&(u=m("span",{className:"yyt-btn-icon-glyph",text:s}),d.appendChild(u));let y=m("span",{text:r});d.appendChild(y);let p={...Me({id:e,kind:"button"}),el:d,setLabel(f){y.textContent=String(f||"")},setIcon(f){u&&(u.textContent=String(f||""))},setDisabled(f){f?d.setAttribute("disabled","disabled"):d.removeAttribute("disabled")},isDisabled(){return d.hasAttribute("disabled")},get(){return y.textContent},set(f){this.setLabel(f)}};return d.addEventListener("click",f=>{if(!d.hasAttribute("disabled")){if(typeof l=="function")try{l(f,p)}catch{}p._emitter.emit("click",f)}}),p}var kd=D(()=>{dt()});function Xe(t={}){let{id:e=null,placeholder:r="",value:s="",type:n="text",disabled:o=!1,maxLength:a=null,onInput:i=null,onChange:l=null}=t,c=m("input",{className:"yyt-input",attrs:{type:n,placeholder:r,disabled:o?"disabled":null,maxlength:a!=null?String(a):null}});c.value=s==null?"":String(s);let d={...Me({id:e,kind:"textInput"}),el:c,get(){return c.value},set(u,{silent:y=!1}={}){c.value=u==null?"":String(u),y||d._emitter.emit("change",c.value)},setPlaceholder(u){c.placeholder=u==null?"":String(u)},setDisabled(u){c.disabled=!!u},focus(){c.focus()},select(){c.select()}};return c.addEventListener("input",()=>{if(typeof i=="function")try{i(c.value,d)}catch{}d._emitter.emit("input",c.value)}),c.addEventListener("change",()=>{if(typeof l=="function")try{l(c.value,d)}catch{}d._emitter.emit("change",c.value)}),c.addEventListener("blur",()=>d._emitter.emit("blur",c.value)),d}var Id=D(()=>{dt()});function qe(t={}){let{id:e=null,options:r=[],value:s="",placeholder:n=null,disabled:o=!1,onChange:a=null}=t,i=m("select",{className:"yyt-select",attrs:{disabled:o?"disabled":null}});function l(d,u){if(i.innerHTML="",n!==null){let y=m("option",{text:n,attrs:{value:"",disabled:"disabled",selected:u?null:"selected"}});i.appendChild(y)}for(let y of d){let p=m("option",{text:y.label??String(y.value),attrs:{value:String(y.value),selected:String(y.value)===String(u)?"selected":null,disabled:y.disabled?"disabled":null}});i.appendChild(p)}}l(r,s);let c={...Me({id:e,kind:"select"}),el:i,get(){return i.value},set(d,{silent:u=!1}={}){i.value=d==null?"":String(d),u||c._emitter.emit("change",i.value)},setOptions(d,u){l(d||[],u??i.value)},setDisabled(d){i.disabled=!!d}};return i.addEventListener("change",()=>{if(typeof a=="function")try{a(i.value,c)}catch(d){typeof console<"u"&&console.error&&console.error("[selectInput] onChange \u5F02\u5E38",d)}c._emitter.emit("change",i.value)}),c}var Md=D(()=>{dt()});function wt(t={}){let{id:e=null,label:r="",hint:s="",checked:n=!1,disabled:o=!1,onChange:a=null}=t,i=m("label",{className:"yyt-toggle-label"});r&&i.appendChild(m("span",{text:r})),s&&i.appendChild(m("span",{className:"yyt-toggle-hint",text:s}));let l=m("input",{attrs:{type:"checkbox",disabled:o?"disabled":null}});l.checked=!!n;let c=m("span",{className:"yyt-toggle-slider"}),d=m("label",{className:"yyt-toggle"});d.appendChild(l),d.appendChild(c);let u=m("div",{className:"yyt-toggle-row"});u.appendChild(i),u.appendChild(d),i.addEventListener("click",p=>{p.preventDefault(),!l.disabled&&(l.checked=!l.checked,l.dispatchEvent(new Event("change",{bubbles:!0})))});let y={...Me({id:e,kind:"toggle"}),el:u,get(){return!!l.checked},set(p,{silent:f=!1}={}){l.checked=!!p,f||y._emitter.emit("change",!!p)},setDisabled(p){l.disabled=!!p}};return l.addEventListener("change",()=>{let p=!!l.checked;if(typeof a=="function")try{a(p,y)}catch{}y._emitter.emit("change",p)}),y}var Rd=D(()=>{dt()});var Pd=D(()=>{dt()});var Nd=D(()=>{dt()});function vt(t={}){let{id:e=null,label:r="",hint:s="",control:n=null,inline:o=!1}=t,a=m("div",{className:"yyt-form-group",style:o?{flexDirection:"row",alignItems:"center",gap:"12px"}:null});r&&a.appendChild(m("label",{text:r,style:o?{flex:"0 0 auto",minWidth:"120px"}:null}));let i=m("div",{style:o?{flex:"1",minWidth:"0"}:null});n&&j(i,n),a.appendChild(i),s&&a.appendChild(m("div",{className:"yyt-form-hint",text:s}));let l=n?[n]:[];return{...Me({id:e,kind:"formRow"}),el:a,_children:l,get(){return n?.get?.()},set(c,d){n?.set?.(c,d)},setControl(c){i.innerHTML="",l.length=0,c&&(j(i,c),l.push(c))}}}var Dd=D(()=>{dt()});function zo(t={}){let{id:e=null,icon:r=null,name:s="",desc:n="",active:o=!1,disabled:a=!1,actions:i=[],onClick:l=null}=t,c=["yyt-list-row"];o&&c.push("yyt-list-row-active"),a&&c.push("yyt-list-row-disabled");let d=m("div",{className:c.join(" "),style:a?{opacity:"0.5",pointerEvents:"none"}:null});r&&d.appendChild(m("div",{className:"yyt-list-row-icon",text:r}));let u=m("div",{className:"yyt-list-row-main"}),y=m("div",{className:"yyt-list-row-name",text:s});u.appendChild(y);let p=null;n&&(p=m("div",{className:"yyt-list-row-desc",text:n}),u.appendChild(p)),d.appendChild(u);let f=null;if(i&&i.length){f=m("div",{className:"yyt-list-row-actions"});for(let h of i)j(f,h);d.appendChild(f)}typeof l=="function"&&(d.style.cursor="pointer",d.addEventListener("click",h=>{h.target.closest(".yyt-list-row-actions")||(l(h,g),g._emitter.emit("click",h))}));let g={...Me({id:e,kind:"listRow"}),el:d,_children:i||[],setName(h){y.textContent=h==null?"":String(h)},setDesc(h){if(p)p.textContent=h==null?"":String(h);else{if(!h)return;p=m("div",{className:"yyt-list-row-desc",text:h}),u.appendChild(p)}},setActive(h){h?d.classList.add("yyt-list-row-active"):d.classList.remove("yyt-list-row-active")},setDisabled(h){h?(d.classList.add("yyt-list-row-disabled"),d.style.opacity="0.5",d.style.pointerEvents="none"):(d.classList.remove("yyt-list-row-disabled"),d.style.opacity="",d.style.pointerEvents="")}};return g}var $d=D(()=>{dt()});function Ft(t={}){let{id:e=null,heading:r="",icon:s=null,actions:n=[],content:o=[]}=t,a=m("div",{className:"yyt-flow-section"}),i=null,l=null,c=null;if(r||s||n&&n.length){if(i=m("div",{className:"yyt-flow-heading"}),s&&(l=m("span",{className:"yyt-flow-heading-icon",text:s}),i.appendChild(l)),r&&i.appendChild(m("span",{text:r})),n&&n.length){c=m("div",{className:"yyt-flow-heading-action"});for(let p of n)j(c,p);i.appendChild(c)}a.appendChild(i)}let d=m("div",{className:"yyt-flow-content"}),u=[];for(let p of o||[])p&&(j(d,p),u.push(p));for(let p of n||[])p&&typeof p=="object"&&p.el&&u.push(p);return a.appendChild(d),{...Me({id:e,kind:"flowSection"}),el:a,_children:u,appendContent(p){p&&(j(d,p),p&&typeof p=="object"&&p.el&&u.push(p))},clearContent(){d.innerHTML="";let p=u.filter(f=>(n||[]).includes(f));u.length=0;for(let f of p)u.push(f)},setHeading(p){if(!i)return;let f=i.querySelector("span:not(.yyt-flow-heading-icon):not(.yyt-flow-heading-action)");f&&(f.textContent=p==null?"":String(p))},setIcon(p){l&&(l.textContent=p==null?"":String(p))}}}var Ld=D(()=>{dt()});function Ko(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent.document}catch{}return document}function ki({title:t,width:e,wide:r}){let s=`yyt-ctrl-dialog-${++gh}`,n=m("div",{className:"yyt-dialog-overlay",attrs:{"data-dialog-id":s}}),o={};e&&e!=="380px"&&(o.width=e),o.maxHeight="calc(100vh - 32px)";let a=m("div",{className:`yyt-dialog${r?" yyt-dialog-wide":""}`,style:o}),i=m("div",{className:"yyt-dialog-header"});i.appendChild(m("span",{className:"yyt-dialog-title",text:t||""}));let l=m("button",{className:"yyt-dialog-close",attrs:{type:"button","aria-label":"close"},html:'<i class="fa-solid fa-times"></i>'});i.appendChild(l),a.appendChild(i);let c=m("div",{className:"yyt-dialog-body"});a.appendChild(c);let d=m("div",{className:"yyt-dialog-footer"});return a.appendChild(d),n.appendChild(a),{overlay:n,body:c,footer:d,closeBtn:l,id:s}}function Ii(t){let e=Ko();return e?.body?(e.body.appendChild(t),!0):!1}function Mi(t){if(t?.parentNode)try{t.parentNode.removeChild(t)}catch{}}function mh(t={}){let{title:e="\u8BF7\u786E\u8BA4",message:r="",confirmText:s="\u786E\u5B9A",cancelText:n="\u53D6\u6D88",danger:o=!1,width:a="380px"}=t;return new Promise(i=>{let{overlay:l,body:c,footer:d,closeBtn:u}=ki({title:e,width:a,wide:!1}),y=(Ko()||document).activeElement,p=m("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6"},text:r});c.appendChild(p);let f=m("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:n}),g=m("button",{className:`yyt-btn ${o?"yyt-btn-danger":"yyt-btn-primary"}`,attrs:{type:"button"},text:s});d.appendChild(f),d.appendChild(g);let h=!1,x=v=>{if(!h){h=!0,Mi(l);try{y?.focus()}catch{}i(v)}};if(g.addEventListener("click",()=>x(!0)),f.addEventListener("click",()=>x(!1)),u.addEventListener("click",()=>x(!1)),l.addEventListener("click",v=>{v.target===l&&x(!1)}),l.addEventListener("keydown",v=>{v.key==="Escape"?(v.stopPropagation(),x(!1)):v.key==="Enter"&&(v.stopPropagation(),x(!0))}),!Ii(l)){i(!1);return}(o?f:g).focus()})}function hh(t={}){let{title:e="\u8F93\u5165",message:r="",defaultValue:s="",placeholder:n="",confirmText:o="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",validate:i=null,width:l="380px"}=t;return new Promise(c=>{let{overlay:d,body:u,footer:y,closeBtn:p}=ki({title:e,width:l,wide:!1}),f=(Ko()||document).activeElement;r&&u.appendChild(m("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6",marginBottom:"8px"},text:r}));let g=m("input",{className:"yyt-input",attrs:{type:"text",placeholder:n}});g.value=String(s||""),u.appendChild(g);let h=m("div",{style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px",marginTop:"6px",minHeight:"14px"}});u.appendChild(h);let x=m("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:a}),v=m("button",{className:"yyt-btn yyt-btn-primary",attrs:{type:"button"},text:o});y.appendChild(x),y.appendChild(v);let T=!1,L=_=>{if(!T){T=!0,Mi(d);try{f?.focus()}catch{}c(_)}},M=()=>{let _=g.value.trim();if(typeof i=="function"){let A=i(_);if(A){h.textContent=A,g.focus();return}}L(_||null)};if(v.addEventListener("click",M),x.addEventListener("click",()=>L(null)),p.addEventListener("click",()=>L(null)),d.addEventListener("click",_=>{_.target===d&&L(null)}),g.addEventListener("keydown",_=>{_.key==="Enter"&&(_.stopPropagation(),M())}),d.addEventListener("keydown",_=>{_.key==="Escape"&&(_.stopPropagation(),L(null))}),!Ii(d)){c(null);return}g.focus(),g.select()})}function bh(t={}){let{title:e="",body:r=null,buttons:s=[],width:n="480px",wide:o=!1,onMounted:a=null}=t,{overlay:i,body:l,footer:c,closeBtn:d}=ki({title:e,width:n,wide:o}),u=(Ko()||document).activeElement;r&&j(l,r);let y=!1,p,f=new Promise(h=>{p=h}),g=h=>{if(!y){y=!0,Mi(i);try{u?.focus()}catch{}p(h)}};for(let h of s){let x=h.variant==="primary"?"yyt-btn-primary":h.variant==="danger"?"yyt-btn-danger":"yyt-btn-secondary",v=m("button",{className:`yyt-btn ${x}`,attrs:{type:"button"},text:h.label||""});v.addEventListener("click",()=>{try{h.onClick?.(g,l)}catch(T){console.error("[dialog.custom] button onClick error",T),g(null)}}),c.appendChild(v)}if(d.addEventListener("click",()=>g(null)),i.addEventListener("click",h=>{h.target===i&&g(null)}),i.addEventListener("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),g(null))}),!Ii(i))p(null);else if(typeof a=="function")try{a({overlay:i,body:l,close:g})}catch{}return{el:i,body:l,close:g,result:f}}var gh,Ce,Uo=D(()=>{dt();gh=0;Ce={confirm:mh,prompt:hh,custom:bh}});function Ri(t={}){let{id:e=null,items:r=[],align:s="start",gap:n="8px",wrap:o=!0}=t,i=m("div",{className:"yyt-toolbar",style:{display:"flex",alignItems:"center",justifyContent:{start:"flex-start",end:"flex-end",center:"center","space-between":"space-between"}[s]||"flex-start",gap:n,flexWrap:o?"wrap":"nowrap"}}),l=[];for(let c of r)c&&(j(i,c),l.push(c));return{...Me({id:e,kind:"toolbar"}),el:i,_children:l,addItem(c){c&&(j(i,c),l.push(c))},clear(){for(;i.firstChild;)i.removeChild(i.firstChild);for(let c of l)try{c?.destroy?.()}catch{}l.length=0}}}var Od=D(()=>{dt()});function Pi(t={}){let{id:e=null,name:r="",desc:s="",active:n=!1,disabled:o=!1,builtin:a=!1,readonly:i=!1,metaChips:l=[],actions:c=[],onClick:d=null}=t,u=a||i,y=["yyt-list-row","yyt-preset-list-item"];n&&y.push("yyt-list-row-active"),o&&y.push("yyt-list-row-disabled"),u&&y.push("yyt-preset-list-item-readonly");let p=m("div",{className:y.join(" "),style:o?{opacity:"0.5",pointerEvents:"none"}:null}),f=m("span",{className:"yyt-preset-dot",style:{width:"8px",height:"8px",borderRadius:"50%",flexShrink:"0",marginRight:"8px",background:n?"var(--yyt-accent, #7bb7ff)":"transparent",border:n?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))",transition:"background 0.15s ease"}});p.appendChild(f);let g=m("div",{className:"yyt-list-row-main",style:{flex:"1",minWidth:"0"}}),h=m("div",{style:{display:"flex",alignItems:"center",gap:"8px"}}),x=m("div",{className:"yyt-list-row-name",text:r,style:{fontWeight:"600"}});h.appendChild(x),a&&h.appendChild(m("span",{className:"yyt-preset-badge yyt-preset-badge-builtin",text:"\u5185\u7F6E",style:{fontSize:"10px",padding:"2px 6px",borderRadius:"999px",background:"var(--yyt-surface-3, rgba(255,255,255,0.06))",color:"var(--yyt-text-muted, rgba(255,255,255,0.5))",border:"1px solid var(--yyt-border, rgba(255,255,255,0.1))"}})),g.appendChild(h);let v=null;s&&(v=m("div",{className:"yyt-list-row-desc",text:s}),g.appendChild(v)),p.appendChild(g);let T=null;if(Array.isArray(l)&&l.length){T=m("div",{className:"yyt-preset-meta-chips",style:{display:"flex",gap:"6px",flexWrap:"wrap"}});for(let A of l)A&&T.appendChild(m("span",{className:"yyt-preset-meta-chip",text:String(A),style:{fontSize:"11px",padding:"2px 8px",borderRadius:"999px",background:"var(--yyt-surface-2, rgba(255,255,255,0.04))",color:"var(--yyt-text-secondary, rgba(255,255,255,0.6))",border:"1px solid var(--yyt-border-soft, rgba(255,255,255,0.04))"}}));p.appendChild(T)}let L=null,M=u?c.filter(A=>A?._kind!=="button"||!A._destructive):c;if(M&&M.length){L=m("div",{className:"yyt-list-row-actions"});for(let A of M)j(L,A);p.appendChild(L)}typeof d=="function"&&(p.style.cursor="pointer",p.addEventListener("click",A=>{A.target.closest(".yyt-list-row-actions")||(d(A,_),_._emitter.emit("click",A))}));let _={...Me({id:e,kind:"presetListItem"}),el:p,_children:c||[],setActive(A){A?p.classList.add("yyt-list-row-active"):p.classList.remove("yyt-list-row-active"),f.style.background=A?"var(--yyt-accent, #7bb7ff)":"transparent",f.style.border=A?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))"},setName(A){x.textContent=A==null?"":String(A)},setDesc(A){if(v)v.textContent=A==null?"":String(A);else{if(!A)return;v=m("div",{className:"yyt-list-row-desc",text:A}),g.appendChild(v)}},setDisabled(A){A?(p.classList.add("yyt-list-row-disabled"),p.style.opacity="0.5",p.style.pointerEvents="none"):(p.classList.remove("yyt-list-row-disabled"),p.style.opacity="",p.style.pointerEvents="")}};return _}var Bd=D(()=>{dt()});function Ni(t={}){let{id:e=null,values:r=[],placeholder:s="\u8F93\u5165\u540E\u56DE\u8F66\u6DFB\u52A0",suggestions:n=null,allowDuplicates:o=!1,maxChips:a=0,chipVariant:i="default",onChange:l=null,onAdd:c=null,onRemove:d=null}=t,u=n&&n.length?`yyt-chip-dl-${++xh}`:null,y=m("div",{className:"yyt-chip-group",style:{display:"flex",flexWrap:"wrap",gap:"6px",padding:"6px 8px",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-control-border, rgba(255,255,255,0.08))",background:"var(--yyt-control-bg, transparent)",minHeight:"36px",alignItems:"center"}}),p=[],f={type:"text",placeholder:s,autocomplete:"off"};u&&(f.list=u);let g=m("input",{className:"yyt-chip-input",attrs:f,style:{flex:"1 1 auto",minWidth:"120px",border:"none",outline:"none",background:"transparent",color:"var(--yyt-text, inherit)",fontSize:"12px",padding:"4px 0"}}),h=null;if(u){h=m("datalist",{attrs:{id:u}});for(let R of n)h.appendChild(m("option",{attrs:{value:String(R)}}));y.appendChild(h)}function x(){return i==="danger"?"rgba(248,113,113,0.12)":i==="soft"?"var(--yyt-surface-2, rgba(255,255,255,0.04))":"var(--yyt-accent-soft, rgba(123,183,255,0.15))"}function v(){return i==="danger"?"rgba(248,113,113,0.25)":"var(--yyt-border, rgba(255,255,255,0.1))"}function T(){return i==="danger"?"#f87171":"var(--yyt-text, inherit)"}function L(R){let S=m("span",{className:"yyt-chip",style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"3px 4px 3px 10px",borderRadius:"999px",background:x(),border:`1px solid ${v()}`,color:T(),fontSize:"11px",fontWeight:"500"}});S.appendChild(m("span",{text:R,style:{lineHeight:"1"}}));let U=m("button",{attrs:{type:"button","aria-label":"remove"},text:"\xD7",style:{border:"none",background:"transparent",color:"inherit",cursor:"pointer",padding:"0 4px",fontSize:"14px",lineHeight:"1",opacity:"0.7"}});return U.addEventListener("click",V=>{V.stopPropagation(),A(R)}),U.addEventListener("mouseenter",()=>{U.style.opacity="1"}),U.addEventListener("mouseleave",()=>{U.style.opacity="0.7"}),S.appendChild(U),S}function M(){let R=[];for(let S of y.children)S===g||S===h||R.push(S);for(let S of R)y.removeChild(S);for(let S of p)y.insertBefore(L(S),g)}function _(R){let S=String(R||"").trim();if(!S||!o&&p.includes(S)||a>0&&p.length>=a)return!1;p.push(S),M();try{c?.(S,p.slice())}catch{}try{l?.(p.slice())}catch{}return H._emitter.emit("change",p.slice()),!0}function A(R){let S=p.indexOf(R);if(S<0)return!1;p.splice(S,1),M();try{d?.(R,p.slice())}catch{}try{l?.(p.slice())}catch{}return H._emitter.emit("change",p.slice()),!0}function F(){if(p.length!==0){p=[],M();try{l?.([])}catch{}H._emitter.emit("change",[])}}for(let R of r){let S=String(R||"").trim();S&&(!o&&p.includes(S)||p.push(S))}y.appendChild(g),M(),g.addEventListener("keydown",R=>{if(R.key==="Enter"||R.key===","){R.preventDefault();let S=g.value.trim();S&&_(S)&&(g.value="")}else R.key==="Backspace"&&!g.value&&p.length&&A(p[p.length-1])}),g.addEventListener("blur",()=>{let R=g.value.trim();R&&_(R)&&(g.value="")}),y.addEventListener("click",R=>{R.target===y&&g.focus()});let H={...Me({id:e,kind:"chipGroup"}),el:y,get(){return p.slice()},set(R){p=[];for(let S of Array.isArray(R)?R:[]){let U=String(S||"").trim();U&&(!o&&p.includes(U)||p.push(U))}M();try{l?.(p.slice())}catch{}H._emitter.emit("change",p.slice())},addChip:_,removeChip:A,clear:F,setSuggestions(R){if(h){for(;h.firstChild;)h.removeChild(h.firstChild);for(let S of R||[])h.appendChild(m("option",{attrs:{value:String(S)}}))}}};return H}var xh,zd=D(()=>{dt();xh=0});var yr=D(()=>{kd();Id();Md();Rd();Pd();Nd();Dd();$d();Ld();Uo();Od();Bd();zd();dt()});function Kd(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function wh(t){return typeof t=="string"&&t.startsWith("builtin_")}function Rr(t={}){let{id:e,kind:r="generic",panelTitle:s="\u9884\u8BBE\u7BA1\u7406",panelHint:n="",store:o,renderEditor:a,renderExtras:i=null,renderListItemMeta:l=null,hasSwitchToButton:c=!1,onSwitchTo:d=null}=t;if(!o||typeof o.listPresets!="function")throw new Error("createPresetManagerPanel: store \u7F3A\u5C11\u5FC5\u8981\u7684 listPresets \u65B9\u6CD5");if(typeof a!="function")throw new Error("createPresetManagerPanel: \u5FC5\u987B\u63D0\u4F9B renderEditor");return{id:e,kind:r,renderTo(u){let y=Kd(u);if(!y)return;if(y._yytPresetPanelCleanup)try{y._yytPresetPanelCleanup()}catch{}let p=()=>this.renderTo(u),f=o.listPresets(),g=typeof o.getCurrentPresetId=="function"?o.getCurrentPresetId():"",h=m("div",{className:"yyt-preset-manager-panel",style:{display:"flex",flexDirection:"column",gap:"14px"}});if(s||n){let R=m("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});s&&R.appendChild(m("div",{text:s,style:{fontSize:"15px",fontWeight:"700",color:"var(--yyt-text)"}})),n&&R.appendChild(m("div",{text:n,style:{fontSize:"12px",color:"var(--yyt-text-secondary)",lineHeight:"1.6"}})),h.appendChild(R)}let x=[],v=m("div",{style:{display:"flex",flexDirection:"column"}});if(f.length===0)v.appendChild(m("div",{text:'\u6682\u65E0\u9884\u8BBE\u3002\u70B9\u51FB\u4E0B\u65B9"\u65B0\u5EFA"\u521B\u5EFA\u7B2C\u4E00\u4E2A\u9884\u8BBE\u3002',style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"12px 0",textAlign:"center"}}));else for(let R of f){let S=R.id===g,U=wh(R.id),V=typeof l=="function"?l(R)||[]:[],fe=[];c&&typeof d=="function"&&fe.push(ce({label:S?"\u2713 \u5DF2\u52A0\u8F7D":"\u52A0\u8F7D",size:"small",variant:S?"ghost":"primary",disabled:S,onClick:Ae=>{Ae.stopPropagation();try{d(R.id)}catch(oe){ls.warn("onSwitchTo \u5F02\u5E38",{err:oe})}p()}})),fe.push(ce({label:"\u590D\u5236",size:"small",variant:"ghost",title:"\u590D\u5236\u4E3A\u7528\u6237\u9884\u8BBE",onClick:async Ae=>{Ae.stopPropagation();try{let oe=o.duplicatePreset(R.id);oe?.id&&typeof o.setCurrentPresetId=="function"&&o.setCurrentPresetId(oe.id),p()}catch(oe){ls.warn("duplicate \u5F02\u5E38",{err:oe})}}})),U||(fe.push(ce({label:"\u270E",size:"small",variant:"ghost",title:"\u91CD\u547D\u540D",onClick:async Ae=>{Ae.stopPropagation();let oe=await Ce.prompt({title:"\u91CD\u547D\u540D\u9884\u8BBE",defaultValue:R.name,placeholder:"\u9884\u8BBE\u540D",validate:Ze=>Ze?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});oe&&oe!==R.name&&(o.renamePreset(R.id,oe),p())}})),fe.push(ce({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664",onClick:async Ae=>{Ae.stopPropagation(),await Ce.confirm({title:"\u5220\u9664\u9884\u8BBE",message:`\u786E\u8BA4\u5220\u9664\u300C${R.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})&&(o.deletePreset(R.id),p())}})));let Ve=Pi({id:R.id,name:R.name,desc:R.description,active:S,builtin:U,metaChips:V,actions:fe,onClick:()=>{typeof o.setCurrentPresetId=="function"&&o.setCurrentPresetId(R.id),p()}});v.appendChild(Ve.el)}let T=ce({label:"+ \u65B0\u5EFA\u9884\u8BBE",size:"small",variant:"primary",onClick:async()=>{let R=await Ce.prompt({title:"\u65B0\u5EFA\u9884\u8BBE",placeholder:"\u9884\u8BBE\u540D\uFF08\u5FC5\u586B\uFF09",validate:S=>S?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});if(R)try{let S=o.createPreset({name:R});S?.id&&typeof o.setCurrentPresetId=="function"&&o.setCurrentPresetId(S.id),p()}catch(S){ls.warn("createPreset \u5931\u8D25",{err:S}),await Ce.confirm({title:"\u521B\u5EFA\u5931\u8D25",message:String(S?.message||S),confirmText:"\u786E\u5B9A"})}}}),L=Ft({heading:"\u9884\u8BBE\u9009\u62E9",icon:"\u{1F4CB}",actions:[T.el],content:[v]});x.push(L),h.appendChild(L.el);let M=g?f.find(R=>R.id===g):null;if(M){let R=null;try{R=a(M,{readonly:!1,onChange:U=>{if(!(!U||typeof U!="object"))try{o.updatePreset(M.id,U)}catch(V){ls.warn("updatePreset \u5931\u8D25",{err:V})}},refresh:p})}catch(U){ls.error("renderEditor \u5F02\u5E38",{err:U}),R=m("div",{text:`\u7F16\u8F91\u5668\u6E32\u67D3\u5F02\u5E38\uFF1A${U?.message||U}`,style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px"}})}let S=Ft({heading:`\u7F16\u8F91\u300C${M.name}\u300D`,icon:"\u270E",content:[R].filter(Boolean)});if(x.push(S),h.appendChild(S.el),typeof i=="function"){let U=null;try{U=i(M,{refresh:p})}catch(V){ls.warn("renderExtras \u5F02\u5E38",{err:V})}if(U){let V=Ft({heading:"\u9644\u52A0",icon:"\u{1F527}",content:[U]});x.push(V),h.appendChild(V.el)}}}else f.length>0&&h.appendChild(m("div",{text:"\u8BF7\u5728\u4E0A\u65B9\u5217\u8868\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE\u4EE5\u7F16\u8F91",style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"16px",textAlign:"center",border:"1px dashed var(--yyt-border, rgba(255,255,255,0.08))",borderRadius:"var(--yyt-radius-sm, 6px)"}}));let _=ce({label:"\u2B06 \u5BFC\u5165",size:"small",variant:"ghost",onClick:async()=>{await vh(o,p)}}),A=ce({label:"\u2B07 \u5BFC\u51FA",size:"small",variant:"ghost",onClick:()=>{Th(o,r)}}),F=ce({label:"\u6E05\u7A7A\u5168\u90E8",size:"small",variant:"ghost",onClick:async()=>{await Ce.confirm({title:"\u6E05\u7A7A\u6240\u6709\u9884\u8BBE",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u7528\u6237\u9884\u8BBE\uFF08\u5185\u7F6E\u9884\u8BBE\u4E0D\u53D7\u5F71\u54CD\uFF09\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002",confirmText:"\u6E05\u7A7A",danger:!0})&&typeof o.resetAll=="function"&&(o.resetAll(),p())}}),H=Ri({items:[_,A,F],align:"end",gap:"8px"});h.appendChild(H.el),y.innerHTML="",y.appendChild(h),y._yytPresetPanelCleanup=()=>{for(let R of x)try{R.destroy()}catch{}delete y._yytPresetPanelCleanup}},destroy(u){let y=Kd(u);if(y?._yytPresetPanelCleanup)try{y._yytPresetPanelCleanup()}catch{}},getStyles(){return""}}}async function vh(t,e){if(typeof t.importPresets!="function"){await Ce.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u5165",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u5165\u3002",confirmText:"\u786E\u5B9A"});return}let r=m("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34\u5BFC\u51FA\u7684 JSON"},style:{width:"100%",minHeight:"180px",fontSize:"12px",fontFamily:"monospace"}}),s=Ce.custom({title:"\u5BFC\u5165\u9884\u8BBE",width:"520px",body:r,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:o=>o(null)},{label:"\u4ECE\u6587\u4EF6\u2026",variant:"ghost",onClick:()=>{let o=m("input",{attrs:{type:"file",accept:"application/json,.json"}});o.addEventListener("change",()=>{let a=o.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{r.value=String(i.result||""),r.focus()},i.readAsText(a)}),o.click()}},{label:"\u5BFC\u5165",variant:"primary",onClick:async o=>{let a=r.value.trim();if(!a){o(null);return}let i;try{i=JSON.parse(a)}catch(l){await Ce.confirm({title:"JSON \u89E3\u6790\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"});return}try{let l=t.importPresets(i);o(l)}catch(l){await Ce.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"})}}}]});setTimeout(()=>r.focus(),0);let n=await s.result;n&&(n.added>0||n.imported>0)&&e()}function Th(t,e){if(typeof t.exportAll!="function"){Ce.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u51FA",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u51FA\u3002",confirmText:"\u786E\u5B9A"});return}let r=t.exportAll(),s=JSON.stringify(r,null,2),n=m("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});n.value=s,n.readOnly=!0,Ce.custom({title:`\u5BFC\u51FA ${e||""} \u9884\u8BBE`,width:"600px",body:n,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:o=>o(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(s)}catch{n.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let o=new Blob([s],{type:"application/json"}),a=URL.createObjectURL(o),i=m("a",{attrs:{href:a,download:`${e||"preset"}_${Date.now()}.json`}});document.body.appendChild(i),i.click(),setTimeout(()=>{try{document.body.removeChild(i)}catch{}try{URL.revokeObjectURL(a)}catch{}},100)}catch(o){ls.warn("\u4E0B\u8F7D\u5931\u8D25",{err:o})}}}]})}var ls,Un=D(()=>{yr();W();ls=I.createScope("PresetManagerBase")});var jd={};re(jd,{ApiPresetPanel:()=>Ud,default:()=>Ah});function _h(t,{onChange:e,readonly:r}){let s=m("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}}),n=t.apiConfig||{};j(s,vt({label:"\u63CF\u8FF0",control:Xe({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})})),j(s,wt({label:"\u4F7F\u7528\u4E3B API",hint:"\u5F00\u542F\u540E\u5FFD\u7565\u4E0B\u65B9 URL/Key/Model\uFF0C\u76F4\u63A5\u590D\u7528 SillyTavern \u4E3B\u8FDE\u63A5",checked:n.useMainApi!==!1,disabled:r,onChange:i=>e({apiConfig:{...n,useMainApi:i}})})),j(s,wt({label:"\u6D41\u5F0F\u8F93\u51FA\uFF08stream\uFF09",hint:"\u9010\u5B57\u63A5\u6536\u54CD\u5E94",checked:n.stream===!0,disabled:r,onChange:i=>e({apiConfig:{...n,stream:i}})})),j(s,vt({label:"API URL",control:Xe({value:n.url||"",placeholder:"https://api.example.com/v1",disabled:r,onChange:i=>e({apiConfig:{...n,url:i}})})})),j(s,vt({label:"API Key",control:(()=>{let i=Xe({value:n.apiKey||"",placeholder:"sk-...",disabled:r,onChange:l=>e({apiConfig:{...n,apiKey:l}})});try{i.el.setAttribute("type","password")}catch{}return i})()})),j(s,vt({label:"\u6A21\u578B",control:Xe({value:n.model||"",placeholder:"gpt-4 / gemini-pro / claude-...",disabled:r,onChange:i=>e({apiConfig:{...n,model:i}})})}));let o=m("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"10px"}});function a(i,l,c,d="1"){let u=m("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});u.appendChild(m("label",{text:i,style:{fontSize:"11px",color:"var(--yyt-text-secondary)",fontWeight:"600"}}));let y=m("input",{className:"yyt-input",attrs:{type:"number",step:d,disabled:r?"disabled":null},style:{padding:"6px 10px",fontSize:"12px"}});return y.value=String(n[l]??c),y.addEventListener("change",()=>{let p=Number(y.value);Number.isFinite(p)&&e({apiConfig:{...n,[l]:p}})}),u.appendChild(y),u}return o.appendChild(a("max_tokens","max_tokens",4096,"1")),o.appendChild(a("temperature","temperature",.7,"0.05")),o.appendChild(a("top_p","top_p",.9,"0.05")),j(s,o),s}function Eh(t){let e=t.apiConfig||{},r=[];return e.useMainApi!==!1?r.push("\u4E3B API"):r.push(e.model||"\u81EA\u5B9A\u4E49"),t.starred&&r.push("\u2605"),r}var Pr,Sh,Ud,Ah,Fd=D(()=>{yr();$n();W();Un();Pr=I.createScope("ApiPresetPanel"),Sh={listPresets(){return Ir().map(t=>({id:t.name,name:t.name,description:t.description||"",apiConfig:t.apiConfig||{},starred:t.starred===!0,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=ns(t);return e?{id:e.name,...e,description:e.description||""}:null},getCurrentPresetId(){return bi()||""},setCurrentPresetId(t){if(!t)return!1;try{return!!Oo(t)}catch(e){return Pr.warn("switchToPreset \u5931\u8D25",{err:e}),!1}},createPreset(t){let e=String(t?.name||"").trim();if(!e)return Pr.warn("createPreset: name \u7F3A\u5931"),null;let r=$o({name:e,description:t?.description||"",apiConfig:t?.apiConfig||{}});return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(Pr.warn("createPreset \u5931\u8D25",{msg:r?.message}),null)},updatePreset(t,e){if(!t)return null;let r=gi(t,e);return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(Pr.warn("updatePreset \u5931\u8D25",{id:t,msg:r?.message}),null)},deletePreset(t){if(!t)return!1;try{let e=Lo(t);return!!(e?.success??e===!0)}catch(e){return Pr.warn("deletePreset \u5931\u8D25",{err:e}),!1}},duplicatePreset(t,e={}){if(!t)return null;let r=e.nameSuffix||"_\u526F\u672C",s=`${t}${r}`;try{let n=hi(t,s);return n?.success?{id:n.preset.name,...n.preset,description:n.preset.description||""}:null}catch(n){return Pr.warn("duplicatePreset \u5931\u8D25",{err:n}),null}},renamePreset(t,e){if(!t||!e)return null;try{let r=mi(t,e);return r?.success?{id:r.preset?.name||e,...r.preset,description:r.preset?.description||""}:null}catch(r){return Pr.warn("renamePreset \u5931\u8D25",{err:r}),null}},exportAll(){let t=xi();try{return{version:1,exportedAt:Date.now(),presets:JSON.parse(t)}}catch{return{version:1,exportedAt:Date.now(),presets:[]}}},importPresets(t){if(!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[t],r=JSON.stringify(e);return{added:wi(r,{overwrite:!1})?.imported||0}},resetAll(){let t=Ir();for(let e of t)try{Lo(e.name)}catch{}}};Ud=Rr({id:"apiPresetPanel",kind:"api",panelTitle:"API \u9884\u8BBE",panelHint:'\u7BA1\u7406\u591A\u7EC4 API \u8FDE\u63A5\u914D\u7F6E\u3002\u70B9\u51FB"\u52A0\u8F7D"\u6FC0\u6D3B\u67D0\u4E2A\u9884\u8BBE\u4F5C\u4E3A\u5F53\u524D API\uFF1B\u5176\u4ED6\u5DE5\u5177\u53EF\u5728\u914D\u7F6E\u9762\u677F\u4E2D\u6309\u9884\u8BBE\u540D\u5F15\u7528\u3002',store:Sh,renderEditor:_h,renderListItemMeta:Eh,hasSwitchToButton:!0,onSwitchTo:t=>{try{Oo(t)}catch(e){Pr.warn("switchToPreset",{err:e})}}}),Ah=Ud});function $i(){return`wb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Dr(){let t=Se.get(Di);return!t||typeof t!="object"?{}:t}function Fo(t){Se.set(Di,t)}function ds(t){return typeof t=="string"&&t.startsWith(Ch)}function Wd(t){return ds(t)&&jo.find(e=>e.id===t)||null}function Li(t){if(!Array.isArray(t)){jo=[];return}jo=t.map(e=>Nr({...e,id:String(e?.id||"")})).filter(e=>ds(e.id))}function Nr(t={}){let e=String(t.id||$i()),r=Array.isArray(t.bookList)?t.bookList.map(s=>({bookName:String(s?.bookName||""),enabled:s?.enabled!==!1,entryOverrides:s?.entryOverrides&&typeof s.entryOverrides=="object"?s.entryOverrides:{}})).filter(s=>s.bookName):[];return{id:e,name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),bindingMode:t.bindingMode===fr.CUSTOM?fr.CUSTOM:fr.CHARACTER_CARD,includeDisabled:t.includeDisabled===!0,bookList:r,createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function kh(){let t=Dr(),e=new Set,r=[];for(let n of jo){let o=t[n.id];o?(r.push(Nr(o)),e.add(n.id)):r.push(n)}let s=Object.values(t).map(Nr).filter(n=>!e.has(n.id)).sort((n,o)=>o.updatedAt-n.updatedAt);return r.push(...s),r}function Fn(t){if(!t)return null;let e=Dr();return e[t]?Nr(e[t]):ds(t)?Wd(t):null}function Oi(){let t=Se.get(jn);return typeof t=="string"&&t?t:""}function Ih(){let t=Oi();return t?Fn(t):null}function Mh(t){if(t&&ds(t))return Se.set(jn,t),K.emit(B.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0;let e=Dr();return t&&!e[t]?(cs.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(Se.set(jn,t||""),K.emit(B.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0)}function Wo(t={}){let e=Nr({...t,id:$i(),createdAt:Date.now(),updatedAt:Date.now()}),r=Dr();return r[e.id]=e,Fo(r),K.emit(B.PRESET_CREATED,{kind:"worldbook",id:e.id}),cs.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function Hd(t,e={}){if(!t)return null;let r=Dr(),s=r[t];if(!s&&ds(t)&&(s=Wd(t)),!s)return cs.warn(`updatePreset \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),null;let n=Nr({...s,...e,id:t,createdAt:s.createdAt,updatedAt:Date.now()});return r[t]=n,Fo(r),K.emit(B.PRESET_UPDATED,{kind:"worldbook",id:t}),n}function Rh(t){if(!t)return!1;if(ds(t))return cs.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=Dr();return e[t]?(delete e[t],Fo(e),Oi()===t&&Se.set(jn,""),K.emit(B.PRESET_DELETED,{kind:"worldbook",id:t}),cs.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function Ph(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=Fn(t);return r?Wo({...r,id:void 0,name:`${r.name}${e}`}):null}function Nh(t,e){return ds(t)?(cs.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):Hd(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function Dh(){return{version:1,exportedAt:Date.now(),presets:Object.values(Dr()).map(Nr)}}function $h(t){if(!t||typeof t!="object")return{added:0,skipped:0};let e=Array.isArray(t.presets)?t.presets:[],r=Dr(),s=0,n=0;for(let o of e){let a=Nr({...o,id:$i(),createdAt:Date.now(),updatedAt:Date.now()});r[a.id]=a,s+=1}return Fo(r),s>0&&K.emit(B.PRESET_IMPORTED,{kind:"worldbook",count:s}),{added:s,skipped:n}}function Lh(){Se.set(Di,{}),Se.set(jn,""),cs.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u4E16\u754C\u4E66\u9884\u8BBE")}var cs,Di,jn,fr,Ch,jo,ut,js=D(()=>{Be();Ye();W();cs=I.createScope("WorldbookPresetStore"),Di="worldbook_presets",jn="worldbook_current_preset",fr=Object.freeze({CHARACTER_CARD:"character_card",CUSTOM:"custom"});Ch="builtin_worldbook_",jo=[];ut={listPresets:kh,getPreset:Fn,getCurrentPresetId:Oi,getCurrentPreset:Ih,setCurrentPresetId:Mh,createPreset:Wo,updatePreset:Hd,deletePreset:Rh,duplicatePreset:Ph,renamePreset:Nh,exportAll:Dh,importPresets:$h,resetAll:Lh,BINDING_MODES:fr}});function $r(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Ho(){return $r()?.SillyTavern||null}function be(t){return t==null?"":String(t).trim()}function Bh(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let r of e)if(typeof r=="string"&&r.trim())return r.trim();return""}function zh(t){let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||t?.is_user===!0?"user":t?.is_system===!0?"system":"assistant"}function Gd(t=""){let e=String(t||"").trim();if(!e)return"empty";let r=0;for(let s=0;s<e.length;s+=1)r=(r<<5)-r+e.charCodeAt(s),r|=0;return`fp_${Math.abs(r).toString(36)}`}function qd(t={}){let e=be(t.chatId)||"chat_default",r=be(t.messageId)||"latest";return`${e}::${r}`}function Vd(t={}){let e=qd(t),r=be(t.effectiveSwipeId)||"swipe:current",s=be(t.assistantContentFingerprint)||"empty";return`${e}::${r}::${s}`}function Kh(t={}){let e=Vd(t),r=be(t.eventType)||"MANUAL",s=be(t.traceId)||Jd("manual");return`${e}::${r}::${s}`}function Jd(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function Xd(){let t=Ho();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function Qd(t=[]){let e=[],r=null,s=null;return t.forEach((n,o)=>{let a=zh(n),i=Bh(n);if(!i)return;let l=be(n?.messageId??n?.message_id??n?.id??n?.mid??n?.mesid??n?.chat_index??o),c=be(n?.swipe_id??n?.swipeId??n?.swipe??""),d={role:a,content:i,sourceId:l,swipeId:c,raw:n,index:o};e.push(d),a==="user"&&(r=d),a==="assistant"&&(s=d)}),{messages:e,lastUserMessage:r,lastAiMessage:s}}function Uh(t,e,r){return be(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.this_chid??r?.id??"chat_default")||"chat_default"}async function Bi(){let t=Ho();if(!t)return null;try{let e=t.this_chid,r=t.characters||[];if(e>=0&&e<r.length){let s=r[e];return{id:e,name:s?.name||"",description:s?.description||"",personality:s?.personality||"",scenario:s?.scenario||"",firstMes:s?.first_mes||"",mesExample:s?.mes_example||""}}}catch(e){Oh.error("\u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function jh(t="",e=null){let r=String(t||""),s=e?.YouYouToolkit_toolOutputs;return s&&typeof s=="object"&&Object.values(s).forEach(n=>{let o=String(n?.blockText||n?.content||"").trim();o&&r.includes(o)&&(r=r.replace(o,"").trimEnd())}),r.trim()}function Fh(t,e={}){let r=Array.isArray(t?.messages)?t.messages:[],s=be(e.messageId),n=be(e.swipeId);if(!s)return t?.lastAiMessage||null;let o=r.filter(i=>i.role==="assistant"),a=o.find(i=>i.sourceId!==s?!1:n?be(i.swipeId)===n:!0);return a||o.find(i=>i.sourceId===s)||null}function Zd({api:t,stContext:e,character:r,conversation:s,targetAssistantMessage:n,runSource:o="MANUAL"}={}){let a=s?.messages||[],i=s?.lastUserMessage||null,l=be(n?.sourceId)||"",c=be(n?.swipeId)||"swipe:current",d=n?.content||"",u=jh(d,n?.raw||null),y=Gd(d),p=Gd(u),f=Uh(t,e,r),g=Jd(String(o||"manual").toLowerCase()),h=qd({chatId:f,messageId:l}),x=Vd({chatId:f,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:p});return{startedAt:Date.now(),runSource:o,traceId:g,chatId:f,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:h,slotRevisionKey:x,slotTransactionId:Kh({chatId:f,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:p,eventType:o,traceId:g}),executionKey:x,lastAiMessage:d,assistantContentFingerprint:y,assistantBaseText:u,assistantBaseFingerprint:p,lastAiMessageSwipeId:c,confirmedAssistantSwipeId:c,effectiveSwipeId:c,sourceMessageId:l,sourceSwipeId:c,lastUserMessage:i?.content||"",userMessage:i?.content||"",targetAssistantMessage:n,chatMessages:a,characterCard:r,chatHistory:a,input:{userMessage:i?.content||"",lastAiMessage:d,assistantBaseText:u,extractedContent:"",previousToolOutput:"",context:{character:r?.name||"",chatLength:a.length||0}},config:{},status:"pending"}}async function us({runSource:t="MANUAL"}={}){let e=Ho(),r=e?.getContext?.()||null,s=await Bi(),n=Xd(),o=Qd(n),a=o?.lastAiMessage||null;return Zd({api:e,stContext:r,character:s,conversation:o,targetAssistantMessage:a,runSource:t})}async function ps({messageId:t,swipeId:e="",runSource:r="AUTO"}={}){let s=Ho(),n=s?.getContext?.()||null,o=await Bi(),a=Xd(),i=Qd(a),l=Fh(i,{messageId:t,swipeId:e});return Zd({api:s,stContext:n,character:o,conversation:i,targetAssistantMessage:l,runSource:r})}var Oh,ys=D(()=>{W();Oh=I.createScope("ExecutionContext")});function Yo(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return $r()?.TavernHelper||null}function eu(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return $r()?.SillyTavern||null}function Fs(t){return Array.isArray(t)?Array.from(new Set(t.map(e=>String(e||"").trim()).filter(Boolean))):[]}function zi(t){if(Array.isArray(t))return t.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(t&&typeof t=="object"){let e={};return Object.keys(t).forEach(r=>{let s=t[r];Array.isArray(s)?e[r]=s.map(n=>typeof n=="string"?n:n&&typeof n=="object"?n.name||n.id||n.title||"[object]":String(n??"")):s&&typeof s=="object"?e[r]="[object]":e[r]=s}),e}return t}function Hh(t={}){let e=typeof t.content=="string"?t.content.trim():"";if(!e)return"";let r=[t.comment,t.key,t.keysecondary,t.text].map(s=>String(s||"").trim()).find(Boolean);return r&&r!==e?`## ${r}
${e}`:e}function Ui(){return Array.isArray(Ki)?[...Ki]:[]}async function tu(t){if(!t||typeof t.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(t.getCharLorebooks({type:"all"}));return Fs([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return fs.warn("\u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function Yh(t,e){if(t&&typeof t.getLorebooks=="function")try{let r=Fs(await Promise.resolve(t.getLorebooks()));if(r.length>0)return r}catch(r){fs.warn("\u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}if(e&&typeof e.getWorldBooks=="function")try{let r=await Promise.resolve(e.getWorldBooks()),s=Fs(Array.isArray(r)?r.map(n=>n?.name??n):[]);if(s.length>0)return s}catch(r){fs.warn("\u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}return[]}async function ji(){let t=Yo(),e=eu(),r={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!$r()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!$r()?.SillyTavern,helperKeys:t?Object.keys(t).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof t?.getLorebooks,getCharLorebooksType:typeof t?.getCharLorebooks,getLorebookEntriesType:typeof t?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{r.rawResults.getLorebooks=t&&typeof t.getLorebooks=="function"?zi(await Promise.resolve(t.getLorebooks())):"[unavailable]"}catch(a){r.errors.push(`getLorebooks: ${a?.message||a}`)}try{r.rawResults.getCharLorebooks=t&&typeof t.getCharLorebooks=="function"?zi(await Promise.resolve(t.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(a){r.errors.push(`getCharLorebooks: ${a?.message||a}`)}try{r.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?zi(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(a){r.errors.push(`getWorldBooks: ${a?.message||a}`)}let s=await tu(t),n=await Yh(t,e),o=Fs([...s,...n]);return r.characterWorldbooks=[...s],r.allWorldbooks=[...n],r.combinedWorldbooks=[...o],Wh=r,Ki=o,[...o]}async function Go(t){let e="";if(typeof t=="string"?e=t:t&&typeof t=="object"&&(e=t?.worldbooks?.presetId||""),!e)return"";let r=Fn(e);if(!r)return fs.warn(`buildSelectedWorldbookContent: \u9884\u8BBE\u4E0D\u5B58\u5728 ${e}`),"";let s=r.includeDisabled===!0,n=[];if(r.bindingMode==="character_card"){let l=Yo(),c=eu(),d=await tu(l),u=new Map((r.bookList||[]).map(y=>[String(y.bookName||""),y]));for(let y of Fs(d)){let p=u.get(y);p&&p.enabled===!1||n.push(y)}}else n=(r.bookList||[]).filter(l=>l&&l.bookName&&l.enabled!==!1).map(l=>l.bookName);if(n=Fs(n),n.length===0)return"";let o=Yo();if(!o||typeof o.getLorebookEntries!="function")return fs.warn("TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let a=new Map((r.bookList||[]).map(l=>[l.bookName,l.entryOverrides||{}])),i=[];for(let l of n)try{let c=await o.getLorebookEntries(l),d=Array.isArray(c)?c:[],u=a.get(l)||{},p=d.filter(f=>s||f?.enabled!==!1&&!f?.disable).filter(f=>{let g=u[String(f?.uid??"")];return g&&typeof g.enabled=="boolean"?g.enabled:!0}).map(Hh).filter(Boolean).join(`

`);p&&i.push(`[\u4E16\u754C\u4E66\uFF1A${l}]
${p}`)}catch(c){fs.warn(`\u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${l}`,c)}return i.join(`

---

`)}async function ru(t){if(!t)return[];let e=Yo();if(!e||typeof e.getLorebookEntries!="function")return[];try{let r=await e.getLorebookEntries(t);return Array.isArray(r)?r:[]}catch(r){return fs.warn(`getEntriesForBook \u5931\u8D25: ${t}`,r),[]}}var fs,Ki,Wh,qo=D(()=>{ys();W();js();fs=I.createScope("ToolWorldbookService"),Ki=[],Wh=null});var au={};re(au,{WorldbookPresetPanel:()=>ou,default:()=>Zh});function Gh(t){return t===fr.CUSTOM?"\u81EA\u5B9A\u4E49":"\u8DDF\u968F\u89D2\u8272\u5361"}function su(t,e,r){let s=[...t.bookList],n=s.findIndex(o=>o.bookName===e);n>=0?s[n]={...s[n],enabled:r}:s.push({bookName:e,enabled:r,entryOverrides:{}}),ut.updatePreset(t.id,{bookList:s})}function qh(t,e){let r=t.bookList.filter(s=>s.bookName!==e);ut.updatePreset(t.id,{bookList:r})}async function Vh(t,e){let r=Ui();if(!r.length)try{r=await ji()}catch{}let s=new Set(t.bookList.map(d=>d.bookName)),n=r.filter(d=>!s.has(d));if(!n.length){await Ce.confirm({title:"\u6CA1\u6709\u53EF\u6DFB\u52A0\u7684\u4E16\u754C\u4E66",message:"\u5BBF\u4E3B\u672A\u63D0\u4F9B\u66F4\u591A\u53EF\u7528\u4E16\u754C\u4E66\uFF0C\u6216\u7F13\u5B58\u5185\u5168\u90E8\u5DF2\u52A0\u5165\u6B64\u9884\u8BBE\u3002",confirmText:"\u786E\u5B9A"});return}let o=m("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}}),a=m("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${n.length} \u672C\u4E16\u754C\u4E66\u2026`,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});o.appendChild(a);let i=m("div",{style:{display:"flex",flexDirection:"column",gap:"4px",maxHeight:"320px",overflowY:"auto"}}),l=new Set,c=[];for(let d of n){let u=m("label",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 10px",cursor:"pointer",borderRadius:"var(--yyt-radius-sm, 6px)",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",fontSize:"12px"}}),y=m("input",{attrs:{type:"checkbox",value:d}});y.addEventListener("change",()=>{y.checked?l.add(d):l.delete(d)}),u.appendChild(y),u.appendChild(m("span",{text:d,style:{color:"var(--yyt-text)"}})),i.appendChild(u),c.push({el:u,search:d.toLowerCase()})}o.appendChild(i),a.addEventListener("input",()=>{let d=a.value.trim().toLowerCase();for(let u of c)u.el.style.display=!d||u.search.includes(d)?"":"none"}),Ce.custom({title:`\u6DFB\u52A0\u4E16\u754C\u4E66\uFF08${n.length} \u9879\u53EF\u9009\uFF09`,width:"480px",body:o,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:d=>d(null)},{label:"\u5168\u9009\u53EF\u89C1",variant:"ghost",onClick:()=>{for(let d of i.querySelectorAll("input[type=checkbox]")){let u=d.closest("label");(!u||u.style.display!=="none")&&(d.checked=!0,l.add(d.value))}}},{label:"\u6DFB\u52A0\u9009\u4E2D",variant:"primary",onClick:d=>{let u=Array.from(l);if(!u.length){d(null);return}let y=u.map(f=>({bookName:f,enabled:!0,entryOverrides:{}})),p=[...t.bookList,...y];ut.updatePreset(t.id,{bookList:p}),d(u.length)}}]}).result.then(d=>{d&&e&&e()})}function Jh(t,{onChange:e,readonly:r,refresh:s}){let n=m("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});j(n,vt({label:"\u63CF\u8FF0",control:Xe({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:u=>e({description:u})})})),j(n,vt({label:"\u7ED1\u5B9A\u6A21\u5F0F",hint:"\u8DDF\u968F\u89D2\u8272\u5361 = \u6CE8\u5165\u5F53\u524D\u89D2\u8272\u7ED1\u5B9A\u7684\u4E16\u754C\u4E66\uFF1B\u81EA\u5B9A\u4E49 = \u7528\u4E0B\u65B9\u624B\u52A8\u9009\u62E9\u7684\u5217\u8868",control:qe({value:t.bindingMode,disabled:r,options:[{value:fr.CHARACTER_CARD,label:"\u8DDF\u968F\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09"},{value:fr.CUSTOM,label:"\u81EA\u5B9A\u4E49\uFF08\u56FA\u5B9A\u5217\u8868\uFF09"}],onChange:u=>{e({bindingMode:u}),s&&s()}})})),j(n,wt({label:"\u5305\u542B\u7981\u7528\u8BCD\u6761",hint:"\u5F00\u542F\u540E\uFF1A\u6E90\u4E16\u754C\u4E66\u4E2D\u5DF2\u7981\u7528\u7684\u8BCD\u6761\u53EF\u88AB\u672C\u9884\u8BBE\u5F3A\u5236\u542F\u7528\u5E76\u6CE8\u5165",checked:t.includeDisabled,disabled:r,onChange:u=>e({includeDisabled:u})}));let o=t.bindingMode===fr.CHARACTER_CARD,a=Ui(),i=m("div",{style:{display:"flex",flexDirection:"column"}}),l=m("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px",gap:"8px"}});l.appendChild(m("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}},m("div",{text:o?"\u968F\u89D2\u8272\u5361\u6CE8\u5165\u7684\u4E16\u754C\u4E66":"\u9009\u4E2D\u7684\u4E16\u754C\u4E66",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:o?"\u4EE5\u4E0B\u6765\u81EA\u5F53\u524D\u89D2\u8272\u5361\u7684\u4E16\u754C\u4E66\u5C06\u88AB\u6CE8\u5165\uFF1B\u53EF\u5355\u72EC\u5173\u95ED\u67D0\u672C\uFF08\u4E0D\u5F71\u54CD\u5176\u4ED6\u5DE5\u5177\uFF09":'\u672C\u9884\u8BBE\u56FA\u5B9A\u6CE8\u5165\u4E0B\u5217\u4E16\u754C\u4E66\uFF1B\u70B9\u51FB"+ \u6DFB\u52A0"\u4ECE\u53EF\u7528\u5217\u8868\u591A\u9009',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.5"}})));let c=m("div",{style:{display:"flex",gap:"6px"}});!o&&!r&&c.appendChild(ce({label:"+ \u6DFB\u52A0",size:"small",onClick:()=>Vh(t,s)}).el),c.appendChild(ce({label:"\u{1F504} \u5237\u65B0",size:"small",variant:"ghost",onClick:async()=>{try{await ji()}catch(u){nu.warn("\u5237\u65B0\u5931\u8D25",{e:u})}s&&s()}}).el),l.appendChild(c),j(i,l);let d=[];o?a.length?d=a.map(u=>{let y=t.bookList.find(f=>f.bookName===u),p=y?y.enabled!==!1:!0;return zo({name:u,desc:p?"\u5DF2\u542F\u7528 \xB7 \u6574\u672C\u6CE8\u5165":"\u5DF2\u7981\u7528",actions:[wt({checked:p,disabled:r,onChange:f=>su(t,u,f)})]})}):d=[m("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5F53\u524D\u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014 \u5207\u6362\u5230"\u81EA\u5B9A\u4E49"\u53EF\u4EE5\u624B\u52A8\u9009\u62E9\u4EFB\u610F\u4E16\u754C\u4E66\u3002'})]:t.bookList.length?d=t.bookList.map(u=>{let y=Object.keys(u.entryOverrides||{}).filter(g=>{let h=u.entryOverrides[g];return h&&typeof h.enabled=="boolean"}).length,p=m("div",{style:{display:"flex",flexDirection:"column"}}),f=zo({name:u.bookName,desc:u.enabled===!1?"\u5DF2\u7981\u7528":`\u5DF2\u542F\u7528 \xB7 \u6574\u672C\u6CE8\u5165${y?` \xB7 ${y} \u6761 override`:""}`,actions:[ce({label:"\u25B8 \u8BCD\u6761",size:"small",variant:"ghost",title:"\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override",onClick:()=>Xh(p,t,u,r,s)}),wt({checked:u.enabled!==!1,disabled:r,onChange:g=>su(t,u.bookName,g)}),...r?[]:[ce({label:"\xD7",size:"small",variant:"ghost",title:"\u4ECE\u9884\u8BBE\u79FB\u9664",onClick:()=>{qh(t,u.bookName),s&&s()}})]]});return f?.el&&j(p,f.el),p}):d=[m("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u6DFB\u52A0"\u9009\u62E9\u4E16\u754C\u4E66\u52A0\u5165\u6B64\u9884\u8BBE\u3002'})];for(let u of d)u?.el?j(i,u.el):u instanceof Node&&j(i,u);return j(n,i),n}function Xh(t,e,r,s,n){let o=t.querySelector(".yyt-wb-entry-panel");if(o){o.remove();let l=t.querySelector('[title="\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override"]');l&&(l.textContent="\u25B8 \u8BCD\u6761");return}let a=t.querySelector('[title="\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override"]');a&&(a.textContent="\u25BE \u8BCD\u6761");let i=m("div",{className:"yyt-wb-entry-panel",style:{marginLeft:"18px",marginTop:"4px",padding:"8px 10px",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-border, rgba(255,255,255,0.06))",fontSize:"12px",display:"flex",flexDirection:"column",gap:"4px"}});i.appendChild(m("div",{text:"\u52A0\u8F7D\u4E2D\u2026",style:{color:"var(--yyt-text-muted)",padding:"4px 0"}})),t.appendChild(i),ru(r.bookName).then(l=>{if(!l.length){i.innerHTML="",i.appendChild(m("div",{text:"\u8BE5\u4E16\u754C\u4E66\u65E0\u8BCD\u6761",style:{color:"var(--yyt-text-muted)",padding:"4px 0"}}));return}let c=r.entryOverrides||{},d=m("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${l.length} \u4E2A\u8BCD\u6761\u2026`,autocomplete:"off"},style:{padding:"5px 8px",fontSize:"11px",marginBottom:"4px"}});i.innerHTML="",i.appendChild(d);let u=m("div",{style:{display:"flex",flexDirection:"column",gap:"2px",maxHeight:"240px",overflowY:"auto"}}),y=[];for(let p of l){let f=String(p.uid??""),g=p.comment||p.key||p.name||"",h=String(Array.isArray(g)?g[0]:g).trim()||`\u6761\u76EE ${p.uid}`,x=p.enabled===!1||p.disable===!0,v=c[f],T=v&&typeof v.enabled=="boolean",L=m("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"5px 8px",borderRadius:"4px",background:T?"rgba(123,183,255,0.08)":"transparent",opacity:x&&!T?"0.5":"1"}});L.appendChild(wt({checked:T?v.enabled:!x,disabled:s,onChange:_=>{let A=ut.getPreset(e.id);if(!A)return;let F=A.bookList.find(H=>H.bookName===r.bookName);F&&(F.entryOverrides=F.entryOverrides||{},F.entryOverrides[f]={enabled:_},ut.updatePreset(e.id,{bookList:[...A.bookList]}),L.style.background="rgba(123,183,255,0.08)",x&&(L.style.opacity=_?"1":"0.5"))}}).el);let M=m("span",{style:{flex:"1",minWidth:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:T?"var(--yyt-accent)":"var(--yyt-text)",fontSize:"11px"},text:h});if(L.appendChild(M),T){let _=m("span",{text:"\u2715",style:{cursor:"pointer",color:"var(--yyt-text-muted)",fontSize:"10px",flexShrink:"0"},attrs:{title:"\u6E05\u9664 override"}});_.addEventListener("click",()=>{if(s)return;let A=ut.getPreset(e.id);if(!A)return;let F=A.bookList.find(H=>H.bookName===r.bookName);!F||!F.entryOverrides||(delete F.entryOverrides[f],ut.updatePreset(e.id,{bookList:[...A.bookList]}),L.style.background="transparent",M.style.color="var(--yyt-text)",_.remove())}),L.appendChild(_)}u.appendChild(L),y.push({el:L,search:h.toLowerCase()})}i.appendChild(u),d.addEventListener("input",()=>{let p=d.value.trim().toLowerCase();for(let f of y)f.el.style.display=!p||f.search.includes(p)?"":"none"})}).catch(l=>{nu.warn("\u52A0\u8F7D\u8BCD\u6761\u5931\u8D25",l),i.innerHTML="",i.appendChild(m("div",{text:`\u52A0\u8F7D\u5931\u8D25\uFF1A${l?.message||l}`,style:{color:"var(--yyt-danger, #f87171)",padding:"4px 0"}}))})}function Qh(t){let e=[`${Gh(t.bindingMode)}`,`${t.bookList.length} \u672C`];return t.includeDisabled&&e.push("\u542B\u7981\u7528"),e}var nu,ou,Zh,iu=D(()=>{yr();js();qo();Uo();W();Un();nu=I.createScope("WorldbookPresetPanel");ou=Rr({id:"worldbookPresetPanel",kind:"worldbook",panelTitle:"\u4E16\u754C\u4E66\u9884\u8BBE",panelHint:"\u7BA1\u7406\u4E16\u754C\u4E66\u6CE8\u5165\u9884\u8BBE\u3002\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\uFF0C\u53EF\u7ED1\u5B9A\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09\u6216\u56FA\u5B9A\u5217\u8868\u3002",store:ut,renderEditor:Jh,renderListItemMeta:Qh}),Zh=ou});var Vi={};re(Vi,{MESSAGE_MACROS:()=>Mu,addTagRule:()=>xu,createRuleTemplate:()=>gu,default:()=>rb,deleteRulePreset:()=>Au,deleteRuleTemplate:()=>hu,deleteTagRule:()=>vu,escapeRegex:()=>gs,exportRulesConfig:()=>Cu,extractComplexTag:()=>cu,extractCurlyBraceTag:()=>Gi,extractHtmlFormatTag:()=>du,extractSimpleTag:()=>Yi,extractTagContent:()=>mr,generateTagSuggestions:()=>pu,getAllRulePresets:()=>_u,getAllRuleTemplates:()=>yu,getContentBlacklist:()=>Hs,getRuleTemplate:()=>fu,getTagRules:()=>Ws,importRulesConfig:()=>ku,isValidTagName:()=>Hi,loadRulePreset:()=>Eu,saveRulesAsPreset:()=>Su,scanTextForTags:()=>uu,setContentBlacklist:()=>Tu,setTagRules:()=>bu,shouldSkipContent:()=>Wi,testRegex:()=>Iu,updateRuleTemplate:()=>mu,updateTagRule:()=>wu});function eb(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...Fi],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function Tt(){return $.get(lu,eb())}function Jt(t){$.set(lu,t)}function Vo(){let t=Tt();return rt=t.ruleTemplates||[...Fi],Re=t.tagRules||[],mt=t.contentBlacklist||[],{ruleTemplates:rt,tagRules:Re,contentBlacklist:mt}}function gs(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Wi(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let r=t.toLowerCase();return e.some(s=>{let n=s.trim().toLowerCase();return n&&r.includes(n)})}function Hi(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!tb.includes(t.toLowerCase())}function Yi(t,e){if(!t||!e)return[];let r=[],s=gs(e),n=new RegExp(`<${s}>([\\s\\S]*?)<\\/${s}>`,"gi");[...t.matchAll(n)].forEach(l=>{l[1]&&r.push(l[1].trim())});let a=(t.match(new RegExp(`<${s}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${s}>`,"gi"))||[]).length;return a>i&&gr.warn(`\u53D1\u73B0 ${a-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),r}function Gi(t,e){if(!t||!e)return[];let r=[],s=gs(e),n=new RegExp(`\\{${s}\\|`,"gi"),o;for(;(o=n.exec(t))!==null;){let a=o.index,i=a+o[0].length,l=1,c=i;for(;c<t.length&&l>0;)t[c]==="{"?l++:t[c]==="}"&&l--,c++;if(l===0){let d=t.substring(i,c-1);d.trim()&&r.push(d.trim())}n.lastIndex=a+1}return r}function cu(t,e){if(!t||!e)return[];let r=e.split(",");if(r.length!==2)return gr.error(`\u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let s=r[0].trim(),n=r[1].trim(),o=n.match(/<\/(\w+)>/);if(!o)return gr.error(`\u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${n}`),[];let a=o[1],i=new RegExp(`${gs(s)}([\\s\\S]*?)<\\/${a}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(d=>{d[1]&&l.push(d[1].trim())}),l}function du(t,e){if(!t||!e)return[];let r=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!r)return gr.error(`\u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let s=r[1],n=[],o=new RegExp(`<${s}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${s}>`,"gi");[...t.matchAll(o)].forEach(c=>{c[1]&&n.push(c[1].trim())});let i=(t.match(new RegExp(`<${s}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${s}>`,"gi"))||[]).length;return i>l&&gr.warn(`\u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${s}> \u6807\u7B7E`),n}function mr(t,e,r=[]){if(!t)return"";if(!e||e.length===0)return t;let s=e.filter(d=>d.type==="exclude"&&d.enabled),n=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),o=e.filter(d=>d.type==="regex_exclude"&&d.enabled),a=t;for(let d of s)try{let u=new RegExp(`<${gs(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${gs(d.value)}>`,"gi");a=a.replace(u,"")}catch(u){gr.error("Error applying block exclusion rule:",{rule:d,error:u})}let i=[];if(n.length>0)for(let d of n){let u=[];try{if(d.type==="include")u.push(...Yi(a,d.value)),u.push(...Gi(a,d.value));else if(d.type==="regex_include"){let y=new RegExp(d.value,"gi");[...a.matchAll(y)].forEach(f=>{f[1]&&u.push(f[1])})}}catch(y){gr.error("Error applying inclusion rule:",{rule:d,error:y})}u.forEach(y=>i.push(y.trim()))}else i.push(a);let l=[];for(let d of i){for(let u of o)try{let y=new RegExp(u.value,"gi");d=d.replace(y,"")}catch(y){gr.error("Error applying cleanup rule:",{rule:u,error:y})}Wi(d,r)||l.push(d)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function uu(t,e={}){let r=performance.now(),{chunkSize:s=5e4,maxTags:n=100,timeoutMs:o=5e3}=e,a=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let u=0;u<t.length;u+=s){let y=t.slice(u,Math.min(u+s,t.length));if(c++,l+=y.length,performance.now()-r>o){gr.warn(`Tag scanning timed out after ${o}ms`);break}let p;for(;(p=i.exec(y))!==null&&a.size<n;){let f=(p[1]||p[2]).toLowerCase();Hi(f)&&a.add(f)}if(a.size>=n)break;c%5===0&&await new Promise(f=>setTimeout(f,0))}let d=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(d-r),processedChars:l,totalChars:t.length,chunkCount:c,tagsFound:a.size}}}function pu(t,e=25){let r=t.tags.slice(0,e);return{suggestions:r,stats:{totalFound:t.stats.tagsFound,finalCount:r.length}}}function yu(){return rt.length===0&&Vo(),rt}function fu(t){return rt.find(e=>e.id===t)}function gu(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return rt.push(e),qi(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function mu(t,e){let r=rt.findIndex(s=>s.id===t);return r===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(rt[r]={...rt[r],...e,updatedAt:new Date().toISOString()},qi(),{success:!0,template:rt[r],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function hu(t){let e=rt.findIndex(r=>r.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(rt.splice(e,1),qi(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function qi(){let t=Tt();t.ruleTemplates=rt,Jt(t)}function Ws(){return Re||Vo(),Re}function bu(t){Re=t||[];let e=Tt();e.tagRules=Re,Jt(e)}function xu(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};Re.push(e);let r=Tt();return r.tagRules=Re,Jt(r),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function wu(t,e){if(t<0||t>=Re.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};Re[t]={...Re[t],...e};let r=Tt();return r.tagRules=Re,Jt(r),{success:!0,rule:Re[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function vu(t){if(t<0||t>=Re.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};Re.splice(t,1);let e=Tt();return e.tagRules=Re,Jt(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Hs(){return mt||Vo(),mt}function Tu(t){mt=t||[];let e=Tt();e.contentBlacklist=mt,Jt(e)}function Su(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=Tt();r.tagRulePresets||(r.tagRulePresets={});let s=`preset-${Date.now()}`;return r.tagRulePresets[s]={id:s,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(Re)),blacklist:JSON.parse(JSON.stringify(mt)),createdAt:new Date().toISOString()},Jt(r),{success:!0,preset:r.tagRulePresets[s],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function _u(){let e=Tt().tagRulePresets||{};return Object.values(e)}function Eu(t){let e=Tt(),s=(e.tagRulePresets||{})[t];return s?(Re=JSON.parse(JSON.stringify(s.rules||[])),mt=JSON.parse(JSON.stringify(s.blacklist||[])),e.tagRules=Re,e.contentBlacklist=mt,Jt(e),{success:!0,preset:s,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Au(t){let e=Tt(),r=e.tagRulePresets||{};return r[t]?(delete r[t],e.tagRulePresets=r,Jt(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Cu(){return JSON.stringify({tagRules:Re,contentBlacklist:mt,ruleTemplates:rt,tagRulePresets:Tt().tagRulePresets||{}},null,2)}function ku(t,e={overwrite:!0}){try{let r=JSON.parse(t);if(e.overwrite)Re=r.tagRules||[],mt=r.contentBlacklist||[],rt=r.ruleTemplates||Fi;else if(r.tagRules&&Re.push(...r.tagRules),r.contentBlacklist){let n=new Set(mt.map(o=>o.toLowerCase()));r.contentBlacklist.forEach(o=>{n.has(o.toLowerCase())||mt.push(o)})}let s=Tt();return s.tagRules=Re,s.contentBlacklist=mt,s.ruleTemplates=rt,r.tagRulePresets&&(s.tagRulePresets={...s.tagRulePresets||{},...r.tagRulePresets}),Jt(s),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(r){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function Iu(t,e,r="g",s=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let n=new RegExp(t,r),o=[];if(r.includes("g")){let a;for(;(a=n.exec(e))!==null;)a.length>1?o.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[s]||a[1]||a[0]}):o.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=n.exec(e);a&&o.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[s]||a[1]:a[0]})}return{success:!0,matches:o,count:o.length,extracted:o.map(a=>a.extracted)}}catch(n){return{success:!1,error:n.message,matches:[]}}}var gr,lu,tb,Fi,rt,Re,mt,Mu,rb,Ys=D(()=>{Be();W();gr=I.createScope("RegexExtractor"),lu="settings";tb=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],Fi=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],rt=[],Re=[],mt=[];Mu={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};Vo();rb={extractTagContent:mr,extractSimpleTag:Yi,extractCurlyBraceTag:Gi,extractComplexTag:cu,extractHtmlFormatTag:du,escapeRegex:gs,shouldSkipContent:Wi,isValidTagName:Hi,scanTextForTags:uu,generateTagSuggestions:pu,getAllRuleTemplates:yu,getRuleTemplate:fu,createRuleTemplate:gu,updateRuleTemplate:mu,deleteRuleTemplate:hu,getTagRules:Ws,setTagRules:bu,addTagRule:xu,updateTagRule:wu,deleteTagRule:vu,getContentBlacklist:Hs,setContentBlacklist:Tu,saveRulesAsPreset:Su,getAllRulePresets:_u,loadRulePreset:Eu,deleteRulePreset:Au,exportRulesConfig:Cu,importRulesConfig:ku,testRegex:Iu,MESSAGE_MACROS:Mu}});var Bu={};re(Bu,{createDefaultToolDefinition:()=>ms,default:()=>ab,deleteTool:()=>qs,deleteToolPreset:()=>$u,exportTools:()=>Vs,getAllTools:()=>Xt,getCurrentToolPreset:()=>Lu,getTool:()=>Qt,getToolPresets:()=>Xo,importTools:()=>Js,normalizeToolDefinitionToRuntimeConfig:()=>Hn,resetTools:()=>Xs,saveTool:()=>Gs,saveToolPreset:()=>Du,setCurrentToolPreset:()=>Ou,setToolEnabled:()=>Qo});function sb(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,r])=>[e,ms({...r||{},id:e})]))}function Wn(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function Ji(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>0?r:e}function Ru(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>=0?r:e}function Pu(t={}){return{settleMs:Ru(t?.settleMs,1200),cooldownMs:Ru(t?.cooldownMs,5e3)}}function Nu(t={}){return{enabled:t?.enabled===!0,selected:Wn(t?.selected),presetId:typeof t?.presetId=="string"?t.presetId:""}}function nb(t=[]){let e=Array.isArray(t)?t.map(r=>({role:String(r?.role||"user").trim().toUpperCase(),content:String(r?.content||"").trim()})).filter(r=>r.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(r=>`\u3010${r.role||"USER"}\u3011
${r.content}`).join(`

`)}function ob(t,e={}){let r=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(r)return r;let s=nb(e?.config?.messages||[]);return s||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function ms(t={}){let e=new Date().toISOString(),r=t?.config||{};return{...Dt,...t,id:t?.id||Dt.id,icon:t?.icon||Dt.icon,order:Number.isFinite(t?.order)?t.order:Dt.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:Dt.promptTemplate,extractTags:Wn(t?.extractTags),config:{execution:{...Dt.config.execution,...r.execution||{},timeout:Ji(r?.execution?.timeout,Dt.config.execution.timeout),retries:Math.max(0,parseInt(r?.execution?.retries,10)||Dt.config.execution.retries)},api:{...Dt.config.api,...r.api||{}},messages:Array.isArray(r?.messages)?r.messages:[],context:{...Dt.config.context,...r.context||{},depth:Ji(r?.context?.depth,Dt.config.context.depth),includeTags:Wn(r?.context?.includeTags),excludeTags:Wn(r?.context?.excludeTags)},automation:Pu(r?.automation),worldbooks:Nu(r?.worldbooks)},enabled:t?.enabled!==!1,metadata:{...Dt.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function Hn(t,e={},r={}){let s=ms({...e,id:t||e?.id||""}),n=Wn(s?.extractTags?.length?s.extractTags:s?.config?.context?.includeTags),o=String(e?.output?.apiPreset||s?.config?.api?.preset||"").trim(),a=ob(t,s),i=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():r.defaultOutputMode||"follow_ai";return{id:s.id||t,name:s.name||t,icon:s.icon||"fa-screwdriver-wrench",description:s.description||"",enabled:s.enabled!==!1,order:Number.isFinite(s.order)?s.order:100,bypass:{enabled:s?.config?.api?.useBypass===!0&&!!s?.config?.api?.bypassPreset,presetId:s?.config?.api?.bypassPreset||""},output:{mode:i,apiPreset:o,overwrite:!0,enabled:!0},automation:Pu(s?.config?.automation),worldbooks:Nu(s?.config?.worldbooks),extraction:{enabled:!0,maxMessages:Ji(s?.config?.context?.depth,5),selectors:n,regexPresetId:typeof s?.config?.extraction?.regexPresetId=="string"?s.config.extraction.regexPresetId:"",writebackTag:typeof s?.config?.extraction?.writebackTag=="string"?s.config.extraction.writebackTag:""},promptTemplate:a,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:o,extractTags:n,isCustom:!0,category:s.category||"utility",metadata:{...s.metadata||{}}}}function Xt(){let t=he.get(De.TOOLS),e=sb(t);return t&&JSON.stringify(t)!==JSON.stringify(e)&&he.set(De.TOOLS,e),{...Jo,...e}}function Qt(t){return Xt()[t]||null}function Gs(t,e){if(!t||!e)return!1;let r=he.get(De.TOOLS)||{},s=!r[t]&&!Jo[t],n=ms({...r[t]||{},...e,id:t,metadata:{...r[t]?.metadata||{},...e.metadata||{},createdAt:r[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return r[t]=n,he.set(De.TOOLS,r),K.emit(s?B.TOOL_REGISTERED:B.TOOL_UPDATED,{toolId:t,tool:n}),!0}function qs(t){let e=he.get(De.TOOLS)||{};return!e[t]&&!Jo[t]||Jo[t]?!1:(delete e[t],he.set(De.TOOLS,e),K.emit(B.TOOL_UNREGISTERED,{toolId:t}),!0)}function Xo(){return he.get(De.PRESETS)||{}}function Du(t,e){if(!t||!e)return!1;let r=Xo(),s=!r[t];return r[t]={...e,name:t,updatedAt:new Date().toISOString()},he.set(De.PRESETS,r),K.emit(s?B.PRESET_CREATED:B.PRESET_UPDATED,{type:"tool",presetName:t,preset:r[t]}),!0}function $u(t){let e=Xo();return e[t]?(delete e[t],he.set(De.PRESETS,e),K.emit(B.PRESET_DELETED,{type:"tool",presetName:t}),!0):!1}function Lu(){return he.get(De.CURRENT_PRESET)||""}function Ou(t){return he.set(De.CURRENT_PRESET,t||""),K.emit(B.PRESET_ACTIVATED,{type:"tool",presetName:t}),!0}function Qo(t,e){let r=Qt(t);if(!r)return!1;let s=he.get(De.TOOLS)||{};return s[t]=ms({...r,id:t,enabled:e,metadata:{...r?.metadata||{},createdAt:r?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),he.set(De.TOOLS,s),K.emit(e?B.TOOL_ENABLED:B.TOOL_DISABLED,{toolId:t,enabled:e}),!0}function Vs(){let t=he.get(De.TOOLS)||{},e=he.get(De.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function Js(t,e=!1){try{let r=typeof e=="object"?!!e?.overwrite:!!e,s=JSON.parse(t);if(!s||typeof s!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let n=r?{}:he.get(De.TOOLS)||{},o=r?{}:he.get(De.PRESETS)||{},a=0,i=0;if(s.tools&&typeof s.tools=="object"){for(let[l,c]of Object.entries(s.tools))!c||typeof c!="object"||(n[l]=ms({...c,id:l}),a+=1);he.set(De.TOOLS,n)}if(s.presets&&typeof s.presets=="object"){for(let[l,c]of Object.entries(s.presets))!c||typeof c!="object"||(o[l]={...c,name:l,updatedAt:new Date().toISOString()},i+=1);he.set(De.PRESETS,o)}return{success:!0,toolsImported:a,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(r){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function Xs(){he.remove(De.TOOLS),he.remove(De.PRESETS),he.remove(De.CURRENT_PRESET)}var Dt,Jo,De,ab,Yn=D(()=>{Be();Ye();Dt={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},Jo={},De={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};ab={getAllTools:Xt,getTool:Qt,saveTool:Gs,deleteTool:qs,setToolEnabled:Qo,exportTools:Vs,importTools:Js,resetTools:Xs,getToolPresets:Xo,saveToolPreset:Du,deleteToolPreset:$u,getCurrentToolPreset:Lu,setCurrentToolPreset:Ou,createDefaultToolDefinition:ms,normalizeToolDefinitionToRuntimeConfig:Hn}});var sl={};re(sl,{TOOL_CATEGORIES:()=>zu,TOOL_REGISTRY:()=>Qs,appendToolRuntimeHistory:()=>Xu,clearToolApiPreset:()=>qu,default:()=>fb,ensureToolRuntimeConfig:()=>Zs,getAllDefaultToolConfigs:()=>Zu,getAllToolApiBindings:()=>Vu,getAllToolFullConfigs:()=>Vn,getEnabledTools:()=>ep,getToolApiPreset:()=>tl,getToolBaseConfig:()=>Zo,getToolConfig:()=>qn,getToolFullConfig:()=>ne,getToolList:()=>Wu,getToolSubTabs:()=>Hu,getToolWindowState:()=>rp,hasTool:()=>el,onPresetDeleted:()=>Ju,patchToolRuntime:()=>Or,registerTool:()=>ju,resetToolConfig:()=>Qu,resetToolRegistry:()=>Yu,saveToolConfig:()=>_e,saveToolWindowState:()=>tp,setToolApiPreset:()=>Gu,setToolApiPresetConfig:()=>ub,setToolBypassConfig:()=>pb,setToolOutputMode:()=>db,setToolPromptTemplate:()=>yb,unregisterTool:()=>Fu,updateToolRuntime:()=>rl});function hs(t={}){let e=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(t?.lastRunAt)?t.lastRunAt:0,lastStatus:typeof t?.lastStatus=="string"?t.lastStatus:"idle",lastError:typeof t?.lastError=="string"?t.lastError:"",lastDurationMs:Number.isFinite(t?.lastDurationMs)?t.lastDurationMs:0,successCount:Number.isFinite(t?.successCount)?t.successCount:0,errorCount:Number.isFinite(t?.errorCount)?t.errorCount:0,lastMessageKey:typeof t?.lastMessageKey=="string"?t.lastMessageKey:"",lastExecutionKey:typeof t?.lastExecutionKey=="string"?t.lastExecutionKey:"",lastExecutionPath:typeof t?.lastExecutionPath=="string"?t.lastExecutionPath:"",lastWritebackStatus:typeof t?.lastWritebackStatus=="string"?t.lastWritebackStatus:"",lastFailureStage:typeof t?.lastFailureStage=="string"?t.lastFailureStage:"",lastSlotBindingKey:typeof t?.lastSlotBindingKey=="string"?t.lastSlotBindingKey:"",lastSlotRevisionKey:typeof t?.lastSlotRevisionKey=="string"?t.lastSlotRevisionKey:"",lastSlotTransactionId:typeof t?.lastSlotTransactionId=="string"?t.lastSlotTransactionId:"",lastSourceMessageId:typeof t?.lastSourceMessageId=="string"?t.lastSourceMessageId:"",lastSourceSwipeId:typeof t?.lastSourceSwipeId=="string"?t.lastSourceSwipeId:"",lastContentCommitted:t?.lastContentCommitted===!0,lastHostCommitApplied:t?.lastHostCommitApplied===!0,lastRefreshRequested:t?.lastRefreshRequested===!0,lastRefreshConfirmed:t?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof t?.lastPreferredCommitMethod=="string"?t.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof t?.lastAppliedCommitMethod=="string"?t.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(t?.lastRefreshMethodCount)?t.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(t?.lastRefreshMethods)?t.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(t?.lastRefreshConfirmChecks)?t.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof t?.lastRefreshConfirmedBy=="string"?t.lastRefreshConfirmedBy:"",lastTraceId:typeof t?.lastTraceId=="string"?t.lastTraceId:"",lastAutoRunAt:Number.isFinite(t?.lastAutoRunAt)?t.lastAutoRunAt:0,lastAutoStatus:typeof t?.lastAutoStatus=="string"?t.lastAutoStatus:"idle",lastAutoMessageId:typeof t?.lastAutoMessageId=="string"?t.lastAutoMessageId:"",lastAutoSwipeId:typeof t?.lastAutoSwipeId=="string"?t.lastAutoSwipeId:"",lastAutoRevisionKey:typeof t?.lastAutoRevisionKey=="string"?t.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof t?.lastAutoWritebackStatus=="string"?t.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:t?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof t?.lastAutoSkipReason=="string"?t.lastAutoSkipReason:"",recentWritebackHistory:e}}function ib(t,e=10){let r=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=r?t:t.slice(t.length-r):[]}function Ku(){let t=Xt()||{};return Object.entries(t).filter(([e])=>!Gn[e]).map(([e,r])=>[e,r||{}])}function Xi(t={}){return t?.toolKind==="script"?"script":t?.toolKind==="ai"?"ai":t?.output?.mode==="local_transform"||t?.processor?.type?"script":"ai"}function Uu(){let t=Array.isArray(Qs.tools?.subTabs)?Qs.tools.subTabs.map((r,s)=>({...r,order:Number.isFinite(r?.order)?r.order:s,toolKind:Xi(r),toolGroupLabel:Xi(r)==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"})):[],e=Ku().map(([r,s],n)=>{let o=Hn(r,s),a=Xi(o);return{id:r,name:o.name||r,icon:o.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(o.order)?o.order:100+n,isCustom:!0,description:o.description||"",toolKind:a,toolGroupLabel:a==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"}});return[...t,...e].sort((r,s)=>(r.order??0)-(s.order??0))}function lb(t,e={}){let r=Hn(t,e,{defaultOutputMode:"follow_ai"});return{...r,runtime:hs(r.runtime)}}function Zi(t){let e=Gn[t];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:hs(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let s=(Xt()||{})[t]||null;return s?lb(t,s):qn(t)}function Zo(t){let e=Zi(t);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function cb(t,e={},r=""){if(!t)return null;let s={...t,...e,id:t.id||e.id};s.output={...t.output||{},...e.output||{}},s.automation={settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(t?.automation?.settleMs)?t.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(t?.automation?.cooldownMs)?t.automation.cooldownMs:5e3},s.bypass={...t.bypass||{},...e.bypass||{}},s.worldbooks={...t.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(t?.worldbooks?.selected)?[...t.worldbooks.selected]:[]},s.runtime=hs({...t.runtime||{},...e.runtime||{}}),s.extraction={...t.extraction||{},...e.extraction||{}},s.processor={...t.processor||{},...e.processor||{},options:{...t?.processor?.options||{},...e?.processor?.options||{}}};let n=e?.output?.apiPreset||e?.apiPreset||s.output?.apiPreset||s.apiPreset||r||"";return s.output={...s.output||{},apiPreset:n},s.apiPreset=n,t.isCustom?s.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?s.enabled=e.enabled:s.enabled=t.enabled!==!1,s}function ju(t,e){if(!t||typeof t!="string")return pt.error("\u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return pt.error("\u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let r=["name","icon","component"];for(let s of r)if(!e[s])return pt.error(` \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${s}`),!1;return Zt[t]={id:t,...e,order:e.order??Object.keys(Zt).length},pt.log(` \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function Fu(t){return Zt[t]?(delete Zt[t],pt.log(` \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(pt.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function Wu(t=!0){let e=Object.values(Zt).map(r=>r.id==="tools"?{...r,subTabs:Uu()}:r);return t?e.sort((r,s)=>(r.order??0)-(s.order??0)):e}function qn(t){return t==="tools"&&Zt[t]?{...Zt[t],subTabs:Uu()}:Zt[t]||null}function el(t){return!!Zt[t]}function Hu(t){let e=qn(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function Yu(){Zt={...Qs},pt.log("\u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Gu(t,e){if(!el(t))return pt.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let r=$.get($t)||{};return r[t]=e||"",$.set($t,r),pt.log(` \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function tl(t){return($.get($t)||{})[t]||""}function qu(t){let e=$.get($t)||{};delete e[t],$.set($t,e),pt.log(` \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function Vu(){return $.get($t)||{}}function Ju(t){let e=$.get($t)||{},r=!1;for(let s in e)e[s]===t&&(e[s]="",r=!0,pt.log(` \u5DE5\u5177 "${s}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));r&&$.set($t,e)}function ne(t){let e=Zi(t);if(!e)return qn(t);let s=($.get(Lr)||{})[t]||{},n=tl(t),o=cb({...e,id:t},s,n);return typeof window<"u"&&window.YYT_PRESET_DEBUG&&typeof console<"u"&&console.log&&console.log(`[YYT-DEBUG][getToolFullConfig] ${t}`,{base_extraction:JSON.parse(JSON.stringify(e.extraction||{})),base_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),user_extraction:JSON.parse(JSON.stringify(s.extraction||{})),user_worldbooks:JSON.parse(JSON.stringify(s.worldbooks||{})),merged_extraction:JSON.parse(JSON.stringify(o.extraction||{})),merged_worldbooks:JSON.parse(JSON.stringify(o.worldbooks||{}))}),o}function Zs(t){if(!t)return!1;let e=Zi(t);if(!e)return!1;let r=$.get(Lr)||{};if(r[t])return!0;let s={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};r[t]=s,$.set(Lr,r);let n=$.get($t)||{};return n[t]=s.output?.apiPreset||s.apiPreset||"",$.set($t,n),K.emit(B.TOOL_UPDATED,{toolId:t,config:s}),!0}function _e(t,e,r={}){if(!t||!ne(t))return pt.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:s=!0}=r,n=$.get(Lr)||{},o=$.get($t)||{},a=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return n[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){n[t][l]={...e.output,apiPreset:a};return}if(l==="apiPreset"){n[t][l]=a;return}n[t][l]=e[l]}}),n[t].apiPreset===void 0&&(n[t].apiPreset=a),!n[t].output&&e.output!==void 0&&(n[t].output={...e.output||{},apiPreset:a}),$.set(Lr,n),o[t]=a,$.set($t,o),typeof window<"u"&&window.YYT_PRESET_DEBUG&&typeof console<"u"&&console.log&&console.log(`[YYT-DEBUG][saveToolConfig] ${t}`,{input_extraction:JSON.parse(JSON.stringify(e.extraction||{})),input_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),saved_extraction:JSON.parse(JSON.stringify(n[t].extraction||{})),saved_worldbooks:JSON.parse(JSON.stringify(n[t].worldbooks||{})),verify_storage:JSON.parse(JSON.stringify(($.get(Lr)||{})[t]?.extraction||{}))}),s&&K.emit(B.TOOL_UPDATED,{toolId:t,config:n[t]}),pt.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function db(t,e){let r=ne(t);return r?_e(t,{...r,output:{...r.output,mode:e}}):!1}function ub(t,e){let r=ne(t);return r?_e(t,{...r,apiPreset:e,output:{...r.output,apiPreset:e}}):!1}function pb(t,e){let r=ne(t);return r?_e(t,{...r,bypass:{...r.bypass,...e}}):!1}function yb(t,e){let r=ne(t);return r?_e(t,{...r,promptTemplate:e}):!1}function Or(t,e,r={}){let s=ne(t);if(!s)return!1;let{touchLastRunAt:n=!1,emitEvent:o=!1,emitRuntimeEvent:a=!0}=r,i=hs({...s.runtime||{},...e||{}});n&&(i.lastRunAt=Date.now());let l=_e(t,{...s,runtime:i},{emitEvent:o});return l&&a&&K.emit(B.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:i,previousRuntime:hs(s.runtime||{})}),l}function Xu(t,e,r={},s={}){let n=ne(t);if(!n)return!1;let{limit:o=10,emitEvent:a=!1,emitRuntimeEvent:i=!0}=s,l=hs(n.runtime||{}),c=hs(n.runtime||{}),d="recentWritebackHistory",u={id:r?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:r?.at||Date.now(),...r};l[d]=ib([...Array.isArray(l[d])?l[d]:[],u],o),u?.traceId&&(l.lastTraceId=u.traceId);let y=_e(t,{...n,runtime:l},{emitEvent:a});return y&&i&&K.emit(B.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:l,previousRuntime:c,historyType:e,historyEntry:u}),y}function rl(t,e,r={}){let{touchLastRunAt:s=!0,emitEvent:n=!1,emitRuntimeEvent:o=!0}=r;return Or(t,e,{touchLastRunAt:s,emitEvent:n,emitRuntimeEvent:o})}function Qu(t){if(!t||!Gn[t])return pt.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=$.get(Lr)||{};return delete e[t],$.set(Lr,e),K.emit(B.TOOL_UPDATED,{toolId:t,config:null}),pt.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function Zu(){return{...Gn}}function Vn(){let t=new Set([...Object.keys(Gn),...Ku().map(([e])=>e)]);return Array.from(t).map(e=>ne(e)).filter(Boolean)}function ep(){return Vn().filter(t=>t&&t.enabled)}function tp(t,e){let r=$.get(Qi)||{};r[t]={...e,updatedAt:Date.now()},$.set(Qi,r)}function rp(t){return($.get(Qi)||{})[t]||null}var pt,Lr,$t,Qi,Gn,Qs,zu,Zt,fb,er=D(()=>{Be();Ye();W();Yn();pt=I.createScope("ToolRegistry"),Lr="tool_configs",$t="tool_api_bindings",Qi="tool_window_states";Gn={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,regexPresetId:"builtin_regex_summary"},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</boo_FM>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:[]},statusBlock:{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",description:"\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u4EE3\u7801\u5757",enabled:!0,order:4,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,regexPresetId:"builtin_regex_status_block"},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0B\u5BF9\u8BDD\u5185\u5BB9\u751F\u6210\u89D2\u8272\u72B6\u6001\u5757\uFF1A

\u8F93\u51FA\u683C\u5F0F\uFF1A
<status_block>
<name>\u89D2\u8272\u540D</name>
<location>\u4F4D\u7F6E</location>
<condition>\u72B6\u6001</condition>
<equipment>\u88C5\u5907</equipment>
<skills>\u6280\u80FD</skills>
</status_block>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:[]},youyouReview:{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",description:"\u5728\u56DE\u590D\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50",enabled:!0,order:5,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,regexPresetId:"builtin_regex_youyou"},promptTemplate:`\u8BF7\u57FA\u4E8E\u4EE5\u4E0B\u6700\u65B0\u5267\u60C5\u56DE\u590D\uFF0C\u751F\u6210\u201C\u5C0F\u5E7D\u70B9\u8BC4\u201D\u3002

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:[]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},Qs={presetManagement:{id:"presetManagement",name:"\u9884\u8BBE\u7BA1\u7406",icon:"fa-bookmark",hasSubTabs:!0,description:"\u7EDF\u4E00\u7BA1\u7406 API / \u6B63\u5219 / \u4E16\u754C\u4E66 / \u8868\u683C\u6A21\u677F\u9884\u8BBE",order:0,subTabs:[{id:"apiPresets",name:"API \u9884\u8BBE",icon:"fa-database",component:"ApiPresetPanel",presetKind:"api"},{id:"regexPresets",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",component:"RegexExtractPanel",presetKind:"regex"},{id:"worldbookPresets",name:"\u4E16\u754C\u4E66",icon:"fa-book-atlas",component:"WorldbookPresetPanel",presetKind:"worldbook"},{id:"tableTemplates",name:"\u8868\u683C\u6A21\u677F",icon:"fa-table-list",component:"TableTemplatePanel",presetKind:"table"}]},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel",toolKind:"ai"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel",toolKind:"ai"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel",toolKind:"ai"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel",toolKind:"script"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel",toolKind:"script"}]},tableWorkbench:{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",icon:"fa-table-cells",hasSubTabs:!1,description:"\u7ED3\u6784\u5316\u586B\u8868\u4E0E\u72B6\u6001\u9884\u89C8\u5DE5\u4F5C\u53F0",component:"TableWorkbenchPanel",order:5},bypass:{id:"bypass",name:"Ai\u6307\u4EE4\u9884\u8BBE",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406 Ai \u6307\u4EE4\u9884\u8BBE",component:"BypassPanel",order:6},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:7},logger:{id:"logger",name:"\u65E5\u5FD7",icon:"fa-terminal",hasSubTabs:!1,description:"\u67E5\u770B\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7\uFF0C\u652F\u6301\u8FC7\u6EE4\u4E0E\u5BFC\u51FA",component:"LoggerPanel",order:8}},zu={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},Zt={...Qs};fb={TOOL_REGISTRY:Qs,TOOL_CATEGORIES:zu,registerTool:ju,unregisterTool:Fu,getToolList:Wu,getToolConfig:qn,hasTool:el,getToolSubTabs:Hu,resetToolRegistry:Yu,setToolApiPreset:Gu,getToolApiPreset:tl,clearToolApiPreset:qu,getAllToolApiBindings:Vu,onPresetDeleted:Ju,saveToolWindowState:tp,getToolWindowState:rp,getToolBaseConfig:Zo,ensureToolRuntimeConfig:Zs,getToolFullConfig:ne,patchToolRuntime:Or,appendToolRuntimeHistory:Xu,saveToolConfig:_e,resetToolConfig:Qu,getAllDefaultToolConfigs:Zu,getAllToolFullConfigs:Vn,getEnabledTools:ep}});function ra(){return`rgx_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function ap(){return`r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,6)}`}function al(t={}){let e=Object.values(Wt).includes(t.type)?t.type:Wt.INCLUDE;return{id:String(t.id||ap()),name:String(t.name||"").trim(),description:String(t.description||""),type:e,value:String(t.value||""),enabled:t.enabled!==!1}}function tr(t={}){return{id:String(t.id||ra()),name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),rules:Array.isArray(t.rules)?t.rules.map(al):[],blacklist:Array.isArray(t.blacklist)?t.blacklist.map(e=>String(e||"").trim()).filter(Boolean):[],createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function hr(){let t=Se.get(ol);return!t||typeof t!="object"?{}:t}function Jn(t){Se.set(ol,t)}function bs(t){return typeof t=="string"&&t.startsWith(gb)}function ip(t){return bs(t)&&ea.find(e=>e.id===t)||null}function il(t){if(!Array.isArray(t)){ea=[];return}ea=t.map(e=>tr({...e,id:String(e?.id||"")})).filter(e=>bs(e.id))}function tn(){if(op)return;op=!0;let t=$.get(sp)||{};if(t[np]===!0)return;let e=hr(),r=Object.keys(e).length>0,s=0,n={...e},o=t.tagRulePresets||{};for(let a of Object.values(o)){let i=tr({id:ra(),name:a.name||"\u5DF2\u8FC1\u79FB\u9884\u8BBE",description:a.description||"",rules:a.rules||[],blacklist:a.blacklist||[],createdAt:typeof a.createdAt=="string"&&Date.parse(a.createdAt)||Date.now(),updatedAt:Date.now()});n[i.id]=i,s+=1}if(!r&&s===0){let a=Array.isArray(t.tagRules)?t.tagRules:[],i=Array.isArray(t.contentBlacklist)?t.contentBlacklist:[];if(a.length||i.length){let l=tr({name:"\u9ED8\u8BA4\u89C4\u5219\u96C6\uFF08\u8FC1\u79FB\uFF09",description:"\u4ECE\u8001\u7248\u672C\u7684\u5F53\u524D\u89C4\u5219\u8FC1\u79FB\u800C\u6765",rules:a,blacklist:i});n[l.id]=l,Se.set(en,l.id),s+=1}}s>0&&(Jn(n),Br.info(`\u5DF2\u4ECE\u8001\u6570\u636E\u8FC1\u79FB ${s} \u4E2A\u6B63\u5219\u9884\u8BBE`)),$.set(sp,{...t,[np]:!0})}function mb(){tn();let t=hr(),e=new Set,r=[];for(let n of ea){let o=t[n.id];o?(r.push(tr(o)),e.add(n.id)):r.push(n)}let s=Object.values(t).map(tr).filter(n=>!e.has(n.id)).sort((n,o)=>o.updatedAt-n.updatedAt);return r.push(...s),r}function br(t){if(!t)return null;tn();let e=hr();return e[t]?tr(e[t]):bs(t)?ip(t):null}function sa(){tn();let t=Se.get(en);return typeof t=="string"&&t?t:""}function lp(){let t=sa();return t?br(t):null}function hb(t){if(t&&bs(t))return Se.set(en,t),ta(),K.emit(B.PRESET_ACTIVATED,{kind:"regex",id:t}),!0;let e=hr();return t&&!e[t]?(Br.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(Se.set(en,t||""),ta(),K.emit(B.PRESET_ACTIVATED,{kind:"regex",id:t}),!0)}function na(t={}){tn();let e=tr({...t,id:ra(),createdAt:Date.now(),updatedAt:Date.now()}),r=hr();return r[e.id]=e,Jn(r),K.emit(B.PRESET_CREATED,{kind:"regex",id:e.id}),Br.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function xs(t,e={}){if(!t)return null;let r=hr(),s=r[t];if(!s&&bs(t)&&(s=ip(t)),!s)return null;let n=tr({...s,...e,id:t,createdAt:s.createdAt,updatedAt:Date.now()});return r[t]=n,Jn(r),sa()===t&&nl(n),K.emit(B.PRESET_UPDATED,{kind:"regex",id:t}),n}function bb(t){if(!t)return!1;if(bs(t))return Br.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=hr();return e[t]?(delete e[t],Jn(e),sa()===t&&(Se.set(en,""),ta()),K.emit(B.PRESET_DELETED,{kind:"regex",id:t}),Br.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function xb(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=br(t);return r?na({...r,id:void 0,name:`${r.name}${e}`}):null}function wb(t,e){return bs(t)?(Br.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):xs(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function vb(t,e={}){let r=br(t);if(!r)return null;let s=al({...e,id:ap()}),n=[...r.rules,s];return xs(t,{rules:n})}function Tb(t,e,r={}){let s=br(t);if(!s)return null;let n=s.rules.map(o=>o.id===e?al({...o,...r,id:o.id}):o);return xs(t,{rules:n})}function Sb(t,e){let r=br(t);if(!r)return null;let s=r.rules.filter(n=>n.id!==e);return xs(t,{rules:s})}function _b(t,e,r){let s=br(t);if(!s)return null;let n=s.rules.findIndex(i=>i.id===e);if(n<0)return null;let o=r==="up"?n-1:n+1;if(o<0||o>=s.rules.length)return null;let a=[...s.rules];return[a[n],a[o]]=[a[o],a[n]],xs(t,{rules:a})}function Eb(t,e){let r=Array.isArray(e)?e.map(s=>String(s||"").trim()).filter(Boolean):[];return xs(t,{blacklist:Array.from(new Set(r))})}function Ab(){return tn(),{version:1,exportedAt:Date.now(),presets:Object.values(hr()).map(tr)}}function Cb(t){if(tn(),!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[],r=hr(),s=0;for(let n of e){let o=tr({...n,id:ra(),createdAt:Date.now(),updatedAt:Date.now()});r[o.id]=o,s+=1}return s>0&&(Jn(r),K.emit(B.PRESET_IMPORTED,{kind:"regex",count:s})),{added:s}}function kb(){Se.set(ol,{}),Se.set(en,""),ta(),Br.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u6B63\u5219\u9884\u8BBE")}async function nl(t){if(t)try{let e=await Promise.resolve().then(()=>(Ys(),Vi));typeof e.setCurrentRules=="function"&&e.setCurrentRules(JSON.parse(JSON.stringify(t.rules||[]))),typeof e.setContentBlacklist=="function"&&e.setContentBlacklist(JSON.parse(JSON.stringify(t.blacklist||[])))}catch(e){Br.warn("\u540C\u6B65\u5230 regex-extractor \u5931\u8D25",{error:e})}}function ta(){let t=lp();return nl(t||{rules:[],blacklist:[]})}async function Ib(t){if(!t)return[];try{let e=await Promise.resolve().then(()=>(er(),sl));return(typeof e.getToolList=="function"?e.getToolList(!1):[]).filter(s=>(typeof e.getToolFullConfig=="function"?e.getToolFullConfig(s.id):null)?.extraction?.regexPresetId===t).map(s=>s.id)}catch{return[]}}var Br,ol,en,sp,np,Wt,gb,ea,op,xe,zr=D(()=>{Be();Ye();W();Br=I.createScope("RegexPresetStore"),ol="regex_presets",en="regex_current_preset",sp="settings",np="regex_presets_migrated",Wt=Object.freeze({INCLUDE:"include",EXCLUDE:"exclude",REGEX_INCLUDE:"regex_include",REGEX_EXCLUDE:"regex_exclude"});gb="builtin_regex_",ea=[];op=!1;xe={listPresets:mb,getPreset:br,getCurrentPresetId:sa,getCurrentPreset:lp,setCurrentPresetId:hb,createPreset:na,updatePreset:xs,deletePreset:bb,duplicatePreset:xb,renamePreset:wb,addRule:vb,updateRule:Tb,deleteRule:Sb,moveRule:_b,setBlacklist:Eb,exportAll:Ab,importPresets:Cb,resetAll:kb,findLinkedTools:Ib,RULE_TYPES:Wt}});var pp={};re(pp,{RegexExtractPanel:()=>up,default:()=>Lb});function Rb(t,e,r,s,n,o){let a=m("div",{style:{display:"grid",gridTemplateColumns:"auto auto minmax(140px, 1fr) 200px minmax(120px, 2fr) auto",gap:"10px",alignItems:"center",padding:"10px 0",borderTop:r===0?"none":"1px solid var(--yyt-border)",opacity:e.enabled===!1?"0.55":"1"},attrs:{draggable:o?null:"true","data-rule-id":e.id}}),i=m("div",{style:{cursor:o?"default":"grab",padding:"4px",color:"var(--yyt-text-muted)",fontSize:"14px",userSelect:"none"},text:"\u22EE\u22EE",title:o?"\u5185\u7F6E\u9884\u8BBE\u4E0D\u53EF\u91CD\u6392":"\u62D6\u52A8\u6392\u5E8F"});a.appendChild(i);let l=m("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}}),c=ce({label:"\u25B2",size:"small",variant:"ghost",title:"\u4E0A\u79FB",disabled:o||r===0,onClick:()=>{xe.moveRule(t.id,e.id,"up"),n()}}),d=ce({label:"\u25BC",size:"small",variant:"ghost",title:"\u4E0B\u79FB",disabled:o||r===s-1,onClick:()=>{xe.moveRule(t.id,e.id,"down"),n()}});for(let v of[c,d])v.el.style.padding="0 6px",v.el.style.minHeight="auto",v.el.style.fontSize="9px";l.appendChild(c.el),l.appendChild(d.el),a.appendChild(l);let u=m("div",{style:{display:"flex",flexDirection:"column",gap:"2px",minWidth:"0"}}),y=Xe({value:e.name||"",placeholder:"\u89C4\u5219\u540D\uFF08\u53EF\u9009\uFF09",disabled:o,onChange:v=>xe.updateRule(t.id,e.id,{name:v})});y.el.style.fontSize="12px",y.el.style.padding="6px 10px",u.appendChild(y.el),e.description&&u.appendChild(m("div",{text:e.description,style:{fontSize:"10px",color:"var(--yyt-text-muted)"}})),a.appendChild(u);let p=qe({value:e.type,disabled:o,options:Mb,onChange:v=>{xe.updateRule(t.id,e.id,{type:v}),n()}});p.el.style.fontSize="11px",p.el.style.padding="6px 10px",a.appendChild(p.el);let f=e.type===Wt.REGEX_INCLUDE||e.type===Wt.REGEX_EXCLUDE,g=Xe({value:e.value||"",placeholder:f?"\u6B63\u5219\u8868\u8FBE\u5F0F...":"\u6807\u7B7E\u540D\uFF08\u5982 content\uFF09",disabled:o,onChange:v=>xe.updateRule(t.id,e.id,{value:v})});g.el.style.fontSize="12px",g.el.style.padding="6px 10px",g.el.style.fontFamily="ui-monospace, monospace",a.appendChild(g.el);let h=m("div",{style:{display:"flex",gap:"6px",alignItems:"center"}}),x=wt({checked:e.enabled!==!1,disabled:o,onChange:v=>{xe.updateRule(t.id,e.id,{enabled:v}),n()}});return x.el.style.padding="0",x.el.style.border="none",x.el.style.background="transparent",h.appendChild(x.el),o||h.appendChild(ce({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664\u89C4\u5219",onClick:()=>{xe.deleteRule(t.id,e.id),n()}}).el),a.appendChild(h),a}function Pb(t,e,r){let s=null;t.addEventListener("dragstart",n=>{let o=n.target;if(!(o instanceof HTMLElement))return;let a=o.closest("[data-rule-id]");if(a){s=a.getAttribute("data-rule-id"),a.style.opacity="0.4";try{n.dataTransfer.effectAllowed="move",n.dataTransfer.setData("text/plain",s)}catch{}}}),t.addEventListener("dragend",n=>{let o=n.target;o instanceof HTMLElement&&(o.style.opacity=""),s=null}),t.addEventListener("dragover",n=>{if(s){n.preventDefault();try{n.dataTransfer.dropEffect="move"}catch{}}}),t.addEventListener("drop",n=>{if(n.preventDefault(),!s)return;let o=n.target instanceof HTMLElement?n.target.closest("[data-rule-id]"):null;if(!o)return;let a=o.getAttribute("data-rule-id");if(!a||a===s)return;let i=xe.getPreset(e.id);if(!i)return;let l=i.rules.findIndex(y=>y.id===s),c=i.rules.findIndex(y=>y.id===a);if(l<0||c<0)return;let d=[...i.rules],[u]=d.splice(l,1);d.splice(c,0,u),xe.updatePreset(e.id,{rules:d}),r()})}function Nb(t,{onChange:e,readonly:r,refresh:s}){let n=m("div",{style:{display:"flex",flexDirection:"column",gap:"14px"}});j(n,vt({label:"\u63CF\u8FF0",control:Xe({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})}));let o=m("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px"}},m("div",{text:"\u63D0\u53D6\u89C4\u5219\uFF08\u6309\u987A\u5E8F\u5E94\u7528\uFF09",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),r?m("span",{text:"\u5185\u7F6E\u9884\u8BBE\u53EA\u8BFB",style:{fontSize:"11px",color:"var(--yyt-text-muted)"}}):ce({label:"+ \u65B0\u589E\u89C4\u5219",size:"small",onClick:()=>{xe.addRule(t.id,{type:Wt.INCLUDE,value:"",enabled:!0}),s&&s()}}).el);j(n,o);let a=m("div");if(t.rules.length){for(let i=0;i<t.rules.length;i++)a.appendChild(Rb(t,t.rules[i],i,t.rules.length,s,r));r||Pb(a,t,s)}else a.appendChild(m("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5C1A\u65E0\u89C4\u5219\u3002\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u65B0\u589E\u89C4\u5219"\u5F00\u59CB\u6DFB\u52A0\u3002'}));if(j(n,a),j(n,m("div",{text:"\u5185\u5BB9\u9ED1\u540D\u5355",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px",marginBottom:"4px"}})),j(n,m("div",{text:"\u63D0\u53D6\u51FA\u7684\u5185\u5BB9\u5757\u82E5\u5305\u542B\u4EFB\u4E00\u5173\u952E\u8BCD\u5219\u8DF3\u8FC7\u8BE5\u5757\uFF08\u4E0D\u533A\u5206\u5927\u5C0F\u5199\uFF09\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginBottom:"6px"}})),r)j(n,m("div",{style:{fontSize:"12px",color:"var(--yyt-text-muted)"},text:t.blacklist.length?t.blacklist.join("\u3001"):"\uFF08\u7A7A\uFF09"}));else{let i=Ni({values:t.blacklist,placeholder:"\u8F93\u5165\u5173\u952E\u8BCD\u56DE\u8F66\u6DFB\u52A0",chipVariant:"danger",onChange:l=>xe.setBlacklist(t.id,l)});j(n,i.el)}return n}function Db(t){if(!t)return null;let e=m("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}});j(e,m("div",{text:"\u6D4B\u8BD5\u63D0\u53D6",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}));let r=dp.get(t.id)||{input:"",output:""};dp.set(t.id,r);let s=m("textarea",{className:"yyt-textarea",attrs:{rows:"5",placeholder:"\u7C98\u8D34\u6D4B\u8BD5\u6587\u672C\uFF08\u5982 AI \u56DE\u590D\u539F\u6587\uFF09..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});s.value=r.input,s.addEventListener("input",()=>{r.input=s.value}),j(e,s);let n=m("div",{style:{padding:"10px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-muted)",maxHeight:"200px",overflowY:"auto",whiteSpace:"pre-wrap",wordBreak:"break-all",minHeight:"50px"}});n.textContent=r.output||'// \u70B9\u51FB"\u8FD0\u884C\u6D4B\u8BD5"\u770B\u63D0\u53D6\u7ED3\u679C';let o=ce({label:"\u25B6 \u8FD0\u884C\u6D4B\u8BD5",size:"small",variant:"primary",onClick:()=>{let a=s.value;if(!a.trim()){r.output="// \u6D4B\u8BD5\u8F93\u5165\u4E3A\u7A7A",n.textContent=r.output,n.style.color="var(--yyt-text-muted)";return}try{let i=mr(a,t.rules||[],t.blacklist||[]);r.output=i||"// \u6CA1\u6709\u63D0\u53D6\u5230\u5185\u5BB9",n.textContent=r.output,n.style.color=i?"var(--yyt-text)":"var(--yyt-text-muted)"}catch(i){r.output=`// \u6D4B\u8BD5\u51FA\u9519\uFF1A${i?.message||i}`,n.textContent=r.output,n.style.color="var(--yyt-danger, #f87171)"}}});return j(e,o.el),j(e,n),e}function $b(t){let e=t.rules.filter(r=>r.enabled!==!1).length;return[`${t.rules.length} \u89C4\u5219\uFF08${e} \u542F\u7528\uFF09`,`${t.blacklist.length} \u9ED1\u540D\u5355`]}var o_,Mb,dp,up,Lb,yp=D(()=>{yr();zr();Ys();W();Un();o_=I.createScope("RegexExtractPanel"),Mb=[{value:Wt.INCLUDE,label:"include \u2014 \u63D0\u53D6\u6807\u7B7E"},{value:Wt.EXCLUDE,label:"exclude \u2014 \u6392\u9664\u6807\u7B7E"},{value:Wt.REGEX_INCLUDE,label:"regex_include \u2014 \u6B63\u5219\u63D0\u53D6"},{value:Wt.REGEX_EXCLUDE,label:"regex_exclude \u2014 \u6B63\u5219\u6392\u9664"}],dp=new Map;up=Rr({id:"regexExtractPanel",kind:"regex",panelTitle:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",panelHint:"\u7BA1\u7406\u591A\u4E2A\u63D0\u53D6\u89C4\u5219\u96C6\uFF0C\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\u3002\u89C4\u5219\u6309\u987A\u5E8F\u5E94\u7528\uFF0C\u53EF\u62D6\u62FD\u6392\u5E8F\u3002",store:xe,renderEditor:Nb,renderExtras:Db,renderListItemMeta:$b}),Lb=up});function me(t){return t==null?"":String(t).trim()}function Bb(t="table"){let e=me(t)||"table",r=Date.now().toString(36),s=Math.random().toString(36).slice(2,8);return`${e}_${r}_${s}`}function Xn(t="row"){return Bb(t)}function Ht(t,e=0){return me(t)||`table_${Number.isFinite(e)?e+1:1}`}function Qn(t,e=0){return me(t)||`row_${Number.isFinite(e)?e+1:1}`}function ae(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function rn(t={}){return{chatId:me(t.chatId),sourceMessageId:me(t.sourceMessageId||t.messageId),sourceSwipeId:me(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:me(t.effectiveSwipeId||t.sourceSwipeId),slotBindingKey:me(t.slotBindingKey),slotRevisionKey:me(t.slotRevisionKey),slotTransactionId:me(t.slotTransactionId),traceId:me(t.traceId),resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now()}}function ll(t={}){return{resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now(),runSource:me(t.runSource)||Qe.MANUAL,traceId:me(t.traceId),chatId:me(t.chatId),sourceMessageId:me(t.sourceMessageId||t.messageId),sourceSwipeId:me(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:me(t.effectiveSwipeId||t.sourceSwipeId)||"swipe:current",slotBindingKey:me(t.slotBindingKey),slotRevisionKey:me(t.slotRevisionKey),slotTransactionId:me(t.slotTransactionId),assistantContentFingerprint:me(t.assistantContentFingerprint),assistantBaseFingerprint:me(t.assistantBaseFingerprint),assistantText:String(t.assistantText||""),assistantBaseText:String(t.assistantBaseText||""),targetMessageIndex:Number.isFinite(t.targetMessageIndex)?t.targetMessageIndex:-1}}function xr(t){return!t||typeof t!="object"?null:{chatId:me(t.chatId),slotBindingKey:me(t.slotBindingKey),slotRevisionKey:me(t.slotRevisionKey),sourceMessageId:me(t.sourceMessageId),sourceSwipeId:me(t.sourceSwipeId),tables:Array.isArray(t.tables)?ae(t.tables):[],updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0,meta:t.meta&&typeof t.meta=="object"?ae(t.meta):{}}}function Zn(t={},e={}){let r=ll(t),s=e.meta&&typeof e.meta=="object"?ae(e.meta):{};return{chatId:r.chatId,slotBindingKey:r.slotBindingKey,slotRevisionKey:r.slotRevisionKey,sourceMessageId:r.sourceMessageId,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId,tables:Array.isArray(e.tables)?ae(e.tables):[],updatedAt:Number.isFinite(e.updatedAt)?e.updatedAt:Date.now(),meta:{sourceKind:s.sourceKind||St.EMPTY,...s}}}function oa(t){return!t||typeof t!="object"?{lastResolvedTarget:null,lastCommittedTarget:null,updatedAt:0}:{lastResolvedTarget:t.lastResolvedTarget?rn(t.lastResolvedTarget):null,lastCommittedTarget:t.lastCommittedTarget?rn(t.lastCommittedTarget):null,updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0}}function Ee(t){if(t==null)return Lt;let e=String(t).trim();return e===""?Lt:e}function eo(t,e){let r=me(t),s=Ee(e);return`${r}::${s}`}function gp(){return{rows:[],cols:[],cells:[],indexColumn:!1}}var ws,Kr,Qe,yt,vs,St,sn,Ob,Lt,_t,fp,a_,i_,je=D(()=>{ws="YouYouToolkit_tableState",Kr="YouYouToolkit_tableBindings",Qe=Object.freeze({MANUAL:"MANUAL_TABLE",AUTO:"AUTO_TABLE"}),yt=Object.freeze({ENABLED:"enabled",SELECTED:"selected",CURRENT:"current"}),vs=Object.freeze({EXACT:"exact",BINDING_FALLBACK:"binding_fallback",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),St=Object.freeze({EXACT:"exact",BINDING:"binding",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),sn=Object.freeze({INSERT_ROW:"insertRow",UPDATE_ROW:"updateRow",DELETE_ROW:"deleteRow"}),Ob=Object.freeze({CELL:"cell",ROW:"row",COLUMN:"column",INDEX_COLUMN:"index_column"});Lt="";_t=Object.freeze({INHERIT_GLOBAL:"inherit_global",CHAT_OVERRIDE:"chat_override",PRESET_LINK:"preset_link"}),fp=8,a_=Object.freeze({NOTE:"note",INIT_NODE:"initNode",INSERT_NODE:"insertNode",UPDATE_NODE:"updateNode",DELETE_NODE:"deleteNode"}),i_=Object.freeze({INHERIT_GLOBAL:-1,DISABLED:0})});function aa(t,e=""){return t==null?e:String(t).trim()||e}function zb(t,e=!1){return t==null?e:t===!0}function ia(t={},e=0){return Ht(t?.id||t?.key,e)}function to(t={},e={}){let r=t&&typeof t=="object"?t:{},s=e&&typeof e=="object"?e:{},n=aa(r.mode||r.runScope||s.mode||s.runScope,yt.ENABLED),o=Array.isArray(r.selectedTableIds)?r.selectedTableIds.map(i=>aa(i,"")).filter(Boolean):Array.isArray(s.selectedTableIds)?s.selectedTableIds.map(i=>aa(i,"")).filter(Boolean):[],a=aa(r.activeTableId||s.activeTableId,"");return{mode:Object.values(yt).includes(n)?n:yt.ENABLED,selectedTableIds:o,activeTableId:a}}function mp(t={},e=[]){let r=to(t,t?.scope||{}),s=Array.isArray(e)?e:[],n=s.map((d,u)=>ia(d,u)),o=new Set(n),a=r.mode,i=!1;a===yt.CURRENT?(!r.activeTableId||!o.has(r.activeTableId))&&(a=yt.ENABLED,i=!0):a===yt.SELECTED&&r.selectedTableIds.filter(u=>o.has(u)).length===0&&(a=yt.ENABLED,i=!0);let l=[];a===yt.CURRENT?l=r.activeTableId?[r.activeTableId]:[]:a===yt.SELECTED?l=r.selectedTableIds.filter(d=>o.has(d)):l=s.map((d,u)=>({table:d,id:ia(d,u)})).filter(({table:d})=>zb(d?.enabled,!0)).map(({id:d})=>d);let c=new Set(l);return{...r,mode:a,requestedMode:r.mode,staleScope:i,allTableIds:n,allowedTableIds:l,allowedIdSet:c,includes(d={},u=-1){return c.has(ia(d,u))},filterTables(d=[]){return(Array.isArray(d)?d:[]).filter((y,p)=>c.has(ia(y,p)))},toJSON(){return{mode:a,requestedMode:r.mode,staleScope:i,selectedTableIds:ae(r.selectedTableIds),activeTableId:r.activeTableId,allowedTableIds:[...l]}}}}var la=D(()=>{je()});function Et(t,e=""){return t==null?e:String(t).trim()||e}function cl(){let t=globalThis.window||globalThis;return Et(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function Kb(t,e=!1){return t===!0}function Ub(t={}){let e=t&&typeof t=="object"?t:{};return{enabled:Kb(e.enabled,!1),targetBook:Et(e.targetBook,""),entryComment:Et(e.entryComment,"YYT-\u586B\u8868\u6570\u636E")}}function dl(t={},e={}){let r=t&&typeof t=="object"?t:{},s=to(r.scope,{mode:r.runScope||e.runScope||yt.ENABLED,selectedTableIds:r.selectedTableIds||e.selectedTableIds||[],activeTableId:r.activeTableId||e.activeTableId||""});return{chatId:Et(r.chatId,Et(e.chatId,cl())),templateId:Et(r.templateId,Et(e.templateId,ft)),enabledTableIds:Array.isArray(r.enabledTableIds)?r.enabledTableIds.map(n=>Et(n,"")).filter(Boolean):[],focusedTableId:Et(r.focusedTableId,s.activeTableId),scope:s,worldbookSync:Ub(r.worldbookSync),seedNote:Et(r.seedNote,""),updatedAt:Et(r.updatedAt,new Date().toISOString())}}function xp(){let t=hp.get(bp,{});return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function ul(t=cl()){let e=Et(t,"default_chat"),r=xp();return dl(r[e],{chatId:e})}function wp(t={},e=cl()){let r=Et(e,"default_chat"),s=xp(),n=dl({...s[r],...t||{},chatId:r,updatedAt:new Date().toISOString()},{chatId:r});return hp.set(bp,{...s,[r]:n}),{success:!0,guide:n}}function vp(t={},e=null){let r=dl(e||ul(),{templateId:t.activeTemplate,runScope:t.runScope,selectedTableIds:t.scope?.selectedTableIds,activeTableId:t.scope?.activeTableId}),s={...t,activeTemplate:r.templateId||t.activeTemplate,runScope:r.scope.mode,scope:r.scope};return r.worldbookSync&&r.worldbookSync.targetBook&&(s.worldbookSync={...t.worldbookSync||{},...r.worldbookSync}),s}var hp,bp,Tp=D(()=>{Be();rr();je();la();hp=$.namespace("tableWorkbenchGuides"),bp="guides"});function Z(t,e,r="",s=da){return{key:t,title:e,description:r,type:s,required:!1}}function Ur({id:t,name:e,note:r,aiInstructions:s,columns:n}){return{id:t,name:e,note:r,enabled:!0,aiInstructions:{init:s?.init||"",create:s?.create||"",update:s?.update||"",delete:s?.delete||""},columns:n,rows:[]}}var Te,ca,pl,Sp,jb,da,_p,ft,yl,nn,Ep=D(()=>{Te=Object.freeze({IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error",ABORTED:"aborted",SKIPPED:"skipped"}),ca=Object.freeze({INCREMENTAL:"incremental",FULL:"full"}),pl=`\u8BF7\u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5F53\u524D\u8868\u683C\u57FA\u5E95\uFF0C\u5BF9\u7ED3\u6784\u5316 tables \u6570\u636E\u505A\u589E\u91CF\u66F4\u65B0\u3002

\u8981\u6C42\uFF1A
1. \u53EA\u4F9D\u636E\u5F53\u524D\u5BF9\u8BDD\u5185\u5BB9\u66F4\u65B0\uFF0C\u4E0D\u8981\u81C6\u9020\u672A\u51FA\u73B0\u7684\u4FE1\u606F\u3002
2. \u4FDD\u6301\u539F\u6709\u8868\u7ED3\u6784\uFF1B\u6CA1\u6709\u4F9D\u636E\u65F6\u4FDD\u7559\u539F\u503C\u3002
3. \u4F18\u5148\u7528 <tableEdit> \u589E\u91CF DSL\uFF08\u7CBE\u786E\u4E0D\u7834\u574F\u9501\u5B9A\u5B57\u6BB5\uFF09\u3002
4. \u8868\u683C\u7EA7 AI \u64CD\u4F5C\u8BF4\u660E\uFF1A
{{tableGuidance}}
5. \u672C\u6B21\u8FD0\u884C scope\uFF1A
{{tableScopeGuidance}}
6. \u4F18\u5148\u53C2\u8003\u5F53\u524D assistant \u56DE\u590D\uFF1A{{lastAiMessage}}

\u5F53\u524D\u8868\u683C\u57FA\u5E95 JSON\uFF1A
{{toolContentMacro}}`,Sp=`\u8F93\u51FA\u8981\u6C42 \u2014 \u7528 <tableEdit>...</tableEdit> \u589E\u91CF DSL\uFF1A

  insertRow(tableIndex, {"0": "\u503C1", "1": "\u503C2"})     # \u65B0\u589E\u884C\uFF1BtableIndex \u662F\u8868\u7684 0 \u57FA\u7D22\u5F15
  updateRow(tableIndex, rowIndex, {"1": "\u65B0\u503C"})      # \u53EA\u5217\u51FA\u8981\u6539\u7684\u5217\uFF0C\u672A\u63D0\u53CA\u7684\u5217\u4FDD\u7559\u539F\u503C
  deleteRow(tableIndex, rowIndex)                     # \u5220\u9664\u884C\uFF1BrowIndex 0 \u57FA\u4E0D\u542B\u8868\u5934

\u7EA6\u5B9A\uFF1A
- tableIndex / rowIndex \u90FD\u662F 0 \u57FA\u6574\u6570\uFF08rowIndex \u4E0D\u542B\u8868\u5934\u884C\uFF09
- data \u5BF9\u8C61\u7684\u952E\u662F\u5217\u7D22\u5F15\u5B57\u7B26\u4E32\uFF08"0"\u3001"1"\u3001"2" \u2026\uFF09\uFF0C\u4E0D\u662F\u5217\u540D
- \u591A\u6761\u6307\u4EE4\u653E\u5728\u540C\u4E00\u4E2A <tableEdit> \u5757\u5185\uFF0C\u6309\u987A\u5E8F\u6267\u884C
- \u6CA1\u6709\u53D8\u66F4\u65F6\u8F93\u51FA\u7A7A\u5757 <tableEdit></tableEdit>
- \u4E0D\u8981\u9644\u52A0\u89E3\u91CA\u3001Markdown \u4EE3\u7801\u5757\u6807\u8BB0\u6216\u989D\u5916 JSON

\u793A\u4F8B\uFF1A
<tableEdit>
insertRow(0, {"0": "\u5357\u5BAB\u59EC\u601C", "1": "\u5973/17", "2": "\u767D\u53D1\u5F02\u77B3"})
updateRow(0, 1, {"3": "\u597D\u5947\u4E0A\u8FDB", "5": "\u7A7F\u8D8A\u8005"})
deleteRow(1, 0)
</tableEdit>

\u5982\u786E\u5B9E\u9700\u8981\u5168\u91CF\u66FF\u6362\u6574\u5F20\u8868\uFF0C\u4E5F\u53EF\u4EE5\u76F4\u63A5\u8FD4\u56DE JSON\uFF1A
  {"tables": [{...}, {...}]}
\u4F46\u5E94\u8BE5\u5C3D\u91CF\u4F18\u5148\u7528 DSL\uFF08\u6D41\u91CF\u5C0F\u3001\u4E0D\u5F71\u54CD\u9501\u5B57\u6BB5\uFF09\u3002`,jb=Object.freeze([{value:"text",label:"\u6587\u672C"},{value:"number",label:"\u6570\u5B57"},{value:"boolean",label:"\u5E03\u5C14"},{value:"date",label:"\u65E5\u671F"},{value:"json",label:"JSON"}]),da="text",_p=Object.freeze(jb.map(t=>Object.freeze({...t}))),ft="default_story_state",yl="\u9ED8\u8BA4\u5267\u60C5\u72B6\u6001\u6A21\u677F";nn=Object.freeze([Ur({id:"default_global_state",name:"\u5168\u5C40\u6570\u636E\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u4E3B\u89D2\u6240\u5728\u5730\u70B9\u53CA\u65F6\u95F4\u76F8\u5173\u53C2\u6570\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u63D2\u5165\u4E00\u6761\u5173\u4E8E\u5F53\u524D\u4E16\u754C\u72B6\u6001\u7684\u8BB0\u5F55\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u5730\u70B9\u6216\u65F6\u95F4\u53D1\u751F\u53D8\u5316\u65F6\u66F4\u65B0\u6B64\u8868\uFF1B\u6BCF\u8F6E\u5E94\u6839\u636E\u5267\u60C5\u66F4\u65B0\u65F6\u95F4\u76F8\u5173\u5B57\u6BB5\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[Z("location","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u5730\u70B9","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u7684\u5177\u4F53\u573A\u666F\u540D\u79F0\u3002"),Z("current_time","\u5F53\u524D\u65F6\u95F4","\u6E38\u620F\u4E16\u754C\u7684\u5F53\u524D\u65F6\u95F4\uFF1B\u5982\u5267\u60C5\u6CA1\u6709\u660E\u786E\u65F6\u95F4\uFF0C\u53EF\u6839\u636E\u4E16\u754C\u89C2\u7ED9\u51FA\u5408\u7406\u65F6\u95F4\u3002"),Z("previous_scene_time","\u4E0A\u8F6E\u573A\u666F\u65F6\u95F4","\u4E0A\u4E00\u8F6E\u4EA4\u4E92\u7ED3\u675F\u65F6\u7684\u65F6\u95F4\u3002"),Z("elapsed_time","\u7ECF\u8FC7\u7684\u65F6\u95F4","\u6839\u636E\u5F53\u524D\u4E0E\u4E0A\u8F6E\u65F6\u95F4\u8BA1\u7B97\u51FA\u7684\u6587\u672C\u63CF\u8FF0\u3002")]}),Ur({id:"default_protagonist_profile",name:"\u4E3B\u89D2\u4FE1\u606F",note:"\u8BB0\u5F55\u4E3B\u89D2\u7684\u6838\u5FC3\u8EAB\u4EFD\u4FE1\u606F\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E3B\u89D2\u7684\u552F\u4E00\u6761\u76EE\u3002",create:"\u7981\u6B62\u65B0\u589E\u591A\u540D\u4E3B\u89D2\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u4E3B\u89D2\u8EAB\u4EFD\u3001\u5916\u8C8C\u3001\u7ECF\u5386\u6216\u6027\u683C\u6709\u660E\u786E\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[Z("name","\u4EBA\u7269\u540D\u79F0","\u4E3B\u89D2\u7684\u540D\u5B57\u3002"),Z("gender_age","\u6027\u522B/\u5E74\u9F84","\u4E3B\u89D2\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),Z("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u4E3B\u89D2\u5916\u8C8C\u7684\u5BA2\u89C2\u6587\u5B57\u63CF\u5199\u3002"),Z("identity","\u804C\u4E1A/\u8EAB\u4EFD","\u4E3B\u89D2\u5728\u793E\u4F1A\u6216\u5267\u60C5\u4E2D\u7684\u4E3B\u8981\u8EAB\u4EFD\u3002"),Z("history","\u8FC7\u5F80\u7ECF\u5386","\u4E3B\u89D2\u80CC\u666F\u6545\u4E8B\u4E0E\u5173\u952E\u7ECF\u5386\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002"),Z("personality","\u6027\u683C\u7279\u70B9","\u5BF9\u4E3B\u89D2\u6838\u5FC3\u6027\u683C\u7684\u6982\u62EC\u3002")]}),Ur({id:"default_important_characters",name:"\u91CD\u8981\u89D2\u8272\u8868",note:"\u8BB0\u5F55\u5173\u952E NPC \u6216\u91CD\u8981\u89D2\u8272\u7684\u4FE1\u606F\u548C\u52A8\u6001\u72B6\u6001\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u4E3A\u5F53\u524D\u5728\u573A\u7684\u91CD\u8981\u4EBA\u7269\u5206\u522B\u63D2\u5165\u6761\u76EE\u3002",create:"\u5267\u60C5\u4E2D\u6709\u672A\u8BB0\u5F55\u7684\u91CD\u8981\u4EBA\u7269\u767B\u573A\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u89D2\u8272\u7684\u72B6\u6001\u3001\u5173\u7CFB\u3001\u60F3\u6CD5\u3001\u7ECF\u5386\u6216\u6301\u6709\u7269\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:'\u901A\u5E38\u7981\u6B62\u5220\u9664\uFF1B\u89D2\u8272\u79BB\u573A\u65F6\u4F18\u5148\u66F4\u65B0"\u662F\u5426\u79BB\u573A"\u3002'},columns:[Z("name","\u59D3\u540D","\u89D2\u8272\u59D3\u540D\u3002"),Z("gender_age","\u6027\u522B/\u5E74\u9F84","\u89D2\u8272\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),Z("summary","\u4E00\u53E5\u8BDD\u4ECB\u7ECD","\u7528\u7B80\u77ED\u6587\u5B57\u6982\u62EC\u89D2\u8272\u8EAB\u4EFD\u80CC\u666F\u3002"),Z("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u89D2\u8272\u5916\u8C8C\u548C\u5F53\u524D\u8863\u7740\u7684\u5BA2\u89C2\u63CF\u5199\u3002"),Z("important_items","\u6301\u6709\u7684\u91CD\u8981\u7269\u54C1","\u89D2\u8272\u62E5\u6709\u7684\u5173\u952E\u7269\u54C1\uFF0C\u7528\u5206\u53F7\u5206\u9694\u3002"),Z("offstage","\u662F\u5426\u79BB\u573A",'\u5224\u65AD\u8BE5\u89D2\u8272\u5F53\u524D\u662F\u5426\u5DF2\u7ECF\u79BB\u573A\uFF0C\u586B\u5199"\u662F"\u6216"\u5426"\u3002',"boolean"),Z("history","\u8FC7\u5F80\u7ECF\u5386","\u89D2\u8272\u80CC\u666F\u4E0E\u5173\u952E\u4E8B\u4EF6\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002")]}),Ur({id:"default_protagonist_skills",name:"\u4E3B\u89D2\u6280\u80FD\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u83B7\u5F97\u7684\u6280\u80FD\u3001\u80FD\u529B\u6216\u9636\u6BB5\u6027\u6210\u957F\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u6280\u80FD\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u65B0\u6280\u80FD\u6216\u65B0\u80FD\u529B\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u6280\u80FD\u5347\u7EA7\u3001\u964D\u7EA7\u6216\u6548\u679C\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u6280\u80FD\u88AB\u5267\u60C5\u5265\u593A\u3001\u66FF\u6362\u6216\u5931\u6548\u65F6\u5220\u9664\u3002"},columns:[Z("skill_name","\u6280\u80FD\u540D\u79F0","\u6280\u80FD\u6216\u80FD\u529B\u540D\u79F0\u3002"),Z("skill_type","\u6280\u80FD\u7C7B\u578B","\u6280\u80FD\u7C7B\u522B\uFF0C\u4F8B\u5982\u4E3B\u52A8\u3001\u88AB\u52A8\u3001\u5929\u8D4B\u7B49\u3002"),Z("level","\u7B49\u7EA7/\u9636\u6BB5","\u6280\u80FD\u5F53\u524D\u7B49\u7EA7\u3001\u719F\u7EC3\u5EA6\u6216\u9636\u6BB5\u3002"),Z("effect","\u6548\u679C\u63CF\u8FF0","\u6280\u80FD\u5728\u5F53\u524D\u9636\u6BB5\u4E0B\u7684\u5177\u4F53\u6548\u679C\u3002")]}),Ur({id:"default_inventory",name:"\u80CC\u5305\u7269\u54C1\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u62E5\u6709\u7684\u7269\u54C1\u3001\u88C5\u5907\u6216\u6D88\u8017\u54C1\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u643A\u5E26\u7269\u54C1\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u80CC\u5305\u4E2D\u6CA1\u6709\u7684\u5168\u65B0\u7269\u54C1\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u7269\u54C1\u6570\u91CF\u3001\u72B6\u6001\u6216\u63CF\u8FF0\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7269\u54C1\u88AB\u5B8C\u5168\u6D88\u8017\u3001\u4E22\u5F03\u6216\u6467\u6BC1\u65F6\u5220\u9664\u3002"},columns:[Z("item_name","\u7269\u54C1\u540D\u79F0","\u7269\u54C1\u540D\u79F0\u3002"),Z("quantity","\u6570\u91CF","\u62E5\u6709\u6570\u91CF\u3002","number"),Z("description","\u63CF\u8FF0/\u6548\u679C","\u7269\u54C1\u529F\u80FD\u3001\u6548\u679C\u6216\u80CC\u666F\u63CF\u8FF0\u3002"),Z("category","\u7C7B\u522B","\u7269\u54C1\u7C7B\u522B\uFF0C\u4F8B\u5982\u6B66\u5668\u3001\u6D88\u8017\u54C1\u3001\u6742\u7269\u7B49\u3002")]}),Ur({id:"default_quests_events",name:"\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u6B63\u5728\u8FDB\u884C\u6216\u9700\u8981\u6301\u7EED\u8FFD\u8E2A\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u8981\u4EFB\u52A1\u6216\u5173\u952E\u4E8B\u4EF6\u3002",create:"\u4E3B\u89D2\u63A5\u53D6\u3001\u89E6\u53D1\u6216\u53D1\u73B0\u65B0\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u65F6\u65B0\u589E\u3002",update:"\u4EFB\u52A1\u53D6\u5F97\u5173\u952E\u8FDB\u5C55\u3001\u76EE\u6807\u53D8\u5316\u6216\u65F6\u9650\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u4EFB\u52A1\u5B8C\u6210\u3001\u5931\u8D25\u3001\u8FC7\u671F\u6216\u4E0D\u518D\u9700\u8981\u8FFD\u8E2A\u65F6\u5220\u9664\u3002"},columns:[Z("quest_name","\u4EFB\u52A1\u540D\u79F0","\u4EFB\u52A1\u6216\u4E8B\u4EF6\u6807\u9898\u3002"),Z("quest_type","\u4EFB\u52A1\u7C7B\u578B","\u4E3B\u7EBF\u3001\u652F\u7EBF\u3001\u4E2A\u4EBA\u3001\u7A81\u53D1\u4E8B\u4EF6\u7B49\u3002"),Z("issuer","\u53D1\u5E03\u8005","\u53D1\u5E03\u4EFB\u52A1\u6216\u89E6\u53D1\u4E8B\u4EF6\u7684\u89D2\u8272\u3001\u5730\u70B9\u6216\u52BF\u529B\u3002"),Z("detail","\u8BE6\u7EC6\u63CF\u8FF0","\u4EFB\u52A1\u76EE\u6807\u3001\u4E8B\u4EF6\u80CC\u666F\u548C\u8981\u6C42\u3002"),Z("progress","\u5F53\u524D\u8FDB\u5EA6","\u5BF9\u5B8C\u6210\u5EA6\u6216\u5F53\u524D\u9636\u6BB5\u7684\u7B80\u8981\u63CF\u8FF0\u3002"),Z("deadline","\u4EFB\u52A1\u65F6\u9650","\u5B8C\u6210\u4EFB\u52A1\u7684\u5269\u4F59\u65F6\u95F4\u6216\u622A\u6B62\u6761\u4EF6\u3002"),Z("reward","\u5956\u52B1","\u5B8C\u6210\u540E\u53EF\u80FD\u83B7\u5F97\u7684\u5956\u52B1\u3002"),Z("penalty","\u60E9\u7F5A","\u5931\u8D25\u6216\u9519\u8FC7\u540E\u7684\u540E\u679C\u3002")]}),Ur({id:"default_memo_log",name:"\u7EAA\u8981\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u6216\u5173\u952E\u7247\u6BB5\u53D1\u751F\u7684\u4E8B\u4EF6\u7EAA\u8981\uFF0C\u7528\u4E8E\u540E\u7EED\u56DE\u987E\u3002",aiInstructions:{init:"\u6545\u4E8B\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E00\u6761\u8BB0\u5F55\uFF0C\u7528\u4E8E\u8BB0\u5F55\u521D\u59CB\u5316\u5267\u60C5\u3002",create:"\u6BCF\u8F6E\u4EA4\u4E92\u7ED3\u675F\u540E\uFF0C\u82E5\u53D1\u751F\u4E86\u503C\u5F97\u8BB0\u5F55\u7684\u65B0\u4E8B\u4EF6\uFF0C\u5219\u63D2\u5165\u4E00\u6761\u65B0\u7EAA\u8981\u3002",update:"\u901A\u5E38\u7981\u6B62\u66F4\u65B0\u5386\u53F2\u7EAA\u8981\uFF1B\u53EA\u6709\u660E\u663E\u4E8B\u5B9E\u9519\u8BEF\u65F6\u624D\u4FEE\u6B63\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[Z("time_span","\u65F6\u95F4\u8DE8\u5EA6","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u7684\u65F6\u95F4\u8303\u56F4\u3002"),Z("location","\u5730\u70B9","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u5730\u70B9\u3002"),Z("memo","\u7EAA\u8981","\u4EE5\u7B2C\u4E09\u65B9\u89C6\u89D2\u5BA2\u89C2\u8BB0\u5F55\u672C\u8F6E\u53D1\u751F\u7684\u4E8B\u5B9E\u3002"),Z("summary","\u6982\u89C8","\u4E00\u53E5\u8BDD\u6982\u62EC\u7EAA\u8981\u5185\u5BB9\u3002"),Z("index_code","\u7F16\u7801\u7D22\u5F15","\u7528\u4E8E\u540E\u7EED\u68C0\u7D22\u7684\u7B80\u77ED\u7F16\u7801\u3002")]}),Ur({id:"default_options",name:"\u9009\u9879\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u4E3B\u89D2\u53EF\u4EE5\u91C7\u53D6\u7684\u884C\u52A8\u9009\u9879\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002\u6240\u6709\u9009\u9879\u4F7F\u7528\u7B2C\u4E09\u4EBA\u79F0\uFF0C\u4E0D\u4EE3\u66FF\u4E3B\u89D2\u53D1\u8A00\uFF0C\u5E76\u7D27\u6263\u5F53\u524D\u5267\u60C5\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u751F\u6210\u56DB\u4E2A\u521D\u59CB\u884C\u52A8\u9009\u9879\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u6BCF\u8F6E\u4EA4\u4E92\u540E\u6839\u636E\u5F53\u524D\u5267\u60C5\u751F\u6210\u65B0\u7684\u56DB\u4E2A\u9009\u9879\u5E76\u8986\u76D6\u539F\u6709\u5185\u5BB9\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[Z("option_1","\u9009\u9879\u4E00","\u504F\u5411\u7B56\u7565\u3001\u63A8\u8FDB\u5267\u60C5\u6216\u89E3\u51B3\u5F53\u524D\u95EE\u9898\u7684\u884C\u52A8\u3002"),Z("option_2","\u9009\u9879\u4E8C","\u504F\u5411\u8C28\u614E\u89C2\u5BDF\u3001\u6536\u96C6\u4FE1\u606F\u6216\u4FDD\u6301\u4E2D\u7ACB\u7684\u884C\u52A8\u3002"),Z("option_3","\u9009\u9879\u4E09","\u504F\u5411\u5E2E\u52A9\u3001\u4FDD\u62A4\u3001\u6C9F\u901A\u6216\u5B89\u629A\u7684\u884C\u52A8\u3002"),Z("option_4","\u9009\u9879\u56DB","\u504F\u5411\u5192\u9669\u3001\u8BD5\u63A2\u3001\u6539\u53D8\u5C40\u52BF\u6216\u5173\u7CFB\u4E92\u52A8\u7684\u884C\u52A8\u3002")]})])});function Fb(t,e=""){return t==null?e:String(t).trim()||e}function jr(t){if(t==null)return"";if(typeof t=="string")return t;try{return JSON.stringify(t,null,2)}catch{return String(t)}}function Ap(t,e="col"){return Fb(t,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||e}function ro(t,e=new Set){let r=Ap(t,"col"),s=r,n=2;for(;e.has(s);)s=`${r}_${n}`,n+=1;return e.add(s),s}var Cp=D(()=>{});function N(t,e=""){return t==null?e:String(t).trim()||e}function sr(t,e=!1){return t==null?e:t===!0}function Wb(t){if(!Array.isArray(t)||t.length!==1)return!1;let e=t[0]&&typeof t[0]=="object"?t[0]:null;if(!e)return!1;let r=N(e.name||e.title,""),s=N(e.note||e.description,""),n=Array.isArray(e.columns)?e.columns:[],o=Array.isArray(e.rows)?e.rows:[];if(r&&!["\u88681","\u8868\u683C 1","\u8868\u683C1"].includes(r)||s||n.length!==1||o.length>1)return!1;let a=n[0]&&typeof n[0]=="object"?n[0]:{},i=N(a.key||a.id,""),l=N(a.title||a.name||a.label,"");if(N(a.description||a.note,"")||i&&i!=="col_1"||l&&!["\u52171","col_1"].includes(l))return!1;if(o.length===0)return!0;let d=o[0]&&typeof o[0]=="object"?o[0]:{},u=N(d.name||d.title||d.label,""),y=d.cells&&typeof d.cells=="object"&&!Array.isArray(d.cells)?d.cells:{},p=Array.isArray(d.values)?d.values:[],f=Object.values(y).some(g=>N(g,""))||p.some(g=>N(g,""));return(!u||u==="\u884C1")&&!f}function Hb(t,{seedDefaultWhenMissing:e=!1}={}){return Wb(t)?ae(nn):Array.isArray(t)?ae(t):t&&typeof t=="object"?Yb(t):e?ae(nn):[]}function ml(t=""){let e=[],r=N(t,""),s=/-\s*列\d+\s*[:：]\s*([^\n\-–—]+?)\s*[-–—]\s*([^\n]+)/g,n;for(;n=s.exec(r);)e.push({title:N(n[1],""),description:N(n[2],"")});return e}function Yb(t={}){let e=t&&typeof t=="object"?t:{};return Object.keys(e).filter(s=>s.startsWith("sheet_")&&e[s]&&typeof e[s]=="object").map((s,n)=>({key:s,table:e[s],fallbackOrder:n})).sort((s,n)=>{let o=Number.isFinite(s.table.orderNo)?s.table.orderNo:s.fallbackOrder,a=Number.isFinite(n.table.orderNo)?n.table.orderNo:n.fallbackOrder;return o-a}).map(({key:s,table:n},o)=>{let a=n.sourceData&&typeof n.sourceData=="object"?n.sourceData:{},i=Array.isArray(n.content)?n.content:[],l=Array.isArray(i[0])?i[0]:[],c=ml(a.note),d=new Set,u=l.slice(1).map((p,f)=>{let g=c[f]||{},h=N(p||g.title,`\u5217${f+1}`);return{key:ro(h||`col_${f+1}`,d),title:h,description:N(g.description,""),type:da,required:!1}}),y=i.slice(1).map((p,f)=>{let g=Array.isArray(p)?p:[],h={};return u.forEach((x,v)=>{h[x.key]=jr(g[v+1])}),{name:N(g[0],`\u884C${f+1}`),cells:h}});return{id:N(n.uid||s,`sheet_${o+1}`),name:N(n.name,`\u8868${o+1}`),note:N(a.note,""),enabled:n.enabled!==!1,aiInstructions:{init:N(a.initNode,""),create:N(a.insertNode,""),update:N(a.updateNode,""),delete:N(a.deleteNode,"")},columns:u,rows:y}})}function Gb(t=[]){let e=[],r=0;return t.forEach(s=>{let n=s&&typeof s=="object"?s:{},o=n.cells&&typeof n.cells=="object"&&!Array.isArray(n.cells)?n.cells:null,a=Array.isArray(n.cells)?n.cells:Array.isArray(n.values)?n.values:null;o&&Object.keys(o).forEach(i=>{e.includes(i)||e.push(i)}),a&&a.length>r&&(r=a.length)}),e.length>0?e.map(s=>({key:s,title:String(s)})):r>0?Array.from({length:r},(s,n)=>({key:`col_${n+1}`,title:`\u5217${n+1}`})):[]}function hl(t,e=da){let r=N(t,e);return _p.some(s=>s.value===r)?r:e}function qb(t={},e=0,r=new Set){let s=t&&typeof t=="object"?t:{},n=N(s.title||s.name||s.label,`\u5217${e+1}`),o=N(s.key||s.id,""),a=ro(o||n||`col_${e+1}`,r),i=[o,N(s.title,""),N(s.name,""),N(s.label,"")].filter(Boolean);return{key:a,title:n,description:N(s.description||s.note,""),type:hl(s.type),required:s.required===!0,sourceKeys:i}}function Vb(t={},e={},r=0){let s=t.cells&&typeof t.cells=="object"&&!Array.isArray(t.cells)?t.cells:null,n=Array.isArray(t.cells)?t.cells:Array.isArray(t.values)?t.values:null;if(s){let o=[...Array.isArray(e.sourceKeys)?e.sourceKeys:[],e.key,e.title].filter(Boolean);for(let a of o)if(s[a]!==void 0)return jr(s[a])}return n&&n[r]!==void 0?jr(n[r]):""}function Jb(t={},e=[],r=0){let s=t&&typeof t=="object"?t:{},n={};return e.forEach((o,a)=>{n[o.key]=Vb(s,o,a)}),{id:Qn(s.id||s.rowId,r),name:N(s.name||s.title||s.label,`\u884C${r+1}`),cells:n}}function Xb(t={}){let e=t&&typeof t=="object"?t:{};return{init:N(e.init,""),create:N(e.create,""),update:N(e.update,""),delete:N(e.delete,"")}}function Qb(t={},e=""){let r=t&&typeof t=="object"?t:{},s=N(r.presetId,N(e,""));return{enabled:r.enabled===!0,presetId:s}}function Zb(t={},e=""){let r=t&&typeof t=="object"?t:{};return{enabled:sr(r.enabled,!1),entryName:N(r.entryName,e),entryType:r.entryType==="keyword"?"keyword":"constant",splitByRow:sr(r.splitByRow,!1),keywords:N(r.keywords,""),injectionTemplate:N(r.injectionTemplate,""),preventRecursion:sr(r.preventRecursion,!0),entryPlacement:{position:N(r.entryPlacement?.position||r.placement?.position,"before_character_definition"),depth:Number.isFinite(Number(r.entryPlacement?.depth??r.placement?.depth))?Math.floor(Number(r.entryPlacement?.depth??r.placement?.depth)):2,order:Number.isFinite(Number(r.entryPlacement?.order??r.placement?.order))?Math.floor(Number(r.entryPlacement?.order??r.placement?.order)):0}}}function ex(t={},e=0){let r=t&&typeof t=="object"?t:{},s=new Set,o=(Array.isArray(r.columns)&&r.columns.length>0?r.columns:Gb(Array.isArray(r.rows)?r.rows:[])).map((l,c)=>qb(l,c,s)),a=Array.isArray(r.rows)?r.rows.map((l,c)=>Jb(l,o,c)):[],i=N(r.name||r.title,`\u8868${e+1}`);return{id:Ht(r.id||r.key,e),name:i,note:N(r.note||r.description,""),enabled:r.enabled!==!1,aiInstructions:Xb(r.aiInstructions),exportConfig:Zb(r.exportConfig,i),columns:o.map(l=>({key:l.key,title:l.title,description:N(l.description,""),type:hl(l.type),required:l.required===!0})),rows:a}}function kp(t={}){let e=t&&typeof t=="object"?t:{},r=Array.isArray(e.lastErrorDetails)?e.lastErrorDetails.map(n=>N(n,"")).filter(Boolean):[],s=e.lastValidationSummary&&typeof e.lastValidationSummary=="object"?{errorCount:Number.isFinite(e.lastValidationSummary.errorCount)?e.lastValidationSummary.errorCount:0,warningCount:Number.isFinite(e.lastValidationSummary.warningCount)?e.lastValidationSummary.warningCount:0}:{errorCount:0,warningCount:0};return{lastStatus:N(e.lastStatus,Te.IDLE),lastRunAt:Number.isFinite(e.lastRunAt)?e.lastRunAt:0,lastDurationMs:Number.isFinite(e.lastDurationMs)?e.lastDurationMs:0,lastError:N(e.lastError,""),lastErrorDetails:r,lastValidationSummary:s,successCount:Number.isFinite(e.successCount)?e.successCount:0,errorCount:Number.isFinite(e.errorCount)?e.errorCount:0,lastSourceMessageId:N(e.lastSourceMessageId,""),lastSlotRevisionKey:N(e.lastSlotRevisionKey,""),lastLoadMode:N(e.lastLoadMode,""),lastFillMode:N(e.lastFillMode,""),lastMirrorApplied:e.lastMirrorApplied===!0,lastResolvedFromMessageId:N(e.lastResolvedFromMessageId,""),lastResolvedFromRevisionKey:N(e.lastResolvedFromRevisionKey,""),lastSourceKind:N(e.lastSourceKind,""),lastScopeMode:N(e.lastScopeMode,""),lastAutoRunAt:Number.isFinite(e.lastAutoRunAt)?e.lastAutoRunAt:0,lastAutoStatus:N(e.lastAutoStatus,Te.IDLE),lastAutoMessageId:N(e.lastAutoMessageId,""),lastAutoRevisionKey:N(e.lastAutoRevisionKey,""),lastAutoSkipReason:N(e.lastAutoSkipReason,"")}}function tx(t={}){let e=t&&typeof t=="object"?t:{};return(Array.isArray(e.tables)?e.tables:[]).map((s,n)=>ex(s,n))}function Ip(t="",e={},r={}){let s=hl(e?.type),n=String(t??"").trim(),o=N(r?.label,`${N(r?.tableName,"\u8868\u683C")} / ${N(r?.rowName,"\u884C")} / ${N(e?.title||e?.key,"\u5355\u5143\u683C")}`),a=[],i=[];if(e?.required===!0&&!n&&a.push(`${o} \u4E3A\u5FC5\u586B\uFF0C\u5F53\u524D\u4E3A\u7A7A\u3002`),!n)return{valid:a.length===0,errors:a,warnings:i};if(s==="number"&&!Number.isFinite(Number(n))&&a.push(`${o} \u9700\u8981\u586B\u5199\u6570\u5B57\u3002`),s==="boolean"&&!["true","false","1","0","yes","no"].includes(n.toLowerCase())&&a.push(`${o} \u9700\u8981\u586B\u5199\u5E03\u5C14\u503C\uFF08true / false\uFF09\u3002`),s==="date"&&Number.isNaN(Date.parse(n))&&a.push(`${o} \u9700\u8981\u586B\u5199\u53EF\u89E3\u6790\u7684\u65E5\u671F\u3002`),s==="json")try{JSON.parse(n)}catch(l){a.push(`${o} \u9700\u8981\u586B\u5199\u5408\u6CD5 JSON\uFF1A${l?.message||"\u89E3\u6790\u5931\u8D25"}`)}return{valid:a.length===0,errors:a,warnings:i}}function rx(t={}){let r=tx(t&&typeof t=="object"?t:{}),s=[];return r.forEach((n,o)=>{let a=N(n?.name,`\u8868${o+1}`),i=Array.isArray(n?.columns)?n.columns:[],l=Array.isArray(n?.rows)?n.rows:[];a||s.push(`\u8868 ${o+1} \u7F3A\u5C11\u540D\u79F0\u3002`),i.length===0&&s.push(`${a} \u81F3\u5C11\u9700\u8981\u4E00\u5217\u3002`);let c=new Set;i.forEach((d,u)=>{let y=N(d?.key,""),p=N(d?.title,`\u5217${u+1}`);if(!y){s.push(`${a} / ${p} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`);return}if(c.has(y)){s.push(`${a} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${y}`);return}c.add(y)}),l.forEach((d,u)=>{let y=N(d?.name,`\u884C${u+1}`),p=d?.cells&&typeof d.cells=="object"&&!Array.isArray(d.cells)?d.cells:{};i.forEach((f,g)=>{let h=N(f?.key,""),x=N(f?.title||h,`\u5217${g+1}`),v=h?jr(p[h]):"",T=Ip(v,f,{label:`${a} / ${y} / ${x}`,tableName:a,rowName:y});s.push(...T.errors)})})}),{valid:s.length===0,errors:s,tables:r}}function on({severity:t="error",message:e="",tableIndex:r=-1,tableName:s="",columnIndex:n=-1,columnKey:o="",rowIndex:a=-1,rowName:i="",cellKey:l=""}={}){return{severity:t,message:N(e,t==="warning"?"\u5B58\u5728\u8B66\u544A\u3002":"\u5B58\u5728\u9519\u8BEF\u3002"),tableIndex:r,tableName:N(s,""),columnIndex:n,columnKey:N(o,""),rowIndex:a,rowName:N(i,""),cellKey:N(l,"")}}function ua(t={}){let e=rx(t),r=[];if(!e.valid)return{...e,warnings:[],issues:r,summary:{errorCount:e.errors.length,warningCount:0}};let s=Array.isArray(e.tables)?e.tables:[];s.forEach((a,i)=>{let l=N(a?.name,`\u8868${i+1}`),c=Array.isArray(a?.columns)?a.columns:[],d=Array.isArray(a?.rows)?a.rows:[],u=new Set;l||r.push(on({severity:"error",message:`\u8868 ${i+1} \u7F3A\u5C11\u540D\u79F0\u3002`,tableIndex:i,tableName:l})),c.forEach((y,p)=>{let f=N(y?.key,""),g=N(y?.title,`\u5217${p+1}`);f||r.push(on({severity:"error",message:`${l} / ${g} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`,tableIndex:i,tableName:l,columnIndex:p,columnKey:f,cellKey:f})),f&&(u.has(f)&&r.push(on({severity:"error",message:`${l} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${f}`,tableIndex:i,tableName:l,columnIndex:p,columnKey:f,cellKey:f})),u.add(f))}),d.forEach((y,p)=>{let f=N(y?.name,`\u884C${p+1}`),g=y?.cells&&typeof y.cells=="object"&&!Array.isArray(y.cells)?y.cells:{};Object.keys(g).forEach(x=>{c.some(v=>N(v?.key,"")===x)||r.push(on({severity:"warning",message:`${l} / ${f} \u5305\u542B\u672A\u5B9A\u4E49\u5217 ${x}\uFF0C\u4FDD\u5B58\u540E\u4F1A\u88AB\u5FFD\u7565\u3002`,tableIndex:i,tableName:l,rowIndex:p,rowName:f,cellKey:x}))}),c.forEach((x,v)=>{let T=N(x?.key,""),L=N(x?.title||T,`\u5217${v+1}`),M=T?jr(g[T]):"",_=Ip(M,x,{label:`${l} / ${f} / ${L}`,tableName:l,rowName:f});_.errors.forEach(A=>{r.push(on({severity:"error",message:A,tableIndex:i,tableName:l,columnIndex:v,columnKey:T,rowIndex:p,rowName:f,cellKey:T}))}),_.warnings.forEach(A=>{r.push(on({severity:"warning",message:A,tableIndex:i,tableName:l,columnIndex:v,columnKey:T,rowIndex:p,rowName:f,cellKey:T}))})})})});let n=r.filter(a=>a.severity!=="warning").map(a=>a.message),o=r.filter(a=>a.severity==="warning").map(a=>a.message);return{valid:n.length===0,errors:n,warnings:o,issues:r,tables:s,summary:{errorCount:n.length,warningCount:o.length}}}function Mp(){return{tables:ae(nn),promptTemplate:pl,apiPreset:"",promptPreset:"",bypass:{enabled:!1,presetId:""},activeTemplate:ft,autoUpdateEnabled:!1,autoUpdateTrigger:"assistantMessage",runScope:yt.ENABLED,scope:{mode:yt.ENABLED,selectedTableIds:[],activeTableId:""},fillMode:ca.INCREMENTAL,contextDepth:8,contextRoles:"all",contextExtractTags:[],contextUseGlobalRules:!1,worldbooks:{enabled:!1,selected:[]},sendLatestRows:-1,mirrorToMessage:!1,mirrorTag:"yyt-table-workbench",worldbookSync:{enabled:!1,targetBook:"",entryComment:"YYT-\u586B\u8868\u6570\u636E"},wrapperConfig:{enabled:!0,wrapperTag:"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",wrapperHint:"\u4EE5\u4E0B\u662F\u5728\u8FD9\u4E2A\u65F6\u95F4\u70B9\uFF0C\u5F53\u524D\u573A\u666F\u4E0B\u5267\u60C5\u76F8\u5173\u7684\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55\uFF0C\u4F60\u5728\u8FDB\u884C\u5267\u60C5\u5206\u6790\u65F6\u5FC5\u987B\u4EE5\u6B64\u6700\u65B0\u7684\u6570\u636E\u4E3A\u51C6\uFF0C\u4EE5\u4E0B\u6570\u636E\u4E0E\u8BB0\u5F55\u7684\u4F18\u5148\u7EA7\u9AD8\u4E8E\u5176\u4ED6\u4EFB\u4F55\u80CC\u666F\u8BBE\u5B9A\uFF1A",wrapperPlacement:{position:"before_character_definition",depth:2,order:0}},tableEnabledOverrides:{},runtime:kp()}}function Ot(t={}){let e=Mp(),r=t&&typeof t=="object"?t:{},s=r.bypass?r.bypass:r.bypassPresetId?{presetId:r.bypassPresetId,enabled:!!r.bypassPresetId}:void 0,n=Qb(s,r.promptPreset),o=Hb(r.tables,{seedDefaultWhenMissing:!Object.prototype.hasOwnProperty.call(r,"tables")}),a=r.scope&&typeof r.scope=="object"?r.scope:{},i=typeof r.runScope=="string"&&r.runScope?{...a,mode:r.runScope}:a,l=to(i,{mode:r.runScope,selectedTableIds:r.selectedTableIds,activeTableId:r.activeTableId}),c=sr(r.autoUpdateEnabled!==void 0?r.autoUpdateEnabled:r.automation?.enabled,e.autoUpdateEnabled);return{tables:o,promptTemplate:N(r.promptTemplate,e.promptTemplate),apiPreset:N(r.apiPreset,""),promptPreset:n.presetId,bypass:n,activeTemplate:N(r.activeTemplate,e.activeTemplate),autoUpdateEnabled:c,autoUpdateTrigger:N(r.autoUpdateTrigger,e.autoUpdateTrigger),runScope:l.mode,scope:l,fillMode:r.fillMode===ca.FULL?ca.FULL:e.fillMode,contextDepth:Number.isFinite(Number(r.contextDepth))&&Number(r.contextDepth)>0?Math.floor(Number(r.contextDepth)):e.contextDepth,contextRoles:r.contextRoles==="assistant_only"?"assistant_only":"all",contextExtractTags:Array.isArray(r.contextExtractTags)?r.contextExtractTags.filter(d=>typeof d=="string"&&d.trim()):typeof r.contextExtractTags=="string"&&r.contextExtractTags.trim()?r.contextExtractTags.split(`
`).map(d=>d.trim()).filter(Boolean):[],contextUseGlobalRules:sr(r.contextUseGlobalRules??r.contextUseExtractRules??r.contextUseExcludeRules,!1),extraction:{regexPresetId:N(r.extraction?.regexPresetId,"")},worldbooks:{enabled:sr(r.worldbooks?.enabled,!1),selected:Array.isArray(r.worldbooks?.selected)?r.worldbooks.selected.filter(d=>typeof d=="string"&&d.trim()):[],presetId:N(r.worldbooks?.presetId,"")},sendLatestRows:Number.isFinite(Number(r.sendLatestRows))?Math.floor(Number(r.sendLatestRows)):-1,mirrorToMessage:sr(r.mirrorToMessage,e.mirrorToMessage),mirrorTag:N(r.mirrorTag,e.mirrorTag),worldbookSync:{enabled:sr(r.worldbookSync?.enabled,!1),targetBook:N(r.worldbookSync?.targetBook,""),entryComment:N(r.worldbookSync?.entryComment,e.worldbookSync.entryComment),wrapperConfig:r.worldbookSync?.wrapperConfig?{enabled:sr(r.worldbookSync.wrapperConfig?.enabled,!0),wrapperTag:N(r.worldbookSync.wrapperConfig?.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:N(r.worldbookSync.wrapperConfig?.wrapperHint,""),wrapperPlacement:{position:N(r.worldbookSync.wrapperConfig?.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.depth))?Math.floor(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.order))?Math.floor(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}}:void 0},wrapperConfig:{enabled:sr(r.wrapperConfig?.enabled,e.wrapperConfig.enabled),wrapperTag:N(r.wrapperConfig?.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:N(r.wrapperConfig?.wrapperHint,e.wrapperConfig.wrapperHint),wrapperPlacement:{position:N(r.wrapperConfig?.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(r.wrapperConfig?.wrapperPlacement?.depth))?Math.floor(Number(r.wrapperConfig?.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(r.wrapperConfig?.wrapperPlacement?.order))?Math.floor(Number(r.wrapperConfig?.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}},tableEnabledOverrides:r.tableEnabledOverrides&&typeof r.tableEnabledOverrides=="object"&&!Array.isArray(r.tableEnabledOverrides)?Object.fromEntries(Object.entries(r.tableEnabledOverrides).filter(([d,u])=>typeof d=="string"&&d&&typeof u=="boolean")):{},runtime:kp({...e.runtime,...r.runtime||{}})}}function bl(t={}){let e=Ot(t),r=[];return Array.isArray(e.tables)||r.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u662F JSON \u6570\u7EC4\u3002"),e.promptTemplate||r.push("\u586B\u8868 Prompt \u4E0D\u80FD\u4E3A\u7A7A\u3002"),e.mirrorTag||r.push("\u6B63\u6587\u955C\u50CF\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A\u3002"),{valid:r.length===0,errors:r,config:e}}function ke(){let t=fl.get(gl,Mp()),e=Ot(t),r=ul();return{...vp(e,r),guide:r}}function sx(t){let r=(Array.isArray(t?.tables)?t.tables:[]).map(s=>({...s,rows:[]}));return{...t,tables:r}}function st(t={}){let e=ke(),r=Ot({...e,...t||{},runtime:t?.runtime===void 0?e.runtime:t.runtime}),s=bl(r);if(!s.valid)return{success:!1,error:s.errors.join(`
`),errors:s.errors,config:s.config};let n=sx(s.config);return fl.set(gl,n),wp({templateId:s.config.activeTemplate,scope:s.config.scope,worldbookSync:s.config.worldbookSync}),{success:!0,config:s.config}}function Rp(t={}){let e=ke(),r=Ot({...e,runtime:{...e.runtime,...t||{}}});return fl.set(gl,r),r.runtime}function nx(t={},e={}){let r=Ot(t),s=N(r.promptTemplate,pl);return e.skipResponseContract?s.trim():`${s}

${Sp}`.trim()}function Pp(t={},e={}){let r=Ot(t);return{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",promptTemplate:nx(r,e),bypass:{enabled:r.bypass?.enabled===!0,presetId:r.bypass?.presetId||r.promptPreset||""}}}var fl,gl,rr=D(()=>{Be();je();an();la();Tp();Ep();Cp();fl=$.namespace("tableWorkbench"),gl="config"});function wl(){return xl||(xl=I.createScope("TableIsolation")),xl}var Np,Dp,xl,vl,Ie,Ss=D(()=>{Be();W();je();Np="tableEngine.isolation",Dp=Object.freeze({enabled:!1,key:Lt});vl=class{constructor(){this._cache=null,this._subscribers=new Set}getState(){if(this._cache)return this._cache;let e=$.get(Np,null);return this._cache=this._normalize(e),this._cache}isEnabled(){return this.getState().enabled===!0}getKey(){let e=this.getState();return e.enabled?e.key||Lt:Lt}getConfiguredKey(){return this.getState().key}setEnabled(e){let r=this._normalize({...this.getState(),enabled:!!e});this._commit(r,{reason:"enabled"})}setKey(e){let r=this._normalize({...this.getState(),key:e});this._commit(r,{reason:"key"})}updateState(e={}){let r=this.getState(),s=this._normalize({enabled:e.enabled!==void 0?!!e.enabled:r.enabled,key:e.key!==void 0?e.key:r.key});this._commit(s,{reason:"patch"})}reset(){this._commit({...Dp},{reason:"reset"})}getScopeKey(e){return eo(e,this.getKey())}subscribe(e){return typeof e!="function"?()=>{}:(this._subscribers.add(e),()=>this._subscribers.delete(e))}_normalize(e){return!e||typeof e!="object"?{...Dp}:{enabled:e.enabled===!0,key:Ee(e.key)}}_commit(e,r={}){let s=this.getState();if(s.enabled===e.enabled&&s.key===e.key)return;this._cache=e;try{$.set(Np,e)}catch(o){wl().error("isolation \u72B6\u6001\u843D\u76D8\u5931\u8D25",o)}wl().info("isolation \u72B6\u6001\u53D8\u5316",{prev:s,next:e,reason:r.reason||""});let n={...e,prev:s,reason:r.reason||""};for(let o of this._subscribers)try{o(n)}catch(a){wl().error("isolation \u8BA2\u9605\u8005\u56DE\u8C03\u5F02\u5E38",a)}}},Ie=new vl});var $p={};re($p,{AuthorityProvider:()=>pa,default:()=>ax});var ln,Tl,ox,Wr,pa,ax,Lp=D(()=>{W();dn();ln=I.createScope("AuthorityProvider"),Tl="third-party/youyou-toolkit",ox="YouYou Toolkit",Wr="main",pa=class{constructor({extensionVersion:e="1.0.149"}={}){this.kind=cn.AUTHORITY,this._client=null,this._extensionVersion=e,this._initialized=!1}async init(){let e=ya();if(!e)return ln.error("\u672A\u68C0\u6D4B\u5230 window.STAuthority.AuthoritySDK"),!1;try{return this._client=await e.init({extensionId:Tl,displayName:ox,version:this._extensionVersion,installType:"local",declaredPermissions:{sql:{private:!0}}}),this._initialized=!0,ln.info("AuthorityProvider \u521D\u59CB\u5316\u6210\u529F",{extensionId:Tl}),!0}catch(r){return ln.error("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25",{error:r?.message||r}),this._initialized=!1,!1}}async dispose(){this._client=null,this._initialized=!1}async migrate({migrations:e,database:r=Wr,tableName:s}={}){this._ensureReady();let n={database:r,migrations:e};s&&(n.tableName=s);let o=await this._client.sql.migrate(n);return{applied:o?.applied||[],skipped:o?.skipped||[],tableName:o?.tableName,latestId:o?.latestId}}async query({statement:e,params:r=[],database:s=Wr,page:n=void 0}={}){this._ensureReady();let o={database:s,statement:e,params:r};n&&(o.page=n);let a=await this._client.sql.query(o);return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0),page:a.page}}async execute({statement:e,params:r=[],database:s=Wr}={}){this._ensureReady();let n=await this._client.sql.exec({database:s,statement:e,params:r});return{rowsAffected:n.rowsAffected??0,lastInsertRowid:n.lastInsertRowid??null}}async batch({statements:e,database:r=Wr}={}){this._ensureReady();let s=(e||[]).map(o=>({mode:o.mode||(/^\s*SELECT/i.test(o.statement)?"query":"exec"),statement:o.statement,params:o.params||[]}));return{results:(await this._client.sql.batch({database:r,statements:s}))?.results||[]}}async transaction({statements:e,database:r=Wr}={}){this._ensureReady();let s=(e||[]).map(o=>({mode:o.mode||(/^\s*SELECT/i.test(o.statement)?"query":"exec"),statement:o.statement,params:o.params||[]})),n=await this._client.sql.transaction({database:r,statements:s});return{committed:!!n?.committed,results:n?.results||[]}}async paginate({statement:e,params:r=[],database:s=Wr,page:n={}}={}){return this._ensureReady(),this.query({statement:e,params:r,database:s,page:n})}async pageAll({statement:e,params:r=[],database:s=Wr,pageSize:n=200,maxPages:o}={}){this._ensureReady();let a=await this._client.sql.pageAll({database:s,statement:e,params:r},{pageSize:n,maxPages:o});return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0)}}async backup(){return ln.warn("backup() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5907\u4EFD"),{kind:"authority",timestamp:Date.now()}}async export(){return ln.warn("export() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u51FA"),{kind:"authority",timestamp:Date.now()}}async import(){ln.warn("import() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u5165")}describe(){return{kind:this.kind,initialized:this._initialized,extensionId:Tl,database:Wr,hasClient:!!this._client}}_ensureReady(){if(!this._initialized||!this._client)throw new Error("AuthorityProvider \u5C1A\u672A\u521D\u59CB\u5316")}},ax=pa});var Bp={};re(Bp,{FallbackProvider:()=>fa,default:()=>fx});function ix(t){let e=[],r=0,s="";for(let n of t)n==="("?r+=1:n===")"&&(r-=1),n===","&&r===0?(s.trim()&&e.push(s),s=""):s+=n;return s.trim()&&e.push(s),e}function lx(t){let e=t.match(/^\s*CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(([\s\S]+)\)\s*$/i);if(!e)return null;let r=e[1],s=e[2],n=ix(s),o=[],a=[];for(let i of n){let l=i.trim(),c=l.match(/^PRIMARY\s+KEY\s*\(([^)]+)\)$/i);if(c){a=c[1].split(",").map(u=>u.trim());continue}let d=l.match(/^(\w+)\s+(\w+)/);d&&(o.push({name:d[1],type:d[2].toUpperCase(),raw:l}),/PRIMARY\s+KEY/i.test(l)&&!a.length&&(a=[d[1]]))}return{name:r,columns:o,pkCols:a}}function cx(t){let e=t.match(/^\s*INSERT\s+(?:OR\s+REPLACE\s+)?INTO\s+(\w+)(?:\s*\(([^)]+)\))?\s+VALUES\s*\(([^)]+)\)\s*$/i);if(!e)return null;let r=e[1],s=e[2]?e[2].split(",").map(o=>o.trim()):null,n=(e[3].match(/\?/g)||[]).length;return{name:r,cols:s,paramCount:n}}function El(t){let e=t.split(/\s+AND\s+/i),r=[];for(let s of e){let n=s.match(/^\s*(\w+)\s*(=|!=|<>|>=|<=|>|<)\s*\?\s*$/);if(n){let a=n[2]==="<>"?"!=":n[2];r.push({col:n[1],op:a,placeholder:!0});continue}let o=s.match(/^\s*(\w+)\s+IS\s+(NOT\s+)?NULL\s*$/i);if(o){r.push({col:o[1],op:o[2]?"IS NOT NULL":"IS NULL",placeholder:!1});continue}throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 WHERE \u5B50\u53E5: "${s}"`)}return r}function dx(t){let e=t.match(/^\s*SELECT\s+([\s\S]+?)\s+FROM\s+(\w+)([\s\S]*)$/i);if(!e)return null;let r=e[1].trim(),s=e[2],n=e[3],o=n.match(/\bWHERE\s+([\s\S]+?)(?=\bORDER\s+BY\b|\bLIMIT\b|\bOFFSET\b|$)/i),a=n.match(/\bORDER\s+BY\s+(\w+)\s*(ASC|DESC)?/i),i=n.match(/\bLIMIT\s+(\d+)/i),l=n.match(/\bOFFSET\s+(\d+)/i);return{name:s,cols:r==="*"?null:r.split(",").map(c=>c.trim()),where:o?El(o[1].trim()):null,orderBy:a?{col:a[1],dir:(a[2]||"ASC").toUpperCase()}:null,limit:i?parseInt(i[1],10):null,offset:l?parseInt(l[1],10):null}}function ux(t){let e=t.match(/^\s*UPDATE\s+(\w+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);if(!e)return null;let r=e[1],s=e[2],n=e[3],o=s.split(",").map(a=>{let i=a.trim().match(/^(\w+)\s*=\s*\?$/);if(!i)throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 SET \u5B50\u53E5: "${a}"`);return i[1]});return{name:r,setCols:o,where:n?El(n.trim()):null}}function px(t){let e=t.match(/^\s*DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);return e?{name:e[1],where:e[2]?El(e[2].trim()):null}:null}function _l(t,e){return t===e?!0:t==null?e==null:e==null?!1:typeof t=="number"||typeof e=="number"?Number(t)===Number(e):String(t)===String(e)}function so(t,e){return t===e?0:t==null?-1:e==null?1:typeof t=="number"&&typeof e=="number"?t-e:String(t)<String(e)?-1:1}function yx(t,e,r){let s=t[e.col];if(e.op==="IS NULL")return s==null;if(e.op==="IS NOT NULL")return s!=null;let n=r.shift();switch(e.op){case"=":return _l(s,n);case"!=":return!_l(s,n);case">":return so(s,n)>0;case"<":return so(s,n)<0;case">=":return so(s,n)>=0;case"<=":return so(s,n)<=0;default:return!1}}function Sl(t,e,r){if(!e||!e.length)return!0;let s=Array.isArray(r)?[...r]:[];for(let n of e)if(!yx(t,n,s))return!1;return!0}var un,Op,fa,fx,zp=D(()=>{W();Be();dn();un=I.createScope("FallbackProvider"),Op="provider_fallback_v1";fa=class{constructor(){this.kind=cn.FALLBACK,this._tables=new Map,this._migrations=new Set,this._initialized=!1,this._dirty=!1,this._saveTimer=null}async init(){try{let e=he.get(Op)||{};this._migrations=new Set(Array.isArray(e.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,s]of Object.entries(e.tables||{}))this._tables.set(r,{schema:s.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(s.rows)?s.rows:[]});return this._initialized=!0,un.info("FallbackProvider \u521D\u59CB\u5316\u5B8C\u6210",{tables:this._tables.size,migrations:this._migrations.size}),!0}catch(e){return un.error("FallbackProvider \u521D\u59CB\u5316\u5931\u8D25",{error:e?.message||e}),this._initialized=!1,!1}}async dispose(){this._flushSave(!0),this._tables.clear(),this._migrations.clear(),this._initialized=!1}async migrate({migrations:e}={}){this._ensureReady();let r=[],s=[];for(let n of e||[]){if(!n?.id||!n?.statement)continue;if(this._migrations.has(n.id)){s.push(n.id);continue}let o=n.statement.trim();if(/^CREATE\s+TABLE/i.test(o)){let a=lx(o);if(!a)throw new Error(`\u65E0\u6CD5\u89E3\u6790 CREATE TABLE: ${o}`);this._tables.has(a.name)||this._tables.set(a.name,{schema:a,rows:[]})}else if(!/^CREATE\s+(UNIQUE\s+)?INDEX/i.test(o))if(/^DROP\s+TABLE/i.test(o)){let a=o.match(/^DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?(\w+)/i);a&&this._tables.delete(a[1])}else/^ALTER\s+TABLE/i.test(o)?un.warn("FallbackProvider \u4E0D\u652F\u6301 ALTER TABLE\uFF0C\u8DF3\u8FC7",{id:n.id}):un.warn("FallbackProvider \u8DF3\u8FC7\u672A\u8BC6\u522B DDL",{id:n.id,statement:o});this._migrations.add(n.id),r.push(n.id)}return this._markDirty(),{applied:r,skipped:s}}async query({statement:e,params:r=[]}={}){this._ensureReady();let s=dx(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 SELECT: ${e}`);let n=this._tables.get(s.name);if(!n)return{columns:s.cols||[],rows:[],rowCount:0};let o=n.rows.filter(l=>Sl(l,s.where,r));if(s.orderBy){let l=s.orderBy.dir==="DESC"?-1:1;o=[...o].sort((c,d)=>so(c[s.orderBy.col],d[s.orderBy.col])*l)}s.offset&&(o=o.slice(s.offset)),Number.isFinite(s.limit)&&(o=o.slice(0,s.limit));let a,i=o;return s.cols?(i=o.map(l=>{let c={};for(let d of s.cols)c[d]=l[d]===void 0?null:l[d];return c}),a=s.cols):a=n.schema?.columns?.map(l=>l.name)||(i[0]?Object.keys(i[0]):[]),{columns:a,rows:i,rowCount:i.length}}async execute({statement:e,params:r=[]}={}){this._ensureReady();let s=String(e||"").trim(),n=s.split(/\s+/)[0].toUpperCase(),o;if(n==="INSERT")o=this._doInsert(s,r);else if(n==="UPDATE")o=this._doUpdate(s,r);else if(n==="DELETE")o=this._doDelete(s,r);else throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 execute \u8BED\u53E5: ${e}`);return o}_doInsert(e,r){let s=cx(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 INSERT: ${e}`);let n=this._tables.get(s.name);if(!n)throw new Error(`\u8868\u4E0D\u5B58\u5728: ${s.name}`);let o=s.cols||(n.schema.columns||[]).map(c=>c.name);if(!o.length)throw new Error(`\u8868 ${s.name} \u65E0\u5217\u5B9A\u4E49`);if(r.length!==o.length)throw new Error(`INSERT \u53C2\u6570\u6570\u91CF\u4E0D\u5339\u914D (\u671F\u671B ${o.length}, \u5B9E\u9645 ${r.length})`);let a={};for(let c=0;c<o.length;c+=1)a[o[c]]=r[c];let i=n.schema?.pkCols||[],l=/^INSERT\s+OR\s+REPLACE/i.test(e);if(i.length){let c=n.rows.findIndex(d=>i.every(u=>_l(d[u],a[u])));if(c>=0){if(l)return n.rows[c]=a,this._markDirty(),{rowsAffected:1,lastInsertRowid:c+1};throw new Error(`PRIMARY KEY \u51B2\u7A81 (${i.join(",")})`)}}return n.rows.push(a),this._markDirty(),{rowsAffected:1,lastInsertRowid:n.rows.length}}_doUpdate(e,r){let s=ux(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 UPDATE: ${e}`);let n=this._tables.get(s.name);if(!n)return{rowsAffected:0,lastInsertRowid:null};let o=s.setCols.length;if(r.length<o)throw new Error(`UPDATE \u53C2\u6570\u4E0D\u8DB3 (SET \u9700\u8981 ${o}, \u5B9E\u9645 ${r.length})`);let a=r.slice(0,o),i=r.slice(o),l=0;for(let c of n.rows)if(Sl(c,s.where,i)){for(let d=0;d<o;d+=1)c[s.setCols[d]]=a[d];l+=1}return l>0&&this._markDirty(),{rowsAffected:l,lastInsertRowid:null}}_doDelete(e,r){let s=px(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 DELETE: ${e}`);let n=this._tables.get(s.name);if(!n)return{rowsAffected:0,lastInsertRowid:null};let o=n.rows.length;n.rows=n.rows.filter(i=>!Sl(i,s.where,r));let a=o-n.rows.length;return a>0&&this._markDirty(),{rowsAffected:a,lastInsertRowid:null}}async batch({statements:e}={}){this._ensureReady();let r=[];for(let s of e||[])if(String(s.statement||"").trim().split(/\s+/)[0].toUpperCase()==="SELECT"){let o=await this.query(s);r.push({kind:"query",...o})}else{let o=await this.execute(s);r.push({kind:"exec",...o})}return{results:r}}async transaction({statements:e}={}){this._ensureReady();let r=this._snapshot();try{let{results:s}=await this.batch({statements:e});return this._flushSave(!0),{committed:!0,results:s}}catch(s){throw this._restore(r),un.warn("FallbackProvider \u4E8B\u52A1\u56DE\u6EDA",{error:s?.message||s}),s}}async paginate({statement:e,params:r=[],page:s={}}={}){this._ensureReady();let n=Number.isFinite(s?.limit)?s.limit:50,o=Number.isFinite(s?.offset)?s.offset:0,a=`${e} LIMIT ${n} OFFSET ${o}`;return this.query({statement:a,params:r})}async backup(){return this._ensureReady(),this._snapshot()}async export(){return this.backup()}async import(e){this._ensureReady(),this._restore(e||{}),this._markDirty(),this._flushSave(!0)}describe(){return{kind:this.kind,initialized:this._initialized,tables:this._tables.size,migrations:this._migrations.size,tableNames:[...this._tables.keys()]}}_snapshot(){let e={};for(let[r,s]of this._tables)e[r]={schema:s.schema,rows:JSON.parse(JSON.stringify(s.rows))};return{migrations:[...this._migrations],tables:e}}_restore(e){this._migrations=new Set(Array.isArray(e?.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,s]of Object.entries(e?.tables||{}))this._tables.set(r,{schema:s.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(s.rows)?s.rows:[]})}_markDirty(){this._dirty=!0,this._saveTimer&&clearTimeout(this._saveTimer),this._saveTimer=setTimeout(()=>this._flushSave(!1),300)}_flushSave(e){if(this._saveTimer&&(clearTimeout(this._saveTimer),this._saveTimer=null),!(!this._dirty&&!e))try{he.set(Op,this._snapshot()),this._dirty=!1}catch(r){un.error("FallbackProvider \u6301\u4E45\u5316\u5931\u8D25",{error:r?.message||r})}}_ensureReady(){if(!this._initialized)throw new Error("FallbackProvider \u5C1A\u672A\u521D\u59CB\u5316")}},fx=fa});var Kp={};re(Kp,{PROVIDER_KIND:()=>cn,createProvider:()=>gx,detectAuthoritySdk:()=>ya,disposeToolDataProvider:()=>mx,getCurrentProvider:()=>pn,getToolDataProvider:()=>oo});function ya(){if(typeof window>"u")return null;try{let t=window.STAuthority?.AuthoritySDK;if(t)return t}catch{}try{if(window.parent&&window.parent!==window){let t=window.parent.STAuthority?.AuthoritySDK;if(t)return t}}catch{}return null}async function Cl({preferAuthority:t=!0,extensionVersion:e="1.0.149"}={}){if(t&&ya()){let{AuthorityProvider:s}=await Promise.resolve().then(()=>(Lp(),$p));return new s({extensionVersion:e})}let{FallbackProvider:r}=await Promise.resolve().then(()=>(zp(),Bp));return new r}async function oo(t={}){return _s||no||(no=(async()=>{let e=await Cl({preferAuthority:!0,...t}),r=await e.init();if(!r&&e.kind===cn.AUTHORITY){Al.warn("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 FallbackProvider");try{await e.dispose()}catch{}e=await Cl({preferAuthority:!1}),r=await e.init()}return r?Al.info(`Provider \u521D\u59CB\u5316\u5B8C\u6210: kind=${e.kind}`):Al.error(`Provider \u5168\u90E8\u521D\u59CB\u5316\u5931\u8D25 (kind=${e.kind})`),_s=e,e})(),no)}function pn(){return _s}async function gx(t={}){let e=await Cl(t);return await e.init(),e}async function mx(){if(_s){try{await _s.dispose()}catch{}_s=null}no=null}var Al,cn,_s,no,dn=D(()=>{W();Al=I.createScope("ToolDataProvider"),cn=Object.freeze({AUTHORITY:"authority",FALLBACK:"fallback"}),_s=null,no=null});var ty={};re(ty,{clearChatScopeConfig:()=>ey,clearLockEntry:()=>Vp,clearScopeLocks:()=>Xp,clearSheetLocks:()=>Jp,clearSlot:()=>Yp,commitSlotTables:()=>ba,default:()=>bx,deleteRowsBySheet:()=>Wp,deleteSheetsBySlot:()=>ha,ensureTableDataReady:()=>ze,getChatScopeConfig:()=>Qp,getCurrentTableDataProvider:()=>jp,getLocksForSheet:()=>Gp,getRowsBySheet:()=>Nl,getSheetsBySlot:()=>Rl,loadSlotTables:()=>Hp,setChatScopeConfig:()=>Zp,setLockEntry:()=>qp,upsertSheetMeta:()=>Ml,upsertSheetRows:()=>Pl});function Il(){return kl||(kl=I.createScope("TableDataService")),kl}async function ze(){return Up?pn():ao||(ao=(async()=>{try{let t=await oo();if(!t)return Il().error("Provider \u4E0D\u53EF\u7528\uFF0C\u8DF3\u8FC7 migration"),null;let e=await t.migrate({migrations:[...hx]});return Up=!0,Il().info("\u8868\u683C\u6570\u636E migration \u5B8C\u6210",{kind:t.kind,applied:e?.applied?.length||0,skipped:e?.skipped?.length||0}),t}catch(t){return Il().error("table-data-service migration \u5931\u8D25",t),null}finally{ao=null}})(),ao)}function jp(){return pn()}function Fp(){return Date.now()}function ga(t){try{return JSON.stringify(t)}catch{return"{}"}}function ma(t,e=null){if(typeof t!="string")return e;try{return JSON.parse(t)}catch{return e}}function Hr(t={}){return{chatId:String(t.chatId??"").trim(),messageId:String(t.messageId??"").trim(),swipeId:String(t.swipeId??"0").trim()||"0",isolationKey:Ee(t.isolationKey)}}function Yr(t){return t&&t.chatId&&t.messageId}async function Ml(t,e){let r=await ze();if(!r)return!1;let s=Hr(t);return!Yr(s)||!e?.uid?!1:(await r.execute({statement:`INSERT INTO table_sheets
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, name, columns_json, meta_json, order_no, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e.uid),String(e.name??e.uid),ga(Array.isArray(e.columns)?e.columns:[]),ga(e.meta||e.sourceData||{}),Number.isFinite(e.orderNo)?e.orderNo:0,Fp()]}),!0)}async function Rl(t){let e=await ze();if(!e)return[];let r=Hr(t);return Yr(r)?((await e.query({statement:`SELECT * FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?
      ORDER BY order_no ASC`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rows||[]).map(n=>({uid:n.sheet_uid,name:n.name,columns:ma(n.columns_json,[]),meta:ma(n.meta_json,{}),orderNo:n.order_no||0,updatedAt:n.updated_at||0})):[]}async function ha(t){let e=await ze();if(!e)return 0;let r=Hr(t);return Yr(r)&&(await e.execute({statement:`DELETE FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rowsAffected||0}async function Pl(t,e,r){let s=await ze();if(!s)return!1;let n=Hr(t);if(!Yr(n)||!e||!Array.isArray(r))return!1;if(await s.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[n.chatId,n.messageId,n.swipeId,n.isolationKey,String(e)]}),r.length===0)return!0;let o=r.map((a,i)=>({statement:`INSERT INTO table_rows
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, row_index, row_id, row_name, cells_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[n.chatId,n.messageId,n.swipeId,n.isolationKey,String(e),i,String(a?.id??""),String(a?.name??""),ga(a?.cells||{})]}));return typeof s.transaction=="function"?await s.transaction({statements:o}):await s.batch({statements:o}),!0}async function Nl(t,e){let r=await ze();if(!r)return[];let s=Hr(t);return!Yr(s)||!e?[]:((await r.query({statement:`SELECT * FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?
      ORDER BY row_index ASC`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e)]}))?.rows||[]).map(o=>({id:o.row_id||"",name:o.row_name||"",cells:ma(o.cells_json,{}),rowIndex:o.row_index}))}async function Wp(t,e){let r=await ze();if(!r)return 0;let s=Hr(t);return!Yr(s)||!e?0:(await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e)]}))?.rowsAffected||0}async function Hp(t){let e=await Rl(t);if(e.length===0)return[];let r=[];for(let s of e){let n=await Nl(t,s.uid);r.push({id:s.uid,uid:s.uid,name:s.name,columns:s.columns,rows:n,meta:s.meta,orderNo:s.orderNo,updatedAt:s.updatedAt})}return r}async function ba(t,e){let r=await ze();if(!r)return!1;let s=Hr(t);if(!Yr(s)||!Array.isArray(e))return!1;await ha(s),await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey]});for(let n=0;n<e.length;n++){let o=e[n],a=String(o?.uid||o?.id||`sheet_${n+1}`);await Ml(s,{uid:a,name:o?.name||a,columns:o?.columns||[],meta:o?.meta||{},orderNo:Number.isFinite(o?.orderNo)?o.orderNo:n}),await Pl(s,a,Array.isArray(o?.rows)?o.rows:[])}return!0}async function Yp(t){let e=await ze();if(!e)return!1;let r=Hr(t);return Yr(r)?(await ha(r),await e.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}),!0):!1}async function Gp(t,e){let r=await ze();if(!r)return[];let s=String(t?.chatId??"").trim(),n=Ee(t?.isolationKey);return!s||!e?[]:((await r.query({statement:`SELECT lock_type, target FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s,n,String(e)]}))?.rows||[]).map(a=>({lockType:a.lock_type,target:a.target||""}))}async function qp(t,e,r,s=""){let n=await ze();if(!n)return!1;let o=String(t?.chatId??"").trim(),a=Ee(t?.isolationKey);return!o||!e||!r?!1:(await n.execute({statement:"INSERT INTO table_locks (chat_id, isolation_key, sheet_uid, lock_type, target) VALUES (?, ?, ?, ?, ?)",params:[o,a,String(e),String(r),String(s)]}),!0)}async function Vp(t,e,r,s=""){let n=await ze();if(!n)return!1;let o=String(t?.chatId??"").trim(),a=Ee(t?.isolationKey);return!o||!e||!r?!1:(await n.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ? AND lock_type = ? AND target = ?`,params:[o,a,String(e),String(r),String(s)]}),!0)}async function Jp(t,e){let r=await ze();if(!r)return!1;let s=String(t?.chatId??"").trim(),n=Ee(t?.isolationKey);return!s||!e?!1:(await r.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s,n,String(e)]}),!0)}async function Xp(t){let e=await ze();if(!e)return!1;let r=String(t?.chatId??"").trim(),s=Ee(t?.isolationKey);return r?(await e.execute({statement:"DELETE FROM table_locks WHERE chat_id = ? AND isolation_key = ?",params:[r,s]}),!0):!1}async function Qp(t){let e=await ze();if(!e)return null;let r=String(t??"").trim();if(!r)return null;let n=(await e.query({statement:"SELECT scoped_config_json FROM table_chat_scope WHERE chat_id = ?",params:[r]}))?.rows?.[0];return n?ma(n.scoped_config_json,null):null}async function Zp(t,e){let r=await ze();if(!r)return!1;let s=String(t??"").trim();return s?(await r.execute({statement:"INSERT INTO table_chat_scope (chat_id, scoped_config_json, updated_at) VALUES (?, ?, ?)",params:[s,ga(e||{}),Fp()]}),!0):!1}async function ey(t){let e=await ze();if(!e)return!1;let r=String(t??"").trim();return r?(await e.execute({statement:"DELETE FROM table_chat_scope WHERE chat_id = ?",params:[r]}),!0):!1}var kl,hx,Up,ao,bx,Dl=D(()=>{W();dn();je();hx=Object.freeze([{id:"table_engine_v1__sheets",statement:`
      CREATE TABLE IF NOT EXISTS table_sheets (
        chat_id TEXT NOT NULL,
        message_id TEXT NOT NULL,
        swipe_id TEXT NOT NULL DEFAULT '0',
        isolation_key TEXT NOT NULL DEFAULT '',
        sheet_uid TEXT NOT NULL,
        name TEXT NOT NULL,
        columns_json TEXT NOT NULL,
        meta_json TEXT,
        order_no INTEGER DEFAULT 0,
        updated_at INTEGER,
        PRIMARY KEY (chat_id, message_id, swipe_id, isolation_key, sheet_uid)
      )
    `.replace(/\s+/g," ").trim()},{id:"table_engine_v1__rows",statement:`
      CREATE TABLE IF NOT EXISTS table_rows (
        chat_id TEXT NOT NULL,
        message_id TEXT NOT NULL,
        swipe_id TEXT NOT NULL DEFAULT '0',
        isolation_key TEXT NOT NULL DEFAULT '',
        sheet_uid TEXT NOT NULL,
        row_index INTEGER NOT NULL,
        row_id TEXT,
        row_name TEXT,
        cells_json TEXT NOT NULL,
        PRIMARY KEY (chat_id, message_id, swipe_id, isolation_key, sheet_uid, row_index)
      )
    `.replace(/\s+/g," ").trim()},{id:"table_engine_v1__locks",statement:`
      CREATE TABLE IF NOT EXISTS table_locks (
        chat_id TEXT NOT NULL,
        isolation_key TEXT NOT NULL DEFAULT '',
        sheet_uid TEXT NOT NULL,
        lock_type TEXT NOT NULL,
        target TEXT NOT NULL DEFAULT '',
        PRIMARY KEY (chat_id, isolation_key, sheet_uid, lock_type, target)
      )
    `.replace(/\s+/g," ").trim()},{id:"table_engine_v1__chat_scope",statement:`
      CREATE TABLE IF NOT EXISTS table_chat_scope (
        chat_id TEXT NOT NULL,
        scoped_config_json TEXT NOT NULL,
        updated_at INTEGER,
        PRIMARY KEY (chat_id)
      )
    `.replace(/\s+/g," ").trim()}]),Up=!1,ao=null;bx={ensureTableDataReady:ze,getCurrentTableDataProvider:jp,upsertSheetMeta:Ml,getSheetsBySlot:Rl,deleteSheetsBySlot:ha,upsertSheetRows:Pl,getRowsBySheet:Nl,deleteRowsBySheet:Wp,loadSlotTables:Hp,commitSlotTables:ba,clearSlot:Yp,getLocksForSheet:Gp,setLockEntry:qp,clearLockEntry:Vp,clearSheetLocks:Jp,clearScopeLocks:Xp,getChatScopeConfig:Qp,setChatScopeConfig:Zp,clearChatScopeConfig:ey}});function vr(){return $l||($l=I.createScope("TableChatScope")),$l}function nr(){let t=globalThis.window||globalThis,e=t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1;return String(e??"").trim()||"default_chat"}function wa(){return new Date().toISOString()}function yn(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function wr(t){let e=Ol.get(Ll,{}),s=(yn(e)?e:{})[t];return sy(s)}function Es(t,e){let r=Ol.get(Ll,{}),s=yn(r)?r:{};s[t]=e,Ol.set(Ll,s),wx(t,e).catch(()=>{})}async function wx(t,e){try{let r=await Promise.resolve().then(()=>(Dl(),ty));await r.ensureTableDataReady(),await r.setChatScopeConfig(t,e||{})}catch(r){vr().warn("chat-scope SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:r?.message||String(r)})}}function ry(){return{template:{},templateArchives:{}}}function sy(t){return yn(t)?{template:yn(t.template)?t.template:{},templateArchives:yn(t.templateArchives)?t.templateArchives:{}}:ry()}function xa(t){return yn(t)?{mode:vx.has(t.mode)?t.mode:_t.INHERIT_GLOBAL,presetName:typeof t.presetName=="string"?t.presetName:"",templateStr:typeof t.templateStr=="string"?t.templateStr:"",guideData:t.guideData!==void 0?ae(t.guideData):null,updatedAt:typeof t.updatedAt=="string"?t.updatedAt:wa(),source:typeof t.source=="string"?t.source:"ui"}:null}function Tx(t){let e=[t.mode||"",t.presetName||"",t.templateStr||""],r=5381,s=e.join("||");for(let n=0;n<s.length;n++)r=(r<<5)+r+s.charCodeAt(n),r|=0;return String(r)}var xx,Ll,$l,Ol,vx,Bl,va,ny=D(()=>{Be();W();je();Ss();xx="tableChatScope",Ll="chats";Ol=$.namespace(xx);vx=new Set(Object.values(_t));Bl=class{getScopedConfig(e=nr()){return wr(e)}setScopedConfig(e,r=nr()){let s=sy(e);return Es(r,s),s}getTemplateScope(e,r=nr()){let s=Ee(e===void 0?Ie.getKey():e),n=wr(r);return xa(n.template[s])||null}setTemplateScope(e,r,s=nr()){let n=Ee(r===void 0?Ie.getKey():r),o=xa({...e,updatedAt:wa()});if(!o)return vr().warn("setTemplateScope \u6536\u5230\u65E0\u6548 state",e),null;let a=wr(s);return a.template[n]=o,Es(s,a),vr().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u66F4\u65B0",{chatId:s,isolationKey:n,mode:o.mode}),o}clearTemplateScope(e,r=nr()){let s=Ee(e===void 0?Ie.getKey():e),n=wr(r);n.template[s]!==void 0&&(delete n.template[s],Es(r,n),vr().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u6E05\u9664",{chatId:r,isolationKey:s}))}archiveCurrentTemplate(e,r=nr()){let s=Ee(e===void 0?Ie.getKey():e),n=wr(r),o=xa(n.template[s]);if(!o)return null;let a=Tx(o),i=Array.isArray(n.templateArchives[s])?n.templateArchives[s]:[];if(i.length>0&&i[0].fingerprint===a)return null;let l={fingerprint:a,state:ae(o),archivedAt:wa()},c=[l,...i].slice(0,fp);return n.templateArchives[s]=c,Es(r,n),vr().info("\u6A21\u677F\u5DF2\u5F52\u6863",{chatId:r,isolationKey:s,archiveCount:c.length}),l}listTemplateArchives(e,r=nr()){let s=Ee(e===void 0?Ie.getKey():e),n=wr(r);return(Array.isArray(n.templateArchives[s])?n.templateArchives[s]:[]).map(a=>ae(a))}restoreTemplateArchive(e,r,s=nr()){let n=Ee(r===void 0?Ie.getKey():r),o=wr(s),a=Array.isArray(o.templateArchives[n])?o.templateArchives[n]:[],i=a[e];if(!i)return vr().warn("restoreTemplateArchive: \u627E\u4E0D\u5230 archive",{index:e,available:a.length}),null;this.archiveCurrentTemplate(n,s);let l=xa({...i.state,source:"restore",updatedAt:wa()});if(!l)return null;let c=wr(s);return c.template[n]=l,Es(s,c),vr().info("\u6A21\u677F\u5DF2\u6062\u590D",{chatId:s,isolationKey:n,fromArchiveIndex:e}),l}clearTemplateArchives(e,r=nr()){let s=Ee(e===void 0?Ie.getKey():e),n=wr(r);Array.isArray(n.templateArchives[s])&&(delete n.templateArchives[s],Es(r,n),vr().info("\u6A21\u677F\u5F52\u6863\u5DF2\u6E05\u7A7A",{chatId:r,isolationKey:s}))}resetChat(e=nr()){Es(e,ry()),vr().warn("\u5DF2\u91CD\u7F6E chat \u7684 ScopedConfig",{chatId:e})}},va=new Bl});var oy,ay=D(()=>{je();oy=Object.freeze({formatId:"youyou",displayName:"YouYou \u539F\u751F (tables \u6570\u7EC4)",detect(t){return!t||typeof t!="object"||Array.isArray(t)?!1:Array.isArray(t.tables)},parse(t){if(!t||typeof t!="object")throw new Error("youyou-importer: raw \u4E0D\u662F\u5BF9\u8C61");return{tables:Array.isArray(t.tables)?ae(t.tables):[],name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:"",promptTemplate:typeof t.promptTemplate=="string"?t.promptTemplate:""}}})});function or(t,e=""){return t==null?e:String(t).trim()||e}function iy(t){return t&&typeof t=="object"&&Array.isArray(t.content)}function ly(t){return!t||typeof t!="object"?null:t.tables&&typeof t.tables=="object"&&!Array.isArray(t.tables)&&Object.keys(t.tables).filter(s=>s.startsWith("sheet_")&&iy(t.tables[s])).length>0?t.tables:Object.keys(t).filter(r=>r.startsWith("sheet_")&&iy(t[r])).length>0?t:null}function Sx(t){return!t||typeof t!="object"?[]:Object.keys(t).filter(r=>r.startsWith("sheet_")&&t[r]&&typeof t[r]=="object").map((r,s)=>({key:r,table:t[r],fallbackOrder:s})).sort((r,s)=>{let n=Number.isFinite(r.table.orderNo)?r.table.orderNo:r.fallbackOrder,o=Number.isFinite(s.table.orderNo)?s.table.orderNo:s.fallbackOrder;return n-o}).map(({key:r,table:s},n)=>{let o=s.sourceData&&typeof s.sourceData=="object"?s.sourceData:{},a=Array.isArray(s.content)?s.content:[],i=Array.isArray(a[0])?a[0]:[],l=ml(o.note),c=new Set,d=i.slice(1).map((y,p)=>{let f=l[p]||{},g=or(y||f.title,`\u5217${p+1}`);return{key:ro(g||`col_${p+1}`,c),title:g,description:or(f.description,""),type:"text",required:!1}}),u=a.slice(1).map((y,p)=>{let f=Array.isArray(y)?y:[],g={};return d.forEach((h,x)=>{g[h.key]=jr(f[x+1])}),{name:or(f[0],`\u884C${p+1}`),cells:g}});return{id:or(s.uid||r,`sheet_${n+1}`),name:or(s.name,`\u8868${n+1}`),note:or(o.note,""),enabled:s.enabled!==!1,aiInstructions:{init:or(o.initNode,""),create:or(o.insertNode,""),update:or(o.updateNode,""),delete:or(o.deleteNode,"")},columns:d,rows:u}})}var cy,dy=D(()=>{je();rr();cy=Object.freeze({formatId:"shujuku",displayName:"shujuku \u6570\u636E\u5E93\u683C\u5F0F (sheet_x)",detect(t){return!t||typeof t!="object"||Array.isArray(t)?!1:ly(t)!==null},parse(t){let e=ly(t);if(!e)throw new Error("shujuku-importer: \u672A\u627E\u5230 sheet_xxx \u5165\u53E3");return{tables:Sx(e),name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:""}}})});var uy,py=D(()=>{uy=Object.freeze({formatId:"youyou",displayName:"YouYou \u539F\u751F (.json)",fileExtension:".json",mimeType:"application/json",serialize(t){return{version:1,exportedAt:new Date().toISOString(),templates:Array.isArray(t)?t:[]}}})});function io(){return zl||(zl=I.createScope("TemplateAdapter")),zl}function yy(t){if(t==null)return null;for(let e of _x){let r=!1;try{r=e.detect(t)}catch(s){io().warn(`importer ${e.formatId} detect \u629B\u9519`,s);continue}if(r)try{let s=e.parse(t);if(s&&Array.isArray(s.tables))return io().debug("\u9002\u914D\u5668\u547D\u4E2D",{formatId:e.formatId,displayName:e.displayName,tableCount:s.tables.length,firstTableName:s.tables[0]?.name||""}),{...s,formatId:e.formatId};io().warn(`importer ${e.formatId} parse \u8FD4\u56DE\u65E0\u6548\u7ED3\u6784`,{hasResult:!!s,hasTablesArray:Array.isArray(s?.tables)})}catch(s){io().warn(`importer ${e.formatId} parse \u629B\u9519\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A`,s)}}return io().warn("importTemplateAuto: \u65E0\u9002\u914D\u5668\u547D\u4E2D",{isObject:t&&typeof t=="object",isArray:Array.isArray(t),keys:t&&typeof t=="object"?Object.keys(t).slice(0,10):[]}),null}var zl,_x,lE,fy=D(()=>{W();ay();dy();py();_x=Object.freeze([oy,cy]),lE=Object.freeze([uy])});function ar(){return Kl||(Kl=I.createScope("TableTemplate")),Kl}function nt(t,e=""){return t==null?e:String(t).trim()||e}function gy(t="template"){return`${t}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function co(t={}){let e=yy(t),r=[],s="",n="",o="",a="";e?(r=e.tables,s=e.formatId||"",n=e.name||"",o=e.description||"",a=e.promptTemplate||""):t&&typeof t=="object"&&ar().warn("normalizeTemplate: \u65E0\u9002\u914D\u5668\u547D\u4E2D\uFF0C\u6309\u7A7A\u6A21\u677F\u5904\u7406",{keys:Object.keys(t).slice(0,10)});let i=ua({tables:r});return{id:nt(t?.id,gy()),name:nt(t?.name||n,"\u672A\u547D\u540D\u6A21\u677F"),description:nt(t?.description||o,""),tables:i.tables||r,promptTemplate:nt(t?.promptTemplate||a,""),sourceFormat:s,createdAt:nt(t?.createdAt,new Date().toISOString()),updatedAt:nt(t?.updatedAt,new Date().toISOString())}}function my(){lo=null}function hy(){return[co({id:ft,name:yl,description:"\u5305\u542B\u5168\u5C40\u6570\u636E\u3001\u4E3B\u89D2\u3001\u91CD\u8981\u89D2\u8272\u3001\u6280\u80FD\u3001\u80CC\u5305\u3001\u4EFB\u52A1\u3001\u7EAA\u8981\u548C\u9009\u9879\u8868\u3002",tables:ae(nn)})]}function As(){let t=gn.get(Ul,[]);return Array.isArray(t)?t.map(co):[]}function mn(){if(lo)return lo;let t=hy(),e=As(),r=new Set(t.map(s=>s.id));return lo=Object.freeze([...t,...e.filter(s=>!r.has(s.id))]),lo}function Ts(t){let e=nt(t,"");return mn().find(r=>r.id===e)||null}function Fr(t={}){let e=new Date().toISOString(),r=co({...t,id:nt(t.id,gy()),updatedAt:e,createdAt:nt(t.createdAt,e)}),n=As().filter(o=>o.id!==r.id);return n.push(r),gn.set(Ul,n),my(),{success:!0,template:r}}function Fl(t){let e=nt(t,"");if(!e||e===ft)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u5220\u9664\u3002"};let r=As().filter(s=>s.id!==e);return gn.set(Ul,r),my(),Ex()===e&&Wl(ft),{success:!0}}function by(t,e){let r=nt(t,"");if(!r||r===ft)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u91CD\u547D\u540D\u3002"};let s=nt(e,"");if(!s)return{success:!1,error:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\u3002"};let n=Ts(r);return n?Fr({...n,name:s}):{success:!1,error:"\u6A21\u677F\u4E0D\u5B58\u5728\u3002"}}function xy(){return{version:1,exportedAt:new Date().toISOString(),templates:As()}}function wy(t,{overwrite:e=!1}={}){let r;if(Array.isArray(t))r=t;else if(t&&typeof t=="object")Array.isArray(t.templates)?r=t.templates:t.template&&typeof t.template=="object"?r=[t.template]:r=[t];else return{success:!1,imported:0,skipped:0,errors:["\u65E0\u6548\u7684\u5BFC\u5165\u6570\u636E\u683C\u5F0F\u3002"]};ar().info("importTemplates \u5F00\u59CB",{rawListCount:r.length,overwrite:e});let s=new Set(As().map(i=>i.id)),n=0,o=0,a=[];for(let i of r)try{let l=co(i);if(ar().info("importTemplates \u5355\u6761",{id:l.id,name:l.name,tableCount:Array.isArray(l.tables)?l.tables.length:0,firstTableName:l.tables?.[0]?.name||""}),!e&&s.has(l.id)){o++;continue}Fr(l),s.add(l.id),n++}catch(l){a.push(nt(l?.message,"\u672A\u77E5\u9519\u8BEF")),ar().error("importTemplates \u5355\u6761\u5931\u8D25",l)}return ar().info("importTemplates \u5B8C\u6210",{imported:n,skipped:o,errorCount:a.length}),{success:!0,imported:n,skipped:o,errors:a}}function Ex(){let t=gn.get(jl,""),e=nt(t,ft);return Ts(e)?e:ft}function Wl(t){let e=nt(t,ft);return gn.set(jl,e),ar().info("\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u5DF2\u5207\u6362",{templateId:e}),e}function fn(){let t=gn.get(jl,""),e=nt(t,ft),r=Ts(e);return r||hy()[0]}function Ax(t){if(!t||typeof t!="string")return null;try{let e=JSON.parse(t);return co(e)}catch(e){return ar().warn("templateFromString \u53CD\u5E8F\u5217\u5316\u5931\u8D25",e),null}}function hn({chatId:t,isolationKey:e}={}){let r=e===void 0?Ie.getKey():e,s=va.getTemplateScope(r,t);if(!s||s.mode===_t.INHERIT_GLOBAL){let o=fn();return ar().debug("resolveActiveTemplate: inherit_global",{chatId:t,isolationKey:r,templateId:o?.id||"",templateName:o?.name||"",tableCount:Array.isArray(o?.tables)?o.tables.length:0,firstTableName:o?.tables?.[0]?.name||""}),{template:o,mode:_t.INHERIT_GLOBAL,source:{templateId:o?.id||""}}}if(s.mode===_t.CHAT_OVERRIDE){let o=Ax(s.templateStr);if(o)return{template:o,mode:_t.CHAT_OVERRIDE,source:{}};ar().warn("chat_override templateStr \u53CD\u5E8F\u5217\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 inherit_global");let a=fn();return{template:a,mode:_t.INHERIT_GLOBAL,source:{templateId:a?.id||"",fallback:!0}}}if(s.mode===_t.PRESET_LINK){let o=s.presetName||"",a=mn(),i=a.find(c=>c.name===o)||a.find(c=>c.id===o);if(i)return{template:i,mode:_t.PRESET_LINK,source:{presetName:o,templateId:i.id}};ar().warn("preset_link \u6307\u5411\u7684\u5168\u5C40\u9884\u8BBE\u4E0D\u5B58\u5728\uFF0C\u964D\u7EA7\u5230 inherit_global",{presetName:o});let l=fn();return{template:l,mode:_t.INHERIT_GLOBAL,source:{templateId:l?.id||"",presetName:o,fallback:!0}}}let n=fn();return{template:n,mode:_t.INHERIT_GLOBAL,source:{templateId:n?.id||"",unknownMode:s.mode}}}function vy(t={}){let e=t.isolationKey===void 0?Ie.getKey():t.isolationKey;return va.listTemplateArchives(e,t.chatId)}function Ty(t,e={}){let r=e.isolationKey===void 0?Ie.getKey():e.isolationKey,s=va.restoreTemplateArchive(t,r,e.chatId);return s?{success:!0,scopeState:s}:{success:!1,error:"\u5F52\u6863\u4E0D\u5B58\u5728"}}var gn,Ul,jl,Kl,lo,an=D(()=>{Be();W();rr();je();ny();Ss();fy();gn=$.namespace("tableWorkbenchTemplates"),Ul="templates",jl="activeId";lo=null});var Ey={};re(Ey,{TableTemplatePanel:()=>_y,default:()=>Rx});function Hl(t){return t===ft}function Ix(t,{onChange:e,readonly:r}){let s=m("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});j(s,vt({label:"\u63CF\u8FF0",control:Xe({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:a=>e({description:a})})})),j(s,m("div",{text:"\u586B\u8868\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}})),j(s,m("div",{text:"\u53EF\u4F7F\u7528\u5B8F\uFF1A{{tableData}} {{lastUserMessage}} {{lastAiMessage}} {{toolWorldbookContent}} \u7B49\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u6A21\u677F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let n=m("textarea",{className:"yyt-textarea",attrs:{rows:"8",placeholder:"\u53EF\u9009 \u2014 \u81EA\u5B9A\u4E49\u586B\u8868\u63D0\u793A\u8BCD",disabled:r?"disabled":null},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});n.value=t.promptTemplate||"",n.addEventListener("change",()=>{r||e({promptTemplate:n.value})}),j(s,n),j(s,m("div",{text:`\u8868\u683C\u7ED3\u6784\uFF08${(t.tables||[]).length} \u5F20\u8868\uFF09`,style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px"}})),j(s,m("div",{text:"\u672C\u9762\u677F\u53EA\u5C55\u793A\u8868\u7ED3\u6784 JSON\u3002\u590D\u6742 schema \u7F16\u8F91\uFF08\u589E\u5220\u8868\u3001\u5217\u5B9A\u4E49\u3001\u9ED8\u8BA4\u884C\uFF09\u5C06\u5728\u586B\u8868\u5DE5\u4F5C\u53F0\u4E2D\u63D0\u4F9B\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let o=m("pre",{style:{padding:"10px 12px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm, 6px)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-secondary)",maxHeight:"260px",overflow:"auto",whiteSpace:"pre",margin:"0"}});try{o.textContent=JSON.stringify(t.tables||[],null,2)}catch{o.textContent="// \u65E0\u6CD5\u5E8F\u5217\u5316"}return j(s,o),s}function Mx(t){let r=[`${(t.tables||[]).length} \u5F20\u8868`];return t.promptTemplate&&r.push("\u81EA\u5B9A\u4E49\u6A21\u677F"),r}var Cx,Sy,kx,_y,Rx,Ay=D(()=>{yr();an();rr();W();Un();Cx=I.createScope("TableTemplatePanel"),Sy="";kx={listPresets(){return mn().map(t=>({id:Hl(t.id)?`builtin_table_${t.id}`:t.id,name:t.name,description:t.description||"",promptTemplate:t.promptTemplate||"",tables:t.tables||[],_rawId:t.id,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=t.startsWith("builtin_table_")?t.slice(14):t,r=Ts(e);return r?{id:Hl(r.id)?`builtin_table_${r.id}`:r.id,name:r.name,description:r.description||"",promptTemplate:r.promptTemplate||"",tables:r.tables||[],_rawId:r.id,createdAt:r.createdAt,updatedAt:r.updatedAt}:null},getCurrentPresetId(){return Sy||""},setCurrentPresetId(t){return Sy=t||"",!0},createPreset(t){let e=String(t?.name||"").trim()||"\u65B0\u5EFA\u6A21\u677F",r=Fr({name:e,description:t?.description||"",promptTemplate:t?.promptTemplate||"",tables:Array.isArray(t?.tables)?t.tables:[]});return r?.success?{id:r.template.id,...r.template,_rawId:r.template.id}:null},updatePreset(t,e){if(!t)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t;if(Hl(r))return Cx.warn("\u62D2\u7EDD\u4FEE\u6539\u5185\u7F6E\u8868\u683C\u6A21\u677F"),null;let s=Ts(r);if(!s)return null;let n=Fr({...s,...e,id:r});return n?.success?{id:n.template.id,...n.template,_rawId:n.template.id}:null},deletePreset(t){if(!t)return!1;let e=t.startsWith("builtin_table_")?t.slice(14):t;return!!Fl(e)?.success},duplicatePreset(t,e={}){let r=this.getPreset(t);if(!r)return null;let s=e.nameSuffix||" \u526F\u672C";return this.createPreset({name:`${r.name}${s}`,description:r.description,promptTemplate:r.promptTemplate,tables:r.tables})},renamePreset(t,e){if(!t||!e)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t,s=by(r,e);return s?.success?this.getPreset(s.template?.id||r):null},exportAll(){return xy()},importPresets(t){let e=wy(t,{overwrite:!1});return{added:e?.imported||0,skipped:e?.skipped||0}},resetAll(){let t=As();for(let e of t)try{Fl(e.id)}catch{}}};_y=Rr({id:"tableTemplatePanel",kind:"table",panelTitle:"\u8868\u683C\u6A21\u677F",panelHint:"\u7BA1\u7406\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u8868\u683C\u7ED3\u6784\u6A21\u677F\u3002\u5728\u586B\u8868\u9762\u677F\u9876\u90E8\u5DE5\u5177\u680F\u53EF\u5FEB\u901F\u52A0\u8F7D/\u4FDD\u5B58\u5F53\u524D\u6A21\u677F\u3002",store:kx,renderEditor:Ix,renderListItemMeta:Mx}),Rx=_y});var ky={};re(ky,{ToolManagePanel:()=>Cy,default:()=>Px});var Cy,Px,Iy=D(()=>{Ge();Yn();er();Cy={id:"toolManagePanel",_removeDialog(t){if(!t?.length)return;let e=t.find("#yyt-tool-dialog-overlay");ct(e,"yytToolManageDialogSelect"),e.remove()},_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let r=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!r){C("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}r.switchMainTab("tools"),r.switchSubTab("tools",t)},render(t){let e=Xt(),r=Object.entries(e),s=r.filter(([,n])=>n?.enabled!==!1).length;return`
      <div class="yyt-tool-manager">
        <!-- Stats -->
        <div class="yyt-flow-section">
          <div class="yyt-stat-row" style="grid-template-columns: 1fr 1fr;">
            <div class="yyt-stat-cell">
              <div class="yyt-stat-label">\u5DE5\u5177\u603B\u6570</div>
              <div class="yyt-stat-value">${r.length}</div>
            </div>
            <div class="yyt-stat-cell">
              <div class="yyt-stat-label">\u5DF2\u542F\u7528</div>
              <div class="yyt-stat-value" style="color: var(--yyt-success);">${s}</div>
            </div>
          </div>
        </div>

        <!-- \u5DE5\u5177\u5217\u8868 -->
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading">
            <span class="yyt-flow-heading-icon"><i class="fa-solid fa-tools"></i></span>
            \u5DE5\u5177\u5217\u8868
            <span class="yyt-flow-heading-action">
              <button class="yyt-btn yyt-btn-small yyt-btn-primary" id="yyt-add-tool">
                <i class="fa-solid fa-plus"></i> \u65B0\u5EFA\u5DE5\u5177
              </button>
            </span>
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
    `},_renderToolList(t){let e=Object.entries(t);return e.length?`<div class="yyt-list-table">${e.map(([s,n])=>`
      <div class="yyt-list-row ${n.enabled?"yyt-tool-item-enabled":"yyt-tool-item-disabled"}" data-tool-id="${s}">
        <div class="yyt-list-row-icon" style="background: var(--yyt-accent-soft); color: var(--yyt-accent);">
          <i class="fa-solid fa-wrench"></i>
        </div>
        <div class="yyt-list-row-main">
          <div class="yyt-list-row-name">
            ${se(n.name)}
            <span class="yyt-badge" style="background: var(--yyt-accent-soft); color: var(--yyt-accent); margin-left: 6px;">${se(n.category)}</span>
          </div>
          <div class="yyt-list-row-desc">${se(n.description)}</div>
        </div>
        <span class="yyt-status-dot ${n.enabled?"yyt-status-dot-on":"yyt-status-dot-off"}"></span>
        <label class="yyt-toggle yyt-small yyt-tool-toggle">
          <input type="checkbox" ${n.enabled?"checked":""}>
          <span class="yyt-toggle-slider"></span>
        </label>
        <div class="yyt-list-row-actions">
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-action="config">
            <i class="fa-solid fa-sliders"></i>
          </button>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-action="edit">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="yyt-btn yyt-btn-small yyt-btn-danger" data-action="delete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `).join("")}</div>`:`
        <div class="yyt-empty-state-small">
          <i class="fa-solid fa-toolbox"></i>
          <span>\u8FD8\u6CA1\u6709\u81EA\u5B9A\u4E49\u5DE5\u5177\uFF0C\u70B9\u51FB\u53F3\u4E0A\u89D2"\u65B0\u5EFA\u5DE5\u5177"\u5F00\u59CB\u521B\u5EFA</span>
        </div>
      `},bindEvents(t,e){let r=Q();!r||!ge(t)||(t.off(".yytToolManage"),this._bindToolEvents(t,r),this._bindFileEvents(t,r))},_bindToolEvents(t,e){t.on("change.yytToolManage",".yyt-tool-toggle input",r=>{let s=e(r.currentTarget).closest(".yyt-list-row"),n=s.data("tool-id"),o=e(r.currentTarget).is(":checked");Qo(n,o),s.toggleClass("yyt-tool-item-enabled",o).toggleClass("yyt-tool-item-disabled",!o),s.find(".yyt-status-dot").toggleClass("yyt-status-dot-on",o).toggleClass("yyt-status-dot-off",!o),C("info",o?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.on("click.yytToolManage","#yyt-add-tool",()=>{this._showToolEditDialog(t,e,null)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="config"]',r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._openToolConfig(s)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="edit"]',r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._showToolEditDialog(t,e,s)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="delete"]',async r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id"),n=Qt(s);if(!s||!n||!await pr("\u5220\u9664\u5DE5\u5177",`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177"${n.name}"\u5417\uFF1F`,{danger:!0}))return;if(!qs(s)){C("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),C("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.on("click.yytToolManage","#yyt-import-tools",()=>{t.find("#yyt-import-tools-file").click()}),t.on("change.yytToolManage","#yyt-import-tools-file",async r=>{let s=r.target.files[0];if(s){try{let n=await zn(s),o=Js(n,{overwrite:!1});C(o.success?"success":"error",o.message),o.success&&this.renderTo(t)}catch(n){C("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}e(r.target).val("")}}),t.on("click.yytToolManage","#yyt-export-tools",()=>{try{let r=Vs();Bn(r,`youyou_toolkit_tools_${Date.now()}.json`),C("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(r){C("error",`\u5BFC\u51FA\u5931\u8D25: ${r.message}`)}}),t.on("click.yytToolManage","#yyt-reset-tools",async()=>{await pr("\u91CD\u7F6E\u5DE5\u5177","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F",{danger:!0})&&(Xs(),this.renderTo(t),C("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,r){let s=r?Qt(r):null,n=!!s,o=`
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
                       value="${s?se(s.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u5206\u7C7B</label>
                <select class="yyt-select" id="yyt-tool-category">
                  <option value="api" ${s?.category==="api"?"selected":""}>API</option>
                  <option value="prompt" ${s?.category==="prompt"?"selected":""}>Prompt</option>
                  <option value="utility" ${s?.category==="utility"?"selected":""}>Utility</option>
                </select>
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0</label>
              <input type="text" class="yyt-input" id="yyt-tool-desc"
                     value="${s?se(s.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u8D85\u65F6\u65F6\u95F4(ms)</label>
                <input type="number" class="yyt-input" id="yyt-tool-timeout"
                       value="${s?.config?.execution?.timeout||6e4}">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u91CD\u8BD5\u6B21\u6570</label>
                <input type="number" class="yyt-input" id="yyt-tool-retries"
                       value="${s?.config?.execution?.retries||3}">
              </div>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="yyt-tool-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="yyt-tool-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;this._removeDialog(t),t.append(o);let a=t.find("#yyt-tool-dialog-overlay"),i=a.find("#yyt-tool-name"),l=a.find("#yyt-tool-category"),c=a.find("#yyt-tool-desc"),d=a.find("#yyt-tool-timeout"),u=a.find("#yyt-tool-retries");Nt(a,{namespace:"yytToolManageDialogSelect",selectors:["#yyt-tool-category"]});let y=()=>{ct(a,"yytToolManageDialogSelect"),a.remove()};a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",y),a.on("click",function(p){p.target===this&&y()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let p=i.val().trim(),f=l.val(),g=c.val().trim(),h=parseInt(d.val())||6e4,x=parseInt(u.val())||3;if(!p){C("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0"),i.trigger("focus").trigger("select");return}let v=r||`tool_${Date.now()}`;if(!Gs(v,{name:p,category:f,description:g,promptTemplate:s?.promptTemplate||"",extractTags:Array.isArray(s?.extractTags)?s.extractTags:[],config:{execution:{timeout:h,retries:x},api:s?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(s?.config?.messages)?s.config.messages:[],context:{depth:s?.config?.context?.depth||3,includeTags:Array.isArray(s?.config?.context?.includeTags)?s.config.context.includeTags:[],excludeTags:Array.isArray(s?.config?.context?.excludeTags)?s.config.context.excludeTags:[]},worldbooks:{enabled:s?.config?.worldbooks?.enabled===!0,selected:Array.isArray(s?.config?.worldbooks?.selected)?s.config.worldbooks.selected:[]}},enabled:s?.enabled!==!1})){C("error",n?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}Zs(v),y(),this.renderTo(t),C("success",n?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),n||this._openToolConfig(v)})},destroy(t){!Q()||!ge(t)||(this._removeDialog(t),t.off(".yytToolManage"))},getStyles(){return`
      /* \u5DE5\u5177\u7BA1\u7406\u9762\u677F\u6837\u5F0F */
      .yyt-tool-manager {
        display: flex;
        flex-direction: column;
        gap: 0;
        min-height: 100%;
      }

      .yyt-tool-list {
        display: flex;
        flex-direction: column;
        gap: 0;
        min-height: 0;
        overflow-y: auto;
      }

      .yyt-tool-item-disabled {
        opacity: 0.6;
        filter: saturate(0.8);
      }

      @media screen and (max-width: 768px) {
        .yyt-list-row {
          flex-wrap: wrap;
        }
        .yyt-list-row-actions {
          width: 100%;
          justify-content: flex-end;
        }
      }
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},Px=Cy});var Ry={};re(Ry,{BypassManager:()=>Ta,DEFAULT_BYPASS_PRESETS:()=>Sr,addMessage:()=>qx,buildBypassMessages:()=>Zx,bypassManager:()=>ie,createPreset:()=>Ux,default:()=>ew,deleteMessage:()=>Jx,deletePreset:()=>Fx,duplicatePreset:()=>Wx,exportPresets:()=>Xx,getAllPresets:()=>zx,getDefaultPresetId:()=>Hx,getEnabledMessages:()=>Gx,getPreset:()=>Kx,getPresetList:()=>uo,importPresets:()=>Qx,setDefaultPresetId:()=>Yx,updateMessage:()=>Vx,updatePreset:()=>jx});function My(t){let e=String(t||"").trim().toLowerCase();return e==="system"?"SYSTEM":e==="assistant"||e==="ai"?"assistant":"USER"}function Lx(t){return t&&typeof t=="object"&&typeof t.content=="string"&&!t.name&&!Array.isArray(t.messages)}function Ox(t){return String(t||"").replace(/\$0/g,"{{toolContentMacro}}").replace(/\$1/g,"{{rawRecentMessagesText}}").replace(/\$4/g,"{{toolWorldbookContent}}").replace(/\$8/g,"{{userMessage}}").replace(/\$C/g,"{{characterCard}}")}function Bx(t,e,r){let s=t.mainSlot||(t.isMain?"A":t.isMain2?"B":"");return{id:typeof t.id=="string"&&t.id.trim()?t.id.trim():`${r}_msg_${e+1}`,role:My(t.role),content:Ox(t.content),enabled:t.enabled!==!1,deletable:t.deletable!==!1,...s?{mainSlot:s,isMain:s==="A",isMain2:s==="B"}:{}}}var Nx,Tr,bn,Yl,Dx,Sr,$x,Ta,ie,zx,uo,Kx,Ux,jx,Fx,Wx,Hx,Yx,Gx,qx,Vx,Jx,Xx,Qx,Zx,ew,xn=D(()=>{Be();Ye();W();Nx=I.createScope("BypassManager"),Tr="bypass_presets",bn="default_bypass_preset",Yl="current_bypass_preset",Dx=Object.freeze([{id:"table_fill_default_msg_1",role:"SYSTEM",content:"\u4F60\u662F\u4E00\u4E2A\u52A9\u624B\uFF0C\u8D1F\u8D23\u542C\u4ECE\u7528\u6237\u7684\u6307\u4EE4\u5B8C\u6210\u4F60\u7684\u5DE5\u4F5C",enabled:!0,deletable:!0},{id:"table_fill_default_msg_2",role:"assistant",content:"\u6536\u5230\uFF0C\u6211\u5C06\u5145\u5206\u63CF\u7ED8\u7528\u6237\u7684\u610F\u5FD7\uFF0C\u6BEB\u4E0D\u5077\u61D2\uFF0C\u5E76\u4E14\u6211\u4E00\u5B9A\u4F1A\u9075\u7167\u7528\u6237\u7684\u8981\u6C42",enabled:!0,deletable:!0},{id:"table_fill_default_msg_3",role:"USER",content:`\u4EE5\u4E0B\u662F\u4F60\u53EF\u80FD\u9700\u8981\u7528\u5230\u7684\u80CC\u666F\u8BBE\u5B9A\uFF0C\u6CE8\u610F\u4F60\u53EA\u9700\u8981\u5176\u4E2D\u5173\u4E8E\u5267\u60C5\u4EE5\u53CA\u4EBA\u8BBE\u65B9\u9762\u7684\u6570\u636E\uFF0C\u4E0D\u9700\u8981\u601D\u8003\u91CC\u8FB9\u9664\u6B64\u4E4B\u5916\u7684\u4EFB\u4F55\u683C\u5F0F\u6216\u8005\u601D\u7EF4\u94FE\u65B9\u9762\u7684\u8981\u6C42\uFF1A
<\u80CC\u666F\u8BBE\u5B9A>
{{characterCard}}
{{toolWorldbookContent}}
</\u80CC\u666F\u8BBE\u5B9A>

<\u6B63\u6587\u6570\u636E>
{{rawRecentMessagesText}}
</\u6B63\u6587\u6570\u636E>

`,enabled:!0,deletable:!0},{id:"table_fill_default_msg_4",role:"assistant",content:"\u6536\u5230\uFF0C\u6211\u5C06\u6309\u7167\u8981\u6C42\u8BA4\u771F\u9605\u8BFB\u80CC\u666F\u8BBE\u5B9A\uFF0C\u5E76\u5C06\u5176\u4E2D\u5173\u4E8E\u5267\u60C5\u4EE5\u53CA\u4EBA\u8BBE\u65B9\u9762\u7684\u6570\u636E\u8FD0\u7528\u5230\u540E\u7EED\u601D\u8003\u5F53\u4E2D\u3002",enabled:!0,deletable:!0},{id:"table_fill_default_msg_5",role:"USER",content:`\u4F60\u662F\u3010\u586B\u8868AI\u3011\uFF0C\u8D1F\u8D23\u6839\u636E\u7528\u6237\u63D0\u4F9B\u7684\u8D44\u6599\u5BF9\u8868\u683C\u6570\u636E\u6267\u884C\u589E\u5220\u6539\u64CD\u4F5C\u3002

## \u6838\u5FC3\u4EFB\u52A1
\u4F9D\u636E\u4E09\u7C7B\u8D44\u6599\u6765\u6E90\u6267\u884C\u8868\u683C\u7F16\u8F91\uFF1A
- <\u80CC\u666F\u8BBE\u5B9A>\uFF1A\u6545\u4E8B\u53CA\u4EBA\u7269\u8BBE\u5B9A
- <\u6B63\u6587\u6570\u636E>\uFF1A\u4E0A\u8F6E\u53D1\u751F\u7684\u6545\u4E8B
- <\u5F53\u524D\u8868\u683C\u6570\u636E>\uFF1A\u4E4B\u524D\u7684\u6570\u636E\u4F5C\u4E3A\u586B\u8868\u57FA\u7840

## \u8F93\u51FA\u683C\u5F0F\uFF08\u4E25\u683C\u6267\u884C\uFF09
\u53EA\u8FD4\u56DE JSON\uFF0C\u4E0D\u8981\u9644\u52A0\u89E3\u91CA\u3001\u6807\u9898\u6216 Markdown\u3002JSON \u7ED3\u6784\u5FC5\u987B\u662F\uFF1A
{
  "tables": []
}

## \u5173\u952E\u89C4\u5219
1. \u5FC5\u987B\u9010\u8868\u9605\u8BFB\u6BCF\u4E2A\u8868\u683C\u7684 note \u90E8\u5206\uFF0C\u4E25\u683C\u9075\u5B88\u5176\u4E2D\u7684\u7EA6\u675F\u3002
2. note \u7684\u7EA6\u675F\u4F18\u5148\u7EA7\u6700\u9AD8\uFF0C\u9AD8\u4E8E\u901A\u7528\u586B\u8868\u7ECF\u9A8C\u3002
3. \u82E5 note \u8981\u6C42\u7981\u6B62\u4FEE\u6539\u3001\u683C\u5F0F\u56FA\u5B9A\u6216\u7F16\u7801\u89C4\u5219\uFF0C\u5FC5\u987B\u4E25\u683C\u6267\u884C\u3002
4. \u9664\u4E86 note \u5916\uFF0C\u53EF\u80FD\u8FD8\u5B58\u5728\u67D0\u4E9B\u5B58\u653E\u7279\u6B8A\u586B\u8868\u89C4\u5219\u7684\u8868\u683C\uFF0C\u586B\u8868\u524D\u9700\u5148\u8FDB\u884C\u9605\u8BFB\uFF0C\u5E76\u4E25\u683C\u9075\u5B88\u5176\u4E2D\u7684\u7EA6\u675F\u3002
5. \u6CA1\u6709\u4F9D\u636E\u65F6\u4FDD\u7559\u539F\u503C\uFF0C\u4E0D\u8981\u81C6\u9020\u672A\u51FA\u73B0\u7684\u4FE1\u606F\u3002

\u73B0\u5728\u5F00\u59CB\u6309\u6B64\u683C\u5F0F\u6267\u884C\u586B\u8868\u4EFB\u52A1\u3002`,enabled:!0,deletable:!1,mainSlot:"A",isMain:!0},{id:"table_fill_default_msg_6",role:"assistant",content:"\u6536\u5230\u547D\u4EE4\uFF0C\u6211\u5C06\u4E25\u683C\u6309\u7167\u7528\u6237\u8981\u6C42\u6267\u884C\u586B\u8868\u4EFB\u52A1\uFF0C\u5E76\u4EC5\u8F93\u51FA\u7B26\u5408\u683C\u5F0F\u7EA6\u675F\u7684\u5185\u5BB9\u3002",enabled:!0,deletable:!0},{id:"table_fill_default_msg_7",role:"USER",content:`\u73B0\u5728\u8BF7\u6309\u7167\u6211\u7684\u8981\u6C42\u7ACB\u523B\u5F00\u59CB\u4F60\u7684\u5DE5\u4F5C
========================

\u4EE5\u4E0B\u662F\u5F53\u524D\u7684<\u5F53\u524D\u8868\u683C\u6570\u636E>\uFF0C\u8BB0\u5F55\u6709\u672C\u8F6E\u4E4B\u524D\u7684\u6570\u636E\uFF0C\u4F60\u7684\u4E00\u5207\u64CD\u4F5C\u6307\u4EE4\u90FD\u5FC5\u987B\u5728\u8FD9\u4E2A<\u5F53\u524D\u8868\u683C\u6570\u636E>\u7684\u57FA\u7840\u4E0E\u6307\u5BFC\u4E0A\u8FDB\u884C\uFF1A
<\u5F53\u524D\u8868\u683C\u6570\u636E>
{{toolContentMacro}}
</\u5F53\u524D\u8868\u683C\u6570\u636E>

{{userMessage}}`,enabled:!0,deletable:!1,mainSlot:"B",isMain2:!0},{id:"table_fill_default_msg_8",role:"assistant",content:"\u6536\u5230\u6307\u4EE4\uFF0C\u6211\u5C06\u4E00\u6B65\u4E00\u6B65\u5F00\u59CB\u601D\u8003\uFF0C\u5E76\u5B8C\u6210\u586B\u8868\uFF0C\u9996\u5148\u6211\u8981\u5206\u6790\u5F53\u524D\u8F6E\u6B21\u7684\u5267\u60C5\u53D8\u5316\u3002",enabled:!0,deletable:!0}]),Sr={table_workbench_fill_default:{id:"table_workbench_fill_default",name:"\u9ED8\u8BA4\u586B\u8868 Ai \u6307\u4EE4\u9884\u8BBE",description:"\u7528\u4E8E\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u5185\u7F6E Ai \u6307\u4EE4\u9884\u8BBE\uFF0C\u53EF\u590D\u5236\u540E\u6309\u9700\u7F16\u8F91\u3002",enabled:!0,messages:Dx.map(t=>({...t})),createdAt:0,updatedAt:0}},$x=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]);Ta=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=$.get(Tr,{});return this._cache={...Sr,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((r,s)=>(s.updatedAt||0)-(r.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:r,name:s,description:n,messages:o}=e;if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=r.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let i={id:a,name:s.trim(),description:n||"",enabled:!0,messages:o||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,i),K.emit(B.BYPASS_PRESET_CREATED,{presetId:a,preset:i}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${s}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,r){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(r.id&&r.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let n={...s,...r,id:e,updatedAt:Date.now()};return this._savePreset(e,n),K.emit(B.BYPASS_PRESET_UPDATED,{presetId:e,preset:n}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u66F4\u65B0\u6210\u529F`,preset:n}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(Sr[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let s=$.get(Tr,{});return delete s[e],$.set(Tr,s),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),K.emit(B.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,r,s){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!r||!r.trim())&&(r=`${e}_copy_${Date.now()}`),this.presetExists(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(n)),id:r.trim(),name:s||`${n.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(r.trim(),o),K.emit(B.BYPASS_PRESET_CREATED,{presetId:r,preset:o}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${o.name}"`,preset:o}}addMessage(e,r){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n={id:`msg_${Date.now()}`,role:My(r.role||"SYSTEM"),content:r.content||"",enabled:r.enabled!==!1,deletable:r.deletable!==!1,...r.mainSlot?{mainSlot:r.mainSlot}:{}},o=[...s.messages||[],n];return this.updatePreset(e,{messages:o})}updateMessage(e,r,s){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=n.messages||[],a=o.findIndex(l=>l.id===r);if(a===-1)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};let i=[...o];return i[a]={...i[a],...s},this.updatePreset(e,{messages:i})}deleteMessage(e,r){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=s.messages||[],o=n.find(i=>i.id===r);if(!o)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};if(o.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=n.filter(i=>i.id!==r);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let r=this.getPreset(e);return!r||!r.enabled?[]:(r.messages||[]).filter(s=>s.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=$.get(bn,null);return e==="undefined"||e==="null"||e===""?($.remove(bn),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:($.set(bn,e),K.emit(B.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let s=this.getPreset(e);if(!s)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let r=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(r)},null,2)}importPresets(e,r={}){let{overwrite:s=!1,name:n=""}=r,o;try{o=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let a=$.get(Tr,{}),l=Array.isArray(o)&&o.every(Lx)?[{id:this._generatePresetId(n||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",a),name:n||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",description:"\u7531\u5916\u90E8\u586B\u8868\u63D0\u793A\u8BCD\u7EC4\u5BFC\u5165\u3002",enabled:!0,messages:o}]:Array.isArray(o)?o:o.presets?o.presets:[o];if(l.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let c=0;for(let d of l){let u=this._normalizePreset(d?.id,d,a);u&&(Sr[u.id]&&!s||!s&&a[u.id]||(a[u.id]={...u,updatedAt:Date.now()},c++))}return c>0&&($.set(Tr,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${c} \u4E2A\u9884\u8BBE`,imported:c}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let r=e?.bypass?.presetId;return r?this.getPreset(r):this.getDefaultPreset()}buildBypassMessages(e){let r=this.getToolBypassPreset(e);return r?this.getEnabledMessages(r.id):[]}_savePreset(e,r){let s=$.get(Tr,{});s[e]=r,$.set(Tr,s),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=$.get(Tr,{}),r={},s=!1,n=Array.isArray(e)?e.map((o,a)=>[o?.id||o?.name||`legacy_${a}`,o]):Object.entries(e||{});for(let[o,a]of n){let i=this._normalizePreset(o,a,r);if(!i){s=!0;continue}r[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(s=!0)}s&&$.set(Tr,r),this._migrateDefaultPreset(r),this._cache=null,this._migrated=!0}_normalizePreset(e,r,s={}){if(!r||typeof r!="object")return null;let n=typeof r.name=="string"?r.name.trim():"",o=typeof r.id=="string"?r.id.trim():"",a=typeof e=="string"?e.trim():"";if(!n&&a&&a!=="undefined"&&a!=="null"&&(n=a),this._isLegacySamplePreset(n,o)||(!o&&a&&a!=="undefined"&&a!=="null"&&(o=a),!o&&n&&n!=="undefined"&&n!=="null"&&(o=this._generatePresetId(n,s)),!n||!o||o==="undefined"||n==="undefined"))return null;let l=Array.isArray(r.messages)?r.messages.filter(c=>c&&typeof c=="object").map((c,d)=>Bx(c,d,o)):[];return{...r,id:o,name:n,description:typeof r.description=="string"?r.description:"",enabled:r.enabled!==!1,messages:l,createdAt:r.createdAt||Date.now(),updatedAt:r.updatedAt||Date.now()}}_migrateDefaultPreset(e){let r=$.get(bn,null),s=$.get(Yl,null),n=r??s;(n==="undefined"||n==="null"||n==="")&&(n=null),n&&!e[n]&&(n=Object.values(e).find(a=>a.name===n)?.id||null),n?$.set(bn,n):$.remove(bn),$.has(Yl)&&$.remove(Yl)}_isLegacySamplePreset(e,r=""){return e?r==="standard"||r==="enhanced"||r==="jailbreak"||$x.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,r={}){let s=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,n=s,o=1;for(;r[n];)n=`${s}_${o++}`;return n}_log(...e){Nx.debug(e[0],e.length>1?e.slice(1):void 0)}},ie=new Ta,zx=()=>ie.getAllPresets(),uo=()=>ie.getPresetList(),Kx=t=>ie.getPreset(t),Ux=t=>ie.createPreset(t),jx=(t,e)=>ie.updatePreset(t,e),Fx=t=>ie.deletePreset(t),Wx=(t,e,r)=>ie.duplicatePreset(t,e,r),Hx=()=>ie.getDefaultPresetId(),Yx=t=>ie.setDefaultPresetId(t),Gx=t=>ie.getEnabledMessages(t),qx=(t,e)=>ie.addMessage(t,e),Vx=(t,e,r)=>ie.updateMessage(t,e,r),Jx=(t,e)=>ie.deleteMessage(t,e),Xx=t=>ie.exportPresets(t),Qx=(t,e)=>ie.importPresets(t,e),Zx=t=>ie.buildBypassMessages(t),ew=ie});var Py={};re(Py,{DEFAULT_SETTINGS:()=>po,SettingsService:()=>_a,default:()=>tw,settingsService:()=>Bt});var po,Sa,_a,Bt,tw,yo=D(()=>{Be();Ye();po={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue",startupScreenDismissed:!1}},Sa="settings_v2",_a=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=$.get(Sa,{}),r=this._migrateLegacy(e);return this._cache=this._mergeWithDefaults(r.settings),r.changed&&$.set(Sa,this._cache),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),$.set(Sa,this._cache),K.emit(B.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let r=this.getSettings(),s=this._deepMerge(r,e);this.saveSettings(s)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(po)),$.set(Sa,this._cache),K.emit(B.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,r=null){let s=this.getSettings(),n=e.split("."),o=s;for(let a of n)if(o&&typeof o=="object"&&a in o)o=o[a];else return r;return o}set(e,r){let s=JSON.parse(JSON.stringify(this.getSettings())),n=e.split("."),o=s;for(let a=0;a<n.length-1;a+=1){let i=n[a];i in o||(o[i]={}),o=o[i]}o[n[n.length-1]]=r,this.saveSettings(s)}_migrateLegacy(e){if(!e||typeof e!="object")return{settings:{},changed:!1};let r=!1,s=JSON.parse(JSON.stringify(e));return s.automation&&Object.prototype.hasOwnProperty.call(s.automation,"enabled")&&(delete s.automation.enabled,r=!0),{settings:s,changed:r}}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(po)),e)}_deepMerge(e,r){let s={...e};for(let n in r)r[n]&&typeof r[n]=="object"&&!Array.isArray(r[n])?s[n]=this._deepMerge(e[n]||{},r[n]):s[n]=r[n];return s}},Bt=new _a,tw=Bt});function Ny(t){if(!t)return"";let e=String(t).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function Ea(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Gr(){try{return Ea()?.SillyTavern||null}catch{return null}}function Aa(t){try{return(t||Gr())?.getContext?.()||null}catch{return null}}function Gl(t,e){if(!t)return null;let r=typeof t?.on=="function"||typeof t?.addListener=="function",s=typeof t?.off=="function"||typeof t?.removeListener=="function";return!r||!s?null:{source:e,eventSource:t,capabilities:{on:typeof t?.on=="function",off:typeof t?.off=="function",addListener:typeof t?.addListener=="function",removeListener:typeof t?.removeListener=="function"}}}function rw(){let t=Ea(),e=Gr(),r=Aa(e),n=[Gl(e?.eventSource,"SillyTavern.eventSource"),Gl(r?.eventSource,"SillyTavern.getContext().eventSource"),Gl(t?.eventSource,"topWindow.eventSource")].filter(Boolean)[0]||null,o=e?.eventTypes||e?.event_types||r?.eventTypes||r?.event_types||t?.eventTypes||t?.event_types||{};return{topWindow:t,api:e,context:r,eventSource:n?.eventSource||null,eventTypes:o,source:n?.source||"unavailable",capabilities:n?.capabilities||null,hasBridge:!!n?.eventSource}}var At,Fe,sw,Dy,ql,zt,Vl=D(()=>{W();At=I.createScope("HostEvents"),Fe=Object.freeze({MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",MESSAGE_EDITED:"MESSAGE_EDITED",USER_MESSAGE_RENDERED:"USER_MESSAGE_RENDERED",IMPERSONATE_READY:"IMPERSONATE_READY",GENERATION_STOPPED:"GENERATION_STOPPED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHAT_CHANGED:"CHAT_CHANGED"});sw=1500,Dy=20,ql=class{constructor(){this._bridge=null,this._pending=[],this._initAttempts=0,this._retryTimer=null,this._readyResolvers=[],this._initialized=!1,this._disposed=!1}subscribe(e,r,s={}){if(!e||typeof r!="function")return At.warn("subscribe \u65E0\u6548\u53C2\u6570",{eventKey:e,handlerType:typeof r}),()=>{};if(this._disposed)return At.warn("subscribe \u5728 dispose \u4E4B\u540E\u88AB\u8C03\u7528",{eventKey:e}),()=>{};let n={key:Ny(e),rawKey:e,handler:r,options:s,attached:!1,_hostName:"",_hostUnsubscribe:null,_disposed:!1};return this._pending.push(n),this._ensureInitialized(),this._bridge?.hasBridge&&this._attachEntry(n),()=>{if(n._disposed)return;n._disposed=!0;let o=this._pending.indexOf(n);if(o>=0&&this._pending.splice(o,1),n.attached&&typeof n._hostUnsubscribe=="function")try{n._hostUnsubscribe()}catch(a){At.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:n._hostName,error:a})}}}async emit(e,...r){if(this._ensureInitialized(),!this._bridge?.hasBridge)return At.debug("emit \u65F6\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA\uFF0C\u8DF3\u8FC7",{eventKey:e}),!1;let s=this._resolveHostEventName(e);if(!s)return!1;let{eventSource:n}=this._bridge;try{if(typeof n?.emit=="function")return await n.emit(s,...r),!0;if(typeof n?.dispatch=="function")return await n.dispatch(s,...r),!0}catch(o){At.warn("emit \u629B\u9519",{eventKey:e,hostName:s,error:o})}return!1}ready({timeoutMs:e=1e4}={}){return this._ensureInitialized(),this._bridge?.hasBridge?Promise.resolve(!0):new Promise(r=>{let s=!1,n=a=>{s||(s=!0,r(a))},o=e>0?setTimeout(()=>n(!1),e):null;this._readyResolvers.push(a=>{o&&clearTimeout(o),n(a)})})}describe(){this._ensureInitialized();let e=this._bridge?.eventTypes||{};return{initialized:this._initialized,source:this._bridge?.source||"unavailable",hasBridge:!!this._bridge?.hasBridge,initAttempts:this._initAttempts,retryScheduled:!!this._retryTimer,pendingCount:this._pending.filter(r=>!r.attached).length,attachedCount:this._pending.filter(r=>r.attached).length,availableEvents:Object.keys(e).slice(0,100)}}reinit(){if(this._disposed)return!1;for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e.attached=!1,e._hostUnsubscribe=null,e._hostName=""}return this._bridge=null,this._initialized=!1,this._initAttempts=0,this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null),this._ensureInitialized()}dispose(){this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null);for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e._disposed=!0}this._pending=[],this._readyResolvers=[],this._bridge=null,this._initialized=!1,this._disposed=!0}_ensureInitialized(){if(this._disposed)return!1;if(this._initialized&&this._bridge?.hasBridge)return!0;this._initAttempts+=1;let e=rw();if(this._bridge=e,this._initialized=!0,!e.hasBridge)return At.debug(`\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA (attempt ${this._initAttempts})`,{source:e.source}),this._scheduleRetry(),!1;At.info("\u5BBF\u4E3B\u6865\u5DF2\u5C31\u7EEA",{source:e.source,eventTypesCount:Object.keys(e.eventTypes).length});for(let s of this._pending)!s.attached&&!s._disposed&&this._attachEntry(s);let r=this._readyResolvers.slice();this._readyResolvers=[];for(let s of r)try{s(!0)}catch{}return!0}_scheduleRetry(){if(!this._retryTimer){if(this._initAttempts>=Dy){At.warn(`\u5DF2\u8FBE\u6700\u5927\u91CD\u8BD5\u6B21\u6570 (${Dy})\uFF0C\u505C\u6B62\u91CD\u8BD5`);let e=this._readyResolvers.slice();this._readyResolvers=[];for(let r of e)try{r(!1)}catch{}return}this._retryTimer=setTimeout(()=>{this._retryTimer=null,this._initialized=!1,this._ensureInitialized()},sw)}}_resolveHostEventName(e){let r=Ny(e),s=this._bridge?.eventTypes||{};if(s[r])return s[r];let n=r.toLowerCase();if(s[n])return s[n];let o=String(e).trim();return o&&o===o.toLowerCase()?o:n}_attachEntry(e){if(!this._bridge?.hasBridge||e.attached||e._disposed)return;let r=this._resolveHostEventName(e.rawKey);if(!r){At.warn("\u65E0\u6CD5\u89E3\u6790\u5BBF\u4E3B\u4E8B\u4EF6\u540D",{rawKey:e.rawKey});return}let{eventSource:s}=this._bridge,n=typeof s?.on=="function"?s.on.bind(s):typeof s?.addListener=="function"?s.addListener.bind(s):null,o=typeof s?.off=="function"?s.off.bind(s):typeof s?.removeListener=="function"?s.removeListener.bind(s):null;if(!n||!o){At.warn("\u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5");return}try{n(r,e.handler),e.attached=!0,e._hostName=r,e._hostUnsubscribe=()=>{try{o(r,e.handler)}catch(a){At.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:r,error:a})}},At.debug(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${r}" (key=${e.key})`)}catch(a){At.error(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6\u5931\u8D25: "${r}"`,{error:a})}}},zt=new ql});var Ly={};re(Ly,{ContextInjector:()=>Ia,DEFAULT_INJECTION_OPTIONS:()=>$y,WRITEBACK_METHODS:()=>Yt,WRITEBACK_RESULT_STATUS:()=>ka,contextInjector:()=>Ct,default:()=>aw});function Jl(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function Cs(t,e){let r=String(e||"").trim();return r?Array.isArray(t)?(t.includes(r)||t.push(r),t):[r]:t}function Ca(t={}){if(t?.signal?.aborted)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE";if(typeof t?.shouldAbortWriteback=="function")try{if(t.shouldAbortWriteback()===!0)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}catch{return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}return""}var ot,ht,wn,$y,ka,Yt,nw,ow,Ia,Ct,aw,ks=D(()=>{Ye();W();Vl();ot=I.createScope("ContextInjector"),ht="YouYouToolkit_toolOutputs",wn="YouYouToolkit_injectedContext",$y={overwrite:!0,enabled:!0};ka={SUCCESS:"success",FAILED:"failed"},Yt={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},nw=60,ow=3;Ia=class{constructor(){this.debugMode=!1}async inject(e,r,s={}){return(await this.injectDetailed(e,r,s)).success}async injectDetailed(e,r,s={}){let n={...$y,...s},o=this._createWritebackResult(e,n);if(!e||r===void 0||r===null)return ot.error("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),o.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",o;if(!Jl(n.sourceMessageId))return ot.error("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),o.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",o;if(n?.signal?.aborted)return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",o;if(typeof n?.shouldAbortWriteback=="function")try{if(n.shouldAbortWriteback()===!0)return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",o}catch{return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",o}let a=o.chatId,i={toolId:e,content:String(r),updatedAt:Date.now(),sourceMessageId:n.sourceMessageId||null,sourceSwipeId:n.sourceSwipeId||n.effectiveSwipeId||null,options:n};K.emit(B.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:i.content,sourceMessageId:i.sourceMessageId,sourceSwipeId:i.sourceSwipeId,effectiveSwipeId:i.sourceSwipeId,slotBindingKey:n.slotBindingKey||"",slotRevisionKey:n.slotRevisionKey||"",slotTransactionId:n.slotTransactionId||"",traceId:n.traceId||"",sessionKey:n.sessionKey||"",options:n});let l=await this._insertToolOutputToBoundAssistantSlot(e,i,n,o);return l.success&&ot.info(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,{inserted:l}),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:r}=this._getChatRuntime(),s=this._findAssistantMessageIndex(r,e);if(s<0)return"";let n=r[s]||{},o=n[wn];if(typeof o=="string"&&o.trim())return o.trim();let a=n[ht];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(r){return ot.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",{error:r}),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),r=this._findAssistantMessageIndex(e,null);if(r<0)return{};let n=(e[r]||{})[ht];return n&&typeof n=="object"?n:{}}catch(e){return ot.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",{error:e}),{}}}getToolContext(e,r){if(!r)return null;try{let{chat:s}=this._getChatRuntime(),n=this._findAssistantMessageIndex(s,null);return n<0?null:s[n]?.[ht]?.[r]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,r){if(!r)return!1;try{let{api:s,context:n,chat:o}=this._getChatRuntime(),a=this._findAssistantMessageIndex(o,null);if(a<0)return!1;let i=o[a],l=i?.[ht];if(!l||!l[r])return!1;delete l[r],i[ht]=l,i[wn]=this._buildMessageInjectedContext(l);let c=n?.saveChat||s?.saveChat||null;return typeof c=="function"&&await c.call(n||s),K.emit(B.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:r}),!0}catch(s){return ot.warn("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:s}),!1}}async clearAllContext(e){try{let{api:r,context:s,chat:n}=this._getChatRuntime(),o=this._findAssistantMessageIndex(n,null);if(o<0)return!1;let a=n[o];delete a[ht],delete a[wn];let i=s?.saveChat||r?.saveChat||null;return typeof i=="function"&&await i.call(s||r),K.emit(B.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(r){return ot.warn("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:r}),!1}}clearAllChatsContexts(){ot.info("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,r){return!!this.getToolContext(e,r)}getContextSummary(e){let r=this._getLatestAssistantMessageOutputs(),s=Object.entries(r).map(([n,o])=>({toolId:n,updatedAt:o.updatedAt,contentLength:o.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:s,totalCount:s.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,r={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,r=e.SillyTavern||null,s=r?.getContext?.()||null,n=Array.isArray(s?.chat)?s.chat:[],o=Array.isArray(r?.chat)?r.chat:[],a=n.length?n:o;return{topWindow:e,api:r,context:s,chat:a,contextChat:n,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,r={}){let s=Yt.SET_CHAT_MESSAGES;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:r.traceId||"",sessionKey:r.sessionKey||"",sourceMessageId:r.sourceMessageId||null,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId||null,effectiveSwipeId:r.effectiveSwipeId||r.sourceSwipeId||null,slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:Yt.NONE,commit:{preferredMethod:s,attemptedMethods:[],appliedMethod:Yt.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:"",eventSource:"",eventName:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:ka.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(r=>setTimeout(r,e))}_collectWritebackVerification(e,r,s,n,o,a=null){let i=e?.contextChat?.[s]||e?.apiChat?.[s]||r?.[s]||a||null,l=this._getWritableMessageField(i).text||"",c=i?.[ht]?.[n],d=o?l.includes(o):!0,u=!!(c&&String(c.content||"").trim()===o);return{latestMessage:i,latestText:l,textIncludesContent:d,mirrorStored:u}}async _confirmRefresh(e,r,s,n,o,a=null){let i=1,l=this._collectWritebackVerification(e,r,s,n,o,a);for(let c=0;c<ow;c+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:i,confirmedBy:"text_and_mirror_present"};await this._wait(nw),i+=1,l=this._collectWritebackVerification(e,r,s,n,o,a)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:i,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}async _requestAssistantMessageRefresh(e,r,s,n={},o=null){let a=o||this._createWritebackResult("",n),{api:i,context:l}=e||{},c=e?.topWindow||(typeof window.parent<"u"&&window.parent!==window?window.parent:window),d=c?.TavernHelper?.setChatMessages||l?.setChatMessages||i?.setChatMessages||c?.setChatMessages||null;a.commit.preferredMethod=typeof d=="function"?Yt.SET_CHAT_MESSAGES:Yt.LOCAL_ONLY;let u=!1,y=Ca(n);if(y)return a.error=y,a;if(typeof d=="function"){Cs(a.commit.attemptedMethods,Yt.SET_CHAT_MESSAGES);try{let p=Ca(n);if(p)return a.error=p,a;let f=Jl(n.sourceMessageId)||r;await d([{message_id:f,message:s}],{refresh:"affected"}),a.steps.hostSetChatMessages=!0,a.hostUpdateMethod=Yt.SET_CHAT_MESSAGES,a.hostCommitApplied=!0,a.commit.appliedMethod=Yt.SET_CHAT_MESSAGES,a.commit.hostCommitApplied=!0,u=!0}catch(p){ot.error("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",{error:p}),a.errors.push(`setChatMessages: ${p?.message||String(p)}`)}}return u&&(a.refreshRequested=!0,Cs(a.refresh.requestMethods,a.hostUpdateMethod)),u||(Cs(a.commit.attemptedMethods,Yt.LOCAL_ONLY),a.commit.appliedMethod=Yt.LOCAL_ONLY,a.commit.fallbackUsed=!0,a.hostUpdateMethod=a.commit.appliedMethod),a}_inferBlockType(e){let r=String(e||"").trim();if(!r)return"empty";let s=r.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return s?.[1]?s[1]:"plain_text"}_stripExactStoredBlock(e,r,s=""){let n=String(e||""),o=String(r||"").trim(),a=String(s||"").trim();return o?n.includes(o)?a?{text:n.replace(o,a).trimEnd(),removed:!0,replaced:!0}:{text:n.replace(o,"").trimEnd(),removed:!0,replaced:!1}:{text:n,removed:!1,replaced:!1}:{text:n,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,r,s){let{contextChat:n,apiChat:o}=e||{},a=i=>{!Array.isArray(i)||r<0||r>=i.length||i[r]!==s&&(i[r]={...i[r]||{},...s})};a(n),a(o)}_notifyMessageUpdated(e,r,s={}){if(s.skipNotify===!0)return{emitted:!1,source:"skipped_by_caller",eventName:""};try{let n=zt.describe(),o=e?.topWindow||Ea();return n.hasBridge?(zt.emit(Fe.MESSAGE_UPDATED,r),typeof o?.requestAnimationFrame=="function"?o.requestAnimationFrame(()=>{zt.emit(Fe.MESSAGE_UPDATED,r)}):typeof o?.setTimeout=="function"&&o.setTimeout(()=>{zt.emit(Fe.MESSAGE_UPDATED,r)},30),{emitted:!0,source:n.source||"unavailable",eventName:Fe.MESSAGE_UPDATED}):{emitted:!1,source:n.source||"unavailable",eventName:Fe.MESSAGE_UPDATED}}catch(n){return ot.warn("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",{error:n}),{emitted:!1,source:"error",eventName:"",error:n?.message||String(n)}}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let r=String(e.role||"").toLowerCase();return r==="assistant"||r==="ai"||!r}_findAssistantMessageIndex(e,r){let s=Array.isArray(e)?e:[];if(!s.length)return-1;let n=r!=null&&r!=="",o=(a,i)=>{if(!this._isAssistantMessage(a)||r==null||r==="")return!1;let l=String(r).trim();return l?[a.message_id,a.id,a.messageId,a.mes_id,i].map(d=>d==null?"":String(d).trim()).includes(l):!1};for(let a=s.length-1;a>=0;a-=1)if(o(s[a],a))return a;if(n)return-1;for(let a=s.length-1;a>=0;a-=1)if(this._isAssistantMessage(s[a]))return a;return-1}_buildMessageInjectedContext(e){let s=Object.entries(e&&typeof e=="object"?e:{}).filter(([,o])=>o?.blockType!=="full_message").sort(([,o],[,a])=>(o?.updatedAt||0)-(a?.updatedAt||0));if(!s.length)return"";let n=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[o,a]of s)n.push(`[${o}]`),n.push(a?.content||""),n.push("");return n.join(`
`)}_getWritableMessageField(e){let r=["mes","message","content","text"];for(let s of r)if(typeof e?.[s]=="string")return{key:s,text:e[s]};return{key:"mes",text:""}}_applyMessageText(e,r,s={}){let n=e&&typeof e=="object"?e:{},o=["mes","message","content","text"],a=!1;if(o.forEach(i=>{typeof n[i]=="string"&&(n[i]=r,a=!0)}),a||(n.mes=r,n.message=r),Array.isArray(n.swipes)){let i=Number.parseInt(Jl(s?.sourceSwipeId||s?.effectiveSwipeId),10),l=Number.isInteger(i)?i:Number.isInteger(n.swipe_id)?n.swipe_id:Number.isInteger(n.swipeId)?n.swipeId:0;l>=0&&l<n.swipes.length&&(n.swipes[l]=r,n.swipe_id=l,n.swipeId=l)}return n}_stripExistingToolOutput(e,r=[]){let s=String(e||"");return(Array.isArray(r)?r:[]).forEach(o=>{let a=String(o||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let d=new RegExp(a.slice(6).trim(),"gis");s=s.replace(d,"")}catch(d){ot.warn("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",{value:a,error:d})}return}let i=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),c=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");s=s.replace(l,""),s=s.replace(c,"")}),s.trimEnd()}_stripPreviousStoredToolContent(e,r){let s=String(e||""),n=String(r||"").trim();return n?s.replace(n,"").trimEnd():s.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,r,s={},n=null){let o=n||this._createWritebackResult(e,s);try{let a=this._getChatRuntime(),{context:i,chat:l}=a;if(!Array.isArray(l)||!l.length)return ot.error("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),o.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",o;let c=this._findAssistantMessageIndex(l,s.sourceMessageId);if(c<0)return ot.error("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),o.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",o;if(s?.signal?.aborted)return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",o;if(typeof s?.shouldAbortWriteback=="function")try{if(s.shouldAbortWriteback()===!0)return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",o}catch{return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",o}o.messageIndex=c,o.steps.foundTargetMessage=!0;let d=l[c],{key:u,text:y}=this._getWritableMessageField(d);o.textField=u;let p=d[ht]&&typeof d[ht]=="object"?d[ht]:{},f=p?.[e]||{},g=f?.content||"",h=f?.blockText||g||"",x=Object.entries(p).filter(([He])=>He!==e).map(([,He])=>He||{}),v=String(r.content||"").trim(),T=s.replaceFullMessage===!0,L=T?"full_message":this._inferBlockType(v),M={toolId:e,messageId:s.sourceMessageId||d?.message_id||d?.messageId||c,blockType:L,insertedAt:r.updatedAt,replaceable:s.overwrite!==!1};o.blockIdentity=M;let _=s.overwrite===!1||T?{text:String(y||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(y,h,v),A=_.text,F="";!T&&s.overwrite!==!1&&h&&!_.removed&&(F="previous_block_not_found");let H=s.overwrite===!1||_.replaced||T?A:this._stripExistingToolOutput(A,s.extractionSelectors),R=H!==A;A=H;let S=s.overwrite===!1||_.replaced||T?A:this._stripPreviousStoredToolContent(A,g),U=S!==A;A=S,o.replacedExistingBlock=T||_.removed||R||U;let V=s.overwrite===!1?String(y||""):A,fe=T?v:_.replaced?A.trim():[V.trimEnd(),v].filter(Boolean).join(`

`).trim();o.insertedNewBlock=!!v;let Ve=x.every(He=>{if(He?.blockType==="full_message")return!0;let dr=String(He?.blockText||He?.content||"").trim();return dr?fe.includes(dr):!0});o.preservedOtherToolBlocks=Ve,Ve?F&&(o.conflictDetected=!0,o.conflictReason=F):(o.conflictDetected=!0,o.conflictReason="other_tool_block_removed");let Ae={...p,[e]:{toolId:e,content:v,blockText:v,blockType:L,blockIdentity:M,updatedAt:r.updatedAt,sourceMessageId:r.sourceMessageId||null}},oe=Ca(s);if(oe)return o.error=oe,o;d[u]=fe,this._applyMessageText(d,fe,s),d[ht]=Ae,d[wn]=this._buildMessageInjectedContext(Ae),o.contentCommitted=!0,o.commit.contentCommitted=!0,o.steps.contentCommitted=!0,o.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,c,d),o.steps.runtimeSynced=!0;let Ze=Ca(s);if(Ze)return o.error=Ze,o;await this._requestAssistantMessageRefresh(a,c,fe,s,o);let cr=i?.saveChat||a?.api?.saveChat||null,J=i?.saveChatDebounced||a?.api?.saveChatDebounced||null;typeof J=="function"&&(J.call(i||api),o.steps.saveChatDebounced=!0,o.refreshRequested=!0,Cs(o.refresh.requestMethods,"saveChatDebounced")),typeof cr=="function"&&(await cr.call(i||api),o.steps.saveChat=!0,o.refreshRequested=!0,Cs(o.refresh.requestMethods,"saveChat"));let ue=this._notifyMessageUpdated(a,c,s);o.steps.notifiedMessageUpdated=ue?.emitted===!0,o.refresh.eventSource=ue?.source||"",o.refresh.eventName=ue?.eventName||"",ue?.error&&o.errors.push(`MESSAGE_UPDATED: ${ue.error}`);let Oe=String(r.content||"").trim();(o.steps.hostSetChatMessages||o.steps.hostSetChatMessage)&&(o.refreshRequested=!0,Cs(o.refresh.requestMethods,o.hostUpdateMethod)),o.steps.notifiedMessageUpdated&&(o.refreshRequested=!0,Cs(o.refresh.requestMethods,`MESSAGE_UPDATED:${o.refresh.eventName||"MESSAGE_UPDATED"}`)),o.steps.refreshRequested=o.refreshRequested,o.refresh.requested=o.refreshRequested;let Rt=await this._confirmRefresh(a,l,c,e,Oe,d);return o.verification.textIncludesContent=Rt.textIncludesContent,o.verification.mirrorStored=Rt.mirrorStored,o.verification.refreshConfirmed=Rt.refreshConfirmed,o.steps.verifiedAfterWrite=o.verification.textIncludesContent&&o.verification.mirrorStored,o.refreshConfirmed=o.verification.refreshConfirmed&&o.refreshRequested,o.refresh.confirmChecks=Number(Rt.confirmChecks)||0,o.refresh.confirmedBy=Rt.confirmedBy||"",o.refresh.confirmed=o.refreshConfirmed,o.steps.refreshConfirmed=o.refreshConfirmed,o.success=o.steps.localTextApplied&&o.steps.runtimeSynced&&o.steps.verifiedAfterWrite&&o.refreshConfirmed,o.writebackStatus=o.success?ka.SUCCESS:ka.FAILED,!o.success&&!o.error&&(o.error=o.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),o.conflictDetected&&!o.error&&(o.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${o.conflictReason}`),ot.info(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${c}`),o}catch(a){return ot.error("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",{error:a}),o.error=a?.message||String(a),o.errors.push(o.error),o}}getAssistantMessageSnapshot(e=null){try{let r=this._getChatRuntime(),{chat:s}=r,n=this._findAssistantMessageIndex(s,e);if(n<0)return null;let o=s[n]||null,a=this._getWritableMessageField(o).text||"",i=o?.[ht]&&typeof o[ht]=="object"?o[ht]:{},l=Object.values(i).reduce((c,d)=>{let u=String(d?.blockText||d?.content||"").trim();return!u||!c.includes(u)?c:c.replace(u,"").trimEnd()},String(a||"")).trim();return{messageIndex:n,message:o,messageText:a,baseText:l,toolOutputs:i,injectedContext:typeof o?.[wn]=="string"?o[wn]:this._buildMessageInjectedContext(i)}}catch(r){return ot.warn("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",{error:r}),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext(),n=[r?.chatId,r?.chat_id,r?.chat_filename,r?.chatMetadata?.chatId,r?.chatMetadata?.chat_id,r?.chatMetadata?.file_name,r?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(n)return n;let o=e.SillyTavern?.this_chid;if(o!=null)return`chat_char_${o}`}return"chat_default"}catch{return"chat_default"}}},Ct=new Ia,aw=Ct});var By={};re(By,{BUILTIN_VARIABLES:()=>Oy,VariableResolver:()=>Ma,default:()=>lw,variableResolver:()=>Kt});var iw,Oy,Ma,Kt,lw,Ra=D(()=>{Ye();W();iw=I.createScope("VariableResolver"),Oy={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},Ma=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,r){if(typeof e!="string")return e;let s=e;return s=this._resolveBuiltinVariables(s,r),s=this._resolveCustomVariables(s,r),s=this._resolveRegexVariables(s,r),s}resolveObject(e,r){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(n=>this.resolveObject(n,r));let s={};for(let[n,o]of Object.entries(e))typeof o=="string"?s[n]=this.resolveTemplate(o,r):typeof o=="object"&&o!==null?s[n]=this.resolveObject(o,r):s[n]=o;return s}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,r){e&&(this.customVariables.set(e,r),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,r){!e||typeof r!="function"||(this.variableHandlers.set(e,r),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,r]of Object.entries(Oy))e.push({name:`{{${r.name}}}`,description:r.description,category:r.category,type:"builtin"});for(let[r,s]of this.customVariables)e.push({name:`{{${r}}}`,description:typeof s=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],r={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},s={};for(let n of this.getAvailableVariables())s[n.category]||(s[n.category]=[]),s[n.category].push(n);for(let[n,o]of Object.entries(r))if(s[n]&&s[n].length>0){e.push(`\u3010${o}\u3011`);for(let a of s[n])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,r)=>(r.regexResults||r.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,r){let s=e;return s=s.replace(/\{\{lastUserMessage\}\}/gi,r.lastUserMessage||r.raw?.lastUserMessage||""),s=s.replace(/\{\{lastAiMessage\}\}/gi,r.lastAiMessage||r.raw?.lastAiMessage||""),s=s.replace(/\{\{chatHistory\}\}/gi,()=>{let n=r.chatHistory||r.raw?.chatHistory||[];return this._formatChatHistory(n)}),s=s.replace(/\{\{characterCard\}\}/gi,()=>{let n=r.characterCard||r.raw?.characterCard;return n?this._formatCharacterCard(n):""}),s=s.replace(/\{\{toolName\}\}/gi,r.toolName||r.raw?.toolName||""),s=s.replace(/\{\{toolId\}\}/gi,r.toolId||r.raw?.toolId||""),s=s.replace(/\{\{toolPromptMacro\}\}/gi,r.toolPromptMacro||r.raw?.toolPromptMacro||""),s=s.replace(/\{\{toolContentMacro\}\}/gi,r.toolContentMacro||r.raw?.toolContentMacro||""),s=s.replace(/\{\{toolWorldbookContent\}\}/gi,r.toolWorldbookContent||r.raw?.toolWorldbookContent||""),s=s.replace(/\{\{injectedContext\}\}/gi,r.injectedContext||r.raw?.injectedContext||""),s=s.replace(/\{\{extractedContent\}\}/gi,r.extractedContent||r.raw?.extractedContent||""),s=s.replace(/\{\{recentMessagesText\}\}/gi,r.recentMessagesText||r.raw?.recentMessagesText||""),s=s.replace(/\{\{rawRecentMessagesText\}\}/gi,r.rawRecentMessagesText||r.raw?.rawRecentMessagesText||""),s=s.replace(/\{\{userMessage\}\}/gi,r.userMessage||r.raw?.userMessage||""),s=s.replace(/\{\{previousToolOutput\}\}/gi,r.previousToolOutput||r.raw?.previousToolOutput||""),s}_resolveCustomVariables(e,r){let s=e;for(let[n,o]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(n)}\\}\\}`,"gi");typeof o=="function"?s=s.replace(a,()=>{try{return o(r)}catch(i){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${n}:`,i),""}}):s=s.replace(a,String(o))}return s}_resolveRegexVariables(e,r){let s=e;for(let[n,o]of this.variableHandlers){let a=new RegExp(`\\{\\{${n}\\.([^}]+)\\}\\}`,"gi");s=s.replace(a,(i,l)=>{try{return o(l,r)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${n}.${l}:`,c),""}})}return s}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(r=>{let s=r.role||"unknown",n=r.content||r.mes||"";return`[${s}]: ${n}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let r=[];return e.name&&r.push(`\u59D3\u540D: ${e.name}`),e.description&&r.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&r.push(`\u6027\u683C: ${e.personality}`),e.scenario&&r.push(`\u573A\u666F: ${e.scenario}`),r.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){iw.debug(e[0],e.length>1?e.slice(1):void 0)}},Kt=new Ma,lw=Kt});var Ky={};re(Ky,{DEFAULT_PROMPT_TEMPLATE:()=>zy,ToolPromptService:()=>Pa,default:()=>dw,toolPromptService:()=>Is});var cw,zy,Pa,Is,dw,Na=D(()=>{Ye();xn();Ra();qo();W();cw=I.createScope("ToolPromptService"),zy="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",Pa=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,r={}){let s=this._getPromptTemplate(e),n=String(r?.toolWorldbookContent||r?.input?.toolWorldbookContent||await Go(e)).trim(),o=Kt.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolWorldbookContent:n}),a=Kt.resolveTemplate(s,o).trim(),i=String(r?.toolContentMacro||r?.input?.toolContentMacro||"").trim();return Kt.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolPromptMacro:a,toolContentMacro:i,toolWorldbookContent:n})}async buildToolMessages(e,r){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let s=[],n=await this._buildVariableContext(e,r),o=Array.isArray(e.promptMessages)?e.promptMessages:[],a=this._getBypassMessages(e),i=a?.some(l=>l.mainSlot==="A"||l.mainSlot==="B"||l.isMain||l.isMain2);if(a&&a.length>0)for(let l of a)l.enabled!==!1&&s.push({role:this._normalizeRole(l.role),content:Kt.resolveTemplate(l.content||"",n)});if(!i&&o.length>0)for(let l of o){let c=Kt.resolveTemplate(l?.content||"",n).trim();c&&s.push({role:this._normalizeRole(l?.role),content:c})}else if(!i&&!a?.length){let l=this._buildUserContent(this._getPromptTemplate(e),n);l&&s.push({role:"user",content:l})}return this._log(`\u6784\u5EFA\u6D88\u606F: ${s.length} \u6761`),s}async buildPromptText(e,r){let s=await this._buildVariableContext(e,r),n=Array.isArray(e?.promptMessages)?e.promptMessages:[];return n.length>0?n.map(o=>Kt.resolveTemplate(o?.content||"",s).trim()).filter(Boolean).join(`

`):s.toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:zy}_getBypassMessages(e){return e.bypass?.enabled?ie.buildBypassMessages(e):[]}_buildUserContent(e,r){return!e||!e.trim()?"":Kt.resolveTemplate(e,r).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){cw.debug(e[0],e.length>1?e.slice(1):void 0)}setDebugMode(e){this.debugMode=e}},Is=new Pa,dw=Is});var jy={};re(jy,{LEGACY_OUTPUT_MODES:()=>uw,OUTPUT_MODES:()=>kt,TOOL_FAILURE_STAGES:()=>We,TOOL_RUNTIME_STATUS:()=>pw,TOOL_WRITEBACK_STATUS:()=>$e,ToolOutputService:()=>Da,default:()=>yw,toolOutputService:()=>It});function Uy(t){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}function vn(t=[],e="",r=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!r,contentCommitted:!!r?.contentCommitted,hostCommitApplied:!!r?.hostCommitApplied,writebackStatus:r?.writebackStatus||"",preferredCommitMethod:r?.commit?.preferredMethod||"",appliedCommitMethod:r?.commit?.appliedMethod||"",fallbackUsed:!!r?.commit?.fallbackUsed},refresh:{requested:!!r?.refreshRequested,confirmed:!!r?.refreshConfirmed,requestMethods:Array.isArray(r?.refresh?.requestMethods)?[...r.refresh.requestMethods]:[],confirmChecks:Number(r?.refresh?.confirmChecks)||0,confirmedBy:r?.refresh?.confirmedBy||""}}}var Ms,kt,uw,pw,We,$e,Da,It,yw,fo=D(()=>{Ye();yo();W();ks();Na();Ys();zr();Po();Ms=I.createScope("ToolOutputService"),kt={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api",LOCAL_TRANSFORM:"local_transform"},uw={inline:"follow_ai"},pw={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},We={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},$e={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};Da=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===kt.POST_RESPONSE_API}shouldRunLocalTransform(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===kt.LOCAL_TRANSFORM||!!e.processor?.type}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let r=e.output?.mode;return r===kt.FOLLOW_AI||r==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,r){let s=Date.now(),n=e.id,o=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=this._getExtractionSelectors(e),c=e.output?.apiPreset||e.apiPreset||"",d="",u=$e.NOT_APPLICABLE,y=null,p=[],f="";Ms.info(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${n}`),K.emit(B.TOOL_EXECUTION_STARTED,{toolId:n,traceId:o,sessionKey:a,mode:kt.POST_RESPONSE_API});try{if(d=We.BUILD_MESSAGES,p=await this._buildToolMessages(e,r),!p||p.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");Ms.debug(`\u6784\u5EFA\u4E86 ${p.length} \u6761\u6D88\u606F`);let g=Uy(r);if(g){let L=Date.now()-s;return{success:!1,toolId:n,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:L,meta:{traceId:o,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:c,writebackStatus:u,failureStage:d,writebackDetails:y,aborted:g.aborted===!0,stale:g.stale===!0,abortReason:g.reason||"",phases:vn(p,f,y)}}}let h=await this._getRequestTimeout();d=We.SEND_API_REQUEST;let x=await this._sendApiRequest(c,p,{timeoutMs:h,signal:r.signal});d=We.EXTRACT_OUTPUT,f=this._extractOutputContent(x,e);let v=Uy(r);if(v){let L=Date.now()-s;return{success:!1,toolId:n,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:L,meta:{traceId:o,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:c,writebackStatus:u,failureStage:d,writebackDetails:y,aborted:v.aborted===!0,stale:v.stale===!0,abortReason:v.reason||"",phases:vn(p,f,y)}}}if(f){if(d=We.INJECT_CONTEXT,y=await Ct.injectDetailed(n,f,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:l,traceId:o,sessionKey:a,signal:r.signal,shouldAbortWriteback:r.shouldAbortWriteback,isAutoRun:r.isAutoRun===!0,skipNotify:r.skipNotify===!0}),!y?.success)throw u=$e.FAILED,new Error(y?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=$e.SUCCESS}else u=$e.SKIPPED_EMPTY_OUTPUT;d="";let T=Date.now()-s;return K.emit(B.TOOL_EXECUTED,{toolId:n,traceId:o,sessionKey:a,success:!0,duration:T,mode:kt.POST_RESPONSE_API}),Ms.info(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${n}, \u8017\u65F6 ${T}ms`),{success:!0,toolId:n,output:f,duration:T,meta:{traceId:o,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:p.length,selectors:l,apiPreset:c,writebackStatus:u,failureStage:"",writebackDetails:y,phases:vn(p,f,y)}}}catch(g){let h=Date.now()-s,x=d||We.UNKNOWN,v=u||$e.NOT_APPLICABLE;return Ms.error(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${n}`,{error:g}),K.emit(B.TOOL_EXECUTION_FAILED,{toolId:n,traceId:o,sessionKey:a,error:g.message||String(g),duration:h}),{success:!1,toolId:n,error:g.message||String(g),duration:h,meta:{traceId:o,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:p.length,selectors:l,apiPreset:c,writebackStatus:v,failureStage:x,writebackDetails:y,phases:vn(p,f,y)}}}}async runToolFollowAiManual(e,r){let s=Date.now(),n=e.id,o=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=e.output?.apiPreset||e.apiPreset||"",c=this._getExtractionSelectors(e),d="",u=$e.NOT_APPLICABLE,y=null,p=[],f="";K.emit(B.TOOL_EXECUTION_STARTED,{toolId:n,traceId:o,sessionKey:a,mode:kt.FOLLOW_AI});try{if(d=We.BUILD_MESSAGES,p=await this._buildToolMessages(e,r),!p||p.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");let g=await this._getRequestTimeout();d=We.SEND_API_REQUEST;let h=await this._sendApiRequest(l,p,{timeoutMs:g,signal:r.signal});if(d=We.EXTRACT_OUTPUT,f=this._extractOutputContent(h,e),f){if(d=We.INJECT_CONTEXT,y=await Ct.injectDetailed(n,f,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:c,traceId:o,sessionKey:a}),!y?.success)throw u=$e.FAILED,new Error(y?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=$e.SUCCESS}else u=$e.SKIPPED_EMPTY_OUTPUT;d="";let x=Date.now()-s;return K.emit(B.TOOL_EXECUTED,{toolId:n,traceId:o,sessionKey:a,success:!0,duration:x,mode:kt.FOLLOW_AI}),{success:!0,toolId:n,output:f,duration:x,meta:{traceId:o,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:p.length,selectors:c,apiPreset:l,writebackStatus:u,failureStage:"",writebackDetails:y,phases:vn(p,f,y)}}}catch(g){let h=Date.now()-s,x=d||We.UNKNOWN,v=u||$e.NOT_APPLICABLE;return K.emit(B.TOOL_EXECUTION_FAILED,{toolId:n,traceId:o,sessionKey:a,error:g.message||String(g),duration:h,mode:kt.FOLLOW_AI}),{success:!1,toolId:n,error:g.message||String(g),duration:h,meta:{traceId:o,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:p.length,selectors:c,apiPreset:l,writebackStatus:v,failureStage:x,writebackDetails:y,phases:vn(p,f,y)}}}}async runToolInline(e,r){return this.runToolFollowAiManual(e,r)}async previewExtraction(e,r){return{success:!0,...this.getExtractionSnapshot(e,r)}}getExtractionSnapshot(e,r){let s=this._buildRecentMessageExtractionEntries(e,r),n=this._joinMessageBlocks(s,"rawText"),o=this._joinMessageBlocks(s,"filteredText"),a=this._joinMessageBlocks(s,"extractedText",{skipEmpty:!0}),i=(Array.isArray(s)?s:[]).map(c=>String(c?.extractedText||"").trim()).filter(Boolean).join(`

`),l=Array.isArray(s)&&s.length>0?s[s.length-1]:null;return{sourceText:n,filteredSourceText:o,extractedText:a,extractedRawText:i,messageEntries:s,primaryEntry:l,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,r){let s=this._buildRecentMessageExtractionEntries(e,r),n=this._joinMessageBlocks(s,"rawText"),o=this._joinMessageBlocks(s,"filteredText"),a=this._joinMessageBlocks(s,"extractedText",{skipEmpty:!0}),i={...r,rawRecentMessagesText:n,recentMessagesText:o,extractedContent:a,toolContentMacro:this._buildToolContentMacro(s),toolName:e.name,toolId:e.id};return Is.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let r=String(e).toLowerCase();return r==="system"?"system":r==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,r,s={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:n=9e4,signal:o}=s,a=null;if(e){if(!Pn(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=Rn(e)}else a=Rn();let i=Ro(a||{});if(!i.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(r,{timeoutMs:n,apiConfig:a},o);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Bt.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,r){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,r);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,r);if(e.content)return this._applyOutputExtractionSelectors(e.content,r);if(e.text)return this._applyOutputExtractionSelectors(e.text,r);if(e.message)return this._applyOutputExtractionSelectors(e.message,r);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),r)}catch{return this._applyOutputExtractionSelectors(String(e),r)}}return this._applyOutputExtractionSelectors(String(e),r)}_applyOutputExtractionSelectors(e,r){let s=typeof e=="string"?e:String(e||""),n=this._getExtractionSelectors(r);if(!n.length)return s.trim();let o=[];for(let a of n){let i=String(a||"").trim();if(!i)continue;if(i.startsWith("regex:")){let c=i.slice(6).trim();if(!c)continue;try{let d=new RegExp(c,"gi");[...s.matchAll(d)].forEach(y=>{let p=String(y?.[0]||"").trim();p&&o.push(p)})}catch(d){Ms.warn("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:d})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(s.match(c)||[]).forEach(u=>{let y=String(u||"").trim();y&&o.push(y)})}catch(c){Ms.warn("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}}return o.length>0?o.join(`

`).trim():s.trim()}_resolveExtractionContext(e){let r=e?.extraction?.regexPresetId;if(!r)return{rules:[],blacklist:[]};try{let s=br(r);if(!s)return{rules:[],blacklist:[]};let n=Array.isArray(s.rules)?s.rules.filter(a=>a&&a.enabled!==!1&&a.value).map(a=>({id:a.id,type:a.type,value:a.value,enabled:!0})):[],o=Array.isArray(s.blacklist)?s.blacklist.map(a=>String(a||"").trim()).filter(Boolean):[];return{rules:n,blacklist:o}}catch(s){return this._log("warn","_resolveExtractionContext \u5F02\u5E38",{error:s}),{rules:[],blacklist:[]}}}_getExtractionSelectors(e){let{rules:r}=this._resolveExtractionContext(e),s=[];for(let n of r){let o=String(n.value||"").trim();o&&(n.type==="include"?s.push(o):n.type==="regex_include"&&s.push(`regex:${o}`))}return s}_applyExtractionSelectors(e,r){return this._applyExtractionSelectorsInternal(e,r,{strict:!1})}_applyExtractionSelectorsInternal(e,r,s={}){let n=typeof e=="string"?e:String(e||""),{rules:o,blacklist:a}=this._resolveExtractionContext(r),{strict:i=!1}=s;if(!o.length)return n.trim();let l=mr(n,o,a||[]);return i?(l||"").trim():l||n.trim()}_extractToolContent(e,r){let s=typeof r=="string"?r:String(r||""),{rules:n}=this._resolveExtractionContext(e);return n.length?this._applyExtractionSelectorsInternal(s,e,{strict:!0}):s.trim()}_applyGlobalContextRules(e){let r=typeof e=="string"?e:String(e||"");if(!r.trim())return"";try{let s=Ws()||[],n=Hs()||[];return!Array.isArray(s)||s.length===0?r.trim():mr(r,s,n)||r.trim()}catch(s){return Ms.warn("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",{error:s}),r.trim()}}_getMessageText(e){if(!e)return"";let r=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let s of r)if(typeof s=="string"&&s.trim())return s.trim();return""}_collectRecentAssistantMessages(e,r){return this._collectRecentAssistantMessageEntries(e,r).map(s=>s.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,r){let s=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),n=Array.isArray(r?.chatMessages)?r.chatMessages:[],o=[];for(let i=n.length-1;i>=0&&o.length<s;i-=1){let l=n[i],c=String(l?.role||"").toLowerCase(),d=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,u=this._getMessageText(l);d&&u&&o.unshift({text:u,message:l,chatIndex:i})}if(o.length>0)return o;let a=r?.lastAiMessage||r?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,r){return this._collectRecentAssistantMessageEntries(e,r).map((n,o)=>{let a=n.text||"",i=this._applyGlobalContextRules(a),l=this._extractToolContent(e,a);return{...n,order:o+1,rawText:a,filteredText:i,extractedText:l,fullMessageText:a}})}_joinMessageBlocks(e,r,s={}){let n=Array.isArray(e)?e:[],{skipEmpty:o=!1}=s;return n.map(i=>{let l=String(i?.[r]||"").trim();return o&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(n=>{let o=`\u3010\u7B2C ${n?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(n?.filteredText||"").trim()||"(\u7A7A)",i=String(n?.extractedText||"").trim()||"(\u7A7A)";return`${o}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunInline(r)):[]}setDebugMode(e){this.debugMode=e}},It=new Da,yw=It});function Wy(t={}){return!t||typeof t!="object"?{}:Object.entries(t).reduce((e,[r,s])=>(e[r]=s===!0,e),{})}function mw(t,e={}){let r=e?.direction==="unescape"?"unescape":"escape",s=Wy(e?.options);return fw.reduce((n,o)=>s[o.key]!==!0?n:r==="unescape"?n.replace(o.escaped,o.unescaped):n.replace(o.plain,o.replacement),String(t||""))}function hw(t,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(t||"");let s=Wy(e?.options);return gw.reduce((n,o)=>s[o.key]!==!0?n:n.replace(o.from,o.to),String(t||""))}function bw(t,e){let r=t?.processor||{},s=r?.type||"",n=String(e||"");switch(s){case Fy.ESCAPE_TRANSFORM:return mw(n,r);case Fy.PUNCTUATION_TRANSFORM:return hw(n,r);default:return n}}function xw(t,e,r){let s=String(t||""),n=String(e||"").trim(),o=String(r||"").trim();return!s.trim()||!n?{nextMessageText:"",replaced:!1}:s.includes(n)?{nextMessageText:s.replace(n,o).trim(),replaced:!0}:{nextMessageText:"",replaced:!1}}async function $a(t,e={}){let r=It.getExtractionSnapshot(t,e),s=r?.primaryEntry||null,n=String(s?.fullMessageText||e?.lastAiMessage||"").trim(),o=String(s?.extractedText||r?.extractedRawText||r?.extractedText||"").trim(),a=Array.isArray(r?.selectors)?r.selectors:[],i=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l=e?.sessionKey||"";if(!o||!n)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:$e.NOT_APPLICABLE,failureStage:We.EXTRACT_OUTPUT,extraction:r}};let c=String(bw(t,o)||"").trim(),d=xw(n,o,c),u=d.replaced?d.nextMessageText:c,y=null,p=$e.NOT_APPLICABLE;if(u){if(y=await Ct.injectDetailed(t.id,u,{overwrite:!0,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:[],replaceFullMessage:d.replaced,traceId:i,sessionKey:l,skipNotify:e?.skipNotify===!0}),!y?.success)return{success:!1,error:y?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:$e.FAILED,failureStage:We.INJECT_CONTEXT,writebackDetails:y,extraction:r}};p=$e.SUCCESS}else p=$e.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:c,writebackState:u?{committed:y?.contentCommitted===!0}:null,meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:p,failureStage:"",writebackDetails:y,extraction:r}}}var fw,gw,Fy,Xl=D(()=>{fo();ks();fw=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],gw=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],Fy={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var Zl={};re(Zl,{abortAllTasks:()=>_w,abortTask:()=>Sw,buildToolMessages:()=>Gy,clearExecutionHistory:()=>Iw,createExecutionContext:()=>Nw,createResult:()=>La,enhanceMessagesWithBypass:()=>Dw,executeBatch:()=>Tw,executeTool:()=>Yy,executeToolWithConfig:()=>qy,executeToolsBatch:()=>Ow,executorState:()=>Pe,extractFailed:()=>Pw,extractSuccessful:()=>Rw,generateTaskId:()=>Rs,getExecutionHistory:()=>kw,getExecutorStatus:()=>Cw,getScheduler:()=>Tn,mergeResults:()=>Mw,pauseExecutor:()=>Ew,resumeExecutor:()=>Aw,setMaxConcurrent:()=>vw});function La(t,e,r,s,n,o,a=0){return{success:r,taskId:t,toolId:e,data:s,error:n,duration:o,retries:a,timestamp:Date.now(),metadata:{}}}function Rs(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function ww(t,e={}){return{id:Rs(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function Tn(){return go||(go=new Ql(Pe.maxConcurrent)),go}function vw(t){Pe.maxConcurrent=Math.max(1,Math.min(10,t)),go&&(go.maxConcurrent=Pe.maxConcurrent)}async function Yy(t,e={},r){let s=Tn(),n=ww(t,e);for(;Pe.isPaused;)await new Promise(o=>setTimeout(o,100));try{let o=await s.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof r=="function")return await r(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},n);return Hy(o),o}catch(o){let a=La(n.id,t,!1,null,o,Date.now()-n.createdAt,n.retries);return Hy(a),a}}async function Tw(t,e={}){let{failFast:r=!1,concurrency:s=Pe.maxConcurrent}=e,n=[],o=Tn(),a=o.maxConcurrent;o.maxConcurrent=s;try{let i=t.map(({toolId:l,options:c,executor:d})=>Yy(l,c,d));if(r)for(let l of i){let c=await l;if(n.push(c),!c.success){o.abortAll();break}}else{let l=await Promise.allSettled(i);for(let c of l)c.status==="fulfilled"?n.push(c.value):n.push(La(Rs(),"unknown",!1,null,c.reason,0,0))}}finally{o.maxConcurrent=a}return n}function Sw(t){return Tn().abort(t)}function _w(){Tn().abortAll(),Pe.executionQueue=[]}function Ew(){Pe.isPaused=!0}function Aw(){Pe.isPaused=!1}function Cw(){return{...Tn().getStatus(),isPaused:Pe.isPaused,activeControllers:Pe.activeControllers.size,historyCount:Pe.executionHistory.length}}function Hy(t){Pe.executionHistory.push(t),Pe.executionHistory.length>100&&Pe.executionHistory.shift()}function kw(t={}){let e=[...Pe.executionHistory];return t.toolId&&(e=e.filter(r=>r.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(r=>r.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function Iw(){Pe.executionHistory=[]}function Mw(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let r of t)e.totalDuration+=r.duration,r.success?(e.successCount++,r.data!==void 0&&r.data!==null&&e.data.push(r.data)):(e.success=!1,e.failureCount++,r.error&&e.errors.push({taskId:r.taskId,toolId:r.toolId,error:r.error.message||String(r.error)}));return e}function Rw(t){return t.filter(e=>e.success).map(e=>e.data)}function Pw(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function Nw(t={}){return{taskId:Rs(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function Dw(t,e){return!e||e.length===0?t:[...e,...t]}function $w(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Gy(t,e){let r=[],s=t.promptTemplate||"",n={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[o,a]of Object.entries(n))s=s.replace(new RegExp($w(o),"g"),a);return r.push({role:"USER",content:s}),r}async function qy(t,e,r={}){let s=ne(t);if(!s)return{success:!1,taskId:Rs(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!s.enabled)return{success:!1,taskId:Rs(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let n=Date.now(),o=Rs();try{K.emit(B.TOOL_EXECUTION_STARTED,{toolId:t,taskId:o,context:e});let a=Gy(s,e);if(typeof r.callApi=="function"){let i=s.output?.apiPreset||s.apiPreset||"",l=i?{preset:i}:null,c=await r.callApi(a,l,r.signal),d=c;s.outputMode==="separate"&&s.extractTags?.length>0&&(d=Lw(c,s.extractTags));let u={success:!0,taskId:o,toolId:t,data:d,duration:Date.now()-n};return K.emit(B.TOOL_EXECUTED,{toolId:t,taskId:o,result:u}),u}else return{success:!0,taskId:o,toolId:t,data:{messages:a,config:{apiPreset:s.output?.apiPreset||s.apiPreset||"",outputMode:s.outputMode,extractTags:s.extractTags}},duration:Date.now()-n,needsExecution:!0}}catch(a){let i={success:!1,taskId:o,toolId:t,error:a.message||String(a),duration:Date.now()-n};return K.emit(B.TOOL_EXECUTION_FAILED,{toolId:t,taskId:o,error:a}),i}}function Lw(t,e){let r={};for(let s of e){let n=new RegExp(`<${s}[^>]*>([\\s\\S]*?)<\\/${s}>`,"gi"),o=t.match(n);o&&(r[s]=o.map(a=>{let i=a.match(new RegExp(`<${s}[^>]*>([\\s\\S]*?)<\\/${s}>`,"i"));return i?i[1].trim():""}))}return r}async function Ow(t,e,r={}){let s=[];for(let n of t){let o=ne(n);if(o&&o.enabled){let a=await qy(n,e,r);s.push(a)}}return s}var Pe,Ql,go,ec=D(()=>{er();Ye();Pe={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};Ql=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,r){return new Promise((s,n)=>{this.queue.push({executor:e,task:r,resolve:s,reject:n}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:r,task:s,resolve:n,reject:o}=e,a=new AbortController;s.abortController=a,s.status="running",s.startedAt=Date.now(),this.running.set(s.id,s),Pe.activeControllers.set(s.id,a),this.executeTask(r,s,a.signal).then(i=>{s.status="completed",s.completedAt=Date.now(),n(i)}).catch(i=>{s.status=i.name==="AbortError"?"aborted":"failed",s.completedAt=Date.now(),o(i)}).finally(()=>{this.running.delete(s.id),Pe.activeControllers.delete(s.id),Pe.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,r,s){let n=Date.now(),o=null;for(let a=0;a<=r.maxRetries;a++){if(s.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(s);return La(r.id,r.toolId,!0,i,null,Date.now()-n,a)}catch(i){if(o=i,i.name==="AbortError")throw i;a<r.maxRetries&&(await this.delay(1e3*(a+1)),r.retries=a+1)}}throw o}delay(e){return new Promise(r=>setTimeout(r,e))}abort(e){let r=Pe.activeControllers.get(e);return r?(r.abort(),!0):!1}abortAll(){for(let e of Pe.activeControllers.values())e.abort();Pe.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},go=null});async function zw(){return tc||(tc=Promise.resolve().then(()=>(ec(),Zl))),tc}async function Kw(t,e,r){return r&&t.output?.mode===kt.POST_RESPONSE_API?It.runToolPostResponse(t,e):r&&t.output?.mode===kt.FOLLOW_AI?It.runToolFollowAiManual(t,e):(await zw()).executeToolWithConfig(t.id,e)}function Uw(t,e){return e?.runSource==="MANUAL"?t.output?.mode==="local_transform"||t.processor?.type?Ps.MANUAL_LOCAL_TRANSFORM:t.output?.mode===kt.POST_RESPONSE_API?Ps.MANUAL_POST_RESPONSE_API:Ps.MANUAL_COMPATIBILITY:Ps.MANUAL_POST_RESPONSE_API}function Oa(t,e){try{rl(t,e)}catch(r){Bw.warn("\u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",{toolId:t,error:r})}}async function jw(t,e){let r=Date.now(),s=t.id,n=`yyt-tool-run-${s}`,o=Uw(t,e),a=e?.executionKey||"";Oa(s,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:o,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),is("info",`\u6B63\u5728\u624B\u52A8\u6267\u884C ${t.name}`,{sticky:!0,noticeId:n});try{let i=o===Ps.MANUAL_LOCAL_TRANSFORM?await $a(t,e):await Kw(t,e,!0),l=Date.now()-r;if(i?.success){let y=ne(s),p=i?.meta?.writebackDetails||{};return Oa(s,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(y?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:o,lastWritebackStatus:i?.meta?.writebackStatus||$e.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!p.contentCommitted,lastHostCommitApplied:!!p.hostCommitApplied,lastRefreshRequested:!!p.refreshRequested,lastRefreshConfirmed:!!p.refreshConfirmed,lastPreferredCommitMethod:p?.commit?.preferredMethod||"",lastAppliedCommitMethod:p?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(p?.refresh?.requestMethods)?p.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(p?.refresh?.requestMethods)?[...p.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(p?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:p?.refresh?.confirmedBy||""}),C("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`),is("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,{duration:3200,noticeId:n}),{success:!0,duration:l,result:i}}let c=ne(s),d=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",u=i?.meta?.writebackDetails||{};return Oa(s,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:o,lastWritebackStatus:i?.meta?.writebackStatus||$e.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||(o===Ps.MANUAL_COMPATIBILITY?We.COMPATIBILITY_EXECUTE:We.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),C("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),is("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:n}),{success:!1,duration:l,error:d,result:i}}catch(i){let l=Date.now()-r,c=ne(s),d=i?.message||String(i);throw Oa(s,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:o,lastWritebackStatus:$e.NOT_APPLICABLE,lastFailureStage:o===Ps.MANUAL_COMPATIBILITY?We.COMPATIBILITY_EXECUTE:We.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),C("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),is("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:n}),i}}async function Ba(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=ne(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return Or(t,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:$e.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),is("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let r=await us({runSource:"MANUAL"});return jw(e,r)}async function za(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=ne(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let r=await us({runSource:"MANUAL_PREVIEW"});return It.previewExtraction(e,r)}var Bw,Ps,tc,rc=D(()=>{er();fo();ys();Xl();Ge();W();Bw=I.createScope("ToolTrigger"),Ps={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},tc=null});var Jy={};re(Jy,{TOOL_CONFIG_PANEL_STYLES:()=>sc,createToolConfigPanel:()=>Vr,default:()=>Vw});function Vy(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function Fw(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function Vr(t={}){let{id:e,toolId:r,postResponseHint:s,previewDialogId:n,previewTitle:o="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:r,renderTo(a){let i=Vy(a);if(!i)return;if(i._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}let l=()=>this.renderTo(a),c=ne(r);if(!c){i.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let d=m("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),u=[];d.appendChild(Ww(c,r,l,s)),d.appendChild(Hw(c));let y=Yw(c,r,l);u.push(y),d.appendChild(y.el);let p=Gw(c,r,l,a,n,o);u.push(p),d.appendChild(p.el),i.innerHTML="",i.appendChild(d),i._yytToolPanelCleanup=()=>{for(let f of u)try{f.destroy()}catch{}delete i._yytToolPanelCleanup}},destroy(a){let i=Vy(a);if(i?._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}},getStyles(){return sc}}}function Ww(t,e,r,s){let n=m("div",{className:"yyt-tool-panel-hero"}),o=m("div",{className:"yyt-tool-panel-hero-row1"});o.appendChild(m("div",{className:"yyt-tool-panel-hero-icon",text:"\u{1F527}"})),o.appendChild(m("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let a=m("div",{className:"yyt-tool-panel-hero-actions"});a.appendChild(ce({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await Ba(e),C("success","\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C")}catch(f){C("error",`\u6267\u884C\u5931\u8D25\uFF1A${f?.message||f}`)}}}).el),a.appendChild(ce({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{C("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"),r()}}).el),o.appendChild(a),n.appendChild(o),t.description&&n.appendChild(m("div",{className:"yyt-tool-panel-hero-desc",text:t.description}));let i=m("div",{className:"yyt-tool-panel-hero-chips"}),c=(t.output?.mode||"follow_ai")==="post_response_api"?"\u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09":"\u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\uFF09";i.appendChild(m("span",{className:"yyt-tool-hero-chip mode",text:c}));let d=t.output?.apiPreset||t.apiPreset||"";d&&i.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`API: ${d}`}));let u=t.extraction?.regexPresetId||"";if(u){let f=xe.getPreset(u);i.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${f?f.name:"\u5DF2\u5220\u9664"}`}))}else i.appendChild(m("span",{className:"yyt-tool-hero-chip",text:"\u6B63\u5219: \u672A\u7ED1\u5B9A",style:{opacity:"0.6"}}));let y=t.worldbooks?.presetId||"";if(y){let f=ut.getPreset(y);f&&i.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u4E16\u754C\u4E66: ${f.name}`}))}let p=t.runtime?.lastStatus;if(p){let f=p==="success"?"status-success":p==="failed"?"status-failed":"";i.appendChild(m("span",{className:`yyt-tool-hero-chip ${f}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${p}`}))}return n.appendChild(i),n}function Hw(t){let e=m("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},s=(a,i,l="")=>{let c=m("div",{className:"yyt-tool-runtime-stat"});return c.appendChild(m("span",{className:"yyt-tool-runtime-stat-label",text:a})),c.appendChild(m("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),c},n=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":r.lastStatus==="idle"?"\u5F85\u547D":r.lastStatus||"\u5F85\u547D",o=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(s("\u72B6\u6001",n,o)),e.appendChild(s("\u6700\u8FD1\u8FD0\u884C",Fw(r.lastRunAt),"muted")),e.appendChild(s("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(s("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function Yw(t,e,r){let s=m("div",{style:{display:"flex",flexDirection:"column"}});s.appendChild(mo({label:"\u8F93\u51FA\u6A21\u5F0F",hint:"\u51B3\u5B9A\u6267\u884C\u8DEF\u5F84 + \u81EA\u52A8/\u624B\u52A8",control:qe({value:t.output?.mode||"follow_ai",options:[{value:"follow_ai",label:"follow_ai \u2014 \u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\u89E6\u53D1\uFF09"},{value:"post_response_api",label:"post_response_api \u2014 \u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09"}],onChange:l=>{let c=ne(e)||{};_e(e,{...c,output:{...c.output||{},mode:l,enabled:l==="post_response_api"}}),r()}})}));let n=(()=>{try{return Ir()||[]}catch{return[]}})();s.appendChild(mo({label:"API \u9884\u8BBE",hint:"\u989D\u5916 AI \u89E3\u6790\u65F6\u4F7F\u7528",control:qe({value:t.output?.apiPreset||t.apiPreset||"",options:[{value:"",label:"\u2014\u2014 \u8DDF\u968F\u5F53\u524D\u4E3B API \u2014\u2014"},...n.map(l=>({value:l.name,label:l.name}))],onChange:l=>{let c=ne(e)||{};_e(e,{...c,apiPreset:l,output:{...c.output||{},apiPreset:l}}),r()}})}));let o=(()=>{try{return uo()||[]}catch{return[]}})();s.appendChild(mo({label:"Ai \u6307\u4EE4\u9884\u8BBE",hint:'\u9644\u52A0\u5728 system/user \u524D\u7684\u6307\u4EE4\uFF1B\u9009"\u65E0"\u5373\u4E0D\u542F\u7528',control:qe({value:t.bypass?.enabled&&t.bypass?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0 \u2014\u2014"},...o.map(l=>({value:l.id,label:`${l.name}${l.isDefault?" [\u9ED8\u8BA4]":""}`}))],onChange:l=>{let c=ne(e)||{};_e(e,{...c,bypass:{enabled:!!l,presetId:l||""}}),r()}})}));let a=xe.listPresets();s.appendChild(mo({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6",control:qe({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...a.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let c=ne(e)||{},d={...c.extraction||{},regexPresetId:l};if(l){let u=xe.getPreset(l);C("success",`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${u?.name||l}`)}else C("success","\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6");_e(e,{...c,extraction:d}),r()}})}));let i=ut.listPresets();return s.appendChild(mo({label:"\u4E16\u754C\u4E66\u9884\u8BBE",hint:"\u6CE8\u5165\u5230 prompt \u7684 {{toolWorldbookContent}}",control:qe({value:t.worldbooks?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4FDD\u7559\u5DE5\u5177\u539F\u6709\u4E16\u754C\u4E66\u8BBE\u7F6E\uFF09 \u2014\u2014"},...i.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let c=ne(e)||{},d={...c.worldbooks||{},presetId:l};if(l){let u=ut.getPreset(l);C("success",`\u5DF2\u7ED1\u5B9A\u4E16\u754C\u4E66\u9884\u8BBE\uFF1A${u?.name||l}`)}else C("success","\u5DF2\u89E3\u7ED1\u4E16\u754C\u4E66\u9884\u8BBE\uFF0C\u5DE5\u5177\u4E0D\u518D\u6CE8\u5165\u4E16\u754C\u4E66\u5185\u5BB9");_e(e,{...c,worldbooks:d}),r()}})})),Ft({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[s]})}function mo({label:t,hint:e,control:r}){let s=m("div",{className:"yyt-tool-binding-row"}),n=m("div",{className:"yyt-tool-binding-label"});return n.appendChild(m("span",{className:"yyt-tool-binding-label-text",text:t})),e&&n.appendChild(m("span",{className:"yyt-tool-binding-label-hint",text:e})),s.appendChild(n),r.el.classList.add("small"),r.el.style.padding="7px 10px",r.el.style.fontSize="12px",s.appendChild(r.el),s.appendChild(m("div",{className:"yyt-tool-binding-meta"})),s}function Gw(t,e,r,s,n,o){let a=m("div",{style:{display:"flex",flexDirection:"column"}});a.appendChild(m("div",{style:{marginBottom:"8px",display:"flex",alignItems:"center",gap:"10px"}},m("div",{style:{flex:"1"}},m("div",{text:"\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:"\u7528 {{macro}} \u5F15\u7528\u4E0A\u4E0B\u6587\u3002\u6A21\u677F\u5185\u5BB9\u4F1A\u4F5C\u4E3A\u53D1\u7ED9\u989D\u5916 AI \u7684 user \u6D88\u606F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})),ce({label:"\u{1F504} \u91CD\u7F6E\u4E3A\u9ED8\u8BA4",size:"small",variant:"ghost",onClick:()=>{if(!window.confirm("\u7528\u5DE5\u5177\u9ED8\u8BA4\u6A21\u677F\u8986\u76D6\u5F53\u524D\u6A21\u677F\uFF1F"))return;let x=Zo(e)||{},v=ne(e)||{};_e(e,{...v,promptTemplate:x.promptTemplate||""}),r()}}).el));let i=m("textarea",{className:"yyt-textarea yyt-code-textarea",attrs:{rows:"10",placeholder:"\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px",lineHeight:"1.7"}});i.value=t.promptTemplate||"",i.addEventListener("change",()=>{let x=ne(e)||{};_e(e,{...x,promptTemplate:i.value})}),a.appendChild(i),a.appendChild(m("div",{className:"yyt-macro-inline",html:"\u53EF\u7528\u5B8F\uFF1A<code>{{toolPromptMacro}}</code> <code>{{toolContentMacro}}</code> <code>{{toolWorldbookContent}}</code> <code>{{lastAiMessage}}</code> <code>{{recentMessagesText}}</code> <code>{{rawRecentMessagesText}}</code> <code>{{userMessage}}</code> <code>{{toolName}}</code> <code>{{toolId}}</code>"})),a.appendChild(m("hr",{className:"yyt-zone-divider"})),a.appendChild(m("div",{style:{marginBottom:"8px"}},m("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u5E76\u5199\u56DE\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let l=m("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end",marginBottom:"12px"}}),c=m("div",{className:"yyt-form-group",style:{margin:0}});c.appendChild(m("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let d=m("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});d.value=String(Number(t.extraction?.maxMessages)||5),d.addEventListener("change",()=>{let x=ne(e)||{};_e(e,{...x,extraction:{...x.extraction||{},maxMessages:Math.max(1,parseInt(d.value,10)||5)}})}),c.appendChild(d),l.appendChild(c);let u=m("div",{className:"yyt-form-group",style:{margin:0}});u.appendChild(m("label",{html:"&nbsp;",style:{fontSize:"12px"}})),u.appendChild(ce({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let x=await za(e);qw(s,x,n,o)}catch(x){C("error",`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${x?.message||x}`)}}}).el),l.appendChild(u),a.appendChild(l);let y=m("div",{className:"yyt-form-group",style:{margin:0}});y.appendChild(m("label",{html:'\u5199\u56DE\u6807\u7B7E <span style="font-size:10px;color:var(--yyt-text-muted);font-weight:500;">\uFF08\u591A\u6807\u7B7E\u63D0\u53D6\u65F6\u6307\u5B9A\u552F\u4E00\u5199\u56DE\u6807\u7B7E\uFF1B\u7559\u7A7A\u5219\u63D0\u53D6\u9996\u4E2A\uFF09</span>',style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let p=`yyt-writeback-dl-${e}-${Math.random().toString(36).slice(2,6)}`,f=m("datalist",{attrs:{id:p}}),g=(()=>{let x=new Set,v=[];function T(M){if(M)for(let _ of M.rules||[]){if(_?.enabled===!1||_?.type!=="include")continue;let A=String(_.value||"").trim();!A||x.has(A)||(x.add(A),v.push(A))}}let L=t.extraction?.regexPresetId;if(L)T(xe.getPreset(L));else for(let M of xe.listPresets())T(M);return v})();for(let x of g)f.appendChild(m("option",{attrs:{value:x}}));let h=m("input",{className:"yyt-input",attrs:{type:"text",placeholder:"\u5982 status / content\uFF08\u6765\u81EA\u6B63\u5219\u9884\u8BBE\u7684 include \u6807\u7B7E\uFF09",list:p,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});return h.value=t.extraction?.writebackTag||"",h.addEventListener("change",()=>{let x=ne(e)||{};_e(e,{...x,extraction:{...x.extraction||{},writebackTag:h.value.trim()}})}),y.appendChild(h),y.appendChild(f),a.appendChild(y),Ft({heading:"\u914D\u7F6E",icon:"\u2699",content:[a]})}function qw(t,e,r,s){if(!Q()||!ge(t))return;let o=`${as}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${a.map((l,c)=>{let d=c===a.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${a.length-c} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${qr(d)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${qr(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${qr(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${qr(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(Ln({id:o,title:s,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${qr((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${qr(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${qr(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${qr(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${i}
    `})),On(t,o,{onSave:l=>l()}),t.find(`#${o}-save`).text("\u5173\u95ED"),t.find(`#${o}-cancel`).remove()}function qr(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var EA,sc,Vw,Sn=D(()=>{yr();Ge();Ge();er();$n();xn();rc();W();zr();js();EA=I.createScope("ToolConfigPanel"),sc=`
  .yyt-tool-panel { display: flex; flex-direction: column; height: 100%; gap: 0; }
  .yyt-tool-panel-hero {
    padding: 16px 20px;
    border-bottom: 1px solid var(--yyt-border);
    display: flex; flex-direction: column; gap: 8px;
  }
  .yyt-tool-panel-hero-row1 { display: flex; align-items: center; gap: 12px; }
  .yyt-tool-panel-hero-icon {
    width: 30px; height: 30px; border-radius: var(--yyt-radius-sm);
    background: var(--yyt-accent-soft); color: var(--yyt-accent);
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 14px; flex-shrink: 0;
  }
  .yyt-tool-panel-hero-name { flex: 1; font-size: 15px; font-weight: 700; color: var(--yyt-text); min-width: 0; }
  .yyt-tool-panel-hero-actions { display: flex; gap: 8px; flex-shrink: 0; }
  .yyt-tool-panel-hero-desc { font-size: 12px; color: var(--yyt-text-muted); line-height: 1.7; padding-left: 42px; }
  .yyt-tool-panel-hero-chips { display: flex; gap: 6px; flex-wrap: wrap; padding-left: 42px; }
  .yyt-tool-hero-chip {
    display: inline-flex; align-items: center;
    padding: 2px 8px; border-radius: 999px;
    font-size: 10px; font-weight: 600; letter-spacing: 0.3px;
    background: var(--yyt-surface-2); color: var(--yyt-text-muted);
  }
  .yyt-tool-hero-chip.mode { background: rgba(167,139,250,0.12); color: #a78bfa; }
  .yyt-tool-hero-chip.preset { background: var(--yyt-accent-soft); color: var(--yyt-accent); }
  .yyt-tool-hero-chip.status-success { background: rgba(74,222,128,0.12); color: #4ade80; }
  .yyt-tool-hero-chip.status-failed { background: rgba(239,68,68,0.12); color: #ef4444; }
  .yyt-tool-runtime-row {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
    padding: 12px 20px; border-bottom: 1px solid var(--yyt-border);
  }
  .yyt-tool-runtime-stat {
    display: flex; flex-direction: column; gap: 2px;
    border-left: 1px solid var(--yyt-border);
    padding-left: 14px;
  }
  .yyt-tool-runtime-stat:first-child { border-left: none; padding-left: 0; }
  .yyt-tool-runtime-stat-label {
    font-size: 10px; font-weight: 700; color: var(--yyt-text-muted);
    text-transform: uppercase; letter-spacing: 0.4px;
  }
  .yyt-tool-runtime-stat-value {
    font-size: 12px; font-weight: 600; color: var(--yyt-text);
    font-variant-numeric: tabular-nums;
  }
  .yyt-tool-runtime-stat-value.success { color: #4ade80; }
  .yyt-tool-runtime-stat-value.error { color: #ef4444; }
  .yyt-tool-runtime-stat-value.muted { color: var(--yyt-text-muted); }
  .yyt-tool-binding-row {
    display: grid; grid-template-columns: 130px 1fr auto;
    gap: 12px; align-items: center; padding: 10px 0;
  }
  .yyt-tool-binding-row + .yyt-tool-binding-row {
    border-top: 1px dashed rgba(255,255,255,0.08);
  }
  .yyt-tool-binding-label { display: flex; flex-direction: column; gap: 2px; }
  .yyt-tool-binding-label-text { font-size: 12px; font-weight: 600; color: var(--yyt-text-secondary, rgba(255,255,255,0.55)); }
  .yyt-tool-binding-label-hint { font-size: 10px; color: var(--yyt-text-muted); }
  .yyt-tool-binding-meta a { color: var(--yyt-accent); text-decoration: none; font-weight: 600; font-size: 11px; }
  .yyt-tool-binding-meta a:hover { text-decoration: underline; }
  .yyt-zone-divider { border: none; margin: 18px 0; height: 0; border-top: 1px dashed rgba(255,255,255,0.10); }
  .yyt-macro-inline {
    font-size: 11px; color: var(--yyt-text-muted);
    line-height: 1.7; margin-top: 6px;
    font-family: ui-monospace, monospace;
  }
  .yyt-macro-inline code {
    color: var(--yyt-accent); background: var(--yyt-surface-2);
    padding: 1px 5px; border-radius: 3px; font-size: 10px;
  }
`;Vw=Vr});var Qy={};re(Qy,{SummaryToolPanel:()=>Xy,default:()=>Jw});var Xy,Jw,Zy=D(()=>{Sn();Xy=Vr({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"}),Jw=Xy});var tf={};re(tf,{StatusBlockPanel:()=>ef,default:()=>Xw});var ef,Xw,rf=D(()=>{Sn();ef=Vr({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"}),Xw=ef});var nf={};re(nf,{YouyouReviewPanel:()=>sf,default:()=>Qw});var sf,Qw,of=D(()=>{Sn();sf=Vr({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"}),Qw=sf});function af(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function Zw(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function Jr(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ka(t={}){let{id:e,toolId:r,previewDialogId:s,previewTitle:n="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:o=[],processorOptions:a=[],heroHint:i=""}=t;return{id:e,toolId:r,renderTo(l){let c=af(l);if(!c)return;if(c._yytLocalToolPanelCleanup)try{c._yytLocalToolPanelCleanup()}catch{}let d=()=>this.renderTo(l),u=ne(r);if(!u){c.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let y=m("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),p=[];y.appendChild(ev(u,r,d,o,i)),y.appendChild(tv(u));let f=rv(u,r,d);p.push(f),y.appendChild(f.el);let g=sv(u,r,d,l,o,a,s,n);p.push(g),y.appendChild(g.el),c.innerHTML="",c.appendChild(y),c._yytLocalToolPanelCleanup=()=>{for(let h of p)try{h.destroy()}catch{}delete c._yytLocalToolPanelCleanup}},destroy(l){let c=af(l);if(c?._yytLocalToolPanelCleanup)try{c._yytLocalToolPanelCleanup()}catch{}},getStyles(){return""}}}function ev(t,e,r,s,n){let o=m("div",{className:"yyt-tool-panel-hero"}),a=m("div",{className:"yyt-tool-panel-hero-row1"});a.appendChild(m("div",{className:"yyt-tool-panel-hero-icon",text:"\u2699"})),a.appendChild(m("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let i=m("div",{className:"yyt-tool-panel-hero-actions"});i.appendChild(ce({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await Ba(e),C("success","\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C")}catch(g){C("error",`\u6267\u884C\u5931\u8D25\uFF1A${g?.message||g}`)}}}).el),i.appendChild(ce({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{C("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"),r()}}).el),a.appendChild(i),o.appendChild(a),t.description&&o.appendChild(m("div",{className:"yyt-tool-panel-hero-desc",text:t.description})),n&&o.appendChild(m("div",{className:"yyt-tool-panel-hero-desc",text:n}));let l=m("div",{className:"yyt-tool-panel-hero-chips"}),c=t.output?.autoTrigger!==!1;l.appendChild(m("span",{className:"yyt-tool-hero-chip mode",text:`\u672C\u5730\u811A\u672C\uFF08${c?"\u81EA\u52A8":"\u624B\u52A8"}\uFF09`}));let d=t.processor?.direction||s[0]?.key||"",u=s.find(g=>g.key===d)?.label||d;u&&l.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u65B9\u5411: ${u}`}));let y=t.output?.overwrite!==!1;l.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u5199\u56DE: ${y?"\u8986\u76D6":"\u8FFD\u52A0"}`}));let p=t.extraction?.regexPresetId||"";if(p){let g=xe.getPreset(p);g&&l.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${g.name}`}))}let f=t.runtime?.lastStatus;if(f){let g=f==="success"?"status-success":f==="failed"?"status-failed":"";l.appendChild(m("span",{className:`yyt-tool-hero-chip ${g}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${f}`}))}return o.appendChild(l),o}function tv(t){let e=m("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},s=(a,i,l="")=>{let c=m("div",{className:"yyt-tool-runtime-stat"});return c.appendChild(m("span",{className:"yyt-tool-runtime-stat-label",text:a})),c.appendChild(m("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),c},n=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":"\u5F85\u547D",o=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(s("\u72B6\u6001",n,o)),e.appendChild(s("\u6700\u8FD1\u8FD0\u884C",Zw(r.lastRunAt),"muted")),e.appendChild(s("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(s("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function rv(t,e,r){let s=m("div",{style:{display:"flex",flexDirection:"column"}}),n=xe.listPresets();return s.appendChild(nc({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C",control:qe({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...n.map(o=>({value:o.id,label:o.name}))],onChange:o=>{let a=ne(e)||{},i={...a.extraction||{},regexPresetId:o};if(o){let l=xe.getPreset(o);C("success",`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${l?.name||o}`)}else C("success","\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6");_e(e,{...a,extraction:i}),r()}})})),s.appendChild(nc({label:"\u5199\u56DE\u65B9\u5F0F",hint:"\u5904\u7406\u540E\u7684\u7ED3\u679C\u5982\u4F55\u56DE\u5199\u5230 AI \u6D88\u606F",control:qe({value:t.output?.overwrite!==!1?"replace":"append",options:[{value:"replace",label:"\u8986\u76D6\u539F\u5DE5\u5177\u5757"},{value:"append",label:"\u8FFD\u52A0\u5230\u672B\u5C3E"}],onChange:o=>{let a=ne(e)||{};_e(e,{...a,output:{...a.output||{},overwrite:o==="replace",enabled:!0,mode:"local_transform"}}),r()}})})),s.appendChild(nc({label:"\u81EA\u52A8\u89E6\u53D1",hint:"\u6536\u5230 AI \u56DE\u590D\u540E\u662F\u5426\u81EA\u52A8\u6267\u884C\u6B64\u811A\u672C",control:qe({value:t.output?.autoTrigger!==!1?"auto":"manual",options:[{value:"auto",label:"\u81EA\u52A8\uFF08\u6536\u5230\u56DE\u590D\u5373\u6267\u884C\uFF09"},{value:"manual",label:"\u624B\u52A8\uFF08\u4EC5\u70B9\u51FB\u6309\u94AE\u6267\u884C\uFF09"}],onChange:o=>{let a=ne(e)||{};_e(e,{...a,output:{...a.output||{},autoTrigger:o==="auto",enabled:!0,mode:"local_transform"}}),r()}})})),Ft({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[s]})}function nc({label:t,hint:e,control:r}){let s=m("div",{className:"yyt-tool-binding-row"}),n=m("div",{className:"yyt-tool-binding-label"});return n.appendChild(m("span",{className:"yyt-tool-binding-label-text",text:t})),e&&n.appendChild(m("span",{className:"yyt-tool-binding-label-hint",text:e})),s.appendChild(n),r.el.style.padding="7px 10px",r.el.style.fontSize="12px",s.appendChild(r.el),s.appendChild(m("div",{className:"yyt-tool-binding-meta"})),s}function sv(t,e,r,s,n,o,a,i){let l=m("div",{style:{display:"flex",flexDirection:"column"}});l.appendChild(m("div",{style:{marginBottom:"10px"}},m("div",{text:"\u6267\u884C\u65B9\u5411",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:"\u51B3\u5B9A\u672C\u5730\u811A\u672C\u8FD0\u884C\u54EA\u4E2A\u53D8\u6362\u8DEF\u5F84\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let c=t.processor?.direction||n[0]?.key||"",d=qe({value:c,options:n.map(g=>({value:g.key,label:g.description?`${g.label} \u2014 ${g.description}`:g.label})),onChange:g=>{let h=ne(e)||{};_e(e,{...h,processor:{...h.processor||{},direction:g}}),r()}});if(d.el.style.padding="7px 10px",d.el.style.fontSize="12px",l.appendChild(d.el),l.appendChild(m("hr",{className:"yyt-zone-divider"})),o.length>0){l.appendChild(m("div",{style:{marginBottom:"10px"}},m("div",{text:"\u5904\u7406\u9879",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:"\u52FE\u9009\u8981\u5305\u542B\u5728\u672C\u6B21\u53D8\u6362\u4E2D\u7684\u9879\u76EE\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let g=m("div",{style:{display:"flex",flexDirection:"column"}}),h=t.processor?.options||{};for(let x of o){let v=wt({label:x.label,hint:x.description||"",checked:h[x.key]===!0,onChange:T=>{let L=ne(e)||{};_e(e,{...L,processor:{...L.processor||{},options:{...L.processor?.options||{},[x.key]:T}}})}});g.appendChild(v.el)}l.appendChild(g),l.appendChild(m("hr",{className:"yyt-zone-divider"}))}l.appendChild(m("div",{style:{marginBottom:"10px"}},m("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let u=m("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end"}}),y=m("div",{className:"yyt-form-group",style:{margin:0}});y.appendChild(m("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let p=m("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});p.value=String(Number(t.extraction?.maxMessages)||5),p.addEventListener("change",()=>{let g=ne(e)||{};_e(e,{...g,extraction:{...g.extraction||{},maxMessages:Math.max(1,parseInt(p.value,10)||5)}})}),y.appendChild(p),u.appendChild(y);let f=m("div",{className:"yyt-form-group",style:{margin:0}});return f.appendChild(m("label",{html:"&nbsp;",style:{fontSize:"12px"}})),f.appendChild(ce({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let g=await za(e);nv(s,g,a,i)}catch(g){C("error",`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${g?.message||g}`)}}}).el),u.appendChild(f),l.appendChild(u),Ft({heading:"\u914D\u7F6E",icon:"\u2699",content:[l]})}function nv(t,e,r,s){if(!Q()||!ge(t))return;let o=`${as}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${a.map((l,c)=>{let d=c===a.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${a.length-c} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${Jr(d)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${Jr(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${Jr(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${Jr(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(Ln({id:o,title:s,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${Jr((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Jr(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Jr(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Jr(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${i}
    `})),On(t,o,{onSave:l=>l()}),t.find(`#${o}-save`).text("\u5173\u95ED"),t.find(`#${o}-cancel`).remove()}var BA,oc=D(()=>{yr();Ge();er();rc();W();Sn();zr();BA=I.createScope("LocalTransformToolPanel")});var cf={};re(cf,{EscapeTransformToolPanel:()=>lf,default:()=>ov});var lf,ov,df=D(()=>{oc();lf=Ka({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]}),ov=lf});var pf={};re(pf,{PunctuationTransformToolPanel:()=>uf,default:()=>av});var uf,av,yf=D(()=>{oc();uf=Ka({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]}),av=uf});var gf={};re(gf,{BypassPanel:()=>ff,default:()=>iv});var ff,iv,mf=D(()=>{Ye();xn();Ge();ff={id:"bypassPanel",_getActivePresetId(t){return t.find(".yyt-bypass-editor-content").data("presetId")||null},render(t){let e=ie.getPresetList(),r=ie.getDefaultPresetId();return`
      <div class="yyt-bypass-panel">
        <!-- \u5DE6\u4FA7\u9884\u8BBE\u5217\u8868 -->
        <div class="yyt-bypass-sidebar">
          <div class="yyt-bypass-sidebar-header">
            <span class="yyt-bypass-sidebar-title">Ai\u6307\u4EE4\u9884\u8BBE</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-primary" id="yyt-bypass-add">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <div class="yyt-bypass-preset-list">
            ${e.map(s=>this._renderPresetItem(s,s.id===r)).join("")}
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
        <div class="yyt-bypass-editor">
          <div class="yyt-bypass-empty">
            <i class="fa-solid fa-shield-halved"></i>
            <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
          </div>
        </div>
      </div>
    `},_renderPresetItem(t,e){let r=Sr&&Sr[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${se(t.name)}</span>
          <span class="yyt-bypass-preset-count">${t.messages?.length||0} \u6761\u6D88\u606F</span>
        </div>
        <div class="yyt-bypass-preset-actions">
          ${e?'<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>':""}
          ${r?"":`
            <button class="yyt-btn yyt-btn-icon yyt-btn-danger yyt-bypass-quick-delete" title="\u5220\u9664\u9884\u8BBE" data-preset-id="${t.id}">
              <i class="fa-solid fa-trash"></i>
            </button>
          `}
        </div>
      </div>
    `},_renderEditor(t){if(!t)return`
        <div class="yyt-bypass-empty">
          <i class="fa-solid fa-shield-halved"></i>
          <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
        </div>
      `;let e=ie.getDefaultPresetId()===t.id,r=Sr&&Sr[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${se(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
          </div>
          <div class="yyt-bypass-editor-actions">
            ${r?"":`
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
          <input type="text" class="yyt-input yyt-bypass-description-input"
                 value="${se(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
        </div>

        <div class="yyt-bypass-messages-header">
          <span>\u6D88\u606F\u5217\u8868</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-add-message">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u6D88\u606F
          </button>
        </div>

        <div class="yyt-bypass-messages">
          ${(t.messages||[]).map((s,n)=>this._renderMessageItem(s,n)).join("")}
        </div>

        <div class="yyt-bypass-editor-footer">
          <button class="yyt-btn yyt-btn-primary" id="yyt-bypass-save">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58
          </button>
        </div>
      </div>
    `},_renderMessageItem(t,e=0){let r={SYSTEM:"fa-server",USER:"fa-user",assistant:"fa-robot"};return`
      <div class="yyt-bypass-message ${t.enabled===!1?"yyt-disabled":""}"
           data-message-id="${t.id}" data-message-index="${e}"
           data-deletable="${t.deletable!==!1}">
        <div class="yyt-bypass-message-header">
          <div class="yyt-bypass-message-role">
            <i class="fa-solid ${r[t.role]||"fa-comment"}"></i>
            <select class="yyt-select yyt-bypass-role-select yyt-select-fixed-width">
              <option value="SYSTEM" ${t.role==="SYSTEM"?"selected":""}>SYSTEM</option>
              <option value="USER" ${t.role==="USER"?"selected":""}>USER</option>
              <option value="assistant" ${t.role==="assistant"?"selected":""}>assistant</option>
            </select>
          </div>
          <div class="yyt-bypass-message-controls">
            <button class="yyt-btn yyt-btn-icon yyt-btn-secondary yyt-bypass-move-up" title="\u4E0A\u79FB">
              <i class="fa-solid fa-chevron-up"></i>
            </button>
            <button class="yyt-btn yyt-btn-icon yyt-btn-secondary yyt-bypass-move-down" title="\u4E0B\u79FB">
              <i class="fa-solid fa-chevron-down"></i>
            </button>
            <button class="yyt-btn yyt-btn-icon yyt-btn-secondary yyt-bypass-insert-message" title="\u5728\u6B64\u4E0B\u65B9\u63D2\u5165">
              <i class="fa-solid fa-plus"></i>
            </button>
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${se(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let r=Q();!r||!ge(t)||(t.off(".yytBypass"),this._bindPresetListEvents(t,r),this._bindEditorEvents(t,r),this._bindFileEvents(t,r),Nt(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_bindPresetListEvents(t,e){t.on("click.yytBypass",".yyt-bypass-preset-item",r=>{if(e(r.target).closest(".yyt-bypass-quick-delete").length)return;let s=e(r.currentTarget).data("presetId");this._selectPreset(t,e,s)}),t.on("click.yytBypass",".yyt-bypass-quick-delete",async r=>{r.stopPropagation();let s=e(r.currentTarget).data("presetId");if(!s||!await pr("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let o=ie.deletePreset(s);o.success?(t.find(".yyt-bypass-editor-content").data("presetId")===s&&t.find(".yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),C("success","\u9884\u8BBE\u5DF2\u5220\u9664")):C("error",o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.on("click.yytBypass","#yyt-bypass-add",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click.yytBypass","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click.yytBypass","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click.yytBypass",".yyt-bypass-move-up",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message"),n=s.prev(".yyt-bypass-message");n.length&&(n.before(s),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-move-down",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message"),n=s.next(".yyt-bypass-message");n.length&&(n.after(s),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-insert-message",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message");this._insertMessageAfter(t,e,s)}),t.on("click.yytBypass",".yyt-bypass-delete-message",r=>{e(r.currentTarget).closest(".yyt-bypass-message").remove(),this._refreshMessageIndices(t,e)}),t.on("change.yytBypass",".yyt-bypass-message-enabled",r=>{e(r.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(r.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.on("click.yytBypass","#yyt-bypass-import",()=>{t.find("#yyt-bypass-import-file").click()}),t.on("change.yytBypass","#yyt-bypass-import-file",async r=>{let s=r.target.files[0];if(s){try{let n=await zn(s),o=ie.importPresets(n);C(o.success?"success":"error",o.message),o.success&&this.renderTo(t)}catch(n){C("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}e(r.target).val("")}}),t.on("click.yytBypass","#yyt-bypass-export",()=>{try{let r=ie.exportPresets();Bn(r,`bypass_presets_${Date.now()}.json`),C("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(r){C("error",`\u5BFC\u51FA\u5931\u8D25: ${r.message}`)}})},_selectPreset(t,e,r){let s=ie.getPreset(r);s&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${r}"]`).addClass("yyt-active"),t.find(".yyt-bypass-editor").html(this._renderEditor(s)),Nt(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_createNewPreset(t,e){let r=`bypass_${Date.now()}`,s=ie.createPreset({id:r,name:"\u65B0 Ai \u6307\u4EE4\u9884\u8BBE",description:"",messages:[]});s.success?(this.renderTo(t),this._selectPreset(t,e,r),C("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):C("error",s?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content"),s=r.data("presetId");if(!s)return;let n=r.find(".yyt-bypass-name-input").val().trim(),o=r.find(".yyt-bypass-description-input").val().trim();if(!n){C("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),r.find(".yyt-bypass-name-input").trigger("focus").trigger("select");return}let a=[];r.find(".yyt-bypass-message").each(function(){let l=e(this);a.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:String(l.data("deletable"))!=="false"})});let i=ie.updatePreset(s,{name:n,description:o,messages:a});i.success?(C("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):C("error",i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},async _deleteCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s||!await pr("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let o=ie.deletePreset(s);o.success?(this.renderTo(t),C("success","\u9884\u8BBE\u5DF2\u5220\u9664")):C("error",o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s)return;let n=`bypass_${Date.now()}`,o=ie.duplicatePreset(s,n);o.success?(this.renderTo(t),this._selectPreset(t,e,n),C("success","\u9884\u8BBE\u5DF2\u590D\u5236")):C("error",o?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s)return;ie.setDefaultPresetId(s),this._refreshPresetList(t,e);let n=ie.getPreset(s);n&&t.find(".yyt-bypass-editor").html(this._renderEditor(n)),C("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE")},_addMessage(t,e){let r=t.find(".yyt-bypass-messages"),s={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},n=r.find(".yyt-bypass-message").length;r.append(this._renderMessageItem(s,n))},_insertMessageAfter(t,e,r){let s=t.find(".yyt-bypass-messages"),n={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},o=this._renderMessageItem(n,0),a=e(o);r.after(a),this._refreshMessageIndices(t,e)},_refreshMessageIndices(t,e){t.find(".yyt-bypass-message").each(function(r){e(this).attr("data-message-index",r)})},_refreshPresetList(t,e){let r=ie.getPresetList(),s=ie.getDefaultPresetId(),n=this._getActivePresetId(t);t.find(".yyt-bypass-preset-list").html(r.map(o=>this._renderPresetItem(o,o.id===s)).join("")),n&&t.find(`.yyt-bypass-preset-item[data-preset-id="${n}"]`).addClass("yyt-active")},destroy(t){!Q()||!ge(t)||(ct(t,"yytBypassSelect"),t.off(".yytBypass"))},getStyles(){return`
      /* \u7834\u9650\u8BCD\u9762\u677F\u6837\u5F0F */
      .yyt-bypass-panel {
        display: flex;
        height: 100%;
        gap: 0;
      }

      .yyt-bypass-sidebar {
        width: 220px;
        display: flex;
        flex-direction: column;
        background: var(--yyt-surface-2);
        border-radius: 0;
        border-right: 1px solid var(--yyt-border);
        flex-shrink: 0;
      }
      
      .yyt-bypass-sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        border-bottom: 1px solid var(--yyt-border);
      }

      .yyt-bypass-sidebar-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--yyt-text);
      }
      
      .yyt-bypass-preset-list {
        flex: 1;
        overflow-y: auto;
        padding: 0;
      }

      .yyt-bypass-preset-item {
        padding: 12px 16px;
        border-radius: 0;
        border-top: 1px solid var(--yyt-border);
        cursor: pointer;
        transition: all 0.2s ease;
        margin-bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      .yyt-bypass-preset-item:first-child {
        border-top: none;
      }
      
      .yyt-bypass-preset-item:hover {
        background: var(--yyt-surface-hover);
      }
      
      .yyt-bypass-preset-item.yyt-active {
        background: var(--yyt-accent-soft);
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
        background: var(--yyt-accent-soft);
        color: var(--yyt-accent);
        border-radius: 4px;
        margin-top: 4px;
        display: inline-block;
      }
      
      .yyt-bypass-sidebar-footer {
        display: flex;
        gap: 8px;
        padding: 12px;
        border-top: 1px solid var(--yyt-border);
      }

      .yyt-bypass-sidebar-footer .yyt-btn {
        flex: 1;
      }
      
      .yyt-bypass-editor {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: transparent;
        border-radius: 0;
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
        border-bottom: 1px solid var(--yyt-border);
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
        border-bottom: 1px solid var(--yyt-border);
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
        background: transparent;
        border-top: 1px solid var(--yyt-border);
        padding: 14px;
      }

      .yyt-bypass-message:first-child {
        border-top: none;
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
        font-size: 12px;
      }
      
      .yyt-bypass-message-controls {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .yyt-bypass-insert-message {
        opacity: 0;
        transition: opacity 0.15s ease;
        font-size: 11px !important;
        padding: 2px 6px !important;
      }

      .yyt-bypass-message:hover .yyt-bypass-insert-message {
        opacity: 0.7;
      }

      .yyt-bypass-insert-message:hover {
        opacity: 1 !important;
      }
      
      .yyt-bypass-message-content {
        min-height: 80px;
      }
      
      .yyt-bypass-editor-footer {
        padding: 16px;
        border-top: 1px solid var(--yyt-border);
        display: flex;
        justify-content: flex-end;
      }
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},iv=ff});var ic={};re(ic,{SettingsPanel:()=>vf,applyTheme:()=>wf,applyUiPreferences:()=>ac,default:()=>cv});function ho({id:t,checked:e=!1,title:r="",hint:s=""}){return`
    <div class="yyt-toggle-row">
      <div class="yyt-toggle-label">
        <span>${r}</span>
        ${s?`<span class="yyt-toggle-hint">${s}</span>`:""}
      </div>
      <label class="yyt-toggle">
        <input type="checkbox" id="${t}" ${e?"checked":""}>
        <span class="yyt-toggle-slider"></span>
      </label>
    </div>
  `}function bf(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function bo(){return bf()?.document||document}function xf(t=bo()){return t?.documentElement||document.documentElement}function wf(t,e=bo()){let r=xf(e),s={...lv,...hf[t]||hf["dark-blue"]};Object.entries(s).forEach(([n,o])=>{r.style.setProperty(n,o)}),r.setAttribute("data-yyt-theme",t)}function ac(t={},e=bo()){let r=xf(e),{theme:s="dark-blue",compactMode:n=!1,animationEnabled:o=!0}=t||{};wf(s,e),r.classList.toggle("yyt-compact-mode",!!n),r.classList.toggle("yyt-no-animation",!o)}var lv,hf,vf,cv,lc=D(()=>{Ye();yo();W();Ra();Ge();lv={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-on-accent":"#0a0d13","--yyt-bg-base":"#0a0d13","--yyt-surface":"#0f1219","--yyt-surface-2":"#151a24","--yyt-surface-3":"#1c2231","--yyt-surface-hover":"#1c2231","--yyt-surface-active":"#232b3e","--yyt-border":"rgba(255, 255, 255, 0.06)","--yyt-border-soft":"rgba(255, 255, 255, 0.04)","--yyt-border-strong":"rgba(255, 255, 255, 0.12)","--yyt-text":"rgba(255, 255, 255, 0.92)","--yyt-text-secondary":"rgba(255, 255, 255, 0.55)","--yyt-text-muted":"rgba(255, 255, 255, 0.35)","--yyt-focus-ring":"0 0 0 2px rgba(123, 183, 255, 1), 0 0 0 4px rgba(123, 183, 255, 0.15)","--yyt-control-bg":"#0f1219","--yyt-control-bg-hover":"#151a24","--yyt-control-bg-active":"#1c2231","--yyt-control-bg-strong":"#151a24","--yyt-control-bg-focus":"#151a24","--yyt-control-border":"rgba(255, 255, 255, 0.08)","--yyt-control-border-hover":"rgba(255, 255, 255, 0.14)","--yyt-control-border-focus":"rgba(123, 183, 255, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#151a24","--yyt-select-option-bg":"#1c2231","--yyt-select-option-hover-bg":"#232b3e","--yyt-select-option-selected-bg":"#2a3450","--yyt-select-option-border":"rgba(123, 183, 255, 0.15)","--yyt-select-option-selected-border":"rgba(123, 183, 255, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(0, 0, 0, 0.4)","--yyt-select-arrow-color":"rgba(255, 255, 255, 0.4)"},hf={"dark-blue":{"--yyt-on-accent":"#0a0d13"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0d0a14","--yyt-surface":"#12101c","--yyt-surface-2":"#1a1726","--yyt-surface-3":"#221e32","--yyt-surface-hover":"#221e32","--yyt-surface-active":"#2a2540","--yyt-on-accent":"#0d0a14","--yyt-control-bg":"#12101c","--yyt-control-bg-hover":"#1a1726","--yyt-control-bg-active":"#221e32","--yyt-control-bg-strong":"#1a1726","--yyt-control-bg-focus":"#1a1726","--yyt-control-border-focus":"rgba(167, 139, 250, 0.5)","--yyt-select-surface":"#1a1726","--yyt-select-option-bg":"#221e32","--yyt-select-option-hover-bg":"#2a2540","--yyt-select-option-selected-bg":"#332d50","--yyt-select-option-border":"rgba(167, 139, 250, 0.15)","--yyt-select-option-selected-border":"rgba(167, 139, 250, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(167, 139, 250, 1), 0 0 0 4px rgba(167, 139, 250, 0.15)"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0a120d","--yyt-surface":"#0f1912","--yyt-surface-2":"#151f1a","--yyt-surface-3":"#1c2824","--yyt-surface-hover":"#1c2824","--yyt-surface-active":"#233530","--yyt-on-accent":"#0a120d","--yyt-control-bg":"#0f1912","--yyt-control-bg-hover":"#151f1a","--yyt-control-bg-active":"#1c2824","--yyt-control-bg-strong":"#151f1a","--yyt-control-bg-focus":"#151f1a","--yyt-control-border-focus":"rgba(74, 222, 128, 0.5)","--yyt-select-surface":"#151f1a","--yyt-select-option-bg":"#1c2824","--yyt-select-option-hover-bg":"#233530","--yyt-select-option-selected-bg":"#2a4038","--yyt-select-option-border":"rgba(74, 222, 128, 0.15)","--yyt-select-option-selected-border":"rgba(74, 222, 128, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(74, 222, 128, 1), 0 0 0 4px rgba(74, 222, 128, 0.15)"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f5f7fa","--yyt-surface":"#edf0f5","--yyt-surface-2":"#e4e8ef","--yyt-surface-3":"#dbe0e9","--yyt-surface-hover":"#dbe0e9","--yyt-surface-active":"#d1d7e2","--yyt-text":"rgba(15, 23, 42, 0.92)","--yyt-text-secondary":"rgba(15, 23, 42, 0.55)","--yyt-text-muted":"rgba(15, 23, 42, 0.35)","--yyt-border":"rgba(15, 23, 42, 0.08)","--yyt-border-soft":"rgba(15, 23, 42, 0.04)","--yyt-border-strong":"rgba(15, 23, 42, 0.14)","--yyt-focus-ring":"0 0 0 2px rgba(59, 130, 246, 1), 0 0 0 4px rgba(59, 130, 246, 0.12)","--yyt-on-accent":"#ffffff","--yyt-control-bg":"#edf0f5","--yyt-control-bg-hover":"#e4e8ef","--yyt-control-bg-active":"#dbe0e9","--yyt-control-bg-strong":"#e4e8ef","--yyt-control-bg-focus":"#e4e8ef","--yyt-control-border":"rgba(15, 23, 42, 0.1)","--yyt-control-border-hover":"rgba(15, 23, 42, 0.18)","--yyt-control-border-focus":"rgba(59, 130, 246, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#e4e8ef","--yyt-select-option-bg":"#edf0f5","--yyt-select-option-hover-bg":"#dbe0e9","--yyt-select-option-selected-bg":"#dbeafe","--yyt-select-option-border":"rgba(59, 130, 246, 0.12)","--yyt-select-option-selected-border":"rgba(59, 130, 246, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(15, 23, 42, 0.1)","--yyt-select-arrow-color":"rgba(15, 23, 42, 0.4)"}};vf={id:"settingsPanel",render(){let t=Bt.getSettings(),e=t.debug?.enableDebugLog===!0,r=this._getAutomationRuntime();return`
      <div class="yyt-settings-panel">
        <div class="yyt-settings-hero">
          <div class="yyt-settings-hero-copy">
            <div class="yyt-settings-hero-title">\u5168\u5C40\u504F\u597D\u4E0E\u8FD0\u884C\u7B56\u7565</div>
            <div class="yyt-settings-hero-desc">\u7EDF\u4E00\u7BA1\u7406\u6267\u884C\u5668\u3001\u81EA\u52A8\u5316\u3001\u8C03\u8BD5\u4E0E\u5916\u89C2\u8BBE\u7F6E\uFF0C\u8BA9\u5DE5\u5177\u94FE\u884C\u4E3A\u4E0E\u754C\u9762\u4F53\u9A8C\u4FDD\u6301\u4E00\u81F4\u3002</div>
          </div>
          <div class="yyt-settings-hero-status">
            <span class="yyt-settings-status-chip ${e?"is-on":"is-off"}">\u8C03\u8BD5 ${e?"\u5F00\u542F":"\u5173\u95ED"}</span>
            <span class="yyt-settings-status-chip is-neutral">\u4E3B\u9898 ${t.ui?.theme||"dark-blue"}</span>
          </div>
        </div>

        <div class="yyt-settings-tabs">
          <button class="yyt-settings-tab yyt-active" data-tab="executor">
            <i class="fa-solid fa-microchip"></i> \u6267\u884C\u5668
          </button>
          <button class="yyt-settings-tab" data-tab="debug">
            <i class="fa-solid fa-bug"></i> \u8C03\u8BD5
          </button>
          <button class="yyt-settings-tab" data-tab="ui">
            <i class="fa-solid fa-palette"></i> \u5916\u89C2
          </button>
        </div>

        <div class="yyt-settings-content">
          ${this._renderExecutorTab(t.executor,t.automation,r)}
          ${this._renderDebugTab(t.debug)}
          ${this._renderUiTab(t.ui)}
        </div>

        <div class="yyt-settings-footer">
          <button class="yyt-btn yyt-btn-secondary" id="yyt-settings-reset">
            <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u4E3A\u9ED8\u8BA4
          </button>
          <button class="yyt-btn yyt-btn-primary" id="yyt-settings-save">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u8BBE\u7F6E
          </button>
        </div>
      </div>
    `},_renderExecutorTab(t,e={},r=null){let s=Array.isArray(r?.recentTransactions)?r.recentTransactions.slice().reverse():[],n=r?.hostBinding||{},o=Array.isArray(n.eventBindings)&&n.eventBindings.length>0?n.eventBindings.join(" / "):"\u6682\u65E0\u4E8B\u4EF6\u7ED1\u5B9A",a=s.length>0?s.slice(0,5).map(i=>{let l=i?.results?.[0]?.meta?.writebackDetails?.refresh||{};return`
          <div class="yyt-list-row">
            <div class="yyt-settings-runtime-meta">
              <span>${i?.sourceEvent||"UNKNOWN_EVENT"}</span>
              <span>${i?.phase||"unknown"}</span>
              <span>${i?.messageId||"no_message_id"}</span>
            </div>
            <div class="yyt-settings-runtime-main">${i?.verdict||i?.error||i?.generationKey||"\u65E0\u989D\u5916\u4FE1\u606F"}</div>
          </div>
        `}).join(""):'<div class="yyt-form-hint">\u6682\u65E0\u81EA\u52A8\u5316\u4E8B\u52A1\u8BB0\u5F55\u3002</div>';return`
      <div class="yyt-settings-tab-content yyt-active" data-tab="executor">
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-layer-group"></i></span>\u5E76\u53D1\u63A7\u5236</div>
          <div class="yyt-form-group">
            <label>\u6700\u5927\u5E76\u53D1\u6570</label>
            <div class="yyt-form-hint">\u540C\u65F6\u6267\u884C\u7684\u5DE5\u5177\u6570\u91CF\u4E0A\u9650</div>
            <input type="number" class="yyt-input" id="yyt-setting-maxConcurrent"
                   value="${t.maxConcurrent}" min="1" max="10">
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-rotate-right"></i></span>\u91CD\u8BD5\u7B56\u7565</div>
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

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-clock"></i></span>\u8D85\u65F6\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label>\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4 (ms)</label>
            <div class="yyt-form-hint">\u5355\u4E2A\u8BF7\u6C42\u7684\u8D85\u65F6\u65F6\u95F4,\u8D85\u8FC7\u5C06\u81EA\u52A8\u4E2D\u65AD</div>
            <input type="number" class="yyt-input" id="yyt-setting-requestTimeoutMs"
                   value="${t.requestTimeoutMs}" min="10000" max="300000" step="10000">
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-list-ol"></i></span>\u961F\u5217\u7B56\u7565</div>
          <div class="yyt-form-group">
            <label>\u961F\u5217\u5904\u7406\u65B9\u5F0F</label>
            <select class="yyt-select" id="yyt-setting-queueStrategy">
              <option value="fifo" ${t.queueStrategy==="fifo"?"selected":""}>FIFO (\u5148\u8FDB\u5148\u51FA)</option>
              <option value="lifo" ${t.queueStrategy==="lifo"?"selected":""}>LIFO (\u540E\u8FDB\u5148\u51FA)</option>
              <option value="priority" ${t.queueStrategy==="priority"?"selected":""}>\u4F18\u5148\u7EA7\u6392\u5E8F</option>
            </select>
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-bolt"></i></span>\u81EA\u52A8\u89E6\u53D1\u8282\u6D41</div>
          <div class="yyt-form-hint">\u7531 output_mode \u51B3\u5B9A\u54EA\u4E9B\u5DE5\u5177\u81EA\u52A8\u89E6\u53D1(post_response_api / local_transform \u81EA\u52A8,follow_ai \u624B\u52A8)\u3002\u8FD9\u91CC\u53EA\u63A7\u5236\u8282\u6D41\u65F6\u95F4\u3002</div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-automationSettleMs"
                     value="${e.settleMs??1200}" min="0" max="10000" step="100">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u81EA\u52A8\u5316\u51B7\u5374\u65F6\u95F4 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-automationCooldownMs"
                     value="${e.cooldownMs??5e3}" min="0" max="60000" step="100">
            </div>
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-stethoscope"></i></span>\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD</div>
          <div class="yyt-settings-runtime-grid">
            <div class="yyt-settings-runtime-chip ${r?.enabled?"is-on":"is-off"}">\u670D\u52A1 ${r?.enabled?"\u8FD0\u884C\u4E2D":"\u672A\u542F\u7528"}</div>
            <div class="yyt-settings-runtime-chip ${n.initialized?"is-on":"is-off"}">\u76D1\u542C ${n.initialized?"\u5DF2\u7ED1\u5B9A":"\u672A\u7ED1\u5B9A"}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u5F85\u5904\u7406 ${r?.pendingTimerCount||0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u6392\u961F\u69FD\u4F4D ${r?.queuedSlotCount||0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u4E8B\u52A1 ${s.length}</div>
          </div>
          <div class="yyt-form-hint">\u4E8B\u4EF6\u6E90:<code>${n.source||"unavailable"}</code>;\u4E8B\u4EF6:<code>${o}</code></div>
          ${n.lastError?`<div class="yyt-form-hint">\u6700\u8FD1\u9519\u8BEF:<code>${n.lastError}</code></div>`:""}
          <div class="yyt-list-table">${a}</div>
        </div>
      </div>
    `},_renderDebugTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-file-lines"></i></span>\u65E5\u5FD7\u7EA7\u522B</div>
          <div class="yyt-form-group">
            ${ho({id:"yyt-setting-enableDebugLog",checked:t.enableDebugLog,title:"\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7",hint:"\u5F00\u542F\u540E Logger \u9762\u677F\u5C06\u8BB0\u5F55 DEBUG \u7EA7\u522B\u65E5\u5FD7\uFF0C\u5173\u95ED\u4EC5\u8BB0\u5F55 INFO \u53CA\u4EE5\u4E0A"})}
          </div>
          <div class="yyt-settings-hint" style="margin-top: 8px;">
            <i class="fa-solid fa-terminal"></i> \u5728\u300C\u65E5\u5FD7\u300D\u9762\u677F\u4E2D\u67E5\u770B\u3001\u641C\u7D22\u548C\u5BFC\u51FA\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-clock-rotate-left"></i></span>\u6267\u884C\u8BB0\u5F55</div>
          <div class="yyt-form-group">
            ${ho({id:"yyt-setting-saveExecutionHistory",checked:t.saveExecutionHistory,title:"\u4FDD\u5B58\u6267\u884C\u5386\u53F2",hint:"\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5"})}
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-eye"></i></span>UI \u663E\u793A</div>
          <div class="yyt-form-group">
            ${ho({id:"yyt-setting-showRuntimeBadge",checked:t.showRuntimeBadge,title:"\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0",hint:"\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668"})}
          </div>
        </div>
      </div>
    `},_renderUiTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="ui">
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-palette"></i></span>\u5916\u89C2\u8BBE\u7F6E</div>
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
            ${ho({id:"yyt-setting-compactMode",checked:t.compactMode,title:"\u7D27\u51D1\u6A21\u5F0F",hint:"\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9"})}
          </div>

          <div class="yyt-form-group">
            ${ho({id:"yyt-setting-animationEnabled",checked:t.animationEnabled,title:"\u542F\u7528\u52A8\u753B\u6548\u679C",hint:"\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B"})}
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-code"></i></span>\u6A21\u677F\u5B8F\u8BF4\u660E</div>
          <div class="yyt-form-hint">\u5DE5\u5177\u6A21\u677F\u91CC\u53EF\u76F4\u63A5\u4F7F\u7528\u4E0B\u9762\u8FD9\u4E9B\u5B8F\u3002\u4E16\u754C\u4E66\u5185\u5BB9\u53EA\u6709\u5728\u6A21\u677F\u91CC\u663E\u5F0F\u5199\u5165 <code>{{toolWorldbookContent}}</code> \u65F6\u624D\u4F1A\u6CE8\u5165\u3002</div>
          <div class="yyt-list-table">
            ${this._renderMacroList()}
          </div>
        </div>
      </div>
    `},_renderMacroList(){return Kt.getAvailableVariables().map(t=>`
        <div class="yyt-list-row">
          <code>${t.name}</code>
          <span>${t.description}</span>
        </div>
      `).join("")},bindEvents(t){let e=Q();if(!e||!ge(t))return;let r=this;t.off(".yytSettings"),t.on("click.yytSettings",".yyt-settings-tab",n=>{let o=e(n.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),e(n.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${o}"]`).addClass("yyt-active")}),t.on("click.yytSettings","#yyt-settings-save",()=>{r._saveSettings(t)}),t.on("click.yytSettings","#yyt-settings-reset",async()=>{await pr("\u91CD\u7F6E\u8BBE\u7F6E","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F",{danger:!0})&&(Bt.resetSettings(),ac(po.ui,bo()),r.renderTo(t),C("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}),Nt(t,{namespace:"yytSettingsSelect",selectors:["#yyt-setting-queueStrategy","#yyt-setting-theme"]});let s=Bt.getDebugSettings();I.setLevel(s.enableDebugLog?le.DEBUG:le.INFO)},_saveSettings(t){let e=Q(),r=[{id:"yyt-setting-maxConcurrent",min:1,max:10,label:"\u6700\u5927\u5E76\u53D1\u6570"},{id:"yyt-setting-maxRetries",min:0,max:10,label:"\u6700\u5927\u91CD\u8BD5\u6B21\u6570"},{id:"yyt-setting-retryDelayMs",min:1e3,max:6e4,label:"\u91CD\u8BD5\u95F4\u9694"},{id:"yyt-setting-requestTimeoutMs",min:1e4,max:3e5,label:"\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4"},{id:"yyt-setting-automationSettleMs",min:0,max:1e4,label:"\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4"},{id:"yyt-setting-automationCooldownMs",min:0,max:6e4,label:"\u81EA\u52A8\u5316\u51B7\u5374\u65F6\u95F4"}];for(let n of r){let o=t.find(`#${n.id}`),a=o.val(),i=parseInt(a,10);if(isNaN(i)||i<n.min||i>n.max){C("warning",`${n.label} \u987B\u5728 ${n.min} ~ ${n.max} \u4E4B\u95F4`),o.trigger("focus").trigger("select");return}}let s={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val(),10)||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val(),10)||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val(),10)||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val(),10)||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},automation:{settleMs:parseInt(t.find("#yyt-setting-automationSettleMs").val(),10)||1200,cooldownMs:parseInt(t.find("#yyt-setting-automationCooldownMs").val(),10)||5e3,maxConcurrentSlots:Bt.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};Bt.saveSettings(s),I.setLevel(s.debug.enableDebugLog?le.DEBUG:le.INFO),ac(s.ui,bo()),C("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},_getAutomationRuntime(){try{return bf()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},destroy(t){!Q()||!ge(t)||(ct(t,"yytSettingsSelect"),t.off(".yytSettings"))},getStyles(){return`
      /* \u8BBE\u7F6E\u9762\u677F\u6837\u5F0F */
      .yyt-settings-panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 14px;
      }

      .yyt-settings-hero {
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 0;
        border-radius: 0;
        border: none;
        background: transparent;
        box-shadow: none;
      }

      .yyt-settings-hero-copy {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 0;
      }

      .yyt-settings-hero-title {
        font-size: 18px;
        font-weight: 700;
        line-height: 1.15;
        color: var(--yyt-text);
      }

      .yyt-settings-hero-desc {
        font-size: 13px;
        line-height: 1.75;
        color: var(--yyt-text-secondary);
        max-width: 62ch;
      }

      .yyt-settings-hero-status {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: flex-end;
      }

      .yyt-settings-status-chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 10px;
        font-weight: 800;
        border: 1px solid var(--yyt-border-strong);
        letter-spacing: 0.4px;
        color: var(--yyt-text);
        background: var(--yyt-surface-3);
        box-shadow: none;
      }

      .yyt-settings-status-chip.is-on {
        color: #4ade80;
        border-color: rgba(74, 222, 128, 0.25);
        background: rgba(74, 222, 128, 0.12);
      }

      .yyt-settings-status-chip.is-off {
        color: #f87171;
        border-color: rgba(248, 113, 113, 0.25);
        background: rgba(248, 113, 113, 0.12);
      }

      .yyt-settings-status-chip.is-neutral {
        color: var(--yyt-text);
      }

      .yyt-settings-tabs {
        display: flex;
        gap: 6px;
        padding: 5px;
        border-radius: var(--yyt-radius);
        background: var(--yyt-surface-2);
        border: 1px solid var(--yyt-border);
        width: fit-content;
        max-width: 100%;
        flex-wrap: wrap;
        box-shadow: none;
      }

      .yyt-settings-tab {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        border-radius: var(--yyt-radius-sm);
        border: 1px solid transparent;
        background: transparent;
        color: var(--yyt-text-secondary);
        cursor: pointer;
        transition: all 0.18s ease;
        font-weight: 600;
        box-shadow: none;
      }

      .yyt-settings-tab:hover {
        color: var(--yyt-text);
        background: var(--yyt-surface-3);
        border-color: transparent;
      }

      .yyt-settings-tab.yyt-active {
        color: var(--yyt-on-accent);
        background: var(--yyt-accent);
        border-color: transparent;
        box-shadow: none;
      }

      .yyt-settings-content {
        flex: 1;
        overflow-y: auto;
        padding-right: 4px;
      }

      .yyt-settings-content .yyt-form-group {
        gap: 12px;
      }

      .yyt-settings-tab-content {
        display: none;
        flex-direction: column;
        gap: 14px;
      }

      .yyt-settings-tab-content.yyt-active {
        display: flex;
      }

      .yyt-settings-footer {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        padding-top: 2px;
      }

      .yyt-settings-runtime-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 14px;
      }

      .yyt-settings-runtime-chip {
        display: inline-flex;
        align-items: center;
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 800;
        border: 1px solid var(--yyt-border-strong);
        background: var(--yyt-surface-3);
        color: var(--yyt-text);
        box-shadow: none;
      }

      .yyt-settings-runtime-chip.is-on {
        color: #4ade80;
        border-color: rgba(74, 222, 128, 0.25);
        background: rgba(74, 222, 128, 0.12);
      }

      .yyt-settings-runtime-chip.is-off {
        color: #f87171;
        border-color: rgba(248, 113, 113, 0.25);
        background: rgba(248, 113, 113, 0.12);
      }

      .yyt-settings-runtime-chip.is-neutral {
        color: var(--yyt-text);
      }

      .yyt-settings-runtime-meta {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        font-size: 11px;
        color: var(--yyt-text-secondary);
      }

      .yyt-settings-runtime-main {
        font-size: 12px;
        color: var(--yyt-text);
        line-height: 1.7;
        word-break: break-word;
      }

      /* settings-specific macro/runtime row layout (2-column grid) */
      .yyt-settings-panel .yyt-list-table {
        display: flex;
        flex-direction: column;
        border: none;
        border-radius: 0;
        overflow: visible;
      }

      .yyt-settings-panel .yyt-list-row {
        display: grid;
        grid-template-columns: minmax(180px, 240px) minmax(0, 1fr);
        gap: 14px;
        align-items: start;
        padding: 14px 0;
        background: transparent;
        border-bottom: 1px solid var(--yyt-border);
      }

      .yyt-settings-panel .yyt-list-row:last-child {
        border-bottom: none;
      }

      .yyt-settings-panel .yyt-list-row:hover {
        background: transparent;
      }

      .yyt-settings-panel .yyt-list-row code {
        color: var(--yyt-accent-strong);
        word-break: break-word;
        font-weight: 800;
      }

      .yyt-settings-panel .yyt-list-row span {
        color: var(--yyt-text-secondary);
        font-size: 12px;
        line-height: 1.7;
      }

      .yyt-settings-panel .yyt-list-row:has(.yyt-settings-runtime-meta) {
        grid-template-columns: 1fr;
      }
    `},renderTo(t){t.html(this.render({})),this.bindEvents(t,{})}},cv=vf});function dv(t={},e=-1){return[t?.sourceId,t?.messageId,t?.message_id,t?.id,t?.mid,t?.mesid,t?.mes_id,t?.chat_index,t?.index,e].map(r=>be(r))}function uv(t=[],e=""){let r=be(e);if(!r||!Array.isArray(t))return-1;for(let s=t.length-1;s>=0;s-=1){let n=t[s];if(dv(n,s).includes(r))return s}return-1}function xo(t={},e={}){let r=be(t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId);if(!r)return null;let s=ll({resolvedAt:Date.now(),runSource:e.runSource||t?.runSource||Qe.MANUAL,traceId:t?.traceId||"",chatId:t?.chatId||"",sourceMessageId:r,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId||"swipe:current",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",assistantContentFingerprint:t?.assistantContentFingerprint||"",assistantBaseFingerprint:t?.assistantBaseFingerprint||"",assistantText:t?.lastAiMessage||"",assistantBaseText:t?.assistantBaseText||"",targetMessageIndex:uv(t?.chatMessages||t?.chatHistory||[],r)});return!s.slotBindingKey||!s.slotRevisionKey?null:s}async function cc({runSource:t=Qe.MANUAL}={}){let e=await us({runSource:t});return xo(e,{runSource:t})}async function pv({messageId:t,swipeId:e="",runSource:r=Qe.AUTO}={}){let s=await ps({messageId:t,swipeId:e,runSource:r});return xo(s,{runSource:r})}async function Tf(t=null,e={}){let r=t||null;if(typeof e.resolveTarget=="function")return await e.resolveTarget(r);let s=be(e.runSource||r?.runSource)||Qe.MANUAL,n=be(e.messageId||r?.sourceMessageId),o=be(e.swipeId||r?.sourceSwipeId||r?.effectiveSwipeId);return e.useMessageTarget===!0||s===Qe.AUTO?n?pv({messageId:n,swipeId:o,runSource:s}):null:cc({runSource:s})}function Sf(t,e){let r=t||null,s=e||null;return!r||!s?{valid:!1,reason:"missing_target_snapshot"}:be(r.sourceMessageId)!==be(s.sourceMessageId)?{valid:!1,reason:"source_message_changed"}:be(r.sourceSwipeId||r.effectiveSwipeId)!==be(s.sourceSwipeId||s.effectiveSwipeId)?{valid:!1,reason:"source_swipe_changed"}:be(r.slotRevisionKey)!==be(s.slotRevisionKey)?{valid:!1,reason:"slot_revision_changed"}:{valid:!0,reason:"ok"}}var Ua=D(()=>{ys();je()});function _r(t,e=""){return t==null?e:String(t).trim()||e}function yv(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function fv(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function _f(t,e){if(!t)return null;let r=t[ws];if(!r)return null;let s=Ee(e);return fv(r)?s===Lt?r:null:r[s]||null}function wo({loadMode:t=vs.EMPTY,mergeBaseOnly:e=!1,state:r=null,sourceKind:s=St.EMPTY,resolvedFromMessageId:n="",resolvedFromRevisionKey:o=""}={}){let a=xr(r)||null;return{loadMode:t,mergeBaseOnly:e,state:a,sourceKind:s,resolvedFromMessageId:_r(n,a?.sourceMessageId||""),resolvedFromRevisionKey:_r(o,a?.slotRevisionKey||"")}}function dc(t,e={}){let r=xr(t);return r?xr({...r,meta:{...r.meta||{},...e||{}}}):null}function Ef({runtime:t,targetSnapshot:e,currentMessageIndex:r=-1,templateTables:s=[],isolationKey:n}={}){let o=Array.isArray(t?.chat)?t.chat:[],a=_r(e?.slotRevisionKey,""),i=_r(e?.slotBindingKey,""),l=Ee(n===void 0?"":n);if(r>=0&&r<o.length){let c=_f(o[r],l),d=xr(c);if(d&&_r(d.slotRevisionKey,"")===a)return wo({loadMode:vs.EXACT,mergeBaseOnly:!1,state:dc(d,{sourceKind:St.EXACT,isolationKey:l,resolvedFromMessageId:d.sourceMessageId,resolvedFromRevisionKey:d.slotRevisionKey}),sourceKind:St.EXACT,resolvedFromMessageId:d.sourceMessageId,resolvedFromRevisionKey:d.slotRevisionKey});if(d&&_r(d.slotBindingKey,"")===i){let u=dc({...d,slotRevisionKey:a||d.slotRevisionKey,sourceSwipeId:_r(e?.sourceSwipeId||e?.effectiveSwipeId,d.sourceSwipeId),meta:{...d.meta||{},sourceKind:St.BINDING,mergeBaseOnly:!0,fallbackFromBinding:!0,isolationKey:l,fallbackFromRevisionKey:_r(d.slotRevisionKey,""),requestedRevisionKey:a,resolvedFromMessageId:d.sourceMessageId,resolvedFromRevisionKey:d.slotRevisionKey}});return wo({loadMode:vs.BINDING_FALLBACK,mergeBaseOnly:!0,state:u,sourceKind:St.BINDING,resolvedFromMessageId:d.sourceMessageId,resolvedFromRevisionKey:d.slotRevisionKey})}}if(r>0)for(let c=r-1;c>=0;c-=1){let d=o[c];if(!yv(d))continue;let u=_f(d,l),y=xr(u);if(!y||!Array.isArray(y.tables)||y.tables.length===0)continue;let p=dc({...y,slotBindingKey:i||y.slotBindingKey,slotRevisionKey:a||y.slotRevisionKey,sourceSwipeId:_r(e?.sourceSwipeId||e?.effectiveSwipeId,y.sourceSwipeId),meta:{...y.meta||{},sourceKind:St.HISTORY,mergeBaseOnly:!0,reconstructedFromHistory:!0,isolationKey:l,resolvedFromMessageId:y.sourceMessageId,resolvedFromRevisionKey:y.slotRevisionKey}});return wo({loadMode:vs.HISTORY,mergeBaseOnly:!0,state:p,sourceKind:St.HISTORY,resolvedFromMessageId:y.sourceMessageId,resolvedFromRevisionKey:y.slotRevisionKey})}return Array.isArray(s)&&s.length>0?wo({loadMode:vs.TEMPLATE,mergeBaseOnly:!1,state:Zn(e,{tables:ae(s),meta:{fromTemplate:!0,isolationKey:l,sourceKind:St.TEMPLATE,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:St.TEMPLATE}):wo({loadMode:vs.EMPTY,mergeBaseOnly:!1,state:Zn(e,{meta:{isolationKey:l,sourceKind:St.EMPTY,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:St.EMPTY})}var Af=D(()=>{je()});function Cf(){return uc||(uc=I.createScope("TableStateMirror")),uc}async function gv(t,e,r){try{await ze(),await ba({chatId:t?.chatId,messageId:t?.sourceMessageId,swipeId:t?.sourceSwipeId||t?.effectiveSwipeId,isolationKey:e},Array.isArray(r)?r:[]),Cf().info("slot \u5DF2\u955C\u50CF\u5230 SQL",{chatId:t?.chatId,messageId:t?.sourceMessageId,tableCount:r?.length||0})}catch(s){Cf().warn("SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:s?.message||String(s)})}}function kf(t){return t==null?"":String(t).trim()}function mv(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function yc(){try{let t=mv(),e=t?.SillyTavern||null,r=e?.getContext?.()||null,s=Array.isArray(r?.chat)?r.chat:[],n=Array.isArray(e?.chat)?e.chat:[],o=s.length?s:n;return{topWindow:t,api:e,context:r,chat:o,contextChat:s,apiChat:n}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}function hv(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function bv(t=[],e=""){let r=kf(e);if(!Array.isArray(t)||!r)return-1;for(let s=t.length-1;s>=0;s-=1){let n=t[s];if(!hv(n))continue;if([n?.sourceId,n?.message_id,n?.messageId,n?.id,n?.mes_id,n?.mid,n?.mesid,n?.chat_index,n?.index,s].map(a=>kf(a)).includes(r))return s}return-1}function fc(t){let e=yc(),r=bv(e.chat,t?.sourceMessageId);return r<0?{runtime:e,messageIndex:r,message:null}:{runtime:e,messageIndex:r,message:e.chat[r]||null}}function Wa(t,e,r){let s=n=>{!Array.isArray(n)||e<0||e>=n.length||(n[e]={...n[e]||{},...r})};s(t?.contextChat),s(t?.apiChat)}async function Ha(t){let e=t?.context||null,r=t?.api||null,s=e?.saveChatDebounced||r?.saveChatDebounced||null,n=e?.saveChat||r?.saveChat||null;typeof s=="function"&&s.call(e||r),typeof n=="function"&&await n.call(e||r)}function Ya(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function Ns(t){return!t||typeof t!="object"||Array.isArray(t)?!1:"lastResolvedTarget"in t||"lastCommittedTarget"in t}function ja(t,e,r,s){if(!t)return null;let n=t[e];if(!n)return null;let o=Ee(r);return typeof s=="function"&&s(n)?o===Lt?n:null:n[o]||null}function pc(t,e,r,s,n){if(!t)return;let o=Ee(r),a=t[e];if(typeof n=="function"&&n(a)){let i={[Lt]:a};i[o]=s,t[e]=i}else a&&typeof a=="object"&&!Array.isArray(a)?t[e]={...a,[o]:s}:t[e]={[o]:s}}function Fa(t,e,r,s){if(!t)return!1;let n=Ee(r),o=t[e];if(!o)return!1;if(typeof s=="function"&&s(o))return n===Lt?(delete t[e],!0):!1;if(o&&typeof o=="object"&&!Array.isArray(o)){if(o[n]===void 0)return!1;let a={...o};return delete a[n],Object.keys(a).length===0?delete t[e]:t[e]=a,!0}return!1}function If(t,e={}){let{runtime:r,messageIndex:s}=fc(t);return Ef({runtime:r,targetSnapshot:t,currentMessageIndex:s,templateTables:Array.isArray(e.templateTables)?e.templateTables:[],isolationKey:e.isolationKey===void 0?Ie.getKey():e.isolationKey})}async function Mf(t,e={}){let{runtime:r,messageIndex:s,message:n}=fc(t);if(!n||s<0)return{success:!1,error:"target_message_not_found"};let o=e.isolationKey===void 0?Ie.getKey():e.isolationKey,a=ja(n,Kr,o,Ns),i={...oa(a),lastResolvedTarget:rn(t),updatedAt:Date.now()};return pc(n,Kr,o,i,Ns),Wa(r,s,n),await Ha(r),{success:!0,bindings:i}}async function Ga(t,e,r={}){let s=r.skipFreshValidation===!0?t:await Tf(t,r),n=r.skipFreshValidation===!0?{valid:!0,reason:"skipped"}:Sf(t,s);if(!n.valid)return{success:!1,error:"target_changed_before_commit",validation:n};let o=s||t,{runtime:a,messageIndex:i,message:l}=fc(o);if(!l||i<0)return{success:!1,error:"target_message_not_found",validation:n};let c=r.isolationKey===void 0?Ie.getKey():r.isolationKey,d=Zn(o),u={...d.meta||{},...e.meta||{},...r.locks?{locks:r.locks}:{},...r.previousSnapshot?{previousSnapshot:r.previousSnapshot}:{},isolationKey:c},y=xr({...d,...e,meta:u,slotBindingKey:o.slotBindingKey,slotRevisionKey:o.slotRevisionKey,sourceMessageId:o.sourceMessageId,sourceSwipeId:o.sourceSwipeId||o.effectiveSwipeId,updatedAt:Date.now()}),p=ja(l,Kr,c,Ns),f={...oa(p),lastResolvedTarget:rn(o),lastCommittedTarget:rn(o),updatedAt:Date.now()};return pc(l,ws,c,y,Ya),pc(l,Kr,c,f,Ns),Wa(a,i,l),await Ha(a),gv(o,c,y?.tables||[]).catch(()=>{}),{success:!0,state:y,bindings:f,validation:n,messageIndex:i,sourceMessageId:o.sourceMessageId,slotRevisionKey:o.slotRevisionKey}}function Ds(t=null,e={}){let r=Ct.getAssistantMessageSnapshot(t);if(!r?.message)return null;let s=e.isolationKey===void 0?Ie.getKey():e.isolationKey;return{...r,tableState:xr(ja(r.message,ws,s,Ya)),tableBindings:oa(ja(r.message,Kr,s,Ns))}}async function Rf(t,e={}){let r=yc();if(!Array.isArray(r.chat)||t<0||t>=r.chat.length)return{success:!1,error:"invalid_message_index",messageIndex:t};let s=r.chat[t];if(!s)return{success:!1,error:"message_not_found",messageIndex:t};let n=e.isolationKey===void 0?Ie.getKey():e.isolationKey,o=Fa(s,ws,n,Ya),a=e.clearBindings===!1?!1:Fa(s,Kr,n,Ns);return(o||a)&&(Wa(r,t,s),await Ha(r)),{success:!0,cleared:o||a,messageIndex:t,isolationKey:n}}async function Pf(t={}){let e=yc(),r=Number.isFinite(t.fromMessageIndex)?t.fromMessageIndex:0,s=Number.isFinite(t.toMessageIndex)?t.toMessageIndex:(e.chat?.length||0)-1,n=t.isolationKey===void 0?Ie.getKey():t.isolationKey,o=0;for(let a=r;a<=s;a++){let i=e.chat[a];if(!i)continue;let l=Fa(i,ws,n,Ya),c=Fa(i,Kr,n,Ns);(l||c)&&(Wa(e,a,i),o++)}return o>0&&await Ha(e),{success:!0,touched:o,from:r,to:s,isolationKey:n}}var uc,vo=D(()=>{ks();je();Ss();Af();Ua();Dl();W()});function Df(t){let e=new Set;if(!Array.isArray(t))return e;for(let r of t){let s=r?.order;Number.isFinite(s)&&e.add(Math.floor(s))}return e}function gc(t,e=5e4,r=1,s=99999){for(let n=e;n<=s;n++)if(!t.has(n))return t.add(n),n;for(let n=r;n<e;n++)if(!t.has(n))return t.add(n),n;return Nf.warn("\u65E0\u53EF\u7528 order \u69FD\u4F4D"),t.add(e),e}function $f(t,e,r=5e4,s=1,n=99999){let o=n-e+1;for(let a=r;a<=o;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}for(let a=s;a<r&&a<=o;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}Nf.warn(`\u65E0\u6CD5\u5206\u914D ${e} \u4E2A\u8FDE\u7EED order \u69FD\u4F4D`);for(let a=0;a<e;a++)t.add(r+a);return r}var Nf,Lf=D(()=>{W();Nf=I.createScope("TableWBOrder")});function mc(t,e="before_character_definition"){let r=String(t||"").trim().toLowerCase();return r==="at_depth_as_system"||r==="system"?"at_depth_as_system":r==="before_char"||r==="before_character"||r==="before_character_definition"||r==="0"?"before_character_definition":r==="after_char"||r==="after_character"||r==="after_character_definition"||r==="1"?"after_character_definition":e}function To(t,e){if(!e)return t;let r={...t,position:e.position};return e.position==="at_depth_as_system"?r.depth=e.depth:delete r.depth,r}var h1,b1,Of=D(()=>{h1=Object.freeze(["at_depth_as_system","before_character_definition","after_character_definition"]);b1=Object.freeze({position:"before_character_definition",depth:2,order:5e4})});function hc(t,e=""){return t==null?e:String(t).trim()||e}function vv(t){return hc(t,"default_chat").replace(/[\[\]=]/g,"_")}function Tv(){let t=globalThis.window||globalThis;return hc(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function Sv(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return $r()?.TavernHelper||null}function _v(t){return String(t??"").replace(/\|/g,"\uFF5C").replace(/\n/g," ")}function Bf(t){let e=Array.isArray(t.columns)?t.columns:[],r=Array.isArray(t.rows)?t.rows:[];if(r.length===0)return"";let s=e.map(l=>l.key),n=e.map(l=>l.title||l.key),o=`| ${n.join(" | ")} |`,a=`| ${n.map(()=>"---").join(" | ")} |`,i=r.map(l=>{let c=l.cells||{};return`| ${s.map(d=>_v(c[d])).join(" | ")} |`});return`# ${t.name||"\u672A\u547D\u540D\u8868"}

${o}
${a}
${i.join(`
`)}`}function Ev(t,e){if(!Array.isArray(t)||t.length===0)return[];let r=new Map;if(Array.isArray(e))for(let s of e){let n=s?.id||s?.key;n&&r.set(n,s)}return t.map(s=>{let n=s?.id?r.get(s.id):null;return{...s,exportConfig:s?.exportConfig||n?.exportConfig||{enabled:!1},enabled:s?.enabled!==!1}})}function qa(t){return`${Kf}${xv}${vv(t)}${wv}-`}function Av(t){return`${Kf}[${hc(t,"default_chat")}]-`}function Uf(t,e){if(!t||typeof t!="string")return!1;let r=qa(e);if(t.startsWith(r))return!0;let s=Av(e);return!!t.startsWith(s)}function Cv(t,e){let r=qa(t),s=String(e||"").trim();return s?`${r}${s}`:`${r}\u586B\u8868\u6570\u636E`}function zf(t,e,r){return`${qa(t)}Wrapper-${r}`}function kv(t,e){return t?t.content!==e.content||t.enabled!==e.enabled||t.type!==e.type||t.position!==e.position||t.prevent_recursion!==e.prevent_recursion||t.order!==e.order:!0}async function So(t,e,r,s,n,o,a){let i=r.find(l=>l.comment===s);return i&&a&&!Uf(i.comment,a)?(_n.warn(`upsert \u8DF3\u8FC7\uFF1A\u73B0\u6709\u6761\u76EE comment "${s}" \u4E0D\u5C5E\u4E8E\u5F53\u524D chat`,{chatId:a}),{action:"skipped",comment:s,reason:"cross_chat_collision"}):i&&i.uid?kv(i,n)?(await Promise.resolve(t.setLorebookEntries(e,[{uid:i.uid,...n}])),_n.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u66F4\u65B0\uFF1A${s}`),{action:"updated",comment:s}):(o.add(i.order||0),{action:"skipped",comment:s}):typeof t.createLorebookEntries=="function"?(await Promise.resolve(t.createLorebookEntries(e,[{comment:s,keys:[],...n}])),_n.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u521B\u5EFA\uFF1A${s}`),{action:"created",comment:s}):{action:"failed",comment:s,error:"createLorebookEntries \u4E0D\u53EF\u7528"}}async function jf(t,e){let r=e?.worldbookSync;if(!r?.enabled)return{skipped:!0,reason:"disabled"};let s=String(r.targetBook||"").trim();if(!s)return{skipped:!0,reason:"no_target_book"};let n=Sv();if(!n)return{success:!1,error:"TavernHelper \u4E0D\u53EF\u7528"};if(typeof n.getLorebookEntries!="function")return{success:!1,error:"getLorebookEntries \u4E0D\u53EF\u7528"};if(typeof n.setLorebookEntries!="function"&&typeof n.createLorebookEntries!="function")return{success:!1,error:"\u4E16\u754C\u4E66\u5199\u5165 API \u4E0D\u53EF\u7528"};let o=Tv(),a=qa(o),i=Array.isArray(e?.tables)?e.tables:[],c=Ev(t,i).filter(y=>y&&y.enabled!==!1&&Array.isArray(y.rows)&&y.rows.length>0);if(c.length===0)return{skipped:!0,reason:"empty_tables"};let d=e?.wrapperConfig||{},u=d.enabled!==!1;try{let y=await Promise.resolve(n.getLorebookEntries(s));Array.isArray(y)||(y=[]);let p=Df(y),f=[],g=c.filter(_=>_.exportConfig?.enabled===!0),h=c.filter(_=>_.exportConfig?.enabled!==!0),x="";if(h.length>0&&(x=h.map(_=>Bf(_)).join(`

`)),u&&(x||g.length>0)){let _=d.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",A=d.wrapperHint||"",F=d.wrapperPlacement||{},H=F.order||5e4,R=$f(p,3,H,1,99999),S=mc(F.position,"before_character_definition"),U=Number.isFinite(F.depth)?F.depth:2,V=`<${_}>
${A}`;f.push(await So(n,s,y,zf(o,_,"Start"),To({content:V,enabled:!0,type:"constant",order:R,prevent_recursion:!0},{position:S,depth:U}),p,o)),x&&f.push(await So(n,s,y,`${a}\u5168\u5C40\u6570\u636E`,To({content:x,enabled:!0,type:"constant",order:R+1,prevent_recursion:!0},{position:S,depth:U}),p,o)),f.push(await So(n,s,y,zf(o,_,"End"),To({content:`</${_}>`,enabled:!0,type:"constant",order:R+2,prevent_recursion:!0},{position:S,depth:U}),p,o))}else if(x){let _=gc(p,5e4,1,99999);f.push(await So(n,s,y,`${a}\u5168\u5C40\u6570\u636E`,{content:x,enabled:!0,type:"constant",position:"before_character_definition",order:_,prevent_recursion:!0},p,o))}for(let _ of g){let A=_.exportConfig||{},F=A.entryName||_.name||"\u672A\u547D\u540D\u8868",H=Cv(o,F),R=Bf(_);if(!R)continue;let S=A.entryPlacement||{},U=mc(S.position,"before_character_definition"),V=gc(p,S.order||5e4,1,99999),fe=A.entryType==="keyword"?"keyword":"constant";f.push(await So(n,s,y,H,To({content:R,enabled:!0,type:fe,order:V,prevent_recursion:A.preventRecursion!==!1},{position:U,depth:S.depth||2}),p,o))}let v=new Set(f.map(_=>_.comment).filter(Boolean)),T=y.filter(_=>!_.comment||!Uf(_.comment,o)?!1:!v.has(_.comment));if(T.length>0){let _=T.map(A=>A.uid).filter(Boolean);_.length>0&&typeof n.deleteLorebookEntries=="function"&&(await Promise.resolve(n.deleteLorebookEntries(s,_)),_n.info(`\u5DF2\u6E05\u7406 ${_.length} \u4E2A\u65E7\u4E16\u754C\u4E66\u6761\u76EE [${o}]`))}let L=f.filter(_=>_.action==="created").length,M=f.filter(_=>_.action==="updated").length;return _n.info(`\u4E16\u754C\u4E66\u540C\u6B65\u5B8C\u6210 [${o}]\uFF1A${L} \u521B\u5EFA, ${M} \u66F4\u65B0, ${T.length} \u6E05\u7406`),{success:!0,results:f,stats:{created:L,updated:M,cleaned:T.length},targetBook:s,chatId:o}}catch(y){return _n.warn("\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25:",y),{success:!1,error:y?.message||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25"}}}var _n,Kf,xv,wv,Ff=D(()=>{ys();W();Lf();Of();_n=I.createScope("TableWorldbookSync"),Kf="YYT-",xv="[YY:chatId=",wv="]"});function Va(t,e=""){return t==null?e:String(t).trim()||e}function Mv(t={}){return{tables:Array.isArray(t?.tables)?ae(t.tables):[]}}function Rv(t={},e={}){let r=Va(e.mirrorTag,"yyt-table-workbench"),s=Mv(t);return[`<${r}>`,"[\u586B\u8868\u5DE5\u4F5C\u53F0]","```json",JSON.stringify(s,null,2),"```",`</${r}>`].join(`
`)}async function Wf({targetSnapshot:t,nextTables:e,config:r,loadResult:s=null,diff:n=null,fillMode:o="",skipNotify:a=!1}={}){let i=Ot(r),l=await Ga(t,{tables:Array.isArray(e)?ae(e):[],meta:{lastLoadMode:Va(s?.loadMode,""),lastFillMode:Va(o),mergeBaseOnly:!1,updatedBy:Va(t?.runSource,"MANUAL_TABLE")}});if(!l?.success)return{success:!1,error:l?.error||"table_state_commit_failed",commitResult:l,mirrorResult:null,warning:""};let c=null,d=null,u="";if(i.mirrorToMessage){let y=Rv(l.state,{mirrorTag:i.mirrorTag});c=await Ct.injectDetailed(Iv,y,{overwrite:!0,extractionSelectors:[i.mirrorTag],sourceMessageId:l.sourceMessageId,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId,effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId,slotBindingKey:t?.slotBindingKey,slotRevisionKey:t?.slotRevisionKey,slotTransactionId:t?.slotTransactionId,traceId:t?.traceId,skipNotify:a}),c?.success||(u=c?.error||"\u6B63\u6587\u955C\u50CF\u5199\u56DE\u5931\u8D25")}return i.worldbookSync?.enabled&&(d=await jf(Array.isArray(e)?e:[],i),d&&!d.success&&!d.skipped&&(u=u?`${u}; ${d.error}`:d.error||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25")),{success:!0,state:l.state,bindings:l.bindings,diff:n,fillMode:o,commitResult:l,mirrorResult:c,worldbookSyncResult:d,warning:u}}var Iv,Hf=D(()=>{ks();je();vo();rr();Ff();Iv="tableWorkbenchMirror"});function Pv(t){return typeof t!="string"||!t?t:t.replace(/[“”「」『』＂]/g,'"')}function bc(t,e){for(let r=e;r<t.length;r++)if(!/\s/.test(t[r]))return{char:t[r],index:r};return{char:"",index:-1}}function qf(t){return!!t&&(t==='"'||t==="{"||t==="["||t==="-"||/\d/.test(t)||t==="t"||t==="f"||t==="n")}function Nv(t,e,r,s){let n=bc(t,e+1),o=n.char;if(!o)return r!=="key";if(r==="key")return o===":";if(o==="}"||o==="]")return!0;if(o!==",")return!1;let a=bc(t,n.index+1).char;return a?s==="object"?a==='"'||a==="}":s==="array"?a==="]"||qf(a):qf(a)||a==="}"||a==="]":!0}function Dv(t){if(typeof t!="string")return{success:!1,result:t,error:"not a string"};let e="",r=!1,s=!1,n=null,o=[],a=()=>o.length?o[o.length-1]:null,i=()=>{let l=a();l&&(l.expecting="commaOrEnd")};for(let l=0;l<t.length;l++){let c=t[l];if(s){e+=c,s=!1;continue}if(r){if(c==="\\"){e+=c,s=!0;continue}if(c==='"'){let d=a();Nv(t,l,n,d?.type||null)?(e+=c,r=!1,n==="key"&&d?.type==="object"?d.expecting="colon":i(),n=null):e+='\\"';continue}e+=c;continue}if(c==='"'){e+=c,r=!0;let d=a();n=d&&d.type==="object"&&(d.expecting==="key"||d.expecting==="keyOrEnd")?"key":"value";continue}if(c==="{"){e+=c,o.push({type:"object",expecting:"keyOrEnd"});continue}if(c==="["){e+=c,o.push({type:"array",expecting:"valueOrEnd"});continue}if(c===":"){e+=c;let d=a();d?.type==="object"&&(d.expecting="value");continue}if(c===","){e+=c;let d=a();d?.type==="object"&&(d.expecting="key"),d?.type==="array"&&(d.expecting="value");continue}if(c==="}"||c==="]"){e+=c,o.pop(),i();continue}e+=c}return{success:!0,result:e,error:null}}function $v(t){if(typeof t!="string"||!t)return t;let e="",r=!1,s=!1;for(let n=0;n<t.length;n++){let o=t[n];if(s){e+=o,s=!1;continue}if(o==="\\"){e+=o,r&&(s=!0);continue}if(o==='"'){e+=o,r=!r;continue}if(r){if(o===`
`){e+="\\n";continue}if(o==="\r"){e+="\\r";continue}if(o==="	"){e+="\\t";continue}if(o==="\0"){e+="\\u0000";continue}}e+=o}return e}function Lv(t){if(typeof t!="string"||!t)return t;let e="",r=!1,s=!1;for(let n=0;n<t.length;n++){let o=t[n];if(s){e+=o,s=!1;continue}if(o==="\\"){e+=o,r&&(s=!0);continue}if(o==='"'){e+=o,r=!r;continue}if(!r&&o===","){let a=bc(t,n+1).char;if(a==="}"||a==="]")continue}e+=o}return e}function Ov(t){return typeof t!="string"||!t?t:t.replace(/([{,]\s*)(-?\d+)(\s*:)/g,'$1"$2"$3')}function _o(t){if(typeof t!="string")return{success:!1,result:t,layersApplied:[],error:"Input is not a string"};let e=[],r=t,s=Pv(r);s!==r&&e.push("normalizeQuotes"),r=s;let n=Dv(r);if(!n.success)return{success:!1,result:r,layersApplied:e,error:n.error};n.result!==r&&e.push("escapeUnescapedQuotes"),r=n.result;let o=$v(r);o!==r&&e.push("sanitizeControlChars"),r=o;let a=Lv(r);a!==r&&e.push("removeTrailingCommas"),r=a;let i=Ov(r);return i!==r&&e.push("fixNumericKeys"),r=i,{success:!0,result:r,layersApplied:e,error:null}}function Bv(t,e=","){if(typeof t!="string"||!t)return[];let r=[],s="",n=!1,o=!1,a=0,i=0,l=0;for(let c=0;c<t.length;c++){let d=t[c];if(o){s+=d,o=!1;continue}if(d==="\\"){s+=d,n&&(o=!0);continue}if(d==='"'){s+=d,n=!n;continue}if(!n){if(d==="{")a++;else if(d==="}")a=Math.max(0,a-1);else if(d==="[")i++;else if(d==="]")i=Math.max(0,i-1);else if(d==="(")l++;else if(d===")")l=Math.max(0,l-1);else if(d===e&&a===0&&i===0&&l===0){s.trim()&&r.push(s.trim()),s="";continue}}s+=d}return s.trim()&&r.push(s.trim()),r}function zv(t,e=":"){if(typeof t!="string"||!t)return-1;let r=!1,s=!1,n=0,o=0,a=0;for(let i=0;i<t.length;i++){let l=t[i];if(s){s=!1;continue}if(l==="\\"){r&&(s=!0);continue}if(l==='"'){r=!r;continue}if(!r){if(l==="{")n++;else if(l==="}")n=Math.max(0,n-1);else if(l==="[")o++;else if(l==="]")o=Math.max(0,o-1);else if(l==="(")a++;else if(l===")")a=Math.max(0,a-1);else if(l===e&&n===0&&o===0&&a===0)return i}}return-1}function xc(t){if(typeof t!="string")return{success:!0,value:t,error:null};let e=t.trim();if(!e)return{success:!1,value:null,error:"Empty value"};let s=`[${e.startsWith("'")&&e.endsWith("'")?`"${e.slice(1,-1).replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}"`:e}]`;try{return{success:!0,value:JSON.parse(s)[0],error:null}}catch(n){let o=_o(s);if(o.success)try{return{success:!0,value:JSON.parse(o.result)[0],error:null}}catch{}return{success:!1,value:null,error:n?.message||"Failed to parse loose value"}}}function Kv(t){let e=typeof t=="string"?t.trim():"";if(!e)return null;if(/^-?\d+$/.test(e))return e;let r=xc(e);return r.success&&(typeof r.value=="string"||typeof r.value=="number")?String(r.value):e.replace(/^["']|["']$/g,"")}function Vf(t){if(typeof t!="string")return{success:!1,result:null,recoveredKeys:[],error:"not a string"};let e=t.trim();if(!e.startsWith("{")||!e.endsWith("}"))return{success:!1,result:null,recoveredKeys:[],error:"not an object literal"};let r=e.slice(1,-1).trim();if(!r)return{success:!0,result:{},recoveredKeys:[],error:null};let s=Bv(r,",").filter(Boolean);if(!s.length)return{success:!1,result:null,recoveredKeys:[],error:"no segments"};let n={},o=0;for(let i of s){let l=zv(i,":");if(l!==-1){let d=Kv(i.slice(0,l)),u=xc(i.slice(l+1));if(!d||!u.success)return{success:!1,result:null,recoveredKeys:Object.keys(n),error:`Failed segment: ${i}`};n[d]=u.value;let y=parseInt(d,10);!isNaN(y)&&String(y)===d&&(o=Math.max(o,y+1));continue}let c=xc(i);if(!c.success)return{success:!1,result:null,recoveredKeys:Object.keys(n),error:`Failed value: ${i}`};for(;Object.prototype.hasOwnProperty.call(n,String(o));)o++;n[String(o)]=c.value,o++}let a=Object.keys(n).sort((i,l)=>parseInt(i,10)-parseInt(l,10));return a.length?{success:!0,result:n,recoveredKeys:a,error:null}:{success:!1,result:null,recoveredKeys:[],error:"no keys recovered"}}function Uv(t){if(typeof t!="string")return"";let e=t.trim();return e=e.replace(/'\s*\+\s*'/g,""),e.startsWith("'")&&e.endsWith("'")&&(e=e.slice(1,-1)),e=e.replace(/\\n/g,`
`),e=e.replace(/\\\\"/g,'\\"'),e=e.replace(/：/g,":"),e}function jv(t){let e=Uv(t);if(!e)return[];let r=[];Yf.lastIndex=0;let s;for(;(s=Yf.exec(e))!==null;){let i=s[1];i&&i.trim()&&r.push(i)}if(r.length)return r;let n=i=>/(insertRow|updateRow|deleteRow)\s*\(/.test(i),o=/<!--([\s\S]*?)-->/g,a=[];for(;(s=o.exec(e))!==null;)n(s[1])&&a.push(s[1]);return a}function Fv(t){let e=t.split(/\r?\n/),r=[],s="",n=!1;for(let a of e){let i=a.trim();if(!i||(!n&&i.includes("//")&&!i.includes('"//')&&!i.includes("'//")&&(i=i.split("//")[0].trim()),!i))continue;if(/^(insertRow|updateRow|deleteRow)\s*\(/.test(i)&&!n?(s&&r.push(s),s=i):s+=(s?" ":"")+i,s){let c=(s.match(/\{/g)||[]).length,d=(s.match(/\}/g)||[]).length;n=c>d}}s&&r.push(s);let o=[];for(let a of r){let i=/(?:^|;\s*)((?:insertRow|deleteRow|updateRow)\s*\()/g,l=[],c;for(;(c=i.exec(a))!==null;)l.push(c.index+(c[0].length-c[1].length));if(l.length<=1)o.push(a.replace(/;\s*$/,""));else for(let d=0;d<l.length;d++){let u=l[d],y=d+1<l.length?l[d+1]:a.length,p=a.substring(u,y).replace(/;\s*$/,"").trim();p&&o.push(p)}}return o}function Wv(t){try{let e=t;if(e.match(/\)\s*;?\s*\/\/.*$/)&&(e=e.replace(/\/\/.*$/,"").trim()),!e)return null;let r=e.match(/^(insertRow|deleteRow|updateRow)\s*\((.*)\);?$/);if(!r)return null;let s=r[1],n=r[2],o=n.indexOf("{");if(o===-1)return{command:s,args:JSON.parse(`[${n}]`),line:e};let a=n.substring(0,o).trim(),i=n.substring(o),l=JSON.parse(`[${a.replace(/,$/,"")}]`);try{return{command:s,args:[...l,JSON.parse(i)],line:e}}catch{}let c=Vf(i);if(c.success)return{command:s,args:[...l,c.result],line:e};let d=_o(i);if(!d.success)return null;try{return{command:s,args:[...l,JSON.parse(d.result)],line:e}}catch{}let u=Vf(d.result);return u.success?{command:s,args:[...l,u.result],line:e}:null}catch{return null}}function Hv(t){if(!t)return null;let{command:e,args:r}=t;if(e==="insertRow"){let s=typeof r[0]=="number"?r[0]:0,n=typeof r[1]=="object"&&r[1]!==null?r[1]:{};return{op:e,tableIndex:s,data:n}}if(e==="deleteRow"){let s=typeof r[0]=="number"?r[0]:0,n=typeof r[1]=="number"?r[1]:0;return{op:e,tableIndex:s,rowIndex:n}}if(e==="updateRow"){let s=typeof r[0]=="number"?r[0]:0,n=typeof r[1]=="number"?r[1]:0,o=typeof r[2]=="object"&&r[2]!==null?r[2]:{};return{op:e,tableIndex:s,rowIndex:n,data:o}}return null}function Yv(t){let e=jv(t);if(!e.length)return null;let r=[],s=[];for(let n of e){let o=n.replace(/<!--|-->/g,"").trim();if(!o)continue;let a=Fv(o);for(let i of a){let l=Wv(i),c=Hv(l);c?r.push(c):i&&/^(insertRow|updateRow|deleteRow)/.test(i)&&s.push(i.slice(0,200))}}if(s.length>0)try{console.warn("[TableJsonSanitizer] parseIncrementalEdits: %d \u6761\u6307\u4EE4\u89E3\u6790\u5931\u8D25",s.length,s)}catch{}return r.length?r:null}function Gv(t){Gf.lastIndex=0;let e;for(;(e=Gf.exec(t))!==null;){let f=e[1].trim();if(f)try{return JSON.parse(f)}catch{let h=_o(f);if(h.success)try{return JSON.parse(h.result)}catch{}}}let r=t.trim();try{return JSON.parse(r)}catch{}let s=_o(r);if(s.success)try{return JSON.parse(s.result)}catch{}let n=r.indexOf("{"),o=r.indexOf("["),a=-1,i="",l="";if(n!==-1&&(o===-1||n<o)?(a=n,i="{",l="}"):o!==-1&&(a=o,i="[",l="]"),a===-1)return null;let c=0,d=-1,u=!1,y=!1;for(let f=a;f<r.length;f++){let g=r[f];if(y){y=!1;continue}if(g==="\\"&&u){y=!0;continue}if(g==='"'){u=!u;continue}if(!u){if(g===i)c++;else if(g===l&&(c--,c===0)){d=f;break}}}if(d===-1)return null;let p=r.substring(a,d+1);try{return JSON.parse(p)}catch{let g=_o(p);if(g.success)try{return JSON.parse(g.result)}catch{}}return null}function Jf(t){if(!t||typeof t!="string")return{mode:"empty",edits:null,tables:null};let e=Yv(t);if(e)return{mode:"incremental",edits:e,tables:null};let r=Gv(t);if(r){let s=null;if(Array.isArray(r))s=r;else if(r&&Array.isArray(r.tables))s=r.tables;else if(r&&typeof r=="object"){for(let n of Object.values(r))if(Array.isArray(n)){s=n;break}}if(Array.isArray(s))return{mode:"full",edits:null,tables:s}}return{mode:"empty",edits:null,tables:null}}var Yf,Gf,Xf=D(()=>{Yf=/<tableEdit>([\s\S]*?)<\/tableEdit>/gi,Gf=/```(?:json)?\s*([\s\S]*?)```/gi});function qv(t,e){let r=new Map;Array.isArray(t)&&t.forEach((o,a)=>{o&&typeof o=="object"&&r.set(o.name||`__row_${a}`,o)});let s=new Map;Array.isArray(e)&&e.forEach((o,a)=>{o&&typeof o=="object"&&s.set(o.name||`__row_${a}`,o)});let n={};for(let[o,a]of s){let i=r.get(o);if(i){n[o]={};let l=new Set([...Object.keys(i.cells||{}),...Object.keys(a.cells||{})]);for(let c of l){let d=String((i.cells&&i.cells[c])??""),u=String((a.cells&&a.cells[c])??"");n[o][c]=d===u?"unchanged":"updated"}n[o].__rowStatus="kept"}else{if(n[o]={},a.cells&&typeof a.cells=="object")for(let l of Object.keys(a.cells))n[o][l]="new";n[o].__rowStatus="new"}}for(let[o]of r)s.has(o)||(n[o]={__rowStatus:"deleted"});return n}function Qf(t,e){let r=Array.isArray(t)?ae(t):[],s=Array.isArray(e)?ae(e):[],n={},o=Math.max(r.length,s.length);for(let a=0;a<o;a++){let i=r[a],l=s[a];!i&&l?(n[a]={},Array.isArray(l.rows)&&l.rows.forEach(c=>{let d=c.name||`__row_${l.rows.indexOf(c)}`;n[a][d]={__rowStatus:"new"}})):i&&!l?(n[a]={},Array.isArray(i.rows)&&i.rows.forEach(c=>{let d=c.name||`__row_${i.rows.indexOf(c)}`;n[a][d]={__rowStatus:"deleted"}})):i&&l&&(n[a]=qv(i.rows,l.rows))}return n}var Zf=D(()=>{je()});function Vv(){return{mode:"native",async buildRequest(t={},e={}){if(typeof t.buildRequest!="function")throw new Error("table_provider_missing_build_request");return t.buildRequest(e)},async sendRequest(t={},e=null,r={}){if(typeof t.sendRequest!="function")throw new Error("table_provider_missing_send_request");return t.sendRequest(e?.messages||[],r.config||{},r.abortSignal||null)},parseResponse(t={},e=""){if(typeof t.parseResponse!="function")throw new Error("table_provider_missing_parse_response");return t.parseResponse(e)}}}function eg(){return Vv()}var tg=D(()=>{});function En(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function Zv(){let t=Qv.get(Xv,{});return En(t)?t:{}}function eT(t){let e=Zv();return En(e[t])?e[t]:{}}function tT(t){let e=gp();return En(t)&&(Array.isArray(t.rows)&&(e.rows=Array.from(new Set(t.rows.filter(r=>Number.isFinite(r)).map(r=>Math.floor(r)))),e.rows.sort((r,s)=>r-s)),Array.isArray(t.cols)&&(e.cols=Array.from(new Set(t.cols.filter(r=>typeof r=="string"&&r.length>0)))),Array.isArray(t.cells)&&(e.cells=Array.from(new Set(t.cells.filter(r=>typeof r=="string"&&r.includes(":"))))),e.indexColumn=t.indexColumn===!0),e}function rT(t){if(typeof t=="string")return t;if(En(t)){if(typeof t.scopeKey=="string"&&t.scopeKey.includes("::"))return t.scopeKey;if(t.chatId!==void 0){let e=t.isolationKey!==void 0?t.isolationKey:Ie.getKey();return eo(t.chatId,e)}}return eo("",Ie.getKey())}function sT(t,e){let r=eT(t),s={};if(!Array.isArray(e))return s;for(let n=0;n<e.length;n++){let o=e[n];if(!o)continue;let a=o.uid||o.id||"";a&&r[a]&&(s[n]=tT(r[a]))}return s}function rg(t,e=[]){let r=rT(t);return sT(r,e)}function sg(t,e,r,s){if(!En(t))return!1;let n=t[e];if(!n)return!1;if(Number.isFinite(r)&&n.rows.includes(r)||typeof s=="string"&&s.length>0&&n.cols.includes(s))return!0;if(Number.isFinite(r)&&typeof s=="string"&&s.length>0){let o=`${r}:${s}`;if(n.cells.includes(o))return!0}return!1}function wc(t,e,r){if(!En(t))return!1;let s=t[e];return s?Number.isFinite(r)&&s.rows.includes(r):!1}var Jv,Xv,Qv,ng=D(()=>{Be();W();je();Ss();Jv="tableLocks",Xv="scopes",Qv=$.namespace(Jv)});function we(){return I.createScope("TableUpdate")}function oT(t,e){return new Promise(r=>{if(e?.aborted){r(!1);return}let s,n=()=>{clearTimeout(s);try{e?.removeEventListener?.("abort",n)}catch{}r(!1)};s=setTimeout(()=>{try{e?.removeEventListener?.("abort",n)}catch{}r(!0)},t);try{e?.addEventListener?.("abort",n)}catch{}})}function G(t,e=""){return t==null?e:String(t).trim()||e}function og(t=[],e=8,r="all"){if(!Array.isArray(t)||t.length===0)return"";let s=r==="assistant_only"?t.filter(n=>n?.role==="assistant"):t;return s.slice(Math.max(s.length-e,0)).map(n=>`[${G(n?.role,"unknown")}] ${String(n?.content||"").trim()}`).filter(Boolean).join(`

`)}function ag(t,{extractTags:e=[],useGlobalRules:r=!1,regexPresetId:s=""}={}){if(!t)return t;let n=Array.isArray(e)&&e.length>0,o=typeof s=="string"&&s.trim().length>0;if(!n&&!r&&!o)return t;try{let a=[],i=[];if(o)try{let l=xe.getPreset(s);if(l){let c=Array.isArray(l.rules)?l.rules.filter(d=>d&&d.enabled!==!1&&d.value):[];a.push(...c),Array.isArray(l.blacklist)&&i.push(...l.blacklist.map(d=>String(d||"").trim()).filter(Boolean))}else we().warn("applyContextExtractionRules: \u627E\u4E0D\u5230\u6B63\u5219\u9884\u8BBE",{regexPresetId:s})}catch(l){we().warn("applyContextExtractionRules: \u52A0\u8F7D\u6B63\u5219\u9884\u8BBE\u5931\u8D25",l)}if(n&&a.push(...e.map(l=>{let c=String(l||"").trim();return c.startsWith("regex:")?{type:"regex_include",value:c.slice(6).trim(),enabled:!0}:{type:"include",value:c,enabled:!0}}).filter(l=>l.value)),r){let l=Ws()||[];a=[...a,...l.filter(c=>c?.enabled)],i=[...i,...Hs()||[]]}return a.length===0&&i.length===0?t:mr(t,a,i)||t}catch(a){return we().warn("applyContextExtractionRules \u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",a),t}}function aT(t=[],e=-1){return!Number.isFinite(e)||e<0?t:t.map(r=>{let s=Array.isArray(r?.rows)?r.rows:[];return e===0||s.length<=e?r:{...r,rows:s.slice(s.length-e)}})}function iT(t=[]){return!Array.isArray(t)||t.length===0?"":t.map((e,r)=>{let s=e?.aiInstructions&&typeof e.aiInstructions=="object"?e.aiInstructions:{},n=Array.isArray(e?.columns)?e.columns:[],o=[`\u8868 ${r}: ${G(e?.name,`\u8868${r+1}`)}`,`\u8868\u683C\u8BF4\u660E: ${G(e?.note,"\u65E0")}`,`\u521D\u59CB\u5316\u8BF4\u660E: ${G(s.init,"\u65E0")}`,`\u65B0\u589E\u8BF4\u660E: ${G(s.create,"\u65E0")}`,`\u66F4\u65B0\u8BF4\u660E: ${G(s.update,"\u65E0")}`,`\u5220\u9664\u8BF4\u660E: ${G(s.delete,"\u65E0")}`,"\u5B57\u6BB5\uFF08\u8BF7\u7528\u5217\u7D22\u5F15\u4F5C\u4E3A data key\uFF09:"];return n.forEach((a,i)=>{o.push(`- [${i}]: ${G(a?.title||a?.key,"\u672A\u547D\u540D\u5B57\u6BB5")} \u2014 ${G(a?.description,"\u65E0")}`)}),o.join(`
`)}).join(`

`)}function lT(t,e=[]){if(!t||!Array.isArray(e)||e.length===0)return"";let r=e.map((n,o)=>{let a=G(n?.name,`\u8868${o+1}`),i=t.includes(n,o);return`\u8868 ${o}: ${a} - ${i?"\u5141\u8BB8\u7F16\u8F91":"\u53EA\u8BFB\uFF0C\u7981\u6B62\u4FEE\u6539"}`});return e.some((n,o)=>!t.includes(n,o))&&(r.push(""),r.push('\u3010\u91CD\u8981\u7EA6\u675F\u3011\u6807\u8BB0\u4E3A"\u53EA\u8BFB"\u7684\u8868\u683C\uFF0C\u4F60\u5FC5\u987B\u5728\u8F93\u51FA\u4E2D\u539F\u6837\u4FDD\u7559\u5176\u6240\u6709\u884C\u6570\u636E\uFF0C\u4E0D\u5F97\u65B0\u589E\u3001\u4FEE\u6539\u6216\u5220\u9664\u4EFB\u4F55\u884C\u3002'),r.push("\u5168\u91CF\u8F93\u51FA\u65F6\uFF0C\u53EA\u8BFB\u8868\u683C\u7684 rows \u5FC5\u987B\u4E0E\u8F93\u5165\u4E2D\u7684\u5B8C\u5168\u4E00\u81F4\u3002")),r.join(`
`)}function cg(t={},e=0,r=[]){let s=t&&typeof t=="object"?t:{},n=s.cells&&typeof s.cells=="object"&&!Array.isArray(s.cells)?s.cells:{},o={},a=Array.isArray(r)?r.map(l=>G(l?.key,"")).filter(Boolean):[];return new Set([...Object.keys(n),...a]).forEach(l=>{o[l]=G(n[l],"")}),{...s,id:Qn(s.id||s.rowId,e),name:G(s.name,""),cells:o}}function Ls(t={},e=0){let r=t&&typeof t=="object"?t:{},s=Array.isArray(r.columns)?ae(r.columns):[],n=Array.isArray(r.rows)?r.rows.map((o,a)=>cg(o,a,s)):[];return{...r,id:Ht(r.id||r.key,e),rows:n}}function lr(t=[]){return Array.isArray(t)?t.map((e,r)=>Ls(e,r)):[]}function cT(t=[],e=[],r){let s=lr(t),n=lr(e);if(!r)return n;let o=new Map(n.map((u,y)=>[Ht(u?.id||u?.key,y),u])),a=s.map((u,y)=>({table:u,tableIndex:y,id:Ht(u?.id||u?.key,y)})).filter(({table:u,tableIndex:y})=>r.includes(u,y)),i=new Set,l=new Map;for(let u=0;u<n.length;u++){let y=n[u],p=Ht(y?.id||y?.key,u);o.has(p)&&(l.set(p,y),i.add(p))}let c=0,d=n.filter((u,y)=>{let p=Ht(u?.id||u?.key,y);return!i.has(p)});return s.map((u,y)=>{let p=Ht(u?.id||u?.key,y);if(!r.includes(u,y))return Ls(u,y);let f=l.get(p);if(f)return Ls(f,y);let g=d[c];return g?(c++,Ls({...g,id:u.id||g.id},y)):Ls(u,y)})}function dT(t=[],e=[],r,s={}){if(!Array.isArray(t)||!r)return{edits:[],stats:{total:0,passed:0,droppedByScope:0,droppedByLock:0}};let n=lr(e),o=[],a=0,i=0;for(let l of t){let c=Number.isFinite(l?.tableIndex)?l.tableIndex:-1;if(c<0||c>=n.length){a++;continue}let d=n[c];if(!r.includes(d,c)){a++;continue}if(l.op===sn.INSERT_ROW){o.push(l);continue}let u=Number.isFinite(l?.rowIndex)?l.rowIndex:-1;if(u<0||u>=(Array.isArray(d?.rows)?d.rows.length:0)){a++;continue}if(l.op===sn.DELETE_ROW){if(wc(s,c,u)){i++;continue}o.push(l);continue}o.push(l)}return{edits:o,stats:{total:t.length,passed:o.length,droppedByScope:a,droppedByLock:i}}}function uT(t=[],e){let r=lr(t);return e?r.map((s,n)=>{let o=Array.isArray(s?.columns)?s.columns:[];return e.includes(s,n)?{...Ls(s,n),scopeEditable:!0,scopeStatus:"editable"}:{...Ls(s,n),scopeEditable:!1,scopeStatus:"readonly",rows:Array.isArray(s?.rows)?s.rows.map((a,i)=>cg(a,i,o)):[]}}):r}function pT(t,e,r){return{target:{sourceMessageId:G(t?.sourceMessageId),sourceSwipeId:G(t?.sourceSwipeId||t?.effectiveSwipeId),slotBindingKey:G(t?.slotBindingKey),slotRevisionKey:G(t?.slotRevisionKey),slotTransactionId:G(t?.slotTransactionId)},loadMode:G(e?.loadMode),mergeBaseOnly:e?.mergeBaseOnly===!0,resolvedFromMessageId:G(e?.resolvedFromMessageId),resolvedFromRevisionKey:G(e?.resolvedFromRevisionKey),sourceKind:G(e?.sourceKind||e?.state?.meta?.sourceKind),scope:typeof r?.toJSON=="function"?r.toJSON():null,tables:uT(e?.state?.tables,r)}}function ig(){return yT}function lg(t,e){if(!t||typeof t!="string")return{key:t,source:"fallback"};if(!Array.isArray(e)||e.length===0)return{key:t,source:"fallback"};for(let s of e)if(s?.key===t)return{key:t,source:"direct"};if(/^\d+$/.test(t)){let s=parseInt(t,10);if(s>=0&&s<e.length&&e[s]?.key)return{key:e[s].key,source:"index"}}let r=t.match(/^col(?:_(\d+))?$/i);if(r){let s=r[1]?parseInt(r[1],10)-1:0;if(s>=0&&s<e.length&&e[s]?.key)return{key:e[s].key,source:"col_n"}}return{key:t,source:"fallback"}}function fT(t,e,r,s=null){let n=lr(t||[]),o=r||{},a={direct:0,index:0,col_n:0,fallback:0},i={},l={};if(Array.isArray(e))for(let c of e){let d=Number.isFinite(c?.tableIndex)?c.tableIndex:-1;i[d]=(i[d]||0)+1,l[c?.op||"unknown"]=(l[c?.op||"unknown"]||0)+1}we().info("applyIncrementalEdits \u603B\u89C8",{totalEdits:e?.length||0,tableCount:n.length,editsByTable:i,editsByOp:l});for(let c of e){let d=c.tableIndex;if(d<0||d>=n.length)continue;let u=n[d];if(!u||!Array.isArray(u.rows)||s&&!s.includes(u,d))continue;if(c.op===sn.INSERT_ROW){let p={id:Xn("row"),name:"",cells:{}};if(c.data&&typeof c.data=="object"){p.name=G(c.data.name,"");let g=Array.isArray(u.columns)?u.columns:[];for(let[h,x]of Object.entries(c.data)){if(h==="name")continue;let{key:v,source:T}=lg(h,g);p.cells[v]=G(x),a[T]=(a[T]||0)+1}}Object.keys(p.cells).length===0&&!p.name&&we().warn("applyIncrementalEdits: \u63D2\u5165\u7A7A\u884C\uFF08data \u89E3\u6790\u4E3A\u7A7A\uFF09",{tableIndex:d,tableName:u.name,editDataKeys:c.data?Object.keys(c.data):[],editDataPreview:JSON.stringify(c.data||{}).slice(0,200)}),u.rows.push(p);continue}let y=c.rowIndex;if(!(y<0||y>=u.rows.length)){if(c.op===sn.DELETE_ROW){if(wc(o,d,y))continue;u.rows.splice(y,1);continue}if(c.op===sn.UPDATE_ROW){let p=u.rows[y];if(!p)continue;if(p.id=Qn(p.id||p.rowId,y),p.cells=p.cells||{},c.data&&typeof c.data=="object"){let f=Array.isArray(u.columns)?u.columns:[];for(let[g,h]of Object.entries(c.data)){if(g==="name")continue;let{key:x,source:v}=lg(g,f);sg(o,d,y,x)||(p.cells[x]=G(h),a[v]=(a[v]||0)+1)}c.data.name!==void 0&&(p.name=G(c.data.name,p.name))}}}}return Object.values(a).some(c=>c>0)&&we().info("\u5217 key \u89E3\u6790\u7EDF\u8BA1",a),lr(n)}async function gT({executionContext:t,targetSnapshot:e,loadResult:r,config:s,assistantSnapshot:n,fillMode:o,runScope:a}={}){let i=Ot(s),l=o==="incremental"||!o&&i.fillMode!=="full",c=Pp(i,{skipResponseContract:l}),d=pT(e,r,a),u=Array.isArray(n?.tableState?.tables)?lr(n.tableState.tables):[],y=t?.chatHistory||t?.chatMessages||[],{contextDepth:p,contextRoles:f,contextExtractTags:g,contextUseGlobalRules:h,sendLatestRows:x}=i,v=i?.extraction?.regexPresetId||"",T=og(y,p,f),L=og(y,p,"all"),M=ag(T,{extractTags:g,useGlobalRules:h,regexPresetId:v}),_=ag(L,{extractTags:g,useGlobalRules:h,regexPresetId:v}),A=await Go({worldbooks:i.worldbooks}),F=aT(d.tables,x),H={...d,tables:F},R={...t,toolName:"\u586B\u8868\u5DE5\u4F5C\u53F0",toolId:"tableWorkbench",lastAiMessage:t?.assistantBaseText||t?.lastAiMessage||"",recentMessagesText:M,rawRecentMessagesText:_,toolWorldbookContent:A,tableGuidance:iT(i.tables),tableScopeGuidance:lT(a,d.tables),injectedContext:n?.injectedContext||Ct.getLatestMessageInjectedContext(e?.sourceMessageId),toolContentMacro:JSON.stringify(H,null,2),extractedContent:JSON.stringify(H,null,2),previousToolOutput:JSON.stringify(u,null,2)},S=await Is.buildToolMessages(c,R),U=await Is.buildPromptText(c,R);if(l&&(U+=ig(),Array.isArray(S)&&S.length>0)){let V=S[S.length-1];V&&typeof V.content=="string"&&(V.content+=ig())}if(!Array.isArray(S)||S.length===0)throw new Error("\u586B\u8868\u8BF7\u6C42\u6D88\u606F\u6784\u5EFA\u5931\u8D25\u3002");return{toolConfig:c,context:R,requestPayload:d,promptText:U,messages:S,fillMode:l?"incremental":"full",runScope:typeof a?.toJSON=="function"?a.toJSON():null}}async function mT(t,e={},r=null){let s=Ot(e),n=G(s.apiPreset,"");if(n){if(!Pn(n))throw new Error(`API \u9884\u8BBE\u4E0D\u5B58\u5728: ${n}`);return yi(n,t,{},r)}return Nn(t,{},r)}function Er({status:t=Te.IDLE,targetSnapshot:e=null,skipReason:r="",startedAt:s=Date.now(),error:n=""}={}){return{lastAutoRunAt:s,lastAutoStatus:G(t,Te.IDLE),lastAutoMessageId:G(e?.sourceMessageId,""),lastAutoRevisionKey:G(e?.slotRevisionKey,""),lastAutoSkipReason:G(r,""),...n?{lastError:n,lastErrorDetails:[n]}:{}}}function ir(t={},e=Qe.MANUAL){let r=t&&typeof t=="object"?t:{};return Object.keys(r).length?Rp(r):null}function $s({targetSnapshot:t=null,startedAt:e=Date.now(),status:r="idle",skipReason:s="",warning:n="",writeback:o=null,aborted:a=!1,stale:i=!1,abortReason:l="",error:c=""}={}){return{isAutoRun:!0,status:r,startedAt:e,targetSnapshot:t,sourceMessageId:G(t?.sourceMessageId,""),sourceSwipeId:G(t?.sourceSwipeId||t?.effectiveSwipeId,""),slotRevisionKey:G(t?.slotRevisionKey,""),writebackStatus:o?.success===!0?"success":n?"warning":"",refreshConfirmed:o?.mirrorResult?.refreshConfirmed===!0,warning:G(n,""),skipReason:G(s,""),aborted:a===!0,stale:i===!0,abortReason:G(l,""),error:G(c,"")}}function Xa(t=null){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}async function Eo(t=null,e={}){return ug({configInput:t,runSource:Qe.MANUAL,clearBeforeUpdate:e?.clearBeforeUpdate===!0,executionContextBuilder:()=>us({runSource:Qe.MANUAL}),targetResolver:r=>xo(r,{runSource:Qe.MANUAL})})}async function dg({messageId:t,swipeId:e="",sourceEvent:r="AUTO_TABLE",configInput:s=null,signal:n=null,shouldAbortWriteback:o=null}={}){return ug({configInput:s,runSource:Qe.AUTO,autoMeta:{sourceEvent:r,messageId:G(t,""),swipeId:G(e,""),signal:n,shouldAbortWriteback:o},executionContextBuilder:()=>ps({messageId:t,swipeId:e,runSource:Qe.AUTO}),targetResolver:a=>xo(a,{runSource:Qe.AUTO})})}async function ug({configInput:t=null,runSource:e=Qe.MANUAL,executionContextBuilder:r,targetResolver:s,autoMeta:n=null,clearBeforeUpdate:o=!1}={}){let a=Ot(t||ke()),i=bl(a),l=ua({tables:Array.isArray(a.tables)?a.tables:[]}),c=e===Qe.AUTO,d=Date.now();if(we().info(`\u5F00\u59CB\u586B\u8868 [${e}]`,{isAutoRun:c,fillMode:a.fillMode}),!i.valid||!l.valid){let g=[...i.errors,...l.errors];return we().error("\u914D\u7F6E\u6821\u9A8C\u5931\u8D25",{errors:g}),ir({lastStatus:Te.ERROR,lastRunAt:d,lastDurationMs:0,lastError:g[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002",lastErrorDetails:g,lastValidationSummary:l.summary||{errorCount:g.length,warningCount:0},errorCount:Number(a?.runtime?.errorCount)||0,...c?Er({status:Te.ERROR,startedAt:d,skipReason:"invalid_config",error:g[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"}):{}},e),{success:!1,error:g.join(`
`),errors:g,...c?{meta:$s({startedAt:d,status:Te.ERROR,skipReason:"invalid_config",error:g[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"})}:{}}}let u=a.runtime||{},y=Array.isArray(a.tables)?a.tables:[];try{let h=hn({})?.template?.tables;if(Array.isArray(h)&&h.length>0){let x=a.tableEnabledOverrides&&typeof a.tableEnabledOverrides=="object"?a.tableEnabledOverrides:{};y=h.map(T=>{let L=T?.id,M=L&&Object.prototype.hasOwnProperty.call(x,L)?x[L]:void 0;return{...T,enabled:M!==void 0?M:T.enabled!==!1}});let v=y.filter(T=>T.enabled===!1).map(T=>T?.name||T?.id);v.length>0&&we().info("scopeTables: \u7528\u6237\u7981\u7528\u4E86\u90E8\u5206\u8868",{disabledCount:v.length,disabledNames:v})}}catch{}let p=mp(a.scope||a,y);if(we().info("runScope \u5DF2\u89E3\u6790",{mode:p.mode,requestedMode:p.requestedMode,staleScope:p.staleScope,scopeTablesCount:Array.isArray(y)?y.length:0,allowedTableIds:p.allowedTableIds,allTableIds:p.allTableIds,scopeTablesEnabled:Array.isArray(y)?y.map(g=>({id:g?.id,name:g?.name,enabled:g?.enabled})):[]}),p.staleScope&&we().warn("runScope: \u68C0\u6D4B\u5230 stale scope\uFF08activeTableId/selectedTableIds \u4E0D\u5728\u5F53\u524D tables \u8303\u56F4\u5185\uFF09\uFF0C\u5DF2\u81EA\u52A8 fallback \u5230 enabled",{requestedMode:p.requestedMode,requestedActiveTableId:p.activeTableId,requestedSelectedTableIds:p.selectedTableIds}),(p.mode==="current"||p.mode==="selected")&&p.allowedTableIds.length===0){let g=p.mode==="current"?"\u672A\u6307\u5B9A\u5F53\u524D\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002":"\u672A\u9009\u62E9\u4EFB\u4F55\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002";return we().warn(g,{mode:p.mode}),ir({lastStatus:Te.ERROR,lastRunAt:d,lastDurationMs:0,lastError:g,lastErrorDetails:[g]},e),{success:!1,error:g,errors:[g]}}let f=null;ir({lastStatus:Te.RUNNING,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},lastScopeMode:G(p.mode,""),...c?Er({status:Te.RUNNING,startedAt:d,skipReason:""}):{}},e);try{if(typeof r!="function")throw new Error("table_update_missing_execution_context_builder");if(typeof s!="function")throw new Error("table_update_missing_target_resolver");let g=await r();we().info("\u6267\u884C\u4E0A\u4E0B\u6587\u5DF2\u6784\u5EFA");let h=s(g);if(!h)throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u697C\u5C42\u3002");f=h,we().info("\u76EE\u6807\u6D88\u606F\u5DF2\u89E3\u6790",{sourceMessageId:h.sourceMessageId,slotRevisionKey:h.slotRevisionKey}),c&&ir(Er({status:Te.RUNNING,targetSnapshot:h,startedAt:d,skipReason:""}),e);let x=G(a.autoUpdateTrigger,"assistantMessage");if(c&&(!a.autoUpdateEnabled||x!=="assistantMessage")){let J=a.autoUpdateEnabled?"auto_trigger_not_assistant_message":"auto_update_disabled";return ir(Er({status:Te.SKIPPED,targetSnapshot:h,startedAt:d,skipReason:J}),e),{success:!1,skipped:!0,reason:J,targetSnapshot:h,meta:$s({targetSnapshot:h,startedAt:d,status:Te.SKIPPED,skipReason:J})}}if(c){let J=Xa(n);if(J)return ir(Er({status:Te.ABORTED,targetSnapshot:h,startedAt:d,skipReason:J.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:h,meta:$s({targetSnapshot:h,startedAt:d,status:Te.ABORTED,skipReason:J.reason,aborted:J.aborted===!0,stale:J.stale===!0,abortReason:J.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}let v=await Mf(h);if(!v?.success)throw new Error(v?.error||"\u76EE\u6807\u89E3\u6790\u8BB0\u5F55\u5931\u8D25");if(o&&Number.isFinite(h?.targetMessageIndex)&&h.targetMessageIndex>=0){we().info("clearBeforeUpdate \u542F\u7528\uFF0C\u6E05\u7A7A\u76EE\u6807\u697C\u5C42\u6570\u636E",{targetMessageIndex:h.targetMessageIndex});try{let J=await Rf(h.targetMessageIndex);we().info("clearBeforeUpdate \u5B8C\u6210",J)}catch(J){we().error("clearBeforeUpdate \u5931\u8D25",J)}}let T=Ds(h.sourceMessageId),L=Array.isArray(y)&&y.length>0?y:a.tables;we().info("templateTables \u6765\u6E90",{usingActiveTemplate:y!==(Array.isArray(a.tables)?a.tables:[]),tableCount:Array.isArray(L)?L.length:0,firstTableName:L?.[0]?.name||"",firstTableId:L?.[0]?.id||""});let M=If(h,{templateTables:L}),_=lr(M?.state?.tables||[]),A=eg(),F=n?.signal||g?.signal||null;we().info("\u72B6\u6001\u5DF2\u52A0\u8F7D",{loadMode:M?.loadMode,sourceKind:M?.sourceKind,tableCount:_.length});let H=await A.buildRequest({buildRequest:gT},{executionContext:g,targetSnapshot:h,loadResult:M,config:a,assistantSnapshot:T,runScope:p});we().info("\u8BF7\u6C42\u5DF2\u6784\u5EFA",{messageCount:H?.messages?.length,fillMode:H?.fillMode});let R="",S=null,U=null;for(let J=1;J<=Ja;J++){if(F?.aborted)throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88");try{if(R=await A.sendRequest({sendRequest:mT},H,{config:a,abortSignal:F}),we().info("API \u54CD\u5E94\u5DF2\u6536\u5230",{attempt:J,responseLength:R?.length||0}),S=A.parseResponse({parseResponse:Jf},R),we().info("\u54CD\u5E94\u5DF2\u89E3\u6790",{attempt:J,mode:S?.mode,hasEdits:!!S?.edits,hasTables:!!S?.tables}),!(S?.mode==="incremental"&&Array.isArray(S.edits)&&S.edits.length>0||S?.mode==="full"&&S?.tables))throw new Error("AI \u54CD\u5E94\u4E2D\u672A\u627E\u5230\u6709\u6548\u7684 <tableEdit> \u6807\u7B7E\u6216\u8868\u683C JSON");U=null;break}catch(ue){if(U=ue,we().warn(`\u586B\u8868 attempt ${J}/${Ja} \u5931\u8D25`,{error:ue?.message||String(ue)}),J<Ja&&!await oT(nT,F))throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88\uFF08\u91CD\u8BD5\u7B49\u5F85\u671F\u95F4\uFF09")}}if(U)throw new Error(`\u586B\u8868\u5931\u8D25\uFF08${Ja} \u6B21\u91CD\u8BD5\u540E\u4ECD\u5931\u8D25\uFF09: ${U?.message||String(U)}`);let V,fe=null,Ve=H.fillMode||"full",Ae=null;if(S.mode==="incremental"&&S.edits){let J=rg(M?.state,_),ue=dT(S.edits,_,p,J);Ae=ue.stats,V=fT(_,ue.edits,J,p),Ve="incremental",(Ae.droppedByScope>0||Ae.droppedByLock>0)&&we().info("scope \u8FC7\u6EE4",Ae)}else if(S.mode==="full"&&S.tables){let J=lr(S.tables);V=cT(_,J,p),Ve="full"}else V=lr(_);if(fe=Qf(_,V),we().info("\u5DEE\u5F02\u5DF2\u8BA1\u7B97",{fillMode:Ve}),c){let J=Xa(n);if(J)return ir(Er({status:Te.ABORTED,targetSnapshot:h,startedAt:d,skipReason:J.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88",targetSnapshot:h,meta:$s({targetSnapshot:h,startedAt:d,status:Te.ABORTED,aborted:J.aborted===!0,stale:J.stale===!0,abortReason:J.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"})}}let oe=await Wf({targetSnapshot:h,nextTables:V,config:a,loadResult:M,diff:fe,fillMode:Ve,skipNotify:c});if(c){let J=Xa(n);if(J)return ir(Er({status:Te.ABORTED,targetSnapshot:h,startedAt:d,skipReason:J.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:h,loadResult:M,request:H,responseText:R,parsed:S,fillMode:Ve,diff:fe,previousTables:_,nextTables:V,runScope:p,state:oe?.state,bindings:oe?.bindings,mirrorResult:oe?.mirrorResult,warning:oe?.warning||"",meta:$s({targetSnapshot:h,startedAt:d,status:Te.ABORTED,warning:oe?.warning||"",writeback:oe,aborted:J.aborted===!0,stale:J.stale===!0,abortReason:J.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}if(!oe?.success)throw new Error(oe?.error||"\u7ED3\u6784\u5316\u5199\u56DE\u5931\u8D25");let Ze=Date.now()-d;we().info(`\u586B\u8868\u5B8C\u6210 [${Ve}] ${Ze}ms`,{success:!0,writebackSuccess:oe?.success,mirrorSuccess:oe?.mirrorResult?.success});let cr={lastStatus:Te.SUCCESS,lastRunAt:Date.now(),lastDurationMs:Ze,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:(Number(u.successCount)||0)+1,errorCount:Number(u.errorCount)||0,lastSourceMessageId:G(h.sourceMessageId),lastSlotRevisionKey:G(h.slotRevisionKey),lastLoadMode:G(M.loadMode),lastMirrorApplied:oe?.mirrorResult?.success===!0,lastResolvedFromMessageId:G(M?.resolvedFromMessageId),lastResolvedFromRevisionKey:G(M?.resolvedFromRevisionKey),lastSourceKind:G(M?.sourceKind||M?.state?.meta?.sourceKind),lastScopeMode:G(p.mode,""),lastFillMode:Ve,...c?Er({status:Te.SUCCESS,targetSnapshot:h,startedAt:d,skipReason:""}):{}};return ir(cr,e),{success:!0,targetSnapshot:h,loadResult:M,request:H,responseText:R,parsed:S,fillMode:Ve,diff:fe,previousTables:_,nextTables:V,runScope:p,scopeStats:Ae,state:oe.state,bindings:oe.bindings,mirrorResult:oe.mirrorResult,warning:oe.warning||"",...c?{meta:$s({targetSnapshot:h,startedAt:d,status:Te.SUCCESS,warning:oe.warning||"",writeback:oe})}:{}}}catch(g){let h=Date.now()-d;we().error(`\u586B\u8868\u5931\u8D25 ${h}ms: ${g?.message||g}`,{stack:g?.stack});let x=c?Xa(n):!1,v=g?.name==="AbortError"||g?.message==="\u8BF7\u6C42\u5DF2\u53D6\u6D88"||x?.aborted===!0||x?.stale===!0,T=v?Te.ABORTED:Te.ERROR,L={lastStatus:T,lastRunAt:Date.now(),lastDurationMs:h,lastError:g?.message||String(g),lastErrorDetails:[g?.message||String(g)],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:Number(u.successCount)||0,errorCount:v?Number(u.errorCount)||0:(Number(u.errorCount)||0)+1,lastScopeMode:G(p.mode,""),...c?Er({status:T,targetSnapshot:f,startedAt:d,skipReason:v?x?.reason||"cancelled_before_host_commit":"",error:g?.message||String(g)}):{}};return ir(L,e),{success:!1,error:g?.message||String(g),errors:[g?.message||String(g)],...c?{meta:$s({targetSnapshot:f,startedAt:d,status:T,skipReason:v?x?.reason||"cancelled_before_host_commit":"",aborted:v,stale:x?.stale===!0,abortReason:v?x?.reason||"cancelled_before_host_commit":"",error:g?.message||String(g)})}:{}}}}var Ja,nT,yT,Qa=D(()=>{ys();ks();Po();Na();W();je();Ua();vo();rr();Hf();Xf();Zf();la();tg();ng();an();qo();Ys();zr();Ja=3,nT=5e3;yT=`

\u3010\u8868\u683C\u7F16\u8F91\u6307\u4EE4\u683C\u5F0F\u3011
\u8BF7\u4F7F\u7528 <tableEdit> \u6807\u7B7E\u8FD4\u56DE\u5BF9\u8868\u683C\u7684\u4FEE\u6539\uFF0C\u652F\u6301\u4E09\u79CD\u64CD\u4F5C\uFF1A

1. \u63D2\u5165\u65B0\u884C\uFF1AinsertRow(\u8868\u7D22\u5F15, {"\u5217\u7D22\u5F15": "\u503C", ...})
2. \u66F4\u65B0\u73B0\u6709\u884C\uFF1AupdateRow(\u8868\u7D22\u5F15, \u884C\u7D22\u5F15, {"\u5217\u7D22\u5F15": "\u65B0\u503C", ...})
3. \u5220\u9664\u884C\uFF1AdeleteRow(\u8868\u7D22\u5F15, \u884C\u7D22\u5F15)

\u7EA6\u5B9A\uFF1A
- \u8868\u7D22\u5F15\u3001\u884C\u7D22\u5F15\u3001\u5217\u7D22\u5F15\u90FD\u4ECE 0 \u5F00\u59CB\uFF08\u884C\u7D22\u5F15\u4E0D\u542B\u8868\u5934\u884C\uFF09
- data \u5BF9\u8C61\u7684\u952E\u7EDF\u4E00\u7528\u5217\u7D22\u5F15\u5B57\u7B26\u4E32\uFF08"0"\u3001"1"\u3001"2" ...\uFF09\uFF0C\u4E0D\u8981\u7528\u5217\u540D
- updateRow \u53EA\u5217\u8981\u6539\u7684\u5217\uFF0C\u672A\u63D0\u53CA\u7684\u5217\u4FDD\u7559\u539F\u503C
- \u4E00\u6B21\u53EF\u4EE5\u5305\u542B\u591A\u4E2A\u64CD\u4F5C\uFF0C\u6BCF\u4E2A\u64CD\u4F5C\u4E00\u884C
- \u5982\u679C\u4E0D\u9700\u8981\u4FEE\u6539\u8868\u683C\uFF0C\u8FD4\u56DE\u7A7A\u7684 <tableEdit></tableEdit>

\u793A\u4F8B\uFF08\u5047\u8BBE\u7B2C 0 \u5F20\u8868\u6709 3 \u5217\uFF09\uFF1A
<tableEdit>
insertRow(0, {"0": "\u65B0\u89D2\u8272", "1": "25", "2": "\u6218\u58EB"})
updateRow(0, 1, {"1": "26"})
deleteRow(1, 0)
</tableEdit>

\u53EA\u8FD4\u56DE <tableEdit> \u6807\u7B7E\uFF0C\u4E0D\u8981\u9644\u52A0\u5176\u4ED6\u5185\u5BB9\u3002`});var fg={};re(fg,{WindowManager:()=>Za,closeWindow:()=>yg,createWindow:()=>vc,windowManager:()=>Mt});function xT(){if(Mt.stylesInjected)return;Mt.stylesInjected=!0;let t=`
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
  `,e=ur(),r=e.createElement("style");r.id=bT+"_styles",r.textContent=t,(e.head||e.documentElement).appendChild(r)}function vc(t){let{id:e,title:r="\u7A97\u53E3",content:s="",width:n=900,height:o=700,modal:a=!1,resizable:i=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:d=!0,onClose:u,onReady:y}=t;xT();let p=window.jQuery||window.parent?.jQuery;if(!p)return hT.error("jQuery not available"),null;if(Mt.isOpen(e))return Mt.bringToFront(e),Mt.getWindow(e);let f=window.innerWidth||1200,g=window.innerHeight||800,h=f<=1100,x=null,v=!1;d&&(x=Mt.getState(e),x&&!h&&(v=!0));let T,L;v&&x.width&&x.height?(T=Math.max(400,Math.min(x.width,f-40)),L=Math.max(300,Math.min(x.height,g-40))):(T=Math.max(400,Math.min(n,f-40)),L=Math.max(300,Math.min(o,g-40)));let M=Math.max(20,Math.min((f-T)/2,f-T-20)),_=Math.max(20,Math.min((g-L)/2,g-L-20)),A=l&&!h,F=`
    <div class="yyt-window" id="${e}" style="left:${M}px; top:${_}px; width:${T}px; height:${L}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${wT(r)}</span>
        </div>
        <div class="yyt-window-controls">
          ${A?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
          <button class="yyt-window-btn close" title="\u5173\u95ED"><i class="fa-solid fa-times"></i></button>
        </div>
      </div>
      <div class="yyt-window-body">${s}</div>
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
  `,H=ur(),R=null;a&&(R=p(`<div class="yyt-window-overlay" data-for="${e}"></div>`),p(H.body).append(R));let S=p(F);p(H.body).append(S),Mt.register(e,S),S.on("mousedown",()=>Mt.bringToFront(e));let U=!1,V={left:M,top:_,width:T,height:L},fe=()=>{V={left:parseInt(S.css("left")),top:parseInt(S.css("top")),width:S.width(),height:S.height()},S.addClass("maximized"),S.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),U=!0},Ve=()=>{S.removeClass("maximized"),S.css({left:V.left+"px",top:V.top+"px",width:V.width+"px",height:V.height+"px"}),S.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),U=!1};S.find(".yyt-window-btn.maximize").on("click",()=>{U?Ve():fe()}),(h&&l||v&&x.isMaximized&&l||c&&l)&&fe(),S.find(".yyt-window-btn.close").on("click",()=>{if(d&&l){let ue={width:U?V.width:S.width(),height:U?V.height:S.height(),isMaximized:U};Mt.saveState(e,ue)}u&&u(),R&&R.remove(),S.remove(),Mt.unregister(e),p(document).off(".yytWindowDrag"+e),p(document).off(".yytWindowResize"+e)}),R&&R.on("click",ue=>{ue.target,R[0]});let Ae=!1,oe,Ze,cr,J;if(S.find(".yyt-window-header").on("mousedown",ue=>{p(ue.target).closest(".yyt-window-controls").length||U||(Ae=!0,oe=ue.clientX,Ze=ue.clientY,cr=parseInt(S.css("left")),J=parseInt(S.css("top")),p(document.body).css("user-select","none"))}),p(document).on("mousemove.yytWindowDrag"+e,ue=>{if(!Ae)return;let Oe=ue.clientX-oe,Rt=ue.clientY-Ze;S.css({left:Math.max(0,cr+Oe)+"px",top:Math.max(0,J+Rt)+"px"})}),p(document).on("mouseup.yytWindowDrag"+e,()=>{Ae&&(Ae=!1,p(document.body).css("user-select",""))}),i){let ue=!1,Oe="",Rt,He,dr,Ue,Cn,kn;S.find(".yyt-window-resize-handle").on("mousedown",function(Ar){U||(ue=!0,Oe="",p(this).hasClass("se")?Oe="se":p(this).hasClass("e")?Oe="e":p(this).hasClass("s")?Oe="s":p(this).hasClass("w")?Oe="w":p(this).hasClass("n")?Oe="n":p(this).hasClass("nw")?Oe="nw":p(this).hasClass("ne")?Oe="ne":p(this).hasClass("sw")&&(Oe="sw"),Rt=Ar.clientX,He=Ar.clientY,dr=S.width(),Ue=S.height(),Cn=parseInt(S.css("left")),kn=parseInt(S.css("top")),p(document.body).css("user-select","none"),Ar.stopPropagation())}),p(document).on("mousemove.yytWindowResize"+e,Ar=>{if(!ue)return;let Cr=Ar.clientX-Rt,Qr=Ar.clientY-He,Os=400,Bs=300,In=dr,Mn=Ue,Zr=Cn,es=kn;if(Oe.includes("e")&&(In=Math.max(Os,dr+Cr)),Oe.includes("s")&&(Mn=Math.max(Bs,Ue+Qr)),Oe.includes("w")){let ts=dr-Cr;ts>=Os&&(In=ts,Zr=Cn+Cr)}if(Oe.includes("n")){let ts=Ue-Qr;ts>=Bs&&(Mn=ts,es=kn+Qr)}S.css({width:In+"px",height:Mn+"px",left:Zr+"px",top:es+"px"})}),p(document).on("mouseup.yytWindowResize"+e,()=>{ue&&(ue=!1,p(document.body).css("user-select",""))})}return S.on("remove",()=>{p(document).off(".yytWindowDrag"+e),p(document).off(".yytWindowResize"+e)}),y&&setTimeout(()=>y(S),50),S}function yg(t){let e=Mt.getWindow(t);if(e){let r=window.jQuery||window.parent?.jQuery;r&&(r(`.yyt-window-overlay[data-for="${t}"]`).remove(),r(document).off(".yytWindowDrag"+t),r(document).off(".yytWindowResize"+t)),e.remove(),Mt.unregister(t)}}function wT(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var hT,bT,pg,Za,Mt,Tc=D(()=>{Be();W();Ge();hT=I.createScope("WindowManager"),bT="youyou_toolkit_window_manager",pg="window_states",Za=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,r){this.topZIndex++,this.windows.set(e,{$el:r,zIndex:this.topZIndex}),r.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let r=this.windows.get(e);r&&(this.topZIndex++,r.zIndex=this.topZIndex,r.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,r)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,r){let s=this.loadStates();s[e]={...r,updatedAt:Date.now()},Mo.set(pg,s)}loadStates(){return Mo.get(pg)||{}}getState(e){return this.loadStates()[e]||null}},Mt=new Za});function it(){return Sc||(Sc=I.createScope("TableDataEditor")),Sc}function Le(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ne(){if(E.isDirty=!0,!!E.$window)try{E.$window.find('[data-action="save"], [data-action="save-global"]').prop("disabled",!1).removeAttr("disabled");let t=E.$window.find(".yyt-tde-toolbar-left").first();t.length&&t.find(".yyt-tde-dirty-badge").length===0&&t.append('<span class="yyt-tde-dirty-badge">\u672A\u4FDD\u5B58</span>')}catch{}}function gg(){if(E.isDirty=!1,!!E.$window)try{E.$window.find('[data-action="save"]').prop("disabled",!0).attr("disabled","disabled"),E.$window.find(".yyt-tde-dirty-badge").remove()}catch{}}function ST(){if(!_c)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tde-styles")){_c=!0;return}let r=t.createElement("style");r.id="yyt-tde-styles",r.textContent=TT,e.appendChild(r),_c=!0}catch(t){it().warn("\u6CE8\u5165\u6570\u636E\u7F16\u8F91\u5668\u6837\u5F0F\u5931\u8D25",t)}}function Ec(){let t=[],e=null,r=!1;try{let s=Ds(null);it().info("loadEditorData snapshot",{hasSnapshot:!!s,messageId:s?.message?.message_id??s?.sourceMessageId,chatId:s?.chatId,isolationKey:s?.tableState?.meta?.isolationKey,hasTableState:!!s?.tableState,tableStateTablesLen:Array.isArray(s?.tableState?.tables)?s.tableState.tables.length:null,firstTableNameInSlot:s?.tableState?.tables?.[0]?.name}),Array.isArray(s?.tableState?.tables)&&s.tableState.tables.length>0&&(t=s.tableState.tables),e=s?{chatId:s.chatId||"",sourceMessageId:s.sourceMessageId||s.message?.message_id||"",sourceSwipeId:s.sourceSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",traceId:s.traceId||"",targetMessageIndex:s.targetMessageIndex??-1}:null}catch(s){it().warn("loadEditorData \u5F02\u5E38",s)}if(t.length===0)try{let n=hn({})?.template?.tables;Array.isArray(n)&&n.length>0&&(t=ae(n),r=!0)}catch(s){it().warn("\u4ECE\u6A21\u677F fallback \u5931\u8D25",s)}E.tempData=ae(t)||[],E.targetSnapshot=e,E.isDirty=!1,E.isFromTemplate=r,E._pendingMirrorTag=null,E.currentTableIndex>=E.tempData.length?E.currentTableIndex=E.tempData.length>0?0:-1:E.currentTableIndex<0&&E.tempData.length>0&&(E.currentTableIndex=0)}function hg(){return`
    <div class="yyt-tde">
      ${bg()}
      <div class="yyt-tde-content">
        ${_T()}
        <main class="yyt-tde-main">${ET()}</main>
      </div>
    </div>
  `}function bg(){return`
    <div class="yyt-tde-toolbar">
      <div class="yyt-tde-toolbar-left">
        <div class="yyt-tde-mode-switch">
          <button class="${E.mode==="data"?"active":""}" data-mode="data">\u6570\u636E\u7F16\u8F91</button>
          <button class="${E.mode==="schema"?"active":""}" data-mode="schema">\u7ED3\u6784\u914D\u7F6E</button>
          <button class="${E.mode==="global"?"active":""}" data-mode="global">\u5168\u5C40\u6CE8\u5165</button>
        </div>
        ${E.isDirty?'<span class="yyt-tde-dirty-badge">\u672A\u4FDD\u5B58</span>':""}
      </div>
      <div class="yyt-tde-actions">
        <button class="yyt-tde-btn" data-action="reload"><i class="fa-solid fa-rotate"></i> \u91CD\u65B0\u52A0\u8F7D</button>
        <button class="yyt-tde-btn" data-action="save" ${E.isDirty?"":"disabled"} title="\u4FDD\u5B58\u5230\u5F53\u524D\u6D88\u606F\u7684 slot"><i class="fa-solid fa-floppy-disk"></i> \u4FDD\u5B58\u5230 chat</button>
        <button class="yyt-tde-btn" data-action="save-global" title="\u4FDD\u5B58\u5230\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\uFF08\u5F71\u54CD\u6240\u6709 chat \u540E\u7EED\u586B\u8868\uFF09"><i class="fa-solid fa-globe"></i> \u4FDD\u5B58\u5230\u5168\u5C40</button>
        <button class="yyt-tde-btn yyt-tde-btn-primary" data-action="run-now"><i class="fa-solid fa-play"></i> \u7ACB\u5373\u586B\u8868</button>
      </div>
    </div>
  `}function _T(){let t=E.tempData||[],e=t.map((r,s)=>{let n=r?.name||`\u8868 ${s+1}`,o=Array.isArray(r?.rows)?r.rows.length:0;return`
      <div class="yyt-tde-sheet-item-wrap ${s===E.currentTableIndex?"active":""}">
        <button class="yyt-tde-sheet-item" data-sheet-index="${s}">
          <span class="yyt-tde-sheet-idx">[${s}]</span>
          <span class="yyt-tde-sheet-name">${Le(n)}</span>
          <span class="yyt-tde-sheet-count">${o}</span>
        </button>
        <div class="yyt-tde-sheet-actions">
          <button class="yyt-tde-btn-icon" data-action="sheet-move-up" data-sheet-index="${s}" title="\u4E0A\u79FB" ${s===0?"disabled":""}><i class="fa-solid fa-arrow-up"></i></button>
          <button class="yyt-tde-btn-icon" data-action="sheet-move-down" data-sheet-index="${s}" title="\u4E0B\u79FB" ${s===t.length-1?"disabled":""}><i class="fa-solid fa-arrow-down"></i></button>
          <button class="yyt-tde-btn-icon yyt-tde-btn-danger" data-action="sheet-delete" data-sheet-index="${s}" title="\u5220\u9664\u6B64\u8868"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `}).join("");return`
    <nav class="yyt-tde-sidebar">
      <div class="yyt-tde-sidebar-label">\u8868\u683C\u5217\u8868 (${t.length})</div>
      <div class="yyt-tde-sheet-list">
        ${e||'<div style="padding: 8px 10px; font-size: 11px; color: var(--tde-text-muted);">\u6682\u65E0\u8868</div>'}
      </div>
      <button class="yyt-tde-btn-add-field" data-action="sheet-add" style="margin: 10px;"><i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u65B0\u8868</button>
    </nav>
  `}function ET(){let t=E.tempData||[],e=E.currentTableIndex,r=e>=0&&e<t.length?t[e]:null;return E.mode==="global"?kT():t.length===0?'<div class="yyt-tde-empty">\u5F53\u524D slot \u6CA1\u6709\u8868\u6570\u636E\uFF0C\u6A21\u677F\u4E5F\u672A\u914D\u7F6E\u8868\u3002<br>\u8BF7\u5148\u5728\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u521D\u59CB\u5316\uFF0C\u6216\u5230\u300C\u9884\u8BBE\u7BA1\u7406 \u2192 \u8868\u683C\u6A21\u677F\u300D\u914D\u7F6E\u6A21\u677F\u3002</div>':r?E.mode==="data"?AT(r,e):E.mode==="schema"?CT(r,e):"":'<div class="yyt-tde-empty">\u8BF7\u4ECE\u5DE6\u4FA7\u9009\u62E9\u4E00\u5F20\u8868\u3002</div>'}function AT(t,e){let r=Array.isArray(t?.columns)?t.columns:[],s=Array.isArray(t?.rows)?t.rows:[],n=E.isFromTemplate?'<div class="yyt-tde-schema-hint" style="margin-bottom:12px;">\u5F53\u524D\u663E\u793A<b>\u6A21\u677F\u9ED8\u8BA4\u7ED3\u6784</b>\uFF08slot \u5C1A\u65E0\u6570\u636E\uFF09\u3002\u76F4\u63A5\u6DFB\u52A0\u884C\u6216\u7F16\u8F91\u4F1A\u521B\u5EFA slot \u6570\u636E\uFF1B\u6216\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u586B\u3002</div>':"",o=s.map((a,i)=>{let l=a?.cells||{},c=r.map(d=>{let u=d?.key||"",y=d?.title||u,p=l[u],f=p==null||p==="",g=f?"\uFF08\u7A7A\uFF09":String(p);return`
        <div class="yyt-tde-field">
          <div class="yyt-tde-field-label">${Le(y)}</div>
          <div class="yyt-tde-field-cell ${f?"yyt-tde-field-cell--empty":""}"
               contenteditable
               data-row-index="${i}"
               data-col-key="${Le(u)}">${Le(g)}</div>
        </div>
      `}).join("");return`
      <article class="yyt-tde-card" data-row-index="${i}">
        <header class="yyt-tde-card-header">
          <span class="yyt-tde-card-index">#${i+1}</span>
          <input class="yyt-tde-card-name" value="${Le(a?.name||"")}" data-row-name-index="${i}" placeholder="\u884C\u540D">
          <div class="yyt-tde-card-actions">
            <button class="yyt-tde-icon-btn danger" data-action="delete-row" data-row-index="${i}" title="\u5220\u9664\u884C"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </header>
        <div class="yyt-tde-card-body">${c||'<div style="padding:8px;color:var(--tde-text-muted);font-size:12px;">\u8BE5\u8868\u6CA1\u6709\u5217\u5B9A\u4E49</div>'}</div>
      </article>
    `}).join("");return`
    ${n}
    <div class="yyt-tde-card-grid">
      ${o}
      <button class="yyt-tde-card-add" data-action="add-row">
        <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u884C
      </button>
    </div>
  `}function CT(t,e){let r=Array.isArray(t?.columns)?t.columns:[],s=t?.sourceData||{},n=t?.aiInstructions||{},o=t?.updateConfig||{},a=r.map((i,l)=>`
    <div class="yyt-tde-schema-row yyt-tde-schema-field" data-field-index="${l}">
      <div class="yyt-tde-schema-field-head">
        <span class="yyt-tde-schema-idx">[${l}]</span>
        <input class="yyt-tde-input yyt-tde-input-title" data-action="field-title" data-field-index="${l}" value="${Le(i?.title||i?.key||"")}" placeholder="\u5B57\u6BB5\u6807\u9898" />
        <input class="yyt-tde-input yyt-tde-input-key" data-action="field-key" data-field-index="${l}" value="${Le(i?.key||"")}" placeholder="key" />
        <select class="yyt-tde-input yyt-tde-input-type" data-action="field-type" data-field-index="${l}">
          ${["text","number","boolean","date","json"].map(c=>`<option value="${c}" ${i?.type===c?"selected":""}>${c}</option>`).join("")}
        </select>
        <button class="yyt-tde-btn-icon yyt-tde-btn-danger" data-action="field-delete" data-field-index="${l}" title="\u5220\u9664\u6B64\u5B57\u6BB5"><i class="fa-solid fa-trash"></i></button>
      </div>
      <textarea class="yyt-tde-input yyt-tde-input-desc" data-action="field-desc" data-field-index="${l}" placeholder="\u5B57\u6BB5\u63CF\u8FF0">${Le(i?.description||"")}</textarea>
    </div>
  `).join("");return`
    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">\u57FA\u7840\u4FE1\u606F</div>
      <div class="yyt-tde-schema-row">
        <div class="yyt-tde-schema-key">\u8868\u540D</div>
        <div class="yyt-tde-schema-value">
          <input class="yyt-tde-input" data-action="table-name" value="${Le(t?.name||"")}" />
        </div>
      </div>
      <div class="yyt-tde-schema-row">
        <div class="yyt-tde-schema-key">UID</div>
        <div class="yyt-tde-schema-value"><code style="font-size:11px;color:var(--tde-accent);">${Le(t?.uid||t?.id||"")}</code></div>
      </div>
      <div class="yyt-tde-schema-row">
        <div class="yyt-tde-schema-key">\u8868\u8BF4\u660E</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="table-note" placeholder="\u8868\u7528\u9014\u8BF4\u660E + \u5217\u6CE8\u91CA">${Le(t?.note||s?.note||"")}</textarea>
        </div>
      </div>
    </div>

    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">AI \u64CD\u4F5C\u8BF4\u660E (sourceData)</div>
      <div class="yyt-tde-schema-row yyt-tde-schema-sd">
        <div class="yyt-tde-schema-key">\u521D\u59CB\u5316 (init)</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="sd-init" placeholder="\u8868\u4E3A\u7A7A\u65F6 AI \u5E94\u8BE5\u63D2\u5165\u4EC0\u4E48">${Le(n?.init||s?.initNode||"")}</textarea>
        </div>
      </div>
      <div class="yyt-tde-schema-row yyt-tde-schema-sd">
        <div class="yyt-tde-schema-key">\u65B0\u589E (insert)</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="sd-create" placeholder="\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u65B0\u589E\u884C">${Le(n?.create||s?.insertNode||"")}</textarea>
        </div>
      </div>
      <div class="yyt-tde-schema-row yyt-tde-schema-sd">
        <div class="yyt-tde-schema-key">\u66F4\u65B0 (update)</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="sd-update" placeholder="\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u66F4\u65B0\u884C">${Le(n?.update||s?.updateNode||"")}</textarea>
        </div>
      </div>
      <div class="yyt-tde-schema-row yyt-tde-schema-sd">
        <div class="yyt-tde-schema-key">\u5220\u9664 (delete)</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="sd-delete" placeholder="\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u5220\u9664\u884C">${Le(n?.delete||s?.deleteNode||"")}</textarea>
        </div>
      </div>
    </div>

    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">\u66F4\u65B0\u914D\u7F6E (updateConfig)</div>
      <div class="yyt-tde-hint" style="margin-bottom:8px;font-size:11px;color:var(--tde-text-muted);">
        <strong>\u8BF4\u660E</strong>\uFF1A\u8FD9\u91CC\u914D\u7F6E AI \u586B\u8868\u65F6\u8FD9\u5F20\u8868\u7684\u884C\u4E3A\uFF08\u9891\u7387\u3001\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u3001token \u8282\u7701\uFF09\u3002
        \u8DDF\u300C\u4E16\u754C\u4E66\u6CE8\u5165\u300D\u662F\u4E24\u4EF6\u4E8B\uFF1A\u4E16\u754C\u4E66\u662F\u628A\u8868\u6570\u636E\u585E\u8FDB prompt \u7ED9\u4E3B AI \u770B\uFF08\u5408\u5E76\u6761\u76EE / \u72EC\u7ACB\u6761\u76EE\u5728<strong>\u5168\u5C40\u6CE8\u5165</strong> tab \u914D\uFF09\uFF0C
        \u8FD9\u91CC\u662F\u63A7\u5236<strong>\u586B\u8868\u65F6\u673A</strong>\uFF08\u591A\u4E45\u586B\u4E00\u6B21\u3001\u8DF3\u8FC7\u51E0\u5C42\u7B49\uFF09\u3002-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\u5355\u8868\u3002
      </div>
      <div class="yyt-tde-uc-grid">
        <div class="yyt-tde-uc-cell">
          <label>\u4E0A\u4E0B\u6587\u6DF1\u5EA6 (contextDepth)</label>
          <input type="number" class="yyt-tde-input" data-action="uc-contextDepth" value="${Number.isFinite(o?.contextDepth)?o.contextDepth:-1}" min="-1" />
          <span class="yyt-tde-hint">-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\uFF0CN = \u6700\u8FD1 N \u6761\u6D88\u606F</span>
        </div>
        <div class="yyt-tde-uc-cell">
          <label>\u66F4\u65B0\u9891\u7387 (updateFrequency)</label>
          <input type="number" class="yyt-tde-input" data-action="uc-updateFrequency" value="${Number.isFinite(o?.updateFrequency)?o.updateFrequency:-1}" min="-1" />
          <span class="yyt-tde-hint">-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\u81EA\u52A8\u586B\u8868\uFF0CN = \u6BCF N \u6761\u6D88\u606F\u89E6\u53D1\u4E00\u6B21</span>
        </div>
        <div class="yyt-tde-uc-cell">
          <label>\u6279\u6B21\u5927\u5C0F (batchSize)</label>
          <input type="number" class="yyt-tde-input" data-action="uc-batchSize" value="${Number.isFinite(o?.batchSize)?o.batchSize:-1}" min="-1" />
          <span class="yyt-tde-hint">-1 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u5355\u6B21\u6700\u591A\u5904\u7406 N \u5F20\u8868</span>
        </div>
        <div class="yyt-tde-uc-cell">
          <label>\u8DF3\u8FC7\u697C\u5C42 (skipFloors)</label>
          <input type="number" class="yyt-tde-input" data-action="uc-skipFloors" value="${Number.isFinite(o?.skipFloors)?o.skipFloors:-1}" min="-1" />
          <span class="yyt-tde-hint">-1 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u8DF3\u8FC7\u6700\u8FD1 N \u5C42</span>
        </div>
        <div class="yyt-tde-uc-cell">
          <label>\u53D1\u9001\u6700\u65B0 N \u884C (sendLatestRows)</label>
          <input type="number" class="yyt-tde-input" data-action="uc-sendLatestRows" value="${Number.isFinite(o?.sendLatestRows)?o.sendLatestRows:-1}" min="-1" />
          <span class="yyt-tde-hint">-1 = \u5168\u90E8\u53D1\u9001\uFF0C0 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u4EC5\u53D1\u9001\u6700\u65B0 N \u884C\uFF08\u5927\u8868 token \u8282\u7701\uFF09</span>
        </div>
        <div class="yyt-tde-uc-cell">
          <label>\u5206\u7EC4 ID (groupId)</label>
          <input class="yyt-tde-input" data-action="uc-groupId" value="${Le(o?.groupId||"")}" placeholder="\u540C\u7EC4 ID \u7684\u8868\u4F1A\u5408\u5E76\u89E6\u53D1" />
          <span class="yyt-tde-hint">\u540C\u7EC4\u540C\u65F6\u89E6\u53D1\uFF0C\u8DE8\u7EC4\u5E76\u884C\uFF08\u7559\u7A7A = \u72EC\u7ACB\u89E6\u53D1\uFF09</span>
        </div>
        <div class="yyt-tde-uc-cell yyt-tde-uc-cell-wide">
          <label>\u8868\u7EA7 API \u9884\u8BBE\u8986\u76D6</label>
          <input class="yyt-tde-input" data-action="uc-apiPreset" value="${Le(o?.apiPreset||"")}" placeholder="\u7559\u7A7A = \u6CBF\u7528\u5168\u5C40\uFF0C\u586B\u9884\u8BBE\u540D = \u8FD9\u5F20\u8868\u7528\u8FD9\u4E2A" />
          <span class="yyt-tde-hint">\u4F8B\uFF1A\u89D2\u8272\u8868\u7528 Claude\u3001\u7EAA\u8981\u8868\u7528 GPT</span>
        </div>
      </div>
    </div>

    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">\u5B57\u6BB5\u5B9A\u4E49 (${r.length})</div>
      ${a||'<div style="color:var(--tde-text-muted);font-size:12px;padding:8px 0;">\u65E0\u5B57\u6BB5</div>'}
      <button class="yyt-tde-btn yyt-tde-btn-add-field" data-action="field-add"><i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u5B57\u6BB5</button>
    </div>
  `}function kT(){let t=Array.isArray(E.tempData)?E.tempData:[];if(t.length===0)return'<div class="yyt-tde-empty">\u65E0\u8868\u683C\u53EF\u914D\u7F6E\u3002\u8BF7\u5148\u6DFB\u52A0\u8868\u683C\u3002</div>';let e="yyt-table-workbench";try{e=ke()?.mirrorTag||e}catch{}let r=t.map((s,n)=>{let o=s?.exportConfig||{},a=o.entryPlacement||{},i=o.extraIndexPlacement||{};return`
      <div class="yyt-tde-global-card" data-table-index="${n}">
        <div class="yyt-tde-global-card-head">
          <span class="yyt-tde-global-card-name">${Le(s?.name||`\u8868 ${n+1}`)}</span>
          <label class="yyt-tde-toggle-inline">
            <input type="checkbox" data-action="ec-enabled" data-table-index="${n}" ${o.enabled===!0?"checked":""} />
            <span>\u542F\u7528\u72EC\u7ACB\u6CE8\u5165</span>
          </label>
        </div>
        <div class="yyt-tde-global-card-body ${o.enabled===!0?"":"yyt-tde-disabled-section"}">
          <div class="yyt-tde-uc-grid">
            <div class="yyt-tde-uc-cell">
              <label>\u6761\u76EE\u540D (entryName)</label>
              <input class="yyt-tde-input" data-action="ec-entryName" data-table-index="${n}" value="${Le(o.entryName||s?.name||"")}" />
            </div>
            <div class="yyt-tde-uc-cell">
              <label>\u6761\u76EE\u7C7B\u578B (entryType)</label>
              <select class="yyt-tde-input" data-action="ec-entryType" data-table-index="${n}">
                <option value="constant" ${o.entryType==="constant"?"selected":""}>constant (\u5E38\u9A7B)</option>
                <option value="keyword" ${o.entryType==="keyword"?"selected":""}>keyword (\u5173\u952E\u8BCD\u89E6\u53D1)</option>
              </select>
            </div>
            <div class="yyt-tde-uc-cell yyt-tde-uc-cell-wide">
              <label>\u89E6\u53D1\u5173\u952E\u8BCD (keywords)</label>
              <input class="yyt-tde-input" data-action="ec-keywords" data-table-index="${n}" value="${Le(o.keywords||"")}" placeholder="\u7528\u9017\u53F7\u6216\u6362\u884C\u5206\u9694" />
            </div>
            <div class="yyt-tde-uc-cell">
              <label>\u6309\u884C\u62C6\u5206 (splitByRow)</label>
              <select class="yyt-tde-input" data-action="ec-splitByRow" data-table-index="${n}">
                <option value="false" ${o.splitByRow?"":"selected"}>\u5426\uFF08\u6574\u5F20\u8868\u4E00\u4E2A\u6761\u76EE\uFF09</option>
                <option value="true" ${o.splitByRow?"selected":""}>\u662F\uFF08\u6BCF\u884C\u4E00\u4E2A\u6761\u76EE\uFF09</option>
              </select>
            </div>
            <div class="yyt-tde-uc-cell">
              <label>\u9632\u9012\u5F52 (preventRecursion)</label>
              <select class="yyt-tde-input" data-action="ec-preventRecursion" data-table-index="${n}">
                <option value="true" ${o.preventRecursion!==!1?"selected":""}>\u662F</option>
                <option value="false" ${o.preventRecursion===!1?"selected":""}>\u5426</option>
              </select>
            </div>
            <div class="yyt-tde-uc-cell yyt-tde-uc-cell-wide">
              <label>\u6CE8\u5165\u6A21\u677F (injectionTemplate)</label>
              <textarea class="yyt-tde-input" data-action="ec-injectionTemplate" data-table-index="${n}" placeholder="\u4F8B\uFF1A\u4EE5\u4E0B\u662F {{tableName}} \u7684\u6700\u65B0\u6570\u636E\uFF1A{{tableContent}}">${Le(o.injectionTemplate||"")}</textarea>
            </div>
          </div>

          <div class="yyt-tde-schema-heading" style="margin-top:12px;">\u6761\u76EE\u4F4D\u7F6E (entryPlacement)</div>
          <div class="yyt-tde-uc-grid">
            <div class="yyt-tde-uc-cell">
              <label>position</label>
              <select class="yyt-tde-input" data-action="ec-ep-position" data-table-index="${n}">
                ${["before_character_definition","after_character_definition","before_authors_note","after_authors_note"].map(l=>`<option value="${l}" ${(a.position||"before_character_definition")===l?"selected":""}>${l}</option>`).join("")}
              </select>
            </div>
            <div class="yyt-tde-uc-cell">
              <label>depth</label>
              <input type="number" class="yyt-tde-input" data-action="ec-ep-depth" data-table-index="${n}" value="${Number.isFinite(a.depth)?a.depth:2}" />
            </div>
            <div class="yyt-tde-uc-cell">
              <label>order</label>
              <input type="number" class="yyt-tde-input" data-action="ec-ep-order" data-table-index="${n}" value="${Number.isFinite(a.order)?a.order:0}" />
            </div>
          </div>

          <div class="yyt-tde-schema-heading" style="margin-top:12px;">\u989D\u5916\u7D22\u5F15\u4F4D\u7F6E (extraIndexPlacement\uFF0C\u53EF\u9009)</div>
          <div class="yyt-tde-uc-grid">
            <div class="yyt-tde-uc-cell">
              <label>position</label>
              <select class="yyt-tde-input" data-action="ec-exi-position" data-table-index="${n}">
                ${["before_character_definition","after_character_definition","before_authors_note","after_authors_note"].map(l=>`<option value="${l}" ${(i.position||"before_character_definition")===l?"selected":""}>${l}</option>`).join("")}
              </select>
            </div>
            <div class="yyt-tde-uc-cell">
              <label>depth</label>
              <input type="number" class="yyt-tde-input" data-action="ec-exi-depth" data-table-index="${n}" value="${Number.isFinite(i.depth)?i.depth:2}" />
            </div>
            <div class="yyt-tde-uc-cell">
              <label>order</label>
              <input type="number" class="yyt-tde-input" data-action="ec-exi-order" data-table-index="${n}" value="${Number.isFinite(i.order)?i.order:0}" />
            </div>
          </div>
        </div>
      </div>
    `}).join("");return`
    <div class="yyt-tde-schema-hint" style="background:rgba(74,158,255,0.08);border-color:rgba(74,158,255,0.3);">
      <strong>\u5168\u5C40\u6CE8\u5165\u914D\u7F6E</strong> \u2014 \u6BCF\u5F20\u8868\u7684 exportConfig\uFF08\u72EC\u7ACB\u4E16\u754C\u4E66\u6761\u76EE\uFF09+ placement\uFF08\u6CE8\u5165\u4F4D\u7F6E/\u6DF1\u5EA6/\u987A\u5E8F\uFF09\u3002
      \u672A\u542F\u7528\u300C\u72EC\u7ACB\u6CE8\u5165\u300D\u7684\u8868\u4F1A\u8D70\u5168\u5C40 wrapper\uFF08\u5DE5\u4F5C\u53F0\u300C\u540C\u6B65\u5230\u4E16\u754C\u4E66\u300D\u5F00\u5173\uFF09\u3002
    </div>
    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">\u5199\u56DE\u6B63\u6587\u6807\u7B7E</div>
      <div class="yyt-tde-uc-grid">
        <div class="yyt-tde-uc-cell yyt-tde-uc-cell-wide">
          <label>mirrorTag</label>
          <input class="yyt-tde-input" data-action="mirror-tag" value="${Le(e)}" placeholder="\u9ED8\u8BA4: yyt-table-workbench" />
          <span class="yyt-tde-hint">\u5F00\u542F\u5199\u56DE\u6B63\u6587\u65F6\uFF0C\u7528\u6B64 XML \u6807\u7B7E\u5305\u88F9\u8868\u683C\u6570\u636E\u6CE8\u5165\u5230 assistant \u6D88\u606F</span>
        </div>
      </div>
    </div>
    ${r}
  `}function at(){if(!E.$window)return;E.$window.find(".yyt-window-body").html(hg()),xg(E.$window)}function xg(t){let e=window.jQuery||window.parent?.jQuery;if(!e||!t||!t.on)return;t.off(".tde"),t.on("click.tde",".yyt-tde-mode-switch button[data-mode]",function(){let i=e(this).attr("data-mode");i&&i!==E.mode&&(E.mode=i,at())}),t.on("click.tde","[data-sheet-index]",function(){let i=Number(e(this).attr("data-sheet-index"));Number.isFinite(i)&&i!==E.currentTableIndex&&(E.currentTableIndex=i,at())});let r=()=>(Array.isArray(E.tempData)?E.tempData:[])[E.currentTableIndex]||null;t.on("input.tde",'[data-action="table-name"]',function(){let i=r();i&&(i.name=e(this).val(),Ne())}),t.on("input.tde",'[data-action="table-note"]',function(){let i=r();i&&(i.note=e(this).val(),Ne())}),Object.entries({"sd-init":"init","sd-create":"create","sd-update":"update","sd-delete":"delete"}).forEach(([i,l])=>{t.on("input.tde",`[data-action="${i}"]`,function(){let c=r();c&&(c.aiInstructions=c.aiInstructions||{},c.aiInstructions[l]=e(this).val(),Ne())})}),["contextDepth","updateFrequency","batchSize","skipFloors","sendLatestRows"].forEach(i=>{t.on("input.tde",`[data-action="uc-${i}"]`,function(){let l=r();if(!l)return;l.updateConfig=l.updateConfig||{};let c=Number(e(this).val());l.updateConfig[i]=Number.isFinite(c)?c:-1,Ne()})}),t.on("input.tde",'[data-action="uc-groupId"]',function(){let i=r();i&&(i.updateConfig=i.updateConfig||{},i.updateConfig.groupId=e(this).val(),Ne())}),t.on("input.tde",'[data-action="uc-apiPreset"]',function(){let i=r();i&&(i.updateConfig=i.updateConfig||{},i.updateConfig.apiPreset=e(this).val(),Ne())}),t.on("input.tde",'[data-action="field-title"]',function(){let i=r();if(!i)return;let l=Number(e(this).attr("data-field-index"));!Array.isArray(i.columns)||!i.columns[l]||(i.columns[l].title=e(this).val(),Ne())}),t.on("input.tde",'[data-action="field-key"]',function(){let i=r();if(!i)return;let l=Number(e(this).attr("data-field-index"));!Array.isArray(i.columns)||!i.columns[l]||(i.columns[l].key=e(this).val(),Ne())}),t.on("change.tde",'[data-action="field-type"]',function(){let i=r();if(!i)return;let l=Number(e(this).attr("data-field-index"));!Array.isArray(i.columns)||!i.columns[l]||(i.columns[l].type=e(this).val(),Ne())}),t.on("input.tde",'[data-action="field-desc"]',function(){let i=r();if(!i)return;let l=Number(e(this).attr("data-field-index"));!Array.isArray(i.columns)||!i.columns[l]||(i.columns[l].description=e(this).val(),Ne())}),t.on("click.tde",'[data-action="field-delete"]',function(){let i=r();if(!i)return;let l=Number(e(this).attr("data-field-index"));!Array.isArray(i.columns)||!i.columns[l]||window.confirm(`\u5220\u9664\u5B57\u6BB5\u300C${i.columns[l].title||i.columns[l].key}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u4F1A\u81EA\u52A8\u6E05\u7406\u884C\u6570\u636E\u3002`)&&(i.columns.splice(l,1),Ne(),at())}),t.on("click.tde",'[data-action="field-add"]',function(){let i=r();if(!i)return;i.columns=Array.isArray(i.columns)?i.columns:[];let l=new Set(i.columns.map(d=>d?.key).filter(Boolean)),c=i.columns.length+1;for(;l.has(`col_${c}`);)c++;i.columns.push({key:`col_${c}`,title:`\u5B57\u6BB5${c}`,description:"",type:"text",required:!1}),Ne(),at()}),t.on("input.tde",'[data-action="mirror-tag"]',function(){E._pendingMirrorTag=e(this).val(),Ne()});let o=(i,l,c)=>{let d=E.tempData?.[i];d&&(d.exportConfig=d.exportConfig||{},d.exportConfig[l]=c,Ne())},a=(i,l,c,d)=>{let u=E.tempData?.[i];u&&(u.exportConfig=u.exportConfig||{},u.exportConfig[l]=u.exportConfig[l]||{},u.exportConfig[l][c]=d,Ne())};t.on("change.tde",'[data-action="ec-enabled"]',function(){o(Number(e(this).attr("data-table-index")),"enabled",e(this).is(":checked")),at()}),t.on("input.tde",'[data-action="ec-entryName"]',function(){o(Number(e(this).attr("data-table-index")),"entryName",e(this).val())}),t.on("change.tde",'[data-action="ec-entryType"]',function(){o(Number(e(this).attr("data-table-index")),"entryType",e(this).val())}),t.on("input.tde",'[data-action="ec-keywords"]',function(){o(Number(e(this).attr("data-table-index")),"keywords",e(this).val())}),t.on("change.tde",'[data-action="ec-splitByRow"]',function(){o(Number(e(this).attr("data-table-index")),"splitByRow",e(this).val()==="true")}),t.on("change.tde",'[data-action="ec-preventRecursion"]',function(){o(Number(e(this).attr("data-table-index")),"preventRecursion",e(this).val()!=="false")}),t.on("input.tde",'[data-action="ec-injectionTemplate"]',function(){o(Number(e(this).attr("data-table-index")),"injectionTemplate",e(this).val())}),t.on("change.tde",'[data-action="ec-ep-position"]',function(){a(Number(e(this).attr("data-table-index")),"entryPlacement","position",e(this).val())}),t.on("input.tde",'[data-action="ec-ep-depth"]',function(){a(Number(e(this).attr("data-table-index")),"entryPlacement","depth",Number(e(this).val())||0)}),t.on("input.tde",'[data-action="ec-ep-order"]',function(){a(Number(e(this).attr("data-table-index")),"entryPlacement","order",Number(e(this).val())||0)}),t.on("change.tde",'[data-action="ec-exi-position"]',function(){a(Number(e(this).attr("data-table-index")),"extraIndexPlacement","position",e(this).val())}),t.on("input.tde",'[data-action="ec-exi-depth"]',function(){a(Number(e(this).attr("data-table-index")),"extraIndexPlacement","depth",Number(e(this).val())||0)}),t.on("input.tde",'[data-action="ec-exi-order"]',function(){a(Number(e(this).attr("data-table-index")),"extraIndexPlacement","order",Number(e(this).val())||0)}),t.on("click.tde",'[data-action="sheet-move-up"]',function(i){i.stopPropagation();let l=Number(e(this).attr("data-sheet-index"));if(!Array.isArray(E.tempData)||l<=0)return;let c=E.tempData;[c[l-1],c[l]]=[c[l],c[l-1]],E.currentTableIndex===l?E.currentTableIndex=l-1:E.currentTableIndex===l-1&&(E.currentTableIndex=l),Ne(),at()}),t.on("click.tde",'[data-action="sheet-move-down"]',function(i){i.stopPropagation();let l=Number(e(this).attr("data-sheet-index"));if(!Array.isArray(E.tempData)||l>=E.tempData.length-1)return;let c=E.tempData;[c[l],c[l+1]]=[c[l+1],c[l]],E.currentTableIndex===l?E.currentTableIndex=l+1:E.currentTableIndex===l+1&&(E.currentTableIndex=l),Ne(),at()}),t.on("click.tde",'[data-action="sheet-delete"]',function(i){i.stopPropagation();let l=Number(e(this).attr("data-sheet-index"));if(!Array.isArray(E.tempData)||!E.tempData[l])return;let c=E.tempData[l];window.confirm(`\u5220\u9664\u8868\u300C${c.name||`\u8868 ${l+1}`}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`)&&(E.tempData.splice(l,1),E.currentTableIndex>=E.tempData.length&&(E.currentTableIndex=Math.max(0,E.tempData.length-1)),Ne(),at())}),t.on("click.tde",'[data-action="sheet-add"]',function(){let i=window.prompt("\u65B0\u8868\u540D\uFF1A",`\u8868 ${(E.tempData?.length||0)+1}`);if(!i||!i.trim())return;E.tempData=Array.isArray(E.tempData)?E.tempData:[];let l=new Set(E.tempData.map(u=>u?.id).filter(Boolean)),c=E.tempData.length+1,d=`sheet_${Date.now().toString(36)}_${c}`;for(;l.has(d);)c++,d=`sheet_${Date.now().toString(36)}_${c}`;E.tempData.push({id:d,name:i.trim(),enabled:!0,note:"",aiInstructions:{init:"",create:"",update:"",delete:""},updateConfig:{},exportConfig:{enabled:!1},columns:[{key:"col_1",title:"\u5B57\u6BB51",description:"",type:"text",required:!1}],rows:[]}),E.currentTableIndex=E.tempData.length-1,Ne(),at()}),t.on("click.tde",'[data-action="reload"]',()=>{if(E.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u91CD\u65B0\u52A0\u8F7D\u5C06\u4E22\u5F03\uFF0C\u786E\u5B9A\uFF1F"))return;let i=E.tempData?.[0];it().info("reload \u89E6\u53D1",{before:{tableCount:E.tempData?.length,firstName:i?.name,firstAiInit:i?.aiInstructions?.init?.slice(0,50),firstUcFreq:i?.updateConfig?.updateFrequency},targetSnapshot:{messageId:E.targetSnapshot?.sourceMessageId,isFromTemplate:E.isFromTemplate}}),Ec();let l=E.tempData?.[0];it().info("reload \u5B8C\u6210",{after:{tableCount:E.tempData?.length,firstName:l?.name,firstAiInit:l?.aiInstructions?.init?.slice(0,50),firstUcFreq:l?.updateConfig?.updateFrequency,isFromTemplate:E.isFromTemplate}}),at(),C("success","\u5DF2\u91CD\u65B0\u52A0\u8F7D")}),t.on("click.tde",'[data-action="save"]',async()=>{if(!E.isDirty){C("info","\u6CA1\u6709\u4FEE\u6539");return}try{let i=E.targetSnapshot;if(i?.sourceMessageId||(i=await cc()),!i?.sourceMessageId){C("error","\u65E0\u6CD5\u5B9A\u4F4D\u5F53\u524D\u6D88\u606F\uFF08\u627E\u4E0D\u5230 assistant \u6D88\u606F\uFF09");return}let l=await Ga(i,{tables:ae(E.tempData)||[],meta:{source:"data-editor-manual-save"}},{skipFreshValidation:!0});it().info("save-chat commitBoundState \u7ED3\u679C",{success:l?.success,error:l?.error,commitMessageId:l?.sourceMessageId,commitSlotRevisionKey:l?.slotRevisionKey,stateTablesLen:Array.isArray(l?.state?.tables)?l.state.tables.length:null,firstTableInState:l?.state?.tables?.[0]?.name,firstAiInitInState:l?.state?.tables?.[0]?.aiInstructions?.init?.slice(0,50)}),l?.success?(gg(),E.targetSnapshot={chatId:l.state?.chatId||i.chatId,sourceMessageId:l.sourceMessageId,sourceSwipeId:l.state?.sourceSwipeId||i.sourceSwipeId,effectiveSwipeId:i.effectiveSwipeId,slotBindingKey:l.state?.slotBindingKey||i.slotBindingKey,slotRevisionKey:l.slotRevisionKey,slotTransactionId:i.slotTransactionId,traceId:i.traceId,targetMessageIndex:l.messageIndex??i.targetMessageIndex},Array.isArray(l?.state?.tables)&&(E.tempData=ae(l.state.tables)||[],E.isFromTemplate=!1),C("success","\u5DF2\u4FDD\u5B58\u5230 chat"),at()):C("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.error||"\u672A\u77E5"}`)}catch(i){it().error("\u4FDD\u5B58\u5F02\u5E38",i),C("error",`\u4FDD\u5B58\u5F02\u5E38\uFF1A${i?.message||i}`)}}),t.on("click.tde",'[data-action="save-global"]',async()=>{if(!Array.isArray(E.tempData)||E.tempData.length===0){C("info","\u6CA1\u6709\u53EF\u4FDD\u5B58\u7684\u6570\u636E");return}if(window.confirm("\u4FDD\u5B58\u5230\u300C\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u300D\u4F1A\u5F71\u54CD\u540E\u7EED\u6240\u6709 chat \u7684\u65B0\u586B\u8868\uFF08\u5DF2\u6709 slot \u6570\u636E\u4E0D\u53D7\u5F71\u54CD\uFF09\u3002\u7EE7\u7EED\uFF1F"))try{let i=fn();if(!i?.id){C("error","\u6CA1\u6709\u53EF\u7528\u7684\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F");return}let l=(E.tempData||[]).map(d=>({id:d?.id||d?.uid,name:d?.name||"",note:d?.note||"",enabled:d?.enabled!==!1,aiInstructions:d?.aiInstructions||{},updateConfig:d?.updateConfig||{},exportConfig:d?.exportConfig||{},columns:Array.isArray(d?.columns)?ae(d.columns):[],rows:[]})),c=Fr({...i,tables:l});if(c?.success){if(typeof E._pendingMirrorTag=="string"&&E._pendingMirrorTag.trim())try{let d=ke();st({...d,mirrorTag:E._pendingMirrorTag.trim()})}catch(d){it().warn("\u4FDD\u5B58 mirrorTag \u5230 workbench config \u5931\u8D25",d)}E._pendingMirrorTag=null,gg(),C("success",`\u5DF2\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u300C${i.name}\u300D`),it().info("\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u6210\u529F",{templateId:i.id,name:i.name,tableCount:l.length}),at()}else C("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${c?.error||"\u672A\u77E5"}`)}catch(i){it().error("\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u5F02\u5E38",i),C("error",`\u4FDD\u5B58\u5F02\u5E38\uFF1A${i?.message||i}`)}}),t.on("click.tde",'[data-action="run-now"]',async()=>{if(!(E.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u7ACB\u5373\u586B\u8868\u4F1A\u5148\u4E22\u5F03\u8FD9\u4E9B\u4FEE\u6539\uFF0C\u786E\u5B9A\uFF1F")))try{let i=await Eo();i?.success?(C("success","\u586B\u8868\u5B8C\u6210"),Ec(),at()):C("error",`\u586B\u8868\u5931\u8D25\uFF1A${i?.error||"\u672A\u77E5"}`)}catch(i){it().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",i),C("error",`\u5F02\u5E38\uFF1A${i?.message||i}`)}}),t.on("input.tde","[data-row-index][data-col-key]",function(){let i=Number(e(this).attr("data-row-index")),l=e(this).attr("data-col-key"),c=e(this).text();if(!Number.isFinite(i)||!l)return;let d=E.tempData[E.currentTableIndex];d?.rows?.[i]&&(d.rows[i].cells||(d.rows[i].cells={}),d.rows[i].cells[l]=c,Ne(),mg())}),t.on("input.tde","[data-row-name-index]",function(){let i=Number(e(this).attr("data-row-name-index"));if(!Number.isFinite(i))return;let l=E.tempData[E.currentTableIndex];l?.rows?.[i]&&(l.rows[i].name=e(this).val(),Ne(),mg())}),t.on("click.tde",'[data-action="delete-row"]',function(){let i=Number(e(this).attr("data-row-index"));if(!Number.isFinite(i)||!window.confirm(`\u786E\u5B9A\u5220\u9664\u7B2C ${i+1} \u884C\uFF1F`))return;let l=E.tempData[E.currentTableIndex];l?.rows&&(l.rows.splice(i,1),Ne(),at())}),t.on("click.tde",'[data-action="add-row"]',()=>{let i=E.tempData[E.currentTableIndex];i&&(Array.isArray(i.rows)||(i.rows=[]),i.rows.push({id:Xn("row"),name:"",cells:{}}),Ne(),at())})}function mg(){if(!E.$window)return;let t=E.$window.find(".yyt-tde-toolbar");!t||!t.length||t.replaceWith(bg())}function Ac(t={}){if(console.log("[YYT][TableDataEditor] openTableDataEditor called",{options:t}),it().info("openTableDataEditor \u8C03\u7528",{options:t}),ST(),!(window.jQuery||window.parent?.jQuery)){let s="jQuery \u4E0D\u53EF\u7528\uFF08window.jQuery \u548C window.parent.jQuery \u90FD\u662F undefined\uFF09";console.error("[YYT][TableDataEditor]",s),it().error(s);try{C("error",`\u6570\u636E\u7F16\u8F91\u5668\u6253\u5F00\u5931\u8D25\uFF1A${s}`)}catch{}return null}if(console.log("[YYT][TableDataEditor] jQuery \u53EF\u7528"),E.$window&&E.$window.length&&document.body.contains(E.$window[0])){if(t.focusTableUid){let n=(E.tempData||[]).findIndex(o=>(o?.uid||o?.id)===t.focusTableUid);n>=0&&(E.currentTableIndex=n)}return t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(E.mode=t.focusMode),at(),E.$window}if(Ec(),console.log("[YYT][TableDataEditor] loadEditorData \u5B8C\u6210\uFF0CtempData \u8868\u6570:",E.tempData?.length),t.focusTableUid){let n=(E.tempData||[]).findIndex(o=>(o?.uid||o?.id)===t.focusTableUid);n>=0&&(E.currentTableIndex=n)}t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(E.mode=t.focusMode),console.log("[YYT][TableDataEditor] \u5373\u5C06\u8C03 createWindow");let r;try{r=vc({id:vT,title:"\u586B\u8868\u6570\u636E\u7F16\u8F91\u5668",content:hg(),width:1200,height:800,modal:!1,resizable:!0,maximizable:!0,rememberState:!0,onReady:s=>{console.log("[YYT][TableDataEditor] onReady triggered",{$el:!!s}),E.$window=s,xg(s)},onClose:()=>{E.isDirty&&it().warn("\u6570\u636E\u7F16\u8F91\u5668\u5173\u95ED\u65F6\u6709\u672A\u4FDD\u5B58\u4FEE\u6539"),E.$window=null}}),console.log("[YYT][TableDataEditor] createWindow \u8FD4\u56DE:",!!r)}catch(s){console.error("[YYT][TableDataEditor] createWindow \u629B\u9519:",s),it().error("createWindow \u629B\u9519",s);try{C("error",`\u521B\u5EFA\u7A97\u53E3\u5931\u8D25\uFF1A${s?.message||s}`)}catch{}return null}return r}var vT,Sc,E,TT,_c,wg=D(()=>{Tc();W();vo();Ua();Qa();an();rr();je();Ss();Ge();vT="yyt-table-data-editor";E={$window:null,mode:"data",tempData:null,currentTableIndex:-1,isDirty:!1,isFromTemplate:!1,_pendingMirrorTag:null,targetSnapshot:null};TT=`
.yyt-tde {
  --tde-canvas: var(--yyt-bg-base, #0a0d13);
  --tde-surface-1: var(--yyt-surface, #0f1219);
  --tde-surface-2: var(--yyt-surface-2, #151a24);
  --tde-surface-3: var(--yyt-surface-3, #1c2231);
  --tde-hairline: var(--yyt-border, rgba(255,255,255,0.06));
  --tde-hairline-strong: var(--yyt-border-strong, rgba(255,255,255,0.12));
  --tde-text: var(--yyt-text, rgba(255,255,255,0.92));
  --tde-text-secondary: var(--yyt-text-secondary, rgba(255,255,255,0.55));
  --tde-text-muted: var(--yyt-text-muted, rgba(255,255,255,0.35));
  --tde-accent: var(--yyt-accent, #7bb7ff);
  --tde-accent-soft: var(--yyt-accent-soft, rgba(123,183,255,0.15));
  --tde-accent-strong: var(--yyt-accent-strong, #a5d4ff);
  --tde-on-accent: var(--yyt-on-accent, #0a0d13);
  --tde-success: #4ade80;
  --tde-warning: #fbbf24;
  --tde-error: #ef4444;
  --tde-warning-soft: rgba(251,191,36,0.14);

  display: flex; flex-direction: column;
  height: 100%;
  background: transparent;
  color: var(--tde-text);
  font-size: 13px; line-height: 1.5;
}

/* toolbar */
.yyt-tde-toolbar {
  flex: 0 0 52px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--tde-hairline);
  background: var(--tde-surface-1);
}
.yyt-tde-toolbar-left { display: flex; align-items: center; gap: 12px; }
.yyt-tde-mode-switch {
  display: inline-flex; gap: 2px; padding: 2px;
  border-radius: 6px;
  background: var(--tde-surface-2);
  border: 1px solid var(--tde-hairline);
}
.yyt-tde-mode-switch button {
  border: none; background: transparent;
  color: var(--tde-text-secondary);
  padding: 6px 12px; border-radius: 4px;
  font-size: 12px; font-weight: 600; cursor: pointer;
  transition: background 0.12s ease, color 0.12s ease;
  font-family: inherit;
}
.yyt-tde-mode-switch button:hover:not(.active) { color: var(--tde-text); background: rgba(255,255,255,0.04); }
.yyt-tde-mode-switch button.active { background: var(--tde-accent); color: var(--tde-on-accent); font-weight: 700; }

.yyt-tde-dirty-badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 3px 9px; border-radius: 999px;
  font-size: 11px; font-weight: 700;
  color: var(--tde-warning); background: var(--tde-warning-soft);
  border: 1px solid rgba(251,191,36,0.2);
}
.yyt-tde-dirty-badge::before {
  content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--tde-warning);
}

.yyt-tde-actions { display: flex; gap: 8px; }
.yyt-tde-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--tde-hairline-strong);
  border-radius: 6px;
  background: var(--tde-surface-2);
  color: var(--tde-text-secondary);
  font-size: 12px; font-weight: 600; cursor: pointer;
  transition: all 0.12s ease;
  font-family: inherit;
}
.yyt-tde-btn:hover { background: var(--tde-surface-3); color: var(--tde-text); }
.yyt-tde-btn-primary {
  background: var(--tde-accent); color: var(--tde-on-accent);
  border-color: transparent; font-weight: 700;
}
.yyt-tde-btn-primary:hover { background: var(--tde-accent-strong); }
.yyt-tde-btn:disabled {
  opacity: 0.5; cursor: not-allowed; pointer-events: none;
}

/* content */
.yyt-tde-content { flex: 1; min-height: 0; display: flex; overflow: hidden; }

/* sidebar */
.yyt-tde-sidebar {
  flex: 0 0 220px;
  background: var(--tde-surface-1);
  border-right: 1px solid var(--tde-hairline);
  padding: 14px 10px 12px;
  display: flex; flex-direction: column;
  overflow-y: auto;
}
.yyt-tde-sidebar-label {
  font-size: 10px; font-weight: 700; color: var(--tde-text-muted);
  text-transform: uppercase; letter-spacing: 0.5px;
  padding: 0 8px 10px;
}
.yyt-tde-sheet-list { display: flex; flex-direction: column; gap: 2px; }
.yyt-tde-sheet-item {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 10px; border-radius: 6px;
  background: transparent; border: 1px solid transparent;
  color: var(--tde-text-secondary); font-size: 13px; font-weight: 600;
  cursor: pointer; text-align: left; width: 100%;
  transition: background 0.12s ease, color 0.12s ease;
  font-family: inherit;
}
.yyt-tde-sheet-item:hover { background: var(--tde-surface-2); color: var(--tde-text); }
.yyt-tde-sheet-item.active {
  background: var(--tde-accent-soft); color: var(--tde-accent-strong);
  border-color: rgba(123,183,255,0.18);
}
.yyt-tde-sheet-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.yyt-tde-sheet-count {
  flex-shrink: 0; font-size: 10px; font-weight: 700;
  padding: 1px 6px; border-radius: 999px;
  color: var(--tde-text-muted); background: rgba(255,255,255,0.04);
}
.yyt-tde-sheet-item.active .yyt-tde-sheet-count { color: var(--tde-accent); background: rgba(123,183,255,0.12); }

/* v1.0.194 Task M3: sidebar \u8868\u987A\u5E8F\u64CD\u4F5C */
.yyt-tde-sheet-item-wrap {
  display: flex; align-items: center; gap: 2px;
  border-radius: 6px;
  padding: 0 2px;
}
.yyt-tde-sheet-item-wrap.active { background: var(--tde-accent-soft); }
.yyt-tde-sheet-item-wrap .yyt-tde-sheet-item {
  flex: 1; padding: 6px 8px;
}
.yyt-tde-sheet-actions {
  display: none; gap: 1px; flex-shrink: 0;
}
.yyt-tde-sheet-item-wrap:hover .yyt-tde-sheet-actions,
.yyt-tde-sheet-item-wrap.active .yyt-tde-sheet-actions { display: flex; }
.yyt-tde-sheet-idx {
  font-size: 10px; color: var(--tde-text-muted);
  margin-right: 4px; font-weight: 700;
}
.yyt-tde-btn-icon[disabled] { opacity: 0.3; cursor: not-allowed; }

/* main */
.yyt-tde-main {
  flex: 1; min-width: 0;
  overflow-y: auto;
  padding: 16px 18px;
  background: var(--tde-canvas);
}

/* card grid */
.yyt-tde-card-grid {
  display: flex; flex-wrap: wrap; gap: 12px;
  align-content: flex-start;
}
.yyt-tde-card {
  width: 300px;
  display: flex; flex-direction: column;
  background: var(--tde-surface-1);
  border: 1px solid var(--tde-hairline-strong);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.12s ease;
}
.yyt-tde-card:hover { border-color: var(--tde-accent); }

.yyt-tde-card-header {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px;
  background: var(--tde-surface-2);
  border-bottom: 1px solid var(--tde-hairline);
}
.yyt-tde-card-index {
  flex-shrink: 0; min-width: 26px;
  padding: 2px 8px; border-radius: 999px;
  background: rgba(255,255,255,0.05);
  color: var(--tde-text-muted);
  font-size: 10px; font-weight: 700;
  text-align: center;
}
.yyt-tde-card-name {
  flex: 1; min-width: 0;
  background: transparent; border: 1px solid transparent;
  color: var(--tde-text); font-size: 13px; font-weight: 700;
  padding: 3px 6px; border-radius: 4px;
  outline: none;
  font-family: inherit;
}
.yyt-tde-card-name:hover { background: rgba(255,255,255,0.03); }
.yyt-tde-card-name:focus { background: var(--tde-canvas); border-color: var(--tde-accent); }

.yyt-tde-card-actions { display: flex; gap: 2px; flex-shrink: 0; }
.yyt-tde-icon-btn {
  width: 26px; height: 26px;
  padding: 0; border: none; background: transparent;
  color: var(--tde-text-muted);
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 11px;
  transition: background 0.12s ease, color 0.12s ease;
  font-family: inherit;
}
.yyt-tde-icon-btn:hover { background: rgba(255,255,255,0.06); color: var(--tde-text); }
.yyt-tde-icon-btn.danger:hover { background: rgba(239,68,68,0.18); color: #ffb4b4; }

.yyt-tde-card-body {
  padding: 4px 12px 10px;
  display: flex; flex-direction: column;
}
.yyt-tde-field {
  padding: 6px 0;
  border-bottom: 1px solid var(--tde-hairline);
}
.yyt-tde-field:last-child { border-bottom: none; }
.yyt-tde-field-label {
  font-size: 10px; font-weight: 700; color: var(--tde-text-muted);
  text-transform: uppercase; letter-spacing: 0.3px;
  margin-bottom: 3px;
}
.yyt-tde-field-cell {
  padding: 4px 8px; margin: 0 -8px;
  border: 1px solid transparent; border-radius: 4px;
  color: var(--tde-text); font-size: 13px; line-height: 1.5;
  min-height: 22px;
  word-break: break-word;
  outline: none;
  cursor: text;
  transition: all 0.12s ease;
}
.yyt-tde-field-cell:hover { background: var(--tde-surface-2); border-color: var(--tde-hairline); }
.yyt-tde-field-cell:focus {
  background: var(--tde-surface-2); border-color: var(--tde-accent);
  box-shadow: 0 0 0 2px var(--tde-accent-soft);
}
.yyt-tde-field-cell--empty { color: var(--tde-text-muted); font-style: italic; }

.yyt-tde-card-add {
  width: 300px;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 84px;
  border: 1px dashed var(--tde-hairline-strong);
  border-radius: 8px;
  background: transparent;
  color: var(--tde-text-muted);
  font-size: 13px; font-weight: 600;
  cursor: pointer;
  transition: all 0.12s ease;
  font-family: inherit;
}
.yyt-tde-card-add:hover { border-color: var(--tde-accent); color: var(--tde-accent); background: var(--tde-accent-soft); }

.yyt-tde-empty {
  padding: 24px;
  text-align: center;
  color: var(--tde-text-muted);
  font-size: 13px;
  border: 1px dashed var(--tde-hairline-strong);
  border-radius: 8px;
}

/* schema mode (read-only display \u7B49 #16) */
.yyt-tde-schema-section {
  margin-bottom: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--tde-hairline);
}
.yyt-tde-schema-section:last-child { border-bottom: none; }
.yyt-tde-schema-heading {
  font-size: 12px; font-weight: 700; color: var(--tde-text);
  text-transform: uppercase; letter-spacing: 0.3px;
  margin-bottom: 10px;
}
.yyt-tde-schema-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 12px;
  padding: 8px 0;
  border-top: 1px dashed rgba(255,255,255,0.08);
  font-size: 12px;
}
.yyt-tde-schema-row:first-child { border-top: none; }
.yyt-tde-schema-key { color: var(--tde-text-secondary); font-weight: 600; }

/* v1.0.194 Task G1: schema mode \u53EF\u7F16\u8F91\u63A7\u4EF6 */
.yyt-tde-input {
  background: var(--tde-surface-3);
  border: 1px solid var(--tde-hairline);
  color: var(--tde-text);
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 6px;
  width: 100%;
  font-family: inherit;
}
.yyt-tde-input:focus { outline: 1px solid var(--tde-accent, #4a9eff); }
textarea.yyt-tde-input { min-height: 40px; resize: vertical; }
.yyt-tde-schema-sd textarea.yyt-tde-input { min-height: 60px; }
.yyt-tde-uc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px 14px;
  padding: 8px 0;
}
.yyt-tde-uc-cell { display: flex; flex-direction: column; gap: 4px; }
.yyt-tde-uc-cell-wide { grid-column: span 2; }
.yyt-tde-uc-cell label { font-size: 11px; font-weight: 600; color: var(--tde-text-secondary); }
.yyt-tde-uc-cell .yyt-tde-hint { font-size: 10px; color: var(--tde-text-muted); }
.yyt-tde-schema-field {
  flex-direction: column;
  gap: 6px;
  align-items: stretch;
  padding: 10px 12px;
  background: var(--tde-surface-2);
  border-radius: 6px;
  margin-bottom: 6px;
}
.yyt-tde-schema-field-head {
  display: flex; align-items: center; gap: 8px;
}
.yyt-tde-schema-idx { font-size: 11px; color: var(--tde-accent); font-weight: 700; min-width: 24px; }
.yyt-tde-input-title { flex: 2; }
.yyt-tde-input-key { flex: 1; font-family: monospace; }
.yyt-tde-input-type { flex: 0 0 90px; }
.yyt-tde-input-desc { width: 100%; min-height: 32px; font-size: 11px; }
.yyt-tde-btn-icon {
  background: transparent; border: none; color: var(--tde-text-muted);
  cursor: pointer; padding: 4px 6px; border-radius: 4px;
  font-size: 12px;
}
.yyt-tde-btn-icon:hover { background: var(--tde-surface-3); color: var(--tde-text); }
.yyt-tde-btn-danger:hover { color: #ff6b6b; }
.yyt-tde-btn-add-field {
  margin-top: 8px;
  background: transparent;
  border: 1px dashed var(--tde-hairline);
  color: var(--tde-text-muted);
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
}
.yyt-tde-btn-add-field:hover { border-color: var(--tde-accent); color: var(--tde-accent); }

/* global mode: exportConfig \u5361\u7247 */
.yyt-tde-global-card {
  background: var(--tde-surface-2);
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 12px 14px;
  border: 1px solid var(--tde-hairline);
}
.yyt-tde-global-card-head {
  display: flex; align-items: center; justify-content: space-between;
  padding-bottom: 8px; border-bottom: 1px solid var(--tde-hairline);
  margin-bottom: 8px;
}
.yyt-tde-global-card-name { font-weight: 700; color: var(--tde-text); }
.yyt-tde-toggle-inline {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; color: var(--tde-text-muted); cursor: pointer;
}
.yyt-tde-disabled-section { opacity: 0.5; pointer-events: none; }
.yyt-tde-schema-value { color: var(--tde-text); word-break: break-word; }
.yyt-tde-schema-hint {
  font-size: 11px;
  color: var(--tde-text-muted);
  padding: 10px 14px;
  background: var(--tde-surface-2);
  border-left: 3px solid var(--tde-accent);
  border-radius: 4px;
  margin-bottom: 12px;
}
`,_c=!1});function IT(t){return ae(t)}function MT(t,e,r){if(!t||typeof t!="object")return;let s=String(e||"").split(".").filter(Boolean);if(s.length===0)return;let n=t;for(let o=0;o<s.length-1;o++){let a=s[o];(n[a]===null||n[a]===void 0||typeof n[a]!="object")&&(n[a]={}),n=n[a]}n[s[s.length-1]]=r}function ye(){return Cc||(Cc=I.createScope("TableWorkbenchView")),Cc}async function RT(){try{let t=await oo();if(!t)return bt.kind=null,bt.lastError="Provider \u4E0D\u53EF\u7528",bt;if(bt.kind=t.kind,typeof t.query=="function"){let e=await t.query({statement:"SELECT COUNT(*) as c FROM table_sheets"}),r=await t.query({statement:"SELECT COUNT(*) as c FROM table_rows"});bt.sheetCount=e?.rows?.[0]?.c??0,bt.rowCount=r?.rows?.[0]?.c??0}bt.lastError=null,bt.lastRefreshAt=Date.now(),ye().info("Provider stats \u5DF2\u5237\u65B0",{...bt})}catch(t){bt.lastError=t?.message||String(t),ye().warn("Provider stats \u5237\u65B0\u5931\u8D25",t)}return bt}function PT(){if(!bt.kind){let t=pn();t?.kind&&(bt.kind=t.kind)}return bt}function X(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Tg(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function _g(t){let{config:e,activeTemplate:r,isolationKey:s,tablesPreview:n,templateArchives:o=[],providerStats:a={}}=t,i=e?.runtime||{},l=i.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":i.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":i.lastStatus==="running"?"\u8FD0\u884C\u4E2D":"\u5F85\u547D",c=i.lastStatus==="success"?"success":i.lastStatus==="failed"?"error":"muted",d=e?.automation?.enabled?"\u81EA\u52A8":"\u624B\u52A8",u=e?.apiPreset||"\u8DDF\u968F\u4E3B API",y=e?.bypassPresetId?"\u5DF2\u7ED1\u5B9A":"\u65E0",p=Array.isArray(o)?o.length:0;return`
  <div class="yyt-tww">
    <!-- Hero -->
    <div class="yyt-tww-hero">
      <div class="yyt-tww-hero-row1">
        <div class="yyt-tww-hero-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
        <div class="yyt-tww-hero-name">\u586B\u8868\u5DE5\u4F5C\u53F0</div>
        <div class="yyt-tww-hero-actions">
          <button class="yyt-tww-btn yyt-tww-btn-small" data-action="run-now"><i class="fa-solid fa-play"></i> \u7ACB\u5373\u586B\u8868</button>
          <button class="yyt-tww-btn yyt-tww-btn-small" data-action="run-clear"><i class="fa-solid fa-rotate-left"></i> \u91CD\u586B</button>
          ${p>0?`<button class="yyt-tww-btn yyt-tww-btn-small" data-action="toggle-archives" title="\u6A21\u677F\u5F52\u6863\u5386\u53F2\uFF08chat \xD7 isolationKey \u7EF4\u5EA6\uFF0C\u6700\u591A 8 \u4EFD\uFF09"><i class="fa-solid fa-clock-rotate-left"></i> \u5F52\u6863 (${p})</button>`:""}
          <button class="yyt-tww-btn yyt-tww-btn-small yyt-tww-btn-danger" data-action="reset-chat-data" title="\u6E05\u7A7A\u5F53\u524D\u804A\u5929\u6240\u6709\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\uFF0C\u8BA9\u6A21\u677F\u5207\u6362\u540E\u4ECE\u5934\u5F00\u59CB"><i class="fa-solid fa-trash-can"></i> \u6E05\u7A7A chat \u6570\u636E</button>
        </div>
      </div>
      <div class="yyt-tww-hero-desc">\u4ECE\u5BF9\u8BDD\u5185\u5BB9\u63D0\u53D6\u7ED3\u6784\u5316\u6570\u636E\uFF0C\u81EA\u52A8\u7EF4\u62A4\u8868\u683C\u72B6\u6001\u3002</div>
      <div class="yyt-tww-hero-chips">
        <span class="yyt-tww-chip mode">\u6A21\u5F0F ${X(d)}</span>
        <span class="yyt-tww-chip preset">\u6A21\u677F: ${X(r?.template?.name||"\u9ED8\u8BA4")}</span>
        <span class="yyt-tww-chip preset">API: ${X(u)}</span>
        <span class="yyt-tww-chip preset">\u6307\u4EE4: ${X(y)}</span>
        ${(()=>{let f=e?.runScope||e?.scope?.mode||"enabled";return f==="enabled"?'<span class="yyt-tww-chip preset">\u8303\u56F4: \u6240\u6709\u542F\u7528\u8868</span>':`<button class="yyt-tww-chip status-failed" data-action="reset-run-scope" title="\u5F53\u524D AI \u53EA\u4F1A\u586B\u90E8\u5206\u8868\uFF0C\u70B9\u51FB\u91CD\u7F6E\u4E3A\u300C\u6240\u6709\u542F\u7528\u8868\u300D" style="border:0;cursor:pointer;">\u8303\u56F4: ${X(f==="current"?"\u26A0\uFE0F \u4EC5\u5F53\u524D\u8868":"\u4EC5\u9009\u4E2D\u8868")} \u2014 \u70B9\u6B64\u91CD\u7F6E</button>`})()}
        ${(()=>{let f=a?.kind,g=a?.sheetCount,h=a?.rowCount,x=g!==null&&h!==null?` \u2014 ${g} \u8868 ${h} \u884C`:"";return f==="authority"?`<span class="yyt-tww-chip status-success" title="\u6570\u636E\u6301\u4E45\u5316\u5230\u771F\u540E\u7AEF SQLite\uFF08ST-Delegation-of-authority \u63D0\u4F9B\uFF09">\u2713 \u771F\u540E\u7AEF SQLite${X(x)}</span>`:f==="fallback"?`<span class="yyt-tww-chip preset" title="\u6570\u636E\u6301\u4E45\u5316\u5230 localStorage\uFF08\u672A\u88C5 ST-Delegation-of-authority\uFF09">\u2139 Fallback (localStorage)${X(x)}</span>`:'<span class="yyt-tww-chip" title="Provider \u8FD8\u672A\u521D\u59CB\u5316\uFF08\u61D2\u52A0\u8F7D\uFF09">Provider \u52A0\u8F7D\u4E2D...</span>'})()}
        ${s?`<span class="yyt-tww-chip">\u9694\u79BB: ${X(s)}</span>`:""}
        <span class="yyt-tww-chip status-${c==="success"?"success":c==="error"?"failed":""}">${X(l)}</span>
        <span class="yyt-tww-chip yyt-tww-chip-toggle" data-action="toggle-chips" title="\u5C55\u5F00/\u6536\u8D77">\u25B8</span>
      </div>
    </div>

    <!-- \u6A21\u677F\u5F52\u6863\u5217\u8868\uFF08\u9ED8\u8BA4\u9690\u85CF\uFF0Chero \u6309\u94AE toggle\uFF09 -->
    <div class="yyt-tww-archives" data-archives-panel style="display:none;">
      ${LT(o)}
    </div>

    <!-- Runtime stats -->
    <div class="yyt-tww-stat-row">
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u72B6\u6001</span>
        <span class="yyt-tww-stat-value ${c}">${X(l)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u6700\u8FD1\u8FD0\u884C</span>
        <span class="yyt-tww-stat-value muted">${X(Tg(i.lastRunAt))}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u6210\u529F</span>
        <span class="yyt-tww-stat-value success">${X(i.successCount||0)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u5931\u8D25</span>
        <span class="yyt-tww-stat-value ${i.errorCount?"error":"muted"}">${X(i.errorCount||0)}</span>
      </div>
    </div>

    <!-- Body sections -->
    <div class="yyt-tww-body">

      <section class="yyt-tww-section" data-section="bindings">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-link"></i></span>
          \u7ED1\u5B9A
        </div>
        ${NT(t)}
      </section>

      <section class="yyt-tww-section" data-section="behavior">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-arrows-rotate"></i></span>
          \u586B\u8868\u884C\u4E3A
        </div>
        ${DT(t)}
      </section>

      <section class="yyt-tww-section" data-section="overview">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-table-cells"></i></span>
          \u8868\u683C\u6982\u89C8
          <span class="yyt-tww-section-action">
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="open-editor"><i class="fa-solid fa-table-cells"></i> \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668</button>
          </span>
        </div>
        ${OT(t.tablesPreview)}
      </section>

    </div>
  </div>
  `}function NT(t){let{config:e,allTemplates:r,apiPresets:s,bypassPresets:n,regexPresets:o,worldbookPresets:a,activeTemplate:i}=t,l=r.map(T=>`<option value="${X(T.id)}" ${i?.source?.templateId===T.id?"selected":""}>${X(T.name)}</option>`).join(""),c=e?.autoUpdateEnabled===!0?"auto":"manual",d=e?.apiPreset||"",u='<option value="">\u2014\u2014 \u8DDF\u968F\u4E3B API \u2014\u2014</option>'+s.map(T=>`<option value="${X(T.name)}" ${T.name===d?"selected":""}>${X(T.name)}</option>`).join(""),y=e?.bypass?.presetId||"",p='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+n.map(T=>`<option value="${X(T.id)}" ${T.id===y?"selected":""}>${X(T.name)}${T.isDefault?" [\u9ED8\u8BA4]":""}</option>`).join(""),f=e?.extraction?.regexPresetId||"",g='<option value="">\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014</option>'+o.map(T=>`<option value="${X(T.id)}" ${T.id===f?"selected":""}>${X(T.name)}</option>`).join(""),h=e?.worldbooks?.presetId||"",x='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+a.map(T=>`<option value="${X(T.id)}" ${T.id===h?"selected":""}>${X(T.name)}</option>`).join(""),v=e?.runScope||"enabled";return`
    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u586B\u8868\u6A21\u677F</span>
        <span class="yyt-tww-row-label-hint">\u8868\u7ED3\u6784 + \u586B\u8868\u63D0\u793A\u8BCD</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="template">${l}</select>
      <div class="yyt-tww-row-meta">
        <span>${i?.mode==="inherit_global"?"\u7EE7\u627F\u5168\u5C40":i?.mode==="chat_override"?"chat \u8986\u76D6":i?.mode==="preset_link"?"\u94FE\u63A5\u9884\u8BBE":""}</span>
      </div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u89E6\u53D1\u6A21\u5F0F</span>
        <span class="yyt-tww-row-label-hint">\u81EA\u52A8\u968F AI \u56DE\u590D / \u4EC5\u624B\u52A8</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="triggerMode">
        <option value="auto" ${c==="auto"?"selected":""}>\u81EA\u52A8 \u2014 \u56DE\u590D\u5B8C\u6210\u540E\u586B\u8868</option>
        <option value="manual" ${c==="manual"?"selected":""}>\u624B\u52A8 \u2014 \u4EC5\u5728\u70B9"\u7ACB\u5373\u586B\u8868"\u65F6</option>
      </select>
      <div class="yyt-tww-row-meta"></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">API \u9884\u8BBE</span>
        <span class="yyt-tww-row-label-hint">\u586B\u8868\u8BF7\u6C42\u8D70\u54EA\u4E2A API</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="apiPreset">${u}</select>
      <div class="yyt-tww-row-meta"><a data-link="api-presets">\u7BA1\u7406\u2026</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">Ai \u6307\u4EE4\u9884\u8BBE</span>
        <span class="yyt-tww-row-label-hint">\u9644\u52A0\u5728 system/user \u524D\u7684\u6307\u4EE4</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="bypassPreset">${p}</select>
      <div class="yyt-tww-row-meta"><a data-link="bypass">\u7BA1\u7406\u2026</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u6B63\u5219\u63D0\u53D6\u9884\u8BBE</span>
        <span class="yyt-tww-row-label-hint">\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="regexPreset">${g}</select>
      <div class="yyt-tww-row-meta"><a data-link="regex">\u7BA1\u7406\u2026</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u4E16\u754C\u4E66\u9884\u8BBE</span>
        <span class="yyt-tww-row-label-hint">\u6CE8\u5165\u5230 prompt \u7684 {{toolWorldbookContent}}</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="worldbookPreset">${x}</select>
      <div class="yyt-tww-row-meta"><a data-link="worldbook">\u7BA1\u7406\u2026</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u4F5C\u7528\u57DF</span>
        <span class="yyt-tww-row-label-hint">\u6570\u636E\u72B6\u6001\u7ED1\u5B9A\u7684\u8303\u56F4</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="runScope">
        <option value="current" ${v==="current"?"selected":""}>\u4EC5\u5F53\u524D\u6D3B\u52A8\u8868</option>
        <option value="selected" ${v==="selected"?"selected":""}>\u5F53\u524D\u9009\u4E2D\u8868</option>
        <option value="enabled" ${v==="enabled"?"selected":""}>\u6240\u6709\u542F\u7528\u7684\u8868</option>
      </select>
      <div class="yyt-tww-row-meta"></div>
    </div>
  `}function DT(t){let{config:e}=t,r=e?.fillMode||"incremental",s=Number(e?.contextDepth)||3,n=e?.worldbookSync?.enabled===!0,o=e?.mirrorToMessage===!0;return`
    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u586B\u5145\u6A21\u5F0F</span>
        <span class="yyt-tww-row-label-hint">\u589E\u91CF\u66F4\u65B0 / \u5168\u8868\u91CD\u586B</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="fillMode">
        <option value="incremental" ${r==="incremental"?"selected":""}>\u589E\u91CF \u2014 \u4EC5\u4FEE\u6539\u53D8\u5316\u5B57\u6BB5</option>
        <option value="full" ${r==="full"?"selected":""}>\u5168\u91CF \u2014 \u6574\u5F20\u8868\u91CD\u65B0\u751F\u6210</option>
      </select>
      <div class="yyt-tww-row-meta"></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u4E0A\u4E0B\u6587\u6D88\u606F\u6570</span>
        <span class="yyt-tww-row-label-hint">\u4ECE\u6700\u65B0\u4E00\u6761\u5F80\u524D\u53D6\u7684\u6761\u6570</span>
      </div>
      <input class="yyt-input yyt-tww-ctrl" type="number" min="1" max="50" data-binding="contextDepth" value="${X(s)}">
      <div class="yyt-tww-row-meta"></div>
    </div>

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">\u540C\u6B65\u5230\u4E16\u754C\u4E66</div>
        <div class="yyt-tww-toggle-desc">\u628A\u8868\u683C\u5E8F\u5217\u5316\u4E3A\u4E16\u754C\u4E66\u6761\u76EE\u8BA9\u4E3B\u6A21\u578B\u5728\u751F\u6210\u65F6\u770B\u5230\u3002</div>
      </div>
      <div class="yyt-tww-toggle ${n?"on":""}" data-toggle="worldbookSync"></div>
    </div>

    ${$T(t)}

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">\u5199\u56DE\u6B63\u6587\u955C\u50CF</div>
        <div class="yyt-tww-toggle-desc">\u5728\u52A9\u624B\u6D88\u606F\u672B\u5C3E\u955C\u50CF\u5199\u5165 markdown \u65B9\u4FBF\u624B\u52A8\u67E5\u9605\u3002</div>
      </div>
      <div class="yyt-tww-toggle ${o?"on":""}" data-toggle="mirrorToMessage"></div>
    </div>
  `}function $T(t){let e=t?.config?.worldbookSync||{};if(!(e.enabled===!0))return"";let s=String(e.targetBook||""),n=String(t?.boundLorebook||""),o=t?.chatOpen===!0,a=s||n,i=Array.isArray(t.availableWorldbooks)?t.availableWorldbooks:[],l=e.wrapperConfig||{},c=l.enabled!==!1,d=String(l.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55"),u=String(l.wrapperHint||""),y=l.wrapperPlacement||{},p=String(y.position||"before_character_definition"),f=Number.isFinite(y.depth)?y.depth:2,g=Number.isFinite(y.order)?y.order:5e4,h;if(!o)h='<option value="">\u2014\u2014 \u8BF7\u5148\u6253\u5F00\u804A\u5929 \u2014\u2014</option>';else if(i.length===0)h=`<option value="${X(a)}">${a?X(a):"\u2014\u2014 \u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014\u2014"}</option>`;else{let T=i.map(M=>{let _=typeof M=="string"?M:M?.name||"";return`<option value="${X(_)}" ${_===a?"selected":""}>${X(_)}${_===n?"\uFF08\u89D2\u8272\u5361\u7ED1\u5B9A\uFF09":""}</option>`}).join("");h=(n?`<option value="">\u2014\u2014 \u89D2\u8272\u5361\u7ED1\u5B9A\uFF1A${X(n)} \u2014\u2014</option>`:'<option value="">\u2014\u2014 \u9009\u62E9 \u2014\u2014</option>')+T}return`
    <div class="yyt-tww-sub-zone" data-sub-zone="worldbookSync">
      <div class="yyt-tww-sub-row">
        <label>\u76EE\u6807\u4E16\u754C\u4E66</label>
        <select class="yyt-select yyt-tww-ctrl" data-binding="worldbookTargetBook" ${o?"":"disabled"}>${h}</select>
        <div class="yyt-tww-sub-meta">${o?'<a data-action="refresh-worldbooks">\u5237\u65B0\u5217\u8868</a>':'<span style="color:var(--tww-warning);">\u672A\u6253\u5F00\u804A\u5929</span>'}</div>
      </div>

      <div class="yyt-tww-sub-row-toggle">
        <label>Wrapper \u5305\u88F9</label>
        <div class="yyt-tww-toggle-desc">\u7528 <code style="font-size:10px;">&lt;${X(d)}&gt;...&lt;/${X(d)}&gt;</code> \u5305\u4F4F\u6240\u6709\u5168\u5C40\u8868\u6570\u636E</div>
        <div class="yyt-tww-toggle ${c?"on":""}" data-toggle="worldbookWrapperEnabled"></div>
      </div>

      <div class="yyt-tww-sub-row">
        <label>Wrapper \u6807\u7B7E</label>
        <input class="yyt-input yyt-tww-ctrl" type="text" data-binding="worldbookWrapperTag" value="${X(d)}" placeholder="\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55">
        <div class="yyt-tww-sub-meta"></div>
      </div>

      <div class="yyt-tww-sub-row">
        <label>Wrapper \u63D0\u793A\u6587</label>
        <input class="yyt-input yyt-tww-ctrl" type="text" data-binding="worldbookWrapperHint" value="${X(u)}" placeholder="\u53EF\u9009\uFF0C\u8BF4\u660E wrapper \u5185\u5BB9\u7528\u9014">
        <div class="yyt-tww-sub-meta"></div>
      </div>

      <div class="yyt-tww-sub-row">
        <label>\u6CE8\u5165\u4F4D\u7F6E</label>
        <select class="yyt-select yyt-tww-ctrl" data-binding="worldbookWrapperPosition">
          <option value="before_character_definition" ${p==="before_character_definition"?"selected":""}>\u89D2\u8272\u5B9A\u4E49\u4E4B\u524D</option>
          <option value="after_character_definition" ${p==="after_character_definition"?"selected":""}>\u89D2\u8272\u5B9A\u4E49\u4E4B\u540E</option>
          <option value="before_history" ${p==="before_history"?"selected":""}>\u5386\u53F2\u8BB0\u5F55\u4E4B\u524D</option>
          <option value="after_history" ${p==="after_history"?"selected":""}>\u5386\u53F2\u8BB0\u5F55\u4E4B\u540E</option>
          <option value="at_depth" ${p==="at_depth"?"selected":""}>\u6307\u5B9A\u6DF1\u5EA6</option>
        </select>
        <div class="yyt-tww-sub-meta"></div>
      </div>

      <div class="yyt-tww-sub-row-double">
        <label>\u6DF1\u5EA6 / \u987A\u5E8F</label>
        <input class="yyt-input yyt-tww-ctrl" type="number" data-binding="worldbookWrapperDepth" value="${X(f)}" min="0">
        <input class="yyt-input yyt-tww-ctrl" type="number" data-binding="worldbookWrapperOrder" value="${X(g)}" min="0">
      </div>
    </div>
  `}function LT(t=[]){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D chat \xD7 isolationKey \u6682\u65E0\u5F52\u6863\uFF08\u4EC5\u5728\u5207\u6362\u6A21\u677F\u65F6\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF09</div>':`
    <div class="yyt-tww-archives-header">\u6A21\u677F\u5F52\u6863\u5386\u53F2 (${t.length}/8)</div>
    <div class="yyt-tww-archives-list">
      ${t.map((e,r)=>{let s=e?.state||{},n=s.mode||"unknown",o=e?.archivedAt?new Date(e.archivedAt).toLocaleString():"\u672A\u77E5\u65F6\u95F4",a=s.presetName||"",i=n==="preset_link"?`\u9884\u8BBE\u94FE\u63A5: ${X(a)}`:n==="chat_override"?"chat \u7EA7\u8986\u76D6\u6A21\u677F":n==="inherit_global"?"\u7EE7\u627F\u5168\u5C40":X(n);return`
          <div class="yyt-tww-archive-item" data-archive-index="${r}">
            <div class="yyt-tww-archive-meta">
              <span class="yyt-tww-archive-time">${X(o)}</span>
              <span class="yyt-tww-archive-mode">${i}</span>
            </div>
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="restore-archive" data-archive-index="${r}" title="\u6062\u590D\u6B64\u5F52\u6863\uFF08\u6062\u590D\u524D\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF09">\u6062\u590D</button>
          </div>
        `}).join("")}
    </div>
  `}function OT(t){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D slot \u6682\u65E0\u8868\u6570\u636E\u3002\u8BF7\u5148"\u7ACB\u5373\u586B\u8868"\u6216\u5728\u6570\u636E\u7F16\u8F91\u5668\u4E2D\u521D\u59CB\u5316\u3002</div>':`
    <div class="yyt-tww-table-grid">
      ${t.map((e,r)=>`
        <div class="yyt-tww-table-card${e.enabled===!1?" yyt-tww-table-card-disabled":""}" data-table-index="${r}" data-table-id="${X(e.id||"")}">
          <div class="yyt-tww-table-card-header">
            <label class="yyt-tww-table-card-toggle" title="${e.enabled===!1?"\u5DF2\u7981\u7528 \u2014 AI \u4E0D\u4F1A\u586B\u8FD9\u5F20\u8868":"\u5DF2\u542F\u7528 \u2014 AI \u4F1A\u586B\u8FD9\u5F20\u8868"}">
              <input type="checkbox" data-action="toggle-table-enabled" data-table-id="${X(e.id||"")}" ${e.enabled===!1?"":"checked"} />
              <span class="yyt-tww-table-card-toggle-slider"></span>
            </label>
            <span class="yyt-tww-table-card-name">${X(e.name||`\u8868 ${r+1}`)}</span>
            <i class="fa-solid fa-arrow-right yyt-tww-table-card-arrow"></i>
          </div>
          <div class="yyt-tww-table-card-stats">
            <span><b>${X(e.rowCount||0)}</b> \u884C</span>
            <span><b>${X(e.colCount||0)}</b> \u5B57\u6BB5</span>
            ${e.updatedHint?`<span>${X(e.updatedHint)}</span>`:""}
          </div>
        </div>
      `).join("")}
    </div>
  `}function Eg(){let t=(()=>{try{return ke()}catch{return{}}})(),e=(()=>{try{return mn()||[]}catch{return[]}})(),r=(()=>{try{return hn({})}catch{return null}})(),s=(()=>{try{return Ir()||[]}catch{return[]}})(),n=(()=>{try{return uo()||[]}catch{return[]}})(),o=(()=>{try{return xe.listPresets()||[]}catch{return[]}})(),a=(()=>{try{return ut.listPresets()||[]}catch{return[]}})(),i=(()=>{try{return Ie.getKey()}catch{return""}})(),l=BT(),c=zT(),d=KT(),u=null,y=0;try{let x=Ds(null);Array.isArray(x?.tableState?.tables)&&x.tableState.tables.length>0&&(u=x.tableState.tables,y=Number(x.tableState.updatedAt)||0)}catch{}let p=u||r?.template?.tables||t?.tables||[],f=t?.tableEnabledOverrides&&typeof t.tableEnabledOverrides=="object"?t.tableEnabledOverrides:{},g=p.map(x=>{let v=x?.id||"",T=v&&Object.prototype.hasOwnProperty.call(f,v)?f[v]:void 0;return{id:v,name:x?.name||"",enabled:T!==void 0?T:x?.enabled!==!1,rowCount:Array.isArray(x?.rows)?x.rows.length:0,colCount:Array.isArray(x?.columns)?x.columns.length:0,updatedHint:u&&y>0?Tg(y):""}}),h=(()=>{try{return vy()||[]}catch{return[]}})();return{config:t,activeTemplate:r,allTemplates:e,apiPresets:s,bypassPresets:n,regexPresets:o,worldbookPresets:a,availableWorldbooks:l,boundLorebook:c,chatOpen:d,isolationKey:i,tablesPreview:g,templateArchives:h,providerStats:PT()}}function BT(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(!e)return[];if(typeof e.getLorebooks=="function"){let r=e.getLorebooks();if(Array.isArray(r))return r}if(typeof e.getLorebookList=="function"){let r=e.getLorebookList();if(Array.isArray(r))return r}}catch(t){ye().warn("loadAvailableWorldbooks \u5931\u8D25",t)}return[]}function zT(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e){if(typeof e.getCurrentCharPrimaryLorebook=="function"){let s=e.getCurrentCharPrimaryLorebook();if(typeof s=="string"&&s)return s}if(typeof e.getCharLorebooks=="function")try{let s=e.getCharLorebooks();if(s?.primary)return String(s.primary)}catch{}if(typeof e.getChatLorebook=="function")try{let s=e.getChatLorebook();if(typeof s=="string"&&s)return s}catch{}}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let s=r.characters?.[r.characterId],n=s?.data?.character_book?.name||s?.data?.extensions?.world||s?.world;if(typeof n=="string"&&n)return n}}catch(t){ye().warn("loadCharacterBoundLorebook \u5931\u8D25",t)}return""}function KT(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e&&typeof e.getCurrentChatId=="function"){let s=e.getCurrentChatId();return!!(s&&String(s).trim()&&String(s).trim()!=="default_chat")}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let s=r.chat;if(Array.isArray(s)&&s.length>0||r.chatId)return!0}}catch{}return!1}function kc(t,e){let r=window.jQuery||window.parent?.jQuery;if(!r||!t||!t.on){ye().warn("bindWorkbenchEvents: jQuery \u6216 $container \u4E0D\u53EF\u7528");return}t.off(".tww"),vg||(vg=!0,RT().then(()=>{typeof e=="function"&&e()}).catch(()=>{})),t.on("click.tww",'[data-action="run-now"]',async()=>{try{let o=await Eo();o?.success?C("success","\u586B\u8868\u5B8C\u6210"):C("error",`\u586B\u8868\u5931\u8D25\uFF1A${o?.error||"\u672A\u77E5"}`),typeof e=="function"&&e()}catch(o){ye().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",o),C("error",`\u5F02\u5E38\uFF1A${o?.message||o}`)}}),t.on("click.tww",'[data-action="run-clear"]',async()=>{if(window.confirm("\u91CD\u586B\u4F1A\u6E05\u7A7A\u5F53\u524D\u6D88\u606F\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\u5E76\u91CD\u65B0\u751F\u6210\uFF0C\u786E\u5B9A\uFF1F"))try{let o=await Eo(null,{clearBeforeUpdate:!0});o?.success?C("success","\u91CD\u586B\u5B8C\u6210"):C("error",`\u91CD\u586B\u5931\u8D25\uFF1A${o?.error||"\u672A\u77E5"}`),typeof e=="function"&&e()}catch(o){ye().error("\u91CD\u586B\u5F02\u5E38",o),C("error",`\u5F02\u5E38\uFF1A${o?.message||o}`)}}),t.on("click.tww",'[data-action="reset-run-scope"]',()=>{try{let o=ke();st({...o,runScope:"enabled",scope:{...o.scope||{},mode:"enabled",activeTableId:"",selectedTableIds:[]}}),C("success","\u5DF2\u91CD\u7F6E\u8303\u56F4\u4E3A\u300C\u6240\u6709\u542F\u7528\u8868\u300D"),ye().info("\u7528\u6237\u91CD\u7F6E runScope \u4E3A enabled"),typeof e=="function"&&e()}catch(o){ye().error("\u91CD\u7F6E\u8303\u56F4\u5F02\u5E38",o),C("error",`\u91CD\u7F6E\u5931\u8D25\uFF1A${o?.message||o}`)}}),t.on("click.tww",'[data-action="toggle-chips"]',function(){let o=t.find(".yyt-tww-hero-chips")[0];if(!o)return;let a=o.classList.toggle("yyt-tww-hero-chips-expanded");this.textContent=a?"\u25BE":"\u25B8"}),t.on("click.tww",'[data-action="reset-chat-data"]',async()=>{if(window.confirm("\u5C06\u6E05\u7A7A\u5F53\u524D\u804A\u5929\u6240\u6709\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\uFF08\u4E0D\u5F71\u54CD\u6A21\u677F/\u914D\u7F6E\uFF09\u3002\u4E0B\u6B21\u586B\u8868\u4F1A\u6309\u5F53\u524D\u6FC0\u6D3B\u6A21\u677F\u4ECE\u5934\u5F00\u59CB\u3002\u786E\u5B9A\uFF1F"))try{let o=await Pf();o?.success?(C("success",`\u5DF2\u6E05\u7A7A ${o.touched||0} \u6761\u6D88\u606F\u7684\u8868\u683C\u6570\u636E`),ye().info("\u6E05\u7A7A chat \u6570\u636E\u5B8C\u6210",o)):C("error","\u6E05\u7A7A\u5931\u8D25"),typeof e=="function"&&e()}catch(o){ye().error("\u6E05\u7A7A chat \u6570\u636E\u5F02\u5E38",o),C("error",`\u5F02\u5E38\uFF1A${o?.message||o}`)}}),t.on("click.tww",'[data-action="open-editor"]',o=>{o.preventDefault(),console.log("[YYT][TableWorkbench] open-editor button clicked"),ye().info("open-editor button clicked");try{let a=Ac();console.log("[YYT][TableWorkbench] openTableDataEditor returned:",a),ye().info("openTableDataEditor \u8C03\u7528\u5B8C\u6210",{hasReturn:!!a})}catch(a){console.error("[YYT][TableWorkbench] \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38:",a),ye().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",a),C("error",`\u6253\u5F00\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("click.tww","[data-table-index]",function(o){if(r(o.target).closest('[data-action="toggle-table-enabled"]').length>0||r(o.target).is("label, label *"))return;o.preventDefault();let a=Number(r(this).attr("data-table-index"));if(!(!Number.isFinite(a)||a<0)){console.log("[YYT][TableWorkbench] table card clicked, idx=",a);try{let l=Ds(null)?.tableState?.tables?.[a],c=Ac({focusTableUid:l?.uid||l?.id||""});console.log("[YYT][TableWorkbench] openTableDataEditor returned:",c)}catch(i){console.error("[YYT][TableWorkbench] \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38:",i),ye().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",i),C("error",`\u6253\u5F00\u5931\u8D25\uFF1A${i?.message||i}`)}}}),t.on("click.tww",'[data-action="toggle-archives"]',function(o){o.preventDefault();let a=t.find("[data-archives-panel]").first();a.length&&(a.css("display")==="none"?a.css("display","block"):a.css("display","none"))}),t.on("click.tww",'[data-action="restore-archive"]',async function(o){o.stopPropagation();let a=Number(r(this).attr("data-archive-index"));if(!(!Number.isFinite(a)||a<0)&&window.confirm(`\u6062\u590D\u5F52\u6863 #${a}\uFF1F\u6062\u590D\u524D\u4F1A\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF0C\u53EF\u518D\u6B21\u6062\u590D\u56DE\u6765\u3002`))try{let i=Ty(a);i?.success?(C("success","\u5DF2\u6062\u590D\u5F52\u6863"),ye().info("restoreChatTemplateArchive \u6210\u529F",{index:a,scopeState:i.scopeState})):C("error",`\u6062\u590D\u5931\u8D25\uFF1A${i?.error||"\u672A\u77E5"}`),typeof e=="function"&&e()}catch(i){ye().error("\u6062\u590D\u5F52\u6863\u5F02\u5E38",i),C("error",`\u5F02\u5E38\uFF1A${i?.message||i}`)}}),t.on("change.tww",'[data-action="toggle-table-enabled"]',function(o){o.stopPropagation();let a=r(this).attr("data-table-id"),i=r(this).is(":checked");if(a)try{let l=ke(),c={...l.tableEnabledOverrides||{}};c[a]=i,st({...l,tableEnabledOverrides:c}),C("success",i?`\u5DF2\u542F\u7528 ${a}`:`\u5DF2\u7981\u7528 ${a}`),ye().info("toggle \u5355\u8868\u6FC0\u6D3B",{tableId:a,enabled:i}),typeof e=="function"&&e()}catch(l){ye().error("toggle \u5355\u8868\u6FC0\u6D3B\u5F02\u5E38",l),C("error",`\u5207\u6362\u5931\u8D25\uFF1A${l?.message||l}`)}}),t.on("change.tww",'[data-binding="template"]',function(){let o=r(this).val();try{Wl(o);let a=ke();st({...a,activeTemplate:o}),C("success","\u6A21\u677F\u5DF2\u5207\u6362"),typeof e=="function"&&e()}catch(a){ye().error("\u5207\u6362\u6A21\u677F\u5F02\u5E38",a),C("error",`\u5207\u6362\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("change.tww",'[data-binding="triggerMode"]',function(){let o=r(this).val();try{let a=ke();st({...a,autoUpdateEnabled:o==="auto"}),C("success",o==="auto"?"\u5DF2\u5207\u6362\u4E3A\u81EA\u52A8\u6A21\u5F0F":"\u5DF2\u5207\u6362\u4E3A\u624B\u52A8\u6A21\u5F0F"),typeof e=="function"&&e()}catch(a){ye().error("\u5207\u6362\u89E6\u53D1\u6A21\u5F0F\u5F02\u5E38",a),C("error",`\u5207\u6362\u5931\u8D25\uFF1A${a?.message||a}`)}});let s=[{sel:'[data-binding="apiPreset"]',key:"apiPreset"},{sel:'[data-binding="runScope"]',key:"runScope"},{sel:'[data-binding="fillMode"]',key:"fillMode"}];for(let{sel:o,key:a}of s)t.on("change.tww",o,function(){let i=r(this).val();try{let l=ke(),c={...l,[a]:i};a==="runScope"&&(c.scope={...l.scope||{},mode:i,...i==="enabled"?{activeTableId:"",selectedTableIds:[]}:{}}),st(c),C("success","\u5DF2\u4FDD\u5B58")}catch(l){ye().error(`\u4FDD\u5B58 ${a} \u5F02\u5E38`,l),C("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`)}});t.on("change.tww",'[data-binding="bypassPreset"]',function(){let o=r(this).val();try{let a=ke();st({...a,bypass:{...a.bypass||{},presetId:o,enabled:!!o}}),C("success","Ai \u6307\u4EE4\u9884\u8BBE\u5DF2\u4FDD\u5B58")}catch(a){ye().error("\u4FDD\u5B58 bypass \u5F02\u5E38",a),C("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("change.tww",'[data-binding="regexPreset"]',function(){let o=r(this).val();try{let a=ke();st({...a,extraction:{...a.extraction||{},regexPresetId:o}}),C("success","\u6B63\u5219\u9884\u8BBE\u5DF2\u66F4\u65B0")}catch(a){ye().error("\u4FDD\u5B58 regexPreset \u5F02\u5E38",a),C("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("change.tww",'[data-binding="worldbookPreset"]',function(){let o=r(this).val();try{let a=ke();st({...a,worldbooks:{...a.worldbooks||{},presetId:o}}),C("success","\u4E16\u754C\u4E66\u9884\u8BBE\u5DF2\u66F4\u65B0")}catch(a){ye().error("\u4FDD\u5B58 worldbookPreset \u5F02\u5E38",a),C("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("change.tww",'[data-binding="contextDepth"]',function(){let o=Math.max(1,parseInt(r(this).val(),10)||3);try{let a=ke();st({...a,contextDepth:o}),C("success","\u5DF2\u4FDD\u5B58")}catch(a){ye().error("\u4FDD\u5B58 contextDepth \u5F02\u5E38",a),C("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("click.tww",'[data-toggle="worldbookSync"]',function(){let o=r(this),a=o.hasClass("on"),i=!a;o.toggleClass("on",i);try{let l=ke();st({...l,worldbookSync:{...l.worldbookSync||{},enabled:i}}),C("success",i?"\u5DF2\u542F\u7528\u4E16\u754C\u4E66\u540C\u6B65":"\u5DF2\u505C\u7528\u4E16\u754C\u4E66\u540C\u6B65"),typeof e=="function"&&e()}catch(l){o.toggleClass("on",a),ye().error("toggle worldbookSync \u5F02\u5E38",l),C("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`)}}),t.on("click.tww",'[data-toggle="worldbookWrapperEnabled"]',function(){let o=r(this),a=o.hasClass("on"),i=!a;o.toggleClass("on",i);try{let l=ke(),c=l.worldbookSync||{};st({...l,worldbookSync:{...c,wrapperConfig:{...c.wrapperConfig||{},enabled:i}}}),C("success",i?"\u5DF2\u542F\u7528 Wrapper \u5305\u88F9":"\u5DF2\u505C\u7528 Wrapper")}catch(l){o.toggleClass("on",a),ye().error("toggle worldbookWrapperEnabled \u5F02\u5E38",l)}});let n=[{sel:'[data-binding="worldbookTargetBook"]',path:"targetBook",type:"string"},{sel:'[data-binding="worldbookWrapperTag"]',path:"wrapperConfig.wrapperTag",type:"string"},{sel:'[data-binding="worldbookWrapperHint"]',path:"wrapperConfig.wrapperHint",type:"string"},{sel:'[data-binding="worldbookWrapperPosition"]',path:"wrapperConfig.wrapperPlacement.position",type:"string"},{sel:'[data-binding="worldbookWrapperDepth"]',path:"wrapperConfig.wrapperPlacement.depth",type:"number"},{sel:'[data-binding="worldbookWrapperOrder"]',path:"wrapperConfig.wrapperPlacement.order",type:"number"}];for(let{sel:o,path:a,type:i}of n)t.on("change.tww",o,function(){let l=r(this).val();i==="number"&&(l=Number.parseInt(l,10));try{let c=ke(),d=IT(c.worldbookSync||{});MT(d,a,l),st({...c,worldbookSync:d}),C("success","\u5DF2\u4FDD\u5B58")}catch(c){ye().error(`\u4FDD\u5B58 worldbookSync.${a} \u5F02\u5E38`,c),C("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${c?.message||c}`)}});t.on("click.tww",'[data-action="refresh-worldbooks"]',function(o){o.preventDefault(),typeof e=="function"&&e(),C("success","\u5DF2\u5237\u65B0\u4E16\u754C\u4E66\u5217\u8868")}),t.on("click.tww",'[data-toggle="mirrorToMessage"]',function(){let o=r(this),a=o.hasClass("on"),i=!a;o.toggleClass("on",i);try{let l=ke();st({...l,mirrorToMessage:i}),C("success",i?"\u5DF2\u542F\u7528\u6B63\u6587\u955C\u50CF":"\u5DF2\u505C\u7528\u6B63\u6587\u955C\u50CF")}catch(l){o.toggleClass("on",a),ye().error("toggle mirrorToMessage \u5F02\u5E38",l),C("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`)}}),t.on("click.tww","[data-link]",function(o){o.preventDefault(),C("info","\u8DF3\u8F6C\u5230\u9884\u8BBE\u7BA1\u7406\u9762\u677F\uFF08\u5F85\u63A5\u5165\uFF09")})}var Cc,bt,vg,Sg,Ag=D(()=>{W();dn();rr();an();Ss();Qa();vo();wg();je();$n();xn();zr();js();Ge();bt={kind:null,sheetCount:null,rowCount:null,lastError:null,lastRefreshAt:0},vg=!1;Sg=`
.yyt-tww {
  --tww-canvas: var(--yyt-bg-base, #0a0d13);
  --tww-surface-1: var(--yyt-surface, #0f1219);
  --tww-surface-2: var(--yyt-surface-2, #151a24);
  --tww-surface-3: var(--yyt-surface-3, #1c2231);
  --tww-hairline: var(--yyt-border, rgba(255,255,255,0.06));
  --tww-hairline-strong: var(--yyt-border-strong, rgba(255,255,255,0.12));
  --tww-hairline-dashed: rgba(255,255,255,0.08);
  --tww-text: var(--yyt-text, rgba(255,255,255,0.92));
  --tww-text-secondary: var(--yyt-text-secondary, rgba(255,255,255,0.55));
  --tww-text-muted: var(--yyt-text-muted, rgba(255,255,255,0.35));
  --tww-accent: var(--yyt-accent, #7bb7ff);
  --tww-accent-soft: var(--yyt-accent-soft, rgba(123,183,255,0.15));
  --tww-accent-strong: var(--yyt-accent-strong, #a5d4ff);
  --tww-on-accent: var(--yyt-on-accent, #0a0d13);
  --tww-success: var(--yyt-success, #4ade80);
  --tww-success-soft: rgba(74,222,128,0.12);
  --tww-warning: var(--yyt-warning, #fbbf24);
  --tww-warning-soft: rgba(251,191,36,0.14);
  --tww-error: var(--yyt-error, #ef4444);
  --tww-error-soft: rgba(239,68,68,0.12);
  --tww-purple: #a78bfa;
  --tww-purple-soft: rgba(167,139,250,0.12);

  display: flex; flex-direction: column;
  min-height: 100%;
  /* \u8BAE\u9898 #15 hotfix v1.0.173\uFF1A\u7236\u5BB9\u5668\uFF08popup yyt-content\uFF09\u5DF2\u662F\u6DF1\u8272\uFF0C\u672C\u5BB9\u5668\u900F\u660E\u7EE7\u627F\u907F\u514D\u8FB9\u754C\u9519\u4F4D */
  background: transparent; color: var(--tww-text);
  font-size: 13px; line-height: 1.5;
}
.yyt-tww-hero {
  flex-shrink: 0;
  padding: 14px 18px;
  border-bottom: 1px solid var(--tww-hairline);
  background: var(--tww-surface-1);
  display: flex; flex-direction: column; gap: 8px;
  position: sticky; top: 0; z-index: 10;
}
.yyt-tww-hero-row1 { display: flex; align-items: center; gap: 12px; }
.yyt-tww-hero-icon {
  width: 30px; height: 30px; border-radius: 6px;
  background: var(--tww-accent-soft); color: var(--tww-accent);
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 14px; flex-shrink: 0;
}
.yyt-tww-hero-name { flex: 1; font-size: 15px; font-weight: 700; min-width: 0; }
.yyt-tww-hero-actions { display: flex; gap: 8px; flex-shrink: 0; }
.yyt-tww-hero-desc { font-size: 12px; color: var(--tww-text-muted); padding-left: 42px; }
.yyt-tww-hero-chips { display: flex; gap: 6px; flex-wrap: wrap; padding-left: 42px; max-height: 24px; overflow: hidden; transition: max-height 0.2s ease; }
.yyt-tww-hero-chips.yyt-tww-hero-chips-expanded { max-height: 200px; }
.yyt-tww-chip-toggle { cursor: pointer; user-select: none; }
.yyt-tww-chip {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 2px 8px; border-radius: 999px;
  font-size: 10px; font-weight: 600; letter-spacing: 0.3px;
  background: var(--tww-surface-2); color: var(--tww-text-muted);
}
.yyt-tww-chip.mode { background: var(--tww-purple-soft); color: var(--tww-purple); }
.yyt-tww-chip.preset { background: var(--tww-accent-soft); color: var(--tww-accent); }
.yyt-tww-chip.status-success { background: var(--tww-success-soft); color: var(--tww-success); }
.yyt-tww-chip.status-failed { background: var(--tww-error-soft); color: #ffb4b4; }

.yyt-tww-stat-row {
  display: grid; grid-template-columns: repeat(4, 1fr);
  padding: 12px 18px;
  border-bottom: 1px solid var(--tww-hairline);
  flex-shrink: 0;
}
.yyt-tww-stat {
  display: flex; flex-direction: column; gap: 2px;
  border-left: 1px solid var(--tww-hairline);
  padding-left: 14px;
}
.yyt-tww-stat:first-child { border-left: none; padding-left: 0; }
.yyt-tww-stat-label {
  font-size: 10px; font-weight: 700; color: var(--tww-text-muted);
  text-transform: uppercase; letter-spacing: 0.4px;
}
.yyt-tww-stat-value { font-size: 12px; font-weight: 600; color: var(--tww-text); font-variant-numeric: tabular-nums; }
.yyt-tww-stat-value.success { color: var(--tww-success); }
.yyt-tww-stat-value.error { color: var(--tww-error); }
.yyt-tww-stat-value.muted { color: var(--tww-text-muted); }

.yyt-tww-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 12px;
  border: 1px solid var(--tww-hairline-strong);
  border-radius: 6px;
  background: var(--tww-surface-2);
  color: var(--tww-text-secondary);
  font-size: 12px; font-weight: 600; cursor: pointer;
  transition: all 0.12s ease; white-space: nowrap;
  font-family: inherit;
}
.yyt-tww-btn:hover { background: var(--tww-surface-3); color: var(--tww-text); }
.yyt-tww-btn-primary {
  background: var(--tww-accent); color: var(--tww-on-accent);
  border-color: transparent; font-weight: 700;
}
.yyt-tww-btn-primary:hover { background: var(--tww-accent-strong); color: var(--tww-on-accent); }
.yyt-tww-btn-small { padding: 5px 10px; font-size: 11px; }

.yyt-tww-body {
  padding: 0 18px 22px;
}
.yyt-tww-section { padding-top: 22px; }
.yyt-tww-section:first-child { padding-top: 18px; }
.yyt-tww-section + .yyt-tww-section {
  margin-top: 22px;
  border-top: 1px solid var(--tww-hairline);
}
.yyt-tww-section-heading {
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 12px;
  font-size: 12px; font-weight: 700; color: var(--tww-text);
  text-transform: uppercase; letter-spacing: 0.3px;
}
.yyt-tww-section-icon {
  width: 22px; height: 22px; border-radius: 6px;
  background: var(--tww-accent-soft); color: var(--tww-accent);
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 11px;
}
.yyt-tww-section-action { margin-left: auto; display: flex; gap: 6px; }

.yyt-tww-row {
  display: grid; grid-template-columns: 130px 1fr auto;
  gap: 12px; align-items: center;
  padding: 10px 0;
}
.yyt-tww-row + .yyt-tww-row { border-top: 1px dashed var(--tww-hairline-dashed); }
.yyt-tww-row-label { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.yyt-tww-row-label-text { font-size: 12px; font-weight: 600; color: var(--tww-text-secondary); }
.yyt-tww-row-label-hint { font-size: 10px; color: var(--tww-text-muted); }
.yyt-tww-row-meta {
  display: flex; align-items: center; gap: 8px;
  font-size: 11px; color: var(--tww-text-muted);
}
.yyt-tww-row-meta a { color: var(--tww-accent); text-decoration: none; font-weight: 600; cursor: pointer; }
.yyt-tww-row-meta a:hover { text-decoration: underline; }

/* \u8BAE\u9898 #15 hotfix v1.0.173\uFF1A
   \u5DE5\u4F5C\u53F0 select/input \u76F4\u63A5\u501F\u7528 toolkit \u7684 yyt-select / yyt-input \u9884\u5236\u4F53\uFF08\u5E26 !important \u9632\u5FA1\u6837\u5F0F reset\uFF09\uFF0C
   \u5728\u6B64\u7528 .yyt-tww-ctrl override \u7F29\u5C0F\u5230 binding-row \u7528\u7684\u7D27\u51D1\u5C3A\u5BF8 */
.yyt-tww-ctrl {
  min-height: 32px !important;
  padding: 6px 10px !important;
  font-size: 12px !important;
  width: 100%;
}
select.yyt-tww-ctrl {
  padding-right: 28px !important;
  background-size: 10px !important;
  background-position: right 10px center !important;
}

.yyt-tww-toggle-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 0; gap: 16px;
}
.yyt-tww-toggle-row + .yyt-tww-toggle-row { border-top: 1px dashed var(--tww-hairline-dashed); }
.yyt-tww-toggle-info { flex: 1; min-width: 0; }
.yyt-tww-toggle-title { font-size: 12px; font-weight: 600; color: var(--tww-text-secondary); }
.yyt-tww-toggle-desc { font-size: 10px; color: var(--tww-text-muted); margin-top: 2px; }
.yyt-tww-toggle {
  position: relative; width: 34px; height: 18px;
  background: var(--tww-surface-3); border-radius: 999px;
  border: 1px solid var(--tww-hairline-strong);
  cursor: pointer; flex-shrink: 0;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.yyt-tww-toggle::after {
  content: ''; position: absolute; top: 1px; left: 1px;
  width: 14px; height: 14px; border-radius: 50%;
  background: rgba(255,255,255,0.85);
  transition: transform 0.15s ease;
}
.yyt-tww-toggle.on { background: var(--tww-accent); border-color: transparent; }
.yyt-tww-toggle.on::after { transform: translateX(16px); background: var(--tww-on-accent); }

/* sub-zone\uFF08\u8BAE\u9898 #15 #30 \u5199\u56DE\u4E16\u754C\u4E66\u5C55\u5F00\u914D\u7F6E\uFF09*/
.yyt-tww-sub-zone {
  margin-top: 8px; margin-left: 0;
  padding: 12px 14px;
  background: var(--tww-surface-1);
  border: 1px solid var(--tww-hairline-strong);
  border-radius: 6px;
  display: flex; flex-direction: column; gap: 10px;
}
.yyt-tww-sub-zone.collapsed { display: none; }
.yyt-tww-sub-row {
  display: grid; grid-template-columns: 110px 1fr auto;
  gap: 10px; align-items: center;
}
.yyt-tww-sub-row + .yyt-tww-sub-row {
  padding-top: 10px;
  border-top: 1px dashed var(--tww-hairline-dashed);
}
.yyt-tww-sub-row > label {
  font-size: 11px; font-weight: 600; color: var(--tww-text-secondary);
}
.yyt-tww-sub-row > .yyt-tww-sub-meta {
  font-size: 11px; color: var(--tww-text-muted); white-space: nowrap;
}
.yyt-tww-sub-row > .yyt-tww-sub-meta a {
  color: var(--tww-accent); text-decoration: none; font-weight: 600; cursor: pointer;
}
.yyt-tww-sub-row > .yyt-tww-sub-meta a:hover { text-decoration: underline; }
.yyt-tww-sub-row-toggle {
  display: grid; grid-template-columns: 110px 1fr auto;
  gap: 10px; align-items: center;
}
.yyt-tww-sub-row-toggle > label {
  font-size: 11px; font-weight: 600; color: var(--tww-text-secondary);
}
.yyt-tww-sub-row-toggle .yyt-tww-toggle-desc {
  font-size: 10px; color: var(--tww-text-muted);
}
.yyt-tww-sub-row-double {
  display: grid; grid-template-columns: 110px 1fr 1fr;
  gap: 10px; align-items: center;
}

.yyt-tww-table-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;
}
.yyt-tww-table-card {
  padding: 10px 12px;
  background: var(--tww-surface-1);
  border: 1px solid var(--tww-hairline-strong);
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.12s ease, background 0.12s ease;
  display: flex; flex-direction: column; gap: 6px;
}
.yyt-tww-table-card:hover { border-color: var(--tww-accent); background: var(--tww-surface-2); }
.yyt-tww-table-card-disabled { opacity: 0.55; }
.yyt-tww-table-card-disabled .yyt-tww-table-card-name { text-decoration: line-through; color: var(--tww-text-muted); }
.yyt-tww-table-card-header { display: flex; align-items: center; gap: 8px; }
.yyt-tww-table-card-toggle {
  position: relative; display: inline-flex; width: 32px; height: 18px;
  cursor: pointer; flex-shrink: 0;
}
.yyt-tww-table-card-toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
.yyt-tww-table-card-toggle-slider {
  position: absolute; inset: 0; background: #555; border-radius: 18px;
  transition: background 0.15s; cursor: pointer;
}
.yyt-tww-table-card-toggle-slider::before {
  content: ''; position: absolute; top: 2px; left: 2px;
  width: 14px; height: 14px; background: #fff; border-radius: 50%;
  transition: transform 0.15s;
}
.yyt-tww-table-card-toggle input:checked + .yyt-tww-table-card-toggle-slider { background: var(--tww-accent, #4caf50); }
.yyt-tww-table-card-toggle input:checked + .yyt-tww-table-card-toggle-slider::before { transform: translateX(14px); }
.yyt-tww-table-card-name { flex: 1; font-size: 13px; font-weight: 700; color: var(--tww-text); }

/* \u6A21\u677F\u5F52\u6863\u5217\u8868\uFF08\u8BAE\u9898 #15 \u76F2\u533A 4\uFF0Cv1.0.193+\uFF09 */
.yyt-tww-archives {
  margin: 8px 0; padding: 12px; border-radius: 8px;
  background: var(--tww-surface-2, rgba(255,255,255,0.04));
  border: 1px solid var(--tww-border, rgba(255,255,255,0.08));
}
.yyt-tww-archives-header {
  font-size: 12px; font-weight: 600; color: var(--tww-text-muted);
  margin-bottom: 8px;
}
.yyt-tww-archives-list {
  display: flex; flex-direction: column; gap: 6px;
}
.yyt-tww-archive-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 10px; border-radius: 6px;
  background: var(--tww-surface, rgba(255,255,255,0.02));
  border: 1px solid var(--tww-border, rgba(255,255,255,0.06));
}
.yyt-tww-archive-meta {
  display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0;
}
.yyt-tww-archive-time { font-size: 12px; color: var(--tww-text); }
.yyt-tww-archive-mode { font-size: 11px; color: var(--tww-text-muted); }
.yyt-tww-table-card-arrow {
  color: var(--tww-text-muted); font-size: 10px;
  transition: color 0.12s ease, transform 0.12s ease;
}
.yyt-tww-table-card:hover .yyt-tww-table-card-arrow {
  color: var(--tww-accent); transform: translateX(2px);
}
.yyt-tww-table-card-stats { display: flex; gap: 12px; font-size: 11px; color: var(--tww-text-muted); }
.yyt-tww-table-card-stats b { color: var(--tww-text-secondary); font-weight: 700; }
.yyt-tww-empty {
  padding: 20px;
  text-align: center;
  color: var(--tww-text-muted);
  font-size: 12px;
  border: 1px dashed var(--tww-hairline-strong);
  border-radius: 8px;
}
`});var kg={};re(kg,{TableWorkbenchPanel:()=>Cg,default:()=>jT});function UT(){if(!Ic)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tww-styles")){Ic=!0;return}let r=t.createElement("style");r.id="yyt-tww-styles",r.textContent=Sg,e.appendChild(r),Ic=!0}catch(t){Mc.warn("\u6CE8\u5165\u5DE5\u4F5C\u53F0\u6837\u5F0F\u5931\u8D25",t)}}var Mc,Ic,Cg,jT,Ig=D(()=>{Ge();W();Ag();Mc=I.createScope("TableWorkbenchPanel"),Ic=!1;Cg={id:"tableWorkbenchPanel",render(){UT();try{let t=Eg();return _g(t)}catch(t){return Mc.error("\u6E32\u67D3\u5DE5\u4F5C\u53F0 UI \u5F02\u5E38",t),`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u4F5C\u53F0\u6E32\u67D3\u5931\u8D25\uFF1A${t?.message||t}</span></div>`}},bindEvents(t){if(!Q()||!ge(t))return;let r=this,s=()=>{try{t.html(r.render()),kc(t,s)}catch(n){Mc.error("refresh \u5F02\u5E38",n)}};kc(t,s)},renderTo(t){!Q()||!ge(t)||(t.html(this.render()),this.bindEvents(t))}},jT=Cg});var Rg={};re(Rg,{LoggerPanel:()=>Mg,default:()=>GT});function HT(t){switch(t){case le.DEBUG:return"yyt-log-debug";case le.INFO:return"yyt-log-info";case le.WARN:return"yyt-log-warn";case le.ERROR:return"yyt-log-error";default:return""}}function YT(t){let e=new Date(t),r=s=>String(s).padStart(2,"0");return`${r(e.getHours())}:${r(e.getMinutes())}:${r(e.getSeconds())}.${String(e.getMilliseconds()).padStart(3,"0")}`}var FT,WT,Mg,GT,Pg=D(()=>{W();Ye();Ge();FT="yyt-logger-panel",WT=[{level:null,label:"\u5168\u90E8",icon:"fa-list"},{level:le.DEBUG,label:"DEBUG",icon:"fa-bug"},{level:le.INFO,label:"INFO",icon:"fa-circle-info"},{level:le.WARN,label:"WARN",icon:"fa-triangle-exclamation"},{level:le.ERROR,label:"ERROR",icon:"fa-circle-exclamation"}];Mg={id:"loggerPanel",render(){let t=I.getStats();return`
      <div class="yyt-logger-panel" id="${FT}">
        <div class="yyt-logger-toolbar">
          <div class="yyt-logger-filter-btns" data-yyt-log-filter-group>
            ${WT.map((e,r)=>`<button class="yyt-log-filter-btn ${r===0?"yyt-active":""}" data-level="${e.level??""}">
                <i class="fa-solid ${e.icon}"></i> ${e.label}
              </button>`).join("")}
          </div>
          <div class="yyt-logger-search-bar">
            <input class="yyt-input yyt-logger-search-input" type="text"
                   placeholder="\u641C\u7D22 scope \u6216\u6D88\u606F\u2026" data-yyt-log-search>
          </div>
          <div class="yyt-logger-actions">
            <label class="yyt-logger-autoscroll-label" title="\u5207\u6362\u81EA\u52A8\u6EDA\u52A8">
              <input type="checkbox" data-yyt-log-autoscroll checked> \u81EA\u52A8\u6EDA\u52A8
            </label>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-yyt-log-pause>
              <i class="fa-solid fa-pause"></i> \u6682\u505C
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-yyt-log-clear>
              <i class="fa-solid fa-eraser"></i> \u6E05\u9664
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-yyt-log-export>
              <i class="fa-solid fa-download"></i> \u5BFC\u51FA
            </button>
          </div>
        </div>

        <div class="yyt-logger-stats">
          <span class="yyt-logger-stat">\u5171 <strong>${t.total}</strong> \u6761</span>
          ${["ERROR","WARN","INFO","DEBUG"].map(e=>`<span class="yyt-logger-stat yyt-log-${e.toLowerCase()}">${e}: <strong>${t.byLevel[e]||0}</strong></span>`).join("")}
        </div>

        <div class="yyt-logger-list" data-yyt-log-list>
          <div class="yyt-logger-empty">\u6682\u65E0\u65E5\u5FD7\u8BB0\u5F55</div>
        </div>
      </div>
    `},bindEvents(t){let e=Q();if(!e||!ge(t))return;let r=this,s=null,n=!1,o=[],a=t.find("[data-yyt-log-list]"),i=t.find("[data-yyt-log-search]"),l=t.find("[data-yyt-log-autoscroll]"),c=t.find("[data-yyt-log-pause]");function d(p){if(!p.length){a.html('<div class="yyt-logger-empty">\u6682\u65E0\u5339\u914D\u7684\u65E5\u5FD7\u8BB0\u5F55</div>');return}a.html(p.map(f=>`
        <div class="yyt-log-entry ${HT(f.level)}" data-log-id="${f.id}">
          <span class="yyt-log-time">${YT(f.timestamp)}</span>
          <span class="yyt-log-level">${I.levelLabel(f.level)}</span>
          <span class="yyt-log-scope">${se(f.scope)}</span>
          <span class="yyt-log-msg">${se(f.message)}</span>
          ${f.data!==void 0?`<span class="yyt-log-data">${se(typeof f.data=="object"?JSON.stringify(f.data):String(f.data))}</span>`:""}
        </div>
      `).join(""))}function u(){let p=i.val()?.trim()||"",{entries:f}=I.getEntries({level:s,search:p||void 0,limit:500});d(f),l.is(":checked")&&requestAnimationFrame(()=>{a[0].scrollTop=a[0].scrollHeight})}function y(){if(n||!o.length)return;let p=o;o=[],u()}this._onLogEntry=p=>{if(n||s!==null&&p.level<s)return;let f=i.val()?.trim().toLowerCase()||"";if(f){let g=p.scope.toLowerCase().includes(f),h=p.message.toLowerCase().includes(f);if(!g&&!h)return}o.push(p),o.length>=50?y():this._flushTimer||(this._flushTimer=setTimeout(()=>{this._flushTimer=null,y(),r._updateStats(t)},250))},K.on("logger:entry",this._onLogEntry),t.on("click.yytLogger","[data-yyt-log-filter-group] .yyt-log-filter-btn",p=>{t.find("[data-yyt-log-filter-group] .yyt-log-filter-btn").removeClass("yyt-active"),e(p.currentTarget).addClass("yyt-active");let f=e(p.currentTarget).data("level");s=f===""?null:f,u(),r._updateStats(t)}),i.on("input.yytLogger",()=>{u()}),t.on("click.yytLogger","[data-yyt-log-pause]",()=>{n=!n,c.toggleClass("yyt-active",n),c.html(n?'<i class="fa-solid fa-play"></i> \u7EE7\u7EED':'<i class="fa-solid fa-pause"></i> \u6682\u505C'),n||(o=[],u(),r._updateStats(t))}),t.on("click.yytLogger","[data-yyt-log-clear]",()=>{I.clear(),a.html('<div class="yyt-logger-empty">\u65E5\u5FD7\u5DF2\u6E05\u9664</div>'),r._updateStats(t)}),t.on("click.yytLogger","[data-yyt-log-export]",()=>{let{entries:p}=I.getEntries({limit:1e4}),f=JSON.stringify(p.map(v=>({time:new Date(v.timestamp).toISOString(),level:I.levelLabel(v.level),scope:v.scope,message:v.message,data:v.data})),null,2),g=new Blob([f],{type:"application/json"}),h=URL.createObjectURL(g),x=document.createElement("a");x.href=h,x.download=`yyt-logs-${new Date().toISOString().replace(/[:.]/g,"-")}.json`,x.click(),URL.revokeObjectURL(h)}),u()},_updateStats(t){if(!Q()||!ge(t))return;let r=I.getStats(),s=t.find(".yyt-logger-stats");s.length&&s.html(`
      <span class="yyt-logger-stat">\u5171 <strong>${r.total}</strong> \u6761</span>
      ${["ERROR","WARN","INFO","DEBUG"].map(n=>`<span class="yyt-logger-stat yyt-log-${n.toLowerCase()}">${n}: <strong>${r.byLevel[n]||0}</strong></span>`).join("")}
    `)},destroy(t){let e=Q();this._onLogEntry&&(K.off("logger:entry",this._onLogEntry),this._onLogEntry=null),this._flushTimer&&(clearTimeout(this._flushTimer),this._flushTimer=null),!(!e||!ge(t))&&t.off(".yytLogger")},getStyles(){return`
      .yyt-logger-panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 0;
      }

      .yyt-logger-toolbar {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        padding: 10px 12px;
        background: transparent;
        border-bottom: 1px solid var(--yyt-border);
      }

      .yyt-logger-filter-btns {
        display: flex;
        gap: 4px;
      }

      .yyt-log-filter-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius);
        background: var(--yyt-surface);
        color: var(--yyt-text-secondary);
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .yyt-log-filter-btn:hover {
        background: var(--yyt-surface-hover);
        color: var(--yyt-text);
      }

      .yyt-log-filter-btn.yyt-active {
        background: var(--yyt-accent-soft);
        border-color: var(--yyt-accent);
        color: var(--yyt-accent);
      }

      .yyt-logger-search-bar {
        flex: 1;
        min-width: 140px;
      }

      .yyt-logger-search-input {
        min-height: 34px !important;
        font-size: 12px !important;
      }

      .yyt-logger-actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .yyt-logger-autoscroll-label {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 11px;
        color: var(--yyt-text-muted);
        cursor: pointer;
      }

      .yyt-logger-stats {
        display: flex;
        gap: 14px;
        padding: 6px 12px;
        font-size: 11px;
        color: var(--yyt-text-muted);
      }

      .yyt-logger-stat strong {
        color: var(--yyt-text);
      }

      .yyt-logger-stat.yyt-log-error strong { color: var(--yyt-error); }
      .yyt-logger-stat.yyt-log-warn strong { color: var(--yyt-warning); }
      .yyt-logger-stat.yyt-log-info strong { color: var(--yyt-accent); }
      .yyt-logger-stat.yyt-log-debug strong { color: var(--yyt-text-muted); }

      .yyt-logger-list {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        border-radius: 0;
        background: transparent;
        border: none;
        border-top: 1px solid var(--yyt-border);
        font-family: "Cascadia Code", "Fira Code", "Consolas", monospace;
        font-size: 12px;
        line-height: 1.55;
      }

      .yyt-logger-empty {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: var(--yyt-text-muted);
        font-size: 13px;
      }

      .yyt-log-entry {
        display: grid;
        grid-template-columns: 90px 52px 140px 1fr;
        gap: 8px;
        align-items: baseline;
        padding: 4px 11px;
        border-bottom: 1px solid var(--yyt-border-soft);
        min-width: 0;
      }

      .yyt-log-entry:hover {
        background: var(--yyt-surface-hover);
      }

      .yyt-log-time {
        color: var(--yyt-text-muted);
        flex-shrink: 0;
      }

      .yyt-log-level {
        font-weight: 700;
        font-size: 10px;
        text-transform: uppercase;
        flex-shrink: 0;
      }

      .yyt-log-scope {
        color: var(--yyt-text-secondary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .yyt-log-msg {
        color: var(--yyt-text);
        word-break: break-word;
        min-width: 0;
      }

      .yyt-log-data {
        grid-column: 1 / -1;
        padding: 4px 8px;
        margin-top: 2px;
        border-radius: var(--yyt-radius-sm);
        background: var(--yyt-surface);
        color: var(--yyt-text-muted);
        font-size: 11px;
        white-space: pre-wrap;
        word-break: break-all;
        max-height: 120px;
        overflow-y: auto;
      }

      .yyt-log-debug .yyt-log-level { color: var(--yyt-text-muted); }
      .yyt-log-info .yyt-log-level { color: var(--yyt-accent); }
      .yyt-log-warn .yyt-log-level { color: var(--yyt-warning); }
      .yyt-log-error .yyt-log-level { color: var(--yyt-error); }

      .yyt-log-error {
        background: rgba(248, 113, 113, 0.06);
      }

      .yyt-log-warn {
        background: rgba(251, 191, 36, 0.04);
      }

      @media screen and (max-width: 768px) {
        .yyt-log-entry {
          grid-template-columns: 70px 44px 100px 1fr;
          gap: 4px;
          padding: 4px 8px;
          font-size: 11px;
        }
        .yyt-logger-toolbar {
          gap: 6px;
        }
      }
    `}},GT=Mg});var Ug={};re(Ug,{MAIN_TAB_RENDERERS:()=>Hc,PanelState:()=>Ti,SCRIPT_ID:()=>as,SUB_TAB_RENDERERS:()=>Yc,UIManager:()=>Kn,bindDialogEvents:()=>On,closeActiveCustomSelectDropdown:()=>qt,closeCustomSelectDropdown:()=>Ei,createDialogHtml:()=>Ln,default:()=>VT,destroyEnhancedCustomSelects:()=>ct,downloadJson:()=>Bn,enhanceNativeSelects:()=>Nt,escapeHtml:()=>se,fillFormWithConfig:()=>ph,getAllStyles:()=>Kg,getFormApiConfig:()=>uh,getJQuery:()=>Q,getTargetDocument:()=>ur,initUI:()=>Lg,isContainerValid:()=>ge,normalizeCustomSelectOptions:()=>_d,openCustomSelectDropdown:()=>Td,readFileContent:()=>zn,registerComponents:()=>Rc,renderApiPanel:()=>Pc,renderBypassPanel:()=>Uc,renderCustomSelectControl:()=>Ed,renderEscapeTransformToolPanel:()=>zc,renderLoggerPanel:()=>Wc,renderMainTab:()=>Bg,renderPunctuationTransformToolPanel:()=>Kc,renderRegexPanel:()=>Dc,renderSettingsPanel:()=>jc,renderStatusBlockPanel:()=>Oc,renderSubTabComponent:()=>zg,renderSummaryToolPanel:()=>Lc,renderTableTemplatePanel:()=>$c,renderTableWorkbenchPanel:()=>Fc,renderToolPanel:()=>Og,renderWorldbookPresetPanel:()=>Nc,renderYouyouReviewPanel:()=>Bc,repositionActiveCustomSelectDropdown:()=>_i,resetJQueryCache:()=>sh,showConfirm:()=>pr,showPrompt:()=>yh,showToast:()=>C,showTopNotice:()=>is,toggleCustomSelectDropdown:()=>Sd,uiManager:()=>jt,withButtonLoading:()=>fh});async function Dg(t){if(!ei.has(t)){let e=Ng[t];if(typeof e!="function")throw new Error(`unknown_panel:${t}`);ei.set(t,e().then(r=>{let s=r?.[t]||r?.default;if(!s?.id)throw new Error(`invalid_panel:${t}`);return s}).catch(r=>{throw ei.delete(t),r}))}return ei.get(t)}function $g(t,e=null){let r=e?.message?`\uFF1A${se(e.message)}`:"";return`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>${se(t)}${r}</span></div>`}async function Rc(){let t=await Promise.allSettled(Object.keys(Ng).map(async r=>{let s=await Dg(r);return jt.register(s.id,s),s.id})),e=t.filter(r=>r.status==="rejected");e.length&&e.forEach(r=>Ao.error("\u7EC4\u4EF6\u6CE8\u518C\u5931\u8D25",r.reason)),Ao.log(`\u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210\uFF0C\u6210\u529F ${t.length-e.length} \u4E2A\uFF0C\u5931\u8D25 ${e.length} \u4E2A`)}async function Lg(t={}){let{autoInjectStyles:e=!0,targetDocument:r,...s}=t;jt.init(s),await Rc(),e&&jt.injectStyles(r),Ao.log("\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}async function qT(t){let e=await Dg(t);return jt.getComponent(e.id)||jt.register(e.id,e),e}async function xt(t,e,r={}){let s=await qT(t);jt.render(s.id,e,r)}function Pc(t){return xt("ApiPresetPanel",t)}function Nc(t){return xt("WorldbookPresetPanel",t)}function Dc(t){return xt("RegexExtractPanel",t)}function $c(t){return xt("TableTemplatePanel",t)}function Og(t){return xt("ToolManagePanel",t)}function Lc(t){return xt("SummaryToolPanel",t)}function Oc(t){return xt("StatusBlockPanel",t)}function Bc(t){return xt("YouyouReviewPanel",t)}function zc(t){return xt("EscapeTransformToolPanel",t)}function Kc(t){return xt("PunctuationTransformToolPanel",t)}function Uc(t){return xt("BypassPanel",t)}function jc(t){return xt("SettingsPanel",t)}function Fc(t){return xt("TableWorkbenchPanel",t)}function Wc(t){return xt("LoggerPanel",t)}async function Bg(t,e){let r=Hc[t];if(!r)return!1;try{await r.render(e)}catch(s){Ao.error(r.failMessage,s),e.html($g(r.failMessage,s))}return!0}async function zg(t,e){let r=Yc[t];if(!r)return null;try{await r.render(e)}catch(s){Ao.error(r.failMessage,s),e.html($g(r.failMessage,s))}return t}function Kg(){return jt.getAllStyles()}var Ao,Ng,ei,Hc,Yc,VT,jg=D(()=>{W();Ai();Ge();Ge();Ai();Ao=I.createScope("UI"),Ng=Object.freeze({ApiPresetPanel:()=>Promise.resolve().then(()=>(Fd(),jd)),WorldbookPresetPanel:()=>Promise.resolve().then(()=>(iu(),au)),RegexExtractPanel:()=>Promise.resolve().then(()=>(yp(),pp)),TableTemplatePanel:()=>Promise.resolve().then(()=>(Ay(),Ey)),ToolManagePanel:()=>Promise.resolve().then(()=>(Iy(),ky)),SummaryToolPanel:()=>Promise.resolve().then(()=>(Zy(),Qy)),StatusBlockPanel:()=>Promise.resolve().then(()=>(rf(),tf)),YouyouReviewPanel:()=>Promise.resolve().then(()=>(of(),nf)),EscapeTransformToolPanel:()=>Promise.resolve().then(()=>(df(),cf)),PunctuationTransformToolPanel:()=>Promise.resolve().then(()=>(yf(),pf)),BypassPanel:()=>Promise.resolve().then(()=>(mf(),gf)),SettingsPanel:()=>Promise.resolve().then(()=>(lc(),ic)),TableWorkbenchPanel:()=>Promise.resolve().then(()=>(Ig(),kg)),LoggerPanel:()=>Promise.resolve().then(()=>(Pg(),Rg))}),ei=new Map;Hc=Object.freeze({tableWorkbench:{render:t=>Fc(t),failMessage:"\u586B\u8868\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25"},bypass:{render:t=>Uc(t),failMessage:"Ai\u6307\u4EE4\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},settings:{render:t=>jc(t),failMessage:"\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},logger:{render:t=>Wc(t),failMessage:"\u65E5\u5FD7\u9762\u677F\u52A0\u8F7D\u5931\u8D25"}}),Yc=Object.freeze({ApiPresetPanel:{render:t=>Pc(t),failMessage:"API \u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},RegexExtractPanel:{render:t=>Dc(t),failMessage:"\u6B63\u5219\u63D0\u53D6\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},WorldbookPresetPanel:{render:t=>Nc(t),failMessage:"\u4E16\u754C\u4E66\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},TableTemplatePanel:{render:t=>$c(t),failMessage:"\u8868\u683C\u6A21\u677F\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},SummaryToolPanel:{render:t=>Lc(t),failMessage:"\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},StatusBlockPanel:{render:t=>Oc(t),failMessage:"\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25"},YouyouReviewPanel:{render:t=>Bc(t),failMessage:"\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25"},EscapeTransformToolPanel:{render:t=>zc(t),failMessage:"\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},PunctuationTransformToolPanel:{render:t=>Kc(t),failMessage:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"}});VT={uiManager:jt,registerComponents:Rc,initUI:Lg,renderApiPanel:Pc,renderWorldbookPresetPanel:Nc,renderRegexPanel:Dc,renderTableTemplatePanel:$c,renderToolPanel:Og,renderSummaryToolPanel:Lc,renderStatusBlockPanel:Oc,renderYouyouReviewPanel:Bc,renderEscapeTransformToolPanel:zc,renderPunctuationTransformToolPanel:Kc,renderBypassPanel:Uc,renderSettingsPanel:jc,renderTableWorkbenchPanel:Fc,renderLoggerPanel:Wc,MAIN_TAB_RENDERERS:Hc,SUB_TAB_RENDERERS:Yc,renderMainTab:Bg,renderSubTabComponent:zg,getAllStyles:Kg}});var qg={};re(qg,{TX_PHASE:()=>Ut,ToolAutomationService:()=>ri,Transaction:()=>ti,default:()=>eS,toolAutomationService:()=>Gg});function de(t){return t==null?"":String(t).trim()}function Fg(t){let e=Aa(t);return de(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.chat_filename??t?.this_chid??"chat_default")||"chat_default"}function Gc(t){let e=Aa(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function Yg(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="user"||e==="system"?!1:e==="assistant"||e==="ai"||!e}function JT(t,e){let r=de(e);if(!r)return null;let s=Gc(t);for(let n=s.length-1;n>=0;n-=1){let o=s[n];if([o?.messageId,o?.message_id,o?.id,o?.mid,o?.mesid,o?.chat_index,n].map(i=>de(i)).includes(r))return o||null}return null}function Wg(t){let e=Gc(t);if(!Array.isArray(e)||e.length===0)return null;let r=e.length-1,s=e[r]||null;if(!Yg(s))return null;let n=de(s?.messageId??s?.message_id??s?.id??s?.mid??s?.mesid??s?.chat_index??r);return n?{messageId:n,swipeId:de(s?.swipeId??s?.swipe_id??s?.swipe??s?.swipeIndex),message:s}:null}function ZT(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${t}_${e}`}var Ke,Hg,XT,QT,Ut,ti,ri,Gg,eS,Vg=D(()=>{yo();W();Vl();er();fo();Xl();ys();Qa();rr();Ke=I.createScope("ToolAutomation");Hg=1e4,XT=15e3,QT=800;Ut=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),ti=class{constructor({chatId:e,messageId:r,swipeId:s,sourceEvent:n,generationKey:o}){this.traceId=ZT(),this.chatId=e||"",this.messageId=r||"",this.swipeId=s||"",this.sourceEvent=n||"",this.generationKey=o||"",this.phase=Ut.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,r={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,r),this}toSnapshot(){return{...this}}},ri=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._recentlyProcessedSlots=new Map,this._ownWriteMessageIds=new Map,this._slotQueues=new Map,this._activeTransactions=new Map,this._isProcessing=!1,this._currentChatId="",this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""},this._messageReceivedThrottleUntil=0}setDebugMode(e){this.debugMode=e===!0}init(e={}){this.stop(),this._hostBindingStatus.lastInitAt=Date.now(),this._hostBindingStatus.initAttempts=(this._hostBindingStatus.initAttempts||0)+1;let r=Gr();this._currentChatId=Fg(r);let s=(n,...o)=>{let a=Gr(),{messageId:i,swipeId:l}=this._extractIdentitiesFromArgs(o);if(Ke.debug(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${n}"`,{messageId:i,swipeId:l,argCount:o.length}),n===Fe.MESSAGE_RECEIVED){let g=Date.now();if(g<this._messageReceivedThrottleUntil){Ke.debug(`MESSAGE_RECEIVED \u5728\u8282\u6D41\u7A97\u53E3\u5185\uFF0C\u8DF3\u8FC7\uFF08\u5269\u4F59 ${this._messageReceivedThrottleUntil-g}ms\uFF09`);return}this._messageReceivedThrottleUntil=g+this._getSettleMs()+5e3}let c=null,d=i,u=l;if(d&&(c=JT(a,d)),!c){let g=Wg(a);g?.messageId&&(c=g.message,d=g.messageId,u=g.swipeId||u)}if(!d||!c){Ke.debug(`\u4E8B\u4EF6 "${n}" \u65E0 assistant \u76EE\u6807\uFF0C\u8DF3\u8FC7`);return}if(!Yg(c)){Ke.debug(`\u4E8B\u4EF6 "${n}" \u547D\u4E2D\u975E assistant \u6D88\u606F\uFF0C\u8DF3\u8FC7`,{messageId:d});return}let y=String(c.content||c.mes||"").trim();if(!y||y.length<5){Ke.debug(`\u4E8B\u4EF6 "${n}" \u6D88\u606F\u8FC7\u77ED\uFF08${y.length} \u5B57\u7B26\uFF09\uFF0C\u8DF3\u8FC7`);return}if(this._isProcessing){Ke.debug(`\u4E8B\u4EF6 "${n}" \u6B63\u5728\u5904\u7406\u4E2D\uFF0C\u8DF3\u8FC7`);return}if(this._isOwnWrite(d)){Ke.debug(`\u4E8B\u4EF6 "${n}" \u547D\u4E2D own-write \u9ED1\u540D\u5355\uFF0C\u8DF3\u8FC7`,{messageId:d});return}let p=de(c?.swipeId??c?.swipe_id??c?.swipe??c?.swipeIndex);p&&(u=p);let f=`${d}::${u}`;if(this._isRecentlyProcessed(f)){Ke.debug(`\u4E8B\u4EF6 "${n}" slot \u5DF2\u8FD1\u671F\u5904\u7406\u8FC7\uFF0C\u8DF3\u8FC7`,{slotKey:f});return}this._scheduleMessageProcessing(d,u,{settleMs:this._getSettleMs(),sourceEvent:n}),Ke.info(`\u4E8B\u4EF6 "${n}" \u901A\u8FC7\u6240\u6709\u5B88\u536B\uFF0C\u5DF2\u8C03\u5EA6\u5904\u7406`,{targetMessageId:d,targetSwipeId:u,throttleUntil:this._messageReceivedThrottleUntil,isProcessing:this._isProcessing})};return this._stopCallbacks.push(zt.subscribe(Fe.MESSAGE_SENT,()=>{Ke.debug("MESSAGE_SENT \u2192 \u6E05\u7406\u8C03\u5EA6\u961F\u5217"),this._pendingTimers.forEach(n=>clearTimeout(n)),this._pendingTimers.clear()})),this._stopCallbacks.push(zt.subscribe(Fe.MESSAGE_RECEIVED,(...n)=>{s(Fe.MESSAGE_RECEIVED,...n)})),this._stopCallbacks.push(zt.subscribe(Fe.GENERATION_STOPPED,()=>{Ke.info("GENERATION_STOPPED \u2192 \u53D6\u6D88\u6240\u6709\u6D3B\u8DC3\u4E8B\u52A1"),this._cancelActiveTransactions("generation_stopped"),this._pendingTimers.forEach(n=>clearTimeout(n)),this._pendingTimers.clear(),this._isProcessing=!1})),this._stopCallbacks.push(zt.subscribe(Fe.CHAT_CHANGED,()=>{this._resetForChatChange()})),this._stopCallbacks.push(zt.subscribe(Fe.MESSAGE_DELETED,n=>{this._clearMessageState(de(n))})),this._refreshHostBindingStatus(),this._seedKnownSlots(),Ke.info("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{chatId:this._currentChatId,source:this._hostBindingStatus.source}),!0}_seedKnownSlots(){try{let e=Gr(),r=Wg(e);if(!r?.messageId)return;let s=`${de(r.messageId)}::${de(r.swipeId)}`;this._recentlyProcessedSlots.set(s,Number.MAX_SAFE_INTEGER),Ke.debug(`\u5DF2\u5C06\u5F53\u524D\u6700\u65B0 slot "${s}" \u9884\u6807\u8BB0\u4E3A\u5DF2\u77E5\uFF0C\u8DF3\u8FC7 MESSAGE_RECEIVED \u91CD\u653E`)}catch(e){Ke.warn("_seedKnownSlots \u5931\u8D25",{error:e})}}_refreshHostBindingStatus(){let e=zt.describe(),r=[Fe.MESSAGE_SENT,Fe.MESSAGE_RECEIVED,Fe.GENERATION_STOPPED,Fe.CHAT_CHANGED,Fe.MESSAGE_DELETED];this._hostBindingStatus={...this._hostBindingStatus,initialized:!!e.hasBridge,lastInitResult:e.hasBridge?"ready":e.retryScheduled?"pending_retry":"pending",source:e.source,hasEventSource:!!e.hasBridge,hasEventTypes:Array.isArray(e.availableEvents)&&e.availableEvents.length>0,eventBindings:r.map(s=>`subscribed: ${s}`),retryScheduled:!!e.retryScheduled,retryDelayMs:0,lastError:""}}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(r){Ke.warn("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",{error:r})}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("service_stopped"),this._activeTransactions.clear(),this._isProcessing=!1,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""}}isEnabled(){return!0}getRuntimeSnapshot(){return this._pruneRecentSlots(),this._pruneOwnWrites(),this._refreshHostBindingStatus(),{currentChatId:this._currentChatId,enabled:!0,isProcessing:this._isProcessing,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,recentlyProcessedSlotCount:this._recentlyProcessedSlots.size,ownWriteMessageIdCount:this._ownWriteMessageIds.size,activeTransactionCount:this._activeTransactions.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),hostBinding:{...this._hostBindingStatus,eventBindings:Array.isArray(this._hostBindingStatus?.eventBindings)?[...this._hostBindingStatus.eventBindings]:[]},settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let r=await ps({messageId:"",swipeId:"",runSource:"AUTO"}),s=de(r?.sourceMessageId||r?.messageId);return s?this.processAssistantMessage(s,{force:e.force===!0,swipeId:de(r?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:r=!1,swipeId:s="",sourceEvent:n="AUTO"}={}){let o=new ti({chatId:this._currentChatId,messageId:e,swipeId:s,sourceEvent:n});try{if(!e)return this._skipTransaction(o,"missing_message_id");o.transition(Ut.CONFIRMED);let a=await ps({messageId:e,swipeId:s,runSource:"AUTO"}),i=a?.targetAssistantMessage||null;if(!i||!a?.sourceMessageId)return this._skipTransaction(o,"assistant_message_not_found");let l=String(i.content||i.mes||"").trim();if(!l||l.length<5)return this._skipTransaction(o,"assistant_message_too_short");o.transition(Ut.CONTEXT_BUILT);let c=`${de(a.sourceMessageId)}::${de(a.sourceSwipeId||s)}`;if(o.generationKey=c,!r&&this._isRecentlyProcessed(c))return this._skipTransaction(o,"duplicate_slot",{slotKey:c});let d=Vn(),u=It.filterAutoPostResponseTools(d),p=[...d.filter(h=>It.shouldRunLocalTransform(h)&&h.output?.autoTrigger!==!1),...u],f=ke(),g=f?.autoUpdateEnabled===!0&&de(f?.autoUpdateTrigger||"assistantMessage")==="assistantMessage";return!p.length&&!g?this._skipTransaction(o,"no_auto_tools",{tools:p}):(o.slotKey=c,o.slotRevisionKey=a.slotRevisionKey||"",o.sourceMessageId=a.sourceMessageId||e,o.sourceSwipeId=a.sourceSwipeId||s||"",this._enqueueSlot(c,async()=>{if(!r&&this._isRecentlyProcessed(c))return this._skipTransaction(o,"duplicate_slot_after_queue",{slotKey:c});this._isProcessing=!0,this._markSlotProcessed(c),o.transition(Ut.REQUEST_STARTED);let h=new AbortController;this._registerActiveTransaction(o,{controller:h,slotKey:c,sourceMessageId:a.sourceMessageId||e,sourceSwipeId:a.sourceSwipeId||s||""});try{let{results:x,hasWriteback:v}=await this._executeAutoTools(p,a,h,o,{slotKey:c,messageId:e,swipeId:s}),{tableResult:T,hasWriteback:L}=await this._executeAutoTableUpdate(a,h,o,{shouldRunTableAuto:g,tableWorkbenchConfig:f,messageId:e,swipeId:s,sourceEvent:n}),M=v||L;o.transition(Ut.REQUEST_FINISHED,{toolResults:x,tableResult:T}),M&&(o.transition(Ut.WRITEBACK_STARTED),o.writebackState={messageId:a.sourceMessageId,swipeId:a.sourceSwipeId,hasOutput:!0},this._messageReceivedThrottleUntil=Date.now()+XT),this._markSlotProcessed(c);let _=x.every(S=>S?.success!==!1),A=!g||!!T?.success||T?.skipped===!0||T?.meta?.aborted===!0||T?.meta?.stale===!0,F=_&&A,H=x.some(S=>S?.meta?.aborted===!0||S?.meta?.stale===!0||S?.error==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")||T?.meta?.aborted===!0||T?.meta?.stale===!0;F&&o.transition(Ut.WRITEBACK_COMMITTED);let R=F?Ut.REFRESH_CONFIRMED:Ut.FAILED;return o.transition(R,{verdict:H?"aborted":F?"success":"partial_failure"}),this._recordTransaction(o),this._updateAutoRuntimeForResults(p,a,o,x),{success:F,traceId:o.traceId,slotKey:c,sourceEvent:n,messageId:a.sourceMessageId||e,phase:o.phase,results:x,tableResult:T}}finally{this._unregisterActiveTransaction(o.traceId),this._isProcessing=!1}}))}catch(a){return o.transition(Ut.FAILED,{error:a?.message||String(a)}),this._recordTransaction(o),this._unregisterActiveTransaction(o.traceId),this._isProcessing=!1,Ke.error("processAssistantMessage \u5F02\u5E38",{error:a}),{success:!1,traceId:o.traceId,error:o.error,phase:o.phase}}}_extractIdentitiesFromArgs(e){let r="",s="";for(let n of e)if(n!=null){if(typeof n=="number"&&Number.isFinite(n)&&!r){r=de(n);continue}if(typeof n=="string"){let o=de(n);!r&&/^\d+$/.test(o)&&(r=o);continue}typeof n=="object"&&(r||(r=de(n.messageId??n.message_id??n.id??n.mid??n.mesid??n.chat_index??n.message?.messageId??n.message?.message_id??n.message?.id??n.message?.mid??n.message?.mesid??n.message?.chat_index??n.data?.messageId??n.data?.message_id??n.data?.id??n.data?.mid??n.data?.mesid??n.data?.chat_index??n.target?.messageId??n.target?.message_id??n.target?.id??n.target?.mid??n.target?.mesid??n.target?.chat_index)),s||(s=de(n.swipeId??n.swipe_id??n.swipe??n.swipeIndex??n.currentSwipe??n.message?.swipeId??n.message?.swipe_id??n.message?.swipe??n.data?.swipeId??n.data?.swipe_id??n.data?.swipe??n.target?.swipeId??n.target?.swipe_id??n.target?.swipe)))}return{messageId:r,swipeId:s}}_scheduleMessageProcessing(e,r="",s={}){let n=s.settleMs??this._getSettleMs(),o=`msg::${de(e)}::${de(r)}`,a=this._pendingTimers.get(o);a&&clearTimeout(a);let i=setTimeout(()=>{this._pendingTimers.delete(o),this.processAssistantMessage(e,{swipeId:r,sourceEvent:s.sourceEvent||"AUTO"}).catch(l=>{Ke.error("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:l})})},Math.max(0,n));this._pendingTimers.set(o,i),Ke.info("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:o,settleMs:n,sourceEvent:s.sourceEvent})}cancelAutomation(e={}){let r=e.reason||"manual_cancel",s=de(e.messageId),n=de(e.slotKey),o=de(e.traceId),a=0;for(let[i,l]of this._pendingTimers){let c=s&&i.includes(`::${s}::`),d=n&&i.includes(n);(c||d||!s&&!n&&!o)&&(clearTimeout(l),this._pendingTimers.delete(i),a+=1)}return a+=this._cancelActiveTransactions(r,{messageId:s,slotKey:n,traceId:o}),{success:a>0,cancelledCount:a,reason:r}}_isRecentlyProcessed(e){if(!e)return!1;this._pruneRecentSlots();let r=this._recentlyProcessedSlots.get(e);return r?Date.now()-r<this._getDedupeWindowMs():!1}_markSlotProcessed(e){e&&(this._recentlyProcessedSlots.set(e,Date.now()),this._pruneRecentSlots())}_pruneRecentSlots(){let e=Date.now()-this._getDedupeWindowMs();for(let[r,s]of this._recentlyProcessedSlots)(!Number.isFinite(s)||s<e)&&this._recentlyProcessedSlots.delete(r)}async _executeAutoTools(e,r,s,n,{slotKey:o,messageId:a,swipeId:i}){let l=[],c=!1,d=r.lastAiMessage,u=r.assistantBaseText;for(let y of e){let p={...r,signal:s.signal,isAutoRun:!0,abortMeta:{traceId:n.traceId,slotKey:o,sourceMessageId:r.sourceMessageId||a,sourceSwipeId:r.sourceSwipeId||i||""},shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:n.traceId}),skipNotify:!0,lastAiMessage:d,assistantBaseText:u,input:{...r.input||{},lastAiMessage:d,assistantBaseText:u}},g=It.shouldRunLocalTransform(y)?await $a(y,p):await It.runToolPostResponse(y,p);if(l.push(g),g?.writebackState||g?.output){c=!0,this._markOwnWrite(r.sourceMessageId||a);let h=this._readCurrentMessageText(r.sourceMessageId||a);if(h){d=h,u=h;let x=Number(r.sourceMessageId||a);Array.isArray(r.chatMessages)&&r.chatMessages[x]&&(r.chatMessages[x].content=h,r.chatMessages[x].mes=h)}}}return{results:l,hasWriteback:c}}async _executeAutoTableUpdate(e,r,s,{shouldRunTableAuto:n,tableWorkbenchConfig:o,messageId:a,swipeId:i,sourceEvent:l}){if(!n)return{tableResult:null,hasWriteback:!1};let c=await dg({messageId:e.sourceMessageId||a,swipeId:e.sourceSwipeId||i||"",sourceEvent:l,configInput:o,signal:r.signal,shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:s.traceId})}),d=!!(c?.state||c?.mirrorResult?.success===!0);return d&&this._markOwnWrite(e.sourceMessageId||a),{tableResult:c,hasWriteback:d}}_readCurrentMessageText(e){let r=Gr(),s=Gc(r),n=Number(e);if(!Number.isFinite(n)||n<0||n>=s.length)return"";let o=s[n];return String(o?.mes||o?.content||"").trim()}_markOwnWrite(e){let r=de(e);r&&(this._ownWriteMessageIds.set(r,Date.now()),this._pruneOwnWrites())}_isOwnWrite(e){let r=de(e);if(!r)return!1;this._pruneOwnWrites();let s=this._ownWriteMessageIds.get(r);return s?Date.now()-s<Hg:!1}_pruneOwnWrites(){let e=Date.now()-Hg;for(let[r,s]of this._ownWriteMessageIds)(!Number.isFinite(s)||s<e)&&this._ownWriteMessageIds.delete(r)}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),Ke.debug(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,r,s={}){return e.transition(Ut.SKIPPED,{verdict:r,...s}),this._recordTransaction(e),Array.isArray(s?.tools)&&s.tools.length>0&&this._updateAutoRuntimeForSkip(s.tools,e,r,s),{success:!1,skipped:!0,reason:r,traceId:e.traceId,...s}}_enqueueSlot(e,r){let n=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(r).finally(()=>{this._slotQueues.get(e)===n&&this._slotQueues.delete(e)});return this._slotQueues.set(e,n),n}_registerActiveTransaction(e,r={}){e?.traceId&&this._activeTransactions.set(e.traceId,{traceId:e.traceId,generationKey:r.generationKey||e.generationKey||"",slotKey:r.slotKey||e.slotKey||"",sourceMessageId:r.sourceMessageId||e.sourceMessageId||"",sourceSwipeId:r.sourceSwipeId||e.sourceSwipeId||"",slotRevisionKey:r.slotRevisionKey||e.slotRevisionKey||"",assistantBaseFingerprint:r.assistantBaseFingerprint||"",assistantBaseText:r.assistantBaseText||"",controller:r.controller||null,cancelled:!1,cancelReason:""})}_unregisterActiveTransaction(e){e&&this._activeTransactions.delete(e)}_cancelActiveTransactions(e="manual_cancel",r={}){let s=de(r.messageId),n=de(r.slotKey),o=de(r.traceId),a=0;for(let[i,l]of this._activeTransactions){let c=o&&i===o,d=s&&de(l?.sourceMessageId)===s,u=n&&de(l?.slotKey)===n;if(!(!c&&!d&&!u&&!(!o&&!s&&!n))){l.cancelled=!0,l.cancelReason=e;try{l?.controller?.abort?.()}catch{}a+=1}}return a}_shouldAbortAutoWriteback(e={}){let r=de(e.traceId);if(r){let s=this._activeTransactions.get(r);if(!s||s.cancelled)return{aborted:!0,reason:"cancelled_before_host_commit"}}return!1}_updateAutoRuntimeForSkip(e,r,s,n={}){e.forEach(o=>{o?.id&&Or(o.id,{lastAutoRunAt:Date.now(),lastAutoStatus:"skipped",lastAutoMessageId:r?.sourceMessageId||r?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||r?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||n?.slotRevisionKey||"",lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:!1,lastAutoSkipReason:s||""},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_updateAutoRuntimeForResults(e,r,s,n=[]){e.forEach((o,a)=>{if(!o?.id)return;let i=n[a]||{},l=i?.meta?.writebackDetails||{},c=i?.meta?.aborted===!0||i?.meta?.stale===!0?"aborted":i?.success===!1?"failed":"success",d=i?.meta?.aborted===!0?i?.meta?.abortReason||(i?.meta?.stale===!0?"stale_base_changed":"cancelled_before_host_commit"):"";Or(o.id,{lastAutoRunAt:Date.now(),lastAutoStatus:c,lastAutoMessageId:r?.sourceMessageId||s?.sourceMessageId||s?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||s?.sourceSwipeId||s?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||s?.slotRevisionKey||"",lastAutoWritebackStatus:i?.meta?.writebackStatus||"",lastAutoRefreshConfirmed:!!l.refreshConfirmed,lastAutoSkipReason:d},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_resetForChatChange(){let e=Gr(),r=Fg(e);Ke.info("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:r}),this._currentChatId=r,this._pendingTimers.forEach(s=>clearTimeout(s)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("chat_changed"),this._activeTransactions.clear(),this._isProcessing=!1,this._messageReceivedThrottleUntil=0,this._seedKnownSlots()}_clearMessageState(e){if(e){for(let[r,s]of this._pendingTimers)(r.includes(`::${e}::`)||r.startsWith(`msg::${e}::`))&&(clearTimeout(s),this._pendingTimers.delete(r));for(let r of this._recentlyProcessedSlots.keys())r.startsWith(`${e}::`)&&this._recentlyProcessedSlots.delete(r);this._ownWriteMessageIds.delete(de(e)),this._seedKnownSlots()}}_getAutomationSettings(){let e=Bt.getSettings()?.automation||{},r=Number.isFinite(e.settleMs)?e.settleMs:QT;return{settleMs:r,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(5e3,r+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}},Gg=new ri,eS=Gg});var Zg={};re(Zg,{BUILTIN_REGEX_PRESETS:()=>ni,BUILTIN_WORLDBOOK_PRESETS:()=>qc,MIGRATION_BACKUP_KEY:()=>Xg,MIGRATION_DONE_KEY:()=>si,default:()=>nS,ensurePresetSystem:()=>Qg,registerBuiltinPresets:()=>Vc,runMigrationOnce:()=>Jc});function tS(t){if(!Array.isArray(t)||t.length===0)return null;let e=t.map(r=>String(r||"").trim()).filter(Boolean).sort().join("|");if(!e)return null;for(let r of ni)if(r.rules.filter(n=>n.type==="include"&&n.enabled!==!1).map(n=>n.value).sort().join("|")===e)return r.id;return null}function Vc(){try{typeof il=="function"&&il(ni),typeof Li=="function"&&Li(qc),Xr.info("\u5185\u7F6E\u9884\u8BBE\u5DF2\u6CE8\u518C",{regex:ni.length,worldbook:qc.length})}catch(t){Xr.error("\u6CE8\u518C\u5185\u7F6E\u9884\u8BBE\u5931\u8D25",{error:t})}}function rS(t){let e=new Set,r=[];for(let s of Array.isArray(t)?t:[]){let n=String(s||"").trim();if(!(!n||e.has(n)))if(e.add(n),n.startsWith("regex:")){let o=n.slice(6).trim();o&&r.push({type:"regex_include",value:o,enabled:!0,name:"",description:""})}else r.push({type:"include",value:n,enabled:!0,name:"",description:""})}return r}function sS(t,e,r){let s=JSON.parse(JSON.stringify(r||{})),n=!1,o=s.extraction||{};if(!o.regexPresetId){let i=Array.isArray(o.selectors)?o.selectors:[];if(i.length>0){let l=tS(i);if(l)o.regexPresetId=l,n=!0,Xr.info(`\u5DE5\u5177 ${t} \u7ED1\u5B9A\u5185\u7F6E\u6B63\u5219\u9884\u8BBE: ${l}`);else{let c=na({name:`${e||t}_\u8FC1\u79FB_\u6B63\u5219`,description:`\u81EA\u8001\u7248\u672C selectors \u81EA\u52A8\u8FC1\u79FB\uFF08${i.length} \u9879\uFF09`,rules:rS(i),blacklist:[]});c?.id&&(o.regexPresetId=c.id,n=!0,Xr.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u6B63\u5219\u9884\u8BBE: ${c.id}`))}s.extraction=o}}let a=s.worldbooks||{};if(!a.presetId&&a.enabled===!0&&Array.isArray(a.selected)&&a.selected.length>0){let i=Wo({name:`${e||t}_\u8FC1\u79FB_\u4E16\u754C\u4E66`,description:`\u81EA\u8001\u7248\u672C worldbooks.selected \u81EA\u52A8\u8FC1\u79FB\uFF08${a.selected.length} \u672C\uFF09`,bindingMode:"custom",includeDisabled:!1,bookList:a.selected.map(l=>({bookName:String(l||""),enabled:!0,entryOverrides:{}})).filter(l=>l.bookName)});i?.id&&(a.presetId=i.id,n=!0,Xr.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u4E16\u754C\u4E66\u9884\u8BBE: ${i.id}`)),s.worldbooks=a}return n?s:null}function Jc(){try{if(Se.get(si)===!0)return{skipped:!0,reason:"already_done"};let t=$.get(Jg)||{};if(!t||typeof t!="object")return Xr.info("\u65E0\u5DE5\u5177\u914D\u7F6E\u9700\u8981\u8FC1\u79FB"),Se.set(si,!0),{skipped:!0,reason:"no_configs"};Se.set(Xg,{ts:Date.now(),version:"v45",snapshot:t});let e=0,r={...t};for(let[s,n]of Object.entries(t)){if(!n||typeof n!="object")continue;let o=sS(s,n.name,n);o&&(r[s]=o,e+=1)}return e>0&&$.set(Jg,r),Se.set(si,!0),Xr.info("\u8FC1\u79FB\u5B8C\u6210",{migratedCount:e,total:Object.keys(t).length}),{skipped:!1,migratedCount:e,total:Object.keys(t).length}}catch(t){return Xr.error("\u8FC1\u79FB\u5931\u8D25\uFF0C\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559",{error:t}),{skipped:!1,error:t?.message||String(t),aborted:!0}}}function Qg(){return Vc(),Jc()}var Xr,si,Xg,Jg,ni,qc,nS,em=D(()=>{Be();W();zr();js();Xr=I.createScope("PresetBootstrap"),si="migration_v45_done",Xg="migration_v45_backup",Jg="tool_configs",ni=[{id:"builtin_regex_summary",name:"\u5185\u7F6E \xB7 \u603B\u7ED3\u63D0\u53D6",description:"\u63D0\u53D6 <boo_FM> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u8BB0\u5FC6\u538B\u7F29\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_summary_1",type:"include",value:"boo_FM",enabled:!0,name:"\u603B\u7ED3\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_status_block",name:"\u5185\u7F6E \xB7 \u72B6\u6001\u680F\u63D0\u53D6",description:"\u63D0\u53D6 <status_block> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u72B6\u6001\u680F\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_status_1",type:"include",value:"status_block",enabled:!0,name:"\u72B6\u6001\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_youyou",name:"\u5185\u7F6E \xB7 \u4F18\u4F18\u9510\u8BC4\u63D0\u53D6",description:"\u63D0\u53D6 <youyou> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u4F18\u4F18\u9510\u8BC4\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_youyou_1",type:"include",value:"youyou",enabled:!0,name:"\u4F18\u4F18\u6807\u7B7E",description:""}],blacklist:[]}],qc=[];nS={registerBuiltinPresets:Vc,runMigrationOnce:Jc,ensurePresetSystem:Qg}});var Qc={};re(Qc,{confirmDeleteTool:()=>dS,confirmResetTools:()=>yS,getAllTools:()=>Xt,getTool:()=>Qt,showExportToolsDialog:()=>uS,showImportToolsDialog:()=>pS,showToolEditDialog:()=>cS});async function cS(t=null){let e=t?Qt(t):null,r=!!e,s=Xe({value:e?.name||"",placeholder:"\u5DE5\u5177\u540D\u79F0"}),n=qe({value:e?.category||"utility",options:lS}),o=Xe({value:e?.description||"",placeholder:"\u5DE5\u5177\u63CF\u8FF0"}),a=m("input",{className:"yyt-input",attrs:{type:"number",min:"1000"},style:{padding:"7px 10px",fontSize:"12px"}});a.value=String(e?.config?.execution?.timeout||6e4);let i=m("input",{className:"yyt-input",attrs:{type:"number",min:"0",max:"10"},style:{padding:"7px 10px",fontSize:"12px"}});i.value=String(e?.config?.execution?.retries??3);function l(p,f,g=""){let h=m("div",{className:"yyt-form-group",style:{margin:"0 0 12px 0"}});return h.appendChild(m("label",{text:p,style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))",display:"block",marginBottom:"4px"}})),h.appendChild(f),g&&h.appendChild(m("div",{text:g,style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginTop:"4px"}})),h}let c=m("div",{style:{display:"flex",flexDirection:"column"}}),d=m("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});d.appendChild(l("\u5DE5\u5177\u540D\u79F0",s.el)),d.appendChild(l("\u5206\u7C7B",n.el)),c.appendChild(d),c.appendChild(l("\u63CF\u8FF0",o.el));let u=m("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});u.appendChild(l("\u8D85\u65F6\u65F6\u95F4 (ms)",a)),u.appendChild(l("\u91CD\u8BD5\u6B21\u6570",i)),c.appendChild(u);let y=Ce.custom({title:r?`\u7F16\u8F91\u5DE5\u5177\u300C${e.name}\u300D`:"\u65B0\u5EFA\u5DE5\u5177",width:"480px",body:c,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:p=>p(null)},{label:r?"\u4FDD\u5B58":"\u521B\u5EFA",variant:"primary",onClick:p=>{let f=String(s.get()||"").trim();if(!f){s.el.focus();return}let g=t||`tool_${Date.now()}`;if(!Gs(g,{name:f,category:n.get(),description:String(o.get()||"").trim(),promptTemplate:e?.promptTemplate||"",extractTags:Array.isArray(e?.extractTags)?e.extractTags:[],config:{execution:{timeout:Math.max(1e3,parseInt(a.value,10)||6e4),retries:Math.max(0,parseInt(i.value,10)||3)},api:e?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(e?.config?.messages)?e.config.messages:[],context:{depth:e?.config?.context?.depth||3,includeTags:Array.isArray(e?.config?.context?.includeTags)?e.config.context.includeTags:[],excludeTags:Array.isArray(e?.config?.context?.excludeTags)?e.config.context.excludeTags:[]},worldbooks:{enabled:e?.config?.worldbooks?.enabled===!0,selected:Array.isArray(e?.config?.worldbooks?.selected)?e.config.worldbooks.selected:[]}},enabled:e?.enabled!==!1})){Xc.warn("saveTool \u5931\u8D25",{id:g});return}try{Zs(g)}catch(x){Xc.warn("ensureToolRuntimeConfig \u5F02\u5E38",{err:x})}p(g)}}]});return setTimeout(()=>s.el.focus(),0),y.result}async function dS(t){let e=Qt(t);return!e||!await Ce.confirm({title:"\u5220\u9664\u5DE5\u5177",message:`\u786E\u5B9A\u5220\u9664\u5DE5\u5177\u300C${e.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})?!1:qs(t)}function uS(){let t;try{t=Vs()}catch(r){Ce.confirm({title:"\u5BFC\u51FA\u5931\u8D25",message:String(r?.message||r),confirmText:"\u786E\u5B9A"});return}let e=m("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});e.value=t,e.readOnly=!0,Ce.custom({title:"\u5BFC\u51FA\u5DE5\u5177 JSON",width:"600px",body:e,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:r=>r(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(t)}catch{e.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let r=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(r),n=m("a",{attrs:{href:s,download:`youyou_tools_${Date.now()}.json`}});document.body.appendChild(n),n.click(),setTimeout(()=>{try{document.body.removeChild(n)}catch{}try{URL.revokeObjectURL(s)}catch{}},100)}catch(r){Xc.warn("\u4E0B\u8F7D\u5931\u8D25",{err:r})}}}]})}async function pS(){let t=m("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34 YouYou Toolkit \u5DE5\u5177 JSON"},style:{width:"100%",minHeight:"200px",fontSize:"12px",fontFamily:"monospace"}}),e=m("label",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"var(--yyt-text-secondary)",marginTop:"8px"}}),r=m("input",{attrs:{type:"checkbox"}});e.appendChild(r),e.appendChild(m("span",{text:"\u8986\u76D6\u6A21\u5F0F\uFF08\u6E05\u7A7A\u5DF2\u6709\u5DE5\u5177\u540E\u518D\u5BFC\u5165\uFF1B\u4E0D\u52FE\u9009\u5219\u5408\u5E76\uFF09"}));let s=m("div");s.appendChild(t),s.appendChild(e),s.appendChild(m("div",{style:{display:"flex",gap:"6px",marginTop:"8px"}},ce({label:"\u{1F4C1} \u4ECE\u6587\u4EF6\u2026",size:"small",variant:"ghost",onClick:()=>{let o=m("input",{attrs:{type:"file",accept:"application/json,.json"}});o.addEventListener("change",()=>{let a=o.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{t.value=String(i.result||""),t.focus()},i.readAsText(a)}),o.click()}}).el));let n=Ce.custom({title:"\u5BFC\u5165\u5DE5\u5177 JSON",width:"520px",body:s,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:o=>o(null)},{label:"\u5BFC\u5165",variant:"primary",onClick:async o=>{let a=t.value.trim();if(!a){o(null);return}try{let i=Js(a,{overwrite:r.checked});o(i)}catch(i){await Ce.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(i?.message||i),confirmText:"\u786E\u5B9A"})}}}]});return setTimeout(()=>t.focus(),0),n.result}async function yS(){return await Ce.confirm({title:"\u91CD\u7F6E\u6240\u6709\u5DE5\u5177",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u81EA\u5B9A\u4E49\u5DE5\u5177\u4E0E\u9884\u8BBE\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002\u5185\u7F6E\u5DE5\u5177\u4E0D\u53D7\u5F71\u54CD\u3002",confirmText:"\u91CD\u7F6E",danger:!0})?(Xs(),!0):!1}var Xc,lS,Zc=D(()=>{Uo();yr();Yn();er();W();Xc=I.createScope("ToolActions"),lS=[{value:"api",label:"API"},{value:"prompt",label:"Prompt"},{value:"utility",label:"Utility"}]});W();function tm(t,e={}){let{constants:r,topLevelWindow:s,modules:n}=t,{SCRIPT_ID:o,SCRIPT_VERSION:a,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=r,c=null,d=!1,u=I.createScope("Bootstrap");function y(...M){u.log(M.join(" "))}function p(...M){u.error(M.join(" "))}async function f(){return c||(c=(async()=>{try{n.storageModule=await Promise.resolve().then(()=>(Be(),sd)),n.apiConnectionModule=await Promise.resolve().then(()=>(Po(),ld)),n.presetManagerModule=await Promise.resolve().then(()=>($n(),pd)),n.uiModule=await Promise.resolve().then(()=>(jg(),Ug)),n.regexExtractorModule=await Promise.resolve().then(()=>(Ys(),Vi)),n.toolManagerModule=await Promise.resolve().then(()=>(Yn(),Bu)),n.toolExecutorModule=await Promise.resolve().then(()=>(ec(),Zl)),n.windowManagerModule=await Promise.resolve().then(()=>(Tc(),fg)),n.toolRegistryModule=await Promise.resolve().then(()=>(er(),sl)),n.settingsServiceModule=await Promise.resolve().then(()=>(yo(),Py)),n.bypassManagerModule=await Promise.resolve().then(()=>(xn(),Ry)),n.variableResolverModule=await Promise.resolve().then(()=>(Ra(),By)),n.contextInjectorModule=await Promise.resolve().then(()=>(ks(),Ly)),n.toolPromptServiceModule=await Promise.resolve().then(()=>(Na(),Ky)),n.toolOutputServiceModule=await Promise.resolve().then(()=>(fo(),jy)),n.toolAutomationServiceModule=await Promise.resolve().then(()=>(Vg(),qg)),n.toolDataProviderModule=await Promise.resolve().then(()=>(dn(),Kp)),n.presetBootstrapModule=await Promise.resolve().then(()=>(em(),Zg));try{n.toolDataProviderModule.getToolDataProvider({extensionVersion:a}).then(M=>{u.log(`Provider \u5C31\u7EEA: ${M.kind}`)}).catch(M=>{u.error(`Provider \u521D\u59CB\u5316\u5F02\u5E38: ${M?.message||M}`)})}catch(M){u.error(`Provider \u542F\u52A8\u5F02\u5E38: ${M?.message||M}`)}return n.toolOutputServiceModule?.toolOutputService&&n.apiConnectionModule&&n.toolOutputServiceModule.toolOutputService.setApiConnection(n.apiConnectionModule),!0}catch(M){return c=null,p("\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:",M),p("\u5DF2\u52A0\u8F7D\u6A21\u5757:",Object.keys(n).filter(_=>n[_])),!1}})(),c)}function g(){return`
/**
 * YouYou Toolkit - \u4E3B\u6837\u5F0F\u6587\u4EF6
 * @description \u62BD\u79BB\u6837\u5F0F\uFF0C\u5305\u542B\u4E3B\u9876\u680F\u3001\u6B21\u7EA7\u9876\u680F\u3001\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u548C\u7A97\u53E3\u6837\u5F0F
 */

/* ============================================================
   CSS\u53D8\u91CF
   ============================================================ */

:root {
  /* \u2014\u2014 Accent & semantic \u2014\u2014 */
  --yyt-accent: #7bb7ff;
  --yyt-accent-glow: rgba(123, 183, 255, 0.4);
  --yyt-accent-soft: rgba(123, 183, 255, 0.15);
  --yyt-accent-strong: #a5d4ff;
  --yyt-on-accent: #0a0d13;
  --yyt-success: #4ade80;
  --yyt-success-glow: rgba(74, 222, 128, 0.3);
  --yyt-error: #ef4444;
  --yyt-danger: var(--yyt-error);
  --yyt-danger-soft: rgba(239, 68, 68, 0.16);
  --yyt-error-glow: rgba(239, 68, 68, 0.3);
  --yyt-warning: #fbbf24;

  /* \u2014\u2014 Surface ladder (solid, no gradients) \u2014\u2014 */
  --yyt-bg-base: #0a0d13;
  --yyt-surface: #0f1219;
  --yyt-surface-2: #151a24;
  --yyt-surface-3: #1c2231;
  --yyt-surface-hover: #1c2231;
  --yyt-surface-active: #232b3e;
  --yyt-surface-raised: var(--yyt-surface-2);
  --yyt-surface-overlay: var(--yyt-surface-3);
  --yyt-surface-elevated: var(--yyt-surface-active);

  /* \u2014\u2014 Borders (two-level hairline) \u2014\u2014 */
  --yyt-border: rgba(255, 255, 255, 0.06);
  --yyt-border-soft: rgba(255, 255, 255, 0.04);
  --yyt-border-strong: rgba(255, 255, 255, 0.12);
  --yyt-border-subtle: var(--yyt-border-soft);
  --yyt-border-default: var(--yyt-border);
  --yyt-border-emphasis: var(--yyt-border-strong);
  --yyt-border-focus: rgba(123, 183, 255, 0.5);

  /* \u2014\u2014 Text \u2014\u2014 */
  --yyt-text: rgba(255, 255, 255, 0.92);
  --yyt-text-secondary: rgba(255, 255, 255, 0.55);
  --yyt-text-muted: rgba(255, 255, 255, 0.35);
  --yyt-color-text-primary: var(--yyt-text);
  --yyt-color-text-secondary: var(--yyt-text-secondary);
  --yyt-color-text-muted: var(--yyt-text-muted);
  --yyt-color-accent: var(--yyt-accent);

  /* \u2014\u2014 Focus (double-ring) \u2014\u2014 */
  --yyt-focus-ring: 0 0 0 2px rgba(123, 183, 255, 1), 0 0 0 4px rgba(123, 183, 255, 0.15);

  /* \u2014\u2014 Radii (strict outer > inner) \u2014\u2014 */
  --yyt-radius-xs: 4px;
  --yyt-radius-sm: 6px;
  --yyt-radius: 8px;
  --yyt-radius-lg: 12px;
  --yyt-radius-xl: 16px;
  --yyt-control-radius: 6px;
  --yyt-control-radius-sm: 4px;

  /* \u2014\u2014 Shadows (floating elements only) \u2014\u2014 */
  --yyt-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  --yyt-shadow-soft: 0 4px 16px rgba(0, 0, 0, 0.3);
  --yyt-shadow-glow: 0 0 16px var(--yyt-accent-glow);

  /* \u2014\u2014 Controls (solid, no gradients) \u2014\u2014 */
  --yyt-control-bg: #0f1219;
  --yyt-control-bg-hover: #151a24;
  --yyt-control-bg-active: #1c2231;
  --yyt-control-bg-strong: #151a24;
  --yyt-control-bg-focus: #151a24;
  --yyt-control-border: rgba(255, 255, 255, 0.08);
  --yyt-control-border-hover: rgba(255, 255, 255, 0.14);
  --yyt-control-border-focus: rgba(123, 183, 255, 0.5);
  --yyt-control-shadow: none;
  --yyt-control-shadow-hover: none;
  --yyt-control-shadow-focus: none;
  --yyt-control-shadow-active: none;

  /* \u2014\u2014 Select/Dropdown \u2014\u2014 */
  --yyt-select-surface: #151a24;
  --yyt-select-option-bg: #1c2231;
  --yyt-select-option-hover-bg: #232b3e;
  --yyt-select-option-selected-bg: #2a3450;
  --yyt-select-option-border: rgba(123, 183, 255, 0.15);
  --yyt-select-option-selected-border: rgba(123, 183, 255, 0.3);
  --yyt-select-dropdown-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  --yyt-select-arrow-color: rgba(255, 255, 255, 0.4);

  /* \u2014\u2014 Startup (one decorative accent allowed) \u2014\u2014 */
  --yyt-startup-overlay: rgba(6, 8, 16, 0.8);
  --yyt-startup-panel-border: rgba(255, 255, 255, 0.08);
  --yyt-startup-panel-bg:
    radial-gradient(500px 200px at 0% 0%, rgba(123, 183, 255, 0.12), transparent 60%),
    #0f1219;
  --yyt-startup-panel-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
  --yyt-startup-chip-bg: rgba(255, 255, 255, 0.05);
  --yyt-startup-chip-border: rgba(255, 255, 255, 0.08);
  --yyt-startup-status-bg: rgba(255, 255, 255, 0.05);
  --yyt-startup-status-border: rgba(255, 255, 255, 0.08);
  --yyt-startup-status-text: rgba(255, 255, 255, 0.8);
  --yyt-startup-kicker-bg: rgba(123, 183, 255, 0.1);
  --yyt-startup-kicker-border: rgba(123, 183, 255, 0.2);

  /* \u2014\u2014 Motion \u2014\u2014 */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --yyt-ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --yyt-duration-fast: 150ms;
  --yyt-duration-normal: 250ms;

  /* \u2014\u2014 Typography scale \u2014\u2014 */
  --yyt-text-xs: 10px;
  --yyt-text-sm: 11px;
  --yyt-text-base: 13px;
  --yyt-text-md: 14px;
  --yyt-text-lg: 16px;
  --yyt-text-xl: 20px;
  --yyt-text-2xl: 24px;

  /* \u2014\u2014 Layout \u2014\u2014 */
  --yyt-shell-sidebar-width: 220px;
  --yyt-shell-topbar-gap: 12px;
  --yyt-shell-gap: 0px;
  --yyt-panel-gap: 0px;
  --yyt-backdrop: rgba(6, 8, 16, 0.75);
}

/* ============================================================
   \u57FA\u7840\u5E03\u5C40
   ============================================================ */

.yyt-app {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
  color: var(--yyt-text);
}

/* ============================================================
   \u4E3B\u9876\u680F\u6837\u5F0F
   ============================================================ */

.yyt-main-nav {
  display: flex;
  gap: 6px;
  padding: 6px;
  background: transparent;
  border-radius: 8px;
  margin-bottom: 16px;
  border: 1px solid var(--yyt-border-soft);
  flex-shrink: 0;
}

.yyt-main-nav-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 15px;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;
  color: var(--yyt-text-secondary);
  font-weight: 600;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  min-width: 0;
  border: 1px solid transparent;
}

.yyt-main-nav-item:hover {
  color: var(--yyt-text);
  background: rgba(255, 255, 255, 0.045);
  border-color: var(--yyt-border-soft);
}

.yyt-main-nav-item:focus-visible {
  outline: none;
  box-shadow: var(--yyt-focus-ring);
}

.yyt-main-nav-item.active {
  color: var(--yyt-on-accent);
  background: var(--yyt-accent);
  box-shadow: none;
}

.yyt-main-nav-icon {
  width: 38px;
  height: 38px;
  border-radius: var(--yyt-radius-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--yyt-accent-soft);
  border: none;
  flex-shrink: 0;
}

.yyt-main-nav-item.active .yyt-main-nav-icon {
  background: var(--yyt-accent-soft);
  border-color: transparent;
}

.yyt-main-nav-item i {
  font-size: 15px;
  transition: transform 0.22s ease;
}

.yyt-main-nav-item:hover i {
  transform: scale(1.08);
}

.yyt-main-nav-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  flex: 1;
}

.yyt-main-nav-name {
  font-size: var(--yyt-text-base);
  font-weight: 700;
  color: inherit;
}

.yyt-main-nav-desc {
  font-size: var(--yyt-text-sm);
  line-height: 1.5;
  color: inherit;
  opacity: 0.74;
}

/* ============================================================
   \u6B21\u7EA7\u9876\u680F\u6837\u5F0F
   ============================================================ */

.yyt-sub-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 8px;
  background: transparent;
  border-radius: 6px;
  margin-bottom: 10px;
  border: 1px solid var(--yyt-border-soft);
  flex-shrink: 0;
}

.yyt-sub-nav-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  flex: 1 1 260px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: transparent;
  box-shadow: none;
}

.yyt-sub-nav-group-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 26px;
  padding: 0 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.42px;
  text-transform: uppercase;
  color: var(--yyt-text-muted);
}

.yyt-sub-nav-group-title::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.03);
}

.yyt-sub-nav-group-ai .yyt-sub-nav-group-title::before {
  background: var(--yyt-accent);
  box-shadow: 0 0 0 3px var(--yyt-accent-soft);
}

.yyt-sub-nav-group-script .yyt-sub-nav-group-title::before {
  background: rgba(251, 191, 36, 0.92);
  box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.12);
}

.yyt-sub-nav-group-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.yyt-sub-nav-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
  color: var(--yyt-text-secondary);
  font-weight: 700;
  font-size: var(--yyt-text-sm);
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.015);
}

.yyt-sub-nav-item:hover {
  color: var(--yyt-text);
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--yyt-border-soft);
  transform: translateY(-1px);
}

.yyt-sub-nav-item.active {
  color: var(--yyt-accent);
  background: var(--yyt-accent-soft);
  border-color: var(--yyt-accent-soft);
  box-shadow: none;
}

.yyt-sub-nav-item i {
  font-size: 12px;
}

/* ============================================================
   \u5185\u5BB9\u533A\u57DF
   ============================================================ */

.yyt-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;
  overflow: auto;
  overscroll-behavior: contain;
  padding: 12px;
  border-radius: 0;
  background: transparent;
  border: none;
}

.yyt-page {
  display: none;
  animation: yytSlideUp 0.3s var(--ease-out);
}

/* \u2014\u2014 Phase E2: \u7EDF\u4E00\u52A8\u753B keyframes \u2014\u2014 */
@keyframes yytFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes yytSlideUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes yytScaleIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}

.yyt-page.active {
  display: block;
}

/* ============================================================
   \u9762\u677F\u6837\u5F0F
   ============================================================ */

.yyt-panel {
  display: flex;
  flex-direction: column;
  gap: var(--yyt-panel-gap);
}

.yyt-panel-section {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
}

.yyt-panel-section > .yyt-section-title + * {
  min-width: 0;
}

/* Flat Flow Layout Primitives */
.yyt-flow-section + .yyt-flow-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--yyt-border);
}

.yyt-flow-heading {
  font-size: 12px;
  font-weight: 700;
  color: var(--yyt-text);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.yyt-flow-heading-icon {
  width: 22px;
  height: 22px;
  border-radius: var(--yyt-radius-sm);
  background: var(--yyt-accent-soft);
  color: var(--yyt-accent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
}

.yyt-flow-heading-action {
  margin-left: auto;
}

.yyt-stat-row {
  display: grid;
  gap: 0;
  border: 1px solid var(--yyt-border-strong);
  border-radius: var(--yyt-radius);
  overflow: hidden;
}

.yyt-stat-cell {
  padding: 16px 18px;
  background: var(--yyt-surface-2);
  transition: background 0.12s ease;
}

.yyt-stat-cell:hover {
  background: var(--yyt-surface-3);
}

.yyt-stat-cell + .yyt-stat-cell {
  border-left: 1px solid var(--yyt-border);
}

.yyt-stat-label {
  font-size: 10px;
  color: var(--yyt-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 700;
}

.yyt-stat-value {
  font-size: 22px;
  font-weight: 700;
  color: var(--yyt-text);
  margin-top: 6px;
}

.yyt-list-table {
  border: 1px solid var(--yyt-border-strong);
  border-radius: var(--yyt-radius);
  overflow: hidden;
}

.yyt-list-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  background: var(--yyt-surface-2);
  transition: background 0.1s ease;
}

.yyt-list-row:hover {
  background: var(--yyt-surface-3);
}

.yyt-list-row + .yyt-list-row {
  border-top: 1px solid var(--yyt-border);
}

.yyt-list-row-icon {
  width: 32px;
  height: 32px;
  border-radius: var(--yyt-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}

.yyt-list-row-main {
  flex: 1;
  min-width: 0;
}

.yyt-list-row-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--yyt-text);
}

.yyt-list-row-desc {
  font-size: 11px;
  color: var(--yyt-text-muted);
  margin-top: 2px;
}

.yyt-list-row-actions {
  display: flex;
  gap: 6px;
}

.yyt-form-inline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--yyt-border);
}

.yyt-form-inline:last-child {
  border-bottom: none;
}

.yyt-form-inline-label {
  flex: 1;
}

.yyt-form-inline-control {
  flex-shrink: 0;
}

.yyt-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.yyt-status-dot-on {
  background: var(--yyt-success);
  box-shadow: 0 0 6px var(--yyt-success);
}

.yyt-status-dot-off {
  background: var(--yyt-text-muted);
}

.yyt-badge {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 999px;
  letter-spacing: 0.3px;
}

.yyt-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: var(--yyt-text-sm);
  color: var(--yyt-color-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.yyt-section-title i {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 10px;
  color: var(--yyt-accent);
  font-size: 14px;
  background: var(--yyt-accent-soft);
  border: 1px solid var(--yyt-accent-soft);
  
}

/* ============================================================
   \u6309\u94AE\u6837\u5F0F
   ============================================================ */

.yyt-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 40px;
  padding: 10px 16px;
  border: 1px solid var(--yyt-control-border);
  border-radius: var(--yyt-control-radius);
  background: var(--yyt-control-bg-strong);
  color: var(--yyt-text);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, background 0.18s ease, color 0.18s ease, filter 0.18s ease;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.2px;
  box-shadow: var(--yyt-control-shadow);
}

.yyt-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  display: none;
  pointer-events: none;
}

.yyt-btn::after {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  border: 1px solid rgba(255, 255, 255, 0.025);
  pointer-events: none;
}

.yyt-btn:hover {
  transform: translateY(-1px);
  border-color: var(--yyt-control-border-hover);
  background: var(--yyt-control-bg-hover);
  box-shadow: var(--yyt-control-shadow-hover);
}

.yyt-btn:active {
  transform: translateY(0) scale(0.98);
  background: var(--yyt-control-bg-active);
  box-shadow: var(--yyt-control-shadow-active);
  filter: saturate(0.98);
}

.yyt-btn:focus-visible {
  outline: none;
  box-shadow: var(--yyt-focus-ring), var(--yyt-control-shadow-focus);
}

.yyt-btn-primary {
  background: var(--yyt-accent);
  color: var(--yyt-on-accent);
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: none;
}

.yyt-btn-primary:hover {
  background: var(--yyt-accent-strong);
  box-shadow: none;
}

.yyt-btn-primary:active {
  background: var(--yyt-accent);
}

.yyt-btn-secondary {
  background: var(--yyt-surface-2);
  color: var(--yyt-text);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: none;
}

.yyt-btn-secondary:hover {
  background: var(--yyt-surface-3);
  border-color: rgba(255, 255, 255, 0.18);
}

.yyt-btn-danger {
  background: var(--yyt-danger-soft);
  color: #ffb4b4;
  border-color: rgba(248, 113, 113, 0.32);
  box-shadow: 0 12px 24px rgba(248, 113, 113, 0.12);
}

.yyt-btn-danger:hover {
  background: rgba(248, 113, 113, 0.2);
  border-color: rgba(248, 113, 113, 0.42);
  box-shadow: 0 16px 30px rgba(248, 113, 113, 0.16);
}

.yyt-btn-icon {
  padding: 0;
  width: 40px;
  min-width: 40px;
}

.yyt-btn-small {
  min-height: 34px;
  padding: 7px 12px;
  font-size: 12px;
  border-radius: var(--yyt-control-radius-sm);
}

.yyt-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
  filter: none !important;
}

/* ============================================================
   \u8868\u5355\u6837\u5F0F
   ============================================================ */

.yyt-form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.yyt-form-group label {
  font-size: var(--yyt-text-sm);
  font-weight: 600;
  color: var(--yyt-color-text-secondary);
  letter-spacing: 0.3px;
}

.yyt-form-hint {
  font-size: 11px;
  color: var(--yyt-text-muted);
  line-height: 1.6;
}

.yyt-form-hint code {
  font-size: 11px;
  color: var(--yyt-accent);
  background: var(--yyt-accent-soft);
  padding: 1px 5px;
  border-radius: 3px;
  font-weight: 600;
}

.yyt-settings-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--yyt-text-secondary);
  line-height: 1.6;
}

.yyt-settings-hint i {
  color: var(--yyt-accent);
}

.yyt-form-row {
  display: flex;
  gap: 12px;
}

.yyt-flex-1 {
  flex: 1;
}

.yyt-checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  min-width: 0;
}

.yyt-checkbox-label > span {
  color: var(--yyt-text);
  font-weight: 700;
  line-height: 1.5;
}

.yyt-checkbox-label > span:last-child {
  flex: 1;
  min-width: 0;
}

.yyt-checkbox-label input[type="checkbox"],
.yyt-checkbox-label input[type="radio"] {
  width: 18px;
  height: 18px;
  margin: 0;
  flex-shrink: 0;
  cursor: pointer;
  accent-color: var(--yyt-accent);
}

.yyt-checkbox-label input[type="checkbox"]:focus-visible,
.yyt-checkbox-label input[type="radio"]:focus-visible {
  outline: none;
  box-shadow: var(--yyt-focus-ring);
  border-radius: 6px;
}

.yyt-worldbook-item .yyt-checkbox-label,
.yyt-form-group > .yyt-checkbox-label {
  padding: 0;
  border-radius: 0;
  border: none;
  background: transparent;
}

.yyt-worldbook-item .yyt-checkbox-label:hover,
.yyt-form-group > .yyt-checkbox-label:hover {
  background: transparent;
}

/* \u8F93\u5165\u6846 */
.yyt-input,
.yyt-select,
.yyt-textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 42px;
  padding: 11px 15px;
  border: 1px solid var(--yyt-control-border);
  border-radius: var(--yyt-control-radius);
  background: var(--yyt-control-bg);
  color: var(--yyt-text);
  font-size: 13px;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, transform 0.18s ease;
  box-shadow: var(--yyt-control-shadow);
}

.yyt-select {
  --yyt-select-chevron: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a8b7ca' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  color: var(--yyt-text);
  background: var(--yyt-select-chevron) right 14px center / 12px 12px no-repeat, var(--yyt-control-bg);
  padding-right: 36px;
}

.yyt-input:hover,
.yyt-select:hover,
.yyt-textarea:not(.yyt-code-textarea):hover {
  border-color: var(--yyt-control-border-hover);
  background: var(--yyt-control-bg-hover);
  box-shadow: var(--yyt-control-shadow-hover);
}

.yyt-select:hover {
  color: var(--yyt-text);
  background: var(--yyt-select-chevron) right 14px center / 12px 12px no-repeat, var(--yyt-control-bg-hover);
}

.yyt-input:focus,
.yyt-select:focus,
.yyt-textarea:not(.yyt-code-textarea):focus,
.yyt-input:focus-visible,
.yyt-select:focus-visible,
.yyt-textarea:not(.yyt-code-textarea):focus-visible {
  outline: none;
  border-color: var(--yyt-control-border-focus);
  background: var(--yyt-control-bg-focus);
  box-shadow: var(--yyt-focus-ring), var(--yyt-control-shadow-focus);
}

.yyt-select:focus,
.yyt-select:focus-visible {
  color: var(--yyt-text);
  background: var(--yyt-select-chevron) right 14px center / 12px 12px no-repeat, var(--yyt-control-bg-focus);
}

.yyt-select:disabled {
  color: var(--yyt-text-muted);
  background: var(--yyt-select-chevron) right 14px center / 12px 12px no-repeat, var(--yyt-surface);
  cursor: not-allowed;
}

.yyt-select option,
.yyt-select optgroup {
  background: var(--yyt-surface) !important;
  color: var(--yyt-text) !important;
}

.yyt-select option:checked,
.yyt-select option[selected] {
  background: var(--yyt-surface-3);
  color: #f5fbff;
}

.yyt-select option:disabled {
  color: rgba(255, 255, 255, 0.42);
}

.yyt-select optgroup {
  font-weight: 700;
  color: rgba(255, 255, 255, 0.78);
}

.yyt-textarea.yyt-code-textarea {
  color: var(--yyt-text);
  caret-color: var(--yyt-accent-strong);
  background: #080a10;
}

.yyt-textarea.yyt-code-textarea:hover,
.yyt-textarea.yyt-code-textarea:focus,
.yyt-textarea.yyt-code-textarea:focus-visible {
  color: var(--yyt-text);
  caret-color: var(--yyt-accent-strong);
  border-color: var(--yyt-border-focus);
  background: #080a10;
}

.yyt-input::placeholder,
.yyt-textarea::placeholder {
  color: rgba(255, 255, 255, 0.42);
}

.yyt-textarea {
  resize: vertical;
  min-height: 112px;
  line-height: 1.65;
}

/* Toggle\u5F00\u5173 */
.yyt-toggle-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  padding: 16px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  box-shadow: none;
}

.yyt-toggle-row:hover {
  background: var(--yyt-surface);
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: none;
}

.yyt-toggle-label {
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: 6px;
}

.yyt-toggle-label > span:first-child {
  font-weight: 700;
  font-size: 14px;
  color: var(--yyt-text);
  line-height: 1.45;
}

.yyt-toggle-hint {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.56);
  line-height: 1.55;
}

.yyt-toggle {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 30px;
  flex-shrink: 0;
  align-self: center;
}

.yyt-toggle.yyt-small {
  width: 46px;
  height: 26px;
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
  background: var(--yyt-surface-3);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  transition: all 0.28s var(--ease-in-out);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.12), 0 6px 14px rgba(0, 0, 0, 0.12);
}

.yyt-toggle-slider::before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 3px;
  bottom: 3px;
  background: #ffffff;
  border-radius: 50%;
  transition: all 0.28s var(--ease-in-out);
  box-shadow: none;
}

.yyt-toggle.yyt-small .yyt-toggle-slider::before {
  width: 18px;
  height: 18px;
  left: 3px;
  bottom: 3px;
}

.yyt-toggle input:focus-visible + .yyt-toggle-slider {
  box-shadow: var(--yyt-focus-ring), inset 0 -1px 0 rgba(0, 0, 0, 0.12), 0 6px 14px rgba(0, 0, 0, 0.12);
}

.yyt-toggle input:checked + .yyt-toggle-slider {
  background: var(--yyt-accent);
  border-color: var(--yyt-accent);
  box-shadow: none;
}

.yyt-toggle input:checked + .yyt-toggle-slider::before {
  transform: translateX(22px);
}

.yyt-toggle.yyt-small input:checked + .yyt-toggle-slider::before {
  transform: translateX(20px);
}

/* ============================================================
   \u9884\u8BBE\u9009\u62E9\u5668\u6837\u5F0F
   ============================================================ */

.yyt-preset-selector {
  display: flex;
  gap: 12px;
  align-items: center;
}

.yyt-custom-select {
  position: relative;
  isolation: isolate;
  flex: 1;
  min-width: 0;
}

.yyt-select-fixed-width {
  flex: 0 0 auto;
  width: 176px;
  min-width: 176px;
}

.yyt-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 42px;
  padding: 11px 15px;
  border: 1px solid var(--yyt-control-border);
  border-radius: var(--yyt-control-radius);
  background: var(--yyt-control-bg);
  color: var(--yyt-text);
  font-size: 13px;
  cursor: pointer;
  transition: border-color 0.22s ease, box-shadow 0.22s ease, background 0.22s ease, transform 0.22s ease;
  box-shadow: var(--yyt-control-shadow);
}

.yyt-select-trigger:hover {
  border-color: var(--yyt-control-border-hover);
  background: var(--yyt-control-bg-hover);
  box-shadow: var(--yyt-control-shadow-hover);
}

.yyt-custom-select.yyt-open .yyt-select-trigger {
  border-color: var(--yyt-control-border-focus);
  background: var(--yyt-control-bg-focus);
  box-shadow: var(--yyt-focus-ring), var(--yyt-control-shadow-focus);
}

.yyt-select-value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.yyt-select-arrow {
  color: var(--yyt-select-arrow-color);
  transition: transform 0.2s ease, color 0.2s ease;
  margin-left: 8px;
}

.yyt-custom-select.yyt-open .yyt-select-arrow {
  transform: rotate(180deg);
  color: var(--yyt-accent-strong);
}

.yyt-select-portal-layer {
  position: fixed;
  inset: 0;
  z-index: 10040;
  pointer-events: none;
}

.yyt-select-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  max-height: 0;
  overflow: hidden;
  box-sizing: border-box;
  min-width: 100%;
  padding: 0;
  background: var(--yyt-select-surface) !important;
  background-image: none !important;
  border: 1px solid var(--yyt-control-border-hover);
  border-radius: 6px;
  box-shadow: var(--yyt-select-dropdown-shadow);
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  z-index: 3200;
  opacity: 0;
  pointer-events: none;
  transition: max-height 0.25s var(--ease-in-out), opacity 0.2s ease, border-color 0.2s ease, padding 0.2s ease;
}

.yyt-custom-select.yyt-open .yyt-select-dropdown,
.yyt-select-dropdown.yyt-floating-open {
  max-height: 320px;
  overflow-y: auto;
  overflow-x: hidden;
  opacity: 1;
  padding: 8px;
  pointer-events: auto;
}

.yyt-select-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  padding: 11px 14px;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
  border: 1px solid transparent;
  border-radius: 6px;
  margin: 0;
  background: var(--yyt-select-option-bg) !important;
  background-image: none !important;
  color: var(--yyt-text);
}

.yyt-select-option:hover {
  background: var(--yyt-select-option-hover-bg) !important;
  background-image: none !important;
  border-color: var(--yyt-select-option-border);
  transform: translateY(-1px);
}

.yyt-select-option.yyt-selected {
  background: var(--yyt-select-option-selected-bg) !important;
  background-image: none !important;
  border-color: var(--yyt-select-option-selected-border);
  box-shadow: none;
}

.yyt-option-star,
.yyt-option-delete {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 26px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--yyt-text-muted);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.yyt-option-star:hover {
  color: var(--yyt-accent);
  background: var(--yyt-accent-soft);
  border-color: var(--yyt-accent-soft);
}

.yyt-option-delete:hover {
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.12);
  border-color: rgba(239, 68, 68, 0.18);
}

.yyt-option-star.yyt-starred {
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.12);
  border-color: rgba(251, 191, 36, 0.2);
}

.yyt-option-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--yyt-text);
  font-size: 13px;
}

/* \u9884\u8BBE\u5217\u8868 */
.yyt-preset-list-compact {
  display: flex;
  flex-direction: column;
  max-height: 150px;
  overflow-y: auto;
}

.yyt-preset-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 11px 14px;
  background: transparent;
  border: none;
  border-top: 1px solid var(--yyt-border);
  border-radius: 0;
  transition: background 0.2s ease;
}

.yyt-preset-item:first-child {
  border-top: none;
}

.yyt-preset-item:hover {
  background: var(--yyt-surface-3);
}

.yyt-preset-item.active {
  background: var(--yyt-accent-soft);
}

.yyt-preset-item.yyt-loaded {
  background: rgba(74, 222, 128, 0.12);
}

.yyt-preset-info {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.yyt-preset-name {
  font-weight: 600;
  font-size: 13px;
  color: var(--yyt-text);
}

.yyt-preset-meta {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.yyt-preset-actions {
  display: flex;
  gap: 6px;
  opacity: 0.58;
  transition: opacity 0.2s ease;
}

.yyt-preset-item:hover .yyt-preset-actions {
  opacity: 1;
}

/* \u5FBD\u7AE0 */
.yyt-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: var(--yyt-text-sm);
  font-weight: 700;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: var(--yyt-surface-2);
  color: var(--yyt-color-text-secondary);
}

.yyt-badge-small {
  padding: 3px 8px;
  font-size: 10px;
  background: var(--yyt-accent-soft);
  color: var(--yyt-accent-strong);
  border: 1px solid var(--yyt-accent-soft);
}

/* ============================================================
   \u5BF9\u8BDD\u6846\u6837\u5F0F
   ============================================================ */

.yyt-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.62);
  backdrop-filter: blur(12px) saturate(1.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
  overflow-y: auto;
  z-index: 10001;
  animation: yytFadeIn 0.2s var(--ease-out);
}

.yyt-dialog {
  background: var(--yyt-bg-base);
  border: 1px solid var(--yyt-border-strong);
  border-radius: var(--yyt-radius);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
  width: 380px;
  max-width: 90vw;
  max-height: calc(100vh - 32px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: yytScaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
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
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.yyt-dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 20px;
  border-top: 1px solid var(--yyt-border);
}

.yyt-dialog-wide {
  width: min(720px, calc(100vw - 32px));
}

.yyt-dialog-body::-webkit-scrollbar {
  width: 8px;
}

.yyt-dialog-body::-webkit-scrollbar-track {
  background: transparent;
}

.yyt-dialog-body::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.14);
  border-radius: 4px;
}

.yyt-dialog-body::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.24);
}

/* ============================================================
   \u9762\u677F\u5E95\u90E8
   ============================================================ */

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

/* ============================================================
   \u7A7A\u72B6\u6001
   ============================================================ */

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

/* ============================================================
   \u7981\u7528\u72B6\u6001
   ============================================================ */

.yyt-disabled {
  opacity: 0.4;
  pointer-events: none;
  filter: grayscale(0.5);
}

/* ============================================================
   \u6EDA\u52A8\u6761\u6837\u5F0F
   ============================================================ */

.yyt-panel::-webkit-scrollbar,
.yyt-content::-webkit-scrollbar,
.yyt-select-dropdown::-webkit-scrollbar {
  width: 6px;
}

.yyt-panel::-webkit-scrollbar-track,
.yyt-content::-webkit-scrollbar-track,
.yyt-select-dropdown::-webkit-scrollbar-track {
  background: transparent;
}

.yyt-panel::-webkit-scrollbar-thumb,
.yyt-content::-webkit-scrollbar-thumb,
.yyt-select-dropdown::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 3px;
}

.yyt-panel::-webkit-scrollbar-thumb:hover,
.yyt-content::-webkit-scrollbar-thumb:hover,
.yyt-select-dropdown::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* ============================================================
   \u52A8\u753B
   ============================================================ */

.yyt-panel-section {
  animation: yytSlideUp 0.25s var(--ease-out) backwards;
}

.yyt-panel-section:nth-child(1) { animation-delay: 0s; }
.yyt-panel-section:nth-child(2) { animation-delay: 0.05s; }
.yyt-panel-section:nth-child(3) { animation-delay: 0.1s; }

/* ============================================================
   \u4E3B\u5F39\u7A97\u6837\u5F0F
   ============================================================ */

.yyt-popup-overlay {
  position: fixed;
  inset: 0;
  background: var(--yyt-backdrop);
  backdrop-filter: blur(16px) saturate(1.15);
  -webkit-backdrop-filter: blur(16px) saturate(1.15);
  z-index: 9999;
  animation: yytFadeIn 0.2s var(--ease-out);
}

.yyt-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: min(1500px, calc(100vw - 12px));
  max-width: calc(100vw - 12px);
  height: min(1120px, calc(100vh - 12px));
  max-height: calc(100vh - 12px);
  background: var(--yyt-bg-base);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.05),
    0 28px 84px rgba(0, 0, 0, 0.58),
    0 0 80px var(--yyt-accent-soft);
  animation: yytScaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
  color: var(--yyt-text);
  z-index: 10000;
}

.yyt-popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 20px;
  background: var(--yyt-surface);
  border-bottom: 1px solid var(--yyt-border);
  border-radius: 12px 12px 0 0;
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
  font-size: 16px;
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
  padding: 5px 11px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: var(--yyt-accent);
  background: var(--yyt-accent-soft);
  border: 1px solid var(--yyt-accent-soft);
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
  border: 1px solid var(--yyt-border);
}

.yyt-popup-drag-hint i {
  color: var(--yyt-accent);
}

.yyt-popup-close {
  width: 34px;
  height: 34px;
  border: 1px solid var(--yyt-border);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--yyt-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  font-size: 14px;
}

.yyt-popup-close:hover {
  background: rgba(248, 113, 113, 0.14);
  border-color: rgba(248, 113, 113, 0.2);
  color: #ff6b6b;
}

.yyt-popup-body {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 12px 16px;
  overflow: hidden;
}

.yyt-popup-shell {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.yyt-content-frame {
  flex: 1;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  padding: 0;
  border-radius: 0;
  background: transparent;
}

.yyt-content-frame .yyt-content {
  height: 100%;
}

.yyt-content-inner {
  min-height: 100%;
  height: 100%;
}

.yyt-startup-screen {
  position: absolute;
  inset: 16px 18px;
  z-index: 3;
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 18px;
  border-radius: 8px;
  background: var(--yyt-startup-overlay);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 24px 56px rgba(0, 0, 0, 0.38);
}

.yyt-startup-screen-inner {
  width: min(760px, 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
  padding: 30px 32px;
  border-radius: 12px;
  border: 1px solid var(--yyt-startup-panel-border);
  background: var(--yyt-startup-panel-bg);
  box-shadow: var(--yyt-startup-panel-shadow);
}

.yyt-startup-screen-kicker {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.52px;
  text-transform: uppercase;
  color: var(--yyt-accent-strong);
  background: var(--yyt-startup-kicker-bg);
  border: 1px solid var(--yyt-startup-kicker-border);
}

.yyt-startup-screen-title {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -0.5px;
  color: var(--yyt-text);
}

.yyt-startup-screen-desc {
  max-width: 62ch;
  font-size: 14px;
  line-height: 1.8;
  color: var(--yyt-text-secondary);
}

.yyt-startup-screen-modules {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.yyt-startup-module-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 13px;
  border-radius: 6px;
  background: var(--yyt-startup-chip-bg);
  border: 1px solid var(--yyt-startup-chip-border);
  color: var(--yyt-text);
  font-size: 12px;
  font-weight: 700;
}

.yyt-startup-module-chip i {
  color: var(--yyt-accent-strong);
}

.yyt-startup-screen-status {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  max-width: 100%;
  padding: 11px 14px;
  border-radius: 8px;
  background: var(--yyt-startup-status-bg);
  border: 1px solid var(--yyt-startup-status-border);
  color: var(--yyt-startup-status-text);
  font-size: 12px;
  line-height: 1.6;
}

.yyt-startup-screen-status i {
  color: var(--yyt-accent-strong);
}

.yyt-startup-enter {
  align-self: flex-start;
  min-width: 148px;
}

.yyt-popup-shell[data-yyt-startup-visible="true"] .yyt-shell-workspace {
  filter: blur(1px);
  pointer-events: none;
  user-select: none;
}

.yyt-shell-topbar {
  position: relative;
  isolation: isolate;
  flex-shrink: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 300px);
  gap: 12px;
  padding: 16px 18px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: var(--yyt-surface);
}

.yyt-shell-topbar::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  display: none;
  pointer-events: none;
  opacity: 0.82;
}

.yyt-shell-topbar-main {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.yyt-shell-kicker {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 7px 12px;
  border-radius: 999px;
  background: var(--yyt-accent-soft);
  border: 1px solid var(--yyt-accent-soft);
  color: var(--yyt-accent-strong);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: none;
  flex-shrink: 0;
}

.yyt-shell-topbar-summary {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.yyt-shell-topbar-title {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.15;
  color: var(--yyt-text);
}

.yyt-shell-topbar-meta {
  font-size: 12px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.72);
}

.yyt-shell-current-desc {
  font-size: 12px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.76);
}

.yyt-shell-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(84px, 1fr));
  gap: 10px;
  align-self: stretch;
}

.yyt-shell-stat {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  min-width: 84px;
  padding: 16px 14px 14px;
  border-radius: 0;
  background: transparent;
  border: none;
  border-left: 1px solid var(--yyt-border);
}

.yyt-shell-stat:first-child {
  border-left: none;
}

.yyt-shell-stat-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.54);
  letter-spacing: 0.48px;
  text-transform: uppercase;
}

.yyt-shell-stat-value {
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
  color: var(--yyt-text);
}

.yyt-shell-workspace {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(230px, var(--yyt-shell-sidebar-width)) minmax(0, 1fr);
  gap: 16px;
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
  gap: 14px;
  overflow: hidden;
  padding: 0;
  border-radius: 0;
  border: none;
  background: transparent;
  box-shadow: none;
}

.yyt-shell-sidebar-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.yyt-shell-sidebar-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--yyt-text);
}

.yyt-shell-sidebar-hint {
  font-size: 10px;
  color: var(--yyt-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.yyt-shell-sidebar .yyt-main-nav {
  flex-direction: column;
  gap: 8px;
  padding: 0;
  margin-bottom: 0;
  background: transparent;
  border: none;
  min-height: 0;
  overflow-y: auto;
}

.yyt-shell-sidebar .yyt-main-nav-item {
  position: relative;
  width: 100%;
  min-width: 0;
  padding: 16px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: none;
  background: transparent;
}

.yyt-shell-sidebar .yyt-main-nav-item::before {
  content: '';
  position: absolute;
  inset: 10px auto 10px 0;
  width: 4px;
  border-radius: 999px;
  background: transparent;
  transition: background 0.18s ease, box-shadow 0.18s ease;
}

.yyt-shell-sidebar .yyt-main-nav-item:hover {
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: none;
}

.yyt-shell-sidebar .yyt-main-nav-item.active {
  color: var(--yyt-text);
  border-color: var(--yyt-accent-soft);
  background: var(--yyt-accent-soft);
}

.yyt-shell-sidebar .yyt-main-nav-item.active::before {
  background: var(--yyt-accent);
}

.yyt-shell-sidebar .yyt-main-nav-icon {
  width: 42px;
  height: 42px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.yyt-shell-sidebar .yyt-main-nav-item.active .yyt-main-nav-icon {
  background: var(--yyt-accent-soft);
  border-color: var(--yyt-accent-soft);
}

.yyt-shell-sidebar-note {
  padding: 10px 14px;
  border-radius: 0;
  border: none;
  background: transparent;
  color: var(--yyt-text-muted);
  font-size: 11px;
  line-height: 1.65;
}

.yyt-shell-main {
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.yyt-shell-main-header {
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: transparent;
  box-shadow: none;
}

.yyt-shell-main-header::after {
  content: '';
  position: absolute;
  inset: 0;
  display: none;
  pointer-events: none;
}

.yyt-shell-main-actions {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  margin-left: auto;
}

.yyt-shell-main-heading-block {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 9px;
  min-width: 0;
}

.yyt-shell-main-label-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.yyt-shell-main-label {
  font-size: 11px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.58);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.yyt-shell-breadcrumb {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  color: var(--yyt-text);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  max-width: 100%;
}

.yyt-shell-main-title {
  font-size: 26px;
  font-weight: 700;
  line-height: 1.06;
  letter-spacing: -0.3px;
  color: var(--yyt-text);
}

.yyt-shell-main-description {
  font-size: 13px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  max-width: 68ch;
}

.yyt-shell-main-meta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--yyt-border);
  color: var(--yyt-text);
  font-size: 12px;
  line-height: 1.5;
  box-shadow: none;
}

.yyt-shell-main-save-btn {
  white-space: nowrap;
  flex-shrink: 0;
}

.yyt-shell-main-meta i {
  color: var(--yyt-accent-strong);
}

.yyt-popup-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 16px 22px;
  background: var(--yyt-surface);
  border-top: 1px solid var(--yyt-border);
  border-radius: 0 0 12px 12px;
  flex-shrink: 0;
}

.yyt-popup-footer-left,
.yyt-popup-footer-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.yyt-popup-footer-left {
  min-width: 0;
}

.yyt-popup-status-cluster {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex-wrap: wrap;
}

.yyt-popup-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  border-radius: 999px;
  font-size: 12px;
  color: var(--yyt-text);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.yyt-popup-status i {
  color: var(--yyt-accent-strong);
}

.yyt-popup-footer-note {
  font-size: 12px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.72);
}

.yyt-shell-sidebar .yyt-main-nav,
.yyt-sub-nav,
.yyt-content,
.yyt-tab-content,
.yyt-sub-content {
  overscroll-behavior: contain;
}

.yyt-scrollable-surface {
  cursor: grab;
}

.yyt-scrollable-surface.yyt-scroll-dragging {
  cursor: grabbing;
  user-select: none;
}

/* \u6807\u7B7E\u5185\u5BB9 */
.yyt-tab-content {
  display: none;
  flex: 1;
  min-height: 0;
  min-width: 0;
  overflow-y: auto;
  height: 100%;
}

.yyt-tab-content.active {
  display: flex;
  flex-direction: column;
}

/* \u5B50\u5185\u5BB9\u533A\u57DF */
.yyt-sub-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  min-width: 0;
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

/* \u54CD\u5E94\u5F0F\u8C03\u6574 */
@media screen and (max-width: 980px) {
  .yyt-shell-topbar {
    grid-template-columns: 1fr;
  }

  .yyt-shell-topbar-main {
    align-items: flex-start;
  }

  .yyt-shell-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .yyt-popup-header {
    padding: 12px 16px;
  }

  .yyt-popup-body {
    padding: 12px 14px;
  }

  .yyt-startup-screen {
    inset: 12px 14px;
    padding: 14px;
  }

  .yyt-startup-screen-inner {
    padding: 24px 22px;
  }

  .yyt-popup-header-actions {
    gap: 8px;
  }

  .yyt-popup-drag-hint {
    padding: 6px 10px;
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

  .yyt-shell-topbar-title,
  .yyt-shell-main-description {
    font-size: 11px;
    line-height: 1.4;
  }

  .yyt-shell-stat {
    padding: 8px 10px;
  }

  .yyt-shell-stat-value {
    font-size: 16px;
  }

  .yyt-startup-screen {
    inset: 10px 12px;
    padding: 12px;
  }

  .yyt-startup-screen-inner {
    gap: 14px;
    padding: 22px 20px;
  }

  .yyt-startup-screen-desc {
    font-size: 12px;
    line-height: 1.6;
  }
}

@media screen and (max-width: 860px) {
  .yyt-shell-workspace {
    grid-template-columns: 1fr;
  }

  .yyt-shell-sidebar .yyt-main-nav {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 4px;
  }

  .yyt-shell-sidebar .yyt-main-nav-item {
    min-width: 220px;
  }

  .yyt-startup-screen {
    inset: 12px;
    padding: 12px;
  }

  .yyt-startup-screen-inner {
    padding: 22px 18px;
  }
}

@media screen and (max-width: 768px) {
  .yyt-dialog-overlay {
    align-items: flex-start;
    padding: 10px;
  }

  .yyt-dialog {
    width: 100%;
    max-width: 100%;
    max-height: calc(100vh - 20px);
  }

  .yyt-dialog-body {
    padding: 16px;
  }

  .yyt-dialog-footer,
  .yyt-dialog-header {
    padding-left: 16px;
    padding-right: 16px;
  }

  .yyt-popup {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
    border: none;
  }

  .yyt-popup-header {
    border-radius: 0;
    padding: 10px 14px;
    align-items: flex-start;
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
    border-radius: 8px;
  }

  .yyt-shell-topbar-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .yyt-shell-topbar-title {
    font-size: 16px;
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

  .yyt-shell-sidebar .yyt-main-nav {
    flex-direction: column;
    overflow: visible;
  }

  .yyt-shell-sidebar .yyt-main-nav-item {
    min-width: 0;
  }

  .yyt-main-nav-item {
    padding: 12px 14px;
  }

  .yyt-main-nav-desc {
    font-size: 10px;
  }

  .yyt-startup-screen {
    inset: 10px 14px;
    padding: 10px;
    border-radius: 6px;
  }

  .yyt-startup-screen-inner {
    padding: 20px 16px;
    border-radius: 8px;
  }

  .yyt-startup-screen-status {
    width: 100%;
  }

  .yyt-startup-enter {
    align-self: stretch;
  }

  .yyt-popup-footer {
    border-radius: 0;
    padding: 10px 14px;
    flex-direction: column;
    align-items: stretch;
  }

  .yyt-popup-footer-left,
  .yyt-popup-footer-right {
    width: 100%;
    justify-content: center;
  }

  .yyt-popup-footer-note {
    text-align: center;
  }
}

/* ============================================================
   Shell polish: tab transitions, sidebar collapse, micro-interactions
   ============================================================ */

/* ---- Tab content enter animation ---- */
.yyt-tab-content.active {
  animation: yytSlideUp 0.22s var(--ease-out);
}

/* ---- Sidebar collapse system ---- */
.yyt-shell-sidebar {
  transition: width 0.28s var(--ease-in-out);
  width: var(--yyt-shell-sidebar-width);
}

.yyt-shell-sidebar.yyt-collapsed {
  width: 56px;
}

.yyt-shell-workspace {
  transition: grid-template-columns 0.28s var(--ease-in-out);
}

.yyt-shell-workspace.yyt-sidebar-collapsed {
  grid-template-columns: 56px minmax(0, 1fr);
}

/* Collapsed sidebar: hide all text, keep icons only */
.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-name,
.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-desc,
.yyt-shell-sidebar.yyt-collapsed .yyt-shell-sidebar-note,
.yyt-shell-sidebar.yyt-collapsed .yyt-shell-sidebar-title,
.yyt-shell-sidebar.yyt-collapsed .yyt-shell-sidebar-hint,
.yyt-shell-sidebar.yyt-collapsed .yyt-shell-sidebar-stats {
  display: none;
}

.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-item {
  padding: 14px 10px;
  justify-content: center;
}

.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-icon {
  width: 36px;
  height: 36px;
}

.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-copy {
  display: none;
}

.yyt-shell-sidebar.yyt-collapsed .yyt-shell-sidebar-card {
  padding: 12px 8px;
}

.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-item::before {
  display: none;
}

/* ---- Sidebar collapse toggle button ---- */
.yyt-sidebar-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--yyt-text-muted);
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
  font-size: 12px;
  flex-shrink: 0;
}

.yyt-sidebar-toggle:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--yyt-text);
  border-color: rgba(255, 255, 255, 0.18);
}

.yyt-sidebar-toggle:focus-visible {
  outline: none;
  box-shadow: var(--yyt-focus-ring);
}

/* ---- Compact sidebar stats ---- */
.yyt-shell-sidebar-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  padding-top: 4px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.yyt-shell-sidebar-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 4px;
  border-radius: 0;
  background: transparent;
  border: none;
}

.yyt-shell-sidebar-stat-value {
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  color: var(--yyt-text);
}

.yyt-shell-sidebar-stat-label {
  font-size: 9px;
  font-weight: 700;
  color: var(--yyt-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

/* ---- Shell main heading block ---- */
.yyt-shell-main-heading-block {
  gap: 6px;
}

.yyt-shell-breadcrumb {
  /* breadcrumb removed from main header \u2014 now only sidebar active state shows location */
}

/* ---- Footer compact ---- */
.yyt-popup-footer {
  padding: 8px 20px;
}

.yyt-popup-footer-left {
  gap: 8px;
}

/* ---- Sub-content enter animation ---- */
.yyt-sub-content {
  animation: yytSlideUp 0.2s var(--ease-out);
}

/* ---- Nav item micro-interactions ---- */
.yyt-shell-sidebar .yyt-main-nav-item {
  transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease, padding 0.28s var(--ease-in-out);
}

.yyt-shell-sidebar .yyt-main-nav-item::before {
  transition: background 0.18s ease, box-shadow 0.18s ease;
}

.yyt-shell-sidebar .yyt-main-nav-item:hover {
  transform: translateX(2px);
}

.yyt-shell-sidebar .yyt-main-nav-item:focus-visible {
  outline: none;
  box-shadow: var(--yyt-focus-ring);
}

/* ---- Shell workspace gap ---- */
.yyt-shell-workspace {
  gap: 12px;
}

/* ---- Reduced motion ---- */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ---- Responsive: collapsed sidebar on narrow screens ---- */
@media screen and (max-width: 860px) {
  .yyt-shell-sidebar.yyt-collapsed {
    width: 100%;
  }

  .yyt-shell-workspace.yyt-sidebar-collapsed {
    grid-template-columns: 1fr;
  }

  .yyt-sidebar-toggle {
    display: none;
  }
}

/* ============================================================
   Form Controls (input / select / textarea)
   ============================================================ */

.yyt-input,
.yyt-select,
.yyt-textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 42px;
  padding: 11px 15px;
  border: 1px solid var(--yyt-control-border) !important;
  border-radius: var(--yyt-control-radius) !important;
  background: var(--yyt-control-bg) !important;
  color: var(--yyt-text) !important;
  font-size: 13px;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
  box-shadow: var(--yyt-control-shadow);
}

.yyt-select {
  --yyt-select-chevron: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a8b7ca' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  color: var(--yyt-text);
  background: var(--yyt-select-chevron) right 14px center / 12px 12px no-repeat, var(--yyt-control-bg);
  padding-right: 36px;
}

.yyt-input:hover,
.yyt-select:hover,
.yyt-textarea:not(.yyt-code-textarea):hover {
  border-color: var(--yyt-control-border-hover);
  background: var(--yyt-control-bg-hover);
  box-shadow: var(--yyt-control-shadow-hover);
}

.yyt-select:hover {
  color: var(--yyt-text);
  background: var(--yyt-select-chevron) right 14px center / 12px 12px no-repeat, var(--yyt-control-bg-hover);
}

.yyt-input:focus,
.yyt-select:focus,
.yyt-textarea:not(.yyt-code-textarea):focus,
.yyt-input:focus-visible,
.yyt-select:focus-visible,
.yyt-textarea:not(.yyt-code-textarea):focus-visible {
  outline: none;
  border-color: var(--yyt-control-border-focus);
  background: var(--yyt-control-bg-focus);
  box-shadow: var(--yyt-focus-ring), var(--yyt-control-shadow-focus);
}

.yyt-select:focus,
.yyt-select:focus-visible {
  color: var(--yyt-text);
  background: var(--yyt-select-chevron) right 14px center / 12px 12px no-repeat, var(--yyt-control-bg-focus);
}

.yyt-select:disabled {
  color: var(--yyt-text-muted);
  background: var(--yyt-select-chevron) right 14px center / 12px 12px no-repeat, var(--yyt-surface);
  cursor: not-allowed;
}

.yyt-select option,
.yyt-select optgroup {
  background: var(--yyt-surface) !important;
  color: var(--yyt-text) !important;
}

.yyt-select option:checked,
.yyt-select option[selected] {
  background: var(--yyt-surface-3);
  color: #f5fbff;
}

.yyt-select option:disabled {
  color: rgba(255, 255, 255, 0.42);
}

.yyt-textarea.yyt-code-textarea {
  color: var(--yyt-text);
  caret-color: var(--yyt-accent-strong);
  background: #080a10;
}

.yyt-textarea.yyt-code-textarea:hover,
.yyt-textarea.yyt-code-textarea:focus,
.yyt-textarea.yyt-code-textarea:focus-visible {
  color: var(--yyt-text);
  caret-color: var(--yyt-accent-strong);
  border-color: var(--yyt-border-focus);
  background: #080a10;
}

.yyt-input::placeholder,
.yyt-textarea::placeholder {
  color: rgba(255, 255, 255, 0.42);
}

.yyt-textarea {
  resize: vertical;
  min-height: 112px;
  line-height: 1.65;
}

/* ============================================================
   Custom Select Portal
   ============================================================ */

.yyt-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 42px;
  padding: 11px 15px;
  border: 1px solid var(--yyt-control-border);
  border-radius: var(--yyt-control-radius);
  background: var(--yyt-control-bg);
  color: var(--yyt-text);
  font-size: 13px;
  cursor: pointer;
  transition: border-color 0.18s ease, background 0.18s ease;
}

.yyt-select-trigger:hover {
  border-color: var(--yyt-control-border-hover);
  background: var(--yyt-control-bg-hover);
}

.yyt-select-dropdown {
  background: var(--yyt-select-surface) !important;
  background-image: none !important;
  backdrop-filter: none !important;
  border: 1px solid var(--yyt-control-border-hover);
  border-radius: 6px;
  box-shadow: var(--yyt-select-dropdown-shadow);
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 280px;
  overflow-y: auto;
}

.yyt-select-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  color: var(--yyt-text);
  background: var(--yyt-select-option-bg) !important;
  border: 1px solid transparent;
  transition: background 0.12s ease, border-color 0.12s ease;
}

.yyt-select-option:hover {
  background: var(--yyt-select-option-hover-bg) !important;
  border-color: var(--yyt-select-option-border);
}

.yyt-select-option.yyt-selected {
  background: var(--yyt-select-option-selected-bg) !important;
  border-color: var(--yyt-select-option-selected-border);
  color: var(--yyt-accent-strong);
  font-weight: 600;
}
    `}async function h(){let M=`${o}-styles`,_=s.document||document;if(_.getElementById(M))return;let A="",F=[];try{F.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{F.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}F.push("./styles/main.css");for(let R of[...new Set(F.filter(Boolean))])try{let S=await fetch(R);if(S.ok){A=await S.text();break}}catch{}A||(y("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),A=g());let H=_.createElement("style");H.id=M,H.textContent=A,(_.head||_.documentElement).appendChild(H),y("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function x(){let M=s.document||document;if(n.uiModule?.getAllStyles){let _=`${o}-ui-styles`;if(!M.getElementById(_)){let A=M.createElement("style");A.id=_,A.textContent=n.uiModule.getAllStyles(),(M.head||M.documentElement).appendChild(A)}}}async function v(){try{let{applyUiPreferences:M}=await Promise.resolve().then(()=>(lc(),ic));if(n.settingsServiceModule?.settingsService){let _=n.settingsServiceModule.settingsService.getUiSettings();if(_&&_.theme){let A=s.document||document;M(_,A),y(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${_.theme}`)}}}catch(M){y("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",M)}}function T(){let M=s.jQuery||window.jQuery;if(!M){p("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(T,1e3);return}let _=s.document||document,A=M("#extensionsMenu",_);if(!A.length){y("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(T,2e3);return}if(M(`#${l}`,A).length>0){y("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let H=M(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),R=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,S=M(R);S.on("click",function(V){V.stopPropagation(),y("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let fe=M("#extensionsMenuButton",_);fe.length&&A.is(":visible")&&fe.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),H.append(S),A.append(H),y("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function L(){y(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await h();let M=await f();if(y(M?"\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F":"\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u53EF\u7528\u529F\u80FD"),!d&&n.uiModule?.initUI)try{await n.uiModule.initUI({services:n,autoInjectStyles:!1,targetDocument:s.document||document}),d=!0,y("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(A){p("UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:",A)}if(n.uiModule&&(x(),await v()),n.presetBootstrapModule?.ensurePresetSystem)try{let A=n.presetBootstrapModule.ensurePresetSystem();A?.aborted?y(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5931\u8D25\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559: ${A.error}`):A?.skipped?y(`\u9884\u8BBE\u7CFB\u7EDF\u5DF2\u5C31\u7EEA\uFF08${A.reason}\uFF09`):y(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5B8C\u6210\uFF08${A.migratedCount}/${A.total} \u5DE5\u5177\uFF09`)}catch(A){p("\u9884\u8BBE\u7CFB\u7EDF\u521D\u59CB\u5316\u5F02\u5E38:",A)}if(n.toolAutomationServiceModule?.toolAutomationService){let A=n.toolAutomationServiceModule.toolAutomationService.init();y(A?"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316":"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u521D\u59CB\u5316\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u5BBF\u4E3B\u4E8B\u4EF6\u6E90\u91CD\u8BD5")}let _=s.document||document;_.readyState==="loading"?_.addEventListener("DOMContentLoaded",()=>{setTimeout(T,1e3)}):setTimeout(T,1e3),y("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:f,injectStyles:h,addMenuItem:T,init:L,log:y,logError:p}}Ye();Ge();Ge();W();var An=I.createScope("PromptEditor"),oS="youyou_toolkit_prompt_editor",aS={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},iS={system:"fa-server",ai:"fa-robot",user:"fa-user"},Co=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],oi=class{constructor(e={}){this.containerId=e.containerId||oS,this.segments=e.segments||[...Co],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){An.error("jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...Co],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
          ${this.segments.map(r=>this.renderSegment(r)).join("")}
        </div>
      </div>
    `;this.$container.html(e)}renderSegment(e){let r=aS[e.type]||e.type,s=iS[e.type]||"fa-file",n=e.mainSlot==="A"||e.isMain,o=e.mainSlot==="B"||e.isMain2,a=n?"var(--yyt-accent, #7bb7ff)":o?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${n?"yyt-main-a":""} ${o?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
           style="${a?`border-left: 3px solid ${a};`:""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${s}"></i>
            <span class="yyt-prompt-segment-title">${r}</span>
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
    `}bindEvents(){this.$container&&(ct(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"),this.$container.on("click.yytPromptEditor",".yyt-prompt-toggle",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.on("click.yytPromptEditor",".yyt-prompt-delete",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(r)}),this.$container.on("change.yytPromptEditor",".yyt-prompt-role",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),s=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{role:s})}),this.$container.on("change.yytPromptEditor",".yyt-prompt-main-slot",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),s=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{mainSlot:s})}),this.$container.on("input.yytPromptEditor",".yyt-prompt-textarea",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-add-segment`,()=>{this.addSegment()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-import-prompt`,()=>{this.importPrompt()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-export-prompt`,()=>{this.exportPrompt()}),Nt(this.$container,{namespace:"yytPromptEditorSelect",selectors:[".yyt-prompt-role",".yyt-prompt-main-slot"]}))}addSegment(e=null){let r=`segment_${Date.now()}`,s=e||{id:r,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};s.id||(s.id=r),this.segments.push(s),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let r=this.segments.findIndex(n=>n.id===e);if(r===-1)return;if(this.segments[r].deletable===!1){An.warn("\u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(r,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,r){let s=this.segments.find(n=>n.id===e);s&&(Object.assign(s,r),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=r=>{let s=r.target.files[0];if(!s)return;let n=new FileReader;n.onload=o=>{try{let a=JSON.parse(o.target.result);Array.isArray(a)?(this.setSegments(a),An.log("\u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):An.error("\u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){An.error("\u5BFC\u5165\u5931\u8D25:",a)}},n.readAsText(s)},e.click()}exportPrompt(){let e=this.getSegments(),r=JSON.stringify(e,null,2),s=new Blob([r],{type:"application/json"}),n=URL.createObjectURL(s),o=document.createElement("a");o.href=n,o.download=`prompt_group_${Date.now()}.json`,o.click(),URL.revokeObjectURL(n),An.log("\u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}destroy(){this.$container&&(ct(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"))}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};function rm(){return`
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
  `}function sm(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function nm(t){return Array.isArray(t)?t.map((e,r)=>({id:`segment_${r}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...Co]}W();function om(t){let{constants:e,topLevelWindow:r,modules:s,caches:n,uiState:o}=t,{SCRIPT_ID:a,SCRIPT_VERSION:i,POPUP_ID:l}=e,c=I.createScope("PopupShell"),d={cleanup:null},u={cleanups:[]},y={cleanups:[]},p={current:null};function f(){return!!o.sidebarCollapsed}function g(){o.sidebarCollapsed=!o.sidebarCollapsed;let b=o.currentPopup;if(!b)return;let w=b.querySelector(".yyt-shell-sidebar"),k=b.querySelector(".yyt-shell-workspace"),P=b.querySelector(".yyt-sidebar-toggle i");w&&w.classList.toggle("yyt-collapsed",o.sidebarCollapsed),k&&k.classList.toggle("yyt-sidebar-collapsed",o.sidebarCollapsed),P&&(P.className=o.sidebarCollapsed?"fa-solid fa-angles-right":"fa-solid fa-angles-left"),Ue()}function h(...b){c.log(b.join(" "))}function x(...b){c.error(b.join(" "))}function v(b){return typeof b!="string"?"":b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function T(){return r.jQuery||window.jQuery}function L(){return r.document||document}function M(b){if(!b)return"\u672A\u9009\u62E9\u9875\u9762";let w=s.toolRegistryModule?.getToolConfig(b);if(!w)return b;if(!w.hasSubTabs)return w.name||b;let k=A(b),P=w.subTabs?.find(O=>O.id===k);return P?.name?`${w.name} / ${P.name}`:w.name||b}function _(b){if(!b)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let w=s.toolRegistryModule?.getToolConfig(b);if(!w)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!w.hasSubTabs)return w.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let k=A(b);return w.subTabs?.find(O=>O.id===k)?.description||w.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function A(b,w=""){let k=s.toolRegistryModule?.getToolConfig(b);if(!k?.hasSubTabs||!Array.isArray(k.subTabs)||k.subTabs.length===0)return"";let P=String(w||o.currentSubTab[b]||"").trim(),z=P&&k.subTabs.some(ee=>ee?.id===P)?P:k.subTabs[0]?.id||"";return z&&o.currentSubTab[b]!==z&&(o.currentSubTab[b]=z),z}function F(){let b=o.currentPopup;if(!b)return;let w=M(o.currentMainTab),k=_(o.currentMainTab),P=b.querySelector(".yyt-popup-active-label");P&&(P.textContent=`\u5F53\u524D\uFF1A${w}`);let O=b.querySelector(".yyt-shell-breadcrumb");O&&(O.textContent=w);let z=b.querySelector(".yyt-shell-main-title");z&&(z.textContent=w);let ee=b.querySelector(".yyt-shell-main-description");ee&&(ee.textContent=k)}function H(){typeof d.cleanup=="function"&&(d.cleanup(),d.cleanup=null)}function R(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(b=>{typeof b=="function"&&b()}),u.cleanups=[])}function S(){Array.isArray(y.cleanups)&&(y.cleanups.forEach(b=>{typeof b=="function"&&b()}),y.cleanups=[])}function U(b,w){if(!b||!w)return!1;let k=b.jquery?b[0]:b,P=w.jquery?w[0]:w;return!!(k&&P&&k===P)}function V(b={}){let{container:w=null}=b,k=p.current;if(k&&!(w&&!U(k.container,w))){try{typeof k.destroy=="function"&&k.destroy(k.container)}catch(P){x("\u9500\u6BC1\u52A8\u6001\u9762\u677F host \u5931\u8D25",P)}s.uiModule?.uiManager?.destroyContainerInstance&&s.uiModule.uiManager.destroyContainerInstance(k.container),p.current=null}}function fe(b,w={}){p.current={key:w.key||"",container:b,destroy:typeof w.destroy=="function"?w.destroy:null}}function Ve(){let b=T();if(!b||!o.currentPopup)return;let w=s.toolRegistryModule?.getToolList()||[],k=b(o.currentPopup).find(".yyt-main-nav");if(!k.length)return;let P=w.map(z=>`
      <div class="yyt-main-nav-item ${z.id===o.currentMainTab?"active":""}" data-tab="${z.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${v(z.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${v(z.name||z.id)}</span>
          <span class="yyt-main-nav-desc">${v(z.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");k.html(P),b(o.currentPopup).find(".yyt-main-nav-item").on("click",function(){let ee=b(this).data("tab");ee&&Qr(ee)});let O=b(o.currentPopup).find(".yyt-shell-sidebar-hint");O.length&&O.text(`${w.length} tabs`)}function Ae(){let b=T();if(!b||!o.currentPopup)return;let w=s.toolRegistryModule?.getToolList()||[],k=s.toolRegistryModule?.getToolConfig("tools"),P=Array.isArray(k?.subTabs)?k.subTabs:[],O=P.filter(te=>te?.isCustom).length,z=P.filter(te=>!te?.isCustom).length,q=b(o.currentPopup).find(".yyt-shell-sidebar-stats");q.length&&(q.find(".yyt-shell-sidebar-stat").eq(0).find(".yyt-shell-sidebar-stat-value").text(String(w.length)),q.find(".yyt-shell-sidebar-stat").eq(1).find(".yyt-shell-sidebar-stat-value").text(String(z)),q.find(".yyt-shell-sidebar-stat").eq(2).find(".yyt-shell-sidebar-stat-value").text(String(O)))}function oe(){let b=s.toolRegistryModule?.getToolList()||[];return b.length?(b.some(w=>w.id===o.currentMainTab)||(o.currentMainTab=b[0].id),o.currentMainTab):null}async function Ze(b={}){let{rebuildNavigation:w=!1,reRenderSubNav:k=!1}=b,P=T();if(!P||!o.currentPopup)return;V();let O=oe();if(!O)return;w&&(Ve(),Ae());let z=s.toolRegistryModule?.getToolConfig(O),ee=!!z?.hasSubTabs,q=P(o.currentPopup).find(".yyt-sub-nav"),te=P(o.currentPopup).find(".yyt-content-inner");if(w&&te.length){let ve=new Set(te.find(".yyt-tab-content").map((pe,et)=>P(et).data("tab")).get());(s.toolRegistryModule?.getToolList()||[]).forEach(pe=>{ve.has(pe.id)||te.append(`<div class="yyt-tab-content" data-tab="${v(pe.id)}"></div>`)}),te.find(".yyt-tab-content").each((pe,et)=>{let Pt=P(et).data("tab");(s.toolRegistryModule?.getToolList()||[]).some(Gt=>Gt.id===Pt)||P(et).remove()})}P(o.currentPopup).find(".yyt-main-nav-item").removeClass("active"),P(o.currentPopup).find(`.yyt-main-nav-item[data-tab="${O}"]`).addClass("active"),P(o.currentPopup).find(".yyt-tab-content").removeClass("active"),P(o.currentPopup).find(`.yyt-tab-content[data-tab="${O}"]`).addClass("active"),ee?(q.show(),(k||w)&&Bs(O,z.subTabs)):q.hide(),await Zr(O),F(),Ue()}function cr(){if(!o.currentPopup)return;R();let b=()=>{if(o.currentMainTab==="presetManagement"){Ze();return}o.currentMainTab==="tools"&&Ze({reRenderSubNav:!0})},w=()=>{o.currentMainTab==="tools"?Ze({rebuildNavigation:!0,reRenderSubNav:!0}):Ae()},k=()=>{o.currentMainTab==="tools"&&Ze({rebuildNavigation:!1,reRenderSubNav:!1})},P=()=>{(o.currentMainTab==="bypass"||o.currentMainTab==="tools")&&Ze({reRenderSubNav:o.currentMainTab==="tools"})};[B.PRESET_CREATED,B.PRESET_UPDATED,B.PRESET_DELETED].forEach(O=>{u.cleanups.push(K.on(O,b))}),[B.TOOL_REGISTERED,B.TOOL_UPDATED,B.TOOL_UNREGISTERED].forEach(O=>{u.cleanups.push(K.on(O,w))}),u.cleanups.push(K.on(B.TOOL_RUNTIME_UPDATED,k)),[B.BYPASS_PRESET_CREATED,B.BYPASS_PRESET_UPDATED,B.BYPASS_PRESET_DELETED].forEach(O=>{u.cleanups.push(K.on(O,P))})}function J(b){return!!b?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown",".yyt-select-portal-layer"].join(","))}function ue(b){let w=b?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return w?w.scrollHeight>w.clientHeight+2||w.scrollWidth>w.clientWidth+2:!1}function Oe(b,w){return w?.closest?.(".yyt-scrollable-surface")===b}function Rt(b,w){if(!b||!w)return null;let k=w.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return k&&(k.classList?.contains("yyt-select-portal-layer")||b.contains(k))&&(k.scrollHeight>k.clientHeight+2||k.scrollWidth>k.clientWidth+2)?k:[w.closest?.(".yyt-tool-list"),w.closest?.(".yyt-settings-content"),w.closest?.(".yyt-sub-content"),w.closest?.(".yyt-tab-content.active"),b].filter(Boolean).find(O=>O!==b&&!b.contains(O)?!1:O.scrollHeight>O.clientHeight+2||O.scrollWidth>O.clientWidth+2)||b}function He({mainTab:b=null,includeSubContent:w=!1}={}){let k=o.currentPopup;if(!k)return;let P=k.querySelector(".yyt-content");P&&(P.scrollTop=0,P.scrollLeft=0);let O=b?`.yyt-tab-content[data-tab="${b}"]`:".yyt-tab-content.active",z=k.querySelector(O);if(z&&(z.scrollTop=0,z.scrollLeft=0),!w)return;(z?.querySelectorAll(".yyt-sub-content")||[]).forEach(q=>{q.scrollTop=0,q.scrollLeft=0})}function dr(b){let w=L();if(!b||!w)return;b.classList.add("yyt-scrollable-surface");let k=!1,P=!1,O=0,z=0,ee=0,q=0,te=!1,ve=!1,pe=()=>{k=!1,P=!1,b.classList.remove("yyt-scroll-dragging")},et=Y=>{Y.button===0&&(J(Y.target)||Oe(b,Y.target)&&(te=b.scrollWidth>b.clientWidth+2,ve=b.scrollHeight>b.clientHeight+2,!(!te&&!ve)&&(Y.stopPropagation(),k=!0,P=!1,O=Y.clientX,z=Y.clientY,ee=b.scrollLeft,q=b.scrollTop)))},Pt=Y=>{if(!k)return;let lt=Y.clientX-O,Je=Y.clientY-z;!(Math.abs(lt)>4||Math.abs(Je)>4)&&!P||(P=!0,b.classList.add("yyt-scroll-dragging"),te&&(b.scrollLeft=ee-lt),ve&&(b.scrollTop=q-Je),Y.preventDefault())},Gt=()=>{pe()},kr=Y=>{if(Y.ctrlKey||ue(Y.target)||!b.classList.contains("yyt-content")&&!Oe(b,Y.target))return;let Je=Rt(b,Y.target);!Je||Je!==b&&!b.contains(Je)||!(Je.scrollHeight>Je.clientHeight+2||Je.scrollWidth>Je.clientWidth+2)||(Math.abs(Y.deltaY)>0&&(Je.scrollTop+=Y.deltaY),Math.abs(Y.deltaX)>0&&(Je.scrollLeft+=Y.deltaX),Y.preventDefault(),Y.stopPropagation())},tt=Y=>{P&&Y.preventDefault()};b.addEventListener("mousedown",et),b.addEventListener("wheel",kr,{passive:!1}),b.addEventListener("dragstart",tt),w.addEventListener("mousemove",Pt),w.addEventListener("mouseup",Gt),y.cleanups.push(()=>{pe(),b.classList.remove("yyt-scrollable-surface"),b.removeEventListener("mousedown",et),b.removeEventListener("wheel",kr),b.removeEventListener("dragstart",tt),w.removeEventListener("mousemove",Pt),w.removeEventListener("mouseup",Gt)})}function Ue(){let b=o.currentPopup;if(!b)return;S();let w=[...b.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...b.querySelectorAll(".yyt-sub-nav"),...b.querySelectorAll(".yyt-content"),...b.querySelectorAll(".yyt-settings-content"),...b.querySelectorAll(".yyt-tool-list")];[...new Set(w)].forEach(dr)}function Cn(b){return`
      <div class="yyt-startup-screen" data-yyt-startup-screen>
        <div class="yyt-startup-screen-inner">
          <div class="yyt-startup-screen-kicker">Welcome</div>
          <div class="yyt-startup-screen-title">YouYou \u5DE5\u5177\u7BB1</div>
          <div class="yyt-startup-screen-desc">\u96C6\u4E2D\u7BA1\u7406 API \u9884\u8BBE\u3001\u81EA\u5B9A\u4E49\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001Ai\u6307\u4EE4\u9884\u8BBE\u4E0E\u8BCA\u65AD\u6D41\u7A0B\u3002\u6BCF\u6B21\u5237\u65B0\u540E\u90FD\u4F1A\u91CD\u65B0\u663E\u793A\uFF0C\u4FBF\u4E8E\u5FEB\u901F\u56DE\u5230\u4ECB\u7ECD\u5165\u53E3\u3002</div>
          <div class="yyt-startup-screen-modules">
            ${(b||[]).slice(0,6).map(k=>`
      <div class="yyt-startup-module-chip">
        <i class="fa-solid ${v(k.icon||"fa-file")}"></i>
        <span>${v(k.name||k.id)}</span>
      </div>
    `).join("")}
          </div>
          <div class="yyt-startup-screen-status">
            <i class="fa-solid fa-sparkles"></i>
            <span>\u5DE5\u4F5C\u53F0\u5DF2\u51C6\u5907\u5C31\u7EEA\uFF0C\u540E\u7EED\u6253\u5F00\u5C06\u76F4\u63A5\u8FDB\u5165\u4E3B\u754C\u9762\u3002</span>
          </div>
          <button type="button" class="yyt-btn yyt-btn-primary yyt-startup-enter">
            <i class="fa-solid fa-arrow-right"></i>
            <span>\u8FDB\u5165\u5DE5\u5177\u7BB1</span>
          </button>
        </div>
      </div>
    `}function kn(b){let w=T();if(!w||!o.currentPopup||o.startupScreenDismissed)return;let k=w(o.currentPopup).find(".yyt-popup-body"),P=k.find(".yyt-popup-shell");!k.length||!P.length||k.find("[data-yyt-startup-screen]").length||(P.attr("data-yyt-startup-visible","true"),k.prepend(Cn(b)),k.find(".yyt-startup-enter").on("click",()=>{k.find("[data-yyt-startup-screen]").remove(),P.removeAttr("data-yyt-startup-visible"),o.startupScreenDismissed=!0,Ue()}))}function Ar(){let b=L(),w=o.currentPopup,k=w?.querySelector(".yyt-popup-header");if(!w||!k||!b)return;let P=!1,O=0,z=0,ee=0,q=0,te="",ve=()=>({width:r.innerWidth||b.documentElement?.clientWidth||window.innerWidth||0,height:r.innerHeight||b.documentElement?.clientHeight||window.innerHeight||0}),pe=(tt,Y,lt)=>Math.min(Math.max(tt,Y),lt),et=()=>{P&&(P=!1,w.classList.remove("yyt-popup-dragging"),b.body.style.userSelect=te)},Pt=tt=>{if(!P||!o.currentPopup)return;let Y=tt.clientX-O,lt=tt.clientY-z,{width:Je,height:li}=ve(),bm=w.offsetWidth||0,xm=w.offsetHeight||0,wm=Math.max(0,Je-bm),vm=Math.max(0,li-xm);w.style.left=`${pe(ee+Y,0,wm)}px`,w.style.top=`${pe(q+lt,0,vm)}px`,w.style.transform="none",w.style.right="auto",w.style.bottom="auto"},Gt=()=>{et()},kr=tt=>{if(tt.button!==0||tt.target?.closest(".yyt-popup-close"))return;P=!0,O=tt.clientX,z=tt.clientY;let Y=w.getBoundingClientRect();ee=Y.left,q=Y.top,w.style.left=`${Y.left}px`,w.style.top=`${Y.top}px`,w.style.transform="none",w.style.right="auto",w.style.bottom="auto",w.classList.add("yyt-popup-dragging"),te=b.body.style.userSelect||"",b.body.style.userSelect="none",tt.preventDefault()};k.addEventListener("mousedown",kr),b.addEventListener("mousemove",Pt),b.addEventListener("mouseup",Gt),d.cleanup=()=>{et(),k.removeEventListener("mousedown",kr),b.removeEventListener("mousemove",Pt),b.removeEventListener("mouseup",Gt)}}function Cr(){V(),H(),R(),S();let b=T();if(b&&o.currentPopup){let w=b(o.currentPopup);ct(w,"yytPopupToolConfigSelect"),ct(w,"yytPromptEditorSelect")}o.currentPopup&&(o.currentPopup.remove(),o.currentPopup=null),o.currentOverlay&&(o.currentOverlay.remove(),o.currentOverlay=null),h("\u5F39\u7A97\u5DF2\u5173\u95ED")}function Qr(b){V(),o.currentMainTab=b;let w=T();if(!w||!o.currentPopup)return;He({mainTab:b,includeSubContent:!0}),w(o.currentPopup).find(".yyt-main-nav-item").removeClass("active"),w(o.currentPopup).find(`.yyt-main-nav-item[data-tab="${b}"]`).addClass("active");let k=s.toolRegistryModule?.getToolConfig(b);k?.hasSubTabs?(w(o.currentPopup).find(".yyt-sub-nav").show(),Bs(b,k.subTabs)):w(o.currentPopup).find(".yyt-sub-nav").hide(),w(o.currentPopup).find(".yyt-tab-content").removeClass("active"),w(o.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`).addClass("active"),Zr(b),F(),Ue()}function Os(b,w){V(),o.currentSubTab[b]=w;let k=T();!k||!o.currentPopup||(He({mainTab:b,includeSubContent:!0}),k(o.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),k(o.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${w}"]`).addClass("active"),es(b,w),F(),Ue())}function Bs(b,w){let k=T();if(!k||!o.currentPopup||!w)return;let P=A(b,o.currentSubTab[b]||w[0]?.id),z=(b==="tools"?[{key:"ai",title:"AI \u5DE5\u5177",items:w.filter(q=>!q?.isCustom&&(q?.toolKind||"ai")!=="script")},{key:"script",title:"\u811A\u672C\u5DE5\u5177",items:w.filter(q=>!q?.isCustom&&q?.toolKind==="script")},{key:"custom",title:"\u81EA\u5B9A\u4E49\u5DE5\u5177",items:w.filter(q=>q?.isCustom===!0)}].filter(q=>q.items.length>0):[{key:"default",title:"",items:w}]).map(q=>{let te=q.title?`<div class="yyt-sub-nav-group-title">${v(q.title)}</div>`:"",ve=q.items.map(pe=>{let et=pe?.isCustom===!0,Pt=b==="tools"&&et?`<div class="yyt-sub-nav-item-actions">
               <button type="button" class="yyt-sub-nav-item-action" data-action="edit" data-subtab="${pe.id}" title="\u7F16\u8F91"><i class="fa-solid fa-pen"></i></button>
               <button type="button" class="yyt-sub-nav-item-action" data-action="delete" data-subtab="${pe.id}" title="\u5220\u9664"><i class="fa-solid fa-trash"></i></button>
             </div>`:"";return`
        <div class="yyt-sub-nav-item ${pe.id===P?"active":""}" data-subtab="${pe.id}" data-tool-name="${v((pe.name||pe.id).toLowerCase())}">
          <i class="fa-solid ${pe.icon||"fa-file"}"></i>
          <span class="yyt-sub-nav-item-label">${v(pe.name||pe.id)}</span>
          ${Pt}
        </div>
      `}).join("");return`
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${q.key}">
          ${te}
          <div class="yyt-sub-nav-group-items">
            ${ve}
          </div>
        </div>
      `}).join(""),ee=b==="tools"?`<div class="yyt-sub-nav-toolbar">
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="add" title="\u65B0\u5EFA\u81EA\u5B9A\u4E49\u5DE5\u5177"><i class="fa-solid fa-plus"></i><span>\u65B0\u5EFA</span></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="import" title="\u4ECE JSON \u5BFC\u5165\u5DE5\u5177"><i class="fa-solid fa-file-import"></i></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="export" title="\u5BFC\u51FA\u5DE5\u5177 JSON"><i class="fa-solid fa-file-export"></i></button>
         </div>
         <div class="yyt-sub-nav-filter-wrap">
           <input type="text" class="yyt-sub-nav-filter" placeholder="\u7B5B\u9009\u5DE5\u5177\u2026" autocomplete="off">
         </div>`:"";k(o.currentPopup).find(".yyt-sub-nav").html(ee+z),k(o.currentPopup).find(".yyt-sub-nav-item").on("click",function(te){if(te.target.closest&&te.target.closest(".yyt-sub-nav-item-action"))return;let ve=k(this).data("subtab");Os(b,ve)}),b==="tools"&&Mn(b),Ue()}function In(b){if(!o.currentPopup)return;let w=T();if(!w)return;let k=String(b||"").trim().toLowerCase();w(o.currentPopup).find(".yyt-sub-nav-item").each(function(){let O=String(w(this).data("tool-name")||"");w(this).toggle(!k||O.includes(k))}),w(o.currentPopup).find(".yyt-sub-nav-group").each(function(){let O=w(this).find(".yyt-sub-nav-item:visible").length>0;w(this).toggle(O)})}function Mn(b){let w=T();if(!w||!o.currentPopup)return;let k=w(o.currentPopup).find(".yyt-sub-nav");k.find(".yyt-sub-nav-filter").off("input.yytFilter").on("input.yytFilter",function(){In(this.value)}),k.find(".yyt-sub-nav-toolbar-btn").off("click.yytToolAction").on("click.yytToolAction",async function(P){P.preventDefault(),P.stopPropagation();let O=w(this).data("tool-action");try{let z=await Promise.resolve().then(()=>(Zc(),Qc));if(O==="add"){let ee=await z.showToolEditDialog(null);ee&&(o.currentSubTab[b]=ee,Os(b,ee))}else O==="import"?await z.showImportToolsDialog():O==="export"&&z.showExportToolsDialog()}catch(z){x("\u5DE5\u5177\u64CD\u4F5C\u5931\u8D25",z)}}),k.find(".yyt-sub-nav-item-action").off("click.yytItemAction").on("click.yytItemAction",async function(P){P.preventDefault(),P.stopPropagation();let O=w(this).data("action"),z=String(w(this).data("subtab")||"");if(z)try{let ee=await Promise.resolve().then(()=>(Zc(),Qc));O==="edit"?await ee.showToolEditDialog(z):O==="delete"&&await ee.confirmDeleteTool(z)&&o.currentSubTab[b]===z&&(o.currentSubTab[b]="")}catch(ee){x("\u5DE5\u5177\u884C\u5185\u64CD\u4F5C\u5931\u8D25",ee)}})}async function Zr(b){let w=T();if(!w||!o.currentPopup)return;let k=w(o.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`);if(!k.length)return;if(s.toolRegistryModule?.getToolConfig(b)?.hasSubTabs){let z=A(b);z?await es(b,z):k.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5B50 tab \u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>'),Ue();return}await s.uiModule?.renderMainTab?.(b,k)||lm(b,k),Ue()}async function es(b,w){let k=T();if(!k||!o.currentPopup)return;let P=k(o.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`);if(!P.length)return;let O=s.toolRegistryModule?.getToolConfig(b);if(O?.hasSubTabs){let ee=A(b,w),q=O.subTabs?.find(et=>et.id===ee),te=P.find(".yyt-sub-content");if(te.length||(P.html('<div class="yyt-sub-content"></div>'),te=P.find(".yyt-sub-content")),!q){te.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5F53\u524D\u5B50\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u5931\u6548</span></div>'),He({mainTab:b,includeSubContent:!0}),Ue();return}let ve=q.component;if(ve==="GenericToolConfigPanel"){await ts(q,te),He({mainTab:b,includeSubContent:!0}),Ue();return}V({container:te});let pe=await s.uiModule?.renderSubTabComponent?.(ve,te);pe?fe(te,{key:pe}):te.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>'),He({mainTab:b,includeSubContent:!0}),Ue();return}let z=P.find(".yyt-sub-content");if(z.length){switch(V({container:z}),w){case"config":cm(b,z);break;case"prompts":await dm(b,z);break;case"presets":um(b,z);break;default:z.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}He({mainTab:b,includeSubContent:!0}),Ue()}}async function ts(b,w){if(!(!T()||!w?.length||!b?.id)){V({container:w});try{let P=n.dynamicToolPanelCache.get(b.id);if(!P){let ee=(await Promise.resolve().then(()=>(Sn(),Jy)))?.createToolConfigPanel;if(typeof ee!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");P=()=>ee({id:`${b.id}Panel`,toolId:b.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${b.name||b.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${b.id}-extraction-preview`,previewTitle:`${b.name||b.id} \u63D0\u53D6\u9884\u89C8`}),n.dynamicToolPanelCache.set(b.id,P)}let O=P();O.renderTo(w),fe(w,{key:b.id,destroy:typeof O?.destroy=="function"?z=>O.destroy(z):null}),Ue()}catch(P){p.current=null,x("\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:",P),w.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}}function lm(b,w){if(!T())return;let P=s.toolRegistryModule?.getToolConfig(b);if(!P){w.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let O=o.currentSubTab[b]||P.subTabs?.[0]?.id||"config";w.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${O}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),es(b,O)}function cm(b,w){if(!T())return;let P=s.toolManagerModule?.getTool(b),O=s.presetManagerModule?.getAllPresets()||[],z=s.toolRegistryModule?.getToolApiPreset(b)||"",ee=O.map(q=>`<option value="${v(q.name)}" ${q.name===z?"selected":""}>${v(q.name)}</option>`).join("");w.html(`
      <div class="yyt-panel">
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading">
            <span class="yyt-flow-heading-icon"><i class="fa-solid fa-plug"></i></span>
            <span>API\u9884\u8BBE\u7ED1\u5B9A</span>
          </div>
          <div class="yyt-form-group">
            <label>\u9009\u62E9API\u9884\u8BBE</label>
            <select class="yyt-select" id="yyt-tool-api-preset">
              <option value="">\u4F7F\u7528\u5F53\u524D\u914D\u7F6E</option>
              ${ee}
            </select>
          </div>
          <button class="yyt-btn yyt-btn-primary" id="yyt-save-tool-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u7ED1\u5B9A
          </button>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading">
            <span class="yyt-flow-heading-icon"><i class="fa-solid fa-cog"></i></span>
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
    `),Nt(w,{namespace:"yytPopupToolConfigSelect",selectors:["#yyt-tool-api-preset"]}),w.find("#yyt-save-tool-preset").on("click",function(){let te=w.find("#yyt-tool-api-preset").val();s.toolRegistryModule?.setToolApiPreset(b,te);let ve=r.toastr;ve&&ve.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function dm(b,w){if(!T()){w.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let O=s.toolManagerModule?.getTool(b)?.config?.messages||[],z=nm(O)||Co,ee=new oi({containerId:`yyt-prompt-editor-${b}`,segments:z,onChange:te=>{let ve=sm(te);h("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",ve.length,"\u6761\u6D88\u606F")}});w.html(`<div id="yyt-prompt-editor-${b}" class="yyt-prompt-editor-container"></div>`),ee.init(w.find(`#yyt-prompt-editor-${b}`));let q=rm();if(q){let te="yyt-prompt-editor-styles",ve=r.document||document;if(!ve.getElementById(te)){let pe=ve.createElement("style");pe.id=te,pe.textContent=q,(ve.head||ve.documentElement).appendChild(pe)}}}function um(b,w){T()&&w.html(`
      <div class="yyt-panel">
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading">
            <span class="yyt-flow-heading-icon"><i class="fa-solid fa-bookmark"></i></span>
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
    `)}function pm(){return`
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
      </div>`}function ym(b,w,k){let P=f(),O=b.map(z=>`
      <div class="yyt-main-nav-item ${z.id===o.currentMainTab?"active":""}" data-tab="${z.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${v(z.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${v(z.name||z.id)}</span>
          <span class="yyt-main-nav-desc">${v(z.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");return`
      <aside class="yyt-shell-sidebar${P?" yyt-collapsed":""}">
        <div class="yyt-shell-sidebar-card">
          <div class="yyt-shell-sidebar-title-row">
            <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
            <span class="yyt-shell-sidebar-hint">${b.length} tabs</span>
            <button class="yyt-sidebar-toggle" title="${P?"\u5C55\u5F00\u4FA7\u680F":"\u6298\u53E0\u4FA7\u680F"}">
              <i class="fa-solid ${P?"fa-angles-right":"fa-angles-left"}"></i>
            </button>
          </div>
          <div class="yyt-main-nav">
            ${O}
          </div>
          <div class="yyt-shell-sidebar-note">
            \u4FDD\u5B58\u540E\uFF0C\u624B\u52A8\u6267\u884C\u4E0E\u5199\u56DE\u94FE\u90FD\u4F1A\u4EE5\u6700\u65B0\u914D\u7F6E\u4E3A\u51C6\u3002
          </div>
          <div class="yyt-shell-sidebar-stats">
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${b.length}</span>
              <span class="yyt-shell-sidebar-stat-label">\u4E3B\u9875\u9762</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${w}</span>
              <span class="yyt-shell-sidebar-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${k}</span>
              <span class="yyt-shell-sidebar-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
            </div>
          </div>
        </div>
      </aside>`}function fm(b,w){return`
      <div class="yyt-shell-main-header">
        <div class="yyt-shell-main-heading-block">
          <div class="yyt-shell-main-title">${v(b)}</div>
          <div class="yyt-shell-main-description">${v(w)}</div>
        </div>
        <div class="yyt-shell-main-actions">
          <div class="yyt-shell-main-meta">
            <i class="fa-solid fa-circle-info"></i>
            <span>\u4FDD\u5B58\u540E\u6267\u884C\u94FE\u4F1A\u7ACB\u5373\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
          </div>
        </div>
      </div>`}function gm(b,w){return b.map(k=>`
      <div class="yyt-tab-content ${k.id===w?"active":""}" data-tab="${k.id}">
      </div>
    `).join("")}function mm(b){return`
      <div class="yyt-popup-footer">
        <div class="yyt-popup-footer-left">
          <div class="yyt-popup-status-cluster">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${v(b)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
            </div>
          </div>
        </div>
      </div>`}async function hm(){if(o.currentPopup){h("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let b=t?.services?.loadModules;typeof b=="function"&&await b();let w=T(),k=L();if(!w){x("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let P=s.toolRegistryModule?.getToolList()||[];if(!P.length){x("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}P.some(Y=>Y.id===o.currentMainTab)||(o.currentMainTab=P[0].id);let O=s.toolRegistryModule?.getToolConfig("tools"),z=Array.isArray(O?.subTabs)?O.subTabs:[],ee=z.filter(Y=>Y?.isCustom).length,q=z.filter(Y=>!Y?.isCustom).length,te=M(o.currentMainTab),ve=_(o.currentMainTab);o.currentOverlay=k.createElement("div"),o.currentOverlay.className="yyt-popup-overlay",o.currentOverlay.addEventListener("click",Y=>{Y.target===o.currentOverlay&&Cr()}),k.body.appendChild(o.currentOverlay);let pe=f(),et=`
      <div class="yyt-popup" id="${l}">
        ${pm()}
        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-workspace${pe?" yyt-sidebar-collapsed":""}">
              ${ym(P,q,ee)}
              <section class="yyt-shell-main">
                ${fm(te,ve)}
                <div class="yyt-sub-nav" style="display: none;"></div>
                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${gm(P,o.currentMainTab)}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        ${mm(te)}
      </div>
    `,Pt=k.createElement("div");Pt.innerHTML=et,o.currentPopup=Pt.firstElementChild,k.body.appendChild(o.currentPopup),w(o.currentPopup).find(".yyt-popup-close").on("click",Cr),w(o.currentPopup).find(".yyt-sidebar-toggle").on("click",g);let Gt=Y=>{Y.key==="Escape"&&(k.querySelector(".yyt-dialog-overlay")||k.querySelector(".yyt-twb-editor-drawer.is-open")||(Y.stopPropagation(),Cr()))},kr=Y=>{if(!(Y.ctrlKey||Y.metaKey)||Y.key!=="s"||!o.currentPopup)return;Y.preventDefault(),Y.stopPropagation();let lt=w(o.currentPopup),Je=lt.find("#yyt-bypass-save:visible").first()||lt.find(`#${a}-save-api-config:visible`).first()||lt.find("#yyt-save-tool-preset:visible").first()||lt.find('[data-twb-action="save"]:visible').first();Je?.length&&Je.trigger("click")};k.addEventListener("keydown",Gt),k.addEventListener("keydown",kr),u.cleanups.push(()=>{k.removeEventListener("keydown",Gt),k.removeEventListener("keydown",kr)}),cr(),w(o.currentPopup).find(".yyt-main-nav-item").on("click",function(){let lt=w(this).data("tab");lt&&Qr(lt)}),Ar(),Zr(o.currentMainTab);let tt=s.toolRegistryModule?.getToolConfig(o.currentMainTab);tt?.hasSubTabs&&(w(o.currentPopup).find(".yyt-sub-nav").show(),Bs(o.currentMainTab,tt.subTabs)),F(),kn(P),Ue(),h("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:hm,closePopup:Cr,switchMainTab:Qr,switchSubTab:Os,renderTabContent:Zr,renderSubTabContent:es}}function am(t,e={}){let{constants:r,modules:s}=t,{SCRIPT_ID:n,SCRIPT_VERSION:o}=r,{init:a,loadModules:i,addMenuItem:l,popupShell:c}=e;return{version:o,id:n,init:a,openPopup:c?.openPopup,closePopup:c?.closePopup,switchMainTab:c?.switchMainTab,switchSubTab:c?.switchSubTab,addMenuItem:l,getStorage:()=>s.storageModule,getApiConnection:()=>s.apiConnectionModule,getPresetManager:()=>s.presetManagerModule,getUi:()=>s.uiModule,getUiModule:()=>s.uiModule,getRegexExtractor:()=>s.regexExtractorModule,getToolManager:()=>s.toolManagerModule,getToolExecutor:()=>s.toolExecutorModule,getWindowManager:()=>s.windowManagerModule,getToolRegistry:()=>s.toolRegistryModule,getSettingsService:()=>s.settingsServiceModule,getBypassManager:()=>s.bypassManagerModule,getVariableResolver:()=>s.variableResolverModule,getContextInjector:()=>s.contextInjectorModule,getToolPromptService:()=>s.toolPromptServiceModule,getToolOutputService:()=>s.toolOutputServiceModule,getToolAutomationService:()=>s.toolAutomationServiceModule,getDataProvider:()=>s.toolDataProviderModule?.getCurrentProvider?.()||null,async getDataProviderAsync(){return await i(),s.toolDataProviderModule?.getToolDataProvider?.()||null},async getApiConfig(){return await i(),s.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(d){return await i(),s.apiConnectionModule?(s.apiConnectionModule.updateApiConfig(d),!0):!1},async getPresets(){return await i(),s.presetManagerModule?s.presetManagerModule.getAllPresets():[]},async sendApiRequest(d,u){if(await i(),s.apiConnectionModule)return s.apiConnectionModule.sendApiRequest(d,u);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),s.apiConnectionModule?s.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(d,u){return s.toolRegistryModule?.registerTool(d,u)||!1},unregisterTool(d){return s.toolRegistryModule?.unregisterTool(d)||!1},getToolList(){return s.toolRegistryModule?.getToolList()||[]},createWindow(d){return s.windowManagerModule?.createWindow(d)||null},closeWindow(d){s.windowManagerModule?.closeWindow(d)},startAutomation(){return s.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){s.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return s.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},cancelAutomation(d={}){return s.toolAutomationServiceModule?.toolAutomationService?.cancelAutomation?.(d)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}},async processCurrentAssistantMessage(d={}){return s.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(d)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var ai="youyou_toolkit",fS="1.0.198",gS=`${ai}-menu-item`,mS=`${ai}-menu-container`,hS=`${ai}-popup`,bS=typeof window.parent<"u"?window.parent:window,ii={constants:{SCRIPT_ID:ai,SCRIPT_VERSION:fS,MENU_ITEM_ID:gS,MENU_CONTAINER_ID:mS,POPUP_ID:hS},topLevelWindow:bS,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null,toolAutomationServiceModule:null,toolDataProviderModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"presetManagement",currentSubTab:{},startupScreenDismissed:!1}},im=om(ii),ko=tm(ii,{openPopup:im.openPopup});ii.services.loadModules=ko.loadModules;var ed=am(ii,{init:ko.init,loadModules:ko.loadModules,addMenuItem:ko.addMenuItem,popupShell:im});if(typeof window<"u"&&(window.YouYouToolkit=ed,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=ed}catch{}var Ak=ed;ko.init();Promise.resolve().then(()=>(W(),rd)).then(({logger:t})=>{t.createScope("Bootstrap").log("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210")});export{Ak as default};
