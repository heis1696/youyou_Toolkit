var Vm=Object.defineProperty;var N=(t,e)=>()=>(t&&(e=t(t=0)),e);var re=(t,e)=>{for(var r in e)Vm(t,r,{get:e[r],enumerable:!0})};var B,fi,K,Ge=N(()=>{B={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_RUNTIME_UPDATED:"tool:runtimeUpdated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},fi=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,r,s={}){if(!e||typeof r!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:o=0}=s;this.listeners.has(e)||this.listeners.set(e,new Set);let n={callback:r,priority:o};return this.listeners.get(e).add(n),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,r)}off(e,r){let s=this.listeners.get(e);if(s){for(let o of s)if(o.callback===r){s.delete(o);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,r){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,r),this._addToHistory(e,r);let s=this.listeners.get(e);if(!s||s.size===0)return;let o=Array.from(s).sort((n,a)=>a.priority-n.priority);for(let{callback:n}of o)try{n(r)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,r){let s=o=>{this.off(e,s),r(o)};return this.on(e,s)}wait(e,r=0){return new Promise((s,o)=>{let n=null,a=this.once(e,i=>{n&&clearTimeout(n),s(i)});r>0&&(n=setTimeout(()=>{a(),o(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},r))})}hasListeners(e){let r=this.listeners.get(e);return r&&r.size>0}listenerCount(e){let r=this.listeners.get(e);return r?r.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,r){this.history.push({event:e,data:r,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(r=>r.event===e):[...this.history]}clearHistory(){this.history=[]}},K=new fi});var hd={};re(hd,{LOG_LEVEL:()=>de,LoggerService:()=>Mn,default:()=>Jm,logger:()=>I});var de,md,Mn,I,Jm,H=N(()=>{Ge();de=Object.freeze({DEBUG:0,INFO:1,WARN:2,ERROR:3}),md=Object.freeze({[de.DEBUG]:"DEBUG",[de.INFO]:"INFO",[de.WARN]:"WARN",[de.ERROR]:"ERROR"}),Mn=class{constructor(){this._entries=[],this._maxSize=2e3,this._nextId=1,this._minLevel=de.INFO,this._eventKey="logger:entry",this._statsEventKey="logger:statsChanged",this._pendingFlush=!1}_write(e,r,s,o){let n={id:this._nextId++,timestamp:Date.now(),level:e,scope:r,message:s,data:o};this._entries.push(n),this._entries.length>this._maxSize&&this._entries.shift(),this._forwardToConsole(n),this._pendingFlush||(this._pendingFlush=!0,queueMicrotask(()=>{this._pendingFlush=!1,this._emitEntry(n)}))}_forwardToConsole(e){let r=`[${e.scope}]`;switch(e.level){case de.DEBUG:console.debug(r,e.message,e.data??"");break;case de.INFO:console.log(r,e.message,e.data??"");break;case de.WARN:console.warn(r,e.message,e.data??"");break;case de.ERROR:console.error(r,e.message,e.data??"");break}}_emitEntry(e){try{K?.emit(this._eventKey,e)}catch{}}debug(e,r,s){de.DEBUG<this._minLevel||this._write(de.DEBUG,e,r,s)}info(e,r,s){de.INFO<this._minLevel||this._write(de.INFO,e,r,s)}log(e,r,s){this.info(e,r,s)}warn(e,r,s){de.WARN<this._minLevel||this._write(de.WARN,e,r,s)}error(e,r,s){de.ERROR<this._minLevel||this._write(de.ERROR,e,r,s)}createScope(e){return{debug:(r,s)=>this.debug(e,r,s),info:(r,s)=>this.info(e,r,s),log:(r,s)=>this.log(e,r,s),warn:(r,s)=>this.warn(e,r,s),error:(r,s)=>this.error(e,r,s)}}getEntries(e={}){let{level:r,scope:s,search:o,limit:n=500,offset:a=0}=e,i=this._entries;if(r!=null&&(i=i.filter(c=>c.level>=r)),s&&(i=i.filter(c=>c.scope===s)),o){let c=o.toLowerCase();i=i.filter(d=>d.scope.toLowerCase().includes(c)||d.message.toLowerCase().includes(c))}let l=i.length;return i=i.slice(a,a+n),{entries:i,total:l}}getStats(){let e={total:this._entries.length,byLevel:{DEBUG:0,INFO:0,WARN:0,ERROR:0},byScope:{}};for(let r of this._entries){let s=md[r.level]||"UNKNOWN";e.byLevel[s]=(e.byLevel[s]||0)+1,e.byScope[r.scope]=(e.byScope[r.scope]||0)+1}return e}setLevel(e){this._minLevel=e}getLevel(){return this._minLevel}setMaxSize(e){this._maxSize=Math.max(100,Math.min(1e4,e))}clear(){this._entries=[],this._nextId=1}levelLabel(e){return md[e]||"UNKNOWN"}},I=new Mn,Jm=I});var bd={};re(bd,{StorageService:()=>rs,default:()=>eh,getStorage:()=>Xm,loadSettings:()=>Qm,presetStorage:()=>Ee,saveSettings:()=>Zm,storage:()=>$,toolStorage:()=>be,windowStorage:()=>Pn});function Xm(){let t=$;return t._getStorage(),t._storage}function Qm(){return $.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function Zm(t){$.set("settings",t)}var gi,rs,$,be,Ee,Pn,eh,ze=N(()=>{H();gi=I.createScope("StorageService"),rs=class t{constructor(e="youyou_toolkit"){this.namespaceKey=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext();if(r?.extensionSettings)return r.extensionSettings[this.namespaceKey]||(r.extensionSettings[this.namespaceKey]={}),this._storage={_target:r.extensionSettings[this.namespaceKey],getItem:s=>{let o=r.extensionSettings[this.namespaceKey][s];return typeof o=="string"?o:o?JSON.stringify(o):null},setItem:(s,o)=>{r.extensionSettings[this.namespaceKey][s]=o,this._saveSettings(r)},removeItem:s=>{delete r.extensionSettings[this.namespaceKey][s],this._saveSettings(r)},_isTavern:!0},this._storage}}catch{gi.warn("SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage")}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,r)=>{try{localStorage.setItem(e,r)}catch(s){gi.error("localStorage\u5199\u5165\u5931\u8D25:",s)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,r=null){let s=`${this.namespaceKey}:${e}`;if(this._cache.has(s))return this._cache.get(s);let o=this._getStorage(),n=this._getFullKey(e),a=o.getItem(n);if(a===null)return r;try{let i=JSON.parse(a);return this._cache.set(s,i),i}catch{return a}}set(e,r){let s=this._getStorage(),o=this._getFullKey(e),n=`${this.namespaceKey}:${e}`;this._cache.set(n,r);try{s.setItem(o,JSON.stringify(r))}catch(a){gi.error("\u5B58\u50A8\u5931\u8D25:",a)}}remove(e){let r=this._getStorage(),s=this._getFullKey(e),o=`${this.namespaceKey}:${e}`;this._cache.delete(o),r.removeItem(s)}has(e){let r=this._getStorage(),s=this._getFullKey(e);return r.getItem(s)!==null}clear(){if(this._getStorage()._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let s=r.SillyTavern.getContext();s?.extensionSettings?.[this.namespaceKey]&&(s.extensionSettings[this.namespaceKey]={},this._saveSettings(s))}}else{let r=`${this.namespaceKey}_`,s=[];for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);n&&n.startsWith(r)&&s.push(n)}s.forEach(o=>localStorage.removeItem(o))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespaceKey}_${e}`}namespace(e){return new t(`${this.namespaceKey}:${e}`)}getMultiple(e){let r={};return e.forEach(s=>{r[s]=this.get(s)}),r}setMultiple(e){Object.entries(e).forEach(([r,s])=>{this.set(r,s)})}exportAll(){let e=this._getStorage(),r={};if(e._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let n=s.SillyTavern.getContext()?.extensionSettings?.[this.namespaceKey]||{};Object.entries(n).forEach(([a,i])=>{r[a]=typeof i=="string"?JSON.parse(i):i})}}else{let s=`${this.namespaceKey}_`;for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);if(n&&n.startsWith(s)){let a=n.slice(s.length);try{r[a]=JSON.parse(localStorage.getItem(n))}catch{r[a]=localStorage.getItem(n)}}}}return r}},$=new rs("youyou_toolkit"),be=new rs("youyou_toolkit:tools"),Ee=new rs("youyou_toolkit:presets"),Pn=new rs("youyou_toolkit:windows");eh=$});var Sd={};re(Sd,{API_STATUS:()=>ih,fetchAvailableModels:()=>mh,getApiConfig:()=>Ks,getEffectiveApiConfig:()=>Po,hasEffectiveApiPreset:()=>No,sendApiRequest:()=>Do,sendWithPreset:()=>bi,testApiConnection:()=>gh,updateApiConfig:()=>ch,validateApiConfig:()=>Nn});function oh(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function hi(){return $.get(xd,oh())}function nh(t){$.set(xd,t)}function wd(){return $.get(rh,[])}function ah(){return $.get(sh,"")}function mi(t,e={}){let r=new Error(t);return r.allowDirectFallback=e.allowDirectFallback===!0,r}function vd(t,e="chat_completions"){let r=String(t||"").trim();if(!r)return"";let s=null;try{s=new URL(r)}catch{return r}let o=s.pathname.replace(/\/+$/,""),n=o;return e==="chat_completions"?!/\/chat\/completions$/i.test(o)&&!/\/completions$/i.test(o)&&(n=`${o||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(o)?n=o.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(o)?n=o.replace(/\/completions$/i,"/models"):/\/models$/i.test(o)||(n=`${o||""}/models`)),s.pathname=n.replace(/\/+/g,"/"),s.toString()}function lh(t){let e=String(t||"").trim();if(!e)return"";try{let r=new URL(e);return r.pathname=r.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",r.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function Ks(){return hi().apiConfig||{}}function ch(t){let e=hi();e.apiConfig={...e.apiConfig,...t},nh(e)}function Nn(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function Po(t=""){let e=hi(),r=t||ah()||"";if(r){let o=wd().find(n=>n.name===r);if(o&&o.apiConfig)return{...o.apiConfig,presetName:o.name}}return e.apiConfig||{}}function No(t=""){return t?wd().some(r=>r?.name===t):!1}async function bi(t,e,r={},s=null){let o=Po(t);return await Do(e,{...r,apiConfig:o},s)}function Td(t,e={}){let r=e.apiConfig||Ks();return{messages:t,model:r.model||"gpt-3.5-turbo",max_tokens:r.max_tokens||4096,temperature:r.temperature??.7,top_p:r.top_p??.9,stream:r.stream??!1,...e.extraParams}}function xi(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function Do(t,e={},r=null){let s=e.apiConfig||Ks(),o=s.useMainApi,n=Nn(s);if(!n.valid&&!o)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${n.errors.join(", ")}`);return o?await dh(t,e,r):await uh(t,s,e,r)}async function dh(t,e,r){let s=typeof window.parent<"u"?window.parent:window;if(!s.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let o=await s.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.apiConfig?.stream??Ks().stream??!1,...e.extraParams});if(typeof o!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return o.trim()}catch(o){throw o.name==="AbortError"?o:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${o.message}`)}}async function uh(t,e,r,s){let o=typeof window.parent<"u"?window.parent:window;if(o.TavernHelper?.generateRaw)try{return await ph(t,e,r,s,o)}catch(n){let a=String(n?.message||n||"");if(n?.name==="AbortError"||s?.aborted||a.includes("\u505C\u6B62\u6309\u94AE")||a.includes("stop button")||a.includes("Clicked stop")||a==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")throw n;th.warn("TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",n)}if(o.SillyTavern?.getRequestHeaders)try{return await yh(t,e,r,s,o)}catch(n){if(!n?.allowDirectFallback)throw n}return await fh(t,e,r,s)}async function ph(t,e,r,s,o){if(s?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let n=await o.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.stream??!1,max_chat_history:0,custom_api:{apiurl:lh(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...r.extraParams||{}});return typeof n=="string"?n.trim():xi(n)}async function yh(t,e,r,s,o){let n=String(e.url||"").trim(),a={...Td(t,{apiConfig:e,...r}),chat_completion_source:"custom",reverse_proxy:n,proxy_password:"",custom_url:n,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof o.SillyTavern?.getRequestHeaders=="function"?o.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(a),signal:s})}catch(u){throw u?.name==="AbortError"?u:mi(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw mi(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:u})}let d=null;try{d=c?JSON.parse(c):{}}catch{let y=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw mi(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${y||"(\u7A7A\u54CD\u5E94)"}`)}return xi(d)}async function fh(t,e,r,s){let o=Td(t,{apiConfig:e,...r}),n=vd(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(n,{method:"POST",headers:a,body:JSON.stringify(o),signal:s}),l=await i.text().catch(()=>"");if(!i.ok){let d=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${d}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return xi(c)}async function gh(t=null){let e=t||Ks(),r=Date.now();try{await Do([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let o=Date.now()-r;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${o}ms)`,latency:o}}catch(s){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${s.message}`,latency:Date.now()-r}}}async function mh(t=null){let e=t||Ks();return e.useMainApi?await hh():await bh(e)}async function hh(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function bh(t){if(!t.url||!t.apiKey)return[];try{let e=vd(t.url,"models"),r=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!r.ok)return[];let s=await r.json();return s.data&&Array.isArray(s.data)?s.data.map(o=>o.id||o.name).filter(Boolean).sort():[]}catch{return[]}}var th,xd,rh,sh,ih,Dn=N(()=>{ze();H();th=I.createScope("ApiConnection"),xd="settings",rh="api_presets",sh="current_preset";ih={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var Cd={};re(Cd,{createPreset:()=>On,createPresetFromCurrentConfig:()=>Eh,deletePreset:()=>Bn,duplicatePreset:()=>Ti,exportPresets:()=>_i,generateUniquePresetName:()=>Ch,getActiveConfig:()=>_h,getActivePresetName:()=>Si,getAllPresets:()=>Ir,getPreset:()=>os,getPresetNames:()=>vh,getStarredPresets:()=>Sh,importPresets:()=>Ei,presetExists:()=>$o,renamePreset:()=>vi,switchToPreset:()=>zn,togglePresetStar:()=>Th,updatePreset:()=>wi,validatePreset:()=>Ah});function wh(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Ad(){return $.get(xh,wh())}function mt(){return $.get(_d,[])}function ss(t){$.set(_d,t)}function Ln(){return $.get(Ed,"")}function $n(t){$.set(Ed,t||"")}function Ir(){return mt()}function vh(){return mt().map(e=>e.name)}function os(t){return!t||typeof t!="string"?null:mt().find(r=>r.name===t)||null}function $o(t){return!t||typeof t!="string"?!1:mt().some(r=>r.name===t)}function On(t){let{name:e,description:r,apiConfig:s}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let o=e.trim();if($o(o))return{success:!1,message:`\u9884\u8BBE "${o}" \u5DF2\u5B58\u5728`};let n={name:o,description:r||"",apiConfig:{url:s?.url||"",apiKey:s?.apiKey||"",model:s?.model||"",useMainApi:s?.useMainApi??!0,stream:s?.stream??!1,max_tokens:s?.max_tokens||4096,temperature:s?.temperature??.7,top_p:s?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=mt();return a.push(n),ss(a),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:n}}function wi(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=mt(),s=r.findIndex(a=>a.name===t);if(s===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let o=r[s],n={...o,...e,name:o.name,updatedAt:Date.now()};return e.apiConfig&&(n.apiConfig={...o.apiConfig,...e.apiConfig}),r[s]=n,ss(r),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:n}}function Bn(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=mt(),r=e.findIndex(s=>s.name===t);return r===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(r,1),ss(e),Ln()===t&&$n(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function vi(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(!$o(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if($o(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let s=mt(),o=s.find(n=>n.name===t);return o&&(o.name=r,o.updatedAt=Date.now(),ss(s),Ln()===t&&$n(r)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${r}"`}}function Ti(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim(),s=os(t);if(!s)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if($o(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(s)),name:r,createdAt:Date.now(),updatedAt:Date.now()},n=mt();return n.push(o),ss(n),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${r}"`,preset:o}}function Th(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=mt(),r=e.find(s=>s.name===t);return r?(r.starred=!r.starred,r.updatedAt=Date.now(),ss(e),{success:!0,message:r.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:r.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Sh(){return mt().filter(e=>e.starred===!0)}function zn(t){if(!t)return $n(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=os(t);return e?($n(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Si(){return Ln()}function _h(){let t=Ln();if(t){let r=os(t);if(r)return{presetName:t,apiConfig:r.apiConfig}}return{presetName:"",apiConfig:Ad().apiConfig||{}}}function _i(t=null){if(t){let r=os(t);if(!r)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let e=mt();return JSON.stringify(e,null,2)}function Ei(t,e={overwrite:!1}){let r;try{r=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let s=Array.isArray(r)?r:[r];if(s.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let o=mt(),n=0;for(let a of s){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let i=o.findIndex(l=>l.name===a.name);i>=0?e.overwrite&&(a.updatedAt=Date.now(),o[i]=a,n++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),o.push(a),n++)}return n>0&&ss(o),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${n} \u4E2A\u9884\u8BBE`,imported:n}}function Eh(t,e=""){let r=Ad();return On({name:t,description:e,apiConfig:r.apiConfig})}function Ah(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function Ch(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=mt(),r=new Set(e.map(o=>o.name));if(!r.has(t))return t;let s=1;for(;r.has(`${t} (${s})`);)s++;return`${t} (${s})`}var xh,_d,Ed,Lo=N(()=>{ze();xh="settings",_d="api_presets",Ed="current_preset"});function ur(){return typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function se(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function A(t,e,r=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let s=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(s.toastr){s.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:r,progressBar:!0});return}Ih(t,e,r),kh.log(`[${t.toUpperCase()}] ${e}`)}function is(t,e,r={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:s=3500,sticky:o=!1,noticeId:n=""}=r,a=ur();if(!a?.body){A(t,e,s);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",c=a.getElementById(i);if(c||(c=a.createElement("div"),c.id=i,c.style.cssText=`
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
    `,a.head.appendChild(h)}if(n){let h=c.querySelector(`[data-notice-id="${n}"]`);h&&h.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=a.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,n&&(u.dataset.noticeId=n);let y=a.createElement("span");y.className="yyt-top-notice__icon",y.textContent=d[t]||d.info;let p=a.createElement("div");p.className="yyt-top-notice__content",p.textContent=e;let f=a.createElement("button");f.className="yyt-top-notice__close",f.type="button",f.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),f.textContent="\xD7";let g=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};f.addEventListener("click",g),u.appendChild(y),u.appendChild(p),u.appendChild(f),c.appendChild(u),o||setTimeout(g,s)}function Ih(t,e,r){let s=ur();if(!s)return;let o=s.getElementById("yyt-fallback-toast");o&&o.remove();let n={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=n[t]||n.info,i=s.createElement("div");if(i.id="yyt-fallback-toast",i.style.cssText=`
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
    `,s.head.appendChild(l)}s.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},r)}function Q(){if(ns)return ns;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return ns=window.parent.jQuery,ns}catch{}return window.jQuery&&(ns=window.jQuery),ns}function Rh(){ns=null}function ge(t){if(!t||t.length===0)return!1;let e=t[0];if(!e||e.nodeType!==1)return!1;let r=e.ownerDocument||document;return e.isConnected?r?.documentElement?.contains?r.documentElement.contains(e):!0:!1}function Rr(...t){return t.flat(1/0).flatMap(e=>String(e||"").split(/\s+/)).map(e=>e.trim()).filter(Boolean).join(" ")}function Us(t={}){return Object.entries(t).filter(([,e])=>e!=null&&e!==!1).map(([e,r])=>r===!0?e:`${e}="${se(String(r))}"`).join(" ")}function Md(t=[],e="",r=""){let s=String(e??""),o=t.find(n=>n.value===s)||t.find(n=>n.disabled!==!0)||null;return o||{value:s,label:r||s||"\u8BF7\u9009\u62E9",disabled:!1}}function Mh(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(e=>e&&e!=="yyt-select"&&e!=="yyt-native-select-bridge")}function kd(t,e){let r=Q();if(!r||!e?.length)return null;let s=e.attr("id")?`#${e.attr("id")}`:e.attr("data-yyt-select-key")?`[data-yyt-select-key="${e.attr("data-yyt-select-key")}"]`:"";if(!s)return null;let n=t.find("[data-yyt-custom-select]").filter((a,i)=>String(r(i).attr("data-yyt-select-target")||"")===s);return n.length?n.first():null}function Pd(t){let e=t?.[0];return e?.ownerDocument?e.ownerDocument:typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function Ph(t){if(!Q()||!ge(t))return null;let r=t.find("[data-yyt-custom-select]");return r.length?r:null}function Nd(t,e){if(!Q()||!e?.length)return null;let s=e.find("[data-yyt-select-native]").first();if(s.length)return s;let o=String(e.attr("data-yyt-select-target")||"").trim();if(!o)return null;let n=t.find(o).first();return n.length?n:null}function Dd(t=null){return t?.jquery&&t[0]?.ownerDocument?t[0].ownerDocument:t?.ownerDocument?t.ownerDocument:t?.nodeType===9?t:ur()}function Jt(t=null){let e=Dd(t),r=Id.get(e);return r||(r={targetDoc:e,layer:null,activeRoot:null,activeDropdown:null,placeholder:null,cleanup:null},Id.set(e,r)),r}function Nh(t=null){let e=Dd(t);if(!e?.body)return null;let r=Jt(e);if(r.layer&&r.layer.isConnected)return r.layer;let s=e.getElementById(Rd);return s||(s=e.createElement("div"),s.id=Rd,s.className="yyt-select-portal-layer",e.body.appendChild(s)),r.layer=s,s}function Kn(t){if(!Q()||!t?.length)return null;let r=t.find("[data-yyt-select-trigger]").first();return r.length?r:t.find(".yyt-select-trigger").first()}function $d(t){let e=Q();if(!e||!t?.length)return null;let r=Jt(t);if(r.activeRoot===t[0]&&r.activeDropdown)return e(r.activeDropdown);let s=t.find("[data-yyt-select-dropdown]").first();return s.length?s:t.find(".yyt-select-dropdown").first()}function Dh(t){t&&(t.classList.remove("yyt-floating-open"),t.removeAttribute("data-yyt-floating"),t.removeAttribute("data-yyt-floating-placement"),t.style.position="",t.style.top="",t.style.left="",t.style.right="",t.style.width="",t.style.minWidth="",t.style.maxWidth="",t.style.maxHeight="",t.style.visibility="",t.style.zIndex="")}function Ld(t,e=null){if(!t)return!1;let r=Jt(e||t);return r.activeRoot?.contains?.(t)||r.activeDropdown?.contains?.(t)?!0:!!t.closest?.("[data-yyt-custom-select], .yyt-select-portal-layer")}function $h(t){if(!t?.targetDoc||typeof t.cleanup=="function")return;let e=t.targetDoc,r=e.defaultView||window,s=i=>{!t.activeRoot||!t.activeDropdown||Ld(i.target,e)||Vt(e)},o=i=>{if(i.key!=="Escape")return;let l=t.activeRoot;Vt(e);let c=Q();c&&l&&Kn(c(l))?.trigger("focus")},n=()=>{Ii(e)},a=()=>{Ii(e)};e.addEventListener("mousedown",s,!0),e.addEventListener("keydown",o,!0),r.addEventListener("resize",n),e.addEventListener("scroll",a,!0),t.cleanup=()=>{e.removeEventListener("mousedown",s,!0),e.removeEventListener("keydown",o,!0),r.removeEventListener("resize",n),e.removeEventListener("scroll",a,!0)}}function Lh(t){typeof t?.cleanup=="function"&&t.cleanup(),t&&(t.cleanup=null)}function ki(t){let e=Q();if(!e||!t?.activeRoot||!t?.activeDropdown)return;let r=t.targetDoc;if(!r?.body?.contains?.(t.activeRoot)){Vt(r);return}let s=e(t.activeRoot),o=Kn(s),n=t.activeDropdown,a=r?.defaultView||window;if(!o?.length||!n?.isConnected||!s[0]?.isConnected){Vt(r);return}let i=o[0].getBoundingClientRect(),l=a.innerWidth||r.documentElement?.clientWidth||0,c=a.innerHeight||r.documentElement?.clientHeight||0,d=12,u=8,y=Math.max(0,c-i.bottom-d-u),p=Math.max(0,i.top-d-u),f=y<220&&p>y,h=Math.max(120,Math.floor((f?p:y)||0));n.setAttribute("data-yyt-floating","true"),n.setAttribute("data-yyt-floating-placement",f?"top":"bottom"),n.classList.add("yyt-floating-open");let x=Math.ceil(i.width),v=Math.max(x,Math.floor(l-d*2)),T=n.style.width,L=n.style.minWidth,M=n.style.maxWidth,_=n.style.visibility;n.style.width="max-content",n.style.minWidth=`${x}px`,n.style.maxWidth=`${v}px`,n.style.visibility="hidden";let C=Math.ceil(n.scrollWidth||n.getBoundingClientRect().width||x),W=Math.max(x,Math.min(v,C)),q=Math.min(n.scrollHeight||h,h);n.style.width=T,n.style.minWidth=L,n.style.maxWidth=M,n.style.visibility=_;let R=Math.round(i.left);R+W>l-d&&(R=Math.max(d,Math.round(l-d-W))),R=Math.max(d,R);let S=Math.round(f?i.top-u-q:i.bottom+u);S=Math.max(d,Math.min(S,Math.round(c-d-q))),n.style.position="fixed",n.style.top=`${S}px`,n.style.left=`${R}px`,n.style.right="auto",n.style.width=`${W}px`,n.style.minWidth=`${x}px`,n.style.maxWidth=`${v}px`,n.style.maxHeight=`${Math.floor(h)}px`,n.style.visibility="",n.style.zIndex="10050"}function Vt(t=null){let e=Q(),r=Jt(t);if(!e||!r?.activeRoot)return;let s=r.activeRoot,o=r.activeDropdown,n=r.placeholder,a=e(s),i=Kn(a);o&&(Dh(o),n?.parentNode?n.parentNode.insertBefore(o,n):s?.isConnected?s.appendChild(o):o.remove()),n?.parentNode?.removeChild(n),a.removeClass("yyt-open"),i?.attr("aria-expanded","false"),r.activeRoot=null,r.activeDropdown=null,r.placeholder=null,Lh(r)}function Ii(t=null){let e=Jt(t);!e?.activeRoot||!e?.activeDropdown||ki(e)}function Od(t){if(!Q()||!t?.length)return;let r=t.first(),s=Kn(r),o=$d(r);if(!s?.length||!o?.length||s.prop("disabled"))return;let n=Jt(r);if(n.activeRoot===r[0]){ki(n);return}Vt(r);let a=Nh(r);if(!a)return;let i=o[0],l=n.targetDoc.createComment("yyt-select-dropdown-placeholder");i.parentNode?.insertBefore(l,i),a.appendChild(i),n.activeRoot=r[0],n.activeDropdown=i,n.placeholder=l,r.addClass("yyt-open"),s.attr("aria-expanded","true"),$h(n),ki(n)}function Oh(t,e){let r=Q();if(!r||!e?.length)return null;let s=e.closest("[data-yyt-custom-select]");if(s.length)return s.first();let o=Jt(e);if(o.activeRoot&&o.activeDropdown?.contains?.(e[0])){let n=r(o.activeRoot);return t.has(o.activeRoot).length?n:null}return null}function Ri(t){let e=Jt(t);t?.length&&e.activeRoot&&e.activeRoot!==t[0]||Vt(t)}function Bd(t){let e=Jt(t);if(t?.length&&e.activeRoot===t[0]){Vt(t);return}Od(t)}function Ai(t,e,r=null){let s=Q();if(!s||!e?.length)return;let o=r||Nd(t,e);if(!o?.length)return;let n=Array.isArray(o.data("yytCustomSelectOptions"))?o.data("yytCustomSelectOptions"):[],a=Md(n,o.val(),e.attr("data-yyt-select-placeholder")||""),i=String(a.value??""),l=String(a.label??""),c=o.is(":disabled");e.find(".yyt-select-value").text(l).attr("data-value",i).data("value",i);let d=$d(e);(d?.length?d.find("[data-yyt-select-option]"):e.find("[data-yyt-select-option]")).each((p,f)=>{let g=s(f),h=String(g.attr("data-value")||"")===i;g.toggleClass("yyt-selected",h).attr("aria-selected",String(h))});let y=e.find("[data-yyt-select-trigger]").first();y.prop("disabled",c),c&&(Ri(e),e.removeClass("yyt-open"),y.attr("aria-expanded","false"))}function zd(t=[]){return Array.isArray(t)?t.map(e=>{if(e&&typeof e=="object"&&!Array.isArray(e)){let s=String(e.value??""),o=String(e.label??e.text??e.name??s);return{value:s,label:o,disabled:e.disabled===!0}}let r=String(e??"");return{value:r,label:r,disabled:!1}}):[]}function Kd(t={}){let{selectedValue:e="",options:r=[],placeholder:s="\u8BF7\u9009\u62E9",disabled:o=!1,includeNative:n=!0,nativeTag:a="input",nativeType:i="hidden",rootAttributes:l={},nativeAttributes:c={},triggerAttributes:d={},dropdownAttributes:u={},optionAttributes:y={},optionClass:p="",optionTextClass:f=""}=t,g=zd(r),h=Md(g,e,s),x=o===!0||g.length===0,v=Us({...l,class:Rr("yyt-custom-select",l.class),"data-yyt-custom-select":l["data-yyt-custom-select"]??"true","data-yyt-select-placeholder":s}),T=Us({type:"button",...d,class:Rr("yyt-select-trigger",d.class),"data-yyt-select-trigger":d["data-yyt-select-trigger"]??"true","aria-haspopup":d["aria-haspopup"]??"listbox","aria-expanded":d["aria-expanded"]??"false",disabled:x?!0:d.disabled}),L=Us({...u,class:Rr("yyt-select-dropdown",u.class),"data-yyt-select-dropdown":u["data-yyt-select-dropdown"]??"true",role:u.role??"listbox"}),M=n?(()=>{let _={...c,class:Rr(c.class),"data-yyt-select-native":c["data-yyt-select-native"]??"true",disabled:x?!0:c.disabled};return a==="select"?`<select ${Us(_)}>${g.map(q=>`
            <option value="${se(q.value)}" ${q.value===String(h.value??"")?"selected":""} ${q.disabled?"disabled":""}>${se(q.label)}</option>
          `).join("")}</select>`:`<input ${Us({type:i,value:h.value,..._})}>`})():"";return`
    <div ${v}>
      ${M}
      <button ${T}>
        <span class="${se(Rr("yyt-select-value"))}" data-value="${se(h.value)}">${se(h.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${L}>
        ${g.map(_=>{let C=_.value===String(h.value??"");return`
            <button ${Us({type:"button",...y,class:Rr("yyt-select-option",p,y.class,C?"yyt-selected":""),"data-yyt-select-option":y["data-yyt-select-option"]??"true","data-value":_.value,role:y.role??"option","aria-selected":C?"true":"false",disabled:_.disabled?!0:y.disabled})}>
              <span class="${se(Rr("yyt-option-text",f))}">${se(_.label)}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function dt(t,e="yytCustomSelect"){let r=Q();if(!r||!ge(t))return;let s=Pd(t),o=Jt(s);o.activeRoot&&t.has(o.activeRoot).length&&Vt(s),t.off(`.${e}`),r(s).off(`click.${e}`),r(s).off(`mousedown.${e}`),t.find('[data-yyt-enhanced-select="true"]').remove(),t.find(".yyt-native-select-bridge").each((n,a)=>{let i=r(a),l=i.attr("data-yyt-original-style");l!==void 0&&l?i.attr("style",l):i.removeAttr("style"),i.removeClass("yyt-native-select-bridge").removeAttr("data-yyt-original-style").removeAttr("data-yyt-select-key").removeData("yytCustomSelectOptions")})}function Nt(t,e={}){let r=Q();if(!r||!ge(t))return;let{namespace:s="yytCustomSelect",selectors:o=[]}=e,n=Array.isArray(o)?o.filter(Boolean):[o].filter(Boolean);if(n.length===0)return;dt(t,s);let a=n.join(", "),i=Pd(t);t.find(a).each((l,c)=>{let d=r(c),u=String(d.attr("id")||"").trim(),y=u||`yyt-select-${Date.now()}-${l}`,p=u?`#${u}`:`[data-yyt-select-key="${y}"]`,f=`${y}-dropdown`,g=Mh(d.attr("class")),h=d.attr("style"),x=d.find("option").map((L,M)=>{let _=r(M);return{value:String(_.attr("value")??_.val()??""),label:_.text(),disabled:_.is(":disabled")}}).get();d.attr("data-yyt-original-style",h??"").attr("data-yyt-select-key",y).addClass("yyt-native-select-bridge").css("display","none").data("yytCustomSelectOptions",x);let v=Kd({includeNative:!1,selectedValue:d.val(),options:x,disabled:d.is(":disabled"),placeholder:x[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{class:Rr(g),style:h||void 0,"data-yyt-enhanced-select":"true","data-yyt-select-target":p},triggerAttributes:{id:`${y}-trigger`,"aria-controls":f},dropdownAttributes:{id:f}});d.after(v);let T=kd(t,d);Ai(t,T,d)}),t.on(`click.${s}`,"[data-yyt-select-trigger]",l=>{l.preventDefault(),l.stopPropagation();let c=r(l.currentTarget);if(c.prop("disabled"))return;let d=c.closest("[data-yyt-custom-select]");Bd(d)}),t.on(`change.${s}`,a,l=>{let c=r(l.currentTarget),d=c.find("option").map((y,p)=>{let f=r(p);return{value:String(f.attr("value")??f.val()??""),label:f.text(),disabled:f.is(":disabled")}}).get();c.data("yytCustomSelectOptions",d);let u=kd(t,c);Ai(t,u,c)}),r(i).off(`click.${s}`).on(`click.${s}`,l=>{if(Ld(l.target,i))return;let c=Ph(t);c?.length&&(Vt(i),c.filter(".yyt-open").removeClass("yyt-open").find("[data-yyt-select-trigger]").attr("aria-expanded","false"))}),r(i).off(`mousedown.${s}`,".yyt-select-portal-layer [data-yyt-select-option]").on(`mousedown.${s}`,".yyt-select-portal-layer [data-yyt-select-option]",l=>{l.preventDefault(),l.stopPropagation();let c=r(l.currentTarget);if(c.prop("disabled"))return;let d=Oh(t,c);if(!d?.length)return;let u=Nd(t,d);if(!u?.length)return;let y=String(c.attr("data-value")||"");u.val(y).trigger("change"),Ai(t,d,u),Ri(d)})}function Bh(t,e=as){if(!Q()||!ge(t))return{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9};let s=t.find(`#${e}-model`).val()?.trim()||"",o=t.find(`#${e}-model-select`);return o.is(":visible")&&(s=o.val()||s),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:s,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),stream:t.find(`#${e}-stream`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function zh(t,e,r=as){if(!Q()||!ge(t)||!e)return;t.find(`#${r}-api-url`).val(e.url||""),t.find(`#${r}-api-key`).val(e.apiKey||""),t.find(`#${r}-model`).val(e.model||""),t.find(`#${r}-stream`).prop("checked",e.stream===!0),t.find(`#${r}-max-tokens`).val(e.max_tokens||4096),t.find(`#${r}-temperature`).val(e.temperature??.7),t.find(`#${r}-top-p`).val(e.top_p??.9);let o=e.useMainApi??!0;t.find(`#${r}-use-main-api`).prop("checked",o);let a=t.find(`#${r}-custom-api-fields`);o?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${r}-model`).show(),t.find(`#${r}-model-select`).hide()}function Oo(t){let{id:e,title:r,body:s,width:o="380px",wide:n=!1,dialogClass:a="",bodyClass:i="",footerClass:l=""}=t;return`
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
  `}function Bo(t,e,r={}){if(!Q())return()=>{};let o=t.find(`#${e}-overlay`),n=()=>{o.remove(),a?.removeEventListener("keydown",i),r.onClose&&r.onClose()};o.find(`#${e}-close, #${e}-cancel`).on("click",n),o.on("click",function(l){l.target===this&&n()}),o.find(`#${e}-save`).on("click",function(){r.onSave&&r.onSave(n)});let a=o[0]?.ownerDocument||document,i=l=>{l.key==="Escape"&&(l.stopPropagation(),n())};return a.addEventListener("keydown",i),n}function pr(t,e,r={}){let{confirmText:s="\u786E\u5B9A",cancelText:o="\u53D6\u6D88",danger:n=!1,width:a="380px"}=r,i=Q(),l=ur();if(!i||!l?.body)return Promise.resolve(!1);let c=`yyt-confirm-${++Ud}`;return new Promise(d=>{let u=!1,y=h=>{u||(u=!0,g.remove(),p?.focus(),d(h))},p=l.activeElement,f=`
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
            <button class="yyt-btn yyt-btn-secondary" id="${c}-cancel">${se(o)}</button>
            <button class="yyt-btn ${n?"yyt-btn-danger":"yyt-btn-primary"}" id="${c}-confirm">${se(s)}</button>
          </div>
        </div>
      </div>`,g=i(f).appendTo(l.body);g.find(`#${c}-confirm`).on("click",()=>y(!0)),g.find(`#${c}-cancel, #${c}-close`).on("click",()=>y(!1)),g.on("click",function(h){h.target===this&&y(!1)}),g.on("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),y(!1)),h.key==="Enter"&&(h.stopPropagation(),y(!0))}),g.find(`#${c}-${n?"cancel":"confirm"}`).trigger("focus")})}function Kh(t,e,r={}){let{defaultValue:s="",placeholder:o="",confirmText:n="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",width:i="380px"}=r,l=Q(),c=ur();if(!l||!c?.body)return Promise.resolve(null);let d=`yyt-prompt-${++Ud}`;return new Promise(u=>{let y=!1,p=T=>{y||(y=!0,h.remove(),f?.focus(),u(T))},f=c.activeElement,g=`
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
            <input class="yyt-input" id="${d}-input" type="text" value="${se(s)}" placeholder="${se(o)}" />
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${d}-cancel">${se(a)}</button>
            <button class="yyt-btn yyt-btn-primary" id="${d}-confirm">${se(n)}</button>
          </div>
        </div>
      </div>`,h=l(g).appendTo(c.body),x=h.find(`#${d}-input`),v=()=>{let T=x.val().trim();p(T||null)};h.find(`#${d}-confirm`).on("click",v),h.find(`#${d}-cancel, #${d}-close`).on("click",()=>p(null)),h.on("click",function(T){T.target===this&&p(null)}),x.on("keydown",T=>{T.key==="Enter"&&(T.stopPropagation(),v())}),h.on("keydown",T=>{T.key==="Escape"&&(T.stopPropagation(),p(null))}),x.trigger("focus").trigger("select")})}function Uh(t,e,r){if(t.prop("disabled")&&t.data("yytLoading"))return Promise.resolve();let s=t.html(),o=t.outerWidth();if(t.prop("disabled",!0).data("yytLoading",!0),t.css("min-width",o+"px"),r)t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${se(r)}`);else{let n=t.find("i.fa-solid, i.fa-regular").first();n.length?(n.data("yytOriginalClass",n.attr("class")),n.attr("class","fa-solid fa-spinner fa-spin")):t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${s}`)}return Promise.resolve().then(()=>e()).finally(()=>{if(r)t.html(s);else{let n=t.find("i.fa-spinner"),a=n.data("yytOriginalClass");a?n.attr("class",a).removeData("yytOriginalClass"):t.html(s)}t.prop("disabled",!1).removeData("yytLoading").css("min-width","")})}function zo(t,e){let r=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(r),o=document.createElement("a");o.href=s,o.download=e,o.click(),URL.revokeObjectURL(s)}function Ko(t){return new Promise((e,r)=>{let s=new FileReader;s.onload=o=>e(o.target.result),s.onerror=o=>r(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),s.readAsText(t)})}var kh,as,Ci,ns,Id,Rd,Ud,qe=N(()=>{H();kh=I.createScope("UIUtils"),as="youyou_toolkit",Ci=class{constructor(e={}){this._state={...e}}get(e){return this._state[e]}set(e,r){return this._state[e]=r,this}reset(e={}){return this._state={...e},this}toJSON(){return{...this._state}}};ns=null;Id=new WeakMap,Rd="yyt-select-portal-layer";Ud=0});var js,Uo,jt,Mi=N(()=>{Ge();qe();H();js=I.createScope("UIManager"),Uo=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,K.emit(B.UI_INITIALIZED),js.log("\u521D\u59CB\u5316\u5B8C\u6210"))}register(e,r){return!e||!r?(js.warn("\u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...r,render:r.render||(()=>""),bindEvents:r.bindEvents||(()=>{}),destroy:r.destroy||(()=>{}),getStyles:r.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,r,s={}){let o=Q();if(!o){js.error("jQuery\u4E0D\u53EF\u7528");return}let n=this.components.get(e);if(!n){js.error(`\u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);let i;typeof r=="string"?i=o(r):r&&r.jquery?i=r:r&&(i=o(r)),i?.length&&i.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u672A\u6CE8\u518C\uFF1A${e}</span></div>`);return}let a;if(typeof r=="string"?a=o(r):r&&r.jquery?a=r:r&&(a=o(r)),!ge(a)){js.warn("\u5BB9\u5668\u4E0D\u5B58\u5728");return}this.activeInstances.forEach((i,l)=>{i?.container?.length&&a.length&&i.container[0]===a[0]&&l!==e&&this.destroyInstance(l)}),this.destroyInstance(e);try{if(typeof n.renderTo=="function")n.renderTo(a,{...s,dependencies:this.dependencies});else{let i=n.render({...s,dependencies:this.dependencies});a.html(i),n.bindEvents(a,this.dependencies)}}catch(i){js.error(`\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25: ${e}`,i),a.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25\uFF1A${e}${i?.message?` - ${i.message}`:""}</span></div>`);return}this.activeInstances.set(e,{container:a,component:n,props:s}),K.emit(B.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let r=this.activeInstances.get(e);r&&(r.component.destroy(r.container),this.activeInstances.delete(e))}destroyContainerInstance(e){let r=Q();if(!r||!e)return;let s;if(typeof e=="string"?s=r(e):e?.jquery?s=e:s=r(e),!s?.length)return;let o=[];this.activeInstances.forEach((n,a)=>{n?.container?.length&&n.container[0]===s[0]&&o.push(a)}),o.forEach(n=>this.destroyInstance(n))}switchTab(e){let r=this.currentTab;this.currentTab=e,K.emit(B.UI_TAB_CHANGED,{tabId:e,oldTab:r})}getCurrentTab(){return this.currentTab}switchSubTab(e,r){this.currentSubTab[e]=r,K.emit(B.UI_SUBTAB_CHANGED,{mainTab:e,subTab:r})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((r,s)=>{r.getStyles&&(e+=r.getStyles())}),e}injectStyles(e=document){let r="yyt-component-styles";if(e.getElementById(r))return;let s=e.createElement("style");s.id=r,s.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(s)}setDependency(e,r){this.dependencies[e]=r}getDependency(e){return this.dependencies[e]}_subscribeEvents(){K.on(B.PRESET_UPDATED,()=>{}),K.on(B.TOOL_UPDATED,()=>{})}},jt=new Uo});function m(t,e={},...r){let s=document.createElement(t);if(e.className&&(s.className=e.className),e.text!==void 0&&e.text!==null&&(s.textContent=String(e.text)),e.html!==void 0&&e.html!==null&&(s.innerHTML=String(e.html)),e.attrs)for(let[o,n]of Object.entries(e.attrs))n==null||n===!1||s.setAttribute(o,n===!0?"":String(n));if(e.style&&Object.assign(s.style,e.style),e.dataset)for(let[o,n]of Object.entries(e.dataset))s.dataset[o]=String(n);for(let o of r)F(s,o);return s}function F(t,e){if(!(e==null||e===!1)){if(Array.isArray(e)){for(let r of e)F(t,r);return}if(typeof e=="string"||typeof e=="number"){t.appendChild(document.createTextNode(String(e)));return}if(e instanceof Node){t.appendChild(e);return}if(e&&e.el instanceof Node){t.appendChild(e.el);return}}}function jd(){let t=new Map;return{on(e,r){return!e||typeof r!="function"?()=>{}:(t.has(e)||t.set(e,new Set),t.get(e).add(r),()=>this.off(e,r))},off(e,r){let s=t.get(e);s&&s.delete(r)},emit(e,...r){let s=t.get(e);if(s)for(let o of[...s])try{o(...r)}catch{}},clear(){t.clear()}}}function Pi(t,e){if(!t||!e)return null;if(t._id===e)return t;let r=t._children;if(!r)return null;let s=r instanceof Map?[...r.values()]:Array.isArray(r)?r:[];for(let o of s){let n=Pi(o,e);if(n)return n}return null}function Me({id:t=null,kind:e="control"}={}){let r=jd();return{_id:t||null,_kind:e,_children:null,_emitter:r,on(s,o){return r.on(s,o)},off(s,o){r.off(s,o)},getControl(s){return Pi(this,s)},get(){},set(s){},destroy(){if(r.clear(),this._children){let s=this._children instanceof Map?[...this._children.values()]:Array.isArray(this._children)?this._children:[];for(let o of s)try{o?.destroy?.()}catch{}this._children instanceof Map?this._children.clear():Array.isArray(this._children)&&(this._children.length=0)}if(this.el?.parentNode)try{this.el.parentNode.removeChild(this.el)}catch{}}}}var ut=N(()=>{});function ue(t={}){let{id:e=null,label:r="",icon:s=null,variant:o="default",size:n="normal",disabled:a=!1,title:i=null,onClick:l=null}=t,c=["yyt-btn"];o==="primary"?c.push("yyt-btn-primary"):o==="danger"?c.push("yyt-btn-danger"):o==="ghost"&&c.push("yyt-btn-secondary"),n==="small"&&c.push("yyt-btn-small");let d=m("button",{className:c.join(" "),attrs:{type:"button",disabled:a?"disabled":null,title:i}}),u=null;s&&(u=m("span",{className:"yyt-btn-icon-glyph",text:s}),d.appendChild(u));let y=m("span",{text:r});d.appendChild(y);let p={...Me({id:e,kind:"button"}),el:d,setLabel(f){y.textContent=String(f||"")},setIcon(f){u&&(u.textContent=String(f||""))},setDisabled(f){f?d.setAttribute("disabled","disabled"):d.removeAttribute("disabled")},isDisabled(){return d.hasAttribute("disabled")},get(){return y.textContent},set(f){this.setLabel(f)}};return d.addEventListener("click",f=>{if(!d.hasAttribute("disabled")){if(typeof l=="function")try{l(f,p)}catch{}p._emitter.emit("click",f)}}),p}var Fd=N(()=>{ut()});function Ze(t={}){let{id:e=null,placeholder:r="",value:s="",type:o="text",disabled:n=!1,maxLength:a=null,onInput:i=null,onChange:l=null}=t,c=m("input",{className:"yyt-input",attrs:{type:o,placeholder:r,disabled:n?"disabled":null,maxlength:a!=null?String(a):null}});c.value=s==null?"":String(s);let d={...Me({id:e,kind:"textInput"}),el:c,get(){return c.value},set(u,{silent:y=!1}={}){c.value=u==null?"":String(u),y||d._emitter.emit("change",c.value)},setPlaceholder(u){c.placeholder=u==null?"":String(u)},setDisabled(u){c.disabled=!!u},focus(){c.focus()},select(){c.select()}};return c.addEventListener("input",()=>{if(typeof i=="function")try{i(c.value,d)}catch{}d._emitter.emit("input",c.value)}),c.addEventListener("change",()=>{if(typeof l=="function")try{l(c.value,d)}catch{}d._emitter.emit("change",c.value)}),c.addEventListener("blur",()=>d._emitter.emit("blur",c.value)),d}var Wd=N(()=>{ut()});function Ve(t={}){let{id:e=null,options:r=[],value:s="",placeholder:o=null,disabled:n=!1,onChange:a=null}=t,i=m("select",{className:"yyt-select",attrs:{disabled:n?"disabled":null}});function l(d,u){if(i.innerHTML="",o!==null){let y=m("option",{text:o,attrs:{value:"",disabled:"disabled",selected:u?null:"selected"}});i.appendChild(y)}for(let y of d){let p=m("option",{text:y.label??String(y.value),attrs:{value:String(y.value),selected:String(y.value)===String(u)?"selected":null,disabled:y.disabled?"disabled":null}});i.appendChild(p)}}l(r,s);let c={...Me({id:e,kind:"select"}),el:i,get(){return i.value},set(d,{silent:u=!1}={}){i.value=d==null?"":String(d),u||c._emitter.emit("change",i.value)},setOptions(d,u){l(d||[],u??i.value)},setDisabled(d){i.disabled=!!d}};return i.addEventListener("change",()=>{if(typeof a=="function")try{a(i.value,c)}catch(d){typeof console<"u"&&console.error&&console.error("[selectInput] onChange \u5F02\u5E38",d)}c._emitter.emit("change",i.value)}),c}var Hd=N(()=>{ut()});function vt(t={}){let{id:e=null,label:r="",hint:s="",checked:o=!1,disabled:n=!1,onChange:a=null}=t,i=m("label",{className:"yyt-toggle-label"});r&&i.appendChild(m("span",{text:r})),s&&i.appendChild(m("span",{className:"yyt-toggle-hint",text:s}));let l=m("input",{attrs:{type:"checkbox",disabled:n?"disabled":null}});l.checked=!!o;let c=m("span",{className:"yyt-toggle-slider"}),d=m("label",{className:"yyt-toggle"});d.appendChild(l),d.appendChild(c);let u=m("div",{className:"yyt-toggle-row"});u.appendChild(i),u.appendChild(d),i.addEventListener("click",p=>{p.preventDefault(),!l.disabled&&(l.checked=!l.checked,l.dispatchEvent(new Event("change",{bubbles:!0})))});let y={...Me({id:e,kind:"toggle"}),el:u,get(){return!!l.checked},set(p,{silent:f=!1}={}){l.checked=!!p,f||y._emitter.emit("change",!!p)},setDisabled(p){l.disabled=!!p}};return l.addEventListener("change",()=>{let p=!!l.checked;if(typeof a=="function")try{a(p,y)}catch{}y._emitter.emit("change",p)}),y}var Yd=N(()=>{ut()});var Gd=N(()=>{ut()});var qd=N(()=>{ut()});function Tt(t={}){let{id:e=null,label:r="",hint:s="",control:o=null,inline:n=!1}=t,a=m("div",{className:"yyt-form-group",style:n?{flexDirection:"row",alignItems:"center",gap:"12px"}:null});r&&a.appendChild(m("label",{text:r,style:n?{flex:"0 0 auto",minWidth:"120px"}:null}));let i=m("div",{style:n?{flex:"1",minWidth:"0"}:null});o&&F(i,o),a.appendChild(i),s&&a.appendChild(m("div",{className:"yyt-form-hint",text:s}));let l=o?[o]:[];return{...Me({id:e,kind:"formRow"}),el:a,_children:l,get(){return o?.get?.()},set(c,d){o?.set?.(c,d)},setControl(c){i.innerHTML="",l.length=0,c&&(F(i,c),l.push(c))}}}var Vd=N(()=>{ut()});function Un(t={}){let{id:e=null,icon:r=null,name:s="",desc:o="",active:n=!1,disabled:a=!1,actions:i=[],onClick:l=null}=t,c=["yyt-list-row"];n&&c.push("yyt-list-row-active"),a&&c.push("yyt-list-row-disabled");let d=m("div",{className:c.join(" "),style:a?{opacity:"0.5",pointerEvents:"none"}:null});r&&d.appendChild(m("div",{className:"yyt-list-row-icon",text:r}));let u=m("div",{className:"yyt-list-row-main"}),y=m("div",{className:"yyt-list-row-name",text:s});u.appendChild(y);let p=null;o&&(p=m("div",{className:"yyt-list-row-desc",text:o}),u.appendChild(p)),d.appendChild(u);let f=null;if(i&&i.length){f=m("div",{className:"yyt-list-row-actions"});for(let h of i)F(f,h);d.appendChild(f)}typeof l=="function"&&(d.style.cursor="pointer",d.addEventListener("click",h=>{h.target.closest(".yyt-list-row-actions")||(l(h,g),g._emitter.emit("click",h))}));let g={...Me({id:e,kind:"listRow"}),el:d,_children:i||[],setName(h){y.textContent=h==null?"":String(h)},setDesc(h){if(p)p.textContent=h==null?"":String(h);else{if(!h)return;p=m("div",{className:"yyt-list-row-desc",text:h}),u.appendChild(p)}},setActive(h){h?d.classList.add("yyt-list-row-active"):d.classList.remove("yyt-list-row-active")},setDisabled(h){h?(d.classList.add("yyt-list-row-disabled"),d.style.opacity="0.5",d.style.pointerEvents="none"):(d.classList.remove("yyt-list-row-disabled"),d.style.opacity="",d.style.pointerEvents="")}};return g}var Jd=N(()=>{ut()});function Ft(t={}){let{id:e=null,heading:r="",icon:s=null,actions:o=[],content:n=[]}=t,a=m("div",{className:"yyt-flow-section"}),i=null,l=null,c=null;if(r||s||o&&o.length){if(i=m("div",{className:"yyt-flow-heading"}),s&&(l=m("span",{className:"yyt-flow-heading-icon",text:s}),i.appendChild(l)),r&&i.appendChild(m("span",{text:r})),o&&o.length){c=m("div",{className:"yyt-flow-heading-action"});for(let p of o)F(c,p);i.appendChild(c)}a.appendChild(i)}let d=m("div",{className:"yyt-flow-content"}),u=[];for(let p of n||[])p&&(F(d,p),u.push(p));for(let p of o||[])p&&typeof p=="object"&&p.el&&u.push(p);return a.appendChild(d),{...Me({id:e,kind:"flowSection"}),el:a,_children:u,appendContent(p){p&&(F(d,p),p&&typeof p=="object"&&p.el&&u.push(p))},clearContent(){d.innerHTML="";let p=u.filter(f=>(o||[]).includes(f));u.length=0;for(let f of p)u.push(f)},setHeading(p){if(!i)return;let f=i.querySelector("span:not(.yyt-flow-heading-icon):not(.yyt-flow-heading-action)");f&&(f.textContent=p==null?"":String(p))},setIcon(p){l&&(l.textContent=p==null?"":String(p))}}}var Xd=N(()=>{ut()});function jn(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent.document}catch{}return document}function Ni({title:t,width:e,wide:r}){let s=`yyt-ctrl-dialog-${++jh}`,o=m("div",{className:"yyt-dialog-overlay",attrs:{"data-dialog-id":s}}),n={};e&&e!=="380px"&&(n.width=e),n.maxHeight="calc(100vh - 32px)";let a=m("div",{className:`yyt-dialog${r?" yyt-dialog-wide":""}`,style:n}),i=m("div",{className:"yyt-dialog-header"});i.appendChild(m("span",{className:"yyt-dialog-title",text:t||""}));let l=m("button",{className:"yyt-dialog-close",attrs:{type:"button","aria-label":"close"},html:'<i class="fa-solid fa-times"></i>'});i.appendChild(l),a.appendChild(i);let c=m("div",{className:"yyt-dialog-body"});a.appendChild(c);let d=m("div",{className:"yyt-dialog-footer"});return a.appendChild(d),o.appendChild(a),{overlay:o,body:c,footer:d,closeBtn:l,id:s}}function Di(t){let e=jn();return e?.body?(e.body.appendChild(t),!0):!1}function $i(t){if(t?.parentNode)try{t.parentNode.removeChild(t)}catch{}}function Fh(t={}){let{title:e="\u8BF7\u786E\u8BA4",message:r="",confirmText:s="\u786E\u5B9A",cancelText:o="\u53D6\u6D88",danger:n=!1,width:a="380px"}=t;return new Promise(i=>{let{overlay:l,body:c,footer:d,closeBtn:u}=Ni({title:e,width:a,wide:!1}),y=(jn()||document).activeElement,p=m("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6"},text:r});c.appendChild(p);let f=m("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:o}),g=m("button",{className:`yyt-btn ${n?"yyt-btn-danger":"yyt-btn-primary"}`,attrs:{type:"button"},text:s});d.appendChild(f),d.appendChild(g);let h=!1,x=v=>{if(!h){h=!0,$i(l);try{y?.focus()}catch{}i(v)}};if(g.addEventListener("click",()=>x(!0)),f.addEventListener("click",()=>x(!1)),u.addEventListener("click",()=>x(!1)),l.addEventListener("click",v=>{v.target===l&&x(!1)}),l.addEventListener("keydown",v=>{v.key==="Escape"?(v.stopPropagation(),x(!1)):v.key==="Enter"&&(v.stopPropagation(),x(!0))}),!Di(l)){i(!1);return}(n?f:g).focus()})}function Wh(t={}){let{title:e="\u8F93\u5165",message:r="",defaultValue:s="",placeholder:o="",confirmText:n="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",validate:i=null,width:l="380px"}=t;return new Promise(c=>{let{overlay:d,body:u,footer:y,closeBtn:p}=Ni({title:e,width:l,wide:!1}),f=(jn()||document).activeElement;r&&u.appendChild(m("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6",marginBottom:"8px"},text:r}));let g=m("input",{className:"yyt-input",attrs:{type:"text",placeholder:o}});g.value=String(s||""),u.appendChild(g);let h=m("div",{style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px",marginTop:"6px",minHeight:"14px"}});u.appendChild(h);let x=m("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:a}),v=m("button",{className:"yyt-btn yyt-btn-primary",attrs:{type:"button"},text:n});y.appendChild(x),y.appendChild(v);let T=!1,L=_=>{if(!T){T=!0,$i(d);try{f?.focus()}catch{}c(_)}},M=()=>{let _=g.value.trim();if(typeof i=="function"){let C=i(_);if(C){h.textContent=C,g.focus();return}}L(_||null)};if(v.addEventListener("click",M),x.addEventListener("click",()=>L(null)),p.addEventListener("click",()=>L(null)),d.addEventListener("click",_=>{_.target===d&&L(null)}),g.addEventListener("keydown",_=>{_.key==="Enter"&&(_.stopPropagation(),M())}),d.addEventListener("keydown",_=>{_.key==="Escape"&&(_.stopPropagation(),L(null))}),!Di(d)){c(null);return}g.focus(),g.select()})}function Hh(t={}){let{title:e="",body:r=null,buttons:s=[],width:o="480px",wide:n=!1,onMounted:a=null}=t,{overlay:i,body:l,footer:c,closeBtn:d}=Ni({title:e,width:o,wide:n}),u=(jn()||document).activeElement;r&&F(l,r);let y=!1,p,f=new Promise(h=>{p=h}),g=h=>{if(!y){y=!0,$i(i);try{u?.focus()}catch{}p(h)}};for(let h of s){let x=h.variant==="primary"?"yyt-btn-primary":h.variant==="danger"?"yyt-btn-danger":"yyt-btn-secondary",v=m("button",{className:`yyt-btn ${x}`,attrs:{type:"button"},text:h.label||""});v.addEventListener("click",()=>{try{h.onClick?.(g,l)}catch(T){console.error("[dialog.custom] button onClick error",T),g(null)}}),c.appendChild(v)}if(d.addEventListener("click",()=>g(null)),i.addEventListener("click",h=>{h.target===i&&g(null)}),i.addEventListener("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),g(null))}),!Di(i))p(null);else if(typeof a=="function")try{a({overlay:i,body:l,close:g})}catch{}return{el:i,body:l,close:g,result:f}}var jh,ke,Fn=N(()=>{ut();jh=0;ke={confirm:Fh,prompt:Wh,custom:Hh}});function Li(t={}){let{id:e=null,items:r=[],align:s="start",gap:o="8px",wrap:n=!0}=t,i=m("div",{className:"yyt-toolbar",style:{display:"flex",alignItems:"center",justifyContent:{start:"flex-start",end:"flex-end",center:"center","space-between":"space-between"}[s]||"flex-start",gap:o,flexWrap:n?"wrap":"nowrap"}}),l=[];for(let c of r)c&&(F(i,c),l.push(c));return{...Me({id:e,kind:"toolbar"}),el:i,_children:l,addItem(c){c&&(F(i,c),l.push(c))},clear(){for(;i.firstChild;)i.removeChild(i.firstChild);for(let c of l)try{c?.destroy?.()}catch{}l.length=0}}}var Qd=N(()=>{ut()});function Oi(t={}){let{id:e=null,name:r="",desc:s="",active:o=!1,disabled:n=!1,builtin:a=!1,readonly:i=!1,metaChips:l=[],actions:c=[],onClick:d=null}=t,u=a||i,y=["yyt-list-row","yyt-preset-list-item"];o&&y.push("yyt-list-row-active"),n&&y.push("yyt-list-row-disabled"),u&&y.push("yyt-preset-list-item-readonly");let p=m("div",{className:y.join(" "),style:n?{opacity:"0.5",pointerEvents:"none"}:null}),f=m("span",{className:"yyt-preset-dot",style:{width:"8px",height:"8px",borderRadius:"50%",flexShrink:"0",marginRight:"8px",background:o?"var(--yyt-accent, #7bb7ff)":"transparent",border:o?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))",transition:"background 0.15s ease"}});p.appendChild(f);let g=m("div",{className:"yyt-list-row-main",style:{flex:"1",minWidth:"0"}}),h=m("div",{style:{display:"flex",alignItems:"center",gap:"8px"}}),x=m("div",{className:"yyt-list-row-name",text:r,style:{fontWeight:"600"}});h.appendChild(x),a&&h.appendChild(m("span",{className:"yyt-preset-badge yyt-preset-badge-builtin",text:"\u5185\u7F6E",style:{fontSize:"10px",padding:"2px 6px",borderRadius:"999px",background:"var(--yyt-surface-3, rgba(255,255,255,0.06))",color:"var(--yyt-text-muted, rgba(255,255,255,0.5))",border:"1px solid var(--yyt-border, rgba(255,255,255,0.1))"}})),g.appendChild(h);let v=null;s&&(v=m("div",{className:"yyt-list-row-desc",text:s}),g.appendChild(v)),p.appendChild(g);let T=null;if(Array.isArray(l)&&l.length){T=m("div",{className:"yyt-preset-meta-chips",style:{display:"flex",gap:"6px",flexWrap:"wrap"}});for(let C of l)C&&T.appendChild(m("span",{className:"yyt-preset-meta-chip",text:String(C),style:{fontSize:"11px",padding:"2px 8px",borderRadius:"999px",background:"var(--yyt-surface-2, rgba(255,255,255,0.04))",color:"var(--yyt-text-secondary, rgba(255,255,255,0.6))",border:"1px solid var(--yyt-border-soft, rgba(255,255,255,0.04))"}}));p.appendChild(T)}let L=null,M=u?c.filter(C=>C?._kind!=="button"||!C._destructive):c;if(M&&M.length){L=m("div",{className:"yyt-list-row-actions"});for(let C of M)F(L,C);p.appendChild(L)}typeof d=="function"&&(p.style.cursor="pointer",p.addEventListener("click",C=>{C.target.closest(".yyt-list-row-actions")||(d(C,_),_._emitter.emit("click",C))}));let _={...Me({id:e,kind:"presetListItem"}),el:p,_children:c||[],setActive(C){C?p.classList.add("yyt-list-row-active"):p.classList.remove("yyt-list-row-active"),f.style.background=C?"var(--yyt-accent, #7bb7ff)":"transparent",f.style.border=C?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))"},setName(C){x.textContent=C==null?"":String(C)},setDesc(C){if(v)v.textContent=C==null?"":String(C);else{if(!C)return;v=m("div",{className:"yyt-list-row-desc",text:C}),g.appendChild(v)}},setDisabled(C){C?(p.classList.add("yyt-list-row-disabled"),p.style.opacity="0.5",p.style.pointerEvents="none"):(p.classList.remove("yyt-list-row-disabled"),p.style.opacity="",p.style.pointerEvents="")}};return _}var Zd=N(()=>{ut()});function Bi(t={}){let{id:e=null,values:r=[],placeholder:s="\u8F93\u5165\u540E\u56DE\u8F66\u6DFB\u52A0",suggestions:o=null,allowDuplicates:n=!1,maxChips:a=0,chipVariant:i="default",onChange:l=null,onAdd:c=null,onRemove:d=null}=t,u=o&&o.length?`yyt-chip-dl-${++Yh}`:null,y=m("div",{className:"yyt-chip-group",style:{display:"flex",flexWrap:"wrap",gap:"6px",padding:"6px 8px",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-control-border, rgba(255,255,255,0.08))",background:"var(--yyt-control-bg, transparent)",minHeight:"36px",alignItems:"center"}}),p=[],f={type:"text",placeholder:s,autocomplete:"off"};u&&(f.list=u);let g=m("input",{className:"yyt-chip-input",attrs:f,style:{flex:"1 1 auto",minWidth:"120px",border:"none",outline:"none",background:"transparent",color:"var(--yyt-text, inherit)",fontSize:"12px",padding:"4px 0"}}),h=null;if(u){h=m("datalist",{attrs:{id:u}});for(let R of o)h.appendChild(m("option",{attrs:{value:String(R)}}));y.appendChild(h)}function x(){return i==="danger"?"rgba(248,113,113,0.12)":i==="soft"?"var(--yyt-surface-2, rgba(255,255,255,0.04))":"var(--yyt-accent-soft, rgba(123,183,255,0.15))"}function v(){return i==="danger"?"rgba(248,113,113,0.25)":"var(--yyt-border, rgba(255,255,255,0.1))"}function T(){return i==="danger"?"#f87171":"var(--yyt-text, inherit)"}function L(R){let S=m("span",{className:"yyt-chip",style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"3px 4px 3px 10px",borderRadius:"999px",background:x(),border:`1px solid ${v()}`,color:T(),fontSize:"11px",fontWeight:"500"}});S.appendChild(m("span",{text:R,style:{lineHeight:"1"}}));let U=m("button",{attrs:{type:"button","aria-label":"remove"},text:"\xD7",style:{border:"none",background:"transparent",color:"inherit",cursor:"pointer",padding:"0 4px",fontSize:"14px",lineHeight:"1",opacity:"0.7"}});return U.addEventListener("click",j=>{j.stopPropagation(),C(R)}),U.addEventListener("mouseenter",()=>{U.style.opacity="1"}),U.addEventListener("mouseleave",()=>{U.style.opacity="0.7"}),S.appendChild(U),S}function M(){let R=[];for(let S of y.children)S===g||S===h||R.push(S);for(let S of R)y.removeChild(S);for(let S of p)y.insertBefore(L(S),g)}function _(R){let S=String(R||"").trim();if(!S||!n&&p.includes(S)||a>0&&p.length>=a)return!1;p.push(S),M();try{c?.(S,p.slice())}catch{}try{l?.(p.slice())}catch{}return q._emitter.emit("change",p.slice()),!0}function C(R){let S=p.indexOf(R);if(S<0)return!1;p.splice(S,1),M();try{d?.(R,p.slice())}catch{}try{l?.(p.slice())}catch{}return q._emitter.emit("change",p.slice()),!0}function W(){if(p.length!==0){p=[],M();try{l?.([])}catch{}q._emitter.emit("change",[])}}for(let R of r){let S=String(R||"").trim();S&&(!n&&p.includes(S)||p.push(S))}y.appendChild(g),M(),g.addEventListener("keydown",R=>{if(R.key==="Enter"||R.key===","){R.preventDefault();let S=g.value.trim();S&&_(S)&&(g.value="")}else R.key==="Backspace"&&!g.value&&p.length&&C(p[p.length-1])}),g.addEventListener("blur",()=>{let R=g.value.trim();R&&_(R)&&(g.value="")}),y.addEventListener("click",R=>{R.target===y&&g.focus()});let q={...Me({id:e,kind:"chipGroup"}),el:y,get(){return p.slice()},set(R){p=[];for(let S of Array.isArray(R)?R:[]){let U=String(S||"").trim();U&&(!n&&p.includes(U)||p.push(U))}M();try{l?.(p.slice())}catch{}q._emitter.emit("change",p.slice())},addChip:_,removeChip:C,clear:W,setSuggestions(R){if(h){for(;h.firstChild;)h.removeChild(h.firstChild);for(let S of R||[])h.appendChild(m("option",{attrs:{value:String(S)}}))}}};return q}var Yh,eu=N(()=>{ut();Yh=0});var yr=N(()=>{Fd();Wd();Hd();Yd();Gd();qd();Vd();Jd();Xd();Fn();Qd();Zd();eu();ut()});function tu(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function Gh(t){return typeof t=="string"&&t.startsWith("builtin_")}function Mr(t={}){let{id:e,kind:r="generic",panelTitle:s="\u9884\u8BBE\u7BA1\u7406",panelHint:o="",store:n,renderEditor:a,renderExtras:i=null,renderListItemMeta:l=null,hasSwitchToButton:c=!1,onSwitchTo:d=null}=t;if(!n||typeof n.listPresets!="function")throw new Error("createPresetManagerPanel: store \u7F3A\u5C11\u5FC5\u8981\u7684 listPresets \u65B9\u6CD5");if(typeof a!="function")throw new Error("createPresetManagerPanel: \u5FC5\u987B\u63D0\u4F9B renderEditor");return{id:e,kind:r,renderTo(u){let y=tu(u);if(!y)return;if(y._yytPresetPanelCleanup)try{y._yytPresetPanelCleanup()}catch{}let p=()=>this.renderTo(u),f=n.listPresets(),g=typeof n.getCurrentPresetId=="function"?n.getCurrentPresetId():"",h=m("div",{className:"yyt-preset-manager-panel",style:{display:"flex",flexDirection:"column",gap:"14px"}});if(s||o){let R=m("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});s&&R.appendChild(m("div",{text:s,style:{fontSize:"15px",fontWeight:"700",color:"var(--yyt-text)"}})),o&&R.appendChild(m("div",{text:o,style:{fontSize:"12px",color:"var(--yyt-text-secondary)",lineHeight:"1.6"}})),h.appendChild(R)}let x=[],v=m("div",{style:{display:"flex",flexDirection:"column"}});if(f.length===0)v.appendChild(m("div",{text:'\u6682\u65E0\u9884\u8BBE\u3002\u70B9\u51FB\u4E0B\u65B9"\u65B0\u5EFA"\u521B\u5EFA\u7B2C\u4E00\u4E2A\u9884\u8BBE\u3002',style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"12px 0",textAlign:"center"}}));else for(let R of f){let S=R.id===g,U=Gh(R.id),j=typeof l=="function"?l(R)||[]:[],ie=[];c&&typeof d=="function"&&ie.push(ue({label:S?"\u2713 \u5DF2\u52A0\u8F7D":"\u52A0\u8F7D",size:"small",variant:S?"ghost":"primary",disabled:S,onClick:Te=>{Te.stopPropagation();try{d(R.id)}catch(ae){ls.warn("onSwitchTo \u5F02\u5E38",{err:ae})}p()}})),ie.push(ue({label:"\u590D\u5236",size:"small",variant:"ghost",title:"\u590D\u5236\u4E3A\u7528\u6237\u9884\u8BBE",onClick:async Te=>{Te.stopPropagation();try{let ae=n.duplicatePreset(R.id);ae?.id&&typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(ae.id),p()}catch(ae){ls.warn("duplicate \u5F02\u5E38",{err:ae})}}})),U||(ie.push(ue({label:"\u270E",size:"small",variant:"ghost",title:"\u91CD\u547D\u540D",onClick:async Te=>{Te.stopPropagation();let ae=await ke.prompt({title:"\u91CD\u547D\u540D\u9884\u8BBE",defaultValue:R.name,placeholder:"\u9884\u8BBE\u540D",validate:rt=>rt?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});ae&&ae!==R.name&&(n.renamePreset(R.id,ae),p())}})),ie.push(ue({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664",onClick:async Te=>{Te.stopPropagation(),await ke.confirm({title:"\u5220\u9664\u9884\u8BBE",message:`\u786E\u8BA4\u5220\u9664\u300C${R.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})&&(n.deletePreset(R.id),p())}})));let Oe=Oi({id:R.id,name:R.name,desc:R.description,active:S,builtin:U,metaChips:j,actions:ie,onClick:()=>{typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(R.id),p()}});v.appendChild(Oe.el)}let T=ue({label:"+ \u65B0\u5EFA\u9884\u8BBE",size:"small",variant:"primary",onClick:async()=>{let R=await ke.prompt({title:"\u65B0\u5EFA\u9884\u8BBE",placeholder:"\u9884\u8BBE\u540D\uFF08\u5FC5\u586B\uFF09",validate:S=>S?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});if(R)try{let S=n.createPreset({name:R});S?.id&&typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(S.id),p()}catch(S){ls.warn("createPreset \u5931\u8D25",{err:S}),await ke.confirm({title:"\u521B\u5EFA\u5931\u8D25",message:String(S?.message||S),confirmText:"\u786E\u5B9A"})}}}),L=Ft({heading:"\u9884\u8BBE\u9009\u62E9",icon:"\u{1F4CB}",actions:[T.el],content:[v]});x.push(L),h.appendChild(L.el);let M=g?f.find(R=>R.id===g):null;if(M){let R=null;try{R=a(M,{readonly:!1,onChange:U=>{if(!(!U||typeof U!="object"))try{n.updatePreset(M.id,U)}catch(j){ls.warn("updatePreset \u5931\u8D25",{err:j})}},refresh:p})}catch(U){ls.error("renderEditor \u5F02\u5E38",{err:U}),R=m("div",{text:`\u7F16\u8F91\u5668\u6E32\u67D3\u5F02\u5E38\uFF1A${U?.message||U}`,style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px"}})}let S=Ft({heading:`\u7F16\u8F91\u300C${M.name}\u300D`,icon:"\u270E",content:[R].filter(Boolean)});if(x.push(S),h.appendChild(S.el),typeof i=="function"){let U=null;try{U=i(M,{refresh:p})}catch(j){ls.warn("renderExtras \u5F02\u5E38",{err:j})}if(U){let j=Ft({heading:"\u9644\u52A0",icon:"\u{1F527}",content:[U]});x.push(j),h.appendChild(j.el)}}}else f.length>0&&h.appendChild(m("div",{text:"\u8BF7\u5728\u4E0A\u65B9\u5217\u8868\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE\u4EE5\u7F16\u8F91",style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"16px",textAlign:"center",border:"1px dashed var(--yyt-border, rgba(255,255,255,0.08))",borderRadius:"var(--yyt-radius-sm, 6px)"}}));let _=ue({label:"\u2B06 \u5BFC\u5165",size:"small",variant:"ghost",onClick:async()=>{await qh(n,p)}}),C=ue({label:"\u2B07 \u5BFC\u51FA",size:"small",variant:"ghost",onClick:()=>{Vh(n,r)}}),W=ue({label:"\u6E05\u7A7A\u5168\u90E8",size:"small",variant:"ghost",onClick:async()=>{await ke.confirm({title:"\u6E05\u7A7A\u6240\u6709\u9884\u8BBE",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u7528\u6237\u9884\u8BBE\uFF08\u5185\u7F6E\u9884\u8BBE\u4E0D\u53D7\u5F71\u54CD\uFF09\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002",confirmText:"\u6E05\u7A7A",danger:!0})&&typeof n.resetAll=="function"&&(n.resetAll(),p())}}),q=Li({items:[_,C,W],align:"end",gap:"8px"});h.appendChild(q.el),y.innerHTML="",y.appendChild(h),y._yytPresetPanelCleanup=()=>{for(let R of x)try{R.destroy()}catch{}delete y._yytPresetPanelCleanup}},destroy(u){let y=tu(u);if(y?._yytPresetPanelCleanup)try{y._yytPresetPanelCleanup()}catch{}},getStyles(){return""}}}async function qh(t,e){if(typeof t.importPresets!="function"){await ke.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u5165",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u5165\u3002",confirmText:"\u786E\u5B9A"});return}let r=m("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34\u5BFC\u51FA\u7684 JSON"},style:{width:"100%",minHeight:"180px",fontSize:"12px",fontFamily:"monospace"}}),s=ke.custom({title:"\u5BFC\u5165\u9884\u8BBE",width:"520px",body:r,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:n=>n(null)},{label:"\u4ECE\u6587\u4EF6\u2026",variant:"ghost",onClick:()=>{let n=m("input",{attrs:{type:"file",accept:"application/json,.json"}});n.addEventListener("change",()=>{let a=n.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{r.value=String(i.result||""),r.focus()},i.readAsText(a)}),n.click()}},{label:"\u5BFC\u5165",variant:"primary",onClick:async n=>{let a=r.value.trim();if(!a){n(null);return}let i;try{i=JSON.parse(a)}catch(l){await ke.confirm({title:"JSON \u89E3\u6790\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"});return}try{let l=t.importPresets(i);n(l)}catch(l){await ke.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"})}}}]});setTimeout(()=>r.focus(),0);let o=await s.result;o&&(o.added>0||o.imported>0)&&e()}function Vh(t,e){if(typeof t.exportAll!="function"){ke.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u51FA",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u51FA\u3002",confirmText:"\u786E\u5B9A"});return}let r=t.exportAll(),s=JSON.stringify(r,null,2),o=m("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});o.value=s,o.readOnly=!0,ke.custom({title:`\u5BFC\u51FA ${e||""} \u9884\u8BBE`,width:"600px",body:o,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:n=>n(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(s)}catch{o.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let n=new Blob([s],{type:"application/json"}),a=URL.createObjectURL(n),i=m("a",{attrs:{href:a,download:`${e||"preset"}_${Date.now()}.json`}});document.body.appendChild(i),i.click(),setTimeout(()=>{try{document.body.removeChild(i)}catch{}try{URL.revokeObjectURL(a)}catch{}},100)}catch(n){ls.warn("\u4E0B\u8F7D\u5931\u8D25",{err:n})}}}]})}var ls,jo=N(()=>{yr();H();ls=I.createScope("PresetManagerBase")});var su={};re(su,{ApiPresetPanel:()=>ru,default:()=>Zh});function Xh(t,{onChange:e,readonly:r}){let s=m("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}}),o=t.apiConfig||{};F(s,Tt({label:"\u63CF\u8FF0",control:Ze({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})})),F(s,vt({label:"\u4F7F\u7528\u4E3B API",hint:"\u5F00\u542F\u540E\u5FFD\u7565\u4E0B\u65B9 URL/Key/Model\uFF0C\u76F4\u63A5\u590D\u7528 SillyTavern \u4E3B\u8FDE\u63A5",checked:o.useMainApi!==!1,disabled:r,onChange:i=>e({apiConfig:{...o,useMainApi:i}})})),F(s,vt({label:"\u6D41\u5F0F\u8F93\u51FA\uFF08stream\uFF09",hint:"\u9010\u5B57\u63A5\u6536\u54CD\u5E94",checked:o.stream===!0,disabled:r,onChange:i=>e({apiConfig:{...o,stream:i}})})),F(s,Tt({label:"API URL",control:Ze({value:o.url||"",placeholder:"https://api.example.com/v1",disabled:r,onChange:i=>e({apiConfig:{...o,url:i}})})})),F(s,Tt({label:"API Key",control:(()=>{let i=Ze({value:o.apiKey||"",placeholder:"sk-...",disabled:r,onChange:l=>e({apiConfig:{...o,apiKey:l}})});try{i.el.setAttribute("type","password")}catch{}return i})()})),F(s,Tt({label:"\u6A21\u578B",control:Ze({value:o.model||"",placeholder:"gpt-4 / gemini-pro / claude-...",disabled:r,onChange:i=>e({apiConfig:{...o,model:i}})})}));let n=m("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"10px"}});function a(i,l,c,d="1"){let u=m("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});u.appendChild(m("label",{text:i,style:{fontSize:"11px",color:"var(--yyt-text-secondary)",fontWeight:"600"}}));let y=m("input",{className:"yyt-input",attrs:{type:"number",step:d,disabled:r?"disabled":null},style:{padding:"6px 10px",fontSize:"12px"}});return y.value=String(o[l]??c),y.addEventListener("change",()=>{let p=Number(y.value);Number.isFinite(p)&&e({apiConfig:{...o,[l]:p}})}),u.appendChild(y),u}return n.appendChild(a("max_tokens","max_tokens",4096,"1")),n.appendChild(a("temperature","temperature",.7,"0.05")),n.appendChild(a("top_p","top_p",.9,"0.05")),F(s,n),s}function Qh(t){let e=t.apiConfig||{},r=[];return e.useMainApi!==!1?r.push("\u4E3B API"):r.push(e.model||"\u81EA\u5B9A\u4E49"),t.starred&&r.push("\u2605"),r}var Pr,Jh,ru,Zh,ou=N(()=>{yr();Lo();H();jo();Pr=I.createScope("ApiPresetPanel"),Jh={listPresets(){return Ir().map(t=>({id:t.name,name:t.name,description:t.description||"",apiConfig:t.apiConfig||{},starred:t.starred===!0,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=os(t);return e?{id:e.name,...e,description:e.description||""}:null},getCurrentPresetId(){return Si()||""},setCurrentPresetId(t){if(!t)return!1;try{return!!zn(t)}catch(e){return Pr.warn("switchToPreset \u5931\u8D25",{err:e}),!1}},createPreset(t){let e=String(t?.name||"").trim();if(!e)return Pr.warn("createPreset: name \u7F3A\u5931"),null;let r=On({name:e,description:t?.description||"",apiConfig:t?.apiConfig||{}});return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(Pr.warn("createPreset \u5931\u8D25",{msg:r?.message}),null)},updatePreset(t,e){if(!t)return null;let r=wi(t,e);return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(Pr.warn("updatePreset \u5931\u8D25",{id:t,msg:r?.message}),null)},deletePreset(t){if(!t)return!1;try{let e=Bn(t);return!!(e?.success??e===!0)}catch(e){return Pr.warn("deletePreset \u5931\u8D25",{err:e}),!1}},duplicatePreset(t,e={}){if(!t)return null;let r=e.nameSuffix||"_\u526F\u672C",s=`${t}${r}`;try{let o=Ti(t,s);return o?.success?{id:o.preset.name,...o.preset,description:o.preset.description||""}:null}catch(o){return Pr.warn("duplicatePreset \u5931\u8D25",{err:o}),null}},renamePreset(t,e){if(!t||!e)return null;try{let r=vi(t,e);return r?.success?{id:r.preset?.name||e,...r.preset,description:r.preset?.description||""}:null}catch(r){return Pr.warn("renamePreset \u5931\u8D25",{err:r}),null}},exportAll(){let t=_i();try{return{version:1,exportedAt:Date.now(),presets:JSON.parse(t)}}catch{return{version:1,exportedAt:Date.now(),presets:[]}}},importPresets(t){if(!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[t],r=JSON.stringify(e);return{added:Ei(r,{overwrite:!1})?.imported||0}},resetAll(){let t=Ir();for(let e of t)try{Bn(e.name)}catch{}}};ru=Mr({id:"apiPresetPanel",kind:"api",panelTitle:"API \u9884\u8BBE",panelHint:'\u7BA1\u7406\u591A\u7EC4 API \u8FDE\u63A5\u914D\u7F6E\u3002\u70B9\u51FB"\u52A0\u8F7D"\u6FC0\u6D3B\u67D0\u4E2A\u9884\u8BBE\u4F5C\u4E3A\u5F53\u524D API\uFF1B\u5176\u4ED6\u5DE5\u5177\u53EF\u5728\u914D\u7F6E\u9762\u677F\u4E2D\u6309\u9884\u8BBE\u540D\u5F15\u7528\u3002',store:Jh,renderEditor:Xh,renderListItemMeta:Qh,hasSwitchToButton:!0,onSwitchTo:t=>{try{zn(t)}catch(e){Pr.warn("switchToPreset",{err:e})}}}),Zh=ru});function Ki(){return`wb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Dr(){let t=Ee.get(zi);return!t||typeof t!="object"?{}:t}function Hn(t){Ee.set(zi,t)}function ds(t){return typeof t=="string"&&t.startsWith(eb)}function nu(t){return ds(t)&&Wn.find(e=>e.id===t)||null}function Ui(t){if(!Array.isArray(t)){Wn=[];return}Wn=t.map(e=>Nr({...e,id:String(e?.id||"")})).filter(e=>ds(e.id))}function Nr(t={}){let e=String(t.id||Ki()),r=Array.isArray(t.bookList)?t.bookList.map(s=>({bookName:String(s?.bookName||""),enabled:s?.enabled!==!1,entryOverrides:s?.entryOverrides&&typeof s.entryOverrides=="object"?s.entryOverrides:{}})).filter(s=>s.bookName):[];return{id:e,name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),bindingMode:t.bindingMode===fr.CUSTOM?fr.CUSTOM:fr.CHARACTER_CARD,includeDisabled:t.includeDisabled===!0,bookList:r,createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function tb(){let t=Dr(),e=new Set,r=[];for(let o of Wn){let n=t[o.id];n?(r.push(Nr(n)),e.add(o.id)):r.push(o)}let s=Object.values(t).map(Nr).filter(o=>!e.has(o.id)).sort((o,n)=>n.updatedAt-o.updatedAt);return r.push(...s),r}function Wo(t){if(!t)return null;let e=Dr();return e[t]?Nr(e[t]):ds(t)?nu(t):null}function ji(){let t=Ee.get(Fo);return typeof t=="string"&&t?t:""}function rb(){let t=ji();return t?Wo(t):null}function sb(t){if(t&&ds(t))return Ee.set(Fo,t),K.emit(B.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0;let e=Dr();return t&&!e[t]?(cs.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(Ee.set(Fo,t||""),K.emit(B.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0)}function Yn(t={}){let e=Nr({...t,id:Ki(),createdAt:Date.now(),updatedAt:Date.now()}),r=Dr();return r[e.id]=e,Hn(r),K.emit(B.PRESET_CREATED,{kind:"worldbook",id:e.id}),cs.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function au(t,e={},{silent:r=!1}={}){if(!t)return null;let s=Dr(),o=s[t];if(!o&&ds(t)&&(o=nu(t)),!o)return cs.warn(`updatePreset \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),null;let n=Nr({...o,...e,id:t,createdAt:o.createdAt,updatedAt:Date.now()});return s[t]=n,Hn(s),r||K.emit(B.PRESET_UPDATED,{kind:"worldbook",id:t}),n}function ob(t){if(!t)return!1;if(ds(t))return cs.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=Dr();return e[t]?(delete e[t],Hn(e),ji()===t&&Ee.set(Fo,""),K.emit(B.PRESET_DELETED,{kind:"worldbook",id:t}),cs.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function nb(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=Wo(t);return r?Yn({...r,id:void 0,name:`${r.name}${e}`}):null}function ab(t,e){return ds(t)?(cs.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):au(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function ib(){return{version:1,exportedAt:Date.now(),presets:Object.values(Dr()).map(Nr)}}function lb(t){if(!t||typeof t!="object")return{added:0,skipped:0};let e=Array.isArray(t.presets)?t.presets:[],r=Dr(),s=0,o=0;for(let n of e){let a=Nr({...n,id:Ki(),createdAt:Date.now(),updatedAt:Date.now()});r[a.id]=a,s+=1}return Hn(r),s>0&&K.emit(B.PRESET_IMPORTED,{kind:"worldbook",count:s}),{added:s,skipped:o}}function cb(){Ee.set(zi,{}),Ee.set(Fo,""),cs.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u4E16\u754C\u4E66\u9884\u8BBE")}var cs,zi,Fo,fr,eb,Wn,pt,Fs=N(()=>{ze();Ge();H();cs=I.createScope("WorldbookPresetStore"),zi="worldbook_presets",Fo="worldbook_current_preset",fr=Object.freeze({CHARACTER_CARD:"character_card",CUSTOM:"custom"});eb="builtin_worldbook_",Wn=[];pt={listPresets:tb,getPreset:Wo,getCurrentPresetId:ji,getCurrentPreset:rb,setCurrentPresetId:sb,createPreset:Yn,updatePreset:au,deletePreset:ob,duplicatePreset:nb,renamePreset:ab,exportAll:ib,importPresets:lb,resetAll:cb,BINDING_MODES:fr}});function $r(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Gn(){return $r()?.SillyTavern||null}function xe(t){return t==null?"":String(t).trim()}function ub(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let r of e)if(typeof r=="string"&&r.trim())return r.trim();return""}function pb(t){let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||t?.is_user===!0?"user":t?.is_system===!0?"system":"assistant"}function lu(t=""){let e=String(t||"").trim();if(!e)return"empty";let r=0;for(let s=0;s<e.length;s+=1)r=(r<<5)-r+e.charCodeAt(s),r|=0;return`fp_${Math.abs(r).toString(36)}`}function cu(t={}){let e=xe(t.chatId)||"chat_default",r=xe(t.messageId)||"latest";return`${e}::${r}`}function du(t={}){let e=cu(t),r=xe(t.effectiveSwipeId)||"swipe:current",s=xe(t.assistantContentFingerprint)||"empty";return`${e}::${r}::${s}`}function yb(t={}){let e=du(t),r=xe(t.eventType)||"MANUAL",s=xe(t.traceId)||uu("manual");return`${e}::${r}::${s}`}function uu(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function pu(){let t=Gn();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function yu(t=[]){let e=[],r=null,s=null;return t.forEach((o,n)=>{let a=pb(o),i=ub(o);if(!i)return;let l=xe(o?.messageId??o?.message_id??o?.id??o?.mid??o?.mesid??o?.chat_index??n),c=xe(o?.swipe_id??o?.swipeId??o?.swipe??""),d={role:a,content:i,sourceId:l,swipeId:c,raw:o,index:n};e.push(d),a==="user"&&(r=d),a==="assistant"&&(s=d)}),{messages:e,lastUserMessage:r,lastAiMessage:s}}function fb(t,e,r){return xe(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.this_chid??r?.id??"chat_default")||"chat_default"}async function Fi(){let t=Gn();if(!t)return null;try{let e=t.this_chid,r=t.characters||[];if(e>=0&&e<r.length){let s=r[e];return{id:e,name:s?.name||"",description:s?.description||"",personality:s?.personality||"",scenario:s?.scenario||"",firstMes:s?.first_mes||"",mesExample:s?.mes_example||""}}}catch(e){db.error("\u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function gb(t="",e=null){let r=String(t||""),s=e?.YouYouToolkit_toolOutputs;return s&&typeof s=="object"&&Object.values(s).forEach(o=>{let n=String(o?.blockText||o?.content||"").trim();n&&r.includes(n)&&(r=r.replace(n,"").trimEnd())}),r.trim()}function mb(t,e={}){let r=Array.isArray(t?.messages)?t.messages:[],s=xe(e.messageId),o=xe(e.swipeId);if(!s)return t?.lastAiMessage||null;let n=r.filter(i=>i.role==="assistant"),a=n.find(i=>i.sourceId!==s?!1:o?xe(i.swipeId)===o:!0);return a||n.find(i=>i.sourceId===s)||null}function fu({api:t,stContext:e,character:r,conversation:s,targetAssistantMessage:o,runSource:n="MANUAL"}={}){let a=s?.messages||[],i=s?.lastUserMessage||null,l=xe(o?.sourceId)||"",c=xe(o?.swipeId)||"swipe:current",d=o?.content||"",u=gb(d,o?.raw||null),y=lu(d),p=lu(u),f=fb(t,e,r),g=uu(String(n||"manual").toLowerCase()),h=cu({chatId:f,messageId:l}),x=du({chatId:f,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:p});return{startedAt:Date.now(),runSource:n,traceId:g,chatId:f,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:h,slotRevisionKey:x,slotTransactionId:yb({chatId:f,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:p,eventType:n,traceId:g}),executionKey:x,lastAiMessage:d,assistantContentFingerprint:y,assistantBaseText:u,assistantBaseFingerprint:p,lastAiMessageSwipeId:c,confirmedAssistantSwipeId:c,effectiveSwipeId:c,sourceMessageId:l,sourceSwipeId:c,lastUserMessage:i?.content||"",userMessage:i?.content||"",targetAssistantMessage:o,chatMessages:a,characterCard:r,chatHistory:a,input:{userMessage:i?.content||"",lastAiMessage:d,assistantBaseText:u,extractedContent:"",previousToolOutput:"",context:{character:r?.name||"",chatLength:a.length||0}},config:{},status:"pending"}}async function us({runSource:t="MANUAL"}={}){let e=Gn(),r=e?.getContext?.()||null,s=await Fi(),o=pu(),n=yu(o),a=n?.lastAiMessage||null;return fu({api:e,stContext:r,character:s,conversation:n,targetAssistantMessage:a,runSource:t})}async function ps({messageId:t,swipeId:e="",runSource:r="AUTO"}={}){let s=Gn(),o=s?.getContext?.()||null,n=await Fi(),a=pu(),i=yu(a),l=mb(i,{messageId:t,swipeId:e});return fu({api:s,stContext:o,character:n,conversation:i,targetAssistantMessage:l,runSource:r})}var db,ys=N(()=>{H();db=I.createScope("ExecutionContext")});function qn(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return $r()?.TavernHelper||null}function gu(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return $r()?.SillyTavern||null}function Ws(t){return Array.isArray(t)?Array.from(new Set(t.map(e=>String(e||"").trim()).filter(Boolean))):[]}function Wi(t){if(Array.isArray(t))return t.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(t&&typeof t=="object"){let e={};return Object.keys(t).forEach(r=>{let s=t[r];Array.isArray(s)?e[r]=s.map(o=>typeof o=="string"?o:o&&typeof o=="object"?o.name||o.id||o.title||"[object]":String(o??"")):s&&typeof s=="object"?e[r]="[object]":e[r]=s}),e}return t}function bb(t={}){let e=typeof t.content=="string"?t.content.trim():"";if(!e)return"";let r=[t.comment,t.key,t.keysecondary,t.text].map(s=>String(s||"").trim()).find(Boolean);return r&&r!==e?`## ${r}
${e}`:e}function Yi(){return Array.isArray(Hi)?[...Hi]:[]}async function mu(t){if(!t||typeof t.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(t.getCharLorebooks({type:"all"}));return Ws([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return fs.warn("\u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function xb(t,e){if(t&&typeof t.getLorebooks=="function")try{let r=Ws(await Promise.resolve(t.getLorebooks()));if(r.length>0)return r}catch(r){fs.warn("\u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}if(e&&typeof e.getWorldBooks=="function")try{let r=await Promise.resolve(e.getWorldBooks()),s=Ws(Array.isArray(r)?r.map(o=>o?.name??o):[]);if(s.length>0)return s}catch(r){fs.warn("\u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}return[]}async function Gi(){let t=qn(),e=gu(),r={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!$r()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!$r()?.SillyTavern,helperKeys:t?Object.keys(t).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof t?.getLorebooks,getCharLorebooksType:typeof t?.getCharLorebooks,getLorebookEntriesType:typeof t?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{r.rawResults.getLorebooks=t&&typeof t.getLorebooks=="function"?Wi(await Promise.resolve(t.getLorebooks())):"[unavailable]"}catch(a){r.errors.push(`getLorebooks: ${a?.message||a}`)}try{r.rawResults.getCharLorebooks=t&&typeof t.getCharLorebooks=="function"?Wi(await Promise.resolve(t.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(a){r.errors.push(`getCharLorebooks: ${a?.message||a}`)}try{r.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?Wi(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(a){r.errors.push(`getWorldBooks: ${a?.message||a}`)}let s=await mu(t),o=await xb(t,e),n=Ws([...s,...o]);return r.characterWorldbooks=[...s],r.allWorldbooks=[...o],r.combinedWorldbooks=[...n],hb=r,Hi=n,[...n]}async function Vn(t){let e="";if(typeof t=="string"?e=t:t&&typeof t=="object"&&(e=t?.worldbooks?.presetId||""),!e)return"";let r=Wo(e);if(!r)return fs.warn(`buildSelectedWorldbookContent: \u9884\u8BBE\u4E0D\u5B58\u5728 ${e}`),"";let s=r.includeDisabled===!0,o=[];if(r.bindingMode==="character_card"){let l=qn(),c=gu(),d=await mu(l),u=new Map((r.bookList||[]).map(y=>[String(y.bookName||""),y]));for(let y of Ws(d)){let p=u.get(y);p&&p.enabled===!1||o.push(y)}}else o=(r.bookList||[]).filter(l=>l&&l.bookName&&l.enabled!==!1).map(l=>l.bookName);if(o=Ws(o),o.length===0)return"";let n=qn();if(!n||typeof n.getLorebookEntries!="function")return fs.warn("TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let a=new Map((r.bookList||[]).map(l=>[l.bookName,l.entryOverrides||{}])),i=[];for(let l of o)try{let c=await n.getLorebookEntries(l),d=Array.isArray(c)?c:[],u=a.get(l)||{},p=d.filter(f=>s||f?.enabled!==!1&&!f?.disable).filter(f=>{let g=u[String(f?.uid??"")];return g&&typeof g.enabled=="boolean"?g.enabled:!0}).map(bb).filter(Boolean).join(`

`);p&&i.push(`[\u4E16\u754C\u4E66\uFF1A${l}]
${p}`)}catch(c){fs.warn(`\u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${l}`,c)}return i.join(`

---

`)}async function hu(t){if(!t)return[];let e=qn();if(!e||typeof e.getLorebookEntries!="function")return[];try{let r=await e.getLorebookEntries(t);return Array.isArray(r)?r:[]}catch(r){return fs.warn(`getEntriesForBook \u5931\u8D25: ${t}`,r),[]}}var fs,Hi,hb,Jn=N(()=>{ys();H();Fs();fs=I.createScope("ToolWorldbookService"),Hi=[],hb=null});var vu={};re(vu,{WorldbookPresetPanel:()=>wu,default:()=>Ab});function wb(t){return t===fr.CUSTOM?"\u81EA\u5B9A\u4E49":"\u8DDF\u968F\u89D2\u8272\u5361"}function bu(t,e,r){let s=[...t.bookList],o=s.findIndex(n=>n.bookName===e);o>=0?s[o]={...s[o],enabled:r}:s.push({bookName:e,enabled:r,entryOverrides:{}}),pt.updatePreset(t.id,{bookList:s})}function vb(t,e){let r=t.bookList.filter(s=>s.bookName!==e);pt.updatePreset(t.id,{bookList:r})}async function Tb(t,e){let r=Yi();if(!r.length)try{r=await Gi()}catch{}let s=new Set(t.bookList.map(d=>d.bookName)),o=r.filter(d=>!s.has(d));if(!o.length){await ke.confirm({title:"\u6CA1\u6709\u53EF\u6DFB\u52A0\u7684\u4E16\u754C\u4E66",message:"\u5BBF\u4E3B\u672A\u63D0\u4F9B\u66F4\u591A\u53EF\u7528\u4E16\u754C\u4E66\uFF0C\u6216\u7F13\u5B58\u5185\u5168\u90E8\u5DF2\u52A0\u5165\u6B64\u9884\u8BBE\u3002",confirmText:"\u786E\u5B9A"});return}let n=m("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}}),a=m("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${o.length} \u672C\u4E16\u754C\u4E66\u2026`,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});n.appendChild(a);let i=m("div",{style:{display:"flex",flexDirection:"column",gap:"4px",maxHeight:"320px",overflowY:"auto"}}),l=new Set,c=[];for(let d of o){let u=m("label",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 10px",cursor:"pointer",borderRadius:"var(--yyt-radius-sm, 6px)",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",fontSize:"12px"}}),y=m("input",{attrs:{type:"checkbox",value:d}});y.addEventListener("change",()=>{y.checked?l.add(d):l.delete(d)}),u.appendChild(y),u.appendChild(m("span",{text:d,style:{color:"var(--yyt-text)"}})),i.appendChild(u),c.push({el:u,search:d.toLowerCase()})}n.appendChild(i),a.addEventListener("input",()=>{let d=a.value.trim().toLowerCase();for(let u of c)u.el.style.display=!d||u.search.includes(d)?"":"none"}),ke.custom({title:`\u6DFB\u52A0\u4E16\u754C\u4E66\uFF08${o.length} \u9879\u53EF\u9009\uFF09`,width:"480px",body:n,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:d=>d(null)},{label:"\u5168\u9009\u53EF\u89C1",variant:"ghost",onClick:()=>{for(let d of i.querySelectorAll("input[type=checkbox]")){let u=d.closest("label");(!u||u.style.display!=="none")&&(d.checked=!0,l.add(d.value))}}},{label:"\u6DFB\u52A0\u9009\u4E2D",variant:"primary",onClick:d=>{let u=Array.from(l);if(!u.length){d(null);return}let y=u.map(f=>({bookName:f,enabled:!0,entryOverrides:{}})),p=[...t.bookList,...y];pt.updatePreset(t.id,{bookList:p}),d(u.length)}}]}).result.then(d=>{d&&e&&e()})}function Sb(t,{onChange:e,readonly:r,refresh:s}){let o=m("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});F(o,Tt({label:"\u63CF\u8FF0",control:Ze({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:u=>e({description:u})})})),F(o,Tt({label:"\u7ED1\u5B9A\u6A21\u5F0F",hint:"\u8DDF\u968F\u89D2\u8272\u5361 = \u6CE8\u5165\u5F53\u524D\u89D2\u8272\u7ED1\u5B9A\u7684\u4E16\u754C\u4E66\uFF1B\u81EA\u5B9A\u4E49 = \u7528\u4E0B\u65B9\u624B\u52A8\u9009\u62E9\u7684\u5217\u8868",control:Ve({value:t.bindingMode,disabled:r,options:[{value:fr.CHARACTER_CARD,label:"\u8DDF\u968F\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09"},{value:fr.CUSTOM,label:"\u81EA\u5B9A\u4E49\uFF08\u56FA\u5B9A\u5217\u8868\uFF09"}],onChange:u=>{e({bindingMode:u}),s&&s()}})})),F(o,vt({label:"\u5305\u542B\u7981\u7528\u8BCD\u6761",hint:"\u5F00\u542F\u540E\uFF1A\u6E90\u4E16\u754C\u4E66\u4E2D\u5DF2\u7981\u7528\u7684\u8BCD\u6761\u53EF\u88AB\u672C\u9884\u8BBE\u5F3A\u5236\u542F\u7528\u5E76\u6CE8\u5165",checked:t.includeDisabled,disabled:r,onChange:u=>e({includeDisabled:u})}));let n=t.bindingMode===fr.CHARACTER_CARD,a=Yi(),i=m("div",{style:{display:"flex",flexDirection:"column"}}),l=m("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px",gap:"8px"}});l.appendChild(m("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}},m("div",{text:n?"\u968F\u89D2\u8272\u5361\u6CE8\u5165\u7684\u4E16\u754C\u4E66":"\u9009\u4E2D\u7684\u4E16\u754C\u4E66",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:n?"\u4EE5\u4E0B\u6765\u81EA\u5F53\u524D\u89D2\u8272\u5361\u7684\u4E16\u754C\u4E66\u5C06\u88AB\u6CE8\u5165\uFF1B\u53EF\u5355\u72EC\u5173\u95ED\u67D0\u672C\uFF08\u4E0D\u5F71\u54CD\u5176\u4ED6\u5DE5\u5177\uFF09":'\u672C\u9884\u8BBE\u56FA\u5B9A\u6CE8\u5165\u4E0B\u5217\u4E16\u754C\u4E66\uFF1B\u70B9\u51FB"+ \u6DFB\u52A0"\u4ECE\u53EF\u7528\u5217\u8868\u591A\u9009',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.5"}})));let c=m("div",{style:{display:"flex",gap:"6px"}});!n&&!r&&c.appendChild(ue({label:"+ \u6DFB\u52A0",size:"small",onClick:()=>Tb(t,s)}).el),c.appendChild(ue({label:"\u{1F504} \u5237\u65B0",size:"small",variant:"ghost",onClick:async()=>{try{await Gi()}catch(u){xu.warn("\u5237\u65B0\u5931\u8D25",{e:u})}s&&s()}}).el),l.appendChild(c),F(i,l);let d=[];n?a.length?d=a.map(u=>{let y=t.bookList.find(f=>f.bookName===u),p=y?y.enabled!==!1:!0;return Un({name:u,desc:p?"\u5DF2\u542F\u7528 \xB7 \u6574\u672C\u6CE8\u5165":"\u5DF2\u7981\u7528",actions:[vt({checked:p,disabled:r,onChange:f=>bu(t,u,f)})]})}):d=[m("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5F53\u524D\u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014 \u5207\u6362\u5230"\u81EA\u5B9A\u4E49"\u53EF\u4EE5\u624B\u52A8\u9009\u62E9\u4EFB\u610F\u4E16\u754C\u4E66\u3002'})]:t.bookList.length?d=t.bookList.map(u=>{let y=Object.keys(u.entryOverrides||{}).filter(g=>{let h=u.entryOverrides[g];return h&&typeof h.enabled=="boolean"}).length,p=m("div",{style:{display:"flex",flexDirection:"column"}}),f=Un({name:u.bookName,desc:u.enabled===!1?"\u5DF2\u7981\u7528":`\u5DF2\u542F\u7528 \xB7 \u6574\u672C\u6CE8\u5165${y?` \xB7 ${y} \u6761 override`:""}`,actions:[ue({label:"\u25B8 \u8BCD\u6761",size:"small",variant:"ghost",title:"\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override",onClick:()=>_b(p,t,u,r,s)}),vt({checked:u.enabled!==!1,disabled:r,onChange:g=>bu(t,u.bookName,g)}),...r?[]:[ue({label:"\xD7",size:"small",variant:"ghost",title:"\u4ECE\u9884\u8BBE\u79FB\u9664",onClick:()=>{vb(t,u.bookName),s&&s()}})]]});return f?.el&&F(p,f.el),p}):d=[m("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u6DFB\u52A0"\u9009\u62E9\u4E16\u754C\u4E66\u52A0\u5165\u6B64\u9884\u8BBE\u3002'})];for(let u of d)u?.el?F(i,u.el):u instanceof Node&&F(i,u);return F(o,i),o}function _b(t,e,r,s,o){let n=t.querySelector(".yyt-wb-entry-panel");if(n){n.remove();let l=t.querySelector('[title="\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override"]');l&&(l.textContent="\u25B8 \u8BCD\u6761");return}let a=t.querySelector('[title="\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override"]');a&&(a.textContent="\u25BE \u8BCD\u6761");let i=m("div",{className:"yyt-wb-entry-panel",style:{marginLeft:"18px",marginTop:"4px",padding:"8px 10px",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-border, rgba(255,255,255,0.06))",fontSize:"12px",display:"flex",flexDirection:"column",gap:"4px"}});i.appendChild(m("div",{text:"\u52A0\u8F7D\u4E2D\u2026",style:{color:"var(--yyt-text-muted)",padding:"4px 0"}})),t.appendChild(i),hu(r.bookName).then(l=>{if(!l.length){i.innerHTML="",i.appendChild(m("div",{text:"\u8BE5\u4E16\u754C\u4E66\u65E0\u8BCD\u6761",style:{color:"var(--yyt-text-muted)",padding:"4px 0"}}));return}let c=r.entryOverrides||{};i.innerHTML="";let d=m("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${l.length} \u4E2A\u8BCD\u6761\u2026`,autocomplete:"off"},style:{padding:"5px 8px",fontSize:"11px",marginBottom:"4px",flexShrink:"0"}});i.appendChild(d);let u=m("div",{style:{display:"flex",flexDirection:"column",gap:"2px",height:"260px",overflowY:"scroll",overscrollBehavior:"contain",WebkitOverflowScrolling:"touch"}}),y=e.includeDisabled===!0,p=[];for(let f of l){let g=String(f.uid??""),h=f.comment||f.key||f.name||"",x=String(Array.isArray(h)?h[0]:h).trim()||`\u6761\u76EE ${f.uid}`,v=f.enabled===!1||f.disable===!0,T=c[g],L=T&&typeof T.enabled=="boolean",M=v&&!L&&!y,_=m("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"5px 8px",borderRadius:"4px",background:L?"rgba(123,183,255,0.08)":"transparent",opacity:M?"0.4":"1"}}),C=S=>{_.style.background=S?"rgba(123,183,255,0.08)":"transparent",R.style.color=S?"var(--yyt-accent)":"var(--yyt-text)",S?W||(W=q(),_.appendChild(W)):(W&&(W.remove(),W=null),_.style.opacity=v?"0.4":"1")},W=null,q=()=>{let S=m("span",{text:"\u2715",style:{cursor:"pointer",color:"var(--yyt-text-muted)",fontSize:"10px",flexShrink:"0"},attrs:{title:"\u6E05\u9664 override"}});return S.addEventListener("click",U=>{if(U.stopPropagation(),s)return;let j=pt.getPreset(e.id);if(!j)return;let ie=j.bookList.find(Oe=>Oe.bookName===r.bookName);ie&&(ie.entryOverrides=ie.entryOverrides||{},delete ie.entryOverrides[g],pt.updatePreset(e.id,{bookList:[...j.bookList]},{silent:!0}),W=null,C(!1))}),S};_.appendChild(vt({checked:L?T.enabled:!v,disabled:s||M,onChange:S=>{let U=pt.getPreset(e.id);if(!U)return;let j=U.bookList.find(Te=>Te.bookName===r.bookName);if(!j)return;j.entryOverrides=j.entryOverrides||{};let ie=!v;S===ie?delete j.entryOverrides[g]:j.entryOverrides[g]={enabled:S};let Oe=S!==ie;pt.updatePreset(e.id,{bookList:[...U.bookList]},{silent:!0}),C(Oe),_.style.opacity=M?"0.4":"1"}}).el);let R=m("span",{style:{flex:"1",minWidth:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:L?"var(--yyt-accent)":"var(--yyt-text)",fontSize:"11px"},text:x+(M?" (\u6E90\u7981\u7528)":"")});_.appendChild(R),L&&(W=q(),_.appendChild(W)),u.appendChild(_),p.push({el:_,search:x.toLowerCase()})}i.appendChild(u),d.addEventListener("input",()=>{let f=d.value.trim().toLowerCase();for(let g of p)g.el.style.display=!f||g.search.includes(f)?"":"none"})}).catch(l=>{xu.warn("\u52A0\u8F7D\u8BCD\u6761\u5931\u8D25",l),i.innerHTML="",i.appendChild(m("div",{text:`\u52A0\u8F7D\u5931\u8D25\uFF1A${l?.message||l}`,style:{color:"var(--yyt-danger, #f87171)",padding:"4px 0"}}))})}function Eb(t){let e=[`${wb(t.bindingMode)}`,`${t.bookList.length} \u672C`];return t.includeDisabled&&e.push("\u542B\u7981\u7528"),e}var xu,wu,Ab,Tu=N(()=>{yr();Fs();Jn();Fn();H();jo();xu=I.createScope("WorldbookPresetPanel");wu=Mr({id:"worldbookPresetPanel",kind:"worldbook",panelTitle:"\u4E16\u754C\u4E66\u9884\u8BBE",panelHint:"\u7BA1\u7406\u4E16\u754C\u4E66\u6CE8\u5165\u9884\u8BBE\u3002\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\uFF0C\u53EF\u7ED1\u5B9A\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09\u6216\u56FA\u5B9A\u5217\u8868\u3002",store:pt,renderEditor:Sb,renderListItemMeta:Eb}),Ab=wu});var el={};re(el,{MESSAGE_MACROS:()=>Hu,addTagRule:()=>Du,createRuleTemplate:()=>Ru,default:()=>Ib,deleteRulePreset:()=>Uu,deleteRuleTemplate:()=>Pu,deleteTagRule:()=>Lu,escapeRegex:()=>gs,exportRulesConfig:()=>ju,extractComplexTag:()=>_u,extractCurlyBraceTag:()=>Qi,extractHtmlFormatTag:()=>Eu,extractSimpleTag:()=>Xi,extractTagContent:()=>mr,generateTagSuggestions:()=>Cu,getAllRulePresets:()=>zu,getAllRuleTemplates:()=>ku,getContentBlacklist:()=>Ys,getRuleTemplate:()=>Iu,getTagRules:()=>Hs,importRulesConfig:()=>Fu,isValidTagName:()=>Ji,loadRulePreset:()=>Ku,saveRulesAsPreset:()=>Bu,scanTextForTags:()=>Au,setContentBlacklist:()=>Ou,setTagRules:()=>Nu,shouldSkipContent:()=>Vi,testRegex:()=>Wu,updateRuleTemplate:()=>Mu,updateTagRule:()=>$u});function Cb(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...qi],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function St(){return $.get(Su,Cb())}function Xt(t){$.set(Su,t)}function Xn(){let t=St();return nt=t.ruleTemplates||[...qi],Pe=t.tagRules||[],ht=t.contentBlacklist||[],{ruleTemplates:nt,tagRules:Pe,contentBlacklist:ht}}function gs(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Vi(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let r=t.toLowerCase();return e.some(s=>{let o=s.trim().toLowerCase();return o&&r.includes(o)})}function Ji(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!kb.includes(t.toLowerCase())}function Xi(t,e){if(!t||!e)return[];let r=[],s=gs(e),o=new RegExp(`<${s}>([\\s\\S]*?)<\\/${s}>`,"gi");[...t.matchAll(o)].forEach(l=>{l[1]&&r.push(l[1].trim())});let a=(t.match(new RegExp(`<${s}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${s}>`,"gi"))||[]).length;return a>i&&gr.warn(`\u53D1\u73B0 ${a-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),r}function Qi(t,e){if(!t||!e)return[];let r=[],s=gs(e),o=new RegExp(`\\{${s}\\|`,"gi"),n;for(;(n=o.exec(t))!==null;){let a=n.index,i=a+n[0].length,l=1,c=i;for(;c<t.length&&l>0;)t[c]==="{"?l++:t[c]==="}"&&l--,c++;if(l===0){let d=t.substring(i,c-1);d.trim()&&r.push(d.trim())}o.lastIndex=a+1}return r}function _u(t,e){if(!t||!e)return[];let r=e.split(",");if(r.length!==2)return gr.error(`\u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let s=r[0].trim(),o=r[1].trim(),n=o.match(/<\/(\w+)>/);if(!n)return gr.error(`\u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${o}`),[];let a=n[1],i=new RegExp(`${gs(s)}([\\s\\S]*?)<\\/${a}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(d=>{d[1]&&l.push(d[1].trim())}),l}function Eu(t,e){if(!t||!e)return[];let r=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!r)return gr.error(`\u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let s=r[1],o=[],n=new RegExp(`<${s}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${s}>`,"gi");[...t.matchAll(n)].forEach(c=>{c[1]&&o.push(c[1].trim())});let i=(t.match(new RegExp(`<${s}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${s}>`,"gi"))||[]).length;return i>l&&gr.warn(`\u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${s}> \u6807\u7B7E`),o}function mr(t,e,r=[]){if(!t)return"";if(!e||e.length===0)return t;let s=e.filter(d=>d.type==="exclude"&&d.enabled),o=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),n=e.filter(d=>d.type==="regex_exclude"&&d.enabled),a=t;for(let d of s)try{let u=new RegExp(`<${gs(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${gs(d.value)}>`,"gi");a=a.replace(u,"")}catch(u){gr.error("Error applying block exclusion rule:",{rule:d,error:u})}let i=[];if(o.length>0)for(let d of o){let u=[];try{if(d.type==="include")u.push(...Xi(a,d.value)),u.push(...Qi(a,d.value));else if(d.type==="regex_include"){let y=new RegExp(d.value,"gi");[...a.matchAll(y)].forEach(f=>{f[1]&&u.push(f[1])})}}catch(y){gr.error("Error applying inclusion rule:",{rule:d,error:y})}u.forEach(y=>i.push(y.trim()))}else i.push(a);let l=[];for(let d of i){for(let u of n)try{let y=new RegExp(u.value,"gi");d=d.replace(y,"")}catch(y){gr.error("Error applying cleanup rule:",{rule:u,error:y})}Vi(d,r)||l.push(d)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function Au(t,e={}){let r=performance.now(),{chunkSize:s=5e4,maxTags:o=100,timeoutMs:n=5e3}=e,a=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let u=0;u<t.length;u+=s){let y=t.slice(u,Math.min(u+s,t.length));if(c++,l+=y.length,performance.now()-r>n){gr.warn(`Tag scanning timed out after ${n}ms`);break}let p;for(;(p=i.exec(y))!==null&&a.size<o;){let f=(p[1]||p[2]).toLowerCase();Ji(f)&&a.add(f)}if(a.size>=o)break;c%5===0&&await new Promise(f=>setTimeout(f,0))}let d=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(d-r),processedChars:l,totalChars:t.length,chunkCount:c,tagsFound:a.size}}}function Cu(t,e=25){let r=t.tags.slice(0,e);return{suggestions:r,stats:{totalFound:t.stats.tagsFound,finalCount:r.length}}}function ku(){return nt.length===0&&Xn(),nt}function Iu(t){return nt.find(e=>e.id===t)}function Ru(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return nt.push(e),Zi(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function Mu(t,e){let r=nt.findIndex(s=>s.id===t);return r===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(nt[r]={...nt[r],...e,updatedAt:new Date().toISOString()},Zi(),{success:!0,template:nt[r],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function Pu(t){let e=nt.findIndex(r=>r.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(nt.splice(e,1),Zi(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function Zi(){let t=St();t.ruleTemplates=nt,Xt(t)}function Hs(){return Pe||Xn(),Pe}function Nu(t){Pe=t||[];let e=St();e.tagRules=Pe,Xt(e)}function Du(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};Pe.push(e);let r=St();return r.tagRules=Pe,Xt(r),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function $u(t,e){if(t<0||t>=Pe.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};Pe[t]={...Pe[t],...e};let r=St();return r.tagRules=Pe,Xt(r),{success:!0,rule:Pe[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function Lu(t){if(t<0||t>=Pe.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};Pe.splice(t,1);let e=St();return e.tagRules=Pe,Xt(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Ys(){return ht||Xn(),ht}function Ou(t){ht=t||[];let e=St();e.contentBlacklist=ht,Xt(e)}function Bu(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=St();r.tagRulePresets||(r.tagRulePresets={});let s=`preset-${Date.now()}`;return r.tagRulePresets[s]={id:s,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(Pe)),blacklist:JSON.parse(JSON.stringify(ht)),createdAt:new Date().toISOString()},Xt(r),{success:!0,preset:r.tagRulePresets[s],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function zu(){let e=St().tagRulePresets||{};return Object.values(e)}function Ku(t){let e=St(),s=(e.tagRulePresets||{})[t];return s?(Pe=JSON.parse(JSON.stringify(s.rules||[])),ht=JSON.parse(JSON.stringify(s.blacklist||[])),e.tagRules=Pe,e.contentBlacklist=ht,Xt(e),{success:!0,preset:s,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Uu(t){let e=St(),r=e.tagRulePresets||{};return r[t]?(delete r[t],e.tagRulePresets=r,Xt(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function ju(){return JSON.stringify({tagRules:Pe,contentBlacklist:ht,ruleTemplates:nt,tagRulePresets:St().tagRulePresets||{}},null,2)}function Fu(t,e={overwrite:!0}){try{let r=JSON.parse(t);if(e.overwrite)Pe=r.tagRules||[],ht=r.contentBlacklist||[],nt=r.ruleTemplates||qi;else if(r.tagRules&&Pe.push(...r.tagRules),r.contentBlacklist){let o=new Set(ht.map(n=>n.toLowerCase()));r.contentBlacklist.forEach(n=>{o.has(n.toLowerCase())||ht.push(n)})}let s=St();return s.tagRules=Pe,s.contentBlacklist=ht,s.ruleTemplates=nt,r.tagRulePresets&&(s.tagRulePresets={...s.tagRulePresets||{},...r.tagRulePresets}),Xt(s),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(r){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function Wu(t,e,r="g",s=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let o=new RegExp(t,r),n=[];if(r.includes("g")){let a;for(;(a=o.exec(e))!==null;)a.length>1?n.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[s]||a[1]||a[0]}):n.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=o.exec(e);a&&n.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[s]||a[1]:a[0]})}return{success:!0,matches:n,count:n.length,extracted:n.map(a=>a.extracted)}}catch(o){return{success:!1,error:o.message,matches:[]}}}var gr,Su,kb,qi,nt,Pe,ht,Hu,Ib,Gs=N(()=>{ze();H();gr=I.createScope("RegexExtractor"),Su="settings";kb=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],qi=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],nt=[],Pe=[],ht=[];Hu={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};Xn();Ib={extractTagContent:mr,extractSimpleTag:Xi,extractCurlyBraceTag:Qi,extractComplexTag:_u,extractHtmlFormatTag:Eu,escapeRegex:gs,shouldSkipContent:Vi,isValidTagName:Ji,scanTextForTags:Au,generateTagSuggestions:Cu,getAllRuleTemplates:ku,getRuleTemplate:Iu,createRuleTemplate:Ru,updateRuleTemplate:Mu,deleteRuleTemplate:Pu,getTagRules:Hs,setTagRules:Nu,addTagRule:Du,updateTagRule:$u,deleteTagRule:Lu,getContentBlacklist:Ys,setContentBlacklist:Ou,saveRulesAsPreset:Bu,getAllRulePresets:zu,loadRulePreset:Ku,deleteRulePreset:Uu,exportRulesConfig:ju,importRulesConfig:Fu,testRegex:Wu,MESSAGE_MACROS:Hu}});var Zu={};re(Zu,{createDefaultToolDefinition:()=>ms,default:()=>Nb,deleteTool:()=>Vs,deleteToolPreset:()=>Ju,exportTools:()=>Js,getAllTools:()=>Qt,getCurrentToolPreset:()=>Xu,getTool:()=>Zt,getToolPresets:()=>Zn,importTools:()=>Xs,normalizeToolDefinitionToRuntimeConfig:()=>Yo,resetTools:()=>Qs,saveTool:()=>qs,saveToolPreset:()=>Vu,setCurrentToolPreset:()=>Qu,setToolEnabled:()=>ea});function Rb(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,r])=>[e,ms({...r||{},id:e})]))}function Ho(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function tl(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>0?r:e}function Yu(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>=0?r:e}function Gu(t={}){return{settleMs:Yu(t?.settleMs,1200),cooldownMs:Yu(t?.cooldownMs,5e3)}}function qu(t={}){return{enabled:t?.enabled===!0,selected:Ho(t?.selected),presetId:typeof t?.presetId=="string"?t.presetId:""}}function Mb(t=[]){let e=Array.isArray(t)?t.map(r=>({role:String(r?.role||"user").trim().toUpperCase(),content:String(r?.content||"").trim()})).filter(r=>r.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(r=>`\u3010${r.role||"USER"}\u3011
${r.content}`).join(`

`)}function Pb(t,e={}){let r=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(r)return r;let s=Mb(e?.config?.messages||[]);return s||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function ms(t={}){let e=new Date().toISOString(),r=t?.config||{};return{...Dt,...t,id:t?.id||Dt.id,icon:t?.icon||Dt.icon,order:Number.isFinite(t?.order)?t.order:Dt.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:Dt.promptTemplate,extractTags:Ho(t?.extractTags),config:{execution:{...Dt.config.execution,...r.execution||{},timeout:tl(r?.execution?.timeout,Dt.config.execution.timeout),retries:Math.max(0,parseInt(r?.execution?.retries,10)||Dt.config.execution.retries)},api:{...Dt.config.api,...r.api||{}},messages:Array.isArray(r?.messages)?r.messages:[],context:{...Dt.config.context,...r.context||{},depth:tl(r?.context?.depth,Dt.config.context.depth),includeTags:Ho(r?.context?.includeTags),excludeTags:Ho(r?.context?.excludeTags)},automation:Gu(r?.automation),worldbooks:qu(r?.worldbooks)},enabled:t?.enabled!==!1,metadata:{...Dt.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function Yo(t,e={},r={}){let s=ms({...e,id:t||e?.id||""}),o=Ho(s?.extractTags?.length?s.extractTags:s?.config?.context?.includeTags),n=String(e?.output?.apiPreset||s?.config?.api?.preset||"").trim(),a=Pb(t,s),i=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():r.defaultOutputMode||"follow_ai";return{id:s.id||t,name:s.name||t,icon:s.icon||"fa-screwdriver-wrench",description:s.description||"",enabled:s.enabled!==!1,order:Number.isFinite(s.order)?s.order:100,bypass:{enabled:s?.config?.api?.useBypass===!0&&!!s?.config?.api?.bypassPreset,presetId:s?.config?.api?.bypassPreset||""},output:{mode:i,apiPreset:n,overwrite:!0,enabled:!0},automation:Gu(s?.config?.automation),worldbooks:qu(s?.config?.worldbooks),extraction:{enabled:!0,maxMessages:tl(s?.config?.context?.depth,5),selectors:o,regexPresetId:typeof s?.config?.extraction?.regexPresetId=="string"?s.config.extraction.regexPresetId:"",writebackTag:typeof s?.config?.extraction?.writebackTag=="string"?s.config.extraction.writebackTag:""},promptTemplate:a,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:n,extractTags:o,isCustom:!0,category:s.category||"utility",metadata:{...s.metadata||{}}}}function Qt(){let t=be.get($e.TOOLS),e=Rb(t);return t&&JSON.stringify(t)!==JSON.stringify(e)&&be.set($e.TOOLS,e),{...Qn,...e}}function Zt(t){return Qt()[t]||null}function qs(t,e){if(!t||!e)return!1;let r=be.get($e.TOOLS)||{},s=!r[t]&&!Qn[t],o=ms({...r[t]||{},...e,id:t,metadata:{...r[t]?.metadata||{},...e.metadata||{},createdAt:r[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return r[t]=o,be.set($e.TOOLS,r),K.emit(s?B.TOOL_REGISTERED:B.TOOL_UPDATED,{toolId:t,tool:o}),!0}function Vs(t){let e=be.get($e.TOOLS)||{};return!e[t]&&!Qn[t]||Qn[t]?!1:(delete e[t],be.set($e.TOOLS,e),K.emit(B.TOOL_UNREGISTERED,{toolId:t}),!0)}function Zn(){return be.get($e.PRESETS)||{}}function Vu(t,e){if(!t||!e)return!1;let r=Zn(),s=!r[t];return r[t]={...e,name:t,updatedAt:new Date().toISOString()},be.set($e.PRESETS,r),K.emit(s?B.PRESET_CREATED:B.PRESET_UPDATED,{type:"tool",presetName:t,preset:r[t]}),!0}function Ju(t){let e=Zn();return e[t]?(delete e[t],be.set($e.PRESETS,e),K.emit(B.PRESET_DELETED,{type:"tool",presetName:t}),!0):!1}function Xu(){return be.get($e.CURRENT_PRESET)||""}function Qu(t){return be.set($e.CURRENT_PRESET,t||""),K.emit(B.PRESET_ACTIVATED,{type:"tool",presetName:t}),!0}function ea(t,e){let r=Zt(t);if(!r)return!1;let s=be.get($e.TOOLS)||{};return s[t]=ms({...r,id:t,enabled:e,metadata:{...r?.metadata||{},createdAt:r?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),be.set($e.TOOLS,s),K.emit(e?B.TOOL_ENABLED:B.TOOL_DISABLED,{toolId:t,enabled:e}),!0}function Js(){let t=be.get($e.TOOLS)||{},e=be.get($e.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function Xs(t,e=!1){try{let r=typeof e=="object"?!!e?.overwrite:!!e,s=JSON.parse(t);if(!s||typeof s!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let o=r?{}:be.get($e.TOOLS)||{},n=r?{}:be.get($e.PRESETS)||{},a=0,i=0;if(s.tools&&typeof s.tools=="object"){for(let[l,c]of Object.entries(s.tools))!c||typeof c!="object"||(o[l]=ms({...c,id:l}),a+=1);be.set($e.TOOLS,o)}if(s.presets&&typeof s.presets=="object"){for(let[l,c]of Object.entries(s.presets))!c||typeof c!="object"||(n[l]={...c,name:l,updatedAt:new Date().toISOString()},i+=1);be.set($e.PRESETS,n)}return{success:!0,toolsImported:a,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(r){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function Qs(){be.remove($e.TOOLS),be.remove($e.PRESETS),be.remove($e.CURRENT_PRESET)}var Dt,Qn,$e,Nb,Go=N(()=>{ze();Ge();Dt={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},Qn={},$e={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};Nb={getAllTools:Qt,getTool:Zt,saveTool:qs,deleteTool:Vs,setToolEnabled:ea,exportTools:Js,importTools:Xs,resetTools:Qs,getToolPresets:Zn,saveToolPreset:Vu,deleteToolPreset:Ju,getCurrentToolPreset:Xu,setCurrentToolPreset:Qu,createDefaultToolDefinition:ms,normalizeToolDefinitionToRuntimeConfig:Yo}});var ll={};re(ll,{TOOL_CATEGORIES:()=>ep,TOOL_REGISTRY:()=>Zs,appendToolRuntimeHistory:()=>pp,clearToolApiPreset:()=>cp,default:()=>Ub,ensureToolRuntimeConfig:()=>eo,getAllDefaultToolConfigs:()=>fp,getAllToolApiBindings:()=>dp,getAllToolFullConfigs:()=>Jo,getEnabledTools:()=>gp,getToolApiPreset:()=>al,getToolBaseConfig:()=>ta,getToolConfig:()=>Vo,getToolFullConfig:()=>oe,getToolList:()=>np,getToolSubTabs:()=>ap,getToolWindowState:()=>hp,hasTool:()=>nl,onPresetDeleted:()=>up,patchToolRuntime:()=>Or,registerTool:()=>sp,resetToolConfig:()=>yp,resetToolRegistry:()=>ip,saveToolConfig:()=>Ae,saveToolWindowState:()=>mp,setToolApiPreset:()=>lp,setToolApiPresetConfig:()=>Bb,setToolBypassConfig:()=>zb,setToolOutputMode:()=>Ob,setToolPromptTemplate:()=>Kb,unregisterTool:()=>op,updateToolRuntime:()=>il});function hs(t={}){let e=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(t?.lastRunAt)?t.lastRunAt:0,lastStatus:typeof t?.lastStatus=="string"?t.lastStatus:"idle",lastError:typeof t?.lastError=="string"?t.lastError:"",lastDurationMs:Number.isFinite(t?.lastDurationMs)?t.lastDurationMs:0,successCount:Number.isFinite(t?.successCount)?t.successCount:0,errorCount:Number.isFinite(t?.errorCount)?t.errorCount:0,lastMessageKey:typeof t?.lastMessageKey=="string"?t.lastMessageKey:"",lastExecutionKey:typeof t?.lastExecutionKey=="string"?t.lastExecutionKey:"",lastExecutionPath:typeof t?.lastExecutionPath=="string"?t.lastExecutionPath:"",lastWritebackStatus:typeof t?.lastWritebackStatus=="string"?t.lastWritebackStatus:"",lastFailureStage:typeof t?.lastFailureStage=="string"?t.lastFailureStage:"",lastSlotBindingKey:typeof t?.lastSlotBindingKey=="string"?t.lastSlotBindingKey:"",lastSlotRevisionKey:typeof t?.lastSlotRevisionKey=="string"?t.lastSlotRevisionKey:"",lastSlotTransactionId:typeof t?.lastSlotTransactionId=="string"?t.lastSlotTransactionId:"",lastSourceMessageId:typeof t?.lastSourceMessageId=="string"?t.lastSourceMessageId:"",lastSourceSwipeId:typeof t?.lastSourceSwipeId=="string"?t.lastSourceSwipeId:"",lastContentCommitted:t?.lastContentCommitted===!0,lastHostCommitApplied:t?.lastHostCommitApplied===!0,lastRefreshRequested:t?.lastRefreshRequested===!0,lastRefreshConfirmed:t?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof t?.lastPreferredCommitMethod=="string"?t.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof t?.lastAppliedCommitMethod=="string"?t.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(t?.lastRefreshMethodCount)?t.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(t?.lastRefreshMethods)?t.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(t?.lastRefreshConfirmChecks)?t.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof t?.lastRefreshConfirmedBy=="string"?t.lastRefreshConfirmedBy:"",lastTraceId:typeof t?.lastTraceId=="string"?t.lastTraceId:"",lastAutoRunAt:Number.isFinite(t?.lastAutoRunAt)?t.lastAutoRunAt:0,lastAutoStatus:typeof t?.lastAutoStatus=="string"?t.lastAutoStatus:"idle",lastAutoMessageId:typeof t?.lastAutoMessageId=="string"?t.lastAutoMessageId:"",lastAutoSwipeId:typeof t?.lastAutoSwipeId=="string"?t.lastAutoSwipeId:"",lastAutoRevisionKey:typeof t?.lastAutoRevisionKey=="string"?t.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof t?.lastAutoWritebackStatus=="string"?t.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:t?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof t?.lastAutoSkipReason=="string"?t.lastAutoSkipReason:"",recentWritebackHistory:e}}function Db(t,e=10){let r=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=r?t:t.slice(t.length-r):[]}function tp(){let t=Qt()||{};return Object.entries(t).filter(([e])=>!qo[e]).map(([e,r])=>[e,r||{}])}function rl(t={}){return t?.toolKind==="script"?"script":t?.toolKind==="ai"?"ai":t?.output?.mode==="local_transform"||t?.processor?.type?"script":"ai"}function rp(){let t=Array.isArray(Zs.tools?.subTabs)?Zs.tools.subTabs.map((r,s)=>({...r,order:Number.isFinite(r?.order)?r.order:s,toolKind:rl(r),toolGroupLabel:rl(r)==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"})):[],e=tp().map(([r,s],o)=>{let n=Yo(r,s),a=rl(n);return{id:r,name:n.name||r,icon:n.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(n.order)?n.order:100+o,isCustom:!0,description:n.description||"",toolKind:a,toolGroupLabel:a==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"}});return[...t,...e].sort((r,s)=>(r.order??0)-(s.order??0))}function $b(t,e={}){let r=Yo(t,e,{defaultOutputMode:"follow_ai"});return{...r,runtime:hs(r.runtime)}}function ol(t){let e=qo[t];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:hs(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let s=(Qt()||{})[t]||null;return s?$b(t,s):Vo(t)}function ta(t){let e=ol(t);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function Lb(t,e={},r=""){if(!t)return null;let s={...t,...e,id:t.id||e.id};s.output={...t.output||{},...e.output||{}},s.automation={settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(t?.automation?.settleMs)?t.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(t?.automation?.cooldownMs)?t.automation.cooldownMs:5e3},s.bypass={...t.bypass||{},...e.bypass||{}},s.worldbooks={...t.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(t?.worldbooks?.selected)?[...t.worldbooks.selected]:[]},s.runtime=hs({...t.runtime||{},...e.runtime||{}}),s.extraction={...t.extraction||{},...e.extraction||{}},s.processor={...t.processor||{},...e.processor||{},options:{...t?.processor?.options||{},...e?.processor?.options||{}}};let o=e?.output?.apiPreset||e?.apiPreset||s.output?.apiPreset||s.apiPreset||r||"";return s.output={...s.output||{},apiPreset:o},s.apiPreset=o,t.isCustom?s.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?s.enabled=e.enabled:s.enabled=t.enabled!==!1,s}function sp(t,e){if(!t||typeof t!="string")return yt.error("\u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return yt.error("\u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let r=["name","icon","component"];for(let s of r)if(!e[s])return yt.error(` \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${s}`),!1;return er[t]={id:t,...e,order:e.order??Object.keys(er).length},yt.log(` \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function op(t){return er[t]?(delete er[t],yt.log(` \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(yt.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function np(t=!0){let e=Object.values(er).map(r=>r.id==="tools"?{...r,subTabs:rp()}:r);return t?e.sort((r,s)=>(r.order??0)-(s.order??0)):e}function Vo(t){return t==="tools"&&er[t]?{...er[t],subTabs:rp()}:er[t]||null}function nl(t){return!!er[t]}function ap(t){let e=Vo(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function ip(){er={...Zs},yt.log("\u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function lp(t,e){if(!nl(t))return yt.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let r=$.get($t)||{};return r[t]=e||"",$.set($t,r),yt.log(` \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function al(t){return($.get($t)||{})[t]||""}function cp(t){let e=$.get($t)||{};delete e[t],$.set($t,e),yt.log(` \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function dp(){return $.get($t)||{}}function up(t){let e=$.get($t)||{},r=!1;for(let s in e)e[s]===t&&(e[s]="",r=!0,yt.log(` \u5DE5\u5177 "${s}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));r&&$.set($t,e)}function oe(t){let e=ol(t);if(!e)return Vo(t);let s=($.get(Lr)||{})[t]||{},o=al(t),n=Lb({...e,id:t},s,o);return typeof window<"u"&&window.YYT_PRESET_DEBUG&&typeof console<"u"&&console.log&&console.log(`[YYT-DEBUG][getToolFullConfig] ${t}`,{base_extraction:JSON.parse(JSON.stringify(e.extraction||{})),base_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),user_extraction:JSON.parse(JSON.stringify(s.extraction||{})),user_worldbooks:JSON.parse(JSON.stringify(s.worldbooks||{})),merged_extraction:JSON.parse(JSON.stringify(n.extraction||{})),merged_worldbooks:JSON.parse(JSON.stringify(n.worldbooks||{}))}),n}function eo(t){if(!t)return!1;let e=ol(t);if(!e)return!1;let r=$.get(Lr)||{};if(r[t])return!0;let s={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};r[t]=s,$.set(Lr,r);let o=$.get($t)||{};return o[t]=s.output?.apiPreset||s.apiPreset||"",$.set($t,o),K.emit(B.TOOL_UPDATED,{toolId:t,config:s}),!0}function Ae(t,e,r={}){if(!t||!oe(t))return yt.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:s=!0}=r,o=$.get(Lr)||{},n=$.get($t)||{},a=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return o[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){o[t][l]={...e.output,apiPreset:a};return}if(l==="apiPreset"){o[t][l]=a;return}o[t][l]=e[l]}}),o[t].apiPreset===void 0&&(o[t].apiPreset=a),!o[t].output&&e.output!==void 0&&(o[t].output={...e.output||{},apiPreset:a}),$.set(Lr,o),n[t]=a,$.set($t,n),typeof window<"u"&&window.YYT_PRESET_DEBUG&&typeof console<"u"&&console.log&&console.log(`[YYT-DEBUG][saveToolConfig] ${t}`,{input_extraction:JSON.parse(JSON.stringify(e.extraction||{})),input_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),saved_extraction:JSON.parse(JSON.stringify(o[t].extraction||{})),saved_worldbooks:JSON.parse(JSON.stringify(o[t].worldbooks||{})),verify_storage:JSON.parse(JSON.stringify(($.get(Lr)||{})[t]?.extraction||{}))}),s&&K.emit(B.TOOL_UPDATED,{toolId:t,config:o[t]}),yt.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function Ob(t,e){let r=oe(t);return r?Ae(t,{...r,output:{...r.output,mode:e}}):!1}function Bb(t,e){let r=oe(t);return r?Ae(t,{...r,apiPreset:e,output:{...r.output,apiPreset:e}}):!1}function zb(t,e){let r=oe(t);return r?Ae(t,{...r,bypass:{...r.bypass,...e}}):!1}function Kb(t,e){let r=oe(t);return r?Ae(t,{...r,promptTemplate:e}):!1}function Or(t,e,r={}){let s=oe(t);if(!s)return!1;let{touchLastRunAt:o=!1,emitEvent:n=!1,emitRuntimeEvent:a=!0}=r,i=hs({...s.runtime||{},...e||{}});o&&(i.lastRunAt=Date.now());let l=Ae(t,{...s,runtime:i},{emitEvent:n});return l&&a&&K.emit(B.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:i,previousRuntime:hs(s.runtime||{})}),l}function pp(t,e,r={},s={}){let o=oe(t);if(!o)return!1;let{limit:n=10,emitEvent:a=!1,emitRuntimeEvent:i=!0}=s,l=hs(o.runtime||{}),c=hs(o.runtime||{}),d="recentWritebackHistory",u={id:r?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:r?.at||Date.now(),...r};l[d]=Db([...Array.isArray(l[d])?l[d]:[],u],n),u?.traceId&&(l.lastTraceId=u.traceId);let y=Ae(t,{...o,runtime:l},{emitEvent:a});return y&&i&&K.emit(B.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:l,previousRuntime:c,historyType:e,historyEntry:u}),y}function il(t,e,r={}){let{touchLastRunAt:s=!0,emitEvent:o=!1,emitRuntimeEvent:n=!0}=r;return Or(t,e,{touchLastRunAt:s,emitEvent:o,emitRuntimeEvent:n})}function yp(t){if(!t||!qo[t])return yt.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=$.get(Lr)||{};return delete e[t],$.set(Lr,e),K.emit(B.TOOL_UPDATED,{toolId:t,config:null}),yt.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function fp(){return{...qo}}function Jo(){let t=new Set([...Object.keys(qo),...tp().map(([e])=>e)]);return Array.from(t).map(e=>oe(e)).filter(Boolean)}function gp(){return Jo().filter(t=>t&&t.enabled)}function mp(t,e){let r=$.get(sl)||{};r[t]={...e,updatedAt:Date.now()},$.set(sl,r)}function hp(t){return($.get(sl)||{})[t]||null}var yt,Lr,$t,sl,qo,Zs,ep,er,Ub,tr=N(()=>{ze();Ge();H();Go();yt=I.createScope("ToolRegistry"),Lr="tool_configs",$t="tool_api_bindings",sl="tool_window_states";qo={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,regexPresetId:"builtin_regex_summary"},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:[]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},Zs={presetManagement:{id:"presetManagement",name:"\u9884\u8BBE\u7BA1\u7406",icon:"fa-bookmark",hasSubTabs:!0,description:"\u7EDF\u4E00\u7BA1\u7406 API / \u6B63\u5219 / \u4E16\u754C\u4E66 / \u8868\u683C\u6A21\u677F\u9884\u8BBE",order:0,subTabs:[{id:"apiPresets",name:"API \u9884\u8BBE",icon:"fa-database",component:"ApiPresetPanel",presetKind:"api"},{id:"regexPresets",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",component:"RegexExtractPanel",presetKind:"regex"},{id:"worldbookPresets",name:"\u4E16\u754C\u4E66",icon:"fa-book-atlas",component:"WorldbookPresetPanel",presetKind:"worldbook"},{id:"tableTemplates",name:"\u8868\u683C\u6A21\u677F",icon:"fa-table-list",component:"TableTemplatePanel",presetKind:"table"}]},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel",toolKind:"ai"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel",toolKind:"ai"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel",toolKind:"ai"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel",toolKind:"script"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel",toolKind:"script"}]},tableWorkbench:{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",icon:"fa-table-cells",hasSubTabs:!1,description:"\u7ED3\u6784\u5316\u586B\u8868\u4E0E\u72B6\u6001\u9884\u89C8\u5DE5\u4F5C\u53F0",component:"TableWorkbenchPanel",order:5},bypass:{id:"bypass",name:"Ai\u6307\u4EE4\u9884\u8BBE",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406 Ai \u6307\u4EE4\u9884\u8BBE",component:"BypassPanel",order:6},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:7},logger:{id:"logger",name:"\u65E5\u5FD7",icon:"fa-terminal",hasSubTabs:!1,description:"\u67E5\u770B\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7\uFF0C\u652F\u6301\u8FC7\u6EE4\u4E0E\u5BFC\u51FA",component:"LoggerPanel",order:8}},ep={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},er={...Zs};Ub={TOOL_REGISTRY:Zs,TOOL_CATEGORIES:ep,registerTool:sp,unregisterTool:op,getToolList:np,getToolConfig:Vo,hasTool:nl,getToolSubTabs:ap,resetToolRegistry:ip,setToolApiPreset:lp,getToolApiPreset:al,clearToolApiPreset:cp,getAllToolApiBindings:dp,onPresetDeleted:up,saveToolWindowState:mp,getToolWindowState:hp,getToolBaseConfig:ta,ensureToolRuntimeConfig:eo,getToolFullConfig:oe,patchToolRuntime:Or,appendToolRuntimeHistory:pp,saveToolConfig:Ae,resetToolConfig:yp,getAllDefaultToolConfigs:fp,getAllToolFullConfigs:Jo,getEnabledTools:gp}});function oa(){return`rgx_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function vp(){return`r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,6)}`}function ul(t={}){let e=Object.values(Wt).includes(t.type)?t.type:Wt.INCLUDE;return{id:String(t.id||vp()),name:String(t.name||"").trim(),description:String(t.description||""),type:e,value:String(t.value||""),enabled:t.enabled!==!1}}function rr(t={}){return{id:String(t.id||oa()),name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),rules:Array.isArray(t.rules)?t.rules.map(ul):[],blacklist:Array.isArray(t.blacklist)?t.blacklist.map(e=>String(e||"").trim()).filter(Boolean):[],createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function hr(){let t=Ee.get(dl);return!t||typeof t!="object"?{}:t}function Xo(t){Ee.set(dl,t)}function bs(t){return typeof t=="string"&&t.startsWith(jb)}function Tp(t){return bs(t)&&ra.find(e=>e.id===t)||null}function pl(t){if(!Array.isArray(t)){ra=[];return}ra=t.map(e=>rr({...e,id:String(e?.id||"")})).filter(e=>bs(e.id))}function ro(){if(wp)return;wp=!0;let t=$.get(bp)||{};if(t[xp]===!0)return;let e=hr(),r=Object.keys(e).length>0,s=0,o={...e},n=t.tagRulePresets||{};for(let a of Object.values(n)){let i=rr({id:oa(),name:a.name||"\u5DF2\u8FC1\u79FB\u9884\u8BBE",description:a.description||"",rules:a.rules||[],blacklist:a.blacklist||[],createdAt:typeof a.createdAt=="string"&&Date.parse(a.createdAt)||Date.now(),updatedAt:Date.now()});o[i.id]=i,s+=1}if(!r&&s===0){let a=Array.isArray(t.tagRules)?t.tagRules:[],i=Array.isArray(t.contentBlacklist)?t.contentBlacklist:[];if(a.length||i.length){let l=rr({name:"\u9ED8\u8BA4\u89C4\u5219\u96C6\uFF08\u8FC1\u79FB\uFF09",description:"\u4ECE\u8001\u7248\u672C\u7684\u5F53\u524D\u89C4\u5219\u8FC1\u79FB\u800C\u6765",rules:a,blacklist:i});o[l.id]=l,Ee.set(to,l.id),s+=1}}s>0&&(Xo(o),Br.info(`\u5DF2\u4ECE\u8001\u6570\u636E\u8FC1\u79FB ${s} \u4E2A\u6B63\u5219\u9884\u8BBE`)),$.set(bp,{...t,[xp]:!0})}function Fb(){ro();let t=hr(),e=new Set,r=[];for(let o of ra){let n=t[o.id];n?(r.push(rr(n)),e.add(o.id)):r.push(o)}let s=Object.values(t).map(rr).filter(o=>!e.has(o.id)).sort((o,n)=>n.updatedAt-o.updatedAt);return r.push(...s),r}function br(t){if(!t)return null;ro();let e=hr();return e[t]?rr(e[t]):bs(t)?Tp(t):null}function na(){ro();let t=Ee.get(to);return typeof t=="string"&&t?t:""}function Sp(){let t=na();return t?br(t):null}function Wb(t){if(t&&bs(t))return Ee.set(to,t),sa(),K.emit(B.PRESET_ACTIVATED,{kind:"regex",id:t}),!0;let e=hr();return t&&!e[t]?(Br.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(Ee.set(to,t||""),sa(),K.emit(B.PRESET_ACTIVATED,{kind:"regex",id:t}),!0)}function aa(t={}){ro();let e=rr({...t,id:oa(),createdAt:Date.now(),updatedAt:Date.now()}),r=hr();return r[e.id]=e,Xo(r),K.emit(B.PRESET_CREATED,{kind:"regex",id:e.id}),Br.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function xs(t,e={}){if(!t)return null;let r=hr(),s=r[t];if(!s&&bs(t)&&(s=Tp(t)),!s)return null;let o=rr({...s,...e,id:t,createdAt:s.createdAt,updatedAt:Date.now()});return r[t]=o,Xo(r),na()===t&&cl(o),K.emit(B.PRESET_UPDATED,{kind:"regex",id:t}),o}function Hb(t){if(!t)return!1;if(bs(t))return Br.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=hr();return e[t]?(delete e[t],Xo(e),na()===t&&(Ee.set(to,""),sa()),K.emit(B.PRESET_DELETED,{kind:"regex",id:t}),Br.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function Yb(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=br(t);return r?aa({...r,id:void 0,name:`${r.name}${e}`}):null}function Gb(t,e){return bs(t)?(Br.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):xs(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function qb(t,e={}){let r=br(t);if(!r)return null;let s=ul({...e,id:vp()}),o=[...r.rules,s];return xs(t,{rules:o})}function Vb(t,e,r={}){let s=br(t);if(!s)return null;let o=s.rules.map(n=>n.id===e?ul({...n,...r,id:n.id}):n);return xs(t,{rules:o})}function Jb(t,e){let r=br(t);if(!r)return null;let s=r.rules.filter(o=>o.id!==e);return xs(t,{rules:s})}function Xb(t,e,r){let s=br(t);if(!s)return null;let o=s.rules.findIndex(i=>i.id===e);if(o<0)return null;let n=r==="up"?o-1:o+1;if(n<0||n>=s.rules.length)return null;let a=[...s.rules];return[a[o],a[n]]=[a[n],a[o]],xs(t,{rules:a})}function Qb(t,e){let r=Array.isArray(e)?e.map(s=>String(s||"").trim()).filter(Boolean):[];return xs(t,{blacklist:Array.from(new Set(r))})}function Zb(){return ro(),{version:1,exportedAt:Date.now(),presets:Object.values(hr()).map(rr)}}function ex(t){if(ro(),!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[],r=hr(),s=0;for(let o of e){let n=rr({...o,id:oa(),createdAt:Date.now(),updatedAt:Date.now()});r[n.id]=n,s+=1}return s>0&&(Xo(r),K.emit(B.PRESET_IMPORTED,{kind:"regex",count:s})),{added:s}}function tx(){Ee.set(dl,{}),Ee.set(to,""),sa(),Br.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u6B63\u5219\u9884\u8BBE")}async function cl(t){if(t)try{let e=await Promise.resolve().then(()=>(Gs(),el));typeof e.setCurrentRules=="function"&&e.setCurrentRules(JSON.parse(JSON.stringify(t.rules||[]))),typeof e.setContentBlacklist=="function"&&e.setContentBlacklist(JSON.parse(JSON.stringify(t.blacklist||[])))}catch(e){Br.warn("\u540C\u6B65\u5230 regex-extractor \u5931\u8D25",{error:e})}}function sa(){let t=Sp();return cl(t||{rules:[],blacklist:[]})}async function rx(t){if(!t)return[];try{let e=await Promise.resolve().then(()=>(tr(),ll));return(typeof e.getToolList=="function"?e.getToolList(!1):[]).filter(s=>(typeof e.getToolFullConfig=="function"?e.getToolFullConfig(s.id):null)?.extraction?.regexPresetId===t).map(s=>s.id)}catch{return[]}}var Br,dl,to,bp,xp,Wt,jb,ra,wp,we,zr=N(()=>{ze();Ge();H();Br=I.createScope("RegexPresetStore"),dl="regex_presets",to="regex_current_preset",bp="settings",xp="regex_presets_migrated",Wt=Object.freeze({INCLUDE:"include",EXCLUDE:"exclude",REGEX_INCLUDE:"regex_include",REGEX_EXCLUDE:"regex_exclude"});jb="builtin_regex_",ra=[];wp=!1;we={listPresets:Fb,getPreset:br,getCurrentPresetId:na,getCurrentPreset:Sp,setCurrentPresetId:Wb,createPreset:aa,updatePreset:xs,deletePreset:Hb,duplicatePreset:Yb,renamePreset:Gb,addRule:qb,updateRule:Vb,deleteRule:Jb,moveRule:Xb,setBlacklist:Qb,exportAll:Zb,importPresets:ex,resetAll:tx,findLinkedTools:rx,RULE_TYPES:Wt}});var Cp={};re(Cp,{RegexExtractPanel:()=>Ap,default:()=>cx});function ox(t,e,r,s,o,n){let a=m("div",{style:{display:"grid",gridTemplateColumns:"auto auto minmax(140px, 1fr) 200px minmax(120px, 2fr) auto",gap:"10px",alignItems:"center",padding:"10px 0",borderTop:r===0?"none":"1px solid var(--yyt-border)",opacity:e.enabled===!1?"0.55":"1"},attrs:{draggable:n?null:"true","data-rule-id":e.id}}),i=m("div",{style:{cursor:n?"default":"grab",padding:"4px",color:"var(--yyt-text-muted)",fontSize:"14px",userSelect:"none"},text:"\u22EE\u22EE",title:n?"\u5185\u7F6E\u9884\u8BBE\u4E0D\u53EF\u91CD\u6392":"\u62D6\u52A8\u6392\u5E8F"});a.appendChild(i);let l=m("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}}),c=ue({label:"\u25B2",size:"small",variant:"ghost",title:"\u4E0A\u79FB",disabled:n||r===0,onClick:()=>{we.moveRule(t.id,e.id,"up"),o()}}),d=ue({label:"\u25BC",size:"small",variant:"ghost",title:"\u4E0B\u79FB",disabled:n||r===s-1,onClick:()=>{we.moveRule(t.id,e.id,"down"),o()}});for(let v of[c,d])v.el.style.padding="0 6px",v.el.style.minHeight="auto",v.el.style.fontSize="9px";l.appendChild(c.el),l.appendChild(d.el),a.appendChild(l);let u=m("div",{style:{display:"flex",flexDirection:"column",gap:"2px",minWidth:"0"}}),y=Ze({value:e.name||"",placeholder:"\u89C4\u5219\u540D\uFF08\u53EF\u9009\uFF09",disabled:n,onChange:v=>we.updateRule(t.id,e.id,{name:v})});y.el.style.fontSize="12px",y.el.style.padding="6px 10px",u.appendChild(y.el),e.description&&u.appendChild(m("div",{text:e.description,style:{fontSize:"10px",color:"var(--yyt-text-muted)"}})),a.appendChild(u);let p=Ve({value:e.type,disabled:n,options:sx,onChange:v=>{we.updateRule(t.id,e.id,{type:v}),o()}});p.el.style.fontSize="11px",p.el.style.padding="6px 10px",a.appendChild(p.el);let f=e.type===Wt.REGEX_INCLUDE||e.type===Wt.REGEX_EXCLUDE,g=Ze({value:e.value||"",placeholder:f?"\u6B63\u5219\u8868\u8FBE\u5F0F...":"\u6807\u7B7E\u540D\uFF08\u5982 content\uFF09",disabled:n,onChange:v=>we.updateRule(t.id,e.id,{value:v})});g.el.style.fontSize="12px",g.el.style.padding="6px 10px",g.el.style.fontFamily="ui-monospace, monospace",a.appendChild(g.el);let h=m("div",{style:{display:"flex",gap:"6px",alignItems:"center"}}),x=vt({checked:e.enabled!==!1,disabled:n,onChange:v=>{we.updateRule(t.id,e.id,{enabled:v}),o()}});return x.el.style.padding="0",x.el.style.border="none",x.el.style.background="transparent",h.appendChild(x.el),n||h.appendChild(ue({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664\u89C4\u5219",onClick:()=>{we.deleteRule(t.id,e.id),o()}}).el),a.appendChild(h),a}function nx(t,e,r){let s=null;t.addEventListener("dragstart",o=>{let n=o.target;if(!(n instanceof HTMLElement))return;let a=n.closest("[data-rule-id]");if(a){s=a.getAttribute("data-rule-id"),a.style.opacity="0.4";try{o.dataTransfer.effectAllowed="move",o.dataTransfer.setData("text/plain",s)}catch{}}}),t.addEventListener("dragend",o=>{let n=o.target;n instanceof HTMLElement&&(n.style.opacity=""),s=null}),t.addEventListener("dragover",o=>{if(s){o.preventDefault();try{o.dataTransfer.dropEffect="move"}catch{}}}),t.addEventListener("drop",o=>{if(o.preventDefault(),!s)return;let n=o.target instanceof HTMLElement?o.target.closest("[data-rule-id]"):null;if(!n)return;let a=n.getAttribute("data-rule-id");if(!a||a===s)return;let i=we.getPreset(e.id);if(!i)return;let l=i.rules.findIndex(y=>y.id===s),c=i.rules.findIndex(y=>y.id===a);if(l<0||c<0)return;let d=[...i.rules],[u]=d.splice(l,1);d.splice(c,0,u),we.updatePreset(e.id,{rules:d}),r()})}function ax(t,{onChange:e,readonly:r,refresh:s}){let o=m("div",{style:{display:"flex",flexDirection:"column",gap:"14px"}});F(o,Tt({label:"\u63CF\u8FF0",control:Ze({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})}));let n=m("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px"}},m("div",{text:"\u63D0\u53D6\u89C4\u5219\uFF08\u6309\u987A\u5E8F\u5E94\u7528\uFF09",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),r?m("span",{text:"\u5185\u7F6E\u9884\u8BBE\u53EA\u8BFB",style:{fontSize:"11px",color:"var(--yyt-text-muted)"}}):ue({label:"+ \u65B0\u589E\u89C4\u5219",size:"small",onClick:()=>{we.addRule(t.id,{type:Wt.INCLUDE,value:"",enabled:!0}),s&&s()}}).el);F(o,n);let a=m("div");if(t.rules.length){for(let i=0;i<t.rules.length;i++)a.appendChild(ox(t,t.rules[i],i,t.rules.length,s,r));r||nx(a,t,s)}else a.appendChild(m("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5C1A\u65E0\u89C4\u5219\u3002\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u65B0\u589E\u89C4\u5219"\u5F00\u59CB\u6DFB\u52A0\u3002'}));if(F(o,a),F(o,m("div",{text:"\u5185\u5BB9\u9ED1\u540D\u5355",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px",marginBottom:"4px"}})),F(o,m("div",{text:"\u63D0\u53D6\u51FA\u7684\u5185\u5BB9\u5757\u82E5\u5305\u542B\u4EFB\u4E00\u5173\u952E\u8BCD\u5219\u8DF3\u8FC7\u8BE5\u5757\uFF08\u4E0D\u533A\u5206\u5927\u5C0F\u5199\uFF09\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginBottom:"6px"}})),r)F(o,m("div",{style:{fontSize:"12px",color:"var(--yyt-text-muted)"},text:t.blacklist.length?t.blacklist.join("\u3001"):"\uFF08\u7A7A\uFF09"}));else{let i=Bi({values:t.blacklist,placeholder:"\u8F93\u5165\u5173\u952E\u8BCD\u56DE\u8F66\u6DFB\u52A0",chipVariant:"danger",onChange:l=>we.setBlacklist(t.id,l)});F(o,i.el)}return o}function ix(t){if(!t)return null;let e=m("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}});F(e,m("div",{text:"\u6D4B\u8BD5\u63D0\u53D6",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}));let r=Ep.get(t.id)||{input:"",output:""};Ep.set(t.id,r);let s=m("textarea",{className:"yyt-textarea",attrs:{rows:"5",placeholder:"\u7C98\u8D34\u6D4B\u8BD5\u6587\u672C\uFF08\u5982 AI \u56DE\u590D\u539F\u6587\uFF09..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});s.value=r.input,s.addEventListener("input",()=>{r.input=s.value}),F(e,s);let o=m("div",{style:{padding:"10px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-muted)",maxHeight:"200px",overflowY:"auto",whiteSpace:"pre-wrap",wordBreak:"break-all",minHeight:"50px"}});o.textContent=r.output||'// \u70B9\u51FB"\u8FD0\u884C\u6D4B\u8BD5"\u770B\u63D0\u53D6\u7ED3\u679C';let n=ue({label:"\u25B6 \u8FD0\u884C\u6D4B\u8BD5",size:"small",variant:"primary",onClick:()=>{let a=s.value;if(!a.trim()){r.output="// \u6D4B\u8BD5\u8F93\u5165\u4E3A\u7A7A",o.textContent=r.output,o.style.color="var(--yyt-text-muted)";return}try{let i=mr(a,t.rules||[],t.blacklist||[]);r.output=i||"// \u6CA1\u6709\u63D0\u53D6\u5230\u5185\u5BB9",o.textContent=r.output,o.style.color=i?"var(--yyt-text)":"var(--yyt-text-muted)"}catch(i){r.output=`// \u6D4B\u8BD5\u51FA\u9519\uFF1A${i?.message||i}`,o.textContent=r.output,o.style.color="var(--yyt-danger, #f87171)"}}});return F(e,n.el),F(e,o),e}function lx(t){let e=t.rules.filter(r=>r.enabled!==!1).length;return[`${t.rules.length} \u89C4\u5219\uFF08${e} \u542F\u7528\uFF09`,`${t.blacklist.length} \u9ED1\u540D\u5355`]}var L_,sx,Ep,Ap,cx,kp=N(()=>{yr();zr();Gs();H();jo();L_=I.createScope("RegexExtractPanel"),sx=[{value:Wt.INCLUDE,label:"include \u2014 \u63D0\u53D6\u6807\u7B7E"},{value:Wt.EXCLUDE,label:"exclude \u2014 \u6392\u9664\u6807\u7B7E"},{value:Wt.REGEX_INCLUDE,label:"regex_include \u2014 \u6B63\u5219\u63D0\u53D6"},{value:Wt.REGEX_EXCLUDE,label:"regex_exclude \u2014 \u6B63\u5219\u6392\u9664"}],Ep=new Map;Ap=Mr({id:"regexExtractPanel",kind:"regex",panelTitle:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",panelHint:"\u7BA1\u7406\u591A\u4E2A\u63D0\u53D6\u89C4\u5219\u96C6\uFF0C\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\u3002\u89C4\u5219\u6309\u987A\u5E8F\u5E94\u7528\uFF0C\u53EF\u62D6\u62FD\u6392\u5E8F\u3002",store:we,renderEditor:ax,renderExtras:ix,renderListItemMeta:lx}),cx=Ap});function me(t){return t==null?"":String(t).trim()}function ux(t="table"){let e=me(t)||"table",r=Date.now().toString(36),s=Math.random().toString(36).slice(2,8);return`${e}_${r}_${s}`}function Qo(t="row"){return ux(t)}function Ht(t,e=0){return me(t)||`table_${Number.isFinite(e)?e+1:1}`}function Zo(t,e=0){return me(t)||`row_${Number.isFinite(e)?e+1:1}`}function ne(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function so(t={}){return{chatId:me(t.chatId),sourceMessageId:me(t.sourceMessageId||t.messageId),sourceSwipeId:me(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:me(t.effectiveSwipeId||t.sourceSwipeId),slotBindingKey:me(t.slotBindingKey),slotRevisionKey:me(t.slotRevisionKey),slotTransactionId:me(t.slotTransactionId),traceId:me(t.traceId),resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now()}}function yl(t={}){return{resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now(),runSource:me(t.runSource)||et.MANUAL,traceId:me(t.traceId),chatId:me(t.chatId),sourceMessageId:me(t.sourceMessageId||t.messageId),sourceSwipeId:me(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:me(t.effectiveSwipeId||t.sourceSwipeId)||"swipe:current",slotBindingKey:me(t.slotBindingKey),slotRevisionKey:me(t.slotRevisionKey),slotTransactionId:me(t.slotTransactionId),assistantContentFingerprint:me(t.assistantContentFingerprint),assistantBaseFingerprint:me(t.assistantBaseFingerprint),assistantText:String(t.assistantText||""),assistantBaseText:String(t.assistantBaseText||""),targetMessageIndex:Number.isFinite(t.targetMessageIndex)?t.targetMessageIndex:-1}}function xr(t){return!t||typeof t!="object"?null:{chatId:me(t.chatId),slotBindingKey:me(t.slotBindingKey),slotRevisionKey:me(t.slotRevisionKey),sourceMessageId:me(t.sourceMessageId),sourceSwipeId:me(t.sourceSwipeId),tables:Array.isArray(t.tables)?ne(t.tables):[],updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0,meta:t.meta&&typeof t.meta=="object"?ne(t.meta):{}}}function en(t={},e={}){let r=yl(t),s=e.meta&&typeof e.meta=="object"?ne(e.meta):{};return{chatId:r.chatId,slotBindingKey:r.slotBindingKey,slotRevisionKey:r.slotRevisionKey,sourceMessageId:r.sourceMessageId,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId,tables:Array.isArray(e.tables)?ne(e.tables):[],updatedAt:Number.isFinite(e.updatedAt)?e.updatedAt:Date.now(),meta:{sourceKind:s.sourceKind||_t.EMPTY,...s}}}function ia(t){return!t||typeof t!="object"?{lastResolvedTarget:null,lastCommittedTarget:null,updatedAt:0}:{lastResolvedTarget:t.lastResolvedTarget?so(t.lastResolvedTarget):null,lastCommittedTarget:t.lastCommittedTarget?so(t.lastCommittedTarget):null,updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0}}function Ce(t){if(t==null)return Lt;let e=String(t).trim();return e===""?Lt:e}function tn(t,e){let r=me(t),s=Ce(e);return`${r}::${s}`}function Rp(){return{rows:[],cols:[],cells:[],indexColumn:!1}}var ws,Kr,et,ft,vs,_t,oo,dx,Lt,Je,Ip,O_,B_,Ke=N(()=>{ws="YouYouToolkit_tableState",Kr="YouYouToolkit_tableBindings",et=Object.freeze({MANUAL:"MANUAL_TABLE",AUTO:"AUTO_TABLE"}),ft=Object.freeze({ENABLED:"enabled",SELECTED:"selected",CURRENT:"current"}),vs=Object.freeze({EXACT:"exact",BINDING_FALLBACK:"binding_fallback",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),_t=Object.freeze({EXACT:"exact",BINDING:"binding",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),oo=Object.freeze({INSERT_ROW:"insertRow",UPDATE_ROW:"updateRow",DELETE_ROW:"deleteRow"}),dx=Object.freeze({CELL:"cell",ROW:"row",COLUMN:"column",INDEX_COLUMN:"index_column"});Lt="";Je=Object.freeze({INHERIT_GLOBAL:"inherit_global",CHAT_OVERRIDE:"chat_override",PRESET_LINK:"preset_link"}),Ip=8,O_=Object.freeze({NOTE:"note",INIT_NODE:"initNode",INSERT_NODE:"insertNode",UPDATE_NODE:"updateNode",DELETE_NODE:"deleteNode"}),B_=Object.freeze({INHERIT_GLOBAL:-1,DISABLED:0})});function la(t,e=""){return t==null?e:String(t).trim()||e}function px(t,e=!1){return t==null?e:t===!0}function ca(t={},e=0){return Ht(t?.id||t?.key,e)}function rn(t={},e={}){let r=t&&typeof t=="object"?t:{},s=e&&typeof e=="object"?e:{},o=la(r.mode||r.runScope||s.mode||s.runScope,ft.ENABLED),n=Array.isArray(r.selectedTableIds)?r.selectedTableIds.map(i=>la(i,"")).filter(Boolean):Array.isArray(s.selectedTableIds)?s.selectedTableIds.map(i=>la(i,"")).filter(Boolean):[],a=la(r.activeTableId||s.activeTableId,"");return{mode:Object.values(ft).includes(o)?o:ft.ENABLED,selectedTableIds:n,activeTableId:a}}function Mp(t={},e=[]){let r=rn(t,t?.scope||{}),s=Array.isArray(e)?e:[],o=s.map((d,u)=>ca(d,u)),n=new Set(o),a=r.mode,i=!1;a===ft.CURRENT?(!r.activeTableId||!n.has(r.activeTableId))&&(a=ft.ENABLED,i=!0):a===ft.SELECTED&&r.selectedTableIds.filter(u=>n.has(u)).length===0&&(a=ft.ENABLED,i=!0);let l=[];a===ft.CURRENT?l=r.activeTableId?[r.activeTableId]:[]:a===ft.SELECTED?l=r.selectedTableIds.filter(d=>n.has(d)):l=s.map((d,u)=>({table:d,id:ca(d,u)})).filter(({table:d})=>px(d?.enabled,!0)).map(({id:d})=>d);let c=new Set(l);return{...r,mode:a,requestedMode:r.mode,staleScope:i,allTableIds:o,allowedTableIds:l,allowedIdSet:c,includes(d={},u=-1){return c.has(ca(d,u))},filterTables(d=[]){return(Array.isArray(d)?d:[]).filter((y,p)=>c.has(ca(y,p)))},toJSON(){return{mode:a,requestedMode:r.mode,staleScope:i,selectedTableIds:ne(r.selectedTableIds),activeTableId:r.activeTableId,allowedTableIds:[...l]}}}}var da=N(()=>{Ke()});function Et(t,e=""){return t==null?e:String(t).trim()||e}function fl(){let t=globalThis.window||globalThis;return Et(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function yx(t,e=!1){return t===!0}function fx(t={}){let e=t&&typeof t=="object"?t:{};return{enabled:yx(e.enabled,!1),targetBook:Et(e.targetBook,""),entryComment:Et(e.entryComment,"YYT-\u586B\u8868\u6570\u636E")}}function gl(t={},e={}){let r=t&&typeof t=="object"?t:{},s=rn(r.scope,{mode:r.runScope||e.runScope||ft.ENABLED,selectedTableIds:r.selectedTableIds||e.selectedTableIds||[],activeTableId:r.activeTableId||e.activeTableId||""});return{chatId:Et(r.chatId,Et(e.chatId,fl())),templateId:Et(r.templateId,Et(e.templateId,gt)),enabledTableIds:Array.isArray(r.enabledTableIds)?r.enabledTableIds.map(o=>Et(o,"")).filter(Boolean):[],focusedTableId:Et(r.focusedTableId,s.activeTableId),scope:s,worldbookSync:fx(r.worldbookSync),seedNote:Et(r.seedNote,""),updatedAt:Et(r.updatedAt,new Date().toISOString())}}function Dp(){let t=Pp.get(Np,{});return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function ml(t=fl()){let e=Et(t,"default_chat"),r=Dp();return gl(r[e],{chatId:e})}function $p(t={},e=fl()){let r=Et(e,"default_chat"),s=Dp(),o=gl({...s[r],...t||{},chatId:r,updatedAt:new Date().toISOString()},{chatId:r});return Pp.set(Np,{...s,[r]:o}),{success:!0,guide:o}}function Lp(t={},e=null){let r=gl(e||ml(),{templateId:t.activeTemplate,runScope:t.runScope,selectedTableIds:t.scope?.selectedTableIds,activeTableId:t.scope?.activeTableId}),s={...t,activeTemplate:r.templateId||t.activeTemplate,runScope:r.scope.mode,scope:r.scope};return r.worldbookSync&&r.worldbookSync.targetBook&&(s.worldbookSync={...t.worldbookSync||{},...r.worldbookSync}),s}var Pp,Np,Op=N(()=>{ze();sr();Ke();da();Pp=$.namespace("tableWorkbenchGuides"),Np="guides"});function Z(t,e,r="",s=pa){return{key:t,title:e,description:r,type:s,required:!1}}function Ur({id:t,name:e,note:r,aiInstructions:s,columns:o}){return{id:t,name:e,note:r,enabled:!0,aiInstructions:{init:s?.init||"",create:s?.create||"",update:s?.update||"",delete:s?.delete||""},columns:o,rows:[]}}var _e,ua,hl,Bp,gx,pa,zp,gt,bl,no,Kp=N(()=>{_e=Object.freeze({IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error",ABORTED:"aborted",SKIPPED:"skipped"}),ua=Object.freeze({INCREMENTAL:"incremental",FULL:"full"}),hl=`\u8BF7\u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5F53\u524D\u8868\u683C\u57FA\u5E95\uFF0C\u5BF9\u7ED3\u6784\u5316 tables \u6570\u636E\u505A\u589E\u91CF\u66F4\u65B0\u3002

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
{{toolContentMacro}}`,Bp=`\u8F93\u51FA\u8981\u6C42 \u2014 \u7528 <tableEdit>...</tableEdit> \u589E\u91CF DSL\uFF1A

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
\u4F46\u5E94\u8BE5\u5C3D\u91CF\u4F18\u5148\u7528 DSL\uFF08\u6D41\u91CF\u5C0F\u3001\u4E0D\u5F71\u54CD\u9501\u5B57\u6BB5\uFF09\u3002`,gx=Object.freeze([{value:"text",label:"\u6587\u672C"},{value:"number",label:"\u6570\u5B57"},{value:"boolean",label:"\u5E03\u5C14"},{value:"date",label:"\u65E5\u671F"},{value:"json",label:"JSON"}]),pa="text",zp=Object.freeze(gx.map(t=>Object.freeze({...t}))),gt="default_story_state",bl="\u9ED8\u8BA4\u5267\u60C5\u72B6\u6001\u6A21\u677F";no=Object.freeze([Ur({id:"default_global_state",name:"\u5168\u5C40\u6570\u636E\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u4E3B\u89D2\u6240\u5728\u5730\u70B9\u53CA\u65F6\u95F4\u76F8\u5173\u53C2\u6570\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u63D2\u5165\u4E00\u6761\u5173\u4E8E\u5F53\u524D\u4E16\u754C\u72B6\u6001\u7684\u8BB0\u5F55\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u5730\u70B9\u6216\u65F6\u95F4\u53D1\u751F\u53D8\u5316\u65F6\u66F4\u65B0\u6B64\u8868\uFF1B\u6BCF\u8F6E\u5E94\u6839\u636E\u5267\u60C5\u66F4\u65B0\u65F6\u95F4\u76F8\u5173\u5B57\u6BB5\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[Z("location","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u5730\u70B9","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u7684\u5177\u4F53\u573A\u666F\u540D\u79F0\u3002"),Z("current_time","\u5F53\u524D\u65F6\u95F4","\u6E38\u620F\u4E16\u754C\u7684\u5F53\u524D\u65F6\u95F4\uFF1B\u5982\u5267\u60C5\u6CA1\u6709\u660E\u786E\u65F6\u95F4\uFF0C\u53EF\u6839\u636E\u4E16\u754C\u89C2\u7ED9\u51FA\u5408\u7406\u65F6\u95F4\u3002"),Z("previous_scene_time","\u4E0A\u8F6E\u573A\u666F\u65F6\u95F4","\u4E0A\u4E00\u8F6E\u4EA4\u4E92\u7ED3\u675F\u65F6\u7684\u65F6\u95F4\u3002"),Z("elapsed_time","\u7ECF\u8FC7\u7684\u65F6\u95F4","\u6839\u636E\u5F53\u524D\u4E0E\u4E0A\u8F6E\u65F6\u95F4\u8BA1\u7B97\u51FA\u7684\u6587\u672C\u63CF\u8FF0\u3002")]}),Ur({id:"default_protagonist_profile",name:"\u4E3B\u89D2\u4FE1\u606F",note:"\u8BB0\u5F55\u4E3B\u89D2\u7684\u6838\u5FC3\u8EAB\u4EFD\u4FE1\u606F\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E3B\u89D2\u7684\u552F\u4E00\u6761\u76EE\u3002",create:"\u7981\u6B62\u65B0\u589E\u591A\u540D\u4E3B\u89D2\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u4E3B\u89D2\u8EAB\u4EFD\u3001\u5916\u8C8C\u3001\u7ECF\u5386\u6216\u6027\u683C\u6709\u660E\u786E\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[Z("name","\u4EBA\u7269\u540D\u79F0","\u4E3B\u89D2\u7684\u540D\u5B57\u3002"),Z("gender_age","\u6027\u522B/\u5E74\u9F84","\u4E3B\u89D2\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),Z("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u4E3B\u89D2\u5916\u8C8C\u7684\u5BA2\u89C2\u6587\u5B57\u63CF\u5199\u3002"),Z("identity","\u804C\u4E1A/\u8EAB\u4EFD","\u4E3B\u89D2\u5728\u793E\u4F1A\u6216\u5267\u60C5\u4E2D\u7684\u4E3B\u8981\u8EAB\u4EFD\u3002"),Z("history","\u8FC7\u5F80\u7ECF\u5386","\u4E3B\u89D2\u80CC\u666F\u6545\u4E8B\u4E0E\u5173\u952E\u7ECF\u5386\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002"),Z("personality","\u6027\u683C\u7279\u70B9","\u5BF9\u4E3B\u89D2\u6838\u5FC3\u6027\u683C\u7684\u6982\u62EC\u3002")]}),Ur({id:"default_important_characters",name:"\u91CD\u8981\u89D2\u8272\u8868",note:"\u8BB0\u5F55\u5173\u952E NPC \u6216\u91CD\u8981\u89D2\u8272\u7684\u4FE1\u606F\u548C\u52A8\u6001\u72B6\u6001\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u4E3A\u5F53\u524D\u5728\u573A\u7684\u91CD\u8981\u4EBA\u7269\u5206\u522B\u63D2\u5165\u6761\u76EE\u3002",create:"\u5267\u60C5\u4E2D\u6709\u672A\u8BB0\u5F55\u7684\u91CD\u8981\u4EBA\u7269\u767B\u573A\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u89D2\u8272\u7684\u72B6\u6001\u3001\u5173\u7CFB\u3001\u60F3\u6CD5\u3001\u7ECF\u5386\u6216\u6301\u6709\u7269\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:'\u901A\u5E38\u7981\u6B62\u5220\u9664\uFF1B\u89D2\u8272\u79BB\u573A\u65F6\u4F18\u5148\u66F4\u65B0"\u662F\u5426\u79BB\u573A"\u3002'},columns:[Z("name","\u59D3\u540D","\u89D2\u8272\u59D3\u540D\u3002"),Z("gender_age","\u6027\u522B/\u5E74\u9F84","\u89D2\u8272\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),Z("summary","\u4E00\u53E5\u8BDD\u4ECB\u7ECD","\u7528\u7B80\u77ED\u6587\u5B57\u6982\u62EC\u89D2\u8272\u8EAB\u4EFD\u80CC\u666F\u3002"),Z("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u89D2\u8272\u5916\u8C8C\u548C\u5F53\u524D\u8863\u7740\u7684\u5BA2\u89C2\u63CF\u5199\u3002"),Z("important_items","\u6301\u6709\u7684\u91CD\u8981\u7269\u54C1","\u89D2\u8272\u62E5\u6709\u7684\u5173\u952E\u7269\u54C1\uFF0C\u7528\u5206\u53F7\u5206\u9694\u3002"),Z("offstage","\u662F\u5426\u79BB\u573A",'\u5224\u65AD\u8BE5\u89D2\u8272\u5F53\u524D\u662F\u5426\u5DF2\u7ECF\u79BB\u573A\uFF0C\u586B\u5199"\u662F"\u6216"\u5426"\u3002',"boolean"),Z("history","\u8FC7\u5F80\u7ECF\u5386","\u89D2\u8272\u80CC\u666F\u4E0E\u5173\u952E\u4E8B\u4EF6\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002")]}),Ur({id:"default_protagonist_skills",name:"\u4E3B\u89D2\u6280\u80FD\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u83B7\u5F97\u7684\u6280\u80FD\u3001\u80FD\u529B\u6216\u9636\u6BB5\u6027\u6210\u957F\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u6280\u80FD\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u65B0\u6280\u80FD\u6216\u65B0\u80FD\u529B\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u6280\u80FD\u5347\u7EA7\u3001\u964D\u7EA7\u6216\u6548\u679C\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u6280\u80FD\u88AB\u5267\u60C5\u5265\u593A\u3001\u66FF\u6362\u6216\u5931\u6548\u65F6\u5220\u9664\u3002"},columns:[Z("skill_name","\u6280\u80FD\u540D\u79F0","\u6280\u80FD\u6216\u80FD\u529B\u540D\u79F0\u3002"),Z("skill_type","\u6280\u80FD\u7C7B\u578B","\u6280\u80FD\u7C7B\u522B\uFF0C\u4F8B\u5982\u4E3B\u52A8\u3001\u88AB\u52A8\u3001\u5929\u8D4B\u7B49\u3002"),Z("level","\u7B49\u7EA7/\u9636\u6BB5","\u6280\u80FD\u5F53\u524D\u7B49\u7EA7\u3001\u719F\u7EC3\u5EA6\u6216\u9636\u6BB5\u3002"),Z("effect","\u6548\u679C\u63CF\u8FF0","\u6280\u80FD\u5728\u5F53\u524D\u9636\u6BB5\u4E0B\u7684\u5177\u4F53\u6548\u679C\u3002")]}),Ur({id:"default_inventory",name:"\u80CC\u5305\u7269\u54C1\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u62E5\u6709\u7684\u7269\u54C1\u3001\u88C5\u5907\u6216\u6D88\u8017\u54C1\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u643A\u5E26\u7269\u54C1\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u80CC\u5305\u4E2D\u6CA1\u6709\u7684\u5168\u65B0\u7269\u54C1\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u7269\u54C1\u6570\u91CF\u3001\u72B6\u6001\u6216\u63CF\u8FF0\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7269\u54C1\u88AB\u5B8C\u5168\u6D88\u8017\u3001\u4E22\u5F03\u6216\u6467\u6BC1\u65F6\u5220\u9664\u3002"},columns:[Z("item_name","\u7269\u54C1\u540D\u79F0","\u7269\u54C1\u540D\u79F0\u3002"),Z("quantity","\u6570\u91CF","\u62E5\u6709\u6570\u91CF\u3002","number"),Z("description","\u63CF\u8FF0/\u6548\u679C","\u7269\u54C1\u529F\u80FD\u3001\u6548\u679C\u6216\u80CC\u666F\u63CF\u8FF0\u3002"),Z("category","\u7C7B\u522B","\u7269\u54C1\u7C7B\u522B\uFF0C\u4F8B\u5982\u6B66\u5668\u3001\u6D88\u8017\u54C1\u3001\u6742\u7269\u7B49\u3002")]}),Ur({id:"default_quests_events",name:"\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u6B63\u5728\u8FDB\u884C\u6216\u9700\u8981\u6301\u7EED\u8FFD\u8E2A\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u8981\u4EFB\u52A1\u6216\u5173\u952E\u4E8B\u4EF6\u3002",create:"\u4E3B\u89D2\u63A5\u53D6\u3001\u89E6\u53D1\u6216\u53D1\u73B0\u65B0\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u65F6\u65B0\u589E\u3002",update:"\u4EFB\u52A1\u53D6\u5F97\u5173\u952E\u8FDB\u5C55\u3001\u76EE\u6807\u53D8\u5316\u6216\u65F6\u9650\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u4EFB\u52A1\u5B8C\u6210\u3001\u5931\u8D25\u3001\u8FC7\u671F\u6216\u4E0D\u518D\u9700\u8981\u8FFD\u8E2A\u65F6\u5220\u9664\u3002"},columns:[Z("quest_name","\u4EFB\u52A1\u540D\u79F0","\u4EFB\u52A1\u6216\u4E8B\u4EF6\u6807\u9898\u3002"),Z("quest_type","\u4EFB\u52A1\u7C7B\u578B","\u4E3B\u7EBF\u3001\u652F\u7EBF\u3001\u4E2A\u4EBA\u3001\u7A81\u53D1\u4E8B\u4EF6\u7B49\u3002"),Z("issuer","\u53D1\u5E03\u8005","\u53D1\u5E03\u4EFB\u52A1\u6216\u89E6\u53D1\u4E8B\u4EF6\u7684\u89D2\u8272\u3001\u5730\u70B9\u6216\u52BF\u529B\u3002"),Z("detail","\u8BE6\u7EC6\u63CF\u8FF0","\u4EFB\u52A1\u76EE\u6807\u3001\u4E8B\u4EF6\u80CC\u666F\u548C\u8981\u6C42\u3002"),Z("progress","\u5F53\u524D\u8FDB\u5EA6","\u5BF9\u5B8C\u6210\u5EA6\u6216\u5F53\u524D\u9636\u6BB5\u7684\u7B80\u8981\u63CF\u8FF0\u3002"),Z("deadline","\u4EFB\u52A1\u65F6\u9650","\u5B8C\u6210\u4EFB\u52A1\u7684\u5269\u4F59\u65F6\u95F4\u6216\u622A\u6B62\u6761\u4EF6\u3002"),Z("reward","\u5956\u52B1","\u5B8C\u6210\u540E\u53EF\u80FD\u83B7\u5F97\u7684\u5956\u52B1\u3002"),Z("penalty","\u60E9\u7F5A","\u5931\u8D25\u6216\u9519\u8FC7\u540E\u7684\u540E\u679C\u3002")]}),Ur({id:"default_memo_log",name:"\u7EAA\u8981\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u6216\u5173\u952E\u7247\u6BB5\u53D1\u751F\u7684\u4E8B\u4EF6\u7EAA\u8981\uFF0C\u7528\u4E8E\u540E\u7EED\u56DE\u987E\u3002",aiInstructions:{init:"\u6545\u4E8B\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E00\u6761\u8BB0\u5F55\uFF0C\u7528\u4E8E\u8BB0\u5F55\u521D\u59CB\u5316\u5267\u60C5\u3002",create:"\u6BCF\u8F6E\u4EA4\u4E92\u7ED3\u675F\u540E\uFF0C\u82E5\u53D1\u751F\u4E86\u503C\u5F97\u8BB0\u5F55\u7684\u65B0\u4E8B\u4EF6\uFF0C\u5219\u63D2\u5165\u4E00\u6761\u65B0\u7EAA\u8981\u3002",update:"\u901A\u5E38\u7981\u6B62\u66F4\u65B0\u5386\u53F2\u7EAA\u8981\uFF1B\u53EA\u6709\u660E\u663E\u4E8B\u5B9E\u9519\u8BEF\u65F6\u624D\u4FEE\u6B63\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[Z("time_span","\u65F6\u95F4\u8DE8\u5EA6","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u7684\u65F6\u95F4\u8303\u56F4\u3002"),Z("location","\u5730\u70B9","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u5730\u70B9\u3002"),Z("memo","\u7EAA\u8981","\u4EE5\u7B2C\u4E09\u65B9\u89C6\u89D2\u5BA2\u89C2\u8BB0\u5F55\u672C\u8F6E\u53D1\u751F\u7684\u4E8B\u5B9E\u3002"),Z("summary","\u6982\u89C8","\u4E00\u53E5\u8BDD\u6982\u62EC\u7EAA\u8981\u5185\u5BB9\u3002"),Z("index_code","\u7F16\u7801\u7D22\u5F15","\u7528\u4E8E\u540E\u7EED\u68C0\u7D22\u7684\u7B80\u77ED\u7F16\u7801\u3002")]}),Ur({id:"default_options",name:"\u9009\u9879\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u4E3B\u89D2\u53EF\u4EE5\u91C7\u53D6\u7684\u884C\u52A8\u9009\u9879\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002\u6240\u6709\u9009\u9879\u4F7F\u7528\u7B2C\u4E09\u4EBA\u79F0\uFF0C\u4E0D\u4EE3\u66FF\u4E3B\u89D2\u53D1\u8A00\uFF0C\u5E76\u7D27\u6263\u5F53\u524D\u5267\u60C5\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u751F\u6210\u56DB\u4E2A\u521D\u59CB\u884C\u52A8\u9009\u9879\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u6BCF\u8F6E\u4EA4\u4E92\u540E\u6839\u636E\u5F53\u524D\u5267\u60C5\u751F\u6210\u65B0\u7684\u56DB\u4E2A\u9009\u9879\u5E76\u8986\u76D6\u539F\u6709\u5185\u5BB9\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[Z("option_1","\u9009\u9879\u4E00","\u504F\u5411\u7B56\u7565\u3001\u63A8\u8FDB\u5267\u60C5\u6216\u89E3\u51B3\u5F53\u524D\u95EE\u9898\u7684\u884C\u52A8\u3002"),Z("option_2","\u9009\u9879\u4E8C","\u504F\u5411\u8C28\u614E\u89C2\u5BDF\u3001\u6536\u96C6\u4FE1\u606F\u6216\u4FDD\u6301\u4E2D\u7ACB\u7684\u884C\u52A8\u3002"),Z("option_3","\u9009\u9879\u4E09","\u504F\u5411\u5E2E\u52A9\u3001\u4FDD\u62A4\u3001\u6C9F\u901A\u6216\u5B89\u629A\u7684\u884C\u52A8\u3002"),Z("option_4","\u9009\u9879\u56DB","\u504F\u5411\u5192\u9669\u3001\u8BD5\u63A2\u3001\u6539\u53D8\u5C40\u52BF\u6216\u5173\u7CFB\u4E92\u52A8\u7684\u884C\u52A8\u3002")]})])});function mx(t,e=""){return t==null?e:String(t).trim()||e}function jr(t){if(t==null)return"";if(typeof t=="string")return t;try{return JSON.stringify(t,null,2)}catch{return String(t)}}function Up(t,e="col"){return mx(t,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||e}function sn(t,e=new Set){let r=Up(t,"col"),s=r,o=2;for(;e.has(s);)s=`${r}_${o}`,o+=1;return e.add(s),s}var jp=N(()=>{});function D(t,e=""){return t==null?e:String(t).trim()||e}function or(t,e=!1){return t==null?e:t===!0}function hx(t){if(!Array.isArray(t)||t.length!==1)return!1;let e=t[0]&&typeof t[0]=="object"?t[0]:null;if(!e)return!1;let r=D(e.name||e.title,""),s=D(e.note||e.description,""),o=Array.isArray(e.columns)?e.columns:[],n=Array.isArray(e.rows)?e.rows:[];if(r&&!["\u88681","\u8868\u683C 1","\u8868\u683C1"].includes(r)||s||o.length!==1||n.length>1)return!1;let a=o[0]&&typeof o[0]=="object"?o[0]:{},i=D(a.key||a.id,""),l=D(a.title||a.name||a.label,"");if(D(a.description||a.note,"")||i&&i!=="col_1"||l&&!["\u52171","col_1"].includes(l))return!1;if(n.length===0)return!0;let d=n[0]&&typeof n[0]=="object"?n[0]:{},u=D(d.name||d.title||d.label,""),y=d.cells&&typeof d.cells=="object"&&!Array.isArray(d.cells)?d.cells:{},p=Array.isArray(d.values)?d.values:[],f=Object.values(y).some(g=>D(g,""))||p.some(g=>D(g,""));return(!u||u==="\u884C1")&&!f}function bx(t,{seedDefaultWhenMissing:e=!1}={}){return hx(t)?ne(no):Array.isArray(t)?ne(t):t&&typeof t=="object"?xx(t):e?ne(no):[]}function vl(t=""){let e=[],r=D(t,""),s=/-\s*列\d+\s*[:：]\s*([^\n\-–—]+?)\s*[-–—]\s*([^\n]+)/g,o;for(;o=s.exec(r);)e.push({title:D(o[1],""),description:D(o[2],"")});return e}function xx(t={}){let e=t&&typeof t=="object"?t:{};return Object.keys(e).filter(s=>s.startsWith("sheet_")&&e[s]&&typeof e[s]=="object").map((s,o)=>({key:s,table:e[s],fallbackOrder:o})).sort((s,o)=>{let n=Number.isFinite(s.table.orderNo)?s.table.orderNo:s.fallbackOrder,a=Number.isFinite(o.table.orderNo)?o.table.orderNo:o.fallbackOrder;return n-a}).map(({key:s,table:o},n)=>{let a=o.sourceData&&typeof o.sourceData=="object"?o.sourceData:{},i=Array.isArray(o.content)?o.content:[],l=Array.isArray(i[0])?i[0]:[],c=vl(a.note),d=new Set,u=l.slice(1).map((p,f)=>{let g=c[f]||{},h=D(p||g.title,`\u5217${f+1}`);return{key:sn(h||`col_${f+1}`,d),title:h,description:D(g.description,""),type:pa,required:!1}}),y=i.slice(1).map((p,f)=>{let g=Array.isArray(p)?p:[],h={};return u.forEach((x,v)=>{h[x.key]=jr(g[v+1])}),{name:D(g[0],`\u884C${f+1}`),cells:h}});return{id:D(o.uid||s,`sheet_${n+1}`),name:D(o.name,`\u8868${n+1}`),note:D(a.note,""),enabled:o.enabled!==!1,aiInstructions:{init:D(a.initNode,""),create:D(a.insertNode,""),update:D(a.updateNode,""),delete:D(a.deleteNode,"")},columns:u,rows:y}})}function wx(t=[]){let e=[],r=0;return t.forEach(s=>{let o=s&&typeof s=="object"?s:{},n=o.cells&&typeof o.cells=="object"&&!Array.isArray(o.cells)?o.cells:null,a=Array.isArray(o.cells)?o.cells:Array.isArray(o.values)?o.values:null;n&&Object.keys(n).forEach(i=>{e.includes(i)||e.push(i)}),a&&a.length>r&&(r=a.length)}),e.length>0?e.map(s=>({key:s,title:String(s)})):r>0?Array.from({length:r},(s,o)=>({key:`col_${o+1}`,title:`\u5217${o+1}`})):[]}function Tl(t,e=pa){let r=D(t,e);return zp.some(s=>s.value===r)?r:e}function vx(t={},e=0,r=new Set){let s=t&&typeof t=="object"?t:{},o=D(s.title||s.name||s.label,`\u5217${e+1}`),n=D(s.key||s.id,""),a=sn(n||o||`col_${e+1}`,r),i=[n,D(s.title,""),D(s.name,""),D(s.label,"")].filter(Boolean);return{key:a,title:o,description:D(s.description||s.note,""),type:Tl(s.type),required:s.required===!0,sourceKeys:i}}function Tx(t={},e={},r=0){let s=t.cells&&typeof t.cells=="object"&&!Array.isArray(t.cells)?t.cells:null,o=Array.isArray(t.cells)?t.cells:Array.isArray(t.values)?t.values:null;if(s){let n=[...Array.isArray(e.sourceKeys)?e.sourceKeys:[],e.key,e.title].filter(Boolean);for(let a of n)if(s[a]!==void 0)return jr(s[a])}return o&&o[r]!==void 0?jr(o[r]):""}function Sx(t={},e=[],r=0){let s=t&&typeof t=="object"?t:{},o={};return e.forEach((n,a)=>{o[n.key]=Tx(s,n,a)}),{id:Zo(s.id||s.rowId,r),name:D(s.name||s.title||s.label,`\u884C${r+1}`),cells:o}}function _x(t={}){let e=t&&typeof t=="object"?t:{};return{init:D(e.init,""),create:D(e.create,""),update:D(e.update,""),delete:D(e.delete,"")}}function Ex(t={},e=""){let r=t&&typeof t=="object"?t:{},s=D(r.presetId,D(e,""));return{enabled:r.enabled===!0,presetId:s}}function Ax(t={},e=""){let r=t&&typeof t=="object"?t:{};return{enabled:or(r.enabled,!1),entryName:D(r.entryName,e),entryType:r.entryType==="keyword"?"keyword":"constant",splitByRow:or(r.splitByRow,!1),keywords:D(r.keywords,""),injectionTemplate:D(r.injectionTemplate,""),preventRecursion:or(r.preventRecursion,!0),entryPlacement:{position:D(r.entryPlacement?.position||r.placement?.position,"before_character_definition"),depth:Number.isFinite(Number(r.entryPlacement?.depth??r.placement?.depth))?Math.floor(Number(r.entryPlacement?.depth??r.placement?.depth)):2,order:Number.isFinite(Number(r.entryPlacement?.order??r.placement?.order))?Math.floor(Number(r.entryPlacement?.order??r.placement?.order)):0}}}function Cx(t={},e=0){let r=t&&typeof t=="object"?t:{},s=new Set,n=(Array.isArray(r.columns)&&r.columns.length>0?r.columns:wx(Array.isArray(r.rows)?r.rows:[])).map((l,c)=>vx(l,c,s)),a=Array.isArray(r.rows)?r.rows.map((l,c)=>Sx(l,n,c)):[],i=D(r.name||r.title,`\u8868${e+1}`);return{id:Ht(r.id||r.key,e),name:i,note:D(r.note||r.description,""),enabled:r.enabled!==!1,aiInstructions:_x(r.aiInstructions),exportConfig:Ax(r.exportConfig,i),columns:n.map(l=>({key:l.key,title:l.title,description:D(l.description,""),type:Tl(l.type),required:l.required===!0})),rows:a}}function Fp(t={}){let e=t&&typeof t=="object"?t:{},r=Array.isArray(e.lastErrorDetails)?e.lastErrorDetails.map(o=>D(o,"")).filter(Boolean):[],s=e.lastValidationSummary&&typeof e.lastValidationSummary=="object"?{errorCount:Number.isFinite(e.lastValidationSummary.errorCount)?e.lastValidationSummary.errorCount:0,warningCount:Number.isFinite(e.lastValidationSummary.warningCount)?e.lastValidationSummary.warningCount:0}:{errorCount:0,warningCount:0};return{lastStatus:D(e.lastStatus,_e.IDLE),lastRunAt:Number.isFinite(e.lastRunAt)?e.lastRunAt:0,lastDurationMs:Number.isFinite(e.lastDurationMs)?e.lastDurationMs:0,lastError:D(e.lastError,""),lastErrorDetails:r,lastValidationSummary:s,successCount:Number.isFinite(e.successCount)?e.successCount:0,errorCount:Number.isFinite(e.errorCount)?e.errorCount:0,lastSourceMessageId:D(e.lastSourceMessageId,""),lastSlotRevisionKey:D(e.lastSlotRevisionKey,""),lastLoadMode:D(e.lastLoadMode,""),lastFillMode:D(e.lastFillMode,""),lastMirrorApplied:e.lastMirrorApplied===!0,lastResolvedFromMessageId:D(e.lastResolvedFromMessageId,""),lastResolvedFromRevisionKey:D(e.lastResolvedFromRevisionKey,""),lastSourceKind:D(e.lastSourceKind,""),lastScopeMode:D(e.lastScopeMode,""),lastAutoRunAt:Number.isFinite(e.lastAutoRunAt)?e.lastAutoRunAt:0,lastAutoStatus:D(e.lastAutoStatus,_e.IDLE),lastAutoMessageId:D(e.lastAutoMessageId,""),lastAutoRevisionKey:D(e.lastAutoRevisionKey,""),lastAutoSkipReason:D(e.lastAutoSkipReason,"")}}function kx(t={}){let e=t&&typeof t=="object"?t:{};return(Array.isArray(e.tables)?e.tables:[]).map((s,o)=>Cx(s,o))}function Wp(t="",e={},r={}){let s=Tl(e?.type),o=String(t??"").trim(),n=D(r?.label,`${D(r?.tableName,"\u8868\u683C")} / ${D(r?.rowName,"\u884C")} / ${D(e?.title||e?.key,"\u5355\u5143\u683C")}`),a=[],i=[];if(e?.required===!0&&!o&&a.push(`${n} \u4E3A\u5FC5\u586B\uFF0C\u5F53\u524D\u4E3A\u7A7A\u3002`),!o)return{valid:a.length===0,errors:a,warnings:i};if(s==="number"&&!Number.isFinite(Number(o))&&a.push(`${n} \u9700\u8981\u586B\u5199\u6570\u5B57\u3002`),s==="boolean"&&!["true","false","1","0","yes","no"].includes(o.toLowerCase())&&a.push(`${n} \u9700\u8981\u586B\u5199\u5E03\u5C14\u503C\uFF08true / false\uFF09\u3002`),s==="date"&&Number.isNaN(Date.parse(o))&&a.push(`${n} \u9700\u8981\u586B\u5199\u53EF\u89E3\u6790\u7684\u65E5\u671F\u3002`),s==="json")try{JSON.parse(o)}catch(l){a.push(`${n} \u9700\u8981\u586B\u5199\u5408\u6CD5 JSON\uFF1A${l?.message||"\u89E3\u6790\u5931\u8D25"}`)}return{valid:a.length===0,errors:a,warnings:i}}function Ix(t={}){let r=kx(t&&typeof t=="object"?t:{}),s=[];return r.forEach((o,n)=>{let a=D(o?.name,`\u8868${n+1}`),i=Array.isArray(o?.columns)?o.columns:[],l=Array.isArray(o?.rows)?o.rows:[];a||s.push(`\u8868 ${n+1} \u7F3A\u5C11\u540D\u79F0\u3002`),i.length===0&&s.push(`${a} \u81F3\u5C11\u9700\u8981\u4E00\u5217\u3002`);let c=new Set;i.forEach((d,u)=>{let y=D(d?.key,""),p=D(d?.title,`\u5217${u+1}`);if(!y){s.push(`${a} / ${p} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`);return}if(c.has(y)){s.push(`${a} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${y}`);return}c.add(y)}),l.forEach((d,u)=>{let y=D(d?.name,`\u884C${u+1}`),p=d?.cells&&typeof d.cells=="object"&&!Array.isArray(d.cells)?d.cells:{};i.forEach((f,g)=>{let h=D(f?.key,""),x=D(f?.title||h,`\u5217${g+1}`),v=h?jr(p[h]):"",T=Wp(v,f,{label:`${a} / ${y} / ${x}`,tableName:a,rowName:y});s.push(...T.errors)})})}),{valid:s.length===0,errors:s,tables:r}}function ao({severity:t="error",message:e="",tableIndex:r=-1,tableName:s="",columnIndex:o=-1,columnKey:n="",rowIndex:a=-1,rowName:i="",cellKey:l=""}={}){return{severity:t,message:D(e,t==="warning"?"\u5B58\u5728\u8B66\u544A\u3002":"\u5B58\u5728\u9519\u8BEF\u3002"),tableIndex:r,tableName:D(s,""),columnIndex:o,columnKey:D(n,""),rowIndex:a,rowName:D(i,""),cellKey:D(l,"")}}function ya(t={}){let e=Ix(t),r=[];if(!e.valid)return{...e,warnings:[],issues:r,summary:{errorCount:e.errors.length,warningCount:0}};let s=Array.isArray(e.tables)?e.tables:[];s.forEach((a,i)=>{let l=D(a?.name,`\u8868${i+1}`),c=Array.isArray(a?.columns)?a.columns:[],d=Array.isArray(a?.rows)?a.rows:[],u=new Set;l||r.push(ao({severity:"error",message:`\u8868 ${i+1} \u7F3A\u5C11\u540D\u79F0\u3002`,tableIndex:i,tableName:l})),c.forEach((y,p)=>{let f=D(y?.key,""),g=D(y?.title,`\u5217${p+1}`);f||r.push(ao({severity:"error",message:`${l} / ${g} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`,tableIndex:i,tableName:l,columnIndex:p,columnKey:f,cellKey:f})),f&&(u.has(f)&&r.push(ao({severity:"error",message:`${l} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${f}`,tableIndex:i,tableName:l,columnIndex:p,columnKey:f,cellKey:f})),u.add(f))}),d.forEach((y,p)=>{let f=D(y?.name,`\u884C${p+1}`),g=y?.cells&&typeof y.cells=="object"&&!Array.isArray(y.cells)?y.cells:{};Object.keys(g).forEach(x=>{c.some(v=>D(v?.key,"")===x)||r.push(ao({severity:"warning",message:`${l} / ${f} \u5305\u542B\u672A\u5B9A\u4E49\u5217 ${x}\uFF0C\u4FDD\u5B58\u540E\u4F1A\u88AB\u5FFD\u7565\u3002`,tableIndex:i,tableName:l,rowIndex:p,rowName:f,cellKey:x}))}),c.forEach((x,v)=>{let T=D(x?.key,""),L=D(x?.title||T,`\u5217${v+1}`),M=T?jr(g[T]):"",_=Wp(M,x,{label:`${l} / ${f} / ${L}`,tableName:l,rowName:f});_.errors.forEach(C=>{r.push(ao({severity:"error",message:C,tableIndex:i,tableName:l,columnIndex:v,columnKey:T,rowIndex:p,rowName:f,cellKey:T}))}),_.warnings.forEach(C=>{r.push(ao({severity:"warning",message:C,tableIndex:i,tableName:l,columnIndex:v,columnKey:T,rowIndex:p,rowName:f,cellKey:T}))})})})});let o=r.filter(a=>a.severity!=="warning").map(a=>a.message),n=r.filter(a=>a.severity==="warning").map(a=>a.message);return{valid:o.length===0,errors:o,warnings:n,issues:r,tables:s,summary:{errorCount:o.length,warningCount:n.length}}}function Hp(){return{tables:ne(no),promptTemplate:hl,apiPreset:"",promptPreset:"",bypass:{enabled:!1,presetId:""},activeTemplate:gt,autoUpdateEnabled:!1,autoUpdateTrigger:"assistantMessage",runScope:ft.ENABLED,scope:{mode:ft.ENABLED,selectedTableIds:[],activeTableId:""},fillMode:ua.INCREMENTAL,contextDepth:8,contextRoles:"all",contextExtractTags:[],contextUseGlobalRules:!1,worldbooks:{enabled:!1,selected:[]},sendLatestRows:-1,mirrorToMessage:!1,mirrorTag:"yyt-table-workbench",worldbookSync:{enabled:!1,targetBook:"",entryComment:"YYT-\u586B\u8868\u6570\u636E"},wrapperConfig:{enabled:!0,wrapperTag:"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",wrapperHint:"\u4EE5\u4E0B\u662F\u5728\u8FD9\u4E2A\u65F6\u95F4\u70B9\uFF0C\u5F53\u524D\u573A\u666F\u4E0B\u5267\u60C5\u76F8\u5173\u7684\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55\uFF0C\u4F60\u5728\u8FDB\u884C\u5267\u60C5\u5206\u6790\u65F6\u5FC5\u987B\u4EE5\u6B64\u6700\u65B0\u7684\u6570\u636E\u4E3A\u51C6\uFF0C\u4EE5\u4E0B\u6570\u636E\u4E0E\u8BB0\u5F55\u7684\u4F18\u5148\u7EA7\u9AD8\u4E8E\u5176\u4ED6\u4EFB\u4F55\u80CC\u666F\u8BBE\u5B9A\uFF1A",wrapperPlacement:{position:"before_character_definition",depth:2,order:0}},tableEnabledOverrides:{},runtime:Fp()}}function Ot(t={}){let e=Hp(),r=t&&typeof t=="object"?t:{},s=r.bypass?r.bypass:r.bypassPresetId?{presetId:r.bypassPresetId,enabled:!!r.bypassPresetId}:void 0,o=Ex(s,r.promptPreset),n=bx(r.tables,{seedDefaultWhenMissing:!Object.prototype.hasOwnProperty.call(r,"tables")}),a=r.scope&&typeof r.scope=="object"?r.scope:{},i=typeof r.runScope=="string"&&r.runScope?{...a,mode:r.runScope}:a,l=rn(i,{mode:r.runScope,selectedTableIds:r.selectedTableIds,activeTableId:r.activeTableId}),c=or(r.autoUpdateEnabled!==void 0?r.autoUpdateEnabled:r.automation?.enabled,e.autoUpdateEnabled);return{tables:n,promptTemplate:D(r.promptTemplate,e.promptTemplate),apiPreset:D(r.apiPreset,""),promptPreset:o.presetId,bypass:o,activeTemplate:D(r.activeTemplate,e.activeTemplate),autoUpdateEnabled:c,autoUpdateTrigger:D(r.autoUpdateTrigger,e.autoUpdateTrigger),runScope:l.mode,scope:l,fillMode:r.fillMode===ua.FULL?ua.FULL:e.fillMode,contextDepth:Number.isFinite(Number(r.contextDepth))&&Number(r.contextDepth)>0?Math.floor(Number(r.contextDepth)):e.contextDepth,contextRoles:r.contextRoles==="assistant_only"?"assistant_only":"all",contextExtractTags:Array.isArray(r.contextExtractTags)?r.contextExtractTags.filter(d=>typeof d=="string"&&d.trim()):typeof r.contextExtractTags=="string"&&r.contextExtractTags.trim()?r.contextExtractTags.split(`
`).map(d=>d.trim()).filter(Boolean):[],contextUseGlobalRules:or(r.contextUseGlobalRules??r.contextUseExtractRules??r.contextUseExcludeRules,!1),extraction:{regexPresetId:D(r.extraction?.regexPresetId,"")},worldbooks:{enabled:or(r.worldbooks?.enabled,!1),selected:Array.isArray(r.worldbooks?.selected)?r.worldbooks.selected.filter(d=>typeof d=="string"&&d.trim()):[],presetId:D(r.worldbooks?.presetId,"")},sendLatestRows:Number.isFinite(Number(r.sendLatestRows))?Math.floor(Number(r.sendLatestRows)):-1,mirrorToMessage:or(r.mirrorToMessage,e.mirrorToMessage),mirrorTag:D(r.mirrorTag,e.mirrorTag),worldbookSync:{enabled:or(r.worldbookSync?.enabled,!1),targetBook:D(r.worldbookSync?.targetBook,""),entryComment:D(r.worldbookSync?.entryComment,e.worldbookSync.entryComment),wrapperConfig:r.worldbookSync?.wrapperConfig?{enabled:or(r.worldbookSync.wrapperConfig?.enabled,!0),wrapperTag:D(r.worldbookSync.wrapperConfig?.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:D(r.worldbookSync.wrapperConfig?.wrapperHint,""),wrapperPlacement:{position:D(r.worldbookSync.wrapperConfig?.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.depth))?Math.floor(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.order))?Math.floor(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}}:void 0},wrapperConfig:{enabled:or(r.wrapperConfig?.enabled,e.wrapperConfig.enabled),wrapperTag:D(r.wrapperConfig?.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:D(r.wrapperConfig?.wrapperHint,e.wrapperConfig.wrapperHint),wrapperPlacement:{position:D(r.wrapperConfig?.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(r.wrapperConfig?.wrapperPlacement?.depth))?Math.floor(Number(r.wrapperConfig?.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(r.wrapperConfig?.wrapperPlacement?.order))?Math.floor(Number(r.wrapperConfig?.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}},tableEnabledOverrides:r.tableEnabledOverrides&&typeof r.tableEnabledOverrides=="object"&&!Array.isArray(r.tableEnabledOverrides)?Object.fromEntries(Object.entries(r.tableEnabledOverrides).filter(([d,u])=>typeof d=="string"&&d&&typeof u=="boolean")):{},runtime:Fp({...e.runtime,...r.runtime||{}})}}function Sl(t={}){let e=Ot(t),r=[];return Array.isArray(e.tables)||r.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u662F JSON \u6570\u7EC4\u3002"),e.promptTemplate||r.push("\u586B\u8868 Prompt \u4E0D\u80FD\u4E3A\u7A7A\u3002"),e.mirrorTag||r.push("\u6B63\u6587\u955C\u50CF\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A\u3002"),{valid:r.length===0,errors:r,config:e}}function Ie(){let t=xl.get(wl,Hp()),e=Ot(t),r=ml();return{...Lp(e,r),guide:r}}function Rx(t){let r=(Array.isArray(t?.tables)?t.tables:[]).map(s=>({...s,rows:[]}));return{...t,tables:r}}function at(t={}){let e=Ie(),r=Ot({...e,...t||{},runtime:t?.runtime===void 0?e.runtime:t.runtime}),s=Sl(r);if(!s.valid)return{success:!1,error:s.errors.join(`
`),errors:s.errors,config:s.config};let o=Rx(s.config);return xl.set(wl,o),$p({templateId:s.config.activeTemplate,scope:s.config.scope,worldbookSync:s.config.worldbookSync}),{success:!0,config:s.config}}function Yp(t={}){let e=Ie(),r=Ot({...e,runtime:{...e.runtime,...t||{}}});return xl.set(wl,r),r.runtime}function Mx(t={},e={}){let r=Ot(t),s=D(r.promptTemplate,hl);return e.skipResponseContract?s.trim():`${s}

${Bp}`.trim()}function Gp(t={},e={}){let r=Ot(t);return{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",promptTemplate:Mx(r,e),bypass:{enabled:r.bypass?.enabled===!0,presetId:r.bypass?.presetId||r.promptPreset||""}}}var xl,wl,sr=N(()=>{ze();Ke();io();da();Op();Kp();jp();xl=$.namespace("tableWorkbench"),wl="config"});function El(){return _l||(_l=I.createScope("TableIsolation")),_l}var qp,Vp,_l,Al,he,Ss=N(()=>{ze();H();Ke();qp="tableEngine.isolation",Vp=Object.freeze({enabled:!1,key:Lt});Al=class{constructor(){this._cache=null,this._subscribers=new Set}getState(){if(this._cache)return this._cache;let e=$.get(qp,null);return this._cache=this._normalize(e),this._cache}isEnabled(){return this.getState().enabled===!0}getKey(){let e=this.getState();return e.enabled?e.key||Lt:Lt}getConfiguredKey(){return this.getState().key}setEnabled(e){let r=this._normalize({...this.getState(),enabled:!!e});this._commit(r,{reason:"enabled"})}setKey(e){let r=this._normalize({...this.getState(),key:e});this._commit(r,{reason:"key"})}updateState(e={}){let r=this.getState(),s=this._normalize({enabled:e.enabled!==void 0?!!e.enabled:r.enabled,key:e.key!==void 0?e.key:r.key});this._commit(s,{reason:"patch"})}reset(){this._commit({...Vp},{reason:"reset"})}getScopeKey(e){return tn(e,this.getKey())}subscribe(e){return typeof e!="function"?()=>{}:(this._subscribers.add(e),()=>this._subscribers.delete(e))}_normalize(e){return!e||typeof e!="object"?{...Vp}:{enabled:e.enabled===!0,key:Ce(e.key)}}_commit(e,r={}){let s=this.getState();if(s.enabled===e.enabled&&s.key===e.key)return;this._cache=e;try{$.set(qp,e)}catch(n){El().error("isolation \u72B6\u6001\u843D\u76D8\u5931\u8D25",n)}El().info("isolation \u72B6\u6001\u53D8\u5316",{prev:s,next:e,reason:r.reason||""});let o={...e,prev:s,reason:r.reason||""};for(let n of this._subscribers)try{n(o)}catch(a){El().error("isolation \u8BA2\u9605\u8005\u56DE\u8C03\u5F02\u5E38",a)}}},he=new Al});var Jp={};re(Jp,{AuthorityProvider:()=>fa,default:()=>Nx});var lo,Cl,Px,Wr,fa,Nx,Xp=N(()=>{H();uo();lo=I.createScope("AuthorityProvider"),Cl="third-party/youyou-toolkit",Px="YouYou Toolkit",Wr="main",fa=class{constructor({extensionVersion:e="1.0.149"}={}){this.kind=co.AUTHORITY,this._client=null,this._extensionVersion=e,this._initialized=!1}async init(){let e=ga();if(!e)return lo.error("\u672A\u68C0\u6D4B\u5230 window.STAuthority.AuthoritySDK"),!1;try{return this._client=await e.init({extensionId:Cl,displayName:Px,version:this._extensionVersion,installType:"local",declaredPermissions:{sql:{private:!0}}}),this._initialized=!0,lo.info("AuthorityProvider \u521D\u59CB\u5316\u6210\u529F",{extensionId:Cl}),!0}catch(r){return lo.error("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25",{error:r?.message||r}),this._initialized=!1,!1}}async dispose(){this._client=null,this._initialized=!1}async migrate({migrations:e,database:r=Wr,tableName:s}={}){this._ensureReady();let o={database:r,migrations:e};s&&(o.tableName=s);let n=await this._client.sql.migrate(o);return{applied:n?.applied||[],skipped:n?.skipped||[],tableName:n?.tableName,latestId:n?.latestId}}async query({statement:e,params:r=[],database:s=Wr,page:o=void 0}={}){this._ensureReady();let n={database:s,statement:e,params:r};o&&(n.page=o);let a=await this._client.sql.query(n);return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0),page:a.page}}async execute({statement:e,params:r=[],database:s=Wr}={}){this._ensureReady();let o=await this._client.sql.exec({database:s,statement:e,params:r});return{rowsAffected:o.rowsAffected??0,lastInsertRowid:o.lastInsertRowid??null}}async batch({statements:e,database:r=Wr}={}){this._ensureReady();let s=(e||[]).map(n=>({mode:n.mode||(/^\s*SELECT/i.test(n.statement)?"query":"exec"),statement:n.statement,params:n.params||[]}));return{results:(await this._client.sql.batch({database:r,statements:s}))?.results||[]}}async transaction({statements:e,database:r=Wr}={}){this._ensureReady();let s=(e||[]).map(n=>({mode:n.mode||(/^\s*SELECT/i.test(n.statement)?"query":"exec"),statement:n.statement,params:n.params||[]})),o=await this._client.sql.transaction({database:r,statements:s});return{committed:!!o?.committed,results:o?.results||[]}}async paginate({statement:e,params:r=[],database:s=Wr,page:o={}}={}){return this._ensureReady(),this.query({statement:e,params:r,database:s,page:o})}async pageAll({statement:e,params:r=[],database:s=Wr,pageSize:o=200,maxPages:n}={}){this._ensureReady();let a=await this._client.sql.pageAll({database:s,statement:e,params:r},{pageSize:o,maxPages:n});return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0)}}async backup(){return lo.warn("backup() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5907\u4EFD"),{kind:"authority",timestamp:Date.now()}}async export(){return lo.warn("export() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u51FA"),{kind:"authority",timestamp:Date.now()}}async import(){lo.warn("import() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u5165")}describe(){return{kind:this.kind,initialized:this._initialized,extensionId:Cl,database:Wr,hasClient:!!this._client}}_ensureReady(){if(!this._initialized||!this._client)throw new Error("AuthorityProvider \u5C1A\u672A\u521D\u59CB\u5316")}},Nx=fa});var Zp={};re(Zp,{FallbackProvider:()=>ma,default:()=>Ux});function Dx(t){let e=[],r=0,s="";for(let o of t)o==="("?r+=1:o===")"&&(r-=1),o===","&&r===0?(s.trim()&&e.push(s),s=""):s+=o;return s.trim()&&e.push(s),e}function $x(t){let e=t.match(/^\s*CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(([\s\S]+)\)\s*$/i);if(!e)return null;let r=e[1],s=e[2],o=Dx(s),n=[],a=[];for(let i of o){let l=i.trim(),c=l.match(/^PRIMARY\s+KEY\s*\(([^)]+)\)$/i);if(c){a=c[1].split(",").map(u=>u.trim());continue}let d=l.match(/^(\w+)\s+(\w+)/);d&&(n.push({name:d[1],type:d[2].toUpperCase(),raw:l}),/PRIMARY\s+KEY/i.test(l)&&!a.length&&(a=[d[1]]))}return{name:r,columns:n,pkCols:a}}function Lx(t){let e=t.match(/^\s*INSERT\s+(?:OR\s+REPLACE\s+)?INTO\s+(\w+)(?:\s*\(([^)]+)\))?\s+VALUES\s*\(([^)]+)\)\s*$/i);if(!e)return null;let r=e[1],s=e[2]?e[2].split(",").map(n=>n.trim()):null,o=(e[3].match(/\?/g)||[]).length;return{name:r,cols:s,paramCount:o}}function Rl(t){let e=t.split(/\s+AND\s+/i),r=[];for(let s of e){let o=s.match(/^\s*(\w+)\s*(=|!=|<>|>=|<=|>|<)\s*\?\s*$/);if(o){let a=o[2]==="<>"?"!=":o[2];r.push({col:o[1],op:a,placeholder:!0});continue}let n=s.match(/^\s*(\w+)\s+IS\s+(NOT\s+)?NULL\s*$/i);if(n){r.push({col:n[1],op:n[2]?"IS NOT NULL":"IS NULL",placeholder:!1});continue}throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 WHERE \u5B50\u53E5: "${s}"`)}return r}function Ox(t){let e=t.match(/^\s*SELECT\s+([\s\S]+?)\s+FROM\s+(\w+)([\s\S]*)$/i);if(!e)return null;let r=e[1].trim(),s=e[2],o=e[3],n=o.match(/\bWHERE\s+([\s\S]+?)(?=\bORDER\s+BY\b|\bLIMIT\b|\bOFFSET\b|$)/i),a=o.match(/\bORDER\s+BY\s+(\w+)\s*(ASC|DESC)?/i),i=o.match(/\bLIMIT\s+(\d+)/i),l=o.match(/\bOFFSET\s+(\d+)/i);return{name:s,cols:r==="*"?null:r.split(",").map(c=>c.trim()),where:n?Rl(n[1].trim()):null,orderBy:a?{col:a[1],dir:(a[2]||"ASC").toUpperCase()}:null,limit:i?parseInt(i[1],10):null,offset:l?parseInt(l[1],10):null}}function Bx(t){let e=t.match(/^\s*UPDATE\s+(\w+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);if(!e)return null;let r=e[1],s=e[2],o=e[3],n=s.split(",").map(a=>{let i=a.trim().match(/^(\w+)\s*=\s*\?$/);if(!i)throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 SET \u5B50\u53E5: "${a}"`);return i[1]});return{name:r,setCols:n,where:o?Rl(o.trim()):null}}function zx(t){let e=t.match(/^\s*DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);return e?{name:e[1],where:e[2]?Rl(e[2].trim()):null}:null}function Il(t,e){return t===e?!0:t==null?e==null:e==null?!1:typeof t=="number"||typeof e=="number"?Number(t)===Number(e):String(t)===String(e)}function on(t,e){return t===e?0:t==null?-1:e==null?1:typeof t=="number"&&typeof e=="number"?t-e:String(t)<String(e)?-1:1}function Kx(t,e,r){let s=t[e.col];if(e.op==="IS NULL")return s==null;if(e.op==="IS NOT NULL")return s!=null;let o=r.shift();switch(e.op){case"=":return Il(s,o);case"!=":return!Il(s,o);case">":return on(s,o)>0;case"<":return on(s,o)<0;case">=":return on(s,o)>=0;case"<=":return on(s,o)<=0;default:return!1}}function kl(t,e,r){if(!e||!e.length)return!0;let s=Array.isArray(r)?[...r]:[];for(let o of e)if(!Kx(t,o,s))return!1;return!0}var po,Qp,ma,Ux,ey=N(()=>{H();ze();uo();po=I.createScope("FallbackProvider"),Qp="provider_fallback_v1";ma=class{constructor(){this.kind=co.FALLBACK,this._tables=new Map,this._migrations=new Set,this._initialized=!1,this._dirty=!1,this._saveTimer=null}async init(){try{let e=be.get(Qp)||{};this._migrations=new Set(Array.isArray(e.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,s]of Object.entries(e.tables||{}))this._tables.set(r,{schema:s.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(s.rows)?s.rows:[]});return this._initialized=!0,po.info("FallbackProvider \u521D\u59CB\u5316\u5B8C\u6210",{tables:this._tables.size,migrations:this._migrations.size}),!0}catch(e){return po.error("FallbackProvider \u521D\u59CB\u5316\u5931\u8D25",{error:e?.message||e}),this._initialized=!1,!1}}async dispose(){this._flushSave(!0),this._tables.clear(),this._migrations.clear(),this._initialized=!1}async migrate({migrations:e}={}){this._ensureReady();let r=[],s=[];for(let o of e||[]){if(!o?.id||!o?.statement)continue;if(this._migrations.has(o.id)){s.push(o.id);continue}let n=o.statement.trim();if(/^CREATE\s+TABLE/i.test(n)){let a=$x(n);if(!a)throw new Error(`\u65E0\u6CD5\u89E3\u6790 CREATE TABLE: ${n}`);this._tables.has(a.name)||this._tables.set(a.name,{schema:a,rows:[]})}else if(!/^CREATE\s+(UNIQUE\s+)?INDEX/i.test(n))if(/^DROP\s+TABLE/i.test(n)){let a=n.match(/^DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?(\w+)/i);a&&this._tables.delete(a[1])}else/^ALTER\s+TABLE/i.test(n)?po.warn("FallbackProvider \u4E0D\u652F\u6301 ALTER TABLE\uFF0C\u8DF3\u8FC7",{id:o.id}):po.warn("FallbackProvider \u8DF3\u8FC7\u672A\u8BC6\u522B DDL",{id:o.id,statement:n});this._migrations.add(o.id),r.push(o.id)}return this._markDirty(),{applied:r,skipped:s}}async query({statement:e,params:r=[]}={}){this._ensureReady();let s=Ox(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 SELECT: ${e}`);let o=this._tables.get(s.name);if(!o)return{columns:s.cols||[],rows:[],rowCount:0};let n=o.rows.filter(l=>kl(l,s.where,r));if(s.orderBy){let l=s.orderBy.dir==="DESC"?-1:1;n=[...n].sort((c,d)=>on(c[s.orderBy.col],d[s.orderBy.col])*l)}s.offset&&(n=n.slice(s.offset)),Number.isFinite(s.limit)&&(n=n.slice(0,s.limit));let a,i=n;return s.cols?(i=n.map(l=>{let c={};for(let d of s.cols)c[d]=l[d]===void 0?null:l[d];return c}),a=s.cols):a=o.schema?.columns?.map(l=>l.name)||(i[0]?Object.keys(i[0]):[]),{columns:a,rows:i,rowCount:i.length}}async execute({statement:e,params:r=[]}={}){this._ensureReady();let s=String(e||"").trim(),o=s.split(/\s+/)[0].toUpperCase(),n;if(o==="INSERT")n=this._doInsert(s,r);else if(o==="UPDATE")n=this._doUpdate(s,r);else if(o==="DELETE")n=this._doDelete(s,r);else throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 execute \u8BED\u53E5: ${e}`);return n}_doInsert(e,r){let s=Lx(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 INSERT: ${e}`);let o=this._tables.get(s.name);if(!o)throw new Error(`\u8868\u4E0D\u5B58\u5728: ${s.name}`);let n=s.cols||(o.schema.columns||[]).map(c=>c.name);if(!n.length)throw new Error(`\u8868 ${s.name} \u65E0\u5217\u5B9A\u4E49`);if(r.length!==n.length)throw new Error(`INSERT \u53C2\u6570\u6570\u91CF\u4E0D\u5339\u914D (\u671F\u671B ${n.length}, \u5B9E\u9645 ${r.length})`);let a={};for(let c=0;c<n.length;c+=1)a[n[c]]=r[c];let i=o.schema?.pkCols||[],l=/^INSERT\s+OR\s+REPLACE/i.test(e);if(i.length){let c=o.rows.findIndex(d=>i.every(u=>Il(d[u],a[u])));if(c>=0){if(l)return o.rows[c]=a,this._markDirty(),{rowsAffected:1,lastInsertRowid:c+1};throw new Error(`PRIMARY KEY \u51B2\u7A81 (${i.join(",")})`)}}return o.rows.push(a),this._markDirty(),{rowsAffected:1,lastInsertRowid:o.rows.length}}_doUpdate(e,r){let s=Bx(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 UPDATE: ${e}`);let o=this._tables.get(s.name);if(!o)return{rowsAffected:0,lastInsertRowid:null};let n=s.setCols.length;if(r.length<n)throw new Error(`UPDATE \u53C2\u6570\u4E0D\u8DB3 (SET \u9700\u8981 ${n}, \u5B9E\u9645 ${r.length})`);let a=r.slice(0,n),i=r.slice(n),l=0;for(let c of o.rows)if(kl(c,s.where,i)){for(let d=0;d<n;d+=1)c[s.setCols[d]]=a[d];l+=1}return l>0&&this._markDirty(),{rowsAffected:l,lastInsertRowid:null}}_doDelete(e,r){let s=zx(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 DELETE: ${e}`);let o=this._tables.get(s.name);if(!o)return{rowsAffected:0,lastInsertRowid:null};let n=o.rows.length;o.rows=o.rows.filter(i=>!kl(i,s.where,r));let a=n-o.rows.length;return a>0&&this._markDirty(),{rowsAffected:a,lastInsertRowid:null}}async batch({statements:e}={}){this._ensureReady();let r=[];for(let s of e||[])if(String(s.statement||"").trim().split(/\s+/)[0].toUpperCase()==="SELECT"){let n=await this.query(s);r.push({kind:"query",...n})}else{let n=await this.execute(s);r.push({kind:"exec",...n})}return{results:r}}async transaction({statements:e}={}){this._ensureReady();let r=this._snapshot();try{let{results:s}=await this.batch({statements:e});return this._flushSave(!0),{committed:!0,results:s}}catch(s){throw this._restore(r),po.warn("FallbackProvider \u4E8B\u52A1\u56DE\u6EDA",{error:s?.message||s}),s}}async paginate({statement:e,params:r=[],page:s={}}={}){this._ensureReady();let o=Number.isFinite(s?.limit)?s.limit:50,n=Number.isFinite(s?.offset)?s.offset:0,a=`${e} LIMIT ${o} OFFSET ${n}`;return this.query({statement:a,params:r})}async backup(){return this._ensureReady(),this._snapshot()}async export(){return this.backup()}async import(e){this._ensureReady(),this._restore(e||{}),this._markDirty(),this._flushSave(!0)}describe(){return{kind:this.kind,initialized:this._initialized,tables:this._tables.size,migrations:this._migrations.size,tableNames:[...this._tables.keys()]}}_snapshot(){let e={};for(let[r,s]of this._tables)e[r]={schema:s.schema,rows:JSON.parse(JSON.stringify(s.rows))};return{migrations:[...this._migrations],tables:e}}_restore(e){this._migrations=new Set(Array.isArray(e?.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,s]of Object.entries(e?.tables||{}))this._tables.set(r,{schema:s.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(s.rows)?s.rows:[]})}_markDirty(){this._dirty=!0,this._saveTimer&&clearTimeout(this._saveTimer),this._saveTimer=setTimeout(()=>this._flushSave(!1),300)}_flushSave(e){if(this._saveTimer&&(clearTimeout(this._saveTimer),this._saveTimer=null),!(!this._dirty&&!e))try{be.set(Qp,this._snapshot()),this._dirty=!1}catch(r){po.error("FallbackProvider \u6301\u4E45\u5316\u5931\u8D25",{error:r?.message||r})}}_ensureReady(){if(!this._initialized)throw new Error("FallbackProvider \u5C1A\u672A\u521D\u59CB\u5316")}},Ux=ma});var ty={};re(ty,{PROVIDER_KIND:()=>co,createProvider:()=>jx,detectAuthoritySdk:()=>ga,disposeToolDataProvider:()=>Fx,getCurrentProvider:()=>yo,getToolDataProvider:()=>an});function ga(){if(typeof window>"u")return null;try{let t=window.STAuthority?.AuthoritySDK;if(t)return t}catch{}try{if(window.parent&&window.parent!==window){let t=window.parent.STAuthority?.AuthoritySDK;if(t)return t}}catch{}return null}async function Pl({preferAuthority:t=!0,extensionVersion:e="1.0.149"}={}){if(t&&ga()){let{AuthorityProvider:s}=await Promise.resolve().then(()=>(Xp(),Jp));return new s({extensionVersion:e})}let{FallbackProvider:r}=await Promise.resolve().then(()=>(ey(),Zp));return new r}async function an(t={}){return _s||nn||(nn=(async()=>{let e=await Pl({preferAuthority:!0,...t}),r=await e.init();if(!r&&e.kind===co.AUTHORITY){Ml.warn("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 FallbackProvider");try{await e.dispose()}catch{}e=await Pl({preferAuthority:!1}),r=await e.init()}return r?Ml.info(`Provider \u521D\u59CB\u5316\u5B8C\u6210: kind=${e.kind}`):Ml.error(`Provider \u5168\u90E8\u521D\u59CB\u5316\u5931\u8D25 (kind=${e.kind})`),_s=e,e})(),nn)}function yo(){return _s}async function jx(t={}){let e=await Pl(t);return await e.init(),e}async function Fx(){if(_s){try{await _s.dispose()}catch{}_s=null}nn=null}var Ml,co,_s,nn,uo=N(()=>{H();Ml=I.createScope("ToolDataProvider"),co=Object.freeze({AUTHORITY:"authority",FALLBACK:"fallback"}),_s=null,nn=null});var zl={};re(zl,{clearChatScopeConfig:()=>gy,clearLockEntry:()=>dy,clearScopeLocks:()=>py,clearSheetLocks:()=>uy,clearSlot:()=>iy,commitSlotTables:()=>wa,default:()=>Hx,deleteRowsBySheet:()=>ny,deleteSheetsBySlot:()=>xa,ensureTableDataReady:()=>Ue,getChatScopeConfig:()=>yy,getCurrentTableDataProvider:()=>sy,getLocksForSheet:()=>ly,getRowsBySheet:()=>Bl,getSheetsBySlot:()=>Ll,loadSlotTables:()=>ay,setChatScopeConfig:()=>fy,setLockEntry:()=>cy,upsertSheetMeta:()=>$l,upsertSheetRows:()=>Ol});function Dl(){return Nl||(Nl=I.createScope("TableDataService")),Nl}async function Ue(){return ry?yo():ln||(ln=(async()=>{try{let t=await an();if(!t)return Dl().error("Provider \u4E0D\u53EF\u7528\uFF0C\u8DF3\u8FC7 migration"),null;let e=await t.migrate({migrations:[...Wx]});return ry=!0,Dl().info("\u8868\u683C\u6570\u636E migration \u5B8C\u6210",{kind:t.kind,applied:e?.applied?.length||0,skipped:e?.skipped?.length||0}),t}catch(t){return Dl().error("table-data-service migration \u5931\u8D25",t),null}finally{ln=null}})(),ln)}function sy(){return yo()}function oy(){return Date.now()}function ha(t){try{return JSON.stringify(t)}catch{return"{}"}}function ba(t,e=null){if(typeof t!="string")return e;try{return JSON.parse(t)}catch{return e}}function Hr(t={}){return{chatId:String(t.chatId??"").trim(),messageId:String(t.messageId??"").trim(),swipeId:String(t.swipeId??"0").trim()||"0",isolationKey:Ce(t.isolationKey)}}function Yr(t){return t&&t.chatId&&t.messageId}async function $l(t,e){let r=await Ue();if(!r)return!1;let s=Hr(t);return!Yr(s)||!e?.uid?!1:(await r.execute({statement:`INSERT INTO table_sheets
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, name, columns_json, meta_json, order_no, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e.uid),String(e.name??e.uid),ha(Array.isArray(e.columns)?e.columns:[]),ha(e.meta||e.sourceData||{}),Number.isFinite(e.orderNo)?e.orderNo:0,oy()]}),!0)}async function Ll(t){let e=await Ue();if(!e)return[];let r=Hr(t);return Yr(r)?((await e.query({statement:`SELECT * FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?
      ORDER BY order_no ASC`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rows||[]).map(o=>({uid:o.sheet_uid,name:o.name,columns:ba(o.columns_json,[]),meta:ba(o.meta_json,{}),orderNo:o.order_no||0,updatedAt:o.updated_at||0})):[]}async function xa(t){let e=await Ue();if(!e)return 0;let r=Hr(t);return Yr(r)&&(await e.execute({statement:`DELETE FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rowsAffected||0}async function Ol(t,e,r){let s=await Ue();if(!s)return!1;let o=Hr(t);if(!Yr(o)||!e||!Array.isArray(r))return!1;if(await s.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[o.chatId,o.messageId,o.swipeId,o.isolationKey,String(e)]}),r.length===0)return!0;let n=r.map((a,i)=>({statement:`INSERT INTO table_rows
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, row_index, row_id, row_name, cells_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[o.chatId,o.messageId,o.swipeId,o.isolationKey,String(e),i,String(a?.id??""),String(a?.name??""),ha(a?.cells||{})]}));return typeof s.transaction=="function"?await s.transaction({statements:n}):await s.batch({statements:n}),!0}async function Bl(t,e){let r=await Ue();if(!r)return[];let s=Hr(t);return!Yr(s)||!e?[]:((await r.query({statement:`SELECT * FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?
      ORDER BY row_index ASC`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e)]}))?.rows||[]).map(n=>({id:n.row_id||"",name:n.row_name||"",cells:ba(n.cells_json,{}),rowIndex:n.row_index}))}async function ny(t,e){let r=await Ue();if(!r)return 0;let s=Hr(t);return!Yr(s)||!e?0:(await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e)]}))?.rowsAffected||0}async function ay(t){let e=await Ll(t);if(e.length===0)return[];let r=[];for(let s of e){let o=await Bl(t,s.uid);r.push({id:s.uid,uid:s.uid,name:s.name,columns:s.columns,rows:o,meta:s.meta,orderNo:s.orderNo,updatedAt:s.updatedAt})}return r}async function wa(t,e){let r=await Ue();if(!r)return!1;let s=Hr(t);if(!Yr(s)||!Array.isArray(e))return!1;await xa(s),await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey]});for(let o=0;o<e.length;o++){let n=e[o],a=String(n?.uid||n?.id||`sheet_${o+1}`);await $l(s,{uid:a,name:n?.name||a,columns:n?.columns||[],meta:n?.meta||{},orderNo:Number.isFinite(n?.orderNo)?n.orderNo:o}),await Ol(s,a,Array.isArray(n?.rows)?n.rows:[])}return!0}async function iy(t){let e=await Ue();if(!e)return!1;let r=Hr(t);return Yr(r)?(await xa(r),await e.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}),!0):!1}async function ly(t,e){let r=await Ue();if(!r)return[];let s=String(t?.chatId??"").trim(),o=Ce(t?.isolationKey);return!s||!e?[]:((await r.query({statement:`SELECT lock_type, target FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s,o,String(e)]}))?.rows||[]).map(a=>({lockType:a.lock_type,target:a.target||""}))}async function cy(t,e,r,s=""){let o=await Ue();if(!o)return!1;let n=String(t?.chatId??"").trim(),a=Ce(t?.isolationKey);return!n||!e||!r?!1:(await o.execute({statement:"INSERT INTO table_locks (chat_id, isolation_key, sheet_uid, lock_type, target) VALUES (?, ?, ?, ?, ?)",params:[n,a,String(e),String(r),String(s)]}),!0)}async function dy(t,e,r,s=""){let o=await Ue();if(!o)return!1;let n=String(t?.chatId??"").trim(),a=Ce(t?.isolationKey);return!n||!e||!r?!1:(await o.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ? AND lock_type = ? AND target = ?`,params:[n,a,String(e),String(r),String(s)]}),!0)}async function uy(t,e){let r=await Ue();if(!r)return!1;let s=String(t?.chatId??"").trim(),o=Ce(t?.isolationKey);return!s||!e?!1:(await r.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s,o,String(e)]}),!0)}async function py(t){let e=await Ue();if(!e)return!1;let r=String(t?.chatId??"").trim(),s=Ce(t?.isolationKey);return r?(await e.execute({statement:"DELETE FROM table_locks WHERE chat_id = ? AND isolation_key = ?",params:[r,s]}),!0):!1}async function yy(t){let e=await Ue();if(!e)return null;let r=String(t??"").trim();if(!r)return null;let o=(await e.query({statement:"SELECT scoped_config_json FROM table_chat_scope WHERE chat_id = ?",params:[r]}))?.rows?.[0];return o?ba(o.scoped_config_json,null):null}async function fy(t,e){let r=await Ue();if(!r)return!1;let s=String(t??"").trim();return s?(await r.execute({statement:"INSERT INTO table_chat_scope (chat_id, scoped_config_json, updated_at) VALUES (?, ?, ?)",params:[s,ha(e||{}),oy()]}),!0):!1}async function gy(t){let e=await Ue();if(!e)return!1;let r=String(t??"").trim();return r?(await e.execute({statement:"DELETE FROM table_chat_scope WHERE chat_id = ?",params:[r]}),!0):!1}var Nl,Wx,ry,ln,Hx,va=N(()=>{H();uo();Ke();Wx=Object.freeze([{id:"table_engine_v1__sheets",statement:`
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
    `.replace(/\s+/g," ").trim()}]),ry=!1,ln=null;Hx={ensureTableDataReady:Ue,getCurrentTableDataProvider:sy,upsertSheetMeta:$l,getSheetsBySlot:Ll,deleteSheetsBySlot:xa,upsertSheetRows:Ol,getRowsBySheet:Bl,deleteRowsBySheet:ny,loadSlotTables:ay,commitSlotTables:wa,clearSlot:iy,getLocksForSheet:ly,setLockEntry:cy,clearLockEntry:dy,clearSheetLocks:uy,clearScopeLocks:py,getChatScopeConfig:yy,setChatScopeConfig:fy,clearChatScopeConfig:gy}});function vr(){return Kl||(Kl=I.createScope("TableChatScope")),Kl}function nr(){let t=globalThis.window||globalThis,e=t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1;return String(e??"").trim()||"default_chat"}function Sa(){return new Date().toISOString()}function fo(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function wr(t){let e=jl.get(Ul,{}),s=(fo(e)?e:{})[t];return hy(s)}function Es(t,e){let r=jl.get(Ul,{}),s=fo(r)?r:{};s[t]=e,jl.set(Ul,s),Gx(t,e).catch(()=>{})}async function Gx(t,e){try{let r=await Promise.resolve().then(()=>(va(),zl));await r.ensureTableDataReady(),await r.setChatScopeConfig(t,e||{})}catch(r){vr().warn("chat-scope SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:r?.message||String(r)})}}function my(){return{template:{},templateArchives:{}}}function hy(t){return fo(t)?{template:fo(t.template)?t.template:{},templateArchives:fo(t.templateArchives)?t.templateArchives:{}}:my()}function Ta(t){return fo(t)?{mode:qx.has(t.mode)?t.mode:Je.INHERIT_GLOBAL,presetName:typeof t.presetName=="string"?t.presetName:"",templateStr:typeof t.templateStr=="string"?t.templateStr:"",guideData:t.guideData!==void 0?ne(t.guideData):null,updatedAt:typeof t.updatedAt=="string"?t.updatedAt:Sa(),source:typeof t.source=="string"?t.source:"ui"}:null}function Vx(t){let e=[t.mode||"",t.presetName||"",t.templateStr||""],r=5381,s=e.join("||");for(let o=0;o<s.length;o++)r=(r<<5)+r+s.charCodeAt(o),r|=0;return String(r)}var Yx,Ul,Kl,jl,qx,Fl,go,by=N(()=>{ze();H();Ke();Ss();Yx="tableChatScope",Ul="chats";jl=$.namespace(Yx);qx=new Set(Object.values(Je));Fl=class{getScopedConfig(e=nr()){return wr(e)}setScopedConfig(e,r=nr()){let s=hy(e);return Es(r,s),s}getTemplateScope(e,r=nr()){let s=Ce(e===void 0?he.getKey():e),o=wr(r);return Ta(o.template[s])||null}setTemplateScope(e,r,s=nr()){let o=Ce(r===void 0?he.getKey():r),n=Ta({...e,updatedAt:Sa()});if(!n)return vr().warn("setTemplateScope \u6536\u5230\u65E0\u6548 state",e),null;let a=wr(s);return a.template[o]=n,Es(s,a),vr().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u66F4\u65B0",{chatId:s,isolationKey:o,mode:n.mode}),n}clearTemplateScope(e,r=nr()){let s=Ce(e===void 0?he.getKey():e),o=wr(r);o.template[s]!==void 0&&(delete o.template[s],Es(r,o),vr().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u6E05\u9664",{chatId:r,isolationKey:s}))}archiveCurrentTemplate(e,r=nr()){let s=Ce(e===void 0?he.getKey():e),o=wr(r),n=Ta(o.template[s]);if(!n)return null;let a=Vx(n),i=Array.isArray(o.templateArchives[s])?o.templateArchives[s]:[];if(i.length>0&&i[0].fingerprint===a)return null;let l={fingerprint:a,state:ne(n),archivedAt:Sa()},c=[l,...i].slice(0,Ip);return o.templateArchives[s]=c,Es(r,o),vr().info("\u6A21\u677F\u5DF2\u5F52\u6863",{chatId:r,isolationKey:s,archiveCount:c.length}),l}listTemplateArchives(e,r=nr()){let s=Ce(e===void 0?he.getKey():e),o=wr(r);return(Array.isArray(o.templateArchives[s])?o.templateArchives[s]:[]).map(a=>ne(a))}restoreTemplateArchive(e,r,s=nr()){let o=Ce(r===void 0?he.getKey():r),n=wr(s),a=Array.isArray(n.templateArchives[o])?n.templateArchives[o]:[],i=a[e];if(!i)return vr().warn("restoreTemplateArchive: \u627E\u4E0D\u5230 archive",{index:e,available:a.length}),null;this.archiveCurrentTemplate(o,s);let l=Ta({...i.state,source:"restore",updatedAt:Sa()});if(!l)return null;let c=wr(s);return c.template[o]=l,Es(s,c),vr().info("\u6A21\u677F\u5DF2\u6062\u590D",{chatId:s,isolationKey:o,fromArchiveIndex:e}),l}clearTemplateArchives(e,r=nr()){let s=Ce(e===void 0?he.getKey():e),o=wr(r);Array.isArray(o.templateArchives[s])&&(delete o.templateArchives[s],Es(r,o),vr().info("\u6A21\u677F\u5F52\u6863\u5DF2\u6E05\u7A7A",{chatId:r,isolationKey:s}))}resetChat(e=nr()){Es(e,my()),vr().warn("\u5DF2\u91CD\u7F6E chat \u7684 ScopedConfig",{chatId:e})}},go=new Fl});var xy,wy=N(()=>{Ke();xy=Object.freeze({formatId:"youyou",displayName:"YouYou \u539F\u751F (tables \u6570\u7EC4)",detect(t){return!t||typeof t!="object"||Array.isArray(t)?!1:Array.isArray(t.tables)},parse(t){if(!t||typeof t!="object")throw new Error("youyou-importer: raw \u4E0D\u662F\u5BF9\u8C61");return{tables:Array.isArray(t.tables)?ne(t.tables):[],name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:"",promptTemplate:typeof t.promptTemplate=="string"?t.promptTemplate:""}}})});function ar(t,e=""){return t==null?e:String(t).trim()||e}function vy(t){return t&&typeof t=="object"&&Array.isArray(t.content)}function Ty(t){return!t||typeof t!="object"?null:t.tables&&typeof t.tables=="object"&&!Array.isArray(t.tables)&&Object.keys(t.tables).filter(s=>s.startsWith("sheet_")&&vy(t.tables[s])).length>0?t.tables:Object.keys(t).filter(r=>r.startsWith("sheet_")&&vy(t[r])).length>0?t:null}function Jx(t){return!t||typeof t!="object"?[]:Object.keys(t).filter(r=>r.startsWith("sheet_")&&t[r]&&typeof t[r]=="object").map((r,s)=>({key:r,table:t[r],fallbackOrder:s})).sort((r,s)=>{let o=Number.isFinite(r.table.orderNo)?r.table.orderNo:r.fallbackOrder,n=Number.isFinite(s.table.orderNo)?s.table.orderNo:s.fallbackOrder;return o-n}).map(({key:r,table:s},o)=>{let n=s.sourceData&&typeof s.sourceData=="object"?s.sourceData:{},a=Array.isArray(s.content)?s.content:[],i=Array.isArray(a[0])?a[0]:[],l=vl(n.note),c=new Set,d=i.slice(1).map((y,p)=>{let f=l[p]||{},g=ar(y||f.title,`\u5217${p+1}`);return{key:sn(g||`col_${p+1}`,c),title:g,description:ar(f.description,""),type:"text",required:!1}}),u=a.slice(1).map((y,p)=>{let f=Array.isArray(y)?y:[],g={};return d.forEach((h,x)=>{g[h.key]=jr(f[x+1])}),{name:ar(f[0],`\u884C${p+1}`),cells:g}});return{id:ar(s.uid||r,`sheet_${o+1}`),name:ar(s.name,`\u8868${o+1}`),note:ar(n.note,""),enabled:s.enabled!==!1,aiInstructions:{init:ar(n.initNode,""),create:ar(n.insertNode,""),update:ar(n.updateNode,""),delete:ar(n.deleteNode,"")},columns:d,rows:u}})}var Sy,_y=N(()=>{Ke();sr();Sy=Object.freeze({formatId:"shujuku",displayName:"shujuku \u6570\u636E\u5E93\u683C\u5F0F (sheet_x)",detect(t){return!t||typeof t!="object"||Array.isArray(t)?!1:Ty(t)!==null},parse(t){let e=Ty(t);if(!e)throw new Error("shujuku-importer: \u672A\u627E\u5230 sheet_xxx \u5165\u53E3");return{tables:Jx(e),name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:""}}})});var Ey,Ay=N(()=>{Ey=Object.freeze({formatId:"youyou",displayName:"YouYou \u539F\u751F (.json)",fileExtension:".json",mimeType:"application/json",serialize(t){return{version:1,exportedAt:new Date().toISOString(),templates:Array.isArray(t)?t:[]}}})});function cn(){return Wl||(Wl=I.createScope("TemplateAdapter")),Wl}function Cy(t){if(t==null)return null;for(let e of Xx){let r=!1;try{r=e.detect(t)}catch(s){cn().warn(`importer ${e.formatId} detect \u629B\u9519`,s);continue}if(r)try{let s=e.parse(t);if(s&&Array.isArray(s.tables))return cn().debug("\u9002\u914D\u5668\u547D\u4E2D",{formatId:e.formatId,displayName:e.displayName,tableCount:s.tables.length,firstTableName:s.tables[0]?.name||""}),{...s,formatId:e.formatId};cn().warn(`importer ${e.formatId} parse \u8FD4\u56DE\u65E0\u6548\u7ED3\u6784`,{hasResult:!!s,hasTablesArray:Array.isArray(s?.tables)})}catch(s){cn().warn(`importer ${e.formatId} parse \u629B\u9519\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A`,s)}}return cn().warn("importTemplateAuto: \u65E0\u9002\u914D\u5668\u547D\u4E2D",{isObject:t&&typeof t=="object",isArray:Array.isArray(t),keys:t&&typeof t=="object"?Object.keys(t).slice(0,10):[]}),null}var Wl,Xx,zE,ky=N(()=>{H();wy();_y();Ay();Xx=Object.freeze([xy,Sy]),zE=Object.freeze([Ey])});function Yt(){return Hl||(Hl=I.createScope("TableTemplate")),Hl}function it(t,e=""){return t==null?e:String(t).trim()||e}function Iy(t="template"){return`${t}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function un(t={}){let e=Cy(t),r=[],s="",o="",n="",a="";e?(r=e.tables,s=e.formatId||"",o=e.name||"",n=e.description||"",a=e.promptTemplate||""):t&&typeof t=="object"&&Yt().warn("normalizeTemplate: \u65E0\u9002\u914D\u5668\u547D\u4E2D\uFF0C\u6309\u7A7A\u6A21\u677F\u5904\u7406",{keys:Object.keys(t).slice(0,10)});let i=ya({tables:r});return{id:it(t?.id,Iy()),name:it(t?.name||o,"\u672A\u547D\u540D\u6A21\u677F"),description:it(t?.description||n,""),tables:i.tables||r,promptTemplate:it(t?.promptTemplate||a,""),sourceFormat:s,createdAt:it(t?.createdAt,new Date().toISOString()),updatedAt:it(t?.updatedAt,new Date().toISOString())}}function Ry(){dn=null}function My(){return[un({id:gt,name:bl,description:"\u5305\u542B\u5168\u5C40\u6570\u636E\u3001\u4E3B\u89D2\u3001\u91CD\u8981\u89D2\u8272\u3001\u6280\u80FD\u3001\u80CC\u5305\u3001\u4EFB\u52A1\u3001\u7EAA\u8981\u548C\u9009\u9879\u8868\u3002",tables:ne(no)})]}function As(){let t=ho.get(Yl,[]);return Array.isArray(t)?t.map(un):[]}function bo(){if(dn)return dn;let t=My(),e=As(),r=new Map(e.map(n=>[n.id,n])),s=t.map(n=>r.has(n.id)?r.get(n.id):n),o=new Set(t.map(n=>n.id));for(let n of e)o.has(n.id)||s.push(n);return dn=Object.freeze(s),dn}function Ts(t){let e=it(t,"");return bo().find(r=>r.id===e)||null}function Fr(t={}){let e=new Date().toISOString(),r=un({...t,id:it(t.id,Iy()),updatedAt:e,createdAt:it(t.createdAt,e)}),o=As().filter(n=>n.id!==r.id);return o.push(r),ho.set(Yl,o),Ry(),{success:!0,template:r}}function ql(t){let e=it(t,"");if(!e||e===gt)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u5220\u9664\u3002"};let r=As().filter(s=>s.id!==e);return ho.set(Yl,r),Ry(),Qx()===e&&Vl(gt),{success:!0}}function Py(t,e){let r=it(t,"");if(!r||r===gt)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u91CD\u547D\u540D\u3002"};let s=it(e,"");if(!s)return{success:!1,error:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\u3002"};let o=Ts(r);return o?Fr({...o,name:s}):{success:!1,error:"\u6A21\u677F\u4E0D\u5B58\u5728\u3002"}}function _a(){return{version:1,exportedAt:new Date().toISOString(),templates:As()}}function Ny(t,{overwrite:e=!1}={}){let r;if(Array.isArray(t))r=t;else if(t&&typeof t=="object")Array.isArray(t.templates)?r=t.templates:t.template&&typeof t.template=="object"?r=[t.template]:r=[t];else return{success:!1,imported:0,skipped:0,errors:["\u65E0\u6548\u7684\u5BFC\u5165\u6570\u636E\u683C\u5F0F\u3002"]};Yt().info("importTemplates \u5F00\u59CB",{rawListCount:r.length,overwrite:e});let s=new Set(As().map(i=>i.id)),o=0,n=0,a=[];for(let i of r)try{let l=un(i);if(Yt().info("importTemplates \u5355\u6761",{id:l.id,name:l.name,tableCount:Array.isArray(l.tables)?l.tables.length:0,firstTableName:l.tables?.[0]?.name||""}),!e&&s.has(l.id)){n++;continue}Fr(l),s.add(l.id),o++}catch(l){a.push(it(l?.message,"\u672A\u77E5\u9519\u8BEF")),Yt().error("importTemplates \u5355\u6761\u5931\u8D25",l)}return Yt().info("importTemplates \u5B8C\u6210",{imported:o,skipped:n,errorCount:a.length}),{success:!0,imported:o,skipped:n,errors:a}}function Qx(){let t=ho.get(Gl,""),e=it(t,gt);return Ts(e)?e:gt}function Vl(t){let e=it(t,gt);return ho.set(Gl,e),Yt().info("\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u5DF2\u5207\u6362",{templateId:e}),e}function mo(){let t=ho.get(Gl,""),e=it(t,gt),r=Ts(e);return r||My()[0]}function Zx(t){if(!t||typeof t!="string")return null;try{let e=JSON.parse(t);return un(e)}catch(e){return Yt().warn("templateFromString \u53CD\u5E8F\u5217\u5316\u5931\u8D25",e),null}}function xo({chatId:t,isolationKey:e}={}){let r=e===void 0?he.getKey():e,s=go.getTemplateScope(r,t);if(!s||s.mode===Je.INHERIT_GLOBAL){let n=mo();return Yt().debug("resolveActiveTemplate: inherit_global",{chatId:t,isolationKey:r,templateId:n?.id||"",templateName:n?.name||"",tableCount:Array.isArray(n?.tables)?n.tables.length:0,firstTableName:n?.tables?.[0]?.name||""}),{template:n,mode:Je.INHERIT_GLOBAL,source:{templateId:n?.id||""}}}if(s.mode===Je.CHAT_OVERRIDE){let n=Zx(s.templateStr);if(n)return{template:n,mode:Je.CHAT_OVERRIDE,source:{}};Yt().warn("chat_override templateStr \u53CD\u5E8F\u5217\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 inherit_global");let a=mo();return{template:a,mode:Je.INHERIT_GLOBAL,source:{templateId:a?.id||"",fallback:!0}}}if(s.mode===Je.PRESET_LINK){let n=s.presetName||"",a=bo(),i=a.find(c=>c.name===n)||a.find(c=>c.id===n);if(i)return{template:i,mode:Je.PRESET_LINK,source:{presetName:n,templateId:i.id}};Yt().warn("preset_link \u6307\u5411\u7684\u5168\u5C40\u9884\u8BBE\u4E0D\u5B58\u5728\uFF0C\u964D\u7EA7\u5230 inherit_global",{presetName:n});let l=mo();return{template:l,mode:Je.INHERIT_GLOBAL,source:{templateId:l?.id||"",presetName:n,fallback:!0}}}let o=mo();return{template:o,mode:Je.INHERIT_GLOBAL,source:{templateId:o?.id||"",unknownMode:s.mode}}}function Dy(t={}){let e=t.isolationKey===void 0?he.getKey():t.isolationKey;return t.archive!==!1&&go.archiveCurrentTemplate(e,t.chatId),go.clearTemplateScope(e,t.chatId),Yt().info("resetChatTemplateScope",{chatId:t.chatId,isolationKey:e}),{success:!0}}function $y(t={}){let e=t.isolationKey===void 0?he.getKey():t.isolationKey;return go.listTemplateArchives(e,t.chatId)}function Ly(t,e={}){let r=e.isolationKey===void 0?he.getKey():e.isolationKey,s=go.restoreTemplateArchive(t,r,e.chatId);return s?{success:!0,scopeState:s}:{success:!1,error:"\u5F52\u6863\u4E0D\u5B58\u5728"}}var ho,Yl,Gl,Hl,dn,io=N(()=>{ze();H();sr();Ke();by();Ss();ky();ho=$.namespace("tableWorkbenchTemplates"),Yl="templates",Gl="activeId";dn=null});var zy={};re(zy,{TableTemplatePanel:()=>By,default:()=>ow});function Jl(t){return t===gt}function rw(t,{onChange:e,readonly:r}){let s=m("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});F(s,Tt({label:"\u63CF\u8FF0",control:Ze({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:a=>e({description:a})})})),F(s,m("div",{text:"\u586B\u8868\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}})),F(s,m("div",{text:"\u53EF\u4F7F\u7528\u5B8F\uFF1A{{tableData}} {{lastUserMessage}} {{lastAiMessage}} {{toolWorldbookContent}} \u7B49\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u6A21\u677F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let o=m("textarea",{className:"yyt-textarea",attrs:{rows:"8",placeholder:"\u53EF\u9009 \u2014 \u81EA\u5B9A\u4E49\u586B\u8868\u63D0\u793A\u8BCD",disabled:r?"disabled":null},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});o.value=t.promptTemplate||"",o.addEventListener("change",()=>{r||e({promptTemplate:o.value})}),F(s,o),F(s,m("div",{text:`\u8868\u683C\u7ED3\u6784\uFF08${(t.tables||[]).length} \u5F20\u8868\uFF09`,style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px"}})),F(s,m("div",{text:"\u672C\u9762\u677F\u53EA\u5C55\u793A\u8868\u7ED3\u6784 JSON\u3002\u590D\u6742 schema \u7F16\u8F91\uFF08\u589E\u5220\u8868\u3001\u5217\u5B9A\u4E49\u3001\u9ED8\u8BA4\u884C\uFF09\u5C06\u5728\u586B\u8868\u5DE5\u4F5C\u53F0\u4E2D\u63D0\u4F9B\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let n=m("pre",{style:{padding:"10px 12px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm, 6px)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-secondary)",maxHeight:"260px",overflow:"auto",whiteSpace:"pre",margin:"0"}});try{n.textContent=JSON.stringify(t.tables||[],null,2)}catch{n.textContent="// \u65E0\u6CD5\u5E8F\u5217\u5316"}return F(s,n),s}function sw(t){let r=[`${(t.tables||[]).length} \u5F20\u8868`];return t.promptTemplate&&r.push("\u81EA\u5B9A\u4E49\u6A21\u677F"),r}var ew,Oy,tw,By,ow,Ky=N(()=>{yr();io();sr();H();jo();ew=I.createScope("TableTemplatePanel"),Oy="";tw={listPresets(){return bo().map(t=>({id:Jl(t.id)?`builtin_table_${t.id}`:t.id,name:t.name,description:t.description||"",promptTemplate:t.promptTemplate||"",tables:t.tables||[],_rawId:t.id,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=t.startsWith("builtin_table_")?t.slice(14):t,r=Ts(e);return r?{id:Jl(r.id)?`builtin_table_${r.id}`:r.id,name:r.name,description:r.description||"",promptTemplate:r.promptTemplate||"",tables:r.tables||[],_rawId:r.id,createdAt:r.createdAt,updatedAt:r.updatedAt}:null},getCurrentPresetId(){return Oy||""},setCurrentPresetId(t){return Oy=t||"",!0},createPreset(t){let e=String(t?.name||"").trim()||"\u65B0\u5EFA\u6A21\u677F",r=Fr({name:e,description:t?.description||"",promptTemplate:t?.promptTemplate||"",tables:Array.isArray(t?.tables)?t.tables:[]});return r?.success?{id:r.template.id,...r.template,_rawId:r.template.id}:null},updatePreset(t,e){if(!t)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t;if(Jl(r))return ew.warn("\u62D2\u7EDD\u4FEE\u6539\u5185\u7F6E\u8868\u683C\u6A21\u677F"),null;let s=Ts(r);if(!s)return null;let o=Fr({...s,...e,id:r});return o?.success?{id:o.template.id,...o.template,_rawId:o.template.id}:null},deletePreset(t){if(!t)return!1;let e=t.startsWith("builtin_table_")?t.slice(14):t;return!!ql(e)?.success},duplicatePreset(t,e={}){let r=this.getPreset(t);if(!r)return null;let s=e.nameSuffix||" \u526F\u672C";return this.createPreset({name:`${r.name}${s}`,description:r.description,promptTemplate:r.promptTemplate,tables:r.tables})},renamePreset(t,e){if(!t||!e)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t,s=Py(r,e);return s?.success?this.getPreset(s.template?.id||r):null},exportAll(){return _a()},importPresets(t){let e=Ny(t,{overwrite:!1});return{added:e?.imported||0,skipped:e?.skipped||0}},resetAll(){let t=As();for(let e of t)try{ql(e.id)}catch{}}};By=Mr({id:"tableTemplatePanel",kind:"table",panelTitle:"\u8868\u683C\u6A21\u677F",panelHint:"\u7BA1\u7406\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u8868\u683C\u7ED3\u6784\u6A21\u677F\u3002\u5728\u586B\u8868\u9762\u677F\u9876\u90E8\u5DE5\u5177\u680F\u53EF\u5FEB\u901F\u52A0\u8F7D/\u4FDD\u5B58\u5F53\u524D\u6A21\u677F\u3002",store:tw,renderEditor:rw,renderListItemMeta:sw}),ow=By});var jy={};re(jy,{ToolManagePanel:()=>Uy,default:()=>nw});var Uy,nw,Fy=N(()=>{qe();Go();tr();Uy={id:"toolManagePanel",_removeDialog(t){if(!t?.length)return;let e=t.find("#yyt-tool-dialog-overlay");dt(e,"yytToolManageDialogSelect"),e.remove()},_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let r=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!r){A("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}r.switchMainTab("tools"),r.switchSubTab("tools",t)},render(t){let e=Qt(),r=Object.entries(e),s=r.filter(([,o])=>o?.enabled!==!1).length;return`
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
      `},bindEvents(t,e){let r=Q();!r||!ge(t)||(t.off(".yytToolManage"),this._bindToolEvents(t,r),this._bindFileEvents(t,r))},_bindToolEvents(t,e){t.on("change.yytToolManage",".yyt-tool-toggle input",r=>{let s=e(r.currentTarget).closest(".yyt-list-row"),o=s.data("tool-id"),n=e(r.currentTarget).is(":checked");ea(o,n),s.toggleClass("yyt-tool-item-enabled",n).toggleClass("yyt-tool-item-disabled",!n),s.find(".yyt-status-dot").toggleClass("yyt-status-dot-on",n).toggleClass("yyt-status-dot-off",!n),A("info",n?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.on("click.yytToolManage","#yyt-add-tool",()=>{this._showToolEditDialog(t,e,null)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="config"]',r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._openToolConfig(s)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="edit"]',r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._showToolEditDialog(t,e,s)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="delete"]',async r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id"),o=Zt(s);if(!s||!o||!await pr("\u5220\u9664\u5DE5\u5177",`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177"${o.name}"\u5417\uFF1F`,{danger:!0}))return;if(!Vs(s)){A("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),A("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.on("click.yytToolManage","#yyt-import-tools",()=>{t.find("#yyt-import-tools-file").click()}),t.on("change.yytToolManage","#yyt-import-tools-file",async r=>{let s=r.target.files[0];if(s){try{let o=await Ko(s),n=Xs(o,{overwrite:!1});A(n.success?"success":"error",n.message),n.success&&this.renderTo(t)}catch(o){A("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(r.target).val("")}}),t.on("click.yytToolManage","#yyt-export-tools",()=>{try{let r=Js();zo(r,`youyou_toolkit_tools_${Date.now()}.json`),A("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(r){A("error",`\u5BFC\u51FA\u5931\u8D25: ${r.message}`)}}),t.on("click.yytToolManage","#yyt-reset-tools",async()=>{await pr("\u91CD\u7F6E\u5DE5\u5177","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F",{danger:!0})&&(Qs(),this.renderTo(t),A("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,r){let s=r?Zt(r):null,o=!!s,n=`
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
    `;this._removeDialog(t),t.append(n);let a=t.find("#yyt-tool-dialog-overlay"),i=a.find("#yyt-tool-name"),l=a.find("#yyt-tool-category"),c=a.find("#yyt-tool-desc"),d=a.find("#yyt-tool-timeout"),u=a.find("#yyt-tool-retries");Nt(a,{namespace:"yytToolManageDialogSelect",selectors:["#yyt-tool-category"]});let y=()=>{dt(a,"yytToolManageDialogSelect"),a.remove()};a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",y),a.on("click",function(p){p.target===this&&y()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let p=i.val().trim(),f=l.val(),g=c.val().trim(),h=parseInt(d.val())||6e4,x=parseInt(u.val())||3;if(!p){A("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0"),i.trigger("focus").trigger("select");return}let v=r||`tool_${Date.now()}`;if(!qs(v,{name:p,category:f,description:g,promptTemplate:s?.promptTemplate||"",extractTags:Array.isArray(s?.extractTags)?s.extractTags:[],config:{execution:{timeout:h,retries:x},api:s?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(s?.config?.messages)?s.config.messages:[],context:{depth:s?.config?.context?.depth||3,includeTags:Array.isArray(s?.config?.context?.includeTags)?s.config.context.includeTags:[],excludeTags:Array.isArray(s?.config?.context?.excludeTags)?s.config.context.excludeTags:[]},worldbooks:{enabled:s?.config?.worldbooks?.enabled===!0,selected:Array.isArray(s?.config?.worldbooks?.selected)?s.config.worldbooks.selected:[]}},enabled:s?.enabled!==!1})){A("error",o?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}eo(v),y(),this.renderTo(t),A("success",o?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),o||this._openToolConfig(v)})},destroy(t){!Q()||!ge(t)||(this._removeDialog(t),t.off(".yytToolManage"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},nw=Uy});var Hy={};re(Hy,{BypassManager:()=>Ea,DEFAULT_BYPASS_PRESETS:()=>Sr,addMessage:()=>vw,buildBypassMessages:()=>Aw,bypassManager:()=>le,createPreset:()=>fw,default:()=>Cw,deleteMessage:()=>Sw,deletePreset:()=>mw,duplicatePreset:()=>hw,exportPresets:()=>_w,getAllPresets:()=>pw,getDefaultPresetId:()=>bw,getEnabledMessages:()=>ww,getPreset:()=>yw,getPresetList:()=>pn,importPresets:()=>Ew,setDefaultPresetId:()=>xw,updateMessage:()=>Tw,updatePreset:()=>gw});function Wy(t){let e=String(t||"").trim().toLowerCase();return e==="system"?"SYSTEM":e==="assistant"||e==="ai"?"assistant":"USER"}function cw(t){return t&&typeof t=="object"&&typeof t.content=="string"&&!t.name&&!Array.isArray(t.messages)}function dw(t){return String(t||"").replace(/\$0/g,"{{toolContentMacro}}").replace(/\$1/g,"{{rawRecentMessagesText}}").replace(/\$4/g,"{{toolWorldbookContent}}").replace(/\$8/g,"{{userMessage}}").replace(/\$C/g,"{{characterCard}}")}function uw(t,e,r){let s=t.mainSlot||(t.isMain?"A":t.isMain2?"B":"");return{id:typeof t.id=="string"&&t.id.trim()?t.id.trim():`${r}_msg_${e+1}`,role:Wy(t.role),content:dw(t.content),enabled:t.enabled!==!1,deletable:t.deletable!==!1,...s?{mainSlot:s,isMain:s==="A",isMain2:s==="B"}:{}}}var aw,Tr,wo,Xl,iw,Sr,lw,Ea,le,pw,pn,yw,fw,gw,mw,hw,bw,xw,ww,vw,Tw,Sw,_w,Ew,Aw,Cw,vo=N(()=>{ze();Ge();H();aw=I.createScope("BypassManager"),Tr="bypass_presets",wo="default_bypass_preset",Xl="current_bypass_preset",iw=Object.freeze([{id:"table_fill_default_msg_1",role:"SYSTEM",content:"\u4F60\u662F\u4E00\u4E2A\u52A9\u624B\uFF0C\u8D1F\u8D23\u542C\u4ECE\u7528\u6237\u7684\u6307\u4EE4\u5B8C\u6210\u4F60\u7684\u5DE5\u4F5C",enabled:!0,deletable:!0},{id:"table_fill_default_msg_2",role:"assistant",content:"\u6536\u5230\uFF0C\u6211\u5C06\u5145\u5206\u63CF\u7ED8\u7528\u6237\u7684\u610F\u5FD7\uFF0C\u6BEB\u4E0D\u5077\u61D2\uFF0C\u5E76\u4E14\u6211\u4E00\u5B9A\u4F1A\u9075\u7167\u7528\u6237\u7684\u8981\u6C42",enabled:!0,deletable:!0},{id:"table_fill_default_msg_3",role:"USER",content:`\u4EE5\u4E0B\u662F\u4F60\u53EF\u80FD\u9700\u8981\u7528\u5230\u7684\u80CC\u666F\u8BBE\u5B9A\uFF0C\u6CE8\u610F\u4F60\u53EA\u9700\u8981\u5176\u4E2D\u5173\u4E8E\u5267\u60C5\u4EE5\u53CA\u4EBA\u8BBE\u65B9\u9762\u7684\u6570\u636E\uFF0C\u4E0D\u9700\u8981\u601D\u8003\u91CC\u8FB9\u9664\u6B64\u4E4B\u5916\u7684\u4EFB\u4F55\u683C\u5F0F\u6216\u8005\u601D\u7EF4\u94FE\u65B9\u9762\u7684\u8981\u6C42\uFF1A
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

{{userMessage}}`,enabled:!0,deletable:!1,mainSlot:"B",isMain2:!0},{id:"table_fill_default_msg_8",role:"assistant",content:"\u6536\u5230\u6307\u4EE4\uFF0C\u6211\u5C06\u4E00\u6B65\u4E00\u6B65\u5F00\u59CB\u601D\u8003\uFF0C\u5E76\u5B8C\u6210\u586B\u8868\uFF0C\u9996\u5148\u6211\u8981\u5206\u6790\u5F53\u524D\u8F6E\u6B21\u7684\u5267\u60C5\u53D8\u5316\u3002",enabled:!0,deletable:!0}]),Sr={table_workbench_fill_default:{id:"table_workbench_fill_default",name:"\u9ED8\u8BA4\u586B\u8868 Ai \u6307\u4EE4\u9884\u8BBE",description:"\u7528\u4E8E\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u5185\u7F6E Ai \u6307\u4EE4\u9884\u8BBE\uFF0C\u53EF\u590D\u5236\u540E\u6309\u9700\u7F16\u8F91\u3002",enabled:!0,messages:iw.map(t=>({...t})),createdAt:0,updatedAt:0}},lw=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]);Ea=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=$.get(Tr,{});return this._cache={...Sr,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((r,s)=>(s.updatedAt||0)-(r.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:r,name:s,description:o,messages:n}=e;if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=r.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let i={id:a,name:s.trim(),description:o||"",enabled:!0,messages:n||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,i),K.emit(B.BYPASS_PRESET_CREATED,{presetId:a,preset:i}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${s}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,r){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(r.id&&r.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let o={...s,...r,id:e,updatedAt:Date.now()};return this._savePreset(e,o),K.emit(B.BYPASS_PRESET_UPDATED,{presetId:e,preset:o}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u66F4\u65B0\u6210\u529F`,preset:o}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(Sr[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let s=$.get(Tr,{});return delete s[e],$.set(Tr,s),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),K.emit(B.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,r,s){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!r||!r.trim())&&(r=`${e}_copy_${Date.now()}`),this.presetExists(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(o)),id:r.trim(),name:s||`${o.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(r.trim(),n),K.emit(B.BYPASS_PRESET_CREATED,{presetId:r,preset:n}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${n.name}"`,preset:n}}addMessage(e,r){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o={id:`msg_${Date.now()}`,role:Wy(r.role||"SYSTEM"),content:r.content||"",enabled:r.enabled!==!1,deletable:r.deletable!==!1,...r.mainSlot?{mainSlot:r.mainSlot}:{}},n=[...s.messages||[],o];return this.updatePreset(e,{messages:n})}updateMessage(e,r,s){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=o.messages||[],a=n.findIndex(l=>l.id===r);if(a===-1)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};let i=[...n];return i[a]={...i[a],...s},this.updatePreset(e,{messages:i})}deleteMessage(e,r){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=s.messages||[],n=o.find(i=>i.id===r);if(!n)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};if(n.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=o.filter(i=>i.id!==r);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let r=this.getPreset(e);return!r||!r.enabled?[]:(r.messages||[]).filter(s=>s.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=$.get(wo,null);return e==="undefined"||e==="null"||e===""?($.remove(wo),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:($.set(wo,e),K.emit(B.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let s=this.getPreset(e);if(!s)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let r=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(r)},null,2)}importPresets(e,r={}){let{overwrite:s=!1,name:o=""}=r,n;try{n=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let a=$.get(Tr,{}),l=Array.isArray(n)&&n.every(cw)?[{id:this._generatePresetId(o||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",a),name:o||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",description:"\u7531\u5916\u90E8\u586B\u8868\u63D0\u793A\u8BCD\u7EC4\u5BFC\u5165\u3002",enabled:!0,messages:n}]:Array.isArray(n)?n:n.presets?n.presets:[n];if(l.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let c=0;for(let d of l){let u=this._normalizePreset(d?.id,d,a);u&&(Sr[u.id]&&!s||!s&&a[u.id]||(a[u.id]={...u,updatedAt:Date.now()},c++))}return c>0&&($.set(Tr,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${c} \u4E2A\u9884\u8BBE`,imported:c}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let r=e?.bypass?.presetId;return r?this.getPreset(r):this.getDefaultPreset()}buildBypassMessages(e){let r=this.getToolBypassPreset(e);return r?this.getEnabledMessages(r.id):[]}_savePreset(e,r){let s=$.get(Tr,{});s[e]=r,$.set(Tr,s),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=$.get(Tr,{}),r={},s=!1,o=Array.isArray(e)?e.map((n,a)=>[n?.id||n?.name||`legacy_${a}`,n]):Object.entries(e||{});for(let[n,a]of o){let i=this._normalizePreset(n,a,r);if(!i){s=!0;continue}r[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(s=!0)}s&&$.set(Tr,r),this._migrateDefaultPreset(r),this._cache=null,this._migrated=!0}_normalizePreset(e,r,s={}){if(!r||typeof r!="object")return null;let o=typeof r.name=="string"?r.name.trim():"",n=typeof r.id=="string"?r.id.trim():"",a=typeof e=="string"?e.trim():"";if(!o&&a&&a!=="undefined"&&a!=="null"&&(o=a),this._isLegacySamplePreset(o,n)||(!n&&a&&a!=="undefined"&&a!=="null"&&(n=a),!n&&o&&o!=="undefined"&&o!=="null"&&(n=this._generatePresetId(o,s)),!o||!n||n==="undefined"||o==="undefined"))return null;let l=Array.isArray(r.messages)?r.messages.filter(c=>c&&typeof c=="object").map((c,d)=>uw(c,d,n)):[];return{...r,id:n,name:o,description:typeof r.description=="string"?r.description:"",enabled:r.enabled!==!1,messages:l,createdAt:r.createdAt||Date.now(),updatedAt:r.updatedAt||Date.now()}}_migrateDefaultPreset(e){let r=$.get(wo,null),s=$.get(Xl,null),o=r??s;(o==="undefined"||o==="null"||o==="")&&(o=null),o&&!e[o]&&(o=Object.values(e).find(a=>a.name===o)?.id||null),o?$.set(wo,o):$.remove(wo),$.has(Xl)&&$.remove(Xl)}_isLegacySamplePreset(e,r=""){return e?r==="standard"||r==="enhanced"||r==="jailbreak"||lw.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,r={}){let s=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,o=s,n=1;for(;r[o];)o=`${s}_${n++}`;return o}_log(...e){aw.debug(e[0],e.length>1?e.slice(1):void 0)}},le=new Ea,pw=()=>le.getAllPresets(),pn=()=>le.getPresetList(),yw=t=>le.getPreset(t),fw=t=>le.createPreset(t),gw=(t,e)=>le.updatePreset(t,e),mw=t=>le.deletePreset(t),hw=(t,e,r)=>le.duplicatePreset(t,e,r),bw=()=>le.getDefaultPresetId(),xw=t=>le.setDefaultPresetId(t),ww=t=>le.getEnabledMessages(t),vw=(t,e)=>le.addMessage(t,e),Tw=(t,e,r)=>le.updateMessage(t,e,r),Sw=(t,e)=>le.deleteMessage(t,e),_w=t=>le.exportPresets(t),Ew=(t,e)=>le.importPresets(t,e),Aw=t=>le.buildBypassMessages(t),Cw=le});var Yy={};re(Yy,{DEFAULT_SETTINGS:()=>yn,SettingsService:()=>Ca,default:()=>kw,settingsService:()=>Bt});var yn,Aa,Ca,Bt,kw,fn=N(()=>{ze();Ge();yn={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue",startupScreenDismissed:!1}},Aa="settings_v2",Ca=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=$.get(Aa,{}),r=this._migrateLegacy(e);return this._cache=this._mergeWithDefaults(r.settings),r.changed&&$.set(Aa,this._cache),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),$.set(Aa,this._cache),K.emit(B.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let r=this.getSettings(),s=this._deepMerge(r,e);this.saveSettings(s)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(yn)),$.set(Aa,this._cache),K.emit(B.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,r=null){let s=this.getSettings(),o=e.split("."),n=s;for(let a of o)if(n&&typeof n=="object"&&a in n)n=n[a];else return r;return n}set(e,r){let s=JSON.parse(JSON.stringify(this.getSettings())),o=e.split("."),n=s;for(let a=0;a<o.length-1;a+=1){let i=o[a];i in n||(n[i]={}),n=n[i]}n[o[o.length-1]]=r,this.saveSettings(s)}_migrateLegacy(e){if(!e||typeof e!="object")return{settings:{},changed:!1};let r=!1,s=JSON.parse(JSON.stringify(e));return s.automation&&Object.prototype.hasOwnProperty.call(s.automation,"enabled")&&(delete s.automation.enabled,r=!0),{settings:s,changed:r}}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(yn)),e)}_deepMerge(e,r){let s={...e};for(let o in r)r[o]&&typeof r[o]=="object"&&!Array.isArray(r[o])?s[o]=this._deepMerge(e[o]||{},r[o]):s[o]=r[o];return s}},Bt=new Ca,kw=Bt});function Gy(t){if(!t)return"";let e=String(t).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function ka(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Gr(){try{return ka()?.SillyTavern||null}catch{return null}}function Ia(t){try{return(t||Gr())?.getContext?.()||null}catch{return null}}function Ql(t,e){if(!t)return null;let r=typeof t?.on=="function"||typeof t?.addListener=="function",s=typeof t?.off=="function"||typeof t?.removeListener=="function";return!r||!s?null:{source:e,eventSource:t,capabilities:{on:typeof t?.on=="function",off:typeof t?.off=="function",addListener:typeof t?.addListener=="function",removeListener:typeof t?.removeListener=="function"}}}function Iw(){let t=ka(),e=Gr(),r=Ia(e),o=[Ql(e?.eventSource,"SillyTavern.eventSource"),Ql(r?.eventSource,"SillyTavern.getContext().eventSource"),Ql(t?.eventSource,"topWindow.eventSource")].filter(Boolean)[0]||null,n=e?.eventTypes||e?.event_types||r?.eventTypes||r?.event_types||t?.eventTypes||t?.event_types||{};return{topWindow:t,api:e,context:r,eventSource:o?.eventSource||null,eventTypes:n,source:o?.source||"unavailable",capabilities:o?.capabilities||null,hasBridge:!!o?.eventSource}}var At,We,Rw,qy,Zl,zt,ec=N(()=>{H();At=I.createScope("HostEvents"),We=Object.freeze({MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",MESSAGE_EDITED:"MESSAGE_EDITED",USER_MESSAGE_RENDERED:"USER_MESSAGE_RENDERED",IMPERSONATE_READY:"IMPERSONATE_READY",GENERATION_STOPPED:"GENERATION_STOPPED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHAT_CHANGED:"CHAT_CHANGED"});Rw=1500,qy=20,Zl=class{constructor(){this._bridge=null,this._pending=[],this._initAttempts=0,this._retryTimer=null,this._readyResolvers=[],this._initialized=!1,this._disposed=!1}subscribe(e,r,s={}){if(!e||typeof r!="function")return At.warn("subscribe \u65E0\u6548\u53C2\u6570",{eventKey:e,handlerType:typeof r}),()=>{};if(this._disposed)return At.warn("subscribe \u5728 dispose \u4E4B\u540E\u88AB\u8C03\u7528",{eventKey:e}),()=>{};let o={key:Gy(e),rawKey:e,handler:r,options:s,attached:!1,_hostName:"",_hostUnsubscribe:null,_disposed:!1};return this._pending.push(o),this._ensureInitialized(),this._bridge?.hasBridge&&this._attachEntry(o),()=>{if(o._disposed)return;o._disposed=!0;let n=this._pending.indexOf(o);if(n>=0&&this._pending.splice(n,1),o.attached&&typeof o._hostUnsubscribe=="function")try{o._hostUnsubscribe()}catch(a){At.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:o._hostName,error:a})}}}async emit(e,...r){if(this._ensureInitialized(),!this._bridge?.hasBridge)return At.debug("emit \u65F6\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA\uFF0C\u8DF3\u8FC7",{eventKey:e}),!1;let s=this._resolveHostEventName(e);if(!s)return!1;let{eventSource:o}=this._bridge;try{if(typeof o?.emit=="function")return await o.emit(s,...r),!0;if(typeof o?.dispatch=="function")return await o.dispatch(s,...r),!0}catch(n){At.warn("emit \u629B\u9519",{eventKey:e,hostName:s,error:n})}return!1}ready({timeoutMs:e=1e4}={}){return this._ensureInitialized(),this._bridge?.hasBridge?Promise.resolve(!0):new Promise(r=>{let s=!1,o=a=>{s||(s=!0,r(a))},n=e>0?setTimeout(()=>o(!1),e):null;this._readyResolvers.push(a=>{n&&clearTimeout(n),o(a)})})}describe(){this._ensureInitialized();let e=this._bridge?.eventTypes||{};return{initialized:this._initialized,source:this._bridge?.source||"unavailable",hasBridge:!!this._bridge?.hasBridge,initAttempts:this._initAttempts,retryScheduled:!!this._retryTimer,pendingCount:this._pending.filter(r=>!r.attached).length,attachedCount:this._pending.filter(r=>r.attached).length,availableEvents:Object.keys(e).slice(0,100)}}reinit(){if(this._disposed)return!1;for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e.attached=!1,e._hostUnsubscribe=null,e._hostName=""}return this._bridge=null,this._initialized=!1,this._initAttempts=0,this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null),this._ensureInitialized()}dispose(){this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null);for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e._disposed=!0}this._pending=[],this._readyResolvers=[],this._bridge=null,this._initialized=!1,this._disposed=!0}_ensureInitialized(){if(this._disposed)return!1;if(this._initialized&&this._bridge?.hasBridge)return!0;this._initAttempts+=1;let e=Iw();if(this._bridge=e,this._initialized=!0,!e.hasBridge)return At.debug(`\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA (attempt ${this._initAttempts})`,{source:e.source}),this._scheduleRetry(),!1;At.info("\u5BBF\u4E3B\u6865\u5DF2\u5C31\u7EEA",{source:e.source,eventTypesCount:Object.keys(e.eventTypes).length});for(let s of this._pending)!s.attached&&!s._disposed&&this._attachEntry(s);let r=this._readyResolvers.slice();this._readyResolvers=[];for(let s of r)try{s(!0)}catch{}return!0}_scheduleRetry(){if(!this._retryTimer){if(this._initAttempts>=qy){At.warn(`\u5DF2\u8FBE\u6700\u5927\u91CD\u8BD5\u6B21\u6570 (${qy})\uFF0C\u505C\u6B62\u91CD\u8BD5`);let e=this._readyResolvers.slice();this._readyResolvers=[];for(let r of e)try{r(!1)}catch{}return}this._retryTimer=setTimeout(()=>{this._retryTimer=null,this._initialized=!1,this._ensureInitialized()},Rw)}}_resolveHostEventName(e){let r=Gy(e),s=this._bridge?.eventTypes||{};if(s[r])return s[r];let o=r.toLowerCase();if(s[o])return s[o];let n=String(e).trim();return n&&n===n.toLowerCase()?n:o}_attachEntry(e){if(!this._bridge?.hasBridge||e.attached||e._disposed)return;let r=this._resolveHostEventName(e.rawKey);if(!r){At.warn("\u65E0\u6CD5\u89E3\u6790\u5BBF\u4E3B\u4E8B\u4EF6\u540D",{rawKey:e.rawKey});return}let{eventSource:s}=this._bridge,o=typeof s?.on=="function"?s.on.bind(s):typeof s?.addListener=="function"?s.addListener.bind(s):null,n=typeof s?.off=="function"?s.off.bind(s):typeof s?.removeListener=="function"?s.removeListener.bind(s):null;if(!o||!n){At.warn("\u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5");return}try{o(r,e.handler),e.attached=!0,e._hostName=r,e._hostUnsubscribe=()=>{try{n(r,e.handler)}catch(a){At.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:r,error:a})}},At.debug(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${r}" (key=${e.key})`)}catch(a){At.error(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6\u5931\u8D25: "${r}"`,{error:a})}}},zt=new Zl});var Jy={};re(Jy,{ContextInjector:()=>Pa,DEFAULT_INJECTION_OPTIONS:()=>Vy,WRITEBACK_METHODS:()=>Gt,WRITEBACK_RESULT_STATUS:()=>Ma,contextInjector:()=>Ct,default:()=>Nw});function tc(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function Cs(t,e){let r=String(e||"").trim();return r?Array.isArray(t)?(t.includes(r)||t.push(r),t):[r]:t}function Ra(t={}){if(t?.signal?.aborted)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE";if(typeof t?.shouldAbortWriteback=="function")try{if(t.shouldAbortWriteback()===!0)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}catch{return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}return""}var lt,bt,To,Vy,Ma,Gt,Mw,Pw,Pa,Ct,Nw,ks=N(()=>{Ge();H();ec();lt=I.createScope("ContextInjector"),bt="YouYouToolkit_toolOutputs",To="YouYouToolkit_injectedContext",Vy={overwrite:!0,enabled:!0};Ma={SUCCESS:"success",FAILED:"failed"},Gt={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},Mw=60,Pw=3;Pa=class{constructor(){this.debugMode=!1}async inject(e,r,s={}){return(await this.injectDetailed(e,r,s)).success}async injectDetailed(e,r,s={}){let o={...Vy,...s},n=this._createWritebackResult(e,o);if(!e||r===void 0||r===null)return lt.error("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),n.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",n;if(!tc(o.sourceMessageId))return lt.error("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),n.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",n;if(o?.signal?.aborted)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",n;if(typeof o?.shouldAbortWriteback=="function")try{if(o.shouldAbortWriteback()===!0)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}catch{return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}let a=n.chatId,i={toolId:e,content:String(r),updatedAt:Date.now(),sourceMessageId:o.sourceMessageId||null,sourceSwipeId:o.sourceSwipeId||o.effectiveSwipeId||null,options:o};K.emit(B.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:i.content,sourceMessageId:i.sourceMessageId,sourceSwipeId:i.sourceSwipeId,effectiveSwipeId:i.sourceSwipeId,slotBindingKey:o.slotBindingKey||"",slotRevisionKey:o.slotRevisionKey||"",slotTransactionId:o.slotTransactionId||"",traceId:o.traceId||"",sessionKey:o.sessionKey||"",options:o});let l=await this._insertToolOutputToBoundAssistantSlot(e,i,o,n);return l.success&&lt.info(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,{inserted:l}),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:r}=this._getChatRuntime(),s=this._findAssistantMessageIndex(r,e);if(s<0)return"";let o=r[s]||{},n=o[To];if(typeof n=="string"&&n.trim())return n.trim();let a=o[bt];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(r){return lt.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",{error:r}),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),r=this._findAssistantMessageIndex(e,null);if(r<0)return{};let o=(e[r]||{})[bt];return o&&typeof o=="object"?o:{}}catch(e){return lt.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",{error:e}),{}}}getToolContext(e,r){if(!r)return null;try{let{chat:s}=this._getChatRuntime(),o=this._findAssistantMessageIndex(s,null);return o<0?null:s[o]?.[bt]?.[r]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,r){if(!r)return!1;try{let{api:s,context:o,chat:n}=this._getChatRuntime(),a=this._findAssistantMessageIndex(n,null);if(a<0)return!1;let i=n[a],l=i?.[bt];if(!l||!l[r])return!1;delete l[r],i[bt]=l,i[To]=this._buildMessageInjectedContext(l);let c=o?.saveChat||s?.saveChat||null;return typeof c=="function"&&await c.call(o||s),K.emit(B.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:r}),!0}catch(s){return lt.warn("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:s}),!1}}async clearAllContext(e){try{let{api:r,context:s,chat:o}=this._getChatRuntime(),n=this._findAssistantMessageIndex(o,null);if(n<0)return!1;let a=o[n];delete a[bt],delete a[To];let i=s?.saveChat||r?.saveChat||null;return typeof i=="function"&&await i.call(s||r),K.emit(B.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(r){return lt.warn("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:r}),!1}}clearAllChatsContexts(){lt.info("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,r){return!!this.getToolContext(e,r)}getContextSummary(e){let r=this._getLatestAssistantMessageOutputs(),s=Object.entries(r).map(([o,n])=>({toolId:o,updatedAt:n.updatedAt,contentLength:n.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:s,totalCount:s.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,r={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,r=e.SillyTavern||null,s=r?.getContext?.()||null,o=Array.isArray(s?.chat)?s.chat:[],n=Array.isArray(r?.chat)?r.chat:[],a=o.length?o:n;return{topWindow:e,api:r,context:s,chat:a,contextChat:o,apiChat:n}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,r={}){let s=Gt.SET_CHAT_MESSAGES;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:r.traceId||"",sessionKey:r.sessionKey||"",sourceMessageId:r.sourceMessageId||null,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId||null,effectiveSwipeId:r.effectiveSwipeId||r.sourceSwipeId||null,slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:Gt.NONE,commit:{preferredMethod:s,attemptedMethods:[],appliedMethod:Gt.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:"",eventSource:"",eventName:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:Ma.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(r=>setTimeout(r,e))}_collectWritebackVerification(e,r,s,o,n,a=null){let i=e?.contextChat?.[s]||e?.apiChat?.[s]||r?.[s]||a||null,l=this._getWritableMessageField(i).text||"",c=i?.[bt]?.[o],d=n?l.includes(n):!0,u=!!(c&&String(c.content||"").trim()===n);return{latestMessage:i,latestText:l,textIncludesContent:d,mirrorStored:u}}async _confirmRefresh(e,r,s,o,n,a=null){let i=1,l=this._collectWritebackVerification(e,r,s,o,n,a);for(let c=0;c<Pw;c+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:i,confirmedBy:"text_and_mirror_present"};await this._wait(Mw),i+=1,l=this._collectWritebackVerification(e,r,s,o,n,a)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:i,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}async _requestAssistantMessageRefresh(e,r,s,o={},n=null){let a=n||this._createWritebackResult("",o),{api:i,context:l}=e||{},c=e?.topWindow||(typeof window.parent<"u"&&window.parent!==window?window.parent:window),d=c?.TavernHelper?.setChatMessages||l?.setChatMessages||i?.setChatMessages||c?.setChatMessages||null;a.commit.preferredMethod=typeof d=="function"?Gt.SET_CHAT_MESSAGES:Gt.LOCAL_ONLY;let u=!1,y=Ra(o);if(y)return a.error=y,a;if(typeof d=="function"){Cs(a.commit.attemptedMethods,Gt.SET_CHAT_MESSAGES);try{let p=Ra(o);if(p)return a.error=p,a;let f=tc(o.sourceMessageId)||r;await d([{message_id:f,message:s}],{refresh:"affected"}),a.steps.hostSetChatMessages=!0,a.hostUpdateMethod=Gt.SET_CHAT_MESSAGES,a.hostCommitApplied=!0,a.commit.appliedMethod=Gt.SET_CHAT_MESSAGES,a.commit.hostCommitApplied=!0,u=!0}catch(p){lt.error("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",{error:p}),a.errors.push(`setChatMessages: ${p?.message||String(p)}`)}}return u&&(a.refreshRequested=!0,Cs(a.refresh.requestMethods,a.hostUpdateMethod)),u||(Cs(a.commit.attemptedMethods,Gt.LOCAL_ONLY),a.commit.appliedMethod=Gt.LOCAL_ONLY,a.commit.fallbackUsed=!0,a.hostUpdateMethod=a.commit.appliedMethod),a}_inferBlockType(e){let r=String(e||"").trim();if(!r)return"empty";let s=r.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return s?.[1]?s[1]:"plain_text"}_stripExactStoredBlock(e,r,s=""){let o=String(e||""),n=String(r||"").trim(),a=String(s||"").trim();return n?o.includes(n)?a?{text:o.replace(n,a).trimEnd(),removed:!0,replaced:!0}:{text:o.replace(n,"").trimEnd(),removed:!0,replaced:!1}:{text:o,removed:!1,replaced:!1}:{text:o,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,r,s){let{contextChat:o,apiChat:n}=e||{},a=i=>{!Array.isArray(i)||r<0||r>=i.length||i[r]!==s&&(i[r]={...i[r]||{},...s})};a(o),a(n)}_notifyMessageUpdated(e,r,s={}){if(s.skipNotify===!0)return{emitted:!1,source:"skipped_by_caller",eventName:""};try{let o=zt.describe(),n=e?.topWindow||ka();return o.hasBridge?(zt.emit(We.MESSAGE_UPDATED,r),typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(()=>{zt.emit(We.MESSAGE_UPDATED,r)}):typeof n?.setTimeout=="function"&&n.setTimeout(()=>{zt.emit(We.MESSAGE_UPDATED,r)},30),{emitted:!0,source:o.source||"unavailable",eventName:We.MESSAGE_UPDATED}):{emitted:!1,source:o.source||"unavailable",eventName:We.MESSAGE_UPDATED}}catch(o){return lt.warn("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",{error:o}),{emitted:!1,source:"error",eventName:"",error:o?.message||String(o)}}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let r=String(e.role||"").toLowerCase();return r==="assistant"||r==="ai"||!r}_findAssistantMessageIndex(e,r){let s=Array.isArray(e)?e:[];if(!s.length)return-1;let o=r!=null&&r!=="",n=(a,i)=>{if(!this._isAssistantMessage(a)||r==null||r==="")return!1;let l=String(r).trim();return l?[a.message_id,a.id,a.messageId,a.mes_id,i].map(d=>d==null?"":String(d).trim()).includes(l):!1};for(let a=s.length-1;a>=0;a-=1)if(n(s[a],a))return a;if(o)return-1;for(let a=s.length-1;a>=0;a-=1)if(this._isAssistantMessage(s[a]))return a;return-1}_buildMessageInjectedContext(e){let s=Object.entries(e&&typeof e=="object"?e:{}).filter(([,n])=>n?.blockType!=="full_message").sort(([,n],[,a])=>(n?.updatedAt||0)-(a?.updatedAt||0));if(!s.length)return"";let o=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[n,a]of s)o.push(`[${n}]`),o.push(a?.content||""),o.push("");return o.join(`
`)}_getWritableMessageField(e){let r=["mes","message","content","text"];for(let s of r)if(typeof e?.[s]=="string")return{key:s,text:e[s]};return{key:"mes",text:""}}_applyMessageText(e,r,s={}){let o=e&&typeof e=="object"?e:{},n=["mes","message","content","text"],a=!1;if(n.forEach(i=>{typeof o[i]=="string"&&(o[i]=r,a=!0)}),a||(o.mes=r,o.message=r),Array.isArray(o.swipes)){let i=Number.parseInt(tc(s?.sourceSwipeId||s?.effectiveSwipeId),10),l=Number.isInteger(i)?i:Number.isInteger(o.swipe_id)?o.swipe_id:Number.isInteger(o.swipeId)?o.swipeId:0;l>=0&&l<o.swipes.length&&(o.swipes[l]=r,o.swipe_id=l,o.swipeId=l)}return o}_stripExistingToolOutput(e,r=[]){let s=String(e||"");return(Array.isArray(r)?r:[]).forEach(n=>{let a=String(n||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let d=new RegExp(a.slice(6).trim(),"gis");s=s.replace(d,"")}catch(d){lt.warn("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",{value:a,error:d})}return}let i=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),c=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");s=s.replace(l,""),s=s.replace(c,"")}),s.trimEnd()}_stripPreviousStoredToolContent(e,r){let s=String(e||""),o=String(r||"").trim();return o?s.replace(o,"").trimEnd():s.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,r,s={},o=null){let n=o||this._createWritebackResult(e,s);try{let a=this._getChatRuntime(),{context:i,chat:l}=a;if(!Array.isArray(l)||!l.length)return lt.error("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),n.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",n;let c=this._findAssistantMessageIndex(l,s.sourceMessageId);if(c<0)return lt.error("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),n.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",n;if(s?.signal?.aborted)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",n;if(typeof s?.shouldAbortWriteback=="function")try{if(s.shouldAbortWriteback()===!0)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}catch{return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}n.messageIndex=c,n.steps.foundTargetMessage=!0;let d=l[c],{key:u,text:y}=this._getWritableMessageField(d);n.textField=u;let p=d[bt]&&typeof d[bt]=="object"?d[bt]:{},f=p?.[e]||{},g=f?.content||"",h=f?.blockText||g||"",x=Object.entries(p).filter(([Ye])=>Ye!==e).map(([,Ye])=>Ye||{}),v=String(r.content||"").trim(),T=s.replaceFullMessage===!0,L=T?"full_message":this._inferBlockType(v),M={toolId:e,messageId:s.sourceMessageId||d?.message_id||d?.messageId||c,blockType:L,insertedAt:r.updatedAt,replaceable:s.overwrite!==!1};n.blockIdentity=M;let _=s.overwrite===!1||T?{text:String(y||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(y,h,v),C=_.text,W="";!T&&s.overwrite!==!1&&h&&!_.removed&&(W="previous_block_not_found");let q=s.overwrite===!1||_.replaced||T?C:this._stripExistingToolOutput(C,s.extractionSelectors),R=q!==C;C=q;let S=s.overwrite===!1||_.replaced||T?C:this._stripPreviousStoredToolContent(C,g),U=S!==C;C=S,n.replacedExistingBlock=T||_.removed||R||U;let j=s.overwrite===!1?String(y||""):C,ie=T?v:_.replaced?C.trim():[j.trimEnd(),v].filter(Boolean).join(`

`).trim();n.insertedNewBlock=!!v;let Oe=x.every(Ye=>{if(Ye?.blockType==="full_message")return!0;let dr=String(Ye?.blockText||Ye?.content||"").trim();return dr?ie.includes(dr):!0});n.preservedOtherToolBlocks=Oe,Oe?W&&(n.conflictDetected=!0,n.conflictReason=W):(n.conflictDetected=!0,n.conflictReason="other_tool_block_removed");let Te={...p,[e]:{toolId:e,content:v,blockText:v,blockType:L,blockIdentity:M,updatedAt:r.updatedAt,sourceMessageId:r.sourceMessageId||null}},ae=Ra(s);if(ae)return n.error=ae,n;d[u]=ie,this._applyMessageText(d,ie,s),d[bt]=Te,d[To]=this._buildMessageInjectedContext(Te),n.contentCommitted=!0,n.commit.contentCommitted=!0,n.steps.contentCommitted=!0,n.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,c,d),n.steps.runtimeSynced=!0;let rt=Ra(s);if(rt)return n.error=rt,n;await this._requestAssistantMessageRefresh(a,c,ie,s,n);let cr=i?.saveChat||a?.api?.saveChat||null,J=i?.saveChatDebounced||a?.api?.saveChatDebounced||null;typeof J=="function"&&(J.call(i||api),n.steps.saveChatDebounced=!0,n.refreshRequested=!0,Cs(n.refresh.requestMethods,"saveChatDebounced")),typeof cr=="function"&&(await cr.call(i||api),n.steps.saveChat=!0,n.refreshRequested=!0,Cs(n.refresh.requestMethods,"saveChat"));let ye=this._notifyMessageUpdated(a,c,s);n.steps.notifiedMessageUpdated=ye?.emitted===!0,n.refresh.eventSource=ye?.source||"",n.refresh.eventName=ye?.eventName||"",ye?.error&&n.errors.push(`MESSAGE_UPDATED: ${ye.error}`);let Be=String(r.content||"").trim();(n.steps.hostSetChatMessages||n.steps.hostSetChatMessage)&&(n.refreshRequested=!0,Cs(n.refresh.requestMethods,n.hostUpdateMethod)),n.steps.notifiedMessageUpdated&&(n.refreshRequested=!0,Cs(n.refresh.requestMethods,`MESSAGE_UPDATED:${n.refresh.eventName||"MESSAGE_UPDATED"}`)),n.steps.refreshRequested=n.refreshRequested,n.refresh.requested=n.refreshRequested;let Mt=await this._confirmRefresh(a,l,c,e,Be,d);return n.verification.textIncludesContent=Mt.textIncludesContent,n.verification.mirrorStored=Mt.mirrorStored,n.verification.refreshConfirmed=Mt.refreshConfirmed,n.steps.verifiedAfterWrite=n.verification.textIncludesContent&&n.verification.mirrorStored,n.refreshConfirmed=n.verification.refreshConfirmed&&n.refreshRequested,n.refresh.confirmChecks=Number(Mt.confirmChecks)||0,n.refresh.confirmedBy=Mt.confirmedBy||"",n.refresh.confirmed=n.refreshConfirmed,n.steps.refreshConfirmed=n.refreshConfirmed,n.success=n.steps.localTextApplied&&n.steps.runtimeSynced&&n.steps.verifiedAfterWrite&&n.refreshConfirmed,n.writebackStatus=n.success?Ma.SUCCESS:Ma.FAILED,!n.success&&!n.error&&(n.error=n.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),n.conflictDetected&&!n.error&&(n.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${n.conflictReason}`),lt.info(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${c}`),n}catch(a){return lt.error("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",{error:a}),n.error=a?.message||String(a),n.errors.push(n.error),n}}getAssistantMessageSnapshot(e=null){try{let r=this._getChatRuntime(),{chat:s}=r,o=this._findAssistantMessageIndex(s,e);if(o<0)return null;let n=s[o]||null,a=this._getWritableMessageField(n).text||"",i=n?.[bt]&&typeof n[bt]=="object"?n[bt]:{},l=Object.values(i).reduce((c,d)=>{let u=String(d?.blockText||d?.content||"").trim();return!u||!c.includes(u)?c:c.replace(u,"").trimEnd()},String(a||"")).trim();return{messageIndex:o,message:n,messageText:a,baseText:l,toolOutputs:i,injectedContext:typeof n?.[To]=="string"?n[To]:this._buildMessageInjectedContext(i)}}catch(r){return lt.warn("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",{error:r}),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext(),o=[r?.chatId,r?.chat_id,r?.chat_filename,r?.chatMetadata?.chatId,r?.chatMetadata?.chat_id,r?.chatMetadata?.file_name,r?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(o)return o;let n=e.SillyTavern?.this_chid;if(n!=null)return`chat_char_${n}`}return"chat_default"}catch{return"chat_default"}}},Ct=new Pa,Nw=Ct});var Qy={};re(Qy,{BUILTIN_VARIABLES:()=>Xy,VariableResolver:()=>Na,default:()=>$w,variableResolver:()=>Kt});var Dw,Xy,Na,Kt,$w,Da=N(()=>{Ge();H();Dw=I.createScope("VariableResolver"),Xy={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},Na=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,r){if(typeof e!="string")return e;let s=e;return s=this._resolveBuiltinVariables(s,r),s=this._resolveCustomVariables(s,r),s=this._resolveRegexVariables(s,r),s}resolveObject(e,r){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(o=>this.resolveObject(o,r));let s={};for(let[o,n]of Object.entries(e))typeof n=="string"?s[o]=this.resolveTemplate(n,r):typeof n=="object"&&n!==null?s[o]=this.resolveObject(n,r):s[o]=n;return s}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,r){e&&(this.customVariables.set(e,r),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,r){!e||typeof r!="function"||(this.variableHandlers.set(e,r),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,r]of Object.entries(Xy))e.push({name:`{{${r.name}}}`,description:r.description,category:r.category,type:"builtin"});for(let[r,s]of this.customVariables)e.push({name:`{{${r}}}`,description:typeof s=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],r={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},s={};for(let o of this.getAvailableVariables())s[o.category]||(s[o.category]=[]),s[o.category].push(o);for(let[o,n]of Object.entries(r))if(s[o]&&s[o].length>0){e.push(`\u3010${n}\u3011`);for(let a of s[o])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,r)=>(r.regexResults||r.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,r){let s=e;return s=s.replace(/\{\{lastUserMessage\}\}/gi,r.lastUserMessage||r.raw?.lastUserMessage||""),s=s.replace(/\{\{lastAiMessage\}\}/gi,r.lastAiMessage||r.raw?.lastAiMessage||""),s=s.replace(/\{\{chatHistory\}\}/gi,()=>{let o=r.chatHistory||r.raw?.chatHistory||[];return this._formatChatHistory(o)}),s=s.replace(/\{\{characterCard\}\}/gi,()=>{let o=r.characterCard||r.raw?.characterCard;return o?this._formatCharacterCard(o):""}),s=s.replace(/\{\{toolName\}\}/gi,r.toolName||r.raw?.toolName||""),s=s.replace(/\{\{toolId\}\}/gi,r.toolId||r.raw?.toolId||""),s=s.replace(/\{\{toolPromptMacro\}\}/gi,r.toolPromptMacro||r.raw?.toolPromptMacro||""),s=s.replace(/\{\{toolContentMacro\}\}/gi,r.toolContentMacro||r.raw?.toolContentMacro||""),s=s.replace(/\{\{toolWorldbookContent\}\}/gi,r.toolWorldbookContent||r.raw?.toolWorldbookContent||""),s=s.replace(/\{\{injectedContext\}\}/gi,r.injectedContext||r.raw?.injectedContext||""),s=s.replace(/\{\{extractedContent\}\}/gi,r.extractedContent||r.raw?.extractedContent||""),s=s.replace(/\{\{recentMessagesText\}\}/gi,r.recentMessagesText||r.raw?.recentMessagesText||""),s=s.replace(/\{\{rawRecentMessagesText\}\}/gi,r.rawRecentMessagesText||r.raw?.rawRecentMessagesText||""),s=s.replace(/\{\{userMessage\}\}/gi,r.userMessage||r.raw?.userMessage||""),s=s.replace(/\{\{previousToolOutput\}\}/gi,r.previousToolOutput||r.raw?.previousToolOutput||""),s}_resolveCustomVariables(e,r){let s=e;for(let[o,n]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(o)}\\}\\}`,"gi");typeof n=="function"?s=s.replace(a,()=>{try{return n(r)}catch(i){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}:`,i),""}}):s=s.replace(a,String(n))}return s}_resolveRegexVariables(e,r){let s=e;for(let[o,n]of this.variableHandlers){let a=new RegExp(`\\{\\{${o}\\.([^}]+)\\}\\}`,"gi");s=s.replace(a,(i,l)=>{try{return n(l,r)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}.${l}:`,c),""}})}return s}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(r=>{let s=r.role||"unknown",o=r.content||r.mes||"";return`[${s}]: ${o}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let r=[];return e.name&&r.push(`\u59D3\u540D: ${e.name}`),e.description&&r.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&r.push(`\u6027\u683C: ${e.personality}`),e.scenario&&r.push(`\u573A\u666F: ${e.scenario}`),r.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){Dw.debug(e[0],e.length>1?e.slice(1):void 0)}},Kt=new Na,$w=Kt});var ef={};re(ef,{DEFAULT_PROMPT_TEMPLATE:()=>Zy,ToolPromptService:()=>$a,default:()=>Ow,toolPromptService:()=>Is});var Lw,Zy,$a,Is,Ow,La=N(()=>{Ge();vo();Da();Jn();H();Lw=I.createScope("ToolPromptService"),Zy="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",$a=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,r={}){let s=this._getPromptTemplate(e),o=String(r?.toolWorldbookContent||r?.input?.toolWorldbookContent||await Vn(e)).trim(),n=Kt.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolWorldbookContent:o}),a=Kt.resolveTemplate(s,n).trim(),i=String(r?.toolContentMacro||r?.input?.toolContentMacro||"").trim();return Kt.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolPromptMacro:a,toolContentMacro:i,toolWorldbookContent:o})}async buildToolMessages(e,r){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let s=[],o=await this._buildVariableContext(e,r),n=Array.isArray(e.promptMessages)?e.promptMessages:[],a=this._getBypassMessages(e),i=a?.some(l=>l.mainSlot==="A"||l.mainSlot==="B"||l.isMain||l.isMain2);if(a&&a.length>0)for(let l of a)l.enabled!==!1&&s.push({role:this._normalizeRole(l.role),content:Kt.resolveTemplate(l.content||"",o)});if(!i&&n.length>0)for(let l of n){let c=Kt.resolveTemplate(l?.content||"",o).trim();c&&s.push({role:this._normalizeRole(l?.role),content:c})}else if(!i&&!a?.length){let l=this._buildUserContent(this._getPromptTemplate(e),o);l&&s.push({role:"user",content:l})}return this._log(`\u6784\u5EFA\u6D88\u606F: ${s.length} \u6761`),s}async buildPromptText(e,r){let s=await this._buildVariableContext(e,r),o=Array.isArray(e?.promptMessages)?e.promptMessages:[];return o.length>0?o.map(n=>Kt.resolveTemplate(n?.content||"",s).trim()).filter(Boolean).join(`

`):s.toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:Zy}_getBypassMessages(e){return e.bypass?.enabled?le.buildBypassMessages(e):[]}_buildUserContent(e,r){return!e||!e.trim()?"":Kt.resolveTemplate(e,r).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){Lw.debug(e[0],e.length>1?e.slice(1):void 0)}setDebugMode(e){this.debugMode=e}},Is=new $a,Ow=Is});var rf={};re(rf,{LEGACY_OUTPUT_MODES:()=>Bw,OUTPUT_MODES:()=>kt,TOOL_FAILURE_STAGES:()=>He,TOOL_RUNTIME_STATUS:()=>zw,TOOL_WRITEBACK_STATUS:()=>Le,ToolOutputService:()=>Oa,default:()=>Kw,toolOutputService:()=>It});function tf(t){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}function So(t=[],e="",r=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!r,contentCommitted:!!r?.contentCommitted,hostCommitApplied:!!r?.hostCommitApplied,writebackStatus:r?.writebackStatus||"",preferredCommitMethod:r?.commit?.preferredMethod||"",appliedCommitMethod:r?.commit?.appliedMethod||"",fallbackUsed:!!r?.commit?.fallbackUsed},refresh:{requested:!!r?.refreshRequested,confirmed:!!r?.refreshConfirmed,requestMethods:Array.isArray(r?.refresh?.requestMethods)?[...r.refresh.requestMethods]:[],confirmChecks:Number(r?.refresh?.confirmChecks)||0,confirmedBy:r?.refresh?.confirmedBy||""}}}var Rs,kt,Bw,zw,He,Le,Oa,It,Kw,gn=N(()=>{Ge();fn();H();ks();La();Gs();zr();Dn();Rs=I.createScope("ToolOutputService"),kt={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api",LOCAL_TRANSFORM:"local_transform"},Bw={inline:"follow_ai"},zw={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},He={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},Le={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};Oa=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===kt.POST_RESPONSE_API}shouldRunLocalTransform(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===kt.LOCAL_TRANSFORM||!!e.processor?.type}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let r=e.output?.mode;return r===kt.FOLLOW_AI||r==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,r){let s=Date.now(),o=e.id,n=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=this._getExtractionSelectors(e),c=e.output?.apiPreset||e.apiPreset||"",d="",u=Le.NOT_APPLICABLE,y=null,p=[],f="";Rs.info(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${o}`),K.emit(B.TOOL_EXECUTION_STARTED,{toolId:o,traceId:n,sessionKey:a,mode:kt.POST_RESPONSE_API});try{if(d=He.BUILD_MESSAGES,p=await this._buildToolMessages(e,r),!p||p.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");Rs.debug(`\u6784\u5EFA\u4E86 ${p.length} \u6761\u6D88\u606F`);let g=tf(r);if(g){let L=Date.now()-s;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:L,meta:{traceId:n,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:c,writebackStatus:u,failureStage:d,writebackDetails:y,aborted:g.aborted===!0,stale:g.stale===!0,abortReason:g.reason||"",phases:So(p,f,y)}}}let h=await this._getRequestTimeout();d=He.SEND_API_REQUEST;let x=await this._sendApiRequest(c,p,{timeoutMs:h,signal:r.signal});d=He.EXTRACT_OUTPUT,f=this._extractOutputContent(x,e);let v=tf(r);if(v){let L=Date.now()-s;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:L,meta:{traceId:n,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:c,writebackStatus:u,failureStage:d,writebackDetails:y,aborted:v.aborted===!0,stale:v.stale===!0,abortReason:v.reason||"",phases:So(p,f,y)}}}if(f){if(d=He.INJECT_CONTEXT,y=await Ct.injectDetailed(o,f,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:l,traceId:n,sessionKey:a,signal:r.signal,shouldAbortWriteback:r.shouldAbortWriteback,isAutoRun:r.isAutoRun===!0,skipNotify:r.skipNotify===!0}),!y?.success)throw u=Le.FAILED,new Error(y?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=Le.SUCCESS}else u=Le.SKIPPED_EMPTY_OUTPUT;d="";let T=Date.now()-s;return K.emit(B.TOOL_EXECUTED,{toolId:o,traceId:n,sessionKey:a,success:!0,duration:T,mode:kt.POST_RESPONSE_API}),Rs.info(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${o}, \u8017\u65F6 ${T}ms`),{success:!0,toolId:o,output:f,duration:T,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:p.length,selectors:l,apiPreset:c,writebackStatus:u,failureStage:"",writebackDetails:y,phases:So(p,f,y)}}}catch(g){let h=Date.now()-s,x=d||He.UNKNOWN,v=u||Le.NOT_APPLICABLE;return Rs.error(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${o}`,{error:g}),K.emit(B.TOOL_EXECUTION_FAILED,{toolId:o,traceId:n,sessionKey:a,error:g.message||String(g),duration:h}),{success:!1,toolId:o,error:g.message||String(g),duration:h,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:p.length,selectors:l,apiPreset:c,writebackStatus:v,failureStage:x,writebackDetails:y,phases:So(p,f,y)}}}}async runToolFollowAiManual(e,r){let s=Date.now(),o=e.id,n=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=e.output?.apiPreset||e.apiPreset||"",c=this._getExtractionSelectors(e),d="",u=Le.NOT_APPLICABLE,y=null,p=[],f="";K.emit(B.TOOL_EXECUTION_STARTED,{toolId:o,traceId:n,sessionKey:a,mode:kt.FOLLOW_AI});try{if(d=He.BUILD_MESSAGES,p=await this._buildToolMessages(e,r),!p||p.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");let g=await this._getRequestTimeout();d=He.SEND_API_REQUEST;let h=await this._sendApiRequest(l,p,{timeoutMs:g,signal:r.signal});if(d=He.EXTRACT_OUTPUT,f=this._extractOutputContent(h,e),f){if(d=He.INJECT_CONTEXT,y=await Ct.injectDetailed(o,f,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:c,traceId:n,sessionKey:a}),!y?.success)throw u=Le.FAILED,new Error(y?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=Le.SUCCESS}else u=Le.SKIPPED_EMPTY_OUTPUT;d="";let x=Date.now()-s;return K.emit(B.TOOL_EXECUTED,{toolId:o,traceId:n,sessionKey:a,success:!0,duration:x,mode:kt.FOLLOW_AI}),{success:!0,toolId:o,output:f,duration:x,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:p.length,selectors:c,apiPreset:l,writebackStatus:u,failureStage:"",writebackDetails:y,phases:So(p,f,y)}}}catch(g){let h=Date.now()-s,x=d||He.UNKNOWN,v=u||Le.NOT_APPLICABLE;return K.emit(B.TOOL_EXECUTION_FAILED,{toolId:o,traceId:n,sessionKey:a,error:g.message||String(g),duration:h,mode:kt.FOLLOW_AI}),{success:!1,toolId:o,error:g.message||String(g),duration:h,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:p.length,selectors:c,apiPreset:l,writebackStatus:v,failureStage:x,writebackDetails:y,phases:So(p,f,y)}}}}async runToolInline(e,r){return this.runToolFollowAiManual(e,r)}async previewExtraction(e,r){return{success:!0,...this.getExtractionSnapshot(e,r)}}getExtractionSnapshot(e,r){let s=this._buildRecentMessageExtractionEntries(e,r),o=this._joinMessageBlocks(s,"rawText"),n=this._joinMessageBlocks(s,"filteredText"),a=this._joinMessageBlocks(s,"extractedText",{skipEmpty:!0}),i=(Array.isArray(s)?s:[]).map(c=>String(c?.extractedText||"").trim()).filter(Boolean).join(`

`),l=Array.isArray(s)&&s.length>0?s[s.length-1]:null;return{sourceText:o,filteredSourceText:n,extractedText:a,extractedRawText:i,messageEntries:s,primaryEntry:l,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,r){let s=this._buildRecentMessageExtractionEntries(e,r),o=this._joinMessageBlocks(s,"rawText"),n=this._joinMessageBlocks(s,"filteredText"),a=this._joinMessageBlocks(s,"extractedText",{skipEmpty:!0}),i={...r,rawRecentMessagesText:o,recentMessagesText:n,extractedContent:a,toolContentMacro:this._buildToolContentMacro(s),toolName:e.name,toolId:e.id};return Is.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let r=String(e).toLowerCase();return r==="system"?"system":r==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,r,s={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:o=9e4,signal:n}=s,a=null;if(e){if(!No(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=Po(e)}else a=Po();let i=Nn(a||{});if(!i.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(r,{timeoutMs:o,apiConfig:a},n);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Bt.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,r){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,r);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,r);if(e.content)return this._applyOutputExtractionSelectors(e.content,r);if(e.text)return this._applyOutputExtractionSelectors(e.text,r);if(e.message)return this._applyOutputExtractionSelectors(e.message,r);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),r)}catch{return this._applyOutputExtractionSelectors(String(e),r)}}return this._applyOutputExtractionSelectors(String(e),r)}_applyOutputExtractionSelectors(e,r){let s=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(r);if(!o.length)return s.trim();let n=[];for(let a of o){let i=String(a||"").trim();if(!i)continue;if(i.startsWith("regex:")){let c=i.slice(6).trim();if(!c)continue;try{let d=new RegExp(c,"gi");[...s.matchAll(d)].forEach(y=>{let p=String(y?.[0]||"").trim();p&&n.push(p)})}catch(d){Rs.warn("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:d})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(s.match(c)||[]).forEach(u=>{let y=String(u||"").trim();y&&n.push(y)})}catch(c){Rs.warn("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}}return n.length>0?n.join(`

`).trim():s.trim()}_resolveExtractionContext(e){let r=e?.extraction?.regexPresetId;if(!r)return{rules:[],blacklist:[]};try{let s=br(r);if(!s)return{rules:[],blacklist:[]};let o=Array.isArray(s.rules)?s.rules.filter(a=>a&&a.enabled!==!1&&a.value).map(a=>({id:a.id,type:a.type,value:a.value,enabled:!0})):[],n=Array.isArray(s.blacklist)?s.blacklist.map(a=>String(a||"").trim()).filter(Boolean):[];return{rules:o,blacklist:n}}catch(s){return this._log("warn","_resolveExtractionContext \u5F02\u5E38",{error:s}),{rules:[],blacklist:[]}}}_getExtractionSelectors(e){let{rules:r}=this._resolveExtractionContext(e),s=[];for(let o of r){let n=String(o.value||"").trim();n&&(o.type==="include"?s.push(n):o.type==="regex_include"&&s.push(`regex:${n}`))}return s}_applyExtractionSelectors(e,r){return this._applyExtractionSelectorsInternal(e,r,{strict:!1})}_applyExtractionSelectorsInternal(e,r,s={}){let o=typeof e=="string"?e:String(e||""),{rules:n,blacklist:a}=this._resolveExtractionContext(r),{strict:i=!1}=s;if(!n.length)return o.trim();let l=mr(o,n,a||[]);return i?(l||"").trim():l||o.trim()}_extractToolContent(e,r){let s=typeof r=="string"?r:String(r||""),{rules:o}=this._resolveExtractionContext(e);return o.length?this._applyExtractionSelectorsInternal(s,e,{strict:!0}):s.trim()}_applyGlobalContextRules(e){let r=typeof e=="string"?e:String(e||"");if(!r.trim())return"";try{let s=Hs()||[],o=Ys()||[];return!Array.isArray(s)||s.length===0?r.trim():mr(r,s,o)||r.trim()}catch(s){return Rs.warn("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",{error:s}),r.trim()}}_getMessageText(e){if(!e)return"";let r=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let s of r)if(typeof s=="string"&&s.trim())return s.trim();return""}_collectRecentAssistantMessages(e,r){return this._collectRecentAssistantMessageEntries(e,r).map(s=>s.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,r){let s=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),o=Array.isArray(r?.chatMessages)?r.chatMessages:[],n=[];for(let i=o.length-1;i>=0&&n.length<s;i-=1){let l=o[i],c=String(l?.role||"").toLowerCase(),d=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,u=this._getMessageText(l);d&&u&&n.unshift({text:u,message:l,chatIndex:i})}if(n.length>0)return n;let a=r?.lastAiMessage||r?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,r){return this._collectRecentAssistantMessageEntries(e,r).map((o,n)=>{let a=o.text||"",i=this._applyGlobalContextRules(a),l=this._extractToolContent(e,a);return{...o,order:n+1,rawText:a,filteredText:i,extractedText:l,fullMessageText:a}})}_joinMessageBlocks(e,r,s={}){let o=Array.isArray(e)?e:[],{skipEmpty:n=!1}=s;return o.map(i=>{let l=String(i?.[r]||"").trim();return n&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(o=>{let n=`\u3010\u7B2C ${o?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(o?.filteredText||"").trim()||"(\u7A7A)",i=String(o?.extractedText||"").trim()||"(\u7A7A)";return`${n}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunInline(r)):[]}setDebugMode(e){this.debugMode=e}},It=new Oa,Kw=It});function of(t={}){return!t||typeof t!="object"?{}:Object.entries(t).reduce((e,[r,s])=>(e[r]=s===!0,e),{})}function Fw(t,e={}){let r=e?.direction==="unescape"?"unescape":"escape",s=of(e?.options);return Uw.reduce((o,n)=>s[n.key]!==!0?o:r==="unescape"?o.replace(n.escaped,n.unescaped):o.replace(n.plain,n.replacement),String(t||""))}function Ww(t,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(t||"");let s=of(e?.options);return jw.reduce((o,n)=>s[n.key]!==!0?o:o.replace(n.from,n.to),String(t||""))}function Hw(t,e){let r=t?.processor||{},s=r?.type||"",o=String(e||"");switch(s){case sf.ESCAPE_TRANSFORM:return Fw(o,r);case sf.PUNCTUATION_TRANSFORM:return Ww(o,r);default:return o}}function Yw(t,e,r){let s=String(t||""),o=String(e||"").trim(),n=String(r||"").trim();return!s.trim()||!o?{nextMessageText:"",replaced:!1}:s.includes(o)?{nextMessageText:s.replace(o,n).trim(),replaced:!0}:{nextMessageText:"",replaced:!1}}async function Ba(t,e={}){let r=It.getExtractionSnapshot(t,e),s=r?.primaryEntry||null,o=String(s?.fullMessageText||e?.lastAiMessage||"").trim(),n=String(s?.extractedText||r?.extractedRawText||r?.extractedText||"").trim(),a=Array.isArray(r?.selectors)?r.selectors:[],i=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l=e?.sessionKey||"";if(!n||!o)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:Le.NOT_APPLICABLE,failureStage:He.EXTRACT_OUTPUT,extraction:r}};let c=String(Hw(t,n)||"").trim(),d=Yw(o,n,c),u=d.replaced?d.nextMessageText:c,y=null,p=Le.NOT_APPLICABLE;if(u){if(y=await Ct.injectDetailed(t.id,u,{overwrite:!0,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:[],replaceFullMessage:d.replaced,traceId:i,sessionKey:l,skipNotify:e?.skipNotify===!0}),!y?.success)return{success:!1,error:y?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:Le.FAILED,failureStage:He.INJECT_CONTEXT,writebackDetails:y,extraction:r}};p=Le.SUCCESS}else p=Le.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:c,writebackState:u?{committed:y?.contentCommitted===!0}:null,meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:p,failureStage:"",writebackDetails:y,extraction:r}}}var Uw,jw,sf,rc=N(()=>{gn();ks();Uw=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],jw=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],sf={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var oc={};re(oc,{abortAllTasks:()=>Xw,abortTask:()=>Jw,buildToolMessages:()=>lf,clearExecutionHistory:()=>rv,createExecutionContext:()=>av,createResult:()=>za,enhanceMessagesWithBypass:()=>iv,executeBatch:()=>Vw,executeTool:()=>af,executeToolWithConfig:()=>cf,executeToolsBatch:()=>dv,executorState:()=>Ne,extractFailed:()=>nv,extractSuccessful:()=>ov,generateTaskId:()=>Ms,getExecutionHistory:()=>tv,getExecutorStatus:()=>ev,getScheduler:()=>_o,mergeResults:()=>sv,pauseExecutor:()=>Qw,resumeExecutor:()=>Zw,setMaxConcurrent:()=>qw});function za(t,e,r,s,o,n,a=0){return{success:r,taskId:t,toolId:e,data:s,error:o,duration:n,retries:a,timestamp:Date.now(),metadata:{}}}function Ms(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function Gw(t,e={}){return{id:Ms(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function _o(){return mn||(mn=new sc(Ne.maxConcurrent)),mn}function qw(t){Ne.maxConcurrent=Math.max(1,Math.min(10,t)),mn&&(mn.maxConcurrent=Ne.maxConcurrent)}async function af(t,e={},r){let s=_o(),o=Gw(t,e);for(;Ne.isPaused;)await new Promise(n=>setTimeout(n,100));try{let n=await s.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof r=="function")return await r(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},o);return nf(n),n}catch(n){let a=za(o.id,t,!1,null,n,Date.now()-o.createdAt,o.retries);return nf(a),a}}async function Vw(t,e={}){let{failFast:r=!1,concurrency:s=Ne.maxConcurrent}=e,o=[],n=_o(),a=n.maxConcurrent;n.maxConcurrent=s;try{let i=t.map(({toolId:l,options:c,executor:d})=>af(l,c,d));if(r)for(let l of i){let c=await l;if(o.push(c),!c.success){n.abortAll();break}}else{let l=await Promise.allSettled(i);for(let c of l)c.status==="fulfilled"?o.push(c.value):o.push(za(Ms(),"unknown",!1,null,c.reason,0,0))}}finally{n.maxConcurrent=a}return o}function Jw(t){return _o().abort(t)}function Xw(){_o().abortAll(),Ne.executionQueue=[]}function Qw(){Ne.isPaused=!0}function Zw(){Ne.isPaused=!1}function ev(){return{..._o().getStatus(),isPaused:Ne.isPaused,activeControllers:Ne.activeControllers.size,historyCount:Ne.executionHistory.length}}function nf(t){Ne.executionHistory.push(t),Ne.executionHistory.length>100&&Ne.executionHistory.shift()}function tv(t={}){let e=[...Ne.executionHistory];return t.toolId&&(e=e.filter(r=>r.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(r=>r.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function rv(){Ne.executionHistory=[]}function sv(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let r of t)e.totalDuration+=r.duration,r.success?(e.successCount++,r.data!==void 0&&r.data!==null&&e.data.push(r.data)):(e.success=!1,e.failureCount++,r.error&&e.errors.push({taskId:r.taskId,toolId:r.toolId,error:r.error.message||String(r.error)}));return e}function ov(t){return t.filter(e=>e.success).map(e=>e.data)}function nv(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function av(t={}){return{taskId:Ms(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function iv(t,e){return!e||e.length===0?t:[...e,...t]}function lv(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function lf(t,e){let r=[],s=t.promptTemplate||"",o={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[n,a]of Object.entries(o))s=s.replace(new RegExp(lv(n),"g"),a);return r.push({role:"USER",content:s}),r}async function cf(t,e,r={}){let s=oe(t);if(!s)return{success:!1,taskId:Ms(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!s.enabled)return{success:!1,taskId:Ms(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let o=Date.now(),n=Ms();try{K.emit(B.TOOL_EXECUTION_STARTED,{toolId:t,taskId:n,context:e});let a=lf(s,e);if(typeof r.callApi=="function"){let i=s.output?.apiPreset||s.apiPreset||"",l=i?{preset:i}:null,c=await r.callApi(a,l,r.signal),d=c;s.outputMode==="separate"&&s.extractTags?.length>0&&(d=cv(c,s.extractTags));let u={success:!0,taskId:n,toolId:t,data:d,duration:Date.now()-o};return K.emit(B.TOOL_EXECUTED,{toolId:t,taskId:n,result:u}),u}else return{success:!0,taskId:n,toolId:t,data:{messages:a,config:{apiPreset:s.output?.apiPreset||s.apiPreset||"",outputMode:s.outputMode,extractTags:s.extractTags}},duration:Date.now()-o,needsExecution:!0}}catch(a){let i={success:!1,taskId:n,toolId:t,error:a.message||String(a),duration:Date.now()-o};return K.emit(B.TOOL_EXECUTION_FAILED,{toolId:t,taskId:n,error:a}),i}}function cv(t,e){let r={};for(let s of e){let o=new RegExp(`<${s}[^>]*>([\\s\\S]*?)<\\/${s}>`,"gi"),n=t.match(o);n&&(r[s]=n.map(a=>{let i=a.match(new RegExp(`<${s}[^>]*>([\\s\\S]*?)<\\/${s}>`,"i"));return i?i[1].trim():""}))}return r}async function dv(t,e,r={}){let s=[];for(let o of t){let n=oe(o);if(n&&n.enabled){let a=await cf(o,e,r);s.push(a)}}return s}var Ne,sc,mn,nc=N(()=>{tr();Ge();Ne={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};sc=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,r){return new Promise((s,o)=>{this.queue.push({executor:e,task:r,resolve:s,reject:o}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:r,task:s,resolve:o,reject:n}=e,a=new AbortController;s.abortController=a,s.status="running",s.startedAt=Date.now(),this.running.set(s.id,s),Ne.activeControllers.set(s.id,a),this.executeTask(r,s,a.signal).then(i=>{s.status="completed",s.completedAt=Date.now(),o(i)}).catch(i=>{s.status=i.name==="AbortError"?"aborted":"failed",s.completedAt=Date.now(),n(i)}).finally(()=>{this.running.delete(s.id),Ne.activeControllers.delete(s.id),Ne.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,r,s){let o=Date.now(),n=null;for(let a=0;a<=r.maxRetries;a++){if(s.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(s);return za(r.id,r.toolId,!0,i,null,Date.now()-o,a)}catch(i){if(n=i,i.name==="AbortError")throw i;a<r.maxRetries&&(await this.delay(1e3*(a+1)),r.retries=a+1)}}throw n}delay(e){return new Promise(r=>setTimeout(r,e))}abort(e){let r=Ne.activeControllers.get(e);return r?(r.abort(),!0):!1}abortAll(){for(let e of Ne.activeControllers.values())e.abort();Ne.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},mn=null});async function pv(){return ac||(ac=Promise.resolve().then(()=>(nc(),oc))),ac}async function yv(t,e,r){return r&&t.output?.mode===kt.POST_RESPONSE_API?It.runToolPostResponse(t,e):r&&t.output?.mode===kt.FOLLOW_AI?It.runToolFollowAiManual(t,e):(await pv()).executeToolWithConfig(t.id,e)}function fv(t,e){return e?.runSource==="MANUAL"?t.output?.mode==="local_transform"||t.processor?.type?Ps.MANUAL_LOCAL_TRANSFORM:t.output?.mode===kt.POST_RESPONSE_API?Ps.MANUAL_POST_RESPONSE_API:Ps.MANUAL_COMPATIBILITY:Ps.MANUAL_POST_RESPONSE_API}function Ka(t,e){try{il(t,e)}catch(r){uv.warn("\u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",{toolId:t,error:r})}}async function gv(t,e){let r=Date.now(),s=t.id,o=`yyt-tool-run-${s}`,n=fv(t,e),a=e?.executionKey||"";Ka(s,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),is("info",`\u6B63\u5728\u624B\u52A8\u6267\u884C ${t.name}`,{sticky:!0,noticeId:o});try{let i=n===Ps.MANUAL_LOCAL_TRANSFORM?await Ba(t,e):await yv(t,e,!0),l=Date.now()-r;if(i?.success){let y=oe(s),p=i?.meta?.writebackDetails||{};return Ka(s,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(y?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:i?.meta?.writebackStatus||Le.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!p.contentCommitted,lastHostCommitApplied:!!p.hostCommitApplied,lastRefreshRequested:!!p.refreshRequested,lastRefreshConfirmed:!!p.refreshConfirmed,lastPreferredCommitMethod:p?.commit?.preferredMethod||"",lastAppliedCommitMethod:p?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(p?.refresh?.requestMethods)?p.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(p?.refresh?.requestMethods)?[...p.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(p?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:p?.refresh?.confirmedBy||""}),A("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`),is("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,{duration:3200,noticeId:o}),{success:!0,duration:l,result:i}}let c=oe(s),d=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",u=i?.meta?.writebackDetails||{};return Ka(s,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:i?.meta?.writebackStatus||Le.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||(n===Ps.MANUAL_COMPATIBILITY?He.COMPATIBILITY_EXECUTE:He.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),A("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),is("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),{success:!1,duration:l,error:d,result:i}}catch(i){let l=Date.now()-r,c=oe(s),d=i?.message||String(i);throw Ka(s,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:Le.NOT_APPLICABLE,lastFailureStage:n===Ps.MANUAL_COMPATIBILITY?He.COMPATIBILITY_EXECUTE:He.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),A("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),is("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),i}}async function Ua(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=oe(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return Or(t,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:Le.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),is("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let r=await us({runSource:"MANUAL"});return gv(e,r)}async function ja(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=oe(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let r=await us({runSource:"MANUAL_PREVIEW"});return It.previewExtraction(e,r)}var uv,Ps,ac,ic=N(()=>{tr();gn();ys();rc();qe();H();uv=I.createScope("ToolTrigger"),Ps={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},ac=null});var uf={};re(uf,{TOOL_CONFIG_PANEL_STYLES:()=>lc,createToolConfigPanel:()=>Vr,default:()=>Tv});function df(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function mv(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function Vr(t={}){let{id:e,toolId:r,postResponseHint:s,previewDialogId:o,previewTitle:n="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:r,renderTo(a){let i=df(a);if(!i)return;if(i._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}let l=()=>this.renderTo(a),c=oe(r);if(!c){i.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let d=m("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),u=[];d.appendChild(hv(c,r,l,s)),d.appendChild(bv(c));let y=xv(c,r,l);u.push(y),d.appendChild(y.el);let p=wv(c,r,l,a,o,n);u.push(p),d.appendChild(p.el),i.innerHTML="",i.appendChild(d),i._yytToolPanelCleanup=()=>{for(let f of u)try{f.destroy()}catch{}delete i._yytToolPanelCleanup}},destroy(a){let i=df(a);if(i?._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}},getStyles(){return lc}}}function hv(t,e,r,s){let o=m("div",{className:"yyt-tool-panel-hero"}),n=m("div",{className:"yyt-tool-panel-hero-row1"});n.appendChild(m("div",{className:"yyt-tool-panel-hero-icon",text:"\u{1F527}"})),n.appendChild(m("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let a=m("div",{className:"yyt-tool-panel-hero-actions"});a.appendChild(ue({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await Ua(e),A("success","\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C")}catch(f){A("error",`\u6267\u884C\u5931\u8D25\uFF1A${f?.message||f}`)}}}).el),a.appendChild(ue({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{A("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"),r()}}).el),n.appendChild(a),o.appendChild(n),t.description&&o.appendChild(m("div",{className:"yyt-tool-panel-hero-desc",text:t.description}));let i=m("div",{className:"yyt-tool-panel-hero-chips"}),c=(t.output?.mode||"follow_ai")==="post_response_api"?"\u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09":"\u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\uFF09";i.appendChild(m("span",{className:"yyt-tool-hero-chip mode",text:c}));let d=t.output?.apiPreset||t.apiPreset||"";d&&i.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`API: ${d}`}));let u=t.extraction?.regexPresetId||"";if(u){let f=we.getPreset(u);i.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${f?f.name:"\u5DF2\u5220\u9664"}`}))}else i.appendChild(m("span",{className:"yyt-tool-hero-chip",text:"\u6B63\u5219: \u672A\u7ED1\u5B9A",style:{opacity:"0.6"}}));let y=t.worldbooks?.presetId||"";if(y){let f=pt.getPreset(y);f&&i.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u4E16\u754C\u4E66: ${f.name}`}))}let p=t.runtime?.lastStatus;if(p){let f=p==="success"?"status-success":p==="failed"?"status-failed":"";i.appendChild(m("span",{className:`yyt-tool-hero-chip ${f}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${p}`}))}return o.appendChild(i),o}function bv(t){let e=m("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},s=(a,i,l="")=>{let c=m("div",{className:"yyt-tool-runtime-stat"});return c.appendChild(m("span",{className:"yyt-tool-runtime-stat-label",text:a})),c.appendChild(m("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),c},o=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":r.lastStatus==="idle"?"\u5F85\u547D":r.lastStatus||"\u5F85\u547D",n=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(s("\u72B6\u6001",o,n)),e.appendChild(s("\u6700\u8FD1\u8FD0\u884C",mv(r.lastRunAt),"muted")),e.appendChild(s("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(s("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function xv(t,e,r){let s=m("div",{style:{display:"flex",flexDirection:"column"}});s.appendChild(hn({label:"\u8F93\u51FA\u6A21\u5F0F",hint:"\u51B3\u5B9A\u6267\u884C\u8DEF\u5F84 + \u81EA\u52A8/\u624B\u52A8",control:Ve({value:t.output?.mode||"follow_ai",options:[{value:"follow_ai",label:"follow_ai \u2014 \u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\u89E6\u53D1\uFF09"},{value:"post_response_api",label:"post_response_api \u2014 \u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09"}],onChange:l=>{let c=oe(e)||{};Ae(e,{...c,output:{...c.output||{},mode:l,enabled:l==="post_response_api"}}),r()}})}));let o=(()=>{try{return Ir()||[]}catch{return[]}})();s.appendChild(hn({label:"API \u9884\u8BBE",hint:"\u989D\u5916 AI \u89E3\u6790\u65F6\u4F7F\u7528",control:Ve({value:t.output?.apiPreset||t.apiPreset||"",options:[{value:"",label:"\u2014\u2014 \u8DDF\u968F\u5F53\u524D\u4E3B API \u2014\u2014"},...o.map(l=>({value:l.name,label:l.name}))],onChange:l=>{let c=oe(e)||{};Ae(e,{...c,apiPreset:l,output:{...c.output||{},apiPreset:l}}),r()}})}));let n=(()=>{try{return pn()||[]}catch{return[]}})();s.appendChild(hn({label:"Ai \u6307\u4EE4\u9884\u8BBE",hint:'\u9644\u52A0\u5728 system/user \u524D\u7684\u6307\u4EE4\uFF1B\u9009"\u65E0"\u5373\u4E0D\u542F\u7528',control:Ve({value:t.bypass?.enabled&&t.bypass?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0 \u2014\u2014"},...n.map(l=>({value:l.id,label:`${l.name}${l.isDefault?" [\u9ED8\u8BA4]":""}`}))],onChange:l=>{let c=oe(e)||{};Ae(e,{...c,bypass:{enabled:!!l,presetId:l||""}}),r()}})}));let a=we.listPresets();s.appendChild(hn({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6",control:Ve({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...a.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let c=oe(e)||{},d={...c.extraction||{},regexPresetId:l};if(l){let u=we.getPreset(l);A("success",`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${u?.name||l}`)}else A("success","\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6");Ae(e,{...c,extraction:d}),r()}})}));let i=pt.listPresets();return s.appendChild(hn({label:"\u4E16\u754C\u4E66\u9884\u8BBE",hint:"\u6CE8\u5165\u5230 prompt \u7684 {{toolWorldbookContent}}",control:Ve({value:t.worldbooks?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4FDD\u7559\u5DE5\u5177\u539F\u6709\u4E16\u754C\u4E66\u8BBE\u7F6E\uFF09 \u2014\u2014"},...i.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let c=oe(e)||{},d={...c.worldbooks||{},presetId:l};if(l){let u=pt.getPreset(l);A("success",`\u5DF2\u7ED1\u5B9A\u4E16\u754C\u4E66\u9884\u8BBE\uFF1A${u?.name||l}`)}else A("success","\u5DF2\u89E3\u7ED1\u4E16\u754C\u4E66\u9884\u8BBE\uFF0C\u5DE5\u5177\u4E0D\u518D\u6CE8\u5165\u4E16\u754C\u4E66\u5185\u5BB9");Ae(e,{...c,worldbooks:d}),r()}})})),Ft({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[s]})}function hn({label:t,hint:e,control:r}){let s=m("div",{className:"yyt-tool-binding-row"}),o=m("div",{className:"yyt-tool-binding-label"});return o.appendChild(m("span",{className:"yyt-tool-binding-label-text",text:t})),e&&o.appendChild(m("span",{className:"yyt-tool-binding-label-hint",text:e})),s.appendChild(o),r.el.classList.add("small"),r.el.style.padding="7px 10px",r.el.style.fontSize="12px",s.appendChild(r.el),s.appendChild(m("div",{className:"yyt-tool-binding-meta"})),s}function wv(t,e,r,s,o,n){let a=m("div",{style:{display:"flex",flexDirection:"column"}});a.appendChild(m("div",{style:{marginBottom:"8px",display:"flex",alignItems:"center",gap:"10px"}},m("div",{style:{flex:"1"}},m("div",{text:"\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:"\u7528 {{macro}} \u5F15\u7528\u4E0A\u4E0B\u6587\u3002\u6A21\u677F\u5185\u5BB9\u4F1A\u4F5C\u4E3A\u53D1\u7ED9\u989D\u5916 AI \u7684 user \u6D88\u606F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})),ue({label:"\u{1F504} \u91CD\u7F6E\u4E3A\u9ED8\u8BA4",size:"small",variant:"ghost",onClick:()=>{if(!window.confirm("\u7528\u5DE5\u5177\u9ED8\u8BA4\u6A21\u677F\u8986\u76D6\u5F53\u524D\u6A21\u677F\uFF1F"))return;let x=ta(e)||{},v=oe(e)||{};Ae(e,{...v,promptTemplate:x.promptTemplate||""}),r()}}).el));let i=m("textarea",{className:"yyt-textarea yyt-code-textarea",attrs:{rows:"10",placeholder:"\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px",lineHeight:"1.7"}});i.value=t.promptTemplate||"",i.addEventListener("change",()=>{let x=oe(e)||{};Ae(e,{...x,promptTemplate:i.value})}),a.appendChild(i),a.appendChild(m("div",{className:"yyt-macro-inline",html:"\u53EF\u7528\u5B8F\uFF1A<code>{{toolPromptMacro}}</code> <code>{{toolContentMacro}}</code> <code>{{toolWorldbookContent}}</code> <code>{{lastAiMessage}}</code> <code>{{recentMessagesText}}</code> <code>{{rawRecentMessagesText}}</code> <code>{{userMessage}}</code> <code>{{toolName}}</code> <code>{{toolId}}</code>"})),a.appendChild(m("hr",{className:"yyt-zone-divider"})),a.appendChild(m("div",{style:{marginBottom:"8px"}},m("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u5E76\u5199\u56DE\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let l=m("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end",marginBottom:"12px"}}),c=m("div",{className:"yyt-form-group",style:{margin:0}});c.appendChild(m("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let d=m("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});d.value=String(Number(t.extraction?.maxMessages)||5),d.addEventListener("change",()=>{let x=oe(e)||{};Ae(e,{...x,extraction:{...x.extraction||{},maxMessages:Math.max(1,parseInt(d.value,10)||5)}})}),c.appendChild(d),l.appendChild(c);let u=m("div",{className:"yyt-form-group",style:{margin:0}});u.appendChild(m("label",{html:"&nbsp;",style:{fontSize:"12px"}})),u.appendChild(ue({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let x=await ja(e);vv(s,x,o,n)}catch(x){A("error",`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${x?.message||x}`)}}}).el),l.appendChild(u),a.appendChild(l);let y=m("div",{className:"yyt-form-group",style:{margin:0}});y.appendChild(m("label",{html:'\u5199\u56DE\u6807\u7B7E <span style="font-size:10px;color:var(--yyt-text-muted);font-weight:500;">\uFF08\u591A\u6807\u7B7E\u63D0\u53D6\u65F6\u6307\u5B9A\u552F\u4E00\u5199\u56DE\u6807\u7B7E\uFF1B\u7559\u7A7A\u5219\u63D0\u53D6\u9996\u4E2A\uFF09</span>',style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let p=`yyt-writeback-dl-${e}-${Math.random().toString(36).slice(2,6)}`,f=m("datalist",{attrs:{id:p}}),g=(()=>{let x=new Set,v=[];function T(M){if(M)for(let _ of M.rules||[]){if(_?.enabled===!1||_?.type!=="include")continue;let C=String(_.value||"").trim();!C||x.has(C)||(x.add(C),v.push(C))}}let L=t.extraction?.regexPresetId;if(L)T(we.getPreset(L));else for(let M of we.listPresets())T(M);return v})();for(let x of g)f.appendChild(m("option",{attrs:{value:x}}));let h=m("input",{className:"yyt-input",attrs:{type:"text",placeholder:"\u5982 status / content\uFF08\u6765\u81EA\u6B63\u5219\u9884\u8BBE\u7684 include \u6807\u7B7E\uFF09",list:p,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});return h.value=t.extraction?.writebackTag||"",h.addEventListener("change",()=>{let x=oe(e)||{};Ae(e,{...x,extraction:{...x.extraction||{},writebackTag:h.value.trim()}})}),y.appendChild(h),y.appendChild(f),a.appendChild(y),Ft({heading:"\u914D\u7F6E",icon:"\u2699",content:[a]})}function vv(t,e,r,s){if(!Q()||!ge(t))return;let n=`${as}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
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
    `:"";t.append(Oo({id:n,title:s,width:"720px",wide:!0,body:`
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
    `})),Bo(t,n,{onSave:l=>l()}),t.find(`#${n}-save`).text("\u5173\u95ED"),t.find(`#${n}-cancel`).remove()}function qr(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var r1,lc,Tv,Eo=N(()=>{yr();qe();qe();tr();Lo();vo();ic();H();zr();Fs();r1=I.createScope("ToolConfigPanel"),lc=`
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
`;Tv=Vr});var yf={};re(yf,{SummaryToolPanel:()=>pf,default:()=>Sv});var pf,Sv,ff=N(()=>{Eo();pf=Vr({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"}),Sv=pf});var mf={};re(mf,{StatusBlockPanel:()=>gf,default:()=>_v});var gf,_v,hf=N(()=>{Eo();gf=Vr({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"}),_v=gf});var xf={};re(xf,{YouyouReviewPanel:()=>bf,default:()=>Ev});var bf,Ev,wf=N(()=>{Eo();bf=Vr({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"}),Ev=bf});function vf(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function Av(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function Jr(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Fa(t={}){let{id:e,toolId:r,previewDialogId:s,previewTitle:o="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:n=[],processorOptions:a=[],heroHint:i=""}=t;return{id:e,toolId:r,renderTo(l){let c=vf(l);if(!c)return;if(c._yytLocalToolPanelCleanup)try{c._yytLocalToolPanelCleanup()}catch{}let d=()=>this.renderTo(l),u=oe(r);if(!u){c.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let y=m("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),p=[];y.appendChild(Cv(u,r,d,n,i)),y.appendChild(kv(u));let f=Iv(u,r,d);p.push(f),y.appendChild(f.el);let g=Rv(u,r,d,l,n,a,s,o);p.push(g),y.appendChild(g.el),c.innerHTML="",c.appendChild(y),c._yytLocalToolPanelCleanup=()=>{for(let h of p)try{h.destroy()}catch{}delete c._yytLocalToolPanelCleanup}},destroy(l){let c=vf(l);if(c?._yytLocalToolPanelCleanup)try{c._yytLocalToolPanelCleanup()}catch{}},getStyles(){return""}}}function Cv(t,e,r,s,o){let n=m("div",{className:"yyt-tool-panel-hero"}),a=m("div",{className:"yyt-tool-panel-hero-row1"});a.appendChild(m("div",{className:"yyt-tool-panel-hero-icon",text:"\u2699"})),a.appendChild(m("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let i=m("div",{className:"yyt-tool-panel-hero-actions"});i.appendChild(ue({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await Ua(e),A("success","\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C")}catch(g){A("error",`\u6267\u884C\u5931\u8D25\uFF1A${g?.message||g}`)}}}).el),i.appendChild(ue({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{A("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"),r()}}).el),a.appendChild(i),n.appendChild(a),t.description&&n.appendChild(m("div",{className:"yyt-tool-panel-hero-desc",text:t.description})),o&&n.appendChild(m("div",{className:"yyt-tool-panel-hero-desc",text:o}));let l=m("div",{className:"yyt-tool-panel-hero-chips"}),c=t.output?.autoTrigger!==!1;l.appendChild(m("span",{className:"yyt-tool-hero-chip mode",text:`\u672C\u5730\u811A\u672C\uFF08${c?"\u81EA\u52A8":"\u624B\u52A8"}\uFF09`}));let d=t.processor?.direction||s[0]?.key||"",u=s.find(g=>g.key===d)?.label||d;u&&l.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u65B9\u5411: ${u}`}));let y=t.output?.overwrite!==!1;l.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u5199\u56DE: ${y?"\u8986\u76D6":"\u8FFD\u52A0"}`}));let p=t.extraction?.regexPresetId||"";if(p){let g=we.getPreset(p);g&&l.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${g.name}`}))}let f=t.runtime?.lastStatus;if(f){let g=f==="success"?"status-success":f==="failed"?"status-failed":"";l.appendChild(m("span",{className:`yyt-tool-hero-chip ${g}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${f}`}))}return n.appendChild(l),n}function kv(t){let e=m("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},s=(a,i,l="")=>{let c=m("div",{className:"yyt-tool-runtime-stat"});return c.appendChild(m("span",{className:"yyt-tool-runtime-stat-label",text:a})),c.appendChild(m("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),c},o=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":"\u5F85\u547D",n=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(s("\u72B6\u6001",o,n)),e.appendChild(s("\u6700\u8FD1\u8FD0\u884C",Av(r.lastRunAt),"muted")),e.appendChild(s("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(s("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function Iv(t,e,r){let s=m("div",{style:{display:"flex",flexDirection:"column"}}),o=we.listPresets();return s.appendChild(cc({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C",control:Ve({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...o.map(n=>({value:n.id,label:n.name}))],onChange:n=>{let a=oe(e)||{},i={...a.extraction||{},regexPresetId:n};if(n){let l=we.getPreset(n);A("success",`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${l?.name||n}`)}else A("success","\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6");Ae(e,{...a,extraction:i}),r()}})})),s.appendChild(cc({label:"\u5199\u56DE\u65B9\u5F0F",hint:"\u5904\u7406\u540E\u7684\u7ED3\u679C\u5982\u4F55\u56DE\u5199\u5230 AI \u6D88\u606F",control:Ve({value:t.output?.overwrite!==!1?"replace":"append",options:[{value:"replace",label:"\u8986\u76D6\u539F\u5DE5\u5177\u5757"},{value:"append",label:"\u8FFD\u52A0\u5230\u672B\u5C3E"}],onChange:n=>{let a=oe(e)||{};Ae(e,{...a,output:{...a.output||{},overwrite:n==="replace",enabled:!0,mode:"local_transform"}}),r()}})})),s.appendChild(cc({label:"\u81EA\u52A8\u89E6\u53D1",hint:"\u6536\u5230 AI \u56DE\u590D\u540E\u662F\u5426\u81EA\u52A8\u6267\u884C\u6B64\u811A\u672C",control:Ve({value:t.output?.autoTrigger!==!1?"auto":"manual",options:[{value:"auto",label:"\u81EA\u52A8\uFF08\u6536\u5230\u56DE\u590D\u5373\u6267\u884C\uFF09"},{value:"manual",label:"\u624B\u52A8\uFF08\u4EC5\u70B9\u51FB\u6309\u94AE\u6267\u884C\uFF09"}],onChange:n=>{let a=oe(e)||{};Ae(e,{...a,output:{...a.output||{},autoTrigger:n==="auto",enabled:!0,mode:"local_transform"}}),r()}})})),Ft({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[s]})}function cc({label:t,hint:e,control:r}){let s=m("div",{className:"yyt-tool-binding-row"}),o=m("div",{className:"yyt-tool-binding-label"});return o.appendChild(m("span",{className:"yyt-tool-binding-label-text",text:t})),e&&o.appendChild(m("span",{className:"yyt-tool-binding-label-hint",text:e})),s.appendChild(o),r.el.style.padding="7px 10px",r.el.style.fontSize="12px",s.appendChild(r.el),s.appendChild(m("div",{className:"yyt-tool-binding-meta"})),s}function Rv(t,e,r,s,o,n,a,i){let l=m("div",{style:{display:"flex",flexDirection:"column"}});l.appendChild(m("div",{style:{marginBottom:"10px"}},m("div",{text:"\u6267\u884C\u65B9\u5411",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:"\u51B3\u5B9A\u672C\u5730\u811A\u672C\u8FD0\u884C\u54EA\u4E2A\u53D8\u6362\u8DEF\u5F84\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let c=t.processor?.direction||o[0]?.key||"",d=Ve({value:c,options:o.map(g=>({value:g.key,label:g.description?`${g.label} \u2014 ${g.description}`:g.label})),onChange:g=>{let h=oe(e)||{};Ae(e,{...h,processor:{...h.processor||{},direction:g}}),r()}});if(d.el.style.padding="7px 10px",d.el.style.fontSize="12px",l.appendChild(d.el),l.appendChild(m("hr",{className:"yyt-zone-divider"})),n.length>0){l.appendChild(m("div",{style:{marginBottom:"10px"}},m("div",{text:"\u5904\u7406\u9879",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:"\u52FE\u9009\u8981\u5305\u542B\u5728\u672C\u6B21\u53D8\u6362\u4E2D\u7684\u9879\u76EE\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let g=m("div",{style:{display:"flex",flexDirection:"column"}}),h=t.processor?.options||{};for(let x of n){let v=vt({label:x.label,hint:x.description||"",checked:h[x.key]===!0,onChange:T=>{let L=oe(e)||{};Ae(e,{...L,processor:{...L.processor||{},options:{...L.processor?.options||{},[x.key]:T}}})}});g.appendChild(v.el)}l.appendChild(g),l.appendChild(m("hr",{className:"yyt-zone-divider"}))}l.appendChild(m("div",{style:{marginBottom:"10px"}},m("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let u=m("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end"}}),y=m("div",{className:"yyt-form-group",style:{margin:0}});y.appendChild(m("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let p=m("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});p.value=String(Number(t.extraction?.maxMessages)||5),p.addEventListener("change",()=>{let g=oe(e)||{};Ae(e,{...g,extraction:{...g.extraction||{},maxMessages:Math.max(1,parseInt(p.value,10)||5)}})}),y.appendChild(p),u.appendChild(y);let f=m("div",{className:"yyt-form-group",style:{margin:0}});return f.appendChild(m("label",{html:"&nbsp;",style:{fontSize:"12px"}})),f.appendChild(ue({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let g=await ja(e);Mv(s,g,a,i)}catch(g){A("error",`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${g?.message||g}`)}}}).el),u.appendChild(f),l.appendChild(u),Ft({heading:"\u914D\u7F6E",icon:"\u2699",content:[l]})}function Mv(t,e,r,s){if(!Q()||!ge(t))return;let n=`${as}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
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
    `:"";t.append(Oo({id:n,title:s,width:"720px",wide:!0,body:`
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
    `})),Bo(t,n,{onSave:l=>l()}),t.find(`#${n}-save`).text("\u5173\u95ED"),t.find(`#${n}-cancel`).remove()}var g1,dc=N(()=>{yr();qe();tr();ic();H();Eo();zr();g1=I.createScope("LocalTransformToolPanel")});var Sf={};re(Sf,{EscapeTransformToolPanel:()=>Tf,default:()=>Pv});var Tf,Pv,_f=N(()=>{dc();Tf=Fa({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]}),Pv=Tf});var Af={};re(Af,{PunctuationTransformToolPanel:()=>Ef,default:()=>Nv});var Ef,Nv,Cf=N(()=>{dc();Ef=Fa({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]}),Nv=Ef});var If={};re(If,{BypassPanel:()=>kf,default:()=>Dv});var kf,Dv,Rf=N(()=>{Ge();vo();qe();kf={id:"bypassPanel",_getActivePresetId(t){return t.find(".yyt-bypass-editor-content").data("presetId")||null},render(t){let e=le.getPresetList(),r=le.getDefaultPresetId();return`
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
      `;let e=le.getDefaultPresetId()===t.id,r=Sr&&Sr[t.id];return`
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
    `},bindEvents(t,e){let r=Q();!r||!ge(t)||(t.off(".yytBypass"),this._bindPresetListEvents(t,r),this._bindEditorEvents(t,r),this._bindFileEvents(t,r),Nt(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_bindPresetListEvents(t,e){t.on("click.yytBypass",".yyt-bypass-preset-item",r=>{if(e(r.target).closest(".yyt-bypass-quick-delete").length)return;let s=e(r.currentTarget).data("presetId");this._selectPreset(t,e,s)}),t.on("click.yytBypass",".yyt-bypass-quick-delete",async r=>{r.stopPropagation();let s=e(r.currentTarget).data("presetId");if(!s||!await pr("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let n=le.deletePreset(s);n.success?(t.find(".yyt-bypass-editor-content").data("presetId")===s&&t.find(".yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),A("success","\u9884\u8BBE\u5DF2\u5220\u9664")):A("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.on("click.yytBypass","#yyt-bypass-add",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click.yytBypass","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click.yytBypass","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click.yytBypass",".yyt-bypass-move-up",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message"),o=s.prev(".yyt-bypass-message");o.length&&(o.before(s),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-move-down",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message"),o=s.next(".yyt-bypass-message");o.length&&(o.after(s),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-insert-message",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message");this._insertMessageAfter(t,e,s)}),t.on("click.yytBypass",".yyt-bypass-delete-message",r=>{e(r.currentTarget).closest(".yyt-bypass-message").remove(),this._refreshMessageIndices(t,e)}),t.on("change.yytBypass",".yyt-bypass-message-enabled",r=>{e(r.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(r.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.on("click.yytBypass","#yyt-bypass-import",()=>{t.find("#yyt-bypass-import-file").click()}),t.on("change.yytBypass","#yyt-bypass-import-file",async r=>{let s=r.target.files[0];if(s){try{let o=await Ko(s),n=le.importPresets(o);A(n.success?"success":"error",n.message),n.success&&this.renderTo(t)}catch(o){A("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(r.target).val("")}}),t.on("click.yytBypass","#yyt-bypass-export",()=>{try{let r=le.exportPresets();zo(r,`bypass_presets_${Date.now()}.json`),A("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(r){A("error",`\u5BFC\u51FA\u5931\u8D25: ${r.message}`)}})},_selectPreset(t,e,r){let s=le.getPreset(r);s&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${r}"]`).addClass("yyt-active"),t.find(".yyt-bypass-editor").html(this._renderEditor(s)),Nt(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_createNewPreset(t,e){let r=`bypass_${Date.now()}`,s=le.createPreset({id:r,name:"\u65B0 Ai \u6307\u4EE4\u9884\u8BBE",description:"",messages:[]});s.success?(this.renderTo(t),this._selectPreset(t,e,r),A("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):A("error",s?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content"),s=r.data("presetId");if(!s)return;let o=r.find(".yyt-bypass-name-input").val().trim(),n=r.find(".yyt-bypass-description-input").val().trim();if(!o){A("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),r.find(".yyt-bypass-name-input").trigger("focus").trigger("select");return}let a=[];r.find(".yyt-bypass-message").each(function(){let l=e(this);a.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:String(l.data("deletable"))!=="false"})});let i=le.updatePreset(s,{name:o,description:n,messages:a});i.success?(A("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):A("error",i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},async _deleteCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s||!await pr("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let n=le.deletePreset(s);n.success?(this.renderTo(t),A("success","\u9884\u8BBE\u5DF2\u5220\u9664")):A("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s)return;let o=`bypass_${Date.now()}`,n=le.duplicatePreset(s,o);n.success?(this.renderTo(t),this._selectPreset(t,e,o),A("success","\u9884\u8BBE\u5DF2\u590D\u5236")):A("error",n?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s)return;le.setDefaultPresetId(s),this._refreshPresetList(t,e);let o=le.getPreset(s);o&&t.find(".yyt-bypass-editor").html(this._renderEditor(o)),A("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE")},_addMessage(t,e){let r=t.find(".yyt-bypass-messages"),s={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},o=r.find(".yyt-bypass-message").length;r.append(this._renderMessageItem(s,o))},_insertMessageAfter(t,e,r){let s=t.find(".yyt-bypass-messages"),o={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},n=this._renderMessageItem(o,0),a=e(n);r.after(a),this._refreshMessageIndices(t,e)},_refreshMessageIndices(t,e){t.find(".yyt-bypass-message").each(function(r){e(this).attr("data-message-index",r)})},_refreshPresetList(t,e){let r=le.getPresetList(),s=le.getDefaultPresetId(),o=this._getActivePresetId(t);t.find(".yyt-bypass-preset-list").html(r.map(n=>this._renderPresetItem(n,n.id===s)).join("")),o&&t.find(`.yyt-bypass-preset-item[data-preset-id="${o}"]`).addClass("yyt-active")},destroy(t){!Q()||!ge(t)||(dt(t,"yytBypassSelect"),t.off(".yytBypass"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},Dv=kf});var pc={};re(pc,{SettingsPanel:()=>$f,applyTheme:()=>Df,applyUiPreferences:()=>uc,default:()=>Lv});function bn({id:t,checked:e=!1,title:r="",hint:s=""}){return`
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
  `}function Pf(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function xn(){return Pf()?.document||document}function Nf(t=xn()){return t?.documentElement||document.documentElement}function Df(t,e=xn()){let r=Nf(e),s={...$v,...Mf[t]||Mf["dark-blue"]};Object.entries(s).forEach(([o,n])=>{r.style.setProperty(o,n)}),r.setAttribute("data-yyt-theme",t)}function uc(t={},e=xn()){let r=Nf(e),{theme:s="dark-blue",compactMode:o=!1,animationEnabled:n=!0}=t||{};Df(s,e),r.classList.toggle("yyt-compact-mode",!!o),r.classList.toggle("yyt-no-animation",!n)}var $v,Mf,$f,Lv,yc=N(()=>{Ge();fn();H();Da();qe();$v={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-on-accent":"#0a0d13","--yyt-bg-base":"#0a0d13","--yyt-surface":"#0f1219","--yyt-surface-2":"#151a24","--yyt-surface-3":"#1c2231","--yyt-surface-hover":"#1c2231","--yyt-surface-active":"#232b3e","--yyt-border":"rgba(255, 255, 255, 0.06)","--yyt-border-soft":"rgba(255, 255, 255, 0.04)","--yyt-border-strong":"rgba(255, 255, 255, 0.12)","--yyt-text":"rgba(255, 255, 255, 0.92)","--yyt-text-secondary":"rgba(255, 255, 255, 0.55)","--yyt-text-muted":"rgba(255, 255, 255, 0.35)","--yyt-focus-ring":"0 0 0 2px rgba(123, 183, 255, 1), 0 0 0 4px rgba(123, 183, 255, 0.15)","--yyt-control-bg":"#0f1219","--yyt-control-bg-hover":"#151a24","--yyt-control-bg-active":"#1c2231","--yyt-control-bg-strong":"#151a24","--yyt-control-bg-focus":"#151a24","--yyt-control-border":"rgba(255, 255, 255, 0.08)","--yyt-control-border-hover":"rgba(255, 255, 255, 0.14)","--yyt-control-border-focus":"rgba(123, 183, 255, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#151a24","--yyt-select-option-bg":"#1c2231","--yyt-select-option-hover-bg":"#232b3e","--yyt-select-option-selected-bg":"#2a3450","--yyt-select-option-border":"rgba(123, 183, 255, 0.15)","--yyt-select-option-selected-border":"rgba(123, 183, 255, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(0, 0, 0, 0.4)","--yyt-select-arrow-color":"rgba(255, 255, 255, 0.4)"},Mf={"dark-blue":{"--yyt-on-accent":"#0a0d13"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0d0a14","--yyt-surface":"#12101c","--yyt-surface-2":"#1a1726","--yyt-surface-3":"#221e32","--yyt-surface-hover":"#221e32","--yyt-surface-active":"#2a2540","--yyt-on-accent":"#0d0a14","--yyt-control-bg":"#12101c","--yyt-control-bg-hover":"#1a1726","--yyt-control-bg-active":"#221e32","--yyt-control-bg-strong":"#1a1726","--yyt-control-bg-focus":"#1a1726","--yyt-control-border-focus":"rgba(167, 139, 250, 0.5)","--yyt-select-surface":"#1a1726","--yyt-select-option-bg":"#221e32","--yyt-select-option-hover-bg":"#2a2540","--yyt-select-option-selected-bg":"#332d50","--yyt-select-option-border":"rgba(167, 139, 250, 0.15)","--yyt-select-option-selected-border":"rgba(167, 139, 250, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(167, 139, 250, 1), 0 0 0 4px rgba(167, 139, 250, 0.15)"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0a120d","--yyt-surface":"#0f1912","--yyt-surface-2":"#151f1a","--yyt-surface-3":"#1c2824","--yyt-surface-hover":"#1c2824","--yyt-surface-active":"#233530","--yyt-on-accent":"#0a120d","--yyt-control-bg":"#0f1912","--yyt-control-bg-hover":"#151f1a","--yyt-control-bg-active":"#1c2824","--yyt-control-bg-strong":"#151f1a","--yyt-control-bg-focus":"#151f1a","--yyt-control-border-focus":"rgba(74, 222, 128, 0.5)","--yyt-select-surface":"#151f1a","--yyt-select-option-bg":"#1c2824","--yyt-select-option-hover-bg":"#233530","--yyt-select-option-selected-bg":"#2a4038","--yyt-select-option-border":"rgba(74, 222, 128, 0.15)","--yyt-select-option-selected-border":"rgba(74, 222, 128, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(74, 222, 128, 1), 0 0 0 4px rgba(74, 222, 128, 0.15)"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f5f7fa","--yyt-surface":"#edf0f5","--yyt-surface-2":"#e4e8ef","--yyt-surface-3":"#dbe0e9","--yyt-surface-hover":"#dbe0e9","--yyt-surface-active":"#d1d7e2","--yyt-text":"rgba(15, 23, 42, 0.92)","--yyt-text-secondary":"rgba(15, 23, 42, 0.55)","--yyt-text-muted":"rgba(15, 23, 42, 0.35)","--yyt-border":"rgba(15, 23, 42, 0.08)","--yyt-border-soft":"rgba(15, 23, 42, 0.04)","--yyt-border-strong":"rgba(15, 23, 42, 0.14)","--yyt-focus-ring":"0 0 0 2px rgba(59, 130, 246, 1), 0 0 0 4px rgba(59, 130, 246, 0.12)","--yyt-on-accent":"#ffffff","--yyt-control-bg":"#edf0f5","--yyt-control-bg-hover":"#e4e8ef","--yyt-control-bg-active":"#dbe0e9","--yyt-control-bg-strong":"#e4e8ef","--yyt-control-bg-focus":"#e4e8ef","--yyt-control-border":"rgba(15, 23, 42, 0.1)","--yyt-control-border-hover":"rgba(15, 23, 42, 0.18)","--yyt-control-border-focus":"rgba(59, 130, 246, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#e4e8ef","--yyt-select-option-bg":"#edf0f5","--yyt-select-option-hover-bg":"#dbe0e9","--yyt-select-option-selected-bg":"#dbeafe","--yyt-select-option-border":"rgba(59, 130, 246, 0.12)","--yyt-select-option-selected-border":"rgba(59, 130, 246, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(15, 23, 42, 0.1)","--yyt-select-arrow-color":"rgba(15, 23, 42, 0.4)"}};$f={id:"settingsPanel",render(){let t=Bt.getSettings(),e=t.debug?.enableDebugLog===!0,r=this._getAutomationRuntime();return`
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
            ${bn({id:"yyt-setting-enableDebugLog",checked:t.enableDebugLog,title:"\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7",hint:"\u5F00\u542F\u540E Logger \u9762\u677F\u5C06\u8BB0\u5F55 DEBUG \u7EA7\u522B\u65E5\u5FD7\uFF0C\u5173\u95ED\u4EC5\u8BB0\u5F55 INFO \u53CA\u4EE5\u4E0A"})}
          </div>
          <div class="yyt-settings-hint" style="margin-top: 8px;">
            <i class="fa-solid fa-terminal"></i> \u5728\u300C\u65E5\u5FD7\u300D\u9762\u677F\u4E2D\u67E5\u770B\u3001\u641C\u7D22\u548C\u5BFC\u51FA\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-clock-rotate-left"></i></span>\u6267\u884C\u8BB0\u5F55</div>
          <div class="yyt-form-group">
            ${bn({id:"yyt-setting-saveExecutionHistory",checked:t.saveExecutionHistory,title:"\u4FDD\u5B58\u6267\u884C\u5386\u53F2",hint:"\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5"})}
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-eye"></i></span>UI \u663E\u793A</div>
          <div class="yyt-form-group">
            ${bn({id:"yyt-setting-showRuntimeBadge",checked:t.showRuntimeBadge,title:"\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0",hint:"\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668"})}
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
            ${bn({id:"yyt-setting-compactMode",checked:t.compactMode,title:"\u7D27\u51D1\u6A21\u5F0F",hint:"\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9"})}
          </div>

          <div class="yyt-form-group">
            ${bn({id:"yyt-setting-animationEnabled",checked:t.animationEnabled,title:"\u542F\u7528\u52A8\u753B\u6548\u679C",hint:"\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B"})}
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
      `).join("")},bindEvents(t){let e=Q();if(!e||!ge(t))return;let r=this;t.off(".yytSettings"),t.on("click.yytSettings",".yyt-settings-tab",o=>{let n=e(o.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),e(o.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${n}"]`).addClass("yyt-active")}),t.on("click.yytSettings","#yyt-settings-save",()=>{r._saveSettings(t)}),t.on("click.yytSettings","#yyt-settings-reset",async()=>{await pr("\u91CD\u7F6E\u8BBE\u7F6E","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F",{danger:!0})&&(Bt.resetSettings(),uc(yn.ui,xn()),r.renderTo(t),A("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}),Nt(t,{namespace:"yytSettingsSelect",selectors:["#yyt-setting-queueStrategy","#yyt-setting-theme"]});let s=Bt.getDebugSettings();I.setLevel(s.enableDebugLog?de.DEBUG:de.INFO)},_saveSettings(t){let e=Q(),r=[{id:"yyt-setting-maxConcurrent",min:1,max:10,label:"\u6700\u5927\u5E76\u53D1\u6570"},{id:"yyt-setting-maxRetries",min:0,max:10,label:"\u6700\u5927\u91CD\u8BD5\u6B21\u6570"},{id:"yyt-setting-retryDelayMs",min:1e3,max:6e4,label:"\u91CD\u8BD5\u95F4\u9694"},{id:"yyt-setting-requestTimeoutMs",min:1e4,max:3e5,label:"\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4"},{id:"yyt-setting-automationSettleMs",min:0,max:1e4,label:"\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4"},{id:"yyt-setting-automationCooldownMs",min:0,max:6e4,label:"\u81EA\u52A8\u5316\u51B7\u5374\u65F6\u95F4"}];for(let o of r){let n=t.find(`#${o.id}`),a=n.val(),i=parseInt(a,10);if(isNaN(i)||i<o.min||i>o.max){A("warning",`${o.label} \u987B\u5728 ${o.min} ~ ${o.max} \u4E4B\u95F4`),n.trigger("focus").trigger("select");return}}let s={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val(),10)||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val(),10)||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val(),10)||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val(),10)||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},automation:{settleMs:parseInt(t.find("#yyt-setting-automationSettleMs").val(),10)||1200,cooldownMs:parseInt(t.find("#yyt-setting-automationCooldownMs").val(),10)||5e3,maxConcurrentSlots:Bt.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};Bt.saveSettings(s),I.setLevel(s.debug.enableDebugLog?de.DEBUG:de.INFO),uc(s.ui,xn()),A("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},_getAutomationRuntime(){try{return Pf()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},destroy(t){!Q()||!ge(t)||(dt(t,"yytSettingsSelect"),t.off(".yytSettings"))},getStyles(){return`
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
    `},renderTo(t){t.html(this.render({})),this.bindEvents(t,{})}},Lv=$f});function Ov(t={},e=-1){return[t?.sourceId,t?.messageId,t?.message_id,t?.id,t?.mid,t?.mesid,t?.mes_id,t?.chat_index,t?.index,e].map(r=>xe(r))}function Bv(t=[],e=""){let r=xe(e);if(!r||!Array.isArray(t))return-1;for(let s=t.length-1;s>=0;s-=1){let o=t[s];if(Ov(o,s).includes(r))return s}return-1}function wn(t={},e={}){let r=xe(t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId);if(!r)return null;let s=yl({resolvedAt:Date.now(),runSource:e.runSource||t?.runSource||et.MANUAL,traceId:t?.traceId||"",chatId:t?.chatId||"",sourceMessageId:r,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId||"swipe:current",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",assistantContentFingerprint:t?.assistantContentFingerprint||"",assistantBaseFingerprint:t?.assistantBaseFingerprint||"",assistantText:t?.lastAiMessage||"",assistantBaseText:t?.assistantBaseText||"",targetMessageIndex:Bv(t?.chatMessages||t?.chatHistory||[],r)});return!s.slotBindingKey||!s.slotRevisionKey?null:s}async function fc({runSource:t=et.MANUAL}={}){let e=await us({runSource:t});return wn(e,{runSource:t})}async function zv({messageId:t,swipeId:e="",runSource:r=et.AUTO}={}){let s=await ps({messageId:t,swipeId:e,runSource:r});return wn(s,{runSource:r})}async function Lf(t=null,e={}){let r=t||null;if(typeof e.resolveTarget=="function")return await e.resolveTarget(r);let s=xe(e.runSource||r?.runSource)||et.MANUAL,o=xe(e.messageId||r?.sourceMessageId),n=xe(e.swipeId||r?.sourceSwipeId||r?.effectiveSwipeId);return e.useMessageTarget===!0||s===et.AUTO?o?zv({messageId:o,swipeId:n,runSource:s}):null:fc({runSource:s})}function Of(t,e){let r=t||null,s=e||null;return!r||!s?{valid:!1,reason:"missing_target_snapshot"}:xe(r.sourceMessageId)!==xe(s.sourceMessageId)?{valid:!1,reason:"source_message_changed"}:xe(r.sourceSwipeId||r.effectiveSwipeId)!==xe(s.sourceSwipeId||s.effectiveSwipeId)?{valid:!1,reason:"source_swipe_changed"}:xe(r.slotRevisionKey)!==xe(s.slotRevisionKey)?{valid:!1,reason:"slot_revision_changed"}:{valid:!0,reason:"ok"}}var Wa=N(()=>{ys();Ke()});function _r(t,e=""){return t==null?e:String(t).trim()||e}function Kv(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function Uv(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function Bf(t,e){if(!t)return null;let r=t[ws];if(!r)return null;let s=Ce(e);return Uv(r)?s===Lt?r:null:r[s]||null}function vn({loadMode:t=vs.EMPTY,mergeBaseOnly:e=!1,state:r=null,sourceKind:s=_t.EMPTY,resolvedFromMessageId:o="",resolvedFromRevisionKey:n=""}={}){let a=xr(r)||null;return{loadMode:t,mergeBaseOnly:e,state:a,sourceKind:s,resolvedFromMessageId:_r(o,a?.sourceMessageId||""),resolvedFromRevisionKey:_r(n,a?.slotRevisionKey||"")}}function gc(t,e={}){let r=xr(t);return r?xr({...r,meta:{...r.meta||{},...e||{}}}):null}function zf({runtime:t,targetSnapshot:e,currentMessageIndex:r=-1,templateTables:s=[],isolationKey:o}={}){let n=Array.isArray(t?.chat)?t.chat:[],a=_r(e?.slotRevisionKey,""),i=_r(e?.slotBindingKey,""),l=Ce(o===void 0?"":o);if(r>=0&&r<n.length){let c=Bf(n[r],l),d=xr(c);if(d&&_r(d.slotRevisionKey,"")===a)return vn({loadMode:vs.EXACT,mergeBaseOnly:!1,state:gc(d,{sourceKind:_t.EXACT,isolationKey:l,resolvedFromMessageId:d.sourceMessageId,resolvedFromRevisionKey:d.slotRevisionKey}),sourceKind:_t.EXACT,resolvedFromMessageId:d.sourceMessageId,resolvedFromRevisionKey:d.slotRevisionKey});if(d&&_r(d.slotBindingKey,"")===i){let u=gc({...d,slotRevisionKey:a||d.slotRevisionKey,sourceSwipeId:_r(e?.sourceSwipeId||e?.effectiveSwipeId,d.sourceSwipeId),meta:{...d.meta||{},sourceKind:_t.BINDING,mergeBaseOnly:!0,fallbackFromBinding:!0,isolationKey:l,fallbackFromRevisionKey:_r(d.slotRevisionKey,""),requestedRevisionKey:a,resolvedFromMessageId:d.sourceMessageId,resolvedFromRevisionKey:d.slotRevisionKey}});return vn({loadMode:vs.BINDING_FALLBACK,mergeBaseOnly:!0,state:u,sourceKind:_t.BINDING,resolvedFromMessageId:d.sourceMessageId,resolvedFromRevisionKey:d.slotRevisionKey})}}if(r>0)for(let c=r-1;c>=0;c-=1){let d=n[c];if(!Kv(d))continue;let u=Bf(d,l),y=xr(u);if(!y||!Array.isArray(y.tables)||y.tables.length===0)continue;let p=gc({...y,slotBindingKey:i||y.slotBindingKey,slotRevisionKey:a||y.slotRevisionKey,sourceSwipeId:_r(e?.sourceSwipeId||e?.effectiveSwipeId,y.sourceSwipeId),meta:{...y.meta||{},sourceKind:_t.HISTORY,mergeBaseOnly:!0,reconstructedFromHistory:!0,isolationKey:l,resolvedFromMessageId:y.sourceMessageId,resolvedFromRevisionKey:y.slotRevisionKey}});return vn({loadMode:vs.HISTORY,mergeBaseOnly:!0,state:p,sourceKind:_t.HISTORY,resolvedFromMessageId:y.sourceMessageId,resolvedFromRevisionKey:y.slotRevisionKey})}return Array.isArray(s)&&s.length>0?vn({loadMode:vs.TEMPLATE,mergeBaseOnly:!1,state:en(e,{tables:ne(s),meta:{fromTemplate:!0,isolationKey:l,sourceKind:_t.TEMPLATE,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:_t.TEMPLATE}):vn({loadMode:vs.EMPTY,mergeBaseOnly:!1,state:en(e,{meta:{isolationKey:l,sourceKind:_t.EMPTY,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:_t.EMPTY})}var Kf=N(()=>{Ke()});function Uf(){return mc||(mc=I.createScope("TableStateMirror")),mc}async function jv(t,e,r){try{await Ue(),await wa({chatId:t?.chatId,messageId:t?.sourceMessageId,swipeId:t?.sourceSwipeId||t?.effectiveSwipeId,isolationKey:e},Array.isArray(r)?r:[]),Uf().info("slot \u5DF2\u955C\u50CF\u5230 SQL",{chatId:t?.chatId,messageId:t?.sourceMessageId,tableCount:r?.length||0})}catch(s){Uf().warn("SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:s?.message||String(s)})}}function jf(t){return t==null?"":String(t).trim()}function Fv(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function bc(){try{let t=Fv(),e=t?.SillyTavern||null,r=e?.getContext?.()||null,s=Array.isArray(r?.chat)?r.chat:[],o=Array.isArray(e?.chat)?e.chat:[],n=s.length?s:o;return{topWindow:t,api:e,context:r,chat:n,contextChat:s,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}function Wv(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function Hv(t=[],e=""){let r=jf(e);if(!Array.isArray(t)||!r)return-1;for(let s=t.length-1;s>=0;s-=1){let o=t[s];if(!Wv(o))continue;if([o?.sourceId,o?.message_id,o?.messageId,o?.id,o?.mes_id,o?.mid,o?.mesid,o?.chat_index,o?.index,s].map(a=>jf(a)).includes(r))return s}return-1}function xc(t){let e=bc(),r=Hv(e.chat,t?.sourceMessageId);return r<0?{runtime:e,messageIndex:r,message:null}:{runtime:e,messageIndex:r,message:e.chat[r]||null}}function Ga(t,e,r){let s=o=>{!Array.isArray(o)||e<0||e>=o.length||(o[e]={...o[e]||{},...r})};s(t?.contextChat),s(t?.apiChat)}async function qa(t){let e=t?.context||null,r=t?.api||null,s=e?.saveChatDebounced||r?.saveChatDebounced||null,o=e?.saveChat||r?.saveChat||null;typeof s=="function"&&s.call(e||r),typeof o=="function"&&await o.call(e||r)}function Va(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function Ns(t){return!t||typeof t!="object"||Array.isArray(t)?!1:"lastResolvedTarget"in t||"lastCommittedTarget"in t}function Ha(t,e,r,s){if(!t)return null;let o=t[e];if(!o)return null;let n=Ce(r);return typeof s=="function"&&s(o)?n===Lt?o:null:o[n]||null}function hc(t,e,r,s,o){if(!t)return;let n=Ce(r),a=t[e];if(typeof o=="function"&&o(a)){let i={[Lt]:a};i[n]=s,t[e]=i}else a&&typeof a=="object"&&!Array.isArray(a)?t[e]={...a,[n]:s}:t[e]={[n]:s}}function Ya(t,e,r,s){if(!t)return!1;let o=Ce(r),n=t[e];if(!n)return!1;if(typeof s=="function"&&s(n))return o===Lt?(delete t[e],!0):!1;if(n&&typeof n=="object"&&!Array.isArray(n)){if(n[o]===void 0)return!1;let a={...n};return delete a[o],Object.keys(a).length===0?delete t[e]:t[e]=a,!0}return!1}function Ff(t,e={}){let{runtime:r,messageIndex:s}=xc(t);return zf({runtime:r,targetSnapshot:t,currentMessageIndex:s,templateTables:Array.isArray(e.templateTables)?e.templateTables:[],isolationKey:e.isolationKey===void 0?he.getKey():e.isolationKey})}async function Wf(t,e={}){let{runtime:r,messageIndex:s,message:o}=xc(t);if(!o||s<0)return{success:!1,error:"target_message_not_found"};let n=e.isolationKey===void 0?he.getKey():e.isolationKey,a=Ha(o,Kr,n,Ns),i={...ia(a),lastResolvedTarget:so(t),updatedAt:Date.now()};return hc(o,Kr,n,i,Ns),Ga(r,s,o),await qa(r),{success:!0,bindings:i}}async function Ja(t,e,r={}){let s=r.skipFreshValidation===!0?t:await Lf(t,r),o=r.skipFreshValidation===!0?{valid:!0,reason:"skipped"}:Of(t,s);if(!o.valid)return{success:!1,error:"target_changed_before_commit",validation:o};let n=s||t,{runtime:a,messageIndex:i,message:l}=xc(n);if(!l||i<0)return{success:!1,error:"target_message_not_found",validation:o};let c=r.isolationKey===void 0?he.getKey():r.isolationKey,d=en(n),u={...d.meta||{},...e.meta||{},...r.locks?{locks:r.locks}:{},...r.previousSnapshot?{previousSnapshot:r.previousSnapshot}:{},isolationKey:c},y=xr({...d,...e,meta:u,slotBindingKey:n.slotBindingKey,slotRevisionKey:n.slotRevisionKey,sourceMessageId:n.sourceMessageId,sourceSwipeId:n.sourceSwipeId||n.effectiveSwipeId,updatedAt:Date.now()}),p=Ha(l,Kr,c,Ns),f={...ia(p),lastResolvedTarget:so(n),lastCommittedTarget:so(n),updatedAt:Date.now()};return hc(l,ws,c,y,Va),hc(l,Kr,c,f,Ns),Ga(a,i,l),await qa(a),jv(n,c,y?.tables||[]).catch(()=>{}),{success:!0,state:y,bindings:f,validation:o,messageIndex:i,sourceMessageId:n.sourceMessageId,slotRevisionKey:n.slotRevisionKey}}function Ds(t=null,e={}){let r=Ct.getAssistantMessageSnapshot(t);if(!r?.message)return null;let s=e.isolationKey===void 0?he.getKey():e.isolationKey;return{...r,tableState:xr(Ha(r.message,ws,s,Va)),tableBindings:ia(Ha(r.message,Kr,s,Ns))}}async function Hf(t,e={}){let r=bc();if(!Array.isArray(r.chat)||t<0||t>=r.chat.length)return{success:!1,error:"invalid_message_index",messageIndex:t};let s=r.chat[t];if(!s)return{success:!1,error:"message_not_found",messageIndex:t};let o=e.isolationKey===void 0?he.getKey():e.isolationKey,n=Ya(s,ws,o,Va),a=e.clearBindings===!1?!1:Ya(s,Kr,o,Ns);return(n||a)&&(Ga(r,t,s),await qa(r)),{success:!0,cleared:n||a,messageIndex:t,isolationKey:o}}async function Yf(t={}){let e=bc(),r=Number.isFinite(t.fromMessageIndex)?t.fromMessageIndex:0,s=Number.isFinite(t.toMessageIndex)?t.toMessageIndex:(e.chat?.length||0)-1,o=t.isolationKey===void 0?he.getKey():t.isolationKey,n=0;for(let a=r;a<=s;a++){let i=e.chat[a];if(!i)continue;let l=Ya(i,ws,o,Va),c=Ya(i,Kr,o,Ns);(l||c)&&(Ga(e,a,i),n++)}return n>0&&await qa(e),{success:!0,touched:n,from:r,to:s,isolationKey:o}}var mc,Tn=N(()=>{ks();Ke();Ss();Kf();Wa();va();H()});function qf(t){let e=new Set;if(!Array.isArray(t))return e;for(let r of t){let s=r?.order;Number.isFinite(s)&&e.add(Math.floor(s))}return e}function wc(t,e=5e4,r=1,s=99999){for(let o=e;o<=s;o++)if(!t.has(o))return t.add(o),o;for(let o=r;o<e;o++)if(!t.has(o))return t.add(o),o;return Gf.warn("\u65E0\u53EF\u7528 order \u69FD\u4F4D"),t.add(e),e}function Vf(t,e,r=5e4,s=1,o=99999){let n=o-e+1;for(let a=r;a<=n;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}for(let a=s;a<r&&a<=n;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}Gf.warn(`\u65E0\u6CD5\u5206\u914D ${e} \u4E2A\u8FDE\u7EED order \u69FD\u4F4D`);for(let a=0;a<e;a++)t.add(r+a);return r}var Gf,Jf=N(()=>{H();Gf=I.createScope("TableWBOrder")});function vc(t,e="before_character_definition"){let r=String(t||"").trim().toLowerCase();return r==="at_depth_as_system"||r==="system"?"at_depth_as_system":r==="before_char"||r==="before_character"||r==="before_character_definition"||r==="0"?"before_character_definition":r==="after_char"||r==="after_character"||r==="after_character_definition"||r==="1"?"after_character_definition":e}function Sn(t,e){if(!e)return t;let r={...t,position:e.position};return e.position==="at_depth_as_system"?r.depth=e.depth:delete r.depth,r}var q1,V1,Xf=N(()=>{q1=Object.freeze(["at_depth_as_system","before_character_definition","after_character_definition"]);V1=Object.freeze({position:"before_character_definition",depth:2,order:5e4})});function Tc(t,e=""){return t==null?e:String(t).trim()||e}function qv(t){return Tc(t,"default_chat").replace(/[\[\]=]/g,"_")}function Vv(){let t=globalThis.window||globalThis;return Tc(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function Jv(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return $r()?.TavernHelper||null}function Xv(t){return String(t??"").replace(/\|/g,"\uFF5C").replace(/\n/g," ")}function Qf(t){let e=Array.isArray(t.columns)?t.columns:[],r=Array.isArray(t.rows)?t.rows:[];if(r.length===0)return"";let s=e.map(l=>l.key),o=e.map(l=>l.title||l.key),n=`| ${o.join(" | ")} |`,a=`| ${o.map(()=>"---").join(" | ")} |`,i=r.map(l=>{let c=l.cells||{};return`| ${s.map(d=>Xv(c[d])).join(" | ")} |`});return`# ${t.name||"\u672A\u547D\u540D\u8868"}

${n}
${a}
${i.join(`
`)}`}function Qv(t,e){if(!Array.isArray(t)||t.length===0)return[];let r=new Map;if(Array.isArray(e))for(let s of e){let o=s?.id||s?.key;o&&r.set(o,s)}return t.map(s=>{let o=s?.id?r.get(s.id):null;return{...s,exportConfig:s?.exportConfig||o?.exportConfig||{enabled:!1},enabled:s?.enabled!==!1}})}function Xa(t){return`${eg}${Yv}${qv(t)}${Gv}-`}function Zv(t){return`${eg}[${Tc(t,"default_chat")}]-`}function tg(t,e){if(!t||typeof t!="string")return!1;let r=Xa(e);if(t.startsWith(r))return!0;let s=Zv(e);return!!t.startsWith(s)}function eT(t,e){let r=Xa(t),s=String(e||"").trim();return s?`${r}${s}`:`${r}\u586B\u8868\u6570\u636E`}function Zf(t,e,r){return`${Xa(t)}Wrapper-${r}`}function tT(t,e){return t?t.content!==e.content||t.enabled!==e.enabled||t.type!==e.type||t.position!==e.position||t.prevent_recursion!==e.prevent_recursion||t.order!==e.order:!0}async function _n(t,e,r,s,o,n,a){let i=r.find(l=>l.comment===s);return i&&a&&!tg(i.comment,a)?(Ao.warn(`upsert \u8DF3\u8FC7\uFF1A\u73B0\u6709\u6761\u76EE comment "${s}" \u4E0D\u5C5E\u4E8E\u5F53\u524D chat`,{chatId:a}),{action:"skipped",comment:s,reason:"cross_chat_collision"}):i&&i.uid?tT(i,o)?(await Promise.resolve(t.setLorebookEntries(e,[{uid:i.uid,...o}])),Ao.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u66F4\u65B0\uFF1A${s}`),{action:"updated",comment:s}):(n.add(i.order||0),{action:"skipped",comment:s}):typeof t.createLorebookEntries=="function"?(await Promise.resolve(t.createLorebookEntries(e,[{comment:s,keys:[],...o}])),Ao.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u521B\u5EFA\uFF1A${s}`),{action:"created",comment:s}):{action:"failed",comment:s,error:"createLorebookEntries \u4E0D\u53EF\u7528"}}async function rg(t,e){let r=e?.worldbookSync;if(!r?.enabled)return{skipped:!0,reason:"disabled"};let s=String(r.targetBook||"").trim();if(!s)return{skipped:!0,reason:"no_target_book"};let o=Jv();if(!o)return{success:!1,error:"TavernHelper \u4E0D\u53EF\u7528"};if(typeof o.getLorebookEntries!="function")return{success:!1,error:"getLorebookEntries \u4E0D\u53EF\u7528"};if(typeof o.setLorebookEntries!="function"&&typeof o.createLorebookEntries!="function")return{success:!1,error:"\u4E16\u754C\u4E66\u5199\u5165 API \u4E0D\u53EF\u7528"};let n=Vv(),a=Xa(n),i=Array.isArray(e?.tables)?e.tables:[],c=Qv(t,i).filter(y=>y&&y.enabled!==!1&&Array.isArray(y.rows)&&y.rows.length>0);if(c.length===0)return{skipped:!0,reason:"empty_tables"};let d=e?.wrapperConfig||{},u=d.enabled!==!1;try{let y=await Promise.resolve(o.getLorebookEntries(s));Array.isArray(y)||(y=[]);let p=qf(y),f=[],g=c.filter(_=>_.exportConfig?.enabled===!0),h=c.filter(_=>_.exportConfig?.enabled!==!0),x="";if(h.length>0&&(x=h.map(_=>Qf(_)).join(`

`)),u&&(x||g.length>0)){let _=d.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",C=d.wrapperHint||"",W=d.wrapperPlacement||{},q=W.order||5e4,R=Vf(p,3,q,1,99999),S=vc(W.position,"before_character_definition"),U=Number.isFinite(W.depth)?W.depth:2,j=`<${_}>
${C}`;f.push(await _n(o,s,y,Zf(n,_,"Start"),Sn({content:j,enabled:!0,type:"constant",order:R,prevent_recursion:!0},{position:S,depth:U}),p,n)),x&&f.push(await _n(o,s,y,`${a}\u5168\u5C40\u6570\u636E`,Sn({content:x,enabled:!0,type:"constant",order:R+1,prevent_recursion:!0},{position:S,depth:U}),p,n)),f.push(await _n(o,s,y,Zf(n,_,"End"),Sn({content:`</${_}>`,enabled:!0,type:"constant",order:R+2,prevent_recursion:!0},{position:S,depth:U}),p,n))}else if(x){let _=wc(p,5e4,1,99999);f.push(await _n(o,s,y,`${a}\u5168\u5C40\u6570\u636E`,{content:x,enabled:!0,type:"constant",position:"before_character_definition",order:_,prevent_recursion:!0},p,n))}for(let _ of g){let C=_.exportConfig||{},W=C.entryName||_.name||"\u672A\u547D\u540D\u8868",q=eT(n,W),R=Qf(_);if(!R)continue;let S=C.entryPlacement||{},U=vc(S.position,"before_character_definition"),j=wc(p,S.order||5e4,1,99999),ie=C.entryType==="keyword"?"keyword":"constant";f.push(await _n(o,s,y,q,Sn({content:R,enabled:!0,type:ie,order:j,prevent_recursion:C.preventRecursion!==!1},{position:U,depth:S.depth||2}),p,n))}let v=new Set(f.map(_=>_.comment).filter(Boolean)),T=y.filter(_=>!_.comment||!tg(_.comment,n)?!1:!v.has(_.comment));if(T.length>0){let _=T.map(C=>C.uid).filter(Boolean);_.length>0&&typeof o.deleteLorebookEntries=="function"&&(await Promise.resolve(o.deleteLorebookEntries(s,_)),Ao.info(`\u5DF2\u6E05\u7406 ${_.length} \u4E2A\u65E7\u4E16\u754C\u4E66\u6761\u76EE [${n}]`))}let L=f.filter(_=>_.action==="created").length,M=f.filter(_=>_.action==="updated").length;return Ao.info(`\u4E16\u754C\u4E66\u540C\u6B65\u5B8C\u6210 [${n}]\uFF1A${L} \u521B\u5EFA, ${M} \u66F4\u65B0, ${T.length} \u6E05\u7406`),{success:!0,results:f,stats:{created:L,updated:M,cleaned:T.length},targetBook:s,chatId:n}}catch(y){return Ao.warn("\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25:",y),{success:!1,error:y?.message||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25"}}}var Ao,eg,Yv,Gv,sg=N(()=>{ys();H();Jf();Xf();Ao=I.createScope("TableWorldbookSync"),eg="YYT-",Yv="[YY:chatId=",Gv="]"});function Qa(t,e=""){return t==null?e:String(t).trim()||e}function sT(t={}){return{tables:Array.isArray(t?.tables)?ne(t.tables):[]}}function oT(t={},e={}){let r=Qa(e.mirrorTag,"yyt-table-workbench"),s=sT(t);return[`<${r}>`,"[\u586B\u8868\u5DE5\u4F5C\u53F0]","```json",JSON.stringify(s,null,2),"```",`</${r}>`].join(`
`)}async function og({targetSnapshot:t,nextTables:e,config:r,loadResult:s=null,diff:o=null,fillMode:n="",skipNotify:a=!1}={}){let i=Ot(r),l=await Ja(t,{tables:Array.isArray(e)?ne(e):[],meta:{lastLoadMode:Qa(s?.loadMode,""),lastFillMode:Qa(n),mergeBaseOnly:!1,updatedBy:Qa(t?.runSource,"MANUAL_TABLE")}});if(!l?.success)return{success:!1,error:l?.error||"table_state_commit_failed",commitResult:l,mirrorResult:null,warning:""};let c=null,d=null,u="";if(i.mirrorToMessage){let y=oT(l.state,{mirrorTag:i.mirrorTag});c=await Ct.injectDetailed(rT,y,{overwrite:!0,extractionSelectors:[i.mirrorTag],sourceMessageId:l.sourceMessageId,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId,effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId,slotBindingKey:t?.slotBindingKey,slotRevisionKey:t?.slotRevisionKey,slotTransactionId:t?.slotTransactionId,traceId:t?.traceId,skipNotify:a}),c?.success||(u=c?.error||"\u6B63\u6587\u955C\u50CF\u5199\u56DE\u5931\u8D25")}return i.worldbookSync?.enabled&&(d=await rg(Array.isArray(e)?e:[],i),d&&!d.success&&!d.skipped&&(u=u?`${u}; ${d.error}`:d.error||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25")),{success:!0,state:l.state,bindings:l.bindings,diff:o,fillMode:n,commitResult:l,mirrorResult:c,worldbookSyncResult:d,warning:u}}var rT,ng=N(()=>{ks();Ke();Tn();sr();sg();rT="tableWorkbenchMirror"});function nT(t){return typeof t!="string"||!t?t:t.replace(/[“”「」『』＂]/g,'"')}function Sc(t,e){for(let r=e;r<t.length;r++)if(!/\s/.test(t[r]))return{char:t[r],index:r};return{char:"",index:-1}}function lg(t){return!!t&&(t==='"'||t==="{"||t==="["||t==="-"||/\d/.test(t)||t==="t"||t==="f"||t==="n")}function aT(t,e,r,s){let o=Sc(t,e+1),n=o.char;if(!n)return r!=="key";if(r==="key")return n===":";if(n==="}"||n==="]")return!0;if(n!==",")return!1;let a=Sc(t,o.index+1).char;return a?s==="object"?a==='"'||a==="}":s==="array"?a==="]"||lg(a):lg(a)||a==="}"||a==="]":!0}function iT(t){if(typeof t!="string")return{success:!1,result:t,error:"not a string"};let e="",r=!1,s=!1,o=null,n=[],a=()=>n.length?n[n.length-1]:null,i=()=>{let l=a();l&&(l.expecting="commaOrEnd")};for(let l=0;l<t.length;l++){let c=t[l];if(s){e+=c,s=!1;continue}if(r){if(c==="\\"){e+=c,s=!0;continue}if(c==='"'){let d=a();aT(t,l,o,d?.type||null)?(e+=c,r=!1,o==="key"&&d?.type==="object"?d.expecting="colon":i(),o=null):e+='\\"';continue}e+=c;continue}if(c==='"'){e+=c,r=!0;let d=a();o=d&&d.type==="object"&&(d.expecting==="key"||d.expecting==="keyOrEnd")?"key":"value";continue}if(c==="{"){e+=c,n.push({type:"object",expecting:"keyOrEnd"});continue}if(c==="["){e+=c,n.push({type:"array",expecting:"valueOrEnd"});continue}if(c===":"){e+=c;let d=a();d?.type==="object"&&(d.expecting="value");continue}if(c===","){e+=c;let d=a();d?.type==="object"&&(d.expecting="key"),d?.type==="array"&&(d.expecting="value");continue}if(c==="}"||c==="]"){e+=c,n.pop(),i();continue}e+=c}return{success:!0,result:e,error:null}}function lT(t){if(typeof t!="string"||!t)return t;let e="",r=!1,s=!1;for(let o=0;o<t.length;o++){let n=t[o];if(s){e+=n,s=!1;continue}if(n==="\\"){e+=n,r&&(s=!0);continue}if(n==='"'){e+=n,r=!r;continue}if(r){if(n===`
`){e+="\\n";continue}if(n==="\r"){e+="\\r";continue}if(n==="	"){e+="\\t";continue}if(n==="\0"){e+="\\u0000";continue}}e+=n}return e}function cT(t){if(typeof t!="string"||!t)return t;let e="",r=!1,s=!1;for(let o=0;o<t.length;o++){let n=t[o];if(s){e+=n,s=!1;continue}if(n==="\\"){e+=n,r&&(s=!0);continue}if(n==='"'){e+=n,r=!r;continue}if(!r&&n===","){let a=Sc(t,o+1).char;if(a==="}"||a==="]")continue}e+=n}return e}function dT(t){return typeof t!="string"||!t?t:t.replace(/([{,]\s*)(-?\d+)(\s*:)/g,'$1"$2"$3')}function En(t){if(typeof t!="string")return{success:!1,result:t,layersApplied:[],error:"Input is not a string"};let e=[],r=t,s=nT(r);s!==r&&e.push("normalizeQuotes"),r=s;let o=iT(r);if(!o.success)return{success:!1,result:r,layersApplied:e,error:o.error};o.result!==r&&e.push("escapeUnescapedQuotes"),r=o.result;let n=lT(r);n!==r&&e.push("sanitizeControlChars"),r=n;let a=cT(r);a!==r&&e.push("removeTrailingCommas"),r=a;let i=dT(r);return i!==r&&e.push("fixNumericKeys"),r=i,{success:!0,result:r,layersApplied:e,error:null}}function uT(t,e=","){if(typeof t!="string"||!t)return[];let r=[],s="",o=!1,n=!1,a=0,i=0,l=0;for(let c=0;c<t.length;c++){let d=t[c];if(n){s+=d,n=!1;continue}if(d==="\\"){s+=d,o&&(n=!0);continue}if(d==='"'){s+=d,o=!o;continue}if(!o){if(d==="{")a++;else if(d==="}")a=Math.max(0,a-1);else if(d==="[")i++;else if(d==="]")i=Math.max(0,i-1);else if(d==="(")l++;else if(d===")")l=Math.max(0,l-1);else if(d===e&&a===0&&i===0&&l===0){s.trim()&&r.push(s.trim()),s="";continue}}s+=d}return s.trim()&&r.push(s.trim()),r}function pT(t,e=":"){if(typeof t!="string"||!t)return-1;let r=!1,s=!1,o=0,n=0,a=0;for(let i=0;i<t.length;i++){let l=t[i];if(s){s=!1;continue}if(l==="\\"){r&&(s=!0);continue}if(l==='"'){r=!r;continue}if(!r){if(l==="{")o++;else if(l==="}")o=Math.max(0,o-1);else if(l==="[")n++;else if(l==="]")n=Math.max(0,n-1);else if(l==="(")a++;else if(l===")")a=Math.max(0,a-1);else if(l===e&&o===0&&n===0&&a===0)return i}}return-1}function _c(t){if(typeof t!="string")return{success:!0,value:t,error:null};let e=t.trim();if(!e)return{success:!1,value:null,error:"Empty value"};let s=`[${e.startsWith("'")&&e.endsWith("'")?`"${e.slice(1,-1).replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}"`:e}]`;try{return{success:!0,value:JSON.parse(s)[0],error:null}}catch(o){let n=En(s);if(n.success)try{return{success:!0,value:JSON.parse(n.result)[0],error:null}}catch{}return{success:!1,value:null,error:o?.message||"Failed to parse loose value"}}}function yT(t){let e=typeof t=="string"?t.trim():"";if(!e)return null;if(/^-?\d+$/.test(e))return e;let r=_c(e);return r.success&&(typeof r.value=="string"||typeof r.value=="number")?String(r.value):e.replace(/^["']|["']$/g,"")}function cg(t){if(typeof t!="string")return{success:!1,result:null,recoveredKeys:[],error:"not a string"};let e=t.trim();if(!e.startsWith("{")||!e.endsWith("}"))return{success:!1,result:null,recoveredKeys:[],error:"not an object literal"};let r=e.slice(1,-1).trim();if(!r)return{success:!0,result:{},recoveredKeys:[],error:null};let s=uT(r,",").filter(Boolean);if(!s.length)return{success:!1,result:null,recoveredKeys:[],error:"no segments"};let o={},n=0;for(let i of s){let l=pT(i,":");if(l!==-1){let d=yT(i.slice(0,l)),u=_c(i.slice(l+1));if(!d||!u.success)return{success:!1,result:null,recoveredKeys:Object.keys(o),error:`Failed segment: ${i}`};o[d]=u.value;let y=parseInt(d,10);!isNaN(y)&&String(y)===d&&(n=Math.max(n,y+1));continue}let c=_c(i);if(!c.success)return{success:!1,result:null,recoveredKeys:Object.keys(o),error:`Failed value: ${i}`};for(;Object.prototype.hasOwnProperty.call(o,String(n));)n++;o[String(n)]=c.value,n++}let a=Object.keys(o).sort((i,l)=>parseInt(i,10)-parseInt(l,10));return a.length?{success:!0,result:o,recoveredKeys:a,error:null}:{success:!1,result:null,recoveredKeys:[],error:"no keys recovered"}}function fT(t){if(typeof t!="string")return"";let e=t.trim();return e=e.replace(/'\s*\+\s*'/g,""),e.startsWith("'")&&e.endsWith("'")&&(e=e.slice(1,-1)),e=e.replace(/\\n/g,`
`),e=e.replace(/\\\\"/g,'\\"'),e=e.replace(/：/g,":"),e}function gT(t){let e=fT(t);if(!e)return[];let r=[];ag.lastIndex=0;let s;for(;(s=ag.exec(e))!==null;){let i=s[1];i&&i.trim()&&r.push(i)}if(r.length)return r;let o=i=>/(insertRow|updateRow|deleteRow)\s*\(/.test(i),n=/<!--([\s\S]*?)-->/g,a=[];for(;(s=n.exec(e))!==null;)o(s[1])&&a.push(s[1]);return a}function mT(t){let e=t.split(/\r?\n/),r=[],s="",o=!1;for(let a of e){let i=a.trim();if(!i||(!o&&i.includes("//")&&!i.includes('"//')&&!i.includes("'//")&&(i=i.split("//")[0].trim()),!i))continue;if(/^(insertRow|updateRow|deleteRow)\s*\(/.test(i)&&!o?(s&&r.push(s),s=i):s+=(s?" ":"")+i,s){let c=(s.match(/\{/g)||[]).length,d=(s.match(/\}/g)||[]).length;o=c>d}}s&&r.push(s);let n=[];for(let a of r){let i=/(?:^|;\s*)((?:insertRow|deleteRow|updateRow)\s*\()/g,l=[],c;for(;(c=i.exec(a))!==null;)l.push(c.index+(c[0].length-c[1].length));if(l.length<=1)n.push(a.replace(/;\s*$/,""));else for(let d=0;d<l.length;d++){let u=l[d],y=d+1<l.length?l[d+1]:a.length,p=a.substring(u,y).replace(/;\s*$/,"").trim();p&&n.push(p)}}return n}function hT(t){try{let e=t;if(e.match(/\)\s*;?\s*\/\/.*$/)&&(e=e.replace(/\/\/.*$/,"").trim()),!e)return null;let r=e.match(/^(insertRow|deleteRow|updateRow)\s*\((.*)\);?$/);if(!r)return null;let s=r[1],o=r[2],n=o.indexOf("{");if(n===-1)return{command:s,args:JSON.parse(`[${o}]`),line:e};let a=o.substring(0,n).trim(),i=o.substring(n),l=JSON.parse(`[${a.replace(/,$/,"")}]`);try{return{command:s,args:[...l,JSON.parse(i)],line:e}}catch{}let c=cg(i);if(c.success)return{command:s,args:[...l,c.result],line:e};let d=En(i);if(!d.success)return null;try{return{command:s,args:[...l,JSON.parse(d.result)],line:e}}catch{}let u=cg(d.result);return u.success?{command:s,args:[...l,u.result],line:e}:null}catch{return null}}function bT(t){if(!t)return null;let{command:e,args:r}=t;if(e==="insertRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="object"&&r[1]!==null?r[1]:{};return{op:e,tableIndex:s,data:o}}if(e==="deleteRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="number"?r[1]:0;return{op:e,tableIndex:s,rowIndex:o}}if(e==="updateRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="number"?r[1]:0,n=typeof r[2]=="object"&&r[2]!==null?r[2]:{};return{op:e,tableIndex:s,rowIndex:o,data:n}}return null}function Ec(t){let e=gT(t);if(!e.length)return null;let r=[],s=[];for(let o of e){let n=o.replace(/<!--|-->/g,"").trim();if(!n)continue;let a=mT(n);for(let i of a){let l=hT(i),c=bT(l);c?r.push(c):i&&/^(insertRow|updateRow|deleteRow)/.test(i)&&s.push(i.slice(0,200))}}if(s.length>0)try{console.warn("[TableJsonSanitizer] parseIncrementalEdits: %d \u6761\u6307\u4EE4\u89E3\u6790\u5931\u8D25",s.length,s)}catch{}return r.length?r:null}function Ac(t){ig.lastIndex=0;let e;for(;(e=ig.exec(t))!==null;){let f=e[1].trim();if(f)try{return JSON.parse(f)}catch{let h=En(f);if(h.success)try{return JSON.parse(h.result)}catch{}}}let r=t.trim();try{return JSON.parse(r)}catch{}let s=En(r);if(s.success)try{return JSON.parse(s.result)}catch{}let o=r.indexOf("{"),n=r.indexOf("["),a=-1,i="",l="";if(o!==-1&&(n===-1||o<n)?(a=o,i="{",l="}"):n!==-1&&(a=n,i="[",l="]"),a===-1)return null;let c=0,d=-1,u=!1,y=!1;for(let f=a;f<r.length;f++){let g=r[f];if(y){y=!1;continue}if(g==="\\"&&u){y=!0;continue}if(g==='"'){u=!u;continue}if(!u){if(g===i)c++;else if(g===l&&(c--,c===0)){d=f;break}}}if(d===-1)return null;let p=r.substring(a,d+1);try{return JSON.parse(p)}catch{let g=En(p);if(g.success)try{return JSON.parse(g.result)}catch{}}return null}function dg(t){if(!t||typeof t!="string")return{mode:"empty",edits:null,tables:null};let e=Ec(t);if(e)return{mode:"incremental",edits:e,tables:null};let r=Ac(t);if(r){let s=null;if(Array.isArray(r))s=r;else if(r&&Array.isArray(r.tables))s=r.tables;else if(r&&typeof r=="object"){for(let o of Object.values(r))if(Array.isArray(o)){s=o;break}}if(Array.isArray(s))return{mode:"full",edits:null,tables:s}}return{mode:"empty",edits:null,tables:null}}var ag,ig,Za=N(()=>{ag=/<tableEdit>([\s\S]*?)<\/tableEdit>/gi,ig=/```(?:json)?\s*([\s\S]*?)```/gi});var xT,wT,ug,pg=N(()=>{Za();xT=/<tableEdit>[\s\S]*?<\/tableEdit>/i,wT=/(insertRow|updateRow|deleteRow)\s*\(/,ug=Object.freeze({formatId:"dsl",displayName:"<tableEdit> DSL \u589E\u91CF\u534F\u8BAE",detect(t){return!t||typeof t!="string"?!1:xT.test(t)||wT.test(t)},parse(t){let e=Ec(t);return!Array.isArray(e)||e.length===0?null:{mode:"incremental",edits:e,tables:null}}})});function fg(t){if(typeof t!="string")return t;let e=t.trim();return e.startsWith("'")&&e.endsWith("'")||e.startsWith('"')&&e.endsWith('"')?e.slice(1,-1).replace(/''/g,"'").replace(/\\'/g,"'"):e}function Cc(t){let e=String(t||"").match(/(\d+)$/);return e?parseInt(e[1],10):0}function gg(t){let e=String(t||"").match(/row_id\s*=\s*(\d+)/i);return e?parseInt(e[1],10):-1}function vT(t){let e=t.match(/INSERT\s+INTO\s+(\S+)\s*\(([^)]*)\)\s*VALUES\s*\(([^)]*)\)/i);if(!e)return null;let r=e[1],s=e[2],o=e[3],n=s.split(",").map(l=>l.trim()),a=o.split(",").map(l=>fg(l.trim())),i={};return n.forEach((l,c)=>{l!=="row_id"&&a[c]!==void 0&&(i[l]=a[c])}),{op:"insertRow",tableIndex:Cc(r),data:i}}function TT(t){let e=t.match(/UPDATE\s+(\S+)\s+SET\s+([\s\S]+?)\s+WHERE\s+([\s\S]+?);?$/i);if(!e)return null;let r=e[1],s=e[2],o=e[3],n={},a=s.split(/,(?![^()]*\))/);for(let i of a){let l=i.indexOf("=");if(l<0)continue;let c=i.slice(0,l).trim(),d=fg(i.slice(l+1).trim());c&&c!=="row_id"&&(n[c]=d)}return{op:"updateRow",tableIndex:Cc(r),rowIndex:gg(o),data:n}}function ST(t){let e=t.match(/DELETE\s+FROM\s+(\S+)\s+WHERE\s+([\s\S]+?);?$/i);return e?{op:"deleteRow",tableIndex:Cc(e[1]),rowIndex:gg(e[2])}:null}function _T(t){let e=[];yg.lastIndex=0;let r;for(;(r=yg.exec(t))!==null;){let s=r[0].trim(),o=null;/^INSERT/i.test(s)?o=vT(s):/^UPDATE/i.test(s)?o=TT(s):/^DELETE/i.test(s)&&(o=ST(s)),o&&e.push(o)}return e}var An,yg,mg,hg=N(()=>{An=/<sql>([\s\S]*?)<\/sql>/gi,yg=/(INSERT\s+INTO\s+\S+[\s\S]*?;)|(UPDATE\s+\S+\s+SET[\s\S]*?;)|(DELETE\s+FROM\s+\S+[\s\S]*?;)/gi;mg=Object.freeze({formatId:"sql",displayName:"SQL \u534F\u8BAE\uFF08INSERT/UPDATE/DELETE\uFF09",detect(t){return!t||typeof t!="string"?!1:An.test(t)?(An.lastIndex=0,!0):(An.lastIndex=0,/\b(INSERT\s+INTO|UPDATE\s+\S+\s+SET|DELETE\s+FROM)\b/i.test(t))},parse(t){let e="";An.lastIndex=0;let r,s=[];for(;(r=An.exec(t))!==null;)s.push(r[1]);s.length>0?e=s.join(`
`):e=t;let o=_T(e);return!Array.isArray(o)||o.length===0?null:{mode:"incremental",edits:o,tables:null}}})});var bg,xg=N(()=>{Za();bg=Object.freeze({formatId:"full-json",displayName:"JSON envelope \u5168\u91CF\u534F\u8BAE",detect(t){return!t||typeof t!="string"?!1:/```json/i.test(t)||/\{[\s\S]*?"tables"\s*:/i.test(t)},parse(t){let e=Ac(t);if(!e)return null;let r=null;if(Array.isArray(e))r=e;else if(e&&Array.isArray(e.tables))r=e.tables;else if(e&&typeof e=="object"){for(let s of Object.values(e))if(Array.isArray(s)){r=s;break}}return!Array.isArray(r)||r.length===0?null:{mode:"full",edits:null,tables:r}}})});function ei(){return kc||(kc=I.createScope("AiProtocolAdapter")),kc}function wg(t){if(!t||typeof t!="string")return null;for(let e of ET){let r=!1;try{r=e.detect(t)}catch(s){ei().warn(`adapter ${e.formatId} detect \u629B\u9519`,s);continue}if(r)try{let s=e.parse(t);if(s&&(s.mode==="incremental"||s.mode==="full")&&(s.mode==="incremental"&&Array.isArray(s.edits)&&s.edits.length>0||s.mode==="full"&&Array.isArray(s.tables)&&s.tables.length>0))return ei().info("AI \u534F\u8BAE\u9002\u914D\u5668\u547D\u4E2D",{formatId:e.formatId,mode:s.mode,editsCount:s.edits?.length,tablesCount:s.tables?.length}),{...s,rawFormat:e.formatId}}catch(s){ei().warn(`adapter ${e.formatId} parse \u629B\u9519\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A`,s)}}return ei().warn("parseAiResponseAuto: \u65E0\u9002\u914D\u5668\u547D\u4E2D",{responseLength:t.length}),null}var kc,ET,vg=N(()=>{H();pg();hg();xg();ET=Object.freeze([ug,mg,bg])});function AT(t,e){let r=new Map;Array.isArray(t)&&t.forEach((n,a)=>{n&&typeof n=="object"&&r.set(n.name||`__row_${a}`,n)});let s=new Map;Array.isArray(e)&&e.forEach((n,a)=>{n&&typeof n=="object"&&s.set(n.name||`__row_${a}`,n)});let o={};for(let[n,a]of s){let i=r.get(n);if(i){o[n]={};let l=new Set([...Object.keys(i.cells||{}),...Object.keys(a.cells||{})]);for(let c of l){let d=String((i.cells&&i.cells[c])??""),u=String((a.cells&&a.cells[c])??"");o[n][c]=d===u?"unchanged":"updated"}o[n].__rowStatus="kept"}else{if(o[n]={},a.cells&&typeof a.cells=="object")for(let l of Object.keys(a.cells))o[n][l]="new";o[n].__rowStatus="new"}}for(let[n]of r)s.has(n)||(o[n]={__rowStatus:"deleted"});return o}function Tg(t,e){let r=Array.isArray(t)?ne(t):[],s=Array.isArray(e)?ne(e):[],o={},n=Math.max(r.length,s.length);for(let a=0;a<n;a++){let i=r[a],l=s[a];!i&&l?(o[a]={},Array.isArray(l.rows)&&l.rows.forEach(c=>{let d=c.name||`__row_${l.rows.indexOf(c)}`;o[a][d]={__rowStatus:"new"}})):i&&!l?(o[a]={},Array.isArray(i.rows)&&i.rows.forEach(c=>{let d=c.name||`__row_${i.rows.indexOf(c)}`;o[a][d]={__rowStatus:"deleted"}})):i&&l&&(o[a]=AT(i.rows,l.rows))}return o}var Sg=N(()=>{Ke()});function CT(){return{mode:"native",async buildRequest(t={},e={}){if(typeof t.buildRequest!="function")throw new Error("table_provider_missing_build_request");return t.buildRequest(e)},async sendRequest(t={},e=null,r={}){if(typeof t.sendRequest!="function")throw new Error("table_provider_missing_send_request");return t.sendRequest(e?.messages||[],r.config||{},r.abortSignal||null)},parseResponse(t={},e=""){if(typeof t.parseResponse!="function")throw new Error("table_provider_missing_parse_response");return t.parseResponse(e)}}}function _g(){return CT()}var Eg=N(()=>{});function IT(){return Ic||(Ic=I.createScope("TableLock")),Ic}function $s(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function kg(){let t=Cg.get(Ag,{});return $s(t)?t:{}}function RT(t){Cg.set(Ag,t)}function Rc(t){let e=kg();return $s(e[t])?e[t]:{}}function MT(t,e){let r=kg();r[t]=e,RT(r),PT(t,e).catch(()=>{})}async function PT(t,e){try{let{chatKey:r,isolationKey:s}=(()=>{let n=String(t||"").indexOf("::");return n===-1?{chatKey:String(t||""),isolationKey:""}:{chatKey:t.slice(0,n),isolationKey:t.slice(n+2)}})();if(!r)return;let o=await Promise.resolve().then(()=>(va(),zl));await o.ensureTableDataReady(),await o.clearScopeLocks({chatId:r,isolationKey:s});for(let[n,a]of Object.entries(e||{})){if(!$s(a))continue;let i={chatId:r,isolationKey:s};if(Array.isArray(a.rows))for(let l of a.rows)Number.isFinite(l)&&await o.setLockEntry(i,n,"row",String(l));if(Array.isArray(a.cols))for(let l of a.cols)typeof l=="string"&&l&&await o.setLockEntry(i,n,"column",l);if(Array.isArray(a.cells))for(let l of a.cells)typeof l=="string"&&l.includes(":")&&await o.setLockEntry(i,n,"cell",l);a.indexColumn===!0&&await o.setLockEntry(i,n,"index_column","")}}catch(r){IT().warn("lock-service SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:r?.message||String(r)})}}function Mc(t){let e=Rp();return $s(t)&&(Array.isArray(t.rows)&&(e.rows=Array.from(new Set(t.rows.filter(r=>Number.isFinite(r)).map(r=>Math.floor(r)))),e.rows.sort((r,s)=>r-s)),Array.isArray(t.cols)&&(e.cols=Array.from(new Set(t.cols.filter(r=>typeof r=="string"&&r.length>0)))),Array.isArray(t.cells)&&(e.cells=Array.from(new Set(t.cells.filter(r=>typeof r=="string"&&r.includes(":"))))),e.indexColumn=t.indexColumn===!0),e}function Pc(t){if(typeof t=="string")return t;if($s(t)){if(typeof t.scopeKey=="string"&&t.scopeKey.includes("::"))return t.scopeKey;if(t.chatId!==void 0){let e=t.isolationKey!==void 0?t.isolationKey:he.getKey();return tn(t.chatId,e)}}return tn("",he.getKey())}function NT(t,e){let r=Rc(t),s={};if(!Array.isArray(e))return s;for(let o=0;o<e.length;o++){let n=e[o];if(!n)continue;let a=n.uid||n.id||"";a&&r[a]&&(s[o]=Mc(r[a]))}return s}function Nc(t,e){let r=Pc(t),s=Rc(r);return Mc(s[e])}function Ig(t,e,r,s=!0){if(!e||!r)return!1;let o=Pc(t),n=Rc(o),a=Mc(n[e]),i=a.cols.includes(r);if(s&&!i)a.cols.push(r);else if(!s&&i)a.cols=a.cols.filter(l=>l!==r);else return!1;return n[e]=a,MT(o,n),!0}function Rg(t,e=[]){let r=Pc(t);return NT(r,e)}function Mg(t,e,r,s){if(!$s(t))return!1;let o=t[e];if(!o)return!1;if(Number.isFinite(r)&&o.rows.includes(r)||typeof s=="string"&&s.length>0&&o.cols.includes(s))return!0;if(Number.isFinite(r)&&typeof s=="string"&&s.length>0){let n=`${r}:${s}`;if(o.cells.includes(n))return!0}return!1}function Dc(t,e,r){if(!$s(t))return!1;let s=t[e];return s?Number.isFinite(r)&&s.rows.includes(r):!1}var kT,Ag,Ic,Cg,$c=N(()=>{ze();H();Ke();Ss();kT="tableLocks",Ag="scopes";Cg=$.namespace(kT)});function DT(t){let e=wg(t);return e&&(e.mode==="incremental"||e.mode==="full")?e:dg(t)}function ve(){return I.createScope("TableUpdate")}function LT(t,e){return new Promise(r=>{if(e?.aborted){r(!1);return}let s,o=()=>{clearTimeout(s);try{e?.removeEventListener?.("abort",o)}catch{}r(!1)};s=setTimeout(()=>{try{e?.removeEventListener?.("abort",o)}catch{}r(!0)},t);try{e?.addEventListener?.("abort",o)}catch{}})}function G(t,e=""){return t==null?e:String(t).trim()||e}function Pg(t=[],e=8,r="all"){if(!Array.isArray(t)||t.length===0)return"";let s=r==="assistant_only"?t.filter(o=>o?.role==="assistant"):t;return s.slice(Math.max(s.length-e,0)).map(o=>`[${G(o?.role,"unknown")}] ${String(o?.content||"").trim()}`).filter(Boolean).join(`

`)}function Ng(t,{extractTags:e=[],useGlobalRules:r=!1,regexPresetId:s=""}={}){if(!t)return t;let o=Array.isArray(e)&&e.length>0,n=typeof s=="string"&&s.trim().length>0;if(!o&&!r&&!n)return t;try{let a=[],i=[];if(n)try{let l=we.getPreset(s);if(l){let c=Array.isArray(l.rules)?l.rules.filter(d=>d&&d.enabled!==!1&&d.value):[];a.push(...c),Array.isArray(l.blacklist)&&i.push(...l.blacklist.map(d=>String(d||"").trim()).filter(Boolean))}else ve().warn("applyContextExtractionRules: \u627E\u4E0D\u5230\u6B63\u5219\u9884\u8BBE",{regexPresetId:s})}catch(l){ve().warn("applyContextExtractionRules: \u52A0\u8F7D\u6B63\u5219\u9884\u8BBE\u5931\u8D25",l)}if(o&&a.push(...e.map(l=>{let c=String(l||"").trim();return c.startsWith("regex:")?{type:"regex_include",value:c.slice(6).trim(),enabled:!0}:{type:"include",value:c,enabled:!0}}).filter(l=>l.value)),r){let l=Hs()||[];a=[...a,...l.filter(c=>c?.enabled)],i=[...i,...Ys()||[]]}return a.length===0&&i.length===0?t:mr(t,a,i)||t}catch(a){return ve().warn("applyContextExtractionRules \u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",a),t}}function OT(t=[],e=-1){return!Number.isFinite(e)||e<0?t:t.map(r=>{let s=Array.isArray(r?.rows)?r.rows:[];return e===0||s.length<=e?r:{...r,rows:s.slice(s.length-e)}})}function BT(t=[]){return!Array.isArray(t)||t.length===0?"":t.map((e,r)=>{let s=e?.aiInstructions&&typeof e.aiInstructions=="object"?e.aiInstructions:{},o=Array.isArray(e?.columns)?e.columns:[],n=[`\u8868 ${r}: ${G(e?.name,`\u8868${r+1}`)}`,`\u8868\u683C\u8BF4\u660E: ${G(e?.note,"\u65E0")}`,`\u521D\u59CB\u5316\u8BF4\u660E: ${G(s.init,"\u65E0")}`,`\u65B0\u589E\u8BF4\u660E: ${G(s.create,"\u65E0")}`,`\u66F4\u65B0\u8BF4\u660E: ${G(s.update,"\u65E0")}`,`\u5220\u9664\u8BF4\u660E: ${G(s.delete,"\u65E0")}`,"\u5B57\u6BB5\uFF08\u8BF7\u7528\u5217\u7D22\u5F15\u4F5C\u4E3A data key\uFF09:"];return o.forEach((a,i)=>{n.push(`- [${i}]: ${G(a?.title||a?.key,"\u672A\u547D\u540D\u5B57\u6BB5")} \u2014 ${G(a?.description,"\u65E0")}`)}),n.join(`
`)}).join(`

`)}function zT(t,e=[]){if(!t||!Array.isArray(e)||e.length===0)return"";let r=e.map((o,n)=>{let a=G(o?.name,`\u8868${n+1}`),i=t.includes(o,n);return`\u8868 ${n}: ${a} - ${i?"\u5141\u8BB8\u7F16\u8F91":"\u53EA\u8BFB\uFF0C\u7981\u6B62\u4FEE\u6539"}`});return e.some((o,n)=>!t.includes(o,n))&&(r.push(""),r.push('\u3010\u91CD\u8981\u7EA6\u675F\u3011\u6807\u8BB0\u4E3A"\u53EA\u8BFB"\u7684\u8868\u683C\uFF0C\u4F60\u5FC5\u987B\u5728\u8F93\u51FA\u4E2D\u539F\u6837\u4FDD\u7559\u5176\u6240\u6709\u884C\u6570\u636E\uFF0C\u4E0D\u5F97\u65B0\u589E\u3001\u4FEE\u6539\u6216\u5220\u9664\u4EFB\u4F55\u884C\u3002'),r.push("\u5168\u91CF\u8F93\u51FA\u65F6\uFF0C\u53EA\u8BFB\u8868\u683C\u7684 rows \u5FC5\u987B\u4E0E\u8F93\u5165\u4E2D\u7684\u5B8C\u5168\u4E00\u81F4\u3002")),r.join(`
`)}function Lg(t={},e=0,r=[]){let s=t&&typeof t=="object"?t:{},o=s.cells&&typeof s.cells=="object"&&!Array.isArray(s.cells)?s.cells:{},n={},a=Array.isArray(r)?r.map(l=>G(l?.key,"")).filter(Boolean):[];return new Set([...Object.keys(o),...a]).forEach(l=>{n[l]=G(o[l],"")}),{...s,id:Zo(s.id||s.rowId,e),name:G(s.name,""),cells:n}}function Os(t={},e=0){let r=t&&typeof t=="object"?t:{},s=Array.isArray(r.columns)?ne(r.columns):[],o=Array.isArray(r.rows)?r.rows.map((n,a)=>Lg(n,a,s)):[];return{...r,id:Ht(r.id||r.key,e),rows:o}}function lr(t=[]){return Array.isArray(t)?t.map((e,r)=>Os(e,r)):[]}function KT(t=[],e=[],r){let s=lr(t),o=lr(e);if(!r)return o;let n=new Map(o.map((u,y)=>[Ht(u?.id||u?.key,y),u])),a=s.map((u,y)=>({table:u,tableIndex:y,id:Ht(u?.id||u?.key,y)})).filter(({table:u,tableIndex:y})=>r.includes(u,y)),i=new Set,l=new Map;for(let u=0;u<o.length;u++){let y=o[u],p=Ht(y?.id||y?.key,u);n.has(p)&&(l.set(p,y),i.add(p))}let c=0,d=o.filter((u,y)=>{let p=Ht(u?.id||u?.key,y);return!i.has(p)});return s.map((u,y)=>{let p=Ht(u?.id||u?.key,y);if(!r.includes(u,y))return Os(u,y);let f=l.get(p);if(f)return Os(f,y);let g=d[c];return g?(c++,Os({...g,id:u.id||g.id},y)):Os(u,y)})}function UT(t=[],e=[],r,s={}){if(!Array.isArray(t)||!r)return{edits:[],stats:{total:0,passed:0,droppedByScope:0,droppedByLock:0}};let o=lr(e),n=[],a=0,i=0;for(let l of t){let c=Number.isFinite(l?.tableIndex)?l.tableIndex:-1;if(c<0||c>=o.length){a++;continue}let d=o[c];if(!r.includes(d,c)){a++;continue}if(l.op===oo.INSERT_ROW){n.push(l);continue}let u=Number.isFinite(l?.rowIndex)?l.rowIndex:-1;if(u<0||u>=(Array.isArray(d?.rows)?d.rows.length:0)){a++;continue}if(l.op===oo.DELETE_ROW){if(Dc(s,c,u)){i++;continue}n.push(l);continue}n.push(l)}return{edits:n,stats:{total:t.length,passed:n.length,droppedByScope:a,droppedByLock:i}}}function jT(t=[],e){let r=lr(t);return e?r.map((s,o)=>{let n=Array.isArray(s?.columns)?s.columns:[];return e.includes(s,o)?{...Os(s,o),scopeEditable:!0,scopeStatus:"editable"}:{...Os(s,o),scopeEditable:!1,scopeStatus:"readonly",rows:Array.isArray(s?.rows)?s.rows.map((a,i)=>Lg(a,i,n)):[]}}):r}function FT(t,e,r){return{target:{sourceMessageId:G(t?.sourceMessageId),sourceSwipeId:G(t?.sourceSwipeId||t?.effectiveSwipeId),slotBindingKey:G(t?.slotBindingKey),slotRevisionKey:G(t?.slotRevisionKey),slotTransactionId:G(t?.slotTransactionId)},loadMode:G(e?.loadMode),mergeBaseOnly:e?.mergeBaseOnly===!0,resolvedFromMessageId:G(e?.resolvedFromMessageId),resolvedFromRevisionKey:G(e?.resolvedFromRevisionKey),sourceKind:G(e?.sourceKind||e?.state?.meta?.sourceKind),scope:typeof r?.toJSON=="function"?r.toJSON():null,tables:jT(e?.state?.tables,r)}}function Dg(){return WT}function $g(t,e){if(!t||typeof t!="string")return{key:t,source:"fallback"};if(!Array.isArray(e)||e.length===0)return{key:t,source:"fallback"};for(let s of e)if(s?.key===t)return{key:t,source:"direct"};if(/^\d+$/.test(t)){let s=parseInt(t,10);if(s>=0&&s<e.length&&e[s]?.key)return{key:e[s].key,source:"index"}}let r=t.match(/^col(?:_(\d+))?$/i);if(r){let s=r[1]?parseInt(r[1],10)-1:0;if(s>=0&&s<e.length&&e[s]?.key)return{key:e[s].key,source:"col_n"}}return{key:t,source:"fallback"}}function HT(t,e,r,s=null){let o=lr(t||[]),n=r||{},a={direct:0,index:0,col_n:0,fallback:0},i={},l={};if(Array.isArray(e))for(let c of e){let d=Number.isFinite(c?.tableIndex)?c.tableIndex:-1;i[d]=(i[d]||0)+1,l[c?.op||"unknown"]=(l[c?.op||"unknown"]||0)+1}ve().info("applyIncrementalEdits \u603B\u89C8",{totalEdits:e?.length||0,tableCount:o.length,editsByTable:i,editsByOp:l});for(let c of e){let d=c.tableIndex;if(d<0||d>=o.length)continue;let u=o[d];if(!u||!Array.isArray(u.rows)||s&&!s.includes(u,d))continue;if(c.op===oo.INSERT_ROW){let p={id:Qo("row"),name:"",cells:{}};if(c.data&&typeof c.data=="object"){p.name=G(c.data.name,"");let g=Array.isArray(u.columns)?u.columns:[];for(let[h,x]of Object.entries(c.data)){if(h==="name")continue;let{key:v,source:T}=$g(h,g);p.cells[v]=G(x),a[T]=(a[T]||0)+1}}Object.keys(p.cells).length===0&&!p.name&&ve().warn("applyIncrementalEdits: \u63D2\u5165\u7A7A\u884C\uFF08data \u89E3\u6790\u4E3A\u7A7A\uFF09",{tableIndex:d,tableName:u.name,editDataKeys:c.data?Object.keys(c.data):[],editDataPreview:JSON.stringify(c.data||{}).slice(0,200)}),u.rows.push(p);continue}let y=c.rowIndex;if(!(y<0||y>=u.rows.length)){if(c.op===oo.DELETE_ROW){if(Dc(n,d,y))continue;u.rows.splice(y,1);continue}if(c.op===oo.UPDATE_ROW){let p=u.rows[y];if(!p)continue;if(p.id=Zo(p.id||p.rowId,y),p.cells=p.cells||{},c.data&&typeof c.data=="object"){let f=Array.isArray(u.columns)?u.columns:[];for(let[g,h]of Object.entries(c.data)){if(g==="name")continue;let{key:x,source:v}=$g(g,f);Mg(n,d,y,x)||(p.cells[x]=G(h),a[v]=(a[v]||0)+1)}c.data.name!==void 0&&(p.name=G(c.data.name,p.name))}}}}return Object.values(a).some(c=>c>0)&&ve().info("\u5217 key \u89E3\u6790\u7EDF\u8BA1",a),lr(o)}async function YT({executionContext:t,targetSnapshot:e,loadResult:r,config:s,assistantSnapshot:o,fillMode:n,runScope:a}={}){let i=Ot(s),l=n==="incremental"||!n&&i.fillMode!=="full",c=Gp(i,{skipResponseContract:l}),d=FT(e,r,a),u=Array.isArray(o?.tableState?.tables)?lr(o.tableState.tables):[],y=t?.chatHistory||t?.chatMessages||[],{contextDepth:p,contextRoles:f,contextExtractTags:g,contextUseGlobalRules:h,sendLatestRows:x}=i,v=i?.extraction?.regexPresetId||"",T=Pg(y,p,f),L=Pg(y,p,"all"),M=Ng(T,{extractTags:g,useGlobalRules:h,regexPresetId:v}),_=Ng(L,{extractTags:g,useGlobalRules:h,regexPresetId:v}),C=await Vn({worldbooks:i.worldbooks}),W=OT(d.tables,x),q={...d,tables:W},R={...t,toolName:"\u586B\u8868\u5DE5\u4F5C\u53F0",toolId:"tableWorkbench",lastAiMessage:t?.assistantBaseText||t?.lastAiMessage||"",recentMessagesText:M,rawRecentMessagesText:_,toolWorldbookContent:C,tableGuidance:BT(i.tables),tableScopeGuidance:zT(a,d.tables),injectedContext:o?.injectedContext||Ct.getLatestMessageInjectedContext(e?.sourceMessageId),toolContentMacro:JSON.stringify(q,null,2),extractedContent:JSON.stringify(q,null,2),previousToolOutput:JSON.stringify(u,null,2)},S=await Is.buildToolMessages(c,R),U=await Is.buildPromptText(c,R);if(l&&(U+=Dg(),Array.isArray(S)&&S.length>0)){let j=S[S.length-1];j&&typeof j.content=="string"&&(j.content+=Dg())}if(!Array.isArray(S)||S.length===0)throw new Error("\u586B\u8868\u8BF7\u6C42\u6D88\u606F\u6784\u5EFA\u5931\u8D25\u3002");return{toolConfig:c,context:R,requestPayload:d,promptText:U,messages:S,fillMode:l?"incremental":"full",runScope:typeof a?.toJSON=="function"?a.toJSON():null}}async function GT(t,e={},r=null){let s=Ot(e),o=G(s.apiPreset,"");if(o){if(!No(o))throw new Error(`API \u9884\u8BBE\u4E0D\u5B58\u5728: ${o}`);return bi(o,t,{},r)}return Do(t,{},r)}function Er({status:t=_e.IDLE,targetSnapshot:e=null,skipReason:r="",startedAt:s=Date.now(),error:o=""}={}){return{lastAutoRunAt:s,lastAutoStatus:G(t,_e.IDLE),lastAutoMessageId:G(e?.sourceMessageId,""),lastAutoRevisionKey:G(e?.slotRevisionKey,""),lastAutoSkipReason:G(r,""),...o?{lastError:o,lastErrorDetails:[o]}:{}}}function ir(t={},e=et.MANUAL){let r=t&&typeof t=="object"?t:{};return Object.keys(r).length?Yp(r):null}function Ls({targetSnapshot:t=null,startedAt:e=Date.now(),status:r="idle",skipReason:s="",warning:o="",writeback:n=null,aborted:a=!1,stale:i=!1,abortReason:l="",error:c=""}={}){return{isAutoRun:!0,status:r,startedAt:e,targetSnapshot:t,sourceMessageId:G(t?.sourceMessageId,""),sourceSwipeId:G(t?.sourceSwipeId||t?.effectiveSwipeId,""),slotRevisionKey:G(t?.slotRevisionKey,""),writebackStatus:n?.success===!0?"success":o?"warning":"",refreshConfirmed:n?.mirrorResult?.refreshConfirmed===!0,warning:G(o,""),skipReason:G(s,""),aborted:a===!0,stale:i===!0,abortReason:G(l,""),error:G(c,"")}}function ri(t=null){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}async function Cn(t=null,e={}){return Bg({configInput:t,runSource:et.MANUAL,clearBeforeUpdate:e?.clearBeforeUpdate===!0,executionContextBuilder:()=>us({runSource:et.MANUAL}),targetResolver:r=>wn(r,{runSource:et.MANUAL})})}async function Og({messageId:t,swipeId:e="",sourceEvent:r="AUTO_TABLE",configInput:s=null,signal:o=null,shouldAbortWriteback:n=null}={}){return Bg({configInput:s,runSource:et.AUTO,autoMeta:{sourceEvent:r,messageId:G(t,""),swipeId:G(e,""),signal:o,shouldAbortWriteback:n},executionContextBuilder:()=>ps({messageId:t,swipeId:e,runSource:et.AUTO}),targetResolver:a=>wn(a,{runSource:et.AUTO})})}async function Bg({configInput:t=null,runSource:e=et.MANUAL,executionContextBuilder:r,targetResolver:s,autoMeta:o=null,clearBeforeUpdate:n=!1}={}){let a=Ot(t||Ie()),i=Sl(a),l=ya({tables:Array.isArray(a.tables)?a.tables:[]}),c=e===et.AUTO,d=Date.now();if(ve().info(`\u5F00\u59CB\u586B\u8868 [${e}]`,{isAutoRun:c,fillMode:a.fillMode}),!i.valid||!l.valid){let g=[...i.errors,...l.errors];return ve().error("\u914D\u7F6E\u6821\u9A8C\u5931\u8D25",{errors:g}),ir({lastStatus:_e.ERROR,lastRunAt:d,lastDurationMs:0,lastError:g[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002",lastErrorDetails:g,lastValidationSummary:l.summary||{errorCount:g.length,warningCount:0},errorCount:Number(a?.runtime?.errorCount)||0,...c?Er({status:_e.ERROR,startedAt:d,skipReason:"invalid_config",error:g[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"}):{}},e),{success:!1,error:g.join(`
`),errors:g,...c?{meta:Ls({startedAt:d,status:_e.ERROR,skipReason:"invalid_config",error:g[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"})}:{}}}let u=a.runtime||{},y=Array.isArray(a.tables)?a.tables:[];try{let h=xo({})?.template?.tables;if(Array.isArray(h)&&h.length>0){let x=a.tableEnabledOverrides&&typeof a.tableEnabledOverrides=="object"?a.tableEnabledOverrides:{};y=h.map(T=>{let L=T?.id,M=L&&Object.prototype.hasOwnProperty.call(x,L)?x[L]:void 0,_=M!==void 0?M:T.enabled!==!1;if(c&&_){let C=T?.updateConfig?.updateFrequency;Number.isFinite(C)&&C===0&&(_=!1)}return{...T,enabled:_}});let v=y.filter(T=>T.enabled===!1).map(T=>T?.name||T?.id);v.length>0&&ve().info("scopeTables: \u7528\u6237\u7981\u7528\u4E86\u90E8\u5206\u8868",{disabledCount:v.length,disabledNames:v})}}catch{}let p=Mp(a.scope||a,y);if(ve().info("runScope \u5DF2\u89E3\u6790",{mode:p.mode,requestedMode:p.requestedMode,staleScope:p.staleScope,scopeTablesCount:Array.isArray(y)?y.length:0,allowedTableIds:p.allowedTableIds,allTableIds:p.allTableIds,scopeTablesEnabled:Array.isArray(y)?y.map(g=>({id:g?.id,name:g?.name,enabled:g?.enabled})):[]}),p.staleScope&&ve().warn("runScope: \u68C0\u6D4B\u5230 stale scope\uFF08activeTableId/selectedTableIds \u4E0D\u5728\u5F53\u524D tables \u8303\u56F4\u5185\uFF09\uFF0C\u5DF2\u81EA\u52A8 fallback \u5230 enabled",{requestedMode:p.requestedMode,requestedActiveTableId:p.activeTableId,requestedSelectedTableIds:p.selectedTableIds}),(p.mode==="current"||p.mode==="selected")&&p.allowedTableIds.length===0){let g=p.mode==="current"?"\u672A\u6307\u5B9A\u5F53\u524D\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002":"\u672A\u9009\u62E9\u4EFB\u4F55\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002";return ve().warn(g,{mode:p.mode}),ir({lastStatus:_e.ERROR,lastRunAt:d,lastDurationMs:0,lastError:g,lastErrorDetails:[g]},e),{success:!1,error:g,errors:[g]}}let f=null;ir({lastStatus:_e.RUNNING,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},lastScopeMode:G(p.mode,""),...c?Er({status:_e.RUNNING,startedAt:d,skipReason:""}):{}},e);try{if(typeof r!="function")throw new Error("table_update_missing_execution_context_builder");if(typeof s!="function")throw new Error("table_update_missing_target_resolver");let g=await r();ve().info("\u6267\u884C\u4E0A\u4E0B\u6587\u5DF2\u6784\u5EFA");let h=s(g);if(!h)throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u697C\u5C42\u3002");f=h,ve().info("\u76EE\u6807\u6D88\u606F\u5DF2\u89E3\u6790",{sourceMessageId:h.sourceMessageId,slotRevisionKey:h.slotRevisionKey}),c&&ir(Er({status:_e.RUNNING,targetSnapshot:h,startedAt:d,skipReason:""}),e);let x=G(a.autoUpdateTrigger,"assistantMessage");if(c&&(!a.autoUpdateEnabled||x!=="assistantMessage")){let J=a.autoUpdateEnabled?"auto_trigger_not_assistant_message":"auto_update_disabled";return ir(Er({status:_e.SKIPPED,targetSnapshot:h,startedAt:d,skipReason:J}),e),{success:!1,skipped:!0,reason:J,targetSnapshot:h,meta:Ls({targetSnapshot:h,startedAt:d,status:_e.SKIPPED,skipReason:J})}}if(c){let J=ri(o);if(J)return ir(Er({status:_e.ABORTED,targetSnapshot:h,startedAt:d,skipReason:J.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:h,meta:Ls({targetSnapshot:h,startedAt:d,status:_e.ABORTED,skipReason:J.reason,aborted:J.aborted===!0,stale:J.stale===!0,abortReason:J.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}let v=await Wf(h);if(!v?.success)throw new Error(v?.error||"\u76EE\u6807\u89E3\u6790\u8BB0\u5F55\u5931\u8D25");if(n&&Number.isFinite(h?.targetMessageIndex)&&h.targetMessageIndex>=0){ve().info("clearBeforeUpdate \u542F\u7528\uFF0C\u6E05\u7A7A\u76EE\u6807\u697C\u5C42\u6570\u636E",{targetMessageIndex:h.targetMessageIndex});try{let J=await Hf(h.targetMessageIndex);ve().info("clearBeforeUpdate \u5B8C\u6210",J)}catch(J){ve().error("clearBeforeUpdate \u5931\u8D25",J)}}let T=Ds(h.sourceMessageId),L=Array.isArray(y)&&y.length>0?y:a.tables;ve().info("templateTables \u6765\u6E90",{usingActiveTemplate:y!==(Array.isArray(a.tables)?a.tables:[]),tableCount:Array.isArray(L)?L.length:0,firstTableName:L?.[0]?.name||"",firstTableId:L?.[0]?.id||""});let M=Ff(h,{templateTables:L}),_=lr(M?.state?.tables||[]),C=_g(),W=o?.signal||g?.signal||null;ve().info("\u72B6\u6001\u5DF2\u52A0\u8F7D",{loadMode:M?.loadMode,sourceKind:M?.sourceKind,tableCount:_.length});let q=await C.buildRequest({buildRequest:YT},{executionContext:g,targetSnapshot:h,loadResult:M,config:a,assistantSnapshot:T,runScope:p});ve().info("\u8BF7\u6C42\u5DF2\u6784\u5EFA",{messageCount:q?.messages?.length,fillMode:q?.fillMode});let R="",S=null,U=null;for(let J=1;J<=ti;J++){if(W?.aborted)throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88");try{if(R=await C.sendRequest({sendRequest:GT},q,{config:a,abortSignal:W}),ve().info("API \u54CD\u5E94\u5DF2\u6536\u5230",{attempt:J,responseLength:R?.length||0}),S=C.parseResponse({parseResponse:DT},R),ve().info("\u54CD\u5E94\u5DF2\u89E3\u6790",{attempt:J,mode:S?.mode,hasEdits:!!S?.edits,hasTables:!!S?.tables,rawFormat:S?.rawFormat}),!(S?.mode==="incremental"&&Array.isArray(S.edits)&&S.edits.length>0||S?.mode==="full"&&S?.tables))throw new Error("AI \u54CD\u5E94\u4E2D\u672A\u627E\u5230\u6709\u6548\u7684 <tableEdit> \u6807\u7B7E\u6216\u8868\u683C JSON");U=null;break}catch(ye){if(U=ye,ve().warn(`\u586B\u8868 attempt ${J}/${ti} \u5931\u8D25`,{error:ye?.message||String(ye)}),J<ti&&!await LT($T,W))throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88\uFF08\u91CD\u8BD5\u7B49\u5F85\u671F\u95F4\uFF09")}}if(U)throw new Error(`\u586B\u8868\u5931\u8D25\uFF08${ti} \u6B21\u91CD\u8BD5\u540E\u4ECD\u5931\u8D25\uFF09: ${U?.message||String(U)}`);let j,ie=null,Oe=q.fillMode||"full",Te=null;if(S.mode==="incremental"&&S.edits){let J=Rg(M?.state,_),ye=UT(S.edits,_,p,J);Te=ye.stats,j=HT(_,ye.edits,J,p),Oe="incremental",(Te.droppedByScope>0||Te.droppedByLock>0)&&ve().info("scope \u8FC7\u6EE4",Te)}else if(S.mode==="full"&&S.tables){let J=lr(S.tables);j=KT(_,J,p),Oe="full"}else j=lr(_);if(ie=Tg(_,j),ve().info("\u5DEE\u5F02\u5DF2\u8BA1\u7B97",{fillMode:Oe}),c){let J=ri(o);if(J)return ir(Er({status:_e.ABORTED,targetSnapshot:h,startedAt:d,skipReason:J.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88",targetSnapshot:h,meta:Ls({targetSnapshot:h,startedAt:d,status:_e.ABORTED,aborted:J.aborted===!0,stale:J.stale===!0,abortReason:J.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"})}}let ae=await og({targetSnapshot:h,nextTables:j,config:a,loadResult:M,diff:ie,fillMode:Oe,skipNotify:c});if(c){let J=ri(o);if(J)return ir(Er({status:_e.ABORTED,targetSnapshot:h,startedAt:d,skipReason:J.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:h,loadResult:M,request:q,responseText:R,parsed:S,fillMode:Oe,diff:ie,previousTables:_,nextTables:j,runScope:p,state:ae?.state,bindings:ae?.bindings,mirrorResult:ae?.mirrorResult,warning:ae?.warning||"",meta:Ls({targetSnapshot:h,startedAt:d,status:_e.ABORTED,warning:ae?.warning||"",writeback:ae,aborted:J.aborted===!0,stale:J.stale===!0,abortReason:J.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}if(!ae?.success)throw new Error(ae?.error||"\u7ED3\u6784\u5316\u5199\u56DE\u5931\u8D25");let rt=Date.now()-d;ve().info(`\u586B\u8868\u5B8C\u6210 [${Oe}] ${rt}ms`,{success:!0,writebackSuccess:ae?.success,mirrorSuccess:ae?.mirrorResult?.success});let cr={lastStatus:_e.SUCCESS,lastRunAt:Date.now(),lastDurationMs:rt,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:(Number(u.successCount)||0)+1,errorCount:Number(u.errorCount)||0,lastSourceMessageId:G(h.sourceMessageId),lastSlotRevisionKey:G(h.slotRevisionKey),lastLoadMode:G(M.loadMode),lastMirrorApplied:ae?.mirrorResult?.success===!0,lastResolvedFromMessageId:G(M?.resolvedFromMessageId),lastResolvedFromRevisionKey:G(M?.resolvedFromRevisionKey),lastSourceKind:G(M?.sourceKind||M?.state?.meta?.sourceKind),lastScopeMode:G(p.mode,""),lastFillMode:Oe,...c?Er({status:_e.SUCCESS,targetSnapshot:h,startedAt:d,skipReason:""}):{}};return ir(cr,e),{success:!0,targetSnapshot:h,loadResult:M,request:q,responseText:R,parsed:S,fillMode:Oe,diff:ie,previousTables:_,nextTables:j,runScope:p,scopeStats:Te,state:ae.state,bindings:ae.bindings,mirrorResult:ae.mirrorResult,warning:ae.warning||"",...c?{meta:Ls({targetSnapshot:h,startedAt:d,status:_e.SUCCESS,warning:ae.warning||"",writeback:ae})}:{}}}catch(g){let h=Date.now()-d;ve().error(`\u586B\u8868\u5931\u8D25 ${h}ms: ${g?.message||g}`,{stack:g?.stack});let x=c?ri(o):!1,v=g?.name==="AbortError"||g?.message==="\u8BF7\u6C42\u5DF2\u53D6\u6D88"||x?.aborted===!0||x?.stale===!0,T=v?_e.ABORTED:_e.ERROR,L={lastStatus:T,lastRunAt:Date.now(),lastDurationMs:h,lastError:g?.message||String(g),lastErrorDetails:[g?.message||String(g)],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:Number(u.successCount)||0,errorCount:v?Number(u.errorCount)||0:(Number(u.errorCount)||0)+1,lastScopeMode:G(p.mode,""),...c?Er({status:T,targetSnapshot:f,startedAt:d,skipReason:v?x?.reason||"cancelled_before_host_commit":"",error:g?.message||String(g)}):{}};return ir(L,e),{success:!1,error:g?.message||String(g),errors:[g?.message||String(g)],...c?{meta:Ls({targetSnapshot:f,startedAt:d,status:T,skipReason:v?x?.reason||"cancelled_before_host_commit":"",aborted:v,stale:x?.stale===!0,abortReason:v?x?.reason||"cancelled_before_host_commit":"",error:g?.message||String(g)})}:{}}}}var ti,$T,WT,si=N(()=>{ys();ks();Dn();La();H();Ke();Wa();Tn();sr();ng();Za();vg();Sg();da();Eg();$c();io();Jn();Gs();zr();ti=3,$T=5e3;WT=`

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

\u53EA\u8FD4\u56DE <tableEdit> \u6807\u7B7E\uFF0C\u4E0D\u8981\u9644\u52A0\u5176\u4ED6\u5185\u5BB9\u3002`});var Ug={};re(Ug,{WindowManager:()=>oi,closeWindow:()=>Kg,createWindow:()=>Lc,windowManager:()=>Rt});function JT(){if(Rt.stylesInjected)return;Rt.stylesInjected=!0;let t=`
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
  `,e=ur(),r=e.createElement("style");r.id=VT+"_styles",r.textContent=t,(e.head||e.documentElement).appendChild(r)}function Lc(t){let{id:e,title:r="\u7A97\u53E3",content:s="",width:o=900,height:n=700,modal:a=!1,resizable:i=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:d=!0,onClose:u,onReady:y}=t;JT();let p=window.jQuery||window.parent?.jQuery;if(!p)return qT.error("jQuery not available"),null;if(Rt.isOpen(e))return Rt.bringToFront(e),Rt.getWindow(e);let f=window.innerWidth||1200,g=window.innerHeight||800,h=f<=1100,x=null,v=!1;d&&(x=Rt.getState(e),x&&!h&&(v=!0));let T,L;v&&x.width&&x.height?(T=Math.max(400,Math.min(x.width,f-40)),L=Math.max(300,Math.min(x.height,g-40))):(T=Math.max(400,Math.min(o,f-40)),L=Math.max(300,Math.min(n,g-40)));let M=Math.max(20,Math.min((f-T)/2,f-T-20)),_=Math.max(20,Math.min((g-L)/2,g-L-20)),C=l&&!h,W=`
    <div class="yyt-window" id="${e}" style="left:${M}px; top:${_}px; width:${T}px; height:${L}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${XT(r)}</span>
        </div>
        <div class="yyt-window-controls">
          ${C?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
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
  `,q=ur(),R=null;a&&(R=p(`<div class="yyt-window-overlay" data-for="${e}"></div>`),p(q.body).append(R));let S=p(W);p(q.body).append(S),Rt.register(e,S),S.on("mousedown",()=>Rt.bringToFront(e));let U=!1,j={left:M,top:_,width:T,height:L},ie=()=>{j={left:parseInt(S.css("left")),top:parseInt(S.css("top")),width:S.width(),height:S.height()},S.addClass("maximized"),S.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),U=!0},Oe=()=>{S.removeClass("maximized"),S.css({left:j.left+"px",top:j.top+"px",width:j.width+"px",height:j.height+"px"}),S.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),U=!1};S.find(".yyt-window-btn.maximize").on("click",()=>{U?Oe():ie()}),(h&&l||v&&x.isMaximized&&l||c&&l)&&ie(),S.find(".yyt-window-btn.close").on("click",()=>{if(d&&l){let ye={width:U?j.width:S.width(),height:U?j.height:S.height(),isMaximized:U};Rt.saveState(e,ye)}u&&u(),R&&R.remove(),S.remove(),Rt.unregister(e),p(document).off(".yytWindowDrag"+e),p(document).off(".yytWindowResize"+e)}),R&&R.on("click",ye=>{ye.target,R[0]});let Te=!1,ae,rt,cr,J;if(S.find(".yyt-window-header").on("mousedown",ye=>{p(ye.target).closest(".yyt-window-controls").length||U||(Te=!0,ae=ye.clientX,rt=ye.clientY,cr=parseInt(S.css("left")),J=parseInt(S.css("top")),p(document.body).css("user-select","none"))}),p(document).on("mousemove.yytWindowDrag"+e,ye=>{if(!Te)return;let Be=ye.clientX-ae,Mt=ye.clientY-rt;S.css({left:Math.max(0,cr+Be)+"px",top:Math.max(0,J+Mt)+"px"})}),p(document).on("mouseup.yytWindowDrag"+e,()=>{Te&&(Te=!1,p(document.body).css("user-select",""))}),i){let ye=!1,Be="",Mt,Ye,dr,Fe,ko,Io;S.find(".yyt-window-resize-handle").on("mousedown",function(Ar){U||(ye=!0,Be="",p(this).hasClass("se")?Be="se":p(this).hasClass("e")?Be="e":p(this).hasClass("s")?Be="s":p(this).hasClass("w")?Be="w":p(this).hasClass("n")?Be="n":p(this).hasClass("nw")?Be="nw":p(this).hasClass("ne")?Be="ne":p(this).hasClass("sw")&&(Be="sw"),Mt=Ar.clientX,Ye=Ar.clientY,dr=S.width(),Fe=S.height(),ko=parseInt(S.css("left")),Io=parseInt(S.css("top")),p(document.body).css("user-select","none"),Ar.stopPropagation())}),p(document).on("mousemove.yytWindowResize"+e,Ar=>{if(!ye)return;let Cr=Ar.clientX-Mt,Qr=Ar.clientY-Ye,Bs=400,zs=300,Ro=dr,Mo=Fe,Zr=ko,es=Io;if(Be.includes("e")&&(Ro=Math.max(Bs,dr+Cr)),Be.includes("s")&&(Mo=Math.max(zs,Fe+Qr)),Be.includes("w")){let ts=dr-Cr;ts>=Bs&&(Ro=ts,Zr=ko+Cr)}if(Be.includes("n")){let ts=Fe-Qr;ts>=zs&&(Mo=ts,es=Io+Qr)}S.css({width:Ro+"px",height:Mo+"px",left:Zr+"px",top:es+"px"})}),p(document).on("mouseup.yytWindowResize"+e,()=>{ye&&(ye=!1,p(document.body).css("user-select",""))})}return S.on("remove",()=>{p(document).off(".yytWindowDrag"+e),p(document).off(".yytWindowResize"+e)}),y&&setTimeout(()=>y(S),50),S}function Kg(t){let e=Rt.getWindow(t);if(e){let r=window.jQuery||window.parent?.jQuery;r&&(r(`.yyt-window-overlay[data-for="${t}"]`).remove(),r(document).off(".yytWindowDrag"+t),r(document).off(".yytWindowResize"+t)),e.remove(),Rt.unregister(t)}}function XT(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var qT,VT,zg,oi,Rt,Oc=N(()=>{ze();H();qe();qT=I.createScope("WindowManager"),VT="youyou_toolkit_window_manager",zg="window_states",oi=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,r){this.topZIndex++,this.windows.set(e,{$el:r,zIndex:this.topZIndex}),r.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let r=this.windows.get(e);r&&(this.topZIndex++,r.zIndex=this.topZIndex,r.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,r)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,r){let s=this.loadStates();s[e]={...r,updatedAt:Date.now()},Pn.set(zg,s)}loadStates(){return Pn.get(zg)||{}}getState(e){return this.loadStates()[e]||null}},Rt=new oi});function Xe(){return Bc||(Bc=I.createScope("TableDataEditor")),Bc}function Re(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function De(){if(E.isDirty=!0,!!E.$window)try{E.$window.find('[data-action="save"], [data-action="save-global"]').prop("disabled",!1).removeAttr("disabled");let t=E.$window.find(".yyt-tde-toolbar-left").first();t.length&&t.find(".yyt-tde-dirty-badge").length===0&&t.append('<span class="yyt-tde-dirty-badge">\u672A\u4FDD\u5B58</span>')}catch{}}function jg(){if(E.isDirty=!1,!!E.$window)try{E.$window.find('[data-action="save"]').prop("disabled",!0).attr("disabled","disabled"),E.$window.find(".yyt-tde-dirty-badge").remove()}catch{}}function eS(){if(!zc)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tde-styles")){zc=!0;return}let r=t.createElement("style");r.id="yyt-tde-styles",r.textContent=ZT,e.appendChild(r),zc=!0}catch(t){Xe().warn("\u6CE8\u5165\u6570\u636E\u7F16\u8F91\u5668\u6837\u5F0F\u5931\u8D25",t)}}function Kc(){let t=[],e=null,r=!1,s=E._afterSaveGlobalAt&&Date.now()-E._afterSaveGlobalAt<5*60*1e3;try{let o=Ds(null);Xe().info("loadEditorData snapshot",{hasSnapshot:!!o,messageId:o?.message?.message_id??o?.sourceMessageId,chatId:o?.chatId,isolationKey:o?.tableState?.meta?.isolationKey,hasTableState:!!o?.tableState,tableStateTablesLen:Array.isArray(o?.tableState?.tables)?o.tableState.tables.length:null,firstTableNameInSlot:o?.tableState?.tables?.[0]?.name,afterSaveGlobalRecent:s}),!s&&Array.isArray(o?.tableState?.tables)&&o.tableState.tables.length>0&&(t=o.tableState.tables),e=o?{chatId:o.chatId||"",sourceMessageId:o.sourceMessageId||o.message?.message_id||"",sourceSwipeId:o.sourceSwipeId||"",effectiveSwipeId:o.effectiveSwipeId||"",slotBindingKey:o.slotBindingKey||"",slotRevisionKey:o.slotRevisionKey||"",slotTransactionId:o.slotTransactionId||"",traceId:o.traceId||"",targetMessageIndex:o.targetMessageIndex??-1}:null}catch(o){Xe().warn("loadEditorData \u5F02\u5E38",o)}if(t.length===0)try{let n=xo({})?.template?.tables;Array.isArray(n)&&n.length>0&&(t=ne(n),r=!0)}catch(o){Xe().warn("\u4ECE\u6A21\u677F fallback \u5931\u8D25",o)}E.tempData=ne(t)||[],E.targetSnapshot=e,E.isDirty=!1,E.isFromTemplate=r,E._pendingMirrorTag=null,E.currentTableIndex>=E.tempData.length?E.currentTableIndex=E.tempData.length>0?0:-1:E.currentTableIndex<0&&E.tempData.length>0&&(E.currentTableIndex=0)}function Wg(){return`
    <div class="yyt-tde">
      ${Hg()}
      <div class="yyt-tde-content">
        ${tS()}
        <main class="yyt-tde-main">${rS()}</main>
      </div>
    </div>
  `}function Hg(){return`
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
  `}function tS(){let t=E.tempData||[],e=t.map((r,s)=>{let o=r?.name||`\u8868 ${s+1}`,n=Array.isArray(r?.rows)?r.rows.length:0;return`
      <div class="yyt-tde-sheet-item-wrap ${s===E.currentTableIndex?"active":""}">
        <button class="yyt-tde-sheet-item" data-sheet-index="${s}">
          <span class="yyt-tde-sheet-idx">[${s}]</span>
          <span class="yyt-tde-sheet-name">${Re(o)}</span>
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
  `}function rS(){let t=E.tempData||[],e=E.currentTableIndex,r=e>=0&&e<t.length?t[e]:null;return E.mode==="global"?nS():t.length===0?'<div class="yyt-tde-empty">\u5F53\u524D slot \u6CA1\u6709\u8868\u6570\u636E\uFF0C\u6A21\u677F\u4E5F\u672A\u914D\u7F6E\u8868\u3002<br>\u8BF7\u5148\u5728\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u521D\u59CB\u5316\uFF0C\u6216\u5230\u300C\u9884\u8BBE\u7BA1\u7406 \u2192 \u8868\u683C\u6A21\u677F\u300D\u914D\u7F6E\u6A21\u677F\u3002</div>':r?E.mode==="data"?sS(r,e):E.mode==="schema"?oS(r,e):"":'<div class="yyt-tde-empty">\u8BF7\u4ECE\u5DE6\u4FA7\u9009\u62E9\u4E00\u5F20\u8868\u3002</div>'}function sS(t,e){let r=Array.isArray(t?.columns)?t.columns:[],s=Array.isArray(t?.rows)?t.rows:[],o=E.isFromTemplate?'<div class="yyt-tde-schema-hint" style="margin-bottom:12px;">\u5F53\u524D\u663E\u793A<b>\u6A21\u677F\u9ED8\u8BA4\u7ED3\u6784</b>\uFF08slot \u5C1A\u65E0\u6570\u636E\uFF09\u3002\u76F4\u63A5\u6DFB\u52A0\u884C\u6216\u7F16\u8F91\u4F1A\u521B\u5EFA slot \u6570\u636E\uFF1B\u6216\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u586B\u3002</div>':"",n=s.map((a,i)=>{let l=a?.cells||{},c=r.map(d=>{let u=d?.key||"",y=d?.title||u,p=l[u],f=p==null||p==="",g=f?"\uFF08\u7A7A\uFF09":String(p);return`
        <div class="yyt-tde-field">
          <div class="yyt-tde-field-label">${Re(y)}</div>
          <div class="yyt-tde-field-cell ${f?"yyt-tde-field-cell--empty":""}"
               contenteditable
               data-row-index="${i}"
               data-col-key="${Re(u)}">${Re(g)}</div>
        </div>
      `}).join("");return`
      <article class="yyt-tde-card" data-row-index="${i}">
        <header class="yyt-tde-card-header">
          <span class="yyt-tde-card-index">#${i+1}</span>
          <input class="yyt-tde-card-name" value="${Re(a?.name||"")}" data-row-name-index="${i}" placeholder="\u884C\u540D">
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
  `}function oS(t,e){let r=Array.isArray(t?.columns)?t.columns:[],s=t?.sourceData||{},o=t?.aiInstructions||{},n=t?.updateConfig||{},a=E.targetSnapshot?.chatId||"",i=t?.uid||t?.id||"",l={cols:{},rows:{},cells:{},indexCol:!1};try{l=Nc({chatId:a,isolationKey:he.getKey()},i)||l}catch{}let c=l?.cols||{},d=r.map((u,y)=>{let p=u?.key||"",f=p?!!c[p]:!1;return`
    <div class="yyt-tde-schema-row yyt-tde-schema-field${f?" yyt-tde-field-locked":""}" data-field-index="${y}">
      <div class="yyt-tde-schema-field-head">
        <span class="yyt-tde-schema-idx">[${y}]</span>
        <input class="yyt-tde-input yyt-tde-input-title" data-action="field-title" data-field-index="${y}" value="${Re(u?.title||u?.key||"")}" placeholder="\u5B57\u6BB5\u6807\u9898" />
        <input class="yyt-tde-input yyt-tde-input-key" data-action="field-key" data-field-index="${y}" value="${Re(u?.key||"")}" placeholder="key" />
        <select class="yyt-tde-input yyt-tde-input-type" data-action="field-type" data-field-index="${y}">
          ${["text","number","boolean","date","json"].map(g=>`<option value="${g}" ${u?.type===g?"selected":""}>${g}</option>`).join("")}
        </select>
        <button class="yyt-tde-btn-icon ${f?"yyt-tde-locked-btn":""}" data-action="field-lock" data-sheet-uid="${Re(i)}" data-col-key="${Re(p)}" title="${f?"\u5DF2\u9501\u5B9A\uFF1AAI \u4E0D\u4F1A\u6539\u8FD9\u5217\u3002\u70B9\u51FB\u89E3\u9501":"\u9501\u5B9A\u6B64\u5217\uFF1AAI \u6C38\u4E0D\u4FEE\u6539"}"><i class="fa-solid ${f?"fa-lock":"fa-unlock"}"></i></button>
        <button class="yyt-tde-btn-icon yyt-tde-btn-danger" data-action="field-delete" data-field-index="${y}" title="\u5220\u9664\u6B64\u5B57\u6BB5"><i class="fa-solid fa-trash"></i></button>
      </div>
      <textarea class="yyt-tde-input yyt-tde-input-desc" data-action="field-desc" data-field-index="${y}" placeholder="\u5B57\u6BB5\u63CF\u8FF0">${Re(u?.description||"")}</textarea>
    </div>
  `}).join("");return`
    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">\u57FA\u7840\u4FE1\u606F</div>
      <div class="yyt-tde-schema-row">
        <div class="yyt-tde-schema-key">\u8868\u540D</div>
        <div class="yyt-tde-schema-value">
          <input class="yyt-tde-input" data-action="table-name" value="${Re(t?.name||"")}" />
        </div>
      </div>
      <div class="yyt-tde-schema-row">
        <div class="yyt-tde-schema-key">UID</div>
        <div class="yyt-tde-schema-value"><code style="font-size:11px;color:var(--tde-accent);">${Re(t?.uid||t?.id||"")}</code></div>
      </div>
      <div class="yyt-tde-schema-row">
        <div class="yyt-tde-schema-key">\u8868\u8BF4\u660E</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="table-note" placeholder="\u8868\u7528\u9014\u8BF4\u660E + \u5217\u6CE8\u91CA">${Re(t?.note||s?.note||"")}</textarea>
        </div>
      </div>
    </div>

    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">AI \u64CD\u4F5C\u8BF4\u660E (sourceData)</div>
      <div class="yyt-tde-schema-row yyt-tde-schema-sd">
        <div class="yyt-tde-schema-key">\u521D\u59CB\u5316 (init)</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="sd-init" placeholder="\u8868\u4E3A\u7A7A\u65F6 AI \u5E94\u8BE5\u63D2\u5165\u4EC0\u4E48">${Re(o?.init||s?.initNode||"")}</textarea>
        </div>
      </div>
      <div class="yyt-tde-schema-row yyt-tde-schema-sd">
        <div class="yyt-tde-schema-key">\u65B0\u589E (insert)</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="sd-create" placeholder="\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u65B0\u589E\u884C">${Re(o?.create||s?.insertNode||"")}</textarea>
        </div>
      </div>
      <div class="yyt-tde-schema-row yyt-tde-schema-sd">
        <div class="yyt-tde-schema-key">\u66F4\u65B0 (update)</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="sd-update" placeholder="\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u66F4\u65B0\u884C">${Re(o?.update||s?.updateNode||"")}</textarea>
        </div>
      </div>
      <div class="yyt-tde-schema-row yyt-tde-schema-sd">
        <div class="yyt-tde-schema-key">\u5220\u9664 (delete)</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="sd-delete" placeholder="\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u5220\u9664\u884C">${Re(o?.delete||s?.deleteNode||"")}</textarea>
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
          <input class="yyt-tde-input" data-action="uc-groupId" value="${Re(n?.groupId||"")}" placeholder="\u540C\u7EC4 ID \u7684\u8868\u4F1A\u5408\u5E76\u89E6\u53D1" />
          <span class="yyt-tde-hint">\u540C\u7EC4\u540C\u65F6\u89E6\u53D1\uFF0C\u8DE8\u7EC4\u5E76\u884C\uFF08\u7559\u7A7A = \u72EC\u7ACB\u89E6\u53D1\uFF09</span>
        </div>
        <div class="yyt-tde-uc-cell yyt-tde-uc-cell-wide">
          <label>\u8868\u7EA7 API \u9884\u8BBE\u8986\u76D6</label>
          <input class="yyt-tde-input" data-action="uc-apiPreset" value="${Re(n?.apiPreset||"")}" placeholder="\u7559\u7A7A = \u6CBF\u7528\u5168\u5C40\uFF0C\u586B\u9884\u8BBE\u540D = \u8FD9\u5F20\u8868\u7528\u8FD9\u4E2A" />
          <span class="yyt-tde-hint">\u4F8B\uFF1A\u89D2\u8272\u8868\u7528 Claude\u3001\u7EAA\u8981\u8868\u7528 GPT</span>
        </div>
      </div>
    </div>

    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">\u5B57\u6BB5\u5B9A\u4E49 (${r.length})</div>
      ${d||'<div style="color:var(--tde-text-muted);font-size:12px;padding:8px 0;">\u65E0\u5B57\u6BB5</div>'}
      <button class="yyt-tde-btn yyt-tde-btn-add-field" data-action="field-add"><i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u5B57\u6BB5</button>
    </div>
  `}function nS(){let t=Array.isArray(E.tempData)?E.tempData:[];if(t.length===0)return'<div class="yyt-tde-empty">\u65E0\u8868\u683C\u53EF\u914D\u7F6E\u3002\u8BF7\u5148\u6DFB\u52A0\u8868\u683C\u3002</div>';let e="yyt-table-workbench";try{e=Ie()?.mirrorTag||e}catch{}let r=t.map((s,o)=>{let n=s?.exportConfig||{},a=n.entryPlacement||{},i=n.extraIndexPlacement||{};return`
      <div class="yyt-tde-global-card" data-table-index="${o}">
        <div class="yyt-tde-global-card-head">
          <span class="yyt-tde-global-card-name">${Re(s?.name||`\u8868 ${o+1}`)}</span>
          <label class="yyt-tde-toggle-inline">
            <input type="checkbox" data-action="ec-enabled" data-table-index="${o}" ${n.enabled===!0?"checked":""} />
            <span>\u542F\u7528\u72EC\u7ACB\u6CE8\u5165</span>
          </label>
        </div>
        <div class="yyt-tde-global-card-body ${n.enabled===!0?"":"yyt-tde-disabled-section"}">
          <div class="yyt-tde-uc-grid">
            <div class="yyt-tde-uc-cell">
              <label>\u6761\u76EE\u540D (entryName)</label>
              <input class="yyt-tde-input" data-action="ec-entryName" data-table-index="${o}" value="${Re(n.entryName||s?.name||"")}" />
            </div>
            <div class="yyt-tde-uc-cell">
              <label>\u6761\u76EE\u7C7B\u578B (entryType)</label>
              <select class="yyt-tde-input" data-action="ec-entryType" data-table-index="${o}">
                <option value="constant" ${n.entryType==="constant"?"selected":""}>constant (\u5E38\u9A7B)</option>
                <option value="keyword" ${n.entryType==="keyword"?"selected":""}>keyword (\u5173\u952E\u8BCD\u89E6\u53D1)</option>
              </select>
            </div>
            <div class="yyt-tde-uc-cell yyt-tde-uc-cell-wide">
              <label>\u89E6\u53D1\u5173\u952E\u8BCD (keywords)</label>
              <input class="yyt-tde-input" data-action="ec-keywords" data-table-index="${o}" value="${Re(n.keywords||"")}" placeholder="\u7528\u9017\u53F7\u6216\u6362\u884C\u5206\u9694" />
            </div>
            <div class="yyt-tde-uc-cell">
              <label>\u6309\u884C\u62C6\u5206 (splitByRow)</label>
              <select class="yyt-tde-input" data-action="ec-splitByRow" data-table-index="${o}">
                <option value="false" ${n.splitByRow?"":"selected"}>\u5426\uFF08\u6574\u5F20\u8868\u4E00\u4E2A\u6761\u76EE\uFF09</option>
                <option value="true" ${n.splitByRow?"selected":""}>\u662F\uFF08\u6BCF\u884C\u4E00\u4E2A\u6761\u76EE\uFF09</option>
              </select>
            </div>
            <div class="yyt-tde-uc-cell">
              <label>\u9632\u9012\u5F52 (preventRecursion)</label>
              <select class="yyt-tde-input" data-action="ec-preventRecursion" data-table-index="${o}">
                <option value="true" ${n.preventRecursion!==!1?"selected":""}>\u662F</option>
                <option value="false" ${n.preventRecursion===!1?"selected":""}>\u5426</option>
              </select>
            </div>
            <div class="yyt-tde-uc-cell yyt-tde-uc-cell-wide">
              <label>\u6CE8\u5165\u6A21\u677F (injectionTemplate)</label>
              <textarea class="yyt-tde-input" data-action="ec-injectionTemplate" data-table-index="${o}" placeholder="\u4F8B\uFF1A\u4EE5\u4E0B\u662F {{tableName}} \u7684\u6700\u65B0\u6570\u636E\uFF1A{{tableContent}}">${Re(n.injectionTemplate||"")}</textarea>
            </div>
          </div>

          <div class="yyt-tde-schema-heading" style="margin-top:12px;">\u6761\u76EE\u4F4D\u7F6E (entryPlacement)</div>
          <div class="yyt-tde-uc-grid">
            <div class="yyt-tde-uc-cell">
              <label>position</label>
              <select class="yyt-tde-input" data-action="ec-ep-position" data-table-index="${o}">
                ${["before_character_definition","after_character_definition","before_authors_note","after_authors_note"].map(l=>`<option value="${l}" ${(a.position||"before_character_definition")===l?"selected":""}>${l}</option>`).join("")}
              </select>
            </div>
            <div class="yyt-tde-uc-cell">
              <label>depth</label>
              <input type="number" class="yyt-tde-input" data-action="ec-ep-depth" data-table-index="${o}" value="${Number.isFinite(a.depth)?a.depth:2}" />
            </div>
            <div class="yyt-tde-uc-cell">
              <label>order</label>
              <input type="number" class="yyt-tde-input" data-action="ec-ep-order" data-table-index="${o}" value="${Number.isFinite(a.order)?a.order:0}" />
            </div>
          </div>

          <div class="yyt-tde-schema-heading" style="margin-top:12px;">\u989D\u5916\u7D22\u5F15\u4F4D\u7F6E (extraIndexPlacement\uFF0C\u53EF\u9009)</div>
          <div class="yyt-tde-uc-grid">
            <div class="yyt-tde-uc-cell">
              <label>position</label>
              <select class="yyt-tde-input" data-action="ec-exi-position" data-table-index="${o}">
                ${["before_character_definition","after_character_definition","before_authors_note","after_authors_note"].map(l=>`<option value="${l}" ${(i.position||"before_character_definition")===l?"selected":""}>${l}</option>`).join("")}
              </select>
            </div>
            <div class="yyt-tde-uc-cell">
              <label>depth</label>
              <input type="number" class="yyt-tde-input" data-action="ec-exi-depth" data-table-index="${o}" value="${Number.isFinite(i.depth)?i.depth:2}" />
            </div>
            <div class="yyt-tde-uc-cell">
              <label>order</label>
              <input type="number" class="yyt-tde-input" data-action="ec-exi-order" data-table-index="${o}" value="${Number.isFinite(i.order)?i.order:0}" />
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
          <input class="yyt-tde-input" data-action="mirror-tag" value="${Re(e)}" placeholder="\u9ED8\u8BA4: yyt-table-workbench" />
          <span class="yyt-tde-hint">\u5F00\u542F\u5199\u56DE\u6B63\u6587\u65F6\uFF0C\u7528\u6B64 XML \u6807\u7B7E\u5305\u88F9\u8868\u683C\u6570\u636E\u6CE8\u5165\u5230 assistant \u6D88\u606F</span>
        </div>
      </div>
    </div>
    ${r}
  `}function tt(){if(!E.$window)return;E.$window.find(".yyt-window-body").html(Wg()),Yg(E.$window)}function Yg(t){let e=window.jQuery||window.parent?.jQuery;if(!e||!t||!t.on)return;t.off(".tde"),t.on("click.tde",".yyt-tde-mode-switch button[data-mode]",function(){let i=e(this).attr("data-mode");i&&i!==E.mode&&(E.mode=i,tt())}),t.on("click.tde","[data-sheet-index]",function(){let i=Number(e(this).attr("data-sheet-index"));Number.isFinite(i)&&i!==E.currentTableIndex&&(E.currentTableIndex=i,tt())});let r=()=>(Array.isArray(E.tempData)?E.tempData:[])[E.currentTableIndex]||null;t.on("input.tde",'[data-action="table-name"]',function(){let i=r();i&&(i.name=e(this).val(),De())}),t.on("input.tde",'[data-action="table-note"]',function(){let i=r();i&&(i.note=e(this).val(),De())}),Object.entries({"sd-init":"init","sd-create":"create","sd-update":"update","sd-delete":"delete"}).forEach(([i,l])=>{t.on("input.tde",`[data-action="${i}"]`,function(){let c=r();c&&(c.aiInstructions=c.aiInstructions||{},c.aiInstructions[l]=e(this).val(),De())})}),["contextDepth","updateFrequency","batchSize","skipFloors","sendLatestRows"].forEach(i=>{t.on("input.tde",`[data-action="uc-${i}"]`,function(){let l=r();if(!l)return;l.updateConfig=l.updateConfig||{};let c=Number(e(this).val());l.updateConfig[i]=Number.isFinite(c)?c:-1,De()})}),t.on("input.tde",'[data-action="uc-groupId"]',function(){let i=r();i&&(i.updateConfig=i.updateConfig||{},i.updateConfig.groupId=e(this).val(),De())}),t.on("input.tde",'[data-action="uc-apiPreset"]',function(){let i=r();i&&(i.updateConfig=i.updateConfig||{},i.updateConfig.apiPreset=e(this).val(),De())}),t.on("input.tde",'[data-action="field-title"]',function(){let i=r();if(!i)return;let l=Number(e(this).attr("data-field-index"));!Array.isArray(i.columns)||!i.columns[l]||(i.columns[l].title=e(this).val(),De())}),t.on("input.tde",'[data-action="field-key"]',function(){let i=r();if(!i)return;let l=Number(e(this).attr("data-field-index"));!Array.isArray(i.columns)||!i.columns[l]||(i.columns[l].key=e(this).val(),De())}),t.on("change.tde",'[data-action="field-type"]',function(){let i=r();if(!i)return;let l=Number(e(this).attr("data-field-index"));!Array.isArray(i.columns)||!i.columns[l]||(i.columns[l].type=e(this).val(),De())}),t.on("input.tde",'[data-action="field-desc"]',function(){let i=r();if(!i)return;let l=Number(e(this).attr("data-field-index"));!Array.isArray(i.columns)||!i.columns[l]||(i.columns[l].description=e(this).val(),De())}),t.on("click.tde",'[data-action="field-delete"]',function(){let i=r();if(!i)return;let l=Number(e(this).attr("data-field-index"));!Array.isArray(i.columns)||!i.columns[l]||window.confirm(`\u5220\u9664\u5B57\u6BB5\u300C${i.columns[l].title||i.columns[l].key}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u4F1A\u81EA\u52A8\u6E05\u7406\u884C\u6570\u636E\u3002`)&&(i.columns.splice(l,1),De(),tt())}),t.on("click.tde",'[data-action="field-add"]',function(){let i=r();if(!i)return;i.columns=Array.isArray(i.columns)?i.columns:[];let l=new Set(i.columns.map(d=>d?.key).filter(Boolean)),c=i.columns.length+1;for(;l.has(`col_${c}`);)c++;i.columns.push({key:`col_${c}`,title:`\u5B57\u6BB5${c}`,description:"",type:"text",required:!1}),De(),tt()}),t.on("click.tde",'[data-action="field-lock"]',function(i){i.preventDefault(),i.stopPropagation();let l=e(this).attr("data-sheet-uid"),c=e(this).attr("data-col-key");if(!l||!c){A("error","\u5217\u9501\u5B9A\u5931\u8D25\uFF1A\u7F3A\u5C11 sheetUid \u6216 colKey");return}try{let u={chatId:E.targetSnapshot?.chatId||"",isolationKey:he.getKey()},y=Nc(u,l)||{cols:{}},p=!!(y.cols&&y.cols[c]);Ig(u,l,c,!p),A("success",p?`\u5DF2\u89E3\u9501 ${c}`:`\u5DF2\u9501\u5B9A ${c}\uFF08AI \u4E0D\u4F1A\u6539\u8FD9\u5217\uFF09`),Xe().info("field-lock toggled",{sheetUid:l,colKey:c,locked:!p}),tt()}catch(d){Xe().error("field-lock \u5F02\u5E38",d),A("error",`\u9501\u5B9A\u5931\u8D25\uFF1A${d?.message||d}`)}}),t.on("input.tde",'[data-action="mirror-tag"]',function(){E._pendingMirrorTag=e(this).val(),De()});let n=(i,l,c)=>{let d=E.tempData?.[i];d&&(d.exportConfig=d.exportConfig||{},d.exportConfig[l]=c,De())},a=(i,l,c,d)=>{let u=E.tempData?.[i];u&&(u.exportConfig=u.exportConfig||{},u.exportConfig[l]=u.exportConfig[l]||{},u.exportConfig[l][c]=d,De())};t.on("change.tde",'[data-action="ec-enabled"]',function(){n(Number(e(this).attr("data-table-index")),"enabled",e(this).is(":checked")),tt()}),t.on("input.tde",'[data-action="ec-entryName"]',function(){n(Number(e(this).attr("data-table-index")),"entryName",e(this).val())}),t.on("change.tde",'[data-action="ec-entryType"]',function(){n(Number(e(this).attr("data-table-index")),"entryType",e(this).val())}),t.on("input.tde",'[data-action="ec-keywords"]',function(){n(Number(e(this).attr("data-table-index")),"keywords",e(this).val())}),t.on("change.tde",'[data-action="ec-splitByRow"]',function(){n(Number(e(this).attr("data-table-index")),"splitByRow",e(this).val()==="true")}),t.on("change.tde",'[data-action="ec-preventRecursion"]',function(){n(Number(e(this).attr("data-table-index")),"preventRecursion",e(this).val()!=="false")}),t.on("input.tde",'[data-action="ec-injectionTemplate"]',function(){n(Number(e(this).attr("data-table-index")),"injectionTemplate",e(this).val())}),t.on("change.tde",'[data-action="ec-ep-position"]',function(){a(Number(e(this).attr("data-table-index")),"entryPlacement","position",e(this).val())}),t.on("input.tde",'[data-action="ec-ep-depth"]',function(){a(Number(e(this).attr("data-table-index")),"entryPlacement","depth",Number(e(this).val())||0)}),t.on("input.tde",'[data-action="ec-ep-order"]',function(){a(Number(e(this).attr("data-table-index")),"entryPlacement","order",Number(e(this).val())||0)}),t.on("change.tde",'[data-action="ec-exi-position"]',function(){a(Number(e(this).attr("data-table-index")),"extraIndexPlacement","position",e(this).val())}),t.on("input.tde",'[data-action="ec-exi-depth"]',function(){a(Number(e(this).attr("data-table-index")),"extraIndexPlacement","depth",Number(e(this).val())||0)}),t.on("input.tde",'[data-action="ec-exi-order"]',function(){a(Number(e(this).attr("data-table-index")),"extraIndexPlacement","order",Number(e(this).val())||0)}),t.on("click.tde",'[data-action="sheet-move-up"]',function(i){i.stopPropagation();let l=Number(e(this).attr("data-sheet-index"));if(!Array.isArray(E.tempData)||l<=0)return;let c=E.tempData;[c[l-1],c[l]]=[c[l],c[l-1]],E.currentTableIndex===l?E.currentTableIndex=l-1:E.currentTableIndex===l-1&&(E.currentTableIndex=l),De(),tt()}),t.on("click.tde",'[data-action="sheet-move-down"]',function(i){i.stopPropagation();let l=Number(e(this).attr("data-sheet-index"));if(!Array.isArray(E.tempData)||l>=E.tempData.length-1)return;let c=E.tempData;[c[l],c[l+1]]=[c[l+1],c[l]],E.currentTableIndex===l?E.currentTableIndex=l+1:E.currentTableIndex===l+1&&(E.currentTableIndex=l),De(),tt()}),t.on("click.tde",'[data-action="sheet-delete"]',function(i){i.stopPropagation();let l=Number(e(this).attr("data-sheet-index"));if(!Array.isArray(E.tempData)||!E.tempData[l])return;let c=E.tempData[l];window.confirm(`\u5220\u9664\u8868\u300C${c.name||`\u8868 ${l+1}`}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`)&&(E.tempData.splice(l,1),E.currentTableIndex>=E.tempData.length&&(E.currentTableIndex=Math.max(0,E.tempData.length-1)),De(),tt())}),t.on("click.tde",'[data-action="sheet-add"]',function(){let i=window.prompt("\u65B0\u8868\u540D\uFF1A",`\u8868 ${(E.tempData?.length||0)+1}`);if(!i||!i.trim())return;E.tempData=Array.isArray(E.tempData)?E.tempData:[];let l=new Set(E.tempData.map(u=>u?.id).filter(Boolean)),c=E.tempData.length+1,d=`sheet_${Date.now().toString(36)}_${c}`;for(;l.has(d);)c++,d=`sheet_${Date.now().toString(36)}_${c}`;E.tempData.push({id:d,name:i.trim(),enabled:!0,note:"",aiInstructions:{init:"",create:"",update:"",delete:""},updateConfig:{},exportConfig:{enabled:!1},columns:[{key:"col_1",title:"\u5B57\u6BB51",description:"",type:"text",required:!1}],rows:[]}),E.currentTableIndex=E.tempData.length-1,De(),tt()}),t.on("click.tde",'[data-action="reload"]',()=>{if(E.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u91CD\u65B0\u52A0\u8F7D\u5C06\u4E22\u5F03\uFF0C\u786E\u5B9A\uFF1F"))return;let i=E.tempData?.[0];Xe().info("reload \u89E6\u53D1",{before:{tableCount:E.tempData?.length,firstName:i?.name,firstAiInit:i?.aiInstructions?.init?.slice(0,50),firstUcFreq:i?.updateConfig?.updateFrequency},targetSnapshot:{messageId:E.targetSnapshot?.sourceMessageId,isFromTemplate:E.isFromTemplate}}),Kc();let l=E.tempData?.[0];Xe().info("reload \u5B8C\u6210",{after:{tableCount:E.tempData?.length,firstName:l?.name,firstAiInit:l?.aiInstructions?.init?.slice(0,50),firstUcFreq:l?.updateConfig?.updateFrequency,isFromTemplate:E.isFromTemplate}}),tt(),A("success","\u5DF2\u91CD\u65B0\u52A0\u8F7D")}),t.on("click.tde",'[data-action="save"]',async()=>{if(!E.isDirty){A("info","\u6CA1\u6709\u4FEE\u6539");return}try{let i=E.targetSnapshot;if(i?.sourceMessageId||(i=await fc()),!i?.sourceMessageId){A("error","\u65E0\u6CD5\u5B9A\u4F4D\u5F53\u524D\u6D88\u606F\uFF08\u627E\u4E0D\u5230 assistant \u6D88\u606F\uFF09");return}let l=await Ja(i,{tables:ne(E.tempData)||[],meta:{source:"data-editor-manual-save"}},{skipFreshValidation:!0});Xe().info("save-chat commitBoundState \u7ED3\u679C",{success:l?.success,error:l?.error,commitMessageId:l?.sourceMessageId,commitSlotRevisionKey:l?.slotRevisionKey,stateTablesLen:Array.isArray(l?.state?.tables)?l.state.tables.length:null,firstTableInState:l?.state?.tables?.[0]?.name,firstAiInitInState:l?.state?.tables?.[0]?.aiInstructions?.init?.slice(0,50)}),l?.success?(jg(),E.targetSnapshot={chatId:l.state?.chatId||i.chatId,sourceMessageId:l.sourceMessageId,sourceSwipeId:l.state?.sourceSwipeId||i.sourceSwipeId,effectiveSwipeId:i.effectiveSwipeId,slotBindingKey:l.state?.slotBindingKey||i.slotBindingKey,slotRevisionKey:l.slotRevisionKey,slotTransactionId:i.slotTransactionId,traceId:i.traceId,targetMessageIndex:l.messageIndex??i.targetMessageIndex},Array.isArray(l?.state?.tables)&&(E.tempData=ne(l.state.tables)||[],E.isFromTemplate=!1),A("success","\u5DF2\u4FDD\u5B58\u5230 chat"),tt()):A("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.error||"\u672A\u77E5"}`)}catch(i){Xe().error("\u4FDD\u5B58\u5F02\u5E38",i),A("error",`\u4FDD\u5B58\u5F02\u5E38\uFF1A${i?.message||i}`)}}),t.on("click.tde",'[data-action="save-global"]',async()=>{if(!Array.isArray(E.tempData)||E.tempData.length===0){A("info","\u6CA1\u6709\u53EF\u4FDD\u5B58\u7684\u6570\u636E");return}if(window.confirm("\u4FDD\u5B58\u5230\u300C\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u300D\u4F1A\u5F71\u54CD\u540E\u7EED\u6240\u6709 chat \u7684\u65B0\u586B\u8868\uFF08\u5DF2\u6709 slot \u6570\u636E\u4E0D\u53D7\u5F71\u54CD\uFF09\u3002\u7EE7\u7EED\uFF1F"))try{let i=mo();if(!i?.id){A("error","\u6CA1\u6709\u53EF\u7528\u7684\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F");return}let l=(E.tempData||[]).map(d=>({id:d?.id||d?.uid,name:d?.name||"",note:d?.note||"",enabled:d?.enabled!==!1,aiInstructions:d?.aiInstructions||{},updateConfig:d?.updateConfig||{},exportConfig:d?.exportConfig||{},columns:Array.isArray(d?.columns)?ne(d.columns):[],rows:[]})),c=Fr({...i,tables:l});if(c?.success){if(typeof E._pendingMirrorTag=="string"&&E._pendingMirrorTag.trim())try{let d=Ie();at({...d,mirrorTag:E._pendingMirrorTag.trim()})}catch(d){Xe().warn("\u4FDD\u5B58 mirrorTag \u5230 workbench config \u5931\u8D25",d)}E._pendingMirrorTag=null,jg(),Array.isArray(c?.template?.tables)&&(E.tempData=ne(c.template.tables)||[],E.isFromTemplate=!0,E._afterSaveGlobalAt=Date.now()),A("success",`\u5DF2\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u300C${i.name}\u300D`),Xe().info("\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u6210\u529F",{templateId:i.id,name:i.name,tableCount:l.length}),tt()}else A("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${c?.error||"\u672A\u77E5"}`)}catch(i){Xe().error("\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u5F02\u5E38",i),A("error",`\u4FDD\u5B58\u5F02\u5E38\uFF1A${i?.message||i}`)}}),t.on("click.tde",'[data-action="run-now"]',async()=>{if(!(E.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u7ACB\u5373\u586B\u8868\u4F1A\u5148\u4E22\u5F03\u8FD9\u4E9B\u4FEE\u6539\uFF0C\u786E\u5B9A\uFF1F")))try{let i=await Cn();i?.success?(A("success","\u586B\u8868\u5B8C\u6210"),Kc(),tt()):A("error",`\u586B\u8868\u5931\u8D25\uFF1A${i?.error||"\u672A\u77E5"}`)}catch(i){Xe().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",i),A("error",`\u5F02\u5E38\uFF1A${i?.message||i}`)}}),t.on("input.tde","[data-row-index][data-col-key]",function(){let i=Number(e(this).attr("data-row-index")),l=e(this).attr("data-col-key"),c=e(this).text();if(!Number.isFinite(i)||!l)return;let d=E.tempData[E.currentTableIndex];d?.rows?.[i]&&(d.rows[i].cells||(d.rows[i].cells={}),d.rows[i].cells[l]=c,De(),Fg())}),t.on("input.tde","[data-row-name-index]",function(){let i=Number(e(this).attr("data-row-name-index"));if(!Number.isFinite(i))return;let l=E.tempData[E.currentTableIndex];l?.rows?.[i]&&(l.rows[i].name=e(this).val(),De(),Fg())}),t.on("click.tde",'[data-action="delete-row"]',function(){let i=Number(e(this).attr("data-row-index"));if(!Number.isFinite(i)||!window.confirm(`\u786E\u5B9A\u5220\u9664\u7B2C ${i+1} \u884C\uFF1F`))return;let l=E.tempData[E.currentTableIndex];l?.rows&&(l.rows.splice(i,1),De(),tt())}),t.on("click.tde",'[data-action="add-row"]',()=>{let i=E.tempData[E.currentTableIndex];i&&(Array.isArray(i.rows)||(i.rows=[]),i.rows.push({id:Qo("row"),name:"",cells:{}}),De(),tt())})}function Fg(){if(!E.$window)return;let t=E.$window.find(".yyt-tde-toolbar");!t||!t.length||t.replaceWith(Hg())}function Uc(t={}){if(console.log("[YYT][TableDataEditor] openTableDataEditor called",{options:t}),Xe().info("openTableDataEditor \u8C03\u7528",{options:t}),eS(),!(window.jQuery||window.parent?.jQuery)){let s="jQuery \u4E0D\u53EF\u7528\uFF08window.jQuery \u548C window.parent.jQuery \u90FD\u662F undefined\uFF09";console.error("[YYT][TableDataEditor]",s),Xe().error(s);try{A("error",`\u6570\u636E\u7F16\u8F91\u5668\u6253\u5F00\u5931\u8D25\uFF1A${s}`)}catch{}return null}if(console.log("[YYT][TableDataEditor] jQuery \u53EF\u7528"),E.$window&&E.$window.length&&document.body.contains(E.$window[0])){if(t.focusTableUid){let o=(E.tempData||[]).findIndex(n=>(n?.uid||n?.id)===t.focusTableUid);o>=0&&(E.currentTableIndex=o)}return t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(E.mode=t.focusMode),tt(),E.$window}if(Kc(),console.log("[YYT][TableDataEditor] loadEditorData \u5B8C\u6210\uFF0CtempData \u8868\u6570:",E.tempData?.length),t.focusTableUid){let o=(E.tempData||[]).findIndex(n=>(n?.uid||n?.id)===t.focusTableUid);o>=0&&(E.currentTableIndex=o)}t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(E.mode=t.focusMode),console.log("[YYT][TableDataEditor] \u5373\u5C06\u8C03 createWindow");let r;try{r=Lc({id:QT,title:"\u586B\u8868\u6570\u636E\u7F16\u8F91\u5668",content:Wg(),width:1200,height:800,modal:!1,resizable:!0,maximizable:!0,rememberState:!0,onReady:s=>{console.log("[YYT][TableDataEditor] onReady triggered",{$el:!!s}),E.$window=s,Yg(s)},onClose:()=>{E.isDirty&&Xe().warn("\u6570\u636E\u7F16\u8F91\u5668\u5173\u95ED\u65F6\u6709\u672A\u4FDD\u5B58\u4FEE\u6539"),E.$window=null}}),console.log("[YYT][TableDataEditor] createWindow \u8FD4\u56DE:",!!r)}catch(s){console.error("[YYT][TableDataEditor] createWindow \u629B\u9519:",s),Xe().error("createWindow \u629B\u9519",s);try{A("error",`\u521B\u5EFA\u7A97\u53E3\u5931\u8D25\uFF1A${s?.message||s}`)}catch{}return null}return r}var QT,Bc,E,ZT,zc,Gg=N(()=>{Oc();H();Tn();Wa();si();io();sr();Ke();Ss();$c();qe();QT="yyt-table-data-editor";E={$window:null,mode:"data",tempData:null,currentTableIndex:-1,isDirty:!1,isFromTemplate:!1,_pendingMirrorTag:null,targetSnapshot:null};ZT=`
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
.yyt-tde-locked-btn { color: var(--tde-warning, #fbbf24); }
.yyt-tde-locked-btn:hover { color: var(--tde-warning, #fbbf24); background: var(--tde-warning-soft, rgba(251,191,36,0.14)); }
.yyt-tde-field-locked {
  border-left: 2px solid var(--tde-warning, #fbbf24);
  background: var(--tde-warning-soft, rgba(251,191,36,0.06));
}
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
`,zc=!1});function aS(t){return ne(t)}function iS(t,e,r){if(!t||typeof t!="object")return;let s=String(e||"").split(".").filter(Boolean);if(s.length===0)return;let o=t;for(let n=0;n<s.length-1;n++){let a=s[n];(o[a]===null||o[a]===void 0||typeof o[a]!="object")&&(o[a]={}),o=o[a]}o[s[s.length-1]]=r}function ce(){return jc||(jc=I.createScope("TableWorkbenchView")),jc}async function lS(){try{let t=await an();if(!t)return xt.kind=null,xt.lastError="Provider \u4E0D\u53EF\u7528",xt;if(xt.kind=t.kind,typeof t.query=="function"){let e=await t.query({statement:"SELECT COUNT(*) as c FROM table_sheets"}),r=await t.query({statement:"SELECT COUNT(*) as c FROM table_rows"});xt.sheetCount=e?.rows?.[0]?.c??0,xt.rowCount=r?.rows?.[0]?.c??0}xt.lastError=null,xt.lastRefreshAt=Date.now(),ce().info("Provider stats \u5DF2\u5237\u65B0",{...xt})}catch(t){xt.lastError=t?.message||String(t),ce().warn("Provider stats \u5237\u65B0\u5931\u8D25",t)}return xt}function cS(){if(!xt.kind){let t=yo();t?.kind&&(xt.kind=t.kind)}return xt}function X(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Vg(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function Xg(t){let{config:e,activeTemplate:r,isolationKey:s,tablesPreview:o,templateArchives:n=[],providerStats:a={}}=t,i=e?.runtime||{},l=i.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":i.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":i.lastStatus==="running"?"\u8FD0\u884C\u4E2D":"\u5F85\u547D",c=i.lastStatus==="success"?"success":i.lastStatus==="failed"?"error":"muted",d=e?.automation?.enabled?"\u81EA\u52A8":"\u624B\u52A8",u=e?.apiPreset||"\u8DDF\u968F\u4E3B API",y=e?.bypassPresetId?"\u5DF2\u7ED1\u5B9A":"\u65E0",p=Array.isArray(n)?n.length:0;return`
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
          <button class="yyt-tww-btn yyt-tww-btn-small" data-action="export-templates" title="\u5BFC\u51FA\u6240\u6709\u7528\u6237\u6A21\u677F\u4E3A JSON\uFF08\u542B\u5168\u5C40\u6A21\u677F\u7684\u4FEE\u6539\u526F\u672C\uFF09"><i class="fa-solid fa-download"></i> \u5BFC\u51FA\u6A21\u677F</button>
          ${r?.mode&&r.mode!==Je.INHERIT_GLOBAL?`<button class="yyt-tww-btn yyt-tww-btn-small" data-action="reset-template-scope" title="\u672C chat \u5F53\u524D\u662F\u300C${r.mode===Je.CHAT_OVERRIDE?"chat \u4E13\u5C5E":"\u94FE\u63A5\u9884\u8BBE"}\u300D\u6A21\u5F0F\uFF0C\u70B9\u51FB\u6062\u590D\u4E3A\u300C\u7EE7\u627F\u5168\u5C40\u300D"><i class="fa-solid fa-rotate-right"></i> \u6062\u590D\u7EE7\u627F</button>`:""}
          <button class="yyt-tww-btn yyt-tww-btn-small yyt-tww-btn-danger" data-action="reset-chat-data" title="\u6E05\u7A7A\u5F53\u524D\u804A\u5929\u6240\u6709\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\uFF0C\u8BA9\u6A21\u677F\u5207\u6362\u540E\u4ECE\u5934\u5F00\u59CB"><i class="fa-solid fa-trash-can"></i> \u6E05\u7A7A chat \u6570\u636E</button>
        </div>
      </div>
      <div class="yyt-tww-hero-desc">\u4ECE\u5BF9\u8BDD\u5185\u5BB9\u63D0\u53D6\u7ED3\u6784\u5316\u6570\u636E\uFF0C\u81EA\u52A8\u7EF4\u62A4\u8868\u683C\u72B6\u6001\u3002</div>
      <div class="yyt-tww-hero-chips">
        <span class="yyt-tww-chip mode">\u6A21\u5F0F ${X(d)}</span>
        <span class="yyt-tww-chip preset">\u6A21\u677F: ${X(r?.template?.name||"\u9ED8\u8BA4")}</span>
        ${(()=>{let f=r?.mode;if(f===Je.CHAT_OVERRIDE)return'<span class="yyt-tww-chip preset" title="\u672C chat \u7528\u4E86\u72EC\u7ACB\u6A21\u677F\u526F\u672C\uFF08\u4FEE\u6539\u4E0D\u5F71\u54CD\u5168\u5C40\uFF09\u3002\u53EF\u5728\u300C\u91CD\u7F6E\u8303\u56F4\u300D\u6309\u94AE\u65C1\u7684\u83DC\u5355\u6062\u590D\u7EE7\u627F\u5168\u5C40\u3002">\u4F5C\u7528\u57DF: chat \u4E13\u5C5E</span>';if(f===Je.PRESET_LINK){let g=r?.source?.presetName||"";return`<span class="yyt-tww-chip preset" title="\u672C chat \u94FE\u63A5\u5230\u5168\u5C40\u9884\u8BBE ${X(g)}\uFF0C\u8DDF\u968F\u8BE5\u9884\u8BBE\u53D8\u5316\u3002">\u4F5C\u7528\u57DF: \u94FE\u63A5 ${X(g)}</span>`}return'<span class="yyt-tww-chip preset" title="\u672C chat \u8DDF\u968F\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u3002">\u4F5C\u7528\u57DF: \u7EE7\u627F\u5168\u5C40</span>'})()}
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
      ${yS(n)}
    </div>

    <!-- Runtime stats -->
    <div class="yyt-tww-stat-row">
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u72B6\u6001</span>
        <span class="yyt-tww-stat-value ${c}">${X(l)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u6700\u8FD1\u8FD0\u884C</span>
        <span class="yyt-tww-stat-value muted">${X(Vg(i.lastRunAt))}</span>
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
        ${dS(t)}
      </section>

      <section class="yyt-tww-section" data-section="behavior">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-arrows-rotate"></i></span>
          \u586B\u8868\u884C\u4E3A
        </div>
        ${uS(t)}
      </section>

      <section class="yyt-tww-section" data-section="overview">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-table-cells"></i></span>
          \u8868\u683C\u6982\u89C8
          <span class="yyt-tww-section-action">
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="open-editor"><i class="fa-solid fa-table-cells"></i> \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668</button>
          </span>
        </div>
        ${fS(t.tablesPreview)}
      </section>

    </div>
  </div>
  `}function dS(t){let{config:e,allTemplates:r,apiPresets:s,bypassPresets:o,regexPresets:n,worldbookPresets:a,activeTemplate:i}=t,l=r.map(T=>`<option value="${X(T.id)}" ${i?.source?.templateId===T.id?"selected":""}>${X(T.name)}</option>`).join(""),c=e?.autoUpdateEnabled===!0?"auto":"manual",d=e?.apiPreset||"",u='<option value="">\u2014\u2014 \u8DDF\u968F\u4E3B API \u2014\u2014</option>'+s.map(T=>`<option value="${X(T.name)}" ${T.name===d?"selected":""}>${X(T.name)}</option>`).join(""),y=e?.bypass?.presetId||"",p='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+o.map(T=>`<option value="${X(T.id)}" ${T.id===y?"selected":""}>${X(T.name)}${T.isDefault?" [\u9ED8\u8BA4]":""}</option>`).join(""),f=e?.extraction?.regexPresetId||"",g='<option value="">\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014</option>'+n.map(T=>`<option value="${X(T.id)}" ${T.id===f?"selected":""}>${X(T.name)}</option>`).join(""),h=e?.worldbooks?.presetId||"",x='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+a.map(T=>`<option value="${X(T.id)}" ${T.id===h?"selected":""}>${X(T.name)}</option>`).join(""),v=e?.runScope||"enabled";return`
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
  `}function uS(t){let{config:e}=t,r=e?.fillMode||"incremental",s=Number(e?.contextDepth)||3,o=e?.worldbookSync?.enabled===!0,n=e?.mirrorToMessage===!0;return`
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

    ${pS(t)}

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">\u5199\u56DE\u6B63\u6587\u955C\u50CF</div>
        <div class="yyt-tww-toggle-desc">\u5728\u52A9\u624B\u6D88\u606F\u672B\u5C3E\u955C\u50CF\u5199\u5165 markdown \u65B9\u4FBF\u624B\u52A8\u67E5\u9605\u3002</div>
      </div>
      <div class="yyt-tww-toggle ${n?"on":""}" data-toggle="mirrorToMessage"></div>
    </div>
  `}function pS(t){let e=t?.config?.worldbookSync||{};if(!(e.enabled===!0))return"";let s=String(e.targetBook||""),o=String(t?.boundLorebook||""),n=t?.chatOpen===!0,a=s||o,i=Array.isArray(t.availableWorldbooks)?t.availableWorldbooks:[],l=e.wrapperConfig||{},c=l.enabled!==!1,d=String(l.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55"),u=String(l.wrapperHint||""),y=l.wrapperPlacement||{},p=String(y.position||"before_character_definition"),f=Number.isFinite(y.depth)?y.depth:2,g=Number.isFinite(y.order)?y.order:5e4,h;if(!n)h='<option value="">\u2014\u2014 \u8BF7\u5148\u6253\u5F00\u804A\u5929 \u2014\u2014</option>';else if(i.length===0)h=`<option value="${X(a)}">${a?X(a):"\u2014\u2014 \u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014\u2014"}</option>`;else{let T=i.map(M=>{let _=typeof M=="string"?M:M?.name||"";return`<option value="${X(_)}" ${_===a?"selected":""}>${X(_)}${_===o?"\uFF08\u89D2\u8272\u5361\u7ED1\u5B9A\uFF09":""}</option>`}).join("");h=(o?`<option value="">\u2014\u2014 \u89D2\u8272\u5361\u7ED1\u5B9A\uFF1A${X(o)} \u2014\u2014</option>`:'<option value="">\u2014\u2014 \u9009\u62E9 \u2014\u2014</option>')+T}return`
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
        <input class="yyt-input yyt-tww-ctrl" type="number" data-binding="worldbookWrapperDepth" value="${X(f)}" min="0">
        <input class="yyt-input yyt-tww-ctrl" type="number" data-binding="worldbookWrapperOrder" value="${X(g)}" min="0">
      </div>
    </div>
  `}function yS(t=[]){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D chat \xD7 isolationKey \u6682\u65E0\u5F52\u6863\uFF08\u4EC5\u5728\u5207\u6362\u6A21\u677F\u65F6\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF09</div>':`
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
  `}function fS(t){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D slot \u6682\u65E0\u8868\u6570\u636E\u3002\u8BF7\u5148"\u7ACB\u5373\u586B\u8868"\u6216\u5728\u6570\u636E\u7F16\u8F91\u5668\u4E2D\u521D\u59CB\u5316\u3002</div>':`
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
  `}function Qg(){let t=(()=>{try{return Ie()}catch{return{}}})(),e=(()=>{try{return bo()||[]}catch{return[]}})(),r=(()=>{try{return xo({})}catch{return null}})(),s=(()=>{try{return Ir()||[]}catch{return[]}})(),o=(()=>{try{return pn()||[]}catch{return[]}})(),n=(()=>{try{return we.listPresets()||[]}catch{return[]}})(),a=(()=>{try{return pt.listPresets()||[]}catch{return[]}})(),i=(()=>{try{return he.getKey()}catch{return""}})(),l=gS(),c=mS(),d=hS(),u=null,y=0;try{let x=Ds(null);Array.isArray(x?.tableState?.tables)&&x.tableState.tables.length>0&&(u=x.tableState.tables,y=Number(x.tableState.updatedAt)||0)}catch{}let p=u||r?.template?.tables||t?.tables||[],f=t?.tableEnabledOverrides&&typeof t.tableEnabledOverrides=="object"?t.tableEnabledOverrides:{},g=p.map(x=>{let v=x?.id||"",T=v&&Object.prototype.hasOwnProperty.call(f,v)?f[v]:void 0;return{id:v,name:x?.name||"",enabled:T!==void 0?T:x?.enabled!==!1,rowCount:Array.isArray(x?.rows)?x.rows.length:0,colCount:Array.isArray(x?.columns)?x.columns.length:0,updatedHint:u&&y>0?Vg(y):""}}),h=(()=>{try{return $y()||[]}catch{return[]}})();return{config:t,activeTemplate:r,allTemplates:e,apiPresets:s,bypassPresets:o,regexPresets:n,worldbookPresets:a,availableWorldbooks:l,boundLorebook:c,chatOpen:d,isolationKey:i,tablesPreview:g,templateArchives:h,providerStats:cS()}}function gS(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(!e)return[];if(typeof e.getLorebooks=="function"){let r=e.getLorebooks();if(Array.isArray(r))return r}if(typeof e.getLorebookList=="function"){let r=e.getLorebookList();if(Array.isArray(r))return r}}catch(t){ce().warn("loadAvailableWorldbooks \u5931\u8D25",t)}return[]}function mS(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e){if(typeof e.getCurrentCharPrimaryLorebook=="function"){let s=e.getCurrentCharPrimaryLorebook();if(typeof s=="string"&&s)return s}if(typeof e.getCharLorebooks=="function")try{let s=e.getCharLorebooks();if(s?.primary)return String(s.primary)}catch{}if(typeof e.getChatLorebook=="function")try{let s=e.getChatLorebook();if(typeof s=="string"&&s)return s}catch{}}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let s=r.characters?.[r.characterId],o=s?.data?.character_book?.name||s?.data?.extensions?.world||s?.world;if(typeof o=="string"&&o)return o}}catch(t){ce().warn("loadCharacterBoundLorebook \u5931\u8D25",t)}return""}function hS(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e&&typeof e.getCurrentChatId=="function"){let s=e.getCurrentChatId();return!!(s&&String(s).trim()&&String(s).trim()!=="default_chat")}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let s=r.chat;if(Array.isArray(s)&&s.length>0||r.chatId)return!0}}catch{}return!1}function Fc(t,e){let r=window.jQuery||window.parent?.jQuery;if(!r||!t||!t.on){ce().warn("bindWorkbenchEvents: jQuery \u6216 $container \u4E0D\u53EF\u7528");return}t.off(".tww"),qg||(qg=!0,lS().then(()=>{typeof e=="function"&&e()}).catch(()=>{})),t.on("click.tww",'[data-action="run-now"]',async()=>{try{let n=await Cn();n?.success?A("success","\u586B\u8868\u5B8C\u6210"):A("error",`\u586B\u8868\u5931\u8D25\uFF1A${n?.error||"\u672A\u77E5"}`),typeof e=="function"&&e()}catch(n){ce().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",n),A("error",`\u5F02\u5E38\uFF1A${n?.message||n}`)}}),t.on("click.tww",'[data-action="run-clear"]',async()=>{if(window.confirm("\u91CD\u586B\u4F1A\u6E05\u7A7A\u5F53\u524D\u6D88\u606F\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\u5E76\u91CD\u65B0\u751F\u6210\uFF0C\u786E\u5B9A\uFF1F"))try{let n=await Cn(null,{clearBeforeUpdate:!0});n?.success?A("success","\u91CD\u586B\u5B8C\u6210"):A("error",`\u91CD\u586B\u5931\u8D25\uFF1A${n?.error||"\u672A\u77E5"}`),typeof e=="function"&&e()}catch(n){ce().error("\u91CD\u586B\u5F02\u5E38",n),A("error",`\u5F02\u5E38\uFF1A${n?.message||n}`)}}),t.on("click.tww",'[data-action="reset-run-scope"]',()=>{try{let n=Ie();at({...n,runScope:"enabled",scope:{...n.scope||{},mode:"enabled",activeTableId:"",selectedTableIds:[]}}),A("success","\u5DF2\u91CD\u7F6E\u8303\u56F4\u4E3A\u300C\u6240\u6709\u542F\u7528\u8868\u300D"),ce().info("\u7528\u6237\u91CD\u7F6E runScope \u4E3A enabled"),typeof e=="function"&&e()}catch(n){ce().error("\u91CD\u7F6E\u8303\u56F4\u5F02\u5E38",n),A("error",`\u91CD\u7F6E\u5931\u8D25\uFF1A${n?.message||n}`)}}),t.on("click.tww",'[data-action="toggle-chips"]',function(){let n=t.find(".yyt-tww-hero-chips")[0];if(!n)return;let a=n.classList.toggle("yyt-tww-hero-chips-expanded");this.textContent=a?"\u25BE":"\u25B8"}),t.on("click.tww",'[data-action="export-templates"]',()=>{try{let n=_a(),a=JSON.stringify(n,null,2),i=new Blob([a],{type:"application/json"}),l=URL.createObjectURL(i),c=document.createElement("a");c.href=l,c.download=`youyou-table-templates-${Date.now()}.json`,document.body.appendChild(c),c.click(),document.body.removeChild(c),URL.revokeObjectURL(l);let d=Array.isArray(n?.templates)?n.templates.length:0;A("success",`\u5DF2\u5BFC\u51FA ${d} \u4E2A\u6A21\u677F\u5230\u4E0B\u8F7D\u6587\u4EF6\u5939`),ce().info("export-templates \u5B8C\u6210",{count:d})}catch(n){ce().error("export-templates \u5F02\u5E38",n),A("error",`\u5BFC\u51FA\u5931\u8D25\uFF1A${n?.message||n}`)}}),t.on("click.tww",'[data-action="reset-template-scope"]',()=>{if(window.confirm("\u6062\u590D\u672C chat \u7684\u6A21\u677F\u4F5C\u7528\u57DF\u5230\u300C\u7EE7\u627F\u5168\u5C40\u300D\uFF1F\u5F53\u524D\u72B6\u6001\u4F1A\u5148\u81EA\u52A8\u5F52\u6863\uFF0C\u53EF\u5728\u300C\u5F52\u6863\u300D\u4E2D\u6062\u590D\u3002"))try{let n=Dy({archive:!0});n?.success?(A("success","\u5DF2\u6062\u590D\u4E3A\u7EE7\u627F\u5168\u5C40"),ce().info("reset-template-scope \u5B8C\u6210"),typeof e=="function"&&e()):A("error",`\u6062\u590D\u5931\u8D25\uFF1A${n?.error||"\u672A\u77E5"}`)}catch(n){ce().error("reset-template-scope \u5F02\u5E38",n),A("error",`\u5F02\u5E38\uFF1A${n?.message||n}`)}}),t.on("click.tww",'[data-action="reset-chat-data"]',async()=>{if(window.confirm("\u5C06\u6E05\u7A7A\u5F53\u524D\u804A\u5929\u6240\u6709\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\uFF08\u4E0D\u5F71\u54CD\u6A21\u677F/\u914D\u7F6E\uFF09\u3002\u4E0B\u6B21\u586B\u8868\u4F1A\u6309\u5F53\u524D\u6FC0\u6D3B\u6A21\u677F\u4ECE\u5934\u5F00\u59CB\u3002\u786E\u5B9A\uFF1F"))try{let n=await Yf();n?.success?(A("success",`\u5DF2\u6E05\u7A7A ${n.touched||0} \u6761\u6D88\u606F\u7684\u8868\u683C\u6570\u636E`),ce().info("\u6E05\u7A7A chat \u6570\u636E\u5B8C\u6210",n)):A("error","\u6E05\u7A7A\u5931\u8D25"),typeof e=="function"&&e()}catch(n){ce().error("\u6E05\u7A7A chat \u6570\u636E\u5F02\u5E38",n),A("error",`\u5F02\u5E38\uFF1A${n?.message||n}`)}}),t.on("click.tww",'[data-action="open-editor"]',n=>{n.preventDefault(),console.log("[YYT][TableWorkbench] open-editor button clicked"),ce().info("open-editor button clicked");try{let a=Uc();console.log("[YYT][TableWorkbench] openTableDataEditor returned:",a),ce().info("openTableDataEditor \u8C03\u7528\u5B8C\u6210",{hasReturn:!!a})}catch(a){console.error("[YYT][TableWorkbench] \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38:",a),ce().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",a),A("error",`\u6253\u5F00\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("click.tww","[data-table-index]",function(n){if(r(n.target).closest('[data-action="toggle-table-enabled"]').length>0||r(n.target).is("label, label *"))return;n.preventDefault();let a=Number(r(this).attr("data-table-index"));if(!(!Number.isFinite(a)||a<0)){console.log("[YYT][TableWorkbench] table card clicked, idx=",a);try{let l=Ds(null)?.tableState?.tables?.[a],c=Uc({focusTableUid:l?.uid||l?.id||""});console.log("[YYT][TableWorkbench] openTableDataEditor returned:",c)}catch(i){console.error("[YYT][TableWorkbench] \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38:",i),ce().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",i),A("error",`\u6253\u5F00\u5931\u8D25\uFF1A${i?.message||i}`)}}}),t.on("click.tww",'[data-action="toggle-archives"]',function(n){n.preventDefault();let a=t.find("[data-archives-panel]").first();a.length&&(a.css("display")==="none"?a.css("display","block"):a.css("display","none"))}),t.on("click.tww",'[data-action="restore-archive"]',async function(n){n.stopPropagation();let a=Number(r(this).attr("data-archive-index"));if(!(!Number.isFinite(a)||a<0)&&window.confirm(`\u6062\u590D\u5F52\u6863 #${a}\uFF1F\u6062\u590D\u524D\u4F1A\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF0C\u53EF\u518D\u6B21\u6062\u590D\u56DE\u6765\u3002`))try{let i=Ly(a);i?.success?(A("success","\u5DF2\u6062\u590D\u5F52\u6863"),ce().info("restoreChatTemplateArchive \u6210\u529F",{index:a,scopeState:i.scopeState})):A("error",`\u6062\u590D\u5931\u8D25\uFF1A${i?.error||"\u672A\u77E5"}`),typeof e=="function"&&e()}catch(i){ce().error("\u6062\u590D\u5F52\u6863\u5F02\u5E38",i),A("error",`\u5F02\u5E38\uFF1A${i?.message||i}`)}}),t.on("change.tww",'[data-action="toggle-table-enabled"]',function(n){n.stopPropagation();let a=r(this).attr("data-table-id"),i=r(this).is(":checked");if(a)try{let l=Ie(),c={...l.tableEnabledOverrides||{}};c[a]=i,at({...l,tableEnabledOverrides:c}),A("success",i?`\u5DF2\u542F\u7528 ${a}`:`\u5DF2\u7981\u7528 ${a}`),ce().info("toggle \u5355\u8868\u6FC0\u6D3B",{tableId:a,enabled:i}),typeof e=="function"&&e()}catch(l){ce().error("toggle \u5355\u8868\u6FC0\u6D3B\u5F02\u5E38",l),A("error",`\u5207\u6362\u5931\u8D25\uFF1A${l?.message||l}`)}}),t.on("change.tww",'[data-binding="template"]',function(){let n=r(this).val();try{Vl(n);let a=Ie();at({...a,activeTemplate:n}),A("success","\u6A21\u677F\u5DF2\u5207\u6362"),typeof e=="function"&&e()}catch(a){ce().error("\u5207\u6362\u6A21\u677F\u5F02\u5E38",a),A("error",`\u5207\u6362\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("change.tww",'[data-binding="triggerMode"]',function(){let n=r(this).val();try{let a=Ie();at({...a,autoUpdateEnabled:n==="auto"}),A("success",n==="auto"?"\u5DF2\u5207\u6362\u4E3A\u81EA\u52A8\u6A21\u5F0F":"\u5DF2\u5207\u6362\u4E3A\u624B\u52A8\u6A21\u5F0F"),typeof e=="function"&&e()}catch(a){ce().error("\u5207\u6362\u89E6\u53D1\u6A21\u5F0F\u5F02\u5E38",a),A("error",`\u5207\u6362\u5931\u8D25\uFF1A${a?.message||a}`)}});let s=[{sel:'[data-binding="apiPreset"]',key:"apiPreset"},{sel:'[data-binding="runScope"]',key:"runScope"},{sel:'[data-binding="fillMode"]',key:"fillMode"}];for(let{sel:n,key:a}of s)t.on("change.tww",n,function(){let i=r(this).val();try{let l=Ie(),c={...l,[a]:i};a==="runScope"&&(c.scope={...l.scope||{},mode:i,...i==="enabled"?{activeTableId:"",selectedTableIds:[]}:{}}),at(c),A("success","\u5DF2\u4FDD\u5B58")}catch(l){ce().error(`\u4FDD\u5B58 ${a} \u5F02\u5E38`,l),A("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`)}});t.on("change.tww",'[data-binding="bypassPreset"]',function(){let n=r(this).val();try{let a=Ie();at({...a,bypass:{...a.bypass||{},presetId:n,enabled:!!n}}),A("success","Ai \u6307\u4EE4\u9884\u8BBE\u5DF2\u4FDD\u5B58")}catch(a){ce().error("\u4FDD\u5B58 bypass \u5F02\u5E38",a),A("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("change.tww",'[data-binding="regexPreset"]',function(){let n=r(this).val();try{let a=Ie();at({...a,extraction:{...a.extraction||{},regexPresetId:n}}),A("success","\u6B63\u5219\u9884\u8BBE\u5DF2\u66F4\u65B0")}catch(a){ce().error("\u4FDD\u5B58 regexPreset \u5F02\u5E38",a),A("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("change.tww",'[data-binding="worldbookPreset"]',function(){let n=r(this).val();try{let a=Ie();at({...a,worldbooks:{...a.worldbooks||{},presetId:n}}),A("success","\u4E16\u754C\u4E66\u9884\u8BBE\u5DF2\u66F4\u65B0")}catch(a){ce().error("\u4FDD\u5B58 worldbookPreset \u5F02\u5E38",a),A("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("change.tww",'[data-binding="contextDepth"]',function(){let n=Math.max(1,parseInt(r(this).val(),10)||3);try{let a=Ie();at({...a,contextDepth:n}),A("success","\u5DF2\u4FDD\u5B58")}catch(a){ce().error("\u4FDD\u5B58 contextDepth \u5F02\u5E38",a),A("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("click.tww",'[data-toggle="worldbookSync"]',function(){let n=r(this),a=n.hasClass("on"),i=!a;n.toggleClass("on",i);try{let l=Ie();at({...l,worldbookSync:{...l.worldbookSync||{},enabled:i}}),A("success",i?"\u5DF2\u542F\u7528\u4E16\u754C\u4E66\u540C\u6B65":"\u5DF2\u505C\u7528\u4E16\u754C\u4E66\u540C\u6B65"),typeof e=="function"&&e()}catch(l){n.toggleClass("on",a),ce().error("toggle worldbookSync \u5F02\u5E38",l),A("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`)}}),t.on("click.tww",'[data-toggle="worldbookWrapperEnabled"]',function(){let n=r(this),a=n.hasClass("on"),i=!a;n.toggleClass("on",i);try{let l=Ie(),c=l.worldbookSync||{};at({...l,worldbookSync:{...c,wrapperConfig:{...c.wrapperConfig||{},enabled:i}}}),A("success",i?"\u5DF2\u542F\u7528 Wrapper \u5305\u88F9":"\u5DF2\u505C\u7528 Wrapper")}catch(l){n.toggleClass("on",a),ce().error("toggle worldbookWrapperEnabled \u5F02\u5E38",l)}});let o=[{sel:'[data-binding="worldbookTargetBook"]',path:"targetBook",type:"string"},{sel:'[data-binding="worldbookWrapperTag"]',path:"wrapperConfig.wrapperTag",type:"string"},{sel:'[data-binding="worldbookWrapperHint"]',path:"wrapperConfig.wrapperHint",type:"string"},{sel:'[data-binding="worldbookWrapperPosition"]',path:"wrapperConfig.wrapperPlacement.position",type:"string"},{sel:'[data-binding="worldbookWrapperDepth"]',path:"wrapperConfig.wrapperPlacement.depth",type:"number"},{sel:'[data-binding="worldbookWrapperOrder"]',path:"wrapperConfig.wrapperPlacement.order",type:"number"}];for(let{sel:n,path:a,type:i}of o)t.on("change.tww",n,function(){let l=r(this).val();i==="number"&&(l=Number.parseInt(l,10));try{let c=Ie(),d=aS(c.worldbookSync||{});iS(d,a,l),at({...c,worldbookSync:d}),A("success","\u5DF2\u4FDD\u5B58")}catch(c){ce().error(`\u4FDD\u5B58 worldbookSync.${a} \u5F02\u5E38`,c),A("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${c?.message||c}`)}});t.on("click.tww",'[data-action="refresh-worldbooks"]',function(n){n.preventDefault(),typeof e=="function"&&e(),A("success","\u5DF2\u5237\u65B0\u4E16\u754C\u4E66\u5217\u8868")}),t.on("click.tww",'[data-toggle="mirrorToMessage"]',function(){let n=r(this),a=n.hasClass("on"),i=!a;n.toggleClass("on",i);try{let l=Ie();at({...l,mirrorToMessage:i}),A("success",i?"\u5DF2\u542F\u7528\u6B63\u6587\u955C\u50CF":"\u5DF2\u505C\u7528\u6B63\u6587\u955C\u50CF")}catch(l){n.toggleClass("on",a),ce().error("toggle mirrorToMessage \u5F02\u5E38",l),A("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`)}}),t.on("click.tww","[data-link]",function(n){n.preventDefault(),A("info","\u8DF3\u8F6C\u5230\u9884\u8BBE\u7BA1\u7406\u9762\u677F\uFF08\u5F85\u63A5\u5165\uFF09")})}var jc,xt,qg,Jg,Zg=N(()=>{H();uo();sr();io();Ke();Ss();si();Tn();Gg();Ke();Lo();vo();zr();Fs();qe();xt={kind:null,sheetCount:null,rowCount:null,lastError:null,lastRefreshAt:0},qg=!1;Jg=`
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
  flex: 1;
  min-height: 0;
  overflow: hidden;
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
  flex: 1;
  min-height: 0;
  overflow-y: auto;
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
`});var tm={};re(tm,{TableWorkbenchPanel:()=>em,default:()=>xS});function bS(){if(!Wc)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tww-styles")){Wc=!0;return}let r=t.createElement("style");r.id="yyt-tww-styles",r.textContent=Jg,e.appendChild(r),Wc=!0}catch(t){Hc.warn("\u6CE8\u5165\u5DE5\u4F5C\u53F0\u6837\u5F0F\u5931\u8D25",t)}}var Hc,Wc,em,xS,rm=N(()=>{qe();H();Zg();Hc=I.createScope("TableWorkbenchPanel"),Wc=!1;em={id:"tableWorkbenchPanel",render(){bS();try{let t=Qg();return Xg(t)}catch(t){return Hc.error("\u6E32\u67D3\u5DE5\u4F5C\u53F0 UI \u5F02\u5E38",t),`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u4F5C\u53F0\u6E32\u67D3\u5931\u8D25\uFF1A${t?.message||t}</span></div>`}},bindEvents(t){if(!Q()||!ge(t))return;let r=this,s=()=>{try{t.html(r.render()),Fc(t,s)}catch(o){Hc.error("refresh \u5F02\u5E38",o)}};Fc(t,s)},renderTo(t){!Q()||!ge(t)||(t.html(this.render()),this.bindEvents(t))}},xS=em});var om={};re(om,{LoggerPanel:()=>sm,default:()=>_S});function TS(t){switch(t){case de.DEBUG:return"yyt-log-debug";case de.INFO:return"yyt-log-info";case de.WARN:return"yyt-log-warn";case de.ERROR:return"yyt-log-error";default:return""}}function SS(t){let e=new Date(t),r=s=>String(s).padStart(2,"0");return`${r(e.getHours())}:${r(e.getMinutes())}:${r(e.getSeconds())}.${String(e.getMilliseconds()).padStart(3,"0")}`}var wS,vS,sm,_S,nm=N(()=>{H();Ge();qe();wS="yyt-logger-panel",vS=[{level:null,label:"\u5168\u90E8",icon:"fa-list"},{level:de.DEBUG,label:"DEBUG",icon:"fa-bug"},{level:de.INFO,label:"INFO",icon:"fa-circle-info"},{level:de.WARN,label:"WARN",icon:"fa-triangle-exclamation"},{level:de.ERROR,label:"ERROR",icon:"fa-circle-exclamation"}];sm={id:"loggerPanel",render(){let t=I.getStats();return`
      <div class="yyt-logger-panel" id="${wS}">
        <div class="yyt-logger-toolbar">
          <div class="yyt-logger-filter-btns" data-yyt-log-filter-group>
            ${vS.map((e,r)=>`<button class="yyt-log-filter-btn ${r===0?"yyt-active":""}" data-level="${e.level??""}">
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
    `},bindEvents(t){let e=Q();if(!e||!ge(t))return;let r=this,s=null,o=!1,n=[],a=t.find("[data-yyt-log-list]"),i=t.find("[data-yyt-log-search]"),l=t.find("[data-yyt-log-autoscroll]"),c=t.find("[data-yyt-log-pause]");function d(p){if(!p.length){a.html('<div class="yyt-logger-empty">\u6682\u65E0\u5339\u914D\u7684\u65E5\u5FD7\u8BB0\u5F55</div>');return}a.html(p.map(f=>`
        <div class="yyt-log-entry ${TS(f.level)}" data-log-id="${f.id}">
          <span class="yyt-log-time">${SS(f.timestamp)}</span>
          <span class="yyt-log-level">${I.levelLabel(f.level)}</span>
          <span class="yyt-log-scope">${se(f.scope)}</span>
          <span class="yyt-log-msg">${se(f.message)}</span>
          ${f.data!==void 0?`<span class="yyt-log-data">${se(typeof f.data=="object"?JSON.stringify(f.data):String(f.data))}</span>`:""}
        </div>
      `).join(""))}function u(){let p=i.val()?.trim()||"",{entries:f}=I.getEntries({level:s,search:p||void 0,limit:500});d(f),l.is(":checked")&&requestAnimationFrame(()=>{a[0].scrollTop=a[0].scrollHeight})}function y(){if(o||!n.length)return;let p=n;n=[],u()}this._onLogEntry=p=>{if(o||s!==null&&p.level<s)return;let f=i.val()?.trim().toLowerCase()||"";if(f){let g=p.scope.toLowerCase().includes(f),h=p.message.toLowerCase().includes(f);if(!g&&!h)return}n.push(p),n.length>=50?y():this._flushTimer||(this._flushTimer=setTimeout(()=>{this._flushTimer=null,y(),r._updateStats(t)},250))},K.on("logger:entry",this._onLogEntry),t.on("click.yytLogger","[data-yyt-log-filter-group] .yyt-log-filter-btn",p=>{t.find("[data-yyt-log-filter-group] .yyt-log-filter-btn").removeClass("yyt-active"),e(p.currentTarget).addClass("yyt-active");let f=e(p.currentTarget).data("level");s=f===""?null:f,u(),r._updateStats(t)}),i.on("input.yytLogger",()=>{u()}),t.on("click.yytLogger","[data-yyt-log-pause]",()=>{o=!o,c.toggleClass("yyt-active",o),c.html(o?'<i class="fa-solid fa-play"></i> \u7EE7\u7EED':'<i class="fa-solid fa-pause"></i> \u6682\u505C'),o||(n=[],u(),r._updateStats(t))}),t.on("click.yytLogger","[data-yyt-log-clear]",()=>{I.clear(),a.html('<div class="yyt-logger-empty">\u65E5\u5FD7\u5DF2\u6E05\u9664</div>'),r._updateStats(t)}),t.on("click.yytLogger","[data-yyt-log-export]",()=>{let{entries:p}=I.getEntries({limit:1e4}),f=JSON.stringify(p.map(v=>({time:new Date(v.timestamp).toISOString(),level:I.levelLabel(v.level),scope:v.scope,message:v.message,data:v.data})),null,2),g=new Blob([f],{type:"application/json"}),h=URL.createObjectURL(g),x=document.createElement("a");x.href=h,x.download=`yyt-logs-${new Date().toISOString().replace(/[:.]/g,"-")}.json`,x.click(),URL.revokeObjectURL(h)}),u()},_updateStats(t){if(!Q()||!ge(t))return;let r=I.getStats(),s=t.find(".yyt-logger-stats");s.length&&s.html(`
      <span class="yyt-logger-stat">\u5171 <strong>${r.total}</strong> \u6761</span>
      ${["ERROR","WARN","INFO","DEBUG"].map(o=>`<span class="yyt-logger-stat yyt-log-${o.toLowerCase()}">${o}: <strong>${r.byLevel[o]||0}</strong></span>`).join("")}
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
    `}},_S=sm});var fm={};re(fm,{MAIN_TAB_RENDERERS:()=>ad,PanelState:()=>Ci,SCRIPT_ID:()=>as,SUB_TAB_RENDERERS:()=>id,UIManager:()=>Uo,bindDialogEvents:()=>Bo,closeActiveCustomSelectDropdown:()=>Vt,closeCustomSelectDropdown:()=>Ri,createDialogHtml:()=>Oo,default:()=>AS,destroyEnhancedCustomSelects:()=>dt,downloadJson:()=>zo,enhanceNativeSelects:()=>Nt,escapeHtml:()=>se,fillFormWithConfig:()=>zh,getAllStyles:()=>ym,getFormApiConfig:()=>Bh,getJQuery:()=>Q,getTargetDocument:()=>ur,initUI:()=>cm,isContainerValid:()=>ge,normalizeCustomSelectOptions:()=>zd,openCustomSelectDropdown:()=>Od,readFileContent:()=>Ko,registerComponents:()=>Yc,renderApiPanel:()=>Gc,renderBypassPanel:()=>rd,renderCustomSelectControl:()=>Kd,renderEscapeTransformToolPanel:()=>ed,renderLoggerPanel:()=>nd,renderMainTab:()=>um,renderPunctuationTransformToolPanel:()=>td,renderRegexPanel:()=>Vc,renderSettingsPanel:()=>sd,renderStatusBlockPanel:()=>Qc,renderSubTabComponent:()=>pm,renderSummaryToolPanel:()=>Xc,renderTableTemplatePanel:()=>Jc,renderTableWorkbenchPanel:()=>od,renderToolPanel:()=>dm,renderWorldbookPresetPanel:()=>qc,renderYouyouReviewPanel:()=>Zc,repositionActiveCustomSelectDropdown:()=>Ii,resetJQueryCache:()=>Rh,showConfirm:()=>pr,showPrompt:()=>Kh,showToast:()=>A,showTopNotice:()=>is,toggleCustomSelectDropdown:()=>Bd,uiManager:()=>jt,withButtonLoading:()=>Uh});async function im(t){if(!ni.has(t)){let e=am[t];if(typeof e!="function")throw new Error(`unknown_panel:${t}`);ni.set(t,e().then(r=>{let s=r?.[t]||r?.default;if(!s?.id)throw new Error(`invalid_panel:${t}`);return s}).catch(r=>{throw ni.delete(t),r}))}return ni.get(t)}function lm(t,e=null){let r=e?.message?`\uFF1A${se(e.message)}`:"";return`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>${se(t)}${r}</span></div>`}async function Yc(){let t=await Promise.allSettled(Object.keys(am).map(async r=>{let s=await im(r);return jt.register(s.id,s),s.id})),e=t.filter(r=>r.status==="rejected");e.length&&e.forEach(r=>kn.error("\u7EC4\u4EF6\u6CE8\u518C\u5931\u8D25",r.reason)),kn.log(`\u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210\uFF0C\u6210\u529F ${t.length-e.length} \u4E2A\uFF0C\u5931\u8D25 ${e.length} \u4E2A`)}async function cm(t={}){let{autoInjectStyles:e=!0,targetDocument:r,...s}=t;jt.init(s),await Yc(),e&&jt.injectStyles(r),kn.log("\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}async function ES(t){let e=await im(t);return jt.getComponent(e.id)||jt.register(e.id,e),e}async function wt(t,e,r={}){let s=await ES(t);jt.render(s.id,e,r)}function Gc(t){return wt("ApiPresetPanel",t)}function qc(t){return wt("WorldbookPresetPanel",t)}function Vc(t){return wt("RegexExtractPanel",t)}function Jc(t){return wt("TableTemplatePanel",t)}function dm(t){return wt("ToolManagePanel",t)}function Xc(t){return wt("SummaryToolPanel",t)}function Qc(t){return wt("StatusBlockPanel",t)}function Zc(t){return wt("YouyouReviewPanel",t)}function ed(t){return wt("EscapeTransformToolPanel",t)}function td(t){return wt("PunctuationTransformToolPanel",t)}function rd(t){return wt("BypassPanel",t)}function sd(t){return wt("SettingsPanel",t)}function od(t){return wt("TableWorkbenchPanel",t)}function nd(t){return wt("LoggerPanel",t)}async function um(t,e){let r=ad[t];if(!r)return!1;try{await r.render(e)}catch(s){kn.error(r.failMessage,s),e.html(lm(r.failMessage,s))}return!0}async function pm(t,e){let r=id[t];if(!r)return null;try{await r.render(e)}catch(s){kn.error(r.failMessage,s),e.html(lm(r.failMessage,s))}return t}function ym(){return jt.getAllStyles()}var kn,am,ni,ad,id,AS,gm=N(()=>{H();Mi();qe();qe();Mi();kn=I.createScope("UI"),am=Object.freeze({ApiPresetPanel:()=>Promise.resolve().then(()=>(ou(),su)),WorldbookPresetPanel:()=>Promise.resolve().then(()=>(Tu(),vu)),RegexExtractPanel:()=>Promise.resolve().then(()=>(kp(),Cp)),TableTemplatePanel:()=>Promise.resolve().then(()=>(Ky(),zy)),ToolManagePanel:()=>Promise.resolve().then(()=>(Fy(),jy)),SummaryToolPanel:()=>Promise.resolve().then(()=>(ff(),yf)),StatusBlockPanel:()=>Promise.resolve().then(()=>(hf(),mf)),YouyouReviewPanel:()=>Promise.resolve().then(()=>(wf(),xf)),EscapeTransformToolPanel:()=>Promise.resolve().then(()=>(_f(),Sf)),PunctuationTransformToolPanel:()=>Promise.resolve().then(()=>(Cf(),Af)),BypassPanel:()=>Promise.resolve().then(()=>(Rf(),If)),SettingsPanel:()=>Promise.resolve().then(()=>(yc(),pc)),TableWorkbenchPanel:()=>Promise.resolve().then(()=>(rm(),tm)),LoggerPanel:()=>Promise.resolve().then(()=>(nm(),om))}),ni=new Map;ad=Object.freeze({tableWorkbench:{render:t=>od(t),failMessage:"\u586B\u8868\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25"},bypass:{render:t=>rd(t),failMessage:"Ai\u6307\u4EE4\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},settings:{render:t=>sd(t),failMessage:"\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},logger:{render:t=>nd(t),failMessage:"\u65E5\u5FD7\u9762\u677F\u52A0\u8F7D\u5931\u8D25"}}),id=Object.freeze({ApiPresetPanel:{render:t=>Gc(t),failMessage:"API \u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},RegexExtractPanel:{render:t=>Vc(t),failMessage:"\u6B63\u5219\u63D0\u53D6\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},WorldbookPresetPanel:{render:t=>qc(t),failMessage:"\u4E16\u754C\u4E66\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},TableTemplatePanel:{render:t=>Jc(t),failMessage:"\u8868\u683C\u6A21\u677F\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},SummaryToolPanel:{render:t=>Xc(t),failMessage:"\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},StatusBlockPanel:{render:t=>Qc(t),failMessage:"\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25"},YouyouReviewPanel:{render:t=>Zc(t),failMessage:"\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25"},EscapeTransformToolPanel:{render:t=>ed(t),failMessage:"\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},PunctuationTransformToolPanel:{render:t=>td(t),failMessage:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"}});AS={uiManager:jt,registerComponents:Yc,initUI:cm,renderApiPanel:Gc,renderWorldbookPresetPanel:qc,renderRegexPanel:Vc,renderTableTemplatePanel:Jc,renderToolPanel:dm,renderSummaryToolPanel:Xc,renderStatusBlockPanel:Qc,renderYouyouReviewPanel:Zc,renderEscapeTransformToolPanel:ed,renderPunctuationTransformToolPanel:td,renderBypassPanel:rd,renderSettingsPanel:sd,renderTableWorkbenchPanel:od,renderLoggerPanel:nd,MAIN_TAB_RENDERERS:ad,SUB_TAB_RENDERERS:id,renderMainTab:um,renderSubTabComponent:pm,getAllStyles:ym}});var vm={};re(vm,{TX_PHASE:()=>Ut,ToolAutomationService:()=>ii,Transaction:()=>ai,default:()=>MS,toolAutomationService:()=>wm});function pe(t){return t==null?"":String(t).trim()}function mm(t){let e=Ia(t);return pe(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.chat_filename??t?.this_chid??"chat_default")||"chat_default"}function ld(t){let e=Ia(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function xm(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="user"||e==="system"?!1:e==="assistant"||e==="ai"||!e}function CS(t,e){let r=pe(e);if(!r)return null;let s=ld(t);for(let o=s.length-1;o>=0;o-=1){let n=s[o];if([n?.messageId,n?.message_id,n?.id,n?.mid,n?.mesid,n?.chat_index,o].map(i=>pe(i)).includes(r))return n||null}return null}function hm(t){let e=ld(t);if(!Array.isArray(e)||e.length===0)return null;let r=e.length-1,s=e[r]||null;if(!xm(s))return null;let o=pe(s?.messageId??s?.message_id??s?.id??s?.mid??s?.mesid??s?.chat_index??r);return o?{messageId:o,swipeId:pe(s?.swipeId??s?.swipe_id??s?.swipe??s?.swipeIndex),message:s}:null}function RS(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${t}_${e}`}var je,bm,kS,IS,Ut,ai,ii,wm,MS,Tm=N(()=>{fn();H();ec();tr();gn();rc();ys();si();sr();je=I.createScope("ToolAutomation");bm=1e4,kS=15e3,IS=800;Ut=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),ai=class{constructor({chatId:e,messageId:r,swipeId:s,sourceEvent:o,generationKey:n}){this.traceId=RS(),this.chatId=e||"",this.messageId=r||"",this.swipeId=s||"",this.sourceEvent=o||"",this.generationKey=n||"",this.phase=Ut.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,r={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,r),this}toSnapshot(){return{...this}}},ii=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._recentlyProcessedSlots=new Map,this._ownWriteMessageIds=new Map,this._slotQueues=new Map,this._activeTransactions=new Map,this._isProcessing=!1,this._currentChatId="",this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""},this._messageReceivedThrottleUntil=0}setDebugMode(e){this.debugMode=e===!0}init(e={}){this.stop(),this._hostBindingStatus.lastInitAt=Date.now(),this._hostBindingStatus.initAttempts=(this._hostBindingStatus.initAttempts||0)+1;let r=Gr();this._currentChatId=mm(r);let s=(o,...n)=>{let a=Gr(),{messageId:i,swipeId:l}=this._extractIdentitiesFromArgs(n);if(je.debug(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${o}"`,{messageId:i,swipeId:l,argCount:n.length}),o===We.MESSAGE_RECEIVED){let g=Date.now();if(g<this._messageReceivedThrottleUntil){je.debug(`MESSAGE_RECEIVED \u5728\u8282\u6D41\u7A97\u53E3\u5185\uFF0C\u8DF3\u8FC7\uFF08\u5269\u4F59 ${this._messageReceivedThrottleUntil-g}ms\uFF09`);return}this._messageReceivedThrottleUntil=g+this._getSettleMs()+5e3}let c=null,d=i,u=l;if(d&&(c=CS(a,d)),!c){let g=hm(a);g?.messageId&&(c=g.message,d=g.messageId,u=g.swipeId||u)}if(!d||!c){je.debug(`\u4E8B\u4EF6 "${o}" \u65E0 assistant \u76EE\u6807\uFF0C\u8DF3\u8FC7`);return}if(!xm(c)){je.debug(`\u4E8B\u4EF6 "${o}" \u547D\u4E2D\u975E assistant \u6D88\u606F\uFF0C\u8DF3\u8FC7`,{messageId:d});return}let y=String(c.content||c.mes||"").trim();if(!y||y.length<5){je.debug(`\u4E8B\u4EF6 "${o}" \u6D88\u606F\u8FC7\u77ED\uFF08${y.length} \u5B57\u7B26\uFF09\uFF0C\u8DF3\u8FC7`);return}if(this._isProcessing){je.debug(`\u4E8B\u4EF6 "${o}" \u6B63\u5728\u5904\u7406\u4E2D\uFF0C\u8DF3\u8FC7`);return}if(this._isOwnWrite(d)){je.debug(`\u4E8B\u4EF6 "${o}" \u547D\u4E2D own-write \u9ED1\u540D\u5355\uFF0C\u8DF3\u8FC7`,{messageId:d});return}let p=pe(c?.swipeId??c?.swipe_id??c?.swipe??c?.swipeIndex);p&&(u=p);let f=`${d}::${u}`;if(this._isRecentlyProcessed(f)){je.debug(`\u4E8B\u4EF6 "${o}" slot \u5DF2\u8FD1\u671F\u5904\u7406\u8FC7\uFF0C\u8DF3\u8FC7`,{slotKey:f});return}this._scheduleMessageProcessing(d,u,{settleMs:this._getSettleMs(),sourceEvent:o}),je.info(`\u4E8B\u4EF6 "${o}" \u901A\u8FC7\u6240\u6709\u5B88\u536B\uFF0C\u5DF2\u8C03\u5EA6\u5904\u7406`,{targetMessageId:d,targetSwipeId:u,throttleUntil:this._messageReceivedThrottleUntil,isProcessing:this._isProcessing})};return this._stopCallbacks.push(zt.subscribe(We.MESSAGE_SENT,()=>{je.debug("MESSAGE_SENT \u2192 \u6E05\u7406\u8C03\u5EA6\u961F\u5217"),this._pendingTimers.forEach(o=>clearTimeout(o)),this._pendingTimers.clear()})),this._stopCallbacks.push(zt.subscribe(We.MESSAGE_RECEIVED,(...o)=>{s(We.MESSAGE_RECEIVED,...o)})),this._stopCallbacks.push(zt.subscribe(We.GENERATION_STOPPED,()=>{je.info("GENERATION_STOPPED \u2192 \u53D6\u6D88\u6240\u6709\u6D3B\u8DC3\u4E8B\u52A1"),this._cancelActiveTransactions("generation_stopped"),this._pendingTimers.forEach(o=>clearTimeout(o)),this._pendingTimers.clear(),this._isProcessing=!1})),this._stopCallbacks.push(zt.subscribe(We.CHAT_CHANGED,()=>{this._resetForChatChange()})),this._stopCallbacks.push(zt.subscribe(We.MESSAGE_DELETED,o=>{this._clearMessageState(pe(o))})),this._refreshHostBindingStatus(),this._seedKnownSlots(),je.info("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{chatId:this._currentChatId,source:this._hostBindingStatus.source}),!0}_seedKnownSlots(){try{let e=Gr(),r=hm(e);if(!r?.messageId)return;let s=`${pe(r.messageId)}::${pe(r.swipeId)}`;this._recentlyProcessedSlots.set(s,Number.MAX_SAFE_INTEGER),je.debug(`\u5DF2\u5C06\u5F53\u524D\u6700\u65B0 slot "${s}" \u9884\u6807\u8BB0\u4E3A\u5DF2\u77E5\uFF0C\u8DF3\u8FC7 MESSAGE_RECEIVED \u91CD\u653E`)}catch(e){je.warn("_seedKnownSlots \u5931\u8D25",{error:e})}}_refreshHostBindingStatus(){let e=zt.describe(),r=[We.MESSAGE_SENT,We.MESSAGE_RECEIVED,We.GENERATION_STOPPED,We.CHAT_CHANGED,We.MESSAGE_DELETED];this._hostBindingStatus={...this._hostBindingStatus,initialized:!!e.hasBridge,lastInitResult:e.hasBridge?"ready":e.retryScheduled?"pending_retry":"pending",source:e.source,hasEventSource:!!e.hasBridge,hasEventTypes:Array.isArray(e.availableEvents)&&e.availableEvents.length>0,eventBindings:r.map(s=>`subscribed: ${s}`),retryScheduled:!!e.retryScheduled,retryDelayMs:0,lastError:""}}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(r){je.warn("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",{error:r})}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("service_stopped"),this._activeTransactions.clear(),this._isProcessing=!1,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""}}isEnabled(){return!0}getRuntimeSnapshot(){return this._pruneRecentSlots(),this._pruneOwnWrites(),this._refreshHostBindingStatus(),{currentChatId:this._currentChatId,enabled:!0,isProcessing:this._isProcessing,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,recentlyProcessedSlotCount:this._recentlyProcessedSlots.size,ownWriteMessageIdCount:this._ownWriteMessageIds.size,activeTransactionCount:this._activeTransactions.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),hostBinding:{...this._hostBindingStatus,eventBindings:Array.isArray(this._hostBindingStatus?.eventBindings)?[...this._hostBindingStatus.eventBindings]:[]},settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let r=await ps({messageId:"",swipeId:"",runSource:"AUTO"}),s=pe(r?.sourceMessageId||r?.messageId);return s?this.processAssistantMessage(s,{force:e.force===!0,swipeId:pe(r?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:r=!1,swipeId:s="",sourceEvent:o="AUTO"}={}){let n=new ai({chatId:this._currentChatId,messageId:e,swipeId:s,sourceEvent:o});try{if(!e)return this._skipTransaction(n,"missing_message_id");n.transition(Ut.CONFIRMED);let a=await ps({messageId:e,swipeId:s,runSource:"AUTO"}),i=a?.targetAssistantMessage||null;if(!i||!a?.sourceMessageId)return this._skipTransaction(n,"assistant_message_not_found");let l=String(i.content||i.mes||"").trim();if(!l||l.length<5)return this._skipTransaction(n,"assistant_message_too_short");n.transition(Ut.CONTEXT_BUILT);let c=`${pe(a.sourceMessageId)}::${pe(a.sourceSwipeId||s)}`;if(n.generationKey=c,!r&&this._isRecentlyProcessed(c))return this._skipTransaction(n,"duplicate_slot",{slotKey:c});let d=Jo(),u=It.filterAutoPostResponseTools(d),p=[...d.filter(h=>It.shouldRunLocalTransform(h)&&h.output?.autoTrigger!==!1),...u],f=Ie(),g=f?.autoUpdateEnabled===!0&&pe(f?.autoUpdateTrigger||"assistantMessage")==="assistantMessage";return!p.length&&!g?this._skipTransaction(n,"no_auto_tools",{tools:p}):(n.slotKey=c,n.slotRevisionKey=a.slotRevisionKey||"",n.sourceMessageId=a.sourceMessageId||e,n.sourceSwipeId=a.sourceSwipeId||s||"",this._enqueueSlot(c,async()=>{if(!r&&this._isRecentlyProcessed(c))return this._skipTransaction(n,"duplicate_slot_after_queue",{slotKey:c});this._isProcessing=!0,this._markSlotProcessed(c),n.transition(Ut.REQUEST_STARTED);let h=new AbortController;this._registerActiveTransaction(n,{controller:h,slotKey:c,sourceMessageId:a.sourceMessageId||e,sourceSwipeId:a.sourceSwipeId||s||""});try{let{results:x,hasWriteback:v}=await this._executeAutoTools(p,a,h,n,{slotKey:c,messageId:e,swipeId:s}),{tableResult:T,hasWriteback:L}=await this._executeAutoTableUpdate(a,h,n,{shouldRunTableAuto:g,tableWorkbenchConfig:f,messageId:e,swipeId:s,sourceEvent:o}),M=v||L;n.transition(Ut.REQUEST_FINISHED,{toolResults:x,tableResult:T}),M&&(n.transition(Ut.WRITEBACK_STARTED),n.writebackState={messageId:a.sourceMessageId,swipeId:a.sourceSwipeId,hasOutput:!0},this._messageReceivedThrottleUntil=Date.now()+kS),this._markSlotProcessed(c);let _=x.every(S=>S?.success!==!1),C=!g||!!T?.success||T?.skipped===!0||T?.meta?.aborted===!0||T?.meta?.stale===!0,W=_&&C,q=x.some(S=>S?.meta?.aborted===!0||S?.meta?.stale===!0||S?.error==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")||T?.meta?.aborted===!0||T?.meta?.stale===!0;W&&n.transition(Ut.WRITEBACK_COMMITTED);let R=W?Ut.REFRESH_CONFIRMED:Ut.FAILED;return n.transition(R,{verdict:q?"aborted":W?"success":"partial_failure"}),this._recordTransaction(n),this._updateAutoRuntimeForResults(p,a,n,x),{success:W,traceId:n.traceId,slotKey:c,sourceEvent:o,messageId:a.sourceMessageId||e,phase:n.phase,results:x,tableResult:T}}finally{this._unregisterActiveTransaction(n.traceId),this._isProcessing=!1}}))}catch(a){return n.transition(Ut.FAILED,{error:a?.message||String(a)}),this._recordTransaction(n),this._unregisterActiveTransaction(n.traceId),this._isProcessing=!1,je.error("processAssistantMessage \u5F02\u5E38",{error:a}),{success:!1,traceId:n.traceId,error:n.error,phase:n.phase}}}_extractIdentitiesFromArgs(e){let r="",s="";for(let o of e)if(o!=null){if(typeof o=="number"&&Number.isFinite(o)&&!r){r=pe(o);continue}if(typeof o=="string"){let n=pe(o);!r&&/^\d+$/.test(n)&&(r=n);continue}typeof o=="object"&&(r||(r=pe(o.messageId??o.message_id??o.id??o.mid??o.mesid??o.chat_index??o.message?.messageId??o.message?.message_id??o.message?.id??o.message?.mid??o.message?.mesid??o.message?.chat_index??o.data?.messageId??o.data?.message_id??o.data?.id??o.data?.mid??o.data?.mesid??o.data?.chat_index??o.target?.messageId??o.target?.message_id??o.target?.id??o.target?.mid??o.target?.mesid??o.target?.chat_index)),s||(s=pe(o.swipeId??o.swipe_id??o.swipe??o.swipeIndex??o.currentSwipe??o.message?.swipeId??o.message?.swipe_id??o.message?.swipe??o.data?.swipeId??o.data?.swipe_id??o.data?.swipe??o.target?.swipeId??o.target?.swipe_id??o.target?.swipe)))}return{messageId:r,swipeId:s}}_scheduleMessageProcessing(e,r="",s={}){let o=s.settleMs??this._getSettleMs(),n=`msg::${pe(e)}::${pe(r)}`,a=this._pendingTimers.get(n);a&&clearTimeout(a);let i=setTimeout(()=>{this._pendingTimers.delete(n),this.processAssistantMessage(e,{swipeId:r,sourceEvent:s.sourceEvent||"AUTO"}).catch(l=>{je.error("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:l})})},Math.max(0,o));this._pendingTimers.set(n,i),je.info("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:n,settleMs:o,sourceEvent:s.sourceEvent})}cancelAutomation(e={}){let r=e.reason||"manual_cancel",s=pe(e.messageId),o=pe(e.slotKey),n=pe(e.traceId),a=0;for(let[i,l]of this._pendingTimers){let c=s&&i.includes(`::${s}::`),d=o&&i.includes(o);(c||d||!s&&!o&&!n)&&(clearTimeout(l),this._pendingTimers.delete(i),a+=1)}return a+=this._cancelActiveTransactions(r,{messageId:s,slotKey:o,traceId:n}),{success:a>0,cancelledCount:a,reason:r}}_isRecentlyProcessed(e){if(!e)return!1;this._pruneRecentSlots();let r=this._recentlyProcessedSlots.get(e);return r?Date.now()-r<this._getDedupeWindowMs():!1}_markSlotProcessed(e){e&&(this._recentlyProcessedSlots.set(e,Date.now()),this._pruneRecentSlots())}_pruneRecentSlots(){let e=Date.now()-this._getDedupeWindowMs();for(let[r,s]of this._recentlyProcessedSlots)(!Number.isFinite(s)||s<e)&&this._recentlyProcessedSlots.delete(r)}async _executeAutoTools(e,r,s,o,{slotKey:n,messageId:a,swipeId:i}){let l=[],c=!1,d=r.lastAiMessage,u=r.assistantBaseText;for(let y of e){let p={...r,signal:s.signal,isAutoRun:!0,abortMeta:{traceId:o.traceId,slotKey:n,sourceMessageId:r.sourceMessageId||a,sourceSwipeId:r.sourceSwipeId||i||""},shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:o.traceId}),skipNotify:!0,lastAiMessage:d,assistantBaseText:u,input:{...r.input||{},lastAiMessage:d,assistantBaseText:u}},g=It.shouldRunLocalTransform(y)?await Ba(y,p):await It.runToolPostResponse(y,p);if(l.push(g),g?.writebackState||g?.output){c=!0,this._markOwnWrite(r.sourceMessageId||a);let h=this._readCurrentMessageText(r.sourceMessageId||a);if(h){d=h,u=h;let x=Number(r.sourceMessageId||a);Array.isArray(r.chatMessages)&&r.chatMessages[x]&&(r.chatMessages[x].content=h,r.chatMessages[x].mes=h)}}}return{results:l,hasWriteback:c}}async _executeAutoTableUpdate(e,r,s,{shouldRunTableAuto:o,tableWorkbenchConfig:n,messageId:a,swipeId:i,sourceEvent:l}){if(!o)return{tableResult:null,hasWriteback:!1};let c=await Og({messageId:e.sourceMessageId||a,swipeId:e.sourceSwipeId||i||"",sourceEvent:l,configInput:n,signal:r.signal,shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:s.traceId})}),d=!!(c?.state||c?.mirrorResult?.success===!0);return d&&this._markOwnWrite(e.sourceMessageId||a),{tableResult:c,hasWriteback:d}}_readCurrentMessageText(e){let r=Gr(),s=ld(r),o=Number(e);if(!Number.isFinite(o)||o<0||o>=s.length)return"";let n=s[o];return String(n?.mes||n?.content||"").trim()}_markOwnWrite(e){let r=pe(e);r&&(this._ownWriteMessageIds.set(r,Date.now()),this._pruneOwnWrites())}_isOwnWrite(e){let r=pe(e);if(!r)return!1;this._pruneOwnWrites();let s=this._ownWriteMessageIds.get(r);return s?Date.now()-s<bm:!1}_pruneOwnWrites(){let e=Date.now()-bm;for(let[r,s]of this._ownWriteMessageIds)(!Number.isFinite(s)||s<e)&&this._ownWriteMessageIds.delete(r)}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),je.debug(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,r,s={}){return e.transition(Ut.SKIPPED,{verdict:r,...s}),this._recordTransaction(e),Array.isArray(s?.tools)&&s.tools.length>0&&this._updateAutoRuntimeForSkip(s.tools,e,r,s),{success:!1,skipped:!0,reason:r,traceId:e.traceId,...s}}_enqueueSlot(e,r){let o=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(r).finally(()=>{this._slotQueues.get(e)===o&&this._slotQueues.delete(e)});return this._slotQueues.set(e,o),o}_registerActiveTransaction(e,r={}){e?.traceId&&this._activeTransactions.set(e.traceId,{traceId:e.traceId,generationKey:r.generationKey||e.generationKey||"",slotKey:r.slotKey||e.slotKey||"",sourceMessageId:r.sourceMessageId||e.sourceMessageId||"",sourceSwipeId:r.sourceSwipeId||e.sourceSwipeId||"",slotRevisionKey:r.slotRevisionKey||e.slotRevisionKey||"",assistantBaseFingerprint:r.assistantBaseFingerprint||"",assistantBaseText:r.assistantBaseText||"",controller:r.controller||null,cancelled:!1,cancelReason:""})}_unregisterActiveTransaction(e){e&&this._activeTransactions.delete(e)}_cancelActiveTransactions(e="manual_cancel",r={}){let s=pe(r.messageId),o=pe(r.slotKey),n=pe(r.traceId),a=0;for(let[i,l]of this._activeTransactions){let c=n&&i===n,d=s&&pe(l?.sourceMessageId)===s,u=o&&pe(l?.slotKey)===o;if(!(!c&&!d&&!u&&!(!n&&!s&&!o))){l.cancelled=!0,l.cancelReason=e;try{l?.controller?.abort?.()}catch{}a+=1}}return a}_shouldAbortAutoWriteback(e={}){let r=pe(e.traceId);if(r){let s=this._activeTransactions.get(r);if(!s||s.cancelled)return{aborted:!0,reason:"cancelled_before_host_commit"}}return!1}_updateAutoRuntimeForSkip(e,r,s,o={}){e.forEach(n=>{n?.id&&Or(n.id,{lastAutoRunAt:Date.now(),lastAutoStatus:"skipped",lastAutoMessageId:r?.sourceMessageId||r?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||r?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||o?.slotRevisionKey||"",lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:!1,lastAutoSkipReason:s||""},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_updateAutoRuntimeForResults(e,r,s,o=[]){e.forEach((n,a)=>{if(!n?.id)return;let i=o[a]||{},l=i?.meta?.writebackDetails||{},c=i?.meta?.aborted===!0||i?.meta?.stale===!0?"aborted":i?.success===!1?"failed":"success",d=i?.meta?.aborted===!0?i?.meta?.abortReason||(i?.meta?.stale===!0?"stale_base_changed":"cancelled_before_host_commit"):"";Or(n.id,{lastAutoRunAt:Date.now(),lastAutoStatus:c,lastAutoMessageId:r?.sourceMessageId||s?.sourceMessageId||s?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||s?.sourceSwipeId||s?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||s?.slotRevisionKey||"",lastAutoWritebackStatus:i?.meta?.writebackStatus||"",lastAutoRefreshConfirmed:!!l.refreshConfirmed,lastAutoSkipReason:d},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_resetForChatChange(){let e=Gr(),r=mm(e);je.info("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:r}),this._currentChatId=r,this._pendingTimers.forEach(s=>clearTimeout(s)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("chat_changed"),this._activeTransactions.clear(),this._isProcessing=!1,this._messageReceivedThrottleUntil=0,this._seedKnownSlots()}_clearMessageState(e){if(e){for(let[r,s]of this._pendingTimers)(r.includes(`::${e}::`)||r.startsWith(`msg::${e}::`))&&(clearTimeout(s),this._pendingTimers.delete(r));for(let r of this._recentlyProcessedSlots.keys())r.startsWith(`${e}::`)&&this._recentlyProcessedSlots.delete(r);this._ownWriteMessageIds.delete(pe(e)),this._seedKnownSlots()}}_getAutomationSettings(){let e=Bt.getSettings()?.automation||{},r=Number.isFinite(e.settleMs)?e.settleMs:IS;return{settleMs:r,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(5e3,r+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}},wm=new ii,MS=wm});var Am={};re(Am,{BUILTIN_REGEX_PRESETS:()=>ci,BUILTIN_WORLDBOOK_PRESETS:()=>cd,MIGRATION_BACKUP_KEY:()=>_m,MIGRATION_DONE_KEY:()=>li,default:()=>$S,ensurePresetSystem:()=>Em,registerBuiltinPresets:()=>dd,runMigrationOnce:()=>ud});function PS(t){if(!Array.isArray(t)||t.length===0)return null;let e=t.map(r=>String(r||"").trim()).filter(Boolean).sort().join("|");if(!e)return null;for(let r of ci)if(r.rules.filter(o=>o.type==="include"&&o.enabled!==!1).map(o=>o.value).sort().join("|")===e)return r.id;return null}function dd(){try{typeof pl=="function"&&pl(ci),typeof Ui=="function"&&Ui(cd),Xr.info("\u5185\u7F6E\u9884\u8BBE\u5DF2\u6CE8\u518C",{regex:ci.length,worldbook:cd.length})}catch(t){Xr.error("\u6CE8\u518C\u5185\u7F6E\u9884\u8BBE\u5931\u8D25",{error:t})}}function NS(t){let e=new Set,r=[];for(let s of Array.isArray(t)?t:[]){let o=String(s||"").trim();if(!(!o||e.has(o)))if(e.add(o),o.startsWith("regex:")){let n=o.slice(6).trim();n&&r.push({type:"regex_include",value:n,enabled:!0,name:"",description:""})}else r.push({type:"include",value:o,enabled:!0,name:"",description:""})}return r}function DS(t,e,r){let s=JSON.parse(JSON.stringify(r||{})),o=!1,n=s.extraction||{};if(!n.regexPresetId){let i=Array.isArray(n.selectors)?n.selectors:[];if(i.length>0){let l=PS(i);if(l)n.regexPresetId=l,o=!0,Xr.info(`\u5DE5\u5177 ${t} \u7ED1\u5B9A\u5185\u7F6E\u6B63\u5219\u9884\u8BBE: ${l}`);else{let c=aa({name:`${e||t}_\u8FC1\u79FB_\u6B63\u5219`,description:`\u81EA\u8001\u7248\u672C selectors \u81EA\u52A8\u8FC1\u79FB\uFF08${i.length} \u9879\uFF09`,rules:NS(i),blacklist:[]});c?.id&&(n.regexPresetId=c.id,o=!0,Xr.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u6B63\u5219\u9884\u8BBE: ${c.id}`))}s.extraction=n}}let a=s.worldbooks||{};if(!a.presetId&&a.enabled===!0&&Array.isArray(a.selected)&&a.selected.length>0){let i=Yn({name:`${e||t}_\u8FC1\u79FB_\u4E16\u754C\u4E66`,description:`\u81EA\u8001\u7248\u672C worldbooks.selected \u81EA\u52A8\u8FC1\u79FB\uFF08${a.selected.length} \u672C\uFF09`,bindingMode:"custom",includeDisabled:!1,bookList:a.selected.map(l=>({bookName:String(l||""),enabled:!0,entryOverrides:{}})).filter(l=>l.bookName)});i?.id&&(a.presetId=i.id,o=!0,Xr.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u4E16\u754C\u4E66\u9884\u8BBE: ${i.id}`)),s.worldbooks=a}return o?s:null}function ud(){try{if(Ee.get(li)===!0)return{skipped:!0,reason:"already_done"};let t=$.get(Sm)||{};if(!t||typeof t!="object")return Xr.info("\u65E0\u5DE5\u5177\u914D\u7F6E\u9700\u8981\u8FC1\u79FB"),Ee.set(li,!0),{skipped:!0,reason:"no_configs"};Ee.set(_m,{ts:Date.now(),version:"v45",snapshot:t});let e=0,r={...t};for(let[s,o]of Object.entries(t)){if(!o||typeof o!="object")continue;let n=DS(s,o.name,o);n&&(r[s]=n,e+=1)}return e>0&&$.set(Sm,r),Ee.set(li,!0),Xr.info("\u8FC1\u79FB\u5B8C\u6210",{migratedCount:e,total:Object.keys(t).length}),{skipped:!1,migratedCount:e,total:Object.keys(t).length}}catch(t){return Xr.error("\u8FC1\u79FB\u5931\u8D25\uFF0C\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559",{error:t}),{skipped:!1,error:t?.message||String(t),aborted:!0}}}function Em(){return dd(),ud()}var Xr,li,_m,Sm,ci,cd,$S,Cm=N(()=>{ze();H();zr();Fs();Xr=I.createScope("PresetBootstrap"),li="migration_v45_done",_m="migration_v45_backup",Sm="tool_configs",ci=[{id:"builtin_regex_summary",name:"\u5185\u7F6E \xB7 \u603B\u7ED3\u63D0\u53D6",description:"\u63D0\u53D6 <boo_FM> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u8BB0\u5FC6\u538B\u7F29\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_summary_1",type:"include",value:"boo_FM",enabled:!0,name:"\u603B\u7ED3\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_status_block",name:"\u5185\u7F6E \xB7 \u72B6\u6001\u680F\u63D0\u53D6",description:"\u63D0\u53D6 <status_block> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u72B6\u6001\u680F\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_status_1",type:"include",value:"status_block",enabled:!0,name:"\u72B6\u6001\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_youyou",name:"\u5185\u7F6E \xB7 \u4F18\u4F18\u9510\u8BC4\u63D0\u53D6",description:"\u63D0\u53D6 <youyou> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u4F18\u4F18\u9510\u8BC4\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_youyou_1",type:"include",value:"youyou",enabled:!0,name:"\u4F18\u4F18\u6807\u7B7E",description:""}],blacklist:[]}],cd=[];$S={registerBuiltinPresets:dd,runMigrationOnce:ud,ensurePresetSystem:Em}});var yd={};re(yd,{confirmDeleteTool:()=>US,confirmResetTools:()=>WS,getAllTools:()=>Qt,getTool:()=>Zt,showExportToolsDialog:()=>jS,showImportToolsDialog:()=>FS,showToolEditDialog:()=>KS});async function KS(t=null){let e=t?Zt(t):null,r=!!e,s=Ze({value:e?.name||"",placeholder:"\u5DE5\u5177\u540D\u79F0"}),o=Ve({value:e?.category||"utility",options:zS}),n=Ze({value:e?.description||"",placeholder:"\u5DE5\u5177\u63CF\u8FF0"}),a=m("input",{className:"yyt-input",attrs:{type:"number",min:"1000"},style:{padding:"7px 10px",fontSize:"12px"}});a.value=String(e?.config?.execution?.timeout||6e4);let i=m("input",{className:"yyt-input",attrs:{type:"number",min:"0",max:"10"},style:{padding:"7px 10px",fontSize:"12px"}});i.value=String(e?.config?.execution?.retries??3);function l(p,f,g=""){let h=m("div",{className:"yyt-form-group",style:{margin:"0 0 12px 0"}});return h.appendChild(m("label",{text:p,style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))",display:"block",marginBottom:"4px"}})),h.appendChild(f),g&&h.appendChild(m("div",{text:g,style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginTop:"4px"}})),h}let c=m("div",{style:{display:"flex",flexDirection:"column"}}),d=m("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});d.appendChild(l("\u5DE5\u5177\u540D\u79F0",s.el)),d.appendChild(l("\u5206\u7C7B",o.el)),c.appendChild(d),c.appendChild(l("\u63CF\u8FF0",n.el));let u=m("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});u.appendChild(l("\u8D85\u65F6\u65F6\u95F4 (ms)",a)),u.appendChild(l("\u91CD\u8BD5\u6B21\u6570",i)),c.appendChild(u);let y=ke.custom({title:r?`\u7F16\u8F91\u5DE5\u5177\u300C${e.name}\u300D`:"\u65B0\u5EFA\u5DE5\u5177",width:"480px",body:c,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:p=>p(null)},{label:r?"\u4FDD\u5B58":"\u521B\u5EFA",variant:"primary",onClick:p=>{let f=String(s.get()||"").trim();if(!f){s.el.focus();return}let g=t||`tool_${Date.now()}`;if(!qs(g,{name:f,category:o.get(),description:String(n.get()||"").trim(),promptTemplate:e?.promptTemplate||"",extractTags:Array.isArray(e?.extractTags)?e.extractTags:[],config:{execution:{timeout:Math.max(1e3,parseInt(a.value,10)||6e4),retries:Math.max(0,parseInt(i.value,10)||3)},api:e?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(e?.config?.messages)?e.config.messages:[],context:{depth:e?.config?.context?.depth||3,includeTags:Array.isArray(e?.config?.context?.includeTags)?e.config.context.includeTags:[],excludeTags:Array.isArray(e?.config?.context?.excludeTags)?e.config.context.excludeTags:[]},worldbooks:{enabled:e?.config?.worldbooks?.enabled===!0,selected:Array.isArray(e?.config?.worldbooks?.selected)?e.config.worldbooks.selected:[]}},enabled:e?.enabled!==!1})){pd.warn("saveTool \u5931\u8D25",{id:g});return}try{eo(g)}catch(x){pd.warn("ensureToolRuntimeConfig \u5F02\u5E38",{err:x})}p(g)}}]});return setTimeout(()=>s.el.focus(),0),y.result}async function US(t){let e=Zt(t);return!e||!await ke.confirm({title:"\u5220\u9664\u5DE5\u5177",message:`\u786E\u5B9A\u5220\u9664\u5DE5\u5177\u300C${e.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})?!1:Vs(t)}function jS(){let t;try{t=Js()}catch(r){ke.confirm({title:"\u5BFC\u51FA\u5931\u8D25",message:String(r?.message||r),confirmText:"\u786E\u5B9A"});return}let e=m("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});e.value=t,e.readOnly=!0,ke.custom({title:"\u5BFC\u51FA\u5DE5\u5177 JSON",width:"600px",body:e,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:r=>r(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(t)}catch{e.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let r=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(r),o=m("a",{attrs:{href:s,download:`youyou_tools_${Date.now()}.json`}});document.body.appendChild(o),o.click(),setTimeout(()=>{try{document.body.removeChild(o)}catch{}try{URL.revokeObjectURL(s)}catch{}},100)}catch(r){pd.warn("\u4E0B\u8F7D\u5931\u8D25",{err:r})}}}]})}async function FS(){let t=m("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34 YouYou Toolkit \u5DE5\u5177 JSON"},style:{width:"100%",minHeight:"200px",fontSize:"12px",fontFamily:"monospace"}}),e=m("label",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"var(--yyt-text-secondary)",marginTop:"8px"}}),r=m("input",{attrs:{type:"checkbox"}});e.appendChild(r),e.appendChild(m("span",{text:"\u8986\u76D6\u6A21\u5F0F\uFF08\u6E05\u7A7A\u5DF2\u6709\u5DE5\u5177\u540E\u518D\u5BFC\u5165\uFF1B\u4E0D\u52FE\u9009\u5219\u5408\u5E76\uFF09"}));let s=m("div");s.appendChild(t),s.appendChild(e),s.appendChild(m("div",{style:{display:"flex",gap:"6px",marginTop:"8px"}},ue({label:"\u{1F4C1} \u4ECE\u6587\u4EF6\u2026",size:"small",variant:"ghost",onClick:()=>{let n=m("input",{attrs:{type:"file",accept:"application/json,.json"}});n.addEventListener("change",()=>{let a=n.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{t.value=String(i.result||""),t.focus()},i.readAsText(a)}),n.click()}}).el));let o=ke.custom({title:"\u5BFC\u5165\u5DE5\u5177 JSON",width:"520px",body:s,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:n=>n(null)},{label:"\u5BFC\u5165",variant:"primary",onClick:async n=>{let a=t.value.trim();if(!a){n(null);return}try{let i=Xs(a,{overwrite:r.checked});n(i)}catch(i){await ke.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(i?.message||i),confirmText:"\u786E\u5B9A"})}}}]});return setTimeout(()=>t.focus(),0),o.result}async function WS(){return await ke.confirm({title:"\u91CD\u7F6E\u6240\u6709\u5DE5\u5177",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u81EA\u5B9A\u4E49\u5DE5\u5177\u4E0E\u9884\u8BBE\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002\u5185\u7F6E\u5DE5\u5177\u4E0D\u53D7\u5F71\u54CD\u3002",confirmText:"\u91CD\u7F6E",danger:!0})?(Qs(),!0):!1}var pd,zS,fd=N(()=>{Fn();yr();Go();tr();H();pd=I.createScope("ToolActions"),zS=[{value:"api",label:"API"},{value:"prompt",label:"Prompt"},{value:"utility",label:"Utility"}]});H();function km(t,e={}){let{constants:r,topLevelWindow:s,modules:o}=t,{SCRIPT_ID:n,SCRIPT_VERSION:a,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=r,c=null,d=!1,u=I.createScope("Bootstrap");function y(...M){u.log(M.join(" "))}function p(...M){u.error(M.join(" "))}async function f(){return c||(c=(async()=>{try{o.storageModule=await Promise.resolve().then(()=>(ze(),bd)),o.apiConnectionModule=await Promise.resolve().then(()=>(Dn(),Sd)),o.presetManagerModule=await Promise.resolve().then(()=>(Lo(),Cd)),o.uiModule=await Promise.resolve().then(()=>(gm(),fm)),o.regexExtractorModule=await Promise.resolve().then(()=>(Gs(),el)),o.toolManagerModule=await Promise.resolve().then(()=>(Go(),Zu)),o.toolExecutorModule=await Promise.resolve().then(()=>(nc(),oc)),o.windowManagerModule=await Promise.resolve().then(()=>(Oc(),Ug)),o.toolRegistryModule=await Promise.resolve().then(()=>(tr(),ll)),o.settingsServiceModule=await Promise.resolve().then(()=>(fn(),Yy)),o.bypassManagerModule=await Promise.resolve().then(()=>(vo(),Hy)),o.variableResolverModule=await Promise.resolve().then(()=>(Da(),Qy)),o.contextInjectorModule=await Promise.resolve().then(()=>(ks(),Jy)),o.toolPromptServiceModule=await Promise.resolve().then(()=>(La(),ef)),o.toolOutputServiceModule=await Promise.resolve().then(()=>(gn(),rf)),o.toolAutomationServiceModule=await Promise.resolve().then(()=>(Tm(),vm)),o.toolDataProviderModule=await Promise.resolve().then(()=>(uo(),ty)),o.presetBootstrapModule=await Promise.resolve().then(()=>(Cm(),Am));try{o.toolDataProviderModule.getToolDataProvider({extensionVersion:a}).then(M=>{u.log(`Provider \u5C31\u7EEA: ${M.kind}`)}).catch(M=>{u.error(`Provider \u521D\u59CB\u5316\u5F02\u5E38: ${M?.message||M}`)})}catch(M){u.error(`Provider \u542F\u52A8\u5F02\u5E38: ${M?.message||M}`)}return o.toolOutputServiceModule?.toolOutputService&&o.apiConnectionModule&&o.toolOutputServiceModule.toolOutputService.setApiConnection(o.apiConnectionModule),!0}catch(M){return c=null,p("\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:",M),p("\u5DF2\u52A0\u8F7D\u6A21\u5757:",Object.keys(o).filter(_=>o[_])),!1}})(),c)}function g(){return`
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
    `}async function h(){let M=`${n}-styles`,_=s.document||document;if(_.getElementById(M))return;let C="",W=[];try{W.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{W.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}W.push("./styles/main.css");for(let R of[...new Set(W.filter(Boolean))])try{let S=await fetch(R);if(S.ok){C=await S.text();break}}catch{}C||(y("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),C=g());let q=_.createElement("style");q.id=M,q.textContent=C,(_.head||_.documentElement).appendChild(q),y("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function x(){let M=s.document||document;if(o.uiModule?.getAllStyles){let _=`${n}-ui-styles`;if(!M.getElementById(_)){let C=M.createElement("style");C.id=_,C.textContent=o.uiModule.getAllStyles(),(M.head||M.documentElement).appendChild(C)}}}async function v(){try{let{applyUiPreferences:M}=await Promise.resolve().then(()=>(yc(),pc));if(o.settingsServiceModule?.settingsService){let _=o.settingsServiceModule.settingsService.getUiSettings();if(_&&_.theme){let C=s.document||document;M(_,C),y(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${_.theme}`)}}}catch(M){y("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",M)}}function T(){let M=s.jQuery||window.jQuery;if(!M){p("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(T,1e3);return}let _=s.document||document,C=M("#extensionsMenu",_);if(!C.length){y("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(T,2e3);return}if(M(`#${l}`,C).length>0){y("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let q=M(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),R=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,S=M(R);S.on("click",function(j){j.stopPropagation(),y("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let ie=M("#extensionsMenuButton",_);ie.length&&C.is(":visible")&&ie.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),q.append(S),C.append(q),y("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function L(){y(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await h();let M=await f();if(y(M?"\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F":"\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u53EF\u7528\u529F\u80FD"),!d&&o.uiModule?.initUI)try{await o.uiModule.initUI({services:o,autoInjectStyles:!1,targetDocument:s.document||document}),d=!0,y("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(C){p("UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:",C)}if(o.uiModule&&(x(),await v()),o.presetBootstrapModule?.ensurePresetSystem)try{let C=o.presetBootstrapModule.ensurePresetSystem();C?.aborted?y(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5931\u8D25\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559: ${C.error}`):C?.skipped?y(`\u9884\u8BBE\u7CFB\u7EDF\u5DF2\u5C31\u7EEA\uFF08${C.reason}\uFF09`):y(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5B8C\u6210\uFF08${C.migratedCount}/${C.total} \u5DE5\u5177\uFF09`)}catch(C){p("\u9884\u8BBE\u7CFB\u7EDF\u521D\u59CB\u5316\u5F02\u5E38:",C)}if(o.toolAutomationServiceModule?.toolAutomationService){let C=o.toolAutomationServiceModule.toolAutomationService.init();y(C?"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316":"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u521D\u59CB\u5316\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u5BBF\u4E3B\u4E8B\u4EF6\u6E90\u91CD\u8BD5")}let _=s.document||document;_.readyState==="loading"?_.addEventListener("DOMContentLoaded",()=>{setTimeout(T,1e3)}):setTimeout(T,1e3),y("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:f,injectStyles:h,addMenuItem:T,init:L,log:y,logError:p}}Ge();qe();qe();H();var Co=I.createScope("PromptEditor"),LS="youyou_toolkit_prompt_editor",OS={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},BS={system:"fa-server",ai:"fa-robot",user:"fa-user"},In=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],di=class{constructor(e={}){this.containerId=e.containerId||LS,this.segments=e.segments||[...In],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){Co.error("jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...In],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let r=OS[e.type]||e.type,s=BS[e.type]||"fa-file",o=e.mainSlot==="A"||e.isMain,n=e.mainSlot==="B"||e.isMain2,a=o?"var(--yyt-accent, #7bb7ff)":n?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
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
    `}bindEvents(){this.$container&&(dt(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"),this.$container.on("click.yytPromptEditor",".yyt-prompt-toggle",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.on("click.yytPromptEditor",".yyt-prompt-delete",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(r)}),this.$container.on("change.yytPromptEditor",".yyt-prompt-role",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),s=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{role:s})}),this.$container.on("change.yytPromptEditor",".yyt-prompt-main-slot",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),s=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{mainSlot:s})}),this.$container.on("input.yytPromptEditor",".yyt-prompt-textarea",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-add-segment`,()=>{this.addSegment()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-import-prompt`,()=>{this.importPrompt()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-export-prompt`,()=>{this.exportPrompt()}),Nt(this.$container,{namespace:"yytPromptEditorSelect",selectors:[".yyt-prompt-role",".yyt-prompt-main-slot"]}))}addSegment(e=null){let r=`segment_${Date.now()}`,s=e||{id:r,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};s.id||(s.id=r),this.segments.push(s),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let r=this.segments.findIndex(o=>o.id===e);if(r===-1)return;if(this.segments[r].deletable===!1){Co.warn("\u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(r,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,r){let s=this.segments.find(o=>o.id===e);s&&(Object.assign(s,r),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=r=>{let s=r.target.files[0];if(!s)return;let o=new FileReader;o.onload=n=>{try{let a=JSON.parse(n.target.result);Array.isArray(a)?(this.setSegments(a),Co.log("\u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):Co.error("\u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){Co.error("\u5BFC\u5165\u5931\u8D25:",a)}},o.readAsText(s)},e.click()}exportPrompt(){let e=this.getSegments(),r=JSON.stringify(e,null,2),s=new Blob([r],{type:"application/json"}),o=URL.createObjectURL(s),n=document.createElement("a");n.href=o,n.download=`prompt_group_${Date.now()}.json`,n.click(),URL.revokeObjectURL(o),Co.log("\u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}destroy(){this.$container&&(dt(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"))}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};function Im(){return`
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
  `}function Rm(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function Mm(t){return Array.isArray(t)?t.map((e,r)=>({id:`segment_${r}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...In]}H();function Pm(t){let{constants:e,topLevelWindow:r,modules:s,caches:o,uiState:n}=t,{SCRIPT_ID:a,SCRIPT_VERSION:i,POPUP_ID:l}=e,c=I.createScope("PopupShell"),d={cleanup:null},u={cleanups:[]},y={cleanups:[]},p={current:null};function f(){return!!n.sidebarCollapsed}function g(){n.sidebarCollapsed=!n.sidebarCollapsed;let b=n.currentPopup;if(!b)return;let w=b.querySelector(".yyt-shell-sidebar"),k=b.querySelector(".yyt-shell-workspace"),P=b.querySelector(".yyt-sidebar-toggle i");w&&w.classList.toggle("yyt-collapsed",n.sidebarCollapsed),k&&k.classList.toggle("yyt-sidebar-collapsed",n.sidebarCollapsed),P&&(P.className=n.sidebarCollapsed?"fa-solid fa-angles-right":"fa-solid fa-angles-left"),Fe()}function h(...b){c.log(b.join(" "))}function x(...b){c.error(b.join(" "))}function v(b){return typeof b!="string"?"":b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function T(){return r.jQuery||window.jQuery}function L(){return r.document||document}function M(b){if(!b)return"\u672A\u9009\u62E9\u9875\u9762";let w=s.toolRegistryModule?.getToolConfig(b);if(!w)return b;if(!w.hasSubTabs)return w.name||b;let k=C(b),P=w.subTabs?.find(O=>O.id===k);return P?.name?`${w.name} / ${P.name}`:w.name||b}function _(b){if(!b)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let w=s.toolRegistryModule?.getToolConfig(b);if(!w)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!w.hasSubTabs)return w.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let k=C(b);return w.subTabs?.find(O=>O.id===k)?.description||w.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function C(b,w=""){let k=s.toolRegistryModule?.getToolConfig(b);if(!k?.hasSubTabs||!Array.isArray(k.subTabs)||k.subTabs.length===0)return"";let P=String(w||n.currentSubTab[b]||"").trim(),z=P&&k.subTabs.some(ee=>ee?.id===P)?P:k.subTabs[0]?.id||"";return z&&n.currentSubTab[b]!==z&&(n.currentSubTab[b]=z),z}function W(){let b=n.currentPopup;if(!b)return;let w=M(n.currentMainTab),k=_(n.currentMainTab),P=b.querySelector(".yyt-popup-active-label");P&&(P.textContent=`\u5F53\u524D\uFF1A${w}`);let O=b.querySelector(".yyt-shell-breadcrumb");O&&(O.textContent=w);let z=b.querySelector(".yyt-shell-main-title");z&&(z.textContent=w);let ee=b.querySelector(".yyt-shell-main-description");ee&&(ee.textContent=k)}function q(){typeof d.cleanup=="function"&&(d.cleanup(),d.cleanup=null)}function R(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(b=>{typeof b=="function"&&b()}),u.cleanups=[])}function S(){Array.isArray(y.cleanups)&&(y.cleanups.forEach(b=>{typeof b=="function"&&b()}),y.cleanups=[])}function U(b,w){if(!b||!w)return!1;let k=b.jquery?b[0]:b,P=w.jquery?w[0]:w;return!!(k&&P&&k===P)}function j(b={}){let{container:w=null}=b,k=p.current;if(k&&!(w&&!U(k.container,w))){try{typeof k.destroy=="function"&&k.destroy(k.container)}catch(P){x("\u9500\u6BC1\u52A8\u6001\u9762\u677F host \u5931\u8D25",P)}s.uiModule?.uiManager?.destroyContainerInstance&&s.uiModule.uiManager.destroyContainerInstance(k.container),p.current=null}}function ie(b,w={}){p.current={key:w.key||"",container:b,destroy:typeof w.destroy=="function"?w.destroy:null}}function Oe(){let b=T();if(!b||!n.currentPopup)return;let w=s.toolRegistryModule?.getToolList()||[],k=b(n.currentPopup).find(".yyt-main-nav");if(!k.length)return;let P=w.map(z=>`
      <div class="yyt-main-nav-item ${z.id===n.currentMainTab?"active":""}" data-tab="${z.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${v(z.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${v(z.name||z.id)}</span>
          <span class="yyt-main-nav-desc">${v(z.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");k.html(P),b(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let ee=b(this).data("tab");ee&&Qr(ee)});let O=b(n.currentPopup).find(".yyt-shell-sidebar-hint");O.length&&O.text(`${w.length} tabs`)}function Te(){let b=T();if(!b||!n.currentPopup)return;let w=s.toolRegistryModule?.getToolList()||[],k=s.toolRegistryModule?.getToolConfig("tools"),P=Array.isArray(k?.subTabs)?k.subTabs:[],O=P.filter(te=>te?.isCustom).length,z=P.filter(te=>!te?.isCustom).length,V=b(n.currentPopup).find(".yyt-shell-sidebar-stats");V.length&&(V.find(".yyt-shell-sidebar-stat").eq(0).find(".yyt-shell-sidebar-stat-value").text(String(w.length)),V.find(".yyt-shell-sidebar-stat").eq(1).find(".yyt-shell-sidebar-stat-value").text(String(z)),V.find(".yyt-shell-sidebar-stat").eq(2).find(".yyt-shell-sidebar-stat-value").text(String(O)))}function ae(){let b=s.toolRegistryModule?.getToolList()||[];return b.length?(b.some(w=>w.id===n.currentMainTab)||(n.currentMainTab=b[0].id),n.currentMainTab):null}async function rt(b={}){let{rebuildNavigation:w=!1,reRenderSubNav:k=!1}=b,P=T();if(!P||!n.currentPopup)return;j();let O=ae();if(!O)return;w&&(Oe(),Te());let z=s.toolRegistryModule?.getToolConfig(O),ee=!!z?.hasSubTabs,V=P(n.currentPopup).find(".yyt-sub-nav"),te=P(n.currentPopup).find(".yyt-content-inner");if(w&&te.length){let Se=new Set(te.find(".yyt-tab-content").map((fe,st)=>P(st).data("tab")).get());(s.toolRegistryModule?.getToolList()||[]).forEach(fe=>{Se.has(fe.id)||te.append(`<div class="yyt-tab-content" data-tab="${v(fe.id)}"></div>`)}),te.find(".yyt-tab-content").each((fe,st)=>{let Pt=P(st).data("tab");(s.toolRegistryModule?.getToolList()||[]).some(qt=>qt.id===Pt)||P(st).remove()})}P(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),P(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${O}"]`).addClass("active"),P(n.currentPopup).find(".yyt-tab-content").removeClass("active"),P(n.currentPopup).find(`.yyt-tab-content[data-tab="${O}"]`).addClass("active"),ee?(V.show(),(k||w)&&zs(O,z.subTabs)):V.hide(),await Zr(O),W(),Fe()}function cr(){if(!n.currentPopup)return;R();let b=()=>{if(n.currentMainTab==="presetManagement"){rt();return}n.currentMainTab==="tools"&&rt({reRenderSubNav:!0})},w=()=>{n.currentMainTab==="tools"?rt({rebuildNavigation:!0,reRenderSubNav:!0}):Te()},k=()=>{n.currentMainTab==="tools"&&rt({rebuildNavigation:!1,reRenderSubNav:!1})},P=()=>{(n.currentMainTab==="bypass"||n.currentMainTab==="tools")&&rt({reRenderSubNav:n.currentMainTab==="tools"})};[B.PRESET_CREATED,B.PRESET_UPDATED,B.PRESET_DELETED].forEach(O=>{u.cleanups.push(K.on(O,b))}),[B.TOOL_REGISTERED,B.TOOL_UPDATED,B.TOOL_UNREGISTERED].forEach(O=>{u.cleanups.push(K.on(O,w))}),u.cleanups.push(K.on(B.TOOL_RUNTIME_UPDATED,k)),[B.BYPASS_PRESET_CREATED,B.BYPASS_PRESET_UPDATED,B.BYPASS_PRESET_DELETED].forEach(O=>{u.cleanups.push(K.on(O,P))})}function J(b){return!!b?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown",".yyt-select-portal-layer"].join(","))}function ye(b){let w=b?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return w?w.scrollHeight>w.clientHeight+2||w.scrollWidth>w.clientWidth+2:!1}function Be(b,w){return w?.closest?.(".yyt-scrollable-surface")===b}function Mt(b,w){if(!b||!w)return null;let k=w.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return k&&(k.classList?.contains("yyt-select-portal-layer")||b.contains(k))&&(k.scrollHeight>k.clientHeight+2||k.scrollWidth>k.clientWidth+2)?k:[w.closest?.(".yyt-tool-list"),w.closest?.(".yyt-settings-content"),w.closest?.(".yyt-sub-content"),w.closest?.(".yyt-tab-content.active"),b].filter(Boolean).find(O=>O!==b&&!b.contains(O)?!1:O.scrollHeight>O.clientHeight+2||O.scrollWidth>O.clientWidth+2)||b}function Ye({mainTab:b=null,includeSubContent:w=!1}={}){let k=n.currentPopup;if(!k)return;let P=k.querySelector(".yyt-content");P&&(P.scrollTop=0,P.scrollLeft=0);let O=b?`.yyt-tab-content[data-tab="${b}"]`:".yyt-tab-content.active",z=k.querySelector(O);if(z&&(z.scrollTop=0,z.scrollLeft=0),!w)return;(z?.querySelectorAll(".yyt-sub-content")||[]).forEach(V=>{V.scrollTop=0,V.scrollLeft=0})}function dr(b){let w=L();if(!b||!w)return;b.classList.add("yyt-scrollable-surface");let k=!1,P=!1,O=0,z=0,ee=0,V=0,te=!1,Se=!1,fe=()=>{k=!1,P=!1,b.classList.remove("yyt-scroll-dragging")},st=Y=>{Y.button===0&&(J(Y.target)||Be(b,Y.target)&&(te=b.scrollWidth>b.clientWidth+2,Se=b.scrollHeight>b.clientHeight+2,!(!te&&!Se)&&(Y.stopPropagation(),k=!0,P=!1,O=Y.clientX,z=Y.clientY,ee=b.scrollLeft,V=b.scrollTop)))},Pt=Y=>{if(!k)return;let ct=Y.clientX-O,Qe=Y.clientY-z;!(Math.abs(ct)>4||Math.abs(Qe)>4)&&!P||(P=!0,b.classList.add("yyt-scroll-dragging"),te&&(b.scrollLeft=ee-ct),Se&&(b.scrollTop=V-Qe),Y.preventDefault())},qt=()=>{fe()},kr=Y=>{if(Y.ctrlKey||ye(Y.target)||!b.classList.contains("yyt-content")&&!Be(b,Y.target))return;let Qe=Mt(b,Y.target);!Qe||Qe!==b&&!b.contains(Qe)||!(Qe.scrollHeight>Qe.clientHeight+2||Qe.scrollWidth>Qe.clientWidth+2)||(Math.abs(Y.deltaY)>0&&(Qe.scrollTop+=Y.deltaY),Math.abs(Y.deltaX)>0&&(Qe.scrollLeft+=Y.deltaX),Y.preventDefault(),Y.stopPropagation())},ot=Y=>{P&&Y.preventDefault()};b.addEventListener("mousedown",st),b.addEventListener("wheel",kr,{passive:!1}),b.addEventListener("dragstart",ot),w.addEventListener("mousemove",Pt),w.addEventListener("mouseup",qt),y.cleanups.push(()=>{fe(),b.classList.remove("yyt-scrollable-surface"),b.removeEventListener("mousedown",st),b.removeEventListener("wheel",kr),b.removeEventListener("dragstart",ot),w.removeEventListener("mousemove",Pt),w.removeEventListener("mouseup",qt)})}function Fe(){let b=n.currentPopup;if(!b)return;S();let w=[...b.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...b.querySelectorAll(".yyt-sub-nav"),...b.querySelectorAll(".yyt-content"),...b.querySelectorAll(".yyt-settings-content"),...b.querySelectorAll(".yyt-tool-list")];[...new Set(w)].forEach(dr)}function ko(b){return`
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
    `}function Io(b){let w=T();if(!w||!n.currentPopup||n.startupScreenDismissed)return;let k=w(n.currentPopup).find(".yyt-popup-body"),P=k.find(".yyt-popup-shell");!k.length||!P.length||k.find("[data-yyt-startup-screen]").length||(P.attr("data-yyt-startup-visible","true"),k.prepend(ko(b)),k.find(".yyt-startup-enter").on("click",()=>{k.find("[data-yyt-startup-screen]").remove(),P.removeAttr("data-yyt-startup-visible"),n.startupScreenDismissed=!0,Fe()}))}function Ar(){let b=L(),w=n.currentPopup,k=w?.querySelector(".yyt-popup-header");if(!w||!k||!b)return;let P=!1,O=0,z=0,ee=0,V=0,te="",Se=()=>({width:r.innerWidth||b.documentElement?.clientWidth||window.innerWidth||0,height:r.innerHeight||b.documentElement?.clientHeight||window.innerHeight||0}),fe=(ot,Y,ct)=>Math.min(Math.max(ot,Y),ct),st=()=>{P&&(P=!1,w.classList.remove("yyt-popup-dragging"),b.body.style.userSelect=te)},Pt=ot=>{if(!P||!n.currentPopup)return;let Y=ot.clientX-O,ct=ot.clientY-z,{width:Qe,height:yi}=Se(),Hm=w.offsetWidth||0,Ym=w.offsetHeight||0,Gm=Math.max(0,Qe-Hm),qm=Math.max(0,yi-Ym);w.style.left=`${fe(ee+Y,0,Gm)}px`,w.style.top=`${fe(V+ct,0,qm)}px`,w.style.transform="none",w.style.right="auto",w.style.bottom="auto"},qt=()=>{st()},kr=ot=>{if(ot.button!==0||ot.target?.closest(".yyt-popup-close"))return;P=!0,O=ot.clientX,z=ot.clientY;let Y=w.getBoundingClientRect();ee=Y.left,V=Y.top,w.style.left=`${Y.left}px`,w.style.top=`${Y.top}px`,w.style.transform="none",w.style.right="auto",w.style.bottom="auto",w.classList.add("yyt-popup-dragging"),te=b.body.style.userSelect||"",b.body.style.userSelect="none",ot.preventDefault()};k.addEventListener("mousedown",kr),b.addEventListener("mousemove",Pt),b.addEventListener("mouseup",qt),d.cleanup=()=>{st(),k.removeEventListener("mousedown",kr),b.removeEventListener("mousemove",Pt),b.removeEventListener("mouseup",qt)}}function Cr(){j(),q(),R(),S();let b=T();if(b&&n.currentPopup){let w=b(n.currentPopup);dt(w,"yytPopupToolConfigSelect"),dt(w,"yytPromptEditorSelect")}n.currentPopup&&(n.currentPopup.remove(),n.currentPopup=null),n.currentOverlay&&(n.currentOverlay.remove(),n.currentOverlay=null),h("\u5F39\u7A97\u5DF2\u5173\u95ED")}function Qr(b){j(),n.currentMainTab=b;let w=T();if(!w||!n.currentPopup)return;Ye({mainTab:b,includeSubContent:!0}),w(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),w(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${b}"]`).addClass("active");let k=s.toolRegistryModule?.getToolConfig(b);k?.hasSubTabs?(w(n.currentPopup).find(".yyt-sub-nav").show(),zs(b,k.subTabs)):w(n.currentPopup).find(".yyt-sub-nav").hide(),w(n.currentPopup).find(".yyt-tab-content").removeClass("active"),w(n.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`).addClass("active"),Zr(b),W(),Fe()}function Bs(b,w){j(),n.currentSubTab[b]=w;let k=T();!k||!n.currentPopup||(Ye({mainTab:b,includeSubContent:!0}),k(n.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),k(n.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${w}"]`).addClass("active"),es(b,w),W(),Fe())}function zs(b,w){let k=T();if(!k||!n.currentPopup||!w)return;let P=C(b,n.currentSubTab[b]||w[0]?.id),z=(b==="tools"?[{key:"ai",title:"AI \u5DE5\u5177",items:w.filter(V=>!V?.isCustom&&(V?.toolKind||"ai")!=="script")},{key:"script",title:"\u811A\u672C\u5DE5\u5177",items:w.filter(V=>!V?.isCustom&&V?.toolKind==="script")},{key:"custom",title:"\u81EA\u5B9A\u4E49\u5DE5\u5177",items:w.filter(V=>V?.isCustom===!0)}].filter(V=>V.items.length>0):[{key:"default",title:"",items:w}]).map(V=>{let te=V.title?`<div class="yyt-sub-nav-group-title">${v(V.title)}</div>`:"",Se=V.items.map(fe=>{let st=fe?.isCustom===!0,Pt=b==="tools"&&st?`<div class="yyt-sub-nav-item-actions">
               <button type="button" class="yyt-sub-nav-item-action" data-action="edit" data-subtab="${fe.id}" title="\u7F16\u8F91"><i class="fa-solid fa-pen"></i></button>
               <button type="button" class="yyt-sub-nav-item-action" data-action="delete" data-subtab="${fe.id}" title="\u5220\u9664"><i class="fa-solid fa-trash"></i></button>
             </div>`:"";return`
        <div class="yyt-sub-nav-item ${fe.id===P?"active":""}" data-subtab="${fe.id}" data-tool-name="${v((fe.name||fe.id).toLowerCase())}">
          <i class="fa-solid ${fe.icon||"fa-file"}"></i>
          <span class="yyt-sub-nav-item-label">${v(fe.name||fe.id)}</span>
          ${Pt}
        </div>
      `}).join("");return`
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${V.key}">
          ${te}
          <div class="yyt-sub-nav-group-items">
            ${Se}
          </div>
        </div>
      `}).join(""),ee=b==="tools"?`<div class="yyt-sub-nav-toolbar">
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="add" title="\u65B0\u5EFA\u81EA\u5B9A\u4E49\u5DE5\u5177"><i class="fa-solid fa-plus"></i><span>\u65B0\u5EFA</span></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="import" title="\u4ECE JSON \u5BFC\u5165\u5DE5\u5177"><i class="fa-solid fa-file-import"></i></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="export" title="\u5BFC\u51FA\u5DE5\u5177 JSON"><i class="fa-solid fa-file-export"></i></button>
         </div>
         <div class="yyt-sub-nav-filter-wrap">
           <input type="text" class="yyt-sub-nav-filter" placeholder="\u7B5B\u9009\u5DE5\u5177\u2026" autocomplete="off">
         </div>`:"";k(n.currentPopup).find(".yyt-sub-nav").html(ee+z),k(n.currentPopup).find(".yyt-sub-nav-item").on("click",function(te){if(te.target.closest&&te.target.closest(".yyt-sub-nav-item-action"))return;let Se=k(this).data("subtab");Bs(b,Se)}),b==="tools"&&Mo(b),Fe()}function Ro(b){if(!n.currentPopup)return;let w=T();if(!w)return;let k=String(b||"").trim().toLowerCase();w(n.currentPopup).find(".yyt-sub-nav-item").each(function(){let O=String(w(this).data("tool-name")||"");w(this).toggle(!k||O.includes(k))}),w(n.currentPopup).find(".yyt-sub-nav-group").each(function(){let O=w(this).find(".yyt-sub-nav-item:visible").length>0;w(this).toggle(O)})}function Mo(b){let w=T();if(!w||!n.currentPopup)return;let k=w(n.currentPopup).find(".yyt-sub-nav");k.find(".yyt-sub-nav-filter").off("input.yytFilter").on("input.yytFilter",function(){Ro(this.value)}),k.find(".yyt-sub-nav-toolbar-btn").off("click.yytToolAction").on("click.yytToolAction",async function(P){P.preventDefault(),P.stopPropagation();let O=w(this).data("tool-action");try{let z=await Promise.resolve().then(()=>(fd(),yd));if(O==="add"){let ee=await z.showToolEditDialog(null);ee&&(n.currentSubTab[b]=ee,Bs(b,ee))}else O==="import"?await z.showImportToolsDialog():O==="export"&&z.showExportToolsDialog()}catch(z){x("\u5DE5\u5177\u64CD\u4F5C\u5931\u8D25",z)}}),k.find(".yyt-sub-nav-item-action").off("click.yytItemAction").on("click.yytItemAction",async function(P){P.preventDefault(),P.stopPropagation();let O=w(this).data("action"),z=String(w(this).data("subtab")||"");if(z)try{let ee=await Promise.resolve().then(()=>(fd(),yd));O==="edit"?await ee.showToolEditDialog(z):O==="delete"&&await ee.confirmDeleteTool(z)&&n.currentSubTab[b]===z&&(n.currentSubTab[b]="")}catch(ee){x("\u5DE5\u5177\u884C\u5185\u64CD\u4F5C\u5931\u8D25",ee)}})}async function Zr(b){let w=T();if(!w||!n.currentPopup)return;let k=w(n.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`);if(!k.length)return;if(s.toolRegistryModule?.getToolConfig(b)?.hasSubTabs){let z=C(b);z?await es(b,z):k.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5B50 tab \u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>'),Fe();return}await s.uiModule?.renderMainTab?.(b,k)||$m(b,k),Fe()}async function es(b,w){let k=T();if(!k||!n.currentPopup)return;let P=k(n.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`);if(!P.length)return;let O=s.toolRegistryModule?.getToolConfig(b);if(O?.hasSubTabs){let ee=C(b,w),V=O.subTabs?.find(st=>st.id===ee),te=P.find(".yyt-sub-content");if(te.length||(P.html('<div class="yyt-sub-content"></div>'),te=P.find(".yyt-sub-content")),!V){te.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5F53\u524D\u5B50\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u5931\u6548</span></div>'),Ye({mainTab:b,includeSubContent:!0}),Fe();return}let Se=V.component;if(Se==="GenericToolConfigPanel"){await ts(V,te),Ye({mainTab:b,includeSubContent:!0}),Fe();return}j({container:te});let fe=await s.uiModule?.renderSubTabComponent?.(Se,te);fe?ie(te,{key:fe}):te.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>'),Ye({mainTab:b,includeSubContent:!0}),Fe();return}let z=P.find(".yyt-sub-content");if(z.length){switch(j({container:z}),w){case"config":Lm(b,z);break;case"prompts":await Om(b,z);break;case"presets":Bm(b,z);break;default:z.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}Ye({mainTab:b,includeSubContent:!0}),Fe()}}async function ts(b,w){if(!(!T()||!w?.length||!b?.id)){j({container:w});try{let P=o.dynamicToolPanelCache.get(b.id);if(!P){let ee=(await Promise.resolve().then(()=>(Eo(),uf)))?.createToolConfigPanel;if(typeof ee!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");P=()=>ee({id:`${b.id}Panel`,toolId:b.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${b.name||b.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${b.id}-extraction-preview`,previewTitle:`${b.name||b.id} \u63D0\u53D6\u9884\u89C8`}),o.dynamicToolPanelCache.set(b.id,P)}let O=P();O.renderTo(w),ie(w,{key:b.id,destroy:typeof O?.destroy=="function"?z=>O.destroy(z):null}),Fe()}catch(P){p.current=null,x("\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:",P),w.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}}function $m(b,w){if(!T())return;let P=s.toolRegistryModule?.getToolConfig(b);if(!P){w.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let O=n.currentSubTab[b]||P.subTabs?.[0]?.id||"config";w.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${O}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),es(b,O)}function Lm(b,w){if(!T())return;let P=s.toolManagerModule?.getTool(b),O=s.presetManagerModule?.getAllPresets()||[],z=s.toolRegistryModule?.getToolApiPreset(b)||"",ee=O.map(V=>`<option value="${v(V.name)}" ${V.name===z?"selected":""}>${v(V.name)}</option>`).join("");w.html(`
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
    `),Nt(w,{namespace:"yytPopupToolConfigSelect",selectors:["#yyt-tool-api-preset"]}),w.find("#yyt-save-tool-preset").on("click",function(){let te=w.find("#yyt-tool-api-preset").val();s.toolRegistryModule?.setToolApiPreset(b,te);let Se=r.toastr;Se&&Se.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function Om(b,w){if(!T()){w.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let O=s.toolManagerModule?.getTool(b)?.config?.messages||[],z=Mm(O)||In,ee=new di({containerId:`yyt-prompt-editor-${b}`,segments:z,onChange:te=>{let Se=Rm(te);h("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",Se.length,"\u6761\u6D88\u606F")}});w.html(`<div id="yyt-prompt-editor-${b}" class="yyt-prompt-editor-container"></div>`),ee.init(w.find(`#yyt-prompt-editor-${b}`));let V=Im();if(V){let te="yyt-prompt-editor-styles",Se=r.document||document;if(!Se.getElementById(te)){let fe=Se.createElement("style");fe.id=te,fe.textContent=V,(Se.head||Se.documentElement).appendChild(fe)}}}function Bm(b,w){T()&&w.html(`
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
    `)}function zm(){return`
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
      </div>`}function Km(b,w,k){let P=f(),O=b.map(z=>`
      <div class="yyt-main-nav-item ${z.id===n.currentMainTab?"active":""}" data-tab="${z.id}">
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
      </aside>`}function Um(b,w){return`
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
      </div>`}function jm(b,w){return b.map(k=>`
      <div class="yyt-tab-content ${k.id===w?"active":""}" data-tab="${k.id}">
      </div>
    `).join("")}function Fm(b){return`
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
      </div>`}async function Wm(){if(n.currentPopup){h("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let b=t?.services?.loadModules;typeof b=="function"&&await b();let w=T(),k=L();if(!w){x("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let P=s.toolRegistryModule?.getToolList()||[];if(!P.length){x("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}P.some(Y=>Y.id===n.currentMainTab)||(n.currentMainTab=P[0].id);let O=s.toolRegistryModule?.getToolConfig("tools"),z=Array.isArray(O?.subTabs)?O.subTabs:[],ee=z.filter(Y=>Y?.isCustom).length,V=z.filter(Y=>!Y?.isCustom).length,te=M(n.currentMainTab),Se=_(n.currentMainTab);n.currentOverlay=k.createElement("div"),n.currentOverlay.className="yyt-popup-overlay",n.currentOverlay.addEventListener("click",Y=>{Y.target===n.currentOverlay&&Cr()}),k.body.appendChild(n.currentOverlay);let fe=f(),st=`
      <div class="yyt-popup" id="${l}">
        ${zm()}
        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-workspace${fe?" yyt-sidebar-collapsed":""}">
              ${Km(P,V,ee)}
              <section class="yyt-shell-main">
                ${Um(te,Se)}
                <div class="yyt-sub-nav" style="display: none;"></div>
                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${jm(P,n.currentMainTab)}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        ${Fm(te)}
      </div>
    `,Pt=k.createElement("div");Pt.innerHTML=st,n.currentPopup=Pt.firstElementChild,k.body.appendChild(n.currentPopup),w(n.currentPopup).find(".yyt-popup-close").on("click",Cr),w(n.currentPopup).find(".yyt-sidebar-toggle").on("click",g);let qt=Y=>{Y.key==="Escape"&&(k.querySelector(".yyt-dialog-overlay")||k.querySelector(".yyt-twb-editor-drawer.is-open")||(Y.stopPropagation(),Cr()))},kr=Y=>{if(!(Y.ctrlKey||Y.metaKey)||Y.key!=="s"||!n.currentPopup)return;Y.preventDefault(),Y.stopPropagation();let ct=w(n.currentPopup),Qe=ct.find("#yyt-bypass-save:visible").first()||ct.find(`#${a}-save-api-config:visible`).first()||ct.find("#yyt-save-tool-preset:visible").first()||ct.find('[data-twb-action="save"]:visible').first();Qe?.length&&Qe.trigger("click")};k.addEventListener("keydown",qt),k.addEventListener("keydown",kr),u.cleanups.push(()=>{k.removeEventListener("keydown",qt),k.removeEventListener("keydown",kr)}),cr(),w(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let ct=w(this).data("tab");ct&&Qr(ct)}),Ar(),Zr(n.currentMainTab);let ot=s.toolRegistryModule?.getToolConfig(n.currentMainTab);ot?.hasSubTabs&&(w(n.currentPopup).find(".yyt-sub-nav").show(),zs(n.currentMainTab,ot.subTabs)),W(),Io(P),Fe(),h("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:Wm,closePopup:Cr,switchMainTab:Qr,switchSubTab:Bs,renderTabContent:Zr,renderSubTabContent:es}}function Nm(t,e={}){let{constants:r,modules:s}=t,{SCRIPT_ID:o,SCRIPT_VERSION:n}=r,{init:a,loadModules:i,addMenuItem:l,popupShell:c}=e;return{version:n,id:o,init:a,openPopup:c?.openPopup,closePopup:c?.closePopup,switchMainTab:c?.switchMainTab,switchSubTab:c?.switchSubTab,addMenuItem:l,getStorage:()=>s.storageModule,getApiConnection:()=>s.apiConnectionModule,getPresetManager:()=>s.presetManagerModule,getUi:()=>s.uiModule,getUiModule:()=>s.uiModule,getRegexExtractor:()=>s.regexExtractorModule,getToolManager:()=>s.toolManagerModule,getToolExecutor:()=>s.toolExecutorModule,getWindowManager:()=>s.windowManagerModule,getToolRegistry:()=>s.toolRegistryModule,getSettingsService:()=>s.settingsServiceModule,getBypassManager:()=>s.bypassManagerModule,getVariableResolver:()=>s.variableResolverModule,getContextInjector:()=>s.contextInjectorModule,getToolPromptService:()=>s.toolPromptServiceModule,getToolOutputService:()=>s.toolOutputServiceModule,getToolAutomationService:()=>s.toolAutomationServiceModule,getDataProvider:()=>s.toolDataProviderModule?.getCurrentProvider?.()||null,async getDataProviderAsync(){return await i(),s.toolDataProviderModule?.getToolDataProvider?.()||null},async getApiConfig(){return await i(),s.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(d){return await i(),s.apiConnectionModule?(s.apiConnectionModule.updateApiConfig(d),!0):!1},async getPresets(){return await i(),s.presetManagerModule?s.presetManagerModule.getAllPresets():[]},async sendApiRequest(d,u){if(await i(),s.apiConnectionModule)return s.apiConnectionModule.sendApiRequest(d,u);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),s.apiConnectionModule?s.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(d,u){return s.toolRegistryModule?.registerTool(d,u)||!1},unregisterTool(d){return s.toolRegistryModule?.unregisterTool(d)||!1},getToolList(){return s.toolRegistryModule?.getToolList()||[]},createWindow(d){return s.windowManagerModule?.createWindow(d)||null},closeWindow(d){s.windowManagerModule?.closeWindow(d)},startAutomation(){return s.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){s.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return s.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},cancelAutomation(d={}){return s.toolAutomationServiceModule?.toolAutomationService?.cancelAutomation?.(d)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}},async processCurrentAssistantMessage(d={}){return s.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(d)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var ui="youyou_toolkit",HS="1.0.203",YS=`${ui}-menu-item`,GS=`${ui}-menu-container`,qS=`${ui}-popup`,VS=typeof window.parent<"u"?window.parent:window,pi={constants:{SCRIPT_ID:ui,SCRIPT_VERSION:HS,MENU_ITEM_ID:YS,MENU_CONTAINER_ID:GS,POPUP_ID:qS},topLevelWindow:VS,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null,toolAutomationServiceModule:null,toolDataProviderModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"presetManagement",currentSubTab:{},startupScreenDismissed:!1}},Dm=Pm(pi),Rn=km(pi,{openPopup:Dm.openPopup});pi.services.loadModules=Rn.loadModules;var gd=Nm(pi,{init:Rn.init,loadModules:Rn.loadModules,addMenuItem:Rn.addMenuItem,popupShell:Dm});if(typeof window<"u"&&(window.YouYouToolkit=gd,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=gd}catch{}var mI=gd;Rn.init();Promise.resolve().then(()=>(H(),hd)).then(({logger:t})=>{t.createScope("Bootstrap").log("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210")});export{mI as default};
