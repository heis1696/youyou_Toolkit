var qg=Object.defineProperty;var P=(t,e)=>()=>(t&&(e=t(t=0)),e);var re=(t,e)=>{for(var r in e)qg(t,r,{get:e[r],enumerable:!0})};var $,Va,z,He=P(()=>{$={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_RUNTIME_UPDATED:"tool:runtimeUpdated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},Va=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,r,s={}){if(!e||typeof r!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:o=0}=s;this.listeners.has(e)||this.listeners.set(e,new Set);let n={callback:r,priority:o};return this.listeners.get(e).add(n),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,r)}off(e,r){let s=this.listeners.get(e);if(s){for(let o of s)if(o.callback===r){s.delete(o);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,r){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,r),this._addToHistory(e,r);let s=this.listeners.get(e);if(!s||s.size===0)return;let o=Array.from(s).sort((n,a)=>a.priority-n.priority);for(let{callback:n}of o)try{n(r)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,r){let s=o=>{this.off(e,s),r(o)};return this.on(e,s)}wait(e,r=0){return new Promise((s,o)=>{let n=null,a=this.once(e,i=>{n&&clearTimeout(n),s(i)});r>0&&(n=setTimeout(()=>{a(),o(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},r))})}hasListeners(e){let r=this.listeners.get(e);return r&&r.size>0}listenerCount(e){let r=this.listeners.get(e);return r?r.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,r){this.history.push({event:e,data:r,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(r=>r.event===e):[...this.history]}clearHistory(){this.history=[]}},z=new Va});var Fc={};re(Fc,{LOG_LEVEL:()=>le,LoggerService:()=>wn,default:()=>Vg,logger:()=>C});var le,jc,wn,C,Vg,G=P(()=>{He();le=Object.freeze({DEBUG:0,INFO:1,WARN:2,ERROR:3}),jc=Object.freeze({[le.DEBUG]:"DEBUG",[le.INFO]:"INFO",[le.WARN]:"WARN",[le.ERROR]:"ERROR"}),wn=class{constructor(){this._entries=[],this._maxSize=2e3,this._nextId=1,this._minLevel=le.INFO,this._eventKey="logger:entry",this._statsEventKey="logger:statsChanged",this._pendingFlush=!1}_write(e,r,s,o){let n={id:this._nextId++,timestamp:Date.now(),level:e,scope:r,message:s,data:o};this._entries.push(n),this._entries.length>this._maxSize&&this._entries.shift(),this._forwardToConsole(n),this._pendingFlush||(this._pendingFlush=!0,queueMicrotask(()=>{this._pendingFlush=!1,this._emitEntry(n)}))}_forwardToConsole(e){let r=`[${e.scope}]`;switch(e.level){case le.DEBUG:console.debug(r,e.message,e.data??"");break;case le.INFO:console.log(r,e.message,e.data??"");break;case le.WARN:console.warn(r,e.message,e.data??"");break;case le.ERROR:console.error(r,e.message,e.data??"");break}}_emitEntry(e){try{z?.emit(this._eventKey,e)}catch{}}debug(e,r,s){le.DEBUG<this._minLevel||this._write(le.DEBUG,e,r,s)}info(e,r,s){le.INFO<this._minLevel||this._write(le.INFO,e,r,s)}log(e,r,s){this.info(e,r,s)}warn(e,r,s){le.WARN<this._minLevel||this._write(le.WARN,e,r,s)}error(e,r,s){le.ERROR<this._minLevel||this._write(le.ERROR,e,r,s)}createScope(e){return{debug:(r,s)=>this.debug(e,r,s),info:(r,s)=>this.info(e,r,s),log:(r,s)=>this.log(e,r,s),warn:(r,s)=>this.warn(e,r,s),error:(r,s)=>this.error(e,r,s)}}getEntries(e={}){let{level:r,scope:s,search:o,limit:n=500,offset:a=0}=e,i=this._entries;if(r!=null&&(i=i.filter(d=>d.level>=r)),s&&(i=i.filter(d=>d.scope===s)),o){let d=o.toLowerCase();i=i.filter(c=>c.scope.toLowerCase().includes(d)||c.message.toLowerCase().includes(d))}let l=i.length;return i=i.slice(a,a+n),{entries:i,total:l}}getStats(){let e={total:this._entries.length,byLevel:{DEBUG:0,INFO:0,WARN:0,ERROR:0},byScope:{}};for(let r of this._entries){let s=jc[r.level]||"UNKNOWN";e.byLevel[s]=(e.byLevel[s]||0)+1,e.byScope[r.scope]=(e.byScope[r.scope]||0)+1}return e}setLevel(e){this._minLevel=e}getLevel(){return this._minLevel}setMaxSize(e){this._maxSize=Math.max(100,Math.min(1e4,e))}clear(){this._entries=[],this._nextId=1}levelLabel(e){return jc[e]||"UNKNOWN"}},C=new wn,Vg=C});var Hc={};re(Hc,{StorageService:()=>Vr,default:()=>Zg,getStorage:()=>Jg,loadSettings:()=>Xg,presetStorage:()=>we,saveSettings:()=>Qg,storage:()=>N,toolStorage:()=>me,windowStorage:()=>vn});function Jg(){let t=N;return t._getStorage(),t._storage}function Xg(){return N.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function Qg(t){N.set("settings",t)}var Ja,Vr,N,me,we,vn,Zg,$e=P(()=>{G();Ja=C.createScope("StorageService"),Vr=class t{constructor(e="youyou_toolkit"){this.namespaceKey=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext();if(r?.extensionSettings)return r.extensionSettings[this.namespaceKey]||(r.extensionSettings[this.namespaceKey]={}),this._storage={_target:r.extensionSettings[this.namespaceKey],getItem:s=>{let o=r.extensionSettings[this.namespaceKey][s];return typeof o=="string"?o:o?JSON.stringify(o):null},setItem:(s,o)=>{r.extensionSettings[this.namespaceKey][s]=o,this._saveSettings(r)},removeItem:s=>{delete r.extensionSettings[this.namespaceKey][s],this._saveSettings(r)},_isTavern:!0},this._storage}}catch{Ja.warn("SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage")}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,r)=>{try{localStorage.setItem(e,r)}catch(s){Ja.error("localStorage\u5199\u5165\u5931\u8D25:",s)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,r=null){let s=`${this.namespaceKey}:${e}`;if(this._cache.has(s))return this._cache.get(s);let o=this._getStorage(),n=this._getFullKey(e),a=o.getItem(n);if(a===null)return r;try{let i=JSON.parse(a);return this._cache.set(s,i),i}catch{return a}}set(e,r){let s=this._getStorage(),o=this._getFullKey(e),n=`${this.namespaceKey}:${e}`;this._cache.set(n,r);try{s.setItem(o,JSON.stringify(r))}catch(a){Ja.error("\u5B58\u50A8\u5931\u8D25:",a)}}remove(e){let r=this._getStorage(),s=this._getFullKey(e),o=`${this.namespaceKey}:${e}`;this._cache.delete(o),r.removeItem(s)}has(e){let r=this._getStorage(),s=this._getFullKey(e);return r.getItem(s)!==null}clear(){if(this._getStorage()._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let s=r.SillyTavern.getContext();s?.extensionSettings?.[this.namespaceKey]&&(s.extensionSettings[this.namespaceKey]={},this._saveSettings(s))}}else{let r=`${this.namespaceKey}_`,s=[];for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);n&&n.startsWith(r)&&s.push(n)}s.forEach(o=>localStorage.removeItem(o))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespaceKey}_${e}`}namespace(e){return new t(`${this.namespaceKey}:${e}`)}getMultiple(e){let r={};return e.forEach(s=>{r[s]=this.get(s)}),r}setMultiple(e){Object.entries(e).forEach(([r,s])=>{this.set(r,s)})}exportAll(){let e=this._getStorage(),r={};if(e._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let n=s.SillyTavern.getContext()?.extensionSettings?.[this.namespaceKey]||{};Object.entries(n).forEach(([a,i])=>{r[a]=typeof i=="string"?JSON.parse(i):i})}}else{let s=`${this.namespaceKey}_`;for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);if(n&&n.startsWith(s)){let a=n.slice(s.length);try{r[a]=JSON.parse(localStorage.getItem(n))}catch{r[a]=localStorage.getItem(n)}}}}return r}},N=new Vr("youyou_toolkit"),me=new Vr("youyou_toolkit:tools"),we=new Vr("youyou_toolkit:presets"),vn=new Vr("youyou_toolkit:windows");Zg=N});var Jc={};re(Jc,{API_STATUS:()=>am,fetchAvailableModels:()=>gm,getApiConfig:()=>Ps,getEffectiveApiConfig:()=>wo,hasEffectiveApiPreset:()=>vo,sendApiRequest:()=>To,sendWithPreset:()=>Za,testApiConnection:()=>fm,updateApiConfig:()=>lm,validateApiConfig:()=>Tn});function sm(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Qa(){return N.get(Yc,sm())}function om(t){N.set(Yc,t)}function Gc(){return N.get(tm,[])}function nm(){return N.get(rm,"")}function Xa(t,e={}){let r=new Error(t);return r.allowDirectFallback=e.allowDirectFallback===!0,r}function qc(t,e="chat_completions"){let r=String(t||"").trim();if(!r)return"";let s=null;try{s=new URL(r)}catch{return r}let o=s.pathname.replace(/\/+$/,""),n=o;return e==="chat_completions"?!/\/chat\/completions$/i.test(o)&&!/\/completions$/i.test(o)&&(n=`${o||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(o)?n=o.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(o)?n=o.replace(/\/completions$/i,"/models"):/\/models$/i.test(o)||(n=`${o||""}/models`)),s.pathname=n.replace(/\/+/g,"/"),s.toString()}function im(t){let e=String(t||"").trim();if(!e)return"";try{let r=new URL(e);return r.pathname=r.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",r.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function Ps(){return Qa().apiConfig||{}}function lm(t){let e=Qa();e.apiConfig={...e.apiConfig,...t},om(e)}function Tn(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function wo(t=""){let e=Qa(),r=t||nm()||"";if(r){let o=Gc().find(n=>n.name===r);if(o&&o.apiConfig)return{...o.apiConfig,presetName:o.name}}return e.apiConfig||{}}function vo(t=""){return t?Gc().some(r=>r?.name===t):!1}async function Za(t,e,r={},s=null){let o=wo(t);return await To(e,{...r,apiConfig:o},s)}function Vc(t,e={}){let r=e.apiConfig||Ps();return{messages:t,model:r.model||"gpt-3.5-turbo",max_tokens:r.max_tokens||4096,temperature:r.temperature??.7,top_p:r.top_p??.9,stream:r.stream??!1,...e.extraParams}}function ei(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function To(t,e={},r=null){let s=e.apiConfig||Ps(),o=s.useMainApi,n=Tn(s);if(!n.valid&&!o)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${n.errors.join(", ")}`);return o?await cm(t,e,r):await dm(t,s,e,r)}async function cm(t,e,r){let s=typeof window.parent<"u"?window.parent:window;if(!s.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let o=await s.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.apiConfig?.stream??Ps().stream??!1,...e.extraParams});if(typeof o!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return o.trim()}catch(o){throw o.name==="AbortError"?o:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${o.message}`)}}async function dm(t,e,r,s){let o=typeof window.parent<"u"?window.parent:window;if(o.TavernHelper?.generateRaw)try{return await um(t,e,r,s,o)}catch(n){let a=String(n?.message||n||"");if(n?.name==="AbortError"||s?.aborted||a.includes("\u505C\u6B62\u6309\u94AE")||a.includes("stop button")||a.includes("Clicked stop")||a==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")throw n;em.warn("TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",n)}if(o.SillyTavern?.getRequestHeaders)try{return await pm(t,e,r,s,o)}catch(n){if(!n?.allowDirectFallback)throw n}return await ym(t,e,r,s)}async function um(t,e,r,s,o){if(s?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let n=await o.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.stream??!1,max_chat_history:0,custom_api:{apiurl:im(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...r.extraParams||{}});return typeof n=="string"?n.trim():ei(n)}async function pm(t,e,r,s,o){let n=String(e.url||"").trim(),a={...Vc(t,{apiConfig:e,...r}),chat_completion_source:"custom",reverse_proxy:n,proxy_password:"",custom_url:n,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof o.SillyTavern?.getRequestHeaders=="function"?o.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(a),signal:s})}catch(u){throw u?.name==="AbortError"?u:Xa(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let d=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw Xa(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${d||"Unknown error"}`,{allowDirectFallback:u})}let c=null;try{c=d?JSON.parse(d):{}}catch{let p=String(d||"").replace(/\s+/g," ").trim().slice(0,120);throw Xa(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${p||"(\u7A7A\u54CD\u5E94)"}`)}return ei(c)}async function ym(t,e,r,s){let o=Vc(t,{apiConfig:e,...r}),n=qc(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(n,{method:"POST",headers:a,body:JSON.stringify(o),signal:s}),l=await i.text().catch(()=>"");if(!i.ok){let c=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${c}`)}let d=null;try{d=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return ei(d)}async function fm(t=null){let e=t||Ps(),r=Date.now();try{await To([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let o=Date.now()-r;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${o}ms)`,latency:o}}catch(s){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${s.message}`,latency:Date.now()-r}}}async function gm(t=null){let e=t||Ps();return e.useMainApi?await mm():await hm(e)}async function mm(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function hm(t){if(!t.url||!t.apiKey)return[];try{let e=qc(t.url,"models"),r=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!r.ok)return[];let s=await r.json();return s.data&&Array.isArray(s.data)?s.data.map(o=>o.id||o.name).filter(Boolean).sort():[]}catch{return[]}}var em,Yc,tm,rm,am,Sn=P(()=>{$e();G();em=C.createScope("ApiConnection"),Yc="settings",tm="api_presets",rm="current_preset";am={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var ed={};re(ed,{createPreset:()=>An,createPresetFromCurrentConfig:()=>_m,deletePreset:()=>Cn,duplicatePreset:()=>si,exportPresets:()=>ni,generateUniquePresetName:()=>Am,getActiveConfig:()=>Sm,getActivePresetName:()=>oi,getAllPresets:()=>Er,getPreset:()=>Xr,getPresetNames:()=>wm,getStarredPresets:()=>Tm,importPresets:()=>ai,presetExists:()=>So,renamePreset:()=>ri,switchToPreset:()=>kn,togglePresetStar:()=>vm,updatePreset:()=>ti,validatePreset:()=>Em});function xm(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Zc(){return N.get(bm,xm())}function lt(){return N.get(Xc,[])}function Jr(t){N.set(Xc,t)}function En(){return N.get(Qc,"")}function _n(t){N.set(Qc,t||"")}function Er(){return lt()}function wm(){return lt().map(e=>e.name)}function Xr(t){return!t||typeof t!="string"?null:lt().find(r=>r.name===t)||null}function So(t){return!t||typeof t!="string"?!1:lt().some(r=>r.name===t)}function An(t){let{name:e,description:r,apiConfig:s}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let o=e.trim();if(So(o))return{success:!1,message:`\u9884\u8BBE "${o}" \u5DF2\u5B58\u5728`};let n={name:o,description:r||"",apiConfig:{url:s?.url||"",apiKey:s?.apiKey||"",model:s?.model||"",useMainApi:s?.useMainApi??!0,stream:s?.stream??!1,max_tokens:s?.max_tokens||4096,temperature:s?.temperature??.7,top_p:s?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=lt();return a.push(n),Jr(a),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:n}}function ti(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=lt(),s=r.findIndex(a=>a.name===t);if(s===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let o=r[s],n={...o,...e,name:o.name,updatedAt:Date.now()};return e.apiConfig&&(n.apiConfig={...o.apiConfig,...e.apiConfig}),r[s]=n,Jr(r),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:n}}function Cn(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=lt(),r=e.findIndex(s=>s.name===t);return r===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(r,1),Jr(e),En()===t&&_n(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function ri(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(!So(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(So(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let s=lt(),o=s.find(n=>n.name===t);return o&&(o.name=r,o.updatedAt=Date.now(),Jr(s),En()===t&&_n(r)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${r}"`}}function si(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim(),s=Xr(t);if(!s)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(So(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(s)),name:r,createdAt:Date.now(),updatedAt:Date.now()},n=lt();return n.push(o),Jr(n),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${r}"`,preset:o}}function vm(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=lt(),r=e.find(s=>s.name===t);return r?(r.starred=!r.starred,r.updatedAt=Date.now(),Jr(e),{success:!0,message:r.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:r.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Tm(){return lt().filter(e=>e.starred===!0)}function kn(t){if(!t)return _n(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=Xr(t);return e?(_n(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function oi(){return En()}function Sm(){let t=En();if(t){let r=Xr(t);if(r)return{presetName:t,apiConfig:r.apiConfig}}return{presetName:"",apiConfig:Zc().apiConfig||{}}}function ni(t=null){if(t){let r=Xr(t);if(!r)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let e=lt();return JSON.stringify(e,null,2)}function ai(t,e={overwrite:!1}){let r;try{r=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let s=Array.isArray(r)?r:[r];if(s.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let o=lt(),n=0;for(let a of s){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let i=o.findIndex(l=>l.name===a.name);i>=0?e.overwrite&&(a.updatedAt=Date.now(),o[i]=a,n++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),o.push(a),n++)}return n>0&&Jr(o),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${n} \u4E2A\u9884\u8BBE`,imported:n}}function _m(t,e=""){let r=Zc();return An({name:t,description:e,apiConfig:r.apiConfig})}function Em(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function Am(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=lt(),r=new Set(e.map(o=>o.name));if(!r.has(t))return t;let s=1;for(;r.has(`${t} (${s})`);)s++;return`${t} (${s})`}var bm,Xc,Qc,_o=P(()=>{$e();bm="settings",Xc="api_presets",Qc="current_preset"});function or(){return typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function se(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function k(t,e,r=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let s=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(s.toastr){s.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:r,progressBar:!0});return}km(t,e,r),Cm.log(`[${t.toUpperCase()}] ${e}`)}function es(t,e,r={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:s=3500,sticky:o=!1,noticeId:n=""}=r,a=or();if(!a?.body){k(t,e,s);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",d=a.getElementById(i);if(d||(d=a.createElement("div"),d.id=i,d.style.cssText=`
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
    `,a.body.appendChild(d)),!a.getElementById(l)){let b=a.createElement("style");b.id=l,b.textContent=`
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
    `,a.head.appendChild(b)}if(n){let b=d.querySelector(`[data-notice-id="${n}"]`);b&&b.remove()}let c={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=a.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,n&&(u.dataset.noticeId=n);let p=a.createElement("span");p.className="yyt-top-notice__icon",p.textContent=c[t]||c.info;let y=a.createElement("div");y.className="yyt-top-notice__content",y.textContent=e;let f=a.createElement("button");f.className="yyt-top-notice__close",f.type="button",f.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),f.textContent="\xD7";let g=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};f.addEventListener("click",g),u.appendChild(p),u.appendChild(y),u.appendChild(f),d.appendChild(u),o||setTimeout(g,s)}function km(t,e,r){let s=or();if(!s)return;let o=s.getElementById("yyt-fallback-toast");o&&o.remove();let n={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=n[t]||n.info,i=s.createElement("div");if(i.id="yyt-fallback-toast",i.style.cssText=`
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
    `,s.head.appendChild(l)}s.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},r)}function X(){if(Qr)return Qr;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Qr=window.parent.jQuery,Qr}catch{}return window.jQuery&&(Qr=window.jQuery),Qr}function Im(){Qr=null}function ye(t){if(!t||t.length===0)return!1;let e=t[0];if(!e||e.nodeType!==1)return!1;let r=e.ownerDocument||document;return e.isConnected?r?.documentElement?.contains?r.documentElement.contains(e):!0:!1}function Ar(...t){return t.flat(1/0).flatMap(e=>String(e||"").split(/\s+/)).map(e=>e.trim()).filter(Boolean).join(" ")}function Ns(t={}){return Object.entries(t).filter(([,e])=>e!=null&&e!==!1).map(([e,r])=>r===!0?e:`${e}="${se(String(r))}"`).join(" ")}function od(t=[],e="",r=""){let s=String(e??""),o=t.find(n=>n.value===s)||t.find(n=>n.disabled!==!0)||null;return o||{value:s,label:r||s||"\u8BF7\u9009\u62E9",disabled:!1}}function Mm(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(e=>e&&e!=="yyt-select"&&e!=="yyt-native-select-bridge")}function td(t,e){let r=X();if(!r||!e?.length)return null;let s=e.attr("id")?`#${e.attr("id")}`:e.attr("data-yyt-select-key")?`[data-yyt-select-key="${e.attr("data-yyt-select-key")}"]`:"";if(!s)return null;let n=t.find("[data-yyt-custom-select]").filter((a,i)=>String(r(i).attr("data-yyt-select-target")||"")===s);return n.length?n.first():null}function nd(t){let e=t?.[0];return e?.ownerDocument?e.ownerDocument:typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function Rm(t){if(!X()||!ye(t))return null;let r=t.find("[data-yyt-custom-select]");return r.length?r:null}function ad(t,e){if(!X()||!e?.length)return null;let s=e.find("[data-yyt-select-native]").first();if(s.length)return s;let o=String(e.attr("data-yyt-select-target")||"").trim();if(!o)return null;let n=t.find(o).first();return n.length?n:null}function id(t=null){return t?.jquery&&t[0]?.ownerDocument?t[0].ownerDocument:t?.ownerDocument?t.ownerDocument:t?.nodeType===9?t:or()}function Gt(t=null){let e=id(t),r=rd.get(e);return r||(r={targetDoc:e,layer:null,activeRoot:null,activeDropdown:null,placeholder:null,cleanup:null},rd.set(e,r)),r}function Pm(t=null){let e=id(t);if(!e?.body)return null;let r=Gt(e);if(r.layer&&r.layer.isConnected)return r.layer;let s=e.getElementById(sd);return s||(s=e.createElement("div"),s.id=sd,s.className="yyt-select-portal-layer",e.body.appendChild(s)),r.layer=s,s}function In(t){if(!X()||!t?.length)return null;let r=t.find("[data-yyt-select-trigger]").first();return r.length?r:t.find(".yyt-select-trigger").first()}function ld(t){let e=X();if(!e||!t?.length)return null;let r=Gt(t);if(r.activeRoot===t[0]&&r.activeDropdown)return e(r.activeDropdown);let s=t.find("[data-yyt-select-dropdown]").first();return s.length?s:t.find(".yyt-select-dropdown").first()}function Nm(t){t&&(t.classList.remove("yyt-floating-open"),t.removeAttribute("data-yyt-floating"),t.removeAttribute("data-yyt-floating-placement"),t.style.position="",t.style.top="",t.style.left="",t.style.right="",t.style.width="",t.style.minWidth="",t.style.maxWidth="",t.style.maxHeight="",t.style.visibility="",t.style.zIndex="")}function cd(t,e=null){if(!t)return!1;let r=Gt(e||t);return r.activeRoot?.contains?.(t)||r.activeDropdown?.contains?.(t)?!0:!!t.closest?.("[data-yyt-custom-select], .yyt-select-portal-layer")}function Dm(t){if(!t?.targetDoc||typeof t.cleanup=="function")return;let e=t.targetDoc,r=e.defaultView||window,s=i=>{!t.activeRoot||!t.activeDropdown||cd(i.target,e)||Yt(e)},o=i=>{if(i.key!=="Escape")return;let l=t.activeRoot;Yt(e);let d=X();d&&l&&In(d(l))?.trigger("focus")},n=()=>{di(e)},a=()=>{di(e)};e.addEventListener("mousedown",s,!0),e.addEventListener("keydown",o,!0),r.addEventListener("resize",n),e.addEventListener("scroll",a,!0),t.cleanup=()=>{e.removeEventListener("mousedown",s,!0),e.removeEventListener("keydown",o,!0),r.removeEventListener("resize",n),e.removeEventListener("scroll",a,!0)}}function Lm(t){typeof t?.cleanup=="function"&&t.cleanup(),t&&(t.cleanup=null)}function ci(t){let e=X();if(!e||!t?.activeRoot||!t?.activeDropdown)return;let r=t.targetDoc;if(!r?.body?.contains?.(t.activeRoot)){Yt(r);return}let s=e(t.activeRoot),o=In(s),n=t.activeDropdown,a=r?.defaultView||window;if(!o?.length||!n?.isConnected||!s[0]?.isConnected){Yt(r);return}let i=o[0].getBoundingClientRect(),l=a.innerWidth||r.documentElement?.clientWidth||0,d=a.innerHeight||r.documentElement?.clientHeight||0,c=12,u=8,p=Math.max(0,d-i.bottom-c-u),y=Math.max(0,i.top-c-u),f=p<220&&y>p,b=Math.max(120,Math.floor((f?y:p)||0));n.setAttribute("data-yyt-floating","true"),n.setAttribute("data-yyt-floating-placement",f?"top":"bottom"),n.classList.add("yyt-floating-open");let v=Math.ceil(i.width),T=Math.max(v,Math.floor(l-c*2)),w=n.style.width,B=n.style.minWidth,R=n.style.maxWidth,S=n.style.visibility;n.style.width="max-content",n.style.minWidth=`${v}px`,n.style.maxWidth=`${T}px`,n.style.visibility="hidden";let _=Math.ceil(n.scrollWidth||n.getBoundingClientRect().width||v),F=Math.max(v,Math.min(T,_)),W=Math.min(n.scrollHeight||b,b);n.style.width=w,n.style.minWidth=B,n.style.maxWidth=R,n.style.visibility=S;let D=Math.round(i.left);D+F>l-c&&(D=Math.max(c,Math.round(l-c-F))),D=Math.max(c,D);let A=Math.round(f?i.top-u-W:i.bottom+u);A=Math.max(c,Math.min(A,Math.round(d-c-W))),n.style.position="fixed",n.style.top=`${A}px`,n.style.left=`${D}px`,n.style.right="auto",n.style.width=`${F}px`,n.style.minWidth=`${v}px`,n.style.maxWidth=`${T}px`,n.style.maxHeight=`${Math.floor(b)}px`,n.style.visibility="",n.style.zIndex="10050"}function Yt(t=null){let e=X(),r=Gt(t);if(!e||!r?.activeRoot)return;let s=r.activeRoot,o=r.activeDropdown,n=r.placeholder,a=e(s),i=In(a);o&&(Nm(o),n?.parentNode?n.parentNode.insertBefore(o,n):s?.isConnected?s.appendChild(o):o.remove()),n?.parentNode?.removeChild(n),a.removeClass("yyt-open"),i?.attr("aria-expanded","false"),r.activeRoot=null,r.activeDropdown=null,r.placeholder=null,Lm(r)}function di(t=null){let e=Gt(t);!e?.activeRoot||!e?.activeDropdown||ci(e)}function dd(t){if(!X()||!t?.length)return;let r=t.first(),s=In(r),o=ld(r);if(!s?.length||!o?.length||s.prop("disabled"))return;let n=Gt(r);if(n.activeRoot===r[0]){ci(n);return}Yt(r);let a=Pm(r);if(!a)return;let i=o[0],l=n.targetDoc.createComment("yyt-select-dropdown-placeholder");i.parentNode?.insertBefore(l,i),a.appendChild(i),n.activeRoot=r[0],n.activeDropdown=i,n.placeholder=l,r.addClass("yyt-open"),s.attr("aria-expanded","true"),Dm(n),ci(n)}function $m(t,e){let r=X();if(!r||!e?.length)return null;let s=e.closest("[data-yyt-custom-select]");if(s.length)return s.first();let o=Gt(e);if(o.activeRoot&&o.activeDropdown?.contains?.(e[0])){let n=r(o.activeRoot);return t.has(o.activeRoot).length?n:null}return null}function ui(t){let e=Gt(t);t?.length&&e.activeRoot&&e.activeRoot!==t[0]||Yt(t)}function ud(t){let e=Gt(t);if(t?.length&&e.activeRoot===t[0]){Yt(t);return}dd(t)}function ii(t,e,r=null){let s=X();if(!s||!e?.length)return;let o=r||ad(t,e);if(!o?.length)return;let n=Array.isArray(o.data("yytCustomSelectOptions"))?o.data("yytCustomSelectOptions"):[],a=od(n,o.val(),e.attr("data-yyt-select-placeholder")||""),i=String(a.value??""),l=String(a.label??""),d=o.is(":disabled");e.find(".yyt-select-value").text(l).attr("data-value",i).data("value",i);let c=ld(e);(c?.length?c.find("[data-yyt-select-option]"):e.find("[data-yyt-select-option]")).each((y,f)=>{let g=s(f),b=String(g.attr("data-value")||"")===i;g.toggleClass("yyt-selected",b).attr("aria-selected",String(b))});let p=e.find("[data-yyt-select-trigger]").first();p.prop("disabled",d),d&&(ui(e),e.removeClass("yyt-open"),p.attr("aria-expanded","false"))}function pd(t=[]){return Array.isArray(t)?t.map(e=>{if(e&&typeof e=="object"&&!Array.isArray(e)){let s=String(e.value??""),o=String(e.label??e.text??e.name??s);return{value:s,label:o,disabled:e.disabled===!0}}let r=String(e??"");return{value:r,label:r,disabled:!1}}):[]}function yd(t={}){let{selectedValue:e="",options:r=[],placeholder:s="\u8BF7\u9009\u62E9",disabled:o=!1,includeNative:n=!0,nativeTag:a="input",nativeType:i="hidden",rootAttributes:l={},nativeAttributes:d={},triggerAttributes:c={},dropdownAttributes:u={},optionAttributes:p={},optionClass:y="",optionTextClass:f=""}=t,g=pd(r),b=od(g,e,s),v=o===!0||g.length===0,T=Ns({...l,class:Ar("yyt-custom-select",l.class),"data-yyt-custom-select":l["data-yyt-custom-select"]??"true","data-yyt-select-placeholder":s}),w=Ns({type:"button",...c,class:Ar("yyt-select-trigger",c.class),"data-yyt-select-trigger":c["data-yyt-select-trigger"]??"true","aria-haspopup":c["aria-haspopup"]??"listbox","aria-expanded":c["aria-expanded"]??"false",disabled:v?!0:c.disabled}),B=Ns({...u,class:Ar("yyt-select-dropdown",u.class),"data-yyt-select-dropdown":u["data-yyt-select-dropdown"]??"true",role:u.role??"listbox"}),R=n?(()=>{let S={...d,class:Ar(d.class),"data-yyt-select-native":d["data-yyt-select-native"]??"true",disabled:v?!0:d.disabled};return a==="select"?`<select ${Ns(S)}>${g.map(W=>`
            <option value="${se(W.value)}" ${W.value===String(b.value??"")?"selected":""} ${W.disabled?"disabled":""}>${se(W.label)}</option>
          `).join("")}</select>`:`<input ${Ns({type:i,value:b.value,...S})}>`})():"";return`
    <div ${T}>
      ${R}
      <button ${w}>
        <span class="${se(Ar("yyt-select-value"))}" data-value="${se(b.value)}">${se(b.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${B}>
        ${g.map(S=>{let _=S.value===String(b.value??"");return`
            <button ${Ns({type:"button",...p,class:Ar("yyt-select-option",y,p.class,_?"yyt-selected":""),"data-yyt-select-option":p["data-yyt-select-option"]??"true","data-value":S.value,role:p.role??"option","aria-selected":_?"true":"false",disabled:S.disabled?!0:p.disabled})}>
              <span class="${se(Ar("yyt-option-text",f))}">${se(S.label)}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function ot(t,e="yytCustomSelect"){let r=X();if(!r||!ye(t))return;let s=nd(t),o=Gt(s);o.activeRoot&&t.has(o.activeRoot).length&&Yt(s),t.off(`.${e}`),r(s).off(`click.${e}`),r(s).off(`mousedown.${e}`),t.find('[data-yyt-enhanced-select="true"]').remove(),t.find(".yyt-native-select-bridge").each((n,a)=>{let i=r(a),l=i.attr("data-yyt-original-style");l!==void 0&&l?i.attr("style",l):i.removeAttr("style"),i.removeClass("yyt-native-select-bridge").removeAttr("data-yyt-original-style").removeAttr("data-yyt-select-key").removeData("yytCustomSelectOptions")})}function Et(t,e={}){let r=X();if(!r||!ye(t))return;let{namespace:s="yytCustomSelect",selectors:o=[]}=e,n=Array.isArray(o)?o.filter(Boolean):[o].filter(Boolean);if(n.length===0)return;ot(t,s);let a=n.join(", "),i=nd(t);t.find(a).each((l,d)=>{let c=r(d),u=String(c.attr("id")||"").trim(),p=u||`yyt-select-${Date.now()}-${l}`,y=u?`#${u}`:`[data-yyt-select-key="${p}"]`,f=`${p}-dropdown`,g=Mm(c.attr("class")),b=c.attr("style"),v=c.find("option").map((B,R)=>{let S=r(R);return{value:String(S.attr("value")??S.val()??""),label:S.text(),disabled:S.is(":disabled")}}).get();c.attr("data-yyt-original-style",b??"").attr("data-yyt-select-key",p).addClass("yyt-native-select-bridge").css("display","none").data("yytCustomSelectOptions",v);let T=yd({includeNative:!1,selectedValue:c.val(),options:v,disabled:c.is(":disabled"),placeholder:v[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{class:Ar(g),style:b||void 0,"data-yyt-enhanced-select":"true","data-yyt-select-target":y},triggerAttributes:{id:`${p}-trigger`,"aria-controls":f},dropdownAttributes:{id:f}});c.after(T);let w=td(t,c);ii(t,w,c)}),t.on(`click.${s}`,"[data-yyt-select-trigger]",l=>{l.preventDefault(),l.stopPropagation();let d=r(l.currentTarget);if(d.prop("disabled"))return;let c=d.closest("[data-yyt-custom-select]");ud(c)}),t.on(`change.${s}`,a,l=>{let d=r(l.currentTarget),c=d.find("option").map((p,y)=>{let f=r(y);return{value:String(f.attr("value")??f.val()??""),label:f.text(),disabled:f.is(":disabled")}}).get();d.data("yytCustomSelectOptions",c);let u=td(t,d);ii(t,u,d)}),r(i).off(`click.${s}`).on(`click.${s}`,l=>{if(cd(l.target,i))return;let d=Rm(t);d?.length&&(Yt(i),d.filter(".yyt-open").removeClass("yyt-open").find("[data-yyt-select-trigger]").attr("aria-expanded","false"))}),r(i).off(`mousedown.${s}`,".yyt-select-portal-layer [data-yyt-select-option]").on(`mousedown.${s}`,".yyt-select-portal-layer [data-yyt-select-option]",l=>{l.preventDefault(),l.stopPropagation();let d=r(l.currentTarget);if(d.prop("disabled"))return;let c=$m(t,d);if(!c?.length)return;let u=ad(t,c);if(!u?.length)return;let p=String(d.attr("data-value")||"");u.val(p).trigger("change"),ii(t,c,u),ui(c)})}function Om(t,e=Zr){if(!X()||!ye(t))return{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9};let s=t.find(`#${e}-model`).val()?.trim()||"",o=t.find(`#${e}-model-select`);return o.is(":visible")&&(s=o.val()||s),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:s,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),stream:t.find(`#${e}-stream`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function Bm(t,e,r=Zr){if(!X()||!ye(t)||!e)return;t.find(`#${r}-api-url`).val(e.url||""),t.find(`#${r}-api-key`).val(e.apiKey||""),t.find(`#${r}-model`).val(e.model||""),t.find(`#${r}-stream`).prop("checked",e.stream===!0),t.find(`#${r}-max-tokens`).val(e.max_tokens||4096),t.find(`#${r}-temperature`).val(e.temperature??.7),t.find(`#${r}-top-p`).val(e.top_p??.9);let o=e.useMainApi??!0;t.find(`#${r}-use-main-api`).prop("checked",o);let a=t.find(`#${r}-custom-api-fields`);o?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${r}-model`).show(),t.find(`#${r}-model-select`).hide()}function Eo(t){let{id:e,title:r,body:s,width:o="380px",wide:n=!1,dialogClass:a="",bodyClass:i="",footerClass:l=""}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${n?"yyt-dialog-wide":""} ${a}" style="${o!=="380px"?`width: ${o};`:""} max-height: calc(100vh - 32px);">
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
  `}function Ao(t,e,r={}){if(!X())return()=>{};let o=t.find(`#${e}-overlay`),n=()=>{o.remove(),a?.removeEventListener("keydown",i),r.onClose&&r.onClose()};o.find(`#${e}-close, #${e}-cancel`).on("click",n),o.on("click",function(l){l.target===this&&n()}),o.find(`#${e}-save`).on("click",function(){r.onSave&&r.onSave(n)});let a=o[0]?.ownerDocument||document,i=l=>{l.key==="Escape"&&(l.stopPropagation(),n())};return a.addEventListener("keydown",i),n}function nr(t,e,r={}){let{confirmText:s="\u786E\u5B9A",cancelText:o="\u53D6\u6D88",danger:n=!1,width:a="380px"}=r,i=X(),l=or();if(!i||!l?.body)return Promise.resolve(!1);let d=`yyt-confirm-${++fd}`;return new Promise(c=>{let u=!1,p=b=>{u||(u=!0,g.remove(),y?.focus(),c(b))},y=l.activeElement,f=`
      <div class="yyt-dialog-overlay" id="${d}-overlay">
        <div class="yyt-dialog" style="${a!=="380px"?`width: ${a};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${se(t)}</span>
            <button class="yyt-dialog-close" id="${d}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${se(e)}</div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${d}-cancel">${se(o)}</button>
            <button class="yyt-btn ${n?"yyt-btn-danger":"yyt-btn-primary"}" id="${d}-confirm">${se(s)}</button>
          </div>
        </div>
      </div>`,g=i(f).appendTo(l.body);g.find(`#${d}-confirm`).on("click",()=>p(!0)),g.find(`#${d}-cancel, #${d}-close`).on("click",()=>p(!1)),g.on("click",function(b){b.target===this&&p(!1)}),g.on("keydown",b=>{b.key==="Escape"&&(b.stopPropagation(),p(!1)),b.key==="Enter"&&(b.stopPropagation(),p(!0))}),g.find(`#${d}-${n?"cancel":"confirm"}`).trigger("focus")})}function zm(t,e,r={}){let{defaultValue:s="",placeholder:o="",confirmText:n="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",width:i="380px"}=r,l=X(),d=or();if(!l||!d?.body)return Promise.resolve(null);let c=`yyt-prompt-${++fd}`;return new Promise(u=>{let p=!1,y=w=>{p||(p=!0,b.remove(),f?.focus(),u(w))},f=d.activeElement,g=`
      <div class="yyt-dialog-overlay" id="${c}-overlay">
        <div class="yyt-dialog" style="${i!=="380px"?`width: ${i};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${se(t)}</span>
            <button class="yyt-dialog-close" id="${c}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            ${e?`<div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${se(e)}</div>`:""}
            <input class="yyt-input" id="${c}-input" type="text" value="${se(s)}" placeholder="${se(o)}" />
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${c}-cancel">${se(a)}</button>
            <button class="yyt-btn yyt-btn-primary" id="${c}-confirm">${se(n)}</button>
          </div>
        </div>
      </div>`,b=l(g).appendTo(d.body),v=b.find(`#${c}-input`),T=()=>{let w=v.val().trim();y(w||null)};b.find(`#${c}-confirm`).on("click",T),b.find(`#${c}-cancel, #${c}-close`).on("click",()=>y(null)),b.on("click",function(w){w.target===this&&y(null)}),v.on("keydown",w=>{w.key==="Enter"&&(w.stopPropagation(),T())}),b.on("keydown",w=>{w.key==="Escape"&&(w.stopPropagation(),y(null))}),v.trigger("focus").trigger("select")})}function Km(t,e,r){if(t.prop("disabled")&&t.data("yytLoading"))return Promise.resolve();let s=t.html(),o=t.outerWidth();if(t.prop("disabled",!0).data("yytLoading",!0),t.css("min-width",o+"px"),r)t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${se(r)}`);else{let n=t.find("i.fa-solid, i.fa-regular").first();n.length?(n.data("yytOriginalClass",n.attr("class")),n.attr("class","fa-solid fa-spinner fa-spin")):t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${s}`)}return Promise.resolve().then(()=>e()).finally(()=>{if(r)t.html(s);else{let n=t.find("i.fa-spinner"),a=n.data("yytOriginalClass");a?n.attr("class",a).removeData("yytOriginalClass"):t.html(s)}t.prop("disabled",!1).removeData("yytLoading").css("min-width","")})}function Co(t,e){let r=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(r),o=document.createElement("a");o.href=s,o.download=e,o.click(),URL.revokeObjectURL(s)}function ko(t){return new Promise((e,r)=>{let s=new FileReader;s.onload=o=>e(o.target.result),s.onerror=o=>r(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),s.readAsText(t)})}var Cm,Zr,li,Qr,rd,sd,fd,Ye=P(()=>{G();Cm=C.createScope("UIUtils"),Zr="youyou_toolkit",li=class{constructor(e={}){this._state={...e}}get(e){return this._state[e]}set(e,r){return this._state[e]=r,this}reset(e={}){return this._state={...e},this}toJSON(){return{...this._state}}};Qr=null;rd=new WeakMap,sd="yyt-select-portal-layer";fd=0});var Ds,Io,Ot,pi=P(()=>{He();Ye();G();Ds=C.createScope("UIManager"),Io=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,z.emit($.UI_INITIALIZED),Ds.log("\u521D\u59CB\u5316\u5B8C\u6210"))}register(e,r){return!e||!r?(Ds.warn("\u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...r,render:r.render||(()=>""),bindEvents:r.bindEvents||(()=>{}),destroy:r.destroy||(()=>{}),getStyles:r.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,r,s={}){let o=X();if(!o){Ds.error("jQuery\u4E0D\u53EF\u7528");return}let n=this.components.get(e);if(!n){Ds.error(`\u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);let i;typeof r=="string"?i=o(r):r&&r.jquery?i=r:r&&(i=o(r)),i?.length&&i.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u672A\u6CE8\u518C\uFF1A${e}</span></div>`);return}let a;if(typeof r=="string"?a=o(r):r&&r.jquery?a=r:r&&(a=o(r)),!ye(a)){Ds.warn("\u5BB9\u5668\u4E0D\u5B58\u5728");return}this.activeInstances.forEach((i,l)=>{i?.container?.length&&a.length&&i.container[0]===a[0]&&l!==e&&this.destroyInstance(l)}),this.destroyInstance(e);try{if(typeof n.renderTo=="function")n.renderTo(a,{...s,dependencies:this.dependencies});else{let i=n.render({...s,dependencies:this.dependencies});a.html(i),n.bindEvents(a,this.dependencies)}}catch(i){Ds.error(`\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25: ${e}`,i),a.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25\uFF1A${e}${i?.message?` - ${i.message}`:""}</span></div>`);return}this.activeInstances.set(e,{container:a,component:n,props:s}),z.emit($.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let r=this.activeInstances.get(e);r&&(r.component.destroy(r.container),this.activeInstances.delete(e))}destroyContainerInstance(e){let r=X();if(!r||!e)return;let s;if(typeof e=="string"?s=r(e):e?.jquery?s=e:s=r(e),!s?.length)return;let o=[];this.activeInstances.forEach((n,a)=>{n?.container?.length&&n.container[0]===s[0]&&o.push(a)}),o.forEach(n=>this.destroyInstance(n))}switchTab(e){let r=this.currentTab;this.currentTab=e,z.emit($.UI_TAB_CHANGED,{tabId:e,oldTab:r})}getCurrentTab(){return this.currentTab}switchSubTab(e,r){this.currentSubTab[e]=r,z.emit($.UI_SUBTAB_CHANGED,{mainTab:e,subTab:r})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((r,s)=>{r.getStyles&&(e+=r.getStyles())}),e}injectStyles(e=document){let r="yyt-component-styles";if(e.getElementById(r))return;let s=e.createElement("style");s.id=r,s.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(s)}setDependency(e,r){this.dependencies[e]=r}getDependency(e){return this.dependencies[e]}_subscribeEvents(){z.on($.PRESET_UPDATED,()=>{}),z.on($.TOOL_UPDATED,()=>{})}},Ot=new Io});function m(t,e={},...r){let s=document.createElement(t);if(e.className&&(s.className=e.className),e.text!==void 0&&e.text!==null&&(s.textContent=String(e.text)),e.html!==void 0&&e.html!==null&&(s.innerHTML=String(e.html)),e.attrs)for(let[o,n]of Object.entries(e.attrs))n==null||n===!1||s.setAttribute(o,n===!0?"":String(n));if(e.style&&Object.assign(s.style,e.style),e.dataset)for(let[o,n]of Object.entries(e.dataset))s.dataset[o]=String(n);for(let o of r)j(s,o);return s}function j(t,e){if(!(e==null||e===!1)){if(Array.isArray(e)){for(let r of e)j(t,r);return}if(typeof e=="string"||typeof e=="number"){t.appendChild(document.createTextNode(String(e)));return}if(e instanceof Node){t.appendChild(e);return}if(e&&e.el instanceof Node){t.appendChild(e.el);return}}}function gd(){let t=new Map;return{on(e,r){return!e||typeof r!="function"?()=>{}:(t.has(e)||t.set(e,new Set),t.get(e).add(r),()=>this.off(e,r))},off(e,r){let s=t.get(e);s&&s.delete(r)},emit(e,...r){let s=t.get(e);if(s)for(let o of[...s])try{o(...r)}catch{}},clear(){t.clear()}}}function yi(t,e){if(!t||!e)return null;if(t._id===e)return t;let r=t._children;if(!r)return null;let s=r instanceof Map?[...r.values()]:Array.isArray(r)?r:[];for(let o of s){let n=yi(o,e);if(n)return n}return null}function Ce({id:t=null,kind:e="control"}={}){let r=gd();return{_id:t||null,_kind:e,_children:null,_emitter:r,on(s,o){return r.on(s,o)},off(s,o){r.off(s,o)},getControl(s){return yi(this,s)},get(){},set(s){},destroy(){if(r.clear(),this._children){let s=this._children instanceof Map?[...this._children.values()]:Array.isArray(this._children)?this._children:[];for(let o of s)try{o?.destroy?.()}catch{}this._children instanceof Map?this._children.clear():Array.isArray(this._children)&&(this._children.length=0)}if(this.el?.parentNode)try{this.el.parentNode.removeChild(this.el)}catch{}}}}var nt=P(()=>{});function de(t={}){let{id:e=null,label:r="",icon:s=null,variant:o="default",size:n="normal",disabled:a=!1,title:i=null,onClick:l=null}=t,d=["yyt-btn"];o==="primary"?d.push("yyt-btn-primary"):o==="danger"?d.push("yyt-btn-danger"):o==="ghost"&&d.push("yyt-btn-secondary"),n==="small"&&d.push("yyt-btn-small");let c=m("button",{className:d.join(" "),attrs:{type:"button",disabled:a?"disabled":null,title:i}}),u=null;s&&(u=m("span",{className:"yyt-btn-icon-glyph",text:s}),c.appendChild(u));let p=m("span",{text:r});c.appendChild(p);let y={...Ce({id:e,kind:"button"}),el:c,setLabel(f){p.textContent=String(f||"")},setIcon(f){u&&(u.textContent=String(f||""))},setDisabled(f){f?c.setAttribute("disabled","disabled"):c.removeAttribute("disabled")},isDisabled(){return c.hasAttribute("disabled")},get(){return p.textContent},set(f){this.setLabel(f)}};return c.addEventListener("click",f=>{if(!c.hasAttribute("disabled")){if(typeof l=="function")try{l(f,y)}catch{}y._emitter.emit("click",f)}}),y}var md=P(()=>{nt()});function Je(t={}){let{id:e=null,placeholder:r="",value:s="",type:o="text",disabled:n=!1,maxLength:a=null,onInput:i=null,onChange:l=null}=t,d=m("input",{className:"yyt-input",attrs:{type:o,placeholder:r,disabled:n?"disabled":null,maxlength:a!=null?String(a):null}});d.value=s==null?"":String(s);let c={...Ce({id:e,kind:"textInput"}),el:d,get(){return d.value},set(u,{silent:p=!1}={}){d.value=u==null?"":String(u),p||c._emitter.emit("change",d.value)},setPlaceholder(u){d.placeholder=u==null?"":String(u)},setDisabled(u){d.disabled=!!u},focus(){d.focus()},select(){d.select()}};return d.addEventListener("input",()=>{if(typeof i=="function")try{i(d.value,c)}catch{}c._emitter.emit("input",d.value)}),d.addEventListener("change",()=>{if(typeof l=="function")try{l(d.value,c)}catch{}c._emitter.emit("change",d.value)}),d.addEventListener("blur",()=>c._emitter.emit("blur",d.value)),c}var hd=P(()=>{nt()});function Ge(t={}){let{id:e=null,options:r=[],value:s="",placeholder:o=null,disabled:n=!1,onChange:a=null}=t,i=m("select",{className:"yyt-select",attrs:{disabled:n?"disabled":null}});function l(c,u){if(i.innerHTML="",o!==null){let p=m("option",{text:o,attrs:{value:"",disabled:"disabled",selected:u?null:"selected"}});i.appendChild(p)}for(let p of c){let y=m("option",{text:p.label??String(p.value),attrs:{value:String(p.value),selected:String(p.value)===String(u)?"selected":null,disabled:p.disabled?"disabled":null}});i.appendChild(y)}}l(r,s);let d={...Ce({id:e,kind:"select"}),el:i,get(){return i.value},set(c,{silent:u=!1}={}){i.value=c==null?"":String(c),u||d._emitter.emit("change",i.value)},setOptions(c,u){l(c||[],u??i.value)},setDisabled(c){i.disabled=!!c}};return i.addEventListener("change",()=>{if(typeof a=="function")try{a(i.value,d)}catch(c){typeof console<"u"&&console.error&&console.error("[selectInput] onChange \u5F02\u5E38",c)}d._emitter.emit("change",i.value)}),d}var bd=P(()=>{nt()});function At(t={}){let{id:e=null,label:r="",hint:s="",checked:o=!1,disabled:n=!1,onChange:a=null}=t,i=m("label",{className:"yyt-toggle-label"});r&&i.appendChild(m("span",{text:r})),s&&i.appendChild(m("span",{className:"yyt-toggle-hint",text:s}));let l=m("input",{attrs:{type:"checkbox",disabled:n?"disabled":null}});l.checked=!!o;let d=m("span",{className:"yyt-toggle-slider"}),c=m("label",{className:"yyt-toggle"});c.appendChild(l),c.appendChild(d);let u=m("div",{className:"yyt-toggle-row"});u.appendChild(i),u.appendChild(c),i.addEventListener("click",y=>{y.preventDefault(),!l.disabled&&(l.checked=!l.checked,l.dispatchEvent(new Event("change",{bubbles:!0})))});let p={...Ce({id:e,kind:"toggle"}),el:u,get(){return!!l.checked},set(y,{silent:f=!1}={}){l.checked=!!y,f||p._emitter.emit("change",!!y)},setDisabled(y){l.disabled=!!y}};return l.addEventListener("change",()=>{let y=!!l.checked;if(typeof a=="function")try{a(y,p)}catch{}p._emitter.emit("change",y)}),p}var xd=P(()=>{nt()});var wd=P(()=>{nt()});var vd=P(()=>{nt()});function pt(t={}){let{id:e=null,label:r="",hint:s="",control:o=null,inline:n=!1}=t,a=m("div",{className:"yyt-form-group",style:n?{flexDirection:"row",alignItems:"center",gap:"12px"}:null});r&&a.appendChild(m("label",{text:r,style:n?{flex:"0 0 auto",minWidth:"120px"}:null}));let i=m("div",{style:n?{flex:"1",minWidth:"0"}:null});o&&j(i,o),a.appendChild(i),s&&a.appendChild(m("div",{className:"yyt-form-hint",text:s}));let l=o?[o]:[];return{...Ce({id:e,kind:"formRow"}),el:a,_children:l,get(){return o?.get?.()},set(d,c){o?.set?.(d,c)},setControl(d){i.innerHTML="",l.length=0,d&&(j(i,d),l.push(d))}}}var Td=P(()=>{nt()});function Mn(t={}){let{id:e=null,icon:r=null,name:s="",desc:o="",active:n=!1,disabled:a=!1,actions:i=[],onClick:l=null}=t,d=["yyt-list-row"];n&&d.push("yyt-list-row-active"),a&&d.push("yyt-list-row-disabled");let c=m("div",{className:d.join(" "),style:a?{opacity:"0.5",pointerEvents:"none"}:null});r&&c.appendChild(m("div",{className:"yyt-list-row-icon",text:r}));let u=m("div",{className:"yyt-list-row-main"}),p=m("div",{className:"yyt-list-row-name",text:s});u.appendChild(p);let y=null;o&&(y=m("div",{className:"yyt-list-row-desc",text:o}),u.appendChild(y)),c.appendChild(u);let f=null;if(i&&i.length){f=m("div",{className:"yyt-list-row-actions"});for(let b of i)j(f,b);c.appendChild(f)}typeof l=="function"&&(c.style.cursor="pointer",c.addEventListener("click",b=>{b.target.closest(".yyt-list-row-actions")||(l(b,g),g._emitter.emit("click",b))}));let g={...Ce({id:e,kind:"listRow"}),el:c,_children:i||[],setName(b){p.textContent=b==null?"":String(b)},setDesc(b){if(y)y.textContent=b==null?"":String(b);else{if(!b)return;y=m("div",{className:"yyt-list-row-desc",text:b}),u.appendChild(y)}},setActive(b){b?c.classList.add("yyt-list-row-active"):c.classList.remove("yyt-list-row-active")},setDisabled(b){b?(c.classList.add("yyt-list-row-disabled"),c.style.opacity="0.5",c.style.pointerEvents="none"):(c.classList.remove("yyt-list-row-disabled"),c.style.opacity="",c.style.pointerEvents="")}};return g}var Sd=P(()=>{nt()});function Bt(t={}){let{id:e=null,heading:r="",icon:s=null,actions:o=[],content:n=[]}=t,a=m("div",{className:"yyt-flow-section"}),i=null,l=null,d=null;if(r||s||o&&o.length){if(i=m("div",{className:"yyt-flow-heading"}),s&&(l=m("span",{className:"yyt-flow-heading-icon",text:s}),i.appendChild(l)),r&&i.appendChild(m("span",{text:r})),o&&o.length){d=m("div",{className:"yyt-flow-heading-action"});for(let y of o)j(d,y);i.appendChild(d)}a.appendChild(i)}let c=m("div",{className:"yyt-flow-content"}),u=[];for(let y of n||[])y&&(j(c,y),u.push(y));for(let y of o||[])y&&typeof y=="object"&&y.el&&u.push(y);return a.appendChild(c),{...Ce({id:e,kind:"flowSection"}),el:a,_children:u,appendContent(y){y&&(j(c,y),y&&typeof y=="object"&&y.el&&u.push(y))},clearContent(){c.innerHTML="";let y=u.filter(f=>(o||[]).includes(f));u.length=0;for(let f of y)u.push(f)},setHeading(y){if(!i)return;let f=i.querySelector("span:not(.yyt-flow-heading-icon):not(.yyt-flow-heading-action)");f&&(f.textContent=y==null?"":String(y))},setIcon(y){l&&(l.textContent=y==null?"":String(y))}}}var _d=P(()=>{nt()});function Rn(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent.document}catch{}return document}function fi({title:t,width:e,wide:r}){let s=`yyt-ctrl-dialog-${++Um}`,o=m("div",{className:"yyt-dialog-overlay",attrs:{"data-dialog-id":s}}),n={};e&&e!=="380px"&&(n.width=e),n.maxHeight="calc(100vh - 32px)";let a=m("div",{className:`yyt-dialog${r?" yyt-dialog-wide":""}`,style:n}),i=m("div",{className:"yyt-dialog-header"});i.appendChild(m("span",{className:"yyt-dialog-title",text:t||""}));let l=m("button",{className:"yyt-dialog-close",attrs:{type:"button","aria-label":"close"},html:'<i class="fa-solid fa-times"></i>'});i.appendChild(l),a.appendChild(i);let d=m("div",{className:"yyt-dialog-body"});a.appendChild(d);let c=m("div",{className:"yyt-dialog-footer"});return a.appendChild(c),o.appendChild(a),{overlay:o,body:d,footer:c,closeBtn:l,id:s}}function gi(t){let e=Rn();return e?.body?(e.body.appendChild(t),!0):!1}function mi(t){if(t?.parentNode)try{t.parentNode.removeChild(t)}catch{}}function Wm(t={}){let{title:e="\u8BF7\u786E\u8BA4",message:r="",confirmText:s="\u786E\u5B9A",cancelText:o="\u53D6\u6D88",danger:n=!1,width:a="380px"}=t;return new Promise(i=>{let{overlay:l,body:d,footer:c,closeBtn:u}=fi({title:e,width:a,wide:!1}),p=(Rn()||document).activeElement,y=m("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6"},text:r});d.appendChild(y);let f=m("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:o}),g=m("button",{className:`yyt-btn ${n?"yyt-btn-danger":"yyt-btn-primary"}`,attrs:{type:"button"},text:s});c.appendChild(f),c.appendChild(g);let b=!1,v=T=>{if(!b){b=!0,mi(l);try{p?.focus()}catch{}i(T)}};if(g.addEventListener("click",()=>v(!0)),f.addEventListener("click",()=>v(!1)),u.addEventListener("click",()=>v(!1)),l.addEventListener("click",T=>{T.target===l&&v(!1)}),l.addEventListener("keydown",T=>{T.key==="Escape"?(T.stopPropagation(),v(!1)):T.key==="Enter"&&(T.stopPropagation(),v(!0))}),!gi(l)){i(!1);return}(n?f:g).focus()})}function jm(t={}){let{title:e="\u8F93\u5165",message:r="",defaultValue:s="",placeholder:o="",confirmText:n="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",validate:i=null,width:l="380px"}=t;return new Promise(d=>{let{overlay:c,body:u,footer:p,closeBtn:y}=fi({title:e,width:l,wide:!1}),f=(Rn()||document).activeElement;r&&u.appendChild(m("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6",marginBottom:"8px"},text:r}));let g=m("input",{className:"yyt-input",attrs:{type:"text",placeholder:o}});g.value=String(s||""),u.appendChild(g);let b=m("div",{style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px",marginTop:"6px",minHeight:"14px"}});u.appendChild(b);let v=m("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:a}),T=m("button",{className:"yyt-btn yyt-btn-primary",attrs:{type:"button"},text:n});p.appendChild(v),p.appendChild(T);let w=!1,B=S=>{if(!w){w=!0,mi(c);try{f?.focus()}catch{}d(S)}},R=()=>{let S=g.value.trim();if(typeof i=="function"){let _=i(S);if(_){b.textContent=_,g.focus();return}}B(S||null)};if(T.addEventListener("click",R),v.addEventListener("click",()=>B(null)),y.addEventListener("click",()=>B(null)),c.addEventListener("click",S=>{S.target===c&&B(null)}),g.addEventListener("keydown",S=>{S.key==="Enter"&&(S.stopPropagation(),R())}),c.addEventListener("keydown",S=>{S.key==="Escape"&&(S.stopPropagation(),B(null))}),!gi(c)){d(null);return}g.focus(),g.select()})}function Fm(t={}){let{title:e="",body:r=null,buttons:s=[],width:o="480px",wide:n=!1,onMounted:a=null}=t,{overlay:i,body:l,footer:d,closeBtn:c}=fi({title:e,width:o,wide:n}),u=(Rn()||document).activeElement;r&&j(l,r);let p=!1,y,f=new Promise(b=>{y=b}),g=b=>{if(!p){p=!0,mi(i);try{u?.focus()}catch{}y(b)}};for(let b of s){let v=b.variant==="primary"?"yyt-btn-primary":b.variant==="danger"?"yyt-btn-danger":"yyt-btn-secondary",T=m("button",{className:`yyt-btn ${v}`,attrs:{type:"button"},text:b.label||""});T.addEventListener("click",()=>{try{b.onClick?.(g,l)}catch(w){console.error("[dialog.custom] button onClick error",w),g(null)}}),d.appendChild(T)}if(c.addEventListener("click",()=>g(null)),i.addEventListener("click",b=>{b.target===i&&g(null)}),i.addEventListener("keydown",b=>{b.key==="Escape"&&(b.stopPropagation(),g(null))}),!gi(i))y(null);else if(typeof a=="function")try{a({overlay:i,body:l,close:g})}catch{}return{el:i,body:l,close:g,result:f}}var Um,Ee,Pn=P(()=>{nt();Um=0;Ee={confirm:Wm,prompt:jm,custom:Fm}});function hi(t={}){let{id:e=null,items:r=[],align:s="start",gap:o="8px",wrap:n=!0}=t,i=m("div",{className:"yyt-toolbar",style:{display:"flex",alignItems:"center",justifyContent:{start:"flex-start",end:"flex-end",center:"center","space-between":"space-between"}[s]||"flex-start",gap:o,flexWrap:n?"wrap":"nowrap"}}),l=[];for(let d of r)d&&(j(i,d),l.push(d));return{...Ce({id:e,kind:"toolbar"}),el:i,_children:l,addItem(d){d&&(j(i,d),l.push(d))},clear(){for(;i.firstChild;)i.removeChild(i.firstChild);for(let d of l)try{d?.destroy?.()}catch{}l.length=0}}}var Ed=P(()=>{nt()});function bi(t={}){let{id:e=null,name:r="",desc:s="",active:o=!1,disabled:n=!1,builtin:a=!1,readonly:i=!1,metaChips:l=[],actions:d=[],onClick:c=null}=t,u=a||i,p=["yyt-list-row","yyt-preset-list-item"];o&&p.push("yyt-list-row-active"),n&&p.push("yyt-list-row-disabled"),u&&p.push("yyt-preset-list-item-readonly");let y=m("div",{className:p.join(" "),style:n?{opacity:"0.5",pointerEvents:"none"}:null}),f=m("span",{className:"yyt-preset-dot",style:{width:"8px",height:"8px",borderRadius:"50%",flexShrink:"0",marginRight:"8px",background:o?"var(--yyt-accent, #7bb7ff)":"transparent",border:o?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))",transition:"background 0.15s ease"}});y.appendChild(f);let g=m("div",{className:"yyt-list-row-main",style:{flex:"1",minWidth:"0"}}),b=m("div",{style:{display:"flex",alignItems:"center",gap:"8px"}}),v=m("div",{className:"yyt-list-row-name",text:r,style:{fontWeight:"600"}});b.appendChild(v),a&&b.appendChild(m("span",{className:"yyt-preset-badge yyt-preset-badge-builtin",text:"\u5185\u7F6E",style:{fontSize:"10px",padding:"2px 6px",borderRadius:"999px",background:"var(--yyt-surface-3, rgba(255,255,255,0.06))",color:"var(--yyt-text-muted, rgba(255,255,255,0.5))",border:"1px solid var(--yyt-border, rgba(255,255,255,0.1))"}})),g.appendChild(b);let T=null;s&&(T=m("div",{className:"yyt-list-row-desc",text:s}),g.appendChild(T)),y.appendChild(g);let w=null;if(Array.isArray(l)&&l.length){w=m("div",{className:"yyt-preset-meta-chips",style:{display:"flex",gap:"6px",flexWrap:"wrap"}});for(let _ of l)_&&w.appendChild(m("span",{className:"yyt-preset-meta-chip",text:String(_),style:{fontSize:"11px",padding:"2px 8px",borderRadius:"999px",background:"var(--yyt-surface-2, rgba(255,255,255,0.04))",color:"var(--yyt-text-secondary, rgba(255,255,255,0.6))",border:"1px solid var(--yyt-border-soft, rgba(255,255,255,0.04))"}}));y.appendChild(w)}let B=null,R=u?d.filter(_=>_?._kind!=="button"||!_._destructive):d;if(R&&R.length){B=m("div",{className:"yyt-list-row-actions"});for(let _ of R)j(B,_);y.appendChild(B)}typeof c=="function"&&(y.style.cursor="pointer",y.addEventListener("click",_=>{_.target.closest(".yyt-list-row-actions")||(c(_,S),S._emitter.emit("click",_))}));let S={...Ce({id:e,kind:"presetListItem"}),el:y,_children:d||[],setActive(_){_?y.classList.add("yyt-list-row-active"):y.classList.remove("yyt-list-row-active"),f.style.background=_?"var(--yyt-accent, #7bb7ff)":"transparent",f.style.border=_?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))"},setName(_){v.textContent=_==null?"":String(_)},setDesc(_){if(T)T.textContent=_==null?"":String(_);else{if(!_)return;T=m("div",{className:"yyt-list-row-desc",text:_}),g.appendChild(T)}},setDisabled(_){_?(y.classList.add("yyt-list-row-disabled"),y.style.opacity="0.5",y.style.pointerEvents="none"):(y.classList.remove("yyt-list-row-disabled"),y.style.opacity="",y.style.pointerEvents="")}};return S}var Ad=P(()=>{nt()});function xi(t={}){let{id:e=null,values:r=[],placeholder:s="\u8F93\u5165\u540E\u56DE\u8F66\u6DFB\u52A0",suggestions:o=null,allowDuplicates:n=!1,maxChips:a=0,chipVariant:i="default",onChange:l=null,onAdd:d=null,onRemove:c=null}=t,u=o&&o.length?`yyt-chip-dl-${++Hm}`:null,p=m("div",{className:"yyt-chip-group",style:{display:"flex",flexWrap:"wrap",gap:"6px",padding:"6px 8px",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-control-border, rgba(255,255,255,0.08))",background:"var(--yyt-control-bg, transparent)",minHeight:"36px",alignItems:"center"}}),y=[],f={type:"text",placeholder:s,autocomplete:"off"};u&&(f.list=u);let g=m("input",{className:"yyt-chip-input",attrs:f,style:{flex:"1 1 auto",minWidth:"120px",border:"none",outline:"none",background:"transparent",color:"var(--yyt-text, inherit)",fontSize:"12px",padding:"4px 0"}}),b=null;if(u){b=m("datalist",{attrs:{id:u}});for(let D of o)b.appendChild(m("option",{attrs:{value:String(D)}}));p.appendChild(b)}function v(){return i==="danger"?"rgba(248,113,113,0.12)":i==="soft"?"var(--yyt-surface-2, rgba(255,255,255,0.04))":"var(--yyt-accent-soft, rgba(123,183,255,0.15))"}function T(){return i==="danger"?"rgba(248,113,113,0.25)":"var(--yyt-border, rgba(255,255,255,0.1))"}function w(){return i==="danger"?"#f87171":"var(--yyt-text, inherit)"}function B(D){let A=m("span",{className:"yyt-chip",style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"3px 4px 3px 10px",borderRadius:"999px",background:v(),border:`1px solid ${T()}`,color:w(),fontSize:"11px",fontWeight:"500"}});A.appendChild(m("span",{text:D,style:{lineHeight:"1"}}));let J=m("button",{attrs:{type:"button","aria-label":"remove"},text:"\xD7",style:{border:"none",background:"transparent",color:"inherit",cursor:"pointer",padding:"0 4px",fontSize:"14px",lineHeight:"1",opacity:"0.7"}});return J.addEventListener("click",K=>{K.stopPropagation(),_(D)}),J.addEventListener("mouseenter",()=>{J.style.opacity="1"}),J.addEventListener("mouseleave",()=>{J.style.opacity="0.7"}),A.appendChild(J),A}function R(){let D=[];for(let A of p.children)A===g||A===b||D.push(A);for(let A of D)p.removeChild(A);for(let A of y)p.insertBefore(B(A),g)}function S(D){let A=String(D||"").trim();if(!A||!n&&y.includes(A)||a>0&&y.length>=a)return!1;y.push(A),R();try{d?.(A,y.slice())}catch{}try{l?.(y.slice())}catch{}return W._emitter.emit("change",y.slice()),!0}function _(D){let A=y.indexOf(D);if(A<0)return!1;y.splice(A,1),R();try{c?.(D,y.slice())}catch{}try{l?.(y.slice())}catch{}return W._emitter.emit("change",y.slice()),!0}function F(){if(y.length!==0){y=[],R();try{l?.([])}catch{}W._emitter.emit("change",[])}}for(let D of r){let A=String(D||"").trim();A&&(!n&&y.includes(A)||y.push(A))}p.appendChild(g),R(),g.addEventListener("keydown",D=>{if(D.key==="Enter"||D.key===","){D.preventDefault();let A=g.value.trim();A&&S(A)&&(g.value="")}else D.key==="Backspace"&&!g.value&&y.length&&_(y[y.length-1])}),g.addEventListener("blur",()=>{let D=g.value.trim();D&&S(D)&&(g.value="")}),p.addEventListener("click",D=>{D.target===p&&g.focus()});let W={...Ce({id:e,kind:"chipGroup"}),el:p,get(){return y.slice()},set(D){y=[];for(let A of Array.isArray(D)?D:[]){let J=String(A||"").trim();J&&(!n&&y.includes(J)||y.push(J))}R();try{l?.(y.slice())}catch{}W._emitter.emit("change",y.slice())},addChip:S,removeChip:_,clear:F,setSuggestions(D){if(b){for(;b.firstChild;)b.removeChild(b.firstChild);for(let A of D||[])b.appendChild(m("option",{attrs:{value:String(A)}}))}}};return W}var Hm,Cd=P(()=>{nt();Hm=0});var ar=P(()=>{md();hd();bd();xd();wd();vd();Td();Sd();_d();Pn();Ed();Ad();Cd();nt()});function kd(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function Id(t){return typeof t=="string"&&t.startsWith("builtin_")}function Cr(t={}){let{id:e,kind:r="generic",panelTitle:s="\u9884\u8BBE\u7BA1\u7406",panelHint:o="",store:n,renderEditor:a,renderExtras:i=null,renderListItemMeta:l=null,hasSwitchToButton:d=!1,onSwitchTo:c=null}=t;if(!n||typeof n.listPresets!="function")throw new Error("createPresetManagerPanel: store \u7F3A\u5C11\u5FC5\u8981\u7684 listPresets \u65B9\u6CD5");if(typeof a!="function")throw new Error("createPresetManagerPanel: \u5FC5\u987B\u63D0\u4F9B renderEditor");return{id:e,kind:r,renderTo(u){let p=kd(u);if(!p)return;let f=p._yytLastPresetPanelKind!==r;if(p._yytLastPresetPanelKind=r,p._yytPresetPanelCleanup)try{p._yytPresetPanelCleanup()}catch{}let g=()=>this.renderTo(u),b=n.listPresets(),v=typeof n.getCurrentPresetId=="function"?n.getCurrentPresetId():"",T=f?"":v,w=m("div",{className:"yyt-preset-manager-panel",style:{display:"flex",flexDirection:"column",gap:"14px"}});if(s||o){let K=m("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});s&&K.appendChild(m("div",{text:s,style:{fontSize:"15px",fontWeight:"700",color:"var(--yyt-text)"}})),o&&K.appendChild(m("div",{text:o,style:{fontSize:"12px",color:"var(--yyt-text-secondary)",lineHeight:"1.6"}})),w.appendChild(K)}let B=[],R=m("div",{style:{display:"flex",flexDirection:"column"}});if(b.length===0)R.appendChild(m("div",{text:'\u6682\u65E0\u9884\u8BBE\u3002\u70B9\u51FB\u4E0B\u65B9"\u65B0\u5EFA"\u521B\u5EFA\u7B2C\u4E00\u4E2A\u9884\u8BBE\u3002',style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"12px 0",textAlign:"center"}}));else for(let K of b){let Q=K.id===T,ue=Id(K.id),ge=typeof l=="function"?l(K)||[]:[],Me=[];d&&typeof c=="function"&&Me.push(de({label:Q?"\u2713 \u5DF2\u52A0\u8F7D":"\u52A0\u8F7D",size:"small",variant:Q?"ghost":"primary",disabled:Q,onClick:Ae=>{Ae.stopPropagation();try{c(K.id)}catch(De){ts.warn("onSwitchTo \u5F02\u5E38",{err:De})}g()}})),Me.push(de({label:"\u590D\u5236",size:"small",variant:"ghost",title:"\u590D\u5236\u4E3A\u7528\u6237\u9884\u8BBE",onClick:async Ae=>{Ae.stopPropagation();try{let De=n.duplicatePreset(K.id);De?.id&&typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(De.id),g()}catch(De){ts.warn("duplicate \u5F02\u5E38",{err:De})}}})),ue||(Me.push(de({label:"\u270E",size:"small",variant:"ghost",title:"\u91CD\u547D\u540D",onClick:async Ae=>{Ae.stopPropagation();let De=await Ee.prompt({title:"\u91CD\u547D\u540D\u9884\u8BBE",defaultValue:K.name,placeholder:"\u9884\u8BBE\u540D",validate:xe=>xe?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});De&&De!==K.name&&(n.renamePreset(K.id,De),g())}})),Me.push(de({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664",onClick:async Ae=>{Ae.stopPropagation(),await Ee.confirm({title:"\u5220\u9664\u9884\u8BBE",message:`\u786E\u8BA4\u5220\u9664\u300C${K.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})&&(n.deletePreset(K.id),g())}})));let H=bi({id:K.id,name:K.name,desc:K.description,active:Q,builtin:ue,metaChips:ge,actions:Me,onClick:()=>{typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(K.id),g()}});R.appendChild(H.el)}let S=de({label:"+ \u65B0\u5EFA\u9884\u8BBE",size:"small",variant:"primary",onClick:async()=>{let K=await Ee.prompt({title:"\u65B0\u5EFA\u9884\u8BBE",placeholder:"\u9884\u8BBE\u540D\uFF08\u5FC5\u586B\uFF09",validate:Q=>Q?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});if(K)try{let Q=n.createPreset({name:K});Q?.id&&typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(Q.id),g()}catch(Q){ts.warn("createPreset \u5931\u8D25",{err:Q}),await Ee.confirm({title:"\u521B\u5EFA\u5931\u8D25",message:String(Q?.message||Q),confirmText:"\u786E\u5B9A"})}}}),_=Bt({heading:"\u9884\u8BBE\u9009\u62E9",icon:"\u{1F4CB}",actions:[S.el],content:[R]});B.push(_),w.appendChild(_.el);let F=T?b.find(K=>K.id===T):null;if(F){let K=Id(F.id),Q=null;try{Q=a(F,{readonly:K,onChange:ge=>{if(!K&&!(!ge||typeof ge!="object"))try{n.updatePreset(F.id,ge)}catch(Me){ts.warn("updatePreset \u5931\u8D25",{err:Me})}},refresh:g})}catch(ge){ts.error("renderEditor \u5F02\u5E38",{err:ge}),Q=m("div",{text:`\u7F16\u8F91\u5668\u6E32\u67D3\u5F02\u5E38\uFF1A${ge?.message||ge}`,style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px"}})}let ue=Bt({heading:K?`\u7F16\u8F91\u300C${F.name}\u300D\uFF08\u5185\u7F6E\u53EA\u8BFB\uFF09`:`\u7F16\u8F91\u300C${F.name}\u300D`,icon:"\u270E",content:[Q].filter(Boolean)});if(B.push(ue),w.appendChild(ue.el),typeof i=="function"){let ge=null;try{ge=i(F,{refresh:g})}catch(Me){ts.warn("renderExtras \u5F02\u5E38",{err:Me})}if(ge){let Me=Bt({heading:"\u9644\u52A0",icon:"\u{1F527}",content:[ge]});B.push(Me),w.appendChild(Me.el)}}}else b.length>0&&w.appendChild(m("div",{text:"\u8BF7\u5728\u4E0A\u65B9\u5217\u8868\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE\u4EE5\u7F16\u8F91",style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"16px",textAlign:"center",border:"1px dashed var(--yyt-border, rgba(255,255,255,0.08))",borderRadius:"var(--yyt-radius-sm, 6px)"}}));let W=de({label:"\u2B06 \u5BFC\u5165",size:"small",variant:"ghost",onClick:async()=>{await Ym(n,g)}}),D=de({label:"\u2B07 \u5BFC\u51FA",size:"small",variant:"ghost",onClick:()=>{Gm(n,r)}}),A=de({label:"\u6E05\u7A7A\u5168\u90E8",size:"small",variant:"ghost",onClick:async()=>{await Ee.confirm({title:"\u6E05\u7A7A\u6240\u6709\u9884\u8BBE",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u7528\u6237\u9884\u8BBE\uFF08\u5185\u7F6E\u9884\u8BBE\u4E0D\u53D7\u5F71\u54CD\uFF09\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002",confirmText:"\u6E05\u7A7A",danger:!0})&&typeof n.resetAll=="function"&&(n.resetAll(),g())}}),J=hi({items:[W,D,A],align:"end",gap:"8px"});w.appendChild(J.el),p.innerHTML="",p.appendChild(w),p._yytPresetPanelCleanup=()=>{for(let K of B)try{K.destroy()}catch{}delete p._yytPresetPanelCleanup}},destroy(u){let p=kd(u);if(p?._yytPresetPanelCleanup)try{p._yytPresetPanelCleanup()}catch{}},getStyles(){return""}}}async function Ym(t,e){if(typeof t.importPresets!="function"){await Ee.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u5165",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u5165\u3002",confirmText:"\u786E\u5B9A"});return}let r=m("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34\u5BFC\u51FA\u7684 JSON"},style:{width:"100%",minHeight:"180px",fontSize:"12px",fontFamily:"monospace"}}),s=Ee.custom({title:"\u5BFC\u5165\u9884\u8BBE",width:"520px",body:r,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:n=>n(null)},{label:"\u4ECE\u6587\u4EF6\u2026",variant:"ghost",onClick:()=>{let n=m("input",{attrs:{type:"file",accept:"application/json,.json"}});n.addEventListener("change",()=>{let a=n.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{r.value=String(i.result||""),r.focus()},i.readAsText(a)}),n.click()}},{label:"\u5BFC\u5165",variant:"primary",onClick:async n=>{let a=r.value.trim();if(!a){n(null);return}let i;try{i=JSON.parse(a)}catch(l){await Ee.confirm({title:"JSON \u89E3\u6790\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"});return}try{let l=t.importPresets(i);n(l)}catch(l){await Ee.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"})}}}]});setTimeout(()=>r.focus(),0);let o=await s.result;o&&(o.added>0||o.imported>0)&&e()}function Gm(t,e){if(typeof t.exportAll!="function"){Ee.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u51FA",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u51FA\u3002",confirmText:"\u786E\u5B9A"});return}let r=t.exportAll(),s=JSON.stringify(r,null,2),o=m("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});o.value=s,o.readOnly=!0,Ee.custom({title:`\u5BFC\u51FA ${e||""} \u9884\u8BBE`,width:"600px",body:o,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:n=>n(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(s)}catch{o.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let n=new Blob([s],{type:"application/json"}),a=URL.createObjectURL(n),i=m("a",{attrs:{href:a,download:`${e||"preset"}_${Date.now()}.json`}});document.body.appendChild(i),i.click(),setTimeout(()=>{try{document.body.removeChild(i)}catch{}try{URL.revokeObjectURL(a)}catch{}},100)}catch(n){ts.warn("\u4E0B\u8F7D\u5931\u8D25",{err:n})}}}]})}var ts,Mo=P(()=>{ar();G();ts=C.createScope("PresetManagerBase")});var Rd={};re(Rd,{ApiPresetPanel:()=>Md,default:()=>Xm});function Vm(t,{onChange:e,readonly:r}){let s=m("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}}),o=t.apiConfig||{};j(s,pt({label:"\u63CF\u8FF0",control:Je({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})})),j(s,At({label:"\u4F7F\u7528\u4E3B API",hint:"\u5F00\u542F\u540E\u5FFD\u7565\u4E0B\u65B9 URL/Key/Model\uFF0C\u76F4\u63A5\u590D\u7528 SillyTavern \u4E3B\u8FDE\u63A5",checked:o.useMainApi!==!1,disabled:r,onChange:i=>e({apiConfig:{...o,useMainApi:i}})})),j(s,At({label:"\u6D41\u5F0F\u8F93\u51FA\uFF08stream\uFF09",hint:"\u9010\u5B57\u63A5\u6536\u54CD\u5E94",checked:o.stream===!0,disabled:r,onChange:i=>e({apiConfig:{...o,stream:i}})})),j(s,pt({label:"API URL",control:Je({value:o.url||"",placeholder:"https://api.example.com/v1",disabled:r,onChange:i=>e({apiConfig:{...o,url:i}})})})),j(s,pt({label:"API Key",control:(()=>{let i=Je({value:o.apiKey||"",placeholder:"sk-...",disabled:r,onChange:l=>e({apiConfig:{...o,apiKey:l}})});try{i.el.setAttribute("type","password")}catch{}return i})()})),j(s,pt({label:"\u6A21\u578B",control:Je({value:o.model||"",placeholder:"gpt-4 / gemini-pro / claude-...",disabled:r,onChange:i=>e({apiConfig:{...o,model:i}})})}));let n=m("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"10px"}});function a(i,l,d,c="1"){let u=m("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});u.appendChild(m("label",{text:i,style:{fontSize:"11px",color:"var(--yyt-text-secondary)",fontWeight:"600"}}));let p=m("input",{className:"yyt-input",attrs:{type:"number",step:c,disabled:r?"disabled":null},style:{padding:"6px 10px",fontSize:"12px"}});return p.value=String(o[l]??d),p.addEventListener("change",()=>{let y=Number(p.value);Number.isFinite(y)&&e({apiConfig:{...o,[l]:y}})}),u.appendChild(p),u}return n.appendChild(a("max_tokens","max_tokens",4096,"1")),n.appendChild(a("temperature","temperature",.7,"0.05")),n.appendChild(a("top_p","top_p",.9,"0.05")),j(s,n),s}function Jm(t){let e=t.apiConfig||{},r=[];return e.useMainApi!==!1?r.push("\u4E3B API"):r.push(e.model||"\u81EA\u5B9A\u4E49"),t.starred&&r.push("\u2605"),r}var kr,qm,Md,Xm,Pd=P(()=>{ar();_o();G();Mo();kr=C.createScope("ApiPresetPanel"),qm={listPresets(){return Er().map(t=>({id:t.name,name:t.name,description:t.description||"",apiConfig:t.apiConfig||{},starred:t.starred===!0,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=Xr(t);return e?{id:e.name,...e,description:e.description||""}:null},getCurrentPresetId(){return oi()||""},setCurrentPresetId(t){if(!t)return!1;try{return!!kn(t)}catch(e){return kr.warn("switchToPreset \u5931\u8D25",{err:e}),!1}},createPreset(t){let e=String(t?.name||"").trim();if(!e)return kr.warn("createPreset: name \u7F3A\u5931"),null;let r=An({name:e,description:t?.description||"",apiConfig:t?.apiConfig||{}});return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(kr.warn("createPreset \u5931\u8D25",{msg:r?.message}),null)},updatePreset(t,e){if(!t)return null;let r=ti(t,e);return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(kr.warn("updatePreset \u5931\u8D25",{id:t,msg:r?.message}),null)},deletePreset(t){if(!t)return!1;try{let e=Cn(t);return!!(e?.success??e===!0)}catch(e){return kr.warn("deletePreset \u5931\u8D25",{err:e}),!1}},duplicatePreset(t,e={}){if(!t)return null;let r=e.nameSuffix||"_\u526F\u672C",s=`${t}${r}`;try{let o=si(t,s);return o?.success?{id:o.preset.name,...o.preset,description:o.preset.description||""}:null}catch(o){return kr.warn("duplicatePreset \u5931\u8D25",{err:o}),null}},renamePreset(t,e){if(!t||!e)return null;try{let r=ri(t,e);return r?.success?{id:r.preset?.name||e,...r.preset,description:r.preset?.description||""}:null}catch(r){return kr.warn("renamePreset \u5931\u8D25",{err:r}),null}},exportAll(){let t=ni();try{return{version:1,exportedAt:Date.now(),presets:JSON.parse(t)}}catch{return{version:1,exportedAt:Date.now(),presets:[]}}},importPresets(t){if(!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[t],r=JSON.stringify(e);return{added:ai(r,{overwrite:!1})?.imported||0}},resetAll(){let t=Er();for(let e of t)try{Cn(e.name)}catch{}}};Md=Cr({id:"apiPresetPanel",kind:"api",panelTitle:"API \u9884\u8BBE",panelHint:'\u7BA1\u7406\u591A\u7EC4 API \u8FDE\u63A5\u914D\u7F6E\u3002\u70B9\u51FB"\u52A0\u8F7D"\u6FC0\u6D3B\u67D0\u4E2A\u9884\u8BBE\u4F5C\u4E3A\u5F53\u524D API\uFF1B\u5176\u4ED6\u5DE5\u5177\u53EF\u5728\u914D\u7F6E\u9762\u677F\u4E2D\u6309\u9884\u8BBE\u540D\u5F15\u7528\u3002',store:qm,renderEditor:Vm,renderListItemMeta:Jm,hasSwitchToButton:!0,onSwitchTo:t=>{try{kn(t)}catch(e){kr.warn("switchToPreset",{err:e})}}}),Xm=Md});function vi(){return`wb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Mr(){let t=we.get(wi);return!t||typeof t!="object"?{}:t}function Dn(t){we.set(wi,t)}function rs(t){return typeof t=="string"&&t.startsWith(Qm)}function Zm(t){return rs(t)&&Nn.find(e=>e.id===t)||null}function Ti(t){if(!Array.isArray(t)){Nn=[];return}Nn=t.map(e=>ss({...e,id:String(e?.id||"")})).filter(e=>rs(e.id))}function ss(t={}){let e=String(t.id||vi()),r=Array.isArray(t.bookList)?t.bookList.map(s=>({bookName:String(s?.bookName||""),enabled:s?.enabled!==!1,entryOverrides:s?.entryOverrides&&typeof s.entryOverrides=="object"?s.entryOverrides:{}})).filter(s=>s.bookName):[];return{id:e,name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),bindingMode:t.bindingMode===ir.CUSTOM?ir.CUSTOM:ir.CHARACTER_CARD,includeDisabled:t.includeDisabled===!0,bookList:r,createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function eh(){let t=Mr(),e=Object.values(t).map(ss).sort((r,s)=>s.updatedAt-r.updatedAt);return[...Nn,...e]}function Po(t){if(!t)return null;if(rs(t))return Zm(t);let e=Mr();return e[t]?ss(e[t]):null}function Si(){let t=we.get(Ro);return typeof t=="string"&&t?t:""}function th(){let t=Si();return t?Po(t):null}function rh(t){if(t&&rs(t))return we.set(Ro,t),z.emit($.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0;let e=Mr();return t&&!e[t]?(Ir.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(we.set(Ro,t||""),z.emit($.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0)}function Ln(t={}){let e=ss({...t,id:vi(),createdAt:Date.now(),updatedAt:Date.now()}),r=Mr();return r[e.id]=e,Dn(r),z.emit($.PRESET_CREATED,{kind:"worldbook",id:e.id}),Ir.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function Nd(t,e={}){if(!t)return null;if(rs(t))return Ir.warn(`\u62D2\u7EDD\u4FEE\u6539\u5185\u7F6E\u9884\u8BBE: ${t}`),null;let r=Mr(),s=r[t];if(!s)return Ir.warn(`updatePreset \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),null;let o=ss({...s,...e,id:t,createdAt:s.createdAt,updatedAt:Date.now()});return r[t]=o,Dn(r),z.emit($.PRESET_UPDATED,{kind:"worldbook",id:t}),o}function sh(t){if(!t)return!1;if(rs(t))return Ir.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=Mr();return e[t]?(delete e[t],Dn(e),Si()===t&&we.set(Ro,""),z.emit($.PRESET_DELETED,{kind:"worldbook",id:t}),Ir.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function oh(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=Po(t);return r?Ln({...r,id:void 0,name:`${r.name}${e}`}):null}function nh(t,e){return rs(t)?(Ir.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):Nd(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function ah(){return{version:1,exportedAt:Date.now(),presets:Object.values(Mr()).map(ss)}}function ih(t){if(!t||typeof t!="object")return{added:0,skipped:0};let e=Array.isArray(t.presets)?t.presets:[],r=Mr(),s=0,o=0;for(let n of e){let a=ss({...n,id:vi(),createdAt:Date.now(),updatedAt:Date.now()});r[a.id]=a,s+=1}return Dn(r),s>0&&z.emit($.PRESET_IMPORTED,{kind:"worldbook",count:s}),{added:s,skipped:o}}function lh(){we.set(wi,{}),we.set(Ro,""),Ir.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u4E16\u754C\u4E66\u9884\u8BBE")}var Ir,wi,Ro,ir,Qm,Nn,zt,Ls=P(()=>{$e();He();G();Ir=C.createScope("WorldbookPresetStore"),wi="worldbook_presets",Ro="worldbook_current_preset",ir=Object.freeze({CHARACTER_CARD:"character_card",CUSTOM:"custom"});Qm="builtin_worldbook_",Nn=[];zt={listPresets:eh,getPreset:Po,getCurrentPresetId:Si,getCurrentPreset:th,setCurrentPresetId:rh,createPreset:Ln,updatePreset:Nd,deletePreset:sh,duplicatePreset:oh,renamePreset:nh,exportAll:ah,importPresets:ih,resetAll:lh,BINDING_MODES:ir}});function Rr(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function $n(){return Rr()?.SillyTavern||null}function he(t){return t==null?"":String(t).trim()}function dh(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let r of e)if(typeof r=="string"&&r.trim())return r.trim();return""}function uh(t){let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||t?.is_user===!0?"user":t?.is_system===!0?"system":"assistant"}function Ld(t=""){let e=String(t||"").trim();if(!e)return"empty";let r=0;for(let s=0;s<e.length;s+=1)r=(r<<5)-r+e.charCodeAt(s),r|=0;return`fp_${Math.abs(r).toString(36)}`}function $d(t={}){let e=he(t.chatId)||"chat_default",r=he(t.messageId)||"latest";return`${e}::${r}`}function Od(t={}){let e=$d(t),r=he(t.effectiveSwipeId)||"swipe:current",s=he(t.assistantContentFingerprint)||"empty";return`${e}::${r}::${s}`}function ph(t={}){let e=Od(t),r=he(t.eventType)||"MANUAL",s=he(t.traceId)||Bd("manual");return`${e}::${r}::${s}`}function Bd(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function zd(){let t=$n();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function Kd(t=[]){let e=[],r=null,s=null;return t.forEach((o,n)=>{let a=uh(o),i=dh(o);if(!i)return;let l=he(o?.messageId??o?.message_id??o?.id??o?.mid??o?.mesid??o?.chat_index??n),d=he(o?.swipe_id??o?.swipeId??o?.swipe??""),c={role:a,content:i,sourceId:l,swipeId:d,raw:o,index:n};e.push(c),a==="user"&&(r=c),a==="assistant"&&(s=c)}),{messages:e,lastUserMessage:r,lastAiMessage:s}}function yh(t,e,r){return he(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.this_chid??r?.id??"chat_default")||"chat_default"}async function _i(){let t=$n();if(!t)return null;try{let e=t.this_chid,r=t.characters||[];if(e>=0&&e<r.length){let s=r[e];return{id:e,name:s?.name||"",description:s?.description||"",personality:s?.personality||"",scenario:s?.scenario||"",firstMes:s?.first_mes||"",mesExample:s?.mes_example||""}}}catch(e){ch.error("\u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function fh(t="",e=null){let r=String(t||""),s=e?.YouYouToolkit_toolOutputs;return s&&typeof s=="object"&&Object.values(s).forEach(o=>{let n=String(o?.blockText||o?.content||"").trim();n&&r.includes(n)&&(r=r.replace(n,"").trimEnd())}),r.trim()}function gh(t,e={}){let r=Array.isArray(t?.messages)?t.messages:[],s=he(e.messageId),o=he(e.swipeId);if(!s)return t?.lastAiMessage||null;let n=r.filter(i=>i.role==="assistant"),a=n.find(i=>i.sourceId!==s?!1:o?he(i.swipeId)===o:!0);return a||n.find(i=>i.sourceId===s)||null}function Ud({api:t,stContext:e,character:r,conversation:s,targetAssistantMessage:o,runSource:n="MANUAL"}={}){let a=s?.messages||[],i=s?.lastUserMessage||null,l=he(o?.sourceId)||"",d=he(o?.swipeId)||"swipe:current",c=o?.content||"",u=fh(c,o?.raw||null),p=Ld(c),y=Ld(u),f=yh(t,e,r),g=Bd(String(n||"manual").toLowerCase()),b=$d({chatId:f,messageId:l}),v=Od({chatId:f,messageId:l,effectiveSwipeId:d,assistantContentFingerprint:y});return{startedAt:Date.now(),runSource:n,traceId:g,chatId:f,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:b,slotRevisionKey:v,slotTransactionId:ph({chatId:f,messageId:l,effectiveSwipeId:d,assistantContentFingerprint:y,eventType:n,traceId:g}),executionKey:v,lastAiMessage:c,assistantContentFingerprint:p,assistantBaseText:u,assistantBaseFingerprint:y,lastAiMessageSwipeId:d,confirmedAssistantSwipeId:d,effectiveSwipeId:d,sourceMessageId:l,sourceSwipeId:d,lastUserMessage:i?.content||"",userMessage:i?.content||"",targetAssistantMessage:o,chatMessages:a,characterCard:r,chatHistory:a,input:{userMessage:i?.content||"",lastAiMessage:c,assistantBaseText:u,extractedContent:"",previousToolOutput:"",context:{character:r?.name||"",chatLength:a.length||0}},config:{},status:"pending"}}async function os({runSource:t="MANUAL"}={}){let e=$n(),r=e?.getContext?.()||null,s=await _i(),o=zd(),n=Kd(o),a=n?.lastAiMessage||null;return Ud({api:e,stContext:r,character:s,conversation:n,targetAssistantMessage:a,runSource:t})}async function ns({messageId:t,swipeId:e="",runSource:r="AUTO"}={}){let s=$n(),o=s?.getContext?.()||null,n=await _i(),a=zd(),i=Kd(a),l=gh(i,{messageId:t,swipeId:e});return Ud({api:s,stContext:o,character:n,conversation:i,targetAssistantMessage:l,runSource:r})}var ch,as=P(()=>{G();ch=C.createScope("ExecutionContext")});function Ci(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return Rr()?.TavernHelper||null}function Wd(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return Rr()?.SillyTavern||null}function Os(t){return Array.isArray(t)?Array.from(new Set(t.map(e=>String(e||"").trim()).filter(Boolean))):[]}function Ei(t){if(Array.isArray(t))return t.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(t&&typeof t=="object"){let e={};return Object.keys(t).forEach(r=>{let s=t[r];Array.isArray(s)?e[r]=s.map(o=>typeof o=="string"?o:o&&typeof o=="object"?o.name||o.id||o.title||"[object]":String(o??"")):s&&typeof s=="object"?e[r]="[object]":e[r]=s}),e}return t}function hh(t={}){let e=typeof t.content=="string"?t.content.trim():"";if(!e)return"";let r=[t.comment,t.key,t.keysecondary,t.text].map(s=>String(s||"").trim()).find(Boolean);return r&&r!==e?`## ${r}
${e}`:e}function ki(){return Array.isArray(Ai)?[...Ai]:[]}async function jd(t){if(!t||typeof t.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(t.getCharLorebooks({type:"all"}));return Os([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return $s.warn("\u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function bh(t,e){if(t&&typeof t.getLorebooks=="function")try{let r=Os(await Promise.resolve(t.getLorebooks()));if(r.length>0)return r}catch(r){$s.warn("\u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}if(e&&typeof e.getWorldBooks=="function")try{let r=await Promise.resolve(e.getWorldBooks()),s=Os(Array.isArray(r)?r.map(o=>o?.name??o):[]);if(s.length>0)return s}catch(r){$s.warn("\u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}return[]}async function Ii(){let t=Ci(),e=Wd(),r={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!Rr()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!Rr()?.SillyTavern,helperKeys:t?Object.keys(t).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof t?.getLorebooks,getCharLorebooksType:typeof t?.getCharLorebooks,getLorebookEntriesType:typeof t?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{r.rawResults.getLorebooks=t&&typeof t.getLorebooks=="function"?Ei(await Promise.resolve(t.getLorebooks())):"[unavailable]"}catch(a){r.errors.push(`getLorebooks: ${a?.message||a}`)}try{r.rawResults.getCharLorebooks=t&&typeof t.getCharLorebooks=="function"?Ei(await Promise.resolve(t.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(a){r.errors.push(`getCharLorebooks: ${a?.message||a}`)}try{r.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?Ei(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(a){r.errors.push(`getWorldBooks: ${a?.message||a}`)}let s=await jd(t),o=await bh(t,e),n=Os([...s,...o]);return r.characterWorldbooks=[...s],r.allWorldbooks=[...o],r.combinedWorldbooks=[...n],mh=r,Ai=n,[...n]}async function On(t){let e="";if(typeof t=="string"?e=t:t&&typeof t=="object"&&(e=t?.worldbooks?.presetId||""),!e)return"";let r=Po(e);if(!r)return $s.warn(`buildSelectedWorldbookContent: \u9884\u8BBE\u4E0D\u5B58\u5728 ${e}`),"";let s=r.includeDisabled===!0,o=[];if(r.bindingMode==="character_card"){let i=Ci(),l=Wd(),d=await jd(i),c=new Map((r.bookList||[]).map(u=>[String(u.bookName||""),u]));for(let u of Os(d)){let p=c.get(u);p&&p.enabled===!1||o.push(u)}}else o=(r.bookList||[]).filter(i=>i&&i.bookName&&i.enabled!==!1).map(i=>i.bookName);if(o=Os(o),o.length===0)return"";let n=Ci();if(!n||typeof n.getLorebookEntries!="function")return $s.warn("TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let a=[];for(let i of o)try{let l=await n.getLorebookEntries(i),d=Array.isArray(l)?l:[],u=(s?d:d.filter(p=>p?.enabled!==!1&&!p?.disable)).map(hh).filter(Boolean).join(`

`);u&&a.push(`[\u4E16\u754C\u4E66\uFF1A${i}]
${u}`)}catch(l){$s.warn(`\u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${i}`,l)}return a.join(`

---

`)}var $s,Ai,mh,Bn=P(()=>{as();G();Ls();$s=C.createScope("ToolWorldbookService"),Ai=[],mh=null});var Yd={};re(Yd,{WorldbookPresetPanel:()=>Hd,default:()=>Eh});function wh(t){return t===ir.CUSTOM?"\u81EA\u5B9A\u4E49":"\u8DDF\u968F\u89D2\u8272\u5361"}function Fd(t,e,r){let s=[...t.bookList],o=s.findIndex(n=>n.bookName===e);o>=0?s[o]={...s[o],enabled:r}:s.push({bookName:e,enabled:r,entryOverrides:{}}),zt.updatePreset(t.id,{bookList:s})}function vh(t,e){let r=t.bookList.filter(s=>s.bookName!==e);zt.updatePreset(t.id,{bookList:r})}async function Th(t,e){let r=ki();if(!r.length)try{r=await Ii()}catch{}let s=new Set(t.bookList.map(c=>c.bookName)),o=r.filter(c=>!s.has(c));if(!o.length){await Ee.confirm({title:"\u6CA1\u6709\u53EF\u6DFB\u52A0\u7684\u4E16\u754C\u4E66",message:"\u5BBF\u4E3B\u672A\u63D0\u4F9B\u66F4\u591A\u53EF\u7528\u4E16\u754C\u4E66\uFF0C\u6216\u7F13\u5B58\u5185\u5168\u90E8\u5DF2\u52A0\u5165\u6B64\u9884\u8BBE\u3002",confirmText:"\u786E\u5B9A"});return}let n=m("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}}),a=m("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${o.length} \u672C\u4E16\u754C\u4E66\u2026`,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});n.appendChild(a);let i=m("div",{style:{display:"flex",flexDirection:"column",gap:"4px",maxHeight:"320px",overflowY:"auto"}}),l=new Set,d=[];for(let c of o){let u=m("label",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 10px",cursor:"pointer",borderRadius:"var(--yyt-radius-sm, 6px)",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",fontSize:"12px"}}),p=m("input",{attrs:{type:"checkbox",value:c}});p.addEventListener("change",()=>{p.checked?l.add(c):l.delete(c)}),u.appendChild(p),u.appendChild(m("span",{text:c,style:{color:"var(--yyt-text)"}})),i.appendChild(u),d.push({el:u,search:c.toLowerCase()})}n.appendChild(i),a.addEventListener("input",()=>{let c=a.value.trim().toLowerCase();for(let u of d)u.el.style.display=!c||u.search.includes(c)?"":"none"}),Ee.custom({title:`\u6DFB\u52A0\u4E16\u754C\u4E66\uFF08${o.length} \u9879\u53EF\u9009\uFF09`,width:"480px",body:n,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:c=>c(null)},{label:"\u5168\u9009\u53EF\u89C1",variant:"ghost",onClick:()=>{for(let c of i.querySelectorAll("input[type=checkbox]")){let u=c.closest("label");(!u||u.style.display!=="none")&&(c.checked=!0,l.add(c.value))}}},{label:"\u6DFB\u52A0\u9009\u4E2D",variant:"primary",onClick:c=>{let u=Array.from(l);if(!u.length){c(null);return}let p=u.map(f=>({bookName:f,enabled:!0,entryOverrides:{}})),y=[...t.bookList,...p];zt.updatePreset(t.id,{bookList:y}),c(u.length)}}]}).result.then(c=>{c&&e&&e()})}function Sh(t,{onChange:e,readonly:r,refresh:s}){let o=m("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});j(o,pt({label:"\u63CF\u8FF0",control:Je({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:u=>e({description:u})})})),j(o,pt({label:"\u7ED1\u5B9A\u6A21\u5F0F",hint:"\u8DDF\u968F\u89D2\u8272\u5361 = \u6CE8\u5165\u5F53\u524D\u89D2\u8272\u7ED1\u5B9A\u7684\u4E16\u754C\u4E66\uFF1B\u81EA\u5B9A\u4E49 = \u7528\u4E0B\u65B9\u624B\u52A8\u9009\u62E9\u7684\u5217\u8868",control:Ge({value:t.bindingMode,disabled:r,options:[{value:ir.CHARACTER_CARD,label:"\u8DDF\u968F\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09"},{value:ir.CUSTOM,label:"\u81EA\u5B9A\u4E49\uFF08\u56FA\u5B9A\u5217\u8868\uFF09"}],onChange:u=>{e({bindingMode:u}),s&&s()}})})),j(o,At({label:"\u5305\u542B\u7981\u7528\u8BCD\u6761",hint:"\u5F00\u542F\u540E\uFF1A\u6E90\u4E16\u754C\u4E66\u4E2D\u5DF2\u7981\u7528\u7684\u8BCD\u6761\u53EF\u88AB\u672C\u9884\u8BBE\u5F3A\u5236\u542F\u7528\u5E76\u6CE8\u5165",checked:t.includeDisabled,disabled:r,onChange:u=>e({includeDisabled:u})}));let n=t.bindingMode===ir.CHARACTER_CARD,a=ki(),i=m("div",{style:{display:"flex",flexDirection:"column"}}),l=m("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px",gap:"8px"}});l.appendChild(m("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}},m("div",{text:n?"\u968F\u89D2\u8272\u5361\u6CE8\u5165\u7684\u4E16\u754C\u4E66":"\u9009\u4E2D\u7684\u4E16\u754C\u4E66",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:n?"\u4EE5\u4E0B\u6765\u81EA\u5F53\u524D\u89D2\u8272\u5361\u7684\u4E16\u754C\u4E66\u5C06\u88AB\u6CE8\u5165\uFF1B\u53EF\u5355\u72EC\u5173\u95ED\u67D0\u672C\uFF08\u4E0D\u5F71\u54CD\u5176\u4ED6\u5DE5\u5177\uFF09":'\u672C\u9884\u8BBE\u56FA\u5B9A\u6CE8\u5165\u4E0B\u5217\u4E16\u754C\u4E66\uFF1B\u70B9\u51FB"+ \u6DFB\u52A0"\u4ECE\u53EF\u7528\u5217\u8868\u591A\u9009',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.5"}})));let d=m("div",{style:{display:"flex",gap:"6px"}});!n&&!r&&d.appendChild(de({label:"+ \u6DFB\u52A0",size:"small",onClick:()=>Th(t,s)}).el),d.appendChild(de({label:"\u{1F504} \u5237\u65B0",size:"small",variant:"ghost",onClick:async()=>{try{await Ii()}catch(u){xh.warn("\u5237\u65B0\u5931\u8D25",{e:u})}s&&s()}}).el),l.appendChild(d),j(i,l);let c=[];n?a.length?c=a.map(u=>{let p=t.bookList.find(f=>f.bookName===u),y=p?p.enabled!==!1:!0;return Mn({name:u,desc:y?"\u5DF2\u542F\u7528 \xB7 \u6574\u672C\u6CE8\u5165":"\u5DF2\u7981\u7528",actions:[At({checked:y,disabled:r,onChange:f=>Fd(t,u,f)})]})}):c=[m("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5F53\u524D\u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014 \u5207\u6362\u5230"\u81EA\u5B9A\u4E49"\u53EF\u4EE5\u624B\u52A8\u9009\u62E9\u4EFB\u610F\u4E16\u754C\u4E66\u3002'})]:t.bookList.length?c=t.bookList.map(u=>Mn({name:u.bookName,desc:u.enabled===!1?"\u5DF2\u7981\u7528":"\u5DF2\u542F\u7528 \xB7 \u6574\u672C\u6CE8\u5165",actions:[At({checked:u.enabled!==!1,disabled:r,onChange:p=>Fd(t,u.bookName,p)}),...r?[]:[de({label:"\xD7",size:"small",variant:"ghost",title:"\u4ECE\u9884\u8BBE\u79FB\u9664",onClick:()=>{vh(t,u.bookName),s&&s()}})]]})):c=[m("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u6DFB\u52A0"\u9009\u62E9\u4E16\u754C\u4E66\u52A0\u5165\u6B64\u9884\u8BBE\u3002'})];for(let u of c)u?.el?j(i,u.el):u instanceof Node&&j(i,u);return j(o,i),o}function _h(t){let e=[`${wh(t.bindingMode)}`,`${t.bookList.length} \u672C`];return t.includeDisabled&&e.push("\u542B\u7981\u7528"),e}var xh,Hd,Eh,Gd=P(()=>{ar();Ls();Bn();Pn();G();Mo();xh=C.createScope("WorldbookPresetPanel");Hd=Cr({id:"worldbookPresetPanel",kind:"worldbook",panelTitle:"\u4E16\u754C\u4E66\u9884\u8BBE",panelHint:"\u7BA1\u7406\u4E16\u754C\u4E66\u6CE8\u5165\u9884\u8BBE\u3002\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\uFF0C\u53EF\u7ED1\u5B9A\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09\u6216\u56FA\u5B9A\u5217\u8868\u3002",store:zt,renderEditor:Sh,renderListItemMeta:_h}),Eh=Hd});var $i={};re($i,{MESSAGE_MACROS:()=>mu,addTagRule:()=>nu,createRuleTemplate:()=>tu,default:()=>kh,deleteRulePreset:()=>pu,deleteRuleTemplate:()=>su,deleteTagRule:()=>iu,escapeRegex:()=>is,exportRulesConfig:()=>yu,extractComplexTag:()=>Vd,extractCurlyBraceTag:()=>Di,extractHtmlFormatTag:()=>Jd,extractSimpleTag:()=>Ni,extractTagContent:()=>cr,generateTagSuggestions:()=>Qd,getAllRulePresets:()=>du,getAllRuleTemplates:()=>Zd,getContentBlacklist:()=>zs,getRuleTemplate:()=>eu,getTagRules:()=>Bs,importRulesConfig:()=>fu,isValidTagName:()=>Pi,loadRulePreset:()=>uu,saveRulesAsPreset:()=>cu,scanTextForTags:()=>Xd,setContentBlacklist:()=>lu,setTagRules:()=>ou,shouldSkipContent:()=>Ri,testRegex:()=>gu,updateRuleTemplate:()=>ru,updateTagRule:()=>au});function Ah(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...Mi],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function yt(){return N.get(qd,Ah())}function qt(t){N.set(qd,t)}function zn(){let t=yt();return tt=t.ruleTemplates||[...Mi],ke=t.tagRules||[],ct=t.contentBlacklist||[],{ruleTemplates:tt,tagRules:ke,contentBlacklist:ct}}function is(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ri(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let r=t.toLowerCase();return e.some(s=>{let o=s.trim().toLowerCase();return o&&r.includes(o)})}function Pi(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!Ch.includes(t.toLowerCase())}function Ni(t,e){if(!t||!e)return[];let r=[],s=is(e),o=new RegExp(`<${s}>([\\s\\S]*?)<\\/${s}>`,"gi");[...t.matchAll(o)].forEach(l=>{l[1]&&r.push(l[1].trim())});let a=(t.match(new RegExp(`<${s}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${s}>`,"gi"))||[]).length;return a>i&&lr.warn(`\u53D1\u73B0 ${a-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),r}function Di(t,e){if(!t||!e)return[];let r=[],s=is(e),o=new RegExp(`\\{${s}\\|`,"gi"),n;for(;(n=o.exec(t))!==null;){let a=n.index,i=a+n[0].length,l=1,d=i;for(;d<t.length&&l>0;)t[d]==="{"?l++:t[d]==="}"&&l--,d++;if(l===0){let c=t.substring(i,d-1);c.trim()&&r.push(c.trim())}o.lastIndex=a+1}return r}function Vd(t,e){if(!t||!e)return[];let r=e.split(",");if(r.length!==2)return lr.error(`\u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let s=r[0].trim(),o=r[1].trim(),n=o.match(/<\/(\w+)>/);if(!n)return lr.error(`\u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${o}`),[];let a=n[1],i=new RegExp(`${is(s)}([\\s\\S]*?)<\\/${a}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(c=>{c[1]&&l.push(c[1].trim())}),l}function Jd(t,e){if(!t||!e)return[];let r=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!r)return lr.error(`\u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let s=r[1],o=[],n=new RegExp(`<${s}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${s}>`,"gi");[...t.matchAll(n)].forEach(d=>{d[1]&&o.push(d[1].trim())});let i=(t.match(new RegExp(`<${s}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${s}>`,"gi"))||[]).length;return i>l&&lr.warn(`\u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${s}> \u6807\u7B7E`),o}function cr(t,e,r=[]){if(!t)return"";if(!e||e.length===0)return t;let s=e.filter(c=>c.type==="exclude"&&c.enabled),o=e.filter(c=>(c.type==="include"||c.type==="regex_include")&&c.enabled),n=e.filter(c=>c.type==="regex_exclude"&&c.enabled),a=t;for(let c of s)try{let u=new RegExp(`<${is(c.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${is(c.value)}>`,"gi");a=a.replace(u,"")}catch(u){lr.error("Error applying block exclusion rule:",{rule:c,error:u})}let i=[];if(o.length>0)for(let c of o){let u=[];try{if(c.type==="include")u.push(...Ni(a,c.value)),u.push(...Di(a,c.value));else if(c.type==="regex_include"){let p=new RegExp(c.value,"gi");[...a.matchAll(p)].forEach(f=>{f[1]&&u.push(f[1])})}}catch(p){lr.error("Error applying inclusion rule:",{rule:c,error:p})}u.forEach(p=>i.push(p.trim()))}else i.push(a);let l=[];for(let c of i){for(let u of n)try{let p=new RegExp(u.value,"gi");c=c.replace(p,"")}catch(p){lr.error("Error applying cleanup rule:",{rule:u,error:p})}Ri(c,r)||l.push(c)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function Xd(t,e={}){let r=performance.now(),{chunkSize:s=5e4,maxTags:o=100,timeoutMs:n=5e3}=e,a=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,d=0;for(let u=0;u<t.length;u+=s){let p=t.slice(u,Math.min(u+s,t.length));if(d++,l+=p.length,performance.now()-r>n){lr.warn(`Tag scanning timed out after ${n}ms`);break}let y;for(;(y=i.exec(p))!==null&&a.size<o;){let f=(y[1]||y[2]).toLowerCase();Pi(f)&&a.add(f)}if(a.size>=o)break;d%5===0&&await new Promise(f=>setTimeout(f,0))}let c=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(c-r),processedChars:l,totalChars:t.length,chunkCount:d,tagsFound:a.size}}}function Qd(t,e=25){let r=t.tags.slice(0,e);return{suggestions:r,stats:{totalFound:t.stats.tagsFound,finalCount:r.length}}}function Zd(){return tt.length===0&&zn(),tt}function eu(t){return tt.find(e=>e.id===t)}function tu(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return tt.push(e),Li(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function ru(t,e){let r=tt.findIndex(s=>s.id===t);return r===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(tt[r]={...tt[r],...e,updatedAt:new Date().toISOString()},Li(),{success:!0,template:tt[r],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function su(t){let e=tt.findIndex(r=>r.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(tt.splice(e,1),Li(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function Li(){let t=yt();t.ruleTemplates=tt,qt(t)}function Bs(){return ke||zn(),ke}function ou(t){ke=t||[];let e=yt();e.tagRules=ke,qt(e)}function nu(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};ke.push(e);let r=yt();return r.tagRules=ke,qt(r),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function au(t,e){if(t<0||t>=ke.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};ke[t]={...ke[t],...e};let r=yt();return r.tagRules=ke,qt(r),{success:!0,rule:ke[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function iu(t){if(t<0||t>=ke.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};ke.splice(t,1);let e=yt();return e.tagRules=ke,qt(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function zs(){return ct||zn(),ct}function lu(t){ct=t||[];let e=yt();e.contentBlacklist=ct,qt(e)}function cu(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=yt();r.tagRulePresets||(r.tagRulePresets={});let s=`preset-${Date.now()}`;return r.tagRulePresets[s]={id:s,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(ke)),blacklist:JSON.parse(JSON.stringify(ct)),createdAt:new Date().toISOString()},qt(r),{success:!0,preset:r.tagRulePresets[s],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function du(){let e=yt().tagRulePresets||{};return Object.values(e)}function uu(t){let e=yt(),s=(e.tagRulePresets||{})[t];return s?(ke=JSON.parse(JSON.stringify(s.rules||[])),ct=JSON.parse(JSON.stringify(s.blacklist||[])),e.tagRules=ke,e.contentBlacklist=ct,qt(e),{success:!0,preset:s,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function pu(t){let e=yt(),r=e.tagRulePresets||{};return r[t]?(delete r[t],e.tagRulePresets=r,qt(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function yu(){return JSON.stringify({tagRules:ke,contentBlacklist:ct,ruleTemplates:tt,tagRulePresets:yt().tagRulePresets||{}},null,2)}function fu(t,e={overwrite:!0}){try{let r=JSON.parse(t);if(e.overwrite)ke=r.tagRules||[],ct=r.contentBlacklist||[],tt=r.ruleTemplates||Mi;else if(r.tagRules&&ke.push(...r.tagRules),r.contentBlacklist){let o=new Set(ct.map(n=>n.toLowerCase()));r.contentBlacklist.forEach(n=>{o.has(n.toLowerCase())||ct.push(n)})}let s=yt();return s.tagRules=ke,s.contentBlacklist=ct,s.ruleTemplates=tt,r.tagRulePresets&&(s.tagRulePresets={...s.tagRulePresets||{},...r.tagRulePresets}),qt(s),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(r){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function gu(t,e,r="g",s=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let o=new RegExp(t,r),n=[];if(r.includes("g")){let a;for(;(a=o.exec(e))!==null;)a.length>1?n.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[s]||a[1]||a[0]}):n.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=o.exec(e);a&&n.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[s]||a[1]:a[0]})}return{success:!0,matches:n,count:n.length,extracted:n.map(a=>a.extracted)}}catch(o){return{success:!1,error:o.message,matches:[]}}}var lr,qd,Ch,Mi,tt,ke,ct,mu,kh,Ks=P(()=>{$e();G();lr=C.createScope("RegexExtractor"),qd="settings";Ch=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],Mi=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],tt=[],ke=[],ct=[];mu={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};zn();kh={extractTagContent:cr,extractSimpleTag:Ni,extractCurlyBraceTag:Di,extractComplexTag:Vd,extractHtmlFormatTag:Jd,escapeRegex:is,shouldSkipContent:Ri,isValidTagName:Pi,scanTextForTags:Xd,generateTagSuggestions:Qd,getAllRuleTemplates:Zd,getRuleTemplate:eu,createRuleTemplate:tu,updateRuleTemplate:ru,deleteRuleTemplate:su,getTagRules:Bs,setTagRules:ou,addTagRule:nu,updateTagRule:au,deleteTagRule:iu,getContentBlacklist:zs,setContentBlacklist:lu,saveRulesAsPreset:cu,getAllRulePresets:du,loadRulePreset:uu,deleteRulePreset:pu,exportRulesConfig:yu,importRulesConfig:fu,testRegex:gu,MESSAGE_MACROS:mu}});var _u={};re(_u,{createDefaultToolDefinition:()=>ls,default:()=>Ph,deleteTool:()=>Ws,deleteToolPreset:()=>vu,exportTools:()=>js,getAllTools:()=>Vt,getCurrentToolPreset:()=>Tu,getTool:()=>Jt,getToolPresets:()=>Un,importTools:()=>Fs,normalizeToolDefinitionToRuntimeConfig:()=>Do,resetTools:()=>Hs,saveTool:()=>Us,saveToolPreset:()=>wu,setCurrentToolPreset:()=>Su,setToolEnabled:()=>Wn});function Ih(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,r])=>[e,ls({...r||{},id:e})]))}function No(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function Oi(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>0?r:e}function hu(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>=0?r:e}function bu(t={}){return{settleMs:hu(t?.settleMs,1200),cooldownMs:hu(t?.cooldownMs,5e3)}}function xu(t={}){return{enabled:t?.enabled===!0,selected:No(t?.selected),presetId:typeof t?.presetId=="string"?t.presetId:""}}function Mh(t=[]){let e=Array.isArray(t)?t.map(r=>({role:String(r?.role||"user").trim().toUpperCase(),content:String(r?.content||"").trim()})).filter(r=>r.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(r=>`\u3010${r.role||"USER"}\u3011
${r.content}`).join(`

`)}function Rh(t,e={}){let r=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(r)return r;let s=Mh(e?.config?.messages||[]);return s||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function ls(t={}){let e=new Date().toISOString(),r=t?.config||{};return{...Ct,...t,id:t?.id||Ct.id,icon:t?.icon||Ct.icon,order:Number.isFinite(t?.order)?t.order:Ct.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:Ct.promptTemplate,extractTags:No(t?.extractTags),config:{execution:{...Ct.config.execution,...r.execution||{},timeout:Oi(r?.execution?.timeout,Ct.config.execution.timeout),retries:Math.max(0,parseInt(r?.execution?.retries,10)||Ct.config.execution.retries)},api:{...Ct.config.api,...r.api||{}},messages:Array.isArray(r?.messages)?r.messages:[],context:{...Ct.config.context,...r.context||{},depth:Oi(r?.context?.depth,Ct.config.context.depth),includeTags:No(r?.context?.includeTags),excludeTags:No(r?.context?.excludeTags)},automation:bu(r?.automation),worldbooks:xu(r?.worldbooks)},enabled:t?.enabled!==!1,metadata:{...Ct.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function Do(t,e={},r={}){let s=ls({...e,id:t||e?.id||""}),o=No(s?.extractTags?.length?s.extractTags:s?.config?.context?.includeTags),n=String(e?.output?.apiPreset||s?.config?.api?.preset||"").trim(),a=Rh(t,s),i=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():r.defaultOutputMode||"follow_ai";return{id:s.id||t,name:s.name||t,icon:s.icon||"fa-screwdriver-wrench",description:s.description||"",enabled:s.enabled!==!1,order:Number.isFinite(s.order)?s.order:100,bypass:{enabled:s?.config?.api?.useBypass===!0&&!!s?.config?.api?.bypassPreset,presetId:s?.config?.api?.bypassPreset||""},output:{mode:i,apiPreset:n,overwrite:!0,enabled:!0},automation:bu(s?.config?.automation),worldbooks:xu(s?.config?.worldbooks),extraction:{enabled:!0,maxMessages:Oi(s?.config?.context?.depth,5),selectors:o,regexPresetId:typeof s?.config?.extraction?.regexPresetId=="string"?s.config.extraction.regexPresetId:"",writebackTag:typeof s?.config?.extraction?.writebackTag=="string"?s.config.extraction.writebackTag:""},promptTemplate:a,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:n,extractTags:o,isCustom:!0,category:s.category||"utility",metadata:{...s.metadata||{}}}}function Vt(){let t=me.get(Re.TOOLS),e=Ih(t);return t&&JSON.stringify(t)!==JSON.stringify(e)&&me.set(Re.TOOLS,e),{...Kn,...e}}function Jt(t){return Vt()[t]||null}function Us(t,e){if(!t||!e)return!1;let r=me.get(Re.TOOLS)||{},s=!r[t]&&!Kn[t],o=ls({...r[t]||{},...e,id:t,metadata:{...r[t]?.metadata||{},...e.metadata||{},createdAt:r[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return r[t]=o,me.set(Re.TOOLS,r),z.emit(s?$.TOOL_REGISTERED:$.TOOL_UPDATED,{toolId:t,tool:o}),!0}function Ws(t){let e=me.get(Re.TOOLS)||{};return!e[t]&&!Kn[t]||Kn[t]?!1:(delete e[t],me.set(Re.TOOLS,e),z.emit($.TOOL_UNREGISTERED,{toolId:t}),!0)}function Un(){return me.get(Re.PRESETS)||{}}function wu(t,e){if(!t||!e)return!1;let r=Un(),s=!r[t];return r[t]={...e,name:t,updatedAt:new Date().toISOString()},me.set(Re.PRESETS,r),z.emit(s?$.PRESET_CREATED:$.PRESET_UPDATED,{type:"tool",presetName:t,preset:r[t]}),!0}function vu(t){let e=Un();return e[t]?(delete e[t],me.set(Re.PRESETS,e),z.emit($.PRESET_DELETED,{type:"tool",presetName:t}),!0):!1}function Tu(){return me.get(Re.CURRENT_PRESET)||""}function Su(t){return me.set(Re.CURRENT_PRESET,t||""),z.emit($.PRESET_ACTIVATED,{type:"tool",presetName:t}),!0}function Wn(t,e){let r=Jt(t);if(!r)return!1;let s=me.get(Re.TOOLS)||{};return s[t]=ls({...r,id:t,enabled:e,metadata:{...r?.metadata||{},createdAt:r?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),me.set(Re.TOOLS,s),z.emit(e?$.TOOL_ENABLED:$.TOOL_DISABLED,{toolId:t,enabled:e}),!0}function js(){let t=me.get(Re.TOOLS)||{},e=me.get(Re.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function Fs(t,e=!1){try{let r=typeof e=="object"?!!e?.overwrite:!!e,s=JSON.parse(t);if(!s||typeof s!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let o=r?{}:me.get(Re.TOOLS)||{},n=r?{}:me.get(Re.PRESETS)||{},a=0,i=0;if(s.tools&&typeof s.tools=="object"){for(let[l,d]of Object.entries(s.tools))!d||typeof d!="object"||(o[l]=ls({...d,id:l}),a+=1);me.set(Re.TOOLS,o)}if(s.presets&&typeof s.presets=="object"){for(let[l,d]of Object.entries(s.presets))!d||typeof d!="object"||(n[l]={...d,name:l,updatedAt:new Date().toISOString()},i+=1);me.set(Re.PRESETS,n)}return{success:!0,toolsImported:a,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(r){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function Hs(){me.remove(Re.TOOLS),me.remove(Re.PRESETS),me.remove(Re.CURRENT_PRESET)}var Ct,Kn,Re,Ph,Lo=P(()=>{$e();He();Ct={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},Kn={},Re={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};Ph={getAllTools:Vt,getTool:Jt,saveTool:Us,deleteTool:Ws,setToolEnabled:Wn,exportTools:js,importTools:Fs,resetTools:Hs,getToolPresets:Un,saveToolPreset:wu,deleteToolPreset:vu,getCurrentToolPreset:Tu,setCurrentToolPreset:Su,createDefaultToolDefinition:ls,normalizeToolDefinitionToRuntimeConfig:Do}});var Fi={};re(Fi,{TOOL_CATEGORIES:()=>Eu,TOOL_REGISTRY:()=>Ys,appendToolRuntimeHistory:()=>Ou,clearToolApiPreset:()=>Du,default:()=>Kh,ensureToolRuntimeConfig:()=>Gs,getAllDefaultToolConfigs:()=>zu,getAllToolApiBindings:()=>Lu,getAllToolFullConfigs:()=>Bo,getEnabledTools:()=>Ku,getToolApiPreset:()=>Wi,getToolBaseConfig:()=>jn,getToolConfig:()=>Oo,getToolFullConfig:()=>oe,getToolList:()=>Mu,getToolSubTabs:()=>Ru,getToolWindowState:()=>Wu,hasTool:()=>Ui,onPresetDeleted:()=>$u,patchToolRuntime:()=>Nr,registerTool:()=>ku,resetToolConfig:()=>Bu,resetToolRegistry:()=>Pu,saveToolConfig:()=>ve,saveToolWindowState:()=>Uu,setToolApiPreset:()=>Nu,setToolApiPresetConfig:()=>Oh,setToolBypassConfig:()=>Bh,setToolOutputMode:()=>$h,setToolPromptTemplate:()=>zh,unregisterTool:()=>Iu,updateToolRuntime:()=>ji});function cs(t={}){let e=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(t?.lastRunAt)?t.lastRunAt:0,lastStatus:typeof t?.lastStatus=="string"?t.lastStatus:"idle",lastError:typeof t?.lastError=="string"?t.lastError:"",lastDurationMs:Number.isFinite(t?.lastDurationMs)?t.lastDurationMs:0,successCount:Number.isFinite(t?.successCount)?t.successCount:0,errorCount:Number.isFinite(t?.errorCount)?t.errorCount:0,lastMessageKey:typeof t?.lastMessageKey=="string"?t.lastMessageKey:"",lastExecutionKey:typeof t?.lastExecutionKey=="string"?t.lastExecutionKey:"",lastExecutionPath:typeof t?.lastExecutionPath=="string"?t.lastExecutionPath:"",lastWritebackStatus:typeof t?.lastWritebackStatus=="string"?t.lastWritebackStatus:"",lastFailureStage:typeof t?.lastFailureStage=="string"?t.lastFailureStage:"",lastSlotBindingKey:typeof t?.lastSlotBindingKey=="string"?t.lastSlotBindingKey:"",lastSlotRevisionKey:typeof t?.lastSlotRevisionKey=="string"?t.lastSlotRevisionKey:"",lastSlotTransactionId:typeof t?.lastSlotTransactionId=="string"?t.lastSlotTransactionId:"",lastSourceMessageId:typeof t?.lastSourceMessageId=="string"?t.lastSourceMessageId:"",lastSourceSwipeId:typeof t?.lastSourceSwipeId=="string"?t.lastSourceSwipeId:"",lastContentCommitted:t?.lastContentCommitted===!0,lastHostCommitApplied:t?.lastHostCommitApplied===!0,lastRefreshRequested:t?.lastRefreshRequested===!0,lastRefreshConfirmed:t?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof t?.lastPreferredCommitMethod=="string"?t.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof t?.lastAppliedCommitMethod=="string"?t.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(t?.lastRefreshMethodCount)?t.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(t?.lastRefreshMethods)?t.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(t?.lastRefreshConfirmChecks)?t.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof t?.lastRefreshConfirmedBy=="string"?t.lastRefreshConfirmedBy:"",lastTraceId:typeof t?.lastTraceId=="string"?t.lastTraceId:"",lastAutoRunAt:Number.isFinite(t?.lastAutoRunAt)?t.lastAutoRunAt:0,lastAutoStatus:typeof t?.lastAutoStatus=="string"?t.lastAutoStatus:"idle",lastAutoMessageId:typeof t?.lastAutoMessageId=="string"?t.lastAutoMessageId:"",lastAutoSwipeId:typeof t?.lastAutoSwipeId=="string"?t.lastAutoSwipeId:"",lastAutoRevisionKey:typeof t?.lastAutoRevisionKey=="string"?t.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof t?.lastAutoWritebackStatus=="string"?t.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:t?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof t?.lastAutoSkipReason=="string"?t.lastAutoSkipReason:"",recentWritebackHistory:e}}function Nh(t,e=10){let r=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=r?t:t.slice(t.length-r):[]}function Au(){let t=Vt()||{};return Object.entries(t).filter(([e])=>!$o[e]).map(([e,r])=>[e,r||{}])}function Bi(t={}){return t?.toolKind==="script"?"script":t?.toolKind==="ai"?"ai":t?.output?.mode==="local_transform"||t?.processor?.type?"script":"ai"}function Cu(){let t=Array.isArray(Ys.tools?.subTabs)?Ys.tools.subTabs.map((r,s)=>({...r,order:Number.isFinite(r?.order)?r.order:s,toolKind:Bi(r),toolGroupLabel:Bi(r)==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"})):[],e=Au().map(([r,s],o)=>{let n=Do(r,s),a=Bi(n);return{id:r,name:n.name||r,icon:n.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(n.order)?n.order:100+o,isCustom:!0,description:n.description||"",toolKind:a,toolGroupLabel:a==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"}});return[...t,...e].sort((r,s)=>(r.order??0)-(s.order??0))}function Dh(t,e={}){let r=Do(t,e,{defaultOutputMode:"follow_ai"});return{...r,runtime:cs(r.runtime)}}function Ki(t){let e=$o[t];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:cs(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let s=(Vt()||{})[t]||null;return s?Dh(t,s):Oo(t)}function jn(t){let e=Ki(t);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function Lh(t,e={},r=""){if(!t)return null;let s={...t,...e,id:t.id||e.id};s.output={...t.output||{},...e.output||{}},s.automation={settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(t?.automation?.settleMs)?t.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(t?.automation?.cooldownMs)?t.automation.cooldownMs:5e3},s.bypass={...t.bypass||{},...e.bypass||{}},s.worldbooks={...t.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(t?.worldbooks?.selected)?[...t.worldbooks.selected]:[]},s.runtime=cs({...t.runtime||{},...e.runtime||{}}),s.extraction={...t.extraction||{},...e.extraction||{}},s.processor={...t.processor||{},...e.processor||{},options:{...t?.processor?.options||{},...e?.processor?.options||{}}};let o=e?.output?.apiPreset||e?.apiPreset||s.output?.apiPreset||s.apiPreset||r||"";return s.output={...s.output||{},apiPreset:o},s.apiPreset=o,t.isCustom?s.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?s.enabled=e.enabled:s.enabled=t.enabled!==!1,s}function ku(t,e){if(!t||typeof t!="string")return at.error("\u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return at.error("\u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let r=["name","icon","component"];for(let s of r)if(!e[s])return at.error(` \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${s}`),!1;return Xt[t]={id:t,...e,order:e.order??Object.keys(Xt).length},at.log(` \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function Iu(t){return Xt[t]?(delete Xt[t],at.log(` \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(at.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function Mu(t=!0){let e=Object.values(Xt).map(r=>r.id==="tools"?{...r,subTabs:Cu()}:r);return t?e.sort((r,s)=>(r.order??0)-(s.order??0)):e}function Oo(t){return t==="tools"&&Xt[t]?{...Xt[t],subTabs:Cu()}:Xt[t]||null}function Ui(t){return!!Xt[t]}function Ru(t){let e=Oo(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function Pu(){Xt={...Ys},at.log("\u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Nu(t,e){if(!Ui(t))return at.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let r=N.get(kt)||{};return r[t]=e||"",N.set(kt,r),at.log(` \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function Wi(t){return(N.get(kt)||{})[t]||""}function Du(t){let e=N.get(kt)||{};delete e[t],N.set(kt,e),at.log(` \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function Lu(){return N.get(kt)||{}}function $u(t){let e=N.get(kt)||{},r=!1;for(let s in e)e[s]===t&&(e[s]="",r=!0,at.log(` \u5DE5\u5177 "${s}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));r&&N.set(kt,e)}function oe(t){let e=Ki(t);if(!e)return Oo(t);let s=(N.get(Pr)||{})[t]||{},o=Wi(t),n=Lh({...e,id:t},s,o);return typeof window<"u"&&window.YYT_PRESET_DEBUG&&typeof console<"u"&&console.log&&console.log(`[YYT-DEBUG][getToolFullConfig] ${t}`,{base_extraction:JSON.parse(JSON.stringify(e.extraction||{})),base_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),user_extraction:JSON.parse(JSON.stringify(s.extraction||{})),user_worldbooks:JSON.parse(JSON.stringify(s.worldbooks||{})),merged_extraction:JSON.parse(JSON.stringify(n.extraction||{})),merged_worldbooks:JSON.parse(JSON.stringify(n.worldbooks||{}))}),n}function Gs(t){if(!t)return!1;let e=Ki(t);if(!e)return!1;let r=N.get(Pr)||{};if(r[t])return!0;let s={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};r[t]=s,N.set(Pr,r);let o=N.get(kt)||{};return o[t]=s.output?.apiPreset||s.apiPreset||"",N.set(kt,o),z.emit($.TOOL_UPDATED,{toolId:t,config:s}),!0}function ve(t,e,r={}){if(!t||!oe(t))return at.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:s=!0}=r,o=N.get(Pr)||{},n=N.get(kt)||{},a=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return o[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){o[t][l]={...e.output,apiPreset:a};return}if(l==="apiPreset"){o[t][l]=a;return}o[t][l]=e[l]}}),o[t].apiPreset===void 0&&(o[t].apiPreset=a),!o[t].output&&e.output!==void 0&&(o[t].output={...e.output||{},apiPreset:a}),N.set(Pr,o),n[t]=a,N.set(kt,n),typeof window<"u"&&window.YYT_PRESET_DEBUG&&typeof console<"u"&&console.log&&console.log(`[YYT-DEBUG][saveToolConfig] ${t}`,{input_extraction:JSON.parse(JSON.stringify(e.extraction||{})),input_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),saved_extraction:JSON.parse(JSON.stringify(o[t].extraction||{})),saved_worldbooks:JSON.parse(JSON.stringify(o[t].worldbooks||{})),verify_storage:JSON.parse(JSON.stringify((N.get(Pr)||{})[t]?.extraction||{}))}),s&&z.emit($.TOOL_UPDATED,{toolId:t,config:o[t]}),at.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function $h(t,e){let r=oe(t);return r?ve(t,{...r,output:{...r.output,mode:e}}):!1}function Oh(t,e){let r=oe(t);return r?ve(t,{...r,apiPreset:e,output:{...r.output,apiPreset:e}}):!1}function Bh(t,e){let r=oe(t);return r?ve(t,{...r,bypass:{...r.bypass,...e}}):!1}function zh(t,e){let r=oe(t);return r?ve(t,{...r,promptTemplate:e}):!1}function Nr(t,e,r={}){let s=oe(t);if(!s)return!1;let{touchLastRunAt:o=!1,emitEvent:n=!1,emitRuntimeEvent:a=!0}=r,i=cs({...s.runtime||{},...e||{}});o&&(i.lastRunAt=Date.now());let l=ve(t,{...s,runtime:i},{emitEvent:n});return l&&a&&z.emit($.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:i,previousRuntime:cs(s.runtime||{})}),l}function Ou(t,e,r={},s={}){let o=oe(t);if(!o)return!1;let{limit:n=10,emitEvent:a=!1,emitRuntimeEvent:i=!0}=s,l=cs(o.runtime||{}),d=cs(o.runtime||{}),c="recentWritebackHistory",u={id:r?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:r?.at||Date.now(),...r};l[c]=Nh([...Array.isArray(l[c])?l[c]:[],u],n),u?.traceId&&(l.lastTraceId=u.traceId);let p=ve(t,{...o,runtime:l},{emitEvent:a});return p&&i&&z.emit($.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:l,previousRuntime:d,historyType:e,historyEntry:u}),p}function ji(t,e,r={}){let{touchLastRunAt:s=!0,emitEvent:o=!1,emitRuntimeEvent:n=!0}=r;return Nr(t,e,{touchLastRunAt:s,emitEvent:o,emitRuntimeEvent:n})}function Bu(t){if(!t||!$o[t])return at.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=N.get(Pr)||{};return delete e[t],N.set(Pr,e),z.emit($.TOOL_UPDATED,{toolId:t,config:null}),at.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function zu(){return{...$o}}function Bo(){let t=new Set([...Object.keys($o),...Au().map(([e])=>e)]);return Array.from(t).map(e=>oe(e)).filter(Boolean)}function Ku(){return Bo().filter(t=>t&&t.enabled)}function Uu(t,e){let r=N.get(zi)||{};r[t]={...e,updatedAt:Date.now()},N.set(zi,r)}function Wu(t){return(N.get(zi)||{})[t]||null}var at,Pr,kt,zi,$o,Ys,Eu,Xt,Kh,Qt=P(()=>{$e();He();G();Lo();at=C.createScope("ToolRegistry"),Pr="tool_configs",kt="tool_api_bindings",zi="tool_window_states";$o={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,regexPresetId:"builtin_regex_summary"},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:[]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},Ys={presetManagement:{id:"presetManagement",name:"\u9884\u8BBE\u7BA1\u7406",icon:"fa-bookmark",hasSubTabs:!0,description:"\u7EDF\u4E00\u7BA1\u7406 API / \u6B63\u5219 / \u4E16\u754C\u4E66 / \u8868\u683C\u6A21\u677F\u9884\u8BBE",order:0,subTabs:[{id:"apiPresets",name:"API \u9884\u8BBE",icon:"fa-database",component:"ApiPresetPanel",presetKind:"api"},{id:"regexPresets",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",component:"RegexExtractPanel",presetKind:"regex"},{id:"worldbookPresets",name:"\u4E16\u754C\u4E66",icon:"fa-book-atlas",component:"WorldbookPresetPanel",presetKind:"worldbook"},{id:"tableTemplates",name:"\u8868\u683C\u6A21\u677F",icon:"fa-table-list",component:"TableTemplatePanel",presetKind:"table"}]},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel",toolKind:"ai"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel",toolKind:"ai"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel",toolKind:"ai"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel",toolKind:"script"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel",toolKind:"script"}]},tableWorkbench:{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",icon:"fa-table-cells",hasSubTabs:!1,description:"\u7ED3\u6784\u5316\u586B\u8868\u4E0E\u72B6\u6001\u9884\u89C8\u5DE5\u4F5C\u53F0",component:"TableWorkbenchPanel",order:5},bypass:{id:"bypass",name:"Ai\u6307\u4EE4\u9884\u8BBE",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406 Ai \u6307\u4EE4\u9884\u8BBE",component:"BypassPanel",order:6},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:7},logger:{id:"logger",name:"\u65E5\u5FD7",icon:"fa-terminal",hasSubTabs:!1,description:"\u67E5\u770B\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7\uFF0C\u652F\u6301\u8FC7\u6EE4\u4E0E\u5BFC\u51FA",component:"LoggerPanel",order:8}},Eu={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},Xt={...Ys};Kh={TOOL_REGISTRY:Ys,TOOL_CATEGORIES:Eu,registerTool:ku,unregisterTool:Iu,getToolList:Mu,getToolConfig:Oo,hasTool:Ui,getToolSubTabs:Ru,resetToolRegistry:Pu,setToolApiPreset:Nu,getToolApiPreset:Wi,clearToolApiPreset:Du,getAllToolApiBindings:Lu,onPresetDeleted:$u,saveToolWindowState:Uu,getToolWindowState:Wu,getToolBaseConfig:jn,ensureToolRuntimeConfig:Gs,getToolFullConfig:oe,patchToolRuntime:Nr,appendToolRuntimeHistory:Ou,saveToolConfig:ve,resetToolConfig:Bu,getAllDefaultToolConfigs:zu,getAllToolFullConfigs:Bo,getEnabledTools:Ku}});function Yn(){return`rgx_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Yu(){return`r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,6)}`}function Gi(t={}){let e=Object.values(Kt).includes(t.type)?t.type:Kt.INCLUDE;return{id:String(t.id||Yu()),name:String(t.name||"").trim(),description:String(t.description||""),type:e,value:String(t.value||""),enabled:t.enabled!==!1}}function ur(t={}){return{id:String(t.id||Yn()),name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),rules:Array.isArray(t.rules)?t.rules.map(Gi):[],blacklist:Array.isArray(t.blacklist)?t.blacklist.map(e=>String(e||"").trim()).filter(Boolean):[],createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function pr(){let t=we.get(Yi);return!t||typeof t!="object"?{}:t}function zo(t){we.set(Yi,t)}function ds(t){return typeof t=="string"&&t.startsWith(Uh)}function Wh(t){return ds(t)&&Fn.find(e=>e.id===t)||null}function qi(t){if(!Array.isArray(t)){Fn=[];return}Fn=t.map(e=>ur({...e,id:String(e?.id||"")})).filter(e=>ds(e.id))}function Vs(){if(Hu)return;Hu=!0;let t=N.get(ju)||{};if(t[Fu]===!0)return;let e=pr(),r=Object.keys(e).length>0,s=0,o={...e},n=t.tagRulePresets||{};for(let a of Object.values(n)){let i=ur({id:Yn(),name:a.name||"\u5DF2\u8FC1\u79FB\u9884\u8BBE",description:a.description||"",rules:a.rules||[],blacklist:a.blacklist||[],createdAt:typeof a.createdAt=="string"&&Date.parse(a.createdAt)||Date.now(),updatedAt:Date.now()});o[i.id]=i,s+=1}if(!r&&s===0){let a=Array.isArray(t.tagRules)?t.tagRules:[],i=Array.isArray(t.contentBlacklist)?t.contentBlacklist:[];if(a.length||i.length){let l=ur({name:"\u9ED8\u8BA4\u89C4\u5219\u96C6\uFF08\u8FC1\u79FB\uFF09",description:"\u4ECE\u8001\u7248\u672C\u7684\u5F53\u524D\u89C4\u5219\u8FC1\u79FB\u800C\u6765",rules:a,blacklist:i});o[l.id]=l,we.set(qs,l.id),s+=1}}s>0&&(zo(o),dr.info(`\u5DF2\u4ECE\u8001\u6570\u636E\u8FC1\u79FB ${s} \u4E2A\u6B63\u5219\u9884\u8BBE`)),N.set(ju,{...t,[Fu]:!0})}function jh(){Vs();let t=pr(),e=Object.values(t).map(ur).sort((r,s)=>s.updatedAt-r.updatedAt);return[...Fn,...e]}function yr(t){if(!t)return null;if(ds(t))return Wh(t);Vs();let e=pr();return e[t]?ur(e[t]):null}function Gn(){Vs();let t=we.get(qs);return typeof t=="string"&&t?t:""}function Gu(){let t=Gn();return t?yr(t):null}function Fh(t){if(t&&ds(t))return we.set(qs,t),Hn(),z.emit($.PRESET_ACTIVATED,{kind:"regex",id:t}),!0;let e=pr();return t&&!e[t]?(dr.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(we.set(qs,t||""),Hn(),z.emit($.PRESET_ACTIVATED,{kind:"regex",id:t}),!0)}function qn(t={}){Vs();let e=ur({...t,id:Yn(),createdAt:Date.now(),updatedAt:Date.now()}),r=pr();return r[e.id]=e,zo(r),z.emit($.PRESET_CREATED,{kind:"regex",id:e.id}),dr.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function us(t,e={}){if(!t)return null;if(ds(t))return dr.warn(`\u62D2\u7EDD\u4FEE\u6539\u5185\u7F6E\u9884\u8BBE: ${t}`),null;let r=pr(),s=r[t];if(!s)return null;let o=ur({...s,...e,id:t,createdAt:s.createdAt,updatedAt:Date.now()});return r[t]=o,zo(r),Gn()===t&&Hi(o),z.emit($.PRESET_UPDATED,{kind:"regex",id:t}),o}function Hh(t){if(!t)return!1;if(ds(t))return dr.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=pr();return e[t]?(delete e[t],zo(e),Gn()===t&&(we.set(qs,""),Hn()),z.emit($.PRESET_DELETED,{kind:"regex",id:t}),dr.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function Yh(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=yr(t);return r?qn({...r,id:void 0,name:`${r.name}${e}`}):null}function Gh(t,e){return ds(t)?(dr.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):us(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function qh(t,e={}){let r=yr(t);if(!r)return null;let s=Gi({...e,id:Yu()}),o=[...r.rules,s];return us(t,{rules:o})}function Vh(t,e,r={}){let s=yr(t);if(!s)return null;let o=s.rules.map(n=>n.id===e?Gi({...n,...r,id:n.id}):n);return us(t,{rules:o})}function Jh(t,e){let r=yr(t);if(!r)return null;let s=r.rules.filter(o=>o.id!==e);return us(t,{rules:s})}function Xh(t,e,r){let s=yr(t);if(!s)return null;let o=s.rules.findIndex(i=>i.id===e);if(o<0)return null;let n=r==="up"?o-1:o+1;if(n<0||n>=s.rules.length)return null;let a=[...s.rules];return[a[o],a[n]]=[a[n],a[o]],us(t,{rules:a})}function Qh(t,e){let r=Array.isArray(e)?e.map(s=>String(s||"").trim()).filter(Boolean):[];return us(t,{blacklist:Array.from(new Set(r))})}function Zh(){return Vs(),{version:1,exportedAt:Date.now(),presets:Object.values(pr()).map(ur)}}function eb(t){if(Vs(),!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[],r=pr(),s=0;for(let o of e){let n=ur({...o,id:Yn(),createdAt:Date.now(),updatedAt:Date.now()});r[n.id]=n,s+=1}return s>0&&(zo(r),z.emit($.PRESET_IMPORTED,{kind:"regex",count:s})),{added:s}}function tb(){we.set(Yi,{}),we.set(qs,""),Hn(),dr.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u6B63\u5219\u9884\u8BBE")}async function Hi(t){if(t)try{let e=await Promise.resolve().then(()=>(Ks(),$i));typeof e.setCurrentRules=="function"&&e.setCurrentRules(JSON.parse(JSON.stringify(t.rules||[]))),typeof e.setContentBlacklist=="function"&&e.setContentBlacklist(JSON.parse(JSON.stringify(t.blacklist||[])))}catch(e){dr.warn("\u540C\u6B65\u5230 regex-extractor \u5931\u8D25",{error:e})}}function Hn(){let t=Gu();return Hi(t||{rules:[],blacklist:[]})}async function rb(t){if(!t)return[];try{let e=await Promise.resolve().then(()=>(Qt(),Fi));return(typeof e.getToolList=="function"?e.getToolList(!1):[]).filter(s=>(typeof e.getToolFullConfig=="function"?e.getToolFullConfig(s.id):null)?.extraction?.regexPresetId===t).map(s=>s.id)}catch{return[]}}var dr,Yi,qs,ju,Fu,Kt,Uh,Fn,Hu,Te,ps=P(()=>{$e();He();G();dr=C.createScope("RegexPresetStore"),Yi="regex_presets",qs="regex_current_preset",ju="settings",Fu="regex_presets_migrated",Kt=Object.freeze({INCLUDE:"include",EXCLUDE:"exclude",REGEX_INCLUDE:"regex_include",REGEX_EXCLUDE:"regex_exclude"});Uh="builtin_regex_",Fn=[];Hu=!1;Te={listPresets:jh,getPreset:yr,getCurrentPresetId:Gn,getCurrentPreset:Gu,setCurrentPresetId:Fh,createPreset:qn,updatePreset:us,deletePreset:Hh,duplicatePreset:Yh,renamePreset:Gh,addRule:qh,updateRule:Vh,deleteRule:Jh,moveRule:Xh,setBlacklist:Qh,exportAll:Zh,importPresets:eb,resetAll:tb,findLinkedTools:rb,RULE_TYPES:Kt}});var Xu={};re(Xu,{RegexExtractPanel:()=>Ju,default:()=>cb});function ob(t,e,r,s,o,n){let a=m("div",{style:{display:"grid",gridTemplateColumns:"auto auto minmax(140px, 1fr) 200px minmax(120px, 2fr) auto",gap:"10px",alignItems:"center",padding:"10px 0",borderTop:r===0?"none":"1px solid var(--yyt-border)",opacity:e.enabled===!1?"0.55":"1"},attrs:{draggable:n?null:"true","data-rule-id":e.id}}),i=m("div",{style:{cursor:n?"default":"grab",padding:"4px",color:"var(--yyt-text-muted)",fontSize:"14px",userSelect:"none"},text:"\u22EE\u22EE",title:n?"\u5185\u7F6E\u9884\u8BBE\u4E0D\u53EF\u91CD\u6392":"\u62D6\u52A8\u6392\u5E8F"});a.appendChild(i);let l=m("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}}),d=de({label:"\u25B2",size:"small",variant:"ghost",title:"\u4E0A\u79FB",disabled:n||r===0,onClick:()=>{Te.moveRule(t.id,e.id,"up"),o()}}),c=de({label:"\u25BC",size:"small",variant:"ghost",title:"\u4E0B\u79FB",disabled:n||r===s-1,onClick:()=>{Te.moveRule(t.id,e.id,"down"),o()}});for(let T of[d,c])T.el.style.padding="0 6px",T.el.style.minHeight="auto",T.el.style.fontSize="9px";l.appendChild(d.el),l.appendChild(c.el),a.appendChild(l);let u=m("div",{style:{display:"flex",flexDirection:"column",gap:"2px",minWidth:"0"}}),p=Je({value:e.name||"",placeholder:"\u89C4\u5219\u540D\uFF08\u53EF\u9009\uFF09",disabled:n,onChange:T=>Te.updateRule(t.id,e.id,{name:T})});p.el.style.fontSize="12px",p.el.style.padding="6px 10px",u.appendChild(p.el),e.description&&u.appendChild(m("div",{text:e.description,style:{fontSize:"10px",color:"var(--yyt-text-muted)"}})),a.appendChild(u);let y=Ge({value:e.type,disabled:n,options:sb,onChange:T=>{Te.updateRule(t.id,e.id,{type:T}),o()}});y.el.style.fontSize="11px",y.el.style.padding="6px 10px",a.appendChild(y.el);let f=e.type===Kt.REGEX_INCLUDE||e.type===Kt.REGEX_EXCLUDE,g=Je({value:e.value||"",placeholder:f?"\u6B63\u5219\u8868\u8FBE\u5F0F...":"\u6807\u7B7E\u540D\uFF08\u5982 content\uFF09",disabled:n,onChange:T=>Te.updateRule(t.id,e.id,{value:T})});g.el.style.fontSize="12px",g.el.style.padding="6px 10px",g.el.style.fontFamily="ui-monospace, monospace",a.appendChild(g.el);let b=m("div",{style:{display:"flex",gap:"6px",alignItems:"center"}}),v=At({checked:e.enabled!==!1,disabled:n,onChange:T=>{Te.updateRule(t.id,e.id,{enabled:T}),o()}});return v.el.style.padding="0",v.el.style.border="none",v.el.style.background="transparent",b.appendChild(v.el),n||b.appendChild(de({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664\u89C4\u5219",onClick:()=>{Te.deleteRule(t.id,e.id),o()}}).el),a.appendChild(b),a}function nb(t,e,r){let s=null;t.addEventListener("dragstart",o=>{let n=o.target;if(!(n instanceof HTMLElement))return;let a=n.closest("[data-rule-id]");if(a){s=a.getAttribute("data-rule-id"),a.style.opacity="0.4";try{o.dataTransfer.effectAllowed="move",o.dataTransfer.setData("text/plain",s)}catch{}}}),t.addEventListener("dragend",o=>{let n=o.target;n instanceof HTMLElement&&(n.style.opacity=""),s=null}),t.addEventListener("dragover",o=>{if(s){o.preventDefault();try{o.dataTransfer.dropEffect="move"}catch{}}}),t.addEventListener("drop",o=>{if(o.preventDefault(),!s)return;let n=o.target instanceof HTMLElement?o.target.closest("[data-rule-id]"):null;if(!n)return;let a=n.getAttribute("data-rule-id");if(!a||a===s)return;let i=Te.getPreset(e.id);if(!i)return;let l=i.rules.findIndex(p=>p.id===s),d=i.rules.findIndex(p=>p.id===a);if(l<0||d<0)return;let c=[...i.rules],[u]=c.splice(l,1);c.splice(d,0,u),Te.updatePreset(e.id,{rules:c}),r()})}function ab(t,{onChange:e,readonly:r,refresh:s}){let o=m("div",{style:{display:"flex",flexDirection:"column",gap:"14px"}});j(o,pt({label:"\u63CF\u8FF0",control:Je({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})}));let n=m("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px"}},m("div",{text:"\u63D0\u53D6\u89C4\u5219\uFF08\u6309\u987A\u5E8F\u5E94\u7528\uFF09",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),r?m("span",{text:"\u5185\u7F6E\u9884\u8BBE\u53EA\u8BFB",style:{fontSize:"11px",color:"var(--yyt-text-muted)"}}):de({label:"+ \u65B0\u589E\u89C4\u5219",size:"small",onClick:()=>{Te.addRule(t.id,{type:Kt.INCLUDE,value:"",enabled:!0}),s&&s()}}).el);j(o,n);let a=m("div");if(t.rules.length){for(let i=0;i<t.rules.length;i++)a.appendChild(ob(t,t.rules[i],i,t.rules.length,s,r));r||nb(a,t,s)}else a.appendChild(m("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5C1A\u65E0\u89C4\u5219\u3002\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u65B0\u589E\u89C4\u5219"\u5F00\u59CB\u6DFB\u52A0\u3002'}));if(j(o,a),j(o,m("div",{text:"\u5185\u5BB9\u9ED1\u540D\u5355",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px",marginBottom:"4px"}})),j(o,m("div",{text:"\u63D0\u53D6\u51FA\u7684\u5185\u5BB9\u5757\u82E5\u5305\u542B\u4EFB\u4E00\u5173\u952E\u8BCD\u5219\u8DF3\u8FC7\u8BE5\u5757\uFF08\u4E0D\u533A\u5206\u5927\u5C0F\u5199\uFF09\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginBottom:"6px"}})),r)j(o,m("div",{style:{fontSize:"12px",color:"var(--yyt-text-muted)"},text:t.blacklist.length?t.blacklist.join("\u3001"):"\uFF08\u7A7A\uFF09"}));else{let i=xi({values:t.blacklist,placeholder:"\u8F93\u5165\u5173\u952E\u8BCD\u56DE\u8F66\u6DFB\u52A0",chipVariant:"danger",onChange:l=>Te.setBlacklist(t.id,l)});j(o,i.el)}return o}function ib(t){if(!t)return null;let e=m("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}});j(e,m("div",{text:"\u6D4B\u8BD5\u63D0\u53D6",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}));let r=Vu.get(t.id)||{input:"",output:""};Vu.set(t.id,r);let s=m("textarea",{className:"yyt-textarea",attrs:{rows:"5",placeholder:"\u7C98\u8D34\u6D4B\u8BD5\u6587\u672C\uFF08\u5982 AI \u56DE\u590D\u539F\u6587\uFF09..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});s.value=r.input,s.addEventListener("input",()=>{r.input=s.value}),j(e,s);let o=m("div",{style:{padding:"10px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-muted)",maxHeight:"200px",overflowY:"auto",whiteSpace:"pre-wrap",wordBreak:"break-all",minHeight:"50px"}});o.textContent=r.output||'// \u70B9\u51FB"\u8FD0\u884C\u6D4B\u8BD5"\u770B\u63D0\u53D6\u7ED3\u679C';let n=de({label:"\u25B6 \u8FD0\u884C\u6D4B\u8BD5",size:"small",variant:"primary",onClick:()=>{let a=s.value;if(!a.trim()){r.output="// \u6D4B\u8BD5\u8F93\u5165\u4E3A\u7A7A",o.textContent=r.output,o.style.color="var(--yyt-text-muted)";return}try{let i=cr(a,t.rules||[],t.blacklist||[]);r.output=i||"// \u6CA1\u6709\u63D0\u53D6\u5230\u5185\u5BB9",o.textContent=r.output,o.style.color=i?"var(--yyt-text)":"var(--yyt-text-muted)"}catch(i){r.output=`// \u6D4B\u8BD5\u51FA\u9519\uFF1A${i?.message||i}`,o.textContent=r.output,o.style.color="var(--yyt-danger, #f87171)"}}});return j(e,n.el),j(e,o),e}function lb(t){let e=t.rules.filter(r=>r.enabled!==!1).length;return[`${t.rules.length} \u89C4\u5219\uFF08${e} \u542F\u7528\uFF09`,`${t.blacklist.length} \u9ED1\u540D\u5355`]}var C0,sb,Vu,Ju,cb,Qu=P(()=>{ar();ps();Ks();G();Mo();C0=C.createScope("RegexExtractPanel"),sb=[{value:Kt.INCLUDE,label:"include \u2014 \u63D0\u53D6\u6807\u7B7E"},{value:Kt.EXCLUDE,label:"exclude \u2014 \u6392\u9664\u6807\u7B7E"},{value:Kt.REGEX_INCLUDE,label:"regex_include \u2014 \u6B63\u5219\u63D0\u53D6"},{value:Kt.REGEX_EXCLUDE,label:"regex_exclude \u2014 \u6B63\u5219\u6392\u9664"}],Vu=new Map;Ju=Cr({id:"regexExtractPanel",kind:"regex",panelTitle:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",panelHint:"\u7BA1\u7406\u591A\u4E2A\u63D0\u53D6\u89C4\u5219\u96C6\uFF0C\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\u3002\u89C4\u5219\u6309\u987A\u5E8F\u5E94\u7528\uFF0C\u53EF\u62D6\u62FD\u6392\u5E8F\u3002",store:Te,renderEditor:ab,renderExtras:ib,renderListItemMeta:lb}),cb=Ju});function fe(t){return t==null?"":String(t).trim()}function ub(t="table"){let e=fe(t)||"table",r=Date.now().toString(36),s=Math.random().toString(36).slice(2,8);return`${e}_${r}_${s}`}function Ko(t="row"){return ub(t)}function Wt(t,e=0){return fe(t)||`table_${Number.isFinite(e)?e+1:1}`}function Uo(t,e=0){return fe(t)||`row_${Number.isFinite(e)?e+1:1}`}function ie(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function Js(t={}){return{chatId:fe(t.chatId),sourceMessageId:fe(t.sourceMessageId||t.messageId),sourceSwipeId:fe(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:fe(t.effectiveSwipeId||t.sourceSwipeId),slotBindingKey:fe(t.slotBindingKey),slotRevisionKey:fe(t.slotRevisionKey),slotTransactionId:fe(t.slotTransactionId),traceId:fe(t.traceId),resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now()}}function Vi(t={}){return{resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now(),runSource:fe(t.runSource)||Xe.MANUAL,traceId:fe(t.traceId),chatId:fe(t.chatId),sourceMessageId:fe(t.sourceMessageId||t.messageId),sourceSwipeId:fe(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:fe(t.effectiveSwipeId||t.sourceSwipeId)||"swipe:current",slotBindingKey:fe(t.slotBindingKey),slotRevisionKey:fe(t.slotRevisionKey),slotTransactionId:fe(t.slotTransactionId),assistantContentFingerprint:fe(t.assistantContentFingerprint),assistantBaseFingerprint:fe(t.assistantBaseFingerprint),assistantText:String(t.assistantText||""),assistantBaseText:String(t.assistantBaseText||""),targetMessageIndex:Number.isFinite(t.targetMessageIndex)?t.targetMessageIndex:-1}}function fr(t){return!t||typeof t!="object"?null:{chatId:fe(t.chatId),slotBindingKey:fe(t.slotBindingKey),slotRevisionKey:fe(t.slotRevisionKey),sourceMessageId:fe(t.sourceMessageId),sourceSwipeId:fe(t.sourceSwipeId),tables:Array.isArray(t.tables)?ie(t.tables):[],updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0,meta:t.meta&&typeof t.meta=="object"?ie(t.meta):{}}}function Wo(t={},e={}){let r=Vi(t),s=e.meta&&typeof e.meta=="object"?ie(e.meta):{};return{chatId:r.chatId,slotBindingKey:r.slotBindingKey,slotRevisionKey:r.slotRevisionKey,sourceMessageId:r.sourceMessageId,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId,tables:Array.isArray(e.tables)?ie(e.tables):[],updatedAt:Number.isFinite(e.updatedAt)?e.updatedAt:Date.now(),meta:{sourceKind:s.sourceKind||ft.EMPTY,...s}}}function Vn(t){return!t||typeof t!="object"?{lastResolvedTarget:null,lastCommittedTarget:null,updatedAt:0}:{lastResolvedTarget:t.lastResolvedTarget?Js(t.lastResolvedTarget):null,lastCommittedTarget:t.lastCommittedTarget?Js(t.lastCommittedTarget):null,updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0}}function Se(t){if(t==null)return It;let e=String(t).trim();return e===""?It:e}function jo(t,e){let r=fe(t),s=Se(e);return`${r}::${s}`}function ep(){return{rows:[],cols:[],cells:[],indexColumn:!1}}var Xs,ys,Xe,Ut,fs,ft,Qs,db,It,gt,Zu,k0,I0,Qe=P(()=>{Xs="YouYouToolkit_tableState",ys="YouYouToolkit_tableBindings",Xe=Object.freeze({MANUAL:"MANUAL_TABLE",AUTO:"AUTO_TABLE"}),Ut=Object.freeze({ENABLED:"enabled",SELECTED:"selected",CURRENT:"current"}),fs=Object.freeze({EXACT:"exact",BINDING_FALLBACK:"binding_fallback",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),ft=Object.freeze({EXACT:"exact",BINDING:"binding",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),Qs=Object.freeze({INSERT_ROW:"insertRow",UPDATE_ROW:"updateRow",DELETE_ROW:"deleteRow"}),db=Object.freeze({CELL:"cell",ROW:"row",COLUMN:"column",INDEX_COLUMN:"index_column"});It="";gt=Object.freeze({INHERIT_GLOBAL:"inherit_global",CHAT_OVERRIDE:"chat_override",PRESET_LINK:"preset_link"}),Zu=8,k0=Object.freeze({NOTE:"note",INIT_NODE:"initNode",INSERT_NODE:"insertNode",UPDATE_NODE:"updateNode",DELETE_NODE:"deleteNode"}),I0=Object.freeze({INHERIT_GLOBAL:-1,DISABLED:0})});function Jn(t,e=""){return t==null?e:String(t).trim()||e}function pb(t,e=!1){return t==null?e:t===!0}function Xn(t={},e=0){return Wt(t?.id||t?.key,e)}function Fo(t={},e={}){let r=t&&typeof t=="object"?t:{},s=e&&typeof e=="object"?e:{},o=Jn(r.mode||r.runScope||s.mode||s.runScope,Ut.ENABLED),n=Array.isArray(r.selectedTableIds)?r.selectedTableIds.map(i=>Jn(i,"")).filter(Boolean):Array.isArray(s.selectedTableIds)?s.selectedTableIds.map(i=>Jn(i,"")).filter(Boolean):[],a=Jn(r.activeTableId||s.activeTableId,"");return{mode:Object.values(Ut).includes(o)?o:Ut.ENABLED,selectedTableIds:n,activeTableId:a}}function tp(t={},e=[]){let r=Fo(t,t?.scope||{}),s=Array.isArray(e)?e:[],o=s.map((i,l)=>Xn(i,l)),n=[];r.mode===Ut.CURRENT?n=r.activeTableId?[r.activeTableId]:[]:r.mode===Ut.SELECTED?n=r.selectedTableIds.filter(i=>o.includes(i)):n=s.map((i,l)=>({table:i,id:Xn(i,l)})).filter(({table:i})=>pb(i?.enabled,!0)).map(({id:i})=>i);let a=new Set(n);return{...r,allTableIds:o,allowedTableIds:n,allowedIdSet:a,includes(i={},l=-1){return a.has(Xn(i,l))},filterTables(i=[]){return(Array.isArray(i)?i:[]).filter((d,c)=>a.has(Xn(d,c)))},toJSON(){return{mode:r.mode,selectedTableIds:ie(r.selectedTableIds),activeTableId:r.activeTableId,allowedTableIds:[...n]}}}}var Qn=P(()=>{Qe()});function mt(t,e=""){return t==null?e:String(t).trim()||e}function Ji(){let t=globalThis.window||globalThis;return mt(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function yb(t,e=!1){return t===!0}function fb(t={}){let e=t&&typeof t=="object"?t:{};return{enabled:yb(e.enabled,!1),targetBook:mt(e.targetBook,""),entryComment:mt(e.entryComment,"YYT-\u586B\u8868\u6570\u636E")}}function Xi(t={},e={}){let r=t&&typeof t=="object"?t:{},s=Fo(r.scope,{mode:r.runScope||e.runScope||Ut.ENABLED,selectedTableIds:r.selectedTableIds||e.selectedTableIds||[],activeTableId:r.activeTableId||e.activeTableId||""});return{chatId:mt(r.chatId,mt(e.chatId,Ji())),templateId:mt(r.templateId,mt(e.templateId,ht)),enabledTableIds:Array.isArray(r.enabledTableIds)?r.enabledTableIds.map(o=>mt(o,"")).filter(Boolean):[],focusedTableId:mt(r.focusedTableId,s.activeTableId),scope:s,worldbookSync:fb(r.worldbookSync),seedNote:mt(r.seedNote,""),updatedAt:mt(r.updatedAt,new Date().toISOString())}}function op(){let t=rp.get(sp,{});return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function Qi(t=Ji()){let e=mt(t,"default_chat"),r=op();return Xi(r[e],{chatId:e})}function np(t={},e=Ji()){let r=mt(e,"default_chat"),s=op(),o=Xi({...s[r],...t||{},chatId:r,updatedAt:new Date().toISOString()},{chatId:r});return rp.set(sp,{...s,[r]:o}),{success:!0,guide:o}}function ap(t={},e=null){let r=Xi(e||Qi(),{templateId:t.activeTemplate,runScope:t.runScope,selectedTableIds:t.scope?.selectedTableIds,activeTableId:t.scope?.activeTableId}),s={...t,activeTemplate:r.templateId||t.activeTemplate,runScope:r.scope.mode,scope:r.scope};return r.worldbookSync&&r.worldbookSync.targetBook&&(s.worldbookSync={...t.worldbookSync||{},...r.worldbookSync}),s}var rp,sp,ip=P(()=>{$e();Dr();Qe();Qn();rp=N.namespace("tableWorkbenchGuides"),sp="guides"});function Z(t,e,r="",s=rl){return{key:t,title:e,description:r,type:s,required:!1}}function Lr({id:t,name:e,note:r,aiInstructions:s,columns:o}){return{id:t,name:e,note:r,enabled:!0,aiInstructions:{init:s?.init||"",create:s?.create||"",update:s?.update||"",delete:s?.delete||""},columns:o,rows:[]}}function M(t,e=""){return t==null?e:String(t).trim()||e}function Zt(t,e=!1){return t==null?e:t===!0}function mb(t){if(!Array.isArray(t)||t.length!==1)return!1;let e=t[0]&&typeof t[0]=="object"?t[0]:null;if(!e)return!1;let r=M(e.name||e.title,""),s=M(e.note||e.description,""),o=Array.isArray(e.columns)?e.columns:[],n=Array.isArray(e.rows)?e.rows:[];if(r&&!["\u88681","\u8868\u683C 1","\u8868\u683C1"].includes(r)||s||o.length!==1||n.length>1)return!1;let a=o[0]&&typeof o[0]=="object"?o[0]:{},i=M(a.key||a.id,""),l=M(a.title||a.name||a.label,"");if(M(a.description||a.note,"")||i&&i!=="col_1"||l&&!["\u52171","col_1"].includes(l))return!1;if(n.length===0)return!0;let c=n[0]&&typeof n[0]=="object"?n[0]:{},u=M(c.name||c.title||c.label,""),p=c.cells&&typeof c.cells=="object"&&!Array.isArray(c.cells)?c.cells:{},y=Array.isArray(c.values)?c.values:[],f=Object.values(p).some(g=>M(g,""))||y.some(g=>M(g,""));return(!u||u==="\u884C1")&&!f}function Ho(t,{seedDefaultWhenMissing:e=!1}={}){return mb(t)?ie(Yo):Array.isArray(t)?ie(t):t&&typeof t=="object"?bb(t):e?ie(Yo):[]}function hb(t=""){let e=[],r=M(t,""),s=/-\s*列\d+\s*[:：]\s*([^\n\-–—]+?)\s*[-–—]\s*([^\n]+)/g,o;for(;o=s.exec(r);)e.push({title:M(o[1],""),description:M(o[2],"")});return e}function bb(t={}){let e=t&&typeof t=="object"?t:{};return Object.keys(e).filter(s=>s.startsWith("sheet_")&&e[s]&&typeof e[s]=="object").map((s,o)=>({key:s,table:e[s],fallbackOrder:o})).sort((s,o)=>{let n=Number.isFinite(s.table.orderNo)?s.table.orderNo:s.fallbackOrder,a=Number.isFinite(o.table.orderNo)?o.table.orderNo:o.fallbackOrder;return n-a}).map(({key:s,table:o},n)=>{let a=o.sourceData&&typeof o.sourceData=="object"?o.sourceData:{},i=Array.isArray(o.content)?o.content:[],l=Array.isArray(i[0])?i[0]:[],d=hb(a.note),c=new Set,u=l.slice(1).map((y,f)=>{let g=d[f]||{},b=M(y||g.title,`\u5217${f+1}`);return{key:up(b||`col_${f+1}`,c),title:b,description:M(g.description,""),type:rl,required:!1}}),p=i.slice(1).map((y,f)=>{let g=Array.isArray(y)?y:[],b={};return u.forEach((v,T)=>{b[v.key]=Go(g[T+1])}),{name:M(g[0],`\u884C${f+1}`),cells:b}});return{id:M(o.uid||s,`sheet_${n+1}`),name:M(o.name,`\u8868${n+1}`),note:M(a.note,""),enabled:o.enabled!==!1,aiInstructions:{init:M(a.initNode,""),create:M(a.insertNode,""),update:M(a.updateNode,""),delete:M(a.deleteNode,"")},columns:u,rows:p}})}function xb(t){if(Array.isArray(t)||t&&typeof t=="object")return Ho(t);let e=M(t,"");if(!e)return[];let r=e.replace(/\/\/.*$/gm,"").replace(/\/\*[\s\S]*?\*\//g,"").trim(),s=[r];try{let o=JSON.parse(r);s.push(o)}catch{try{let a=(r.startsWith('"')&&r.endsWith('"')?r.slice(1,-1):r).replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\t/g,"\\t");s.push(JSON.parse(`"${a}"`))}catch{}}for(let o of s){if(Array.isArray(o)||o&&typeof o=="object"){let n=Ho(o);if(n.length)return n;continue}if(typeof o=="string"&&o!==r)try{let n=JSON.parse(o),a=Ho(n);if(a.length)return a}catch{}}return[]}function Go(t){if(t==null)return"";if(typeof t=="string")return t;try{return JSON.stringify(t,null,2)}catch{return String(t)}}function wb(t,e="col"){return M(t,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||e}function up(t,e=new Set){let r=wb(t,"col"),s=r,o=2;for(;e.has(s);)s=`${r}_${o}`,o+=1;return e.add(s),s}function vb(t=[]){let e=[],r=0;return t.forEach(s=>{let o=s&&typeof s=="object"?s:{},n=o.cells&&typeof o.cells=="object"&&!Array.isArray(o.cells)?o.cells:null,a=Array.isArray(o.cells)?o.cells:Array.isArray(o.values)?o.values:null;n&&Object.keys(n).forEach(i=>{e.includes(i)||e.push(i)}),a&&a.length>r&&(r=a.length)}),e.length>0?e.map(s=>({key:s,title:String(s)})):r>0?Array.from({length:r},(s,o)=>({key:`col_${o+1}`,title:`\u5217${o+1}`})):[]}function sl(t,e=rl){let r=M(t,e);return cp.some(s=>s.value===r)?r:e}function Tb(t={},e=0,r=new Set){let s=t&&typeof t=="object"?t:{},o=M(s.title||s.name||s.label,`\u5217${e+1}`),n=M(s.key||s.id,""),a=up(n||o||`col_${e+1}`,r),i=[n,M(s.title,""),M(s.name,""),M(s.label,"")].filter(Boolean);return{key:a,title:o,description:M(s.description||s.note,""),type:sl(s.type),required:s.required===!0,sourceKeys:i}}function Sb(t={},e={},r=0){let s=t.cells&&typeof t.cells=="object"&&!Array.isArray(t.cells)?t.cells:null,o=Array.isArray(t.cells)?t.cells:Array.isArray(t.values)?t.values:null;if(s){let n=[...Array.isArray(e.sourceKeys)?e.sourceKeys:[],e.key,e.title].filter(Boolean);for(let a of n)if(s[a]!==void 0)return Go(s[a])}return o&&o[r]!==void 0?Go(o[r]):""}function _b(t={},e=[],r=0){let s=t&&typeof t=="object"?t:{},o={};return e.forEach((n,a)=>{o[n.key]=Sb(s,n,a)}),{id:Uo(s.id||s.rowId,r),name:M(s.name||s.title||s.label,`\u884C${r+1}`),cells:o}}function Eb(t={}){let e=t&&typeof t=="object"?t:{};return{init:M(e.init,""),create:M(e.create,""),update:M(e.update,""),delete:M(e.delete,"")}}function Ab(t={},e=""){let r=t&&typeof t=="object"?t:{},s=M(r.presetId,M(e,""));return{enabled:r.enabled===!0,presetId:s}}function Cb(t={},e=""){let r=t&&typeof t=="object"?t:{};return{enabled:Zt(r.enabled,!1),entryName:M(r.entryName,e),entryType:r.entryType==="keyword"?"keyword":"constant",splitByRow:Zt(r.splitByRow,!1),keywords:M(r.keywords,""),injectionTemplate:M(r.injectionTemplate,""),preventRecursion:Zt(r.preventRecursion,!0),entryPlacement:{position:M(r.entryPlacement?.position||r.placement?.position,"before_character_definition"),depth:Number.isFinite(Number(r.entryPlacement?.depth??r.placement?.depth))?Math.floor(Number(r.entryPlacement?.depth??r.placement?.depth)):2,order:Number.isFinite(Number(r.entryPlacement?.order??r.placement?.order))?Math.floor(Number(r.entryPlacement?.order??r.placement?.order)):0}}}function kb(t={},e=0){let r=t&&typeof t=="object"?t:{},s=new Set,n=(Array.isArray(r.columns)&&r.columns.length>0?r.columns:vb(Array.isArray(r.rows)?r.rows:[])).map((l,d)=>Tb(l,d,s)),a=Array.isArray(r.rows)?r.rows.map((l,d)=>_b(l,n,d)):[],i=M(r.name||r.title,`\u8868${e+1}`);return{id:Wt(r.id||r.key,e),name:i,note:M(r.note||r.description,""),enabled:r.enabled!==!1,aiInstructions:Eb(r.aiInstructions),exportConfig:Cb(r.exportConfig,i),columns:n.map(l=>({key:l.key,title:l.title,description:M(l.description,""),type:sl(l.type),required:l.required===!0})),rows:a}}function pp(t={}){let e=t&&typeof t=="object"?t:{},r=Array.isArray(e.lastErrorDetails)?e.lastErrorDetails.map(o=>M(o,"")).filter(Boolean):[],s=e.lastValidationSummary&&typeof e.lastValidationSummary=="object"?{errorCount:Number.isFinite(e.lastValidationSummary.errorCount)?e.lastValidationSummary.errorCount:0,warningCount:Number.isFinite(e.lastValidationSummary.warningCount)?e.lastValidationSummary.warningCount:0}:{errorCount:0,warningCount:0};return{lastStatus:M(e.lastStatus,_e.IDLE),lastRunAt:Number.isFinite(e.lastRunAt)?e.lastRunAt:0,lastDurationMs:Number.isFinite(e.lastDurationMs)?e.lastDurationMs:0,lastError:M(e.lastError,""),lastErrorDetails:r,lastValidationSummary:s,successCount:Number.isFinite(e.successCount)?e.successCount:0,errorCount:Number.isFinite(e.errorCount)?e.errorCount:0,lastSourceMessageId:M(e.lastSourceMessageId,""),lastSlotRevisionKey:M(e.lastSlotRevisionKey,""),lastLoadMode:M(e.lastLoadMode,""),lastFillMode:M(e.lastFillMode,""),lastMirrorApplied:e.lastMirrorApplied===!0,lastResolvedFromMessageId:M(e.lastResolvedFromMessageId,""),lastResolvedFromRevisionKey:M(e.lastResolvedFromRevisionKey,""),lastSourceKind:M(e.lastSourceKind,""),lastScopeMode:M(e.lastScopeMode,""),lastAutoRunAt:Number.isFinite(e.lastAutoRunAt)?e.lastAutoRunAt:0,lastAutoStatus:M(e.lastAutoStatus,_e.IDLE),lastAutoMessageId:M(e.lastAutoMessageId,""),lastAutoRevisionKey:M(e.lastAutoRevisionKey,""),lastAutoSkipReason:M(e.lastAutoSkipReason,"")}}function Ib(t={}){let e=t&&typeof t=="object"?t:{};return(Array.isArray(e.tables)?e.tables:[]).map((s,o)=>kb(s,o))}function yp(t="",e={},r={}){let s=sl(e?.type),o=String(t??"").trim(),n=M(r?.label,`${M(r?.tableName,"\u8868\u683C")} / ${M(r?.rowName,"\u884C")} / ${M(e?.title||e?.key,"\u5355\u5143\u683C")}`),a=[],i=[];if(e?.required===!0&&!o&&a.push(`${n} \u4E3A\u5FC5\u586B\uFF0C\u5F53\u524D\u4E3A\u7A7A\u3002`),!o)return{valid:a.length===0,errors:a,warnings:i};if(s==="number"&&!Number.isFinite(Number(o))&&a.push(`${n} \u9700\u8981\u586B\u5199\u6570\u5B57\u3002`),s==="boolean"&&!["true","false","1","0","yes","no"].includes(o.toLowerCase())&&a.push(`${n} \u9700\u8981\u586B\u5199\u5E03\u5C14\u503C\uFF08true / false\uFF09\u3002`),s==="date"&&Number.isNaN(Date.parse(o))&&a.push(`${n} \u9700\u8981\u586B\u5199\u53EF\u89E3\u6790\u7684\u65E5\u671F\u3002`),s==="json")try{JSON.parse(o)}catch(l){a.push(`${n} \u9700\u8981\u586B\u5199\u5408\u6CD5 JSON\uFF1A${l?.message||"\u89E3\u6790\u5931\u8D25"}`)}return{valid:a.length===0,errors:a,warnings:i}}function Mb(t={}){let r=Ib(t&&typeof t=="object"?t:{}),s=[];return r.forEach((o,n)=>{let a=M(o?.name,`\u8868${n+1}`),i=Array.isArray(o?.columns)?o.columns:[],l=Array.isArray(o?.rows)?o.rows:[];a||s.push(`\u8868 ${n+1} \u7F3A\u5C11\u540D\u79F0\u3002`),i.length===0&&s.push(`${a} \u81F3\u5C11\u9700\u8981\u4E00\u5217\u3002`);let d=new Set;i.forEach((c,u)=>{let p=M(c?.key,""),y=M(c?.title,`\u5217${u+1}`);if(!p){s.push(`${a} / ${y} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`);return}if(d.has(p)){s.push(`${a} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${p}`);return}d.add(p)}),l.forEach((c,u)=>{let p=M(c?.name,`\u884C${u+1}`),y=c?.cells&&typeof c.cells=="object"&&!Array.isArray(c.cells)?c.cells:{};i.forEach((f,g)=>{let b=M(f?.key,""),v=M(f?.title||b,`\u5217${g+1}`),T=b?Go(y[b]):"",w=yp(T,f,{label:`${a} / ${p} / ${v}`,tableName:a,rowName:p});s.push(...w.errors)})})}),{valid:s.length===0,errors:s,tables:r}}function Zs({severity:t="error",message:e="",tableIndex:r=-1,tableName:s="",columnIndex:o=-1,columnKey:n="",rowIndex:a=-1,rowName:i="",cellKey:l=""}={}){return{severity:t,message:M(e,t==="warning"?"\u5B58\u5728\u8B66\u544A\u3002":"\u5B58\u5728\u9519\u8BEF\u3002"),tableIndex:r,tableName:M(s,""),columnIndex:o,columnKey:M(n,""),rowIndex:a,rowName:M(i,""),cellKey:M(l,"")}}function Zn(t={}){let e=Mb(t),r=[];if(!e.valid)return{...e,warnings:[],issues:r,summary:{errorCount:e.errors.length,warningCount:0}};let s=Array.isArray(e.tables)?e.tables:[];s.forEach((a,i)=>{let l=M(a?.name,`\u8868${i+1}`),d=Array.isArray(a?.columns)?a.columns:[],c=Array.isArray(a?.rows)?a.rows:[],u=new Set;l||r.push(Zs({severity:"error",message:`\u8868 ${i+1} \u7F3A\u5C11\u540D\u79F0\u3002`,tableIndex:i,tableName:l})),d.forEach((p,y)=>{let f=M(p?.key,""),g=M(p?.title,`\u5217${y+1}`);f||r.push(Zs({severity:"error",message:`${l} / ${g} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`,tableIndex:i,tableName:l,columnIndex:y,columnKey:f,cellKey:f})),f&&(u.has(f)&&r.push(Zs({severity:"error",message:`${l} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${f}`,tableIndex:i,tableName:l,columnIndex:y,columnKey:f,cellKey:f})),u.add(f))}),c.forEach((p,y)=>{let f=M(p?.name,`\u884C${y+1}`),g=p?.cells&&typeof p.cells=="object"&&!Array.isArray(p.cells)?p.cells:{};Object.keys(g).forEach(v=>{d.some(T=>M(T?.key,"")===v)||r.push(Zs({severity:"warning",message:`${l} / ${f} \u5305\u542B\u672A\u5B9A\u4E49\u5217 ${v}\uFF0C\u4FDD\u5B58\u540E\u4F1A\u88AB\u5FFD\u7565\u3002`,tableIndex:i,tableName:l,rowIndex:y,rowName:f,cellKey:v}))}),d.forEach((v,T)=>{let w=M(v?.key,""),B=M(v?.title||w,`\u5217${T+1}`),R=w?Go(g[w]):"",S=yp(R,v,{label:`${l} / ${f} / ${B}`,tableName:l,rowName:f});S.errors.forEach(_=>{r.push(Zs({severity:"error",message:_,tableIndex:i,tableName:l,columnIndex:T,columnKey:w,rowIndex:y,rowName:f,cellKey:w}))}),S.warnings.forEach(_=>{r.push(Zs({severity:"warning",message:_,tableIndex:i,tableName:l,columnIndex:T,columnKey:w,rowIndex:y,rowName:f,cellKey:w}))})})})});let o=r.filter(a=>a.severity!=="warning").map(a=>a.message),n=r.filter(a=>a.severity==="warning").map(a=>a.message);return{valid:o.length===0,errors:o,warnings:n,issues:r,tables:s,summary:{errorCount:o.length,warningCount:n.length}}}function ol(t){return xb(t)}function fp(){return{tables:ie(Yo),promptTemplate:lp,apiPreset:"",promptPreset:"",bypass:{enabled:!1,presetId:""},activeTemplate:ht,autoUpdateEnabled:!1,autoUpdateTrigger:"assistantMessage",runScope:Ut.ENABLED,scope:{mode:Ut.ENABLED,selectedTableIds:[],activeTableId:""},fillMode:Zi.INCREMENTAL,contextDepth:8,contextRoles:"all",contextExtractTags:[],contextUseGlobalRules:!1,worldbooks:{enabled:!1,selected:[]},sendLatestRows:-1,mirrorToMessage:!1,mirrorTag:"yyt-table-workbench",worldbookSync:{enabled:!1,targetBook:"",entryComment:"YYT-\u586B\u8868\u6570\u636E"},wrapperConfig:{enabled:!0,wrapperTag:"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",wrapperHint:"\u4EE5\u4E0B\u662F\u5728\u8FD9\u4E2A\u65F6\u95F4\u70B9\uFF0C\u5F53\u524D\u573A\u666F\u4E0B\u5267\u60C5\u76F8\u5173\u7684\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55\uFF0C\u4F60\u5728\u8FDB\u884C\u5267\u60C5\u5206\u6790\u65F6\u5FC5\u987B\u4EE5\u6B64\u6700\u65B0\u7684\u6570\u636E\u4E3A\u51C6\uFF0C\u4EE5\u4E0B\u6570\u636E\u4E0E\u8BB0\u5F55\u7684\u4F18\u5148\u7EA7\u9AD8\u4E8E\u5176\u4ED6\u4EFB\u4F55\u80CC\u666F\u8BBE\u5B9A\uFF1A",wrapperPlacement:{position:"before_character_definition",depth:2,order:0}},runtime:pp()}}function Mt(t={}){let e=fp(),r=t&&typeof t=="object"?t:{},s=r.bypass?r.bypass:r.bypassPresetId?{presetId:r.bypassPresetId,enabled:!!r.bypassPresetId}:void 0,o=Ab(s,r.promptPreset),n=Ho(r.tables,{seedDefaultWhenMissing:!Object.prototype.hasOwnProperty.call(r,"tables")}),a=Fo(r.scope,{mode:r.runScope,selectedTableIds:r.selectedTableIds,activeTableId:r.activeTableId}),i=Zt(r.autoUpdateEnabled!==void 0?r.autoUpdateEnabled:r.automation?.enabled,e.autoUpdateEnabled);return{tables:n,promptTemplate:M(r.promptTemplate,e.promptTemplate),apiPreset:M(r.apiPreset,""),promptPreset:o.presetId,bypass:o,activeTemplate:M(r.activeTemplate,e.activeTemplate),autoUpdateEnabled:i,autoUpdateTrigger:M(r.autoUpdateTrigger,e.autoUpdateTrigger),runScope:a.mode,scope:a,fillMode:r.fillMode===Zi.FULL?Zi.FULL:e.fillMode,contextDepth:Number.isFinite(Number(r.contextDepth))&&Number(r.contextDepth)>0?Math.floor(Number(r.contextDepth)):e.contextDepth,contextRoles:r.contextRoles==="assistant_only"?"assistant_only":"all",contextExtractTags:Array.isArray(r.contextExtractTags)?r.contextExtractTags.filter(l=>typeof l=="string"&&l.trim()):typeof r.contextExtractTags=="string"&&r.contextExtractTags.trim()?r.contextExtractTags.split(`
`).map(l=>l.trim()).filter(Boolean):[],contextUseGlobalRules:Zt(r.contextUseGlobalRules??r.contextUseExtractRules??r.contextUseExcludeRules,!1),extraction:{regexPresetId:M(r.extraction?.regexPresetId,"")},worldbooks:{enabled:Zt(r.worldbooks?.enabled,!1),selected:Array.isArray(r.worldbooks?.selected)?r.worldbooks.selected.filter(l=>typeof l=="string"&&l.trim()):[],presetId:M(r.worldbooks?.presetId,"")},sendLatestRows:Number.isFinite(Number(r.sendLatestRows))?Math.floor(Number(r.sendLatestRows)):-1,mirrorToMessage:Zt(r.mirrorToMessage,e.mirrorToMessage),mirrorTag:M(r.mirrorTag,e.mirrorTag),worldbookSync:{enabled:Zt(r.worldbookSync?.enabled,!1),targetBook:M(r.worldbookSync?.targetBook,""),entryComment:M(r.worldbookSync?.entryComment,e.worldbookSync.entryComment),wrapperConfig:r.worldbookSync?.wrapperConfig?{enabled:Zt(r.worldbookSync.wrapperConfig?.enabled,!0),wrapperTag:M(r.worldbookSync.wrapperConfig?.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:M(r.worldbookSync.wrapperConfig?.wrapperHint,""),wrapperPlacement:{position:M(r.worldbookSync.wrapperConfig?.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.depth))?Math.floor(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.order))?Math.floor(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}}:void 0},wrapperConfig:{enabled:Zt(r.wrapperConfig?.enabled,e.wrapperConfig.enabled),wrapperTag:M(r.wrapperConfig?.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:M(r.wrapperConfig?.wrapperHint,e.wrapperConfig.wrapperHint),wrapperPlacement:{position:M(r.wrapperConfig?.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(r.wrapperConfig?.wrapperPlacement?.depth))?Math.floor(Number(r.wrapperConfig?.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(r.wrapperConfig?.wrapperPlacement?.order))?Math.floor(Number(r.wrapperConfig?.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}},runtime:pp({...e.runtime,...r.runtime||{}})}}function nl(t={}){let e=Mt(t),r=[];return Array.isArray(e.tables)||r.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u662F JSON \u6570\u7EC4\u3002"),e.promptTemplate||r.push("\u586B\u8868 Prompt \u4E0D\u80FD\u4E3A\u7A7A\u3002"),e.mirrorTag||r.push("\u6B63\u6587\u955C\u50CF\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A\u3002"),{valid:r.length===0,errors:r,config:e}}function Ue(){let t=el.get(tl,fp()),e=Mt(t),r=Qi();return{...ap(e,r),guide:r}}function Rb(t){let r=(Array.isArray(t?.tables)?t.tables:[]).map(s=>({...s,rows:[]}));return{...t,tables:r}}function Rt(t={}){let e=Ue(),r=Mt({...e,...t||{},runtime:t?.runtime===void 0?e.runtime:t.runtime}),s=nl(r);if(!s.valid)return{success:!1,error:s.errors.join(`
`),errors:s.errors,config:s.config};let o=Rb(s.config);return el.set(tl,o),np({templateId:s.config.activeTemplate,scope:s.config.scope,worldbookSync:s.config.worldbookSync}),{success:!0,config:s.config}}function gp(t={}){let e=Ue(),r=Mt({...e,runtime:{...e.runtime,...t||{}}});return el.set(tl,r),r.runtime}function Pb(t={},e={}){let r=Mt(t),s=M(r.promptTemplate,lp);return e.skipResponseContract?s.trim():`${s}

${gb}`.trim()}function mp(t={},e={}){let r=Mt(t);return{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",promptTemplate:Pb(r,e),bypass:{enabled:r.bypass?.enabled===!0,presetId:r.bypass?.presetId||r.promptPreset||""}}}var el,tl,_e,Zi,lp,gb,cp,rl,F0,ht,dp,Yo,Dr=P(()=>{$e();Qe();qo();Qn();ip();el=N.namespace("tableWorkbench"),tl="config",_e=Object.freeze({IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error",ABORTED:"aborted",SKIPPED:"skipped"}),Zi=Object.freeze({INCREMENTAL:"incremental",FULL:"full"}),lp=`\u8BF7\u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5F53\u524D\u8868\u683C\u57FA\u5E95\uFF0C\u5BF9\u7ED3\u6784\u5316 tables \u6570\u636E\u505A\u589E\u91CF\u66F4\u65B0\u3002

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
{{toolContentMacro}}`,gb=`\u8F93\u51FA\u8981\u6C42 \u2014 \u7528 <tableEdit>...</tableEdit> \u589E\u91CF DSL\uFF1A

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
\u4F46\u5E94\u8BE5\u5C3D\u91CF\u4F18\u5148\u7528 DSL\uFF08\u6D41\u91CF\u5C0F\u3001\u4E0D\u5F71\u54CD\u9501\u5B57\u6BB5\uFF09\u3002`,cp=Object.freeze([{value:"text",label:"\u6587\u672C"},{value:"number",label:"\u6570\u5B57"},{value:"boolean",label:"\u5E03\u5C14"},{value:"date",label:"\u65E5\u671F"},{value:"json",label:"JSON"}]),rl="text",F0=Object.freeze(cp.map(t=>Object.freeze({...t}))),ht="default_story_state",dp="\u9ED8\u8BA4\u5267\u60C5\u72B6\u6001\u6A21\u677F";Yo=Object.freeze([Lr({id:"default_global_state",name:"\u5168\u5C40\u6570\u636E\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u4E3B\u89D2\u6240\u5728\u5730\u70B9\u53CA\u65F6\u95F4\u76F8\u5173\u53C2\u6570\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u63D2\u5165\u4E00\u6761\u5173\u4E8E\u5F53\u524D\u4E16\u754C\u72B6\u6001\u7684\u8BB0\u5F55\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u5730\u70B9\u6216\u65F6\u95F4\u53D1\u751F\u53D8\u5316\u65F6\u66F4\u65B0\u6B64\u8868\uFF1B\u6BCF\u8F6E\u5E94\u6839\u636E\u5267\u60C5\u66F4\u65B0\u65F6\u95F4\u76F8\u5173\u5B57\u6BB5\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[Z("location","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u5730\u70B9","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u7684\u5177\u4F53\u573A\u666F\u540D\u79F0\u3002"),Z("current_time","\u5F53\u524D\u65F6\u95F4","\u6E38\u620F\u4E16\u754C\u7684\u5F53\u524D\u65F6\u95F4\uFF1B\u5982\u5267\u60C5\u6CA1\u6709\u660E\u786E\u65F6\u95F4\uFF0C\u53EF\u6839\u636E\u4E16\u754C\u89C2\u7ED9\u51FA\u5408\u7406\u65F6\u95F4\u3002"),Z("previous_scene_time","\u4E0A\u8F6E\u573A\u666F\u65F6\u95F4","\u4E0A\u4E00\u8F6E\u4EA4\u4E92\u7ED3\u675F\u65F6\u7684\u65F6\u95F4\u3002"),Z("elapsed_time","\u7ECF\u8FC7\u7684\u65F6\u95F4","\u6839\u636E\u5F53\u524D\u4E0E\u4E0A\u8F6E\u65F6\u95F4\u8BA1\u7B97\u51FA\u7684\u6587\u672C\u63CF\u8FF0\u3002")]}),Lr({id:"default_protagonist_profile",name:"\u4E3B\u89D2\u4FE1\u606F",note:"\u8BB0\u5F55\u4E3B\u89D2\u7684\u6838\u5FC3\u8EAB\u4EFD\u4FE1\u606F\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E3B\u89D2\u7684\u552F\u4E00\u6761\u76EE\u3002",create:"\u7981\u6B62\u65B0\u589E\u591A\u540D\u4E3B\u89D2\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u4E3B\u89D2\u8EAB\u4EFD\u3001\u5916\u8C8C\u3001\u7ECF\u5386\u6216\u6027\u683C\u6709\u660E\u786E\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[Z("name","\u4EBA\u7269\u540D\u79F0","\u4E3B\u89D2\u7684\u540D\u5B57\u3002"),Z("gender_age","\u6027\u522B/\u5E74\u9F84","\u4E3B\u89D2\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),Z("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u4E3B\u89D2\u5916\u8C8C\u7684\u5BA2\u89C2\u6587\u5B57\u63CF\u5199\u3002"),Z("identity","\u804C\u4E1A/\u8EAB\u4EFD","\u4E3B\u89D2\u5728\u793E\u4F1A\u6216\u5267\u60C5\u4E2D\u7684\u4E3B\u8981\u8EAB\u4EFD\u3002"),Z("history","\u8FC7\u5F80\u7ECF\u5386","\u4E3B\u89D2\u80CC\u666F\u6545\u4E8B\u4E0E\u5173\u952E\u7ECF\u5386\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002"),Z("personality","\u6027\u683C\u7279\u70B9","\u5BF9\u4E3B\u89D2\u6838\u5FC3\u6027\u683C\u7684\u6982\u62EC\u3002")]}),Lr({id:"default_important_characters",name:"\u91CD\u8981\u89D2\u8272\u8868",note:"\u8BB0\u5F55\u5173\u952E NPC \u6216\u91CD\u8981\u89D2\u8272\u7684\u4FE1\u606F\u548C\u52A8\u6001\u72B6\u6001\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u4E3A\u5F53\u524D\u5728\u573A\u7684\u91CD\u8981\u4EBA\u7269\u5206\u522B\u63D2\u5165\u6761\u76EE\u3002",create:"\u5267\u60C5\u4E2D\u6709\u672A\u8BB0\u5F55\u7684\u91CD\u8981\u4EBA\u7269\u767B\u573A\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u89D2\u8272\u7684\u72B6\u6001\u3001\u5173\u7CFB\u3001\u60F3\u6CD5\u3001\u7ECF\u5386\u6216\u6301\u6709\u7269\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u901A\u5E38\u7981\u6B62\u5220\u9664\uFF1B\u89D2\u8272\u79BB\u573A\u65F6\u4F18\u5148\u66F4\u65B0\u201C\u662F\u5426\u79BB\u573A\u201D\u3002"},columns:[Z("name","\u59D3\u540D","\u89D2\u8272\u59D3\u540D\u3002"),Z("gender_age","\u6027\u522B/\u5E74\u9F84","\u89D2\u8272\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),Z("summary","\u4E00\u53E5\u8BDD\u4ECB\u7ECD","\u7528\u7B80\u77ED\u6587\u5B57\u6982\u62EC\u89D2\u8272\u8EAB\u4EFD\u80CC\u666F\u3002"),Z("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u89D2\u8272\u5916\u8C8C\u548C\u5F53\u524D\u8863\u7740\u7684\u5BA2\u89C2\u63CF\u5199\u3002"),Z("important_items","\u6301\u6709\u7684\u91CD\u8981\u7269\u54C1","\u89D2\u8272\u62E5\u6709\u7684\u5173\u952E\u7269\u54C1\uFF0C\u7528\u5206\u53F7\u5206\u9694\u3002"),Z("offstage","\u662F\u5426\u79BB\u573A","\u5224\u65AD\u8BE5\u89D2\u8272\u5F53\u524D\u662F\u5426\u5DF2\u7ECF\u79BB\u573A\uFF0C\u586B\u5199\u201C\u662F\u201D\u6216\u201C\u5426\u201D\u3002","boolean"),Z("history","\u8FC7\u5F80\u7ECF\u5386","\u89D2\u8272\u80CC\u666F\u4E0E\u5173\u952E\u4E8B\u4EF6\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002")]}),Lr({id:"default_protagonist_skills",name:"\u4E3B\u89D2\u6280\u80FD\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u83B7\u5F97\u7684\u6280\u80FD\u3001\u80FD\u529B\u6216\u9636\u6BB5\u6027\u6210\u957F\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u6280\u80FD\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u65B0\u6280\u80FD\u6216\u65B0\u80FD\u529B\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u6280\u80FD\u5347\u7EA7\u3001\u964D\u7EA7\u6216\u6548\u679C\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u6280\u80FD\u88AB\u5267\u60C5\u5265\u593A\u3001\u66FF\u6362\u6216\u5931\u6548\u65F6\u5220\u9664\u3002"},columns:[Z("skill_name","\u6280\u80FD\u540D\u79F0","\u6280\u80FD\u6216\u80FD\u529B\u540D\u79F0\u3002"),Z("skill_type","\u6280\u80FD\u7C7B\u578B","\u6280\u80FD\u7C7B\u522B\uFF0C\u4F8B\u5982\u4E3B\u52A8\u3001\u88AB\u52A8\u3001\u5929\u8D4B\u7B49\u3002"),Z("level","\u7B49\u7EA7/\u9636\u6BB5","\u6280\u80FD\u5F53\u524D\u7B49\u7EA7\u3001\u719F\u7EC3\u5EA6\u6216\u9636\u6BB5\u3002"),Z("effect","\u6548\u679C\u63CF\u8FF0","\u6280\u80FD\u5728\u5F53\u524D\u9636\u6BB5\u4E0B\u7684\u5177\u4F53\u6548\u679C\u3002")]}),Lr({id:"default_inventory",name:"\u80CC\u5305\u7269\u54C1\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u62E5\u6709\u7684\u7269\u54C1\u3001\u88C5\u5907\u6216\u6D88\u8017\u54C1\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u643A\u5E26\u7269\u54C1\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u80CC\u5305\u4E2D\u6CA1\u6709\u7684\u5168\u65B0\u7269\u54C1\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u7269\u54C1\u6570\u91CF\u3001\u72B6\u6001\u6216\u63CF\u8FF0\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7269\u54C1\u88AB\u5B8C\u5168\u6D88\u8017\u3001\u4E22\u5F03\u6216\u6467\u6BC1\u65F6\u5220\u9664\u3002"},columns:[Z("item_name","\u7269\u54C1\u540D\u79F0","\u7269\u54C1\u540D\u79F0\u3002"),Z("quantity","\u6570\u91CF","\u62E5\u6709\u6570\u91CF\u3002","number"),Z("description","\u63CF\u8FF0/\u6548\u679C","\u7269\u54C1\u529F\u80FD\u3001\u6548\u679C\u6216\u80CC\u666F\u63CF\u8FF0\u3002"),Z("category","\u7C7B\u522B","\u7269\u54C1\u7C7B\u522B\uFF0C\u4F8B\u5982\u6B66\u5668\u3001\u6D88\u8017\u54C1\u3001\u6742\u7269\u7B49\u3002")]}),Lr({id:"default_quests_events",name:"\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u6B63\u5728\u8FDB\u884C\u6216\u9700\u8981\u6301\u7EED\u8FFD\u8E2A\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u8981\u4EFB\u52A1\u6216\u5173\u952E\u4E8B\u4EF6\u3002",create:"\u4E3B\u89D2\u63A5\u53D6\u3001\u89E6\u53D1\u6216\u53D1\u73B0\u65B0\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u65F6\u65B0\u589E\u3002",update:"\u4EFB\u52A1\u53D6\u5F97\u5173\u952E\u8FDB\u5C55\u3001\u76EE\u6807\u53D8\u5316\u6216\u65F6\u9650\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u4EFB\u52A1\u5B8C\u6210\u3001\u5931\u8D25\u3001\u8FC7\u671F\u6216\u4E0D\u518D\u9700\u8981\u8FFD\u8E2A\u65F6\u5220\u9664\u3002"},columns:[Z("quest_name","\u4EFB\u52A1\u540D\u79F0","\u4EFB\u52A1\u6216\u4E8B\u4EF6\u6807\u9898\u3002"),Z("quest_type","\u4EFB\u52A1\u7C7B\u578B","\u4E3B\u7EBF\u3001\u652F\u7EBF\u3001\u4E2A\u4EBA\u3001\u7A81\u53D1\u4E8B\u4EF6\u7B49\u3002"),Z("issuer","\u53D1\u5E03\u8005","\u53D1\u5E03\u4EFB\u52A1\u6216\u89E6\u53D1\u4E8B\u4EF6\u7684\u89D2\u8272\u3001\u5730\u70B9\u6216\u52BF\u529B\u3002"),Z("detail","\u8BE6\u7EC6\u63CF\u8FF0","\u4EFB\u52A1\u76EE\u6807\u3001\u4E8B\u4EF6\u80CC\u666F\u548C\u8981\u6C42\u3002"),Z("progress","\u5F53\u524D\u8FDB\u5EA6","\u5BF9\u5B8C\u6210\u5EA6\u6216\u5F53\u524D\u9636\u6BB5\u7684\u7B80\u8981\u63CF\u8FF0\u3002"),Z("deadline","\u4EFB\u52A1\u65F6\u9650","\u5B8C\u6210\u4EFB\u52A1\u7684\u5269\u4F59\u65F6\u95F4\u6216\u622A\u6B62\u6761\u4EF6\u3002"),Z("reward","\u5956\u52B1","\u5B8C\u6210\u540E\u53EF\u80FD\u83B7\u5F97\u7684\u5956\u52B1\u3002"),Z("penalty","\u60E9\u7F5A","\u5931\u8D25\u6216\u9519\u8FC7\u540E\u7684\u540E\u679C\u3002")]}),Lr({id:"default_memo_log",name:"\u7EAA\u8981\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u6216\u5173\u952E\u7247\u6BB5\u53D1\u751F\u7684\u4E8B\u4EF6\u7EAA\u8981\uFF0C\u7528\u4E8E\u540E\u7EED\u56DE\u987E\u3002",aiInstructions:{init:"\u6545\u4E8B\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E00\u6761\u8BB0\u5F55\uFF0C\u7528\u4E8E\u8BB0\u5F55\u521D\u59CB\u5316\u5267\u60C5\u3002",create:"\u6BCF\u8F6E\u4EA4\u4E92\u7ED3\u675F\u540E\uFF0C\u82E5\u53D1\u751F\u4E86\u503C\u5F97\u8BB0\u5F55\u7684\u65B0\u4E8B\u4EF6\uFF0C\u5219\u63D2\u5165\u4E00\u6761\u65B0\u7EAA\u8981\u3002",update:"\u901A\u5E38\u7981\u6B62\u66F4\u65B0\u5386\u53F2\u7EAA\u8981\uFF1B\u53EA\u6709\u660E\u663E\u4E8B\u5B9E\u9519\u8BEF\u65F6\u624D\u4FEE\u6B63\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[Z("time_span","\u65F6\u95F4\u8DE8\u5EA6","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u7684\u65F6\u95F4\u8303\u56F4\u3002"),Z("location","\u5730\u70B9","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u5730\u70B9\u3002"),Z("memo","\u7EAA\u8981","\u4EE5\u7B2C\u4E09\u65B9\u89C6\u89D2\u5BA2\u89C2\u8BB0\u5F55\u672C\u8F6E\u53D1\u751F\u7684\u4E8B\u5B9E\u3002"),Z("summary","\u6982\u89C8","\u4E00\u53E5\u8BDD\u6982\u62EC\u7EAA\u8981\u5185\u5BB9\u3002"),Z("index_code","\u7F16\u7801\u7D22\u5F15","\u7528\u4E8E\u540E\u7EED\u68C0\u7D22\u7684\u7B80\u77ED\u7F16\u7801\u3002")]}),Lr({id:"default_options",name:"\u9009\u9879\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u4E3B\u89D2\u53EF\u4EE5\u91C7\u53D6\u7684\u884C\u52A8\u9009\u9879\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002\u6240\u6709\u9009\u9879\u4F7F\u7528\u7B2C\u4E09\u4EBA\u79F0\uFF0C\u4E0D\u4EE3\u66FF\u4E3B\u89D2\u53D1\u8A00\uFF0C\u5E76\u7D27\u6263\u5F53\u524D\u5267\u60C5\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u751F\u6210\u56DB\u4E2A\u521D\u59CB\u884C\u52A8\u9009\u9879\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u6BCF\u8F6E\u4EA4\u4E92\u540E\u6839\u636E\u5F53\u524D\u5267\u60C5\u751F\u6210\u65B0\u7684\u56DB\u4E2A\u9009\u9879\u5E76\u8986\u76D6\u539F\u6709\u5185\u5BB9\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[Z("option_1","\u9009\u9879\u4E00","\u504F\u5411\u7B56\u7565\u3001\u63A8\u8FDB\u5267\u60C5\u6216\u89E3\u51B3\u5F53\u524D\u95EE\u9898\u7684\u884C\u52A8\u3002"),Z("option_2","\u9009\u9879\u4E8C","\u504F\u5411\u8C28\u614E\u89C2\u5BDF\u3001\u6536\u96C6\u4FE1\u606F\u6216\u4FDD\u6301\u4E2D\u7ACB\u7684\u884C\u52A8\u3002"),Z("option_3","\u9009\u9879\u4E09","\u504F\u5411\u5E2E\u52A9\u3001\u4FDD\u62A4\u3001\u6C9F\u901A\u6216\u5B89\u629A\u7684\u884C\u52A8\u3002"),Z("option_4","\u9009\u9879\u56DB","\u504F\u5411\u5192\u9669\u3001\u8BD5\u63A2\u3001\u6539\u53D8\u5C40\u52BF\u6216\u5173\u7CFB\u4E92\u52A8\u7684\u884C\u52A8\u3002")]})])});function il(){return al||(al=C.createScope("TableIsolation")),al}var hp,bp,al,ll,Ne,hs=P(()=>{$e();G();Qe();hp="tableEngine.isolation",bp=Object.freeze({enabled:!1,key:It});ll=class{constructor(){this._cache=null,this._subscribers=new Set}getState(){if(this._cache)return this._cache;let e=N.get(hp,null);return this._cache=this._normalize(e),this._cache}isEnabled(){return this.getState().enabled===!0}getKey(){let e=this.getState();return e.enabled?e.key||It:It}getConfiguredKey(){return this.getState().key}setEnabled(e){let r=this._normalize({...this.getState(),enabled:!!e});this._commit(r,{reason:"enabled"})}setKey(e){let r=this._normalize({...this.getState(),key:e});this._commit(r,{reason:"key"})}updateState(e={}){let r=this.getState(),s=this._normalize({enabled:e.enabled!==void 0?!!e.enabled:r.enabled,key:e.key!==void 0?e.key:r.key});this._commit(s,{reason:"patch"})}reset(){this._commit({...bp},{reason:"reset"})}getScopeKey(e){return jo(e,this.getKey())}subscribe(e){return typeof e!="function"?()=>{}:(this._subscribers.add(e),()=>this._subscribers.delete(e))}_normalize(e){return!e||typeof e!="object"?{...bp}:{enabled:e.enabled===!0,key:Se(e.key)}}_commit(e,r={}){let s=this.getState();if(s.enabled===e.enabled&&s.key===e.key)return;this._cache=e;try{N.set(hp,e)}catch(n){il().error("isolation \u72B6\u6001\u843D\u76D8\u5931\u8D25",n)}il().info("isolation \u72B6\u6001\u53D8\u5316",{prev:s,next:e,reason:r.reason||""});let o={...e,prev:s,reason:r.reason||""};for(let n of this._subscribers)try{n(o)}catch(a){il().error("isolation \u8BA2\u9605\u8005\u56DE\u8C03\u5F02\u5E38",a)}}},Ne=new ll});var xp={};re(xp,{AuthorityProvider:()=>ea,default:()=>Db});var to,cl,Nb,$r,ea,Db,wp=P(()=>{G();Vo();to=C.createScope("AuthorityProvider"),cl="third-party/youyou-toolkit",Nb="YouYou Toolkit",$r="main",ea=class{constructor({extensionVersion:e="1.0.149"}={}){this.kind=ro.AUTHORITY,this._client=null,this._extensionVersion=e,this._initialized=!1}async init(){let e=ta();if(!e)return to.error("\u672A\u68C0\u6D4B\u5230 window.STAuthority.AuthoritySDK"),!1;try{return this._client=await e.init({extensionId:cl,displayName:Nb,version:this._extensionVersion,installType:"local",declaredPermissions:{sql:{private:!0}}}),this._initialized=!0,to.info("AuthorityProvider \u521D\u59CB\u5316\u6210\u529F",{extensionId:cl}),!0}catch(r){return to.error("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25",{error:r?.message||r}),this._initialized=!1,!1}}async dispose(){this._client=null,this._initialized=!1}async migrate({migrations:e,database:r=$r,tableName:s}={}){this._ensureReady();let o={database:r,migrations:e};s&&(o.tableName=s);let n=await this._client.sql.migrate(o);return{applied:n?.applied||[],skipped:n?.skipped||[],tableName:n?.tableName,latestId:n?.latestId}}async query({statement:e,params:r=[],database:s=$r,page:o=void 0}={}){this._ensureReady();let n={database:s,statement:e,params:r};o&&(n.page=o);let a=await this._client.sql.query(n);return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0),page:a.page}}async execute({statement:e,params:r=[],database:s=$r}={}){this._ensureReady();let o=await this._client.sql.exec({database:s,statement:e,params:r});return{rowsAffected:o.rowsAffected??0,lastInsertRowid:o.lastInsertRowid??null}}async batch({statements:e,database:r=$r}={}){this._ensureReady();let s=(e||[]).map(n=>({mode:n.mode||(/^\s*SELECT/i.test(n.statement)?"query":"exec"),statement:n.statement,params:n.params||[]}));return{results:(await this._client.sql.batch({database:r,statements:s}))?.results||[]}}async transaction({statements:e,database:r=$r}={}){this._ensureReady();let s=(e||[]).map(n=>({mode:n.mode||(/^\s*SELECT/i.test(n.statement)?"query":"exec"),statement:n.statement,params:n.params||[]})),o=await this._client.sql.transaction({database:r,statements:s});return{committed:!!o?.committed,results:o?.results||[]}}async paginate({statement:e,params:r=[],database:s=$r,page:o={}}={}){return this._ensureReady(),this.query({statement:e,params:r,database:s,page:o})}async pageAll({statement:e,params:r=[],database:s=$r,pageSize:o=200,maxPages:n}={}){this._ensureReady();let a=await this._client.sql.pageAll({database:s,statement:e,params:r},{pageSize:o,maxPages:n});return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0)}}async backup(){return to.warn("backup() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5907\u4EFD"),{kind:"authority",timestamp:Date.now()}}async export(){return to.warn("export() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u51FA"),{kind:"authority",timestamp:Date.now()}}async import(){to.warn("import() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u5165")}describe(){return{kind:this.kind,initialized:this._initialized,extensionId:cl,database:$r,hasClient:!!this._client}}_ensureReady(){if(!this._initialized||!this._client)throw new Error("AuthorityProvider \u5C1A\u672A\u521D\u59CB\u5316")}},Db=ea});var Tp={};re(Tp,{FallbackProvider:()=>ra,default:()=>Wb});function Lb(t){let e=[],r=0,s="";for(let o of t)o==="("?r+=1:o===")"&&(r-=1),o===","&&r===0?(s.trim()&&e.push(s),s=""):s+=o;return s.trim()&&e.push(s),e}function $b(t){let e=t.match(/^\s*CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(([\s\S]+)\)\s*$/i);if(!e)return null;let r=e[1],s=e[2],o=Lb(s),n=[],a=[];for(let i of o){let l=i.trim(),d=l.match(/^PRIMARY\s+KEY\s*\(([^)]+)\)$/i);if(d){a=d[1].split(",").map(u=>u.trim());continue}let c=l.match(/^(\w+)\s+(\w+)/);c&&(n.push({name:c[1],type:c[2].toUpperCase(),raw:l}),/PRIMARY\s+KEY/i.test(l)&&!a.length&&(a=[c[1]]))}return{name:r,columns:n,pkCols:a}}function Ob(t){let e=t.match(/^\s*INSERT\s+(?:OR\s+REPLACE\s+)?INTO\s+(\w+)(?:\s*\(([^)]+)\))?\s+VALUES\s*\(([^)]+)\)\s*$/i);if(!e)return null;let r=e[1],s=e[2]?e[2].split(",").map(n=>n.trim()):null,o=(e[3].match(/\?/g)||[]).length;return{name:r,cols:s,paramCount:o}}function pl(t){let e=t.split(/\s+AND\s+/i),r=[];for(let s of e){let o=s.match(/^\s*(\w+)\s*(=|!=|<>|>=|<=|>|<)\s*\?\s*$/);if(o){let a=o[2]==="<>"?"!=":o[2];r.push({col:o[1],op:a,placeholder:!0});continue}let n=s.match(/^\s*(\w+)\s+IS\s+(NOT\s+)?NULL\s*$/i);if(n){r.push({col:n[1],op:n[2]?"IS NOT NULL":"IS NULL",placeholder:!1});continue}throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 WHERE \u5B50\u53E5: "${s}"`)}return r}function Bb(t){let e=t.match(/^\s*SELECT\s+([\s\S]+?)\s+FROM\s+(\w+)([\s\S]*)$/i);if(!e)return null;let r=e[1].trim(),s=e[2],o=e[3],n=o.match(/\bWHERE\s+([\s\S]+?)(?=\bORDER\s+BY\b|\bLIMIT\b|\bOFFSET\b|$)/i),a=o.match(/\bORDER\s+BY\s+(\w+)\s*(ASC|DESC)?/i),i=o.match(/\bLIMIT\s+(\d+)/i),l=o.match(/\bOFFSET\s+(\d+)/i);return{name:s,cols:r==="*"?null:r.split(",").map(d=>d.trim()),where:n?pl(n[1].trim()):null,orderBy:a?{col:a[1],dir:(a[2]||"ASC").toUpperCase()}:null,limit:i?parseInt(i[1],10):null,offset:l?parseInt(l[1],10):null}}function zb(t){let e=t.match(/^\s*UPDATE\s+(\w+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);if(!e)return null;let r=e[1],s=e[2],o=e[3],n=s.split(",").map(a=>{let i=a.trim().match(/^(\w+)\s*=\s*\?$/);if(!i)throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 SET \u5B50\u53E5: "${a}"`);return i[1]});return{name:r,setCols:n,where:o?pl(o.trim()):null}}function Kb(t){let e=t.match(/^\s*DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);return e?{name:e[1],where:e[2]?pl(e[2].trim()):null}:null}function ul(t,e){return t===e?!0:t==null?e==null:e==null?!1:typeof t=="number"||typeof e=="number"?Number(t)===Number(e):String(t)===String(e)}function Jo(t,e){return t===e?0:t==null?-1:e==null?1:typeof t=="number"&&typeof e=="number"?t-e:String(t)<String(e)?-1:1}function Ub(t,e,r){let s=t[e.col];if(e.op==="IS NULL")return s==null;if(e.op==="IS NOT NULL")return s!=null;let o=r.shift();switch(e.op){case"=":return ul(s,o);case"!=":return!ul(s,o);case">":return Jo(s,o)>0;case"<":return Jo(s,o)<0;case">=":return Jo(s,o)>=0;case"<=":return Jo(s,o)<=0;default:return!1}}function dl(t,e,r){if(!e||!e.length)return!0;let s=Array.isArray(r)?[...r]:[];for(let o of e)if(!Ub(t,o,s))return!1;return!0}var so,vp,ra,Wb,Sp=P(()=>{G();$e();Vo();so=C.createScope("FallbackProvider"),vp="provider_fallback_v1";ra=class{constructor(){this.kind=ro.FALLBACK,this._tables=new Map,this._migrations=new Set,this._initialized=!1,this._dirty=!1,this._saveTimer=null}async init(){try{let e=me.get(vp)||{};this._migrations=new Set(Array.isArray(e.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,s]of Object.entries(e.tables||{}))this._tables.set(r,{schema:s.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(s.rows)?s.rows:[]});return this._initialized=!0,so.info("FallbackProvider \u521D\u59CB\u5316\u5B8C\u6210",{tables:this._tables.size,migrations:this._migrations.size}),!0}catch(e){return so.error("FallbackProvider \u521D\u59CB\u5316\u5931\u8D25",{error:e?.message||e}),this._initialized=!1,!1}}async dispose(){this._flushSave(!0),this._tables.clear(),this._migrations.clear(),this._initialized=!1}async migrate({migrations:e}={}){this._ensureReady();let r=[],s=[];for(let o of e||[]){if(!o?.id||!o?.statement)continue;if(this._migrations.has(o.id)){s.push(o.id);continue}let n=o.statement.trim();if(/^CREATE\s+TABLE/i.test(n)){let a=$b(n);if(!a)throw new Error(`\u65E0\u6CD5\u89E3\u6790 CREATE TABLE: ${n}`);this._tables.has(a.name)||this._tables.set(a.name,{schema:a,rows:[]})}else if(!/^CREATE\s+(UNIQUE\s+)?INDEX/i.test(n))if(/^DROP\s+TABLE/i.test(n)){let a=n.match(/^DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?(\w+)/i);a&&this._tables.delete(a[1])}else/^ALTER\s+TABLE/i.test(n)?so.warn("FallbackProvider \u4E0D\u652F\u6301 ALTER TABLE\uFF0C\u8DF3\u8FC7",{id:o.id}):so.warn("FallbackProvider \u8DF3\u8FC7\u672A\u8BC6\u522B DDL",{id:o.id,statement:n});this._migrations.add(o.id),r.push(o.id)}return this._markDirty(),{applied:r,skipped:s}}async query({statement:e,params:r=[]}={}){this._ensureReady();let s=Bb(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 SELECT: ${e}`);let o=this._tables.get(s.name);if(!o)return{columns:s.cols||[],rows:[],rowCount:0};let n=o.rows.filter(l=>dl(l,s.where,r));if(s.orderBy){let l=s.orderBy.dir==="DESC"?-1:1;n=[...n].sort((d,c)=>Jo(d[s.orderBy.col],c[s.orderBy.col])*l)}s.offset&&(n=n.slice(s.offset)),Number.isFinite(s.limit)&&(n=n.slice(0,s.limit));let a,i=n;return s.cols?(i=n.map(l=>{let d={};for(let c of s.cols)d[c]=l[c]===void 0?null:l[c];return d}),a=s.cols):a=o.schema?.columns?.map(l=>l.name)||(i[0]?Object.keys(i[0]):[]),{columns:a,rows:i,rowCount:i.length}}async execute({statement:e,params:r=[]}={}){this._ensureReady();let s=String(e||"").trim(),o=s.split(/\s+/)[0].toUpperCase(),n;if(o==="INSERT")n=this._doInsert(s,r);else if(o==="UPDATE")n=this._doUpdate(s,r);else if(o==="DELETE")n=this._doDelete(s,r);else throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 execute \u8BED\u53E5: ${e}`);return n}_doInsert(e,r){let s=Ob(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 INSERT: ${e}`);let o=this._tables.get(s.name);if(!o)throw new Error(`\u8868\u4E0D\u5B58\u5728: ${s.name}`);let n=s.cols||(o.schema.columns||[]).map(d=>d.name);if(!n.length)throw new Error(`\u8868 ${s.name} \u65E0\u5217\u5B9A\u4E49`);if(r.length!==n.length)throw new Error(`INSERT \u53C2\u6570\u6570\u91CF\u4E0D\u5339\u914D (\u671F\u671B ${n.length}, \u5B9E\u9645 ${r.length})`);let a={};for(let d=0;d<n.length;d+=1)a[n[d]]=r[d];let i=o.schema?.pkCols||[],l=/^INSERT\s+OR\s+REPLACE/i.test(e);if(i.length){let d=o.rows.findIndex(c=>i.every(u=>ul(c[u],a[u])));if(d>=0){if(l)return o.rows[d]=a,this._markDirty(),{rowsAffected:1,lastInsertRowid:d+1};throw new Error(`PRIMARY KEY \u51B2\u7A81 (${i.join(",")})`)}}return o.rows.push(a),this._markDirty(),{rowsAffected:1,lastInsertRowid:o.rows.length}}_doUpdate(e,r){let s=zb(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 UPDATE: ${e}`);let o=this._tables.get(s.name);if(!o)return{rowsAffected:0,lastInsertRowid:null};let n=s.setCols.length;if(r.length<n)throw new Error(`UPDATE \u53C2\u6570\u4E0D\u8DB3 (SET \u9700\u8981 ${n}, \u5B9E\u9645 ${r.length})`);let a=r.slice(0,n),i=r.slice(n),l=0;for(let d of o.rows)if(dl(d,s.where,i)){for(let c=0;c<n;c+=1)d[s.setCols[c]]=a[c];l+=1}return l>0&&this._markDirty(),{rowsAffected:l,lastInsertRowid:null}}_doDelete(e,r){let s=Kb(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 DELETE: ${e}`);let o=this._tables.get(s.name);if(!o)return{rowsAffected:0,lastInsertRowid:null};let n=o.rows.length;o.rows=o.rows.filter(i=>!dl(i,s.where,r));let a=n-o.rows.length;return a>0&&this._markDirty(),{rowsAffected:a,lastInsertRowid:null}}async batch({statements:e}={}){this._ensureReady();let r=[];for(let s of e||[])if(String(s.statement||"").trim().split(/\s+/)[0].toUpperCase()==="SELECT"){let n=await this.query(s);r.push({kind:"query",...n})}else{let n=await this.execute(s);r.push({kind:"exec",...n})}return{results:r}}async transaction({statements:e}={}){this._ensureReady();let r=this._snapshot();try{let{results:s}=await this.batch({statements:e});return this._flushSave(!0),{committed:!0,results:s}}catch(s){throw this._restore(r),so.warn("FallbackProvider \u4E8B\u52A1\u56DE\u6EDA",{error:s?.message||s}),s}}async paginate({statement:e,params:r=[],page:s={}}={}){this._ensureReady();let o=Number.isFinite(s?.limit)?s.limit:50,n=Number.isFinite(s?.offset)?s.offset:0,a=`${e} LIMIT ${o} OFFSET ${n}`;return this.query({statement:a,params:r})}async backup(){return this._ensureReady(),this._snapshot()}async export(){return this.backup()}async import(e){this._ensureReady(),this._restore(e||{}),this._markDirty(),this._flushSave(!0)}describe(){return{kind:this.kind,initialized:this._initialized,tables:this._tables.size,migrations:this._migrations.size,tableNames:[...this._tables.keys()]}}_snapshot(){let e={};for(let[r,s]of this._tables)e[r]={schema:s.schema,rows:JSON.parse(JSON.stringify(s.rows))};return{migrations:[...this._migrations],tables:e}}_restore(e){this._migrations=new Set(Array.isArray(e?.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,s]of Object.entries(e?.tables||{}))this._tables.set(r,{schema:s.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(s.rows)?s.rows:[]})}_markDirty(){this._dirty=!0,this._saveTimer&&clearTimeout(this._saveTimer),this._saveTimer=setTimeout(()=>this._flushSave(!1),300)}_flushSave(e){if(this._saveTimer&&(clearTimeout(this._saveTimer),this._saveTimer=null),!(!this._dirty&&!e))try{me.set(vp,this._snapshot()),this._dirty=!1}catch(r){so.error("FallbackProvider \u6301\u4E45\u5316\u5931\u8D25",{error:r?.message||r})}}_ensureReady(){if(!this._initialized)throw new Error("FallbackProvider \u5C1A\u672A\u521D\u59CB\u5316")}},Wb=ra});var _p={};re(_p,{PROVIDER_KIND:()=>ro,createProvider:()=>jb,detectAuthoritySdk:()=>ta,disposeToolDataProvider:()=>Fb,getCurrentProvider:()=>sa,getToolDataProvider:()=>gl});function ta(){if(typeof window>"u")return null;try{let t=window.STAuthority?.AuthoritySDK;if(t)return t}catch{}try{if(window.parent&&window.parent!==window){let t=window.parent.STAuthority?.AuthoritySDK;if(t)return t}}catch{}return null}async function fl({preferAuthority:t=!0,extensionVersion:e="1.0.149"}={}){if(t&&ta()){let{AuthorityProvider:s}=await Promise.resolve().then(()=>(wp(),xp));return new s({extensionVersion:e})}let{FallbackProvider:r}=await Promise.resolve().then(()=>(Sp(),Tp));return new r}async function gl(t={}){return bs||Xo||(Xo=(async()=>{let e=await fl({preferAuthority:!0,...t}),r=await e.init();if(!r&&e.kind===ro.AUTHORITY){yl.warn("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 FallbackProvider");try{await e.dispose()}catch{}e=await fl({preferAuthority:!1}),r=await e.init()}return r?yl.info(`Provider \u521D\u59CB\u5316\u5B8C\u6210: kind=${e.kind}`):yl.error(`Provider \u5168\u90E8\u521D\u59CB\u5316\u5931\u8D25 (kind=${e.kind})`),bs=e,e})(),Xo)}function sa(){return bs}async function jb(t={}){let e=await fl(t);return await e.init(),e}async function Fb(){if(bs){try{await bs.dispose()}catch{}bs=null}Xo=null}var yl,ro,bs,Xo,Vo=P(()=>{G();yl=C.createScope("ToolDataProvider"),ro=Object.freeze({AUTHORITY:"authority",FALLBACK:"fallback"}),bs=null,Xo=null});var zp={};re(zp,{clearChatScopeConfig:()=>Bp,clearLockEntry:()=>Np,clearScopeLocks:()=>Lp,clearSheetLocks:()=>Dp,clearSlot:()=>Mp,commitSlotTables:()=>ia,default:()=>Yb,deleteRowsBySheet:()=>kp,deleteSheetsBySlot:()=>aa,ensureTableDataReady:()=>Oe,getChatScopeConfig:()=>$p,getCurrentTableDataProvider:()=>Ap,getLocksForSheet:()=>Rp,getRowsBySheet:()=>vl,getSheetsBySlot:()=>xl,loadSlotTables:()=>Ip,setChatScopeConfig:()=>Op,setLockEntry:()=>Pp,upsertSheetMeta:()=>bl,upsertSheetRows:()=>wl});function hl(){return ml||(ml=C.createScope("TableDataService")),ml}async function Oe(){return Ep?sa():Qo||(Qo=(async()=>{try{let t=await gl();if(!t)return hl().error("Provider \u4E0D\u53EF\u7528\uFF0C\u8DF3\u8FC7 migration"),null;let e=await t.migrate({migrations:[...Hb]});return Ep=!0,hl().info("\u8868\u683C\u6570\u636E migration \u5B8C\u6210",{kind:t.kind,applied:e?.applied?.length||0,skipped:e?.skipped?.length||0}),t}catch(t){return hl().error("table-data-service migration \u5931\u8D25",t),null}finally{Qo=null}})(),Qo)}function Ap(){return sa()}function Cp(){return Date.now()}function oa(t){try{return JSON.stringify(t)}catch{return"{}"}}function na(t,e=null){if(typeof t!="string")return e;try{return JSON.parse(t)}catch{return e}}function Or(t={}){return{chatId:String(t.chatId??"").trim(),messageId:String(t.messageId??"").trim(),swipeId:String(t.swipeId??"0").trim()||"0",isolationKey:Se(t.isolationKey)}}function Br(t){return t&&t.chatId&&t.messageId}async function bl(t,e){let r=await Oe();if(!r)return!1;let s=Or(t);return!Br(s)||!e?.uid?!1:(await r.execute({statement:`INSERT INTO table_sheets
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, name, columns_json, meta_json, order_no, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e.uid),String(e.name??e.uid),oa(Array.isArray(e.columns)?e.columns:[]),oa(e.meta||e.sourceData||{}),Number.isFinite(e.orderNo)?e.orderNo:0,Cp()]}),!0)}async function xl(t){let e=await Oe();if(!e)return[];let r=Or(t);return Br(r)?((await e.query({statement:`SELECT * FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?
      ORDER BY order_no ASC`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rows||[]).map(o=>({uid:o.sheet_uid,name:o.name,columns:na(o.columns_json,[]),meta:na(o.meta_json,{}),orderNo:o.order_no||0,updatedAt:o.updated_at||0})):[]}async function aa(t){let e=await Oe();if(!e)return 0;let r=Or(t);return Br(r)&&(await e.execute({statement:`DELETE FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rowsAffected||0}async function wl(t,e,r){let s=await Oe();if(!s)return!1;let o=Or(t);if(!Br(o)||!e||!Array.isArray(r))return!1;if(await s.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[o.chatId,o.messageId,o.swipeId,o.isolationKey,String(e)]}),r.length===0)return!0;let n=r.map((a,i)=>({statement:`INSERT INTO table_rows
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, row_index, row_id, row_name, cells_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[o.chatId,o.messageId,o.swipeId,o.isolationKey,String(e),i,String(a?.id??""),String(a?.name??""),oa(a?.cells||{})]}));return typeof s.transaction=="function"?await s.transaction({statements:n}):await s.batch({statements:n}),!0}async function vl(t,e){let r=await Oe();if(!r)return[];let s=Or(t);return!Br(s)||!e?[]:((await r.query({statement:`SELECT * FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?
      ORDER BY row_index ASC`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e)]}))?.rows||[]).map(n=>({id:n.row_id||"",name:n.row_name||"",cells:na(n.cells_json,{}),rowIndex:n.row_index}))}async function kp(t,e){let r=await Oe();if(!r)return 0;let s=Or(t);return!Br(s)||!e?0:(await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e)]}))?.rowsAffected||0}async function Ip(t){let e=await xl(t);if(e.length===0)return[];let r=[];for(let s of e){let o=await vl(t,s.uid);r.push({id:s.uid,uid:s.uid,name:s.name,columns:s.columns,rows:o,meta:s.meta,orderNo:s.orderNo,updatedAt:s.updatedAt})}return r}async function ia(t,e){let r=await Oe();if(!r)return!1;let s=Or(t);if(!Br(s)||!Array.isArray(e))return!1;await aa(s),await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey]});for(let o=0;o<e.length;o++){let n=e[o],a=String(n?.uid||n?.id||`sheet_${o+1}`);await bl(s,{uid:a,name:n?.name||a,columns:n?.columns||[],meta:n?.meta||{},orderNo:Number.isFinite(n?.orderNo)?n.orderNo:o}),await wl(s,a,Array.isArray(n?.rows)?n.rows:[])}return!0}async function Mp(t){let e=await Oe();if(!e)return!1;let r=Or(t);return Br(r)?(await aa(r),await e.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}),!0):!1}async function Rp(t,e){let r=await Oe();if(!r)return[];let s=String(t?.chatId??"").trim(),o=Se(t?.isolationKey);return!s||!e?[]:((await r.query({statement:`SELECT lock_type, target FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s,o,String(e)]}))?.rows||[]).map(a=>({lockType:a.lock_type,target:a.target||""}))}async function Pp(t,e,r,s=""){let o=await Oe();if(!o)return!1;let n=String(t?.chatId??"").trim(),a=Se(t?.isolationKey);return!n||!e||!r?!1:(await o.execute({statement:"INSERT INTO table_locks (chat_id, isolation_key, sheet_uid, lock_type, target) VALUES (?, ?, ?, ?, ?)",params:[n,a,String(e),String(r),String(s)]}),!0)}async function Np(t,e,r,s=""){let o=await Oe();if(!o)return!1;let n=String(t?.chatId??"").trim(),a=Se(t?.isolationKey);return!n||!e||!r?!1:(await o.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ? AND lock_type = ? AND target = ?`,params:[n,a,String(e),String(r),String(s)]}),!0)}async function Dp(t,e){let r=await Oe();if(!r)return!1;let s=String(t?.chatId??"").trim(),o=Se(t?.isolationKey);return!s||!e?!1:(await r.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s,o,String(e)]}),!0)}async function Lp(t){let e=await Oe();if(!e)return!1;let r=String(t?.chatId??"").trim(),s=Se(t?.isolationKey);return r?(await e.execute({statement:"DELETE FROM table_locks WHERE chat_id = ? AND isolation_key = ?",params:[r,s]}),!0):!1}async function $p(t){let e=await Oe();if(!e)return null;let r=String(t??"").trim();if(!r)return null;let o=(await e.query({statement:"SELECT scoped_config_json FROM table_chat_scope WHERE chat_id = ?",params:[r]}))?.rows?.[0];return o?na(o.scoped_config_json,null):null}async function Op(t,e){let r=await Oe();if(!r)return!1;let s=String(t??"").trim();return s?(await r.execute({statement:"INSERT INTO table_chat_scope (chat_id, scoped_config_json, updated_at) VALUES (?, ?, ?)",params:[s,oa(e||{}),Cp()]}),!0):!1}async function Bp(t){let e=await Oe();if(!e)return!1;let r=String(t??"").trim();return r?(await e.execute({statement:"DELETE FROM table_chat_scope WHERE chat_id = ?",params:[r]}),!0):!1}var ml,Hb,Ep,Qo,Yb,Tl=P(()=>{G();Vo();Qe();Hb=Object.freeze([{id:"table_engine_v1__sheets",statement:`
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
    `.replace(/\s+/g," ").trim()}]),Ep=!1,Qo=null;Yb={ensureTableDataReady:Oe,getCurrentTableDataProvider:Ap,upsertSheetMeta:bl,getSheetsBySlot:xl,deleteSheetsBySlot:aa,upsertSheetRows:wl,getRowsBySheet:vl,deleteRowsBySheet:kp,loadSlotTables:Ip,commitSlotTables:ia,clearSlot:Mp,getLocksForSheet:Rp,setLockEntry:Pp,clearLockEntry:Np,clearSheetLocks:Dp,clearScopeLocks:Lp,getChatScopeConfig:$p,setChatScopeConfig:Op,clearChatScopeConfig:Bp}});function mr(){return Sl||(Sl=C.createScope("TableChatScope")),Sl}function er(){let t=globalThis.window||globalThis,e=t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1;return String(e??"").trim()||"default_chat"}function ca(){return new Date().toISOString()}function oo(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function gr(t){let e=El.get(_l,{}),s=(oo(e)?e:{})[t];return Up(s)}function xs(t,e){let r=El.get(_l,{}),s=oo(r)?r:{};s[t]=e,El.set(_l,s),qb(t,e).catch(()=>{})}async function qb(t,e){try{let r=await Promise.resolve().then(()=>(Tl(),zp));await r.ensureTableDataReady(),await r.setChatScopeConfig(t,e||{})}catch(r){mr().warn("chat-scope SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:r?.message||String(r)})}}function Kp(){return{template:{},templateArchives:{}}}function Up(t){return oo(t)?{template:oo(t.template)?t.template:{},templateArchives:oo(t.templateArchives)?t.templateArchives:{}}:Kp()}function la(t){return oo(t)?{mode:Vb.has(t.mode)?t.mode:gt.INHERIT_GLOBAL,presetName:typeof t.presetName=="string"?t.presetName:"",templateStr:typeof t.templateStr=="string"?t.templateStr:"",guideData:t.guideData!==void 0?ie(t.guideData):null,updatedAt:typeof t.updatedAt=="string"?t.updatedAt:ca(),source:typeof t.source=="string"?t.source:"ui"}:null}function Jb(t){let e=[t.mode||"",t.presetName||"",t.templateStr||""],r=5381,s=e.join("||");for(let o=0;o<s.length;o++)r=(r<<5)+r+s.charCodeAt(o),r|=0;return String(r)}var Gb,_l,Sl,El,Vb,Al,Wp,jp=P(()=>{$e();G();Qe();hs();Gb="tableChatScope",_l="chats";El=N.namespace(Gb);Vb=new Set(Object.values(gt));Al=class{getScopedConfig(e=er()){return gr(e)}setScopedConfig(e,r=er()){let s=Up(e);return xs(r,s),s}getTemplateScope(e,r=er()){let s=Se(e===void 0?Ne.getKey():e),o=gr(r);return la(o.template[s])||null}setTemplateScope(e,r,s=er()){let o=Se(r===void 0?Ne.getKey():r),n=la({...e,updatedAt:ca()});if(!n)return mr().warn("setTemplateScope \u6536\u5230\u65E0\u6548 state",e),null;let a=gr(s);return a.template[o]=n,xs(s,a),mr().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u66F4\u65B0",{chatId:s,isolationKey:o,mode:n.mode}),n}clearTemplateScope(e,r=er()){let s=Se(e===void 0?Ne.getKey():e),o=gr(r);o.template[s]!==void 0&&(delete o.template[s],xs(r,o),mr().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u6E05\u9664",{chatId:r,isolationKey:s}))}archiveCurrentTemplate(e,r=er()){let s=Se(e===void 0?Ne.getKey():e),o=gr(r),n=la(o.template[s]);if(!n)return null;let a=Jb(n),i=Array.isArray(o.templateArchives[s])?o.templateArchives[s]:[];if(i.length>0&&i[0].fingerprint===a)return null;let l={fingerprint:a,state:ie(n),archivedAt:ca()},d=[l,...i].slice(0,Zu);return o.templateArchives[s]=d,xs(r,o),mr().info("\u6A21\u677F\u5DF2\u5F52\u6863",{chatId:r,isolationKey:s,archiveCount:d.length}),l}listTemplateArchives(e,r=er()){let s=Se(e===void 0?Ne.getKey():e),o=gr(r);return(Array.isArray(o.templateArchives[s])?o.templateArchives[s]:[]).map(a=>ie(a))}restoreTemplateArchive(e,r,s=er()){let o=Se(r===void 0?Ne.getKey():r),n=gr(s),a=Array.isArray(n.templateArchives[o])?n.templateArchives[o]:[],i=a[e];if(!i)return mr().warn("restoreTemplateArchive: \u627E\u4E0D\u5230 archive",{index:e,available:a.length}),null;this.archiveCurrentTemplate(o,s);let l=la({...i.state,source:"restore",updatedAt:ca()});if(!l)return null;let d=gr(s);return d.template[o]=l,xs(s,d),mr().info("\u6A21\u677F\u5DF2\u6062\u590D",{chatId:s,isolationKey:o,fromArchiveIndex:e}),l}clearTemplateArchives(e,r=er()){let s=Se(e===void 0?Ne.getKey():e),o=gr(r);Array.isArray(o.templateArchives[s])&&(delete o.templateArchives[s],xs(r,o),mr().info("\u6A21\u677F\u5F52\u6863\u5DF2\u6E05\u7A7A",{chatId:r,isolationKey:s}))}resetChat(e=er()){xs(e,Kp()),mr().warn("\u5DF2\u91CD\u7F6E chat \u7684 ScopedConfig",{chatId:e})}},Wp=new Al});function Pt(){return Cl||(Cl=C.createScope("TableTemplate")),Cl}function it(t,e=""){return t==null?e:String(t).trim()||e}function Hp(t="template"){return`${t}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function en(t={}){let e;Array.isArray(t?.tables)?e=ie(t.tables):t?.tables&&typeof t.tables=="object"?(e=ol(t.tables),(!Array.isArray(e)||e.length===0)&&Pt().warn("normalizeTemplate: value.tables \u5BF9\u8C61\u4F46\u89E3\u6790\u4E3A\u7A7A",{keys:Object.keys(t.tables||{}).slice(0,10)})):t&&typeof t=="object"&&Object.keys(t).some(o=>o.startsWith("sheet_"))?(e=ol(t),!Array.isArray(e)||e.length===0?Pt().warn("normalizeTemplate: \u68C0\u6D4B\u5230 shujuku \u6839\u5BF9\u8C61\u4F46\u89E3\u6790\u4E3A\u7A7A",{sheetKeys:Object.keys(t).filter(o=>o.startsWith("sheet_")).slice(0,10)}):Pt().info("normalizeTemplate: \u8BC6\u522B\u4E3A shujuku \u683C\u5F0F",{sheetCount:e.length})):e=[];let r=Zn({tables:e});return{id:it(t?.id,Hp()),name:it(t?.name,"\u672A\u547D\u540D\u6A21\u677F"),description:it(t?.description,""),tables:r.tables||e,promptTemplate:it(t?.promptTemplate,""),createdAt:it(t?.createdAt,new Date().toISOString()),updatedAt:it(t?.updatedAt,new Date().toISOString())}}function Yp(){return[en({id:ht,name:dp,description:"\u5305\u542B\u5168\u5C40\u6570\u636E\u3001\u4E3B\u89D2\u3001\u91CD\u8981\u89D2\u8272\u3001\u6280\u80FD\u3001\u80CC\u5305\u3001\u4EFB\u52A1\u3001\u7EAA\u8981\u548C\u9009\u9879\u8868\u3002",tables:ie(Yo)})]}function ws(){let t=Zo.get(kl,[]);return Array.isArray(t)?t.map(en):[]}function gs(){let t=Yp(),e=ws(),r=new Set(t.map(s=>s.id));return[...t,...e.filter(s=>!r.has(s.id))]}function ms(t){let e=it(t,"");return gs().find(r=>r.id===e)||null}function eo(t={}){let e=new Date().toISOString(),r=en({...t,id:it(t.id,Hp()),updatedAt:e,createdAt:it(t.createdAt,e)}),o=ws().filter(n=>n.id!==r.id);return o.push(r),Zo.set(kl,o),{success:!0,template:r}}function Il(t){let e=it(t,"");if(!e||e===ht)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u5220\u9664\u3002"};let r=ws().filter(s=>s.id!==e);return Zo.set(kl,r),Jp()===e&&Ml(ht),{success:!0}}function Gp(t,e){let r=it(t,"");if(!r||r===ht)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u91CD\u547D\u540D\u3002"};let s=it(e,"");if(!s)return{success:!1,error:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\u3002"};let o=ms(r);return o?eo({...o,name:s}):{success:!1,error:"\u6A21\u677F\u4E0D\u5B58\u5728\u3002"}}function qp(){return{version:1,exportedAt:new Date().toISOString(),templates:ws()}}function Vp(t,{overwrite:e=!1}={}){let r;if(Array.isArray(t))r=t;else if(t&&typeof t=="object")Array.isArray(t.templates)?r=t.templates:t.template&&typeof t.template=="object"?r=[t.template]:r=[t];else return{success:!1,imported:0,skipped:0,errors:["\u65E0\u6548\u7684\u5BFC\u5165\u6570\u636E\u683C\u5F0F\u3002"]};Pt().info("importTemplates \u5F00\u59CB",{rawListCount:r.length,overwrite:e});let s=new Set(ws().map(i=>i.id)),o=0,n=0,a=[];for(let i of r)try{let l=en(i);if(Pt().info("importTemplates \u5355\u6761",{id:l.id,name:l.name,tableCount:Array.isArray(l.tables)?l.tables.length:0,firstTableName:l.tables?.[0]?.name||""}),!e&&s.has(l.id)){n++;continue}eo(l),s.add(l.id),o++}catch(l){a.push(it(l?.message,"\u672A\u77E5\u9519\u8BEF")),Pt().error("importTemplates \u5355\u6761\u5931\u8D25",l)}return Pt().info("importTemplates \u5B8C\u6210",{imported:o,skipped:n,errorCount:a.length}),{success:!0,imported:o,skipped:n,errors:a}}function Jp(){let t=Zo.get(Fp,""),e=it(t,ht);return ms(e)?e:ht}function Ml(t){let e=it(t,ht);return Zo.set(Fp,e),Pt().info("\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u5DF2\u5207\u6362",{templateId:e}),e}function da(){let t=Jp();return ms(t)||Yp()[0]}function Xb(t){if(!t||typeof t!="string")return null;try{let e=JSON.parse(t);return en(e)}catch(e){return Pt().warn("templateFromString \u53CD\u5E8F\u5217\u5316\u5931\u8D25",e),null}}function ua({chatId:t,isolationKey:e}={}){let r=e===void 0?Ne.getKey():e,s=Wp.getTemplateScope(r,t);if(!s||s.mode===gt.INHERIT_GLOBAL){let n=da();return Pt().info("resolveActiveTemplate: inherit_global",{chatId:t,isolationKey:r,templateId:n?.id||"",templateName:n?.name||"",tableCount:Array.isArray(n?.tables)?n.tables.length:0,firstTableName:n?.tables?.[0]?.name||""}),{template:n,mode:gt.INHERIT_GLOBAL,source:{templateId:n?.id||""}}}if(s.mode===gt.CHAT_OVERRIDE){let n=Xb(s.templateStr);if(n)return{template:n,mode:gt.CHAT_OVERRIDE,source:{}};Pt().warn("chat_override templateStr \u53CD\u5E8F\u5217\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 inherit_global");let a=da();return{template:a,mode:gt.INHERIT_GLOBAL,source:{templateId:a?.id||"",fallback:!0}}}if(s.mode===gt.PRESET_LINK){let n=s.presetName||"",a=gs(),i=a.find(d=>d.name===n)||a.find(d=>d.id===n);if(i)return{template:i,mode:gt.PRESET_LINK,source:{presetName:n,templateId:i.id}};Pt().warn("preset_link \u6307\u5411\u7684\u5168\u5C40\u9884\u8BBE\u4E0D\u5B58\u5728\uFF0C\u964D\u7EA7\u5230 inherit_global",{presetName:n});let l=da();return{template:l,mode:gt.INHERIT_GLOBAL,source:{templateId:l?.id||"",presetName:n,fallback:!0}}}let o=da();return{template:o,mode:gt.INHERIT_GLOBAL,source:{templateId:o?.id||"",unknownMode:s.mode}}}var Zo,kl,Fp,Cl,qo=P(()=>{$e();G();Dr();Qe();jp();hs();Zo=N.namespace("tableWorkbenchTemplates"),kl="templates",Fp="activeId"});var Zp={};re(Zp,{TableTemplatePanel:()=>Qp,default:()=>rx});function Rl(t){return t===ht}function ex(t,{onChange:e,readonly:r}){let s=m("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});j(s,pt({label:"\u63CF\u8FF0",control:Je({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:a=>e({description:a})})})),j(s,m("div",{text:"\u586B\u8868\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}})),j(s,m("div",{text:"\u53EF\u4F7F\u7528\u5B8F\uFF1A{{tableData}} {{lastUserMessage}} {{lastAiMessage}} {{toolWorldbookContent}} \u7B49\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u6A21\u677F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let o=m("textarea",{className:"yyt-textarea",attrs:{rows:"8",placeholder:"\u53EF\u9009 \u2014 \u81EA\u5B9A\u4E49\u586B\u8868\u63D0\u793A\u8BCD",disabled:r?"disabled":null},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});o.value=t.promptTemplate||"",o.addEventListener("change",()=>{r||e({promptTemplate:o.value})}),j(s,o),j(s,m("div",{text:`\u8868\u683C\u7ED3\u6784\uFF08${(t.tables||[]).length} \u5F20\u8868\uFF09`,style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px"}})),j(s,m("div",{text:"\u672C\u9762\u677F\u53EA\u5C55\u793A\u8868\u7ED3\u6784 JSON\u3002\u590D\u6742 schema \u7F16\u8F91\uFF08\u589E\u5220\u8868\u3001\u5217\u5B9A\u4E49\u3001\u9ED8\u8BA4\u884C\uFF09\u5C06\u5728\u586B\u8868\u5DE5\u4F5C\u53F0\u4E2D\u63D0\u4F9B\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let n=m("pre",{style:{padding:"10px 12px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm, 6px)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-secondary)",maxHeight:"260px",overflow:"auto",whiteSpace:"pre",margin:"0"}});try{n.textContent=JSON.stringify(t.tables||[],null,2)}catch{n.textContent="// \u65E0\u6CD5\u5E8F\u5217\u5316"}return j(s,n),s}function tx(t){let r=[`${(t.tables||[]).length} \u5F20\u8868`];return t.promptTemplate&&r.push("\u81EA\u5B9A\u4E49\u6A21\u677F"),r}var Qb,Xp,Zb,Qp,rx,ey=P(()=>{ar();qo();Dr();G();Mo();Qb=C.createScope("TableTemplatePanel"),Xp="";Zb={listPresets(){return gs().map(t=>({id:Rl(t.id)?`builtin_table_${t.id}`:t.id,name:t.name,description:t.description||"",promptTemplate:t.promptTemplate||"",tables:t.tables||[],_rawId:t.id,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=t.startsWith("builtin_table_")?t.slice(14):t,r=ms(e);return r?{id:Rl(r.id)?`builtin_table_${r.id}`:r.id,name:r.name,description:r.description||"",promptTemplate:r.promptTemplate||"",tables:r.tables||[],_rawId:r.id,createdAt:r.createdAt,updatedAt:r.updatedAt}:null},getCurrentPresetId(){return Xp||""},setCurrentPresetId(t){return Xp=t||"",!0},createPreset(t){let e=String(t?.name||"").trim()||"\u65B0\u5EFA\u6A21\u677F",r=eo({name:e,description:t?.description||"",promptTemplate:t?.promptTemplate||"",tables:Array.isArray(t?.tables)?t.tables:[]});return r?.success?{id:r.template.id,...r.template,_rawId:r.template.id}:null},updatePreset(t,e){if(!t)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t;if(Rl(r))return Qb.warn("\u62D2\u7EDD\u4FEE\u6539\u5185\u7F6E\u8868\u683C\u6A21\u677F"),null;let s=ms(r);if(!s)return null;let o=eo({...s,...e,id:r});return o?.success?{id:o.template.id,...o.template,_rawId:o.template.id}:null},deletePreset(t){if(!t)return!1;let e=t.startsWith("builtin_table_")?t.slice(14):t;return!!Il(e)?.success},duplicatePreset(t,e={}){let r=this.getPreset(t);if(!r)return null;let s=e.nameSuffix||" \u526F\u672C";return this.createPreset({name:`${r.name}${s}`,description:r.description,promptTemplate:r.promptTemplate,tables:r.tables})},renamePreset(t,e){if(!t||!e)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t,s=Gp(r,e);return s?.success?this.getPreset(s.template?.id||r):null},exportAll(){return qp()},importPresets(t){let e=Vp(t,{overwrite:!1});return{added:e?.imported||0,skipped:e?.skipped||0}},resetAll(){let t=ws();for(let e of t)try{Il(e.id)}catch{}}};Qp=Cr({id:"tableTemplatePanel",kind:"table",panelTitle:"\u8868\u683C\u6A21\u677F",panelHint:"\u7BA1\u7406\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u8868\u683C\u7ED3\u6784\u6A21\u677F\u3002\u5728\u586B\u8868\u9762\u677F\u9876\u90E8\u5DE5\u5177\u680F\u53EF\u5FEB\u901F\u52A0\u8F7D/\u4FDD\u5B58\u5F53\u524D\u6A21\u677F\u3002",store:Zb,renderEditor:ex,renderListItemMeta:tx}),rx=Qp});var ry={};re(ry,{ToolManagePanel:()=>ty,default:()=>sx});var ty,sx,sy=P(()=>{Ye();Lo();Qt();ty={id:"toolManagePanel",_removeDialog(t){if(!t?.length)return;let e=t.find("#yyt-tool-dialog-overlay");ot(e,"yytToolManageDialogSelect"),e.remove()},_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let r=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!r){k("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}r.switchMainTab("tools"),r.switchSubTab("tools",t)},render(t){let e=Vt(),r=Object.entries(e),s=r.filter(([,o])=>o?.enabled!==!1).length;return`
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
    `},_renderToolList(t){let e=Object.entries(t);return e.length?`<div class="yyt-list-table">${e.map(([s,o])=>`
      <div class="yyt-list-row ${o.enabled?"yyt-tool-item-enabled":"yyt-tool-item-disabled"}" data-tool-id="${s}">
        <div class="yyt-list-row-icon" style="background: var(--yyt-accent-soft); color: var(--yyt-accent);">
          <i class="fa-solid fa-wrench"></i>
        </div>
        <div class="yyt-list-row-main">
          <div class="yyt-list-row-name">
            ${se(o.name)}
            <span class="yyt-badge" style="background: var(--yyt-accent-soft); color: var(--yyt-accent); margin-left: 6px;">${se(o.category)}</span>
          </div>
          <div class="yyt-list-row-desc">${se(o.description)}</div>
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
      `},bindEvents(t,e){let r=X();!r||!ye(t)||(t.off(".yytToolManage"),this._bindToolEvents(t,r),this._bindFileEvents(t,r))},_bindToolEvents(t,e){t.on("change.yytToolManage",".yyt-tool-toggle input",r=>{let s=e(r.currentTarget).closest(".yyt-list-row"),o=s.data("tool-id"),n=e(r.currentTarget).is(":checked");Wn(o,n),s.toggleClass("yyt-tool-item-enabled",n).toggleClass("yyt-tool-item-disabled",!n),s.find(".yyt-status-dot").toggleClass("yyt-status-dot-on",n).toggleClass("yyt-status-dot-off",!n),k("info",n?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.on("click.yytToolManage","#yyt-add-tool",()=>{this._showToolEditDialog(t,e,null)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="config"]',r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._openToolConfig(s)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="edit"]',r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._showToolEditDialog(t,e,s)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="delete"]',async r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id"),o=Jt(s);if(!s||!o||!await nr("\u5220\u9664\u5DE5\u5177",`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177"${o.name}"\u5417\uFF1F`,{danger:!0}))return;if(!Ws(s)){k("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),k("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.on("click.yytToolManage","#yyt-import-tools",()=>{t.find("#yyt-import-tools-file").click()}),t.on("change.yytToolManage","#yyt-import-tools-file",async r=>{let s=r.target.files[0];if(s){try{let o=await ko(s),n=Fs(o,{overwrite:!1});k(n.success?"success":"error",n.message),n.success&&this.renderTo(t)}catch(o){k("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(r.target).val("")}}),t.on("click.yytToolManage","#yyt-export-tools",()=>{try{let r=js();Co(r,`youyou_toolkit_tools_${Date.now()}.json`),k("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(r){k("error",`\u5BFC\u51FA\u5931\u8D25: ${r.message}`)}}),t.on("click.yytToolManage","#yyt-reset-tools",async()=>{await nr("\u91CD\u7F6E\u5DE5\u5177","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F",{danger:!0})&&(Hs(),this.renderTo(t),k("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,r){let s=r?Jt(r):null,o=!!s,n=`
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
    `;this._removeDialog(t),t.append(n);let a=t.find("#yyt-tool-dialog-overlay"),i=a.find("#yyt-tool-name"),l=a.find("#yyt-tool-category"),d=a.find("#yyt-tool-desc"),c=a.find("#yyt-tool-timeout"),u=a.find("#yyt-tool-retries");Et(a,{namespace:"yytToolManageDialogSelect",selectors:["#yyt-tool-category"]});let p=()=>{ot(a,"yytToolManageDialogSelect"),a.remove()};a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",p),a.on("click",function(y){y.target===this&&p()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let y=i.val().trim(),f=l.val(),g=d.val().trim(),b=parseInt(c.val())||6e4,v=parseInt(u.val())||3;if(!y){k("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0"),i.trigger("focus").trigger("select");return}let T=r||`tool_${Date.now()}`;if(!Us(T,{name:y,category:f,description:g,promptTemplate:s?.promptTemplate||"",extractTags:Array.isArray(s?.extractTags)?s.extractTags:[],config:{execution:{timeout:b,retries:v},api:s?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(s?.config?.messages)?s.config.messages:[],context:{depth:s?.config?.context?.depth||3,includeTags:Array.isArray(s?.config?.context?.includeTags)?s.config.context.includeTags:[],excludeTags:Array.isArray(s?.config?.context?.excludeTags)?s.config.context.excludeTags:[]},worldbooks:{enabled:s?.config?.worldbooks?.enabled===!0,selected:Array.isArray(s?.config?.worldbooks?.selected)?s.config.worldbooks.selected:[]}},enabled:s?.enabled!==!1})){k("error",o?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}Gs(T),p(),this.renderTo(t),k("success",o?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),o||this._openToolConfig(T)})},destroy(t){!X()||!ye(t)||(this._removeDialog(t),t.off(".yytToolManage"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},sx=ty});var ny={};re(ny,{BypassManager:()=>pa,DEFAULT_BYPASS_PRESETS:()=>br,addMessage:()=>xx,buildBypassMessages:()=>_x,bypassManager:()=>ne,createPreset:()=>px,default:()=>Ex,deleteMessage:()=>vx,deletePreset:()=>fx,duplicatePreset:()=>gx,exportPresets:()=>Tx,getAllPresets:()=>dx,getDefaultPresetId:()=>mx,getEnabledMessages:()=>bx,getPreset:()=>ux,getPresetList:()=>tn,importPresets:()=>Sx,setDefaultPresetId:()=>hx,updateMessage:()=>wx,updatePreset:()=>yx});function oy(t){let e=String(t||"").trim().toLowerCase();return e==="system"?"SYSTEM":e==="assistant"||e==="ai"?"assistant":"USER"}function ix(t){return t&&typeof t=="object"&&typeof t.content=="string"&&!t.name&&!Array.isArray(t.messages)}function lx(t){return String(t||"").replace(/\$0/g,"{{toolContentMacro}}").replace(/\$1/g,"{{rawRecentMessagesText}}").replace(/\$4/g,"{{toolWorldbookContent}}").replace(/\$8/g,"{{userMessage}}").replace(/\$C/g,"{{characterCard}}")}function cx(t,e,r){let s=t.mainSlot||(t.isMain?"A":t.isMain2?"B":"");return{id:typeof t.id=="string"&&t.id.trim()?t.id.trim():`${r}_msg_${e+1}`,role:oy(t.role),content:lx(t.content),enabled:t.enabled!==!1,deletable:t.deletable!==!1,...s?{mainSlot:s,isMain:s==="A",isMain2:s==="B"}:{}}}var ox,hr,no,Pl,nx,br,ax,pa,ne,dx,tn,ux,px,yx,fx,gx,mx,hx,bx,xx,wx,vx,Tx,Sx,_x,Ex,ao=P(()=>{$e();He();G();ox=C.createScope("BypassManager"),hr="bypass_presets",no="default_bypass_preset",Pl="current_bypass_preset",nx=Object.freeze([{id:"table_fill_default_msg_1",role:"SYSTEM",content:"\u4F60\u662F\u4E00\u4E2A\u52A9\u624B\uFF0C\u8D1F\u8D23\u542C\u4ECE\u7528\u6237\u7684\u6307\u4EE4\u5B8C\u6210\u4F60\u7684\u5DE5\u4F5C",enabled:!0,deletable:!0},{id:"table_fill_default_msg_2",role:"assistant",content:"\u6536\u5230\uFF0C\u6211\u5C06\u5145\u5206\u63CF\u7ED8\u7528\u6237\u7684\u610F\u5FD7\uFF0C\u6BEB\u4E0D\u5077\u61D2\uFF0C\u5E76\u4E14\u6211\u4E00\u5B9A\u4F1A\u9075\u7167\u7528\u6237\u7684\u8981\u6C42",enabled:!0,deletable:!0},{id:"table_fill_default_msg_3",role:"USER",content:`\u4EE5\u4E0B\u662F\u4F60\u53EF\u80FD\u9700\u8981\u7528\u5230\u7684\u80CC\u666F\u8BBE\u5B9A\uFF0C\u6CE8\u610F\u4F60\u53EA\u9700\u8981\u5176\u4E2D\u5173\u4E8E\u5267\u60C5\u4EE5\u53CA\u4EBA\u8BBE\u65B9\u9762\u7684\u6570\u636E\uFF0C\u4E0D\u9700\u8981\u601D\u8003\u91CC\u8FB9\u9664\u6B64\u4E4B\u5916\u7684\u4EFB\u4F55\u683C\u5F0F\u6216\u8005\u601D\u7EF4\u94FE\u65B9\u9762\u7684\u8981\u6C42\uFF1A
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

{{userMessage}}`,enabled:!0,deletable:!1,mainSlot:"B",isMain2:!0},{id:"table_fill_default_msg_8",role:"assistant",content:"\u6536\u5230\u6307\u4EE4\uFF0C\u6211\u5C06\u4E00\u6B65\u4E00\u6B65\u5F00\u59CB\u601D\u8003\uFF0C\u5E76\u5B8C\u6210\u586B\u8868\uFF0C\u9996\u5148\u6211\u8981\u5206\u6790\u5F53\u524D\u8F6E\u6B21\u7684\u5267\u60C5\u53D8\u5316\u3002",enabled:!0,deletable:!0}]),br={table_workbench_fill_default:{id:"table_workbench_fill_default",name:"\u9ED8\u8BA4\u586B\u8868 Ai \u6307\u4EE4\u9884\u8BBE",description:"\u7528\u4E8E\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u5185\u7F6E Ai \u6307\u4EE4\u9884\u8BBE\uFF0C\u53EF\u590D\u5236\u540E\u6309\u9700\u7F16\u8F91\u3002",enabled:!0,messages:nx.map(t=>({...t})),createdAt:0,updatedAt:0}},ax=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]);pa=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=N.get(hr,{});return this._cache={...br,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((r,s)=>(s.updatedAt||0)-(r.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:r,name:s,description:o,messages:n}=e;if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=r.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let i={id:a,name:s.trim(),description:o||"",enabled:!0,messages:n||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,i),z.emit($.BYPASS_PRESET_CREATED,{presetId:a,preset:i}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${s}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,r){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(r.id&&r.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let o={...s,...r,id:e,updatedAt:Date.now()};return this._savePreset(e,o),z.emit($.BYPASS_PRESET_UPDATED,{presetId:e,preset:o}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u66F4\u65B0\u6210\u529F`,preset:o}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(br[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let s=N.get(hr,{});return delete s[e],N.set(hr,s),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),z.emit($.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,r,s){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!r||!r.trim())&&(r=`${e}_copy_${Date.now()}`),this.presetExists(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(o)),id:r.trim(),name:s||`${o.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(r.trim(),n),z.emit($.BYPASS_PRESET_CREATED,{presetId:r,preset:n}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${n.name}"`,preset:n}}addMessage(e,r){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o={id:`msg_${Date.now()}`,role:oy(r.role||"SYSTEM"),content:r.content||"",enabled:r.enabled!==!1,deletable:r.deletable!==!1,...r.mainSlot?{mainSlot:r.mainSlot}:{}},n=[...s.messages||[],o];return this.updatePreset(e,{messages:n})}updateMessage(e,r,s){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=o.messages||[],a=n.findIndex(l=>l.id===r);if(a===-1)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};let i=[...n];return i[a]={...i[a],...s},this.updatePreset(e,{messages:i})}deleteMessage(e,r){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=s.messages||[],n=o.find(i=>i.id===r);if(!n)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};if(n.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=o.filter(i=>i.id!==r);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let r=this.getPreset(e);return!r||!r.enabled?[]:(r.messages||[]).filter(s=>s.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=N.get(no,null);return e==="undefined"||e==="null"||e===""?(N.remove(no),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(N.set(no,e),z.emit($.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let s=this.getPreset(e);if(!s)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let r=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(r)},null,2)}importPresets(e,r={}){let{overwrite:s=!1,name:o=""}=r,n;try{n=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let a=N.get(hr,{}),l=Array.isArray(n)&&n.every(ix)?[{id:this._generatePresetId(o||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",a),name:o||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",description:"\u7531\u5916\u90E8\u586B\u8868\u63D0\u793A\u8BCD\u7EC4\u5BFC\u5165\u3002",enabled:!0,messages:n}]:Array.isArray(n)?n:n.presets?n.presets:[n];if(l.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let d=0;for(let c of l){let u=this._normalizePreset(c?.id,c,a);u&&(br[u.id]&&!s||!s&&a[u.id]||(a[u.id]={...u,updatedAt:Date.now()},d++))}return d>0&&(N.set(hr,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${d} \u4E2A\u9884\u8BBE`,imported:d}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let r=e?.bypass?.presetId;return r?this.getPreset(r):this.getDefaultPreset()}buildBypassMessages(e){let r=this.getToolBypassPreset(e);return r?this.getEnabledMessages(r.id):[]}_savePreset(e,r){let s=N.get(hr,{});s[e]=r,N.set(hr,s),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=N.get(hr,{}),r={},s=!1,o=Array.isArray(e)?e.map((n,a)=>[n?.id||n?.name||`legacy_${a}`,n]):Object.entries(e||{});for(let[n,a]of o){let i=this._normalizePreset(n,a,r);if(!i){s=!0;continue}r[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(s=!0)}s&&N.set(hr,r),this._migrateDefaultPreset(r),this._cache=null,this._migrated=!0}_normalizePreset(e,r,s={}){if(!r||typeof r!="object")return null;let o=typeof r.name=="string"?r.name.trim():"",n=typeof r.id=="string"?r.id.trim():"",a=typeof e=="string"?e.trim():"";if(!o&&a&&a!=="undefined"&&a!=="null"&&(o=a),this._isLegacySamplePreset(o,n)||(!n&&a&&a!=="undefined"&&a!=="null"&&(n=a),!n&&o&&o!=="undefined"&&o!=="null"&&(n=this._generatePresetId(o,s)),!o||!n||n==="undefined"||o==="undefined"))return null;let l=Array.isArray(r.messages)?r.messages.filter(d=>d&&typeof d=="object").map((d,c)=>cx(d,c,n)):[];return{...r,id:n,name:o,description:typeof r.description=="string"?r.description:"",enabled:r.enabled!==!1,messages:l,createdAt:r.createdAt||Date.now(),updatedAt:r.updatedAt||Date.now()}}_migrateDefaultPreset(e){let r=N.get(no,null),s=N.get(Pl,null),o=r??s;(o==="undefined"||o==="null"||o==="")&&(o=null),o&&!e[o]&&(o=Object.values(e).find(a=>a.name===o)?.id||null),o?N.set(no,o):N.remove(no),N.has(Pl)&&N.remove(Pl)}_isLegacySamplePreset(e,r=""){return e?r==="standard"||r==="enhanced"||r==="jailbreak"||ax.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,r={}){let s=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,o=s,n=1;for(;r[o];)o=`${s}_${n++}`;return o}_log(...e){ox.debug(e[0],e.length>1?e.slice(1):void 0)}},ne=new pa,dx=()=>ne.getAllPresets(),tn=()=>ne.getPresetList(),ux=t=>ne.getPreset(t),px=t=>ne.createPreset(t),yx=(t,e)=>ne.updatePreset(t,e),fx=t=>ne.deletePreset(t),gx=(t,e,r)=>ne.duplicatePreset(t,e,r),mx=()=>ne.getDefaultPresetId(),hx=t=>ne.setDefaultPresetId(t),bx=t=>ne.getEnabledMessages(t),xx=(t,e)=>ne.addMessage(t,e),wx=(t,e,r)=>ne.updateMessage(t,e,r),vx=(t,e)=>ne.deleteMessage(t,e),Tx=t=>ne.exportPresets(t),Sx=(t,e)=>ne.importPresets(t,e),_x=t=>ne.buildBypassMessages(t),Ex=ne});var ay={};re(ay,{DEFAULT_SETTINGS:()=>rn,SettingsService:()=>fa,default:()=>Ax,settingsService:()=>Nt});var rn,ya,fa,Nt,Ax,sn=P(()=>{$e();He();rn={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue",startupScreenDismissed:!1}},ya="settings_v2",fa=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=N.get(ya,{}),r=this._migrateLegacy(e);return this._cache=this._mergeWithDefaults(r.settings),r.changed&&N.set(ya,this._cache),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),N.set(ya,this._cache),z.emit($.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let r=this.getSettings(),s=this._deepMerge(r,e);this.saveSettings(s)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(rn)),N.set(ya,this._cache),z.emit($.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,r=null){let s=this.getSettings(),o=e.split("."),n=s;for(let a of o)if(n&&typeof n=="object"&&a in n)n=n[a];else return r;return n}set(e,r){let s=JSON.parse(JSON.stringify(this.getSettings())),o=e.split("."),n=s;for(let a=0;a<o.length-1;a+=1){let i=o[a];i in n||(n[i]={}),n=n[i]}n[o[o.length-1]]=r,this.saveSettings(s)}_migrateLegacy(e){if(!e||typeof e!="object")return{settings:{},changed:!1};let r=!1,s=JSON.parse(JSON.stringify(e));return s.automation&&Object.prototype.hasOwnProperty.call(s.automation,"enabled")&&(delete s.automation.enabled,r=!0),{settings:s,changed:r}}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(rn)),e)}_deepMerge(e,r){let s={...e};for(let o in r)r[o]&&typeof r[o]=="object"&&!Array.isArray(r[o])?s[o]=this._deepMerge(e[o]||{},r[o]):s[o]=r[o];return s}},Nt=new fa,Ax=Nt});function iy(t){if(!t)return"";let e=String(t).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function ga(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function zr(){try{return ga()?.SillyTavern||null}catch{return null}}function ma(t){try{return(t||zr())?.getContext?.()||null}catch{return null}}function Nl(t,e){if(!t)return null;let r=typeof t?.on=="function"||typeof t?.addListener=="function",s=typeof t?.off=="function"||typeof t?.removeListener=="function";return!r||!s?null:{source:e,eventSource:t,capabilities:{on:typeof t?.on=="function",off:typeof t?.off=="function",addListener:typeof t?.addListener=="function",removeListener:typeof t?.removeListener=="function"}}}function Cx(){let t=ga(),e=zr(),r=ma(e),o=[Nl(e?.eventSource,"SillyTavern.eventSource"),Nl(r?.eventSource,"SillyTavern.getContext().eventSource"),Nl(t?.eventSource,"topWindow.eventSource")].filter(Boolean)[0]||null,n=e?.eventTypes||e?.event_types||r?.eventTypes||r?.event_types||t?.eventTypes||t?.event_types||{};return{topWindow:t,api:e,context:r,eventSource:o?.eventSource||null,eventTypes:n,source:o?.source||"unavailable",capabilities:o?.capabilities||null,hasBridge:!!o?.eventSource}}var bt,We,kx,ly,Dl,Dt,Ll=P(()=>{G();bt=C.createScope("HostEvents"),We=Object.freeze({MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",MESSAGE_EDITED:"MESSAGE_EDITED",USER_MESSAGE_RENDERED:"USER_MESSAGE_RENDERED",IMPERSONATE_READY:"IMPERSONATE_READY",GENERATION_STOPPED:"GENERATION_STOPPED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHAT_CHANGED:"CHAT_CHANGED"});kx=1500,ly=20,Dl=class{constructor(){this._bridge=null,this._pending=[],this._initAttempts=0,this._retryTimer=null,this._readyResolvers=[],this._initialized=!1,this._disposed=!1}subscribe(e,r,s={}){if(!e||typeof r!="function")return bt.warn("subscribe \u65E0\u6548\u53C2\u6570",{eventKey:e,handlerType:typeof r}),()=>{};if(this._disposed)return bt.warn("subscribe \u5728 dispose \u4E4B\u540E\u88AB\u8C03\u7528",{eventKey:e}),()=>{};let o={key:iy(e),rawKey:e,handler:r,options:s,attached:!1,_hostName:"",_hostUnsubscribe:null,_disposed:!1};return this._pending.push(o),this._ensureInitialized(),this._bridge?.hasBridge&&this._attachEntry(o),()=>{if(o._disposed)return;o._disposed=!0;let n=this._pending.indexOf(o);if(n>=0&&this._pending.splice(n,1),o.attached&&typeof o._hostUnsubscribe=="function")try{o._hostUnsubscribe()}catch(a){bt.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:o._hostName,error:a})}}}async emit(e,...r){if(this._ensureInitialized(),!this._bridge?.hasBridge)return bt.debug("emit \u65F6\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA\uFF0C\u8DF3\u8FC7",{eventKey:e}),!1;let s=this._resolveHostEventName(e);if(!s)return!1;let{eventSource:o}=this._bridge;try{if(typeof o?.emit=="function")return await o.emit(s,...r),!0;if(typeof o?.dispatch=="function")return await o.dispatch(s,...r),!0}catch(n){bt.warn("emit \u629B\u9519",{eventKey:e,hostName:s,error:n})}return!1}ready({timeoutMs:e=1e4}={}){return this._ensureInitialized(),this._bridge?.hasBridge?Promise.resolve(!0):new Promise(r=>{let s=!1,o=a=>{s||(s=!0,r(a))},n=e>0?setTimeout(()=>o(!1),e):null;this._readyResolvers.push(a=>{n&&clearTimeout(n),o(a)})})}describe(){this._ensureInitialized();let e=this._bridge?.eventTypes||{};return{initialized:this._initialized,source:this._bridge?.source||"unavailable",hasBridge:!!this._bridge?.hasBridge,initAttempts:this._initAttempts,retryScheduled:!!this._retryTimer,pendingCount:this._pending.filter(r=>!r.attached).length,attachedCount:this._pending.filter(r=>r.attached).length,availableEvents:Object.keys(e).slice(0,100)}}reinit(){if(this._disposed)return!1;for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e.attached=!1,e._hostUnsubscribe=null,e._hostName=""}return this._bridge=null,this._initialized=!1,this._initAttempts=0,this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null),this._ensureInitialized()}dispose(){this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null);for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e._disposed=!0}this._pending=[],this._readyResolvers=[],this._bridge=null,this._initialized=!1,this._disposed=!0}_ensureInitialized(){if(this._disposed)return!1;if(this._initialized&&this._bridge?.hasBridge)return!0;this._initAttempts+=1;let e=Cx();if(this._bridge=e,this._initialized=!0,!e.hasBridge)return bt.debug(`\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA (attempt ${this._initAttempts})`,{source:e.source}),this._scheduleRetry(),!1;bt.info("\u5BBF\u4E3B\u6865\u5DF2\u5C31\u7EEA",{source:e.source,eventTypesCount:Object.keys(e.eventTypes).length});for(let s of this._pending)!s.attached&&!s._disposed&&this._attachEntry(s);let r=this._readyResolvers.slice();this._readyResolvers=[];for(let s of r)try{s(!0)}catch{}return!0}_scheduleRetry(){if(!this._retryTimer){if(this._initAttempts>=ly){bt.warn(`\u5DF2\u8FBE\u6700\u5927\u91CD\u8BD5\u6B21\u6570 (${ly})\uFF0C\u505C\u6B62\u91CD\u8BD5`);let e=this._readyResolvers.slice();this._readyResolvers=[];for(let r of e)try{r(!1)}catch{}return}this._retryTimer=setTimeout(()=>{this._retryTimer=null,this._initialized=!1,this._ensureInitialized()},kx)}}_resolveHostEventName(e){let r=iy(e),s=this._bridge?.eventTypes||{};if(s[r])return s[r];let o=r.toLowerCase();if(s[o])return s[o];let n=String(e).trim();return n&&n===n.toLowerCase()?n:o}_attachEntry(e){if(!this._bridge?.hasBridge||e.attached||e._disposed)return;let r=this._resolveHostEventName(e.rawKey);if(!r){bt.warn("\u65E0\u6CD5\u89E3\u6790\u5BBF\u4E3B\u4E8B\u4EF6\u540D",{rawKey:e.rawKey});return}let{eventSource:s}=this._bridge,o=typeof s?.on=="function"?s.on.bind(s):typeof s?.addListener=="function"?s.addListener.bind(s):null,n=typeof s?.off=="function"?s.off.bind(s):typeof s?.removeListener=="function"?s.removeListener.bind(s):null;if(!o||!n){bt.warn("\u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5");return}try{o(r,e.handler),e.attached=!0,e._hostName=r,e._hostUnsubscribe=()=>{try{n(r,e.handler)}catch(a){bt.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:r,error:a})}},bt.debug(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${r}" (key=${e.key})`)}catch(a){bt.error(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6\u5931\u8D25: "${r}"`,{error:a})}}},Dt=new Dl});var dy={};re(dy,{ContextInjector:()=>xa,DEFAULT_INJECTION_OPTIONS:()=>cy,WRITEBACK_METHODS:()=>jt,WRITEBACK_RESULT_STATUS:()=>ba,contextInjector:()=>xt,default:()=>Rx});function $l(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function vs(t,e){let r=String(e||"").trim();return r?Array.isArray(t)?(t.includes(r)||t.push(r),t):[r]:t}function ha(t={}){if(t?.signal?.aborted)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE";if(typeof t?.shouldAbortWriteback=="function")try{if(t.shouldAbortWriteback()===!0)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}catch{return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}return""}var rt,dt,io,cy,ba,jt,Ix,Mx,xa,xt,Rx,Ts=P(()=>{He();G();Ll();rt=C.createScope("ContextInjector"),dt="YouYouToolkit_toolOutputs",io="YouYouToolkit_injectedContext",cy={overwrite:!0,enabled:!0};ba={SUCCESS:"success",FAILED:"failed"},jt={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},Ix=60,Mx=3;xa=class{constructor(){this.debugMode=!1}async inject(e,r,s={}){return(await this.injectDetailed(e,r,s)).success}async injectDetailed(e,r,s={}){let o={...cy,...s},n=this._createWritebackResult(e,o);if(!e||r===void 0||r===null)return rt.error("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),n.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",n;if(!$l(o.sourceMessageId))return rt.error("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),n.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",n;if(o?.signal?.aborted)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",n;if(typeof o?.shouldAbortWriteback=="function")try{if(o.shouldAbortWriteback()===!0)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}catch{return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}let a=n.chatId,i={toolId:e,content:String(r),updatedAt:Date.now(),sourceMessageId:o.sourceMessageId||null,sourceSwipeId:o.sourceSwipeId||o.effectiveSwipeId||null,options:o};z.emit($.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:i.content,sourceMessageId:i.sourceMessageId,sourceSwipeId:i.sourceSwipeId,effectiveSwipeId:i.sourceSwipeId,slotBindingKey:o.slotBindingKey||"",slotRevisionKey:o.slotRevisionKey||"",slotTransactionId:o.slotTransactionId||"",traceId:o.traceId||"",sessionKey:o.sessionKey||"",options:o});let l=await this._insertToolOutputToBoundAssistantSlot(e,i,o,n);return l.success&&rt.info(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,{inserted:l}),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:r}=this._getChatRuntime(),s=this._findAssistantMessageIndex(r,e);if(s<0)return"";let o=r[s]||{},n=o[io];if(typeof n=="string"&&n.trim())return n.trim();let a=o[dt];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(r){return rt.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",{error:r}),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),r=this._findAssistantMessageIndex(e,null);if(r<0)return{};let o=(e[r]||{})[dt];return o&&typeof o=="object"?o:{}}catch(e){return rt.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",{error:e}),{}}}getToolContext(e,r){if(!r)return null;try{let{chat:s}=this._getChatRuntime(),o=this._findAssistantMessageIndex(s,null);return o<0?null:s[o]?.[dt]?.[r]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,r){if(!r)return!1;try{let{api:s,context:o,chat:n}=this._getChatRuntime(),a=this._findAssistantMessageIndex(n,null);if(a<0)return!1;let i=n[a],l=i?.[dt];if(!l||!l[r])return!1;delete l[r],i[dt]=l,i[io]=this._buildMessageInjectedContext(l);let d=o?.saveChat||s?.saveChat||null;return typeof d=="function"&&await d.call(o||s),z.emit($.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:r}),!0}catch(s){return rt.warn("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:s}),!1}}async clearAllContext(e){try{let{api:r,context:s,chat:o}=this._getChatRuntime(),n=this._findAssistantMessageIndex(o,null);if(n<0)return!1;let a=o[n];delete a[dt],delete a[io];let i=s?.saveChat||r?.saveChat||null;return typeof i=="function"&&await i.call(s||r),z.emit($.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(r){return rt.warn("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:r}),!1}}clearAllChatsContexts(){rt.info("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,r){return!!this.getToolContext(e,r)}getContextSummary(e){let r=this._getLatestAssistantMessageOutputs(),s=Object.entries(r).map(([o,n])=>({toolId:o,updatedAt:n.updatedAt,contentLength:n.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:s,totalCount:s.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,r={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,r=e.SillyTavern||null,s=r?.getContext?.()||null,o=Array.isArray(s?.chat)?s.chat:[],n=Array.isArray(r?.chat)?r.chat:[],a=o.length?o:n;return{topWindow:e,api:r,context:s,chat:a,contextChat:o,apiChat:n}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,r={}){let s=jt.SET_CHAT_MESSAGES;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:r.traceId||"",sessionKey:r.sessionKey||"",sourceMessageId:r.sourceMessageId||null,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId||null,effectiveSwipeId:r.effectiveSwipeId||r.sourceSwipeId||null,slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:jt.NONE,commit:{preferredMethod:s,attemptedMethods:[],appliedMethod:jt.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:"",eventSource:"",eventName:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:ba.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(r=>setTimeout(r,e))}_collectWritebackVerification(e,r,s,o,n,a=null){let i=e?.contextChat?.[s]||e?.apiChat?.[s]||r?.[s]||a||null,l=this._getWritableMessageField(i).text||"",d=i?.[dt]?.[o],c=n?l.includes(n):!0,u=!!(d&&String(d.content||"").trim()===n);return{latestMessage:i,latestText:l,textIncludesContent:c,mirrorStored:u}}async _confirmRefresh(e,r,s,o,n,a=null){let i=1,l=this._collectWritebackVerification(e,r,s,o,n,a);for(let d=0;d<Mx;d+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:i,confirmedBy:"text_and_mirror_present"};await this._wait(Ix),i+=1,l=this._collectWritebackVerification(e,r,s,o,n,a)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:i,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}async _requestAssistantMessageRefresh(e,r,s,o={},n=null){let a=n||this._createWritebackResult("",o),{api:i,context:l}=e||{},d=e?.topWindow||(typeof window.parent<"u"&&window.parent!==window?window.parent:window),c=d?.TavernHelper?.setChatMessages||l?.setChatMessages||i?.setChatMessages||d?.setChatMessages||null;a.commit.preferredMethod=typeof c=="function"?jt.SET_CHAT_MESSAGES:jt.LOCAL_ONLY;let u=!1,p=ha(o);if(p)return a.error=p,a;if(typeof c=="function"){vs(a.commit.attemptedMethods,jt.SET_CHAT_MESSAGES);try{let y=ha(o);if(y)return a.error=y,a;let f=$l(o.sourceMessageId)||r;await c([{message_id:f,message:s}],{refresh:"affected"}),a.steps.hostSetChatMessages=!0,a.hostUpdateMethod=jt.SET_CHAT_MESSAGES,a.hostCommitApplied=!0,a.commit.appliedMethod=jt.SET_CHAT_MESSAGES,a.commit.hostCommitApplied=!0,u=!0}catch(y){rt.error("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",{error:y}),a.errors.push(`setChatMessages: ${y?.message||String(y)}`)}}return u&&(a.refreshRequested=!0,vs(a.refresh.requestMethods,a.hostUpdateMethod)),u||(vs(a.commit.attemptedMethods,jt.LOCAL_ONLY),a.commit.appliedMethod=jt.LOCAL_ONLY,a.commit.fallbackUsed=!0,a.hostUpdateMethod=a.commit.appliedMethod),a}_inferBlockType(e){let r=String(e||"").trim();if(!r)return"empty";let s=r.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return s?.[1]?s[1]:"plain_text"}_stripExactStoredBlock(e,r,s=""){let o=String(e||""),n=String(r||"").trim(),a=String(s||"").trim();return n?o.includes(n)?a?{text:o.replace(n,a).trimEnd(),removed:!0,replaced:!0}:{text:o.replace(n,"").trimEnd(),removed:!0,replaced:!1}:{text:o,removed:!1,replaced:!1}:{text:o,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,r,s){let{contextChat:o,apiChat:n}=e||{},a=i=>{!Array.isArray(i)||r<0||r>=i.length||i[r]!==s&&(i[r]={...i[r]||{},...s})};a(o),a(n)}_notifyMessageUpdated(e,r,s={}){if(s.skipNotify===!0)return{emitted:!1,source:"skipped_by_caller",eventName:""};try{let o=Dt.describe(),n=e?.topWindow||ga();return o.hasBridge?(Dt.emit(We.MESSAGE_UPDATED,r),typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(()=>{Dt.emit(We.MESSAGE_UPDATED,r)}):typeof n?.setTimeout=="function"&&n.setTimeout(()=>{Dt.emit(We.MESSAGE_UPDATED,r)},30),{emitted:!0,source:o.source||"unavailable",eventName:We.MESSAGE_UPDATED}):{emitted:!1,source:o.source||"unavailable",eventName:We.MESSAGE_UPDATED}}catch(o){return rt.warn("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",{error:o}),{emitted:!1,source:"error",eventName:"",error:o?.message||String(o)}}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let r=String(e.role||"").toLowerCase();return r==="assistant"||r==="ai"||!r}_findAssistantMessageIndex(e,r){let s=Array.isArray(e)?e:[];if(!s.length)return-1;let o=r!=null&&r!=="",n=(a,i)=>{if(!this._isAssistantMessage(a)||r==null||r==="")return!1;let l=String(r).trim();return l?[a.message_id,a.id,a.messageId,a.mes_id,i].map(c=>c==null?"":String(c).trim()).includes(l):!1};for(let a=s.length-1;a>=0;a-=1)if(n(s[a],a))return a;if(o)return-1;for(let a=s.length-1;a>=0;a-=1)if(this._isAssistantMessage(s[a]))return a;return-1}_buildMessageInjectedContext(e){let s=Object.entries(e&&typeof e=="object"?e:{}).filter(([,n])=>n?.blockType!=="full_message").sort(([,n],[,a])=>(n?.updatedAt||0)-(a?.updatedAt||0));if(!s.length)return"";let o=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[n,a]of s)o.push(`[${n}]`),o.push(a?.content||""),o.push("");return o.join(`
`)}_getWritableMessageField(e){let r=["mes","message","content","text"];for(let s of r)if(typeof e?.[s]=="string")return{key:s,text:e[s]};return{key:"mes",text:""}}_applyMessageText(e,r,s={}){let o=e&&typeof e=="object"?e:{},n=["mes","message","content","text"],a=!1;if(n.forEach(i=>{typeof o[i]=="string"&&(o[i]=r,a=!0)}),a||(o.mes=r,o.message=r),Array.isArray(o.swipes)){let i=Number.parseInt($l(s?.sourceSwipeId||s?.effectiveSwipeId),10),l=Number.isInteger(i)?i:Number.isInteger(o.swipe_id)?o.swipe_id:Number.isInteger(o.swipeId)?o.swipeId:0;l>=0&&l<o.swipes.length&&(o.swipes[l]=r,o.swipe_id=l,o.swipeId=l)}return o}_stripExistingToolOutput(e,r=[]){let s=String(e||"");return(Array.isArray(r)?r:[]).forEach(n=>{let a=String(n||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let c=new RegExp(a.slice(6).trim(),"gis");s=s.replace(c,"")}catch(c){rt.warn("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",{value:a,error:c})}return}let i=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),d=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");s=s.replace(l,""),s=s.replace(d,"")}),s.trimEnd()}_stripPreviousStoredToolContent(e,r){let s=String(e||""),o=String(r||"").trim();return o?s.replace(o,"").trimEnd():s.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,r,s={},o=null){let n=o||this._createWritebackResult(e,s);try{let a=this._getChatRuntime(),{context:i,chat:l}=a;if(!Array.isArray(l)||!l.length)return rt.error("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),n.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",n;let d=this._findAssistantMessageIndex(l,s.sourceMessageId);if(d<0)return rt.error("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),n.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",n;if(s?.signal?.aborted)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",n;if(typeof s?.shouldAbortWriteback=="function")try{if(s.shouldAbortWriteback()===!0)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}catch{return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}n.messageIndex=d,n.steps.foundTargetMessage=!0;let c=l[d],{key:u,text:p}=this._getWritableMessageField(c);n.textField=u;let y=c[dt]&&typeof c[dt]=="object"?c[dt]:{},f=y?.[e]||{},g=f?.content||"",b=f?.blockText||g||"",v=Object.entries(y).filter(([Fe])=>Fe!==e).map(([,Fe])=>Fe||{}),T=String(r.content||"").trim(),w=s.replaceFullMessage===!0,B=w?"full_message":this._inferBlockType(T),R={toolId:e,messageId:s.sourceMessageId||c?.message_id||c?.messageId||d,blockType:B,insertedAt:r.updatedAt,replaceable:s.overwrite!==!1};n.blockIdentity=R;let S=s.overwrite===!1||w?{text:String(p||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(p,b,T),_=S.text,F="";!w&&s.overwrite!==!1&&b&&!S.removed&&(F="previous_block_not_found");let W=s.overwrite===!1||S.replaced||w?_:this._stripExistingToolOutput(_,s.extractionSelectors),D=W!==_;_=W;let A=s.overwrite===!1||S.replaced||w?_:this._stripPreviousStoredToolContent(_,g),J=A!==_;_=A,n.replacedExistingBlock=w||S.removed||D||J;let K=s.overwrite===!1?String(p||""):_,Q=w?T:S.replaced?_.trim():[K.trimEnd(),T].filter(Boolean).join(`

`).trim();n.insertedNewBlock=!!T;let ue=v.every(Fe=>{if(Fe?.blockType==="full_message")return!0;let sr=String(Fe?.blockText||Fe?.content||"").trim();return sr?Q.includes(sr):!0});n.preservedOtherToolBlocks=ue,ue?F&&(n.conflictDetected=!0,n.conflictReason=F):(n.conflictDetected=!0,n.conflictReason="other_tool_block_removed");let ge={...y,[e]:{toolId:e,content:T,blockText:T,blockType:B,blockIdentity:R,updatedAt:r.updatedAt,sourceMessageId:r.sourceMessageId||null}},Me=ha(s);if(Me)return n.error=Me,n;c[u]=Q,this._applyMessageText(c,Q,s),c[dt]=ge,c[io]=this._buildMessageInjectedContext(ge),n.contentCommitted=!0,n.commit.contentCommitted=!0,n.steps.contentCommitted=!0,n.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,d,c),n.steps.runtimeSynced=!0;let H=ha(s);if(H)return n.error=H,n;await this._requestAssistantMessageRefresh(a,d,Q,s,n);let Ae=i?.saveChat||a?.api?.saveChat||null,De=i?.saveChatDebounced||a?.api?.saveChatDebounced||null;typeof De=="function"&&(De.call(i||api),n.steps.saveChatDebounced=!0,n.refreshRequested=!0,vs(n.refresh.requestMethods,"saveChatDebounced")),typeof Ae=="function"&&(await Ae.call(i||api),n.steps.saveChat=!0,n.refreshRequested=!0,vs(n.refresh.requestMethods,"saveChat"));let xe=this._notifyMessageUpdated(a,d,s);n.steps.notifiedMessageUpdated=xe?.emitted===!0,n.refresh.eventSource=xe?.source||"",n.refresh.eventName=xe?.eventName||"",xe?.error&&n.errors.push(`MESSAGE_UPDATED: ${xe.error}`);let Le=String(r.content||"").trim();(n.steps.hostSetChatMessages||n.steps.hostSetChatMessage)&&(n.refreshRequested=!0,vs(n.refresh.requestMethods,n.hostUpdateMethod)),n.steps.notifiedMessageUpdated&&(n.refreshRequested=!0,vs(n.refresh.requestMethods,`MESSAGE_UPDATED:${n.refresh.eventName||"MESSAGE_UPDATED"}`)),n.steps.refreshRequested=n.refreshRequested,n.refresh.requested=n.refreshRequested;let St=await this._confirmRefresh(a,l,d,e,Le,c);return n.verification.textIncludesContent=St.textIncludesContent,n.verification.mirrorStored=St.mirrorStored,n.verification.refreshConfirmed=St.refreshConfirmed,n.steps.verifiedAfterWrite=n.verification.textIncludesContent&&n.verification.mirrorStored,n.refreshConfirmed=n.verification.refreshConfirmed&&n.refreshRequested,n.refresh.confirmChecks=Number(St.confirmChecks)||0,n.refresh.confirmedBy=St.confirmedBy||"",n.refresh.confirmed=n.refreshConfirmed,n.steps.refreshConfirmed=n.refreshConfirmed,n.success=n.steps.localTextApplied&&n.steps.runtimeSynced&&n.steps.verifiedAfterWrite&&n.refreshConfirmed,n.writebackStatus=n.success?ba.SUCCESS:ba.FAILED,!n.success&&!n.error&&(n.error=n.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),n.conflictDetected&&!n.error&&(n.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${n.conflictReason}`),rt.info(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${d}`),n}catch(a){return rt.error("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",{error:a}),n.error=a?.message||String(a),n.errors.push(n.error),n}}getAssistantMessageSnapshot(e=null){try{let r=this._getChatRuntime(),{chat:s}=r,o=this._findAssistantMessageIndex(s,e);if(o<0)return null;let n=s[o]||null,a=this._getWritableMessageField(n).text||"",i=n?.[dt]&&typeof n[dt]=="object"?n[dt]:{},l=Object.values(i).reduce((d,c)=>{let u=String(c?.blockText||c?.content||"").trim();return!u||!d.includes(u)?d:d.replace(u,"").trimEnd()},String(a||"")).trim();return{messageIndex:o,message:n,messageText:a,baseText:l,toolOutputs:i,injectedContext:typeof n?.[io]=="string"?n[io]:this._buildMessageInjectedContext(i)}}catch(r){return rt.warn("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",{error:r}),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext(),o=[r?.chatId,r?.chat_id,r?.chat_filename,r?.chatMetadata?.chatId,r?.chatMetadata?.chat_id,r?.chatMetadata?.file_name,r?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(o)return o;let n=e.SillyTavern?.this_chid;if(n!=null)return`chat_char_${n}`}return"chat_default"}catch{return"chat_default"}}},xt=new xa,Rx=xt});var py={};re(py,{BUILTIN_VARIABLES:()=>uy,VariableResolver:()=>wa,default:()=>Nx,variableResolver:()=>Lt});var Px,uy,wa,Lt,Nx,va=P(()=>{He();G();Px=C.createScope("VariableResolver"),uy={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},wa=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,r){if(typeof e!="string")return e;let s=e;return s=this._resolveBuiltinVariables(s,r),s=this._resolveCustomVariables(s,r),s=this._resolveRegexVariables(s,r),s}resolveObject(e,r){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(o=>this.resolveObject(o,r));let s={};for(let[o,n]of Object.entries(e))typeof n=="string"?s[o]=this.resolveTemplate(n,r):typeof n=="object"&&n!==null?s[o]=this.resolveObject(n,r):s[o]=n;return s}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,r){e&&(this.customVariables.set(e,r),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,r){!e||typeof r!="function"||(this.variableHandlers.set(e,r),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,r]of Object.entries(uy))e.push({name:`{{${r.name}}}`,description:r.description,category:r.category,type:"builtin"});for(let[r,s]of this.customVariables)e.push({name:`{{${r}}}`,description:typeof s=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],r={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},s={};for(let o of this.getAvailableVariables())s[o.category]||(s[o.category]=[]),s[o.category].push(o);for(let[o,n]of Object.entries(r))if(s[o]&&s[o].length>0){e.push(`\u3010${n}\u3011`);for(let a of s[o])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,r)=>(r.regexResults||r.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,r){let s=e;return s=s.replace(/\{\{lastUserMessage\}\}/gi,r.lastUserMessage||r.raw?.lastUserMessage||""),s=s.replace(/\{\{lastAiMessage\}\}/gi,r.lastAiMessage||r.raw?.lastAiMessage||""),s=s.replace(/\{\{chatHistory\}\}/gi,()=>{let o=r.chatHistory||r.raw?.chatHistory||[];return this._formatChatHistory(o)}),s=s.replace(/\{\{characterCard\}\}/gi,()=>{let o=r.characterCard||r.raw?.characterCard;return o?this._formatCharacterCard(o):""}),s=s.replace(/\{\{toolName\}\}/gi,r.toolName||r.raw?.toolName||""),s=s.replace(/\{\{toolId\}\}/gi,r.toolId||r.raw?.toolId||""),s=s.replace(/\{\{toolPromptMacro\}\}/gi,r.toolPromptMacro||r.raw?.toolPromptMacro||""),s=s.replace(/\{\{toolContentMacro\}\}/gi,r.toolContentMacro||r.raw?.toolContentMacro||""),s=s.replace(/\{\{toolWorldbookContent\}\}/gi,r.toolWorldbookContent||r.raw?.toolWorldbookContent||""),s=s.replace(/\{\{injectedContext\}\}/gi,r.injectedContext||r.raw?.injectedContext||""),s=s.replace(/\{\{extractedContent\}\}/gi,r.extractedContent||r.raw?.extractedContent||""),s=s.replace(/\{\{recentMessagesText\}\}/gi,r.recentMessagesText||r.raw?.recentMessagesText||""),s=s.replace(/\{\{rawRecentMessagesText\}\}/gi,r.rawRecentMessagesText||r.raw?.rawRecentMessagesText||""),s=s.replace(/\{\{userMessage\}\}/gi,r.userMessage||r.raw?.userMessage||""),s=s.replace(/\{\{previousToolOutput\}\}/gi,r.previousToolOutput||r.raw?.previousToolOutput||""),s}_resolveCustomVariables(e,r){let s=e;for(let[o,n]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(o)}\\}\\}`,"gi");typeof n=="function"?s=s.replace(a,()=>{try{return n(r)}catch(i){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}:`,i),""}}):s=s.replace(a,String(n))}return s}_resolveRegexVariables(e,r){let s=e;for(let[o,n]of this.variableHandlers){let a=new RegExp(`\\{\\{${o}\\.([^}]+)\\}\\}`,"gi");s=s.replace(a,(i,l)=>{try{return n(l,r)}catch(d){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}.${l}:`,d),""}})}return s}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(r=>{let s=r.role||"unknown",o=r.content||r.mes||"";return`[${s}]: ${o}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let r=[];return e.name&&r.push(`\u59D3\u540D: ${e.name}`),e.description&&r.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&r.push(`\u6027\u683C: ${e.personality}`),e.scenario&&r.push(`\u573A\u666F: ${e.scenario}`),r.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){Px.debug(e[0],e.length>1?e.slice(1):void 0)}},Lt=new wa,Nx=Lt});var fy={};re(fy,{DEFAULT_PROMPT_TEMPLATE:()=>yy,ToolPromptService:()=>Ta,default:()=>Lx,toolPromptService:()=>Ss});var Dx,yy,Ta,Ss,Lx,Sa=P(()=>{He();ao();va();Bn();G();Dx=C.createScope("ToolPromptService"),yy="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",Ta=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,r={}){let s=this._getPromptTemplate(e),o=String(r?.toolWorldbookContent||r?.input?.toolWorldbookContent||await On(e)).trim(),n=Lt.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolWorldbookContent:o}),a=Lt.resolveTemplate(s,n).trim(),i=String(r?.toolContentMacro||r?.input?.toolContentMacro||"").trim();return Lt.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolPromptMacro:a,toolContentMacro:i,toolWorldbookContent:o})}async buildToolMessages(e,r){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let s=[],o=await this._buildVariableContext(e,r),n=Array.isArray(e.promptMessages)?e.promptMessages:[],a=this._getBypassMessages(e),i=a?.some(l=>l.mainSlot==="A"||l.mainSlot==="B"||l.isMain||l.isMain2);if(a&&a.length>0)for(let l of a)l.enabled!==!1&&s.push({role:this._normalizeRole(l.role),content:Lt.resolveTemplate(l.content||"",o)});if(!i&&n.length>0)for(let l of n){let d=Lt.resolveTemplate(l?.content||"",o).trim();d&&s.push({role:this._normalizeRole(l?.role),content:d})}else if(!i&&!a?.length){let l=this._buildUserContent(this._getPromptTemplate(e),o);l&&s.push({role:"user",content:l})}return this._log(`\u6784\u5EFA\u6D88\u606F: ${s.length} \u6761`),s}async buildPromptText(e,r){let s=await this._buildVariableContext(e,r),o=Array.isArray(e?.promptMessages)?e.promptMessages:[];return o.length>0?o.map(n=>Lt.resolveTemplate(n?.content||"",s).trim()).filter(Boolean).join(`

`):s.toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:yy}_getBypassMessages(e){return e.bypass?.enabled?ne.buildBypassMessages(e):[]}_buildUserContent(e,r){return!e||!e.trim()?"":Lt.resolveTemplate(e,r).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){Dx.debug(e[0],e.length>1?e.slice(1):void 0)}setDebugMode(e){this.debugMode=e}},Ss=new Ta,Lx=Ss});var my={};re(my,{LEGACY_OUTPUT_MODES:()=>$x,OUTPUT_MODES:()=>wt,TOOL_FAILURE_STAGES:()=>je,TOOL_RUNTIME_STATUS:()=>Ox,TOOL_WRITEBACK_STATUS:()=>Pe,ToolOutputService:()=>_a,default:()=>Bx,toolOutputService:()=>vt});function gy(t){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}function lo(t=[],e="",r=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!r,contentCommitted:!!r?.contentCommitted,hostCommitApplied:!!r?.hostCommitApplied,writebackStatus:r?.writebackStatus||"",preferredCommitMethod:r?.commit?.preferredMethod||"",appliedCommitMethod:r?.commit?.appliedMethod||"",fallbackUsed:!!r?.commit?.fallbackUsed},refresh:{requested:!!r?.refreshRequested,confirmed:!!r?.refreshConfirmed,requestMethods:Array.isArray(r?.refresh?.requestMethods)?[...r.refresh.requestMethods]:[],confirmChecks:Number(r?.refresh?.confirmChecks)||0,confirmedBy:r?.refresh?.confirmedBy||""}}}var _s,wt,$x,Ox,je,Pe,_a,vt,Bx,on=P(()=>{He();sn();G();Ts();Sa();Ks();ps();Sn();_s=C.createScope("ToolOutputService"),wt={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api",LOCAL_TRANSFORM:"local_transform"},$x={inline:"follow_ai"},Ox={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},je={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},Pe={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};_a=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===wt.POST_RESPONSE_API}shouldRunLocalTransform(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===wt.LOCAL_TRANSFORM||!!e.processor?.type}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let r=e.output?.mode;return r===wt.FOLLOW_AI||r==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,r){let s=Date.now(),o=e.id,n=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=this._getExtractionSelectors(e),d=e.output?.apiPreset||e.apiPreset||"",c="",u=Pe.NOT_APPLICABLE,p=null,y=[],f="";_s.info(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${o}`),z.emit($.TOOL_EXECUTION_STARTED,{toolId:o,traceId:n,sessionKey:a,mode:wt.POST_RESPONSE_API});try{if(c=je.BUILD_MESSAGES,y=await this._buildToolMessages(e,r),!y||y.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");_s.debug(`\u6784\u5EFA\u4E86 ${y.length} \u6761\u6D88\u606F`);let g=gy(r);if(g){let B=Date.now()-s;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:B,meta:{traceId:n,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:d,writebackStatus:u,failureStage:c,writebackDetails:p,aborted:g.aborted===!0,stale:g.stale===!0,abortReason:g.reason||"",phases:lo(y,f,p)}}}let b=await this._getRequestTimeout();c=je.SEND_API_REQUEST;let v=await this._sendApiRequest(d,y,{timeoutMs:b,signal:r.signal});c=je.EXTRACT_OUTPUT,f=this._extractOutputContent(v,e);let T=gy(r);if(T){let B=Date.now()-s;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:B,meta:{traceId:n,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:d,writebackStatus:u,failureStage:c,writebackDetails:p,aborted:T.aborted===!0,stale:T.stale===!0,abortReason:T.reason||"",phases:lo(y,f,p)}}}if(f){if(c=je.INJECT_CONTEXT,p=await xt.injectDetailed(o,f,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:l,traceId:n,sessionKey:a,signal:r.signal,shouldAbortWriteback:r.shouldAbortWriteback,isAutoRun:r.isAutoRun===!0,skipNotify:r.skipNotify===!0}),!p?.success)throw u=Pe.FAILED,new Error(p?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=Pe.SUCCESS}else u=Pe.SKIPPED_EMPTY_OUTPUT;c="";let w=Date.now()-s;return z.emit($.TOOL_EXECUTED,{toolId:o,traceId:n,sessionKey:a,success:!0,duration:w,mode:wt.POST_RESPONSE_API}),_s.info(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${o}, \u8017\u65F6 ${w}ms`),{success:!0,toolId:o,output:f,duration:w,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:y.length,selectors:l,apiPreset:d,writebackStatus:u,failureStage:"",writebackDetails:p,phases:lo(y,f,p)}}}catch(g){let b=Date.now()-s,v=c||je.UNKNOWN,T=u||Pe.NOT_APPLICABLE;return _s.error(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${o}`,{error:g}),z.emit($.TOOL_EXECUTION_FAILED,{toolId:o,traceId:n,sessionKey:a,error:g.message||String(g),duration:b}),{success:!1,toolId:o,error:g.message||String(g),duration:b,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:y.length,selectors:l,apiPreset:d,writebackStatus:T,failureStage:v,writebackDetails:p,phases:lo(y,f,p)}}}}async runToolFollowAiManual(e,r){let s=Date.now(),o=e.id,n=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=e.output?.apiPreset||e.apiPreset||"",d=this._getExtractionSelectors(e),c="",u=Pe.NOT_APPLICABLE,p=null,y=[],f="";z.emit($.TOOL_EXECUTION_STARTED,{toolId:o,traceId:n,sessionKey:a,mode:wt.FOLLOW_AI});try{if(c=je.BUILD_MESSAGES,y=await this._buildToolMessages(e,r),!y||y.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");let g=await this._getRequestTimeout();c=je.SEND_API_REQUEST;let b=await this._sendApiRequest(l,y,{timeoutMs:g,signal:r.signal});if(c=je.EXTRACT_OUTPUT,f=this._extractOutputContent(b,e),f){if(c=je.INJECT_CONTEXT,p=await xt.injectDetailed(o,f,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:d,traceId:n,sessionKey:a}),!p?.success)throw u=Pe.FAILED,new Error(p?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=Pe.SUCCESS}else u=Pe.SKIPPED_EMPTY_OUTPUT;c="";let v=Date.now()-s;return z.emit($.TOOL_EXECUTED,{toolId:o,traceId:n,sessionKey:a,success:!0,duration:v,mode:wt.FOLLOW_AI}),{success:!0,toolId:o,output:f,duration:v,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:y.length,selectors:d,apiPreset:l,writebackStatus:u,failureStage:"",writebackDetails:p,phases:lo(y,f,p)}}}catch(g){let b=Date.now()-s,v=c||je.UNKNOWN,T=u||Pe.NOT_APPLICABLE;return z.emit($.TOOL_EXECUTION_FAILED,{toolId:o,traceId:n,sessionKey:a,error:g.message||String(g),duration:b,mode:wt.FOLLOW_AI}),{success:!1,toolId:o,error:g.message||String(g),duration:b,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:y.length,selectors:d,apiPreset:l,writebackStatus:T,failureStage:v,writebackDetails:p,phases:lo(y,f,p)}}}}async runToolInline(e,r){return this.runToolFollowAiManual(e,r)}async previewExtraction(e,r){return{success:!0,...this.getExtractionSnapshot(e,r)}}getExtractionSnapshot(e,r){let s=this._buildRecentMessageExtractionEntries(e,r),o=this._joinMessageBlocks(s,"rawText"),n=this._joinMessageBlocks(s,"filteredText"),a=this._joinMessageBlocks(s,"extractedText",{skipEmpty:!0}),i=(Array.isArray(s)?s:[]).map(d=>String(d?.extractedText||"").trim()).filter(Boolean).join(`

`),l=Array.isArray(s)&&s.length>0?s[s.length-1]:null;return{sourceText:o,filteredSourceText:n,extractedText:a,extractedRawText:i,messageEntries:s,primaryEntry:l,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,r){let s=this._buildRecentMessageExtractionEntries(e,r),o=this._joinMessageBlocks(s,"rawText"),n=this._joinMessageBlocks(s,"filteredText"),a=this._joinMessageBlocks(s,"extractedText",{skipEmpty:!0}),i={...r,rawRecentMessagesText:o,recentMessagesText:n,extractedContent:a,toolContentMacro:this._buildToolContentMacro(s),toolName:e.name,toolId:e.id};return Ss.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let r=String(e).toLowerCase();return r==="system"?"system":r==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,r,s={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:o=9e4,signal:n}=s,a=null;if(e){if(!vo(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=wo(e)}else a=wo();let i=Tn(a||{});if(!i.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(r,{timeoutMs:o,apiConfig:a},n);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Nt.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,r){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,r);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,r);if(e.content)return this._applyOutputExtractionSelectors(e.content,r);if(e.text)return this._applyOutputExtractionSelectors(e.text,r);if(e.message)return this._applyOutputExtractionSelectors(e.message,r);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),r)}catch{return this._applyOutputExtractionSelectors(String(e),r)}}return this._applyOutputExtractionSelectors(String(e),r)}_applyOutputExtractionSelectors(e,r){let s=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(r);if(!o.length)return s.trim();let n=[];for(let a of o){let i=String(a||"").trim();if(!i)continue;if(i.startsWith("regex:")){let d=i.slice(6).trim();if(!d)continue;try{let c=new RegExp(d,"gi");[...s.matchAll(c)].forEach(p=>{let y=String(p?.[0]||"").trim();y&&n.push(y)})}catch(c){_s.warn("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let d=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(s.match(d)||[]).forEach(u=>{let p=String(u||"").trim();p&&n.push(p)})}catch(d){_s.warn("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:d})}}return n.length>0?n.join(`

`).trim():s.trim()}_resolveExtractionContext(e){let r=e?.extraction?.regexPresetId;if(!r)return{rules:[],blacklist:[]};try{let s=yr(r);if(!s)return{rules:[],blacklist:[]};let o=Array.isArray(s.rules)?s.rules.filter(a=>a&&a.enabled!==!1&&a.value).map(a=>({id:a.id,type:a.type,value:a.value,enabled:!0})):[],n=Array.isArray(s.blacklist)?s.blacklist.map(a=>String(a||"").trim()).filter(Boolean):[];return{rules:o,blacklist:n}}catch(s){return this._log("warn","_resolveExtractionContext \u5F02\u5E38",{error:s}),{rules:[],blacklist:[]}}}_getExtractionSelectors(e){let{rules:r}=this._resolveExtractionContext(e),s=[];for(let o of r){let n=String(o.value||"").trim();n&&(o.type==="include"?s.push(n):o.type==="regex_include"&&s.push(`regex:${n}`))}return s}_applyExtractionSelectors(e,r){return this._applyExtractionSelectorsInternal(e,r,{strict:!1})}_applyExtractionSelectorsInternal(e,r,s={}){let o=typeof e=="string"?e:String(e||""),{rules:n,blacklist:a}=this._resolveExtractionContext(r),{strict:i=!1}=s;if(!n.length)return o.trim();let l=cr(o,n,a||[]);return i?(l||"").trim():l||o.trim()}_extractToolContent(e,r){let s=typeof r=="string"?r:String(r||""),{rules:o}=this._resolveExtractionContext(e);return o.length?this._applyExtractionSelectorsInternal(s,e,{strict:!0}):s.trim()}_applyGlobalContextRules(e){let r=typeof e=="string"?e:String(e||"");if(!r.trim())return"";try{let s=Bs()||[],o=zs()||[];return!Array.isArray(s)||s.length===0?r.trim():cr(r,s,o)||r.trim()}catch(s){return _s.warn("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",{error:s}),r.trim()}}_getMessageText(e){if(!e)return"";let r=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let s of r)if(typeof s=="string"&&s.trim())return s.trim();return""}_collectRecentAssistantMessages(e,r){return this._collectRecentAssistantMessageEntries(e,r).map(s=>s.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,r){let s=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),o=Array.isArray(r?.chatMessages)?r.chatMessages:[],n=[];for(let i=o.length-1;i>=0&&n.length<s;i-=1){let l=o[i],d=String(l?.role||"").toLowerCase(),c=d==="assistant"||d==="ai"||!l?.is_user&&!l?.is_system&&!d,u=this._getMessageText(l);c&&u&&n.unshift({text:u,message:l,chatIndex:i})}if(n.length>0)return n;let a=r?.lastAiMessage||r?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,r){return this._collectRecentAssistantMessageEntries(e,r).map((o,n)=>{let a=o.text||"",i=this._applyGlobalContextRules(a),l=this._extractToolContent(e,a);return{...o,order:n+1,rawText:a,filteredText:i,extractedText:l,fullMessageText:a}})}_joinMessageBlocks(e,r,s={}){let o=Array.isArray(e)?e:[],{skipEmpty:n=!1}=s;return o.map(i=>{let l=String(i?.[r]||"").trim();return n&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(o=>{let n=`\u3010\u7B2C ${o?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(o?.filteredText||"").trim()||"(\u7A7A)",i=String(o?.extractedText||"").trim()||"(\u7A7A)";return`${n}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunInline(r)):[]}setDebugMode(e){this.debugMode=e}},vt=new _a,Bx=vt});function by(t={}){return!t||typeof t!="object"?{}:Object.entries(t).reduce((e,[r,s])=>(e[r]=s===!0,e),{})}function Ux(t,e={}){let r=e?.direction==="unescape"?"unescape":"escape",s=by(e?.options);return zx.reduce((o,n)=>s[n.key]!==!0?o:r==="unescape"?o.replace(n.escaped,n.unescaped):o.replace(n.plain,n.replacement),String(t||""))}function Wx(t,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(t||"");let s=by(e?.options);return Kx.reduce((o,n)=>s[n.key]!==!0?o:o.replace(n.from,n.to),String(t||""))}function jx(t,e){let r=t?.processor||{},s=r?.type||"",o=String(e||"");switch(s){case hy.ESCAPE_TRANSFORM:return Ux(o,r);case hy.PUNCTUATION_TRANSFORM:return Wx(o,r);default:return o}}function Fx(t,e,r){let s=String(t||""),o=String(e||"").trim(),n=String(r||"").trim();return!s.trim()||!o?{nextMessageText:"",replaced:!1}:s.includes(o)?{nextMessageText:s.replace(o,n).trim(),replaced:!0}:{nextMessageText:"",replaced:!1}}async function Ea(t,e={}){let r=vt.getExtractionSnapshot(t,e),s=r?.primaryEntry||null,o=String(s?.fullMessageText||e?.lastAiMessage||"").trim(),n=String(s?.extractedText||r?.extractedRawText||r?.extractedText||"").trim(),a=Array.isArray(r?.selectors)?r.selectors:[],i=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l=e?.sessionKey||"";if(!n||!o)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:Pe.NOT_APPLICABLE,failureStage:je.EXTRACT_OUTPUT,extraction:r}};let d=String(jx(t,n)||"").trim(),c=Fx(o,n,d),u=c.replaced?c.nextMessageText:d,p=null,y=Pe.NOT_APPLICABLE;if(u){if(p=await xt.injectDetailed(t.id,u,{overwrite:!0,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:[],replaceFullMessage:c.replaced,traceId:i,sessionKey:l,skipNotify:e?.skipNotify===!0}),!p?.success)return{success:!1,error:p?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:Pe.FAILED,failureStage:je.INJECT_CONTEXT,writebackDetails:p,extraction:r}};y=Pe.SUCCESS}else y=Pe.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:d,writebackState:u?{committed:p?.contentCommitted===!0}:null,meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:y,failureStage:"",writebackDetails:p,extraction:r}}}var zx,Kx,hy,Ol=P(()=>{on();Ts();zx=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],Kx=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],hy={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var zl={};re(zl,{abortAllTasks:()=>Vx,abortTask:()=>qx,buildToolMessages:()=>vy,clearExecutionHistory:()=>ew,createExecutionContext:()=>ow,createResult:()=>Aa,enhanceMessagesWithBypass:()=>nw,executeBatch:()=>Gx,executeTool:()=>wy,executeToolWithConfig:()=>Ty,executeToolsBatch:()=>lw,executorState:()=>Ie,extractFailed:()=>sw,extractSuccessful:()=>rw,generateTaskId:()=>Es,getExecutionHistory:()=>Zx,getExecutorStatus:()=>Qx,getScheduler:()=>co,mergeResults:()=>tw,pauseExecutor:()=>Jx,resumeExecutor:()=>Xx,setMaxConcurrent:()=>Yx});function Aa(t,e,r,s,o,n,a=0){return{success:r,taskId:t,toolId:e,data:s,error:o,duration:n,retries:a,timestamp:Date.now(),metadata:{}}}function Es(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function Hx(t,e={}){return{id:Es(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function co(){return nn||(nn=new Bl(Ie.maxConcurrent)),nn}function Yx(t){Ie.maxConcurrent=Math.max(1,Math.min(10,t)),nn&&(nn.maxConcurrent=Ie.maxConcurrent)}async function wy(t,e={},r){let s=co(),o=Hx(t,e);for(;Ie.isPaused;)await new Promise(n=>setTimeout(n,100));try{let n=await s.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof r=="function")return await r(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},o);return xy(n),n}catch(n){let a=Aa(o.id,t,!1,null,n,Date.now()-o.createdAt,o.retries);return xy(a),a}}async function Gx(t,e={}){let{failFast:r=!1,concurrency:s=Ie.maxConcurrent}=e,o=[],n=co(),a=n.maxConcurrent;n.maxConcurrent=s;try{let i=t.map(({toolId:l,options:d,executor:c})=>wy(l,d,c));if(r)for(let l of i){let d=await l;if(o.push(d),!d.success){n.abortAll();break}}else{let l=await Promise.allSettled(i);for(let d of l)d.status==="fulfilled"?o.push(d.value):o.push(Aa(Es(),"unknown",!1,null,d.reason,0,0))}}finally{n.maxConcurrent=a}return o}function qx(t){return co().abort(t)}function Vx(){co().abortAll(),Ie.executionQueue=[]}function Jx(){Ie.isPaused=!0}function Xx(){Ie.isPaused=!1}function Qx(){return{...co().getStatus(),isPaused:Ie.isPaused,activeControllers:Ie.activeControllers.size,historyCount:Ie.executionHistory.length}}function xy(t){Ie.executionHistory.push(t),Ie.executionHistory.length>100&&Ie.executionHistory.shift()}function Zx(t={}){let e=[...Ie.executionHistory];return t.toolId&&(e=e.filter(r=>r.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(r=>r.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function ew(){Ie.executionHistory=[]}function tw(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let r of t)e.totalDuration+=r.duration,r.success?(e.successCount++,r.data!==void 0&&r.data!==null&&e.data.push(r.data)):(e.success=!1,e.failureCount++,r.error&&e.errors.push({taskId:r.taskId,toolId:r.toolId,error:r.error.message||String(r.error)}));return e}function rw(t){return t.filter(e=>e.success).map(e=>e.data)}function sw(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function ow(t={}){return{taskId:Es(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function nw(t,e){return!e||e.length===0?t:[...e,...t]}function aw(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function vy(t,e){let r=[],s=t.promptTemplate||"",o={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[n,a]of Object.entries(o))s=s.replace(new RegExp(aw(n),"g"),a);return r.push({role:"USER",content:s}),r}async function Ty(t,e,r={}){let s=oe(t);if(!s)return{success:!1,taskId:Es(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!s.enabled)return{success:!1,taskId:Es(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let o=Date.now(),n=Es();try{z.emit($.TOOL_EXECUTION_STARTED,{toolId:t,taskId:n,context:e});let a=vy(s,e);if(typeof r.callApi=="function"){let i=s.output?.apiPreset||s.apiPreset||"",l=i?{preset:i}:null,d=await r.callApi(a,l,r.signal),c=d;s.outputMode==="separate"&&s.extractTags?.length>0&&(c=iw(d,s.extractTags));let u={success:!0,taskId:n,toolId:t,data:c,duration:Date.now()-o};return z.emit($.TOOL_EXECUTED,{toolId:t,taskId:n,result:u}),u}else return{success:!0,taskId:n,toolId:t,data:{messages:a,config:{apiPreset:s.output?.apiPreset||s.apiPreset||"",outputMode:s.outputMode,extractTags:s.extractTags}},duration:Date.now()-o,needsExecution:!0}}catch(a){let i={success:!1,taskId:n,toolId:t,error:a.message||String(a),duration:Date.now()-o};return z.emit($.TOOL_EXECUTION_FAILED,{toolId:t,taskId:n,error:a}),i}}function iw(t,e){let r={};for(let s of e){let o=new RegExp(`<${s}[^>]*>([\\s\\S]*?)<\\/${s}>`,"gi"),n=t.match(o);n&&(r[s]=n.map(a=>{let i=a.match(new RegExp(`<${s}[^>]*>([\\s\\S]*?)<\\/${s}>`,"i"));return i?i[1].trim():""}))}return r}async function lw(t,e,r={}){let s=[];for(let o of t){let n=oe(o);if(n&&n.enabled){let a=await Ty(o,e,r);s.push(a)}}return s}var Ie,Bl,nn,Kl=P(()=>{Qt();He();Ie={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};Bl=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,r){return new Promise((s,o)=>{this.queue.push({executor:e,task:r,resolve:s,reject:o}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:r,task:s,resolve:o,reject:n}=e,a=new AbortController;s.abortController=a,s.status="running",s.startedAt=Date.now(),this.running.set(s.id,s),Ie.activeControllers.set(s.id,a),this.executeTask(r,s,a.signal).then(i=>{s.status="completed",s.completedAt=Date.now(),o(i)}).catch(i=>{s.status=i.name==="AbortError"?"aborted":"failed",s.completedAt=Date.now(),n(i)}).finally(()=>{this.running.delete(s.id),Ie.activeControllers.delete(s.id),Ie.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,r,s){let o=Date.now(),n=null;for(let a=0;a<=r.maxRetries;a++){if(s.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(s);return Aa(r.id,r.toolId,!0,i,null,Date.now()-o,a)}catch(i){if(n=i,i.name==="AbortError")throw i;a<r.maxRetries&&(await this.delay(1e3*(a+1)),r.retries=a+1)}}throw n}delay(e){return new Promise(r=>setTimeout(r,e))}abort(e){let r=Ie.activeControllers.get(e);return r?(r.abort(),!0):!1}abortAll(){for(let e of Ie.activeControllers.values())e.abort();Ie.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},nn=null});async function dw(){return Ul||(Ul=Promise.resolve().then(()=>(Kl(),zl))),Ul}async function uw(t,e,r){return r&&t.output?.mode===wt.POST_RESPONSE_API?vt.runToolPostResponse(t,e):r&&t.output?.mode===wt.FOLLOW_AI?vt.runToolFollowAiManual(t,e):(await dw()).executeToolWithConfig(t.id,e)}function pw(t,e){return e?.runSource==="MANUAL"?t.output?.mode==="local_transform"||t.processor?.type?As.MANUAL_LOCAL_TRANSFORM:t.output?.mode===wt.POST_RESPONSE_API?As.MANUAL_POST_RESPONSE_API:As.MANUAL_COMPATIBILITY:As.MANUAL_POST_RESPONSE_API}function Ca(t,e){try{ji(t,e)}catch(r){cw.warn("\u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",{toolId:t,error:r})}}async function yw(t,e){let r=Date.now(),s=t.id,o=`yyt-tool-run-${s}`,n=pw(t,e),a=e?.executionKey||"";Ca(s,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),es("info",`\u6B63\u5728\u624B\u52A8\u6267\u884C ${t.name}`,{sticky:!0,noticeId:o});try{let i=n===As.MANUAL_LOCAL_TRANSFORM?await Ea(t,e):await uw(t,e,!0),l=Date.now()-r;if(i?.success){let p=oe(s),y=i?.meta?.writebackDetails||{};return Ca(s,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(p?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:i?.meta?.writebackStatus||Pe.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!y.contentCommitted,lastHostCommitApplied:!!y.hostCommitApplied,lastRefreshRequested:!!y.refreshRequested,lastRefreshConfirmed:!!y.refreshConfirmed,lastPreferredCommitMethod:y?.commit?.preferredMethod||"",lastAppliedCommitMethod:y?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(y?.refresh?.requestMethods)?y.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(y?.refresh?.requestMethods)?[...y.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(y?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:y?.refresh?.confirmedBy||""}),k("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`),es("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,{duration:3200,noticeId:o}),{success:!0,duration:l,result:i}}let d=oe(s),c=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",u=i?.meta?.writebackDetails||{};return Ca(s,{lastStatus:"error",lastError:c,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(d?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:i?.meta?.writebackStatus||Pe.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||(n===As.MANUAL_COMPATIBILITY?je.COMPATIBILITY_EXECUTE:je.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),k("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`),es("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`,{sticky:!0,noticeId:o}),{success:!1,duration:l,error:c,result:i}}catch(i){let l=Date.now()-r,d=oe(s),c=i?.message||String(i);throw Ca(s,{lastStatus:"error",lastError:c,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(d?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:Pe.NOT_APPLICABLE,lastFailureStage:n===As.MANUAL_COMPATIBILITY?je.COMPATIBILITY_EXECUTE:je.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),k("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`),es("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`,{sticky:!0,noticeId:o}),i}}async function ka(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=oe(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return Nr(t,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:Pe.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),es("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let r=await os({runSource:"MANUAL"});return yw(e,r)}async function Ia(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=oe(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let r=await os({runSource:"MANUAL_PREVIEW"});return vt.previewExtraction(e,r)}var cw,As,Ul,Wl=P(()=>{Qt();on();as();Ol();Ye();G();cw=C.createScope("ToolTrigger"),As={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},Ul=null});var _y={};re(_y,{TOOL_CONFIG_PANEL_STYLES:()=>jl,createToolConfigPanel:()=>Ur,default:()=>ww});function Sy(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function fw(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function Ur(t={}){let{id:e,toolId:r,postResponseHint:s,previewDialogId:o,previewTitle:n="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:r,renderTo(a){let i=Sy(a);if(!i)return;if(i._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}let l=()=>this.renderTo(a),d=oe(r);if(!d){i.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let c=m("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),u=[];c.appendChild(gw(d,r,l,s)),c.appendChild(mw(d));let p=hw(d,r,l);u.push(p),c.appendChild(p.el);let y=bw(d,r,l,a,o,n);u.push(y),c.appendChild(y.el),i.innerHTML="",i.appendChild(c),i._yytToolPanelCleanup=()=>{for(let f of u)try{f.destroy()}catch{}delete i._yytToolPanelCleanup}},destroy(a){let i=Sy(a);if(i?._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}},getStyles(){return jl}}}function gw(t,e,r,s){let o=m("div",{className:"yyt-tool-panel-hero"}),n=m("div",{className:"yyt-tool-panel-hero-row1"});n.appendChild(m("div",{className:"yyt-tool-panel-hero-icon",text:"\u{1F527}"})),n.appendChild(m("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let a=m("div",{className:"yyt-tool-panel-hero-actions"});a.appendChild(de({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await ka(e),k("success","\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C")}catch(f){k("error",`\u6267\u884C\u5931\u8D25\uFF1A${f?.message||f}`)}}}).el),a.appendChild(de({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{k("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"),r()}}).el),n.appendChild(a),o.appendChild(n),t.description&&o.appendChild(m("div",{className:"yyt-tool-panel-hero-desc",text:t.description}));let i=m("div",{className:"yyt-tool-panel-hero-chips"}),d=(t.output?.mode||"follow_ai")==="post_response_api"?"\u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09":"\u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\uFF09";i.appendChild(m("span",{className:"yyt-tool-hero-chip mode",text:d}));let c=t.output?.apiPreset||t.apiPreset||"";c&&i.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`API: ${c}`}));let u=t.extraction?.regexPresetId||"";if(u){let f=Te.getPreset(u);i.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${f?f.name:"\u5DF2\u5220\u9664"}`}))}else i.appendChild(m("span",{className:"yyt-tool-hero-chip",text:"\u6B63\u5219: \u672A\u7ED1\u5B9A",style:{opacity:"0.6"}}));let p=t.worldbooks?.presetId||"";if(p){let f=zt.getPreset(p);f&&i.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u4E16\u754C\u4E66: ${f.name}`}))}let y=t.runtime?.lastStatus;if(y){let f=y==="success"?"status-success":y==="failed"?"status-failed":"";i.appendChild(m("span",{className:`yyt-tool-hero-chip ${f}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${y}`}))}return o.appendChild(i),o}function mw(t){let e=m("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},s=(a,i,l="")=>{let d=m("div",{className:"yyt-tool-runtime-stat"});return d.appendChild(m("span",{className:"yyt-tool-runtime-stat-label",text:a})),d.appendChild(m("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),d},o=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":r.lastStatus==="idle"?"\u5F85\u547D":r.lastStatus||"\u5F85\u547D",n=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(s("\u72B6\u6001",o,n)),e.appendChild(s("\u6700\u8FD1\u8FD0\u884C",fw(r.lastRunAt),"muted")),e.appendChild(s("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(s("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function hw(t,e,r){let s=m("div",{style:{display:"flex",flexDirection:"column"}});s.appendChild(an({label:"\u8F93\u51FA\u6A21\u5F0F",hint:"\u51B3\u5B9A\u6267\u884C\u8DEF\u5F84 + \u81EA\u52A8/\u624B\u52A8",control:Ge({value:t.output?.mode||"follow_ai",options:[{value:"follow_ai",label:"follow_ai \u2014 \u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\u89E6\u53D1\uFF09"},{value:"post_response_api",label:"post_response_api \u2014 \u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09"}],onChange:l=>{let d=oe(e)||{};ve(e,{...d,output:{...d.output||{},mode:l,enabled:l==="post_response_api"}}),r()}})}));let o=(()=>{try{return Er()||[]}catch{return[]}})();s.appendChild(an({label:"API \u9884\u8BBE",hint:"\u989D\u5916 AI \u89E3\u6790\u65F6\u4F7F\u7528",control:Ge({value:t.output?.apiPreset||t.apiPreset||"",options:[{value:"",label:"\u2014\u2014 \u8DDF\u968F\u5F53\u524D\u4E3B API \u2014\u2014"},...o.map(l=>({value:l.name,label:l.name}))],onChange:l=>{let d=oe(e)||{};ve(e,{...d,apiPreset:l,output:{...d.output||{},apiPreset:l}}),r()}})}));let n=(()=>{try{return tn()||[]}catch{return[]}})();s.appendChild(an({label:"Ai \u6307\u4EE4\u9884\u8BBE",hint:'\u9644\u52A0\u5728 system/user \u524D\u7684\u6307\u4EE4\uFF1B\u9009"\u65E0"\u5373\u4E0D\u542F\u7528',control:Ge({value:t.bypass?.enabled&&t.bypass?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0 \u2014\u2014"},...n.map(l=>({value:l.id,label:`${l.name}${l.isDefault?" [\u9ED8\u8BA4]":""}`}))],onChange:l=>{let d=oe(e)||{};ve(e,{...d,bypass:{enabled:!!l,presetId:l||""}}),r()}})}));let a=Te.listPresets();s.appendChild(an({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6",control:Ge({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...a.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let d=oe(e)||{},c={...d.extraction||{},regexPresetId:l};if(l){let u=Te.getPreset(l);k("success",`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${u?.name||l}`)}else k("success","\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6");ve(e,{...d,extraction:c}),r()}})}));let i=zt.listPresets();return s.appendChild(an({label:"\u4E16\u754C\u4E66\u9884\u8BBE",hint:"\u6CE8\u5165\u5230 prompt \u7684 {{toolWorldbookContent}}",control:Ge({value:t.worldbooks?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4FDD\u7559\u5DE5\u5177\u539F\u6709\u4E16\u754C\u4E66\u8BBE\u7F6E\uFF09 \u2014\u2014"},...i.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let d=oe(e)||{},c={...d.worldbooks||{},presetId:l};if(l){let u=zt.getPreset(l);k("success",`\u5DF2\u7ED1\u5B9A\u4E16\u754C\u4E66\u9884\u8BBE\uFF1A${u?.name||l}`)}else k("success","\u5DF2\u89E3\u7ED1\u4E16\u754C\u4E66\u9884\u8BBE\uFF0C\u5DE5\u5177\u4E0D\u518D\u6CE8\u5165\u4E16\u754C\u4E66\u5185\u5BB9");ve(e,{...d,worldbooks:c}),r()}})})),Bt({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[s]})}function an({label:t,hint:e,control:r}){let s=m("div",{className:"yyt-tool-binding-row"}),o=m("div",{className:"yyt-tool-binding-label"});return o.appendChild(m("span",{className:"yyt-tool-binding-label-text",text:t})),e&&o.appendChild(m("span",{className:"yyt-tool-binding-label-hint",text:e})),s.appendChild(o),r.el.classList.add("small"),r.el.style.padding="7px 10px",r.el.style.fontSize="12px",s.appendChild(r.el),s.appendChild(m("div",{className:"yyt-tool-binding-meta"})),s}function bw(t,e,r,s,o,n){let a=m("div",{style:{display:"flex",flexDirection:"column"}});a.appendChild(m("div",{style:{marginBottom:"8px",display:"flex",alignItems:"center",gap:"10px"}},m("div",{style:{flex:"1"}},m("div",{text:"\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:"\u7528 {{macro}} \u5F15\u7528\u4E0A\u4E0B\u6587\u3002\u6A21\u677F\u5185\u5BB9\u4F1A\u4F5C\u4E3A\u53D1\u7ED9\u989D\u5916 AI \u7684 user \u6D88\u606F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})),de({label:"\u{1F504} \u91CD\u7F6E\u4E3A\u9ED8\u8BA4",size:"small",variant:"ghost",onClick:()=>{if(!window.confirm("\u7528\u5DE5\u5177\u9ED8\u8BA4\u6A21\u677F\u8986\u76D6\u5F53\u524D\u6A21\u677F\uFF1F"))return;let v=jn(e)||{},T=oe(e)||{};ve(e,{...T,promptTemplate:v.promptTemplate||""}),r()}}).el));let i=m("textarea",{className:"yyt-textarea yyt-code-textarea",attrs:{rows:"10",placeholder:"\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px",lineHeight:"1.7"}});i.value=t.promptTemplate||"",i.addEventListener("change",()=>{let v=oe(e)||{};ve(e,{...v,promptTemplate:i.value})}),a.appendChild(i),a.appendChild(m("div",{className:"yyt-macro-inline",html:"\u53EF\u7528\u5B8F\uFF1A<code>{{toolPromptMacro}}</code> <code>{{toolContentMacro}}</code> <code>{{toolWorldbookContent}}</code> <code>{{lastAiMessage}}</code> <code>{{recentMessagesText}}</code> <code>{{rawRecentMessagesText}}</code> <code>{{userMessage}}</code> <code>{{toolName}}</code> <code>{{toolId}}</code>"})),a.appendChild(m("hr",{className:"yyt-zone-divider"})),a.appendChild(m("div",{style:{marginBottom:"8px"}},m("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u5E76\u5199\u56DE\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let l=m("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end",marginBottom:"12px"}}),d=m("div",{className:"yyt-form-group",style:{margin:0}});d.appendChild(m("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let c=m("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});c.value=String(Number(t.extraction?.maxMessages)||5),c.addEventListener("change",()=>{let v=oe(e)||{};ve(e,{...v,extraction:{...v.extraction||{},maxMessages:Math.max(1,parseInt(c.value,10)||5)}})}),d.appendChild(c),l.appendChild(d);let u=m("div",{className:"yyt-form-group",style:{margin:0}});u.appendChild(m("label",{html:"&nbsp;",style:{fontSize:"12px"}})),u.appendChild(de({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let v=await Ia(e);xw(s,v,o,n)}catch(v){k("error",`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${v?.message||v}`)}}}).el),l.appendChild(u),a.appendChild(l);let p=m("div",{className:"yyt-form-group",style:{margin:0}});p.appendChild(m("label",{html:'\u5199\u56DE\u6807\u7B7E <span style="font-size:10px;color:var(--yyt-text-muted);font-weight:500;">\uFF08\u591A\u6807\u7B7E\u63D0\u53D6\u65F6\u6307\u5B9A\u552F\u4E00\u5199\u56DE\u6807\u7B7E\uFF1B\u7559\u7A7A\u5219\u63D0\u53D6\u9996\u4E2A\uFF09</span>',style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let y=`yyt-writeback-dl-${e}-${Math.random().toString(36).slice(2,6)}`,f=m("datalist",{attrs:{id:y}}),g=(()=>{let v=new Set,T=[];function w(R){if(R)for(let S of R.rules||[]){if(S?.enabled===!1||S?.type!=="include")continue;let _=String(S.value||"").trim();!_||v.has(_)||(v.add(_),T.push(_))}}let B=t.extraction?.regexPresetId;if(B)w(Te.getPreset(B));else for(let R of Te.listPresets())w(R);return T})();for(let v of g)f.appendChild(m("option",{attrs:{value:v}}));let b=m("input",{className:"yyt-input",attrs:{type:"text",placeholder:"\u5982 status / content\uFF08\u6765\u81EA\u6B63\u5219\u9884\u8BBE\u7684 include \u6807\u7B7E\uFF09",list:y,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});return b.value=t.extraction?.writebackTag||"",b.addEventListener("change",()=>{let v=oe(e)||{};ve(e,{...v,extraction:{...v.extraction||{},writebackTag:b.value.trim()}})}),p.appendChild(b),p.appendChild(f),a.appendChild(p),Bt({heading:"\u914D\u7F6E",icon:"\u2699",content:[a]})}function xw(t,e,r,s){if(!X()||!ye(t))return;let n=`${Zr}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${a.map((l,d)=>{let c=d===a.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${a.length-d} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${Kr(c)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${Kr(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${Kr(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${Kr(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(Eo({id:n,title:s,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${Kr((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Kr(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Kr(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Kr(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${i}
    `})),Ao(t,n,{onSave:l=>l()}),t.find(`#${n}-save`).text("\u5173\u95ED"),t.find(`#${n}-cancel`).remove()}function Kr(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var kE,jl,ww,uo=P(()=>{ar();Ye();Ye();Qt();_o();ao();Wl();G();ps();Ls();kE=C.createScope("ToolConfigPanel"),jl=`
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
`;ww=Ur});var Ay={};re(Ay,{SummaryToolPanel:()=>Ey,default:()=>vw});var Ey,vw,Cy=P(()=>{uo();Ey=Ur({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"}),vw=Ey});var Iy={};re(Iy,{StatusBlockPanel:()=>ky,default:()=>Tw});var ky,Tw,My=P(()=>{uo();ky=Ur({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"}),Tw=ky});var Py={};re(Py,{YouyouReviewPanel:()=>Ry,default:()=>Sw});var Ry,Sw,Ny=P(()=>{uo();Ry=Ur({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"}),Sw=Ry});function Dy(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function _w(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function Wr(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ma(t={}){let{id:e,toolId:r,previewDialogId:s,previewTitle:o="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:n=[],processorOptions:a=[],heroHint:i=""}=t;return{id:e,toolId:r,renderTo(l){let d=Dy(l);if(!d)return;if(d._yytLocalToolPanelCleanup)try{d._yytLocalToolPanelCleanup()}catch{}let c=()=>this.renderTo(l),u=oe(r);if(!u){d.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let p=m("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),y=[];p.appendChild(Ew(u,r,c,n,i)),p.appendChild(Aw(u));let f=Cw(u,r,c);y.push(f),p.appendChild(f.el);let g=kw(u,r,c,l,n,a,s,o);y.push(g),p.appendChild(g.el),d.innerHTML="",d.appendChild(p),d._yytLocalToolPanelCleanup=()=>{for(let b of y)try{b.destroy()}catch{}delete d._yytLocalToolPanelCleanup}},destroy(l){let d=Dy(l);if(d?._yytLocalToolPanelCleanup)try{d._yytLocalToolPanelCleanup()}catch{}},getStyles(){return""}}}function Ew(t,e,r,s,o){let n=m("div",{className:"yyt-tool-panel-hero"}),a=m("div",{className:"yyt-tool-panel-hero-row1"});a.appendChild(m("div",{className:"yyt-tool-panel-hero-icon",text:"\u2699"})),a.appendChild(m("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let i=m("div",{className:"yyt-tool-panel-hero-actions"});i.appendChild(de({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await ka(e),k("success","\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C")}catch(g){k("error",`\u6267\u884C\u5931\u8D25\uFF1A${g?.message||g}`)}}}).el),i.appendChild(de({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{k("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"),r()}}).el),a.appendChild(i),n.appendChild(a),t.description&&n.appendChild(m("div",{className:"yyt-tool-panel-hero-desc",text:t.description})),o&&n.appendChild(m("div",{className:"yyt-tool-panel-hero-desc",text:o}));let l=m("div",{className:"yyt-tool-panel-hero-chips"}),d=t.output?.autoTrigger!==!1;l.appendChild(m("span",{className:"yyt-tool-hero-chip mode",text:`\u672C\u5730\u811A\u672C\uFF08${d?"\u81EA\u52A8":"\u624B\u52A8"}\uFF09`}));let c=t.processor?.direction||s[0]?.key||"",u=s.find(g=>g.key===c)?.label||c;u&&l.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u65B9\u5411: ${u}`}));let p=t.output?.overwrite!==!1;l.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u5199\u56DE: ${p?"\u8986\u76D6":"\u8FFD\u52A0"}`}));let y=t.extraction?.regexPresetId||"";if(y){let g=Te.getPreset(y);g&&l.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${g.name}`}))}let f=t.runtime?.lastStatus;if(f){let g=f==="success"?"status-success":f==="failed"?"status-failed":"";l.appendChild(m("span",{className:`yyt-tool-hero-chip ${g}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${f}`}))}return n.appendChild(l),n}function Aw(t){let e=m("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},s=(a,i,l="")=>{let d=m("div",{className:"yyt-tool-runtime-stat"});return d.appendChild(m("span",{className:"yyt-tool-runtime-stat-label",text:a})),d.appendChild(m("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),d},o=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":"\u5F85\u547D",n=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(s("\u72B6\u6001",o,n)),e.appendChild(s("\u6700\u8FD1\u8FD0\u884C",_w(r.lastRunAt),"muted")),e.appendChild(s("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(s("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function Cw(t,e,r){let s=m("div",{style:{display:"flex",flexDirection:"column"}}),o=Te.listPresets();return s.appendChild(Fl({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C",control:Ge({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...o.map(n=>({value:n.id,label:n.name}))],onChange:n=>{let a=oe(e)||{},i={...a.extraction||{},regexPresetId:n};if(n){let l=Te.getPreset(n);k("success",`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${l?.name||n}`)}else k("success","\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6");ve(e,{...a,extraction:i}),r()}})})),s.appendChild(Fl({label:"\u5199\u56DE\u65B9\u5F0F",hint:"\u5904\u7406\u540E\u7684\u7ED3\u679C\u5982\u4F55\u56DE\u5199\u5230 AI \u6D88\u606F",control:Ge({value:t.output?.overwrite!==!1?"replace":"append",options:[{value:"replace",label:"\u8986\u76D6\u539F\u5DE5\u5177\u5757"},{value:"append",label:"\u8FFD\u52A0\u5230\u672B\u5C3E"}],onChange:n=>{let a=oe(e)||{};ve(e,{...a,output:{...a.output||{},overwrite:n==="replace",enabled:!0,mode:"local_transform"}}),r()}})})),s.appendChild(Fl({label:"\u81EA\u52A8\u89E6\u53D1",hint:"\u6536\u5230 AI \u56DE\u590D\u540E\u662F\u5426\u81EA\u52A8\u6267\u884C\u6B64\u811A\u672C",control:Ge({value:t.output?.autoTrigger!==!1?"auto":"manual",options:[{value:"auto",label:"\u81EA\u52A8\uFF08\u6536\u5230\u56DE\u590D\u5373\u6267\u884C\uFF09"},{value:"manual",label:"\u624B\u52A8\uFF08\u4EC5\u70B9\u51FB\u6309\u94AE\u6267\u884C\uFF09"}],onChange:n=>{let a=oe(e)||{};ve(e,{...a,output:{...a.output||{},autoTrigger:n==="auto",enabled:!0,mode:"local_transform"}}),r()}})})),Bt({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[s]})}function Fl({label:t,hint:e,control:r}){let s=m("div",{className:"yyt-tool-binding-row"}),o=m("div",{className:"yyt-tool-binding-label"});return o.appendChild(m("span",{className:"yyt-tool-binding-label-text",text:t})),e&&o.appendChild(m("span",{className:"yyt-tool-binding-label-hint",text:e})),s.appendChild(o),r.el.style.padding="7px 10px",r.el.style.fontSize="12px",s.appendChild(r.el),s.appendChild(m("div",{className:"yyt-tool-binding-meta"})),s}function kw(t,e,r,s,o,n,a,i){let l=m("div",{style:{display:"flex",flexDirection:"column"}});l.appendChild(m("div",{style:{marginBottom:"10px"}},m("div",{text:"\u6267\u884C\u65B9\u5411",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:"\u51B3\u5B9A\u672C\u5730\u811A\u672C\u8FD0\u884C\u54EA\u4E2A\u53D8\u6362\u8DEF\u5F84\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let d=t.processor?.direction||o[0]?.key||"",c=Ge({value:d,options:o.map(g=>({value:g.key,label:g.description?`${g.label} \u2014 ${g.description}`:g.label})),onChange:g=>{let b=oe(e)||{};ve(e,{...b,processor:{...b.processor||{},direction:g}}),r()}});if(c.el.style.padding="7px 10px",c.el.style.fontSize="12px",l.appendChild(c.el),l.appendChild(m("hr",{className:"yyt-zone-divider"})),n.length>0){l.appendChild(m("div",{style:{marginBottom:"10px"}},m("div",{text:"\u5904\u7406\u9879",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:"\u52FE\u9009\u8981\u5305\u542B\u5728\u672C\u6B21\u53D8\u6362\u4E2D\u7684\u9879\u76EE\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let g=m("div",{style:{display:"flex",flexDirection:"column"}}),b=t.processor?.options||{};for(let v of n){let T=At({label:v.label,hint:v.description||"",checked:b[v.key]===!0,onChange:w=>{let B=oe(e)||{};ve(e,{...B,processor:{...B.processor||{},options:{...B.processor?.options||{},[v.key]:w}}})}});g.appendChild(T.el)}l.appendChild(g),l.appendChild(m("hr",{className:"yyt-zone-divider"}))}l.appendChild(m("div",{style:{marginBottom:"10px"}},m("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let u=m("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end"}}),p=m("div",{className:"yyt-form-group",style:{margin:0}});p.appendChild(m("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let y=m("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});y.value=String(Number(t.extraction?.maxMessages)||5),y.addEventListener("change",()=>{let g=oe(e)||{};ve(e,{...g,extraction:{...g.extraction||{},maxMessages:Math.max(1,parseInt(y.value,10)||5)}})}),p.appendChild(y),u.appendChild(p);let f=m("div",{className:"yyt-form-group",style:{margin:0}});return f.appendChild(m("label",{html:"&nbsp;",style:{fontSize:"12px"}})),f.appendChild(de({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let g=await Ia(e);Iw(s,g,a,i)}catch(g){k("error",`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${g?.message||g}`)}}}).el),u.appendChild(f),l.appendChild(u),Bt({heading:"\u914D\u7F6E",icon:"\u2699",content:[l]})}function Iw(t,e,r,s){if(!X()||!ye(t))return;let n=`${Zr}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${a.map((l,d)=>{let c=d===a.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${a.length-d} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${Wr(c)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${Wr(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${Wr(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${Wr(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(Eo({id:n,title:s,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${Wr((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Wr(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Wr(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Wr(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${i}
    `})),Ao(t,n,{onSave:l=>l()}),t.find(`#${n}-save`).text("\u5173\u95ED"),t.find(`#${n}-cancel`).remove()}var UE,Hl=P(()=>{ar();Ye();Qt();Wl();G();uo();ps();UE=C.createScope("LocalTransformToolPanel")});var $y={};re($y,{EscapeTransformToolPanel:()=>Ly,default:()=>Mw});var Ly,Mw,Oy=P(()=>{Hl();Ly=Ma({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]}),Mw=Ly});var zy={};re(zy,{PunctuationTransformToolPanel:()=>By,default:()=>Rw});var By,Rw,Ky=P(()=>{Hl();By=Ma({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]}),Rw=By});var Wy={};re(Wy,{BypassPanel:()=>Uy,default:()=>Pw});var Uy,Pw,jy=P(()=>{He();ao();Ye();Uy={id:"bypassPanel",_getActivePresetId(t){return t.find(".yyt-bypass-editor-content").data("presetId")||null},render(t){let e=ne.getPresetList(),r=ne.getDefaultPresetId();return`
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
    `},_renderPresetItem(t,e){let r=br&&br[t.id];return`
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
      `;let e=ne.getDefaultPresetId()===t.id,r=br&&br[t.id];return`
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
          ${(t.messages||[]).map((s,o)=>this._renderMessageItem(s,o)).join("")}
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
    `},bindEvents(t,e){let r=X();!r||!ye(t)||(t.off(".yytBypass"),this._bindPresetListEvents(t,r),this._bindEditorEvents(t,r),this._bindFileEvents(t,r),Et(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_bindPresetListEvents(t,e){t.on("click.yytBypass",".yyt-bypass-preset-item",r=>{if(e(r.target).closest(".yyt-bypass-quick-delete").length)return;let s=e(r.currentTarget).data("presetId");this._selectPreset(t,e,s)}),t.on("click.yytBypass",".yyt-bypass-quick-delete",async r=>{r.stopPropagation();let s=e(r.currentTarget).data("presetId");if(!s||!await nr("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let n=ne.deletePreset(s);n.success?(t.find(".yyt-bypass-editor-content").data("presetId")===s&&t.find(".yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),k("success","\u9884\u8BBE\u5DF2\u5220\u9664")):k("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.on("click.yytBypass","#yyt-bypass-add",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click.yytBypass","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click.yytBypass","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click.yytBypass",".yyt-bypass-move-up",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message"),o=s.prev(".yyt-bypass-message");o.length&&(o.before(s),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-move-down",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message"),o=s.next(".yyt-bypass-message");o.length&&(o.after(s),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-insert-message",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message");this._insertMessageAfter(t,e,s)}),t.on("click.yytBypass",".yyt-bypass-delete-message",r=>{e(r.currentTarget).closest(".yyt-bypass-message").remove(),this._refreshMessageIndices(t,e)}),t.on("change.yytBypass",".yyt-bypass-message-enabled",r=>{e(r.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(r.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.on("click.yytBypass","#yyt-bypass-import",()=>{t.find("#yyt-bypass-import-file").click()}),t.on("change.yytBypass","#yyt-bypass-import-file",async r=>{let s=r.target.files[0];if(s){try{let o=await ko(s),n=ne.importPresets(o);k(n.success?"success":"error",n.message),n.success&&this.renderTo(t)}catch(o){k("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(r.target).val("")}}),t.on("click.yytBypass","#yyt-bypass-export",()=>{try{let r=ne.exportPresets();Co(r,`bypass_presets_${Date.now()}.json`),k("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(r){k("error",`\u5BFC\u51FA\u5931\u8D25: ${r.message}`)}})},_selectPreset(t,e,r){let s=ne.getPreset(r);s&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${r}"]`).addClass("yyt-active"),t.find(".yyt-bypass-editor").html(this._renderEditor(s)),Et(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_createNewPreset(t,e){let r=`bypass_${Date.now()}`,s=ne.createPreset({id:r,name:"\u65B0 Ai \u6307\u4EE4\u9884\u8BBE",description:"",messages:[]});s.success?(this.renderTo(t),this._selectPreset(t,e,r),k("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):k("error",s?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content"),s=r.data("presetId");if(!s)return;let o=r.find(".yyt-bypass-name-input").val().trim(),n=r.find(".yyt-bypass-description-input").val().trim();if(!o){k("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),r.find(".yyt-bypass-name-input").trigger("focus").trigger("select");return}let a=[];r.find(".yyt-bypass-message").each(function(){let l=e(this);a.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:String(l.data("deletable"))!=="false"})});let i=ne.updatePreset(s,{name:o,description:n,messages:a});i.success?(k("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):k("error",i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},async _deleteCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s||!await nr("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let n=ne.deletePreset(s);n.success?(this.renderTo(t),k("success","\u9884\u8BBE\u5DF2\u5220\u9664")):k("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s)return;let o=`bypass_${Date.now()}`,n=ne.duplicatePreset(s,o);n.success?(this.renderTo(t),this._selectPreset(t,e,o),k("success","\u9884\u8BBE\u5DF2\u590D\u5236")):k("error",n?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s)return;ne.setDefaultPresetId(s),this._refreshPresetList(t,e);let o=ne.getPreset(s);o&&t.find(".yyt-bypass-editor").html(this._renderEditor(o)),k("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE")},_addMessage(t,e){let r=t.find(".yyt-bypass-messages"),s={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},o=r.find(".yyt-bypass-message").length;r.append(this._renderMessageItem(s,o))},_insertMessageAfter(t,e,r){let s=t.find(".yyt-bypass-messages"),o={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},n=this._renderMessageItem(o,0),a=e(n);r.after(a),this._refreshMessageIndices(t,e)},_refreshMessageIndices(t,e){t.find(".yyt-bypass-message").each(function(r){e(this).attr("data-message-index",r)})},_refreshPresetList(t,e){let r=ne.getPresetList(),s=ne.getDefaultPresetId(),o=this._getActivePresetId(t);t.find(".yyt-bypass-preset-list").html(r.map(n=>this._renderPresetItem(n,n.id===s)).join("")),o&&t.find(`.yyt-bypass-preset-item[data-preset-id="${o}"]`).addClass("yyt-active")},destroy(t){!X()||!ye(t)||(ot(t,"yytBypassSelect"),t.off(".yytBypass"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},Pw=Uy});var Gl={};re(Gl,{SettingsPanel:()=>qy,applyTheme:()=>Gy,applyUiPreferences:()=>Yl,default:()=>Dw});function ln({id:t,checked:e=!1,title:r="",hint:s=""}){return`
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
  `}function Hy(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function cn(){return Hy()?.document||document}function Yy(t=cn()){return t?.documentElement||document.documentElement}function Gy(t,e=cn()){let r=Yy(e),s={...Nw,...Fy[t]||Fy["dark-blue"]};Object.entries(s).forEach(([o,n])=>{r.style.setProperty(o,n)}),r.setAttribute("data-yyt-theme",t)}function Yl(t={},e=cn()){let r=Yy(e),{theme:s="dark-blue",compactMode:o=!1,animationEnabled:n=!0}=t||{};Gy(s,e),r.classList.toggle("yyt-compact-mode",!!o),r.classList.toggle("yyt-no-animation",!n)}var Nw,Fy,qy,Dw,ql=P(()=>{He();sn();G();va();Ye();Nw={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-on-accent":"#0a0d13","--yyt-bg-base":"#0a0d13","--yyt-surface":"#0f1219","--yyt-surface-2":"#151a24","--yyt-surface-3":"#1c2231","--yyt-surface-hover":"#1c2231","--yyt-surface-active":"#232b3e","--yyt-border":"rgba(255, 255, 255, 0.06)","--yyt-border-soft":"rgba(255, 255, 255, 0.04)","--yyt-border-strong":"rgba(255, 255, 255, 0.12)","--yyt-text":"rgba(255, 255, 255, 0.92)","--yyt-text-secondary":"rgba(255, 255, 255, 0.55)","--yyt-text-muted":"rgba(255, 255, 255, 0.35)","--yyt-focus-ring":"0 0 0 2px rgba(123, 183, 255, 1), 0 0 0 4px rgba(123, 183, 255, 0.15)","--yyt-control-bg":"#0f1219","--yyt-control-bg-hover":"#151a24","--yyt-control-bg-active":"#1c2231","--yyt-control-bg-strong":"#151a24","--yyt-control-bg-focus":"#151a24","--yyt-control-border":"rgba(255, 255, 255, 0.08)","--yyt-control-border-hover":"rgba(255, 255, 255, 0.14)","--yyt-control-border-focus":"rgba(123, 183, 255, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#151a24","--yyt-select-option-bg":"#1c2231","--yyt-select-option-hover-bg":"#232b3e","--yyt-select-option-selected-bg":"#2a3450","--yyt-select-option-border":"rgba(123, 183, 255, 0.15)","--yyt-select-option-selected-border":"rgba(123, 183, 255, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(0, 0, 0, 0.4)","--yyt-select-arrow-color":"rgba(255, 255, 255, 0.4)"},Fy={"dark-blue":{"--yyt-on-accent":"#0a0d13"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0d0a14","--yyt-surface":"#12101c","--yyt-surface-2":"#1a1726","--yyt-surface-3":"#221e32","--yyt-surface-hover":"#221e32","--yyt-surface-active":"#2a2540","--yyt-on-accent":"#0d0a14","--yyt-control-bg":"#12101c","--yyt-control-bg-hover":"#1a1726","--yyt-control-bg-active":"#221e32","--yyt-control-bg-strong":"#1a1726","--yyt-control-bg-focus":"#1a1726","--yyt-control-border-focus":"rgba(167, 139, 250, 0.5)","--yyt-select-surface":"#1a1726","--yyt-select-option-bg":"#221e32","--yyt-select-option-hover-bg":"#2a2540","--yyt-select-option-selected-bg":"#332d50","--yyt-select-option-border":"rgba(167, 139, 250, 0.15)","--yyt-select-option-selected-border":"rgba(167, 139, 250, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(167, 139, 250, 1), 0 0 0 4px rgba(167, 139, 250, 0.15)"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0a120d","--yyt-surface":"#0f1912","--yyt-surface-2":"#151f1a","--yyt-surface-3":"#1c2824","--yyt-surface-hover":"#1c2824","--yyt-surface-active":"#233530","--yyt-on-accent":"#0a120d","--yyt-control-bg":"#0f1912","--yyt-control-bg-hover":"#151f1a","--yyt-control-bg-active":"#1c2824","--yyt-control-bg-strong":"#151f1a","--yyt-control-bg-focus":"#151f1a","--yyt-control-border-focus":"rgba(74, 222, 128, 0.5)","--yyt-select-surface":"#151f1a","--yyt-select-option-bg":"#1c2824","--yyt-select-option-hover-bg":"#233530","--yyt-select-option-selected-bg":"#2a4038","--yyt-select-option-border":"rgba(74, 222, 128, 0.15)","--yyt-select-option-selected-border":"rgba(74, 222, 128, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(74, 222, 128, 1), 0 0 0 4px rgba(74, 222, 128, 0.15)"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f5f7fa","--yyt-surface":"#edf0f5","--yyt-surface-2":"#e4e8ef","--yyt-surface-3":"#dbe0e9","--yyt-surface-hover":"#dbe0e9","--yyt-surface-active":"#d1d7e2","--yyt-text":"rgba(15, 23, 42, 0.92)","--yyt-text-secondary":"rgba(15, 23, 42, 0.55)","--yyt-text-muted":"rgba(15, 23, 42, 0.35)","--yyt-border":"rgba(15, 23, 42, 0.08)","--yyt-border-soft":"rgba(15, 23, 42, 0.04)","--yyt-border-strong":"rgba(15, 23, 42, 0.14)","--yyt-focus-ring":"0 0 0 2px rgba(59, 130, 246, 1), 0 0 0 4px rgba(59, 130, 246, 0.12)","--yyt-on-accent":"#ffffff","--yyt-control-bg":"#edf0f5","--yyt-control-bg-hover":"#e4e8ef","--yyt-control-bg-active":"#dbe0e9","--yyt-control-bg-strong":"#e4e8ef","--yyt-control-bg-focus":"#e4e8ef","--yyt-control-border":"rgba(15, 23, 42, 0.1)","--yyt-control-border-hover":"rgba(15, 23, 42, 0.18)","--yyt-control-border-focus":"rgba(59, 130, 246, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#e4e8ef","--yyt-select-option-bg":"#edf0f5","--yyt-select-option-hover-bg":"#dbe0e9","--yyt-select-option-selected-bg":"#dbeafe","--yyt-select-option-border":"rgba(59, 130, 246, 0.12)","--yyt-select-option-selected-border":"rgba(59, 130, 246, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(15, 23, 42, 0.1)","--yyt-select-arrow-color":"rgba(15, 23, 42, 0.4)"}};qy={id:"settingsPanel",render(){let t=Nt.getSettings(),e=t.debug?.enableDebugLog===!0,r=this._getAutomationRuntime();return`
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
    `},_renderExecutorTab(t,e={},r=null){let s=Array.isArray(r?.recentTransactions)?r.recentTransactions.slice().reverse():[],o=r?.hostBinding||{},n=Array.isArray(o.eventBindings)&&o.eventBindings.length>0?o.eventBindings.join(" / "):"\u6682\u65E0\u4E8B\u4EF6\u7ED1\u5B9A",a=s.length>0?s.slice(0,5).map(i=>{let l=i?.results?.[0]?.meta?.writebackDetails?.refresh||{};return`
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
            <div class="yyt-settings-runtime-chip ${o.initialized?"is-on":"is-off"}">\u76D1\u542C ${o.initialized?"\u5DF2\u7ED1\u5B9A":"\u672A\u7ED1\u5B9A"}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u5F85\u5904\u7406 ${r?.pendingTimerCount||0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u6392\u961F\u69FD\u4F4D ${r?.queuedSlotCount||0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u4E8B\u52A1 ${s.length}</div>
          </div>
          <div class="yyt-form-hint">\u4E8B\u4EF6\u6E90:<code>${o.source||"unavailable"}</code>;\u4E8B\u4EF6:<code>${n}</code></div>
          ${o.lastError?`<div class="yyt-form-hint">\u6700\u8FD1\u9519\u8BEF:<code>${o.lastError}</code></div>`:""}
          <div class="yyt-list-table">${a}</div>
        </div>
      </div>
    `},_renderDebugTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-file-lines"></i></span>\u65E5\u5FD7\u7EA7\u522B</div>
          <div class="yyt-form-group">
            ${ln({id:"yyt-setting-enableDebugLog",checked:t.enableDebugLog,title:"\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7",hint:"\u5F00\u542F\u540E Logger \u9762\u677F\u5C06\u8BB0\u5F55 DEBUG \u7EA7\u522B\u65E5\u5FD7\uFF0C\u5173\u95ED\u4EC5\u8BB0\u5F55 INFO \u53CA\u4EE5\u4E0A"})}
          </div>
          <div class="yyt-settings-hint" style="margin-top: 8px;">
            <i class="fa-solid fa-terminal"></i> \u5728\u300C\u65E5\u5FD7\u300D\u9762\u677F\u4E2D\u67E5\u770B\u3001\u641C\u7D22\u548C\u5BFC\u51FA\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-clock-rotate-left"></i></span>\u6267\u884C\u8BB0\u5F55</div>
          <div class="yyt-form-group">
            ${ln({id:"yyt-setting-saveExecutionHistory",checked:t.saveExecutionHistory,title:"\u4FDD\u5B58\u6267\u884C\u5386\u53F2",hint:"\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5"})}
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-eye"></i></span>UI \u663E\u793A</div>
          <div class="yyt-form-group">
            ${ln({id:"yyt-setting-showRuntimeBadge",checked:t.showRuntimeBadge,title:"\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0",hint:"\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668"})}
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
            ${ln({id:"yyt-setting-compactMode",checked:t.compactMode,title:"\u7D27\u51D1\u6A21\u5F0F",hint:"\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9"})}
          </div>

          <div class="yyt-form-group">
            ${ln({id:"yyt-setting-animationEnabled",checked:t.animationEnabled,title:"\u542F\u7528\u52A8\u753B\u6548\u679C",hint:"\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B"})}
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
    `},_renderMacroList(){return Lt.getAvailableVariables().map(t=>`
        <div class="yyt-list-row">
          <code>${t.name}</code>
          <span>${t.description}</span>
        </div>
      `).join("")},bindEvents(t){let e=X();if(!e||!ye(t))return;let r=this;t.off(".yytSettings"),t.on("click.yytSettings",".yyt-settings-tab",o=>{let n=e(o.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),e(o.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${n}"]`).addClass("yyt-active")}),t.on("click.yytSettings","#yyt-settings-save",()=>{r._saveSettings(t)}),t.on("click.yytSettings","#yyt-settings-reset",async()=>{await nr("\u91CD\u7F6E\u8BBE\u7F6E","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F",{danger:!0})&&(Nt.resetSettings(),Yl(rn.ui,cn()),r.renderTo(t),k("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}),Et(t,{namespace:"yytSettingsSelect",selectors:["#yyt-setting-queueStrategy","#yyt-setting-theme"]});let s=Nt.getDebugSettings();C.setLevel(s.enableDebugLog?le.DEBUG:le.INFO)},_saveSettings(t){let e=X(),r=[{id:"yyt-setting-maxConcurrent",min:1,max:10,label:"\u6700\u5927\u5E76\u53D1\u6570"},{id:"yyt-setting-maxRetries",min:0,max:10,label:"\u6700\u5927\u91CD\u8BD5\u6B21\u6570"},{id:"yyt-setting-retryDelayMs",min:1e3,max:6e4,label:"\u91CD\u8BD5\u95F4\u9694"},{id:"yyt-setting-requestTimeoutMs",min:1e4,max:3e5,label:"\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4"},{id:"yyt-setting-automationSettleMs",min:0,max:1e4,label:"\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4"},{id:"yyt-setting-automationCooldownMs",min:0,max:6e4,label:"\u81EA\u52A8\u5316\u51B7\u5374\u65F6\u95F4"}];for(let o of r){let n=t.find(`#${o.id}`),a=n.val(),i=parseInt(a,10);if(isNaN(i)||i<o.min||i>o.max){k("warning",`${o.label} \u987B\u5728 ${o.min} ~ ${o.max} \u4E4B\u95F4`),n.trigger("focus").trigger("select");return}}let s={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val(),10)||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val(),10)||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val(),10)||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val(),10)||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},automation:{settleMs:parseInt(t.find("#yyt-setting-automationSettleMs").val(),10)||1200,cooldownMs:parseInt(t.find("#yyt-setting-automationCooldownMs").val(),10)||5e3,maxConcurrentSlots:Nt.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};Nt.saveSettings(s),C.setLevel(s.debug.enableDebugLog?le.DEBUG:le.INFO),Yl(s.ui,cn()),k("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},_getAutomationRuntime(){try{return Hy()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},destroy(t){!X()||!ye(t)||(ot(t,"yytSettingsSelect"),t.off(".yytSettings"))},getStyles(){return`
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
    `},renderTo(t){t.html(this.render({})),this.bindEvents(t,{})}},Dw=qy});function Lw(t={},e=-1){return[t?.sourceId,t?.messageId,t?.message_id,t?.id,t?.mid,t?.mesid,t?.mes_id,t?.chat_index,t?.index,e].map(r=>he(r))}function $w(t=[],e=""){let r=he(e);if(!r||!Array.isArray(t))return-1;for(let s=t.length-1;s>=0;s-=1){let o=t[s];if(Lw(o,s).includes(r))return s}return-1}function dn(t={},e={}){let r=he(t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId);if(!r)return null;let s=Vi({resolvedAt:Date.now(),runSource:e.runSource||t?.runSource||Xe.MANUAL,traceId:t?.traceId||"",chatId:t?.chatId||"",sourceMessageId:r,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId||"swipe:current",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",assistantContentFingerprint:t?.assistantContentFingerprint||"",assistantBaseFingerprint:t?.assistantBaseFingerprint||"",assistantText:t?.lastAiMessage||"",assistantBaseText:t?.assistantBaseText||"",targetMessageIndex:$w(t?.chatMessages||t?.chatHistory||[],r)});return!s.slotBindingKey||!s.slotRevisionKey?null:s}async function Vl({runSource:t=Xe.MANUAL}={}){let e=await os({runSource:t});return dn(e,{runSource:t})}async function Ow({messageId:t,swipeId:e="",runSource:r=Xe.AUTO}={}){let s=await ns({messageId:t,swipeId:e,runSource:r});return dn(s,{runSource:r})}async function Vy(t=null,e={}){let r=t||null;if(typeof e.resolveTarget=="function")return await e.resolveTarget(r);let s=he(e.runSource||r?.runSource)||Xe.MANUAL,o=he(e.messageId||r?.sourceMessageId),n=he(e.swipeId||r?.sourceSwipeId||r?.effectiveSwipeId);return e.useMessageTarget===!0||s===Xe.AUTO?o?Ow({messageId:o,swipeId:n,runSource:s}):null:Vl({runSource:s})}function Jy(t,e){let r=t||null,s=e||null;return!r||!s?{valid:!1,reason:"missing_target_snapshot"}:he(r.sourceMessageId)!==he(s.sourceMessageId)?{valid:!1,reason:"source_message_changed"}:he(r.sourceSwipeId||r.effectiveSwipeId)!==he(s.sourceSwipeId||s.effectiveSwipeId)?{valid:!1,reason:"source_swipe_changed"}:he(r.slotRevisionKey)!==he(s.slotRevisionKey)?{valid:!1,reason:"slot_revision_changed"}:{valid:!0,reason:"ok"}}var Ra=P(()=>{as();Qe()});function xr(t,e=""){return t==null?e:String(t).trim()||e}function Bw(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function zw(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function Xy(t,e){if(!t)return null;let r=t[Xs];if(!r)return null;let s=Se(e);return zw(r)?s===It?r:null:r[s]||null}function un({loadMode:t=fs.EMPTY,mergeBaseOnly:e=!1,state:r=null,sourceKind:s=ft.EMPTY,resolvedFromMessageId:o="",resolvedFromRevisionKey:n=""}={}){let a=fr(r)||null;return{loadMode:t,mergeBaseOnly:e,state:a,sourceKind:s,resolvedFromMessageId:xr(o,a?.sourceMessageId||""),resolvedFromRevisionKey:xr(n,a?.slotRevisionKey||"")}}function Jl(t,e={}){let r=fr(t);return r?fr({...r,meta:{...r.meta||{},...e||{}}}):null}function Qy({runtime:t,targetSnapshot:e,currentMessageIndex:r=-1,templateTables:s=[],isolationKey:o}={}){let n=Array.isArray(t?.chat)?t.chat:[],a=xr(e?.slotRevisionKey,""),i=xr(e?.slotBindingKey,""),l=Se(o===void 0?"":o);if(r>=0&&r<n.length){let d=Xy(n[r],l),c=fr(d);if(c&&xr(c.slotRevisionKey,"")===a)return un({loadMode:fs.EXACT,mergeBaseOnly:!1,state:Jl(c,{sourceKind:ft.EXACT,isolationKey:l,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey}),sourceKind:ft.EXACT,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey});if(c&&xr(c.slotBindingKey,"")===i){let u=Jl({...c,slotRevisionKey:a||c.slotRevisionKey,sourceSwipeId:xr(e?.sourceSwipeId||e?.effectiveSwipeId,c.sourceSwipeId),meta:{...c.meta||{},sourceKind:ft.BINDING,mergeBaseOnly:!0,fallbackFromBinding:!0,isolationKey:l,fallbackFromRevisionKey:xr(c.slotRevisionKey,""),requestedRevisionKey:a,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey}});return un({loadMode:fs.BINDING_FALLBACK,mergeBaseOnly:!0,state:u,sourceKind:ft.BINDING,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey})}}if(r>0)for(let d=r-1;d>=0;d-=1){let c=n[d];if(!Bw(c))continue;let u=Xy(c,l),p=fr(u);if(!p||!Array.isArray(p.tables)||p.tables.length===0)continue;let y=Jl({...p,slotBindingKey:i||p.slotBindingKey,slotRevisionKey:a||p.slotRevisionKey,sourceSwipeId:xr(e?.sourceSwipeId||e?.effectiveSwipeId,p.sourceSwipeId),meta:{...p.meta||{},sourceKind:ft.HISTORY,mergeBaseOnly:!0,reconstructedFromHistory:!0,isolationKey:l,resolvedFromMessageId:p.sourceMessageId,resolvedFromRevisionKey:p.slotRevisionKey}});return un({loadMode:fs.HISTORY,mergeBaseOnly:!0,state:y,sourceKind:ft.HISTORY,resolvedFromMessageId:p.sourceMessageId,resolvedFromRevisionKey:p.slotRevisionKey})}return Array.isArray(s)&&s.length>0?un({loadMode:fs.TEMPLATE,mergeBaseOnly:!1,state:Wo(e,{tables:ie(s),meta:{fromTemplate:!0,isolationKey:l,sourceKind:ft.TEMPLATE,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:ft.TEMPLATE}):un({loadMode:fs.EMPTY,mergeBaseOnly:!1,state:Wo(e,{meta:{isolationKey:l,sourceKind:ft.EMPTY,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:ft.EMPTY})}var Zy=P(()=>{Qe()});function ef(){return Xl||(Xl=C.createScope("TableStateMirror")),Xl}async function Kw(t,e,r){try{await Oe(),await ia({chatId:t?.chatId,messageId:t?.sourceMessageId,swipeId:t?.sourceSwipeId||t?.effectiveSwipeId,isolationKey:e},Array.isArray(r)?r:[]),ef().info("slot \u5DF2\u955C\u50CF\u5230 SQL",{chatId:t?.chatId,messageId:t?.sourceMessageId,tableCount:r?.length||0})}catch(s){ef().warn("SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:s?.message||String(s)})}}function tf(t){return t==null?"":String(t).trim()}function Uw(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function sf(){try{let t=Uw(),e=t?.SillyTavern||null,r=e?.getContext?.()||null,s=Array.isArray(r?.chat)?r.chat:[],o=Array.isArray(e?.chat)?e.chat:[],n=s.length?s:o;return{topWindow:t,api:e,context:r,chat:n,contextChat:s,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}function Ww(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function jw(t=[],e=""){let r=tf(e);if(!Array.isArray(t)||!r)return-1;for(let s=t.length-1;s>=0;s-=1){let o=t[s];if(!Ww(o))continue;if([o?.sourceId,o?.message_id,o?.messageId,o?.id,o?.mes_id,o?.mid,o?.mesid,o?.chat_index,o?.index,s].map(a=>tf(a)).includes(r))return s}return-1}function Zl(t){let e=sf(),r=jw(e.chat,t?.sourceMessageId);return r<0?{runtime:e,messageIndex:r,message:null}:{runtime:e,messageIndex:r,message:e.chat[r]||null}}function ec(t,e,r){let s=o=>{!Array.isArray(o)||e<0||e>=o.length||(o[e]={...o[e]||{},...r})};s(t?.contextChat),s(t?.apiChat)}async function tc(t){let e=t?.context||null,r=t?.api||null,s=e?.saveChatDebounced||r?.saveChatDebounced||null,o=e?.saveChat||r?.saveChat||null;typeof s=="function"&&s.call(e||r),typeof o=="function"&&await o.call(e||r)}function rc(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function po(t){return!t||typeof t!="object"||Array.isArray(t)?!1:"lastResolvedTarget"in t||"lastCommittedTarget"in t}function Pa(t,e,r,s){if(!t)return null;let o=t[e];if(!o)return null;let n=Se(r);return typeof s=="function"&&s(o)?n===It?o:null:o[n]||null}function Ql(t,e,r,s,o){if(!t)return;let n=Se(r),a=t[e];if(typeof o=="function"&&o(a)){let i={[It]:a};i[n]=s,t[e]=i}else a&&typeof a=="object"&&!Array.isArray(a)?t[e]={...a,[n]:s}:t[e]={[n]:s}}function rf(t,e,r,s){if(!t)return!1;let o=Se(r),n=t[e];if(!n)return!1;if(typeof s=="function"&&s(n))return o===It?(delete t[e],!0):!1;if(n&&typeof n=="object"&&!Array.isArray(n)){if(n[o]===void 0)return!1;let a={...n};return delete a[o],Object.keys(a).length===0?delete t[e]:t[e]=a,!0}return!1}function of(t,e={}){let{runtime:r,messageIndex:s}=Zl(t);return Qy({runtime:r,targetSnapshot:t,currentMessageIndex:s,templateTables:Array.isArray(e.templateTables)?e.templateTables:[],isolationKey:e.isolationKey===void 0?Ne.getKey():e.isolationKey})}async function nf(t,e={}){let{runtime:r,messageIndex:s,message:o}=Zl(t);if(!o||s<0)return{success:!1,error:"target_message_not_found"};let n=e.isolationKey===void 0?Ne.getKey():e.isolationKey,a=Pa(o,ys,n,po),i={...Vn(a),lastResolvedTarget:Js(t),updatedAt:Date.now()};return Ql(o,ys,n,i,po),ec(r,s,o),await tc(r),{success:!0,bindings:i}}async function Na(t,e,r={}){let s=r.skipFreshValidation===!0?t:await Vy(t,r),o=r.skipFreshValidation===!0?{valid:!0,reason:"skipped"}:Jy(t,s);if(!o.valid)return{success:!1,error:"target_changed_before_commit",validation:o};let n=s||t,{runtime:a,messageIndex:i,message:l}=Zl(n);if(!l||i<0)return{success:!1,error:"target_message_not_found",validation:o};let d=r.isolationKey===void 0?Ne.getKey():r.isolationKey,c=Wo(n),u={...c.meta||{},...e.meta||{},...r.locks?{locks:r.locks}:{},...r.previousSnapshot?{previousSnapshot:r.previousSnapshot}:{},isolationKey:d},p=fr({...c,...e,meta:u,slotBindingKey:n.slotBindingKey,slotRevisionKey:n.slotRevisionKey,sourceMessageId:n.sourceMessageId,sourceSwipeId:n.sourceSwipeId||n.effectiveSwipeId,updatedAt:Date.now()}),y=Pa(l,ys,d,po),f={...Vn(y),lastResolvedTarget:Js(n),lastCommittedTarget:Js(n),updatedAt:Date.now()};return Ql(l,Xs,d,p,rc),Ql(l,ys,d,f,po),ec(a,i,l),await tc(a),Kw(n,d,p?.tables||[]).catch(()=>{}),{success:!0,state:p,bindings:f,validation:o,messageIndex:i,sourceMessageId:n.sourceMessageId,slotRevisionKey:n.slotRevisionKey}}function Cs(t=null,e={}){let r=xt.getAssistantMessageSnapshot(t);if(!r?.message)return null;let s=e.isolationKey===void 0?Ne.getKey():e.isolationKey;return{...r,tableState:fr(Pa(r.message,Xs,s,rc)),tableBindings:Vn(Pa(r.message,ys,s,po))}}async function af(t,e={}){let r=sf();if(!Array.isArray(r.chat)||t<0||t>=r.chat.length)return{success:!1,error:"invalid_message_index",messageIndex:t};let s=r.chat[t];if(!s)return{success:!1,error:"message_not_found",messageIndex:t};let o=e.isolationKey===void 0?Ne.getKey():e.isolationKey,n=rf(s,Xs,o,rc),a=e.clearBindings===!1?!1:rf(s,ys,o,po);return(n||a)&&(ec(r,t,s),await tc(r)),{success:!0,cleared:n||a,messageIndex:t,isolationKey:o}}var Xl,pn=P(()=>{Ts();Qe();hs();Zy();Ra();Tl();G()});function cf(t){let e=new Set;if(!Array.isArray(t))return e;for(let r of t){let s=r?.order;Number.isFinite(s)&&e.add(Math.floor(s))}return e}function sc(t,e=5e4,r=1,s=99999){for(let o=e;o<=s;o++)if(!t.has(o))return t.add(o),o;for(let o=r;o<e;o++)if(!t.has(o))return t.add(o),o;return lf.warn("\u65E0\u53EF\u7528 order \u69FD\u4F4D"),t.add(e),e}function df(t,e,r=5e4,s=1,o=99999){let n=o-e+1;for(let a=r;a<=n;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}for(let a=s;a<r&&a<=n;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}lf.warn(`\u65E0\u6CD5\u5206\u914D ${e} \u4E2A\u8FDE\u7EED order \u69FD\u4F4D`);for(let a=0;a<e;a++)t.add(r+a);return r}var lf,uf=P(()=>{G();lf=C.createScope("TableWBOrder")});function oc(t,e="before_character_definition"){let r=String(t||"").trim().toLowerCase();return r==="at_depth_as_system"||r==="system"?"at_depth_as_system":r==="before_char"||r==="before_character"||r==="before_character_definition"||r==="0"?"before_character_definition":r==="after_char"||r==="after_character"||r==="after_character_definition"||r==="1"?"after_character_definition":e}function yn(t,e){if(!e)return t;let r={...t,position:e.position};return e.position==="at_depth_as_system"?r.depth=e.depth:delete r.depth,r}var wA,vA,pf=P(()=>{wA=Object.freeze(["at_depth_as_system","before_character_definition","after_character_definition"]);vA=Object.freeze({position:"before_character_definition",depth:2,order:5e4})});function nc(t,e=""){return t==null?e:String(t).trim()||e}function Yw(t){return nc(t,"default_chat").replace(/[\[\]=]/g,"_")}function Gw(){let t=globalThis.window||globalThis;return nc(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function qw(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return Rr()?.TavernHelper||null}function Vw(t){return String(t??"").replace(/\|/g,"\uFF5C").replace(/\n/g," ")}function yf(t){let e=Array.isArray(t.columns)?t.columns:[],r=Array.isArray(t.rows)?t.rows:[];if(r.length===0)return"";let s=e.map(l=>l.key),o=e.map(l=>l.title||l.key),n=`| ${o.join(" | ")} |`,a=`| ${o.map(()=>"---").join(" | ")} |`,i=r.map(l=>{let d=l.cells||{};return`| ${s.map(c=>Vw(d[c])).join(" | ")} |`});return`# ${t.name||"\u672A\u547D\u540D\u8868"}

${n}
${a}
${i.join(`
`)}`}function Jw(t,e){return!Array.isArray(t)||t.length===0?e||[]:!Array.isArray(e)||e.length===0?t:e.map((r,s)=>{let o=t[s];return o?{...r,name:r.name||o.name||"",columns:Array.isArray(r.columns)&&r.columns.length>0?r.columns:Array.isArray(o.columns)?o.columns:[],rows:Array.isArray(o.rows)?o.rows:Array.isArray(r.rows)?r.rows:[],enabled:o.enabled!==void 0?o.enabled:r.enabled,exportConfig:r.exportConfig||o.exportConfig||{enabled:!1}}:r})}function Da(t){return`${gf}${Fw}${Yw(t)}${Hw}-`}function Xw(t){return`${gf}[${nc(t,"default_chat")}]-`}function mf(t,e){if(!t||typeof t!="string")return!1;let r=Da(e);if(t.startsWith(r))return!0;let s=Xw(e);return!!t.startsWith(s)}function Qw(t,e){let r=Da(t),s=String(e||"").trim();return s?`${r}${s}`:`${r}\u586B\u8868\u6570\u636E`}function ff(t,e,r){return`${Da(t)}Wrapper-${r}`}function Zw(t,e){return t?t.content!==e.content||t.enabled!==e.enabled||t.type!==e.type||t.position!==e.position||t.prevent_recursion!==e.prevent_recursion||t.order!==e.order:!0}async function fn(t,e,r,s,o,n,a){let i=r.find(l=>l.comment===s);return i&&a&&!mf(i.comment,a)?(yo.warn(`upsert \u8DF3\u8FC7\uFF1A\u73B0\u6709\u6761\u76EE comment "${s}" \u4E0D\u5C5E\u4E8E\u5F53\u524D chat`,{chatId:a}),{action:"skipped",comment:s,reason:"cross_chat_collision"}):i&&i.uid?Zw(i,o)?(await Promise.resolve(t.setLorebookEntries(e,[{uid:i.uid,...o}])),yo.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u66F4\u65B0\uFF1A${s}`),{action:"updated",comment:s}):(n.add(i.order||0),{action:"skipped",comment:s}):typeof t.createLorebookEntries=="function"?(await Promise.resolve(t.createLorebookEntries(e,[{comment:s,keys:[],...o}])),yo.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u521B\u5EFA\uFF1A${s}`),{action:"created",comment:s}):{action:"failed",comment:s,error:"createLorebookEntries \u4E0D\u53EF\u7528"}}async function hf(t,e){let r=e?.worldbookSync;if(!r?.enabled)return{skipped:!0,reason:"disabled"};let s=String(r.targetBook||"").trim();if(!s)return{skipped:!0,reason:"no_target_book"};let o=qw();if(!o)return{success:!1,error:"TavernHelper \u4E0D\u53EF\u7528"};if(typeof o.getLorebookEntries!="function")return{success:!1,error:"getLorebookEntries \u4E0D\u53EF\u7528"};if(typeof o.setLorebookEntries!="function"&&typeof o.createLorebookEntries!="function")return{success:!1,error:"\u4E16\u754C\u4E66\u5199\u5165 API \u4E0D\u53EF\u7528"};let n=Gw(),a=Da(n),i=Array.isArray(e?.tables)?e.tables:[],d=Jw(t,i).filter(p=>p&&p.enabled!==!1&&Array.isArray(p.rows)&&p.rows.length>0);if(d.length===0)return{skipped:!0,reason:"empty_tables"};let c=e?.wrapperConfig||{},u=c.enabled!==!1;try{let p=await Promise.resolve(o.getLorebookEntries(s));Array.isArray(p)||(p=[]);let y=cf(p),f=[],g=d.filter(S=>S.exportConfig?.enabled===!0),b=d.filter(S=>S.exportConfig?.enabled!==!0),v="";if(b.length>0&&(v=b.map(S=>yf(S)).join(`

`)),u&&(v||g.length>0)){let S=c.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",_=c.wrapperHint||"",F=c.wrapperPlacement||{},W=F.order||5e4,D=df(y,3,W,1,99999),A=oc(F.position,"before_character_definition"),J=Number.isFinite(F.depth)?F.depth:2,K=`<${S}>
${_}`;f.push(await fn(o,s,p,ff(n,S,"Start"),yn({content:K,enabled:!0,type:"constant",order:D,prevent_recursion:!0},{position:A,depth:J}),y,n)),v&&f.push(await fn(o,s,p,`${a}\u5168\u5C40\u6570\u636E`,yn({content:v,enabled:!0,type:"constant",order:D+1,prevent_recursion:!0},{position:A,depth:J}),y,n)),f.push(await fn(o,s,p,ff(n,S,"End"),yn({content:`</${S}>`,enabled:!0,type:"constant",order:D+2,prevent_recursion:!0},{position:A,depth:J}),y,n))}else if(v){let S=sc(y,5e4,1,99999);f.push(await fn(o,s,p,`${a}\u5168\u5C40\u6570\u636E`,{content:v,enabled:!0,type:"constant",position:"before_character_definition",order:S,prevent_recursion:!0},y,n))}for(let S of g){let _=S.exportConfig||{},F=_.entryName||S.name||"\u672A\u547D\u540D\u8868",W=Qw(n,F),D=yf(S);if(!D)continue;let A=_.entryPlacement||{},J=oc(A.position,"before_character_definition"),K=sc(y,A.order||5e4,1,99999),Q=_.entryType==="keyword"?"keyword":"constant";f.push(await fn(o,s,p,W,yn({content:D,enabled:!0,type:Q,order:K,prevent_recursion:_.preventRecursion!==!1},{position:J,depth:A.depth||2}),y,n))}let T=new Set(f.map(S=>S.comment).filter(Boolean)),w=p.filter(S=>!S.comment||!mf(S.comment,n)?!1:!T.has(S.comment));if(w.length>0){let S=w.map(_=>_.uid).filter(Boolean);S.length>0&&typeof o.deleteLorebookEntries=="function"&&(await Promise.resolve(o.deleteLorebookEntries(s,S)),yo.info(`\u5DF2\u6E05\u7406 ${S.length} \u4E2A\u65E7\u4E16\u754C\u4E66\u6761\u76EE [${n}]`))}let B=f.filter(S=>S.action==="created").length,R=f.filter(S=>S.action==="updated").length;return yo.info(`\u4E16\u754C\u4E66\u540C\u6B65\u5B8C\u6210 [${n}]\uFF1A${B} \u521B\u5EFA, ${R} \u66F4\u65B0, ${w.length} \u6E05\u7406`),{success:!0,results:f,stats:{created:B,updated:R,cleaned:w.length},targetBook:s,chatId:n}}catch(p){return yo.warn("\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25:",p),{success:!1,error:p?.message||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25"}}}var yo,gf,Fw,Hw,bf=P(()=>{as();G();uf();pf();yo=C.createScope("TableWorldbookSync"),gf="YYT-",Fw="[YY:chatId=",Hw="]"});function La(t,e=""){return t==null?e:String(t).trim()||e}function tv(t={}){return{tables:Array.isArray(t?.tables)?ie(t.tables):[]}}function rv(t={},e={}){let r=La(e.mirrorTag,"yyt-table-workbench"),s=tv(t);return[`<${r}>`,"[\u586B\u8868\u5DE5\u4F5C\u53F0]","```json",JSON.stringify(s,null,2),"```",`</${r}>`].join(`
`)}async function xf({targetSnapshot:t,nextTables:e,config:r,loadResult:s=null,diff:o=null,fillMode:n="",skipNotify:a=!1}={}){let i=Mt(r),l=await Na(t,{tables:Array.isArray(e)?ie(e):[],meta:{lastLoadMode:La(s?.loadMode,""),lastFillMode:La(n),mergeBaseOnly:!1,updatedBy:La(t?.runSource,"MANUAL_TABLE")}});if(!l?.success)return{success:!1,error:l?.error||"table_state_commit_failed",commitResult:l,mirrorResult:null,warning:""};let d=null,c=null,u="";if(i.mirrorToMessage){let p=rv(l.state,{mirrorTag:i.mirrorTag});d=await xt.injectDetailed(ev,p,{overwrite:!0,extractionSelectors:[i.mirrorTag],sourceMessageId:l.sourceMessageId,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId,effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId,slotBindingKey:t?.slotBindingKey,slotRevisionKey:t?.slotRevisionKey,slotTransactionId:t?.slotTransactionId,traceId:t?.traceId,skipNotify:a}),d?.success||(u=d?.error||"\u6B63\u6587\u955C\u50CF\u5199\u56DE\u5931\u8D25")}return i.worldbookSync?.enabled&&(c=await hf(Array.isArray(e)?e:[],i),c&&!c.success&&!c.skipped&&(u=u?`${u}; ${c.error}`:c.error||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25")),{success:!0,state:l.state,bindings:l.bindings,diff:o,fillMode:n,commitResult:l,mirrorResult:d,worldbookSyncResult:c,warning:u}}var ev,wf=P(()=>{Ts();Qe();pn();Dr();bf();ev="tableWorkbenchMirror"});function sv(t){return typeof t!="string"||!t?t:t.replace(/[“”「」『』＂]/g,'"')}function ac(t,e){for(let r=e;r<t.length;r++)if(!/\s/.test(t[r]))return{char:t[r],index:r};return{char:"",index:-1}}function Sf(t){return!!t&&(t==='"'||t==="{"||t==="["||t==="-"||/\d/.test(t)||t==="t"||t==="f"||t==="n")}function ov(t,e,r,s){let o=ac(t,e+1),n=o.char;if(!n)return r!=="key";if(r==="key")return n===":";if(n==="}"||n==="]")return!0;if(n!==",")return!1;let a=ac(t,o.index+1).char;return a?s==="object"?a==='"'||a==="}":s==="array"?a==="]"||Sf(a):Sf(a)||a==="}"||a==="]":!0}function nv(t){if(typeof t!="string")return{success:!1,result:t,error:"not a string"};let e="",r=!1,s=!1,o=null,n=[],a=()=>n.length?n[n.length-1]:null,i=()=>{let l=a();l&&(l.expecting="commaOrEnd")};for(let l=0;l<t.length;l++){let d=t[l];if(s){e+=d,s=!1;continue}if(r){if(d==="\\"){e+=d,s=!0;continue}if(d==='"'){let c=a();ov(t,l,o,c?.type||null)?(e+=d,r=!1,o==="key"&&c?.type==="object"?c.expecting="colon":i(),o=null):e+='\\"';continue}e+=d;continue}if(d==='"'){e+=d,r=!0;let c=a();o=c&&c.type==="object"&&(c.expecting==="key"||c.expecting==="keyOrEnd")?"key":"value";continue}if(d==="{"){e+=d,n.push({type:"object",expecting:"keyOrEnd"});continue}if(d==="["){e+=d,n.push({type:"array",expecting:"valueOrEnd"});continue}if(d===":"){e+=d;let c=a();c?.type==="object"&&(c.expecting="value");continue}if(d===","){e+=d;let c=a();c?.type==="object"&&(c.expecting="key"),c?.type==="array"&&(c.expecting="value");continue}if(d==="}"||d==="]"){e+=d,n.pop(),i();continue}e+=d}return{success:!0,result:e,error:null}}function av(t){if(typeof t!="string"||!t)return t;let e="",r=!1,s=!1;for(let o=0;o<t.length;o++){let n=t[o];if(s){e+=n,s=!1;continue}if(n==="\\"){e+=n,r&&(s=!0);continue}if(n==='"'){e+=n,r=!r;continue}if(r){if(n===`
`){e+="\\n";continue}if(n==="\r"){e+="\\r";continue}if(n==="	"){e+="\\t";continue}if(n==="\0"){e+="\\u0000";continue}}e+=n}return e}function iv(t){if(typeof t!="string"||!t)return t;let e="",r=!1,s=!1;for(let o=0;o<t.length;o++){let n=t[o];if(s){e+=n,s=!1;continue}if(n==="\\"){e+=n,r&&(s=!0);continue}if(n==='"'){e+=n,r=!r;continue}if(!r&&n===","){let a=ac(t,o+1).char;if(a==="}"||a==="]")continue}e+=n}return e}function lv(t){return typeof t!="string"||!t?t:t.replace(/([{,]\s*)(-?\d+)(\s*:)/g,'$1"$2"$3')}function gn(t){if(typeof t!="string")return{success:!1,result:t,layersApplied:[],error:"Input is not a string"};let e=[],r=t,s=sv(r);s!==r&&e.push("normalizeQuotes"),r=s;let o=nv(r);if(!o.success)return{success:!1,result:r,layersApplied:e,error:o.error};o.result!==r&&e.push("escapeUnescapedQuotes"),r=o.result;let n=av(r);n!==r&&e.push("sanitizeControlChars"),r=n;let a=iv(r);a!==r&&e.push("removeTrailingCommas"),r=a;let i=lv(r);return i!==r&&e.push("fixNumericKeys"),r=i,{success:!0,result:r,layersApplied:e,error:null}}function cv(t,e=","){if(typeof t!="string"||!t)return[];let r=[],s="",o=!1,n=!1,a=0,i=0,l=0;for(let d=0;d<t.length;d++){let c=t[d];if(n){s+=c,n=!1;continue}if(c==="\\"){s+=c,o&&(n=!0);continue}if(c==='"'){s+=c,o=!o;continue}if(!o){if(c==="{")a++;else if(c==="}")a=Math.max(0,a-1);else if(c==="[")i++;else if(c==="]")i=Math.max(0,i-1);else if(c==="(")l++;else if(c===")")l=Math.max(0,l-1);else if(c===e&&a===0&&i===0&&l===0){s.trim()&&r.push(s.trim()),s="";continue}}s+=c}return s.trim()&&r.push(s.trim()),r}function dv(t,e=":"){if(typeof t!="string"||!t)return-1;let r=!1,s=!1,o=0,n=0,a=0;for(let i=0;i<t.length;i++){let l=t[i];if(s){s=!1;continue}if(l==="\\"){r&&(s=!0);continue}if(l==='"'){r=!r;continue}if(!r){if(l==="{")o++;else if(l==="}")o=Math.max(0,o-1);else if(l==="[")n++;else if(l==="]")n=Math.max(0,n-1);else if(l==="(")a++;else if(l===")")a=Math.max(0,a-1);else if(l===e&&o===0&&n===0&&a===0)return i}}return-1}function ic(t){if(typeof t!="string")return{success:!0,value:t,error:null};let e=t.trim();if(!e)return{success:!1,value:null,error:"Empty value"};let s=`[${e.startsWith("'")&&e.endsWith("'")?`"${e.slice(1,-1).replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}"`:e}]`;try{return{success:!0,value:JSON.parse(s)[0],error:null}}catch(o){let n=gn(s);if(n.success)try{return{success:!0,value:JSON.parse(n.result)[0],error:null}}catch{}return{success:!1,value:null,error:o?.message||"Failed to parse loose value"}}}function uv(t){let e=typeof t=="string"?t.trim():"";if(!e)return null;if(/^-?\d+$/.test(e))return e;let r=ic(e);return r.success&&(typeof r.value=="string"||typeof r.value=="number")?String(r.value):e.replace(/^["']|["']$/g,"")}function _f(t){if(typeof t!="string")return{success:!1,result:null,recoveredKeys:[],error:"not a string"};let e=t.trim();if(!e.startsWith("{")||!e.endsWith("}"))return{success:!1,result:null,recoveredKeys:[],error:"not an object literal"};let r=e.slice(1,-1).trim();if(!r)return{success:!0,result:{},recoveredKeys:[],error:null};let s=cv(r,",").filter(Boolean);if(!s.length)return{success:!1,result:null,recoveredKeys:[],error:"no segments"};let o={},n=0;for(let i of s){let l=dv(i,":");if(l!==-1){let c=uv(i.slice(0,l)),u=ic(i.slice(l+1));if(!c||!u.success)return{success:!1,result:null,recoveredKeys:Object.keys(o),error:`Failed segment: ${i}`};o[c]=u.value;let p=parseInt(c,10);!isNaN(p)&&String(p)===c&&(n=Math.max(n,p+1));continue}let d=ic(i);if(!d.success)return{success:!1,result:null,recoveredKeys:Object.keys(o),error:`Failed value: ${i}`};for(;Object.prototype.hasOwnProperty.call(o,String(n));)n++;o[String(n)]=d.value,n++}let a=Object.keys(o).sort((i,l)=>parseInt(i,10)-parseInt(l,10));return a.length?{success:!0,result:o,recoveredKeys:a,error:null}:{success:!1,result:null,recoveredKeys:[],error:"no keys recovered"}}function pv(t){if(typeof t!="string")return"";let e=t.trim();return e=e.replace(/'\s*\+\s*'/g,""),e.startsWith("'")&&e.endsWith("'")&&(e=e.slice(1,-1)),e=e.replace(/\\n/g,`
`),e=e.replace(/\\\\"/g,'\\"'),e=e.replace(/：/g,":"),e}function yv(t){let e=pv(t);if(!e)return[];let r=[];vf.lastIndex=0;let s;for(;(s=vf.exec(e))!==null;){let i=s[1];i&&i.trim()&&r.push(i)}if(r.length)return r;let o=i=>/(insertRow|updateRow|deleteRow)\s*\(/.test(i),n=/<!--([\s\S]*?)-->/g,a=[];for(;(s=n.exec(e))!==null;)o(s[1])&&a.push(s[1]);return a}function fv(t){let e=t.split(/\r?\n/),r=[],s="",o=!1;for(let a of e){let i=a.trim();if(!i||(!o&&i.includes("//")&&!i.includes('"//')&&!i.includes("'//")&&(i=i.split("//")[0].trim()),!i))continue;if(/^(insertRow|updateRow|deleteRow)\s*\(/.test(i)&&!o?(s&&r.push(s),s=i):s+=(s?" ":"")+i,s){let d=(s.match(/\{/g)||[]).length,c=(s.match(/\}/g)||[]).length;o=d>c}}s&&r.push(s);let n=[];for(let a of r){let i=/(?:^|;\s*)((?:insertRow|deleteRow|updateRow)\s*\()/g,l=[],d;for(;(d=i.exec(a))!==null;)l.push(d.index+(d[0].length-d[1].length));if(l.length<=1)n.push(a.replace(/;\s*$/,""));else for(let c=0;c<l.length;c++){let u=l[c],p=c+1<l.length?l[c+1]:a.length,y=a.substring(u,p).replace(/;\s*$/,"").trim();y&&n.push(y)}}return n}function gv(t){try{let e=t;if(e.match(/\)\s*;?\s*\/\/.*$/)&&(e=e.replace(/\/\/.*$/,"").trim()),!e)return null;let r=e.match(/^(insertRow|deleteRow|updateRow)\s*\((.*)\);?$/);if(!r)return null;let s=r[1],o=r[2],n=o.indexOf("{");if(n===-1)return{command:s,args:JSON.parse(`[${o}]`),line:e};let a=o.substring(0,n).trim(),i=o.substring(n),l=JSON.parse(`[${a.replace(/,$/,"")}]`);try{return{command:s,args:[...l,JSON.parse(i)],line:e}}catch{}let d=_f(i);if(d.success)return{command:s,args:[...l,d.result],line:e};let c=gn(i);if(!c.success)return null;try{return{command:s,args:[...l,JSON.parse(c.result)],line:e}}catch{}let u=_f(c.result);return u.success?{command:s,args:[...l,u.result],line:e}:null}catch{return null}}function mv(t){if(!t)return null;let{command:e,args:r}=t;if(e==="insertRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="object"&&r[1]!==null?r[1]:{};return{op:e,tableIndex:s,data:o}}if(e==="deleteRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="number"?r[1]:0;return{op:e,tableIndex:s,rowIndex:o}}if(e==="updateRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="number"?r[1]:0,n=typeof r[2]=="object"&&r[2]!==null?r[2]:{};return{op:e,tableIndex:s,rowIndex:o,data:n}}return null}function hv(t){let e=yv(t);if(!e.length)return null;let r=[];for(let s of e){let o=s.replace(/<!--|-->/g,"").trim();if(!o)continue;let n=fv(o);for(let a of n){let i=gv(a),l=mv(i);l&&r.push(l)}}return r.length?r:null}function bv(t){Tf.lastIndex=0;let e;for(;(e=Tf.exec(t))!==null;){let f=e[1].trim();if(f)try{return JSON.parse(f)}catch{let b=gn(f);if(b.success)try{return JSON.parse(b.result)}catch{}}}let r=t.trim();try{return JSON.parse(r)}catch{}let s=gn(r);if(s.success)try{return JSON.parse(s.result)}catch{}let o=r.indexOf("{"),n=r.indexOf("["),a=-1,i="",l="";if(o!==-1&&(n===-1||o<n)?(a=o,i="{",l="}"):n!==-1&&(a=n,i="[",l="]"),a===-1)return null;let d=0,c=-1,u=!1,p=!1;for(let f=a;f<r.length;f++){let g=r[f];if(p){p=!1;continue}if(g==="\\"&&u){p=!0;continue}if(g==='"'){u=!u;continue}if(!u){if(g===i)d++;else if(g===l&&(d--,d===0)){c=f;break}}}if(c===-1)return null;let y=r.substring(a,c+1);try{return JSON.parse(y)}catch{let g=gn(y);if(g.success)try{return JSON.parse(g.result)}catch{}}return null}function Ef(t){if(!t||typeof t!="string")return{mode:"empty",edits:null,tables:null};let e=hv(t);if(e)return{mode:"incremental",edits:e,tables:null};let r=bv(t);if(r){let s=null;if(Array.isArray(r))s=r;else if(r&&Array.isArray(r.tables))s=r.tables;else if(r&&typeof r=="object"){for(let o of Object.values(r))if(Array.isArray(o)){s=o;break}}if(Array.isArray(s))return{mode:"full",edits:null,tables:s}}return{mode:"empty",edits:null,tables:null}}var vf,Tf,Af=P(()=>{vf=/<tableEdit>([\s\S]*?)<\/tableEdit>/gi,Tf=/```(?:json)?\s*([\s\S]*?)```/gi});function xv(t,e){let r=new Map;Array.isArray(t)&&t.forEach((n,a)=>{n&&typeof n=="object"&&r.set(n.name||`__row_${a}`,n)});let s=new Map;Array.isArray(e)&&e.forEach((n,a)=>{n&&typeof n=="object"&&s.set(n.name||`__row_${a}`,n)});let o={};for(let[n,a]of s){let i=r.get(n);if(i){o[n]={};let l=new Set([...Object.keys(i.cells||{}),...Object.keys(a.cells||{})]);for(let d of l){let c=String((i.cells&&i.cells[d])??""),u=String((a.cells&&a.cells[d])??"");o[n][d]=c===u?"unchanged":"updated"}o[n].__rowStatus="kept"}else{if(o[n]={},a.cells&&typeof a.cells=="object")for(let l of Object.keys(a.cells))o[n][l]="new";o[n].__rowStatus="new"}}for(let[n]of r)s.has(n)||(o[n]={__rowStatus:"deleted"});return o}function Cf(t,e){let r=Array.isArray(t)?ie(t):[],s=Array.isArray(e)?ie(e):[],o={},n=Math.max(r.length,s.length);for(let a=0;a<n;a++){let i=r[a],l=s[a];!i&&l?(o[a]={},Array.isArray(l.rows)&&l.rows.forEach(d=>{let c=d.name||`__row_${l.rows.indexOf(d)}`;o[a][c]={__rowStatus:"new"}})):i&&!l?(o[a]={},Array.isArray(i.rows)&&i.rows.forEach(d=>{let c=d.name||`__row_${i.rows.indexOf(d)}`;o[a][c]={__rowStatus:"deleted"}})):i&&l&&(o[a]=xv(i.rows,l.rows))}return o}var kf=P(()=>{Qe()});function wv(){return{mode:"native",async buildRequest(t={},e={}){if(typeof t.buildRequest!="function")throw new Error("table_provider_missing_build_request");return t.buildRequest(e)},async sendRequest(t={},e=null,r={}){if(typeof t.sendRequest!="function")throw new Error("table_provider_missing_send_request");return t.sendRequest(e?.messages||[],r.config||{},r.abortSignal||null)},parseResponse(t={},e=""){if(typeof t.parseResponse!="function")throw new Error("table_provider_missing_parse_response");return t.parseResponse(e)}}}function If(){return wv()}var Mf=P(()=>{});function fo(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function _v(){let t=Sv.get(Tv,{});return fo(t)?t:{}}function Ev(t){let e=_v();return fo(e[t])?e[t]:{}}function Av(t){let e=ep();return fo(t)&&(Array.isArray(t.rows)&&(e.rows=Array.from(new Set(t.rows.filter(r=>Number.isFinite(r)).map(r=>Math.floor(r)))),e.rows.sort((r,s)=>r-s)),Array.isArray(t.cols)&&(e.cols=Array.from(new Set(t.cols.filter(r=>typeof r=="string"&&r.length>0)))),Array.isArray(t.cells)&&(e.cells=Array.from(new Set(t.cells.filter(r=>typeof r=="string"&&r.includes(":"))))),e.indexColumn=t.indexColumn===!0),e}function Cv(t){if(typeof t=="string")return t;if(fo(t)){if(typeof t.scopeKey=="string"&&t.scopeKey.includes("::"))return t.scopeKey;if(t.chatId!==void 0){let e=t.isolationKey!==void 0?t.isolationKey:Ne.getKey();return jo(t.chatId,e)}}return jo("",Ne.getKey())}function kv(t,e){let r=Ev(t),s={};if(!Array.isArray(e))return s;for(let o=0;o<e.length;o++){let n=e[o];if(!n)continue;let a=n.uid||n.id||"";a&&r[a]&&(s[o]=Av(r[a]))}return s}function Rf(t,e=[]){let r=Cv(t);return kv(r,e)}function Pf(t,e,r,s){if(!fo(t))return!1;let o=t[e];if(!o)return!1;if(Number.isFinite(r)&&o.rows.includes(r)||typeof s=="string"&&s.length>0&&o.cols.includes(s))return!0;if(Number.isFinite(r)&&typeof s=="string"&&s.length>0){let n=`${r}:${s}`;if(o.cells.includes(n))return!0}return!1}function lc(t,e,r){if(!fo(t))return!1;let s=t[e];return s?Number.isFinite(r)&&s.rows.includes(r):!1}var vv,Tv,Sv,Nf=P(()=>{$e();G();Qe();hs();vv="tableLocks",Tv="scopes",Sv=N.namespace(vv)});function qe(){return C.createScope("TableUpdate")}function Mv(t,e){return new Promise(r=>{if(e?.aborted){r(!1);return}let s,o=()=>{clearTimeout(s);try{e?.removeEventListener?.("abort",o)}catch{}r(!1)};s=setTimeout(()=>{try{e?.removeEventListener?.("abort",o)}catch{}r(!0)},t);try{e?.addEventListener?.("abort",o)}catch{}})}function Y(t,e=""){return t==null?e:String(t).trim()||e}function Df(t=[],e=8,r="all"){if(!Array.isArray(t)||t.length===0)return"";let s=r==="assistant_only"?t.filter(o=>o?.role==="assistant"):t;return s.slice(Math.max(s.length-e,0)).map(o=>`[${Y(o?.role,"unknown")}] ${String(o?.content||"").trim()}`).filter(Boolean).join(`

`)}function Lf(t,{extractTags:e=[],useGlobalRules:r=!1}={}){if(!t)return t;let s=Array.isArray(e)&&e.length>0;if(!s&&!r)return t;try{let o=[],n=[];if(s&&(o=e.map(a=>{let i=String(a||"").trim();return i.startsWith("regex:")?{type:"regex_include",value:i.slice(6).trim(),enabled:!0}:{type:"include",value:i,enabled:!0}}).filter(a=>a.value)),r){let a=Bs()||[];o=[...o,...a.filter(i=>i?.enabled)],n=zs()||[]}return o.length===0&&n.length===0?t:cr(t,o,n)||t}catch(o){return qe().warn("applyContextExtractionRules \u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",o),t}}function Rv(t=[],e=-1){return!Number.isFinite(e)||e<0?t:t.map(r=>{let s=Array.isArray(r?.rows)?r.rows:[];return e===0||s.length<=e?r:{...r,rows:s.slice(s.length-e)}})}function Pv(t=[]){return!Array.isArray(t)||t.length===0?"":t.map((e,r)=>{let s=e?.aiInstructions&&typeof e.aiInstructions=="object"?e.aiInstructions:{},o=Array.isArray(e?.columns)?e.columns:[],n=[`\u8868 ${r}: ${Y(e?.name,`\u8868${r+1}`)}`,`\u8868\u683C\u8BF4\u660E: ${Y(e?.note,"\u65E0")}`,`\u521D\u59CB\u5316\u8BF4\u660E: ${Y(s.init,"\u65E0")}`,`\u65B0\u589E\u8BF4\u660E: ${Y(s.create,"\u65E0")}`,`\u66F4\u65B0\u8BF4\u660E: ${Y(s.update,"\u65E0")}`,`\u5220\u9664\u8BF4\u660E: ${Y(s.delete,"\u65E0")}`,"\u5B57\u6BB5:"];return o.forEach(a=>{n.push(`- ${Y(a?.title||a?.key,"\u672A\u547D\u540D\u5B57\u6BB5")} (${Y(a?.key,"")}): ${Y(a?.description,"\u65E0")}`)}),n.join(`
`)}).join(`

`)}function Nv(t,e=[]){if(!t||!Array.isArray(e)||e.length===0)return"";let r=e.map((o,n)=>{let a=Y(o?.name,`\u8868${n+1}`),i=t.includes(o,n);return`\u8868 ${n}: ${a} - ${i?"\u5141\u8BB8\u7F16\u8F91":"\u53EA\u8BFB\uFF0C\u7981\u6B62\u4FEE\u6539"}`});return e.some((o,n)=>!t.includes(o,n))&&(r.push(""),r.push('\u3010\u91CD\u8981\u7EA6\u675F\u3011\u6807\u8BB0\u4E3A"\u53EA\u8BFB"\u7684\u8868\u683C\uFF0C\u4F60\u5FC5\u987B\u5728\u8F93\u51FA\u4E2D\u539F\u6837\u4FDD\u7559\u5176\u6240\u6709\u884C\u6570\u636E\uFF0C\u4E0D\u5F97\u65B0\u589E\u3001\u4FEE\u6539\u6216\u5220\u9664\u4EFB\u4F55\u884C\u3002'),r.push("\u5168\u91CF\u8F93\u51FA\u65F6\uFF0C\u53EA\u8BFB\u8868\u683C\u7684 rows \u5FC5\u987B\u4E0E\u8F93\u5165\u4E2D\u7684\u5B8C\u5168\u4E00\u81F4\u3002")),r.join(`
`)}function Of(t={},e=0,r=[]){let s=t&&typeof t=="object"?t:{},o=s.cells&&typeof s.cells=="object"&&!Array.isArray(s.cells)?s.cells:{},n={},a=Array.isArray(r)?r.map(l=>Y(l?.key,"")).filter(Boolean):[];return new Set([...Object.keys(o),...a]).forEach(l=>{n[l]=Y(o[l],"")}),{...s,id:Uo(s.id||s.rowId,e),name:Y(s.name,""),cells:n}}function Is(t={},e=0){let r=t&&typeof t=="object"?t:{},s=Array.isArray(r.columns)?ie(r.columns):[],o=Array.isArray(r.rows)?r.rows.map((n,a)=>Of(n,a,s)):[];return{...r,id:Wt(r.id||r.key,e),rows:o}}function rr(t=[]){return Array.isArray(t)?t.map((e,r)=>Is(e,r)):[]}function Dv(t=[],e=[],r){let s=rr(t),o=rr(e);if(!r)return o;let n=new Map(o.map((u,p)=>[Wt(u?.id||u?.key,p),u])),a=s.map((u,p)=>({table:u,tableIndex:p,id:Wt(u?.id||u?.key,p)})).filter(({table:u,tableIndex:p})=>r.includes(u,p)),i=new Set,l=new Map;for(let u=0;u<o.length;u++){let p=o[u],y=Wt(p?.id||p?.key,u);n.has(y)&&(l.set(y,p),i.add(y))}let d=0,c=o.filter((u,p)=>{let y=Wt(u?.id||u?.key,p);return!i.has(y)});return s.map((u,p)=>{let y=Wt(u?.id||u?.key,p);if(!r.includes(u,p))return Is(u,p);let f=l.get(y);if(f)return Is(f,p);let g=c[d];return g?(d++,Is({...g,id:u.id||g.id},p)):Is(u,p)})}function Lv(t=[],e=[],r,s={}){if(!Array.isArray(t)||!r)return{edits:[],stats:{total:0,passed:0,droppedByScope:0,droppedByLock:0}};let o=rr(e),n=[],a=0,i=0;for(let l of t){let d=Number.isFinite(l?.tableIndex)?l.tableIndex:-1;if(d<0||d>=o.length){a++;continue}let c=o[d];if(!r.includes(c,d)){a++;continue}if(l.op===Qs.INSERT_ROW){n.push(l);continue}let u=Number.isFinite(l?.rowIndex)?l.rowIndex:-1;if(u<0||u>=(Array.isArray(c?.rows)?c.rows.length:0)){a++;continue}if(l.op===Qs.DELETE_ROW){if(lc(s,d,u)){i++;continue}n.push(l);continue}n.push(l)}return{edits:n,stats:{total:t.length,passed:n.length,droppedByScope:a,droppedByLock:i}}}function $v(t=[],e){let r=rr(t);return e?r.map((s,o)=>{let n=Array.isArray(s?.columns)?s.columns:[];return e.includes(s,o)?{...Is(s,o),scopeEditable:!0,scopeStatus:"editable"}:{...Is(s,o),scopeEditable:!1,scopeStatus:"readonly",rows:Array.isArray(s?.rows)?s.rows.map((a,i)=>Of(a,i,n)):[]}}):r}function Ov(t,e,r){return{target:{sourceMessageId:Y(t?.sourceMessageId),sourceSwipeId:Y(t?.sourceSwipeId||t?.effectiveSwipeId),slotBindingKey:Y(t?.slotBindingKey),slotRevisionKey:Y(t?.slotRevisionKey),slotTransactionId:Y(t?.slotTransactionId)},loadMode:Y(e?.loadMode),mergeBaseOnly:e?.mergeBaseOnly===!0,resolvedFromMessageId:Y(e?.resolvedFromMessageId),resolvedFromRevisionKey:Y(e?.resolvedFromRevisionKey),sourceKind:Y(e?.sourceKind||e?.state?.meta?.sourceKind),scope:typeof r?.toJSON=="function"?r.toJSON():null,tables:$v(e?.state?.tables,r)}}function $f(){return Bv}function zv(t,e,r,s=null){let o=rr(t||[]),n=r||{};for(let a of e){let i=a.tableIndex;if(i<0||i>=o.length)continue;let l=o[i];if(!l||!Array.isArray(l.rows)||s&&!s.includes(l,i))continue;if(a.op===Qs.INSERT_ROW){let c={id:Ko("row"),name:"",cells:{}};if(a.data&&typeof a.data=="object"){c.name=Y(a.data.name,"");let u=Array.isArray(l.columns)?l.columns:[];for(let p of u){let y=p.key;a.data[y]!==void 0&&(c.cells[y]=Y(a.data[y]))}for(let[p,y]of Object.entries(a.data))p!=="name"&&c.cells[p]===void 0&&(c.cells[p]=Y(y))}l.rows.push(c);continue}let d=a.rowIndex;if(!(d<0||d>=l.rows.length)){if(a.op===Qs.DELETE_ROW){if(lc(n,i,d))continue;l.rows.splice(d,1);continue}if(a.op===Qs.UPDATE_ROW){let c=l.rows[d];if(!c)continue;if(c.id=Uo(c.id||c.rowId,d),c.cells=c.cells||{},a.data&&typeof a.data=="object"){for(let[u,p]of Object.entries(a.data))u!=="name"&&(Pf(n,i,d,u)||(c.cells[u]=Y(p)));a.data.name!==void 0&&(c.name=Y(a.data.name,c.name))}}}}return rr(o)}async function Kv({executionContext:t,targetSnapshot:e,loadResult:r,config:s,assistantSnapshot:o,fillMode:n,runScope:a}={}){let i=Mt(s),l=n==="incremental"||!n&&i.fillMode!=="full",d=mp(i,{skipResponseContract:l}),c=Ov(e,r,a),u=Array.isArray(o?.tableState?.tables)?rr(o.tableState.tables):[],p=t?.chatHistory||t?.chatMessages||[],{contextDepth:y,contextRoles:f,contextExtractTags:g,contextUseGlobalRules:b,sendLatestRows:v}=i,T=Df(p,y,f),w=Df(p,y,"all"),B=Lf(T,{extractTags:g,useGlobalRules:b}),R=Lf(w,{extractTags:g,useGlobalRules:b}),S=await On({worldbooks:i.worldbooks}),_=Rv(c.tables,v),F={...c,tables:_},W={...t,toolName:"\u586B\u8868\u5DE5\u4F5C\u53F0",toolId:"tableWorkbench",lastAiMessage:t?.assistantBaseText||t?.lastAiMessage||"",recentMessagesText:B,rawRecentMessagesText:R,toolWorldbookContent:S,tableGuidance:Pv(i.tables),tableScopeGuidance:Nv(a,c.tables),injectedContext:o?.injectedContext||xt.getLatestMessageInjectedContext(e?.sourceMessageId),toolContentMacro:JSON.stringify(F,null,2),extractedContent:JSON.stringify(F,null,2),previousToolOutput:JSON.stringify(u,null,2)},D=await Ss.buildToolMessages(d,W),A=await Ss.buildPromptText(d,W);if(l&&(A+=$f(),Array.isArray(D)&&D.length>0)){let J=D[D.length-1];J&&typeof J.content=="string"&&(J.content+=$f())}if(!Array.isArray(D)||D.length===0)throw new Error("\u586B\u8868\u8BF7\u6C42\u6D88\u606F\u6784\u5EFA\u5931\u8D25\u3002");return{toolConfig:d,context:W,requestPayload:c,promptText:A,messages:D,fillMode:l?"incremental":"full",runScope:typeof a?.toJSON=="function"?a.toJSON():null}}async function Uv(t,e={},r=null){let s=Mt(e),o=Y(s.apiPreset,"");if(o){if(!vo(o))throw new Error(`API \u9884\u8BBE\u4E0D\u5B58\u5728: ${o}`);return Za(o,t,{},r)}return To(t,{},r)}function wr({status:t=_e.IDLE,targetSnapshot:e=null,skipReason:r="",startedAt:s=Date.now(),error:o=""}={}){return{lastAutoRunAt:s,lastAutoStatus:Y(t,_e.IDLE),lastAutoMessageId:Y(e?.sourceMessageId,""),lastAutoRevisionKey:Y(e?.slotRevisionKey,""),lastAutoSkipReason:Y(r,""),...o?{lastError:o,lastErrorDetails:[o]}:{}}}function tr(t={},e=Xe.MANUAL){let r=t&&typeof t=="object"?t:{};return Object.keys(r).length?gp(r):null}function ks({targetSnapshot:t=null,startedAt:e=Date.now(),status:r="idle",skipReason:s="",warning:o="",writeback:n=null,aborted:a=!1,stale:i=!1,abortReason:l="",error:d=""}={}){return{isAutoRun:!0,status:r,startedAt:e,targetSnapshot:t,sourceMessageId:Y(t?.sourceMessageId,""),sourceSwipeId:Y(t?.sourceSwipeId||t?.effectiveSwipeId,""),slotRevisionKey:Y(t?.slotRevisionKey,""),writebackStatus:n?.success===!0?"success":o?"warning":"",refreshConfirmed:n?.mirrorResult?.refreshConfirmed===!0,warning:Y(o,""),skipReason:Y(s,""),aborted:a===!0,stale:i===!0,abortReason:Y(l,""),error:Y(d,"")}}function Oa(t=null){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}async function mn(t=null,e={}){return zf({configInput:t,runSource:Xe.MANUAL,clearBeforeUpdate:e?.clearBeforeUpdate===!0,executionContextBuilder:()=>os({runSource:Xe.MANUAL}),targetResolver:r=>dn(r,{runSource:Xe.MANUAL})})}async function Bf({messageId:t,swipeId:e="",sourceEvent:r="AUTO_TABLE",configInput:s=null,signal:o=null,shouldAbortWriteback:n=null}={}){return zf({configInput:s,runSource:Xe.AUTO,autoMeta:{sourceEvent:r,messageId:Y(t,""),swipeId:Y(e,""),signal:o,shouldAbortWriteback:n},executionContextBuilder:()=>ns({messageId:t,swipeId:e,runSource:Xe.AUTO}),targetResolver:a=>dn(a,{runSource:Xe.AUTO})})}async function zf({configInput:t=null,runSource:e=Xe.MANUAL,executionContextBuilder:r,targetResolver:s,autoMeta:o=null,clearBeforeUpdate:n=!1}={}){let a=Mt(t||Ue()),i=nl(a),l=Zn({tables:Array.isArray(a.tables)?a.tables:[]}),d=e===Xe.AUTO,c=Date.now();if(qe().info(`\u5F00\u59CB\u586B\u8868 [${e}]`,{isAutoRun:d,fillMode:a.fillMode}),!i.valid||!l.valid){let f=[...i.errors,...l.errors];return qe().error("\u914D\u7F6E\u6821\u9A8C\u5931\u8D25",{errors:f}),tr({lastStatus:_e.ERROR,lastRunAt:c,lastDurationMs:0,lastError:f[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002",lastErrorDetails:f,lastValidationSummary:l.summary||{errorCount:f.length,warningCount:0},errorCount:Number(a?.runtime?.errorCount)||0,...d?wr({status:_e.ERROR,startedAt:c,skipReason:"invalid_config",error:f[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"}):{}},e),{success:!1,error:f.join(`
`),errors:f,...d?{meta:ks({startedAt:c,status:_e.ERROR,skipReason:"invalid_config",error:f[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"})}:{}}}let u=a.runtime||{},p=tp(a.scope||a,a.tables);if((p.mode==="current"||p.mode==="selected")&&p.allowedTableIds.length===0){let f=p.mode==="current"?"\u672A\u6307\u5B9A\u5F53\u524D\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002":"\u672A\u9009\u62E9\u4EFB\u4F55\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002";return qe().warn(f,{mode:p.mode}),tr({lastStatus:_e.ERROR,lastRunAt:c,lastDurationMs:0,lastError:f,lastErrorDetails:[f]},e),{success:!1,error:f,errors:[f]}}let y=null;tr({lastStatus:_e.RUNNING,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},lastScopeMode:Y(p.mode,""),...d?wr({status:_e.RUNNING,startedAt:c,skipReason:""}):{}},e);try{if(typeof r!="function")throw new Error("table_update_missing_execution_context_builder");if(typeof s!="function")throw new Error("table_update_missing_target_resolver");let f=await r();qe().info("\u6267\u884C\u4E0A\u4E0B\u6587\u5DF2\u6784\u5EFA");let g=s(f);if(!g)throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u697C\u5C42\u3002");y=g,qe().info("\u76EE\u6807\u6D88\u606F\u5DF2\u89E3\u6790",{sourceMessageId:g.sourceMessageId,slotRevisionKey:g.slotRevisionKey}),d&&tr(wr({status:_e.RUNNING,targetSnapshot:g,startedAt:c,skipReason:""}),e);let b=Y(a.autoUpdateTrigger,"assistantMessage");if(d&&(!a.autoUpdateEnabled||b!=="assistantMessage")){let H=a.autoUpdateEnabled?"auto_trigger_not_assistant_message":"auto_update_disabled";return tr(wr({status:_e.SKIPPED,targetSnapshot:g,startedAt:c,skipReason:H}),e),{success:!1,skipped:!0,reason:H,targetSnapshot:g,meta:ks({targetSnapshot:g,startedAt:c,status:_e.SKIPPED,skipReason:H})}}if(d){let H=Oa(o);if(H)return tr(wr({status:_e.ABORTED,targetSnapshot:g,startedAt:c,skipReason:H.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:g,meta:ks({targetSnapshot:g,startedAt:c,status:_e.ABORTED,skipReason:H.reason,aborted:H.aborted===!0,stale:H.stale===!0,abortReason:H.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}let v=await nf(g);if(!v?.success)throw new Error(v?.error||"\u76EE\u6807\u89E3\u6790\u8BB0\u5F55\u5931\u8D25");if(n&&Number.isFinite(g?.targetMessageIndex)&&g.targetMessageIndex>=0){qe().info("clearBeforeUpdate \u542F\u7528\uFF0C\u6E05\u7A7A\u76EE\u6807\u697C\u5C42\u6570\u636E",{targetMessageIndex:g.targetMessageIndex});try{let H=await af(g.targetMessageIndex);qe().info("clearBeforeUpdate \u5B8C\u6210",H)}catch(H){qe().error("clearBeforeUpdate \u5931\u8D25",H)}}let T=Cs(g.sourceMessageId),w=of(g,{templateTables:a.tables}),B=rr(w?.state?.tables||[]),R=If(),S=o?.signal||f?.signal||null;qe().info("\u72B6\u6001\u5DF2\u52A0\u8F7D",{loadMode:w?.loadMode,sourceKind:w?.sourceKind,tableCount:B.length});let _=await R.buildRequest({buildRequest:Kv},{executionContext:f,targetSnapshot:g,loadResult:w,config:a,assistantSnapshot:T,runScope:p});qe().info("\u8BF7\u6C42\u5DF2\u6784\u5EFA",{messageCount:_?.messages?.length,fillMode:_?.fillMode});let F="",W=null,D=null;for(let H=1;H<=$a;H++){if(S?.aborted)throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88");try{if(F=await R.sendRequest({sendRequest:Uv},_,{config:a,abortSignal:S}),qe().info("API \u54CD\u5E94\u5DF2\u6536\u5230",{attempt:H,responseLength:F?.length||0}),W=R.parseResponse({parseResponse:Ef},F),qe().info("\u54CD\u5E94\u5DF2\u89E3\u6790",{attempt:H,mode:W?.mode,hasEdits:!!W?.edits,hasTables:!!W?.tables}),!(W?.mode==="incremental"&&Array.isArray(W.edits)&&W.edits.length>0||W?.mode==="full"&&W?.tables))throw new Error("AI \u54CD\u5E94\u4E2D\u672A\u627E\u5230\u6709\u6548\u7684 <tableEdit> \u6807\u7B7E\u6216\u8868\u683C JSON");D=null;break}catch(Ae){if(D=Ae,qe().warn(`\u586B\u8868 attempt ${H}/${$a} \u5931\u8D25`,{error:Ae?.message||String(Ae)}),H<$a&&!await Mv(Iv,S))throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88\uFF08\u91CD\u8BD5\u7B49\u5F85\u671F\u95F4\uFF09")}}if(D)throw new Error(`\u586B\u8868\u5931\u8D25\uFF08${$a} \u6B21\u91CD\u8BD5\u540E\u4ECD\u5931\u8D25\uFF09: ${D?.message||String(D)}`);let A,J=null,K=_.fillMode||"full",Q=null;if(W.mode==="incremental"&&W.edits){let H=Rf(w?.state,B),Ae=Lv(W.edits,B,p,H);Q=Ae.stats,A=zv(B,Ae.edits,H,p),K="incremental",(Q.droppedByScope>0||Q.droppedByLock>0)&&qe().info("scope \u8FC7\u6EE4",Q)}else if(W.mode==="full"&&W.tables){let H=rr(W.tables);A=Dv(B,H,p),K="full"}else A=rr(B);if(J=Cf(B,A),qe().info("\u5DEE\u5F02\u5DF2\u8BA1\u7B97",{fillMode:K}),d){let H=Oa(o);if(H)return tr(wr({status:_e.ABORTED,targetSnapshot:g,startedAt:c,skipReason:H.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88",targetSnapshot:g,meta:ks({targetSnapshot:g,startedAt:c,status:_e.ABORTED,aborted:H.aborted===!0,stale:H.stale===!0,abortReason:H.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"})}}let ue=await xf({targetSnapshot:g,nextTables:A,config:a,loadResult:w,diff:J,fillMode:K,skipNotify:d});if(d){let H=Oa(o);if(H)return tr(wr({status:_e.ABORTED,targetSnapshot:g,startedAt:c,skipReason:H.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:g,loadResult:w,request:_,responseText:F,parsed:W,fillMode:K,diff:J,previousTables:B,nextTables:A,runScope:p,state:ue?.state,bindings:ue?.bindings,mirrorResult:ue?.mirrorResult,warning:ue?.warning||"",meta:ks({targetSnapshot:g,startedAt:c,status:_e.ABORTED,warning:ue?.warning||"",writeback:ue,aborted:H.aborted===!0,stale:H.stale===!0,abortReason:H.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}if(!ue?.success)throw new Error(ue?.error||"\u7ED3\u6784\u5316\u5199\u56DE\u5931\u8D25");let ge=Date.now()-c;qe().info(`\u586B\u8868\u5B8C\u6210 [${K}] ${ge}ms`,{success:!0,writebackSuccess:ue?.success,mirrorSuccess:ue?.mirrorResult?.success});let Me={lastStatus:_e.SUCCESS,lastRunAt:Date.now(),lastDurationMs:ge,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:(Number(u.successCount)||0)+1,errorCount:Number(u.errorCount)||0,lastSourceMessageId:Y(g.sourceMessageId),lastSlotRevisionKey:Y(g.slotRevisionKey),lastLoadMode:Y(w.loadMode),lastMirrorApplied:ue?.mirrorResult?.success===!0,lastResolvedFromMessageId:Y(w?.resolvedFromMessageId),lastResolvedFromRevisionKey:Y(w?.resolvedFromRevisionKey),lastSourceKind:Y(w?.sourceKind||w?.state?.meta?.sourceKind),lastScopeMode:Y(p.mode,""),lastFillMode:K,...d?wr({status:_e.SUCCESS,targetSnapshot:g,startedAt:c,skipReason:""}):{}};return tr(Me,e),{success:!0,targetSnapshot:g,loadResult:w,request:_,responseText:F,parsed:W,fillMode:K,diff:J,previousTables:B,nextTables:A,runScope:p,scopeStats:Q,state:ue.state,bindings:ue.bindings,mirrorResult:ue.mirrorResult,warning:ue.warning||"",...d?{meta:ks({targetSnapshot:g,startedAt:c,status:_e.SUCCESS,warning:ue.warning||"",writeback:ue})}:{}}}catch(f){let g=Date.now()-c;qe().error(`\u586B\u8868\u5931\u8D25 ${g}ms: ${f?.message||f}`,{stack:f?.stack});let b=d?Oa(o):!1,v=f?.name==="AbortError"||f?.message==="\u8BF7\u6C42\u5DF2\u53D6\u6D88"||b?.aborted===!0||b?.stale===!0,T=v?_e.ABORTED:_e.ERROR,w={lastStatus:T,lastRunAt:Date.now(),lastDurationMs:g,lastError:f?.message||String(f),lastErrorDetails:[f?.message||String(f)],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:Number(u.successCount)||0,errorCount:v?Number(u.errorCount)||0:(Number(u.errorCount)||0)+1,lastScopeMode:Y(p.mode,""),...d?wr({status:T,targetSnapshot:y,startedAt:c,skipReason:v?b?.reason||"cancelled_before_host_commit":"",error:f?.message||String(f)}):{}};return tr(w,e),{success:!1,error:f?.message||String(f),errors:[f?.message||String(f)],...d?{meta:ks({targetSnapshot:y,startedAt:c,status:T,skipReason:v?b?.reason||"cancelled_before_host_commit":"",aborted:v,stale:b?.stale===!0,abortReason:v?b?.reason||"cancelled_before_host_commit":"",error:f?.message||String(f)})}:{}}}}var $a,Iv,Bv,Ba=P(()=>{as();Ts();Sn();Sa();G();Qe();Ra();pn();Dr();wf();Af();kf();Qn();Mf();Nf();Bn();Ks();$a=3,Iv=5e3;Bv=`

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

\u53EA\u8FD4\u56DE <tableEdit> \u6807\u7B7E\uFF0C\u4E0D\u8981\u9644\u52A0\u5176\u4ED6\u5185\u5BB9\u3002`});var Wf={};re(Wf,{WindowManager:()=>za,closeWindow:()=>Uf,createWindow:()=>cc,windowManager:()=>Tt});function Fv(){if(Tt.stylesInjected)return;Tt.stylesInjected=!0;let t=`
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
  `,e=or(),r=e.createElement("style");r.id=jv+"_styles",r.textContent=t,(e.head||e.documentElement).appendChild(r)}function cc(t){let{id:e,title:r="\u7A97\u53E3",content:s="",width:o=900,height:n=700,modal:a=!1,resizable:i=!0,maximizable:l=!0,startMaximized:d=!1,rememberState:c=!0,onClose:u,onReady:p}=t;Fv();let y=window.jQuery||window.parent?.jQuery;if(!y)return Wv.error("jQuery not available"),null;if(Tt.isOpen(e))return Tt.bringToFront(e),Tt.getWindow(e);let f=window.innerWidth||1200,g=window.innerHeight||800,b=f<=1100,v=null,T=!1;c&&(v=Tt.getState(e),v&&!b&&(T=!0));let w,B;T&&v.width&&v.height?(w=Math.max(400,Math.min(v.width,f-40)),B=Math.max(300,Math.min(v.height,g-40))):(w=Math.max(400,Math.min(o,f-40)),B=Math.max(300,Math.min(n,g-40)));let R=Math.max(20,Math.min((f-w)/2,f-w-20)),S=Math.max(20,Math.min((g-B)/2,g-B-20)),_=l&&!b,F=`
    <div class="yyt-window" id="${e}" style="left:${R}px; top:${S}px; width:${w}px; height:${B}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${Hv(r)}</span>
        </div>
        <div class="yyt-window-controls">
          ${_?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
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
  `,W=or(),D=null;a&&(D=y(`<div class="yyt-window-overlay" data-for="${e}"></div>`),y(W.body).append(D));let A=y(F);y(W.body).append(A),Tt.register(e,A),A.on("mousedown",()=>Tt.bringToFront(e));let J=!1,K={left:R,top:S,width:w,height:B},Q=()=>{K={left:parseInt(A.css("left")),top:parseInt(A.css("top")),width:A.width(),height:A.height()},A.addClass("maximized"),A.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),J=!0},ue=()=>{A.removeClass("maximized"),A.css({left:K.left+"px",top:K.top+"px",width:K.width+"px",height:K.height+"px"}),A.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),J=!1};A.find(".yyt-window-btn.maximize").on("click",()=>{J?ue():Q()}),(b&&l||T&&v.isMaximized&&l||d&&l)&&Q(),A.find(".yyt-window-btn.close").on("click",()=>{if(c&&l){let xe={width:J?K.width:A.width(),height:J?K.height:A.height(),isMaximized:J};Tt.saveState(e,xe)}u&&u(),D&&D.remove(),A.remove(),Tt.unregister(e),y(document).off(".yytWindowDrag"+e),y(document).off(".yytWindowResize"+e)}),D&&D.on("click",xe=>{xe.target,D[0]});let ge=!1,Me,H,Ae,De;if(A.find(".yyt-window-header").on("mousedown",xe=>{y(xe.target).closest(".yyt-window-controls").length||J||(ge=!0,Me=xe.clientX,H=xe.clientY,Ae=parseInt(A.css("left")),De=parseInt(A.css("top")),y(document.body).css("user-select","none"))}),y(document).on("mousemove.yytWindowDrag"+e,xe=>{if(!ge)return;let Le=xe.clientX-Me,St=xe.clientY-H;A.css({left:Math.max(0,Ae+Le)+"px",top:Math.max(0,De+St)+"px"})}),y(document).on("mouseup.yytWindowDrag"+e,()=>{ge&&(ge=!1,y(document.body).css("user-select",""))}),i){let xe=!1,Le="",St,Fe,sr,Ke,mo,ho;A.find(".yyt-window-resize-handle").on("mousedown",function(Tr){J||(xe=!0,Le="",y(this).hasClass("se")?Le="se":y(this).hasClass("e")?Le="e":y(this).hasClass("s")?Le="s":y(this).hasClass("w")?Le="w":y(this).hasClass("n")?Le="n":y(this).hasClass("nw")?Le="nw":y(this).hasClass("ne")?Le="ne":y(this).hasClass("sw")&&(Le="sw"),St=Tr.clientX,Fe=Tr.clientY,sr=A.width(),Ke=A.height(),mo=parseInt(A.css("left")),ho=parseInt(A.css("top")),y(document.body).css("user-select","none"),Tr.stopPropagation())}),y(document).on("mousemove.yytWindowResize"+e,Tr=>{if(!xe)return;let Sr=Tr.clientX-St,Hr=Tr.clientY-Fe,Ms=400,Rs=300,bo=sr,xo=Ke,Yr=mo,Gr=ho;if(Le.includes("e")&&(bo=Math.max(Ms,sr+Sr)),Le.includes("s")&&(xo=Math.max(Rs,Ke+Hr)),Le.includes("w")){let qr=sr-Sr;qr>=Ms&&(bo=qr,Yr=mo+Sr)}if(Le.includes("n")){let qr=Ke-Hr;qr>=Rs&&(xo=qr,Gr=ho+Hr)}A.css({width:bo+"px",height:xo+"px",left:Yr+"px",top:Gr+"px"})}),y(document).on("mouseup.yytWindowResize"+e,()=>{xe&&(xe=!1,y(document.body).css("user-select",""))})}return A.on("remove",()=>{y(document).off(".yytWindowDrag"+e),y(document).off(".yytWindowResize"+e)}),p&&setTimeout(()=>p(A),50),A}function Uf(t){let e=Tt.getWindow(t);if(e){let r=window.jQuery||window.parent?.jQuery;r&&(r(`.yyt-window-overlay[data-for="${t}"]`).remove(),r(document).off(".yytWindowDrag"+t),r(document).off(".yytWindowResize"+t)),e.remove(),Tt.unregister(t)}}function Hv(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var Wv,jv,Kf,za,Tt,dc=P(()=>{$e();G();Ye();Wv=C.createScope("WindowManager"),jv="youyou_toolkit_window_manager",Kf="window_states",za=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,r){this.topZIndex++,this.windows.set(e,{$el:r,zIndex:this.topZIndex}),r.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let r=this.windows.get(e);r&&(this.topZIndex++,r.zIndex=this.topZIndex,r.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,r)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,r){let s=this.loadStates();s[e]={...r,updatedAt:Date.now()},vn.set(Kf,s)}loadStates(){return vn.get(Kf)||{}}getState(e){return this.loadStates()[e]||null}},Tt=new za});function vr(){return uc||(uc=C.createScope("TableDataEditor")),uc}function Ft(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function qv(){if(!pc)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tde-styles")){pc=!0;return}let r=t.createElement("style");r.id="yyt-tde-styles",r.textContent=Gv,e.appendChild(r),pc=!0}catch(t){vr().warn("\u6CE8\u5165\u6570\u636E\u7F16\u8F91\u5668\u6837\u5F0F\u5931\u8D25",t)}}function yc(){let t=[],e=null,r=!1;try{let s=Cs(null);Array.isArray(s?.tableState?.tables)&&s.tableState.tables.length>0&&(t=s.tableState.tables),e=s?{chatId:s.chatId||"",sourceMessageId:s.sourceMessageId||s.message?.message_id||"",sourceSwipeId:s.sourceSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",traceId:s.traceId||"",targetMessageIndex:s.targetMessageIndex??-1}:null}catch(s){vr().warn("loadEditorData \u5F02\u5E38",s)}if(t.length===0)try{let o=ua({})?.template?.tables;Array.isArray(o)&&o.length>0&&(t=ie(o),r=!0)}catch(s){vr().warn("\u4ECE\u6A21\u677F fallback \u5931\u8D25",s)}U.tempData=ie(t)||[],U.targetSnapshot=e,U.isDirty=!1,U.isFromTemplate=r,U.currentTableIndex>=U.tempData.length?U.currentTableIndex=U.tempData.length>0?0:-1:U.currentTableIndex<0&&U.tempData.length>0&&(U.currentTableIndex=0)}function Ff(){return`
    <div class="yyt-tde">
      ${Hf()}
      <div class="yyt-tde-content">
        ${Vv()}
        <main class="yyt-tde-main">${Jv()}</main>
      </div>
    </div>
  `}function Hf(){return`
    <div class="yyt-tde-toolbar">
      <div class="yyt-tde-toolbar-left">
        <div class="yyt-tde-mode-switch">
          <button class="${U.mode==="data"?"active":""}" data-mode="data">\u6570\u636E\u7F16\u8F91</button>
          <button class="${U.mode==="schema"?"active":""}" data-mode="schema">\u7ED3\u6784\u914D\u7F6E</button>
          <button class="${U.mode==="global"?"active":""}" data-mode="global">\u5168\u5C40\u6CE8\u5165</button>
        </div>
        ${U.isDirty?'<span class="yyt-tde-dirty-badge">\u672A\u4FDD\u5B58</span>':""}
      </div>
      <div class="yyt-tde-actions">
        <button class="yyt-tde-btn" data-action="reload"><i class="fa-solid fa-rotate"></i> \u91CD\u65B0\u52A0\u8F7D</button>
        <button class="yyt-tde-btn" data-action="save" ${U.isDirty?"":"disabled"}><i class="fa-solid fa-floppy-disk"></i> \u4FDD\u5B58</button>
        <button class="yyt-tde-btn yyt-tde-btn-primary" data-action="run-now"><i class="fa-solid fa-play"></i> \u7ACB\u5373\u586B\u8868</button>
      </div>
    </div>
  `}function Vv(){let t=U.tempData||[],e=t.map((r,s)=>{let o=r?.name||`\u8868 ${s+1}`,n=Array.isArray(r?.rows)?r.rows.length:0;return`
      <button class="yyt-tde-sheet-item ${s===U.currentTableIndex?"active":""}" data-sheet-index="${s}">
        <span class="yyt-tde-sheet-name">${Ft(o)}</span>
        <span class="yyt-tde-sheet-count">${n}</span>
      </button>
    `}).join("");return`
    <nav class="yyt-tde-sidebar">
      <div class="yyt-tde-sidebar-label">\u8868\u683C\u5217\u8868 (${t.length})</div>
      <div class="yyt-tde-sheet-list">
        ${e||'<div style="padding: 8px 10px; font-size: 11px; color: var(--tde-text-muted);">\u6682\u65E0\u8868</div>'}
      </div>
    </nav>
  `}function Jv(){let t=U.tempData||[],e=U.currentTableIndex,r=e>=0&&e<t.length?t[e]:null;return U.mode==="global"?Zv():t.length===0?'<div class="yyt-tde-empty">\u5F53\u524D slot \u6CA1\u6709\u8868\u6570\u636E\uFF0C\u6A21\u677F\u4E5F\u672A\u914D\u7F6E\u8868\u3002<br>\u8BF7\u5148\u5728\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u521D\u59CB\u5316\uFF0C\u6216\u5230\u300C\u9884\u8BBE\u7BA1\u7406 \u2192 \u8868\u683C\u6A21\u677F\u300D\u914D\u7F6E\u6A21\u677F\u3002</div>':r?U.mode==="data"?Xv(r,e):U.mode==="schema"?Qv(r,e):"":'<div class="yyt-tde-empty">\u8BF7\u4ECE\u5DE6\u4FA7\u9009\u62E9\u4E00\u5F20\u8868\u3002</div>'}function Xv(t,e){let r=Array.isArray(t?.columns)?t.columns:[],s=Array.isArray(t?.rows)?t.rows:[],o=U.isFromTemplate?'<div class="yyt-tde-schema-hint" style="margin-bottom:12px;">\u5F53\u524D\u663E\u793A<b>\u6A21\u677F\u9ED8\u8BA4\u7ED3\u6784</b>\uFF08slot \u5C1A\u65E0\u6570\u636E\uFF09\u3002\u76F4\u63A5\u6DFB\u52A0\u884C\u6216\u7F16\u8F91\u4F1A\u521B\u5EFA slot \u6570\u636E\uFF1B\u6216\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u586B\u3002</div>':"",n=s.map((a,i)=>{let l=a?.cells||{},d=r.map(c=>{let u=c?.key||"",p=c?.title||u,y=l[u],f=y==null||y==="",g=f?"\uFF08\u7A7A\uFF09":String(y);return`
        <div class="yyt-tde-field">
          <div class="yyt-tde-field-label">${Ft(p)}</div>
          <div class="yyt-tde-field-cell ${f?"yyt-tde-field-cell--empty":""}"
               contenteditable
               data-row-index="${i}"
               data-col-key="${Ft(u)}">${Ft(g)}</div>
        </div>
      `}).join("");return`
      <article class="yyt-tde-card" data-row-index="${i}">
        <header class="yyt-tde-card-header">
          <span class="yyt-tde-card-index">#${i+1}</span>
          <input class="yyt-tde-card-name" value="${Ft(a?.name||"")}" data-row-name-index="${i}" placeholder="\u884C\u540D">
          <div class="yyt-tde-card-actions">
            <button class="yyt-tde-icon-btn danger" data-action="delete-row" data-row-index="${i}" title="\u5220\u9664\u884C"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </header>
        <div class="yyt-tde-card-body">${d||'<div style="padding:8px;color:var(--tde-text-muted);font-size:12px;">\u8BE5\u8868\u6CA1\u6709\u5217\u5B9A\u4E49</div>'}</div>
      </article>
    `}).join("");return`
    ${o}
    <div class="yyt-tde-card-grid">
      ${n}
      <button class="yyt-tde-card-add" data-action="add-row">
        <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u884C
      </button>
    </div>
  `}function Qv(t,e){let r=Array.isArray(t?.columns)?t.columns:[],s=r.map(o=>`
    <div class="yyt-tde-schema-row">
      <div class="yyt-tde-schema-key">${Ft(o?.key||"")} <span style="color:var(--tde-text-muted);font-weight:400;">/ ${Ft(o?.type||"text")}</span></div>
      <div class="yyt-tde-schema-value">
        <div style="font-weight:600;color:var(--tde-text);">${Ft(o?.title||o?.key||"")}</div>
        ${o?.description?`<div style="color:var(--tde-text-muted);font-size:11px;margin-top:2px;">${Ft(o.description)}</div>`:""}
      </div>
    </div>
  `).join("");return`
    <div class="yyt-tde-schema-hint">
      <strong>\u53EA\u8BFB\u5C55\u793A</strong> \u2014 \u5B57\u6BB5\u5B9A\u4E49\u7684\u53EF\u7F16\u8F91 UI \u4F1A\u5728 #16 schema-service \u91CD\u5199\u540E\u63A5\u5165\uFF08\u652F\u6301\u6539\u540D/\u7C7B\u578B/\u63CF\u8FF0/AI \u64CD\u4F5C\u8BF4\u660E\uFF09\u3002
      \u6B64 mode \u4E0B\u6682\u53EA\u663E\u793A\u5F53\u524D\u5217\u5B9A\u4E49\u3002
    </div>
    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">\u57FA\u7840\u4FE1\u606F</div>
      <div class="yyt-tde-schema-row">
        <div class="yyt-tde-schema-key">\u8868\u540D</div>
        <div class="yyt-tde-schema-value">${Ft(t?.name||"")}</div>
      </div>
      <div class="yyt-tde-schema-row">
        <div class="yyt-tde-schema-key">UID</div>
        <div class="yyt-tde-schema-value"><code style="font-size:11px;color:var(--tde-accent);">${Ft(t?.uid||t?.id||"")}</code></div>
      </div>
    </div>
    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">\u5B57\u6BB5\u5B9A\u4E49 (${r.length})</div>
      ${s||'<div style="color:var(--tde-text-muted);font-size:12px;padding:8px 0;">\u65E0\u5B57\u6BB5</div>'}
    </div>
  `}function Zv(){return`
    <div class="yyt-tde-schema-hint">
      <strong>\u8DE8\u8868 / \u5168\u5C40\u6CE8\u5165\u8BBE\u7F6E</strong> \u2014 \u6B64 mode \u5305\u542B\u5199\u56DE\u4E16\u754C\u4E66\u914D\u7F6E\uFF08\u8BAE\u9898 #15 #30\uFF09\u548C isolationKey \u7B49\u3002
      \u9884\u8BA1 v1.0.176 \u63A5\u5165\u3002\u5F53\u524D\u4EC5\u5360\u4F4D\u3002
    </div>
    <div class="yyt-tde-empty">\u5168\u5C40\u6CE8\u5165\u914D\u7F6E UI \u5F85 #30 \u5199\u56DE\u4E16\u754C\u4E66 + isolation UI \u5B8C\u6210\u540E\u63A5\u5165\u3002</div>
  `}function jr(){if(!U.$window)return;U.$window.find(".yyt-window-body").html(Ff()),Yf(U.$window)}function Yf(t){let e=window.jQuery||window.parent?.jQuery;!e||!t||!t.on||(t.off(".tde"),t.on("click.tde",".yyt-tde-mode-switch button[data-mode]",function(){let r=e(this).attr("data-mode");r&&r!==U.mode&&(U.mode=r,jr())}),t.on("click.tde","[data-sheet-index]",function(){let r=Number(e(this).attr("data-sheet-index"));Number.isFinite(r)&&r!==U.currentTableIndex&&(U.currentTableIndex=r,jr())}),t.on("click.tde",'[data-action="reload"]',()=>{U.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u91CD\u65B0\u52A0\u8F7D\u5C06\u4E22\u5F03\uFF0C\u786E\u5B9A\uFF1F")||(yc(),jr(),k("success","\u5DF2\u91CD\u65B0\u52A0\u8F7D"))}),t.on("click.tde",'[data-action="save"]',async()=>{if(!U.isDirty){k("info","\u6CA1\u6709\u4FEE\u6539");return}try{let r=U.targetSnapshot;if(r?.sourceMessageId||(r=await Vl()),!r?.sourceMessageId){k("error","\u65E0\u6CD5\u5B9A\u4F4D\u5F53\u524D\u6D88\u606F\uFF08\u627E\u4E0D\u5230 assistant \u6D88\u606F\uFF09");return}let s=await Na(r,{tables:ie(U.tempData)||[],meta:{source:"data-editor-manual-save"}},{skipFreshValidation:!0});s?.success?(U.isDirty=!1,U.targetSnapshot={chatId:s.state?.chatId||r.chatId,sourceMessageId:s.sourceMessageId,sourceSwipeId:s.state?.sourceSwipeId||r.sourceSwipeId,effectiveSwipeId:r.effectiveSwipeId,slotBindingKey:s.state?.slotBindingKey||r.slotBindingKey,slotRevisionKey:s.slotRevisionKey,slotTransactionId:r.slotTransactionId,traceId:r.traceId,targetMessageIndex:s.messageIndex??r.targetMessageIndex},k("success","\u5DF2\u4FDD\u5B58"),jr()):k("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${s?.error||"\u672A\u77E5"}`)}catch(r){vr().error("\u4FDD\u5B58\u5F02\u5E38",r),k("error",`\u4FDD\u5B58\u5F02\u5E38\uFF1A${r?.message||r}`)}}),t.on("click.tde",'[data-action="run-now"]',async()=>{if(!(U.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u7ACB\u5373\u586B\u8868\u4F1A\u5148\u4E22\u5F03\u8FD9\u4E9B\u4FEE\u6539\uFF0C\u786E\u5B9A\uFF1F")))try{let r=await mn();r?.success?(k("success","\u586B\u8868\u5B8C\u6210"),yc(),jr()):k("error",`\u586B\u8868\u5931\u8D25\uFF1A${r?.error||"\u672A\u77E5"}`)}catch(r){vr().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",r),k("error",`\u5F02\u5E38\uFF1A${r?.message||r}`)}}),t.on("input.tde","[data-row-index][data-col-key]",function(){let r=Number(e(this).attr("data-row-index")),s=e(this).attr("data-col-key"),o=e(this).text();if(!Number.isFinite(r)||!s)return;let n=U.tempData[U.currentTableIndex];n?.rows?.[r]&&(n.rows[r].cells||(n.rows[r].cells={}),n.rows[r].cells[s]=o,U.isDirty=!0,jf())}),t.on("input.tde","[data-row-name-index]",function(){let r=Number(e(this).attr("data-row-name-index"));if(!Number.isFinite(r))return;let s=U.tempData[U.currentTableIndex];s?.rows?.[r]&&(s.rows[r].name=e(this).val(),U.isDirty=!0,jf())}),t.on("click.tde",'[data-action="delete-row"]',function(){let r=Number(e(this).attr("data-row-index"));if(!Number.isFinite(r)||!window.confirm(`\u786E\u5B9A\u5220\u9664\u7B2C ${r+1} \u884C\uFF1F`))return;let s=U.tempData[U.currentTableIndex];s?.rows&&(s.rows.splice(r,1),U.isDirty=!0,jr())}),t.on("click.tde",'[data-action="add-row"]',()=>{let r=U.tempData[U.currentTableIndex];r&&(Array.isArray(r.rows)||(r.rows=[]),r.rows.push({id:Ko("row"),name:"",cells:{}}),U.isDirty=!0,jr())}))}function jf(){if(!U.$window)return;let t=U.$window.find(".yyt-tde-toolbar");!t||!t.length||t.replaceWith(Hf())}function fc(t={}){if(console.log("[YYT][TableDataEditor] openTableDataEditor called",{options:t}),vr().info("openTableDataEditor \u8C03\u7528",{options:t}),qv(),!(window.jQuery||window.parent?.jQuery)){let s="jQuery \u4E0D\u53EF\u7528\uFF08window.jQuery \u548C window.parent.jQuery \u90FD\u662F undefined\uFF09";console.error("[YYT][TableDataEditor]",s),vr().error(s);try{k("error",`\u6570\u636E\u7F16\u8F91\u5668\u6253\u5F00\u5931\u8D25\uFF1A${s}`)}catch{}return null}if(console.log("[YYT][TableDataEditor] jQuery \u53EF\u7528"),U.$window&&U.$window.length&&document.body.contains(U.$window[0])){if(t.focusTableUid){let o=(U.tempData||[]).findIndex(n=>(n?.uid||n?.id)===t.focusTableUid);o>=0&&(U.currentTableIndex=o)}return t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(U.mode=t.focusMode),jr(),U.$window}if(yc(),console.log("[YYT][TableDataEditor] loadEditorData \u5B8C\u6210\uFF0CtempData \u8868\u6570:",U.tempData?.length),t.focusTableUid){let o=(U.tempData||[]).findIndex(n=>(n?.uid||n?.id)===t.focusTableUid);o>=0&&(U.currentTableIndex=o)}t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(U.mode=t.focusMode),console.log("[YYT][TableDataEditor] \u5373\u5C06\u8C03 createWindow");let r;try{r=cc({id:Yv,title:"\u586B\u8868\u6570\u636E\u7F16\u8F91\u5668",content:Ff(),width:1200,height:800,modal:!1,resizable:!0,maximizable:!0,rememberState:!0,onReady:s=>{console.log("[YYT][TableDataEditor] onReady triggered",{$el:!!s}),U.$window=s,Yf(s)},onClose:()=>{U.isDirty&&vr().warn("\u6570\u636E\u7F16\u8F91\u5668\u5173\u95ED\u65F6\u6709\u672A\u4FDD\u5B58\u4FEE\u6539"),U.$window=null}}),console.log("[YYT][TableDataEditor] createWindow \u8FD4\u56DE:",!!r)}catch(s){console.error("[YYT][TableDataEditor] createWindow \u629B\u9519:",s),vr().error("createWindow \u629B\u9519",s);try{k("error",`\u521B\u5EFA\u7A97\u53E3\u5931\u8D25\uFF1A${s?.message||s}`)}catch{}return null}return r}var Yv,uc,U,Gv,pc,Gf=P(()=>{dc();G();pn();Ra();Ba();qo();Qe();hs();Ye();Yv="yyt-table-data-editor";U={$window:null,mode:"data",tempData:null,currentTableIndex:-1,isDirty:!1,isFromTemplate:!1,targetSnapshot:null},Gv=`
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
`,pc=!1});function eT(t){return ie(t)}function tT(t,e,r){if(!t||typeof t!="object")return;let s=String(e||"").split(".").filter(Boolean);if(s.length===0)return;let o=t;for(let n=0;n<s.length-1;n++){let a=s[n];(o[a]===null||o[a]===void 0||typeof o[a]!="object")&&(o[a]={}),o=o[a]}o[s[s.length-1]]=r}function Be(){return gc||(gc=C.createScope("TableWorkbenchView")),gc}function ae(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function qf(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function Jf(t){let{config:e,activeTemplate:r,isolationKey:s,tablesPreview:o}=t,n=e?.runtime||{},a=n.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":n.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":n.lastStatus==="running"?"\u8FD0\u884C\u4E2D":"\u5F85\u547D",i=n.lastStatus==="success"?"success":n.lastStatus==="failed"?"error":"muted",l=e?.automation?.enabled?"\u81EA\u52A8":"\u624B\u52A8",d=e?.apiPreset||"\u8DDF\u968F\u4E3B API",c=e?.bypassPresetId?"\u5DF2\u7ED1\u5B9A":"\u65E0";return`
  <div class="yyt-tww">
    <!-- Hero -->
    <div class="yyt-tww-hero">
      <div class="yyt-tww-hero-row1">
        <div class="yyt-tww-hero-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
        <div class="yyt-tww-hero-name">\u586B\u8868\u5DE5\u4F5C\u53F0</div>
        <div class="yyt-tww-hero-actions">
          <button class="yyt-tww-btn yyt-tww-btn-small" data-action="run-now"><i class="fa-solid fa-play"></i> \u7ACB\u5373\u586B\u8868</button>
          <button class="yyt-tww-btn yyt-tww-btn-small" data-action="run-clear"><i class="fa-solid fa-rotate-left"></i> \u91CD\u586B</button>
        </div>
      </div>
      <div class="yyt-tww-hero-desc">\u4ECE\u5BF9\u8BDD\u5185\u5BB9\u63D0\u53D6\u7ED3\u6784\u5316\u6570\u636E\uFF0C\u81EA\u52A8\u7EF4\u62A4\u8868\u683C\u72B6\u6001\u3002</div>
      <div class="yyt-tww-hero-chips">
        <span class="yyt-tww-chip mode">\u6A21\u5F0F ${ae(l)}</span>
        <span class="yyt-tww-chip preset">\u6A21\u677F: ${ae(r?.template?.name||"\u9ED8\u8BA4")}</span>
        <span class="yyt-tww-chip preset">API: ${ae(d)}</span>
        <span class="yyt-tww-chip preset">\u6307\u4EE4: ${ae(c)}</span>
        ${s?`<span class="yyt-tww-chip">\u9694\u79BB: ${ae(s)}</span>`:""}
        <span class="yyt-tww-chip status-${i==="success"?"success":i==="error"?"failed":""}">${ae(a)}</span>
      </div>
    </div>

    <!-- Runtime stats -->
    <div class="yyt-tww-stat-row">
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u72B6\u6001</span>
        <span class="yyt-tww-stat-value ${i}">${ae(a)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u6700\u8FD1\u8FD0\u884C</span>
        <span class="yyt-tww-stat-value muted">${ae(qf(n.lastRunAt))}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u6210\u529F</span>
        <span class="yyt-tww-stat-value success">${ae(n.successCount||0)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u5931\u8D25</span>
        <span class="yyt-tww-stat-value ${n.errorCount?"error":"muted"}">${ae(n.errorCount||0)}</span>
      </div>
    </div>

    <!-- Body sections -->
    <div class="yyt-tww-body">

      <section class="yyt-tww-section" data-section="bindings">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-link"></i></span>
          \u7ED1\u5B9A
        </div>
        ${rT(t)}
      </section>

      <section class="yyt-tww-section" data-section="behavior">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-arrows-rotate"></i></span>
          \u586B\u8868\u884C\u4E3A
        </div>
        ${sT(t)}
      </section>

      <section class="yyt-tww-section" data-section="overview">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-table-cells"></i></span>
          \u8868\u683C\u6982\u89C8
          <span class="yyt-tww-section-action">
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="open-editor"><i class="fa-solid fa-table-cells"></i> \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668</button>
          </span>
        </div>
        ${nT(t.tablesPreview)}
      </section>

    </div>
  </div>
  `}function rT(t){let{config:e,allTemplates:r,apiPresets:s,bypassPresets:o,regexPresets:n,worldbookPresets:a,activeTemplate:i}=t,l=r.map(w=>`<option value="${ae(w.id)}" ${i?.source?.templateId===w.id?"selected":""}>${ae(w.name)}</option>`).join(""),d=e?.autoUpdateEnabled===!0?"auto":"manual",c=e?.apiPreset||"",u='<option value="">\u2014\u2014 \u8DDF\u968F\u4E3B API \u2014\u2014</option>'+s.map(w=>`<option value="${ae(w.name)}" ${w.name===c?"selected":""}>${ae(w.name)}</option>`).join(""),p=e?.bypass?.presetId||"",y='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+o.map(w=>`<option value="${ae(w.id)}" ${w.id===p?"selected":""}>${ae(w.name)}${w.isDefault?" [\u9ED8\u8BA4]":""}</option>`).join(""),f=e?.extraction?.regexPresetId||"",g='<option value="">\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014</option>'+n.map(w=>`<option value="${ae(w.id)}" ${w.id===f?"selected":""}>${ae(w.name)}</option>`).join(""),b=e?.worldbooks?.presetId||"",v='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+a.map(w=>`<option value="${ae(w.id)}" ${w.id===b?"selected":""}>${ae(w.name)}</option>`).join(""),T=e?.runScope||"enabled";return`
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
        <option value="auto" ${d==="auto"?"selected":""}>\u81EA\u52A8 \u2014 \u56DE\u590D\u5B8C\u6210\u540E\u586B\u8868</option>
        <option value="manual" ${d==="manual"?"selected":""}>\u624B\u52A8 \u2014 \u4EC5\u5728\u70B9"\u7ACB\u5373\u586B\u8868"\u65F6</option>
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
      <select class="yyt-select yyt-tww-ctrl" data-binding="bypassPreset">${y}</select>
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
      <select class="yyt-select yyt-tww-ctrl" data-binding="worldbookPreset">${v}</select>
      <div class="yyt-tww-row-meta"><a data-link="worldbook">\u7BA1\u7406\u2026</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u4F5C\u7528\u57DF</span>
        <span class="yyt-tww-row-label-hint">\u6570\u636E\u72B6\u6001\u7ED1\u5B9A\u7684\u8303\u56F4</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="runScope">
        <option value="current" ${T==="current"?"selected":""}>\u4EC5\u5F53\u524D\u6D3B\u52A8\u8868</option>
        <option value="selected" ${T==="selected"?"selected":""}>\u5F53\u524D\u9009\u4E2D\u8868</option>
        <option value="enabled" ${T==="enabled"?"selected":""}>\u6240\u6709\u542F\u7528\u7684\u8868</option>
      </select>
      <div class="yyt-tww-row-meta"></div>
    </div>
  `}function sT(t){let{config:e}=t,r=e?.fillMode||"incremental",s=Number(e?.contextDepth)||3,o=e?.worldbookSync?.enabled===!0,n=e?.mirrorToMessage===!0;return`
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
      <input class="yyt-input yyt-tww-ctrl" type="number" min="1" max="50" data-binding="contextDepth" value="${ae(s)}">
      <div class="yyt-tww-row-meta"></div>
    </div>

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">\u540C\u6B65\u5230\u4E16\u754C\u4E66</div>
        <div class="yyt-tww-toggle-desc">\u628A\u8868\u683C\u5E8F\u5217\u5316\u4E3A\u4E16\u754C\u4E66\u6761\u76EE\u8BA9\u4E3B\u6A21\u578B\u5728\u751F\u6210\u65F6\u770B\u5230\u3002</div>
      </div>
      <div class="yyt-tww-toggle ${o?"on":""}" data-toggle="worldbookSync"></div>
    </div>

    ${oT(t)}

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">\u5199\u56DE\u6B63\u6587\u955C\u50CF</div>
        <div class="yyt-tww-toggle-desc">\u5728\u52A9\u624B\u6D88\u606F\u672B\u5C3E\u955C\u50CF\u5199\u5165 markdown \u65B9\u4FBF\u624B\u52A8\u67E5\u9605\u3002</div>
      </div>
      <div class="yyt-tww-toggle ${n?"on":""}" data-toggle="mirrorToMessage"></div>
    </div>
  `}function oT(t){let e=t?.config?.worldbookSync||{};if(!(e.enabled===!0))return"";let s=String(e.targetBook||""),o=String(t?.boundLorebook||""),n=t?.chatOpen===!0,a=s||o,i=Array.isArray(t.availableWorldbooks)?t.availableWorldbooks:[],l=e.wrapperConfig||{},d=l.enabled!==!1,c=String(l.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55"),u=String(l.wrapperHint||""),p=l.wrapperPlacement||{},y=String(p.position||"before_character_definition"),f=Number.isFinite(p.depth)?p.depth:2,g=Number.isFinite(p.order)?p.order:5e4,b;if(!n)b='<option value="">\u2014\u2014 \u8BF7\u5148\u6253\u5F00\u804A\u5929 \u2014\u2014</option>';else if(i.length===0)b=`<option value="${ae(a)}">${a?ae(a):"\u2014\u2014 \u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014\u2014"}</option>`;else{let w=i.map(R=>{let S=typeof R=="string"?R:R?.name||"";return`<option value="${ae(S)}" ${S===a?"selected":""}>${ae(S)}${S===o?"\uFF08\u89D2\u8272\u5361\u7ED1\u5B9A\uFF09":""}</option>`}).join("");b=(o?`<option value="">\u2014\u2014 \u89D2\u8272\u5361\u7ED1\u5B9A\uFF1A${ae(o)} \u2014\u2014</option>`:'<option value="">\u2014\u2014 \u9009\u62E9 \u2014\u2014</option>')+w}return`
    <div class="yyt-tww-sub-zone" data-sub-zone="worldbookSync">
      <div class="yyt-tww-sub-row">
        <label>\u76EE\u6807\u4E16\u754C\u4E66</label>
        <select class="yyt-select yyt-tww-ctrl" data-binding="worldbookTargetBook" ${n?"":"disabled"}>${b}</select>
        <div class="yyt-tww-sub-meta">${n?'<a data-action="refresh-worldbooks">\u5237\u65B0\u5217\u8868</a>':'<span style="color:var(--tww-warning);">\u672A\u6253\u5F00\u804A\u5929</span>'}</div>
      </div>

      <div class="yyt-tww-sub-row-toggle">
        <label>Wrapper \u5305\u88F9</label>
        <div class="yyt-tww-toggle-desc">\u7528 <code style="font-size:10px;">&lt;${ae(c)}&gt;...&lt;/${ae(c)}&gt;</code> \u5305\u4F4F\u6240\u6709\u5168\u5C40\u8868\u6570\u636E</div>
        <div class="yyt-tww-toggle ${d?"on":""}" data-toggle="worldbookWrapperEnabled"></div>
      </div>

      <div class="yyt-tww-sub-row">
        <label>Wrapper \u6807\u7B7E</label>
        <input class="yyt-input yyt-tww-ctrl" type="text" data-binding="worldbookWrapperTag" value="${ae(c)}" placeholder="\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55">
        <div class="yyt-tww-sub-meta"></div>
      </div>

      <div class="yyt-tww-sub-row">
        <label>Wrapper \u63D0\u793A\u6587</label>
        <input class="yyt-input yyt-tww-ctrl" type="text" data-binding="worldbookWrapperHint" value="${ae(u)}" placeholder="\u53EF\u9009\uFF0C\u8BF4\u660E wrapper \u5185\u5BB9\u7528\u9014">
        <div class="yyt-tww-sub-meta"></div>
      </div>

      <div class="yyt-tww-sub-row">
        <label>\u6CE8\u5165\u4F4D\u7F6E</label>
        <select class="yyt-select yyt-tww-ctrl" data-binding="worldbookWrapperPosition">
          <option value="before_character_definition" ${y==="before_character_definition"?"selected":""}>\u89D2\u8272\u5B9A\u4E49\u4E4B\u524D</option>
          <option value="after_character_definition" ${y==="after_character_definition"?"selected":""}>\u89D2\u8272\u5B9A\u4E49\u4E4B\u540E</option>
          <option value="before_history" ${y==="before_history"?"selected":""}>\u5386\u53F2\u8BB0\u5F55\u4E4B\u524D</option>
          <option value="after_history" ${y==="after_history"?"selected":""}>\u5386\u53F2\u8BB0\u5F55\u4E4B\u540E</option>
          <option value="at_depth" ${y==="at_depth"?"selected":""}>\u6307\u5B9A\u6DF1\u5EA6</option>
        </select>
        <div class="yyt-tww-sub-meta"></div>
      </div>

      <div class="yyt-tww-sub-row-double">
        <label>\u6DF1\u5EA6 / \u987A\u5E8F</label>
        <input class="yyt-input yyt-tww-ctrl" type="number" data-binding="worldbookWrapperDepth" value="${ae(f)}" min="0">
        <input class="yyt-input yyt-tww-ctrl" type="number" data-binding="worldbookWrapperOrder" value="${ae(g)}" min="0">
      </div>
    </div>
  `}function nT(t){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D slot \u6682\u65E0\u8868\u6570\u636E\u3002\u8BF7\u5148"\u7ACB\u5373\u586B\u8868"\u6216\u5728\u6570\u636E\u7F16\u8F91\u5668\u4E2D\u521D\u59CB\u5316\u3002</div>':`
    <div class="yyt-tww-table-grid">
      ${t.map((e,r)=>`
        <div class="yyt-tww-table-card" data-table-index="${r}">
          <div class="yyt-tww-table-card-header">
            <span class="yyt-tww-table-card-name">${ae(e.name||`\u8868 ${r+1}`)}</span>
            <i class="fa-solid fa-arrow-right yyt-tww-table-card-arrow"></i>
          </div>
          <div class="yyt-tww-table-card-stats">
            <span><b>${ae(e.rowCount||0)}</b> \u884C</span>
            <span><b>${ae(e.colCount||0)}</b> \u5B57\u6BB5</span>
            ${e.updatedHint?`<span>${ae(e.updatedHint)}</span>`:""}
          </div>
        </div>
      `).join("")}
    </div>
  `}function Xf(){let t=(()=>{try{return Ue()}catch{return{}}})(),e=(()=>{try{return gs()||[]}catch{return[]}})(),r=(()=>{try{return ua({})}catch{return null}})(),s=(()=>{try{return Er()||[]}catch{return[]}})(),o=(()=>{try{return tn()||[]}catch{return[]}})(),n=(()=>{try{return Te.listPresets()||[]}catch{return[]}})(),a=(()=>{try{return zt.listPresets()||[]}catch{return[]}})(),i=(()=>{try{return Ne.getKey()}catch{return""}})(),l=aT(),d=iT(),c=lT(),u=null,p=0;try{let g=Cs(null);Array.isArray(g?.tableState?.tables)&&g.tableState.tables.length>0&&(u=g.tableState.tables,p=Number(g.tableState.updatedAt)||0)}catch{}let f=(u||r?.template?.tables||t?.tables||[]).map(g=>({name:g?.name||"",rowCount:Array.isArray(g?.rows)?g.rows.length:0,colCount:Array.isArray(g?.columns)?g.columns.length:0,updatedHint:u&&p>0?qf(p):""}));return{config:t,activeTemplate:r,allTemplates:e,apiPresets:s,bypassPresets:o,regexPresets:n,worldbookPresets:a,availableWorldbooks:l,boundLorebook:d,chatOpen:c,isolationKey:i,tablesPreview:f}}function aT(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(!e)return[];if(typeof e.getLorebooks=="function"){let r=e.getLorebooks();if(Array.isArray(r))return r}if(typeof e.getLorebookList=="function"){let r=e.getLorebookList();if(Array.isArray(r))return r}}catch(t){Be().warn("loadAvailableWorldbooks \u5931\u8D25",t)}return[]}function iT(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e){if(typeof e.getCurrentCharPrimaryLorebook=="function"){let s=e.getCurrentCharPrimaryLorebook();if(typeof s=="string"&&s)return s}if(typeof e.getCharLorebooks=="function")try{let s=e.getCharLorebooks();if(s?.primary)return String(s.primary)}catch{}if(typeof e.getChatLorebook=="function")try{let s=e.getChatLorebook();if(typeof s=="string"&&s)return s}catch{}}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let s=r.characters?.[r.characterId],o=s?.data?.character_book?.name||s?.data?.extensions?.world||s?.world;if(typeof o=="string"&&o)return o}}catch(t){Be().warn("loadCharacterBoundLorebook \u5931\u8D25",t)}return""}function lT(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e&&typeof e.getCurrentChatId=="function"){let s=e.getCurrentChatId();return!!(s&&String(s).trim()&&String(s).trim()!=="default_chat")}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let s=r.chat;if(Array.isArray(s)&&s.length>0||r.chatId)return!0}}catch{}return!1}function mc(t,e){let r=window.jQuery||window.parent?.jQuery;if(!r||!t||!t.on){Be().warn("bindWorkbenchEvents: jQuery \u6216 $container \u4E0D\u53EF\u7528");return}t.off(".tww"),t.on("click.tww",'[data-action="run-now"]',async()=>{try{let n=await mn();n?.success?k("success","\u586B\u8868\u5B8C\u6210"):k("error",`\u586B\u8868\u5931\u8D25\uFF1A${n?.error||"\u672A\u77E5"}`),typeof e=="function"&&e()}catch(n){Be().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",n),k("error",`\u5F02\u5E38\uFF1A${n?.message||n}`)}}),t.on("click.tww",'[data-action="run-clear"]',async()=>{if(window.confirm("\u91CD\u586B\u4F1A\u6E05\u7A7A\u5F53\u524D\u6D88\u606F\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\u5E76\u91CD\u65B0\u751F\u6210\uFF0C\u786E\u5B9A\uFF1F"))try{let n=await mn(null,{clearBeforeUpdate:!0});n?.success?k("success","\u91CD\u586B\u5B8C\u6210"):k("error",`\u91CD\u586B\u5931\u8D25\uFF1A${n?.error||"\u672A\u77E5"}`),typeof e=="function"&&e()}catch(n){Be().error("\u91CD\u586B\u5F02\u5E38",n),k("error",`\u5F02\u5E38\uFF1A${n?.message||n}`)}}),t.on("click.tww",'[data-action="open-editor"]',n=>{n.preventDefault(),console.log("[YYT][TableWorkbench] open-editor button clicked"),Be().info("open-editor button clicked");try{let a=fc();console.log("[YYT][TableWorkbench] openTableDataEditor returned:",a),Be().info("openTableDataEditor \u8C03\u7528\u5B8C\u6210",{hasReturn:!!a})}catch(a){console.error("[YYT][TableWorkbench] \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38:",a),Be().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",a),k("error",`\u6253\u5F00\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("click.tww","[data-table-index]",function(n){n.preventDefault();let a=Number(r(this).attr("data-table-index"));if(!(!Number.isFinite(a)||a<0)){console.log("[YYT][TableWorkbench] table card clicked, idx=",a);try{let l=Cs(null)?.tableState?.tables?.[a],d=fc({focusTableUid:l?.uid||l?.id||""});console.log("[YYT][TableWorkbench] openTableDataEditor returned:",d)}catch(i){console.error("[YYT][TableWorkbench] \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38:",i),Be().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",i),k("error",`\u6253\u5F00\u5931\u8D25\uFF1A${i?.message||i}`)}}}),t.on("change.tww",'[data-binding="template"]',function(){let n=r(this).val();try{Ml(n);let a=Ue();Rt({...a,activeTemplate:n}),k("success","\u6A21\u677F\u5DF2\u5207\u6362"),typeof e=="function"&&e()}catch(a){Be().error("\u5207\u6362\u6A21\u677F\u5F02\u5E38",a),k("error",`\u5207\u6362\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("change.tww",'[data-binding="triggerMode"]',function(){let n=r(this).val();try{let a=Ue();Rt({...a,autoUpdateEnabled:n==="auto"}),k("success",n==="auto"?"\u5DF2\u5207\u6362\u4E3A\u81EA\u52A8\u6A21\u5F0F":"\u5DF2\u5207\u6362\u4E3A\u624B\u52A8\u6A21\u5F0F"),typeof e=="function"&&e()}catch(a){Be().error("\u5207\u6362\u89E6\u53D1\u6A21\u5F0F\u5F02\u5E38",a),k("error",`\u5207\u6362\u5931\u8D25\uFF1A${a?.message||a}`)}});let s=[{sel:'[data-binding="apiPreset"]',key:"apiPreset"},{sel:'[data-binding="runScope"]',key:"runScope"},{sel:'[data-binding="fillMode"]',key:"fillMode"}];for(let{sel:n,key:a}of s)t.on("change.tww",n,function(){let i=r(this).val();try{let l=Ue();Rt({...l,[a]:i}),k("success","\u5DF2\u4FDD\u5B58")}catch(l){Be().error(`\u4FDD\u5B58 ${a} \u5F02\u5E38`,l),k("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`)}});t.on("change.tww",'[data-binding="bypassPreset"]',function(){let n=r(this).val();try{let a=Ue();Rt({...a,bypass:{...a.bypass||{},presetId:n,enabled:!!n}}),k("success","Ai \u6307\u4EE4\u9884\u8BBE\u5DF2\u4FDD\u5B58")}catch(a){Be().error("\u4FDD\u5B58 bypass \u5F02\u5E38",a),k("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("change.tww",'[data-binding="regexPreset"]',function(){let n=r(this).val();try{let a=Ue();Rt({...a,extraction:{...a.extraction||{},regexPresetId:n}}),k("success","\u6B63\u5219\u9884\u8BBE\u5DF2\u66F4\u65B0")}catch(a){Be().error("\u4FDD\u5B58 regexPreset \u5F02\u5E38",a),k("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("change.tww",'[data-binding="worldbookPreset"]',function(){let n=r(this).val();try{let a=Ue();Rt({...a,worldbooks:{...a.worldbooks||{},presetId:n}}),k("success","\u4E16\u754C\u4E66\u9884\u8BBE\u5DF2\u66F4\u65B0")}catch(a){Be().error("\u4FDD\u5B58 worldbookPreset \u5F02\u5E38",a),k("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("change.tww",'[data-binding="contextDepth"]',function(){let n=Math.max(1,parseInt(r(this).val(),10)||3);try{let a=Ue();Rt({...a,contextDepth:n}),k("success","\u5DF2\u4FDD\u5B58")}catch(a){Be().error("\u4FDD\u5B58 contextDepth \u5F02\u5E38",a),k("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("click.tww",'[data-toggle="worldbookSync"]',function(){let n=r(this),a=n.hasClass("on"),i=!a;n.toggleClass("on",i);try{let l=Ue();Rt({...l,worldbookSync:{...l.worldbookSync||{},enabled:i}}),k("success",i?"\u5DF2\u542F\u7528\u4E16\u754C\u4E66\u540C\u6B65":"\u5DF2\u505C\u7528\u4E16\u754C\u4E66\u540C\u6B65"),typeof e=="function"&&e()}catch(l){n.toggleClass("on",a),Be().error("toggle worldbookSync \u5F02\u5E38",l),k("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`)}}),t.on("click.tww",'[data-toggle="worldbookWrapperEnabled"]',function(){let n=r(this),a=n.hasClass("on"),i=!a;n.toggleClass("on",i);try{let l=Ue(),d=l.worldbookSync||{};Rt({...l,worldbookSync:{...d,wrapperConfig:{...d.wrapperConfig||{},enabled:i}}}),k("success",i?"\u5DF2\u542F\u7528 Wrapper \u5305\u88F9":"\u5DF2\u505C\u7528 Wrapper")}catch(l){n.toggleClass("on",a),Be().error("toggle worldbookWrapperEnabled \u5F02\u5E38",l)}});let o=[{sel:'[data-binding="worldbookTargetBook"]',path:"targetBook",type:"string"},{sel:'[data-binding="worldbookWrapperTag"]',path:"wrapperConfig.wrapperTag",type:"string"},{sel:'[data-binding="worldbookWrapperHint"]',path:"wrapperConfig.wrapperHint",type:"string"},{sel:'[data-binding="worldbookWrapperPosition"]',path:"wrapperConfig.wrapperPlacement.position",type:"string"},{sel:'[data-binding="worldbookWrapperDepth"]',path:"wrapperConfig.wrapperPlacement.depth",type:"number"},{sel:'[data-binding="worldbookWrapperOrder"]',path:"wrapperConfig.wrapperPlacement.order",type:"number"}];for(let{sel:n,path:a,type:i}of o)t.on("change.tww",n,function(){let l=r(this).val();i==="number"&&(l=Number.parseInt(l,10));try{let d=Ue(),c=eT(d.worldbookSync||{});tT(c,a,l),Rt({...d,worldbookSync:c}),k("success","\u5DF2\u4FDD\u5B58")}catch(d){Be().error(`\u4FDD\u5B58 worldbookSync.${a} \u5F02\u5E38`,d),k("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${d?.message||d}`)}});t.on("click.tww",'[data-action="refresh-worldbooks"]',function(n){n.preventDefault(),typeof e=="function"&&e(),k("success","\u5DF2\u5237\u65B0\u4E16\u754C\u4E66\u5217\u8868")}),t.on("click.tww",'[data-toggle="mirrorToMessage"]',function(){let n=r(this),a=n.hasClass("on"),i=!a;n.toggleClass("on",i);try{let l=Ue();Rt({...l,mirrorToMessage:i}),k("success",i?"\u5DF2\u542F\u7528\u6B63\u6587\u955C\u50CF":"\u5DF2\u505C\u7528\u6B63\u6587\u955C\u50CF")}catch(l){n.toggleClass("on",a),Be().error("toggle mirrorToMessage \u5F02\u5E38",l),k("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`)}}),t.on("click.tww","[data-link]",function(n){n.preventDefault(),k("info","\u8DF3\u8F6C\u5230\u9884\u8BBE\u7BA1\u7406\u9762\u677F\uFF08\u5F85\u63A5\u5165\uFF09")})}var gc,Vf,Qf=P(()=>{G();Dr();qo();hs();Ba();pn();Gf();Qe();_o();ao();ps();Ls();Ye();Vf=`
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
.yyt-tww-hero-chips { display: flex; gap: 6px; flex-wrap: wrap; padding-left: 42px; }
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
.yyt-tww-table-card-header { display: flex; align-items: center; gap: 8px; }
.yyt-tww-table-card-name { flex: 1; font-size: 13px; font-weight: 700; color: var(--tww-text); }
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
`});var eg={};re(eg,{TableWorkbenchPanel:()=>Zf,default:()=>dT});function cT(){if(!hc)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tww-styles")){hc=!0;return}let r=t.createElement("style");r.id="yyt-tww-styles",r.textContent=Vf,e.appendChild(r),hc=!0}catch(t){bc.warn("\u6CE8\u5165\u5DE5\u4F5C\u53F0\u6837\u5F0F\u5931\u8D25",t)}}var bc,hc,Zf,dT,tg=P(()=>{Ye();G();Qf();bc=C.createScope("TableWorkbenchPanel"),hc=!1;Zf={id:"tableWorkbenchPanel",render(){cT();try{let t=Xf();return Jf(t)}catch(t){return bc.error("\u6E32\u67D3\u5DE5\u4F5C\u53F0 UI \u5F02\u5E38",t),`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u4F5C\u53F0\u6E32\u67D3\u5931\u8D25\uFF1A${t?.message||t}</span></div>`}},bindEvents(t){if(!X()||!ye(t))return;let r=this,s=()=>{try{t.html(r.render()),mc(t,s)}catch(o){bc.error("refresh \u5F02\u5E38",o)}};mc(t,s)},renderTo(t){!X()||!ye(t)||(t.html(this.render()),this.bindEvents(t))}},dT=Zf});var sg={};re(sg,{LoggerPanel:()=>rg,default:()=>gT});function yT(t){switch(t){case le.DEBUG:return"yyt-log-debug";case le.INFO:return"yyt-log-info";case le.WARN:return"yyt-log-warn";case le.ERROR:return"yyt-log-error";default:return""}}function fT(t){let e=new Date(t),r=s=>String(s).padStart(2,"0");return`${r(e.getHours())}:${r(e.getMinutes())}:${r(e.getSeconds())}.${String(e.getMilliseconds()).padStart(3,"0")}`}var uT,pT,rg,gT,og=P(()=>{G();He();Ye();uT="yyt-logger-panel",pT=[{level:null,label:"\u5168\u90E8",icon:"fa-list"},{level:le.DEBUG,label:"DEBUG",icon:"fa-bug"},{level:le.INFO,label:"INFO",icon:"fa-circle-info"},{level:le.WARN,label:"WARN",icon:"fa-triangle-exclamation"},{level:le.ERROR,label:"ERROR",icon:"fa-circle-exclamation"}];rg={id:"loggerPanel",render(){let t=C.getStats();return`
      <div class="yyt-logger-panel" id="${uT}">
        <div class="yyt-logger-toolbar">
          <div class="yyt-logger-filter-btns" data-yyt-log-filter-group>
            ${pT.map((e,r)=>`<button class="yyt-log-filter-btn ${r===0?"yyt-active":""}" data-level="${e.level??""}">
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
    `},bindEvents(t){let e=X();if(!e||!ye(t))return;let r=this,s=null,o=!1,n=[],a=t.find("[data-yyt-log-list]"),i=t.find("[data-yyt-log-search]"),l=t.find("[data-yyt-log-autoscroll]"),d=t.find("[data-yyt-log-pause]");function c(y){if(!y.length){a.html('<div class="yyt-logger-empty">\u6682\u65E0\u5339\u914D\u7684\u65E5\u5FD7\u8BB0\u5F55</div>');return}a.html(y.map(f=>`
        <div class="yyt-log-entry ${yT(f.level)}" data-log-id="${f.id}">
          <span class="yyt-log-time">${fT(f.timestamp)}</span>
          <span class="yyt-log-level">${C.levelLabel(f.level)}</span>
          <span class="yyt-log-scope">${se(f.scope)}</span>
          <span class="yyt-log-msg">${se(f.message)}</span>
          ${f.data!==void 0?`<span class="yyt-log-data">${se(typeof f.data=="object"?JSON.stringify(f.data):String(f.data))}</span>`:""}
        </div>
      `).join(""))}function u(){let y=i.val()?.trim()||"",{entries:f}=C.getEntries({level:s,search:y||void 0,limit:500});c(f),l.is(":checked")&&requestAnimationFrame(()=>{a[0].scrollTop=a[0].scrollHeight})}function p(){if(o||!n.length)return;let y=n;n=[],u()}this._onLogEntry=y=>{if(o||s!==null&&y.level<s)return;let f=i.val()?.trim().toLowerCase()||"";if(f){let g=y.scope.toLowerCase().includes(f),b=y.message.toLowerCase().includes(f);if(!g&&!b)return}n.push(y),n.length>=50?p():this._flushTimer||(this._flushTimer=setTimeout(()=>{this._flushTimer=null,p(),r._updateStats(t)},250))},z.on("logger:entry",this._onLogEntry),t.on("click.yytLogger","[data-yyt-log-filter-group] .yyt-log-filter-btn",y=>{t.find("[data-yyt-log-filter-group] .yyt-log-filter-btn").removeClass("yyt-active"),e(y.currentTarget).addClass("yyt-active");let f=e(y.currentTarget).data("level");s=f===""?null:f,u(),r._updateStats(t)}),i.on("input.yytLogger",()=>{u()}),t.on("click.yytLogger","[data-yyt-log-pause]",()=>{o=!o,d.toggleClass("yyt-active",o),d.html(o?'<i class="fa-solid fa-play"></i> \u7EE7\u7EED':'<i class="fa-solid fa-pause"></i> \u6682\u505C'),o||(n=[],u(),r._updateStats(t))}),t.on("click.yytLogger","[data-yyt-log-clear]",()=>{C.clear(),a.html('<div class="yyt-logger-empty">\u65E5\u5FD7\u5DF2\u6E05\u9664</div>'),r._updateStats(t)}),t.on("click.yytLogger","[data-yyt-log-export]",()=>{let{entries:y}=C.getEntries({limit:1e4}),f=JSON.stringify(y.map(T=>({time:new Date(T.timestamp).toISOString(),level:C.levelLabel(T.level),scope:T.scope,message:T.message,data:T.data})),null,2),g=new Blob([f],{type:"application/json"}),b=URL.createObjectURL(g),v=document.createElement("a");v.href=b,v.download=`yyt-logs-${new Date().toISOString().replace(/[:.]/g,"-")}.json`,v.click(),URL.revokeObjectURL(b)}),u()},_updateStats(t){if(!X()||!ye(t))return;let r=C.getStats(),s=t.find(".yyt-logger-stats");s.length&&s.html(`
      <span class="yyt-logger-stat">\u5171 <strong>${r.total}</strong> \u6761</span>
      ${["ERROR","WARN","INFO","DEBUG"].map(o=>`<span class="yyt-logger-stat yyt-log-${o.toLowerCase()}">${o}: <strong>${r.byLevel[o]||0}</strong></span>`).join("")}
    `)},destroy(t){let e=X();this._onLogEntry&&(z.off("logger:entry",this._onLogEntry),this._onLogEntry=null),this._flushTimer&&(clearTimeout(this._flushTimer),this._flushTimer=null),!(!e||!ye(t))&&t.off(".yytLogger")},getStyles(){return`
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
    `}},gT=rg});var yg={};re(yg,{MAIN_TAB_RENDERERS:()=>Nc,PanelState:()=>li,SCRIPT_ID:()=>Zr,SUB_TAB_RENDERERS:()=>Dc,UIManager:()=>Io,bindDialogEvents:()=>Ao,closeActiveCustomSelectDropdown:()=>Yt,closeCustomSelectDropdown:()=>ui,createDialogHtml:()=>Eo,default:()=>hT,destroyEnhancedCustomSelects:()=>ot,downloadJson:()=>Co,enhanceNativeSelects:()=>Et,escapeHtml:()=>se,fillFormWithConfig:()=>Bm,getAllStyles:()=>pg,getFormApiConfig:()=>Om,getJQuery:()=>X,getTargetDocument:()=>or,initUI:()=>lg,isContainerValid:()=>ye,normalizeCustomSelectOptions:()=>pd,openCustomSelectDropdown:()=>dd,readFileContent:()=>ko,registerComponents:()=>xc,renderApiPanel:()=>wc,renderBypassPanel:()=>Ic,renderCustomSelectControl:()=>yd,renderEscapeTransformToolPanel:()=>Cc,renderLoggerPanel:()=>Pc,renderMainTab:()=>dg,renderPunctuationTransformToolPanel:()=>kc,renderRegexPanel:()=>Tc,renderSettingsPanel:()=>Mc,renderStatusBlockPanel:()=>Ec,renderSubTabComponent:()=>ug,renderSummaryToolPanel:()=>_c,renderTableTemplatePanel:()=>Sc,renderTableWorkbenchPanel:()=>Rc,renderToolPanel:()=>cg,renderWorldbookPresetPanel:()=>vc,renderYouyouReviewPanel:()=>Ac,repositionActiveCustomSelectDropdown:()=>di,resetJQueryCache:()=>Im,showConfirm:()=>nr,showPrompt:()=>zm,showToast:()=>k,showTopNotice:()=>es,toggleCustomSelectDropdown:()=>ud,uiManager:()=>Ot,withButtonLoading:()=>Km});async function ag(t){if(!Ka.has(t)){let e=ng[t];if(typeof e!="function")throw new Error(`unknown_panel:${t}`);Ka.set(t,e().then(r=>{let s=r?.[t]||r?.default;if(!s?.id)throw new Error(`invalid_panel:${t}`);return s}).catch(r=>{throw Ka.delete(t),r}))}return Ka.get(t)}function ig(t,e=null){let r=e?.message?`\uFF1A${se(e.message)}`:"";return`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>${se(t)}${r}</span></div>`}async function xc(){let t=await Promise.allSettled(Object.keys(ng).map(async r=>{let s=await ag(r);return Ot.register(s.id,s),s.id})),e=t.filter(r=>r.status==="rejected");e.length&&e.forEach(r=>hn.error("\u7EC4\u4EF6\u6CE8\u518C\u5931\u8D25",r.reason)),hn.log(`\u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210\uFF0C\u6210\u529F ${t.length-e.length} \u4E2A\uFF0C\u5931\u8D25 ${e.length} \u4E2A`)}async function lg(t={}){let{autoInjectStyles:e=!0,targetDocument:r,...s}=t;Ot.init(s),await xc(),e&&Ot.injectStyles(r),hn.log("\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}async function mT(t){let e=await ag(t);return Ot.getComponent(e.id)||Ot.register(e.id,e),e}async function ut(t,e,r={}){let s=await mT(t);Ot.render(s.id,e,r)}function wc(t){return ut("ApiPresetPanel",t)}function vc(t){return ut("WorldbookPresetPanel",t)}function Tc(t){return ut("RegexExtractPanel",t)}function Sc(t){return ut("TableTemplatePanel",t)}function cg(t){return ut("ToolManagePanel",t)}function _c(t){return ut("SummaryToolPanel",t)}function Ec(t){return ut("StatusBlockPanel",t)}function Ac(t){return ut("YouyouReviewPanel",t)}function Cc(t){return ut("EscapeTransformToolPanel",t)}function kc(t){return ut("PunctuationTransformToolPanel",t)}function Ic(t){return ut("BypassPanel",t)}function Mc(t){return ut("SettingsPanel",t)}function Rc(t){return ut("TableWorkbenchPanel",t)}function Pc(t){return ut("LoggerPanel",t)}async function dg(t,e){let r=Nc[t];if(!r)return!1;try{await r.render(e)}catch(s){hn.error(r.failMessage,s),e.html(ig(r.failMessage,s))}return!0}async function ug(t,e){let r=Dc[t];if(!r)return null;try{await r.render(e)}catch(s){hn.error(r.failMessage,s),e.html(ig(r.failMessage,s))}return t}function pg(){return Ot.getAllStyles()}var hn,ng,Ka,Nc,Dc,hT,fg=P(()=>{G();pi();Ye();Ye();pi();hn=C.createScope("UI"),ng=Object.freeze({ApiPresetPanel:()=>Promise.resolve().then(()=>(Pd(),Rd)),WorldbookPresetPanel:()=>Promise.resolve().then(()=>(Gd(),Yd)),RegexExtractPanel:()=>Promise.resolve().then(()=>(Qu(),Xu)),TableTemplatePanel:()=>Promise.resolve().then(()=>(ey(),Zp)),ToolManagePanel:()=>Promise.resolve().then(()=>(sy(),ry)),SummaryToolPanel:()=>Promise.resolve().then(()=>(Cy(),Ay)),StatusBlockPanel:()=>Promise.resolve().then(()=>(My(),Iy)),YouyouReviewPanel:()=>Promise.resolve().then(()=>(Ny(),Py)),EscapeTransformToolPanel:()=>Promise.resolve().then(()=>(Oy(),$y)),PunctuationTransformToolPanel:()=>Promise.resolve().then(()=>(Ky(),zy)),BypassPanel:()=>Promise.resolve().then(()=>(jy(),Wy)),SettingsPanel:()=>Promise.resolve().then(()=>(ql(),Gl)),TableWorkbenchPanel:()=>Promise.resolve().then(()=>(tg(),eg)),LoggerPanel:()=>Promise.resolve().then(()=>(og(),sg))}),Ka=new Map;Nc=Object.freeze({tableWorkbench:{render:t=>Rc(t),failMessage:"\u586B\u8868\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25"},bypass:{render:t=>Ic(t),failMessage:"Ai\u6307\u4EE4\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},settings:{render:t=>Mc(t),failMessage:"\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},logger:{render:t=>Pc(t),failMessage:"\u65E5\u5FD7\u9762\u677F\u52A0\u8F7D\u5931\u8D25"}}),Dc=Object.freeze({ApiPresetPanel:{render:t=>wc(t),failMessage:"API \u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},RegexExtractPanel:{render:t=>Tc(t),failMessage:"\u6B63\u5219\u63D0\u53D6\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},WorldbookPresetPanel:{render:t=>vc(t),failMessage:"\u4E16\u754C\u4E66\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},TableTemplatePanel:{render:t=>Sc(t),failMessage:"\u8868\u683C\u6A21\u677F\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},SummaryToolPanel:{render:t=>_c(t),failMessage:"\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},StatusBlockPanel:{render:t=>Ec(t),failMessage:"\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25"},YouyouReviewPanel:{render:t=>Ac(t),failMessage:"\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25"},EscapeTransformToolPanel:{render:t=>Cc(t),failMessage:"\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},PunctuationTransformToolPanel:{render:t=>kc(t),failMessage:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"}});hT={uiManager:Ot,registerComponents:xc,initUI:lg,renderApiPanel:wc,renderWorldbookPresetPanel:vc,renderRegexPanel:Tc,renderTableTemplatePanel:Sc,renderToolPanel:cg,renderSummaryToolPanel:_c,renderStatusBlockPanel:Ec,renderYouyouReviewPanel:Ac,renderEscapeTransformToolPanel:Cc,renderPunctuationTransformToolPanel:kc,renderBypassPanel:Ic,renderSettingsPanel:Mc,renderTableWorkbenchPanel:Rc,renderLoggerPanel:Pc,MAIN_TAB_RENDERERS:Nc,SUB_TAB_RENDERERS:Dc,renderMainTab:dg,renderSubTabComponent:ug,getAllStyles:pg}});var wg={};re(wg,{TX_PHASE:()=>$t,ToolAutomationService:()=>Wa,Transaction:()=>Ua,default:()=>TT,toolAutomationService:()=>xg});function ce(t){return t==null?"":String(t).trim()}function gg(t){let e=ma(t);return ce(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.chat_filename??t?.this_chid??"chat_default")||"chat_default"}function Lc(t){let e=ma(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function bg(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="user"||e==="system"?!1:e==="assistant"||e==="ai"||!e}function bT(t,e){let r=ce(e);if(!r)return null;let s=Lc(t);for(let o=s.length-1;o>=0;o-=1){let n=s[o];if([n?.messageId,n?.message_id,n?.id,n?.mid,n?.mesid,n?.chat_index,o].map(i=>ce(i)).includes(r))return n||null}return null}function mg(t){let e=Lc(t);if(!Array.isArray(e)||e.length===0)return null;let r=e.length-1,s=e[r]||null;if(!bg(s))return null;let o=ce(s?.messageId??s?.message_id??s?.id??s?.mid??s?.mesid??s?.chat_index??r);return o?{messageId:o,swipeId:ce(s?.swipeId??s?.swipe_id??s?.swipe??s?.swipeIndex),message:s}:null}function vT(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${t}_${e}`}var ze,hg,xT,wT,$t,Ua,Wa,xg,TT,vg=P(()=>{sn();G();Ll();Qt();on();Ol();as();Ba();Dr();ze=C.createScope("ToolAutomation");hg=1e4,xT=15e3,wT=800;$t=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),Ua=class{constructor({chatId:e,messageId:r,swipeId:s,sourceEvent:o,generationKey:n}){this.traceId=vT(),this.chatId=e||"",this.messageId=r||"",this.swipeId=s||"",this.sourceEvent=o||"",this.generationKey=n||"",this.phase=$t.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,r={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,r),this}toSnapshot(){return{...this}}},Wa=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._recentlyProcessedSlots=new Map,this._ownWriteMessageIds=new Map,this._slotQueues=new Map,this._activeTransactions=new Map,this._isProcessing=!1,this._currentChatId="",this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""},this._messageReceivedThrottleUntil=0}setDebugMode(e){this.debugMode=e===!0}init(e={}){this.stop(),this._hostBindingStatus.lastInitAt=Date.now(),this._hostBindingStatus.initAttempts=(this._hostBindingStatus.initAttempts||0)+1;let r=zr();this._currentChatId=gg(r);let s=(o,...n)=>{let a=zr(),{messageId:i,swipeId:l}=this._extractIdentitiesFromArgs(n);if(ze.debug(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${o}"`,{messageId:i,swipeId:l,argCount:n.length}),o===We.MESSAGE_RECEIVED){let g=Date.now();if(g<this._messageReceivedThrottleUntil){ze.debug(`MESSAGE_RECEIVED \u5728\u8282\u6D41\u7A97\u53E3\u5185\uFF0C\u8DF3\u8FC7\uFF08\u5269\u4F59 ${this._messageReceivedThrottleUntil-g}ms\uFF09`);return}this._messageReceivedThrottleUntil=g+this._getSettleMs()+5e3}let d=null,c=i,u=l;if(c&&(d=bT(a,c)),!d){let g=mg(a);g?.messageId&&(d=g.message,c=g.messageId,u=g.swipeId||u)}if(!c||!d){ze.debug(`\u4E8B\u4EF6 "${o}" \u65E0 assistant \u76EE\u6807\uFF0C\u8DF3\u8FC7`);return}if(!bg(d)){ze.debug(`\u4E8B\u4EF6 "${o}" \u547D\u4E2D\u975E assistant \u6D88\u606F\uFF0C\u8DF3\u8FC7`,{messageId:c});return}let p=String(d.content||d.mes||"").trim();if(!p||p.length<5){ze.debug(`\u4E8B\u4EF6 "${o}" \u6D88\u606F\u8FC7\u77ED\uFF08${p.length} \u5B57\u7B26\uFF09\uFF0C\u8DF3\u8FC7`);return}if(this._isProcessing){ze.debug(`\u4E8B\u4EF6 "${o}" \u6B63\u5728\u5904\u7406\u4E2D\uFF0C\u8DF3\u8FC7`);return}if(this._isOwnWrite(c)){ze.debug(`\u4E8B\u4EF6 "${o}" \u547D\u4E2D own-write \u9ED1\u540D\u5355\uFF0C\u8DF3\u8FC7`,{messageId:c});return}let y=ce(d?.swipeId??d?.swipe_id??d?.swipe??d?.swipeIndex);y&&(u=y);let f=`${c}::${u}`;if(this._isRecentlyProcessed(f)){ze.debug(`\u4E8B\u4EF6 "${o}" slot \u5DF2\u8FD1\u671F\u5904\u7406\u8FC7\uFF0C\u8DF3\u8FC7`,{slotKey:f});return}this._scheduleMessageProcessing(c,u,{settleMs:this._getSettleMs(),sourceEvent:o}),ze.info(`\u4E8B\u4EF6 "${o}" \u901A\u8FC7\u6240\u6709\u5B88\u536B\uFF0C\u5DF2\u8C03\u5EA6\u5904\u7406`,{targetMessageId:c,targetSwipeId:u,throttleUntil:this._messageReceivedThrottleUntil,isProcessing:this._isProcessing})};return this._stopCallbacks.push(Dt.subscribe(We.MESSAGE_SENT,()=>{ze.debug("MESSAGE_SENT \u2192 \u6E05\u7406\u8C03\u5EA6\u961F\u5217"),this._pendingTimers.forEach(o=>clearTimeout(o)),this._pendingTimers.clear()})),this._stopCallbacks.push(Dt.subscribe(We.MESSAGE_RECEIVED,(...o)=>{s(We.MESSAGE_RECEIVED,...o)})),this._stopCallbacks.push(Dt.subscribe(We.GENERATION_STOPPED,()=>{ze.info("GENERATION_STOPPED \u2192 \u53D6\u6D88\u6240\u6709\u6D3B\u8DC3\u4E8B\u52A1"),this._cancelActiveTransactions("generation_stopped"),this._pendingTimers.forEach(o=>clearTimeout(o)),this._pendingTimers.clear(),this._isProcessing=!1})),this._stopCallbacks.push(Dt.subscribe(We.CHAT_CHANGED,()=>{this._resetForChatChange()})),this._stopCallbacks.push(Dt.subscribe(We.MESSAGE_DELETED,o=>{this._clearMessageState(ce(o))})),this._refreshHostBindingStatus(),this._seedKnownSlots(),ze.info("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{chatId:this._currentChatId,source:this._hostBindingStatus.source}),!0}_seedKnownSlots(){try{let e=zr(),r=mg(e);if(!r?.messageId)return;let s=`${ce(r.messageId)}::${ce(r.swipeId)}`;this._recentlyProcessedSlots.set(s,Number.MAX_SAFE_INTEGER),ze.debug(`\u5DF2\u5C06\u5F53\u524D\u6700\u65B0 slot "${s}" \u9884\u6807\u8BB0\u4E3A\u5DF2\u77E5\uFF0C\u8DF3\u8FC7 MESSAGE_RECEIVED \u91CD\u653E`)}catch(e){ze.warn("_seedKnownSlots \u5931\u8D25",{error:e})}}_refreshHostBindingStatus(){let e=Dt.describe(),r=[We.MESSAGE_SENT,We.MESSAGE_RECEIVED,We.GENERATION_STOPPED,We.CHAT_CHANGED,We.MESSAGE_DELETED];this._hostBindingStatus={...this._hostBindingStatus,initialized:!!e.hasBridge,lastInitResult:e.hasBridge?"ready":e.retryScheduled?"pending_retry":"pending",source:e.source,hasEventSource:!!e.hasBridge,hasEventTypes:Array.isArray(e.availableEvents)&&e.availableEvents.length>0,eventBindings:r.map(s=>`subscribed: ${s}`),retryScheduled:!!e.retryScheduled,retryDelayMs:0,lastError:""}}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(r){ze.warn("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",{error:r})}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("service_stopped"),this._activeTransactions.clear(),this._isProcessing=!1,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""}}isEnabled(){return!0}getRuntimeSnapshot(){return this._pruneRecentSlots(),this._pruneOwnWrites(),this._refreshHostBindingStatus(),{currentChatId:this._currentChatId,enabled:!0,isProcessing:this._isProcessing,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,recentlyProcessedSlotCount:this._recentlyProcessedSlots.size,ownWriteMessageIdCount:this._ownWriteMessageIds.size,activeTransactionCount:this._activeTransactions.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),hostBinding:{...this._hostBindingStatus,eventBindings:Array.isArray(this._hostBindingStatus?.eventBindings)?[...this._hostBindingStatus.eventBindings]:[]},settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let r=await ns({messageId:"",swipeId:"",runSource:"AUTO"}),s=ce(r?.sourceMessageId||r?.messageId);return s?this.processAssistantMessage(s,{force:e.force===!0,swipeId:ce(r?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:r=!1,swipeId:s="",sourceEvent:o="AUTO"}={}){let n=new Ua({chatId:this._currentChatId,messageId:e,swipeId:s,sourceEvent:o});try{if(!e)return this._skipTransaction(n,"missing_message_id");n.transition($t.CONFIRMED);let a=await ns({messageId:e,swipeId:s,runSource:"AUTO"}),i=a?.targetAssistantMessage||null;if(!i||!a?.sourceMessageId)return this._skipTransaction(n,"assistant_message_not_found");let l=String(i.content||i.mes||"").trim();if(!l||l.length<5)return this._skipTransaction(n,"assistant_message_too_short");n.transition($t.CONTEXT_BUILT);let d=`${ce(a.sourceMessageId)}::${ce(a.sourceSwipeId||s)}`;if(n.generationKey=d,!r&&this._isRecentlyProcessed(d))return this._skipTransaction(n,"duplicate_slot",{slotKey:d});let c=Bo(),u=vt.filterAutoPostResponseTools(c),y=[...c.filter(b=>vt.shouldRunLocalTransform(b)&&b.output?.autoTrigger!==!1),...u],f=Ue(),g=f?.autoUpdateEnabled===!0&&ce(f?.autoUpdateTrigger||"assistantMessage")==="assistantMessage";return!y.length&&!g?this._skipTransaction(n,"no_auto_tools",{tools:y}):(n.slotKey=d,n.slotRevisionKey=a.slotRevisionKey||"",n.sourceMessageId=a.sourceMessageId||e,n.sourceSwipeId=a.sourceSwipeId||s||"",this._enqueueSlot(d,async()=>{if(!r&&this._isRecentlyProcessed(d))return this._skipTransaction(n,"duplicate_slot_after_queue",{slotKey:d});this._isProcessing=!0,this._markSlotProcessed(d),n.transition($t.REQUEST_STARTED);let b=new AbortController;this._registerActiveTransaction(n,{controller:b,slotKey:d,sourceMessageId:a.sourceMessageId||e,sourceSwipeId:a.sourceSwipeId||s||""});try{let{results:v,hasWriteback:T}=await this._executeAutoTools(y,a,b,n,{slotKey:d,messageId:e,swipeId:s}),{tableResult:w,hasWriteback:B}=await this._executeAutoTableUpdate(a,b,n,{shouldRunTableAuto:g,tableWorkbenchConfig:f,messageId:e,swipeId:s,sourceEvent:o}),R=T||B;n.transition($t.REQUEST_FINISHED,{toolResults:v,tableResult:w}),R&&(n.transition($t.WRITEBACK_STARTED),n.writebackState={messageId:a.sourceMessageId,swipeId:a.sourceSwipeId,hasOutput:!0},this._messageReceivedThrottleUntil=Date.now()+xT),this._markSlotProcessed(d);let S=v.every(A=>A?.success!==!1),_=!g||!!w?.success||w?.skipped===!0||w?.meta?.aborted===!0||w?.meta?.stale===!0,F=S&&_,W=v.some(A=>A?.meta?.aborted===!0||A?.meta?.stale===!0||A?.error==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")||w?.meta?.aborted===!0||w?.meta?.stale===!0;F&&n.transition($t.WRITEBACK_COMMITTED);let D=F?$t.REFRESH_CONFIRMED:$t.FAILED;return n.transition(D,{verdict:W?"aborted":F?"success":"partial_failure"}),this._recordTransaction(n),this._updateAutoRuntimeForResults(y,a,n,v),{success:F,traceId:n.traceId,slotKey:d,sourceEvent:o,messageId:a.sourceMessageId||e,phase:n.phase,results:v,tableResult:w}}finally{this._unregisterActiveTransaction(n.traceId),this._isProcessing=!1}}))}catch(a){return n.transition($t.FAILED,{error:a?.message||String(a)}),this._recordTransaction(n),this._unregisterActiveTransaction(n.traceId),this._isProcessing=!1,ze.error("processAssistantMessage \u5F02\u5E38",{error:a}),{success:!1,traceId:n.traceId,error:n.error,phase:n.phase}}}_extractIdentitiesFromArgs(e){let r="",s="";for(let o of e)if(o!=null){if(typeof o=="number"&&Number.isFinite(o)&&!r){r=ce(o);continue}if(typeof o=="string"){let n=ce(o);!r&&/^\d+$/.test(n)&&(r=n);continue}typeof o=="object"&&(r||(r=ce(o.messageId??o.message_id??o.id??o.mid??o.mesid??o.chat_index??o.message?.messageId??o.message?.message_id??o.message?.id??o.message?.mid??o.message?.mesid??o.message?.chat_index??o.data?.messageId??o.data?.message_id??o.data?.id??o.data?.mid??o.data?.mesid??o.data?.chat_index??o.target?.messageId??o.target?.message_id??o.target?.id??o.target?.mid??o.target?.mesid??o.target?.chat_index)),s||(s=ce(o.swipeId??o.swipe_id??o.swipe??o.swipeIndex??o.currentSwipe??o.message?.swipeId??o.message?.swipe_id??o.message?.swipe??o.data?.swipeId??o.data?.swipe_id??o.data?.swipe??o.target?.swipeId??o.target?.swipe_id??o.target?.swipe)))}return{messageId:r,swipeId:s}}_scheduleMessageProcessing(e,r="",s={}){let o=s.settleMs??this._getSettleMs(),n=`msg::${ce(e)}::${ce(r)}`,a=this._pendingTimers.get(n);a&&clearTimeout(a);let i=setTimeout(()=>{this._pendingTimers.delete(n),this.processAssistantMessage(e,{swipeId:r,sourceEvent:s.sourceEvent||"AUTO"}).catch(l=>{ze.error("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:l})})},Math.max(0,o));this._pendingTimers.set(n,i),ze.info("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:n,settleMs:o,sourceEvent:s.sourceEvent})}cancelAutomation(e={}){let r=e.reason||"manual_cancel",s=ce(e.messageId),o=ce(e.slotKey),n=ce(e.traceId),a=0;for(let[i,l]of this._pendingTimers){let d=s&&i.includes(`::${s}::`),c=o&&i.includes(o);(d||c||!s&&!o&&!n)&&(clearTimeout(l),this._pendingTimers.delete(i),a+=1)}return a+=this._cancelActiveTransactions(r,{messageId:s,slotKey:o,traceId:n}),{success:a>0,cancelledCount:a,reason:r}}_isRecentlyProcessed(e){if(!e)return!1;this._pruneRecentSlots();let r=this._recentlyProcessedSlots.get(e);return r?Date.now()-r<this._getDedupeWindowMs():!1}_markSlotProcessed(e){e&&(this._recentlyProcessedSlots.set(e,Date.now()),this._pruneRecentSlots())}_pruneRecentSlots(){let e=Date.now()-this._getDedupeWindowMs();for(let[r,s]of this._recentlyProcessedSlots)(!Number.isFinite(s)||s<e)&&this._recentlyProcessedSlots.delete(r)}async _executeAutoTools(e,r,s,o,{slotKey:n,messageId:a,swipeId:i}){let l=[],d=!1,c=r.lastAiMessage,u=r.assistantBaseText;for(let p of e){let y={...r,signal:s.signal,isAutoRun:!0,abortMeta:{traceId:o.traceId,slotKey:n,sourceMessageId:r.sourceMessageId||a,sourceSwipeId:r.sourceSwipeId||i||""},shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:o.traceId}),skipNotify:!0,lastAiMessage:c,assistantBaseText:u,input:{...r.input||{},lastAiMessage:c,assistantBaseText:u}},g=vt.shouldRunLocalTransform(p)?await Ea(p,y):await vt.runToolPostResponse(p,y);if(l.push(g),g?.writebackState||g?.output){d=!0,this._markOwnWrite(r.sourceMessageId||a);let b=this._readCurrentMessageText(r.sourceMessageId||a);if(b){c=b,u=b;let v=Number(r.sourceMessageId||a);Array.isArray(r.chatMessages)&&r.chatMessages[v]&&(r.chatMessages[v].content=b,r.chatMessages[v].mes=b)}}}return{results:l,hasWriteback:d}}async _executeAutoTableUpdate(e,r,s,{shouldRunTableAuto:o,tableWorkbenchConfig:n,messageId:a,swipeId:i,sourceEvent:l}){if(!o)return{tableResult:null,hasWriteback:!1};let d=await Bf({messageId:e.sourceMessageId||a,swipeId:e.sourceSwipeId||i||"",sourceEvent:l,configInput:n,signal:r.signal,shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:s.traceId})}),c=!!(d?.state||d?.mirrorResult?.success===!0);return c&&this._markOwnWrite(e.sourceMessageId||a),{tableResult:d,hasWriteback:c}}_readCurrentMessageText(e){let r=zr(),s=Lc(r),o=Number(e);if(!Number.isFinite(o)||o<0||o>=s.length)return"";let n=s[o];return String(n?.mes||n?.content||"").trim()}_markOwnWrite(e){let r=ce(e);r&&(this._ownWriteMessageIds.set(r,Date.now()),this._pruneOwnWrites())}_isOwnWrite(e){let r=ce(e);if(!r)return!1;this._pruneOwnWrites();let s=this._ownWriteMessageIds.get(r);return s?Date.now()-s<hg:!1}_pruneOwnWrites(){let e=Date.now()-hg;for(let[r,s]of this._ownWriteMessageIds)(!Number.isFinite(s)||s<e)&&this._ownWriteMessageIds.delete(r)}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),ze.debug(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,r,s={}){return e.transition($t.SKIPPED,{verdict:r,...s}),this._recordTransaction(e),Array.isArray(s?.tools)&&s.tools.length>0&&this._updateAutoRuntimeForSkip(s.tools,e,r,s),{success:!1,skipped:!0,reason:r,traceId:e.traceId,...s}}_enqueueSlot(e,r){let o=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(r).finally(()=>{this._slotQueues.get(e)===o&&this._slotQueues.delete(e)});return this._slotQueues.set(e,o),o}_registerActiveTransaction(e,r={}){e?.traceId&&this._activeTransactions.set(e.traceId,{traceId:e.traceId,generationKey:r.generationKey||e.generationKey||"",slotKey:r.slotKey||e.slotKey||"",sourceMessageId:r.sourceMessageId||e.sourceMessageId||"",sourceSwipeId:r.sourceSwipeId||e.sourceSwipeId||"",slotRevisionKey:r.slotRevisionKey||e.slotRevisionKey||"",assistantBaseFingerprint:r.assistantBaseFingerprint||"",assistantBaseText:r.assistantBaseText||"",controller:r.controller||null,cancelled:!1,cancelReason:""})}_unregisterActiveTransaction(e){e&&this._activeTransactions.delete(e)}_cancelActiveTransactions(e="manual_cancel",r={}){let s=ce(r.messageId),o=ce(r.slotKey),n=ce(r.traceId),a=0;for(let[i,l]of this._activeTransactions){let d=n&&i===n,c=s&&ce(l?.sourceMessageId)===s,u=o&&ce(l?.slotKey)===o;if(!(!d&&!c&&!u&&!(!n&&!s&&!o))){l.cancelled=!0,l.cancelReason=e;try{l?.controller?.abort?.()}catch{}a+=1}}return a}_shouldAbortAutoWriteback(e={}){let r=ce(e.traceId);if(r){let s=this._activeTransactions.get(r);if(!s||s.cancelled)return{aborted:!0,reason:"cancelled_before_host_commit"}}return!1}_updateAutoRuntimeForSkip(e,r,s,o={}){e.forEach(n=>{n?.id&&Nr(n.id,{lastAutoRunAt:Date.now(),lastAutoStatus:"skipped",lastAutoMessageId:r?.sourceMessageId||r?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||r?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||o?.slotRevisionKey||"",lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:!1,lastAutoSkipReason:s||""},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_updateAutoRuntimeForResults(e,r,s,o=[]){e.forEach((n,a)=>{if(!n?.id)return;let i=o[a]||{},l=i?.meta?.writebackDetails||{},d=i?.meta?.aborted===!0||i?.meta?.stale===!0?"aborted":i?.success===!1?"failed":"success",c=i?.meta?.aborted===!0?i?.meta?.abortReason||(i?.meta?.stale===!0?"stale_base_changed":"cancelled_before_host_commit"):"";Nr(n.id,{lastAutoRunAt:Date.now(),lastAutoStatus:d,lastAutoMessageId:r?.sourceMessageId||s?.sourceMessageId||s?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||s?.sourceSwipeId||s?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||s?.slotRevisionKey||"",lastAutoWritebackStatus:i?.meta?.writebackStatus||"",lastAutoRefreshConfirmed:!!l.refreshConfirmed,lastAutoSkipReason:c},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_resetForChatChange(){let e=zr(),r=gg(e);ze.info("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:r}),this._currentChatId=r,this._pendingTimers.forEach(s=>clearTimeout(s)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("chat_changed"),this._activeTransactions.clear(),this._isProcessing=!1,this._messageReceivedThrottleUntil=0,this._seedKnownSlots()}_clearMessageState(e){if(e){for(let[r,s]of this._pendingTimers)(r.includes(`::${e}::`)||r.startsWith(`msg::${e}::`))&&(clearTimeout(s),this._pendingTimers.delete(r));for(let r of this._recentlyProcessedSlots.keys())r.startsWith(`${e}::`)&&this._recentlyProcessedSlots.delete(r);this._ownWriteMessageIds.delete(ce(e)),this._seedKnownSlots()}}_getAutomationSettings(){let e=Nt.getSettings()?.automation||{},r=Number.isFinite(e.settleMs)?e.settleMs:wT;return{settleMs:r,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(5e3,r+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}},xg=new Wa,TT=xg});var Eg={};re(Eg,{BUILTIN_REGEX_PRESETS:()=>Fa,BUILTIN_WORLDBOOK_PRESETS:()=>$c,MIGRATION_BACKUP_KEY:()=>Sg,MIGRATION_DONE_KEY:()=>ja,default:()=>AT,ensurePresetSystem:()=>_g,registerBuiltinPresets:()=>Oc,runMigrationOnce:()=>Bc});function ST(t){if(!Array.isArray(t)||t.length===0)return null;let e=t.map(r=>String(r||"").trim()).filter(Boolean).sort().join("|");if(!e)return null;for(let r of Fa)if(r.rules.filter(o=>o.type==="include"&&o.enabled!==!1).map(o=>o.value).sort().join("|")===e)return r.id;return null}function Oc(){try{typeof qi=="function"&&qi(Fa),typeof Ti=="function"&&Ti($c),Fr.info("\u5185\u7F6E\u9884\u8BBE\u5DF2\u6CE8\u518C",{regex:Fa.length,worldbook:$c.length})}catch(t){Fr.error("\u6CE8\u518C\u5185\u7F6E\u9884\u8BBE\u5931\u8D25",{error:t})}}function _T(t){let e=new Set,r=[];for(let s of Array.isArray(t)?t:[]){let o=String(s||"").trim();if(!(!o||e.has(o)))if(e.add(o),o.startsWith("regex:")){let n=o.slice(6).trim();n&&r.push({type:"regex_include",value:n,enabled:!0,name:"",description:""})}else r.push({type:"include",value:o,enabled:!0,name:"",description:""})}return r}function ET(t,e,r){let s=JSON.parse(JSON.stringify(r||{})),o=!1,n=s.extraction||{};if(!n.regexPresetId){let i=Array.isArray(n.selectors)?n.selectors:[];if(i.length>0){let l=ST(i);if(l)n.regexPresetId=l,o=!0,Fr.info(`\u5DE5\u5177 ${t} \u7ED1\u5B9A\u5185\u7F6E\u6B63\u5219\u9884\u8BBE: ${l}`);else{let d=qn({name:`${e||t}_\u8FC1\u79FB_\u6B63\u5219`,description:`\u81EA\u8001\u7248\u672C selectors \u81EA\u52A8\u8FC1\u79FB\uFF08${i.length} \u9879\uFF09`,rules:_T(i),blacklist:[]});d?.id&&(n.regexPresetId=d.id,o=!0,Fr.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u6B63\u5219\u9884\u8BBE: ${d.id}`))}s.extraction=n}}let a=s.worldbooks||{};if(!a.presetId&&a.enabled===!0&&Array.isArray(a.selected)&&a.selected.length>0){let i=Ln({name:`${e||t}_\u8FC1\u79FB_\u4E16\u754C\u4E66`,description:`\u81EA\u8001\u7248\u672C worldbooks.selected \u81EA\u52A8\u8FC1\u79FB\uFF08${a.selected.length} \u672C\uFF09`,bindingMode:"custom",includeDisabled:!1,bookList:a.selected.map(l=>({bookName:String(l||""),enabled:!0,entryOverrides:{}})).filter(l=>l.bookName)});i?.id&&(a.presetId=i.id,o=!0,Fr.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u4E16\u754C\u4E66\u9884\u8BBE: ${i.id}`)),s.worldbooks=a}return o?s:null}function Bc(){try{if(we.get(ja)===!0)return{skipped:!0,reason:"already_done"};let t=N.get(Tg)||{};if(!t||typeof t!="object")return Fr.info("\u65E0\u5DE5\u5177\u914D\u7F6E\u9700\u8981\u8FC1\u79FB"),we.set(ja,!0),{skipped:!0,reason:"no_configs"};we.set(Sg,{ts:Date.now(),version:"v45",snapshot:t});let e=0,r={...t};for(let[s,o]of Object.entries(t)){if(!o||typeof o!="object")continue;let n=ET(s,o.name,o);n&&(r[s]=n,e+=1)}return e>0&&N.set(Tg,r),we.set(ja,!0),Fr.info("\u8FC1\u79FB\u5B8C\u6210",{migratedCount:e,total:Object.keys(t).length}),{skipped:!1,migratedCount:e,total:Object.keys(t).length}}catch(t){return Fr.error("\u8FC1\u79FB\u5931\u8D25\uFF0C\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559",{error:t}),{skipped:!1,error:t?.message||String(t),aborted:!0}}}function _g(){return Oc(),Bc()}var Fr,ja,Sg,Tg,Fa,$c,AT,Ag=P(()=>{$e();G();ps();Ls();Fr=C.createScope("PresetBootstrap"),ja="migration_v45_done",Sg="migration_v45_backup",Tg="tool_configs",Fa=[{id:"builtin_regex_summary",name:"\u5185\u7F6E \xB7 \u603B\u7ED3\u63D0\u53D6",description:"\u63D0\u53D6 <boo_FM> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u8BB0\u5FC6\u538B\u7F29\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_summary_1",type:"include",value:"boo_FM",enabled:!0,name:"\u603B\u7ED3\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_status_block",name:"\u5185\u7F6E \xB7 \u72B6\u6001\u680F\u63D0\u53D6",description:"\u63D0\u53D6 <status_block> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u72B6\u6001\u680F\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_status_1",type:"include",value:"status_block",enabled:!0,name:"\u72B6\u6001\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_youyou",name:"\u5185\u7F6E \xB7 \u4F18\u4F18\u9510\u8BC4\u63D0\u53D6",description:"\u63D0\u53D6 <youyou> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u4F18\u4F18\u9510\u8BC4\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_youyou_1",type:"include",value:"youyou",enabled:!0,name:"\u4F18\u4F18\u6807\u7B7E",description:""}],blacklist:[]}],$c=[];AT={registerBuiltinPresets:Oc,runMigrationOnce:Bc,ensurePresetSystem:_g}});var Kc={};re(Kc,{confirmDeleteTool:()=>PT,confirmResetTools:()=>LT,getAllTools:()=>Vt,getTool:()=>Jt,showExportToolsDialog:()=>NT,showImportToolsDialog:()=>DT,showToolEditDialog:()=>RT});async function RT(t=null){let e=t?Jt(t):null,r=!!e,s=Je({value:e?.name||"",placeholder:"\u5DE5\u5177\u540D\u79F0"}),o=Ge({value:e?.category||"utility",options:MT}),n=Je({value:e?.description||"",placeholder:"\u5DE5\u5177\u63CF\u8FF0"}),a=m("input",{className:"yyt-input",attrs:{type:"number",min:"1000"},style:{padding:"7px 10px",fontSize:"12px"}});a.value=String(e?.config?.execution?.timeout||6e4);let i=m("input",{className:"yyt-input",attrs:{type:"number",min:"0",max:"10"},style:{padding:"7px 10px",fontSize:"12px"}});i.value=String(e?.config?.execution?.retries??3);function l(y,f,g=""){let b=m("div",{className:"yyt-form-group",style:{margin:"0 0 12px 0"}});return b.appendChild(m("label",{text:y,style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))",display:"block",marginBottom:"4px"}})),b.appendChild(f),g&&b.appendChild(m("div",{text:g,style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginTop:"4px"}})),b}let d=m("div",{style:{display:"flex",flexDirection:"column"}}),c=m("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});c.appendChild(l("\u5DE5\u5177\u540D\u79F0",s.el)),c.appendChild(l("\u5206\u7C7B",o.el)),d.appendChild(c),d.appendChild(l("\u63CF\u8FF0",n.el));let u=m("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});u.appendChild(l("\u8D85\u65F6\u65F6\u95F4 (ms)",a)),u.appendChild(l("\u91CD\u8BD5\u6B21\u6570",i)),d.appendChild(u);let p=Ee.custom({title:r?`\u7F16\u8F91\u5DE5\u5177\u300C${e.name}\u300D`:"\u65B0\u5EFA\u5DE5\u5177",width:"480px",body:d,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:y=>y(null)},{label:r?"\u4FDD\u5B58":"\u521B\u5EFA",variant:"primary",onClick:y=>{let f=String(s.get()||"").trim();if(!f){s.el.focus();return}let g=t||`tool_${Date.now()}`;if(!Us(g,{name:f,category:o.get(),description:String(n.get()||"").trim(),promptTemplate:e?.promptTemplate||"",extractTags:Array.isArray(e?.extractTags)?e.extractTags:[],config:{execution:{timeout:Math.max(1e3,parseInt(a.value,10)||6e4),retries:Math.max(0,parseInt(i.value,10)||3)},api:e?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(e?.config?.messages)?e.config.messages:[],context:{depth:e?.config?.context?.depth||3,includeTags:Array.isArray(e?.config?.context?.includeTags)?e.config.context.includeTags:[],excludeTags:Array.isArray(e?.config?.context?.excludeTags)?e.config.context.excludeTags:[]},worldbooks:{enabled:e?.config?.worldbooks?.enabled===!0,selected:Array.isArray(e?.config?.worldbooks?.selected)?e.config.worldbooks.selected:[]}},enabled:e?.enabled!==!1})){zc.warn("saveTool \u5931\u8D25",{id:g});return}try{Gs(g)}catch(v){zc.warn("ensureToolRuntimeConfig \u5F02\u5E38",{err:v})}y(g)}}]});return setTimeout(()=>s.el.focus(),0),p.result}async function PT(t){let e=Jt(t);return!e||!await Ee.confirm({title:"\u5220\u9664\u5DE5\u5177",message:`\u786E\u5B9A\u5220\u9664\u5DE5\u5177\u300C${e.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})?!1:Ws(t)}function NT(){let t;try{t=js()}catch(r){Ee.confirm({title:"\u5BFC\u51FA\u5931\u8D25",message:String(r?.message||r),confirmText:"\u786E\u5B9A"});return}let e=m("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});e.value=t,e.readOnly=!0,Ee.custom({title:"\u5BFC\u51FA\u5DE5\u5177 JSON",width:"600px",body:e,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:r=>r(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(t)}catch{e.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let r=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(r),o=m("a",{attrs:{href:s,download:`youyou_tools_${Date.now()}.json`}});document.body.appendChild(o),o.click(),setTimeout(()=>{try{document.body.removeChild(o)}catch{}try{URL.revokeObjectURL(s)}catch{}},100)}catch(r){zc.warn("\u4E0B\u8F7D\u5931\u8D25",{err:r})}}}]})}async function DT(){let t=m("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34 YouYou Toolkit \u5DE5\u5177 JSON"},style:{width:"100%",minHeight:"200px",fontSize:"12px",fontFamily:"monospace"}}),e=m("label",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"var(--yyt-text-secondary)",marginTop:"8px"}}),r=m("input",{attrs:{type:"checkbox"}});e.appendChild(r),e.appendChild(m("span",{text:"\u8986\u76D6\u6A21\u5F0F\uFF08\u6E05\u7A7A\u5DF2\u6709\u5DE5\u5177\u540E\u518D\u5BFC\u5165\uFF1B\u4E0D\u52FE\u9009\u5219\u5408\u5E76\uFF09"}));let s=m("div");s.appendChild(t),s.appendChild(e),s.appendChild(m("div",{style:{display:"flex",gap:"6px",marginTop:"8px"}},de({label:"\u{1F4C1} \u4ECE\u6587\u4EF6\u2026",size:"small",variant:"ghost",onClick:()=>{let n=m("input",{attrs:{type:"file",accept:"application/json,.json"}});n.addEventListener("change",()=>{let a=n.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{t.value=String(i.result||""),t.focus()},i.readAsText(a)}),n.click()}}).el));let o=Ee.custom({title:"\u5BFC\u5165\u5DE5\u5177 JSON",width:"520px",body:s,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:n=>n(null)},{label:"\u5BFC\u5165",variant:"primary",onClick:async n=>{let a=t.value.trim();if(!a){n(null);return}try{let i=Fs(a,{overwrite:r.checked});n(i)}catch(i){await Ee.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(i?.message||i),confirmText:"\u786E\u5B9A"})}}}]});return setTimeout(()=>t.focus(),0),o.result}async function LT(){return await Ee.confirm({title:"\u91CD\u7F6E\u6240\u6709\u5DE5\u5177",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u81EA\u5B9A\u4E49\u5DE5\u5177\u4E0E\u9884\u8BBE\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002\u5185\u7F6E\u5DE5\u5177\u4E0D\u53D7\u5F71\u54CD\u3002",confirmText:"\u91CD\u7F6E",danger:!0})?(Hs(),!0):!1}var zc,MT,Uc=P(()=>{Pn();ar();Lo();Qt();G();zc=C.createScope("ToolActions"),MT=[{value:"api",label:"API"},{value:"prompt",label:"Prompt"},{value:"utility",label:"Utility"}]});G();function Cg(t,e={}){let{constants:r,topLevelWindow:s,modules:o}=t,{SCRIPT_ID:n,SCRIPT_VERSION:a,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=r,d=null,c=!1,u=C.createScope("Bootstrap");function p(...R){u.log(R.join(" "))}function y(...R){u.error(R.join(" "))}async function f(){return d||(d=(async()=>{try{o.storageModule=await Promise.resolve().then(()=>($e(),Hc)),o.apiConnectionModule=await Promise.resolve().then(()=>(Sn(),Jc)),o.presetManagerModule=await Promise.resolve().then(()=>(_o(),ed)),o.uiModule=await Promise.resolve().then(()=>(fg(),yg)),o.regexExtractorModule=await Promise.resolve().then(()=>(Ks(),$i)),o.toolManagerModule=await Promise.resolve().then(()=>(Lo(),_u)),o.toolExecutorModule=await Promise.resolve().then(()=>(Kl(),zl)),o.windowManagerModule=await Promise.resolve().then(()=>(dc(),Wf)),o.toolRegistryModule=await Promise.resolve().then(()=>(Qt(),Fi)),o.settingsServiceModule=await Promise.resolve().then(()=>(sn(),ay)),o.bypassManagerModule=await Promise.resolve().then(()=>(ao(),ny)),o.variableResolverModule=await Promise.resolve().then(()=>(va(),py)),o.contextInjectorModule=await Promise.resolve().then(()=>(Ts(),dy)),o.toolPromptServiceModule=await Promise.resolve().then(()=>(Sa(),fy)),o.toolOutputServiceModule=await Promise.resolve().then(()=>(on(),my)),o.toolAutomationServiceModule=await Promise.resolve().then(()=>(vg(),wg)),o.toolDataProviderModule=await Promise.resolve().then(()=>(Vo(),_p)),o.presetBootstrapModule=await Promise.resolve().then(()=>(Ag(),Eg));try{o.toolDataProviderModule.getToolDataProvider({extensionVersion:a}).then(R=>{u.log(`Provider \u5C31\u7EEA: ${R.kind}`)}).catch(R=>{u.error(`Provider \u521D\u59CB\u5316\u5F02\u5E38: ${R?.message||R}`)})}catch(R){u.error(`Provider \u542F\u52A8\u5F02\u5E38: ${R?.message||R}`)}return o.toolOutputServiceModule?.toolOutputService&&o.apiConnectionModule&&o.toolOutputServiceModule.toolOutputService.setApiConnection(o.apiConnectionModule),!0}catch(R){return d=null,y("\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:",R),y("\u5DF2\u52A0\u8F7D\u6A21\u5757:",Object.keys(o).filter(S=>o[S])),!1}})(),d)}function g(){return`
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
    `}async function b(){let R=`${n}-styles`,S=s.document||document;if(S.getElementById(R))return;let _="",F=[];try{F.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{F.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}F.push("./styles/main.css");for(let D of[...new Set(F.filter(Boolean))])try{let A=await fetch(D);if(A.ok){_=await A.text();break}}catch{}_||(p("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),_=g());let W=S.createElement("style");W.id=R,W.textContent=_,(S.head||S.documentElement).appendChild(W),p("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function v(){let R=s.document||document;if(o.uiModule?.getAllStyles){let S=`${n}-ui-styles`;if(!R.getElementById(S)){let _=R.createElement("style");_.id=S,_.textContent=o.uiModule.getAllStyles(),(R.head||R.documentElement).appendChild(_)}}}async function T(){try{let{applyUiPreferences:R}=await Promise.resolve().then(()=>(ql(),Gl));if(o.settingsServiceModule?.settingsService){let S=o.settingsServiceModule.settingsService.getUiSettings();if(S&&S.theme){let _=s.document||document;R(S,_),p(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${S.theme}`)}}}catch(R){p("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",R)}}function w(){let R=s.jQuery||window.jQuery;if(!R){y("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(w,1e3);return}let S=s.document||document,_=R("#extensionsMenu",S);if(!_.length){p("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(w,2e3);return}if(R(`#${l}`,_).length>0){p("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let W=R(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),D=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,A=R(D);A.on("click",function(K){K.stopPropagation(),p("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let Q=R("#extensionsMenuButton",S);Q.length&&_.is(":visible")&&Q.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),W.append(A),_.append(W),p("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function B(){p(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await b();let R=await f();if(p(R?"\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F":"\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u53EF\u7528\u529F\u80FD"),!c&&o.uiModule?.initUI)try{await o.uiModule.initUI({services:o,autoInjectStyles:!1,targetDocument:s.document||document}),c=!0,p("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(_){y("UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:",_)}if(o.uiModule&&(v(),await T()),o.presetBootstrapModule?.ensurePresetSystem)try{let _=o.presetBootstrapModule.ensurePresetSystem();_?.aborted?p(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5931\u8D25\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559: ${_.error}`):_?.skipped?p(`\u9884\u8BBE\u7CFB\u7EDF\u5DF2\u5C31\u7EEA\uFF08${_.reason}\uFF09`):p(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5B8C\u6210\uFF08${_.migratedCount}/${_.total} \u5DE5\u5177\uFF09`)}catch(_){y("\u9884\u8BBE\u7CFB\u7EDF\u521D\u59CB\u5316\u5F02\u5E38:",_)}if(o.toolAutomationServiceModule?.toolAutomationService){let _=o.toolAutomationServiceModule.toolAutomationService.init();p(_?"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316":"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u521D\u59CB\u5316\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u5BBF\u4E3B\u4E8B\u4EF6\u6E90\u91CD\u8BD5")}let S=s.document||document;S.readyState==="loading"?S.addEventListener("DOMContentLoaded",()=>{setTimeout(w,1e3)}):setTimeout(w,1e3),p("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:f,injectStyles:b,addMenuItem:w,init:B,log:p,logError:y}}He();Ye();Ye();G();var go=C.createScope("PromptEditor"),CT="youyou_toolkit_prompt_editor",kT={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},IT={system:"fa-server",ai:"fa-robot",user:"fa-user"},bn=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],Ha=class{constructor(e={}){this.containerId=e.containerId||CT,this.segments=e.segments||[...bn],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){go.error("jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...bn],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let r=kT[e.type]||e.type,s=IT[e.type]||"fa-file",o=e.mainSlot==="A"||e.isMain,n=e.mainSlot==="B"||e.isMain2,a=o?"var(--yyt-accent, #7bb7ff)":n?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${o?"yyt-main-a":""} ${n?"yyt-main-b":""}" 
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
    `}bindEvents(){this.$container&&(ot(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"),this.$container.on("click.yytPromptEditor",".yyt-prompt-toggle",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.on("click.yytPromptEditor",".yyt-prompt-delete",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(r)}),this.$container.on("change.yytPromptEditor",".yyt-prompt-role",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),s=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{role:s})}),this.$container.on("change.yytPromptEditor",".yyt-prompt-main-slot",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),s=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{mainSlot:s})}),this.$container.on("input.yytPromptEditor",".yyt-prompt-textarea",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-add-segment`,()=>{this.addSegment()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-import-prompt`,()=>{this.importPrompt()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-export-prompt`,()=>{this.exportPrompt()}),Et(this.$container,{namespace:"yytPromptEditorSelect",selectors:[".yyt-prompt-role",".yyt-prompt-main-slot"]}))}addSegment(e=null){let r=`segment_${Date.now()}`,s=e||{id:r,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};s.id||(s.id=r),this.segments.push(s),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let r=this.segments.findIndex(o=>o.id===e);if(r===-1)return;if(this.segments[r].deletable===!1){go.warn("\u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(r,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,r){let s=this.segments.find(o=>o.id===e);s&&(Object.assign(s,r),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=r=>{let s=r.target.files[0];if(!s)return;let o=new FileReader;o.onload=n=>{try{let a=JSON.parse(n.target.result);Array.isArray(a)?(this.setSegments(a),go.log("\u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):go.error("\u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){go.error("\u5BFC\u5165\u5931\u8D25:",a)}},o.readAsText(s)},e.click()}exportPrompt(){let e=this.getSegments(),r=JSON.stringify(e,null,2),s=new Blob([r],{type:"application/json"}),o=URL.createObjectURL(s),n=document.createElement("a");n.href=o,n.download=`prompt_group_${Date.now()}.json`,n.click(),URL.revokeObjectURL(o),go.log("\u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}destroy(){this.$container&&(ot(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"))}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};function kg(){return`
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
  `}function Ig(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function Mg(t){return Array.isArray(t)?t.map((e,r)=>({id:`segment_${r}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...bn]}G();function Rg(t){let{constants:e,topLevelWindow:r,modules:s,caches:o,uiState:n}=t,{SCRIPT_ID:a,SCRIPT_VERSION:i,POPUP_ID:l}=e,d=C.createScope("PopupShell"),c={cleanup:null},u={cleanups:[]},p={cleanups:[]},y={current:null};function f(){return!!n.sidebarCollapsed}function g(){n.sidebarCollapsed=!n.sidebarCollapsed;let h=n.currentPopup;if(!h)return;let x=h.querySelector(".yyt-shell-sidebar"),E=h.querySelector(".yyt-shell-workspace"),I=h.querySelector(".yyt-sidebar-toggle i");x&&x.classList.toggle("yyt-collapsed",n.sidebarCollapsed),E&&E.classList.toggle("yyt-sidebar-collapsed",n.sidebarCollapsed),I&&(I.className=n.sidebarCollapsed?"fa-solid fa-angles-right":"fa-solid fa-angles-left"),Ke()}function b(...h){d.log(h.join(" "))}function v(...h){d.error(h.join(" "))}function T(h){return typeof h!="string"?"":h.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function w(){return r.jQuery||window.jQuery}function B(){return r.document||document}function R(h){if(!h)return"\u672A\u9009\u62E9\u9875\u9762";let x=s.toolRegistryModule?.getToolConfig(h);if(!x)return h;if(!x.hasSubTabs)return x.name||h;let E=_(h),I=x.subTabs?.find(L=>L.id===E);return I?.name?`${x.name} / ${I.name}`:x.name||h}function S(h){if(!h)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let x=s.toolRegistryModule?.getToolConfig(h);if(!x)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!x.hasSubTabs)return x.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let E=_(h);return x.subTabs?.find(L=>L.id===E)?.description||x.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function _(h,x=""){let E=s.toolRegistryModule?.getToolConfig(h);if(!E?.hasSubTabs||!Array.isArray(E.subTabs)||E.subTabs.length===0)return"";let I=String(x||n.currentSubTab[h]||"").trim(),O=I&&E.subTabs.some(ee=>ee?.id===I)?I:E.subTabs[0]?.id||"";return O&&n.currentSubTab[h]!==O&&(n.currentSubTab[h]=O),O}function F(){let h=n.currentPopup;if(!h)return;let x=R(n.currentMainTab),E=S(n.currentMainTab),I=h.querySelector(".yyt-popup-active-label");I&&(I.textContent=`\u5F53\u524D\uFF1A${x}`);let L=h.querySelector(".yyt-shell-breadcrumb");L&&(L.textContent=x);let O=h.querySelector(".yyt-shell-main-title");O&&(O.textContent=x);let ee=h.querySelector(".yyt-shell-main-description");ee&&(ee.textContent=E)}function W(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function D(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(h=>{typeof h=="function"&&h()}),u.cleanups=[])}function A(){Array.isArray(p.cleanups)&&(p.cleanups.forEach(h=>{typeof h=="function"&&h()}),p.cleanups=[])}function J(h,x){if(!h||!x)return!1;let E=h.jquery?h[0]:h,I=x.jquery?x[0]:x;return!!(E&&I&&E===I)}function K(h={}){let{container:x=null}=h,E=y.current;if(E&&!(x&&!J(E.container,x))){try{typeof E.destroy=="function"&&E.destroy(E.container)}catch(I){v("\u9500\u6BC1\u52A8\u6001\u9762\u677F host \u5931\u8D25",I)}s.uiModule?.uiManager?.destroyContainerInstance&&s.uiModule.uiManager.destroyContainerInstance(E.container),y.current=null}}function Q(h,x={}){y.current={key:x.key||"",container:h,destroy:typeof x.destroy=="function"?x.destroy:null}}function ue(){let h=w();if(!h||!n.currentPopup)return;let x=s.toolRegistryModule?.getToolList()||[],E=h(n.currentPopup).find(".yyt-main-nav");if(!E.length)return;let I=x.map(O=>`
      <div class="yyt-main-nav-item ${O.id===n.currentMainTab?"active":""}" data-tab="${O.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${T(O.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${T(O.name||O.id)}</span>
          <span class="yyt-main-nav-desc">${T(O.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");E.html(I),h(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let ee=h(this).data("tab");ee&&Hr(ee)});let L=h(n.currentPopup).find(".yyt-shell-sidebar-hint");L.length&&L.text(`${x.length} tabs`)}function ge(){let h=w();if(!h||!n.currentPopup)return;let x=s.toolRegistryModule?.getToolList()||[],E=s.toolRegistryModule?.getToolConfig("tools"),I=Array.isArray(E?.subTabs)?E.subTabs:[],L=I.filter(te=>te?.isCustom).length,O=I.filter(te=>!te?.isCustom).length,V=h(n.currentPopup).find(".yyt-shell-sidebar-stats");V.length&&(V.find(".yyt-shell-sidebar-stat").eq(0).find(".yyt-shell-sidebar-stat-value").text(String(x.length)),V.find(".yyt-shell-sidebar-stat").eq(1).find(".yyt-shell-sidebar-stat-value").text(String(O)),V.find(".yyt-shell-sidebar-stat").eq(2).find(".yyt-shell-sidebar-stat-value").text(String(L)))}function Me(){let h=s.toolRegistryModule?.getToolList()||[];return h.length?(h.some(x=>x.id===n.currentMainTab)||(n.currentMainTab=h[0].id),n.currentMainTab):null}async function H(h={}){let{rebuildNavigation:x=!1,reRenderSubNav:E=!1}=h,I=w();if(!I||!n.currentPopup)return;K();let L=Me();if(!L)return;x&&(ue(),ge());let O=s.toolRegistryModule?.getToolConfig(L),ee=!!O?.hasSubTabs,V=I(n.currentPopup).find(".yyt-sub-nav"),te=I(n.currentPopup).find(".yyt-content-inner");if(x&&te.length){let be=new Set(te.find(".yyt-tab-content").map((pe,Ze)=>I(Ze).data("tab")).get());(s.toolRegistryModule?.getToolList()||[]).forEach(pe=>{be.has(pe.id)||te.append(`<div class="yyt-tab-content" data-tab="${T(pe.id)}"></div>`)}),te.find(".yyt-tab-content").each((pe,Ze)=>{let _t=I(Ze).data("tab");(s.toolRegistryModule?.getToolList()||[]).some(Ht=>Ht.id===_t)||I(Ze).remove()})}I(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),I(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${L}"]`).addClass("active"),I(n.currentPopup).find(".yyt-tab-content").removeClass("active"),I(n.currentPopup).find(`.yyt-tab-content[data-tab="${L}"]`).addClass("active"),ee?(V.show(),(E||x)&&Rs(L,O.subTabs)):V.hide(),await Yr(L),F(),Ke()}function Ae(){if(!n.currentPopup)return;D();let h=()=>{if(n.currentMainTab==="presetManagement"){H();return}n.currentMainTab==="tools"&&H({reRenderSubNav:!0})},x=()=>{n.currentMainTab==="tools"?H({rebuildNavigation:!0,reRenderSubNav:!0}):ge()},E=()=>{n.currentMainTab==="tools"&&H({rebuildNavigation:!1,reRenderSubNav:!1})},I=()=>{(n.currentMainTab==="bypass"||n.currentMainTab==="tools")&&H({reRenderSubNav:n.currentMainTab==="tools"})};[$.PRESET_CREATED,$.PRESET_UPDATED,$.PRESET_DELETED].forEach(L=>{u.cleanups.push(z.on(L,h))}),[$.TOOL_REGISTERED,$.TOOL_UPDATED,$.TOOL_UNREGISTERED].forEach(L=>{u.cleanups.push(z.on(L,x))}),u.cleanups.push(z.on($.TOOL_RUNTIME_UPDATED,E)),[$.BYPASS_PRESET_CREATED,$.BYPASS_PRESET_UPDATED,$.BYPASS_PRESET_DELETED].forEach(L=>{u.cleanups.push(z.on(L,I))})}function De(h){return!!h?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown",".yyt-select-portal-layer"].join(","))}function xe(h){let x=h?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return x?x.scrollHeight>x.clientHeight+2||x.scrollWidth>x.clientWidth+2:!1}function Le(h,x){return x?.closest?.(".yyt-scrollable-surface")===h}function St(h,x){if(!h||!x)return null;let E=x.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return E&&(E.classList?.contains("yyt-select-portal-layer")||h.contains(E))&&(E.scrollHeight>E.clientHeight+2||E.scrollWidth>E.clientWidth+2)?E:[x.closest?.(".yyt-tool-list"),x.closest?.(".yyt-settings-content"),x.closest?.(".yyt-sub-content"),x.closest?.(".yyt-tab-content.active"),h].filter(Boolean).find(L=>L!==h&&!h.contains(L)?!1:L.scrollHeight>L.clientHeight+2||L.scrollWidth>L.clientWidth+2)||h}function Fe({mainTab:h=null,includeSubContent:x=!1}={}){let E=n.currentPopup;if(!E)return;let I=E.querySelector(".yyt-content");I&&(I.scrollTop=0,I.scrollLeft=0);let L=h?`.yyt-tab-content[data-tab="${h}"]`:".yyt-tab-content.active",O=E.querySelector(L);if(O&&(O.scrollTop=0,O.scrollLeft=0),!x)return;(O?.querySelectorAll(".yyt-sub-content")||[]).forEach(V=>{V.scrollTop=0,V.scrollLeft=0})}function sr(h){let x=B();if(!h||!x)return;h.classList.add("yyt-scrollable-surface");let E=!1,I=!1,L=0,O=0,ee=0,V=0,te=!1,be=!1,pe=()=>{E=!1,I=!1,h.classList.remove("yyt-scroll-dragging")},Ze=q=>{q.button===0&&(De(q.target)||Le(h,q.target)&&(te=h.scrollWidth>h.clientWidth+2,be=h.scrollHeight>h.clientHeight+2,!(!te&&!be)&&(q.stopPropagation(),E=!0,I=!1,L=q.clientX,O=q.clientY,ee=h.scrollLeft,V=h.scrollTop)))},_t=q=>{if(!E)return;let st=q.clientX-L,Ve=q.clientY-O;!(Math.abs(st)>4||Math.abs(Ve)>4)&&!I||(I=!0,h.classList.add("yyt-scroll-dragging"),te&&(h.scrollLeft=ee-st),be&&(h.scrollTop=V-Ve),q.preventDefault())},Ht=()=>{pe()},_r=q=>{if(q.ctrlKey||xe(q.target)||!h.classList.contains("yyt-content")&&!Le(h,q.target))return;let Ve=St(h,q.target);!Ve||Ve!==h&&!h.contains(Ve)||!(Ve.scrollHeight>Ve.clientHeight+2||Ve.scrollWidth>Ve.clientWidth+2)||(Math.abs(q.deltaY)>0&&(Ve.scrollTop+=q.deltaY),Math.abs(q.deltaX)>0&&(Ve.scrollLeft+=q.deltaX),q.preventDefault(),q.stopPropagation())},et=q=>{I&&q.preventDefault()};h.addEventListener("mousedown",Ze),h.addEventListener("wheel",_r,{passive:!1}),h.addEventListener("dragstart",et),x.addEventListener("mousemove",_t),x.addEventListener("mouseup",Ht),p.cleanups.push(()=>{pe(),h.classList.remove("yyt-scrollable-surface"),h.removeEventListener("mousedown",Ze),h.removeEventListener("wheel",_r),h.removeEventListener("dragstart",et),x.removeEventListener("mousemove",_t),x.removeEventListener("mouseup",Ht)})}function Ke(){let h=n.currentPopup;if(!h)return;A();let x=[...h.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...h.querySelectorAll(".yyt-sub-nav"),...h.querySelectorAll(".yyt-content"),...h.querySelectorAll(".yyt-settings-content"),...h.querySelectorAll(".yyt-tool-list")];[...new Set(x)].forEach(sr)}function mo(h){return`
      <div class="yyt-startup-screen" data-yyt-startup-screen>
        <div class="yyt-startup-screen-inner">
          <div class="yyt-startup-screen-kicker">Welcome</div>
          <div class="yyt-startup-screen-title">YouYou \u5DE5\u5177\u7BB1</div>
          <div class="yyt-startup-screen-desc">\u96C6\u4E2D\u7BA1\u7406 API \u9884\u8BBE\u3001\u81EA\u5B9A\u4E49\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001Ai\u6307\u4EE4\u9884\u8BBE\u4E0E\u8BCA\u65AD\u6D41\u7A0B\u3002\u6BCF\u6B21\u5237\u65B0\u540E\u90FD\u4F1A\u91CD\u65B0\u663E\u793A\uFF0C\u4FBF\u4E8E\u5FEB\u901F\u56DE\u5230\u4ECB\u7ECD\u5165\u53E3\u3002</div>
          <div class="yyt-startup-screen-modules">
            ${(h||[]).slice(0,6).map(E=>`
      <div class="yyt-startup-module-chip">
        <i class="fa-solid ${T(E.icon||"fa-file")}"></i>
        <span>${T(E.name||E.id)}</span>
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
    `}function ho(h){let x=w();if(!x||!n.currentPopup||n.startupScreenDismissed)return;let E=x(n.currentPopup).find(".yyt-popup-body"),I=E.find(".yyt-popup-shell");!E.length||!I.length||E.find("[data-yyt-startup-screen]").length||(I.attr("data-yyt-startup-visible","true"),E.prepend(mo(h)),E.find(".yyt-startup-enter").on("click",()=>{E.find("[data-yyt-startup-screen]").remove(),I.removeAttr("data-yyt-startup-visible"),n.startupScreenDismissed=!0,Ke()}))}function Tr(){let h=B(),x=n.currentPopup,E=x?.querySelector(".yyt-popup-header");if(!x||!E||!h)return;let I=!1,L=0,O=0,ee=0,V=0,te="",be=()=>({width:r.innerWidth||h.documentElement?.clientWidth||window.innerWidth||0,height:r.innerHeight||h.documentElement?.clientHeight||window.innerHeight||0}),pe=(et,q,st)=>Math.min(Math.max(et,q),st),Ze=()=>{I&&(I=!1,x.classList.remove("yyt-popup-dragging"),h.body.style.userSelect=te)},_t=et=>{if(!I||!n.currentPopup)return;let q=et.clientX-L,st=et.clientY-O,{width:Ve,height:qa}=be(),Fg=x.offsetWidth||0,Hg=x.offsetHeight||0,Yg=Math.max(0,Ve-Fg),Gg=Math.max(0,qa-Hg);x.style.left=`${pe(ee+q,0,Yg)}px`,x.style.top=`${pe(V+st,0,Gg)}px`,x.style.transform="none",x.style.right="auto",x.style.bottom="auto"},Ht=()=>{Ze()},_r=et=>{if(et.button!==0||et.target?.closest(".yyt-popup-close"))return;I=!0,L=et.clientX,O=et.clientY;let q=x.getBoundingClientRect();ee=q.left,V=q.top,x.style.left=`${q.left}px`,x.style.top=`${q.top}px`,x.style.transform="none",x.style.right="auto",x.style.bottom="auto",x.classList.add("yyt-popup-dragging"),te=h.body.style.userSelect||"",h.body.style.userSelect="none",et.preventDefault()};E.addEventListener("mousedown",_r),h.addEventListener("mousemove",_t),h.addEventListener("mouseup",Ht),c.cleanup=()=>{Ze(),E.removeEventListener("mousedown",_r),h.removeEventListener("mousemove",_t),h.removeEventListener("mouseup",Ht)}}function Sr(){K(),W(),D(),A();let h=w();if(h&&n.currentPopup){let x=h(n.currentPopup);ot(x,"yytPopupToolConfigSelect"),ot(x,"yytPromptEditorSelect")}n.currentPopup&&(n.currentPopup.remove(),n.currentPopup=null),n.currentOverlay&&(n.currentOverlay.remove(),n.currentOverlay=null),b("\u5F39\u7A97\u5DF2\u5173\u95ED")}function Hr(h){K(),n.currentMainTab=h;let x=w();if(!x||!n.currentPopup)return;Fe({mainTab:h,includeSubContent:!0}),x(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),x(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${h}"]`).addClass("active");let E=s.toolRegistryModule?.getToolConfig(h);E?.hasSubTabs?(x(n.currentPopup).find(".yyt-sub-nav").show(),Rs(h,E.subTabs)):x(n.currentPopup).find(".yyt-sub-nav").hide(),x(n.currentPopup).find(".yyt-tab-content").removeClass("active"),x(n.currentPopup).find(`.yyt-tab-content[data-tab="${h}"]`).addClass("active"),Yr(h),F(),Ke()}function Ms(h,x){K(),n.currentSubTab[h]=x;let E=w();!E||!n.currentPopup||(Fe({mainTab:h,includeSubContent:!0}),E(n.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),E(n.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${x}"]`).addClass("active"),Gr(h,x),F(),Ke())}function Rs(h,x){let E=w();if(!E||!n.currentPopup||!x)return;let I=_(h,n.currentSubTab[h]||x[0]?.id),O=(h==="tools"?[{key:"ai",title:"AI \u5DE5\u5177",items:x.filter(V=>!V?.isCustom&&(V?.toolKind||"ai")!=="script")},{key:"script",title:"\u811A\u672C\u5DE5\u5177",items:x.filter(V=>!V?.isCustom&&V?.toolKind==="script")},{key:"custom",title:"\u81EA\u5B9A\u4E49\u5DE5\u5177",items:x.filter(V=>V?.isCustom===!0)}].filter(V=>V.items.length>0):[{key:"default",title:"",items:x}]).map(V=>{let te=V.title?`<div class="yyt-sub-nav-group-title">${T(V.title)}</div>`:"",be=V.items.map(pe=>{let Ze=pe?.isCustom===!0,_t=h==="tools"&&Ze?`<div class="yyt-sub-nav-item-actions">
               <button type="button" class="yyt-sub-nav-item-action" data-action="edit" data-subtab="${pe.id}" title="\u7F16\u8F91"><i class="fa-solid fa-pen"></i></button>
               <button type="button" class="yyt-sub-nav-item-action" data-action="delete" data-subtab="${pe.id}" title="\u5220\u9664"><i class="fa-solid fa-trash"></i></button>
             </div>`:"";return`
        <div class="yyt-sub-nav-item ${pe.id===I?"active":""}" data-subtab="${pe.id}" data-tool-name="${T((pe.name||pe.id).toLowerCase())}">
          <i class="fa-solid ${pe.icon||"fa-file"}"></i>
          <span class="yyt-sub-nav-item-label">${T(pe.name||pe.id)}</span>
          ${_t}
        </div>
      `}).join("");return`
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${V.key}">
          ${te}
          <div class="yyt-sub-nav-group-items">
            ${be}
          </div>
        </div>
      `}).join(""),ee=h==="tools"?`<div class="yyt-sub-nav-toolbar">
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="add" title="\u65B0\u5EFA\u81EA\u5B9A\u4E49\u5DE5\u5177"><i class="fa-solid fa-plus"></i><span>\u65B0\u5EFA</span></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="import" title="\u4ECE JSON \u5BFC\u5165\u5DE5\u5177"><i class="fa-solid fa-file-import"></i></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="export" title="\u5BFC\u51FA\u5DE5\u5177 JSON"><i class="fa-solid fa-file-export"></i></button>
         </div>
         <div class="yyt-sub-nav-filter-wrap">
           <input type="text" class="yyt-sub-nav-filter" placeholder="\u7B5B\u9009\u5DE5\u5177\u2026" autocomplete="off">
         </div>`:"";E(n.currentPopup).find(".yyt-sub-nav").html(ee+O),E(n.currentPopup).find(".yyt-sub-nav-item").on("click",function(te){if(te.target.closest&&te.target.closest(".yyt-sub-nav-item-action"))return;let be=E(this).data("subtab");Ms(h,be)}),h==="tools"&&xo(h),Ke()}function bo(h){if(!n.currentPopup)return;let x=w();if(!x)return;let E=String(h||"").trim().toLowerCase();x(n.currentPopup).find(".yyt-sub-nav-item").each(function(){let L=String(x(this).data("tool-name")||"");x(this).toggle(!E||L.includes(E))}),x(n.currentPopup).find(".yyt-sub-nav-group").each(function(){let L=x(this).find(".yyt-sub-nav-item:visible").length>0;x(this).toggle(L)})}function xo(h){let x=w();if(!x||!n.currentPopup)return;let E=x(n.currentPopup).find(".yyt-sub-nav");E.find(".yyt-sub-nav-filter").off("input.yytFilter").on("input.yytFilter",function(){bo(this.value)}),E.find(".yyt-sub-nav-toolbar-btn").off("click.yytToolAction").on("click.yytToolAction",async function(I){I.preventDefault(),I.stopPropagation();let L=x(this).data("tool-action");try{let O=await Promise.resolve().then(()=>(Uc(),Kc));if(L==="add"){let ee=await O.showToolEditDialog(null);ee&&(n.currentSubTab[h]=ee,Ms(h,ee))}else L==="import"?await O.showImportToolsDialog():L==="export"&&O.showExportToolsDialog()}catch(O){v("\u5DE5\u5177\u64CD\u4F5C\u5931\u8D25",O)}}),E.find(".yyt-sub-nav-item-action").off("click.yytItemAction").on("click.yytItemAction",async function(I){I.preventDefault(),I.stopPropagation();let L=x(this).data("action"),O=String(x(this).data("subtab")||"");if(O)try{let ee=await Promise.resolve().then(()=>(Uc(),Kc));L==="edit"?await ee.showToolEditDialog(O):L==="delete"&&await ee.confirmDeleteTool(O)&&n.currentSubTab[h]===O&&(n.currentSubTab[h]="")}catch(ee){v("\u5DE5\u5177\u884C\u5185\u64CD\u4F5C\u5931\u8D25",ee)}})}async function Yr(h){let x=w();if(!x||!n.currentPopup)return;let E=x(n.currentPopup).find(`.yyt-tab-content[data-tab="${h}"]`);if(!E.length)return;if(s.toolRegistryModule?.getToolConfig(h)?.hasSubTabs){let O=_(h);O?await Gr(h,O):E.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5B50 tab \u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>'),Ke();return}await s.uiModule?.renderMainTab?.(h,E)||Dg(h,E),Ke()}async function Gr(h,x){let E=w();if(!E||!n.currentPopup)return;let I=E(n.currentPopup).find(`.yyt-tab-content[data-tab="${h}"]`);if(!I.length)return;let L=s.toolRegistryModule?.getToolConfig(h);if(L?.hasSubTabs){let ee=_(h,x),V=L.subTabs?.find(Ze=>Ze.id===ee),te=I.find(".yyt-sub-content");if(te.length||(I.html('<div class="yyt-sub-content"></div>'),te=I.find(".yyt-sub-content")),!V){te.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5F53\u524D\u5B50\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u5931\u6548</span></div>'),Fe({mainTab:h,includeSubContent:!0}),Ke();return}let be=V.component;if(be==="GenericToolConfigPanel"){await qr(V,te),Fe({mainTab:h,includeSubContent:!0}),Ke();return}K({container:te});let pe=await s.uiModule?.renderSubTabComponent?.(be,te);pe?Q(te,{key:pe}):te.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>'),Fe({mainTab:h,includeSubContent:!0}),Ke();return}let O=I.find(".yyt-sub-content");if(O.length){switch(K({container:O}),x){case"config":Lg(h,O);break;case"prompts":await $g(h,O);break;case"presets":Og(h,O);break;default:O.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}Fe({mainTab:h,includeSubContent:!0}),Ke()}}async function qr(h,x){if(!(!w()||!x?.length||!h?.id)){K({container:x});try{let I=o.dynamicToolPanelCache.get(h.id);if(!I){let ee=(await Promise.resolve().then(()=>(uo(),_y)))?.createToolConfigPanel;if(typeof ee!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");I=()=>ee({id:`${h.id}Panel`,toolId:h.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${h.name||h.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${h.id}-extraction-preview`,previewTitle:`${h.name||h.id} \u63D0\u53D6\u9884\u89C8`}),o.dynamicToolPanelCache.set(h.id,I)}let L=I();L.renderTo(x),Q(x,{key:h.id,destroy:typeof L?.destroy=="function"?O=>L.destroy(O):null}),Ke()}catch(I){y.current=null,v("\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:",I),x.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}}function Dg(h,x){if(!w())return;let I=s.toolRegistryModule?.getToolConfig(h);if(!I){x.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let L=n.currentSubTab[h]||I.subTabs?.[0]?.id||"config";x.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${L}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),Gr(h,L)}function Lg(h,x){if(!w())return;let I=s.toolManagerModule?.getTool(h),L=s.presetManagerModule?.getAllPresets()||[],O=s.toolRegistryModule?.getToolApiPreset(h)||"",ee=L.map(V=>`<option value="${T(V.name)}" ${V.name===O?"selected":""}>${T(V.name)}</option>`).join("");x.html(`
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${I?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${I?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),Et(x,{namespace:"yytPopupToolConfigSelect",selectors:["#yyt-tool-api-preset"]}),x.find("#yyt-save-tool-preset").on("click",function(){let te=x.find("#yyt-tool-api-preset").val();s.toolRegistryModule?.setToolApiPreset(h,te);let be=r.toastr;be&&be.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function $g(h,x){if(!w()){x.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let L=s.toolManagerModule?.getTool(h)?.config?.messages||[],O=Mg(L)||bn,ee=new Ha({containerId:`yyt-prompt-editor-${h}`,segments:O,onChange:te=>{let be=Ig(te);b("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",be.length,"\u6761\u6D88\u606F")}});x.html(`<div id="yyt-prompt-editor-${h}" class="yyt-prompt-editor-container"></div>`),ee.init(x.find(`#yyt-prompt-editor-${h}`));let V=kg();if(V){let te="yyt-prompt-editor-styles",be=r.document||document;if(!be.getElementById(te)){let pe=be.createElement("style");pe.id=te,pe.textContent=V,(be.head||be.documentElement).appendChild(pe)}}}function Og(h,x){w()&&x.html(`
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
    `)}function Bg(){return`
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
      </div>`}function zg(h,x,E){let I=f(),L=h.map(O=>`
      <div class="yyt-main-nav-item ${O.id===n.currentMainTab?"active":""}" data-tab="${O.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${T(O.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${T(O.name||O.id)}</span>
          <span class="yyt-main-nav-desc">${T(O.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");return`
      <aside class="yyt-shell-sidebar${I?" yyt-collapsed":""}">
        <div class="yyt-shell-sidebar-card">
          <div class="yyt-shell-sidebar-title-row">
            <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
            <span class="yyt-shell-sidebar-hint">${h.length} tabs</span>
            <button class="yyt-sidebar-toggle" title="${I?"\u5C55\u5F00\u4FA7\u680F":"\u6298\u53E0\u4FA7\u680F"}">
              <i class="fa-solid ${I?"fa-angles-right":"fa-angles-left"}"></i>
            </button>
          </div>
          <div class="yyt-main-nav">
            ${L}
          </div>
          <div class="yyt-shell-sidebar-note">
            \u4FDD\u5B58\u540E\uFF0C\u624B\u52A8\u6267\u884C\u4E0E\u5199\u56DE\u94FE\u90FD\u4F1A\u4EE5\u6700\u65B0\u914D\u7F6E\u4E3A\u51C6\u3002
          </div>
          <div class="yyt-shell-sidebar-stats">
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${h.length}</span>
              <span class="yyt-shell-sidebar-stat-label">\u4E3B\u9875\u9762</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${x}</span>
              <span class="yyt-shell-sidebar-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${E}</span>
              <span class="yyt-shell-sidebar-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
            </div>
          </div>
        </div>
      </aside>`}function Kg(h,x){return`
      <div class="yyt-shell-main-header">
        <div class="yyt-shell-main-heading-block">
          <div class="yyt-shell-main-title">${T(h)}</div>
          <div class="yyt-shell-main-description">${T(x)}</div>
        </div>
        <div class="yyt-shell-main-actions">
          <div class="yyt-shell-main-meta">
            <i class="fa-solid fa-circle-info"></i>
            <span>\u4FDD\u5B58\u540E\u6267\u884C\u94FE\u4F1A\u7ACB\u5373\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
          </div>
        </div>
      </div>`}function Ug(h,x){return h.map(E=>`
      <div class="yyt-tab-content ${E.id===x?"active":""}" data-tab="${E.id}">
      </div>
    `).join("")}function Wg(h){return`
      <div class="yyt-popup-footer">
        <div class="yyt-popup-footer-left">
          <div class="yyt-popup-status-cluster">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${T(h)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
            </div>
          </div>
        </div>
      </div>`}async function jg(){if(n.currentPopup){b("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let h=t?.services?.loadModules;typeof h=="function"&&await h();let x=w(),E=B();if(!x){v("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let I=s.toolRegistryModule?.getToolList()||[];if(!I.length){v("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}I.some(q=>q.id===n.currentMainTab)||(n.currentMainTab=I[0].id);let L=s.toolRegistryModule?.getToolConfig("tools"),O=Array.isArray(L?.subTabs)?L.subTabs:[],ee=O.filter(q=>q?.isCustom).length,V=O.filter(q=>!q?.isCustom).length,te=R(n.currentMainTab),be=S(n.currentMainTab);n.currentOverlay=E.createElement("div"),n.currentOverlay.className="yyt-popup-overlay",n.currentOverlay.addEventListener("click",q=>{q.target===n.currentOverlay&&Sr()}),E.body.appendChild(n.currentOverlay);let pe=f(),Ze=`
      <div class="yyt-popup" id="${l}">
        ${Bg()}
        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-workspace${pe?" yyt-sidebar-collapsed":""}">
              ${zg(I,V,ee)}
              <section class="yyt-shell-main">
                ${Kg(te,be)}
                <div class="yyt-sub-nav" style="display: none;"></div>
                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${Ug(I,n.currentMainTab)}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        ${Wg(te)}
      </div>
    `,_t=E.createElement("div");_t.innerHTML=Ze,n.currentPopup=_t.firstElementChild,E.body.appendChild(n.currentPopup),x(n.currentPopup).find(".yyt-popup-close").on("click",Sr),x(n.currentPopup).find(".yyt-sidebar-toggle").on("click",g);let Ht=q=>{q.key==="Escape"&&(E.querySelector(".yyt-dialog-overlay")||E.querySelector(".yyt-twb-editor-drawer.is-open")||(q.stopPropagation(),Sr()))},_r=q=>{if(!(q.ctrlKey||q.metaKey)||q.key!=="s"||!n.currentPopup)return;q.preventDefault(),q.stopPropagation();let st=x(n.currentPopup),Ve=st.find("#yyt-bypass-save:visible").first()||st.find(`#${a}-save-api-config:visible`).first()||st.find("#yyt-save-tool-preset:visible").first()||st.find('[data-twb-action="save"]:visible').first();Ve?.length&&Ve.trigger("click")};E.addEventListener("keydown",Ht),E.addEventListener("keydown",_r),u.cleanups.push(()=>{E.removeEventListener("keydown",Ht),E.removeEventListener("keydown",_r)}),Ae(),x(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let st=x(this).data("tab");st&&Hr(st)}),Tr(),Yr(n.currentMainTab);let et=s.toolRegistryModule?.getToolConfig(n.currentMainTab);et?.hasSubTabs&&(x(n.currentPopup).find(".yyt-sub-nav").show(),Rs(n.currentMainTab,et.subTabs)),F(),ho(I),Ke(),b("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:jg,closePopup:Sr,switchMainTab:Hr,switchSubTab:Ms,renderTabContent:Yr,renderSubTabContent:Gr}}function Pg(t,e={}){let{constants:r,modules:s}=t,{SCRIPT_ID:o,SCRIPT_VERSION:n}=r,{init:a,loadModules:i,addMenuItem:l,popupShell:d}=e;return{version:n,id:o,init:a,openPopup:d?.openPopup,closePopup:d?.closePopup,switchMainTab:d?.switchMainTab,switchSubTab:d?.switchSubTab,addMenuItem:l,getStorage:()=>s.storageModule,getApiConnection:()=>s.apiConnectionModule,getPresetManager:()=>s.presetManagerModule,getUi:()=>s.uiModule,getUiModule:()=>s.uiModule,getRegexExtractor:()=>s.regexExtractorModule,getToolManager:()=>s.toolManagerModule,getToolExecutor:()=>s.toolExecutorModule,getWindowManager:()=>s.windowManagerModule,getToolRegistry:()=>s.toolRegistryModule,getSettingsService:()=>s.settingsServiceModule,getBypassManager:()=>s.bypassManagerModule,getVariableResolver:()=>s.variableResolverModule,getContextInjector:()=>s.contextInjectorModule,getToolPromptService:()=>s.toolPromptServiceModule,getToolOutputService:()=>s.toolOutputServiceModule,getToolAutomationService:()=>s.toolAutomationServiceModule,getDataProvider:()=>s.toolDataProviderModule?.getCurrentProvider?.()||null,async getDataProviderAsync(){return await i(),s.toolDataProviderModule?.getToolDataProvider?.()||null},async getApiConfig(){return await i(),s.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(c){return await i(),s.apiConnectionModule?(s.apiConnectionModule.updateApiConfig(c),!0):!1},async getPresets(){return await i(),s.presetManagerModule?s.presetManagerModule.getAllPresets():[]},async sendApiRequest(c,u){if(await i(),s.apiConnectionModule)return s.apiConnectionModule.sendApiRequest(c,u);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),s.apiConnectionModule?s.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(c,u){return s.toolRegistryModule?.registerTool(c,u)||!1},unregisterTool(c){return s.toolRegistryModule?.unregisterTool(c)||!1},getToolList(){return s.toolRegistryModule?.getToolList()||[]},createWindow(c){return s.windowManagerModule?.createWindow(c)||null},closeWindow(c){s.windowManagerModule?.closeWindow(c)},startAutomation(){return s.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){s.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return s.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},cancelAutomation(c={}){return s.toolAutomationServiceModule?.toolAutomationService?.cancelAutomation?.(c)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}},async processCurrentAssistantMessage(c={}){return s.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(c)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var Ya="youyou_toolkit",$T="1.0.181",OT=`${Ya}-menu-item`,BT=`${Ya}-menu-container`,zT=`${Ya}-popup`,KT=typeof window.parent<"u"?window.parent:window,Ga={constants:{SCRIPT_ID:Ya,SCRIPT_VERSION:$T,MENU_ITEM_ID:OT,MENU_CONTAINER_ID:BT,POPUP_ID:zT},topLevelWindow:KT,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null,toolAutomationServiceModule:null,toolDataProviderModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"presetManagement",currentSubTab:{},startupScreenDismissed:!1}},Ng=Rg(Ga),xn=Cg(Ga,{openPopup:Ng.openPopup});Ga.services.loadModules=xn.loadModules;var Wc=Pg(Ga,{init:xn.init,loadModules:xn.loadModules,addMenuItem:xn.addMenuItem,popupShell:Ng});if(typeof window<"u"&&(window.YouYouToolkit=Wc,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=Wc}catch{}var _C=Wc;xn.init();Promise.resolve().then(()=>(G(),Fc)).then(({logger:t})=>{t.createScope("Bootstrap").log("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210")});export{_C as default};
