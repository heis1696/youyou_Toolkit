var YouYouToolkit=(()=>{var Xo=Object.defineProperty;var rd=Object.getOwnPropertyDescriptor;var od=Object.getOwnPropertyNames;var ad=Object.prototype.hasOwnProperty;var B=(t,e)=>()=>(t&&(e=t(t=0)),e);var be=(t,e)=>{for(var s in e)Xo(t,s,{get:e[s],enumerable:!0})},nd=(t,e,s,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of od(e))!ad.call(t,o)&&o!==s&&Xo(t,o,{get:()=>e[o],enumerable:!(r=rd(e,o))||r.enumerable});return t};var id=t=>nd(Xo({},"__esModule",{value:!0}),t);var C,Qo,P,ve=B(()=>{C={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_RUNTIME_UPDATED:"tool:runtimeUpdated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},Qo=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,s,r={}){if(!e||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:o=0}=r;this.listeners.has(e)||this.listeners.set(e,new Set);let a={callback:s,priority:o};return this.listeners.get(e).add(a),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,s)}off(e,s){let r=this.listeners.get(e);if(r){for(let o of r)if(o.callback===s){r.delete(o);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,s),this._addToHistory(e,s);let r=this.listeners.get(e);if(!r||r.size===0)return;let o=Array.from(r).sort((a,n)=>n.priority-a.priority);for(let{callback:a}of o)try{a(s)}catch(n){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,n)}}once(e,s){let r=o=>{this.off(e,r),s(o)};return this.on(e,r)}wait(e,s=0){return new Promise((r,o)=>{let a=null,n=this.once(e,i=>{a&&clearTimeout(a),r(i)});s>0&&(a=setTimeout(()=>{n(),o(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},s))})}hasListeners(e){let s=this.listeners.get(e);return s&&s.size>0}listenerCount(e){let s=this.listeners.get(e);return s?s.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,s){this.history.push({event:e,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(s=>s.event===e):[...this.history]}clearHistory(){this.history=[]}},P=new Qo});var $n={};be($n,{LOG_LEVEL:()=>Y,LoggerService:()=>jr,default:()=>ld,logger:()=>N});var Y,Cn,jr,N,ld,ae=B(()=>{ve();Y=Object.freeze({DEBUG:0,INFO:1,WARN:2,ERROR:3}),Cn=Object.freeze({[Y.DEBUG]:"DEBUG",[Y.INFO]:"INFO",[Y.WARN]:"WARN",[Y.ERROR]:"ERROR"}),jr=class{constructor(){this._entries=[],this._maxSize=2e3,this._nextId=1,this._minLevel=Y.INFO,this._eventKey="logger:entry",this._statsEventKey="logger:statsChanged",this._pendingFlush=!1}_write(e,s,r,o){let a={id:this._nextId++,timestamp:Date.now(),level:e,scope:s,message:r,data:o};this._entries.push(a),this._entries.length>this._maxSize&&this._entries.shift(),this._forwardToConsole(a),this._pendingFlush||(this._pendingFlush=!0,queueMicrotask(()=>{this._pendingFlush=!1,this._emitEntry(a)}))}_forwardToConsole(e){let s=`[${e.scope}]`;switch(e.level){case Y.DEBUG:console.debug(s,e.message,e.data??"");break;case Y.INFO:console.log(s,e.message,e.data??"");break;case Y.WARN:console.warn(s,e.message,e.data??"");break;case Y.ERROR:console.error(s,e.message,e.data??"");break}}_emitEntry(e){try{P?.emit(this._eventKey,e)}catch{}}debug(e,s,r){Y.DEBUG<this._minLevel||this._write(Y.DEBUG,e,s,r)}info(e,s,r){Y.INFO<this._minLevel||this._write(Y.INFO,e,s,r)}log(e,s,r){this.info(e,s,r)}warn(e,s,r){Y.WARN<this._minLevel||this._write(Y.WARN,e,s,r)}error(e,s,r){Y.ERROR<this._minLevel||this._write(Y.ERROR,e,s,r)}createScope(e){return{debug:(s,r)=>this.debug(e,s,r),info:(s,r)=>this.info(e,s,r),log:(s,r)=>this.log(e,s,r),warn:(s,r)=>this.warn(e,s,r),error:(s,r)=>this.error(e,s,r)}}getEntries(e={}){let{level:s,scope:r,search:o,limit:a=500,offset:n=0}=e,i=this._entries;if(s!=null&&(i=i.filter(c=>c.level>=s)),r&&(i=i.filter(c=>c.scope===r)),o){let c=o.toLowerCase();i=i.filter(d=>d.scope.toLowerCase().includes(c)||d.message.toLowerCase().includes(c))}let l=i.length;return i=i.slice(n,n+a),{entries:i,total:l}}getStats(){let e={total:this._entries.length,byLevel:{DEBUG:0,INFO:0,WARN:0,ERROR:0},byScope:{}};for(let s of this._entries){let r=Cn[s.level]||"UNKNOWN";e.byLevel[r]=(e.byLevel[r]||0)+1,e.byScope[s.scope]=(e.byScope[s.scope]||0)+1}return e}setLevel(e){this._minLevel=e}getLevel(){return this._minLevel}setMaxSize(e){this._maxSize=Math.max(100,Math.min(1e4,e))}clear(){this._entries=[],this._nextId=1}levelLabel(e){return Cn[e]||"UNKNOWN"}},N=new jr,ld=N});function Pn(){let t=k;return t._getStorage(),t._storage}function On(){return k.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function Dn(t){k.set("settings",t)}var Zo,Mt,k,se,Rn,tr,He=B(()=>{ae();Zo=N.createScope("StorageService"),Mt=class t{constructor(e="youyou_toolkit"){this.namespaceKey=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespaceKey]||(s.extensionSettings[this.namespaceKey]={}),this._storage={_target:s.extensionSettings[this.namespaceKey],getItem:r=>{let o=s.extensionSettings[this.namespaceKey][r];return typeof o=="string"?o:o?JSON.stringify(o):null},setItem:(r,o)=>{s.extensionSettings[this.namespaceKey][r]=o,this._saveSettings(s)},removeItem:r=>{delete s.extensionSettings[this.namespaceKey][r],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{Zo.warn("SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage")}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,s)=>{try{localStorage.setItem(e,s)}catch(r){Zo.error("localStorage\u5199\u5165\u5931\u8D25:",r)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,s=null){let r=`${this.namespaceKey}:${e}`;if(this._cache.has(r))return this._cache.get(r);let o=this._getStorage(),a=this._getFullKey(e),n=o.getItem(a);if(n===null)return s;try{let i=JSON.parse(n);return this._cache.set(r,i),i}catch{return n}}set(e,s){let r=this._getStorage(),o=this._getFullKey(e),a=`${this.namespaceKey}:${e}`;this._cache.set(a,s);try{r.setItem(o,JSON.stringify(s))}catch(n){Zo.error("\u5B58\u50A8\u5931\u8D25:",n)}}remove(e){let s=this._getStorage(),r=this._getFullKey(e),o=`${this.namespaceKey}:${e}`;this._cache.delete(o),s.removeItem(r)}has(e){let s=this._getStorage(),r=this._getFullKey(e);return s.getItem(r)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let r=s.SillyTavern.getContext();r?.extensionSettings?.[this.namespaceKey]&&(r.extensionSettings[this.namespaceKey]={},this._saveSettings(r))}}else{let s=`${this.namespaceKey}_`,r=[];for(let o=0;o<localStorage.length;o++){let a=localStorage.key(o);a&&a.startsWith(s)&&r.push(a)}r.forEach(o=>localStorage.removeItem(o))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespaceKey}_${e}`}namespace(e){return new t(`${this.namespaceKey}:${e}`)}getMultiple(e){let s={};return e.forEach(r=>{s[r]=this.get(r)}),s}setMultiple(e){Object.entries(e).forEach(([s,r])=>{this.set(s,r)})}exportAll(){let e=this._getStorage(),s={};if(e._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let a=r.SillyTavern.getContext()?.extensionSettings?.[this.namespaceKey]||{};Object.entries(a).forEach(([n,i])=>{s[n]=typeof i=="string"?JSON.parse(i):i})}}else{let r=`${this.namespaceKey}_`;for(let o=0;o<localStorage.length;o++){let a=localStorage.key(o);if(a&&a.startsWith(r)){let n=a.slice(r.length);try{s[n]=JSON.parse(localStorage.getItem(a))}catch{s[n]=localStorage.getItem(a)}}}}return s}},k=new Mt("youyou_toolkit"),se=new Mt("youyou_toolkit:tools"),Rn=new Mt("youyou_toolkit:presets"),tr=new Mt("youyou_toolkit:windows")});var Nn={};be(Nn,{DEFAULT_API_PRESETS:()=>dd,DEFAULT_SETTINGS:()=>cd,STORAGE_KEYS:()=>sr,StorageService:()=>Mt,deepMerge:()=>Ln,getCurrentPresetName:()=>pd,getStorage:()=>Pn,loadApiPresets:()=>ud,loadSettings:()=>On,presetStorage:()=>Rn,saveApiPresets:()=>yd,saveSettings:()=>Dn,setCurrentPresetName:()=>fd,storage:()=>k,toolStorage:()=>se,windowStorage:()=>tr});function ud(){return k.get(sr.API_PRESETS)||[]}function yd(t){k.set(sr.API_PRESETS,t)}function pd(){return k.get(sr.CURRENT_PRESET)||""}function fd(t){k.set(sr.CURRENT_PRESET,t||"")}function Ln(t,e){let s=o=>o&&typeof o=="object"&&!Array.isArray(o),r={...t};return s(t)&&s(e)&&Object.keys(e).forEach(o=>{s(e[o])?o in t?r[o]=Ln(t[o],e[o]):Object.assign(r,{[o]:e[o]}):Object.assign(r,{[o]:e[o]})}),r}var sr,cd,dd,Bn=B(()=>{He();He();sr={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},cd={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},dd=[]});var Kn={};be(Kn,{API_STATUS:()=>wd,fetchAvailableModels:()=>oa,getApiConfig:()=>mt,getEffectiveApiConfig:()=>rr,hasEffectiveApiPreset:()=>or,sendApiRequest:()=>ar,sendWithPreset:()=>sa,testApiConnection:()=>Md,updateApiConfig:()=>As,validateApiConfig:()=>Es});function hd(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function ta(){return k.get(Un,hd())}function vd(t){k.set(Un,t)}function jn(){return k.get(md,[])}function xd(){return k.get(bd,"")}function ea(t,e={}){let s=new Error(t);return s.allowDirectFallback=e.allowDirectFallback===!0,s}function zn(t,e="chat_completions"){let s=String(t||"").trim();if(!s)return"";let r=null;try{r=new URL(s)}catch{return s}let o=r.pathname.replace(/\/+$/,""),a=o;return e==="chat_completions"?!/\/chat\/completions$/i.test(o)&&!/\/completions$/i.test(o)&&(a=`${o||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(o)?a=o.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(o)?a=o.replace(/\/completions$/i,"/models"):/\/models$/i.test(o)||(a=`${o||""}/models`)),r.pathname=a.replace(/\/+/g,"/"),r.toString()}function Sd(t){let e=String(t||"").trim();if(!e)return"";try{let s=new URL(e);return s.pathname=s.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",s.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function mt(){return ta().apiConfig||{}}function As(t){let e=ta();e.apiConfig={...e.apiConfig,...t},vd(e)}function Es(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function rr(t=""){let e=ta(),s=t||xd()||"";if(s){let o=jn().find(a=>a.name===s);if(o&&o.apiConfig)return{...o.apiConfig,presetName:o.name}}return e.apiConfig||{}}function or(t=""){return t?jn().some(s=>s?.name===t):!1}async function sa(t,e,s={},r=null){let o=rr(t);return await ar(e,{...s,apiConfig:o},r)}function Wn(t,e={}){let s=e.apiConfig||mt();return{messages:t,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:s.stream??!1,...e.extraParams}}function ra(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function ar(t,e={},s=null){let r=e.apiConfig||mt(),o=r.useMainApi,a=Es(r);if(!a.valid&&!o)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${a.errors.join(", ")}`);return o?await Td(t,e,s):await _d(t,r,e,s)}async function Td(t,e,s){let r=typeof window.parent<"u"?window.parent:window;if(!r.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let o=await r.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.apiConfig?.stream??mt().stream??!1,...e.extraParams});if(typeof o!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return o.trim()}catch(o){throw o.name==="AbortError"?o:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${o.message}`)}}async function _d(t,e,s,r){let o=typeof window.parent<"u"?window.parent:window;if(o.TavernHelper?.generateRaw)try{return await Ad(t,e,s,r,o)}catch(a){gd.warn("TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",a)}if(o.SillyTavern?.getRequestHeaders)try{return await Ed(t,e,s,r,o)}catch(a){if(!a?.allowDirectFallback)throw a}return await Id(t,e,s,r)}async function Ad(t,e,s,r,o){if(r?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let a=await o.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.stream??!1,max_chat_history:0,custom_api:{apiurl:Sd(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...s.extraParams||{}});return typeof a=="string"?a.trim():ra(a)}async function Ed(t,e,s,r,o){let a=String(e.url||"").trim(),n={...Wn(t,{apiConfig:e,...s}),chat_completion_source:"custom",reverse_proxy:a,proxy_password:"",custom_url:a,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof o.SillyTavern?.getRequestHeaders=="function"?o.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(n),signal:r})}catch(u){throw u?.name==="AbortError"?u:ea(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw ea(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:u})}let d=null;try{d=c?JSON.parse(c):{}}catch{let y=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw ea(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${y||"(\u7A7A\u54CD\u5E94)"}`)}return ra(d)}async function Id(t,e,s,r){let o=Wn(t,{apiConfig:e,...s}),a=zn(e.url,"chat_completions"),n={"Content-Type":"application/json"};e.apiKey&&(n.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(a,{method:"POST",headers:n,body:JSON.stringify(o),signal:r}),l=await i.text().catch(()=>"");if(!i.ok){let d=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${d}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return ra(c)}async function Md(t=null){let e=t||mt(),s=Date.now();try{await ar([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let o=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${o}ms)`,latency:o}}catch(r){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${r.message}`,latency:Date.now()-s}}}async function oa(t=null){let e=t||mt();return e.useMainApi?await kd():await Cd(e)}async function kd(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function Cd(t){if(!t.url||!t.apiKey)return[];try{let e=zn(t.url,"models"),s=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!s.ok)return[];let r=await s.json();return r.data&&Array.isArray(r.data)?r.data.map(o=>o.id||o.name).filter(Boolean).sort():[]}catch{return[]}}var gd,Un,md,bd,wd,nr=B(()=>{He();ae();gd=N.createScope("ApiConnection"),Un="settings",md="api_presets",bd="current_preset";wd={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var Gn={};be(Gn,{createPreset:()=>Kr,createPresetFromCurrentConfig:()=>Ld,deletePreset:()=>lr,duplicatePreset:()=>Dd,exportPresets:()=>ca,generateUniquePresetName:()=>ua,getActiveConfig:()=>la,getActivePresetName:()=>Fr,getAllPresets:()=>bt,getPreset:()=>Jt,getPresetNames:()=>Pd,getStarredPresets:()=>ia,importPresets:()=>da,presetExists:()=>ir,renamePreset:()=>Od,switchToPreset:()=>Xt,togglePresetStar:()=>na,updatePreset:()=>aa,validatePreset:()=>Nd});function Rd(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function qn(){return k.get($d,Rd())}function Le(){return k.get(Fn,[])}function Vt(t){k.set(Fn,t)}function Wr(){return k.get(Hn,"")}function zr(t){k.set(Hn,t||"")}function bt(){return Le()}function Pd(){return Le().map(e=>e.name)}function Jt(t){return!t||typeof t!="string"?null:Le().find(s=>s.name===t)||null}function ir(t){return!t||typeof t!="string"?!1:Le().some(s=>s.name===t)}function Kr(t){let{name:e,description:s,apiConfig:r}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let o=e.trim();if(ir(o))return{success:!1,message:`\u9884\u8BBE "${o}" \u5DF2\u5B58\u5728`};let a={name:o,description:s||"",apiConfig:{url:r?.url||"",apiKey:r?.apiKey||"",model:r?.model||"",useMainApi:r?.useMainApi??!0,stream:r?.stream??!1,max_tokens:r?.max_tokens||4096,temperature:r?.temperature??.7,top_p:r?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},n=Le();return n.push(a),Vt(n),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:a}}function aa(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=Le(),r=s.findIndex(n=>n.name===t);if(r===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let o=s[r],a={...o,...e,name:o.name,updatedAt:Date.now()};return e.apiConfig&&(a.apiConfig={...o.apiConfig,...e.apiConfig}),s[r]=a,Vt(s),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:a}}function lr(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=Le(),s=e.findIndex(r=>r.name===t);return s===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(s,1),Vt(e),Wr()===t&&zr(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function Od(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(!ir(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(ir(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let r=Le(),o=r.find(a=>a.name===t);return o&&(o.name=s,o.updatedAt=Date.now(),Vt(r),Wr()===t&&zr(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function Dd(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim(),r=Jt(t);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(ir(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(r)),name:s,createdAt:Date.now(),updatedAt:Date.now()},a=Le();return a.push(o),Vt(a),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:o}}function na(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=Le(),s=e.find(r=>r.name===t);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),Vt(e),{success:!0,message:s.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function ia(){return Le().filter(e=>e.starred===!0)}function Xt(t){if(!t)return zr(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=Jt(t);return e?(zr(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Fr(){return Wr()}function la(){let t=Wr();if(t){let s=Jt(t);if(s)return{presetName:t,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:qn().apiConfig||{}}}function ca(t=null){if(t){let s=Jt(t);if(!s)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let e=Le();return JSON.stringify(e,null,2)}function da(t,e={overwrite:!1}){let s;try{s=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let r=Array.isArray(s)?s:[s];if(r.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let o=Le(),a=0;for(let n of r){if(!n.name||typeof n.name!="string"||!n.apiConfig||typeof n.apiConfig!="object")continue;let i=o.findIndex(l=>l.name===n.name);i>=0?e.overwrite&&(n.updatedAt=Date.now(),o[i]=n,a++):(n.createdAt=n.createdAt||Date.now(),n.updatedAt=Date.now(),o.push(n),a++)}return a>0&&Vt(o),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u9884\u8BBE`,imported:a}}function Ld(t,e=""){let s=qn();return Kr({name:t,description:e,apiConfig:s.apiConfig})}function Nd(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function ua(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=Le(),s=new Set(e.map(o=>o.name));if(!s.has(t))return t;let r=1;for(;s.has(`${t} (${r})`);)r++;return`${t} (${r})`}var $d,Fn,Hn,cr=B(()=>{He();$d="settings",Fn="api_presets",Hn="current_preset"});function Ct(){return typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function b(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function w(t,e,s=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let r=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(r.toastr){r.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}Ud(t,e,s),Bd.log(`[${t.toUpperCase()}] ${e}`)}function le(t,e,s={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:r=3500,sticky:o=!1,noticeId:a=""}=s,n=Ct();if(!n?.body){w(t,e,r);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",c=n.getElementById(i);if(c||(c=n.createElement("div"),c.id=i,c.style.cssText=`
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
    `,n.body.appendChild(c)),!n.getElementById(l)){let v=n.createElement("style");v.id=l,v.textContent=`
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
    `,n.head.appendChild(v)}if(a){let v=c.querySelector(`[data-notice-id="${a}"]`);v&&v.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=n.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,a&&(u.dataset.noticeId=a);let y=n.createElement("span");y.className="yyt-top-notice__icon",y.textContent=d[t]||d.info;let p=n.createElement("div");p.className="yyt-top-notice__content",p.textContent=e;let f=n.createElement("button");f.className="yyt-top-notice__close",f.type="button",f.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),f.textContent="\xD7";let x=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};f.addEventListener("click",x),u.appendChild(y),u.appendChild(p),u.appendChild(f),c.appendChild(u),o||setTimeout(x,r)}function Ud(t,e,s){let r=Ct();if(!r)return;let o=r.getElementById("yyt-fallback-toast");o&&o.remove();let a={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},n=a[t]||a.info,i=r.createElement("div");if(i.id="yyt-fallback-toast",i.style.cssText=`
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    background: ${n.bg};
    color: #0b0f15;
    border-radius: 8px;
    border: 2px solid ${n.border};
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
    `,r.head.appendChild(l)}r.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},s)}function D(){if(Qt)return Qt;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Qt=window.parent.jQuery,Qt}catch{}return window.jQuery&&(Qt=window.jQuery),Qt}function jd(){Qt=null}function j(t){if(!t||t.length===0)return!1;let e=t[0];if(!e||e.nodeType!==1)return!1;let s=e.ownerDocument||document;return e.isConnected?s?.documentElement?.contains?s.documentElement.contains(e):!0:!1}function kt(...t){return t.flat(1/0).flatMap(e=>String(e||"").split(/\s+/)).map(e=>e.trim()).filter(Boolean).join(" ")}function Is(t={}){return Object.entries(t).filter(([,e])=>e!=null&&e!==!1).map(([e,s])=>s===!0?e:`${e}="${b(String(s))}"`).join(" ")}function Xn(t=[],e="",s=""){let r=String(e??""),o=t.find(a=>a.value===r)||t.find(a=>a.disabled!==!0)||null;return o||{value:r,label:s||r||"\u8BF7\u9009\u62E9",disabled:!1}}function zd(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(e=>e&&e!=="yyt-select"&&e!=="yyt-native-select-bridge")}function Yn(t,e){let s=D();if(!s||!e?.length)return null;let r=e.attr("id")?`#${e.attr("id")}`:e.attr("data-yyt-select-key")?`[data-yyt-select-key="${e.attr("data-yyt-select-key")}"]`:"";if(!r)return null;let a=t.find("[data-yyt-custom-select]").filter((n,i)=>String(s(i).attr("data-yyt-select-target")||"")===r);return a.length?a.first():null}function Qn(t){let e=t?.[0];return e?.ownerDocument?e.ownerDocument:typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function Wd(t){if(!D()||!j(t))return null;let s=t.find("[data-yyt-custom-select]");return s.length?s:null}function Zn(t,e){if(!D()||!e?.length)return null;let r=e.find("[data-yyt-select-native]").first();if(r.length)return r;let o=String(e.attr("data-yyt-select-target")||"").trim();if(!o)return null;let a=t.find(o).first();return a.length?a:null}function ei(t=null){return t?.jquery&&t[0]?.ownerDocument?t[0].ownerDocument:t?.ownerDocument?t.ownerDocument:t?.nodeType===9?t:Ct()}function it(t=null){let e=ei(t),s=Vn.get(e);return s||(s={targetDoc:e,layer:null,activeRoot:null,activeDropdown:null,placeholder:null,cleanup:null},Vn.set(e,s)),s}function Kd(t=null){let e=ei(t);if(!e?.body)return null;let s=it(e);if(s.layer&&s.layer.isConnected)return s.layer;let r=e.getElementById(Jn);return r||(r=e.createElement("div"),r.id=Jn,r.className="yyt-select-portal-layer",e.body.appendChild(r)),s.layer=r,r}function Hr(t){if(!D()||!t?.length)return null;let s=t.find("[data-yyt-select-trigger]").first();return s.length?s:t.find(".yyt-select-trigger").first()}function ti(t){let e=D();if(!e||!t?.length)return null;let s=it(t);if(s.activeRoot===t[0]&&s.activeDropdown)return e(s.activeDropdown);let r=t.find("[data-yyt-select-dropdown]").first();return r.length?r:t.find(".yyt-select-dropdown").first()}function Fd(t){t&&(t.classList.remove("yyt-floating-open"),t.removeAttribute("data-yyt-floating"),t.removeAttribute("data-yyt-floating-placement"),t.style.position="",t.style.top="",t.style.left="",t.style.right="",t.style.width="",t.style.minWidth="",t.style.maxWidth="",t.style.maxHeight="",t.style.visibility="",t.style.zIndex="")}function si(t,e=null){if(!t)return!1;let s=it(e||t);return s.activeRoot?.contains?.(t)||s.activeDropdown?.contains?.(t)?!0:!!t.closest?.("[data-yyt-custom-select], .yyt-select-portal-layer")}function Hd(t){if(!t?.targetDoc||typeof t.cleanup=="function")return;let e=t.targetDoc,s=e.defaultView||window,r=i=>{!t.activeRoot||!t.activeDropdown||si(i.target,e)||je(e)},o=i=>{if(i.key!=="Escape")return;let l=t.activeRoot;je(e);let c=D();c&&l&&Hr(c(l))?.trigger("focus")},a=()=>{fa(e)},n=()=>{fa(e)};e.addEventListener("mousedown",r,!0),e.addEventListener("keydown",o,!0),s.addEventListener("resize",a),e.addEventListener("scroll",n,!0),t.cleanup=()=>{e.removeEventListener("mousedown",r,!0),e.removeEventListener("keydown",o,!0),s.removeEventListener("resize",a),e.removeEventListener("scroll",n,!0)}}function qd(t){typeof t?.cleanup=="function"&&t.cleanup(),t&&(t.cleanup=null)}function pa(t){let e=D();if(!e||!t?.activeRoot||!t?.activeDropdown)return;let s=t.targetDoc;if(!s?.body?.contains?.(t.activeRoot)){je(s);return}let r=e(t.activeRoot),o=Hr(r),a=t.activeDropdown,n=s?.defaultView||window;if(!o?.length||!a?.isConnected||!r[0]?.isConnected){je(s);return}let i=o[0].getBoundingClientRect(),l=n.innerWidth||s.documentElement?.clientWidth||0,c=n.innerHeight||s.documentElement?.clientHeight||0,d=12,u=8,y=Math.max(0,c-i.bottom-d-u),p=Math.max(0,i.top-d-u),f=y<220&&p>y,v=Math.max(120,Math.floor((f?p:y)||0));a.setAttribute("data-yyt-floating","true"),a.setAttribute("data-yyt-floating-placement",f?"top":"bottom"),a.classList.add("yyt-floating-open");let _=Math.ceil(i.width),A=Math.max(_,Math.floor(l-d*2)),S=a.style.width,z=a.style.minWidth,$=a.style.maxWidth,I=a.style.visibility;a.style.width="max-content",a.style.minWidth=`${_}px`,a.style.maxWidth=`${A}px`,a.style.visibility="hidden";let R=Math.ceil(a.scrollWidth||a.getBoundingClientRect().width||_),J=Math.max(_,Math.min(A,R)),V=Math.min(a.scrollHeight||v,v);a.style.width=S,a.style.minWidth=z,a.style.maxWidth=$,a.style.visibility=I;let U=Math.round(i.left);U+J>l-d&&(U=Math.max(d,Math.round(l-d-J))),U=Math.max(d,U);let Q=Math.round(f?i.top-u-V:i.bottom+u);Q=Math.max(d,Math.min(Q,Math.round(c-d-V))),a.style.position="fixed",a.style.top=`${Q}px`,a.style.left=`${U}px`,a.style.right="auto",a.style.width=`${J}px`,a.style.minWidth=`${_}px`,a.style.maxWidth=`${A}px`,a.style.maxHeight=`${Math.floor(v)}px`,a.style.visibility="",a.style.zIndex="10050"}function je(t=null){let e=D(),s=it(t);if(!e||!s?.activeRoot)return;let r=s.activeRoot,o=s.activeDropdown,a=s.placeholder,n=e(r),i=Hr(n);o&&(Fd(o),a?.parentNode?a.parentNode.insertBefore(o,a):r?.isConnected?r.appendChild(o):o.remove()),a?.parentNode?.removeChild(a),n.removeClass("yyt-open"),i?.attr("aria-expanded","false"),s.activeRoot=null,s.activeDropdown=null,s.placeholder=null,qd(s)}function fa(t=null){let e=it(t);!e?.activeRoot||!e?.activeDropdown||pa(e)}function ri(t){if(!D()||!t?.length)return;let s=t.first(),r=Hr(s),o=ti(s);if(!r?.length||!o?.length||r.prop("disabled"))return;let a=it(s);if(a.activeRoot===s[0]){pa(a);return}je(s);let n=Kd(s);if(!n)return;let i=o[0],l=a.targetDoc.createComment("yyt-select-dropdown-placeholder");i.parentNode?.insertBefore(l,i),n.appendChild(i),a.activeRoot=s[0],a.activeDropdown=i,a.placeholder=l,s.addClass("yyt-open"),r.attr("aria-expanded","true"),Hd(a),pa(a)}function Gd(t,e){let s=D();if(!s||!e?.length)return null;let r=e.closest("[data-yyt-custom-select]");if(r.length)return r.first();let o=it(e);if(o.activeRoot&&o.activeDropdown?.contains?.(e[0])){let a=s(o.activeRoot);return t.has(o.activeRoot).length?a:null}return null}function dr(t){let e=it(t);t?.length&&e.activeRoot&&e.activeRoot!==t[0]||je(t)}function qr(t){let e=it(t);if(t?.length&&e.activeRoot===t[0]){je(t);return}ri(t)}function ya(t,e,s=null){let r=D();if(!r||!e?.length)return;let o=s||Zn(t,e);if(!o?.length)return;let a=Array.isArray(o.data("yytCustomSelectOptions"))?o.data("yytCustomSelectOptions"):[],n=Xn(a,o.val(),e.attr("data-yyt-select-placeholder")||""),i=String(n.value??""),l=String(n.label??""),c=o.is(":disabled");e.find(".yyt-select-value").text(l).attr("data-value",i).data("value",i);let d=ti(e);(d?.length?d.find("[data-yyt-select-option]"):e.find("[data-yyt-select-option]")).each((p,f)=>{let x=r(f),v=String(x.attr("data-value")||"")===i;x.toggleClass("yyt-selected",v).attr("aria-selected",String(v))});let y=e.find("[data-yyt-select-trigger]").first();y.prop("disabled",c),c&&(dr(e),e.removeClass("yyt-open"),y.attr("aria-expanded","false"))}function Gr(t=[]){return Array.isArray(t)?t.map(e=>{if(e&&typeof e=="object"&&!Array.isArray(e)){let r=String(e.value??""),o=String(e.label??e.text??e.name??r);return{value:r,label:o,disabled:e.disabled===!0}}let s=String(e??"");return{value:s,label:s,disabled:!1}}):[]}function Yr(t={}){let{selectedValue:e="",options:s=[],placeholder:r="\u8BF7\u9009\u62E9",disabled:o=!1,includeNative:a=!0,nativeTag:n="input",nativeType:i="hidden",rootAttributes:l={},nativeAttributes:c={},triggerAttributes:d={},dropdownAttributes:u={},optionAttributes:y={},optionClass:p="",optionTextClass:f=""}=t,x=Gr(s),v=Xn(x,e,r),_=o===!0||x.length===0,A=Is({...l,class:kt("yyt-custom-select",l.class),"data-yyt-custom-select":l["data-yyt-custom-select"]??"true","data-yyt-select-placeholder":r}),S=Is({type:"button",...d,class:kt("yyt-select-trigger",d.class),"data-yyt-select-trigger":d["data-yyt-select-trigger"]??"true","aria-haspopup":d["aria-haspopup"]??"listbox","aria-expanded":d["aria-expanded"]??"false",disabled:_?!0:d.disabled}),z=Is({...u,class:kt("yyt-select-dropdown",u.class),"data-yyt-select-dropdown":u["data-yyt-select-dropdown"]??"true",role:u.role??"listbox"}),$=a?(()=>{let I={...c,class:kt(c.class),"data-yyt-select-native":c["data-yyt-select-native"]??"true",disabled:_?!0:c.disabled};return n==="select"?`<select ${Is(I)}>${x.map(V=>`
            <option value="${b(V.value)}" ${V.value===String(v.value??"")?"selected":""} ${V.disabled?"disabled":""}>${b(V.label)}</option>
          `).join("")}</select>`:`<input ${Is({type:i,value:v.value,...I})}>`})():"";return`
    <div ${A}>
      ${$}
      <button ${S}>
        <span class="${b(kt("yyt-select-value"))}" data-value="${b(v.value)}">${b(v.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${z}>
        ${x.map(I=>{let R=I.value===String(v.value??"");return`
            <button ${Is({type:"button",...y,class:kt("yyt-select-option",p,y.class,R?"yyt-selected":""),"data-yyt-select-option":y["data-yyt-select-option"]??"true","data-value":I.value,role:y.role??"option","aria-selected":R?"true":"false",disabled:I.disabled?!0:y.disabled})}>
              <span class="${b(kt("yyt-option-text",f))}">${b(I.label)}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function xe(t,e="yytCustomSelect"){let s=D();if(!s||!j(t))return;let r=Qn(t),o=it(r);o.activeRoot&&t.has(o.activeRoot).length&&je(r),t.off(`.${e}`),s(r).off(`click.${e}`),s(r).off(`mousedown.${e}`),t.find('[data-yyt-enhanced-select="true"]').remove(),t.find(".yyt-native-select-bridge").each((a,n)=>{let i=s(n),l=i.attr("data-yyt-original-style");l!==void 0&&l?i.attr("style",l):i.removeAttr("style"),i.removeClass("yyt-native-select-bridge").removeAttr("data-yyt-original-style").removeAttr("data-yyt-select-key").removeData("yytCustomSelectOptions")})}function ke(t,e={}){let s=D();if(!s||!j(t))return;let{namespace:r="yytCustomSelect",selectors:o=[]}=e,a=Array.isArray(o)?o.filter(Boolean):[o].filter(Boolean);if(a.length===0)return;xe(t,r);let n=a.join(", "),i=Qn(t);t.find(n).each((l,c)=>{let d=s(c),u=String(d.attr("id")||"").trim(),y=u||`yyt-select-${Date.now()}-${l}`,p=u?`#${u}`:`[data-yyt-select-key="${y}"]`,f=`${y}-dropdown`,x=zd(d.attr("class")),v=d.attr("style"),_=d.find("option").map((z,$)=>{let I=s($);return{value:String(I.attr("value")??I.val()??""),label:I.text(),disabled:I.is(":disabled")}}).get();d.attr("data-yyt-original-style",v??"").attr("data-yyt-select-key",y).addClass("yyt-native-select-bridge").css("display","none").data("yytCustomSelectOptions",_);let A=Yr({includeNative:!1,selectedValue:d.val(),options:_,disabled:d.is(":disabled"),placeholder:_[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{class:kt(x),style:v||void 0,"data-yyt-enhanced-select":"true","data-yyt-select-target":p},triggerAttributes:{id:`${y}-trigger`,"aria-controls":f},dropdownAttributes:{id:f}});d.after(A);let S=Yn(t,d);ya(t,S,d)}),t.on(`click.${r}`,"[data-yyt-select-trigger]",l=>{l.preventDefault(),l.stopPropagation();let c=s(l.currentTarget);if(c.prop("disabled"))return;let d=c.closest("[data-yyt-custom-select]");qr(d)}),t.on(`change.${r}`,n,l=>{let c=s(l.currentTarget),d=c.find("option").map((y,p)=>{let f=s(p);return{value:String(f.attr("value")??f.val()??""),label:f.text(),disabled:f.is(":disabled")}}).get();c.data("yytCustomSelectOptions",d);let u=Yn(t,c);ya(t,u,c)}),s(i).off(`click.${r}`).on(`click.${r}`,l=>{if(si(l.target,i))return;let c=Wd(t);c?.length&&(je(i),c.filter(".yyt-open").removeClass("yyt-open").find("[data-yyt-select-trigger]").attr("aria-expanded","false"))}),s(i).off(`mousedown.${r}`,".yyt-select-portal-layer [data-yyt-select-option]").on(`mousedown.${r}`,".yyt-select-portal-layer [data-yyt-select-option]",l=>{l.preventDefault(),l.stopPropagation();let c=s(l.currentTarget);if(c.prop("disabled"))return;let d=Gd(t,c);if(!d?.length)return;let u=Zn(t,d);if(!u?.length)return;let y=String(c.attr("data-value")||"");u.val(y).trigger("change"),ya(t,d,u),dr(d)})}function ur(t,e=m){if(!D()||!j(t))return{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9};let r=t.find(`#${e}-model`).val()?.trim()||"",o=t.find(`#${e}-model-select`);return o.is(":visible")&&(r=o.val()||r),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:r,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),stream:t.find(`#${e}-stream`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function Vr(t,e,s=m){if(!D()||!j(t)||!e)return;t.find(`#${s}-api-url`).val(e.url||""),t.find(`#${s}-api-key`).val(e.apiKey||""),t.find(`#${s}-model`).val(e.model||""),t.find(`#${s}-stream`).prop("checked",e.stream===!0),t.find(`#${s}-max-tokens`).val(e.max_tokens||4096),t.find(`#${s}-temperature`).val(e.temperature??.7),t.find(`#${s}-top-p`).val(e.top_p??.9);let o=e.useMainApi??!0;t.find(`#${s}-use-main-api`).prop("checked",o);let n=t.find(`#${s}-custom-api-fields`);o?n.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):n.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${s}-model`).show(),t.find(`#${s}-model-select`).hide()}function $t(t){let{id:e,title:s,body:r,width:o="380px",wide:a=!1,dialogClass:n="",bodyClass:i="",footerClass:l=""}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${a?"yyt-dialog-wide":""} ${n}" style="${o!=="380px"?`width: ${o};`:""} max-height: calc(100vh - 32px);">
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
  `}function Rt(t,e,s={}){if(!D())return()=>{};let o=t.find(`#${e}-overlay`),a=()=>{o.remove(),s.onClose&&s.onClose()};return o.find(`#${e}-close, #${e}-cancel`).on("click",a),o.on("click",function(n){n.target===this&&a()}),o.find(`#${e}-save`).on("click",function(){s.onSave&&s.onSave(a)}),a}function ht(t,e){let s=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(s),o=document.createElement("a");o.href=r,o.download=e,o.click(),URL.revokeObjectURL(r)}function vt(t){return new Promise((e,s)=>{let r=new FileReader;r.onload=o=>e(o.target.result),r.onerror=o=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),r.readAsText(t)})}var Bd,m,Ms,Qt,Vn,Jn,Ae=B(()=>{ae();Bd=N.createScope("UIUtils"),m="youyou_toolkit",Ms=class{constructor(e={}){this._state={...e}}get(e){return this._state[e]}set(e,s){return this._state[e]=s,this}reset(e={}){return this._state={...e},this}toJSON(){return{...this._state}}};Qt=null;Vn=new WeakMap,Jn="yyt-select-portal-layer"});var ks,yr,pe,ga=B(()=>{ve();Ae();ae();ks=N.createScope("UIManager"),yr=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,P.emit(C.UI_INITIALIZED),ks.log("\u521D\u59CB\u5316\u5B8C\u6210"))}register(e,s){return!e||!s?(ks.warn("\u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,s,r={}){let o=D();if(!o){ks.error("jQuery\u4E0D\u53EF\u7528");return}let a=this.components.get(e);if(!a){ks.error(`\u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`),n?.length&&n.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u672A\u6CE8\u518C\uFF1A${e}</span></div>`);return}let n;if(typeof s=="string"?n=o(s):s&&s.jquery?n=s:s&&(n=o(s)),!j(n)){ks.warn("\u5BB9\u5668\u4E0D\u5B58\u5728");return}this.activeInstances.forEach((i,l)=>{i?.container?.length&&n.length&&i.container[0]===n[0]&&l!==e&&this.destroyInstance(l)}),this.destroyInstance(e);try{if(typeof a.renderTo=="function")a.renderTo(n,{...r,dependencies:this.dependencies});else{let i=a.render({...r,dependencies:this.dependencies});n.html(i),a.bindEvents(n,this.dependencies)}}catch(i){ks.error(`\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25: ${e}`,i),n.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25\uFF1A${e}${i?.message?` - ${i.message}`:""}</span></div>`);return}this.activeInstances.set(e,{container:n,component:a,props:r}),P.emit(C.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let s=this.activeInstances.get(e);s&&(s.component.destroy(s.container),this.activeInstances.delete(e))}destroyContainerInstance(e){let s=D();if(!s||!e)return;let r;if(typeof e=="string"?r=s(e):e?.jquery?r=e:r=s(e),!r?.length)return;let o=[];this.activeInstances.forEach((a,n)=>{a?.container?.length&&a.container[0]===r[0]&&o.push(n)}),o.forEach(a=>this.destroyInstance(a))}switchTab(e){let s=this.currentTab;this.currentTab=e,P.emit(C.UI_TAB_CHANGED,{tabId:e,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(e,s){this.currentSubTab[e]=s,P.emit(C.UI_SUBTAB_CHANGED,{mainTab:e,subTab:s})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((s,r)=>{s.getStyles&&(e+=s.getStyles())}),e}injectStyles(e=document){let s="yyt-component-styles";if(e.getElementById(s))return;let r=e.createElement("style");r.id=s,r.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(r)}setDependency(e,s){this.dependencies[e]=s}getDependency(e){return this.dependencies[e]}_subscribeEvents(){P.on(C.PRESET_UPDATED,()=>{}),P.on(C.TOOL_UPDATED,()=>{})}},pe=new yr});function qe(t){return String(t||"").trim()}var oi,Pt,ma=B(()=>{ve();Ae();nr();cr();oi={selectedPresetName:null},Pt={id:"apiPresetPanel",_getState(t){if(!t?.length)return new Ms(oi);let e=t.data("yytPanelState");return e||(e=new Ms(oi),t.data("yytPanelState",e)),e},_getSelectedPresetName(t){return this._getState(t).get("selectedPresetName")},_setSelectedPresetName(t,e){this._getState(t).set("selectedPresetName",e===null?null:qe(e))},_rerender(t){j(t)&&(je(t),this.renderTo(t))},_removeDialog(t){t?.length&&t.find(`#${m}-dialog-overlay`).remove()},render(t={}){let e=la(),s=e?.apiConfig||mt(),r=qe(e?.presetName||Fr()),o=bt(),a=ia(),n=t.selectedPresetName??null,l=a.slice(0,8),c=l.length>0?l.map(y=>this._renderPresetItem(y)).join(""):"",d=n===null?r||"":qe(n),u=d||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
              <div class="yyt-custom-select" id="${m}-preset-dropdown">
                <div class="yyt-select-trigger">
                  <span class="yyt-select-value" data-value="${b(d)}">${b(u)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${d?"":"yyt-selected"}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                    <span class="yyt-option-delete yyt-placeholder"></span>
                  </div>
                  ${o.length>0?o.map(y=>this._renderSelectOption(y,d)).join(""):""}
                </div>
              </div>
              <button class="yyt-btn yyt-btn-secondary" id="${m}-load-preset" title="\u52A0\u8F7D\u9009\u4E2D\u9884\u8BBE">
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
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${m}-save-as-preset" style="margin-left: auto;">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
              </button>
            </div>
            
            ${this._renderApiConfigForm(s)}
          </div>
          
          <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
          <div class="yyt-panel-footer">
            <div class="yyt-footer-left">
              <button class="yyt-btn yyt-btn-secondary" id="${m}-import-presets">
                <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
              </button>
              <button class="yyt-btn yyt-btn-secondary" id="${m}-export-presets">
                <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
              </button>
              <input type="file" id="${m}-import-file" accept=".json" style="display:none">
            </div>
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-secondary" id="${m}-reset-api-config">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
              </button>
              <button class="yyt-btn yyt-btn-primary" id="${m}-save-api-config">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>
        </div>
      </div>
    `},_renderPresetItem(t){return`
      <div class="yyt-preset-item" data-preset-name="${b(t.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${b(t.name)}</div>
          <div class="yyt-preset-meta">
            ${t.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${b(t.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
      <div class="yyt-select-option ${t.name===e?"yyt-selected":""}" data-value="${b(t.name)}">
        <button class="${r}" data-preset="${b(t.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${o}</button>
        <span class="yyt-option-text">${b(t.name)}</span>
        <button class="yyt-option-delete" data-action="delete" data-preset="${b(t.name)}" title="\u5220\u9664\u9884\u8BBE">
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
            <input type="checkbox" id="${m}-use-main-api" ${t.useMainApi?"checked":""}>
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
            <input type="checkbox" id="${m}-stream" ${t.stream===!0?"checked":""}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>

      <div id="${m}-custom-api-fields" class="${t.useMainApi?"yyt-disabled":""}">
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API URL</label>
            <input type="text" class="yyt-input" id="${m}-api-url" 
                   value="${b(t.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${m}-api-key" 
                     value="${b(t.apiKey||"")}" 
                     placeholder="sk-...">
              <button class="yyt-btn yyt-btn-icon" id="${m}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>\u6A21\u578B</label>
            <div class="yyt-model-row">
              <input type="text" class="yyt-input yyt-model-input" id="${m}-model" 
                     value="${b(t.model||"")}" 
                     placeholder="gpt-4">
              <select class="yyt-select yyt-model-select" id="${m}-model-select" style="display: none;">
              </select>
              <button class="yyt-btn yyt-btn-secondary yyt-model-btn" id="${m}-load-models" title="\u83B7\u53D6\u6A21\u578B\u5217\u8868">
                <i class="fa-solid fa-sync-alt"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row yyt-form-row-2col">
          <div class="yyt-form-group">
            <label>Max Tokens</label>
            <input type="number" class="yyt-input" id="${m}-max-tokens" 
                   value="${t.max_tokens||4096}" min="1" max="128000">
          </div>
          
          <div class="yyt-form-group">
            <label>Temperature</label>
            <input type="number" class="yyt-input" id="${m}-temperature" 
                   value="${t.temperature??.7}" min="0" max="2" step="0.1">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>Top P</label>
            <input type="number" class="yyt-input" id="${m}-top-p" 
                   value="${t.top_p??.9}" min="0" max="1" step="0.1">
          </div>
        </div>
      </div>
    `},bindEvents(t,e){let s=D();!s||!j(t)||(this._bindDropdownEvents(t,s),this._bindPresetListEvents(t,s),this._bindApiConfigEvents(t,s),this._bindFileEvents(t,s))},_bindDropdownEvents(t,e){let s=t.find(`#${m}-preset-dropdown`),r=s.find(".yyt-select-trigger"),o=s.find(".yyt-select-value"),a=()=>{let n=qe(o.data("value"));if(!n){this._setSelectedPresetName(t,""),Xt(""),Vr(t,mt(),m),t.find(".yyt-preset-item").removeClass("yyt-loaded"),s.find(".yyt-select-option").removeClass("yyt-selected"),s.find('.yyt-select-option[data-value=""]').addClass("yyt-selected"),w("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let i=Jt(n);if(!i){w("error",`\u9884\u8BBE "${n}" \u4E0D\u5B58\u5728`);return}this._setSelectedPresetName(t,n),Xt(n),Vr(t,i.apiConfig,m),t.find(".yyt-preset-item").removeClass("yyt-loaded"),t.find(`.yyt-preset-item[data-preset-name="${n.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),s.find(".yyt-select-option").removeClass("yyt-selected"),s.find(`.yyt-select-option[data-value="${n.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),w("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${n}"\uFF0C\u4FEE\u6539\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u914D\u7F6E\u201D\u4F1A\u8986\u76D6\u8BE5\u9884\u8BBE`)};r.on("click.yytApiPreset",n=>{n.preventDefault(),n.stopPropagation(),qr(s)}),s.find(".yyt-select-option").on("click.yytApiPreset",n=>{if(e(n.target).closest(".yyt-option-star, .yyt-option-delete").length)return;let i=e(n.currentTarget),l=qe(i.data("value")),c=i.find(".yyt-option-text").text(),d=i.closest(".yyt-select-dropdown").find(".yyt-select-option");this._setSelectedPresetName(t,l),o.text(c).data("value",l),d.removeClass("yyt-selected"),i.addClass("yyt-selected"),dr(s)}),t.find(`#${m}-load-preset`).on("click",()=>{a()}),s.find(".yyt-option-star").on("click.yytApiPreset",n=>{n.preventDefault(),n.stopPropagation();let i=qe(e(n.currentTarget).data("preset"));if(!i)return;let l=na(i);l.success?(w("success",l.message),this._rerender(t)):w("error",l.message)}),s.find(".yyt-option-delete").on("click.yytApiPreset",n=>{n.preventDefault(),n.stopPropagation();let i=qe(e(n.currentTarget).data("preset"));if(!i||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${i}" \u5417\uFF1F`))return;let l=lr(i);w(l.success?"info":"error",l.message),l.success&&(P.emit(C.PRESET_DELETED,{name:i}),qe(this._getSelectedPresetName(t))===i&&this._setSelectedPresetName(t,""),qe(o.data("value"))===i&&o.text("-- \u5F53\u524D\u914D\u7F6E --").data("value",""),this._rerender(t))})},_bindPresetListEvents(t,e){t.find(".yyt-preset-item").on("click.yytApiPreset",s=>{let r=e(s.currentTarget),o=qe(r.data("preset-name")),a=e(s.target).closest("[data-action]").data("action");if(a)switch(s.stopPropagation(),a){case"load":this._setSelectedPresetName(t,o),t.find(".yyt-select-value").text(o).data("value",o),t.find(".yyt-select-option").removeClass("yyt-selected"),t.find(`.yyt-select-option[data-value="${o.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),t.find(`#${m}-load-preset`).trigger("click");break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${o}" \u5417\uFF1F`)){let n=lr(o);w(n.success?"info":"error",n.message),n.success&&(P.emit(C.PRESET_DELETED,{name:o}),qe(this._getSelectedPresetName(t))===o&&this._setSelectedPresetName(t,""),this._rerender(t))}break}})},_bindApiConfigEvents(t,e){t.find(`#${m}-use-main-api`).on("change.yytApiPreset",function(){let s=e(this).is(":checked"),r=t.find(`#${m}-custom-api-fields`);s?r.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):r.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),t.find(`#${m}-toggle-key-visibility`).on("click",function(){let s=t.find(`#${m}-api-key`),r=s.attr("type");s.attr("type",r==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),t.find(`#${m}-load-models`).on("click",async()=>{let s=t.find(`#${m}-load-models`),r=t.find(`#${m}-model`),o=t.find(`#${m}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let a=ur(t,m),n=await oa(a);if(n.length>0){o.empty(),n.forEach(l=>{o.append(`<option value="${b(l)}">${b(l)}</option>`)}),r.hide(),o.show();let i=r.val();i&&n.includes(i)&&o.val(i),o.off("change.yytApiPreset").on("change.yytApiPreset",function(){r.val(e(this).val())}),w("success",`\u5DF2\u52A0\u8F7D ${n.length} \u4E2A\u6A21\u578B`)}else w("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(a){w("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${a.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${m}-model`).on("focus.yytApiPreset",function(){let s=t.find(`#${m}-model-select`);e(this).show(),s.hide()}),t.find(`#${m}-save-api-config`).on("click",()=>{let s=ur(t,m),r=qe(Fr()),o=Es(s);if(!o.valid&&!s.useMainApi){w("error",o.errors.join(", "));return}if(r){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${r}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230\u201C\u5F53\u524D\u914D\u7F6E\u201D`)){As(s),Xt(""),this._setSelectedPresetName(t,""),w("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"),this._rerender(t);return}As(s);let a=aa(r,{apiConfig:s});a.success?(this._setSelectedPresetName(t,r),w("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${r}"`),Xt(r),P.emit(C.PRESET_UPDATED,{name:r}),this._rerender(t)):w("error",a.message);return}As(s),w("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),t.find(`#${m}-reset-api-config`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")&&(Xt(""),this._setSelectedPresetName(t,""),As({url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9}),this._rerender(t),w("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E"))}),t.find(`#${m}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(t,e)})},_bindFileEvents(t,e){t.find(`#${m}-export-presets`).on("click",()=>{try{let s=ca();ht(s,`youyou_toolkit_presets_${Date.now()}.json`),w("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){w("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${m}-import-presets`).on("click",()=>{t.find(`#${m}-import-file`).click()}),t.find(`#${m}-import-file`).on("change",async s=>{let r=s.target.files[0];if(r){try{let o=await vt(r),a=da(o,{overwrite:!0});w(a.success?"success":"error",a.message),a.imported>0&&this._rerender(t)}catch(o){w("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}})},_showSavePresetDialog(t,e){let r=bt().map(d=>d.name),o=ua("\u65B0\u9884\u8BBE"),a=`
      <div class="yyt-dialog-overlay" id="${m}-dialog-overlay">
        <div class="yyt-dialog">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">\u4FDD\u5B58\u4E3A\u65B0\u9884\u8BBE</span>
            <button class="yyt-dialog-close" id="${m}-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-group">
              <label>\u9884\u8BBE\u540D\u79F0</label>
              <input type="text" class="yyt-input" id="${m}-dialog-preset-name"
                     value="${b(o)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09</label>
              <textarea class="yyt-textarea" id="${m}-dialog-preset-desc" rows="2"
                        placeholder="\u9884\u8BBE\u63CF\u8FF0..."></textarea>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${m}-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="${m}-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;this._removeDialog(t),t.append(a);let n=t.find(`#${m}-dialog-overlay`),i=n.find(`#${m}-dialog-preset-name`),l=n.find(`#${m}-dialog-preset-desc`);i.focus().select();let c=()=>n.remove();n.find(`#${m}-dialog-close, #${m}-dialog-cancel`).on("click",c),n.on("click",function(d){d.target===this&&c()}),n.find(`#${m}-dialog-save`).on("click",()=>{let d=i.val().trim(),u=l.val().trim();if(!d){w("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),i.focus();return}if(r.includes(d)){if(!confirm(`\u9884\u8BBE "${d}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;lr(d),P.emit(C.PRESET_DELETED,{name:d})}let y=ur(t,m),p=Kr({name:d,description:u,apiConfig:y});p.success?(w("success",p.message),this._setSelectedPresetName(t,d),c(),P.emit(C.PRESET_CREATED,{preset:p.preset}),this._rerender(t)):w("error",p.message)}),i.on("keypress.yytApiPreset",function(d){d.which===13&&n.find(`#${m}-dialog-save`).click()})},destroy(t){!D()||!j(t)||(this._removeDialog(t),je(t),t.removeData("yytPanelState"),t.off(".yytApiPreset"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({selectedPresetName:this._getSelectedPresetName(t)});t.html(e),this.bindEvents(t,{})}}});var mi={};be(mi,{MESSAGE_MACROS:()=>gi,addTagRule:()=>Cs,createRuleTemplate:()=>di,default:()=>Jd,deleteRulePreset:()=>pi,deleteRuleTemplate:()=>yi,deleteTagRule:()=>eo,escapeRegex:()=>Zt,exportRulesConfig:()=>oo,extractComplexTag:()=>ni,extractCurlyBraceTag:()=>wa,extractHtmlFormatTag:()=>ii,extractSimpleTag:()=>xa,extractTagContent:()=>es,generateTagSuggestions:()=>Qr,getAllRulePresets:()=>so,getAllRuleTemplates:()=>li,getContentBlacklist:()=>ts,getRuleTemplate:()=>ci,getTagRules:()=>wt,importRulesConfig:()=>ao,isValidTagName:()=>va,loadRulePreset:()=>ro,saveRulesAsPreset:()=>to,scanTextForTags:()=>Xr,setContentBlacklist:()=>pr,setTagRules:()=>Zr,shouldSkipContent:()=>ha,testRegex:()=>fi,updateRuleTemplate:()=>ui,updateTagRule:()=>$s});function Yd(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...ba],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function ze(){return k.get(ai,Yd())}function lt(t){k.set(ai,t)}function Jr(){let t=ze();return Ie=t.ruleTemplates||[...ba],ce=t.tagRules||[],Ne=t.contentBlacklist||[],{ruleTemplates:Ie,tagRules:ce,contentBlacklist:Ne}}function Zt(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function ha(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let s=t.toLowerCase();return e.some(r=>{let o=r.trim().toLowerCase();return o&&s.includes(o)})}function va(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!Vd.includes(t.toLowerCase())}function xa(t,e){if(!t||!e)return[];let s=[],r=Zt(e),o=new RegExp(`<${r}>([\\s\\S]*?)<\\/${r}>`,"gi");[...t.matchAll(o)].forEach(l=>{l[1]&&s.push(l[1].trim())});let n=(t.match(new RegExp(`<${r}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${r}>`,"gi"))||[]).length;return n>i&&xt.warn(`\u53D1\u73B0 ${n-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),s}function wa(t,e){if(!t||!e)return[];let s=[],r=Zt(e),o=new RegExp(`\\{${r}\\|`,"gi"),a;for(;(a=o.exec(t))!==null;){let n=a.index,i=n+a[0].length,l=1,c=i;for(;c<t.length&&l>0;)t[c]==="{"?l++:t[c]==="}"&&l--,c++;if(l===0){let d=t.substring(i,c-1);d.trim()&&s.push(d.trim())}o.lastIndex=n+1}return s}function ni(t,e){if(!t||!e)return[];let s=e.split(",");if(s.length!==2)return xt.error(`\u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let r=s[0].trim(),o=s[1].trim(),a=o.match(/<\/(\w+)>/);if(!a)return xt.error(`\u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${o}`),[];let n=a[1],i=new RegExp(`${Zt(r)}([\\s\\S]*?)<\\/${n}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(d=>{d[1]&&l.push(d[1].trim())}),l}function ii(t,e){if(!t||!e)return[];let s=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return xt.error(`\u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let r=s[1],o=[],a=new RegExp(`<${r}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${r}>`,"gi");[...t.matchAll(a)].forEach(c=>{c[1]&&o.push(c[1].trim())});let i=(t.match(new RegExp(`<${r}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${r}>`,"gi"))||[]).length;return i>l&&xt.warn(`\u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${r}> \u6807\u7B7E`),o}function es(t,e,s=[]){if(!t)return"";if(!e||e.length===0)return t;let r=e.filter(d=>d.type==="exclude"&&d.enabled),o=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),a=e.filter(d=>d.type==="regex_exclude"&&d.enabled),n=t;for(let d of r)try{let u=new RegExp(`<${Zt(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Zt(d.value)}>`,"gi");n=n.replace(u,"")}catch(u){xt.error("Error applying block exclusion rule:",{rule:d,error:u})}let i=[];if(o.length>0)for(let d of o){let u=[];try{if(d.type==="include")u.push(...xa(n,d.value)),u.push(...wa(n,d.value));else if(d.type==="regex_include"){let y=new RegExp(d.value,"gi");[...n.matchAll(y)].forEach(f=>{f[1]&&u.push(f[1])})}}catch(y){xt.error("Error applying inclusion rule:",{rule:d,error:y})}u.forEach(y=>i.push(y.trim()))}else i.push(n);let l=[];for(let d of i){for(let u of a)try{let y=new RegExp(u.value,"gi");d=d.replace(y,"")}catch(y){xt.error("Error applying cleanup rule:",{rule:u,error:y})}ha(d,s)||l.push(d)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function Xr(t,e={}){let s=performance.now(),{chunkSize:r=5e4,maxTags:o=100,timeoutMs:a=5e3}=e,n=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let u=0;u<t.length;u+=r){let y=t.slice(u,Math.min(u+r,t.length));if(c++,l+=y.length,performance.now()-s>a){xt.warn(`Tag scanning timed out after ${a}ms`);break}let p;for(;(p=i.exec(y))!==null&&n.size<o;){let f=(p[1]||p[2]).toLowerCase();va(f)&&n.add(f)}if(n.size>=o)break;c%5===0&&await new Promise(f=>setTimeout(f,0))}let d=performance.now();return{tags:Array.from(n).sort(),stats:{processingTimeMs:Math.round(d-s),processedChars:l,totalChars:t.length,chunkCount:c,tagsFound:n.size}}}function Qr(t,e=25){let s=t.tags.slice(0,e);return{suggestions:s,stats:{totalFound:t.stats.tagsFound,finalCount:s.length}}}function li(){return Ie.length===0&&Jr(),Ie}function ci(t){return Ie.find(e=>e.id===t)}function di(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return Ie.push(e),Sa(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function ui(t,e){let s=Ie.findIndex(r=>r.id===t);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(Ie[s]={...Ie[s],...e,updatedAt:new Date().toISOString()},Sa(),{success:!0,template:Ie[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function yi(t){let e=Ie.findIndex(s=>s.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(Ie.splice(e,1),Sa(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function Sa(){let t=ze();t.ruleTemplates=Ie,lt(t)}function wt(){return ce||Jr(),ce}function Zr(t){ce=t||[];let e=ze();e.tagRules=ce,lt(e)}function Cs(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};ce.push(e);let s=ze();return s.tagRules=ce,lt(s),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function $s(t,e){if(t<0||t>=ce.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};ce[t]={...ce[t],...e};let s=ze();return s.tagRules=ce,lt(s),{success:!0,rule:ce[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function eo(t){if(t<0||t>=ce.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};ce.splice(t,1);let e=ze();return e.tagRules=ce,lt(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function ts(){return Ne||Jr(),Ne}function pr(t){Ne=t||[];let e=ze();e.contentBlacklist=Ne,lt(e)}function to(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=ze();s.tagRulePresets||(s.tagRulePresets={});let r=`preset-${Date.now()}`;return s.tagRulePresets[r]={id:r,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(ce)),blacklist:JSON.parse(JSON.stringify(Ne)),createdAt:new Date().toISOString()},lt(s),{success:!0,preset:s.tagRulePresets[r],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function so(){let e=ze().tagRulePresets||{};return Object.values(e)}function ro(t){let e=ze(),r=(e.tagRulePresets||{})[t];return r?(ce=JSON.parse(JSON.stringify(r.rules||[])),Ne=JSON.parse(JSON.stringify(r.blacklist||[])),e.tagRules=ce,e.contentBlacklist=Ne,lt(e),{success:!0,preset:r,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function pi(t){let e=ze(),s=e.tagRulePresets||{};return s[t]?(delete s[t],e.tagRulePresets=s,lt(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function oo(){return JSON.stringify({tagRules:ce,contentBlacklist:Ne,ruleTemplates:Ie,tagRulePresets:ze().tagRulePresets||{}},null,2)}function ao(t,e={overwrite:!0}){try{let s=JSON.parse(t);if(e.overwrite)ce=s.tagRules||[],Ne=s.contentBlacklist||[],Ie=s.ruleTemplates||ba;else if(s.tagRules&&ce.push(...s.tagRules),s.contentBlacklist){let o=new Set(Ne.map(a=>a.toLowerCase()));s.contentBlacklist.forEach(a=>{o.has(a.toLowerCase())||Ne.push(a)})}let r=ze();return r.tagRules=ce,r.contentBlacklist=Ne,r.ruleTemplates=Ie,s.tagRulePresets&&(r.tagRulePresets={...r.tagRulePresets||{},...s.tagRulePresets}),lt(r),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function fi(t,e,s="g",r=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let o=new RegExp(t,s),a=[];if(s.includes("g")){let n;for(;(n=o.exec(e))!==null;)n.length>1?a.push({fullMatch:n[0],groups:n.slice(1),index:n.index,extracted:n[r]||n[1]||n[0]}):a.push({fullMatch:n[0],groups:[],index:n.index,extracted:n[0]})}else{let n=o.exec(e);n&&a.push({fullMatch:n[0],groups:n.length>1?n.slice(1):[],index:n.index,extracted:n.length>1?n[r]||n[1]:n[0]})}return{success:!0,matches:a,count:a.length,extracted:a.map(n=>n.extracted)}}catch(o){return{success:!1,error:o.message,matches:[]}}}var xt,ai,Vd,ba,Ie,ce,Ne,gi,Jd,no=B(()=>{He();ae();xt=N.createScope("RegexExtractor"),ai="settings";Vd=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],ba=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],Ie=[],ce=[],Ne=[];gi={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};Jr();Jd={extractTagContent:es,extractSimpleTag:xa,extractCurlyBraceTag:wa,extractComplexTag:ni,extractHtmlFormatTag:ii,escapeRegex:Zt,shouldSkipContent:ha,isValidTagName:va,scanTextForTags:Xr,generateTagSuggestions:Qr,getAllRuleTemplates:li,getRuleTemplate:ci,createRuleTemplate:di,updateRuleTemplate:ui,deleteRuleTemplate:yi,getTagRules:wt,setTagRules:Zr,addTagRule:Cs,updateTagRule:$s,deleteTagRule:eo,getContentBlacklist:ts,setContentBlacklist:pr,saveRulesAsPreset:to,getAllRulePresets:so,loadRulePreset:ro,deleteRulePreset:pi,exportRulesConfig:oo,importRulesConfig:ao,testRegex:fi,MESSAGE_MACROS:gi}});var ss,Ta=B(()=>{ve();Ae();no();ss={id:"regexExtractPanel",render(t){let e=wt(),s=ts(),r=so();return`
      <div class="yyt-regex-panel">
        <!-- \u89C4\u5219\u7F16\u8F91\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-filter"></i>
            <span>\u6807\u7B7E\u63D0\u53D6\u89C4\u5219</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${m}-show-examples" style="margin-left: auto;">
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
            <button class="yyt-btn yyt-btn-secondary" id="${m}-import-rules">
              <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${m}-export-rules">
              <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
            </button>
            <input type="file" id="${m}-import-rules-file" accept=".json" style="display:none">
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${m}-reset-rules">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
            </button>
          </div>
        </div>
        
        <!-- \u6807\u7B7E\u626B\u63CF\u7ED3\u679C\u5BB9\u5668 -->
        <div id="${m}-tag-suggestions-container" style="display: none;">
          <div class="yyt-tag-suggestions">
            <div class="yyt-tag-suggestions-header">
              <span>\u53D1\u73B0\u7684\u6807\u7B7E:</span>
              <span id="${m}-tag-scan-stats"></span>
            </div>
            <div class="yyt-tag-list" id="${m}-tag-list"></div>
          </div>
        </div>
      </div>
    `},_renderRulesEditor(t,e,s){let r=t.length>0?t.map((a,n)=>this._renderRuleItem(a,n)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',o=s.length>0?s.map(a=>`<option value="${a.id}">${b(a.name)}</option>`).join(""):"";return`
      <div class="yyt-tag-rules-editor">
        ${o?`
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${m}-rule-preset-select">
            <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
            ${o}
          </select>
          <button class="yyt-btn yyt-btn-secondary" id="${m}-load-rule-preset">
            <i class="fa-solid fa-download"></i> \u52A0\u8F7D
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${m}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u9884\u8BBE
          </button>
        </div>
        `:`
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-secondary" id="${m}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
          </button>
        </div>
        `}
        
        <div class="yyt-rules-list">
          ${r}
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${m}-add-rule">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u89C4\u5219
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${m}-scan-tags">
            <i class="fa-solid fa-search"></i> \u626B\u63CF\u6807\u7B7E
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${m}-add-exclude-cot">
            <i class="fa-solid fa-ban"></i> \u6392\u9664\u5C0FCoT
          </button>
        </div>
        
        <!-- \u9ED1\u540D\u5355\u8BBE\u7F6E -->
        <div class="yyt-form-group">
          <label>\u5185\u5BB9\u9ED1\u540D\u5355\uFF08\u5305\u542B\u8FD9\u4E9B\u5173\u952E\u8BCD\u7684\u5185\u5BB9\u5C06\u88AB\u8FC7\u6EE4\uFF0C\u7528\u9017\u53F7\u5206\u9694\uFF09</label>
          <input type="text" class="yyt-input" id="${m}-content-blacklist" 
                 value="${b(e.join(", "))}" 
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
               value="${b(t.value||"")}">
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
          <textarea class="yyt-textarea" id="${m}-test-input" rows="6" 
                    placeholder="\u8F93\u5165\u8981\u6D4B\u8BD5\u63D0\u53D6\u7684\u6587\u672C\u5185\u5BB9..."></textarea>
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${m}-test-extract">
            <i class="fa-solid fa-play"></i> \u6D4B\u8BD5\u63D0\u53D6
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${m}-test-clear">
            <i class="fa-solid fa-eraser"></i> \u6E05\u7A7A
          </button>
        </div>
        
        <div class="yyt-form-group" id="${m}-test-result-container" style="display: none;">
          <label>\u63D0\u53D6\u7ED3\u679C</label>
          <div class="yyt-test-result" id="${m}-test-result"></div>
        </div>
      </div>
    `},bindEvents(t,e){let s=D();!s||!j(t)||(t.off(".yytRegex"),this._bindRuleEditorEvents(t,s),this._bindPresetEvents(t,s),this._bindTestEvents(t,s),this._bindFileEvents(t,s),ke(t,{namespace:"yytRegexSelect",selectors:[`#${m}-rule-preset-select`]}))},_bindRuleEditorEvents(t,e){t.on("change.yytRegex",".yyt-rule-type",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).val();$s(r,{type:o}),w("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),t.on("change.yytRegex",".yyt-rule-value",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).val().trim();$s(r,{value:o})}),t.on("change.yytRegex",".yyt-rule-enabled",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).is(":checked");$s(r,{enabled:o}),w("info",o?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),t.on("click.yytRegex",".yyt-rule-delete",s=>{let o=e(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(eo(o),this.renderTo(t),w("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.on("click.yytRegex",`#${m}-add-rule`,()=>{Cs({type:"include",value:"",enabled:!0}),this.renderTo(t),w("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),t.on("click.yytRegex",`#${m}-scan-tags`,async()=>{let s=t.find(`#${m}-scan-tags`),r=t.find(`#${m}-test-input`).val();if(!r||!r.trim()){w("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let o=await Xr(r,{maxTags:50,timeoutMs:3e3}),{suggestions:a,stats:n}=Qr(o,25);if(a.length===0){w("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),t.find(`#${m}-tag-suggestions-container`).hide();return}let i=t.find(`#${m}-tag-list`);t.find(`#${m}-tag-scan-stats`).text(`${n.finalCount}/${n.totalFound} \u4E2A\u6807\u7B7E, ${o.stats.processingTimeMs}ms`),i.empty(),a.forEach(c=>{let d=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${b(c)}</button>`);d.on("click",()=>{if(wt().some(p=>p.type==="include"&&p.value===c)){w("warning",`\u89C4\u5219 "\u5305\u542B: ${c}" \u5DF2\u5B58\u5728`);return}Cs({type:"include",value:c,enabled:!0}),this.renderTo(t),w("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${c}"`)}),i.append(d)}),t.find(`#${m}-tag-suggestions-container`).show(),w("success",`\u53D1\u73B0 ${a.length} \u4E2A\u6807\u7B7E`)}catch(o){w("error",`\u626B\u63CF\u5931\u8D25: ${o.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.on("click.yytRegex",`#${m}-add-exclude-cot`,()=>{let s=wt(),r="<!--[\\s\\S]*?-->";if(s.some(a=>a.type==="regex_exclude"&&a.value===r)){w("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}Cs({type:"regex_exclude",value:r,enabled:!0}),this.renderTo(t),w("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),t.on("change.yytRegex",`#${m}-content-blacklist`,function(){let r=e(this).val().split(",").map(o=>o.trim()).filter(o=>o);pr(r),w("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${r.length} \u4E2A\u5173\u952E\u8BCD`)}),t.on("click.yytRegex",`#${m}-show-examples`,()=>{let s=`
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
      `,r=`${m}-examples-dialog`,o=t.find(`#${r}-overlay`);o.length&&o.remove();let a=$t({id:r,title:"\u63D0\u53D6\u89C4\u5219\u8BED\u6CD5\u8BF4\u660E",body:`<div style="white-space: pre-wrap; font-size: 13px; line-height: 1.7; max-height: 60vh; overflow-y: auto;">${b(s)}</div>`,wide:!0}),n=e(a).appendTo(t);n.find(`#${r}-cancel`).text("\u5173\u95ED"),n.find(`#${r}-save`).remove(),Rt(n,r,{})})},_bindPresetEvents(t,e){t.on("click.yytRegex",`#${m}-load-rule-preset`,()=>{let s=t.find(`#${m}-rule-preset-select`).val();if(!s){w("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let r=ro(s);r.success?(this.renderTo(t),w("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${r.preset.name}`),P.emit(C.REGEX_PRESET_LOADED,{preset:r.preset})):w("error",r.message)}),t.on("click.yytRegex",`#${m}-save-rule-preset`,()=>{let s=`${m}-preset-name-dialog`,r=t.find(`#${s}-overlay`);r.length&&r.remove();let o=$t({id:s,title:"\u4FDD\u5B58\u89C4\u5219\u9884\u8BBE",body:`<div class="yyt-form-group">
          <label>\u9884\u8BBE\u540D\u79F0</label>
          <input type="text" class="yyt-input" id="${s}-name" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0...">
        </div>`}),a=e(o).appendTo(t);Rt(a,s,{onSave:n=>{let i=a.find(`#${s}-name`).val();if(!i||!i.trim()){w("error","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}n();let l=to(i.trim());l.success?(this.renderTo(t),w("success",`\u9884\u8BBE "${i.trim()}" \u5DF2\u4FDD\u5B58`)):w("error",l.message)}})})},_bindTestEvents(t,e){t.on("click.yytRegex",`#${m}-test-extract`,()=>{let s=t.find(`#${m}-test-input`).val();if(!s||!s.trim()){w("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let r=wt(),o=ts(),a=es(s,r,o),n=t.find(`#${m}-test-result-container`),i=t.find(`#${m}-test-result`);n.show(),!a||!a.trim()?(i.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),w("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(i.html(`<pre class="yyt-code-block">${b(a)}</pre>`),w("success","\u63D0\u53D6\u5B8C\u6210"),P.emit(C.REGEX_EXTRACTED,{result:a}))}),t.on("click.yytRegex",`#${m}-test-clear`,()=>{t.find(`#${m}-test-input`).val(""),t.find(`#${m}-test-result-container`).hide()})},_bindFileEvents(t,e){t.on("click.yytRegex",`#${m}-import-rules`,()=>{t.find(`#${m}-import-rules-file`).click()}),t.on("change.yytRegex",`#${m}-import-rules-file`,async s=>{let r=s.target.files[0];if(r){try{let o=await vt(r),a=ao(o,{overwrite:!0});a.success?(this.renderTo(t),w("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):w("error",a.message)}catch(o){w("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.on("click.yytRegex",`#${m}-export-rules`,()=>{try{let s=oo();ht(s,`youyou_toolkit_rules_${Date.now()}.json`),w("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){w("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.on("click.yytRegex",`#${m}-reset-rules`,()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(Zr([]),pr([]),this.renderTo(t),w("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(t){!D()||!j(t)||(xe(t,"yytRegexSelect"),t.off(".yytRegex"))},getStyles(){return`
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
        padding: 12px 13px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.065) 0%, rgba(255, 255, 255, 0.025) 100%);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 10px 20px rgba(0, 0, 0, 0.1);
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
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.085) 0%, rgba(255, 255, 255, 0.03) 100%);
        border-color: rgba(255, 255, 255, 0.18);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 14px 24px rgba(0, 0, 0, 0.12);
      }

      .yyt-rule-enabled-label {
        flex-shrink: 0;
        white-space: nowrap;
      }

      /* \u6807\u7B7E\u5EFA\u8BAE\u533A\u57DF */
      .yyt-tag-suggestions {
        margin-top: 12px;
        padding: 14px;
        background: linear-gradient(135deg, rgba(74, 222, 128, 0.12) 0%, rgba(74, 222, 128, 0.03) 100%);
        border: 1px solid rgba(74, 222, 128, 0.24);
        border-radius: 16px;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 12px 22px rgba(0, 0, 0, 0.08);
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
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.24) 0%, rgba(123, 183, 255, 0.11) 100%);
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var _i={};be(_i,{createDefaultToolDefinition:()=>rs,default:()=>eu,deleteTool:()=>co,deleteToolPreset:()=>wi,exportTools:()=>po,getAllTools:()=>Ot,getCurrentToolPreset:()=>Si,getTool:()=>Rs,getToolPresets:()=>uo,importTools:()=>fo,normalizeToolDefinitionToRuntimeConfig:()=>gr,resetTools:()=>go,saveTool:()=>lo,saveToolPreset:()=>xi,setCurrentToolPreset:()=>Ti,setToolEnabled:()=>yo});function Xd(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,s])=>[e,rs({...s||{},id:e})]))}function fr(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function _a(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>0?s:e}function bi(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>=0?s:e}function hi(t={}){return{enabled:t?.enabled===!0,settleMs:bi(t?.settleMs,1200),cooldownMs:bi(t?.cooldownMs,5e3)}}function vi(t={}){return{enabled:t?.enabled===!0,selected:fr(t?.selected)}}function Qd(t=[]){let e=Array.isArray(t)?t.map(s=>({role:String(s?.role||"user").trim().toUpperCase(),content:String(s?.content||"").trim()})).filter(s=>s.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(s=>`\u3010${s.role||"USER"}\u3011
${s.content}`).join(`

`)}function Zd(t,e={}){let s=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(s)return s;let r=Qd(e?.config?.messages||[]);return r||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function rs(t={}){let e=new Date().toISOString(),s=t?.config||{};return{...Ge,...t,id:t?.id||Ge.id,icon:t?.icon||Ge.icon,order:Number.isFinite(t?.order)?t.order:Ge.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:Ge.promptTemplate,extractTags:fr(t?.extractTags),config:{execution:{...Ge.config.execution,...s.execution||{},timeout:_a(s?.execution?.timeout,Ge.config.execution.timeout),retries:Math.max(0,parseInt(s?.execution?.retries,10)||Ge.config.execution.retries)},api:{...Ge.config.api,...s.api||{}},messages:Array.isArray(s?.messages)?s.messages:[],context:{...Ge.config.context,...s.context||{},depth:_a(s?.context?.depth,Ge.config.context.depth),includeTags:fr(s?.context?.includeTags),excludeTags:fr(s?.context?.excludeTags)},automation:hi(s?.automation),worldbooks:vi(s?.worldbooks)},enabled:t?.enabled!==!1,metadata:{...Ge.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function gr(t,e={},s={}){let r=rs({...e,id:t||e?.id||""}),o=fr(r?.extractTags?.length?r.extractTags:r?.config?.context?.includeTags),a=String(e?.output?.apiPreset||r?.config?.api?.preset||"").trim(),n=Zd(t,r),i=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():s.defaultOutputMode||"follow_ai";return{id:r.id||t,name:r.name||t,icon:r.icon||"fa-screwdriver-wrench",description:r.description||"",enabled:r.enabled!==!1,order:Number.isFinite(r.order)?r.order:100,bypass:{enabled:r?.config?.api?.useBypass===!0&&!!r?.config?.api?.bypassPreset,presetId:r?.config?.api?.bypassPreset||""},output:{mode:i,apiPreset:a,overwrite:!0,enabled:!0},automation:hi(r?.config?.automation),worldbooks:vi(r?.config?.worldbooks),extraction:{enabled:!0,maxMessages:_a(r?.config?.context?.depth,5),selectors:o},promptTemplate:n,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:a,extractTags:o,isCustom:!0,category:r.category||"utility",metadata:{...r.metadata||{}}}}function Ot(){let t=se.get(ye.TOOLS),e=Xd(t);return t&&JSON.stringify(t)!==JSON.stringify(e)&&se.set(ye.TOOLS,e),{...io,...e}}function Rs(t){return Ot()[t]||null}function lo(t,e){if(!t||!e)return!1;let s=se.get(ye.TOOLS)||{},r=!s[t]&&!io[t],o=rs({...s[t]||{},...e,id:t,metadata:{...s[t]?.metadata||{},...e.metadata||{},createdAt:s[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return s[t]=o,se.set(ye.TOOLS,s),P.emit(r?C.TOOL_REGISTERED:C.TOOL_UPDATED,{toolId:t,tool:o}),!0}function co(t){let e=se.get(ye.TOOLS)||{};return!e[t]&&!io[t]||io[t]?!1:(delete e[t],se.set(ye.TOOLS,e),P.emit(C.TOOL_UNREGISTERED,{toolId:t}),!0)}function uo(){return se.get(ye.PRESETS)||{}}function xi(t,e){if(!t||!e)return!1;let s=uo(),r=!s[t];return s[t]={...e,name:t,updatedAt:new Date().toISOString()},se.set(ye.PRESETS,s),P.emit(r?C.PRESET_CREATED:C.PRESET_UPDATED,{type:"tool",presetName:t,preset:s[t]}),!0}function wi(t){let e=uo();return e[t]?(delete e[t],se.set(ye.PRESETS,e),P.emit(C.PRESET_DELETED,{type:"tool",presetName:t}),!0):!1}function Si(){return se.get(ye.CURRENT_PRESET)||""}function Ti(t){return se.set(ye.CURRENT_PRESET,t||""),P.emit(C.PRESET_ACTIVATED,{type:"tool",presetName:t}),!0}function yo(t,e){let s=Rs(t);if(!s)return!1;let r=se.get(ye.TOOLS)||{};return r[t]=rs({...s,id:t,enabled:e,metadata:{...s?.metadata||{},createdAt:s?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),se.set(ye.TOOLS,r),P.emit(e?C.TOOL_ENABLED:C.TOOL_DISABLED,{toolId:t,enabled:e}),!0}function po(){let t=se.get(ye.TOOLS)||{},e=se.get(ye.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function fo(t,e=!1){try{let s=typeof e=="object"?!!e?.overwrite:!!e,r=JSON.parse(t);if(!r||typeof r!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let o=s?{}:se.get(ye.TOOLS)||{},a=s?{}:se.get(ye.PRESETS)||{},n=0,i=0;if(r.tools&&typeof r.tools=="object"){for(let[l,c]of Object.entries(r.tools))!c||typeof c!="object"||(o[l]=rs({...c,id:l}),n+=1);se.set(ye.TOOLS,o)}if(r.presets&&typeof r.presets=="object"){for(let[l,c]of Object.entries(r.presets))!c||typeof c!="object"||(a[l]={...c,name:l,updatedAt:new Date().toISOString()},i+=1);se.set(ye.PRESETS,a)}return{success:!0,toolsImported:n,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${n} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function go(){se.remove(ye.TOOLS),se.remove(ye.PRESETS),se.remove(ye.CURRENT_PRESET)}var Ge,io,ye,eu,mo=B(()=>{He();ve();Ge={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},io={},ye={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};eu={getAllTools:Ot,getTool:Rs,saveTool:lo,deleteTool:co,setToolEnabled:yo,exportTools:po,importTools:fo,resetTools:go,getToolPresets:uo,saveToolPreset:xi,deleteToolPreset:wi,getCurrentToolPreset:Si,setCurrentToolPreset:Ti,createDefaultToolDefinition:rs,normalizeToolDefinitionToRuntimeConfig:gr}});var Ki={};be(Ki,{TOOL_CATEGORIES:()=>Ai,TOOL_REGISTRY:()=>Ps,appendToolRuntimeHistory:()=>Ni,clearToolApiPreset:()=>Oi,default:()=>lu,ensureToolRuntimeConfig:()=>bo,getAllDefaultToolConfigs:()=>Ui,getAllToolApiBindings:()=>Di,getAllToolFullConfigs:()=>hr,getEnabledTools:()=>ji,getToolApiPreset:()=>ka,getToolBaseConfig:()=>Os,getToolConfig:()=>br,getToolFullConfig:()=>te,getToolList:()=>Ci,getToolSubTabs:()=>$i,getToolWindowState:()=>Wi,hasTool:()=>Ma,onPresetDeleted:()=>Li,patchToolRuntime:()=>Dt,registerTool:()=>Mi,resetToolConfig:()=>Bi,resetToolRegistry:()=>Ri,saveToolConfig:()=>Ve,saveToolWindowState:()=>zi,setToolApiPreset:()=>Pi,setToolApiPresetConfig:()=>au,setToolBypassConfig:()=>nu,setToolOutputMode:()=>ou,setToolPromptTemplate:()=>iu,unregisterTool:()=>ki,updateToolRuntime:()=>Ca});function as(t={}){let e=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(t?.lastRunAt)?t.lastRunAt:0,lastStatus:typeof t?.lastStatus=="string"?t.lastStatus:"idle",lastError:typeof t?.lastError=="string"?t.lastError:"",lastDurationMs:Number.isFinite(t?.lastDurationMs)?t.lastDurationMs:0,successCount:Number.isFinite(t?.successCount)?t.successCount:0,errorCount:Number.isFinite(t?.errorCount)?t.errorCount:0,lastMessageKey:typeof t?.lastMessageKey=="string"?t.lastMessageKey:"",lastExecutionKey:typeof t?.lastExecutionKey=="string"?t.lastExecutionKey:"",lastExecutionPath:typeof t?.lastExecutionPath=="string"?t.lastExecutionPath:"",lastWritebackStatus:typeof t?.lastWritebackStatus=="string"?t.lastWritebackStatus:"",lastFailureStage:typeof t?.lastFailureStage=="string"?t.lastFailureStage:"",lastSlotBindingKey:typeof t?.lastSlotBindingKey=="string"?t.lastSlotBindingKey:"",lastSlotRevisionKey:typeof t?.lastSlotRevisionKey=="string"?t.lastSlotRevisionKey:"",lastSlotTransactionId:typeof t?.lastSlotTransactionId=="string"?t.lastSlotTransactionId:"",lastSourceMessageId:typeof t?.lastSourceMessageId=="string"?t.lastSourceMessageId:"",lastSourceSwipeId:typeof t?.lastSourceSwipeId=="string"?t.lastSourceSwipeId:"",lastContentCommitted:t?.lastContentCommitted===!0,lastHostCommitApplied:t?.lastHostCommitApplied===!0,lastRefreshRequested:t?.lastRefreshRequested===!0,lastRefreshConfirmed:t?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof t?.lastPreferredCommitMethod=="string"?t.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof t?.lastAppliedCommitMethod=="string"?t.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(t?.lastRefreshMethodCount)?t.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(t?.lastRefreshMethods)?t.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(t?.lastRefreshConfirmChecks)?t.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof t?.lastRefreshConfirmedBy=="string"?t.lastRefreshConfirmedBy:"",lastTraceId:typeof t?.lastTraceId=="string"?t.lastTraceId:"",lastAutoRunAt:Number.isFinite(t?.lastAutoRunAt)?t.lastAutoRunAt:0,lastAutoStatus:typeof t?.lastAutoStatus=="string"?t.lastAutoStatus:"idle",lastAutoMessageId:typeof t?.lastAutoMessageId=="string"?t.lastAutoMessageId:"",lastAutoSwipeId:typeof t?.lastAutoSwipeId=="string"?t.lastAutoSwipeId:"",lastAutoRevisionKey:typeof t?.lastAutoRevisionKey=="string"?t.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof t?.lastAutoWritebackStatus=="string"?t.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:t?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof t?.lastAutoSkipReason=="string"?t.lastAutoSkipReason:"",recentWritebackHistory:e}}function tu(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function Ei(){let t=Ot()||{};return Object.entries(t).filter(([e])=>!mr[e]).map(([e,s])=>[e,s||{}])}function Aa(t={}){return t?.toolKind==="script"?"script":t?.toolKind==="ai"?"ai":t?.output?.mode==="local_transform"||t?.processor?.type?"script":"ai"}function Ii(){let t=Array.isArray(Ps.tools?.subTabs)?Ps.tools.subTabs.map((s,r)=>({...s,order:Number.isFinite(s?.order)?s.order:r,toolKind:Aa(s),toolGroupLabel:Aa(s)==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"})):[],e=Ei().map(([s,r],o)=>{let a=gr(s,r),n=Aa(a);return{id:s,name:a.name||s,icon:a.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(a.order)?a.order:100+o,isCustom:!0,description:a.description||"",toolKind:n,toolGroupLabel:n==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"}});return[...t,...e].sort((s,r)=>(s.order??0)-(r.order??0))}function su(t,e={}){let s=gr(t,e,{defaultOutputMode:"follow_ai"});return{...s,runtime:as(s.runtime)}}function Ia(t){let e=mr[t];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:as(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let r=(Ot()||{})[t]||null;return r?su(t,r):br(t)}function Os(t){let e=Ia(t);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function ru(t,e={},s=""){if(!t)return null;let r={...t,...e,id:t.id||e.id};r.output={...t.output||{},...e.output||{}},r.automation={enabled:t?.automation?.enabled===!0||e?.automation?.enabled===!0,settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(t?.automation?.settleMs)?t.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(t?.automation?.cooldownMs)?t.automation.cooldownMs:5e3},r.bypass={...t.bypass||{},...e.bypass||{}},r.worldbooks={...t.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(t?.worldbooks?.selected)?[...t.worldbooks.selected]:[]},r.runtime=as({...t.runtime||{},...e.runtime||{}}),r.extraction={...t.extraction||{},...e.extraction||{}},r.processor={...t.processor||{},...e.processor||{},options:{...t?.processor?.options||{},...e?.processor?.options||{}}};let o=e?.output?.apiPreset||e?.apiPreset||r.output?.apiPreset||r.apiPreset||s||"";return r.output={...r.output||{},apiPreset:o},r.apiPreset=o,(!Array.isArray(r.extraction.selectors)||r.extraction.selectors.length===0)&&Array.isArray(r.extractTags)&&r.extractTags.length>0&&(r.extraction.selectors=[...r.extractTags]),(!Array.isArray(r.extractTags)||r.extractTags.length===0)&&(r.extractTags=Array.isArray(r.extraction.selectors)?[...r.extraction.selectors]:[]),t.isCustom?r.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?r.enabled=e.enabled:r.enabled=t.enabled!==!1,r}function Mi(t,e){if(!t||typeof t!="string")return Ce.error("\u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return Ce.error("\u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let r of s)if(!e[r])return Ce.error(` \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${r}`),!1;return ct[t]={id:t,...e,order:e.order??Object.keys(ct).length},Ce.log(` \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function ki(t){return ct[t]?(delete ct[t],Ce.log(` \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(Ce.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function Ci(t=!0){let e=Object.values(ct).map(s=>s.id==="tools"?{...s,subTabs:Ii()}:s);return t?e.sort((s,r)=>(s.order??0)-(r.order??0)):e}function br(t){return t==="tools"&&ct[t]?{...ct[t],subTabs:Ii()}:ct[t]||null}function Ma(t){return!!ct[t]}function $i(t){let e=br(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function Ri(){ct={...Ps},Ce.log("\u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Pi(t,e){if(!Ma(t))return Ce.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let s=k.get(Ye)||{};return s[t]=e||"",k.set(Ye,s),Ce.log(` \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function ka(t){return(k.get(Ye)||{})[t]||""}function Oi(t){let e=k.get(Ye)||{};delete e[t],k.set(Ye,e),Ce.log(` \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function Di(){return k.get(Ye)||{}}function Li(t){let e=k.get(Ye)||{},s=!1;for(let r in e)e[r]===t&&(e[r]="",s=!0,Ce.log(` \u5DE5\u5177 "${r}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&k.set(Ye,e)}function te(t){let e=Ia(t);if(!e)return br(t);let r=(k.get(os)||{})[t]||{},o=ka(t);return ru({...e,id:t},r,o)}function bo(t){if(!t)return!1;let e=Ia(t);if(!e)return!1;let s=k.get(os)||{};if(s[t])return!0;let r={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};s[t]=r,k.set(os,s);let o=k.get(Ye)||{};return o[t]=r.output?.apiPreset||r.apiPreset||"",k.set(Ye,o),P.emit(C.TOOL_UPDATED,{toolId:t,config:r}),!0}function Ve(t,e,s={}){if(!t||!te(t))return Ce.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:r=!0}=s,o=k.get(os)||{},a=k.get(Ye)||{},n=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return o[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){o[t][l]={...e.output,apiPreset:n};return}if(l==="apiPreset"){o[t][l]=n;return}o[t][l]=e[l]}}),o[t].apiPreset===void 0&&(o[t].apiPreset=n),!o[t].output&&e.output!==void 0&&(o[t].output={...e.output||{},apiPreset:n}),k.set(os,o),a[t]=n,k.set(Ye,a),r&&P.emit(C.TOOL_UPDATED,{toolId:t,config:o[t]}),Ce.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function ou(t,e){let s=te(t);return s?Ve(t,{...s,output:{...s.output,mode:e}}):!1}function au(t,e){let s=te(t);return s?Ve(t,{...s,apiPreset:e,output:{...s.output,apiPreset:e}}):!1}function nu(t,e){let s=te(t);return s?Ve(t,{...s,bypass:{...s.bypass,...e}}):!1}function iu(t,e){let s=te(t);return s?Ve(t,{...s,promptTemplate:e}):!1}function Dt(t,e,s={}){let r=te(t);if(!r)return!1;let{touchLastRunAt:o=!1,emitEvent:a=!1,emitRuntimeEvent:n=!0}=s,i=as({...r.runtime||{},...e||{}});o&&(i.lastRunAt=Date.now());let l=Ve(t,{...r,runtime:i},{emitEvent:a});return l&&n&&P.emit(C.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:i,previousRuntime:as(r.runtime||{})}),l}function Ni(t,e,s={},r={}){let o=te(t);if(!o)return!1;let{limit:a=10,emitEvent:n=!1,emitRuntimeEvent:i=!0}=r,l=as(o.runtime||{}),c=as(o.runtime||{}),d="recentWritebackHistory",u={id:s?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:s?.at||Date.now(),...s};l[d]=tu([...Array.isArray(l[d])?l[d]:[],u],a),u?.traceId&&(l.lastTraceId=u.traceId);let y=Ve(t,{...o,runtime:l},{emitEvent:n});return y&&i&&P.emit(C.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:l,previousRuntime:c,historyType:e,historyEntry:u}),y}function Ca(t,e,s={}){let{touchLastRunAt:r=!0,emitEvent:o=!1,emitRuntimeEvent:a=!0}=s;return Dt(t,e,{touchLastRunAt:r,emitEvent:o,emitRuntimeEvent:a})}function Bi(t){if(!t||!mr[t])return Ce.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=k.get(os)||{};return delete e[t],k.set(os,e),P.emit(C.TOOL_UPDATED,{toolId:t,config:null}),Ce.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function Ui(){return{...mr}}function hr(){let t=new Set([...Object.keys(mr),...Ei().map(([e])=>e)]);return Array.from(t).map(e=>te(e)).filter(Boolean)}function ji(){return hr().filter(t=>t&&t.enabled)}function zi(t,e){let s=k.get(Ea)||{};s[t]={...e,updatedAt:Date.now()},k.set(Ea,s)}function Wi(t){return(k.get(Ea)||{})[t]||null}var Ce,os,Ye,Ea,mr,Ps,Ai,ct,lu,Lt=B(()=>{He();ve();ae();mo();Ce=N.createScope("ToolRegistry"),os="tool_configs",Ye="tool_api_bindings",Ea="tool_window_states";mr={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},Ps={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},toolManage:{id:"toolManage",name:"\u5DE5\u5177\u5217\u8868",icon:"fa-screwdriver-wrench",hasSubTabs:!1,description:"\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u7BA1\u7406\u81EA\u5B9A\u4E49\u5DE5\u5177",component:"ToolManagePanel",order:3},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel",toolKind:"ai"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel",toolKind:"ai"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel",toolKind:"ai"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel",toolKind:"script"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel",toolKind:"script"}]},tableWorkbench:{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",icon:"fa-table-cells",hasSubTabs:!1,description:"\u7ED3\u6784\u5316\u586B\u8868\u4E0E\u72B6\u6001\u9884\u89C8\u5DE5\u4F5C\u53F0",component:"TableWorkbenchPanel",order:5},bypass:{id:"bypass",name:"Ai\u6307\u4EE4\u9884\u8BBE",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406 Ai \u6307\u4EE4\u9884\u8BBE",component:"BypassPanel",order:6},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:7},logger:{id:"logger",name:"\u65E5\u5FD7",icon:"fa-terminal",hasSubTabs:!1,description:"\u67E5\u770B\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7\uFF0C\u652F\u6301\u8FC7\u6EE4\u4E0E\u5BFC\u51FA",component:"LoggerPanel",order:8}},Ai={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},ct={...Ps};lu={TOOL_REGISTRY:Ps,TOOL_CATEGORIES:Ai,registerTool:Mi,unregisterTool:ki,getToolList:Ci,getToolConfig:br,hasTool:Ma,getToolSubTabs:$i,resetToolRegistry:Ri,setToolApiPreset:Pi,getToolApiPreset:ka,clearToolApiPreset:Oi,getAllToolApiBindings:Di,onPresetDeleted:Li,saveToolWindowState:zi,getToolWindowState:Wi,getToolBaseConfig:Os,ensureToolRuntimeConfig:bo,getToolFullConfig:te,patchToolRuntime:Dt,appendToolRuntimeHistory:Ni,saveToolConfig:Ve,resetToolConfig:Bi,getAllDefaultToolConfigs:Ui,getAllToolFullConfigs:hr,getEnabledTools:ji}});var ns,$a=B(()=>{Ae();mo();Lt();ns={id:"toolManagePanel",_removeDialog(t){if(!t?.length)return;let e=t.find("#yyt-tool-dialog-overlay");xe(e,"yytToolManageDialogSelect"),e.remove()},_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let s=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!s){w("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}s.switchMainTab("tools"),s.switchSubTab("tools",t)},render(t){let e=Ot(),s=Object.entries(e),r=s.filter(([,o])=>o?.enabled!==!1).length;return`
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
                <strong class="yyt-tool-manage-stat-value">${r}</strong>
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
    `},_renderToolList(t){let e=Object.entries(t);return e.length?e.map(([s,r])=>`
      <div class="yyt-tool-item ${r.enabled?"yyt-tool-item-enabled":"yyt-tool-item-disabled"}" data-tool-id="${s}">
        <div class="yyt-tool-header">
          <div class="yyt-tool-info">
            <span class="yyt-tool-name">${b(r.name)}</span>
            <span class="yyt-tool-category">${b(r.category)}</span>
          </div>
          <div class="yyt-tool-controls">
            <label class="yyt-toggle yyt-tool-toggle">
              <input type="checkbox" ${r.enabled?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="yyt-tool-desc">${b(r.description)}</div>
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
      `},bindEvents(t,e){let s=D();!s||!j(t)||(t.off(".yytToolManage"),this._bindToolEvents(t,s),this._bindFileEvents(t,s))},_bindToolEvents(t,e){t.on("change.yytToolManage",".yyt-tool-toggle input",s=>{let r=e(s.currentTarget).closest(".yyt-tool-item"),o=r.data("tool-id"),a=e(s.currentTarget).is(":checked");yo(o,a),r.toggleClass("yyt-tool-item-enabled",a).toggleClass("yyt-tool-item-disabled",!a),w("info",a?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.on("click.yytToolManage","#yyt-add-tool",()=>{this._showToolEditDialog(t,e,null)}),t.on("click.yytToolManage",'.yyt-tool-item [data-action="config"]',s=>{let r=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._openToolConfig(r)}),t.on("click.yytToolManage",'.yyt-tool-item [data-action="edit"]',s=>{let r=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._showToolEditDialog(t,e,r)}),t.on("click.yytToolManage",'.yyt-tool-item [data-action="delete"]',s=>{let r=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id"),o=Rs(r);if(!r||!o||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177\u201C${o.name}\u201D\u5417\uFF1F`))return;if(!co(r)){w("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),w("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.on("click.yytToolManage","#yyt-import-tools",()=>{t.find("#yyt-import-tools-file").click()}),t.on("change.yytToolManage","#yyt-import-tools-file",async s=>{let r=s.target.files[0];if(r){try{let o=await vt(r),a=fo(o,{overwrite:!1});w(a.success?"success":"error",a.message),a.success&&this.renderTo(t)}catch(o){w("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.on("click.yytToolManage","#yyt-export-tools",()=>{try{let s=po();ht(s,`youyou_toolkit_tools_${Date.now()}.json`),w("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){w("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.on("click.yytToolManage","#yyt-reset-tools",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(go(),this.renderTo(t),w("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,s){let r=s?Rs(s):null,o=!!r,a=`
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
                       value="${r?b(r.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${r?b(r.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;this._removeDialog(t),t.append(a);let n=t.find("#yyt-tool-dialog-overlay"),i=n.find("#yyt-tool-name"),l=n.find("#yyt-tool-category"),c=n.find("#yyt-tool-desc"),d=n.find("#yyt-tool-timeout"),u=n.find("#yyt-tool-retries");ke(n,{namespace:"yytToolManageDialogSelect",selectors:["#yyt-tool-category"]});let y=()=>{xe(n,"yytToolManageDialogSelect"),n.remove()};n.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",y),n.on("click",function(p){p.target===this&&y()}),n.find("#yyt-tool-dialog-save").on("click",()=>{let p=i.val().trim(),f=l.val(),x=c.val().trim(),v=parseInt(d.val())||6e4,_=parseInt(u.val())||3;if(!p){w("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let A=s||`tool_${Date.now()}`;if(!lo(A,{name:p,category:f,description:x,promptTemplate:r?.promptTemplate||"",extractTags:Array.isArray(r?.extractTags)?r.extractTags:[],config:{execution:{timeout:v,retries:_},api:r?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(r?.config?.messages)?r.config.messages:[],context:{depth:r?.config?.context?.depth||3,includeTags:Array.isArray(r?.config?.context?.includeTags)?r.config.context.includeTags:[],excludeTags:Array.isArray(r?.config?.context?.excludeTags)?r.config.context.excludeTags:[]},worldbooks:{enabled:r?.config?.worldbooks?.enabled===!0,selected:Array.isArray(r?.config?.worldbooks?.selected)?r.config.worldbooks.selected:[]}},enabled:r?.enabled!==!1})){w("error",o?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}bo(A),y(),this.renderTo(t),w("success",o?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),o||this._openToolConfig(A)})},destroy(t){!D()||!j(t)||(this._removeDialog(t),t.off(".yytToolManage"))},getStyles(){return`
      /* \u5DE5\u5177\u7BA1\u7406\u9762\u677F\u6837\u5F0F */
      .yyt-tool-manager {
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-height: 100%;
      }

      .yyt-tool-manage-hero {
        position: relative;
        overflow: hidden;
        gap: 16px;
        border-radius: 26px;
        background:
          radial-gradient(520px 220px at 0% 0%, rgba(123, 183, 255, 0.16), transparent 62%),
          linear-gradient(145deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.025) 100%);
      }

      .yyt-tool-manage-hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 16px;
        align-items: stretch;
      }

      .yyt-tool-manage-copy {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .yyt-tool-manage-lead {
        font-size: 24px;
        font-weight: 900;
        line-height: 1.1;
        letter-spacing: -0.2px;
        color: var(--yyt-text);
      }

      .yyt-tool-list {
        display: flex;
        flex-direction: column;
        gap: 14px;
        min-height: 0;
        overflow-y: auto;
        padding-right: 4px;
      }

      .yyt-tool-manage-hint {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.75;
        max-width: 64ch;
      }

      .yyt-tool-manage-stats {
        display: grid;
        grid-template-columns: repeat(2, minmax(150px, 1fr));
        gap: 12px;
      }

      .yyt-tool-manage-stat {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        padding: 16px;
        border-radius: 20px;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%),
          rgba(5, 10, 18, 0.18);
        border: 1px solid rgba(255, 255, 255, 0.12);
        min-width: 150px;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
      }

      .yyt-tool-manage-stat-label {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.58);
        text-transform: uppercase;
        letter-spacing: 0.48px;
      }

      .yyt-tool-manage-stat-value {
        font-size: 28px;
        font-weight: 900;
        color: var(--yyt-text);
        line-height: 1;
      }

      .yyt-tool-item {
        position: relative;
        overflow: hidden;
        padding: 18px;
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.025) 100%),
          rgba(255, 255, 255, 0.01);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 22px;
        transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 14px 32px rgba(0, 0, 0, 0.12);
      }

      .yyt-tool-item::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, rgba(255, 255, 255, 0.05) 0%, transparent 40%, transparent 70%, rgba(255, 255, 255, 0.02) 100%);
        pointer-events: none;
      }

      .yyt-tool-item:hover {
        border-color: rgba(123, 183, 255, 0.2);
        transform: translateY(-2px);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 18px 36px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(123, 183, 255, 0.06);
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.085) 0%, rgba(255, 255, 255, 0.03) 100%),
          rgba(255, 255, 255, 0.012);
      }

      .yyt-tool-item.yyt-tool-item-disabled {
        opacity: 0.6;
        filter: saturate(0.8);
      }

      .yyt-tool-item.yyt-tool-item-enabled {
        border-color: rgba(74, 222, 128, 0.16);
      }

      .yyt-tool-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 12px;
        gap: 14px;
      }

      .yyt-tool-info {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
        flex-wrap: wrap;
      }

      .yyt-tool-name {
        font-weight: 900;
        font-size: 17px;
        color: var(--yyt-text);
      }

      .yyt-tool-category {
        font-size: 10px;
        padding: 5px 10px;
        background: rgba(123, 183, 255, 0.14);
        border-radius: 999px;
        color: var(--yyt-accent-strong);
        border: 1px solid rgba(123, 183, 255, 0.2);
        text-transform: uppercase;
        letter-spacing: 0.45px;
        font-weight: 800;
      }

      .yyt-tool-desc {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.74);
        margin-bottom: 16px;
        line-height: 1.75;
      }

      .yyt-tool-actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .yyt-tool-actions .yyt-btn-secondary {
        background: rgba(255, 255, 255, 0.07);
      }

      .yyt-tool-actions .yyt-btn-danger {
        margin-left: auto;
      }

      .yyt-tool-controls {
        flex-shrink: 0;
        padding-top: 2px;
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});function Ds(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function ho(){return Ds()?.SillyTavern||null}function Z(t){return t==null?"":String(t).trim()}function du(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let s of e)if(typeof s=="string"&&s.trim())return s.trim();return""}function uu(t){let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||t?.is_user===!0?"user":t?.is_system===!0?"system":"assistant"}function Fi(t=""){let e=String(t||"").trim();if(!e)return"empty";let s=0;for(let r=0;r<e.length;r+=1)s=(s<<5)-s+e.charCodeAt(r),s|=0;return`fp_${Math.abs(s).toString(36)}`}function Hi(t={}){let e=Z(t.chatId)||"chat_default",s=Z(t.messageId)||"latest";return`${e}::${s}`}function qi(t={}){let e=Hi(t),s=Z(t.effectiveSwipeId)||"swipe:current",r=Z(t.assistantContentFingerprint)||"empty";return`${e}::${s}::${r}`}function yu(t={}){let e=qi(t),s=Z(t.eventType)||"MANUAL",r=Z(t.traceId)||Gi("manual");return`${e}::${s}::${r}`}function Gi(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function Yi(){let t=ho();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function Vi(t=[]){let e=[],s=null,r=null;return t.forEach((o,a)=>{let n=uu(o),i=du(o);if(!i)return;let l=Z(o?.messageId??o?.message_id??o?.id??o?.mid??o?.mesid??o?.chat_index??a),c=Z(o?.swipe_id??o?.swipeId??o?.swipe??""),d={role:n,content:i,sourceId:l,swipeId:c,raw:o,index:a};e.push(d),n==="user"&&(s=d),n==="assistant"&&(r=d)}),{messages:e,lastUserMessage:s,lastAiMessage:r}}function pu(t,e,s){return Z(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.this_chid??s?.id??"chat_default")||"chat_default"}async function Ra(){let t=ho();if(!t)return null;try{let e=t.this_chid,s=t.characters||[];if(e>=0&&e<s.length){let r=s[e];return{id:e,name:r?.name||"",description:r?.description||"",personality:r?.personality||"",scenario:r?.scenario||"",firstMes:r?.first_mes||"",mesExample:r?.mes_example||""}}}catch(e){cu.error("\u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function fu(t="",e=null){let s=String(t||""),r=e?.YouYouToolkit_toolOutputs;return r&&typeof r=="object"&&Object.values(r).forEach(o=>{let a=String(o?.blockText||o?.content||"").trim();a&&s.includes(a)&&(s=s.replace(a,"").trimEnd())}),s.trim()}function gu(t,e={}){let s=Array.isArray(t?.messages)?t.messages:[],r=Z(e.messageId),o=Z(e.swipeId);if(!r)return t?.lastAiMessage||null;let a=s.filter(i=>i.role==="assistant"),n=a.find(i=>i.sourceId!==r?!1:o?Z(i.swipeId)===o:!0);return n||a.find(i=>i.sourceId===r)||null}function Ji({api:t,stContext:e,character:s,conversation:r,targetAssistantMessage:o,runSource:a="MANUAL"}={}){let n=r?.messages||[],i=r?.lastUserMessage||null,l=Z(o?.sourceId)||"",c=Z(o?.swipeId)||"swipe:current",d=o?.content||"",u=fu(d,o?.raw||null),y=Fi(d),p=Fi(u),f=pu(t,e,s),x=Gi(String(a||"manual").toLowerCase()),v=Hi({chatId:f,messageId:l}),_=qi({chatId:f,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:p});return{startedAt:Date.now(),runSource:a,traceId:x,chatId:f,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:v,slotRevisionKey:_,slotTransactionId:yu({chatId:f,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:p,eventType:a,traceId:x}),executionKey:_,lastAiMessage:d,assistantContentFingerprint:y,assistantBaseText:u,assistantBaseFingerprint:p,lastAiMessageSwipeId:c,confirmedAssistantSwipeId:c,effectiveSwipeId:c,sourceMessageId:l,sourceSwipeId:c,lastUserMessage:i?.content||"",userMessage:i?.content||"",targetAssistantMessage:o,chatMessages:n,characterCard:s,chatHistory:n,input:{userMessage:i?.content||"",lastAiMessage:d,assistantBaseText:u,extractedContent:"",previousToolOutput:"",context:{character:s?.name||"",chatLength:n.length||0}},config:{},status:"pending"}}async function is({runSource:t="MANUAL"}={}){let e=ho(),s=e?.getContext?.()||null,r=await Ra(),o=Yi(),a=Vi(o),n=a?.lastAiMessage||null;return Ji({api:e,stContext:s,character:r,conversation:a,targetAssistantMessage:n,runSource:t})}async function vr({messageId:t,swipeId:e="",runSource:s="AUTO"}={}){let r=ho(),o=r?.getContext?.()||null,a=await Ra(),n=Yi(),i=Vi(n),l=gu(i,{messageId:t,swipeId:e});return Ji({api:r,stContext:o,character:a,conversation:i,targetAssistantMessage:l,runSource:s})}var cu,Ls=B(()=>{ae();cu=N.createScope("ExecutionContext")});function Xi(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return Ds()?.TavernHelper||null}function mu(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return Ds()?.SillyTavern||null}function wr(t){return Array.isArray(t)?Array.from(new Set(t.map(e=>String(e||"").trim()).filter(Boolean))):[]}function Pa(t){if(Array.isArray(t))return t.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(t&&typeof t=="object"){let e={};return Object.keys(t).forEach(s=>{let r=t[s];Array.isArray(r)?e[s]=r.map(o=>typeof o=="string"?o:o&&typeof o=="object"?o.name||o.id||o.title||"[object]":String(o??"")):r&&typeof r=="object"?e[s]="[object]":e[s]=r}),e}return t}function bu(t={}){let e=typeof t.content=="string"?t.content.trim():"";if(!e)return"";let s=[t.comment,t.key,t.keysecondary,t.text].map(r=>String(r||"").trim()).find(Boolean);return s&&s!==e?`## ${s}
${e}`:e}function Sr(){return Array.isArray(Oa)?[...Oa]:[]}function Qi(){return Da?{...Da}:null}async function hu(t){if(!t||typeof t.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(t.getCharLorebooks({type:"all"}));return wr([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return xr.warn("\u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function vu(t,e){if(t&&typeof t.getLorebooks=="function")try{let s=wr(await Promise.resolve(t.getLorebooks()));if(s.length>0)return s}catch(s){xr.warn("\u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",s)}if(e&&typeof e.getWorldBooks=="function")try{let s=await Promise.resolve(e.getWorldBooks()),r=wr(Array.isArray(s)?s.map(o=>o?.name??o):[]);if(r.length>0)return r}catch(s){xr.warn("\u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",s)}return[]}async function Zi(){let t=Xi(),e=mu(),s={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!Ds()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!Ds()?.SillyTavern,helperKeys:t?Object.keys(t).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof t?.getLorebooks,getCharLorebooksType:typeof t?.getCharLorebooks,getLorebookEntriesType:typeof t?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{s.rawResults.getLorebooks=t&&typeof t.getLorebooks=="function"?Pa(await Promise.resolve(t.getLorebooks())):"[unavailable]"}catch(n){s.errors.push(`getLorebooks: ${n?.message||n}`)}try{s.rawResults.getCharLorebooks=t&&typeof t.getCharLorebooks=="function"?Pa(await Promise.resolve(t.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(n){s.errors.push(`getCharLorebooks: ${n?.message||n}`)}try{s.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?Pa(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(n){s.errors.push(`getWorldBooks: ${n?.message||n}`)}let r=await hu(t),o=await vu(t,e),a=wr([...r,...o]);return s.characterWorldbooks=[...r],s.allWorldbooks=[...o],s.combinedWorldbooks=[...a],Da=s,Oa=a,[...a]}async function el(t){let e=wr(t?.worldbooks?.selected);if(t?.worldbooks?.enabled!==!0||e.length===0)return"";let s=Xi();if(!s||typeof s.getLorebookEntries!="function")return xr.warn("TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let r=[];for(let o of e)try{let a=await s.getLorebookEntries(o),i=(Array.isArray(a)?a.filter(l=>l?.enabled!==!1):[]).map(bu).filter(Boolean).join(`

`);i&&r.push(`[\u4E16\u754C\u4E66\uFF1A${o}]
${i}`)}catch(a){xr.warn(`\u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${o}`,a)}return r.join(`

`)}var xr,Oa,Da,La=B(()=>{Ls();ae();xr=N.createScope("ToolWorldbookService"),Oa=[],Da=null});var tl={};be(tl,{BypassManager:()=>vo,DEFAULT_BYPASS_PRESETS:()=>Tt,addMessage:()=>$u,buildBypassMessages:()=>Lu,bypassManager:()=>H,createPreset:()=>_u,default:()=>Nu,deleteMessage:()=>Pu,deletePreset:()=>Eu,duplicatePreset:()=>Iu,exportPresets:()=>Ou,getAllPresets:()=>Su,getDefaultPresetId:()=>Mu,getEnabledMessages:()=>Cu,getPreset:()=>Tu,getPresetList:()=>Tr,importPresets:()=>Du,setDefaultPresetId:()=>ku,updateMessage:()=>Ru,updatePreset:()=>Au});var xu,St,Ns,Na,Tt,wu,vo,H,Su,Tr,Tu,_u,Au,Eu,Iu,Mu,ku,Cu,$u,Ru,Pu,Ou,Du,Lu,Nu,Bs=B(()=>{He();ve();ae();xu=N.createScope("BypassManager"),St="bypass_presets",Ns="default_bypass_preset",Na="current_bypass_preset",Tt={},wu=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),vo=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=k.get(St,{});return this._cache={...Tt,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((s,r)=>(r.updatedAt||0)-(s.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:s,name:r,description:o,messages:a}=e;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let n=s.trim();if(this.presetExists(n))return{success:!1,message:`\u9884\u8BBE "${n}" \u5DF2\u5B58\u5728`};let i={id:n,name:r.trim(),description:o||"",enabled:!0,messages:a||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(n,i),P.emit(C.BYPASS_PRESET_CREATED,{presetId:n,preset:i}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${n}`),{success:!0,message:`\u9884\u8BBE "${r}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,s){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let o={...r,...s,id:e,updatedAt:Date.now()};return this._savePreset(e,o),P.emit(C.BYPASS_PRESET_UPDATED,{presetId:e,preset:o}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u66F4\u65B0\u6210\u529F`,preset:o}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(Tt[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r=k.get(St,{});return delete r[e],k.set(St,r),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),P.emit(C.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,s,r){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${e}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let a={...JSON.parse(JSON.stringify(o)),id:s.trim(),name:r||`${o.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),a),P.emit(C.BYPASS_PRESET_CREATED,{presetId:s,preset:a}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${a.name}"`,preset:a}}addMessage(e,s){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o={id:`msg_${Date.now()}`,role:s.role||"SYSTEM",content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1},a=[...r.messages||[],o];return this.updatePreset(e,{messages:a})}updateMessage(e,s,r){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let a=o.messages||[],n=a.findIndex(l=>l.id===s);if(n===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let i=[...a];return i[n]={...i[n],...r},this.updatePreset(e,{messages:i})}deleteMessage(e,s){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=r.messages||[],a=o.find(i=>i.id===s);if(!a)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(a.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let n=o.filter(i=>i.id!==s);return this.updatePreset(e,{messages:n})}getEnabledMessages(e){let s=this.getPreset(e);return!s||!s.enabled?[]:(s.messages||[]).filter(r=>r.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=k.get(Ns,null);return e==="undefined"||e==="null"||e===""?(k.remove(Ns),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(k.set(Ns,e),P.emit(C.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let r=this.getPreset(e);if(!r)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(e,s={}){let{overwrite:r=!1}=s,o;try{o=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let a=Array.isArray(o)?o:o.presets?o.presets:[o];if(a.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let n=k.get(St,{}),i=0;for(let l of a)!l.id||typeof l.id!="string"||l.name&&(Tt[l.id]&&!r||!r&&n[l.id]||(n[l.id]={...l,updatedAt:Date.now()},i++));return i>0&&(k.set(St,n),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u9884\u8BBE`,imported:i}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let s=e?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(e){let s=this.getToolBypassPreset(e);return s?this.getEnabledMessages(s.id):[]}_savePreset(e,s){let r=k.get(St,{});r[e]=s,k.set(St,r),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=k.get(St,{}),s={},r=!1,o=Array.isArray(e)?e.map((a,n)=>[a?.id||a?.name||`legacy_${n}`,a]):Object.entries(e||{});for(let[a,n]of o){let i=this._normalizePreset(a,n,s);if(!i){r=!0;continue}s[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(r=!0)}r&&k.set(St,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(e,s,r={}){if(!s||typeof s!="object")return null;let o=typeof s.name=="string"?s.name.trim():"",a=typeof s.id=="string"?s.id.trim():"",n=typeof e=="string"?e.trim():"";if(!o&&n&&n!=="undefined"&&n!=="null"&&(o=n),this._isLegacySamplePreset(o,a)||(!a&&n&&n!=="undefined"&&n!=="null"&&(a=n),!a&&o&&o!=="undefined"&&o!=="null"&&(a=this._generatePresetId(o,r)),!o||!a||a==="undefined"||o==="undefined"))return null;let l=Array.isArray(s.messages)?s.messages.filter(c=>c&&typeof c=="object").map((c,d)=>({id:typeof c.id=="string"&&c.id.trim()?c.id.trim():`${a}_msg_${d+1}`,role:c.role||"SYSTEM",content:typeof c.content=="string"?c.content:"",enabled:c.enabled!==!1,deletable:c.deletable!==!1})):[];return{...s,id:a,name:o,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:l,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(e){let s=k.get(Ns,null),r=k.get(Na,null),o=s??r;(o==="undefined"||o==="null"||o==="")&&(o=null),o&&!e[o]&&(o=Object.values(e).find(n=>n.name===o)?.id||null),o?k.set(Ns,o):k.remove(Ns),k.has(Na)&&k.remove(Na)}_isLegacySamplePreset(e,s=""){return e?s==="standard"||s==="enhanced"||s==="jailbreak"||wu.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,s={}){let r=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,o=r,a=1;for(;s[o];)o=`${r}_${a++}`;return o}_log(...e){xu.debug(e[0],e.length>1?e.slice(1):void 0)}},H=new vo,Su=()=>H.getAllPresets(),Tr=()=>H.getPresetList(),Tu=t=>H.getPreset(t),_u=t=>H.createPreset(t),Au=(t,e)=>H.updatePreset(t,e),Eu=t=>H.deletePreset(t),Iu=(t,e,s)=>H.duplicatePreset(t,e,s),Mu=()=>H.getDefaultPresetId(),ku=t=>H.setDefaultPresetId(t),Cu=t=>H.getEnabledMessages(t),$u=(t,e)=>H.addMessage(t,e),Ru=(t,e,s)=>H.updateMessage(t,e,s),Pu=(t,e)=>H.deleteMessage(t,e),Ou=t=>H.exportPresets(t),Du=(t,e)=>H.importPresets(t,e),Lu=t=>H.buildBypassMessages(t),Nu=H});var sl={};be(sl,{DEFAULT_SETTINGS:()=>_r,SettingsService:()=>xo,default:()=>Bu,settingsService:()=>Je});var _r,Ba,xo,Je,Bu,Ar=B(()=>{He();ve();_r={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue",startupScreenDismissed:!1}},Ba="settings_v2",xo=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=k.get(Ba,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),k.set(Ba,this._cache),P.emit(C.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let s=this.getSettings(),r=this._deepMerge(s,e);this.saveSettings(r)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(_r)),k.set(Ba,this._cache),P.emit(C.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,s=null){let r=this.getSettings(),o=e.split("."),a=r;for(let n of o)if(a&&typeof a=="object"&&n in a)a=a[n];else return s;return a}set(e,s){let r=JSON.parse(JSON.stringify(this.getSettings())),o=e.split("."),a=r;for(let n=0;n<o.length-1;n+=1){let i=o[n];i in a||(a[i]={}),a=a[i]}a[o[o.length-1]]=s,this.saveSettings(r)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(_r)),e)}_deepMerge(e,s){let r={...e};for(let o in s)s[o]&&typeof s[o]=="object"&&!Array.isArray(s[o])?r[o]=this._deepMerge(e[o]||{},s[o]):r[o]=s[o];return r}},Je=new xo,Bu=Je});var ol={};be(ol,{ContextInjector:()=>So,DEFAULT_INJECTION_OPTIONS:()=>rl,WRITEBACK_METHODS:()=>Me,WRITEBACK_RESULT_STATUS:()=>wo,contextInjector:()=>We,default:()=>Hu});function Er(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function ju(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function zu(t){try{return t?.SillyTavern?.getContext?.()||null}catch{return null}}function Wu(){let t=ju(),e=t?.SillyTavern||null,s=zu(t),r=e?.eventSource||t?.eventSource||s?.eventSource||null,o=e?.eventTypes||e?.event_types||s?.eventTypes||s?.event_types||t?.eventTypes||t?.event_types||{};return{topWindow:t,api:e,context:s,eventSource:r,eventTypes:o,source:e?.eventSource?"SillyTavern.eventSource":t?.eventSource?"topWindow.eventSource":s?.eventSource?"SillyTavern.getContext().eventSource":"unavailable"}}function dt(t,e){let s=String(e||"").trim();return s?Array.isArray(t)?(t.includes(s)||t.push(s),t):[s]:t}function js(t={}){if(t?.signal?.aborted)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE";if(typeof t?.shouldAbortWriteback=="function")try{if(t.shouldAbortWriteback()===!0)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}catch{return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}return""}var Uu,Be,Us,rl,wo,Me,Ku,Fu,So,We,Hu,ls=B(()=>{ve();ae();Uu=N.createScope("ContextInjector"),Be="YouYouToolkit_toolOutputs",Us="YouYouToolkit_injectedContext",rl={overwrite:!0,enabled:!0};wo={SUCCESS:"success",FAILED:"failed"},Me={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},Ku=60,Fu=3;So=class{constructor(){this.debugMode=!1}async inject(e,s,r={}){return(await this.injectDetailed(e,s,r)).success}async injectDetailed(e,s,r={}){let o={...rl,...r},a=this._createWritebackResult(e,o);if(!e||s===void 0||s===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),a.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",a;if(!Er(o.sourceMessageId))return this._log("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),a.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",a;if(o?.signal?.aborted)return a.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",a;if(typeof o?.shouldAbortWriteback=="function")try{if(o.shouldAbortWriteback()===!0)return a.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",a}catch{return a.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",a}let n=a.chatId,i={toolId:e,content:String(s),updatedAt:Date.now(),sourceMessageId:o.sourceMessageId||null,sourceSwipeId:o.sourceSwipeId||o.effectiveSwipeId||null,options:o};P.emit(C.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:n,content:i.content,sourceMessageId:i.sourceMessageId,sourceSwipeId:i.sourceSwipeId,effectiveSwipeId:i.sourceSwipeId,slotBindingKey:o.slotBindingKey||"",slotRevisionKey:o.slotRevisionKey||"",slotTransactionId:o.slotTransactionId||"",traceId:o.traceId||"",sessionKey:o.sessionKey||"",options:o});let l=await this._insertToolOutputToBoundAssistantSlot(e,i,o,a);return l.success&&this._log(`\u6CE8\u5165\u6210\u529F: ${e} -> ${n}`,l),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:s}=this._getChatRuntime(),r=this._findAssistantMessageIndex(s,e);if(r<0)return"";let o=s[r]||{},a=o[Us];if(typeof a=="string"&&a.trim())return a.trim();let n=o[Be];return n&&typeof n=="object"?this._buildMessageInjectedContext(n).trim():""}catch(s){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",s),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),s=this._findAssistantMessageIndex(e,null);if(s<0)return{};let o=(e[s]||{})[Be];return o&&typeof o=="object"?o:{}}catch(e){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",e),{}}}getToolContext(e,s){if(!s)return null;try{let{chat:r}=this._getChatRuntime(),o=this._findAssistantMessageIndex(r,null);return o<0?null:r[o]?.[Be]?.[s]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,s){if(!s)return!1;try{let{api:r,context:o,chat:a}=this._getChatRuntime(),n=this._findAssistantMessageIndex(a,null);if(n<0)return!1;let i=a[n],l=i?.[Be];if(!l||!l[s])return!1;delete l[s],i[Be]=l,i[Us]=this._buildMessageInjectedContext(l);let c=o?.saveChat||r?.saveChat||null;return typeof c=="function"&&await c.call(o||r),P.emit(C.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:s}),!0}catch(r){return this._log("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",r),!1}}async clearAllContext(e){try{let{api:s,context:r,chat:o}=this._getChatRuntime(),a=this._findAssistantMessageIndex(o,null);if(a<0)return!1;let n=o[a];delete n[Be],delete n[Us];let i=r?.saveChat||s?.saveChat||null;return typeof i=="function"&&await i.call(r||s),P.emit(C.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(s){return this._log("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",s),!1}}clearAllChatsContexts(){this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,s){return!!this.getToolContext(e,s)}getContextSummary(e){let s=this._getLatestAssistantMessageOutputs(),r=Object.entries(s).map(([o,a])=>({toolId:o,updatedAt:a.updatedAt,contentLength:a.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:r,totalCount:r.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,s={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,s=e.SillyTavern||null,r=s?.getContext?.()||null,o=Array.isArray(r?.chat)?r.chat:[],a=Array.isArray(s?.chat)?s.chat:[],n=o.length?o:a;return{topWindow:e,api:s,context:r,chat:n,contextChat:o,apiChat:a}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,s={}){let r=Me.SET_CHAT_MESSAGE;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:s.traceId||"",sessionKey:s.sessionKey||"",sourceMessageId:s.sourceMessageId||null,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId||null,effectiveSwipeId:s.effectiveSwipeId||s.sourceSwipeId||null,slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:Me.NONE,commit:{preferredMethod:r,attemptedMethods:[],appliedMethod:Me.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:"",eventSource:"",eventName:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:wo.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(s=>setTimeout(s,e))}_collectWritebackVerification(e,s,r,o,a,n=null){let i=e?.contextChat?.[r]||e?.apiChat?.[r]||s?.[r]||n||null,l=this._getWritableMessageField(i).text||"",c=i?.[Be]?.[o],d=a?l.includes(a):!0,u=!!(c&&String(c.content||"").trim()===a);return{latestMessage:i,latestText:l,textIncludesContent:d,mirrorStored:u}}async _confirmRefresh(e,s,r,o,a,n=null){let i=1,l=this._collectWritebackVerification(e,s,r,o,a,n);for(let c=0;c<Fu;c+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:i,confirmedBy:"text_and_mirror_present"};await this._wait(Ku),i+=1,l=this._collectWritebackVerification(e,s,r,o,a,n)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:i,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}async _requestAssistantMessageRefresh(e,s,r,o={},a=null){let n=a||this._createWritebackResult("",o),{api:i,context:l}=e||{},c=l?.setChatMessages||i?.setChatMessages||e?.topWindow?.setChatMessages||null,d=l?.setChatMessage||i?.setChatMessage||e?.topWindow?.setChatMessage||null,u=o.replaceFullMessage!==!0;n.commit.preferredMethod=typeof d=="function"?Me.SET_CHAT_MESSAGE:typeof c=="function"?Me.SET_CHAT_MESSAGES:Me.LOCAL_ONLY;let y=!1,p=js(o);if(p)return n.error=p,n;if(typeof d=="function"){dt(n.commit.attemptedMethods,Me.SET_CHAT_MESSAGE);try{let f=js(o);if(f)return n.error=f,n;await d.call(l||i||e?.topWindow,{message:r,mes:r,content:r,text:r},s,{swipe_id:Er(o.sourceSwipeId||o.effectiveSwipeId)||"current",refresh:"display_and_render_current"}),n.steps.hostSetChatMessage=!0,n.hostUpdateMethod=Me.SET_CHAT_MESSAGE,n.hostCommitApplied=!0,n.commit.appliedMethod=Me.SET_CHAT_MESSAGE,n.commit.hostCommitApplied=!0,y=!0}catch(f){this._log("setChatMessage \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",f),n.errors.push(`setChatMessage: ${f?.message||String(f)}`)}}if(!y&&typeof c=="function"){dt(n.commit.attemptedMethods,Me.SET_CHAT_MESSAGES);try{let f=js(o);if(f)return n.error=f,n;await c.call(l||i||e?.topWindow,[{message_id:Er(o.sourceMessageId)||s,chat_index:s,message:r,mes:r,content:r,text:r}],{refresh:"affected"}),n.steps.hostSetChatMessages=!0,n.hostUpdateMethod=Me.SET_CHAT_MESSAGES,n.hostCommitApplied=!0,n.commit.appliedMethod=Me.SET_CHAT_MESSAGES,n.commit.hostCommitApplied=!0,n.commit.fallbackUsed=!0,y=!0}catch(f){this._log("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",f),n.errors.push(`setChatMessages: ${f?.message||String(f)}`)}}if(y&&(n.refreshRequested=!0,dt(n.refresh.requestMethods,n.hostUpdateMethod)),u&&typeof c=="function"){dt(n.commit.attemptedMethods,"setChatMessages_refresh_assist");try{let f=js(o);if(f)return n.error=f,n;await c.call(l||i||e?.topWindow,[{message_id:Er(o.sourceMessageId)||s,chat_index:s,message:r,mes:r,content:r,text:r}],{refresh:"affected"}),n.refreshRequested=!0,dt(n.refresh.requestMethods,"setChatMessages_refresh_assist")}catch(f){this._log("append \u5199\u56DE\u8865\u5145\u5237\u65B0\u5931\u8D25",f),n.errors.push(`setChatMessages_refresh_assist: ${f?.message||String(f)}`)}}return y||(dt(n.commit.attemptedMethods,Me.LOCAL_ONLY),n.commit.appliedMethod=Me.LOCAL_ONLY,n.commit.fallbackUsed=n.commit.preferredMethod!==Me.LOCAL_ONLY,n.hostUpdateMethod=n.commit.appliedMethod),n}_inferBlockType(e){let s=String(e||"").trim();if(!s)return"empty";let r=s.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return r?.[1]?r[1]:"plain_text"}_stripExactStoredBlock(e,s,r=""){let o=String(e||""),a=String(s||"").trim(),n=String(r||"").trim();return a?o.includes(a)?n?{text:o.replace(a,n).trimEnd(),removed:!0,replaced:!0}:{text:o.replace(a,"").trimEnd(),removed:!0,replaced:!1}:{text:o,removed:!1,replaced:!1}:{text:o,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,s,r){let{contextChat:o,apiChat:a}=e||{},n=i=>{!Array.isArray(i)||s<0||s>=i.length||i[s]!==r&&(i[s]={...i[s]||{},...r})};n(o),n(a)}_notifyMessageUpdated(e,s){try{let r=Wu(),o=r?.topWindow||e?.topWindow,a=r?.eventSource||null,n=r?.eventTypes||{},i=n.MESSAGE_UPDATED||n.message_updated||"MESSAGE_UPDATED";return a&&typeof a.emit=="function"?(a.emit(i,s),typeof o?.requestAnimationFrame=="function"?o.requestAnimationFrame(()=>{a.emit(i,s)}):typeof o?.setTimeout=="function"&&o.setTimeout(()=>{a.emit(i,s)},30),{emitted:!0,source:r?.source||"unavailable",eventName:i}):{emitted:!1,source:r?.source||"unavailable",eventName:i}}catch(r){return this._log("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",r),{emitted:!1,source:"error",eventName:"",error:r?.message||String(r)}}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let s=String(e.role||"").toLowerCase();return s==="assistant"||s==="ai"||!s}_findAssistantMessageIndex(e,s){let r=Array.isArray(e)?e:[];if(!r.length)return-1;let o=s!=null&&s!=="",a=(n,i)=>{if(!this._isAssistantMessage(n)||s==null||s==="")return!1;let l=String(s).trim();return l?[n.message_id,n.id,n.messageId,n.mes_id,i].map(d=>d==null?"":String(d).trim()).includes(l):!1};for(let n=r.length-1;n>=0;n-=1)if(a(r[n],n))return n;if(o)return-1;for(let n=r.length-1;n>=0;n-=1)if(this._isAssistantMessage(r[n]))return n;return-1}_buildMessageInjectedContext(e){let r=Object.entries(e&&typeof e=="object"?e:{}).filter(([,a])=>a?.blockType!=="full_message").sort(([,a],[,n])=>(a?.updatedAt||0)-(n?.updatedAt||0));if(!r.length)return"";let o=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[a,n]of r)o.push(`[${a}]`),o.push(n?.content||""),o.push("");return o.join(`
`)}_getWritableMessageField(e){let s=["mes","message","content","text"];for(let r of s)if(typeof e?.[r]=="string")return{key:r,text:e[r]};return{key:"mes",text:""}}_applyMessageText(e,s,r={}){let o=e&&typeof e=="object"?e:{},a=["mes","message","content","text"],n=!1;if(a.forEach(i=>{typeof o[i]=="string"&&(o[i]=s,n=!0)}),n||(o.mes=s,o.message=s),Array.isArray(o.swipes)){let i=Number.parseInt(Er(r?.sourceSwipeId||r?.effectiveSwipeId),10),l=Number.isInteger(i)?i:Number.isInteger(o.swipe_id)?o.swipe_id:Number.isInteger(o.swipeId)?o.swipeId:0;l>=0&&l<o.swipes.length&&(o.swipes[l]=s,o.swipe_id=l,o.swipeId=l)}return o}_stripExistingToolOutput(e,s=[]){let r=String(e||"");return(Array.isArray(s)?s:[]).forEach(a=>{let n=String(a||"").trim();if(!n)return;if(n.startsWith("regex:")){try{let d=new RegExp(n.slice(6).trim(),"gis");r=r.replace(d,"")}catch(d){this._log("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",n,d)}return}let i=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),c=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");r=r.replace(l,""),r=r.replace(c,"")}),r.trimEnd()}_stripPreviousStoredToolContent(e,s){let r=String(e||""),o=String(s||"").trim();return o?r.replace(o,"").trimEnd():r.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,s,r={},o=null){let a=o||this._createWritebackResult(e,r);try{let n=this._getChatRuntime(),{context:i,chat:l}=n;if(!Array.isArray(l)||!l.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),a.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",a;let c=this._findAssistantMessageIndex(l,r.sourceMessageId);if(c<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),a.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",a;if(r?.signal?.aborted)return a.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",a;if(typeof r?.shouldAbortWriteback=="function")try{if(r.shouldAbortWriteback()===!0)return a.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",a}catch{return a.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",a}a.messageIndex=c,a.steps.foundTargetMessage=!0;let d=l[c],{key:u,text:y}=this._getWritableMessageField(d);a.textField=u;let p=d[Be]&&typeof d[Be]=="object"?d[Be]:{},f=p?.[e]||{},x=f?.content||"",v=f?.blockText||x||"",_=Object.entries(p).filter(([me])=>me!==e).map(([,me])=>me||{}),A=String(s.content||"").trim(),S=r.replaceFullMessage===!0,z=S?"full_message":this._inferBlockType(A),$={toolId:e,messageId:r.sourceMessageId||d?.message_id||d?.messageId||c,blockType:z,insertedAt:s.updatedAt,replaceable:r.overwrite!==!1};a.blockIdentity=$;let I=r.overwrite===!1||S?{text:String(y||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(y,v,A),R=I.text,J="";!S&&r.overwrite!==!1&&v&&!I.removed&&(J="previous_block_not_found");let V=r.overwrite===!1||I.replaced||S?R:this._stripExistingToolOutput(R,r.extractionSelectors),U=V!==R;R=V;let Q=r.overwrite===!1||I.replaced||S?R:this._stripPreviousStoredToolContent(R,x),$e=Q!==R;R=Q,a.replacedExistingBlock=S||I.removed||U||$e;let we=r.overwrite===!1?String(y||""):R,Re=S?A:I.replaced?R.trim():[we.trimEnd(),A].filter(Boolean).join(`

`).trim();a.insertedNewBlock=!!A;let oe=_.every(me=>{if(me?.blockType==="full_message")return!0;let gt=String(me?.blockText||me?.content||"").trim();return gt?Re.includes(gt):!0});a.preservedOtherToolBlocks=oe,oe?J&&(a.conflictDetected=!0,a.conflictReason=J):(a.conflictDetected=!0,a.conflictReason="other_tool_block_removed");let At={...p,[e]:{toolId:e,content:A,blockText:A,blockType:z,blockIdentity:$,updatedAt:s.updatedAt,sourceMessageId:s.sourceMessageId||null}},Wt=js(r);if(Wt)return a.error=Wt,a;d[u]=Re,this._applyMessageText(d,Re,r),d[Be]=At,d[Us]=this._buildMessageInjectedContext(At),a.contentCommitted=!0,a.commit.contentCommitted=!0,a.steps.contentCommitted=!0,a.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(n,c,d),a.steps.runtimeSynced=!0;let rt=js(r);if(rt)return a.error=rt,a;await this._requestAssistantMessageRefresh(n,c,Re,r,a);let Kt=i?.saveChat||n?.api?.saveChat||null,ge=i?.saveChatDebounced||n?.api?.saveChatDebounced||null;typeof ge=="function"&&(ge.call(i||api),a.steps.saveChatDebounced=!0,a.refreshRequested=!0,dt(a.refresh.requestMethods,"saveChatDebounced")),typeof Kt=="function"&&(await Kt.call(i||api),a.steps.saveChat=!0,a.refreshRequested=!0,dt(a.refresh.requestMethods,"saveChat"));let ie=this._notifyMessageUpdated(n,c);a.steps.notifiedMessageUpdated=ie?.emitted===!0,a.refresh.eventSource=ie?.source||"",a.refresh.eventName=ie?.eventName||"",ie?.error&&a.errors.push(`MESSAGE_UPDATED: ${ie.error}`);let ft=String(s.content||"").trim();(a.steps.hostSetChatMessages||a.steps.hostSetChatMessage)&&(a.refreshRequested=!0,dt(a.refresh.requestMethods,a.hostUpdateMethod)),a.steps.notifiedMessageUpdated&&(a.refreshRequested=!0,dt(a.refresh.requestMethods,`MESSAGE_UPDATED:${a.refresh.eventName||"MESSAGE_UPDATED"}`)),a.steps.refreshRequested=a.refreshRequested,a.refresh.requested=a.refreshRequested;let ot=await this._confirmRefresh(n,l,c,e,ft,d);return a.verification.textIncludesContent=ot.textIncludesContent,a.verification.mirrorStored=ot.mirrorStored,a.verification.refreshConfirmed=ot.refreshConfirmed,a.steps.verifiedAfterWrite=a.verification.textIncludesContent&&a.verification.mirrorStored,a.refreshConfirmed=a.verification.refreshConfirmed&&a.refreshRequested,a.refresh.confirmChecks=Number(ot.confirmChecks)||0,a.refresh.confirmedBy=ot.confirmedBy||"",a.refresh.confirmed=a.refreshConfirmed,a.steps.refreshConfirmed=a.refreshConfirmed,a.success=a.steps.localTextApplied&&a.steps.runtimeSynced&&a.steps.verifiedAfterWrite&&a.refreshConfirmed,a.writebackStatus=a.success?wo.SUCCESS:wo.FAILED,!a.success&&!a.error&&(a.error=a.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),a.conflictDetected&&!a.error&&(a.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${a.conflictReason}`),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${c}`),a}catch(n){return this._log("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",n),a.error=n?.message||String(n),a.errors.push(a.error),a}}getAssistantMessageSnapshot(e=null){try{let s=this._getChatRuntime(),{chat:r}=s,o=this._findAssistantMessageIndex(r,e);if(o<0)return null;let a=r[o]||null,n=this._getWritableMessageField(a).text||"",i=a?.[Be]&&typeof a[Be]=="object"?a[Be]:{},l=Object.values(i).reduce((c,d)=>{let u=String(d?.blockText||d?.content||"").trim();return!u||!c.includes(u)?c:c.replace(u,"").trimEnd()},String(n||"")).trim();return{messageIndex:o,message:a,messageText:n,baseText:l,toolOutputs:i,injectedContext:typeof a?.[Us]=="string"?a[Us]:this._buildMessageInjectedContext(i)}}catch(s){return this._log("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",s),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext(),o=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(n=>typeof n=="string"&&n.trim());if(o)return o;let a=e.SillyTavern?.this_chid;if(a!=null)return`chat_char_${a}`}return"chat_default"}catch{return"chat_default"}}_log(...e){Uu.debug(e[0],e.length>1?e.slice(1):void 0)}},We=new So,Hu=We});var nl={};be(nl,{BUILTIN_VARIABLES:()=>al,VariableResolver:()=>To,default:()=>Gu,variableResolver:()=>Xe});var qu,al,To,Xe,Gu,Ir=B(()=>{ve();ae();qu=N.createScope("VariableResolver"),al={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},To=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,s){if(typeof e!="string")return e;let r=e;return r=this._resolveBuiltinVariables(r,s),r=this._resolveCustomVariables(r,s),r=this._resolveRegexVariables(r,s),r}resolveObject(e,s){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(o=>this.resolveObject(o,s));let r={};for(let[o,a]of Object.entries(e))typeof a=="string"?r[o]=this.resolveTemplate(a,s):typeof a=="object"&&a!==null?r[o]=this.resolveObject(a,s):r[o]=a;return r}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,s){e&&(this.customVariables.set(e,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,s){!e||typeof s!="function"||(this.variableHandlers.set(e,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,s]of Object.entries(al))e.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,r]of this.customVariables)e.push({name:`{{${s}}}`,description:typeof r=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},r={};for(let o of this.getAvailableVariables())r[o.category]||(r[o.category]=[]),r[o.category].push(o);for(let[o,a]of Object.entries(s))if(r[o]&&r[o].length>0){e.push(`\u3010${a}\u3011`);for(let n of r[o])e.push(`  ${n.name} - ${n.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,s)=>(s.regexResults||s.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,s){let r=e;return r=r.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),r=r.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),r=r.replace(/\{\{chatHistory\}\}/gi,()=>{let o=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(o)}),r=r.replace(/\{\{characterCard\}\}/gi,()=>{let o=s.characterCard||s.raw?.characterCard;return o?this._formatCharacterCard(o):""}),r=r.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),r=r.replace(/\{\{toolId\}\}/gi,s.toolId||s.raw?.toolId||""),r=r.replace(/\{\{toolPromptMacro\}\}/gi,s.toolPromptMacro||s.raw?.toolPromptMacro||""),r=r.replace(/\{\{toolContentMacro\}\}/gi,s.toolContentMacro||s.raw?.toolContentMacro||""),r=r.replace(/\{\{toolWorldbookContent\}\}/gi,s.toolWorldbookContent||s.raw?.toolWorldbookContent||""),r=r.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),r=r.replace(/\{\{extractedContent\}\}/gi,s.extractedContent||s.raw?.extractedContent||""),r=r.replace(/\{\{recentMessagesText\}\}/gi,s.recentMessagesText||s.raw?.recentMessagesText||""),r=r.replace(/\{\{rawRecentMessagesText\}\}/gi,s.rawRecentMessagesText||s.raw?.rawRecentMessagesText||""),r=r.replace(/\{\{userMessage\}\}/gi,s.userMessage||s.raw?.userMessage||""),r=r.replace(/\{\{previousToolOutput\}\}/gi,s.previousToolOutput||s.raw?.previousToolOutput||""),r}_resolveCustomVariables(e,s){let r=e;for(let[o,a]of this.customVariables){let n=new RegExp(`\\{\\{${this._escapeRegex(o)}\\}\\}`,"gi");typeof a=="function"?r=r.replace(n,()=>{try{return a(s)}catch(i){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}:`,i),""}}):r=r.replace(n,String(a))}return r}_resolveRegexVariables(e,s){let r=e;for(let[o,a]of this.variableHandlers){let n=new RegExp(`\\{\\{${o}\\.([^}]+)\\}\\}`,"gi");r=r.replace(n,(i,l)=>{try{return a(l,s)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}.${l}:`,c),""}})}return r}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(s=>{let r=s.role||"unknown",o=s.content||s.mes||"";return`[${r}]: ${o}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let s=[];return e.name&&s.push(`\u59D3\u540D: ${e.name}`),e.description&&s.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&s.push(`\u6027\u683C: ${e.personality}`),e.scenario&&s.push(`\u573A\u666F: ${e.scenario}`),s.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){qu.debug(e[0],e.length>1?e.slice(1):void 0)}},Xe=new To,Gu=Xe});var ll={};be(ll,{DEFAULT_PROMPT_TEMPLATE:()=>il,ToolPromptService:()=>_o,default:()=>Vu,toolPromptService:()=>cs});var Yu,il,_o,cs,Vu,Ao=B(()=>{ve();Bs();Ir();La();ae();Yu=N.createScope("ToolPromptService"),il="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",_o=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,s={}){let r=this._getPromptTemplate(e),o=String(s?.toolWorldbookContent||s?.input?.toolWorldbookContent||await el(e)).trim(),a=Xe.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolWorldbookContent:o}),n=Xe.resolveTemplate(r,a).trim(),i=String(s?.toolContentMacro||s?.input?.toolContentMacro||"").trim();return Xe.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolPromptMacro:n,toolContentMacro:i,toolWorldbookContent:o})}async buildToolMessages(e,s){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let r=[],o=await this._buildVariableContext(e,s),a=this._getBypassMessages(e);if(a&&a.length>0)for(let i of a)i.enabled!==!1&&r.push({role:this._normalizeRole(i.role),content:Xe.resolveTemplate(i.content||"",o)});let n=this._buildUserContent(this._getPromptTemplate(e),o);return n&&r.push({role:"user",content:n}),this._log(`\u6784\u5EFA\u6D88\u606F: ${r.length} \u6761`),r}async buildPromptText(e,s){return(await this._buildVariableContext(e,s)).toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:il}_getBypassMessages(e){return e.bypass?.enabled?H.buildBypassMessages(e):[]}_buildUserContent(e,s){return!e||!e.trim()?"":Xe.resolveTemplate(e,s).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){Yu.debug(e[0],e.length>1?e.slice(1):void 0)}setDebugMode(e){this.debugMode=e}},cs=new _o,Vu=cs});var dl={};be(dl,{LEGACY_OUTPUT_MODES:()=>Xu,OUTPUT_MODES:()=>Qe,TOOL_FAILURE_STAGES:()=>Te,TOOL_RUNTIME_STATUS:()=>Qu,TOOL_WRITEBACK_STATUS:()=>fe,ToolOutputService:()=>Eo,default:()=>Zu,toolOutputService:()=>ut});function cl(t){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}function zs(t=[],e="",s=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!s,contentCommitted:!!s?.contentCommitted,hostCommitApplied:!!s?.hostCommitApplied,writebackStatus:s?.writebackStatus||"",preferredCommitMethod:s?.commit?.preferredMethod||"",appliedCommitMethod:s?.commit?.appliedMethod||"",fallbackUsed:!!s?.commit?.fallbackUsed},refresh:{requested:!!s?.refreshRequested,confirmed:!!s?.refreshConfirmed,requestMethods:Array.isArray(s?.refresh?.requestMethods)?[...s.refresh.requestMethods]:[],confirmChecks:Number(s?.refresh?.confirmChecks)||0,confirmedBy:s?.refresh?.confirmedBy||""}}}var Ju,Qe,Xu,Qu,Te,fe,Eo,ut,Zu,Io=B(()=>{ve();Ar();ae();ls();Ao();no();nr();Ju=N.createScope("ToolOutputService"),Qe={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},Xu={inline:"follow_ai"},Qu={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},Te={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},fe={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};Eo=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Qe.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let s=e.output?.mode;return s===Qe.FOLLOW_AI||s==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,s){let r=Date.now(),o=e.id,a=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,n=s?.sessionKey||"",i=s?.executionKey||"",l=this._getExtractionSelectors(e),c=e.output?.apiPreset||e.apiPreset||"",d="",u=fe.NOT_APPLICABLE,y=null,p=[],f="";this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${o}`),P.emit(C.TOOL_EXECUTION_STARTED,{toolId:o,traceId:a,sessionKey:n,mode:Qe.POST_RESPONSE_API});try{if(d=Te.BUILD_MESSAGES,p=await this._buildToolMessages(e,s),!p||p.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");this._log(`\u6784\u5EFA\u4E86 ${p.length} \u6761\u6D88\u606F`);let x=cl(s);if(x){let z=Date.now()-r;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:z,meta:{traceId:a,sessionKey:n,executionKey:i,sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",selectors:l,apiPreset:c,writebackStatus:u,failureStage:d,writebackDetails:y,aborted:x.aborted===!0,stale:x.stale===!0,abortReason:x.reason||"",phases:zs(p,f,y)}}}let v=await this._getRequestTimeout();d=Te.SEND_API_REQUEST;let _=await this._sendApiRequest(c,p,{timeoutMs:v,signal:s.signal});d=Te.EXTRACT_OUTPUT,f=this._extractOutputContent(_,e);let A=cl(s);if(A){let z=Date.now()-r;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:z,meta:{traceId:a,sessionKey:n,executionKey:i,sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",selectors:l,apiPreset:c,writebackStatus:u,failureStage:d,writebackDetails:y,aborted:A.aborted===!0,stale:A.stale===!0,abortReason:A.reason||"",phases:zs(p,f,y)}}}if(f){if(d=Te.INJECT_CONTEXT,y=await We.injectDetailed(o,f,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.sourceMessageId||s.confirmedAssistantMessageId||s.messageId||"",sourceSwipeId:s.sourceSwipeId||s.confirmedAssistantSwipeId||s.effectiveSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||s.confirmedAssistantSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",extractionSelectors:l,traceId:a,sessionKey:n,signal:s.signal,shouldAbortWriteback:s.shouldAbortWriteback,isAutoRun:s.isAutoRun===!0}),!y?.success)throw u=fe.FAILED,new Error(y?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=fe.SUCCESS}else u=fe.SKIPPED_EMPTY_OUTPUT;d="";let S=Date.now()-r;return P.emit(C.TOOL_EXECUTED,{toolId:o,traceId:a,sessionKey:n,success:!0,duration:S,mode:Qe.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${o}, \u8017\u65F6 ${S}ms`),{success:!0,toolId:o,output:f,duration:S,meta:{traceId:a,sessionKey:n,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:p.length,selectors:l,apiPreset:c,writebackStatus:u,failureStage:"",writebackDetails:y,phases:zs(p,f,y)}}}catch(x){let v=Date.now()-r,_=d||Te.UNKNOWN,A=u||fe.NOT_APPLICABLE;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${o}`,x),P.emit(C.TOOL_EXECUTION_FAILED,{toolId:o,traceId:a,sessionKey:n,error:x.message||String(x),duration:v}),{success:!1,toolId:o,error:x.message||String(x),duration:v,meta:{traceId:a,sessionKey:n,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:p.length,selectors:l,apiPreset:c,writebackStatus:A,failureStage:_,writebackDetails:y,phases:zs(p,f,y)}}}}async runToolFollowAiManual(e,s){let r=Date.now(),o=e.id,a=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,n=s?.sessionKey||"",i=s?.executionKey||"",l=e.output?.apiPreset||e.apiPreset||"",c=this._getExtractionSelectors(e),d="",u=fe.NOT_APPLICABLE,y=null,p=[],f="";P.emit(C.TOOL_EXECUTION_STARTED,{toolId:o,traceId:a,sessionKey:n,mode:Qe.FOLLOW_AI});try{if(d=Te.BUILD_MESSAGES,p=await this._buildToolMessages(e,s),!p||p.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");let x=await this._getRequestTimeout();d=Te.SEND_API_REQUEST;let v=await this._sendApiRequest(l,p,{timeoutMs:x,signal:s.signal});if(d=Te.EXTRACT_OUTPUT,f=this._extractOutputContent(v,e),f){if(d=Te.INJECT_CONTEXT,y=await We.injectDetailed(o,f,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.sourceMessageId||s.confirmedAssistantMessageId||s.messageId||"",sourceSwipeId:s.sourceSwipeId||s.confirmedAssistantSwipeId||s.effectiveSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||s.confirmedAssistantSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",extractionSelectors:c,traceId:a,sessionKey:n}),!y?.success)throw u=fe.FAILED,new Error(y?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=fe.SUCCESS}else u=fe.SKIPPED_EMPTY_OUTPUT;d="";let _=Date.now()-r;return P.emit(C.TOOL_EXECUTED,{toolId:o,traceId:a,sessionKey:n,success:!0,duration:_,mode:Qe.FOLLOW_AI}),{success:!0,toolId:o,output:f,duration:_,meta:{traceId:a,sessionKey:n,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:p.length,selectors:c,apiPreset:l,writebackStatus:u,failureStage:"",writebackDetails:y,phases:zs(p,f,y)}}}catch(x){let v=Date.now()-r,_=d||Te.UNKNOWN,A=u||fe.NOT_APPLICABLE;return P.emit(C.TOOL_EXECUTION_FAILED,{toolId:o,traceId:a,sessionKey:n,error:x.message||String(x),duration:v,mode:Qe.FOLLOW_AI}),{success:!1,toolId:o,error:x.message||String(x),duration:v,meta:{traceId:a,sessionKey:n,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:p.length,selectors:c,apiPreset:l,writebackStatus:A,failureStage:_,writebackDetails:y,phases:zs(p,f,y)}}}}async runToolInline(e,s){return this.runToolFollowAiManual(e,s)}async previewExtraction(e,s){return{success:!0,...this.getExtractionSnapshot(e,s)}}getExtractionSnapshot(e,s){let r=this._buildRecentMessageExtractionEntries(e,s),o=this._joinMessageBlocks(r,"rawText"),a=this._joinMessageBlocks(r,"filteredText"),n=this._joinMessageBlocks(r,"extractedText",{skipEmpty:!0}),i=(Array.isArray(r)?r:[]).map(c=>String(c?.extractedText||"").trim()).filter(Boolean).join(`

`),l=Array.isArray(r)&&r.length>0?r[r.length-1]:null;return{sourceText:o,filteredSourceText:a,extractedText:n,extractedRawText:i,messageEntries:r,primaryEntry:l,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,s){let r=this._buildRecentMessageExtractionEntries(e,s),o=this._joinMessageBlocks(r,"rawText"),a=this._joinMessageBlocks(r,"filteredText"),n=this._joinMessageBlocks(r,"extractedText",{skipEmpty:!0}),i={...s,rawRecentMessagesText:o,recentMessagesText:a,extractedContent:n,toolContentMacro:this._buildToolContentMacro(r),toolName:e.name,toolId:e.id};return cs.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let s=String(e).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,s,r={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:o=9e4,signal:a}=r,n=null;if(e){if(!or(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);n=rr(e)}else n=rr();let i=Es(n||{});if(!i.valid&&!n?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:o,apiConfig:n},a);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Je.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,s){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,s);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,s);if(e.content)return this._applyOutputExtractionSelectors(e.content,s);if(e.text)return this._applyOutputExtractionSelectors(e.text,s);if(e.message)return this._applyOutputExtractionSelectors(e.message,s);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),s)}catch{return this._applyOutputExtractionSelectors(String(e),s)}}return this._applyOutputExtractionSelectors(String(e),s)}_applyOutputExtractionSelectors(e,s){let r=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(s);if(!o.length)return r.trim();let a=[];for(let n of o){let i=String(n||"").trim();if(!i)continue;if(i.startsWith("regex:")){let c=i.slice(6).trim();if(!c)continue;try{let d=new RegExp(c,"gi");[...r.matchAll(d)].forEach(y=>{let p=String(y?.[0]||"").trim();p&&a.push(p)})}catch(d){this._log("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:d})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(r.match(c)||[]).forEach(u=>{let y=String(u||"").trim();y&&a.push(y)})}catch(c){this._log("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}}return a.length>0?a.join(`

`).trim():r.trim()}_getExtractionSelectors(e){let s=e?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(r=>String(r||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(r=>String(r||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,s){return this._applyExtractionSelectorsInternal(e,s,{strict:!1})}_applyExtractionSelectorsInternal(e,s,r={}){let o=typeof e=="string"?e:String(e||""),a=this._getExtractionSelectors(s),{strict:n=!1}=r;if(!a.length)return o.trim();let i=a.map((c,d)=>{let u=String(c||"").trim(),y=u.startsWith("regex:");return{id:`tool-extract-${d}`,type:y?"regex_include":"include",value:y?u.slice(6).trim():u,enabled:!0}}).filter(c=>c.value),l=es(o,i,[]);return n?(l||"").trim():l||o.trim()}_extractToolContent(e,s){let r=typeof s=="string"?s:String(s||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(r,e,{strict:!0}):r.trim()}_applyGlobalContextRules(e){let s=typeof e=="string"?e:String(e||"");if(!s.trim())return"";try{let r=wt()||[],o=ts()||[];return!Array.isArray(r)||r.length===0?s.trim():es(s,r,o)||s.trim()}catch(r){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",r),s.trim()}}_getMessageText(e){if(!e)return"";let s=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let r of s)if(typeof r=="string"&&r.trim())return r.trim();return""}_collectRecentAssistantMessages(e,s){return this._collectRecentAssistantMessageEntries(e,s).map(r=>r.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,s){let r=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),o=Array.isArray(s?.chatMessages)?s.chatMessages:[],a=[];for(let i=o.length-1;i>=0&&a.length<r;i-=1){let l=o[i],c=String(l?.role||"").toLowerCase(),d=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,u=this._getMessageText(l);d&&u&&a.unshift({text:u,message:l,chatIndex:i})}if(a.length>0)return a;let n=s?.lastAiMessage||s?.input?.lastAiMessage||"";return n?[{text:n,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,s){return this._collectRecentAssistantMessageEntries(e,s).map((o,a)=>{let n=o.text||"",i=this._applyGlobalContextRules(n),l=this._extractToolContent(e,n);return{...o,order:a+1,rawText:n,filteredText:i,extractedText:l,fullMessageText:n}})}_joinMessageBlocks(e,s,r={}){let o=Array.isArray(e)?e:[],{skipEmpty:a=!1}=r;return o.map(i=>{let l=String(i?.[s]||"").trim();return a&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(o=>{let a=`\u3010\u7B2C ${o?.order||0} \u6761 AI \u6D88\u606F\u3011`,n=String(o?.filteredText||"").trim()||"(\u7A7A)",i=String(o?.extractedText||"").trim()||"(\u7A7A)";return`${a}
\u6B63\u6587\uFF1A
${n}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)?s?.automation?.enabled===!0:!1):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(e){this.debugMode=e}_log(...e){Ju.debug(e[0],e.length>1?e.slice(1):void 0)}},ut=new Eo,Zu=ut});function yl(t={}){return!t||typeof t!="object"?{}:Object.entries(t).reduce((e,[s,r])=>(e[s]=r===!0,e),{})}function sy(t,e={}){let s=e?.direction==="unescape"?"unescape":"escape",r=yl(e?.options);return ey.reduce((o,a)=>r[a.key]!==!0?o:s==="unescape"?o.replace(a.escaped,a.unescaped):o.replace(a.plain,a.replacement),String(t||""))}function ry(t,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(t||"");let r=yl(e?.options);return ty.reduce((o,a)=>r[a.key]!==!0?o:o.replace(a.from,a.to),String(t||""))}function pl(t,e){let s=t?.processor||{},r=s?.type||"",o=String(e||"");switch(r){case ul.ESCAPE_TRANSFORM:return sy(o,s);case ul.PUNCTUATION_TRANSFORM:return ry(o,s);default:return o}}var ey,ty,ul,fl=B(()=>{ey=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],ty=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],ul={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var ja={};be(ja,{abortAllTasks:()=>ly,abortTask:()=>iy,buildToolMessages:()=>bl,clearExecutionHistory:()=>py,createExecutionContext:()=>by,createResult:()=>Mo,enhanceMessagesWithBypass:()=>hy,executeBatch:()=>ny,executeTool:()=>ml,executeToolWithConfig:()=>hl,executeToolsBatch:()=>wy,executorState:()=>de,extractFailed:()=>my,extractSuccessful:()=>gy,generateTaskId:()=>ds,getExecutionHistory:()=>yy,getExecutorStatus:()=>uy,getScheduler:()=>Ws,mergeResults:()=>fy,pauseExecutor:()=>cy,resumeExecutor:()=>dy,setMaxConcurrent:()=>ay});function Mo(t,e,s,r,o,a,n=0){return{success:s,taskId:t,toolId:e,data:r,error:o,duration:a,retries:n,timestamp:Date.now(),metadata:{}}}function ds(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function oy(t,e={}){return{id:ds(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function Ws(){return Mr||(Mr=new Ua(de.maxConcurrent)),Mr}function ay(t){de.maxConcurrent=Math.max(1,Math.min(10,t)),Mr&&(Mr.maxConcurrent=de.maxConcurrent)}async function ml(t,e={},s){let r=Ws(),o=oy(t,e);for(;de.isPaused;)await new Promise(a=>setTimeout(a,100));try{let a=await r.enqueue(async n=>{if(n.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(n,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},o);return gl(a),a}catch(a){let n=Mo(o.id,t,!1,null,a,Date.now()-o.createdAt,o.retries);return gl(n),n}}async function ny(t,e={}){let{failFast:s=!1,concurrency:r=de.maxConcurrent}=e,o=[],a=Ws(),n=a.maxConcurrent;a.maxConcurrent=r;try{let i=t.map(({toolId:l,options:c,executor:d})=>ml(l,c,d));if(s)for(let l of i){let c=await l;if(o.push(c),!c.success){a.abortAll();break}}else{let l=await Promise.allSettled(i);for(let c of l)c.status==="fulfilled"?o.push(c.value):o.push(Mo(ds(),"unknown",!1,null,c.reason,0,0))}}finally{a.maxConcurrent=n}return o}function iy(t){return Ws().abort(t)}function ly(){Ws().abortAll(),de.executionQueue=[]}function cy(){de.isPaused=!0}function dy(){de.isPaused=!1}function uy(){return{...Ws().getStatus(),isPaused:de.isPaused,activeControllers:de.activeControllers.size,historyCount:de.executionHistory.length}}function gl(t){de.executionHistory.push(t),de.executionHistory.length>100&&de.executionHistory.shift()}function yy(t={}){let e=[...de.executionHistory];return t.toolId&&(e=e.filter(s=>s.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(s=>s.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function py(){de.executionHistory=[]}function fy(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of t)e.totalDuration+=s.duration,s.success?(e.successCount++,s.data!==void 0&&s.data!==null&&e.data.push(s.data)):(e.success=!1,e.failureCount++,s.error&&e.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return e}function gy(t){return t.filter(e=>e.success).map(e=>e.data)}function my(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function by(t={}){return{taskId:ds(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function hy(t,e){return!e||e.length===0?t:[...e,...t]}function vy(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function bl(t,e){let s=[],r=t.promptTemplate||"",o={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[a,n]of Object.entries(o))r=r.replace(new RegExp(vy(a),"g"),n);return s.push({role:"USER",content:r}),s}async function hl(t,e,s={}){let r=te(t);if(!r)return{success:!1,taskId:ds(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!r.enabled)return{success:!1,taskId:ds(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let o=Date.now(),a=ds();try{P.emit(C.TOOL_EXECUTION_STARTED,{toolId:t,taskId:a,context:e});let n=bl(r,e);if(typeof s.callApi=="function"){let i=r.output?.apiPreset||r.apiPreset||"",l=i?{preset:i}:null,c=await s.callApi(n,l,s.signal),d=c;r.outputMode==="separate"&&r.extractTags?.length>0&&(d=xy(c,r.extractTags));let u={success:!0,taskId:a,toolId:t,data:d,duration:Date.now()-o};return P.emit(C.TOOL_EXECUTED,{toolId:t,taskId:a,result:u}),u}else return{success:!0,taskId:a,toolId:t,data:{messages:n,config:{apiPreset:r.output?.apiPreset||r.apiPreset||"",outputMode:r.outputMode,extractTags:r.extractTags}},duration:Date.now()-o,needsExecution:!0}}catch(n){let i={success:!1,taskId:a,toolId:t,error:n.message||String(n),duration:Date.now()-o};return P.emit(C.TOOL_EXECUTION_FAILED,{toolId:t,taskId:a,error:n}),i}}function xy(t,e){let s={};for(let r of e){let o=new RegExp(`<${r}[^>]*>([\\s\\S]*?)<\\/${r}>`,"gi"),a=t.match(o);a&&(s[r]=a.map(n=>{let i=n.match(new RegExp(`<${r}[^>]*>([\\s\\S]*?)<\\/${r}>`,"i"));return i?i[1].trim():""}))}return s}async function wy(t,e,s={}){let r=[];for(let o of t){let a=te(o);if(a&&a.enabled){let n=await hl(o,e,s);r.push(n)}}return r}var de,Ua,Mr,za=B(()=>{Lt();ve();de={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};Ua=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,s){return new Promise((r,o)=>{this.queue.push({executor:e,task:s,resolve:r,reject:o}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:s,task:r,resolve:o,reject:a}=e,n=new AbortController;r.abortController=n,r.status="running",r.startedAt=Date.now(),this.running.set(r.id,r),de.activeControllers.set(r.id,n),this.executeTask(s,r,n.signal).then(i=>{r.status="completed",r.completedAt=Date.now(),o(i)}).catch(i=>{r.status=i.name==="AbortError"?"aborted":"failed",r.completedAt=Date.now(),a(i)}).finally(()=>{this.running.delete(r.id),de.activeControllers.delete(r.id),de.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,s,r){let o=Date.now(),a=null;for(let n=0;n<=s.maxRetries;n++){if(r.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(r);return Mo(s.id,s.toolId,!0,i,null,Date.now()-o,n)}catch(i){if(a=i,i.name==="AbortError")throw i;n<s.maxRetries&&(await this.delay(1e3*(n+1)),s.retries=n+1)}}throw a}delay(e){return new Promise(s=>setTimeout(s,e))}abort(e){let s=de.activeControllers.get(e);return s?(s.abort(),!0):!1}abortAll(){for(let e of de.activeControllers.values())e.abort();de.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},Mr=null});async function Ty(){return Wa||(Wa=Promise.resolve().then(()=>(za(),ja))),Wa}async function _y(t,e,s){return s&&t.output?.mode===Qe.POST_RESPONSE_API?ut.runToolPostResponse(t,e):s&&t.output?.mode===Qe.FOLLOW_AI?ut.runToolFollowAiManual(t,e):(await Ty()).executeToolWithConfig(t.id,e)}function Ay(t,e){return e?.runSource==="MANUAL"?t.output?.mode==="local_transform"||t.processor?.type?us.MANUAL_LOCAL_TRANSFORM:t.output?.mode===Qe.POST_RESPONSE_API?us.MANUAL_POST_RESPONSE_API:us.MANUAL_COMPATIBILITY:us.MANUAL_POST_RESPONSE_API}function ko(t,e){try{Ca(t,e)}catch(s){Sy.warn("\u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",{toolId:t,error:s})}}function Ey(t,e,s){let r=String(t||""),o=String(e||"").trim(),a=String(s||"").trim();return!r.trim()||!o?{nextMessageText:"",replaced:!1}:r.includes(o)?{nextMessageText:r.replace(o,a).trim(),replaced:!0}:{nextMessageText:"",replaced:!1}}async function Iy(t,e){let s=ut.getExtractionSnapshot(t,e),r=s?.primaryEntry||null,o=String(r?.fullMessageText||e?.lastAiMessage||"").trim(),a=String(r?.extractedText||s?.extractedRawText||s?.extractedText||"").trim(),n=Array.isArray(s?.selectors)?s.selectors:[],i=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l=e?.sessionKey||"";if(!a||!o)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:i,sessionKey:l,selectors:n,writebackStatus:fe.NOT_APPLICABLE,failureStage:Te.EXTRACT_OUTPUT,extraction:s}};let c=String(pl(t,a)||"").trim(),d=Ey(o,a,c),u=d.replaced?d.nextMessageText:c,y=null,p=fe.NOT_APPLICABLE;if(u){if(y=await We.injectDetailed(t.id,u,{overwrite:!0,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:[],replaceFullMessage:d.replaced,traceId:i,sessionKey:l}),!y?.success)return{success:!1,error:y?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:i,sessionKey:l,selectors:n,writebackStatus:fe.FAILED,failureStage:Te.INJECT_CONTEXT,writebackDetails:y,extraction:s}};p=fe.SUCCESS}else p=fe.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:c,meta:{traceId:i,sessionKey:l,selectors:n,writebackStatus:p,failureStage:"",writebackDetails:y,extraction:s}}}async function My(t,e){let s=Date.now(),r=t.id,o=`yyt-tool-run-${r}`,a=Ay(t,e),n=e?.executionKey||"";ko(r,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:n,lastExecutionPath:a,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),le("info",`\u6B63\u5728\u624B\u52A8\u6267\u884C ${t.name}`,{sticky:!0,noticeId:o});try{let i=a===us.MANUAL_LOCAL_TRANSFORM?await Iy(t,e):await _y(t,e,!0),l=Date.now()-s;if(i?.success){let y=te(r),p=i?.meta?.writebackDetails||{};return ko(r,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(y?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:n,lastExecutionPath:a,lastWritebackStatus:i?.meta?.writebackStatus||fe.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!p.contentCommitted,lastHostCommitApplied:!!p.hostCommitApplied,lastRefreshRequested:!!p.refreshRequested,lastRefreshConfirmed:!!p.refreshConfirmed,lastPreferredCommitMethod:p?.commit?.preferredMethod||"",lastAppliedCommitMethod:p?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(p?.refresh?.requestMethods)?p.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(p?.refresh?.requestMethods)?[...p.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(p?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:p?.refresh?.confirmedBy||""}),w("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`),le("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,{duration:3200,noticeId:o}),{success:!0,duration:l,result:i}}let c=te(r),d=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",u=i?.meta?.writebackDetails||{};return ko(r,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:n,lastExecutionPath:a,lastWritebackStatus:i?.meta?.writebackStatus||fe.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||(a===us.MANUAL_COMPATIBILITY?Te.COMPATIBILITY_EXECUTE:Te.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),w("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),le("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),{success:!1,duration:l,error:d,result:i}}catch(i){let l=Date.now()-s,c=te(r),d=i?.message||String(i);throw ko(r,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:n,lastExecutionPath:a,lastWritebackStatus:fe.NOT_APPLICABLE,lastFailureStage:a===us.MANUAL_COMPATIBILITY?Te.COMPATIBILITY_EXECUTE:Te.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),w("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),le("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),i}}async function Co(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=te(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return Dt(t,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:fe.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),le("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let s=await is({runSource:"MANUAL"});return My(e,s)}async function $o(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=te(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await is({runSource:"MANUAL_PREVIEW"});return ut.previewExtraction(e,s)}var Sy,us,Wa,Ka=B(()=>{Lt();Io();Ls();ls();fl();Ae();ae();Sy=N.createScope("ToolTrigger"),us={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},Wa=null});var vl={};be(vl,{TOOL_CONFIG_PANEL_STYLES:()=>Ks,createToolConfigPanel:()=>Nt,default:()=>ky});function Nt(t){let{id:e,toolId:s,postResponseHint:r,extractionPlaceholder:o,previewDialogId:a,previewTitle:n="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",toolKindLabel:i="AI \u5DE5\u5177"}=t;return{id:e,toolId:s,renderSessionId:0,_beginRenderSession(l){return this.renderSessionId=(this.renderSessionId||0)+1,j(l)&&l.data("yytRenderSessionId",this.renderSessionId),this.renderSessionId},_isRenderSessionActive(l,c){return j(l)&&l.data("yytRenderSessionId")===c},_renderIfSessionActive(l,c){return this._isRenderSessionActive(l,c)?(this.renderTo(l),!0):!1},render(){let l=te(this.toolId);if(!l)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let c=this._getApiPresets(),d=l.output?.apiPreset||l.apiPreset||"",u=this._getBypassPresets(),y=l.output?.mode||"follow_ai",p=l.bypass?.enabled||!1,f=l.bypass?.presetId||"",x=l.runtime?.lastStatus||"idle",v=l.runtime?.lastRunAt?new Date(l.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",_=l.runtime?.lastError||"",A=l.extraction||{},S=l.automation||{},z=l.worldbooks||{},$=Array.isArray(this.draftSelectedWorldbooks)?this.draftSelectedWorldbooks:Array.isArray(z.selected)?z.selected:[],I=Array.isArray(this.availableWorldbooks)?this.availableWorldbooks:[],R=String(this.worldbookFilter||"").trim().toLowerCase(),J=R?I.filter(oe=>String(oe||"").toLowerCase().includes(R)):I,V=$.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":$.length<=2?$.join("\u3001"):`\u5DF2\u9009 ${$.length} \u9879\uFF1A${$.slice(0,2).join("\u3001")} \u7B49`,U=Array.isArray(A.selectors)?A.selectors.join(`
`):"",Q=y==="post_response_api"?r:"\u968F AI \u8F93\u51FA\u6A21\u5F0F\u4E0D\u4F1A\u989D\u5916\u8BF7\u6C42\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002",$e=y==="post_response_api"?"\u989D\u5916\u89E3\u6790":"\u968F AI \u8F93\u51FA",we=y==="post_response_api",Re=d||"\u5F53\u524D\u914D\u7F6E";return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${b(l.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${b(l.description||"\u914D\u7F6E\u6A21\u677F\u3001\u63D0\u53D6\u89C4\u5219\u3001API \u9884\u8BBE\u4E0E\u624B\u52A8\u8C03\u8BD5\u80FD\u529B\u3002")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u6A21\u5F0F ${b($e)}</span>
              <span class="yyt-tool-hero-chip">\u9884\u8BBE ${b(Re)}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${b(x)}</span>
              <div class="yyt-tool-panel-hero-actions">
                <button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-tool-save-top" id="${m}-tool-save-top">
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
              <select class="yyt-select" id="${m}-tool-output-mode">
                <option value="follow_ai" ${y==="follow_ai"?"selected":""}>\u968F AI \u8F93\u51FA\uFF08\u652F\u6301\u624B\u52A8\u6267\u884C\uFF09</option>
                <option value="post_response_api" ${y==="post_response_api"?"selected":""}>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790</option>
              </select>
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${Q}${we?" \u5F53\u524D\u6A21\u5F0F\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\uFF0C\u4ECD\u9700\u5728\u5168\u5C40\u8BBE\u7F6E\u4E2D\u5F00\u542F\u81EA\u52A8\u5316\u3002":""}</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-database"></i>
              <span>API \u9884\u8BBE</span>
            </div>
            <div class="yyt-form-group">
              <label>\u89E3\u6790\u4F7F\u7528\u7684 API \u9884\u8BBE</label>
              <select class="yyt-select" id="${m}-tool-api-preset">
                <option value="">\u4F7F\u7528\u5F53\u524DAPI\u914D\u7F6E</option>
                ${c.map(oe=>`
                  <option value="${b(oe.name)}" ${oe.name===d?"selected":""}>
                    ${b(oe.name)}
                  </option>
                `).join("")}
              </select>
              <div class="yyt-tool-compact-hint">\u4EC5\u5728\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u6A21\u5F0F\u4E0B\u751F\u6548\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-shield-halved"></i>
              <span>Ai\u6307\u4EE4\u9884\u8BBE</span>
            </div>
            <div class="yyt-form-group">
              <label class="yyt-checkbox-label">
                <input type="checkbox" id="${m}-tool-bypass-enabled" ${p?"checked":""}>
                <span>\u542F\u7528 Ai \u6307\u4EE4\u9884\u8BBE</span>
              </label>
            </div>
            <div class="yyt-form-group yyt-bypass-preset-select ${p?"":"yyt-hidden"}">
              <label>\u7ED1\u5B9A Ai \u6307\u4EE4\u9884\u8BBE</label>
              <select class="yyt-select" id="${m}-tool-bypass-preset">
                <option value="">\u9009\u62E9\u9884\u8BBE</option>
                ${u.map(oe=>`
                  <option value="${b(oe.id)}" ${oe.id===f?"selected":""}>
                    ${b(oe.name)}${oe.isDefault?" [\u9ED8\u8BA4]":""}
                  </option>
                `).join("")}
              </select>
            </div>
          </div>


          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-book-open"></i>
              <span>\u4E16\u754C\u4E66\u6CE8\u5165</span>
            </div>
            <div class="yyt-form-group">
              <label class="yyt-checkbox-label">
                <input type="checkbox" id="${m}-tool-worldbooks-enabled" ${z.enabled?"checked":""}>
                <span>\u542F\u7528\u4E16\u754C\u4E66\u6CE8\u5165</span>
              </label>
            </div>
            <div class="yyt-form-group">
              <label>\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66\uFF08\u53EF\u591A\u9009\uFF09</label>
              <div class="yyt-worldbook-select" id="${m}-tool-worldbook-select">
                <div class="yyt-worldbook-summary">${b(V)}</div>
                <div class="yyt-worldbook-dropdown" id="${m}-tool-worldbook-dropdown">
                  <input type="text" class="yyt-input yyt-worldbook-search" id="${m}-tool-worldbook-search" placeholder="\u641C\u7D22\u4E16\u754C\u4E66..." value="${b(this.worldbookFilter||"")}">
                  <div class="yyt-worldbook-list" id="${m}-tool-worldbooks">
                    ${I.length>0?J.length>0?J.map(oe=>`
                      <div class="yyt-worldbook-item">
                        <label class="yyt-checkbox-label">
                          <input type="checkbox" data-worldbook-name="${b(oe)}" ${$.includes(oe)?"checked":""}>
                          <span>${b(oe)}</span>
                        </label>
                      </div>
                    `).join(""):'<div class="yyt-tool-compact-hint yyt-worldbook-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>':`<div class="yyt-tool-compact-hint yyt-worldbook-empty">${this.worldbookLoadState==="loading"?"\u4E16\u754C\u4E66\u52A0\u8F7D\u4E2D\u2026":"\u5F53\u524D\u672A\u8BFB\u53D6\u5230\u53EF\u7528\u4E16\u754C\u4E66\u3002"}</div>`}
                  </div>
                  ${this.worldbookLoadState!=="ready"?`
                    <details class="yyt-worldbook-diagnostics">
                      <summary>\u67E5\u770B\u4E16\u754C\u4E66\u8BCA\u65AD</summary>
                      <pre class="yyt-preview-box yyt-preview-pre">${b(JSON.stringify(Qi()||{state:this.worldbookLoadState||"idle",message:"\u5C1A\u672A\u751F\u6210\u8BCA\u65AD\u4FE1\u606F"},null,2))}</pre>
                    </details>
                  `:""}
                </div>
              </div>
              <div class="yyt-tool-compact-hint">\u53EA\u6709\u6A21\u677F\u91CC\u663E\u5F0F\u5199\u5165 <code>{{toolWorldbookContent}}</code> \u65F6\uFF0C\u6240\u9009\u4E16\u754C\u4E66\u5185\u5BB9\u624D\u4F1A\u6CE8\u5165\u3002</div>
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
                <input type="number" class="yyt-input" id="${m}-tool-max-messages" min="1" max="50" value="${Number(A.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${m}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${b(o)}">${b(U)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u63D0\u53D6\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u63D0\u53D6\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-bolt"></i>
              <span>\u81EA\u52A8\u89E6\u53D1</span>
            </div>
            <div class="yyt-form-group">
              <label class="yyt-checkbox-label">
                <input type="checkbox" id="${m}-tool-automation-enabled" ${S.enabled?"checked":""}>
                <span>\u5141\u8BB8\u5F53\u524D\u5DE5\u5177\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1</span>
              </label>
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4 (ms)</label>
                <input type="number" class="yyt-input" id="${m}-tool-automation-settle-ms" min="0" max="10000" step="100" value="${Number(S.settleMs)||1200}">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u51B7\u5374\u65F6\u95F4 (ms)</label>
                <input type="number" class="yyt-input" id="${m}-tool-automation-cooldown-ms" min="0" max="60000" step="100" value="${Number(S.cooldownMs)||5e3}">
              </div>
            </div>
            <div class="yyt-tool-compact-hint">\u53EA\u6709\u540C\u65F6\u6EE1\u8DB3\u201C\u5F53\u524D\u5DE5\u5177\u542F\u7528\u81EA\u52A8\u89E6\u53D1\u201D\u201C\u8F93\u51FA\u6A21\u5F0F\u4E3A\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u201C\u5168\u5C40\u81EA\u52A8\u5316\u5F00\u542F\u201D\u65F6\uFF0C\u624D\u4F1A\u5728 AI \u56DE\u590D\u540E\u81EA\u52A8\u6267\u884C\u3002</div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-file-code"></i>
              <span>\u6A21\u677F\u4FEE\u6539\u6846</span>
              <div class="yyt-title-actions">
                <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${m}-tool-reset-template">
                  <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u6A21\u677F
                </button>
              </div>
            </div>
            <div class="yyt-form-group">
              <textarea class="yyt-textarea yyt-code-textarea"
                        id="${m}-tool-prompt-template"
                        rows="12"
                        placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${b(l.promptTemplate||"")}</textarea>
              <div class="yyt-tool-compact-hint">\u8FD9\u91CC\u76F4\u63A5\u586B\u5199\u53D1\u9001\u7ED9\u989D\u5916\u89E3\u6790\u6A21\u578B\u7684\u5B8C\u6574\u6A21\u677F\uFF1B\u53EF\u5728\u6B63\u6587\u4E2D\u663E\u5F0F\u4F7F\u7528 <code>{{toolContentMacro}}</code>\u3001<code>{{toolWorldbookContent}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{userMessage}}</code> \u7B49\u5B8F\u3002</div>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${b(x)}">${b(x)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${b(v)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${l.runtime?.successCount||0} / ${l.runtime?.errorCount||0}</span>
                </div>
                ${_?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${b(_)}</span>
                  </div>
                `:""}
              </div>
              <div class="yyt-tool-manual-actions">
                <button class="yyt-btn yyt-btn-primary" id="${m}-tool-run-manual">
                  <i class="fa-solid fa-play"></i> \u7ACB\u5373\u6267\u884C\u4E00\u6B21
                </button>
                <button class="yyt-btn yyt-btn-secondary" id="${m}-tool-preview-extraction">
                  <i class="fa-solid fa-vial"></i> \u6D4B\u8BD5\u63D0\u53D6
                </button>
                <div class="yyt-tool-compact-hint">\u7528\u4E8E\u624B\u52A8\u9A8C\u8BC1\u5F53\u524D\u6A21\u677F\u3001API\u9884\u8BBE\u548C Ai \u6307\u4EE4\u9884\u8BBE\u662F\u5426\u80FD\u6B63\u5E38\u5DE5\u4F5C\u3002</div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-footer yyt-panel-footer-end">
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-primary" id="${m}-tool-save">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>

          <div class="yyt-tool-macro-hint">
            \u8BF4\u660E\uFF1A\u5DE5\u5177\u4F1A\u628A\u5F53\u524D\u6A21\u677F\u89E3\u6790\u540E\u4F5C\u4E3A\u6700\u7EC8\u7528\u6237\u8BF7\u6C42\u53D1\u9001\u7ED9\u989D\u5916\u6A21\u578B\uFF1B\u82E5\u542F\u7528\u4E86 Ai \u6307\u4EE4\u9884\u8BBE\uFF0C\u5219\u4F1A\u4F5C\u4E3A\u524D\u7F6E\u6D88\u606F\u4E00\u5E76\u53D1\u9001\u3002\u53EF\u7528\u5B8F\u5305\u62EC <code>{{toolPromptMacro}}</code>\u3001<code>{{toolContentMacro}}</code>\u3001<code>{{toolWorldbookContent}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{recentMessagesText}}</code>\u3001<code>{{rawRecentMessagesText}}</code>\u3001<code>{{userMessage}}</code>\u3001<code>{{toolName}}</code>\u3001<code>{{toolId}}</code>\u3002
          </div>
        </div>
      `},_getApiPresets(){try{return bt()||[]}catch{return[]}},_getBypassPresets(){try{return Tr()||[]}catch{return[]}},async _loadWorldbooks(){this.worldbookLoadState="loading";for(let d=0;d<10;d+=1){try{let u=await Zi();if(Array.isArray(u)&&u.length>0)return this.availableWorldbooks=u,this.worldbookLoadState="ready",this.availableWorldbooks}catch{this.availableWorldbooks=Sr()}d<9&&await new Promise(u=>setTimeout(u,400))}return this.availableWorldbooks=Sr(),this.worldbookLoadState="empty",this.availableWorldbooks},_getFormData(l){let c=D(),d=te(this.toolId)||{};if(!c||!j(l))return d;let u=l.find(`#${m}-tool-output-mode`).val()||"follow_ai",y=l.find(`#${m}-tool-bypass-enabled`).is(":checked"),p=u==="post_response_api",f=p&&l.find(`#${m}-tool-automation-enabled`).is(":checked"),x=(l.find(`#${m}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(_=>_.trim()).filter(Boolean),v=l.find("[data-worldbook-name]:checked").map((_,A)=>String(c(A).data("worldbook-name")||"").trim()).get().filter(Boolean);return{enabled:d?.enabled!==!1,promptTemplate:l.find(`#${m}-tool-prompt-template`).val()||"",apiPreset:l.find(`#${m}-tool-api-preset`).val()||"",extractTags:x,output:{mode:u,apiPreset:l.find(`#${m}-tool-api-preset`).val()||"",overwrite:!0,enabled:p},automation:{enabled:f,settleMs:Math.max(0,parseInt(l.find(`#${m}-tool-automation-settle-ms`).val(),10)||1200),cooldownMs:Math.max(0,parseInt(l.find(`#${m}-tool-automation-cooldown-ms`).val(),10)||5e3)},bypass:{enabled:y,presetId:y&&l.find(`#${m}-tool-bypass-preset`).val()||""},worldbooks:{enabled:l.find(`#${m}-tool-worldbooks-enabled`).is(":checked"),selected:v},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(l.find(`#${m}-tool-max-messages`).val(),10)||5),selectors:x}}},_showExtractionPreview(l,c,d=null){if(!D()||d!==null&&!this._isRenderSessionActive(l,d))return;let y=`${m}-${a}`,p=Array.isArray(c.messageEntries)?c.messageEntries:[],f=p.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${p.map((x,v)=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">${v===p.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${p.length-v} \u6761\u6D88\u606F`}</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(x.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(x.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(x.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";l.append($t({id:y,title:n,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${b((c.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6309\u6700\u8FD1\u6D88\u606F\u5230\u66F4\u65E9\u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${b(c.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${b(c.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${b(c.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${f}
        `})),Rt(l,y,{onSave:x=>x()}),l.find(`#${y}-save`).text("\u5173\u95ED"),l.find(`#${y}-cancel`).remove()},bindEvents(l){let c=D();if(!c||!j(l))return;let d=this,u=l.data("yytRenderSessionId"),y=()=>l.find("[data-worldbook-name]:checked").map((x,v)=>String(c(v).data("worldbook-name")||"").trim()).get().filter(Boolean),p=()=>{let x=y(),v=x.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":x.length<=2?x.join("\u3001"):`\u5DF2\u9009 ${x.length} \u9879\uFF1A${x.slice(0,2).join("\u3001")} \u7B49`;l.find(".yyt-worldbook-summary").text(v)},f=()=>{let x=String(this.worldbookFilter||"").trim().toLowerCase(),v=l.find(`#${m}-tool-worldbooks`),_=v.find(".yyt-worldbook-item"),A=0;_.each((S,z)=>{let $=c(z),I=String($.find("[data-worldbook-name]").data("worldbook-name")||"").toLowerCase(),R=!x||I.includes(x);$.toggleClass("yyt-hidden",!R),R&&(A+=1)}),v.find(".yyt-worldbook-search-empty").remove(),_.length>0&&A===0&&v.append('<div class="yyt-tool-compact-hint yyt-worldbook-empty yyt-worldbook-search-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>')};l.off(".yytToolPanel"),l.on("input.yytToolPanel",`#${m}-tool-worldbook-search`,x=>{this.worldbookFilter=String(c(x.currentTarget).val()||""),f()}),f(),l.on("change.yytToolPanel","[data-worldbook-name]",()=>{this.draftSelectedWorldbooks=y(),p()}),l.on("change.yytToolPanel",`#${m}-tool-output-mode`,()=>{let v=(l.find(`#${m}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?`${r} \u5F53\u524D\u6A21\u5F0F\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\uFF0C\u8BB0\u5F97\u540C\u65F6\u5F00\u542F\u5168\u5C40\u81EA\u52A8\u5316\u3002`:"\u968F AI \u8F93\u51FA\u6A21\u5F0F\u4E0D\u4F1A\u989D\u5916\u8BF7\u6C42\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002";l.find(".yyt-tool-mode-hint").text(v)}),l.on("change.yytToolPanel",`#${m}-tool-bypass-enabled`,x=>{let v=c(x.currentTarget).is(":checked");l.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!v)}),l.on("click.yytToolPanel",`#${m}-tool-save, #${m}-tool-save-top`,()=>{d._saveConfig(l,{silent:!1})}),l.on("click.yytToolPanel",`#${m}-tool-reset-template`,()=>{let x=Os(d.toolId);x?.promptTemplate&&(l.find(`#${m}-tool-prompt-template`).val(x.promptTemplate),w("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),l.on("click.yytToolPanel",`#${m}-tool-run-manual`,async()=>{if(d._saveConfig(l,{silent:!0}))try{let v=await Co(d.toolId);if(!d._isRenderSessionActive(l,u))return;!v?.success&&v?.error&&le("warning",v.error,{duration:3200,noticeId:`yyt-tool-run-${d.toolId}`})}catch(v){if(!d._isRenderSessionActive(l,u))return;w("error",v?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{d._renderIfSessionActive(l,u)}}),l.on("click.yytToolPanel",`#${m}-tool-preview-extraction`,async()=>{if(d._saveConfig(l,{silent:!0}))try{let v=await $o(d.toolId);if(!d._isRenderSessionActive(l,u))return;if(!v?.success){w("error",v?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}d._showExtractionPreview(l,v,u)}catch(v){if(!d._isRenderSessionActive(l,u))return;w("error",v?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}),ke(l,{namespace:"yytToolPanelSelect",selectors:[`#${m}-tool-output-mode`,`#${m}-tool-api-preset`,`#${m}-tool-bypass-preset`]})},_saveConfig(l,c={}){let d=this._getFormData(l),{silent:u=!1}=c,y=Ve(this.toolId,d);return y&&(this.draftSelectedWorldbooks=Array.isArray(d.worldbooks?.selected)?[...d.worldbooks.selected]:[]),y?u||w("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):w("error","\u4FDD\u5B58\u5931\u8D25"),y},destroy(l){!D()||!j(l)||(this.renderSessionId=(this.renderSessionId||0)+1,l.removeData("yytRenderSessionId"),xe(l,"yytToolPanelSelect"),l.off(".yytToolPanel"))},getStyles(){return Ks},renderTo(l){if(!D()||!j(l))return;let d=this._beginRenderSession(l);if(this.worldbookFilter=this.worldbookFilter||"",!Array.isArray(this.draftSelectedWorldbooks)){let y=te(this.toolId);this.draftSelectedWorldbooks=Array.isArray(y?.worldbooks?.selected)?[...y.worldbooks.selected]:[]}let u=Sr();Array.isArray(u)&&u.length>0?(this.availableWorldbooks=u,this.worldbookLoadState="ready"):this.worldbookLoadState="loading",l.html(this.render({})),this.bindEvents(l,{}),this.worldbookLoadState==="loading"&&Promise.resolve(this._loadWorldbooks()).catch(()=>(this.worldbookLoadState="empty",Sr())).then(y=>{this._isRenderSessionActive(l,d)&&(this.availableWorldbooks=Array.isArray(y)?y:[],this._updateWorldbookList(l,d))})},_updateWorldbookList(l,c=null){if(!D()||!j(l)||c!==null&&!this._isRenderSessionActive(l,c))return;let u=String(this.worldbookFilter||"").trim().toLowerCase(),y=Array.isArray(this.availableWorldbooks)?this.availableWorldbooks:[],p=Array.isArray(this.draftSelectedWorldbooks)?this.draftSelectedWorldbooks:[],f=u?y.filter(_=>String(_||"").toLowerCase().includes(u)):y,x=l.find(`#${m}-tool-worldbooks`);if(!x.length)return;if(y.length===0){x.html(`<div class="yyt-tool-compact-hint yyt-worldbook-empty">${this.worldbookLoadState==="loading"?"\u4E16\u754C\u4E66\u52A0\u8F7D\u4E2D\u2026":"\u5F53\u524D\u672A\u8BFB\u53D6\u5230\u53EF\u7528\u4E16\u754C\u4E66\u3002"}</div>`);return}x.html(f.length>0?f.map(_=>`
        <div class="yyt-worldbook-item">
          <label class="yyt-checkbox-label">
            <input type="checkbox" data-worldbook-name="${b(_)}" ${p.includes(_)?"checked":""}>
            <span>${b(_)}</span>
          </label>
        </div>
      `).join(""):'<div class="yyt-tool-compact-hint yyt-worldbook-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>');let v=p.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":p.length<=2?p.join("\u3001"):`\u5DF2\u9009 ${p.length} \u9879\uFF1A${p.slice(0,2).join("\u3001")} \u7B49`;l.find(".yyt-worldbook-summary").text(v)}}}var Ks,ky,ys=B(()=>{Ae();Lt();La();cr();Bs();Ka();Ks=`
  .yyt-tool-panel {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .yyt-tool-panel-hero {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 16px;
    align-items: stretch;
    padding: 18px 20px;
    border-radius: 26px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background:
      radial-gradient(520px 220px at 0% 0%, rgba(123, 183, 255, 0.18), transparent 62%),
      linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.025) 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 18px 36px rgba(0, 0, 0, 0.16);
  }

  .yyt-tool-panel-hero-copy {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
  }

  .yyt-tool-panel-hero-title {
    font-size: 24px;
    font-weight: 900;
    line-height: 1.08;
    letter-spacing: -0.2px;
    color: var(--yyt-text);
  }

  .yyt-tool-panel-hero-desc {
    font-size: 13px;
    line-height: 1.75;
    color: rgba(255, 255, 255, 0.8);
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
    padding: 8px 12px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 800;
    border: 1px solid rgba(255, 255, 255, 0.1);
    letter-spacing: 0.38px;
    color: var(--yyt-text);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  .yyt-tool-compact-hint {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.74);
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
    padding: 16px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.025) 100%),
      rgba(12, 16, 24, 0.42);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 12px 28px rgba(0, 0, 0, 0.14);
  }

  .yyt-worldbook-summary {
    font-size: 13px;
    color: var(--yyt-text);
    line-height: 1.7;
    font-weight: 800;
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
    gap: 10px;
    max-height: 260px;
    overflow: auto;
    padding-right: 2px;
  }

  .yyt-worldbook-item {
    padding: 12px 14px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.06);
    transition: border-color 0.18s ease, background 0.18s ease, transform 0.18s ease;
  }

  .yyt-worldbook-item:hover {
    border-color: rgba(123, 183, 255, 0.22);
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
  }

  .yyt-worldbook-empty {
    padding: 12px 14px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.035);
  }

  .yyt-code-textarea:focus {
    border-color: var(--yyt-accent);
    box-shadow: var(--yyt-focus-ring), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  .yyt-title-actions {
    margin-left: auto;
  }

  .yyt-tool-manual-area {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(240px, 0.75fr);
    gap: 14px;
    align-items: start;
  }

  .yyt-tool-runtime-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 18px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.025) 100%),
      rgba(255, 255, 255, 0.01);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 22px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 14px 30px rgba(0, 0, 0, 0.12);
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
    border-radius: 22px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.025) 100%),
      rgba(255, 255, 255, 0.01);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 14px 30px rgba(0, 0, 0, 0.12);
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

    .yyt-tool-manual-area {
      grid-template-columns: 1fr;
    }

    .yyt-tool-manual-actions {
      min-width: 0;
    }
  }
`;ky=Nt});var ps,Fa=B(()=>{ys();ps=Nt({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var fs,Ha=B(()=>{ys();fs=Nt({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var gs,qa=B(()=>{ys();gs=Nt({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"})});function xl(t=[],e={}){return t.map(s=>({...s,checked:e?.[s.key]===!0}))}function Ro(t){let{id:e,toolId:s,previewDialogId:r,previewTitle:o="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:a=[],processorOptions:n=[],heroHint:i="",extractionPlaceholder:l=""}=t;return{id:e,toolId:s,renderSessionId:0,_beginRenderSession(c){return this.renderSessionId=(this.renderSessionId||0)+1,j(c)&&c.data("yytRenderSessionId",this.renderSessionId),this.renderSessionId},_isRenderSessionActive(c,d){return j(c)&&c.data("yytRenderSessionId")===d},_renderIfSessionActive(c,d){return this._isRenderSessionActive(c,d)?(this.renderTo(c),!0):!1},render(){let c=te(this.toolId);if(!c)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let d=c.processor||{},u=c.extraction||{},y=c.runtime?.lastStatus||"idle",p=c.runtime?.lastRunAt?new Date(c.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",f=c.runtime?.lastError||"",x=Array.isArray(u.selectors)?u.selectors.join(`
`):"",v=c.output?.overwrite!==!1,_=xl(a,{[d.direction||a[0]?.key||""]:!0}),A=xl(n,d.options||{});return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${b(c.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${b(c.description||"")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u672C\u5730\u811A\u672C\u5904\u7406</span>
              <span class="yyt-tool-hero-chip">\u5199\u56DE ${v?"\u8986\u76D6":"\u8FFD\u52A0"}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${b(y)}</span>
              <div class="yyt-tool-panel-hero-actions">
                <button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-tool-save-top" id="${m}-tool-save-top">
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
              <input type="checkbox" id="${m}-tool-enabled" ${c.enabled!==!1?"checked":""}>
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
                <input type="number" class="yyt-input" id="${m}-tool-max-messages" min="1" max="50" value="${Number(u.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${m}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${b(l)}">${b(x)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u5B9A\u4F4D\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u5B9A\u4F4D\u3002\u624B\u52A8\u6267\u884C\u4F1A\u57FA\u4E8E\u6700\u65B0 AI \u6D88\u606F\u5168\u6587\u539F\u4F4D\u66FF\u6362\uFF0C\u5C3D\u91CF\u4FDD\u7559\u5916\u5C42\u6807\u7B7E\u548C\u5176\u4F59\u539F\u6587\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-shuffle"></i>
              <span>\u6267\u884C\u79CD\u7C7B</span>
            </div>
            <div class="yyt-local-output-mode-grid">
              ${_.map(S=>`
                <label class="yyt-local-choice-card">
                  <div class="yyt-checkbox-label">
                    <input type="radio" name="${m}-processor-direction-${this.toolId}" value="${b(S.key)}" ${S.checked?"checked":""}>
                    <span>${b(S.label)}</span>
                  </div>
                  <div class="yyt-local-choice-desc">${b(S.description||"")}</div>
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
              ${A.map(S=>`
                <div class="yyt-local-option-card">
                  <label class="yyt-checkbox-label">
                    <span>${b(S.label)}</span>
                    <input type="checkbox" data-option-key="${b(S.key)}" ${S.checked?"checked":""}>
                  </label>
                  <div class="yyt-tool-compact-hint">${b(S.description||"")}</div>
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
                  <input type="radio" name="${m}-output-mode-${this.toolId}" value="replace" ${v?"checked":""}>
                  <span>\u8986\u76D6\u539F\u5DE5\u5177\u5757</span>
                </div>
                <div class="yyt-local-choice-desc">\u4F18\u5148\u66FF\u6362\u8BE5\u5DE5\u5177\u6B64\u524D\u5199\u5165\u7684\u5185\u5BB9\u3002</div>
              </label>
              <label class="yyt-local-choice-card">
                <div class="yyt-checkbox-label">
                  <input type="radio" name="${m}-output-mode-${this.toolId}" value="append" ${v?"":"checked"}>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${b(y)}">${b(y)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${b(p)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${c.runtime?.successCount||0} / ${c.runtime?.errorCount||0}</span>
                </div>
                ${f?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${b(f)}</span>
                  </div>
                `:""}
              </div>
              <div class="yyt-tool-manual-actions">
                <button class="yyt-btn yyt-btn-primary" id="${m}-tool-run-manual">
                  <i class="fa-solid fa-play"></i> \u7ACB\u5373\u6267\u884C\u4E00\u6B21
                </button>
                <button class="yyt-btn yyt-btn-secondary" id="${m}-tool-preview-extraction">
                  <i class="fa-solid fa-vial"></i> \u6D4B\u8BD5\u63D0\u53D6
                </button>
                <div class="yyt-tool-compact-hint">${b(i||"\u4FDD\u5B58\u540E\u53EF\u76F4\u63A5\u5BF9\u6700\u8FD1 AI \u6D88\u606F\u505A\u672C\u5730\u6587\u672C\u5904\u7406\u3002")}</div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-footer yyt-panel-footer-end">
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-primary" id="${m}-tool-save">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>
        </div>
      `},_getFormData(c){let d=D(),u=te(this.toolId)||{};if(!d||!j(c))return u;let y=(c.find(`#${m}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(v=>v.trim()).filter(Boolean),p=c.find(`input[name="${m}-processor-direction-${this.toolId}"]:checked`).val()||a[0]?.key||"",f=c.find(`input[name="${m}-output-mode-${this.toolId}"]:checked`).val()||"replace",x={};return c.find("[data-option-key]").each((v,_)=>{let A=d(_);x[A.data("option-key")]=A.is(":checked")}),{enabled:c.find(`#${m}-tool-enabled`).is(":checked"),extractTags:y,output:{...u.output||{},mode:"local_transform",overwrite:f!=="append",enabled:!0},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(c.find(`#${m}-tool-max-messages`).val(),10)||5),selectors:y},processor:{...u.processor||{},direction:p,options:x},runtime:{...u.runtime||{}}}},_showExtractionPreview(c,d,u=null){if(!D()||u!==null&&!this._isRenderSessionActive(c,u))return;let p=`${m}-${r}`,f=Array.isArray(d.messageEntries)?d.messageEntries:[],x=f.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${f.map((v,_)=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">${_===f.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${f.length-_} \u6761\u6D88\u606F`}</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(v.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(v.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${b(v.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";c.append($t({id:p,title:o,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${b((d.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6309\u6700\u8FD1\u6D88\u606F\u5230\u66F4\u65E9\u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${b(d.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${b(d.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${b(d.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${x}
        `})),Rt(c,p,{onSave:v=>v()}),c.find(`#${p}-save`).text("\u5173\u95ED"),c.find(`#${p}-cancel`).remove()},bindEvents(c){if(!D()||!j(c))return;let u=this,y=c.data("yytRenderSessionId");c.off(".yytLocalToolPanel"),c.on("click.yytLocalToolPanel",`#${m}-tool-save, #${m}-tool-save-top`,()=>{u._saveConfig(c,{silent:!1})}),c.on("click.yytLocalToolPanel",`#${m}-tool-run-manual`,async()=>{if(u._saveConfig(c,{silent:!0}))try{let f=await Co(u.toolId);if(!u._isRenderSessionActive(c,y))return;!f?.success&&f?.error&&le("warning",f.error,{duration:3200,noticeId:`yyt-tool-run-${u.toolId}`})}catch(f){if(!u._isRenderSessionActive(c,y))return;w("error",f?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{u._renderIfSessionActive(c,y)}}),c.on("click.yytLocalToolPanel",`#${m}-tool-preview-extraction`,async()=>{if(u._saveConfig(c,{silent:!0}))try{let f=await $o(u.toolId);if(!u._isRenderSessionActive(c,y))return;if(!f?.success){w("error",f?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}u._showExtractionPreview(c,f,y)}catch(f){if(!u._isRenderSessionActive(c,y))return;w("error",f?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}),c.on("click.yytLocalToolPanel",`#${m}-tool-reset-template`,()=>{let p=Os(u.toolId);p?.promptTemplate&&(c.find(`#${m}-tool-prompt-template`).val(p.promptTemplate),w("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))})},_saveConfig(c,d={}){let u=this._getFormData(c),{silent:y=!1}=d,p=Ve(this.toolId,u);return p?y||w("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):w("error","\u4FDD\u5B58\u5931\u8D25"),p},destroy(c){!D()||!j(c)||(this.renderSessionId=(this.renderSessionId||0)+1,c.removeData("yytRenderSessionId"),c.off(".yytLocalToolPanel"))},getStyles(){return Cy},renderTo(c){!D()||!j(c)||(this._beginRenderSession(c),c.html(this.render({})),this.bindEvents(c,{}))}}}var Cy,Ga=B(()=>{Ae();Lt();Ka();ys();Cy=`${Ks}
  .yyt-local-option-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 10px;
  }

  .yyt-local-option-card {
    padding: 12px 13px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.065) 0%, rgba(255, 255, 255, 0.025) 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
  }

  .yyt-local-option-card:hover {
    border-color: rgba(255, 255, 255, 0.18);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.085) 0%, rgba(255, 255, 255, 0.03) 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 14px 24px rgba(0, 0, 0, 0.12);
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
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.065) 0%, rgba(255, 255, 255, 0.025) 100%);
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
  }

  .yyt-local-choice-card:hover {
    border-color: rgba(255, 255, 255, 0.18);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.085) 0%, rgba(255, 255, 255, 0.03) 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 14px 24px rgba(0, 0, 0, 0.12);
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
`});var ms,Ya=B(()=>{Ga();ms=Ro({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]})});var bs,Va=B(()=>{Ga();bs=Ro({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]})});var hs,Ja=B(()=>{ve();Bs();Ae();hs={id:"bypassPanel",_getActivePresetId(t){return t.find(".yyt-bypass-editor-content").data("presetId")||null},render(t){let e=H.getPresetList(),s=H.getDefaultPresetId();return`
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
    `},_renderPresetItem(t,e){let s=Tt&&Tt[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${b(t.name)}</span>
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
      `;let e=H.getDefaultPresetId()===t.id,s=Tt&&Tt[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${b(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
                 value="${b(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
        </div>

        <div class="yyt-bypass-messages-header">
          <span>\u6D88\u606F\u5217\u8868</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-add-message">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u6D88\u606F
          </button>
        </div>

        <div class="yyt-bypass-messages">
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
            <select class="yyt-select yyt-bypass-role-select yyt-select-fixed-width">
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${b(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let s=D();!s||!j(t)||(t.off(".yytBypass"),this._bindPresetListEvents(t,s),this._bindEditorEvents(t,s),this._bindFileEvents(t,s),ke(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_bindPresetListEvents(t,e){t.on("click.yytBypass",".yyt-bypass-preset-item",s=>{if(e(s.target).closest(".yyt-bypass-quick-delete").length)return;let r=e(s.currentTarget).data("presetId");this._selectPreset(t,e,r)}),t.on("click.yytBypass",".yyt-bypass-quick-delete",s=>{s.stopPropagation();let r=e(s.currentTarget).data("presetId");if(!r||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let o=H.deletePreset(r);o.success?(t.find(".yyt-bypass-editor-content").data("presetId")===r&&t.find(".yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),w("success","\u9884\u8BBE\u5DF2\u5220\u9664")):w("error",o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.on("click.yytBypass","#yyt-bypass-add",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click.yytBypass","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click.yytBypass","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click.yytBypass",".yyt-bypass-delete-message",s=>{let r=e(s.currentTarget).closest(".yyt-bypass-message"),o=r.data("messageId");r.remove()}),t.on("change.yytBypass",".yyt-bypass-message-enabled",s=>{e(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(s.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.on("click.yytBypass","#yyt-bypass-import",()=>{t.find("#yyt-bypass-import-file").click()}),t.on("change.yytBypass","#yyt-bypass-import-file",async s=>{let r=s.target.files[0];if(r){try{let o=await vt(r),a=H.importPresets(o);w(a.success?"success":"error",a.message),a.success&&this.renderTo(t)}catch(o){w("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.on("click.yytBypass","#yyt-bypass-export",()=>{try{let s=H.exportPresets();ht(s,`bypass_presets_${Date.now()}.json`),w("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){w("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(t,e,s){let r=H.getPreset(s);r&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),t.find(".yyt-bypass-editor").html(this._renderEditor(r)))},_createNewPreset(t,e){let s=`bypass_${Date.now()}`,r=H.createPreset({id:s,name:"\u65B0 Ai \u6307\u4EE4\u9884\u8BBE",description:"",messages:[]});r.success?(this.renderTo(t),this._selectPreset(t,e,s),w("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):w("error",r?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content"),r=s.data("presetId");if(!r)return;let o=s.find(".yyt-bypass-name-input").val().trim(),a=s.find(".yyt-bypass-description-input").val().trim();if(!o){w("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let n=[];s.find(".yyt-bypass-message").each(function(){let l=e(this);n.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let i=H.updatePreset(r,{name:o,description:a,messages:n});i.success?(w("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):w("error",i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let o=H.deletePreset(r);o.success?(this.renderTo(t),w("success","\u9884\u8BBE\u5DF2\u5220\u9664")):w("error",o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r)return;let o=`bypass_${Date.now()}`,a=H.duplicatePreset(r,o);a.success?(this.renderTo(t),this._selectPreset(t,e,o),w("success","\u9884\u8BBE\u5DF2\u590D\u5236")):w("error",a?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r)return;H.setDefaultPresetId(r),this._refreshPresetList(t,e);let o=H.getPreset(r);o&&t.find(".yyt-bypass-editor").html(this._renderEditor(o)),w("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE")},_addMessage(t,e){let s=t.find(".yyt-bypass-messages"),r={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};s.append(this._renderMessageItem(r))},_refreshPresetList(t,e){let s=H.getPresetList(),r=H.getDefaultPresetId(),o=this._getActivePresetId(t);t.find(".yyt-bypass-preset-list").html(s.map(a=>this._renderPresetItem(a,a.id===r)).join("")),o&&t.find(`.yyt-bypass-preset-item[data-preset-id="${o}"]`).addClass("yyt-active")},destroy(t){!D()||!j(t)||(xe(t,"yytBypassSelect"),t.off(".yytBypass"))},getStyles(){return`
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
        font-size: 12px;
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Al={};be(Al,{SettingsPanel:()=>_t,applyTheme:()=>_l,applyUiPreferences:()=>Xa,default:()=>Ry});function Fs({id:t,checked:e=!1,title:s="",hint:r=""}){return`
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
  `}function Sl(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function kr(){return Sl()?.document||document}function Tl(t=kr()){return t?.documentElement||document.documentElement}function _l(t,e=kr()){let s=Tl(e),r={...$y,...wl[t]||wl["dark-blue"]};Object.entries(r).forEach(([o,a])=>{s.style.setProperty(o,a)}),s.setAttribute("data-yyt-theme",t)}function Xa(t={},e=kr()){let s=Tl(e),{theme:r="dark-blue",compactMode:o=!1,animationEnabled:a=!0}=t||{};_l(r,e),s.classList.toggle("yyt-compact-mode",!!o),s.classList.toggle("yyt-no-animation",!a)}var $y,wl,_t,Ry,Po=B(()=>{ve();Ar();ae();Ir();Ae();$y={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)","--yyt-surface":"rgba(255, 255, 255, 0.03)","--yyt-surface-2":"rgba(255, 255, 255, 0.05)","--yyt-surface-3":"rgba(255, 255, 255, 0.075)","--yyt-surface-hover":"rgba(255, 255, 255, 0.08)","--yyt-surface-active":"rgba(255, 255, 255, 0.11)","--yyt-border":"rgba(255, 255, 255, 0.08)","--yyt-border-soft":"rgba(255, 255, 255, 0.05)","--yyt-border-strong":"rgba(255, 255, 255, 0.16)","--yyt-text":"rgba(255, 255, 255, 0.95)","--yyt-text-secondary":"rgba(255, 255, 255, 0.72)","--yyt-text-muted":"rgba(255, 255, 255, 0.5)","--yyt-focus-ring":"0 0 0 3px rgba(123, 183, 255, 0.18)","--yyt-on-accent":"#0b0f15","--yyt-control-bg":"linear-gradient(180deg, #1d2737 0%, #151d2a 100%)","--yyt-control-bg-hover":"linear-gradient(180deg, #243247 0%, #1a2638 100%)","--yyt-control-bg-active":"linear-gradient(180deg, #2a3951 0%, #1d2b3f 100%)","--yyt-control-bg-strong":"linear-gradient(180deg, #243247 0%, #192435 100%)","--yyt-control-bg-focus":"linear-gradient(180deg, #243a57 0%, #1a2a3f 100%)","--yyt-control-border":"rgba(146, 173, 212, 0.24)","--yyt-control-border-hover":"rgba(146, 173, 212, 0.36)","--yyt-control-border-focus":"rgba(123, 183, 255, 0.72)","--yyt-control-shadow":"0 12px 24px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.04)","--yyt-control-shadow-hover":"0 16px 28px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.06)","--yyt-control-shadow-focus":"0 18px 30px rgba(8, 14, 24, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.06)","--yyt-control-shadow-active":"0 10px 20px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.04)","--yyt-select-surface":"#121a26","--yyt-select-option-bg":"#192334","--yyt-select-option-hover-bg":"#233249","--yyt-select-option-selected-bg":"#2a3f60","--yyt-select-option-border":"rgba(123, 183, 255, 0.22)","--yyt-select-option-selected-border":"rgba(123, 183, 255, 0.4)","--yyt-select-dropdown-shadow":"0 24px 44px rgba(0, 0, 0, 0.52), 0 0 0 1px rgba(8, 12, 18, 0.82)","--yyt-select-arrow-color":"rgba(255, 255, 255, 0.52)"},wl={"dark-blue":{"--yyt-on-accent":"#0b0f15"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#120b1f"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#0b150f"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.72)","--yyt-text-muted":"rgba(15, 23, 42, 0.52)","--yyt-surface":"rgba(255, 255, 255, 0.66)","--yyt-surface-2":"rgba(255, 255, 255, 0.86)","--yyt-surface-3":"rgba(255, 255, 255, 0.94)","--yyt-surface-hover":"rgba(255, 255, 255, 0.92)","--yyt-surface-active":"rgba(255, 255, 255, 0.98)","--yyt-border":"rgba(15, 23, 42, 0.08)","--yyt-border-soft":"rgba(15, 23, 42, 0.05)","--yyt-border-strong":"rgba(15, 23, 42, 0.14)","--yyt-focus-ring":"0 0 0 3px rgba(59, 130, 246, 0.14)","--yyt-on-accent":"#0f172a","--yyt-control-bg":"linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(241, 245, 249, 0.98) 100%)","--yyt-control-bg-hover":"linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(226, 232, 240, 0.98) 100%)","--yyt-control-bg-active":"linear-gradient(180deg, rgba(239, 246, 255, 1) 0%, rgba(219, 234, 254, 0.98) 100%)","--yyt-control-bg-strong":"linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(241, 245, 249, 0.98) 100%)","--yyt-control-bg-focus":"linear-gradient(180deg, rgba(239, 246, 255, 1) 0%, rgba(219, 234, 254, 0.98) 100%)","--yyt-control-border":"rgba(59, 130, 246, 0.18)","--yyt-control-border-hover":"rgba(59, 130, 246, 0.28)","--yyt-control-border-focus":"rgba(59, 130, 246, 0.58)","--yyt-control-shadow":"0 10px 22px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.75)","--yyt-control-shadow-hover":"0 12px 24px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.85)","--yyt-control-shadow-focus":"0 14px 26px rgba(59, 130, 246, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.9)","--yyt-control-shadow-active":"0 8px 18px rgba(15, 23, 42, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.85)","--yyt-select-surface":"#ffffff","--yyt-select-option-bg":"#f8fafc","--yyt-select-option-hover-bg":"#eff6ff","--yyt-select-option-selected-bg":"#dbeafe","--yyt-select-option-border":"rgba(59, 130, 246, 0.16)","--yyt-select-option-selected-border":"rgba(59, 130, 246, 0.34)","--yyt-select-dropdown-shadow":"0 18px 32px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(148, 163, 184, 0.18)","--yyt-select-arrow-color":"rgba(15, 23, 42, 0.45)"}};_t={id:"settingsPanel",render(){let t=Je.getSettings(),e=t.debug?.enableDebugLog===!0,s=t.automation?.enabled===!0,r=this._getAutomationRuntime();return`
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
    `},_renderAutomationTab(t={},e=null){let s=t.enabled===!0,r=Array.isArray(e?.recentTransactions)?e.recentTransactions.slice().reverse():[],o=e?.hostBinding||{},a=Array.isArray(o.eventBindings)&&o.eventBindings.length>0?o.eventBindings.join(" / "):"\u6682\u65E0\u4E8B\u4EF6\u7ED1\u5B9A",n=r.length>0?r.map(i=>{let l=i?.results?.[0]?.meta?.writebackDetails?.refresh||{},c=Array.isArray(l?.requestMethods)?l.requestMethods.join(" / "):"",d=l?.eventSource||l?.eventName||c||l?.confirmedBy;return`
          <div class="yyt-settings-runtime-item">
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
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u81EA\u52A8\u89E6\u53D1\u603B\u5F00\u5173</div>
          <div class="yyt-form-group">
            ${Fs({id:"yyt-setting-automationEnabled",checked:t.enabled,title:"\u542F\u7528\u5DE5\u5177\u81EA\u52A8\u89E6\u53D1",hint:"\u8FD9\u91CC\u53EA\u4FDD\u7559\u4E00\u4E2A\u5168\u5C40\u5F00\u5173\u3002\u5F00\u542F\u540E\uFF0C\u6240\u6709\u5904\u4E8E\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u6A21\u5F0F\u7684\u5DE5\u5177\u90FD\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\u3002"})}
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
          <div class="yyt-form-hint">\u5F53\u524D\u72B6\u6001\uFF1A${s?"\u5DF2\u542F\u7528":"\u672A\u542F\u7528"}\u3002\u5F00\u542F\u540E\uFF0C\u6240\u6709\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u5DE5\u5177\u90FD\u4F1A\u5728 AI \u56DE\u590D\u540E\u81EA\u52A8\u6267\u884C\u3002</div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u81EA\u52A8\u5316\u8BCA\u65AD</div>
          <div class="yyt-settings-runtime-grid">
            <div class="yyt-settings-runtime-chip ${e?.enabled?"is-on":"is-off"}">\u670D\u52A1 ${e?.enabled?"\u8FD0\u884C\u4E2D":"\u672A\u542F\u7528"}</div>
            <div class="yyt-settings-runtime-chip ${o.initialized?"is-on":"is-off"}">\u76D1\u542C ${o.initialized?"\u5DF2\u7ED1\u5B9A":"\u672A\u7ED1\u5B9A"}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u5F85\u5904\u7406 ${e?.pendingTimerCount||0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u6392\u961F\u69FD\u4F4D ${e?.queuedSlotCount||0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u4E8B\u52A1 ${r.length}</div>
          </div>
          <div class="yyt-form-hint">\u4E8B\u4EF6\u6E90\uFF1A<code>${o.source||"unavailable"}</code>\uFF1B\u6700\u8FD1\u521D\u59CB\u5316\uFF1A<code>${o.lastInitResult||"idle"}</code>\uFF1B\u5C1D\u8BD5\u6B21\u6570\uFF1A<code>${o.initAttempts||0}</code>\u3002</div>
          <div class="yyt-form-hint">\u4E8B\u4EF6\u7ED1\u5B9A\uFF1A<code>${a}</code></div>
          ${o.lastError?`<div class="yyt-form-hint">\u6700\u8FD1\u9519\u8BEF\uFF1A<code>${o.lastError}</code></div>`:""}
          ${o.retryScheduled?`<div class="yyt-form-hint">\u5DF2\u5B89\u6392\u91CD\u8BD5\uFF1A<code>${o.retryDelayMs||0}ms</code></div>`:""}
          <div class="yyt-form-hint">\u82E5\u81EA\u52A8\u89E6\u53D1\u5931\u8D25\uFF0C\u4F18\u5148\u770B\u6700\u8FD1\u4E8B\u52A1\u7684 verdict\uFF0C\u4F8B\u5982 <code>automation_disabled</code>\u3001<code>no_auto_tools</code>\u3001<code>assistant_message_not_found</code>\u3002</div>
          <div class="yyt-settings-runtime-list">${n}</div>
        </div>
      </div>
    `},_renderDebugTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u65E5\u5FD7\u7EA7\u522B</div>
          <div class="yyt-form-group">
            ${Fs({id:"yyt-setting-enableDebugLog",checked:t.enableDebugLog,title:"\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7",hint:"\u5F00\u542F\u540E Logger \u9762\u677F\u5C06\u8BB0\u5F55 DEBUG \u7EA7\u522B\u65E5\u5FD7\uFF0C\u5173\u95ED\u4EC5\u8BB0\u5F55 INFO \u53CA\u4EE5\u4E0A"})}
          </div>
          <div class="yyt-settings-hint" style="margin-top: 8px;">
            <i class="fa-solid fa-terminal"></i> \u5728\u300C\u65E5\u5FD7\u300D\u9762\u677F\u4E2D\u67E5\u770B\u3001\u641C\u7D22\u548C\u5BFC\u51FA\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7
          </div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u6267\u884C\u8BB0\u5F55</div>
          <div class="yyt-form-group">
            ${Fs({id:"yyt-setting-saveExecutionHistory",checked:t.saveExecutionHistory,title:"\u4FDD\u5B58\u6267\u884C\u5386\u53F2",hint:"\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5"})}
          </div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">UI \u663E\u793A</div>
          <div class="yyt-form-group">
            ${Fs({id:"yyt-setting-showRuntimeBadge",checked:t.showRuntimeBadge,title:"\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0",hint:"\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668"})}
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
            ${Fs({id:"yyt-setting-compactMode",checked:t.compactMode,title:"\u7D27\u51D1\u6A21\u5F0F",hint:"\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9"})}
          </div>

          <div class="yyt-form-group">
            ${Fs({id:"yyt-setting-animationEnabled",checked:t.animationEnabled,title:"\u542F\u7528\u52A8\u753B\u6548\u679C",hint:"\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B"})}
          </div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u6A21\u677F\u5B8F\u8BF4\u660E</div>
          <div class="yyt-form-hint">\u5DE5\u5177\u6A21\u677F\u91CC\u53EF\u76F4\u63A5\u4F7F\u7528\u4E0B\u9762\u8FD9\u4E9B\u5B8F\u3002\u4E16\u754C\u4E66\u5185\u5BB9\u53EA\u6709\u5728\u6A21\u677F\u91CC\u663E\u5F0F\u5199\u5165 <code>{{toolWorldbookContent}}</code> \u65F6\u624D\u4F1A\u6CE8\u5165\u3002</div>
          <div class="yyt-settings-macro-list">
            ${this._renderMacroList()}
          </div>
        </div>
      </div>
    `},_renderMacroList(){return Xe.getAvailableVariables().map(t=>`
        <div class="yyt-settings-macro-item">
          <code>${t.name}</code>
          <span>${t.description}</span>
        </div>
      `).join("")},bindEvents(t){let e=D();if(!e||!j(t))return;let s=this;t.off(".yytSettings"),t.on("click.yytSettings",".yyt-settings-tab",o=>{let a=e(o.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),e(o.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${a}"]`).addClass("yyt-active")}),t.on("click.yytSettings","#yyt-settings-save",()=>{s._saveSettings(t)}),t.on("click.yytSettings","#yyt-settings-reset",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(Je.resetSettings(),Xa(_r.ui,kr()),s.renderTo(t),w("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}),ke(t,{namespace:"yytSettingsSelect",selectors:["#yyt-setting-queueStrategy","#yyt-setting-theme"]});let r=Je.getDebugSettings();N.setLevel(r.enableDebugLog?Y.DEBUG:Y.INFO)},_saveSettings(t){let e={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val(),10)||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val(),10)||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val(),10)||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val(),10)||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},automation:{enabled:t.find("#yyt-setting-automationEnabled").is(":checked"),settleMs:parseInt(t.find("#yyt-setting-automationSettleMs").val(),10)||1200,cooldownMs:parseInt(t.find("#yyt-setting-automationCooldownMs").val(),10)||5e3,maxConcurrentSlots:Je.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};Je.saveSettings(e),N.setLevel(e.debug.enableDebugLog?Y.DEBUG:Y.INFO),Xa(e.ui,kr()),w("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},_getAutomationRuntime(){try{return Sl()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},destroy(t){!D()||!j(t)||(xe(t,"yytSettingsSelect"),t.off(".yytSettings"))},getStyles(){return`
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
        padding: 18px 20px;
        border-radius: 26px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background:
          radial-gradient(520px 220px at 0% 0%, rgba(123, 183, 255, 0.16), transparent 62%),
          linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.025) 100%);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 18px 36px rgba(0, 0, 0, 0.16);
      }

      .yyt-settings-hero-copy {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 0;
      }

      .yyt-settings-hero-title {
        font-size: 26px;
        font-weight: 900;
        line-height: 1.05;
        letter-spacing: -0.3px;
        color: var(--yyt-text);
      }

      .yyt-settings-hero-desc {
        font-size: 13px;
        line-height: 1.75;
        color: rgba(255, 255, 255, 0.8);
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
        border: 1px solid rgba(255, 255, 255, 0.12);
        letter-spacing: 0.4px;
        color: var(--yyt-text);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.04) 100%);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 8px 16px rgba(0, 0, 0, 0.1);
      }

      .yyt-settings-status-chip.is-on {
        color: #4ade80;
        border-color: rgba(74, 222, 128, 0.32);
        background: linear-gradient(135deg, rgba(74, 222, 128, 0.16) 0%, rgba(74, 222, 128, 0.07) 100%);
      }

      .yyt-settings-status-chip.is-off {
        color: #f87171;
        border-color: rgba(248, 113, 113, 0.32);
        background: linear-gradient(135deg, rgba(248, 113, 113, 0.16) 0%, rgba(248, 113, 113, 0.07) 100%);
      }

      .yyt-settings-status-chip.is-neutral {
        color: var(--yyt-text);
      }

      .yyt-settings-tabs {
        display: flex;
        gap: 8px;
        padding: 7px;
        border-radius: 22px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.055) 0%, rgba(255, 255, 255, 0.025) 100%);
        border: 1px solid rgba(255, 255, 255, 0.09);
        width: fit-content;
        max-width: 100%;
        flex-wrap: wrap;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 10px 20px rgba(0, 0, 0, 0.1);
      }

      .yyt-settings-tab {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        border-radius: 15px;
        border: 1px solid transparent;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.01) 100%);
        color: var(--yyt-text-secondary);
        cursor: pointer;
        transition: all 0.18s ease;
        font-weight: 800;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
      }

      .yyt-settings-tab:hover {
        color: var(--yyt-text);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
        border-color: rgba(255, 255, 255, 0.1);
      }

      .yyt-settings-tab.yyt-active {
        color: var(--yyt-on-accent);
        background: linear-gradient(135deg, var(--yyt-accent) 0%, var(--yyt-accent-strong) 100%);
        border-color: transparent;
        box-shadow: 0 14px 30px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.24);
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

      .yyt-settings-section {
        position: relative;
        overflow: visible;
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 18px;
        border-radius: 22px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.025) 100%),
          rgba(255, 255, 255, 0.01);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 16px 32px rgba(0, 0, 0, 0.12);
      }

      .yyt-settings-section-title {
        font-size: 16px;
        font-weight: 900;
        color: var(--yyt-text);
        margin-bottom: 0;
      }

      .yyt-settings-footer {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        padding-top: 2px;
      }

      .yyt-settings-macro-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 12px;
      }

      .yyt-settings-macro-item {
        display: grid;
        grid-template-columns: minmax(180px, 240px) minmax(0, 1fr);
        gap: 14px;
        align-items: start;
        padding: 14px 16px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05);
      }

      .yyt-settings-macro-item code {
        color: var(--yyt-accent-strong);
        word-break: break-word;
        font-weight: 800;
      }

      .yyt-settings-macro-item span {
        color: rgba(255, 255, 255, 0.8);
        font-size: 12px;
        line-height: 1.7;
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
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.035) 100%);
        color: var(--yyt-text);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08);
      }

      .yyt-settings-runtime-chip.is-on {
        color: #4ade80;
        border-color: rgba(74, 222, 128, 0.35);
        background: linear-gradient(135deg, rgba(74, 222, 128, 0.16) 0%, rgba(74, 222, 128, 0.07) 100%);
      }

      .yyt-settings-runtime-chip.is-off {
        color: #f87171;
        border-color: rgba(248, 113, 113, 0.35);
        background: linear-gradient(135deg, rgba(248, 113, 113, 0.16) 0%, rgba(248, 113, 113, 0.07) 100%);
      }

      .yyt-settings-runtime-chip.is-neutral {
        color: var(--yyt-text);
      }

      .yyt-settings-runtime-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 14px;
      }

      .yyt-settings-runtime-item {
        padding: 14px 16px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05);
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .yyt-settings-runtime-meta {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        font-size: 11px;
        color: rgba(255, 255, 255, 0.72);
      }

      .yyt-settings-runtime-main {
        font-size: 12px;
        color: var(--yyt-text);
        line-height: 1.7;
        word-break: break-word;
      }
    `},renderTo(t){t.html(this.render({})),this.bindEvents(t,{})}},Ry=_t});function Oo(t,e,s){return`${Number.isFinite(t)?t:-1}:${Number.isFinite(e)?e:-1}:${ne(s)||"*"}`}function ne(t){return t==null?"":String(t).trim()}function ue(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function Hs(t={}){return{chatId:ne(t.chatId),sourceMessageId:ne(t.sourceMessageId||t.messageId),sourceSwipeId:ne(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:ne(t.effectiveSwipeId||t.sourceSwipeId),slotBindingKey:ne(t.slotBindingKey),slotRevisionKey:ne(t.slotRevisionKey),slotTransactionId:ne(t.slotTransactionId),traceId:ne(t.traceId),resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now()}}function Qa(t={}){return{resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now(),runSource:ne(t.runSource)||yt.MANUAL,traceId:ne(t.traceId),chatId:ne(t.chatId),sourceMessageId:ne(t.sourceMessageId||t.messageId),sourceSwipeId:ne(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:ne(t.effectiveSwipeId||t.sourceSwipeId)||"swipe:current",slotBindingKey:ne(t.slotBindingKey),slotRevisionKey:ne(t.slotRevisionKey),slotTransactionId:ne(t.slotTransactionId),assistantContentFingerprint:ne(t.assistantContentFingerprint),assistantBaseFingerprint:ne(t.assistantBaseFingerprint),assistantText:String(t.assistantText||""),assistantBaseText:String(t.assistantBaseText||""),targetMessageIndex:Number.isFinite(t.targetMessageIndex)?t.targetMessageIndex:-1}}function Gs(t){return!t||typeof t!="object"?null:{slotBindingKey:ne(t.slotBindingKey),slotRevisionKey:ne(t.slotRevisionKey),sourceMessageId:ne(t.sourceMessageId),sourceSwipeId:ne(t.sourceSwipeId),tables:Array.isArray(t.tables)?ue(t.tables):[],updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0,meta:t.meta&&typeof t.meta=="object"?ue(t.meta):{}}}function Do(t={},e={}){let s=Qa(t);return{slotBindingKey:s.slotBindingKey,slotRevisionKey:s.slotRevisionKey,sourceMessageId:s.sourceMessageId,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId,tables:Array.isArray(e.tables)?ue(e.tables):[],updatedAt:Number.isFinite(e.updatedAt)?e.updatedAt:Date.now(),meta:e.meta&&typeof e.meta=="object"?ue(e.meta):{}}}function Lo(t){return!t||typeof t!="object"?{lastResolvedTarget:null,lastCommittedTarget:null,updatedAt:0}:{lastResolvedTarget:t.lastResolvedTarget?Hs(t.lastResolvedTarget):null,lastCommittedTarget:t.lastCommittedTarget?Hs(t.lastCommittedTarget):null,updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0}}var Cr,qs,yt,$r,vs,El,Bt=B(()=>{Cr="YouYouToolkit_tableState",qs="YouYouToolkit_tableBindings",yt=Object.freeze({MANUAL:"MANUAL_TABLE",AUTO:"AUTO_TABLE"}),$r=Object.freeze({EXACT:"exact",BINDING_FALLBACK:"binding_fallback",TEMPLATE:"template",EMPTY:"empty"}),vs=Object.freeze({INSERT_ROW:"insertRow",UPDATE_ROW:"updateRow",DELETE_ROW:"deleteRow"}),El=Object.freeze({CELL:"cell",ROW:"row",COLUMN:"column"})});function W(t,e,s="",r=Js){return{key:t,title:e,description:s,type:r,required:!1}}function Ut({id:t,name:e,note:s,aiInstructions:r,columns:o}){return{id:t,name:e,note:s,enabled:!0,aiInstructions:{init:r?.init||"",create:r?.create||"",update:r?.update||"",delete:r?.delete||""},columns:o,rows:[]}}function M(t,e=""){return t==null?e:String(t).trim()||e}function Il(t,e=!1){return t==null?e:t===!0}function Dy(t){if(!Array.isArray(t)||t.length!==1)return!1;let e=t[0]&&typeof t[0]=="object"?t[0]:null;if(!e)return!1;let s=M(e.name||e.title,""),r=M(e.note||e.description,""),o=Array.isArray(e.columns)?e.columns:[],a=Array.isArray(e.rows)?e.rows:[];if(s&&!["\u88681","\u8868\u683C 1","\u8868\u683C1"].includes(s)||r||o.length!==1||a.length>1)return!1;let n=o[0]&&typeof o[0]=="object"?o[0]:{},i=M(n.key||n.id,""),l=M(n.title||n.name||n.label,"");if(M(n.description||n.note,"")||i&&i!=="col_1"||l&&!["\u52171","col_1"].includes(l))return!1;if(a.length===0)return!0;let d=a[0]&&typeof a[0]=="object"?a[0]:{},u=M(d.name||d.title||d.label,""),y=d.cells&&typeof d.cells=="object"&&!Array.isArray(d.cells)?d.cells:{},p=Array.isArray(d.values)?d.values:[],f=Object.values(y).some(x=>M(x,""))||p.some(x=>M(x,""));return(!u||u==="\u884C1")&&!f}function Ly(t,{seedDefaultWhenMissing:e=!1}={}){return Dy(t)?ue(No):Array.isArray(t)?ue(t):t&&typeof t=="object"?By(t):e?ue(No):[]}function Ny(t=""){let e=[],s=M(t,""),r=/-\s*列\d+\s*[:：]\s*([^\n\-–—]+?)\s*[-–—]\s*([^\n]+)/g,o;for(;o=r.exec(s);)e.push({title:M(o[1],""),description:M(o[2],"")});return e}function By(t={}){let e=t&&typeof t=="object"?t:{};return Object.keys(e).filter(r=>r.startsWith("sheet_")&&e[r]&&typeof e[r]=="object").map((r,o)=>({key:r,table:e[r],fallbackOrder:o})).sort((r,o)=>{let a=Number.isFinite(r.table.orderNo)?r.table.orderNo:r.fallbackOrder,n=Number.isFinite(o.table.orderNo)?o.table.orderNo:o.fallbackOrder;return a-n}).map(({key:r,table:o},a)=>{let n=o.sourceData&&typeof o.sourceData=="object"?o.sourceData:{},i=Array.isArray(o.content)?o.content:[],l=Array.isArray(i[0])?i[0]:[],c=Ny(n.note),d=new Set,u=l.slice(1).map((p,f)=>{let x=c[f]||{},v=M(p||x.title,`\u5217${f+1}`);return{key:$l(v||`col_${f+1}`,d),title:v,description:M(x.description,""),type:Js,required:!1}}),y=i.slice(1).map((p,f)=>{let x=Array.isArray(p)?p:[],v={};return u.forEach((_,A)=>{v[_.key]=Rr(x[A+1])}),{name:M(x[0],`\u884C${f+1}`),cells:v}});return{id:M(o.uid||r,`sheet_${a+1}`),name:M(o.name,`\u8868${a+1}`),note:M(n.note,""),enabled:o.enabled!==!1,aiInstructions:{init:M(n.initNode,""),create:M(n.insertNode,""),update:M(n.updateNode,""),delete:M(n.deleteNode,"")},columns:u,rows:y}})}function Rr(t){if(t==null)return"";if(typeof t=="string")return t;try{return JSON.stringify(t,null,2)}catch{return String(t)}}function Uy(t,e="col"){return M(t,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||e}function $l(t,e=new Set){let s=Uy(t,"col"),r=s,o=2;for(;e.has(r);)r=`${s}_${o}`,o+=1;return e.add(r),r}function jy(t=[]){let e=[],s=0;return t.forEach(r=>{let o=r&&typeof r=="object"?r:{},a=o.cells&&typeof o.cells=="object"&&!Array.isArray(o.cells)?o.cells:null,n=Array.isArray(o.cells)?o.cells:Array.isArray(o.values)?o.values:null;a&&Object.keys(a).forEach(i=>{e.includes(i)||e.push(i)}),n&&n.length>s&&(s=n.length)}),e.length>0?e.map(r=>({key:r,title:String(r)})):s>0?Array.from({length:s},(r,o)=>({key:`col_${o+1}`,title:`\u5217${o+1}`})):[]}function tn(t,e=Js){let s=M(t,e);return kl.some(r=>r.value===s)?s:e}function zy(t={},e=0,s=new Set){let r=t&&typeof t=="object"?t:{},o=M(r.title||r.name||r.label,`\u5217${e+1}`),a=M(r.key||r.id,""),n=$l(a||o||`col_${e+1}`,s),i=[a,M(r.title,""),M(r.name,""),M(r.label,"")].filter(Boolean);return{key:n,title:o,description:M(r.description||r.note,""),type:tn(r.type),required:r.required===!0,sourceKeys:i}}function Wy(t={},e={},s=0){let r=t.cells&&typeof t.cells=="object"&&!Array.isArray(t.cells)?t.cells:null,o=Array.isArray(t.cells)?t.cells:Array.isArray(t.values)?t.values:null;if(r){let a=[...Array.isArray(e.sourceKeys)?e.sourceKeys:[],e.key,e.title].filter(Boolean);for(let n of a)if(r[n]!==void 0)return Rr(r[n])}return o&&o[s]!==void 0?Rr(o[s]):""}function Ky(t={},e=[],s=0){let r=t&&typeof t=="object"?t:{},o={};return e.forEach((a,n)=>{o[a.key]=Wy(r,a,n)}),{name:M(r.name||r.title||r.label,`\u884C${s+1}`),cells:o}}function Fy(t={}){let e=t&&typeof t=="object"?t:{};return{init:M(e.init,""),create:M(e.create,""),update:M(e.update,""),delete:M(e.delete,"")}}function Hy(t={},e=""){let s=t&&typeof t=="object"?t:{},r=M(s.presetId,M(e,""));return{enabled:s.enabled===!0,presetId:r}}function Rl(t={},e=0){let s=t&&typeof t=="object"?t:{},r=new Set,a=(Array.isArray(s.columns)&&s.columns.length>0?s.columns:jy(Array.isArray(s.rows)?s.rows:[])).map((i,l)=>zy(i,l,r)),n=Array.isArray(s.rows)?s.rows.map((i,l)=>Ky(i,a,l)):[];return{id:M(s.id,""),name:M(s.name||s.title,`\u8868${e+1}`),note:M(s.note||s.description,""),enabled:s.enabled!==!1,aiInstructions:Fy(s.aiInstructions),columns:a.map(i=>({key:i.key,title:i.title,description:M(i.description,""),type:tn(i.type),required:i.required===!0})),rows:n}}function Pl(t={}){let e=t&&typeof t=="object"?t:{},s=Array.isArray(e.lastErrorDetails)?e.lastErrorDetails.map(o=>M(o,"")).filter(Boolean):[],r=e.lastValidationSummary&&typeof e.lastValidationSummary=="object"?{errorCount:Number.isFinite(e.lastValidationSummary.errorCount)?e.lastValidationSummary.errorCount:0,warningCount:Number.isFinite(e.lastValidationSummary.warningCount)?e.lastValidationSummary.warningCount:0}:{errorCount:0,warningCount:0};return{lastStatus:M(e.lastStatus,Vs.IDLE),lastRunAt:Number.isFinite(e.lastRunAt)?e.lastRunAt:0,lastDurationMs:Number.isFinite(e.lastDurationMs)?e.lastDurationMs:0,lastError:M(e.lastError,""),lastErrorDetails:s,lastValidationSummary:r,successCount:Number.isFinite(e.successCount)?e.successCount:0,errorCount:Number.isFinite(e.errorCount)?e.errorCount:0,lastSourceMessageId:M(e.lastSourceMessageId,""),lastSlotRevisionKey:M(e.lastSlotRevisionKey,""),lastLoadMode:M(e.lastLoadMode,""),lastMirrorApplied:e.lastMirrorApplied===!0}}function qy(){return{tables:[]}}function Ol(t=[]){return!Array.isArray(t)||t.length===0?qy():{tables:t.map((e,s)=>Rl(e,s))}}function Gy(t={}){let e=t&&typeof t=="object"?t:{};return(Array.isArray(e.tables)?e.tables:[]).map((r,o)=>Rl(r,o))}function Dl(t="",e={},s={}){let r=tn(e?.type),o=String(t??"").trim(),a=M(s?.label,`${M(s?.tableName,"\u8868\u683C")} / ${M(s?.rowName,"\u884C")} / ${M(e?.title||e?.key,"\u5355\u5143\u683C")}`),n=[],i=[];if(e?.required===!0&&!o&&n.push(`${a} \u4E3A\u5FC5\u586B\uFF0C\u5F53\u524D\u4E3A\u7A7A\u3002`),!o)return{valid:n.length===0,errors:n,warnings:i};if(r==="number"&&!Number.isFinite(Number(o))&&n.push(`${a} \u9700\u8981\u586B\u5199\u6570\u5B57\u3002`),r==="boolean"&&!["true","false","1","0","yes","no"].includes(o.toLowerCase())&&n.push(`${a} \u9700\u8981\u586B\u5199\u5E03\u5C14\u503C\uFF08true / false\uFF09\u3002`),r==="date"&&Number.isNaN(Date.parse(o))&&n.push(`${a} \u9700\u8981\u586B\u5199\u53EF\u89E3\u6790\u7684\u65E5\u671F\u3002`),r==="json")try{JSON.parse(o)}catch(l){n.push(`${a} \u9700\u8981\u586B\u5199\u5408\u6CD5 JSON\uFF1A${l?.message||"\u89E3\u6790\u5931\u8D25"}`)}return{valid:n.length===0,errors:n,warnings:i}}function Yy(t={}){let s=Gy(t&&typeof t=="object"?t:{}),r=[];return s.forEach((o,a)=>{let n=M(o?.name,`\u8868${a+1}`),i=Array.isArray(o?.columns)?o.columns:[],l=Array.isArray(o?.rows)?o.rows:[];n||r.push(`\u8868 ${a+1} \u7F3A\u5C11\u540D\u79F0\u3002`),i.length===0&&r.push(`${n} \u81F3\u5C11\u9700\u8981\u4E00\u5217\u3002`);let c=new Set;i.forEach((d,u)=>{let y=M(d?.key,""),p=M(d?.title,`\u5217${u+1}`);if(!y){r.push(`${n} / ${p} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`);return}if(c.has(y)){r.push(`${n} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${y}`);return}c.add(y)}),l.forEach((d,u)=>{let y=M(d?.name,`\u884C${u+1}`),p=d?.cells&&typeof d.cells=="object"&&!Array.isArray(d.cells)?d.cells:{};i.forEach((f,x)=>{let v=M(f?.key,""),_=M(f?.title||v,`\u5217${x+1}`),A=v?Rr(p[v]):"",S=Dl(A,f,{label:`${n} / ${y} / ${_}`,tableName:n,rowName:y});r.push(...S.errors)})})}),{valid:r.length===0,errors:r,tables:s}}function Ys({severity:t="error",message:e="",tableIndex:s=-1,tableName:r="",columnIndex:o=-1,columnKey:a="",rowIndex:n=-1,rowName:i="",cellKey:l=""}={}){return{severity:t,message:M(e,t==="warning"?"\u5B58\u5728\u8B66\u544A\u3002":"\u5B58\u5728\u9519\u8BEF\u3002"),tableIndex:s,tableName:M(r,""),columnIndex:o,columnKey:M(a,""),rowIndex:n,rowName:M(i,""),cellKey:M(l,"")}}function xs(t={}){let e=Yy(t),s=[];if(!e.valid)return{...e,warnings:[],issues:s,summary:{errorCount:e.errors.length,warningCount:0}};let r=Array.isArray(e.tables)?e.tables:[];r.forEach((n,i)=>{let l=M(n?.name,`\u8868${i+1}`),c=Array.isArray(n?.columns)?n.columns:[],d=Array.isArray(n?.rows)?n.rows:[],u=new Set;l||s.push(Ys({severity:"error",message:`\u8868 ${i+1} \u7F3A\u5C11\u540D\u79F0\u3002`,tableIndex:i,tableName:l})),c.forEach((y,p)=>{let f=M(y?.key,""),x=M(y?.title,`\u5217${p+1}`);f||s.push(Ys({severity:"error",message:`${l} / ${x} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`,tableIndex:i,tableName:l,columnIndex:p,columnKey:f,cellKey:f})),f&&(u.has(f)&&s.push(Ys({severity:"error",message:`${l} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${f}`,tableIndex:i,tableName:l,columnIndex:p,columnKey:f,cellKey:f})),u.add(f))}),d.forEach((y,p)=>{let f=M(y?.name,`\u884C${p+1}`),x=y?.cells&&typeof y.cells=="object"&&!Array.isArray(y.cells)?y.cells:{};Object.keys(x).forEach(_=>{c.some(A=>M(A?.key,"")===_)||s.push(Ys({severity:"warning",message:`${l} / ${f} \u5305\u542B\u672A\u5B9A\u4E49\u5217 ${_}\uFF0C\u4FDD\u5B58\u540E\u4F1A\u88AB\u5FFD\u7565\u3002`,tableIndex:i,tableName:l,rowIndex:p,rowName:f,cellKey:_}))}),c.forEach((_,A)=>{let S=M(_?.key,""),z=M(_?.title||S,`\u5217${A+1}`),$=S?Rr(x[S]):"",I=Dl($,_,{label:`${l} / ${f} / ${z}`,tableName:l,rowName:f});I.errors.forEach(R=>{s.push(Ys({severity:"error",message:R,tableIndex:i,tableName:l,columnIndex:A,columnKey:S,rowIndex:p,rowName:f,cellKey:S}))}),I.warnings.forEach(R=>{s.push(Ys({severity:"warning",message:R,tableIndex:i,tableName:l,columnIndex:A,columnKey:S,rowIndex:p,rowName:f,cellKey:S}))})})})});let o=s.filter(n=>n.severity!=="warning").map(n=>n.message),a=s.filter(n=>n.severity==="warning").map(n=>n.message);return{valid:o.length===0,errors:o,warnings:a,issues:s,tables:r,summary:{errorCount:o.length,warningCount:a.length}}}function sn(){return[{id:Cl,name:Oy,description:"\u5305\u542B\u5168\u5C40\u6570\u636E\u3001\u4E3B\u89D2\u3001\u91CD\u8981\u89D2\u8272\u3001\u6280\u80FD\u3001\u80CC\u5305\u3001\u4EFB\u52A1\u3001\u7EAA\u8981\u548C\u9009\u9879\u8868\u3002",tables:ue(No)}]}function Ll(){return{tables:ue(No),promptTemplate:Ml,apiPreset:"",promptPreset:"",bypass:{enabled:!1,presetId:""},activeTemplate:Cl,autoUpdateEnabled:!1,autoUpdateTrigger:"assistantMessage",runScope:"enabled",fillMode:jt.INCREMENTAL,mirrorToMessage:!1,mirrorTag:"yyt-table-workbench",runtime:Pl()}}function Ze(t={}){let e=Ll(),s=t&&typeof t=="object"?t:{},r=Hy(s.bypass,s.promptPreset);return{tables:Ly(s.tables,{seedDefaultWhenMissing:!Object.prototype.hasOwnProperty.call(s,"tables")}),promptTemplate:M(s.promptTemplate,e.promptTemplate),apiPreset:M(s.apiPreset,""),promptPreset:r.presetId,bypass:r,activeTemplate:M(s.activeTemplate,e.activeTemplate),autoUpdateEnabled:Il(s.autoUpdateEnabled,e.autoUpdateEnabled),autoUpdateTrigger:M(s.autoUpdateTrigger,e.autoUpdateTrigger),runScope:M(s.runScope,e.runScope),fillMode:s.fillMode===jt.FULL?jt.FULL:e.fillMode,mirrorToMessage:Il(s.mirrorToMessage,e.mirrorToMessage),mirrorTag:M(s.mirrorTag,e.mirrorTag),runtime:Pl({...e.runtime,...s.runtime||{}})}}function rn(t={}){let e=Ze(t),s=[];return Array.isArray(e.tables)||s.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u662F JSON \u6570\u7EC4\u3002"),e.promptTemplate||s.push("\u586B\u8868 Prompt \u4E0D\u80FD\u4E3A\u7A7A\u3002"),e.mirrorTag||s.push("\u6B63\u6587\u955C\u50CF\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A\u3002"),{valid:s.length===0,errors:s,config:e}}function zt(){let t=Za.get(en,Ll());return Ze(t)}function Ke(t={}){let e=zt(),s=Ze({...e,...t||{},runtime:t?.runtime===void 0?e.runtime:t.runtime}),r=rn(s);return r.valid?(Za.set(en,r.config),{success:!0,config:r.config}):{success:!1,error:r.errors.join(`
`),errors:r.errors,config:r.config}}function Pr(t={}){let e=zt(),s=Ze({...e,runtime:{...e.runtime,...t||{}}});return Za.set(en,s),s.runtime}function Vy(t={}){let e=Ze(t);return`${M(e.promptTemplate,Ml)}

${Py}`.trim()}function Nl(t={}){let e=Ze(t);return{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",promptTemplate:Vy(e),bypass:{enabled:e.bypass?.enabled===!0,presetId:e.bypass?.presetId||e.promptPreset||""}}}function Bl({apiPresets:t=[]}={}){let e=[{value:"",label:"\u5F53\u524D API \u914D\u7F6E"},...t.map(s=>({value:String(s?.name||""),label:String(s?.name||"")})).filter(s=>s.value)];return[{name:"tables",type:"tableDefinitions",label:"\u8868\u5B9A\u4E49",description:"\u901A\u8FC7\u7ED3\u6784\u5316\u7F16\u8F91\u5668\u7EF4\u62A4 tables\u3002\u9996\u6B21\u6267\u884C\u6216\u5F53\u524D\u6D88\u606F\u5C1A\u65E0\u7ED1\u5B9A state \u65F6\uFF0C\u4F1A\u4EE5\u7F16\u8BD1\u540E\u7684 tables \u4F5C\u4E3A merge base\u3002",emptyValue:[]},{name:"promptTemplate",type:"textarea",label:"\u586B\u8868 Prompt",rows:12,description:"\u53EF\u4F7F\u7528 {{lastUserMessage}}\u3001{{lastAiMessage}}\u3001{{chatHistory}}\u3001{{toolContentMacro}} \u7B49\u53D8\u91CF\u3002\u7CFB\u7EDF\u4F1A\u81EA\u52A8\u8FFD\u52A0 JSON \u8F93\u51FA\u7EA6\u675F\u3002"},{name:"apiPreset",type:"select",label:"API \u9884\u8BBE",description:"\u4E3A\u7A7A\u65F6\u4F7F\u7528\u5F53\u524D\u5168\u5C40 API \u914D\u7F6E\u3002",options:e},{name:"mirrorToMessage",type:"checkbox",label:"\u955C\u50CF\u5199\u56DE\u6B63\u6587",description:"\u628A\u5F53\u524D tables \u7684 JSON \u9884\u89C8\u955C\u50CF\u5230\u76EE\u6807 assistant \u6D88\u606F\u6B63\u6587\u4E2D\u3002"}]}var Za,en,Vs,jt,Ml,Py,kl,Js,Bo,Cl,Oy,No,Or=B(()=>{He();Bt();Za=k.namespace("tableWorkbench"),en="config",Vs=Object.freeze({IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"}),jt=Object.freeze({INCREMENTAL:"incremental",FULL:"full"}),Ml=`\u8BF7\u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5F53\u524D\u8868\u683C\u57FA\u5E95\uFF0C\u66F4\u65B0\u7ED3\u6784\u5316 tables \u6570\u636E\u3002

\u8981\u6C42\uFF1A
1. \u53EA\u4F9D\u636E\u5F53\u524D\u5BF9\u8BDD\u5185\u5BB9\u66F4\u65B0\uFF0C\u4E0D\u8981\u81C6\u9020\u672A\u51FA\u73B0\u7684\u4FE1\u606F\u3002
2. \u4FDD\u6301\u539F\u6709\u8868\u7ED3\u6784\uFF1B\u6CA1\u6709\u4F9D\u636E\u65F6\u4FDD\u7559\u539F\u503C\u3002
3. \u5982\u679C\u67D0\u5B57\u6BB5\u9700\u8981\u6E05\u7A7A\uFF0C\u8BF7\u663E\u5F0F\u8F93\u51FA\u7A7A\u5B57\u7B26\u4E32\u3001\u7A7A\u6570\u7EC4\u6216 null\u3002
4. \u4F18\u5148\u53C2\u8003\u5F53\u524D assistant \u56DE\u590D\uFF1A{{lastAiMessage}}
5. \u8868\u683C\u7EA7 AI \u64CD\u4F5C\u8BF4\u660E\uFF1A
{{tableGuidance}}
6. \u5F53\u524D\u8868\u683C\u57FA\u5E95 JSON\uFF1A
{{toolContentMacro}}`,Py=`\u8F93\u51FA\u8981\u6C42\uFF1A
- \u53EA\u8FD4\u56DE JSON
- \u4E0D\u8981\u9644\u52A0\u89E3\u91CA\u3001\u6807\u9898\u6216 Markdown
- JSON \u7ED3\u6784\u5FC5\u987B\u662F\uFF1A
{
  "tables": []
}`,kl=Object.freeze([{value:"text",label:"\u6587\u672C"},{value:"number",label:"\u6570\u5B57"},{value:"boolean",label:"\u5E03\u5C14"},{value:"date",label:"\u65E5\u671F"},{value:"json",label:"JSON"}]),Js="text",Bo=Object.freeze(kl.map(t=>Object.freeze({...t}))),Cl="default_story_state",Oy="\u9ED8\u8BA4\u5267\u60C5\u72B6\u6001\u6A21\u677F";No=Object.freeze([Ut({id:"default_global_state",name:"\u5168\u5C40\u6570\u636E\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u4E3B\u89D2\u6240\u5728\u5730\u70B9\u53CA\u65F6\u95F4\u76F8\u5173\u53C2\u6570\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u63D2\u5165\u4E00\u6761\u5173\u4E8E\u5F53\u524D\u4E16\u754C\u72B6\u6001\u7684\u8BB0\u5F55\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u5730\u70B9\u6216\u65F6\u95F4\u53D1\u751F\u53D8\u5316\u65F6\u66F4\u65B0\u6B64\u8868\uFF1B\u6BCF\u8F6E\u5E94\u6839\u636E\u5267\u60C5\u66F4\u65B0\u65F6\u95F4\u76F8\u5173\u5B57\u6BB5\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[W("location","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u5730\u70B9","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u7684\u5177\u4F53\u573A\u666F\u540D\u79F0\u3002"),W("current_time","\u5F53\u524D\u65F6\u95F4","\u6E38\u620F\u4E16\u754C\u7684\u5F53\u524D\u65F6\u95F4\uFF1B\u5982\u5267\u60C5\u6CA1\u6709\u660E\u786E\u65F6\u95F4\uFF0C\u53EF\u6839\u636E\u4E16\u754C\u89C2\u7ED9\u51FA\u5408\u7406\u65F6\u95F4\u3002"),W("previous_scene_time","\u4E0A\u8F6E\u573A\u666F\u65F6\u95F4","\u4E0A\u4E00\u8F6E\u4EA4\u4E92\u7ED3\u675F\u65F6\u7684\u65F6\u95F4\u3002"),W("elapsed_time","\u7ECF\u8FC7\u7684\u65F6\u95F4","\u6839\u636E\u5F53\u524D\u4E0E\u4E0A\u8F6E\u65F6\u95F4\u8BA1\u7B97\u51FA\u7684\u6587\u672C\u63CF\u8FF0\u3002")]}),Ut({id:"default_protagonist_profile",name:"\u4E3B\u89D2\u4FE1\u606F",note:"\u8BB0\u5F55\u4E3B\u89D2\u7684\u6838\u5FC3\u8EAB\u4EFD\u4FE1\u606F\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E3B\u89D2\u7684\u552F\u4E00\u6761\u76EE\u3002",create:"\u7981\u6B62\u65B0\u589E\u591A\u540D\u4E3B\u89D2\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u4E3B\u89D2\u8EAB\u4EFD\u3001\u5916\u8C8C\u3001\u7ECF\u5386\u6216\u6027\u683C\u6709\u660E\u786E\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[W("name","\u4EBA\u7269\u540D\u79F0","\u4E3B\u89D2\u7684\u540D\u5B57\u3002"),W("gender_age","\u6027\u522B/\u5E74\u9F84","\u4E3B\u89D2\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),W("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u4E3B\u89D2\u5916\u8C8C\u7684\u5BA2\u89C2\u6587\u5B57\u63CF\u5199\u3002"),W("identity","\u804C\u4E1A/\u8EAB\u4EFD","\u4E3B\u89D2\u5728\u793E\u4F1A\u6216\u5267\u60C5\u4E2D\u7684\u4E3B\u8981\u8EAB\u4EFD\u3002"),W("history","\u8FC7\u5F80\u7ECF\u5386","\u4E3B\u89D2\u80CC\u666F\u6545\u4E8B\u4E0E\u5173\u952E\u7ECF\u5386\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002"),W("personality","\u6027\u683C\u7279\u70B9","\u5BF9\u4E3B\u89D2\u6838\u5FC3\u6027\u683C\u7684\u6982\u62EC\u3002")]}),Ut({id:"default_important_characters",name:"\u91CD\u8981\u89D2\u8272\u8868",note:"\u8BB0\u5F55\u5173\u952E NPC \u6216\u91CD\u8981\u89D2\u8272\u7684\u4FE1\u606F\u548C\u52A8\u6001\u72B6\u6001\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u4E3A\u5F53\u524D\u5728\u573A\u7684\u91CD\u8981\u4EBA\u7269\u5206\u522B\u63D2\u5165\u6761\u76EE\u3002",create:"\u5267\u60C5\u4E2D\u6709\u672A\u8BB0\u5F55\u7684\u91CD\u8981\u4EBA\u7269\u767B\u573A\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u89D2\u8272\u7684\u72B6\u6001\u3001\u5173\u7CFB\u3001\u60F3\u6CD5\u3001\u7ECF\u5386\u6216\u6301\u6709\u7269\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u901A\u5E38\u7981\u6B62\u5220\u9664\uFF1B\u89D2\u8272\u79BB\u573A\u65F6\u4F18\u5148\u66F4\u65B0\u201C\u662F\u5426\u79BB\u573A\u201D\u3002"},columns:[W("name","\u59D3\u540D","\u89D2\u8272\u59D3\u540D\u3002"),W("gender_age","\u6027\u522B/\u5E74\u9F84","\u89D2\u8272\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),W("summary","\u4E00\u53E5\u8BDD\u4ECB\u7ECD","\u7528\u7B80\u77ED\u6587\u5B57\u6982\u62EC\u89D2\u8272\u8EAB\u4EFD\u80CC\u666F\u3002"),W("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u89D2\u8272\u5916\u8C8C\u548C\u5F53\u524D\u8863\u7740\u7684\u5BA2\u89C2\u63CF\u5199\u3002"),W("important_items","\u6301\u6709\u7684\u91CD\u8981\u7269\u54C1","\u89D2\u8272\u62E5\u6709\u7684\u5173\u952E\u7269\u54C1\uFF0C\u7528\u5206\u53F7\u5206\u9694\u3002"),W("offstage","\u662F\u5426\u79BB\u573A","\u5224\u65AD\u8BE5\u89D2\u8272\u5F53\u524D\u662F\u5426\u5DF2\u7ECF\u79BB\u573A\uFF0C\u586B\u5199\u201C\u662F\u201D\u6216\u201C\u5426\u201D\u3002","boolean"),W("history","\u8FC7\u5F80\u7ECF\u5386","\u89D2\u8272\u80CC\u666F\u4E0E\u5173\u952E\u4E8B\u4EF6\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002")]}),Ut({id:"default_protagonist_skills",name:"\u4E3B\u89D2\u6280\u80FD\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u83B7\u5F97\u7684\u6280\u80FD\u3001\u80FD\u529B\u6216\u9636\u6BB5\u6027\u6210\u957F\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u6280\u80FD\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u65B0\u6280\u80FD\u6216\u65B0\u80FD\u529B\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u6280\u80FD\u5347\u7EA7\u3001\u964D\u7EA7\u6216\u6548\u679C\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u6280\u80FD\u88AB\u5267\u60C5\u5265\u593A\u3001\u66FF\u6362\u6216\u5931\u6548\u65F6\u5220\u9664\u3002"},columns:[W("skill_name","\u6280\u80FD\u540D\u79F0","\u6280\u80FD\u6216\u80FD\u529B\u540D\u79F0\u3002"),W("skill_type","\u6280\u80FD\u7C7B\u578B","\u6280\u80FD\u7C7B\u522B\uFF0C\u4F8B\u5982\u4E3B\u52A8\u3001\u88AB\u52A8\u3001\u5929\u8D4B\u7B49\u3002"),W("level","\u7B49\u7EA7/\u9636\u6BB5","\u6280\u80FD\u5F53\u524D\u7B49\u7EA7\u3001\u719F\u7EC3\u5EA6\u6216\u9636\u6BB5\u3002"),W("effect","\u6548\u679C\u63CF\u8FF0","\u6280\u80FD\u5728\u5F53\u524D\u9636\u6BB5\u4E0B\u7684\u5177\u4F53\u6548\u679C\u3002")]}),Ut({id:"default_inventory",name:"\u80CC\u5305\u7269\u54C1\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u62E5\u6709\u7684\u7269\u54C1\u3001\u88C5\u5907\u6216\u6D88\u8017\u54C1\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u643A\u5E26\u7269\u54C1\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u80CC\u5305\u4E2D\u6CA1\u6709\u7684\u5168\u65B0\u7269\u54C1\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u7269\u54C1\u6570\u91CF\u3001\u72B6\u6001\u6216\u63CF\u8FF0\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7269\u54C1\u88AB\u5B8C\u5168\u6D88\u8017\u3001\u4E22\u5F03\u6216\u6467\u6BC1\u65F6\u5220\u9664\u3002"},columns:[W("item_name","\u7269\u54C1\u540D\u79F0","\u7269\u54C1\u540D\u79F0\u3002"),W("quantity","\u6570\u91CF","\u62E5\u6709\u6570\u91CF\u3002","number"),W("description","\u63CF\u8FF0/\u6548\u679C","\u7269\u54C1\u529F\u80FD\u3001\u6548\u679C\u6216\u80CC\u666F\u63CF\u8FF0\u3002"),W("category","\u7C7B\u522B","\u7269\u54C1\u7C7B\u522B\uFF0C\u4F8B\u5982\u6B66\u5668\u3001\u6D88\u8017\u54C1\u3001\u6742\u7269\u7B49\u3002")]}),Ut({id:"default_quests_events",name:"\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u6B63\u5728\u8FDB\u884C\u6216\u9700\u8981\u6301\u7EED\u8FFD\u8E2A\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u8981\u4EFB\u52A1\u6216\u5173\u952E\u4E8B\u4EF6\u3002",create:"\u4E3B\u89D2\u63A5\u53D6\u3001\u89E6\u53D1\u6216\u53D1\u73B0\u65B0\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u65F6\u65B0\u589E\u3002",update:"\u4EFB\u52A1\u53D6\u5F97\u5173\u952E\u8FDB\u5C55\u3001\u76EE\u6807\u53D8\u5316\u6216\u65F6\u9650\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u4EFB\u52A1\u5B8C\u6210\u3001\u5931\u8D25\u3001\u8FC7\u671F\u6216\u4E0D\u518D\u9700\u8981\u8FFD\u8E2A\u65F6\u5220\u9664\u3002"},columns:[W("quest_name","\u4EFB\u52A1\u540D\u79F0","\u4EFB\u52A1\u6216\u4E8B\u4EF6\u6807\u9898\u3002"),W("quest_type","\u4EFB\u52A1\u7C7B\u578B","\u4E3B\u7EBF\u3001\u652F\u7EBF\u3001\u4E2A\u4EBA\u3001\u7A81\u53D1\u4E8B\u4EF6\u7B49\u3002"),W("issuer","\u53D1\u5E03\u8005","\u53D1\u5E03\u4EFB\u52A1\u6216\u89E6\u53D1\u4E8B\u4EF6\u7684\u89D2\u8272\u3001\u5730\u70B9\u6216\u52BF\u529B\u3002"),W("detail","\u8BE6\u7EC6\u63CF\u8FF0","\u4EFB\u52A1\u76EE\u6807\u3001\u4E8B\u4EF6\u80CC\u666F\u548C\u8981\u6C42\u3002"),W("progress","\u5F53\u524D\u8FDB\u5EA6","\u5BF9\u5B8C\u6210\u5EA6\u6216\u5F53\u524D\u9636\u6BB5\u7684\u7B80\u8981\u63CF\u8FF0\u3002"),W("deadline","\u4EFB\u52A1\u65F6\u9650","\u5B8C\u6210\u4EFB\u52A1\u7684\u5269\u4F59\u65F6\u95F4\u6216\u622A\u6B62\u6761\u4EF6\u3002"),W("reward","\u5956\u52B1","\u5B8C\u6210\u540E\u53EF\u80FD\u83B7\u5F97\u7684\u5956\u52B1\u3002"),W("penalty","\u60E9\u7F5A","\u5931\u8D25\u6216\u9519\u8FC7\u540E\u7684\u540E\u679C\u3002")]}),Ut({id:"default_memo_log",name:"\u7EAA\u8981\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u6216\u5173\u952E\u7247\u6BB5\u53D1\u751F\u7684\u4E8B\u4EF6\u7EAA\u8981\uFF0C\u7528\u4E8E\u540E\u7EED\u56DE\u987E\u3002",aiInstructions:{init:"\u6545\u4E8B\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E00\u6761\u8BB0\u5F55\uFF0C\u7528\u4E8E\u8BB0\u5F55\u521D\u59CB\u5316\u5267\u60C5\u3002",create:"\u6BCF\u8F6E\u4EA4\u4E92\u7ED3\u675F\u540E\uFF0C\u82E5\u53D1\u751F\u4E86\u503C\u5F97\u8BB0\u5F55\u7684\u65B0\u4E8B\u4EF6\uFF0C\u5219\u63D2\u5165\u4E00\u6761\u65B0\u7EAA\u8981\u3002",update:"\u901A\u5E38\u7981\u6B62\u66F4\u65B0\u5386\u53F2\u7EAA\u8981\uFF1B\u53EA\u6709\u660E\u663E\u4E8B\u5B9E\u9519\u8BEF\u65F6\u624D\u4FEE\u6B63\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[W("time_span","\u65F6\u95F4\u8DE8\u5EA6","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u7684\u65F6\u95F4\u8303\u56F4\u3002"),W("location","\u5730\u70B9","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u5730\u70B9\u3002"),W("memo","\u7EAA\u8981","\u4EE5\u7B2C\u4E09\u65B9\u89C6\u89D2\u5BA2\u89C2\u8BB0\u5F55\u672C\u8F6E\u53D1\u751F\u7684\u4E8B\u5B9E\u3002"),W("summary","\u6982\u89C8","\u4E00\u53E5\u8BDD\u6982\u62EC\u7EAA\u8981\u5185\u5BB9\u3002"),W("index_code","\u7F16\u7801\u7D22\u5F15","\u7528\u4E8E\u540E\u7EED\u68C0\u7D22\u7684\u7B80\u77ED\u7F16\u7801\u3002")]}),Ut({id:"default_options",name:"\u9009\u9879\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u4E3B\u89D2\u53EF\u4EE5\u91C7\u53D6\u7684\u884C\u52A8\u9009\u9879\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002\u6240\u6709\u9009\u9879\u4F7F\u7528\u7B2C\u4E09\u4EBA\u79F0\uFF0C\u4E0D\u4EE3\u66FF\u4E3B\u89D2\u53D1\u8A00\uFF0C\u5E76\u7D27\u6263\u5F53\u524D\u5267\u60C5\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u751F\u6210\u56DB\u4E2A\u521D\u59CB\u884C\u52A8\u9009\u9879\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u6BCF\u8F6E\u4EA4\u4E92\u540E\u6839\u636E\u5F53\u524D\u5267\u60C5\u751F\u6210\u65B0\u7684\u56DB\u4E2A\u9009\u9879\u5E76\u8986\u76D6\u539F\u6709\u5185\u5BB9\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[W("option_1","\u9009\u9879\u4E00","\u504F\u5411\u7B56\u7565\u3001\u63A8\u8FDB\u5267\u60C5\u6216\u89E3\u51B3\u5F53\u524D\u95EE\u9898\u7684\u884C\u52A8\u3002"),W("option_2","\u9009\u9879\u4E8C","\u504F\u5411\u8C28\u614E\u89C2\u5BDF\u3001\u6536\u96C6\u4FE1\u606F\u6216\u4FDD\u6301\u4E2D\u7ACB\u7684\u884C\u52A8\u3002"),W("option_3","\u9009\u9879\u4E09","\u504F\u5411\u5E2E\u52A9\u3001\u4FDD\u62A4\u3001\u6C9F\u901A\u6216\u5B89\u629A\u7684\u884C\u52A8\u3002"),W("option_4","\u9009\u9879\u56DB","\u504F\u5411\u5192\u9669\u3001\u8BD5\u63A2\u3001\u6539\u53D8\u5C40\u52BF\u6216\u5173\u7CFB\u4E92\u52A8\u7684\u884C\u52A8\u3002")]})])});function on(t,e={},s={}){let r=Number.isInteger(s.size)?s.size:0,o=Number.isInteger(s.currentIndex)?s.currentIndex:-1,a=o<=0,n=o<0||o>=r-1,i=Object.entries(e).filter(([,l])=>Number.isInteger(l)).map(([l,c])=>`data-${l}="${c}"`).join(" ");return`
    <div class="yyt-table-editor-move-controls">
      <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="move-${t}-up" ${i} ${a?"disabled":""}>
        <i class="fa-solid fa-arrow-up"></i>
      </button>
      <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="move-${t}-down" ${i} ${n?"disabled":""}>
        <i class="fa-solid fa-arrow-down"></i>
      </button>
    </div>
  `}function Jy(t=Js){return Bo.map(e=>`
    <option value="${b(e.value)}" ${e.value===t?"selected":""}>${b(e.label)}</option>
  `).join("")}function Xy(t=0,e=0){return!Number.isInteger(t)||t<=0||!Number.isInteger(e)||e<0?0:Math.min(e,t-1)}function jl(t={}){let e=t&&typeof t=="object"?t:{};return Ol(Array.isArray(e.tables)?e.tables:[])}function Qy(t,e){if(t.type==="json"){let s=e===void 0?t.emptyValue:e;if(typeof s=="string")return s;try{return JSON.stringify(s??null,null,2)}catch{return String(s??"")}}return String(e??"")}function Zy(t={},e=""){let s=String(t.name||"").trim(),r=`yyt-table-field-${s}`,o=`${r}-value`,a=`${r}-dropdown`,n=Gr(t.options||[]);return Yr({selectedValue:e,options:n,placeholder:n[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{"data-table-custom-select":"true"},nativeAttributes:{class:"yyt-table-select-native",id:o,"data-table-field":s,"data-field-type":"select"},triggerAttributes:{id:r,"data-table-select-trigger":"true","aria-controls":a},dropdownAttributes:{id:a,"data-table-select-dropdown":"true"},optionAttributes:{"data-table-select-option":"true"}})}function ep(t={},e={},s=0){let r=t&&typeof t=="object"?t.cells:null;if(Array.isArray(r))return String(r[s]??"");if(r&&typeof r=="object"){if(r[e.key]!==void 0)return String(r[e.key]??"");if(r[e.title]!==void 0)return String(r[e.title]??"")}return""}function tp(t={},e={},s=0,r=0){let o=Array.isArray(t.columns)?t.columns:[],a=on("row",{"table-index":s,"row-index":r},{currentIndex:r,size:o.length>=0&&Array.isArray(t.rows)?t.rows.length:0});return`
    <tr data-table-editor-row="${r}">
      <td>
        <input type="text" class="yyt-input" data-table-editor-row-name value="${b(String(e?.name||""))}" placeholder="\u53EF\u7559\u7A7A\uFF0C\u9ED8\u8BA4\u4F1A\u81EA\u52A8\u547D\u540D">
      </td>
      ${o.map((n,i)=>{let l=String(n?.key||"").trim();return`
        <td>
          <textarea class="yyt-textarea yyt-code-textarea-small"
                    data-table-editor-cell
                    data-column-index="${i}"
                    data-column-key="${b(l)}"
                    rows="2"
                    placeholder="${b(n.title||n.key||`\u5217${i+1}`)}">${b(ep(e,n,i))}</textarea>
        </td>
      `}).join("")}
      <td>
        <div class="yyt-table-editor-row-actions">
          ${a}
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-row" data-table-index="${s}" data-row-index="${r}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `}function Ul(t={},e=0,s={}){let r=Array.isArray(t.columns)?t.columns:[],o=Array.isArray(t.rows)?t.rows:[],a=String(t?.name||"").trim(),n=s.showDeleteTable!==!1,i=on("table",{"table-index":e},{currentIndex:e,size:Number.isInteger(s.totalTables)?s.totalTables:0}),l=n?`
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
          <input type="text" class="yyt-input" data-table-editor-table-name value="${b(String(t?.name||""))}" placeholder="\u8868\u683C\u540D\u79F0">
        </div>
        <div class="yyt-table-editor-input-group">
          <textarea class="yyt-textarea yyt-code-textarea-small" data-table-editor-table-note rows="2" placeholder="\u5907\u6CE8\uFF08\u53EF\u7559\u7A7A\uFF09">${b(String(t?.note||""))}</textarea>
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
                    <input type="text" class="yyt-input" data-table-editor-column-title value="${b(String(c?.title||""))}" placeholder="\u4F8B\u5982\uFF1A\u5C5E\u6027">
                  </td>
                  <td>
                    <input type="text" class="yyt-input" data-table-editor-column-key value="${b(String(c?.key||""))}" placeholder="\u53EF\u7559\u7A7A\u81EA\u52A8\u751F\u6210">
                  </td>
                  <td>
                    <select class="yyt-select" data-table-editor-column-type>
                      ${Jy(String(c?.type||Js))}
                    </select>
                  </td>
                  <td>
                    <label class="yyt-table-editor-column-required yyt-table-editor-column-required-inline">
                      <input type="checkbox" data-table-editor-column-required ${c?.required===!0?"checked":""}>
                      <span>\u5FC5\u586B</span>
                    </label>
                  </td>
                  <td>
                    <input type="text" class="yyt-input" data-table-editor-column-description value="${b(String(c?.description||""))}" placeholder="\u53EF\u4E0D\u586B">
                  </td>
                  <td>
                    <div class="yyt-table-editor-column-actions">
                      ${on("column",{"table-index":e,"column-index":d},{currentIndex:d,size:r.length})}
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
                ${r.map((c,d)=>`<th>${b(c?.title||c?.key||`\u5217${d+1}`)}</th>`).join("")}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${o.length?o.map((c,d)=>tp(t,c,e,d)).join(""):`
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
  `}function sp(t={},e={}){let s=jl(t),r=Array.isArray(s?.tables)?s.tables:[],o=e.mode==="focused"?"focused":"full",a=Xy(r.length,Number.parseInt(e.currentTableIndex,10));if(o==="focused"){let n=r[a]||null;return`
      <div class="yyt-table-editor-shell">
        ${n?Ul(n,a,{totalTables:r.length}):`
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
        ${r.length?r.map((n,i)=>Ul(n,i,{totalTables:r.length})).join(""):`
          <div class="yyt-table-editor-empty">\u8FD8\u6CA1\u6709\u8868\uFF0C\u5148\u65B0\u5EFA\u4E00\u5F20\u3002</div>
        `}
      </div>
    </div>
  `}function rp(t={},e={}){let s=String(t.name||"").trim(),r=b(t.label||s),o=t.description?`<div class="yyt-table-form-field-desc">${b(t.description)}</div>`:"",a=jl({tables:Array.isArray(e[s])?e[s]:[]});return`
    <div class="yyt-table-form-field" data-table-form-item="${b(s)}">
      <label>${r}</label>
      ${op(t,a,{description:o})}
    </div>
  `}function op(t={},e={},s={}){let r=String(t.name||"").trim(),o=typeof s.description=="string"?s.description:t.description?`<div class="yyt-table-form-field-desc">${b(t.description)}</div>`:"",a=s.mode==="focused"?"focused":"full",n=Number.parseInt(s.currentTableIndex,10);return`
    <div class="yyt-table-editor" data-table-field="${b(r)}" data-field-type="tableDefinitions" data-table-definition-root data-table-editor-mode="${a}" data-current-table-index="${Number.isInteger(n)?n:0}">
      ${sp(e,{mode:a,currentTableIndex:n})}
    </div>
    ${o}
  `}function zl(t=[],e={},s={}){let r=Array.isArray(t)?t:[],o=Array.isArray(s.includeFieldNames)?new Set(s.includeFieldNames.map(i=>String(i||"").trim()).filter(Boolean)):null,a=Array.isArray(s.excludeFieldNames)?new Set(s.excludeFieldNames.map(i=>String(i||"").trim()).filter(Boolean)):null,n=r.filter(i=>{let l=String(i?.name||"").trim();return!l||o&&!o.has(l)||a&&a.has(l)?!1:i.type!=="tableDefinitions"}).map(i=>ap(i,e)).join("");return n?`
    <div class="yyt-table-form-grid">
      ${n}
    </div>
  `:""}function ap(t={},e={}){let s=String(t.name||"").trim();if(!s)return"";if(t.type==="tableDefinitions")return rp(t,e);let r=e[s],o=b(t.label||s),a=t.description?`<div class="yyt-table-form-field-desc">${b(t.description)}</div>`:"",n=Number.isFinite(t.rows)?t.rows:6;return t.type==="checkbox"?`
      <div class="yyt-table-form-field" data-table-form-item="${b(s)}">
        <label class="yyt-table-form-inline-checkbox">
          <input type="checkbox" data-table-field="${b(s)}" data-field-type="checkbox" ${r===!0?"checked":""}>
          <span>${o}</span>
        </label>
        ${a}
      </div>
    `:t.type==="select"?`
      <div class="yyt-table-form-field" data-table-form-item="${b(s)}">
        <label for="yyt-table-field-${b(s)}">${o}</label>
        ${Zy(t,r)}
        ${a}
      </div>
    `:`
    <div class="yyt-table-form-field" data-table-form-item="${b(s)}">
      <label for="yyt-table-field-${b(s)}">${o}</label>
      <textarea class="yyt-textarea yyt-code-textarea ${t.type==="json"?"":"yyt-code-textarea-small"}"
                id="yyt-table-field-${b(s)}"
                data-table-field="${b(s)}"
                data-field-type="${b(t.type||"textarea")}"
                rows="${n}">${b(Qy(t,r))}</textarea>
      ${a}
    </div>
  `}var Wl=B(()=>{Ae();Or()});function Kl(){return`
    .yyt-cell-popup-menu {
      position: fixed;
      z-index: 99999;
      min-width: 140px;
      padding: 4px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.1);
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
  `}var ws,Dr,Fl=B(()=>{Ae();ws=null,Dr=class{constructor(){ws&&ws.destroy(),ws=this,this.$menu=null,this._onClickOutside=null}show(e,s,r={}){let o=D(),a=Ct();if(!o||!a)return;this.destroy();let n=this._buildItems(r);if(n.length===0)return;let i=n.map(c=>`
      <div class="yyt-cell-menu-item" data-action="${c.action}">
        ${c.label}
      </div>
    `).join("");this.$menu=o(`
      <div class="yyt-cell-popup-menu">
        ${i}
      </div>
    `);let l=o(a.body);this.$menu.css({left:e+"px",top:s+"px"}),l.append(this.$menu),this.$menu.on("click.yytCellMenu",".yyt-cell-menu-item",c=>{let d=o(c.currentTarget).attr("data-action");this.destroy(),r.onAction&&r.onAction(d)}),this._onClickOutside=c=>{this.$menu&&!this.$menu[0].contains(c.target)&&this.destroy()},setTimeout(()=>{this._onClickOutside&&o(a).on("mousedown.yytCellMenu",this._onClickOutside)},0)}_buildItems(e){if(Array.isArray(e.items)&&e.items.length>0)return e.items;let s=[],r=Number.isFinite(e.rowIndex)?e.rowIndex:-1,o=e.colKey||"";return o&&(s.push({label:"\u7F16\u8F91\u5355\u5143\u683C",action:`edit:${o}`}),s.push({label:"\u6E05\u7A7A\u5355\u5143\u683C",action:`clear:${o}`})),r>=0&&(s.push({label:"\u4E0A\u65B9\u63D2\u5165\u884C",action:"insert-row-above"}),s.push({label:"\u4E0B\u65B9\u63D2\u5165\u884C",action:"insert-row-below"}),s.push({label:"\u5220\u9664\u6B64\u884C",action:"delete-row"})),s}destroy(){let e=D(),s=Ct();this.$menu&&(this.$menu.off(".yytCellMenu"),this.$menu.remove(),this.$menu=null),this._onClickOutside&&s&&(e(s).off("mousedown.yytCellMenu",this._onClickOutside),this._onClickOutside=null),ws===this&&(ws=null)}static destroy(){ws&&ws.destroy()}}});function np(t={},e=-1){return[t?.sourceId,t?.messageId,t?.message_id,t?.id,t?.mid,t?.mesid,t?.mes_id,t?.chat_index,t?.index,e].map(s=>Z(s))}function ip(t=[],e=""){let s=Z(e);if(!s||!Array.isArray(t))return-1;for(let r=t.length-1;r>=0;r-=1){let o=t[r];if(np(o,r).includes(s))return r}return-1}function Uo(t={},e={}){let s=Z(t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId);if(!s)return null;let r=Qa({resolvedAt:Date.now(),runSource:e.runSource||t?.runSource||yt.MANUAL,traceId:t?.traceId||"",chatId:t?.chatId||"",sourceMessageId:s,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId||"swipe:current",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",assistantContentFingerprint:t?.assistantContentFingerprint||"",assistantBaseFingerprint:t?.assistantBaseFingerprint||"",assistantText:t?.lastAiMessage||"",assistantBaseText:t?.assistantBaseText||"",targetMessageIndex:ip(t?.chatMessages||t?.chatHistory||[],s)});return!r.slotBindingKey||!r.slotRevisionKey?null:r}async function lp({runSource:t=yt.MANUAL}={}){let e=await is({runSource:t});return Uo(e,{runSource:t})}async function cp({messageId:t,swipeId:e="",runSource:s=yt.AUTO}={}){let r=await vr({messageId:t,swipeId:e,runSource:s});return Uo(r,{runSource:s})}async function Hl(t=null,e={}){let s=t||null;if(typeof e.resolveTarget=="function")return await e.resolveTarget(s);let r=Z(e.runSource||s?.runSource)||yt.MANUAL,o=Z(e.messageId||s?.sourceMessageId),a=Z(e.swipeId||s?.sourceSwipeId||s?.effectiveSwipeId);return e.useMessageTarget===!0||r===yt.AUTO?o?cp({messageId:o,swipeId:a,runSource:r}):null:lp({runSource:r})}function ql(t,e){let s=t||null,r=e||null;return!s||!r?{valid:!1,reason:"missing_target_snapshot"}:Z(s.sourceMessageId)!==Z(r.sourceMessageId)?{valid:!1,reason:"source_message_changed"}:Z(s.sourceSwipeId||s.effectiveSwipeId)!==Z(r.sourceSwipeId||r.effectiveSwipeId)?{valid:!1,reason:"source_swipe_changed"}:Z(s.slotRevisionKey)!==Z(r.slotRevisionKey)?{valid:!1,reason:"slot_revision_changed"}:{valid:!0,reason:"ok"}}var an=B(()=>{Ls();Bt()});function pt(t){return t==null?"":String(t).trim()}function dp(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function up(){try{let t=dp(),e=t?.SillyTavern||null,s=e?.getContext?.()||null,r=Array.isArray(s?.chat)?s.chat:[],o=Array.isArray(e?.chat)?e.chat:[],a=r.length?r:o;return{topWindow:t,api:e,context:s,chat:a,contextChat:r,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}function yp(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function pp(t=[],e=""){let s=pt(e);if(!Array.isArray(t)||!s)return-1;for(let r=t.length-1;r>=0;r-=1){let o=t[r];if(!yp(o))continue;if([o?.sourceId,o?.message_id,o?.messageId,o?.id,o?.mes_id,o?.mid,o?.mesid,o?.chat_index,o?.index,r].map(n=>pt(n)).includes(s))return r}return-1}function jo(t){let e=up(),s=pp(e.chat,t?.sourceMessageId);return s<0?{runtime:e,messageIndex:s,message:null}:{runtime:e,messageIndex:s,message:e.chat[s]||null}}function Gl(t,e,s){let r=o=>{!Array.isArray(o)||e<0||e>=o.length||(o[e]={...o[e]||{},...s})};r(t?.contextChat),r(t?.apiChat)}async function Yl(t){let e=t?.context||null,s=t?.api||null,r=e?.saveChatDebounced||s?.saveChatDebounced||null,o=e?.saveChat||s?.saveChat||null;typeof r=="function"&&r.call(e||s),typeof o=="function"&&await o.call(e||s)}function fp(t){let{message:e}=jo(t);return Gs(e?.[Cr])}function Vl(t,e={}){let s=fp(t);return s&&pt(s.slotRevisionKey)===pt(t?.slotRevisionKey)?{loadMode:$r.EXACT,mergeBaseOnly:!1,state:s}:s&&pt(s.slotBindingKey)===pt(t?.slotBindingKey)?{loadMode:$r.BINDING_FALLBACK,mergeBaseOnly:!0,state:Gs({...s,slotRevisionKey:pt(t?.slotRevisionKey)||s.slotRevisionKey,sourceSwipeId:pt(t?.sourceSwipeId||t?.effectiveSwipeId)||s.sourceSwipeId,meta:{...s.meta||{},mergeBaseOnly:!0,fallbackFromBinding:!0,fallbackFromRevisionKey:pt(s.slotRevisionKey),requestedRevisionKey:pt(t?.slotRevisionKey)}})}:Array.isArray(e.templateTables)?{loadMode:$r.TEMPLATE,mergeBaseOnly:!1,state:Do(t,{tables:ue(e.templateTables),meta:{fromTemplate:!0}})}:{loadMode:$r.EMPTY,mergeBaseOnly:!1,state:Do(t)}}async function Jl(t){let{runtime:e,messageIndex:s,message:r}=jo(t);if(!r||s<0)return{success:!1,error:"target_message_not_found"};let o={...Lo(r[qs]),lastResolvedTarget:Hs(t),updatedAt:Date.now()};return r[qs]=o,Gl(e,s,r),await Yl(e),{success:!0,bindings:o}}async function Xl(t,e,s={}){let r=s.skipFreshValidation===!0?t:await Hl(t,s),o=s.skipFreshValidation===!0?{valid:!0,reason:"skipped"}:ql(t,r);if(!o.valid)return{success:!1,error:"target_changed_before_commit",validation:o};let a=r||t,{runtime:n,messageIndex:i,message:l}=jo(a);if(!l||i<0)return{success:!1,error:"target_message_not_found",validation:o};let c=Do(a),d={...c.meta||{},...e.meta||{},...s.locks?{locks:s.locks}:{},...s.previousSnapshot?{previousSnapshot:s.previousSnapshot}:{}},u=Gs({...c,...e,meta:d,slotBindingKey:a.slotBindingKey,slotRevisionKey:a.slotRevisionKey,sourceMessageId:a.sourceMessageId,sourceSwipeId:a.sourceSwipeId||a.effectiveSwipeId,updatedAt:Date.now()}),y={...Lo(l[qs]),lastResolvedTarget:Hs(a),lastCommittedTarget:Hs(a),updatedAt:Date.now()};return l[Cr]=u,l[qs]=y,Gl(n,i,l),await Yl(n),{success:!0,state:u,bindings:y,validation:o,messageIndex:i,sourceMessageId:a.sourceMessageId,slotRevisionKey:a.slotRevisionKey}}function Ql(t=null){let e=We.getAssistantMessageSnapshot(t);return e?.message?{...e,tableState:Gs(e.message[Cr]),tableBindings:Lo(e.message[qs])}:null}function Zl(t){let{runtime:e,messageIndex:s}=jo(t);if(s<0)return null;for(let r=s-1;r>=0;r--){let o=e.chat[r];if(!o||o.is_user===!0)continue;let a=Gs(o[Cr]);if(a&&Array.isArray(a.tables)&&a.tables.length>0)return{state:a,messageIndex:r,sourceMessageId:a.sourceMessageId||""}}return null}var nn=B(()=>{ls();Bt();an()});function zo(t,e=""){return t==null?e:String(t).trim()||e}function mp(t={}){return{tables:Array.isArray(t?.tables)?ue(t.tables):[]}}function bp(t={},e={}){let s=zo(e.mirrorTag,"yyt-table-workbench"),r=mp(t);return[`<${s}>`,"[\u586B\u8868\u5DE5\u4F5C\u53F0]","```json",JSON.stringify(r,null,2),"```",`</${s}>`].join(`
`)}async function ec({targetSnapshot:t,nextTables:e,config:s,loadResult:r=null,diff:o=null,fillMode:a=""}={}){let n=Ze(s),i=await Xl(t,{tables:Array.isArray(e)?ue(e):[],meta:{lastLoadMode:zo(r?.loadMode,""),lastFillMode:zo(a),mergeBaseOnly:!1,updatedBy:zo(t?.runSource,"MANUAL_TABLE")}});if(!i?.success)return{success:!1,error:i?.error||"table_state_commit_failed",commitResult:i,mirrorResult:null,warning:""};let l=null,c="";if(n.mirrorToMessage){let d=bp(i.state,{mirrorTag:n.mirrorTag});l=await We.injectDetailed(gp,d,{overwrite:!0,extractionSelectors:[n.mirrorTag],sourceMessageId:i.sourceMessageId,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId,effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId,slotBindingKey:t?.slotBindingKey,slotRevisionKey:t?.slotRevisionKey,slotTransactionId:t?.slotTransactionId,traceId:t?.traceId}),l?.success||(c=l?.error||"\u6B63\u6587\u955C\u50CF\u5199\u56DE\u5931\u8D25")}return{success:!0,state:i.state,bindings:i.bindings,diff:o,fillMode:a,commitResult:i,mirrorResult:l,warning:c}}var gp,tc=B(()=>{ls();Bt();nn();Or();gp="tableWorkbenchMirror"});function hp(t){let e=[],s;for(sc.lastIndex=0;(s=sc.exec(t))!==null;)e.push(s[1].trim());return e.length>0?e[e.length-1]:""}function vp(t){let e=[],s=t.split(/\r?\n/).map(o=>o.trim()).filter(Boolean),r="";for(let o of s)if(r+=o,r.includes("(")&&r.includes(")")){let a=r.match(/(insertRow|updateRow|deleteRow)\s*\(\s*(-?\d+)\s*,?\s*(-?\d+)?\s*,?\s*(.*?)?\)\s*;?\s*$/);if(a){let n=a[1],i=parseInt(a[2],10),l=a[3]!==void 0?parseInt(a[3],10):void 0,c={},d=a[4];if(d)try{c=JSON.parse(d)}catch{c=xp(d)}n==="insertRow"?(e.push({op:n,tableIndex:i,rowIndex:-1,data:l!==void 0&&typeof l=="number"&&!d?{}:typeof l=="number"?c:typeof l=="object"?l:c}),n==="insertRow"&&l!==void 0&&typeof l=="object"&&(e[e.length-1].data=l)):e.push({op:n,tableIndex:i,rowIndex:l??-1,data:c})}r=""}return e}function xp(t){if(!t||typeof t!="string")return{};let e={},s=t.replace(/^\{|\}$/g,"").trim();if(!s)return e;let r=wp(s,",");for(let o of r){let a=o.indexOf(":");if(a<0)continue;let n=o.slice(0,a).trim().replace(/^["']|["']$/g,""),i=o.slice(a+1).trim();i=i.replace(/^["']|["']$/g,""),n&&(e[n]=i)}return e}function wp(t,e){let s=[],r=0,o="",a=!1,n="";for(let i=0;i<t.length;i++){let l=t[i];if(a){o+=l,l===n&&t[i-1]!=="\\"&&(a=!1);continue}if(l==='"'||l==="'"){a=!0,n=l,o+=l;continue}if(l==="{"||l==="["?r++:(l==="}"||l==="]")&&r--,l===e&&r===0){s.push(o.trim()),o="";continue}o+=l}return o.trim()&&s.push(o.trim()),s}function oc(t){let e=t.replace(/\/\/.*$/gm,"").replace(/\/\*[\s\S]*?\*\//g,"");return e=e.replace(/,\s*([}\]])/g,"$1"),e=e.replace(/'/g,'"'),e}function Sp(t){let e=t;for(let s=0;s<3&&(e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'"));s++)try{let r=JSON.parse(e);if(typeof r=="string")e=r;else break}catch{break}return e}function Tp(t){let e=hp(t);if(!e)return null;let s=vp(e);return s.length>0?s:null}function _p(t){let e=[],s=l=>{let c=String(l||"").trim();c&&!e.includes(c)&&e.push(c)};rc.lastIndex=0;let r;for(;(r=rc.exec(t))!==null;)s(r[1]);s(t);let o=t.indexOf("{"),a=t.lastIndexOf("}");o>=0&&a>o&&s(t.slice(o,a+1));let n=t.indexOf("["),i=t.lastIndexOf("]");n>=0&&i>n&&s(t.slice(n,i+1));for(let l of e){let c=null;try{c=JSON.parse(l)}catch{}if(!c)try{c=JSON.parse(oc(l))}catch{}if(!c){let d=Sp(l);if(d!==l){try{c=JSON.parse(d)}catch{}if(!c)try{c=JSON.parse(oc(d))}catch{}}}if(c){let d=null;if(Array.isArray(c)?d=c:Array.isArray(c.tables)?d=c.tables:c.data&&Array.isArray(c.data.tables)&&(d=c.data.tables),d)return d}}return null}function ac(t){if(!t||typeof t!="string")return{mode:"empty",edits:null,tables:null};let e=Tp(t);if(e)return{mode:"incremental",edits:e,tables:null};let s=_p(t);return s?{mode:"full",edits:null,tables:s}:{mode:"empty",edits:null,tables:null}}var sc,rc,nc=B(()=>{sc=/<tableEdit>([\s\S]*?)<\/tableEdit>/g,rc=/```(?:json)?\s*([\s\S]*?)```/gi});function Ap(t,e){let s=new Map;Array.isArray(t)&&t.forEach((a,n)=>{a&&typeof a=="object"&&s.set(a.name||`__row_${n}`,a)});let r=new Map;Array.isArray(e)&&e.forEach((a,n)=>{a&&typeof a=="object"&&r.set(a.name||`__row_${n}`,a)});let o={};for(let[a,n]of r){let i=s.get(a);if(i){o[a]={};let l=new Set([...Object.keys(i.cells||{}),...Object.keys(n.cells||{})]);for(let c of l){let d=String((i.cells&&i.cells[c])??""),u=String((n.cells&&n.cells[c])??"");o[a][c]=d===u?"unchanged":"updated"}o[a].__rowStatus="kept"}else{if(o[a]={},n.cells&&typeof n.cells=="object")for(let l of Object.keys(n.cells))o[a][l]="new";o[a].__rowStatus="new"}}for(let[a]of s)r.has(a)||(o[a]={__rowStatus:"deleted"});return o}function ic(t,e){let s=Array.isArray(t)?ue(t):[],r=Array.isArray(e)?ue(e):[],o={},a=Math.max(s.length,r.length);for(let n=0;n<a;n++){let i=s[n],l=r[n];!i&&l?(o[n]={},Array.isArray(l.rows)&&l.rows.forEach(c=>{let d=c.name||`__row_${l.rows.indexOf(c)}`;o[n][d]={__rowStatus:"new"}})):i&&!l?(o[n]={},Array.isArray(i.rows)&&i.rows.forEach(c=>{let d=c.name||`__row_${i.rows.indexOf(c)}`;o[n][d]={__rowStatus:"deleted"}})):i&&l&&(o[n]=Ap(i.rows,l.rows))}return o}var lc=B(()=>{Bt()});function Ep(t){if(!t||typeof t!="object")return{};let e={};for(let[s,r]of Object.entries(t))!r||typeof r!="object"||!r.scope||!Object.values(El).includes(r.scope)||(e[s]={scope:r.scope,lockedAt:Number.isFinite(r.lockedAt)?r.lockedAt:Date.now()});return e}function cc(t){return!t||!t.meta?{}:Ep(t.meta.locks)}function dc(t,e,s,r){return!t||typeof t!="object"?!1:!!(t[Oo(e,s,r)]||t[Oo(e,s,"*")]||t[Oo(e,-1,r)])}var uc=B(()=>{Bt()});function re(t,e=""){return t==null?e:String(t).trim()||e}function yc(t=[],e=8){return!Array.isArray(t)||t.length===0?"":t.slice(Math.max(t.length-e,0)).map(s=>`[${re(s?.role,"unknown")}] ${String(s?.content||"").trim()}`).filter(Boolean).join(`

`)}function Ip(t=[]){return!Array.isArray(t)||t.length===0?"":t.map((e,s)=>{let r=e?.aiInstructions&&typeof e.aiInstructions=="object"?e.aiInstructions:{},o=Array.isArray(e?.columns)?e.columns:[],a=[`\u8868 ${s}: ${re(e?.name,`\u8868${s+1}`)}`,`\u8868\u683C\u8BF4\u660E: ${re(e?.note,"\u65E0")}`,`\u521D\u59CB\u5316\u8BF4\u660E: ${re(r.init,"\u65E0")}`,`\u65B0\u589E\u8BF4\u660E: ${re(r.create,"\u65E0")}`,`\u66F4\u65B0\u8BF4\u660E: ${re(r.update,"\u65E0")}`,`\u5220\u9664\u8BF4\u660E: ${re(r.delete,"\u65E0")}`,"\u5B57\u6BB5:"];return o.forEach(n=>{a.push(`- ${re(n?.title||n?.key,"\u672A\u547D\u540D\u5B57\u6BB5")} (${re(n?.key,"")}): ${re(n?.description,"\u65E0")}`)}),a.join(`
`)}).join(`

`)}function Mp(t,e){return{target:{sourceMessageId:re(t?.sourceMessageId),sourceSwipeId:re(t?.sourceSwipeId||t?.effectiveSwipeId),slotBindingKey:re(t?.slotBindingKey),slotRevisionKey:re(t?.slotRevisionKey),slotTransactionId:re(t?.slotTransactionId)},loadMode:re(e?.loadMode),mergeBaseOnly:e?.mergeBaseOnly===!0,tables:Array.isArray(e?.state?.tables)?ue(e.state.tables):[]}}function pc(){return kp}function Cp(t){if(!Array.isArray(t))return[];let e={[vs.UPDATE_ROW]:0,[vs.INSERT_ROW]:1,[vs.DELETE_ROW]:2};return[...t].sort((s,r)=>{let o=e[s.op]??99,a=e[r.op]??99;return o===2&&a===2?(r.rowIndex??0)-(s.rowIndex??0):o-a})}function $p(t,e,s){let r=ue(t||[]),o=s||{};for(let a of e){let n=a.tableIndex;if(n<0||n>=r.length)continue;let i=r[n];if(!i||!Array.isArray(i.rows))continue;if(a.op===vs.INSERT_ROW){let c={name:"",cells:{}};if(a.data&&typeof a.data=="object"){c.name=re(a.data.name,"");let d=Array.isArray(i.columns)?i.columns:[];for(let u of d){let y=u.key;a.data[y]!==void 0&&(c.cells[y]=re(a.data[y]))}for(let[u,y]of Object.entries(a.data))u!=="name"&&c.cells[u]===void 0&&(c.cells[u]=re(y))}i.rows.push(c);continue}let l=a.rowIndex;if(!(l<0||l>=i.rows.length)){if(a.op===vs.DELETE_ROW){i.rows.splice(l,1);continue}if(a.op===vs.UPDATE_ROW){let c=i.rows[l];if(!c)continue;if(c.cells=c.cells||{},a.data&&typeof a.data=="object"){for(let[d,u]of Object.entries(a.data))dc(o,n,l,d)||(c.cells[d]=re(u));a.data.name!==void 0&&(c.name=re(a.data.name,c.name))}}}}return r}async function Rp({executionContext:t,targetSnapshot:e,loadResult:s,config:r,assistantSnapshot:o,fillMode:a}={}){let n=Ze(r),i=Nl(n),l=Mp(e,s),c=Array.isArray(o?.tableState?.tables)?ue(o.tableState.tables):[],d=a==="incremental"||!a&&n.fillMode!=="full",u={...t,toolName:"\u586B\u8868\u5DE5\u4F5C\u53F0",toolId:"tableWorkbench",lastAiMessage:t?.assistantBaseText||t?.lastAiMessage||"",recentMessagesText:yc(t?.chatHistory||t?.chatMessages||[]),rawRecentMessagesText:yc(t?.chatHistory||t?.chatMessages||[],20),tableGuidance:Ip(n.tables),injectedContext:o?.injectedContext||We.getLatestMessageInjectedContext(e?.sourceMessageId),toolContentMacro:JSON.stringify(l,null,2),extractedContent:JSON.stringify(l,null,2),previousToolOutput:JSON.stringify(c,null,2)},y=await cs.buildToolMessages(i,u),p=await cs.buildPromptText(i,u);if(d&&(p+=pc(),Array.isArray(y)&&y.length>0)){let f=y[y.length-1];f&&typeof f.content=="string"&&(f.content+=pc())}if(!Array.isArray(y)||y.length===0)throw new Error("\u586B\u8868\u8BF7\u6C42\u6D88\u606F\u6784\u5EFA\u5931\u8D25\u3002");return{toolConfig:i,context:u,requestPayload:l,promptText:p,messages:y,fillMode:d?"incremental":"full"}}async function Pp(t,e={},s=null){let r=Ze(e),o=re(r.apiPreset,"");if(o){if(!or(o))throw new Error(`API \u9884\u8BBE\u4E0D\u5B58\u5728: ${o}`);return sa(o,t,{},s)}return ar(t,{},s)}async function fc(t=null){let e=Ze(t||zt()),s=rn(e),r=xs({tables:Array.isArray(e.tables)?e.tables:[]});if(!s.valid||!r.valid){let n=[...s.errors,...r.errors];return Pr({lastStatus:Vs.ERROR,lastRunAt:Date.now(),lastDurationMs:0,lastError:n[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002",lastErrorDetails:n,lastValidationSummary:r.summary||{errorCount:n.length,warningCount:0},errorCount:Number(e?.runtime?.errorCount)||0}),{success:!1,error:n.join(`
`),errors:n}}let o=e.runtime||{},a=Date.now();Pr({lastStatus:Vs.RUNNING,lastError:"",lastErrorDetails:[],lastValidationSummary:r.summary||{errorCount:0,warningCount:0}});try{let n=await is({runSource:yt.MANUAL}),i=Uo(n,{runSource:yt.MANUAL});if(!i)throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u697C\u5C42\u3002");let l=await Jl(i);if(!l?.success)throw new Error(l?.error||"\u76EE\u6807\u89E3\u6790\u8BB0\u5F55\u5931\u8D25");let c=Ql(i.sourceMessageId),d=Vl(i,{templateTables:e.tables}),y=Zl(i)?.state?.tables||d?.state?.tables||[],p=await Rp({executionContext:n,targetSnapshot:i,loadResult:d,config:e,assistantSnapshot:c}),f=await Pp(p.messages,e),x=ac(f),v,_=null,A=p.fillMode||"full";if(x.mode==="incremental"&&x.edits){let $=cc(d?.state),I=Cp(x.edits);v=$p(y,I,$),A="incremental"}else x.mode==="full"&&x.tables?(v=ue(x.tables),A="full"):v=y;_=ic(y,v);let S=await ec({targetSnapshot:i,nextTables:v,config:e,loadResult:d,diff:_,fillMode:A});if(!S?.success)throw new Error(S?.error||"\u7ED3\u6784\u5316\u5199\u56DE\u5931\u8D25");let z=Date.now()-a;return Pr({lastStatus:Vs.SUCCESS,lastRunAt:Date.now(),lastDurationMs:z,lastError:"",lastErrorDetails:[],lastValidationSummary:r.summary||{errorCount:0,warningCount:0},successCount:(Number(o.successCount)||0)+1,errorCount:Number(o.errorCount)||0,lastSourceMessageId:re(i.sourceMessageId),lastSlotRevisionKey:re(i.slotRevisionKey),lastLoadMode:re(d.loadMode),lastMirrorApplied:S?.mirrorResult?.success===!0,lastFillMode:A}),{success:!0,targetSnapshot:i,loadResult:d,request:p,responseText:f,parsed:x,fillMode:A,diff:_,previousTables:y,nextTables:v,state:S.state,bindings:S.bindings,mirrorResult:S.mirrorResult,warning:S.warning||""}}catch(n){let i=Date.now()-a;return Pr({lastStatus:Vs.ERROR,lastRunAt:Date.now(),lastDurationMs:i,lastError:n?.message||String(n),lastErrorDetails:[n?.message||String(n)],lastValidationSummary:r.summary||{errorCount:0,warningCount:0},successCount:Number(o.successCount)||0,errorCount:(Number(o.errorCount)||0)+1}),{success:!1,error:n?.message||String(n),errors:[n?.message||String(n)]}}}var kp,gc=B(()=>{Ls();ls();nr();Ao();Bt();an();nn();Or();tc();nc();lc();uc();kp=`

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

\u53EA\u8FD4\u56DE <tableEdit> \u6807\u7B7E\uFF0C\u4E0D\u8981\u9644\u52A0\u5176\u4ED6\u5185\u5BB9\u3002`});function _e(t,e=""){return typeof t=="string"&&t.trim()?t.trim():e}function et(t,e){let s=Array.isArray(t)?t.length:0;return s<=0||!Number.isInteger(e)||e<0?0:Math.min(e,s-1)}function Dp(t){try{return JSON.stringify(t,null,2)}catch{return String(t??"")}}function Lp(){return Bl({apiPresets:bt()})}function Lr(t,e){return _e(t?.aiInstructions?.[e],"")}function Np(t={}){return{init:Lr(t,"init"),create:Lr(t,"create"),update:Lr(t,"update"),delete:Lr(t,"delete")}}function ln(t){let e=_e(t,"idle");return e==="running"?"\u8FD0\u884C\u4E2D":e==="success"?"\u6700\u8FD1\u6210\u529F":e==="error"?"\u6700\u8FD1\u5931\u8D25":"\u672A\u8FD0\u884C"}function Bp(t){return t?new Date(t).toLocaleString():"\u2014"}function Up(t){return Number.isFinite(t)&&t>0?`${(t/1e3).toFixed(t>=1e3?1:2)}s`:"\u2014"}function jp(t,e){return _e(t?.id||t?.key,`table_${e}`)}function bc(t){return{columns:Array.isArray(t?.columns)?t.columns.length:0,rows:Array.isArray(t?.rows)?t.rows.length:0}}function zp(t){let e=bc(t);return`${e.columns} \u5B57\u6BB5 \xB7 ${e.rows} \u884C`}function Ue(t,e){let s=D(),r=e&&typeof e=="object"?e:zt();if(!s||!j(t))return r;let o={...r,runtime:r.runtime||{}},a=Array.isArray(o.tables)?[...o.tables]:[],n=et(a,o.__activeTableIndex??0);if(a[n]){let A=a[n]||{},S={...A,aiInstructions:Np(A)},z=t.find("[data-twb-name]");z.length&&(S.name=String(z.val()||"").trim());let $=t.find("[data-twb-note]");$.length&&(S.note=String($.val()||"").trim()),t.find("[data-twb-table-instruction]").each(function(){let I=String(s(this).attr("data-twb-table-instruction")||"").trim();I&&(S.aiInstructions[I]=String(s(this).val()||"").trim())}),t.find("[data-twb-col]").length&&(S.columns=[],t.find("[data-twb-col]").each(function(){let I=s(this);S.columns.push({key:_e(I.find("[data-twb-col-key]").val(),""),title:_e(I.find("[data-twb-col-title]").val(),""),type:_e(I.find("[data-twb-col-type]").val(),"text"),required:I.find("[data-twb-col-req]").is(":checked"),description:_e(I.find("[data-twb-col-desc]").val(),"")})})),t.find("[data-twb-row]").length&&(S.rows=[],t.find("[data-twb-row]").each(function(){let I=s(this),R={};(S.columns||[]).forEach(J=>{R[J.key]=_e(I.find(`[data-twb-cell="${J.key}"]`).val(),"")}),S.rows.push({name:_e(I.find("[data-twb-row-name]").val(),""),cells:R})})),a[n]=S}let i=t.find('[data-twb-field="promptTemplate"]');i.length&&(o.promptTemplate=String(i.val()||""));let l=t.find('[data-twb-field="apiPreset"]');l.length&&(o.apiPreset=String(l.val()||""));let c=t.find('[data-twb-field="fillMode"]');c.length&&(o.fillMode=String(c.val()||""));let d=t.find('[data-twb-field="mirrorToMessage"]');d.length&&(o.mirrorToMessage=d.is(":checked"));let u=t.find('[data-twb-field="autoUpdateEnabled"]');u.length&&(o.autoUpdateEnabled=u.is(":checked"));let y=t.find('[data-twb-field="autoUpdateTrigger"]');y.length&&(o.autoUpdateTrigger=String(y.val()||"assistantMessage"));let p=t.find('[data-twb-field="runScope"]:checked');p.length&&(o.runScope=String(p.val()||"enabled"));let f=t.find('[data-twb-field="promptPreset"]');f.length&&(o.promptPreset=String(f.val()||""));let x=t.find('[data-twb-field="bypassEnabled"]'),v=String(o.promptPreset||"");o.bypass={...o.bypass||{},enabled:x.length?x.is(":checked"):o.bypass?.enabled===!0,presetId:v};let _=t.find('[data-twb-field="activeTemplate"]');return _.length&&(o.activeTemplate=String(_.val()||"")),o.tables=a,o}function hc(t){let e=_e(t,"idle");return`<span class="yyt-tool-runtime-badge yyt-status-${b(e)}">${b(ln(e))}</span>`}function Wp(t){return`
    <header class="yyt-tool-panel-hero">
      <div class="yyt-tool-panel-hero-copy">
        <div class="yyt-tool-panel-hero-title"><i class="fa-solid fa-table-cells"></i> \u586B\u8868\u5DE5\u4F5C\u53F0</div>
        <div class="yyt-tool-panel-hero-desc">\u7ED3\u6784\u5316\u72B6\u6001\u4E0E\u5173\u7CFB\u6570\u636E\u5DE5\u4F5C\u53F0\uFF0C\u6309\u5F53\u524D assistant \u6D88\u606F\u6267\u884C AI \u586B\u8868\u3002</div>
      </div>
      <div class="yyt-tool-panel-hero-tags">
        ${hc(t?.runtime?.lastStatus)}
        <button class="yyt-btn yyt-btn-secondary yyt-tool-save-top" data-twb-action="save"><i class="fa-solid fa-save"></i> \u4FDD\u5B58</button>
        <button class="yyt-btn yyt-btn-primary" data-twb-action="run"><i class="fa-solid fa-play"></i> \u7ACB\u5373\u586B\u8868</button>
      </div>
    </header>`}function Kp(t){let e=t?.runtime||{};return`
    <article class="yyt-panel-section yyt-twb-card yyt-twb-runtime-card">
      <div class="yyt-twb-card-header">
        <div><h3>\u8FD0\u884C\u6982\u89C8</h3><p>\u6700\u8FD1\u4E00\u6B21\u586B\u8868\u6267\u884C\u7ED3\u679C\u3002</p></div>
        ${hc(e.lastStatus)}
      </div>
      <div class="yyt-twb-metrics">
        <div><span>\u6700\u8FD1\u8FD0\u884C</span><strong>${b(Bp(e.lastRunAt))}</strong></div>
        <div><span>\u8017\u65F6</span><strong>${b(Up(e.lastDurationMs))}</strong></div>
        <div><span>\u6210\u529F</span><strong>${Number(e.successCount)||0}</strong></div>
        <div><span>\u5931\u8D25</span><strong>${Number(e.errorCount)||0}</strong></div>
      </div>
      <div class="yyt-twb-runtime-message">\u6700\u8FD1\u9519\u8BEF\uFF1A${b(_e(e.lastError,"\u65E0"))}</div>
    </article>`}function Fp(t){return`
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
          <option value="${jt.INCREMENTAL}" ${t.fillMode!==jt.FULL?"selected":""}>\u589E\u91CF\u66F4\u65B0</option>
          <option value="${jt.FULL}" ${t.fillMode===jt.FULL?"selected":""}>\u5168\u91CF\u91CD\u5199</option>
        </select>
      </label>
      <label class="yyt-twb-check-row"><input type="checkbox" data-twb-field="mirrorToMessage" ${t.mirrorToMessage?"checked":""}><span>\u955C\u50CF\u5199\u56DE\u6B63\u6587</span></label>
    </article>`}function Hp(t){let e=bt(),s=Tr()||[],r=t?.bypass?.enabled===!0,o=_e(t?.bypass?.presetId||t?.promptPreset,"");return`
    <article class="yyt-panel-section yyt-twb-card">
      <div class="yyt-twb-card-header">
        <div><h3>AI \u7ED1\u5B9A</h3><p>\u9009\u62E9\u586B\u8868\u4F7F\u7528\u7684 API\u3001Ai \u6307\u4EE4\u9884\u8BBE\u4E0E\u586B\u8868 Prompt\u3002</p></div>
        <span class="yyt-twb-muted">API \u4E0E Ai \u6307\u4EE4</span>
      </div>
      <label class="yyt-twb-field">
        <span>API \u9884\u8BBE</span>
        <select class="yyt-select" data-twb-field="apiPreset">
          <option value="" ${t.apiPreset?"":"selected"}>\u4F7F\u7528\u5F53\u524D API \u914D\u7F6E</option>
          ${e.map(a=>`<option value="${b(a?.name||"")}" ${t.apiPreset===a?.name?"selected":""}>${b(a?.name||"")}</option>`).join("")}
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
          ${s.map(a=>`<option value="${b(a?.id||"")}" ${o===a?.id?"selected":""}>${b(a?.name||a?.id||"")}</option>`).join("")}
        </select>
        <small>\u542F\u7528\u540E\u4F1A\u4F5C\u4E3A\u586B\u8868\u8BF7\u6C42\u7684\u524D\u7F6E\u6D88\u606F\u53D1\u9001\uFF0C\u590D\u7528\u7834\u9650\u6A21\u5757\u4E2D\u7684 Ai \u6307\u4EE4\u9884\u8BBE\u3002</small>
      </label>
      <details>
        <summary class="yyt-twb-muted yyt-twb-prompt-summary">\u67E5\u770B / \u7F16\u8F91\u586B\u8868 Prompt</summary>
        <label class="yyt-twb-field yyt-twb-prompt-field">
          <span>\u586B\u8868 Prompt</span>
          <textarea class="yyt-code-textarea" rows="9" data-twb-field="promptTemplate">${b(t.promptTemplate||"")}</textarea>
        </label>
      </details>
    </article>`}function qp(t){let e=sn();return`
    <article class="yyt-panel-section yyt-twb-card yyt-twb-template-card">
      <div class="yyt-twb-card-header">
        <div><h3>\u6A21\u677F\u7BA1\u7406</h3><p>\u590D\u7528\u8868\u683C\u7ED3\u6784\u4E0E AI \u64CD\u4F5C\u8BF4\u660E\u3002</p></div>
        <span class="yyt-twb-muted">\u7ED3\u6784\u6A21\u677F</span>
      </div>
      <label class="yyt-twb-field">
        <span>\u5F53\u524D\u6A21\u677F</span>
        <select class="yyt-select" data-twb-field="activeTemplate">
          <option value="" ${t.activeTemplate?"":"selected"}>\u4E0D\u5207\u6362\u6A21\u677F</option>
          ${e.map(s=>`<option value="${b(s.id)}" ${t.activeTemplate===s.id?"selected":""}>${b(s.name)}</option>`).join("")}
        </select>
      </label>
      <p class="yyt-twb-help">\u5185\u7F6E\u9ED8\u8BA4\u6A21\u677F\u53EF\u76F4\u63A5\u5E94\u7528\uFF1B\u5BFC\u5165/\u5BFC\u51FA\u4F1A\u5728\u540E\u7EED\u6A21\u677F\u5E93\u9636\u6BB5\u63A5\u5165\u3002</p>
      <div class="yyt-twb-action-grid">
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="apply-template">\u5E94\u7528\u6A21\u677F</button>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="save-template">\u4FDD\u5B58\u4E3A\u6A21\u677F</button>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="import-template">\u5BFC\u5165\u6A21\u677F</button>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="export-template">\u5BFC\u51FA\u6A21\u677F</button>
      </div>
    </article>`}function Gp(t){let e=Array.isArray(t.tables)?t.tables:[],s=_e(t.runScope,"enabled");return`
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
        ${e.length?e.map((r,o)=>`<label class="yyt-twb-table-chip"><input type="checkbox" data-twb-run-table="${b(jp(r,o))}"><span>${b(_e(r?.name,`\u8868\u683C ${o+1}`))}</span></label>`).join(""):'<span class="yyt-twb-muted">\u8FD8\u6CA1\u6709\u53EF\u66F4\u65B0\u7684\u8868\u683C\u3002</span>'}
      </div>
      <div class="yyt-twb-card-actions">
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="run-selected">\u4EC5\u66F4\u65B0\u9009\u4E2D\u8868\u683C</button>
        <button class="yyt-btn yyt-btn-primary yyt-btn-small" data-twb-action="run">\u7ACB\u5373\u586B\u8868</button>
      </div>
    </article>`}function Yp(t){let e=Array.isArray(t.tables)?t.tables:[],s=et(e,t.__activeTableIndex??0),r=xs({tables:e});return`
    <section class="yyt-twb-table-overview">
      <div class="yyt-twb-section-header">
        <div><h3>\u8868\u683C</h3><p>\u7BA1\u7406\u9700\u8981 AI \u7EF4\u62A4\u7684\u7ED3\u6784\u5316\u8868\u683C\u3002</p></div>
        <button class="yyt-btn yyt-btn-secondary" data-twb-action="add-table"><i class="fa-solid fa-plus"></i> \u65B0\u5EFA\u8868\u683C</button>
      </div>
      ${e.length?`
        <div class="yyt-twb-table-card-list">
          ${e.map((o,a)=>{let n=bc(o),i=(r.issues||[]).filter(d=>d.tableIndex===a),l=i.length?`${i.length} \u4E2A\u95EE\u9898`:"\u65E0\u6821\u9A8C\u95EE\u9898";return`
              <article class="yyt-twb-table-card ${a===s?"is-active":""}" data-twb-select="${a}">
                <div class="yyt-twb-table-card-main">
                  <div class="yyt-twb-table-copy">
                    <h4>${b(_e(o?.name,`\u8868\u683C ${a+1}`))}</h4>
                    <p>${b(_e(o?.note,"\u8FD8\u6CA1\u6709\u8868\u683C\u8BF4\u660E\u3002"))}</p>
                    <div class="yyt-twb-table-card-meta ${i.length?"is-warning":""}">${n.columns} \u5B57\u6BB5 / ${n.rows} \u884C \xB7 ${b(ln(t?.runtime?.lastStatus))} \xB7 ${b(l)}</div>
                  </div>
                </div>
                <div class="yyt-twb-table-card-actions">
                  <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="open-table-editor" data-twb-ti="${a}">\u914D\u7F6E\u8868\u683C</button>
                  <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="run-table" data-twb-ti="${a}">\u66F4\u65B0\u6B64\u8868</button>
                  ${e.length>1?`<button class="yyt-btn yyt-btn-danger yyt-btn-small" data-twb-action="delete-table" data-twb-ti="${a}" title="\u5220\u9664\u8868\u683C">\u5220\u9664</button>`:""}
                </div>
              </article>`}).join("")}
        </div>`:`
        <div class="yyt-twb-empty">
          <h4>\u8FD8\u6CA1\u6709\u8868\u683C</h4>
          <p>\u5148\u65B0\u5EFA\u4E00\u5F20\u8868\uFF0C\u518D\u5B9A\u4E49\u5B57\u6BB5\u548C\u6570\u636E\u884C\u3002</p>
          <button class="yyt-btn yyt-btn-primary" data-twb-action="add-table">\u65B0\u5EFA\u7B2C\u4E00\u5F20\u8868</button>
        </div>`}
    </section>`}function Vp(t){return`
    <main class="yyt-twb-dashboard">
      <section class="yyt-twb-dashboard-grid">
        ${Kp(t)}
        ${Fp(t)}
        ${Hp(t)}
        ${qp(t)}
        ${Gp(t)}
      </section>
      ${Yp(t)}
    </main>`}function Jp(t){return`
    <section class="yyt-panel-section yyt-twb-editor-section">
      <div class="yyt-twb-section-header"><div><h4>\u8868\u683C\u57FA\u7840\u4FE1\u606F</h4><p>\u544A\u8BC9 AI \u8FD9\u5F20\u8868\u4EE3\u8868\u4EC0\u4E48\uFF0C\u4EE5\u53CA\u5B83\u5E94\u8BE5\u8FFD\u8E2A\u54EA\u7C7B\u4FE1\u606F\u3002</p></div></div>
      <label class="yyt-twb-field"><span>\u8868\u540D</span><input class="yyt-input" data-twb-name value="${b(t?.name||"")}" placeholder="\u8868\u540D"></label>
      <label class="yyt-twb-field"><span>\u8868\u683C\u8BF4\u660E</span><textarea class="yyt-textarea" rows="3" data-twb-note placeholder="\u4F8B\u5982\uFF1A\u8BB0\u5F55\u89D2\u8272\u57FA\u7840\u4FE1\u606F\u3001\u72B6\u6001\u548C\u5173\u7CFB\u53D8\u5316\u3002">${b(t?.note||"")}</textarea></label>
    </section>`}function Xp(t){return`
    <section class="yyt-panel-section yyt-twb-editor-section yyt-twb-ai-instructions">
      <div class="yyt-twb-section-header"><div><h4>AI \u7406\u89E3\u4E0E\u64CD\u4F5C\u8BF4\u660E</h4><p>\u8BA9 AI \u81EA\u884C\u5224\u65AD\u662F\u5426\u9700\u8981\u521D\u59CB\u5316\u3001\u65B0\u589E\u3001\u66F4\u65B0\u6216\u5220\u9664\u8FD9\u5F20\u8868\u7684\u6570\u636E\u3002</p></div></div>
      <div class="yyt-twb-ai-grid">
        ${[["init","\u521D\u59CB\u5316\u8BF4\u660E","\u5F53\u8868\u683C\u4E3A\u7A7A\u65F6\uFF0CAI \u5E94\u8BE5\u5982\u4F55\u521B\u5EFA\u521D\u59CB\u6570\u636E\u3002"],["create","\u65B0\u589E\u8BF4\u660E","\u4EC0\u4E48\u65F6\u5019\u5E94\u8BE5\u65B0\u589E\u4E00\u884C\u3002"],["update","\u66F4\u65B0\u8BF4\u660E","\u4EC0\u4E48\u65F6\u5019\u5E94\u8BE5\u66F4\u65B0\u5DF2\u6709\u884C\u3002"],["delete","\u5220\u9664\u8BF4\u660E","\u4EC0\u4E48\u65F6\u5019\u5E94\u8BE5\u5220\u9664\u6216\u6807\u8BB0\u5220\u9664\u4E00\u884C\u3002"]].map(([s,r,o])=>`
          <label class="yyt-twb-field">
            <span>${r}</span>
            <small>${o}</small>
            <textarea class="yyt-textarea" rows="3" data-twb-table-instruction="${s}">${b(Lr(t,s))}</textarea>
          </label>`).join("")}
      </div>
    </section>`}function Qp(t){let e=Array.isArray(t?.columns)?t.columns:[];return`
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
                <label class="yyt-twb-field"><span>\u5B57\u6BB5\u540D</span><input class="yyt-input" data-twb-col-title value="${b(s.title||"")}" placeholder="\u5B57\u6BB5\u540D"></label>
                <label class="yyt-twb-field"><span>AI \u586B\u5199\u8BF4\u660E</span><textarea class="yyt-textarea" rows="2" data-twb-col-desc placeholder="\u544A\u8BC9 AI \u8FD9\u4E2A\u5B57\u6BB5\u8BE5\u586B\u4EC0\u4E48\u3002">${b(s.description||"")}</textarea></label>
              </div>
              <button class="yyt-btn yyt-btn-icon" data-twb-action="delete-col" data-twb-ci="${b(s.key||"")}" title="\u5220\u9664\u5B57\u6BB5" aria-label="\u5220\u9664\u5B57\u6BB5"><i class="fa-solid fa-trash"></i></button>
              <details class="yyt-twb-field-advanced">
                <summary>\u9AD8\u7EA7\u8BBE\u7F6E</summary>
                <div class="yyt-twb-advanced-grid">
                  <label class="yyt-twb-field"><span>\u5185\u90E8\u6807\u8BC6 key</span><input class="yyt-input" data-twb-col-key value="${b(s.key||"")}" placeholder="col_key"></label>
                  <label class="yyt-twb-field"><span>\u5185\u5BB9\u683C\u5F0F</span><select class="yyt-select" data-twb-col-type>${Bo.map(o=>`<option value="${o.value}" ${s.type===o.value?"selected":""}>${o.label}</option>`).join("")}</select></label>
                  <label class="yyt-twb-check-row"><input type="checkbox" data-twb-col-req ${s.required?"checked":""}><span>AI \u5FC5\u987B\u5C1D\u8BD5\u586B\u5199</span></label>
                </div>
              </details>
            </article>`).join("")}
        </div>`:`
        <div class="yyt-twb-empty"><h4>\u8FD8\u6CA1\u6709\u5B57\u6BB5</h4><p>\u5B57\u6BB5\u51B3\u5B9A AI \u8F93\u51FA\u683C\u5F0F\uFF0C\u4E5F\u51B3\u5B9A\u6BCF\u884C\u53EF\u586B\u5199\u7684\u5185\u5BB9\u3002</p><button class="yyt-btn yyt-btn-secondary" data-twb-action="add-col">\u6DFB\u52A0\u5B57\u6BB5</button></div>`}
    </section>`}function Zp(t,e){let s=t?.key||"",r=t?.title||s,o=e?.cells&&e.cells[s]!==void 0?e.cells[s]:"",a=t?.required?" *":"";return t?.type==="boolean"?`
      <label class="yyt-twb-field">
        <span>${b(r)}${a}</span>
        <select class="yyt-select" data-twb-cell="${b(s)}">
          <option value="" ${o===""?"selected":""}>\u2014</option>
          <option value="true" ${o==="true"?"selected":""}>\u662F</option>
          <option value="false" ${o==="false"?"selected":""}>\u5426</option>
        </select>
      </label>`:t?.type==="json"?`<label class="yyt-twb-field yyt-twb-span-2"><span>${b(r)}${a}</span><textarea class="yyt-textarea" rows="4" data-twb-cell="${b(s)}">${b(o)}</textarea></label>`:`<label class="yyt-twb-field ${t?.type==="text"&&String(o).length>80?"yyt-twb-span-2":""}"><span>${b(r)}${a}</span><input class="yyt-input" type="${t?.type==="number"?"number":"text"}" data-twb-cell="${b(s)}" value="${b(o)}" placeholder="${b(r)}"></label>`}function mc(t,e,s){let r=e?.name||`__row_${s}`,o=t?.[r];return o?.__rowStatus==="new"?"new":o&&Object.entries(o).some(([a,n])=>a!=="__rowStatus"&&(n==="updated"||n==="new"))?"updated":""}function ef(t){return t==="new"?"\u65B0\u589E":t==="updated"?"\u5DF2\u66F4\u65B0":"\u624B\u52A8"}function tf(t,e){let s=Array.isArray(t?.columns)?t.columns:[],r=Array.isArray(t?.rows)?t.rows:[];return`
    <section class="yyt-panel-section yyt-twb-editor-section yyt-twb-rows-workspace">
      <div class="yyt-twb-section-header">
        <div><h4>\u6570\u636E\u884C</h4><p>\u5171 ${r.length} \u884C \xB7 \u6700\u8FD1 AI \u66F4\u65B0 ${r.filter((o,a)=>mc(e,o,a)).length} \u884C</p></div>
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
          ${r.map((o,a)=>{let n=mc(e,o,a);return`
              <article class="yyt-twb-row-card${n?` row-${n}`:""}" data-twb-row data-twb-ri="${a}">
                <header class="yyt-twb-row-card-header">
                  <div><span class="yyt-twb-row-index">\u7B2C ${a+1} \u884C</span><input class="yyt-input yyt-twb-row-name" data-twb-row-name value="${b(o?.name||"")}" placeholder="\u884C\u540D\uFF08\u53EF\u9009\uFF09"></div>
                  <div class="yyt-twb-row-actions">
                    <span class="yyt-tool-runtime-badge yyt-status-${n==="new"?"success":n==="updated"?"running":"idle"}">${ef(n)}</span>
                    <button class="yyt-btn yyt-btn-icon" data-twb-action="delete-row" data-twb-ri="${a}" title="\u5220\u9664\u6B64\u884C" aria-label="\u5220\u9664\u6B64\u884C"><i class="fa-solid fa-trash"></i></button>
                  </div>
                </header>
                <div class="yyt-twb-row-fields">${s.map(i=>Zp(i,o)).join("")}</div>
              </article>`}).join("")}
        </div>`:`
        <div class="yyt-twb-empty"><h4>\u6682\u65E0\u6570\u636E\u884C</h4><p>\u53EF\u4EE5\u624B\u52A8\u6DFB\u52A0\u4E00\u884C\uFF0C\u6216\u70B9\u51FB\u201C\u7ACB\u5373\u586B\u8868\u201D\u8BA9 AI \u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u751F\u6210\u3002</p><button class="yyt-btn yyt-btn-secondary" data-twb-action="add-row">\u6DFB\u52A0\u884C</button></div>`}
    </section>`}function sf(t,e,s){let o=(xs({tables:Array.isArray(s.tables)?s.tables:[]}).issues||[]).filter(a=>a.tableIndex===e);return`
    <section class="yyt-twb-editor-section yyt-twb-diagnostics">
      <details>
        <summary>\u5355\u8868\u8BCA\u65AD <span class="yyt-twb-muted">${o.length} \u4E2A\u6821\u9A8C\u95EE\u9898 \xB7 JSON \u9884\u89C8</span></summary>
        <div class="yyt-twb-diagnostic-grid">
          <div>
            <h5>\u6821\u9A8C\u95EE\u9898</h5>
            ${o.length?`<div class="yyt-twb-pre">${b(o.map(a=>a.message).join(`
`))}</div>`:'<div class="yyt-twb-muted">\u6682\u65E0\u6821\u9A8C\u95EE\u9898\u3002</div>'}
          </div>
          <div>
            <h5>JSON \u9884\u89C8</h5>
            <pre class="yyt-twb-pre">${b(Dp(t||{}))}</pre>
          </div>
        </div>
      </details>
    </section>`}function rf(t){let e={tables:Array.isArray(t.tables)?t.tables:[]},r=xs(e)?.summary?.errorCount||0;return`
    <section class="yyt-twb-editor-section yyt-twb-diagnostics">
      <details>
        <summary>${r>0?`\u9700\u8981\u5904\u7406\uFF1A${r} \u4E2A\u6821\u9A8C\u95EE\u9898`:"\u5168\u5C40\u9AD8\u7EA7\u8BBE\u7F6E\u4E0E\u8FD0\u884C\u8BCA\u65AD"}</summary>
        <div class="yyt-twb-diagnostic-body">
          ${zl(Lp(),t)}
          <div><h5>\u53D8\u91CF\u5E2E\u52A9</h5><pre class="yyt-twb-pre">${b(Xe.getVariableHelp())}</pre></div>
        </div>
      </details>
    </section>`}function of(t,e,s,r){let a=(Array.isArray(t.tables)?t.tables:[])[e]||null;return!s||!a?'<aside class="yyt-twb-editor-drawer"></aside>':`
    <aside class="yyt-twb-editor-drawer is-open">
      <div class="yyt-twb-editor">
        <header class="yyt-twb-editor-header">
          <div>
            <h3>\u914D\u7F6E\u8868\u683C\uFF1A${b(_e(a.name,`\u8868\u683C ${e+1}`))}</h3>
            <p>${b(zp(a))} \xB7 ${b(ln(t?.runtime?.lastStatus))}</p>
          </div>
          <button class="yyt-btn yyt-btn-icon" data-twb-action="close-table-editor" title="\u5173\u95ED" aria-label="\u5173\u95ED"><i class="fa-solid fa-xmark"></i></button>
        </header>
        <div class="yyt-twb-editor-body">
          ${Jp(a)}
          ${Xp(a)}
          ${Qp(a)}
          ${tf(a,r)}
          ${sf(a,e,t)}
          ${rf(t)}
        </div>
        <footer class="yyt-twb-editor-footer">
          <button class="yyt-btn yyt-btn-secondary" data-twb-action="close-table-editor">\u5173\u95ED</button>
          <button class="yyt-btn yyt-btn-primary" data-twb-action="save">\u4FDD\u5B58\u8868\u683C</button>
        </footer>
      </div>
    </aside>`}var Op,Ss,cn=B(()=>{Ae();ys();Wl();Fl();Ir();cr();Bs();Or();gc();Op=`${Ks} ${Kl()}

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
.yyt-twb-metrics > div { padding:10px 11px; border:1px solid var(--yyt-border); border-radius:10px; background:var(--yyt-bg-secondary); }
.yyt-twb-metrics span { display:block; color:var(--yyt-text-muted); font-size:11px; margin-bottom:5px; }
.yyt-twb-metrics strong { color:var(--yyt-text); font-size:15px; font-weight:800; }
.yyt-twb-runtime-message { margin-top:10px; padding:9px 10px; border:1px solid var(--yyt-border); border-radius:10px; background:var(--yyt-bg-secondary); color:var(--yyt-text-secondary); font-size:12px; line-height:1.6; }

.yyt-twb-field { display:flex; flex-direction:column; gap:6px; margin:0 0 10px; min-width:0; }
.yyt-twb-field > span { color:var(--yyt-text-secondary); font-size:12px; font-weight:700; }
.yyt-twb-field small { color:var(--yyt-text-muted); font-size:11px; line-height:1.45; }
.yyt-twb-check-row,
.yyt-twb-radio-group label,
.yyt-twb-table-chip { display:flex; align-items:center; gap:8px; color:var(--yyt-text-secondary); font-size:12px; }
.yyt-twb-check-row { width:max-content; max-width:100%; }
.yyt-twb-radio-group { display:flex; flex-direction:column; gap:8px; margin-bottom:10px; }
.yyt-twb-radio-group label { width:max-content; max-width:100%; }
.yyt-twb-segmented { display:inline-flex; gap:4px; padding:3px; border:1px solid var(--yyt-border); border-radius:999px; background:var(--yyt-bg-secondary); }
.yyt-twb-segmented button { border:none; border-radius:999px; padding:6px 11px; background:transparent; color:var(--yyt-text-secondary); cursor:pointer; font-size:12px; font-weight:700; }
.yyt-twb-segmented button.active { background:var(--yyt-accent); color:#fff; }
.yyt-twb-action-grid { display:flex; flex-wrap:wrap; gap:8px; }
.yyt-twb-table-chip-list { display:flex; flex-wrap:wrap; gap:8px; margin:10px 0; }
.yyt-twb-table-chip { max-width:220px; padding:6px 10px; border:1px solid var(--yyt-border); border-radius:999px; background:var(--yyt-bg-secondary); }
.yyt-twb-table-chip span { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.yyt-twb-muted { color:var(--yyt-text-muted); font-size:12px; }
.yyt-twb-help { margin:0; color:var(--yyt-text-secondary); font-size:12px; line-height:1.6; }
.yyt-twb-prompt-summary { cursor:pointer; font-weight:700; padding:8px 0; }
.yyt-twb-prompt-field { margin-top:10px; }

.yyt-twb-table-overview { border:1px solid var(--yyt-border); border-radius:12px; background:var(--yyt-bg); padding:14px; }
.yyt-twb-table-card-list { display:flex; flex-direction:column; gap:8px; }
.yyt-twb-table-card { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:12px; padding:12px; border:1px solid var(--yyt-border); border-radius:10px; background:var(--yyt-bg-secondary); cursor:pointer; }
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
.yyt-twb-empty { padding:24px; border:1px dashed var(--yyt-border); border-radius:12px; color:var(--yyt-text-secondary); background:var(--yyt-bg-secondary); text-align:center; }
.yyt-twb-empty h4 { margin:0 0 6px; color:var(--yyt-text); font-size:15px; }
.yyt-twb-empty p { margin:0 0 14px; font-size:12px; line-height:1.6; }

.yyt-twb-editor-drawer { position:absolute; inset:0 0 0 auto; width:min(920px,92%); background:rgba(8,12,18,0.72); backdrop-filter:blur(10px); border-left:1px solid var(--yyt-border); transform:translateX(100%); transition:transform 180ms ease; z-index:20; box-shadow:-18px 0 40px rgba(0,0,0,0.22); }
.yyt-twb-editor-drawer.is-open { transform:translateX(0); }
.yyt-twb-editor { height:100%; display:flex; flex-direction:column; background:var(--yyt-bg); }
.yyt-twb-editor-header,
.yyt-twb-editor-footer { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; padding:16px 18px; border-bottom:1px solid var(--yyt-border); background:var(--yyt-bg); }
.yyt-twb-editor-footer { border-top:1px solid var(--yyt-border); border-bottom:none; justify-content:flex-end; }
.yyt-twb-editor-header h3 { margin:0; color:var(--yyt-text); font-size:17px; }
.yyt-twb-editor-header p { margin:4px 0 0; color:var(--yyt-text-secondary); font-size:12px; }
.yyt-twb-editor-body { overflow:auto; padding:18px; display:flex; flex-direction:column; gap:16px; }

.yyt-twb-ai-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
.yyt-twb-field-card-list { display:flex; flex-direction:column; gap:10px; }
.yyt-twb-field-card { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:10px; padding:12px; border:1px solid var(--yyt-border); border-radius:10px; background:var(--yyt-bg-secondary); }
.yyt-twb-field-card-main { display:grid; grid-template-columns:220px minmax(0,1fr); gap:10px; align-items:start; }
.yyt-twb-field-advanced { grid-column:1 / -1; border-top:1px dashed var(--yyt-border); padding-top:8px; }
.yyt-twb-field-advanced summary { cursor:pointer; color:var(--yyt-text-secondary); font-size:12px; font-weight:700; padding:6px 0; }
.yyt-twb-advanced-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; margin-top:10px; }

.yyt-twb-row-toolbar { display:flex; gap:8px; margin-bottom:12px; align-items:center; flex-wrap:wrap; }
.yyt-twb-row-toolbar .yyt-input { flex:1; min-width:180px; }
.yyt-twb-row-list { display:flex; flex-direction:column; gap:12px; }
.yyt-twb-row-card { border:1px solid var(--yyt-border); border-radius:10px; background:var(--yyt-bg-secondary); padding:14px; }
.yyt-twb-row-card.row-new { border-color:#48bb78; }
.yyt-twb-row-card.row-updated { border-color:#f6ad55; }
.yyt-twb-row-card.row-deleted { border-color:#f56565; opacity:0.72; }
.yyt-twb-row-card-header { display:flex; justify-content:space-between; gap:12px; margin-bottom:12px; align-items:flex-start; }
.yyt-twb-row-card-header > div:first-child { display:flex; align-items:center; gap:9px; min-width:0; flex:1; }
.yyt-twb-row-index { display:inline-flex; align-items:center; justify-content:center; height:28px; padding:0 9px; border:1px solid var(--yyt-border); border-radius:999px; background:var(--yyt-bg); color:var(--yyt-text-secondary); font-size:11px; font-weight:700; white-space:nowrap; }
.yyt-twb-row-name { max-width:280px; }
.yyt-twb-row-actions { display:flex; align-items:center; gap:8px; }
.yyt-twb-row-fields { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
.yyt-twb-span-2 { grid-column:span 2; }
.yyt-twb-diagnostics details { border:1px solid var(--yyt-border); border-radius:10px; background:var(--yyt-bg-secondary); overflow:hidden; }
.yyt-twb-diagnostics summary { cursor:pointer; padding:11px 12px; color:var(--yyt-text-secondary); font-size:12px; font-weight:700; }
.yyt-twb-diagnostic-grid { display:grid; grid-template-columns:minmax(220px,0.8fr) minmax(0,1.2fr); gap:12px; padding:0 12px 12px; }
.yyt-twb-diagnostic-body { padding:0 12px 12px; display:flex; flex-direction:column; gap:12px; }
.yyt-twb-diagnostic-grid h5,
.yyt-twb-diagnostic-body h5 { margin:0 0 8px; color:var(--yyt-text); font-size:12px; }
.yyt-twb-pre { margin:0; padding:10px; max-height:260px; overflow:auto; white-space:pre-wrap; word-break:break-word; border:1px solid var(--yyt-border); border-radius:10px; background:var(--yyt-bg); color:var(--yyt-text-secondary); font-family:'Fira Code','Consolas',monospace; font-size:11px; line-height:1.6; }

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
`;Ss={id:"tableWorkbenchPanel",currentTableIndex:0,editorOpen:!1,lastDiff:null,pendingTemplateApplyId:"",render({config:t}={}){let e=t&&typeof t=="object"?t:zt(),s=Array.isArray(e.tables)?e.tables:[];this.currentTableIndex=et(s,e.__activeTableIndex??this.currentTableIndex);let r=this.currentTableIndex;return`
      <div class="yyt-tool-panel yyt-twb" data-tool-id="tableWorkbench">
        ${Wp(e)}
        ${Vp(e)}
        ${of(e,r,this.editorOpen,this.lastDiff?.[r])}
      </div>`},bindEvents(t){let e=D();if(!e||!j(t))return;let s=this;t.off(".twb"),t.on("click.twb",'[data-twb-action="open-table-editor"]',function(r){r.stopPropagation();let o=Ue(t),a=Number(e(this).attr("data-twb-ti"));o.__activeTableIndex=a,s.currentTableIndex=et(o.tables,a),s.editorOpen=!0,s.renderTo(t,{config:o})}),t.on("click.twb",'[data-twb-action="close-table-editor"]',function(){let r=Ue(t);Ke(r),s.editorOpen=!1,s.renderTo(t,{config:r})}),t.on("click.twb","[data-twb-select]",function(){let r=Number(e(this).attr("data-twb-select")),o=Ue(t);o.__activeTableIndex=r,s.currentTableIndex=et(o.tables,r),s.renderTo(t,{config:o})}),t.on("click.twb",'[data-twb-action="add-table"]',function(r){r.stopPropagation();let o=Ue(t),a=Array.isArray(o.tables)?[...o.tables]:[];a.push({id:`table_${Date.now()}`,name:`\u8868\u683C ${a.length+1}`,note:"",enabled:!0,aiInstructions:{init:"",create:"",update:"",delete:""},columns:[{key:"col_1",title:"\u5C5E\u6027",type:"text",required:!1,description:""}],rows:[]}),o.tables=a,o.__activeTableIndex=a.length-1,Ke(o),s.currentTableIndex=a.length-1,s.editorOpen=!0,s.renderTo(t,{config:o})}),t.on("click.twb",'[data-twb-action="delete-table"]',function(r){r.stopPropagation();let o=Number(e(this).attr("data-twb-ti")),a=Ue(t),n=Array.isArray(a.tables)?[...a.tables]:[];if(o<0||o>=n.length)return;n.splice(o,1);let i=et(n,o>0?o-1:0);a.tables=n,a.__activeTableIndex=i,Ke(a),s.currentTableIndex=i,s.editorOpen=!1,s.renderTo(t,{config:a})}),t.on("click.twb",'[data-twb-action="save"]',()=>{let r=Ue(t),o=Ke(r);o.success?(w("success","\u5DF2\u4FDD\u5B58"),s.renderTo(t,{config:o.config})):le("warning",o.error||"\u4FDD\u5B58\u5931\u8D25",{duration:4e3,noticeId:"twb-save"})}),t.on("click.twb",'[data-twb-action="run"], [data-twb-action="run-selected"], [data-twb-action="run-table"]',async function(){let r=e(this).attr("data-twb-action"),o=Number(e(this).attr("data-twb-ti")),a=Ue(t);Number.isInteger(o)&&(a.__activeTableIndex=o);let n=Ke(a);if(!n.success){le("warning",n.error||"\u4FDD\u5B58\u5931\u8D25",{duration:4e3,noticeId:"twb-save"});return}r!=="run"&&le("warning","\u5F53\u524D\u6267\u884C\u94FE\u4ECD\u6309\u5B8C\u6574 tables \u4E0A\u4E0B\u6587\u8FD0\u884C\uFF1B\u5355\u8868/\u9009\u4E2D\u8868\u8303\u56F4\u5DF2\u4FDD\u7559\u4E3A UI \u5165\u53E3\u3002",{duration:3600,noticeId:"twb-run-scope"});try{e(this).prop("disabled",!0).text("\u586B\u8868\u4E2D...");let i=await fc();i?.success?i.warning?le("warning",`\u586B\u8868\u5B8C\u6210\uFF0C\u955C\u50CF\u5931\u8D25: ${i.warning}`,{duration:4200,noticeId:"twb-run"}):(s.lastDiff=i.diff||null,le("success",`\u586B\u8868\u5B8C\u6210 (${i.fillMode==="incremental"?"\u589E\u91CF":"\u5168\u91CF"})`,{duration:2800,noticeId:"twb-run"})):le("warning",i?.error||"\u586B\u8868\u5931\u8D25",{duration:4e3,noticeId:"twb-run"})}catch(i){w("error",i?.message||"\u586B\u8868\u5931\u8D25")}finally{s.renderTo(t)}}),t.on("click.twb",'[data-twb-action="add-row"]',()=>{let r=Ue(t),o=et(r.tables,s.currentTableIndex),a=Array.isArray(r.tables)?[...r.tables]:[];if(!a[o])return;let n={...a[o]};n.rows=Array.isArray(n.rows)?[...n.rows]:[];let i={};(n.columns||[]).forEach(l=>{i[l.key]=""}),n.rows.push({name:`\u884C${n.rows.length+1}`,cells:i}),a[o]=n,r.tables=a,r.__activeTableIndex=o,Ke(r),s.renderTo(t,{config:r})}),t.on("click.twb",'[data-twb-action="delete-row"]',function(){let r=Number(e(this).attr("data-twb-ri")),o=Ue(t),a=et(o.tables,s.currentTableIndex),n=Array.isArray(o.tables)?[...o.tables]:[];if(!n[a]||r<0||r>=(n[a].rows?.length||0))return;let i={...n[a]};i.rows=Array.isArray(i.rows)?[...i.rows]:[],i.rows.splice(r,1),n[a]=i,o.tables=n,o.__activeTableIndex=a,Ke(o),s.renderTo(t,{config:o})}),t.on("click.twb",'[data-twb-action="add-col"]',()=>{let r=Ue(t),o=et(r.tables,s.currentTableIndex),a=Array.isArray(r.tables)?[...r.tables]:[];if(!a[o])return;let n={...a[o]};n.columns=Array.isArray(n.columns)?[...n.columns]:[];let i=n.columns.length+1;n.columns.push({key:`col_${i}`,title:`\u5B57\u6BB5 ${i}`,type:"text",required:!1,description:""}),a[o]=n,r.tables=a,r.__activeTableIndex=o,Ke(r),s.renderTo(t,{config:r})}),t.on("click.twb",'[data-twb-action="delete-col"]',function(){let r=e(this).attr("data-twb-ci"),o=Ue(t),a=et(o.tables,s.currentTableIndex),n=Array.isArray(o.tables)?[...o.tables]:[];if(!n[a])return;let i={...n[a]};i.columns=Array.isArray(i.columns)?[...i.columns]:[],i.columns=i.columns.filter(l=>l.key!==r),i.rows=(i.rows||[]).map(l=>{let c={...l.cells||{}};return delete c[r],{...l,cells:c}}),n[a]=i,o.tables=n,o.__activeTableIndex=a,Ke(o),s.renderTo(t,{config:o})}),t.on("contextmenu.twb","[data-twb-row]",function(r){r.preventDefault();let o=Number(e(this).attr("data-twb-ri"));new Dr().show(r.clientX,r.clientY,{rowIndex:o,onAction(n){if(n==="insert-row-above"||n==="insert-row-below"){let i=n==="insert-row-above"?o:o+1,l=Ue(t),c=et(l.tables,s.currentTableIndex),d=Array.isArray(l.tables)?[...l.tables]:[];if(!d[c])return;let u={...d[c]};u.rows=Array.isArray(u.rows)?[...u.rows]:[];let y={};(u.columns||[]).forEach(p=>{y[p.key]=""}),u.rows.splice(Math.max(i,0),0,{name:`\u884C${u.rows.length+1}`,cells:y}),d[c]=u,l.tables=d,l.__activeTableIndex=c,Ke(l),s.renderTo(t,{config:l})}else n==="delete-row"&&t.find(`[data-twb-action="delete-row"][data-twb-ri="${o}"]`).trigger("click")}})}),t.on("click.twb","[data-twb-row-filter]",function(){let r=e(this).attr("data-twb-row-filter");t.find("[data-twb-row-filter]").removeClass("active"),e(this).addClass("active"),t.find("[data-twb-row]").each(function(){let o=r==="all"||e(this).hasClass(`row-${r}`);e(this).toggle(o)})}),t.on("input.twb","[data-twb-row-search]",function(){let r=String(e(this).val()||"").toLowerCase().trim();t.find("[data-twb-row]").each(function(){e(this).toggle(!r||e(this).text().toLowerCase().includes(r))})}),t.on("click.twb",'[data-twb-action="apply-template"]',function(){let r=Ue(t),o=_e(r.activeTemplate,""),a=sn().find(l=>l.id===o);if(!a){le("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u53EF\u5E94\u7528\u7684\u5185\u7F6E\u6A21\u677F\u3002",{duration:3e3,noticeId:"twb-template"});return}if(Array.isArray(r.tables)&&r.tables.length>0&&s.pendingTemplateApplyId!==o){s.pendingTemplateApplyId=o,le("warning","\u5E94\u7528\u6A21\u677F\u4F1A\u66FF\u6362\u5F53\u524D\u8868\u683C\u3002\u518D\u6B21\u70B9\u51FB\u201C\u5E94\u7528\u6A21\u677F\u201D\u786E\u8BA4\u3002",{duration:4200,noticeId:"twb-template"});return}r.tables=a.tables||[],r.activeTemplate=a.id,r.__activeTableIndex=0;let i=Ke(r);s.pendingTemplateApplyId="",s.currentTableIndex=0,s.editorOpen=!1,i.success?(le("success",`\u5DF2\u5E94\u7528\u6A21\u677F\uFF1A${a.name}`,{duration:2800,noticeId:"twb-template"}),s.renderTo(t,{config:i.config})):le("warning",i.error||"\u5E94\u7528\u6A21\u677F\u5931\u8D25",{duration:4e3,noticeId:"twb-template"})}),t.on("click.twb",'[data-twb-action="save-template"], [data-twb-action="import-template"], [data-twb-action="export-template"]',function(){le("warning","\u6A21\u677F\u5E93\u5165\u53E3\u5DF2\u9884\u7559\uFF0C\u5BFC\u5165\u5BFC\u51FA\u4F1A\u5728\u540E\u7EED\u6A21\u677F\u9636\u6BB5\u63A5\u5165\u3002",{duration:3e3,noticeId:"twb-template"})}),t.on("change.twb",'[data-twb-field="bypassEnabled"]',function(){t.find(".yyt-twb-bypass-preset").toggleClass("yyt-hidden",!e(this).is(":checked"))}),t.on("blur.twb change.twb","[data-twb-name], [data-twb-note], [data-twb-table-instruction], [data-twb-col] input, [data-twb-col] select, [data-twb-col] textarea, [data-twb-row] input, [data-twb-row] select, [data-twb-row] textarea, [data-twb-field]",function(){let r=Ue(t);Ke(r)})},destroy(t){!D()||!j(t)||(Dr.destroy(),t.off(".twb"))},getStyles(){return Op},renderTo(t,{config:e}={}){if(!D()||!j(t))return;let r=e&&typeof e=="object"?e:zt();this.currentTableIndex=et(r.tables,r.__activeTableIndex??this.currentTableIndex),t.html(this.render({config:r})),this.bindEvents(t)}}});function lf(t){switch(t){case Y.DEBUG:return"yyt-log-debug";case Y.INFO:return"yyt-log-info";case Y.WARN:return"yyt-log-warn";case Y.ERROR:return"yyt-log-error";default:return""}}function cf(t){let e=new Date(t),s=r=>String(r).padStart(2,"0");return`${s(e.getHours())}:${s(e.getMinutes())}:${s(e.getSeconds())}.${String(e.getMilliseconds()).padStart(3,"0")}`}var af,nf,Ts,dn=B(()=>{ae();ve();Ae();af="yyt-logger-panel",nf=[{level:null,label:"\u5168\u90E8",icon:"fa-list"},{level:Y.DEBUG,label:"DEBUG",icon:"fa-bug"},{level:Y.INFO,label:"INFO",icon:"fa-circle-info"},{level:Y.WARN,label:"WARN",icon:"fa-triangle-exclamation"},{level:Y.ERROR,label:"ERROR",icon:"fa-circle-exclamation"}];Ts={id:"loggerPanel",render(){let t=N.getStats();return`
      <div class="yyt-logger-panel" id="${af}">
        <div class="yyt-logger-toolbar">
          <div class="yyt-logger-filter-btns" data-yyt-log-filter-group>
            ${nf.map((e,s)=>`<button class="yyt-log-filter-btn ${s===0?"yyt-active":""}" data-level="${e.level??""}">
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
    `},bindEvents(t){let e=D();if(!e||!j(t))return;let s=this,r=null,o=!1,a=[],n=t.find("[data-yyt-log-list]"),i=t.find("[data-yyt-log-search]"),l=t.find("[data-yyt-log-autoscroll]"),c=t.find("[data-yyt-log-pause]");function d(p){if(!p.length){n.html('<div class="yyt-logger-empty">\u6682\u65E0\u5339\u914D\u7684\u65E5\u5FD7\u8BB0\u5F55</div>');return}n.html(p.map(f=>`
        <div class="yyt-log-entry ${lf(f.level)}" data-log-id="${f.id}">
          <span class="yyt-log-time">${cf(f.timestamp)}</span>
          <span class="yyt-log-level">${N.levelLabel(f.level)}</span>
          <span class="yyt-log-scope">${b(f.scope)}</span>
          <span class="yyt-log-msg">${b(f.message)}</span>
          ${f.data!==void 0?`<span class="yyt-log-data">${b(typeof f.data=="object"?JSON.stringify(f.data):String(f.data))}</span>`:""}
        </div>
      `).join(""))}function u(){let p=i.val()?.trim()||"",{entries:f}=N.getEntries({level:r,search:p||void 0,limit:500});d(f),l.is(":checked")&&requestAnimationFrame(()=>{n[0].scrollTop=n[0].scrollHeight})}function y(){if(o||!a.length)return;let p=a;a=[],u()}this._onLogEntry=p=>{if(o||r!==null&&p.level<r)return;let f=i.val()?.trim().toLowerCase()||"";if(f){let x=p.scope.toLowerCase().includes(f),v=p.message.toLowerCase().includes(f);if(!x&&!v)return}a.push(p),a.length>=50?y():this._flushTimer||(this._flushTimer=setTimeout(()=>{this._flushTimer=null,y(),s._updateStats(t)},250))},P.on("logger:entry",this._onLogEntry),t.on("click.yytLogger","[data-yyt-log-filter-group] .yyt-log-filter-btn",p=>{t.find("[data-yyt-log-filter-group] .yyt-log-filter-btn").removeClass("yyt-active"),e(p.currentTarget).addClass("yyt-active");let f=e(p.currentTarget).data("level");r=f===""?null:f,u(),s._updateStats(t)}),i.on("input.yytLogger",()=>{u()}),t.on("click.yytLogger","[data-yyt-log-pause]",()=>{o=!o,c.toggleClass("yyt-active",o),c.html(o?'<i class="fa-solid fa-play"></i> \u7EE7\u7EED':'<i class="fa-solid fa-pause"></i> \u6682\u505C'),o||(a=[],u(),s._updateStats(t))}),t.on("click.yytLogger","[data-yyt-log-clear]",()=>{N.clear(),n.html('<div class="yyt-logger-empty">\u65E5\u5FD7\u5DF2\u6E05\u9664</div>'),s._updateStats(t)}),t.on("click.yytLogger","[data-yyt-log-export]",()=>{let{entries:p}=N.getEntries({limit:1e4}),f=JSON.stringify(p.map(A=>({time:new Date(A.timestamp).toISOString(),level:N.levelLabel(A.level),scope:A.scope,message:A.message,data:A.data})),null,2),x=new Blob([f],{type:"application/json"}),v=URL.createObjectURL(x),_=document.createElement("a");_.href=v,_.download=`yyt-logs-${new Date().toISOString().replace(/[:.]/g,"-")}.json`,_.click(),URL.revokeObjectURL(v)}),u()},_updateStats(t){if(!D()||!j(t))return;let s=N.getStats(),r=t.find(".yyt-logger-stats");r.length&&r.html(`
      <span class="yyt-logger-stat">\u5171 <strong>${s.total}</strong> \u6761</span>
      ${["ERROR","WARN","INFO","DEBUG"].map(o=>`<span class="yyt-logger-stat yyt-log-${o.toLowerCase()}">${o}: <strong>${s.byLevel[o]||0}</strong></span>`).join("")}
    `)},destroy(t){let e=D();this._onLogEntry&&(P.off("logger:entry",this._onLogEntry),this._onLogEntry=null),this._flushTimer&&(clearTimeout(this._flushTimer),this._flushTimer=null),!(!e||!j(t))&&t.off(".yytLogger")},getStyles(){return`
      .yyt-logger-panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 10px;
      }

      .yyt-logger-toolbar {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        padding: 10px 12px;
        border-radius: var(--yyt-radius);
        background: rgba(255, 255, 255, 0.025);
        border: 1px solid var(--yyt-border-soft);
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
        border-radius: 8px;
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
        border-radius: var(--yyt-radius);
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid var(--yyt-border-soft);
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
        border-bottom: 1px solid rgba(255, 255, 255, 0.02);
        min-width: 0;
      }

      .yyt-log-entry:hover {
        background: rgba(255, 255, 255, 0.03);
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
        border-radius: 6px;
        background: rgba(0, 0, 0, 0.25);
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
    `}}});var _c={};be(_c,{ApiPresetPanel:()=>Pt,BypassPanel:()=>hs,EscapeTransformToolPanel:()=>ms,LoggerPanel:()=>Ts,MAIN_TAB_RENDERERS:()=>_n,PanelState:()=>Ms,PunctuationTransformToolPanel:()=>bs,RegexExtractPanel:()=>ss,SCRIPT_ID:()=>m,SUB_TAB_RENDERERS:()=>An,SettingsPanel:()=>_t,StatusBlockPanel:()=>fs,SummaryToolPanel:()=>ps,TableWorkbenchPanel:()=>Ss,ToolManagePanel:()=>ns,UIManager:()=>yr,YouyouReviewPanel:()=>gs,bindDialogEvents:()=>Rt,closeActiveCustomSelectDropdown:()=>je,closeCustomSelectDropdown:()=>dr,createDialogHtml:()=>$t,default:()=>df,destroyEnhancedCustomSelects:()=>xe,downloadJson:()=>ht,enhanceNativeSelects:()=>ke,escapeHtml:()=>b,fillFormWithConfig:()=>Vr,getAllStyles:()=>Tc,getFormApiConfig:()=>ur,getJQuery:()=>D,getTargetDocument:()=>Ct,initUI:()=>xc,isContainerValid:()=>j,normalizeCustomSelectOptions:()=>Gr,openCustomSelectDropdown:()=>ri,readFileContent:()=>vt,registerComponents:()=>Wo,renderApiPanel:()=>yn,renderBypassPanel:()=>xn,renderCustomSelectControl:()=>Yr,renderEscapeTransformToolPanel:()=>hn,renderLoggerPanel:()=>Tn,renderMainTab:()=>wc,renderPunctuationTransformToolPanel:()=>vn,renderRegexPanel:()=>pn,renderSettingsPanel:()=>wn,renderStatusBlockPanel:()=>mn,renderSubTabComponent:()=>Sc,renderSummaryToolPanel:()=>gn,renderTableWorkbenchPanel:()=>Sn,renderToolPanel:()=>fn,renderYouyouReviewPanel:()=>bn,repositionActiveCustomSelectDropdown:()=>fa,resetJQueryCache:()=>jd,showToast:()=>w,showTopNotice:()=>le,toggleCustomSelectDropdown:()=>qr,uiManager:()=>pe});function Wo(){pe.register(Pt.id,Pt),pe.register(ss.id,ss),pe.register(ns.id,ns),pe.register(ps.id,ps),pe.register(fs.id,fs),pe.register(gs.id,gs),pe.register(ms.id,ms),pe.register(bs.id,bs),pe.register(hs.id,hs),pe.register(_t.id,_t),pe.register(Ss.id,Ss),pe.register(Ts.id,Ts),vc.log("\u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function xc(t={}){let{autoInjectStyles:e=!0,targetDocument:s,...r}=t;pe.init(r),Wo(),e&&pe.injectStyles(s),vc.log("\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function un(){pe.getComponent(Pt.id)||Wo()}function tt(t,e,s={}){un(),pe.render(t,e,s)}function yn(t){tt(Pt.id,t)}function pn(t){tt(ss.id,t)}function fn(t){tt(ns.id,t)}function gn(t){tt(ps.id,t)}function mn(t){tt(fs.id,t)}function bn(t){tt(gs.id,t)}function hn(t){tt(ms.id,t)}function vn(t){tt(bs.id,t)}function xn(t){tt(hs.id,t)}function wn(t){tt(_t.id,t)}function Sn(t){tt(Ss.id,t)}function Tn(t){tt(Ts.id,t)}function wc(t,e){let s=_n[t];if(!s)return!1;un();try{s.render(e)}catch{e.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>${s.failMessage}</span></div>`)}return!0}function Sc(t,e){let s=An[t];if(!s)return null;un();try{s.render(e)}catch{e.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>${s.failMessage}</span></div>`)}return t}function Tc(){return pe.getAllStyles()}var vc,_n,An,df,Ac=B(()=>{ae();ga();ma();Ta();$a();Fa();Ha();qa();Ya();Va();Ja();Po();cn();dn();Ae();ga();ma();Ta();$a();Fa();Ha();qa();Ya();Va();Ja();Po();cn();dn();vc=N.createScope("UI");_n=Object.freeze({apiPresets:{render:t=>yn(t),failMessage:"API \u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},toolManage:{render:t=>fn(t),failMessage:"\u5DE5\u5177\u7BA1\u7406\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},regexExtract:{render:t=>pn(t),failMessage:"\u6B63\u5219\u63D0\u53D6\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},tableWorkbench:{render:t=>Sn(t),failMessage:"\u586B\u8868\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25"},bypass:{render:t=>xn(t),failMessage:"Ai\u6307\u4EE4\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},settings:{render:t=>wn(t),failMessage:"\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},logger:{render:t=>Tn(t),failMessage:"\u65E5\u5FD7\u9762\u677F\u52A0\u8F7D\u5931\u8D25"}}),An=Object.freeze({SummaryToolPanel:{render:t=>gn(t),failMessage:"\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},StatusBlockPanel:{render:t=>mn(t),failMessage:"\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25"},YouyouReviewPanel:{render:t=>bn(t),failMessage:"\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25"},EscapeTransformToolPanel:{render:t=>hn(t),failMessage:"\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},PunctuationTransformToolPanel:{render:t=>vn(t),failMessage:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"}});df={uiManager:pe,ApiPresetPanel:Pt,RegexExtractPanel:ss,ToolManagePanel:ns,SummaryToolPanel:ps,StatusBlockPanel:fs,YouyouReviewPanel:gs,EscapeTransformToolPanel:ms,PunctuationTransformToolPanel:bs,BypassPanel:hs,SettingsPanel:_t,TableWorkbenchPanel:Ss,LoggerPanel:Ts,registerComponents:Wo,initUI:xc,renderApiPanel:yn,renderRegexPanel:pn,renderToolPanel:fn,renderSummaryToolPanel:gn,renderStatusBlockPanel:mn,renderYouyouReviewPanel:bn,renderEscapeTransformToolPanel:hn,renderPunctuationTransformToolPanel:vn,renderBypassPanel:xn,renderSettingsPanel:wn,renderTableWorkbenchPanel:Sn,renderLoggerPanel:Tn,MAIN_TAB_RENDERERS:_n,SUB_TAB_RENDERERS:An,renderMainTab:wc,renderSubTabComponent:Sc,getAllStyles:Tc}});var Ic={};be(Ic,{WindowManager:()=>Ko,closeWindow:()=>gf,createWindow:()=>ff,windowManager:()=>Fe});function pf(){if(Fe.stylesInjected)return;Fe.stylesInjected=!0;let t=`
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
  `,e=document.createElement("style");e.id=yf+"_styles",e.textContent=t,(document.head||document.documentElement).appendChild(e)}function ff(t){let{id:e,title:s="\u7A97\u53E3",content:r="",width:o=900,height:a=700,modal:n=!1,resizable:i=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:d=!0,onClose:u,onReady:y}=t;pf();let p=window.jQuery||window.parent?.jQuery;if(!p)return uf.error("jQuery not available"),null;if(Fe.isOpen(e))return Fe.bringToFront(e),Fe.getWindow(e);let f=window.innerWidth||1200,x=window.innerHeight||800,v=f<=1100,_=null,A=!1;d&&(_=Fe.getState(e),_&&!v&&(A=!0));let S,z;A&&_.width&&_.height?(S=Math.max(400,Math.min(_.width,f-40)),z=Math.max(300,Math.min(_.height,x-40))):(S=Math.max(400,Math.min(o,f-40)),z=Math.max(300,Math.min(a,x-40)));let $=Math.max(20,Math.min((f-S)/2,f-S-20)),I=Math.max(20,Math.min((x-z)/2,x-z-20)),R=l&&!v,J=`
    <div class="yyt-window" id="${e}" style="left:${$}px; top:${I}px; width:${S}px; height:${z}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${mf(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${R?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
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
  `,V=null;n&&(V=p(`<div class="yyt-window-overlay" data-for="${e}"></div>`),p(document.body).append(V));let U=p(J);p(document.body).append(U),Fe.register(e,U),U.on("mousedown",()=>Fe.bringToFront(e));let Q=!1,$e={left:$,top:I,width:S,height:z},we=()=>{$e={left:parseInt(U.css("left")),top:parseInt(U.css("top")),width:U.width(),height:U.height()},U.addClass("maximized"),U.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),Q=!0},Re=()=>{U.removeClass("maximized"),U.css({left:$e.left+"px",top:$e.top+"px",width:$e.width+"px",height:$e.height+"px"}),U.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),Q=!1};U.find(".yyt-window-btn.maximize").on("click",()=>{Q?Re():we()}),(v&&l||A&&_.isMaximized&&l||c&&l)&&we(),U.find(".yyt-window-btn.close").on("click",()=>{if(d&&l){let ge={width:Q?$e.width:U.width(),height:Q?$e.height:U.height(),isMaximized:Q};Fe.saveState(e,ge)}u&&u(),V&&V.remove(),U.remove(),Fe.unregister(e),p(document).off(".yytWindowDrag"+e),p(document).off(".yytWindowResize"+e)}),V&&V.on("click",ge=>{ge.target,V[0]});let oe=!1,At,Wt,rt,Kt;if(U.find(".yyt-window-header").on("mousedown",ge=>{p(ge.target).closest(".yyt-window-controls").length||Q||(oe=!0,At=ge.clientX,Wt=ge.clientY,rt=parseInt(U.css("left")),Kt=parseInt(U.css("top")),p(document.body).css("user-select","none"))}),p(document).on("mousemove.yytWindowDrag"+e,ge=>{if(!oe)return;let ie=ge.clientX-At,ft=ge.clientY-Wt;U.css({left:Math.max(0,rt+ie)+"px",top:Math.max(0,Kt+ft)+"px"})}),p(document).on("mouseup.yytWindowDrag"+e,()=>{oe&&(oe=!1,p(document.body).css("user-select",""))}),i){let ge=!1,ie="",ft,ot,me,gt,Se,Qs;U.find(".yyt-window-resize-handle").on("mousedown",function(Et){Q||(ge=!0,ie="",p(this).hasClass("se")?ie="se":p(this).hasClass("e")?ie="e":p(this).hasClass("s")?ie="s":p(this).hasClass("w")?ie="w":p(this).hasClass("n")?ie="n":p(this).hasClass("nw")?ie="nw":p(this).hasClass("ne")?ie="ne":p(this).hasClass("sw")&&(ie="sw"),ft=Et.clientX,ot=Et.clientY,me=U.width(),gt=U.height(),Se=parseInt(U.css("left")),Qs=parseInt(U.css("top")),p(document.body).css("user-select","none"),Et.stopPropagation())}),p(document).on("mousemove.yytWindowResize"+e,Et=>{if(!ge)return;let Zs=Et.clientX-ft,Ft=Et.clientY-ot,_s=400,er=300,Ht=me,It=gt,qt=Se,Ur=Qs;if(ie.includes("e")&&(Ht=Math.max(_s,me+Zs)),ie.includes("s")&&(It=Math.max(er,gt+Ft)),ie.includes("w")){let Gt=me-Zs;Gt>=_s&&(Ht=Gt,qt=Se+Zs)}if(ie.includes("n")){let Gt=gt-Ft;Gt>=er&&(It=Gt,Ur=Qs+Ft)}U.css({width:Ht+"px",height:It+"px",left:qt+"px",top:Ur+"px"})}),p(document).on("mouseup.yytWindowResize"+e,()=>{ge&&(ge=!1,p(document.body).css("user-select",""))})}return U.on("remove",()=>{p(document).off(".yytWindowDrag"+e),p(document).off(".yytWindowResize"+e)}),y&&setTimeout(()=>y(U),50),U}function gf(t){let e=Fe.getWindow(t);if(e){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${t}"]`).remove(),s(document).off(".yytWindowDrag"+t),s(document).off(".yytWindowResize"+t)),e.remove(),Fe.unregister(t)}}function mf(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var uf,yf,Ec,Ko,Fe,Mc=B(()=>{He();ae();uf=N.createScope("WindowManager"),yf="youyou_toolkit_window_manager",Ec="window_states",Ko=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,s){this.topZIndex++,this.windows.set(e,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let s=this.windows.get(e);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,s)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,s){let r=this.loadStates();r[e]={...s,updatedAt:Date.now()},tr.set(Ec,r)}loadStates(){return tr.get(Ec)||{}}getState(e){return this.loadStates()[e]||null}},Fe=new Ko});var Oc={};be(Oc,{TX_PHASE:()=>st,ToolAutomationService:()=>Ho,Transaction:()=>Fo,default:()=>_f,toolAutomationService:()=>Pc});function ee(t){return t==null?"":String(t).trim()}function Mn(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function kc(){try{return Mn()?.SillyTavern||null}catch{return null}}function qo(t){try{return t?.getContext?.()||null}catch{return null}}function En(t,e){if(!t)return null;let s=typeof t?.on=="function"||typeof t?.addListener=="function",r=typeof t?.off=="function"||typeof t?.removeListener=="function";return!s||!r?null:{eventSource:t,source:e,capabilities:{on:typeof t?.on=="function",off:typeof t?.off=="function",addListener:typeof t?.addListener=="function",removeListener:typeof t?.removeListener=="function"}}}function hf(t){let e=Mn(),s=qo(t);return[En(t?.eventSource,"SillyTavern.eventSource"),En(e?.eventSource,"topWindow.eventSource"),En(s?.eventSource,"SillyTavern.getContext().eventSource")].filter(Boolean)[0]||{eventSource:null,source:"unavailable",capabilities:{on:!1,off:!1,addListener:!1,removeListener:!1}}}function vf(t){let e=qo(t);return t?.eventTypes||e?.eventTypes||Mn()?.event_types||{}}function Cc(t){let e=qo(t);return ee(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.chat_filename??t?.this_chid??"chat_default")||"chat_default"}function $c(t){let e=qo(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function Rc(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="user"||e==="system"?!1:e==="assistant"||e==="ai"||!e}function xf(t,e){let s=ee(e);if(!s)return null;let r=$c(t);for(let o=r.length-1;o>=0;o-=1){let a=r[o];if([a?.messageId,a?.message_id,a?.id,a?.mesid,a?.mid,a?.chat_index,o].map(i=>ee(i)).includes(s))return a||null}return null}function wf(t){let e=$c(t);if(!Array.isArray(e)||e.length===0)return null;let s=e.length-1,r=e[s]||null;if(!Rc(r))return null;let o=ee(r?.messageId??r?.message_id??r?.id??r?.mesid??r?.mid??r?.chat_index??s);return o?{messageId:o,swipeId:ee(r?.swipeId??r?.swipe_id??r?.swipe??r?.swipeIndex),message:r}:null}function In(t){if(!t)return"";let e=String(t).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function Sf(t){let e=String(t||"");if(e.length===0)return"0";let s=5381,r=Math.min(e.length,2e3);for(let o=0;o<r;o++)s=(s<<5)+s+e.charCodeAt(o)|0;return(s>>>0).toString(36)}function Tf(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${t}_${e}`}var bf,st,Fo,Ho,Pc,_f,Dc=B(()=>{Ar();ve();ae();Lt();Io();Ls();bf=N.createScope("ToolAutomation");st=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),Fo=class{constructor({chatId:e,messageId:s,swipeId:r,sourceEvent:o,generationKey:a}){this.traceId=Tf(),this.chatId=e||"",this.messageId=s||"",this.swipeId=r||"",this.sourceEvent=o||"",this.generationKey=a||"",this.phase=st.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,s={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,s),this}toSnapshot(){return{...this}}},Ho=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._completedGenerationKeys=new Map,this._cancelledGenerationKeys=new Map,this._slotQueues=new Map,this._activeTransactions=new Map,this._isProcessing=!1,this._currentChatId="",this._enabled=!1,this._enabledCheckedOnce=!1,this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""},this._initRetryTimer=null,this._messageReceivedThrottleUntil=0}setDebugMode(e){this.debugMode=e===!0}init(e={}){this.stop();let s=kc(),r=e.retryOnFailure!==!1,o=Number.isFinite(e.retryDelayMs)?e.retryDelayMs:1500,a=Number.isFinite(e.attempt)?e.attempt:1;if(this._hostBindingStatus.initAttempts=a,this._hostBindingStatus.lastInitAt=Date.now(),!s)return this._hostBindingStatus={...this._hostBindingStatus,initialized:!1,lastInitResult:"missing_api",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],lastError:"\u672A\u627E\u5230\u5BBF\u4E3B API (SillyTavern)",retryScheduled:!1,retryDelayMs:0},this._log("\u521D\u59CB\u5316\u5931\u8D25: \u672A\u627E\u5230\u5BBF\u4E3B API (SillyTavern)"),!1;this._currentChatId=Cc(s);let n=hf(s),i=n?.eventSource||null,l=vf(s),c=typeof i?.on=="function"?i.on.bind(i):typeof i?.addListener=="function"?i.addListener.bind(i):null,d=typeof i?.off=="function"?i.off.bind(i):typeof i?.removeListener=="function"?i.removeListener.bind(i):null,u=!!(l&&Object.keys(l).length>0);if(this._hostBindingStatus={...this._hostBindingStatus,source:n?.source||"unavailable",hasEventSource:!!i,hasEventTypes:u,eventBindings:[],lastError:"",retryScheduled:!1,retryDelayMs:0,initialized:!1,lastInitResult:"binding"},!c||!d){let f="\u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5";return this._hostBindingStatus={...this._hostBindingStatus,lastInitResult:"missing_event_source",lastError:f},this._log(`\u521D\u59CB\u5316\u5931\u8D25: ${f}`,{source:this._hostBindingStatus.source}),r&&this._scheduleInitRetry(o,a+1),!1}this._log("\u5BBF\u4E3B eventTypes \u6620\u5C04:",JSON.stringify(l,null,2));let y=(f,x)=>{if(!f||typeof x!="function")return;let v=f;c(v,x),this._hostBindingStatus.eventBindings=[...this._hostBindingStatus.eventBindings,`${v} -> ${In(v)}`],this._stopCallbacks.push(()=>{try{d(v,x)}catch(_){this._log("\u53D6\u6D88\u4E8B\u4EF6\u5931\u8D25",v,_)}}),this._log(`\u5DF2\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${v}" (\u5F52\u4E00\u5316: ${In(v)})`)},p=(f,...x)=>{let v=In(f),{messageId:_,swipeId:A}=this._extractIdentitiesFromArgs(x);if(this._log(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${f}" \u2192 "${v}"`,{messageId:_,swipeId:A,argCount:x.length}),!this._checkEnabled())return;if(v==="MESSAGE_RECEIVED"){let R=Date.now();if(R<this._messageReceivedThrottleUntil){this._log(`MESSAGE_RECEIVED \u5728\u8282\u6D41\u7A97\u53E3\u5185\uFF0C\u8DF3\u8FC7\uFF08\u5269\u4F59 ${this._messageReceivedThrottleUntil-R}ms\uFF09`);return}this._messageReceivedThrottleUntil=R+3e3}let S=null,z=_,$=A;if(z&&(S=xf(s,z)),!S){let R=wf(s);R?.messageId&&(S=R.message,z=R.messageId,$=R.swipeId||$)}if(!z||!S){this._log(`\u4E8B\u4EF6 "${v}" \u65E0 assistant \u76EE\u6807\uFF0C\u8DF3\u8FC7`);return}if(!Rc(S)){this._log(`\u4E8B\u4EF6 "${v}" \u547D\u4E2D\u975E assistant \u6D88\u606F\uFF0C\u8DF3\u8FC7`,{messageId:z});return}let I=String(S.content||S.mes||"").trim();if(!I||I.length<5){this._log(`\u4E8B\u4EF6 "${v}" \u6D88\u606F\u8FC7\u77ED\uFF08${I.length} \u5B57\u7B26\uFF09\uFF0C\u8DF3\u8FC7`);return}if(this._isProcessing){this._log(`\u4E8B\u4EF6 "${v}" \u6B63\u5728\u5904\u7406\u4E2D\uFF0C\u8DF3\u8FC7`);return}this._scheduleMessageProcessing(z,$,{settleMs:this._getSettleMs(),sourceEvent:v})};return y(l.MESSAGE_SENT||"message_sent",()=>{this._log("MESSAGE_SENT \u2192 \u6E05\u7406\u8C03\u5EA6\u961F\u5217"),this._pendingTimers.forEach(f=>clearTimeout(f)),this._pendingTimers.clear()}),y(l.MESSAGE_RECEIVED||"message_received",(...f)=>{p(l.MESSAGE_RECEIVED||"message_received",...f)}),y(l.GENERATION_ENDED||"generation_ended",(...f)=>{p(l.GENERATION_ENDED||"generation_ended",...f)}),y(l.CHAT_CHANGED||"chat_changed",()=>{this._resetForChatChange()}),y(l.MESSAGE_DELETED||"message_deleted",f=>{this._clearMessageState(ee(f))}),this._stopCallbacks.push(P.on(C.SETTINGS_UPDATED,()=>{let f=this._enabled;this._enabled=this._evaluateEnabled(),f!==this._enabled&&this._log(`\u81EA\u52A8\u5316\u72B6\u6001\u53D8\u66F4: ${f} \u2192 ${this._enabled}`)})),this._enabled=this._evaluateEnabled(),this._enabledCheckedOnce=!1,this._hostBindingStatus={...this._hostBindingStatus,initialized:!0,lastInitResult:"ready",retryScheduled:!1,retryDelayMs:0,lastError:""},this._log("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{enabled:this._enabled,chatId:this._currentChatId,source:this._hostBindingStatus.source}),!0}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(s){this._log("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",s)}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._completedGenerationKeys.clear(),this._cancelledGenerationKeys.clear(),this._cancelActiveTransactions("service_stopped"),this._activeTransactions.clear(),this._isProcessing=!1,this._enabled=!1,this._enabledCheckedOnce=!1,this._initRetryTimer&&(clearTimeout(this._initRetryTimer),this._initRetryTimer=null),this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""}}isEnabled(){return this._enabled}getRuntimeSnapshot(){return this._pruneCompletedKeys(),this._pruneCancelledKeys(),{currentChatId:this._currentChatId,enabled:this._enabled,isProcessing:this._isProcessing,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,completedGenerationKeyCount:this._completedGenerationKeys.size,cancelledGenerationKeyCount:this._cancelledGenerationKeys.size,activeTransactionCount:this._activeTransactions.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),hostBinding:{...this._hostBindingStatus,eventBindings:Array.isArray(this._hostBindingStatus?.eventBindings)?[...this._hostBindingStatus.eventBindings]:[]},settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let s=await vr({messageId:"",swipeId:"",runSource:"AUTO"}),r=ee(s?.sourceMessageId||s?.messageId);return r?this.processAssistantMessage(r,{force:e.force===!0,swipeId:ee(s?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:s=!1,swipeId:r="",sourceEvent:o="AUTO"}={}){let a=new Fo({chatId:this._currentChatId,messageId:e,swipeId:r,sourceEvent:o});try{if(!e)return this._skipTransaction(a,"missing_message_id");if(!this._checkEnabled()&&!s)return this._skipTransaction(a,"automation_disabled");a.transition(st.CONFIRMED);let n=await vr({messageId:e,swipeId:r,runSource:"AUTO"}),i=n?.targetAssistantMessage||null;if(!i||!n?.sourceMessageId)return this._skipTransaction(a,"assistant_message_not_found");let l=String(i.content||i.mes||"").trim();if(!l||l.length<5)return this._skipTransaction(a,"assistant_message_too_short");a.transition(st.CONTEXT_BUILT);let c=Sf(l),d=`${ee(n.sourceMessageId)}::${c}`;if(a.generationKey=d,!s&&this._hasCompletedGeneration(d))return this._skipTransaction(a,"duplicate_generation",{generationKey:d});if(!s&&this._isGenerationCancelled(d))return this._skipTransaction(a,"cancelled_generation",{generationKey:d});let u=ut.filterAutoPostResponseTools(hr());if(!u.length)return this._skipTransaction(a,"no_auto_tools",{tools:u});let y=`${ee(n.sourceMessageId)}::${ee(n.sourceSwipeId||r)}`;return a.slotKey=y,a.slotRevisionKey=n.slotRevisionKey||"",a.sourceMessageId=n.sourceMessageId||e,a.sourceSwipeId=n.sourceSwipeId||r||"",this._enqueueSlot(y,async()=>{if(this._hasCompletedGeneration(d)&&!s)return this._skipTransaction(a,"duplicate_generation_after_queue",{generationKey:d});if(this._isGenerationCancelled(d)&&!s)return this._skipTransaction(a,"cancelled_generation_after_queue",{generationKey:d});this._isProcessing=!0,a.transition(st.REQUEST_STARTED);let p=new AbortController;this._registerActiveTransaction(a,{controller:p,generationKey:d,slotKey:y,sourceMessageId:n.sourceMessageId||e,sourceSwipeId:n.sourceSwipeId||r||""});try{let f=[],x=!1;for(let S of u){let z={...n,signal:p.signal,isAutoRun:!0,abortMeta:{traceId:a.traceId,generationKey:d,slotKey:y,sourceMessageId:n.sourceMessageId||e,sourceSwipeId:n.sourceSwipeId||r||""},shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:a.traceId,generationKey:d}),input:{...n.input||{},lastAiMessage:n.lastAiMessage,assistantBaseText:n.assistantBaseText}},$=await ut.runToolPostResponse(S,z);f.push($),($?.writebackState||$?.output)&&(x=!0)}a.transition(st.REQUEST_FINISHED,{toolResults:f}),x&&(a.transition(st.WRITEBACK_STARTED),a.writebackState={messageId:n.sourceMessageId,swipeId:n.sourceSwipeId,hasOutput:!0}),this._markGenerationCompleted(d);let v=f.every(S=>S?.success!==!1),_=f.some(S=>S?.meta?.aborted===!0||S?.meta?.stale===!0||S?.error==="\u8BF7\u6C42\u5DF2\u53D6\u6D88");v&&a.transition(st.WRITEBACK_COMMITTED);let A=v?st.REFRESH_CONFIRMED:st.FAILED;return a.transition(A,{verdict:_?"aborted":v?"success":"partial_failure"}),this._recordTransaction(a),this._updateAutoRuntimeForResults(u,n,a,f),{success:v,traceId:a.traceId,generationKey:d,sourceEvent:o,messageId:n.sourceMessageId||e,phase:a.phase,results:f}}finally{this._unregisterActiveTransaction(a.traceId),this._isProcessing=!1}})}catch(n){return a.transition(st.FAILED,{error:n?.message||String(n)}),this._recordTransaction(a),this._unregisterActiveTransaction(a.traceId),this._isProcessing=!1,this._log("processAssistantMessage \u5F02\u5E38",n),{success:!1,traceId:a.traceId,error:a.error,phase:a.phase}}}_extractIdentitiesFromArgs(e){let s="",r="";for(let o of e)if(o!=null){if(typeof o=="number"&&Number.isFinite(o)&&!s){s=ee(o);continue}if(typeof o=="string"){let a=ee(o);!s&&/^\d+$/.test(a)&&(s=a);continue}typeof o=="object"&&(s||(s=ee(o.messageId??o.message_id??o.id??o.mesid??o.chat_index??o.message?.messageId??o.message?.message_id??o.message?.id??o.message?.mesid??o.message?.chat_index??o.data?.messageId??o.data?.message_id??o.data?.id??o.target?.messageId??o.target?.message_id??o.target?.id)),r||(r=ee(o.swipeId??o.swipe_id??o.swipe??o.swipeIndex??o.currentSwipe??o.message?.swipeId??o.message?.swipe_id??o.message?.swipe??o.data?.swipeId??o.data?.swipe_id??o.data?.swipe??o.target?.swipeId??o.target?.swipe_id??o.target?.swipe)))}return{messageId:s,swipeId:r}}_scheduleMessageProcessing(e,s="",r={}){let o=r.settleMs??this._getSettleMs(),a=`msg::${ee(e)}::${ee(s)}`,n=this._pendingTimers.get(a);n&&clearTimeout(n);let i=setTimeout(()=>{this._pendingTimers.delete(a),this.processAssistantMessage(e,{swipeId:s,sourceEvent:r.sourceEvent||"AUTO"}).catch(l=>{this._log("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:l})})},Math.max(0,o));this._pendingTimers.set(a,i),this._log("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:a,settleMs:o,sourceEvent:r.sourceEvent})}cancelAutomation(e={}){let s=e.reason||"manual_cancel",r=ee(e.messageId),o=ee(e.slotKey),a=ee(e.traceId),n=0;for(let[i,l]of this._pendingTimers){let c=r&&i.includes(`::${r}::`),d=o&&i.includes(o);(c||d||!r&&!o&&!a)&&(clearTimeout(l),this._pendingTimers.delete(i),n+=1)}return n+=this._cancelActiveTransactions(s,{messageId:r,slotKey:o,traceId:a}),{success:n>0,cancelledCount:n,reason:s}}_hasCompletedGeneration(e){if(!e)return!1;this._pruneCompletedKeys();let s=this._completedGenerationKeys.get(e);return s?Date.now()-s<this._getDedupeWindowMs():!1}_markGenerationCompleted(e){e&&(this._completedGenerationKeys.set(e,Date.now()),this._pruneCompletedKeys())}_markGenerationCancelled(e){e&&(this._cancelledGenerationKeys.set(e,Date.now()),this._pruneCancelledKeys())}_isGenerationCancelled(e){if(!e)return!1;this._pruneCancelledKeys();let s=this._cancelledGenerationKeys.get(e);return s?Date.now()-s<this._getDedupeWindowMs():!1}_pruneCompletedKeys(){let e=Date.now()-this._getDedupeWindowMs();for(let[s,r]of this._completedGenerationKeys)(!Number.isFinite(r)||r<e)&&this._completedGenerationKeys.delete(s)}_pruneCancelledKeys(){let e=Date.now()-this._getDedupeWindowMs();for(let[s,r]of this._cancelledGenerationKeys)(!Number.isFinite(r)||r<e)&&this._cancelledGenerationKeys.delete(s)}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),this._log(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,s,r={}){return e.transition(st.SKIPPED,{verdict:s,...r}),this._recordTransaction(e),Array.isArray(r?.tools)&&r.tools.length>0&&this._updateAutoRuntimeForSkip(r.tools,e,s,r),{success:!1,skipped:!0,reason:s,traceId:e.traceId,...r}}_enqueueSlot(e,s){let o=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(s).finally(()=>{this._slotQueues.get(e)===o&&this._slotQueues.delete(e)});return this._slotQueues.set(e,o),o}_registerActiveTransaction(e,s={}){e?.traceId&&this._activeTransactions.set(e.traceId,{traceId:e.traceId,generationKey:s.generationKey||e.generationKey||"",slotKey:s.slotKey||e.slotKey||"",sourceMessageId:s.sourceMessageId||e.sourceMessageId||"",sourceSwipeId:s.sourceSwipeId||e.sourceSwipeId||"",slotRevisionKey:s.slotRevisionKey||e.slotRevisionKey||"",assistantBaseFingerprint:s.assistantBaseFingerprint||"",assistantBaseText:s.assistantBaseText||"",controller:s.controller||null,cancelled:!1,cancelReason:""})}_unregisterActiveTransaction(e){e&&this._activeTransactions.delete(e)}_cancelActiveTransactions(e="manual_cancel",s={}){let r=ee(s.messageId),o=ee(s.slotKey),a=ee(s.traceId),n=0;for(let[i,l]of this._activeTransactions){let c=a&&i===a,d=r&&ee(l?.sourceMessageId)===r,u=o&&ee(l?.slotKey)===o;if(!(!c&&!d&&!u&&!(!a&&!r&&!o))){l.cancelled=!0,l.cancelReason=e,l?.generationKey&&this._markGenerationCancelled(l.generationKey);try{l?.controller?.abort?.()}catch{}n+=1}}return n}_shouldAbortAutoWriteback(e={}){let s=ee(e.traceId),r=ee(e.generationKey);if(s){let o=this._activeTransactions.get(s);if(!o||o.cancelled)return{aborted:!0,reason:"cancelled_before_host_commit"}}return r&&this._isGenerationCancelled(r)?{aborted:!0,reason:"cancelled_before_host_commit"}:!1}_updateAutoRuntimeForSkip(e,s,r,o={}){e.forEach(a=>{a?.id&&Dt(a.id,{lastAutoRunAt:Date.now(),lastAutoStatus:"skipped",lastAutoMessageId:s?.sourceMessageId||s?.messageId||"",lastAutoSwipeId:s?.sourceSwipeId||s?.swipeId||"",lastAutoRevisionKey:s?.slotRevisionKey||o?.slotRevisionKey||"",lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:!1,lastAutoSkipReason:r||""},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_updateAutoRuntimeForResults(e,s,r,o=[]){e.forEach((a,n)=>{if(!a?.id)return;let i=o[n]||{},l=i?.meta?.writebackDetails||{},c=i?.meta?.aborted===!0||i?.meta?.stale===!0?"aborted":i?.success===!1?"failed":"success",d=i?.meta?.aborted===!0?i?.meta?.abortReason||(i?.meta?.stale===!0?"stale_base_changed":"cancelled_before_host_commit"):"";Dt(a.id,{lastAutoRunAt:Date.now(),lastAutoStatus:c,lastAutoMessageId:s?.sourceMessageId||r?.sourceMessageId||r?.messageId||"",lastAutoSwipeId:s?.sourceSwipeId||r?.sourceSwipeId||r?.swipeId||"",lastAutoRevisionKey:s?.slotRevisionKey||r?.slotRevisionKey||"",lastAutoWritebackStatus:i?.meta?.writebackStatus||"",lastAutoRefreshConfirmed:!!l.refreshConfirmed,lastAutoSkipReason:d},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_resetForChatChange(){let e=kc(),s=Cc(e);this._log("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:s}),this._currentChatId=s,this._pendingTimers.forEach(r=>clearTimeout(r)),this._pendingTimers.clear(),this._slotQueues.clear(),this._completedGenerationKeys.clear(),this._cancelledGenerationKeys.clear(),this._cancelActiveTransactions("chat_changed"),this._activeTransactions.clear(),this._isProcessing=!1,this._messageReceivedThrottleUntil=0}_scheduleInitRetry(e,s){this._initRetryTimer&&clearTimeout(this._initRetryTimer),this._hostBindingStatus={...this._hostBindingStatus,retryScheduled:!0,retryDelayMs:e},this._initRetryTimer=setTimeout(()=>{this._initRetryTimer=null,this.init({retryOnFailure:!1,retryDelayMs:e,attempt:s})},Math.max(200,e))}_clearMessageState(e){if(e){for(let[s,r]of this._pendingTimers)(s.includes(`::${e}::`)||s.startsWith(`msg::${e}::`))&&(clearTimeout(r),this._pendingTimers.delete(s));for(let s of this._completedGenerationKeys.keys())s.startsWith(`${e}::`)&&this._completedGenerationKeys.delete(s)}}_evaluateEnabled(){return this._getAutomationSettings().enabled===!0}_checkEnabled(){if(this._enabled)return!0;if(!this._enabledCheckedOnce){this._enabledCheckedOnce=!0;let e=this._getAutomationSettings();this._log("\u26A0 \u81EA\u52A8\u5316\u672A\u542F\u7528\uFF0C\u9996\u6B21\u8BCA\u65AD:",{"automation.enabled":e.enabled,"\u5B8C\u6574 automation \u8BBE\u7F6E":e,\u63D0\u793A:"\u8BF7\u786E\u4FDD settings.automation.enabled === true"})}return!1}_getAutomationSettings(){let e=Je.getSettings()?.automation||{},s=Number.isFinite(e.settleMs)?e.settleMs:800;return{enabled:e.enabled===!0,settleMs:s,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(1200,s+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}_log(...e){bf.log(e[0],e.length>1?e.slice(1):void 0)}},Pc=new Ho,_f=Pc});var Of={};be(Of,{default:()=>Pf});ae();var Lc={};function Nc(t,e={}){let{constants:s,topLevelWindow:r,modules:o}=t,{SCRIPT_ID:a,SCRIPT_VERSION:n,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=s,c=null,d=!1,u=N.createScope("Bootstrap");function y(...$){u.log($.join(" "))}function p(...$){u.error($.join(" "))}async function f(){return c||(c=(async()=>{try{return o.storageModule=await Promise.resolve().then(()=>(Bn(),Nn)),o.apiConnectionModule=await Promise.resolve().then(()=>(nr(),Kn)),o.presetManagerModule=await Promise.resolve().then(()=>(cr(),Gn)),o.uiModule=await Promise.resolve().then(()=>(Ac(),_c)),o.regexExtractorModule=await Promise.resolve().then(()=>(no(),mi)),o.toolManagerModule=await Promise.resolve().then(()=>(mo(),_i)),o.toolExecutorModule=await Promise.resolve().then(()=>(za(),ja)),o.windowManagerModule=await Promise.resolve().then(()=>(Mc(),Ic)),o.toolRegistryModule=await Promise.resolve().then(()=>(Lt(),Ki)),o.settingsServiceModule=await Promise.resolve().then(()=>(Ar(),sl)),o.bypassManagerModule=await Promise.resolve().then(()=>(Bs(),tl)),o.variableResolverModule=await Promise.resolve().then(()=>(Ir(),nl)),o.contextInjectorModule=await Promise.resolve().then(()=>(ls(),ol)),o.toolPromptServiceModule=await Promise.resolve().then(()=>(Ao(),ll)),o.toolOutputServiceModule=await Promise.resolve().then(()=>(Io(),dl)),o.toolAutomationServiceModule=await Promise.resolve().then(()=>(Dc(),Oc)),o.toolOutputServiceModule?.toolOutputService&&o.apiConnectionModule&&o.toolOutputServiceModule.toolOutputService.setApiConnection(o.apiConnectionModule),!0}catch($){return c=null,p("\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:",$),p("\u5DF2\u52A0\u8F7D\u6A21\u5757:",Object.keys(o).filter(I=>o[I])),!1}})(),c)}function x(){return`
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
        --yyt-surface-2: rgba(255, 255, 255, 0.05);
        --yyt-surface-3: rgba(255, 255, 255, 0.075);
        --yyt-surface-hover: rgba(255, 255, 255, 0.08);
        --yyt-surface-active: rgba(255, 255, 255, 0.11);
        --yyt-border: rgba(255, 255, 255, 0.08);
        --yyt-border-soft: rgba(255, 255, 255, 0.05);
        --yyt-border-strong: rgba(255, 255, 255, 0.16);
        --yyt-text: rgba(255, 255, 255, 0.95);
        --yyt-text-secondary: rgba(255, 255, 255, 0.72);
        --yyt-text-muted: rgba(255, 255, 255, 0.5);
        --yyt-focus-ring: 0 0 0 3px rgba(123, 183, 255, 0.18);
        --yyt-radius: 14px;
        --yyt-radius-sm: 10px;
        --yyt-radius-lg: 18px;
        --yyt-radius-xl: 24px;
        --yyt-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);
        --yyt-shadow-soft: 0 10px 28px rgba(0, 0, 0, 0.18);
        --yyt-shadow-glow: 0 0 24px var(--yyt-accent-glow);
        --yyt-control-radius: 14px;
        --yyt-control-radius-sm: 11px;
        --yyt-control-bg: linear-gradient(180deg, #1d2737 0%, #151d2a 100%);
        --yyt-control-bg-hover: linear-gradient(180deg, #243247 0%, #1a2638 100%);
        --yyt-control-bg-active: linear-gradient(180deg, #2a3951 0%, #1d2b3f 100%);
        --yyt-control-bg-strong: linear-gradient(180deg, #243247 0%, #192435 100%);
        --yyt-control-bg-focus: linear-gradient(180deg, #243a57 0%, #1a2a3f 100%);
        --yyt-control-border: rgba(146, 173, 212, 0.24);
        --yyt-control-border-hover: rgba(146, 173, 212, 0.36);
        --yyt-control-border-focus: rgba(123, 183, 255, 0.72);
        --yyt-control-shadow: 0 12px 24px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.04);
        --yyt-control-shadow-hover: 0 16px 28px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.06);
        --yyt-control-shadow-focus: 0 18px 30px rgba(8, 14, 24, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.06);
        --yyt-control-shadow-active: 0 10px 20px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.04);
        --yyt-shell-sidebar-width: 248px;
        --yyt-shell-topbar-gap: 14px;
        --yyt-shell-gap: 12px;
        --yyt-panel-gap: 16px;
        --yyt-backdrop: rgba(5, 8, 12, 0.72);
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
        inset: 0;
        background: var(--yyt-backdrop);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
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
        width: min(1500px, calc(100vw - 12px));
        max-width: calc(100vw - 12px);
        height: min(1120px, calc(100vh - 12px));
        max-height: calc(100vh - 12px);
        background:
          radial-gradient(1200px 600px at 10% -10%, var(--yyt-bg-gradient-1), transparent 60%),
          radial-gradient(900px 500px at 100% 0%, var(--yyt-bg-gradient-2), transparent 55%),
          linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 22%),
          var(--yyt-bg-base);
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 22px;
        box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.05),
          0 28px 84px rgba(0, 0, 0, 0.58),
          0 0 80px rgba(123, 183, 255, 0.1);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
        color: var(--yyt-text);
        z-index: 10000;
      }

      /* \u5F39\u7A97\u5934\u90E8 */
      .yyt-popup-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 16px 22px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.055) 0%, rgba(255, 255, 255, 0.03) 100%);
        border-bottom: 1px solid var(--yyt-border);
        border-radius: 22px 22px 0 0;
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
        font-size: 14px;
        transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
      }

      .yyt-popup-close:hover {
        background: rgba(248, 113, 113, 0.14);
        border-color: rgba(248, 113, 113, 0.2);
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
        gap: var(--yyt-shell-gap);
      }

      .yyt-content-frame {
        flex: 1;
        min-height: 0;
        min-width: 0;
        overflow: hidden;
        padding: 5px;
        border-radius: var(--yyt-radius-xl);
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.018) 100%),
          rgba(255, 255, 255, 0.01);
        border: 1px solid rgba(255, 255, 255, 0.06);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
      }

      /* \u5F39\u7A97\u5E95\u90E8 */
      .yyt-popup-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        padding: 14px 20px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.02) 100%);
        border-top: 1px solid var(--yyt-border);
        border-radius: 0 0 22px 22px;
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
        gap: 10px;
        min-width: 0;
        flex-wrap: wrap;
      }

      .yyt-popup-status {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 12px;
        color: var(--yyt-text-secondary);
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .yyt-popup-status i {
        color: var(--yyt-accent);
      }

      .yyt-popup-footer-note {
        font-size: 12px;
        line-height: 1.6;
        color: var(--yyt-text-muted);
      }

      /* \u4E3B\u9876\u680F */
      .yyt-shell-topbar {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(260px, 320px);
        gap: var(--yyt-shell-topbar-gap);
        padding: 18px;
        border-radius: var(--yyt-radius-xl);
        border: 1px solid rgba(255, 255, 255, 0.08);
        background:
          radial-gradient(600px 240px at 0% 0%, rgba(123, 183, 255, 0.14), transparent 65%),
          linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
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
        font-weight: 800;
        letter-spacing: 0.42px;
        text-transform: uppercase;
      }

      .yyt-shell-heading-row {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }

      .yyt-shell-heading {
        font-size: 22px;
        font-weight: 800;
        line-height: 1.1;
        letter-spacing: 0.2px;
        color: var(--yyt-text);
      }

      .yyt-shell-heading-badge {
        display: inline-flex;
        align-items: center;
        padding: 5px 10px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 700;
        color: var(--yyt-text-secondary);
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .yyt-shell-overview-text {
        font-size: 12px;
        line-height: 1.65;
        color: var(--yyt-text-secondary);
        max-width: 72ch;
      }

      .yyt-shell-current-card {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
        padding: 14px 16px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.045);
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
      }

      .yyt-shell-current-label {
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.42px;
        text-transform: uppercase;
        color: var(--yyt-text-muted);
      }

      .yyt-shell-current-page {
        font-size: 14px;
        font-weight: 800;
        line-height: 1.35;
        color: var(--yyt-text);
        word-break: break-word;
      }

      .yyt-shell-current-desc {
        font-size: 11px;
        line-height: 1.5;
        color: var(--yyt-text-secondary);
      }

      .yyt-shell-stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(78px, 1fr));
        gap: 8px;
        align-self: stretch;
      }

      .yyt-shell-stat {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 6px;
        min-width: 78px;
        padding: 12px 12px 11px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.035);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .yyt-shell-stat-label {
        font-size: 10px;
        color: var(--yyt-text-muted);
        letter-spacing: 0.44px;
        text-transform: uppercase;
      }

      .yyt-shell-stat-value {
        font-size: 19px;
        font-weight: 800;
        line-height: 1;
        color: var(--yyt-text);
      }

      .yyt-shell-workspace {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: minmax(210px, var(--yyt-shell-sidebar-width)) minmax(0, 1fr);
        gap: var(--yyt-shell-gap);
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
        padding: 14px;
        border-radius: var(--yyt-radius-xl);
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
        font-weight: 800;
        color: var(--yyt-text);
      }

      .yyt-shell-sidebar-hint {
        font-size: 10px;
        color: var(--yyt-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.44px;
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
        padding: 11px 12px;
        border-radius: 16px;
        border: 1px dashed rgba(123, 183, 255, 0.18);
        background: rgba(123, 183, 255, 0.05);
        color: var(--yyt-text-secondary);
        font-size: 11px;
        line-height: 1.55;
      }

      .yyt-shell-main {
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .yyt-shell-main-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 14px;
        padding: 14px 16px;
        border-radius: var(--yyt-radius-xl);
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
        gap: 7px;
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
        font-weight: 800;
        color: var(--yyt-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .yyt-shell-breadcrumb {
        display: inline-flex;
        align-items: center;
        padding: 4px 10px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 700;
        color: var(--yyt-text-secondary);
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.08);
        max-width: 100%;
      }

      .yyt-shell-main-title {
        font-size: 20px;
        font-weight: 800;
        line-height: 1.12;
        color: var(--yyt-text);
      }

      .yyt-shell-main-description {
        font-size: 12px;
        line-height: 1.6;
        color: var(--yyt-text-secondary);
      }

      .yyt-shell-main-meta {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: var(--yyt-text-secondary);
        font-size: 12px;
        line-height: 1.5;
      }

      .yyt-shell-main-save-btn {
        white-space: nowrap;
        flex-shrink: 0;
      }

      .yyt-shell-main-meta i {
        color: var(--yyt-accent);
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
        min-width: 0;
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
        gap: 8px;
        min-height: 38px;
        padding: 10px 16px;
        border: 1px solid var(--yyt-border);
        border-radius: 13px;
        background: linear-gradient(180deg, var(--yyt-surface-3) 0%, var(--yyt-surface) 100%);
        color: var(--yyt-text);
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, background 0.18s ease, color 0.18s ease;
        position: relative;
        overflow: hidden;
        box-shadow: 0 10px 22px rgba(0, 0, 0, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      }

      .yyt-btn::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.04) 42%, transparent 78%);
        pointer-events: none;
      }

      .yyt-btn:hover {
        transform: translateY(-1px);
        border-color: var(--yyt-border-strong);
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      }

      .yyt-btn:focus-visible {
        outline: none;
        box-shadow: var(--yyt-focus-ring), 0 14px 28px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      }

      .yyt-btn-primary {
        background: linear-gradient(135deg, var(--yyt-accent) 0%, var(--yyt-accent-strong) 100%);
        color: var(--yyt-on-accent);
        border-color: rgba(255, 255, 255, 0.18);
        box-shadow: 0 14px 30px rgba(123, 183, 255, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.3);
      }

      .yyt-btn-primary:hover {
        box-shadow: 0 18px 34px rgba(123, 183, 255, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.34);
      }

      .yyt-btn-secondary {
        background: linear-gradient(180deg, var(--yyt-surface-active) 0%, var(--yyt-surface-2) 100%);
        color: var(--yyt-text);
        border-color: rgba(255, 255, 255, 0.12);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.07);
      }

      .yyt-btn-secondary:hover {
        background: linear-gradient(180deg, var(--yyt-surface-hover) 0%, var(--yyt-surface-active) 100%);
        border-color: var(--yyt-border-strong);
      }

      .yyt-btn-danger {
        background: linear-gradient(180deg, rgba(248, 113, 113, 0.22) 0%, rgba(248, 113, 113, 0.08) 100%);
        color: var(--yyt-error);
        border: 1px solid rgba(248, 113, 113, 0.34);
        box-shadow: 0 12px 24px rgba(248, 113, 113, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      }

      .yyt-btn-small {
        min-height: 32px;
        padding: 7px 12px;
        font-size: 12px;
        border-radius: 11px;
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
        min-height: 42px;
        padding: 11px 15px;
        border: 1px solid var(--yyt-control-border);
        border-radius: var(--yyt-control-radius);
        background: var(--yyt-control-bg);
        color: var(--yyt-text);
        font-size: 13px;
        box-shadow: var(--yyt-control-shadow);
      }

      .yyt-input:focus,
      .yyt-select:focus,
      .yyt-textarea:focus,
      .yyt-input:focus-visible,
      .yyt-select:focus-visible,
      .yyt-textarea:focus-visible {
        outline: none;
        border-color: var(--yyt-control-border-focus);
        background: var(--yyt-control-bg-focus);
        box-shadow: var(--yyt-focus-ring), var(--yyt-control-shadow-focus);
      }

      .yyt-input::placeholder,
      .yyt-textarea::placeholder {
        color: rgba(255, 255, 255, 0.42);
      }

      .yyt-custom-select {
        position: relative;
        isolation: isolate;
        flex: 1;
        min-width: 0;
      }

      .yyt-select-trigger,
      .yyt-select-dropdown,
      .yyt-select-option {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        background-image: none !important;
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
        background: #1b2535 !important;
        color: var(--yyt-text-muted);
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }

      .yyt-option-star:hover {
        color: var(--yyt-accent);
        background: #243249 !important;
        border-color: rgba(123, 183, 255, 0.18);
      }

      .yyt-option-delete:hover {
        color: #fca5a5;
        background: #3a2025 !important;
        border-color: rgba(239, 68, 68, 0.18);
      }

      .yyt-option-star.yyt-starred {
        color: #fbbf24;
        background: #3b3120 !important;
        border-color: rgba(251, 191, 36, 0.2);
      }

      .yyt-textarea {
        resize: vertical;
        min-height: 112px;
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

        .yyt-popup-footer-note {
          text-align: center;
        }
      }
    `}async function v(){let $=`${a}-styles`,I=r.document||document;if(I.getElementById($))return;let R="",J=[];try{J.push(new URL("../styles/main.css",Lc.url).href)}catch{}try{J.push(new URL("../../styles/main.css",Lc.url).href)}catch{}J.push("./styles/main.css");for(let U of[...new Set(J.filter(Boolean))])try{let Q=await fetch(U);if(Q.ok){R=await Q.text();break}}catch{}R||(y("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),R=x());let V=I.createElement("style");V.id=$,V.textContent=R,(I.head||I.documentElement).appendChild(V),y("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function _(){let $=r.document||document;if(o.uiModule?.getAllStyles){let I=`${a}-ui-styles`;if(!$.getElementById(I)){let R=$.createElement("style");R.id=I,R.textContent=o.uiModule.getAllStyles(),($.head||$.documentElement).appendChild(R)}}}async function A(){try{let{applyUiPreferences:$}=await Promise.resolve().then(()=>(Po(),Al));if(o.settingsServiceModule?.settingsService){let I=o.settingsServiceModule.settingsService.getUiSettings();if(I&&I.theme){let R=r.document||document;$(I,R),y(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${I.theme}`)}}}catch($){y("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",$)}}function S(){let $=r.jQuery||window.jQuery;if(!$){p("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(S,1e3);return}let I=r.document||document,R=$("#extensionsMenu",I);if(!R.length){y("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(S,2e3);return}if($(`#${l}`,R).length>0){y("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let V=$(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),U=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,Q=$(U);Q.on("click",function(we){we.stopPropagation(),y("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let Re=$("#extensionsMenuButton",I);Re.length&&R.is(":visible")&&Re.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),V.append(Q),R.append(V),y("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function z(){y(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${n}`),await v();let $=await f();if(y($?"\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F":"\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u53EF\u7528\u529F\u80FD"),!d&&o.uiModule?.initUI)try{o.uiModule.initUI({services:o,autoInjectStyles:!1,targetDocument:r.document||document}),d=!0,y("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(R){p("UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:",R)}if(o.uiModule&&(_(),await A()),o.toolAutomationServiceModule?.toolAutomationService){let R=o.toolAutomationServiceModule.toolAutomationService.init();y(R?"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316":"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u521D\u59CB\u5316\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u5BBF\u4E3B\u4E8B\u4EF6\u6E90\u91CD\u8BD5")}let I=r.document||document;I.readyState==="loading"?I.addEventListener("DOMContentLoaded",()=>{setTimeout(S,1e3)}):setTimeout(S,1e3),y("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:f,injectStyles:v,addMenuItem:S,init:z,log:y,logError:p}}ve();Ae();Ae();ae();var Xs=N.createScope("PromptEditor"),Af="youyou_toolkit_prompt_editor",Ef={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},If={system:"fa-server",ai:"fa-robot",user:"fa-user"},Nr=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],Go=class{constructor(e={}){this.containerId=e.containerId||Af,this.segments=e.segments||[...Nr],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){Xs.error("jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...Nr],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let s=Ef[e.type]||e.type,r=If[e.type]||"fa-file",o=e.mainSlot==="A"||e.isMain,a=e.mainSlot==="B"||e.isMain2,n=o?"var(--yyt-accent, #7bb7ff)":a?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${o?"yyt-main-a":""} ${a?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
           style="${n?`border-left: 3px solid ${n};`:""}">
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
    `}bindEvents(){this.$container&&(xe(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"),this.$container.on("click.yytPromptEditor",".yyt-prompt-toggle",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.on("click.yytPromptEditor",".yyt-prompt-delete",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.on("change.yytPromptEditor",".yyt-prompt-role",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),r=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{role:r})}),this.$container.on("change.yytPromptEditor",".yyt-prompt-main-slot",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),r=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:r})}),this.$container.on("input.yytPromptEditor",".yyt-prompt-textarea",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-add-segment`,()=>{this.addSegment()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-import-prompt`,()=>{this.importPrompt()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-export-prompt`,()=>{this.exportPrompt()}),ke(this.$container,{namespace:"yytPromptEditorSelect",selectors:[".yyt-prompt-role",".yyt-prompt-main-slot"]}))}addSegment(e=null){let s=`segment_${Date.now()}`,r=e||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};r.id||(r.id=s),this.segments.push(r),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let s=this.segments.findIndex(o=>o.id===e);if(s===-1)return;if(this.segments[s].deletable===!1){Xs.warn("\u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,s){let r=this.segments.find(o=>o.id===e);r&&(Object.assign(r,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=s=>{let r=s.target.files[0];if(!r)return;let o=new FileReader;o.onload=a=>{try{let n=JSON.parse(a.target.result);Array.isArray(n)?(this.setSegments(n),Xs.log("\u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):Xs.error("\u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(n){Xs.error("\u5BFC\u5165\u5931\u8D25:",n)}},o.readAsText(r)},e.click()}exportPrompt(){let e=this.getSegments(),s=JSON.stringify(e,null,2),r=new Blob([s],{type:"application/json"}),o=URL.createObjectURL(r),a=document.createElement("a");a.href=o,a.download=`prompt_group_${Date.now()}.json`,a.click(),URL.revokeObjectURL(o),Xs.log("\u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}destroy(){this.$container&&(xe(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"))}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};function Bc(){return`
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
  `}function Uc(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function jc(t){return Array.isArray(t)?t.map((e,s)=>({id:`segment_${s}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...Nr]}ae();function zc(t){let{constants:e,topLevelWindow:s,modules:r,caches:o,uiState:a}=t,{SCRIPT_ID:n,SCRIPT_VERSION:i,POPUP_ID:l}=e,c=N.createScope("PopupShell"),d={cleanup:null},u={cleanups:[]},y={cleanups:[]},p={current:null};function f(){return!!a.sidebarCollapsed}function x(){a.sidebarCollapsed=!a.sidebarCollapsed;let g=a.currentPopup;if(!g)return;let h=g.querySelector(".yyt-shell-sidebar"),T=g.querySelector(".yyt-shell-workspace"),E=g.querySelector(".yyt-sidebar-toggle i");h&&h.classList.toggle("yyt-collapsed",a.sidebarCollapsed),T&&T.classList.toggle("yyt-sidebar-collapsed",a.sidebarCollapsed),E&&(E.className=a.sidebarCollapsed?"fa-solid fa-angles-right":"fa-solid fa-angles-left"),Se()}function v(...g){c.log(g.join(" "))}function _(...g){c.error(g.join(" "))}function A(g){return typeof g!="string"?"":g.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function S(){return s.jQuery||window.jQuery}function z(){return s.document||document}function $(g){if(!g)return"\u672A\u9009\u62E9\u9875\u9762";let h=r.toolRegistryModule?.getToolConfig(g);if(!h)return g;if(!h.hasSubTabs)return h.name||g;let T=R(g),E=h.subTabs?.find(O=>O.id===T);return E?.name?`${h.name} / ${E.name}`:h.name||g}function I(g){if(!g)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let h=r.toolRegistryModule?.getToolConfig(g);if(!h)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!h.hasSubTabs)return h.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let T=R(g);return h.subTabs?.find(O=>O.id===T)?.description||h.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function R(g,h=""){let T=r.toolRegistryModule?.getToolConfig(g);if(!T?.hasSubTabs||!Array.isArray(T.subTabs)||T.subTabs.length===0)return"";let E=String(h||a.currentSubTab[g]||"").trim(),L=E&&T.subTabs.some(K=>K?.id===E)?E:T.subTabs[0]?.id||"";return L&&a.currentSubTab[g]!==L&&(a.currentSubTab[g]=L),L}function J(){let g=a.currentPopup;if(!g)return;let h=$(a.currentMainTab),T=I(a.currentMainTab),E=g.querySelector(".yyt-popup-active-label");E&&(E.textContent=`\u5F53\u524D\uFF1A${h}`);let O=g.querySelector(".yyt-shell-breadcrumb");O&&(O.textContent=h);let L=g.querySelector(".yyt-shell-main-title");L&&(L.textContent=h);let K=g.querySelector(".yyt-shell-main-description");K&&(K.textContent=T)}function V(){typeof d.cleanup=="function"&&(d.cleanup(),d.cleanup=null)}function U(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(g=>{typeof g=="function"&&g()}),u.cleanups=[])}function Q(){Array.isArray(y.cleanups)&&(y.cleanups.forEach(g=>{typeof g=="function"&&g()}),y.cleanups=[])}function $e(g,h){if(!g||!h)return!1;let T=g.jquery?g[0]:g,E=h.jquery?h[0]:h;return!!(T&&E&&T===E)}function we(g={}){let{container:h=null}=g,T=p.current;if(T&&!(h&&!$e(T.container,h))){try{typeof T.destroy=="function"&&T.destroy(T.container)}catch(E){_("\u9500\u6BC1\u52A8\u6001\u9762\u677F host \u5931\u8D25",E)}r.uiModule?.uiManager?.destroyContainerInstance&&r.uiModule.uiManager.destroyContainerInstance(T.container),p.current=null}}function Re(g,h={}){p.current={key:h.key||"",container:g,destroy:typeof h.destroy=="function"?h.destroy:null}}function oe(){let g=S();if(!g||!a.currentPopup)return;let h=r.toolRegistryModule?.getToolList()||[],T=g(a.currentPopup).find(".yyt-main-nav");if(!T.length)return;let E=h.map(L=>`
      <div class="yyt-main-nav-item ${L.id===a.currentMainTab?"active":""}" data-tab="${L.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${A(L.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${A(L.name||L.id)}</span>
          <span class="yyt-main-nav-desc">${A(L.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");T.html(E),g(a.currentPopup).find(".yyt-main-nav-item").on("click",function(){let K=g(this).data("tab");K&&_s(K)});let O=g(a.currentPopup).find(".yyt-shell-sidebar-hint");O.length&&O.text(`${h.length} tabs`)}function At(){let g=S();if(!g||!a.currentPopup)return;let h=r.toolRegistryModule?.getToolList()||[],T=r.toolRegistryModule?.getToolConfig("tools"),E=Array.isArray(T?.subTabs)?T.subTabs:[],O=E.filter(F=>F?.isCustom).length,L=E.filter(F=>!F?.isCustom).length,q=g(a.currentPopup).find(".yyt-shell-sidebar-stats");q.length&&(q.find(".yyt-shell-sidebar-stat").eq(0).find(".yyt-shell-sidebar-stat-value").text(String(h.length)),q.find(".yyt-shell-sidebar-stat").eq(1).find(".yyt-shell-sidebar-stat-value").text(String(L)),q.find(".yyt-shell-sidebar-stat").eq(2).find(".yyt-shell-sidebar-stat-value").text(String(O)))}function Wt(){let g=r.toolRegistryModule?.getToolList()||[];return g.length?(g.some(h=>h.id===a.currentMainTab)||(a.currentMainTab=g[0].id),a.currentMainTab):null}async function rt(g={}){let{rebuildNavigation:h=!1,reRenderSubNav:T=!1}=g,E=S();if(!E||!a.currentPopup)return;we();let O=Wt();if(!O)return;h&&(oe(),At());let L=r.toolRegistryModule?.getToolConfig(O),K=!!L?.hasSubTabs,q=E(a.currentPopup).find(".yyt-sub-nav"),F=E(a.currentPopup).find(".yyt-content");if(h&&F.length){let X=new Set(F.find(".yyt-tab-content").map((he,Pe)=>E(Pe).data("tab")).get());(r.toolRegistryModule?.getToolList()||[]).forEach(he=>{X.has(he.id)||F.append(`<div class="yyt-tab-content" data-tab="${A(he.id)}"></div>`)}),F.find(".yyt-tab-content").each((he,Pe)=>{let at=E(Pe).data("tab");(r.toolRegistryModule?.getToolList()||[]).some(nt=>nt.id===at)||E(Pe).remove()})}E(a.currentPopup).find(".yyt-main-nav-item").removeClass("active"),E(a.currentPopup).find(`.yyt-main-nav-item[data-tab="${O}"]`).addClass("active"),E(a.currentPopup).find(".yyt-tab-content").removeClass("active"),E(a.currentPopup).find(`.yyt-tab-content[data-tab="${O}"]`).addClass("active"),K?(q.show(),(T||h)&&Ht(O,L.subTabs)):q.hide(),await It(O),J(),Se()}function Kt(){if(!a.currentPopup)return;U();let g=()=>{if(a.currentMainTab==="apiPresets"){rt();return}a.currentMainTab==="tools"&&rt({reRenderSubNav:!0})},h=()=>{a.currentMainTab==="tools"?rt({rebuildNavigation:!0,reRenderSubNav:!0}):At()},T=()=>{a.currentMainTab==="tools"&&rt({rebuildNavigation:!1,reRenderSubNav:!1})},E=()=>{(a.currentMainTab==="bypass"||a.currentMainTab==="tools")&&rt({reRenderSubNav:a.currentMainTab==="tools"})};[C.PRESET_CREATED,C.PRESET_UPDATED,C.PRESET_DELETED].forEach(O=>{u.cleanups.push(P.on(O,g))}),[C.TOOL_REGISTERED,C.TOOL_UPDATED,C.TOOL_UNREGISTERED].forEach(O=>{u.cleanups.push(P.on(O,h))}),u.cleanups.push(P.on(C.TOOL_RUNTIME_UPDATED,T)),[C.BYPASS_PRESET_CREATED,C.BYPASS_PRESET_UPDATED,C.BYPASS_PRESET_DELETED].forEach(O=>{u.cleanups.push(P.on(O,E))})}function ge(g){return!!g?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown",".yyt-select-portal-layer"].join(","))}function ie(g){let h=g?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return h?h.scrollHeight>h.clientHeight+2||h.scrollWidth>h.clientWidth+2:!1}function ft(g,h){return h?.closest?.(".yyt-scrollable-surface")===g}function ot(g,h){if(!g||!h)return null;let T=h.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return T&&(T.classList?.contains("yyt-select-portal-layer")||g.contains(T))&&(T.scrollHeight>T.clientHeight+2||T.scrollWidth>T.clientWidth+2)?T:[h.closest?.(".yyt-tool-list"),h.closest?.(".yyt-settings-content"),h.closest?.(".yyt-sub-content"),h.closest?.(".yyt-tab-content.active"),g].filter(Boolean).find(O=>O!==g&&!g.contains(O)?!1:O.scrollHeight>O.clientHeight+2||O.scrollWidth>O.clientWidth+2)||g}function me({mainTab:g=null,includeSubContent:h=!1}={}){let T=a.currentPopup;if(!T)return;let E=T.querySelector(".yyt-content");E&&(E.scrollTop=0,E.scrollLeft=0);let O=g?`.yyt-tab-content[data-tab="${g}"]`:".yyt-tab-content.active",L=T.querySelector(O);if(L&&(L.scrollTop=0,L.scrollLeft=0),!h)return;(L?.querySelectorAll(".yyt-sub-content")||[]).forEach(q=>{q.scrollTop=0,q.scrollLeft=0})}function gt(g){let h=z();if(!g||!h)return;g.classList.add("yyt-scrollable-surface");let T=!1,E=!1,O=0,L=0,K=0,q=0,F=!1,X=!1,he=()=>{T=!1,E=!1,g.classList.remove("yyt-scroll-dragging")},Pe=G=>{G.button===0&&(ge(G.target)||ft(g,G.target)&&(F=g.scrollWidth>g.clientWidth+2,X=g.scrollHeight>g.clientHeight+2,!(!F&&!X)&&(G.stopPropagation(),T=!0,E=!1,O=G.clientX,L=G.clientY,K=g.scrollLeft,q=g.scrollTop)))},at=G=>{if(!T)return;let Yt=G.clientX-O,De=G.clientY-L;!(Math.abs(Yt)>4||Math.abs(De)>4)&&!E||(E=!0,g.classList.add("yyt-scroll-dragging"),F&&(g.scrollLeft=K-Yt),X&&(g.scrollTop=q-De),G.preventDefault())},nt=()=>{he()},Oe=G=>{if(G.ctrlKey||ie(G.target)||!g.classList.contains("yyt-content")&&!ft(g,G.target))return;let De=ot(g,G.target);!De||De!==g&&!g.contains(De)||!(De.scrollHeight>De.clientHeight+2||De.scrollWidth>De.clientWidth+2)||(Math.abs(G.deltaY)>0&&(De.scrollTop+=G.deltaY),Math.abs(G.deltaX)>0&&(De.scrollLeft+=G.deltaX),G.preventDefault(),G.stopPropagation())},Ee=G=>{E&&G.preventDefault()};g.addEventListener("mousedown",Pe),g.addEventListener("wheel",Oe,{passive:!1}),g.addEventListener("dragstart",Ee),h.addEventListener("mousemove",at),h.addEventListener("mouseup",nt),y.cleanups.push(()=>{he(),g.classList.remove("yyt-scrollable-surface"),g.removeEventListener("mousedown",Pe),g.removeEventListener("wheel",Oe),g.removeEventListener("dragstart",Ee),h.removeEventListener("mousemove",at),h.removeEventListener("mouseup",nt)})}function Se(){let g=a.currentPopup;if(!g)return;Q();let h=[...g.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...g.querySelectorAll(".yyt-sub-nav"),...g.querySelectorAll(".yyt-content"),...g.querySelectorAll(".yyt-settings-content"),...g.querySelectorAll(".yyt-tool-list")];[...new Set(h)].forEach(gt)}function Qs(g){return`
      <div class="yyt-startup-screen" data-yyt-startup-screen>
        <div class="yyt-startup-screen-inner">
          <div class="yyt-startup-screen-kicker">Welcome</div>
          <div class="yyt-startup-screen-title">YouYou \u5DE5\u5177\u7BB1</div>
          <div class="yyt-startup-screen-desc">\u96C6\u4E2D\u7BA1\u7406 API \u9884\u8BBE\u3001\u81EA\u5B9A\u4E49\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001Ai\u6307\u4EE4\u9884\u8BBE\u4E0E\u8BCA\u65AD\u6D41\u7A0B\u3002\u6BCF\u6B21\u5237\u65B0\u540E\u90FD\u4F1A\u91CD\u65B0\u663E\u793A\uFF0C\u4FBF\u4E8E\u5FEB\u901F\u56DE\u5230\u4ECB\u7ECD\u5165\u53E3\u3002</div>
          <div class="yyt-startup-screen-modules">
            ${(g||[]).slice(0,6).map(T=>`
      <div class="yyt-startup-module-chip">
        <i class="fa-solid ${A(T.icon||"fa-file")}"></i>
        <span>${A(T.name||T.id)}</span>
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
    `}function Et(g){let h=S();if(!h||!a.currentPopup||a.startupScreenDismissed)return;let T=h(a.currentPopup).find(".yyt-popup-body"),E=T.find(".yyt-popup-shell");!T.length||!E.length||T.find("[data-yyt-startup-screen]").length||(E.attr("data-yyt-startup-visible","true"),T.prepend(Qs(g)),T.find(".yyt-startup-enter").on("click",()=>{T.find("[data-yyt-startup-screen]").remove(),E.removeAttr("data-yyt-startup-visible"),a.startupScreenDismissed=!0,Se()}))}function Zs(){let g=z(),h=a.currentPopup,T=h?.querySelector(".yyt-popup-header");if(!h||!T||!g)return;let E=!1,O=0,L=0,K=0,q=0,F="",X=()=>({width:s.innerWidth||g.documentElement?.clientWidth||window.innerWidth||0,height:s.innerHeight||g.documentElement?.clientHeight||window.innerHeight||0}),he=(Ee,G,Yt)=>Math.min(Math.max(Ee,G),Yt),Pe=()=>{E&&(E=!1,h.classList.remove("yyt-popup-dragging"),g.body.style.userSelect=F)},at=Ee=>{if(!E||!a.currentPopup)return;let G=Ee.clientX-O,Yt=Ee.clientY-L,{width:De,height:Jo}=X(),Zc=h.offsetWidth||0,ed=h.offsetHeight||0,td=Math.max(0,De-Zc),sd=Math.max(0,Jo-ed);h.style.left=`${he(K+G,0,td)}px`,h.style.top=`${he(q+Yt,0,sd)}px`,h.style.transform="none",h.style.right="auto",h.style.bottom="auto"},nt=()=>{Pe()},Oe=Ee=>{if(Ee.button!==0||Ee.target?.closest(".yyt-popup-close"))return;E=!0,O=Ee.clientX,L=Ee.clientY;let G=h.getBoundingClientRect();K=G.left,q=G.top,h.style.left=`${G.left}px`,h.style.top=`${G.top}px`,h.style.transform="none",h.style.right="auto",h.style.bottom="auto",h.classList.add("yyt-popup-dragging"),F=g.body.style.userSelect||"",g.body.style.userSelect="none",Ee.preventDefault()};T.addEventListener("mousedown",Oe),g.addEventListener("mousemove",at),g.addEventListener("mouseup",nt),d.cleanup=()=>{Pe(),T.removeEventListener("mousedown",Oe),g.removeEventListener("mousemove",at),g.removeEventListener("mouseup",nt)}}function Ft(){we(),V(),U(),Q();let g=S();if(g&&a.currentPopup){let h=g(a.currentPopup);xe(h,"yytPopupToolConfigSelect"),xe(h,"yytPromptEditorSelect")}a.currentPopup&&(a.currentPopup.remove(),a.currentPopup=null),a.currentOverlay&&(a.currentOverlay.remove(),a.currentOverlay=null),v("\u5F39\u7A97\u5DF2\u5173\u95ED")}function _s(g){we(),a.currentMainTab=g;let h=S();if(!h||!a.currentPopup)return;me({mainTab:g,includeSubContent:!0}),h(a.currentPopup).find(".yyt-main-nav-item").removeClass("active"),h(a.currentPopup).find(`.yyt-main-nav-item[data-tab="${g}"]`).addClass("active");let T=r.toolRegistryModule?.getToolConfig(g);T?.hasSubTabs?(h(a.currentPopup).find(".yyt-sub-nav").show(),Ht(g,T.subTabs)):h(a.currentPopup).find(".yyt-sub-nav").hide(),h(a.currentPopup).find(".yyt-tab-content").removeClass("active"),h(a.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`).addClass("active"),It(g),J(),Se()}function er(g,h){we(),a.currentSubTab[g]=h;let T=S();!T||!a.currentPopup||(me({mainTab:g,includeSubContent:!0}),T(a.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),T(a.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${h}"]`).addClass("active"),qt(g,h),J(),Se())}function Ht(g,h){let T=S();if(!T||!a.currentPopup||!h)return;let E=R(g,a.currentSubTab[g]||h[0]?.id),L=(g==="tools"?[{key:"ai",title:"AI \u5DE5\u5177",items:h.filter(K=>(K?.toolKind||"ai")!=="script")},{key:"script",title:"\u811A\u672C\u5DE5\u5177",items:h.filter(K=>K?.toolKind==="script")}].filter(K=>K.items.length>0):[{key:"default",title:"",items:h}]).map(K=>{let q=K.title?`<div class="yyt-sub-nav-group-title">${A(K.title)}</div>`:"",F=K.items.map(X=>`
        <div class="yyt-sub-nav-item ${X.id===E?"active":""}" data-subtab="${X.id}">
          <i class="fa-solid ${X.icon||"fa-file"}"></i>
          <span>${A(X.name||X.id)}</span>
        </div>
      `).join("");return`
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${K.key}">
          ${q}
          <div class="yyt-sub-nav-group-items">
            ${F}
          </div>
        </div>
      `}).join("");T(a.currentPopup).find(".yyt-sub-nav").html(L),T(a.currentPopup).find(".yyt-sub-nav-item").on("click",function(){let q=T(this).data("subtab");er(g,q)}),Se()}async function It(g){let h=S();if(!h||!a.currentPopup)return;let T=h(a.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!T.length)return;let E=r.toolRegistryModule?.getToolConfig(g);if(g==="tools"){let L=R(g);E?.hasSubTabs&&L?await qt(g,L):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>'),Se();return}r.uiModule?.renderMainTab?.(g,T)||Gt(g,T),Se()}async function qt(g,h){let T=S();if(!T||!a.currentPopup)return;let E=T(a.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!E.length)return;let O=r.toolRegistryModule?.getToolConfig(g);if(O?.hasSubTabs){let K=R(g,h),q=O.subTabs?.find(Pe=>Pe.id===K),F=E.find(".yyt-sub-content");if(F.length||(E.html('<div class="yyt-sub-content"></div>'),F=E.find(".yyt-sub-content")),!q){F.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5F53\u524D\u5B50\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u5931\u6548</span></div>'),me({mainTab:g,includeSubContent:!0}),Se();return}let X=q.component;if(X==="GenericToolConfigPanel"){await Ur(q,F),me({mainTab:g,includeSubContent:!0}),Se();return}we({container:F});let he=r.uiModule?.renderSubTabComponent?.(X,F);he?Re(F,{key:he}):F.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>'),me({mainTab:g,includeSubContent:!0}),Se();return}let L=E.find(".yyt-sub-content");if(L.length){switch(we({container:L}),h){case"config":Fc(g,L);break;case"prompts":await Hc(g,L);break;case"presets":qc(g,L);break;default:L.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}me({mainTab:g,includeSubContent:!0}),Se()}}async function Ur(g,h){if(!(!S()||!h?.length||!g?.id)){we({container:h});try{let E=o.dynamicToolPanelCache.get(g.id);if(!E){let K=(await Promise.resolve().then(()=>(ys(),vl)))?.createToolConfigPanel;if(typeof K!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");E=()=>K({id:`${g.id}Panel`,toolId:g.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${g.name||g.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${g.id}-extraction-preview`,previewTitle:`${g.name||g.id} \u63D0\u53D6\u9884\u89C8`}),o.dynamicToolPanelCache.set(g.id,E)}let O=E();O.renderTo(h),Re(h,{key:g.id,destroy:typeof O?.destroy=="function"?L=>O.destroy(L):null}),Se()}catch(E){p.current=null,_("\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:",E),h.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}}function Gt(g,h){if(!S())return;let E=r.toolRegistryModule?.getToolConfig(g);if(!E){h.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let O=a.currentSubTab[g]||E.subTabs?.[0]?.id||"config";h.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${O}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),qt(g,O)}function Fc(g,h){if(!S())return;let E=r.toolManagerModule?.getTool(g),O=r.presetManagerModule?.getAllPresets()||[],L=r.toolRegistryModule?.getToolApiPreset(g)||"",K=O.map(q=>`<option value="${A(q.name)}" ${q.name===L?"selected":""}>${A(q.name)}</option>`).join("");h.html(`
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
              ${K}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${E?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${E?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),ke(h,{namespace:"yytPopupToolConfigSelect",selectors:["#yyt-tool-api-preset"]}),h.find("#yyt-save-tool-preset").on("click",function(){let F=h.find("#yyt-tool-api-preset").val();r.toolRegistryModule?.setToolApiPreset(g,F);let X=s.toastr;X&&X.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function Hc(g,h){if(!S()){h.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let O=r.toolManagerModule?.getTool(g)?.config?.messages||[],L=jc(O)||Nr,K=new Go({containerId:`yyt-prompt-editor-${g}`,segments:L,onChange:F=>{let X=Uc(F);v("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",X.length,"\u6761\u6D88\u606F")}});h.html(`<div id="yyt-prompt-editor-${g}" class="yyt-prompt-editor-container"></div>`),K.init(h.find(`#yyt-prompt-editor-${g}`));let q=Bc();if(q){let F="yyt-prompt-editor-styles",X=s.document||document;if(!X.getElementById(F)){let he=X.createElement("style");he.id=F,he.textContent=q,(X.head||X.documentElement).appendChild(he)}}}function qc(g,h){S()&&h.html(`
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
    `)}function Gc(){return`
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
      </div>`}function Yc(g,h,T){let E=f(),O=g.map(L=>`
      <div class="yyt-main-nav-item ${L.id===a.currentMainTab?"active":""}" data-tab="${L.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${A(L.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${A(L.name||L.id)}</span>
          <span class="yyt-main-nav-desc">${A(L.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");return`
      <aside class="yyt-shell-sidebar${E?" yyt-collapsed":""}">
        <div class="yyt-shell-sidebar-card">
          <div class="yyt-shell-sidebar-title-row">
            <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
            <span class="yyt-shell-sidebar-hint">${g.length} tabs</span>
            <button class="yyt-sidebar-toggle" title="${E?"\u5C55\u5F00\u4FA7\u680F":"\u6298\u53E0\u4FA7\u680F"}">
              <i class="fa-solid ${E?"fa-angles-right":"fa-angles-left"}"></i>
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
              <span class="yyt-shell-sidebar-stat-value">${g.length}</span>
              <span class="yyt-shell-sidebar-stat-label">\u4E3B\u9875\u9762</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${h}</span>
              <span class="yyt-shell-sidebar-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${T}</span>
              <span class="yyt-shell-sidebar-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
            </div>
          </div>
        </div>
      </aside>`}function Vc(g,h){return`
      <div class="yyt-shell-main-header">
        <div class="yyt-shell-main-heading-block">
          <div class="yyt-shell-main-title">${A(g)}</div>
          <div class="yyt-shell-main-description">${A(h)}</div>
        </div>
        <div class="yyt-shell-main-actions">
          <div class="yyt-shell-main-meta">
            <i class="fa-solid fa-circle-info"></i>
            <span>\u4FDD\u5B58\u540E\u6267\u884C\u94FE\u4F1A\u7ACB\u5373\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
          </div>
        </div>
      </div>`}function Jc(g,h){return g.map(T=>`
      <div class="yyt-tab-content ${T.id===h?"active":""}" data-tab="${T.id}">
      </div>
    `).join("")}function Xc(g){return`
      <div class="yyt-popup-footer">
        <div class="yyt-popup-footer-left">
          <div class="yyt-popup-status-cluster">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${A(g)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
            </div>
          </div>
        </div>
      </div>`}async function Qc(){if(a.currentPopup){v("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let g=t?.services?.loadModules;typeof g=="function"&&await g();let h=S(),T=z();if(!h){_("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let E=r.toolRegistryModule?.getToolList()||[];if(!E.length){_("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}E.some(Oe=>Oe.id===a.currentMainTab)||(a.currentMainTab=E[0].id);let O=r.toolRegistryModule?.getToolConfig("tools"),L=Array.isArray(O?.subTabs)?O.subTabs:[],K=L.filter(Oe=>Oe?.isCustom).length,q=L.filter(Oe=>!Oe?.isCustom).length,F=$(a.currentMainTab),X=I(a.currentMainTab);a.currentOverlay=T.createElement("div"),a.currentOverlay.className="yyt-popup-overlay",a.currentOverlay.addEventListener("click",Oe=>{Oe.target===a.currentOverlay&&Ft()}),T.body.appendChild(a.currentOverlay);let he=f(),Pe=`
      <div class="yyt-popup" id="${l}">
        ${Gc()}
        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-workspace${he?" yyt-sidebar-collapsed":""}">
              ${Yc(E,q,K)}
              <section class="yyt-shell-main">
                ${Vc(F,X)}
                <div class="yyt-sub-nav" style="display: none;"></div>
                <div class="yyt-content">
                  ${Jc(E,a.currentMainTab)}
                </div>
              </section>
            </div>
          </div>
        </div>
        ${Xc(F)}
      </div>
    `,at=T.createElement("div");at.innerHTML=Pe,a.currentPopup=at.firstElementChild,T.body.appendChild(a.currentPopup),h(a.currentPopup).find(".yyt-popup-close").on("click",Ft),h(a.currentPopup).find(".yyt-sidebar-toggle").on("click",x),Kt(),h(a.currentPopup).find(".yyt-main-nav-item").on("click",function(){let Ee=h(this).data("tab");Ee&&_s(Ee)}),Zs(),It(a.currentMainTab);let nt=r.toolRegistryModule?.getToolConfig(a.currentMainTab);nt?.hasSubTabs&&(h(a.currentPopup).find(".yyt-sub-nav").show(),Ht(a.currentMainTab,nt.subTabs)),J(),Et(E),Se(),v("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:Qc,closePopup:Ft,switchMainTab:_s,switchSubTab:er,renderTabContent:It,renderSubTabContent:qt}}function Wc(t,e={}){let{constants:s,modules:r}=t,{SCRIPT_ID:o,SCRIPT_VERSION:a}=s,{init:n,loadModules:i,addMenuItem:l,popupShell:c}=e;return{version:a,id:o,init:n,openPopup:c?.openPopup,closePopup:c?.closePopup,switchMainTab:c?.switchMainTab,switchSubTab:c?.switchSubTab,addMenuItem:l,getStorage:()=>r.storageModule,getApiConnection:()=>r.apiConnectionModule,getPresetManager:()=>r.presetManagerModule,getUi:()=>r.uiModule,getUiModule:()=>r.uiModule,getRegexExtractor:()=>r.regexExtractorModule,getToolManager:()=>r.toolManagerModule,getToolExecutor:()=>r.toolExecutorModule,getWindowManager:()=>r.windowManagerModule,getToolRegistry:()=>r.toolRegistryModule,getSettingsService:()=>r.settingsServiceModule,getBypassManager:()=>r.bypassManagerModule,getVariableResolver:()=>r.variableResolverModule,getContextInjector:()=>r.contextInjectorModule,getToolPromptService:()=>r.toolPromptServiceModule,getToolOutputService:()=>r.toolOutputServiceModule,getToolAutomationService:()=>r.toolAutomationServiceModule,async getApiConfig(){return await i(),r.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(d){return await i(),r.apiConnectionModule?(r.apiConnectionModule.updateApiConfig(d),!0):!1},async getPresets(){return await i(),r.presetManagerModule?r.presetManagerModule.getAllPresets():[]},async sendApiRequest(d,u){if(await i(),r.apiConnectionModule)return r.apiConnectionModule.sendApiRequest(d,u);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),r.apiConnectionModule?r.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(d,u){return r.toolRegistryModule?.registerTool(d,u)||!1},unregisterTool(d){return r.toolRegistryModule?.unregisterTool(d)||!1},getToolList(){return r.toolRegistryModule?.getToolList()||[]},createWindow(d){return r.windowManagerModule?.createWindow(d)||null},closeWindow(d){r.windowManagerModule?.closeWindow(d)},startAutomation(){return r.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){r.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return r.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},cancelAutomation(d={}){return r.toolAutomationServiceModule?.toolAutomationService?.cancelAutomation?.(d)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}},async processCurrentAssistantMessage(d={}){return r.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(d)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var Yo="youyou_toolkit",Mf="1.0.95",kf=`${Yo}-menu-item`,Cf=`${Yo}-menu-container`,$f=`${Yo}-popup`,Rf=typeof window.parent<"u"?window.parent:window,Vo={constants:{SCRIPT_ID:Yo,SCRIPT_VERSION:Mf,MENU_ITEM_ID:kf,MENU_CONTAINER_ID:Cf,POPUP_ID:$f},topLevelWindow:Rf,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"apiPresets",currentSubTab:{},startupScreenDismissed:!1}},Kc=zc(Vo),Br=Nc(Vo,{openPopup:Kc.openPopup});Vo.services.loadModules=Br.loadModules;var kn=Wc(Vo,{init:Br.init,loadModules:Br.loadModules,addMenuItem:Br.addMenuItem,popupShell:Kc});if(typeof window<"u"&&(window.YouYouToolkit=kn,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=kn}catch{}var Pf=kn;Br.init();Promise.resolve().then(()=>(ae(),$n)).then(({logger:t})=>{t.createScope("Bootstrap").log("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210")});return id(Of);})();
