var hm=Object.defineProperty;var N=(t,e)=>()=>(t&&(e=t(t=0)),e);var se=(t,e)=>{for(var r in e)hm(t,r,{get:e[r],enumerable:!0})};var O,ii,K,Ye=N(()=>{O={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_RUNTIME_UPDATED:"tool:runtimeUpdated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},ii=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,r,s={}){if(!e||typeof r!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:o=0}=s;this.listeners.has(e)||this.listeners.set(e,new Set);let n={callback:r,priority:o};return this.listeners.get(e).add(n),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,r)}off(e,r){let s=this.listeners.get(e);if(s){for(let o of s)if(o.callback===r){s.delete(o);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,r){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,r),this._addToHistory(e,r);let s=this.listeners.get(e);if(!s||s.size===0)return;let o=Array.from(s).sort((n,a)=>a.priority-n.priority);for(let{callback:n}of o)try{n(r)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,r){let s=o=>{this.off(e,s),r(o)};return this.on(e,s)}wait(e,r=0){return new Promise((s,o)=>{let n=null,a=this.once(e,i=>{n&&clearTimeout(n),s(i)});r>0&&(n=setTimeout(()=>{a(),o(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},r))})}hasListeners(e){let r=this.listeners.get(e);return r&&r.size>0}listenerCount(e){let r=this.listeners.get(e);return r?r.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,r){this.history.push({event:e,data:r,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(r=>r.event===e):[...this.history]}clearHistory(){this.history=[]}},K=new ii});var td={};se(td,{LOG_LEVEL:()=>ce,LoggerService:()=>kn,default:()=>bm,logger:()=>I});var ce,ed,kn,I,bm,W=N(()=>{Ye();ce=Object.freeze({DEBUG:0,INFO:1,WARN:2,ERROR:3}),ed=Object.freeze({[ce.DEBUG]:"DEBUG",[ce.INFO]:"INFO",[ce.WARN]:"WARN",[ce.ERROR]:"ERROR"}),kn=class{constructor(){this._entries=[],this._maxSize=2e3,this._nextId=1,this._minLevel=ce.INFO,this._eventKey="logger:entry",this._statsEventKey="logger:statsChanged",this._pendingFlush=!1}_write(e,r,s,o){let n={id:this._nextId++,timestamp:Date.now(),level:e,scope:r,message:s,data:o};this._entries.push(n),this._entries.length>this._maxSize&&this._entries.shift(),this._forwardToConsole(n),this._pendingFlush||(this._pendingFlush=!0,queueMicrotask(()=>{this._pendingFlush=!1,this._emitEntry(n)}))}_forwardToConsole(e){let r=`[${e.scope}]`;switch(e.level){case ce.DEBUG:console.debug(r,e.message,e.data??"");break;case ce.INFO:console.log(r,e.message,e.data??"");break;case ce.WARN:console.warn(r,e.message,e.data??"");break;case ce.ERROR:console.error(r,e.message,e.data??"");break}}_emitEntry(e){try{K?.emit(this._eventKey,e)}catch{}}debug(e,r,s){ce.DEBUG<this._minLevel||this._write(ce.DEBUG,e,r,s)}info(e,r,s){ce.INFO<this._minLevel||this._write(ce.INFO,e,r,s)}log(e,r,s){this.info(e,r,s)}warn(e,r,s){ce.WARN<this._minLevel||this._write(ce.WARN,e,r,s)}error(e,r,s){ce.ERROR<this._minLevel||this._write(ce.ERROR,e,r,s)}createScope(e){return{debug:(r,s)=>this.debug(e,r,s),info:(r,s)=>this.info(e,r,s),log:(r,s)=>this.log(e,r,s),warn:(r,s)=>this.warn(e,r,s),error:(r,s)=>this.error(e,r,s)}}getEntries(e={}){let{level:r,scope:s,search:o,limit:n=500,offset:a=0}=e,i=this._entries;if(r!=null&&(i=i.filter(c=>c.level>=r)),s&&(i=i.filter(c=>c.scope===s)),o){let c=o.toLowerCase();i=i.filter(d=>d.scope.toLowerCase().includes(c)||d.message.toLowerCase().includes(c))}let l=i.length;return i=i.slice(a,a+n),{entries:i,total:l}}getStats(){let e={total:this._entries.length,byLevel:{DEBUG:0,INFO:0,WARN:0,ERROR:0},byScope:{}};for(let r of this._entries){let s=ed[r.level]||"UNKNOWN";e.byLevel[s]=(e.byLevel[s]||0)+1,e.byScope[r.scope]=(e.byScope[r.scope]||0)+1}return e}setLevel(e){this._minLevel=e}getLevel(){return this._minLevel}setMaxSize(e){this._maxSize=Math.max(100,Math.min(1e4,e))}clear(){this._entries=[],this._nextId=1}levelLabel(e){return ed[e]||"UNKNOWN"}},I=new kn,bm=I});var rd={};se(rd,{StorageService:()=>es,default:()=>Tm,getStorage:()=>xm,loadSettings:()=>wm,presetStorage:()=>Se,saveSettings:()=>vm,storage:()=>D,toolStorage:()=>be,windowStorage:()=>In});function xm(){let t=D;return t._getStorage(),t._storage}function wm(){return D.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function vm(t){D.set("settings",t)}var li,es,D,be,Se,In,Tm,Be=N(()=>{W();li=I.createScope("StorageService"),es=class t{constructor(e="youyou_toolkit"){this.namespaceKey=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext();if(r?.extensionSettings)return r.extensionSettings[this.namespaceKey]||(r.extensionSettings[this.namespaceKey]={}),this._storage={_target:r.extensionSettings[this.namespaceKey],getItem:s=>{let o=r.extensionSettings[this.namespaceKey][s];return typeof o=="string"?o:o?JSON.stringify(o):null},setItem:(s,o)=>{r.extensionSettings[this.namespaceKey][s]=o,this._saveSettings(r)},removeItem:s=>{delete r.extensionSettings[this.namespaceKey][s],this._saveSettings(r)},_isTavern:!0},this._storage}}catch{li.warn("SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage")}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,r)=>{try{localStorage.setItem(e,r)}catch(s){li.error("localStorage\u5199\u5165\u5931\u8D25:",s)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,r=null){let s=`${this.namespaceKey}:${e}`;if(this._cache.has(s))return this._cache.get(s);let o=this._getStorage(),n=this._getFullKey(e),a=o.getItem(n);if(a===null)return r;try{let i=JSON.parse(a);return this._cache.set(s,i),i}catch{return a}}set(e,r){let s=this._getStorage(),o=this._getFullKey(e),n=`${this.namespaceKey}:${e}`;this._cache.set(n,r);try{s.setItem(o,JSON.stringify(r))}catch(a){li.error("\u5B58\u50A8\u5931\u8D25:",a)}}remove(e){let r=this._getStorage(),s=this._getFullKey(e),o=`${this.namespaceKey}:${e}`;this._cache.delete(o),r.removeItem(s)}has(e){let r=this._getStorage(),s=this._getFullKey(e);return r.getItem(s)!==null}clear(){if(this._getStorage()._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let s=r.SillyTavern.getContext();s?.extensionSettings?.[this.namespaceKey]&&(s.extensionSettings[this.namespaceKey]={},this._saveSettings(s))}}else{let r=`${this.namespaceKey}_`,s=[];for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);n&&n.startsWith(r)&&s.push(n)}s.forEach(o=>localStorage.removeItem(o))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespaceKey}_${e}`}namespace(e){return new t(`${this.namespaceKey}:${e}`)}getMultiple(e){let r={};return e.forEach(s=>{r[s]=this.get(s)}),r}setMultiple(e){Object.entries(e).forEach(([r,s])=>{this.set(r,s)})}exportAll(){let e=this._getStorage(),r={};if(e._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let n=s.SillyTavern.getContext()?.extensionSettings?.[this.namespaceKey]||{};Object.entries(n).forEach(([a,i])=>{r[a]=typeof i=="string"?JSON.parse(i):i})}}else{let s=`${this.namespaceKey}_`;for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);if(n&&n.startsWith(s)){let a=n.slice(s.length);try{r[a]=JSON.parse(localStorage.getItem(n))}catch{r[a]=localStorage.getItem(n)}}}}return r}},D=new es("youyou_toolkit"),be=new es("youyou_toolkit:tools"),Se=new es("youyou_toolkit:presets"),In=new es("youyou_toolkit:windows");Tm=D});var id={};se(id,{API_STATUS:()=>Im,fetchAvailableModels:()=>Bm,getApiConfig:()=>Os,getEffectiveApiConfig:()=>Mo,hasEffectiveApiPreset:()=>Ro,sendApiRequest:()=>Po,sendWithPreset:()=>ui,testApiConnection:()=>Om,updateApiConfig:()=>Rm,validateApiConfig:()=>Mn});function Am(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function di(){return D.get(sd,Am())}function Cm(t){D.set(sd,t)}function od(){return D.get(_m,[])}function km(){return D.get(Em,"")}function ci(t,e={}){let r=new Error(t);return r.allowDirectFallback=e.allowDirectFallback===!0,r}function nd(t,e="chat_completions"){let r=String(t||"").trim();if(!r)return"";let s=null;try{s=new URL(r)}catch{return r}let o=s.pathname.replace(/\/+$/,""),n=o;return e==="chat_completions"?!/\/chat\/completions$/i.test(o)&&!/\/completions$/i.test(o)&&(n=`${o||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(o)?n=o.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(o)?n=o.replace(/\/completions$/i,"/models"):/\/models$/i.test(o)||(n=`${o||""}/models`)),s.pathname=n.replace(/\/+/g,"/"),s.toString()}function Mm(t){let e=String(t||"").trim();if(!e)return"";try{let r=new URL(e);return r.pathname=r.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",r.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function Os(){return di().apiConfig||{}}function Rm(t){let e=di();e.apiConfig={...e.apiConfig,...t},Cm(e)}function Mn(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function Mo(t=""){let e=di(),r=t||km()||"";if(r){let o=od().find(n=>n.name===r);if(o&&o.apiConfig)return{...o.apiConfig,presetName:o.name}}return e.apiConfig||{}}function Ro(t=""){return t?od().some(r=>r?.name===t):!1}async function ui(t,e,r={},s=null){let o=Mo(t);return await Po(e,{...r,apiConfig:o},s)}function ad(t,e={}){let r=e.apiConfig||Os();return{messages:t,model:r.model||"gpt-3.5-turbo",max_tokens:r.max_tokens||4096,temperature:r.temperature??.7,top_p:r.top_p??.9,stream:r.stream??!1,...e.extraParams}}function pi(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function Po(t,e={},r=null){let s=e.apiConfig||Os(),o=s.useMainApi,n=Mn(s);if(!n.valid&&!o)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${n.errors.join(", ")}`);return o?await Pm(t,e,r):await Nm(t,s,e,r)}async function Pm(t,e,r){let s=typeof window.parent<"u"?window.parent:window;if(!s.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let o=await s.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.apiConfig?.stream??Os().stream??!1,...e.extraParams});if(typeof o!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return o.trim()}catch(o){throw o.name==="AbortError"?o:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${o.message}`)}}async function Nm(t,e,r,s){let o=typeof window.parent<"u"?window.parent:window;if(o.TavernHelper?.generateRaw)try{return await Dm(t,e,r,s,o)}catch(n){let a=String(n?.message||n||"");if(n?.name==="AbortError"||s?.aborted||a.includes("\u505C\u6B62\u6309\u94AE")||a.includes("stop button")||a.includes("Clicked stop")||a==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")throw n;Sm.warn("TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",n)}if(o.SillyTavern?.getRequestHeaders)try{return await $m(t,e,r,s,o)}catch(n){if(!n?.allowDirectFallback)throw n}return await Lm(t,e,r,s)}async function Dm(t,e,r,s,o){if(s?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let n=await o.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.stream??!1,max_chat_history:0,custom_api:{apiurl:Mm(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...r.extraParams||{}});return typeof n=="string"?n.trim():pi(n)}async function $m(t,e,r,s,o){let n=String(e.url||"").trim(),a={...ad(t,{apiConfig:e,...r}),chat_completion_source:"custom",reverse_proxy:n,proxy_password:"",custom_url:n,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof o.SillyTavern?.getRequestHeaders=="function"?o.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(a),signal:s})}catch(u){throw u?.name==="AbortError"?u:ci(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw ci(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:u})}let d=null;try{d=c?JSON.parse(c):{}}catch{let y=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw ci(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${y||"(\u7A7A\u54CD\u5E94)"}`)}return pi(d)}async function Lm(t,e,r,s){let o=ad(t,{apiConfig:e,...r}),n=nd(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(n,{method:"POST",headers:a,body:JSON.stringify(o),signal:s}),l=await i.text().catch(()=>"");if(!i.ok){let d=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${d}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return pi(c)}async function Om(t=null){let e=t||Os(),r=Date.now();try{await Po([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let o=Date.now()-r;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${o}ms)`,latency:o}}catch(s){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${s.message}`,latency:Date.now()-r}}}async function Bm(t=null){let e=t||Os();return e.useMainApi?await zm():await Km(e)}async function zm(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function Km(t){if(!t.url||!t.apiKey)return[];try{let e=nd(t.url,"models"),r=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!r.ok)return[];let s=await r.json();return s.data&&Array.isArray(s.data)?s.data.map(o=>o.id||o.name).filter(Boolean).sort():[]}catch{return[]}}var Sm,sd,_m,Em,Im,Rn=N(()=>{Be();W();Sm=I.createScope("ApiConnection"),sd="settings",_m="api_presets",Em="current_preset";Im={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var ud={};se(ud,{createPreset:()=>Dn,createPresetFromCurrentConfig:()=>Gm,deletePreset:()=>$n,duplicatePreset:()=>gi,exportPresets:()=>hi,generateUniquePresetName:()=>Vm,getActiveConfig:()=>Ym,getActivePresetName:()=>mi,getAllPresets:()=>kr,getPreset:()=>rs,getPresetNames:()=>Fm,getStarredPresets:()=>Hm,importPresets:()=>bi,presetExists:()=>No,renamePreset:()=>fi,switchToPreset:()=>Ln,togglePresetStar:()=>Wm,updatePreset:()=>yi,validatePreset:()=>qm});function jm(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function dd(){return D.get(Um,jm())}function pt(){return D.get(ld,[])}function ts(t){D.set(ld,t)}function Nn(){return D.get(cd,"")}function Pn(t){D.set(cd,t||"")}function kr(){return pt()}function Fm(){return pt().map(e=>e.name)}function rs(t){return!t||typeof t!="string"?null:pt().find(r=>r.name===t)||null}function No(t){return!t||typeof t!="string"?!1:pt().some(r=>r.name===t)}function Dn(t){let{name:e,description:r,apiConfig:s}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let o=e.trim();if(No(o))return{success:!1,message:`\u9884\u8BBE "${o}" \u5DF2\u5B58\u5728`};let n={name:o,description:r||"",apiConfig:{url:s?.url||"",apiKey:s?.apiKey||"",model:s?.model||"",useMainApi:s?.useMainApi??!0,stream:s?.stream??!1,max_tokens:s?.max_tokens||4096,temperature:s?.temperature??.7,top_p:s?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=pt();return a.push(n),ts(a),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:n}}function yi(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=pt(),s=r.findIndex(a=>a.name===t);if(s===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let o=r[s],n={...o,...e,name:o.name,updatedAt:Date.now()};return e.apiConfig&&(n.apiConfig={...o.apiConfig,...e.apiConfig}),r[s]=n,ts(r),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:n}}function $n(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=pt(),r=e.findIndex(s=>s.name===t);return r===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(r,1),ts(e),Nn()===t&&Pn(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function fi(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(!No(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(No(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let s=pt(),o=s.find(n=>n.name===t);return o&&(o.name=r,o.updatedAt=Date.now(),ts(s),Nn()===t&&Pn(r)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${r}"`}}function gi(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim(),s=rs(t);if(!s)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(No(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(s)),name:r,createdAt:Date.now(),updatedAt:Date.now()},n=pt();return n.push(o),ts(n),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${r}"`,preset:o}}function Wm(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=pt(),r=e.find(s=>s.name===t);return r?(r.starred=!r.starred,r.updatedAt=Date.now(),ts(e),{success:!0,message:r.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:r.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Hm(){return pt().filter(e=>e.starred===!0)}function Ln(t){if(!t)return Pn(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=rs(t);return e?(Pn(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function mi(){return Nn()}function Ym(){let t=Nn();if(t){let r=rs(t);if(r)return{presetName:t,apiConfig:r.apiConfig}}return{presetName:"",apiConfig:dd().apiConfig||{}}}function hi(t=null){if(t){let r=rs(t);if(!r)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let e=pt();return JSON.stringify(e,null,2)}function bi(t,e={overwrite:!1}){let r;try{r=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let s=Array.isArray(r)?r:[r];if(s.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let o=pt(),n=0;for(let a of s){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let i=o.findIndex(l=>l.name===a.name);i>=0?e.overwrite&&(a.updatedAt=Date.now(),o[i]=a,n++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),o.push(a),n++)}return n>0&&ts(o),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${n} \u4E2A\u9884\u8BBE`,imported:n}}function Gm(t,e=""){let r=dd();return Dn({name:t,description:e,apiConfig:r.apiConfig})}function qm(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function Vm(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=pt(),r=new Set(e.map(o=>o.name));if(!r.has(t))return t;let s=1;for(;r.has(`${t} (${s})`);)s++;return`${t} (${s})`}var Um,ld,cd,Do=N(()=>{Be();Um="settings",ld="api_presets",cd="current_preset"});function cr(){return typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function oe(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function C(t,e,r=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let s=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(s.toastr){s.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:r,progressBar:!0});return}Xm(t,e,r),Jm.log(`[${t.toUpperCase()}] ${e}`)}function ns(t,e,r={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:s=3500,sticky:o=!1,noticeId:n=""}=r,a=cr();if(!a?.body){C(t,e,s);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",c=a.getElementById(i);if(c||(c=a.createElement("div"),c.id=i,c.style.cssText=`
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
    `,a.head.appendChild(h)}if(n){let h=c.querySelector(`[data-notice-id="${n}"]`);h&&h.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=a.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,n&&(u.dataset.noticeId=n);let y=a.createElement("span");y.className="yyt-top-notice__icon",y.textContent=d[t]||d.info;let p=a.createElement("div");p.className="yyt-top-notice__content",p.textContent=e;let g=a.createElement("button");g.className="yyt-top-notice__close",g.type="button",g.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),g.textContent="\xD7";let f=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};g.addEventListener("click",f),u.appendChild(y),u.appendChild(p),u.appendChild(g),c.appendChild(u),o||setTimeout(f,s)}function Xm(t,e,r){let s=cr();if(!s)return;let o=s.getElementById("yyt-fallback-toast");o&&o.remove();let n={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=n[t]||n.info,i=s.createElement("div");if(i.id="yyt-fallback-toast",i.style.cssText=`
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
    `,s.head.appendChild(l)}s.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},r)}function Q(){if(ss)return ss;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return ss=window.parent.jQuery,ss}catch{}return window.jQuery&&(ss=window.jQuery),ss}function Qm(){ss=null}function me(t){if(!t||t.length===0)return!1;let e=t[0];if(!e||e.nodeType!==1)return!1;let r=e.ownerDocument||document;return e.isConnected?r?.documentElement?.contains?r.documentElement.contains(e):!0:!1}function Ir(...t){return t.flat(1/0).flatMap(e=>String(e||"").split(/\s+/)).map(e=>e.trim()).filter(Boolean).join(" ")}function Bs(t={}){return Object.entries(t).filter(([,e])=>e!=null&&e!==!1).map(([e,r])=>r===!0?e:`${e}="${oe(String(r))}"`).join(" ")}function gd(t=[],e="",r=""){let s=String(e??""),o=t.find(n=>n.value===s)||t.find(n=>n.disabled!==!0)||null;return o||{value:s,label:r||s||"\u8BF7\u9009\u62E9",disabled:!1}}function Zm(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(e=>e&&e!=="yyt-select"&&e!=="yyt-native-select-bridge")}function pd(t,e){let r=Q();if(!r||!e?.length)return null;let s=e.attr("id")?`#${e.attr("id")}`:e.attr("data-yyt-select-key")?`[data-yyt-select-key="${e.attr("data-yyt-select-key")}"]`:"";if(!s)return null;let n=t.find("[data-yyt-custom-select]").filter((a,i)=>String(r(i).attr("data-yyt-select-target")||"")===s);return n.length?n.first():null}function md(t){let e=t?.[0];return e?.ownerDocument?e.ownerDocument:typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function eh(t){if(!Q()||!me(t))return null;let r=t.find("[data-yyt-custom-select]");return r.length?r:null}function hd(t,e){if(!Q()||!e?.length)return null;let s=e.find("[data-yyt-select-native]").first();if(s.length)return s;let o=String(e.attr("data-yyt-select-target")||"").trim();if(!o)return null;let n=t.find(o).first();return n.length?n:null}function bd(t=null){return t?.jquery&&t[0]?.ownerDocument?t[0].ownerDocument:t?.ownerDocument?t.ownerDocument:t?.nodeType===9?t:cr()}function Vt(t=null){let e=bd(t),r=yd.get(e);return r||(r={targetDoc:e,layer:null,activeRoot:null,activeDropdown:null,placeholder:null,cleanup:null},yd.set(e,r)),r}function th(t=null){let e=bd(t);if(!e?.body)return null;let r=Vt(e);if(r.layer&&r.layer.isConnected)return r.layer;let s=e.getElementById(fd);return s||(s=e.createElement("div"),s.id=fd,s.className="yyt-select-portal-layer",e.body.appendChild(s)),r.layer=s,s}function On(t){if(!Q()||!t?.length)return null;let r=t.find("[data-yyt-select-trigger]").first();return r.length?r:t.find(".yyt-select-trigger").first()}function xd(t){let e=Q();if(!e||!t?.length)return null;let r=Vt(t);if(r.activeRoot===t[0]&&r.activeDropdown)return e(r.activeDropdown);let s=t.find("[data-yyt-select-dropdown]").first();return s.length?s:t.find(".yyt-select-dropdown").first()}function rh(t){t&&(t.classList.remove("yyt-floating-open"),t.removeAttribute("data-yyt-floating"),t.removeAttribute("data-yyt-floating-placement"),t.style.position="",t.style.top="",t.style.left="",t.style.right="",t.style.width="",t.style.minWidth="",t.style.maxWidth="",t.style.maxHeight="",t.style.visibility="",t.style.zIndex="")}function wd(t,e=null){if(!t)return!1;let r=Vt(e||t);return r.activeRoot?.contains?.(t)||r.activeDropdown?.contains?.(t)?!0:!!t.closest?.("[data-yyt-custom-select], .yyt-select-portal-layer")}function sh(t){if(!t?.targetDoc||typeof t.cleanup=="function")return;let e=t.targetDoc,r=e.defaultView||window,s=i=>{!t.activeRoot||!t.activeDropdown||wd(i.target,e)||qt(e)},o=i=>{if(i.key!=="Escape")return;let l=t.activeRoot;qt(e);let c=Q();c&&l&&On(c(l))?.trigger("focus")},n=()=>{Ti(e)},a=()=>{Ti(e)};e.addEventListener("mousedown",s,!0),e.addEventListener("keydown",o,!0),r.addEventListener("resize",n),e.addEventListener("scroll",a,!0),t.cleanup=()=>{e.removeEventListener("mousedown",s,!0),e.removeEventListener("keydown",o,!0),r.removeEventListener("resize",n),e.removeEventListener("scroll",a,!0)}}function oh(t){typeof t?.cleanup=="function"&&t.cleanup(),t&&(t.cleanup=null)}function vi(t){let e=Q();if(!e||!t?.activeRoot||!t?.activeDropdown)return;let r=t.targetDoc;if(!r?.body?.contains?.(t.activeRoot)){qt(r);return}let s=e(t.activeRoot),o=On(s),n=t.activeDropdown,a=r?.defaultView||window;if(!o?.length||!n?.isConnected||!s[0]?.isConnected){qt(r);return}let i=o[0].getBoundingClientRect(),l=a.innerWidth||r.documentElement?.clientWidth||0,c=a.innerHeight||r.documentElement?.clientHeight||0,d=12,u=8,y=Math.max(0,c-i.bottom-d-u),p=Math.max(0,i.top-d-u),g=y<220&&p>y,h=Math.max(120,Math.floor((g?p:y)||0));n.setAttribute("data-yyt-floating","true"),n.setAttribute("data-yyt-floating-placement",g?"top":"bottom"),n.classList.add("yyt-floating-open");let x=Math.ceil(i.width),T=Math.max(x,Math.floor(l-d*2)),v=n.style.width,z=n.style.minWidth,M=n.style.maxWidth,S=n.style.visibility;n.style.width="max-content",n.style.minWidth=`${x}px`,n.style.maxWidth=`${T}px`,n.style.visibility="hidden";let E=Math.ceil(n.scrollWidth||n.getBoundingClientRect().width||x),G=Math.max(x,Math.min(T,E)),q=Math.min(n.scrollHeight||h,h);n.style.width=v,n.style.minWidth=z,n.style.maxWidth=M,n.style.visibility=S;let $=Math.round(i.left);$+G>l-d&&($=Math.max(d,Math.round(l-d-G))),$=Math.max(d,$);let A=Math.round(g?i.top-u-q:i.bottom+u);A=Math.max(d,Math.min(A,Math.round(c-d-q))),n.style.position="fixed",n.style.top=`${A}px`,n.style.left=`${$}px`,n.style.right="auto",n.style.width=`${G}px`,n.style.minWidth=`${x}px`,n.style.maxWidth=`${T}px`,n.style.maxHeight=`${Math.floor(h)}px`,n.style.visibility="",n.style.zIndex="10050"}function qt(t=null){let e=Q(),r=Vt(t);if(!e||!r?.activeRoot)return;let s=r.activeRoot,o=r.activeDropdown,n=r.placeholder,a=e(s),i=On(a);o&&(rh(o),n?.parentNode?n.parentNode.insertBefore(o,n):s?.isConnected?s.appendChild(o):o.remove()),n?.parentNode?.removeChild(n),a.removeClass("yyt-open"),i?.attr("aria-expanded","false"),r.activeRoot=null,r.activeDropdown=null,r.placeholder=null,oh(r)}function Ti(t=null){let e=Vt(t);!e?.activeRoot||!e?.activeDropdown||vi(e)}function vd(t){if(!Q()||!t?.length)return;let r=t.first(),s=On(r),o=xd(r);if(!s?.length||!o?.length||s.prop("disabled"))return;let n=Vt(r);if(n.activeRoot===r[0]){vi(n);return}qt(r);let a=th(r);if(!a)return;let i=o[0],l=n.targetDoc.createComment("yyt-select-dropdown-placeholder");i.parentNode?.insertBefore(l,i),a.appendChild(i),n.activeRoot=r[0],n.activeDropdown=i,n.placeholder=l,r.addClass("yyt-open"),s.attr("aria-expanded","true"),sh(n),vi(n)}function nh(t,e){let r=Q();if(!r||!e?.length)return null;let s=e.closest("[data-yyt-custom-select]");if(s.length)return s.first();let o=Vt(e);if(o.activeRoot&&o.activeDropdown?.contains?.(e[0])){let n=r(o.activeRoot);return t.has(o.activeRoot).length?n:null}return null}function Si(t){let e=Vt(t);t?.length&&e.activeRoot&&e.activeRoot!==t[0]||qt(t)}function Td(t){let e=Vt(t);if(t?.length&&e.activeRoot===t[0]){qt(t);return}vd(t)}function xi(t,e,r=null){let s=Q();if(!s||!e?.length)return;let o=r||hd(t,e);if(!o?.length)return;let n=Array.isArray(o.data("yytCustomSelectOptions"))?o.data("yytCustomSelectOptions"):[],a=gd(n,o.val(),e.attr("data-yyt-select-placeholder")||""),i=String(a.value??""),l=String(a.label??""),c=o.is(":disabled");e.find(".yyt-select-value").text(l).attr("data-value",i).data("value",i);let d=xd(e);(d?.length?d.find("[data-yyt-select-option]"):e.find("[data-yyt-select-option]")).each((p,g)=>{let f=s(g),h=String(f.attr("data-value")||"")===i;f.toggleClass("yyt-selected",h).attr("aria-selected",String(h))});let y=e.find("[data-yyt-select-trigger]").first();y.prop("disabled",c),c&&(Si(e),e.removeClass("yyt-open"),y.attr("aria-expanded","false"))}function Sd(t=[]){return Array.isArray(t)?t.map(e=>{if(e&&typeof e=="object"&&!Array.isArray(e)){let s=String(e.value??""),o=String(e.label??e.text??e.name??s);return{value:s,label:o,disabled:e.disabled===!0}}let r=String(e??"");return{value:r,label:r,disabled:!1}}):[]}function _d(t={}){let{selectedValue:e="",options:r=[],placeholder:s="\u8BF7\u9009\u62E9",disabled:o=!1,includeNative:n=!0,nativeTag:a="input",nativeType:i="hidden",rootAttributes:l={},nativeAttributes:c={},triggerAttributes:d={},dropdownAttributes:u={},optionAttributes:y={},optionClass:p="",optionTextClass:g=""}=t,f=Sd(r),h=gd(f,e,s),x=o===!0||f.length===0,T=Bs({...l,class:Ir("yyt-custom-select",l.class),"data-yyt-custom-select":l["data-yyt-custom-select"]??"true","data-yyt-select-placeholder":s}),v=Bs({type:"button",...d,class:Ir("yyt-select-trigger",d.class),"data-yyt-select-trigger":d["data-yyt-select-trigger"]??"true","aria-haspopup":d["aria-haspopup"]??"listbox","aria-expanded":d["aria-expanded"]??"false",disabled:x?!0:d.disabled}),z=Bs({...u,class:Ir("yyt-select-dropdown",u.class),"data-yyt-select-dropdown":u["data-yyt-select-dropdown"]??"true",role:u.role??"listbox"}),M=n?(()=>{let S={...c,class:Ir(c.class),"data-yyt-select-native":c["data-yyt-select-native"]??"true",disabled:x?!0:c.disabled};return a==="select"?`<select ${Bs(S)}>${f.map(q=>`
            <option value="${oe(q.value)}" ${q.value===String(h.value??"")?"selected":""} ${q.disabled?"disabled":""}>${oe(q.label)}</option>
          `).join("")}</select>`:`<input ${Bs({type:i,value:h.value,...S})}>`})():"";return`
    <div ${T}>
      ${M}
      <button ${v}>
        <span class="${oe(Ir("yyt-select-value"))}" data-value="${oe(h.value)}">${oe(h.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${z}>
        ${f.map(S=>{let E=S.value===String(h.value??"");return`
            <button ${Bs({type:"button",...y,class:Ir("yyt-select-option",p,y.class,E?"yyt-selected":""),"data-yyt-select-option":y["data-yyt-select-option"]??"true","data-value":S.value,role:y.role??"option","aria-selected":E?"true":"false",disabled:S.disabled?!0:y.disabled})}>
              <span class="${oe(Ir("yyt-option-text",g))}">${oe(S.label)}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function it(t,e="yytCustomSelect"){let r=Q();if(!r||!me(t))return;let s=md(t),o=Vt(s);o.activeRoot&&t.has(o.activeRoot).length&&qt(s),t.off(`.${e}`),r(s).off(`click.${e}`),r(s).off(`mousedown.${e}`),t.find('[data-yyt-enhanced-select="true"]').remove(),t.find(".yyt-native-select-bridge").each((n,a)=>{let i=r(a),l=i.attr("data-yyt-original-style");l!==void 0&&l?i.attr("style",l):i.removeAttr("style"),i.removeClass("yyt-native-select-bridge").removeAttr("data-yyt-original-style").removeAttr("data-yyt-select-key").removeData("yytCustomSelectOptions")})}function Mt(t,e={}){let r=Q();if(!r||!me(t))return;let{namespace:s="yytCustomSelect",selectors:o=[]}=e,n=Array.isArray(o)?o.filter(Boolean):[o].filter(Boolean);if(n.length===0)return;it(t,s);let a=n.join(", "),i=md(t);t.find(a).each((l,c)=>{let d=r(c),u=String(d.attr("id")||"").trim(),y=u||`yyt-select-${Date.now()}-${l}`,p=u?`#${u}`:`[data-yyt-select-key="${y}"]`,g=`${y}-dropdown`,f=Zm(d.attr("class")),h=d.attr("style"),x=d.find("option").map((z,M)=>{let S=r(M);return{value:String(S.attr("value")??S.val()??""),label:S.text(),disabled:S.is(":disabled")}}).get();d.attr("data-yyt-original-style",h??"").attr("data-yyt-select-key",y).addClass("yyt-native-select-bridge").css("display","none").data("yytCustomSelectOptions",x);let T=_d({includeNative:!1,selectedValue:d.val(),options:x,disabled:d.is(":disabled"),placeholder:x[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{class:Ir(f),style:h||void 0,"data-yyt-enhanced-select":"true","data-yyt-select-target":p},triggerAttributes:{id:`${y}-trigger`,"aria-controls":g},dropdownAttributes:{id:g}});d.after(T);let v=pd(t,d);xi(t,v,d)}),t.on(`click.${s}`,"[data-yyt-select-trigger]",l=>{l.preventDefault(),l.stopPropagation();let c=r(l.currentTarget);if(c.prop("disabled"))return;let d=c.closest("[data-yyt-custom-select]");Td(d)}),t.on(`change.${s}`,a,l=>{let c=r(l.currentTarget),d=c.find("option").map((y,p)=>{let g=r(p);return{value:String(g.attr("value")??g.val()??""),label:g.text(),disabled:g.is(":disabled")}}).get();c.data("yytCustomSelectOptions",d);let u=pd(t,c);xi(t,u,c)}),r(i).off(`click.${s}`).on(`click.${s}`,l=>{if(wd(l.target,i))return;let c=eh(t);c?.length&&(qt(i),c.filter(".yyt-open").removeClass("yyt-open").find("[data-yyt-select-trigger]").attr("aria-expanded","false"))}),r(i).off(`mousedown.${s}`,".yyt-select-portal-layer [data-yyt-select-option]").on(`mousedown.${s}`,".yyt-select-portal-layer [data-yyt-select-option]",l=>{l.preventDefault(),l.stopPropagation();let c=r(l.currentTarget);if(c.prop("disabled"))return;let d=nh(t,c);if(!d?.length)return;let u=hd(t,d);if(!u?.length)return;let y=String(c.attr("data-value")||"");u.val(y).trigger("change"),xi(t,d,u),Si(d)})}function ah(t,e=os){if(!Q()||!me(t))return{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9};let s=t.find(`#${e}-model`).val()?.trim()||"",o=t.find(`#${e}-model-select`);return o.is(":visible")&&(s=o.val()||s),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:s,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),stream:t.find(`#${e}-stream`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function ih(t,e,r=os){if(!Q()||!me(t)||!e)return;t.find(`#${r}-api-url`).val(e.url||""),t.find(`#${r}-api-key`).val(e.apiKey||""),t.find(`#${r}-model`).val(e.model||""),t.find(`#${r}-stream`).prop("checked",e.stream===!0),t.find(`#${r}-max-tokens`).val(e.max_tokens||4096),t.find(`#${r}-temperature`).val(e.temperature??.7),t.find(`#${r}-top-p`).val(e.top_p??.9);let o=e.useMainApi??!0;t.find(`#${r}-use-main-api`).prop("checked",o);let a=t.find(`#${r}-custom-api-fields`);o?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${r}-model`).show(),t.find(`#${r}-model-select`).hide()}function $o(t){let{id:e,title:r,body:s,width:o="380px",wide:n=!1,dialogClass:a="",bodyClass:i="",footerClass:l=""}=t;return`
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
  `}function Lo(t,e,r={}){if(!Q())return()=>{};let o=t.find(`#${e}-overlay`),n=()=>{o.remove(),a?.removeEventListener("keydown",i),r.onClose&&r.onClose()};o.find(`#${e}-close, #${e}-cancel`).on("click",n),o.on("click",function(l){l.target===this&&n()}),o.find(`#${e}-save`).on("click",function(){r.onSave&&r.onSave(n)});let a=o[0]?.ownerDocument||document,i=l=>{l.key==="Escape"&&(l.stopPropagation(),n())};return a.addEventListener("keydown",i),n}function dr(t,e,r={}){let{confirmText:s="\u786E\u5B9A",cancelText:o="\u53D6\u6D88",danger:n=!1,width:a="380px"}=r,i=Q(),l=cr();if(!i||!l?.body)return Promise.resolve(!1);let c=`yyt-confirm-${++Ed}`;return new Promise(d=>{let u=!1,y=h=>{u||(u=!0,f.remove(),p?.focus(),d(h))},p=l.activeElement,g=`
      <div class="yyt-dialog-overlay" id="${c}-overlay">
        <div class="yyt-dialog" style="${a!=="380px"?`width: ${a};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${oe(t)}</span>
            <button class="yyt-dialog-close" id="${c}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${oe(e)}</div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${c}-cancel">${oe(o)}</button>
            <button class="yyt-btn ${n?"yyt-btn-danger":"yyt-btn-primary"}" id="${c}-confirm">${oe(s)}</button>
          </div>
        </div>
      </div>`,f=i(g).appendTo(l.body);f.find(`#${c}-confirm`).on("click",()=>y(!0)),f.find(`#${c}-cancel, #${c}-close`).on("click",()=>y(!1)),f.on("click",function(h){h.target===this&&y(!1)}),f.on("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),y(!1)),h.key==="Enter"&&(h.stopPropagation(),y(!0))}),f.find(`#${c}-${n?"cancel":"confirm"}`).trigger("focus")})}function lh(t,e,r={}){let{defaultValue:s="",placeholder:o="",confirmText:n="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",width:i="380px"}=r,l=Q(),c=cr();if(!l||!c?.body)return Promise.resolve(null);let d=`yyt-prompt-${++Ed}`;return new Promise(u=>{let y=!1,p=v=>{y||(y=!0,h.remove(),g?.focus(),u(v))},g=c.activeElement,f=`
      <div class="yyt-dialog-overlay" id="${d}-overlay">
        <div class="yyt-dialog" style="${i!=="380px"?`width: ${i};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${oe(t)}</span>
            <button class="yyt-dialog-close" id="${d}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            ${e?`<div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${oe(e)}</div>`:""}
            <input class="yyt-input" id="${d}-input" type="text" value="${oe(s)}" placeholder="${oe(o)}" />
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${d}-cancel">${oe(a)}</button>
            <button class="yyt-btn yyt-btn-primary" id="${d}-confirm">${oe(n)}</button>
          </div>
        </div>
      </div>`,h=l(f).appendTo(c.body),x=h.find(`#${d}-input`),T=()=>{let v=x.val().trim();p(v||null)};h.find(`#${d}-confirm`).on("click",T),h.find(`#${d}-cancel, #${d}-close`).on("click",()=>p(null)),h.on("click",function(v){v.target===this&&p(null)}),x.on("keydown",v=>{v.key==="Enter"&&(v.stopPropagation(),T())}),h.on("keydown",v=>{v.key==="Escape"&&(v.stopPropagation(),p(null))}),x.trigger("focus").trigger("select")})}function ch(t,e,r){if(t.prop("disabled")&&t.data("yytLoading"))return Promise.resolve();let s=t.html(),o=t.outerWidth();if(t.prop("disabled",!0).data("yytLoading",!0),t.css("min-width",o+"px"),r)t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${oe(r)}`);else{let n=t.find("i.fa-solid, i.fa-regular").first();n.length?(n.data("yytOriginalClass",n.attr("class")),n.attr("class","fa-solid fa-spinner fa-spin")):t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${s}`)}return Promise.resolve().then(()=>e()).finally(()=>{if(r)t.html(s);else{let n=t.find("i.fa-spinner"),a=n.data("yytOriginalClass");a?n.attr("class",a).removeData("yytOriginalClass"):t.html(s)}t.prop("disabled",!1).removeData("yytLoading").css("min-width","")})}function Oo(t,e){let r=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(r),o=document.createElement("a");o.href=s,o.download=e,o.click(),URL.revokeObjectURL(s)}function Bo(t){return new Promise((e,r)=>{let s=new FileReader;s.onload=o=>e(o.target.result),s.onerror=o=>r(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),s.readAsText(t)})}var Jm,os,wi,ss,yd,fd,Ed,Ge=N(()=>{W();Jm=I.createScope("UIUtils"),os="youyou_toolkit",wi=class{constructor(e={}){this._state={...e}}get(e){return this._state[e]}set(e,r){return this._state[e]=r,this}reset(e={}){return this._state={...e},this}toJSON(){return{...this._state}}};ss=null;yd=new WeakMap,fd="yyt-select-portal-layer";Ed=0});var zs,zo,Kt,_i=N(()=>{Ye();Ge();W();zs=I.createScope("UIManager"),zo=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,K.emit(O.UI_INITIALIZED),zs.log("\u521D\u59CB\u5316\u5B8C\u6210"))}register(e,r){return!e||!r?(zs.warn("\u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...r,render:r.render||(()=>""),bindEvents:r.bindEvents||(()=>{}),destroy:r.destroy||(()=>{}),getStyles:r.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,r,s={}){let o=Q();if(!o){zs.error("jQuery\u4E0D\u53EF\u7528");return}let n=this.components.get(e);if(!n){zs.error(`\u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);let i;typeof r=="string"?i=o(r):r&&r.jquery?i=r:r&&(i=o(r)),i?.length&&i.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u672A\u6CE8\u518C\uFF1A${e}</span></div>`);return}let a;if(typeof r=="string"?a=o(r):r&&r.jquery?a=r:r&&(a=o(r)),!me(a)){zs.warn("\u5BB9\u5668\u4E0D\u5B58\u5728");return}this.activeInstances.forEach((i,l)=>{i?.container?.length&&a.length&&i.container[0]===a[0]&&l!==e&&this.destroyInstance(l)}),this.destroyInstance(e);try{if(typeof n.renderTo=="function")n.renderTo(a,{...s,dependencies:this.dependencies});else{let i=n.render({...s,dependencies:this.dependencies});a.html(i),n.bindEvents(a,this.dependencies)}}catch(i){zs.error(`\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25: ${e}`,i),a.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25\uFF1A${e}${i?.message?` - ${i.message}`:""}</span></div>`);return}this.activeInstances.set(e,{container:a,component:n,props:s}),K.emit(O.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let r=this.activeInstances.get(e);r&&(r.component.destroy(r.container),this.activeInstances.delete(e))}destroyContainerInstance(e){let r=Q();if(!r||!e)return;let s;if(typeof e=="string"?s=r(e):e?.jquery?s=e:s=r(e),!s?.length)return;let o=[];this.activeInstances.forEach((n,a)=>{n?.container?.length&&n.container[0]===s[0]&&o.push(a)}),o.forEach(n=>this.destroyInstance(n))}switchTab(e){let r=this.currentTab;this.currentTab=e,K.emit(O.UI_TAB_CHANGED,{tabId:e,oldTab:r})}getCurrentTab(){return this.currentTab}switchSubTab(e,r){this.currentSubTab[e]=r,K.emit(O.UI_SUBTAB_CHANGED,{mainTab:e,subTab:r})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((r,s)=>{r.getStyles&&(e+=r.getStyles())}),e}injectStyles(e=document){let r="yyt-component-styles";if(e.getElementById(r))return;let s=e.createElement("style");s.id=r,s.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(s)}setDependency(e,r){this.dependencies[e]=r}getDependency(e){return this.dependencies[e]}_subscribeEvents(){K.on(O.PRESET_UPDATED,()=>{}),K.on(O.TOOL_UPDATED,()=>{})}},Kt=new zo});function m(t,e={},...r){let s=document.createElement(t);if(e.className&&(s.className=e.className),e.text!==void 0&&e.text!==null&&(s.textContent=String(e.text)),e.html!==void 0&&e.html!==null&&(s.innerHTML=String(e.html)),e.attrs)for(let[o,n]of Object.entries(e.attrs))n==null||n===!1||s.setAttribute(o,n===!0?"":String(n));if(e.style&&Object.assign(s.style,e.style),e.dataset)for(let[o,n]of Object.entries(e.dataset))s.dataset[o]=String(n);for(let o of r)F(s,o);return s}function F(t,e){if(!(e==null||e===!1)){if(Array.isArray(e)){for(let r of e)F(t,r);return}if(typeof e=="string"||typeof e=="number"){t.appendChild(document.createTextNode(String(e)));return}if(e instanceof Node){t.appendChild(e);return}if(e&&e.el instanceof Node){t.appendChild(e.el);return}}}function Ad(){let t=new Map;return{on(e,r){return!e||typeof r!="function"?()=>{}:(t.has(e)||t.set(e,new Set),t.get(e).add(r),()=>this.off(e,r))},off(e,r){let s=t.get(e);s&&s.delete(r)},emit(e,...r){let s=t.get(e);if(s)for(let o of[...s])try{o(...r)}catch{}},clear(){t.clear()}}}function Ei(t,e){if(!t||!e)return null;if(t._id===e)return t;let r=t._children;if(!r)return null;let s=r instanceof Map?[...r.values()]:Array.isArray(r)?r:[];for(let o of s){let n=Ei(o,e);if(n)return n}return null}function Me({id:t=null,kind:e="control"}={}){let r=Ad();return{_id:t||null,_kind:e,_children:null,_emitter:r,on(s,o){return r.on(s,o)},off(s,o){r.off(s,o)},getControl(s){return Ei(this,s)},get(){},set(s){},destroy(){if(r.clear(),this._children){let s=this._children instanceof Map?[...this._children.values()]:Array.isArray(this._children)?this._children:[];for(let o of s)try{o?.destroy?.()}catch{}this._children instanceof Map?this._children.clear():Array.isArray(this._children)&&(this._children.length=0)}if(this.el?.parentNode)try{this.el.parentNode.removeChild(this.el)}catch{}}}}var lt=N(()=>{});function pe(t={}){let{id:e=null,label:r="",icon:s=null,variant:o="default",size:n="normal",disabled:a=!1,title:i=null,onClick:l=null}=t,c=["yyt-btn"];o==="primary"?c.push("yyt-btn-primary"):o==="danger"?c.push("yyt-btn-danger"):o==="ghost"&&c.push("yyt-btn-secondary"),n==="small"&&c.push("yyt-btn-small");let d=m("button",{className:c.join(" "),attrs:{type:"button",disabled:a?"disabled":null,title:i}}),u=null;s&&(u=m("span",{className:"yyt-btn-icon-glyph",text:s}),d.appendChild(u));let y=m("span",{text:r});d.appendChild(y);let p={...Me({id:e,kind:"button"}),el:d,setLabel(g){y.textContent=String(g||"")},setIcon(g){u&&(u.textContent=String(g||""))},setDisabled(g){g?d.setAttribute("disabled","disabled"):d.removeAttribute("disabled")},isDisabled(){return d.hasAttribute("disabled")},get(){return y.textContent},set(g){this.setLabel(g)}};return d.addEventListener("click",g=>{if(!d.hasAttribute("disabled")){if(typeof l=="function")try{l(g,p)}catch{}p._emitter.emit("click",g)}}),p}var Cd=N(()=>{lt()});function Xe(t={}){let{id:e=null,placeholder:r="",value:s="",type:o="text",disabled:n=!1,maxLength:a=null,onInput:i=null,onChange:l=null}=t,c=m("input",{className:"yyt-input",attrs:{type:o,placeholder:r,disabled:n?"disabled":null,maxlength:a!=null?String(a):null}});c.value=s==null?"":String(s);let d={...Me({id:e,kind:"textInput"}),el:c,get(){return c.value},set(u,{silent:y=!1}={}){c.value=u==null?"":String(u),y||d._emitter.emit("change",c.value)},setPlaceholder(u){c.placeholder=u==null?"":String(u)},setDisabled(u){c.disabled=!!u},focus(){c.focus()},select(){c.select()}};return c.addEventListener("input",()=>{if(typeof i=="function")try{i(c.value,d)}catch{}d._emitter.emit("input",c.value)}),c.addEventListener("change",()=>{if(typeof l=="function")try{l(c.value,d)}catch{}d._emitter.emit("change",c.value)}),c.addEventListener("blur",()=>d._emitter.emit("blur",c.value)),d}var kd=N(()=>{lt()});function qe(t={}){let{id:e=null,options:r=[],value:s="",placeholder:o=null,disabled:n=!1,onChange:a=null}=t,i=m("select",{className:"yyt-select",attrs:{disabled:n?"disabled":null}});function l(d,u){if(i.innerHTML="",o!==null){let y=m("option",{text:o,attrs:{value:"",disabled:"disabled",selected:u?null:"selected"}});i.appendChild(y)}for(let y of d){let p=m("option",{text:y.label??String(y.value),attrs:{value:String(y.value),selected:String(y.value)===String(u)?"selected":null,disabled:y.disabled?"disabled":null}});i.appendChild(p)}}l(r,s);let c={...Me({id:e,kind:"select"}),el:i,get(){return i.value},set(d,{silent:u=!1}={}){i.value=d==null?"":String(d),u||c._emitter.emit("change",i.value)},setOptions(d,u){l(d||[],u??i.value)},setDisabled(d){i.disabled=!!d}};return i.addEventListener("change",()=>{if(typeof a=="function")try{a(i.value,c)}catch(d){typeof console<"u"&&console.error&&console.error("[selectInput] onChange \u5F02\u5E38",d)}c._emitter.emit("change",i.value)}),c}var Id=N(()=>{lt()});function Rt(t={}){let{id:e=null,label:r="",hint:s="",checked:o=!1,disabled:n=!1,onChange:a=null}=t,i=m("label",{className:"yyt-toggle-label"});r&&i.appendChild(m("span",{text:r})),s&&i.appendChild(m("span",{className:"yyt-toggle-hint",text:s}));let l=m("input",{attrs:{type:"checkbox",disabled:n?"disabled":null}});l.checked=!!o;let c=m("span",{className:"yyt-toggle-slider"}),d=m("label",{className:"yyt-toggle"});d.appendChild(l),d.appendChild(c);let u=m("div",{className:"yyt-toggle-row"});u.appendChild(i),u.appendChild(d),i.addEventListener("click",p=>{p.preventDefault(),!l.disabled&&(l.checked=!l.checked,l.dispatchEvent(new Event("change",{bubbles:!0})))});let y={...Me({id:e,kind:"toggle"}),el:u,get(){return!!l.checked},set(p,{silent:g=!1}={}){l.checked=!!p,g||y._emitter.emit("change",!!p)},setDisabled(p){l.disabled=!!p}};return l.addEventListener("change",()=>{let p=!!l.checked;if(typeof a=="function")try{a(p,y)}catch{}y._emitter.emit("change",p)}),y}var Md=N(()=>{lt()});var Rd=N(()=>{lt()});var Pd=N(()=>{lt()});function bt(t={}){let{id:e=null,label:r="",hint:s="",control:o=null,inline:n=!1}=t,a=m("div",{className:"yyt-form-group",style:n?{flexDirection:"row",alignItems:"center",gap:"12px"}:null});r&&a.appendChild(m("label",{text:r,style:n?{flex:"0 0 auto",minWidth:"120px"}:null}));let i=m("div",{style:n?{flex:"1",minWidth:"0"}:null});o&&F(i,o),a.appendChild(i),s&&a.appendChild(m("div",{className:"yyt-form-hint",text:s}));let l=o?[o]:[];return{...Me({id:e,kind:"formRow"}),el:a,_children:l,get(){return o?.get?.()},set(c,d){o?.set?.(c,d)},setControl(c){i.innerHTML="",l.length=0,c&&(F(i,c),l.push(c))}}}var Nd=N(()=>{lt()});function Bn(t={}){let{id:e=null,icon:r=null,name:s="",desc:o="",active:n=!1,disabled:a=!1,actions:i=[],onClick:l=null}=t,c=["yyt-list-row"];n&&c.push("yyt-list-row-active"),a&&c.push("yyt-list-row-disabled");let d=m("div",{className:c.join(" "),style:a?{opacity:"0.5",pointerEvents:"none"}:null});r&&d.appendChild(m("div",{className:"yyt-list-row-icon",text:r}));let u=m("div",{className:"yyt-list-row-main"}),y=m("div",{className:"yyt-list-row-name",text:s});u.appendChild(y);let p=null;o&&(p=m("div",{className:"yyt-list-row-desc",text:o}),u.appendChild(p)),d.appendChild(u);let g=null;if(i&&i.length){g=m("div",{className:"yyt-list-row-actions"});for(let h of i)F(g,h);d.appendChild(g)}typeof l=="function"&&(d.style.cursor="pointer",d.addEventListener("click",h=>{h.target.closest(".yyt-list-row-actions")||(l(h,f),f._emitter.emit("click",h))}));let f={...Me({id:e,kind:"listRow"}),el:d,_children:i||[],setName(h){y.textContent=h==null?"":String(h)},setDesc(h){if(p)p.textContent=h==null?"":String(h);else{if(!h)return;p=m("div",{className:"yyt-list-row-desc",text:h}),u.appendChild(p)}},setActive(h){h?d.classList.add("yyt-list-row-active"):d.classList.remove("yyt-list-row-active")},setDisabled(h){h?(d.classList.add("yyt-list-row-disabled"),d.style.opacity="0.5",d.style.pointerEvents="none"):(d.classList.remove("yyt-list-row-disabled"),d.style.opacity="",d.style.pointerEvents="")}};return f}var Dd=N(()=>{lt()});function Ut(t={}){let{id:e=null,heading:r="",icon:s=null,actions:o=[],content:n=[]}=t,a=m("div",{className:"yyt-flow-section"}),i=null,l=null,c=null;if(r||s||o&&o.length){if(i=m("div",{className:"yyt-flow-heading"}),s&&(l=m("span",{className:"yyt-flow-heading-icon",text:s}),i.appendChild(l)),r&&i.appendChild(m("span",{text:r})),o&&o.length){c=m("div",{className:"yyt-flow-heading-action"});for(let p of o)F(c,p);i.appendChild(c)}a.appendChild(i)}let d=m("div",{className:"yyt-flow-content"}),u=[];for(let p of n||[])p&&(F(d,p),u.push(p));for(let p of o||[])p&&typeof p=="object"&&p.el&&u.push(p);return a.appendChild(d),{...Me({id:e,kind:"flowSection"}),el:a,_children:u,appendContent(p){p&&(F(d,p),p&&typeof p=="object"&&p.el&&u.push(p))},clearContent(){d.innerHTML="";let p=u.filter(g=>(o||[]).includes(g));u.length=0;for(let g of p)u.push(g)},setHeading(p){if(!i)return;let g=i.querySelector("span:not(.yyt-flow-heading-icon):not(.yyt-flow-heading-action)");g&&(g.textContent=p==null?"":String(p))},setIcon(p){l&&(l.textContent=p==null?"":String(p))}}}var $d=N(()=>{lt()});function zn(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent.document}catch{}return document}function Ai({title:t,width:e,wide:r}){let s=`yyt-ctrl-dialog-${++dh}`,o=m("div",{className:"yyt-dialog-overlay",attrs:{"data-dialog-id":s}}),n={};e&&e!=="380px"&&(n.width=e),n.maxHeight="calc(100vh - 32px)";let a=m("div",{className:`yyt-dialog${r?" yyt-dialog-wide":""}`,style:n}),i=m("div",{className:"yyt-dialog-header"});i.appendChild(m("span",{className:"yyt-dialog-title",text:t||""}));let l=m("button",{className:"yyt-dialog-close",attrs:{type:"button","aria-label":"close"},html:'<i class="fa-solid fa-times"></i>'});i.appendChild(l),a.appendChild(i);let c=m("div",{className:"yyt-dialog-body"});a.appendChild(c);let d=m("div",{className:"yyt-dialog-footer"});return a.appendChild(d),o.appendChild(a),{overlay:o,body:c,footer:d,closeBtn:l,id:s}}function Ci(t){let e=zn();return e?.body?(e.body.appendChild(t),!0):!1}function ki(t){if(t?.parentNode)try{t.parentNode.removeChild(t)}catch{}}function uh(t={}){let{title:e="\u8BF7\u786E\u8BA4",message:r="",confirmText:s="\u786E\u5B9A",cancelText:o="\u53D6\u6D88",danger:n=!1,width:a="380px"}=t;return new Promise(i=>{let{overlay:l,body:c,footer:d,closeBtn:u}=Ai({title:e,width:a,wide:!1}),y=(zn()||document).activeElement,p=m("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6"},text:r});c.appendChild(p);let g=m("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:o}),f=m("button",{className:`yyt-btn ${n?"yyt-btn-danger":"yyt-btn-primary"}`,attrs:{type:"button"},text:s});d.appendChild(g),d.appendChild(f);let h=!1,x=T=>{if(!h){h=!0,ki(l);try{y?.focus()}catch{}i(T)}};if(f.addEventListener("click",()=>x(!0)),g.addEventListener("click",()=>x(!1)),u.addEventListener("click",()=>x(!1)),l.addEventListener("click",T=>{T.target===l&&x(!1)}),l.addEventListener("keydown",T=>{T.key==="Escape"?(T.stopPropagation(),x(!1)):T.key==="Enter"&&(T.stopPropagation(),x(!0))}),!Ci(l)){i(!1);return}(n?g:f).focus()})}function ph(t={}){let{title:e="\u8F93\u5165",message:r="",defaultValue:s="",placeholder:o="",confirmText:n="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",validate:i=null,width:l="380px"}=t;return new Promise(c=>{let{overlay:d,body:u,footer:y,closeBtn:p}=Ai({title:e,width:l,wide:!1}),g=(zn()||document).activeElement;r&&u.appendChild(m("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6",marginBottom:"8px"},text:r}));let f=m("input",{className:"yyt-input",attrs:{type:"text",placeholder:o}});f.value=String(s||""),u.appendChild(f);let h=m("div",{style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px",marginTop:"6px",minHeight:"14px"}});u.appendChild(h);let x=m("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:a}),T=m("button",{className:"yyt-btn yyt-btn-primary",attrs:{type:"button"},text:n});y.appendChild(x),y.appendChild(T);let v=!1,z=S=>{if(!v){v=!0,ki(d);try{g?.focus()}catch{}c(S)}},M=()=>{let S=f.value.trim();if(typeof i=="function"){let E=i(S);if(E){h.textContent=E,f.focus();return}}z(S||null)};if(T.addEventListener("click",M),x.addEventListener("click",()=>z(null)),p.addEventListener("click",()=>z(null)),d.addEventListener("click",S=>{S.target===d&&z(null)}),f.addEventListener("keydown",S=>{S.key==="Enter"&&(S.stopPropagation(),M())}),d.addEventListener("keydown",S=>{S.key==="Escape"&&(S.stopPropagation(),z(null))}),!Ci(d)){c(null);return}f.focus(),f.select()})}function yh(t={}){let{title:e="",body:r=null,buttons:s=[],width:o="480px",wide:n=!1,onMounted:a=null}=t,{overlay:i,body:l,footer:c,closeBtn:d}=Ai({title:e,width:o,wide:n}),u=(zn()||document).activeElement;r&&F(l,r);let y=!1,p,g=new Promise(h=>{p=h}),f=h=>{if(!y){y=!0,ki(i);try{u?.focus()}catch{}p(h)}};for(let h of s){let x=h.variant==="primary"?"yyt-btn-primary":h.variant==="danger"?"yyt-btn-danger":"yyt-btn-secondary",T=m("button",{className:`yyt-btn ${x}`,attrs:{type:"button"},text:h.label||""});T.addEventListener("click",()=>{try{h.onClick?.(f,l)}catch(v){console.error("[dialog.custom] button onClick error",v),f(null)}}),c.appendChild(T)}if(d.addEventListener("click",()=>f(null)),i.addEventListener("click",h=>{h.target===i&&f(null)}),i.addEventListener("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),f(null))}),!Ci(i))p(null);else if(typeof a=="function")try{a({overlay:i,body:l,close:f})}catch{}return{el:i,body:l,close:f,result:g}}var dh,ke,Kn=N(()=>{lt();dh=0;ke={confirm:uh,prompt:ph,custom:yh}});function Ii(t={}){let{id:e=null,items:r=[],align:s="start",gap:o="8px",wrap:n=!0}=t,i=m("div",{className:"yyt-toolbar",style:{display:"flex",alignItems:"center",justifyContent:{start:"flex-start",end:"flex-end",center:"center","space-between":"space-between"}[s]||"flex-start",gap:o,flexWrap:n?"wrap":"nowrap"}}),l=[];for(let c of r)c&&(F(i,c),l.push(c));return{...Me({id:e,kind:"toolbar"}),el:i,_children:l,addItem(c){c&&(F(i,c),l.push(c))},clear(){for(;i.firstChild;)i.removeChild(i.firstChild);for(let c of l)try{c?.destroy?.()}catch{}l.length=0}}}var Ld=N(()=>{lt()});function Mi(t={}){let{id:e=null,name:r="",desc:s="",active:o=!1,disabled:n=!1,builtin:a=!1,readonly:i=!1,metaChips:l=[],actions:c=[],onClick:d=null}=t,u=a||i,y=["yyt-list-row","yyt-preset-list-item"];o&&y.push("yyt-list-row-active"),n&&y.push("yyt-list-row-disabled"),u&&y.push("yyt-preset-list-item-readonly");let p=m("div",{className:y.join(" "),style:n?{opacity:"0.5",pointerEvents:"none"}:null}),g=m("span",{className:"yyt-preset-dot",style:{width:"8px",height:"8px",borderRadius:"50%",flexShrink:"0",marginRight:"8px",background:o?"var(--yyt-accent, #7bb7ff)":"transparent",border:o?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))",transition:"background 0.15s ease"}});p.appendChild(g);let f=m("div",{className:"yyt-list-row-main",style:{flex:"1",minWidth:"0"}}),h=m("div",{style:{display:"flex",alignItems:"center",gap:"8px"}}),x=m("div",{className:"yyt-list-row-name",text:r,style:{fontWeight:"600"}});h.appendChild(x),a&&h.appendChild(m("span",{className:"yyt-preset-badge yyt-preset-badge-builtin",text:"\u5185\u7F6E",style:{fontSize:"10px",padding:"2px 6px",borderRadius:"999px",background:"var(--yyt-surface-3, rgba(255,255,255,0.06))",color:"var(--yyt-text-muted, rgba(255,255,255,0.5))",border:"1px solid var(--yyt-border, rgba(255,255,255,0.1))"}})),f.appendChild(h);let T=null;s&&(T=m("div",{className:"yyt-list-row-desc",text:s}),f.appendChild(T)),p.appendChild(f);let v=null;if(Array.isArray(l)&&l.length){v=m("div",{className:"yyt-preset-meta-chips",style:{display:"flex",gap:"6px",flexWrap:"wrap"}});for(let E of l)E&&v.appendChild(m("span",{className:"yyt-preset-meta-chip",text:String(E),style:{fontSize:"11px",padding:"2px 8px",borderRadius:"999px",background:"var(--yyt-surface-2, rgba(255,255,255,0.04))",color:"var(--yyt-text-secondary, rgba(255,255,255,0.6))",border:"1px solid var(--yyt-border-soft, rgba(255,255,255,0.04))"}}));p.appendChild(v)}let z=null,M=u?c.filter(E=>E?._kind!=="button"||!E._destructive):c;if(M&&M.length){z=m("div",{className:"yyt-list-row-actions"});for(let E of M)F(z,E);p.appendChild(z)}typeof d=="function"&&(p.style.cursor="pointer",p.addEventListener("click",E=>{E.target.closest(".yyt-list-row-actions")||(d(E,S),S._emitter.emit("click",E))}));let S={...Me({id:e,kind:"presetListItem"}),el:p,_children:c||[],setActive(E){E?p.classList.add("yyt-list-row-active"):p.classList.remove("yyt-list-row-active"),g.style.background=E?"var(--yyt-accent, #7bb7ff)":"transparent",g.style.border=E?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))"},setName(E){x.textContent=E==null?"":String(E)},setDesc(E){if(T)T.textContent=E==null?"":String(E);else{if(!E)return;T=m("div",{className:"yyt-list-row-desc",text:E}),f.appendChild(T)}},setDisabled(E){E?(p.classList.add("yyt-list-row-disabled"),p.style.opacity="0.5",p.style.pointerEvents="none"):(p.classList.remove("yyt-list-row-disabled"),p.style.opacity="",p.style.pointerEvents="")}};return S}var Od=N(()=>{lt()});function Ri(t={}){let{id:e=null,values:r=[],placeholder:s="\u8F93\u5165\u540E\u56DE\u8F66\u6DFB\u52A0",suggestions:o=null,allowDuplicates:n=!1,maxChips:a=0,chipVariant:i="default",onChange:l=null,onAdd:c=null,onRemove:d=null}=t,u=o&&o.length?`yyt-chip-dl-${++fh}`:null,y=m("div",{className:"yyt-chip-group",style:{display:"flex",flexWrap:"wrap",gap:"6px",padding:"6px 8px",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-control-border, rgba(255,255,255,0.08))",background:"var(--yyt-control-bg, transparent)",minHeight:"36px",alignItems:"center"}}),p=[],g={type:"text",placeholder:s,autocomplete:"off"};u&&(g.list=u);let f=m("input",{className:"yyt-chip-input",attrs:g,style:{flex:"1 1 auto",minWidth:"120px",border:"none",outline:"none",background:"transparent",color:"var(--yyt-text, inherit)",fontSize:"12px",padding:"4px 0"}}),h=null;if(u){h=m("datalist",{attrs:{id:u}});for(let $ of o)h.appendChild(m("option",{attrs:{value:String($)}}));y.appendChild(h)}function x(){return i==="danger"?"rgba(248,113,113,0.12)":i==="soft"?"var(--yyt-surface-2, rgba(255,255,255,0.04))":"var(--yyt-accent-soft, rgba(123,183,255,0.15))"}function T(){return i==="danger"?"rgba(248,113,113,0.25)":"var(--yyt-border, rgba(255,255,255,0.1))"}function v(){return i==="danger"?"#f87171":"var(--yyt-text, inherit)"}function z($){let A=m("span",{className:"yyt-chip",style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"3px 4px 3px 10px",borderRadius:"999px",background:x(),border:`1px solid ${T()}`,color:v(),fontSize:"11px",fontWeight:"500"}});A.appendChild(m("span",{text:$,style:{lineHeight:"1"}}));let J=m("button",{attrs:{type:"button","aria-label":"remove"},text:"\xD7",style:{border:"none",background:"transparent",color:"inherit",cursor:"pointer",padding:"0 4px",fontSize:"14px",lineHeight:"1",opacity:"0.7"}});return J.addEventListener("click",U=>{U.stopPropagation(),E($)}),J.addEventListener("mouseenter",()=>{J.style.opacity="1"}),J.addEventListener("mouseleave",()=>{J.style.opacity="0.7"}),A.appendChild(J),A}function M(){let $=[];for(let A of y.children)A===f||A===h||$.push(A);for(let A of $)y.removeChild(A);for(let A of p)y.insertBefore(z(A),f)}function S($){let A=String($||"").trim();if(!A||!n&&p.includes(A)||a>0&&p.length>=a)return!1;p.push(A),M();try{c?.(A,p.slice())}catch{}try{l?.(p.slice())}catch{}return q._emitter.emit("change",p.slice()),!0}function E($){let A=p.indexOf($);if(A<0)return!1;p.splice(A,1),M();try{d?.($,p.slice())}catch{}try{l?.(p.slice())}catch{}return q._emitter.emit("change",p.slice()),!0}function G(){if(p.length!==0){p=[],M();try{l?.([])}catch{}q._emitter.emit("change",[])}}for(let $ of r){let A=String($||"").trim();A&&(!n&&p.includes(A)||p.push(A))}y.appendChild(f),M(),f.addEventListener("keydown",$=>{if($.key==="Enter"||$.key===","){$.preventDefault();let A=f.value.trim();A&&S(A)&&(f.value="")}else $.key==="Backspace"&&!f.value&&p.length&&E(p[p.length-1])}),f.addEventListener("blur",()=>{let $=f.value.trim();$&&S($)&&(f.value="")}),y.addEventListener("click",$=>{$.target===y&&f.focus()});let q={...Me({id:e,kind:"chipGroup"}),el:y,get(){return p.slice()},set($){p=[];for(let A of Array.isArray($)?$:[]){let J=String(A||"").trim();J&&(!n&&p.includes(J)||p.push(J))}M();try{l?.(p.slice())}catch{}q._emitter.emit("change",p.slice())},addChip:S,removeChip:E,clear:G,setSuggestions($){if(h){for(;h.firstChild;)h.removeChild(h.firstChild);for(let A of $||[])h.appendChild(m("option",{attrs:{value:String(A)}}))}}};return q}var fh,Bd=N(()=>{lt();fh=0});var ur=N(()=>{Cd();kd();Id();Md();Rd();Pd();Nd();Dd();$d();Kn();Ld();Od();Bd();lt()});function zd(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function gh(t){return typeof t=="string"&&t.startsWith("builtin_")}function Mr(t={}){let{id:e,kind:r="generic",panelTitle:s="\u9884\u8BBE\u7BA1\u7406",panelHint:o="",store:n,renderEditor:a,renderExtras:i=null,renderListItemMeta:l=null,hasSwitchToButton:c=!1,onSwitchTo:d=null}=t;if(!n||typeof n.listPresets!="function")throw new Error("createPresetManagerPanel: store \u7F3A\u5C11\u5FC5\u8981\u7684 listPresets \u65B9\u6CD5");if(typeof a!="function")throw new Error("createPresetManagerPanel: \u5FC5\u987B\u63D0\u4F9B renderEditor");return{id:e,kind:r,renderTo(u){let y=zd(u);if(!y)return;let g=y._yytLastPresetPanelKind!==r;if(y._yytLastPresetPanelKind=r,y._yytPresetPanelCleanup)try{y._yytPresetPanelCleanup()}catch{}let f=()=>this.renderTo(u),h=n.listPresets(),x=typeof n.getCurrentPresetId=="function"?n.getCurrentPresetId():"",T=g?"":x,v=m("div",{className:"yyt-preset-manager-panel",style:{display:"flex",flexDirection:"column",gap:"14px"}});if(s||o){let U=m("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});s&&U.appendChild(m("div",{text:s,style:{fontSize:"15px",fontWeight:"700",color:"var(--yyt-text)"}})),o&&U.appendChild(m("div",{text:o,style:{fontSize:"12px",color:"var(--yyt-text-secondary)",lineHeight:"1.6"}})),v.appendChild(U)}let z=[],M=m("div",{style:{display:"flex",flexDirection:"column"}});if(h.length===0)M.appendChild(m("div",{text:'\u6682\u65E0\u9884\u8BBE\u3002\u70B9\u51FB\u4E0B\u65B9"\u65B0\u5EFA"\u521B\u5EFA\u7B2C\u4E00\u4E2A\u9884\u8BBE\u3002',style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"12px 0",textAlign:"center"}}));else for(let U of h){let ee=U.id===T,ye=gh(U.id),Te=typeof l=="function"?l(U)||[]:[],ue=[];c&&typeof d=="function"&&ue.push(pe({label:ee?"\u2713 \u5DF2\u52A0\u8F7D":"\u52A0\u8F7D",size:"small",variant:ee?"ghost":"primary",disabled:ee,onClick:Ve=>{Ve.stopPropagation();try{d(U.id)}catch(j){as.warn("onSwitchTo \u5F02\u5E38",{err:j})}f()}})),ue.push(pe({label:"\u590D\u5236",size:"small",variant:"ghost",title:"\u590D\u5236\u4E3A\u7528\u6237\u9884\u8BBE",onClick:async Ve=>{Ve.stopPropagation();try{let j=n.duplicatePreset(U.id);j?.id&&typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(j.id),f()}catch(j){as.warn("duplicate \u5F02\u5E38",{err:j})}}})),ye||(ue.push(pe({label:"\u270E",size:"small",variant:"ghost",title:"\u91CD\u547D\u540D",onClick:async Ve=>{Ve.stopPropagation();let j=await ke.prompt({title:"\u91CD\u547D\u540D\u9884\u8BBE",defaultValue:U.name,placeholder:"\u9884\u8BBE\u540D",validate:le=>le?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});j&&j!==U.name&&(n.renamePreset(U.id,j),f())}})),ue.push(pe({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664",onClick:async Ve=>{Ve.stopPropagation(),await ke.confirm({title:"\u5220\u9664\u9884\u8BBE",message:`\u786E\u8BA4\u5220\u9664\u300C${U.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})&&(n.deletePreset(U.id),f())}})));let Ze=Mi({id:U.id,name:U.name,desc:U.description,active:ee,builtin:ye,metaChips:Te,actions:ue,onClick:()=>{typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(U.id),f()}});M.appendChild(Ze.el)}let S=pe({label:"+ \u65B0\u5EFA\u9884\u8BBE",size:"small",variant:"primary",onClick:async()=>{let U=await ke.prompt({title:"\u65B0\u5EFA\u9884\u8BBE",placeholder:"\u9884\u8BBE\u540D\uFF08\u5FC5\u586B\uFF09",validate:ee=>ee?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});if(U)try{let ee=n.createPreset({name:U});ee?.id&&typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(ee.id),f()}catch(ee){as.warn("createPreset \u5931\u8D25",{err:ee}),await ke.confirm({title:"\u521B\u5EFA\u5931\u8D25",message:String(ee?.message||ee),confirmText:"\u786E\u5B9A"})}}}),E=Ut({heading:"\u9884\u8BBE\u9009\u62E9",icon:"\u{1F4CB}",actions:[S.el],content:[M]});z.push(E),v.appendChild(E.el);let G=T?h.find(U=>U.id===T):null;if(G){let U=null;try{U=a(G,{readonly:!1,onChange:ye=>{if(!(!ye||typeof ye!="object"))try{n.updatePreset(G.id,ye)}catch(Te){as.warn("updatePreset \u5931\u8D25",{err:Te})}},refresh:f})}catch(ye){as.error("renderEditor \u5F02\u5E38",{err:ye}),U=m("div",{text:`\u7F16\u8F91\u5668\u6E32\u67D3\u5F02\u5E38\uFF1A${ye?.message||ye}`,style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px"}})}let ee=Ut({heading:`\u7F16\u8F91\u300C${G.name}\u300D`,icon:"\u270E",content:[U].filter(Boolean)});if(z.push(ee),v.appendChild(ee.el),typeof i=="function"){let ye=null;try{ye=i(G,{refresh:f})}catch(Te){as.warn("renderExtras \u5F02\u5E38",{err:Te})}if(ye){let Te=Ut({heading:"\u9644\u52A0",icon:"\u{1F527}",content:[ye]});z.push(Te),v.appendChild(Te.el)}}}else h.length>0&&v.appendChild(m("div",{text:"\u8BF7\u5728\u4E0A\u65B9\u5217\u8868\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE\u4EE5\u7F16\u8F91",style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"16px",textAlign:"center",border:"1px dashed var(--yyt-border, rgba(255,255,255,0.08))",borderRadius:"var(--yyt-radius-sm, 6px)"}}));let q=pe({label:"\u2B06 \u5BFC\u5165",size:"small",variant:"ghost",onClick:async()=>{await mh(n,f)}}),$=pe({label:"\u2B07 \u5BFC\u51FA",size:"small",variant:"ghost",onClick:()=>{hh(n,r)}}),A=pe({label:"\u6E05\u7A7A\u5168\u90E8",size:"small",variant:"ghost",onClick:async()=>{await ke.confirm({title:"\u6E05\u7A7A\u6240\u6709\u9884\u8BBE",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u7528\u6237\u9884\u8BBE\uFF08\u5185\u7F6E\u9884\u8BBE\u4E0D\u53D7\u5F71\u54CD\uFF09\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002",confirmText:"\u6E05\u7A7A",danger:!0})&&typeof n.resetAll=="function"&&(n.resetAll(),f())}}),J=Ii({items:[q,$,A],align:"end",gap:"8px"});v.appendChild(J.el),y.innerHTML="",y.appendChild(v),y._yytPresetPanelCleanup=()=>{for(let U of z)try{U.destroy()}catch{}delete y._yytPresetPanelCleanup}},destroy(u){let y=zd(u);if(y?._yytPresetPanelCleanup)try{y._yytPresetPanelCleanup()}catch{}},getStyles(){return""}}}async function mh(t,e){if(typeof t.importPresets!="function"){await ke.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u5165",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u5165\u3002",confirmText:"\u786E\u5B9A"});return}let r=m("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34\u5BFC\u51FA\u7684 JSON"},style:{width:"100%",minHeight:"180px",fontSize:"12px",fontFamily:"monospace"}}),s=ke.custom({title:"\u5BFC\u5165\u9884\u8BBE",width:"520px",body:r,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:n=>n(null)},{label:"\u4ECE\u6587\u4EF6\u2026",variant:"ghost",onClick:()=>{let n=m("input",{attrs:{type:"file",accept:"application/json,.json"}});n.addEventListener("change",()=>{let a=n.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{r.value=String(i.result||""),r.focus()},i.readAsText(a)}),n.click()}},{label:"\u5BFC\u5165",variant:"primary",onClick:async n=>{let a=r.value.trim();if(!a){n(null);return}let i;try{i=JSON.parse(a)}catch(l){await ke.confirm({title:"JSON \u89E3\u6790\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"});return}try{let l=t.importPresets(i);n(l)}catch(l){await ke.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"})}}}]});setTimeout(()=>r.focus(),0);let o=await s.result;o&&(o.added>0||o.imported>0)&&e()}function hh(t,e){if(typeof t.exportAll!="function"){ke.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u51FA",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u51FA\u3002",confirmText:"\u786E\u5B9A"});return}let r=t.exportAll(),s=JSON.stringify(r,null,2),o=m("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});o.value=s,o.readOnly=!0,ke.custom({title:`\u5BFC\u51FA ${e||""} \u9884\u8BBE`,width:"600px",body:o,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:n=>n(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(s)}catch{o.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let n=new Blob([s],{type:"application/json"}),a=URL.createObjectURL(n),i=m("a",{attrs:{href:a,download:`${e||"preset"}_${Date.now()}.json`}});document.body.appendChild(i),i.click(),setTimeout(()=>{try{document.body.removeChild(i)}catch{}try{URL.revokeObjectURL(a)}catch{}},100)}catch(n){as.warn("\u4E0B\u8F7D\u5931\u8D25",{err:n})}}}]})}var as,Ko=N(()=>{ur();W();as=I.createScope("PresetManagerBase")});var Ud={};se(Ud,{ApiPresetPanel:()=>Kd,default:()=>vh});function xh(t,{onChange:e,readonly:r}){let s=m("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}}),o=t.apiConfig||{};F(s,bt({label:"\u63CF\u8FF0",control:Xe({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})})),F(s,Rt({label:"\u4F7F\u7528\u4E3B API",hint:"\u5F00\u542F\u540E\u5FFD\u7565\u4E0B\u65B9 URL/Key/Model\uFF0C\u76F4\u63A5\u590D\u7528 SillyTavern \u4E3B\u8FDE\u63A5",checked:o.useMainApi!==!1,disabled:r,onChange:i=>e({apiConfig:{...o,useMainApi:i}})})),F(s,Rt({label:"\u6D41\u5F0F\u8F93\u51FA\uFF08stream\uFF09",hint:"\u9010\u5B57\u63A5\u6536\u54CD\u5E94",checked:o.stream===!0,disabled:r,onChange:i=>e({apiConfig:{...o,stream:i}})})),F(s,bt({label:"API URL",control:Xe({value:o.url||"",placeholder:"https://api.example.com/v1",disabled:r,onChange:i=>e({apiConfig:{...o,url:i}})})})),F(s,bt({label:"API Key",control:(()=>{let i=Xe({value:o.apiKey||"",placeholder:"sk-...",disabled:r,onChange:l=>e({apiConfig:{...o,apiKey:l}})});try{i.el.setAttribute("type","password")}catch{}return i})()})),F(s,bt({label:"\u6A21\u578B",control:Xe({value:o.model||"",placeholder:"gpt-4 / gemini-pro / claude-...",disabled:r,onChange:i=>e({apiConfig:{...o,model:i}})})}));let n=m("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"10px"}});function a(i,l,c,d="1"){let u=m("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});u.appendChild(m("label",{text:i,style:{fontSize:"11px",color:"var(--yyt-text-secondary)",fontWeight:"600"}}));let y=m("input",{className:"yyt-input",attrs:{type:"number",step:d,disabled:r?"disabled":null},style:{padding:"6px 10px",fontSize:"12px"}});return y.value=String(o[l]??c),y.addEventListener("change",()=>{let p=Number(y.value);Number.isFinite(p)&&e({apiConfig:{...o,[l]:p}})}),u.appendChild(y),u}return n.appendChild(a("max_tokens","max_tokens",4096,"1")),n.appendChild(a("temperature","temperature",.7,"0.05")),n.appendChild(a("top_p","top_p",.9,"0.05")),F(s,n),s}function wh(t){let e=t.apiConfig||{},r=[];return e.useMainApi!==!1?r.push("\u4E3B API"):r.push(e.model||"\u81EA\u5B9A\u4E49"),t.starred&&r.push("\u2605"),r}var Rr,bh,Kd,vh,jd=N(()=>{ur();Do();W();Ko();Rr=I.createScope("ApiPresetPanel"),bh={listPresets(){return kr().map(t=>({id:t.name,name:t.name,description:t.description||"",apiConfig:t.apiConfig||{},starred:t.starred===!0,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=rs(t);return e?{id:e.name,...e,description:e.description||""}:null},getCurrentPresetId(){return mi()||""},setCurrentPresetId(t){if(!t)return!1;try{return!!Ln(t)}catch(e){return Rr.warn("switchToPreset \u5931\u8D25",{err:e}),!1}},createPreset(t){let e=String(t?.name||"").trim();if(!e)return Rr.warn("createPreset: name \u7F3A\u5931"),null;let r=Dn({name:e,description:t?.description||"",apiConfig:t?.apiConfig||{}});return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(Rr.warn("createPreset \u5931\u8D25",{msg:r?.message}),null)},updatePreset(t,e){if(!t)return null;let r=yi(t,e);return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(Rr.warn("updatePreset \u5931\u8D25",{id:t,msg:r?.message}),null)},deletePreset(t){if(!t)return!1;try{let e=$n(t);return!!(e?.success??e===!0)}catch(e){return Rr.warn("deletePreset \u5931\u8D25",{err:e}),!1}},duplicatePreset(t,e={}){if(!t)return null;let r=e.nameSuffix||"_\u526F\u672C",s=`${t}${r}`;try{let o=gi(t,s);return o?.success?{id:o.preset.name,...o.preset,description:o.preset.description||""}:null}catch(o){return Rr.warn("duplicatePreset \u5931\u8D25",{err:o}),null}},renamePreset(t,e){if(!t||!e)return null;try{let r=fi(t,e);return r?.success?{id:r.preset?.name||e,...r.preset,description:r.preset?.description||""}:null}catch(r){return Rr.warn("renamePreset \u5931\u8D25",{err:r}),null}},exportAll(){let t=hi();try{return{version:1,exportedAt:Date.now(),presets:JSON.parse(t)}}catch{return{version:1,exportedAt:Date.now(),presets:[]}}},importPresets(t){if(!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[t],r=JSON.stringify(e);return{added:bi(r,{overwrite:!1})?.imported||0}},resetAll(){let t=kr();for(let e of t)try{$n(e.name)}catch{}}};Kd=Mr({id:"apiPresetPanel",kind:"api",panelTitle:"API \u9884\u8BBE",panelHint:'\u7BA1\u7406\u591A\u7EC4 API \u8FDE\u63A5\u914D\u7F6E\u3002\u70B9\u51FB"\u52A0\u8F7D"\u6FC0\u6D3B\u67D0\u4E2A\u9884\u8BBE\u4F5C\u4E3A\u5F53\u524D API\uFF1B\u5176\u4ED6\u5DE5\u5177\u53EF\u5728\u914D\u7F6E\u9762\u677F\u4E2D\u6309\u9884\u8BBE\u540D\u5F15\u7528\u3002',store:bh,renderEditor:xh,renderListItemMeta:wh,hasSwitchToButton:!0,onSwitchTo:t=>{try{Ln(t)}catch(e){Rr.warn("switchToPreset",{err:e})}}}),vh=Kd});function Ni(){return`wb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Nr(){let t=Se.get(Pi);return!t||typeof t!="object"?{}:t}function jn(t){Se.set(Pi,t)}function ls(t){return typeof t=="string"&&t.startsWith(Th)}function Fd(t){return ls(t)&&Un.find(e=>e.id===t)||null}function Di(t){if(!Array.isArray(t)){Un=[];return}Un=t.map(e=>Pr({...e,id:String(e?.id||"")})).filter(e=>ls(e.id))}function Pr(t={}){let e=String(t.id||Ni()),r=Array.isArray(t.bookList)?t.bookList.map(s=>({bookName:String(s?.bookName||""),enabled:s?.enabled!==!1,entryOverrides:s?.entryOverrides&&typeof s.entryOverrides=="object"?s.entryOverrides:{}})).filter(s=>s.bookName):[];return{id:e,name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),bindingMode:t.bindingMode===pr.CUSTOM?pr.CUSTOM:pr.CHARACTER_CARD,includeDisabled:t.includeDisabled===!0,bookList:r,createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function Sh(){let t=Nr(),e=new Set,r=[];for(let o of Un){let n=t[o.id];n?(r.push(Pr(n)),e.add(o.id)):r.push(o)}let s=Object.values(t).map(Pr).filter(o=>!e.has(o.id)).sort((o,n)=>n.updatedAt-o.updatedAt);return r.push(...s),r}function jo(t){if(!t)return null;let e=Nr();return e[t]?Pr(e[t]):ls(t)?Fd(t):null}function $i(){let t=Se.get(Uo);return typeof t=="string"&&t?t:""}function _h(){let t=$i();return t?jo(t):null}function Eh(t){if(t&&ls(t))return Se.set(Uo,t),K.emit(O.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0;let e=Nr();return t&&!e[t]?(is.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(Se.set(Uo,t||""),K.emit(O.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0)}function Fn(t={}){let e=Pr({...t,id:Ni(),createdAt:Date.now(),updatedAt:Date.now()}),r=Nr();return r[e.id]=e,jn(r),K.emit(O.PRESET_CREATED,{kind:"worldbook",id:e.id}),is.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function Wd(t,e={}){if(!t)return null;let r=Nr(),s=r[t];if(!s&&ls(t)&&(s=Fd(t)),!s)return is.warn(`updatePreset \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),null;let o=Pr({...s,...e,id:t,createdAt:s.createdAt,updatedAt:Date.now()});return r[t]=o,jn(r),K.emit(O.PRESET_UPDATED,{kind:"worldbook",id:t}),o}function Ah(t){if(!t)return!1;if(ls(t))return is.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=Nr();return e[t]?(delete e[t],jn(e),$i()===t&&Se.set(Uo,""),K.emit(O.PRESET_DELETED,{kind:"worldbook",id:t}),is.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function Ch(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=jo(t);return r?Fn({...r,id:void 0,name:`${r.name}${e}`}):null}function kh(t,e){return ls(t)?(is.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):Wd(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function Ih(){return{version:1,exportedAt:Date.now(),presets:Object.values(Nr()).map(Pr)}}function Mh(t){if(!t||typeof t!="object")return{added:0,skipped:0};let e=Array.isArray(t.presets)?t.presets:[],r=Nr(),s=0,o=0;for(let n of e){let a=Pr({...n,id:Ni(),createdAt:Date.now(),updatedAt:Date.now()});r[a.id]=a,s+=1}return jn(r),s>0&&K.emit(O.PRESET_IMPORTED,{kind:"worldbook",count:s}),{added:s,skipped:o}}function Rh(){Se.set(Pi,{}),Se.set(Uo,""),is.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u4E16\u754C\u4E66\u9884\u8BBE")}var is,Pi,Uo,pr,Th,Un,jt,Ks=N(()=>{Be();Ye();W();is=I.createScope("WorldbookPresetStore"),Pi="worldbook_presets",Uo="worldbook_current_preset",pr=Object.freeze({CHARACTER_CARD:"character_card",CUSTOM:"custom"});Th="builtin_worldbook_",Un=[];jt={listPresets:Sh,getPreset:jo,getCurrentPresetId:$i,getCurrentPreset:_h,setCurrentPresetId:Eh,createPreset:Fn,updatePreset:Wd,deletePreset:Ah,duplicatePreset:Ch,renamePreset:kh,exportAll:Ih,importPresets:Mh,resetAll:Rh,BINDING_MODES:pr}});function Dr(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Wn(){return Dr()?.SillyTavern||null}function xe(t){return t==null?"":String(t).trim()}function Nh(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let r of e)if(typeof r=="string"&&r.trim())return r.trim();return""}function Dh(t){let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||t?.is_user===!0?"user":t?.is_system===!0?"system":"assistant"}function Yd(t=""){let e=String(t||"").trim();if(!e)return"empty";let r=0;for(let s=0;s<e.length;s+=1)r=(r<<5)-r+e.charCodeAt(s),r|=0;return`fp_${Math.abs(r).toString(36)}`}function Gd(t={}){let e=xe(t.chatId)||"chat_default",r=xe(t.messageId)||"latest";return`${e}::${r}`}function qd(t={}){let e=Gd(t),r=xe(t.effectiveSwipeId)||"swipe:current",s=xe(t.assistantContentFingerprint)||"empty";return`${e}::${r}::${s}`}function $h(t={}){let e=qd(t),r=xe(t.eventType)||"MANUAL",s=xe(t.traceId)||Vd("manual");return`${e}::${r}::${s}`}function Vd(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function Jd(){let t=Wn();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function Xd(t=[]){let e=[],r=null,s=null;return t.forEach((o,n)=>{let a=Dh(o),i=Nh(o);if(!i)return;let l=xe(o?.messageId??o?.message_id??o?.id??o?.mid??o?.mesid??o?.chat_index??n),c=xe(o?.swipe_id??o?.swipeId??o?.swipe??""),d={role:a,content:i,sourceId:l,swipeId:c,raw:o,index:n};e.push(d),a==="user"&&(r=d),a==="assistant"&&(s=d)}),{messages:e,lastUserMessage:r,lastAiMessage:s}}function Lh(t,e,r){return xe(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.this_chid??r?.id??"chat_default")||"chat_default"}async function Li(){let t=Wn();if(!t)return null;try{let e=t.this_chid,r=t.characters||[];if(e>=0&&e<r.length){let s=r[e];return{id:e,name:s?.name||"",description:s?.description||"",personality:s?.personality||"",scenario:s?.scenario||"",firstMes:s?.first_mes||"",mesExample:s?.mes_example||""}}}catch(e){Ph.error("\u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function Oh(t="",e=null){let r=String(t||""),s=e?.YouYouToolkit_toolOutputs;return s&&typeof s=="object"&&Object.values(s).forEach(o=>{let n=String(o?.blockText||o?.content||"").trim();n&&r.includes(n)&&(r=r.replace(n,"").trimEnd())}),r.trim()}function Bh(t,e={}){let r=Array.isArray(t?.messages)?t.messages:[],s=xe(e.messageId),o=xe(e.swipeId);if(!s)return t?.lastAiMessage||null;let n=r.filter(i=>i.role==="assistant"),a=n.find(i=>i.sourceId!==s?!1:o?xe(i.swipeId)===o:!0);return a||n.find(i=>i.sourceId===s)||null}function Qd({api:t,stContext:e,character:r,conversation:s,targetAssistantMessage:o,runSource:n="MANUAL"}={}){let a=s?.messages||[],i=s?.lastUserMessage||null,l=xe(o?.sourceId)||"",c=xe(o?.swipeId)||"swipe:current",d=o?.content||"",u=Oh(d,o?.raw||null),y=Yd(d),p=Yd(u),g=Lh(t,e,r),f=Vd(String(n||"manual").toLowerCase()),h=Gd({chatId:g,messageId:l}),x=qd({chatId:g,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:p});return{startedAt:Date.now(),runSource:n,traceId:f,chatId:g,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:h,slotRevisionKey:x,slotTransactionId:$h({chatId:g,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:p,eventType:n,traceId:f}),executionKey:x,lastAiMessage:d,assistantContentFingerprint:y,assistantBaseText:u,assistantBaseFingerprint:p,lastAiMessageSwipeId:c,confirmedAssistantSwipeId:c,effectiveSwipeId:c,sourceMessageId:l,sourceSwipeId:c,lastUserMessage:i?.content||"",userMessage:i?.content||"",targetAssistantMessage:o,chatMessages:a,characterCard:r,chatHistory:a,input:{userMessage:i?.content||"",lastAiMessage:d,assistantBaseText:u,extractedContent:"",previousToolOutput:"",context:{character:r?.name||"",chatLength:a.length||0}},config:{},status:"pending"}}async function cs({runSource:t="MANUAL"}={}){let e=Wn(),r=e?.getContext?.()||null,s=await Li(),o=Jd(),n=Xd(o),a=n?.lastAiMessage||null;return Qd({api:e,stContext:r,character:s,conversation:n,targetAssistantMessage:a,runSource:t})}async function ds({messageId:t,swipeId:e="",runSource:r="AUTO"}={}){let s=Wn(),o=s?.getContext?.()||null,n=await Li(),a=Jd(),i=Xd(a),l=Bh(i,{messageId:t,swipeId:e});return Qd({api:s,stContext:o,character:n,conversation:i,targetAssistantMessage:l,runSource:r})}var Ph,us=N(()=>{W();Ph=I.createScope("ExecutionContext")});function zi(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return Dr()?.TavernHelper||null}function Zd(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return Dr()?.SillyTavern||null}function js(t){return Array.isArray(t)?Array.from(new Set(t.map(e=>String(e||"").trim()).filter(Boolean))):[]}function Oi(t){if(Array.isArray(t))return t.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(t&&typeof t=="object"){let e={};return Object.keys(t).forEach(r=>{let s=t[r];Array.isArray(s)?e[r]=s.map(o=>typeof o=="string"?o:o&&typeof o=="object"?o.name||o.id||o.title||"[object]":String(o??"")):s&&typeof s=="object"?e[r]="[object]":e[r]=s}),e}return t}function Kh(t={}){let e=typeof t.content=="string"?t.content.trim():"";if(!e)return"";let r=[t.comment,t.key,t.keysecondary,t.text].map(s=>String(s||"").trim()).find(Boolean);return r&&r!==e?`## ${r}
${e}`:e}function Ki(){return Array.isArray(Bi)?[...Bi]:[]}async function eu(t){if(!t||typeof t.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(t.getCharLorebooks({type:"all"}));return js([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return Us.warn("\u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function Uh(t,e){if(t&&typeof t.getLorebooks=="function")try{let r=js(await Promise.resolve(t.getLorebooks()));if(r.length>0)return r}catch(r){Us.warn("\u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}if(e&&typeof e.getWorldBooks=="function")try{let r=await Promise.resolve(e.getWorldBooks()),s=js(Array.isArray(r)?r.map(o=>o?.name??o):[]);if(s.length>0)return s}catch(r){Us.warn("\u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}return[]}async function Ui(){let t=zi(),e=Zd(),r={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!Dr()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!Dr()?.SillyTavern,helperKeys:t?Object.keys(t).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof t?.getLorebooks,getCharLorebooksType:typeof t?.getCharLorebooks,getLorebookEntriesType:typeof t?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{r.rawResults.getLorebooks=t&&typeof t.getLorebooks=="function"?Oi(await Promise.resolve(t.getLorebooks())):"[unavailable]"}catch(a){r.errors.push(`getLorebooks: ${a?.message||a}`)}try{r.rawResults.getCharLorebooks=t&&typeof t.getCharLorebooks=="function"?Oi(await Promise.resolve(t.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(a){r.errors.push(`getCharLorebooks: ${a?.message||a}`)}try{r.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?Oi(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(a){r.errors.push(`getWorldBooks: ${a?.message||a}`)}let s=await eu(t),o=await Uh(t,e),n=js([...s,...o]);return r.characterWorldbooks=[...s],r.allWorldbooks=[...o],r.combinedWorldbooks=[...n],zh=r,Bi=n,[...n]}async function Hn(t){let e="";if(typeof t=="string"?e=t:t&&typeof t=="object"&&(e=t?.worldbooks?.presetId||""),!e)return"";let r=jo(e);if(!r)return Us.warn(`buildSelectedWorldbookContent: \u9884\u8BBE\u4E0D\u5B58\u5728 ${e}`),"";let s=r.includeDisabled===!0,o=[];if(r.bindingMode==="character_card"){let i=zi(),l=Zd(),c=await eu(i),d=new Map((r.bookList||[]).map(u=>[String(u.bookName||""),u]));for(let u of js(c)){let y=d.get(u);y&&y.enabled===!1||o.push(u)}}else o=(r.bookList||[]).filter(i=>i&&i.bookName&&i.enabled!==!1).map(i=>i.bookName);if(o=js(o),o.length===0)return"";let n=zi();if(!n||typeof n.getLorebookEntries!="function")return Us.warn("TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let a=[];for(let i of o)try{let l=await n.getLorebookEntries(i),c=Array.isArray(l)?l:[],u=(s?c:c.filter(y=>y?.enabled!==!1&&!y?.disable)).map(Kh).filter(Boolean).join(`

`);u&&a.push(`[\u4E16\u754C\u4E66\uFF1A${i}]
${u}`)}catch(l){Us.warn(`\u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${i}`,l)}return a.join(`

---

`)}var Us,Bi,zh,Yn=N(()=>{us();W();Ks();Us=I.createScope("ToolWorldbookService"),Bi=[],zh=null});var su={};se(su,{WorldbookPresetPanel:()=>ru,default:()=>qh});function Fh(t){return t===pr.CUSTOM?"\u81EA\u5B9A\u4E49":"\u8DDF\u968F\u89D2\u8272\u5361"}function tu(t,e,r){let s=[...t.bookList],o=s.findIndex(n=>n.bookName===e);o>=0?s[o]={...s[o],enabled:r}:s.push({bookName:e,enabled:r,entryOverrides:{}}),jt.updatePreset(t.id,{bookList:s})}function Wh(t,e){let r=t.bookList.filter(s=>s.bookName!==e);jt.updatePreset(t.id,{bookList:r})}async function Hh(t,e){let r=Ki();if(!r.length)try{r=await Ui()}catch{}let s=new Set(t.bookList.map(d=>d.bookName)),o=r.filter(d=>!s.has(d));if(!o.length){await ke.confirm({title:"\u6CA1\u6709\u53EF\u6DFB\u52A0\u7684\u4E16\u754C\u4E66",message:"\u5BBF\u4E3B\u672A\u63D0\u4F9B\u66F4\u591A\u53EF\u7528\u4E16\u754C\u4E66\uFF0C\u6216\u7F13\u5B58\u5185\u5168\u90E8\u5DF2\u52A0\u5165\u6B64\u9884\u8BBE\u3002",confirmText:"\u786E\u5B9A"});return}let n=m("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}}),a=m("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${o.length} \u672C\u4E16\u754C\u4E66\u2026`,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});n.appendChild(a);let i=m("div",{style:{display:"flex",flexDirection:"column",gap:"4px",maxHeight:"320px",overflowY:"auto"}}),l=new Set,c=[];for(let d of o){let u=m("label",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 10px",cursor:"pointer",borderRadius:"var(--yyt-radius-sm, 6px)",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",fontSize:"12px"}}),y=m("input",{attrs:{type:"checkbox",value:d}});y.addEventListener("change",()=>{y.checked?l.add(d):l.delete(d)}),u.appendChild(y),u.appendChild(m("span",{text:d,style:{color:"var(--yyt-text)"}})),i.appendChild(u),c.push({el:u,search:d.toLowerCase()})}n.appendChild(i),a.addEventListener("input",()=>{let d=a.value.trim().toLowerCase();for(let u of c)u.el.style.display=!d||u.search.includes(d)?"":"none"}),ke.custom({title:`\u6DFB\u52A0\u4E16\u754C\u4E66\uFF08${o.length} \u9879\u53EF\u9009\uFF09`,width:"480px",body:n,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:d=>d(null)},{label:"\u5168\u9009\u53EF\u89C1",variant:"ghost",onClick:()=>{for(let d of i.querySelectorAll("input[type=checkbox]")){let u=d.closest("label");(!u||u.style.display!=="none")&&(d.checked=!0,l.add(d.value))}}},{label:"\u6DFB\u52A0\u9009\u4E2D",variant:"primary",onClick:d=>{let u=Array.from(l);if(!u.length){d(null);return}let y=u.map(g=>({bookName:g,enabled:!0,entryOverrides:{}})),p=[...t.bookList,...y];jt.updatePreset(t.id,{bookList:p}),d(u.length)}}]}).result.then(d=>{d&&e&&e()})}function Yh(t,{onChange:e,readonly:r,refresh:s}){let o=m("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});F(o,bt({label:"\u63CF\u8FF0",control:Xe({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:u=>e({description:u})})})),F(o,bt({label:"\u7ED1\u5B9A\u6A21\u5F0F",hint:"\u8DDF\u968F\u89D2\u8272\u5361 = \u6CE8\u5165\u5F53\u524D\u89D2\u8272\u7ED1\u5B9A\u7684\u4E16\u754C\u4E66\uFF1B\u81EA\u5B9A\u4E49 = \u7528\u4E0B\u65B9\u624B\u52A8\u9009\u62E9\u7684\u5217\u8868",control:qe({value:t.bindingMode,disabled:r,options:[{value:pr.CHARACTER_CARD,label:"\u8DDF\u968F\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09"},{value:pr.CUSTOM,label:"\u81EA\u5B9A\u4E49\uFF08\u56FA\u5B9A\u5217\u8868\uFF09"}],onChange:u=>{e({bindingMode:u}),s&&s()}})})),F(o,Rt({label:"\u5305\u542B\u7981\u7528\u8BCD\u6761",hint:"\u5F00\u542F\u540E\uFF1A\u6E90\u4E16\u754C\u4E66\u4E2D\u5DF2\u7981\u7528\u7684\u8BCD\u6761\u53EF\u88AB\u672C\u9884\u8BBE\u5F3A\u5236\u542F\u7528\u5E76\u6CE8\u5165",checked:t.includeDisabled,disabled:r,onChange:u=>e({includeDisabled:u})}));let n=t.bindingMode===pr.CHARACTER_CARD,a=Ki(),i=m("div",{style:{display:"flex",flexDirection:"column"}}),l=m("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px",gap:"8px"}});l.appendChild(m("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}},m("div",{text:n?"\u968F\u89D2\u8272\u5361\u6CE8\u5165\u7684\u4E16\u754C\u4E66":"\u9009\u4E2D\u7684\u4E16\u754C\u4E66",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:n?"\u4EE5\u4E0B\u6765\u81EA\u5F53\u524D\u89D2\u8272\u5361\u7684\u4E16\u754C\u4E66\u5C06\u88AB\u6CE8\u5165\uFF1B\u53EF\u5355\u72EC\u5173\u95ED\u67D0\u672C\uFF08\u4E0D\u5F71\u54CD\u5176\u4ED6\u5DE5\u5177\uFF09":'\u672C\u9884\u8BBE\u56FA\u5B9A\u6CE8\u5165\u4E0B\u5217\u4E16\u754C\u4E66\uFF1B\u70B9\u51FB"+ \u6DFB\u52A0"\u4ECE\u53EF\u7528\u5217\u8868\u591A\u9009',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.5"}})));let c=m("div",{style:{display:"flex",gap:"6px"}});!n&&!r&&c.appendChild(pe({label:"+ \u6DFB\u52A0",size:"small",onClick:()=>Hh(t,s)}).el),c.appendChild(pe({label:"\u{1F504} \u5237\u65B0",size:"small",variant:"ghost",onClick:async()=>{try{await Ui()}catch(u){jh.warn("\u5237\u65B0\u5931\u8D25",{e:u})}s&&s()}}).el),l.appendChild(c),F(i,l);let d=[];n?a.length?d=a.map(u=>{let y=t.bookList.find(g=>g.bookName===u),p=y?y.enabled!==!1:!0;return Bn({name:u,desc:p?"\u5DF2\u542F\u7528 \xB7 \u6574\u672C\u6CE8\u5165":"\u5DF2\u7981\u7528",actions:[Rt({checked:p,disabled:r,onChange:g=>tu(t,u,g)})]})}):d=[m("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5F53\u524D\u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014 \u5207\u6362\u5230"\u81EA\u5B9A\u4E49"\u53EF\u4EE5\u624B\u52A8\u9009\u62E9\u4EFB\u610F\u4E16\u754C\u4E66\u3002'})]:t.bookList.length?d=t.bookList.map(u=>Bn({name:u.bookName,desc:u.enabled===!1?"\u5DF2\u7981\u7528":"\u5DF2\u542F\u7528 \xB7 \u6574\u672C\u6CE8\u5165",actions:[Rt({checked:u.enabled!==!1,disabled:r,onChange:y=>tu(t,u.bookName,y)}),...r?[]:[pe({label:"\xD7",size:"small",variant:"ghost",title:"\u4ECE\u9884\u8BBE\u79FB\u9664",onClick:()=>{Wh(t,u.bookName),s&&s()}})]]})):d=[m("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u6DFB\u52A0"\u9009\u62E9\u4E16\u754C\u4E66\u52A0\u5165\u6B64\u9884\u8BBE\u3002'})];for(let u of d)u?.el?F(i,u.el):u instanceof Node&&F(i,u);return F(o,i),o}function Gh(t){let e=[`${Fh(t.bindingMode)}`,`${t.bookList.length} \u672C`];return t.includeDisabled&&e.push("\u542B\u7981\u7528"),e}var jh,ru,qh,ou=N(()=>{ur();Ks();Yn();Kn();W();Ko();jh=I.createScope("WorldbookPresetPanel");ru=Mr({id:"worldbookPresetPanel",kind:"worldbook",panelTitle:"\u4E16\u754C\u4E66\u9884\u8BBE",panelHint:"\u7BA1\u7406\u4E16\u754C\u4E66\u6CE8\u5165\u9884\u8BBE\u3002\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\uFF0C\u53EF\u7ED1\u5B9A\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09\u6216\u56FA\u5B9A\u5217\u8868\u3002",store:jt,renderEditor:Yh,renderListItemMeta:Gh}),qh=ru});var qi={};se(qi,{MESSAGE_MACROS:()=>Cu,addTagRule:()=>mu,createRuleTemplate:()=>pu,default:()=>Xh,deleteRulePreset:()=>Su,deleteRuleTemplate:()=>fu,deleteTagRule:()=>bu,escapeRegex:()=>ps,exportRulesConfig:()=>_u,extractComplexTag:()=>au,extractCurlyBraceTag:()=>Yi,extractHtmlFormatTag:()=>iu,extractSimpleTag:()=>Hi,extractTagContent:()=>fr,generateTagSuggestions:()=>cu,getAllRulePresets:()=>vu,getAllRuleTemplates:()=>du,getContentBlacklist:()=>Ws,getRuleTemplate:()=>uu,getTagRules:()=>Fs,importRulesConfig:()=>Eu,isValidTagName:()=>Wi,loadRulePreset:()=>Tu,saveRulesAsPreset:()=>wu,scanTextForTags:()=>lu,setContentBlacklist:()=>xu,setTagRules:()=>gu,shouldSkipContent:()=>Fi,testRegex:()=>Au,updateRuleTemplate:()=>yu,updateTagRule:()=>hu});function Vh(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...ji],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function xt(){return D.get(nu,Vh())}function Jt(t){D.set(nu,t)}function Gn(){let t=xt();return rt=t.ruleTemplates||[...ji],Re=t.tagRules||[],yt=t.contentBlacklist||[],{ruleTemplates:rt,tagRules:Re,contentBlacklist:yt}}function ps(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Fi(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let r=t.toLowerCase();return e.some(s=>{let o=s.trim().toLowerCase();return o&&r.includes(o)})}function Wi(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!Jh.includes(t.toLowerCase())}function Hi(t,e){if(!t||!e)return[];let r=[],s=ps(e),o=new RegExp(`<${s}>([\\s\\S]*?)<\\/${s}>`,"gi");[...t.matchAll(o)].forEach(l=>{l[1]&&r.push(l[1].trim())});let a=(t.match(new RegExp(`<${s}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${s}>`,"gi"))||[]).length;return a>i&&yr.warn(`\u53D1\u73B0 ${a-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),r}function Yi(t,e){if(!t||!e)return[];let r=[],s=ps(e),o=new RegExp(`\\{${s}\\|`,"gi"),n;for(;(n=o.exec(t))!==null;){let a=n.index,i=a+n[0].length,l=1,c=i;for(;c<t.length&&l>0;)t[c]==="{"?l++:t[c]==="}"&&l--,c++;if(l===0){let d=t.substring(i,c-1);d.trim()&&r.push(d.trim())}o.lastIndex=a+1}return r}function au(t,e){if(!t||!e)return[];let r=e.split(",");if(r.length!==2)return yr.error(`\u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let s=r[0].trim(),o=r[1].trim(),n=o.match(/<\/(\w+)>/);if(!n)return yr.error(`\u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${o}`),[];let a=n[1],i=new RegExp(`${ps(s)}([\\s\\S]*?)<\\/${a}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(d=>{d[1]&&l.push(d[1].trim())}),l}function iu(t,e){if(!t||!e)return[];let r=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!r)return yr.error(`\u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let s=r[1],o=[],n=new RegExp(`<${s}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${s}>`,"gi");[...t.matchAll(n)].forEach(c=>{c[1]&&o.push(c[1].trim())});let i=(t.match(new RegExp(`<${s}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${s}>`,"gi"))||[]).length;return i>l&&yr.warn(`\u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${s}> \u6807\u7B7E`),o}function fr(t,e,r=[]){if(!t)return"";if(!e||e.length===0)return t;let s=e.filter(d=>d.type==="exclude"&&d.enabled),o=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),n=e.filter(d=>d.type==="regex_exclude"&&d.enabled),a=t;for(let d of s)try{let u=new RegExp(`<${ps(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${ps(d.value)}>`,"gi");a=a.replace(u,"")}catch(u){yr.error("Error applying block exclusion rule:",{rule:d,error:u})}let i=[];if(o.length>0)for(let d of o){let u=[];try{if(d.type==="include")u.push(...Hi(a,d.value)),u.push(...Yi(a,d.value));else if(d.type==="regex_include"){let y=new RegExp(d.value,"gi");[...a.matchAll(y)].forEach(g=>{g[1]&&u.push(g[1])})}}catch(y){yr.error("Error applying inclusion rule:",{rule:d,error:y})}u.forEach(y=>i.push(y.trim()))}else i.push(a);let l=[];for(let d of i){for(let u of n)try{let y=new RegExp(u.value,"gi");d=d.replace(y,"")}catch(y){yr.error("Error applying cleanup rule:",{rule:u,error:y})}Fi(d,r)||l.push(d)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function lu(t,e={}){let r=performance.now(),{chunkSize:s=5e4,maxTags:o=100,timeoutMs:n=5e3}=e,a=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let u=0;u<t.length;u+=s){let y=t.slice(u,Math.min(u+s,t.length));if(c++,l+=y.length,performance.now()-r>n){yr.warn(`Tag scanning timed out after ${n}ms`);break}let p;for(;(p=i.exec(y))!==null&&a.size<o;){let g=(p[1]||p[2]).toLowerCase();Wi(g)&&a.add(g)}if(a.size>=o)break;c%5===0&&await new Promise(g=>setTimeout(g,0))}let d=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(d-r),processedChars:l,totalChars:t.length,chunkCount:c,tagsFound:a.size}}}function cu(t,e=25){let r=t.tags.slice(0,e);return{suggestions:r,stats:{totalFound:t.stats.tagsFound,finalCount:r.length}}}function du(){return rt.length===0&&Gn(),rt}function uu(t){return rt.find(e=>e.id===t)}function pu(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return rt.push(e),Gi(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function yu(t,e){let r=rt.findIndex(s=>s.id===t);return r===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(rt[r]={...rt[r],...e,updatedAt:new Date().toISOString()},Gi(),{success:!0,template:rt[r],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function fu(t){let e=rt.findIndex(r=>r.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(rt.splice(e,1),Gi(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function Gi(){let t=xt();t.ruleTemplates=rt,Jt(t)}function Fs(){return Re||Gn(),Re}function gu(t){Re=t||[];let e=xt();e.tagRules=Re,Jt(e)}function mu(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};Re.push(e);let r=xt();return r.tagRules=Re,Jt(r),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function hu(t,e){if(t<0||t>=Re.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};Re[t]={...Re[t],...e};let r=xt();return r.tagRules=Re,Jt(r),{success:!0,rule:Re[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function bu(t){if(t<0||t>=Re.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};Re.splice(t,1);let e=xt();return e.tagRules=Re,Jt(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Ws(){return yt||Gn(),yt}function xu(t){yt=t||[];let e=xt();e.contentBlacklist=yt,Jt(e)}function wu(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=xt();r.tagRulePresets||(r.tagRulePresets={});let s=`preset-${Date.now()}`;return r.tagRulePresets[s]={id:s,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(Re)),blacklist:JSON.parse(JSON.stringify(yt)),createdAt:new Date().toISOString()},Jt(r),{success:!0,preset:r.tagRulePresets[s],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function vu(){let e=xt().tagRulePresets||{};return Object.values(e)}function Tu(t){let e=xt(),s=(e.tagRulePresets||{})[t];return s?(Re=JSON.parse(JSON.stringify(s.rules||[])),yt=JSON.parse(JSON.stringify(s.blacklist||[])),e.tagRules=Re,e.contentBlacklist=yt,Jt(e),{success:!0,preset:s,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Su(t){let e=xt(),r=e.tagRulePresets||{};return r[t]?(delete r[t],e.tagRulePresets=r,Jt(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function _u(){return JSON.stringify({tagRules:Re,contentBlacklist:yt,ruleTemplates:rt,tagRulePresets:xt().tagRulePresets||{}},null,2)}function Eu(t,e={overwrite:!0}){try{let r=JSON.parse(t);if(e.overwrite)Re=r.tagRules||[],yt=r.contentBlacklist||[],rt=r.ruleTemplates||ji;else if(r.tagRules&&Re.push(...r.tagRules),r.contentBlacklist){let o=new Set(yt.map(n=>n.toLowerCase()));r.contentBlacklist.forEach(n=>{o.has(n.toLowerCase())||yt.push(n)})}let s=xt();return s.tagRules=Re,s.contentBlacklist=yt,s.ruleTemplates=rt,r.tagRulePresets&&(s.tagRulePresets={...s.tagRulePresets||{},...r.tagRulePresets}),Jt(s),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(r){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function Au(t,e,r="g",s=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let o=new RegExp(t,r),n=[];if(r.includes("g")){let a;for(;(a=o.exec(e))!==null;)a.length>1?n.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[s]||a[1]||a[0]}):n.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=o.exec(e);a&&n.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[s]||a[1]:a[0]})}return{success:!0,matches:n,count:n.length,extracted:n.map(a=>a.extracted)}}catch(o){return{success:!1,error:o.message,matches:[]}}}var yr,nu,Jh,ji,rt,Re,yt,Cu,Xh,Hs=N(()=>{Be();W();yr=I.createScope("RegexExtractor"),nu="settings";Jh=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],ji=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],rt=[],Re=[],yt=[];Cu={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};Gn();Xh={extractTagContent:fr,extractSimpleTag:Hi,extractCurlyBraceTag:Yi,extractComplexTag:au,extractHtmlFormatTag:iu,escapeRegex:ps,shouldSkipContent:Fi,isValidTagName:Wi,scanTextForTags:lu,generateTagSuggestions:cu,getAllRuleTemplates:du,getRuleTemplate:uu,createRuleTemplate:pu,updateRuleTemplate:yu,deleteRuleTemplate:fu,getTagRules:Fs,setTagRules:gu,addTagRule:mu,updateTagRule:hu,deleteTagRule:bu,getContentBlacklist:Ws,setContentBlacklist:xu,saveRulesAsPreset:wu,getAllRulePresets:vu,loadRulePreset:Tu,deleteRulePreset:Su,exportRulesConfig:_u,importRulesConfig:Eu,testRegex:Au,MESSAGE_MACROS:Cu}});var $u={};se($u,{createDefaultToolDefinition:()=>ys,default:()=>tb,deleteTool:()=>Gs,deleteToolPreset:()=>Pu,exportTools:()=>qs,getAllTools:()=>Xt,getCurrentToolPreset:()=>Nu,getTool:()=>Qt,getToolPresets:()=>Vn,importTools:()=>Vs,normalizeToolDefinitionToRuntimeConfig:()=>Wo,resetTools:()=>Js,saveTool:()=>Ys,saveToolPreset:()=>Ru,setCurrentToolPreset:()=>Du,setToolEnabled:()=>Jn});function Qh(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,r])=>[e,ys({...r||{},id:e})]))}function Fo(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function Vi(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>0?r:e}function ku(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>=0?r:e}function Iu(t={}){return{settleMs:ku(t?.settleMs,1200),cooldownMs:ku(t?.cooldownMs,5e3)}}function Mu(t={}){return{enabled:t?.enabled===!0,selected:Fo(t?.selected),presetId:typeof t?.presetId=="string"?t.presetId:""}}function Zh(t=[]){let e=Array.isArray(t)?t.map(r=>({role:String(r?.role||"user").trim().toUpperCase(),content:String(r?.content||"").trim()})).filter(r=>r.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(r=>`\u3010${r.role||"USER"}\u3011
${r.content}`).join(`

`)}function eb(t,e={}){let r=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(r)return r;let s=Zh(e?.config?.messages||[]);return s||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function ys(t={}){let e=new Date().toISOString(),r=t?.config||{};return{...Pt,...t,id:t?.id||Pt.id,icon:t?.icon||Pt.icon,order:Number.isFinite(t?.order)?t.order:Pt.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:Pt.promptTemplate,extractTags:Fo(t?.extractTags),config:{execution:{...Pt.config.execution,...r.execution||{},timeout:Vi(r?.execution?.timeout,Pt.config.execution.timeout),retries:Math.max(0,parseInt(r?.execution?.retries,10)||Pt.config.execution.retries)},api:{...Pt.config.api,...r.api||{}},messages:Array.isArray(r?.messages)?r.messages:[],context:{...Pt.config.context,...r.context||{},depth:Vi(r?.context?.depth,Pt.config.context.depth),includeTags:Fo(r?.context?.includeTags),excludeTags:Fo(r?.context?.excludeTags)},automation:Iu(r?.automation),worldbooks:Mu(r?.worldbooks)},enabled:t?.enabled!==!1,metadata:{...Pt.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function Wo(t,e={},r={}){let s=ys({...e,id:t||e?.id||""}),o=Fo(s?.extractTags?.length?s.extractTags:s?.config?.context?.includeTags),n=String(e?.output?.apiPreset||s?.config?.api?.preset||"").trim(),a=eb(t,s),i=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():r.defaultOutputMode||"follow_ai";return{id:s.id||t,name:s.name||t,icon:s.icon||"fa-screwdriver-wrench",description:s.description||"",enabled:s.enabled!==!1,order:Number.isFinite(s.order)?s.order:100,bypass:{enabled:s?.config?.api?.useBypass===!0&&!!s?.config?.api?.bypassPreset,presetId:s?.config?.api?.bypassPreset||""},output:{mode:i,apiPreset:n,overwrite:!0,enabled:!0},automation:Iu(s?.config?.automation),worldbooks:Mu(s?.config?.worldbooks),extraction:{enabled:!0,maxMessages:Vi(s?.config?.context?.depth,5),selectors:o,regexPresetId:typeof s?.config?.extraction?.regexPresetId=="string"?s.config.extraction.regexPresetId:"",writebackTag:typeof s?.config?.extraction?.writebackTag=="string"?s.config.extraction.writebackTag:""},promptTemplate:a,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:n,extractTags:o,isCustom:!0,category:s.category||"utility",metadata:{...s.metadata||{}}}}function Xt(){let t=be.get(Ne.TOOLS),e=Qh(t);return t&&JSON.stringify(t)!==JSON.stringify(e)&&be.set(Ne.TOOLS,e),{...qn,...e}}function Qt(t){return Xt()[t]||null}function Ys(t,e){if(!t||!e)return!1;let r=be.get(Ne.TOOLS)||{},s=!r[t]&&!qn[t],o=ys({...r[t]||{},...e,id:t,metadata:{...r[t]?.metadata||{},...e.metadata||{},createdAt:r[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return r[t]=o,be.set(Ne.TOOLS,r),K.emit(s?O.TOOL_REGISTERED:O.TOOL_UPDATED,{toolId:t,tool:o}),!0}function Gs(t){let e=be.get(Ne.TOOLS)||{};return!e[t]&&!qn[t]||qn[t]?!1:(delete e[t],be.set(Ne.TOOLS,e),K.emit(O.TOOL_UNREGISTERED,{toolId:t}),!0)}function Vn(){return be.get(Ne.PRESETS)||{}}function Ru(t,e){if(!t||!e)return!1;let r=Vn(),s=!r[t];return r[t]={...e,name:t,updatedAt:new Date().toISOString()},be.set(Ne.PRESETS,r),K.emit(s?O.PRESET_CREATED:O.PRESET_UPDATED,{type:"tool",presetName:t,preset:r[t]}),!0}function Pu(t){let e=Vn();return e[t]?(delete e[t],be.set(Ne.PRESETS,e),K.emit(O.PRESET_DELETED,{type:"tool",presetName:t}),!0):!1}function Nu(){return be.get(Ne.CURRENT_PRESET)||""}function Du(t){return be.set(Ne.CURRENT_PRESET,t||""),K.emit(O.PRESET_ACTIVATED,{type:"tool",presetName:t}),!0}function Jn(t,e){let r=Qt(t);if(!r)return!1;let s=be.get(Ne.TOOLS)||{};return s[t]=ys({...r,id:t,enabled:e,metadata:{...r?.metadata||{},createdAt:r?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),be.set(Ne.TOOLS,s),K.emit(e?O.TOOL_ENABLED:O.TOOL_DISABLED,{toolId:t,enabled:e}),!0}function qs(){let t=be.get(Ne.TOOLS)||{},e=be.get(Ne.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function Vs(t,e=!1){try{let r=typeof e=="object"?!!e?.overwrite:!!e,s=JSON.parse(t);if(!s||typeof s!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let o=r?{}:be.get(Ne.TOOLS)||{},n=r?{}:be.get(Ne.PRESETS)||{},a=0,i=0;if(s.tools&&typeof s.tools=="object"){for(let[l,c]of Object.entries(s.tools))!c||typeof c!="object"||(o[l]=ys({...c,id:l}),a+=1);be.set(Ne.TOOLS,o)}if(s.presets&&typeof s.presets=="object"){for(let[l,c]of Object.entries(s.presets))!c||typeof c!="object"||(n[l]={...c,name:l,updatedAt:new Date().toISOString()},i+=1);be.set(Ne.PRESETS,n)}return{success:!0,toolsImported:a,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(r){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function Js(){be.remove(Ne.TOOLS),be.remove(Ne.PRESETS),be.remove(Ne.CURRENT_PRESET)}var Pt,qn,Ne,tb,Ho=N(()=>{Be();Ye();Pt={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},qn={},Ne={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};tb={getAllTools:Xt,getTool:Qt,saveTool:Ys,deleteTool:Gs,setToolEnabled:Jn,exportTools:qs,importTools:Vs,resetTools:Js,getToolPresets:Vn,saveToolPreset:Ru,deleteToolPreset:Pu,getCurrentToolPreset:Nu,setCurrentToolPreset:Du,createDefaultToolDefinition:ys,normalizeToolDefinitionToRuntimeConfig:Wo}});var rl={};se(rl,{TOOL_CATEGORIES:()=>Lu,TOOL_REGISTRY:()=>Xs,appendToolRuntimeHistory:()=>qu,clearToolApiPreset:()=>Hu,default:()=>cb,ensureToolRuntimeConfig:()=>Qs,getAllDefaultToolConfigs:()=>Ju,getAllToolApiBindings:()=>Yu,getAllToolFullConfigs:()=>qo,getEnabledTools:()=>Xu,getToolApiPreset:()=>el,getToolBaseConfig:()=>Xn,getToolConfig:()=>Go,getToolFullConfig:()=>ne,getToolList:()=>Uu,getToolSubTabs:()=>ju,getToolWindowState:()=>Zu,hasTool:()=>Zi,onPresetDeleted:()=>Gu,patchToolRuntime:()=>Lr,registerTool:()=>zu,resetToolConfig:()=>Vu,resetToolRegistry:()=>Fu,saveToolConfig:()=>_e,saveToolWindowState:()=>Qu,setToolApiPreset:()=>Wu,setToolApiPresetConfig:()=>ab,setToolBypassConfig:()=>ib,setToolOutputMode:()=>nb,setToolPromptTemplate:()=>lb,unregisterTool:()=>Ku,updateToolRuntime:()=>tl});function fs(t={}){let e=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(t?.lastRunAt)?t.lastRunAt:0,lastStatus:typeof t?.lastStatus=="string"?t.lastStatus:"idle",lastError:typeof t?.lastError=="string"?t.lastError:"",lastDurationMs:Number.isFinite(t?.lastDurationMs)?t.lastDurationMs:0,successCount:Number.isFinite(t?.successCount)?t.successCount:0,errorCount:Number.isFinite(t?.errorCount)?t.errorCount:0,lastMessageKey:typeof t?.lastMessageKey=="string"?t.lastMessageKey:"",lastExecutionKey:typeof t?.lastExecutionKey=="string"?t.lastExecutionKey:"",lastExecutionPath:typeof t?.lastExecutionPath=="string"?t.lastExecutionPath:"",lastWritebackStatus:typeof t?.lastWritebackStatus=="string"?t.lastWritebackStatus:"",lastFailureStage:typeof t?.lastFailureStage=="string"?t.lastFailureStage:"",lastSlotBindingKey:typeof t?.lastSlotBindingKey=="string"?t.lastSlotBindingKey:"",lastSlotRevisionKey:typeof t?.lastSlotRevisionKey=="string"?t.lastSlotRevisionKey:"",lastSlotTransactionId:typeof t?.lastSlotTransactionId=="string"?t.lastSlotTransactionId:"",lastSourceMessageId:typeof t?.lastSourceMessageId=="string"?t.lastSourceMessageId:"",lastSourceSwipeId:typeof t?.lastSourceSwipeId=="string"?t.lastSourceSwipeId:"",lastContentCommitted:t?.lastContentCommitted===!0,lastHostCommitApplied:t?.lastHostCommitApplied===!0,lastRefreshRequested:t?.lastRefreshRequested===!0,lastRefreshConfirmed:t?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof t?.lastPreferredCommitMethod=="string"?t.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof t?.lastAppliedCommitMethod=="string"?t.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(t?.lastRefreshMethodCount)?t.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(t?.lastRefreshMethods)?t.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(t?.lastRefreshConfirmChecks)?t.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof t?.lastRefreshConfirmedBy=="string"?t.lastRefreshConfirmedBy:"",lastTraceId:typeof t?.lastTraceId=="string"?t.lastTraceId:"",lastAutoRunAt:Number.isFinite(t?.lastAutoRunAt)?t.lastAutoRunAt:0,lastAutoStatus:typeof t?.lastAutoStatus=="string"?t.lastAutoStatus:"idle",lastAutoMessageId:typeof t?.lastAutoMessageId=="string"?t.lastAutoMessageId:"",lastAutoSwipeId:typeof t?.lastAutoSwipeId=="string"?t.lastAutoSwipeId:"",lastAutoRevisionKey:typeof t?.lastAutoRevisionKey=="string"?t.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof t?.lastAutoWritebackStatus=="string"?t.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:t?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof t?.lastAutoSkipReason=="string"?t.lastAutoSkipReason:"",recentWritebackHistory:e}}function rb(t,e=10){let r=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=r?t:t.slice(t.length-r):[]}function Ou(){let t=Xt()||{};return Object.entries(t).filter(([e])=>!Yo[e]).map(([e,r])=>[e,r||{}])}function Ji(t={}){return t?.toolKind==="script"?"script":t?.toolKind==="ai"?"ai":t?.output?.mode==="local_transform"||t?.processor?.type?"script":"ai"}function Bu(){let t=Array.isArray(Xs.tools?.subTabs)?Xs.tools.subTabs.map((r,s)=>({...r,order:Number.isFinite(r?.order)?r.order:s,toolKind:Ji(r),toolGroupLabel:Ji(r)==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"})):[],e=Ou().map(([r,s],o)=>{let n=Wo(r,s),a=Ji(n);return{id:r,name:n.name||r,icon:n.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(n.order)?n.order:100+o,isCustom:!0,description:n.description||"",toolKind:a,toolGroupLabel:a==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"}});return[...t,...e].sort((r,s)=>(r.order??0)-(s.order??0))}function sb(t,e={}){let r=Wo(t,e,{defaultOutputMode:"follow_ai"});return{...r,runtime:fs(r.runtime)}}function Qi(t){let e=Yo[t];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:fs(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let s=(Xt()||{})[t]||null;return s?sb(t,s):Go(t)}function Xn(t){let e=Qi(t);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function ob(t,e={},r=""){if(!t)return null;let s={...t,...e,id:t.id||e.id};s.output={...t.output||{},...e.output||{}},s.automation={settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(t?.automation?.settleMs)?t.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(t?.automation?.cooldownMs)?t.automation.cooldownMs:5e3},s.bypass={...t.bypass||{},...e.bypass||{}},s.worldbooks={...t.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(t?.worldbooks?.selected)?[...t.worldbooks.selected]:[]},s.runtime=fs({...t.runtime||{},...e.runtime||{}}),s.extraction={...t.extraction||{},...e.extraction||{}},s.processor={...t.processor||{},...e.processor||{},options:{...t?.processor?.options||{},...e?.processor?.options||{}}};let o=e?.output?.apiPreset||e?.apiPreset||s.output?.apiPreset||s.apiPreset||r||"";return s.output={...s.output||{},apiPreset:o},s.apiPreset=o,t.isCustom?s.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?s.enabled=e.enabled:s.enabled=t.enabled!==!1,s}function zu(t,e){if(!t||typeof t!="string")return ct.error("\u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return ct.error("\u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let r=["name","icon","component"];for(let s of r)if(!e[s])return ct.error(` \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${s}`),!1;return Zt[t]={id:t,...e,order:e.order??Object.keys(Zt).length},ct.log(` \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function Ku(t){return Zt[t]?(delete Zt[t],ct.log(` \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(ct.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function Uu(t=!0){let e=Object.values(Zt).map(r=>r.id==="tools"?{...r,subTabs:Bu()}:r);return t?e.sort((r,s)=>(r.order??0)-(s.order??0)):e}function Go(t){return t==="tools"&&Zt[t]?{...Zt[t],subTabs:Bu()}:Zt[t]||null}function Zi(t){return!!Zt[t]}function ju(t){let e=Go(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function Fu(){Zt={...Xs},ct.log("\u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Wu(t,e){if(!Zi(t))return ct.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let r=D.get(Nt)||{};return r[t]=e||"",D.set(Nt,r),ct.log(` \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function el(t){return(D.get(Nt)||{})[t]||""}function Hu(t){let e=D.get(Nt)||{};delete e[t],D.set(Nt,e),ct.log(` \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function Yu(){return D.get(Nt)||{}}function Gu(t){let e=D.get(Nt)||{},r=!1;for(let s in e)e[s]===t&&(e[s]="",r=!0,ct.log(` \u5DE5\u5177 "${s}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));r&&D.set(Nt,e)}function ne(t){let e=Qi(t);if(!e)return Go(t);let s=(D.get($r)||{})[t]||{},o=el(t),n=ob({...e,id:t},s,o);return typeof window<"u"&&window.YYT_PRESET_DEBUG&&typeof console<"u"&&console.log&&console.log(`[YYT-DEBUG][getToolFullConfig] ${t}`,{base_extraction:JSON.parse(JSON.stringify(e.extraction||{})),base_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),user_extraction:JSON.parse(JSON.stringify(s.extraction||{})),user_worldbooks:JSON.parse(JSON.stringify(s.worldbooks||{})),merged_extraction:JSON.parse(JSON.stringify(n.extraction||{})),merged_worldbooks:JSON.parse(JSON.stringify(n.worldbooks||{}))}),n}function Qs(t){if(!t)return!1;let e=Qi(t);if(!e)return!1;let r=D.get($r)||{};if(r[t])return!0;let s={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};r[t]=s,D.set($r,r);let o=D.get(Nt)||{};return o[t]=s.output?.apiPreset||s.apiPreset||"",D.set(Nt,o),K.emit(O.TOOL_UPDATED,{toolId:t,config:s}),!0}function _e(t,e,r={}){if(!t||!ne(t))return ct.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:s=!0}=r,o=D.get($r)||{},n=D.get(Nt)||{},a=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return o[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){o[t][l]={...e.output,apiPreset:a};return}if(l==="apiPreset"){o[t][l]=a;return}o[t][l]=e[l]}}),o[t].apiPreset===void 0&&(o[t].apiPreset=a),!o[t].output&&e.output!==void 0&&(o[t].output={...e.output||{},apiPreset:a}),D.set($r,o),n[t]=a,D.set(Nt,n),typeof window<"u"&&window.YYT_PRESET_DEBUG&&typeof console<"u"&&console.log&&console.log(`[YYT-DEBUG][saveToolConfig] ${t}`,{input_extraction:JSON.parse(JSON.stringify(e.extraction||{})),input_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),saved_extraction:JSON.parse(JSON.stringify(o[t].extraction||{})),saved_worldbooks:JSON.parse(JSON.stringify(o[t].worldbooks||{})),verify_storage:JSON.parse(JSON.stringify((D.get($r)||{})[t]?.extraction||{}))}),s&&K.emit(O.TOOL_UPDATED,{toolId:t,config:o[t]}),ct.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function nb(t,e){let r=ne(t);return r?_e(t,{...r,output:{...r.output,mode:e}}):!1}function ab(t,e){let r=ne(t);return r?_e(t,{...r,apiPreset:e,output:{...r.output,apiPreset:e}}):!1}function ib(t,e){let r=ne(t);return r?_e(t,{...r,bypass:{...r.bypass,...e}}):!1}function lb(t,e){let r=ne(t);return r?_e(t,{...r,promptTemplate:e}):!1}function Lr(t,e,r={}){let s=ne(t);if(!s)return!1;let{touchLastRunAt:o=!1,emitEvent:n=!1,emitRuntimeEvent:a=!0}=r,i=fs({...s.runtime||{},...e||{}});o&&(i.lastRunAt=Date.now());let l=_e(t,{...s,runtime:i},{emitEvent:n});return l&&a&&K.emit(O.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:i,previousRuntime:fs(s.runtime||{})}),l}function qu(t,e,r={},s={}){let o=ne(t);if(!o)return!1;let{limit:n=10,emitEvent:a=!1,emitRuntimeEvent:i=!0}=s,l=fs(o.runtime||{}),c=fs(o.runtime||{}),d="recentWritebackHistory",u={id:r?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:r?.at||Date.now(),...r};l[d]=rb([...Array.isArray(l[d])?l[d]:[],u],n),u?.traceId&&(l.lastTraceId=u.traceId);let y=_e(t,{...o,runtime:l},{emitEvent:a});return y&&i&&K.emit(O.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:l,previousRuntime:c,historyType:e,historyEntry:u}),y}function tl(t,e,r={}){let{touchLastRunAt:s=!0,emitEvent:o=!1,emitRuntimeEvent:n=!0}=r;return Lr(t,e,{touchLastRunAt:s,emitEvent:o,emitRuntimeEvent:n})}function Vu(t){if(!t||!Yo[t])return ct.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=D.get($r)||{};return delete e[t],D.set($r,e),K.emit(O.TOOL_UPDATED,{toolId:t,config:null}),ct.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function Ju(){return{...Yo}}function qo(){let t=new Set([...Object.keys(Yo),...Ou().map(([e])=>e)]);return Array.from(t).map(e=>ne(e)).filter(Boolean)}function Xu(){return qo().filter(t=>t&&t.enabled)}function Qu(t,e){let r=D.get(Xi)||{};r[t]={...e,updatedAt:Date.now()},D.set(Xi,r)}function Zu(t){return(D.get(Xi)||{})[t]||null}var ct,$r,Nt,Xi,Yo,Xs,Lu,Zt,cb,er=N(()=>{Be();Ye();W();Ho();ct=I.createScope("ToolRegistry"),$r="tool_configs",Nt="tool_api_bindings",Xi="tool_window_states";Yo={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,regexPresetId:"builtin_regex_summary"},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:[]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},Xs={presetManagement:{id:"presetManagement",name:"\u9884\u8BBE\u7BA1\u7406",icon:"fa-bookmark",hasSubTabs:!0,description:"\u7EDF\u4E00\u7BA1\u7406 API / \u6B63\u5219 / \u4E16\u754C\u4E66 / \u8868\u683C\u6A21\u677F\u9884\u8BBE",order:0,subTabs:[{id:"apiPresets",name:"API \u9884\u8BBE",icon:"fa-database",component:"ApiPresetPanel",presetKind:"api"},{id:"regexPresets",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",component:"RegexExtractPanel",presetKind:"regex"},{id:"worldbookPresets",name:"\u4E16\u754C\u4E66",icon:"fa-book-atlas",component:"WorldbookPresetPanel",presetKind:"worldbook"},{id:"tableTemplates",name:"\u8868\u683C\u6A21\u677F",icon:"fa-table-list",component:"TableTemplatePanel",presetKind:"table"}]},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel",toolKind:"ai"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel",toolKind:"ai"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel",toolKind:"ai"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel",toolKind:"script"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel",toolKind:"script"}]},tableWorkbench:{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",icon:"fa-table-cells",hasSubTabs:!1,description:"\u7ED3\u6784\u5316\u586B\u8868\u4E0E\u72B6\u6001\u9884\u89C8\u5DE5\u4F5C\u53F0",component:"TableWorkbenchPanel",order:5},bypass:{id:"bypass",name:"Ai\u6307\u4EE4\u9884\u8BBE",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406 Ai \u6307\u4EE4\u9884\u8BBE",component:"BypassPanel",order:6},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:7},logger:{id:"logger",name:"\u65E5\u5FD7",icon:"fa-terminal",hasSubTabs:!1,description:"\u67E5\u770B\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7\uFF0C\u652F\u6301\u8FC7\u6EE4\u4E0E\u5BFC\u51FA",component:"LoggerPanel",order:8}},Lu={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},Zt={...Xs};cb={TOOL_REGISTRY:Xs,TOOL_CATEGORIES:Lu,registerTool:zu,unregisterTool:Ku,getToolList:Uu,getToolConfig:Go,hasTool:Zi,getToolSubTabs:ju,resetToolRegistry:Fu,setToolApiPreset:Wu,getToolApiPreset:el,clearToolApiPreset:Hu,getAllToolApiBindings:Yu,onPresetDeleted:Gu,saveToolWindowState:Qu,getToolWindowState:Zu,getToolBaseConfig:Xn,ensureToolRuntimeConfig:Qs,getToolFullConfig:ne,patchToolRuntime:Lr,appendToolRuntimeHistory:qu,saveToolConfig:_e,resetToolConfig:Vu,getAllDefaultToolConfigs:Ju,getAllToolFullConfigs:qo,getEnabledTools:Xu}});function ea(){return`rgx_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function sp(){return`r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,6)}`}function nl(t={}){let e=Object.values(Ft).includes(t.type)?t.type:Ft.INCLUDE;return{id:String(t.id||sp()),name:String(t.name||"").trim(),description:String(t.description||""),type:e,value:String(t.value||""),enabled:t.enabled!==!1}}function tr(t={}){return{id:String(t.id||ea()),name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),rules:Array.isArray(t.rules)?t.rules.map(nl):[],blacklist:Array.isArray(t.blacklist)?t.blacklist.map(e=>String(e||"").trim()).filter(Boolean):[],createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function gr(){let t=Se.get(ol);return!t||typeof t!="object"?{}:t}function Vo(t){Se.set(ol,t)}function gs(t){return typeof t=="string"&&t.startsWith(db)}function op(t){return gs(t)&&Qn.find(e=>e.id===t)||null}function al(t){if(!Array.isArray(t)){Qn=[];return}Qn=t.map(e=>tr({...e,id:String(e?.id||"")})).filter(e=>gs(e.id))}function eo(){if(rp)return;rp=!0;let t=D.get(ep)||{};if(t[tp]===!0)return;let e=gr(),r=Object.keys(e).length>0,s=0,o={...e},n=t.tagRulePresets||{};for(let a of Object.values(n)){let i=tr({id:ea(),name:a.name||"\u5DF2\u8FC1\u79FB\u9884\u8BBE",description:a.description||"",rules:a.rules||[],blacklist:a.blacklist||[],createdAt:typeof a.createdAt=="string"&&Date.parse(a.createdAt)||Date.now(),updatedAt:Date.now()});o[i.id]=i,s+=1}if(!r&&s===0){let a=Array.isArray(t.tagRules)?t.tagRules:[],i=Array.isArray(t.contentBlacklist)?t.contentBlacklist:[];if(a.length||i.length){let l=tr({name:"\u9ED8\u8BA4\u89C4\u5219\u96C6\uFF08\u8FC1\u79FB\uFF09",description:"\u4ECE\u8001\u7248\u672C\u7684\u5F53\u524D\u89C4\u5219\u8FC1\u79FB\u800C\u6765",rules:a,blacklist:i});o[l.id]=l,Se.set(Zs,l.id),s+=1}}s>0&&(Vo(o),Or.info(`\u5DF2\u4ECE\u8001\u6570\u636E\u8FC1\u79FB ${s} \u4E2A\u6B63\u5219\u9884\u8BBE`)),D.set(ep,{...t,[tp]:!0})}function ub(){eo();let t=gr(),e=new Set,r=[];for(let o of Qn){let n=t[o.id];n?(r.push(tr(n)),e.add(o.id)):r.push(o)}let s=Object.values(t).map(tr).filter(o=>!e.has(o.id)).sort((o,n)=>n.updatedAt-o.updatedAt);return r.push(...s),r}function mr(t){if(!t)return null;eo();let e=gr();return e[t]?tr(e[t]):gs(t)?op(t):null}function ta(){eo();let t=Se.get(Zs);return typeof t=="string"&&t?t:""}function np(){let t=ta();return t?mr(t):null}function pb(t){if(t&&gs(t))return Se.set(Zs,t),Zn(),K.emit(O.PRESET_ACTIVATED,{kind:"regex",id:t}),!0;let e=gr();return t&&!e[t]?(Or.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(Se.set(Zs,t||""),Zn(),K.emit(O.PRESET_ACTIVATED,{kind:"regex",id:t}),!0)}function ra(t={}){eo();let e=tr({...t,id:ea(),createdAt:Date.now(),updatedAt:Date.now()}),r=gr();return r[e.id]=e,Vo(r),K.emit(O.PRESET_CREATED,{kind:"regex",id:e.id}),Or.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function ms(t,e={}){if(!t)return null;let r=gr(),s=r[t];if(!s&&gs(t)&&(s=op(t)),!s)return null;let o=tr({...s,...e,id:t,createdAt:s.createdAt,updatedAt:Date.now()});return r[t]=o,Vo(r),ta()===t&&sl(o),K.emit(O.PRESET_UPDATED,{kind:"regex",id:t}),o}function yb(t){if(!t)return!1;if(gs(t))return Or.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=gr();return e[t]?(delete e[t],Vo(e),ta()===t&&(Se.set(Zs,""),Zn()),K.emit(O.PRESET_DELETED,{kind:"regex",id:t}),Or.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function fb(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=mr(t);return r?ra({...r,id:void 0,name:`${r.name}${e}`}):null}function gb(t,e){return gs(t)?(Or.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):ms(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function mb(t,e={}){let r=mr(t);if(!r)return null;let s=nl({...e,id:sp()}),o=[...r.rules,s];return ms(t,{rules:o})}function hb(t,e,r={}){let s=mr(t);if(!s)return null;let o=s.rules.map(n=>n.id===e?nl({...n,...r,id:n.id}):n);return ms(t,{rules:o})}function bb(t,e){let r=mr(t);if(!r)return null;let s=r.rules.filter(o=>o.id!==e);return ms(t,{rules:s})}function xb(t,e,r){let s=mr(t);if(!s)return null;let o=s.rules.findIndex(i=>i.id===e);if(o<0)return null;let n=r==="up"?o-1:o+1;if(n<0||n>=s.rules.length)return null;let a=[...s.rules];return[a[o],a[n]]=[a[n],a[o]],ms(t,{rules:a})}function wb(t,e){let r=Array.isArray(e)?e.map(s=>String(s||"").trim()).filter(Boolean):[];return ms(t,{blacklist:Array.from(new Set(r))})}function vb(){return eo(),{version:1,exportedAt:Date.now(),presets:Object.values(gr()).map(tr)}}function Tb(t){if(eo(),!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[],r=gr(),s=0;for(let o of e){let n=tr({...o,id:ea(),createdAt:Date.now(),updatedAt:Date.now()});r[n.id]=n,s+=1}return s>0&&(Vo(r),K.emit(O.PRESET_IMPORTED,{kind:"regex",count:s})),{added:s}}function Sb(){Se.set(ol,{}),Se.set(Zs,""),Zn(),Or.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u6B63\u5219\u9884\u8BBE")}async function sl(t){if(t)try{let e=await Promise.resolve().then(()=>(Hs(),qi));typeof e.setCurrentRules=="function"&&e.setCurrentRules(JSON.parse(JSON.stringify(t.rules||[]))),typeof e.setContentBlacklist=="function"&&e.setContentBlacklist(JSON.parse(JSON.stringify(t.blacklist||[])))}catch(e){Or.warn("\u540C\u6B65\u5230 regex-extractor \u5931\u8D25",{error:e})}}function Zn(){let t=np();return sl(t||{rules:[],blacklist:[]})}async function _b(t){if(!t)return[];try{let e=await Promise.resolve().then(()=>(er(),rl));return(typeof e.getToolList=="function"?e.getToolList(!1):[]).filter(s=>(typeof e.getToolFullConfig=="function"?e.getToolFullConfig(s.id):null)?.extraction?.regexPresetId===t).map(s=>s.id)}catch{return[]}}var Or,ol,Zs,ep,tp,Ft,db,Qn,rp,Ee,hs=N(()=>{Be();Ye();W();Or=I.createScope("RegexPresetStore"),ol="regex_presets",Zs="regex_current_preset",ep="settings",tp="regex_presets_migrated",Ft=Object.freeze({INCLUDE:"include",EXCLUDE:"exclude",REGEX_INCLUDE:"regex_include",REGEX_EXCLUDE:"regex_exclude"});db="builtin_regex_",Qn=[];rp=!1;Ee={listPresets:ub,getPreset:mr,getCurrentPresetId:ta,getCurrentPreset:np,setCurrentPresetId:pb,createPreset:ra,updatePreset:ms,deletePreset:yb,duplicatePreset:fb,renamePreset:gb,addRule:mb,updateRule:hb,deleteRule:bb,moveRule:xb,setBlacklist:wb,exportAll:vb,importPresets:Tb,resetAll:Sb,findLinkedTools:_b,RULE_TYPES:Ft}});var cp={};se(cp,{RegexExtractPanel:()=>lp,default:()=>Rb});function Ab(t,e,r,s,o,n){let a=m("div",{style:{display:"grid",gridTemplateColumns:"auto auto minmax(140px, 1fr) 200px minmax(120px, 2fr) auto",gap:"10px",alignItems:"center",padding:"10px 0",borderTop:r===0?"none":"1px solid var(--yyt-border)",opacity:e.enabled===!1?"0.55":"1"},attrs:{draggable:n?null:"true","data-rule-id":e.id}}),i=m("div",{style:{cursor:n?"default":"grab",padding:"4px",color:"var(--yyt-text-muted)",fontSize:"14px",userSelect:"none"},text:"\u22EE\u22EE",title:n?"\u5185\u7F6E\u9884\u8BBE\u4E0D\u53EF\u91CD\u6392":"\u62D6\u52A8\u6392\u5E8F"});a.appendChild(i);let l=m("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}}),c=pe({label:"\u25B2",size:"small",variant:"ghost",title:"\u4E0A\u79FB",disabled:n||r===0,onClick:()=>{Ee.moveRule(t.id,e.id,"up"),o()}}),d=pe({label:"\u25BC",size:"small",variant:"ghost",title:"\u4E0B\u79FB",disabled:n||r===s-1,onClick:()=>{Ee.moveRule(t.id,e.id,"down"),o()}});for(let T of[c,d])T.el.style.padding="0 6px",T.el.style.minHeight="auto",T.el.style.fontSize="9px";l.appendChild(c.el),l.appendChild(d.el),a.appendChild(l);let u=m("div",{style:{display:"flex",flexDirection:"column",gap:"2px",minWidth:"0"}}),y=Xe({value:e.name||"",placeholder:"\u89C4\u5219\u540D\uFF08\u53EF\u9009\uFF09",disabled:n,onChange:T=>Ee.updateRule(t.id,e.id,{name:T})});y.el.style.fontSize="12px",y.el.style.padding="6px 10px",u.appendChild(y.el),e.description&&u.appendChild(m("div",{text:e.description,style:{fontSize:"10px",color:"var(--yyt-text-muted)"}})),a.appendChild(u);let p=qe({value:e.type,disabled:n,options:Eb,onChange:T=>{Ee.updateRule(t.id,e.id,{type:T}),o()}});p.el.style.fontSize="11px",p.el.style.padding="6px 10px",a.appendChild(p.el);let g=e.type===Ft.REGEX_INCLUDE||e.type===Ft.REGEX_EXCLUDE,f=Xe({value:e.value||"",placeholder:g?"\u6B63\u5219\u8868\u8FBE\u5F0F...":"\u6807\u7B7E\u540D\uFF08\u5982 content\uFF09",disabled:n,onChange:T=>Ee.updateRule(t.id,e.id,{value:T})});f.el.style.fontSize="12px",f.el.style.padding="6px 10px",f.el.style.fontFamily="ui-monospace, monospace",a.appendChild(f.el);let h=m("div",{style:{display:"flex",gap:"6px",alignItems:"center"}}),x=Rt({checked:e.enabled!==!1,disabled:n,onChange:T=>{Ee.updateRule(t.id,e.id,{enabled:T}),o()}});return x.el.style.padding="0",x.el.style.border="none",x.el.style.background="transparent",h.appendChild(x.el),n||h.appendChild(pe({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664\u89C4\u5219",onClick:()=>{Ee.deleteRule(t.id,e.id),o()}}).el),a.appendChild(h),a}function Cb(t,e,r){let s=null;t.addEventListener("dragstart",o=>{let n=o.target;if(!(n instanceof HTMLElement))return;let a=n.closest("[data-rule-id]");if(a){s=a.getAttribute("data-rule-id"),a.style.opacity="0.4";try{o.dataTransfer.effectAllowed="move",o.dataTransfer.setData("text/plain",s)}catch{}}}),t.addEventListener("dragend",o=>{let n=o.target;n instanceof HTMLElement&&(n.style.opacity=""),s=null}),t.addEventListener("dragover",o=>{if(s){o.preventDefault();try{o.dataTransfer.dropEffect="move"}catch{}}}),t.addEventListener("drop",o=>{if(o.preventDefault(),!s)return;let n=o.target instanceof HTMLElement?o.target.closest("[data-rule-id]"):null;if(!n)return;let a=n.getAttribute("data-rule-id");if(!a||a===s)return;let i=Ee.getPreset(e.id);if(!i)return;let l=i.rules.findIndex(y=>y.id===s),c=i.rules.findIndex(y=>y.id===a);if(l<0||c<0)return;let d=[...i.rules],[u]=d.splice(l,1);d.splice(c,0,u),Ee.updatePreset(e.id,{rules:d}),r()})}function kb(t,{onChange:e,readonly:r,refresh:s}){let o=m("div",{style:{display:"flex",flexDirection:"column",gap:"14px"}});F(o,bt({label:"\u63CF\u8FF0",control:Xe({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})}));let n=m("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px"}},m("div",{text:"\u63D0\u53D6\u89C4\u5219\uFF08\u6309\u987A\u5E8F\u5E94\u7528\uFF09",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),r?m("span",{text:"\u5185\u7F6E\u9884\u8BBE\u53EA\u8BFB",style:{fontSize:"11px",color:"var(--yyt-text-muted)"}}):pe({label:"+ \u65B0\u589E\u89C4\u5219",size:"small",onClick:()=>{Ee.addRule(t.id,{type:Ft.INCLUDE,value:"",enabled:!0}),s&&s()}}).el);F(o,n);let a=m("div");if(t.rules.length){for(let i=0;i<t.rules.length;i++)a.appendChild(Ab(t,t.rules[i],i,t.rules.length,s,r));r||Cb(a,t,s)}else a.appendChild(m("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5C1A\u65E0\u89C4\u5219\u3002\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u65B0\u589E\u89C4\u5219"\u5F00\u59CB\u6DFB\u52A0\u3002'}));if(F(o,a),F(o,m("div",{text:"\u5185\u5BB9\u9ED1\u540D\u5355",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px",marginBottom:"4px"}})),F(o,m("div",{text:"\u63D0\u53D6\u51FA\u7684\u5185\u5BB9\u5757\u82E5\u5305\u542B\u4EFB\u4E00\u5173\u952E\u8BCD\u5219\u8DF3\u8FC7\u8BE5\u5757\uFF08\u4E0D\u533A\u5206\u5927\u5C0F\u5199\uFF09\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginBottom:"6px"}})),r)F(o,m("div",{style:{fontSize:"12px",color:"var(--yyt-text-muted)"},text:t.blacklist.length?t.blacklist.join("\u3001"):"\uFF08\u7A7A\uFF09"}));else{let i=Ri({values:t.blacklist,placeholder:"\u8F93\u5165\u5173\u952E\u8BCD\u56DE\u8F66\u6DFB\u52A0",chipVariant:"danger",onChange:l=>Ee.setBlacklist(t.id,l)});F(o,i.el)}return o}function Ib(t){if(!t)return null;let e=m("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}});F(e,m("div",{text:"\u6D4B\u8BD5\u63D0\u53D6",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}));let r=ip.get(t.id)||{input:"",output:""};ip.set(t.id,r);let s=m("textarea",{className:"yyt-textarea",attrs:{rows:"5",placeholder:"\u7C98\u8D34\u6D4B\u8BD5\u6587\u672C\uFF08\u5982 AI \u56DE\u590D\u539F\u6587\uFF09..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});s.value=r.input,s.addEventListener("input",()=>{r.input=s.value}),F(e,s);let o=m("div",{style:{padding:"10px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-muted)",maxHeight:"200px",overflowY:"auto",whiteSpace:"pre-wrap",wordBreak:"break-all",minHeight:"50px"}});o.textContent=r.output||'// \u70B9\u51FB"\u8FD0\u884C\u6D4B\u8BD5"\u770B\u63D0\u53D6\u7ED3\u679C';let n=pe({label:"\u25B6 \u8FD0\u884C\u6D4B\u8BD5",size:"small",variant:"primary",onClick:()=>{let a=s.value;if(!a.trim()){r.output="// \u6D4B\u8BD5\u8F93\u5165\u4E3A\u7A7A",o.textContent=r.output,o.style.color="var(--yyt-text-muted)";return}try{let i=fr(a,t.rules||[],t.blacklist||[]);r.output=i||"// \u6CA1\u6709\u63D0\u53D6\u5230\u5185\u5BB9",o.textContent=r.output,o.style.color=i?"var(--yyt-text)":"var(--yyt-text-muted)"}catch(i){r.output=`// \u6D4B\u8BD5\u51FA\u9519\uFF1A${i?.message||i}`,o.textContent=r.output,o.style.color="var(--yyt-danger, #f87171)"}}});return F(e,n.el),F(e,o),e}function Mb(t){let e=t.rules.filter(r=>r.enabled!==!1).length;return[`${t.rules.length} \u89C4\u5219\uFF08${e} \u542F\u7528\uFF09`,`${t.blacklist.length} \u9ED1\u540D\u5355`]}var e_,Eb,ip,lp,Rb,dp=N(()=>{ur();hs();Hs();W();Ko();e_=I.createScope("RegexExtractPanel"),Eb=[{value:Ft.INCLUDE,label:"include \u2014 \u63D0\u53D6\u6807\u7B7E"},{value:Ft.EXCLUDE,label:"exclude \u2014 \u6392\u9664\u6807\u7B7E"},{value:Ft.REGEX_INCLUDE,label:"regex_include \u2014 \u6B63\u5219\u63D0\u53D6"},{value:Ft.REGEX_EXCLUDE,label:"regex_exclude \u2014 \u6B63\u5219\u6392\u9664"}],ip=new Map;lp=Mr({id:"regexExtractPanel",kind:"regex",panelTitle:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",panelHint:"\u7BA1\u7406\u591A\u4E2A\u63D0\u53D6\u89C4\u5219\u96C6\uFF0C\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\u3002\u89C4\u5219\u6309\u987A\u5E8F\u5E94\u7528\uFF0C\u53EF\u62D6\u62FD\u6392\u5E8F\u3002",store:Ee,renderEditor:kb,renderExtras:Ib,renderListItemMeta:Mb}),Rb=lp});function he(t){return t==null?"":String(t).trim()}function Nb(t="table"){let e=he(t)||"table",r=Date.now().toString(36),s=Math.random().toString(36).slice(2,8);return`${e}_${r}_${s}`}function Jo(t="row"){return Nb(t)}function Wt(t,e=0){return he(t)||`table_${Number.isFinite(e)?e+1:1}`}function Xo(t,e=0){return he(t)||`row_${Number.isFinite(e)?e+1:1}`}function ae(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function to(t={}){return{chatId:he(t.chatId),sourceMessageId:he(t.sourceMessageId||t.messageId),sourceSwipeId:he(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:he(t.effectiveSwipeId||t.sourceSwipeId),slotBindingKey:he(t.slotBindingKey),slotRevisionKey:he(t.slotRevisionKey),slotTransactionId:he(t.slotTransactionId),traceId:he(t.traceId),resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now()}}function il(t={}){return{resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now(),runSource:he(t.runSource)||Qe.MANUAL,traceId:he(t.traceId),chatId:he(t.chatId),sourceMessageId:he(t.sourceMessageId||t.messageId),sourceSwipeId:he(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:he(t.effectiveSwipeId||t.sourceSwipeId)||"swipe:current",slotBindingKey:he(t.slotBindingKey),slotRevisionKey:he(t.slotRevisionKey),slotTransactionId:he(t.slotTransactionId),assistantContentFingerprint:he(t.assistantContentFingerprint),assistantBaseFingerprint:he(t.assistantBaseFingerprint),assistantText:String(t.assistantText||""),assistantBaseText:String(t.assistantBaseText||""),targetMessageIndex:Number.isFinite(t.targetMessageIndex)?t.targetMessageIndex:-1}}function hr(t){return!t||typeof t!="object"?null:{chatId:he(t.chatId),slotBindingKey:he(t.slotBindingKey),slotRevisionKey:he(t.slotRevisionKey),sourceMessageId:he(t.sourceMessageId),sourceSwipeId:he(t.sourceSwipeId),tables:Array.isArray(t.tables)?ae(t.tables):[],updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0,meta:t.meta&&typeof t.meta=="object"?ae(t.meta):{}}}function Qo(t={},e={}){let r=il(t),s=e.meta&&typeof e.meta=="object"?ae(e.meta):{};return{chatId:r.chatId,slotBindingKey:r.slotBindingKey,slotRevisionKey:r.slotRevisionKey,sourceMessageId:r.sourceMessageId,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId,tables:Array.isArray(e.tables)?ae(e.tables):[],updatedAt:Number.isFinite(e.updatedAt)?e.updatedAt:Date.now(),meta:{sourceKind:s.sourceKind||wt.EMPTY,...s}}}function sa(t){return!t||typeof t!="object"?{lastResolvedTarget:null,lastCommittedTarget:null,updatedAt:0}:{lastResolvedTarget:t.lastResolvedTarget?to(t.lastResolvedTarget):null,lastCommittedTarget:t.lastCommittedTarget?to(t.lastCommittedTarget):null,updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0}}function Ae(t){if(t==null)return Dt;let e=String(t).trim();return e===""?Dt:e}function Zo(t,e){let r=he(t),s=Ae(e);return`${r}::${s}`}function pp(){return{rows:[],cols:[],cells:[],indexColumn:!1}}var bs,Br,Qe,dt,xs,wt,ro,Pb,Dt,vt,up,t_,r_,je=N(()=>{bs="YouYouToolkit_tableState",Br="YouYouToolkit_tableBindings",Qe=Object.freeze({MANUAL:"MANUAL_TABLE",AUTO:"AUTO_TABLE"}),dt=Object.freeze({ENABLED:"enabled",SELECTED:"selected",CURRENT:"current"}),xs=Object.freeze({EXACT:"exact",BINDING_FALLBACK:"binding_fallback",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),wt=Object.freeze({EXACT:"exact",BINDING:"binding",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),ro=Object.freeze({INSERT_ROW:"insertRow",UPDATE_ROW:"updateRow",DELETE_ROW:"deleteRow"}),Pb=Object.freeze({CELL:"cell",ROW:"row",COLUMN:"column",INDEX_COLUMN:"index_column"});Dt="";vt=Object.freeze({INHERIT_GLOBAL:"inherit_global",CHAT_OVERRIDE:"chat_override",PRESET_LINK:"preset_link"}),up=8,t_=Object.freeze({NOTE:"note",INIT_NODE:"initNode",INSERT_NODE:"insertNode",UPDATE_NODE:"updateNode",DELETE_NODE:"deleteNode"}),r_=Object.freeze({INHERIT_GLOBAL:-1,DISABLED:0})});function oa(t,e=""){return t==null?e:String(t).trim()||e}function Db(t,e=!1){return t==null?e:t===!0}function na(t={},e=0){return Wt(t?.id||t?.key,e)}function en(t={},e={}){let r=t&&typeof t=="object"?t:{},s=e&&typeof e=="object"?e:{},o=oa(r.mode||r.runScope||s.mode||s.runScope,dt.ENABLED),n=Array.isArray(r.selectedTableIds)?r.selectedTableIds.map(i=>oa(i,"")).filter(Boolean):Array.isArray(s.selectedTableIds)?s.selectedTableIds.map(i=>oa(i,"")).filter(Boolean):[],a=oa(r.activeTableId||s.activeTableId,"");return{mode:Object.values(dt).includes(o)?o:dt.ENABLED,selectedTableIds:n,activeTableId:a}}function yp(t={},e=[]){let r=en(t,t?.scope||{}),s=Array.isArray(e)?e:[],o=s.map((d,u)=>na(d,u)),n=new Set(o),a=r.mode,i=!1;a===dt.CURRENT?(!r.activeTableId||!n.has(r.activeTableId))&&(a=dt.ENABLED,i=!0):a===dt.SELECTED&&r.selectedTableIds.filter(u=>n.has(u)).length===0&&(a=dt.ENABLED,i=!0);let l=[];a===dt.CURRENT?l=r.activeTableId?[r.activeTableId]:[]:a===dt.SELECTED?l=r.selectedTableIds.filter(d=>n.has(d)):l=s.map((d,u)=>({table:d,id:na(d,u)})).filter(({table:d})=>Db(d?.enabled,!0)).map(({id:d})=>d);let c=new Set(l);return{...r,mode:a,requestedMode:r.mode,staleScope:i,allTableIds:o,allowedTableIds:l,allowedIdSet:c,includes(d={},u=-1){return c.has(na(d,u))},filterTables(d=[]){return(Array.isArray(d)?d:[]).filter((y,p)=>c.has(na(y,p)))},toJSON(){return{mode:a,requestedMode:r.mode,staleScope:i,selectedTableIds:ae(r.selectedTableIds),activeTableId:r.activeTableId,allowedTableIds:[...l]}}}}var aa=N(()=>{je()});function Tt(t,e=""){return t==null?e:String(t).trim()||e}function ll(){let t=globalThis.window||globalThis;return Tt(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function $b(t,e=!1){return t===!0}function Lb(t={}){let e=t&&typeof t=="object"?t:{};return{enabled:$b(e.enabled,!1),targetBook:Tt(e.targetBook,""),entryComment:Tt(e.entryComment,"YYT-\u586B\u8868\u6570\u636E")}}function cl(t={},e={}){let r=t&&typeof t=="object"?t:{},s=en(r.scope,{mode:r.runScope||e.runScope||dt.ENABLED,selectedTableIds:r.selectedTableIds||e.selectedTableIds||[],activeTableId:r.activeTableId||e.activeTableId||""});return{chatId:Tt(r.chatId,Tt(e.chatId,ll())),templateId:Tt(r.templateId,Tt(e.templateId,ut)),enabledTableIds:Array.isArray(r.enabledTableIds)?r.enabledTableIds.map(o=>Tt(o,"")).filter(Boolean):[],focusedTableId:Tt(r.focusedTableId,s.activeTableId),scope:s,worldbookSync:Lb(r.worldbookSync),seedNote:Tt(r.seedNote,""),updatedAt:Tt(r.updatedAt,new Date().toISOString())}}function mp(){let t=fp.get(gp,{});return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function dl(t=ll()){let e=Tt(t,"default_chat"),r=mp();return cl(r[e],{chatId:e})}function hp(t={},e=ll()){let r=Tt(e,"default_chat"),s=mp(),o=cl({...s[r],...t||{},chatId:r,updatedAt:new Date().toISOString()},{chatId:r});return fp.set(gp,{...s,[r]:o}),{success:!0,guide:o}}function bp(t={},e=null){let r=cl(e||dl(),{templateId:t.activeTemplate,runScope:t.runScope,selectedTableIds:t.scope?.selectedTableIds,activeTableId:t.scope?.activeTableId}),s={...t,activeTemplate:r.templateId||t.activeTemplate,runScope:r.scope.mode,scope:r.scope};return r.worldbookSync&&r.worldbookSync.targetBook&&(s.worldbookSync={...t.worldbookSync||{},...r.worldbookSync}),s}var fp,gp,xp=N(()=>{Be();br();je();aa();fp=D.namespace("tableWorkbenchGuides"),gp="guides"});function Z(t,e,r="",s=la){return{key:t,title:e,description:r,type:s,required:!1}}function zr({id:t,name:e,note:r,aiInstructions:s,columns:o}){return{id:t,name:e,note:r,enabled:!0,aiInstructions:{init:s?.init||"",create:s?.create||"",update:s?.update||"",delete:s?.delete||""},columns:o,rows:[]}}var ve,ia,ul,wp,Ob,la,vp,ut,pl,so,Tp=N(()=>{ve=Object.freeze({IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error",ABORTED:"aborted",SKIPPED:"skipped"}),ia=Object.freeze({INCREMENTAL:"incremental",FULL:"full"}),ul=`\u8BF7\u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5F53\u524D\u8868\u683C\u57FA\u5E95\uFF0C\u5BF9\u7ED3\u6784\u5316 tables \u6570\u636E\u505A\u589E\u91CF\u66F4\u65B0\u3002

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
{{toolContentMacro}}`,wp=`\u8F93\u51FA\u8981\u6C42 \u2014 \u7528 <tableEdit>...</tableEdit> \u589E\u91CF DSL\uFF1A

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
\u4F46\u5E94\u8BE5\u5C3D\u91CF\u4F18\u5148\u7528 DSL\uFF08\u6D41\u91CF\u5C0F\u3001\u4E0D\u5F71\u54CD\u9501\u5B57\u6BB5\uFF09\u3002`,Ob=Object.freeze([{value:"text",label:"\u6587\u672C"},{value:"number",label:"\u6570\u5B57"},{value:"boolean",label:"\u5E03\u5C14"},{value:"date",label:"\u65E5\u671F"},{value:"json",label:"JSON"}]),la="text",vp=Object.freeze(Ob.map(t=>Object.freeze({...t}))),ut="default_story_state",pl="\u9ED8\u8BA4\u5267\u60C5\u72B6\u6001\u6A21\u677F";so=Object.freeze([zr({id:"default_global_state",name:"\u5168\u5C40\u6570\u636E\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u4E3B\u89D2\u6240\u5728\u5730\u70B9\u53CA\u65F6\u95F4\u76F8\u5173\u53C2\u6570\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u63D2\u5165\u4E00\u6761\u5173\u4E8E\u5F53\u524D\u4E16\u754C\u72B6\u6001\u7684\u8BB0\u5F55\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u5730\u70B9\u6216\u65F6\u95F4\u53D1\u751F\u53D8\u5316\u65F6\u66F4\u65B0\u6B64\u8868\uFF1B\u6BCF\u8F6E\u5E94\u6839\u636E\u5267\u60C5\u66F4\u65B0\u65F6\u95F4\u76F8\u5173\u5B57\u6BB5\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[Z("location","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u5730\u70B9","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u7684\u5177\u4F53\u573A\u666F\u540D\u79F0\u3002"),Z("current_time","\u5F53\u524D\u65F6\u95F4","\u6E38\u620F\u4E16\u754C\u7684\u5F53\u524D\u65F6\u95F4\uFF1B\u5982\u5267\u60C5\u6CA1\u6709\u660E\u786E\u65F6\u95F4\uFF0C\u53EF\u6839\u636E\u4E16\u754C\u89C2\u7ED9\u51FA\u5408\u7406\u65F6\u95F4\u3002"),Z("previous_scene_time","\u4E0A\u8F6E\u573A\u666F\u65F6\u95F4","\u4E0A\u4E00\u8F6E\u4EA4\u4E92\u7ED3\u675F\u65F6\u7684\u65F6\u95F4\u3002"),Z("elapsed_time","\u7ECF\u8FC7\u7684\u65F6\u95F4","\u6839\u636E\u5F53\u524D\u4E0E\u4E0A\u8F6E\u65F6\u95F4\u8BA1\u7B97\u51FA\u7684\u6587\u672C\u63CF\u8FF0\u3002")]}),zr({id:"default_protagonist_profile",name:"\u4E3B\u89D2\u4FE1\u606F",note:"\u8BB0\u5F55\u4E3B\u89D2\u7684\u6838\u5FC3\u8EAB\u4EFD\u4FE1\u606F\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E3B\u89D2\u7684\u552F\u4E00\u6761\u76EE\u3002",create:"\u7981\u6B62\u65B0\u589E\u591A\u540D\u4E3B\u89D2\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u4E3B\u89D2\u8EAB\u4EFD\u3001\u5916\u8C8C\u3001\u7ECF\u5386\u6216\u6027\u683C\u6709\u660E\u786E\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[Z("name","\u4EBA\u7269\u540D\u79F0","\u4E3B\u89D2\u7684\u540D\u5B57\u3002"),Z("gender_age","\u6027\u522B/\u5E74\u9F84","\u4E3B\u89D2\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),Z("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u4E3B\u89D2\u5916\u8C8C\u7684\u5BA2\u89C2\u6587\u5B57\u63CF\u5199\u3002"),Z("identity","\u804C\u4E1A/\u8EAB\u4EFD","\u4E3B\u89D2\u5728\u793E\u4F1A\u6216\u5267\u60C5\u4E2D\u7684\u4E3B\u8981\u8EAB\u4EFD\u3002"),Z("history","\u8FC7\u5F80\u7ECF\u5386","\u4E3B\u89D2\u80CC\u666F\u6545\u4E8B\u4E0E\u5173\u952E\u7ECF\u5386\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002"),Z("personality","\u6027\u683C\u7279\u70B9","\u5BF9\u4E3B\u89D2\u6838\u5FC3\u6027\u683C\u7684\u6982\u62EC\u3002")]}),zr({id:"default_important_characters",name:"\u91CD\u8981\u89D2\u8272\u8868",note:"\u8BB0\u5F55\u5173\u952E NPC \u6216\u91CD\u8981\u89D2\u8272\u7684\u4FE1\u606F\u548C\u52A8\u6001\u72B6\u6001\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u4E3A\u5F53\u524D\u5728\u573A\u7684\u91CD\u8981\u4EBA\u7269\u5206\u522B\u63D2\u5165\u6761\u76EE\u3002",create:"\u5267\u60C5\u4E2D\u6709\u672A\u8BB0\u5F55\u7684\u91CD\u8981\u4EBA\u7269\u767B\u573A\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u89D2\u8272\u7684\u72B6\u6001\u3001\u5173\u7CFB\u3001\u60F3\u6CD5\u3001\u7ECF\u5386\u6216\u6301\u6709\u7269\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:'\u901A\u5E38\u7981\u6B62\u5220\u9664\uFF1B\u89D2\u8272\u79BB\u573A\u65F6\u4F18\u5148\u66F4\u65B0"\u662F\u5426\u79BB\u573A"\u3002'},columns:[Z("name","\u59D3\u540D","\u89D2\u8272\u59D3\u540D\u3002"),Z("gender_age","\u6027\u522B/\u5E74\u9F84","\u89D2\u8272\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),Z("summary","\u4E00\u53E5\u8BDD\u4ECB\u7ECD","\u7528\u7B80\u77ED\u6587\u5B57\u6982\u62EC\u89D2\u8272\u8EAB\u4EFD\u80CC\u666F\u3002"),Z("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u89D2\u8272\u5916\u8C8C\u548C\u5F53\u524D\u8863\u7740\u7684\u5BA2\u89C2\u63CF\u5199\u3002"),Z("important_items","\u6301\u6709\u7684\u91CD\u8981\u7269\u54C1","\u89D2\u8272\u62E5\u6709\u7684\u5173\u952E\u7269\u54C1\uFF0C\u7528\u5206\u53F7\u5206\u9694\u3002"),Z("offstage","\u662F\u5426\u79BB\u573A",'\u5224\u65AD\u8BE5\u89D2\u8272\u5F53\u524D\u662F\u5426\u5DF2\u7ECF\u79BB\u573A\uFF0C\u586B\u5199"\u662F"\u6216"\u5426"\u3002',"boolean"),Z("history","\u8FC7\u5F80\u7ECF\u5386","\u89D2\u8272\u80CC\u666F\u4E0E\u5173\u952E\u4E8B\u4EF6\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002")]}),zr({id:"default_protagonist_skills",name:"\u4E3B\u89D2\u6280\u80FD\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u83B7\u5F97\u7684\u6280\u80FD\u3001\u80FD\u529B\u6216\u9636\u6BB5\u6027\u6210\u957F\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u6280\u80FD\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u65B0\u6280\u80FD\u6216\u65B0\u80FD\u529B\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u6280\u80FD\u5347\u7EA7\u3001\u964D\u7EA7\u6216\u6548\u679C\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u6280\u80FD\u88AB\u5267\u60C5\u5265\u593A\u3001\u66FF\u6362\u6216\u5931\u6548\u65F6\u5220\u9664\u3002"},columns:[Z("skill_name","\u6280\u80FD\u540D\u79F0","\u6280\u80FD\u6216\u80FD\u529B\u540D\u79F0\u3002"),Z("skill_type","\u6280\u80FD\u7C7B\u578B","\u6280\u80FD\u7C7B\u522B\uFF0C\u4F8B\u5982\u4E3B\u52A8\u3001\u88AB\u52A8\u3001\u5929\u8D4B\u7B49\u3002"),Z("level","\u7B49\u7EA7/\u9636\u6BB5","\u6280\u80FD\u5F53\u524D\u7B49\u7EA7\u3001\u719F\u7EC3\u5EA6\u6216\u9636\u6BB5\u3002"),Z("effect","\u6548\u679C\u63CF\u8FF0","\u6280\u80FD\u5728\u5F53\u524D\u9636\u6BB5\u4E0B\u7684\u5177\u4F53\u6548\u679C\u3002")]}),zr({id:"default_inventory",name:"\u80CC\u5305\u7269\u54C1\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u62E5\u6709\u7684\u7269\u54C1\u3001\u88C5\u5907\u6216\u6D88\u8017\u54C1\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u643A\u5E26\u7269\u54C1\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u80CC\u5305\u4E2D\u6CA1\u6709\u7684\u5168\u65B0\u7269\u54C1\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u7269\u54C1\u6570\u91CF\u3001\u72B6\u6001\u6216\u63CF\u8FF0\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7269\u54C1\u88AB\u5B8C\u5168\u6D88\u8017\u3001\u4E22\u5F03\u6216\u6467\u6BC1\u65F6\u5220\u9664\u3002"},columns:[Z("item_name","\u7269\u54C1\u540D\u79F0","\u7269\u54C1\u540D\u79F0\u3002"),Z("quantity","\u6570\u91CF","\u62E5\u6709\u6570\u91CF\u3002","number"),Z("description","\u63CF\u8FF0/\u6548\u679C","\u7269\u54C1\u529F\u80FD\u3001\u6548\u679C\u6216\u80CC\u666F\u63CF\u8FF0\u3002"),Z("category","\u7C7B\u522B","\u7269\u54C1\u7C7B\u522B\uFF0C\u4F8B\u5982\u6B66\u5668\u3001\u6D88\u8017\u54C1\u3001\u6742\u7269\u7B49\u3002")]}),zr({id:"default_quests_events",name:"\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u6B63\u5728\u8FDB\u884C\u6216\u9700\u8981\u6301\u7EED\u8FFD\u8E2A\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u8981\u4EFB\u52A1\u6216\u5173\u952E\u4E8B\u4EF6\u3002",create:"\u4E3B\u89D2\u63A5\u53D6\u3001\u89E6\u53D1\u6216\u53D1\u73B0\u65B0\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u65F6\u65B0\u589E\u3002",update:"\u4EFB\u52A1\u53D6\u5F97\u5173\u952E\u8FDB\u5C55\u3001\u76EE\u6807\u53D8\u5316\u6216\u65F6\u9650\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u4EFB\u52A1\u5B8C\u6210\u3001\u5931\u8D25\u3001\u8FC7\u671F\u6216\u4E0D\u518D\u9700\u8981\u8FFD\u8E2A\u65F6\u5220\u9664\u3002"},columns:[Z("quest_name","\u4EFB\u52A1\u540D\u79F0","\u4EFB\u52A1\u6216\u4E8B\u4EF6\u6807\u9898\u3002"),Z("quest_type","\u4EFB\u52A1\u7C7B\u578B","\u4E3B\u7EBF\u3001\u652F\u7EBF\u3001\u4E2A\u4EBA\u3001\u7A81\u53D1\u4E8B\u4EF6\u7B49\u3002"),Z("issuer","\u53D1\u5E03\u8005","\u53D1\u5E03\u4EFB\u52A1\u6216\u89E6\u53D1\u4E8B\u4EF6\u7684\u89D2\u8272\u3001\u5730\u70B9\u6216\u52BF\u529B\u3002"),Z("detail","\u8BE6\u7EC6\u63CF\u8FF0","\u4EFB\u52A1\u76EE\u6807\u3001\u4E8B\u4EF6\u80CC\u666F\u548C\u8981\u6C42\u3002"),Z("progress","\u5F53\u524D\u8FDB\u5EA6","\u5BF9\u5B8C\u6210\u5EA6\u6216\u5F53\u524D\u9636\u6BB5\u7684\u7B80\u8981\u63CF\u8FF0\u3002"),Z("deadline","\u4EFB\u52A1\u65F6\u9650","\u5B8C\u6210\u4EFB\u52A1\u7684\u5269\u4F59\u65F6\u95F4\u6216\u622A\u6B62\u6761\u4EF6\u3002"),Z("reward","\u5956\u52B1","\u5B8C\u6210\u540E\u53EF\u80FD\u83B7\u5F97\u7684\u5956\u52B1\u3002"),Z("penalty","\u60E9\u7F5A","\u5931\u8D25\u6216\u9519\u8FC7\u540E\u7684\u540E\u679C\u3002")]}),zr({id:"default_memo_log",name:"\u7EAA\u8981\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u6216\u5173\u952E\u7247\u6BB5\u53D1\u751F\u7684\u4E8B\u4EF6\u7EAA\u8981\uFF0C\u7528\u4E8E\u540E\u7EED\u56DE\u987E\u3002",aiInstructions:{init:"\u6545\u4E8B\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E00\u6761\u8BB0\u5F55\uFF0C\u7528\u4E8E\u8BB0\u5F55\u521D\u59CB\u5316\u5267\u60C5\u3002",create:"\u6BCF\u8F6E\u4EA4\u4E92\u7ED3\u675F\u540E\uFF0C\u82E5\u53D1\u751F\u4E86\u503C\u5F97\u8BB0\u5F55\u7684\u65B0\u4E8B\u4EF6\uFF0C\u5219\u63D2\u5165\u4E00\u6761\u65B0\u7EAA\u8981\u3002",update:"\u901A\u5E38\u7981\u6B62\u66F4\u65B0\u5386\u53F2\u7EAA\u8981\uFF1B\u53EA\u6709\u660E\u663E\u4E8B\u5B9E\u9519\u8BEF\u65F6\u624D\u4FEE\u6B63\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[Z("time_span","\u65F6\u95F4\u8DE8\u5EA6","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u7684\u65F6\u95F4\u8303\u56F4\u3002"),Z("location","\u5730\u70B9","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u5730\u70B9\u3002"),Z("memo","\u7EAA\u8981","\u4EE5\u7B2C\u4E09\u65B9\u89C6\u89D2\u5BA2\u89C2\u8BB0\u5F55\u672C\u8F6E\u53D1\u751F\u7684\u4E8B\u5B9E\u3002"),Z("summary","\u6982\u89C8","\u4E00\u53E5\u8BDD\u6982\u62EC\u7EAA\u8981\u5185\u5BB9\u3002"),Z("index_code","\u7F16\u7801\u7D22\u5F15","\u7528\u4E8E\u540E\u7EED\u68C0\u7D22\u7684\u7B80\u77ED\u7F16\u7801\u3002")]}),zr({id:"default_options",name:"\u9009\u9879\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u4E3B\u89D2\u53EF\u4EE5\u91C7\u53D6\u7684\u884C\u52A8\u9009\u9879\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002\u6240\u6709\u9009\u9879\u4F7F\u7528\u7B2C\u4E09\u4EBA\u79F0\uFF0C\u4E0D\u4EE3\u66FF\u4E3B\u89D2\u53D1\u8A00\uFF0C\u5E76\u7D27\u6263\u5F53\u524D\u5267\u60C5\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u751F\u6210\u56DB\u4E2A\u521D\u59CB\u884C\u52A8\u9009\u9879\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u6BCF\u8F6E\u4EA4\u4E92\u540E\u6839\u636E\u5F53\u524D\u5267\u60C5\u751F\u6210\u65B0\u7684\u56DB\u4E2A\u9009\u9879\u5E76\u8986\u76D6\u539F\u6709\u5185\u5BB9\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[Z("option_1","\u9009\u9879\u4E00","\u504F\u5411\u7B56\u7565\u3001\u63A8\u8FDB\u5267\u60C5\u6216\u89E3\u51B3\u5F53\u524D\u95EE\u9898\u7684\u884C\u52A8\u3002"),Z("option_2","\u9009\u9879\u4E8C","\u504F\u5411\u8C28\u614E\u89C2\u5BDF\u3001\u6536\u96C6\u4FE1\u606F\u6216\u4FDD\u6301\u4E2D\u7ACB\u7684\u884C\u52A8\u3002"),Z("option_3","\u9009\u9879\u4E09","\u504F\u5411\u5E2E\u52A9\u3001\u4FDD\u62A4\u3001\u6C9F\u901A\u6216\u5B89\u629A\u7684\u884C\u52A8\u3002"),Z("option_4","\u9009\u9879\u56DB","\u504F\u5411\u5192\u9669\u3001\u8BD5\u63A2\u3001\u6539\u53D8\u5C40\u52BF\u6216\u5173\u7CFB\u4E92\u52A8\u7684\u884C\u52A8\u3002")]})])});function Bb(t,e=""){return t==null?e:String(t).trim()||e}function Kr(t){if(t==null)return"";if(typeof t=="string")return t;try{return JSON.stringify(t,null,2)}catch{return String(t)}}function Sp(t,e="col"){return Bb(t,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||e}function tn(t,e=new Set){let r=Sp(t,"col"),s=r,o=2;for(;e.has(s);)s=`${r}_${o}`,o+=1;return e.add(s),s}var _p=N(()=>{});function P(t,e=""){return t==null?e:String(t).trim()||e}function rr(t,e=!1){return t==null?e:t===!0}function zb(t){if(!Array.isArray(t)||t.length!==1)return!1;let e=t[0]&&typeof t[0]=="object"?t[0]:null;if(!e)return!1;let r=P(e.name||e.title,""),s=P(e.note||e.description,""),o=Array.isArray(e.columns)?e.columns:[],n=Array.isArray(e.rows)?e.rows:[];if(r&&!["\u88681","\u8868\u683C 1","\u8868\u683C1"].includes(r)||s||o.length!==1||n.length>1)return!1;let a=o[0]&&typeof o[0]=="object"?o[0]:{},i=P(a.key||a.id,""),l=P(a.title||a.name||a.label,"");if(P(a.description||a.note,"")||i&&i!=="col_1"||l&&!["\u52171","col_1"].includes(l))return!1;if(n.length===0)return!0;let d=n[0]&&typeof n[0]=="object"?n[0]:{},u=P(d.name||d.title||d.label,""),y=d.cells&&typeof d.cells=="object"&&!Array.isArray(d.cells)?d.cells:{},p=Array.isArray(d.values)?d.values:[],g=Object.values(y).some(f=>P(f,""))||p.some(f=>P(f,""));return(!u||u==="\u884C1")&&!g}function Kb(t,{seedDefaultWhenMissing:e=!1}={}){return zb(t)?ae(so):Array.isArray(t)?ae(t):t&&typeof t=="object"?Ub(t):e?ae(so):[]}function gl(t=""){let e=[],r=P(t,""),s=/-\s*列\d+\s*[:：]\s*([^\n\-–—]+?)\s*[-–—]\s*([^\n]+)/g,o;for(;o=s.exec(r);)e.push({title:P(o[1],""),description:P(o[2],"")});return e}function Ub(t={}){let e=t&&typeof t=="object"?t:{};return Object.keys(e).filter(s=>s.startsWith("sheet_")&&e[s]&&typeof e[s]=="object").map((s,o)=>({key:s,table:e[s],fallbackOrder:o})).sort((s,o)=>{let n=Number.isFinite(s.table.orderNo)?s.table.orderNo:s.fallbackOrder,a=Number.isFinite(o.table.orderNo)?o.table.orderNo:o.fallbackOrder;return n-a}).map(({key:s,table:o},n)=>{let a=o.sourceData&&typeof o.sourceData=="object"?o.sourceData:{},i=Array.isArray(o.content)?o.content:[],l=Array.isArray(i[0])?i[0]:[],c=gl(a.note),d=new Set,u=l.slice(1).map((p,g)=>{let f=c[g]||{},h=P(p||f.title,`\u5217${g+1}`);return{key:tn(h||`col_${g+1}`,d),title:h,description:P(f.description,""),type:la,required:!1}}),y=i.slice(1).map((p,g)=>{let f=Array.isArray(p)?p:[],h={};return u.forEach((x,T)=>{h[x.key]=Kr(f[T+1])}),{name:P(f[0],`\u884C${g+1}`),cells:h}});return{id:P(o.uid||s,`sheet_${n+1}`),name:P(o.name,`\u8868${n+1}`),note:P(a.note,""),enabled:o.enabled!==!1,aiInstructions:{init:P(a.initNode,""),create:P(a.insertNode,""),update:P(a.updateNode,""),delete:P(a.deleteNode,"")},columns:u,rows:y}})}function jb(t=[]){let e=[],r=0;return t.forEach(s=>{let o=s&&typeof s=="object"?s:{},n=o.cells&&typeof o.cells=="object"&&!Array.isArray(o.cells)?o.cells:null,a=Array.isArray(o.cells)?o.cells:Array.isArray(o.values)?o.values:null;n&&Object.keys(n).forEach(i=>{e.includes(i)||e.push(i)}),a&&a.length>r&&(r=a.length)}),e.length>0?e.map(s=>({key:s,title:String(s)})):r>0?Array.from({length:r},(s,o)=>({key:`col_${o+1}`,title:`\u5217${o+1}`})):[]}function ml(t,e=la){let r=P(t,e);return vp.some(s=>s.value===r)?r:e}function Fb(t={},e=0,r=new Set){let s=t&&typeof t=="object"?t:{},o=P(s.title||s.name||s.label,`\u5217${e+1}`),n=P(s.key||s.id,""),a=tn(n||o||`col_${e+1}`,r),i=[n,P(s.title,""),P(s.name,""),P(s.label,"")].filter(Boolean);return{key:a,title:o,description:P(s.description||s.note,""),type:ml(s.type),required:s.required===!0,sourceKeys:i}}function Wb(t={},e={},r=0){let s=t.cells&&typeof t.cells=="object"&&!Array.isArray(t.cells)?t.cells:null,o=Array.isArray(t.cells)?t.cells:Array.isArray(t.values)?t.values:null;if(s){let n=[...Array.isArray(e.sourceKeys)?e.sourceKeys:[],e.key,e.title].filter(Boolean);for(let a of n)if(s[a]!==void 0)return Kr(s[a])}return o&&o[r]!==void 0?Kr(o[r]):""}function Hb(t={},e=[],r=0){let s=t&&typeof t=="object"?t:{},o={};return e.forEach((n,a)=>{o[n.key]=Wb(s,n,a)}),{id:Xo(s.id||s.rowId,r),name:P(s.name||s.title||s.label,`\u884C${r+1}`),cells:o}}function Yb(t={}){let e=t&&typeof t=="object"?t:{};return{init:P(e.init,""),create:P(e.create,""),update:P(e.update,""),delete:P(e.delete,"")}}function Gb(t={},e=""){let r=t&&typeof t=="object"?t:{},s=P(r.presetId,P(e,""));return{enabled:r.enabled===!0,presetId:s}}function qb(t={},e=""){let r=t&&typeof t=="object"?t:{};return{enabled:rr(r.enabled,!1),entryName:P(r.entryName,e),entryType:r.entryType==="keyword"?"keyword":"constant",splitByRow:rr(r.splitByRow,!1),keywords:P(r.keywords,""),injectionTemplate:P(r.injectionTemplate,""),preventRecursion:rr(r.preventRecursion,!0),entryPlacement:{position:P(r.entryPlacement?.position||r.placement?.position,"before_character_definition"),depth:Number.isFinite(Number(r.entryPlacement?.depth??r.placement?.depth))?Math.floor(Number(r.entryPlacement?.depth??r.placement?.depth)):2,order:Number.isFinite(Number(r.entryPlacement?.order??r.placement?.order))?Math.floor(Number(r.entryPlacement?.order??r.placement?.order)):0}}}function Vb(t={},e=0){let r=t&&typeof t=="object"?t:{},s=new Set,n=(Array.isArray(r.columns)&&r.columns.length>0?r.columns:jb(Array.isArray(r.rows)?r.rows:[])).map((l,c)=>Fb(l,c,s)),a=Array.isArray(r.rows)?r.rows.map((l,c)=>Hb(l,n,c)):[],i=P(r.name||r.title,`\u8868${e+1}`);return{id:Wt(r.id||r.key,e),name:i,note:P(r.note||r.description,""),enabled:r.enabled!==!1,aiInstructions:Yb(r.aiInstructions),exportConfig:qb(r.exportConfig,i),columns:n.map(l=>({key:l.key,title:l.title,description:P(l.description,""),type:ml(l.type),required:l.required===!0})),rows:a}}function Ep(t={}){let e=t&&typeof t=="object"?t:{},r=Array.isArray(e.lastErrorDetails)?e.lastErrorDetails.map(o=>P(o,"")).filter(Boolean):[],s=e.lastValidationSummary&&typeof e.lastValidationSummary=="object"?{errorCount:Number.isFinite(e.lastValidationSummary.errorCount)?e.lastValidationSummary.errorCount:0,warningCount:Number.isFinite(e.lastValidationSummary.warningCount)?e.lastValidationSummary.warningCount:0}:{errorCount:0,warningCount:0};return{lastStatus:P(e.lastStatus,ve.IDLE),lastRunAt:Number.isFinite(e.lastRunAt)?e.lastRunAt:0,lastDurationMs:Number.isFinite(e.lastDurationMs)?e.lastDurationMs:0,lastError:P(e.lastError,""),lastErrorDetails:r,lastValidationSummary:s,successCount:Number.isFinite(e.successCount)?e.successCount:0,errorCount:Number.isFinite(e.errorCount)?e.errorCount:0,lastSourceMessageId:P(e.lastSourceMessageId,""),lastSlotRevisionKey:P(e.lastSlotRevisionKey,""),lastLoadMode:P(e.lastLoadMode,""),lastFillMode:P(e.lastFillMode,""),lastMirrorApplied:e.lastMirrorApplied===!0,lastResolvedFromMessageId:P(e.lastResolvedFromMessageId,""),lastResolvedFromRevisionKey:P(e.lastResolvedFromRevisionKey,""),lastSourceKind:P(e.lastSourceKind,""),lastScopeMode:P(e.lastScopeMode,""),lastAutoRunAt:Number.isFinite(e.lastAutoRunAt)?e.lastAutoRunAt:0,lastAutoStatus:P(e.lastAutoStatus,ve.IDLE),lastAutoMessageId:P(e.lastAutoMessageId,""),lastAutoRevisionKey:P(e.lastAutoRevisionKey,""),lastAutoSkipReason:P(e.lastAutoSkipReason,"")}}function Jb(t={}){let e=t&&typeof t=="object"?t:{};return(Array.isArray(e.tables)?e.tables:[]).map((s,o)=>Vb(s,o))}function Ap(t="",e={},r={}){let s=ml(e?.type),o=String(t??"").trim(),n=P(r?.label,`${P(r?.tableName,"\u8868\u683C")} / ${P(r?.rowName,"\u884C")} / ${P(e?.title||e?.key,"\u5355\u5143\u683C")}`),a=[],i=[];if(e?.required===!0&&!o&&a.push(`${n} \u4E3A\u5FC5\u586B\uFF0C\u5F53\u524D\u4E3A\u7A7A\u3002`),!o)return{valid:a.length===0,errors:a,warnings:i};if(s==="number"&&!Number.isFinite(Number(o))&&a.push(`${n} \u9700\u8981\u586B\u5199\u6570\u5B57\u3002`),s==="boolean"&&!["true","false","1","0","yes","no"].includes(o.toLowerCase())&&a.push(`${n} \u9700\u8981\u586B\u5199\u5E03\u5C14\u503C\uFF08true / false\uFF09\u3002`),s==="date"&&Number.isNaN(Date.parse(o))&&a.push(`${n} \u9700\u8981\u586B\u5199\u53EF\u89E3\u6790\u7684\u65E5\u671F\u3002`),s==="json")try{JSON.parse(o)}catch(l){a.push(`${n} \u9700\u8981\u586B\u5199\u5408\u6CD5 JSON\uFF1A${l?.message||"\u89E3\u6790\u5931\u8D25"}`)}return{valid:a.length===0,errors:a,warnings:i}}function Xb(t={}){let r=Jb(t&&typeof t=="object"?t:{}),s=[];return r.forEach((o,n)=>{let a=P(o?.name,`\u8868${n+1}`),i=Array.isArray(o?.columns)?o.columns:[],l=Array.isArray(o?.rows)?o.rows:[];a||s.push(`\u8868 ${n+1} \u7F3A\u5C11\u540D\u79F0\u3002`),i.length===0&&s.push(`${a} \u81F3\u5C11\u9700\u8981\u4E00\u5217\u3002`);let c=new Set;i.forEach((d,u)=>{let y=P(d?.key,""),p=P(d?.title,`\u5217${u+1}`);if(!y){s.push(`${a} / ${p} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`);return}if(c.has(y)){s.push(`${a} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${y}`);return}c.add(y)}),l.forEach((d,u)=>{let y=P(d?.name,`\u884C${u+1}`),p=d?.cells&&typeof d.cells=="object"&&!Array.isArray(d.cells)?d.cells:{};i.forEach((g,f)=>{let h=P(g?.key,""),x=P(g?.title||h,`\u5217${f+1}`),T=h?Kr(p[h]):"",v=Ap(T,g,{label:`${a} / ${y} / ${x}`,tableName:a,rowName:y});s.push(...v.errors)})})}),{valid:s.length===0,errors:s,tables:r}}function oo({severity:t="error",message:e="",tableIndex:r=-1,tableName:s="",columnIndex:o=-1,columnKey:n="",rowIndex:a=-1,rowName:i="",cellKey:l=""}={}){return{severity:t,message:P(e,t==="warning"?"\u5B58\u5728\u8B66\u544A\u3002":"\u5B58\u5728\u9519\u8BEF\u3002"),tableIndex:r,tableName:P(s,""),columnIndex:o,columnKey:P(n,""),rowIndex:a,rowName:P(i,""),cellKey:P(l,"")}}function ca(t={}){let e=Xb(t),r=[];if(!e.valid)return{...e,warnings:[],issues:r,summary:{errorCount:e.errors.length,warningCount:0}};let s=Array.isArray(e.tables)?e.tables:[];s.forEach((a,i)=>{let l=P(a?.name,`\u8868${i+1}`),c=Array.isArray(a?.columns)?a.columns:[],d=Array.isArray(a?.rows)?a.rows:[],u=new Set;l||r.push(oo({severity:"error",message:`\u8868 ${i+1} \u7F3A\u5C11\u540D\u79F0\u3002`,tableIndex:i,tableName:l})),c.forEach((y,p)=>{let g=P(y?.key,""),f=P(y?.title,`\u5217${p+1}`);g||r.push(oo({severity:"error",message:`${l} / ${f} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`,tableIndex:i,tableName:l,columnIndex:p,columnKey:g,cellKey:g})),g&&(u.has(g)&&r.push(oo({severity:"error",message:`${l} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${g}`,tableIndex:i,tableName:l,columnIndex:p,columnKey:g,cellKey:g})),u.add(g))}),d.forEach((y,p)=>{let g=P(y?.name,`\u884C${p+1}`),f=y?.cells&&typeof y.cells=="object"&&!Array.isArray(y.cells)?y.cells:{};Object.keys(f).forEach(x=>{c.some(T=>P(T?.key,"")===x)||r.push(oo({severity:"warning",message:`${l} / ${g} \u5305\u542B\u672A\u5B9A\u4E49\u5217 ${x}\uFF0C\u4FDD\u5B58\u540E\u4F1A\u88AB\u5FFD\u7565\u3002`,tableIndex:i,tableName:l,rowIndex:p,rowName:g,cellKey:x}))}),c.forEach((x,T)=>{let v=P(x?.key,""),z=P(x?.title||v,`\u5217${T+1}`),M=v?Kr(f[v]):"",S=Ap(M,x,{label:`${l} / ${g} / ${z}`,tableName:l,rowName:g});S.errors.forEach(E=>{r.push(oo({severity:"error",message:E,tableIndex:i,tableName:l,columnIndex:T,columnKey:v,rowIndex:p,rowName:g,cellKey:v}))}),S.warnings.forEach(E=>{r.push(oo({severity:"warning",message:E,tableIndex:i,tableName:l,columnIndex:T,columnKey:v,rowIndex:p,rowName:g,cellKey:v}))})})})});let o=r.filter(a=>a.severity!=="warning").map(a=>a.message),n=r.filter(a=>a.severity==="warning").map(a=>a.message);return{valid:o.length===0,errors:o,warnings:n,issues:r,tables:s,summary:{errorCount:o.length,warningCount:n.length}}}function Cp(){return{tables:ae(so),promptTemplate:ul,apiPreset:"",promptPreset:"",bypass:{enabled:!1,presetId:""},activeTemplate:ut,autoUpdateEnabled:!1,autoUpdateTrigger:"assistantMessage",runScope:dt.ENABLED,scope:{mode:dt.ENABLED,selectedTableIds:[],activeTableId:""},fillMode:ia.INCREMENTAL,contextDepth:8,contextRoles:"all",contextExtractTags:[],contextUseGlobalRules:!1,worldbooks:{enabled:!1,selected:[]},sendLatestRows:-1,mirrorToMessage:!1,mirrorTag:"yyt-table-workbench",worldbookSync:{enabled:!1,targetBook:"",entryComment:"YYT-\u586B\u8868\u6570\u636E"},wrapperConfig:{enabled:!0,wrapperTag:"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",wrapperHint:"\u4EE5\u4E0B\u662F\u5728\u8FD9\u4E2A\u65F6\u95F4\u70B9\uFF0C\u5F53\u524D\u573A\u666F\u4E0B\u5267\u60C5\u76F8\u5173\u7684\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55\uFF0C\u4F60\u5728\u8FDB\u884C\u5267\u60C5\u5206\u6790\u65F6\u5FC5\u987B\u4EE5\u6B64\u6700\u65B0\u7684\u6570\u636E\u4E3A\u51C6\uFF0C\u4EE5\u4E0B\u6570\u636E\u4E0E\u8BB0\u5F55\u7684\u4F18\u5148\u7EA7\u9AD8\u4E8E\u5176\u4ED6\u4EFB\u4F55\u80CC\u666F\u8BBE\u5B9A\uFF1A",wrapperPlacement:{position:"before_character_definition",depth:2,order:0}},tableEnabledOverrides:{},runtime:Ep()}}function $t(t={}){let e=Cp(),r=t&&typeof t=="object"?t:{},s=r.bypass?r.bypass:r.bypassPresetId?{presetId:r.bypassPresetId,enabled:!!r.bypassPresetId}:void 0,o=Gb(s,r.promptPreset),n=Kb(r.tables,{seedDefaultWhenMissing:!Object.prototype.hasOwnProperty.call(r,"tables")}),a=r.scope&&typeof r.scope=="object"?r.scope:{},i=typeof r.runScope=="string"&&r.runScope?{...a,mode:r.runScope}:a,l=en(i,{mode:r.runScope,selectedTableIds:r.selectedTableIds,activeTableId:r.activeTableId}),c=rr(r.autoUpdateEnabled!==void 0?r.autoUpdateEnabled:r.automation?.enabled,e.autoUpdateEnabled);return{tables:n,promptTemplate:P(r.promptTemplate,e.promptTemplate),apiPreset:P(r.apiPreset,""),promptPreset:o.presetId,bypass:o,activeTemplate:P(r.activeTemplate,e.activeTemplate),autoUpdateEnabled:c,autoUpdateTrigger:P(r.autoUpdateTrigger,e.autoUpdateTrigger),runScope:l.mode,scope:l,fillMode:r.fillMode===ia.FULL?ia.FULL:e.fillMode,contextDepth:Number.isFinite(Number(r.contextDepth))&&Number(r.contextDepth)>0?Math.floor(Number(r.contextDepth)):e.contextDepth,contextRoles:r.contextRoles==="assistant_only"?"assistant_only":"all",contextExtractTags:Array.isArray(r.contextExtractTags)?r.contextExtractTags.filter(d=>typeof d=="string"&&d.trim()):typeof r.contextExtractTags=="string"&&r.contextExtractTags.trim()?r.contextExtractTags.split(`
`).map(d=>d.trim()).filter(Boolean):[],contextUseGlobalRules:rr(r.contextUseGlobalRules??r.contextUseExtractRules??r.contextUseExcludeRules,!1),extraction:{regexPresetId:P(r.extraction?.regexPresetId,"")},worldbooks:{enabled:rr(r.worldbooks?.enabled,!1),selected:Array.isArray(r.worldbooks?.selected)?r.worldbooks.selected.filter(d=>typeof d=="string"&&d.trim()):[],presetId:P(r.worldbooks?.presetId,"")},sendLatestRows:Number.isFinite(Number(r.sendLatestRows))?Math.floor(Number(r.sendLatestRows)):-1,mirrorToMessage:rr(r.mirrorToMessage,e.mirrorToMessage),mirrorTag:P(r.mirrorTag,e.mirrorTag),worldbookSync:{enabled:rr(r.worldbookSync?.enabled,!1),targetBook:P(r.worldbookSync?.targetBook,""),entryComment:P(r.worldbookSync?.entryComment,e.worldbookSync.entryComment),wrapperConfig:r.worldbookSync?.wrapperConfig?{enabled:rr(r.worldbookSync.wrapperConfig?.enabled,!0),wrapperTag:P(r.worldbookSync.wrapperConfig?.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:P(r.worldbookSync.wrapperConfig?.wrapperHint,""),wrapperPlacement:{position:P(r.worldbookSync.wrapperConfig?.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.depth))?Math.floor(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.order))?Math.floor(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}}:void 0},wrapperConfig:{enabled:rr(r.wrapperConfig?.enabled,e.wrapperConfig.enabled),wrapperTag:P(r.wrapperConfig?.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:P(r.wrapperConfig?.wrapperHint,e.wrapperConfig.wrapperHint),wrapperPlacement:{position:P(r.wrapperConfig?.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(r.wrapperConfig?.wrapperPlacement?.depth))?Math.floor(Number(r.wrapperConfig?.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(r.wrapperConfig?.wrapperPlacement?.order))?Math.floor(Number(r.wrapperConfig?.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}},tableEnabledOverrides:r.tableEnabledOverrides&&typeof r.tableEnabledOverrides=="object"&&!Array.isArray(r.tableEnabledOverrides)?Object.fromEntries(Object.entries(r.tableEnabledOverrides).filter(([d,u])=>typeof d=="string"&&d&&typeof u=="boolean")):{},runtime:Ep({...e.runtime,...r.runtime||{}})}}function hl(t={}){let e=$t(t),r=[];return Array.isArray(e.tables)||r.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u662F JSON \u6570\u7EC4\u3002"),e.promptTemplate||r.push("\u586B\u8868 Prompt \u4E0D\u80FD\u4E3A\u7A7A\u3002"),e.mirrorTag||r.push("\u6B63\u6587\u955C\u50CF\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A\u3002"),{valid:r.length===0,errors:r,config:e}}function Le(){let t=yl.get(fl,Cp()),e=$t(t),r=dl();return{...bp(e,r),guide:r}}function Qb(t){let r=(Array.isArray(t?.tables)?t.tables:[]).map(s=>({...s,rows:[]}));return{...t,tables:r}}function ft(t={}){let e=Le(),r=$t({...e,...t||{},runtime:t?.runtime===void 0?e.runtime:t.runtime}),s=hl(r);if(!s.valid)return{success:!1,error:s.errors.join(`
`),errors:s.errors,config:s.config};let o=Qb(s.config);return yl.set(fl,o),hp({templateId:s.config.activeTemplate,scope:s.config.scope,worldbookSync:s.config.worldbookSync}),{success:!0,config:s.config}}function kp(t={}){let e=Le(),r=$t({...e,runtime:{...e.runtime,...t||{}}});return yl.set(fl,r),r.runtime}function Zb(t={},e={}){let r=$t(t),s=P(r.promptTemplate,ul);return e.skipResponseContract?s.trim():`${s}

${wp}`.trim()}function Ip(t={},e={}){let r=$t(t);return{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",promptTemplate:Zb(r,e),bypass:{enabled:r.bypass?.enabled===!0,presetId:r.bypass?.presetId||r.promptPreset||""}}}var yl,fl,br=N(()=>{Be();je();no();aa();xp();Tp();_p();yl=D.namespace("tableWorkbench"),fl="config"});function xl(){return bl||(bl=I.createScope("TableIsolation")),bl}var Mp,Rp,bl,wl,Ie,vs=N(()=>{Be();W();je();Mp="tableEngine.isolation",Rp=Object.freeze({enabled:!1,key:Dt});wl=class{constructor(){this._cache=null,this._subscribers=new Set}getState(){if(this._cache)return this._cache;let e=D.get(Mp,null);return this._cache=this._normalize(e),this._cache}isEnabled(){return this.getState().enabled===!0}getKey(){let e=this.getState();return e.enabled?e.key||Dt:Dt}getConfiguredKey(){return this.getState().key}setEnabled(e){let r=this._normalize({...this.getState(),enabled:!!e});this._commit(r,{reason:"enabled"})}setKey(e){let r=this._normalize({...this.getState(),key:e});this._commit(r,{reason:"key"})}updateState(e={}){let r=this.getState(),s=this._normalize({enabled:e.enabled!==void 0?!!e.enabled:r.enabled,key:e.key!==void 0?e.key:r.key});this._commit(s,{reason:"patch"})}reset(){this._commit({...Rp},{reason:"reset"})}getScopeKey(e){return Zo(e,this.getKey())}subscribe(e){return typeof e!="function"?()=>{}:(this._subscribers.add(e),()=>this._subscribers.delete(e))}_normalize(e){return!e||typeof e!="object"?{...Rp}:{enabled:e.enabled===!0,key:Ae(e.key)}}_commit(e,r={}){let s=this.getState();if(s.enabled===e.enabled&&s.key===e.key)return;this._cache=e;try{D.set(Mp,e)}catch(n){xl().error("isolation \u72B6\u6001\u843D\u76D8\u5931\u8D25",n)}xl().info("isolation \u72B6\u6001\u53D8\u5316",{prev:s,next:e,reason:r.reason||""});let o={...e,prev:s,reason:r.reason||""};for(let n of this._subscribers)try{n(o)}catch(a){xl().error("isolation \u8BA2\u9605\u8005\u56DE\u8C03\u5F02\u5E38",a)}}},Ie=new wl});var Pp={};se(Pp,{AuthorityProvider:()=>da,default:()=>tx});var ao,vl,ex,jr,da,tx,Np=N(()=>{W();lo();ao=I.createScope("AuthorityProvider"),vl="third-party/youyou-toolkit",ex="YouYou Toolkit",jr="main",da=class{constructor({extensionVersion:e="1.0.149"}={}){this.kind=io.AUTHORITY,this._client=null,this._extensionVersion=e,this._initialized=!1}async init(){let e=ua();if(!e)return ao.error("\u672A\u68C0\u6D4B\u5230 window.STAuthority.AuthoritySDK"),!1;try{return this._client=await e.init({extensionId:vl,displayName:ex,version:this._extensionVersion,installType:"local",declaredPermissions:{sql:{private:!0}}}),this._initialized=!0,ao.info("AuthorityProvider \u521D\u59CB\u5316\u6210\u529F",{extensionId:vl}),!0}catch(r){return ao.error("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25",{error:r?.message||r}),this._initialized=!1,!1}}async dispose(){this._client=null,this._initialized=!1}async migrate({migrations:e,database:r=jr,tableName:s}={}){this._ensureReady();let o={database:r,migrations:e};s&&(o.tableName=s);let n=await this._client.sql.migrate(o);return{applied:n?.applied||[],skipped:n?.skipped||[],tableName:n?.tableName,latestId:n?.latestId}}async query({statement:e,params:r=[],database:s=jr,page:o=void 0}={}){this._ensureReady();let n={database:s,statement:e,params:r};o&&(n.page=o);let a=await this._client.sql.query(n);return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0),page:a.page}}async execute({statement:e,params:r=[],database:s=jr}={}){this._ensureReady();let o=await this._client.sql.exec({database:s,statement:e,params:r});return{rowsAffected:o.rowsAffected??0,lastInsertRowid:o.lastInsertRowid??null}}async batch({statements:e,database:r=jr}={}){this._ensureReady();let s=(e||[]).map(n=>({mode:n.mode||(/^\s*SELECT/i.test(n.statement)?"query":"exec"),statement:n.statement,params:n.params||[]}));return{results:(await this._client.sql.batch({database:r,statements:s}))?.results||[]}}async transaction({statements:e,database:r=jr}={}){this._ensureReady();let s=(e||[]).map(n=>({mode:n.mode||(/^\s*SELECT/i.test(n.statement)?"query":"exec"),statement:n.statement,params:n.params||[]})),o=await this._client.sql.transaction({database:r,statements:s});return{committed:!!o?.committed,results:o?.results||[]}}async paginate({statement:e,params:r=[],database:s=jr,page:o={}}={}){return this._ensureReady(),this.query({statement:e,params:r,database:s,page:o})}async pageAll({statement:e,params:r=[],database:s=jr,pageSize:o=200,maxPages:n}={}){this._ensureReady();let a=await this._client.sql.pageAll({database:s,statement:e,params:r},{pageSize:o,maxPages:n});return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0)}}async backup(){return ao.warn("backup() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5907\u4EFD"),{kind:"authority",timestamp:Date.now()}}async export(){return ao.warn("export() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u51FA"),{kind:"authority",timestamp:Date.now()}}async import(){ao.warn("import() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u5165")}describe(){return{kind:this.kind,initialized:this._initialized,extensionId:vl,database:jr,hasClient:!!this._client}}_ensureReady(){if(!this._initialized||!this._client)throw new Error("AuthorityProvider \u5C1A\u672A\u521D\u59CB\u5316")}},tx=da});var $p={};se($p,{FallbackProvider:()=>pa,default:()=>cx});function rx(t){let e=[],r=0,s="";for(let o of t)o==="("?r+=1:o===")"&&(r-=1),o===","&&r===0?(s.trim()&&e.push(s),s=""):s+=o;return s.trim()&&e.push(s),e}function sx(t){let e=t.match(/^\s*CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(([\s\S]+)\)\s*$/i);if(!e)return null;let r=e[1],s=e[2],o=rx(s),n=[],a=[];for(let i of o){let l=i.trim(),c=l.match(/^PRIMARY\s+KEY\s*\(([^)]+)\)$/i);if(c){a=c[1].split(",").map(u=>u.trim());continue}let d=l.match(/^(\w+)\s+(\w+)/);d&&(n.push({name:d[1],type:d[2].toUpperCase(),raw:l}),/PRIMARY\s+KEY/i.test(l)&&!a.length&&(a=[d[1]]))}return{name:r,columns:n,pkCols:a}}function ox(t){let e=t.match(/^\s*INSERT\s+(?:OR\s+REPLACE\s+)?INTO\s+(\w+)(?:\s*\(([^)]+)\))?\s+VALUES\s*\(([^)]+)\)\s*$/i);if(!e)return null;let r=e[1],s=e[2]?e[2].split(",").map(n=>n.trim()):null,o=(e[3].match(/\?/g)||[]).length;return{name:r,cols:s,paramCount:o}}function _l(t){let e=t.split(/\s+AND\s+/i),r=[];for(let s of e){let o=s.match(/^\s*(\w+)\s*(=|!=|<>|>=|<=|>|<)\s*\?\s*$/);if(o){let a=o[2]==="<>"?"!=":o[2];r.push({col:o[1],op:a,placeholder:!0});continue}let n=s.match(/^\s*(\w+)\s+IS\s+(NOT\s+)?NULL\s*$/i);if(n){r.push({col:n[1],op:n[2]?"IS NOT NULL":"IS NULL",placeholder:!1});continue}throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 WHERE \u5B50\u53E5: "${s}"`)}return r}function nx(t){let e=t.match(/^\s*SELECT\s+([\s\S]+?)\s+FROM\s+(\w+)([\s\S]*)$/i);if(!e)return null;let r=e[1].trim(),s=e[2],o=e[3],n=o.match(/\bWHERE\s+([\s\S]+?)(?=\bORDER\s+BY\b|\bLIMIT\b|\bOFFSET\b|$)/i),a=o.match(/\bORDER\s+BY\s+(\w+)\s*(ASC|DESC)?/i),i=o.match(/\bLIMIT\s+(\d+)/i),l=o.match(/\bOFFSET\s+(\d+)/i);return{name:s,cols:r==="*"?null:r.split(",").map(c=>c.trim()),where:n?_l(n[1].trim()):null,orderBy:a?{col:a[1],dir:(a[2]||"ASC").toUpperCase()}:null,limit:i?parseInt(i[1],10):null,offset:l?parseInt(l[1],10):null}}function ax(t){let e=t.match(/^\s*UPDATE\s+(\w+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);if(!e)return null;let r=e[1],s=e[2],o=e[3],n=s.split(",").map(a=>{let i=a.trim().match(/^(\w+)\s*=\s*\?$/);if(!i)throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 SET \u5B50\u53E5: "${a}"`);return i[1]});return{name:r,setCols:n,where:o?_l(o.trim()):null}}function ix(t){let e=t.match(/^\s*DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);return e?{name:e[1],where:e[2]?_l(e[2].trim()):null}:null}function Sl(t,e){return t===e?!0:t==null?e==null:e==null?!1:typeof t=="number"||typeof e=="number"?Number(t)===Number(e):String(t)===String(e)}function rn(t,e){return t===e?0:t==null?-1:e==null?1:typeof t=="number"&&typeof e=="number"?t-e:String(t)<String(e)?-1:1}function lx(t,e,r){let s=t[e.col];if(e.op==="IS NULL")return s==null;if(e.op==="IS NOT NULL")return s!=null;let o=r.shift();switch(e.op){case"=":return Sl(s,o);case"!=":return!Sl(s,o);case">":return rn(s,o)>0;case"<":return rn(s,o)<0;case">=":return rn(s,o)>=0;case"<=":return rn(s,o)<=0;default:return!1}}function Tl(t,e,r){if(!e||!e.length)return!0;let s=Array.isArray(r)?[...r]:[];for(let o of e)if(!lx(t,o,s))return!1;return!0}var co,Dp,pa,cx,Lp=N(()=>{W();Be();lo();co=I.createScope("FallbackProvider"),Dp="provider_fallback_v1";pa=class{constructor(){this.kind=io.FALLBACK,this._tables=new Map,this._migrations=new Set,this._initialized=!1,this._dirty=!1,this._saveTimer=null}async init(){try{let e=be.get(Dp)||{};this._migrations=new Set(Array.isArray(e.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,s]of Object.entries(e.tables||{}))this._tables.set(r,{schema:s.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(s.rows)?s.rows:[]});return this._initialized=!0,co.info("FallbackProvider \u521D\u59CB\u5316\u5B8C\u6210",{tables:this._tables.size,migrations:this._migrations.size}),!0}catch(e){return co.error("FallbackProvider \u521D\u59CB\u5316\u5931\u8D25",{error:e?.message||e}),this._initialized=!1,!1}}async dispose(){this._flushSave(!0),this._tables.clear(),this._migrations.clear(),this._initialized=!1}async migrate({migrations:e}={}){this._ensureReady();let r=[],s=[];for(let o of e||[]){if(!o?.id||!o?.statement)continue;if(this._migrations.has(o.id)){s.push(o.id);continue}let n=o.statement.trim();if(/^CREATE\s+TABLE/i.test(n)){let a=sx(n);if(!a)throw new Error(`\u65E0\u6CD5\u89E3\u6790 CREATE TABLE: ${n}`);this._tables.has(a.name)||this._tables.set(a.name,{schema:a,rows:[]})}else if(!/^CREATE\s+(UNIQUE\s+)?INDEX/i.test(n))if(/^DROP\s+TABLE/i.test(n)){let a=n.match(/^DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?(\w+)/i);a&&this._tables.delete(a[1])}else/^ALTER\s+TABLE/i.test(n)?co.warn("FallbackProvider \u4E0D\u652F\u6301 ALTER TABLE\uFF0C\u8DF3\u8FC7",{id:o.id}):co.warn("FallbackProvider \u8DF3\u8FC7\u672A\u8BC6\u522B DDL",{id:o.id,statement:n});this._migrations.add(o.id),r.push(o.id)}return this._markDirty(),{applied:r,skipped:s}}async query({statement:e,params:r=[]}={}){this._ensureReady();let s=nx(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 SELECT: ${e}`);let o=this._tables.get(s.name);if(!o)return{columns:s.cols||[],rows:[],rowCount:0};let n=o.rows.filter(l=>Tl(l,s.where,r));if(s.orderBy){let l=s.orderBy.dir==="DESC"?-1:1;n=[...n].sort((c,d)=>rn(c[s.orderBy.col],d[s.orderBy.col])*l)}s.offset&&(n=n.slice(s.offset)),Number.isFinite(s.limit)&&(n=n.slice(0,s.limit));let a,i=n;return s.cols?(i=n.map(l=>{let c={};for(let d of s.cols)c[d]=l[d]===void 0?null:l[d];return c}),a=s.cols):a=o.schema?.columns?.map(l=>l.name)||(i[0]?Object.keys(i[0]):[]),{columns:a,rows:i,rowCount:i.length}}async execute({statement:e,params:r=[]}={}){this._ensureReady();let s=String(e||"").trim(),o=s.split(/\s+/)[0].toUpperCase(),n;if(o==="INSERT")n=this._doInsert(s,r);else if(o==="UPDATE")n=this._doUpdate(s,r);else if(o==="DELETE")n=this._doDelete(s,r);else throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 execute \u8BED\u53E5: ${e}`);return n}_doInsert(e,r){let s=ox(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 INSERT: ${e}`);let o=this._tables.get(s.name);if(!o)throw new Error(`\u8868\u4E0D\u5B58\u5728: ${s.name}`);let n=s.cols||(o.schema.columns||[]).map(c=>c.name);if(!n.length)throw new Error(`\u8868 ${s.name} \u65E0\u5217\u5B9A\u4E49`);if(r.length!==n.length)throw new Error(`INSERT \u53C2\u6570\u6570\u91CF\u4E0D\u5339\u914D (\u671F\u671B ${n.length}, \u5B9E\u9645 ${r.length})`);let a={};for(let c=0;c<n.length;c+=1)a[n[c]]=r[c];let i=o.schema?.pkCols||[],l=/^INSERT\s+OR\s+REPLACE/i.test(e);if(i.length){let c=o.rows.findIndex(d=>i.every(u=>Sl(d[u],a[u])));if(c>=0){if(l)return o.rows[c]=a,this._markDirty(),{rowsAffected:1,lastInsertRowid:c+1};throw new Error(`PRIMARY KEY \u51B2\u7A81 (${i.join(",")})`)}}return o.rows.push(a),this._markDirty(),{rowsAffected:1,lastInsertRowid:o.rows.length}}_doUpdate(e,r){let s=ax(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 UPDATE: ${e}`);let o=this._tables.get(s.name);if(!o)return{rowsAffected:0,lastInsertRowid:null};let n=s.setCols.length;if(r.length<n)throw new Error(`UPDATE \u53C2\u6570\u4E0D\u8DB3 (SET \u9700\u8981 ${n}, \u5B9E\u9645 ${r.length})`);let a=r.slice(0,n),i=r.slice(n),l=0;for(let c of o.rows)if(Tl(c,s.where,i)){for(let d=0;d<n;d+=1)c[s.setCols[d]]=a[d];l+=1}return l>0&&this._markDirty(),{rowsAffected:l,lastInsertRowid:null}}_doDelete(e,r){let s=ix(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 DELETE: ${e}`);let o=this._tables.get(s.name);if(!o)return{rowsAffected:0,lastInsertRowid:null};let n=o.rows.length;o.rows=o.rows.filter(i=>!Tl(i,s.where,r));let a=n-o.rows.length;return a>0&&this._markDirty(),{rowsAffected:a,lastInsertRowid:null}}async batch({statements:e}={}){this._ensureReady();let r=[];for(let s of e||[])if(String(s.statement||"").trim().split(/\s+/)[0].toUpperCase()==="SELECT"){let n=await this.query(s);r.push({kind:"query",...n})}else{let n=await this.execute(s);r.push({kind:"exec",...n})}return{results:r}}async transaction({statements:e}={}){this._ensureReady();let r=this._snapshot();try{let{results:s}=await this.batch({statements:e});return this._flushSave(!0),{committed:!0,results:s}}catch(s){throw this._restore(r),co.warn("FallbackProvider \u4E8B\u52A1\u56DE\u6EDA",{error:s?.message||s}),s}}async paginate({statement:e,params:r=[],page:s={}}={}){this._ensureReady();let o=Number.isFinite(s?.limit)?s.limit:50,n=Number.isFinite(s?.offset)?s.offset:0,a=`${e} LIMIT ${o} OFFSET ${n}`;return this.query({statement:a,params:r})}async backup(){return this._ensureReady(),this._snapshot()}async export(){return this.backup()}async import(e){this._ensureReady(),this._restore(e||{}),this._markDirty(),this._flushSave(!0)}describe(){return{kind:this.kind,initialized:this._initialized,tables:this._tables.size,migrations:this._migrations.size,tableNames:[...this._tables.keys()]}}_snapshot(){let e={};for(let[r,s]of this._tables)e[r]={schema:s.schema,rows:JSON.parse(JSON.stringify(s.rows))};return{migrations:[...this._migrations],tables:e}}_restore(e){this._migrations=new Set(Array.isArray(e?.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,s]of Object.entries(e?.tables||{}))this._tables.set(r,{schema:s.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(s.rows)?s.rows:[]})}_markDirty(){this._dirty=!0,this._saveTimer&&clearTimeout(this._saveTimer),this._saveTimer=setTimeout(()=>this._flushSave(!1),300)}_flushSave(e){if(this._saveTimer&&(clearTimeout(this._saveTimer),this._saveTimer=null),!(!this._dirty&&!e))try{be.set(Dp,this._snapshot()),this._dirty=!1}catch(r){co.error("FallbackProvider \u6301\u4E45\u5316\u5931\u8D25",{error:r?.message||r})}}_ensureReady(){if(!this._initialized)throw new Error("FallbackProvider \u5C1A\u672A\u521D\u59CB\u5316")}},cx=pa});var Op={};se(Op,{PROVIDER_KIND:()=>io,createProvider:()=>dx,detectAuthoritySdk:()=>ua,disposeToolDataProvider:()=>ux,getCurrentProvider:()=>uo,getToolDataProvider:()=>on});function ua(){if(typeof window>"u")return null;try{let t=window.STAuthority?.AuthoritySDK;if(t)return t}catch{}try{if(window.parent&&window.parent!==window){let t=window.parent.STAuthority?.AuthoritySDK;if(t)return t}}catch{}return null}async function Al({preferAuthority:t=!0,extensionVersion:e="1.0.149"}={}){if(t&&ua()){let{AuthorityProvider:s}=await Promise.resolve().then(()=>(Np(),Pp));return new s({extensionVersion:e})}let{FallbackProvider:r}=await Promise.resolve().then(()=>(Lp(),$p));return new r}async function on(t={}){return Ts||sn||(sn=(async()=>{let e=await Al({preferAuthority:!0,...t}),r=await e.init();if(!r&&e.kind===io.AUTHORITY){El.warn("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 FallbackProvider");try{await e.dispose()}catch{}e=await Al({preferAuthority:!1}),r=await e.init()}return r?El.info(`Provider \u521D\u59CB\u5316\u5B8C\u6210: kind=${e.kind}`):El.error(`Provider \u5168\u90E8\u521D\u59CB\u5316\u5931\u8D25 (kind=${e.kind})`),Ts=e,e})(),sn)}function uo(){return Ts}async function dx(t={}){let e=await Al(t);return await e.init(),e}async function ux(){if(Ts){try{await Ts.dispose()}catch{}Ts=null}sn=null}var El,io,Ts,sn,lo=N(()=>{W();El=I.createScope("ToolDataProvider"),io=Object.freeze({AUTHORITY:"authority",FALLBACK:"fallback"}),Ts=null,sn=null});var Qp={};se(Qp,{clearChatScopeConfig:()=>Xp,clearLockEntry:()=>Yp,clearScopeLocks:()=>qp,clearSheetLocks:()=>Gp,clearSlot:()=>Fp,commitSlotTables:()=>ma,default:()=>yx,deleteRowsBySheet:()=>Up,deleteSheetsBySlot:()=>ga,ensureTableDataReady:()=>ze,getChatScopeConfig:()=>Vp,getCurrentTableDataProvider:()=>zp,getLocksForSheet:()=>Wp,getRowsBySheet:()=>Pl,getSheetsBySlot:()=>Ml,loadSlotTables:()=>jp,setChatScopeConfig:()=>Jp,setLockEntry:()=>Hp,upsertSheetMeta:()=>Il,upsertSheetRows:()=>Rl});function kl(){return Cl||(Cl=I.createScope("TableDataService")),Cl}async function ze(){return Bp?uo():nn||(nn=(async()=>{try{let t=await on();if(!t)return kl().error("Provider \u4E0D\u53EF\u7528\uFF0C\u8DF3\u8FC7 migration"),null;let e=await t.migrate({migrations:[...px]});return Bp=!0,kl().info("\u8868\u683C\u6570\u636E migration \u5B8C\u6210",{kind:t.kind,applied:e?.applied?.length||0,skipped:e?.skipped?.length||0}),t}catch(t){return kl().error("table-data-service migration \u5931\u8D25",t),null}finally{nn=null}})(),nn)}function zp(){return uo()}function Kp(){return Date.now()}function ya(t){try{return JSON.stringify(t)}catch{return"{}"}}function fa(t,e=null){if(typeof t!="string")return e;try{return JSON.parse(t)}catch{return e}}function Fr(t={}){return{chatId:String(t.chatId??"").trim(),messageId:String(t.messageId??"").trim(),swipeId:String(t.swipeId??"0").trim()||"0",isolationKey:Ae(t.isolationKey)}}function Wr(t){return t&&t.chatId&&t.messageId}async function Il(t,e){let r=await ze();if(!r)return!1;let s=Fr(t);return!Wr(s)||!e?.uid?!1:(await r.execute({statement:`INSERT INTO table_sheets
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, name, columns_json, meta_json, order_no, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e.uid),String(e.name??e.uid),ya(Array.isArray(e.columns)?e.columns:[]),ya(e.meta||e.sourceData||{}),Number.isFinite(e.orderNo)?e.orderNo:0,Kp()]}),!0)}async function Ml(t){let e=await ze();if(!e)return[];let r=Fr(t);return Wr(r)?((await e.query({statement:`SELECT * FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?
      ORDER BY order_no ASC`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rows||[]).map(o=>({uid:o.sheet_uid,name:o.name,columns:fa(o.columns_json,[]),meta:fa(o.meta_json,{}),orderNo:o.order_no||0,updatedAt:o.updated_at||0})):[]}async function ga(t){let e=await ze();if(!e)return 0;let r=Fr(t);return Wr(r)&&(await e.execute({statement:`DELETE FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rowsAffected||0}async function Rl(t,e,r){let s=await ze();if(!s)return!1;let o=Fr(t);if(!Wr(o)||!e||!Array.isArray(r))return!1;if(await s.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[o.chatId,o.messageId,o.swipeId,o.isolationKey,String(e)]}),r.length===0)return!0;let n=r.map((a,i)=>({statement:`INSERT INTO table_rows
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, row_index, row_id, row_name, cells_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[o.chatId,o.messageId,o.swipeId,o.isolationKey,String(e),i,String(a?.id??""),String(a?.name??""),ya(a?.cells||{})]}));return typeof s.transaction=="function"?await s.transaction({statements:n}):await s.batch({statements:n}),!0}async function Pl(t,e){let r=await ze();if(!r)return[];let s=Fr(t);return!Wr(s)||!e?[]:((await r.query({statement:`SELECT * FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?
      ORDER BY row_index ASC`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e)]}))?.rows||[]).map(n=>({id:n.row_id||"",name:n.row_name||"",cells:fa(n.cells_json,{}),rowIndex:n.row_index}))}async function Up(t,e){let r=await ze();if(!r)return 0;let s=Fr(t);return!Wr(s)||!e?0:(await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e)]}))?.rowsAffected||0}async function jp(t){let e=await Ml(t);if(e.length===0)return[];let r=[];for(let s of e){let o=await Pl(t,s.uid);r.push({id:s.uid,uid:s.uid,name:s.name,columns:s.columns,rows:o,meta:s.meta,orderNo:s.orderNo,updatedAt:s.updatedAt})}return r}async function ma(t,e){let r=await ze();if(!r)return!1;let s=Fr(t);if(!Wr(s)||!Array.isArray(e))return!1;await ga(s),await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey]});for(let o=0;o<e.length;o++){let n=e[o],a=String(n?.uid||n?.id||`sheet_${o+1}`);await Il(s,{uid:a,name:n?.name||a,columns:n?.columns||[],meta:n?.meta||{},orderNo:Number.isFinite(n?.orderNo)?n.orderNo:o}),await Rl(s,a,Array.isArray(n?.rows)?n.rows:[])}return!0}async function Fp(t){let e=await ze();if(!e)return!1;let r=Fr(t);return Wr(r)?(await ga(r),await e.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}),!0):!1}async function Wp(t,e){let r=await ze();if(!r)return[];let s=String(t?.chatId??"").trim(),o=Ae(t?.isolationKey);return!s||!e?[]:((await r.query({statement:`SELECT lock_type, target FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s,o,String(e)]}))?.rows||[]).map(a=>({lockType:a.lock_type,target:a.target||""}))}async function Hp(t,e,r,s=""){let o=await ze();if(!o)return!1;let n=String(t?.chatId??"").trim(),a=Ae(t?.isolationKey);return!n||!e||!r?!1:(await o.execute({statement:"INSERT INTO table_locks (chat_id, isolation_key, sheet_uid, lock_type, target) VALUES (?, ?, ?, ?, ?)",params:[n,a,String(e),String(r),String(s)]}),!0)}async function Yp(t,e,r,s=""){let o=await ze();if(!o)return!1;let n=String(t?.chatId??"").trim(),a=Ae(t?.isolationKey);return!n||!e||!r?!1:(await o.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ? AND lock_type = ? AND target = ?`,params:[n,a,String(e),String(r),String(s)]}),!0)}async function Gp(t,e){let r=await ze();if(!r)return!1;let s=String(t?.chatId??"").trim(),o=Ae(t?.isolationKey);return!s||!e?!1:(await r.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s,o,String(e)]}),!0)}async function qp(t){let e=await ze();if(!e)return!1;let r=String(t?.chatId??"").trim(),s=Ae(t?.isolationKey);return r?(await e.execute({statement:"DELETE FROM table_locks WHERE chat_id = ? AND isolation_key = ?",params:[r,s]}),!0):!1}async function Vp(t){let e=await ze();if(!e)return null;let r=String(t??"").trim();if(!r)return null;let o=(await e.query({statement:"SELECT scoped_config_json FROM table_chat_scope WHERE chat_id = ?",params:[r]}))?.rows?.[0];return o?fa(o.scoped_config_json,null):null}async function Jp(t,e){let r=await ze();if(!r)return!1;let s=String(t??"").trim();return s?(await r.execute({statement:"INSERT INTO table_chat_scope (chat_id, scoped_config_json, updated_at) VALUES (?, ?, ?)",params:[s,ya(e||{}),Kp()]}),!0):!1}async function Xp(t){let e=await ze();if(!e)return!1;let r=String(t??"").trim();return r?(await e.execute({statement:"DELETE FROM table_chat_scope WHERE chat_id = ?",params:[r]}),!0):!1}var Cl,px,Bp,nn,yx,Nl=N(()=>{W();lo();je();px=Object.freeze([{id:"table_engine_v1__sheets",statement:`
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
    `.replace(/\s+/g," ").trim()}]),Bp=!1,nn=null;yx={ensureTableDataReady:ze,getCurrentTableDataProvider:zp,upsertSheetMeta:Il,getSheetsBySlot:Ml,deleteSheetsBySlot:ga,upsertSheetRows:Rl,getRowsBySheet:Pl,deleteRowsBySheet:Up,loadSlotTables:jp,commitSlotTables:ma,clearSlot:Fp,getLocksForSheet:Wp,setLockEntry:Hp,clearLockEntry:Yp,clearSheetLocks:Gp,clearScopeLocks:qp,getChatScopeConfig:Vp,setChatScopeConfig:Jp,clearChatScopeConfig:Xp}});function wr(){return Dl||(Dl=I.createScope("TableChatScope")),Dl}function sr(){let t=globalThis.window||globalThis,e=t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1;return String(e??"").trim()||"default_chat"}function ba(){return new Date().toISOString()}function po(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function xr(t){let e=Ll.get($l,{}),s=(po(e)?e:{})[t];return ey(s)}function Ss(t,e){let r=Ll.get($l,{}),s=po(r)?r:{};s[t]=e,Ll.set($l,s),gx(t,e).catch(()=>{})}async function gx(t,e){try{let r=await Promise.resolve().then(()=>(Nl(),Qp));await r.ensureTableDataReady(),await r.setChatScopeConfig(t,e||{})}catch(r){wr().warn("chat-scope SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:r?.message||String(r)})}}function Zp(){return{template:{},templateArchives:{}}}function ey(t){return po(t)?{template:po(t.template)?t.template:{},templateArchives:po(t.templateArchives)?t.templateArchives:{}}:Zp()}function ha(t){return po(t)?{mode:mx.has(t.mode)?t.mode:vt.INHERIT_GLOBAL,presetName:typeof t.presetName=="string"?t.presetName:"",templateStr:typeof t.templateStr=="string"?t.templateStr:"",guideData:t.guideData!==void 0?ae(t.guideData):null,updatedAt:typeof t.updatedAt=="string"?t.updatedAt:ba(),source:typeof t.source=="string"?t.source:"ui"}:null}function hx(t){let e=[t.mode||"",t.presetName||"",t.templateStr||""],r=5381,s=e.join("||");for(let o=0;o<s.length;o++)r=(r<<5)+r+s.charCodeAt(o),r|=0;return String(r)}var fx,$l,Dl,Ll,mx,Ol,xa,ty=N(()=>{Be();W();je();vs();fx="tableChatScope",$l="chats";Ll=D.namespace(fx);mx=new Set(Object.values(vt));Ol=class{getScopedConfig(e=sr()){return xr(e)}setScopedConfig(e,r=sr()){let s=ey(e);return Ss(r,s),s}getTemplateScope(e,r=sr()){let s=Ae(e===void 0?Ie.getKey():e),o=xr(r);return ha(o.template[s])||null}setTemplateScope(e,r,s=sr()){let o=Ae(r===void 0?Ie.getKey():r),n=ha({...e,updatedAt:ba()});if(!n)return wr().warn("setTemplateScope \u6536\u5230\u65E0\u6548 state",e),null;let a=xr(s);return a.template[o]=n,Ss(s,a),wr().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u66F4\u65B0",{chatId:s,isolationKey:o,mode:n.mode}),n}clearTemplateScope(e,r=sr()){let s=Ae(e===void 0?Ie.getKey():e),o=xr(r);o.template[s]!==void 0&&(delete o.template[s],Ss(r,o),wr().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u6E05\u9664",{chatId:r,isolationKey:s}))}archiveCurrentTemplate(e,r=sr()){let s=Ae(e===void 0?Ie.getKey():e),o=xr(r),n=ha(o.template[s]);if(!n)return null;let a=hx(n),i=Array.isArray(o.templateArchives[s])?o.templateArchives[s]:[];if(i.length>0&&i[0].fingerprint===a)return null;let l={fingerprint:a,state:ae(n),archivedAt:ba()},c=[l,...i].slice(0,up);return o.templateArchives[s]=c,Ss(r,o),wr().info("\u6A21\u677F\u5DF2\u5F52\u6863",{chatId:r,isolationKey:s,archiveCount:c.length}),l}listTemplateArchives(e,r=sr()){let s=Ae(e===void 0?Ie.getKey():e),o=xr(r);return(Array.isArray(o.templateArchives[s])?o.templateArchives[s]:[]).map(a=>ae(a))}restoreTemplateArchive(e,r,s=sr()){let o=Ae(r===void 0?Ie.getKey():r),n=xr(s),a=Array.isArray(n.templateArchives[o])?n.templateArchives[o]:[],i=a[e];if(!i)return wr().warn("restoreTemplateArchive: \u627E\u4E0D\u5230 archive",{index:e,available:a.length}),null;this.archiveCurrentTemplate(o,s);let l=ha({...i.state,source:"restore",updatedAt:ba()});if(!l)return null;let c=xr(s);return c.template[o]=l,Ss(s,c),wr().info("\u6A21\u677F\u5DF2\u6062\u590D",{chatId:s,isolationKey:o,fromArchiveIndex:e}),l}clearTemplateArchives(e,r=sr()){let s=Ae(e===void 0?Ie.getKey():e),o=xr(r);Array.isArray(o.templateArchives[s])&&(delete o.templateArchives[s],Ss(r,o),wr().info("\u6A21\u677F\u5F52\u6863\u5DF2\u6E05\u7A7A",{chatId:r,isolationKey:s}))}resetChat(e=sr()){Ss(e,Zp()),wr().warn("\u5DF2\u91CD\u7F6E chat \u7684 ScopedConfig",{chatId:e})}},xa=new Ol});var ry,sy=N(()=>{je();ry=Object.freeze({formatId:"youyou",displayName:"YouYou \u539F\u751F (tables \u6570\u7EC4)",detect(t){return!t||typeof t!="object"||Array.isArray(t)?!1:Array.isArray(t.tables)},parse(t){if(!t||typeof t!="object")throw new Error("youyou-importer: raw \u4E0D\u662F\u5BF9\u8C61");return{tables:Array.isArray(t.tables)?ae(t.tables):[],name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:"",promptTemplate:typeof t.promptTemplate=="string"?t.promptTemplate:""}}})});function or(t,e=""){return t==null?e:String(t).trim()||e}function oy(t){return t&&typeof t=="object"&&Array.isArray(t.content)}function ny(t){return!t||typeof t!="object"?null:t.tables&&typeof t.tables=="object"&&!Array.isArray(t.tables)&&Object.keys(t.tables).filter(s=>s.startsWith("sheet_")&&oy(t.tables[s])).length>0?t.tables:Object.keys(t).filter(r=>r.startsWith("sheet_")&&oy(t[r])).length>0?t:null}function bx(t){return!t||typeof t!="object"?[]:Object.keys(t).filter(r=>r.startsWith("sheet_")&&t[r]&&typeof t[r]=="object").map((r,s)=>({key:r,table:t[r],fallbackOrder:s})).sort((r,s)=>{let o=Number.isFinite(r.table.orderNo)?r.table.orderNo:r.fallbackOrder,n=Number.isFinite(s.table.orderNo)?s.table.orderNo:s.fallbackOrder;return o-n}).map(({key:r,table:s},o)=>{let n=s.sourceData&&typeof s.sourceData=="object"?s.sourceData:{},a=Array.isArray(s.content)?s.content:[],i=Array.isArray(a[0])?a[0]:[],l=gl(n.note),c=new Set,d=i.slice(1).map((y,p)=>{let g=l[p]||{},f=or(y||g.title,`\u5217${p+1}`);return{key:tn(f||`col_${p+1}`,c),title:f,description:or(g.description,""),type:"text",required:!1}}),u=a.slice(1).map((y,p)=>{let g=Array.isArray(y)?y:[],f={};return d.forEach((h,x)=>{f[h.key]=Kr(g[x+1])}),{name:or(g[0],`\u884C${p+1}`),cells:f}});return{id:or(s.uid||r,`sheet_${o+1}`),name:or(s.name,`\u8868${o+1}`),note:or(n.note,""),enabled:s.enabled!==!1,aiInstructions:{init:or(n.initNode,""),create:or(n.insertNode,""),update:or(n.updateNode,""),delete:or(n.deleteNode,"")},columns:d,rows:u}})}var ay,iy=N(()=>{je();br();ay=Object.freeze({formatId:"shujuku",displayName:"shujuku \u6570\u636E\u5E93\u683C\u5F0F (sheet_x)",detect(t){return!t||typeof t!="object"||Array.isArray(t)?!1:ny(t)!==null},parse(t){let e=ny(t);if(!e)throw new Error("shujuku-importer: \u672A\u627E\u5230 sheet_xxx \u5165\u53E3");return{tables:bx(e),name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:""}}})});var ly,cy=N(()=>{ly=Object.freeze({formatId:"youyou",displayName:"YouYou \u539F\u751F (.json)",fileExtension:".json",mimeType:"application/json",serialize(t){return{version:1,exportedAt:new Date().toISOString(),templates:Array.isArray(t)?t:[]}}})});function an(){return Bl||(Bl=I.createScope("TemplateAdapter")),Bl}function dy(t){if(t==null)return null;for(let e of xx){let r=!1;try{r=e.detect(t)}catch(s){an().warn(`importer ${e.formatId} detect \u629B\u9519`,s);continue}if(r)try{let s=e.parse(t);if(s&&Array.isArray(s.tables))return an().debug("\u9002\u914D\u5668\u547D\u4E2D",{formatId:e.formatId,displayName:e.displayName,tableCount:s.tables.length,firstTableName:s.tables[0]?.name||""}),{...s,formatId:e.formatId};an().warn(`importer ${e.formatId} parse \u8FD4\u56DE\u65E0\u6548\u7ED3\u6784`,{hasResult:!!s,hasTablesArray:Array.isArray(s?.tables)})}catch(s){an().warn(`importer ${e.formatId} parse \u629B\u9519\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A`,s)}}return an().warn("importTemplateAuto: \u65E0\u9002\u914D\u5668\u547D\u4E2D",{isObject:t&&typeof t=="object",isArray:Array.isArray(t),keys:t&&typeof t=="object"?Object.keys(t).slice(0,10):[]}),null}var Bl,xx,sE,uy=N(()=>{W();sy();iy();cy();xx=Object.freeze([ry,ay]),sE=Object.freeze([ly])});function nr(){return zl||(zl=I.createScope("TableTemplate")),zl}function st(t,e=""){return t==null?e:String(t).trim()||e}function py(t="template"){return`${t}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function cn(t={}){let e=dy(t),r=[],s="",o="",n="",a="";e?(r=e.tables,s=e.formatId||"",o=e.name||"",n=e.description||"",a=e.promptTemplate||""):t&&typeof t=="object"&&nr().warn("normalizeTemplate: \u65E0\u9002\u914D\u5668\u547D\u4E2D\uFF0C\u6309\u7A7A\u6A21\u677F\u5904\u7406",{keys:Object.keys(t).slice(0,10)});let i=ca({tables:r});return{id:st(t?.id,py()),name:st(t?.name||o,"\u672A\u547D\u540D\u6A21\u677F"),description:st(t?.description||n,""),tables:i.tables||r,promptTemplate:st(t?.promptTemplate||a,""),sourceFormat:s,createdAt:st(t?.createdAt,new Date().toISOString()),updatedAt:st(t?.updatedAt,new Date().toISOString())}}function yy(){ln=null}function fy(){return[cn({id:ut,name:pl,description:"\u5305\u542B\u5168\u5C40\u6570\u636E\u3001\u4E3B\u89D2\u3001\u91CD\u8981\u89D2\u8272\u3001\u6280\u80FD\u3001\u80CC\u5305\u3001\u4EFB\u52A1\u3001\u7EAA\u8981\u548C\u9009\u9879\u8868\u3002",tables:ae(so)})]}function _s(){let t=fo.get(Kl,[]);return Array.isArray(t)?t.map(cn):[]}function go(){if(ln)return ln;let t=fy(),e=_s(),r=new Set(t.map(s=>s.id));return ln=Object.freeze([...t,...e.filter(s=>!r.has(s.id))]),ln}function ws(t){let e=st(t,"");return go().find(r=>r.id===e)||null}function Ur(t={}){let e=new Date().toISOString(),r=cn({...t,id:st(t.id,py()),updatedAt:e,createdAt:st(t.createdAt,e)}),o=_s().filter(n=>n.id!==r.id);return o.push(r),fo.set(Kl,o),yy(),{success:!0,template:r}}function jl(t){let e=st(t,"");if(!e||e===ut)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u5220\u9664\u3002"};let r=_s().filter(s=>s.id!==e);return fo.set(Kl,r),yy(),wx()===e&&Fl(ut),{success:!0}}function gy(t,e){let r=st(t,"");if(!r||r===ut)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u91CD\u547D\u540D\u3002"};let s=st(e,"");if(!s)return{success:!1,error:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\u3002"};let o=ws(r);return o?Ur({...o,name:s}):{success:!1,error:"\u6A21\u677F\u4E0D\u5B58\u5728\u3002"}}function my(){return{version:1,exportedAt:new Date().toISOString(),templates:_s()}}function hy(t,{overwrite:e=!1}={}){let r;if(Array.isArray(t))r=t;else if(t&&typeof t=="object")Array.isArray(t.templates)?r=t.templates:t.template&&typeof t.template=="object"?r=[t.template]:r=[t];else return{success:!1,imported:0,skipped:0,errors:["\u65E0\u6548\u7684\u5BFC\u5165\u6570\u636E\u683C\u5F0F\u3002"]};nr().info("importTemplates \u5F00\u59CB",{rawListCount:r.length,overwrite:e});let s=new Set(_s().map(i=>i.id)),o=0,n=0,a=[];for(let i of r)try{let l=cn(i);if(nr().info("importTemplates \u5355\u6761",{id:l.id,name:l.name,tableCount:Array.isArray(l.tables)?l.tables.length:0,firstTableName:l.tables?.[0]?.name||""}),!e&&s.has(l.id)){n++;continue}Ur(l),s.add(l.id),o++}catch(l){a.push(st(l?.message,"\u672A\u77E5\u9519\u8BEF")),nr().error("importTemplates \u5355\u6761\u5931\u8D25",l)}return nr().info("importTemplates \u5B8C\u6210",{imported:o,skipped:n,errorCount:a.length}),{success:!0,imported:o,skipped:n,errors:a}}function wx(){let t=fo.get(Ul,""),e=st(t,ut);return ws(e)?e:ut}function Fl(t){let e=st(t,ut);return fo.set(Ul,e),nr().info("\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u5DF2\u5207\u6362",{templateId:e}),e}function yo(){let t=fo.get(Ul,""),e=st(t,ut),r=ws(e);return r||fy()[0]}function vx(t){if(!t||typeof t!="string")return null;try{let e=JSON.parse(t);return cn(e)}catch(e){return nr().warn("templateFromString \u53CD\u5E8F\u5217\u5316\u5931\u8D25",e),null}}function mo({chatId:t,isolationKey:e}={}){let r=e===void 0?Ie.getKey():e,s=xa.getTemplateScope(r,t);if(!s||s.mode===vt.INHERIT_GLOBAL){let n=yo();return nr().debug("resolveActiveTemplate: inherit_global",{chatId:t,isolationKey:r,templateId:n?.id||"",templateName:n?.name||"",tableCount:Array.isArray(n?.tables)?n.tables.length:0,firstTableName:n?.tables?.[0]?.name||""}),{template:n,mode:vt.INHERIT_GLOBAL,source:{templateId:n?.id||""}}}if(s.mode===vt.CHAT_OVERRIDE){let n=vx(s.templateStr);if(n)return{template:n,mode:vt.CHAT_OVERRIDE,source:{}};nr().warn("chat_override templateStr \u53CD\u5E8F\u5217\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 inherit_global");let a=yo();return{template:a,mode:vt.INHERIT_GLOBAL,source:{templateId:a?.id||"",fallback:!0}}}if(s.mode===vt.PRESET_LINK){let n=s.presetName||"",a=go(),i=a.find(c=>c.name===n)||a.find(c=>c.id===n);if(i)return{template:i,mode:vt.PRESET_LINK,source:{presetName:n,templateId:i.id}};nr().warn("preset_link \u6307\u5411\u7684\u5168\u5C40\u9884\u8BBE\u4E0D\u5B58\u5728\uFF0C\u964D\u7EA7\u5230 inherit_global",{presetName:n});let l=yo();return{template:l,mode:vt.INHERIT_GLOBAL,source:{templateId:l?.id||"",presetName:n,fallback:!0}}}let o=yo();return{template:o,mode:vt.INHERIT_GLOBAL,source:{templateId:o?.id||"",unknownMode:s.mode}}}function by(t={}){let e=t.isolationKey===void 0?Ie.getKey():t.isolationKey;return xa.listTemplateArchives(e,t.chatId)}function xy(t,e={}){let r=e.isolationKey===void 0?Ie.getKey():e.isolationKey,s=xa.restoreTemplateArchive(t,r,e.chatId);return s?{success:!0,scopeState:s}:{success:!1,error:"\u5F52\u6863\u4E0D\u5B58\u5728"}}var fo,Kl,Ul,zl,ln,no=N(()=>{Be();W();br();je();ty();vs();uy();fo=D.namespace("tableWorkbenchTemplates"),Kl="templates",Ul="activeId";ln=null});var Ty={};se(Ty,{TableTemplatePanel:()=>vy,default:()=>Ax});function Wl(t){return t===ut}function _x(t,{onChange:e,readonly:r}){let s=m("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});F(s,bt({label:"\u63CF\u8FF0",control:Xe({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:a=>e({description:a})})})),F(s,m("div",{text:"\u586B\u8868\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}})),F(s,m("div",{text:"\u53EF\u4F7F\u7528\u5B8F\uFF1A{{tableData}} {{lastUserMessage}} {{lastAiMessage}} {{toolWorldbookContent}} \u7B49\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u6A21\u677F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let o=m("textarea",{className:"yyt-textarea",attrs:{rows:"8",placeholder:"\u53EF\u9009 \u2014 \u81EA\u5B9A\u4E49\u586B\u8868\u63D0\u793A\u8BCD",disabled:r?"disabled":null},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});o.value=t.promptTemplate||"",o.addEventListener("change",()=>{r||e({promptTemplate:o.value})}),F(s,o),F(s,m("div",{text:`\u8868\u683C\u7ED3\u6784\uFF08${(t.tables||[]).length} \u5F20\u8868\uFF09`,style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px"}})),F(s,m("div",{text:"\u672C\u9762\u677F\u53EA\u5C55\u793A\u8868\u7ED3\u6784 JSON\u3002\u590D\u6742 schema \u7F16\u8F91\uFF08\u589E\u5220\u8868\u3001\u5217\u5B9A\u4E49\u3001\u9ED8\u8BA4\u884C\uFF09\u5C06\u5728\u586B\u8868\u5DE5\u4F5C\u53F0\u4E2D\u63D0\u4F9B\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let n=m("pre",{style:{padding:"10px 12px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm, 6px)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-secondary)",maxHeight:"260px",overflow:"auto",whiteSpace:"pre",margin:"0"}});try{n.textContent=JSON.stringify(t.tables||[],null,2)}catch{n.textContent="// \u65E0\u6CD5\u5E8F\u5217\u5316"}return F(s,n),s}function Ex(t){let r=[`${(t.tables||[]).length} \u5F20\u8868`];return t.promptTemplate&&r.push("\u81EA\u5B9A\u4E49\u6A21\u677F"),r}var Tx,wy,Sx,vy,Ax,Sy=N(()=>{ur();no();br();W();Ko();Tx=I.createScope("TableTemplatePanel"),wy="";Sx={listPresets(){return go().map(t=>({id:Wl(t.id)?`builtin_table_${t.id}`:t.id,name:t.name,description:t.description||"",promptTemplate:t.promptTemplate||"",tables:t.tables||[],_rawId:t.id,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=t.startsWith("builtin_table_")?t.slice(14):t,r=ws(e);return r?{id:Wl(r.id)?`builtin_table_${r.id}`:r.id,name:r.name,description:r.description||"",promptTemplate:r.promptTemplate||"",tables:r.tables||[],_rawId:r.id,createdAt:r.createdAt,updatedAt:r.updatedAt}:null},getCurrentPresetId(){return wy||""},setCurrentPresetId(t){return wy=t||"",!0},createPreset(t){let e=String(t?.name||"").trim()||"\u65B0\u5EFA\u6A21\u677F",r=Ur({name:e,description:t?.description||"",promptTemplate:t?.promptTemplate||"",tables:Array.isArray(t?.tables)?t.tables:[]});return r?.success?{id:r.template.id,...r.template,_rawId:r.template.id}:null},updatePreset(t,e){if(!t)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t;if(Wl(r))return Tx.warn("\u62D2\u7EDD\u4FEE\u6539\u5185\u7F6E\u8868\u683C\u6A21\u677F"),null;let s=ws(r);if(!s)return null;let o=Ur({...s,...e,id:r});return o?.success?{id:o.template.id,...o.template,_rawId:o.template.id}:null},deletePreset(t){if(!t)return!1;let e=t.startsWith("builtin_table_")?t.slice(14):t;return!!jl(e)?.success},duplicatePreset(t,e={}){let r=this.getPreset(t);if(!r)return null;let s=e.nameSuffix||" \u526F\u672C";return this.createPreset({name:`${r.name}${s}`,description:r.description,promptTemplate:r.promptTemplate,tables:r.tables})},renamePreset(t,e){if(!t||!e)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t,s=gy(r,e);return s?.success?this.getPreset(s.template?.id||r):null},exportAll(){return my()},importPresets(t){let e=hy(t,{overwrite:!1});return{added:e?.imported||0,skipped:e?.skipped||0}},resetAll(){let t=_s();for(let e of t)try{jl(e.id)}catch{}}};vy=Mr({id:"tableTemplatePanel",kind:"table",panelTitle:"\u8868\u683C\u6A21\u677F",panelHint:"\u7BA1\u7406\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u8868\u683C\u7ED3\u6784\u6A21\u677F\u3002\u5728\u586B\u8868\u9762\u677F\u9876\u90E8\u5DE5\u5177\u680F\u53EF\u5FEB\u901F\u52A0\u8F7D/\u4FDD\u5B58\u5F53\u524D\u6A21\u677F\u3002",store:Sx,renderEditor:_x,renderListItemMeta:Ex}),Ax=vy});var Ey={};se(Ey,{ToolManagePanel:()=>_y,default:()=>Cx});var _y,Cx,Ay=N(()=>{Ge();Ho();er();_y={id:"toolManagePanel",_removeDialog(t){if(!t?.length)return;let e=t.find("#yyt-tool-dialog-overlay");it(e,"yytToolManageDialogSelect"),e.remove()},_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let r=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!r){C("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}r.switchMainTab("tools"),r.switchSubTab("tools",t)},render(t){let e=Xt(),r=Object.entries(e),s=r.filter(([,o])=>o?.enabled!==!1).length;return`
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
            ${oe(o.name)}
            <span class="yyt-badge" style="background: var(--yyt-accent-soft); color: var(--yyt-accent); margin-left: 6px;">${oe(o.category)}</span>
          </div>
          <div class="yyt-list-row-desc">${oe(o.description)}</div>
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
      `},bindEvents(t,e){let r=Q();!r||!me(t)||(t.off(".yytToolManage"),this._bindToolEvents(t,r),this._bindFileEvents(t,r))},_bindToolEvents(t,e){t.on("change.yytToolManage",".yyt-tool-toggle input",r=>{let s=e(r.currentTarget).closest(".yyt-list-row"),o=s.data("tool-id"),n=e(r.currentTarget).is(":checked");Jn(o,n),s.toggleClass("yyt-tool-item-enabled",n).toggleClass("yyt-tool-item-disabled",!n),s.find(".yyt-status-dot").toggleClass("yyt-status-dot-on",n).toggleClass("yyt-status-dot-off",!n),C("info",n?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.on("click.yytToolManage","#yyt-add-tool",()=>{this._showToolEditDialog(t,e,null)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="config"]',r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._openToolConfig(s)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="edit"]',r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._showToolEditDialog(t,e,s)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="delete"]',async r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id"),o=Qt(s);if(!s||!o||!await dr("\u5220\u9664\u5DE5\u5177",`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177"${o.name}"\u5417\uFF1F`,{danger:!0}))return;if(!Gs(s)){C("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),C("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.on("click.yytToolManage","#yyt-import-tools",()=>{t.find("#yyt-import-tools-file").click()}),t.on("change.yytToolManage","#yyt-import-tools-file",async r=>{let s=r.target.files[0];if(s){try{let o=await Bo(s),n=Vs(o,{overwrite:!1});C(n.success?"success":"error",n.message),n.success&&this.renderTo(t)}catch(o){C("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(r.target).val("")}}),t.on("click.yytToolManage","#yyt-export-tools",()=>{try{let r=qs();Oo(r,`youyou_toolkit_tools_${Date.now()}.json`),C("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(r){C("error",`\u5BFC\u51FA\u5931\u8D25: ${r.message}`)}}),t.on("click.yytToolManage","#yyt-reset-tools",async()=>{await dr("\u91CD\u7F6E\u5DE5\u5177","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F",{danger:!0})&&(Js(),this.renderTo(t),C("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,r){let s=r?Qt(r):null,o=!!s,n=`
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
                       value="${s?oe(s.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${s?oe(s.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;this._removeDialog(t),t.append(n);let a=t.find("#yyt-tool-dialog-overlay"),i=a.find("#yyt-tool-name"),l=a.find("#yyt-tool-category"),c=a.find("#yyt-tool-desc"),d=a.find("#yyt-tool-timeout"),u=a.find("#yyt-tool-retries");Mt(a,{namespace:"yytToolManageDialogSelect",selectors:["#yyt-tool-category"]});let y=()=>{it(a,"yytToolManageDialogSelect"),a.remove()};a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",y),a.on("click",function(p){p.target===this&&y()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let p=i.val().trim(),g=l.val(),f=c.val().trim(),h=parseInt(d.val())||6e4,x=parseInt(u.val())||3;if(!p){C("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0"),i.trigger("focus").trigger("select");return}let T=r||`tool_${Date.now()}`;if(!Ys(T,{name:p,category:g,description:f,promptTemplate:s?.promptTemplate||"",extractTags:Array.isArray(s?.extractTags)?s.extractTags:[],config:{execution:{timeout:h,retries:x},api:s?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(s?.config?.messages)?s.config.messages:[],context:{depth:s?.config?.context?.depth||3,includeTags:Array.isArray(s?.config?.context?.includeTags)?s.config.context.includeTags:[],excludeTags:Array.isArray(s?.config?.context?.excludeTags)?s.config.context.excludeTags:[]},worldbooks:{enabled:s?.config?.worldbooks?.enabled===!0,selected:Array.isArray(s?.config?.worldbooks?.selected)?s.config.worldbooks.selected:[]}},enabled:s?.enabled!==!1})){C("error",o?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}Qs(T),y(),this.renderTo(t),C("success",o?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),o||this._openToolConfig(T)})},destroy(t){!Q()||!me(t)||(this._removeDialog(t),t.off(".yytToolManage"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},Cx=_y});var ky={};se(ky,{BypassManager:()=>wa,DEFAULT_BYPASS_PRESETS:()=>Tr,addMessage:()=>Fx,buildBypassMessages:()=>qx,bypassManager:()=>ie,createPreset:()=>Lx,default:()=>Vx,deleteMessage:()=>Hx,deletePreset:()=>Bx,duplicatePreset:()=>zx,exportPresets:()=>Yx,getAllPresets:()=>Dx,getDefaultPresetId:()=>Kx,getEnabledMessages:()=>jx,getPreset:()=>$x,getPresetList:()=>dn,importPresets:()=>Gx,setDefaultPresetId:()=>Ux,updateMessage:()=>Wx,updatePreset:()=>Ox});function Cy(t){let e=String(t||"").trim().toLowerCase();return e==="system"?"SYSTEM":e==="assistant"||e==="ai"?"assistant":"USER"}function Rx(t){return t&&typeof t=="object"&&typeof t.content=="string"&&!t.name&&!Array.isArray(t.messages)}function Px(t){return String(t||"").replace(/\$0/g,"{{toolContentMacro}}").replace(/\$1/g,"{{rawRecentMessagesText}}").replace(/\$4/g,"{{toolWorldbookContent}}").replace(/\$8/g,"{{userMessage}}").replace(/\$C/g,"{{characterCard}}")}function Nx(t,e,r){let s=t.mainSlot||(t.isMain?"A":t.isMain2?"B":"");return{id:typeof t.id=="string"&&t.id.trim()?t.id.trim():`${r}_msg_${e+1}`,role:Cy(t.role),content:Px(t.content),enabled:t.enabled!==!1,deletable:t.deletable!==!1,...s?{mainSlot:s,isMain:s==="A",isMain2:s==="B"}:{}}}var kx,vr,ho,Hl,Ix,Tr,Mx,wa,ie,Dx,dn,$x,Lx,Ox,Bx,zx,Kx,Ux,jx,Fx,Wx,Hx,Yx,Gx,qx,Vx,bo=N(()=>{Be();Ye();W();kx=I.createScope("BypassManager"),vr="bypass_presets",ho="default_bypass_preset",Hl="current_bypass_preset",Ix=Object.freeze([{id:"table_fill_default_msg_1",role:"SYSTEM",content:"\u4F60\u662F\u4E00\u4E2A\u52A9\u624B\uFF0C\u8D1F\u8D23\u542C\u4ECE\u7528\u6237\u7684\u6307\u4EE4\u5B8C\u6210\u4F60\u7684\u5DE5\u4F5C",enabled:!0,deletable:!0},{id:"table_fill_default_msg_2",role:"assistant",content:"\u6536\u5230\uFF0C\u6211\u5C06\u5145\u5206\u63CF\u7ED8\u7528\u6237\u7684\u610F\u5FD7\uFF0C\u6BEB\u4E0D\u5077\u61D2\uFF0C\u5E76\u4E14\u6211\u4E00\u5B9A\u4F1A\u9075\u7167\u7528\u6237\u7684\u8981\u6C42",enabled:!0,deletable:!0},{id:"table_fill_default_msg_3",role:"USER",content:`\u4EE5\u4E0B\u662F\u4F60\u53EF\u80FD\u9700\u8981\u7528\u5230\u7684\u80CC\u666F\u8BBE\u5B9A\uFF0C\u6CE8\u610F\u4F60\u53EA\u9700\u8981\u5176\u4E2D\u5173\u4E8E\u5267\u60C5\u4EE5\u53CA\u4EBA\u8BBE\u65B9\u9762\u7684\u6570\u636E\uFF0C\u4E0D\u9700\u8981\u601D\u8003\u91CC\u8FB9\u9664\u6B64\u4E4B\u5916\u7684\u4EFB\u4F55\u683C\u5F0F\u6216\u8005\u601D\u7EF4\u94FE\u65B9\u9762\u7684\u8981\u6C42\uFF1A
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

{{userMessage}}`,enabled:!0,deletable:!1,mainSlot:"B",isMain2:!0},{id:"table_fill_default_msg_8",role:"assistant",content:"\u6536\u5230\u6307\u4EE4\uFF0C\u6211\u5C06\u4E00\u6B65\u4E00\u6B65\u5F00\u59CB\u601D\u8003\uFF0C\u5E76\u5B8C\u6210\u586B\u8868\uFF0C\u9996\u5148\u6211\u8981\u5206\u6790\u5F53\u524D\u8F6E\u6B21\u7684\u5267\u60C5\u53D8\u5316\u3002",enabled:!0,deletable:!0}]),Tr={table_workbench_fill_default:{id:"table_workbench_fill_default",name:"\u9ED8\u8BA4\u586B\u8868 Ai \u6307\u4EE4\u9884\u8BBE",description:"\u7528\u4E8E\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u5185\u7F6E Ai \u6307\u4EE4\u9884\u8BBE\uFF0C\u53EF\u590D\u5236\u540E\u6309\u9700\u7F16\u8F91\u3002",enabled:!0,messages:Ix.map(t=>({...t})),createdAt:0,updatedAt:0}},Mx=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]);wa=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=D.get(vr,{});return this._cache={...Tr,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((r,s)=>(s.updatedAt||0)-(r.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:r,name:s,description:o,messages:n}=e;if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=r.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let i={id:a,name:s.trim(),description:o||"",enabled:!0,messages:n||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,i),K.emit(O.BYPASS_PRESET_CREATED,{presetId:a,preset:i}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${s}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,r){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(r.id&&r.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let o={...s,...r,id:e,updatedAt:Date.now()};return this._savePreset(e,o),K.emit(O.BYPASS_PRESET_UPDATED,{presetId:e,preset:o}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u66F4\u65B0\u6210\u529F`,preset:o}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(Tr[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let s=D.get(vr,{});return delete s[e],D.set(vr,s),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),K.emit(O.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,r,s){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!r||!r.trim())&&(r=`${e}_copy_${Date.now()}`),this.presetExists(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(o)),id:r.trim(),name:s||`${o.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(r.trim(),n),K.emit(O.BYPASS_PRESET_CREATED,{presetId:r,preset:n}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${n.name}"`,preset:n}}addMessage(e,r){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o={id:`msg_${Date.now()}`,role:Cy(r.role||"SYSTEM"),content:r.content||"",enabled:r.enabled!==!1,deletable:r.deletable!==!1,...r.mainSlot?{mainSlot:r.mainSlot}:{}},n=[...s.messages||[],o];return this.updatePreset(e,{messages:n})}updateMessage(e,r,s){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=o.messages||[],a=n.findIndex(l=>l.id===r);if(a===-1)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};let i=[...n];return i[a]={...i[a],...s},this.updatePreset(e,{messages:i})}deleteMessage(e,r){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=s.messages||[],n=o.find(i=>i.id===r);if(!n)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};if(n.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=o.filter(i=>i.id!==r);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let r=this.getPreset(e);return!r||!r.enabled?[]:(r.messages||[]).filter(s=>s.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=D.get(ho,null);return e==="undefined"||e==="null"||e===""?(D.remove(ho),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(D.set(ho,e),K.emit(O.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let s=this.getPreset(e);if(!s)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let r=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(r)},null,2)}importPresets(e,r={}){let{overwrite:s=!1,name:o=""}=r,n;try{n=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let a=D.get(vr,{}),l=Array.isArray(n)&&n.every(Rx)?[{id:this._generatePresetId(o||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",a),name:o||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",description:"\u7531\u5916\u90E8\u586B\u8868\u63D0\u793A\u8BCD\u7EC4\u5BFC\u5165\u3002",enabled:!0,messages:n}]:Array.isArray(n)?n:n.presets?n.presets:[n];if(l.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let c=0;for(let d of l){let u=this._normalizePreset(d?.id,d,a);u&&(Tr[u.id]&&!s||!s&&a[u.id]||(a[u.id]={...u,updatedAt:Date.now()},c++))}return c>0&&(D.set(vr,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${c} \u4E2A\u9884\u8BBE`,imported:c}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let r=e?.bypass?.presetId;return r?this.getPreset(r):this.getDefaultPreset()}buildBypassMessages(e){let r=this.getToolBypassPreset(e);return r?this.getEnabledMessages(r.id):[]}_savePreset(e,r){let s=D.get(vr,{});s[e]=r,D.set(vr,s),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=D.get(vr,{}),r={},s=!1,o=Array.isArray(e)?e.map((n,a)=>[n?.id||n?.name||`legacy_${a}`,n]):Object.entries(e||{});for(let[n,a]of o){let i=this._normalizePreset(n,a,r);if(!i){s=!0;continue}r[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(s=!0)}s&&D.set(vr,r),this._migrateDefaultPreset(r),this._cache=null,this._migrated=!0}_normalizePreset(e,r,s={}){if(!r||typeof r!="object")return null;let o=typeof r.name=="string"?r.name.trim():"",n=typeof r.id=="string"?r.id.trim():"",a=typeof e=="string"?e.trim():"";if(!o&&a&&a!=="undefined"&&a!=="null"&&(o=a),this._isLegacySamplePreset(o,n)||(!n&&a&&a!=="undefined"&&a!=="null"&&(n=a),!n&&o&&o!=="undefined"&&o!=="null"&&(n=this._generatePresetId(o,s)),!o||!n||n==="undefined"||o==="undefined"))return null;let l=Array.isArray(r.messages)?r.messages.filter(c=>c&&typeof c=="object").map((c,d)=>Nx(c,d,n)):[];return{...r,id:n,name:o,description:typeof r.description=="string"?r.description:"",enabled:r.enabled!==!1,messages:l,createdAt:r.createdAt||Date.now(),updatedAt:r.updatedAt||Date.now()}}_migrateDefaultPreset(e){let r=D.get(ho,null),s=D.get(Hl,null),o=r??s;(o==="undefined"||o==="null"||o==="")&&(o=null),o&&!e[o]&&(o=Object.values(e).find(a=>a.name===o)?.id||null),o?D.set(ho,o):D.remove(ho),D.has(Hl)&&D.remove(Hl)}_isLegacySamplePreset(e,r=""){return e?r==="standard"||r==="enhanced"||r==="jailbreak"||Mx.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,r={}){let s=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,o=s,n=1;for(;r[o];)o=`${s}_${n++}`;return o}_log(...e){kx.debug(e[0],e.length>1?e.slice(1):void 0)}},ie=new wa,Dx=()=>ie.getAllPresets(),dn=()=>ie.getPresetList(),$x=t=>ie.getPreset(t),Lx=t=>ie.createPreset(t),Ox=(t,e)=>ie.updatePreset(t,e),Bx=t=>ie.deletePreset(t),zx=(t,e,r)=>ie.duplicatePreset(t,e,r),Kx=()=>ie.getDefaultPresetId(),Ux=t=>ie.setDefaultPresetId(t),jx=t=>ie.getEnabledMessages(t),Fx=(t,e)=>ie.addMessage(t,e),Wx=(t,e,r)=>ie.updateMessage(t,e,r),Hx=(t,e)=>ie.deleteMessage(t,e),Yx=t=>ie.exportPresets(t),Gx=(t,e)=>ie.importPresets(t,e),qx=t=>ie.buildBypassMessages(t),Vx=ie});var Iy={};se(Iy,{DEFAULT_SETTINGS:()=>un,SettingsService:()=>Ta,default:()=>Jx,settingsService:()=>Lt});var un,va,Ta,Lt,Jx,pn=N(()=>{Be();Ye();un={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue",startupScreenDismissed:!1}},va="settings_v2",Ta=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=D.get(va,{}),r=this._migrateLegacy(e);return this._cache=this._mergeWithDefaults(r.settings),r.changed&&D.set(va,this._cache),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),D.set(va,this._cache),K.emit(O.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let r=this.getSettings(),s=this._deepMerge(r,e);this.saveSettings(s)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(un)),D.set(va,this._cache),K.emit(O.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,r=null){let s=this.getSettings(),o=e.split("."),n=s;for(let a of o)if(n&&typeof n=="object"&&a in n)n=n[a];else return r;return n}set(e,r){let s=JSON.parse(JSON.stringify(this.getSettings())),o=e.split("."),n=s;for(let a=0;a<o.length-1;a+=1){let i=o[a];i in n||(n[i]={}),n=n[i]}n[o[o.length-1]]=r,this.saveSettings(s)}_migrateLegacy(e){if(!e||typeof e!="object")return{settings:{},changed:!1};let r=!1,s=JSON.parse(JSON.stringify(e));return s.automation&&Object.prototype.hasOwnProperty.call(s.automation,"enabled")&&(delete s.automation.enabled,r=!0),{settings:s,changed:r}}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(un)),e)}_deepMerge(e,r){let s={...e};for(let o in r)r[o]&&typeof r[o]=="object"&&!Array.isArray(r[o])?s[o]=this._deepMerge(e[o]||{},r[o]):s[o]=r[o];return s}},Lt=new Ta,Jx=Lt});function My(t){if(!t)return"";let e=String(t).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function Sa(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Hr(){try{return Sa()?.SillyTavern||null}catch{return null}}function _a(t){try{return(t||Hr())?.getContext?.()||null}catch{return null}}function Yl(t,e){if(!t)return null;let r=typeof t?.on=="function"||typeof t?.addListener=="function",s=typeof t?.off=="function"||typeof t?.removeListener=="function";return!r||!s?null:{source:e,eventSource:t,capabilities:{on:typeof t?.on=="function",off:typeof t?.off=="function",addListener:typeof t?.addListener=="function",removeListener:typeof t?.removeListener=="function"}}}function Xx(){let t=Sa(),e=Hr(),r=_a(e),o=[Yl(e?.eventSource,"SillyTavern.eventSource"),Yl(r?.eventSource,"SillyTavern.getContext().eventSource"),Yl(t?.eventSource,"topWindow.eventSource")].filter(Boolean)[0]||null,n=e?.eventTypes||e?.event_types||r?.eventTypes||r?.event_types||t?.eventTypes||t?.event_types||{};return{topWindow:t,api:e,context:r,eventSource:o?.eventSource||null,eventTypes:n,source:o?.source||"unavailable",capabilities:o?.capabilities||null,hasBridge:!!o?.eventSource}}var St,Fe,Qx,Ry,Gl,Ot,ql=N(()=>{W();St=I.createScope("HostEvents"),Fe=Object.freeze({MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",MESSAGE_EDITED:"MESSAGE_EDITED",USER_MESSAGE_RENDERED:"USER_MESSAGE_RENDERED",IMPERSONATE_READY:"IMPERSONATE_READY",GENERATION_STOPPED:"GENERATION_STOPPED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHAT_CHANGED:"CHAT_CHANGED"});Qx=1500,Ry=20,Gl=class{constructor(){this._bridge=null,this._pending=[],this._initAttempts=0,this._retryTimer=null,this._readyResolvers=[],this._initialized=!1,this._disposed=!1}subscribe(e,r,s={}){if(!e||typeof r!="function")return St.warn("subscribe \u65E0\u6548\u53C2\u6570",{eventKey:e,handlerType:typeof r}),()=>{};if(this._disposed)return St.warn("subscribe \u5728 dispose \u4E4B\u540E\u88AB\u8C03\u7528",{eventKey:e}),()=>{};let o={key:My(e),rawKey:e,handler:r,options:s,attached:!1,_hostName:"",_hostUnsubscribe:null,_disposed:!1};return this._pending.push(o),this._ensureInitialized(),this._bridge?.hasBridge&&this._attachEntry(o),()=>{if(o._disposed)return;o._disposed=!0;let n=this._pending.indexOf(o);if(n>=0&&this._pending.splice(n,1),o.attached&&typeof o._hostUnsubscribe=="function")try{o._hostUnsubscribe()}catch(a){St.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:o._hostName,error:a})}}}async emit(e,...r){if(this._ensureInitialized(),!this._bridge?.hasBridge)return St.debug("emit \u65F6\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA\uFF0C\u8DF3\u8FC7",{eventKey:e}),!1;let s=this._resolveHostEventName(e);if(!s)return!1;let{eventSource:o}=this._bridge;try{if(typeof o?.emit=="function")return await o.emit(s,...r),!0;if(typeof o?.dispatch=="function")return await o.dispatch(s,...r),!0}catch(n){St.warn("emit \u629B\u9519",{eventKey:e,hostName:s,error:n})}return!1}ready({timeoutMs:e=1e4}={}){return this._ensureInitialized(),this._bridge?.hasBridge?Promise.resolve(!0):new Promise(r=>{let s=!1,o=a=>{s||(s=!0,r(a))},n=e>0?setTimeout(()=>o(!1),e):null;this._readyResolvers.push(a=>{n&&clearTimeout(n),o(a)})})}describe(){this._ensureInitialized();let e=this._bridge?.eventTypes||{};return{initialized:this._initialized,source:this._bridge?.source||"unavailable",hasBridge:!!this._bridge?.hasBridge,initAttempts:this._initAttempts,retryScheduled:!!this._retryTimer,pendingCount:this._pending.filter(r=>!r.attached).length,attachedCount:this._pending.filter(r=>r.attached).length,availableEvents:Object.keys(e).slice(0,100)}}reinit(){if(this._disposed)return!1;for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e.attached=!1,e._hostUnsubscribe=null,e._hostName=""}return this._bridge=null,this._initialized=!1,this._initAttempts=0,this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null),this._ensureInitialized()}dispose(){this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null);for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e._disposed=!0}this._pending=[],this._readyResolvers=[],this._bridge=null,this._initialized=!1,this._disposed=!0}_ensureInitialized(){if(this._disposed)return!1;if(this._initialized&&this._bridge?.hasBridge)return!0;this._initAttempts+=1;let e=Xx();if(this._bridge=e,this._initialized=!0,!e.hasBridge)return St.debug(`\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA (attempt ${this._initAttempts})`,{source:e.source}),this._scheduleRetry(),!1;St.info("\u5BBF\u4E3B\u6865\u5DF2\u5C31\u7EEA",{source:e.source,eventTypesCount:Object.keys(e.eventTypes).length});for(let s of this._pending)!s.attached&&!s._disposed&&this._attachEntry(s);let r=this._readyResolvers.slice();this._readyResolvers=[];for(let s of r)try{s(!0)}catch{}return!0}_scheduleRetry(){if(!this._retryTimer){if(this._initAttempts>=Ry){St.warn(`\u5DF2\u8FBE\u6700\u5927\u91CD\u8BD5\u6B21\u6570 (${Ry})\uFF0C\u505C\u6B62\u91CD\u8BD5`);let e=this._readyResolvers.slice();this._readyResolvers=[];for(let r of e)try{r(!1)}catch{}return}this._retryTimer=setTimeout(()=>{this._retryTimer=null,this._initialized=!1,this._ensureInitialized()},Qx)}}_resolveHostEventName(e){let r=My(e),s=this._bridge?.eventTypes||{};if(s[r])return s[r];let o=r.toLowerCase();if(s[o])return s[o];let n=String(e).trim();return n&&n===n.toLowerCase()?n:o}_attachEntry(e){if(!this._bridge?.hasBridge||e.attached||e._disposed)return;let r=this._resolveHostEventName(e.rawKey);if(!r){St.warn("\u65E0\u6CD5\u89E3\u6790\u5BBF\u4E3B\u4E8B\u4EF6\u540D",{rawKey:e.rawKey});return}let{eventSource:s}=this._bridge,o=typeof s?.on=="function"?s.on.bind(s):typeof s?.addListener=="function"?s.addListener.bind(s):null,n=typeof s?.off=="function"?s.off.bind(s):typeof s?.removeListener=="function"?s.removeListener.bind(s):null;if(!o||!n){St.warn("\u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5");return}try{o(r,e.handler),e.attached=!0,e._hostName=r,e._hostUnsubscribe=()=>{try{n(r,e.handler)}catch(a){St.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:r,error:a})}},St.debug(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${r}" (key=${e.key})`)}catch(a){St.error(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6\u5931\u8D25: "${r}"`,{error:a})}}},Ot=new Gl});var Ny={};se(Ny,{ContextInjector:()=>Ca,DEFAULT_INJECTION_OPTIONS:()=>Py,WRITEBACK_METHODS:()=>Ht,WRITEBACK_RESULT_STATUS:()=>Aa,contextInjector:()=>_t,default:()=>tw});function Vl(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function Es(t,e){let r=String(e||"").trim();return r?Array.isArray(t)?(t.includes(r)||t.push(r),t):[r]:t}function Ea(t={}){if(t?.signal?.aborted)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE";if(typeof t?.shouldAbortWriteback=="function")try{if(t.shouldAbortWriteback()===!0)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}catch{return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}return""}var ot,gt,xo,Py,Aa,Ht,Zx,ew,Ca,_t,tw,As=N(()=>{Ye();W();ql();ot=I.createScope("ContextInjector"),gt="YouYouToolkit_toolOutputs",xo="YouYouToolkit_injectedContext",Py={overwrite:!0,enabled:!0};Aa={SUCCESS:"success",FAILED:"failed"},Ht={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},Zx=60,ew=3;Ca=class{constructor(){this.debugMode=!1}async inject(e,r,s={}){return(await this.injectDetailed(e,r,s)).success}async injectDetailed(e,r,s={}){let o={...Py,...s},n=this._createWritebackResult(e,o);if(!e||r===void 0||r===null)return ot.error("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),n.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",n;if(!Vl(o.sourceMessageId))return ot.error("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),n.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",n;if(o?.signal?.aborted)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",n;if(typeof o?.shouldAbortWriteback=="function")try{if(o.shouldAbortWriteback()===!0)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}catch{return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}let a=n.chatId,i={toolId:e,content:String(r),updatedAt:Date.now(),sourceMessageId:o.sourceMessageId||null,sourceSwipeId:o.sourceSwipeId||o.effectiveSwipeId||null,options:o};K.emit(O.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:i.content,sourceMessageId:i.sourceMessageId,sourceSwipeId:i.sourceSwipeId,effectiveSwipeId:i.sourceSwipeId,slotBindingKey:o.slotBindingKey||"",slotRevisionKey:o.slotRevisionKey||"",slotTransactionId:o.slotTransactionId||"",traceId:o.traceId||"",sessionKey:o.sessionKey||"",options:o});let l=await this._insertToolOutputToBoundAssistantSlot(e,i,o,n);return l.success&&ot.info(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,{inserted:l}),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:r}=this._getChatRuntime(),s=this._findAssistantMessageIndex(r,e);if(s<0)return"";let o=r[s]||{},n=o[xo];if(typeof n=="string"&&n.trim())return n.trim();let a=o[gt];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(r){return ot.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",{error:r}),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),r=this._findAssistantMessageIndex(e,null);if(r<0)return{};let o=(e[r]||{})[gt];return o&&typeof o=="object"?o:{}}catch(e){return ot.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",{error:e}),{}}}getToolContext(e,r){if(!r)return null;try{let{chat:s}=this._getChatRuntime(),o=this._findAssistantMessageIndex(s,null);return o<0?null:s[o]?.[gt]?.[r]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,r){if(!r)return!1;try{let{api:s,context:o,chat:n}=this._getChatRuntime(),a=this._findAssistantMessageIndex(n,null);if(a<0)return!1;let i=n[a],l=i?.[gt];if(!l||!l[r])return!1;delete l[r],i[gt]=l,i[xo]=this._buildMessageInjectedContext(l);let c=o?.saveChat||s?.saveChat||null;return typeof c=="function"&&await c.call(o||s),K.emit(O.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:r}),!0}catch(s){return ot.warn("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:s}),!1}}async clearAllContext(e){try{let{api:r,context:s,chat:o}=this._getChatRuntime(),n=this._findAssistantMessageIndex(o,null);if(n<0)return!1;let a=o[n];delete a[gt],delete a[xo];let i=s?.saveChat||r?.saveChat||null;return typeof i=="function"&&await i.call(s||r),K.emit(O.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(r){return ot.warn("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:r}),!1}}clearAllChatsContexts(){ot.info("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,r){return!!this.getToolContext(e,r)}getContextSummary(e){let r=this._getLatestAssistantMessageOutputs(),s=Object.entries(r).map(([o,n])=>({toolId:o,updatedAt:n.updatedAt,contentLength:n.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:s,totalCount:s.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,r={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,r=e.SillyTavern||null,s=r?.getContext?.()||null,o=Array.isArray(s?.chat)?s.chat:[],n=Array.isArray(r?.chat)?r.chat:[],a=o.length?o:n;return{topWindow:e,api:r,context:s,chat:a,contextChat:o,apiChat:n}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,r={}){let s=Ht.SET_CHAT_MESSAGES;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:r.traceId||"",sessionKey:r.sessionKey||"",sourceMessageId:r.sourceMessageId||null,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId||null,effectiveSwipeId:r.effectiveSwipeId||r.sourceSwipeId||null,slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:Ht.NONE,commit:{preferredMethod:s,attemptedMethods:[],appliedMethod:Ht.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:"",eventSource:"",eventName:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:Aa.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(r=>setTimeout(r,e))}_collectWritebackVerification(e,r,s,o,n,a=null){let i=e?.contextChat?.[s]||e?.apiChat?.[s]||r?.[s]||a||null,l=this._getWritableMessageField(i).text||"",c=i?.[gt]?.[o],d=n?l.includes(n):!0,u=!!(c&&String(c.content||"").trim()===n);return{latestMessage:i,latestText:l,textIncludesContent:d,mirrorStored:u}}async _confirmRefresh(e,r,s,o,n,a=null){let i=1,l=this._collectWritebackVerification(e,r,s,o,n,a);for(let c=0;c<ew;c+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:i,confirmedBy:"text_and_mirror_present"};await this._wait(Zx),i+=1,l=this._collectWritebackVerification(e,r,s,o,n,a)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:i,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}async _requestAssistantMessageRefresh(e,r,s,o={},n=null){let a=n||this._createWritebackResult("",o),{api:i,context:l}=e||{},c=e?.topWindow||(typeof window.parent<"u"&&window.parent!==window?window.parent:window),d=c?.TavernHelper?.setChatMessages||l?.setChatMessages||i?.setChatMessages||c?.setChatMessages||null;a.commit.preferredMethod=typeof d=="function"?Ht.SET_CHAT_MESSAGES:Ht.LOCAL_ONLY;let u=!1,y=Ea(o);if(y)return a.error=y,a;if(typeof d=="function"){Es(a.commit.attemptedMethods,Ht.SET_CHAT_MESSAGES);try{let p=Ea(o);if(p)return a.error=p,a;let g=Vl(o.sourceMessageId)||r;await d([{message_id:g,message:s}],{refresh:"affected"}),a.steps.hostSetChatMessages=!0,a.hostUpdateMethod=Ht.SET_CHAT_MESSAGES,a.hostCommitApplied=!0,a.commit.appliedMethod=Ht.SET_CHAT_MESSAGES,a.commit.hostCommitApplied=!0,u=!0}catch(p){ot.error("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",{error:p}),a.errors.push(`setChatMessages: ${p?.message||String(p)}`)}}return u&&(a.refreshRequested=!0,Es(a.refresh.requestMethods,a.hostUpdateMethod)),u||(Es(a.commit.attemptedMethods,Ht.LOCAL_ONLY),a.commit.appliedMethod=Ht.LOCAL_ONLY,a.commit.fallbackUsed=!0,a.hostUpdateMethod=a.commit.appliedMethod),a}_inferBlockType(e){let r=String(e||"").trim();if(!r)return"empty";let s=r.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return s?.[1]?s[1]:"plain_text"}_stripExactStoredBlock(e,r,s=""){let o=String(e||""),n=String(r||"").trim(),a=String(s||"").trim();return n?o.includes(n)?a?{text:o.replace(n,a).trimEnd(),removed:!0,replaced:!0}:{text:o.replace(n,"").trimEnd(),removed:!0,replaced:!1}:{text:o,removed:!1,replaced:!1}:{text:o,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,r,s){let{contextChat:o,apiChat:n}=e||{},a=i=>{!Array.isArray(i)||r<0||r>=i.length||i[r]!==s&&(i[r]={...i[r]||{},...s})};a(o),a(n)}_notifyMessageUpdated(e,r,s={}){if(s.skipNotify===!0)return{emitted:!1,source:"skipped_by_caller",eventName:""};try{let o=Ot.describe(),n=e?.topWindow||Sa();return o.hasBridge?(Ot.emit(Fe.MESSAGE_UPDATED,r),typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(()=>{Ot.emit(Fe.MESSAGE_UPDATED,r)}):typeof n?.setTimeout=="function"&&n.setTimeout(()=>{Ot.emit(Fe.MESSAGE_UPDATED,r)},30),{emitted:!0,source:o.source||"unavailable",eventName:Fe.MESSAGE_UPDATED}):{emitted:!1,source:o.source||"unavailable",eventName:Fe.MESSAGE_UPDATED}}catch(o){return ot.warn("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",{error:o}),{emitted:!1,source:"error",eventName:"",error:o?.message||String(o)}}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let r=String(e.role||"").toLowerCase();return r==="assistant"||r==="ai"||!r}_findAssistantMessageIndex(e,r){let s=Array.isArray(e)?e:[];if(!s.length)return-1;let o=r!=null&&r!=="",n=(a,i)=>{if(!this._isAssistantMessage(a)||r==null||r==="")return!1;let l=String(r).trim();return l?[a.message_id,a.id,a.messageId,a.mes_id,i].map(d=>d==null?"":String(d).trim()).includes(l):!1};for(let a=s.length-1;a>=0;a-=1)if(n(s[a],a))return a;if(o)return-1;for(let a=s.length-1;a>=0;a-=1)if(this._isAssistantMessage(s[a]))return a;return-1}_buildMessageInjectedContext(e){let s=Object.entries(e&&typeof e=="object"?e:{}).filter(([,n])=>n?.blockType!=="full_message").sort(([,n],[,a])=>(n?.updatedAt||0)-(a?.updatedAt||0));if(!s.length)return"";let o=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[n,a]of s)o.push(`[${n}]`),o.push(a?.content||""),o.push("");return o.join(`
`)}_getWritableMessageField(e){let r=["mes","message","content","text"];for(let s of r)if(typeof e?.[s]=="string")return{key:s,text:e[s]};return{key:"mes",text:""}}_applyMessageText(e,r,s={}){let o=e&&typeof e=="object"?e:{},n=["mes","message","content","text"],a=!1;if(n.forEach(i=>{typeof o[i]=="string"&&(o[i]=r,a=!0)}),a||(o.mes=r,o.message=r),Array.isArray(o.swipes)){let i=Number.parseInt(Vl(s?.sourceSwipeId||s?.effectiveSwipeId),10),l=Number.isInteger(i)?i:Number.isInteger(o.swipe_id)?o.swipe_id:Number.isInteger(o.swipeId)?o.swipeId:0;l>=0&&l<o.swipes.length&&(o.swipes[l]=r,o.swipe_id=l,o.swipeId=l)}return o}_stripExistingToolOutput(e,r=[]){let s=String(e||"");return(Array.isArray(r)?r:[]).forEach(n=>{let a=String(n||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let d=new RegExp(a.slice(6).trim(),"gis");s=s.replace(d,"")}catch(d){ot.warn("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",{value:a,error:d})}return}let i=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),c=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");s=s.replace(l,""),s=s.replace(c,"")}),s.trimEnd()}_stripPreviousStoredToolContent(e,r){let s=String(e||""),o=String(r||"").trim();return o?s.replace(o,"").trimEnd():s.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,r,s={},o=null){let n=o||this._createWritebackResult(e,s);try{let a=this._getChatRuntime(),{context:i,chat:l}=a;if(!Array.isArray(l)||!l.length)return ot.error("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),n.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",n;let c=this._findAssistantMessageIndex(l,s.sourceMessageId);if(c<0)return ot.error("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),n.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",n;if(s?.signal?.aborted)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",n;if(typeof s?.shouldAbortWriteback=="function")try{if(s.shouldAbortWriteback()===!0)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}catch{return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}n.messageIndex=c,n.steps.foundTargetMessage=!0;let d=l[c],{key:u,text:y}=this._getWritableMessageField(d);n.textField=u;let p=d[gt]&&typeof d[gt]=="object"?d[gt]:{},g=p?.[e]||{},f=g?.content||"",h=g?.blockText||f||"",x=Object.entries(p).filter(([He])=>He!==e).map(([,He])=>He||{}),T=String(r.content||"").trim(),v=s.replaceFullMessage===!0,z=v?"full_message":this._inferBlockType(T),M={toolId:e,messageId:s.sourceMessageId||d?.message_id||d?.messageId||c,blockType:z,insertedAt:r.updatedAt,replaceable:s.overwrite!==!1};n.blockIdentity=M;let S=s.overwrite===!1||v?{text:String(y||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(y,h,T),E=S.text,G="";!v&&s.overwrite!==!1&&h&&!S.removed&&(G="previous_block_not_found");let q=s.overwrite===!1||S.replaced||v?E:this._stripExistingToolOutput(E,s.extractionSelectors),$=q!==E;E=q;let A=s.overwrite===!1||S.replaced||v?E:this._stripPreviousStoredToolContent(E,f),J=A!==E;E=A,n.replacedExistingBlock=v||S.removed||$||J;let U=s.overwrite===!1?String(y||""):E,ee=v?T:S.replaced?E.trim():[U.trimEnd(),T].filter(Boolean).join(`

`).trim();n.insertedNewBlock=!!T;let ye=x.every(He=>{if(He?.blockType==="full_message")return!0;let lr=String(He?.blockText||He?.content||"").trim();return lr?ee.includes(lr):!0});n.preservedOtherToolBlocks=ye,ye?G&&(n.conflictDetected=!0,n.conflictReason=G):(n.conflictDetected=!0,n.conflictReason="other_tool_block_removed");let Te={...p,[e]:{toolId:e,content:T,blockText:T,blockType:z,blockIdentity:M,updatedAt:r.updatedAt,sourceMessageId:r.sourceMessageId||null}},ue=Ea(s);if(ue)return n.error=ue,n;d[u]=ee,this._applyMessageText(d,ee,s),d[gt]=Te,d[xo]=this._buildMessageInjectedContext(Te),n.contentCommitted=!0,n.commit.contentCommitted=!0,n.steps.contentCommitted=!0,n.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,c,d),n.steps.runtimeSynced=!0;let Ze=Ea(s);if(Ze)return n.error=Ze,n;await this._requestAssistantMessageRefresh(a,c,ee,s,n);let Ve=i?.saveChat||a?.api?.saveChat||null,j=i?.saveChatDebounced||a?.api?.saveChatDebounced||null;typeof j=="function"&&(j.call(i||api),n.steps.saveChatDebounced=!0,n.refreshRequested=!0,Es(n.refresh.requestMethods,"saveChatDebounced")),typeof Ve=="function"&&(await Ve.call(i||api),n.steps.saveChat=!0,n.refreshRequested=!0,Es(n.refresh.requestMethods,"saveChat"));let le=this._notifyMessageUpdated(a,c,s);n.steps.notifiedMessageUpdated=le?.emitted===!0,n.refresh.eventSource=le?.source||"",n.refresh.eventName=le?.eventName||"",le?.error&&n.errors.push(`MESSAGE_UPDATED: ${le.error}`);let $e=String(r.content||"").trim();(n.steps.hostSetChatMessages||n.steps.hostSetChatMessage)&&(n.refreshRequested=!0,Es(n.refresh.requestMethods,n.hostUpdateMethod)),n.steps.notifiedMessageUpdated&&(n.refreshRequested=!0,Es(n.refresh.requestMethods,`MESSAGE_UPDATED:${n.refresh.eventName||"MESSAGE_UPDATED"}`)),n.steps.refreshRequested=n.refreshRequested,n.refresh.requested=n.refreshRequested;let kt=await this._confirmRefresh(a,l,c,e,$e,d);return n.verification.textIncludesContent=kt.textIncludesContent,n.verification.mirrorStored=kt.mirrorStored,n.verification.refreshConfirmed=kt.refreshConfirmed,n.steps.verifiedAfterWrite=n.verification.textIncludesContent&&n.verification.mirrorStored,n.refreshConfirmed=n.verification.refreshConfirmed&&n.refreshRequested,n.refresh.confirmChecks=Number(kt.confirmChecks)||0,n.refresh.confirmedBy=kt.confirmedBy||"",n.refresh.confirmed=n.refreshConfirmed,n.steps.refreshConfirmed=n.refreshConfirmed,n.success=n.steps.localTextApplied&&n.steps.runtimeSynced&&n.steps.verifiedAfterWrite&&n.refreshConfirmed,n.writebackStatus=n.success?Aa.SUCCESS:Aa.FAILED,!n.success&&!n.error&&(n.error=n.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),n.conflictDetected&&!n.error&&(n.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${n.conflictReason}`),ot.info(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${c}`),n}catch(a){return ot.error("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",{error:a}),n.error=a?.message||String(a),n.errors.push(n.error),n}}getAssistantMessageSnapshot(e=null){try{let r=this._getChatRuntime(),{chat:s}=r,o=this._findAssistantMessageIndex(s,e);if(o<0)return null;let n=s[o]||null,a=this._getWritableMessageField(n).text||"",i=n?.[gt]&&typeof n[gt]=="object"?n[gt]:{},l=Object.values(i).reduce((c,d)=>{let u=String(d?.blockText||d?.content||"").trim();return!u||!c.includes(u)?c:c.replace(u,"").trimEnd()},String(a||"")).trim();return{messageIndex:o,message:n,messageText:a,baseText:l,toolOutputs:i,injectedContext:typeof n?.[xo]=="string"?n[xo]:this._buildMessageInjectedContext(i)}}catch(r){return ot.warn("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",{error:r}),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext(),o=[r?.chatId,r?.chat_id,r?.chat_filename,r?.chatMetadata?.chatId,r?.chatMetadata?.chat_id,r?.chatMetadata?.file_name,r?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(o)return o;let n=e.SillyTavern?.this_chid;if(n!=null)return`chat_char_${n}`}return"chat_default"}catch{return"chat_default"}}},_t=new Ca,tw=_t});var $y={};se($y,{BUILTIN_VARIABLES:()=>Dy,VariableResolver:()=>ka,default:()=>sw,variableResolver:()=>Bt});var rw,Dy,ka,Bt,sw,Ia=N(()=>{Ye();W();rw=I.createScope("VariableResolver"),Dy={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},ka=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,r){if(typeof e!="string")return e;let s=e;return s=this._resolveBuiltinVariables(s,r),s=this._resolveCustomVariables(s,r),s=this._resolveRegexVariables(s,r),s}resolveObject(e,r){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(o=>this.resolveObject(o,r));let s={};for(let[o,n]of Object.entries(e))typeof n=="string"?s[o]=this.resolveTemplate(n,r):typeof n=="object"&&n!==null?s[o]=this.resolveObject(n,r):s[o]=n;return s}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,r){e&&(this.customVariables.set(e,r),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,r){!e||typeof r!="function"||(this.variableHandlers.set(e,r),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,r]of Object.entries(Dy))e.push({name:`{{${r.name}}}`,description:r.description,category:r.category,type:"builtin"});for(let[r,s]of this.customVariables)e.push({name:`{{${r}}}`,description:typeof s=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],r={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},s={};for(let o of this.getAvailableVariables())s[o.category]||(s[o.category]=[]),s[o.category].push(o);for(let[o,n]of Object.entries(r))if(s[o]&&s[o].length>0){e.push(`\u3010${n}\u3011`);for(let a of s[o])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,r)=>(r.regexResults||r.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,r){let s=e;return s=s.replace(/\{\{lastUserMessage\}\}/gi,r.lastUserMessage||r.raw?.lastUserMessage||""),s=s.replace(/\{\{lastAiMessage\}\}/gi,r.lastAiMessage||r.raw?.lastAiMessage||""),s=s.replace(/\{\{chatHistory\}\}/gi,()=>{let o=r.chatHistory||r.raw?.chatHistory||[];return this._formatChatHistory(o)}),s=s.replace(/\{\{characterCard\}\}/gi,()=>{let o=r.characterCard||r.raw?.characterCard;return o?this._formatCharacterCard(o):""}),s=s.replace(/\{\{toolName\}\}/gi,r.toolName||r.raw?.toolName||""),s=s.replace(/\{\{toolId\}\}/gi,r.toolId||r.raw?.toolId||""),s=s.replace(/\{\{toolPromptMacro\}\}/gi,r.toolPromptMacro||r.raw?.toolPromptMacro||""),s=s.replace(/\{\{toolContentMacro\}\}/gi,r.toolContentMacro||r.raw?.toolContentMacro||""),s=s.replace(/\{\{toolWorldbookContent\}\}/gi,r.toolWorldbookContent||r.raw?.toolWorldbookContent||""),s=s.replace(/\{\{injectedContext\}\}/gi,r.injectedContext||r.raw?.injectedContext||""),s=s.replace(/\{\{extractedContent\}\}/gi,r.extractedContent||r.raw?.extractedContent||""),s=s.replace(/\{\{recentMessagesText\}\}/gi,r.recentMessagesText||r.raw?.recentMessagesText||""),s=s.replace(/\{\{rawRecentMessagesText\}\}/gi,r.rawRecentMessagesText||r.raw?.rawRecentMessagesText||""),s=s.replace(/\{\{userMessage\}\}/gi,r.userMessage||r.raw?.userMessage||""),s=s.replace(/\{\{previousToolOutput\}\}/gi,r.previousToolOutput||r.raw?.previousToolOutput||""),s}_resolveCustomVariables(e,r){let s=e;for(let[o,n]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(o)}\\}\\}`,"gi");typeof n=="function"?s=s.replace(a,()=>{try{return n(r)}catch(i){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}:`,i),""}}):s=s.replace(a,String(n))}return s}_resolveRegexVariables(e,r){let s=e;for(let[o,n]of this.variableHandlers){let a=new RegExp(`\\{\\{${o}\\.([^}]+)\\}\\}`,"gi");s=s.replace(a,(i,l)=>{try{return n(l,r)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}.${l}:`,c),""}})}return s}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(r=>{let s=r.role||"unknown",o=r.content||r.mes||"";return`[${s}]: ${o}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let r=[];return e.name&&r.push(`\u59D3\u540D: ${e.name}`),e.description&&r.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&r.push(`\u6027\u683C: ${e.personality}`),e.scenario&&r.push(`\u573A\u666F: ${e.scenario}`),r.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){rw.debug(e[0],e.length>1?e.slice(1):void 0)}},Bt=new ka,sw=Bt});var Oy={};se(Oy,{DEFAULT_PROMPT_TEMPLATE:()=>Ly,ToolPromptService:()=>Ma,default:()=>nw,toolPromptService:()=>Cs});var ow,Ly,Ma,Cs,nw,Ra=N(()=>{Ye();bo();Ia();Yn();W();ow=I.createScope("ToolPromptService"),Ly="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",Ma=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,r={}){let s=this._getPromptTemplate(e),o=String(r?.toolWorldbookContent||r?.input?.toolWorldbookContent||await Hn(e)).trim(),n=Bt.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolWorldbookContent:o}),a=Bt.resolveTemplate(s,n).trim(),i=String(r?.toolContentMacro||r?.input?.toolContentMacro||"").trim();return Bt.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolPromptMacro:a,toolContentMacro:i,toolWorldbookContent:o})}async buildToolMessages(e,r){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let s=[],o=await this._buildVariableContext(e,r),n=Array.isArray(e.promptMessages)?e.promptMessages:[],a=this._getBypassMessages(e),i=a?.some(l=>l.mainSlot==="A"||l.mainSlot==="B"||l.isMain||l.isMain2);if(a&&a.length>0)for(let l of a)l.enabled!==!1&&s.push({role:this._normalizeRole(l.role),content:Bt.resolveTemplate(l.content||"",o)});if(!i&&n.length>0)for(let l of n){let c=Bt.resolveTemplate(l?.content||"",o).trim();c&&s.push({role:this._normalizeRole(l?.role),content:c})}else if(!i&&!a?.length){let l=this._buildUserContent(this._getPromptTemplate(e),o);l&&s.push({role:"user",content:l})}return this._log(`\u6784\u5EFA\u6D88\u606F: ${s.length} \u6761`),s}async buildPromptText(e,r){let s=await this._buildVariableContext(e,r),o=Array.isArray(e?.promptMessages)?e.promptMessages:[];return o.length>0?o.map(n=>Bt.resolveTemplate(n?.content||"",s).trim()).filter(Boolean).join(`

`):s.toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:Ly}_getBypassMessages(e){return e.bypass?.enabled?ie.buildBypassMessages(e):[]}_buildUserContent(e,r){return!e||!e.trim()?"":Bt.resolveTemplate(e,r).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){ow.debug(e[0],e.length>1?e.slice(1):void 0)}setDebugMode(e){this.debugMode=e}},Cs=new Ma,nw=Cs});var zy={};se(zy,{LEGACY_OUTPUT_MODES:()=>aw,OUTPUT_MODES:()=>Et,TOOL_FAILURE_STAGES:()=>We,TOOL_RUNTIME_STATUS:()=>iw,TOOL_WRITEBACK_STATUS:()=>De,ToolOutputService:()=>Pa,default:()=>lw,toolOutputService:()=>At});function By(t){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}function wo(t=[],e="",r=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!r,contentCommitted:!!r?.contentCommitted,hostCommitApplied:!!r?.hostCommitApplied,writebackStatus:r?.writebackStatus||"",preferredCommitMethod:r?.commit?.preferredMethod||"",appliedCommitMethod:r?.commit?.appliedMethod||"",fallbackUsed:!!r?.commit?.fallbackUsed},refresh:{requested:!!r?.refreshRequested,confirmed:!!r?.refreshConfirmed,requestMethods:Array.isArray(r?.refresh?.requestMethods)?[...r.refresh.requestMethods]:[],confirmChecks:Number(r?.refresh?.confirmChecks)||0,confirmedBy:r?.refresh?.confirmedBy||""}}}var ks,Et,aw,iw,We,De,Pa,At,lw,yn=N(()=>{Ye();pn();W();As();Ra();Hs();hs();Rn();ks=I.createScope("ToolOutputService"),Et={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api",LOCAL_TRANSFORM:"local_transform"},aw={inline:"follow_ai"},iw={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},We={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},De={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};Pa=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Et.POST_RESPONSE_API}shouldRunLocalTransform(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Et.LOCAL_TRANSFORM||!!e.processor?.type}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let r=e.output?.mode;return r===Et.FOLLOW_AI||r==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,r){let s=Date.now(),o=e.id,n=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=this._getExtractionSelectors(e),c=e.output?.apiPreset||e.apiPreset||"",d="",u=De.NOT_APPLICABLE,y=null,p=[],g="";ks.info(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${o}`),K.emit(O.TOOL_EXECUTION_STARTED,{toolId:o,traceId:n,sessionKey:a,mode:Et.POST_RESPONSE_API});try{if(d=We.BUILD_MESSAGES,p=await this._buildToolMessages(e,r),!p||p.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");ks.debug(`\u6784\u5EFA\u4E86 ${p.length} \u6761\u6D88\u606F`);let f=By(r);if(f){let z=Date.now()-s;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:z,meta:{traceId:n,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:c,writebackStatus:u,failureStage:d,writebackDetails:y,aborted:f.aborted===!0,stale:f.stale===!0,abortReason:f.reason||"",phases:wo(p,g,y)}}}let h=await this._getRequestTimeout();d=We.SEND_API_REQUEST;let x=await this._sendApiRequest(c,p,{timeoutMs:h,signal:r.signal});d=We.EXTRACT_OUTPUT,g=this._extractOutputContent(x,e);let T=By(r);if(T){let z=Date.now()-s;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:z,meta:{traceId:n,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:c,writebackStatus:u,failureStage:d,writebackDetails:y,aborted:T.aborted===!0,stale:T.stale===!0,abortReason:T.reason||"",phases:wo(p,g,y)}}}if(g){if(d=We.INJECT_CONTEXT,y=await _t.injectDetailed(o,g,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:l,traceId:n,sessionKey:a,signal:r.signal,shouldAbortWriteback:r.shouldAbortWriteback,isAutoRun:r.isAutoRun===!0,skipNotify:r.skipNotify===!0}),!y?.success)throw u=De.FAILED,new Error(y?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=De.SUCCESS}else u=De.SKIPPED_EMPTY_OUTPUT;d="";let v=Date.now()-s;return K.emit(O.TOOL_EXECUTED,{toolId:o,traceId:n,sessionKey:a,success:!0,duration:v,mode:Et.POST_RESPONSE_API}),ks.info(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${o}, \u8017\u65F6 ${v}ms`),{success:!0,toolId:o,output:g,duration:v,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:p.length,selectors:l,apiPreset:c,writebackStatus:u,failureStage:"",writebackDetails:y,phases:wo(p,g,y)}}}catch(f){let h=Date.now()-s,x=d||We.UNKNOWN,T=u||De.NOT_APPLICABLE;return ks.error(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${o}`,{error:f}),K.emit(O.TOOL_EXECUTION_FAILED,{toolId:o,traceId:n,sessionKey:a,error:f.message||String(f),duration:h}),{success:!1,toolId:o,error:f.message||String(f),duration:h,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:p.length,selectors:l,apiPreset:c,writebackStatus:T,failureStage:x,writebackDetails:y,phases:wo(p,g,y)}}}}async runToolFollowAiManual(e,r){let s=Date.now(),o=e.id,n=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=e.output?.apiPreset||e.apiPreset||"",c=this._getExtractionSelectors(e),d="",u=De.NOT_APPLICABLE,y=null,p=[],g="";K.emit(O.TOOL_EXECUTION_STARTED,{toolId:o,traceId:n,sessionKey:a,mode:Et.FOLLOW_AI});try{if(d=We.BUILD_MESSAGES,p=await this._buildToolMessages(e,r),!p||p.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");let f=await this._getRequestTimeout();d=We.SEND_API_REQUEST;let h=await this._sendApiRequest(l,p,{timeoutMs:f,signal:r.signal});if(d=We.EXTRACT_OUTPUT,g=this._extractOutputContent(h,e),g){if(d=We.INJECT_CONTEXT,y=await _t.injectDetailed(o,g,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:c,traceId:n,sessionKey:a}),!y?.success)throw u=De.FAILED,new Error(y?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=De.SUCCESS}else u=De.SKIPPED_EMPTY_OUTPUT;d="";let x=Date.now()-s;return K.emit(O.TOOL_EXECUTED,{toolId:o,traceId:n,sessionKey:a,success:!0,duration:x,mode:Et.FOLLOW_AI}),{success:!0,toolId:o,output:g,duration:x,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:p.length,selectors:c,apiPreset:l,writebackStatus:u,failureStage:"",writebackDetails:y,phases:wo(p,g,y)}}}catch(f){let h=Date.now()-s,x=d||We.UNKNOWN,T=u||De.NOT_APPLICABLE;return K.emit(O.TOOL_EXECUTION_FAILED,{toolId:o,traceId:n,sessionKey:a,error:f.message||String(f),duration:h,mode:Et.FOLLOW_AI}),{success:!1,toolId:o,error:f.message||String(f),duration:h,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:p.length,selectors:c,apiPreset:l,writebackStatus:T,failureStage:x,writebackDetails:y,phases:wo(p,g,y)}}}}async runToolInline(e,r){return this.runToolFollowAiManual(e,r)}async previewExtraction(e,r){return{success:!0,...this.getExtractionSnapshot(e,r)}}getExtractionSnapshot(e,r){let s=this._buildRecentMessageExtractionEntries(e,r),o=this._joinMessageBlocks(s,"rawText"),n=this._joinMessageBlocks(s,"filteredText"),a=this._joinMessageBlocks(s,"extractedText",{skipEmpty:!0}),i=(Array.isArray(s)?s:[]).map(c=>String(c?.extractedText||"").trim()).filter(Boolean).join(`

`),l=Array.isArray(s)&&s.length>0?s[s.length-1]:null;return{sourceText:o,filteredSourceText:n,extractedText:a,extractedRawText:i,messageEntries:s,primaryEntry:l,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,r){let s=this._buildRecentMessageExtractionEntries(e,r),o=this._joinMessageBlocks(s,"rawText"),n=this._joinMessageBlocks(s,"filteredText"),a=this._joinMessageBlocks(s,"extractedText",{skipEmpty:!0}),i={...r,rawRecentMessagesText:o,recentMessagesText:n,extractedContent:a,toolContentMacro:this._buildToolContentMacro(s),toolName:e.name,toolId:e.id};return Cs.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let r=String(e).toLowerCase();return r==="system"?"system":r==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,r,s={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:o=9e4,signal:n}=s,a=null;if(e){if(!Ro(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=Mo(e)}else a=Mo();let i=Mn(a||{});if(!i.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(r,{timeoutMs:o,apiConfig:a},n);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Lt.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,r){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,r);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,r);if(e.content)return this._applyOutputExtractionSelectors(e.content,r);if(e.text)return this._applyOutputExtractionSelectors(e.text,r);if(e.message)return this._applyOutputExtractionSelectors(e.message,r);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),r)}catch{return this._applyOutputExtractionSelectors(String(e),r)}}return this._applyOutputExtractionSelectors(String(e),r)}_applyOutputExtractionSelectors(e,r){let s=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(r);if(!o.length)return s.trim();let n=[];for(let a of o){let i=String(a||"").trim();if(!i)continue;if(i.startsWith("regex:")){let c=i.slice(6).trim();if(!c)continue;try{let d=new RegExp(c,"gi");[...s.matchAll(d)].forEach(y=>{let p=String(y?.[0]||"").trim();p&&n.push(p)})}catch(d){ks.warn("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:d})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(s.match(c)||[]).forEach(u=>{let y=String(u||"").trim();y&&n.push(y)})}catch(c){ks.warn("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}}return n.length>0?n.join(`

`).trim():s.trim()}_resolveExtractionContext(e){let r=e?.extraction?.regexPresetId;if(!r)return{rules:[],blacklist:[]};try{let s=mr(r);if(!s)return{rules:[],blacklist:[]};let o=Array.isArray(s.rules)?s.rules.filter(a=>a&&a.enabled!==!1&&a.value).map(a=>({id:a.id,type:a.type,value:a.value,enabled:!0})):[],n=Array.isArray(s.blacklist)?s.blacklist.map(a=>String(a||"").trim()).filter(Boolean):[];return{rules:o,blacklist:n}}catch(s){return this._log("warn","_resolveExtractionContext \u5F02\u5E38",{error:s}),{rules:[],blacklist:[]}}}_getExtractionSelectors(e){let{rules:r}=this._resolveExtractionContext(e),s=[];for(let o of r){let n=String(o.value||"").trim();n&&(o.type==="include"?s.push(n):o.type==="regex_include"&&s.push(`regex:${n}`))}return s}_applyExtractionSelectors(e,r){return this._applyExtractionSelectorsInternal(e,r,{strict:!1})}_applyExtractionSelectorsInternal(e,r,s={}){let o=typeof e=="string"?e:String(e||""),{rules:n,blacklist:a}=this._resolveExtractionContext(r),{strict:i=!1}=s;if(!n.length)return o.trim();let l=fr(o,n,a||[]);return i?(l||"").trim():l||o.trim()}_extractToolContent(e,r){let s=typeof r=="string"?r:String(r||""),{rules:o}=this._resolveExtractionContext(e);return o.length?this._applyExtractionSelectorsInternal(s,e,{strict:!0}):s.trim()}_applyGlobalContextRules(e){let r=typeof e=="string"?e:String(e||"");if(!r.trim())return"";try{let s=Fs()||[],o=Ws()||[];return!Array.isArray(s)||s.length===0?r.trim():fr(r,s,o)||r.trim()}catch(s){return ks.warn("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",{error:s}),r.trim()}}_getMessageText(e){if(!e)return"";let r=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let s of r)if(typeof s=="string"&&s.trim())return s.trim();return""}_collectRecentAssistantMessages(e,r){return this._collectRecentAssistantMessageEntries(e,r).map(s=>s.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,r){let s=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),o=Array.isArray(r?.chatMessages)?r.chatMessages:[],n=[];for(let i=o.length-1;i>=0&&n.length<s;i-=1){let l=o[i],c=String(l?.role||"").toLowerCase(),d=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,u=this._getMessageText(l);d&&u&&n.unshift({text:u,message:l,chatIndex:i})}if(n.length>0)return n;let a=r?.lastAiMessage||r?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,r){return this._collectRecentAssistantMessageEntries(e,r).map((o,n)=>{let a=o.text||"",i=this._applyGlobalContextRules(a),l=this._extractToolContent(e,a);return{...o,order:n+1,rawText:a,filteredText:i,extractedText:l,fullMessageText:a}})}_joinMessageBlocks(e,r,s={}){let o=Array.isArray(e)?e:[],{skipEmpty:n=!1}=s;return o.map(i=>{let l=String(i?.[r]||"").trim();return n&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(o=>{let n=`\u3010\u7B2C ${o?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(o?.filteredText||"").trim()||"(\u7A7A)",i=String(o?.extractedText||"").trim()||"(\u7A7A)";return`${n}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunInline(r)):[]}setDebugMode(e){this.debugMode=e}},At=new Pa,lw=At});function Uy(t={}){return!t||typeof t!="object"?{}:Object.entries(t).reduce((e,[r,s])=>(e[r]=s===!0,e),{})}function uw(t,e={}){let r=e?.direction==="unescape"?"unescape":"escape",s=Uy(e?.options);return cw.reduce((o,n)=>s[n.key]!==!0?o:r==="unescape"?o.replace(n.escaped,n.unescaped):o.replace(n.plain,n.replacement),String(t||""))}function pw(t,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(t||"");let s=Uy(e?.options);return dw.reduce((o,n)=>s[n.key]!==!0?o:o.replace(n.from,n.to),String(t||""))}function yw(t,e){let r=t?.processor||{},s=r?.type||"",o=String(e||"");switch(s){case Ky.ESCAPE_TRANSFORM:return uw(o,r);case Ky.PUNCTUATION_TRANSFORM:return pw(o,r);default:return o}}function fw(t,e,r){let s=String(t||""),o=String(e||"").trim(),n=String(r||"").trim();return!s.trim()||!o?{nextMessageText:"",replaced:!1}:s.includes(o)?{nextMessageText:s.replace(o,n).trim(),replaced:!0}:{nextMessageText:"",replaced:!1}}async function Na(t,e={}){let r=At.getExtractionSnapshot(t,e),s=r?.primaryEntry||null,o=String(s?.fullMessageText||e?.lastAiMessage||"").trim(),n=String(s?.extractedText||r?.extractedRawText||r?.extractedText||"").trim(),a=Array.isArray(r?.selectors)?r.selectors:[],i=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l=e?.sessionKey||"";if(!n||!o)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:De.NOT_APPLICABLE,failureStage:We.EXTRACT_OUTPUT,extraction:r}};let c=String(yw(t,n)||"").trim(),d=fw(o,n,c),u=d.replaced?d.nextMessageText:c,y=null,p=De.NOT_APPLICABLE;if(u){if(y=await _t.injectDetailed(t.id,u,{overwrite:!0,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:[],replaceFullMessage:d.replaced,traceId:i,sessionKey:l,skipNotify:e?.skipNotify===!0}),!y?.success)return{success:!1,error:y?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:De.FAILED,failureStage:We.INJECT_CONTEXT,writebackDetails:y,extraction:r}};p=De.SUCCESS}else p=De.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:c,writebackState:u?{committed:y?.contentCommitted===!0}:null,meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:p,failureStage:"",writebackDetails:y,extraction:r}}}var cw,dw,Ky,Jl=N(()=>{yn();As();cw=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],dw=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],Ky={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var Ql={};se(Ql,{abortAllTasks:()=>xw,abortTask:()=>bw,buildToolMessages:()=>Wy,clearExecutionHistory:()=>_w,createExecutionContext:()=>kw,createResult:()=>Da,enhanceMessagesWithBypass:()=>Iw,executeBatch:()=>hw,executeTool:()=>Fy,executeToolWithConfig:()=>Hy,executeToolsBatch:()=>Pw,executorState:()=>Pe,extractFailed:()=>Cw,extractSuccessful:()=>Aw,generateTaskId:()=>Is,getExecutionHistory:()=>Sw,getExecutorStatus:()=>Tw,getScheduler:()=>vo,mergeResults:()=>Ew,pauseExecutor:()=>ww,resumeExecutor:()=>vw,setMaxConcurrent:()=>mw});function Da(t,e,r,s,o,n,a=0){return{success:r,taskId:t,toolId:e,data:s,error:o,duration:n,retries:a,timestamp:Date.now(),metadata:{}}}function Is(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function gw(t,e={}){return{id:Is(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function vo(){return fn||(fn=new Xl(Pe.maxConcurrent)),fn}function mw(t){Pe.maxConcurrent=Math.max(1,Math.min(10,t)),fn&&(fn.maxConcurrent=Pe.maxConcurrent)}async function Fy(t,e={},r){let s=vo(),o=gw(t,e);for(;Pe.isPaused;)await new Promise(n=>setTimeout(n,100));try{let n=await s.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof r=="function")return await r(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},o);return jy(n),n}catch(n){let a=Da(o.id,t,!1,null,n,Date.now()-o.createdAt,o.retries);return jy(a),a}}async function hw(t,e={}){let{failFast:r=!1,concurrency:s=Pe.maxConcurrent}=e,o=[],n=vo(),a=n.maxConcurrent;n.maxConcurrent=s;try{let i=t.map(({toolId:l,options:c,executor:d})=>Fy(l,c,d));if(r)for(let l of i){let c=await l;if(o.push(c),!c.success){n.abortAll();break}}else{let l=await Promise.allSettled(i);for(let c of l)c.status==="fulfilled"?o.push(c.value):o.push(Da(Is(),"unknown",!1,null,c.reason,0,0))}}finally{n.maxConcurrent=a}return o}function bw(t){return vo().abort(t)}function xw(){vo().abortAll(),Pe.executionQueue=[]}function ww(){Pe.isPaused=!0}function vw(){Pe.isPaused=!1}function Tw(){return{...vo().getStatus(),isPaused:Pe.isPaused,activeControllers:Pe.activeControllers.size,historyCount:Pe.executionHistory.length}}function jy(t){Pe.executionHistory.push(t),Pe.executionHistory.length>100&&Pe.executionHistory.shift()}function Sw(t={}){let e=[...Pe.executionHistory];return t.toolId&&(e=e.filter(r=>r.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(r=>r.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function _w(){Pe.executionHistory=[]}function Ew(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let r of t)e.totalDuration+=r.duration,r.success?(e.successCount++,r.data!==void 0&&r.data!==null&&e.data.push(r.data)):(e.success=!1,e.failureCount++,r.error&&e.errors.push({taskId:r.taskId,toolId:r.toolId,error:r.error.message||String(r.error)}));return e}function Aw(t){return t.filter(e=>e.success).map(e=>e.data)}function Cw(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function kw(t={}){return{taskId:Is(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function Iw(t,e){return!e||e.length===0?t:[...e,...t]}function Mw(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Wy(t,e){let r=[],s=t.promptTemplate||"",o={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[n,a]of Object.entries(o))s=s.replace(new RegExp(Mw(n),"g"),a);return r.push({role:"USER",content:s}),r}async function Hy(t,e,r={}){let s=ne(t);if(!s)return{success:!1,taskId:Is(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!s.enabled)return{success:!1,taskId:Is(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let o=Date.now(),n=Is();try{K.emit(O.TOOL_EXECUTION_STARTED,{toolId:t,taskId:n,context:e});let a=Wy(s,e);if(typeof r.callApi=="function"){let i=s.output?.apiPreset||s.apiPreset||"",l=i?{preset:i}:null,c=await r.callApi(a,l,r.signal),d=c;s.outputMode==="separate"&&s.extractTags?.length>0&&(d=Rw(c,s.extractTags));let u={success:!0,taskId:n,toolId:t,data:d,duration:Date.now()-o};return K.emit(O.TOOL_EXECUTED,{toolId:t,taskId:n,result:u}),u}else return{success:!0,taskId:n,toolId:t,data:{messages:a,config:{apiPreset:s.output?.apiPreset||s.apiPreset||"",outputMode:s.outputMode,extractTags:s.extractTags}},duration:Date.now()-o,needsExecution:!0}}catch(a){let i={success:!1,taskId:n,toolId:t,error:a.message||String(a),duration:Date.now()-o};return K.emit(O.TOOL_EXECUTION_FAILED,{toolId:t,taskId:n,error:a}),i}}function Rw(t,e){let r={};for(let s of e){let o=new RegExp(`<${s}[^>]*>([\\s\\S]*?)<\\/${s}>`,"gi"),n=t.match(o);n&&(r[s]=n.map(a=>{let i=a.match(new RegExp(`<${s}[^>]*>([\\s\\S]*?)<\\/${s}>`,"i"));return i?i[1].trim():""}))}return r}async function Pw(t,e,r={}){let s=[];for(let o of t){let n=ne(o);if(n&&n.enabled){let a=await Hy(o,e,r);s.push(a)}}return s}var Pe,Xl,fn,Zl=N(()=>{er();Ye();Pe={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};Xl=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,r){return new Promise((s,o)=>{this.queue.push({executor:e,task:r,resolve:s,reject:o}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:r,task:s,resolve:o,reject:n}=e,a=new AbortController;s.abortController=a,s.status="running",s.startedAt=Date.now(),this.running.set(s.id,s),Pe.activeControllers.set(s.id,a),this.executeTask(r,s,a.signal).then(i=>{s.status="completed",s.completedAt=Date.now(),o(i)}).catch(i=>{s.status=i.name==="AbortError"?"aborted":"failed",s.completedAt=Date.now(),n(i)}).finally(()=>{this.running.delete(s.id),Pe.activeControllers.delete(s.id),Pe.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,r,s){let o=Date.now(),n=null;for(let a=0;a<=r.maxRetries;a++){if(s.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(s);return Da(r.id,r.toolId,!0,i,null,Date.now()-o,a)}catch(i){if(n=i,i.name==="AbortError")throw i;a<r.maxRetries&&(await this.delay(1e3*(a+1)),r.retries=a+1)}}throw n}delay(e){return new Promise(r=>setTimeout(r,e))}abort(e){let r=Pe.activeControllers.get(e);return r?(r.abort(),!0):!1}abortAll(){for(let e of Pe.activeControllers.values())e.abort();Pe.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},fn=null});async function Dw(){return ec||(ec=Promise.resolve().then(()=>(Zl(),Ql))),ec}async function $w(t,e,r){return r&&t.output?.mode===Et.POST_RESPONSE_API?At.runToolPostResponse(t,e):r&&t.output?.mode===Et.FOLLOW_AI?At.runToolFollowAiManual(t,e):(await Dw()).executeToolWithConfig(t.id,e)}function Lw(t,e){return e?.runSource==="MANUAL"?t.output?.mode==="local_transform"||t.processor?.type?Ms.MANUAL_LOCAL_TRANSFORM:t.output?.mode===Et.POST_RESPONSE_API?Ms.MANUAL_POST_RESPONSE_API:Ms.MANUAL_COMPATIBILITY:Ms.MANUAL_POST_RESPONSE_API}function $a(t,e){try{tl(t,e)}catch(r){Nw.warn("\u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",{toolId:t,error:r})}}async function Ow(t,e){let r=Date.now(),s=t.id,o=`yyt-tool-run-${s}`,n=Lw(t,e),a=e?.executionKey||"";$a(s,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),ns("info",`\u6B63\u5728\u624B\u52A8\u6267\u884C ${t.name}`,{sticky:!0,noticeId:o});try{let i=n===Ms.MANUAL_LOCAL_TRANSFORM?await Na(t,e):await $w(t,e,!0),l=Date.now()-r;if(i?.success){let y=ne(s),p=i?.meta?.writebackDetails||{};return $a(s,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(y?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:i?.meta?.writebackStatus||De.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!p.contentCommitted,lastHostCommitApplied:!!p.hostCommitApplied,lastRefreshRequested:!!p.refreshRequested,lastRefreshConfirmed:!!p.refreshConfirmed,lastPreferredCommitMethod:p?.commit?.preferredMethod||"",lastAppliedCommitMethod:p?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(p?.refresh?.requestMethods)?p.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(p?.refresh?.requestMethods)?[...p.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(p?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:p?.refresh?.confirmedBy||""}),C("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`),ns("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,{duration:3200,noticeId:o}),{success:!0,duration:l,result:i}}let c=ne(s),d=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",u=i?.meta?.writebackDetails||{};return $a(s,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:i?.meta?.writebackStatus||De.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||(n===Ms.MANUAL_COMPATIBILITY?We.COMPATIBILITY_EXECUTE:We.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),C("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),ns("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),{success:!1,duration:l,error:d,result:i}}catch(i){let l=Date.now()-r,c=ne(s),d=i?.message||String(i);throw $a(s,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:De.NOT_APPLICABLE,lastFailureStage:n===Ms.MANUAL_COMPATIBILITY?We.COMPATIBILITY_EXECUTE:We.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),C("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),ns("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),i}}async function La(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=ne(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return Lr(t,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:De.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),ns("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let r=await cs({runSource:"MANUAL"});return Ow(e,r)}async function Oa(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=ne(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let r=await cs({runSource:"MANUAL_PREVIEW"});return At.previewExtraction(e,r)}var Nw,Ms,ec,tc=N(()=>{er();yn();us();Jl();Ge();W();Nw=I.createScope("ToolTrigger"),Ms={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},ec=null});var Gy={};se(Gy,{TOOL_CONFIG_PANEL_STYLES:()=>rc,createToolConfigPanel:()=>Gr,default:()=>Ww});function Yy(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function Bw(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function Gr(t={}){let{id:e,toolId:r,postResponseHint:s,previewDialogId:o,previewTitle:n="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:r,renderTo(a){let i=Yy(a);if(!i)return;if(i._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}let l=()=>this.renderTo(a),c=ne(r);if(!c){i.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let d=m("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),u=[];d.appendChild(zw(c,r,l,s)),d.appendChild(Kw(c));let y=Uw(c,r,l);u.push(y),d.appendChild(y.el);let p=jw(c,r,l,a,o,n);u.push(p),d.appendChild(p.el),i.innerHTML="",i.appendChild(d),i._yytToolPanelCleanup=()=>{for(let g of u)try{g.destroy()}catch{}delete i._yytToolPanelCleanup}},destroy(a){let i=Yy(a);if(i?._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}},getStyles(){return rc}}}function zw(t,e,r,s){let o=m("div",{className:"yyt-tool-panel-hero"}),n=m("div",{className:"yyt-tool-panel-hero-row1"});n.appendChild(m("div",{className:"yyt-tool-panel-hero-icon",text:"\u{1F527}"})),n.appendChild(m("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let a=m("div",{className:"yyt-tool-panel-hero-actions"});a.appendChild(pe({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await La(e),C("success","\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C")}catch(g){C("error",`\u6267\u884C\u5931\u8D25\uFF1A${g?.message||g}`)}}}).el),a.appendChild(pe({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{C("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"),r()}}).el),n.appendChild(a),o.appendChild(n),t.description&&o.appendChild(m("div",{className:"yyt-tool-panel-hero-desc",text:t.description}));let i=m("div",{className:"yyt-tool-panel-hero-chips"}),c=(t.output?.mode||"follow_ai")==="post_response_api"?"\u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09":"\u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\uFF09";i.appendChild(m("span",{className:"yyt-tool-hero-chip mode",text:c}));let d=t.output?.apiPreset||t.apiPreset||"";d&&i.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`API: ${d}`}));let u=t.extraction?.regexPresetId||"";if(u){let g=Ee.getPreset(u);i.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${g?g.name:"\u5DF2\u5220\u9664"}`}))}else i.appendChild(m("span",{className:"yyt-tool-hero-chip",text:"\u6B63\u5219: \u672A\u7ED1\u5B9A",style:{opacity:"0.6"}}));let y=t.worldbooks?.presetId||"";if(y){let g=jt.getPreset(y);g&&i.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u4E16\u754C\u4E66: ${g.name}`}))}let p=t.runtime?.lastStatus;if(p){let g=p==="success"?"status-success":p==="failed"?"status-failed":"";i.appendChild(m("span",{className:`yyt-tool-hero-chip ${g}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${p}`}))}return o.appendChild(i),o}function Kw(t){let e=m("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},s=(a,i,l="")=>{let c=m("div",{className:"yyt-tool-runtime-stat"});return c.appendChild(m("span",{className:"yyt-tool-runtime-stat-label",text:a})),c.appendChild(m("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),c},o=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":r.lastStatus==="idle"?"\u5F85\u547D":r.lastStatus||"\u5F85\u547D",n=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(s("\u72B6\u6001",o,n)),e.appendChild(s("\u6700\u8FD1\u8FD0\u884C",Bw(r.lastRunAt),"muted")),e.appendChild(s("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(s("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function Uw(t,e,r){let s=m("div",{style:{display:"flex",flexDirection:"column"}});s.appendChild(gn({label:"\u8F93\u51FA\u6A21\u5F0F",hint:"\u51B3\u5B9A\u6267\u884C\u8DEF\u5F84 + \u81EA\u52A8/\u624B\u52A8",control:qe({value:t.output?.mode||"follow_ai",options:[{value:"follow_ai",label:"follow_ai \u2014 \u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\u89E6\u53D1\uFF09"},{value:"post_response_api",label:"post_response_api \u2014 \u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09"}],onChange:l=>{let c=ne(e)||{};_e(e,{...c,output:{...c.output||{},mode:l,enabled:l==="post_response_api"}}),r()}})}));let o=(()=>{try{return kr()||[]}catch{return[]}})();s.appendChild(gn({label:"API \u9884\u8BBE",hint:"\u989D\u5916 AI \u89E3\u6790\u65F6\u4F7F\u7528",control:qe({value:t.output?.apiPreset||t.apiPreset||"",options:[{value:"",label:"\u2014\u2014 \u8DDF\u968F\u5F53\u524D\u4E3B API \u2014\u2014"},...o.map(l=>({value:l.name,label:l.name}))],onChange:l=>{let c=ne(e)||{};_e(e,{...c,apiPreset:l,output:{...c.output||{},apiPreset:l}}),r()}})}));let n=(()=>{try{return dn()||[]}catch{return[]}})();s.appendChild(gn({label:"Ai \u6307\u4EE4\u9884\u8BBE",hint:'\u9644\u52A0\u5728 system/user \u524D\u7684\u6307\u4EE4\uFF1B\u9009"\u65E0"\u5373\u4E0D\u542F\u7528',control:qe({value:t.bypass?.enabled&&t.bypass?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0 \u2014\u2014"},...n.map(l=>({value:l.id,label:`${l.name}${l.isDefault?" [\u9ED8\u8BA4]":""}`}))],onChange:l=>{let c=ne(e)||{};_e(e,{...c,bypass:{enabled:!!l,presetId:l||""}}),r()}})}));let a=Ee.listPresets();s.appendChild(gn({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6",control:qe({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...a.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let c=ne(e)||{},d={...c.extraction||{},regexPresetId:l};if(l){let u=Ee.getPreset(l);C("success",`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${u?.name||l}`)}else C("success","\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6");_e(e,{...c,extraction:d}),r()}})}));let i=jt.listPresets();return s.appendChild(gn({label:"\u4E16\u754C\u4E66\u9884\u8BBE",hint:"\u6CE8\u5165\u5230 prompt \u7684 {{toolWorldbookContent}}",control:qe({value:t.worldbooks?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4FDD\u7559\u5DE5\u5177\u539F\u6709\u4E16\u754C\u4E66\u8BBE\u7F6E\uFF09 \u2014\u2014"},...i.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let c=ne(e)||{},d={...c.worldbooks||{},presetId:l};if(l){let u=jt.getPreset(l);C("success",`\u5DF2\u7ED1\u5B9A\u4E16\u754C\u4E66\u9884\u8BBE\uFF1A${u?.name||l}`)}else C("success","\u5DF2\u89E3\u7ED1\u4E16\u754C\u4E66\u9884\u8BBE\uFF0C\u5DE5\u5177\u4E0D\u518D\u6CE8\u5165\u4E16\u754C\u4E66\u5185\u5BB9");_e(e,{...c,worldbooks:d}),r()}})})),Ut({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[s]})}function gn({label:t,hint:e,control:r}){let s=m("div",{className:"yyt-tool-binding-row"}),o=m("div",{className:"yyt-tool-binding-label"});return o.appendChild(m("span",{className:"yyt-tool-binding-label-text",text:t})),e&&o.appendChild(m("span",{className:"yyt-tool-binding-label-hint",text:e})),s.appendChild(o),r.el.classList.add("small"),r.el.style.padding="7px 10px",r.el.style.fontSize="12px",s.appendChild(r.el),s.appendChild(m("div",{className:"yyt-tool-binding-meta"})),s}function jw(t,e,r,s,o,n){let a=m("div",{style:{display:"flex",flexDirection:"column"}});a.appendChild(m("div",{style:{marginBottom:"8px",display:"flex",alignItems:"center",gap:"10px"}},m("div",{style:{flex:"1"}},m("div",{text:"\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:"\u7528 {{macro}} \u5F15\u7528\u4E0A\u4E0B\u6587\u3002\u6A21\u677F\u5185\u5BB9\u4F1A\u4F5C\u4E3A\u53D1\u7ED9\u989D\u5916 AI \u7684 user \u6D88\u606F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})),pe({label:"\u{1F504} \u91CD\u7F6E\u4E3A\u9ED8\u8BA4",size:"small",variant:"ghost",onClick:()=>{if(!window.confirm("\u7528\u5DE5\u5177\u9ED8\u8BA4\u6A21\u677F\u8986\u76D6\u5F53\u524D\u6A21\u677F\uFF1F"))return;let x=Xn(e)||{},T=ne(e)||{};_e(e,{...T,promptTemplate:x.promptTemplate||""}),r()}}).el));let i=m("textarea",{className:"yyt-textarea yyt-code-textarea",attrs:{rows:"10",placeholder:"\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px",lineHeight:"1.7"}});i.value=t.promptTemplate||"",i.addEventListener("change",()=>{let x=ne(e)||{};_e(e,{...x,promptTemplate:i.value})}),a.appendChild(i),a.appendChild(m("div",{className:"yyt-macro-inline",html:"\u53EF\u7528\u5B8F\uFF1A<code>{{toolPromptMacro}}</code> <code>{{toolContentMacro}}</code> <code>{{toolWorldbookContent}}</code> <code>{{lastAiMessage}}</code> <code>{{recentMessagesText}}</code> <code>{{rawRecentMessagesText}}</code> <code>{{userMessage}}</code> <code>{{toolName}}</code> <code>{{toolId}}</code>"})),a.appendChild(m("hr",{className:"yyt-zone-divider"})),a.appendChild(m("div",{style:{marginBottom:"8px"}},m("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u5E76\u5199\u56DE\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let l=m("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end",marginBottom:"12px"}}),c=m("div",{className:"yyt-form-group",style:{margin:0}});c.appendChild(m("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let d=m("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});d.value=String(Number(t.extraction?.maxMessages)||5),d.addEventListener("change",()=>{let x=ne(e)||{};_e(e,{...x,extraction:{...x.extraction||{},maxMessages:Math.max(1,parseInt(d.value,10)||5)}})}),c.appendChild(d),l.appendChild(c);let u=m("div",{className:"yyt-form-group",style:{margin:0}});u.appendChild(m("label",{html:"&nbsp;",style:{fontSize:"12px"}})),u.appendChild(pe({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let x=await Oa(e);Fw(s,x,o,n)}catch(x){C("error",`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${x?.message||x}`)}}}).el),l.appendChild(u),a.appendChild(l);let y=m("div",{className:"yyt-form-group",style:{margin:0}});y.appendChild(m("label",{html:'\u5199\u56DE\u6807\u7B7E <span style="font-size:10px;color:var(--yyt-text-muted);font-weight:500;">\uFF08\u591A\u6807\u7B7E\u63D0\u53D6\u65F6\u6307\u5B9A\u552F\u4E00\u5199\u56DE\u6807\u7B7E\uFF1B\u7559\u7A7A\u5219\u63D0\u53D6\u9996\u4E2A\uFF09</span>',style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let p=`yyt-writeback-dl-${e}-${Math.random().toString(36).slice(2,6)}`,g=m("datalist",{attrs:{id:p}}),f=(()=>{let x=new Set,T=[];function v(M){if(M)for(let S of M.rules||[]){if(S?.enabled===!1||S?.type!=="include")continue;let E=String(S.value||"").trim();!E||x.has(E)||(x.add(E),T.push(E))}}let z=t.extraction?.regexPresetId;if(z)v(Ee.getPreset(z));else for(let M of Ee.listPresets())v(M);return T})();for(let x of f)g.appendChild(m("option",{attrs:{value:x}}));let h=m("input",{className:"yyt-input",attrs:{type:"text",placeholder:"\u5982 status / content\uFF08\u6765\u81EA\u6B63\u5219\u9884\u8BBE\u7684 include \u6807\u7B7E\uFF09",list:p,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});return h.value=t.extraction?.writebackTag||"",h.addEventListener("change",()=>{let x=ne(e)||{};_e(e,{...x,extraction:{...x.extraction||{},writebackTag:h.value.trim()}})}),y.appendChild(h),y.appendChild(g),a.appendChild(y),Ut({heading:"\u914D\u7F6E",icon:"\u2699",content:[a]})}function Fw(t,e,r,s){if(!Q()||!me(t))return;let n=`${os}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${a.map((l,c)=>{let d=c===a.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${a.length-c} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${Yr(d)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${Yr(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${Yr(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${Yr(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append($o({id:n,title:s,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${Yr((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Yr(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Yr(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Yr(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${i}
    `})),Lo(t,n,{onSave:l=>l()}),t.find(`#${n}-save`).text("\u5173\u95ED"),t.find(`#${n}-cancel`).remove()}function Yr(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var wA,rc,Ww,To=N(()=>{ur();Ge();Ge();er();Do();bo();tc();W();hs();Ks();wA=I.createScope("ToolConfigPanel"),rc=`
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
`;Ww=Gr});var Vy={};se(Vy,{SummaryToolPanel:()=>qy,default:()=>Hw});var qy,Hw,Jy=N(()=>{To();qy=Gr({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"}),Hw=qy});var Qy={};se(Qy,{StatusBlockPanel:()=>Xy,default:()=>Yw});var Xy,Yw,Zy=N(()=>{To();Xy=Gr({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"}),Yw=Xy});var tf={};se(tf,{YouyouReviewPanel:()=>ef,default:()=>Gw});var ef,Gw,rf=N(()=>{To();ef=Gr({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"}),Gw=ef});function sf(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function qw(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function qr(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ba(t={}){let{id:e,toolId:r,previewDialogId:s,previewTitle:o="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:n=[],processorOptions:a=[],heroHint:i=""}=t;return{id:e,toolId:r,renderTo(l){let c=sf(l);if(!c)return;if(c._yytLocalToolPanelCleanup)try{c._yytLocalToolPanelCleanup()}catch{}let d=()=>this.renderTo(l),u=ne(r);if(!u){c.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let y=m("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),p=[];y.appendChild(Vw(u,r,d,n,i)),y.appendChild(Jw(u));let g=Xw(u,r,d);p.push(g),y.appendChild(g.el);let f=Qw(u,r,d,l,n,a,s,o);p.push(f),y.appendChild(f.el),c.innerHTML="",c.appendChild(y),c._yytLocalToolPanelCleanup=()=>{for(let h of p)try{h.destroy()}catch{}delete c._yytLocalToolPanelCleanup}},destroy(l){let c=sf(l);if(c?._yytLocalToolPanelCleanup)try{c._yytLocalToolPanelCleanup()}catch{}},getStyles(){return""}}}function Vw(t,e,r,s,o){let n=m("div",{className:"yyt-tool-panel-hero"}),a=m("div",{className:"yyt-tool-panel-hero-row1"});a.appendChild(m("div",{className:"yyt-tool-panel-hero-icon",text:"\u2699"})),a.appendChild(m("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let i=m("div",{className:"yyt-tool-panel-hero-actions"});i.appendChild(pe({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await La(e),C("success","\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C")}catch(f){C("error",`\u6267\u884C\u5931\u8D25\uFF1A${f?.message||f}`)}}}).el),i.appendChild(pe({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{C("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"),r()}}).el),a.appendChild(i),n.appendChild(a),t.description&&n.appendChild(m("div",{className:"yyt-tool-panel-hero-desc",text:t.description})),o&&n.appendChild(m("div",{className:"yyt-tool-panel-hero-desc",text:o}));let l=m("div",{className:"yyt-tool-panel-hero-chips"}),c=t.output?.autoTrigger!==!1;l.appendChild(m("span",{className:"yyt-tool-hero-chip mode",text:`\u672C\u5730\u811A\u672C\uFF08${c?"\u81EA\u52A8":"\u624B\u52A8"}\uFF09`}));let d=t.processor?.direction||s[0]?.key||"",u=s.find(f=>f.key===d)?.label||d;u&&l.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u65B9\u5411: ${u}`}));let y=t.output?.overwrite!==!1;l.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u5199\u56DE: ${y?"\u8986\u76D6":"\u8FFD\u52A0"}`}));let p=t.extraction?.regexPresetId||"";if(p){let f=Ee.getPreset(p);f&&l.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${f.name}`}))}let g=t.runtime?.lastStatus;if(g){let f=g==="success"?"status-success":g==="failed"?"status-failed":"";l.appendChild(m("span",{className:`yyt-tool-hero-chip ${f}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${g}`}))}return n.appendChild(l),n}function Jw(t){let e=m("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},s=(a,i,l="")=>{let c=m("div",{className:"yyt-tool-runtime-stat"});return c.appendChild(m("span",{className:"yyt-tool-runtime-stat-label",text:a})),c.appendChild(m("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),c},o=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":"\u5F85\u547D",n=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(s("\u72B6\u6001",o,n)),e.appendChild(s("\u6700\u8FD1\u8FD0\u884C",qw(r.lastRunAt),"muted")),e.appendChild(s("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(s("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function Xw(t,e,r){let s=m("div",{style:{display:"flex",flexDirection:"column"}}),o=Ee.listPresets();return s.appendChild(sc({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C",control:qe({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...o.map(n=>({value:n.id,label:n.name}))],onChange:n=>{let a=ne(e)||{},i={...a.extraction||{},regexPresetId:n};if(n){let l=Ee.getPreset(n);C("success",`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${l?.name||n}`)}else C("success","\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6");_e(e,{...a,extraction:i}),r()}})})),s.appendChild(sc({label:"\u5199\u56DE\u65B9\u5F0F",hint:"\u5904\u7406\u540E\u7684\u7ED3\u679C\u5982\u4F55\u56DE\u5199\u5230 AI \u6D88\u606F",control:qe({value:t.output?.overwrite!==!1?"replace":"append",options:[{value:"replace",label:"\u8986\u76D6\u539F\u5DE5\u5177\u5757"},{value:"append",label:"\u8FFD\u52A0\u5230\u672B\u5C3E"}],onChange:n=>{let a=ne(e)||{};_e(e,{...a,output:{...a.output||{},overwrite:n==="replace",enabled:!0,mode:"local_transform"}}),r()}})})),s.appendChild(sc({label:"\u81EA\u52A8\u89E6\u53D1",hint:"\u6536\u5230 AI \u56DE\u590D\u540E\u662F\u5426\u81EA\u52A8\u6267\u884C\u6B64\u811A\u672C",control:qe({value:t.output?.autoTrigger!==!1?"auto":"manual",options:[{value:"auto",label:"\u81EA\u52A8\uFF08\u6536\u5230\u56DE\u590D\u5373\u6267\u884C\uFF09"},{value:"manual",label:"\u624B\u52A8\uFF08\u4EC5\u70B9\u51FB\u6309\u94AE\u6267\u884C\uFF09"}],onChange:n=>{let a=ne(e)||{};_e(e,{...a,output:{...a.output||{},autoTrigger:n==="auto",enabled:!0,mode:"local_transform"}}),r()}})})),Ut({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[s]})}function sc({label:t,hint:e,control:r}){let s=m("div",{className:"yyt-tool-binding-row"}),o=m("div",{className:"yyt-tool-binding-label"});return o.appendChild(m("span",{className:"yyt-tool-binding-label-text",text:t})),e&&o.appendChild(m("span",{className:"yyt-tool-binding-label-hint",text:e})),s.appendChild(o),r.el.style.padding="7px 10px",r.el.style.fontSize="12px",s.appendChild(r.el),s.appendChild(m("div",{className:"yyt-tool-binding-meta"})),s}function Qw(t,e,r,s,o,n,a,i){let l=m("div",{style:{display:"flex",flexDirection:"column"}});l.appendChild(m("div",{style:{marginBottom:"10px"}},m("div",{text:"\u6267\u884C\u65B9\u5411",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:"\u51B3\u5B9A\u672C\u5730\u811A\u672C\u8FD0\u884C\u54EA\u4E2A\u53D8\u6362\u8DEF\u5F84\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let c=t.processor?.direction||o[0]?.key||"",d=qe({value:c,options:o.map(f=>({value:f.key,label:f.description?`${f.label} \u2014 ${f.description}`:f.label})),onChange:f=>{let h=ne(e)||{};_e(e,{...h,processor:{...h.processor||{},direction:f}}),r()}});if(d.el.style.padding="7px 10px",d.el.style.fontSize="12px",l.appendChild(d.el),l.appendChild(m("hr",{className:"yyt-zone-divider"})),n.length>0){l.appendChild(m("div",{style:{marginBottom:"10px"}},m("div",{text:"\u5904\u7406\u9879",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:"\u52FE\u9009\u8981\u5305\u542B\u5728\u672C\u6B21\u53D8\u6362\u4E2D\u7684\u9879\u76EE\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let f=m("div",{style:{display:"flex",flexDirection:"column"}}),h=t.processor?.options||{};for(let x of n){let T=Rt({label:x.label,hint:x.description||"",checked:h[x.key]===!0,onChange:v=>{let z=ne(e)||{};_e(e,{...z,processor:{...z.processor||{},options:{...z.processor?.options||{},[x.key]:v}}})}});f.appendChild(T.el)}l.appendChild(f),l.appendChild(m("hr",{className:"yyt-zone-divider"}))}l.appendChild(m("div",{style:{marginBottom:"10px"}},m("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let u=m("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end"}}),y=m("div",{className:"yyt-form-group",style:{margin:0}});y.appendChild(m("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let p=m("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});p.value=String(Number(t.extraction?.maxMessages)||5),p.addEventListener("change",()=>{let f=ne(e)||{};_e(e,{...f,extraction:{...f.extraction||{},maxMessages:Math.max(1,parseInt(p.value,10)||5)}})}),y.appendChild(p),u.appendChild(y);let g=m("div",{className:"yyt-form-group",style:{margin:0}});return g.appendChild(m("label",{html:"&nbsp;",style:{fontSize:"12px"}})),g.appendChild(pe({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let f=await Oa(e);Zw(s,f,a,i)}catch(f){C("error",`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${f?.message||f}`)}}}).el),u.appendChild(g),l.appendChild(u),Ut({heading:"\u914D\u7F6E",icon:"\u2699",content:[l]})}function Zw(t,e,r,s){if(!Q()||!me(t))return;let n=`${os}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
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
    `:"";t.append($o({id:n,title:s,width:"720px",wide:!0,body:`
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
    `})),Lo(t,n,{onSave:l=>l()}),t.find(`#${n}-save`).text("\u5173\u95ED"),t.find(`#${n}-cancel`).remove()}var NA,oc=N(()=>{ur();Ge();er();tc();W();To();hs();NA=I.createScope("LocalTransformToolPanel")});var nf={};se(nf,{EscapeTransformToolPanel:()=>of,default:()=>ev});var of,ev,af=N(()=>{oc();of=Ba({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]}),ev=of});var cf={};se(cf,{PunctuationTransformToolPanel:()=>lf,default:()=>tv});var lf,tv,df=N(()=>{oc();lf=Ba({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]}),tv=lf});var pf={};se(pf,{BypassPanel:()=>uf,default:()=>rv});var uf,rv,yf=N(()=>{Ye();bo();Ge();uf={id:"bypassPanel",_getActivePresetId(t){return t.find(".yyt-bypass-editor-content").data("presetId")||null},render(t){let e=ie.getPresetList(),r=ie.getDefaultPresetId();return`
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
    `},_renderPresetItem(t,e){let r=Tr&&Tr[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${oe(t.name)}</span>
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
      `;let e=ie.getDefaultPresetId()===t.id,r=Tr&&Tr[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${oe(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
                 value="${oe(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${oe(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let r=Q();!r||!me(t)||(t.off(".yytBypass"),this._bindPresetListEvents(t,r),this._bindEditorEvents(t,r),this._bindFileEvents(t,r),Mt(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_bindPresetListEvents(t,e){t.on("click.yytBypass",".yyt-bypass-preset-item",r=>{if(e(r.target).closest(".yyt-bypass-quick-delete").length)return;let s=e(r.currentTarget).data("presetId");this._selectPreset(t,e,s)}),t.on("click.yytBypass",".yyt-bypass-quick-delete",async r=>{r.stopPropagation();let s=e(r.currentTarget).data("presetId");if(!s||!await dr("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let n=ie.deletePreset(s);n.success?(t.find(".yyt-bypass-editor-content").data("presetId")===s&&t.find(".yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),C("success","\u9884\u8BBE\u5DF2\u5220\u9664")):C("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.on("click.yytBypass","#yyt-bypass-add",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click.yytBypass","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click.yytBypass","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click.yytBypass",".yyt-bypass-move-up",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message"),o=s.prev(".yyt-bypass-message");o.length&&(o.before(s),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-move-down",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message"),o=s.next(".yyt-bypass-message");o.length&&(o.after(s),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-insert-message",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message");this._insertMessageAfter(t,e,s)}),t.on("click.yytBypass",".yyt-bypass-delete-message",r=>{e(r.currentTarget).closest(".yyt-bypass-message").remove(),this._refreshMessageIndices(t,e)}),t.on("change.yytBypass",".yyt-bypass-message-enabled",r=>{e(r.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(r.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.on("click.yytBypass","#yyt-bypass-import",()=>{t.find("#yyt-bypass-import-file").click()}),t.on("change.yytBypass","#yyt-bypass-import-file",async r=>{let s=r.target.files[0];if(s){try{let o=await Bo(s),n=ie.importPresets(o);C(n.success?"success":"error",n.message),n.success&&this.renderTo(t)}catch(o){C("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(r.target).val("")}}),t.on("click.yytBypass","#yyt-bypass-export",()=>{try{let r=ie.exportPresets();Oo(r,`bypass_presets_${Date.now()}.json`),C("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(r){C("error",`\u5BFC\u51FA\u5931\u8D25: ${r.message}`)}})},_selectPreset(t,e,r){let s=ie.getPreset(r);s&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${r}"]`).addClass("yyt-active"),t.find(".yyt-bypass-editor").html(this._renderEditor(s)),Mt(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_createNewPreset(t,e){let r=`bypass_${Date.now()}`,s=ie.createPreset({id:r,name:"\u65B0 Ai \u6307\u4EE4\u9884\u8BBE",description:"",messages:[]});s.success?(this.renderTo(t),this._selectPreset(t,e,r),C("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):C("error",s?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content"),s=r.data("presetId");if(!s)return;let o=r.find(".yyt-bypass-name-input").val().trim(),n=r.find(".yyt-bypass-description-input").val().trim();if(!o){C("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),r.find(".yyt-bypass-name-input").trigger("focus").trigger("select");return}let a=[];r.find(".yyt-bypass-message").each(function(){let l=e(this);a.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:String(l.data("deletable"))!=="false"})});let i=ie.updatePreset(s,{name:o,description:n,messages:a});i.success?(C("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):C("error",i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},async _deleteCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s||!await dr("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let n=ie.deletePreset(s);n.success?(this.renderTo(t),C("success","\u9884\u8BBE\u5DF2\u5220\u9664")):C("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s)return;let o=`bypass_${Date.now()}`,n=ie.duplicatePreset(s,o);n.success?(this.renderTo(t),this._selectPreset(t,e,o),C("success","\u9884\u8BBE\u5DF2\u590D\u5236")):C("error",n?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s)return;ie.setDefaultPresetId(s),this._refreshPresetList(t,e);let o=ie.getPreset(s);o&&t.find(".yyt-bypass-editor").html(this._renderEditor(o)),C("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE")},_addMessage(t,e){let r=t.find(".yyt-bypass-messages"),s={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},o=r.find(".yyt-bypass-message").length;r.append(this._renderMessageItem(s,o))},_insertMessageAfter(t,e,r){let s=t.find(".yyt-bypass-messages"),o={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},n=this._renderMessageItem(o,0),a=e(n);r.after(a),this._refreshMessageIndices(t,e)},_refreshMessageIndices(t,e){t.find(".yyt-bypass-message").each(function(r){e(this).attr("data-message-index",r)})},_refreshPresetList(t,e){let r=ie.getPresetList(),s=ie.getDefaultPresetId(),o=this._getActivePresetId(t);t.find(".yyt-bypass-preset-list").html(r.map(n=>this._renderPresetItem(n,n.id===s)).join("")),o&&t.find(`.yyt-bypass-preset-item[data-preset-id="${o}"]`).addClass("yyt-active")},destroy(t){!Q()||!me(t)||(it(t,"yytBypassSelect"),t.off(".yytBypass"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},rv=uf});var ac={};se(ac,{SettingsPanel:()=>bf,applyTheme:()=>hf,applyUiPreferences:()=>nc,default:()=>ov});function mn({id:t,checked:e=!1,title:r="",hint:s=""}){return`
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
  `}function gf(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function hn(){return gf()?.document||document}function mf(t=hn()){return t?.documentElement||document.documentElement}function hf(t,e=hn()){let r=mf(e),s={...sv,...ff[t]||ff["dark-blue"]};Object.entries(s).forEach(([o,n])=>{r.style.setProperty(o,n)}),r.setAttribute("data-yyt-theme",t)}function nc(t={},e=hn()){let r=mf(e),{theme:s="dark-blue",compactMode:o=!1,animationEnabled:n=!0}=t||{};hf(s,e),r.classList.toggle("yyt-compact-mode",!!o),r.classList.toggle("yyt-no-animation",!n)}var sv,ff,bf,ov,ic=N(()=>{Ye();pn();W();Ia();Ge();sv={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-on-accent":"#0a0d13","--yyt-bg-base":"#0a0d13","--yyt-surface":"#0f1219","--yyt-surface-2":"#151a24","--yyt-surface-3":"#1c2231","--yyt-surface-hover":"#1c2231","--yyt-surface-active":"#232b3e","--yyt-border":"rgba(255, 255, 255, 0.06)","--yyt-border-soft":"rgba(255, 255, 255, 0.04)","--yyt-border-strong":"rgba(255, 255, 255, 0.12)","--yyt-text":"rgba(255, 255, 255, 0.92)","--yyt-text-secondary":"rgba(255, 255, 255, 0.55)","--yyt-text-muted":"rgba(255, 255, 255, 0.35)","--yyt-focus-ring":"0 0 0 2px rgba(123, 183, 255, 1), 0 0 0 4px rgba(123, 183, 255, 0.15)","--yyt-control-bg":"#0f1219","--yyt-control-bg-hover":"#151a24","--yyt-control-bg-active":"#1c2231","--yyt-control-bg-strong":"#151a24","--yyt-control-bg-focus":"#151a24","--yyt-control-border":"rgba(255, 255, 255, 0.08)","--yyt-control-border-hover":"rgba(255, 255, 255, 0.14)","--yyt-control-border-focus":"rgba(123, 183, 255, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#151a24","--yyt-select-option-bg":"#1c2231","--yyt-select-option-hover-bg":"#232b3e","--yyt-select-option-selected-bg":"#2a3450","--yyt-select-option-border":"rgba(123, 183, 255, 0.15)","--yyt-select-option-selected-border":"rgba(123, 183, 255, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(0, 0, 0, 0.4)","--yyt-select-arrow-color":"rgba(255, 255, 255, 0.4)"},ff={"dark-blue":{"--yyt-on-accent":"#0a0d13"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0d0a14","--yyt-surface":"#12101c","--yyt-surface-2":"#1a1726","--yyt-surface-3":"#221e32","--yyt-surface-hover":"#221e32","--yyt-surface-active":"#2a2540","--yyt-on-accent":"#0d0a14","--yyt-control-bg":"#12101c","--yyt-control-bg-hover":"#1a1726","--yyt-control-bg-active":"#221e32","--yyt-control-bg-strong":"#1a1726","--yyt-control-bg-focus":"#1a1726","--yyt-control-border-focus":"rgba(167, 139, 250, 0.5)","--yyt-select-surface":"#1a1726","--yyt-select-option-bg":"#221e32","--yyt-select-option-hover-bg":"#2a2540","--yyt-select-option-selected-bg":"#332d50","--yyt-select-option-border":"rgba(167, 139, 250, 0.15)","--yyt-select-option-selected-border":"rgba(167, 139, 250, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(167, 139, 250, 1), 0 0 0 4px rgba(167, 139, 250, 0.15)"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0a120d","--yyt-surface":"#0f1912","--yyt-surface-2":"#151f1a","--yyt-surface-3":"#1c2824","--yyt-surface-hover":"#1c2824","--yyt-surface-active":"#233530","--yyt-on-accent":"#0a120d","--yyt-control-bg":"#0f1912","--yyt-control-bg-hover":"#151f1a","--yyt-control-bg-active":"#1c2824","--yyt-control-bg-strong":"#151f1a","--yyt-control-bg-focus":"#151f1a","--yyt-control-border-focus":"rgba(74, 222, 128, 0.5)","--yyt-select-surface":"#151f1a","--yyt-select-option-bg":"#1c2824","--yyt-select-option-hover-bg":"#233530","--yyt-select-option-selected-bg":"#2a4038","--yyt-select-option-border":"rgba(74, 222, 128, 0.15)","--yyt-select-option-selected-border":"rgba(74, 222, 128, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(74, 222, 128, 1), 0 0 0 4px rgba(74, 222, 128, 0.15)"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f5f7fa","--yyt-surface":"#edf0f5","--yyt-surface-2":"#e4e8ef","--yyt-surface-3":"#dbe0e9","--yyt-surface-hover":"#dbe0e9","--yyt-surface-active":"#d1d7e2","--yyt-text":"rgba(15, 23, 42, 0.92)","--yyt-text-secondary":"rgba(15, 23, 42, 0.55)","--yyt-text-muted":"rgba(15, 23, 42, 0.35)","--yyt-border":"rgba(15, 23, 42, 0.08)","--yyt-border-soft":"rgba(15, 23, 42, 0.04)","--yyt-border-strong":"rgba(15, 23, 42, 0.14)","--yyt-focus-ring":"0 0 0 2px rgba(59, 130, 246, 1), 0 0 0 4px rgba(59, 130, 246, 0.12)","--yyt-on-accent":"#ffffff","--yyt-control-bg":"#edf0f5","--yyt-control-bg-hover":"#e4e8ef","--yyt-control-bg-active":"#dbe0e9","--yyt-control-bg-strong":"#e4e8ef","--yyt-control-bg-focus":"#e4e8ef","--yyt-control-border":"rgba(15, 23, 42, 0.1)","--yyt-control-border-hover":"rgba(15, 23, 42, 0.18)","--yyt-control-border-focus":"rgba(59, 130, 246, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#e4e8ef","--yyt-select-option-bg":"#edf0f5","--yyt-select-option-hover-bg":"#dbe0e9","--yyt-select-option-selected-bg":"#dbeafe","--yyt-select-option-border":"rgba(59, 130, 246, 0.12)","--yyt-select-option-selected-border":"rgba(59, 130, 246, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(15, 23, 42, 0.1)","--yyt-select-arrow-color":"rgba(15, 23, 42, 0.4)"}};bf={id:"settingsPanel",render(){let t=Lt.getSettings(),e=t.debug?.enableDebugLog===!0,r=this._getAutomationRuntime();return`
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
            ${mn({id:"yyt-setting-enableDebugLog",checked:t.enableDebugLog,title:"\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7",hint:"\u5F00\u542F\u540E Logger \u9762\u677F\u5C06\u8BB0\u5F55 DEBUG \u7EA7\u522B\u65E5\u5FD7\uFF0C\u5173\u95ED\u4EC5\u8BB0\u5F55 INFO \u53CA\u4EE5\u4E0A"})}
          </div>
          <div class="yyt-settings-hint" style="margin-top: 8px;">
            <i class="fa-solid fa-terminal"></i> \u5728\u300C\u65E5\u5FD7\u300D\u9762\u677F\u4E2D\u67E5\u770B\u3001\u641C\u7D22\u548C\u5BFC\u51FA\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-clock-rotate-left"></i></span>\u6267\u884C\u8BB0\u5F55</div>
          <div class="yyt-form-group">
            ${mn({id:"yyt-setting-saveExecutionHistory",checked:t.saveExecutionHistory,title:"\u4FDD\u5B58\u6267\u884C\u5386\u53F2",hint:"\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5"})}
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-eye"></i></span>UI \u663E\u793A</div>
          <div class="yyt-form-group">
            ${mn({id:"yyt-setting-showRuntimeBadge",checked:t.showRuntimeBadge,title:"\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0",hint:"\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668"})}
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
            ${mn({id:"yyt-setting-compactMode",checked:t.compactMode,title:"\u7D27\u51D1\u6A21\u5F0F",hint:"\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9"})}
          </div>

          <div class="yyt-form-group">
            ${mn({id:"yyt-setting-animationEnabled",checked:t.animationEnabled,title:"\u542F\u7528\u52A8\u753B\u6548\u679C",hint:"\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B"})}
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
    `},_renderMacroList(){return Bt.getAvailableVariables().map(t=>`
        <div class="yyt-list-row">
          <code>${t.name}</code>
          <span>${t.description}</span>
        </div>
      `).join("")},bindEvents(t){let e=Q();if(!e||!me(t))return;let r=this;t.off(".yytSettings"),t.on("click.yytSettings",".yyt-settings-tab",o=>{let n=e(o.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),e(o.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${n}"]`).addClass("yyt-active")}),t.on("click.yytSettings","#yyt-settings-save",()=>{r._saveSettings(t)}),t.on("click.yytSettings","#yyt-settings-reset",async()=>{await dr("\u91CD\u7F6E\u8BBE\u7F6E","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F",{danger:!0})&&(Lt.resetSettings(),nc(un.ui,hn()),r.renderTo(t),C("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}),Mt(t,{namespace:"yytSettingsSelect",selectors:["#yyt-setting-queueStrategy","#yyt-setting-theme"]});let s=Lt.getDebugSettings();I.setLevel(s.enableDebugLog?ce.DEBUG:ce.INFO)},_saveSettings(t){let e=Q(),r=[{id:"yyt-setting-maxConcurrent",min:1,max:10,label:"\u6700\u5927\u5E76\u53D1\u6570"},{id:"yyt-setting-maxRetries",min:0,max:10,label:"\u6700\u5927\u91CD\u8BD5\u6B21\u6570"},{id:"yyt-setting-retryDelayMs",min:1e3,max:6e4,label:"\u91CD\u8BD5\u95F4\u9694"},{id:"yyt-setting-requestTimeoutMs",min:1e4,max:3e5,label:"\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4"},{id:"yyt-setting-automationSettleMs",min:0,max:1e4,label:"\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4"},{id:"yyt-setting-automationCooldownMs",min:0,max:6e4,label:"\u81EA\u52A8\u5316\u51B7\u5374\u65F6\u95F4"}];for(let o of r){let n=t.find(`#${o.id}`),a=n.val(),i=parseInt(a,10);if(isNaN(i)||i<o.min||i>o.max){C("warning",`${o.label} \u987B\u5728 ${o.min} ~ ${o.max} \u4E4B\u95F4`),n.trigger("focus").trigger("select");return}}let s={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val(),10)||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val(),10)||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val(),10)||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val(),10)||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},automation:{settleMs:parseInt(t.find("#yyt-setting-automationSettleMs").val(),10)||1200,cooldownMs:parseInt(t.find("#yyt-setting-automationCooldownMs").val(),10)||5e3,maxConcurrentSlots:Lt.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};Lt.saveSettings(s),I.setLevel(s.debug.enableDebugLog?ce.DEBUG:ce.INFO),nc(s.ui,hn()),C("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},_getAutomationRuntime(){try{return gf()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},destroy(t){!Q()||!me(t)||(it(t,"yytSettingsSelect"),t.off(".yytSettings"))},getStyles(){return`
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
    `},renderTo(t){t.html(this.render({})),this.bindEvents(t,{})}},ov=bf});function nv(t={},e=-1){return[t?.sourceId,t?.messageId,t?.message_id,t?.id,t?.mid,t?.mesid,t?.mes_id,t?.chat_index,t?.index,e].map(r=>xe(r))}function av(t=[],e=""){let r=xe(e);if(!r||!Array.isArray(t))return-1;for(let s=t.length-1;s>=0;s-=1){let o=t[s];if(nv(o,s).includes(r))return s}return-1}function bn(t={},e={}){let r=xe(t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId);if(!r)return null;let s=il({resolvedAt:Date.now(),runSource:e.runSource||t?.runSource||Qe.MANUAL,traceId:t?.traceId||"",chatId:t?.chatId||"",sourceMessageId:r,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId||"swipe:current",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",assistantContentFingerprint:t?.assistantContentFingerprint||"",assistantBaseFingerprint:t?.assistantBaseFingerprint||"",assistantText:t?.lastAiMessage||"",assistantBaseText:t?.assistantBaseText||"",targetMessageIndex:av(t?.chatMessages||t?.chatHistory||[],r)});return!s.slotBindingKey||!s.slotRevisionKey?null:s}async function lc({runSource:t=Qe.MANUAL}={}){let e=await cs({runSource:t});return bn(e,{runSource:t})}async function iv({messageId:t,swipeId:e="",runSource:r=Qe.AUTO}={}){let s=await ds({messageId:t,swipeId:e,runSource:r});return bn(s,{runSource:r})}async function xf(t=null,e={}){let r=t||null;if(typeof e.resolveTarget=="function")return await e.resolveTarget(r);let s=xe(e.runSource||r?.runSource)||Qe.MANUAL,o=xe(e.messageId||r?.sourceMessageId),n=xe(e.swipeId||r?.sourceSwipeId||r?.effectiveSwipeId);return e.useMessageTarget===!0||s===Qe.AUTO?o?iv({messageId:o,swipeId:n,runSource:s}):null:lc({runSource:s})}function wf(t,e){let r=t||null,s=e||null;return!r||!s?{valid:!1,reason:"missing_target_snapshot"}:xe(r.sourceMessageId)!==xe(s.sourceMessageId)?{valid:!1,reason:"source_message_changed"}:xe(r.sourceSwipeId||r.effectiveSwipeId)!==xe(s.sourceSwipeId||s.effectiveSwipeId)?{valid:!1,reason:"source_swipe_changed"}:xe(r.slotRevisionKey)!==xe(s.slotRevisionKey)?{valid:!1,reason:"slot_revision_changed"}:{valid:!0,reason:"ok"}}var za=N(()=>{us();je()});function Sr(t,e=""){return t==null?e:String(t).trim()||e}function lv(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function cv(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function vf(t,e){if(!t)return null;let r=t[bs];if(!r)return null;let s=Ae(e);return cv(r)?s===Dt?r:null:r[s]||null}function xn({loadMode:t=xs.EMPTY,mergeBaseOnly:e=!1,state:r=null,sourceKind:s=wt.EMPTY,resolvedFromMessageId:o="",resolvedFromRevisionKey:n=""}={}){let a=hr(r)||null;return{loadMode:t,mergeBaseOnly:e,state:a,sourceKind:s,resolvedFromMessageId:Sr(o,a?.sourceMessageId||""),resolvedFromRevisionKey:Sr(n,a?.slotRevisionKey||"")}}function cc(t,e={}){let r=hr(t);return r?hr({...r,meta:{...r.meta||{},...e||{}}}):null}function Tf({runtime:t,targetSnapshot:e,currentMessageIndex:r=-1,templateTables:s=[],isolationKey:o}={}){let n=Array.isArray(t?.chat)?t.chat:[],a=Sr(e?.slotRevisionKey,""),i=Sr(e?.slotBindingKey,""),l=Ae(o===void 0?"":o);if(r>=0&&r<n.length){let c=vf(n[r],l),d=hr(c);if(d&&Sr(d.slotRevisionKey,"")===a)return xn({loadMode:xs.EXACT,mergeBaseOnly:!1,state:cc(d,{sourceKind:wt.EXACT,isolationKey:l,resolvedFromMessageId:d.sourceMessageId,resolvedFromRevisionKey:d.slotRevisionKey}),sourceKind:wt.EXACT,resolvedFromMessageId:d.sourceMessageId,resolvedFromRevisionKey:d.slotRevisionKey});if(d&&Sr(d.slotBindingKey,"")===i){let u=cc({...d,slotRevisionKey:a||d.slotRevisionKey,sourceSwipeId:Sr(e?.sourceSwipeId||e?.effectiveSwipeId,d.sourceSwipeId),meta:{...d.meta||{},sourceKind:wt.BINDING,mergeBaseOnly:!0,fallbackFromBinding:!0,isolationKey:l,fallbackFromRevisionKey:Sr(d.slotRevisionKey,""),requestedRevisionKey:a,resolvedFromMessageId:d.sourceMessageId,resolvedFromRevisionKey:d.slotRevisionKey}});return xn({loadMode:xs.BINDING_FALLBACK,mergeBaseOnly:!0,state:u,sourceKind:wt.BINDING,resolvedFromMessageId:d.sourceMessageId,resolvedFromRevisionKey:d.slotRevisionKey})}}if(r>0)for(let c=r-1;c>=0;c-=1){let d=n[c];if(!lv(d))continue;let u=vf(d,l),y=hr(u);if(!y||!Array.isArray(y.tables)||y.tables.length===0)continue;let p=cc({...y,slotBindingKey:i||y.slotBindingKey,slotRevisionKey:a||y.slotRevisionKey,sourceSwipeId:Sr(e?.sourceSwipeId||e?.effectiveSwipeId,y.sourceSwipeId),meta:{...y.meta||{},sourceKind:wt.HISTORY,mergeBaseOnly:!0,reconstructedFromHistory:!0,isolationKey:l,resolvedFromMessageId:y.sourceMessageId,resolvedFromRevisionKey:y.slotRevisionKey}});return xn({loadMode:xs.HISTORY,mergeBaseOnly:!0,state:p,sourceKind:wt.HISTORY,resolvedFromMessageId:y.sourceMessageId,resolvedFromRevisionKey:y.slotRevisionKey})}return Array.isArray(s)&&s.length>0?xn({loadMode:xs.TEMPLATE,mergeBaseOnly:!1,state:Qo(e,{tables:ae(s),meta:{fromTemplate:!0,isolationKey:l,sourceKind:wt.TEMPLATE,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:wt.TEMPLATE}):xn({loadMode:xs.EMPTY,mergeBaseOnly:!1,state:Qo(e,{meta:{isolationKey:l,sourceKind:wt.EMPTY,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:wt.EMPTY})}var Sf=N(()=>{je()});function _f(){return dc||(dc=I.createScope("TableStateMirror")),dc}async function dv(t,e,r){try{await ze(),await ma({chatId:t?.chatId,messageId:t?.sourceMessageId,swipeId:t?.sourceSwipeId||t?.effectiveSwipeId,isolationKey:e},Array.isArray(r)?r:[]),_f().info("slot \u5DF2\u955C\u50CF\u5230 SQL",{chatId:t?.chatId,messageId:t?.sourceMessageId,tableCount:r?.length||0})}catch(s){_f().warn("SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:s?.message||String(s)})}}function Ef(t){return t==null?"":String(t).trim()}function uv(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function pc(){try{let t=uv(),e=t?.SillyTavern||null,r=e?.getContext?.()||null,s=Array.isArray(r?.chat)?r.chat:[],o=Array.isArray(e?.chat)?e.chat:[],n=s.length?s:o;return{topWindow:t,api:e,context:r,chat:n,contextChat:s,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}function pv(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function yv(t=[],e=""){let r=Ef(e);if(!Array.isArray(t)||!r)return-1;for(let s=t.length-1;s>=0;s-=1){let o=t[s];if(!pv(o))continue;if([o?.sourceId,o?.message_id,o?.messageId,o?.id,o?.mes_id,o?.mid,o?.mesid,o?.chat_index,o?.index,s].map(a=>Ef(a)).includes(r))return s}return-1}function yc(t){let e=pc(),r=yv(e.chat,t?.sourceMessageId);return r<0?{runtime:e,messageIndex:r,message:null}:{runtime:e,messageIndex:r,message:e.chat[r]||null}}function ja(t,e,r){let s=o=>{!Array.isArray(o)||e<0||e>=o.length||(o[e]={...o[e]||{},...r})};s(t?.contextChat),s(t?.apiChat)}async function Fa(t){let e=t?.context||null,r=t?.api||null,s=e?.saveChatDebounced||r?.saveChatDebounced||null,o=e?.saveChat||r?.saveChat||null;typeof s=="function"&&s.call(e||r),typeof o=="function"&&await o.call(e||r)}function Wa(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function Rs(t){return!t||typeof t!="object"||Array.isArray(t)?!1:"lastResolvedTarget"in t||"lastCommittedTarget"in t}function Ka(t,e,r,s){if(!t)return null;let o=t[e];if(!o)return null;let n=Ae(r);return typeof s=="function"&&s(o)?n===Dt?o:null:o[n]||null}function uc(t,e,r,s,o){if(!t)return;let n=Ae(r),a=t[e];if(typeof o=="function"&&o(a)){let i={[Dt]:a};i[n]=s,t[e]=i}else a&&typeof a=="object"&&!Array.isArray(a)?t[e]={...a,[n]:s}:t[e]={[n]:s}}function Ua(t,e,r,s){if(!t)return!1;let o=Ae(r),n=t[e];if(!n)return!1;if(typeof s=="function"&&s(n))return o===Dt?(delete t[e],!0):!1;if(n&&typeof n=="object"&&!Array.isArray(n)){if(n[o]===void 0)return!1;let a={...n};return delete a[o],Object.keys(a).length===0?delete t[e]:t[e]=a,!0}return!1}function Af(t,e={}){let{runtime:r,messageIndex:s}=yc(t);return Tf({runtime:r,targetSnapshot:t,currentMessageIndex:s,templateTables:Array.isArray(e.templateTables)?e.templateTables:[],isolationKey:e.isolationKey===void 0?Ie.getKey():e.isolationKey})}async function Cf(t,e={}){let{runtime:r,messageIndex:s,message:o}=yc(t);if(!o||s<0)return{success:!1,error:"target_message_not_found"};let n=e.isolationKey===void 0?Ie.getKey():e.isolationKey,a=Ka(o,Br,n,Rs),i={...sa(a),lastResolvedTarget:to(t),updatedAt:Date.now()};return uc(o,Br,n,i,Rs),ja(r,s,o),await Fa(r),{success:!0,bindings:i}}async function Ha(t,e,r={}){let s=r.skipFreshValidation===!0?t:await xf(t,r),o=r.skipFreshValidation===!0?{valid:!0,reason:"skipped"}:wf(t,s);if(!o.valid)return{success:!1,error:"target_changed_before_commit",validation:o};let n=s||t,{runtime:a,messageIndex:i,message:l}=yc(n);if(!l||i<0)return{success:!1,error:"target_message_not_found",validation:o};let c=r.isolationKey===void 0?Ie.getKey():r.isolationKey,d=Qo(n),u={...d.meta||{},...e.meta||{},...r.locks?{locks:r.locks}:{},...r.previousSnapshot?{previousSnapshot:r.previousSnapshot}:{},isolationKey:c},y=hr({...d,...e,meta:u,slotBindingKey:n.slotBindingKey,slotRevisionKey:n.slotRevisionKey,sourceMessageId:n.sourceMessageId,sourceSwipeId:n.sourceSwipeId||n.effectiveSwipeId,updatedAt:Date.now()}),p=Ka(l,Br,c,Rs),g={...sa(p),lastResolvedTarget:to(n),lastCommittedTarget:to(n),updatedAt:Date.now()};return uc(l,bs,c,y,Wa),uc(l,Br,c,g,Rs),ja(a,i,l),await Fa(a),dv(n,c,y?.tables||[]).catch(()=>{}),{success:!0,state:y,bindings:g,validation:o,messageIndex:i,sourceMessageId:n.sourceMessageId,slotRevisionKey:n.slotRevisionKey}}function Ps(t=null,e={}){let r=_t.getAssistantMessageSnapshot(t);if(!r?.message)return null;let s=e.isolationKey===void 0?Ie.getKey():e.isolationKey;return{...r,tableState:hr(Ka(r.message,bs,s,Wa)),tableBindings:sa(Ka(r.message,Br,s,Rs))}}async function kf(t,e={}){let r=pc();if(!Array.isArray(r.chat)||t<0||t>=r.chat.length)return{success:!1,error:"invalid_message_index",messageIndex:t};let s=r.chat[t];if(!s)return{success:!1,error:"message_not_found",messageIndex:t};let o=e.isolationKey===void 0?Ie.getKey():e.isolationKey,n=Ua(s,bs,o,Wa),a=e.clearBindings===!1?!1:Ua(s,Br,o,Rs);return(n||a)&&(ja(r,t,s),await Fa(r)),{success:!0,cleared:n||a,messageIndex:t,isolationKey:o}}async function If(t={}){let e=pc(),r=Number.isFinite(t.fromMessageIndex)?t.fromMessageIndex:0,s=Number.isFinite(t.toMessageIndex)?t.toMessageIndex:(e.chat?.length||0)-1,o=t.isolationKey===void 0?Ie.getKey():t.isolationKey,n=0;for(let a=r;a<=s;a++){let i=e.chat[a];if(!i)continue;let l=Ua(i,bs,o,Wa),c=Ua(i,Br,o,Rs);(l||c)&&(ja(e,a,i),n++)}return n>0&&await Fa(e),{success:!0,touched:n,from:r,to:s,isolationKey:o}}var dc,wn=N(()=>{As();je();vs();Sf();za();Nl();W()});function Rf(t){let e=new Set;if(!Array.isArray(t))return e;for(let r of t){let s=r?.order;Number.isFinite(s)&&e.add(Math.floor(s))}return e}function fc(t,e=5e4,r=1,s=99999){for(let o=e;o<=s;o++)if(!t.has(o))return t.add(o),o;for(let o=r;o<e;o++)if(!t.has(o))return t.add(o),o;return Mf.warn("\u65E0\u53EF\u7528 order \u69FD\u4F4D"),t.add(e),e}function Pf(t,e,r=5e4,s=1,o=99999){let n=o-e+1;for(let a=r;a<=n;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}for(let a=s;a<r&&a<=n;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}Mf.warn(`\u65E0\u6CD5\u5206\u914D ${e} \u4E2A\u8FDE\u7EED order \u69FD\u4F4D`);for(let a=0;a<e;a++)t.add(r+a);return r}var Mf,Nf=N(()=>{W();Mf=I.createScope("TableWBOrder")});function gc(t,e="before_character_definition"){let r=String(t||"").trim().toLowerCase();return r==="at_depth_as_system"||r==="system"?"at_depth_as_system":r==="before_char"||r==="before_character"||r==="before_character_definition"||r==="0"?"before_character_definition":r==="after_char"||r==="after_character"||r==="after_character_definition"||r==="1"?"after_character_definition":e}function vn(t,e){if(!e)return t;let r={...t,position:e.position};return e.position==="at_depth_as_system"?r.depth=e.depth:delete r.depth,r}var p1,y1,Df=N(()=>{p1=Object.freeze(["at_depth_as_system","before_character_definition","after_character_definition"]);y1=Object.freeze({position:"before_character_definition",depth:2,order:5e4})});function mc(t,e=""){return t==null?e:String(t).trim()||e}function mv(t){return mc(t,"default_chat").replace(/[\[\]=]/g,"_")}function hv(){let t=globalThis.window||globalThis;return mc(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function bv(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return Dr()?.TavernHelper||null}function xv(t){return String(t??"").replace(/\|/g,"\uFF5C").replace(/\n/g," ")}function $f(t){let e=Array.isArray(t.columns)?t.columns:[],r=Array.isArray(t.rows)?t.rows:[];if(r.length===0)return"";let s=e.map(l=>l.key),o=e.map(l=>l.title||l.key),n=`| ${o.join(" | ")} |`,a=`| ${o.map(()=>"---").join(" | ")} |`,i=r.map(l=>{let c=l.cells||{};return`| ${s.map(d=>xv(c[d])).join(" | ")} |`});return`# ${t.name||"\u672A\u547D\u540D\u8868"}

${n}
${a}
${i.join(`
`)}`}function wv(t,e){if(!Array.isArray(t)||t.length===0)return[];let r=new Map;if(Array.isArray(e))for(let s of e){let o=s?.id||s?.key;o&&r.set(o,s)}return t.map(s=>{let o=s?.id?r.get(s.id):null;return{...s,exportConfig:s?.exportConfig||o?.exportConfig||{enabled:!1},enabled:s?.enabled!==!1}})}function Ya(t){return`${Of}${fv}${mv(t)}${gv}-`}function vv(t){return`${Of}[${mc(t,"default_chat")}]-`}function Bf(t,e){if(!t||typeof t!="string")return!1;let r=Ya(e);if(t.startsWith(r))return!0;let s=vv(e);return!!t.startsWith(s)}function Tv(t,e){let r=Ya(t),s=String(e||"").trim();return s?`${r}${s}`:`${r}\u586B\u8868\u6570\u636E`}function Lf(t,e,r){return`${Ya(t)}Wrapper-${r}`}function Sv(t,e){return t?t.content!==e.content||t.enabled!==e.enabled||t.type!==e.type||t.position!==e.position||t.prevent_recursion!==e.prevent_recursion||t.order!==e.order:!0}async function Tn(t,e,r,s,o,n,a){let i=r.find(l=>l.comment===s);return i&&a&&!Bf(i.comment,a)?(So.warn(`upsert \u8DF3\u8FC7\uFF1A\u73B0\u6709\u6761\u76EE comment "${s}" \u4E0D\u5C5E\u4E8E\u5F53\u524D chat`,{chatId:a}),{action:"skipped",comment:s,reason:"cross_chat_collision"}):i&&i.uid?Sv(i,o)?(await Promise.resolve(t.setLorebookEntries(e,[{uid:i.uid,...o}])),So.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u66F4\u65B0\uFF1A${s}`),{action:"updated",comment:s}):(n.add(i.order||0),{action:"skipped",comment:s}):typeof t.createLorebookEntries=="function"?(await Promise.resolve(t.createLorebookEntries(e,[{comment:s,keys:[],...o}])),So.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u521B\u5EFA\uFF1A${s}`),{action:"created",comment:s}):{action:"failed",comment:s,error:"createLorebookEntries \u4E0D\u53EF\u7528"}}async function zf(t,e){let r=e?.worldbookSync;if(!r?.enabled)return{skipped:!0,reason:"disabled"};let s=String(r.targetBook||"").trim();if(!s)return{skipped:!0,reason:"no_target_book"};let o=bv();if(!o)return{success:!1,error:"TavernHelper \u4E0D\u53EF\u7528"};if(typeof o.getLorebookEntries!="function")return{success:!1,error:"getLorebookEntries \u4E0D\u53EF\u7528"};if(typeof o.setLorebookEntries!="function"&&typeof o.createLorebookEntries!="function")return{success:!1,error:"\u4E16\u754C\u4E66\u5199\u5165 API \u4E0D\u53EF\u7528"};let n=hv(),a=Ya(n),i=Array.isArray(e?.tables)?e.tables:[],c=wv(t,i).filter(y=>y&&y.enabled!==!1&&Array.isArray(y.rows)&&y.rows.length>0);if(c.length===0)return{skipped:!0,reason:"empty_tables"};let d=e?.wrapperConfig||{},u=d.enabled!==!1;try{let y=await Promise.resolve(o.getLorebookEntries(s));Array.isArray(y)||(y=[]);let p=Rf(y),g=[],f=c.filter(S=>S.exportConfig?.enabled===!0),h=c.filter(S=>S.exportConfig?.enabled!==!0),x="";if(h.length>0&&(x=h.map(S=>$f(S)).join(`

`)),u&&(x||f.length>0)){let S=d.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",E=d.wrapperHint||"",G=d.wrapperPlacement||{},q=G.order||5e4,$=Pf(p,3,q,1,99999),A=gc(G.position,"before_character_definition"),J=Number.isFinite(G.depth)?G.depth:2,U=`<${S}>
${E}`;g.push(await Tn(o,s,y,Lf(n,S,"Start"),vn({content:U,enabled:!0,type:"constant",order:$,prevent_recursion:!0},{position:A,depth:J}),p,n)),x&&g.push(await Tn(o,s,y,`${a}\u5168\u5C40\u6570\u636E`,vn({content:x,enabled:!0,type:"constant",order:$+1,prevent_recursion:!0},{position:A,depth:J}),p,n)),g.push(await Tn(o,s,y,Lf(n,S,"End"),vn({content:`</${S}>`,enabled:!0,type:"constant",order:$+2,prevent_recursion:!0},{position:A,depth:J}),p,n))}else if(x){let S=fc(p,5e4,1,99999);g.push(await Tn(o,s,y,`${a}\u5168\u5C40\u6570\u636E`,{content:x,enabled:!0,type:"constant",position:"before_character_definition",order:S,prevent_recursion:!0},p,n))}for(let S of f){let E=S.exportConfig||{},G=E.entryName||S.name||"\u672A\u547D\u540D\u8868",q=Tv(n,G),$=$f(S);if(!$)continue;let A=E.entryPlacement||{},J=gc(A.position,"before_character_definition"),U=fc(p,A.order||5e4,1,99999),ee=E.entryType==="keyword"?"keyword":"constant";g.push(await Tn(o,s,y,q,vn({content:$,enabled:!0,type:ee,order:U,prevent_recursion:E.preventRecursion!==!1},{position:J,depth:A.depth||2}),p,n))}let T=new Set(g.map(S=>S.comment).filter(Boolean)),v=y.filter(S=>!S.comment||!Bf(S.comment,n)?!1:!T.has(S.comment));if(v.length>0){let S=v.map(E=>E.uid).filter(Boolean);S.length>0&&typeof o.deleteLorebookEntries=="function"&&(await Promise.resolve(o.deleteLorebookEntries(s,S)),So.info(`\u5DF2\u6E05\u7406 ${S.length} \u4E2A\u65E7\u4E16\u754C\u4E66\u6761\u76EE [${n}]`))}let z=g.filter(S=>S.action==="created").length,M=g.filter(S=>S.action==="updated").length;return So.info(`\u4E16\u754C\u4E66\u540C\u6B65\u5B8C\u6210 [${n}]\uFF1A${z} \u521B\u5EFA, ${M} \u66F4\u65B0, ${v.length} \u6E05\u7406`),{success:!0,results:g,stats:{created:z,updated:M,cleaned:v.length},targetBook:s,chatId:n}}catch(y){return So.warn("\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25:",y),{success:!1,error:y?.message||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25"}}}var So,Of,fv,gv,Kf=N(()=>{us();W();Nf();Df();So=I.createScope("TableWorldbookSync"),Of="YYT-",fv="[YY:chatId=",gv="]"});function Ga(t,e=""){return t==null?e:String(t).trim()||e}function Ev(t={}){return{tables:Array.isArray(t?.tables)?ae(t.tables):[]}}function Av(t={},e={}){let r=Ga(e.mirrorTag,"yyt-table-workbench"),s=Ev(t);return[`<${r}>`,"[\u586B\u8868\u5DE5\u4F5C\u53F0]","```json",JSON.stringify(s,null,2),"```",`</${r}>`].join(`
`)}async function Uf({targetSnapshot:t,nextTables:e,config:r,loadResult:s=null,diff:o=null,fillMode:n="",skipNotify:a=!1}={}){let i=$t(r),l=await Ha(t,{tables:Array.isArray(e)?ae(e):[],meta:{lastLoadMode:Ga(s?.loadMode,""),lastFillMode:Ga(n),mergeBaseOnly:!1,updatedBy:Ga(t?.runSource,"MANUAL_TABLE")}});if(!l?.success)return{success:!1,error:l?.error||"table_state_commit_failed",commitResult:l,mirrorResult:null,warning:""};let c=null,d=null,u="";if(i.mirrorToMessage){let y=Av(l.state,{mirrorTag:i.mirrorTag});c=await _t.injectDetailed(_v,y,{overwrite:!0,extractionSelectors:[i.mirrorTag],sourceMessageId:l.sourceMessageId,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId,effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId,slotBindingKey:t?.slotBindingKey,slotRevisionKey:t?.slotRevisionKey,slotTransactionId:t?.slotTransactionId,traceId:t?.traceId,skipNotify:a}),c?.success||(u=c?.error||"\u6B63\u6587\u955C\u50CF\u5199\u56DE\u5931\u8D25")}return i.worldbookSync?.enabled&&(d=await zf(Array.isArray(e)?e:[],i),d&&!d.success&&!d.skipped&&(u=u?`${u}; ${d.error}`:d.error||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25")),{success:!0,state:l.state,bindings:l.bindings,diff:o,fillMode:n,commitResult:l,mirrorResult:c,worldbookSyncResult:d,warning:u}}var _v,jf=N(()=>{As();je();wn();br();Kf();_v="tableWorkbenchMirror"});function Cv(t){return typeof t!="string"||!t?t:t.replace(/[“”「」『』＂]/g,'"')}function hc(t,e){for(let r=e;r<t.length;r++)if(!/\s/.test(t[r]))return{char:t[r],index:r};return{char:"",index:-1}}function Hf(t){return!!t&&(t==='"'||t==="{"||t==="["||t==="-"||/\d/.test(t)||t==="t"||t==="f"||t==="n")}function kv(t,e,r,s){let o=hc(t,e+1),n=o.char;if(!n)return r!=="key";if(r==="key")return n===":";if(n==="}"||n==="]")return!0;if(n!==",")return!1;let a=hc(t,o.index+1).char;return a?s==="object"?a==='"'||a==="}":s==="array"?a==="]"||Hf(a):Hf(a)||a==="}"||a==="]":!0}function Iv(t){if(typeof t!="string")return{success:!1,result:t,error:"not a string"};let e="",r=!1,s=!1,o=null,n=[],a=()=>n.length?n[n.length-1]:null,i=()=>{let l=a();l&&(l.expecting="commaOrEnd")};for(let l=0;l<t.length;l++){let c=t[l];if(s){e+=c,s=!1;continue}if(r){if(c==="\\"){e+=c,s=!0;continue}if(c==='"'){let d=a();kv(t,l,o,d?.type||null)?(e+=c,r=!1,o==="key"&&d?.type==="object"?d.expecting="colon":i(),o=null):e+='\\"';continue}e+=c;continue}if(c==='"'){e+=c,r=!0;let d=a();o=d&&d.type==="object"&&(d.expecting==="key"||d.expecting==="keyOrEnd")?"key":"value";continue}if(c==="{"){e+=c,n.push({type:"object",expecting:"keyOrEnd"});continue}if(c==="["){e+=c,n.push({type:"array",expecting:"valueOrEnd"});continue}if(c===":"){e+=c;let d=a();d?.type==="object"&&(d.expecting="value");continue}if(c===","){e+=c;let d=a();d?.type==="object"&&(d.expecting="key"),d?.type==="array"&&(d.expecting="value");continue}if(c==="}"||c==="]"){e+=c,n.pop(),i();continue}e+=c}return{success:!0,result:e,error:null}}function Mv(t){if(typeof t!="string"||!t)return t;let e="",r=!1,s=!1;for(let o=0;o<t.length;o++){let n=t[o];if(s){e+=n,s=!1;continue}if(n==="\\"){e+=n,r&&(s=!0);continue}if(n==='"'){e+=n,r=!r;continue}if(r){if(n===`
`){e+="\\n";continue}if(n==="\r"){e+="\\r";continue}if(n==="	"){e+="\\t";continue}if(n==="\0"){e+="\\u0000";continue}}e+=n}return e}function Rv(t){if(typeof t!="string"||!t)return t;let e="",r=!1,s=!1;for(let o=0;o<t.length;o++){let n=t[o];if(s){e+=n,s=!1;continue}if(n==="\\"){e+=n,r&&(s=!0);continue}if(n==='"'){e+=n,r=!r;continue}if(!r&&n===","){let a=hc(t,o+1).char;if(a==="}"||a==="]")continue}e+=n}return e}function Pv(t){return typeof t!="string"||!t?t:t.replace(/([{,]\s*)(-?\d+)(\s*:)/g,'$1"$2"$3')}function Sn(t){if(typeof t!="string")return{success:!1,result:t,layersApplied:[],error:"Input is not a string"};let e=[],r=t,s=Cv(r);s!==r&&e.push("normalizeQuotes"),r=s;let o=Iv(r);if(!o.success)return{success:!1,result:r,layersApplied:e,error:o.error};o.result!==r&&e.push("escapeUnescapedQuotes"),r=o.result;let n=Mv(r);n!==r&&e.push("sanitizeControlChars"),r=n;let a=Rv(r);a!==r&&e.push("removeTrailingCommas"),r=a;let i=Pv(r);return i!==r&&e.push("fixNumericKeys"),r=i,{success:!0,result:r,layersApplied:e,error:null}}function Nv(t,e=","){if(typeof t!="string"||!t)return[];let r=[],s="",o=!1,n=!1,a=0,i=0,l=0;for(let c=0;c<t.length;c++){let d=t[c];if(n){s+=d,n=!1;continue}if(d==="\\"){s+=d,o&&(n=!0);continue}if(d==='"'){s+=d,o=!o;continue}if(!o){if(d==="{")a++;else if(d==="}")a=Math.max(0,a-1);else if(d==="[")i++;else if(d==="]")i=Math.max(0,i-1);else if(d==="(")l++;else if(d===")")l=Math.max(0,l-1);else if(d===e&&a===0&&i===0&&l===0){s.trim()&&r.push(s.trim()),s="";continue}}s+=d}return s.trim()&&r.push(s.trim()),r}function Dv(t,e=":"){if(typeof t!="string"||!t)return-1;let r=!1,s=!1,o=0,n=0,a=0;for(let i=0;i<t.length;i++){let l=t[i];if(s){s=!1;continue}if(l==="\\"){r&&(s=!0);continue}if(l==='"'){r=!r;continue}if(!r){if(l==="{")o++;else if(l==="}")o=Math.max(0,o-1);else if(l==="[")n++;else if(l==="]")n=Math.max(0,n-1);else if(l==="(")a++;else if(l===")")a=Math.max(0,a-1);else if(l===e&&o===0&&n===0&&a===0)return i}}return-1}function bc(t){if(typeof t!="string")return{success:!0,value:t,error:null};let e=t.trim();if(!e)return{success:!1,value:null,error:"Empty value"};let s=`[${e.startsWith("'")&&e.endsWith("'")?`"${e.slice(1,-1).replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}"`:e}]`;try{return{success:!0,value:JSON.parse(s)[0],error:null}}catch(o){let n=Sn(s);if(n.success)try{return{success:!0,value:JSON.parse(n.result)[0],error:null}}catch{}return{success:!1,value:null,error:o?.message||"Failed to parse loose value"}}}function $v(t){let e=typeof t=="string"?t.trim():"";if(!e)return null;if(/^-?\d+$/.test(e))return e;let r=bc(e);return r.success&&(typeof r.value=="string"||typeof r.value=="number")?String(r.value):e.replace(/^["']|["']$/g,"")}function Yf(t){if(typeof t!="string")return{success:!1,result:null,recoveredKeys:[],error:"not a string"};let e=t.trim();if(!e.startsWith("{")||!e.endsWith("}"))return{success:!1,result:null,recoveredKeys:[],error:"not an object literal"};let r=e.slice(1,-1).trim();if(!r)return{success:!0,result:{},recoveredKeys:[],error:null};let s=Nv(r,",").filter(Boolean);if(!s.length)return{success:!1,result:null,recoveredKeys:[],error:"no segments"};let o={},n=0;for(let i of s){let l=Dv(i,":");if(l!==-1){let d=$v(i.slice(0,l)),u=bc(i.slice(l+1));if(!d||!u.success)return{success:!1,result:null,recoveredKeys:Object.keys(o),error:`Failed segment: ${i}`};o[d]=u.value;let y=parseInt(d,10);!isNaN(y)&&String(y)===d&&(n=Math.max(n,y+1));continue}let c=bc(i);if(!c.success)return{success:!1,result:null,recoveredKeys:Object.keys(o),error:`Failed value: ${i}`};for(;Object.prototype.hasOwnProperty.call(o,String(n));)n++;o[String(n)]=c.value,n++}let a=Object.keys(o).sort((i,l)=>parseInt(i,10)-parseInt(l,10));return a.length?{success:!0,result:o,recoveredKeys:a,error:null}:{success:!1,result:null,recoveredKeys:[],error:"no keys recovered"}}function Lv(t){if(typeof t!="string")return"";let e=t.trim();return e=e.replace(/'\s*\+\s*'/g,""),e.startsWith("'")&&e.endsWith("'")&&(e=e.slice(1,-1)),e=e.replace(/\\n/g,`
`),e=e.replace(/\\\\"/g,'\\"'),e=e.replace(/：/g,":"),e}function Ov(t){let e=Lv(t);if(!e)return[];let r=[];Ff.lastIndex=0;let s;for(;(s=Ff.exec(e))!==null;){let i=s[1];i&&i.trim()&&r.push(i)}if(r.length)return r;let o=i=>/(insertRow|updateRow|deleteRow)\s*\(/.test(i),n=/<!--([\s\S]*?)-->/g,a=[];for(;(s=n.exec(e))!==null;)o(s[1])&&a.push(s[1]);return a}function Bv(t){let e=t.split(/\r?\n/),r=[],s="",o=!1;for(let a of e){let i=a.trim();if(!i||(!o&&i.includes("//")&&!i.includes('"//')&&!i.includes("'//")&&(i=i.split("//")[0].trim()),!i))continue;if(/^(insertRow|updateRow|deleteRow)\s*\(/.test(i)&&!o?(s&&r.push(s),s=i):s+=(s?" ":"")+i,s){let c=(s.match(/\{/g)||[]).length,d=(s.match(/\}/g)||[]).length;o=c>d}}s&&r.push(s);let n=[];for(let a of r){let i=/(?:^|;\s*)((?:insertRow|deleteRow|updateRow)\s*\()/g,l=[],c;for(;(c=i.exec(a))!==null;)l.push(c.index+(c[0].length-c[1].length));if(l.length<=1)n.push(a.replace(/;\s*$/,""));else for(let d=0;d<l.length;d++){let u=l[d],y=d+1<l.length?l[d+1]:a.length,p=a.substring(u,y).replace(/;\s*$/,"").trim();p&&n.push(p)}}return n}function zv(t){try{let e=t;if(e.match(/\)\s*;?\s*\/\/.*$/)&&(e=e.replace(/\/\/.*$/,"").trim()),!e)return null;let r=e.match(/^(insertRow|deleteRow|updateRow)\s*\((.*)\);?$/);if(!r)return null;let s=r[1],o=r[2],n=o.indexOf("{");if(n===-1)return{command:s,args:JSON.parse(`[${o}]`),line:e};let a=o.substring(0,n).trim(),i=o.substring(n),l=JSON.parse(`[${a.replace(/,$/,"")}]`);try{return{command:s,args:[...l,JSON.parse(i)],line:e}}catch{}let c=Yf(i);if(c.success)return{command:s,args:[...l,c.result],line:e};let d=Sn(i);if(!d.success)return null;try{return{command:s,args:[...l,JSON.parse(d.result)],line:e}}catch{}let u=Yf(d.result);return u.success?{command:s,args:[...l,u.result],line:e}:null}catch{return null}}function Kv(t){if(!t)return null;let{command:e,args:r}=t;if(e==="insertRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="object"&&r[1]!==null?r[1]:{};return{op:e,tableIndex:s,data:o}}if(e==="deleteRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="number"?r[1]:0;return{op:e,tableIndex:s,rowIndex:o}}if(e==="updateRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="number"?r[1]:0,n=typeof r[2]=="object"&&r[2]!==null?r[2]:{};return{op:e,tableIndex:s,rowIndex:o,data:n}}return null}function Uv(t){let e=Ov(t);if(!e.length)return null;let r=[],s=[];for(let o of e){let n=o.replace(/<!--|-->/g,"").trim();if(!n)continue;let a=Bv(n);for(let i of a){let l=zv(i),c=Kv(l);c?r.push(c):i&&/^(insertRow|updateRow|deleteRow)/.test(i)&&s.push(i.slice(0,200))}}if(s.length>0)try{console.warn("[TableJsonSanitizer] parseIncrementalEdits: %d \u6761\u6307\u4EE4\u89E3\u6790\u5931\u8D25",s.length,s)}catch{}return r.length?r:null}function jv(t){Wf.lastIndex=0;let e;for(;(e=Wf.exec(t))!==null;){let g=e[1].trim();if(g)try{return JSON.parse(g)}catch{let h=Sn(g);if(h.success)try{return JSON.parse(h.result)}catch{}}}let r=t.trim();try{return JSON.parse(r)}catch{}let s=Sn(r);if(s.success)try{return JSON.parse(s.result)}catch{}let o=r.indexOf("{"),n=r.indexOf("["),a=-1,i="",l="";if(o!==-1&&(n===-1||o<n)?(a=o,i="{",l="}"):n!==-1&&(a=n,i="[",l="]"),a===-1)return null;let c=0,d=-1,u=!1,y=!1;for(let g=a;g<r.length;g++){let f=r[g];if(y){y=!1;continue}if(f==="\\"&&u){y=!0;continue}if(f==='"'){u=!u;continue}if(!u){if(f===i)c++;else if(f===l&&(c--,c===0)){d=g;break}}}if(d===-1)return null;let p=r.substring(a,d+1);try{return JSON.parse(p)}catch{let f=Sn(p);if(f.success)try{return JSON.parse(f.result)}catch{}}return null}function Gf(t){if(!t||typeof t!="string")return{mode:"empty",edits:null,tables:null};let e=Uv(t);if(e)return{mode:"incremental",edits:e,tables:null};let r=jv(t);if(r){let s=null;if(Array.isArray(r))s=r;else if(r&&Array.isArray(r.tables))s=r.tables;else if(r&&typeof r=="object"){for(let o of Object.values(r))if(Array.isArray(o)){s=o;break}}if(Array.isArray(s))return{mode:"full",edits:null,tables:s}}return{mode:"empty",edits:null,tables:null}}var Ff,Wf,qf=N(()=>{Ff=/<tableEdit>([\s\S]*?)<\/tableEdit>/gi,Wf=/```(?:json)?\s*([\s\S]*?)```/gi});function Fv(t,e){let r=new Map;Array.isArray(t)&&t.forEach((n,a)=>{n&&typeof n=="object"&&r.set(n.name||`__row_${a}`,n)});let s=new Map;Array.isArray(e)&&e.forEach((n,a)=>{n&&typeof n=="object"&&s.set(n.name||`__row_${a}`,n)});let o={};for(let[n,a]of s){let i=r.get(n);if(i){o[n]={};let l=new Set([...Object.keys(i.cells||{}),...Object.keys(a.cells||{})]);for(let c of l){let d=String((i.cells&&i.cells[c])??""),u=String((a.cells&&a.cells[c])??"");o[n][c]=d===u?"unchanged":"updated"}o[n].__rowStatus="kept"}else{if(o[n]={},a.cells&&typeof a.cells=="object")for(let l of Object.keys(a.cells))o[n][l]="new";o[n].__rowStatus="new"}}for(let[n]of r)s.has(n)||(o[n]={__rowStatus:"deleted"});return o}function Vf(t,e){let r=Array.isArray(t)?ae(t):[],s=Array.isArray(e)?ae(e):[],o={},n=Math.max(r.length,s.length);for(let a=0;a<n;a++){let i=r[a],l=s[a];!i&&l?(o[a]={},Array.isArray(l.rows)&&l.rows.forEach(c=>{let d=c.name||`__row_${l.rows.indexOf(c)}`;o[a][d]={__rowStatus:"new"}})):i&&!l?(o[a]={},Array.isArray(i.rows)&&i.rows.forEach(c=>{let d=c.name||`__row_${i.rows.indexOf(c)}`;o[a][d]={__rowStatus:"deleted"}})):i&&l&&(o[a]=Fv(i.rows,l.rows))}return o}var Jf=N(()=>{je()});function Wv(){return{mode:"native",async buildRequest(t={},e={}){if(typeof t.buildRequest!="function")throw new Error("table_provider_missing_build_request");return t.buildRequest(e)},async sendRequest(t={},e=null,r={}){if(typeof t.sendRequest!="function")throw new Error("table_provider_missing_send_request");return t.sendRequest(e?.messages||[],r.config||{},r.abortSignal||null)},parseResponse(t={},e=""){if(typeof t.parseResponse!="function")throw new Error("table_provider_missing_parse_response");return t.parseResponse(e)}}}function Xf(){return Wv()}var Qf=N(()=>{});function _o(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function qv(){let t=Gv.get(Yv,{});return _o(t)?t:{}}function Vv(t){let e=qv();return _o(e[t])?e[t]:{}}function Jv(t){let e=pp();return _o(t)&&(Array.isArray(t.rows)&&(e.rows=Array.from(new Set(t.rows.filter(r=>Number.isFinite(r)).map(r=>Math.floor(r)))),e.rows.sort((r,s)=>r-s)),Array.isArray(t.cols)&&(e.cols=Array.from(new Set(t.cols.filter(r=>typeof r=="string"&&r.length>0)))),Array.isArray(t.cells)&&(e.cells=Array.from(new Set(t.cells.filter(r=>typeof r=="string"&&r.includes(":"))))),e.indexColumn=t.indexColumn===!0),e}function Xv(t){if(typeof t=="string")return t;if(_o(t)){if(typeof t.scopeKey=="string"&&t.scopeKey.includes("::"))return t.scopeKey;if(t.chatId!==void 0){let e=t.isolationKey!==void 0?t.isolationKey:Ie.getKey();return Zo(t.chatId,e)}}return Zo("",Ie.getKey())}function Qv(t,e){let r=Vv(t),s={};if(!Array.isArray(e))return s;for(let o=0;o<e.length;o++){let n=e[o];if(!n)continue;let a=n.uid||n.id||"";a&&r[a]&&(s[o]=Jv(r[a]))}return s}function Zf(t,e=[]){let r=Xv(t);return Qv(r,e)}function eg(t,e,r,s){if(!_o(t))return!1;let o=t[e];if(!o)return!1;if(Number.isFinite(r)&&o.rows.includes(r)||typeof s=="string"&&s.length>0&&o.cols.includes(s))return!0;if(Number.isFinite(r)&&typeof s=="string"&&s.length>0){let n=`${r}:${s}`;if(o.cells.includes(n))return!0}return!1}function xc(t,e,r){if(!_o(t))return!1;let s=t[e];return s?Number.isFinite(r)&&s.rows.includes(r):!1}var Hv,Yv,Gv,tg=N(()=>{Be();W();je();vs();Hv="tableLocks",Yv="scopes",Gv=D.namespace(Hv)});function Ce(){return I.createScope("TableUpdate")}function eT(t,e){return new Promise(r=>{if(e?.aborted){r(!1);return}let s,o=()=>{clearTimeout(s);try{e?.removeEventListener?.("abort",o)}catch{}r(!1)};s=setTimeout(()=>{try{e?.removeEventListener?.("abort",o)}catch{}r(!0)},t);try{e?.addEventListener?.("abort",o)}catch{}})}function Y(t,e=""){return t==null?e:String(t).trim()||e}function rg(t=[],e=8,r="all"){if(!Array.isArray(t)||t.length===0)return"";let s=r==="assistant_only"?t.filter(o=>o?.role==="assistant"):t;return s.slice(Math.max(s.length-e,0)).map(o=>`[${Y(o?.role,"unknown")}] ${String(o?.content||"").trim()}`).filter(Boolean).join(`

`)}function sg(t,{extractTags:e=[],useGlobalRules:r=!1}={}){if(!t)return t;let s=Array.isArray(e)&&e.length>0;if(!s&&!r)return t;try{let o=[],n=[];if(s&&(o=e.map(a=>{let i=String(a||"").trim();return i.startsWith("regex:")?{type:"regex_include",value:i.slice(6).trim(),enabled:!0}:{type:"include",value:i,enabled:!0}}).filter(a=>a.value)),r){let a=Fs()||[];o=[...o,...a.filter(i=>i?.enabled)],n=Ws()||[]}return o.length===0&&n.length===0?t:fr(t,o,n)||t}catch(o){return Ce().warn("applyContextExtractionRules \u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",o),t}}function tT(t=[],e=-1){return!Number.isFinite(e)||e<0?t:t.map(r=>{let s=Array.isArray(r?.rows)?r.rows:[];return e===0||s.length<=e?r:{...r,rows:s.slice(s.length-e)}})}function rT(t=[]){return!Array.isArray(t)||t.length===0?"":t.map((e,r)=>{let s=e?.aiInstructions&&typeof e.aiInstructions=="object"?e.aiInstructions:{},o=Array.isArray(e?.columns)?e.columns:[],n=[`\u8868 ${r}: ${Y(e?.name,`\u8868${r+1}`)}`,`\u8868\u683C\u8BF4\u660E: ${Y(e?.note,"\u65E0")}`,`\u521D\u59CB\u5316\u8BF4\u660E: ${Y(s.init,"\u65E0")}`,`\u65B0\u589E\u8BF4\u660E: ${Y(s.create,"\u65E0")}`,`\u66F4\u65B0\u8BF4\u660E: ${Y(s.update,"\u65E0")}`,`\u5220\u9664\u8BF4\u660E: ${Y(s.delete,"\u65E0")}`,"\u5B57\u6BB5\uFF08\u8BF7\u7528\u5217\u7D22\u5F15\u4F5C\u4E3A data key\uFF09:"];return o.forEach((a,i)=>{n.push(`- [${i}]: ${Y(a?.title||a?.key,"\u672A\u547D\u540D\u5B57\u6BB5")} \u2014 ${Y(a?.description,"\u65E0")}`)}),n.join(`
`)}).join(`

`)}function sT(t,e=[]){if(!t||!Array.isArray(e)||e.length===0)return"";let r=e.map((o,n)=>{let a=Y(o?.name,`\u8868${n+1}`),i=t.includes(o,n);return`\u8868 ${n}: ${a} - ${i?"\u5141\u8BB8\u7F16\u8F91":"\u53EA\u8BFB\uFF0C\u7981\u6B62\u4FEE\u6539"}`});return e.some((o,n)=>!t.includes(o,n))&&(r.push(""),r.push('\u3010\u91CD\u8981\u7EA6\u675F\u3011\u6807\u8BB0\u4E3A"\u53EA\u8BFB"\u7684\u8868\u683C\uFF0C\u4F60\u5FC5\u987B\u5728\u8F93\u51FA\u4E2D\u539F\u6837\u4FDD\u7559\u5176\u6240\u6709\u884C\u6570\u636E\uFF0C\u4E0D\u5F97\u65B0\u589E\u3001\u4FEE\u6539\u6216\u5220\u9664\u4EFB\u4F55\u884C\u3002'),r.push("\u5168\u91CF\u8F93\u51FA\u65F6\uFF0C\u53EA\u8BFB\u8868\u683C\u7684 rows \u5FC5\u987B\u4E0E\u8F93\u5165\u4E2D\u7684\u5B8C\u5168\u4E00\u81F4\u3002")),r.join(`
`)}function ag(t={},e=0,r=[]){let s=t&&typeof t=="object"?t:{},o=s.cells&&typeof s.cells=="object"&&!Array.isArray(s.cells)?s.cells:{},n={},a=Array.isArray(r)?r.map(l=>Y(l?.key,"")).filter(Boolean):[];return new Set([...Object.keys(o),...a]).forEach(l=>{n[l]=Y(o[l],"")}),{...s,id:Xo(s.id||s.rowId,e),name:Y(s.name,""),cells:n}}function Ds(t={},e=0){let r=t&&typeof t=="object"?t:{},s=Array.isArray(r.columns)?ae(r.columns):[],o=Array.isArray(r.rows)?r.rows.map((n,a)=>ag(n,a,s)):[];return{...r,id:Wt(r.id||r.key,e),rows:o}}function ir(t=[]){return Array.isArray(t)?t.map((e,r)=>Ds(e,r)):[]}function oT(t=[],e=[],r){let s=ir(t),o=ir(e);if(!r)return o;let n=new Map(o.map((u,y)=>[Wt(u?.id||u?.key,y),u])),a=s.map((u,y)=>({table:u,tableIndex:y,id:Wt(u?.id||u?.key,y)})).filter(({table:u,tableIndex:y})=>r.includes(u,y)),i=new Set,l=new Map;for(let u=0;u<o.length;u++){let y=o[u],p=Wt(y?.id||y?.key,u);n.has(p)&&(l.set(p,y),i.add(p))}let c=0,d=o.filter((u,y)=>{let p=Wt(u?.id||u?.key,y);return!i.has(p)});return s.map((u,y)=>{let p=Wt(u?.id||u?.key,y);if(!r.includes(u,y))return Ds(u,y);let g=l.get(p);if(g)return Ds(g,y);let f=d[c];return f?(c++,Ds({...f,id:u.id||f.id},y)):Ds(u,y)})}function nT(t=[],e=[],r,s={}){if(!Array.isArray(t)||!r)return{edits:[],stats:{total:0,passed:0,droppedByScope:0,droppedByLock:0}};let o=ir(e),n=[],a=0,i=0;for(let l of t){let c=Number.isFinite(l?.tableIndex)?l.tableIndex:-1;if(c<0||c>=o.length){a++;continue}let d=o[c];if(!r.includes(d,c)){a++;continue}if(l.op===ro.INSERT_ROW){n.push(l);continue}let u=Number.isFinite(l?.rowIndex)?l.rowIndex:-1;if(u<0||u>=(Array.isArray(d?.rows)?d.rows.length:0)){a++;continue}if(l.op===ro.DELETE_ROW){if(xc(s,c,u)){i++;continue}n.push(l);continue}n.push(l)}return{edits:n,stats:{total:t.length,passed:n.length,droppedByScope:a,droppedByLock:i}}}function aT(t=[],e){let r=ir(t);return e?r.map((s,o)=>{let n=Array.isArray(s?.columns)?s.columns:[];return e.includes(s,o)?{...Ds(s,o),scopeEditable:!0,scopeStatus:"editable"}:{...Ds(s,o),scopeEditable:!1,scopeStatus:"readonly",rows:Array.isArray(s?.rows)?s.rows.map((a,i)=>ag(a,i,n)):[]}}):r}function iT(t,e,r){return{target:{sourceMessageId:Y(t?.sourceMessageId),sourceSwipeId:Y(t?.sourceSwipeId||t?.effectiveSwipeId),slotBindingKey:Y(t?.slotBindingKey),slotRevisionKey:Y(t?.slotRevisionKey),slotTransactionId:Y(t?.slotTransactionId)},loadMode:Y(e?.loadMode),mergeBaseOnly:e?.mergeBaseOnly===!0,resolvedFromMessageId:Y(e?.resolvedFromMessageId),resolvedFromRevisionKey:Y(e?.resolvedFromRevisionKey),sourceKind:Y(e?.sourceKind||e?.state?.meta?.sourceKind),scope:typeof r?.toJSON=="function"?r.toJSON():null,tables:aT(e?.state?.tables,r)}}function og(){return lT}function ng(t,e){if(!t||typeof t!="string")return{key:t,source:"fallback"};if(!Array.isArray(e)||e.length===0)return{key:t,source:"fallback"};for(let s of e)if(s?.key===t)return{key:t,source:"direct"};if(/^\d+$/.test(t)){let s=parseInt(t,10);if(s>=0&&s<e.length&&e[s]?.key)return{key:e[s].key,source:"index"}}let r=t.match(/^col(?:_(\d+))?$/i);if(r){let s=r[1]?parseInt(r[1],10)-1:0;if(s>=0&&s<e.length&&e[s]?.key)return{key:e[s].key,source:"col_n"}}return{key:t,source:"fallback"}}function cT(t,e,r,s=null){let o=ir(t||[]),n=r||{},a={direct:0,index:0,col_n:0,fallback:0},i={},l={};if(Array.isArray(e))for(let c of e){let d=Number.isFinite(c?.tableIndex)?c.tableIndex:-1;i[d]=(i[d]||0)+1,l[c?.op||"unknown"]=(l[c?.op||"unknown"]||0)+1}Ce().info("applyIncrementalEdits \u603B\u89C8",{totalEdits:e?.length||0,tableCount:o.length,editsByTable:i,editsByOp:l});for(let c of e){let d=c.tableIndex;if(d<0||d>=o.length)continue;let u=o[d];if(!u||!Array.isArray(u.rows)||s&&!s.includes(u,d))continue;if(c.op===ro.INSERT_ROW){let p={id:Jo("row"),name:"",cells:{}};if(c.data&&typeof c.data=="object"){p.name=Y(c.data.name,"");let f=Array.isArray(u.columns)?u.columns:[];for(let[h,x]of Object.entries(c.data)){if(h==="name")continue;let{key:T,source:v}=ng(h,f);p.cells[T]=Y(x),a[v]=(a[v]||0)+1}}Object.keys(p.cells).length===0&&!p.name&&Ce().warn("applyIncrementalEdits: \u63D2\u5165\u7A7A\u884C\uFF08data \u89E3\u6790\u4E3A\u7A7A\uFF09",{tableIndex:d,tableName:u.name,editDataKeys:c.data?Object.keys(c.data):[],editDataPreview:JSON.stringify(c.data||{}).slice(0,200)}),u.rows.push(p);continue}let y=c.rowIndex;if(!(y<0||y>=u.rows.length)){if(c.op===ro.DELETE_ROW){if(xc(n,d,y))continue;u.rows.splice(y,1);continue}if(c.op===ro.UPDATE_ROW){let p=u.rows[y];if(!p)continue;if(p.id=Xo(p.id||p.rowId,y),p.cells=p.cells||{},c.data&&typeof c.data=="object"){let g=Array.isArray(u.columns)?u.columns:[];for(let[f,h]of Object.entries(c.data)){if(f==="name")continue;let{key:x,source:T}=ng(f,g);eg(n,d,y,x)||(p.cells[x]=Y(h),a[T]=(a[T]||0)+1)}c.data.name!==void 0&&(p.name=Y(c.data.name,p.name))}}}}return Object.values(a).some(c=>c>0)&&Ce().info("\u5217 key \u89E3\u6790\u7EDF\u8BA1",a),ir(o)}async function dT({executionContext:t,targetSnapshot:e,loadResult:r,config:s,assistantSnapshot:o,fillMode:n,runScope:a}={}){let i=$t(s),l=n==="incremental"||!n&&i.fillMode!=="full",c=Ip(i,{skipResponseContract:l}),d=iT(e,r,a),u=Array.isArray(o?.tableState?.tables)?ir(o.tableState.tables):[],y=t?.chatHistory||t?.chatMessages||[],{contextDepth:p,contextRoles:g,contextExtractTags:f,contextUseGlobalRules:h,sendLatestRows:x}=i,T=rg(y,p,g),v=rg(y,p,"all"),z=sg(T,{extractTags:f,useGlobalRules:h}),M=sg(v,{extractTags:f,useGlobalRules:h}),S=await Hn({worldbooks:i.worldbooks}),E=tT(d.tables,x),G={...d,tables:E},q={...t,toolName:"\u586B\u8868\u5DE5\u4F5C\u53F0",toolId:"tableWorkbench",lastAiMessage:t?.assistantBaseText||t?.lastAiMessage||"",recentMessagesText:z,rawRecentMessagesText:M,toolWorldbookContent:S,tableGuidance:rT(i.tables),tableScopeGuidance:sT(a,d.tables),injectedContext:o?.injectedContext||_t.getLatestMessageInjectedContext(e?.sourceMessageId),toolContentMacro:JSON.stringify(G,null,2),extractedContent:JSON.stringify(G,null,2),previousToolOutput:JSON.stringify(u,null,2)},$=await Cs.buildToolMessages(c,q),A=await Cs.buildPromptText(c,q);if(l&&(A+=og(),Array.isArray($)&&$.length>0)){let J=$[$.length-1];J&&typeof J.content=="string"&&(J.content+=og())}if(!Array.isArray($)||$.length===0)throw new Error("\u586B\u8868\u8BF7\u6C42\u6D88\u606F\u6784\u5EFA\u5931\u8D25\u3002");return{toolConfig:c,context:q,requestPayload:d,promptText:A,messages:$,fillMode:l?"incremental":"full",runScope:typeof a?.toJSON=="function"?a.toJSON():null}}async function uT(t,e={},r=null){let s=$t(e),o=Y(s.apiPreset,"");if(o){if(!Ro(o))throw new Error(`API \u9884\u8BBE\u4E0D\u5B58\u5728: ${o}`);return ui(o,t,{},r)}return Po(t,{},r)}function _r({status:t=ve.IDLE,targetSnapshot:e=null,skipReason:r="",startedAt:s=Date.now(),error:o=""}={}){return{lastAutoRunAt:s,lastAutoStatus:Y(t,ve.IDLE),lastAutoMessageId:Y(e?.sourceMessageId,""),lastAutoRevisionKey:Y(e?.slotRevisionKey,""),lastAutoSkipReason:Y(r,""),...o?{lastError:o,lastErrorDetails:[o]}:{}}}function ar(t={},e=Qe.MANUAL){let r=t&&typeof t=="object"?t:{};return Object.keys(r).length?kp(r):null}function Ns({targetSnapshot:t=null,startedAt:e=Date.now(),status:r="idle",skipReason:s="",warning:o="",writeback:n=null,aborted:a=!1,stale:i=!1,abortReason:l="",error:c=""}={}){return{isAutoRun:!0,status:r,startedAt:e,targetSnapshot:t,sourceMessageId:Y(t?.sourceMessageId,""),sourceSwipeId:Y(t?.sourceSwipeId||t?.effectiveSwipeId,""),slotRevisionKey:Y(t?.slotRevisionKey,""),writebackStatus:n?.success===!0?"success":o?"warning":"",refreshConfirmed:n?.mirrorResult?.refreshConfirmed===!0,warning:Y(o,""),skipReason:Y(s,""),aborted:a===!0,stale:i===!0,abortReason:Y(l,""),error:Y(c,"")}}function Va(t=null){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}async function _n(t=null,e={}){return lg({configInput:t,runSource:Qe.MANUAL,clearBeforeUpdate:e?.clearBeforeUpdate===!0,executionContextBuilder:()=>cs({runSource:Qe.MANUAL}),targetResolver:r=>bn(r,{runSource:Qe.MANUAL})})}async function ig({messageId:t,swipeId:e="",sourceEvent:r="AUTO_TABLE",configInput:s=null,signal:o=null,shouldAbortWriteback:n=null}={}){return lg({configInput:s,runSource:Qe.AUTO,autoMeta:{sourceEvent:r,messageId:Y(t,""),swipeId:Y(e,""),signal:o,shouldAbortWriteback:n},executionContextBuilder:()=>ds({messageId:t,swipeId:e,runSource:Qe.AUTO}),targetResolver:a=>bn(a,{runSource:Qe.AUTO})})}async function lg({configInput:t=null,runSource:e=Qe.MANUAL,executionContextBuilder:r,targetResolver:s,autoMeta:o=null,clearBeforeUpdate:n=!1}={}){let a=$t(t||Le()),i=hl(a),l=ca({tables:Array.isArray(a.tables)?a.tables:[]}),c=e===Qe.AUTO,d=Date.now();if(Ce().info(`\u5F00\u59CB\u586B\u8868 [${e}]`,{isAutoRun:c,fillMode:a.fillMode}),!i.valid||!l.valid){let f=[...i.errors,...l.errors];return Ce().error("\u914D\u7F6E\u6821\u9A8C\u5931\u8D25",{errors:f}),ar({lastStatus:ve.ERROR,lastRunAt:d,lastDurationMs:0,lastError:f[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002",lastErrorDetails:f,lastValidationSummary:l.summary||{errorCount:f.length,warningCount:0},errorCount:Number(a?.runtime?.errorCount)||0,...c?_r({status:ve.ERROR,startedAt:d,skipReason:"invalid_config",error:f[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"}):{}},e),{success:!1,error:f.join(`
`),errors:f,...c?{meta:Ns({startedAt:d,status:ve.ERROR,skipReason:"invalid_config",error:f[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"})}:{}}}let u=a.runtime||{},y=Array.isArray(a.tables)?a.tables:[];try{let h=mo({})?.template?.tables;if(Array.isArray(h)&&h.length>0){let x=a.tableEnabledOverrides&&typeof a.tableEnabledOverrides=="object"?a.tableEnabledOverrides:{};y=h.map(v=>{let z=v?.id,M=z&&Object.prototype.hasOwnProperty.call(x,z)?x[z]:void 0;return{...v,enabled:M!==void 0?M:v.enabled!==!1}});let T=y.filter(v=>v.enabled===!1).map(v=>v?.name||v?.id);T.length>0&&Ce().info("scopeTables: \u7528\u6237\u7981\u7528\u4E86\u90E8\u5206\u8868",{disabledCount:T.length,disabledNames:T})}}catch{}let p=yp(a.scope||a,y);if(Ce().info("runScope \u5DF2\u89E3\u6790",{mode:p.mode,requestedMode:p.requestedMode,staleScope:p.staleScope,scopeTablesCount:Array.isArray(y)?y.length:0,allowedTableIds:p.allowedTableIds,allTableIds:p.allTableIds,scopeTablesEnabled:Array.isArray(y)?y.map(f=>({id:f?.id,name:f?.name,enabled:f?.enabled})):[]}),p.staleScope&&Ce().warn("runScope: \u68C0\u6D4B\u5230 stale scope\uFF08activeTableId/selectedTableIds \u4E0D\u5728\u5F53\u524D tables \u8303\u56F4\u5185\uFF09\uFF0C\u5DF2\u81EA\u52A8 fallback \u5230 enabled",{requestedMode:p.requestedMode,requestedActiveTableId:p.activeTableId,requestedSelectedTableIds:p.selectedTableIds}),(p.mode==="current"||p.mode==="selected")&&p.allowedTableIds.length===0){let f=p.mode==="current"?"\u672A\u6307\u5B9A\u5F53\u524D\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002":"\u672A\u9009\u62E9\u4EFB\u4F55\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002";return Ce().warn(f,{mode:p.mode}),ar({lastStatus:ve.ERROR,lastRunAt:d,lastDurationMs:0,lastError:f,lastErrorDetails:[f]},e),{success:!1,error:f,errors:[f]}}let g=null;ar({lastStatus:ve.RUNNING,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},lastScopeMode:Y(p.mode,""),...c?_r({status:ve.RUNNING,startedAt:d,skipReason:""}):{}},e);try{if(typeof r!="function")throw new Error("table_update_missing_execution_context_builder");if(typeof s!="function")throw new Error("table_update_missing_target_resolver");let f=await r();Ce().info("\u6267\u884C\u4E0A\u4E0B\u6587\u5DF2\u6784\u5EFA");let h=s(f);if(!h)throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u697C\u5C42\u3002");g=h,Ce().info("\u76EE\u6807\u6D88\u606F\u5DF2\u89E3\u6790",{sourceMessageId:h.sourceMessageId,slotRevisionKey:h.slotRevisionKey}),c&&ar(_r({status:ve.RUNNING,targetSnapshot:h,startedAt:d,skipReason:""}),e);let x=Y(a.autoUpdateTrigger,"assistantMessage");if(c&&(!a.autoUpdateEnabled||x!=="assistantMessage")){let j=a.autoUpdateEnabled?"auto_trigger_not_assistant_message":"auto_update_disabled";return ar(_r({status:ve.SKIPPED,targetSnapshot:h,startedAt:d,skipReason:j}),e),{success:!1,skipped:!0,reason:j,targetSnapshot:h,meta:Ns({targetSnapshot:h,startedAt:d,status:ve.SKIPPED,skipReason:j})}}if(c){let j=Va(o);if(j)return ar(_r({status:ve.ABORTED,targetSnapshot:h,startedAt:d,skipReason:j.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:h,meta:Ns({targetSnapshot:h,startedAt:d,status:ve.ABORTED,skipReason:j.reason,aborted:j.aborted===!0,stale:j.stale===!0,abortReason:j.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}let T=await Cf(h);if(!T?.success)throw new Error(T?.error||"\u76EE\u6807\u89E3\u6790\u8BB0\u5F55\u5931\u8D25");if(n&&Number.isFinite(h?.targetMessageIndex)&&h.targetMessageIndex>=0){Ce().info("clearBeforeUpdate \u542F\u7528\uFF0C\u6E05\u7A7A\u76EE\u6807\u697C\u5C42\u6570\u636E",{targetMessageIndex:h.targetMessageIndex});try{let j=await kf(h.targetMessageIndex);Ce().info("clearBeforeUpdate \u5B8C\u6210",j)}catch(j){Ce().error("clearBeforeUpdate \u5931\u8D25",j)}}let v=Ps(h.sourceMessageId),z=Array.isArray(y)&&y.length>0?y:a.tables;Ce().info("templateTables \u6765\u6E90",{usingActiveTemplate:y!==(Array.isArray(a.tables)?a.tables:[]),tableCount:Array.isArray(z)?z.length:0,firstTableName:z?.[0]?.name||"",firstTableId:z?.[0]?.id||""});let M=Af(h,{templateTables:z}),S=ir(M?.state?.tables||[]),E=Xf(),G=o?.signal||f?.signal||null;Ce().info("\u72B6\u6001\u5DF2\u52A0\u8F7D",{loadMode:M?.loadMode,sourceKind:M?.sourceKind,tableCount:S.length});let q=await E.buildRequest({buildRequest:dT},{executionContext:f,targetSnapshot:h,loadResult:M,config:a,assistantSnapshot:v,runScope:p});Ce().info("\u8BF7\u6C42\u5DF2\u6784\u5EFA",{messageCount:q?.messages?.length,fillMode:q?.fillMode});let $="",A=null,J=null;for(let j=1;j<=qa;j++){if(G?.aborted)throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88");try{if($=await E.sendRequest({sendRequest:uT},q,{config:a,abortSignal:G}),Ce().info("API \u54CD\u5E94\u5DF2\u6536\u5230",{attempt:j,responseLength:$?.length||0}),A=E.parseResponse({parseResponse:Gf},$),Ce().info("\u54CD\u5E94\u5DF2\u89E3\u6790",{attempt:j,mode:A?.mode,hasEdits:!!A?.edits,hasTables:!!A?.tables}),!(A?.mode==="incremental"&&Array.isArray(A.edits)&&A.edits.length>0||A?.mode==="full"&&A?.tables))throw new Error("AI \u54CD\u5E94\u4E2D\u672A\u627E\u5230\u6709\u6548\u7684 <tableEdit> \u6807\u7B7E\u6216\u8868\u683C JSON");J=null;break}catch(le){if(J=le,Ce().warn(`\u586B\u8868 attempt ${j}/${qa} \u5931\u8D25`,{error:le?.message||String(le)}),j<qa&&!await eT(Zv,G))throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88\uFF08\u91CD\u8BD5\u7B49\u5F85\u671F\u95F4\uFF09")}}if(J)throw new Error(`\u586B\u8868\u5931\u8D25\uFF08${qa} \u6B21\u91CD\u8BD5\u540E\u4ECD\u5931\u8D25\uFF09: ${J?.message||String(J)}`);let U,ee=null,ye=q.fillMode||"full",Te=null;if(A.mode==="incremental"&&A.edits){let j=Zf(M?.state,S),le=nT(A.edits,S,p,j);Te=le.stats,U=cT(S,le.edits,j,p),ye="incremental",(Te.droppedByScope>0||Te.droppedByLock>0)&&Ce().info("scope \u8FC7\u6EE4",Te)}else if(A.mode==="full"&&A.tables){let j=ir(A.tables);U=oT(S,j,p),ye="full"}else U=ir(S);if(ee=Vf(S,U),Ce().info("\u5DEE\u5F02\u5DF2\u8BA1\u7B97",{fillMode:ye}),c){let j=Va(o);if(j)return ar(_r({status:ve.ABORTED,targetSnapshot:h,startedAt:d,skipReason:j.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88",targetSnapshot:h,meta:Ns({targetSnapshot:h,startedAt:d,status:ve.ABORTED,aborted:j.aborted===!0,stale:j.stale===!0,abortReason:j.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"})}}let ue=await Uf({targetSnapshot:h,nextTables:U,config:a,loadResult:M,diff:ee,fillMode:ye,skipNotify:c});if(c){let j=Va(o);if(j)return ar(_r({status:ve.ABORTED,targetSnapshot:h,startedAt:d,skipReason:j.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:h,loadResult:M,request:q,responseText:$,parsed:A,fillMode:ye,diff:ee,previousTables:S,nextTables:U,runScope:p,state:ue?.state,bindings:ue?.bindings,mirrorResult:ue?.mirrorResult,warning:ue?.warning||"",meta:Ns({targetSnapshot:h,startedAt:d,status:ve.ABORTED,warning:ue?.warning||"",writeback:ue,aborted:j.aborted===!0,stale:j.stale===!0,abortReason:j.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}if(!ue?.success)throw new Error(ue?.error||"\u7ED3\u6784\u5316\u5199\u56DE\u5931\u8D25");let Ze=Date.now()-d;Ce().info(`\u586B\u8868\u5B8C\u6210 [${ye}] ${Ze}ms`,{success:!0,writebackSuccess:ue?.success,mirrorSuccess:ue?.mirrorResult?.success});let Ve={lastStatus:ve.SUCCESS,lastRunAt:Date.now(),lastDurationMs:Ze,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:(Number(u.successCount)||0)+1,errorCount:Number(u.errorCount)||0,lastSourceMessageId:Y(h.sourceMessageId),lastSlotRevisionKey:Y(h.slotRevisionKey),lastLoadMode:Y(M.loadMode),lastMirrorApplied:ue?.mirrorResult?.success===!0,lastResolvedFromMessageId:Y(M?.resolvedFromMessageId),lastResolvedFromRevisionKey:Y(M?.resolvedFromRevisionKey),lastSourceKind:Y(M?.sourceKind||M?.state?.meta?.sourceKind),lastScopeMode:Y(p.mode,""),lastFillMode:ye,...c?_r({status:ve.SUCCESS,targetSnapshot:h,startedAt:d,skipReason:""}):{}};return ar(Ve,e),{success:!0,targetSnapshot:h,loadResult:M,request:q,responseText:$,parsed:A,fillMode:ye,diff:ee,previousTables:S,nextTables:U,runScope:p,scopeStats:Te,state:ue.state,bindings:ue.bindings,mirrorResult:ue.mirrorResult,warning:ue.warning||"",...c?{meta:Ns({targetSnapshot:h,startedAt:d,status:ve.SUCCESS,warning:ue.warning||"",writeback:ue})}:{}}}catch(f){let h=Date.now()-d;Ce().error(`\u586B\u8868\u5931\u8D25 ${h}ms: ${f?.message||f}`,{stack:f?.stack});let x=c?Va(o):!1,T=f?.name==="AbortError"||f?.message==="\u8BF7\u6C42\u5DF2\u53D6\u6D88"||x?.aborted===!0||x?.stale===!0,v=T?ve.ABORTED:ve.ERROR,z={lastStatus:v,lastRunAt:Date.now(),lastDurationMs:h,lastError:f?.message||String(f),lastErrorDetails:[f?.message||String(f)],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:Number(u.successCount)||0,errorCount:T?Number(u.errorCount)||0:(Number(u.errorCount)||0)+1,lastScopeMode:Y(p.mode,""),...c?_r({status:v,targetSnapshot:g,startedAt:d,skipReason:T?x?.reason||"cancelled_before_host_commit":"",error:f?.message||String(f)}):{}};return ar(z,e),{success:!1,error:f?.message||String(f),errors:[f?.message||String(f)],...c?{meta:Ns({targetSnapshot:g,startedAt:d,status:v,skipReason:T?x?.reason||"cancelled_before_host_commit":"",aborted:T,stale:x?.stale===!0,abortReason:T?x?.reason||"cancelled_before_host_commit":"",error:f?.message||String(f)})}:{}}}}var qa,Zv,lT,Ja=N(()=>{us();As();Rn();Ra();W();je();za();wn();br();jf();qf();Jf();aa();Qf();tg();no();Yn();Hs();qa=3,Zv=5e3;lT=`

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

\u53EA\u8FD4\u56DE <tableEdit> \u6807\u7B7E\uFF0C\u4E0D\u8981\u9644\u52A0\u5176\u4ED6\u5185\u5BB9\u3002`});var ug={};se(ug,{WindowManager:()=>Xa,closeWindow:()=>dg,createWindow:()=>wc,windowManager:()=>Ct});function fT(){if(Ct.stylesInjected)return;Ct.stylesInjected=!0;let t=`
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
  `,e=cr(),r=e.createElement("style");r.id=yT+"_styles",r.textContent=t,(e.head||e.documentElement).appendChild(r)}function wc(t){let{id:e,title:r="\u7A97\u53E3",content:s="",width:o=900,height:n=700,modal:a=!1,resizable:i=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:d=!0,onClose:u,onReady:y}=t;fT();let p=window.jQuery||window.parent?.jQuery;if(!p)return pT.error("jQuery not available"),null;if(Ct.isOpen(e))return Ct.bringToFront(e),Ct.getWindow(e);let g=window.innerWidth||1200,f=window.innerHeight||800,h=g<=1100,x=null,T=!1;d&&(x=Ct.getState(e),x&&!h&&(T=!0));let v,z;T&&x.width&&x.height?(v=Math.max(400,Math.min(x.width,g-40)),z=Math.max(300,Math.min(x.height,f-40))):(v=Math.max(400,Math.min(o,g-40)),z=Math.max(300,Math.min(n,f-40)));let M=Math.max(20,Math.min((g-v)/2,g-v-20)),S=Math.max(20,Math.min((f-z)/2,f-z-20)),E=l&&!h,G=`
    <div class="yyt-window" id="${e}" style="left:${M}px; top:${S}px; width:${v}px; height:${z}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${gT(r)}</span>
        </div>
        <div class="yyt-window-controls">
          ${E?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
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
  `,q=cr(),$=null;a&&($=p(`<div class="yyt-window-overlay" data-for="${e}"></div>`),p(q.body).append($));let A=p(G);p(q.body).append(A),Ct.register(e,A),A.on("mousedown",()=>Ct.bringToFront(e));let J=!1,U={left:M,top:S,width:v,height:z},ee=()=>{U={left:parseInt(A.css("left")),top:parseInt(A.css("top")),width:A.width(),height:A.height()},A.addClass("maximized"),A.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),J=!0},ye=()=>{A.removeClass("maximized"),A.css({left:U.left+"px",top:U.top+"px",width:U.width+"px",height:U.height+"px"}),A.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),J=!1};A.find(".yyt-window-btn.maximize").on("click",()=>{J?ye():ee()}),(h&&l||T&&x.isMaximized&&l||c&&l)&&ee(),A.find(".yyt-window-btn.close").on("click",()=>{if(d&&l){let le={width:J?U.width:A.width(),height:J?U.height:A.height(),isMaximized:J};Ct.saveState(e,le)}u&&u(),$&&$.remove(),A.remove(),Ct.unregister(e),p(document).off(".yytWindowDrag"+e),p(document).off(".yytWindowResize"+e)}),$&&$.on("click",le=>{le.target,$[0]});let Te=!1,ue,Ze,Ve,j;if(A.find(".yyt-window-header").on("mousedown",le=>{p(le.target).closest(".yyt-window-controls").length||J||(Te=!0,ue=le.clientX,Ze=le.clientY,Ve=parseInt(A.css("left")),j=parseInt(A.css("top")),p(document.body).css("user-select","none"))}),p(document).on("mousemove.yytWindowDrag"+e,le=>{if(!Te)return;let $e=le.clientX-ue,kt=le.clientY-Ze;A.css({left:Math.max(0,Ve+$e)+"px",top:Math.max(0,j+kt)+"px"})}),p(document).on("mouseup.yytWindowDrag"+e,()=>{Te&&(Te=!1,p(document.body).css("user-select",""))}),i){let le=!1,$e="",kt,He,lr,Ue,Ao,Co;A.find(".yyt-window-resize-handle").on("mousedown",function(Er){J||(le=!0,$e="",p(this).hasClass("se")?$e="se":p(this).hasClass("e")?$e="e":p(this).hasClass("s")?$e="s":p(this).hasClass("w")?$e="w":p(this).hasClass("n")?$e="n":p(this).hasClass("nw")?$e="nw":p(this).hasClass("ne")?$e="ne":p(this).hasClass("sw")&&($e="sw"),kt=Er.clientX,He=Er.clientY,lr=A.width(),Ue=A.height(),Ao=parseInt(A.css("left")),Co=parseInt(A.css("top")),p(document.body).css("user-select","none"),Er.stopPropagation())}),p(document).on("mousemove.yytWindowResize"+e,Er=>{if(!le)return;let Ar=Er.clientX-kt,Jr=Er.clientY-He,$s=400,Ls=300,ko=lr,Io=Ue,Xr=Ao,Qr=Co;if($e.includes("e")&&(ko=Math.max($s,lr+Ar)),$e.includes("s")&&(Io=Math.max(Ls,Ue+Jr)),$e.includes("w")){let Zr=lr-Ar;Zr>=$s&&(ko=Zr,Xr=Ao+Ar)}if($e.includes("n")){let Zr=Ue-Jr;Zr>=Ls&&(Io=Zr,Qr=Co+Jr)}A.css({width:ko+"px",height:Io+"px",left:Xr+"px",top:Qr+"px"})}),p(document).on("mouseup.yytWindowResize"+e,()=>{le&&(le=!1,p(document.body).css("user-select",""))})}return A.on("remove",()=>{p(document).off(".yytWindowDrag"+e),p(document).off(".yytWindowResize"+e)}),y&&setTimeout(()=>y(A),50),A}function dg(t){let e=Ct.getWindow(t);if(e){let r=window.jQuery||window.parent?.jQuery;r&&(r(`.yyt-window-overlay[data-for="${t}"]`).remove(),r(document).off(".yytWindowDrag"+t),r(document).off(".yytWindowResize"+t)),e.remove(),Ct.unregister(t)}}function gT(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var pT,yT,cg,Xa,Ct,vc=N(()=>{Be();W();Ge();pT=I.createScope("WindowManager"),yT="youyou_toolkit_window_manager",cg="window_states",Xa=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,r){this.topZIndex++,this.windows.set(e,{$el:r,zIndex:this.topZIndex}),r.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let r=this.windows.get(e);r&&(this.topZIndex++,r.zIndex=this.topZIndex,r.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,r)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,r){let s=this.loadStates();s[e]={...r,updatedAt:Date.now()},In.set(cg,s)}loadStates(){return In.get(cg)||{}}getState(e){return this.loadStates()[e]||null}},Ct=new Xa});function Yt(){return Tc||(Tc=I.createScope("TableDataEditor")),Tc}function Oe(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function bT(){if(!Sc)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tde-styles")){Sc=!0;return}let r=t.createElement("style");r.id="yyt-tde-styles",r.textContent=hT,e.appendChild(r),Sc=!0}catch(t){Yt().warn("\u6CE8\u5165\u6570\u636E\u7F16\u8F91\u5668\u6837\u5F0F\u5931\u8D25",t)}}function _c(){let t=[],e=null,r=!1;try{let s=Ps(null);Array.isArray(s?.tableState?.tables)&&s.tableState.tables.length>0&&(t=s.tableState.tables),e=s?{chatId:s.chatId||"",sourceMessageId:s.sourceMessageId||s.message?.message_id||"",sourceSwipeId:s.sourceSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",traceId:s.traceId||"",targetMessageIndex:s.targetMessageIndex??-1}:null}catch(s){Yt().warn("loadEditorData \u5F02\u5E38",s)}if(t.length===0)try{let o=mo({})?.template?.tables;Array.isArray(o)&&o.length>0&&(t=ae(o),r=!0)}catch(s){Yt().warn("\u4ECE\u6A21\u677F fallback \u5931\u8D25",s)}_.tempData=ae(t)||[],_.targetSnapshot=e,_.isDirty=!1,_.isFromTemplate=r,_.currentTableIndex>=_.tempData.length?_.currentTableIndex=_.tempData.length>0?0:-1:_.currentTableIndex<0&&_.tempData.length>0&&(_.currentTableIndex=0)}function yg(){return`
    <div class="yyt-tde">
      ${fg()}
      <div class="yyt-tde-content">
        ${xT()}
        <main class="yyt-tde-main">${wT()}</main>
      </div>
    </div>
  `}function fg(){return`
    <div class="yyt-tde-toolbar">
      <div class="yyt-tde-toolbar-left">
        <div class="yyt-tde-mode-switch">
          <button class="${_.mode==="data"?"active":""}" data-mode="data">\u6570\u636E\u7F16\u8F91</button>
          <button class="${_.mode==="schema"?"active":""}" data-mode="schema">\u7ED3\u6784\u914D\u7F6E</button>
          <button class="${_.mode==="global"?"active":""}" data-mode="global">\u5168\u5C40\u6CE8\u5165</button>
        </div>
        ${_.isDirty?'<span class="yyt-tde-dirty-badge">\u672A\u4FDD\u5B58</span>':""}
      </div>
      <div class="yyt-tde-actions">
        <button class="yyt-tde-btn" data-action="reload"><i class="fa-solid fa-rotate"></i> \u91CD\u65B0\u52A0\u8F7D</button>
        <button class="yyt-tde-btn" data-action="save" ${_.isDirty?"":"disabled"} title="\u4FDD\u5B58\u5230\u5F53\u524D\u6D88\u606F\u7684 slot"><i class="fa-solid fa-floppy-disk"></i> \u4FDD\u5B58\u5230 chat</button>
        <button class="yyt-tde-btn" data-action="save-global" ${_.isDirty?"":"disabled"} title="\u4FDD\u5B58\u5230\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\uFF08\u5F71\u54CD\u6240\u6709 chat \u540E\u7EED\u586B\u8868\uFF09"><i class="fa-solid fa-globe"></i> \u4FDD\u5B58\u5230\u5168\u5C40</button>
        <button class="yyt-tde-btn yyt-tde-btn-primary" data-action="run-now"><i class="fa-solid fa-play"></i> \u7ACB\u5373\u586B\u8868</button>
      </div>
    </div>
  `}function xT(){let t=_.tempData||[],e=t.map((r,s)=>{let o=r?.name||`\u8868 ${s+1}`,n=Array.isArray(r?.rows)?r.rows.length:0;return`
      <div class="yyt-tde-sheet-item-wrap ${s===_.currentTableIndex?"active":""}">
        <button class="yyt-tde-sheet-item" data-sheet-index="${s}">
          <span class="yyt-tde-sheet-idx">[${s}]</span>
          <span class="yyt-tde-sheet-name">${Oe(o)}</span>
          <span class="yyt-tde-sheet-count">${n}</span>
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
  `}function wT(){let t=_.tempData||[],e=_.currentTableIndex,r=e>=0&&e<t.length?t[e]:null;return _.mode==="global"?ST():t.length===0?'<div class="yyt-tde-empty">\u5F53\u524D slot \u6CA1\u6709\u8868\u6570\u636E\uFF0C\u6A21\u677F\u4E5F\u672A\u914D\u7F6E\u8868\u3002<br>\u8BF7\u5148\u5728\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u521D\u59CB\u5316\uFF0C\u6216\u5230\u300C\u9884\u8BBE\u7BA1\u7406 \u2192 \u8868\u683C\u6A21\u677F\u300D\u914D\u7F6E\u6A21\u677F\u3002</div>':r?_.mode==="data"?vT(r,e):_.mode==="schema"?TT(r,e):"":'<div class="yyt-tde-empty">\u8BF7\u4ECE\u5DE6\u4FA7\u9009\u62E9\u4E00\u5F20\u8868\u3002</div>'}function vT(t,e){let r=Array.isArray(t?.columns)?t.columns:[],s=Array.isArray(t?.rows)?t.rows:[],o=_.isFromTemplate?'<div class="yyt-tde-schema-hint" style="margin-bottom:12px;">\u5F53\u524D\u663E\u793A<b>\u6A21\u677F\u9ED8\u8BA4\u7ED3\u6784</b>\uFF08slot \u5C1A\u65E0\u6570\u636E\uFF09\u3002\u76F4\u63A5\u6DFB\u52A0\u884C\u6216\u7F16\u8F91\u4F1A\u521B\u5EFA slot \u6570\u636E\uFF1B\u6216\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u586B\u3002</div>':"",n=s.map((a,i)=>{let l=a?.cells||{},c=r.map(d=>{let u=d?.key||"",y=d?.title||u,p=l[u],g=p==null||p==="",f=g?"\uFF08\u7A7A\uFF09":String(p);return`
        <div class="yyt-tde-field">
          <div class="yyt-tde-field-label">${Oe(y)}</div>
          <div class="yyt-tde-field-cell ${g?"yyt-tde-field-cell--empty":""}"
               contenteditable
               data-row-index="${i}"
               data-col-key="${Oe(u)}">${Oe(f)}</div>
        </div>
      `}).join("");return`
      <article class="yyt-tde-card" data-row-index="${i}">
        <header class="yyt-tde-card-header">
          <span class="yyt-tde-card-index">#${i+1}</span>
          <input class="yyt-tde-card-name" value="${Oe(a?.name||"")}" data-row-name-index="${i}" placeholder="\u884C\u540D">
          <div class="yyt-tde-card-actions">
            <button class="yyt-tde-icon-btn danger" data-action="delete-row" data-row-index="${i}" title="\u5220\u9664\u884C"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </header>
        <div class="yyt-tde-card-body">${c||'<div style="padding:8px;color:var(--tde-text-muted);font-size:12px;">\u8BE5\u8868\u6CA1\u6709\u5217\u5B9A\u4E49</div>'}</div>
      </article>
    `}).join("");return`
    ${o}
    <div class="yyt-tde-card-grid">
      ${n}
      <button class="yyt-tde-card-add" data-action="add-row">
        <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u884C
      </button>
    </div>
  `}function TT(t,e){let r=Array.isArray(t?.columns)?t.columns:[],s=t?.sourceData||{},o=t?.aiInstructions||{},n=t?.updateConfig||{},a=r.map((i,l)=>`
    <div class="yyt-tde-schema-row yyt-tde-schema-field" data-field-index="${l}">
      <div class="yyt-tde-schema-field-head">
        <span class="yyt-tde-schema-idx">[${l}]</span>
        <input class="yyt-tde-input yyt-tde-input-title" data-action="field-title" data-field-index="${l}" value="${Oe(i?.title||i?.key||"")}" placeholder="\u5B57\u6BB5\u6807\u9898" />
        <input class="yyt-tde-input yyt-tde-input-key" data-action="field-key" data-field-index="${l}" value="${Oe(i?.key||"")}" placeholder="key" />
        <select class="yyt-tde-input yyt-tde-input-type" data-action="field-type" data-field-index="${l}">
          ${["text","number","boolean","date","json"].map(c=>`<option value="${c}" ${i?.type===c?"selected":""}>${c}</option>`).join("")}
        </select>
        <button class="yyt-tde-btn-icon yyt-tde-btn-danger" data-action="field-delete" data-field-index="${l}" title="\u5220\u9664\u6B64\u5B57\u6BB5"><i class="fa-solid fa-trash"></i></button>
      </div>
      <textarea class="yyt-tde-input yyt-tde-input-desc" data-action="field-desc" data-field-index="${l}" placeholder="\u5B57\u6BB5\u63CF\u8FF0">${Oe(i?.description||"")}</textarea>
    </div>
  `).join("");return`
    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">\u57FA\u7840\u4FE1\u606F</div>
      <div class="yyt-tde-schema-row">
        <div class="yyt-tde-schema-key">\u8868\u540D</div>
        <div class="yyt-tde-schema-value">
          <input class="yyt-tde-input" data-action="table-name" value="${Oe(t?.name||"")}" />
        </div>
      </div>
      <div class="yyt-tde-schema-row">
        <div class="yyt-tde-schema-key">UID</div>
        <div class="yyt-tde-schema-value"><code style="font-size:11px;color:var(--tde-accent);">${Oe(t?.uid||t?.id||"")}</code></div>
      </div>
      <div class="yyt-tde-schema-row">
        <div class="yyt-tde-schema-key">\u8868\u8BF4\u660E</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="table-note" placeholder="\u8868\u7528\u9014\u8BF4\u660E + \u5217\u6CE8\u91CA">${Oe(t?.note||s?.note||"")}</textarea>
        </div>
      </div>
    </div>

    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">AI \u64CD\u4F5C\u8BF4\u660E (sourceData)</div>
      <div class="yyt-tde-schema-row yyt-tde-schema-sd">
        <div class="yyt-tde-schema-key">\u521D\u59CB\u5316 (init)</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="sd-init" placeholder="\u8868\u4E3A\u7A7A\u65F6 AI \u5E94\u8BE5\u63D2\u5165\u4EC0\u4E48">${Oe(o?.init||s?.initNode||"")}</textarea>
        </div>
      </div>
      <div class="yyt-tde-schema-row yyt-tde-schema-sd">
        <div class="yyt-tde-schema-key">\u65B0\u589E (insert)</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="sd-create" placeholder="\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u65B0\u589E\u884C">${Oe(o?.create||s?.insertNode||"")}</textarea>
        </div>
      </div>
      <div class="yyt-tde-schema-row yyt-tde-schema-sd">
        <div class="yyt-tde-schema-key">\u66F4\u65B0 (update)</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="sd-update" placeholder="\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u66F4\u65B0\u884C">${Oe(o?.update||s?.updateNode||"")}</textarea>
        </div>
      </div>
      <div class="yyt-tde-schema-row yyt-tde-schema-sd">
        <div class="yyt-tde-schema-key">\u5220\u9664 (delete)</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="sd-delete" placeholder="\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u5220\u9664\u884C">${Oe(o?.delete||s?.deleteNode||"")}</textarea>
        </div>
      </div>
    </div>

    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">\u66F4\u65B0\u914D\u7F6E (updateConfig)</div>
      <div class="yyt-tde-uc-grid">
        <div class="yyt-tde-uc-cell">
          <label>\u4E0A\u4E0B\u6587\u6DF1\u5EA6 (contextDepth)</label>
          <input type="number" class="yyt-tde-input" data-action="uc-contextDepth" value="${Number.isFinite(n?.contextDepth)?n.contextDepth:-1}" min="-1" />
          <span class="yyt-tde-hint">-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\uFF0CN = \u6700\u8FD1 N \u6761\u6D88\u606F</span>
        </div>
        <div class="yyt-tde-uc-cell">
          <label>\u66F4\u65B0\u9891\u7387 (updateFrequency)</label>
          <input type="number" class="yyt-tde-input" data-action="uc-updateFrequency" value="${Number.isFinite(n?.updateFrequency)?n.updateFrequency:-1}" min="-1" />
          <span class="yyt-tde-hint">-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\u81EA\u52A8\u586B\u8868\uFF0CN = \u6BCF N \u6761\u6D88\u606F\u89E6\u53D1\u4E00\u6B21</span>
        </div>
        <div class="yyt-tde-uc-cell">
          <label>\u6279\u6B21\u5927\u5C0F (batchSize)</label>
          <input type="number" class="yyt-tde-input" data-action="uc-batchSize" value="${Number.isFinite(n?.batchSize)?n.batchSize:-1}" min="-1" />
          <span class="yyt-tde-hint">-1 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u5355\u6B21\u6700\u591A\u5904\u7406 N \u5F20\u8868</span>
        </div>
        <div class="yyt-tde-uc-cell">
          <label>\u8DF3\u8FC7\u697C\u5C42 (skipFloors)</label>
          <input type="number" class="yyt-tde-input" data-action="uc-skipFloors" value="${Number.isFinite(n?.skipFloors)?n.skipFloors:-1}" min="-1" />
          <span class="yyt-tde-hint">-1 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u8DF3\u8FC7\u6700\u8FD1 N \u5C42</span>
        </div>
        <div class="yyt-tde-uc-cell">
          <label>\u53D1\u9001\u6700\u65B0 N \u884C (sendLatestRows)</label>
          <input type="number" class="yyt-tde-input" data-action="uc-sendLatestRows" value="${Number.isFinite(n?.sendLatestRows)?n.sendLatestRows:-1}" min="-1" />
          <span class="yyt-tde-hint">-1 = \u5168\u90E8\u53D1\u9001\uFF0C0 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u4EC5\u53D1\u9001\u6700\u65B0 N \u884C\uFF08\u5927\u8868 token \u8282\u7701\uFF09</span>
        </div>
        <div class="yyt-tde-uc-cell">
          <label>\u5206\u7EC4 ID (groupId)</label>
          <input class="yyt-tde-input" data-action="uc-groupId" value="${Oe(n?.groupId||"")}" placeholder="\u540C\u7EC4 ID \u7684\u8868\u4F1A\u5408\u5E76\u89E6\u53D1" />
          <span class="yyt-tde-hint">\u540C\u7EC4\u540C\u65F6\u89E6\u53D1\uFF0C\u8DE8\u7EC4\u5E76\u884C\uFF08\u7559\u7A7A = \u72EC\u7ACB\u89E6\u53D1\uFF09</span>
        </div>
        <div class="yyt-tde-uc-cell yyt-tde-uc-cell-wide">
          <label>\u8868\u7EA7 API \u9884\u8BBE\u8986\u76D6</label>
          <input class="yyt-tde-input" data-action="uc-apiPreset" value="${Oe(n?.apiPreset||"")}" placeholder="\u7559\u7A7A = \u6CBF\u7528\u5168\u5C40\uFF0C\u586B\u9884\u8BBE\u540D = \u8FD9\u5F20\u8868\u7528\u8FD9\u4E2A" />
          <span class="yyt-tde-hint">\u4F8B\uFF1A\u89D2\u8272\u8868\u7528 Claude\u3001\u7EAA\u8981\u8868\u7528 GPT</span>
        </div>
      </div>
    </div>

    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">\u5B57\u6BB5\u5B9A\u4E49 (${r.length})</div>
      ${a||'<div style="color:var(--tde-text-muted);font-size:12px;padding:8px 0;">\u65E0\u5B57\u6BB5</div>'}
      <button class="yyt-tde-btn yyt-tde-btn-add-field" data-action="field-add"><i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u5B57\u6BB5</button>
    </div>
  `}function ST(){let t=Array.isArray(_.tempData)?_.tempData:[];return t.length===0?'<div class="yyt-tde-empty">\u65E0\u8868\u683C\u53EF\u914D\u7F6E\u3002\u8BF7\u5148\u6DFB\u52A0\u8868\u683C\u3002</div>':`
    <div class="yyt-tde-schema-hint" style="background:rgba(74,158,255,0.08);border-color:rgba(74,158,255,0.3);">
      <strong>\u5168\u5C40\u6CE8\u5165\u914D\u7F6E</strong> \u2014 \u6BCF\u5F20\u8868\u7684 exportConfig\uFF08\u72EC\u7ACB\u4E16\u754C\u4E66\u6761\u76EE\uFF09+ placement\uFF08\u6CE8\u5165\u4F4D\u7F6E/\u6DF1\u5EA6/\u987A\u5E8F\uFF09\u3002
      \u672A\u542F\u7528\u300C\u72EC\u7ACB\u6CE8\u5165\u300D\u7684\u8868\u4F1A\u8D70\u5168\u5C40 wrapper\uFF08\u5DE5\u4F5C\u53F0\u300C\u540C\u6B65\u5230\u4E16\u754C\u4E66\u300D\u5F00\u5173\uFF09\u3002
    </div>
    ${t.map((r,s)=>{let o=r?.exportConfig||{},n=o.entryPlacement||{},a=o.extraIndexPlacement||{};return`
      <div class="yyt-tde-global-card" data-table-index="${s}">
        <div class="yyt-tde-global-card-head">
          <span class="yyt-tde-global-card-name">${Oe(r?.name||`\u8868 ${s+1}`)}</span>
          <label class="yyt-tde-toggle-inline">
            <input type="checkbox" data-action="ec-enabled" data-table-index="${s}" ${o.enabled===!0?"checked":""} />
            <span>\u542F\u7528\u72EC\u7ACB\u6CE8\u5165</span>
          </label>
        </div>
        <div class="yyt-tde-global-card-body ${o.enabled===!0?"":"yyt-tde-disabled-section"}">
          <div class="yyt-tde-uc-grid">
            <div class="yyt-tde-uc-cell">
              <label>\u6761\u76EE\u540D (entryName)</label>
              <input class="yyt-tde-input" data-action="ec-entryName" data-table-index="${s}" value="${Oe(o.entryName||r?.name||"")}" />
            </div>
            <div class="yyt-tde-uc-cell">
              <label>\u6761\u76EE\u7C7B\u578B (entryType)</label>
              <select class="yyt-tde-input" data-action="ec-entryType" data-table-index="${s}">
                <option value="constant" ${o.entryType==="constant"?"selected":""}>constant (\u5E38\u9A7B)</option>
                <option value="keyword" ${o.entryType==="keyword"?"selected":""}>keyword (\u5173\u952E\u8BCD\u89E6\u53D1)</option>
              </select>
            </div>
            <div class="yyt-tde-uc-cell yyt-tde-uc-cell-wide">
              <label>\u89E6\u53D1\u5173\u952E\u8BCD (keywords)</label>
              <input class="yyt-tde-input" data-action="ec-keywords" data-table-index="${s}" value="${Oe(o.keywords||"")}" placeholder="\u7528\u9017\u53F7\u6216\u6362\u884C\u5206\u9694" />
            </div>
            <div class="yyt-tde-uc-cell">
              <label>\u6309\u884C\u62C6\u5206 (splitByRow)</label>
              <select class="yyt-tde-input" data-action="ec-splitByRow" data-table-index="${s}">
                <option value="false" ${o.splitByRow?"":"selected"}>\u5426\uFF08\u6574\u5F20\u8868\u4E00\u4E2A\u6761\u76EE\uFF09</option>
                <option value="true" ${o.splitByRow?"selected":""}>\u662F\uFF08\u6BCF\u884C\u4E00\u4E2A\u6761\u76EE\uFF09</option>
              </select>
            </div>
            <div class="yyt-tde-uc-cell">
              <label>\u9632\u9012\u5F52 (preventRecursion)</label>
              <select class="yyt-tde-input" data-action="ec-preventRecursion" data-table-index="${s}">
                <option value="true" ${o.preventRecursion!==!1?"selected":""}>\u662F</option>
                <option value="false" ${o.preventRecursion===!1?"selected":""}>\u5426</option>
              </select>
            </div>
            <div class="yyt-tde-uc-cell yyt-tde-uc-cell-wide">
              <label>\u6CE8\u5165\u6A21\u677F (injectionTemplate)</label>
              <textarea class="yyt-tde-input" data-action="ec-injectionTemplate" data-table-index="${s}" placeholder="\u4F8B\uFF1A\u4EE5\u4E0B\u662F {{tableName}} \u7684\u6700\u65B0\u6570\u636E\uFF1A{{tableContent}}">${Oe(o.injectionTemplate||"")}</textarea>
            </div>
          </div>

          <div class="yyt-tde-schema-heading" style="margin-top:12px;">\u6761\u76EE\u4F4D\u7F6E (entryPlacement)</div>
          <div class="yyt-tde-uc-grid">
            <div class="yyt-tde-uc-cell">
              <label>position</label>
              <select class="yyt-tde-input" data-action="ec-ep-position" data-table-index="${s}">
                ${["before_character_definition","after_character_definition","before_authors_note","after_authors_note"].map(i=>`<option value="${i}" ${(n.position||"before_character_definition")===i?"selected":""}>${i}</option>`).join("")}
              </select>
            </div>
            <div class="yyt-tde-uc-cell">
              <label>depth</label>
              <input type="number" class="yyt-tde-input" data-action="ec-ep-depth" data-table-index="${s}" value="${Number.isFinite(n.depth)?n.depth:2}" />
            </div>
            <div class="yyt-tde-uc-cell">
              <label>order</label>
              <input type="number" class="yyt-tde-input" data-action="ec-ep-order" data-table-index="${s}" value="${Number.isFinite(n.order)?n.order:0}" />
            </div>
          </div>

          <div class="yyt-tde-schema-heading" style="margin-top:12px;">\u989D\u5916\u7D22\u5F15\u4F4D\u7F6E (extraIndexPlacement\uFF0C\u53EF\u9009)</div>
          <div class="yyt-tde-uc-grid">
            <div class="yyt-tde-uc-cell">
              <label>position</label>
              <select class="yyt-tde-input" data-action="ec-exi-position" data-table-index="${s}">
                ${["before_character_definition","after_character_definition","before_authors_note","after_authors_note"].map(i=>`<option value="${i}" ${(a.position||"before_character_definition")===i?"selected":""}>${i}</option>`).join("")}
              </select>
            </div>
            <div class="yyt-tde-uc-cell">
              <label>depth</label>
              <input type="number" class="yyt-tde-input" data-action="ec-exi-depth" data-table-index="${s}" value="${Number.isFinite(a.depth)?a.depth:2}" />
            </div>
            <div class="yyt-tde-uc-cell">
              <label>order</label>
              <input type="number" class="yyt-tde-input" data-action="ec-exi-order" data-table-index="${s}" value="${Number.isFinite(a.order)?a.order:0}" />
            </div>
          </div>
        </div>
      </div>
    `}).join("")}
  `}function nt(){if(!_.$window)return;_.$window.find(".yyt-window-body").html(yg()),gg(_.$window)}function gg(t){let e=window.jQuery||window.parent?.jQuery;if(!e||!t||!t.on)return;t.off(".tde"),t.on("click.tde",".yyt-tde-mode-switch button[data-mode]",function(){let i=e(this).attr("data-mode");i&&i!==_.mode&&(_.mode=i,nt())}),t.on("click.tde","[data-sheet-index]",function(){let i=Number(e(this).attr("data-sheet-index"));Number.isFinite(i)&&i!==_.currentTableIndex&&(_.currentTableIndex=i,nt())});let r=()=>(Array.isArray(_.tempData)?_.tempData:[])[_.currentTableIndex]||null;t.on("input.tde",'[data-action="table-name"]',function(){let i=r();i&&(i.name=e(this).val(),_.isDirty=!0)}),t.on("input.tde",'[data-action="table-note"]',function(){let i=r();i&&(i.note=e(this).val(),_.isDirty=!0)}),Object.entries({"sd-init":"init","sd-create":"create","sd-update":"update","sd-delete":"delete"}).forEach(([i,l])=>{t.on("input.tde",`[data-action="${i}"]`,function(){let c=r();c&&(c.aiInstructions=c.aiInstructions||{},c.aiInstructions[l]=e(this).val(),_.isDirty=!0)})}),["contextDepth","updateFrequency","batchSize","skipFloors","sendLatestRows"].forEach(i=>{t.on("input.tde",`[data-action="uc-${i}"]`,function(){let l=r();if(!l)return;l.updateConfig=l.updateConfig||{};let c=Number(e(this).val());l.updateConfig[i]=Number.isFinite(c)?c:-1,_.isDirty=!0})}),t.on("input.tde",'[data-action="uc-groupId"]',function(){let i=r();i&&(i.updateConfig=i.updateConfig||{},i.updateConfig.groupId=e(this).val(),_.isDirty=!0)}),t.on("input.tde",'[data-action="uc-apiPreset"]',function(){let i=r();i&&(i.updateConfig=i.updateConfig||{},i.updateConfig.apiPreset=e(this).val(),_.isDirty=!0)}),t.on("input.tde",'[data-action="field-title"]',function(){let i=r();if(!i)return;let l=Number(e(this).attr("data-field-index"));!Array.isArray(i.columns)||!i.columns[l]||(i.columns[l].title=e(this).val(),_.isDirty=!0)}),t.on("input.tde",'[data-action="field-key"]',function(){let i=r();if(!i)return;let l=Number(e(this).attr("data-field-index"));!Array.isArray(i.columns)||!i.columns[l]||(i.columns[l].key=e(this).val(),_.isDirty=!0)}),t.on("change.tde",'[data-action="field-type"]',function(){let i=r();if(!i)return;let l=Number(e(this).attr("data-field-index"));!Array.isArray(i.columns)||!i.columns[l]||(i.columns[l].type=e(this).val(),_.isDirty=!0)}),t.on("input.tde",'[data-action="field-desc"]',function(){let i=r();if(!i)return;let l=Number(e(this).attr("data-field-index"));!Array.isArray(i.columns)||!i.columns[l]||(i.columns[l].description=e(this).val(),_.isDirty=!0)}),t.on("click.tde",'[data-action="field-delete"]',function(){let i=r();if(!i)return;let l=Number(e(this).attr("data-field-index"));!Array.isArray(i.columns)||!i.columns[l]||window.confirm(`\u5220\u9664\u5B57\u6BB5\u300C${i.columns[l].title||i.columns[l].key}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u4F1A\u81EA\u52A8\u6E05\u7406\u884C\u6570\u636E\u3002`)&&(i.columns.splice(l,1),_.isDirty=!0,nt())}),t.on("click.tde",'[data-action="field-add"]',function(){let i=r();if(!i)return;i.columns=Array.isArray(i.columns)?i.columns:[];let l=new Set(i.columns.map(d=>d?.key).filter(Boolean)),c=i.columns.length+1;for(;l.has(`col_${c}`);)c++;i.columns.push({key:`col_${c}`,title:`\u5B57\u6BB5${c}`,description:"",type:"text",required:!1}),_.isDirty=!0,nt()});let n=(i,l,c)=>{let d=_.tempData?.[i];d&&(d.exportConfig=d.exportConfig||{},d.exportConfig[l]=c,_.isDirty=!0)},a=(i,l,c,d)=>{let u=_.tempData?.[i];u&&(u.exportConfig=u.exportConfig||{},u.exportConfig[l]=u.exportConfig[l]||{},u.exportConfig[l][c]=d,_.isDirty=!0)};t.on("change.tde",'[data-action="ec-enabled"]',function(){n(Number(e(this).attr("data-table-index")),"enabled",e(this).is(":checked")),nt()}),t.on("input.tde",'[data-action="ec-entryName"]',function(){n(Number(e(this).attr("data-table-index")),"entryName",e(this).val())}),t.on("change.tde",'[data-action="ec-entryType"]',function(){n(Number(e(this).attr("data-table-index")),"entryType",e(this).val())}),t.on("input.tde",'[data-action="ec-keywords"]',function(){n(Number(e(this).attr("data-table-index")),"keywords",e(this).val())}),t.on("change.tde",'[data-action="ec-splitByRow"]',function(){n(Number(e(this).attr("data-table-index")),"splitByRow",e(this).val()==="true")}),t.on("change.tde",'[data-action="ec-preventRecursion"]',function(){n(Number(e(this).attr("data-table-index")),"preventRecursion",e(this).val()!=="false")}),t.on("input.tde",'[data-action="ec-injectionTemplate"]',function(){n(Number(e(this).attr("data-table-index")),"injectionTemplate",e(this).val())}),t.on("change.tde",'[data-action="ec-ep-position"]',function(){a(Number(e(this).attr("data-table-index")),"entryPlacement","position",e(this).val())}),t.on("input.tde",'[data-action="ec-ep-depth"]',function(){a(Number(e(this).attr("data-table-index")),"entryPlacement","depth",Number(e(this).val())||0)}),t.on("input.tde",'[data-action="ec-ep-order"]',function(){a(Number(e(this).attr("data-table-index")),"entryPlacement","order",Number(e(this).val())||0)}),t.on("change.tde",'[data-action="ec-exi-position"]',function(){a(Number(e(this).attr("data-table-index")),"extraIndexPlacement","position",e(this).val())}),t.on("input.tde",'[data-action="ec-exi-depth"]',function(){a(Number(e(this).attr("data-table-index")),"extraIndexPlacement","depth",Number(e(this).val())||0)}),t.on("input.tde",'[data-action="ec-exi-order"]',function(){a(Number(e(this).attr("data-table-index")),"extraIndexPlacement","order",Number(e(this).val())||0)}),t.on("click.tde",'[data-action="sheet-move-up"]',function(i){i.stopPropagation();let l=Number(e(this).attr("data-sheet-index"));if(!Array.isArray(_.tempData)||l<=0)return;let c=_.tempData;[c[l-1],c[l]]=[c[l],c[l-1]],_.currentTableIndex===l?_.currentTableIndex=l-1:_.currentTableIndex===l-1&&(_.currentTableIndex=l),_.isDirty=!0,nt()}),t.on("click.tde",'[data-action="sheet-move-down"]',function(i){i.stopPropagation();let l=Number(e(this).attr("data-sheet-index"));if(!Array.isArray(_.tempData)||l>=_.tempData.length-1)return;let c=_.tempData;[c[l],c[l+1]]=[c[l+1],c[l]],_.currentTableIndex===l?_.currentTableIndex=l+1:_.currentTableIndex===l+1&&(_.currentTableIndex=l),_.isDirty=!0,nt()}),t.on("click.tde",'[data-action="sheet-delete"]',function(i){i.stopPropagation();let l=Number(e(this).attr("data-sheet-index"));if(!Array.isArray(_.tempData)||!_.tempData[l])return;let c=_.tempData[l];window.confirm(`\u5220\u9664\u8868\u300C${c.name||`\u8868 ${l+1}`}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`)&&(_.tempData.splice(l,1),_.currentTableIndex>=_.tempData.length&&(_.currentTableIndex=Math.max(0,_.tempData.length-1)),_.isDirty=!0,nt())}),t.on("click.tde",'[data-action="sheet-add"]',function(){let i=window.prompt("\u65B0\u8868\u540D\uFF1A",`\u8868 ${(_.tempData?.length||0)+1}`);if(!i||!i.trim())return;_.tempData=Array.isArray(_.tempData)?_.tempData:[];let l=new Set(_.tempData.map(u=>u?.id).filter(Boolean)),c=_.tempData.length+1,d=`sheet_${Date.now().toString(36)}_${c}`;for(;l.has(d);)c++,d=`sheet_${Date.now().toString(36)}_${c}`;_.tempData.push({id:d,name:i.trim(),enabled:!0,note:"",aiInstructions:{init:"",create:"",update:"",delete:""},updateConfig:{},exportConfig:{enabled:!1},columns:[{key:"col_1",title:"\u5B57\u6BB51",description:"",type:"text",required:!1}],rows:[]}),_.currentTableIndex=_.tempData.length-1,_.isDirty=!0,nt()}),t.on("click.tde",'[data-action="reload"]',()=>{_.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u91CD\u65B0\u52A0\u8F7D\u5C06\u4E22\u5F03\uFF0C\u786E\u5B9A\uFF1F")||(_c(),nt(),C("success","\u5DF2\u91CD\u65B0\u52A0\u8F7D"))}),t.on("click.tde",'[data-action="save"]',async()=>{if(!_.isDirty){C("info","\u6CA1\u6709\u4FEE\u6539");return}try{let i=_.targetSnapshot;if(i?.sourceMessageId||(i=await lc()),!i?.sourceMessageId){C("error","\u65E0\u6CD5\u5B9A\u4F4D\u5F53\u524D\u6D88\u606F\uFF08\u627E\u4E0D\u5230 assistant \u6D88\u606F\uFF09");return}let l=await Ha(i,{tables:ae(_.tempData)||[],meta:{source:"data-editor-manual-save"}},{skipFreshValidation:!0});l?.success?(_.isDirty=!1,_.targetSnapshot={chatId:l.state?.chatId||i.chatId,sourceMessageId:l.sourceMessageId,sourceSwipeId:l.state?.sourceSwipeId||i.sourceSwipeId,effectiveSwipeId:i.effectiveSwipeId,slotBindingKey:l.state?.slotBindingKey||i.slotBindingKey,slotRevisionKey:l.slotRevisionKey,slotTransactionId:i.slotTransactionId,traceId:i.traceId,targetMessageIndex:l.messageIndex??i.targetMessageIndex},C("success","\u5DF2\u4FDD\u5B58"),nt()):C("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.error||"\u672A\u77E5"}`)}catch(i){Yt().error("\u4FDD\u5B58\u5F02\u5E38",i),C("error",`\u4FDD\u5B58\u5F02\u5E38\uFF1A${i?.message||i}`)}}),t.on("click.tde",'[data-action="save-global"]',async()=>{if(!_.isDirty){C("info","\u6CA1\u6709\u4FEE\u6539");return}if(window.confirm("\u4FDD\u5B58\u5230\u300C\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u300D\u4F1A\u5F71\u54CD\u540E\u7EED\u6240\u6709 chat \u7684\u65B0\u586B\u8868\uFF08\u5DF2\u6709 slot \u6570\u636E\u4E0D\u53D7\u5F71\u54CD\uFF09\u3002\u7EE7\u7EED\uFF1F"))try{let i=yo();if(!i?.id){C("error","\u6CA1\u6709\u53EF\u7528\u7684\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F");return}let l=(_.tempData||[]).map(d=>({id:d?.id||d?.uid,name:d?.name||"",note:d?.note||"",enabled:d?.enabled!==!1,aiInstructions:d?.aiInstructions||{},updateConfig:d?.updateConfig||{},exportConfig:d?.exportConfig||{},columns:Array.isArray(d?.columns)?ae(d.columns):[],rows:[]})),c=Ur({...i,tables:l});c?.success?(_.isDirty=!1,C("success",`\u5DF2\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u300C${i.name}\u300D`),Yt().info("\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u6210\u529F",{templateId:i.id,name:i.name,tableCount:l.length}),nt()):C("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${c?.error||"\u672A\u77E5"}`)}catch(i){Yt().error("\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u5F02\u5E38",i),C("error",`\u4FDD\u5B58\u5F02\u5E38\uFF1A${i?.message||i}`)}}),t.on("click.tde",'[data-action="run-now"]',async()=>{if(!(_.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u7ACB\u5373\u586B\u8868\u4F1A\u5148\u4E22\u5F03\u8FD9\u4E9B\u4FEE\u6539\uFF0C\u786E\u5B9A\uFF1F")))try{let i=await _n();i?.success?(C("success","\u586B\u8868\u5B8C\u6210"),_c(),nt()):C("error",`\u586B\u8868\u5931\u8D25\uFF1A${i?.error||"\u672A\u77E5"}`)}catch(i){Yt().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",i),C("error",`\u5F02\u5E38\uFF1A${i?.message||i}`)}}),t.on("input.tde","[data-row-index][data-col-key]",function(){let i=Number(e(this).attr("data-row-index")),l=e(this).attr("data-col-key"),c=e(this).text();if(!Number.isFinite(i)||!l)return;let d=_.tempData[_.currentTableIndex];d?.rows?.[i]&&(d.rows[i].cells||(d.rows[i].cells={}),d.rows[i].cells[l]=c,_.isDirty=!0,pg())}),t.on("input.tde","[data-row-name-index]",function(){let i=Number(e(this).attr("data-row-name-index"));if(!Number.isFinite(i))return;let l=_.tempData[_.currentTableIndex];l?.rows?.[i]&&(l.rows[i].name=e(this).val(),_.isDirty=!0,pg())}),t.on("click.tde",'[data-action="delete-row"]',function(){let i=Number(e(this).attr("data-row-index"));if(!Number.isFinite(i)||!window.confirm(`\u786E\u5B9A\u5220\u9664\u7B2C ${i+1} \u884C\uFF1F`))return;let l=_.tempData[_.currentTableIndex];l?.rows&&(l.rows.splice(i,1),_.isDirty=!0,nt())}),t.on("click.tde",'[data-action="add-row"]',()=>{let i=_.tempData[_.currentTableIndex];i&&(Array.isArray(i.rows)||(i.rows=[]),i.rows.push({id:Jo("row"),name:"",cells:{}}),_.isDirty=!0,nt())})}function pg(){if(!_.$window)return;let t=_.$window.find(".yyt-tde-toolbar");!t||!t.length||t.replaceWith(fg())}function Ec(t={}){if(console.log("[YYT][TableDataEditor] openTableDataEditor called",{options:t}),Yt().info("openTableDataEditor \u8C03\u7528",{options:t}),bT(),!(window.jQuery||window.parent?.jQuery)){let s="jQuery \u4E0D\u53EF\u7528\uFF08window.jQuery \u548C window.parent.jQuery \u90FD\u662F undefined\uFF09";console.error("[YYT][TableDataEditor]",s),Yt().error(s);try{C("error",`\u6570\u636E\u7F16\u8F91\u5668\u6253\u5F00\u5931\u8D25\uFF1A${s}`)}catch{}return null}if(console.log("[YYT][TableDataEditor] jQuery \u53EF\u7528"),_.$window&&_.$window.length&&document.body.contains(_.$window[0])){if(t.focusTableUid){let o=(_.tempData||[]).findIndex(n=>(n?.uid||n?.id)===t.focusTableUid);o>=0&&(_.currentTableIndex=o)}return t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(_.mode=t.focusMode),nt(),_.$window}if(_c(),console.log("[YYT][TableDataEditor] loadEditorData \u5B8C\u6210\uFF0CtempData \u8868\u6570:",_.tempData?.length),t.focusTableUid){let o=(_.tempData||[]).findIndex(n=>(n?.uid||n?.id)===t.focusTableUid);o>=0&&(_.currentTableIndex=o)}t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(_.mode=t.focusMode),console.log("[YYT][TableDataEditor] \u5373\u5C06\u8C03 createWindow");let r;try{r=wc({id:mT,title:"\u586B\u8868\u6570\u636E\u7F16\u8F91\u5668",content:yg(),width:1200,height:800,modal:!1,resizable:!0,maximizable:!0,rememberState:!0,onReady:s=>{console.log("[YYT][TableDataEditor] onReady triggered",{$el:!!s}),_.$window=s,gg(s)},onClose:()=>{_.isDirty&&Yt().warn("\u6570\u636E\u7F16\u8F91\u5668\u5173\u95ED\u65F6\u6709\u672A\u4FDD\u5B58\u4FEE\u6539"),_.$window=null}}),console.log("[YYT][TableDataEditor] createWindow \u8FD4\u56DE:",!!r)}catch(s){console.error("[YYT][TableDataEditor] createWindow \u629B\u9519:",s),Yt().error("createWindow \u629B\u9519",s);try{C("error",`\u521B\u5EFA\u7A97\u53E3\u5931\u8D25\uFF1A${s?.message||s}`)}catch{}return null}return r}var mT,Tc,_,hT,Sc,mg=N(()=>{vc();W();wn();za();Ja();no();je();vs();Ge();mT="yyt-table-data-editor";_={$window:null,mode:"data",tempData:null,currentTableIndex:-1,isDirty:!1,isFromTemplate:!1,targetSnapshot:null},hT=`
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
`,Sc=!1});function _T(t){return ae(t)}function ET(t,e,r){if(!t||typeof t!="object")return;let s=String(e||"").split(".").filter(Boolean);if(s.length===0)return;let o=t;for(let n=0;n<s.length-1;n++){let a=s[n];(o[a]===null||o[a]===void 0||typeof o[a]!="object")&&(o[a]={}),o=o[a]}o[s[s.length-1]]=r}function ge(){return Ac||(Ac=I.createScope("TableWorkbenchView")),Ac}async function AT(){try{let t=await on();if(!t)return mt.kind=null,mt.lastError="Provider \u4E0D\u53EF\u7528",mt;if(mt.kind=t.kind,typeof t.query=="function"){let e=await t.query({statement:"SELECT COUNT(*) as c FROM table_sheets"}),r=await t.query({statement:"SELECT COUNT(*) as c FROM table_rows"});mt.sheetCount=e?.rows?.[0]?.c??0,mt.rowCount=r?.rows?.[0]?.c??0}mt.lastError=null,mt.lastRefreshAt=Date.now(),ge().info("Provider stats \u5DF2\u5237\u65B0",{...mt})}catch(t){mt.lastError=t?.message||String(t),ge().warn("Provider stats \u5237\u65B0\u5931\u8D25",t)}return mt}function CT(){if(!mt.kind){let t=uo();t?.kind&&(mt.kind=t.kind)}return mt}function X(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function hg(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function xg(t){let{config:e,activeTemplate:r,isolationKey:s,tablesPreview:o,templateArchives:n=[],providerStats:a={}}=t,i=e?.runtime||{},l=i.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":i.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":i.lastStatus==="running"?"\u8FD0\u884C\u4E2D":"\u5F85\u547D",c=i.lastStatus==="success"?"success":i.lastStatus==="failed"?"error":"muted",d=e?.automation?.enabled?"\u81EA\u52A8":"\u624B\u52A8",u=e?.apiPreset||"\u8DDF\u968F\u4E3B API",y=e?.bypassPresetId?"\u5DF2\u7ED1\u5B9A":"\u65E0",p=Array.isArray(n)?n.length:0;return`
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
        ${(()=>{let g=e?.runScope||e?.scope?.mode||"enabled";return g==="enabled"?'<span class="yyt-tww-chip preset">\u8303\u56F4: \u6240\u6709\u542F\u7528\u8868</span>':`<button class="yyt-tww-chip status-failed" data-action="reset-run-scope" title="\u5F53\u524D AI \u53EA\u4F1A\u586B\u90E8\u5206\u8868\uFF0C\u70B9\u51FB\u91CD\u7F6E\u4E3A\u300C\u6240\u6709\u542F\u7528\u8868\u300D" style="border:0;cursor:pointer;">\u8303\u56F4: ${X(g==="current"?"\u26A0\uFE0F \u4EC5\u5F53\u524D\u8868":"\u4EC5\u9009\u4E2D\u8868")} \u2014 \u70B9\u6B64\u91CD\u7F6E</button>`})()}
        ${(()=>{let g=a?.kind,f=a?.sheetCount,h=a?.rowCount,x=f!==null&&h!==null?` \u2014 ${f} \u8868 ${h} \u884C`:"";return g==="authority"?`<span class="yyt-tww-chip status-success" title="\u6570\u636E\u6301\u4E45\u5316\u5230\u771F\u540E\u7AEF SQLite\uFF08ST-Delegation-of-authority \u63D0\u4F9B\uFF09">\u2713 \u771F\u540E\u7AEF SQLite${X(x)}</span>`:g==="fallback"?`<span class="yyt-tww-chip preset" title="\u6570\u636E\u6301\u4E45\u5316\u5230 localStorage\uFF08\u672A\u88C5 ST-Delegation-of-authority\uFF09">\u2139 Fallback (localStorage)${X(x)}</span>`:'<span class="yyt-tww-chip" title="Provider \u8FD8\u672A\u521D\u59CB\u5316\uFF08\u61D2\u52A0\u8F7D\uFF09">Provider \u52A0\u8F7D\u4E2D...</span>'})()}
        ${s?`<span class="yyt-tww-chip">\u9694\u79BB: ${X(s)}</span>`:""}
        <span class="yyt-tww-chip status-${c==="success"?"success":c==="error"?"failed":""}">${X(l)}</span>
      </div>
    </div>

    <!-- \u6A21\u677F\u5F52\u6863\u5217\u8868\uFF08\u9ED8\u8BA4\u9690\u85CF\uFF0Chero \u6309\u94AE toggle\uFF09 -->
    <div class="yyt-tww-archives" data-archives-panel style="display:none;">
      ${RT(n)}
    </div>

    <!-- Runtime stats -->
    <div class="yyt-tww-stat-row">
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u72B6\u6001</span>
        <span class="yyt-tww-stat-value ${c}">${X(l)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u6700\u8FD1\u8FD0\u884C</span>
        <span class="yyt-tww-stat-value muted">${X(hg(i.lastRunAt))}</span>
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
        ${kT(t)}
      </section>

      <section class="yyt-tww-section" data-section="behavior">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-arrows-rotate"></i></span>
          \u586B\u8868\u884C\u4E3A
        </div>
        ${IT(t)}
      </section>

      <section class="yyt-tww-section" data-section="overview">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-table-cells"></i></span>
          \u8868\u683C\u6982\u89C8
          <span class="yyt-tww-section-action">
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="open-editor"><i class="fa-solid fa-table-cells"></i> \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668</button>
          </span>
        </div>
        ${PT(t.tablesPreview)}
      </section>

    </div>
  </div>
  `}function kT(t){let{config:e,allTemplates:r,apiPresets:s,bypassPresets:o,regexPresets:n,worldbookPresets:a,activeTemplate:i}=t,l=r.map(v=>`<option value="${X(v.id)}" ${i?.source?.templateId===v.id?"selected":""}>${X(v.name)}</option>`).join(""),c=e?.autoUpdateEnabled===!0?"auto":"manual",d=e?.apiPreset||"",u='<option value="">\u2014\u2014 \u8DDF\u968F\u4E3B API \u2014\u2014</option>'+s.map(v=>`<option value="${X(v.name)}" ${v.name===d?"selected":""}>${X(v.name)}</option>`).join(""),y=e?.bypass?.presetId||"",p='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+o.map(v=>`<option value="${X(v.id)}" ${v.id===y?"selected":""}>${X(v.name)}${v.isDefault?" [\u9ED8\u8BA4]":""}</option>`).join(""),g=e?.extraction?.regexPresetId||"",f='<option value="">\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014</option>'+n.map(v=>`<option value="${X(v.id)}" ${v.id===g?"selected":""}>${X(v.name)}</option>`).join(""),h=e?.worldbooks?.presetId||"",x='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+a.map(v=>`<option value="${X(v.id)}" ${v.id===h?"selected":""}>${X(v.name)}</option>`).join(""),T=e?.runScope||"enabled";return`
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
      <select class="yyt-select yyt-tww-ctrl" data-binding="regexPreset">${f}</select>
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
        <option value="current" ${T==="current"?"selected":""}>\u4EC5\u5F53\u524D\u6D3B\u52A8\u8868</option>
        <option value="selected" ${T==="selected"?"selected":""}>\u5F53\u524D\u9009\u4E2D\u8868</option>
        <option value="enabled" ${T==="enabled"?"selected":""}>\u6240\u6709\u542F\u7528\u7684\u8868</option>
      </select>
      <div class="yyt-tww-row-meta"></div>
    </div>
  `}function IT(t){let{config:e}=t,r=e?.fillMode||"incremental",s=Number(e?.contextDepth)||3,o=e?.worldbookSync?.enabled===!0,n=e?.mirrorToMessage===!0;return`
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
      <div class="yyt-tww-toggle ${o?"on":""}" data-toggle="worldbookSync"></div>
    </div>

    ${MT(t)}

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">\u5199\u56DE\u6B63\u6587\u955C\u50CF</div>
        <div class="yyt-tww-toggle-desc">\u5728\u52A9\u624B\u6D88\u606F\u672B\u5C3E\u955C\u50CF\u5199\u5165 markdown \u65B9\u4FBF\u624B\u52A8\u67E5\u9605\u3002</div>
      </div>
      <div class="yyt-tww-toggle ${n?"on":""}" data-toggle="mirrorToMessage"></div>
    </div>
  `}function MT(t){let e=t?.config?.worldbookSync||{};if(!(e.enabled===!0))return"";let s=String(e.targetBook||""),o=String(t?.boundLorebook||""),n=t?.chatOpen===!0,a=s||o,i=Array.isArray(t.availableWorldbooks)?t.availableWorldbooks:[],l=e.wrapperConfig||{},c=l.enabled!==!1,d=String(l.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55"),u=String(l.wrapperHint||""),y=l.wrapperPlacement||{},p=String(y.position||"before_character_definition"),g=Number.isFinite(y.depth)?y.depth:2,f=Number.isFinite(y.order)?y.order:5e4,h;if(!n)h='<option value="">\u2014\u2014 \u8BF7\u5148\u6253\u5F00\u804A\u5929 \u2014\u2014</option>';else if(i.length===0)h=`<option value="${X(a)}">${a?X(a):"\u2014\u2014 \u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014\u2014"}</option>`;else{let v=i.map(M=>{let S=typeof M=="string"?M:M?.name||"";return`<option value="${X(S)}" ${S===a?"selected":""}>${X(S)}${S===o?"\uFF08\u89D2\u8272\u5361\u7ED1\u5B9A\uFF09":""}</option>`}).join("");h=(o?`<option value="">\u2014\u2014 \u89D2\u8272\u5361\u7ED1\u5B9A\uFF1A${X(o)} \u2014\u2014</option>`:'<option value="">\u2014\u2014 \u9009\u62E9 \u2014\u2014</option>')+v}return`
    <div class="yyt-tww-sub-zone" data-sub-zone="worldbookSync">
      <div class="yyt-tww-sub-row">
        <label>\u76EE\u6807\u4E16\u754C\u4E66</label>
        <select class="yyt-select yyt-tww-ctrl" data-binding="worldbookTargetBook" ${n?"":"disabled"}>${h}</select>
        <div class="yyt-tww-sub-meta">${n?'<a data-action="refresh-worldbooks">\u5237\u65B0\u5217\u8868</a>':'<span style="color:var(--tww-warning);">\u672A\u6253\u5F00\u804A\u5929</span>'}</div>
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
        <input class="yyt-input yyt-tww-ctrl" type="number" data-binding="worldbookWrapperDepth" value="${X(g)}" min="0">
        <input class="yyt-input yyt-tww-ctrl" type="number" data-binding="worldbookWrapperOrder" value="${X(f)}" min="0">
      </div>
    </div>
  `}function RT(t=[]){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D chat \xD7 isolationKey \u6682\u65E0\u5F52\u6863\uFF08\u4EC5\u5728\u5207\u6362\u6A21\u677F\u65F6\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF09</div>':`
    <div class="yyt-tww-archives-header">\u6A21\u677F\u5F52\u6863\u5386\u53F2 (${t.length}/8)</div>
    <div class="yyt-tww-archives-list">
      ${t.map((e,r)=>{let s=e?.state||{},o=s.mode||"unknown",n=e?.archivedAt?new Date(e.archivedAt).toLocaleString():"\u672A\u77E5\u65F6\u95F4",a=s.presetName||"",i=o==="preset_link"?`\u9884\u8BBE\u94FE\u63A5: ${X(a)}`:o==="chat_override"?"chat \u7EA7\u8986\u76D6\u6A21\u677F":o==="inherit_global"?"\u7EE7\u627F\u5168\u5C40":X(o);return`
          <div class="yyt-tww-archive-item" data-archive-index="${r}">
            <div class="yyt-tww-archive-meta">
              <span class="yyt-tww-archive-time">${X(n)}</span>
              <span class="yyt-tww-archive-mode">${i}</span>
            </div>
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="restore-archive" data-archive-index="${r}" title="\u6062\u590D\u6B64\u5F52\u6863\uFF08\u6062\u590D\u524D\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF09">\u6062\u590D</button>
          </div>
        `}).join("")}
    </div>
  `}function PT(t){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D slot \u6682\u65E0\u8868\u6570\u636E\u3002\u8BF7\u5148"\u7ACB\u5373\u586B\u8868"\u6216\u5728\u6570\u636E\u7F16\u8F91\u5668\u4E2D\u521D\u59CB\u5316\u3002</div>':`
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
  `}function wg(){let t=(()=>{try{return Le()}catch{return{}}})(),e=(()=>{try{return go()||[]}catch{return[]}})(),r=(()=>{try{return mo({})}catch{return null}})(),s=(()=>{try{return kr()||[]}catch{return[]}})(),o=(()=>{try{return dn()||[]}catch{return[]}})(),n=(()=>{try{return Ee.listPresets()||[]}catch{return[]}})(),a=(()=>{try{return jt.listPresets()||[]}catch{return[]}})(),i=(()=>{try{return Ie.getKey()}catch{return""}})(),l=NT(),c=DT(),d=$T(),u=null,y=0;try{let x=Ps(null);Array.isArray(x?.tableState?.tables)&&x.tableState.tables.length>0&&(u=x.tableState.tables,y=Number(x.tableState.updatedAt)||0)}catch{}let p=u||r?.template?.tables||t?.tables||[],g=t?.tableEnabledOverrides&&typeof t.tableEnabledOverrides=="object"?t.tableEnabledOverrides:{},f=p.map(x=>{let T=x?.id||"",v=T&&Object.prototype.hasOwnProperty.call(g,T)?g[T]:void 0;return{id:T,name:x?.name||"",enabled:v!==void 0?v:x?.enabled!==!1,rowCount:Array.isArray(x?.rows)?x.rows.length:0,colCount:Array.isArray(x?.columns)?x.columns.length:0,updatedHint:u&&y>0?hg(y):""}}),h=(()=>{try{return by()||[]}catch{return[]}})();return{config:t,activeTemplate:r,allTemplates:e,apiPresets:s,bypassPresets:o,regexPresets:n,worldbookPresets:a,availableWorldbooks:l,boundLorebook:c,chatOpen:d,isolationKey:i,tablesPreview:f,templateArchives:h,providerStats:CT()}}function NT(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(!e)return[];if(typeof e.getLorebooks=="function"){let r=e.getLorebooks();if(Array.isArray(r))return r}if(typeof e.getLorebookList=="function"){let r=e.getLorebookList();if(Array.isArray(r))return r}}catch(t){ge().warn("loadAvailableWorldbooks \u5931\u8D25",t)}return[]}function DT(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e){if(typeof e.getCurrentCharPrimaryLorebook=="function"){let s=e.getCurrentCharPrimaryLorebook();if(typeof s=="string"&&s)return s}if(typeof e.getCharLorebooks=="function")try{let s=e.getCharLorebooks();if(s?.primary)return String(s.primary)}catch{}if(typeof e.getChatLorebook=="function")try{let s=e.getChatLorebook();if(typeof s=="string"&&s)return s}catch{}}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let s=r.characters?.[r.characterId],o=s?.data?.character_book?.name||s?.data?.extensions?.world||s?.world;if(typeof o=="string"&&o)return o}}catch(t){ge().warn("loadCharacterBoundLorebook \u5931\u8D25",t)}return""}function $T(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e&&typeof e.getCurrentChatId=="function"){let s=e.getCurrentChatId();return!!(s&&String(s).trim()&&String(s).trim()!=="default_chat")}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let s=r.chat;if(Array.isArray(s)&&s.length>0||r.chatId)return!0}}catch{}return!1}function Cc(t,e){let r=window.jQuery||window.parent?.jQuery;if(!r||!t||!t.on){ge().warn("bindWorkbenchEvents: jQuery \u6216 $container \u4E0D\u53EF\u7528");return}t.off(".tww"),AT().then(()=>{typeof e=="function"&&e()}).catch(()=>{}),t.on("click.tww",'[data-action="run-now"]',async()=>{try{let n=await _n();n?.success?C("success","\u586B\u8868\u5B8C\u6210"):C("error",`\u586B\u8868\u5931\u8D25\uFF1A${n?.error||"\u672A\u77E5"}`),typeof e=="function"&&e()}catch(n){ge().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",n),C("error",`\u5F02\u5E38\uFF1A${n?.message||n}`)}}),t.on("click.tww",'[data-action="run-clear"]',async()=>{if(window.confirm("\u91CD\u586B\u4F1A\u6E05\u7A7A\u5F53\u524D\u6D88\u606F\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\u5E76\u91CD\u65B0\u751F\u6210\uFF0C\u786E\u5B9A\uFF1F"))try{let n=await _n(null,{clearBeforeUpdate:!0});n?.success?C("success","\u91CD\u586B\u5B8C\u6210"):C("error",`\u91CD\u586B\u5931\u8D25\uFF1A${n?.error||"\u672A\u77E5"}`),typeof e=="function"&&e()}catch(n){ge().error("\u91CD\u586B\u5F02\u5E38",n),C("error",`\u5F02\u5E38\uFF1A${n?.message||n}`)}}),t.on("click.tww",'[data-action="reset-run-scope"]',()=>{try{let n=Le();ft({...n,runScope:"enabled",scope:{...n.scope||{},mode:"enabled",activeTableId:"",selectedTableIds:[]}}),C("success","\u5DF2\u91CD\u7F6E\u8303\u56F4\u4E3A\u300C\u6240\u6709\u542F\u7528\u8868\u300D"),ge().info("\u7528\u6237\u91CD\u7F6E runScope \u4E3A enabled"),typeof e=="function"&&e()}catch(n){ge().error("\u91CD\u7F6E\u8303\u56F4\u5F02\u5E38",n),C("error",`\u91CD\u7F6E\u5931\u8D25\uFF1A${n?.message||n}`)}}),t.on("click.tww",'[data-action="reset-chat-data"]',async()=>{if(window.confirm("\u5C06\u6E05\u7A7A\u5F53\u524D\u804A\u5929\u6240\u6709\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\uFF08\u4E0D\u5F71\u54CD\u6A21\u677F/\u914D\u7F6E\uFF09\u3002\u4E0B\u6B21\u586B\u8868\u4F1A\u6309\u5F53\u524D\u6FC0\u6D3B\u6A21\u677F\u4ECE\u5934\u5F00\u59CB\u3002\u786E\u5B9A\uFF1F"))try{let n=await If();n?.success?(C("success",`\u5DF2\u6E05\u7A7A ${n.touched||0} \u6761\u6D88\u606F\u7684\u8868\u683C\u6570\u636E`),ge().info("\u6E05\u7A7A chat \u6570\u636E\u5B8C\u6210",n)):C("error","\u6E05\u7A7A\u5931\u8D25"),typeof e=="function"&&e()}catch(n){ge().error("\u6E05\u7A7A chat \u6570\u636E\u5F02\u5E38",n),C("error",`\u5F02\u5E38\uFF1A${n?.message||n}`)}}),t.on("click.tww",'[data-action="open-editor"]',n=>{n.preventDefault(),console.log("[YYT][TableWorkbench] open-editor button clicked"),ge().info("open-editor button clicked");try{let a=Ec();console.log("[YYT][TableWorkbench] openTableDataEditor returned:",a),ge().info("openTableDataEditor \u8C03\u7528\u5B8C\u6210",{hasReturn:!!a})}catch(a){console.error("[YYT][TableWorkbench] \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38:",a),ge().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",a),C("error",`\u6253\u5F00\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("click.tww","[data-table-index]",function(n){if(r(n.target).closest('[data-action="toggle-table-enabled"]').length>0||r(n.target).is("label, label *"))return;n.preventDefault();let a=Number(r(this).attr("data-table-index"));if(!(!Number.isFinite(a)||a<0)){console.log("[YYT][TableWorkbench] table card clicked, idx=",a);try{let l=Ps(null)?.tableState?.tables?.[a],c=Ec({focusTableUid:l?.uid||l?.id||""});console.log("[YYT][TableWorkbench] openTableDataEditor returned:",c)}catch(i){console.error("[YYT][TableWorkbench] \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38:",i),ge().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",i),C("error",`\u6253\u5F00\u5931\u8D25\uFF1A${i?.message||i}`)}}}),t.on("click.tww",'[data-action="toggle-archives"]',function(n){n.preventDefault();let a=t.find("[data-archives-panel]").first();a.length&&(a.css("display")==="none"?a.css("display","block"):a.css("display","none"))}),t.on("click.tww",'[data-action="restore-archive"]',async function(n){n.stopPropagation();let a=Number(r(this).attr("data-archive-index"));if(!(!Number.isFinite(a)||a<0)&&window.confirm(`\u6062\u590D\u5F52\u6863 #${a}\uFF1F\u6062\u590D\u524D\u4F1A\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF0C\u53EF\u518D\u6B21\u6062\u590D\u56DE\u6765\u3002`))try{let i=xy(a);i?.success?(C("success","\u5DF2\u6062\u590D\u5F52\u6863"),ge().info("restoreChatTemplateArchive \u6210\u529F",{index:a,scopeState:i.scopeState})):C("error",`\u6062\u590D\u5931\u8D25\uFF1A${i?.error||"\u672A\u77E5"}`),typeof e=="function"&&e()}catch(i){ge().error("\u6062\u590D\u5F52\u6863\u5F02\u5E38",i),C("error",`\u5F02\u5E38\uFF1A${i?.message||i}`)}}),t.on("change.tww",'[data-action="toggle-table-enabled"]',function(n){n.stopPropagation();let a=r(this).attr("data-table-id"),i=r(this).is(":checked");if(a)try{let l=Le(),c={...l.tableEnabledOverrides||{}};c[a]=i,ft({...l,tableEnabledOverrides:c}),C("success",i?`\u5DF2\u542F\u7528 ${a}`:`\u5DF2\u7981\u7528 ${a}`),ge().info("toggle \u5355\u8868\u6FC0\u6D3B",{tableId:a,enabled:i}),typeof e=="function"&&e()}catch(l){ge().error("toggle \u5355\u8868\u6FC0\u6D3B\u5F02\u5E38",l),C("error",`\u5207\u6362\u5931\u8D25\uFF1A${l?.message||l}`)}}),t.on("change.tww",'[data-binding="template"]',function(){let n=r(this).val();try{Fl(n);let a=Le();ft({...a,activeTemplate:n}),C("success","\u6A21\u677F\u5DF2\u5207\u6362"),typeof e=="function"&&e()}catch(a){ge().error("\u5207\u6362\u6A21\u677F\u5F02\u5E38",a),C("error",`\u5207\u6362\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("change.tww",'[data-binding="triggerMode"]',function(){let n=r(this).val();try{let a=Le();ft({...a,autoUpdateEnabled:n==="auto"}),C("success",n==="auto"?"\u5DF2\u5207\u6362\u4E3A\u81EA\u52A8\u6A21\u5F0F":"\u5DF2\u5207\u6362\u4E3A\u624B\u52A8\u6A21\u5F0F"),typeof e=="function"&&e()}catch(a){ge().error("\u5207\u6362\u89E6\u53D1\u6A21\u5F0F\u5F02\u5E38",a),C("error",`\u5207\u6362\u5931\u8D25\uFF1A${a?.message||a}`)}});let s=[{sel:'[data-binding="apiPreset"]',key:"apiPreset"},{sel:'[data-binding="runScope"]',key:"runScope"},{sel:'[data-binding="fillMode"]',key:"fillMode"}];for(let{sel:n,key:a}of s)t.on("change.tww",n,function(){let i=r(this).val();try{let l=Le(),c={...l,[a]:i};a==="runScope"&&(c.scope={...l.scope||{},mode:i,...i==="enabled"?{activeTableId:"",selectedTableIds:[]}:{}}),ft(c),C("success","\u5DF2\u4FDD\u5B58")}catch(l){ge().error(`\u4FDD\u5B58 ${a} \u5F02\u5E38`,l),C("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`)}});t.on("change.tww",'[data-binding="bypassPreset"]',function(){let n=r(this).val();try{let a=Le();ft({...a,bypass:{...a.bypass||{},presetId:n,enabled:!!n}}),C("success","Ai \u6307\u4EE4\u9884\u8BBE\u5DF2\u4FDD\u5B58")}catch(a){ge().error("\u4FDD\u5B58 bypass \u5F02\u5E38",a),C("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("change.tww",'[data-binding="regexPreset"]',function(){let n=r(this).val();try{let a=Le();ft({...a,extraction:{...a.extraction||{},regexPresetId:n}}),C("success","\u6B63\u5219\u9884\u8BBE\u5DF2\u66F4\u65B0")}catch(a){ge().error("\u4FDD\u5B58 regexPreset \u5F02\u5E38",a),C("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("change.tww",'[data-binding="worldbookPreset"]',function(){let n=r(this).val();try{let a=Le();ft({...a,worldbooks:{...a.worldbooks||{},presetId:n}}),C("success","\u4E16\u754C\u4E66\u9884\u8BBE\u5DF2\u66F4\u65B0")}catch(a){ge().error("\u4FDD\u5B58 worldbookPreset \u5F02\u5E38",a),C("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("change.tww",'[data-binding="contextDepth"]',function(){let n=Math.max(1,parseInt(r(this).val(),10)||3);try{let a=Le();ft({...a,contextDepth:n}),C("success","\u5DF2\u4FDD\u5B58")}catch(a){ge().error("\u4FDD\u5B58 contextDepth \u5F02\u5E38",a),C("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("click.tww",'[data-toggle="worldbookSync"]',function(){let n=r(this),a=n.hasClass("on"),i=!a;n.toggleClass("on",i);try{let l=Le();ft({...l,worldbookSync:{...l.worldbookSync||{},enabled:i}}),C("success",i?"\u5DF2\u542F\u7528\u4E16\u754C\u4E66\u540C\u6B65":"\u5DF2\u505C\u7528\u4E16\u754C\u4E66\u540C\u6B65"),typeof e=="function"&&e()}catch(l){n.toggleClass("on",a),ge().error("toggle worldbookSync \u5F02\u5E38",l),C("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`)}}),t.on("click.tww",'[data-toggle="worldbookWrapperEnabled"]',function(){let n=r(this),a=n.hasClass("on"),i=!a;n.toggleClass("on",i);try{let l=Le(),c=l.worldbookSync||{};ft({...l,worldbookSync:{...c,wrapperConfig:{...c.wrapperConfig||{},enabled:i}}}),C("success",i?"\u5DF2\u542F\u7528 Wrapper \u5305\u88F9":"\u5DF2\u505C\u7528 Wrapper")}catch(l){n.toggleClass("on",a),ge().error("toggle worldbookWrapperEnabled \u5F02\u5E38",l)}});let o=[{sel:'[data-binding="worldbookTargetBook"]',path:"targetBook",type:"string"},{sel:'[data-binding="worldbookWrapperTag"]',path:"wrapperConfig.wrapperTag",type:"string"},{sel:'[data-binding="worldbookWrapperHint"]',path:"wrapperConfig.wrapperHint",type:"string"},{sel:'[data-binding="worldbookWrapperPosition"]',path:"wrapperConfig.wrapperPlacement.position",type:"string"},{sel:'[data-binding="worldbookWrapperDepth"]',path:"wrapperConfig.wrapperPlacement.depth",type:"number"},{sel:'[data-binding="worldbookWrapperOrder"]',path:"wrapperConfig.wrapperPlacement.order",type:"number"}];for(let{sel:n,path:a,type:i}of o)t.on("change.tww",n,function(){let l=r(this).val();i==="number"&&(l=Number.parseInt(l,10));try{let c=Le(),d=_T(c.worldbookSync||{});ET(d,a,l),ft({...c,worldbookSync:d}),C("success","\u5DF2\u4FDD\u5B58")}catch(c){ge().error(`\u4FDD\u5B58 worldbookSync.${a} \u5F02\u5E38`,c),C("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${c?.message||c}`)}});t.on("click.tww",'[data-action="refresh-worldbooks"]',function(n){n.preventDefault(),typeof e=="function"&&e(),C("success","\u5DF2\u5237\u65B0\u4E16\u754C\u4E66\u5217\u8868")}),t.on("click.tww",'[data-toggle="mirrorToMessage"]',function(){let n=r(this),a=n.hasClass("on"),i=!a;n.toggleClass("on",i);try{let l=Le();ft({...l,mirrorToMessage:i}),C("success",i?"\u5DF2\u542F\u7528\u6B63\u6587\u955C\u50CF":"\u5DF2\u505C\u7528\u6B63\u6587\u955C\u50CF")}catch(l){n.toggleClass("on",a),ge().error("toggle mirrorToMessage \u5F02\u5E38",l),C("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`)}}),t.on("click.tww","[data-link]",function(n){n.preventDefault(),C("info","\u8DF3\u8F6C\u5230\u9884\u8BBE\u7BA1\u7406\u9762\u677F\uFF08\u5F85\u63A5\u5165\uFF09")})}var Ac,mt,bg,vg=N(()=>{W();lo();br();no();vs();Ja();wn();mg();je();Do();bo();hs();Ks();Ge();mt={kind:null,sheetCount:null,rowCount:null,lastError:null,lastRefreshAt:0};bg=`
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
`});var Sg={};se(Sg,{TableWorkbenchPanel:()=>Tg,default:()=>OT});function LT(){if(!kc)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tww-styles")){kc=!0;return}let r=t.createElement("style");r.id="yyt-tww-styles",r.textContent=bg,e.appendChild(r),kc=!0}catch(t){Ic.warn("\u6CE8\u5165\u5DE5\u4F5C\u53F0\u6837\u5F0F\u5931\u8D25",t)}}var Ic,kc,Tg,OT,_g=N(()=>{Ge();W();vg();Ic=I.createScope("TableWorkbenchPanel"),kc=!1;Tg={id:"tableWorkbenchPanel",render(){LT();try{let t=wg();return xg(t)}catch(t){return Ic.error("\u6E32\u67D3\u5DE5\u4F5C\u53F0 UI \u5F02\u5E38",t),`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u4F5C\u53F0\u6E32\u67D3\u5931\u8D25\uFF1A${t?.message||t}</span></div>`}},bindEvents(t){if(!Q()||!me(t))return;let r=this,s=()=>{try{t.html(r.render()),Cc(t,s)}catch(o){Ic.error("refresh \u5F02\u5E38",o)}};Cc(t,s)},renderTo(t){!Q()||!me(t)||(t.html(this.render()),this.bindEvents(t))}},OT=Tg});var Ag={};se(Ag,{LoggerPanel:()=>Eg,default:()=>jT});function KT(t){switch(t){case ce.DEBUG:return"yyt-log-debug";case ce.INFO:return"yyt-log-info";case ce.WARN:return"yyt-log-warn";case ce.ERROR:return"yyt-log-error";default:return""}}function UT(t){let e=new Date(t),r=s=>String(s).padStart(2,"0");return`${r(e.getHours())}:${r(e.getMinutes())}:${r(e.getSeconds())}.${String(e.getMilliseconds()).padStart(3,"0")}`}var BT,zT,Eg,jT,Cg=N(()=>{W();Ye();Ge();BT="yyt-logger-panel",zT=[{level:null,label:"\u5168\u90E8",icon:"fa-list"},{level:ce.DEBUG,label:"DEBUG",icon:"fa-bug"},{level:ce.INFO,label:"INFO",icon:"fa-circle-info"},{level:ce.WARN,label:"WARN",icon:"fa-triangle-exclamation"},{level:ce.ERROR,label:"ERROR",icon:"fa-circle-exclamation"}];Eg={id:"loggerPanel",render(){let t=I.getStats();return`
      <div class="yyt-logger-panel" id="${BT}">
        <div class="yyt-logger-toolbar">
          <div class="yyt-logger-filter-btns" data-yyt-log-filter-group>
            ${zT.map((e,r)=>`<button class="yyt-log-filter-btn ${r===0?"yyt-active":""}" data-level="${e.level??""}">
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
    `},bindEvents(t){let e=Q();if(!e||!me(t))return;let r=this,s=null,o=!1,n=[],a=t.find("[data-yyt-log-list]"),i=t.find("[data-yyt-log-search]"),l=t.find("[data-yyt-log-autoscroll]"),c=t.find("[data-yyt-log-pause]");function d(p){if(!p.length){a.html('<div class="yyt-logger-empty">\u6682\u65E0\u5339\u914D\u7684\u65E5\u5FD7\u8BB0\u5F55</div>');return}a.html(p.map(g=>`
        <div class="yyt-log-entry ${KT(g.level)}" data-log-id="${g.id}">
          <span class="yyt-log-time">${UT(g.timestamp)}</span>
          <span class="yyt-log-level">${I.levelLabel(g.level)}</span>
          <span class="yyt-log-scope">${oe(g.scope)}</span>
          <span class="yyt-log-msg">${oe(g.message)}</span>
          ${g.data!==void 0?`<span class="yyt-log-data">${oe(typeof g.data=="object"?JSON.stringify(g.data):String(g.data))}</span>`:""}
        </div>
      `).join(""))}function u(){let p=i.val()?.trim()||"",{entries:g}=I.getEntries({level:s,search:p||void 0,limit:500});d(g),l.is(":checked")&&requestAnimationFrame(()=>{a[0].scrollTop=a[0].scrollHeight})}function y(){if(o||!n.length)return;let p=n;n=[],u()}this._onLogEntry=p=>{if(o||s!==null&&p.level<s)return;let g=i.val()?.trim().toLowerCase()||"";if(g){let f=p.scope.toLowerCase().includes(g),h=p.message.toLowerCase().includes(g);if(!f&&!h)return}n.push(p),n.length>=50?y():this._flushTimer||(this._flushTimer=setTimeout(()=>{this._flushTimer=null,y(),r._updateStats(t)},250))},K.on("logger:entry",this._onLogEntry),t.on("click.yytLogger","[data-yyt-log-filter-group] .yyt-log-filter-btn",p=>{t.find("[data-yyt-log-filter-group] .yyt-log-filter-btn").removeClass("yyt-active"),e(p.currentTarget).addClass("yyt-active");let g=e(p.currentTarget).data("level");s=g===""?null:g,u(),r._updateStats(t)}),i.on("input.yytLogger",()=>{u()}),t.on("click.yytLogger","[data-yyt-log-pause]",()=>{o=!o,c.toggleClass("yyt-active",o),c.html(o?'<i class="fa-solid fa-play"></i> \u7EE7\u7EED':'<i class="fa-solid fa-pause"></i> \u6682\u505C'),o||(n=[],u(),r._updateStats(t))}),t.on("click.yytLogger","[data-yyt-log-clear]",()=>{I.clear(),a.html('<div class="yyt-logger-empty">\u65E5\u5FD7\u5DF2\u6E05\u9664</div>'),r._updateStats(t)}),t.on("click.yytLogger","[data-yyt-log-export]",()=>{let{entries:p}=I.getEntries({limit:1e4}),g=JSON.stringify(p.map(T=>({time:new Date(T.timestamp).toISOString(),level:I.levelLabel(T.level),scope:T.scope,message:T.message,data:T.data})),null,2),f=new Blob([g],{type:"application/json"}),h=URL.createObjectURL(f),x=document.createElement("a");x.href=h,x.download=`yyt-logs-${new Date().toISOString().replace(/[:.]/g,"-")}.json`,x.click(),URL.revokeObjectURL(h)}),u()},_updateStats(t){if(!Q()||!me(t))return;let r=I.getStats(),s=t.find(".yyt-logger-stats");s.length&&s.html(`
      <span class="yyt-logger-stat">\u5171 <strong>${r.total}</strong> \u6761</span>
      ${["ERROR","WARN","INFO","DEBUG"].map(o=>`<span class="yyt-logger-stat yyt-log-${o.toLowerCase()}">${o}: <strong>${r.byLevel[o]||0}</strong></span>`).join("")}
    `)},destroy(t){let e=Q();this._onLogEntry&&(K.off("logger:entry",this._onLogEntry),this._onLogEntry=null),this._flushTimer&&(clearTimeout(this._flushTimer),this._flushTimer=null),!(!e||!me(t))&&t.off(".yytLogger")},getStyles(){return`
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
    `}},jT=Eg});var Lg={};se(Lg,{MAIN_TAB_RENDERERS:()=>Wc,PanelState:()=>wi,SCRIPT_ID:()=>os,SUB_TAB_RENDERERS:()=>Hc,UIManager:()=>zo,bindDialogEvents:()=>Lo,closeActiveCustomSelectDropdown:()=>qt,closeCustomSelectDropdown:()=>Si,createDialogHtml:()=>$o,default:()=>WT,destroyEnhancedCustomSelects:()=>it,downloadJson:()=>Oo,enhanceNativeSelects:()=>Mt,escapeHtml:()=>oe,fillFormWithConfig:()=>ih,getAllStyles:()=>$g,getFormApiConfig:()=>ah,getJQuery:()=>Q,getTargetDocument:()=>cr,initUI:()=>Rg,isContainerValid:()=>me,normalizeCustomSelectOptions:()=>Sd,openCustomSelectDropdown:()=>vd,readFileContent:()=>Bo,registerComponents:()=>Mc,renderApiPanel:()=>Rc,renderBypassPanel:()=>Kc,renderCustomSelectControl:()=>_d,renderEscapeTransformToolPanel:()=>Bc,renderLoggerPanel:()=>Fc,renderMainTab:()=>Ng,renderPunctuationTransformToolPanel:()=>zc,renderRegexPanel:()=>Nc,renderSettingsPanel:()=>Uc,renderStatusBlockPanel:()=>Lc,renderSubTabComponent:()=>Dg,renderSummaryToolPanel:()=>$c,renderTableTemplatePanel:()=>Dc,renderTableWorkbenchPanel:()=>jc,renderToolPanel:()=>Pg,renderWorldbookPresetPanel:()=>Pc,renderYouyouReviewPanel:()=>Oc,repositionActiveCustomSelectDropdown:()=>Ti,resetJQueryCache:()=>Qm,showConfirm:()=>dr,showPrompt:()=>lh,showToast:()=>C,showTopNotice:()=>ns,toggleCustomSelectDropdown:()=>Td,uiManager:()=>Kt,withButtonLoading:()=>ch});async function Ig(t){if(!Qa.has(t)){let e=kg[t];if(typeof e!="function")throw new Error(`unknown_panel:${t}`);Qa.set(t,e().then(r=>{let s=r?.[t]||r?.default;if(!s?.id)throw new Error(`invalid_panel:${t}`);return s}).catch(r=>{throw Qa.delete(t),r}))}return Qa.get(t)}function Mg(t,e=null){let r=e?.message?`\uFF1A${oe(e.message)}`:"";return`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>${oe(t)}${r}</span></div>`}async function Mc(){let t=await Promise.allSettled(Object.keys(kg).map(async r=>{let s=await Ig(r);return Kt.register(s.id,s),s.id})),e=t.filter(r=>r.status==="rejected");e.length&&e.forEach(r=>En.error("\u7EC4\u4EF6\u6CE8\u518C\u5931\u8D25",r.reason)),En.log(`\u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210\uFF0C\u6210\u529F ${t.length-e.length} \u4E2A\uFF0C\u5931\u8D25 ${e.length} \u4E2A`)}async function Rg(t={}){let{autoInjectStyles:e=!0,targetDocument:r,...s}=t;Kt.init(s),await Mc(),e&&Kt.injectStyles(r),En.log("\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}async function FT(t){let e=await Ig(t);return Kt.getComponent(e.id)||Kt.register(e.id,e),e}async function ht(t,e,r={}){let s=await FT(t);Kt.render(s.id,e,r)}function Rc(t){return ht("ApiPresetPanel",t)}function Pc(t){return ht("WorldbookPresetPanel",t)}function Nc(t){return ht("RegexExtractPanel",t)}function Dc(t){return ht("TableTemplatePanel",t)}function Pg(t){return ht("ToolManagePanel",t)}function $c(t){return ht("SummaryToolPanel",t)}function Lc(t){return ht("StatusBlockPanel",t)}function Oc(t){return ht("YouyouReviewPanel",t)}function Bc(t){return ht("EscapeTransformToolPanel",t)}function zc(t){return ht("PunctuationTransformToolPanel",t)}function Kc(t){return ht("BypassPanel",t)}function Uc(t){return ht("SettingsPanel",t)}function jc(t){return ht("TableWorkbenchPanel",t)}function Fc(t){return ht("LoggerPanel",t)}async function Ng(t,e){let r=Wc[t];if(!r)return!1;try{await r.render(e)}catch(s){En.error(r.failMessage,s),e.html(Mg(r.failMessage,s))}return!0}async function Dg(t,e){let r=Hc[t];if(!r)return null;try{await r.render(e)}catch(s){En.error(r.failMessage,s),e.html(Mg(r.failMessage,s))}return t}function $g(){return Kt.getAllStyles()}var En,kg,Qa,Wc,Hc,WT,Og=N(()=>{W();_i();Ge();Ge();_i();En=I.createScope("UI"),kg=Object.freeze({ApiPresetPanel:()=>Promise.resolve().then(()=>(jd(),Ud)),WorldbookPresetPanel:()=>Promise.resolve().then(()=>(ou(),su)),RegexExtractPanel:()=>Promise.resolve().then(()=>(dp(),cp)),TableTemplatePanel:()=>Promise.resolve().then(()=>(Sy(),Ty)),ToolManagePanel:()=>Promise.resolve().then(()=>(Ay(),Ey)),SummaryToolPanel:()=>Promise.resolve().then(()=>(Jy(),Vy)),StatusBlockPanel:()=>Promise.resolve().then(()=>(Zy(),Qy)),YouyouReviewPanel:()=>Promise.resolve().then(()=>(rf(),tf)),EscapeTransformToolPanel:()=>Promise.resolve().then(()=>(af(),nf)),PunctuationTransformToolPanel:()=>Promise.resolve().then(()=>(df(),cf)),BypassPanel:()=>Promise.resolve().then(()=>(yf(),pf)),SettingsPanel:()=>Promise.resolve().then(()=>(ic(),ac)),TableWorkbenchPanel:()=>Promise.resolve().then(()=>(_g(),Sg)),LoggerPanel:()=>Promise.resolve().then(()=>(Cg(),Ag))}),Qa=new Map;Wc=Object.freeze({tableWorkbench:{render:t=>jc(t),failMessage:"\u586B\u8868\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25"},bypass:{render:t=>Kc(t),failMessage:"Ai\u6307\u4EE4\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},settings:{render:t=>Uc(t),failMessage:"\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},logger:{render:t=>Fc(t),failMessage:"\u65E5\u5FD7\u9762\u677F\u52A0\u8F7D\u5931\u8D25"}}),Hc=Object.freeze({ApiPresetPanel:{render:t=>Rc(t),failMessage:"API \u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},RegexExtractPanel:{render:t=>Nc(t),failMessage:"\u6B63\u5219\u63D0\u53D6\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},WorldbookPresetPanel:{render:t=>Pc(t),failMessage:"\u4E16\u754C\u4E66\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},TableTemplatePanel:{render:t=>Dc(t),failMessage:"\u8868\u683C\u6A21\u677F\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},SummaryToolPanel:{render:t=>$c(t),failMessage:"\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},StatusBlockPanel:{render:t=>Lc(t),failMessage:"\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25"},YouyouReviewPanel:{render:t=>Oc(t),failMessage:"\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25"},EscapeTransformToolPanel:{render:t=>Bc(t),failMessage:"\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},PunctuationTransformToolPanel:{render:t=>zc(t),failMessage:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"}});WT={uiManager:Kt,registerComponents:Mc,initUI:Rg,renderApiPanel:Rc,renderWorldbookPresetPanel:Pc,renderRegexPanel:Nc,renderTableTemplatePanel:Dc,renderToolPanel:Pg,renderSummaryToolPanel:$c,renderStatusBlockPanel:Lc,renderYouyouReviewPanel:Oc,renderEscapeTransformToolPanel:Bc,renderPunctuationTransformToolPanel:zc,renderBypassPanel:Kc,renderSettingsPanel:Uc,renderTableWorkbenchPanel:jc,renderLoggerPanel:Fc,MAIN_TAB_RENDERERS:Wc,SUB_TAB_RENDERERS:Hc,renderMainTab:Ng,renderSubTabComponent:Dg,getAllStyles:$g}});var Fg={};se(Fg,{TX_PHASE:()=>zt,ToolAutomationService:()=>ei,Transaction:()=>Za,default:()=>VT,toolAutomationService:()=>jg});function de(t){return t==null?"":String(t).trim()}function Bg(t){let e=_a(t);return de(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.chat_filename??t?.this_chid??"chat_default")||"chat_default"}function Yc(t){let e=_a(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function Ug(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="user"||e==="system"?!1:e==="assistant"||e==="ai"||!e}function HT(t,e){let r=de(e);if(!r)return null;let s=Yc(t);for(let o=s.length-1;o>=0;o-=1){let n=s[o];if([n?.messageId,n?.message_id,n?.id,n?.mid,n?.mesid,n?.chat_index,o].map(i=>de(i)).includes(r))return n||null}return null}function zg(t){let e=Yc(t);if(!Array.isArray(e)||e.length===0)return null;let r=e.length-1,s=e[r]||null;if(!Ug(s))return null;let o=de(s?.messageId??s?.message_id??s?.id??s?.mid??s?.mesid??s?.chat_index??r);return o?{messageId:o,swipeId:de(s?.swipeId??s?.swipe_id??s?.swipe??s?.swipeIndex),message:s}:null}function qT(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${t}_${e}`}var Ke,Kg,YT,GT,zt,Za,ei,jg,VT,Wg=N(()=>{pn();W();ql();er();yn();Jl();us();Ja();br();Ke=I.createScope("ToolAutomation");Kg=1e4,YT=15e3,GT=800;zt=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),Za=class{constructor({chatId:e,messageId:r,swipeId:s,sourceEvent:o,generationKey:n}){this.traceId=qT(),this.chatId=e||"",this.messageId=r||"",this.swipeId=s||"",this.sourceEvent=o||"",this.generationKey=n||"",this.phase=zt.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,r={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,r),this}toSnapshot(){return{...this}}},ei=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._recentlyProcessedSlots=new Map,this._ownWriteMessageIds=new Map,this._slotQueues=new Map,this._activeTransactions=new Map,this._isProcessing=!1,this._currentChatId="",this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""},this._messageReceivedThrottleUntil=0}setDebugMode(e){this.debugMode=e===!0}init(e={}){this.stop(),this._hostBindingStatus.lastInitAt=Date.now(),this._hostBindingStatus.initAttempts=(this._hostBindingStatus.initAttempts||0)+1;let r=Hr();this._currentChatId=Bg(r);let s=(o,...n)=>{let a=Hr(),{messageId:i,swipeId:l}=this._extractIdentitiesFromArgs(n);if(Ke.debug(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${o}"`,{messageId:i,swipeId:l,argCount:n.length}),o===Fe.MESSAGE_RECEIVED){let f=Date.now();if(f<this._messageReceivedThrottleUntil){Ke.debug(`MESSAGE_RECEIVED \u5728\u8282\u6D41\u7A97\u53E3\u5185\uFF0C\u8DF3\u8FC7\uFF08\u5269\u4F59 ${this._messageReceivedThrottleUntil-f}ms\uFF09`);return}this._messageReceivedThrottleUntil=f+this._getSettleMs()+5e3}let c=null,d=i,u=l;if(d&&(c=HT(a,d)),!c){let f=zg(a);f?.messageId&&(c=f.message,d=f.messageId,u=f.swipeId||u)}if(!d||!c){Ke.debug(`\u4E8B\u4EF6 "${o}" \u65E0 assistant \u76EE\u6807\uFF0C\u8DF3\u8FC7`);return}if(!Ug(c)){Ke.debug(`\u4E8B\u4EF6 "${o}" \u547D\u4E2D\u975E assistant \u6D88\u606F\uFF0C\u8DF3\u8FC7`,{messageId:d});return}let y=String(c.content||c.mes||"").trim();if(!y||y.length<5){Ke.debug(`\u4E8B\u4EF6 "${o}" \u6D88\u606F\u8FC7\u77ED\uFF08${y.length} \u5B57\u7B26\uFF09\uFF0C\u8DF3\u8FC7`);return}if(this._isProcessing){Ke.debug(`\u4E8B\u4EF6 "${o}" \u6B63\u5728\u5904\u7406\u4E2D\uFF0C\u8DF3\u8FC7`);return}if(this._isOwnWrite(d)){Ke.debug(`\u4E8B\u4EF6 "${o}" \u547D\u4E2D own-write \u9ED1\u540D\u5355\uFF0C\u8DF3\u8FC7`,{messageId:d});return}let p=de(c?.swipeId??c?.swipe_id??c?.swipe??c?.swipeIndex);p&&(u=p);let g=`${d}::${u}`;if(this._isRecentlyProcessed(g)){Ke.debug(`\u4E8B\u4EF6 "${o}" slot \u5DF2\u8FD1\u671F\u5904\u7406\u8FC7\uFF0C\u8DF3\u8FC7`,{slotKey:g});return}this._scheduleMessageProcessing(d,u,{settleMs:this._getSettleMs(),sourceEvent:o}),Ke.info(`\u4E8B\u4EF6 "${o}" \u901A\u8FC7\u6240\u6709\u5B88\u536B\uFF0C\u5DF2\u8C03\u5EA6\u5904\u7406`,{targetMessageId:d,targetSwipeId:u,throttleUntil:this._messageReceivedThrottleUntil,isProcessing:this._isProcessing})};return this._stopCallbacks.push(Ot.subscribe(Fe.MESSAGE_SENT,()=>{Ke.debug("MESSAGE_SENT \u2192 \u6E05\u7406\u8C03\u5EA6\u961F\u5217"),this._pendingTimers.forEach(o=>clearTimeout(o)),this._pendingTimers.clear()})),this._stopCallbacks.push(Ot.subscribe(Fe.MESSAGE_RECEIVED,(...o)=>{s(Fe.MESSAGE_RECEIVED,...o)})),this._stopCallbacks.push(Ot.subscribe(Fe.GENERATION_STOPPED,()=>{Ke.info("GENERATION_STOPPED \u2192 \u53D6\u6D88\u6240\u6709\u6D3B\u8DC3\u4E8B\u52A1"),this._cancelActiveTransactions("generation_stopped"),this._pendingTimers.forEach(o=>clearTimeout(o)),this._pendingTimers.clear(),this._isProcessing=!1})),this._stopCallbacks.push(Ot.subscribe(Fe.CHAT_CHANGED,()=>{this._resetForChatChange()})),this._stopCallbacks.push(Ot.subscribe(Fe.MESSAGE_DELETED,o=>{this._clearMessageState(de(o))})),this._refreshHostBindingStatus(),this._seedKnownSlots(),Ke.info("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{chatId:this._currentChatId,source:this._hostBindingStatus.source}),!0}_seedKnownSlots(){try{let e=Hr(),r=zg(e);if(!r?.messageId)return;let s=`${de(r.messageId)}::${de(r.swipeId)}`;this._recentlyProcessedSlots.set(s,Number.MAX_SAFE_INTEGER),Ke.debug(`\u5DF2\u5C06\u5F53\u524D\u6700\u65B0 slot "${s}" \u9884\u6807\u8BB0\u4E3A\u5DF2\u77E5\uFF0C\u8DF3\u8FC7 MESSAGE_RECEIVED \u91CD\u653E`)}catch(e){Ke.warn("_seedKnownSlots \u5931\u8D25",{error:e})}}_refreshHostBindingStatus(){let e=Ot.describe(),r=[Fe.MESSAGE_SENT,Fe.MESSAGE_RECEIVED,Fe.GENERATION_STOPPED,Fe.CHAT_CHANGED,Fe.MESSAGE_DELETED];this._hostBindingStatus={...this._hostBindingStatus,initialized:!!e.hasBridge,lastInitResult:e.hasBridge?"ready":e.retryScheduled?"pending_retry":"pending",source:e.source,hasEventSource:!!e.hasBridge,hasEventTypes:Array.isArray(e.availableEvents)&&e.availableEvents.length>0,eventBindings:r.map(s=>`subscribed: ${s}`),retryScheduled:!!e.retryScheduled,retryDelayMs:0,lastError:""}}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(r){Ke.warn("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",{error:r})}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("service_stopped"),this._activeTransactions.clear(),this._isProcessing=!1,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""}}isEnabled(){return!0}getRuntimeSnapshot(){return this._pruneRecentSlots(),this._pruneOwnWrites(),this._refreshHostBindingStatus(),{currentChatId:this._currentChatId,enabled:!0,isProcessing:this._isProcessing,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,recentlyProcessedSlotCount:this._recentlyProcessedSlots.size,ownWriteMessageIdCount:this._ownWriteMessageIds.size,activeTransactionCount:this._activeTransactions.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),hostBinding:{...this._hostBindingStatus,eventBindings:Array.isArray(this._hostBindingStatus?.eventBindings)?[...this._hostBindingStatus.eventBindings]:[]},settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let r=await ds({messageId:"",swipeId:"",runSource:"AUTO"}),s=de(r?.sourceMessageId||r?.messageId);return s?this.processAssistantMessage(s,{force:e.force===!0,swipeId:de(r?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:r=!1,swipeId:s="",sourceEvent:o="AUTO"}={}){let n=new Za({chatId:this._currentChatId,messageId:e,swipeId:s,sourceEvent:o});try{if(!e)return this._skipTransaction(n,"missing_message_id");n.transition(zt.CONFIRMED);let a=await ds({messageId:e,swipeId:s,runSource:"AUTO"}),i=a?.targetAssistantMessage||null;if(!i||!a?.sourceMessageId)return this._skipTransaction(n,"assistant_message_not_found");let l=String(i.content||i.mes||"").trim();if(!l||l.length<5)return this._skipTransaction(n,"assistant_message_too_short");n.transition(zt.CONTEXT_BUILT);let c=`${de(a.sourceMessageId)}::${de(a.sourceSwipeId||s)}`;if(n.generationKey=c,!r&&this._isRecentlyProcessed(c))return this._skipTransaction(n,"duplicate_slot",{slotKey:c});let d=qo(),u=At.filterAutoPostResponseTools(d),p=[...d.filter(h=>At.shouldRunLocalTransform(h)&&h.output?.autoTrigger!==!1),...u],g=Le(),f=g?.autoUpdateEnabled===!0&&de(g?.autoUpdateTrigger||"assistantMessage")==="assistantMessage";return!p.length&&!f?this._skipTransaction(n,"no_auto_tools",{tools:p}):(n.slotKey=c,n.slotRevisionKey=a.slotRevisionKey||"",n.sourceMessageId=a.sourceMessageId||e,n.sourceSwipeId=a.sourceSwipeId||s||"",this._enqueueSlot(c,async()=>{if(!r&&this._isRecentlyProcessed(c))return this._skipTransaction(n,"duplicate_slot_after_queue",{slotKey:c});this._isProcessing=!0,this._markSlotProcessed(c),n.transition(zt.REQUEST_STARTED);let h=new AbortController;this._registerActiveTransaction(n,{controller:h,slotKey:c,sourceMessageId:a.sourceMessageId||e,sourceSwipeId:a.sourceSwipeId||s||""});try{let{results:x,hasWriteback:T}=await this._executeAutoTools(p,a,h,n,{slotKey:c,messageId:e,swipeId:s}),{tableResult:v,hasWriteback:z}=await this._executeAutoTableUpdate(a,h,n,{shouldRunTableAuto:f,tableWorkbenchConfig:g,messageId:e,swipeId:s,sourceEvent:o}),M=T||z;n.transition(zt.REQUEST_FINISHED,{toolResults:x,tableResult:v}),M&&(n.transition(zt.WRITEBACK_STARTED),n.writebackState={messageId:a.sourceMessageId,swipeId:a.sourceSwipeId,hasOutput:!0},this._messageReceivedThrottleUntil=Date.now()+YT),this._markSlotProcessed(c);let S=x.every(A=>A?.success!==!1),E=!f||!!v?.success||v?.skipped===!0||v?.meta?.aborted===!0||v?.meta?.stale===!0,G=S&&E,q=x.some(A=>A?.meta?.aborted===!0||A?.meta?.stale===!0||A?.error==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")||v?.meta?.aborted===!0||v?.meta?.stale===!0;G&&n.transition(zt.WRITEBACK_COMMITTED);let $=G?zt.REFRESH_CONFIRMED:zt.FAILED;return n.transition($,{verdict:q?"aborted":G?"success":"partial_failure"}),this._recordTransaction(n),this._updateAutoRuntimeForResults(p,a,n,x),{success:G,traceId:n.traceId,slotKey:c,sourceEvent:o,messageId:a.sourceMessageId||e,phase:n.phase,results:x,tableResult:v}}finally{this._unregisterActiveTransaction(n.traceId),this._isProcessing=!1}}))}catch(a){return n.transition(zt.FAILED,{error:a?.message||String(a)}),this._recordTransaction(n),this._unregisterActiveTransaction(n.traceId),this._isProcessing=!1,Ke.error("processAssistantMessage \u5F02\u5E38",{error:a}),{success:!1,traceId:n.traceId,error:n.error,phase:n.phase}}}_extractIdentitiesFromArgs(e){let r="",s="";for(let o of e)if(o!=null){if(typeof o=="number"&&Number.isFinite(o)&&!r){r=de(o);continue}if(typeof o=="string"){let n=de(o);!r&&/^\d+$/.test(n)&&(r=n);continue}typeof o=="object"&&(r||(r=de(o.messageId??o.message_id??o.id??o.mid??o.mesid??o.chat_index??o.message?.messageId??o.message?.message_id??o.message?.id??o.message?.mid??o.message?.mesid??o.message?.chat_index??o.data?.messageId??o.data?.message_id??o.data?.id??o.data?.mid??o.data?.mesid??o.data?.chat_index??o.target?.messageId??o.target?.message_id??o.target?.id??o.target?.mid??o.target?.mesid??o.target?.chat_index)),s||(s=de(o.swipeId??o.swipe_id??o.swipe??o.swipeIndex??o.currentSwipe??o.message?.swipeId??o.message?.swipe_id??o.message?.swipe??o.data?.swipeId??o.data?.swipe_id??o.data?.swipe??o.target?.swipeId??o.target?.swipe_id??o.target?.swipe)))}return{messageId:r,swipeId:s}}_scheduleMessageProcessing(e,r="",s={}){let o=s.settleMs??this._getSettleMs(),n=`msg::${de(e)}::${de(r)}`,a=this._pendingTimers.get(n);a&&clearTimeout(a);let i=setTimeout(()=>{this._pendingTimers.delete(n),this.processAssistantMessage(e,{swipeId:r,sourceEvent:s.sourceEvent||"AUTO"}).catch(l=>{Ke.error("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:l})})},Math.max(0,o));this._pendingTimers.set(n,i),Ke.info("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:n,settleMs:o,sourceEvent:s.sourceEvent})}cancelAutomation(e={}){let r=e.reason||"manual_cancel",s=de(e.messageId),o=de(e.slotKey),n=de(e.traceId),a=0;for(let[i,l]of this._pendingTimers){let c=s&&i.includes(`::${s}::`),d=o&&i.includes(o);(c||d||!s&&!o&&!n)&&(clearTimeout(l),this._pendingTimers.delete(i),a+=1)}return a+=this._cancelActiveTransactions(r,{messageId:s,slotKey:o,traceId:n}),{success:a>0,cancelledCount:a,reason:r}}_isRecentlyProcessed(e){if(!e)return!1;this._pruneRecentSlots();let r=this._recentlyProcessedSlots.get(e);return r?Date.now()-r<this._getDedupeWindowMs():!1}_markSlotProcessed(e){e&&(this._recentlyProcessedSlots.set(e,Date.now()),this._pruneRecentSlots())}_pruneRecentSlots(){let e=Date.now()-this._getDedupeWindowMs();for(let[r,s]of this._recentlyProcessedSlots)(!Number.isFinite(s)||s<e)&&this._recentlyProcessedSlots.delete(r)}async _executeAutoTools(e,r,s,o,{slotKey:n,messageId:a,swipeId:i}){let l=[],c=!1,d=r.lastAiMessage,u=r.assistantBaseText;for(let y of e){let p={...r,signal:s.signal,isAutoRun:!0,abortMeta:{traceId:o.traceId,slotKey:n,sourceMessageId:r.sourceMessageId||a,sourceSwipeId:r.sourceSwipeId||i||""},shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:o.traceId}),skipNotify:!0,lastAiMessage:d,assistantBaseText:u,input:{...r.input||{},lastAiMessage:d,assistantBaseText:u}},f=At.shouldRunLocalTransform(y)?await Na(y,p):await At.runToolPostResponse(y,p);if(l.push(f),f?.writebackState||f?.output){c=!0,this._markOwnWrite(r.sourceMessageId||a);let h=this._readCurrentMessageText(r.sourceMessageId||a);if(h){d=h,u=h;let x=Number(r.sourceMessageId||a);Array.isArray(r.chatMessages)&&r.chatMessages[x]&&(r.chatMessages[x].content=h,r.chatMessages[x].mes=h)}}}return{results:l,hasWriteback:c}}async _executeAutoTableUpdate(e,r,s,{shouldRunTableAuto:o,tableWorkbenchConfig:n,messageId:a,swipeId:i,sourceEvent:l}){if(!o)return{tableResult:null,hasWriteback:!1};let c=await ig({messageId:e.sourceMessageId||a,swipeId:e.sourceSwipeId||i||"",sourceEvent:l,configInput:n,signal:r.signal,shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:s.traceId})}),d=!!(c?.state||c?.mirrorResult?.success===!0);return d&&this._markOwnWrite(e.sourceMessageId||a),{tableResult:c,hasWriteback:d}}_readCurrentMessageText(e){let r=Hr(),s=Yc(r),o=Number(e);if(!Number.isFinite(o)||o<0||o>=s.length)return"";let n=s[o];return String(n?.mes||n?.content||"").trim()}_markOwnWrite(e){let r=de(e);r&&(this._ownWriteMessageIds.set(r,Date.now()),this._pruneOwnWrites())}_isOwnWrite(e){let r=de(e);if(!r)return!1;this._pruneOwnWrites();let s=this._ownWriteMessageIds.get(r);return s?Date.now()-s<Kg:!1}_pruneOwnWrites(){let e=Date.now()-Kg;for(let[r,s]of this._ownWriteMessageIds)(!Number.isFinite(s)||s<e)&&this._ownWriteMessageIds.delete(r)}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),Ke.debug(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,r,s={}){return e.transition(zt.SKIPPED,{verdict:r,...s}),this._recordTransaction(e),Array.isArray(s?.tools)&&s.tools.length>0&&this._updateAutoRuntimeForSkip(s.tools,e,r,s),{success:!1,skipped:!0,reason:r,traceId:e.traceId,...s}}_enqueueSlot(e,r){let o=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(r).finally(()=>{this._slotQueues.get(e)===o&&this._slotQueues.delete(e)});return this._slotQueues.set(e,o),o}_registerActiveTransaction(e,r={}){e?.traceId&&this._activeTransactions.set(e.traceId,{traceId:e.traceId,generationKey:r.generationKey||e.generationKey||"",slotKey:r.slotKey||e.slotKey||"",sourceMessageId:r.sourceMessageId||e.sourceMessageId||"",sourceSwipeId:r.sourceSwipeId||e.sourceSwipeId||"",slotRevisionKey:r.slotRevisionKey||e.slotRevisionKey||"",assistantBaseFingerprint:r.assistantBaseFingerprint||"",assistantBaseText:r.assistantBaseText||"",controller:r.controller||null,cancelled:!1,cancelReason:""})}_unregisterActiveTransaction(e){e&&this._activeTransactions.delete(e)}_cancelActiveTransactions(e="manual_cancel",r={}){let s=de(r.messageId),o=de(r.slotKey),n=de(r.traceId),a=0;for(let[i,l]of this._activeTransactions){let c=n&&i===n,d=s&&de(l?.sourceMessageId)===s,u=o&&de(l?.slotKey)===o;if(!(!c&&!d&&!u&&!(!n&&!s&&!o))){l.cancelled=!0,l.cancelReason=e;try{l?.controller?.abort?.()}catch{}a+=1}}return a}_shouldAbortAutoWriteback(e={}){let r=de(e.traceId);if(r){let s=this._activeTransactions.get(r);if(!s||s.cancelled)return{aborted:!0,reason:"cancelled_before_host_commit"}}return!1}_updateAutoRuntimeForSkip(e,r,s,o={}){e.forEach(n=>{n?.id&&Lr(n.id,{lastAutoRunAt:Date.now(),lastAutoStatus:"skipped",lastAutoMessageId:r?.sourceMessageId||r?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||r?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||o?.slotRevisionKey||"",lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:!1,lastAutoSkipReason:s||""},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_updateAutoRuntimeForResults(e,r,s,o=[]){e.forEach((n,a)=>{if(!n?.id)return;let i=o[a]||{},l=i?.meta?.writebackDetails||{},c=i?.meta?.aborted===!0||i?.meta?.stale===!0?"aborted":i?.success===!1?"failed":"success",d=i?.meta?.aborted===!0?i?.meta?.abortReason||(i?.meta?.stale===!0?"stale_base_changed":"cancelled_before_host_commit"):"";Lr(n.id,{lastAutoRunAt:Date.now(),lastAutoStatus:c,lastAutoMessageId:r?.sourceMessageId||s?.sourceMessageId||s?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||s?.sourceSwipeId||s?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||s?.slotRevisionKey||"",lastAutoWritebackStatus:i?.meta?.writebackStatus||"",lastAutoRefreshConfirmed:!!l.refreshConfirmed,lastAutoSkipReason:d},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_resetForChatChange(){let e=Hr(),r=Bg(e);Ke.info("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:r}),this._currentChatId=r,this._pendingTimers.forEach(s=>clearTimeout(s)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("chat_changed"),this._activeTransactions.clear(),this._isProcessing=!1,this._messageReceivedThrottleUntil=0,this._seedKnownSlots()}_clearMessageState(e){if(e){for(let[r,s]of this._pendingTimers)(r.includes(`::${e}::`)||r.startsWith(`msg::${e}::`))&&(clearTimeout(s),this._pendingTimers.delete(r));for(let r of this._recentlyProcessedSlots.keys())r.startsWith(`${e}::`)&&this._recentlyProcessedSlots.delete(r);this._ownWriteMessageIds.delete(de(e)),this._seedKnownSlots()}}_getAutomationSettings(){let e=Lt.getSettings()?.automation||{},r=Number.isFinite(e.settleMs)?e.settleMs:GT;return{settleMs:r,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(5e3,r+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}},jg=new ei,VT=jg});var qg={};se(qg,{BUILTIN_REGEX_PRESETS:()=>ri,BUILTIN_WORLDBOOK_PRESETS:()=>Gc,MIGRATION_BACKUP_KEY:()=>Yg,MIGRATION_DONE_KEY:()=>ti,default:()=>ZT,ensurePresetSystem:()=>Gg,registerBuiltinPresets:()=>qc,runMigrationOnce:()=>Vc});function JT(t){if(!Array.isArray(t)||t.length===0)return null;let e=t.map(r=>String(r||"").trim()).filter(Boolean).sort().join("|");if(!e)return null;for(let r of ri)if(r.rules.filter(o=>o.type==="include"&&o.enabled!==!1).map(o=>o.value).sort().join("|")===e)return r.id;return null}function qc(){try{typeof al=="function"&&al(ri),typeof Di=="function"&&Di(Gc),Vr.info("\u5185\u7F6E\u9884\u8BBE\u5DF2\u6CE8\u518C",{regex:ri.length,worldbook:Gc.length})}catch(t){Vr.error("\u6CE8\u518C\u5185\u7F6E\u9884\u8BBE\u5931\u8D25",{error:t})}}function XT(t){let e=new Set,r=[];for(let s of Array.isArray(t)?t:[]){let o=String(s||"").trim();if(!(!o||e.has(o)))if(e.add(o),o.startsWith("regex:")){let n=o.slice(6).trim();n&&r.push({type:"regex_include",value:n,enabled:!0,name:"",description:""})}else r.push({type:"include",value:o,enabled:!0,name:"",description:""})}return r}function QT(t,e,r){let s=JSON.parse(JSON.stringify(r||{})),o=!1,n=s.extraction||{};if(!n.regexPresetId){let i=Array.isArray(n.selectors)?n.selectors:[];if(i.length>0){let l=JT(i);if(l)n.regexPresetId=l,o=!0,Vr.info(`\u5DE5\u5177 ${t} \u7ED1\u5B9A\u5185\u7F6E\u6B63\u5219\u9884\u8BBE: ${l}`);else{let c=ra({name:`${e||t}_\u8FC1\u79FB_\u6B63\u5219`,description:`\u81EA\u8001\u7248\u672C selectors \u81EA\u52A8\u8FC1\u79FB\uFF08${i.length} \u9879\uFF09`,rules:XT(i),blacklist:[]});c?.id&&(n.regexPresetId=c.id,o=!0,Vr.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u6B63\u5219\u9884\u8BBE: ${c.id}`))}s.extraction=n}}let a=s.worldbooks||{};if(!a.presetId&&a.enabled===!0&&Array.isArray(a.selected)&&a.selected.length>0){let i=Fn({name:`${e||t}_\u8FC1\u79FB_\u4E16\u754C\u4E66`,description:`\u81EA\u8001\u7248\u672C worldbooks.selected \u81EA\u52A8\u8FC1\u79FB\uFF08${a.selected.length} \u672C\uFF09`,bindingMode:"custom",includeDisabled:!1,bookList:a.selected.map(l=>({bookName:String(l||""),enabled:!0,entryOverrides:{}})).filter(l=>l.bookName)});i?.id&&(a.presetId=i.id,o=!0,Vr.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u4E16\u754C\u4E66\u9884\u8BBE: ${i.id}`)),s.worldbooks=a}return o?s:null}function Vc(){try{if(Se.get(ti)===!0)return{skipped:!0,reason:"already_done"};let t=D.get(Hg)||{};if(!t||typeof t!="object")return Vr.info("\u65E0\u5DE5\u5177\u914D\u7F6E\u9700\u8981\u8FC1\u79FB"),Se.set(ti,!0),{skipped:!0,reason:"no_configs"};Se.set(Yg,{ts:Date.now(),version:"v45",snapshot:t});let e=0,r={...t};for(let[s,o]of Object.entries(t)){if(!o||typeof o!="object")continue;let n=QT(s,o.name,o);n&&(r[s]=n,e+=1)}return e>0&&D.set(Hg,r),Se.set(ti,!0),Vr.info("\u8FC1\u79FB\u5B8C\u6210",{migratedCount:e,total:Object.keys(t).length}),{skipped:!1,migratedCount:e,total:Object.keys(t).length}}catch(t){return Vr.error("\u8FC1\u79FB\u5931\u8D25\uFF0C\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559",{error:t}),{skipped:!1,error:t?.message||String(t),aborted:!0}}}function Gg(){return qc(),Vc()}var Vr,ti,Yg,Hg,ri,Gc,ZT,Vg=N(()=>{Be();W();hs();Ks();Vr=I.createScope("PresetBootstrap"),ti="migration_v45_done",Yg="migration_v45_backup",Hg="tool_configs",ri=[{id:"builtin_regex_summary",name:"\u5185\u7F6E \xB7 \u603B\u7ED3\u63D0\u53D6",description:"\u63D0\u53D6 <boo_FM> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u8BB0\u5FC6\u538B\u7F29\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_summary_1",type:"include",value:"boo_FM",enabled:!0,name:"\u603B\u7ED3\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_status_block",name:"\u5185\u7F6E \xB7 \u72B6\u6001\u680F\u63D0\u53D6",description:"\u63D0\u53D6 <status_block> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u72B6\u6001\u680F\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_status_1",type:"include",value:"status_block",enabled:!0,name:"\u72B6\u6001\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_youyou",name:"\u5185\u7F6E \xB7 \u4F18\u4F18\u9510\u8BC4\u63D0\u53D6",description:"\u63D0\u53D6 <youyou> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u4F18\u4F18\u9510\u8BC4\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_youyou_1",type:"include",value:"youyou",enabled:!0,name:"\u4F18\u4F18\u6807\u7B7E",description:""}],blacklist:[]}],Gc=[];ZT={registerBuiltinPresets:qc,runMigrationOnce:Vc,ensurePresetSystem:Gg}});var Xc={};se(Xc,{confirmDeleteTool:()=>nS,confirmResetTools:()=>lS,getAllTools:()=>Xt,getTool:()=>Qt,showExportToolsDialog:()=>aS,showImportToolsDialog:()=>iS,showToolEditDialog:()=>oS});async function oS(t=null){let e=t?Qt(t):null,r=!!e,s=Xe({value:e?.name||"",placeholder:"\u5DE5\u5177\u540D\u79F0"}),o=qe({value:e?.category||"utility",options:sS}),n=Xe({value:e?.description||"",placeholder:"\u5DE5\u5177\u63CF\u8FF0"}),a=m("input",{className:"yyt-input",attrs:{type:"number",min:"1000"},style:{padding:"7px 10px",fontSize:"12px"}});a.value=String(e?.config?.execution?.timeout||6e4);let i=m("input",{className:"yyt-input",attrs:{type:"number",min:"0",max:"10"},style:{padding:"7px 10px",fontSize:"12px"}});i.value=String(e?.config?.execution?.retries??3);function l(p,g,f=""){let h=m("div",{className:"yyt-form-group",style:{margin:"0 0 12px 0"}});return h.appendChild(m("label",{text:p,style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))",display:"block",marginBottom:"4px"}})),h.appendChild(g),f&&h.appendChild(m("div",{text:f,style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginTop:"4px"}})),h}let c=m("div",{style:{display:"flex",flexDirection:"column"}}),d=m("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});d.appendChild(l("\u5DE5\u5177\u540D\u79F0",s.el)),d.appendChild(l("\u5206\u7C7B",o.el)),c.appendChild(d),c.appendChild(l("\u63CF\u8FF0",n.el));let u=m("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});u.appendChild(l("\u8D85\u65F6\u65F6\u95F4 (ms)",a)),u.appendChild(l("\u91CD\u8BD5\u6B21\u6570",i)),c.appendChild(u);let y=ke.custom({title:r?`\u7F16\u8F91\u5DE5\u5177\u300C${e.name}\u300D`:"\u65B0\u5EFA\u5DE5\u5177",width:"480px",body:c,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:p=>p(null)},{label:r?"\u4FDD\u5B58":"\u521B\u5EFA",variant:"primary",onClick:p=>{let g=String(s.get()||"").trim();if(!g){s.el.focus();return}let f=t||`tool_${Date.now()}`;if(!Ys(f,{name:g,category:o.get(),description:String(n.get()||"").trim(),promptTemplate:e?.promptTemplate||"",extractTags:Array.isArray(e?.extractTags)?e.extractTags:[],config:{execution:{timeout:Math.max(1e3,parseInt(a.value,10)||6e4),retries:Math.max(0,parseInt(i.value,10)||3)},api:e?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(e?.config?.messages)?e.config.messages:[],context:{depth:e?.config?.context?.depth||3,includeTags:Array.isArray(e?.config?.context?.includeTags)?e.config.context.includeTags:[],excludeTags:Array.isArray(e?.config?.context?.excludeTags)?e.config.context.excludeTags:[]},worldbooks:{enabled:e?.config?.worldbooks?.enabled===!0,selected:Array.isArray(e?.config?.worldbooks?.selected)?e.config.worldbooks.selected:[]}},enabled:e?.enabled!==!1})){Jc.warn("saveTool \u5931\u8D25",{id:f});return}try{Qs(f)}catch(x){Jc.warn("ensureToolRuntimeConfig \u5F02\u5E38",{err:x})}p(f)}}]});return setTimeout(()=>s.el.focus(),0),y.result}async function nS(t){let e=Qt(t);return!e||!await ke.confirm({title:"\u5220\u9664\u5DE5\u5177",message:`\u786E\u5B9A\u5220\u9664\u5DE5\u5177\u300C${e.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})?!1:Gs(t)}function aS(){let t;try{t=qs()}catch(r){ke.confirm({title:"\u5BFC\u51FA\u5931\u8D25",message:String(r?.message||r),confirmText:"\u786E\u5B9A"});return}let e=m("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});e.value=t,e.readOnly=!0,ke.custom({title:"\u5BFC\u51FA\u5DE5\u5177 JSON",width:"600px",body:e,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:r=>r(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(t)}catch{e.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let r=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(r),o=m("a",{attrs:{href:s,download:`youyou_tools_${Date.now()}.json`}});document.body.appendChild(o),o.click(),setTimeout(()=>{try{document.body.removeChild(o)}catch{}try{URL.revokeObjectURL(s)}catch{}},100)}catch(r){Jc.warn("\u4E0B\u8F7D\u5931\u8D25",{err:r})}}}]})}async function iS(){let t=m("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34 YouYou Toolkit \u5DE5\u5177 JSON"},style:{width:"100%",minHeight:"200px",fontSize:"12px",fontFamily:"monospace"}}),e=m("label",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"var(--yyt-text-secondary)",marginTop:"8px"}}),r=m("input",{attrs:{type:"checkbox"}});e.appendChild(r),e.appendChild(m("span",{text:"\u8986\u76D6\u6A21\u5F0F\uFF08\u6E05\u7A7A\u5DF2\u6709\u5DE5\u5177\u540E\u518D\u5BFC\u5165\uFF1B\u4E0D\u52FE\u9009\u5219\u5408\u5E76\uFF09"}));let s=m("div");s.appendChild(t),s.appendChild(e),s.appendChild(m("div",{style:{display:"flex",gap:"6px",marginTop:"8px"}},pe({label:"\u{1F4C1} \u4ECE\u6587\u4EF6\u2026",size:"small",variant:"ghost",onClick:()=>{let n=m("input",{attrs:{type:"file",accept:"application/json,.json"}});n.addEventListener("change",()=>{let a=n.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{t.value=String(i.result||""),t.focus()},i.readAsText(a)}),n.click()}}).el));let o=ke.custom({title:"\u5BFC\u5165\u5DE5\u5177 JSON",width:"520px",body:s,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:n=>n(null)},{label:"\u5BFC\u5165",variant:"primary",onClick:async n=>{let a=t.value.trim();if(!a){n(null);return}try{let i=Vs(a,{overwrite:r.checked});n(i)}catch(i){await ke.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(i?.message||i),confirmText:"\u786E\u5B9A"})}}}]});return setTimeout(()=>t.focus(),0),o.result}async function lS(){return await ke.confirm({title:"\u91CD\u7F6E\u6240\u6709\u5DE5\u5177",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u81EA\u5B9A\u4E49\u5DE5\u5177\u4E0E\u9884\u8BBE\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002\u5185\u7F6E\u5DE5\u5177\u4E0D\u53D7\u5F71\u54CD\u3002",confirmText:"\u91CD\u7F6E",danger:!0})?(Js(),!0):!1}var Jc,sS,Qc=N(()=>{Kn();ur();Ho();er();W();Jc=I.createScope("ToolActions"),sS=[{value:"api",label:"API"},{value:"prompt",label:"Prompt"},{value:"utility",label:"Utility"}]});W();function Jg(t,e={}){let{constants:r,topLevelWindow:s,modules:o}=t,{SCRIPT_ID:n,SCRIPT_VERSION:a,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=r,c=null,d=!1,u=I.createScope("Bootstrap");function y(...M){u.log(M.join(" "))}function p(...M){u.error(M.join(" "))}async function g(){return c||(c=(async()=>{try{o.storageModule=await Promise.resolve().then(()=>(Be(),rd)),o.apiConnectionModule=await Promise.resolve().then(()=>(Rn(),id)),o.presetManagerModule=await Promise.resolve().then(()=>(Do(),ud)),o.uiModule=await Promise.resolve().then(()=>(Og(),Lg)),o.regexExtractorModule=await Promise.resolve().then(()=>(Hs(),qi)),o.toolManagerModule=await Promise.resolve().then(()=>(Ho(),$u)),o.toolExecutorModule=await Promise.resolve().then(()=>(Zl(),Ql)),o.windowManagerModule=await Promise.resolve().then(()=>(vc(),ug)),o.toolRegistryModule=await Promise.resolve().then(()=>(er(),rl)),o.settingsServiceModule=await Promise.resolve().then(()=>(pn(),Iy)),o.bypassManagerModule=await Promise.resolve().then(()=>(bo(),ky)),o.variableResolverModule=await Promise.resolve().then(()=>(Ia(),$y)),o.contextInjectorModule=await Promise.resolve().then(()=>(As(),Ny)),o.toolPromptServiceModule=await Promise.resolve().then(()=>(Ra(),Oy)),o.toolOutputServiceModule=await Promise.resolve().then(()=>(yn(),zy)),o.toolAutomationServiceModule=await Promise.resolve().then(()=>(Wg(),Fg)),o.toolDataProviderModule=await Promise.resolve().then(()=>(lo(),Op)),o.presetBootstrapModule=await Promise.resolve().then(()=>(Vg(),qg));try{o.toolDataProviderModule.getToolDataProvider({extensionVersion:a}).then(M=>{u.log(`Provider \u5C31\u7EEA: ${M.kind}`)}).catch(M=>{u.error(`Provider \u521D\u59CB\u5316\u5F02\u5E38: ${M?.message||M}`)})}catch(M){u.error(`Provider \u542F\u52A8\u5F02\u5E38: ${M?.message||M}`)}return o.toolOutputServiceModule?.toolOutputService&&o.apiConnectionModule&&o.toolOutputServiceModule.toolOutputService.setApiConnection(o.apiConnectionModule),!0}catch(M){return c=null,p("\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:",M),p("\u5DF2\u52A0\u8F7D\u6A21\u5757:",Object.keys(o).filter(S=>o[S])),!1}})(),c)}function f(){return`
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
    `}async function h(){let M=`${n}-styles`,S=s.document||document;if(S.getElementById(M))return;let E="",G=[];try{G.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{G.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}G.push("./styles/main.css");for(let $ of[...new Set(G.filter(Boolean))])try{let A=await fetch($);if(A.ok){E=await A.text();break}}catch{}E||(y("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),E=f());let q=S.createElement("style");q.id=M,q.textContent=E,(S.head||S.documentElement).appendChild(q),y("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function x(){let M=s.document||document;if(o.uiModule?.getAllStyles){let S=`${n}-ui-styles`;if(!M.getElementById(S)){let E=M.createElement("style");E.id=S,E.textContent=o.uiModule.getAllStyles(),(M.head||M.documentElement).appendChild(E)}}}async function T(){try{let{applyUiPreferences:M}=await Promise.resolve().then(()=>(ic(),ac));if(o.settingsServiceModule?.settingsService){let S=o.settingsServiceModule.settingsService.getUiSettings();if(S&&S.theme){let E=s.document||document;M(S,E),y(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${S.theme}`)}}}catch(M){y("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",M)}}function v(){let M=s.jQuery||window.jQuery;if(!M){p("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(v,1e3);return}let S=s.document||document,E=M("#extensionsMenu",S);if(!E.length){y("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(v,2e3);return}if(M(`#${l}`,E).length>0){y("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let q=M(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),$=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,A=M($);A.on("click",function(U){U.stopPropagation(),y("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let ee=M("#extensionsMenuButton",S);ee.length&&E.is(":visible")&&ee.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),q.append(A),E.append(q),y("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function z(){y(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await h();let M=await g();if(y(M?"\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F":"\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u53EF\u7528\u529F\u80FD"),!d&&o.uiModule?.initUI)try{await o.uiModule.initUI({services:o,autoInjectStyles:!1,targetDocument:s.document||document}),d=!0,y("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(E){p("UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:",E)}if(o.uiModule&&(x(),await T()),o.presetBootstrapModule?.ensurePresetSystem)try{let E=o.presetBootstrapModule.ensurePresetSystem();E?.aborted?y(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5931\u8D25\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559: ${E.error}`):E?.skipped?y(`\u9884\u8BBE\u7CFB\u7EDF\u5DF2\u5C31\u7EEA\uFF08${E.reason}\uFF09`):y(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5B8C\u6210\uFF08${E.migratedCount}/${E.total} \u5DE5\u5177\uFF09`)}catch(E){p("\u9884\u8BBE\u7CFB\u7EDF\u521D\u59CB\u5316\u5F02\u5E38:",E)}if(o.toolAutomationServiceModule?.toolAutomationService){let E=o.toolAutomationServiceModule.toolAutomationService.init();y(E?"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316":"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u521D\u59CB\u5316\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u5BBF\u4E3B\u4E8B\u4EF6\u6E90\u91CD\u8BD5")}let S=s.document||document;S.readyState==="loading"?S.addEventListener("DOMContentLoaded",()=>{setTimeout(v,1e3)}):setTimeout(v,1e3),y("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:g,injectStyles:h,addMenuItem:v,init:z,log:y,logError:p}}Ye();Ge();Ge();W();var Eo=I.createScope("PromptEditor"),eS="youyou_toolkit_prompt_editor",tS={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},rS={system:"fa-server",ai:"fa-robot",user:"fa-user"},An=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],si=class{constructor(e={}){this.containerId=e.containerId||eS,this.segments=e.segments||[...An],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){Eo.error("jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...An],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let r=tS[e.type]||e.type,s=rS[e.type]||"fa-file",o=e.mainSlot==="A"||e.isMain,n=e.mainSlot==="B"||e.isMain2,a=o?"var(--yyt-accent, #7bb7ff)":n?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
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
    `}bindEvents(){this.$container&&(it(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"),this.$container.on("click.yytPromptEditor",".yyt-prompt-toggle",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.on("click.yytPromptEditor",".yyt-prompt-delete",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(r)}),this.$container.on("change.yytPromptEditor",".yyt-prompt-role",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),s=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{role:s})}),this.$container.on("change.yytPromptEditor",".yyt-prompt-main-slot",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),s=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{mainSlot:s})}),this.$container.on("input.yytPromptEditor",".yyt-prompt-textarea",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-add-segment`,()=>{this.addSegment()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-import-prompt`,()=>{this.importPrompt()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-export-prompt`,()=>{this.exportPrompt()}),Mt(this.$container,{namespace:"yytPromptEditorSelect",selectors:[".yyt-prompt-role",".yyt-prompt-main-slot"]}))}addSegment(e=null){let r=`segment_${Date.now()}`,s=e||{id:r,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};s.id||(s.id=r),this.segments.push(s),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let r=this.segments.findIndex(o=>o.id===e);if(r===-1)return;if(this.segments[r].deletable===!1){Eo.warn("\u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(r,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,r){let s=this.segments.find(o=>o.id===e);s&&(Object.assign(s,r),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=r=>{let s=r.target.files[0];if(!s)return;let o=new FileReader;o.onload=n=>{try{let a=JSON.parse(n.target.result);Array.isArray(a)?(this.setSegments(a),Eo.log("\u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):Eo.error("\u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){Eo.error("\u5BFC\u5165\u5931\u8D25:",a)}},o.readAsText(s)},e.click()}exportPrompt(){let e=this.getSegments(),r=JSON.stringify(e,null,2),s=new Blob([r],{type:"application/json"}),o=URL.createObjectURL(s),n=document.createElement("a");n.href=o,n.download=`prompt_group_${Date.now()}.json`,n.click(),URL.revokeObjectURL(o),Eo.log("\u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}destroy(){this.$container&&(it(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"))}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};function Xg(){return`
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
  `}function Qg(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function Zg(t){return Array.isArray(t)?t.map((e,r)=>({id:`segment_${r}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...An]}W();function em(t){let{constants:e,topLevelWindow:r,modules:s,caches:o,uiState:n}=t,{SCRIPT_ID:a,SCRIPT_VERSION:i,POPUP_ID:l}=e,c=I.createScope("PopupShell"),d={cleanup:null},u={cleanups:[]},y={cleanups:[]},p={current:null};function g(){return!!n.sidebarCollapsed}function f(){n.sidebarCollapsed=!n.sidebarCollapsed;let b=n.currentPopup;if(!b)return;let w=b.querySelector(".yyt-shell-sidebar"),k=b.querySelector(".yyt-shell-workspace"),R=b.querySelector(".yyt-sidebar-toggle i");w&&w.classList.toggle("yyt-collapsed",n.sidebarCollapsed),k&&k.classList.toggle("yyt-sidebar-collapsed",n.sidebarCollapsed),R&&(R.className=n.sidebarCollapsed?"fa-solid fa-angles-right":"fa-solid fa-angles-left"),Ue()}function h(...b){c.log(b.join(" "))}function x(...b){c.error(b.join(" "))}function T(b){return typeof b!="string"?"":b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function v(){return r.jQuery||window.jQuery}function z(){return r.document||document}function M(b){if(!b)return"\u672A\u9009\u62E9\u9875\u9762";let w=s.toolRegistryModule?.getToolConfig(b);if(!w)return b;if(!w.hasSubTabs)return w.name||b;let k=E(b),R=w.subTabs?.find(L=>L.id===k);return R?.name?`${w.name} / ${R.name}`:w.name||b}function S(b){if(!b)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let w=s.toolRegistryModule?.getToolConfig(b);if(!w)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!w.hasSubTabs)return w.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let k=E(b);return w.subTabs?.find(L=>L.id===k)?.description||w.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function E(b,w=""){let k=s.toolRegistryModule?.getToolConfig(b);if(!k?.hasSubTabs||!Array.isArray(k.subTabs)||k.subTabs.length===0)return"";let R=String(w||n.currentSubTab[b]||"").trim(),B=R&&k.subTabs.some(te=>te?.id===R)?R:k.subTabs[0]?.id||"";return B&&n.currentSubTab[b]!==B&&(n.currentSubTab[b]=B),B}function G(){let b=n.currentPopup;if(!b)return;let w=M(n.currentMainTab),k=S(n.currentMainTab),R=b.querySelector(".yyt-popup-active-label");R&&(R.textContent=`\u5F53\u524D\uFF1A${w}`);let L=b.querySelector(".yyt-shell-breadcrumb");L&&(L.textContent=w);let B=b.querySelector(".yyt-shell-main-title");B&&(B.textContent=w);let te=b.querySelector(".yyt-shell-main-description");te&&(te.textContent=k)}function q(){typeof d.cleanup=="function"&&(d.cleanup(),d.cleanup=null)}function $(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(b=>{typeof b=="function"&&b()}),u.cleanups=[])}function A(){Array.isArray(y.cleanups)&&(y.cleanups.forEach(b=>{typeof b=="function"&&b()}),y.cleanups=[])}function J(b,w){if(!b||!w)return!1;let k=b.jquery?b[0]:b,R=w.jquery?w[0]:w;return!!(k&&R&&k===R)}function U(b={}){let{container:w=null}=b,k=p.current;if(k&&!(w&&!J(k.container,w))){try{typeof k.destroy=="function"&&k.destroy(k.container)}catch(R){x("\u9500\u6BC1\u52A8\u6001\u9762\u677F host \u5931\u8D25",R)}s.uiModule?.uiManager?.destroyContainerInstance&&s.uiModule.uiManager.destroyContainerInstance(k.container),p.current=null}}function ee(b,w={}){p.current={key:w.key||"",container:b,destroy:typeof w.destroy=="function"?w.destroy:null}}function ye(){let b=v();if(!b||!n.currentPopup)return;let w=s.toolRegistryModule?.getToolList()||[],k=b(n.currentPopup).find(".yyt-main-nav");if(!k.length)return;let R=w.map(B=>`
      <div class="yyt-main-nav-item ${B.id===n.currentMainTab?"active":""}" data-tab="${B.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${T(B.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${T(B.name||B.id)}</span>
          <span class="yyt-main-nav-desc">${T(B.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");k.html(R),b(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let te=b(this).data("tab");te&&Jr(te)});let L=b(n.currentPopup).find(".yyt-shell-sidebar-hint");L.length&&L.text(`${w.length} tabs`)}function Te(){let b=v();if(!b||!n.currentPopup)return;let w=s.toolRegistryModule?.getToolList()||[],k=s.toolRegistryModule?.getToolConfig("tools"),R=Array.isArray(k?.subTabs)?k.subTabs:[],L=R.filter(re=>re?.isCustom).length,B=R.filter(re=>!re?.isCustom).length,V=b(n.currentPopup).find(".yyt-shell-sidebar-stats");V.length&&(V.find(".yyt-shell-sidebar-stat").eq(0).find(".yyt-shell-sidebar-stat-value").text(String(w.length)),V.find(".yyt-shell-sidebar-stat").eq(1).find(".yyt-shell-sidebar-stat-value").text(String(B)),V.find(".yyt-shell-sidebar-stat").eq(2).find(".yyt-shell-sidebar-stat-value").text(String(L)))}function ue(){let b=s.toolRegistryModule?.getToolList()||[];return b.length?(b.some(w=>w.id===n.currentMainTab)||(n.currentMainTab=b[0].id),n.currentMainTab):null}async function Ze(b={}){let{rebuildNavigation:w=!1,reRenderSubNav:k=!1}=b,R=v();if(!R||!n.currentPopup)return;U();let L=ue();if(!L)return;w&&(ye(),Te());let B=s.toolRegistryModule?.getToolConfig(L),te=!!B?.hasSubTabs,V=R(n.currentPopup).find(".yyt-sub-nav"),re=R(n.currentPopup).find(".yyt-content-inner");if(w&&re.length){let we=new Set(re.find(".yyt-tab-content").map((fe,et)=>R(et).data("tab")).get());(s.toolRegistryModule?.getToolList()||[]).forEach(fe=>{we.has(fe.id)||re.append(`<div class="yyt-tab-content" data-tab="${T(fe.id)}"></div>`)}),re.find(".yyt-tab-content").each((fe,et)=>{let It=R(et).data("tab");(s.toolRegistryModule?.getToolList()||[]).some(Gt=>Gt.id===It)||R(et).remove()})}R(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),R(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${L}"]`).addClass("active"),R(n.currentPopup).find(".yyt-tab-content").removeClass("active"),R(n.currentPopup).find(`.yyt-tab-content[data-tab="${L}"]`).addClass("active"),te?(V.show(),(k||w)&&Ls(L,B.subTabs)):V.hide(),await Xr(L),G(),Ue()}function Ve(){if(!n.currentPopup)return;$();let b=()=>{if(n.currentMainTab==="presetManagement"){Ze();return}n.currentMainTab==="tools"&&Ze({reRenderSubNav:!0})},w=()=>{n.currentMainTab==="tools"?Ze({rebuildNavigation:!0,reRenderSubNav:!0}):Te()},k=()=>{n.currentMainTab==="tools"&&Ze({rebuildNavigation:!1,reRenderSubNav:!1})},R=()=>{(n.currentMainTab==="bypass"||n.currentMainTab==="tools")&&Ze({reRenderSubNav:n.currentMainTab==="tools"})};[O.PRESET_CREATED,O.PRESET_UPDATED,O.PRESET_DELETED].forEach(L=>{u.cleanups.push(K.on(L,b))}),[O.TOOL_REGISTERED,O.TOOL_UPDATED,O.TOOL_UNREGISTERED].forEach(L=>{u.cleanups.push(K.on(L,w))}),u.cleanups.push(K.on(O.TOOL_RUNTIME_UPDATED,k)),[O.BYPASS_PRESET_CREATED,O.BYPASS_PRESET_UPDATED,O.BYPASS_PRESET_DELETED].forEach(L=>{u.cleanups.push(K.on(L,R))})}function j(b){return!!b?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown",".yyt-select-portal-layer"].join(","))}function le(b){let w=b?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return w?w.scrollHeight>w.clientHeight+2||w.scrollWidth>w.clientWidth+2:!1}function $e(b,w){return w?.closest?.(".yyt-scrollable-surface")===b}function kt(b,w){if(!b||!w)return null;let k=w.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return k&&(k.classList?.contains("yyt-select-portal-layer")||b.contains(k))&&(k.scrollHeight>k.clientHeight+2||k.scrollWidth>k.clientWidth+2)?k:[w.closest?.(".yyt-tool-list"),w.closest?.(".yyt-settings-content"),w.closest?.(".yyt-sub-content"),w.closest?.(".yyt-tab-content.active"),b].filter(Boolean).find(L=>L!==b&&!b.contains(L)?!1:L.scrollHeight>L.clientHeight+2||L.scrollWidth>L.clientWidth+2)||b}function He({mainTab:b=null,includeSubContent:w=!1}={}){let k=n.currentPopup;if(!k)return;let R=k.querySelector(".yyt-content");R&&(R.scrollTop=0,R.scrollLeft=0);let L=b?`.yyt-tab-content[data-tab="${b}"]`:".yyt-tab-content.active",B=k.querySelector(L);if(B&&(B.scrollTop=0,B.scrollLeft=0),!w)return;(B?.querySelectorAll(".yyt-sub-content")||[]).forEach(V=>{V.scrollTop=0,V.scrollLeft=0})}function lr(b){let w=z();if(!b||!w)return;b.classList.add("yyt-scrollable-surface");let k=!1,R=!1,L=0,B=0,te=0,V=0,re=!1,we=!1,fe=()=>{k=!1,R=!1,b.classList.remove("yyt-scroll-dragging")},et=H=>{H.button===0&&(j(H.target)||$e(b,H.target)&&(re=b.scrollWidth>b.clientWidth+2,we=b.scrollHeight>b.clientHeight+2,!(!re&&!we)&&(H.stopPropagation(),k=!0,R=!1,L=H.clientX,B=H.clientY,te=b.scrollLeft,V=b.scrollTop)))},It=H=>{if(!k)return;let at=H.clientX-L,Je=H.clientY-B;!(Math.abs(at)>4||Math.abs(Je)>4)&&!R||(R=!0,b.classList.add("yyt-scroll-dragging"),re&&(b.scrollLeft=te-at),we&&(b.scrollTop=V-Je),H.preventDefault())},Gt=()=>{fe()},Cr=H=>{if(H.ctrlKey||le(H.target)||!b.classList.contains("yyt-content")&&!$e(b,H.target))return;let Je=kt(b,H.target);!Je||Je!==b&&!b.contains(Je)||!(Je.scrollHeight>Je.clientHeight+2||Je.scrollWidth>Je.clientWidth+2)||(Math.abs(H.deltaY)>0&&(Je.scrollTop+=H.deltaY),Math.abs(H.deltaX)>0&&(Je.scrollLeft+=H.deltaX),H.preventDefault(),H.stopPropagation())},tt=H=>{R&&H.preventDefault()};b.addEventListener("mousedown",et),b.addEventListener("wheel",Cr,{passive:!1}),b.addEventListener("dragstart",tt),w.addEventListener("mousemove",It),w.addEventListener("mouseup",Gt),y.cleanups.push(()=>{fe(),b.classList.remove("yyt-scrollable-surface"),b.removeEventListener("mousedown",et),b.removeEventListener("wheel",Cr),b.removeEventListener("dragstart",tt),w.removeEventListener("mousemove",It),w.removeEventListener("mouseup",Gt)})}function Ue(){let b=n.currentPopup;if(!b)return;A();let w=[...b.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...b.querySelectorAll(".yyt-sub-nav"),...b.querySelectorAll(".yyt-content"),...b.querySelectorAll(".yyt-settings-content"),...b.querySelectorAll(".yyt-tool-list")];[...new Set(w)].forEach(lr)}function Ao(b){return`
      <div class="yyt-startup-screen" data-yyt-startup-screen>
        <div class="yyt-startup-screen-inner">
          <div class="yyt-startup-screen-kicker">Welcome</div>
          <div class="yyt-startup-screen-title">YouYou \u5DE5\u5177\u7BB1</div>
          <div class="yyt-startup-screen-desc">\u96C6\u4E2D\u7BA1\u7406 API \u9884\u8BBE\u3001\u81EA\u5B9A\u4E49\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001Ai\u6307\u4EE4\u9884\u8BBE\u4E0E\u8BCA\u65AD\u6D41\u7A0B\u3002\u6BCF\u6B21\u5237\u65B0\u540E\u90FD\u4F1A\u91CD\u65B0\u663E\u793A\uFF0C\u4FBF\u4E8E\u5FEB\u901F\u56DE\u5230\u4ECB\u7ECD\u5165\u53E3\u3002</div>
          <div class="yyt-startup-screen-modules">
            ${(b||[]).slice(0,6).map(k=>`
      <div class="yyt-startup-module-chip">
        <i class="fa-solid ${T(k.icon||"fa-file")}"></i>
        <span>${T(k.name||k.id)}</span>
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
    `}function Co(b){let w=v();if(!w||!n.currentPopup||n.startupScreenDismissed)return;let k=w(n.currentPopup).find(".yyt-popup-body"),R=k.find(".yyt-popup-shell");!k.length||!R.length||k.find("[data-yyt-startup-screen]").length||(R.attr("data-yyt-startup-visible","true"),k.prepend(Ao(b)),k.find(".yyt-startup-enter").on("click",()=>{k.find("[data-yyt-startup-screen]").remove(),R.removeAttr("data-yyt-startup-visible"),n.startupScreenDismissed=!0,Ue()}))}function Er(){let b=z(),w=n.currentPopup,k=w?.querySelector(".yyt-popup-header");if(!w||!k||!b)return;let R=!1,L=0,B=0,te=0,V=0,re="",we=()=>({width:r.innerWidth||b.documentElement?.clientWidth||window.innerWidth||0,height:r.innerHeight||b.documentElement?.clientHeight||window.innerHeight||0}),fe=(tt,H,at)=>Math.min(Math.max(tt,H),at),et=()=>{R&&(R=!1,w.classList.remove("yyt-popup-dragging"),b.body.style.userSelect=re)},It=tt=>{if(!R||!n.currentPopup)return;let H=tt.clientX-L,at=tt.clientY-B,{width:Je,height:ai}=we(),ym=w.offsetWidth||0,fm=w.offsetHeight||0,gm=Math.max(0,Je-ym),mm=Math.max(0,ai-fm);w.style.left=`${fe(te+H,0,gm)}px`,w.style.top=`${fe(V+at,0,mm)}px`,w.style.transform="none",w.style.right="auto",w.style.bottom="auto"},Gt=()=>{et()},Cr=tt=>{if(tt.button!==0||tt.target?.closest(".yyt-popup-close"))return;R=!0,L=tt.clientX,B=tt.clientY;let H=w.getBoundingClientRect();te=H.left,V=H.top,w.style.left=`${H.left}px`,w.style.top=`${H.top}px`,w.style.transform="none",w.style.right="auto",w.style.bottom="auto",w.classList.add("yyt-popup-dragging"),re=b.body.style.userSelect||"",b.body.style.userSelect="none",tt.preventDefault()};k.addEventListener("mousedown",Cr),b.addEventListener("mousemove",It),b.addEventListener("mouseup",Gt),d.cleanup=()=>{et(),k.removeEventListener("mousedown",Cr),b.removeEventListener("mousemove",It),b.removeEventListener("mouseup",Gt)}}function Ar(){U(),q(),$(),A();let b=v();if(b&&n.currentPopup){let w=b(n.currentPopup);it(w,"yytPopupToolConfigSelect"),it(w,"yytPromptEditorSelect")}n.currentPopup&&(n.currentPopup.remove(),n.currentPopup=null),n.currentOverlay&&(n.currentOverlay.remove(),n.currentOverlay=null),h("\u5F39\u7A97\u5DF2\u5173\u95ED")}function Jr(b){U(),n.currentMainTab=b;let w=v();if(!w||!n.currentPopup)return;He({mainTab:b,includeSubContent:!0}),w(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),w(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${b}"]`).addClass("active");let k=s.toolRegistryModule?.getToolConfig(b);k?.hasSubTabs?(w(n.currentPopup).find(".yyt-sub-nav").show(),Ls(b,k.subTabs)):w(n.currentPopup).find(".yyt-sub-nav").hide(),w(n.currentPopup).find(".yyt-tab-content").removeClass("active"),w(n.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`).addClass("active"),Xr(b),G(),Ue()}function $s(b,w){U(),n.currentSubTab[b]=w;let k=v();!k||!n.currentPopup||(He({mainTab:b,includeSubContent:!0}),k(n.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),k(n.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${w}"]`).addClass("active"),Qr(b,w),G(),Ue())}function Ls(b,w){let k=v();if(!k||!n.currentPopup||!w)return;let R=E(b,n.currentSubTab[b]||w[0]?.id),B=(b==="tools"?[{key:"ai",title:"AI \u5DE5\u5177",items:w.filter(V=>!V?.isCustom&&(V?.toolKind||"ai")!=="script")},{key:"script",title:"\u811A\u672C\u5DE5\u5177",items:w.filter(V=>!V?.isCustom&&V?.toolKind==="script")},{key:"custom",title:"\u81EA\u5B9A\u4E49\u5DE5\u5177",items:w.filter(V=>V?.isCustom===!0)}].filter(V=>V.items.length>0):[{key:"default",title:"",items:w}]).map(V=>{let re=V.title?`<div class="yyt-sub-nav-group-title">${T(V.title)}</div>`:"",we=V.items.map(fe=>{let et=fe?.isCustom===!0,It=b==="tools"&&et?`<div class="yyt-sub-nav-item-actions">
               <button type="button" class="yyt-sub-nav-item-action" data-action="edit" data-subtab="${fe.id}" title="\u7F16\u8F91"><i class="fa-solid fa-pen"></i></button>
               <button type="button" class="yyt-sub-nav-item-action" data-action="delete" data-subtab="${fe.id}" title="\u5220\u9664"><i class="fa-solid fa-trash"></i></button>
             </div>`:"";return`
        <div class="yyt-sub-nav-item ${fe.id===R?"active":""}" data-subtab="${fe.id}" data-tool-name="${T((fe.name||fe.id).toLowerCase())}">
          <i class="fa-solid ${fe.icon||"fa-file"}"></i>
          <span class="yyt-sub-nav-item-label">${T(fe.name||fe.id)}</span>
          ${It}
        </div>
      `}).join("");return`
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${V.key}">
          ${re}
          <div class="yyt-sub-nav-group-items">
            ${we}
          </div>
        </div>
      `}).join(""),te=b==="tools"?`<div class="yyt-sub-nav-toolbar">
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="add" title="\u65B0\u5EFA\u81EA\u5B9A\u4E49\u5DE5\u5177"><i class="fa-solid fa-plus"></i><span>\u65B0\u5EFA</span></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="import" title="\u4ECE JSON \u5BFC\u5165\u5DE5\u5177"><i class="fa-solid fa-file-import"></i></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="export" title="\u5BFC\u51FA\u5DE5\u5177 JSON"><i class="fa-solid fa-file-export"></i></button>
         </div>
         <div class="yyt-sub-nav-filter-wrap">
           <input type="text" class="yyt-sub-nav-filter" placeholder="\u7B5B\u9009\u5DE5\u5177\u2026" autocomplete="off">
         </div>`:"";k(n.currentPopup).find(".yyt-sub-nav").html(te+B),k(n.currentPopup).find(".yyt-sub-nav-item").on("click",function(re){if(re.target.closest&&re.target.closest(".yyt-sub-nav-item-action"))return;let we=k(this).data("subtab");$s(b,we)}),b==="tools"&&Io(b),Ue()}function ko(b){if(!n.currentPopup)return;let w=v();if(!w)return;let k=String(b||"").trim().toLowerCase();w(n.currentPopup).find(".yyt-sub-nav-item").each(function(){let L=String(w(this).data("tool-name")||"");w(this).toggle(!k||L.includes(k))}),w(n.currentPopup).find(".yyt-sub-nav-group").each(function(){let L=w(this).find(".yyt-sub-nav-item:visible").length>0;w(this).toggle(L)})}function Io(b){let w=v();if(!w||!n.currentPopup)return;let k=w(n.currentPopup).find(".yyt-sub-nav");k.find(".yyt-sub-nav-filter").off("input.yytFilter").on("input.yytFilter",function(){ko(this.value)}),k.find(".yyt-sub-nav-toolbar-btn").off("click.yytToolAction").on("click.yytToolAction",async function(R){R.preventDefault(),R.stopPropagation();let L=w(this).data("tool-action");try{let B=await Promise.resolve().then(()=>(Qc(),Xc));if(L==="add"){let te=await B.showToolEditDialog(null);te&&(n.currentSubTab[b]=te,$s(b,te))}else L==="import"?await B.showImportToolsDialog():L==="export"&&B.showExportToolsDialog()}catch(B){x("\u5DE5\u5177\u64CD\u4F5C\u5931\u8D25",B)}}),k.find(".yyt-sub-nav-item-action").off("click.yytItemAction").on("click.yytItemAction",async function(R){R.preventDefault(),R.stopPropagation();let L=w(this).data("action"),B=String(w(this).data("subtab")||"");if(B)try{let te=await Promise.resolve().then(()=>(Qc(),Xc));L==="edit"?await te.showToolEditDialog(B):L==="delete"&&await te.confirmDeleteTool(B)&&n.currentSubTab[b]===B&&(n.currentSubTab[b]="")}catch(te){x("\u5DE5\u5177\u884C\u5185\u64CD\u4F5C\u5931\u8D25",te)}})}async function Xr(b){let w=v();if(!w||!n.currentPopup)return;let k=w(n.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`);if(!k.length)return;if(s.toolRegistryModule?.getToolConfig(b)?.hasSubTabs){let B=E(b);B?await Qr(b,B):k.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5B50 tab \u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>'),Ue();return}await s.uiModule?.renderMainTab?.(b,k)||sm(b,k),Ue()}async function Qr(b,w){let k=v();if(!k||!n.currentPopup)return;let R=k(n.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`);if(!R.length)return;let L=s.toolRegistryModule?.getToolConfig(b);if(L?.hasSubTabs){let te=E(b,w),V=L.subTabs?.find(et=>et.id===te),re=R.find(".yyt-sub-content");if(re.length||(R.html('<div class="yyt-sub-content"></div>'),re=R.find(".yyt-sub-content")),!V){re.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5F53\u524D\u5B50\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u5931\u6548</span></div>'),He({mainTab:b,includeSubContent:!0}),Ue();return}let we=V.component;if(we==="GenericToolConfigPanel"){await Zr(V,re),He({mainTab:b,includeSubContent:!0}),Ue();return}U({container:re});let fe=await s.uiModule?.renderSubTabComponent?.(we,re);fe?ee(re,{key:fe}):re.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>'),He({mainTab:b,includeSubContent:!0}),Ue();return}let B=R.find(".yyt-sub-content");if(B.length){switch(U({container:B}),w){case"config":om(b,B);break;case"prompts":await nm(b,B);break;case"presets":am(b,B);break;default:B.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}He({mainTab:b,includeSubContent:!0}),Ue()}}async function Zr(b,w){if(!(!v()||!w?.length||!b?.id)){U({container:w});try{let R=o.dynamicToolPanelCache.get(b.id);if(!R){let te=(await Promise.resolve().then(()=>(To(),Gy)))?.createToolConfigPanel;if(typeof te!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");R=()=>te({id:`${b.id}Panel`,toolId:b.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${b.name||b.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${b.id}-extraction-preview`,previewTitle:`${b.name||b.id} \u63D0\u53D6\u9884\u89C8`}),o.dynamicToolPanelCache.set(b.id,R)}let L=R();L.renderTo(w),ee(w,{key:b.id,destroy:typeof L?.destroy=="function"?B=>L.destroy(B):null}),Ue()}catch(R){p.current=null,x("\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:",R),w.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}}function sm(b,w){if(!v())return;let R=s.toolRegistryModule?.getToolConfig(b);if(!R){w.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let L=n.currentSubTab[b]||R.subTabs?.[0]?.id||"config";w.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${L}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),Qr(b,L)}function om(b,w){if(!v())return;let R=s.toolManagerModule?.getTool(b),L=s.presetManagerModule?.getAllPresets()||[],B=s.toolRegistryModule?.getToolApiPreset(b)||"",te=L.map(V=>`<option value="${T(V.name)}" ${V.name===B?"selected":""}>${T(V.name)}</option>`).join("");w.html(`
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
              ${te}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${R?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${R?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),Mt(w,{namespace:"yytPopupToolConfigSelect",selectors:["#yyt-tool-api-preset"]}),w.find("#yyt-save-tool-preset").on("click",function(){let re=w.find("#yyt-tool-api-preset").val();s.toolRegistryModule?.setToolApiPreset(b,re);let we=r.toastr;we&&we.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function nm(b,w){if(!v()){w.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let L=s.toolManagerModule?.getTool(b)?.config?.messages||[],B=Zg(L)||An,te=new si({containerId:`yyt-prompt-editor-${b}`,segments:B,onChange:re=>{let we=Qg(re);h("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",we.length,"\u6761\u6D88\u606F")}});w.html(`<div id="yyt-prompt-editor-${b}" class="yyt-prompt-editor-container"></div>`),te.init(w.find(`#yyt-prompt-editor-${b}`));let V=Xg();if(V){let re="yyt-prompt-editor-styles",we=r.document||document;if(!we.getElementById(re)){let fe=we.createElement("style");fe.id=re,fe.textContent=V,(we.head||we.documentElement).appendChild(fe)}}}function am(b,w){v()&&w.html(`
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
    `)}function im(){return`
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
      </div>`}function lm(b,w,k){let R=g(),L=b.map(B=>`
      <div class="yyt-main-nav-item ${B.id===n.currentMainTab?"active":""}" data-tab="${B.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${T(B.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${T(B.name||B.id)}</span>
          <span class="yyt-main-nav-desc">${T(B.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");return`
      <aside class="yyt-shell-sidebar${R?" yyt-collapsed":""}">
        <div class="yyt-shell-sidebar-card">
          <div class="yyt-shell-sidebar-title-row">
            <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
            <span class="yyt-shell-sidebar-hint">${b.length} tabs</span>
            <button class="yyt-sidebar-toggle" title="${R?"\u5C55\u5F00\u4FA7\u680F":"\u6298\u53E0\u4FA7\u680F"}">
              <i class="fa-solid ${R?"fa-angles-right":"fa-angles-left"}"></i>
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
      </aside>`}function cm(b,w){return`
      <div class="yyt-shell-main-header">
        <div class="yyt-shell-main-heading-block">
          <div class="yyt-shell-main-title">${T(b)}</div>
          <div class="yyt-shell-main-description">${T(w)}</div>
        </div>
        <div class="yyt-shell-main-actions">
          <div class="yyt-shell-main-meta">
            <i class="fa-solid fa-circle-info"></i>
            <span>\u4FDD\u5B58\u540E\u6267\u884C\u94FE\u4F1A\u7ACB\u5373\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
          </div>
        </div>
      </div>`}function dm(b,w){return b.map(k=>`
      <div class="yyt-tab-content ${k.id===w?"active":""}" data-tab="${k.id}">
      </div>
    `).join("")}function um(b){return`
      <div class="yyt-popup-footer">
        <div class="yyt-popup-footer-left">
          <div class="yyt-popup-status-cluster">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${T(b)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
            </div>
          </div>
        </div>
      </div>`}async function pm(){if(n.currentPopup){h("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let b=t?.services?.loadModules;typeof b=="function"&&await b();let w=v(),k=z();if(!w){x("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let R=s.toolRegistryModule?.getToolList()||[];if(!R.length){x("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}R.some(H=>H.id===n.currentMainTab)||(n.currentMainTab=R[0].id);let L=s.toolRegistryModule?.getToolConfig("tools"),B=Array.isArray(L?.subTabs)?L.subTabs:[],te=B.filter(H=>H?.isCustom).length,V=B.filter(H=>!H?.isCustom).length,re=M(n.currentMainTab),we=S(n.currentMainTab);n.currentOverlay=k.createElement("div"),n.currentOverlay.className="yyt-popup-overlay",n.currentOverlay.addEventListener("click",H=>{H.target===n.currentOverlay&&Ar()}),k.body.appendChild(n.currentOverlay);let fe=g(),et=`
      <div class="yyt-popup" id="${l}">
        ${im()}
        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-workspace${fe?" yyt-sidebar-collapsed":""}">
              ${lm(R,V,te)}
              <section class="yyt-shell-main">
                ${cm(re,we)}
                <div class="yyt-sub-nav" style="display: none;"></div>
                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${dm(R,n.currentMainTab)}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        ${um(re)}
      </div>
    `,It=k.createElement("div");It.innerHTML=et,n.currentPopup=It.firstElementChild,k.body.appendChild(n.currentPopup),w(n.currentPopup).find(".yyt-popup-close").on("click",Ar),w(n.currentPopup).find(".yyt-sidebar-toggle").on("click",f);let Gt=H=>{H.key==="Escape"&&(k.querySelector(".yyt-dialog-overlay")||k.querySelector(".yyt-twb-editor-drawer.is-open")||(H.stopPropagation(),Ar()))},Cr=H=>{if(!(H.ctrlKey||H.metaKey)||H.key!=="s"||!n.currentPopup)return;H.preventDefault(),H.stopPropagation();let at=w(n.currentPopup),Je=at.find("#yyt-bypass-save:visible").first()||at.find(`#${a}-save-api-config:visible`).first()||at.find("#yyt-save-tool-preset:visible").first()||at.find('[data-twb-action="save"]:visible').first();Je?.length&&Je.trigger("click")};k.addEventListener("keydown",Gt),k.addEventListener("keydown",Cr),u.cleanups.push(()=>{k.removeEventListener("keydown",Gt),k.removeEventListener("keydown",Cr)}),Ve(),w(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let at=w(this).data("tab");at&&Jr(at)}),Er(),Xr(n.currentMainTab);let tt=s.toolRegistryModule?.getToolConfig(n.currentMainTab);tt?.hasSubTabs&&(w(n.currentPopup).find(".yyt-sub-nav").show(),Ls(n.currentMainTab,tt.subTabs)),G(),Co(R),Ue(),h("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:pm,closePopup:Ar,switchMainTab:Jr,switchSubTab:$s,renderTabContent:Xr,renderSubTabContent:Qr}}function tm(t,e={}){let{constants:r,modules:s}=t,{SCRIPT_ID:o,SCRIPT_VERSION:n}=r,{init:a,loadModules:i,addMenuItem:l,popupShell:c}=e;return{version:n,id:o,init:a,openPopup:c?.openPopup,closePopup:c?.closePopup,switchMainTab:c?.switchMainTab,switchSubTab:c?.switchSubTab,addMenuItem:l,getStorage:()=>s.storageModule,getApiConnection:()=>s.apiConnectionModule,getPresetManager:()=>s.presetManagerModule,getUi:()=>s.uiModule,getUiModule:()=>s.uiModule,getRegexExtractor:()=>s.regexExtractorModule,getToolManager:()=>s.toolManagerModule,getToolExecutor:()=>s.toolExecutorModule,getWindowManager:()=>s.windowManagerModule,getToolRegistry:()=>s.toolRegistryModule,getSettingsService:()=>s.settingsServiceModule,getBypassManager:()=>s.bypassManagerModule,getVariableResolver:()=>s.variableResolverModule,getContextInjector:()=>s.contextInjectorModule,getToolPromptService:()=>s.toolPromptServiceModule,getToolOutputService:()=>s.toolOutputServiceModule,getToolAutomationService:()=>s.toolAutomationServiceModule,getDataProvider:()=>s.toolDataProviderModule?.getCurrentProvider?.()||null,async getDataProviderAsync(){return await i(),s.toolDataProviderModule?.getToolDataProvider?.()||null},async getApiConfig(){return await i(),s.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(d){return await i(),s.apiConnectionModule?(s.apiConnectionModule.updateApiConfig(d),!0):!1},async getPresets(){return await i(),s.presetManagerModule?s.presetManagerModule.getAllPresets():[]},async sendApiRequest(d,u){if(await i(),s.apiConnectionModule)return s.apiConnectionModule.sendApiRequest(d,u);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),s.apiConnectionModule?s.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(d,u){return s.toolRegistryModule?.registerTool(d,u)||!1},unregisterTool(d){return s.toolRegistryModule?.unregisterTool(d)||!1},getToolList(){return s.toolRegistryModule?.getToolList()||[]},createWindow(d){return s.windowManagerModule?.createWindow(d)||null},closeWindow(d){s.windowManagerModule?.closeWindow(d)},startAutomation(){return s.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){s.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return s.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},cancelAutomation(d={}){return s.toolAutomationServiceModule?.toolAutomationService?.cancelAutomation?.(d)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}},async processCurrentAssistantMessage(d={}){return s.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(d)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var oi="youyou_toolkit",cS="1.0.194",dS=`${oi}-menu-item`,uS=`${oi}-menu-container`,pS=`${oi}-popup`,yS=typeof window.parent<"u"?window.parent:window,ni={constants:{SCRIPT_ID:oi,SCRIPT_VERSION:cS,MENU_ITEM_ID:dS,MENU_CONTAINER_ID:uS,POPUP_ID:pS},topLevelWindow:yS,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null,toolAutomationServiceModule:null,toolDataProviderModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"presetManagement",currentSubTab:{},startupScreenDismissed:!1}},rm=em(ni),Cn=Jg(ni,{openPopup:rm.openPopup});ni.services.loadModules=Cn.loadModules;var Zc=tm(ni,{init:Cn.init,loadModules:Cn.loadModules,addMenuItem:Cn.addMenuItem,popupShell:rm});if(typeof window<"u"&&(window.YouYouToolkit=Zc,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=Zc}catch{}var xk=Zc;Cn.init();Promise.resolve().then(()=>(W(),td)).then(({logger:t})=>{t.createScope("Bootstrap").log("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210")});export{xk as default};
