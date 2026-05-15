var Qy=Object.defineProperty;var U=(t,e)=>()=>(t&&(e=t(t=0)),e);var re=(t,e)=>{for(var s in e)Qy(t,s,{get:e[s],enumerable:!0})};var P,An,L,ke=U(()=>{P={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_RUNTIME_UPDATED:"tool:runtimeUpdated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},An=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,s,r={}){if(!e||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:o=0}=r;this.listeners.has(e)||this.listeners.set(e,new Set);let n={callback:s,priority:o};return this.listeners.get(e).add(n),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,s)}off(e,s){let r=this.listeners.get(e);if(r){for(let o of r)if(o.callback===s){r.delete(o);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,s),this._addToHistory(e,s);let r=this.listeners.get(e);if(!r||r.size===0)return;let o=Array.from(r).sort((n,a)=>a.priority-n.priority);for(let{callback:n}of o)try{n(s)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,s){let r=o=>{this.off(e,r),s(o)};return this.on(e,r)}wait(e,s=0){return new Promise((r,o)=>{let n=null,a=this.once(e,i=>{n&&clearTimeout(n),r(i)});s>0&&(n=setTimeout(()=>{a(),o(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},s))})}hasListeners(e){let s=this.listeners.get(e);return s&&s.size>0}listenerCount(e){let s=this.listeners.get(e);return s?s.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,s){this.history.push({event:e,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(s=>s.event===e):[...this.history]}clearHistory(){this.history=[]}},L=new An});var pi={};re(pi,{LOG_LEVEL:()=>se,LoggerService:()=>oo,default:()=>Zy,logger:()=>N});var se,ui,oo,N,Zy,ce=U(()=>{ke();se=Object.freeze({DEBUG:0,INFO:1,WARN:2,ERROR:3}),ui=Object.freeze({[se.DEBUG]:"DEBUG",[se.INFO]:"INFO",[se.WARN]:"WARN",[se.ERROR]:"ERROR"}),oo=class{constructor(){this._entries=[],this._maxSize=2e3,this._nextId=1,this._minLevel=se.INFO,this._eventKey="logger:entry",this._statsEventKey="logger:statsChanged",this._pendingFlush=!1}_write(e,s,r,o){let n={id:this._nextId++,timestamp:Date.now(),level:e,scope:s,message:r,data:o};this._entries.push(n),this._entries.length>this._maxSize&&this._entries.shift(),this._forwardToConsole(n),this._pendingFlush||(this._pendingFlush=!0,queueMicrotask(()=>{this._pendingFlush=!1,this._emitEntry(n)}))}_forwardToConsole(e){let s=`[${e.scope}]`;switch(e.level){case se.DEBUG:console.debug(s,e.message,e.data??"");break;case se.INFO:console.log(s,e.message,e.data??"");break;case se.WARN:console.warn(s,e.message,e.data??"");break;case se.ERROR:console.error(s,e.message,e.data??"");break}}_emitEntry(e){try{L?.emit(this._eventKey,e)}catch{}}debug(e,s,r){se.DEBUG<this._minLevel||this._write(se.DEBUG,e,s,r)}info(e,s,r){se.INFO<this._minLevel||this._write(se.INFO,e,s,r)}log(e,s,r){this.info(e,s,r)}warn(e,s,r){se.WARN<this._minLevel||this._write(se.WARN,e,s,r)}error(e,s,r){se.ERROR<this._minLevel||this._write(se.ERROR,e,s,r)}createScope(e){return{debug:(s,r)=>this.debug(e,s,r),info:(s,r)=>this.info(e,s,r),log:(s,r)=>this.log(e,s,r),warn:(s,r)=>this.warn(e,s,r),error:(s,r)=>this.error(e,s,r)}}getEntries(e={}){let{level:s,scope:r,search:o,limit:n=500,offset:a=0}=e,i=this._entries;if(s!=null&&(i=i.filter(c=>c.level>=s)),r&&(i=i.filter(c=>c.scope===r)),o){let c=o.toLowerCase();i=i.filter(d=>d.scope.toLowerCase().includes(c)||d.message.toLowerCase().includes(c))}let l=i.length;return i=i.slice(a,a+n),{entries:i,total:l}}getStats(){let e={total:this._entries.length,byLevel:{DEBUG:0,INFO:0,WARN:0,ERROR:0},byScope:{}};for(let s of this._entries){let r=ui[s.level]||"UNKNOWN";e.byLevel[r]=(e.byLevel[r]||0)+1,e.byScope[s.scope]=(e.byScope[s.scope]||0)+1}return e}setLevel(e){this._minLevel=e}getLevel(){return this._minLevel}setMaxSize(e){this._maxSize=Math.max(100,Math.min(1e4,e))}clear(){this._entries=[],this._nextId=1}levelLabel(e){return ui[e]||"UNKNOWN"}},N=new oo,Zy=N});function gi(){let t=R;return t._getStorage(),t._storage}function mi(){return R.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function bi(t){R.set("settings",t)}var En,Xt,R,fe,fi,yr,Ke=U(()=>{ce();En=N.createScope("StorageService"),Xt=class t{constructor(e="youyou_toolkit"){this.namespaceKey=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespaceKey]||(s.extensionSettings[this.namespaceKey]={}),this._storage={_target:s.extensionSettings[this.namespaceKey],getItem:r=>{let o=s.extensionSettings[this.namespaceKey][r];return typeof o=="string"?o:o?JSON.stringify(o):null},setItem:(r,o)=>{s.extensionSettings[this.namespaceKey][r]=o,this._saveSettings(s)},removeItem:r=>{delete s.extensionSettings[this.namespaceKey][r],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{En.warn("SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage")}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,s)=>{try{localStorage.setItem(e,s)}catch(r){En.error("localStorage\u5199\u5165\u5931\u8D25:",r)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,s=null){let r=`${this.namespaceKey}:${e}`;if(this._cache.has(r))return this._cache.get(r);let o=this._getStorage(),n=this._getFullKey(e),a=o.getItem(n);if(a===null)return s;try{let i=JSON.parse(a);return this._cache.set(r,i),i}catch{return a}}set(e,s){let r=this._getStorage(),o=this._getFullKey(e),n=`${this.namespaceKey}:${e}`;this._cache.set(n,s);try{r.setItem(o,JSON.stringify(s))}catch(a){En.error("\u5B58\u50A8\u5931\u8D25:",a)}}remove(e){let s=this._getStorage(),r=this._getFullKey(e),o=`${this.namespaceKey}:${e}`;this._cache.delete(o),s.removeItem(r)}has(e){let s=this._getStorage(),r=this._getFullKey(e);return s.getItem(r)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let r=s.SillyTavern.getContext();r?.extensionSettings?.[this.namespaceKey]&&(r.extensionSettings[this.namespaceKey]={},this._saveSettings(r))}}else{let s=`${this.namespaceKey}_`,r=[];for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);n&&n.startsWith(s)&&r.push(n)}r.forEach(o=>localStorage.removeItem(o))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespaceKey}_${e}`}namespace(e){return new t(`${this.namespaceKey}:${e}`)}getMultiple(e){let s={};return e.forEach(r=>{s[r]=this.get(r)}),s}setMultiple(e){Object.entries(e).forEach(([s,r])=>{this.set(s,r)})}exportAll(){let e=this._getStorage(),s={};if(e._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let n=r.SillyTavern.getContext()?.extensionSettings?.[this.namespaceKey]||{};Object.entries(n).forEach(([a,i])=>{s[a]=typeof i=="string"?JSON.parse(i):i})}}else{let r=`${this.namespaceKey}_`;for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);if(n&&n.startsWith(r)){let a=n.slice(r.length);try{s[a]=JSON.parse(localStorage.getItem(n))}catch{s[a]=localStorage.getItem(n)}}}}return s}},R=new Xt("youyou_toolkit"),fe=new Xt("youyou_toolkit:tools"),fi=new Xt("youyou_toolkit:presets"),yr=new Xt("youyou_toolkit:windows")});var vi={};re(vi,{DEFAULT_API_PRESETS:()=>tu,DEFAULT_SETTINGS:()=>eu,STORAGE_KEYS:()=>ur,StorageService:()=>Xt,deepMerge:()=>hi,getCurrentPresetName:()=>ou,getStorage:()=>gi,loadApiPresets:()=>su,loadSettings:()=>mi,presetStorage:()=>fi,saveApiPresets:()=>ru,saveSettings:()=>bi,setCurrentPresetName:()=>nu,storage:()=>R,toolStorage:()=>fe,windowStorage:()=>yr});function su(){return R.get(ur.API_PRESETS)||[]}function ru(t){R.set(ur.API_PRESETS,t)}function ou(){return R.get(ur.CURRENT_PRESET)||""}function nu(t){R.set(ur.CURRENT_PRESET,t||"")}function hi(t,e){let s=o=>o&&typeof o=="object"&&!Array.isArray(o),r={...t};return s(t)&&s(e)&&Object.keys(e).forEach(o=>{s(e[o])?o in t?r[o]=hi(t[o],e[o]):Object.assign(r,{[o]:e[o]}):Object.assign(r,{[o]:e[o]})}),r}var ur,eu,tu,xi=U(()=>{Ke();Ke();ur={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},eu={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},tu=[]});var Ai={};re(Ai,{API_STATUS:()=>uu,fetchAvailableModels:()=>Rn,getApiConfig:()=>Lt,getEffectiveApiConfig:()=>pr,hasEffectiveApiPreset:()=>fr,sendApiRequest:()=>gr,sendWithPreset:()=>Mn,testApiConnection:()=>vu,updateApiConfig:()=>zs,validateApiConfig:()=>Us});function cu(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function In(){return R.get(wi,cu())}function du(t){R.set(wi,t)}function Si(){return R.get(iu,[])}function yu(){return R.get(lu,"")}function kn(t,e={}){let s=new Error(t);return s.allowDirectFallback=e.allowDirectFallback===!0,s}function Ti(t,e="chat_completions"){let s=String(t||"").trim();if(!s)return"";let r=null;try{r=new URL(s)}catch{return s}let o=r.pathname.replace(/\/+$/,""),n=o;return e==="chat_completions"?!/\/chat\/completions$/i.test(o)&&!/\/completions$/i.test(o)&&(n=`${o||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(o)?n=o.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(o)?n=o.replace(/\/completions$/i,"/models"):/\/models$/i.test(o)||(n=`${o||""}/models`)),r.pathname=n.replace(/\/+/g,"/"),r.toString()}function pu(t){let e=String(t||"").trim();if(!e)return"";try{let s=new URL(e);return s.pathname=s.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",s.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function Lt(){return In().apiConfig||{}}function zs(t){let e=In();e.apiConfig={...e.apiConfig,...t},du(e)}function Us(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function pr(t=""){let e=In(),s=t||yu()||"";if(s){let o=Si().find(n=>n.name===s);if(o&&o.apiConfig)return{...o.apiConfig,presetName:o.name}}return e.apiConfig||{}}function fr(t=""){return t?Si().some(s=>s?.name===t):!1}async function Mn(t,e,s={},r=null){let o=pr(t);return await gr(e,{...s,apiConfig:o},r)}function _i(t,e={}){let s=e.apiConfig||Lt();return{messages:t,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:s.stream??!1,...e.extraParams}}function Cn(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function gr(t,e={},s=null){let r=e.apiConfig||Lt(),o=r.useMainApi,n=Us(r);if(!n.valid&&!o)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${n.errors.join(", ")}`);return o?await fu(t,e,s):await gu(t,r,e,s)}async function fu(t,e,s){let r=typeof window.parent<"u"?window.parent:window;if(!r.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let o=await r.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.apiConfig?.stream??Lt().stream??!1,...e.extraParams});if(typeof o!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return o.trim()}catch(o){throw o.name==="AbortError"?o:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${o.message}`)}}async function gu(t,e,s,r){let o=typeof window.parent<"u"?window.parent:window;if(o.TavernHelper?.generateRaw)try{return await mu(t,e,s,r,o)}catch(n){let a=String(n?.message||n||"");if(n?.name==="AbortError"||r?.aborted||a.includes("\u505C\u6B62\u6309\u94AE")||a.includes("stop button")||a.includes("Clicked stop")||a==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")throw n;au.warn("TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",n)}if(o.SillyTavern?.getRequestHeaders)try{return await bu(t,e,s,r,o)}catch(n){if(!n?.allowDirectFallback)throw n}return await hu(t,e,s,r)}async function mu(t,e,s,r,o){if(r?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let n=await o.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.stream??!1,max_chat_history:0,custom_api:{apiurl:pu(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...s.extraParams||{}});return typeof n=="string"?n.trim():Cn(n)}async function bu(t,e,s,r,o){let n=String(e.url||"").trim(),a={..._i(t,{apiConfig:e,...s}),chat_completion_source:"custom",reverse_proxy:n,proxy_password:"",custom_url:n,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof o.SillyTavern?.getRequestHeaders=="function"?o.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(a),signal:r})}catch(y){throw y?.name==="AbortError"?y:kn(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${y.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let y=[404,405,501,502].includes(l.status);throw kn(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:y})}let d=null;try{d=c?JSON.parse(c):{}}catch{let p=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw kn(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${p||"(\u7A7A\u54CD\u5E94)"}`)}return Cn(d)}async function hu(t,e,s,r){let o=_i(t,{apiConfig:e,...s}),n=Ti(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(n,{method:"POST",headers:a,body:JSON.stringify(o),signal:r}),l=await i.text().catch(()=>"");if(!i.ok){let d=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${d}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let y=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${y||"(\u7A7A\u54CD\u5E94)"}`)}return Cn(c)}async function vu(t=null){let e=t||Lt(),s=Date.now();try{await gr([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let o=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${o}ms)`,latency:o}}catch(r){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${r.message}`,latency:Date.now()-s}}}async function Rn(t=null){let e=t||Lt();return e.useMainApi?await xu():await wu(e)}async function xu(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function wu(t){if(!t.url||!t.apiKey)return[];try{let e=Ti(t.url,"models"),s=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!s.ok)return[];let r=await s.json();return r.data&&Array.isArray(r.data)?r.data.map(o=>o.id||o.name).filter(Boolean).sort():[]}catch{return[]}}var au,wi,iu,lu,uu,mr=U(()=>{Ke();ce();au=N.createScope("ApiConnection"),wi="settings",iu="api_presets",lu="current_preset";uu={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var Mi={};re(Mi,{createPreset:()=>io,createPresetFromCurrentConfig:()=>ku,deletePreset:()=>hr,duplicatePreset:()=>Eu,exportPresets:()=>Dn,generateUniquePresetName:()=>Bn,getActiveConfig:()=>Ln,getActivePresetName:()=>lo,getAllPresets:()=>Dt,getPreset:()=>gs,getPresetNames:()=>_u,getStarredPresets:()=>On,importPresets:()=>Nn,presetExists:()=>br,renamePreset:()=>Au,switchToPreset:()=>ms,togglePresetStar:()=>Pn,updatePreset:()=>$n,validatePreset:()=>Iu});function Tu(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Ii(){return R.get(Su,Tu())}function He(){return R.get(Ei,[])}function fs(t){R.set(Ei,t)}function ao(){return R.get(ki,"")}function no(t){R.set(ki,t||"")}function Dt(){return He()}function _u(){return He().map(e=>e.name)}function gs(t){return!t||typeof t!="string"?null:He().find(s=>s.name===t)||null}function br(t){return!t||typeof t!="string"?!1:He().some(s=>s.name===t)}function io(t){let{name:e,description:s,apiConfig:r}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let o=e.trim();if(br(o))return{success:!1,message:`\u9884\u8BBE "${o}" \u5DF2\u5B58\u5728`};let n={name:o,description:s||"",apiConfig:{url:r?.url||"",apiKey:r?.apiKey||"",model:r?.model||"",useMainApi:r?.useMainApi??!0,stream:r?.stream??!1,max_tokens:r?.max_tokens||4096,temperature:r?.temperature??.7,top_p:r?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=He();return a.push(n),fs(a),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:n}}function $n(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=He(),r=s.findIndex(a=>a.name===t);if(r===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let o=s[r],n={...o,...e,name:o.name,updatedAt:Date.now()};return e.apiConfig&&(n.apiConfig={...o.apiConfig,...e.apiConfig}),s[r]=n,fs(s),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:n}}function hr(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=He(),s=e.findIndex(r=>r.name===t);return s===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(s,1),fs(e),ao()===t&&no(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function Au(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(!br(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(br(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let r=He(),o=r.find(n=>n.name===t);return o&&(o.name=s,o.updatedAt=Date.now(),fs(r),ao()===t&&no(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function Eu(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim(),r=gs(t);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(br(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(r)),name:s,createdAt:Date.now(),updatedAt:Date.now()},n=He();return n.push(o),fs(n),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:o}}function Pn(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=He(),s=e.find(r=>r.name===t);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),fs(e),{success:!0,message:s.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function On(){return He().filter(e=>e.starred===!0)}function ms(t){if(!t)return no(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=gs(t);return e?(no(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function lo(){return ao()}function Ln(){let t=ao();if(t){let s=gs(t);if(s)return{presetName:t,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:Ii().apiConfig||{}}}function Dn(t=null){if(t){let s=gs(t);if(!s)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let e=He();return JSON.stringify(e,null,2)}function Nn(t,e={overwrite:!1}){let s;try{s=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let r=Array.isArray(s)?s:[s];if(r.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let o=He(),n=0;for(let a of r){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let i=o.findIndex(l=>l.name===a.name);i>=0?e.overwrite&&(a.updatedAt=Date.now(),o[i]=a,n++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),o.push(a),n++)}return n>0&&fs(o),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${n} \u4E2A\u9884\u8BBE`,imported:n}}function ku(t,e=""){let s=Ii();return io({name:t,description:e,apiConfig:s.apiConfig})}function Iu(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function Bn(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=He(),s=new Set(e.map(o=>o.name));if(!s.has(t))return t;let r=1;for(;s.has(`${t} (${r})`);)r++;return`${t} (${r})`}var Su,Ei,ki,vr=U(()=>{Ke();Su="settings",Ei="api_presets",ki="current_preset"});function Et(){return typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function m(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function E(t,e,s=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let r=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(r.toastr){r.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}Cu(t,e,s),Mu.log(`[${t.toUpperCase()}] ${e}`)}function Q(t,e,s={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:r=3500,sticky:o=!1,noticeId:n=""}=s,a=Et();if(!a?.body){E(t,e,r);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",c=a.getElementById(i);if(c||(c=a.createElement("div"),c.id=i,c.style.cssText=`
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
    `,a.body.appendChild(c)),!a.getElementById(l)){let v=a.createElement("style");v.id=l,v.textContent=`
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
    `,a.head.appendChild(v)}if(n){let v=c.querySelector(`[data-notice-id="${n}"]`);v&&v.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},y=a.createElement("div");y.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,n&&(y.dataset.noticeId=n);let p=a.createElement("span");p.className="yyt-top-notice__icon",p.textContent=d[t]||d.info;let u=a.createElement("div");u.className="yyt-top-notice__content",u.textContent=e;let f=a.createElement("button");f.className="yyt-top-notice__close",f.type="button",f.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),f.textContent="\xD7";let h=()=>{y.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>y.remove(),180)};f.addEventListener("click",h),y.appendChild(p),y.appendChild(u),y.appendChild(f),c.appendChild(y),o||setTimeout(h,r)}function Cu(t,e,s){let r=Et();if(!r)return;let o=r.getElementById("yyt-fallback-toast");o&&o.remove();let n={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=n[t]||n.info,i=r.createElement("div");if(i.id="yyt-fallback-toast",i.style.cssText=`
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
    `,r.head.appendChild(l)}r.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},s)}function O(){if(bs)return bs;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return bs=window.parent.jQuery,bs}catch{}return window.jQuery&&(bs=window.jQuery),bs}function Ru(){bs=null}function K(t){if(!t||t.length===0)return!1;let e=t[0];if(!e||e.nodeType!==1)return!1;let s=e.ownerDocument||document;return e.isConnected?s?.documentElement?.contains?s.documentElement.contains(e):!0:!1}function Qt(...t){return t.flat(1/0).flatMap(e=>String(e||"").split(/\s+/)).map(e=>e.trim()).filter(Boolean).join(" ")}function js(t={}){return Object.entries(t).filter(([,e])=>e!=null&&e!==!1).map(([e,s])=>s===!0?e:`${e}="${m(String(s))}"`).join(" ")}function Pi(t=[],e="",s=""){let r=String(e??""),o=t.find(n=>n.value===r)||t.find(n=>n.disabled!==!0)||null;return o||{value:r,label:s||r||"\u8BF7\u9009\u62E9",disabled:!1}}function $u(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(e=>e&&e!=="yyt-select"&&e!=="yyt-native-select-bridge")}function Ci(t,e){let s=O();if(!s||!e?.length)return null;let r=e.attr("id")?`#${e.attr("id")}`:e.attr("data-yyt-select-key")?`[data-yyt-select-key="${e.attr("data-yyt-select-key")}"]`:"";if(!r)return null;let n=t.find("[data-yyt-custom-select]").filter((a,i)=>String(s(i).attr("data-yyt-select-target")||"")===r);return n.length?n.first():null}function Oi(t){let e=t?.[0];return e?.ownerDocument?e.ownerDocument:typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function Pu(t){if(!O()||!K(t))return null;let s=t.find("[data-yyt-custom-select]");return s.length?s:null}function Li(t,e){if(!O()||!e?.length)return null;let r=e.find("[data-yyt-select-native]").first();if(r.length)return r;let o=String(e.attr("data-yyt-select-target")||"").trim();if(!o)return null;let n=t.find(o).first();return n.length?n:null}function Di(t=null){return t?.jquery&&t[0]?.ownerDocument?t[0].ownerDocument:t?.ownerDocument?t.ownerDocument:t?.nodeType===9?t:Et()}function kt(t=null){let e=Di(t),s=Ri.get(e);return s||(s={targetDoc:e,layer:null,activeRoot:null,activeDropdown:null,placeholder:null,cleanup:null},Ri.set(e,s)),s}function Ou(t=null){let e=Di(t);if(!e?.body)return null;let s=kt(e);if(s.layer&&s.layer.isConnected)return s.layer;let r=e.getElementById($i);return r||(r=e.createElement("div"),r.id=$i,r.className="yyt-select-portal-layer",e.body.appendChild(r)),s.layer=r,r}function co(t){if(!O()||!t?.length)return null;let s=t.find("[data-yyt-select-trigger]").first();return s.length?s:t.find(".yyt-select-trigger").first()}function Ni(t){let e=O();if(!e||!t?.length)return null;let s=kt(t);if(s.activeRoot===t[0]&&s.activeDropdown)return e(s.activeDropdown);let r=t.find("[data-yyt-select-dropdown]").first();return r.length?r:t.find(".yyt-select-dropdown").first()}function Lu(t){t&&(t.classList.remove("yyt-floating-open"),t.removeAttribute("data-yyt-floating"),t.removeAttribute("data-yyt-floating-placement"),t.style.position="",t.style.top="",t.style.left="",t.style.right="",t.style.width="",t.style.minWidth="",t.style.maxWidth="",t.style.maxHeight="",t.style.visibility="",t.style.zIndex="")}function Bi(t,e=null){if(!t)return!1;let s=kt(e||t);return s.activeRoot?.contains?.(t)||s.activeDropdown?.contains?.(t)?!0:!!t.closest?.("[data-yyt-custom-select], .yyt-select-portal-layer")}function Du(t){if(!t?.targetDoc||typeof t.cleanup=="function")return;let e=t.targetDoc,s=e.defaultView||window,r=i=>{!t.activeRoot||!t.activeDropdown||Bi(i.target,e)||Qe(e)},o=i=>{if(i.key!=="Escape")return;let l=t.activeRoot;Qe(e);let c=O();c&&l&&co(c(l))?.trigger("focus")},n=()=>{jn(e)},a=()=>{jn(e)};e.addEventListener("mousedown",r,!0),e.addEventListener("keydown",o,!0),s.addEventListener("resize",n),e.addEventListener("scroll",a,!0),t.cleanup=()=>{e.removeEventListener("mousedown",r,!0),e.removeEventListener("keydown",o,!0),s.removeEventListener("resize",n),e.removeEventListener("scroll",a,!0)}}function Nu(t){typeof t?.cleanup=="function"&&t.cleanup(),t&&(t.cleanup=null)}function Un(t){let e=O();if(!e||!t?.activeRoot||!t?.activeDropdown)return;let s=t.targetDoc;if(!s?.body?.contains?.(t.activeRoot)){Qe(s);return}let r=e(t.activeRoot),o=co(r),n=t.activeDropdown,a=s?.defaultView||window;if(!o?.length||!n?.isConnected||!r[0]?.isConnected){Qe(s);return}let i=o[0].getBoundingClientRect(),l=a.innerWidth||s.documentElement?.clientWidth||0,c=a.innerHeight||s.documentElement?.clientHeight||0,d=12,y=8,p=Math.max(0,c-i.bottom-d-y),u=Math.max(0,i.top-d-y),f=p<220&&u>p,v=Math.max(120,Math.floor((f?u:p)||0));n.setAttribute("data-yyt-floating","true"),n.setAttribute("data-yyt-floating-placement",f?"top":"bottom"),n.classList.add("yyt-floating-open");let w=Math.ceil(i.width),S=Math.max(w,Math.floor(l-d*2)),_=n.style.width,W=n.style.minWidth,C=n.style.maxWidth,T=n.style.visibility;n.style.width="max-content",n.style.minWidth=`${w}px`,n.style.maxWidth=`${S}px`,n.style.visibility="hidden";let M=Math.ceil(n.scrollWidth||n.getBoundingClientRect().width||w),j=Math.max(w,Math.min(S,M)),z=Math.min(n.scrollHeight||v,v);n.style.width=_,n.style.minWidth=W,n.style.maxWidth=C,n.style.visibility=T;let $=Math.round(i.left);$+j>l-d&&($=Math.max(d,Math.round(l-d-j))),$=Math.max(d,$);let q=Math.round(f?i.top-y-z:i.bottom+y);q=Math.max(d,Math.min(q,Math.round(c-d-z))),n.style.position="fixed",n.style.top=`${q}px`,n.style.left=`${$}px`,n.style.right="auto",n.style.width=`${j}px`,n.style.minWidth=`${w}px`,n.style.maxWidth=`${S}px`,n.style.maxHeight=`${Math.floor(v)}px`,n.style.visibility="",n.style.zIndex="10050"}function Qe(t=null){let e=O(),s=kt(t);if(!e||!s?.activeRoot)return;let r=s.activeRoot,o=s.activeDropdown,n=s.placeholder,a=e(r),i=co(a);o&&(Lu(o),n?.parentNode?n.parentNode.insertBefore(o,n):r?.isConnected?r.appendChild(o):o.remove()),n?.parentNode?.removeChild(n),a.removeClass("yyt-open"),i?.attr("aria-expanded","false"),s.activeRoot=null,s.activeDropdown=null,s.placeholder=null,Nu(s)}function jn(t=null){let e=kt(t);!e?.activeRoot||!e?.activeDropdown||Un(e)}function zi(t){if(!O()||!t?.length)return;let s=t.first(),r=co(s),o=Ni(s);if(!r?.length||!o?.length||r.prop("disabled"))return;let n=kt(s);if(n.activeRoot===s[0]){Un(n);return}Qe(s);let a=Ou(s);if(!a)return;let i=o[0],l=n.targetDoc.createComment("yyt-select-dropdown-placeholder");i.parentNode?.insertBefore(l,i),a.appendChild(i),n.activeRoot=s[0],n.activeDropdown=i,n.placeholder=l,s.addClass("yyt-open"),r.attr("aria-expanded","true"),Du(n),Un(n)}function Bu(t,e){let s=O();if(!s||!e?.length)return null;let r=e.closest("[data-yyt-custom-select]");if(r.length)return r.first();let o=kt(e);if(o.activeRoot&&o.activeDropdown?.contains?.(e[0])){let n=s(o.activeRoot);return t.has(o.activeRoot).length?n:null}return null}function xr(t){let e=kt(t);t?.length&&e.activeRoot&&e.activeRoot!==t[0]||Qe(t)}function yo(t){let e=kt(t);if(t?.length&&e.activeRoot===t[0]){Qe(t);return}zi(t)}function zn(t,e,s=null){let r=O();if(!r||!e?.length)return;let o=s||Li(t,e);if(!o?.length)return;let n=Array.isArray(o.data("yytCustomSelectOptions"))?o.data("yytCustomSelectOptions"):[],a=Pi(n,o.val(),e.attr("data-yyt-select-placeholder")||""),i=String(a.value??""),l=String(a.label??""),c=o.is(":disabled");e.find(".yyt-select-value").text(l).attr("data-value",i).data("value",i);let d=Ni(e);(d?.length?d.find("[data-yyt-select-option]"):e.find("[data-yyt-select-option]")).each((u,f)=>{let h=r(f),v=String(h.attr("data-value")||"")===i;h.toggleClass("yyt-selected",v).attr("aria-selected",String(v))});let p=e.find("[data-yyt-select-trigger]").first();p.prop("disabled",c),c&&(xr(e),e.removeClass("yyt-open"),p.attr("aria-expanded","false"))}function uo(t=[]){return Array.isArray(t)?t.map(e=>{if(e&&typeof e=="object"&&!Array.isArray(e)){let r=String(e.value??""),o=String(e.label??e.text??e.name??r);return{value:r,label:o,disabled:e.disabled===!0}}let s=String(e??"");return{value:s,label:s,disabled:!1}}):[]}function po(t={}){let{selectedValue:e="",options:s=[],placeholder:r="\u8BF7\u9009\u62E9",disabled:o=!1,includeNative:n=!0,nativeTag:a="input",nativeType:i="hidden",rootAttributes:l={},nativeAttributes:c={},triggerAttributes:d={},dropdownAttributes:y={},optionAttributes:p={},optionClass:u="",optionTextClass:f=""}=t,h=uo(s),v=Pi(h,e,r),w=o===!0||h.length===0,S=js({...l,class:Qt("yyt-custom-select",l.class),"data-yyt-custom-select":l["data-yyt-custom-select"]??"true","data-yyt-select-placeholder":r}),_=js({type:"button",...d,class:Qt("yyt-select-trigger",d.class),"data-yyt-select-trigger":d["data-yyt-select-trigger"]??"true","aria-haspopup":d["aria-haspopup"]??"listbox","aria-expanded":d["aria-expanded"]??"false",disabled:w?!0:d.disabled}),W=js({...y,class:Qt("yyt-select-dropdown",y.class),"data-yyt-select-dropdown":y["data-yyt-select-dropdown"]??"true",role:y.role??"listbox"}),C=n?(()=>{let T={...c,class:Qt(c.class),"data-yyt-select-native":c["data-yyt-select-native"]??"true",disabled:w?!0:c.disabled};return a==="select"?`<select ${js(T)}>${h.map(z=>`
            <option value="${m(z.value)}" ${z.value===String(v.value??"")?"selected":""} ${z.disabled?"disabled":""}>${m(z.label)}</option>
          `).join("")}</select>`:`<input ${js({type:i,value:v.value,...T})}>`})():"";return`
    <div ${S}>
      ${C}
      <button ${_}>
        <span class="${m(Qt("yyt-select-value"))}" data-value="${m(v.value)}">${m(v.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${W}>
        ${h.map(T=>{let M=T.value===String(v.value??"");return`
            <button ${js({type:"button",...p,class:Qt("yyt-select-option",u,p.class,M?"yyt-selected":""),"data-yyt-select-option":p["data-yyt-select-option"]??"true","data-value":T.value,role:p.role??"option","aria-selected":M?"true":"false",disabled:T.disabled?!0:p.disabled})}>
              <span class="${m(Qt("yyt-option-text",f))}">${m(T.label)}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function Ie(t,e="yytCustomSelect"){let s=O();if(!s||!K(t))return;let r=Oi(t),o=kt(r);o.activeRoot&&t.has(o.activeRoot).length&&Qe(r),t.off(`.${e}`),s(r).off(`click.${e}`),s(r).off(`mousedown.${e}`),t.find('[data-yyt-enhanced-select="true"]').remove(),t.find(".yyt-native-select-bridge").each((n,a)=>{let i=s(a),l=i.attr("data-yyt-original-style");l!==void 0&&l?i.attr("style",l):i.removeAttr("style"),i.removeClass("yyt-native-select-bridge").removeAttr("data-yyt-original-style").removeAttr("data-yyt-select-key").removeData("yytCustomSelectOptions")})}function Ne(t,e={}){let s=O();if(!s||!K(t))return;let{namespace:r="yytCustomSelect",selectors:o=[]}=e,n=Array.isArray(o)?o.filter(Boolean):[o].filter(Boolean);if(n.length===0)return;Ie(t,r);let a=n.join(", "),i=Oi(t);t.find(a).each((l,c)=>{let d=s(c),y=String(d.attr("id")||"").trim(),p=y||`yyt-select-${Date.now()}-${l}`,u=y?`#${y}`:`[data-yyt-select-key="${p}"]`,f=`${p}-dropdown`,h=$u(d.attr("class")),v=d.attr("style"),w=d.find("option").map((W,C)=>{let T=s(C);return{value:String(T.attr("value")??T.val()??""),label:T.text(),disabled:T.is(":disabled")}}).get();d.attr("data-yyt-original-style",v??"").attr("data-yyt-select-key",p).addClass("yyt-native-select-bridge").css("display","none").data("yytCustomSelectOptions",w);let S=po({includeNative:!1,selectedValue:d.val(),options:w,disabled:d.is(":disabled"),placeholder:w[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{class:Qt(h),style:v||void 0,"data-yyt-enhanced-select":"true","data-yyt-select-target":u},triggerAttributes:{id:`${p}-trigger`,"aria-controls":f},dropdownAttributes:{id:f}});d.after(S);let _=Ci(t,d);zn(t,_,d)}),t.on(`click.${r}`,"[data-yyt-select-trigger]",l=>{l.preventDefault(),l.stopPropagation();let c=s(l.currentTarget);if(c.prop("disabled"))return;let d=c.closest("[data-yyt-custom-select]");yo(d)}),t.on(`change.${r}`,a,l=>{let c=s(l.currentTarget),d=c.find("option").map((p,u)=>{let f=s(u);return{value:String(f.attr("value")??f.val()??""),label:f.text(),disabled:f.is(":disabled")}}).get();c.data("yytCustomSelectOptions",d);let y=Ci(t,c);zn(t,y,c)}),s(i).off(`click.${r}`).on(`click.${r}`,l=>{if(Bi(l.target,i))return;let c=Pu(t);c?.length&&(Qe(i),c.filter(".yyt-open").removeClass("yyt-open").find("[data-yyt-select-trigger]").attr("aria-expanded","false"))}),s(i).off(`mousedown.${r}`,".yyt-select-portal-layer [data-yyt-select-option]").on(`mousedown.${r}`,".yyt-select-portal-layer [data-yyt-select-option]",l=>{l.preventDefault(),l.stopPropagation();let c=s(l.currentTarget);if(c.prop("disabled"))return;let d=Bu(t,c);if(!d?.length)return;let y=Li(t,d);if(!y?.length)return;let p=String(c.attr("data-value")||"");y.val(p).trigger("change"),zn(t,d,y),xr(d)})}function wr(t,e=b){if(!O()||!K(t))return{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9};let r=t.find(`#${e}-model`).val()?.trim()||"",o=t.find(`#${e}-model-select`);return o.is(":visible")&&(r=o.val()||r),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:r,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),stream:t.find(`#${e}-stream`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function fo(t,e,s=b){if(!O()||!K(t)||!e)return;t.find(`#${s}-api-url`).val(e.url||""),t.find(`#${s}-api-key`).val(e.apiKey||""),t.find(`#${s}-model`).val(e.model||""),t.find(`#${s}-stream`).prop("checked",e.stream===!0),t.find(`#${s}-max-tokens`).val(e.max_tokens||4096),t.find(`#${s}-temperature`).val(e.temperature??.7),t.find(`#${s}-top-p`).val(e.top_p??.9);let o=e.useMainApi??!0;t.find(`#${s}-use-main-api`).prop("checked",o);let a=t.find(`#${s}-custom-api-fields`);o?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${s}-model`).show(),t.find(`#${s}-model-select`).hide()}function Zt(t){let{id:e,title:s,body:r,width:o="380px",wide:n=!1,dialogClass:a="",bodyClass:i="",footerClass:l=""}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${n?"yyt-dialog-wide":""} ${a}" style="${o!=="380px"?`width: ${o};`:""} max-height: calc(100vh - 32px);">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${s}</span>
          <button class="yyt-dialog-close" id="${e}-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body ${i}" style="overflow-y: auto; overflow-x: hidden; max-height: calc(100vh - 160px);">
          ${r}
        </div>
        <div class="yyt-dialog-footer ${l}">
          <button class="yyt-btn yyt-btn-secondary" id="${e}-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${e}-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `}function es(t,e,s={}){if(!O())return()=>{};let o=t.find(`#${e}-overlay`),n=()=>{o.remove(),a?.removeEventListener("keydown",i),s.onClose&&s.onClose()};o.find(`#${e}-close, #${e}-cancel`).on("click",n),o.on("click",function(l){l.target===this&&n()}),o.find(`#${e}-save`).on("click",function(){s.onSave&&s.onSave(n)});let a=o[0]?.ownerDocument||document,i=l=>{l.key==="Escape"&&(l.stopPropagation(),n())};return a.addEventListener("keydown",i),n}function he(t,e,s={}){let{confirmText:r="\u786E\u5B9A",cancelText:o="\u53D6\u6D88",danger:n=!1,width:a="380px"}=s,i=O(),l=Et();if(!i||!l?.body)return Promise.resolve(!1);let c=`yyt-confirm-${++Ui}`;return new Promise(d=>{let y=!1,p=v=>{y||(y=!0,h.remove(),u?.focus(),d(v))},u=l.activeElement,f=`
      <div class="yyt-dialog-overlay" id="${c}-overlay">
        <div class="yyt-dialog" style="${a!=="380px"?`width: ${a};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${m(t)}</span>
            <button class="yyt-dialog-close" id="${c}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${m(e)}</div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${c}-cancel">${m(o)}</button>
            <button class="yyt-btn ${n?"yyt-btn-danger":"yyt-btn-primary"}" id="${c}-confirm">${m(r)}</button>
          </div>
        </div>
      </div>`,h=i(f).appendTo(l.body);h.find(`#${c}-confirm`).on("click",()=>p(!0)),h.find(`#${c}-cancel, #${c}-close`).on("click",()=>p(!1)),h.on("click",function(v){v.target===this&&p(!1)}),h.on("keydown",v=>{v.key==="Escape"&&(v.stopPropagation(),p(!1)),v.key==="Enter"&&(v.stopPropagation(),p(!0))}),h.find(`#${c}-${n?"cancel":"confirm"}`).trigger("focus")})}function Wn(t,e,s={}){let{defaultValue:r="",placeholder:o="",confirmText:n="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",width:i="380px"}=s,l=O(),c=Et();if(!l||!c?.body)return Promise.resolve(null);let d=`yyt-prompt-${++Ui}`;return new Promise(y=>{let p=!1,u=_=>{p||(p=!0,v.remove(),f?.focus(),y(_))},f=c.activeElement,h=`
      <div class="yyt-dialog-overlay" id="${d}-overlay">
        <div class="yyt-dialog" style="${i!=="380px"?`width: ${i};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${m(t)}</span>
            <button class="yyt-dialog-close" id="${d}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            ${e?`<div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${m(e)}</div>`:""}
            <input class="yyt-input" id="${d}-input" type="text" value="${m(r)}" placeholder="${m(o)}" />
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${d}-cancel">${m(a)}</button>
            <button class="yyt-btn yyt-btn-primary" id="${d}-confirm">${m(n)}</button>
          </div>
        </div>
      </div>`,v=l(h).appendTo(c.body),w=v.find(`#${d}-input`),S=()=>{let _=w.val().trim();u(_||null)};v.find(`#${d}-confirm`).on("click",S),v.find(`#${d}-cancel, #${d}-close`).on("click",()=>u(null)),v.on("click",function(_){_.target===this&&u(null)}),w.on("keydown",_=>{_.key==="Enter"&&(_.stopPropagation(),S())}),v.on("keydown",_=>{_.key==="Escape"&&(_.stopPropagation(),u(null))}),w.trigger("focus").trigger("select")})}function zu(t,e,s){if(t.prop("disabled")&&t.data("yytLoading"))return Promise.resolve();let r=t.html(),o=t.outerWidth();if(t.prop("disabled",!0).data("yytLoading",!0),t.css("min-width",o+"px"),s)t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${m(s)}`);else{let n=t.find("i.fa-solid, i.fa-regular").first();n.length?(n.data("yytOriginalClass",n.attr("class")),n.attr("class","fa-solid fa-spinner fa-spin")):t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${r}`)}return Promise.resolve().then(()=>e()).finally(()=>{if(s)t.html(r);else{let n=t.find("i.fa-spinner"),a=n.data("yytOriginalClass");a?n.attr("class",a).removeData("yytOriginalClass"):t.html(r)}t.prop("disabled",!1).removeData("yytLoading").css("min-width","")})}function nt(t,e){let s=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(s),o=document.createElement("a");o.href=r,o.download=e,o.click(),URL.revokeObjectURL(r)}function mt(t){return new Promise((e,s)=>{let r=new FileReader;r.onload=o=>e(o.target.result),r.onerror=o=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),r.readAsText(t)})}var Mu,b,Ws,bs,Ri,$i,Ui,Ce=U(()=>{ce();Mu=N.createScope("UIUtils"),b="youyou_toolkit",Ws=class{constructor(e={}){this._state={...e}}get(e){return this._state[e]}set(e,s){return this._state[e]=s,this}reset(e={}){return this._state={...e},this}toJSON(){return{...this._state}}};bs=null;Ri=new WeakMap,$i="yyt-select-portal-layer";Ui=0});var Fs,Sr,bt,Fn=U(()=>{ke();Ce();ce();Fs=N.createScope("UIManager"),Sr=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,L.emit(P.UI_INITIALIZED),Fs.log("\u521D\u59CB\u5316\u5B8C\u6210"))}register(e,s){return!e||!s?(Fs.warn("\u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,s,r={}){let o=O();if(!o){Fs.error("jQuery\u4E0D\u53EF\u7528");return}let n=this.components.get(e);if(!n){Fs.error(`\u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);let i;typeof s=="string"?i=o(s):s&&s.jquery?i=s:s&&(i=o(s)),i?.length&&i.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u672A\u6CE8\u518C\uFF1A${e}</span></div>`);return}let a;if(typeof s=="string"?a=o(s):s&&s.jquery?a=s:s&&(a=o(s)),!K(a)){Fs.warn("\u5BB9\u5668\u4E0D\u5B58\u5728");return}this.activeInstances.forEach((i,l)=>{i?.container?.length&&a.length&&i.container[0]===a[0]&&l!==e&&this.destroyInstance(l)}),this.destroyInstance(e);try{if(typeof n.renderTo=="function")n.renderTo(a,{...r,dependencies:this.dependencies});else{let i=n.render({...r,dependencies:this.dependencies});a.html(i),n.bindEvents(a,this.dependencies)}}catch(i){Fs.error(`\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25: ${e}`,i),a.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25\uFF1A${e}${i?.message?` - ${i.message}`:""}</span></div>`);return}this.activeInstances.set(e,{container:a,component:n,props:r}),L.emit(P.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let s=this.activeInstances.get(e);s&&(s.component.destroy(s.container),this.activeInstances.delete(e))}destroyContainerInstance(e){let s=O();if(!s||!e)return;let r;if(typeof e=="string"?r=s(e):e?.jquery?r=e:r=s(e),!r?.length)return;let o=[];this.activeInstances.forEach((n,a)=>{n?.container?.length&&n.container[0]===r[0]&&o.push(a)}),o.forEach(n=>this.destroyInstance(n))}switchTab(e){let s=this.currentTab;this.currentTab=e,L.emit(P.UI_TAB_CHANGED,{tabId:e,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(e,s){this.currentSubTab[e]=s,L.emit(P.UI_SUBTAB_CHANGED,{mainTab:e,subTab:s})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((s,r)=>{s.getStyles&&(e+=s.getStyles())}),e}injectStyles(e=document){let s="yyt-component-styles";if(e.getElementById(s))return;let r=e.createElement("style");r.id=s,r.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(r)}setDependency(e,s){this.dependencies[e]=s}getDependency(e){return this.dependencies[e]}_subscribeEvents(){L.on(P.PRESET_UPDATED,()=>{}),L.on(P.TOOL_UPDATED,()=>{})}},bt=new Sr});var Fi={};re(Fi,{ApiPresetPanel:()=>Wi,default:()=>Uu});function at(t){return String(t||"").trim()}var ji,Wi,Uu,Ki=U(()=>{ke();Ce();mr();vr();ji={selectedPresetName:null},Wi={id:"apiPresetPanel",_getState(t){if(!t?.length)return new Ws(ji);let e=t.data("yytPanelState");return e||(e=new Ws(ji),t.data("yytPanelState",e)),e},_getSelectedPresetName(t){return this._getState(t).get("selectedPresetName")},_setSelectedPresetName(t,e){this._getState(t).set("selectedPresetName",e===null?null:at(e))},_rerender(t){K(t)&&(Qe(t),this.renderTo(t))},_removeDialog(t){t?.length&&t.find(`#${b}-dialog-overlay`).remove()},render(t={}){let e=Ln(),s=e?.apiConfig||Lt(),r=at(e?.presetName||lo()),o=Dt(),n=On(),a=t.selectedPresetName??null,l=n.slice(0,8),c=l.length>0?l.map(p=>this._renderPresetItem(p)).join(""):"",d=a===null?r||"":at(a),y=d||"-- \u5F53\u524D\u914D\u7F6E --";return`
      <div class="yyt-api-manager">
          <!-- \u9884\u8BBE\u9009\u62E9\u533A -->
          <div class="yyt-flow-section">
            <div class="yyt-flow-heading">
              <span class="yyt-flow-heading-icon"><i class="fa-solid fa-bookmark"></i></span>
              <span>\u9884\u8BBE\u9009\u62E9</span>
            </div>
            
            <div class="yyt-preset-selector">
              <!-- \u81EA\u5B9A\u4E49\u4E0B\u62C9\u6846 -->
              <div class="yyt-custom-select" id="${b}-preset-dropdown">
                <div class="yyt-select-trigger">
                  <span class="yyt-select-value" data-value="${m(d)}">${m(y)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${d?"":"yyt-selected"}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                    <span class="yyt-option-delete yyt-placeholder"></span>
                  </div>
                  ${o.length>0?o.map(p=>this._renderSelectOption(p,d)).join(""):""}
                </div>
              </div>
              <button class="yyt-btn yyt-btn-secondary" id="${b}-load-preset" title="\u52A0\u8F7D\u9009\u4E2D\u9884\u8BBE">
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
          <div class="yyt-flow-section">
            <div class="yyt-flow-heading">
              <span class="yyt-flow-heading-icon"><i class="fa-solid fa-sliders"></i></span>
              <span>API\u914D\u7F6E</span>
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${b}-save-as-preset" style="margin-left: auto;">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
              </button>
            </div>
            
            ${this._renderApiConfigForm(s)}
          </div>
          
          <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
          <div class="yyt-panel-footer">
            <div class="yyt-footer-left">
              <button class="yyt-btn yyt-btn-secondary" id="${b}-import-presets">
                <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
              </button>
              <button class="yyt-btn yyt-btn-secondary" id="${b}-export-presets">
                <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
              </button>
              <input type="file" id="${b}-import-file" accept=".json" style="display:none">
            </div>
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-secondary" id="${b}-reset-api-config">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
              </button>
              <button class="yyt-btn yyt-btn-primary" id="${b}-save-api-config">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>
      </div>
    `},_renderPresetItem(t){return`
      <div class="yyt-preset-item" data-preset-name="${m(t.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${m(t.name)}</div>
          <div class="yyt-preset-meta">
            ${t.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${m(t.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
      <div class="yyt-select-option ${t.name===e?"yyt-selected":""}" data-value="${m(t.name)}">
        <button class="${r}" data-preset="${m(t.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${o}</button>
        <span class="yyt-option-text">${m(t.name)}</span>
        <button class="yyt-option-delete" data-action="delete" data-preset="${m(t.name)}" title="\u5220\u9664\u9884\u8BBE">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `},_renderApiConfigForm(t){return`
      <div class="yyt-form-group">
        <div class="yyt-toggle-row">
          <div class="yyt-toggle-label">
            <span>\u4F7F\u7528SillyTavern\u4E3BAPI</span>
            <span class="yyt-toggle-hint">\u542F\u7528\u540E\u5C06\u4F7F\u7528SillyTavern\u5185\u7F6E\u7684API\u914D\u7F6E</span>
          </div>
          <label class="yyt-toggle">
            <input type="checkbox" id="${b}-use-main-api" ${t.useMainApi?"checked":""}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>

      <div class="yyt-form-group">
        <div class="yyt-toggle-row">
          <div class="yyt-toggle-label">
            <span>\u6D41\u5F0F\u54CD\u5E94</span>
            <span class="yyt-toggle-hint">\u542F\u7528\u540E\u6309\u6D41\u5F0F\u65B9\u5F0F\u8BF7\u6C42\u6A21\u578B\uFF1B\u5173\u95ED\u5219\u7B49\u5F85\u5B8C\u6574\u7ED3\u679C\u540E\u4E00\u6B21\u6027\u8FD4\u56DE</span>
          </div>
          <label class="yyt-toggle">
            <input type="checkbox" id="${b}-stream" ${t.stream===!0?"checked":""}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>

      <div id="${b}-custom-api-fields" class="${t.useMainApi?"yyt-disabled":""}">
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API URL</label>
            <input type="text" class="yyt-input" id="${b}-api-url" 
                   value="${m(t.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${b}-api-key" 
                     value="${m(t.apiKey||"")}" 
                     placeholder="sk-...">
              <button class="yyt-btn yyt-btn-icon" id="${b}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>\u6A21\u578B</label>
            <div class="yyt-model-row">
              <input type="text" class="yyt-input yyt-model-input" id="${b}-model" 
                     value="${m(t.model||"")}" 
                     placeholder="gpt-4">
              <select class="yyt-select yyt-model-select" id="${b}-model-select" style="display: none;">
              </select>
              <button class="yyt-btn yyt-btn-secondary yyt-model-btn" id="${b}-load-models" title="\u83B7\u53D6\u6A21\u578B\u5217\u8868">
                <i class="fa-solid fa-sync-alt"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row yyt-form-row-2col">
          <div class="yyt-form-group">
            <label>Max Tokens</label>
            <input type="number" class="yyt-input" id="${b}-max-tokens" 
                   value="${t.max_tokens||4096}" min="1" max="128000">
          </div>
          
          <div class="yyt-form-group">
            <label>Temperature</label>
            <input type="number" class="yyt-input" id="${b}-temperature" 
                   value="${t.temperature??.7}" min="0" max="2" step="0.1">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>Top P</label>
            <input type="number" class="yyt-input" id="${b}-top-p" 
                   value="${t.top_p??.9}" min="0" max="1" step="0.1">
          </div>
        </div>
      </div>
    `},bindEvents(t,e){let s=O();!s||!K(t)||(this._bindDropdownEvents(t,s),this._bindPresetListEvents(t,s),this._bindApiConfigEvents(t,s),this._bindFileEvents(t,s))},_bindDropdownEvents(t,e){let s=t.find(`#${b}-preset-dropdown`),r=s.find(".yyt-select-trigger"),o=s.find(".yyt-select-value"),n=()=>{let a=at(o.data("value"));if(!a){this._setSelectedPresetName(t,""),ms(""),fo(t,Lt(),b),t.find(".yyt-preset-item").removeClass("yyt-loaded"),s.find(".yyt-select-option").removeClass("yyt-selected"),s.find('.yyt-select-option[data-value=""]').addClass("yyt-selected"),E("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let i=gs(a);if(!i){E("error",`\u9884\u8BBE "${a}" \u4E0D\u5B58\u5728`);return}this._setSelectedPresetName(t,a),ms(a),fo(t,i.apiConfig,b),t.find(".yyt-preset-item").removeClass("yyt-loaded"),t.find(`.yyt-preset-item[data-preset-name="${a.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),s.find(".yyt-select-option").removeClass("yyt-selected"),s.find(`.yyt-select-option[data-value="${a.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected")};r.on("click.yytApiPreset",a=>{a.preventDefault(),a.stopPropagation(),yo(s)}),s.find(".yyt-select-option").on("click.yytApiPreset",a=>{if(e(a.target).closest(".yyt-option-star, .yyt-option-delete").length)return;let i=e(a.currentTarget),l=at(i.data("value")),c=i.find(".yyt-option-text").text(),d=i.closest(".yyt-select-dropdown").find(".yyt-select-option");this._setSelectedPresetName(t,l),o.text(c).data("value",l),d.removeClass("yyt-selected"),i.addClass("yyt-selected"),xr(s)}),t.find(`#${b}-load-preset`).on("click",()=>{n()}),s.find(".yyt-option-star").on("click.yytApiPreset",a=>{a.preventDefault(),a.stopPropagation();let i=at(e(a.currentTarget).data("preset"));if(!i)return;let l=Pn(i);l.success?(E("success",l.message),this._rerender(t)):E("error",l.message)}),s.find(".yyt-option-delete").on("click.yytApiPreset",async a=>{a.preventDefault(),a.stopPropagation();let i=at(e(a.currentTarget).data("preset"));if(!i||!await he("\u5220\u9664\u9884\u8BBE",`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${i}" \u5417\uFF1F`,{danger:!0}))return;let l=hr(i);E(l.success?"info":"error",l.message),l.success&&(L.emit(P.PRESET_DELETED,{name:i}),at(this._getSelectedPresetName(t))===i&&this._setSelectedPresetName(t,""),at(o.data("value"))===i&&o.text("-- \u5F53\u524D\u914D\u7F6E --").data("value",""),this._rerender(t))})},_bindPresetListEvents(t,e){t.find(".yyt-preset-item").on("click.yytApiPreset",async s=>{let r=e(s.currentTarget),o=at(r.data("preset-name")),n=e(s.target).closest("[data-action]").data("action");if(n)switch(s.stopPropagation(),n){case"load":this._setSelectedPresetName(t,o),t.find(".yyt-select-value").text(o).data("value",o),t.find(".yyt-select-option").removeClass("yyt-selected"),t.find(`.yyt-select-option[data-value="${o.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),t.find(`#${b}-load-preset`).trigger("click");break;case"delete":if(await he("\u5220\u9664\u9884\u8BBE",`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${o}" \u5417\uFF1F`,{danger:!0})){let a=hr(o);E(a.success?"info":"error",a.message),a.success&&(L.emit(P.PRESET_DELETED,{name:o}),at(this._getSelectedPresetName(t))===o&&this._setSelectedPresetName(t,""),this._rerender(t))}break}})},_bindApiConfigEvents(t,e){t.find(`#${b}-use-main-api`).on("change.yytApiPreset",function(){let s=e(this).is(":checked"),r=t.find(`#${b}-custom-api-fields`);s?r.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):r.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),t.find(`#${b}-toggle-key-visibility`).on("click",function(){let s=t.find(`#${b}-api-key`),r=s.attr("type");s.attr("type",r==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),t.find(`#${b}-load-models`).on("click",async()=>{let s=t.find(`#${b}-load-models`),r=t.find(`#${b}-model`),o=t.find(`#${b}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let n=wr(t,b),a=await Rn(n);if(a.length>0){o.empty(),a.forEach(l=>{o.append(`<option value="${m(l)}">${m(l)}</option>`)}),r.hide(),o.show();let i=r.val();i&&a.includes(i)&&o.val(i),o.off("change.yytApiPreset").on("change.yytApiPreset",function(){r.val(e(this).val())}),E("success",`\u5DF2\u52A0\u8F7D ${a.length} \u4E2A\u6A21\u578B`)}else E("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(n){E("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${n.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${b}-model`).on("focus.yytApiPreset",function(){let s=t.find(`#${b}-model-select`);e(this).show(),s.hide()}),t.find(`#${b}-save-api-config`).on("click",async()=>{let s=wr(t,b),r=at(lo()),o=Us(s);if(!o.valid&&!s.useMainApi){E("error",o.errors.join(", "));return}if(r){if(!await he("\u8986\u76D6\u9884\u8BBE",`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${r}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230"\u5F53\u524D\u914D\u7F6E"`)){zs(s),ms(""),this._setSelectedPresetName(t,""),E("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"),this._rerender(t);return}zs(s);let n=$n(r,{apiConfig:s});n.success?(this._setSelectedPresetName(t,r),E("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${r}"`),ms(r),L.emit(P.PRESET_UPDATED,{name:r}),this._rerender(t)):E("error",n.message);return}zs(s),E("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),t.find(`#${b}-reset-api-config`).on("click",async()=>{await he("\u91CD\u7F6E\u914D\u7F6E","\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F",{danger:!0})&&(ms(""),this._setSelectedPresetName(t,""),zs({url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9}),this._rerender(t),E("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E"))}),t.find(`#${b}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(t,e)})},_bindFileEvents(t,e){t.find(`#${b}-export-presets`).on("click",()=>{try{let s=Dn();nt(s,`youyou_toolkit_presets_${Date.now()}.json`),E("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){E("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${b}-import-presets`).on("click",()=>{t.find(`#${b}-import-file`).click()}),t.find(`#${b}-import-file`).on("change",async s=>{let r=s.target.files[0];if(r){try{let o=await mt(r),n=Nn(o,{overwrite:!0});E(n.success?"success":"error",n.message),n.imported>0&&this._rerender(t)}catch(o){E("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}})},_showSavePresetDialog(t,e){let r=Dt().map(d=>d.name),o=Bn("\u65B0\u9884\u8BBE"),n=`
      <div class="yyt-dialog-overlay" id="${b}-dialog-overlay">
        <div class="yyt-dialog">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">\u4FDD\u5B58\u4E3A\u65B0\u9884\u8BBE</span>
            <button class="yyt-dialog-close" id="${b}-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-group">
              <label>\u9884\u8BBE\u540D\u79F0</label>
              <input type="text" class="yyt-input" id="${b}-dialog-preset-name"
                     value="${m(o)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09</label>
              <textarea class="yyt-textarea" id="${b}-dialog-preset-desc" rows="2"
                        placeholder="\u9884\u8BBE\u63CF\u8FF0..."></textarea>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${b}-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="${b}-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;this._removeDialog(t),t.append(n);let a=t.find(`#${b}-dialog-overlay`),i=a.find(`#${b}-dialog-preset-name`),l=a.find(`#${b}-dialog-preset-desc`);i.focus().select();let c=()=>a.remove();a.find(`#${b}-dialog-close, #${b}-dialog-cancel`).on("click",c),a.on("click",function(d){d.target===this&&c()}),a.find(`#${b}-dialog-save`).on("click",async()=>{let d=i.val().trim(),y=l.val().trim();if(!d){E("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),i.focus();return}if(r.includes(d)){if(!await he("\u8986\u76D6\u9884\u8BBE",`\u9884\u8BBE "${d}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;hr(d),L.emit(P.PRESET_DELETED,{name:d})}let p=wr(t,b),u=io({name:d,description:y,apiConfig:p});u.success?(E("success",u.message),this._setSelectedPresetName(t,d),c(),L.emit(P.PRESET_CREATED,{preset:u.preset}),this._rerender(t)):E("error",u.message)}),i.on("keypress.yytApiPreset",function(d){d.which===13&&a.find(`#${b}-dialog-save`).click()})},destroy(t){!O()||!K(t)||(this._removeDialog(t),Qe(t),t.removeData("yytPanelState"),t.off(".yytApiPreset"))},getStyles(){return`
      .yyt-api-manager {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .yyt-form-row-2col > .yyt-form-group {
        flex: 1;
      }

      .yyt-input-group {
        display: flex;
        gap: 8px;
      }

      .yyt-input-group .yyt-input {
        flex: 1;
      }

      .yyt-model-row {
        display: flex;
        gap: 8px;
        align-items: stretch;
      }

      .yyt-model-input,
      .yyt-model-select {
        flex: 1;
        min-width: 0;
      }

      .yyt-model-btn {
        flex-shrink: 0;
        min-width: 40px;
      }

      .yyt-model-btn i {
        color: var(--yyt-accent);
      }

      .yyt-option-star.yyt-placeholder,
      .yyt-option-delete.yyt-placeholder {
        visibility: hidden;
      }

      .yyt-option-star.yyt-starred:hover {
        color: #fcd34d;
        background: #4a3c22;
        border-color: rgba(251, 191, 36, 0.26);
      }
    `},renderTo(t){let e=this.render({selectedPresetName:this._getSelectedPresetName(t)});t.html(e),this.bindEvents(t,{})}},Uu=Wi});var sl={};re(sl,{MESSAGE_MACROS:()=>tl,addTagRule:()=>Ks,createRuleTemplate:()=>Ji,default:()=>Fu,deleteRulePreset:()=>Zi,deleteRuleTemplate:()=>Qi,deleteTagRule:()=>vo,escapeRegex:()=>hs,exportRulesConfig:()=>To,extractComplexTag:()=>qi,extractCurlyBraceTag:()=>Gn,extractHtmlFormatTag:()=>Yi,extractSimpleTag:()=>Yn,extractTagContent:()=>Bt,generateTagSuggestions:()=>bo,getAllRulePresets:()=>wo,getAllRuleTemplates:()=>Gi,getContentBlacklist:()=>zt,getRuleTemplate:()=>Vi,getTagRules:()=>ht,importRulesConfig:()=>_o,isValidTagName:()=>qn,loadRulePreset:()=>So,saveRulesAsPreset:()=>xo,scanTextForTags:()=>mo,setContentBlacklist:()=>Tr,setTagRules:()=>ho,shouldSkipContent:()=>Hn,testRegex:()=>el,updateRuleTemplate:()=>Xi,updateTagRule:()=>Hs});function ju(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...Kn],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function Ze(){return R.get(Hi,ju())}function It(t){R.set(Hi,t)}function go(){let t=Ze();return Be=t.ruleTemplates||[...Kn],ve=t.tagRules||[],qe=t.contentBlacklist||[],{ruleTemplates:Be,tagRules:ve,contentBlacklist:qe}}function hs(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Hn(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let s=t.toLowerCase();return e.some(r=>{let o=r.trim().toLowerCase();return o&&s.includes(o)})}function qn(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!Wu.includes(t.toLowerCase())}function Yn(t,e){if(!t||!e)return[];let s=[],r=hs(e),o=new RegExp(`<${r}>([\\s\\S]*?)<\\/${r}>`,"gi");[...t.matchAll(o)].forEach(l=>{l[1]&&s.push(l[1].trim())});let a=(t.match(new RegExp(`<${r}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${r}>`,"gi"))||[]).length;return a>i&&Nt.warn(`\u53D1\u73B0 ${a-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),s}function Gn(t,e){if(!t||!e)return[];let s=[],r=hs(e),o=new RegExp(`\\{${r}\\|`,"gi"),n;for(;(n=o.exec(t))!==null;){let a=n.index,i=a+n[0].length,l=1,c=i;for(;c<t.length&&l>0;)t[c]==="{"?l++:t[c]==="}"&&l--,c++;if(l===0){let d=t.substring(i,c-1);d.trim()&&s.push(d.trim())}o.lastIndex=a+1}return s}function qi(t,e){if(!t||!e)return[];let s=e.split(",");if(s.length!==2)return Nt.error(`\u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let r=s[0].trim(),o=s[1].trim(),n=o.match(/<\/(\w+)>/);if(!n)return Nt.error(`\u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${o}`),[];let a=n[1],i=new RegExp(`${hs(r)}([\\s\\S]*?)<\\/${a}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(d=>{d[1]&&l.push(d[1].trim())}),l}function Yi(t,e){if(!t||!e)return[];let s=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return Nt.error(`\u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let r=s[1],o=[],n=new RegExp(`<${r}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${r}>`,"gi");[...t.matchAll(n)].forEach(c=>{c[1]&&o.push(c[1].trim())});let i=(t.match(new RegExp(`<${r}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${r}>`,"gi"))||[]).length;return i>l&&Nt.warn(`\u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${r}> \u6807\u7B7E`),o}function Bt(t,e,s=[]){if(!t)return"";if(!e||e.length===0)return t;let r=e.filter(d=>d.type==="exclude"&&d.enabled),o=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),n=e.filter(d=>d.type==="regex_exclude"&&d.enabled),a=t;for(let d of r)try{let y=new RegExp(`<${hs(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${hs(d.value)}>`,"gi");a=a.replace(y,"")}catch(y){Nt.error("Error applying block exclusion rule:",{rule:d,error:y})}let i=[];if(o.length>0)for(let d of o){let y=[];try{if(d.type==="include")y.push(...Yn(a,d.value)),y.push(...Gn(a,d.value));else if(d.type==="regex_include"){let p=new RegExp(d.value,"gi");[...a.matchAll(p)].forEach(f=>{f[1]&&y.push(f[1])})}}catch(p){Nt.error("Error applying inclusion rule:",{rule:d,error:p})}y.forEach(p=>i.push(p.trim()))}else i.push(a);let l=[];for(let d of i){for(let y of n)try{let p=new RegExp(y.value,"gi");d=d.replace(p,"")}catch(p){Nt.error("Error applying cleanup rule:",{rule:y,error:p})}Hn(d,s)||l.push(d)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function mo(t,e={}){let s=performance.now(),{chunkSize:r=5e4,maxTags:o=100,timeoutMs:n=5e3}=e,a=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let y=0;y<t.length;y+=r){let p=t.slice(y,Math.min(y+r,t.length));if(c++,l+=p.length,performance.now()-s>n){Nt.warn(`Tag scanning timed out after ${n}ms`);break}let u;for(;(u=i.exec(p))!==null&&a.size<o;){let f=(u[1]||u[2]).toLowerCase();qn(f)&&a.add(f)}if(a.size>=o)break;c%5===0&&await new Promise(f=>setTimeout(f,0))}let d=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(d-s),processedChars:l,totalChars:t.length,chunkCount:c,tagsFound:a.size}}}function bo(t,e=25){let s=t.tags.slice(0,e);return{suggestions:s,stats:{totalFound:t.stats.tagsFound,finalCount:s.length}}}function Gi(){return Be.length===0&&go(),Be}function Vi(t){return Be.find(e=>e.id===t)}function Ji(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return Be.push(e),Vn(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function Xi(t,e){let s=Be.findIndex(r=>r.id===t);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(Be[s]={...Be[s],...e,updatedAt:new Date().toISOString()},Vn(),{success:!0,template:Be[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function Qi(t){let e=Be.findIndex(s=>s.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(Be.splice(e,1),Vn(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function Vn(){let t=Ze();t.ruleTemplates=Be,It(t)}function ht(){return ve||go(),ve}function ho(t){ve=t||[];let e=Ze();e.tagRules=ve,It(e)}function Ks(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};ve.push(e);let s=Ze();return s.tagRules=ve,It(s),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function Hs(t,e){if(t<0||t>=ve.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};ve[t]={...ve[t],...e};let s=Ze();return s.tagRules=ve,It(s),{success:!0,rule:ve[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function vo(t){if(t<0||t>=ve.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};ve.splice(t,1);let e=Ze();return e.tagRules=ve,It(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function zt(){return qe||go(),qe}function Tr(t){qe=t||[];let e=Ze();e.contentBlacklist=qe,It(e)}function xo(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=Ze();s.tagRulePresets||(s.tagRulePresets={});let r=`preset-${Date.now()}`;return s.tagRulePresets[r]={id:r,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(ve)),blacklist:JSON.parse(JSON.stringify(qe)),createdAt:new Date().toISOString()},It(s),{success:!0,preset:s.tagRulePresets[r],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function wo(){let e=Ze().tagRulePresets||{};return Object.values(e)}function So(t){let e=Ze(),r=(e.tagRulePresets||{})[t];return r?(ve=JSON.parse(JSON.stringify(r.rules||[])),qe=JSON.parse(JSON.stringify(r.blacklist||[])),e.tagRules=ve,e.contentBlacklist=qe,It(e),{success:!0,preset:r,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Zi(t){let e=Ze(),s=e.tagRulePresets||{};return s[t]?(delete s[t],e.tagRulePresets=s,It(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function To(){return JSON.stringify({tagRules:ve,contentBlacklist:qe,ruleTemplates:Be,tagRulePresets:Ze().tagRulePresets||{}},null,2)}function _o(t,e={overwrite:!0}){try{let s=JSON.parse(t);if(e.overwrite)ve=s.tagRules||[],qe=s.contentBlacklist||[],Be=s.ruleTemplates||Kn;else if(s.tagRules&&ve.push(...s.tagRules),s.contentBlacklist){let o=new Set(qe.map(n=>n.toLowerCase()));s.contentBlacklist.forEach(n=>{o.has(n.toLowerCase())||qe.push(n)})}let r=Ze();return r.tagRules=ve,r.contentBlacklist=qe,r.ruleTemplates=Be,s.tagRulePresets&&(r.tagRulePresets={...r.tagRulePresets||{},...s.tagRulePresets}),It(r),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function el(t,e,s="g",r=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let o=new RegExp(t,s),n=[];if(s.includes("g")){let a;for(;(a=o.exec(e))!==null;)a.length>1?n.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[r]||a[1]||a[0]}):n.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=o.exec(e);a&&n.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[r]||a[1]:a[0]})}return{success:!0,matches:n,count:n.length,extracted:n.map(a=>a.extracted)}}catch(o){return{success:!1,error:o.message,matches:[]}}}var Nt,Hi,Wu,Kn,Be,ve,qe,tl,Fu,_r=U(()=>{Ke();ce();Nt=N.createScope("RegexExtractor"),Hi="settings";Wu=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],Kn=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],Be=[],ve=[],qe=[];tl={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};go();Fu={extractTagContent:Bt,extractSimpleTag:Yn,extractCurlyBraceTag:Gn,extractComplexTag:qi,extractHtmlFormatTag:Yi,escapeRegex:hs,shouldSkipContent:Hn,isValidTagName:qn,scanTextForTags:mo,generateTagSuggestions:bo,getAllRuleTemplates:Gi,getRuleTemplate:Vi,createRuleTemplate:Ji,updateRuleTemplate:Xi,deleteRuleTemplate:Qi,getTagRules:ht,setTagRules:ho,addTagRule:Ks,updateTagRule:Hs,deleteTagRule:vo,getContentBlacklist:zt,setContentBlacklist:Tr,saveRulesAsPreset:xo,getAllRulePresets:wo,loadRulePreset:So,deleteRulePreset:Zi,exportRulesConfig:To,importRulesConfig:_o,testRegex:el,MESSAGE_MACROS:tl}});var ol={};re(ol,{RegexExtractPanel:()=>rl,default:()=>Ku});var rl,Ku,nl=U(()=>{ke();Ce();_r();rl={id:"regexExtractPanel",render(t){let e=ht(),s=zt(),r=wo();return`
      <div class="yyt-regex-panel">
        <!-- \u89C4\u5219\u7F16\u8F91\u533A -->
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading">
            <span class="yyt-flow-heading-icon"><i class="fa-solid fa-filter"></i></span>
            <span>\u6807\u7B7E\u63D0\u53D6\u89C4\u5219</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${b}-show-examples" style="margin-left: auto;">
              <i class="fa-solid fa-lightbulb"></i> \u67E5\u770B\u793A\u4F8B
            </button>
          </div>

          ${this._renderRulesEditor(e,s,r)}
        </div>

        <!-- \u6D4B\u8BD5\u533A -->
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading">
            <span class="yyt-flow-heading-icon"><i class="fa-solid fa-flask"></i></span>
            <span>\u6D4B\u8BD5\u63D0\u53D6</span>
          </div>

          ${this._renderTestSection()}
        </div>
        
        <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
        <div class="yyt-panel-footer">
          <div class="yyt-footer-left">
            <button class="yyt-btn yyt-btn-secondary" id="${b}-import-rules">
              <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${b}-export-rules">
              <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
            </button>
            <input type="file" id="${b}-import-rules-file" accept=".json" style="display:none">
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${b}-reset-rules">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
            </button>
          </div>
        </div>
        
        <!-- \u6807\u7B7E\u626B\u63CF\u7ED3\u679C\u5BB9\u5668 -->
        <div id="${b}-tag-suggestions-container" style="display: none;">
          <div class="yyt-tag-suggestions">
            <div class="yyt-tag-suggestions-header">
              <span>\u53D1\u73B0\u7684\u6807\u7B7E:</span>
              <span id="${b}-tag-scan-stats"></span>
            </div>
            <div class="yyt-tag-list" id="${b}-tag-list"></div>
          </div>
        </div>
      </div>
    `},_renderRulesEditor(t,e,s){let r=t.length>0?t.map((n,a)=>this._renderRuleItem(n,a)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',o=s.length>0?s.map(n=>`<option value="${n.id}">${m(n.name)}</option>`).join(""):"";return`
      <div class="yyt-tag-rules-editor">
        ${o?`
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${b}-rule-preset-select">
            <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
            ${o}
          </select>
          <button class="yyt-btn yyt-btn-secondary" id="${b}-load-rule-preset">
            <i class="fa-solid fa-download"></i> \u52A0\u8F7D
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${b}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u9884\u8BBE
          </button>
        </div>
        `:`
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-secondary" id="${b}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
          </button>
        </div>
        `}
        
        <div class="yyt-rules-list">
            ${r}
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${b}-add-rule">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u89C4\u5219
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${b}-scan-tags">
            <i class="fa-solid fa-search"></i> \u626B\u63CF\u6807\u7B7E
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${b}-add-exclude-cot">
            <i class="fa-solid fa-ban"></i> \u6392\u9664\u5C0FCoT
          </button>
        </div>
        
        <!-- \u9ED1\u540D\u5355\u8BBE\u7F6E -->
        <div class="yyt-form-group">
          <label>\u5185\u5BB9\u9ED1\u540D\u5355\uFF08\u5305\u542B\u8FD9\u4E9B\u5173\u952E\u8BCD\u7684\u5185\u5BB9\u5C06\u88AB\u8FC7\u6EE4\uFF0C\u7528\u9017\u53F7\u5206\u9694\uFF09</label>
          <input type="text" class="yyt-input" id="${b}-content-blacklist" 
                 value="${m(e.join(", "))}" 
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
               value="${m(t.value||"")}">
        <label class="yyt-checkbox-label yyt-rule-enabled-label">
          <input type="checkbox" class="yyt-rule-enabled" ${t.enabled?"checked":""}>
          <span>\u542F\u7528</span>
        </label>
        <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-btn-danger yyt-rule-delete" title="\u5220\u9664\u89C4\u5219">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `},_renderTestSection(){return`
        <div class="yyt-form-group">
          <label>\u6D4B\u8BD5\u6587\u672C</label>
          <textarea class="yyt-textarea" id="${b}-test-input" rows="6"
                    placeholder="\u8F93\u5165\u8981\u6D4B\u8BD5\u63D0\u53D6\u7684\u6587\u672C\u5185\u5BB9..."></textarea>
        </div>

        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${b}-test-extract">
            <i class="fa-solid fa-play"></i> \u6D4B\u8BD5\u63D0\u53D6
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${b}-test-clear">
            <i class="fa-solid fa-eraser"></i> \u6E05\u7A7A
          </button>
        </div>

        <div class="yyt-form-group" id="${b}-test-result-container" style="display: none;">
          <label>\u63D0\u53D6\u7ED3\u679C</label>
          <div class="yyt-test-result" id="${b}-test-result"></div>
        </div>
    `},bindEvents(t,e){let s=O();!s||!K(t)||(t.off(".yytRegex"),this._bindRuleEditorEvents(t,s),this._bindPresetEvents(t,s),this._bindTestEvents(t,s),this._bindFileEvents(t,s),Ne(t,{namespace:"yytRegexSelect",selectors:[`#${b}-rule-preset-select`]}))},_bindRuleEditorEvents(t,e){t.on("change.yytRegex",".yyt-rule-type",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).val();Hs(r,{type:o})}),t.on("change.yytRegex",".yyt-rule-value",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).val().trim();Hs(r,{value:o})}),t.on("change.yytRegex",".yyt-rule-enabled",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).is(":checked");Hs(r,{enabled:o})}),t.on("click.yytRegex",".yyt-rule-delete",async s=>{let o=e(s.currentTarget).closest(".yyt-rule-item").data("rule-index");await he("\u5220\u9664\u89C4\u5219","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F",{danger:!0})&&(vo(o),this.renderTo(t),E("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.on("click.yytRegex",`#${b}-add-rule`,()=>{Ks({type:"include",value:"",enabled:!0}),this.renderTo(t),E("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),t.on("click.yytRegex",`#${b}-scan-tags`,async()=>{let s=t.find(`#${b}-scan-tags`),r=t.find(`#${b}-test-input`).val();if(!r||!r.trim()){E("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let o=await mo(r,{maxTags:50,timeoutMs:3e3}),{suggestions:n,stats:a}=bo(o,25);if(n.length===0){E("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),t.find(`#${b}-tag-suggestions-container`).hide();return}let i=t.find(`#${b}-tag-list`);t.find(`#${b}-tag-scan-stats`).text(`${a.finalCount}/${a.totalFound} \u4E2A\u6807\u7B7E, ${o.stats.processingTimeMs}ms`),i.empty(),n.forEach(c=>{let d=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${m(c)}</button>`);d.on("click",()=>{if(ht().some(u=>u.type==="include"&&u.value===c)){E("warning",`\u89C4\u5219 "\u5305\u542B: ${c}" \u5DF2\u5B58\u5728`);return}Ks({type:"include",value:c,enabled:!0}),this.renderTo(t),E("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${c}"`)}),i.append(d)}),t.find(`#${b}-tag-suggestions-container`).show(),E("success",`\u53D1\u73B0 ${n.length} \u4E2A\u6807\u7B7E`)}catch(o){E("error",`\u626B\u63CF\u5931\u8D25: ${o.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.on("click.yytRegex",`#${b}-add-exclude-cot`,()=>{let s=ht(),r="<!--[\\s\\S]*?-->";if(s.some(n=>n.type==="regex_exclude"&&n.value===r)){E("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}Ks({type:"regex_exclude",value:r,enabled:!0}),this.renderTo(t),E("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),t.on("change.yytRegex",`#${b}-content-blacklist`,function(){let r=e(this).val().split(",").map(o=>o.trim()).filter(o=>o);Tr(r),E("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${r.length} \u4E2A\u5173\u952E\u8BCD`)}),t.on("click.yytRegex",`#${b}-show-examples`,()=>{let s=`
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
      `,r=`${b}-examples-dialog`,o=t.find(`#${r}-overlay`);o.length&&o.remove();let n=Zt({id:r,title:"\u63D0\u53D6\u89C4\u5219\u8BED\u6CD5\u8BF4\u660E",body:`<div style="white-space: pre-wrap; font-size: 13px; line-height: 1.7; max-height: 60vh; overflow-y: auto;">${m(s)}</div>`,wide:!0}),a=e(n).appendTo(t);a.find(`#${r}-cancel`).text("\u5173\u95ED"),a.find(`#${r}-save`).remove(),es(a,r,{})})},_bindPresetEvents(t,e){t.on("click.yytRegex",`#${b}-load-rule-preset`,()=>{let s=t.find(`#${b}-rule-preset-select`).val();if(!s){E("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let r=So(s);r.success?(this.renderTo(t),E("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${r.preset.name}`),L.emit(P.REGEX_PRESET_LOADED,{preset:r.preset})):E("error",r.message)}),t.on("click.yytRegex",`#${b}-save-rule-preset`,()=>{let s=`${b}-preset-name-dialog`,r=t.find(`#${s}-overlay`);r.length&&r.remove();let o=Zt({id:s,title:"\u4FDD\u5B58\u89C4\u5219\u9884\u8BBE",body:`<div class="yyt-form-group">
          <label>\u9884\u8BBE\u540D\u79F0</label>
          <input type="text" class="yyt-input" id="${s}-name" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0...">
        </div>`}),n=e(o).appendTo(t);es(n,s,{onSave:a=>{let i=n.find(`#${s}-name`).val();if(!i||!i.trim()){E("error","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),n.find(`#${s}-name`).trigger("focus").trigger("select");return}a();let l=xo(i.trim());l.success?(this.renderTo(t),E("success",`\u9884\u8BBE "${i.trim()}" \u5DF2\u4FDD\u5B58`)):E("error",l.message)}})})},_bindTestEvents(t,e){t.on("click.yytRegex",`#${b}-test-extract`,()=>{let s=t.find(`#${b}-test-input`).val();if(!s||!s.trim()){E("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let r=ht(),o=zt(),n=Bt(s,r,o),a=t.find(`#${b}-test-result-container`),i=t.find(`#${b}-test-result`);a.show(),!n||!n.trim()?(i.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),E("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(i.html(`<pre class="yyt-code-block">${m(n)}</pre>`),E("success","\u63D0\u53D6\u5B8C\u6210"),L.emit(P.REGEX_EXTRACTED,{result:n}))}),t.on("click.yytRegex",`#${b}-test-clear`,()=>{t.find(`#${b}-test-input`).val(""),t.find(`#${b}-test-result-container`).hide()})},_bindFileEvents(t,e){t.on("click.yytRegex",`#${b}-import-rules`,()=>{t.find(`#${b}-import-rules-file`).click()}),t.on("change.yytRegex",`#${b}-import-rules-file`,async s=>{let r=s.target.files[0];if(r){try{let o=await mt(r),n=_o(o,{overwrite:!0});n.success?(this.renderTo(t),E("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):E("error",n.message)}catch(o){E("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.on("click.yytRegex",`#${b}-export-rules`,()=>{try{let s=To();nt(s,`youyou_toolkit_rules_${Date.now()}.json`),E("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){E("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.on("click.yytRegex",`#${b}-reset-rules`,async()=>{await he("\u91CD\u7F6E\u89C4\u5219","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002",{danger:!0})&&(ho([]),Tr([]),this.renderTo(t),E("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(t){!O()||!K(t)||(Ie(t,"yytRegexSelect"),t.off(".yytRegex"))},getStyles(){return`
      /* \u6B63\u5219\u63D0\u53D6\u9762\u677F\u6837\u5F0F */
      .yyt-regex-panel {
        display: flex;
        flex-direction: column;
        gap: 0;
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
        padding: 12px 16px;
        background: transparent;
        border-top: 1px solid var(--yyt-border);
        transition: background 0.2s ease, box-shadow 0.2s ease;
        box-shadow: none;
      }

      .yyt-rule-item:first-child {
        border-top: none;
      }

      .yyt-rule-item > .yyt-select,
      .yyt-rule-item > .yyt-input {
        min-width: 0;
      }

      .yyt-rule-item > .yyt-rule-type {
        flex: 2 1 148px !important;
        min-width: 132px !important;
      }

      .yyt-rule-item > .yyt-rule-value {
        flex: 5 1 0 !important;
      }

      .yyt-rule-item:hover {
        background: var(--yyt-surface-3);
        box-shadow: none;
      }

      .yyt-rule-enabled-label {
        flex-shrink: 0;
        white-space: nowrap;
      }

      /* \u6807\u7B7E\u5EFA\u8BAE\u533A\u57DF */
      .yyt-tag-suggestions {
        margin-top: 12px;
        border: none;
        border-radius: 0;
        background: transparent;
        padding: 0;
      }

      .yyt-tag-suggestions-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        font-size: 12px;
        font-weight: 700;
        color: var(--yyt-text-secondary);
      }

      .yyt-tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .yyt-tag-list .yyt-btn {
        cursor: pointer;
      }

      .yyt-tag-list .yyt-btn:hover {
        background: var(--yyt-accent-soft);
        border-color: rgba(123, 183, 255, 0.4);
      }
      
      .yyt-test-result {
        background: transparent;
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},Ku=rl});var pl={};re(pl,{createDefaultToolDefinition:()=>vs,default:()=>Gu,deleteTool:()=>ko,deleteToolPreset:()=>dl,exportTools:()=>Co,getAllTools:()=>ts,getCurrentToolPreset:()=>yl,getTool:()=>qs,getToolPresets:()=>Io,importTools:()=>Ro,normalizeToolDefinitionToRuntimeConfig:()=>Er,resetTools:()=>$o,saveTool:()=>Eo,saveToolPreset:()=>cl,setCurrentToolPreset:()=>ul,setToolEnabled:()=>Mo});function Hu(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,s])=>[e,vs({...s||{},id:e})]))}function Ar(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function Jn(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>0?s:e}function al(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>=0?s:e}function il(t={}){return{enabled:t?.enabled===!0,settleMs:al(t?.settleMs,1200),cooldownMs:al(t?.cooldownMs,5e3)}}function ll(t={}){return{enabled:t?.enabled===!0,selected:Ar(t?.selected)}}function qu(t=[]){let e=Array.isArray(t)?t.map(s=>({role:String(s?.role||"user").trim().toUpperCase(),content:String(s?.content||"").trim()})).filter(s=>s.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(s=>`\u3010${s.role||"USER"}\u3011
${s.content}`).join(`

`)}function Yu(t,e={}){let s=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(s)return s;let r=qu(e?.config?.messages||[]);return r||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function vs(t={}){let e=new Date().toISOString(),s=t?.config||{};return{...it,...t,id:t?.id||it.id,icon:t?.icon||it.icon,order:Number.isFinite(t?.order)?t.order:it.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:it.promptTemplate,extractTags:Ar(t?.extractTags),config:{execution:{...it.config.execution,...s.execution||{},timeout:Jn(s?.execution?.timeout,it.config.execution.timeout),retries:Math.max(0,parseInt(s?.execution?.retries,10)||it.config.execution.retries)},api:{...it.config.api,...s.api||{}},messages:Array.isArray(s?.messages)?s.messages:[],context:{...it.config.context,...s.context||{},depth:Jn(s?.context?.depth,it.config.context.depth),includeTags:Ar(s?.context?.includeTags),excludeTags:Ar(s?.context?.excludeTags)},automation:il(s?.automation),worldbooks:ll(s?.worldbooks)},enabled:t?.enabled!==!1,metadata:{...it.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function Er(t,e={},s={}){let r=vs({...e,id:t||e?.id||""}),o=Ar(r?.extractTags?.length?r.extractTags:r?.config?.context?.includeTags),n=String(e?.output?.apiPreset||r?.config?.api?.preset||"").trim(),a=Yu(t,r),i=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():s.defaultOutputMode||"follow_ai";return{id:r.id||t,name:r.name||t,icon:r.icon||"fa-screwdriver-wrench",description:r.description||"",enabled:r.enabled!==!1,order:Number.isFinite(r.order)?r.order:100,bypass:{enabled:r?.config?.api?.useBypass===!0&&!!r?.config?.api?.bypassPreset,presetId:r?.config?.api?.bypassPreset||""},output:{mode:i,apiPreset:n,overwrite:!0,enabled:!0},automation:il(r?.config?.automation),worldbooks:ll(r?.config?.worldbooks),extraction:{enabled:!0,maxMessages:Jn(r?.config?.context?.depth,5),selectors:o},promptTemplate:a,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:n,extractTags:o,isCustom:!0,category:r.category||"utility",metadata:{...r.metadata||{}}}}function ts(){let t=fe.get(Se.TOOLS),e=Hu(t);return t&&JSON.stringify(t)!==JSON.stringify(e)&&fe.set(Se.TOOLS,e),{...Ao,...e}}function qs(t){return ts()[t]||null}function Eo(t,e){if(!t||!e)return!1;let s=fe.get(Se.TOOLS)||{},r=!s[t]&&!Ao[t],o=vs({...s[t]||{},...e,id:t,metadata:{...s[t]?.metadata||{},...e.metadata||{},createdAt:s[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return s[t]=o,fe.set(Se.TOOLS,s),L.emit(r?P.TOOL_REGISTERED:P.TOOL_UPDATED,{toolId:t,tool:o}),!0}function ko(t){let e=fe.get(Se.TOOLS)||{};return!e[t]&&!Ao[t]||Ao[t]?!1:(delete e[t],fe.set(Se.TOOLS,e),L.emit(P.TOOL_UNREGISTERED,{toolId:t}),!0)}function Io(){return fe.get(Se.PRESETS)||{}}function cl(t,e){if(!t||!e)return!1;let s=Io(),r=!s[t];return s[t]={...e,name:t,updatedAt:new Date().toISOString()},fe.set(Se.PRESETS,s),L.emit(r?P.PRESET_CREATED:P.PRESET_UPDATED,{type:"tool",presetName:t,preset:s[t]}),!0}function dl(t){let e=Io();return e[t]?(delete e[t],fe.set(Se.PRESETS,e),L.emit(P.PRESET_DELETED,{type:"tool",presetName:t}),!0):!1}function yl(){return fe.get(Se.CURRENT_PRESET)||""}function ul(t){return fe.set(Se.CURRENT_PRESET,t||""),L.emit(P.PRESET_ACTIVATED,{type:"tool",presetName:t}),!0}function Mo(t,e){let s=qs(t);if(!s)return!1;let r=fe.get(Se.TOOLS)||{};return r[t]=vs({...s,id:t,enabled:e,metadata:{...s?.metadata||{},createdAt:s?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),fe.set(Se.TOOLS,r),L.emit(e?P.TOOL_ENABLED:P.TOOL_DISABLED,{toolId:t,enabled:e}),!0}function Co(){let t=fe.get(Se.TOOLS)||{},e=fe.get(Se.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function Ro(t,e=!1){try{let s=typeof e=="object"?!!e?.overwrite:!!e,r=JSON.parse(t);if(!r||typeof r!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let o=s?{}:fe.get(Se.TOOLS)||{},n=s?{}:fe.get(Se.PRESETS)||{},a=0,i=0;if(r.tools&&typeof r.tools=="object"){for(let[l,c]of Object.entries(r.tools))!c||typeof c!="object"||(o[l]=vs({...c,id:l}),a+=1);fe.set(Se.TOOLS,o)}if(r.presets&&typeof r.presets=="object"){for(let[l,c]of Object.entries(r.presets))!c||typeof c!="object"||(n[l]={...c,name:l,updatedAt:new Date().toISOString()},i+=1);fe.set(Se.PRESETS,n)}return{success:!0,toolsImported:a,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function $o(){fe.remove(Se.TOOLS),fe.remove(Se.PRESETS),fe.remove(Se.CURRENT_PRESET)}var it,Ao,Se,Gu,Po=U(()=>{Ke();ke();it={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},Ao={},Se={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};Gu={getAllTools:ts,getTool:qs,saveTool:Eo,deleteTool:ko,setToolEnabled:Mo,exportTools:Co,importTools:Ro,resetTools:$o,getToolPresets:Io,saveToolPreset:cl,deleteToolPreset:dl,getCurrentToolPreset:yl,setCurrentToolPreset:ul,createDefaultToolDefinition:vs,normalizeToolDefinitionToRuntimeConfig:Er}});var $l={};re($l,{TOOL_CATEGORIES:()=>fl,TOOL_REGISTRY:()=>Ys,appendToolRuntimeHistory:()=>El,clearToolApiPreset:()=>Tl,default:()=>sp,ensureToolRuntimeConfig:()=>Oo,getAllDefaultToolConfigs:()=>Il,getAllToolApiBindings:()=>_l,getAllToolFullConfigs:()=>Mr,getEnabledTools:()=>Ml,getToolApiPreset:()=>ta,getToolBaseConfig:()=>Gs,getToolConfig:()=>Ir,getToolFullConfig:()=>pe,getToolList:()=>vl,getToolSubTabs:()=>xl,getToolWindowState:()=>Rl,hasTool:()=>ea,onPresetDeleted:()=>Al,patchToolRuntime:()=>ss,registerTool:()=>bl,resetToolConfig:()=>kl,resetToolRegistry:()=>wl,saveToolConfig:()=>ct,saveToolWindowState:()=>Cl,setToolApiPreset:()=>Sl,setToolApiPresetConfig:()=>Zu,setToolBypassConfig:()=>ep,setToolOutputMode:()=>Qu,setToolPromptTemplate:()=>tp,unregisterTool:()=>hl,updateToolRuntime:()=>sa});function ws(t={}){let e=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(t?.lastRunAt)?t.lastRunAt:0,lastStatus:typeof t?.lastStatus=="string"?t.lastStatus:"idle",lastError:typeof t?.lastError=="string"?t.lastError:"",lastDurationMs:Number.isFinite(t?.lastDurationMs)?t.lastDurationMs:0,successCount:Number.isFinite(t?.successCount)?t.successCount:0,errorCount:Number.isFinite(t?.errorCount)?t.errorCount:0,lastMessageKey:typeof t?.lastMessageKey=="string"?t.lastMessageKey:"",lastExecutionKey:typeof t?.lastExecutionKey=="string"?t.lastExecutionKey:"",lastExecutionPath:typeof t?.lastExecutionPath=="string"?t.lastExecutionPath:"",lastWritebackStatus:typeof t?.lastWritebackStatus=="string"?t.lastWritebackStatus:"",lastFailureStage:typeof t?.lastFailureStage=="string"?t.lastFailureStage:"",lastSlotBindingKey:typeof t?.lastSlotBindingKey=="string"?t.lastSlotBindingKey:"",lastSlotRevisionKey:typeof t?.lastSlotRevisionKey=="string"?t.lastSlotRevisionKey:"",lastSlotTransactionId:typeof t?.lastSlotTransactionId=="string"?t.lastSlotTransactionId:"",lastSourceMessageId:typeof t?.lastSourceMessageId=="string"?t.lastSourceMessageId:"",lastSourceSwipeId:typeof t?.lastSourceSwipeId=="string"?t.lastSourceSwipeId:"",lastContentCommitted:t?.lastContentCommitted===!0,lastHostCommitApplied:t?.lastHostCommitApplied===!0,lastRefreshRequested:t?.lastRefreshRequested===!0,lastRefreshConfirmed:t?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof t?.lastPreferredCommitMethod=="string"?t.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof t?.lastAppliedCommitMethod=="string"?t.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(t?.lastRefreshMethodCount)?t.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(t?.lastRefreshMethods)?t.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(t?.lastRefreshConfirmChecks)?t.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof t?.lastRefreshConfirmedBy=="string"?t.lastRefreshConfirmedBy:"",lastTraceId:typeof t?.lastTraceId=="string"?t.lastTraceId:"",lastAutoRunAt:Number.isFinite(t?.lastAutoRunAt)?t.lastAutoRunAt:0,lastAutoStatus:typeof t?.lastAutoStatus=="string"?t.lastAutoStatus:"idle",lastAutoMessageId:typeof t?.lastAutoMessageId=="string"?t.lastAutoMessageId:"",lastAutoSwipeId:typeof t?.lastAutoSwipeId=="string"?t.lastAutoSwipeId:"",lastAutoRevisionKey:typeof t?.lastAutoRevisionKey=="string"?t.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof t?.lastAutoWritebackStatus=="string"?t.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:t?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof t?.lastAutoSkipReason=="string"?t.lastAutoSkipReason:"",recentWritebackHistory:e}}function Vu(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function gl(){let t=ts()||{};return Object.entries(t).filter(([e])=>!kr[e]).map(([e,s])=>[e,s||{}])}function Xn(t={}){return t?.toolKind==="script"?"script":t?.toolKind==="ai"?"ai":t?.output?.mode==="local_transform"||t?.processor?.type?"script":"ai"}function ml(){let t=Array.isArray(Ys.tools?.subTabs)?Ys.tools.subTabs.map((s,r)=>({...s,order:Number.isFinite(s?.order)?s.order:r,toolKind:Xn(s),toolGroupLabel:Xn(s)==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"})):[],e=gl().map(([s,r],o)=>{let n=Er(s,r),a=Xn(n);return{id:s,name:n.name||s,icon:n.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(n.order)?n.order:100+o,isCustom:!0,description:n.description||"",toolKind:a,toolGroupLabel:a==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"}});return[...t,...e].sort((s,r)=>(s.order??0)-(r.order??0))}function Ju(t,e={}){let s=Er(t,e,{defaultOutputMode:"follow_ai"});return{...s,runtime:ws(s.runtime)}}function Zn(t){let e=kr[t];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:ws(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let r=(ts()||{})[t]||null;return r?Ju(t,r):Ir(t)}function Gs(t){let e=Zn(t);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function Xu(t,e={},s=""){if(!t)return null;let r={...t,...e,id:t.id||e.id};r.output={...t.output||{},...e.output||{}},r.automation={enabled:t?.automation?.enabled===!0||e?.automation?.enabled===!0,settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(t?.automation?.settleMs)?t.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(t?.automation?.cooldownMs)?t.automation.cooldownMs:5e3},r.bypass={...t.bypass||{},...e.bypass||{}},r.worldbooks={...t.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(t?.worldbooks?.selected)?[...t.worldbooks.selected]:[]},r.runtime=ws({...t.runtime||{},...e.runtime||{}}),r.extraction={...t.extraction||{},...e.extraction||{}},r.processor={...t.processor||{},...e.processor||{},options:{...t?.processor?.options||{},...e?.processor?.options||{}}};let o=e?.output?.apiPreset||e?.apiPreset||r.output?.apiPreset||r.apiPreset||s||"";return r.output={...r.output||{},apiPreset:o},r.apiPreset=o,(!Array.isArray(r.extraction.selectors)||r.extraction.selectors.length===0)&&Array.isArray(r.extractTags)&&r.extractTags.length>0&&(r.extraction.selectors=[...r.extractTags]),(!Array.isArray(r.extractTags)||r.extractTags.length===0)&&(r.extractTags=Array.isArray(r.extraction.selectors)?[...r.extraction.selectors]:[]),t.isCustom?r.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?r.enabled=e.enabled:r.enabled=t.enabled!==!1,r}function bl(t,e){if(!t||typeof t!="string")return We.error("\u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return We.error("\u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let r of s)if(!e[r])return We.error(` \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${r}`),!1;return Mt[t]={id:t,...e,order:e.order??Object.keys(Mt).length},We.log(` \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function hl(t){return Mt[t]?(delete Mt[t],We.log(` \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(We.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function vl(t=!0){let e=Object.values(Mt).map(s=>s.id==="tools"?{...s,subTabs:ml()}:s);return t?e.sort((s,r)=>(s.order??0)-(r.order??0)):e}function Ir(t){return t==="tools"&&Mt[t]?{...Mt[t],subTabs:ml()}:Mt[t]||null}function ea(t){return!!Mt[t]}function xl(t){let e=Ir(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function wl(){Mt={...Ys},We.log("\u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Sl(t,e){if(!ea(t))return We.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let s=R.get(lt)||{};return s[t]=e||"",R.set(lt,s),We.log(` \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function ta(t){return(R.get(lt)||{})[t]||""}function Tl(t){let e=R.get(lt)||{};delete e[t],R.set(lt,e),We.log(` \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function _l(){return R.get(lt)||{}}function Al(t){let e=R.get(lt)||{},s=!1;for(let r in e)e[r]===t&&(e[r]="",s=!0,We.log(` \u5DE5\u5177 "${r}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&R.set(lt,e)}function pe(t){let e=Zn(t);if(!e)return Ir(t);let r=(R.get(xs)||{})[t]||{},o=ta(t);return Xu({...e,id:t},r,o)}function Oo(t){if(!t)return!1;let e=Zn(t);if(!e)return!1;let s=R.get(xs)||{};if(s[t])return!0;let r={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};s[t]=r,R.set(xs,s);let o=R.get(lt)||{};return o[t]=r.output?.apiPreset||r.apiPreset||"",R.set(lt,o),L.emit(P.TOOL_UPDATED,{toolId:t,config:r}),!0}function ct(t,e,s={}){if(!t||!pe(t))return We.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:r=!0}=s,o=R.get(xs)||{},n=R.get(lt)||{},a=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return o[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){o[t][l]={...e.output,apiPreset:a};return}if(l==="apiPreset"){o[t][l]=a;return}o[t][l]=e[l]}}),o[t].apiPreset===void 0&&(o[t].apiPreset=a),!o[t].output&&e.output!==void 0&&(o[t].output={...e.output||{},apiPreset:a}),R.set(xs,o),n[t]=a,R.set(lt,n),r&&L.emit(P.TOOL_UPDATED,{toolId:t,config:o[t]}),We.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function Qu(t,e){let s=pe(t);return s?ct(t,{...s,output:{...s.output,mode:e}}):!1}function Zu(t,e){let s=pe(t);return s?ct(t,{...s,apiPreset:e,output:{...s.output,apiPreset:e}}):!1}function ep(t,e){let s=pe(t);return s?ct(t,{...s,bypass:{...s.bypass,...e}}):!1}function tp(t,e){let s=pe(t);return s?ct(t,{...s,promptTemplate:e}):!1}function ss(t,e,s={}){let r=pe(t);if(!r)return!1;let{touchLastRunAt:o=!1,emitEvent:n=!1,emitRuntimeEvent:a=!0}=s,i=ws({...r.runtime||{},...e||{}});o&&(i.lastRunAt=Date.now());let l=ct(t,{...r,runtime:i},{emitEvent:n});return l&&a&&L.emit(P.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:i,previousRuntime:ws(r.runtime||{})}),l}function El(t,e,s={},r={}){let o=pe(t);if(!o)return!1;let{limit:n=10,emitEvent:a=!1,emitRuntimeEvent:i=!0}=r,l=ws(o.runtime||{}),c=ws(o.runtime||{}),d="recentWritebackHistory",y={id:s?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:s?.at||Date.now(),...s};l[d]=Vu([...Array.isArray(l[d])?l[d]:[],y],n),y?.traceId&&(l.lastTraceId=y.traceId);let p=ct(t,{...o,runtime:l},{emitEvent:a});return p&&i&&L.emit(P.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:l,previousRuntime:c,historyType:e,historyEntry:y}),p}function sa(t,e,s={}){let{touchLastRunAt:r=!0,emitEvent:o=!1,emitRuntimeEvent:n=!0}=s;return ss(t,e,{touchLastRunAt:r,emitEvent:o,emitRuntimeEvent:n})}function kl(t){if(!t||!kr[t])return We.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=R.get(xs)||{};return delete e[t],R.set(xs,e),L.emit(P.TOOL_UPDATED,{toolId:t,config:null}),We.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function Il(){return{...kr}}function Mr(){let t=new Set([...Object.keys(kr),...gl().map(([e])=>e)]);return Array.from(t).map(e=>pe(e)).filter(Boolean)}function Ml(){return Mr().filter(t=>t&&t.enabled)}function Cl(t,e){let s=R.get(Qn)||{};s[t]={...e,updatedAt:Date.now()},R.set(Qn,s)}function Rl(t){return(R.get(Qn)||{})[t]||null}var We,xs,lt,Qn,kr,Ys,fl,Mt,sp,rs=U(()=>{Ke();ke();ce();Po();We=N.createScope("ToolRegistry"),xs="tool_configs",lt="tool_api_bindings",Qn="tool_window_states";kr={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</boo_FM>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["boo_FM"]},statusBlock:{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",description:"\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u4EE3\u7801\u5757",enabled:!0,order:4,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,selectors:["status_block"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0B\u5BF9\u8BDD\u5185\u5BB9\u751F\u6210\u89D2\u8272\u72B6\u6001\u5757\uFF1A

\u8F93\u51FA\u683C\u5F0F\uFF1A
<status_block>
<name>\u89D2\u8272\u540D</name>
<location>\u4F4D\u7F6E</location>
<condition>\u72B6\u6001</condition>
<equipment>\u88C5\u5907</equipment>
<skills>\u6280\u80FD</skills>
</status_block>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["status_block"]},youyouReview:{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",description:"\u5728\u56DE\u590D\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50",enabled:!0,order:5,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,selectors:["youyou"]},promptTemplate:`\u8BF7\u57FA\u4E8E\u4EE5\u4E0B\u6700\u65B0\u5267\u60C5\u56DE\u590D\uFF0C\u751F\u6210\u201C\u5C0F\u5E7D\u70B9\u8BC4\u201D\u3002

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},Ys={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},toolManage:{id:"toolManage",name:"\u5DE5\u5177\u5217\u8868",icon:"fa-screwdriver-wrench",hasSubTabs:!1,description:"\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u7BA1\u7406\u81EA\u5B9A\u4E49\u5DE5\u5177",component:"ToolManagePanel",order:3},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel",toolKind:"ai"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel",toolKind:"ai"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel",toolKind:"ai"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel",toolKind:"script"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel",toolKind:"script"}]},tableWorkbench:{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",icon:"fa-table-cells",hasSubTabs:!1,description:"\u7ED3\u6784\u5316\u586B\u8868\u4E0E\u72B6\u6001\u9884\u89C8\u5DE5\u4F5C\u53F0",component:"TableWorkbenchPanel",order:5},bypass:{id:"bypass",name:"Ai\u6307\u4EE4\u9884\u8BBE",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406 Ai \u6307\u4EE4\u9884\u8BBE",component:"BypassPanel",order:6},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:7},logger:{id:"logger",name:"\u65E5\u5FD7",icon:"fa-terminal",hasSubTabs:!1,description:"\u67E5\u770B\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7\uFF0C\u652F\u6301\u8FC7\u6EE4\u4E0E\u5BFC\u51FA",component:"LoggerPanel",order:8}},fl={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},Mt={...Ys};sp={TOOL_REGISTRY:Ys,TOOL_CATEGORIES:fl,registerTool:bl,unregisterTool:hl,getToolList:vl,getToolConfig:Ir,hasTool:ea,getToolSubTabs:xl,resetToolRegistry:wl,setToolApiPreset:Sl,getToolApiPreset:ta,clearToolApiPreset:Tl,getAllToolApiBindings:_l,onPresetDeleted:Al,saveToolWindowState:Cl,getToolWindowState:Rl,getToolBaseConfig:Gs,ensureToolRuntimeConfig:Oo,getToolFullConfig:pe,patchToolRuntime:ss,appendToolRuntimeHistory:El,saveToolConfig:ct,resetToolConfig:kl,getAllDefaultToolConfigs:Il,getAllToolFullConfigs:Mr,getEnabledTools:Ml}});var Ol={};re(Ol,{ToolManagePanel:()=>Pl,default:()=>rp});var Pl,rp,Ll=U(()=>{Ce();Po();rs();Pl={id:"toolManagePanel",_removeDialog(t){if(!t?.length)return;let e=t.find("#yyt-tool-dialog-overlay");Ie(e,"yytToolManageDialogSelect"),e.remove()},_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let s=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!s){E("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}s.switchMainTab("tools"),s.switchSubTab("tools",t)},render(t){let e=ts(),s=Object.entries(e),r=s.filter(([,o])=>o?.enabled!==!1).length;return`
      <div class="yyt-tool-manager">
        <!-- Stats -->
        <div class="yyt-flow-section">
          <div class="yyt-stat-row" style="grid-template-columns: 1fr 1fr;">
            <div class="yyt-stat-cell">
              <div class="yyt-stat-label">\u5DE5\u5177\u603B\u6570</div>
              <div class="yyt-stat-value">${s.length}</div>
            </div>
            <div class="yyt-stat-cell">
              <div class="yyt-stat-label">\u5DF2\u542F\u7528</div>
              <div class="yyt-stat-value" style="color: var(--yyt-success);">${r}</div>
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
    `},_renderToolList(t){let e=Object.entries(t);return e.length?`<div class="yyt-list-table">${e.map(([r,o])=>`
      <div class="yyt-list-row ${o.enabled?"yyt-tool-item-enabled":"yyt-tool-item-disabled"}" data-tool-id="${r}">
        <div class="yyt-list-row-icon" style="background: var(--yyt-accent-soft); color: var(--yyt-accent);">
          <i class="fa-solid fa-wrench"></i>
        </div>
        <div class="yyt-list-row-main">
          <div class="yyt-list-row-name">
            ${m(o.name)}
            <span class="yyt-badge" style="background: var(--yyt-accent-soft); color: var(--yyt-accent); margin-left: 6px;">${m(o.category)}</span>
          </div>
          <div class="yyt-list-row-desc">${m(o.description)}</div>
        </div>
        <span class="yyt-status-dot ${o.enabled?"yyt-status-dot-on":"yyt-status-dot-off"}"></span>
        <label class="yyt-toggle yyt-small yyt-tool-toggle">
          <input type="checkbox" ${o.enabled?"checked":""}>
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
      `},bindEvents(t,e){let s=O();!s||!K(t)||(t.off(".yytToolManage"),this._bindToolEvents(t,s),this._bindFileEvents(t,s))},_bindToolEvents(t,e){t.on("change.yytToolManage",".yyt-tool-toggle input",s=>{let r=e(s.currentTarget).closest(".yyt-list-row"),o=r.data("tool-id"),n=e(s.currentTarget).is(":checked");Mo(o,n),r.toggleClass("yyt-tool-item-enabled",n).toggleClass("yyt-tool-item-disabled",!n),r.find(".yyt-status-dot").toggleClass("yyt-status-dot-on",n).toggleClass("yyt-status-dot-off",!n),E("info",n?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.on("click.yytToolManage","#yyt-add-tool",()=>{this._showToolEditDialog(t,e,null)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="config"]',s=>{let r=e(s.currentTarget).closest(".yyt-list-row").data("tool-id");this._openToolConfig(r)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="edit"]',s=>{let r=e(s.currentTarget).closest(".yyt-list-row").data("tool-id");this._showToolEditDialog(t,e,r)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="delete"]',async s=>{let r=e(s.currentTarget).closest(".yyt-list-row").data("tool-id"),o=qs(r);if(!r||!o||!await he("\u5220\u9664\u5DE5\u5177",`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177"${o.name}"\u5417\uFF1F`,{danger:!0}))return;if(!ko(r)){E("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),E("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.on("click.yytToolManage","#yyt-import-tools",()=>{t.find("#yyt-import-tools-file").click()}),t.on("change.yytToolManage","#yyt-import-tools-file",async s=>{let r=s.target.files[0];if(r){try{let o=await mt(r),n=Ro(o,{overwrite:!1});E(n.success?"success":"error",n.message),n.success&&this.renderTo(t)}catch(o){E("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.on("click.yytToolManage","#yyt-export-tools",()=>{try{let s=Co();nt(s,`youyou_toolkit_tools_${Date.now()}.json`),E("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){E("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.on("click.yytToolManage","#yyt-reset-tools",async()=>{await he("\u91CD\u7F6E\u5DE5\u5177","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F",{danger:!0})&&($o(),this.renderTo(t),E("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,s){let r=s?qs(s):null,o=!!r,n=`
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
                       value="${r?m(r.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${r?m(r.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;this._removeDialog(t),t.append(n);let a=t.find("#yyt-tool-dialog-overlay"),i=a.find("#yyt-tool-name"),l=a.find("#yyt-tool-category"),c=a.find("#yyt-tool-desc"),d=a.find("#yyt-tool-timeout"),y=a.find("#yyt-tool-retries");Ne(a,{namespace:"yytToolManageDialogSelect",selectors:["#yyt-tool-category"]});let p=()=>{Ie(a,"yytToolManageDialogSelect"),a.remove()};a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",p),a.on("click",function(u){u.target===this&&p()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let u=i.val().trim(),f=l.val(),h=c.val().trim(),v=parseInt(d.val())||6e4,w=parseInt(y.val())||3;if(!u){E("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0"),i.trigger("focus").trigger("select");return}let S=s||`tool_${Date.now()}`;if(!Eo(S,{name:u,category:f,description:h,promptTemplate:r?.promptTemplate||"",extractTags:Array.isArray(r?.extractTags)?r.extractTags:[],config:{execution:{timeout:v,retries:w},api:r?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(r?.config?.messages)?r.config.messages:[],context:{depth:r?.config?.context?.depth||3,includeTags:Array.isArray(r?.config?.context?.includeTags)?r.config.context.includeTags:[],excludeTags:Array.isArray(r?.config?.context?.excludeTags)?r.config.context.excludeTags:[]},worldbooks:{enabled:r?.config?.worldbooks?.enabled===!0,selected:Array.isArray(r?.config?.worldbooks?.selected)?r.config.worldbooks.selected:[]}},enabled:r?.enabled!==!1})){E("error",o?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}Oo(S),p(),this.renderTo(t),E("success",o?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),o||this._openToolConfig(S)})},destroy(t){!O()||!K(t)||(this._removeDialog(t),t.off(".yytToolManage"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},rp=Pl});function os(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Lo(){return os()?.SillyTavern||null}function ue(t){return t==null?"":String(t).trim()}function np(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let s of e)if(typeof s=="string"&&s.trim())return s.trim();return""}function ap(t){let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||t?.is_user===!0?"user":t?.is_system===!0?"system":"assistant"}function Dl(t=""){let e=String(t||"").trim();if(!e)return"empty";let s=0;for(let r=0;r<e.length;r+=1)s=(s<<5)-s+e.charCodeAt(r),s|=0;return`fp_${Math.abs(s).toString(36)}`}function Nl(t={}){let e=ue(t.chatId)||"chat_default",s=ue(t.messageId)||"latest";return`${e}::${s}`}function Bl(t={}){let e=Nl(t),s=ue(t.effectiveSwipeId)||"swipe:current",r=ue(t.assistantContentFingerprint)||"empty";return`${e}::${s}::${r}`}function ip(t={}){let e=Bl(t),s=ue(t.eventType)||"MANUAL",r=ue(t.traceId)||zl("manual");return`${e}::${s}::${r}`}function zl(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function Ul(){let t=Lo();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function jl(t=[]){let e=[],s=null,r=null;return t.forEach((o,n)=>{let a=ap(o),i=np(o);if(!i)return;let l=ue(o?.messageId??o?.message_id??o?.id??o?.mid??o?.mesid??o?.chat_index??n),c=ue(o?.swipe_id??o?.swipeId??o?.swipe??""),d={role:a,content:i,sourceId:l,swipeId:c,raw:o,index:n};e.push(d),a==="user"&&(s=d),a==="assistant"&&(r=d)}),{messages:e,lastUserMessage:s,lastAiMessage:r}}function lp(t,e,s){return ue(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.this_chid??s?.id??"chat_default")||"chat_default"}async function ra(){let t=Lo();if(!t)return null;try{let e=t.this_chid,s=t.characters||[];if(e>=0&&e<s.length){let r=s[e];return{id:e,name:r?.name||"",description:r?.description||"",personality:r?.personality||"",scenario:r?.scenario||"",firstMes:r?.first_mes||"",mesExample:r?.mes_example||""}}}catch(e){op.error("\u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function cp(t="",e=null){let s=String(t||""),r=e?.YouYouToolkit_toolOutputs;return r&&typeof r=="object"&&Object.values(r).forEach(o=>{let n=String(o?.blockText||o?.content||"").trim();n&&s.includes(n)&&(s=s.replace(n,"").trimEnd())}),s.trim()}function dp(t,e={}){let s=Array.isArray(t?.messages)?t.messages:[],r=ue(e.messageId),o=ue(e.swipeId);if(!r)return t?.lastAiMessage||null;let n=s.filter(i=>i.role==="assistant"),a=n.find(i=>i.sourceId!==r?!1:o?ue(i.swipeId)===o:!0);return a||n.find(i=>i.sourceId===r)||null}function Wl({api:t,stContext:e,character:s,conversation:r,targetAssistantMessage:o,runSource:n="MANUAL"}={}){let a=r?.messages||[],i=r?.lastUserMessage||null,l=ue(o?.sourceId)||"",c=ue(o?.swipeId)||"swipe:current",d=o?.content||"",y=cp(d,o?.raw||null),p=Dl(d),u=Dl(y),f=lp(t,e,s),h=zl(String(n||"manual").toLowerCase()),v=Nl({chatId:f,messageId:l}),w=Bl({chatId:f,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:u});return{startedAt:Date.now(),runSource:n,traceId:h,chatId:f,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:v,slotRevisionKey:w,slotTransactionId:ip({chatId:f,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:u,eventType:n,traceId:h}),executionKey:w,lastAiMessage:d,assistantContentFingerprint:p,assistantBaseText:y,assistantBaseFingerprint:u,lastAiMessageSwipeId:c,confirmedAssistantSwipeId:c,effectiveSwipeId:c,sourceMessageId:l,sourceSwipeId:c,lastUserMessage:i?.content||"",userMessage:i?.content||"",targetAssistantMessage:o,chatMessages:a,characterCard:s,chatHistory:a,input:{userMessage:i?.content||"",lastAiMessage:d,assistantBaseText:y,extractedContent:"",previousToolOutput:"",context:{character:s?.name||"",chatLength:a.length||0}},config:{},status:"pending"}}async function Ss({runSource:t="MANUAL"}={}){let e=Lo(),s=e?.getContext?.()||null,r=await ra(),o=Ul(),n=jl(o),a=n?.lastAiMessage||null;return Wl({api:e,stContext:s,character:r,conversation:n,targetAssistantMessage:a,runSource:t})}async function Ts({messageId:t,swipeId:e="",runSource:s="AUTO"}={}){let r=Lo(),o=r?.getContext?.()||null,n=await ra(),a=Ul(),i=jl(a),l=dp(i,{messageId:t,swipeId:e});return Wl({api:r,stContext:o,character:n,conversation:i,targetAssistantMessage:l,runSource:s})}var op,_s=U(()=>{ce();op=N.createScope("ExecutionContext")});var Kl={};re(Kl,{buildSelectedWorldbookContent:()=>Vs,default:()=>gp,getAvailableWorldbooks:()=>No,getCachedAvailableWorldbooks:()=>As,getLastWorldbookDiagnostics:()=>Do});function Fl(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return os()?.TavernHelper||null}function yp(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return os()?.SillyTavern||null}function Rr(t){return Array.isArray(t)?Array.from(new Set(t.map(e=>String(e||"").trim()).filter(Boolean))):[]}function oa(t){if(Array.isArray(t))return t.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(t&&typeof t=="object"){let e={};return Object.keys(t).forEach(s=>{let r=t[s];Array.isArray(r)?e[s]=r.map(o=>typeof o=="string"?o:o&&typeof o=="object"?o.name||o.id||o.title||"[object]":String(o??"")):r&&typeof r=="object"?e[s]="[object]":e[s]=r}),e}return t}function up(t={}){let e=typeof t.content=="string"?t.content.trim():"";if(!e)return"";let s=[t.comment,t.key,t.keysecondary,t.text].map(r=>String(r||"").trim()).find(Boolean);return s&&s!==e?`## ${s}
${e}`:e}function As(){return Array.isArray(na)?[...na]:[]}function Do(){return aa?{...aa}:null}async function pp(t){if(!t||typeof t.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(t.getCharLorebooks({type:"all"}));return Rr([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return Cr.warn("\u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function fp(t,e){if(t&&typeof t.getLorebooks=="function")try{let s=Rr(await Promise.resolve(t.getLorebooks()));if(s.length>0)return s}catch(s){Cr.warn("\u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",s)}if(e&&typeof e.getWorldBooks=="function")try{let s=await Promise.resolve(e.getWorldBooks()),r=Rr(Array.isArray(s)?s.map(o=>o?.name??o):[]);if(r.length>0)return r}catch(s){Cr.warn("\u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",s)}return[]}async function No(){let t=Fl(),e=yp(),s={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!os()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!os()?.SillyTavern,helperKeys:t?Object.keys(t).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof t?.getLorebooks,getCharLorebooksType:typeof t?.getCharLorebooks,getLorebookEntriesType:typeof t?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{s.rawResults.getLorebooks=t&&typeof t.getLorebooks=="function"?oa(await Promise.resolve(t.getLorebooks())):"[unavailable]"}catch(a){s.errors.push(`getLorebooks: ${a?.message||a}`)}try{s.rawResults.getCharLorebooks=t&&typeof t.getCharLorebooks=="function"?oa(await Promise.resolve(t.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(a){s.errors.push(`getCharLorebooks: ${a?.message||a}`)}try{s.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?oa(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(a){s.errors.push(`getWorldBooks: ${a?.message||a}`)}let r=await pp(t),o=await fp(t,e),n=Rr([...r,...o]);return s.characterWorldbooks=[...r],s.allWorldbooks=[...o],s.combinedWorldbooks=[...n],aa=s,na=n,[...n]}async function Vs(t){let e=Rr(t?.worldbooks?.selected);if(t?.worldbooks?.enabled!==!0||e.length===0)return"";let s=Fl();if(!s||typeof s.getLorebookEntries!="function")return Cr.warn("TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let r=[];for(let o of e)try{let n=await s.getLorebookEntries(o),i=(Array.isArray(n)?n.filter(l=>l?.enabled!==!1&&!l?.disable):[]).map(up).filter(Boolean).join(`

`);i&&r.push(`[\u4E16\u754C\u4E66\uFF1A${o}]
${i}`)}catch(n){Cr.warn(`\u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${o}`,n)}return r.join(`

---

`)}var Cr,na,aa,gp,$r=U(()=>{_s();ce();Cr=N.createScope("ToolWorldbookService"),na=[],aa=null;gp={getCachedAvailableWorldbooks:As,getLastWorldbookDiagnostics:Do,getAvailableWorldbooks:No,buildSelectedWorldbookContent:Vs}});var ql={};re(ql,{BypassManager:()=>Bo,DEFAULT_BYPASS_PRESETS:()=>jt,addMessage:()=>Rp,buildBypassMessages:()=>Dp,bypassManager:()=>X,createPreset:()=>_p,default:()=>Np,deleteMessage:()=>Pp,deletePreset:()=>Ep,duplicatePreset:()=>kp,exportPresets:()=>Op,getAllPresets:()=>Sp,getDefaultPresetId:()=>Ip,getEnabledMessages:()=>Cp,getPreset:()=>Tp,getPresetList:()=>Pr,importPresets:()=>Lp,setDefaultPresetId:()=>Mp,updateMessage:()=>$p,updatePreset:()=>Ap});function Hl(t){let e=String(t||"").trim().toLowerCase();return e==="system"?"SYSTEM":e==="assistant"||e==="ai"?"assistant":"USER"}function vp(t){return t&&typeof t=="object"&&typeof t.content=="string"&&!t.name&&!Array.isArray(t.messages)}function xp(t){return String(t||"").replace(/\$0/g,"{{toolContentMacro}}").replace(/\$1/g,"{{rawRecentMessagesText}}").replace(/\$4/g,"{{toolWorldbookContent}}").replace(/\$8/g,"{{userMessage}}").replace(/\$C/g,"{{characterCard}}")}function wp(t,e,s){let r=t.mainSlot||(t.isMain?"A":t.isMain2?"B":"");return{id:typeof t.id=="string"&&t.id.trim()?t.id.trim():`${s}_msg_${e+1}`,role:Hl(t.role),content:xp(t.content),enabled:t.enabled!==!1,deletable:t.deletable!==!1,...r?{mainSlot:r,isMain:r==="A",isMain2:r==="B"}:{}}}var mp,Ut,Js,ia,bp,jt,hp,Bo,X,Sp,Pr,Tp,_p,Ap,Ep,kp,Ip,Mp,Cp,Rp,$p,Pp,Op,Lp,Dp,Np,Xs=U(()=>{Ke();ke();ce();mp=N.createScope("BypassManager"),Ut="bypass_presets",Js="default_bypass_preset",ia="current_bypass_preset",bp=Object.freeze([{id:"table_fill_default_msg_1",role:"SYSTEM",content:"\u4F60\u662F\u4E00\u4E2A\u52A9\u624B\uFF0C\u8D1F\u8D23\u542C\u4ECE\u7528\u6237\u7684\u6307\u4EE4\u5B8C\u6210\u4F60\u7684\u5DE5\u4F5C",enabled:!0,deletable:!0},{id:"table_fill_default_msg_2",role:"assistant",content:"\u6536\u5230\uFF0C\u6211\u5C06\u5145\u5206\u63CF\u7ED8\u7528\u6237\u7684\u610F\u5FD7\uFF0C\u6BEB\u4E0D\u5077\u61D2\uFF0C\u5E76\u4E14\u6211\u4E00\u5B9A\u4F1A\u9075\u7167\u7528\u6237\u7684\u8981\u6C42",enabled:!0,deletable:!0},{id:"table_fill_default_msg_3",role:"USER",content:`\u4EE5\u4E0B\u662F\u4F60\u53EF\u80FD\u9700\u8981\u7528\u5230\u7684\u80CC\u666F\u8BBE\u5B9A\uFF0C\u6CE8\u610F\u4F60\u53EA\u9700\u8981\u5176\u4E2D\u5173\u4E8E\u5267\u60C5\u4EE5\u53CA\u4EBA\u8BBE\u65B9\u9762\u7684\u6570\u636E\uFF0C\u4E0D\u9700\u8981\u601D\u8003\u91CC\u8FB9\u9664\u6B64\u4E4B\u5916\u7684\u4EFB\u4F55\u683C\u5F0F\u6216\u8005\u601D\u7EF4\u94FE\u65B9\u9762\u7684\u8981\u6C42\uFF1A
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

{{userMessage}}`,enabled:!0,deletable:!1,mainSlot:"B",isMain2:!0},{id:"table_fill_default_msg_8",role:"assistant",content:"\u6536\u5230\u6307\u4EE4\uFF0C\u6211\u5C06\u4E00\u6B65\u4E00\u6B65\u5F00\u59CB\u601D\u8003\uFF0C\u5E76\u5B8C\u6210\u586B\u8868\uFF0C\u9996\u5148\u6211\u8981\u5206\u6790\u5F53\u524D\u8F6E\u6B21\u7684\u5267\u60C5\u53D8\u5316\u3002",enabled:!0,deletable:!0}]),jt={table_workbench_fill_default:{id:"table_workbench_fill_default",name:"\u9ED8\u8BA4\u586B\u8868 Ai \u6307\u4EE4\u9884\u8BBE",description:"\u7528\u4E8E\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u5185\u7F6E Ai \u6307\u4EE4\u9884\u8BBE\uFF0C\u53EF\u590D\u5236\u540E\u6309\u9700\u7F16\u8F91\u3002",enabled:!0,messages:bp.map(t=>({...t})),createdAt:0,updatedAt:0}},hp=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]);Bo=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=R.get(Ut,{});return this._cache={...jt,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((s,r)=>(r.updatedAt||0)-(s.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:s,name:r,description:o,messages:n}=e;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=s.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let i={id:a,name:r.trim(),description:o||"",enabled:!0,messages:n||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,i),L.emit(P.BYPASS_PRESET_CREATED,{presetId:a,preset:i}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${r}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,s){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let o={...r,...s,id:e,updatedAt:Date.now()};return this._savePreset(e,o),L.emit(P.BYPASS_PRESET_UPDATED,{presetId:e,preset:o}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u66F4\u65B0\u6210\u529F`,preset:o}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(jt[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r=R.get(Ut,{});return delete r[e],R.set(Ut,r),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),L.emit(P.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,s,r){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${e}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(o)),id:s.trim(),name:r||`${o.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),n),L.emit(P.BYPASS_PRESET_CREATED,{presetId:s,preset:n}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${n.name}"`,preset:n}}addMessage(e,s){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o={id:`msg_${Date.now()}`,role:Hl(s.role||"SYSTEM"),content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1,...s.mainSlot?{mainSlot:s.mainSlot}:{}},n=[...r.messages||[],o];return this.updatePreset(e,{messages:n})}updateMessage(e,s,r){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=o.messages||[],a=n.findIndex(l=>l.id===s);if(a===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let i=[...n];return i[a]={...i[a],...r},this.updatePreset(e,{messages:i})}deleteMessage(e,s){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=r.messages||[],n=o.find(i=>i.id===s);if(!n)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(n.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=o.filter(i=>i.id!==s);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let s=this.getPreset(e);return!s||!s.enabled?[]:(s.messages||[]).filter(r=>r.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=R.get(Js,null);return e==="undefined"||e==="null"||e===""?(R.remove(Js),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(R.set(Js,e),L.emit(P.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let r=this.getPreset(e);if(!r)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(e,s={}){let{overwrite:r=!1,name:o=""}=s,n;try{n=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let a=R.get(Ut,{}),l=Array.isArray(n)&&n.every(vp)?[{id:this._generatePresetId(o||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",a),name:o||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",description:"\u7531\u5916\u90E8\u586B\u8868\u63D0\u793A\u8BCD\u7EC4\u5BFC\u5165\u3002",enabled:!0,messages:n}]:Array.isArray(n)?n:n.presets?n.presets:[n];if(l.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let c=0;for(let d of l){let y=this._normalizePreset(d?.id,d,a);y&&(jt[y.id]&&!r||!r&&a[y.id]||(a[y.id]={...y,updatedAt:Date.now()},c++))}return c>0&&(R.set(Ut,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${c} \u4E2A\u9884\u8BBE`,imported:c}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let s=e?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(e){let s=this.getToolBypassPreset(e);return s?this.getEnabledMessages(s.id):[]}_savePreset(e,s){let r=R.get(Ut,{});r[e]=s,R.set(Ut,r),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=R.get(Ut,{}),s={},r=!1,o=Array.isArray(e)?e.map((n,a)=>[n?.id||n?.name||`legacy_${a}`,n]):Object.entries(e||{});for(let[n,a]of o){let i=this._normalizePreset(n,a,s);if(!i){r=!0;continue}s[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(r=!0)}r&&R.set(Ut,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(e,s,r={}){if(!s||typeof s!="object")return null;let o=typeof s.name=="string"?s.name.trim():"",n=typeof s.id=="string"?s.id.trim():"",a=typeof e=="string"?e.trim():"";if(!o&&a&&a!=="undefined"&&a!=="null"&&(o=a),this._isLegacySamplePreset(o,n)||(!n&&a&&a!=="undefined"&&a!=="null"&&(n=a),!n&&o&&o!=="undefined"&&o!=="null"&&(n=this._generatePresetId(o,r)),!o||!n||n==="undefined"||o==="undefined"))return null;let l=Array.isArray(s.messages)?s.messages.filter(c=>c&&typeof c=="object").map((c,d)=>wp(c,d,n)):[];return{...s,id:n,name:o,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:l,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(e){let s=R.get(Js,null),r=R.get(ia,null),o=s??r;(o==="undefined"||o==="null"||o==="")&&(o=null),o&&!e[o]&&(o=Object.values(e).find(a=>a.name===o)?.id||null),o?R.set(Js,o):R.remove(Js),R.has(ia)&&R.remove(ia)}_isLegacySamplePreset(e,s=""){return e?s==="standard"||s==="enhanced"||s==="jailbreak"||hp.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,s={}){let r=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,o=r,n=1;for(;s[o];)o=`${r}_${n++}`;return o}_log(...e){mp.debug(e[0],e.length>1?e.slice(1):void 0)}},X=new Bo,Sp=()=>X.getAllPresets(),Pr=()=>X.getPresetList(),Tp=t=>X.getPreset(t),_p=t=>X.createPreset(t),Ap=(t,e)=>X.updatePreset(t,e),Ep=t=>X.deletePreset(t),kp=(t,e,s)=>X.duplicatePreset(t,e,s),Ip=()=>X.getDefaultPresetId(),Mp=t=>X.setDefaultPresetId(t),Cp=t=>X.getEnabledMessages(t),Rp=(t,e)=>X.addMessage(t,e),$p=(t,e,s)=>X.updateMessage(t,e,s),Pp=(t,e)=>X.deleteMessage(t,e),Op=t=>X.exportPresets(t),Lp=(t,e)=>X.importPresets(t,e),Dp=t=>X.buildBypassMessages(t),Np=X});var Yl={};re(Yl,{DEFAULT_SETTINGS:()=>Or,SettingsService:()=>zo,default:()=>Bp,settingsService:()=>dt});var Or,la,zo,dt,Bp,Lr=U(()=>{Ke();ke();Or={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue",startupScreenDismissed:!1}},la="settings_v2",zo=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=R.get(la,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),R.set(la,this._cache),L.emit(P.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let s=this.getSettings(),r=this._deepMerge(s,e);this.saveSettings(r)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(Or)),R.set(la,this._cache),L.emit(P.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,s=null){let r=this.getSettings(),o=e.split("."),n=r;for(let a of o)if(n&&typeof n=="object"&&a in n)n=n[a];else return s;return n}set(e,s){let r=JSON.parse(JSON.stringify(this.getSettings())),o=e.split("."),n=r;for(let a=0;a<o.length-1;a+=1){let i=o[a];i in n||(n[i]={}),n=n[i]}n[o[o.length-1]]=s,this.saveSettings(r)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(Or)),e)}_deepMerge(e,s){let r={...e};for(let o in s)s[o]&&typeof s[o]=="object"&&!Array.isArray(s[o])?r[o]=this._deepMerge(e[o]||{},s[o]):r[o]=s[o];return r}},dt=new zo,Bp=dt});var Vl={};re(Vl,{ContextInjector:()=>Wo,DEFAULT_INJECTION_OPTIONS:()=>Gl,WRITEBACK_METHODS:()=>vt,WRITEBACK_RESULT_STATUS:()=>jo,contextInjector:()=>et,default:()=>Kp});function ca(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function zp(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Up(t){try{return t?.SillyTavern?.getContext?.()||null}catch{return null}}function jp(){let t=zp(),e=t?.SillyTavern||null,s=Up(t),r=e?.eventSource||t?.eventSource||s?.eventSource||null,o=e?.eventTypes||e?.event_types||s?.eventTypes||s?.event_types||t?.eventTypes||t?.event_types||{};return{topWindow:t,api:e,context:s,eventSource:r,eventTypes:o,source:e?.eventSource?"SillyTavern.eventSource":t?.eventSource?"topWindow.eventSource":s?.eventSource?"SillyTavern.getContext().eventSource":"unavailable"}}function Es(t,e){let s=String(e||"").trim();return s?Array.isArray(t)?(t.includes(s)||t.push(s),t):[s]:t}function Uo(t={}){if(t?.signal?.aborted)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE";if(typeof t?.shouldAbortWriteback=="function")try{if(t.shouldAbortWriteback()===!0)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}catch{return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}return""}var ze,Ye,Qs,Gl,jo,vt,Wp,Fp,Wo,et,Kp,ks=U(()=>{ke();ce();ze=N.createScope("ContextInjector"),Ye="YouYouToolkit_toolOutputs",Qs="YouYouToolkit_injectedContext",Gl={overwrite:!0,enabled:!0};jo={SUCCESS:"success",FAILED:"failed"},vt={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},Wp=60,Fp=3;Wo=class{constructor(){this.debugMode=!1}async inject(e,s,r={}){return(await this.injectDetailed(e,s,r)).success}async injectDetailed(e,s,r={}){let o={...Gl,...r},n=this._createWritebackResult(e,o);if(!e||s===void 0||s===null)return ze.error("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),n.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",n;if(!ca(o.sourceMessageId))return ze.error("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),n.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",n;if(o?.signal?.aborted)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",n;if(typeof o?.shouldAbortWriteback=="function")try{if(o.shouldAbortWriteback()===!0)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}catch{return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}let a=n.chatId,i={toolId:e,content:String(s),updatedAt:Date.now(),sourceMessageId:o.sourceMessageId||null,sourceSwipeId:o.sourceSwipeId||o.effectiveSwipeId||null,options:o};L.emit(P.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:i.content,sourceMessageId:i.sourceMessageId,sourceSwipeId:i.sourceSwipeId,effectiveSwipeId:i.sourceSwipeId,slotBindingKey:o.slotBindingKey||"",slotRevisionKey:o.slotRevisionKey||"",slotTransactionId:o.slotTransactionId||"",traceId:o.traceId||"",sessionKey:o.sessionKey||"",options:o});let l=await this._insertToolOutputToBoundAssistantSlot(e,i,o,n);return l.success&&ze.info(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,{inserted:l}),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:s}=this._getChatRuntime(),r=this._findAssistantMessageIndex(s,e);if(r<0)return"";let o=s[r]||{},n=o[Qs];if(typeof n=="string"&&n.trim())return n.trim();let a=o[Ye];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(s){return ze.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",{error:s}),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),s=this._findAssistantMessageIndex(e,null);if(s<0)return{};let o=(e[s]||{})[Ye];return o&&typeof o=="object"?o:{}}catch(e){return ze.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",{error:e}),{}}}getToolContext(e,s){if(!s)return null;try{let{chat:r}=this._getChatRuntime(),o=this._findAssistantMessageIndex(r,null);return o<0?null:r[o]?.[Ye]?.[s]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,s){if(!s)return!1;try{let{api:r,context:o,chat:n}=this._getChatRuntime(),a=this._findAssistantMessageIndex(n,null);if(a<0)return!1;let i=n[a],l=i?.[Ye];if(!l||!l[s])return!1;delete l[s],i[Ye]=l,i[Qs]=this._buildMessageInjectedContext(l);let c=o?.saveChat||r?.saveChat||null;return typeof c=="function"&&await c.call(o||r),L.emit(P.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:s}),!0}catch(r){return ze.warn("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:r}),!1}}async clearAllContext(e){try{let{api:s,context:r,chat:o}=this._getChatRuntime(),n=this._findAssistantMessageIndex(o,null);if(n<0)return!1;let a=o[n];delete a[Ye],delete a[Qs];let i=r?.saveChat||s?.saveChat||null;return typeof i=="function"&&await i.call(r||s),L.emit(P.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(s){return ze.warn("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:s}),!1}}clearAllChatsContexts(){ze.info("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,s){return!!this.getToolContext(e,s)}getContextSummary(e){let s=this._getLatestAssistantMessageOutputs(),r=Object.entries(s).map(([o,n])=>({toolId:o,updatedAt:n.updatedAt,contentLength:n.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:r,totalCount:r.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,s={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,s=e.SillyTavern||null,r=s?.getContext?.()||null,o=Array.isArray(r?.chat)?r.chat:[],n=Array.isArray(s?.chat)?s.chat:[],a=o.length?o:n;return{topWindow:e,api:s,context:r,chat:a,contextChat:o,apiChat:n}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,s={}){let r=vt.SET_CHAT_MESSAGES;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:s.traceId||"",sessionKey:s.sessionKey||"",sourceMessageId:s.sourceMessageId||null,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId||null,effectiveSwipeId:s.effectiveSwipeId||s.sourceSwipeId||null,slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:vt.NONE,commit:{preferredMethod:r,attemptedMethods:[],appliedMethod:vt.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:"",eventSource:"",eventName:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:jo.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(s=>setTimeout(s,e))}_collectWritebackVerification(e,s,r,o,n,a=null){let i=e?.contextChat?.[r]||e?.apiChat?.[r]||s?.[r]||a||null,l=this._getWritableMessageField(i).text||"",c=i?.[Ye]?.[o],d=n?l.includes(n):!0,y=!!(c&&String(c.content||"").trim()===n);return{latestMessage:i,latestText:l,textIncludesContent:d,mirrorStored:y}}async _confirmRefresh(e,s,r,o,n,a=null){let i=1,l=this._collectWritebackVerification(e,s,r,o,n,a);for(let c=0;c<Fp;c+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:i,confirmedBy:"text_and_mirror_present"};await this._wait(Wp),i+=1,l=this._collectWritebackVerification(e,s,r,o,n,a)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:i,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}async _requestAssistantMessageRefresh(e,s,r,o={},n=null){let a=n||this._createWritebackResult("",o),{api:i,context:l}=e||{},c=e?.topWindow||(typeof window.parent<"u"&&window.parent!==window?window.parent:window),d=c?.TavernHelper?.setChatMessages||l?.setChatMessages||i?.setChatMessages||c?.setChatMessages||null;a.commit.preferredMethod=typeof d=="function"?vt.SET_CHAT_MESSAGES:vt.LOCAL_ONLY;let y=!1,p=Uo(o);if(p)return a.error=p,a;if(typeof d=="function"){Es(a.commit.attemptedMethods,vt.SET_CHAT_MESSAGES);try{let u=Uo(o);if(u)return a.error=u,a;let f=ca(o.sourceMessageId)||s;await d([{message_id:f,message:r}],{refresh:"affected"}),a.steps.hostSetChatMessages=!0,a.hostUpdateMethod=vt.SET_CHAT_MESSAGES,a.hostCommitApplied=!0,a.commit.appliedMethod=vt.SET_CHAT_MESSAGES,a.commit.hostCommitApplied=!0,y=!0}catch(u){ze.error("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",{error:u}),a.errors.push(`setChatMessages: ${u?.message||String(u)}`)}}return y&&(a.refreshRequested=!0,Es(a.refresh.requestMethods,a.hostUpdateMethod)),y||(Es(a.commit.attemptedMethods,vt.LOCAL_ONLY),a.commit.appliedMethod=vt.LOCAL_ONLY,a.commit.fallbackUsed=!0,a.hostUpdateMethod=a.commit.appliedMethod),a}_inferBlockType(e){let s=String(e||"").trim();if(!s)return"empty";let r=s.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return r?.[1]?r[1]:"plain_text"}_stripExactStoredBlock(e,s,r=""){let o=String(e||""),n=String(s||"").trim(),a=String(r||"").trim();return n?o.includes(n)?a?{text:o.replace(n,a).trimEnd(),removed:!0,replaced:!0}:{text:o.replace(n,"").trimEnd(),removed:!0,replaced:!1}:{text:o,removed:!1,replaced:!1}:{text:o,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,s,r){let{contextChat:o,apiChat:n}=e||{},a=i=>{!Array.isArray(i)||s<0||s>=i.length||i[s]!==r&&(i[s]={...i[s]||{},...r})};a(o),a(n)}_notifyMessageUpdated(e,s,r={}){if(r.skipNotify===!0)return{emitted:!1,source:"skipped_by_caller",eventName:""};try{let o=jp(),n=o?.topWindow||e?.topWindow,a=o?.eventSource||null,i=o?.eventTypes||{},l=i.MESSAGE_UPDATED||i.message_updated||"MESSAGE_UPDATED";return a&&typeof a.emit=="function"?(a.emit(l,s),typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(()=>{a.emit(l,s)}):typeof n?.setTimeout=="function"&&n.setTimeout(()=>{a.emit(l,s)},30),{emitted:!0,source:o?.source||"unavailable",eventName:l}):{emitted:!1,source:o?.source||"unavailable",eventName:l}}catch(o){return ze.warn("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",{error:o}),{emitted:!1,source:"error",eventName:"",error:o?.message||String(o)}}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let s=String(e.role||"").toLowerCase();return s==="assistant"||s==="ai"||!s}_findAssistantMessageIndex(e,s){let r=Array.isArray(e)?e:[];if(!r.length)return-1;let o=s!=null&&s!=="",n=(a,i)=>{if(!this._isAssistantMessage(a)||s==null||s==="")return!1;let l=String(s).trim();return l?[a.message_id,a.id,a.messageId,a.mes_id,i].map(d=>d==null?"":String(d).trim()).includes(l):!1};for(let a=r.length-1;a>=0;a-=1)if(n(r[a],a))return a;if(o)return-1;for(let a=r.length-1;a>=0;a-=1)if(this._isAssistantMessage(r[a]))return a;return-1}_buildMessageInjectedContext(e){let r=Object.entries(e&&typeof e=="object"?e:{}).filter(([,n])=>n?.blockType!=="full_message").sort(([,n],[,a])=>(n?.updatedAt||0)-(a?.updatedAt||0));if(!r.length)return"";let o=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[n,a]of r)o.push(`[${n}]`),o.push(a?.content||""),o.push("");return o.join(`
`)}_getWritableMessageField(e){let s=["mes","message","content","text"];for(let r of s)if(typeof e?.[r]=="string")return{key:r,text:e[r]};return{key:"mes",text:""}}_applyMessageText(e,s,r={}){let o=e&&typeof e=="object"?e:{},n=["mes","message","content","text"],a=!1;if(n.forEach(i=>{typeof o[i]=="string"&&(o[i]=s,a=!0)}),a||(o.mes=s,o.message=s),Array.isArray(o.swipes)){let i=Number.parseInt(ca(r?.sourceSwipeId||r?.effectiveSwipeId),10),l=Number.isInteger(i)?i:Number.isInteger(o.swipe_id)?o.swipe_id:Number.isInteger(o.swipeId)?o.swipeId:0;l>=0&&l<o.swipes.length&&(o.swipes[l]=s,o.swipe_id=l,o.swipeId=l)}return o}_stripExistingToolOutput(e,s=[]){let r=String(e||"");return(Array.isArray(s)?s:[]).forEach(n=>{let a=String(n||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let d=new RegExp(a.slice(6).trim(),"gis");r=r.replace(d,"")}catch(d){ze.warn("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",{value:a,error:d})}return}let i=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),c=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");r=r.replace(l,""),r=r.replace(c,"")}),r.trimEnd()}_stripPreviousStoredToolContent(e,s){let r=String(e||""),o=String(s||"").trim();return o?r.replace(o,"").trimEnd():r.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,s,r={},o=null){let n=o||this._createWritebackResult(e,r);try{let a=this._getChatRuntime(),{context:i,chat:l}=a;if(!Array.isArray(l)||!l.length)return ze.error("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),n.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",n;let c=this._findAssistantMessageIndex(l,r.sourceMessageId);if(c<0)return ze.error("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),n.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",n;if(r?.signal?.aborted)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",n;if(typeof r?.shouldAbortWriteback=="function")try{if(r.shouldAbortWriteback()===!0)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}catch{return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}n.messageIndex=c,n.steps.foundTargetMessage=!0;let d=l[c],{key:y,text:p}=this._getWritableMessageField(d);n.textField=y;let u=d[Ye]&&typeof d[Ye]=="object"?d[Ye]:{},f=u?.[e]||{},h=f?.content||"",v=f?.blockText||h||"",w=Object.entries(u).filter(([Ae])=>Ae!==e).map(([,Ae])=>Ae||{}),S=String(s.content||"").trim(),_=r.replaceFullMessage===!0,W=_?"full_message":this._inferBlockType(S),C={toolId:e,messageId:r.sourceMessageId||d?.message_id||d?.messageId||c,blockType:W,insertedAt:s.updatedAt,replaceable:r.overwrite!==!1};n.blockIdentity=C;let T=r.overwrite===!1||_?{text:String(p||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(p,v,S),M=T.text,j="";!_&&r.overwrite!==!1&&v&&!T.removed&&(j="previous_block_not_found");let z=r.overwrite===!1||T.replaced||_?M:this._stripExistingToolOutput(M,r.extractionSelectors),$=z!==M;M=z;let q=r.overwrite===!1||T.replaced||_?M:this._stripPreviousStoredToolContent(M,h),ee=q!==M;M=q,n.replacedExistingBlock=_||T.removed||$||ee;let F=r.overwrite===!1?String(p||""):M,ne=_?S:T.replaced?M.trim():[F.trimEnd(),S].filter(Boolean).join(`

`).trim();n.insertedNewBlock=!!S;let ae=w.every(Ae=>{if(Ae?.blockType==="full_message")return!0;let Ot=String(Ae?.blockText||Ae?.content||"").trim();return Ot?ne.includes(Ot):!0});n.preservedOtherToolBlocks=ae,ae?j&&(n.conflictDetected=!0,n.conflictReason=j):(n.conflictDetected=!0,n.conflictReason="other_tool_block_removed");let te={...u,[e]:{toolId:e,content:S,blockText:S,blockType:W,blockIdentity:C,updatedAt:s.updatedAt,sourceMessageId:s.sourceMessageId||null}},Te=Uo(r);if(Te)return n.error=Te,n;d[y]=ne,this._applyMessageText(d,ne,r),d[Ye]=te,d[Qs]=this._buildMessageInjectedContext(te),n.contentCommitted=!0,n.commit.contentCommitted=!0,n.steps.contentCommitted=!0,n.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,c,d),n.steps.runtimeSynced=!0;let Pe=Uo(r);if(Pe)return n.error=Pe,n;await this._requestAssistantMessageRefresh(a,c,ne,r,n);let St=i?.saveChat||a?.api?.saveChat||null,me=i?.saveChatDebounced||a?.api?.saveChatDebounced||null;typeof me=="function"&&(me.call(i||api),n.steps.saveChatDebounced=!0,n.refreshRequested=!0,Es(n.refresh.requestMethods,"saveChatDebounced")),typeof St=="function"&&(await St.call(i||api),n.steps.saveChat=!0,n.refreshRequested=!0,Es(n.refresh.requestMethods,"saveChat"));let be=this._notifyMessageUpdated(a,c,r);n.steps.notifiedMessageUpdated=be?.emitted===!0,n.refresh.eventSource=be?.source||"",n.refresh.eventName=be?.eventName||"",be?.error&&n.errors.push(`MESSAGE_UPDATED: ${be.error}`);let Pt=String(s.content||"").trim();(n.steps.hostSetChatMessages||n.steps.hostSetChatMessage)&&(n.refreshRequested=!0,Es(n.refresh.requestMethods,n.hostUpdateMethod)),n.steps.notifiedMessageUpdated&&(n.refreshRequested=!0,Es(n.refresh.requestMethods,`MESSAGE_UPDATED:${n.refresh.eventName||"MESSAGE_UPDATED"}`)),n.steps.refreshRequested=n.refreshRequested,n.refresh.requested=n.refreshRequested;let Tt=await this._confirmRefresh(a,l,c,e,Pt,d);return n.verification.textIncludesContent=Tt.textIncludesContent,n.verification.mirrorStored=Tt.mirrorStored,n.verification.refreshConfirmed=Tt.refreshConfirmed,n.steps.verifiedAfterWrite=n.verification.textIncludesContent&&n.verification.mirrorStored,n.refreshConfirmed=n.verification.refreshConfirmed&&n.refreshRequested,n.refresh.confirmChecks=Number(Tt.confirmChecks)||0,n.refresh.confirmedBy=Tt.confirmedBy||"",n.refresh.confirmed=n.refreshConfirmed,n.steps.refreshConfirmed=n.refreshConfirmed,n.success=n.steps.localTextApplied&&n.steps.runtimeSynced&&n.steps.verifiedAfterWrite&&n.refreshConfirmed,n.writebackStatus=n.success?jo.SUCCESS:jo.FAILED,!n.success&&!n.error&&(n.error=n.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),n.conflictDetected&&!n.error&&(n.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${n.conflictReason}`),ze.info(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${c}`),n}catch(a){return ze.error("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",{error:a}),n.error=a?.message||String(a),n.errors.push(n.error),n}}getAssistantMessageSnapshot(e=null){try{let s=this._getChatRuntime(),{chat:r}=s,o=this._findAssistantMessageIndex(r,e);if(o<0)return null;let n=r[o]||null,a=this._getWritableMessageField(n).text||"",i=n?.[Ye]&&typeof n[Ye]=="object"?n[Ye]:{},l=Object.values(i).reduce((c,d)=>{let y=String(d?.blockText||d?.content||"").trim();return!y||!c.includes(y)?c:c.replace(y,"").trimEnd()},String(a||"")).trim();return{messageIndex:o,message:n,messageText:a,baseText:l,toolOutputs:i,injectedContext:typeof n?.[Qs]=="string"?n[Qs]:this._buildMessageInjectedContext(i)}}catch(s){return ze.warn("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",{error:s}),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext(),o=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(o)return o;let n=e.SillyTavern?.this_chid;if(n!=null)return`chat_char_${n}`}return"chat_default"}catch{return"chat_default"}}},et=new Wo,Kp=et});var Xl={};re(Xl,{BUILTIN_VARIABLES:()=>Jl,VariableResolver:()=>Fo,default:()=>qp,variableResolver:()=>Ge});var Hp,Jl,Fo,Ge,qp,Dr=U(()=>{ke();ce();Hp=N.createScope("VariableResolver"),Jl={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},Fo=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,s){if(typeof e!="string")return e;let r=e;return r=this._resolveBuiltinVariables(r,s),r=this._resolveCustomVariables(r,s),r=this._resolveRegexVariables(r,s),r}resolveObject(e,s){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(o=>this.resolveObject(o,s));let r={};for(let[o,n]of Object.entries(e))typeof n=="string"?r[o]=this.resolveTemplate(n,s):typeof n=="object"&&n!==null?r[o]=this.resolveObject(n,s):r[o]=n;return r}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,s){e&&(this.customVariables.set(e,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,s){!e||typeof s!="function"||(this.variableHandlers.set(e,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,s]of Object.entries(Jl))e.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,r]of this.customVariables)e.push({name:`{{${s}}}`,description:typeof r=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},r={};for(let o of this.getAvailableVariables())r[o.category]||(r[o.category]=[]),r[o.category].push(o);for(let[o,n]of Object.entries(s))if(r[o]&&r[o].length>0){e.push(`\u3010${n}\u3011`);for(let a of r[o])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,s)=>(s.regexResults||s.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,s){let r=e;return r=r.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),r=r.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),r=r.replace(/\{\{chatHistory\}\}/gi,()=>{let o=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(o)}),r=r.replace(/\{\{characterCard\}\}/gi,()=>{let o=s.characterCard||s.raw?.characterCard;return o?this._formatCharacterCard(o):""}),r=r.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),r=r.replace(/\{\{toolId\}\}/gi,s.toolId||s.raw?.toolId||""),r=r.replace(/\{\{toolPromptMacro\}\}/gi,s.toolPromptMacro||s.raw?.toolPromptMacro||""),r=r.replace(/\{\{toolContentMacro\}\}/gi,s.toolContentMacro||s.raw?.toolContentMacro||""),r=r.replace(/\{\{toolWorldbookContent\}\}/gi,s.toolWorldbookContent||s.raw?.toolWorldbookContent||""),r=r.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),r=r.replace(/\{\{extractedContent\}\}/gi,s.extractedContent||s.raw?.extractedContent||""),r=r.replace(/\{\{recentMessagesText\}\}/gi,s.recentMessagesText||s.raw?.recentMessagesText||""),r=r.replace(/\{\{rawRecentMessagesText\}\}/gi,s.rawRecentMessagesText||s.raw?.rawRecentMessagesText||""),r=r.replace(/\{\{userMessage\}\}/gi,s.userMessage||s.raw?.userMessage||""),r=r.replace(/\{\{previousToolOutput\}\}/gi,s.previousToolOutput||s.raw?.previousToolOutput||""),r}_resolveCustomVariables(e,s){let r=e;for(let[o,n]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(o)}\\}\\}`,"gi");typeof n=="function"?r=r.replace(a,()=>{try{return n(s)}catch(i){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}:`,i),""}}):r=r.replace(a,String(n))}return r}_resolveRegexVariables(e,s){let r=e;for(let[o,n]of this.variableHandlers){let a=new RegExp(`\\{\\{${o}\\.([^}]+)\\}\\}`,"gi");r=r.replace(a,(i,l)=>{try{return n(l,s)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}.${l}:`,c),""}})}return r}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(s=>{let r=s.role||"unknown",o=s.content||s.mes||"";return`[${r}]: ${o}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let s=[];return e.name&&s.push(`\u59D3\u540D: ${e.name}`),e.description&&s.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&s.push(`\u6027\u683C: ${e.personality}`),e.scenario&&s.push(`\u573A\u666F: ${e.scenario}`),s.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){Hp.debug(e[0],e.length>1?e.slice(1):void 0)}},Ge=new Fo,qp=Ge});var Zl={};re(Zl,{DEFAULT_PROMPT_TEMPLATE:()=>Ql,ToolPromptService:()=>Ko,default:()=>Gp,toolPromptService:()=>Is});var Yp,Ql,Ko,Is,Gp,Ho=U(()=>{ke();Xs();Dr();$r();ce();Yp=N.createScope("ToolPromptService"),Ql="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",Ko=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,s={}){let r=this._getPromptTemplate(e),o=String(s?.toolWorldbookContent||s?.input?.toolWorldbookContent||await Vs(e)).trim(),n=Ge.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolWorldbookContent:o}),a=Ge.resolveTemplate(r,n).trim(),i=String(s?.toolContentMacro||s?.input?.toolContentMacro||"").trim();return Ge.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolPromptMacro:a,toolContentMacro:i,toolWorldbookContent:o})}async buildToolMessages(e,s){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let r=[],o=await this._buildVariableContext(e,s),n=Array.isArray(e.promptMessages)?e.promptMessages:[],a=this._getBypassMessages(e),i=a?.some(l=>l.mainSlot==="A"||l.mainSlot==="B"||l.isMain||l.isMain2);if(a&&a.length>0)for(let l of a)l.enabled!==!1&&r.push({role:this._normalizeRole(l.role),content:Ge.resolveTemplate(l.content||"",o)});if(!i&&n.length>0)for(let l of n){let c=Ge.resolveTemplate(l?.content||"",o).trim();c&&r.push({role:this._normalizeRole(l?.role),content:c})}else if(!i&&!a?.length){let l=this._buildUserContent(this._getPromptTemplate(e),o);l&&r.push({role:"user",content:l})}return this._log(`\u6784\u5EFA\u6D88\u606F: ${r.length} \u6761`),r}async buildPromptText(e,s){let r=await this._buildVariableContext(e,s),o=Array.isArray(e?.promptMessages)?e.promptMessages:[];return o.length>0?o.map(n=>Ge.resolveTemplate(n?.content||"",r).trim()).filter(Boolean).join(`

`):r.toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:Ql}_getBypassMessages(e){return e.bypass?.enabled?X.buildBypassMessages(e):[]}_buildUserContent(e,s){return!e||!e.trim()?"":Ge.resolveTemplate(e,s).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){Yp.debug(e[0],e.length>1?e.slice(1):void 0)}setDebugMode(e){this.debugMode=e}},Is=new Ko,Gp=Is});var tc={};re(tc,{LEGACY_OUTPUT_MODES:()=>Vp,OUTPUT_MODES:()=>yt,TOOL_FAILURE_STAGES:()=>Re,TOOL_RUNTIME_STATUS:()=>Jp,TOOL_WRITEBACK_STATUS:()=>_e,ToolOutputService:()=>qo,default:()=>Xp,toolOutputService:()=>Ct});function ec(t){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}function Zs(t=[],e="",s=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!s,contentCommitted:!!s?.contentCommitted,hostCommitApplied:!!s?.hostCommitApplied,writebackStatus:s?.writebackStatus||"",preferredCommitMethod:s?.commit?.preferredMethod||"",appliedCommitMethod:s?.commit?.appliedMethod||"",fallbackUsed:!!s?.commit?.fallbackUsed},refresh:{requested:!!s?.refreshRequested,confirmed:!!s?.refreshConfirmed,requestMethods:Array.isArray(s?.refresh?.requestMethods)?[...s.refresh.requestMethods]:[],confirmChecks:Number(s?.refresh?.confirmChecks)||0,confirmedBy:s?.refresh?.confirmedBy||""}}}var Ms,yt,Vp,Jp,Re,_e,qo,Ct,Xp,Yo=U(()=>{ke();Lr();ce();ks();Ho();_r();mr();Ms=N.createScope("ToolOutputService"),yt={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},Vp={inline:"follow_ai"},Jp={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},Re={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},_e={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};qo=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===yt.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let s=e.output?.mode;return s===yt.FOLLOW_AI||s==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,s){let r=Date.now(),o=e.id,n=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=s?.sessionKey||"",i=s?.executionKey||"",l=this._getExtractionSelectors(e),c=e.output?.apiPreset||e.apiPreset||"",d="",y=_e.NOT_APPLICABLE,p=null,u=[],f="";Ms.info(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${o}`),L.emit(P.TOOL_EXECUTION_STARTED,{toolId:o,traceId:n,sessionKey:a,mode:yt.POST_RESPONSE_API});try{if(d=Re.BUILD_MESSAGES,u=await this._buildToolMessages(e,s),!u||u.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");Ms.debug(`\u6784\u5EFA\u4E86 ${u.length} \u6761\u6D88\u606F`);let h=ec(s);if(h){let W=Date.now()-r;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:W,meta:{traceId:n,sessionKey:a,executionKey:i,sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",selectors:l,apiPreset:c,writebackStatus:y,failureStage:d,writebackDetails:p,aborted:h.aborted===!0,stale:h.stale===!0,abortReason:h.reason||"",phases:Zs(u,f,p)}}}let v=await this._getRequestTimeout();d=Re.SEND_API_REQUEST;let w=await this._sendApiRequest(c,u,{timeoutMs:v,signal:s.signal});d=Re.EXTRACT_OUTPUT,f=this._extractOutputContent(w,e);let S=ec(s);if(S){let W=Date.now()-r;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:W,meta:{traceId:n,sessionKey:a,executionKey:i,sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",selectors:l,apiPreset:c,writebackStatus:y,failureStage:d,writebackDetails:p,aborted:S.aborted===!0,stale:S.stale===!0,abortReason:S.reason||"",phases:Zs(u,f,p)}}}if(f){if(d=Re.INJECT_CONTEXT,p=await et.injectDetailed(o,f,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.sourceMessageId||s.confirmedAssistantMessageId||s.messageId||"",sourceSwipeId:s.sourceSwipeId||s.confirmedAssistantSwipeId||s.effectiveSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||s.confirmedAssistantSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",extractionSelectors:l,traceId:n,sessionKey:a,signal:s.signal,shouldAbortWriteback:s.shouldAbortWriteback,isAutoRun:s.isAutoRun===!0,skipNotify:s.skipNotify===!0}),!p?.success)throw y=_e.FAILED,new Error(p?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");y=_e.SUCCESS}else y=_e.SKIPPED_EMPTY_OUTPUT;d="";let _=Date.now()-r;return L.emit(P.TOOL_EXECUTED,{toolId:o,traceId:n,sessionKey:a,success:!0,duration:_,mode:yt.POST_RESPONSE_API}),Ms.info(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${o}, \u8017\u65F6 ${_}ms`),{success:!0,toolId:o,output:f,duration:_,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:u.length,selectors:l,apiPreset:c,writebackStatus:y,failureStage:"",writebackDetails:p,phases:Zs(u,f,p)}}}catch(h){let v=Date.now()-r,w=d||Re.UNKNOWN,S=y||_e.NOT_APPLICABLE;return Ms.error(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${o}`,{error:h}),L.emit(P.TOOL_EXECUTION_FAILED,{toolId:o,traceId:n,sessionKey:a,error:h.message||String(h),duration:v}),{success:!1,toolId:o,error:h.message||String(h),duration:v,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:u.length,selectors:l,apiPreset:c,writebackStatus:S,failureStage:w,writebackDetails:p,phases:Zs(u,f,p)}}}}async runToolFollowAiManual(e,s){let r=Date.now(),o=e.id,n=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=s?.sessionKey||"",i=s?.executionKey||"",l=e.output?.apiPreset||e.apiPreset||"",c=this._getExtractionSelectors(e),d="",y=_e.NOT_APPLICABLE,p=null,u=[],f="";L.emit(P.TOOL_EXECUTION_STARTED,{toolId:o,traceId:n,sessionKey:a,mode:yt.FOLLOW_AI});try{if(d=Re.BUILD_MESSAGES,u=await this._buildToolMessages(e,s),!u||u.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");let h=await this._getRequestTimeout();d=Re.SEND_API_REQUEST;let v=await this._sendApiRequest(l,u,{timeoutMs:h,signal:s.signal});if(d=Re.EXTRACT_OUTPUT,f=this._extractOutputContent(v,e),f){if(d=Re.INJECT_CONTEXT,p=await et.injectDetailed(o,f,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.sourceMessageId||s.confirmedAssistantMessageId||s.messageId||"",sourceSwipeId:s.sourceSwipeId||s.confirmedAssistantSwipeId||s.effectiveSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||s.confirmedAssistantSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",extractionSelectors:c,traceId:n,sessionKey:a}),!p?.success)throw y=_e.FAILED,new Error(p?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");y=_e.SUCCESS}else y=_e.SKIPPED_EMPTY_OUTPUT;d="";let w=Date.now()-r;return L.emit(P.TOOL_EXECUTED,{toolId:o,traceId:n,sessionKey:a,success:!0,duration:w,mode:yt.FOLLOW_AI}),{success:!0,toolId:o,output:f,duration:w,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:u.length,selectors:c,apiPreset:l,writebackStatus:y,failureStage:"",writebackDetails:p,phases:Zs(u,f,p)}}}catch(h){let v=Date.now()-r,w=d||Re.UNKNOWN,S=y||_e.NOT_APPLICABLE;return L.emit(P.TOOL_EXECUTION_FAILED,{toolId:o,traceId:n,sessionKey:a,error:h.message||String(h),duration:v,mode:yt.FOLLOW_AI}),{success:!1,toolId:o,error:h.message||String(h),duration:v,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:u.length,selectors:c,apiPreset:l,writebackStatus:S,failureStage:w,writebackDetails:p,phases:Zs(u,f,p)}}}}async runToolInline(e,s){return this.runToolFollowAiManual(e,s)}async previewExtraction(e,s){return{success:!0,...this.getExtractionSnapshot(e,s)}}getExtractionSnapshot(e,s){let r=this._buildRecentMessageExtractionEntries(e,s),o=this._joinMessageBlocks(r,"rawText"),n=this._joinMessageBlocks(r,"filteredText"),a=this._joinMessageBlocks(r,"extractedText",{skipEmpty:!0}),i=(Array.isArray(r)?r:[]).map(c=>String(c?.extractedText||"").trim()).filter(Boolean).join(`

`),l=Array.isArray(r)&&r.length>0?r[r.length-1]:null;return{sourceText:o,filteredSourceText:n,extractedText:a,extractedRawText:i,messageEntries:r,primaryEntry:l,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,s){let r=this._buildRecentMessageExtractionEntries(e,s),o=this._joinMessageBlocks(r,"rawText"),n=this._joinMessageBlocks(r,"filteredText"),a=this._joinMessageBlocks(r,"extractedText",{skipEmpty:!0}),i={...s,rawRecentMessagesText:o,recentMessagesText:n,extractedContent:a,toolContentMacro:this._buildToolContentMacro(r),toolName:e.name,toolId:e.id};return Is.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let s=String(e).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,s,r={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:o=9e4,signal:n}=r,a=null;if(e){if(!fr(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=pr(e)}else a=pr();let i=Us(a||{});if(!i.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:o,apiConfig:a},n);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return dt.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,s){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,s);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,s);if(e.content)return this._applyOutputExtractionSelectors(e.content,s);if(e.text)return this._applyOutputExtractionSelectors(e.text,s);if(e.message)return this._applyOutputExtractionSelectors(e.message,s);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),s)}catch{return this._applyOutputExtractionSelectors(String(e),s)}}return this._applyOutputExtractionSelectors(String(e),s)}_applyOutputExtractionSelectors(e,s){let r=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(s);if(!o.length)return r.trim();let n=[];for(let a of o){let i=String(a||"").trim();if(!i)continue;if(i.startsWith("regex:")){let c=i.slice(6).trim();if(!c)continue;try{let d=new RegExp(c,"gi");[...r.matchAll(d)].forEach(p=>{let u=String(p?.[0]||"").trim();u&&n.push(u)})}catch(d){Ms.warn("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:d})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(r.match(c)||[]).forEach(y=>{let p=String(y||"").trim();p&&n.push(p)})}catch(c){Ms.warn("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}}return n.length>0?n.join(`

`).trim():r.trim()}_getExtractionSelectors(e){let s=e?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(r=>String(r||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(r=>String(r||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,s){return this._applyExtractionSelectorsInternal(e,s,{strict:!1})}_applyExtractionSelectorsInternal(e,s,r={}){let o=typeof e=="string"?e:String(e||""),n=this._getExtractionSelectors(s),{strict:a=!1}=r;if(!n.length)return o.trim();let i=n.map((c,d)=>{let y=String(c||"").trim(),p=y.startsWith("regex:");return{id:`tool-extract-${d}`,type:p?"regex_include":"include",value:p?y.slice(6).trim():y,enabled:!0}}).filter(c=>c.value),l=Bt(o,i,[]);return a?(l||"").trim():l||o.trim()}_extractToolContent(e,s){let r=typeof s=="string"?s:String(s||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(r,e,{strict:!0}):r.trim()}_applyGlobalContextRules(e){let s=typeof e=="string"?e:String(e||"");if(!s.trim())return"";try{let r=ht()||[],o=zt()||[];return!Array.isArray(r)||r.length===0?s.trim():Bt(s,r,o)||s.trim()}catch(r){return Ms.warn("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",{error:r}),s.trim()}}_getMessageText(e){if(!e)return"";let s=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let r of s)if(typeof r=="string"&&r.trim())return r.trim();return""}_collectRecentAssistantMessages(e,s){return this._collectRecentAssistantMessageEntries(e,s).map(r=>r.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,s){let r=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),o=Array.isArray(s?.chatMessages)?s.chatMessages:[],n=[];for(let i=o.length-1;i>=0&&n.length<r;i-=1){let l=o[i],c=String(l?.role||"").toLowerCase(),d=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,y=this._getMessageText(l);d&&y&&n.unshift({text:y,message:l,chatIndex:i})}if(n.length>0)return n;let a=s?.lastAiMessage||s?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,s){return this._collectRecentAssistantMessageEntries(e,s).map((o,n)=>{let a=o.text||"",i=this._applyGlobalContextRules(a),l=this._extractToolContent(e,a);return{...o,order:n+1,rawText:a,filteredText:i,extractedText:l,fullMessageText:a}})}_joinMessageBlocks(e,s,r={}){let o=Array.isArray(e)?e:[],{skipEmpty:n=!1}=r;return o.map(i=>{let l=String(i?.[s]||"").trim();return n&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(o=>{let n=`\u3010\u7B2C ${o?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(o?.filteredText||"").trim()||"(\u7A7A)",i=String(o?.extractedText||"").trim()||"(\u7A7A)";return`${n}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)?s?.automation?.enabled===!0:!1):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(e){this.debugMode=e}},Ct=new qo,Xp=Ct});function rc(t={}){return!t||typeof t!="object"?{}:Object.entries(t).reduce((e,[s,r])=>(e[s]=r===!0,e),{})}function ef(t,e={}){let s=e?.direction==="unescape"?"unescape":"escape",r=rc(e?.options);return Qp.reduce((o,n)=>r[n.key]!==!0?o:s==="unescape"?o.replace(n.escaped,n.unescaped):o.replace(n.plain,n.replacement),String(t||""))}function tf(t,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(t||"");let r=rc(e?.options);return Zp.reduce((o,n)=>r[n.key]!==!0?o:o.replace(n.from,n.to),String(t||""))}function oc(t,e){let s=t?.processor||{},r=s?.type||"",o=String(e||"");switch(r){case sc.ESCAPE_TRANSFORM:return ef(o,s);case sc.PUNCTUATION_TRANSFORM:return tf(o,s);default:return o}}var Qp,Zp,sc,nc=U(()=>{Qp=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],Zp=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],sc={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var ya={};re(ya,{abortAllTasks:()=>af,abortTask:()=>nf,buildToolMessages:()=>lc,clearExecutionHistory:()=>uf,createExecutionContext:()=>mf,createResult:()=>Go,enhanceMessagesWithBypass:()=>bf,executeBatch:()=>of,executeTool:()=>ic,executeToolWithConfig:()=>cc,executeToolsBatch:()=>xf,executorState:()=>xe,extractFailed:()=>gf,extractSuccessful:()=>ff,generateTaskId:()=>Cs,getExecutionHistory:()=>yf,getExecutorStatus:()=>df,getScheduler:()=>er,mergeResults:()=>pf,pauseExecutor:()=>lf,resumeExecutor:()=>cf,setMaxConcurrent:()=>rf});function Go(t,e,s,r,o,n,a=0){return{success:s,taskId:t,toolId:e,data:r,error:o,duration:n,retries:a,timestamp:Date.now(),metadata:{}}}function Cs(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function sf(t,e={}){return{id:Cs(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function er(){return Nr||(Nr=new da(xe.maxConcurrent)),Nr}function rf(t){xe.maxConcurrent=Math.max(1,Math.min(10,t)),Nr&&(Nr.maxConcurrent=xe.maxConcurrent)}async function ic(t,e={},s){let r=er(),o=sf(t,e);for(;xe.isPaused;)await new Promise(n=>setTimeout(n,100));try{let n=await r.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},o);return ac(n),n}catch(n){let a=Go(o.id,t,!1,null,n,Date.now()-o.createdAt,o.retries);return ac(a),a}}async function of(t,e={}){let{failFast:s=!1,concurrency:r=xe.maxConcurrent}=e,o=[],n=er(),a=n.maxConcurrent;n.maxConcurrent=r;try{let i=t.map(({toolId:l,options:c,executor:d})=>ic(l,c,d));if(s)for(let l of i){let c=await l;if(o.push(c),!c.success){n.abortAll();break}}else{let l=await Promise.allSettled(i);for(let c of l)c.status==="fulfilled"?o.push(c.value):o.push(Go(Cs(),"unknown",!1,null,c.reason,0,0))}}finally{n.maxConcurrent=a}return o}function nf(t){return er().abort(t)}function af(){er().abortAll(),xe.executionQueue=[]}function lf(){xe.isPaused=!0}function cf(){xe.isPaused=!1}function df(){return{...er().getStatus(),isPaused:xe.isPaused,activeControllers:xe.activeControllers.size,historyCount:xe.executionHistory.length}}function ac(t){xe.executionHistory.push(t),xe.executionHistory.length>100&&xe.executionHistory.shift()}function yf(t={}){let e=[...xe.executionHistory];return t.toolId&&(e=e.filter(s=>s.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(s=>s.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function uf(){xe.executionHistory=[]}function pf(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of t)e.totalDuration+=s.duration,s.success?(e.successCount++,s.data!==void 0&&s.data!==null&&e.data.push(s.data)):(e.success=!1,e.failureCount++,s.error&&e.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return e}function ff(t){return t.filter(e=>e.success).map(e=>e.data)}function gf(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function mf(t={}){return{taskId:Cs(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function bf(t,e){return!e||e.length===0?t:[...e,...t]}function hf(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function lc(t,e){let s=[],r=t.promptTemplate||"",o={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[n,a]of Object.entries(o))r=r.replace(new RegExp(hf(n),"g"),a);return s.push({role:"USER",content:r}),s}async function cc(t,e,s={}){let r=pe(t);if(!r)return{success:!1,taskId:Cs(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!r.enabled)return{success:!1,taskId:Cs(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let o=Date.now(),n=Cs();try{L.emit(P.TOOL_EXECUTION_STARTED,{toolId:t,taskId:n,context:e});let a=lc(r,e);if(typeof s.callApi=="function"){let i=r.output?.apiPreset||r.apiPreset||"",l=i?{preset:i}:null,c=await s.callApi(a,l,s.signal),d=c;r.outputMode==="separate"&&r.extractTags?.length>0&&(d=vf(c,r.extractTags));let y={success:!0,taskId:n,toolId:t,data:d,duration:Date.now()-o};return L.emit(P.TOOL_EXECUTED,{toolId:t,taskId:n,result:y}),y}else return{success:!0,taskId:n,toolId:t,data:{messages:a,config:{apiPreset:r.output?.apiPreset||r.apiPreset||"",outputMode:r.outputMode,extractTags:r.extractTags}},duration:Date.now()-o,needsExecution:!0}}catch(a){let i={success:!1,taskId:n,toolId:t,error:a.message||String(a),duration:Date.now()-o};return L.emit(P.TOOL_EXECUTION_FAILED,{toolId:t,taskId:n,error:a}),i}}function vf(t,e){let s={};for(let r of e){let o=new RegExp(`<${r}[^>]*>([\\s\\S]*?)<\\/${r}>`,"gi"),n=t.match(o);n&&(s[r]=n.map(a=>{let i=a.match(new RegExp(`<${r}[^>]*>([\\s\\S]*?)<\\/${r}>`,"i"));return i?i[1].trim():""}))}return s}async function xf(t,e,s={}){let r=[];for(let o of t){let n=pe(o);if(n&&n.enabled){let a=await cc(o,e,s);r.push(a)}}return r}var xe,da,Nr,ua=U(()=>{rs();ke();xe={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};da=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,s){return new Promise((r,o)=>{this.queue.push({executor:e,task:s,resolve:r,reject:o}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:s,task:r,resolve:o,reject:n}=e,a=new AbortController;r.abortController=a,r.status="running",r.startedAt=Date.now(),this.running.set(r.id,r),xe.activeControllers.set(r.id,a),this.executeTask(s,r,a.signal).then(i=>{r.status="completed",r.completedAt=Date.now(),o(i)}).catch(i=>{r.status=i.name==="AbortError"?"aborted":"failed",r.completedAt=Date.now(),n(i)}).finally(()=>{this.running.delete(r.id),xe.activeControllers.delete(r.id),xe.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,s,r){let o=Date.now(),n=null;for(let a=0;a<=s.maxRetries;a++){if(r.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(r);return Go(s.id,s.toolId,!0,i,null,Date.now()-o,a)}catch(i){if(n=i,i.name==="AbortError")throw i;a<s.maxRetries&&(await this.delay(1e3*(a+1)),s.retries=a+1)}}throw n}delay(e){return new Promise(s=>setTimeout(s,e))}abort(e){let s=xe.activeControllers.get(e);return s?(s.abort(),!0):!1}abortAll(){for(let e of xe.activeControllers.values())e.abort();xe.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},Nr=null});async function Sf(){return pa||(pa=Promise.resolve().then(()=>(ua(),ya))),pa}async function Tf(t,e,s){return s&&t.output?.mode===yt.POST_RESPONSE_API?Ct.runToolPostResponse(t,e):s&&t.output?.mode===yt.FOLLOW_AI?Ct.runToolFollowAiManual(t,e):(await Sf()).executeToolWithConfig(t.id,e)}function _f(t,e){return e?.runSource==="MANUAL"?t.output?.mode==="local_transform"||t.processor?.type?Rs.MANUAL_LOCAL_TRANSFORM:t.output?.mode===yt.POST_RESPONSE_API?Rs.MANUAL_POST_RESPONSE_API:Rs.MANUAL_COMPATIBILITY:Rs.MANUAL_POST_RESPONSE_API}function Vo(t,e){try{sa(t,e)}catch(s){wf.warn("\u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",{toolId:t,error:s})}}function Af(t,e,s){let r=String(t||""),o=String(e||"").trim(),n=String(s||"").trim();return!r.trim()||!o?{nextMessageText:"",replaced:!1}:r.includes(o)?{nextMessageText:r.replace(o,n).trim(),replaced:!0}:{nextMessageText:"",replaced:!1}}async function Ef(t,e){let s=Ct.getExtractionSnapshot(t,e),r=s?.primaryEntry||null,o=String(r?.fullMessageText||e?.lastAiMessage||"").trim(),n=String(r?.extractedText||s?.extractedRawText||s?.extractedText||"").trim(),a=Array.isArray(s?.selectors)?s.selectors:[],i=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l=e?.sessionKey||"";if(!n||!o)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:_e.NOT_APPLICABLE,failureStage:Re.EXTRACT_OUTPUT,extraction:s}};let c=String(oc(t,n)||"").trim(),d=Af(o,n,c),y=d.replaced?d.nextMessageText:c,p=null,u=_e.NOT_APPLICABLE;if(y){if(p=await et.injectDetailed(t.id,y,{overwrite:!0,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:[],replaceFullMessage:d.replaced,traceId:i,sessionKey:l}),!p?.success)return{success:!1,error:p?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:_e.FAILED,failureStage:Re.INJECT_CONTEXT,writebackDetails:p,extraction:s}};u=_e.SUCCESS}else u=_e.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:c,meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:u,failureStage:"",writebackDetails:p,extraction:s}}}async function kf(t,e){let s=Date.now(),r=t.id,o=`yyt-tool-run-${r}`,n=_f(t,e),a=e?.executionKey||"";Vo(r,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),Q("info",`\u6B63\u5728\u624B\u52A8\u6267\u884C ${t.name}`,{sticky:!0,noticeId:o});try{let i=n===Rs.MANUAL_LOCAL_TRANSFORM?await Ef(t,e):await Tf(t,e,!0),l=Date.now()-s;if(i?.success){let p=pe(r),u=i?.meta?.writebackDetails||{};return Vo(r,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(p?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:i?.meta?.writebackStatus||_e.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),E("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`),Q("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,{duration:3200,noticeId:o}),{success:!0,duration:l,result:i}}let c=pe(r),d=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",y=i?.meta?.writebackDetails||{};return Vo(r,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:i?.meta?.writebackStatus||_e.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||(n===Rs.MANUAL_COMPATIBILITY?Re.COMPATIBILITY_EXECUTE:Re.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!y.contentCommitted,lastHostCommitApplied:!!y.hostCommitApplied,lastRefreshRequested:!!y.refreshRequested,lastRefreshConfirmed:!!y.refreshConfirmed,lastPreferredCommitMethod:y?.commit?.preferredMethod||"",lastAppliedCommitMethod:y?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(y?.refresh?.requestMethods)?y.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(y?.refresh?.requestMethods)?[...y.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(y?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:y?.refresh?.confirmedBy||""}),E("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),Q("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),{success:!1,duration:l,error:d,result:i}}catch(i){let l=Date.now()-s,c=pe(r),d=i?.message||String(i);throw Vo(r,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:_e.NOT_APPLICABLE,lastFailureStage:n===Rs.MANUAL_COMPATIBILITY?Re.COMPATIBILITY_EXECUTE:Re.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),E("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),Q("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),i}}async function Jo(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=pe(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return ss(t,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:_e.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),Q("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let s=await Ss({runSource:"MANUAL"});return kf(e,s)}async function Xo(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=pe(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await Ss({runSource:"MANUAL_PREVIEW"});return Ct.previewExtraction(e,s)}var wf,Rs,pa,fa=U(()=>{rs();Yo();_s();ks();nc();Ce();ce();wf=N.createScope("ToolTrigger"),Rs={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},pa=null});var dc={};re(dc,{TOOL_CONFIG_PANEL_STYLES:()=>tr,createToolConfigPanel:()=>ns,default:()=>If});function ns(t){let{id:e,toolId:s,postResponseHint:r,extractionPlaceholder:o,previewDialogId:n,previewTitle:a="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",toolKindLabel:i="AI \u5DE5\u5177"}=t;return{id:e,toolId:s,renderSessionId:0,_beginRenderSession(l){return this.renderSessionId=(this.renderSessionId||0)+1,K(l)&&l.data("yytRenderSessionId",this.renderSessionId),this.renderSessionId},_isRenderSessionActive(l,c){return K(l)&&l.data("yytRenderSessionId")===c},_renderIfSessionActive(l,c){return this._isRenderSessionActive(l,c)?(this.renderTo(l),!0):!1},render(){let l=pe(this.toolId);if(!l)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let c=this._getApiPresets(),d=l.output?.apiPreset||l.apiPreset||"",y=this._getBypassPresets(),p=l.output?.mode||"follow_ai",u=l.bypass?.enabled||!1,f=l.bypass?.presetId||"",h=l.runtime?.lastStatus||"idle",v=l.runtime?.lastRunAt?new Date(l.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",w=l.runtime?.lastError||"",S=l.extraction||{},_=l.automation||{},W=l.worldbooks||{},C=Array.isArray(this.draftSelectedWorldbooks)?this.draftSelectedWorldbooks:Array.isArray(W.selected)?W.selected:[],T=Array.isArray(this.availableWorldbooks)?this.availableWorldbooks:[],M=String(this.worldbookFilter||"").trim().toLowerCase(),j=M?T.filter(ae=>String(ae||"").toLowerCase().includes(M)):T,z=C.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":C.length<=2?C.join("\u3001"):`\u5DF2\u9009 ${C.length} \u9879\uFF1A${C.slice(0,2).join("\u3001")} \u7B49`,$=Array.isArray(S.selectors)?S.selectors.join(`
`):"",q=p==="post_response_api"?r:"\u968F AI \u8F93\u51FA\u6A21\u5F0F\u4E0D\u4F1A\u989D\u5916\u8BF7\u6C42\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002",ee=p==="post_response_api"?"\u989D\u5916\u89E3\u6790":"\u968F AI \u8F93\u51FA",F=p==="post_response_api",ne=d||"\u5F53\u524D\u914D\u7F6E";return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${m(l.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${m(l.description||"\u914D\u7F6E\u6A21\u677F\u3001\u63D0\u53D6\u89C4\u5219\u3001API \u9884\u8BBE\u4E0E\u624B\u52A8\u8C03\u8BD5\u80FD\u529B\u3002")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u6A21\u5F0F ${m(ee)}</span>
              <span class="yyt-tool-hero-chip">\u9884\u8BBE ${m(ne)}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${m(h)}</span>
              <div class="yyt-tool-panel-hero-actions">
                <button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-tool-save-top" id="${b}-tool-save-top">
                  <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
                </button>
              </div>
            </div>
          </div>

          <div class="yyt-flow-section">
            <div class="yyt-flow-heading">
              <span class="yyt-flow-heading-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></span>
              <span>\u8F93\u51FA\u6A21\u5F0F</span>
            </div>
            <div class="yyt-form-group">
              <label>\u8F93\u51FA\u6A21\u5F0F</label>
              <select class="yyt-select" id="${b}-tool-output-mode">
                <option value="follow_ai" ${p==="follow_ai"?"selected":""}>\u968F AI \u8F93\u51FA\uFF08\u652F\u6301\u624B\u52A8\u6267\u884C\uFF09</option>
                <option value="post_response_api" ${p==="post_response_api"?"selected":""}>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790</option>
              </select>
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${q}${F?" \u5F53\u524D\u6A21\u5F0F\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\uFF0C\u4ECD\u9700\u5728\u5168\u5C40\u8BBE\u7F6E\u4E2D\u5F00\u542F\u81EA\u52A8\u5316\u3002":""}</div>
            </div>
          </div>

          <div class="yyt-flow-section">
            <div class="yyt-flow-heading">
              <span class="yyt-flow-heading-icon"><i class="fa-solid fa-database"></i></span>
              <span>API \u9884\u8BBE</span>
            </div>
            <div class="yyt-form-group">
              <label>\u89E3\u6790\u4F7F\u7528\u7684 API \u9884\u8BBE</label>
              <select class="yyt-select" id="${b}-tool-api-preset">
                <option value="">\u4F7F\u7528\u5F53\u524DAPI\u914D\u7F6E</option>
                ${c.map(ae=>`
                  <option value="${m(ae.name)}" ${ae.name===d?"selected":""}>
                    ${m(ae.name)}
                  </option>
                `).join("")}
              </select>
              <div class="yyt-tool-compact-hint">\u4EC5\u5728\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u6A21\u5F0F\u4E0B\u751F\u6548\u3002</div>
            </div>
          </div>

          <div class="yyt-flow-section">
            <div class="yyt-flow-heading">
              <span class="yyt-flow-heading-icon"><i class="fa-solid fa-shield-halved"></i></span>
              <span>Ai\u6307\u4EE4\u9884\u8BBE</span>
            </div>
            <div class="yyt-form-group">
              <label class="yyt-checkbox-label">
                <input type="checkbox" id="${b}-tool-bypass-enabled" ${u?"checked":""}>
                <span>\u542F\u7528 Ai \u6307\u4EE4\u9884\u8BBE</span>
              </label>
            </div>
            <div class="yyt-form-group yyt-bypass-preset-select ${u?"":"yyt-hidden"}">
              <label>\u7ED1\u5B9A Ai \u6307\u4EE4\u9884\u8BBE</label>
              <select class="yyt-select" id="${b}-tool-bypass-preset">
                <option value="">\u9009\u62E9\u9884\u8BBE</option>
                ${y.map(ae=>`
                  <option value="${m(ae.id)}" ${ae.id===f?"selected":""}>
                    ${m(ae.name)}${ae.isDefault?" [\u9ED8\u8BA4]":""}
                  </option>
                `).join("")}
              </select>
            </div>
          </div>


          <div class="yyt-flow-section">
            <div class="yyt-flow-heading">
              <span class="yyt-flow-heading-icon"><i class="fa-solid fa-book-open"></i></span>
              <span>\u4E16\u754C\u4E66\u6CE8\u5165</span>
            </div>
            <div class="yyt-form-group">
              <label class="yyt-checkbox-label">
                <input type="checkbox" id="${b}-tool-worldbooks-enabled" ${W.enabled?"checked":""}>
                <span>\u542F\u7528\u4E16\u754C\u4E66\u6CE8\u5165</span>
              </label>
            </div>
            <div class="yyt-form-group">
              <label>\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66\uFF08\u53EF\u591A\u9009\uFF09</label>
              <div class="yyt-worldbook-select" id="${b}-tool-worldbook-select">
                <div class="yyt-worldbook-summary">${m(z)}</div>
                <div class="yyt-worldbook-dropdown" id="${b}-tool-worldbook-dropdown">
                  <input type="text" class="yyt-input yyt-worldbook-search" id="${b}-tool-worldbook-search" placeholder="\u641C\u7D22\u4E16\u754C\u4E66..." value="${m(this.worldbookFilter||"")}">
                  <div class="yyt-worldbook-list" id="${b}-tool-worldbooks">
                    ${T.length>0?j.length>0?j.map(ae=>`
                      <div class="yyt-worldbook-item">
                        <label class="yyt-checkbox-label">
                          <input type="checkbox" data-worldbook-name="${m(ae)}" ${C.includes(ae)?"checked":""}>
                          <span>${m(ae)}</span>
                        </label>
                      </div>
                    `).join(""):'<div class="yyt-tool-compact-hint yyt-worldbook-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>':`<div class="yyt-tool-compact-hint yyt-worldbook-empty">${this.worldbookLoadState==="loading"?"\u4E16\u754C\u4E66\u52A0\u8F7D\u4E2D\u2026":"\u5F53\u524D\u672A\u8BFB\u53D6\u5230\u53EF\u7528\u4E16\u754C\u4E66\u3002"}</div>`}
                  </div>
                  ${this.worldbookLoadState!=="ready"?`
                    <details class="yyt-worldbook-diagnostics">
                      <summary>\u67E5\u770B\u4E16\u754C\u4E66\u8BCA\u65AD</summary>
                      <pre class="yyt-preview-box yyt-preview-pre">${m(JSON.stringify(Do()||{state:this.worldbookLoadState||"idle",message:"\u5C1A\u672A\u751F\u6210\u8BCA\u65AD\u4FE1\u606F"},null,2))}</pre>
                    </details>
                  `:""}
                </div>
              </div>
              <div class="yyt-tool-compact-hint">\u53EA\u6709\u6A21\u677F\u91CC\u663E\u5F0F\u5199\u5165 <code>{{toolWorldbookContent}}</code> \u65F6\uFF0C\u6240\u9009\u4E16\u754C\u4E66\u5185\u5BB9\u624D\u4F1A\u6CE8\u5165\u3002</div>
            </div>
          </div>

          <div class="yyt-flow-section">
            <div class="yyt-flow-heading">
              <span class="yyt-flow-heading-icon"><i class="fa-solid fa-filter"></i></span>
              <span>\u63D0\u53D6\u914D\u7F6E</span>
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570</label>
                <input type="number" class="yyt-input" id="${b}-tool-max-messages" min="1" max="50" value="${Number(S.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${b}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${m(o)}">${m($)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u63D0\u53D6\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u63D0\u53D6\u3002</div>
            </div>
          </div>

          <div class="yyt-flow-section">
            <div class="yyt-flow-heading">
              <span class="yyt-flow-heading-icon"><i class="fa-solid fa-bolt"></i></span>
              <span>\u81EA\u52A8\u89E6\u53D1</span>
            </div>
            <div class="yyt-form-group">
              <label class="yyt-checkbox-label">
                <input type="checkbox" id="${b}-tool-automation-enabled" ${_.enabled?"checked":""}>
                <span>\u5141\u8BB8\u5F53\u524D\u5DE5\u5177\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1</span>
              </label>
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4 (ms)</label>
                <input type="number" class="yyt-input" id="${b}-tool-automation-settle-ms" min="0" max="10000" step="100" value="${Number(_.settleMs)||1200}">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u51B7\u5374\u65F6\u95F4 (ms)</label>
                <input type="number" class="yyt-input" id="${b}-tool-automation-cooldown-ms" min="0" max="60000" step="100" value="${Number(_.cooldownMs)||5e3}">
              </div>
            </div>
            <div class="yyt-tool-compact-hint">\u53EA\u6709\u540C\u65F6\u6EE1\u8DB3\u201C\u5F53\u524D\u5DE5\u5177\u542F\u7528\u81EA\u52A8\u89E6\u53D1\u201D\u201C\u8F93\u51FA\u6A21\u5F0F\u4E3A\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u201C\u5168\u5C40\u81EA\u52A8\u5316\u5F00\u542F\u201D\u65F6\uFF0C\u624D\u4F1A\u5728 AI \u56DE\u590D\u540E\u81EA\u52A8\u6267\u884C\u3002</div>
          </div>

          <div class="yyt-flow-section">
            <div class="yyt-flow-heading">
              <span class="yyt-flow-heading-icon"><i class="fa-solid fa-file-code"></i></span>
              <span>\u6A21\u677F\u4FEE\u6539\u6846</span>
              <div class="yyt-title-actions">
                <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${b}-tool-reset-template">
                  <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u6A21\u677F
                </button>
              </div>
            </div>
            <div class="yyt-form-group">
              <textarea class="yyt-textarea yyt-code-textarea"
                        id="${b}-tool-prompt-template"
                        rows="12"
                        placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${m(l.promptTemplate||"")}</textarea>
              <div class="yyt-tool-compact-hint">\u8FD9\u91CC\u76F4\u63A5\u586B\u5199\u53D1\u9001\u7ED9\u989D\u5916\u89E3\u6790\u6A21\u578B\u7684\u5B8C\u6574\u6A21\u677F\uFF1B\u53EF\u5728\u6B63\u6587\u4E2D\u663E\u5F0F\u4F7F\u7528 <code>{{toolContentMacro}}</code>\u3001<code>{{toolWorldbookContent}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{userMessage}}</code> \u7B49\u5B8F\u3002</div>
            </div>
          </div>

          <div class="yyt-flow-section">
            <div class="yyt-flow-heading">
              <span class="yyt-flow-heading-icon"><i class="fa-solid fa-hand-pointer"></i></span>
              <span>\u624B\u52A8\u64CD\u4F5C\u533A</span>
            </div>
            <div class="yyt-tool-manual-area">
              <div class="yyt-tool-runtime-card">
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u5F53\u524D\u72B6\u6001</span>
                  <span class="yyt-tool-runtime-badge yyt-status-${m(h)}">${m(h)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${m(v)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${l.runtime?.successCount||0} / ${l.runtime?.errorCount||0}</span>
                </div>
                ${w?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${m(w)}</span>
                  </div>
                `:""}
              </div>
              <div class="yyt-tool-manual-actions">
                <button class="yyt-btn yyt-btn-primary" id="${b}-tool-run-manual">
                  <i class="fa-solid fa-play"></i> \u7ACB\u5373\u6267\u884C\u4E00\u6B21
                </button>
                <button class="yyt-btn yyt-btn-secondary" id="${b}-tool-preview-extraction">
                  <i class="fa-solid fa-vial"></i> \u6D4B\u8BD5\u63D0\u53D6
                </button>
                <div class="yyt-tool-compact-hint">\u7528\u4E8E\u624B\u52A8\u9A8C\u8BC1\u5F53\u524D\u6A21\u677F\u3001API\u9884\u8BBE\u548C Ai \u6307\u4EE4\u9884\u8BBE\u662F\u5426\u80FD\u6B63\u5E38\u5DE5\u4F5C\u3002</div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-footer yyt-panel-footer-end">
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-primary" id="${b}-tool-save">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>

          <div class="yyt-tool-macro-hint">
            \u8BF4\u660E\uFF1A\u5DE5\u5177\u4F1A\u628A\u5F53\u524D\u6A21\u677F\u89E3\u6790\u540E\u4F5C\u4E3A\u6700\u7EC8\u7528\u6237\u8BF7\u6C42\u53D1\u9001\u7ED9\u989D\u5916\u6A21\u578B\uFF1B\u82E5\u542F\u7528\u4E86 Ai \u6307\u4EE4\u9884\u8BBE\uFF0C\u5219\u4F1A\u4F5C\u4E3A\u524D\u7F6E\u6D88\u606F\u4E00\u5E76\u53D1\u9001\u3002\u53EF\u7528\u5B8F\u5305\u62EC <code>{{toolPromptMacro}}</code>\u3001<code>{{toolContentMacro}}</code>\u3001<code>{{toolWorldbookContent}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{recentMessagesText}}</code>\u3001<code>{{rawRecentMessagesText}}</code>\u3001<code>{{userMessage}}</code>\u3001<code>{{toolName}}</code>\u3001<code>{{toolId}}</code>\u3002
          </div>
        </div>
      `},_getApiPresets(){try{return Dt()||[]}catch{return[]}},_getBypassPresets(){try{return Pr()||[]}catch{return[]}},async _loadWorldbooks(){this.worldbookLoadState="loading";for(let d=0;d<10;d+=1){try{let y=await No();if(Array.isArray(y)&&y.length>0)return this.availableWorldbooks=y,this.worldbookLoadState="ready",this.availableWorldbooks}catch{this.availableWorldbooks=As()}d<9&&await new Promise(y=>setTimeout(y,400))}return this.availableWorldbooks=As(),this.worldbookLoadState="empty",this.availableWorldbooks},_getFormData(l){let c=O(),d=pe(this.toolId)||{};if(!c||!K(l))return d;let y=l.find(`#${b}-tool-output-mode`).val()||"follow_ai",p=l.find(`#${b}-tool-bypass-enabled`).is(":checked"),u=y==="post_response_api",f=u&&l.find(`#${b}-tool-automation-enabled`).is(":checked"),h=(l.find(`#${b}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(w=>w.trim()).filter(Boolean),v=l.find("[data-worldbook-name]:checked").map((w,S)=>String(c(S).data("worldbook-name")||"").trim()).get().filter(Boolean);return{enabled:d?.enabled!==!1,promptTemplate:l.find(`#${b}-tool-prompt-template`).val()||"",apiPreset:l.find(`#${b}-tool-api-preset`).val()||"",extractTags:h,output:{mode:y,apiPreset:l.find(`#${b}-tool-api-preset`).val()||"",overwrite:!0,enabled:u},automation:{enabled:f,settleMs:Math.max(0,parseInt(l.find(`#${b}-tool-automation-settle-ms`).val(),10)||1200),cooldownMs:Math.max(0,parseInt(l.find(`#${b}-tool-automation-cooldown-ms`).val(),10)||5e3)},bypass:{enabled:p,presetId:p&&l.find(`#${b}-tool-bypass-preset`).val()||""},worldbooks:{enabled:l.find(`#${b}-tool-worldbooks-enabled`).is(":checked"),selected:v},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(l.find(`#${b}-tool-max-messages`).val(),10)||5),selectors:h}}},_showExtractionPreview(l,c,d=null){if(!O()||d!==null&&!this._isRenderSessionActive(l,d))return;let p=`${b}-${n}`,u=Array.isArray(c.messageEntries)?c.messageEntries:[],f=u.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${u.map((h,v)=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">${v===u.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${u.length-v} \u6761\u6D88\u606F`}</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${m(h.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${m(h.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${m(h.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";l.append(Zt({id:p,title:a,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${m((c.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6309\u6700\u8FD1\u6D88\u606F\u5230\u66F4\u65E9\u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${m(c.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${m(c.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${m(c.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${f}
        `})),es(l,p,{onSave:h=>h()}),l.find(`#${p}-save`).text("\u5173\u95ED"),l.find(`#${p}-cancel`).remove()},bindEvents(l){let c=O();if(!c||!K(l))return;let d=this,y=l.data("yytRenderSessionId"),p=()=>l.find("[data-worldbook-name]:checked").map((h,v)=>String(c(v).data("worldbook-name")||"").trim()).get().filter(Boolean),u=()=>{let h=p(),v=h.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":h.length<=2?h.join("\u3001"):`\u5DF2\u9009 ${h.length} \u9879\uFF1A${h.slice(0,2).join("\u3001")} \u7B49`;l.find(".yyt-worldbook-summary").text(v)},f=()=>{let h=String(this.worldbookFilter||"").trim().toLowerCase(),v=l.find(`#${b}-tool-worldbooks`),w=v.find(".yyt-worldbook-item"),S=0;w.each((_,W)=>{let C=c(W),T=String(C.find("[data-worldbook-name]").data("worldbook-name")||"").toLowerCase(),M=!h||T.includes(h);C.toggleClass("yyt-hidden",!M),M&&(S+=1)}),v.find(".yyt-worldbook-search-empty").remove(),w.length>0&&S===0&&v.append('<div class="yyt-tool-compact-hint yyt-worldbook-empty yyt-worldbook-search-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>')};l.off(".yytToolPanel"),l.on("input.yytToolPanel",`#${b}-tool-worldbook-search`,h=>{this.worldbookFilter=String(c(h.currentTarget).val()||""),f()}),f(),l.on("change.yytToolPanel","[data-worldbook-name]",()=>{this.draftSelectedWorldbooks=p(),u()}),l.on("change.yytToolPanel",`#${b}-tool-output-mode`,()=>{let v=(l.find(`#${b}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?`${r} \u5F53\u524D\u6A21\u5F0F\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\uFF0C\u8BB0\u5F97\u540C\u65F6\u5F00\u542F\u5168\u5C40\u81EA\u52A8\u5316\u3002`:"\u968F AI \u8F93\u51FA\u6A21\u5F0F\u4E0D\u4F1A\u989D\u5916\u8BF7\u6C42\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002";l.find(".yyt-tool-mode-hint").text(v)}),l.on("change.yytToolPanel",`#${b}-tool-bypass-enabled`,h=>{let v=c(h.currentTarget).is(":checked");l.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!v)}),l.on("click.yytToolPanel",`#${b}-tool-save, #${b}-tool-save-top`,()=>{d._saveConfig(l,{silent:!1})}),l.on("click.yytToolPanel",`#${b}-tool-reset-template`,async()=>{let h=Gs(d.toolId);if(h?.promptTemplate){if(!await he("\u91CD\u7F6E\u6A21\u677F","\u786E\u5B9A\u8981\u5C06\u63D0\u793A\u8BCD\u6A21\u677F\u6062\u590D\u4E3A\u9ED8\u8BA4\uFF1F\u5F53\u524D\u4FEE\u6539\u5C06\u4E22\u5931\u3002",{danger:!0}))return;l.find(`#${b}-tool-prompt-template`).val(h.promptTemplate),E("success","\u6A21\u677F\u5DF2\u91CD\u7F6E")}}),l.on("click.yytToolPanel",`#${b}-tool-run-manual`,async()=>{if(d._saveConfig(l,{silent:!0}))try{let v=await Jo(d.toolId);if(!d._isRenderSessionActive(l,y))return;!v?.success&&v?.error&&Q("warning",v.error,{duration:3200,noticeId:`yyt-tool-run-${d.toolId}`})}catch(v){if(!d._isRenderSessionActive(l,y))return;E("error",v?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{d._renderIfSessionActive(l,y)}}),l.on("click.yytToolPanel",`#${b}-tool-preview-extraction`,async()=>{if(d._saveConfig(l,{silent:!0}))try{let v=await Xo(d.toolId);if(!d._isRenderSessionActive(l,y))return;if(!v?.success){E("error",v?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}d._showExtractionPreview(l,v,y)}catch(v){if(!d._isRenderSessionActive(l,y))return;E("error",v?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}),Ne(l,{namespace:"yytToolPanelSelect",selectors:[`#${b}-tool-output-mode`,`#${b}-tool-api-preset`,`#${b}-tool-bypass-preset`]})},_saveConfig(l,c={}){let d=this._getFormData(l),{silent:y=!1}=c,p=ct(this.toolId,d);return p&&(this.draftSelectedWorldbooks=Array.isArray(d.worldbooks?.selected)?[...d.worldbooks.selected]:[]),p?y||E("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):E("error","\u4FDD\u5B58\u5931\u8D25"),p},destroy(l){!O()||!K(l)||(this.renderSessionId=(this.renderSessionId||0)+1,l.removeData("yytRenderSessionId"),Ie(l,"yytToolPanelSelect"),l.off(".yytToolPanel"))},getStyles(){return tr},renderTo(l){if(!O()||!K(l))return;let d=this._beginRenderSession(l);if(this.worldbookFilter=this.worldbookFilter||"",!Array.isArray(this.draftSelectedWorldbooks)){let p=pe(this.toolId);this.draftSelectedWorldbooks=Array.isArray(p?.worldbooks?.selected)?[...p.worldbooks.selected]:[]}let y=As();Array.isArray(y)&&y.length>0?(this.availableWorldbooks=y,this.worldbookLoadState="ready"):this.worldbookLoadState="loading",l.html(this.render({})),this.bindEvents(l,{}),this.worldbookLoadState==="loading"&&Promise.resolve(this._loadWorldbooks()).catch(()=>(this.worldbookLoadState="empty",As())).then(p=>{this._isRenderSessionActive(l,d)&&(this.availableWorldbooks=Array.isArray(p)?p:[],this._updateWorldbookList(l,d))})},_updateWorldbookList(l,c=null){if(!O()||!K(l)||c!==null&&!this._isRenderSessionActive(l,c))return;let y=String(this.worldbookFilter||"").trim().toLowerCase(),p=Array.isArray(this.availableWorldbooks)?this.availableWorldbooks:[],u=Array.isArray(this.draftSelectedWorldbooks)?this.draftSelectedWorldbooks:[],f=y?p.filter(w=>String(w||"").toLowerCase().includes(y)):p,h=l.find(`#${b}-tool-worldbooks`);if(!h.length)return;if(p.length===0){h.html(`<div class="yyt-tool-compact-hint yyt-worldbook-empty">${this.worldbookLoadState==="loading"?"\u4E16\u754C\u4E66\u52A0\u8F7D\u4E2D\u2026":"\u5F53\u524D\u672A\u8BFB\u53D6\u5230\u53EF\u7528\u4E16\u754C\u4E66\u3002"}</div>`);return}h.html(f.length>0?f.map(w=>`
        <div class="yyt-worldbook-item">
          <label class="yyt-checkbox-label">
            <input type="checkbox" data-worldbook-name="${m(w)}" ${u.includes(w)?"checked":""}>
            <span>${m(w)}</span>
          </label>
        </div>
      `).join(""):'<div class="yyt-tool-compact-hint yyt-worldbook-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>');let v=u.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":u.length<=2?u.join("\u3001"):`\u5DF2\u9009 ${u.length} \u9879\uFF1A${u.slice(0,2).join("\u3001")} \u7B49`;l.find(".yyt-worldbook-summary").text(v)}}}var tr,If,$s=U(()=>{Ce();rs();$r();vr();Xs();fa();tr=`
  .yyt-tool-panel {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .yyt-tool-panel-hero {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 16px;
    align-items: stretch;
    padding: 16px 0;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid var(--yyt-border);
    background: transparent;
    box-shadow: none;
  }

  .yyt-tool-panel-hero-copy {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
  }

  .yyt-tool-panel-hero-title {
    font-size: 18px;
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.1px;
    color: var(--yyt-text);
  }

  .yyt-tool-panel-hero-desc {
    font-size: 13px;
    line-height: 1.7;
    color: var(--yyt-text-secondary);
    max-width: 64ch;
  }

  .yyt-tool-panel-hero-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
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
    border-radius: var(--yyt-radius-xs);
    font-size: 10px;
    font-weight: 700;
    border: 1px solid var(--yyt-border-strong);
    letter-spacing: 0.3px;
    color: var(--yyt-text-secondary);
    background: var(--yyt-surface-2);
    box-shadow: none;
  }

  .yyt-tool-compact-hint {
    font-size: 12px;
    color: var(--yyt-text-secondary);
    line-height: 1.7;
  }

  .yyt-hidden {
    display: none !important;
  }

  .yyt-code-textarea {
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 13px;
    line-height: 1.7;
    tab-size: 2;
    min-height: 180px;
  }

  .yyt-code-textarea-small {
    min-height: 108px;
  }

  .yyt-select-multiple {
    min-height: 120px;
  }

  .yyt-worldbook-select {
    display: flex;
    flex-direction: column;
    gap: 12px;
    border: none;
    border-radius: 0;
    background: transparent;
    padding: 0;
  }

  .yyt-worldbook-summary {
    font-size: 13px;
    color: var(--yyt-text);
    line-height: 1.7;
    font-weight: 600;
  }

  .yyt-worldbook-dropdown {
    position: static;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: none;
    overflow: visible;
    opacity: 1;
    border: none;
    box-shadow: none;
    background: transparent;
  }

  .yyt-worldbook-search {
    width: 100%;
  }

  .yyt-worldbook-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 260px;
    overflow: auto;
    padding-right: 2px;
  }

  .yyt-worldbook-item {
    padding: 10px 12px;
    border: none;
    border-radius: 0;
    border-top: 1px solid var(--yyt-border);
    background: transparent;
    transition: background var(--yyt-duration-fast) var(--ease-out);
  }

  .yyt-worldbook-item:first-child {
    border-top: none;
  }

  .yyt-worldbook-item:hover {
    background: var(--yyt-surface-3);
  }

  .yyt-worldbook-empty {
    padding: 12px 14px;
    border-radius: var(--yyt-radius-sm);
    background: var(--yyt-surface);
  }

  .yyt-code-textarea:focus {
    border-color: var(--yyt-accent);
    box-shadow: var(--yyt-focus-ring);
  }

  .yyt-title-actions {
    margin-left: auto;
  }

  .yyt-tool-manual-area {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .yyt-tool-runtime-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    border: none;
    border-radius: 0;
    background: transparent;
    padding: 0;
  }

  .yyt-tool-runtime-line {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    font-size: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .yyt-tool-runtime-line:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  .yyt-tool-runtime-label {
    color: rgba(255, 255, 255, 0.56);
    flex-shrink: 0;
    font-weight: 800;
    letter-spacing: 0.2px;
  }

  .yyt-tool-runtime-value {
    color: var(--yyt-text);
    text-align: right;
    word-break: break-word;
  }

  .yyt-tool-runtime-badge {
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.45px;
  }

  .yyt-status-idle {
    color: var(--yyt-text);
    background: rgba(255, 255, 255, 0.08);
  }

  .yyt-status-running {
    color: var(--yyt-accent-strong);
    background: rgba(123, 183, 255, 0.18);
  }

  .yyt-status-success {
    color: var(--yyt-success);
    background: rgba(74, 222, 128, 0.18);
  }

  .yyt-status-error {
    color: var(--yyt-error);
    background: rgba(255, 107, 107, 0.18);
  }

  .yyt-tool-runtime-error .yyt-tool-runtime-value {
    color: var(--yyt-error);
  }

  .yyt-tool-manual-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
    padding: 18px;
    background: transparent;
    box-shadow: none;
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
    border-radius: 0;
    border: none;
    border-top: 1px solid var(--yyt-border);
    background: transparent;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .yyt-preview-message-item:first-child {
    border-top: none;
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
    border: none;
    background: transparent;
    padding: 0;
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
    padding: 12px 14px;
    background: transparent;
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
    border-top: 1px solid var(--yyt-border);
    background: transparent;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .yyt-tool-debug-history-item:first-child {
    border-top: none;
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

  .yyt-tool-debug-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: flex-end;
  }

  .yyt-tool-debug-chip-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .yyt-tool-debug-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
    color: var(--yyt-text-secondary);
  }

  .yyt-tool-debug-chip-warning {
    color: var(--yyt-warning, #fbbf24);
    background: rgba(251, 191, 36, 0.12);
    border-color: rgba(251, 191, 36, 0.28);
  }

  .yyt-tool-debug-chip-ok {
    color: var(--yyt-success);
    background: rgba(74, 222, 128, 0.12);
    border-color: rgba(74, 222, 128, 0.28);
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

    .yyt-tool-manual-actions {
      min-width: 0;
    }
  }
`;If=ns});var uc={};re(uc,{SummaryToolPanel:()=>yc,default:()=>Mf});var yc,Mf,pc=U(()=>{$s();yc=ns({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"}),Mf=yc});var gc={};re(gc,{StatusBlockPanel:()=>fc,default:()=>Cf});var fc,Cf,mc=U(()=>{$s();fc=ns({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"}),Cf=fc});var hc={};re(hc,{YouyouReviewPanel:()=>bc,default:()=>Rf});var bc,Rf,vc=U(()=>{$s();bc=ns({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"}),Rf=bc});function xc(t=[],e={}){return t.map(s=>({...s,checked:e?.[s.key]===!0}))}function Qo(t){let{id:e,toolId:s,previewDialogId:r,previewTitle:o="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:n=[],processorOptions:a=[],heroHint:i="",extractionPlaceholder:l=""}=t;return{id:e,toolId:s,renderSessionId:0,_beginRenderSession(c){return this.renderSessionId=(this.renderSessionId||0)+1,K(c)&&c.data("yytRenderSessionId",this.renderSessionId),this.renderSessionId},_isRenderSessionActive(c,d){return K(c)&&c.data("yytRenderSessionId")===d},_renderIfSessionActive(c,d){return this._isRenderSessionActive(c,d)?(this.renderTo(c),!0):!1},render(){let c=pe(this.toolId);if(!c)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let d=c.processor||{},y=c.extraction||{},p=c.runtime?.lastStatus||"idle",u=c.runtime?.lastRunAt?new Date(c.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",f=c.runtime?.lastError||"",h=Array.isArray(y.selectors)?y.selectors.join(`
`):"",v=c.output?.overwrite!==!1,w=xc(n,{[d.direction||n[0]?.key||""]:!0}),S=xc(a,d.options||{});return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${m(c.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${m(c.description||"")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u672C\u5730\u811A\u672C\u5904\u7406</span>
              <span class="yyt-tool-hero-chip">\u5199\u56DE ${v?"\u8986\u76D6":"\u8FFD\u52A0"}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${m(p)}</span>
              <div class="yyt-tool-panel-hero-actions">
                <button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-tool-save-top" id="${b}-tool-save-top">
                  <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
                </button>
              </div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-toggle-on"></i>
              <span>\u542F\u7528\u72B6\u6001</span>
            </div>
            <label class="yyt-checkbox-label">
              <input type="checkbox" id="${b}-tool-enabled" ${c.enabled!==!1?"checked":""}>
              <span>\u542F\u7528\u8BE5\u5DE5\u5177</span>
            </label>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-filter"></i>
              <span>\u63D0\u53D6\u914D\u7F6E</span>
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570</label>
                <input type="number" class="yyt-input" id="${b}-tool-max-messages" min="1" max="50" value="${Number(y.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${b}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${m(l)}">${m(h)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u5B9A\u4F4D\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u5B9A\u4F4D\u3002\u624B\u52A8\u6267\u884C\u4F1A\u57FA\u4E8E\u6700\u65B0 AI \u6D88\u606F\u5168\u6587\u539F\u4F4D\u66FF\u6362\uFF0C\u5C3D\u91CF\u4FDD\u7559\u5916\u5C42\u6807\u7B7E\u548C\u5176\u4F59\u539F\u6587\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-shuffle"></i>
              <span>\u6267\u884C\u79CD\u7C7B</span>
            </div>
            <div class="yyt-local-output-mode-grid">
              ${w.map(_=>`
                <label class="yyt-local-choice-card">
                  <div class="yyt-checkbox-label">
                    <input type="radio" name="${b}-processor-direction-${this.toolId}" value="${m(_.key)}" ${_.checked?"checked":""}>
                    <span>${m(_.label)}</span>
                  </div>
                  <div class="yyt-local-choice-desc">${m(_.description||"")}</div>
                </label>
              `).join("")}
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-list-check"></i>
              <span>\u5904\u7406\u9879</span>
            </div>
            <div class="yyt-local-option-grid">
              ${S.map(_=>`
                <div class="yyt-local-option-card">
                  <label class="yyt-checkbox-label">
                    <span>${m(_.label)}</span>
                    <input type="checkbox" data-option-key="${m(_.key)}" ${_.checked?"checked":""}>
                  </label>
                  <div class="yyt-tool-compact-hint">${m(_.description||"")}</div>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-pen-to-square"></i>
              <span>\u5199\u56DE\u65B9\u5F0F</span>
            </div>
            <div class="yyt-local-output-mode-grid">
              <label class="yyt-local-choice-card">
                <div class="yyt-checkbox-label">
                  <input type="radio" name="${b}-output-mode-${this.toolId}" value="replace" ${v?"checked":""}>
                  <span>\u8986\u76D6\u539F\u5DE5\u5177\u5757</span>
                </div>
                <div class="yyt-local-choice-desc">\u4F18\u5148\u66FF\u6362\u8BE5\u5DE5\u5177\u6B64\u524D\u5199\u5165\u7684\u5185\u5BB9\u3002</div>
              </label>
              <label class="yyt-local-choice-card">
                <div class="yyt-checkbox-label">
                  <input type="radio" name="${b}-output-mode-${this.toolId}" value="append" ${v?"":"checked"}>
                  <span>\u8FFD\u52A0\u5230\u672B\u5C3E</span>
                </div>
                <div class="yyt-local-choice-desc">\u4FDD\u7559\u539F\u6587\uFF0C\u5E76\u628A\u5904\u7406\u7ED3\u679C\u9644\u52A0\u5230\u5F53\u524D\u6D88\u606F\u672B\u5C3E\u3002</div>
              </label>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${m(p)}">${m(p)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${m(u)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${c.runtime?.successCount||0} / ${c.runtime?.errorCount||0}</span>
                </div>
                ${f?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${m(f)}</span>
                  </div>
                `:""}
              </div>
              <div class="yyt-tool-manual-actions">
                <button class="yyt-btn yyt-btn-primary" id="${b}-tool-run-manual">
                  <i class="fa-solid fa-play"></i> \u7ACB\u5373\u6267\u884C\u4E00\u6B21
                </button>
                <button class="yyt-btn yyt-btn-secondary" id="${b}-tool-preview-extraction">
                  <i class="fa-solid fa-vial"></i> \u6D4B\u8BD5\u63D0\u53D6
                </button>
                <div class="yyt-tool-compact-hint">${m(i||"\u4FDD\u5B58\u540E\u53EF\u76F4\u63A5\u5BF9\u6700\u8FD1 AI \u6D88\u606F\u505A\u672C\u5730\u6587\u672C\u5904\u7406\u3002")}</div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-footer yyt-panel-footer-end">
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-primary" id="${b}-tool-save">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>
        </div>
      `},_getFormData(c){let d=O(),y=pe(this.toolId)||{};if(!d||!K(c))return y;let p=(c.find(`#${b}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(v=>v.trim()).filter(Boolean),u=c.find(`input[name="${b}-processor-direction-${this.toolId}"]:checked`).val()||n[0]?.key||"",f=c.find(`input[name="${b}-output-mode-${this.toolId}"]:checked`).val()||"replace",h={};return c.find("[data-option-key]").each((v,w)=>{let S=d(w);h[S.data("option-key")]=S.is(":checked")}),{enabled:c.find(`#${b}-tool-enabled`).is(":checked"),extractTags:p,output:{...y.output||{},mode:"local_transform",overwrite:f!=="append",enabled:!0},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(c.find(`#${b}-tool-max-messages`).val(),10)||5),selectors:p},processor:{...y.processor||{},direction:u,options:h},runtime:{...y.runtime||{}}}},_showExtractionPreview(c,d,y=null){if(!O()||y!==null&&!this._isRenderSessionActive(c,y))return;let u=`${b}-${r}`,f=Array.isArray(d.messageEntries)?d.messageEntries:[],h=f.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${f.map((v,w)=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">${w===f.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${f.length-w} \u6761\u6D88\u606F`}</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${m(v.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${m(v.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${m(v.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";c.append(Zt({id:u,title:o,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${m((d.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6309\u6700\u8FD1\u6D88\u606F\u5230\u66F4\u65E9\u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${m(d.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${m(d.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${m(d.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${h}
        `})),es(c,u,{onSave:v=>v()}),c.find(`#${u}-save`).text("\u5173\u95ED"),c.find(`#${u}-cancel`).remove()},bindEvents(c){if(!O()||!K(c))return;let y=this,p=c.data("yytRenderSessionId");c.off(".yytLocalToolPanel"),c.on("click.yytLocalToolPanel",`#${b}-tool-save, #${b}-tool-save-top`,()=>{y._saveConfig(c,{silent:!1})}),c.on("click.yytLocalToolPanel",`#${b}-tool-run-manual`,async()=>{if(y._saveConfig(c,{silent:!0}))try{let f=await Jo(y.toolId);if(!y._isRenderSessionActive(c,p))return;!f?.success&&f?.error&&Q("warning",f.error,{duration:3200,noticeId:`yyt-tool-run-${y.toolId}`})}catch(f){if(!y._isRenderSessionActive(c,p))return;E("error",f?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{y._renderIfSessionActive(c,p)}}),c.on("click.yytLocalToolPanel",`#${b}-tool-preview-extraction`,async()=>{if(y._saveConfig(c,{silent:!0}))try{let f=await Xo(y.toolId);if(!y._isRenderSessionActive(c,p))return;if(!f?.success){E("error",f?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}y._showExtractionPreview(c,f,p)}catch(f){if(!y._isRenderSessionActive(c,p))return;E("error",f?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}),c.on("click.yytLocalToolPanel",`#${b}-tool-reset-template`,()=>{let u=Gs(y.toolId);u?.promptTemplate&&(c.find(`#${b}-tool-prompt-template`).val(u.promptTemplate),E("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))})},_saveConfig(c,d={}){let y=this._getFormData(c),{silent:p=!1}=d,u=ct(this.toolId,y);return u?p||E("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):E("error","\u4FDD\u5B58\u5931\u8D25"),u},destroy(c){!O()||!K(c)||(this.renderSessionId=(this.renderSessionId||0)+1,c.removeData("yytRenderSessionId"),c.off(".yytLocalToolPanel"))},getStyles(){return $f},renderTo(c){!O()||!K(c)||(this._beginRenderSession(c),c.html(this.render({})),this.bindEvents(c,{}))}}}var $f,ga=U(()=>{Ce();rs();fa();$s();$f=`${tr}
  .yyt-local-option-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 10px;
  }

  .yyt-local-option-card {
    padding: 12px 13px;
    border-radius: var(--yyt-radius);
    border: 1px solid var(--yyt-border);
    background: transparent;
    box-shadow: none;
    transition: border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
  }

  .yyt-local-option-card:hover {
    border-color: var(--yyt-border-strong);
    background: var(--yyt-surface-3);
    box-shadow: none;
  }

  .yyt-local-option-card .yyt-checkbox-label {
    justify-content: space-between;
  }

  .yyt-local-output-mode-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 10px;
  }

  .yyt-local-choice-card {
    padding: 14px;
    border-radius: var(--yyt-radius);
    border: 1px solid var(--yyt-border);
    background: transparent;
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: none;
    transition: border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
  }

  .yyt-local-choice-card:hover {
    border-color: var(--yyt-border-strong);
    background: var(--yyt-surface-3);
    box-shadow: none;
  }

  .yyt-local-choice-card .yyt-checkbox-label {
    align-items: flex-start;
  }

  .yyt-local-choice-title {
    font-size: 13px;
    font-weight: 700;
    color: var(--yyt-text);
  }

  .yyt-local-choice-desc {
    font-size: 12px;
    line-height: 1.6;
    color: var(--yyt-text-secondary);
  }
`});var Sc={};re(Sc,{EscapeTransformToolPanel:()=>wc,default:()=>Pf});var wc,Pf,Tc=U(()=>{ga();wc=Qo({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]}),Pf=wc});var Ac={};re(Ac,{PunctuationTransformToolPanel:()=>_c,default:()=>Of});var _c,Of,Ec=U(()=>{ga();_c=Qo({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]}),Of=_c});var Ic={};re(Ic,{BypassPanel:()=>kc,default:()=>Lf});var kc,Lf,Mc=U(()=>{ke();Xs();Ce();kc={id:"bypassPanel",_getActivePresetId(t){return t.find(".yyt-bypass-editor-content").data("presetId")||null},render(t){let e=X.getPresetList(),s=X.getDefaultPresetId();return`
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
        <div class="yyt-bypass-editor">
          <div class="yyt-bypass-empty">
            <i class="fa-solid fa-shield-halved"></i>
            <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
          </div>
        </div>
      </div>
    `},_renderPresetItem(t,e){let s=jt&&jt[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${m(t.name)}</span>
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
          <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
        </div>
      `;let e=X.getDefaultPresetId()===t.id,s=jt&&jt[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${m(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
          <input type="text" class="yyt-input yyt-bypass-description-input"
                 value="${m(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
        </div>

        <div class="yyt-bypass-messages-header">
          <span>\u6D88\u606F\u5217\u8868</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-add-message">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u6D88\u606F
          </button>
        </div>

        <div class="yyt-bypass-messages">
          ${(t.messages||[]).map((r,o)=>this._renderMessageItem(r,o)).join("")}
        </div>

        <div class="yyt-bypass-editor-footer">
          <button class="yyt-btn yyt-btn-primary" id="yyt-bypass-save">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58
          </button>
        </div>
      </div>
    `},_renderMessageItem(t,e=0){let s={SYSTEM:"fa-server",USER:"fa-user",assistant:"fa-robot"};return`
      <div class="yyt-bypass-message ${t.enabled===!1?"yyt-disabled":""}"
           data-message-id="${t.id}" data-message-index="${e}"
           data-deletable="${t.deletable!==!1}">
        <div class="yyt-bypass-message-header">
          <div class="yyt-bypass-message-role">
            <i class="fa-solid ${s[t.role]||"fa-comment"}"></i>
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${m(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let s=O();!s||!K(t)||(t.off(".yytBypass"),this._bindPresetListEvents(t,s),this._bindEditorEvents(t,s),this._bindFileEvents(t,s),Ne(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_bindPresetListEvents(t,e){t.on("click.yytBypass",".yyt-bypass-preset-item",s=>{if(e(s.target).closest(".yyt-bypass-quick-delete").length)return;let r=e(s.currentTarget).data("presetId");this._selectPreset(t,e,r)}),t.on("click.yytBypass",".yyt-bypass-quick-delete",async s=>{s.stopPropagation();let r=e(s.currentTarget).data("presetId");if(!r||!await he("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let n=X.deletePreset(r);n.success?(t.find(".yyt-bypass-editor-content").data("presetId")===r&&t.find(".yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),E("success","\u9884\u8BBE\u5DF2\u5220\u9664")):E("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.on("click.yytBypass","#yyt-bypass-add",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click.yytBypass","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click.yytBypass","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click.yytBypass",".yyt-bypass-move-up",s=>{let r=e(s.currentTarget).closest(".yyt-bypass-message"),o=r.prev(".yyt-bypass-message");o.length&&(o.before(r),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-move-down",s=>{let r=e(s.currentTarget).closest(".yyt-bypass-message"),o=r.next(".yyt-bypass-message");o.length&&(o.after(r),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-insert-message",s=>{let r=e(s.currentTarget).closest(".yyt-bypass-message");this._insertMessageAfter(t,e,r)}),t.on("click.yytBypass",".yyt-bypass-delete-message",s=>{e(s.currentTarget).closest(".yyt-bypass-message").remove(),this._refreshMessageIndices(t,e)}),t.on("change.yytBypass",".yyt-bypass-message-enabled",s=>{e(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(s.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.on("click.yytBypass","#yyt-bypass-import",()=>{t.find("#yyt-bypass-import-file").click()}),t.on("change.yytBypass","#yyt-bypass-import-file",async s=>{let r=s.target.files[0];if(r){try{let o=await mt(r),n=X.importPresets(o);E(n.success?"success":"error",n.message),n.success&&this.renderTo(t)}catch(o){E("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.on("click.yytBypass","#yyt-bypass-export",()=>{try{let s=X.exportPresets();nt(s,`bypass_presets_${Date.now()}.json`),E("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){E("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(t,e,s){let r=X.getPreset(s);r&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),t.find(".yyt-bypass-editor").html(this._renderEditor(r)),Ne(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_createNewPreset(t,e){let s=`bypass_${Date.now()}`,r=X.createPreset({id:s,name:"\u65B0 Ai \u6307\u4EE4\u9884\u8BBE",description:"",messages:[]});r.success?(this.renderTo(t),this._selectPreset(t,e,s),E("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):E("error",r?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content"),r=s.data("presetId");if(!r)return;let o=s.find(".yyt-bypass-name-input").val().trim(),n=s.find(".yyt-bypass-description-input").val().trim();if(!o){E("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),s.find(".yyt-bypass-name-input").trigger("focus").trigger("select");return}let a=[];s.find(".yyt-bypass-message").each(function(){let l=e(this);a.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:String(l.data("deletable"))!=="false"})});let i=X.updatePreset(r,{name:o,description:n,messages:a});i.success?(E("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):E("error",i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},async _deleteCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r||!await he("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let n=X.deletePreset(r);n.success?(this.renderTo(t),E("success","\u9884\u8BBE\u5DF2\u5220\u9664")):E("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r)return;let o=`bypass_${Date.now()}`,n=X.duplicatePreset(r,o);n.success?(this.renderTo(t),this._selectPreset(t,e,o),E("success","\u9884\u8BBE\u5DF2\u590D\u5236")):E("error",n?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r)return;X.setDefaultPresetId(r),this._refreshPresetList(t,e);let o=X.getPreset(r);o&&t.find(".yyt-bypass-editor").html(this._renderEditor(o)),E("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE")},_addMessage(t,e){let s=t.find(".yyt-bypass-messages"),r={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},o=s.find(".yyt-bypass-message").length;s.append(this._renderMessageItem(r,o))},_insertMessageAfter(t,e,s){let r=t.find(".yyt-bypass-messages"),o={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},n=this._renderMessageItem(o,0),a=e(n);s.after(a),this._refreshMessageIndices(t,e)},_refreshMessageIndices(t,e){t.find(".yyt-bypass-message").each(function(s){e(this).attr("data-message-index",s)})},_refreshPresetList(t,e){let s=X.getPresetList(),r=X.getDefaultPresetId(),o=this._getActivePresetId(t);t.find(".yyt-bypass-preset-list").html(s.map(n=>this._renderPresetItem(n,n.id===r)).join("")),o&&t.find(`.yyt-bypass-preset-item[data-preset-id="${o}"]`).addClass("yyt-active")},destroy(t){!O()||!K(t)||(Ie(t,"yytBypassSelect"),t.off(".yytBypass"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},Lf=kc});var ba={};re(ba,{SettingsPanel:()=>Oc,applyTheme:()=>Pc,applyUiPreferences:()=>ma,default:()=>Nf});function sr({id:t,checked:e=!1,title:s="",hint:r=""}){return`
    <div class="yyt-toggle-row">
      <div class="yyt-toggle-label">
        <span>${s}</span>
        ${r?`<span class="yyt-toggle-hint">${r}</span>`:""}
      </div>
      <label class="yyt-toggle">
        <input type="checkbox" id="${t}" ${e?"checked":""}>
        <span class="yyt-toggle-slider"></span>
      </label>
    </div>
  `}function Rc(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Br(){return Rc()?.document||document}function $c(t=Br()){return t?.documentElement||document.documentElement}function Pc(t,e=Br()){let s=$c(e),r={...Df,...Cc[t]||Cc["dark-blue"]};Object.entries(r).forEach(([o,n])=>{s.style.setProperty(o,n)}),s.setAttribute("data-yyt-theme",t)}function ma(t={},e=Br()){let s=$c(e),{theme:r="dark-blue",compactMode:o=!1,animationEnabled:n=!0}=t||{};Pc(r,e),s.classList.toggle("yyt-compact-mode",!!o),s.classList.toggle("yyt-no-animation",!n)}var Df,Cc,Oc,Nf,ha=U(()=>{ke();Lr();ce();Dr();Ce();Df={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-on-accent":"#0a0d13","--yyt-bg-base":"#0a0d13","--yyt-surface":"#0f1219","--yyt-surface-2":"#151a24","--yyt-surface-3":"#1c2231","--yyt-surface-hover":"#1c2231","--yyt-surface-active":"#232b3e","--yyt-border":"rgba(255, 255, 255, 0.06)","--yyt-border-soft":"rgba(255, 255, 255, 0.04)","--yyt-border-strong":"rgba(255, 255, 255, 0.12)","--yyt-text":"rgba(255, 255, 255, 0.92)","--yyt-text-secondary":"rgba(255, 255, 255, 0.55)","--yyt-text-muted":"rgba(255, 255, 255, 0.35)","--yyt-focus-ring":"0 0 0 2px rgba(123, 183, 255, 1), 0 0 0 4px rgba(123, 183, 255, 0.15)","--yyt-control-bg":"#0f1219","--yyt-control-bg-hover":"#151a24","--yyt-control-bg-active":"#1c2231","--yyt-control-bg-strong":"#151a24","--yyt-control-bg-focus":"#151a24","--yyt-control-border":"rgba(255, 255, 255, 0.08)","--yyt-control-border-hover":"rgba(255, 255, 255, 0.14)","--yyt-control-border-focus":"rgba(123, 183, 255, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#151a24","--yyt-select-option-bg":"#1c2231","--yyt-select-option-hover-bg":"#232b3e","--yyt-select-option-selected-bg":"#2a3450","--yyt-select-option-border":"rgba(123, 183, 255, 0.15)","--yyt-select-option-selected-border":"rgba(123, 183, 255, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(0, 0, 0, 0.4)","--yyt-select-arrow-color":"rgba(255, 255, 255, 0.4)"},Cc={"dark-blue":{"--yyt-on-accent":"#0a0d13"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0d0a14","--yyt-surface":"#12101c","--yyt-surface-2":"#1a1726","--yyt-surface-3":"#221e32","--yyt-surface-hover":"#221e32","--yyt-surface-active":"#2a2540","--yyt-on-accent":"#0d0a14","--yyt-control-bg":"#12101c","--yyt-control-bg-hover":"#1a1726","--yyt-control-bg-active":"#221e32","--yyt-control-bg-strong":"#1a1726","--yyt-control-bg-focus":"#1a1726","--yyt-control-border-focus":"rgba(167, 139, 250, 0.5)","--yyt-select-surface":"#1a1726","--yyt-select-option-bg":"#221e32","--yyt-select-option-hover-bg":"#2a2540","--yyt-select-option-selected-bg":"#332d50","--yyt-select-option-border":"rgba(167, 139, 250, 0.15)","--yyt-select-option-selected-border":"rgba(167, 139, 250, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(167, 139, 250, 1), 0 0 0 4px rgba(167, 139, 250, 0.15)"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0a120d","--yyt-surface":"#0f1912","--yyt-surface-2":"#151f1a","--yyt-surface-3":"#1c2824","--yyt-surface-hover":"#1c2824","--yyt-surface-active":"#233530","--yyt-on-accent":"#0a120d","--yyt-control-bg":"#0f1912","--yyt-control-bg-hover":"#151f1a","--yyt-control-bg-active":"#1c2824","--yyt-control-bg-strong":"#151f1a","--yyt-control-bg-focus":"#151f1a","--yyt-control-border-focus":"rgba(74, 222, 128, 0.5)","--yyt-select-surface":"#151f1a","--yyt-select-option-bg":"#1c2824","--yyt-select-option-hover-bg":"#233530","--yyt-select-option-selected-bg":"#2a4038","--yyt-select-option-border":"rgba(74, 222, 128, 0.15)","--yyt-select-option-selected-border":"rgba(74, 222, 128, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(74, 222, 128, 1), 0 0 0 4px rgba(74, 222, 128, 0.15)"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f5f7fa","--yyt-surface":"#edf0f5","--yyt-surface-2":"#e4e8ef","--yyt-surface-3":"#dbe0e9","--yyt-surface-hover":"#dbe0e9","--yyt-surface-active":"#d1d7e2","--yyt-text":"rgba(15, 23, 42, 0.92)","--yyt-text-secondary":"rgba(15, 23, 42, 0.55)","--yyt-text-muted":"rgba(15, 23, 42, 0.35)","--yyt-border":"rgba(15, 23, 42, 0.08)","--yyt-border-soft":"rgba(15, 23, 42, 0.04)","--yyt-border-strong":"rgba(15, 23, 42, 0.14)","--yyt-focus-ring":"0 0 0 2px rgba(59, 130, 246, 1), 0 0 0 4px rgba(59, 130, 246, 0.12)","--yyt-on-accent":"#ffffff","--yyt-control-bg":"#edf0f5","--yyt-control-bg-hover":"#e4e8ef","--yyt-control-bg-active":"#dbe0e9","--yyt-control-bg-strong":"#e4e8ef","--yyt-control-bg-focus":"#e4e8ef","--yyt-control-border":"rgba(15, 23, 42, 0.1)","--yyt-control-border-hover":"rgba(15, 23, 42, 0.18)","--yyt-control-border-focus":"rgba(59, 130, 246, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#e4e8ef","--yyt-select-option-bg":"#edf0f5","--yyt-select-option-hover-bg":"#dbe0e9","--yyt-select-option-selected-bg":"#dbeafe","--yyt-select-option-border":"rgba(59, 130, 246, 0.12)","--yyt-select-option-selected-border":"rgba(59, 130, 246, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(15, 23, 42, 0.1)","--yyt-select-arrow-color":"rgba(15, 23, 42, 0.4)"}};Oc={id:"settingsPanel",render(){let t=dt.getSettings(),e=t.debug?.enableDebugLog===!0,s=t.automation?.enabled===!0,r=this._getAutomationRuntime();return`
      <div class="yyt-settings-panel">
        <div class="yyt-settings-hero">
          <div class="yyt-settings-hero-copy">
            <div class="yyt-settings-hero-title">\u5168\u5C40\u504F\u597D\u4E0E\u8FD0\u884C\u7B56\u7565</div>
            <div class="yyt-settings-hero-desc">\u7EDF\u4E00\u7BA1\u7406\u6267\u884C\u5668\u3001\u81EA\u52A8\u5316\u3001\u8C03\u8BD5\u4E0E\u5916\u89C2\u8BBE\u7F6E\uFF0C\u8BA9\u5DE5\u5177\u94FE\u884C\u4E3A\u4E0E\u754C\u9762\u4F53\u9A8C\u4FDD\u6301\u4E00\u81F4\u3002</div>
          </div>
          <div class="yyt-settings-hero-status">
            <span class="yyt-settings-status-chip ${s?"is-on":"is-off"}">\u81EA\u52A8\u5316 ${s?"\u5F00\u542F":"\u5173\u95ED"}</span>
            <span class="yyt-settings-status-chip ${e?"is-on":"is-off"}">\u8C03\u8BD5 ${e?"\u5F00\u542F":"\u5173\u95ED"}</span>
            <span class="yyt-settings-status-chip is-neutral">\u4E3B\u9898 ${t.ui?.theme||"dark-blue"}</span>
          </div>
        </div>

        <div class="yyt-settings-tabs">
          <button class="yyt-settings-tab yyt-active" data-tab="executor">
            <i class="fa-solid fa-microchip"></i> \u6267\u884C\u5668
          </button>
          <button class="yyt-settings-tab" data-tab="automation">
            <i class="fa-solid fa-bolt"></i> \u81EA\u52A8\u5316
          </button>
          <button class="yyt-settings-tab" data-tab="debug">
            <i class="fa-solid fa-bug"></i> \u8C03\u8BD5
          </button>
          <button class="yyt-settings-tab" data-tab="ui">
            <i class="fa-solid fa-palette"></i> \u5916\u89C2
          </button>
        </div>

        <div class="yyt-settings-content">
          ${this._renderExecutorTab(t.executor)}
          ${this._renderAutomationTab(t.automation,r)}
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
    `},_renderExecutorTab(t){return`
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
            <div class="yyt-form-hint">\u5355\u4E2A\u8BF7\u6C42\u7684\u8D85\u65F6\u65F6\u95F4\uFF0C\u8D85\u8FC7\u5C06\u81EA\u52A8\u4E2D\u65AD</div>
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
      </div>
    `},_renderAutomationTab(t={},e=null){let s=t.enabled===!0,r=Array.isArray(e?.recentTransactions)?e.recentTransactions.slice().reverse():[],o=e?.hostBinding||{},n=Array.isArray(o.eventBindings)&&o.eventBindings.length>0?o.eventBindings.join(" / "):"\u6682\u65E0\u4E8B\u4EF6\u7ED1\u5B9A",a=r.length>0?r.map(i=>{let l=i?.results?.[0]?.meta?.writebackDetails?.refresh||{},c=Array.isArray(l?.requestMethods)?l.requestMethods.join(" / "):"",d=l?.eventSource||l?.eventName||c||l?.confirmedBy;return`
          <div class="yyt-list-row">
            <div class="yyt-settings-runtime-meta">
              <span>${i?.sourceEvent||"UNKNOWN_EVENT"}</span>
              <span>${i?.phase||"unknown"}</span>
              <span>${i?.messageId||"no_message_id"}</span>
            </div>
            <div class="yyt-settings-runtime-main">${i?.verdict||i?.error||i?.generationKey||"\u65E0\u989D\u5916\u4FE1\u606F"}</div>
            ${d?`<div class="yyt-form-hint">\u5237\u65B0\uFF1A<code>${l?.eventSource||"unavailable"}</code> / <code>${l?.eventName||"MESSAGE_UPDATED"}</code>\uFF1B\u8BF7\u6C42\uFF1A<code>${c||"none"}</code>\uFF1B\u786E\u8BA4\uFF1A<code>${l?.confirmed?l?.confirmedBy||"success":"pending_or_failed"}</code>\uFF1B\u68C0\u67E5\uFF1A<code>${l?.confirmChecks||0}</code></div>`:""}
          </div>
        `}).join(""):'<div class="yyt-form-hint">\u6682\u65E0\u81EA\u52A8\u5316\u4E8B\u52A1\u8BB0\u5F55\u3002</div>';return`
      <div class="yyt-settings-tab-content" data-tab="automation">
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-toggle-on"></i></span>\u81EA\u52A8\u89E6\u53D1\u603B\u5F00\u5173</div>
          <div class="yyt-form-group">
            ${sr({id:"yyt-setting-automationEnabled",checked:t.enabled,title:"\u542F\u7528\u5DE5\u5177\u81EA\u52A8\u89E6\u53D1",hint:'\u8FD9\u91CC\u53EA\u4FDD\u7559\u4E00\u4E2A\u5168\u5C40\u5F00\u5173\u3002\u5F00\u542F\u540E\uFF0C\u6240\u6709\u5904\u4E8E"\u989D\u5916 AI \u6A21\u578B\u89E3\u6790"\u6A21\u5F0F\u7684\u5DE5\u5177\u90FD\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\u3002'})}
          </div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-automationSettleMs"
                     value="${t.settleMs||1200}" min="0" max="10000" step="100">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u81EA\u52A8\u5316\u51B7\u5374\u65F6\u95F4 (ms)</label>
              <input type="number" class="yyt-input" id="yyt-setting-automationCooldownMs"
                     value="${t.cooldownMs||5e3}" min="0" max="60000" step="100">
            </div>
          </div>
          <div class="yyt-form-hint">\u5F53\u524D\u72B6\u6001\uFF1A${s?"\u5DF2\u542F\u7528":"\u672A\u542F\u7528"}\u3002\u5F00\u542F\u540E\uFF0C\u6240\u6709"\u989D\u5916 AI \u6A21\u578B\u89E3\u6790"\u5DE5\u5177\u90FD\u4F1A\u5728 AI \u56DE\u590D\u540E\u81EA\u52A8\u6267\u884C\u3002</div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-stethoscope"></i></span>\u81EA\u52A8\u5316\u8BCA\u65AD</div>
          <div class="yyt-settings-runtime-grid">
            <div class="yyt-settings-runtime-chip ${e?.enabled?"is-on":"is-off"}">\u670D\u52A1 ${e?.enabled?"\u8FD0\u884C\u4E2D":"\u672A\u542F\u7528"}</div>
            <div class="yyt-settings-runtime-chip ${o.initialized?"is-on":"is-off"}">\u76D1\u542C ${o.initialized?"\u5DF2\u7ED1\u5B9A":"\u672A\u7ED1\u5B9A"}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u5F85\u5904\u7406 ${e?.pendingTimerCount||0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u6392\u961F\u69FD\u4F4D ${e?.queuedSlotCount||0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u4E8B\u52A1 ${r.length}</div>
          </div>
          <div class="yyt-form-hint">\u4E8B\u4EF6\u6E90\uFF1A<code>${o.source||"unavailable"}</code>\uFF1B\u6700\u8FD1\u521D\u59CB\u5316\uFF1A<code>${o.lastInitResult||"idle"}</code>\uFF1B\u5C1D\u8BD5\u6B21\u6570\uFF1A<code>${o.initAttempts||0}</code>\u3002</div>
          <div class="yyt-form-hint">\u4E8B\u4EF6\u7ED1\u5B9A\uFF1A<code>${n}</code></div>
          ${o.lastError?`<div class="yyt-form-hint">\u6700\u8FD1\u9519\u8BEF\uFF1A<code>${o.lastError}</code></div>`:""}
          ${o.retryScheduled?`<div class="yyt-form-hint">\u5DF2\u5B89\u6392\u91CD\u8BD5\uFF1A<code>${o.retryDelayMs||0}ms</code></div>`:""}
          <div class="yyt-form-hint">\u82E5\u81EA\u52A8\u89E6\u53D1\u5931\u8D25\uFF0C\u4F18\u5148\u770B\u6700\u8FD1\u4E8B\u52A1\u7684 verdict\uFF0C\u4F8B\u5982 <code>automation_disabled</code>\u3001<code>no_auto_tools</code>\u3001<code>assistant_message_not_found</code>\u3002</div>
          <div class="yyt-list-table">${a}</div>
        </div>
      </div>
    `},_renderDebugTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-file-lines"></i></span>\u65E5\u5FD7\u7EA7\u522B</div>
          <div class="yyt-form-group">
            ${sr({id:"yyt-setting-enableDebugLog",checked:t.enableDebugLog,title:"\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7",hint:"\u5F00\u542F\u540E Logger \u9762\u677F\u5C06\u8BB0\u5F55 DEBUG \u7EA7\u522B\u65E5\u5FD7\uFF0C\u5173\u95ED\u4EC5\u8BB0\u5F55 INFO \u53CA\u4EE5\u4E0A"})}
          </div>
          <div class="yyt-settings-hint" style="margin-top: 8px;">
            <i class="fa-solid fa-terminal"></i> \u5728\u300C\u65E5\u5FD7\u300D\u9762\u677F\u4E2D\u67E5\u770B\u3001\u641C\u7D22\u548C\u5BFC\u51FA\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-clock-rotate-left"></i></span>\u6267\u884C\u8BB0\u5F55</div>
          <div class="yyt-form-group">
            ${sr({id:"yyt-setting-saveExecutionHistory",checked:t.saveExecutionHistory,title:"\u4FDD\u5B58\u6267\u884C\u5386\u53F2",hint:"\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5"})}
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-eye"></i></span>UI \u663E\u793A</div>
          <div class="yyt-form-group">
            ${sr({id:"yyt-setting-showRuntimeBadge",checked:t.showRuntimeBadge,title:"\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0",hint:"\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668"})}
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
            ${sr({id:"yyt-setting-compactMode",checked:t.compactMode,title:"\u7D27\u51D1\u6A21\u5F0F",hint:"\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9"})}
          </div>

          <div class="yyt-form-group">
            ${sr({id:"yyt-setting-animationEnabled",checked:t.animationEnabled,title:"\u542F\u7528\u52A8\u753B\u6548\u679C",hint:"\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B"})}
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
    `},_renderMacroList(){return Ge.getAvailableVariables().map(t=>`
        <div class="yyt-list-row">
          <code>${t.name}</code>
          <span>${t.description}</span>
        </div>
      `).join("")},bindEvents(t){let e=O();if(!e||!K(t))return;let s=this;t.off(".yytSettings"),t.on("click.yytSettings",".yyt-settings-tab",o=>{let n=e(o.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),e(o.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${n}"]`).addClass("yyt-active")}),t.on("click.yytSettings","#yyt-settings-save",()=>{s._saveSettings(t)}),t.on("click.yytSettings","#yyt-settings-reset",async()=>{await he("\u91CD\u7F6E\u8BBE\u7F6E","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F",{danger:!0})&&(dt.resetSettings(),ma(Or.ui,Br()),s.renderTo(t),E("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}),Ne(t,{namespace:"yytSettingsSelect",selectors:["#yyt-setting-queueStrategy","#yyt-setting-theme"]});let r=dt.getDebugSettings();N.setLevel(r.enableDebugLog?se.DEBUG:se.INFO)},_saveSettings(t){let e=O(),s=[{id:"yyt-setting-maxConcurrent",min:1,max:10,label:"\u6700\u5927\u5E76\u53D1\u6570"},{id:"yyt-setting-maxRetries",min:0,max:10,label:"\u6700\u5927\u91CD\u8BD5\u6B21\u6570"},{id:"yyt-setting-retryDelayMs",min:1e3,max:6e4,label:"\u91CD\u8BD5\u95F4\u9694"},{id:"yyt-setting-requestTimeoutMs",min:1e4,max:3e5,label:"\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4"},{id:"yyt-setting-automationSettleMs",min:0,max:1e4,label:"\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4"},{id:"yyt-setting-automationCooldownMs",min:0,max:6e4,label:"\u81EA\u52A8\u5316\u51B7\u5374\u65F6\u95F4"}];for(let o of s){let n=t.find(`#${o.id}`),a=n.val(),i=parseInt(a,10);if(isNaN(i)||i<o.min||i>o.max){E("warning",`${o.label} \u987B\u5728 ${o.min} ~ ${o.max} \u4E4B\u95F4`),n.trigger("focus").trigger("select");return}}let r={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val(),10)||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val(),10)||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val(),10)||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val(),10)||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},automation:{enabled:t.find("#yyt-setting-automationEnabled").is(":checked"),settleMs:parseInt(t.find("#yyt-setting-automationSettleMs").val(),10)||1200,cooldownMs:parseInt(t.find("#yyt-setting-automationCooldownMs").val(),10)||5e3,maxConcurrentSlots:dt.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};dt.saveSettings(r),N.setLevel(r.debug.enableDebugLog?se.DEBUG:se.INFO),ma(r.ui,Br()),E("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},_getAutomationRuntime(){try{return Rc()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},destroy(t){!O()||!K(t)||(Ie(t,"yytSettingsSelect"),t.off(".yytSettings"))},getStyles(){return`
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
    `},renderTo(t){t.html(this.render({})),this.bindEvents(t,{})}},Nf=Oc});function de(t){return t==null?"":String(t).trim()}function Lc(t="table"){let e=de(t)||"table",s=Date.now().toString(36),r=Math.random().toString(36).slice(2,8);return`${e}_${s}_${r}`}function Dc(t="table"){return Lc(t)}function Zo(t="row"){return Lc(t)}function Ve(t,e=0){return de(t)||`table_${Number.isFinite(e)?e+1:1}`}function zr(t,e=0){return de(t)||`row_${Number.isFinite(e)?e+1:1}`}function en(t,e,s){return`${Number.isFinite(t)?t:-1}:${Number.isFinite(e)?e:-1}:${de(s)||"*"}`}function ye(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function rr(t={}){return{chatId:de(t.chatId),sourceMessageId:de(t.sourceMessageId||t.messageId),sourceSwipeId:de(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:de(t.effectiveSwipeId||t.sourceSwipeId),slotBindingKey:de(t.slotBindingKey),slotRevisionKey:de(t.slotRevisionKey),slotTransactionId:de(t.slotTransactionId),traceId:de(t.traceId),resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now()}}function xa(t={}){return{resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now(),runSource:de(t.runSource)||Le.MANUAL,traceId:de(t.traceId),chatId:de(t.chatId),sourceMessageId:de(t.sourceMessageId||t.messageId),sourceSwipeId:de(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:de(t.effectiveSwipeId||t.sourceSwipeId)||"swipe:current",slotBindingKey:de(t.slotBindingKey),slotRevisionKey:de(t.slotRevisionKey),slotTransactionId:de(t.slotTransactionId),assistantContentFingerprint:de(t.assistantContentFingerprint),assistantBaseFingerprint:de(t.assistantBaseFingerprint),assistantText:String(t.assistantText||""),assistantBaseText:String(t.assistantBaseText||""),targetMessageIndex:Number.isFinite(t.targetMessageIndex)?t.targetMessageIndex:-1}}function Rt(t){return!t||typeof t!="object"?null:{chatId:de(t.chatId),slotBindingKey:de(t.slotBindingKey),slotRevisionKey:de(t.slotRevisionKey),sourceMessageId:de(t.sourceMessageId),sourceSwipeId:de(t.sourceSwipeId),tables:Array.isArray(t.tables)?ye(t.tables):[],updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0,meta:t.meta&&typeof t.meta=="object"?ye(t.meta):{}}}function Ur(t={},e={}){let s=xa(t),r=e.meta&&typeof e.meta=="object"?ye(e.meta):{};return{chatId:s.chatId,slotBindingKey:s.slotBindingKey,slotRevisionKey:s.slotRevisionKey,sourceMessageId:s.sourceMessageId,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId,tables:Array.isArray(e.tables)?ye(e.tables):[],updatedAt:Number.isFinite(e.updatedAt)?e.updatedAt:Date.now(),meta:{sourceKind:r.sourceKind||tt.EMPTY,...r}}}function tn(t){return!t||typeof t!="object"?{lastResolvedTarget:null,lastCommittedTarget:null,updatedAt:0}:{lastResolvedTarget:t.lastResolvedTarget?rr(t.lastResolvedTarget):null,lastCommittedTarget:t.lastCommittedTarget?rr(t.lastCommittedTarget):null,updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0}}var Ps,or,Le,xt,Os,tt,Wt,va,st=U(()=>{Ps="YouYouToolkit_tableState",or="YouYouToolkit_tableBindings",Le=Object.freeze({MANUAL:"MANUAL_TABLE",AUTO:"AUTO_TABLE"}),xt=Object.freeze({ENABLED:"enabled",SELECTED:"selected",CURRENT:"current"}),Os=Object.freeze({EXACT:"exact",BINDING_FALLBACK:"binding_fallback",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),tt=Object.freeze({EXACT:"exact",BINDING:"binding",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),Wt=Object.freeze({INSERT_ROW:"insertRow",UPDATE_ROW:"updateRow",DELETE_ROW:"deleteRow"}),va=Object.freeze({CELL:"cell",ROW:"row",COLUMN:"column"})});function wt(t,e=""){return t==null?e:String(t).trim()||e}function Nc(t="template"){return`${t}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function sn(t={}){let e=ye(Array.isArray(t.tables)?t.tables:[]),s=Ft({tables:e});return{id:wt(t.id,Nc()),name:wt(t.name,"\u672A\u547D\u540D\u6A21\u677F"),description:wt(t.description,""),tables:s.tables||e,promptTemplate:wt(t.promptTemplate,""),createdAt:wt(t.createdAt,new Date().toISOString()),updatedAt:wt(t.updatedAt,new Date().toISOString())}}function Bf(){return[sn({id:as,name:Ea,description:"\u5305\u542B\u5168\u5C40\u6570\u636E\u3001\u4E3B\u89D2\u3001\u91CD\u8981\u89D2\u8272\u3001\u6280\u80FD\u3001\u80CC\u5305\u3001\u4EFB\u52A1\u3001\u7EAA\u8981\u548C\u9009\u9879\u8868\u3002",tables:ye(Wr)})]}function jr(){let t=wa.get(Sa,[]);return Array.isArray(t)?t.map(sn):[]}function Ta(){let t=Bf(),e=jr(),s=new Set(t.map(r=>r.id));return[...t,...e.filter(r=>!s.has(r.id))]}function Bc(t){let e=wt(t,"");return Ta().find(s=>s.id===e)||null}function _a(t={}){let e=new Date().toISOString(),s=sn({...t,id:wt(t.id,Nc()),updatedAt:e,createdAt:wt(t.createdAt,e)}),o=jr().filter(n=>n.id!==s.id);return o.push(s),wa.set(Sa,o),{success:!0,template:s}}function zc(t){let e=wt(t,"");if(!e||e===as)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u5220\u9664\u3002"};let s=jr().filter(r=>r.id!==e);return wa.set(Sa,s),{success:!0}}function Uc(){return{version:1,exportedAt:new Date().toISOString(),templates:jr()}}function jc(t,{overwrite:e=!1}={}){let s;if(Array.isArray(t))s=t;else if(t&&typeof t=="object")Array.isArray(t.templates)?s=t.templates:t.template&&typeof t.template=="object"?s=[t.template]:s=[t];else return{success:!1,imported:0,skipped:0,errors:["\u65E0\u6548\u7684\u5BFC\u5165\u6570\u636E\u683C\u5F0F\u3002"]};let r=new Set(jr().map(i=>i.id)),o=0,n=0,a=[];for(let i of s)try{let l=sn(i);if(!e&&r.has(l.id)){n++;continue}_a(l),r.add(l.id),o++}catch(l){a.push(wt(l?.message,"\u672A\u77E5\u9519\u8BEF"))}return{success:!0,imported:o,skipped:n,errors:a}}var wa,Sa,Aa=U(()=>{Ke();is();st();wa=R.namespace("tableWorkbenchTemplates"),Sa="templates"});function rn(t,e=""){return t==null?e:String(t).trim()||e}function zf(t,e=!1){return t==null?e:t===!0}function on(t={},e=0){return Ve(t?.id||t?.key,e)}function Fr(t={},e={}){let s=t&&typeof t=="object"?t:{},r=e&&typeof e=="object"?e:{},o=rn(s.mode||s.runScope||r.mode||r.runScope,xt.ENABLED),n=Array.isArray(s.selectedTableIds)?s.selectedTableIds.map(i=>rn(i,"")).filter(Boolean):Array.isArray(r.selectedTableIds)?r.selectedTableIds.map(i=>rn(i,"")).filter(Boolean):[],a=rn(s.activeTableId||r.activeTableId,"");return{mode:Object.values(xt).includes(o)?o:xt.ENABLED,selectedTableIds:n,activeTableId:a}}function Wc(t={},e=[]){let s=Fr(t,t?.scope||{}),r=Array.isArray(e)?e:[],o=r.map((i,l)=>on(i,l)),n=[];s.mode===xt.CURRENT?n=s.activeTableId?[s.activeTableId]:[]:s.mode===xt.SELECTED?n=s.selectedTableIds.filter(i=>o.includes(i)):n=r.map((i,l)=>({table:i,id:on(i,l)})).filter(({table:i})=>zf(i?.enabled,!0)).map(({id:i})=>i);let a=new Set(n);return{...s,allTableIds:o,allowedTableIds:n,allowedIdSet:a,includes(i={},l=-1){return a.has(on(i,l))},filterTables(i=[]){return(Array.isArray(i)?i:[]).filter((c,d)=>a.has(on(c,d)))},toJSON(){return{mode:s.mode,selectedTableIds:ye(s.selectedTableIds),activeTableId:s.activeTableId,allowedTableIds:[...n]}}}}var nn=U(()=>{st()});function rt(t,e=""){return t==null?e:String(t).trim()||e}function ka(){let t=globalThis.window||globalThis;return rt(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function Uf(t,e=!1){return t===!0}function jf(t={}){let e=t&&typeof t=="object"?t:{};return{enabled:Uf(e.enabled,!1),targetBook:rt(e.targetBook,""),entryComment:rt(e.entryComment,"YYT-\u586B\u8868\u6570\u636E")}}function Ia(t={},e={}){let s=t&&typeof t=="object"?t:{},r=Fr(s.scope,{mode:s.runScope||e.runScope||xt.ENABLED,selectedTableIds:s.selectedTableIds||e.selectedTableIds||[],activeTableId:s.activeTableId||e.activeTableId||""});return{chatId:rt(s.chatId,rt(e.chatId,ka())),templateId:rt(s.templateId,rt(e.templateId,as)),enabledTableIds:Array.isArray(s.enabledTableIds)?s.enabledTableIds.map(o=>rt(o,"")).filter(Boolean):[],focusedTableId:rt(s.focusedTableId,r.activeTableId),scope:r,worldbookSync:jf(s.worldbookSync),seedNote:rt(s.seedNote,""),updatedAt:rt(s.updatedAt,new Date().toISOString())}}function Hc(){let t=Fc.get(Kc,{});return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function Ma(t=ka()){let e=rt(t,"default_chat"),s=Hc();return Ia(s[e],{chatId:e})}function qc(t={},e=ka()){let s=rt(e,"default_chat"),r=Hc(),o=Ia({...r[s],...t||{},chatId:s,updatedAt:new Date().toISOString()},{chatId:s});return Fc.set(Kc,{...r,[s]:o}),{success:!0,guide:o}}function Yc(t={},e=null){let s=Ia(e||Ma(),{templateId:t.activeTemplate,runScope:t.runScope,selectedTableIds:t.scope?.selectedTableIds,activeTableId:t.scope?.activeTableId}),r={...t,activeTemplate:s.templateId||t.activeTemplate,runScope:s.scope.mode,scope:s.scope};return s.worldbookSync&&s.worldbookSync.targetBook&&(r.worldbookSync={...t.worldbookSync||{},...s.worldbookSync}),r}var Fc,Kc,Gc=U(()=>{Ke();is();st();nn();Fc=R.namespace("tableWorkbenchGuides"),Kc="guides"});function G(t,e,s="",r=Ls){return{key:t,title:e,description:s,type:r,required:!1}}function ls({id:t,name:e,note:s,aiInstructions:r,columns:o}){return{id:t,name:e,note:s,enabled:!0,aiInstructions:{init:r?.init||"",create:r?.create||"",update:r?.update||"",delete:r?.delete||""},columns:o,rows:[]}}function k(t,e=""){return t==null?e:String(t).trim()||e}function Kt(t,e=!1){return t==null?e:t===!0}function Ff(t){if(!Array.isArray(t)||t.length!==1)return!1;let e=t[0]&&typeof t[0]=="object"?t[0]:null;if(!e)return!1;let s=k(e.name||e.title,""),r=k(e.note||e.description,""),o=Array.isArray(e.columns)?e.columns:[],n=Array.isArray(e.rows)?e.rows:[];if(s&&!["\u88681","\u8868\u683C 1","\u8868\u683C1"].includes(s)||r||o.length!==1||n.length>1)return!1;let a=o[0]&&typeof o[0]=="object"?o[0]:{},i=k(a.key||a.id,""),l=k(a.title||a.name||a.label,"");if(k(a.description||a.note,"")||i&&i!=="col_1"||l&&!["\u52171","col_1"].includes(l))return!1;if(n.length===0)return!0;let d=n[0]&&typeof n[0]=="object"?n[0]:{},y=k(d.name||d.title||d.label,""),p=d.cells&&typeof d.cells=="object"&&!Array.isArray(d.cells)?d.cells:{},u=Array.isArray(d.values)?d.values:[],f=Object.values(p).some(h=>k(h,""))||u.some(h=>k(h,""));return(!y||y==="\u884C1")&&!f}function Kf(t,{seedDefaultWhenMissing:e=!1}={}){return Ff(t)?ye(Wr):Array.isArray(t)?ye(t):t&&typeof t=="object"?qf(t):e?ye(Wr):[]}function Hf(t=""){let e=[],s=k(t,""),r=/-\s*列\d+\s*[:：]\s*([^\n\-–—]+?)\s*[-–—]\s*([^\n]+)/g,o;for(;o=r.exec(s);)e.push({title:k(o[1],""),description:k(o[2],"")});return e}function qf(t={}){let e=t&&typeof t=="object"?t:{};return Object.keys(e).filter(r=>r.startsWith("sheet_")&&e[r]&&typeof e[r]=="object").map((r,o)=>({key:r,table:e[r],fallbackOrder:o})).sort((r,o)=>{let n=Number.isFinite(r.table.orderNo)?r.table.orderNo:r.fallbackOrder,a=Number.isFinite(o.table.orderNo)?o.table.orderNo:o.fallbackOrder;return n-a}).map(({key:r,table:o},n)=>{let a=o.sourceData&&typeof o.sourceData=="object"?o.sourceData:{},i=Array.isArray(o.content)?o.content:[],l=Array.isArray(i[0])?i[0]:[],c=Hf(a.note),d=new Set,y=l.slice(1).map((u,f)=>{let h=c[f]||{},v=k(u||h.title,`\u5217${f+1}`);return{key:$a(v||`col_${f+1}`,d),title:v,description:k(h.description,""),type:Ls,required:!1}}),p=i.slice(1).map((u,f)=>{let h=Array.isArray(u)?u:[],v={};return y.forEach((w,S)=>{v[w.key]=Kr(h[S+1])}),{name:k(h[0],`\u884C${f+1}`),cells:v}});return{id:k(o.uid||r,`sheet_${n+1}`),name:k(o.name,`\u8868${n+1}`),note:k(a.note,""),enabled:o.enabled!==!1,aiInstructions:{init:k(a.initNode,""),create:k(a.insertNode,""),update:k(a.updateNode,""),delete:k(a.deleteNode,"")},columns:y,rows:p}})}function Kr(t){if(t==null)return"";if(typeof t=="string")return t;try{return JSON.stringify(t,null,2)}catch{return String(t)}}function Yf(t,e="col"){return k(t,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||e}function $a(t,e=new Set){let s=Yf(t,"col"),r=s,o=2;for(;e.has(r);)r=`${s}_${o}`,o+=1;return e.add(r),r}function Gf(t=[]){let e=[],s=0;return t.forEach(r=>{let o=r&&typeof r=="object"?r:{},n=o.cells&&typeof o.cells=="object"&&!Array.isArray(o.cells)?o.cells:null,a=Array.isArray(o.cells)?o.cells:Array.isArray(o.values)?o.values:null;n&&Object.keys(n).forEach(i=>{e.includes(i)||e.push(i)}),a&&a.length>s&&(s=a.length)}),e.length>0?e.map(r=>({key:r,title:String(r)})):s>0?Array.from({length:s},(r,o)=>({key:`col_${o+1}`,title:`\u5217${o+1}`})):[]}function Pa(t,e=Ls){let s=k(t,e);return Jc.some(r=>r.value===s)?s:e}function Vf(t={},e=0,s=new Set){let r=t&&typeof t=="object"?t:{},o=k(r.title||r.name||r.label,`\u5217${e+1}`),n=k(r.key||r.id,""),a=$a(n||o||`col_${e+1}`,s),i=[n,k(r.title,""),k(r.name,""),k(r.label,"")].filter(Boolean);return{key:a,title:o,description:k(r.description||r.note,""),type:Pa(r.type),required:r.required===!0,sourceKeys:i}}function Jf(t={},e={},s=0){let r=t.cells&&typeof t.cells=="object"&&!Array.isArray(t.cells)?t.cells:null,o=Array.isArray(t.cells)?t.cells:Array.isArray(t.values)?t.values:null;if(r){let n=[...Array.isArray(e.sourceKeys)?e.sourceKeys:[],e.key,e.title].filter(Boolean);for(let a of n)if(r[a]!==void 0)return Kr(r[a])}return o&&o[s]!==void 0?Kr(o[s]):""}function Xf(t={},e=[],s=0){let r=t&&typeof t=="object"?t:{},o={};return e.forEach((n,a)=>{o[n.key]=Jf(r,n,a)}),{id:zr(r.id||r.rowId,s),name:k(r.name||r.title||r.label,`\u884C${s+1}`),cells:o}}function Xc(t={}){let e=t&&typeof t=="object"?t:{};return{init:k(e.init,""),create:k(e.create,""),update:k(e.update,""),delete:k(e.delete,"")}}function Qf(t={},e=""){let s=t&&typeof t=="object"?t:{},r=k(s.presetId,k(e,""));return{enabled:s.enabled===!0,presetId:r}}function Zf(t={},e=""){let s=t&&typeof t=="object"?t:{};return{enabled:Kt(s.enabled,!1),entryName:k(s.entryName,e),entryType:s.entryType==="keyword"?"keyword":"constant",splitByRow:Kt(s.splitByRow,!1),keywords:k(s.keywords,""),injectionTemplate:k(s.injectionTemplate,""),preventRecursion:Kt(s.preventRecursion,!0),entryPlacement:{position:k(s.entryPlacement?.position||s.placement?.position,"before_character_definition"),depth:Number.isFinite(Number(s.entryPlacement?.depth??s.placement?.depth))?Math.floor(Number(s.entryPlacement?.depth??s.placement?.depth)):2,order:Number.isFinite(Number(s.entryPlacement?.order??s.placement?.order))?Math.floor(Number(s.entryPlacement?.order??s.placement?.order)):0}}}function Qc(t={},e=0){let s=t&&typeof t=="object"?t:{},r=new Set,n=(Array.isArray(s.columns)&&s.columns.length>0?s.columns:Gf(Array.isArray(s.rows)?s.rows:[])).map((l,c)=>Vf(l,c,r)),a=Array.isArray(s.rows)?s.rows.map((l,c)=>Xf(l,n,c)):[],i=k(s.name||s.title,`\u8868${e+1}`);return{id:Ve(s.id||s.key,e),name:i,note:k(s.note||s.description,""),enabled:s.enabled!==!1,aiInstructions:Xc(s.aiInstructions),exportConfig:Zf(s.exportConfig,i),columns:n.map(l=>({key:l.key,title:l.title,description:k(l.description,""),type:Pa(l.type),required:l.required===!0})),rows:a}}function Zc(t={}){let e=t&&typeof t=="object"?t:{},s=Array.isArray(e.lastErrorDetails)?e.lastErrorDetails.map(o=>k(o,"")).filter(Boolean):[],r=e.lastValidationSummary&&typeof e.lastValidationSummary=="object"?{errorCount:Number.isFinite(e.lastValidationSummary.errorCount)?e.lastValidationSummary.errorCount:0,warningCount:Number.isFinite(e.lastValidationSummary.warningCount)?e.lastValidationSummary.warningCount:0}:{errorCount:0,warningCount:0};return{lastStatus:k(e.lastStatus,we.IDLE),lastRunAt:Number.isFinite(e.lastRunAt)?e.lastRunAt:0,lastDurationMs:Number.isFinite(e.lastDurationMs)?e.lastDurationMs:0,lastError:k(e.lastError,""),lastErrorDetails:s,lastValidationSummary:r,successCount:Number.isFinite(e.successCount)?e.successCount:0,errorCount:Number.isFinite(e.errorCount)?e.errorCount:0,lastSourceMessageId:k(e.lastSourceMessageId,""),lastSlotRevisionKey:k(e.lastSlotRevisionKey,""),lastLoadMode:k(e.lastLoadMode,""),lastFillMode:k(e.lastFillMode,""),lastMirrorApplied:e.lastMirrorApplied===!0,lastResolvedFromMessageId:k(e.lastResolvedFromMessageId,""),lastResolvedFromRevisionKey:k(e.lastResolvedFromRevisionKey,""),lastSourceKind:k(e.lastSourceKind,""),lastScopeMode:k(e.lastScopeMode,""),lastAutoRunAt:Number.isFinite(e.lastAutoRunAt)?e.lastAutoRunAt:0,lastAutoStatus:k(e.lastAutoStatus,we.IDLE),lastAutoMessageId:k(e.lastAutoMessageId,""),lastAutoRevisionKey:k(e.lastAutoRevisionKey,""),lastAutoSkipReason:k(e.lastAutoSkipReason,"")}}function ln(t=1,e=[]){let s=new Set((Array.isArray(e)?e:[]).map(o=>k(o?.key,"")).filter(Boolean));return{key:$a(`col_${t}`,s),title:`\u5217${t}`,description:"",type:Ls,required:!1}}function cn(t=[],e=1){let s={};return(Array.isArray(t)?t:[]).forEach(r=>{let o=k(r?.key,"");o&&(s[o]="")}),{id:Zo("row"),name:`\u884C${e}`,cells:s}}function Oa(t=1){let e=ln(1);return{id:Dc("table"),name:`\u8868${t}`,note:"",enabled:!0,aiInstructions:Xc(),columns:[e],rows:[cn([e],1)]}}function eg(){return{tables:[]}}function ed(t=[]){return!Array.isArray(t)||t.length===0?eg():{tables:t.map((e,s)=>Qc(e,s))}}function tg(t={}){let e=t&&typeof t=="object"?t:{};return(Array.isArray(e.tables)?e.tables:[]).map((r,o)=>Qc(r,o))}function td(t="",e={},s={}){let r=Pa(e?.type),o=String(t??"").trim(),n=k(s?.label,`${k(s?.tableName,"\u8868\u683C")} / ${k(s?.rowName,"\u884C")} / ${k(e?.title||e?.key,"\u5355\u5143\u683C")}`),a=[],i=[];if(e?.required===!0&&!o&&a.push(`${n} \u4E3A\u5FC5\u586B\uFF0C\u5F53\u524D\u4E3A\u7A7A\u3002`),!o)return{valid:a.length===0,errors:a,warnings:i};if(r==="number"&&!Number.isFinite(Number(o))&&a.push(`${n} \u9700\u8981\u586B\u5199\u6570\u5B57\u3002`),r==="boolean"&&!["true","false","1","0","yes","no"].includes(o.toLowerCase())&&a.push(`${n} \u9700\u8981\u586B\u5199\u5E03\u5C14\u503C\uFF08true / false\uFF09\u3002`),r==="date"&&Number.isNaN(Date.parse(o))&&a.push(`${n} \u9700\u8981\u586B\u5199\u53EF\u89E3\u6790\u7684\u65E5\u671F\u3002`),r==="json")try{JSON.parse(o)}catch(l){a.push(`${n} \u9700\u8981\u586B\u5199\u5408\u6CD5 JSON\uFF1A${l?.message||"\u89E3\u6790\u5931\u8D25"}`)}return{valid:a.length===0,errors:a,warnings:i}}function sg(t={}){let s=tg(t&&typeof t=="object"?t:{}),r=[];return s.forEach((o,n)=>{let a=k(o?.name,`\u8868${n+1}`),i=Array.isArray(o?.columns)?o.columns:[],l=Array.isArray(o?.rows)?o.rows:[];a||r.push(`\u8868 ${n+1} \u7F3A\u5C11\u540D\u79F0\u3002`),i.length===0&&r.push(`${a} \u81F3\u5C11\u9700\u8981\u4E00\u5217\u3002`);let c=new Set;i.forEach((d,y)=>{let p=k(d?.key,""),u=k(d?.title,`\u5217${y+1}`);if(!p){r.push(`${a} / ${u} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`);return}if(c.has(p)){r.push(`${a} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${p}`);return}c.add(p)}),l.forEach((d,y)=>{let p=k(d?.name,`\u884C${y+1}`),u=d?.cells&&typeof d.cells=="object"&&!Array.isArray(d.cells)?d.cells:{};i.forEach((f,h)=>{let v=k(f?.key,""),w=k(f?.title||v,`\u5217${h+1}`),S=v?Kr(u[v]):"",_=td(S,f,{label:`${a} / ${p} / ${w}`,tableName:a,rowName:p});r.push(..._.errors)})})}),{valid:r.length===0,errors:r,tables:s}}function nr({severity:t="error",message:e="",tableIndex:s=-1,tableName:r="",columnIndex:o=-1,columnKey:n="",rowIndex:a=-1,rowName:i="",cellKey:l=""}={}){return{severity:t,message:k(e,t==="warning"?"\u5B58\u5728\u8B66\u544A\u3002":"\u5B58\u5728\u9519\u8BEF\u3002"),tableIndex:s,tableName:k(r,""),columnIndex:o,columnKey:k(n,""),rowIndex:a,rowName:k(i,""),cellKey:k(l,"")}}function Ft(t={}){let e=sg(t),s=[];if(!e.valid)return{...e,warnings:[],issues:s,summary:{errorCount:e.errors.length,warningCount:0}};let r=Array.isArray(e.tables)?e.tables:[];r.forEach((a,i)=>{let l=k(a?.name,`\u8868${i+1}`),c=Array.isArray(a?.columns)?a.columns:[],d=Array.isArray(a?.rows)?a.rows:[],y=new Set;l||s.push(nr({severity:"error",message:`\u8868 ${i+1} \u7F3A\u5C11\u540D\u79F0\u3002`,tableIndex:i,tableName:l})),c.forEach((p,u)=>{let f=k(p?.key,""),h=k(p?.title,`\u5217${u+1}`);f||s.push(nr({severity:"error",message:`${l} / ${h} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`,tableIndex:i,tableName:l,columnIndex:u,columnKey:f,cellKey:f})),f&&(y.has(f)&&s.push(nr({severity:"error",message:`${l} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${f}`,tableIndex:i,tableName:l,columnIndex:u,columnKey:f,cellKey:f})),y.add(f))}),d.forEach((p,u)=>{let f=k(p?.name,`\u884C${u+1}`),h=p?.cells&&typeof p.cells=="object"&&!Array.isArray(p.cells)?p.cells:{};Object.keys(h).forEach(w=>{c.some(S=>k(S?.key,"")===w)||s.push(nr({severity:"warning",message:`${l} / ${f} \u5305\u542B\u672A\u5B9A\u4E49\u5217 ${w}\uFF0C\u4FDD\u5B58\u540E\u4F1A\u88AB\u5FFD\u7565\u3002`,tableIndex:i,tableName:l,rowIndex:u,rowName:f,cellKey:w}))}),c.forEach((w,S)=>{let _=k(w?.key,""),W=k(w?.title||_,`\u5217${S+1}`),C=_?Kr(h[_]):"",T=td(C,w,{label:`${l} / ${f} / ${W}`,tableName:l,rowName:f});T.errors.forEach(M=>{s.push(nr({severity:"error",message:M,tableIndex:i,tableName:l,columnIndex:S,columnKey:_,rowIndex:u,rowName:f,cellKey:_}))}),T.warnings.forEach(M=>{s.push(nr({severity:"warning",message:M,tableIndex:i,tableName:l,columnIndex:S,columnKey:_,rowIndex:u,rowName:f,cellKey:_}))})})})});let o=s.filter(a=>a.severity!=="warning").map(a=>a.message),n=s.filter(a=>a.severity==="warning").map(a=>a.message);return{valid:o.length===0,errors:o,warnings:n,issues:s,tables:r,summary:{errorCount:o.length,warningCount:n.length}}}function Hr(){return Ta()}function sd(){return{tables:ye(Wr),promptTemplate:Vc,apiPreset:"",promptPreset:"",bypass:{enabled:!1,presetId:""},activeTemplate:as,autoUpdateEnabled:!1,autoUpdateTrigger:"assistantMessage",runScope:xt.ENABLED,scope:{mode:xt.ENABLED,selectedTableIds:[],activeTableId:""},fillMode:cs.INCREMENTAL,contextDepth:8,contextRoles:"all",contextExtractTags:[],contextUseGlobalRules:!1,worldbooks:{enabled:!1,selected:[]},sendLatestRows:-1,mirrorToMessage:!1,mirrorTag:"yyt-table-workbench",worldbookSync:{enabled:!1,targetBook:"",entryComment:"YYT-\u586B\u8868\u6570\u636E"},wrapperConfig:{enabled:!0,wrapperTag:"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",wrapperHint:"\u4EE5\u4E0B\u662F\u5728\u8FD9\u4E2A\u65F6\u95F4\u70B9\uFF0C\u5F53\u524D\u573A\u666F\u4E0B\u5267\u60C5\u76F8\u5173\u7684\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55\uFF0C\u4F60\u5728\u8FDB\u884C\u5267\u60C5\u5206\u6790\u65F6\u5FC5\u987B\u4EE5\u6B64\u6700\u65B0\u7684\u6570\u636E\u4E3A\u51C6\uFF0C\u4EE5\u4E0B\u6570\u636E\u4E0E\u8BB0\u5F55\u7684\u4F18\u5148\u7EA7\u9AD8\u4E8E\u5176\u4ED6\u4EFB\u4F55\u80CC\u666F\u8BBE\u5B9A\uFF1A",wrapperPlacement:{position:"before_character_definition",depth:2,order:0}},runtime:Zc()}}function ut(t={}){let e=sd(),s=t&&typeof t=="object"?t:{},r=Qf(s.bypass,s.promptPreset),o=Kf(s.tables,{seedDefaultWhenMissing:!Object.prototype.hasOwnProperty.call(s,"tables")}),n=Fr(s.scope,{mode:s.runScope,selectedTableIds:s.selectedTableIds,activeTableId:s.activeTableId});return{tables:o,promptTemplate:k(s.promptTemplate,e.promptTemplate),apiPreset:k(s.apiPreset,""),promptPreset:r.presetId,bypass:r,activeTemplate:k(s.activeTemplate,e.activeTemplate),autoUpdateEnabled:Kt(s.autoUpdateEnabled,e.autoUpdateEnabled),autoUpdateTrigger:k(s.autoUpdateTrigger,e.autoUpdateTrigger),runScope:n.mode,scope:n,fillMode:s.fillMode===cs.FULL?cs.FULL:e.fillMode,contextDepth:Number.isFinite(Number(s.contextDepth))&&Number(s.contextDepth)>0?Math.floor(Number(s.contextDepth)):e.contextDepth,contextRoles:s.contextRoles==="assistant_only"?"assistant_only":"all",contextExtractTags:Array.isArray(s.contextExtractTags)?s.contextExtractTags.filter(a=>typeof a=="string"&&a.trim()):typeof s.contextExtractTags=="string"&&s.contextExtractTags.trim()?s.contextExtractTags.split(`
`).map(a=>a.trim()).filter(Boolean):[],contextUseGlobalRules:Kt(s.contextUseGlobalRules??s.contextUseExtractRules??s.contextUseExcludeRules,!1),worldbooks:{enabled:Kt(s.worldbooks?.enabled,!1),selected:Array.isArray(s.worldbooks?.selected)?s.worldbooks.selected.filter(a=>typeof a=="string"&&a.trim()):[]},sendLatestRows:Number.isFinite(Number(s.sendLatestRows))?Math.floor(Number(s.sendLatestRows)):-1,mirrorToMessage:Kt(s.mirrorToMessage,e.mirrorToMessage),mirrorTag:k(s.mirrorTag,e.mirrorTag),worldbookSync:{enabled:Kt(s.worldbookSync?.enabled,!1),targetBook:k(s.worldbookSync?.targetBook,""),entryComment:k(s.worldbookSync?.entryComment,e.worldbookSync.entryComment)},wrapperConfig:{enabled:Kt(s.wrapperConfig?.enabled,e.wrapperConfig.enabled),wrapperTag:k(s.wrapperConfig?.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:k(s.wrapperConfig?.wrapperHint,e.wrapperConfig.wrapperHint),wrapperPlacement:{position:k(s.wrapperConfig?.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(s.wrapperConfig?.wrapperPlacement?.depth))?Math.floor(Number(s.wrapperConfig?.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(s.wrapperConfig?.wrapperPlacement?.order))?Math.floor(Number(s.wrapperConfig?.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}},runtime:Zc({...e.runtime,...s.runtime||{}})}}function La(t={}){let e=ut(t),s=[];return Array.isArray(e.tables)||s.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u662F JSON \u6570\u7EC4\u3002"),e.promptTemplate||s.push("\u586B\u8868 Prompt \u4E0D\u80FD\u4E3A\u7A7A\u3002"),e.mirrorTag||s.push("\u6B63\u6587\u955C\u50CF\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A\u3002"),{valid:s.length===0,errors:s,config:e}}function $e(){let t=Ca.get(Ra,sd()),e=ut(t),s=Ma();return{...Yc(e,s),guide:s}}function rg(t){let s=(Array.isArray(t?.tables)?t.tables:[]).map(r=>({...r,rows:[]}));return{...t,tables:s}}function Je(t={}){let e=$e(),s=ut({...e,...t||{},runtime:t?.runtime===void 0?e.runtime:t.runtime}),r=La(s);if(!r.valid)return{success:!1,error:r.errors.join(`
`),errors:r.errors,config:r.config};let o=rg(r.config);return Ca.set(Ra,o),qc({templateId:r.config.activeTemplate,scope:r.config.scope,worldbookSync:r.config.worldbookSync}),{success:!0,config:r.config}}function rd(t){let e=Bc(t);if(!e)return{success:!1,error:"\u6A21\u677F\u4E0D\u5B58\u5728\u3002"};let s=$e();return Je({...s,tables:ye(e.tables),activeTemplate:e.id,promptTemplate:e.promptTemplate||s.promptTemplate})}function od({name:t="",description:e=""}={}){let s=$e();return _a({name:k(t,`${Ea}\u526F\u672C`),description:e,tables:ye(s.tables),promptTemplate:s.promptTemplate})}function nd(t={}){let e=$e(),s=ut({...e,runtime:{...e.runtime,...t||{}}});return Ca.set(Ra,s),s.runtime}function og(t={}){let e=ut(t);return`${k(e.promptTemplate,Vc)}

${Wf}`.trim()}function ad(t={}){let e=ut(t);return{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",promptTemplate:og(e),bypass:{enabled:e.bypass?.enabled===!0,presetId:e.bypass?.presetId||e.promptPreset||""}}}function id({apiPresets:t=[]}={}){let e=[{value:"",label:"\u5F53\u524D API \u914D\u7F6E"},...t.map(s=>({value:String(s?.name||""),label:String(s?.name||"")})).filter(s=>s.value)];return[{name:"tables",type:"tableDefinitions",label:"\u8868\u5B9A\u4E49",description:"\u901A\u8FC7\u7ED3\u6784\u5316\u7F16\u8F91\u5668\u7EF4\u62A4 tables\u3002\u9996\u6B21\u6267\u884C\u6216\u5F53\u524D\u6D88\u606F\u5C1A\u65E0\u7ED1\u5B9A state \u65F6\uFF0C\u4F1A\u4EE5\u7F16\u8BD1\u540E\u7684 tables \u4F5C\u4E3A merge base\u3002",emptyValue:[]},{name:"promptTemplate",type:"textarea",label:"\u586B\u8868 Prompt",rows:12,description:"\u53EF\u4F7F\u7528 {{lastUserMessage}}\u3001{{lastAiMessage}}\u3001{{chatHistory}}\u3001{{toolContentMacro}} \u7B49\u53D8\u91CF\u3002\u7CFB\u7EDF\u4F1A\u81EA\u52A8\u8FFD\u52A0 JSON \u8F93\u51FA\u7EA6\u675F\u3002"},{name:"apiPreset",type:"select",label:"API \u9884\u8BBE",description:"\u4E3A\u7A7A\u65F6\u4F7F\u7528\u5F53\u524D\u5168\u5C40 API \u914D\u7F6E\u3002",options:e},{name:"mirrorToMessage",type:"checkbox",label:"\u955C\u50CF\u5199\u56DE\u6B63\u6587",description:"\u628A\u5F53\u524D tables \u7684 JSON \u9884\u89C8\u955C\u50CF\u5230\u76EE\u6807 assistant \u6D88\u606F\u6B63\u6587\u4E2D\u3002"}]}var Ca,Ra,we,cs,Vc,Wf,Jc,Ls,an,as,Ea,Wr,is=U(()=>{Ke();st();Aa();nn();Gc();Ca=R.namespace("tableWorkbench"),Ra="config",we=Object.freeze({IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error",ABORTED:"aborted",SKIPPED:"skipped"}),cs=Object.freeze({INCREMENTAL:"incremental",FULL:"full"}),Vc=`\u8BF7\u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5F53\u524D\u8868\u683C\u57FA\u5E95\uFF0C\u66F4\u65B0\u7ED3\u6784\u5316 tables \u6570\u636E\u3002

\u8981\u6C42\uFF1A
1. \u53EA\u4F9D\u636E\u5F53\u524D\u5BF9\u8BDD\u5185\u5BB9\u66F4\u65B0\uFF0C\u4E0D\u8981\u81C6\u9020\u672A\u51FA\u73B0\u7684\u4FE1\u606F\u3002
2. \u4FDD\u6301\u539F\u6709\u8868\u7ED3\u6784\uFF1B\u6CA1\u6709\u4F9D\u636E\u65F6\u4FDD\u7559\u539F\u503C\u3002
3. \u5982\u679C\u67D0\u5B57\u6BB5\u9700\u8981\u6E05\u7A7A\uFF0C\u8BF7\u663E\u5F0F\u8F93\u51FA\u7A7A\u5B57\u7B26\u4E32\u3001\u7A7A\u6570\u7EC4\u6216 null\u3002
4. \u4F18\u5148\u53C2\u8003\u5F53\u524D assistant \u56DE\u590D\uFF1A{{lastAiMessage}}
5. \u8868\u683C\u7EA7 AI \u64CD\u4F5C\u8BF4\u660E\uFF1A
{{tableGuidance}}
6. \u672C\u6B21\u8FD0\u884C scope\uFF1A
{{tableScopeGuidance}}
7. \u5F53\u524D\u8868\u683C\u57FA\u5E95 JSON\uFF1A
{{toolContentMacro}}`,Wf=`\u8F93\u51FA\u8981\u6C42\uFF1A
- \u53EA\u8FD4\u56DE JSON
- \u4E0D\u8981\u9644\u52A0\u89E3\u91CA\u3001\u6807\u9898\u6216 Markdown
- JSON \u7ED3\u6784\u5FC5\u987B\u662F\uFF1A
{
  "tables": []
}`,Jc=Object.freeze([{value:"text",label:"\u6587\u672C"},{value:"number",label:"\u6570\u5B57"},{value:"boolean",label:"\u5E03\u5C14"},{value:"date",label:"\u65E5\u671F"},{value:"json",label:"JSON"}]),Ls="text",an=Object.freeze(Jc.map(t=>Object.freeze({...t}))),as="default_story_state",Ea="\u9ED8\u8BA4\u5267\u60C5\u72B6\u6001\u6A21\u677F";Wr=Object.freeze([ls({id:"default_global_state",name:"\u5168\u5C40\u6570\u636E\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u4E3B\u89D2\u6240\u5728\u5730\u70B9\u53CA\u65F6\u95F4\u76F8\u5173\u53C2\u6570\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u63D2\u5165\u4E00\u6761\u5173\u4E8E\u5F53\u524D\u4E16\u754C\u72B6\u6001\u7684\u8BB0\u5F55\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u5730\u70B9\u6216\u65F6\u95F4\u53D1\u751F\u53D8\u5316\u65F6\u66F4\u65B0\u6B64\u8868\uFF1B\u6BCF\u8F6E\u5E94\u6839\u636E\u5267\u60C5\u66F4\u65B0\u65F6\u95F4\u76F8\u5173\u5B57\u6BB5\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[G("location","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u5730\u70B9","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u7684\u5177\u4F53\u573A\u666F\u540D\u79F0\u3002"),G("current_time","\u5F53\u524D\u65F6\u95F4","\u6E38\u620F\u4E16\u754C\u7684\u5F53\u524D\u65F6\u95F4\uFF1B\u5982\u5267\u60C5\u6CA1\u6709\u660E\u786E\u65F6\u95F4\uFF0C\u53EF\u6839\u636E\u4E16\u754C\u89C2\u7ED9\u51FA\u5408\u7406\u65F6\u95F4\u3002"),G("previous_scene_time","\u4E0A\u8F6E\u573A\u666F\u65F6\u95F4","\u4E0A\u4E00\u8F6E\u4EA4\u4E92\u7ED3\u675F\u65F6\u7684\u65F6\u95F4\u3002"),G("elapsed_time","\u7ECF\u8FC7\u7684\u65F6\u95F4","\u6839\u636E\u5F53\u524D\u4E0E\u4E0A\u8F6E\u65F6\u95F4\u8BA1\u7B97\u51FA\u7684\u6587\u672C\u63CF\u8FF0\u3002")]}),ls({id:"default_protagonist_profile",name:"\u4E3B\u89D2\u4FE1\u606F",note:"\u8BB0\u5F55\u4E3B\u89D2\u7684\u6838\u5FC3\u8EAB\u4EFD\u4FE1\u606F\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E3B\u89D2\u7684\u552F\u4E00\u6761\u76EE\u3002",create:"\u7981\u6B62\u65B0\u589E\u591A\u540D\u4E3B\u89D2\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u4E3B\u89D2\u8EAB\u4EFD\u3001\u5916\u8C8C\u3001\u7ECF\u5386\u6216\u6027\u683C\u6709\u660E\u786E\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[G("name","\u4EBA\u7269\u540D\u79F0","\u4E3B\u89D2\u7684\u540D\u5B57\u3002"),G("gender_age","\u6027\u522B/\u5E74\u9F84","\u4E3B\u89D2\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),G("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u4E3B\u89D2\u5916\u8C8C\u7684\u5BA2\u89C2\u6587\u5B57\u63CF\u5199\u3002"),G("identity","\u804C\u4E1A/\u8EAB\u4EFD","\u4E3B\u89D2\u5728\u793E\u4F1A\u6216\u5267\u60C5\u4E2D\u7684\u4E3B\u8981\u8EAB\u4EFD\u3002"),G("history","\u8FC7\u5F80\u7ECF\u5386","\u4E3B\u89D2\u80CC\u666F\u6545\u4E8B\u4E0E\u5173\u952E\u7ECF\u5386\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002"),G("personality","\u6027\u683C\u7279\u70B9","\u5BF9\u4E3B\u89D2\u6838\u5FC3\u6027\u683C\u7684\u6982\u62EC\u3002")]}),ls({id:"default_important_characters",name:"\u91CD\u8981\u89D2\u8272\u8868",note:"\u8BB0\u5F55\u5173\u952E NPC \u6216\u91CD\u8981\u89D2\u8272\u7684\u4FE1\u606F\u548C\u52A8\u6001\u72B6\u6001\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u4E3A\u5F53\u524D\u5728\u573A\u7684\u91CD\u8981\u4EBA\u7269\u5206\u522B\u63D2\u5165\u6761\u76EE\u3002",create:"\u5267\u60C5\u4E2D\u6709\u672A\u8BB0\u5F55\u7684\u91CD\u8981\u4EBA\u7269\u767B\u573A\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u89D2\u8272\u7684\u72B6\u6001\u3001\u5173\u7CFB\u3001\u60F3\u6CD5\u3001\u7ECF\u5386\u6216\u6301\u6709\u7269\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u901A\u5E38\u7981\u6B62\u5220\u9664\uFF1B\u89D2\u8272\u79BB\u573A\u65F6\u4F18\u5148\u66F4\u65B0\u201C\u662F\u5426\u79BB\u573A\u201D\u3002"},columns:[G("name","\u59D3\u540D","\u89D2\u8272\u59D3\u540D\u3002"),G("gender_age","\u6027\u522B/\u5E74\u9F84","\u89D2\u8272\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),G("summary","\u4E00\u53E5\u8BDD\u4ECB\u7ECD","\u7528\u7B80\u77ED\u6587\u5B57\u6982\u62EC\u89D2\u8272\u8EAB\u4EFD\u80CC\u666F\u3002"),G("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u89D2\u8272\u5916\u8C8C\u548C\u5F53\u524D\u8863\u7740\u7684\u5BA2\u89C2\u63CF\u5199\u3002"),G("important_items","\u6301\u6709\u7684\u91CD\u8981\u7269\u54C1","\u89D2\u8272\u62E5\u6709\u7684\u5173\u952E\u7269\u54C1\uFF0C\u7528\u5206\u53F7\u5206\u9694\u3002"),G("offstage","\u662F\u5426\u79BB\u573A","\u5224\u65AD\u8BE5\u89D2\u8272\u5F53\u524D\u662F\u5426\u5DF2\u7ECF\u79BB\u573A\uFF0C\u586B\u5199\u201C\u662F\u201D\u6216\u201C\u5426\u201D\u3002","boolean"),G("history","\u8FC7\u5F80\u7ECF\u5386","\u89D2\u8272\u80CC\u666F\u4E0E\u5173\u952E\u4E8B\u4EF6\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002")]}),ls({id:"default_protagonist_skills",name:"\u4E3B\u89D2\u6280\u80FD\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u83B7\u5F97\u7684\u6280\u80FD\u3001\u80FD\u529B\u6216\u9636\u6BB5\u6027\u6210\u957F\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u6280\u80FD\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u65B0\u6280\u80FD\u6216\u65B0\u80FD\u529B\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u6280\u80FD\u5347\u7EA7\u3001\u964D\u7EA7\u6216\u6548\u679C\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u6280\u80FD\u88AB\u5267\u60C5\u5265\u593A\u3001\u66FF\u6362\u6216\u5931\u6548\u65F6\u5220\u9664\u3002"},columns:[G("skill_name","\u6280\u80FD\u540D\u79F0","\u6280\u80FD\u6216\u80FD\u529B\u540D\u79F0\u3002"),G("skill_type","\u6280\u80FD\u7C7B\u578B","\u6280\u80FD\u7C7B\u522B\uFF0C\u4F8B\u5982\u4E3B\u52A8\u3001\u88AB\u52A8\u3001\u5929\u8D4B\u7B49\u3002"),G("level","\u7B49\u7EA7/\u9636\u6BB5","\u6280\u80FD\u5F53\u524D\u7B49\u7EA7\u3001\u719F\u7EC3\u5EA6\u6216\u9636\u6BB5\u3002"),G("effect","\u6548\u679C\u63CF\u8FF0","\u6280\u80FD\u5728\u5F53\u524D\u9636\u6BB5\u4E0B\u7684\u5177\u4F53\u6548\u679C\u3002")]}),ls({id:"default_inventory",name:"\u80CC\u5305\u7269\u54C1\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u62E5\u6709\u7684\u7269\u54C1\u3001\u88C5\u5907\u6216\u6D88\u8017\u54C1\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u643A\u5E26\u7269\u54C1\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u80CC\u5305\u4E2D\u6CA1\u6709\u7684\u5168\u65B0\u7269\u54C1\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u7269\u54C1\u6570\u91CF\u3001\u72B6\u6001\u6216\u63CF\u8FF0\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7269\u54C1\u88AB\u5B8C\u5168\u6D88\u8017\u3001\u4E22\u5F03\u6216\u6467\u6BC1\u65F6\u5220\u9664\u3002"},columns:[G("item_name","\u7269\u54C1\u540D\u79F0","\u7269\u54C1\u540D\u79F0\u3002"),G("quantity","\u6570\u91CF","\u62E5\u6709\u6570\u91CF\u3002","number"),G("description","\u63CF\u8FF0/\u6548\u679C","\u7269\u54C1\u529F\u80FD\u3001\u6548\u679C\u6216\u80CC\u666F\u63CF\u8FF0\u3002"),G("category","\u7C7B\u522B","\u7269\u54C1\u7C7B\u522B\uFF0C\u4F8B\u5982\u6B66\u5668\u3001\u6D88\u8017\u54C1\u3001\u6742\u7269\u7B49\u3002")]}),ls({id:"default_quests_events",name:"\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u6B63\u5728\u8FDB\u884C\u6216\u9700\u8981\u6301\u7EED\u8FFD\u8E2A\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u8981\u4EFB\u52A1\u6216\u5173\u952E\u4E8B\u4EF6\u3002",create:"\u4E3B\u89D2\u63A5\u53D6\u3001\u89E6\u53D1\u6216\u53D1\u73B0\u65B0\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u65F6\u65B0\u589E\u3002",update:"\u4EFB\u52A1\u53D6\u5F97\u5173\u952E\u8FDB\u5C55\u3001\u76EE\u6807\u53D8\u5316\u6216\u65F6\u9650\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u4EFB\u52A1\u5B8C\u6210\u3001\u5931\u8D25\u3001\u8FC7\u671F\u6216\u4E0D\u518D\u9700\u8981\u8FFD\u8E2A\u65F6\u5220\u9664\u3002"},columns:[G("quest_name","\u4EFB\u52A1\u540D\u79F0","\u4EFB\u52A1\u6216\u4E8B\u4EF6\u6807\u9898\u3002"),G("quest_type","\u4EFB\u52A1\u7C7B\u578B","\u4E3B\u7EBF\u3001\u652F\u7EBF\u3001\u4E2A\u4EBA\u3001\u7A81\u53D1\u4E8B\u4EF6\u7B49\u3002"),G("issuer","\u53D1\u5E03\u8005","\u53D1\u5E03\u4EFB\u52A1\u6216\u89E6\u53D1\u4E8B\u4EF6\u7684\u89D2\u8272\u3001\u5730\u70B9\u6216\u52BF\u529B\u3002"),G("detail","\u8BE6\u7EC6\u63CF\u8FF0","\u4EFB\u52A1\u76EE\u6807\u3001\u4E8B\u4EF6\u80CC\u666F\u548C\u8981\u6C42\u3002"),G("progress","\u5F53\u524D\u8FDB\u5EA6","\u5BF9\u5B8C\u6210\u5EA6\u6216\u5F53\u524D\u9636\u6BB5\u7684\u7B80\u8981\u63CF\u8FF0\u3002"),G("deadline","\u4EFB\u52A1\u65F6\u9650","\u5B8C\u6210\u4EFB\u52A1\u7684\u5269\u4F59\u65F6\u95F4\u6216\u622A\u6B62\u6761\u4EF6\u3002"),G("reward","\u5956\u52B1","\u5B8C\u6210\u540E\u53EF\u80FD\u83B7\u5F97\u7684\u5956\u52B1\u3002"),G("penalty","\u60E9\u7F5A","\u5931\u8D25\u6216\u9519\u8FC7\u540E\u7684\u540E\u679C\u3002")]}),ls({id:"default_memo_log",name:"\u7EAA\u8981\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u6216\u5173\u952E\u7247\u6BB5\u53D1\u751F\u7684\u4E8B\u4EF6\u7EAA\u8981\uFF0C\u7528\u4E8E\u540E\u7EED\u56DE\u987E\u3002",aiInstructions:{init:"\u6545\u4E8B\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E00\u6761\u8BB0\u5F55\uFF0C\u7528\u4E8E\u8BB0\u5F55\u521D\u59CB\u5316\u5267\u60C5\u3002",create:"\u6BCF\u8F6E\u4EA4\u4E92\u7ED3\u675F\u540E\uFF0C\u82E5\u53D1\u751F\u4E86\u503C\u5F97\u8BB0\u5F55\u7684\u65B0\u4E8B\u4EF6\uFF0C\u5219\u63D2\u5165\u4E00\u6761\u65B0\u7EAA\u8981\u3002",update:"\u901A\u5E38\u7981\u6B62\u66F4\u65B0\u5386\u53F2\u7EAA\u8981\uFF1B\u53EA\u6709\u660E\u663E\u4E8B\u5B9E\u9519\u8BEF\u65F6\u624D\u4FEE\u6B63\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[G("time_span","\u65F6\u95F4\u8DE8\u5EA6","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u7684\u65F6\u95F4\u8303\u56F4\u3002"),G("location","\u5730\u70B9","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u5730\u70B9\u3002"),G("memo","\u7EAA\u8981","\u4EE5\u7B2C\u4E09\u65B9\u89C6\u89D2\u5BA2\u89C2\u8BB0\u5F55\u672C\u8F6E\u53D1\u751F\u7684\u4E8B\u5B9E\u3002"),G("summary","\u6982\u89C8","\u4E00\u53E5\u8BDD\u6982\u62EC\u7EAA\u8981\u5185\u5BB9\u3002"),G("index_code","\u7F16\u7801\u7D22\u5F15","\u7528\u4E8E\u540E\u7EED\u68C0\u7D22\u7684\u7B80\u77ED\u7F16\u7801\u3002")]}),ls({id:"default_options",name:"\u9009\u9879\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u4E3B\u89D2\u53EF\u4EE5\u91C7\u53D6\u7684\u884C\u52A8\u9009\u9879\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002\u6240\u6709\u9009\u9879\u4F7F\u7528\u7B2C\u4E09\u4EBA\u79F0\uFF0C\u4E0D\u4EE3\u66FF\u4E3B\u89D2\u53D1\u8A00\uFF0C\u5E76\u7D27\u6263\u5F53\u524D\u5267\u60C5\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u751F\u6210\u56DB\u4E2A\u521D\u59CB\u884C\u52A8\u9009\u9879\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u6BCF\u8F6E\u4EA4\u4E92\u540E\u6839\u636E\u5F53\u524D\u5267\u60C5\u751F\u6210\u65B0\u7684\u56DB\u4E2A\u9009\u9879\u5E76\u8986\u76D6\u539F\u6709\u5185\u5BB9\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[G("option_1","\u9009\u9879\u4E00","\u504F\u5411\u7B56\u7565\u3001\u63A8\u8FDB\u5267\u60C5\u6216\u89E3\u51B3\u5F53\u524D\u95EE\u9898\u7684\u884C\u52A8\u3002"),G("option_2","\u9009\u9879\u4E8C","\u504F\u5411\u8C28\u614E\u89C2\u5BDF\u3001\u6536\u96C6\u4FE1\u606F\u6216\u4FDD\u6301\u4E2D\u7ACB\u7684\u884C\u52A8\u3002"),G("option_3","\u9009\u9879\u4E09","\u504F\u5411\u5E2E\u52A9\u3001\u4FDD\u62A4\u3001\u6C9F\u901A\u6216\u5B89\u629A\u7684\u884C\u52A8\u3002"),G("option_4","\u9009\u9879\u56DB","\u504F\u5411\u5192\u9669\u3001\u8BD5\u63A2\u3001\u6539\u53D8\u5C40\u52BF\u6216\u5173\u7CFB\u4E92\u52A8\u7684\u884C\u52A8\u3002")]})])});function Da(t,e={},s={}){let r=Number.isInteger(s.size)?s.size:0,o=Number.isInteger(s.currentIndex)?s.currentIndex:-1,n=o<=0,a=o<0||o>=r-1,i=Object.entries(e).filter(([,l])=>Number.isInteger(l)).map(([l,c])=>`data-${l}="${c}"`).join(" ");return`
    <div class="yyt-table-editor-move-controls">
      <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="move-${t}-up" ${i} ${n?"disabled":""}>
        <i class="fa-solid fa-arrow-up"></i>
      </button>
      <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="move-${t}-down" ${i} ${a?"disabled":""}>
        <i class="fa-solid fa-arrow-down"></i>
      </button>
    </div>
  `}function ng(t=Ls){return an.map(e=>`
    <option value="${m(e.value)}" ${e.value===t?"selected":""}>${m(e.label)}</option>
  `).join("")}function ag(t=0,e=0){return!Number.isInteger(t)||t<=0||!Number.isInteger(e)||e<0?0:Math.min(e,t-1)}function cd(t={}){let e=t&&typeof t=="object"?t:{};return ed(Array.isArray(e.tables)?e.tables:[])}function ig(t,e){if(t.type==="json"){let s=e===void 0?t.emptyValue:e;if(typeof s=="string")return s;try{return JSON.stringify(s??null,null,2)}catch{return String(s??"")}}return String(e??"")}function lg(t={},e=""){let s=String(t.name||"").trim(),r=`yyt-table-field-${s}`,o=`${r}-value`,n=`${r}-dropdown`,a=uo(t.options||[]);return po({selectedValue:e,options:a,placeholder:a[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{"data-table-custom-select":"true"},nativeAttributes:{class:"yyt-table-select-native",id:o,"data-table-field":s,"data-field-type":"select"},triggerAttributes:{id:r,"data-table-select-trigger":"true","aria-controls":n},dropdownAttributes:{id:n,"data-table-select-dropdown":"true"},optionAttributes:{"data-table-select-option":"true"}})}function cg(t={},e={},s=0){let r=t&&typeof t=="object"?t.cells:null;if(Array.isArray(r))return String(r[s]??"");if(r&&typeof r=="object"){if(r[e.key]!==void 0)return String(r[e.key]??"");if(r[e.title]!==void 0)return String(r[e.title]??"")}return""}function dg(t={},e={},s=0,r=0){let o=Array.isArray(t.columns)?t.columns:[],n=Da("row",{"table-index":s,"row-index":r},{currentIndex:r,size:o.length>=0&&Array.isArray(t.rows)?t.rows.length:0});return`
    <tr data-table-editor-row="${r}">
      <td>
        <input type="text" class="yyt-input" data-table-editor-row-name value="${m(String(e?.name||""))}" placeholder="\u53EF\u7559\u7A7A\uFF0C\u9ED8\u8BA4\u4F1A\u81EA\u52A8\u547D\u540D">
      </td>
      ${o.map((a,i)=>{let l=String(a?.key||"").trim();return`
        <td>
          <textarea class="yyt-textarea yyt-code-textarea-small"
                    data-table-editor-cell
                    data-column-index="${i}"
                    data-column-key="${m(l)}"
                    rows="2"
                    placeholder="${m(a.title||a.key||`\u5217${i+1}`)}">${m(cg(e,a,i))}</textarea>
        </td>
      `}).join("")}
      <td>
        <div class="yyt-table-editor-row-actions">
          ${n}
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-row" data-table-index="${s}" data-row-index="${r}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `}function ld(t={},e=0,s={}){let r=Array.isArray(t.columns)?t.columns:[],o=Array.isArray(t.rows)?t.rows:[],n=String(t?.name||"").trim(),a=s.showDeleteTable!==!1,i=Da("table",{"table-index":e},{currentIndex:e,size:Number.isInteger(s.totalTables)?s.totalTables:0}),l=a?`
        <div class="yyt-table-editor-card-actions">
          ${i}
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-table" data-table-index="${e}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `:"";return`
    <div class="yyt-table-editor-card" data-table-editor-table="${e}">
      <div class="yyt-table-editor-card-head">
        ${l}
      </div>

      <div class="yyt-table-editor-meta">
        <div class="yyt-table-editor-input-group">
          <input type="text" class="yyt-input" data-table-editor-table-name value="${m(String(t?.name||""))}" placeholder="\u8868\u683C\u540D\u79F0">
        </div>
        <div class="yyt-table-editor-input-group">
          <textarea class="yyt-textarea yyt-code-textarea-small" data-table-editor-table-note rows="2" placeholder="\u5907\u6CE8\uFF08\u53EF\u7559\u7A7A\uFF09">${m(String(t?.note||""))}</textarea>
        </div>
      </div>

      <div class="yyt-table-editor-section">
        <div class="yyt-table-editor-section-head">
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="add-column" data-table-index="${e}">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <div class="yyt-table-editor-grid-wrap">
          <table class="yyt-table-editor-grid">
            <thead>
              <tr>
                <th>\u8868\u5934\u540D\u79F0</th>
                <th>\u5185\u90E8\u540D</th>
                <th>\u7C7B\u578B</th>
                <th>\u5FC5\u586B</th>
                <th>\u8BF4\u660E</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${r.length?r.map((c,d)=>`
                <tr class="yyt-table-editor-column" data-table-editor-column="${d}">
                  <td>
                    <input type="text" class="yyt-input" data-table-editor-column-title value="${m(String(c?.title||""))}" placeholder="\u4F8B\u5982\uFF1A\u5C5E\u6027">
                  </td>
                  <td>
                    <input type="text" class="yyt-input" data-table-editor-column-key value="${m(String(c?.key||""))}" placeholder="\u53EF\u7559\u7A7A\u81EA\u52A8\u751F\u6210">
                  </td>
                  <td>
                    <select class="yyt-select" data-table-editor-column-type>
                      ${ng(String(c?.type||Ls))}
                    </select>
                  </td>
                  <td>
                    <label class="yyt-table-editor-column-required yyt-table-editor-column-required-inline">
                      <input type="checkbox" data-table-editor-column-required ${c?.required===!0?"checked":""}>
                      <span>\u5FC5\u586B</span>
                    </label>
                  </td>
                  <td>
                    <input type="text" class="yyt-input" data-table-editor-column-description value="${m(String(c?.description||""))}" placeholder="\u53EF\u4E0D\u586B">
                  </td>
                  <td>
                    <div class="yyt-table-editor-column-actions">
                      ${Da("column",{"table-index":e,"column-index":d},{currentIndex:d,size:r.length})}
                      <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-column" data-table-index="${e}" data-column-index="${d}">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join(""):`
                <tr>
                  <td colspan="6">
                    <div class="yyt-table-editor-empty">\u5148\u52A0\u4E00\u5217\u3002</div>
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>

      <div class="yyt-table-editor-section">
        <div class="yyt-table-editor-section-head">
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="add-row" data-table-index="${e}">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <div class="yyt-table-editor-grid-wrap">
          <table class="yyt-table-editor-grid">
            <thead>
              <tr>
                <th>\u8FD9\u4E00\u884C\u540D\u79F0</th>
                ${r.map((c,d)=>`<th>${m(c?.title||c?.key||`\u5217${d+1}`)}</th>`).join("")}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${o.length?o.map((c,d)=>dg(t,c,e,d)).join(""):`
                <tr>
                  <td colspan="${Math.max(r.length+2,2)}">
                    <div class="yyt-table-editor-empty">\u5148\u52A0\u4E00\u884C\u3002</div>
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}function yg(t={},e={}){let s=cd(t),r=Array.isArray(s?.tables)?s.tables:[],o=e.mode==="focused"?"focused":"full",n=ag(r.length,Number.parseInt(e.currentTableIndex,10));if(o==="focused"){let a=r[n]||null;return`
      <div class="yyt-table-editor-shell">
        ${a?ld(a,n,{totalTables:r.length}):`
          <div class="yyt-table-editor-empty">\u8FD8\u6CA1\u6709\u8868\uFF0C\u5148\u65B0\u5EFA\u4E00\u5F20\u3002</div>
        `}
      </div>
    `}return`
    <div class="yyt-table-editor-shell">
      <div class="yyt-table-editor-toolbar">
        <button type="button" class="yyt-btn yyt-btn-small yyt-btn-primary" data-table-editor-action="add-table">
          <i class="fa-solid fa-plus"></i> \u65B0\u589E\u8868\u683C
        </button>
      </div>
      <div class="yyt-table-editor-stack">
        ${r.length?r.map((a,i)=>ld(a,i,{totalTables:r.length})).join(""):`
          <div class="yyt-table-editor-empty">\u8FD8\u6CA1\u6709\u8868\uFF0C\u5148\u65B0\u5EFA\u4E00\u5F20\u3002</div>
        `}
      </div>
    </div>
  `}function ug(t={},e={}){let s=String(t.name||"").trim(),r=m(t.label||s),o=t.description?`<div class="yyt-table-form-field-desc">${m(t.description)}</div>`:"",n=cd({tables:Array.isArray(e[s])?e[s]:[]});return`
    <div class="yyt-table-form-field" data-table-form-item="${m(s)}">
      <label>${r}</label>
      ${pg(t,n,{description:o})}
    </div>
  `}function pg(t={},e={},s={}){let r=String(t.name||"").trim(),o=typeof s.description=="string"?s.description:t.description?`<div class="yyt-table-form-field-desc">${m(t.description)}</div>`:"",n=s.mode==="focused"?"focused":"full",a=Number.parseInt(s.currentTableIndex,10);return`
    <div class="yyt-table-editor" data-table-field="${m(r)}" data-field-type="tableDefinitions" data-table-definition-root data-table-editor-mode="${n}" data-current-table-index="${Number.isInteger(a)?a:0}">
      ${yg(e,{mode:n,currentTableIndex:a})}
    </div>
    ${o}
  `}function dd(t=[],e={},s={}){let r=Array.isArray(t)?t:[],o=Array.isArray(s.includeFieldNames)?new Set(s.includeFieldNames.map(i=>String(i||"").trim()).filter(Boolean)):null,n=Array.isArray(s.excludeFieldNames)?new Set(s.excludeFieldNames.map(i=>String(i||"").trim()).filter(Boolean)):null,a=r.filter(i=>{let l=String(i?.name||"").trim();return!l||o&&!o.has(l)||n&&n.has(l)?!1:i.type!=="tableDefinitions"}).map(i=>fg(i,e)).join("");return a?`
    <div class="yyt-table-form-grid">
      ${a}
    </div>
  `:""}function fg(t={},e={}){let s=String(t.name||"").trim();if(!s)return"";if(t.type==="tableDefinitions")return ug(t,e);let r=e[s],o=m(t.label||s),n=t.description?`<div class="yyt-table-form-field-desc">${m(t.description)}</div>`:"",a=Number.isFinite(t.rows)?t.rows:6;return t.type==="checkbox"?`
      <div class="yyt-table-form-field" data-table-form-item="${m(s)}">
        <label class="yyt-table-form-inline-checkbox">
          <input type="checkbox" data-table-field="${m(s)}" data-field-type="checkbox" ${r===!0?"checked":""}>
          <span>${o}</span>
        </label>
        ${n}
      </div>
    `:t.type==="select"?`
      <div class="yyt-table-form-field" data-table-form-item="${m(s)}">
        <label for="yyt-table-field-${m(s)}">${o}</label>
        ${lg(t,r)}
        ${n}
      </div>
    `:`
    <div class="yyt-table-form-field" data-table-form-item="${m(s)}">
      <label for="yyt-table-field-${m(s)}">${o}</label>
      <textarea class="yyt-textarea yyt-code-textarea ${t.type==="json"?"":"yyt-code-textarea-small"}"
                id="yyt-table-field-${m(s)}"
                data-table-field="${m(s)}"
                data-field-type="${m(t.type||"textarea")}"
                rows="${a}">${m(ig(t,r))}</textarea>
      ${n}
    </div>
  `}var yd=U(()=>{Ce();is()});function ud(){return`
    .yyt-cell-popup-menu {
      position: fixed;
      z-index: 99999;
      min-width: 140px;
      padding: 4px;
      border-radius: var(--yyt-radius);
      border: 1px solid var(--yyt-border-strong);
      background: rgba(24,28,36,0.97);
      box-shadow: 0 12px 32px rgba(0,0,0,0.5);
      backdrop-filter: blur(12px);
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .yyt-cell-menu-item {
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      color: rgba(255,255,255,0.8);
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.1s;
    }
    .yyt-cell-menu-item:hover {
      background: rgba(123,183,255,0.15);
      color: #fff;
    }
  `}var Ds,qr,pd=U(()=>{Ce();Ds=null,qr=class{constructor(){Ds&&Ds.destroy(),Ds=this,this.$menu=null,this._onClickOutside=null}show(e,s,r={}){let o=O(),n=Et();if(!o||!n)return;this.destroy();let a=this._buildItems(r);if(a.length===0)return;let i=a.map(c=>`
      <div class="yyt-cell-menu-item" data-action="${c.action}">
        ${c.label}
      </div>
    `).join("");this.$menu=o(`
      <div class="yyt-cell-popup-menu">
        ${i}
      </div>
    `);let l=o(n.body);this.$menu.css({left:e+"px",top:s+"px"}),l.append(this.$menu),this.$menu.on("click.yytCellMenu",".yyt-cell-menu-item",c=>{let d=o(c.currentTarget).attr("data-action");this.destroy(),r.onAction&&r.onAction(d)}),this._onClickOutside=c=>{this.$menu&&!this.$menu[0].contains(c.target)&&this.destroy()},setTimeout(()=>{this._onClickOutside&&o(n).on("mousedown.yytCellMenu",this._onClickOutside)},0)}_buildItems(e){if(Array.isArray(e.items)&&e.items.length>0)return e.items;let s=[],r=Number.isFinite(e.rowIndex)?e.rowIndex:-1,o=e.colKey||"";return o&&(s.push({label:"\u7F16\u8F91\u5355\u5143\u683C",action:`edit:${o}`}),s.push({label:"\u6E05\u7A7A\u5355\u5143\u683C",action:`clear:${o}`})),r>=0&&(s.push({label:"\u4E0A\u65B9\u63D2\u5165\u884C",action:"insert-row-above"}),s.push({label:"\u4E0B\u65B9\u63D2\u5165\u884C",action:"insert-row-below"}),s.push({label:"\u5220\u9664\u6B64\u884C",action:"delete-row"})),s}destroy(){let e=O(),s=Et();this.$menu&&(this.$menu.off(".yytCellMenu"),this.$menu.remove(),this.$menu=null),this._onClickOutside&&s&&(e(s).off("mousedown.yytCellMenu",this._onClickOutside),this._onClickOutside=null),Ds===this&&(Ds=null)}static destroy(){Ds&&Ds.destroy()}}});function gg(t={},e=-1){return[t?.sourceId,t?.messageId,t?.message_id,t?.id,t?.mid,t?.mesid,t?.mes_id,t?.chat_index,t?.index,e].map(s=>ue(s))}function mg(t=[],e=""){let s=ue(e);if(!s||!Array.isArray(t))return-1;for(let r=t.length-1;r>=0;r-=1){let o=t[r];if(gg(o,r).includes(s))return r}return-1}function Yr(t={},e={}){let s=ue(t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId);if(!s)return null;let r=xa({resolvedAt:Date.now(),runSource:e.runSource||t?.runSource||Le.MANUAL,traceId:t?.traceId||"",chatId:t?.chatId||"",sourceMessageId:s,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId||"swipe:current",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",assistantContentFingerprint:t?.assistantContentFingerprint||"",assistantBaseFingerprint:t?.assistantBaseFingerprint||"",assistantText:t?.lastAiMessage||"",assistantBaseText:t?.assistantBaseText||"",targetMessageIndex:mg(t?.chatMessages||t?.chatHistory||[],s)});return!r.slotBindingKey||!r.slotRevisionKey?null:r}async function Na({runSource:t=Le.MANUAL}={}){let e=await Ss({runSource:t});return Yr(e,{runSource:t})}async function bg({messageId:t,swipeId:e="",runSource:s=Le.AUTO}={}){let r=await Ts({messageId:t,swipeId:e,runSource:s});return Yr(r,{runSource:s})}async function fd(t=null,e={}){let s=t||null;if(typeof e.resolveTarget=="function")return await e.resolveTarget(s);let r=ue(e.runSource||s?.runSource)||Le.MANUAL,o=ue(e.messageId||s?.sourceMessageId),n=ue(e.swipeId||s?.sourceSwipeId||s?.effectiveSwipeId);return e.useMessageTarget===!0||r===Le.AUTO?o?bg({messageId:o,swipeId:n,runSource:r}):null:Na({runSource:r})}function gd(t,e){let s=t||null,r=e||null;return!s||!r?{valid:!1,reason:"missing_target_snapshot"}:ue(s.sourceMessageId)!==ue(r.sourceMessageId)?{valid:!1,reason:"source_message_changed"}:ue(s.sourceSwipeId||s.effectiveSwipeId)!==ue(r.sourceSwipeId||r.effectiveSwipeId)?{valid:!1,reason:"source_swipe_changed"}:ue(s.slotRevisionKey)!==ue(r.slotRevisionKey)?{valid:!1,reason:"slot_revision_changed"}:{valid:!0,reason:"ok"}}var dn=U(()=>{_s();st()});function Ht(t,e=""){return t==null?e:String(t).trim()||e}function hg(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function Gr({loadMode:t=Os.EMPTY,mergeBaseOnly:e=!1,state:s=null,sourceKind:r=tt.EMPTY,resolvedFromMessageId:o="",resolvedFromRevisionKey:n=""}={}){let a=Rt(s)||null;return{loadMode:t,mergeBaseOnly:e,state:a,sourceKind:r,resolvedFromMessageId:Ht(o,a?.sourceMessageId||""),resolvedFromRevisionKey:Ht(n,a?.slotRevisionKey||"")}}function Ba(t,e={}){let s=Rt(t);return s?Rt({...s,meta:{...s.meta||{},...e||{}}}):null}function md({runtime:t,targetSnapshot:e,currentMessageIndex:s=-1,templateTables:r=[]}={}){let o=Array.isArray(t?.chat)?t.chat:[],n=Ht(e?.slotRevisionKey,""),a=Ht(e?.slotBindingKey,"");if(s>=0&&s<o.length){let i=Rt(o[s]?.[Ps]);if(i&&Ht(i.slotRevisionKey,"")===n)return Gr({loadMode:Os.EXACT,mergeBaseOnly:!1,state:Ba(i,{sourceKind:tt.EXACT,resolvedFromMessageId:i.sourceMessageId,resolvedFromRevisionKey:i.slotRevisionKey}),sourceKind:tt.EXACT,resolvedFromMessageId:i.sourceMessageId,resolvedFromRevisionKey:i.slotRevisionKey});if(i&&Ht(i.slotBindingKey,"")===a){let l=Ba({...i,slotRevisionKey:n||i.slotRevisionKey,sourceSwipeId:Ht(e?.sourceSwipeId||e?.effectiveSwipeId,i.sourceSwipeId),meta:{...i.meta||{},sourceKind:tt.BINDING,mergeBaseOnly:!0,fallbackFromBinding:!0,fallbackFromRevisionKey:Ht(i.slotRevisionKey,""),requestedRevisionKey:n,resolvedFromMessageId:i.sourceMessageId,resolvedFromRevisionKey:i.slotRevisionKey}});return Gr({loadMode:Os.BINDING_FALLBACK,mergeBaseOnly:!0,state:l,sourceKind:tt.BINDING,resolvedFromMessageId:i.sourceMessageId,resolvedFromRevisionKey:i.slotRevisionKey})}}if(s>0)for(let i=s-1;i>=0;i-=1){let l=o[i];if(!hg(l))continue;let c=Rt(l?.[Ps]);if(!c||!Array.isArray(c.tables)||c.tables.length===0)continue;let d=Ba({...c,slotBindingKey:a||c.slotBindingKey,slotRevisionKey:n||c.slotRevisionKey,sourceSwipeId:Ht(e?.sourceSwipeId||e?.effectiveSwipeId,c.sourceSwipeId),meta:{...c.meta||{},sourceKind:tt.HISTORY,mergeBaseOnly:!0,reconstructedFromHistory:!0,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey}});return Gr({loadMode:Os.HISTORY,mergeBaseOnly:!0,state:d,sourceKind:tt.HISTORY,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey})}return Array.isArray(r)?Gr({loadMode:Os.TEMPLATE,mergeBaseOnly:!1,state:Ur(e,{tables:ye(r),meta:{fromTemplate:!0,sourceKind:tt.TEMPLATE,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:tt.TEMPLATE}):Gr({loadMode:Os.EMPTY,mergeBaseOnly:!1,state:Ur(e,{meta:{sourceKind:tt.EMPTY,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:tt.EMPTY})}var bd=U(()=>{st()});function hd(t){return t==null?"":String(t).trim()}function vg(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function xg(){try{let t=vg(),e=t?.SillyTavern||null,s=e?.getContext?.()||null,r=Array.isArray(s?.chat)?s.chat:[],o=Array.isArray(e?.chat)?e.chat:[],n=r.length?r:o;return{topWindow:t,api:e,context:s,chat:n,contextChat:r,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}function wg(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function Sg(t=[],e=""){let s=hd(e);if(!Array.isArray(t)||!s)return-1;for(let r=t.length-1;r>=0;r-=1){let o=t[r];if(!wg(o))continue;if([o?.sourceId,o?.message_id,o?.messageId,o?.id,o?.mes_id,o?.mid,o?.mesid,o?.chat_index,o?.index,r].map(a=>hd(a)).includes(s))return r}return-1}function yn(t){let e=xg(),s=Sg(e.chat,t?.sourceMessageId);return s<0?{runtime:e,messageIndex:s,message:null}:{runtime:e,messageIndex:s,message:e.chat[s]||null}}function vd(t,e,s){let r=o=>{!Array.isArray(o)||e<0||e>=o.length||(o[e]={...o[e]||{},...s})};r(t?.contextChat),r(t?.apiChat)}async function xd(t){let e=t?.context||null,s=t?.api||null,r=e?.saveChatDebounced||s?.saveChatDebounced||null,o=e?.saveChat||s?.saveChat||null;typeof r=="function"&&r.call(e||s),typeof o=="function"&&await o.call(e||s)}function wd(t){let{message:e}=yn(t);return Rt(e?.[Ps])}function Sd(t,e={}){let{runtime:s,messageIndex:r}=yn(t);return md({runtime:s,targetSnapshot:t,currentMessageIndex:r,templateTables:Array.isArray(e.templateTables)?e.templateTables:[]})}async function Td(t){let{runtime:e,messageIndex:s,message:r}=yn(t);if(!r||s<0)return{success:!1,error:"target_message_not_found"};let o={...tn(r[or]),lastResolvedTarget:rr(t),updatedAt:Date.now()};return r[or]=o,vd(e,s,r),await xd(e),{success:!0,bindings:o}}async function _d(t,e,s={}){let r=s.skipFreshValidation===!0?t:await fd(t,s),o=s.skipFreshValidation===!0?{valid:!0,reason:"skipped"}:gd(t,r);if(!o.valid)return{success:!1,error:"target_changed_before_commit",validation:o};let n=r||t,{runtime:a,messageIndex:i,message:l}=yn(n);if(!l||i<0)return{success:!1,error:"target_message_not_found",validation:o};let c=Ur(n),d={...c.meta||{},...e.meta||{},...s.locks?{locks:s.locks}:{},...s.previousSnapshot?{previousSnapshot:s.previousSnapshot}:{}},y=Rt({...c,...e,meta:d,slotBindingKey:n.slotBindingKey,slotRevisionKey:n.slotRevisionKey,sourceMessageId:n.sourceMessageId,sourceSwipeId:n.sourceSwipeId||n.effectiveSwipeId,updatedAt:Date.now()}),p={...tn(l[or]),lastResolvedTarget:rr(n),lastCommittedTarget:rr(n),updatedAt:Date.now()};return l[Ps]=y,l[or]=p,vd(a,i,l),await xd(a),{success:!0,state:y,bindings:p,validation:o,messageIndex:i,sourceMessageId:n.sourceMessageId,slotRevisionKey:n.slotRevisionKey}}function Ad(t=null){let e=et.getAssistantMessageSnapshot(t);return e?.message?{...e,tableState:Rt(e.message[Ps]),tableBindings:tn(e.message[or])}:null}var un=U(()=>{ks();st();bd();dn()});function kd(t){let e=new Set;if(!Array.isArray(t))return e;for(let s of t){let r=s?.order;Number.isFinite(r)&&e.add(Math.floor(r))}return e}function za(t,e=5e4,s=1,r=99999){for(let o=e;o<=r;o++)if(!t.has(o))return t.add(o),o;for(let o=s;o<e;o++)if(!t.has(o))return t.add(o),o;return Ed.warn("\u65E0\u53EF\u7528 order \u69FD\u4F4D"),t.add(e),e}function Id(t,e,s=5e4,r=1,o=99999){let n=o-e+1;for(let a=s;a<=n;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}for(let a=r;a<s&&a<=n;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}Ed.warn(`\u65E0\u6CD5\u5206\u914D ${e} \u4E2A\u8FDE\u7EED order \u69FD\u4F4D`);for(let a=0;a<e;a++)t.add(s+a);return s}var Ed,Md=U(()=>{ce();Ed=N.createScope("TableWBOrder")});function Ua(t,e="before_character_definition"){let s=String(t||"").trim().toLowerCase();return s==="at_depth_as_system"||s==="system"?"at_depth_as_system":s==="before_char"||s==="before_character"||s==="before_character_definition"||s==="0"?"before_character_definition":s==="after_char"||s==="after_character"||s==="after_character_definition"||s==="1"?"after_character_definition":e}function Vr(t,e){if(!e)return t;let s={...t,position:e.position};return e.position==="at_depth_as_system"?s.depth=e.depth:delete s.depth,s}var Rv,$v,Cd=U(()=>{Rv=Object.freeze(["at_depth_as_system","before_character_definition","after_character_definition"]);$v=Object.freeze({position:"before_character_definition",depth:2,order:5e4})});function _g(t,e=""){return t==null?e:String(t).trim()||e}function Ag(){let t=globalThis.window||globalThis;return _g(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function Eg(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return os()?.TavernHelper||null}function kg(t){return String(t??"").replace(/\|/g,"\uFF5C").replace(/\n/g," ")}function Rd(t){let e=Array.isArray(t.columns)?t.columns:[],s=Array.isArray(t.rows)?t.rows:[];if(s.length===0)return"";let r=e.map(l=>l.key),o=e.map(l=>l.title||l.key),n=`| ${o.join(" | ")} |`,a=`| ${o.map(()=>"---").join(" | ")} |`,i=s.map(l=>{let c=l.cells||{};return`| ${r.map(d=>kg(c[d])).join(" | ")} |`});return`# ${t.name||"\u672A\u547D\u540D\u8868"}

${n}
${a}
${i.join(`
`)}`}function Ig(t,e){return!Array.isArray(t)||t.length===0?e||[]:!Array.isArray(e)||e.length===0?t:e.map((s,r)=>{let o=t[r];return o?{...s,name:s.name||o.name||"",columns:Array.isArray(s.columns)&&s.columns.length>0?s.columns:Array.isArray(o.columns)?o.columns:[],rows:Array.isArray(o.rows)?o.rows:Array.isArray(s.rows)?s.rows:[],enabled:o.enabled!==void 0?o.enabled:s.enabled,exportConfig:s.exportConfig||o.exportConfig||{enabled:!1}}:s})}function ja(t){return`${Tg}[${t}]-`}function Mg(t,e){let s=ja(t),r=String(e||"").trim();return r?`${s}${r}`:`${s}\u586B\u8868\u6570\u636E`}function $d(t,e,s){return`${ja(t)}Wrapper-${s}`}function Cg(t,e){return t?t.content!==e.content||t.enabled!==e.enabled||t.type!==e.type||t.position!==e.position||t.prevent_recursion!==e.prevent_recursion||t.order!==e.order:!0}async function Jr(t,e,s,r,o,n){let a=s.find(i=>i.comment===r);return a&&a.uid?Cg(a,o)?(await Promise.resolve(t.setLorebookEntries(e,[{uid:a.uid,...o}])),Xr.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u66F4\u65B0\uFF1A${r}`),{action:"updated",comment:r}):(n.add(a.order||0),{action:"skipped",comment:r}):typeof t.createLorebookEntries=="function"?(await Promise.resolve(t.createLorebookEntries(e,[{comment:r,keys:[],...o}])),Xr.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u521B\u5EFA\uFF1A${r}`),{action:"created",comment:r}):{action:"failed",comment:r,error:"createLorebookEntries \u4E0D\u53EF\u7528"}}async function Pd(t,e){let s=e?.worldbookSync;if(!s?.enabled)return{skipped:!0,reason:"disabled"};let r=String(s.targetBook||"").trim();if(!r)return{skipped:!0,reason:"no_target_book"};let o=Eg();if(!o)return{success:!1,error:"TavernHelper \u4E0D\u53EF\u7528"};if(typeof o.getLorebookEntries!="function")return{success:!1,error:"getLorebookEntries \u4E0D\u53EF\u7528"};if(typeof o.setLorebookEntries!="function"&&typeof o.createLorebookEntries!="function")return{success:!1,error:"\u4E16\u754C\u4E66\u5199\u5165 API \u4E0D\u53EF\u7528"};let n=Ag(),a=ja(n),i=Array.isArray(e?.tables)?e.tables:[],c=Ig(t,i).filter(p=>p&&p.enabled!==!1&&Array.isArray(p.rows)&&p.rows.length>0);if(c.length===0)return{skipped:!0,reason:"empty_tables"};let d=e?.wrapperConfig||{},y=d.enabled!==!1;try{let p=await Promise.resolve(o.getLorebookEntries(r));Array.isArray(p)||(p=[]);let u=kd(p),f=[],h=c.filter(T=>T.exportConfig?.enabled===!0),v=c.filter(T=>T.exportConfig?.enabled!==!0),w="";if(v.length>0&&(w=v.map(T=>Rd(T)).join(`

`)),y&&(w||h.length>0)){let T=d.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",M=d.wrapperHint||"",j=d.wrapperPlacement||{},z=j.order||5e4,$=Id(u,3,z,1,99999),q=Ua(j.position,"before_character_definition"),ee=Number.isFinite(j.depth)?j.depth:2,F=`<${T}>
${M}`;f.push(await Jr(o,r,p,$d(n,T,"Start"),Vr({content:F,enabled:!0,type:"constant",order:$,prevent_recursion:!0},{position:q,depth:ee}),u)),w&&f.push(await Jr(o,r,p,`${a}\u5168\u5C40\u6570\u636E`,Vr({content:w,enabled:!0,type:"constant",order:$+1,prevent_recursion:!0},{position:q,depth:ee}),u)),f.push(await Jr(o,r,p,$d(n,T,"End"),Vr({content:`</${T}>`,enabled:!0,type:"constant",order:$+2,prevent_recursion:!0},{position:q,depth:ee}),u))}else if(w){let T=za(u,5e4,1,99999);f.push(await Jr(o,r,p,`${a}\u5168\u5C40\u6570\u636E`,{content:w,enabled:!0,type:"constant",position:"before_character_definition",order:T,prevent_recursion:!0},u))}for(let T of h){let M=T.exportConfig||{},j=M.entryName||T.name||"\u672A\u547D\u540D\u8868",z=Mg(n,j),$=Rd(T);if(!$)continue;let q=M.entryPlacement||{},ee=Ua(q.position,"before_character_definition"),F=za(u,q.order||5e4,1,99999),ne=M.entryType==="keyword"?"keyword":"constant";f.push(await Jr(o,r,p,z,Vr({content:$,enabled:!0,type:ne,order:F,prevent_recursion:M.preventRecursion!==!1},{position:ee,depth:q.depth||2}),u))}let S=new Set(f.map(T=>T.comment).filter(Boolean)),_=p.filter(T=>!T.comment||!T.comment.startsWith(a)?!1:!S.has(T.comment));if(_.length>0){let T=_.map(M=>M.uid).filter(Boolean);T.length>0&&typeof o.deleteLorebookEntries=="function"&&(await Promise.resolve(o.deleteLorebookEntries(r,T)),Xr.info(`\u5DF2\u6E05\u7406 ${T.length} \u4E2A\u65E7\u4E16\u754C\u4E66\u6761\u76EE [${n}]`))}let W=f.filter(T=>T.action==="created").length,C=f.filter(T=>T.action==="updated").length;return Xr.info(`\u4E16\u754C\u4E66\u540C\u6B65\u5B8C\u6210 [${n}]\uFF1A${W} \u521B\u5EFA, ${C} \u66F4\u65B0, ${_.length} \u6E05\u7406`),{success:!0,results:f,stats:{created:W,updated:C,cleaned:_.length},targetBook:r,chatId:n}}catch(p){return Xr.warn("\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25:",p),{success:!1,error:p?.message||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25"}}}var Xr,Tg,Od=U(()=>{_s();ce();Md();Cd();Xr=N.createScope("TableWorldbookSync"),Tg="YYT-"});function pn(t,e=""){return t==null?e:String(t).trim()||e}function $g(t={}){return{tables:Array.isArray(t?.tables)?ye(t.tables):[]}}function Pg(t={},e={}){let s=pn(e.mirrorTag,"yyt-table-workbench"),r=$g(t);return[`<${s}>`,"[\u586B\u8868\u5DE5\u4F5C\u53F0]","```json",JSON.stringify(r,null,2),"```",`</${s}>`].join(`
`)}async function Ld({targetSnapshot:t,nextTables:e,config:s,loadResult:r=null,diff:o=null,fillMode:n="",skipNotify:a=!1}={}){let i=ut(s),l=await _d(t,{tables:Array.isArray(e)?ye(e):[],meta:{lastLoadMode:pn(r?.loadMode,""),lastFillMode:pn(n),mergeBaseOnly:!1,updatedBy:pn(t?.runSource,"MANUAL_TABLE")}});if(!l?.success)return{success:!1,error:l?.error||"table_state_commit_failed",commitResult:l,mirrorResult:null,warning:""};let c=null,d=null,y="";if(i.mirrorToMessage){let p=Pg(l.state,{mirrorTag:i.mirrorTag});c=await et.injectDetailed(Rg,p,{overwrite:!0,extractionSelectors:[i.mirrorTag],sourceMessageId:l.sourceMessageId,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId,effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId,slotBindingKey:t?.slotBindingKey,slotRevisionKey:t?.slotRevisionKey,slotTransactionId:t?.slotTransactionId,traceId:t?.traceId,skipNotify:a}),c?.success||(y=c?.error||"\u6B63\u6587\u955C\u50CF\u5199\u56DE\u5931\u8D25")}return i.worldbookSync?.enabled&&(d=await Pd(Array.isArray(e)?e:[],i),d&&!d.success&&!d.skipped&&(y=y?`${y}; ${d.error}`:d.error||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25")),{success:!0,state:l.state,bindings:l.bindings,diff:o,fillMode:n,commitResult:l,mirrorResult:c,worldbookSyncResult:d,warning:y}}var Rg,Dd=U(()=>{ks();st();un();is();Od();Rg="tableWorkbenchMirror"});function Og(t){let e=[],s;for(Nd.lastIndex=0;(s=Nd.exec(t))!==null;)e.push(s[1].trim());return e.length>0?e[e.length-1]:""}function Lg(t){let e=[],s=t.split(/\r?\n/).map(o=>o.trim()).filter(Boolean),r="";for(let o of s)if(r+=o,r.includes("(")&&r.includes(")")){let n=r.match(/(insertRow|updateRow|deleteRow)\s*\(\s*(-?\d+)\s*,?\s*(-?\d+)?\s*,?\s*(.*?)?\)\s*;?\s*$/);if(n){let a=n[1],i=parseInt(n[2],10),l=n[3]!==void 0?parseInt(n[3],10):void 0,c={},d=n[4];if(d)try{c=JSON.parse(d)}catch{c=Dg(d)}a==="insertRow"?(e.push({op:a,tableIndex:i,rowIndex:-1,data:l!==void 0&&typeof l=="number"&&!d?{}:typeof l=="number"?c:typeof l=="object"?l:c}),a==="insertRow"&&l!==void 0&&typeof l=="object"&&(e[e.length-1].data=l)):e.push({op:a,tableIndex:i,rowIndex:l??-1,data:c})}r=""}return e}function Dg(t){if(!t||typeof t!="string")return{};let e={},s=t.replace(/^\{|\}$/g,"").trim();if(!s)return e;let r=Ng(s,",");for(let o of r){let n=o.indexOf(":");if(n<0)continue;let a=o.slice(0,n).trim().replace(/^["']|["']$/g,""),i=o.slice(n+1).trim();i=i.replace(/^["']|["']$/g,""),a&&(e[a]=i)}return e}function Ng(t,e){let s=[],r=0,o="",n=!1,a="";for(let i=0;i<t.length;i++){let l=t[i];if(n){o+=l,l===a&&t[i-1]!=="\\"&&(n=!1);continue}if(l==='"'||l==="'"){n=!0,a=l,o+=l;continue}if(l==="{"||l==="["?r++:(l==="}"||l==="]")&&r--,l===e&&r===0){s.push(o.trim()),o="";continue}o+=l}return o.trim()&&s.push(o.trim()),s}function zd(t){let e=t.replace(/\/\/.*$/gm,"").replace(/\/\*[\s\S]*?\*\//g,"");return e=e.replace(/,\s*([}\]])/g,"$1"),e=e.replace(/'/g,'"'),e}function Bg(t){let e=t;for(let s=0;s<3&&(e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'"));s++)try{let r=JSON.parse(e);if(typeof r=="string")e=r;else break}catch{break}return e}function zg(t){let e=Og(t);if(!e)return null;let s=Lg(e);return s.length>0?s:null}function Ug(t){let e=[],s=l=>{let c=String(l||"").trim();c&&!e.includes(c)&&e.push(c)};Bd.lastIndex=0;let r;for(;(r=Bd.exec(t))!==null;)s(r[1]);s(t);let o=t.indexOf("{"),n=t.lastIndexOf("}");o>=0&&n>o&&s(t.slice(o,n+1));let a=t.indexOf("["),i=t.lastIndexOf("]");a>=0&&i>a&&s(t.slice(a,i+1));for(let l of e){let c=null;try{c=JSON.parse(l)}catch{}if(!c)try{c=JSON.parse(zd(l))}catch{}if(!c){let d=Bg(l);if(d!==l){try{c=JSON.parse(d)}catch{}if(!c)try{c=JSON.parse(zd(d))}catch{}}}if(c){let d=null;if(Array.isArray(c)?d=c:Array.isArray(c.tables)?d=c.tables:c.data&&Array.isArray(c.data.tables)&&(d=c.data.tables),d)return d}}return null}function Ud(t){if(!t||typeof t!="string")return{mode:"empty",edits:null,tables:null};let e=zg(t);if(e)return{mode:"incremental",edits:e,tables:null};let s=Ug(t);return s?{mode:"full",edits:null,tables:s}:{mode:"empty",edits:null,tables:null}}var Nd,Bd,jd=U(()=>{Nd=/<tableEdit>([\s\S]*?)<\/tableEdit>/g,Bd=/```(?:json)?\s*([\s\S]*?)```/gi});function jg(t,e){let s=new Map;Array.isArray(t)&&t.forEach((n,a)=>{n&&typeof n=="object"&&s.set(n.name||`__row_${a}`,n)});let r=new Map;Array.isArray(e)&&e.forEach((n,a)=>{n&&typeof n=="object"&&r.set(n.name||`__row_${a}`,n)});let o={};for(let[n,a]of r){let i=s.get(n);if(i){o[n]={};let l=new Set([...Object.keys(i.cells||{}),...Object.keys(a.cells||{})]);for(let c of l){let d=String((i.cells&&i.cells[c])??""),y=String((a.cells&&a.cells[c])??"");o[n][c]=d===y?"unchanged":"updated"}o[n].__rowStatus="kept"}else{if(o[n]={},a.cells&&typeof a.cells=="object")for(let l of Object.keys(a.cells))o[n][l]="new";o[n].__rowStatus="new"}}for(let[n]of s)r.has(n)||(o[n]={__rowStatus:"deleted"});return o}function Wd(t,e){let s=Array.isArray(t)?ye(t):[],r=Array.isArray(e)?ye(e):[],o={},n=Math.max(s.length,r.length);for(let a=0;a<n;a++){let i=s[a],l=r[a];!i&&l?(o[a]={},Array.isArray(l.rows)&&l.rows.forEach(c=>{let d=c.name||`__row_${l.rows.indexOf(c)}`;o[a][d]={__rowStatus:"new"}})):i&&!l?(o[a]={},Array.isArray(i.rows)&&i.rows.forEach(c=>{let d=c.name||`__row_${i.rows.indexOf(c)}`;o[a][d]={__rowStatus:"deleted"}})):i&&l&&(o[a]=jg(i.rows,l.rows))}return o}var Fd=U(()=>{st()});function Wg(){return{mode:"native",async buildRequest(t={},e={}){if(typeof t.buildRequest!="function")throw new Error("table_provider_missing_build_request");return t.buildRequest(e)},async sendRequest(t={},e=null,s={}){if(typeof t.sendRequest!="function")throw new Error("table_provider_missing_send_request");return t.sendRequest(e?.messages||[],s.config||{},s.abortSignal||null)},parseResponse(t={},e=""){if(typeof t.parseResponse!="function")throw new Error("table_provider_missing_parse_response");return t.parseResponse(e)}}}function Kd(){return Wg()}var Hd=U(()=>{});function Fg(t){if(!t||typeof t!="object")return{};let e={};for(let[s,r]of Object.entries(t))!r||typeof r!="object"||!r.scope||!Object.values(va).includes(r.scope)||(e[s]={scope:r.scope,lockedAt:Number.isFinite(r.lockedAt)?r.lockedAt:Date.now()});return e}function qd(t){return!t||!t.meta?{}:Fg(t.meta.locks)}function Yd(t,e,s,r){return!t||typeof t!="object"?!1:!!(t[en(e,s,r)]||t[en(e,s,"*")]||t[en(e,-1,r)])}function Wa(t,e,s){return!t||typeof t!="object"?!1:Object.entries(t).some(([r,o])=>{if(o.scope!==va.ROW)return!1;let n=r.split(":");return Number(n[0])===e&&Number(n[1])===s})}var Gd=U(()=>{st()});function Xe(){return N.createScope("TableUpdate")}function H(t,e=""){return t==null?e:String(t).trim()||e}function Vd(t=[],e=8,s="all"){if(!Array.isArray(t)||t.length===0)return"";let r=s==="assistant_only"?t.filter(o=>o?.role==="assistant"):t;return r.slice(Math.max(r.length-e,0)).map(o=>`[${H(o?.role,"unknown")}] ${String(o?.content||"").trim()}`).filter(Boolean).join(`

`)}function Jd(t,{extractTags:e=[],useGlobalRules:s=!1}={}){if(!t)return t;let r=Array.isArray(e)&&e.length>0;if(!r&&!s)return t;try{let o=[],n=[];if(r&&(o=e.map(a=>{let i=String(a||"").trim();return i.startsWith("regex:")?{type:"regex_include",value:i.slice(6).trim(),enabled:!0}:{type:"include",value:i,enabled:!0}}).filter(a=>a.value)),s){let a=ht()||[];o=[...o,...a.filter(i=>i?.enabled)],n=zt()||[]}return o.length===0&&n.length===0?t:Bt(t,o,n)||t}catch(o){return Xe().warn("applyContextExtractionRules \u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",o),t}}function Kg(t=[],e=-1){return!Number.isFinite(e)||e<0?t:t.map(s=>{let r=Array.isArray(s?.rows)?s.rows:[];return e===0||r.length<=e?s:{...s,rows:r.slice(r.length-e)}})}function Hg(t=[]){return!Array.isArray(t)||t.length===0?"":t.map((e,s)=>{let r=e?.aiInstructions&&typeof e.aiInstructions=="object"?e.aiInstructions:{},o=Array.isArray(e?.columns)?e.columns:[],n=[`\u8868 ${s}: ${H(e?.name,`\u8868${s+1}`)}`,`\u8868\u683C\u8BF4\u660E: ${H(e?.note,"\u65E0")}`,`\u521D\u59CB\u5316\u8BF4\u660E: ${H(r.init,"\u65E0")}`,`\u65B0\u589E\u8BF4\u660E: ${H(r.create,"\u65E0")}`,`\u66F4\u65B0\u8BF4\u660E: ${H(r.update,"\u65E0")}`,`\u5220\u9664\u8BF4\u660E: ${H(r.delete,"\u65E0")}`,"\u5B57\u6BB5:"];return o.forEach(a=>{n.push(`- ${H(a?.title||a?.key,"\u672A\u547D\u540D\u5B57\u6BB5")} (${H(a?.key,"")}): ${H(a?.description,"\u65E0")}`)}),n.join(`
`)}).join(`

`)}function qg(t,e=[]){if(!t||!Array.isArray(e)||e.length===0)return"";let s=e.map((o,n)=>{let a=H(o?.name,`\u8868${n+1}`),i=t.includes(o,n);return`\u8868 ${n}: ${a} - ${i?"\u5141\u8BB8\u7F16\u8F91":"\u53EA\u8BFB\uFF0C\u7981\u6B62\u4FEE\u6539"}`});return e.some((o,n)=>!t.includes(o,n))&&(s.push(""),s.push('\u3010\u91CD\u8981\u7EA6\u675F\u3011\u6807\u8BB0\u4E3A"\u53EA\u8BFB"\u7684\u8868\u683C\uFF0C\u4F60\u5FC5\u987B\u5728\u8F93\u51FA\u4E2D\u539F\u6837\u4FDD\u7559\u5176\u6240\u6709\u884C\u6570\u636E\uFF0C\u4E0D\u5F97\u65B0\u589E\u3001\u4FEE\u6539\u6216\u5220\u9664\u4EFB\u4F55\u884C\u3002'),s.push("\u5168\u91CF\u8F93\u51FA\u65F6\uFF0C\u53EA\u8BFB\u8868\u683C\u7684 rows \u5FC5\u987B\u4E0E\u8F93\u5165\u4E2D\u7684\u5B8C\u5168\u4E00\u81F4\u3002")),s.join(`
`)}function Qd(t={},e=0,s=[]){let r=t&&typeof t=="object"?t:{},o=r.cells&&typeof r.cells=="object"&&!Array.isArray(r.cells)?r.cells:{},n={},a=Array.isArray(s)?s.map(l=>H(l?.key,"")).filter(Boolean):[];return new Set([...Object.keys(o),...a]).forEach(l=>{n[l]=H(o[l],"")}),{...r,id:zr(r.id||r.rowId,e),name:H(r.name,""),cells:n}}function Ns(t={},e=0){let s=t&&typeof t=="object"?t:{},r=Array.isArray(s.columns)?ye(s.columns):[],o=Array.isArray(s.rows)?s.rows.map((n,a)=>Qd(n,a,r)):[];return{...s,id:Ve(s.id||s.key,e),rows:o}}function $t(t=[]){return Array.isArray(t)?t.map((e,s)=>Ns(e,s)):[]}function Yg(t=[],e=[],s){let r=$t(t),o=$t(e);if(!s)return o;let n=new Map(o.map((y,p)=>[Ve(y?.id||y?.key,p),y])),a=r.map((y,p)=>({table:y,tableIndex:p,id:Ve(y?.id||y?.key,p)})).filter(({table:y,tableIndex:p})=>s.includes(y,p)),i=new Set,l=new Map;for(let y=0;y<o.length;y++){let p=o[y],u=Ve(p?.id||p?.key,y);n.has(u)&&(l.set(u,p),i.add(u))}let c=0,d=o.filter((y,p)=>{let u=Ve(y?.id||y?.key,p);return!i.has(u)});return r.map((y,p)=>{let u=Ve(y?.id||y?.key,p);if(!s.includes(y,p))return Ns(y,p);let f=l.get(u);if(f)return Ns(f,p);let h=d[c];return h?(c++,Ns({...h,id:y.id||h.id},p)):Ns(y,p)})}function Gg(t=[],e=[],s,r={}){if(!Array.isArray(t)||!s)return{edits:[],stats:{total:0,passed:0,droppedByScope:0,droppedByLock:0}};let o=$t(e),n=[],a=0,i=0;for(let l of t){let c=Number.isFinite(l?.tableIndex)?l.tableIndex:-1;if(c<0||c>=o.length){a++;continue}let d=o[c];if(!s.includes(d,c)){a++;continue}if(l.op===Wt.INSERT_ROW){n.push(l);continue}let y=Number.isFinite(l?.rowIndex)?l.rowIndex:-1;if(y<0||y>=(Array.isArray(d?.rows)?d.rows.length:0)){a++;continue}if(l.op===Wt.DELETE_ROW){if(Wa(r,c,y)){i++;continue}n.push(l);continue}n.push(l)}return{edits:n,stats:{total:t.length,passed:n.length,droppedByScope:a,droppedByLock:i}}}function Vg(t=[],e){let s=$t(t);return e?s.map((r,o)=>{let n=Array.isArray(r?.columns)?r.columns:[];return e.includes(r,o)?{...Ns(r,o),scopeEditable:!0,scopeStatus:"editable"}:{...Ns(r,o),scopeEditable:!1,scopeStatus:"readonly",rows:Array.isArray(r?.rows)?r.rows.map((a,i)=>Qd(a,i,n)):[]}}):s}function Jg(t,e,s){return{target:{sourceMessageId:H(t?.sourceMessageId),sourceSwipeId:H(t?.sourceSwipeId||t?.effectiveSwipeId),slotBindingKey:H(t?.slotBindingKey),slotRevisionKey:H(t?.slotRevisionKey),slotTransactionId:H(t?.slotTransactionId)},loadMode:H(e?.loadMode),mergeBaseOnly:e?.mergeBaseOnly===!0,resolvedFromMessageId:H(e?.resolvedFromMessageId),resolvedFromRevisionKey:H(e?.resolvedFromRevisionKey),sourceKind:H(e?.sourceKind||e?.state?.meta?.sourceKind),scope:typeof s?.toJSON=="function"?s.toJSON():null,tables:Vg(e?.state?.tables,s)}}function Xd(){return Xg}function Qg(t){if(!Array.isArray(t))return[];let e={[Wt.UPDATE_ROW]:0,[Wt.INSERT_ROW]:1,[Wt.DELETE_ROW]:2};return[...t].sort((s,r)=>{let o=e[s.op]??99,n=e[r.op]??99;return o===2&&n===2?(r.rowIndex??0)-(s.rowIndex??0):o-n})}function Zg(t,e,s,r=null){let o=$t(t||[]),n=s||{};for(let a of e){let i=a.tableIndex;if(i<0||i>=o.length)continue;let l=o[i];if(!l||!Array.isArray(l.rows)||r&&!r.includes(l,i))continue;if(a.op===Wt.INSERT_ROW){let d={id:Zo("row"),name:"",cells:{}};if(a.data&&typeof a.data=="object"){d.name=H(a.data.name,"");let y=Array.isArray(l.columns)?l.columns:[];for(let p of y){let u=p.key;a.data[u]!==void 0&&(d.cells[u]=H(a.data[u]))}for(let[p,u]of Object.entries(a.data))p!=="name"&&d.cells[p]===void 0&&(d.cells[p]=H(u))}l.rows.push(d);continue}let c=a.rowIndex;if(!(c<0||c>=l.rows.length)){if(a.op===Wt.DELETE_ROW){if(Wa(n,i,c))continue;l.rows.splice(c,1);continue}if(a.op===Wt.UPDATE_ROW){let d=l.rows[c];if(!d)continue;if(d.id=zr(d.id||d.rowId,c),d.cells=d.cells||{},a.data&&typeof a.data=="object"){for(let[y,p]of Object.entries(a.data))y!=="name"&&(Yd(n,i,c,y)||(d.cells[y]=H(p)));a.data.name!==void 0&&(d.name=H(a.data.name,d.name))}}}}return $t(o)}async function em({executionContext:t,targetSnapshot:e,loadResult:s,config:r,assistantSnapshot:o,fillMode:n,runScope:a}={}){let i=ut(r),l=ad(i),c=Jg(e,s,a),d=Array.isArray(o?.tableState?.tables)?$t(o.tableState.tables):[],y=n==="incremental"||!n&&i.fillMode!=="full",p=t?.chatHistory||t?.chatMessages||[],{contextDepth:u,contextRoles:f,contextExtractTags:h,contextUseGlobalRules:v,sendLatestRows:w}=i,S=Vd(p,u,f),_=Vd(p,u,"all"),W=Jd(S,{extractTags:h,useGlobalRules:v}),C=Jd(_,{extractTags:h,useGlobalRules:v}),T=await Vs({worldbooks:i.worldbooks}),M=Kg(c.tables,w),j={...c,tables:M},z={...t,toolName:"\u586B\u8868\u5DE5\u4F5C\u53F0",toolId:"tableWorkbench",lastAiMessage:t?.assistantBaseText||t?.lastAiMessage||"",recentMessagesText:W,rawRecentMessagesText:C,toolWorldbookContent:T,tableGuidance:Hg(i.tables),tableScopeGuidance:qg(a,c.tables),injectedContext:o?.injectedContext||et.getLatestMessageInjectedContext(e?.sourceMessageId),toolContentMacro:JSON.stringify(j,null,2),extractedContent:JSON.stringify(j,null,2),previousToolOutput:JSON.stringify(d,null,2)},$=await Is.buildToolMessages(l,z),q=await Is.buildPromptText(l,z);if(y&&(q+=Xd(),Array.isArray($)&&$.length>0)){let ee=$[$.length-1];ee&&typeof ee.content=="string"&&(ee.content+=Xd())}if(!Array.isArray($)||$.length===0)throw new Error("\u586B\u8868\u8BF7\u6C42\u6D88\u606F\u6784\u5EFA\u5931\u8D25\u3002");return{toolConfig:l,context:z,requestPayload:c,promptText:q,messages:$,fillMode:y?"incremental":"full",runScope:typeof a?.toJSON=="function"?a.toJSON():null}}async function tm(t,e={},s=null){let r=ut(e),o=H(r.apiPreset,"");if(o){if(!fr(o))throw new Error(`API \u9884\u8BBE\u4E0D\u5B58\u5728: ${o}`);return Mn(o,t,{},s)}return gr(t,{},s)}function ds({status:t=we.IDLE,targetSnapshot:e=null,skipReason:s="",startedAt:r=Date.now(),error:o=""}={}){return{lastAutoRunAt:r,lastAutoStatus:H(t,we.IDLE),lastAutoMessageId:H(e?.sourceMessageId,""),lastAutoRevisionKey:H(e?.slotRevisionKey,""),lastAutoSkipReason:H(s,""),...o?{lastError:o,lastErrorDetails:[o]}:{}}}function qt(t={},e=Le.MANUAL){let s=t&&typeof t=="object"?t:{};return Object.keys(s).length?nd(s):null}function ar({targetSnapshot:t=null,startedAt:e=Date.now(),status:s="idle",skipReason:r="",warning:o="",writeback:n=null,aborted:a=!1,stale:i=!1,abortReason:l="",error:c=""}={}){return{isAutoRun:!0,status:s,startedAt:e,targetSnapshot:t,sourceMessageId:H(t?.sourceMessageId,""),sourceSwipeId:H(t?.sourceSwipeId||t?.effectiveSwipeId,""),slotRevisionKey:H(t?.slotRevisionKey,""),writebackStatus:n?.success===!0?"success":o?"warning":"",refreshConfirmed:n?.mirrorResult?.refreshConfirmed===!0,warning:H(o,""),skipReason:H(r,""),aborted:a===!0,stale:i===!0,abortReason:H(l,""),error:H(c,"")}}function Fa(t=null){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}async function Zd(t=null){return ty({configInput:t,runSource:Le.MANUAL,executionContextBuilder:()=>Ss({runSource:Le.MANUAL}),targetResolver:e=>Yr(e,{runSource:Le.MANUAL})})}async function ey({messageId:t,swipeId:e="",sourceEvent:s="AUTO_TABLE",configInput:r=null,signal:o=null,shouldAbortWriteback:n=null}={}){return ty({configInput:r,runSource:Le.AUTO,autoMeta:{sourceEvent:s,messageId:H(t,""),swipeId:H(e,""),signal:o,shouldAbortWriteback:n},executionContextBuilder:()=>Ts({messageId:t,swipeId:e,runSource:Le.AUTO}),targetResolver:a=>Yr(a,{runSource:Le.AUTO})})}async function ty({configInput:t=null,runSource:e=Le.MANUAL,executionContextBuilder:s,targetResolver:r,autoMeta:o=null}={}){let n=ut(t||$e()),a=La(n),i=Ft({tables:Array.isArray(n.tables)?n.tables:[]}),l=e===Le.AUTO,c=Date.now();if(Xe().info(`\u5F00\u59CB\u586B\u8868 [${e}]`,{isAutoRun:l,fillMode:n.fillMode}),!a.valid||!i.valid){let u=[...a.errors,...i.errors];return Xe().error("\u914D\u7F6E\u6821\u9A8C\u5931\u8D25",{errors:u}),qt({lastStatus:we.ERROR,lastRunAt:c,lastDurationMs:0,lastError:u[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002",lastErrorDetails:u,lastValidationSummary:i.summary||{errorCount:u.length,warningCount:0},errorCount:Number(n?.runtime?.errorCount)||0,...l?ds({status:we.ERROR,startedAt:c,skipReason:"invalid_config",error:u[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"}):{}},e),{success:!1,error:u.join(`
`),errors:u,...l?{meta:ar({startedAt:c,status:we.ERROR,skipReason:"invalid_config",error:u[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"})}:{}}}let d=n.runtime||{},y=Wc(n.scope||n,n.tables);if((y.mode==="current"||y.mode==="selected")&&y.allowedTableIds.length===0){let u=y.mode==="current"?"\u672A\u6307\u5B9A\u5F53\u524D\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002":"\u672A\u9009\u62E9\u4EFB\u4F55\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002";return Xe().warn(u,{mode:y.mode}),qt({lastStatus:we.ERROR,lastRunAt:c,lastDurationMs:0,lastError:u,lastErrorDetails:[u]},e),{success:!1,error:u,errors:[u]}}let p=null;qt({lastStatus:we.RUNNING,lastError:"",lastErrorDetails:[],lastValidationSummary:i.summary||{errorCount:0,warningCount:0},lastScopeMode:H(y.mode,""),...l?ds({status:we.RUNNING,startedAt:c,skipReason:""}):{}},e);try{if(typeof s!="function")throw new Error("table_update_missing_execution_context_builder");if(typeof r!="function")throw new Error("table_update_missing_target_resolver");let u=await s();Xe().info("\u6267\u884C\u4E0A\u4E0B\u6587\u5DF2\u6784\u5EFA");let f=r(u);if(!f)throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u697C\u5C42\u3002");p=f,Xe().info("\u76EE\u6807\u6D88\u606F\u5DF2\u89E3\u6790",{sourceMessageId:f.sourceMessageId,slotRevisionKey:f.slotRevisionKey}),l&&qt(ds({status:we.RUNNING,targetSnapshot:f,startedAt:c,skipReason:""}),e);let h=H(n.autoUpdateTrigger,"assistantMessage");if(l&&(!n.autoUpdateEnabled||h!=="assistantMessage")){let te=n.autoUpdateEnabled?"auto_trigger_not_assistant_message":"auto_update_disabled";return qt(ds({status:we.SKIPPED,targetSnapshot:f,startedAt:c,skipReason:te}),e),{success:!1,skipped:!0,reason:te,targetSnapshot:f,meta:ar({targetSnapshot:f,startedAt:c,status:we.SKIPPED,skipReason:te})}}if(l){let te=Fa(o);if(te)return qt(ds({status:we.ABORTED,targetSnapshot:f,startedAt:c,skipReason:te.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:f,meta:ar({targetSnapshot:f,startedAt:c,status:we.ABORTED,skipReason:te.reason,aborted:te.aborted===!0,stale:te.stale===!0,abortReason:te.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}let v=await Td(f);if(!v?.success)throw new Error(v?.error||"\u76EE\u6807\u89E3\u6790\u8BB0\u5F55\u5931\u8D25");let w=Ad(f.sourceMessageId),S=Sd(f,{templateTables:n.tables}),_=$t(S?.state?.tables||[]),W=Kd(),C=o?.signal||u?.signal||null;Xe().info("\u72B6\u6001\u5DF2\u52A0\u8F7D",{loadMode:S?.loadMode,sourceKind:S?.sourceKind,tableCount:_.length});let T=await W.buildRequest({buildRequest:em},{executionContext:u,targetSnapshot:f,loadResult:S,config:n,assistantSnapshot:w,runScope:y});Xe().info("\u8BF7\u6C42\u5DF2\u6784\u5EFA",{messageCount:T?.messages?.length,fillMode:T?.fillMode});let M=await W.sendRequest({sendRequest:tm},T,{config:n,abortSignal:C});Xe().info("API \u54CD\u5E94\u5DF2\u6536\u5230",{responseLength:M?.length||0});let j=W.parseResponse({parseResponse:Ud},M);Xe().info("\u54CD\u5E94\u5DF2\u89E3\u6790",{mode:j?.mode,hasEdits:!!j?.edits,hasTables:!!j?.tables});let z,$=null,q=T.fillMode||"full",ee=null;if(j.mode==="incremental"&&j.edits){let te=qd(S?.state),Te=Gg(j.edits,_,y,te);ee=Te.stats;let Pe=Qg(Te.edits);z=Zg(_,Pe,te,y),q="incremental",(ee.droppedByScope>0||ee.droppedByLock>0)&&Xe().info("scope \u8FC7\u6EE4",ee)}else if(j.mode==="full"&&j.tables){let te=$t(j.tables);z=Yg(_,te,y),q="full"}else z=$t(_);$=Wd(_,z),Xe().info("\u5DEE\u5F02\u5DF2\u8BA1\u7B97",{fillMode:q});let F=await Ld({targetSnapshot:f,nextTables:z,config:n,loadResult:S,diff:$,fillMode:q,skipNotify:l});if(l){let te=Fa(o);if(te)return qt(ds({status:we.ABORTED,targetSnapshot:f,startedAt:c,skipReason:te.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:f,loadResult:S,request:T,responseText:M,parsed:j,fillMode:q,diff:$,previousTables:_,nextTables:z,runScope:y,state:F?.state,bindings:F?.bindings,mirrorResult:F?.mirrorResult,warning:F?.warning||"",meta:ar({targetSnapshot:f,startedAt:c,status:we.ABORTED,warning:F?.warning||"",writeback:F,aborted:te.aborted===!0,stale:te.stale===!0,abortReason:te.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}if(!F?.success)throw new Error(F?.error||"\u7ED3\u6784\u5316\u5199\u56DE\u5931\u8D25");let ne=Date.now()-c;Xe().info(`\u586B\u8868\u5B8C\u6210 [${q}] ${ne}ms`,{success:!0,writebackSuccess:F?.success,mirrorSuccess:F?.mirrorResult?.success});let ae={lastStatus:we.SUCCESS,lastRunAt:Date.now(),lastDurationMs:ne,lastError:"",lastErrorDetails:[],lastValidationSummary:i.summary||{errorCount:0,warningCount:0},successCount:(Number(d.successCount)||0)+1,errorCount:Number(d.errorCount)||0,lastSourceMessageId:H(f.sourceMessageId),lastSlotRevisionKey:H(f.slotRevisionKey),lastLoadMode:H(S.loadMode),lastMirrorApplied:F?.mirrorResult?.success===!0,lastResolvedFromMessageId:H(S?.resolvedFromMessageId),lastResolvedFromRevisionKey:H(S?.resolvedFromRevisionKey),lastSourceKind:H(S?.sourceKind||S?.state?.meta?.sourceKind),lastScopeMode:H(y.mode,""),lastFillMode:q,...l?ds({status:we.SUCCESS,targetSnapshot:f,startedAt:c,skipReason:""}):{}};return qt(ae,e),{success:!0,targetSnapshot:f,loadResult:S,request:T,responseText:M,parsed:j,fillMode:q,diff:$,previousTables:_,nextTables:z,runScope:y,scopeStats:ee,state:F.state,bindings:F.bindings,mirrorResult:F.mirrorResult,warning:F.warning||"",...l?{meta:ar({targetSnapshot:f,startedAt:c,status:we.SUCCESS,warning:F.warning||"",writeback:F})}:{}}}catch(u){let f=Date.now()-c;Xe().error(`\u586B\u8868\u5931\u8D25 ${f}ms: ${u?.message||u}`,{stack:u?.stack});let h=l?Fa(o):!1,v=u?.name==="AbortError"||u?.message==="\u8BF7\u6C42\u5DF2\u53D6\u6D88"||h?.aborted===!0||h?.stale===!0,w=v?we.ABORTED:we.ERROR,S={lastStatus:w,lastRunAt:Date.now(),lastDurationMs:f,lastError:u?.message||String(u),lastErrorDetails:[u?.message||String(u)],lastValidationSummary:i.summary||{errorCount:0,warningCount:0},successCount:Number(d.successCount)||0,errorCount:v?Number(d.errorCount)||0:(Number(d.errorCount)||0)+1,lastScopeMode:H(y.mode,""),...l?ds({status:w,targetSnapshot:p,startedAt:c,skipReason:v?h?.reason||"cancelled_before_host_commit":"",error:u?.message||String(u)}):{}};return qt(S,e),{success:!1,error:u?.message||String(u),errors:[u?.message||String(u)],...l?{meta:ar({targetSnapshot:p,startedAt:c,status:w,skipReason:v?h?.reason||"cancelled_before_host_commit":"",aborted:v,stale:h?.stale===!0,abortReason:v?h?.reason||"cancelled_before_host_commit":"",error:u?.message||String(u)})}:{}}}}var Xg,Ka=U(()=>{_s();ks();mr();Ho();ce();st();dn();un();is();Dd();jd();Fd();nn();Hd();Gd();$r();_r();Xg=`

\u3010\u8868\u683C\u7F16\u8F91\u6307\u4EE4\u683C\u5F0F\u3011
\u8BF7\u4F7F\u7528 <tableEdit> \u6807\u7B7E\u8FD4\u56DE\u5BF9\u8868\u683C\u7684\u4FEE\u6539\uFF0C\u652F\u6301\u4E09\u79CD\u64CD\u4F5C\uFF1A

1. \u63D2\u5165\u65B0\u884C\uFF1AinsertRow(\u8868\u7D22\u5F15, {"\u5217\u952E": "\u503C", ...})
2. \u66F4\u65B0\u73B0\u6709\u884C\uFF1AupdateRow(\u8868\u7D22\u5F15, \u884C\u7D22\u5F15, {"\u5217\u952E": "\u65B0\u503C", ...})
3. \u5220\u9664\u884C\uFF1AdeleteRow(\u8868\u7D22\u5F15, \u884C\u7D22\u5F15)

\u5176\u4E2D\u8868\u7D22\u5F15\u4ECE0\u5F00\u59CB\uFF0C\u884C\u7D22\u5F15\u4E5F\u662F\u4ECE0\u5F00\u59CB\u3002
\u4E00\u6B21\u53EF\u4EE5\u5305\u542B\u591A\u4E2A\u64CD\u4F5C\uFF0C\u6BCF\u4E2A\u64CD\u4F5C\u4E00\u884C\u3002
\u5982\u679C\u4E0D\u9700\u8981\u4FEE\u6539\u8868\u683C\uFF0C\u8FD4\u56DE\u7A7A\u7684 <tableEdit></tableEdit>\u3002

\u793A\u4F8B\uFF1A
<tableEdit>
insertRow(0, {"name": "\u65B0\u89D2\u8272", "age": "25", "role": "\u6218\u58EB"})
updateRow(0, 1, {"age": "26"})
deleteRow(1, 0)
</tableEdit>

\u53EA\u8FD4\u56DE <tableEdit> \u6807\u7B7E\uFF0C\u4E0D\u8981\u9644\u52A0\u5176\u4ED6\u5185\u5BB9\u3002`});var ly={};re(ly,{TableWorkbenchPanel:()=>iy,default:()=>Am});function oe(t,e=""){return typeof t=="string"&&t.trim()?t.trim():e}function pt(t,e){let s=Array.isArray(t)?t.length:0;return s<=0||!Number.isInteger(e)||e<0?0:Math.min(e,s-1)}function Ha(t){try{return JSON.stringify(t,null,2)}catch{return String(t??"")}}function rm(){return id({apiPresets:Dt()})}function Zr(t,e){return oe(t?.aiInstructions?.[e],"")}function om(t={}){return{init:Zr(t,"init"),create:Zr(t,"create"),update:Zr(t,"update"),delete:Zr(t,"delete")}}function gn(t){let e=oe(t,"idle");return e==="running"?"\u8FD0\u884C\u4E2D":e==="success"?"\u6700\u8FD1\u6210\u529F":e==="error"?"\u6700\u8FD1\u5931\u8D25":e==="aborted"?"\u5DF2\u4E2D\u6B62":e==="skipped"?"\u5DF2\u8DF3\u8FC7":"\u672A\u8FD0\u884C"}function oy(t){return t?new Date(t).toLocaleString():"\u2014"}function nm(t){return Number.isFinite(t)&&t>0?`${(t/1e3).toFixed(t>=1e3?1:2)}s`:"\u2014"}function fn(t,e){return oe(t?.id||t?.key,`table_${e}`)}function qa(t,e,s){if(!Array.isArray(t))return[];let r=Array.isArray(e)&&e.length>0&&e.some(n=>Array.isArray(n?.rows)&&n.rows.length>0),o=new Map;return r&&e.forEach((n,a)=>{let i=Ve(n?.id||n?.key,a);o.set(i,n)}),t.map((n,a)=>{let i=Ve(n?.id||n?.key,a),l=o.get(i)||(r&&a<e.length?e[a]:null);return l&&r&&Array.isArray(l.rows)?{...n,rows:ye(l.rows),__liveSourceKind:"live"}:{...n,__liveSourceKind:"template"}})}function ny(t){return{columns:Array.isArray(t?.columns)?t.columns.length:0,rows:Array.isArray(t?.rows)?t.rows.length:0}}function am(t){let e=ny(t);return`${e.columns} \u5B57\u6BB5 \xB7 ${e.rows} \u884C`}function Ue(t,e){let s=O(),r=e&&typeof e=="object"?e:$e();if(!s||!K(t))return r;let o={...r,runtime:r.runtime||{},scope:r.scope&&typeof r.scope=="object"?{mode:oe(r.scope.mode||r.runScope,"enabled"),selectedTableIds:Array.isArray(r.scope.selectedTableIds)?[...r.scope.selectedTableIds]:[],activeTableId:oe(r.scope.activeTableId,"")}:{mode:oe(r.runScope,"enabled"),selectedTableIds:[],activeTableId:""}},n=Array.isArray(o.tables)?[...o.tables]:[],a=pt(n,o.__activeTableIndex??0);if(n[a]){let F=n[a]||{},ne={...F,aiInstructions:om(F)},ae=t.find("[data-twb-name]");ae.length&&(ne.name=String(ae.val()||"").trim());let te=t.find("[data-twb-note]");te.length&&(ne.note=String(te.val()||"").trim()),t.find("[data-twb-table-instruction]").each(function(){let Te=String(s(this).attr("data-twb-table-instruction")||"").trim();Te&&(ne.aiInstructions[Te]=String(s(this).val()||"").trim())}),t.find("[data-twb-col]").length&&(ne.columns=[],t.find("[data-twb-col]").each(function(){let Te=s(this);ne.columns.push({key:oe(Te.find("[data-twb-col-key]").val(),""),title:oe(Te.find("[data-twb-col-title]").val(),""),type:oe(Te.find("[data-twb-col-type]").val(),"text"),required:Te.find("[data-twb-col-req]").is(":checked"),description:oe(Te.find("[data-twb-col-desc]").val(),"")})})),t.find("[data-twb-row]").length&&(ne.rows=[],t.find("[data-twb-row]").each(function(Te){let Pe=s(this),St={};(ne.columns||[]).forEach(me=>{St[me.key]=oe(Pe.find(`[data-twb-cell="${me.key}"]`).val(),"")}),ne.rows.push({id:oe(Pe.attr("data-twb-row-id"),F.rows?.[Te]?.id||""),name:oe(Pe.find("[data-twb-row-name]").val(),""),cells:St})})),n[a]=ne}let i=t.find('[data-twb-field="promptTemplate"]');i.length&&(o.promptTemplate=String(i.val()||""));let l=t.find('[data-twb-field="apiPreset"]');l.length&&(o.apiPreset=String(l.val()||""));let c=t.find('[data-twb-field="fillMode"]');c.length&&(o.fillMode=String(c.val()||""));let d=t.find('[data-twb-field="mirrorToMessage"]');d.length&&(o.mirrorToMessage=d.is(":checked"));let y=t.find('[data-twb-field="autoUpdateEnabled"]');y.length&&(o.autoUpdateEnabled=y.is(":checked"));let p=t.find('[data-twb-field="autoUpdateTrigger"]');p.length&&(o.autoUpdateTrigger=String(p.val()||"assistantMessage"));let u=t.find('[data-twb-field="runScope"]:checked');u.length&&(o.runScope=String(u.val()||"enabled"));let f=[];t.find("[data-twb-run-table]:checked").each(function(){let F=oe(s(this).attr("data-twb-run-table"),"");F&&f.push(F)}),o.scope={mode:o.runScope,selectedTableIds:f,activeTableId:n[a]?fn(n[a],a):""};let h=t.find('[data-twb-field="promptPreset"]');h.length&&(o.promptPreset=String(h.val()||""));let v=t.find('[data-twb-field="bypassEnabled"]'),w=String(o.promptPreset||"");o.bypass={...o.bypass||{},enabled:v.length?v.is(":checked"):o.bypass?.enabled===!0,presetId:w};let S=t.find('[data-twb-field="activeTemplate"]');S.length&&(o.activeTemplate=String(S.val()||""));let _=t.find('[data-twb-field="contextDepth"]');_.length&&(o.contextDepth=Math.max(1,parseInt(_.val(),10)||8));let W=t.find('[data-twb-field="contextRoles"]:checked');W.length&&(o.contextRoles=String(W.val()||"all"));let C=t.find('[data-twb-field="contextExtractTags"]');C.length&&(o.contextExtractTags=String(C.val()||"").split(`
`).map(F=>F.trim()).filter(Boolean));let T=t.find('[data-twb-field="contextUseGlobalRules"]');T.length&&(o.contextUseGlobalRules=T.is(":checked"));let M=t.find('[data-twb-field="sendLatestRows"]');M.length&&(o.sendLatestRows=parseInt(M.val(),10),Number.isFinite(o.sendLatestRows)||(o.sendLatestRows=-1));let j=t.find('[data-twb-field="worldbooksEnabled"]'),z=[];t.find("[data-twb-wb-item]:checked").each(function(){let F=String(s(this).attr("data-twb-wb-name")||"").trim();F&&z.push(F)}),o.worldbooks={enabled:j.length?j.is(":checked"):o.worldbooks?.enabled===!0,selected:z.length>0?z:Array.isArray(o.worldbooks?.selected)?o.worldbooks.selected:[]};let $=t.find('[data-twb-field="worldbookSyncEnabled"]'),q=t.find('[data-twb-field="worldbookSyncTarget"]'),ee=t.find('[data-twb-field="worldbookSyncComment"]');return o.worldbookSync={enabled:$.length?$.is(":checked"):o.worldbookSync?.enabled===!0,targetBook:q.length?String(q.val()||""):o.worldbookSync?.targetBook||"",entryComment:ee.length?String(ee.val()||"").trim()||"YYT-\u586B\u8868\u6570\u636E":o.worldbookSync?.entryComment||"YYT-\u586B\u8868\u6570\u636E"},o.tables=n,o}function ay(t){let e=oe(t,"idle");return`<span class="yyt-tool-runtime-badge yyt-status-${m(e)}">${m(gn(e))}</span>`}function im(t){return`
    <header class="yyt-tool-panel-hero">
      <div class="yyt-tool-panel-hero-copy">
        <div class="yyt-tool-panel-hero-title"><i class="fa-solid fa-table-cells"></i> \u586B\u8868\u5DE5\u4F5C\u53F0</div>
        <div class="yyt-tool-panel-hero-desc">\u7ED3\u6784\u5316\u72B6\u6001\u4E0E\u5173\u7CFB\u6570\u636E\u5DE5\u4F5C\u53F0\uFF0C\u6309\u5F53\u524D assistant \u6D88\u606F\u6267\u884C AI \u586B\u8868\u3002</div>
      </div>
      <div class="yyt-tool-panel-hero-tags">
        ${ay(t?.runtime?.lastStatus)}
        <button class="yyt-btn yyt-btn-secondary yyt-tool-save-top" data-twb-action="save"><i class="fa-solid fa-save"></i> \u4FDD\u5B58</button>
        <button class="yyt-btn yyt-btn-primary" data-twb-action="run"><i class="fa-solid fa-play"></i> \u7ACB\u5373\u586B\u8868</button>
      </div>
    </header>`}function lm(t){let e=t?.runtime||{};return`
    <article class="yyt-panel-section yyt-twb-card yyt-twb-runtime-card">
      <div class="yyt-twb-card-header">
        <div><h3>\u8FD0\u884C\u6982\u89C8</h3><p>\u6700\u8FD1\u4E00\u6B21\u586B\u8868\u6267\u884C\u7ED3\u679C\u3002</p></div>
        ${ay(e.lastStatus)}
      </div>
      <div class="yyt-twb-metrics">
        <div><span>\u6700\u8FD1\u8FD0\u884C</span><strong>${m(oy(e.lastRunAt))}</strong></div>
        <div><span>\u8017\u65F6</span><strong>${m(nm(e.lastDurationMs))}</strong></div>
        <div><span>\u6210\u529F</span><strong>${Number(e.successCount)||0}</strong></div>
        <div><span>\u5931\u8D25</span><strong>${Number(e.errorCount)||0}</strong></div>
      </div>
      <div class="yyt-twb-runtime-message">\u6700\u8FD1\u9519\u8BEF\uFF1A${m(oe(e.lastError,"\u65E0"))}</div>
    </article>`}function cm(t){let e=t?.runtime||{};return`
    <article class="yyt-panel-section yyt-twb-card">
      <div class="yyt-twb-card-header">
        <div><h3>\u81EA\u52A8\u66F4\u65B0</h3><p>\u63A7\u5236\u9ED8\u8BA4\u8FD0\u884C\u65B9\u5F0F\u4E0E\u5199\u56DE\u7B56\u7565\u3002</p></div>
        <label class="yyt-twb-check-row"><input type="checkbox" data-twb-field="autoUpdateEnabled" ${t.autoUpdateEnabled?"checked":""}><span>\u542F\u7528</span></label>
      </div>
      <label class="yyt-twb-field">
        <span>\u89E6\u53D1\u65F6\u673A</span>
        <select class="yyt-select" data-twb-field="autoUpdateTrigger">
          <option value="assistantMessage" ${t.autoUpdateTrigger!=="manual"&&t.autoUpdateTrigger!=="custom"?"selected":""}>assistant \u6D88\u606F\u540E</option>
          <option value="manual" ${t.autoUpdateTrigger==="manual"?"selected":""}>\u4EC5\u624B\u52A8</option>
          <option value="custom" ${t.autoUpdateTrigger==="custom"?"selected":""}>\u81EA\u5B9A\u4E49</option>
        </select>
      </label>
      <label class="yyt-twb-field">
        <span>\u9ED8\u8BA4\u66F4\u65B0\u6A21\u5F0F</span>
        <select class="yyt-select" data-twb-field="fillMode">
          <option value="${cs.INCREMENTAL}" ${t.fillMode!==cs.FULL?"selected":""}>\u589E\u91CF\u66F4\u65B0</option>
          <option value="${cs.FULL}" ${t.fillMode===cs.FULL?"selected":""}>\u5168\u91CF\u91CD\u5199</option>
        </select>
      </label>
      <label class="yyt-twb-check-row"><input type="checkbox" data-twb-field="mirrorToMessage" ${t.mirrorToMessage?"checked":""}><span>\u955C\u50CF\u5199\u56DE\u6B63\u6587</span></label>
      <div class="yyt-twb-runtime-message">\u81EA\u52A8\u6700\u8FD1\u72B6\u6001\uFF1A${m(gn(e.lastAutoStatus))} \xB7 \u6700\u8FD1\u89E6\u53D1\uFF1A${m(oy(e.lastAutoRunAt))} \xB7 \u76EE\u6807\u6D88\u606F\uFF1A${m(oe(e.lastAutoMessageId,"\u2014"))}${e.lastAutoSkipReason?` \xB7 \u539F\u56E0\uFF1A${m(e.lastAutoSkipReason)}`:""}</div>
    </article>`}function dm(t){let e=Dt(),s=Pr()||[],r=t?.bypass?.enabled===!0,o=oe(t?.bypass?.presetId||t?.promptPreset,"");return`
    <article class="yyt-panel-section yyt-twb-card">
      <div class="yyt-twb-card-header">
        <div><h3>AI \u7ED1\u5B9A</h3><p>\u9009\u62E9\u586B\u8868\u4F7F\u7528\u7684 API \u4E0E Ai \u6307\u4EE4\u9884\u8BBE\u3002</p></div>
        <span class="yyt-twb-muted">API \u4E0E Ai \u6307\u4EE4</span>
      </div>
      <label class="yyt-twb-field">
        <span>API \u9884\u8BBE</span>
        <select class="yyt-select" data-twb-field="apiPreset">
          <option value="" ${t.apiPreset?"":"selected"}>\u4F7F\u7528\u5F53\u524D API \u914D\u7F6E</option>
          ${e.map(n=>`<option value="${m(n?.name||"")}" ${t.apiPreset===n?.name?"selected":""}>${m(n?.name||"")}</option>`).join("")}
        </select>
      </label>
      <label class="yyt-twb-check-row">
        <input type="checkbox" data-twb-field="bypassEnabled" ${r?"checked":""}>
        <span>\u542F\u7528 Ai \u6307\u4EE4\u9884\u8BBE</span>
      </label>
      <label class="yyt-twb-field yyt-twb-bypass-preset ${r?"":"yyt-hidden"}">
        <span>\u7ED1\u5B9A Ai \u6307\u4EE4\u9884\u8BBE</span>
        <select class="yyt-select" data-twb-field="promptPreset">
          <option value="" ${o?"":"selected"}>\u9009\u62E9\u9884\u8BBE</option>
          ${s.map(n=>`<option value="${m(n?.id||"")}" ${o===n?.id?"selected":""}>${m(n?.name||n?.id||"")}</option>`).join("")}
        </select>
        <small>\u542F\u7528\u540E\u4F1A\u4F5C\u4E3A\u586B\u8868\u8BF7\u6C42\u7684\u524D\u7F6E\u6D88\u606F\u53D1\u9001\uFF0C\u590D\u7528\u7834\u9650\u6A21\u5757\u4E2D\u7684 Ai \u6307\u4EE4\u9884\u8BBE\u3002</small>
      </label>
    </article>`}function ym(t){let e=Hr(),s=as;return`
    <article class="yyt-panel-section yyt-twb-card yyt-twb-template-card">
      <div class="yyt-twb-card-header">
        <div><h3>\u6A21\u677F\u7BA1\u7406</h3><p>\u590D\u7528\u8868\u683C\u7ED3\u6784\u4E0E AI \u64CD\u4F5C\u8BF4\u660E\u3002</p></div>
        <span class="yyt-twb-muted">\u7ED3\u6784\u6A21\u677F / \u5F53\u524D\u804A\u5929 guide</span>
      </div>
      <div class="yyt-twb-runtime-message">\u5F53\u524D guide\uFF1A\u6A21\u677F ${m(oe(t?.guide?.templateId||t.activeTemplate,"\u2014"))} \xB7 scope ${m(oe(t?.guide?.scope?.mode||t.runScope,"enabled"))} \xB7 \u7126\u70B9\u8868 ${m(oe(t?.guide?.focusedTableId||t.scope?.activeTableId,"\u2014"))}</div>
      <label class="yyt-twb-field">
        <span>\u5F53\u524D\u6A21\u677F</span>
        <select class="yyt-select" data-twb-field="activeTemplate">
          <option value="" ${t.activeTemplate?"":"selected"}>\u4E0D\u5207\u6362\u6A21\u677F</option>
          ${e.map(r=>`<option value="${m(r.id)}" ${t.activeTemplate===r.id?"selected":""}>${m(r.name)}${r.id===s?" (\u5185\u7F6E)":""}</option>`).join("")}
        </select>
      </label>
      <div class="yyt-twb-template-list" data-twb-template-list>
        ${e.filter(r=>r.id!==s).map(r=>`
          <div class="yyt-twb-template-item" data-twb-template-id="${m(r.id)}">
            <span class="yyt-twb-template-item-name">${m(r.name)}</span>
            <span class="yyt-twb-template-item-meta">${r.tables?.length||0} \u8868</span>
            <button class="yyt-btn yyt-btn-icon yyt-btn-danger yyt-btn-small" data-twb-action="delete-template" data-twb-template-id="${m(r.id)}" title="\u5220\u9664"><i class="fa-solid fa-trash"></i></button>
          </div>`).join("")||'<div class="yyt-twb-muted" style="padding:6px 0;font-size:12px">\u6682\u65E0\u7528\u6237\u6A21\u677F\u3002\u4FDD\u5B58\u5F53\u524D\u8868\u7ED3\u6784\u4E3A\u6A21\u677F\u540E\u4F1A\u5728\u6B64\u663E\u793A\u3002</div>'}
      </div>
      <div class="yyt-twb-action-grid">
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="apply-template">\u5E94\u7528\u6A21\u677F</button>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="save-template">\u4FDD\u5B58\u4E3A\u6A21\u677F</button>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="import-template">\u5BFC\u5165\u6A21\u677F</button>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="export-template">\u5BFC\u51FA\u5F53\u524D</button>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="export-all-templates">\u5BFC\u51FA\u5168\u90E8</button>
      </div>
      <input type="file" data-twb-import-file accept=".json" style="display:none">
    </article>`}function um(t){let e=Array.isArray(t.tables)?t.tables:[],s=oe(t.scope?.mode||t.runScope,"enabled"),r=new Set(Array.isArray(t.scope?.selectedTableIds)?t.scope.selectedTableIds:[]);return`
    <article class="yyt-panel-section yyt-twb-card yyt-twb-manual-card">
      <div class="yyt-twb-card-header">
        <div><h3>\u624B\u52A8\u66F4\u65B0</h3><p>\u9009\u62E9\u672C\u6B21\u60F3\u8BA9 AI \u5173\u6CE8\u7684\u8868\u3002</p></div>
        <span class="yyt-twb-muted">${e.length} \u5F20\u8868</span>
      </div>
      <div class="yyt-twb-radio-group">
        <label><input type="radio" name="twbRunScope" value="enabled" data-twb-field="runScope" ${s==="enabled"?"checked":""}>\u6240\u6709\u542F\u7528\u8868\u683C</label>
        <label><input type="radio" name="twbRunScope" value="selected" data-twb-field="runScope" ${s==="selected"?"checked":""}>\u4EC5\u9009\u4E2D\u8868\u683C</label>
        <label><input type="radio" name="twbRunScope" value="current" data-twb-field="runScope" ${s==="current"?"checked":""}>\u5F53\u524D\u6253\u5F00\u8868\u683C</label>
      </div>
      <div class="yyt-twb-table-chip-list">
        ${e.length?e.map((o,n)=>`<label class="yyt-twb-table-chip"><input type="checkbox" data-twb-run-table="${m(fn(o,n))}" ${r.has(fn(o,n))?"checked":""}><span>${m(oe(o?.name,`\u8868\u683C ${n+1}`))}</span></label>`).join(""):'<span class="yyt-twb-muted">\u8FD8\u6CA1\u6709\u53EF\u66F4\u65B0\u7684\u8868\u683C\u3002</span>'}
      </div>
      <div class="yyt-twb-card-actions">
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="run-selected">\u4EC5\u66F4\u65B0\u9009\u4E2D\u8868\u683C</button>
        <button class="yyt-btn yyt-btn-primary yyt-btn-small" data-twb-action="run">\u7ACB\u5373\u586B\u8868</button>
      </div>
    </article>`}function pm(t){let e=Array.isArray(t.tables)?t.tables:[],s=pt(e,t.__activeTableIndex??0),r=Ft({tables:e});return`
    <section class="yyt-twb-table-overview">
      <div class="yyt-twb-section-header">
        <div><h3>\u8868\u683C</h3><p>\u7BA1\u7406\u9700\u8981 AI \u7EF4\u62A4\u7684\u7ED3\u6784\u5316\u8868\u683C\u3002</p></div>
        <button class="yyt-btn yyt-btn-secondary" data-twb-action="add-table"><i class="fa-solid fa-plus"></i> \u65B0\u5EFA\u8868\u683C</button>
      </div>
      ${e.length?`
        <div class="yyt-twb-table-card-list">
          ${e.map((o,n)=>{let a=ny(o),i=(r.issues||[]).filter(y=>y.tableIndex===n),l=i.length?`${i.length} \u4E2A\u95EE\u9898`:"\u65E0\u6821\u9A8C\u95EE\u9898",c=n===s,d=o.__liveSourceKind==="live"?'<span class="yyt-twb-live-badge yyt-twb-live-badge--live">\u5B9E\u65F6</span>':'<span class="yyt-twb-live-badge yyt-twb-live-badge--template">\u6A21\u677F</span>';return`
              <article class="yyt-twb-table-card ${c?"is-active":""}" data-twb-select="${n}">
                <div class="yyt-twb-table-card-main">
                  <div class="yyt-twb-table-copy">
                    <h4>${m(oe(o?.name,`\u8868\u683C ${n+1}`))}</h4>
                    <p>${m(oe(o?.note,"\u8FD8\u6CA1\u6709\u8868\u683C\u8BF4\u660E\u3002"))}</p>
                    <div class="yyt-twb-table-card-meta ${i.length?"is-warning":""}">${a.columns} \u5B57\u6BB5 / ${a.rows} \u884C \xB7 ${d} \xB7 ${m(gn(t?.runtime?.lastStatus))} \xB7 ${m(l)}</div>
                  </div>
                </div>
                <div class="yyt-twb-table-card-actions">
                  <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="open-table-editor" data-twb-ti="${n}">\u914D\u7F6E\u8868\u683C</button>
                  <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="run-table" data-twb-ti="${n}">\u66F4\u65B0\u6B64\u8868</button>
                  ${e.length>1?`<button class="yyt-btn yyt-btn-danger yyt-btn-small" data-twb-action="delete-table" data-twb-ti="${n}" title="\u5220\u9664\u8868\u683C">\u5220\u9664</button>`:""}
                </div>
              </article>`}).join("")}
        </div>`:`
        <div class="yyt-twb-empty">
          <h4>\u8FD8\u6CA1\u6709\u8868\u683C</h4>
          <p>\u5148\u65B0\u5EFA\u4E00\u5F20\u8868\uFF0C\u518D\u5B9A\u4E49\u5B57\u6BB5\u548C\u6570\u636E\u884C\u3002</p>
          <button class="yyt-btn yyt-btn-primary" data-twb-action="add-table">\u65B0\u5EFA\u7B2C\u4E00\u5F20\u8868</button>
        </div>`}
    </section>`}function fm(t){let e=Number.isFinite(t.contextDepth)?t.contextDepth:8,s=t.contextRoles==="assistant_only"?"assistant_only":"all",r=Array.isArray(t.contextExtractTags)?t.contextExtractTags.join(`
`):"",o=t.contextUseGlobalRules===!0,n=Number.isFinite(t.sendLatestRows)?t.sendLatestRows:-1,a=t.worldbooks?.enabled===!0;return`
    <article class="yyt-panel-section yyt-twb-card">
      <div class="yyt-twb-card-header">
        <div><h3>\u4E0A\u4E0B\u6587\u914D\u7F6E</h3><p>\u63A7\u5236\u53D1\u7ED9\u586B\u8868 AI \u7684\u6D88\u606F\u6DF1\u5EA6\u3001\u89D2\u8272\u8FC7\u6EE4\u4E0E\u4E16\u754C\u4E66\u6CE8\u5165\u3002</p></div>
      </div>
      <label class="yyt-twb-field">
        <span>\u6D88\u606F\u6DF1\u5EA6</span>
        <input class="yyt-input" type="number" min="1" max="100" data-twb-field="contextDepth" value="${m(String(e))}">
        <small>\u5411 AI \u53D1\u9001\u6700\u8FD1 N \u6761\u6D88\u606F\u4F5C\u4E3A\u4E0A\u4E0B\u6587\u3002\u9ED8\u8BA4 8\u3002</small>
      </label>
      <label class="yyt-twb-field">
        <span>\u6D88\u606F\u89D2\u8272</span>
        <div class="yyt-twb-radio-group">
          <label><input type="radio" name="twbContextRoles" value="all" data-twb-field="contextRoles" ${s==="all"?"checked":""}>\u5168\u90E8\u6D88\u606F\uFF08user + assistant\uFF09</label>
          <label><input type="radio" name="twbContextRoles" value="assistant_only" data-twb-field="contextRoles" ${s==="assistant_only"?"checked":""}>\u4EC5 AI \u6D88\u606F</label>
        </div>
      </label>
      <div class="yyt-twb-field">
        <span>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</span>
        <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small" data-twb-field="contextExtractTags" rows="4" placeholder="\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u63D0\u53D6\uFF1B\u4EE5 regex: \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u63D0\u53D6\u3002">${m(r)}</textarea>
        <small>\u81EA\u5B9A\u4E49\u63D0\u53D6\u89C4\u5219\uFF0C\u5BF9\u6D88\u606F\u4E0A\u4E0B\u6587\u8FDB\u884C include / regex \u63D0\u53D6\u3002</small>
      </div>
      <div class="yyt-twb-field">
        <label class="yyt-twb-check-row"><input type="checkbox" data-twb-field="contextUseGlobalRules" ${o?"checked":""}><span>\u540C\u65F6\u5E94\u7528\u5168\u5C40\u6B63\u5219\u89C4\u5219\uFF08\u63D0\u53D6 + \u6392\u9664 + \u9ED1\u540D\u5355\uFF09</span></label>
        <small>\u542F\u7528\u540E\uFF0C\u5C06\u5408\u5E76"\u6B63\u5219\u63D0\u53D6"\u9762\u677F\u4E2D\u7684\u5168\u5C40\u89C4\u5219\u4E00\u8D77\u5E94\u7528\u3002</small>
      </div>
      <label class="yyt-twb-field">
        <span>\u53D1\u9001\u6700\u65B0\u884C\u6570</span>
        <input class="yyt-input" type="number" min="-1" data-twb-field="sendLatestRows" value="${m(String(n))}">
        <small>\u6BCF\u5F20\u8868\u6700\u591A\u53D1\u9001\u6700\u540E N \u884C\u7ED9 AI\u3002-1 \u8868\u793A\u5168\u90E8\u53D1\u9001\u3002</small>
      </label>
      <div class="yyt-twb-field">
        <span>\u4E16\u754C\u4E66\u6CE8\u5165</span>
        <label class="yyt-twb-check-row"><input type="checkbox" data-twb-field="worldbooksEnabled" ${a?"checked":""}><span>\u542F\u7528\u4E16\u754C\u4E66\u6CE8\u5165</span></label>
        <div class="yyt-twb-worldbook-selector ${a?"":"yyt-hidden"}" data-twb-wb-selector>
          <div class="yyt-twb-worldbook-list" data-twb-wb-list></div>
        </div>
      </div>
      <div class="yyt-twb-field">
        <span>\u4E16\u754C\u4E66\u540C\u6B65\uFF08\u586B\u8868 \u2192 \u4E16\u754C\u4E66\uFF09</span>
        <label class="yyt-twb-check-row"><input type="checkbox" data-twb-field="worldbookSyncEnabled" ${t.worldbookSync?.enabled?"checked":""}><span>\u586B\u8868\u540E\u81EA\u52A8\u540C\u6B65\u6570\u636E\u5230\u4E16\u754C\u4E66\u6761\u76EE</span></label>
        <div class="yyt-twb-worldbook-sync-opts ${t.worldbookSync?.enabled?"":"yyt-hidden"}" data-twb-wbsync-opts>
          <label class="yyt-twb-field" style="margin-top:8px">
            <span>\u76EE\u6807\u4E16\u754C\u4E66</span>
            <select class="yyt-select" data-twb-field="worldbookSyncTarget">
              <option value="">\u8BF7\u9009\u62E9\u2026</option>
            </select>
            <small>\u586B\u8868\u6570\u636E\u5C06\u5199\u5165\u6B64\u4E16\u754C\u4E66\u7684\u4E00\u4E2A\u5E38\u9A7B\u6761\u76EE\u4E2D\u3002</small>
          </label>
          <label class="yyt-twb-field">
            <span>\u6761\u76EE\u6807\u8BC6</span>
            <input class="yyt-input" type="text" data-twb-field="worldbookSyncComment" value="${m(t.worldbookSync?.entryComment||"YYT-\u586B\u8868\u6570\u636E")}">
            <small>\u4E16\u754C\u4E66\u6761\u76EE\u7684 comment \u5B57\u6BB5\uFF0C\u7528\u4E8E\u5B9A\u4F4D\u66F4\u65B0\u3002</small>
          </label>
        </div>
      </div>
    </article>`}function gm(t){return`
    <main class="yyt-twb-dashboard">
      <section class="yyt-twb-dashboard-grid">
        ${lm(t)}
        ${cm(t)}
        ${dm(t)}
        ${fm(t)}
        ${ym(t)}
        ${um(t)}
      </section>
      ${pm(t)}
    </main>`}function mm(t){return`
    <section class="yyt-panel-section yyt-twb-editor-section">
      <div class="yyt-twb-section-header"><div><h4>\u8868\u683C\u57FA\u7840\u4FE1\u606F</h4><p>\u544A\u8BC9 AI \u8FD9\u5F20\u8868\u4EE3\u8868\u4EC0\u4E48\uFF0C\u4EE5\u53CA\u5B83\u5E94\u8BE5\u8FFD\u8E2A\u54EA\u7C7B\u4FE1\u606F\u3002</p></div></div>
      <label class="yyt-twb-field"><span>\u8868\u540D</span><input class="yyt-input" data-twb-name value="${m(t?.name||"")}" placeholder="\u8868\u540D"></label>
      <label class="yyt-twb-field"><span>\u8868\u683C\u8BF4\u660E</span><textarea class="yyt-textarea" rows="3" data-twb-note placeholder="\u4F8B\u5982\uFF1A\u8BB0\u5F55\u89D2\u8272\u57FA\u7840\u4FE1\u606F\u3001\u72B6\u6001\u548C\u5173\u7CFB\u53D8\u5316\u3002">${m(t?.note||"")}</textarea></label>
    </section>`}function bm(t){return`
    <section class="yyt-panel-section yyt-twb-editor-section yyt-twb-ai-instructions">
      <div class="yyt-twb-section-header"><div><h4>AI \u7406\u89E3\u4E0E\u64CD\u4F5C\u8BF4\u660E</h4><p>\u8BA9 AI \u81EA\u884C\u5224\u65AD\u662F\u5426\u9700\u8981\u521D\u59CB\u5316\u3001\u65B0\u589E\u3001\u66F4\u65B0\u6216\u5220\u9664\u8FD9\u5F20\u8868\u7684\u6570\u636E\u3002</p></div></div>
      <div class="yyt-twb-ai-grid">
        ${[["init","\u521D\u59CB\u5316\u8BF4\u660E","\u5F53\u8868\u683C\u4E3A\u7A7A\u65F6\uFF0CAI \u5E94\u8BE5\u5982\u4F55\u521B\u5EFA\u521D\u59CB\u6570\u636E\u3002"],["create","\u65B0\u589E\u8BF4\u660E","\u4EC0\u4E48\u65F6\u5019\u5E94\u8BE5\u65B0\u589E\u4E00\u884C\u3002"],["update","\u66F4\u65B0\u8BF4\u660E","\u4EC0\u4E48\u65F6\u5019\u5E94\u8BE5\u66F4\u65B0\u5DF2\u6709\u884C\u3002"],["delete","\u5220\u9664\u8BF4\u660E","\u4EC0\u4E48\u65F6\u5019\u5E94\u8BE5\u5220\u9664\u6216\u6807\u8BB0\u5220\u9664\u4E00\u884C\u3002"]].map(([s,r,o])=>`
          <label class="yyt-twb-field">
            <span>${r}</span>
            <small>${o}</small>
            <textarea class="yyt-textarea" rows="3" data-twb-table-instruction="${s}">${m(Zr(t,s))}</textarea>
          </label>`).join("")}
      </div>
    </section>`}function hm(t){let e=Array.isArray(t?.columns)?t.columns:[];return`
    <section class="yyt-panel-section yyt-twb-editor-section">
      <div class="yyt-twb-section-header">
        <div><h4>\u5B57\u6BB5\u7ED3\u6784</h4><p>\u544A\u8BC9 AI \u6BCF\u4E00\u884C\u9700\u8981\u586B\u5199\u54EA\u4E9B\u4FE1\u606F\u3002\u9ED8\u8BA4\u53EA\u5C55\u793A\u7528\u6237\u53EF\u7406\u89E3\u7684\u5B57\u6BB5\u540D\u548C\u586B\u5199\u8BF4\u660E\u3002</p></div>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="add-col">\u6DFB\u52A0\u5B57\u6BB5</button>
      </div>
      ${e.length?`
        <div class="yyt-twb-field-card-list">
          ${e.map((s,r)=>`
            <article class="yyt-twb-field-card" data-twb-col>
              <div class="yyt-twb-field-card-main">
                <label class="yyt-twb-field"><span>\u5B57\u6BB5\u540D</span><input class="yyt-input" data-twb-col-title value="${m(s.title||"")}" placeholder="\u5B57\u6BB5\u540D"></label>
                <label class="yyt-twb-field"><span>AI \u586B\u5199\u8BF4\u660E</span><textarea class="yyt-textarea" rows="2" data-twb-col-desc placeholder="\u544A\u8BC9 AI \u8FD9\u4E2A\u5B57\u6BB5\u8BE5\u586B\u4EC0\u4E48\u3002">${m(s.description||"")}</textarea></label>
              </div>
              <button class="yyt-btn yyt-btn-icon" data-twb-action="delete-col" data-twb-ci="${m(s.key||"")}" title="\u5220\u9664\u5B57\u6BB5" aria-label="\u5220\u9664\u5B57\u6BB5"><i class="fa-solid fa-trash"></i></button>
              <details class="yyt-twb-field-advanced">
                <summary>\u9AD8\u7EA7\u8BBE\u7F6E</summary>
                <div class="yyt-twb-advanced-grid">
                  <label class="yyt-twb-field"><span>\u5185\u90E8\u6807\u8BC6 key</span><input class="yyt-input" data-twb-col-key value="${m(s.key||"")}" placeholder="col_key"></label>
                  <label class="yyt-twb-field"><span>\u5185\u5BB9\u683C\u5F0F</span><select class="yyt-select" data-twb-col-type>${an.map(o=>`<option value="${o.value}" ${s.type===o.value?"selected":""}>${o.label}</option>`).join("")}</select></label>
                  <label class="yyt-twb-check-row"><input type="checkbox" data-twb-col-req ${s.required?"checked":""}><span>AI \u5FC5\u987B\u5C1D\u8BD5\u586B\u5199</span></label>
                </div>
              </details>
            </article>`).join("")}
        </div>`:`
        <div class="yyt-twb-empty"><h4>\u8FD8\u6CA1\u6709\u5B57\u6BB5</h4><p>\u5B57\u6BB5\u51B3\u5B9A AI \u8F93\u51FA\u683C\u5F0F\uFF0C\u4E5F\u51B3\u5B9A\u6BCF\u884C\u53EF\u586B\u5199\u7684\u5185\u5BB9\u3002</p><button class="yyt-btn yyt-btn-secondary" data-twb-action="add-col">\u6DFB\u52A0\u5B57\u6BB5</button></div>`}
    </section>`}function vm(t,e){let s=t?.key||"",r=t?.title||s,o=e?.cells&&e.cells[s]!==void 0?e.cells[s]:"",n=t?.required?" *":"";return t?.type==="boolean"?`
      <label class="yyt-twb-field">
        <span>${m(r)}${n}</span>
        <select class="yyt-select" data-twb-cell="${m(s)}">
          <option value="" ${o===""?"selected":""}>\u2014</option>
          <option value="true" ${o==="true"?"selected":""}>\u662F</option>
          <option value="false" ${o==="false"?"selected":""}>\u5426</option>
        </select>
      </label>`:t?.type==="json"?`<label class="yyt-twb-field yyt-twb-span-2"><span>${m(r)}${n}</span><textarea class="yyt-textarea" rows="4" data-twb-cell="${m(s)}">${m(o)}</textarea></label>`:`<label class="yyt-twb-field ${t?.type==="text"&&String(o).length>80?"yyt-twb-span-2":""}"><span>${m(r)}${n}</span><input class="yyt-input" type="${t?.type==="number"?"number":"text"}" data-twb-cell="${m(s)}" value="${m(o)}" placeholder="${m(r)}"></label>`}function sy(t,e,s){let r=e?.name||`__row_${s}`,o=t?.[r];return o?.__rowStatus==="new"?"new":o&&Object.entries(o).some(([n,a])=>n!=="__rowStatus"&&(a==="updated"||a==="new"))?"updated":""}function xm(t){return t==="new"?"\u65B0\u589E":t==="updated"?"\u5DF2\u66F4\u65B0":"\u624B\u52A8"}function wm(t,e){let s=Array.isArray(t?.columns)?t.columns:[],r=Array.isArray(t?.rows)?t.rows:[];return`
    <section class="yyt-panel-section yyt-twb-editor-section yyt-twb-rows-workspace">
      <div class="yyt-twb-section-header">
        <div><h4>\u6570\u636E\u884C</h4><p>\u5171 ${r.length} \u884C \xB7 \u6700\u8FD1 AI \u66F4\u65B0 ${r.filter((o,n)=>sy(e,o,n)).length} \u884C</p></div>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="add-row">\u6DFB\u52A0\u884C</button>
      </div>
      <div class="yyt-twb-row-toolbar">
        <input class="yyt-input" placeholder="\u641C\u7D22\u884C\u540D\u6216\u5185\u5BB9" data-twb-row-search>
        <div class="yyt-twb-segmented" data-twb-field="rowFilter">
          <button class="active" data-twb-row-filter="all">\u5168\u90E8</button>
          <button data-twb-row-filter="new">\u65B0\u589E</button>
          <button data-twb-row-filter="updated">\u5DF2\u66F4\u65B0</button>
        </div>
      </div>
      ${r.length?`
        <div class="yyt-twb-row-list">
          ${r.map((o,n)=>{let a=sy(e,o,n);return`
              <article class="yyt-twb-row-card${a?` row-${a}`:""}" data-twb-row data-twb-ri="${n}" data-twb-row-id="${m(o?.id||"")}">
                <header class="yyt-twb-row-card-header">
                  <div><span class="yyt-twb-row-index">\u7B2C ${n+1} \u884C</span><input class="yyt-input yyt-twb-row-name" data-twb-row-name value="${m(o?.name||"")}" placeholder="\u884C\u540D\uFF08\u53EF\u9009\uFF09"></div>
                  <div class="yyt-twb-row-actions">
                    <span class="yyt-tool-runtime-badge yyt-status-${a==="new"?"success":a==="updated"?"running":"idle"}">${xm(a)}</span>
                    <button class="yyt-btn yyt-btn-icon" data-twb-action="delete-row" data-twb-ri="${n}" title="\u5220\u9664\u6B64\u884C" aria-label="\u5220\u9664\u6B64\u884C"><i class="fa-solid fa-trash"></i></button>
                  </div>
                </header>
                <div class="yyt-twb-row-fields">${s.map(i=>vm(i,o)).join("")}</div>
              </article>`}).join("")}
        </div>`:`
        <div class="yyt-twb-empty"><h4>\u6682\u65E0\u6570\u636E\u884C</h4><p>\u53EF\u4EE5\u624B\u52A8\u6DFB\u52A0\u4E00\u884C\uFF0C\u6216\u70B9\u51FB"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u751F\u6210\u3002</p><button class="yyt-btn yyt-btn-secondary" data-twb-action="add-row">\u6DFB\u52A0\u884C</button></div>`}
    </section>`}function Sm(t,e,s){let o=(Ft({tables:Array.isArray(s.tables)?s.tables:[]}).issues||[]).filter(n=>n.tableIndex===e);return`
    <section class="yyt-twb-editor-section yyt-twb-diagnostics">
      <details>
        <summary>\u5355\u8868\u8BCA\u65AD <span class="yyt-twb-muted">${o.length} \u4E2A\u6821\u9A8C\u95EE\u9898 \xB7 JSON \u9884\u89C8</span></summary>
        <div class="yyt-twb-diagnostic-grid">
          <div>
            <h5>\u6821\u9A8C\u95EE\u9898</h5>
            ${o.length?`<div class="yyt-twb-pre">${m(o.map(n=>n.message).join(`
`))}</div>`:'<div class="yyt-twb-muted">\u6682\u65E0\u6821\u9A8C\u95EE\u9898\u3002</div>'}
          </div>
          <div>
            <h5>JSON \u9884\u89C8</h5>
            <pre class="yyt-twb-pre">${m(Ha(t||{}))}</pre>
          </div>
        </div>
      </details>
    </section>`}function Tm(t){let e={tables:Array.isArray(t.tables)?t.tables:[]},r=Ft(e)?.summary?.errorCount||0;return`
    <section class="yyt-twb-editor-section yyt-twb-diagnostics">
      <details>
        <summary>${r>0?`\u9700\u8981\u5904\u7406\uFF1A${r} \u4E2A\u6821\u9A8C\u95EE\u9898`:"\u5168\u5C40\u9AD8\u7EA7\u8BBE\u7F6E\u4E0E\u8FD0\u884C\u8BCA\u65AD"}</summary>
        <div class="yyt-twb-diagnostic-body">
          ${dd(rm(),t)}
          <div><h5>\u53D8\u91CF\u5E2E\u52A9</h5><pre class="yyt-twb-pre">${m(Ge.getVariableHelp())}</pre></div>
        </div>
      </details>
    </section>`}function _m(t,e,s,r){let n=(Array.isArray(t.tables)?t.tables:[])[e]||null;return!s||!n?'<aside class="yyt-twb-editor-drawer"></aside>':`
    <aside class="yyt-twb-editor-drawer is-open">
      <div class="yyt-twb-editor">
        <header class="yyt-twb-editor-header">
          <div>
            <h3>\u914D\u7F6E\u8868\u683C\uFF1A${m(oe(n.name,`\u8868\u683C ${e+1}`))}</h3>
            <p>${m(am(n))} \xB7 ${m(gn(t?.runtime?.lastStatus))}</p>
          </div>
          <button class="yyt-btn yyt-btn-icon" data-twb-action="close-table-editor" title="\u5173\u95ED" aria-label="\u5173\u95ED"><i class="fa-solid fa-xmark"></i></button>
        </header>
        <div class="yyt-twb-editor-body">
          ${mm(n)}
          ${bm(n)}
          ${hm(n)}
          ${wm(n,r)}
          ${Sm(n,e,t)}
          ${Tm(t)}
        </div>
        <footer class="yyt-twb-editor-footer">
          <button class="yyt-btn yyt-btn-secondary" data-twb-action="close-table-editor">\u5173\u95ED</button>
          <button class="yyt-btn yyt-btn-primary" data-twb-action="save">\u4FDD\u5B58\u8868\u683C</button>
        </footer>
      </div>
    </aside>`}function ry(t,e){let s=Ue(t,e.lastLiveConfig);if(Je(s),e.editorOpen=!1,e.lastLiveConfig){let r=$e(),o=qa(r.tables,e.lastLiveConfig.tables,e.lastLiveConfig.__liveSourceKind||"exact");e.lastLiveConfig={...r,tables:o,__liveSourceKind:e.lastLiveConfig.__liveSourceKind||"exact"},e.renderTo(t,{config:e.lastLiveConfig})}else e.renderTo(t,{config:s})}var Qr,sm,iy,Am,cy=U(()=>{Ce();$s();yd();pd();ce();Dr();vr();Xs();is();Aa();Ka();dn();un();st();Qr=N.createScope("TableWorkbench"),sm=`${tr} ${ud()}

[data-twb-wb-selector] { margin-top:8px; padding:10px; border:1px solid var(--yyt-border); border-radius:6px; background:var(--yyt-surface-2); }
[data-twb-wb-list] { max-height:180px; overflow-y:auto; display:flex; flex-direction:column; gap:2px; }

.yyt-twb-template-list { margin:8px 0; max-height:160px; overflow-y:auto; display:flex; flex-direction:column; gap:4px; }
.yyt-twb-template-item { display:flex; align-items:center; gap:8px; padding:5px 8px; border-radius:6px; background:var(--yyt-surface-2); border:1px solid var(--yyt-border); }
.yyt-twb-template-item-name { flex:1; font-size:13px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.yyt-twb-template-item-meta { font-size:11px; color:var(--yyt-text-muted); white-space:nowrap; }

.yyt-twb {
  position:relative;
  display:flex;
  flex-direction:column;
  gap:16px;
  min-height:620px;
  overflow:hidden;
}

.yyt-twb textarea { resize:vertical; }
.yyt-twb-dashboard { display:flex; flex-direction:column; gap:16px; min-height:0; overflow:auto; padding:0 2px 8px; }
.yyt-twb-dashboard-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; align-items:start; }
.yyt-twb-card,
.yyt-twb-editor-section { min-width:0; }
.yyt-twb-runtime-card,
.yyt-twb-manual-card { grid-column:auto; }
.yyt-twb-card-header,
.yyt-twb-section-header { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:12px; }
.yyt-twb-card-header h3,
.yyt-twb-section-header h3,
.yyt-twb-section-header h4 { margin:0; color:var(--yyt-text); font-size:14px; letter-spacing:0.01em; }
.yyt-twb-section-header p,
.yyt-twb-card-header p { margin:4px 0 0; color:var(--yyt-text-secondary); font-size:12px; line-height:1.5; }
.yyt-twb-metrics { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:8px; }
.yyt-twb-metrics > div { padding:10px 11px; border:1px solid var(--yyt-border); border-radius:6px; background:var(--yyt-surface-2); }
.yyt-twb-metrics span { display:block; color:var(--yyt-text-muted); font-size:11px; margin-bottom:5px; }
.yyt-twb-metrics strong { color:var(--yyt-text); font-size:15px; font-weight:700; }
.yyt-twb-runtime-message { margin-top:10px; padding:9px 10px; border:1px solid var(--yyt-border); border-radius:6px; background:var(--yyt-surface-2); color:var(--yyt-text-secondary); font-size:12px; line-height:1.6; }

.yyt-twb-field { display:flex; flex-direction:column; gap:6px; margin:0 0 10px; min-width:0; }
.yyt-twb-field > span { color:var(--yyt-text-secondary); font-size:12px; font-weight:700; }
.yyt-twb-field small { color:var(--yyt-text-muted); font-size:11px; line-height:1.45; }
.yyt-twb-check-row,
.yyt-twb-radio-group label,
.yyt-twb-table-chip { display:flex; align-items:center; gap:8px; color:var(--yyt-text-secondary); font-size:12px; }
.yyt-twb-check-row { width:max-content; max-width:100%; }
.yyt-twb-radio-group { display:flex; flex-direction:column; gap:8px; margin-bottom:10px; }
.yyt-twb-radio-group label { width:max-content; max-width:100%; }
.yyt-twb-segmented { display:inline-flex; gap:4px; padding:3px; border:1px solid var(--yyt-border); border-radius:999px; background:var(--yyt-surface-2); }
.yyt-twb-segmented button { border:none; border-radius:999px; padding:6px 11px; background:transparent; color:var(--yyt-text-secondary); cursor:pointer; font-size:12px; font-weight:700; }
.yyt-twb-segmented button.active { background:var(--yyt-accent); color:#fff; }
.yyt-twb-action-grid { display:flex; flex-wrap:wrap; gap:8px; }
.yyt-twb-table-chip-list { display:flex; flex-wrap:wrap; gap:8px; margin:10px 0; }
.yyt-twb-table-chip { max-width:220px; padding:6px 10px; border:1px solid var(--yyt-border); border-radius:999px; background:var(--yyt-surface-2); }
.yyt-twb-table-chip span { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.yyt-twb-muted { color:var(--yyt-text-muted); font-size:12px; }
.yyt-twb-help { margin:0; color:var(--yyt-text-secondary); font-size:12px; line-height:1.6; }
.yyt-twb-prompt-summary { cursor:pointer; font-weight:700; padding:8px 0; display:none; }
.yyt-twb-prompt-field { margin-top:10px; }

.yyt-twb-table-overview { border:1px solid var(--yyt-border); border-radius:8px; background:var(--yyt-surface); padding:14px; }
.yyt-twb-table-card-list { display:flex; flex-direction:column; gap:8px; }
.yyt-twb-table-card { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:12px; padding:12px; border:1px solid var(--yyt-border); border-radius:6px; background:var(--yyt-surface-2); cursor:pointer; }
.yyt-twb-table-card:hover,
.yyt-twb-table-card:focus-within { border-color:var(--yyt-accent); }
.yyt-twb-table-card.is-active { border-color:var(--yyt-accent); box-shadow:inset 3px 0 0 var(--yyt-accent); }
.yyt-twb-table-card-main { min-width:0; }
.yyt-twb-table-copy { min-width:0; }
.yyt-twb-table-card-main h4 { margin:0; color:var(--yyt-text); font-size:14px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.yyt-twb-table-card-main p { margin:5px 0 0; color:var(--yyt-text-secondary); font-size:12px; line-height:1.5; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.yyt-twb-table-card-meta { color:var(--yyt-text-muted); font-size:12px; margin-top:7px; }
.yyt-twb-table-card-meta.is-warning { color:#f6ad55; }
.yyt-twb-table-card-actions { display:flex; align-items:center; justify-content:flex-end; gap:8px; flex-wrap:wrap; }
.yyt-twb-empty { padding:24px; border:1px dashed var(--yyt-border); border-radius:8px; color:var(--yyt-text-secondary); background:var(--yyt-surface-2); text-align:center; }
.yyt-twb-live-badge { display:inline-block; padding:1px 7px; border-radius:999px; font-size:11px; font-weight:700; }
.yyt-twb-live-badge--live { background:rgba(56,178,172,.15); color:#38b2ac; }
.yyt-twb-live-badge--template { background:rgba(160,174,192,.15); color:#a0aec0; }
.yyt-twb-empty h4 { margin:0 0 6px; color:var(--yyt-text); font-size:15px; }
.yyt-twb-empty p { margin:0 0 14px; font-size:12px; line-height:1.6; }

.yyt-twb-editor-drawer { position:absolute; inset:0 0 0 auto; width:min(920px,92%); background:rgba(8,12,18,0.72); backdrop-filter:blur(10px); border-left:1px solid var(--yyt-border); transform:translateX(100%); transition:transform 180ms ease; z-index:20; box-shadow:-18px 0 40px rgba(0,0,0,0.22); }
.yyt-twb-editor-drawer.is-open { transform:translateX(0); }
.yyt-twb-editor { height:100%; display:flex; flex-direction:column; background:var(--yyt-surface); }
.yyt-twb-editor-header,
.yyt-twb-editor-footer { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; padding:16px 18px; border-bottom:1px solid var(--yyt-border); background:var(--yyt-surface); }
.yyt-twb-editor-footer { border-top:1px solid var(--yyt-border); border-bottom:none; justify-content:flex-end; }
.yyt-twb-editor-header h3 { margin:0; color:var(--yyt-text); font-size:17px; }
.yyt-twb-editor-header p { margin:4px 0 0; color:var(--yyt-text-secondary); font-size:12px; }
.yyt-twb-editor-body { overflow:auto; padding:18px; display:flex; flex-direction:column; gap:16px; }

.yyt-twb-ai-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
.yyt-twb-field-card-list { display:flex; flex-direction:column; gap:10px; }
.yyt-twb-field-card { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:10px; padding:12px; border:1px solid var(--yyt-border); border-radius:6px; background:var(--yyt-surface-2); }
.yyt-twb-field-card-main { display:grid; grid-template-columns:220px minmax(0,1fr); gap:10px; align-items:start; }
.yyt-twb-field-advanced { grid-column:1 / -1; border-top:1px dashed var(--yyt-border); padding-top:8px; }
.yyt-twb-field-advanced summary { cursor:pointer; color:var(--yyt-text-secondary); font-size:12px; font-weight:700; padding:6px 0; }
.yyt-twb-advanced-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; margin-top:10px; }

.yyt-twb-row-toolbar { display:flex; gap:8px; margin-bottom:12px; align-items:center; flex-wrap:wrap; }
.yyt-twb-row-toolbar .yyt-input { flex:1; min-width:180px; }
.yyt-twb-row-list { display:flex; flex-direction:column; gap:12px; }
.yyt-twb-row-card { border:1px solid var(--yyt-border); border-radius:6px; background:var(--yyt-surface-2); padding:14px; }
.yyt-twb-row-card.row-new { border-color:#48bb78; }
.yyt-twb-row-card.row-updated { border-color:#f6ad55; }
.yyt-twb-row-card.row-deleted { border-color:#f56565; opacity:0.72; }
.yyt-twb-row-card-header { display:flex; justify-content:space-between; gap:12px; margin-bottom:12px; align-items:flex-start; }
.yyt-twb-row-card-header > div:first-child { display:flex; align-items:center; gap:9px; min-width:0; flex:1; }
.yyt-twb-row-index { display:inline-flex; align-items:center; justify-content:center; height:28px; padding:0 9px; border:1px solid var(--yyt-border); border-radius:999px; background:var(--yyt-surface); color:var(--yyt-text-secondary); font-size:11px; font-weight:700; white-space:nowrap; }
.yyt-twb-row-name { max-width:280px; }
.yyt-twb-row-actions { display:flex; align-items:center; gap:8px; }
.yyt-twb-row-fields { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
.yyt-twb-span-2 { grid-column:span 2; }
.yyt-twb-diagnostics details { border:1px solid var(--yyt-border); border-radius:6px; background:var(--yyt-surface-2); overflow:hidden; }
.yyt-twb-diagnostics summary { cursor:pointer; padding:11px 12px; color:var(--yyt-text-secondary); font-size:12px; font-weight:700; }
.yyt-twb-diagnostic-grid { display:grid; grid-template-columns:minmax(220px,0.8fr) minmax(0,1.2fr); gap:12px; padding:0 12px 12px; }
.yyt-twb-diagnostic-body { padding:0 12px 12px; display:flex; flex-direction:column; gap:12px; }
.yyt-twb-diagnostic-grid h5,
.yyt-twb-diagnostic-body h5 { margin:0 0 8px; color:var(--yyt-text); font-size:12px; }
.yyt-twb-pre { margin:0; padding:10px; max-height:260px; overflow:auto; white-space:pre-wrap; word-break:break-word; border:1px solid var(--yyt-border); border-radius:6px; background:var(--yyt-surface); color:var(--yyt-text-secondary); font-family:'Fira Code','Consolas',monospace; font-size:11px; line-height:1.6; }

@media (max-width:980px) {
  .yyt-twb-dashboard-grid { grid-template-columns:1fr; }
  .yyt-twb-metrics { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .yyt-twb-table-card { grid-template-columns:1fr; }
  .yyt-twb-table-card-actions { justify-content:flex-start; }
  .yyt-twb-editor-drawer { width:100%; }
  .yyt-twb-ai-grid,
  .yyt-twb-field-card-main,
  .yyt-twb-advanced-grid,
  .yyt-twb-diagnostic-grid { grid-template-columns:1fr; }
  .yyt-twb-span-2 { grid-column:1 / -1; }
}

@media (max-width:640px) {
  .yyt-twb { gap:12px; }
  .yyt-twb-dashboard { padding:0; }
  .yyt-twb-metrics,
  .yyt-twb-row-fields { grid-template-columns:1fr; }
  .yyt-twb-table-card-main,
  .yyt-twb-row-card-header,
  .yyt-twb-row-card-header > div:first-child { flex-direction:column; align-items:flex-start; }
  .yyt-twb-row-name { max-width:none; width:100%; }
  .yyt-twb-row-actions,
  .yyt-twb-row-toolbar { width:100%; }
  .yyt-twb-row-toolbar .yyt-input,
  .yyt-twb-segmented { width:100%; }
  .yyt-twb-segmented button { flex:1; }
  .yyt-twb-editor-header,
  .yyt-twb-editor-footer { padding:14px; }
  .yyt-twb-editor-body { padding:14px; }
}
`;iy={id:"tableWorkbenchPanel",currentTableIndex:0,editorOpen:!1,lastDiff:null,pendingTemplateApplyId:"",_pendingDeleteTemplateId:"",availableWorldbooks:[],worldbookLoadState:"idle",render({config:t}={}){let e=t&&typeof t=="object"?t:$e(),s=Array.isArray(e.tables)?e.tables:[];this.currentTableIndex=pt(s,e.__activeTableIndex??this.currentTableIndex);let r=this.currentTableIndex;return`
      <div class="yyt-tool-panel yyt-twb" data-tool-id="tableWorkbench">
        ${im(e)}
        ${gm(e)}
        ${_m(e,r,this.editorOpen,this.lastDiff?.[r])}
      </div>`},bindEvents(t){let e=O();if(!e||!K(t))return;let s=this;t.off(".twb"),this._subscribeChatChanged(t),t.on("change.twb",'[data-twb-field="worldbooksEnabled"]',function(){let r=e(this).is(":checked");t.find("[data-twb-wb-selector]").toggleClass("yyt-hidden",!r),r&&s.availableWorldbooks.length===0&&s.worldbookLoadState==="idle"&&s._loadTableWorldbooks(t)}),t.on("change.twb",'[data-twb-field="worldbookSyncEnabled"]',function(){let r=e(this).is(":checked");t.find("[data-twb-wbsync-opts]").toggleClass("yyt-hidden",!r),r&&s.availableWorldbooks.length===0&&s.worldbookLoadState==="idle"&&s._loadTableWorldbooks(t),r&&s.availableWorldbooks.length>0&&s._renderWorldbookSyncTargetSelect(t)}),t.on("change.twb","[data-twb-wb-item]",function(){s._updateWorldbookSummary(t)}),t.on("click.twb",'[data-twb-action="open-table-editor"]',function(r){r.stopPropagation();let o=Ue(t,s.lastLiveConfig),n=Number(e(this).attr("data-twb-ti"));o.__activeTableIndex=n,s.currentTableIndex=pt(o.tables,n),s.editorOpen=!0,s.renderTo(t,{config:o})}),t.on("click.twb",'[data-twb-action="close-table-editor"]',function(){ry(t,s)}),t.on("keydown.twb",function(r){r.key==="Escape"&&s.editorOpen&&(r.stopPropagation(),ry(t,s))}),t.on("click.twb","[data-twb-select]",function(){let r=Number(e(this).attr("data-twb-select")),o=Ue(t,s.lastLiveConfig);o.__activeTableIndex=r,s.currentTableIndex=pt(o.tables,r),s.renderTo(t,{config:o})}),t.on("click.twb",'[data-twb-action="add-table"]',function(r){r.stopPropagation();let o=Ue(t,s.lastLiveConfig),n=Array.isArray(o.tables)?[...o.tables]:[];n.push(Oa(n.length+1)),o.tables=n,o.__activeTableIndex=n.length-1,Je(o),s.currentTableIndex=n.length-1,s.editorOpen=!0,s.renderTo(t,{config:o})}),t.on("click.twb",'[data-twb-action="delete-table"]',async function(r){r.stopPropagation();let o=Number(e(this).attr("data-twb-ti")),n=Ue(t),a=Array.isArray(n.tables)?[...n.tables]:[];if(o<0||o>=a.length)return;let i=a[o]?.name||`\u8868\u683C ${o+1}`;if(!await he("\u5220\u9664\u8868\u683C",`\u786E\u5B9A\u8981\u5220\u9664\u300C${i}\u300D\u5417\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,{danger:!0}))return;a.splice(o,1);let l=pt(a,o>0?o-1:0);n.tables=a,n.__activeTableIndex=l,Je(n),s.currentTableIndex=l,s.editorOpen=!1,s.renderTo(t,{config:n})}),t.on("click.twb",'[data-twb-action="save"]',()=>{let r=Ue(t),o=Je(r);o.success?(E("success","\u5DF2\u4FDD\u5B58"),s.renderTo(t,{config:o.config})):Q("warning",o.error||"\u4FDD\u5B58\u5931\u8D25",{duration:4e3,noticeId:"twb-save"})}),t.on("click.twb",'[data-twb-action="run"], [data-twb-action="run-selected"], [data-twb-action="run-table"]',async function(){let r=e(this).attr("data-twb-action"),o=Number(e(this).attr("data-twb-ti")),n=Ue(t);if(Number.isInteger(o)){n.__activeTableIndex=o;let i=Array.isArray(n.tables)?n.tables[o]:null;i&&(n.scope={...n.scope||{},activeTableId:fn(i,o)})}r==="run-selected"?(n.runScope="selected",n.scope={...n.scope||{},mode:"selected"}):r==="run-table"&&(n.runScope="current",n.scope={...n.scope||{},mode:"current"});let a=Je(n);if(!a.success){Q("warning",a.error||"\u4FDD\u5B58\u5931\u8D25",{duration:4e3,noticeId:"twb-save"});return}try{e(this).prop("disabled",!0).text("\u586B\u8868\u4E2D...");let i=await Zd(a.config);if(!i?.success)Q("warning",i?.error||"\u586B\u8868\u5931\u8D25",{duration:4e3,noticeId:"twb-run"});else{s.lastDiff=i.diff||null;let l=i.fillMode==="incremental"?"\u589E\u91CF":"\u5168\u91CF",c=i.scopeStats,d="";if(c&&(c.droppedByScope>0||c.droppedByLock>0)){let y=[];c.droppedByScope>0&&y.push(`${c.droppedByScope} \u6761\u56E0 scope \u8FC7\u6EE4`),c.droppedByLock>0&&y.push(`${c.droppedByLock} \u6761\u56E0\u9501\u5B9A\u8FC7\u6EE4`),d=`\uFF0C${y.join("\u3001")}`}i.warning?Q("warning",`\u586B\u8868\u5B8C\u6210 (${l}${d})\uFF0C\u955C\u50CF\u5931\u8D25: ${i.warning}`,{duration:4200,noticeId:"twb-run"}):Q("success",`\u586B\u8868\u5B8C\u6210 (${l}${d})`,{duration:2800,noticeId:"twb-run"})}if(i?.success||i?.nextTables){let l=$e(),c=i.nextTables||i.state?.tables||[];Qr.debug("nextTables",c.map(y=>({id:y?.id,key:y?.key,name:y?.name,rowCount:y?.rows?.length}))),Qr.debug("configTables",l.tables?.map(y=>({id:y?.id,key:y?.key,name:y?.name,rowCount:y?.rows?.length})));let d=qa(l.tables,c,"exact");Qr.debug("mergedTables",d.map(y=>({id:y?.id,key:y?.key,name:y?.name,rowCount:y?.rows?.length,source:y?.__liveSourceKind}))),s.lastLiveConfig={...l,tables:d,__liveSourceKind:"exact"},s.lastLiveTarget=i.targetSnapshot||null}}catch(i){E("error",i?.message||"\u586B\u8868\u5931\u8D25")}finally{s.renderTo(t,{config:s.lastLiveConfig||void 0})}}),t.on("click.twb",'[data-twb-action="add-row"]',()=>{let r=Ue(t),o=pt(r.tables,s.currentTableIndex),n=Array.isArray(r.tables)?[...r.tables]:[];if(!n[o])return;let a={...n[o]};a.rows=Array.isArray(a.rows)?[...a.rows]:[];let i=cn(a.columns||[],a.rows.length+1);a.rows.push(i),n[o]=a,r.tables=n,r.__activeTableIndex=o,Je(r),s.renderTo(t,{config:r})}),t.on("click.twb",'[data-twb-action="delete-row"]',function(){let r=Number(e(this).attr("data-twb-ri")),o=Ue(t),n=pt(o.tables,s.currentTableIndex),a=Array.isArray(o.tables)?[...o.tables]:[];if(!a[n]||r<0||r>=(a[n].rows?.length||0))return;let i={...a[n]};i.rows=Array.isArray(i.rows)?[...i.rows]:[],i.rows.splice(r,1),a[n]=i,o.tables=a,o.__activeTableIndex=n,Je(o),s.renderTo(t,{config:o})}),t.on("click.twb",'[data-twb-action="add-col"]',()=>{let r=Ue(t),o=pt(r.tables,s.currentTableIndex),n=Array.isArray(r.tables)?[...r.tables]:[];if(!n[o])return;let a={...n[o]};a.columns=Array.isArray(a.columns)?[...a.columns]:[];let i=a.columns.length+1,l=ln(i,a.columns);a.columns.push(l),n[o]=a,r.tables=n,r.__activeTableIndex=o,Je(r),s.renderTo(t,{config:r})}),t.on("click.twb",'[data-twb-action="delete-col"]',async function(){let r=e(this).attr("data-twb-ci"),o=Ue(t),n=pt(o.tables,s.currentTableIndex),a=Array.isArray(o.tables)?[...o.tables]:[];if(!a[n])return;let i=a[n].columns?.find(d=>d.key===r),l=i?.name||i?.key||"\u6B64\u5B57\u6BB5";if(!await he("\u5220\u9664\u5B57\u6BB5",`\u786E\u5B9A\u8981\u5220\u9664\u300C${l}\u300D\u5417\uFF1F\u5173\u8054\u7684\u5355\u5143\u683C\u6570\u636E\u4E5F\u5C06\u88AB\u79FB\u9664\u3002`,{danger:!0}))return;let c={...a[n]};c.columns=Array.isArray(c.columns)?[...c.columns]:[],c.columns=c.columns.filter(d=>d.key!==r),c.rows=(c.rows||[]).map(d=>{let y={...d.cells||{}};return delete y[r],{...d,cells:y}}),a[n]=c,o.tables=a,o.__activeTableIndex=n,Je(o),s.renderTo(t,{config:o})}),t.on("contextmenu.twb","[data-twb-row]",function(r){r.preventDefault();let o=Number(e(this).attr("data-twb-ri"));new qr().show(r.clientX,r.clientY,{rowIndex:o,onAction(a){if(a==="insert-row-above"||a==="insert-row-below"){let i=a==="insert-row-above"?o:o+1,l=Ue(t),c=pt(l.tables,s.currentTableIndex),d=Array.isArray(l.tables)?[...l.tables]:[];if(!d[c])return;let y={...d[c]};y.rows=Array.isArray(y.rows)?[...y.rows]:[];let p=cn(y.columns||[],y.rows.length+1);y.rows.splice(Math.max(i,0),0,p),d[c]=y,l.tables=d,l.__activeTableIndex=c,Je(l),s.renderTo(t,{config:l})}else a==="delete-row"&&t.find(`[data-twb-action="delete-row"][data-twb-ri="${o}"]`).trigger("click")}})}),t.on("click.twb","[data-twb-row-filter]",function(){let r=e(this).attr("data-twb-row-filter");t.find("[data-twb-row-filter]").removeClass("active"),e(this).addClass("active"),t.find("[data-twb-row]").each(function(){let o=r==="all"||e(this).hasClass(`row-${r}`);e(this).toggle(o)})}),t.on("input.twb","[data-twb-row-search]",function(){let r=String(e(this).val()||"").toLowerCase().trim();t.find("[data-twb-row]").each(function(){e(this).toggle(!r||e(this).text().toLowerCase().includes(r))})}),t.on("click.twb",'[data-twb-action="apply-template"]',function(){let r=Ue(t),o=oe(r.activeTemplate,""),n=Hr().find(l=>l.id===o);if(!n){Q("warning","\u8BF7\u5148\u5728\u4E0B\u62C9\u5217\u8868\u4E2D\u9009\u62E9\u4E00\u4E2A\u6A21\u677F\u3002",{duration:3e3,noticeId:"twb-template"});return}if(Array.isArray(r.tables)&&r.tables.length>0&&s.pendingTemplateApplyId!==o){s.pendingTemplateApplyId=o,Q("warning",'\u5E94\u7528\u6A21\u677F\u4F1A\u66FF\u6362\u5F53\u524D\u8868\u683C\u3002\u518D\u6B21\u70B9\u51FB"\u5E94\u7528\u6A21\u677F"\u786E\u8BA4\u3002',{duration:4200,noticeId:"twb-template"});return}let i=rd(o);s.pendingTemplateApplyId="",s.currentTableIndex=0,s.editorOpen=!1,i.success?(Q("success",`\u5DF2\u5E94\u7528\u6A21\u677F\uFF1A${n.name}`,{duration:2800,noticeId:"twb-template"}),s.renderTo(t,{config:i.config})):Q("warning",i.error||"\u5E94\u7528\u6A21\u677F\u5931\u8D25",{duration:4e3,noticeId:"twb-template"})}),t.on("click.twb",'[data-twb-action="save-template"]',async function(){let r=Ue(t),o=`${oe(r.tables?.[0]?.name,"\u586B\u8868\u6A21\u677F")} ${new Date().toLocaleString()}`,n=await Wn("\u4FDD\u5B58\u6A21\u677F","\u8BF7\u8F93\u5165\u6A21\u677F\u540D\u79F0",{defaultValue:o});if(!n)return;let a=Je(r);if(!a.success){Q("warning",a.error||"\u4FDD\u5B58\u914D\u7F6E\u5931\u8D25",{duration:4e3,noticeId:"twb-template"});return}let i=od({name:n,description:"\u4ECE\u586B\u8868\u5DE5\u4F5C\u53F0\u4FDD\u5B58\u3002"});i.success?(Q("success",`\u5DF2\u4FDD\u5B58\u6A21\u677F\uFF1A${i.template.name}`,{duration:2800,noticeId:"twb-template"}),s.renderTo(t)):Q("warning",i.error||"\u4FDD\u5B58\u6A21\u677F\u5931\u8D25",{duration:4e3,noticeId:"twb-template"})}),t.on("click.twb",'[data-twb-action="delete-template"]',function(){let r=oe(e(this).attr("data-twb-template-id"),"");if(!r)return;let o=Hr().find(a=>a.id===r);if(!o){Q("warning","\u6A21\u677F\u4E0D\u5B58\u5728\u3002",{duration:3e3,noticeId:"twb-template"});return}if(s._pendingDeleteTemplateId!==r){s._pendingDeleteTemplateId=r,Q("warning",`\u786E\u8BA4\u5220\u9664\u6A21\u677F"${o.name}"\uFF1F\u518D\u6B21\u70B9\u51FB\u5220\u9664\u6309\u94AE\u786E\u8BA4\u3002`,{duration:4200,noticeId:"twb-template"});return}s._pendingDeleteTemplateId="";let n=zc(r);n.success?(Q("success","\u5DF2\u5220\u9664\u6A21\u677F\u3002",{duration:2800,noticeId:"twb-template"}),s.renderTo(t)):Q("warning",n.error||"\u5220\u9664\u5931\u8D25",{duration:4e3,noticeId:"twb-template"})}),t.on("click.twb",'[data-twb-action="export-template"]',function(){let r=Ue(t),o=oe(Hr().find(a=>a.id===r.activeTemplate)?.name,"\u5F53\u524D\u586B\u8868\u6A21\u677F"),n={version:1,exportedAt:new Date().toISOString(),template:{id:oe(r.activeTemplate,""),name:o,description:"YouYou Toolkit \u586B\u8868\u6A21\u677F\u5BFC\u51FA\u3002",tables:r.tables||[],promptTemplate:r.promptTemplate||""}};nt(Ha(n),`youyou_table_template_${Date.now()}.json`),Q("success","\u6A21\u677F\u5DF2\u5BFC\u51FA\u4E3A\u6587\u4EF6\u3002",{duration:2800,noticeId:"twb-template"})}),t.on("click.twb",'[data-twb-action="export-all-templates"]',function(){let r=Uc();if(!r.templates||r.templates.length===0){Q("warning","\u6CA1\u6709\u7528\u6237\u6A21\u677F\u53EF\u5BFC\u51FA\u3002",{duration:3e3,noticeId:"twb-template"});return}nt(Ha(r),`youyou_table_templates_all_${Date.now()}.json`),Q("success",`\u5DF2\u5BFC\u51FA ${r.templates.length} \u4E2A\u7528\u6237\u6A21\u677F\u3002`,{duration:2800,noticeId:"twb-template"})}),t.on("click.twb",'[data-twb-action="import-template"]',function(){t.find("[data-twb-import-file]").val("").trigger("click")}),t.on("change.twb","[data-twb-import-file]",async function(){let r=this.files?.[0];if(r)try{let o=await mt(r),n=JSON.parse(o),a=jc(n,{overwrite:!1});a.imported>0?(Q("success",`\u5DF2\u5BFC\u5165 ${a.imported} \u4E2A\u6A21\u677F${a.skipped?`\uFF0C\u8DF3\u8FC7 ${a.skipped} \u4E2A\u5DF2\u5B58\u5728`:""}\u3002`,{duration:3500,noticeId:"twb-template"}),s.renderTo(t)):a.skipped>0?Q("warning",`${a.skipped} \u4E2A\u6A21\u677F\u5DF2\u5B58\u5728\uFF0C\u5168\u90E8\u8DF3\u8FC7\u3002`,{duration:3500,noticeId:"twb-template"}):Q("warning",a.errors?.[0]||"\u672A\u5BFC\u5165\u4EFB\u4F55\u6A21\u677F\u3002",{duration:4e3,noticeId:"twb-template"})}catch(o){Q("warning",o?.message||"\u6A21\u677F\u6587\u4EF6\u89E3\u6790\u5931\u8D25",{duration:4e3,noticeId:"twb-template"})}}),t.on("change.twb",'[data-twb-field="bypassEnabled"]',function(){t.find(".yyt-twb-bypass-preset").toggleClass("yyt-hidden",!e(this).is(":checked"))}),t.on("blur.twb change.twb","[data-twb-name], [data-twb-note], [data-twb-table-instruction], [data-twb-col] input, [data-twb-col] select, [data-twb-col] textarea, [data-twb-row] input, [data-twb-row] select, [data-twb-row] textarea, [data-twb-field]",function(){let r=Ue(t);Je(r)})},destroy(t){!O()||!K(t)||(qr.destroy(),t.off(".twb"),typeof this._chatChangedUnsubscribe=="function"&&this._chatChangedUnsubscribe(),this._clearLiveCache())},getStyles(){return sm},lastLiveConfig:null,lastLiveTarget:null,_liveRefreshPending:!1,_chatChangedUnsubscribe:null,_clearLiveCache(){this.lastLiveConfig=null,this.lastLiveTarget=null},_subscribeChatChanged(t){if(!this._chatChangedUnsubscribe)try{let e=window.parent!==void 0&&window.parent!==window?window.parent:window,s=e?.SillyTavern||null,r=s?.getContext?.()||null,o=s?.eventSource||e?.eventSource||r?.eventSource||null,n=s?.eventTypes||r?.eventTypes||e?.event_types||{},a=n.CHAT_CHANGED||n.chat_changed||"chat_changed";if(o&&typeof o.on=="function"){let i=()=>{this._clearLiveCache(),K(t)&&this.renderTo(t)};o.on(a,i),this._chatChangedUnsubscribe=()=>{try{o.off(a,i)}catch{}this._chatChangedUnsubscribe=null}}}catch{}},async _loadTableWorldbooks(t){this.worldbookLoadState="loading",this._renderWorldbookList(t);try{let{getAvailableWorldbooks:e}=await Promise.resolve().then(()=>($r(),Kl)),s=await e();this.availableWorldbooks=Array.isArray(s)?s:[]}catch{this.availableWorldbooks=[]}this.worldbookLoadState="ready",this._renderWorldbookList(t),this._renderWorldbookSyncTargetSelect(t)},_renderWorldbookList(t){let e=O(),s=t.find("[data-twb-wb-list]");if(!s.length)return;let r=this.lastLiveConfig||$e(),o=new Set(Array.isArray(r.worldbooks?.selected)?r.worldbooks.selected:[]),n=this.availableWorldbooks;if(this.worldbookLoadState==="loading"){s.html('<div style="padding:6px;color:var(--yyt-text-muted);font-size:12px">\u4E16\u754C\u4E66\u52A0\u8F7D\u4E2D\u2026</div>');return}if(n.length===0){s.html('<div style="padding:6px;color:var(--yyt-text-muted);font-size:12px">\u65E0\u53EF\u7528\u4E16\u754C\u4E66\u3002</div>');return}s.html(n.map(a=>`<label class="yyt-twb-check-row" style="margin-bottom:4px">
      <input type="checkbox" data-twb-wb-item data-twb-wb-name="${m(a)}" ${o.has(a)?"checked":""}>
      <span>${m(a)}</span>
    </label>`).join(""))},_updateWorldbookSummary(t){let e=O(),s=[];t.find("[data-twb-wb-item]:checked").each(function(){let r=String(e(this).attr("data-twb-wb-name")||"").trim();r&&s.push(r)})},_renderWorldbookSyncTargetSelect(t){let e=O(),s=t.find('[data-twb-field="worldbookSyncTarget"]');if(!s.length)return;let o=(this.lastLiveConfig||$e()).worldbookSync?.targetBook||"",n=this.availableWorldbooks;s.html(`<option value="">\u8BF7\u9009\u62E9\u2026</option>${n.map(a=>`<option value="${m(a)}" ${a===o?"selected":""}>${m(a)}</option>`).join("")}`)},async _refreshLiveState(t){if(!this._liveRefreshPending){this._liveRefreshPending=!0;try{let e=await Na({runSource:"MANUAL_TABLE"});if(Qr.debug("_refreshLiveState targetSnapshot",e?{sourceMessageId:e.sourceMessageId,slotBindingKey:e.slotBindingKey,slotRevisionKey:e.slotRevisionKey,chatId:e.chatId}:null),!e){this._clearLiveCache();return}let s=wd(e);if(Qr.debug("_refreshLiveState boundState",s?{hasTables:Array.isArray(s.tables),tableCount:s.tables?.length,rowCounts:s.tables?.map(a=>a?.rows?.length),sourceKind:s.meta?.sourceKind}:null),!s||!Array.isArray(s.tables)||s.tables.length===0){this.lastLiveTarget=e,this.lastLiveConfig&&(this.lastLiveConfig=null,K(t)&&this.renderTo(t,{config:$e(),_skipRefresh:!0}));return}let r=$e(),o=s.meta?.sourceKind||"exact",n=qa(r.tables,s.tables,o);this.lastLiveConfig={...r,tables:n,__liveSourceKind:o},this.lastLiveTarget=e,K(t)&&this.renderTo(t,{config:this.lastLiveConfig,_skipRefresh:!0})}catch{}finally{this._liveRefreshPending=!1}}},renderTo(t,{config:e,_skipRefresh:s}={}){if(!O()||!K(t))return;let o=e&&typeof e=="object"?e:this.lastLiveConfig||$e();this.currentTableIndex=pt(o.tables,o.__activeTableIndex??this.currentTableIndex),t.html(this.render({config:o})),this.bindEvents(t),o.worldbooks?.enabled&&this.availableWorldbooks.length>0?this._renderWorldbookList(t):o.worldbooks?.enabled&&this.worldbookLoadState==="idle"&&this._loadTableWorldbooks(t),o.worldbookSync?.enabled&&this.availableWorldbooks.length>0?this._renderWorldbookSyncTargetSelect(t):o.worldbookSync?.enabled&&this.worldbookLoadState==="idle"&&this._loadTableWorldbooks(t),!e&&!s&&this._refreshLiveState(t)}},Am=iy});var yy={};re(yy,{LoggerPanel:()=>dy,default:()=>Cm});function Im(t){switch(t){case se.DEBUG:return"yyt-log-debug";case se.INFO:return"yyt-log-info";case se.WARN:return"yyt-log-warn";case se.ERROR:return"yyt-log-error";default:return""}}function Mm(t){let e=new Date(t),s=r=>String(r).padStart(2,"0");return`${s(e.getHours())}:${s(e.getMinutes())}:${s(e.getSeconds())}.${String(e.getMilliseconds()).padStart(3,"0")}`}var Em,km,dy,Cm,uy=U(()=>{ce();ke();Ce();Em="yyt-logger-panel",km=[{level:null,label:"\u5168\u90E8",icon:"fa-list"},{level:se.DEBUG,label:"DEBUG",icon:"fa-bug"},{level:se.INFO,label:"INFO",icon:"fa-circle-info"},{level:se.WARN,label:"WARN",icon:"fa-triangle-exclamation"},{level:se.ERROR,label:"ERROR",icon:"fa-circle-exclamation"}];dy={id:"loggerPanel",render(){let t=N.getStats();return`
      <div class="yyt-logger-panel" id="${Em}">
        <div class="yyt-logger-toolbar">
          <div class="yyt-logger-filter-btns" data-yyt-log-filter-group>
            ${km.map((e,s)=>`<button class="yyt-log-filter-btn ${s===0?"yyt-active":""}" data-level="${e.level??""}">
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
    `},bindEvents(t){let e=O();if(!e||!K(t))return;let s=this,r=null,o=!1,n=[],a=t.find("[data-yyt-log-list]"),i=t.find("[data-yyt-log-search]"),l=t.find("[data-yyt-log-autoscroll]"),c=t.find("[data-yyt-log-pause]");function d(u){if(!u.length){a.html('<div class="yyt-logger-empty">\u6682\u65E0\u5339\u914D\u7684\u65E5\u5FD7\u8BB0\u5F55</div>');return}a.html(u.map(f=>`
        <div class="yyt-log-entry ${Im(f.level)}" data-log-id="${f.id}">
          <span class="yyt-log-time">${Mm(f.timestamp)}</span>
          <span class="yyt-log-level">${N.levelLabel(f.level)}</span>
          <span class="yyt-log-scope">${m(f.scope)}</span>
          <span class="yyt-log-msg">${m(f.message)}</span>
          ${f.data!==void 0?`<span class="yyt-log-data">${m(typeof f.data=="object"?JSON.stringify(f.data):String(f.data))}</span>`:""}
        </div>
      `).join(""))}function y(){let u=i.val()?.trim()||"",{entries:f}=N.getEntries({level:r,search:u||void 0,limit:500});d(f),l.is(":checked")&&requestAnimationFrame(()=>{a[0].scrollTop=a[0].scrollHeight})}function p(){if(o||!n.length)return;let u=n;n=[],y()}this._onLogEntry=u=>{if(o||r!==null&&u.level<r)return;let f=i.val()?.trim().toLowerCase()||"";if(f){let h=u.scope.toLowerCase().includes(f),v=u.message.toLowerCase().includes(f);if(!h&&!v)return}n.push(u),n.length>=50?p():this._flushTimer||(this._flushTimer=setTimeout(()=>{this._flushTimer=null,p(),s._updateStats(t)},250))},L.on("logger:entry",this._onLogEntry),t.on("click.yytLogger","[data-yyt-log-filter-group] .yyt-log-filter-btn",u=>{t.find("[data-yyt-log-filter-group] .yyt-log-filter-btn").removeClass("yyt-active"),e(u.currentTarget).addClass("yyt-active");let f=e(u.currentTarget).data("level");r=f===""?null:f,y(),s._updateStats(t)}),i.on("input.yytLogger",()=>{y()}),t.on("click.yytLogger","[data-yyt-log-pause]",()=>{o=!o,c.toggleClass("yyt-active",o),c.html(o?'<i class="fa-solid fa-play"></i> \u7EE7\u7EED':'<i class="fa-solid fa-pause"></i> \u6682\u505C'),o||(n=[],y(),s._updateStats(t))}),t.on("click.yytLogger","[data-yyt-log-clear]",()=>{N.clear(),a.html('<div class="yyt-logger-empty">\u65E5\u5FD7\u5DF2\u6E05\u9664</div>'),s._updateStats(t)}),t.on("click.yytLogger","[data-yyt-log-export]",()=>{let{entries:u}=N.getEntries({limit:1e4}),f=JSON.stringify(u.map(S=>({time:new Date(S.timestamp).toISOString(),level:N.levelLabel(S.level),scope:S.scope,message:S.message,data:S.data})),null,2),h=new Blob([f],{type:"application/json"}),v=URL.createObjectURL(h),w=document.createElement("a");w.href=v,w.download=`yyt-logs-${new Date().toISOString().replace(/[:.]/g,"-")}.json`,w.click(),URL.revokeObjectURL(v)}),y()},_updateStats(t){if(!O()||!K(t))return;let s=N.getStats(),r=t.find(".yyt-logger-stats");r.length&&r.html(`
      <span class="yyt-logger-stat">\u5171 <strong>${s.total}</strong> \u6761</span>
      ${["ERROR","WARN","INFO","DEBUG"].map(o=>`<span class="yyt-logger-stat yyt-log-${o.toLowerCase()}">${o}: <strong>${s.byLevel[o]||0}</strong></span>`).join("")}
    `)},destroy(t){let e=O();this._onLogEntry&&(L.off("logger:entry",this._onLogEntry),this._onLogEntry=null),this._flushTimer&&(clearTimeout(this._flushTimer),this._flushTimer=null),!(!e||!K(t))&&t.off(".yytLogger")},getStyles(){return`
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
    `}},Cm=dy});var xy={};re(xy,{MAIN_TAB_RENDERERS:()=>ai,PanelState:()=>Ws,SCRIPT_ID:()=>b,SUB_TAB_RENDERERS:()=>ii,UIManager:()=>Sr,bindDialogEvents:()=>es,closeActiveCustomSelectDropdown:()=>Qe,closeCustomSelectDropdown:()=>xr,createDialogHtml:()=>Zt,default:()=>$m,destroyEnhancedCustomSelects:()=>Ie,downloadJson:()=>nt,enhanceNativeSelects:()=>Ne,escapeHtml:()=>m,fillFormWithConfig:()=>fo,getAllStyles:()=>vy,getFormApiConfig:()=>wr,getJQuery:()=>O,getTargetDocument:()=>Et,initUI:()=>my,isContainerValid:()=>K,normalizeCustomSelectOptions:()=>uo,openCustomSelectDropdown:()=>zi,readFileContent:()=>mt,registerComponents:()=>Ya,renderApiPanel:()=>Ga,renderBypassPanel:()=>si,renderCustomSelectControl:()=>po,renderEscapeTransformToolPanel:()=>ei,renderLoggerPanel:()=>ni,renderMainTab:()=>by,renderPunctuationTransformToolPanel:()=>ti,renderRegexPanel:()=>Va,renderSettingsPanel:()=>ri,renderStatusBlockPanel:()=>Qa,renderSubTabComponent:()=>hy,renderSummaryToolPanel:()=>Xa,renderTableWorkbenchPanel:()=>oi,renderToolPanel:()=>Ja,renderYouyouReviewPanel:()=>Za,repositionActiveCustomSelectDropdown:()=>jn,resetJQueryCache:()=>Ru,showConfirm:()=>he,showPrompt:()=>Wn,showToast:()=>E,showTopNotice:()=>Q,toggleCustomSelectDropdown:()=>yo,uiManager:()=>bt,withButtonLoading:()=>zu});async function fy(t){if(!mn.has(t)){let e=py[t];if(typeof e!="function")throw new Error(`unknown_panel:${t}`);mn.set(t,e().then(s=>{let r=s?.[t]||s?.default;if(!r?.id)throw new Error(`invalid_panel:${t}`);return r}).catch(s=>{throw mn.delete(t),s}))}return mn.get(t)}function gy(t,e=null){let s=e?.message?`\uFF1A${m(e.message)}`:"";return`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>${m(t)}${s}</span></div>`}async function Ya(){let t=await Promise.allSettled(Object.keys(py).map(async s=>{let r=await fy(s);return bt.register(r.id,r),r.id})),e=t.filter(s=>s.status==="rejected");e.length&&e.forEach(s=>eo.error("\u7EC4\u4EF6\u6CE8\u518C\u5931\u8D25",s.reason)),eo.log(`\u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210\uFF0C\u6210\u529F ${t.length-e.length} \u4E2A\uFF0C\u5931\u8D25 ${e.length} \u4E2A`)}async function my(t={}){let{autoInjectStyles:e=!0,targetDocument:s,...r}=t;bt.init(r),await Ya(),e&&bt.injectStyles(s),eo.log("\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}async function Rm(t){let e=await fy(t);return bt.getComponent(e.id)||bt.register(e.id,e),e}async function ft(t,e,s={}){let r=await Rm(t);bt.render(r.id,e,s)}function Ga(t){return ft("ApiPresetPanel",t)}function Va(t){return ft("RegexExtractPanel",t)}function Ja(t){return ft("ToolManagePanel",t)}function Xa(t){return ft("SummaryToolPanel",t)}function Qa(t){return ft("StatusBlockPanel",t)}function Za(t){return ft("YouyouReviewPanel",t)}function ei(t){return ft("EscapeTransformToolPanel",t)}function ti(t){return ft("PunctuationTransformToolPanel",t)}function si(t){return ft("BypassPanel",t)}function ri(t){return ft("SettingsPanel",t)}function oi(t){return ft("TableWorkbenchPanel",t)}function ni(t){return ft("LoggerPanel",t)}async function by(t,e){let s=ai[t];if(!s)return!1;try{await s.render(e)}catch(r){eo.error(s.failMessage,r),e.html(gy(s.failMessage,r))}return!0}async function hy(t,e){let s=ii[t];if(!s)return null;try{await s.render(e)}catch(r){eo.error(s.failMessage,r),e.html(gy(s.failMessage,r))}return t}function vy(){return bt.getAllStyles()}var eo,py,mn,ai,ii,$m,wy=U(()=>{ce();Fn();Ce();Ce();Fn();eo=N.createScope("UI"),py=Object.freeze({ApiPresetPanel:()=>Promise.resolve().then(()=>(Ki(),Fi)),RegexExtractPanel:()=>Promise.resolve().then(()=>(nl(),ol)),ToolManagePanel:()=>Promise.resolve().then(()=>(Ll(),Ol)),SummaryToolPanel:()=>Promise.resolve().then(()=>(pc(),uc)),StatusBlockPanel:()=>Promise.resolve().then(()=>(mc(),gc)),YouyouReviewPanel:()=>Promise.resolve().then(()=>(vc(),hc)),EscapeTransformToolPanel:()=>Promise.resolve().then(()=>(Tc(),Sc)),PunctuationTransformToolPanel:()=>Promise.resolve().then(()=>(Ec(),Ac)),BypassPanel:()=>Promise.resolve().then(()=>(Mc(),Ic)),SettingsPanel:()=>Promise.resolve().then(()=>(ha(),ba)),TableWorkbenchPanel:()=>Promise.resolve().then(()=>(cy(),ly)),LoggerPanel:()=>Promise.resolve().then(()=>(uy(),yy))}),mn=new Map;ai=Object.freeze({apiPresets:{render:t=>Ga(t),failMessage:"API \u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},toolManage:{render:t=>Ja(t),failMessage:"\u5DE5\u5177\u7BA1\u7406\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},regexExtract:{render:t=>Va(t),failMessage:"\u6B63\u5219\u63D0\u53D6\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},tableWorkbench:{render:t=>oi(t),failMessage:"\u586B\u8868\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25"},bypass:{render:t=>si(t),failMessage:"Ai\u6307\u4EE4\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},settings:{render:t=>ri(t),failMessage:"\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},logger:{render:t=>ni(t),failMessage:"\u65E5\u5FD7\u9762\u677F\u52A0\u8F7D\u5931\u8D25"}}),ii=Object.freeze({SummaryToolPanel:{render:t=>Xa(t),failMessage:"\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},StatusBlockPanel:{render:t=>Qa(t),failMessage:"\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25"},YouyouReviewPanel:{render:t=>Za(t),failMessage:"\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25"},EscapeTransformToolPanel:{render:t=>ei(t),failMessage:"\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},PunctuationTransformToolPanel:{render:t=>ti(t),failMessage:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"}});$m={uiManager:bt,registerComponents:Ya,initUI:my,renderApiPanel:Ga,renderRegexPanel:Va,renderToolPanel:Ja,renderSummaryToolPanel:Xa,renderStatusBlockPanel:Qa,renderYouyouReviewPanel:Za,renderEscapeTransformToolPanel:ei,renderPunctuationTransformToolPanel:ti,renderBypassPanel:si,renderSettingsPanel:ri,renderTableWorkbenchPanel:oi,renderLoggerPanel:ni,MAIN_TAB_RENDERERS:ai,SUB_TAB_RENDERERS:ii,renderMainTab:by,renderSubTabComponent:hy,getAllStyles:vy}});var Ty={};re(Ty,{WindowManager:()=>bn,closeWindow:()=>Nm,createWindow:()=>Dm,windowManager:()=>ot});function Lm(){if(ot.stylesInjected)return;ot.stylesInjected=!0;let t=`
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
  `,e=document.createElement("style");e.id=Om+"_styles",e.textContent=t,(document.head||document.documentElement).appendChild(e)}function Dm(t){let{id:e,title:s="\u7A97\u53E3",content:r="",width:o=900,height:n=700,modal:a=!1,resizable:i=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:d=!0,onClose:y,onReady:p}=t;Lm();let u=window.jQuery||window.parent?.jQuery;if(!u)return Pm.error("jQuery not available"),null;if(ot.isOpen(e))return ot.bringToFront(e),ot.getWindow(e);let f=window.innerWidth||1200,h=window.innerHeight||800,v=f<=1100,w=null,S=!1;d&&(w=ot.getState(e),w&&!v&&(S=!0));let _,W;S&&w.width&&w.height?(_=Math.max(400,Math.min(w.width,f-40)),W=Math.max(300,Math.min(w.height,h-40))):(_=Math.max(400,Math.min(o,f-40)),W=Math.max(300,Math.min(n,h-40)));let C=Math.max(20,Math.min((f-_)/2,f-_-20)),T=Math.max(20,Math.min((h-W)/2,h-W-20)),M=l&&!v,j=`
    <div class="yyt-window" id="${e}" style="left:${C}px; top:${T}px; width:${_}px; height:${W}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${Bm(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${M?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
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
  `,z=null;a&&(z=u(`<div class="yyt-window-overlay" data-for="${e}"></div>`),u(document.body).append(z));let $=u(j);u(document.body).append($),ot.register(e,$),$.on("mousedown",()=>ot.bringToFront(e));let q=!1,ee={left:C,top:T,width:_,height:W},F=()=>{ee={left:parseInt($.css("left")),top:parseInt($.css("top")),width:$.width(),height:$.height()},$.addClass("maximized"),$.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),q=!0},ne=()=>{$.removeClass("maximized"),$.css({left:ee.left+"px",top:ee.top+"px",width:ee.width+"px",height:ee.height+"px"}),$.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),q=!1};$.find(".yyt-window-btn.maximize").on("click",()=>{q?ne():F()}),(v&&l||S&&w.isMaximized&&l||c&&l)&&F(),$.find(".yyt-window-btn.close").on("click",()=>{if(d&&l){let me={width:q?ee.width:$.width(),height:q?ee.height:$.height(),isMaximized:q};ot.saveState(e,me)}y&&y(),z&&z.remove(),$.remove(),ot.unregister(e),u(document).off(".yytWindowDrag"+e),u(document).off(".yytWindowResize"+e)}),z&&z.on("click",me=>{me.target,z[0]});let ae=!1,te,Te,Pe,St;if($.find(".yyt-window-header").on("mousedown",me=>{u(me.target).closest(".yyt-window-controls").length||q||(ae=!0,te=me.clientX,Te=me.clientY,Pe=parseInt($.css("left")),St=parseInt($.css("top")),u(document.body).css("user-select","none"))}),u(document).on("mousemove.yytWindowDrag"+e,me=>{if(!ae)return;let be=me.clientX-te,Pt=me.clientY-Te;$.css({left:Math.max(0,Pe+be)+"px",top:Math.max(0,St+Pt)+"px"})}),u(document).on("mouseup.yytWindowDrag"+e,()=>{ae&&(ae=!1,u(document.body).css("user-select",""))}),i){let me=!1,be="",Pt,Tt,Ae,Ot,Me,lr;$.find(".yyt-window-resize-handle").on("mousedown",function(Yt){q||(me=!0,be="",u(this).hasClass("se")?be="se":u(this).hasClass("e")?be="e":u(this).hasClass("s")?be="s":u(this).hasClass("w")?be="w":u(this).hasClass("n")?be="n":u(this).hasClass("nw")?be="nw":u(this).hasClass("ne")?be="ne":u(this).hasClass("sw")&&(be="sw"),Pt=Yt.clientX,Tt=Yt.clientY,Ae=$.width(),Ot=$.height(),Me=parseInt($.css("left")),lr=parseInt($.css("top")),u(document.body).css("user-select","none"),Yt.stopPropagation())}),u(document).on("mousemove.yytWindowResize"+e,Yt=>{if(!me)return;let cr=Yt.clientX-Pt,Gt=Yt.clientY-Tt,Bs=400,dr=300,ys=Ae,Vt=Ot,us=Me,ro=lr;if(be.includes("e")&&(ys=Math.max(Bs,Ae+cr)),be.includes("s")&&(Vt=Math.max(dr,Ot+Gt)),be.includes("w")){let ps=Ae-cr;ps>=Bs&&(ys=ps,us=Me+cr)}if(be.includes("n")){let ps=Ot-Gt;ps>=dr&&(Vt=ps,ro=lr+Gt)}$.css({width:ys+"px",height:Vt+"px",left:us+"px",top:ro+"px"})}),u(document).on("mouseup.yytWindowResize"+e,()=>{me&&(me=!1,u(document.body).css("user-select",""))})}return $.on("remove",()=>{u(document).off(".yytWindowDrag"+e),u(document).off(".yytWindowResize"+e)}),p&&setTimeout(()=>p($),50),$}function Nm(t){let e=ot.getWindow(t);if(e){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${t}"]`).remove(),s(document).off(".yytWindowDrag"+t),s(document).off(".yytWindowResize"+t)),e.remove(),ot.unregister(t)}}function Bm(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var Pm,Om,Sy,bn,ot,_y=U(()=>{Ke();ce();Pm=N.createScope("WindowManager"),Om="youyou_toolkit_window_manager",Sy="window_states",bn=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,s){this.topZIndex++,this.windows.set(e,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let s=this.windows.get(e);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,s)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,s){let r=this.loadStates();r[e]={...s,updatedAt:Date.now()},yr.set(Sy,r)}loadStates(){return yr.get(Sy)||{}}getState(e){return this.loadStates()[e]||null}},ot=new bn});var Cy={};re(Cy,{TX_PHASE:()=>gt,ToolAutomationService:()=>vn,Transaction:()=>hn,default:()=>Km,toolAutomationService:()=>My});function ie(t){return t==null?"":String(t).trim()}function di(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Ay(){try{return di()?.SillyTavern||null}catch{return null}}function xn(t){try{return t?.getContext?.()||null}catch{return null}}function li(t,e){if(!t)return null;let s=typeof t?.on=="function"||typeof t?.addListener=="function",r=typeof t?.off=="function"||typeof t?.removeListener=="function";return!s||!r?null:{eventSource:t,source:e,capabilities:{on:typeof t?.on=="function",off:typeof t?.off=="function",addListener:typeof t?.addListener=="function",removeListener:typeof t?.removeListener=="function"}}}function zm(t){let e=di(),s=xn(t);return[li(t?.eventSource,"SillyTavern.eventSource"),li(e?.eventSource,"topWindow.eventSource"),li(s?.eventSource,"SillyTavern.getContext().eventSource")].filter(Boolean)[0]||{eventSource:null,source:"unavailable",capabilities:{on:!1,off:!1,addListener:!1,removeListener:!1}}}function Um(t){let e=xn(t);return t?.eventTypes||e?.eventTypes||di()?.event_types||{}}function Ey(t){let e=xn(t);return ie(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.chat_filename??t?.this_chid??"chat_default")||"chat_default"}function ky(t){let e=xn(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function Iy(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="user"||e==="system"?!1:e==="assistant"||e==="ai"||!e}function jm(t,e){let s=ie(e);if(!s)return null;let r=ky(t);for(let o=r.length-1;o>=0;o-=1){let n=r[o];if([n?.messageId,n?.message_id,n?.id,n?.mid,n?.mesid,n?.chat_index,o].map(i=>ie(i)).includes(s))return n||null}return null}function Wm(t){let e=ky(t);if(!Array.isArray(e)||e.length===0)return null;let s=e.length-1,r=e[s]||null;if(!Iy(r))return null;let o=ie(r?.messageId??r?.message_id??r?.id??r?.mid??r?.mesid??r?.chat_index??s);return o?{messageId:o,swipeId:ie(r?.swipeId??r?.swipe_id??r?.swipe??r?.swipeIndex),message:r}:null}function ci(t){if(!t)return"";let e=String(t).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function Fm(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${t}_${e}`}var ge,gt,hn,vn,My,Km,Ry=U(()=>{Lr();ke();ce();rs();Yo();_s();Ka();is();ge=N.createScope("ToolAutomation");gt=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),hn=class{constructor({chatId:e,messageId:s,swipeId:r,sourceEvent:o,generationKey:n}){this.traceId=Fm(),this.chatId=e||"",this.messageId=s||"",this.swipeId=r||"",this.sourceEvent=o||"",this.generationKey=n||"",this.phase=gt.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,s={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,s),this}toSnapshot(){return{...this}}},vn=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._recentlyProcessedSlots=new Map,this._ownWriteMessageIds=new Map,this._slotQueues=new Map,this._activeTransactions=new Map,this._isProcessing=!1,this._currentChatId="",this._enabled=!1,this._enabledCheckedOnce=!1,this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""},this._initRetryTimer=null,this._messageReceivedThrottleUntil=0}setDebugMode(e){this.debugMode=e===!0}init(e={}){this.stop();let s=Ay(),r=e.retryOnFailure!==!1,o=Number.isFinite(e.retryDelayMs)?e.retryDelayMs:1500,n=Number.isFinite(e.attempt)?e.attempt:1;if(this._hostBindingStatus.initAttempts=n,this._hostBindingStatus.lastInitAt=Date.now(),!s)return this._hostBindingStatus={...this._hostBindingStatus,initialized:!1,lastInitResult:"missing_api",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],lastError:"\u672A\u627E\u5230\u5BBF\u4E3B API (SillyTavern)",retryScheduled:!1,retryDelayMs:0},ge.error("\u521D\u59CB\u5316\u5931\u8D25: \u672A\u627E\u5230\u5BBF\u4E3B API (SillyTavern)"),!1;this._currentChatId=Ey(s);let a=zm(s),i=a?.eventSource||null,l=Um(s),c=typeof i?.on=="function"?i.on.bind(i):typeof i?.addListener=="function"?i.addListener.bind(i):null,d=typeof i?.off=="function"?i.off.bind(i):typeof i?.removeListener=="function"?i.removeListener.bind(i):null,y=!!(l&&Object.keys(l).length>0);if(this._hostBindingStatus={...this._hostBindingStatus,source:a?.source||"unavailable",hasEventSource:!!i,hasEventTypes:y,eventBindings:[],lastError:"",retryScheduled:!1,retryDelayMs:0,initialized:!1,lastInitResult:"binding"},!c||!d){let h="\u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5";return this._hostBindingStatus={...this._hostBindingStatus,lastInitResult:"missing_event_source",lastError:h},ge.error(`\u521D\u59CB\u5316\u5931\u8D25: ${h}`,{source:this._hostBindingStatus.source}),r&&this._scheduleInitRetry(o,n+1),!1}ge.debug("\u5BBF\u4E3B eventTypes \u6620\u5C04:",{eventTypes:l});let p=(h,v)=>{if(!h||typeof v!="function")return;let w=h;c(w,v),this._hostBindingStatus.eventBindings=[...this._hostBindingStatus.eventBindings,`${w} -> ${ci(w)}`],this._stopCallbacks.push(()=>{try{d(w,v)}catch(S){ge.warn("\u53D6\u6D88\u4E8B\u4EF6\u5931\u8D25",{event:w,error:S})}}),ge.debug(`\u5DF2\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${w}" (\u5F52\u4E00\u5316: ${ci(w)})`)},u=(h,...v)=>{let w=ci(h),{messageId:S,swipeId:_}=this._extractIdentitiesFromArgs(v);if(ge.debug(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${h}" \u2192 "${w}"`,{messageId:S,swipeId:_,argCount:v.length}),!this._checkEnabled())return;if(w==="MESSAGE_RECEIVED"){let z=Date.now();if(z<this._messageReceivedThrottleUntil){ge.debug(`MESSAGE_RECEIVED \u5728\u8282\u6D41\u7A97\u53E3\u5185\uFF0C\u8DF3\u8FC7\uFF08\u5269\u4F59 ${this._messageReceivedThrottleUntil-z}ms\uFF09`);return}this._messageReceivedThrottleUntil=z+this._getSettleMs()+5e3}let W=null,C=S,T=_;if(C&&(W=jm(s,C)),!W){let z=Wm(s);z?.messageId&&(W=z.message,C=z.messageId,T=z.swipeId||T)}if(!C||!W){ge.debug(`\u4E8B\u4EF6 "${w}" \u65E0 assistant \u76EE\u6807\uFF0C\u8DF3\u8FC7`);return}if(!Iy(W)){ge.debug(`\u4E8B\u4EF6 "${w}" \u547D\u4E2D\u975E assistant \u6D88\u606F\uFF0C\u8DF3\u8FC7`,{messageId:C});return}let M=String(W.content||W.mes||"").trim();if(!M||M.length<5){ge.debug(`\u4E8B\u4EF6 "${w}" \u6D88\u606F\u8FC7\u77ED\uFF08${M.length} \u5B57\u7B26\uFF09\uFF0C\u8DF3\u8FC7`);return}if(this._isProcessing){ge.debug(`\u4E8B\u4EF6 "${w}" \u6B63\u5728\u5904\u7406\u4E2D\uFF0C\u8DF3\u8FC7`);return}if(this._isOwnWrite(C)){ge.debug(`\u4E8B\u4EF6 "${w}" \u547D\u4E2D own-write \u9ED1\u540D\u5355\uFF0C\u8DF3\u8FC7`,{messageId:C});return}let j=`${C}::${T}`;if(this._isRecentlyProcessed(j)){ge.debug(`\u4E8B\u4EF6 "${w}" slot \u5DF2\u8FD1\u671F\u5904\u7406\u8FC7\uFF0C\u8DF3\u8FC7`,{slotKey:j});return}this._scheduleMessageProcessing(C,T,{settleMs:this._getSettleMs(),sourceEvent:w}),ge.info(`\u4E8B\u4EF6 "${w}" \u901A\u8FC7\u6240\u6709\u5B88\u536B\uFF0C\u5DF2\u8C03\u5EA6\u5904\u7406`,{targetMessageId:C,targetSwipeId:T,throttleUntil:this._messageReceivedThrottleUntil,isProcessing:this._isProcessing})};p(l.MESSAGE_SENT||"message_sent",()=>{ge.debug("MESSAGE_SENT \u2192 \u6E05\u7406\u8C03\u5EA6\u961F\u5217"),this._pendingTimers.forEach(h=>clearTimeout(h)),this._pendingTimers.clear()}),p(l.MESSAGE_RECEIVED||"message_received",(...h)=>{u(l.MESSAGE_RECEIVED||"message_received",...h)});let f=l.GENERATION_STOPPED||l.generation_stopped||"generation_stopped";return p(f,()=>{ge.info("GENERATION_STOPPED \u2192 \u53D6\u6D88\u6240\u6709\u6D3B\u8DC3\u4E8B\u52A1"),this._cancelActiveTransactions("generation_stopped"),this._pendingTimers.forEach(h=>clearTimeout(h)),this._pendingTimers.clear(),this._isProcessing=!1}),p(l.CHAT_CHANGED||"chat_changed",()=>{this._resetForChatChange()}),p(l.MESSAGE_DELETED||"message_deleted",h=>{this._clearMessageState(ie(h))}),this._stopCallbacks.push(L.on(P.SETTINGS_UPDATED,()=>{let h=this._enabled;this._enabled=this._evaluateEnabled(),h!==this._enabled&&ge.info(`\u81EA\u52A8\u5316\u72B6\u6001\u53D8\u66F4: ${h} \u2192 ${this._enabled}`)})),this._enabled=this._evaluateEnabled(),this._enabledCheckedOnce=!1,this._hostBindingStatus={...this._hostBindingStatus,initialized:!0,lastInitResult:"ready",retryScheduled:!1,retryDelayMs:0,lastError:""},ge.info("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{enabled:this._enabled,chatId:this._currentChatId,source:this._hostBindingStatus.source}),!0}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(s){ge.warn("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",{error:s})}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("service_stopped"),this._activeTransactions.clear(),this._isProcessing=!1,this._enabled=!1,this._enabledCheckedOnce=!1,this._initRetryTimer&&(clearTimeout(this._initRetryTimer),this._initRetryTimer=null),this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""}}isEnabled(){return this._enabled}getRuntimeSnapshot(){return this._pruneRecentSlots(),this._pruneOwnWrites(),{currentChatId:this._currentChatId,enabled:this._enabled,isProcessing:this._isProcessing,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,recentlyProcessedSlotCount:this._recentlyProcessedSlots.size,ownWriteMessageIdCount:this._ownWriteMessageIds.size,activeTransactionCount:this._activeTransactions.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),hostBinding:{...this._hostBindingStatus,eventBindings:Array.isArray(this._hostBindingStatus?.eventBindings)?[...this._hostBindingStatus.eventBindings]:[]},settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let s=await Ts({messageId:"",swipeId:"",runSource:"AUTO"}),r=ie(s?.sourceMessageId||s?.messageId);return r?this.processAssistantMessage(r,{force:e.force===!0,swipeId:ie(s?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:s=!1,swipeId:r="",sourceEvent:o="AUTO"}={}){let n=new hn({chatId:this._currentChatId,messageId:e,swipeId:r,sourceEvent:o});try{if(!e)return this._skipTransaction(n,"missing_message_id");if(!this._checkEnabled()&&!s)return this._skipTransaction(n,"automation_disabled");n.transition(gt.CONFIRMED);let a=await Ts({messageId:e,swipeId:r,runSource:"AUTO"}),i=a?.targetAssistantMessage||null;if(!i||!a?.sourceMessageId)return this._skipTransaction(n,"assistant_message_not_found");let l=String(i.content||i.mes||"").trim();if(!l||l.length<5)return this._skipTransaction(n,"assistant_message_too_short");n.transition(gt.CONTEXT_BUILT);let c=`${ie(a.sourceMessageId)}::${ie(a.sourceSwipeId||r)}`;if(n.generationKey=c,!s&&this._isRecentlyProcessed(c))return this._skipTransaction(n,"duplicate_slot",{slotKey:c});let d=Ct.filterAutoPostResponseTools(Mr()),y=$e(),p=y?.autoUpdateEnabled===!0&&ie(y?.autoUpdateTrigger||"assistantMessage")==="assistantMessage";return!d.length&&!p?this._skipTransaction(n,"no_auto_tools",{tools:d}):(n.slotKey=c,n.slotRevisionKey=a.slotRevisionKey||"",n.sourceMessageId=a.sourceMessageId||e,n.sourceSwipeId=a.sourceSwipeId||r||"",this._enqueueSlot(c,async()=>{if(!s&&this._isRecentlyProcessed(c))return this._skipTransaction(n,"duplicate_slot_after_queue",{slotKey:c});this._isProcessing=!0,this._markSlotProcessed(c),n.transition(gt.REQUEST_STARTED);let u=new AbortController;this._registerActiveTransaction(n,{controller:u,slotKey:c,sourceMessageId:a.sourceMessageId||e,sourceSwipeId:a.sourceSwipeId||r||""});try{let f=[],h=!1,v=null;for(let T of d){let M={...a,signal:u.signal,isAutoRun:!0,abortMeta:{traceId:n.traceId,slotKey:c,sourceMessageId:a.sourceMessageId||e,sourceSwipeId:a.sourceSwipeId||r||""},shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:n.traceId}),skipNotify:!0,input:{...a.input||{},lastAiMessage:a.lastAiMessage,assistantBaseText:a.assistantBaseText}},j=await Ct.runToolPostResponse(T,M);f.push(j),(j?.writebackState||j?.output)&&(h=!0,this._markOwnWrite(a.sourceMessageId||e))}p&&(v=await ey({messageId:a.sourceMessageId||e,swipeId:a.sourceSwipeId||r||"",sourceEvent:o,configInput:y,signal:u.signal,shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:n.traceId})}),(v?.state||v?.mirrorResult?.success===!0)&&(h=!0,this._markOwnWrite(a.sourceMessageId||e))),n.transition(gt.REQUEST_FINISHED,{toolResults:f,tableResult:v}),h&&(n.transition(gt.WRITEBACK_STARTED),n.writebackState={messageId:a.sourceMessageId,swipeId:a.sourceSwipeId,hasOutput:!0},this._messageReceivedThrottleUntil=Date.now()+15e3),this._markSlotProcessed(c);let w=f.every(T=>T?.success!==!1),S=!p||!!v?.success||v?.skipped===!0||v?.meta?.aborted===!0||v?.meta?.stale===!0,_=w&&S,W=f.some(T=>T?.meta?.aborted===!0||T?.meta?.stale===!0||T?.error==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")||v?.meta?.aborted===!0||v?.meta?.stale===!0;_&&n.transition(gt.WRITEBACK_COMMITTED);let C=_?gt.REFRESH_CONFIRMED:gt.FAILED;return n.transition(C,{verdict:W?"aborted":_?"success":"partial_failure"}),this._recordTransaction(n),this._updateAutoRuntimeForResults(d,a,n,f),{success:_,traceId:n.traceId,slotKey:c,sourceEvent:o,messageId:a.sourceMessageId||e,phase:n.phase,results:f,tableResult:v}}finally{this._unregisterActiveTransaction(n.traceId),this._isProcessing=!1}}))}catch(a){return n.transition(gt.FAILED,{error:a?.message||String(a)}),this._recordTransaction(n),this._unregisterActiveTransaction(n.traceId),this._isProcessing=!1,ge.error("processAssistantMessage \u5F02\u5E38",{error:a}),{success:!1,traceId:n.traceId,error:n.error,phase:n.phase}}}_extractIdentitiesFromArgs(e){let s="",r="";for(let o of e)if(o!=null){if(typeof o=="number"&&Number.isFinite(o)&&!s){s=ie(o);continue}if(typeof o=="string"){let n=ie(o);!s&&/^\d+$/.test(n)&&(s=n);continue}typeof o=="object"&&(s||(s=ie(o.messageId??o.message_id??o.id??o.mid??o.mesid??o.chat_index??o.message?.messageId??o.message?.message_id??o.message?.id??o.message?.mid??o.message?.mesid??o.message?.chat_index??o.data?.messageId??o.data?.message_id??o.data?.id??o.data?.mid??o.data?.mesid??o.data?.chat_index??o.target?.messageId??o.target?.message_id??o.target?.id??o.target?.mid??o.target?.mesid??o.target?.chat_index)),r||(r=ie(o.swipeId??o.swipe_id??o.swipe??o.swipeIndex??o.currentSwipe??o.message?.swipeId??o.message?.swipe_id??o.message?.swipe??o.data?.swipeId??o.data?.swipe_id??o.data?.swipe??o.target?.swipeId??o.target?.swipe_id??o.target?.swipe)))}return{messageId:s,swipeId:r}}_scheduleMessageProcessing(e,s="",r={}){let o=r.settleMs??this._getSettleMs(),n=`msg::${ie(e)}::${ie(s)}`,a=this._pendingTimers.get(n);a&&clearTimeout(a);let i=setTimeout(()=>{this._pendingTimers.delete(n),this.processAssistantMessage(e,{swipeId:s,sourceEvent:r.sourceEvent||"AUTO"}).catch(l=>{ge.error("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:l})})},Math.max(0,o));this._pendingTimers.set(n,i),ge.info("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:n,settleMs:o,sourceEvent:r.sourceEvent})}cancelAutomation(e={}){let s=e.reason||"manual_cancel",r=ie(e.messageId),o=ie(e.slotKey),n=ie(e.traceId),a=0;for(let[i,l]of this._pendingTimers){let c=r&&i.includes(`::${r}::`),d=o&&i.includes(o);(c||d||!r&&!o&&!n)&&(clearTimeout(l),this._pendingTimers.delete(i),a+=1)}return a+=this._cancelActiveTransactions(s,{messageId:r,slotKey:o,traceId:n}),{success:a>0,cancelledCount:a,reason:s}}_isRecentlyProcessed(e){if(!e)return!1;this._pruneRecentSlots();let s=this._recentlyProcessedSlots.get(e);return s?Date.now()-s<this._getDedupeWindowMs():!1}_markSlotProcessed(e){e&&(this._recentlyProcessedSlots.set(e,Date.now()),this._pruneRecentSlots())}_pruneRecentSlots(){let e=Date.now()-this._getDedupeWindowMs();for(let[s,r]of this._recentlyProcessedSlots)(!Number.isFinite(r)||r<e)&&this._recentlyProcessedSlots.delete(s)}_markOwnWrite(e){let s=ie(e);s&&(this._ownWriteMessageIds.set(s,Date.now()),this._pruneOwnWrites())}_isOwnWrite(e){let s=ie(e);if(!s)return!1;this._pruneOwnWrites();let r=this._ownWriteMessageIds.get(s);return r?Date.now()-r<1e4:!1}_pruneOwnWrites(){let e=Date.now()-1e4;for(let[s,r]of this._ownWriteMessageIds)(!Number.isFinite(r)||r<e)&&this._ownWriteMessageIds.delete(s)}_pruneCancelledKeys(){}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),ge.debug(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,s,r={}){return e.transition(gt.SKIPPED,{verdict:s,...r}),this._recordTransaction(e),Array.isArray(r?.tools)&&r.tools.length>0&&this._updateAutoRuntimeForSkip(r.tools,e,s,r),{success:!1,skipped:!0,reason:s,traceId:e.traceId,...r}}_enqueueSlot(e,s){let o=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(s).finally(()=>{this._slotQueues.get(e)===o&&this._slotQueues.delete(e)});return this._slotQueues.set(e,o),o}_registerActiveTransaction(e,s={}){e?.traceId&&this._activeTransactions.set(e.traceId,{traceId:e.traceId,generationKey:s.generationKey||e.generationKey||"",slotKey:s.slotKey||e.slotKey||"",sourceMessageId:s.sourceMessageId||e.sourceMessageId||"",sourceSwipeId:s.sourceSwipeId||e.sourceSwipeId||"",slotRevisionKey:s.slotRevisionKey||e.slotRevisionKey||"",assistantBaseFingerprint:s.assistantBaseFingerprint||"",assistantBaseText:s.assistantBaseText||"",controller:s.controller||null,cancelled:!1,cancelReason:""})}_unregisterActiveTransaction(e){e&&this._activeTransactions.delete(e)}_cancelActiveTransactions(e="manual_cancel",s={}){let r=ie(s.messageId),o=ie(s.slotKey),n=ie(s.traceId),a=0;for(let[i,l]of this._activeTransactions){let c=n&&i===n,d=r&&ie(l?.sourceMessageId)===r,y=o&&ie(l?.slotKey)===o;if(!(!c&&!d&&!y&&!(!n&&!r&&!o))){l.cancelled=!0,l.cancelReason=e;try{l?.controller?.abort?.()}catch{}a+=1}}return a}_shouldAbortAutoWriteback(e={}){let s=ie(e.traceId);if(s){let r=this._activeTransactions.get(s);if(!r||r.cancelled)return{aborted:!0,reason:"cancelled_before_host_commit"}}return!1}_updateAutoRuntimeForSkip(e,s,r,o={}){e.forEach(n=>{n?.id&&ss(n.id,{lastAutoRunAt:Date.now(),lastAutoStatus:"skipped",lastAutoMessageId:s?.sourceMessageId||s?.messageId||"",lastAutoSwipeId:s?.sourceSwipeId||s?.swipeId||"",lastAutoRevisionKey:s?.slotRevisionKey||o?.slotRevisionKey||"",lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:!1,lastAutoSkipReason:r||""},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_updateAutoRuntimeForResults(e,s,r,o=[]){e.forEach((n,a)=>{if(!n?.id)return;let i=o[a]||{},l=i?.meta?.writebackDetails||{},c=i?.meta?.aborted===!0||i?.meta?.stale===!0?"aborted":i?.success===!1?"failed":"success",d=i?.meta?.aborted===!0?i?.meta?.abortReason||(i?.meta?.stale===!0?"stale_base_changed":"cancelled_before_host_commit"):"";ss(n.id,{lastAutoRunAt:Date.now(),lastAutoStatus:c,lastAutoMessageId:s?.sourceMessageId||r?.sourceMessageId||r?.messageId||"",lastAutoSwipeId:s?.sourceSwipeId||r?.sourceSwipeId||r?.swipeId||"",lastAutoRevisionKey:s?.slotRevisionKey||r?.slotRevisionKey||"",lastAutoWritebackStatus:i?.meta?.writebackStatus||"",lastAutoRefreshConfirmed:!!l.refreshConfirmed,lastAutoSkipReason:d},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_resetForChatChange(){let e=Ay(),s=Ey(e);ge.info("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:s}),this._currentChatId=s,this._pendingTimers.forEach(r=>clearTimeout(r)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("chat_changed"),this._activeTransactions.clear(),this._isProcessing=!1,this._messageReceivedThrottleUntil=0}_scheduleInitRetry(e,s){this._initRetryTimer&&clearTimeout(this._initRetryTimer),this._hostBindingStatus={...this._hostBindingStatus,retryScheduled:!0,retryDelayMs:e},this._initRetryTimer=setTimeout(()=>{this._initRetryTimer=null,this.init({retryOnFailure:!1,retryDelayMs:e,attempt:s})},Math.max(200,e))}_clearMessageState(e){if(e){for(let[s,r]of this._pendingTimers)(s.includes(`::${e}::`)||s.startsWith(`msg::${e}::`))&&(clearTimeout(r),this._pendingTimers.delete(s));for(let s of this._recentlyProcessedSlots.keys())s.startsWith(`${e}::`)&&this._recentlyProcessedSlots.delete(s);this._ownWriteMessageIds.delete(ie(e))}}_evaluateEnabled(){return this._getAutomationSettings().enabled===!0}_checkEnabled(){if(this._enabled)return!0;if(!this._enabledCheckedOnce){this._enabledCheckedOnce=!0;let e=this._getAutomationSettings();ge.warn("\u81EA\u52A8\u5316\u672A\u542F\u7528\uFF0C\u9996\u6B21\u8BCA\u65AD:",{"automation.enabled":e.enabled,"\u5B8C\u6574 automation \u8BBE\u7F6E":e,\u63D0\u793A:"\u8BF7\u786E\u4FDD settings.automation.enabled === true"})}return!1}_getAutomationSettings(){let e=dt.getSettings()?.automation||{},s=Number.isFinite(e.settleMs)?e.settleMs:800;return{enabled:e.enabled===!0,settleMs:s,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(5e3,s+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}},My=new vn,Km=My});ce();function $y(t,e={}){let{constants:s,topLevelWindow:r,modules:o}=t,{SCRIPT_ID:n,SCRIPT_VERSION:a,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=s,c=null,d=!1,y=N.createScope("Bootstrap");function p(...C){y.log(C.join(" "))}function u(...C){y.error(C.join(" "))}async function f(){return c||(c=(async()=>{try{return o.storageModule=await Promise.resolve().then(()=>(xi(),vi)),o.apiConnectionModule=await Promise.resolve().then(()=>(mr(),Ai)),o.presetManagerModule=await Promise.resolve().then(()=>(vr(),Mi)),o.uiModule=await Promise.resolve().then(()=>(wy(),xy)),o.regexExtractorModule=await Promise.resolve().then(()=>(_r(),sl)),o.toolManagerModule=await Promise.resolve().then(()=>(Po(),pl)),o.toolExecutorModule=await Promise.resolve().then(()=>(ua(),ya)),o.windowManagerModule=await Promise.resolve().then(()=>(_y(),Ty)),o.toolRegistryModule=await Promise.resolve().then(()=>(rs(),$l)),o.settingsServiceModule=await Promise.resolve().then(()=>(Lr(),Yl)),o.bypassManagerModule=await Promise.resolve().then(()=>(Xs(),ql)),o.variableResolverModule=await Promise.resolve().then(()=>(Dr(),Xl)),o.contextInjectorModule=await Promise.resolve().then(()=>(ks(),Vl)),o.toolPromptServiceModule=await Promise.resolve().then(()=>(Ho(),Zl)),o.toolOutputServiceModule=await Promise.resolve().then(()=>(Yo(),tc)),o.toolAutomationServiceModule=await Promise.resolve().then(()=>(Ry(),Cy)),o.toolOutputServiceModule?.toolOutputService&&o.apiConnectionModule&&o.toolOutputServiceModule.toolOutputService.setApiConnection(o.apiConnectionModule),!0}catch(C){return c=null,u("\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:",C),u("\u5DF2\u52A0\u8F7D\u6A21\u5757:",Object.keys(o).filter(T=>o[T])),!1}})(),c)}function h(){return`
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
    `}async function v(){let C=`${n}-styles`,T=r.document||document;if(T.getElementById(C))return;let M="",j=[];try{j.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{j.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}j.push("./styles/main.css");for(let $ of[...new Set(j.filter(Boolean))])try{let q=await fetch($);if(q.ok){M=await q.text();break}}catch{}M||(p("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),M=h());let z=T.createElement("style");z.id=C,z.textContent=M,(T.head||T.documentElement).appendChild(z),p("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function w(){let C=r.document||document;if(o.uiModule?.getAllStyles){let T=`${n}-ui-styles`;if(!C.getElementById(T)){let M=C.createElement("style");M.id=T,M.textContent=o.uiModule.getAllStyles(),(C.head||C.documentElement).appendChild(M)}}}async function S(){try{let{applyUiPreferences:C}=await Promise.resolve().then(()=>(ha(),ba));if(o.settingsServiceModule?.settingsService){let T=o.settingsServiceModule.settingsService.getUiSettings();if(T&&T.theme){let M=r.document||document;C(T,M),p(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${T.theme}`)}}}catch(C){p("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",C)}}function _(){let C=r.jQuery||window.jQuery;if(!C){u("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(_,1e3);return}let T=r.document||document,M=C("#extensionsMenu",T);if(!M.length){p("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(_,2e3);return}if(C(`#${l}`,M).length>0){p("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let z=C(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),$=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,q=C($);q.on("click",function(F){F.stopPropagation(),p("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let ne=C("#extensionsMenuButton",T);ne.length&&M.is(":visible")&&ne.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),z.append(q),M.append(z),p("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function W(){p(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await v();let C=await f();if(p(C?"\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F":"\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u53EF\u7528\u529F\u80FD"),!d&&o.uiModule?.initUI)try{await o.uiModule.initUI({services:o,autoInjectStyles:!1,targetDocument:r.document||document}),d=!0,p("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(M){u("UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:",M)}if(o.uiModule&&(w(),await S()),o.toolAutomationServiceModule?.toolAutomationService){let M=o.toolAutomationServiceModule.toolAutomationService.init();p(M?"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316":"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u521D\u59CB\u5316\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u5BBF\u4E3B\u4E8B\u4EF6\u6E90\u91CD\u8BD5")}let T=r.document||document;T.readyState==="loading"?T.addEventListener("DOMContentLoaded",()=>{setTimeout(_,1e3)}):setTimeout(_,1e3),p("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:f,injectStyles:v,addMenuItem:_,init:W,log:p,logError:u}}ke();Ce();Ce();ce();var ir=N.createScope("PromptEditor"),Hm="youyou_toolkit_prompt_editor",qm={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},Ym={system:"fa-server",ai:"fa-robot",user:"fa-user"},to=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],wn=class{constructor(e={}){this.containerId=e.containerId||Hm,this.segments=e.segments||[...to],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){ir.error("jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...to],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let s=qm[e.type]||e.type,r=Ym[e.type]||"fa-file",o=e.mainSlot==="A"||e.isMain,n=e.mainSlot==="B"||e.isMain2,a=o?"var(--yyt-accent, #7bb7ff)":n?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${o?"yyt-main-a":""} ${n?"yyt-main-b":""}" 
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
    `}bindEvents(){this.$container&&(Ie(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"),this.$container.on("click.yytPromptEditor",".yyt-prompt-toggle",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.on("click.yytPromptEditor",".yyt-prompt-delete",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.on("change.yytPromptEditor",".yyt-prompt-role",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),r=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{role:r})}),this.$container.on("change.yytPromptEditor",".yyt-prompt-main-slot",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),r=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:r})}),this.$container.on("input.yytPromptEditor",".yyt-prompt-textarea",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-add-segment`,()=>{this.addSegment()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-import-prompt`,()=>{this.importPrompt()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-export-prompt`,()=>{this.exportPrompt()}),Ne(this.$container,{namespace:"yytPromptEditorSelect",selectors:[".yyt-prompt-role",".yyt-prompt-main-slot"]}))}addSegment(e=null){let s=`segment_${Date.now()}`,r=e||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};r.id||(r.id=s),this.segments.push(r),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let s=this.segments.findIndex(o=>o.id===e);if(s===-1)return;if(this.segments[s].deletable===!1){ir.warn("\u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,s){let r=this.segments.find(o=>o.id===e);r&&(Object.assign(r,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=s=>{let r=s.target.files[0];if(!r)return;let o=new FileReader;o.onload=n=>{try{let a=JSON.parse(n.target.result);Array.isArray(a)?(this.setSegments(a),ir.log("\u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):ir.error("\u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){ir.error("\u5BFC\u5165\u5931\u8D25:",a)}},o.readAsText(r)},e.click()}exportPrompt(){let e=this.getSegments(),s=JSON.stringify(e,null,2),r=new Blob([s],{type:"application/json"}),o=URL.createObjectURL(r),n=document.createElement("a");n.href=o,n.download=`prompt_group_${Date.now()}.json`,n.click(),URL.revokeObjectURL(o),ir.log("\u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}destroy(){this.$container&&(Ie(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"))}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};function Py(){return`
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
  `}function Oy(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function Ly(t){return Array.isArray(t)?t.map((e,s)=>({id:`segment_${s}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...to]}ce();function Dy(t){let{constants:e,topLevelWindow:s,modules:r,caches:o,uiState:n}=t,{SCRIPT_ID:a,SCRIPT_VERSION:i,POPUP_ID:l}=e,c=N.createScope("PopupShell"),d={cleanup:null},y={cleanups:[]},p={cleanups:[]},u={current:null};function f(){return!!n.sidebarCollapsed}function h(){n.sidebarCollapsed=!n.sidebarCollapsed;let g=n.currentPopup;if(!g)return;let x=g.querySelector(".yyt-shell-sidebar"),A=g.querySelector(".yyt-shell-workspace"),I=g.querySelector(".yyt-sidebar-toggle i");x&&x.classList.toggle("yyt-collapsed",n.sidebarCollapsed),A&&A.classList.toggle("yyt-sidebar-collapsed",n.sidebarCollapsed),I&&(I.className=n.sidebarCollapsed?"fa-solid fa-angles-right":"fa-solid fa-angles-left"),Me()}function v(...g){c.log(g.join(" "))}function w(...g){c.error(g.join(" "))}function S(g){return typeof g!="string"?"":g.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function _(){return s.jQuery||window.jQuery}function W(){return s.document||document}function C(g){if(!g)return"\u672A\u9009\u62E9\u9875\u9762";let x=r.toolRegistryModule?.getToolConfig(g);if(!x)return g;if(!x.hasSubTabs)return x.name||g;let A=M(g),I=x.subTabs?.find(D=>D.id===A);return I?.name?`${x.name} / ${I.name}`:x.name||g}function T(g){if(!g)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let x=r.toolRegistryModule?.getToolConfig(g);if(!x)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!x.hasSubTabs)return x.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let A=M(g);return x.subTabs?.find(D=>D.id===A)?.description||x.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function M(g,x=""){let A=r.toolRegistryModule?.getToolConfig(g);if(!A?.hasSubTabs||!Array.isArray(A.subTabs)||A.subTabs.length===0)return"";let I=String(x||n.currentSubTab[g]||"").trim(),B=I&&A.subTabs.some(V=>V?.id===I)?I:A.subTabs[0]?.id||"";return B&&n.currentSubTab[g]!==B&&(n.currentSubTab[g]=B),B}function j(){let g=n.currentPopup;if(!g)return;let x=C(n.currentMainTab),A=T(n.currentMainTab),I=g.querySelector(".yyt-popup-active-label");I&&(I.textContent=`\u5F53\u524D\uFF1A${x}`);let D=g.querySelector(".yyt-shell-breadcrumb");D&&(D.textContent=x);let B=g.querySelector(".yyt-shell-main-title");B&&(B.textContent=x);let V=g.querySelector(".yyt-shell-main-description");V&&(V.textContent=A)}function z(){typeof d.cleanup=="function"&&(d.cleanup(),d.cleanup=null)}function $(){Array.isArray(y.cleanups)&&(y.cleanups.forEach(g=>{typeof g=="function"&&g()}),y.cleanups=[])}function q(){Array.isArray(p.cleanups)&&(p.cleanups.forEach(g=>{typeof g=="function"&&g()}),p.cleanups=[])}function ee(g,x){if(!g||!x)return!1;let A=g.jquery?g[0]:g,I=x.jquery?x[0]:x;return!!(A&&I&&A===I)}function F(g={}){let{container:x=null}=g,A=u.current;if(A&&!(x&&!ee(A.container,x))){try{typeof A.destroy=="function"&&A.destroy(A.container)}catch(I){w("\u9500\u6BC1\u52A8\u6001\u9762\u677F host \u5931\u8D25",I)}r.uiModule?.uiManager?.destroyContainerInstance&&r.uiModule.uiManager.destroyContainerInstance(A.container),u.current=null}}function ne(g,x={}){u.current={key:x.key||"",container:g,destroy:typeof x.destroy=="function"?x.destroy:null}}function ae(){let g=_();if(!g||!n.currentPopup)return;let x=r.toolRegistryModule?.getToolList()||[],A=g(n.currentPopup).find(".yyt-main-nav");if(!A.length)return;let I=x.map(B=>`
      <div class="yyt-main-nav-item ${B.id===n.currentMainTab?"active":""}" data-tab="${B.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${S(B.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${S(B.name||B.id)}</span>
          <span class="yyt-main-nav-desc">${S(B.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");A.html(I),g(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let V=g(this).data("tab");V&&Bs(V)});let D=g(n.currentPopup).find(".yyt-shell-sidebar-hint");D.length&&D.text(`${x.length} tabs`)}function te(){let g=_();if(!g||!n.currentPopup)return;let x=r.toolRegistryModule?.getToolList()||[],A=r.toolRegistryModule?.getToolConfig("tools"),I=Array.isArray(A?.subTabs)?A.subTabs:[],D=I.filter(J=>J?.isCustom).length,B=I.filter(J=>!J?.isCustom).length,Z=g(n.currentPopup).find(".yyt-shell-sidebar-stats");Z.length&&(Z.find(".yyt-shell-sidebar-stat").eq(0).find(".yyt-shell-sidebar-stat-value").text(String(x.length)),Z.find(".yyt-shell-sidebar-stat").eq(1).find(".yyt-shell-sidebar-stat-value").text(String(B)),Z.find(".yyt-shell-sidebar-stat").eq(2).find(".yyt-shell-sidebar-stat-value").text(String(D)))}function Te(){let g=r.toolRegistryModule?.getToolList()||[];return g.length?(g.some(x=>x.id===n.currentMainTab)||(n.currentMainTab=g[0].id),n.currentMainTab):null}async function Pe(g={}){let{rebuildNavigation:x=!1,reRenderSubNav:A=!1}=g,I=_();if(!I||!n.currentPopup)return;F();let D=Te();if(!D)return;x&&(ae(),te());let B=r.toolRegistryModule?.getToolConfig(D),V=!!B?.hasSubTabs,Z=I(n.currentPopup).find(".yyt-sub-nav"),J=I(n.currentPopup).find(".yyt-content-inner");if(x&&J.length){let le=new Set(J.find(".yyt-tab-content").map((Ee,Fe)=>I(Fe).data("tab")).get());(r.toolRegistryModule?.getToolList()||[]).forEach(Ee=>{le.has(Ee.id)||J.append(`<div class="yyt-tab-content" data-tab="${S(Ee.id)}"></div>`)}),J.find(".yyt-tab-content").each((Ee,Fe)=>{let _t=I(Fe).data("tab");(r.toolRegistryModule?.getToolList()||[]).some(At=>At.id===_t)||I(Fe).remove()})}I(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),I(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${D}"]`).addClass("active"),I(n.currentPopup).find(".yyt-tab-content").removeClass("active"),I(n.currentPopup).find(`.yyt-tab-content[data-tab="${D}"]`).addClass("active"),V?(Z.show(),(A||x)&&ys(D,B.subTabs)):Z.hide(),await Vt(D),j(),Me()}function St(){if(!n.currentPopup)return;$();let g=()=>{if(n.currentMainTab==="apiPresets"){Pe();return}n.currentMainTab==="tools"&&Pe({reRenderSubNav:!0})},x=()=>{n.currentMainTab==="tools"?Pe({rebuildNavigation:!0,reRenderSubNav:!0}):te()},A=()=>{n.currentMainTab==="tools"&&Pe({rebuildNavigation:!1,reRenderSubNav:!1})},I=()=>{(n.currentMainTab==="bypass"||n.currentMainTab==="tools")&&Pe({reRenderSubNav:n.currentMainTab==="tools"})};[P.PRESET_CREATED,P.PRESET_UPDATED,P.PRESET_DELETED].forEach(D=>{y.cleanups.push(L.on(D,g))}),[P.TOOL_REGISTERED,P.TOOL_UPDATED,P.TOOL_UNREGISTERED].forEach(D=>{y.cleanups.push(L.on(D,x))}),y.cleanups.push(L.on(P.TOOL_RUNTIME_UPDATED,A)),[P.BYPASS_PRESET_CREATED,P.BYPASS_PRESET_UPDATED,P.BYPASS_PRESET_DELETED].forEach(D=>{y.cleanups.push(L.on(D,I))})}function me(g){return!!g?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown",".yyt-select-portal-layer"].join(","))}function be(g){let x=g?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return x?x.scrollHeight>x.clientHeight+2||x.scrollWidth>x.clientWidth+2:!1}function Pt(g,x){return x?.closest?.(".yyt-scrollable-surface")===g}function Tt(g,x){if(!g||!x)return null;let A=x.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return A&&(A.classList?.contains("yyt-select-portal-layer")||g.contains(A))&&(A.scrollHeight>A.clientHeight+2||A.scrollWidth>A.clientWidth+2)?A:[x.closest?.(".yyt-tool-list"),x.closest?.(".yyt-settings-content"),x.closest?.(".yyt-sub-content"),x.closest?.(".yyt-tab-content.active"),g].filter(Boolean).find(D=>D!==g&&!g.contains(D)?!1:D.scrollHeight>D.clientHeight+2||D.scrollWidth>D.clientWidth+2)||g}function Ae({mainTab:g=null,includeSubContent:x=!1}={}){let A=n.currentPopup;if(!A)return;let I=A.querySelector(".yyt-content");I&&(I.scrollTop=0,I.scrollLeft=0);let D=g?`.yyt-tab-content[data-tab="${g}"]`:".yyt-tab-content.active",B=A.querySelector(D);if(B&&(B.scrollTop=0,B.scrollLeft=0),!x)return;(B?.querySelectorAll(".yyt-sub-content")||[]).forEach(Z=>{Z.scrollTop=0,Z.scrollLeft=0})}function Ot(g){let x=W();if(!g||!x)return;g.classList.add("yyt-scrollable-surface");let A=!1,I=!1,D=0,B=0,V=0,Z=0,J=!1,le=!1,Ee=()=>{A=!1,I=!1,g.classList.remove("yyt-scroll-dragging")},Fe=Y=>{Y.button===0&&(me(Y.target)||Pt(g,Y.target)&&(J=g.scrollWidth>g.clientWidth+2,le=g.scrollHeight>g.clientHeight+2,!(!J&&!le)&&(Y.stopPropagation(),A=!0,I=!1,D=Y.clientX,B=Y.clientY,V=g.scrollLeft,Z=g.scrollTop)))},_t=Y=>{if(!A)return;let je=Y.clientX-D,Oe=Y.clientY-B;!(Math.abs(je)>4||Math.abs(Oe)>4)&&!I||(I=!0,g.classList.add("yyt-scroll-dragging"),J&&(g.scrollLeft=V-je),le&&(g.scrollTop=Z-Oe),Y.preventDefault())},At=()=>{Ee()},Jt=Y=>{if(Y.ctrlKey||be(Y.target)||!g.classList.contains("yyt-content")&&!Pt(g,Y.target))return;let Oe=Tt(g,Y.target);!Oe||Oe!==g&&!g.contains(Oe)||!(Oe.scrollHeight>Oe.clientHeight+2||Oe.scrollWidth>Oe.clientWidth+2)||(Math.abs(Y.deltaY)>0&&(Oe.scrollTop+=Y.deltaY),Math.abs(Y.deltaX)>0&&(Oe.scrollLeft+=Y.deltaX),Y.preventDefault(),Y.stopPropagation())},De=Y=>{I&&Y.preventDefault()};g.addEventListener("mousedown",Fe),g.addEventListener("wheel",Jt,{passive:!1}),g.addEventListener("dragstart",De),x.addEventListener("mousemove",_t),x.addEventListener("mouseup",At),p.cleanups.push(()=>{Ee(),g.classList.remove("yyt-scrollable-surface"),g.removeEventListener("mousedown",Fe),g.removeEventListener("wheel",Jt),g.removeEventListener("dragstart",De),x.removeEventListener("mousemove",_t),x.removeEventListener("mouseup",At)})}function Me(){let g=n.currentPopup;if(!g)return;q();let x=[...g.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...g.querySelectorAll(".yyt-sub-nav"),...g.querySelectorAll(".yyt-content"),...g.querySelectorAll(".yyt-settings-content"),...g.querySelectorAll(".yyt-tool-list")];[...new Set(x)].forEach(Ot)}function lr(g){return`
      <div class="yyt-startup-screen" data-yyt-startup-screen>
        <div class="yyt-startup-screen-inner">
          <div class="yyt-startup-screen-kicker">Welcome</div>
          <div class="yyt-startup-screen-title">YouYou \u5DE5\u5177\u7BB1</div>
          <div class="yyt-startup-screen-desc">\u96C6\u4E2D\u7BA1\u7406 API \u9884\u8BBE\u3001\u81EA\u5B9A\u4E49\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001Ai\u6307\u4EE4\u9884\u8BBE\u4E0E\u8BCA\u65AD\u6D41\u7A0B\u3002\u6BCF\u6B21\u5237\u65B0\u540E\u90FD\u4F1A\u91CD\u65B0\u663E\u793A\uFF0C\u4FBF\u4E8E\u5FEB\u901F\u56DE\u5230\u4ECB\u7ECD\u5165\u53E3\u3002</div>
          <div class="yyt-startup-screen-modules">
            ${(g||[]).slice(0,6).map(A=>`
      <div class="yyt-startup-module-chip">
        <i class="fa-solid ${S(A.icon||"fa-file")}"></i>
        <span>${S(A.name||A.id)}</span>
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
    `}function Yt(g){let x=_();if(!x||!n.currentPopup||n.startupScreenDismissed)return;let A=x(n.currentPopup).find(".yyt-popup-body"),I=A.find(".yyt-popup-shell");!A.length||!I.length||A.find("[data-yyt-startup-screen]").length||(I.attr("data-yyt-startup-visible","true"),A.prepend(lr(g)),A.find(".yyt-startup-enter").on("click",()=>{A.find("[data-yyt-startup-screen]").remove(),I.removeAttr("data-yyt-startup-visible"),n.startupScreenDismissed=!0,Me()}))}function cr(){let g=W(),x=n.currentPopup,A=x?.querySelector(".yyt-popup-header");if(!x||!A||!g)return;let I=!1,D=0,B=0,V=0,Z=0,J="",le=()=>({width:s.innerWidth||g.documentElement?.clientWidth||window.innerWidth||0,height:s.innerHeight||g.documentElement?.clientHeight||window.innerHeight||0}),Ee=(De,Y,je)=>Math.min(Math.max(De,Y),je),Fe=()=>{I&&(I=!1,x.classList.remove("yyt-popup-dragging"),g.body.style.userSelect=J)},_t=De=>{if(!I||!n.currentPopup)return;let Y=De.clientX-D,je=De.clientY-B,{width:Oe,height:_n}=le(),Gy=x.offsetWidth||0,Vy=x.offsetHeight||0,Jy=Math.max(0,Oe-Gy),Xy=Math.max(0,_n-Vy);x.style.left=`${Ee(V+Y,0,Jy)}px`,x.style.top=`${Ee(Z+je,0,Xy)}px`,x.style.transform="none",x.style.right="auto",x.style.bottom="auto"},At=()=>{Fe()},Jt=De=>{if(De.button!==0||De.target?.closest(".yyt-popup-close"))return;I=!0,D=De.clientX,B=De.clientY;let Y=x.getBoundingClientRect();V=Y.left,Z=Y.top,x.style.left=`${Y.left}px`,x.style.top=`${Y.top}px`,x.style.transform="none",x.style.right="auto",x.style.bottom="auto",x.classList.add("yyt-popup-dragging"),J=g.body.style.userSelect||"",g.body.style.userSelect="none",De.preventDefault()};A.addEventListener("mousedown",Jt),g.addEventListener("mousemove",_t),g.addEventListener("mouseup",At),d.cleanup=()=>{Fe(),A.removeEventListener("mousedown",Jt),g.removeEventListener("mousemove",_t),g.removeEventListener("mouseup",At)}}function Gt(){F(),z(),$(),q();let g=_();if(g&&n.currentPopup){let x=g(n.currentPopup);Ie(x,"yytPopupToolConfigSelect"),Ie(x,"yytPromptEditorSelect")}n.currentPopup&&(n.currentPopup.remove(),n.currentPopup=null),n.currentOverlay&&(n.currentOverlay.remove(),n.currentOverlay=null),v("\u5F39\u7A97\u5DF2\u5173\u95ED")}function Bs(g){F(),n.currentMainTab=g;let x=_();if(!x||!n.currentPopup)return;Ae({mainTab:g,includeSubContent:!0}),x(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),x(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${g}"]`).addClass("active");let A=r.toolRegistryModule?.getToolConfig(g);A?.hasSubTabs?(x(n.currentPopup).find(".yyt-sub-nav").show(),ys(g,A.subTabs)):x(n.currentPopup).find(".yyt-sub-nav").hide(),x(n.currentPopup).find(".yyt-tab-content").removeClass("active"),x(n.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`).addClass("active"),Vt(g),j(),Me()}function dr(g,x){F(),n.currentSubTab[g]=x;let A=_();!A||!n.currentPopup||(Ae({mainTab:g,includeSubContent:!0}),A(n.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),A(n.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${x}"]`).addClass("active"),us(g,x),j(),Me())}function ys(g,x){let A=_();if(!A||!n.currentPopup||!x)return;let I=M(g,n.currentSubTab[g]||x[0]?.id),B=(g==="tools"?[{key:"ai",title:"AI \u5DE5\u5177",items:x.filter(V=>(V?.toolKind||"ai")!=="script")},{key:"script",title:"\u811A\u672C\u5DE5\u5177",items:x.filter(V=>V?.toolKind==="script")}].filter(V=>V.items.length>0):[{key:"default",title:"",items:x}]).map(V=>{let Z=V.title?`<div class="yyt-sub-nav-group-title">${S(V.title)}</div>`:"",J=V.items.map(le=>`
        <div class="yyt-sub-nav-item ${le.id===I?"active":""}" data-subtab="${le.id}">
          <i class="fa-solid ${le.icon||"fa-file"}"></i>
          <span>${S(le.name||le.id)}</span>
        </div>
      `).join("");return`
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${V.key}">
          ${Z}
          <div class="yyt-sub-nav-group-items">
            ${J}
          </div>
        </div>
      `}).join("");A(n.currentPopup).find(".yyt-sub-nav").html(B),A(n.currentPopup).find(".yyt-sub-nav-item").on("click",function(){let Z=A(this).data("subtab");dr(g,Z)}),Me()}async function Vt(g){let x=_();if(!x||!n.currentPopup)return;let A=x(n.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!A.length)return;let I=r.toolRegistryModule?.getToolConfig(g);if(g==="tools"){let B=M(g);I?.hasSubTabs&&B?await us(g,B):A.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>'),Me();return}await r.uiModule?.renderMainTab?.(g,A)||ps(g,A),Me()}async function us(g,x){let A=_();if(!A||!n.currentPopup)return;let I=A(n.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!I.length)return;let D=r.toolRegistryModule?.getToolConfig(g);if(D?.hasSubTabs){let V=M(g,x),Z=D.subTabs?.find(Fe=>Fe.id===V),J=I.find(".yyt-sub-content");if(J.length||(I.html('<div class="yyt-sub-content"></div>'),J=I.find(".yyt-sub-content")),!Z){J.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5F53\u524D\u5B50\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u5931\u6548</span></div>'),Ae({mainTab:g,includeSubContent:!0}),Me();return}let le=Z.component;if(le==="GenericToolConfigPanel"){await ro(Z,J),Ae({mainTab:g,includeSubContent:!0}),Me();return}F({container:J});let Ee=await r.uiModule?.renderSubTabComponent?.(le,J);Ee?ne(J,{key:Ee}):J.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>'),Ae({mainTab:g,includeSubContent:!0}),Me();return}let B=I.find(".yyt-sub-content");if(B.length){switch(F({container:B}),x){case"config":zy(g,B);break;case"prompts":await Uy(g,B);break;case"presets":jy(g,B);break;default:B.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}Ae({mainTab:g,includeSubContent:!0}),Me()}}async function ro(g,x){if(!(!_()||!x?.length||!g?.id)){F({container:x});try{let I=o.dynamicToolPanelCache.get(g.id);if(!I){let V=(await Promise.resolve().then(()=>($s(),dc)))?.createToolConfigPanel;if(typeof V!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");I=()=>V({id:`${g.id}Panel`,toolId:g.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${g.name||g.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${g.id}-extraction-preview`,previewTitle:`${g.name||g.id} \u63D0\u53D6\u9884\u89C8`}),o.dynamicToolPanelCache.set(g.id,I)}let D=I();D.renderTo(x),ne(x,{key:g.id,destroy:typeof D?.destroy=="function"?B=>D.destroy(B):null}),Me()}catch(I){u.current=null,w("\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:",I),x.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}}function ps(g,x){if(!_())return;let I=r.toolRegistryModule?.getToolConfig(g);if(!I){x.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let D=n.currentSubTab[g]||I.subTabs?.[0]?.id||"config";x.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${D}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),us(g,D)}function zy(g,x){if(!_())return;let I=r.toolManagerModule?.getTool(g),D=r.presetManagerModule?.getAllPresets()||[],B=r.toolRegistryModule?.getToolApiPreset(g)||"",V=D.map(Z=>`<option value="${S(Z.name)}" ${Z.name===B?"selected":""}>${S(Z.name)}</option>`).join("");x.html(`
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
              ${V}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${I?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${I?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),Ne(x,{namespace:"yytPopupToolConfigSelect",selectors:["#yyt-tool-api-preset"]}),x.find("#yyt-save-tool-preset").on("click",function(){let J=x.find("#yyt-tool-api-preset").val();r.toolRegistryModule?.setToolApiPreset(g,J);let le=s.toastr;le&&le.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function Uy(g,x){if(!_()){x.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let D=r.toolManagerModule?.getTool(g)?.config?.messages||[],B=Ly(D)||to,V=new wn({containerId:`yyt-prompt-editor-${g}`,segments:B,onChange:J=>{let le=Oy(J);v("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",le.length,"\u6761\u6D88\u606F")}});x.html(`<div id="yyt-prompt-editor-${g}" class="yyt-prompt-editor-container"></div>`),V.init(x.find(`#yyt-prompt-editor-${g}`));let Z=Py();if(Z){let J="yyt-prompt-editor-styles",le=s.document||document;if(!le.getElementById(J)){let Ee=le.createElement("style");Ee.id=J,Ee.textContent=Z,(le.head||le.documentElement).appendChild(Ee)}}}function jy(g,x){_()&&x.html(`
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
    `)}function Wy(){return`
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
      </div>`}function Fy(g,x,A){let I=f(),D=g.map(B=>`
      <div class="yyt-main-nav-item ${B.id===n.currentMainTab?"active":""}" data-tab="${B.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${S(B.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${S(B.name||B.id)}</span>
          <span class="yyt-main-nav-desc">${S(B.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");return`
      <aside class="yyt-shell-sidebar${I?" yyt-collapsed":""}">
        <div class="yyt-shell-sidebar-card">
          <div class="yyt-shell-sidebar-title-row">
            <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
            <span class="yyt-shell-sidebar-hint">${g.length} tabs</span>
            <button class="yyt-sidebar-toggle" title="${I?"\u5C55\u5F00\u4FA7\u680F":"\u6298\u53E0\u4FA7\u680F"}">
              <i class="fa-solid ${I?"fa-angles-right":"fa-angles-left"}"></i>
            </button>
          </div>
          <div class="yyt-main-nav">
            ${D}
          </div>
          <div class="yyt-shell-sidebar-note">
            \u4FDD\u5B58\u540E\uFF0C\u624B\u52A8\u6267\u884C\u4E0E\u5199\u56DE\u94FE\u90FD\u4F1A\u4EE5\u6700\u65B0\u914D\u7F6E\u4E3A\u51C6\u3002
          </div>
          <div class="yyt-shell-sidebar-stats">
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${g.length}</span>
              <span class="yyt-shell-sidebar-stat-label">\u4E3B\u9875\u9762</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${x}</span>
              <span class="yyt-shell-sidebar-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${A}</span>
              <span class="yyt-shell-sidebar-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
            </div>
          </div>
        </div>
      </aside>`}function Ky(g,x){return`
      <div class="yyt-shell-main-header">
        <div class="yyt-shell-main-heading-block">
          <div class="yyt-shell-main-title">${S(g)}</div>
          <div class="yyt-shell-main-description">${S(x)}</div>
        </div>
        <div class="yyt-shell-main-actions">
          <div class="yyt-shell-main-meta">
            <i class="fa-solid fa-circle-info"></i>
            <span>\u4FDD\u5B58\u540E\u6267\u884C\u94FE\u4F1A\u7ACB\u5373\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
          </div>
        </div>
      </div>`}function Hy(g,x){return g.map(A=>`
      <div class="yyt-tab-content ${A.id===x?"active":""}" data-tab="${A.id}">
      </div>
    `).join("")}function qy(g){return`
      <div class="yyt-popup-footer">
        <div class="yyt-popup-footer-left">
          <div class="yyt-popup-status-cluster">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${S(g)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
            </div>
          </div>
        </div>
      </div>`}async function Yy(){if(n.currentPopup){v("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let g=t?.services?.loadModules;typeof g=="function"&&await g();let x=_(),A=W();if(!x){w("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let I=r.toolRegistryModule?.getToolList()||[];if(!I.length){w("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}I.some(Y=>Y.id===n.currentMainTab)||(n.currentMainTab=I[0].id);let D=r.toolRegistryModule?.getToolConfig("tools"),B=Array.isArray(D?.subTabs)?D.subTabs:[],V=B.filter(Y=>Y?.isCustom).length,Z=B.filter(Y=>!Y?.isCustom).length,J=C(n.currentMainTab),le=T(n.currentMainTab);n.currentOverlay=A.createElement("div"),n.currentOverlay.className="yyt-popup-overlay",n.currentOverlay.addEventListener("click",Y=>{Y.target===n.currentOverlay&&Gt()}),A.body.appendChild(n.currentOverlay);let Ee=f(),Fe=`
      <div class="yyt-popup" id="${l}">
        ${Wy()}
        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-workspace${Ee?" yyt-sidebar-collapsed":""}">
              ${Fy(I,Z,V)}
              <section class="yyt-shell-main">
                ${Ky(J,le)}
                <div class="yyt-sub-nav" style="display: none;"></div>
                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${Hy(I,n.currentMainTab)}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        ${qy(J)}
      </div>
    `,_t=A.createElement("div");_t.innerHTML=Fe,n.currentPopup=_t.firstElementChild,A.body.appendChild(n.currentPopup),x(n.currentPopup).find(".yyt-popup-close").on("click",Gt),x(n.currentPopup).find(".yyt-sidebar-toggle").on("click",h);let At=Y=>{Y.key==="Escape"&&(A.querySelector(".yyt-dialog-overlay")||A.querySelector(".yyt-twb-editor-drawer.is-open")||(Y.stopPropagation(),Gt()))},Jt=Y=>{if(!(Y.ctrlKey||Y.metaKey)||Y.key!=="s"||!n.currentPopup)return;Y.preventDefault(),Y.stopPropagation();let je=x(n.currentPopup),Oe=je.find("#yyt-bypass-save:visible").first()||je.find(`#${a}-save-api-config:visible`).first()||je.find("#yyt-save-tool-preset:visible").first()||je.find('[data-twb-action="save"]:visible').first();Oe?.length&&Oe.trigger("click")};A.addEventListener("keydown",At),A.addEventListener("keydown",Jt),y.cleanups.push(()=>{A.removeEventListener("keydown",At),A.removeEventListener("keydown",Jt)}),St(),x(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let je=x(this).data("tab");je&&Bs(je)}),cr(),Vt(n.currentMainTab);let De=r.toolRegistryModule?.getToolConfig(n.currentMainTab);De?.hasSubTabs&&(x(n.currentPopup).find(".yyt-sub-nav").show(),ys(n.currentMainTab,De.subTabs)),j(),Yt(I),Me(),v("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:Yy,closePopup:Gt,switchMainTab:Bs,switchSubTab:dr,renderTabContent:Vt,renderSubTabContent:us}}function Ny(t,e={}){let{constants:s,modules:r}=t,{SCRIPT_ID:o,SCRIPT_VERSION:n}=s,{init:a,loadModules:i,addMenuItem:l,popupShell:c}=e;return{version:n,id:o,init:a,openPopup:c?.openPopup,closePopup:c?.closePopup,switchMainTab:c?.switchMainTab,switchSubTab:c?.switchSubTab,addMenuItem:l,getStorage:()=>r.storageModule,getApiConnection:()=>r.apiConnectionModule,getPresetManager:()=>r.presetManagerModule,getUi:()=>r.uiModule,getUiModule:()=>r.uiModule,getRegexExtractor:()=>r.regexExtractorModule,getToolManager:()=>r.toolManagerModule,getToolExecutor:()=>r.toolExecutorModule,getWindowManager:()=>r.windowManagerModule,getToolRegistry:()=>r.toolRegistryModule,getSettingsService:()=>r.settingsServiceModule,getBypassManager:()=>r.bypassManagerModule,getVariableResolver:()=>r.variableResolverModule,getContextInjector:()=>r.contextInjectorModule,getToolPromptService:()=>r.toolPromptServiceModule,getToolOutputService:()=>r.toolOutputServiceModule,getToolAutomationService:()=>r.toolAutomationServiceModule,async getApiConfig(){return await i(),r.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(d){return await i(),r.apiConnectionModule?(r.apiConnectionModule.updateApiConfig(d),!0):!1},async getPresets(){return await i(),r.presetManagerModule?r.presetManagerModule.getAllPresets():[]},async sendApiRequest(d,y){if(await i(),r.apiConnectionModule)return r.apiConnectionModule.sendApiRequest(d,y);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),r.apiConnectionModule?r.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(d,y){return r.toolRegistryModule?.registerTool(d,y)||!1},unregisterTool(d){return r.toolRegistryModule?.unregisterTool(d)||!1},getToolList(){return r.toolRegistryModule?.getToolList()||[]},createWindow(d){return r.windowManagerModule?.createWindow(d)||null},closeWindow(d){r.windowManagerModule?.closeWindow(d)},startAutomation(){return r.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){r.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return r.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},cancelAutomation(d={}){return r.toolAutomationServiceModule?.toolAutomationService?.cancelAutomation?.(d)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}},async processCurrentAssistantMessage(d={}){return r.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(d)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var Sn="youyou_toolkit",Gm="1.0.148",Vm=`${Sn}-menu-item`,Jm=`${Sn}-menu-container`,Xm=`${Sn}-popup`,Qm=typeof window.parent<"u"?window.parent:window,Tn={constants:{SCRIPT_ID:Sn,SCRIPT_VERSION:Gm,MENU_ITEM_ID:Vm,MENU_CONTAINER_ID:Jm,POPUP_ID:Xm},topLevelWindow:Qm,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"apiPresets",currentSubTab:{},startupScreenDismissed:!1}},By=Dy(Tn),so=$y(Tn,{openPopup:By.openPopup});Tn.services.loadModules=so.loadModules;var yi=Ny(Tn,{init:so.init,loadModules:so.loadModules,addMenuItem:so.addMenuItem,popupShell:By});if(typeof window<"u"&&(window.YouYouToolkit=yi,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=yi}catch{}var lw=yi;so.init();Promise.resolve().then(()=>(ce(),pi)).then(({logger:t})=>{t.createScope("Bootstrap").log("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210")});export{lw as default};
