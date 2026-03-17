var qo=Object.defineProperty;var E=(e,t)=>()=>(e&&(t=e(e=0)),t);var N=(e,t)=>{for(var s in t)qo(e,s,{get:t[s],enumerable:!0})};function on(){let e=m;return e._getStorage(),e._storage}function k(){return m.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function q(e){m.set("settings",e)}var wt,m,P,nn,le,Tt=E(()=>{wt=class e{constructor(t="youyou_toolkit"){this.namespace=t,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let t=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(t.SillyTavern?.getContext){let s=t.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespace]||(s.extensionSettings[this.namespace]={}),this._storage={_target:s.extensionSettings[this.namespace],getItem:r=>{let n=s.extensionSettings[this.namespace][r];return typeof n=="string"?n:n?JSON.stringify(n):null},setItem:(r,n)=>{s.extensionSettings[this.namespace][r]=n,this._saveSettings(s)},removeItem:r=>{delete s.extensionSettings[this.namespace][r],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespace}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:t=>{try{return localStorage.getItem(t)}catch{return null}},setItem:(t,s)=>{try{localStorage.setItem(t,s)}catch(r){console.error(`[${this.namespace}] localStorage\u5199\u5165\u5931\u8D25:`,r)}},removeItem:t=>{try{localStorage.removeItem(t)}catch{}},_isTavern:!1},this._storage}_saveSettings(t){if(typeof t.saveSettings=="function")try{t.saveSettings()}catch{}else if(typeof t.saveSettingsDebounced=="function")try{t.saveSettingsDebounced()}catch{}}get(t,s=null){let r=`${this.namespace}:${t}`;if(this._cache.has(r))return this._cache.get(r);let n=this._getStorage(),o=this._getFullKey(t),i=n.getItem(o);if(i===null)return s;try{let a=JSON.parse(i);return this._cache.set(r,a),a}catch{return i}}set(t,s){let r=this._getStorage(),n=this._getFullKey(t),o=`${this.namespace}:${t}`;this._cache.set(o,s);try{r.setItem(n,JSON.stringify(s))}catch(i){console.error(`[${this.namespace}] \u5B58\u50A8\u5931\u8D25:`,i)}}remove(t){let s=this._getStorage(),r=this._getFullKey(t),n=`${this.namespace}:${t}`;this._cache.delete(n),s.removeItem(r)}has(t){let s=this._getStorage(),r=this._getFullKey(t);return s.getItem(r)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let r=s.SillyTavern.getContext();r?.extensionSettings?.[this.namespace]&&(r.extensionSettings[this.namespace]={},this._saveSettings(r))}}else{let s=`${this.namespace}_`,r=[];for(let n=0;n<localStorage.length;n++){let o=localStorage.key(n);o&&o.startsWith(s)&&r.push(o)}r.forEach(n=>localStorage.removeItem(n))}this._cache.clear()}_getFullKey(t){return this._getStorage()._isTavern?t:`${this.namespace}_${t}`}namespace(t){return new e(`${this.namespace}:${t}`)}getMultiple(t){let s={};return t.forEach(r=>{s[r]=this.get(r)}),s}setMultiple(t){Object.entries(t).forEach(([s,r])=>{this.set(s,r)})}exportAll(){let t=this._getStorage(),s={};if(t._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let o=r.SillyTavern.getContext()?.extensionSettings?.[this.namespace]||{};Object.entries(o).forEach(([i,a])=>{s[i]=typeof a=="string"?JSON.parse(a):a})}}else{let r=`${this.namespace}_`;for(let n=0;n<localStorage.length;n++){let o=localStorage.key(n);if(o&&o.startsWith(r)){let i=o.slice(r.length);try{s[i]=JSON.parse(localStorage.getItem(o))}catch{s[i]=localStorage.getItem(o)}}}}return s}},m=new wt("youyou_toolkit"),P=new wt("youyou_toolkit:tools"),nn=new wt("youyou_toolkit:presets"),le=new wt("youyou_toolkit:windows")});var ln={};N(ln,{DEFAULT_API_PRESETS:()=>Jo,DEFAULT_SETTINGS:()=>Qo,STORAGE_KEYS:()=>ce,StorageService:()=>wt,deepMerge:()=>an,getCurrentPresetName:()=>Et,getStorage:()=>on,loadApiPresets:()=>j,loadSettings:()=>k,presetStorage:()=>nn,saveApiPresets:()=>dt,saveSettings:()=>q,setCurrentPresetName:()=>Wt,storage:()=>m,toolStorage:()=>P,windowStorage:()=>le});function j(){return m.get(ce.API_PRESETS)||[]}function dt(e){m.set(ce.API_PRESETS,e)}function Et(){return m.get(ce.CURRENT_PRESET)||""}function Wt(e){m.set(ce.CURRENT_PRESET,e||"")}function an(e,t){let s=n=>n&&typeof n=="object"&&!Array.isArray(n),r={...e};return s(e)&&s(t)&&Object.keys(t).forEach(n=>{s(t[n])?n in e?r[n]=an(e[n],t[n]):Object.assign(r,{[n]:t[n]}):Object.assign(r,{[n]:t[n]})}),r}var ce,Qo,Jo,de=E(()=>{Tt();Tt();ce={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},Qo={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},Jo=[]});var yn={};N(yn,{API_STATUS:()=>Vo,fetchAvailableModels:()=>Ns,getApiConfig:()=>St,getEffectiveApiConfig:()=>ye,hasEffectiveApiPreset:()=>Os,sendApiRequest:()=>Ls,sendWithPreset:()=>Ko,testApiConnection:()=>si,updateApiConfig:()=>qt,validateApiConfig:()=>Qt});function St(){return k().apiConfig||{}}function qt(e){let t=k();t.apiConfig={...t.apiConfig,...e},q(t)}function Qt(e){let t=[];if(e.useMainApi)return{valid:!0,errors:[]};if(!e.url||!e.url.trim())t.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(e.url)}catch{t.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!e.model||!e.model.trim())&&t.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:t.length===0,errors:t}}function ye(e=""){let t=k(),s=e||Et()||"";if(s){let n=(j()||[]).find(o=>o.name===s);if(n&&n.apiConfig)return{...n.apiConfig,presetName:n.name}}return t.apiConfig||{}}function Os(e=""){return e?(j()||[]).some(s=>s?.name===e):!1}async function Ko(e,t,s={},r=null){let n=ye(e);return await Ls(t,{...s,apiConfig:n},r)}function cn(e,t={}){let s=t.apiConfig||St();return{messages:e,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:!1,...t.extraParams}}function dn(e){let t="";if(e?.choices&&e.choices[0]?.message?.content)t=e.choices[0].message.content;else if(e?.content)t=e.content;else if(e?.text)t=e.text;else if(e?.response)t=e.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(e).slice(0,200)}`);return String(t||"").trim()}async function Ls(e,t={},s=null){let r=t.apiConfig||St(),n=r.useMainApi,o=Qt(r);if(!o.valid&&!n)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${o.errors.join(", ")}`);return n?await Xo(e,t,s):await Zo(e,r,t,s)}async function Xo(e,t,s){let r=typeof window.parent<"u"?window.parent:window;if(!r.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let n=await r.TavernHelper.generateRaw({ordered_prompts:e,should_stream:!1,...t.extraParams});if(typeof n!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return n.trim()}catch(n){throw n.name==="AbortError"?n:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${n.message}`)}}async function Zo(e,t,s,r){let n=typeof window.parent<"u"?window.parent:window;if(n.SillyTavern?.getRequestHeaders)try{return await ti(e,t,s,r,n)}catch{}return await ei(e,t,s,r)}async function ti(e,t,s,r,n){let o={...cn(e,{apiConfig:t,...s}),chat_completion_source:"custom",reverse_proxy:t.url,proxy_password:"",custom_url:t.url,custom_include_headers:t.apiKey?`Authorization: Bearer ${t.apiKey}`:""},i={...typeof n.SillyTavern?.getRequestHeaders=="function"?n.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},a=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(o),signal:r}),l=await a.text().catch(()=>"");if(!a.ok)throw new Error(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${a.status}): ${l||"Unknown error"}`);let c=null;try{c=l?JSON.parse(l):{}}catch{let p=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${p||"(\u7A7A\u54CD\u5E94)"}`)}return dn(c)}async function ei(e,t,s,r){let n=cn(e,{apiConfig:t,...s}),o={"Content-Type":"application/json"};t.apiKey&&(o.Authorization=`Bearer ${t.apiKey}`);let i=await fetch(t.url,{method:"POST",headers:o,body:JSON.stringify(n),signal:r}),a=await i.text().catch(()=>"");if(!i.ok){let c=a||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${c}`)}let l=null;try{l=a?JSON.parse(a):{}}catch{let y=String(a||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${y||"(\u7A7A\u54CD\u5E94)"}`)}return dn(l)}async function si(e=null){let t=e||St(),s=Date.now();try{await Ls([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:t});let n=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${n}ms)`,latency:n}}catch(r){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${r.message}`,latency:Date.now()-s}}}async function Ns(e=null){let t=e||St();return t.useMainApi?await ri():await ni(t)}async function ri(){let e=typeof window.parent<"u"?window.parent:window;try{if(e.SillyTavern?.getContext){let t=e.SillyTavern.getContext();if(t.settings?.api_server)return[t.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function ni(e){if(!e.url||!e.apiKey)return[];try{let s=`${e.url.replace(/\/chat\/completions$/,"").replace(/\/completions$/,"")}/models`,r=await fetch(s,{method:"GET",headers:{Authorization:`Bearer ${e.apiKey}`}});if(!r.ok)return[];let n=await r.json();return n.data&&Array.isArray(n.data)?n.data.map(o=>o.id||o.name).filter(Boolean).sort():[]}catch{return[]}}var Vo,Le=E(()=>{de();Vo={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var un={};N(un,{createPreset:()=>Ne,createPresetFromCurrentConfig:()=>li,deletePreset:()=>je,duplicatePreset:()=>ai,exportPresets:()=>Gs,generateUniquePresetName:()=>Fs,getActiveConfig:()=>Bs,getActivePresetName:()=>Ue,getAllPresets:()=>Jt,getPreset:()=>Dt,getPresetNames:()=>oi,getStarredPresets:()=>zs,importPresets:()=>Ys,presetExists:()=>ue,renamePreset:()=>ii,switchToPreset:()=>Ot,togglePresetStar:()=>Us,updatePreset:()=>js,validatePreset:()=>ci});function Jt(){return j()}function oi(){return j().map(t=>t.name)}function Dt(e){return!e||typeof e!="string"?null:j().find(s=>s.name===e)||null}function ue(e){return!e||typeof e!="string"?!1:j().some(s=>s.name===e)}function Ne(e){let{name:t,description:s,apiConfig:r}=e;if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let n=t.trim();if(ue(n))return{success:!1,message:`\u9884\u8BBE "${n}" \u5DF2\u5B58\u5728`};let o={name:n,description:s||"",apiConfig:{url:r?.url||"",apiKey:r?.apiKey||"",model:r?.model||"",useMainApi:r?.useMainApi??!0,max_tokens:r?.max_tokens||4096,temperature:r?.temperature??.7,top_p:r?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},i=j();return i.push(o),dt(i),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:o}}function js(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=j(),r=s.findIndex(i=>i.name===e);if(r===-1)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(t.name&&t.name!==e)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let n=s[r],o={...n,...t,name:n.name,updatedAt:Date.now()};return t.apiConfig&&(o.apiConfig={...n.apiConfig,...t.apiConfig}),s[r]=o,dt(s),{success:!0,message:`\u9884\u8BBE "${e}" \u66F4\u65B0\u6210\u529F`,preset:o}}function je(e){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=j(),s=t.findIndex(r=>r.name===e);return s===-1?{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}:(t.splice(s,1),dt(t),Et()===e&&Wt(""),{success:!0,message:`\u9884\u8BBE "${e}" \u5DF2\u5220\u9664`})}function ii(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=t.trim();if(!ue(e))return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(ue(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let r=j(),n=r.find(o=>o.name===e);return n&&(n.name=s,n.updatedAt=Date.now(),dt(r),Et()===e&&Wt(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function ai(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=t.trim(),r=Dt(e);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(ue(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(r)),name:s,createdAt:Date.now(),updatedAt:Date.now()},o=j();return o.push(n),dt(o),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:n}}function Us(e){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=j(),s=t.find(r=>r.name===e);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),dt(t),{success:!0,message:s.starred?`\u5DF2\u5C06 "${e}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${e}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}}function zs(){return j().filter(t=>t.starred===!0)}function Ot(e){if(!e)return Wt(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let t=Dt(e);return t?(Wt(e),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${e}"`,apiConfig:t.apiConfig}):{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}}function Ue(){return Et()}function Bs(){let e=Et();if(e){let s=Dt(e);if(s)return{presetName:e,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:k().apiConfig||{}}}function Gs(e=null){if(e){let s=Dt(e);if(!s)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let t=j();return JSON.stringify(t,null,2)}function Ys(e,t={overwrite:!1}){let s;try{s=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let r=Array.isArray(s)?s:[s];if(r.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let n=j(),o=0;for(let i of r){if(!i.name||typeof i.name!="string"||!i.apiConfig||typeof i.apiConfig!="object")continue;let a=n.findIndex(l=>l.name===i.name);a>=0?t.overwrite&&(i.updatedAt=Date.now(),n[a]=i,o++):(i.createdAt=i.createdAt||Date.now(),i.updatedAt=Date.now(),n.push(i),o++)}return o>0&&dt(n),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${o} \u4E2A\u9884\u8BBE`,imported:o}}function li(e,t=""){let s=k();return Ne({name:e,description:t,apiConfig:s.apiConfig})}function ci(e){let t=[];return(!e.name||typeof e.name!="string"||!e.name.trim())&&t.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!e.apiConfig||typeof e.apiConfig!="object")&&t.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:t.length===0,errors:t}}function Fs(e){(!e||typeof e!="string")&&(e="\u65B0\u9884\u8BBE");let t=j(),s=new Set(t.map(n=>n.name));if(!s.has(e))return e;let r=1;for(;s.has(`${e} (${r})`);)r++;return`${e} (${r})`}var ze=E(()=>{de()});var b,Hs,h,B=E(()=>{b={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",TOOL_TRIGGER_INITIALIZED:"tool:triggerInitialized",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",TRIGGER_REGISTERED:"trigger:registered",TRIGGER_UNREGISTERED:"trigger:unregistered",TRIGGER_FIRED:"trigger:fired",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_EXECUTION_REQUESTED:"tool:executionRequested",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},Hs=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(t,s,r={}){if(!t||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:n=0}=r;this.listeners.has(t)||this.listeners.set(t,new Set);let o={callback:s,priority:n};return this.listeners.get(t).add(o),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${t}`),()=>this.off(t,s)}off(t,s){let r=this.listeners.get(t);if(r){for(let n of r)if(n.callback===s){r.delete(n);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${t}`)}}emit(t,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${t}`,s),this._addToHistory(t,s);let r=this.listeners.get(t);if(!r||r.size===0)return;let n=Array.from(r).sort((o,i)=>i.priority-o.priority);for(let{callback:o}of n)try{o(s)}catch(i){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${t}):`,i)}}once(t,s){let r=n=>{this.off(t,r),s(n)};return this.on(t,r)}wait(t,s=0){return new Promise((r,n)=>{let o=null,i=this.once(t,a=>{o&&clearTimeout(o),r(a)});s>0&&(o=setTimeout(()=>{i(),n(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${t}`))},s))})}hasListeners(t){let s=this.listeners.get(t);return s&&s.size>0}listenerCount(t){let s=this.listeners.get(t);return s?s.size:0}removeAllListeners(t){t?this.listeners.delete(t):this.listeners.clear()}setDebugMode(t){this.debugMode=t}_addToHistory(t,s){this.history.push({event:t,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(t){return t?this.history.filter(s=>s.event===t):[...this.history]}clearHistory(){this.history=[]}},h=new Hs});function f(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function u(e,t,s=3e3){t||(t=e==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let r=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(r.toastr){r.toastr[e](t,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}di(e,t,s),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${e.toUpperCase()}] ${t}`)}function rt(e,t,s={}){t||(t=e==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:r=3500,sticky:n=!1,noticeId:o=""}=s,i=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!i?.body){u(e,t,r);return}let a="yyt-top-notice-container",l="yyt-top-notice-styles",c=i.getElementById(a);if(c||(c=i.createElement("div"),c.id=a,c.style.cssText=`
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
    `,i.body.appendChild(c)),!i.getElementById(l)){let z=i.createElement("style");z.id=l,z.textContent=`
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
    `,i.head.appendChild(z)}if(o){let z=c.querySelector(`[data-notice-id="${o}"]`);z&&z.remove()}let y={success:"\u2713",error:"!",warning:"\u2022",info:"i"},p=i.createElement("div");p.className=`yyt-top-notice yyt-top-notice--${e||"info"}`,o&&(p.dataset.noticeId=o);let x=i.createElement("span");x.className="yyt-top-notice__icon",x.textContent=y[e]||y.info;let g=i.createElement("div");g.className="yyt-top-notice__content",g.textContent=t;let S=i.createElement("button");S.className="yyt-top-notice__close",S.type="button",S.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),S.textContent="\xD7";let st=()=>{p.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>p.remove(),180)};S.addEventListener("click",st),p.appendChild(x),p.appendChild(g),p.appendChild(S),c.appendChild(p),n||setTimeout(st,r)}function di(e,t,s){let r=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!r)return;let n=r.getElementById("yyt-fallback-toast");n&&n.remove();let o={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},i=o[e]||o.info,a=r.createElement("div");if(a.id="yyt-fallback-toast",a.style.cssText=`
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
  `,a.textContent=t,!r.getElementById("yyt-toast-styles")){let l=r.createElement("style");l.id="yyt-toast-styles",l.textContent=`
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `,r.head.appendChild(l)}r.body.appendChild(a),setTimeout(()=>{a.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{a.remove()},300)},s)}function _(){if(Vt)return Vt;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Vt=window.parent.jQuery,Vt}catch{}return window.jQuery&&(Vt=window.jQuery),Vt}function C(e){return e&&e.length>0}function Lt(e,t=d){if(!_()||!C(e))return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let r=e.find(`#${t}-model`).val()?.trim()||"",n=e.find(`#${t}-model-select`);return n.is(":visible")&&(r=n.val()||r),{url:e.find(`#${t}-api-url`).val()?.trim()||"",apiKey:e.find(`#${t}-api-key`).val()||"",model:r,useMainApi:e.find(`#${t}-use-main-api`).is(":checked"),max_tokens:parseInt(e.find(`#${t}-max-tokens`).val())||4096,temperature:parseFloat(e.find(`#${t}-temperature`).val())??.7,top_p:parseFloat(e.find(`#${t}-top-p`).val())??.9}}function Kt(e,t,s=d){if(!_()||!C(e)||!t)return;e.find(`#${s}-api-url`).val(t.url||""),e.find(`#${s}-api-key`).val(t.apiKey||""),e.find(`#${s}-model`).val(t.model||""),e.find(`#${s}-max-tokens`).val(t.max_tokens||4096),e.find(`#${s}-temperature`).val(t.temperature??.7),e.find(`#${s}-top-p`).val(t.top_p??.9);let n=t.useMainApi??!0;e.find(`#${s}-use-main-api`).prop("checked",n);let i=e.find(`#${s}-custom-api-fields`);n?i.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):i.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),e.find(`#${s}-model`).show(),e.find(`#${s}-model-select`).hide()}function pn(e){let{id:t,title:s,body:r,width:n="380px",wide:o=!1}=e;return`
    <div class="yyt-dialog-overlay" id="${t}-overlay">
      <div class="yyt-dialog ${o?"yyt-dialog-wide":""}" style="${n!=="380px"?`width: ${n};`:""} max-height: calc(100vh - 32px);">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${s}</span>
          <button class="yyt-dialog-close" id="${t}-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body" style="overflow-y: auto; overflow-x: hidden; max-height: calc(100vh - 160px);">
          ${r}
        </div>
        <div class="yyt-dialog-footer">
          <button class="yyt-btn yyt-btn-secondary" id="${t}-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${t}-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `}function gn(e,t,s={}){if(!_())return()=>{};let n=e.find(`#${t}-overlay`),o=()=>{n.remove(),s.onClose&&s.onClose()};return n.find(`#${t}-close, #${t}-cancel`).on("click",o),n.on("click",function(i){i.target===this&&o()}),n.find(`#${t}-save`).on("click",function(){s.onSave&&s.onSave(o)}),o}function _t(e,t){let s=new Blob([e],{type:"application/json"}),r=URL.createObjectURL(s),n=document.createElement("a");n.href=r,n.download=t,n.click(),URL.revokeObjectURL(r)}function At(e){return new Promise((t,s)=>{let r=new FileReader;r.onload=n=>t(n.target.result),r.onerror=n=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),r.readAsText(e)})}var d,Vt,nt=E(()=>{d="youyou_toolkit";Vt=null});var Be,Q,Ws=E(()=>{B();nt();Be=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(t={}){this.initialized||(this.dependencies=t.services||{},this._subscribeEvents(),this.initialized=!0,h.emit(b.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(t,s){return!t||!s?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(t,{id:t,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(t){this.destroyInstance(t),this.components.delete(t)}getComponent(t){return this.components.get(t)}render(t,s,r={}){let n=_();if(!n){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let o=this.components.get(t);if(!o){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${t}`);return}let i;if(typeof s=="string"?i=n(s):s&&s.jquery?i=s:s&&(i=n(s)),!C(i)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}this.destroyInstance(t);let a=o.render({...r,dependencies:this.dependencies});i.html(a),o.bindEvents(i,this.dependencies),this.activeInstances.set(t,{container:i,component:o,props:r}),h.emit(b.UI_RENDER_REQUESTED,{componentId:t})}destroyInstance(t){let s=this.activeInstances.get(t);s&&(s.component.destroy(s.container),this.activeInstances.delete(t))}switchTab(t){let s=this.currentTab;this.currentTab=t,h.emit(b.UI_TAB_CHANGED,{tabId:t,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(t,s){this.currentSubTab[t]=s,h.emit(b.UI_SUBTAB_CHANGED,{mainTab:t,subTab:s})}getCurrentSubTab(t){return this.currentSubTab[t]||""}getAllStyles(){let t="";return this.components.forEach((s,r)=>{s.getStyles&&(t+=s.getStyles())}),t}injectStyles(){let t="yyt-component-styles";if(document.getElementById(t))return;let s=document.createElement("style");s.id=t,s.textContent=this.getAllStyles(),document.head.appendChild(s)}setDependency(t,s){this.dependencies[t]=s}getDependency(t){return this.dependencies[t]}_subscribeEvents(){h.on(b.PRESET_UPDATED,()=>{}),h.on(b.TOOL_UPDATED,()=>{})}},Q=new Be});function Ge(e){return String(e||"").trim()}var ot,yt,qs=E(()=>{B();nt();Le();ze();ot=null;yt={id:"apiPresetPanel",render(e){let t=Bs(),s=t?.apiConfig||St(),r=Ge(t?.presetName||Ue()),n=Jt(),a=zs().slice(0,8),l=a.length>0?a.map(p=>this._renderPresetItem(p)).join(""):"",c=ot===null?r||"":Ge(ot),y=c||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
                  <span class="yyt-select-value" data-value="${f(c)}">${f(y)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${c?"":"yyt-selected"}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                  </div>
                  ${n.length>0?n.map(p=>this._renderSelectOption(p,c)).join(""):""}
                </div>
              </div>
              <button class="yyt-btn yyt-btn-secondary" id="${d}-load-preset" title="\u52A0\u8F7D\u9009\u4E2D\u9884\u8BBE">
                <i class="fa-solid fa-download"></i> \u52A0\u8F7D
              </button>
            </div>
            
            ${l?`
            <div class="yyt-preset-list-compact">
              ${l}
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
            
            ${this._renderApiConfigForm(s)}
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
      <div class="yyt-preset-item" data-preset-name="${f(e.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${f(e.name)}</div>
          <div class="yyt-preset-meta">
            ${e.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${f(e.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
    `},_renderSelectOption(e,t){let s=e.starred===!0,r=s?"yyt-option-star yyt-starred":"yyt-option-star",n=s?"\u2605":"\u2606";return`
      <div class="yyt-select-option ${e.name===t?"yyt-selected":""}" data-value="${f(e.name)}">
        <button class="${r}" data-preset="${f(e.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${n}</button>
        <span class="yyt-option-text">${f(e.name)}</span>
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
                   value="${f(e.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${d}-api-key" 
                     value="${f(e.apiKey||"")}" 
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
                     value="${f(e.model||"")}" 
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
    `},bindEvents(e,t){let s=_();!s||!C(e)||(this._bindDropdownEvents(e,s),this._bindPresetListEvents(e,s),this._bindApiConfigEvents(e,s),this._bindFileEvents(e,s))},_bindDropdownEvents(e,t){let s=e.find(`#${d}-preset-dropdown`),r=s.find(".yyt-select-trigger"),n=s.find(".yyt-select-value"),o=()=>{let i=String(n.data("value")||"").trim();if(!i){ot="",Ot(""),Kt(e,St(),d),e.find(".yyt-preset-item").removeClass("yyt-loaded"),u("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let a=Dt(i);if(!a){u("error",`\u9884\u8BBE "${i}" \u4E0D\u5B58\u5728`);return}ot=i,Ot(i),Kt(e,a.apiConfig,d),e.find(".yyt-preset-item").removeClass("yyt-loaded"),e.find(`.yyt-preset-item[data-preset-name="${i.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),u("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${i}"\uFF0C\u4FEE\u6539\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u914D\u7F6E\u201D\u4F1A\u8986\u76D6\u8BE5\u9884\u8BBE`)};r.on("click",function(i){i.stopPropagation(),s.toggleClass("yyt-open")}),s.find(".yyt-select-option").on("click",i=>{if(t(i.target).hasClass("yyt-option-star"))return;let a=t(i.currentTarget),l=a.data("value"),c=a.find(".yyt-option-text").text();ot=String(l||"").trim(),n.text(c).data("value",l),s.find(".yyt-select-option").removeClass("yyt-selected"),a.addClass("yyt-selected"),s.removeClass("yyt-open")}),e.find(`#${d}-load-preset`).on("click",()=>{o()}),s.find(".yyt-option-star").on("click",i=>{i.preventDefault(),i.stopPropagation();let a=t(i.currentTarget).data("preset");if(!a)return;let l=Us(a);if(l.success){u("success",l.message);let c=e.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}else u("error",l.message)}),t(document).on("click.yyt-dropdown",i=>{t(i.target).closest(s).length||s.removeClass("yyt-open")})},_bindPresetListEvents(e,t){e.find(".yyt-preset-item").on("click",s=>{let n=t(s.currentTarget).data("preset-name"),o=t(s.target).closest("[data-action]").data("action");if(o)switch(s.stopPropagation(),o){case"load":e.find(".yyt-select-value").text(n).data("value",n),e.find(".yyt-select-option").removeClass("yyt-selected"),e.find(`.yyt-select-option[data-value="${n.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),e.find(`#${d}-load-preset`).trigger("click");break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${n}" \u5417\uFF1F`)){let i=je(n);if(u(i.success?"info":"error",i.message),i.success){Ge(ot)===n&&(ot=null);let a=e.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}}break}})},_bindApiConfigEvents(e,t){e.find(`#${d}-use-main-api`).on("change",function(){let s=t(this).is(":checked"),r=e.find(`#${d}-custom-api-fields`);s?r.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):r.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),e.find(`#${d}-toggle-key-visibility`).on("click",function(){let s=e.find(`#${d}-api-key`),r=s.attr("type");s.attr("type",r==="password"?"text":"password"),t(this).find("i").toggleClass("fa-eye fa-eye-slash")}),e.find(`#${d}-load-models`).on("click",async()=>{let s=e.find(`#${d}-load-models`),r=e.find(`#${d}-model`),n=e.find(`#${d}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let o=Lt(e,d),i=await Ns(o);if(i.length>0){n.empty(),i.forEach(l=>{n.append(`<option value="${f(l)}">${f(l)}</option>`)}),r.hide(),n.show();let a=r.val();a&&i.includes(a)&&n.val(a),n.off("change").on("change",function(){r.val(t(this).val())}),u("success",`\u5DF2\u52A0\u8F7D ${i.length} \u4E2A\u6A21\u578B`)}else u("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(o){u("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${o.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),e.find(`#${d}-model`).on("focus",function(){let s=e.find(`#${d}-model-select`);t(this).show(),s.hide()}),e.find(`#${d}-save-api-config`).on("click",()=>{let s=Lt(e,d),r=Ge(Ue()),n=Qt(s);if(!n.valid&&!s.useMainApi){u("error",n.errors.join(", "));return}if(r){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${r}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230\u201C\u5F53\u524D\u914D\u7F6E\u201D`)){qt(s),Ot(""),ot="",u("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");let i=e.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i);return}qt(s);let o=js(r,{apiConfig:s});if(o.success){ot=r,u("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${r}"`),Ot(r),h.emit(b.PRESET_UPDATED,{name:r});let i=e.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}else u("error",o.message);return}qt(s),u("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),e.find(`#${d}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){Ot(""),ot="",qt({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9});let s=e.closest(".yyt-api-manager").parent();s.length&&this.renderTo(s),u("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),e.find(`#${d}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(e,t)})},_bindFileEvents(e,t){e.find(`#${d}-export-presets`).on("click",()=>{try{let s=Gs();_t(s,`youyou_toolkit_presets_${Date.now()}.json`),u("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){u("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),e.find(`#${d}-import-presets`).on("click",()=>{e.find(`#${d}-import-file`).click()}),e.find(`#${d}-import-file`).on("change",async s=>{let r=s.target.files[0];if(r){try{let n=await At(r),o=Ys(n,{overwrite:!0});if(u(o.success?"success":"error",o.message),o.imported>0){let i=e.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}}catch(n){u("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}t(s.target).val("")}})},_showSavePresetDialog(e,t){let r=Jt().map(y=>y.name),n=Fs("\u65B0\u9884\u8BBE"),o=`
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
                     value="${f(n)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
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
    `;t(`#${d}-dialog-overlay`).remove(),e.append(o);let i=t(`#${d}-dialog-overlay`),a=t(`#${d}-dialog-preset-name`),l=t(`#${d}-dialog-preset-desc`);a.focus().select();let c=()=>i.remove();i.find(`#${d}-dialog-close, #${d}-dialog-cancel`).on("click",c),i.on("click",function(y){y.target===this&&c()}),i.find(`#${d}-dialog-save`).on("click",()=>{let y=a.val().trim(),p=l.val().trim();if(!y){u("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),a.focus();return}if(r.includes(y)){if(!confirm(`\u9884\u8BBE "${y}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;je(y)}let x=Lt(e,d),g=Ne({name:y,description:p,apiConfig:x});if(g.success){u("success",g.message),c(),h.emit(b.PRESET_CREATED,{preset:g.preset});let S=e.closest(".yyt-api-manager").parent();S.length&&this.renderTo(S)}else u("error",g.message)}),a.on("keypress",function(y){y.which===13&&i.find(`#${d}-dialog-save`).click()})},destroy(e){let t=_();!t||!C(e)||(e.find("*").off(),t(document).off("click.yyt-dropdown"))},getStyles(){return`
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
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}}});var An={};N(An,{MESSAGE_MACROS:()=>_n,addTagRule:()=>Xt,createRuleTemplate:()=>vn,default:()=>ui,deleteRulePreset:()=>En,deleteRuleTemplate:()=>Tn,deleteTagRule:()=>pe,escapeRegex:()=>Nt,exportRulesConfig:()=>Ve,extractComplexTag:()=>mn,extractCurlyBraceTag:()=>Ks,extractHtmlFormatTag:()=>bn,extractSimpleTag:()=>Vs,extractTagContent:()=>jt,generateTagSuggestions:()=>He,getAllRulePresets:()=>Qe,getAllRuleTemplates:()=>hn,getContentBlacklist:()=>Ut,getRuleTemplate:()=>xn,getTagRules:()=>ut,importRulesConfig:()=>Ke,isValidTagName:()=>Js,loadRulePreset:()=>Je,saveRulesAsPreset:()=>qe,scanTextForTags:()=>Fe,setContentBlacklist:()=>ge,setTagRules:()=>We,shouldSkipContent:()=>Qs,testRegex:()=>Sn,updateRuleTemplate:()=>wn,updateTagRule:()=>Zt});function Ye(){let e=k();return G=e.ruleTemplates||[...fn],R=e.tagRules||[],K=e.contentBlacklist||[],{ruleTemplates:G,tagRules:R,contentBlacklist:K}}function Nt(e){return typeof e!="string"?"":e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Qs(e,t){if(!t||t.length===0||!e||typeof e!="string")return!1;let s=e.toLowerCase();return t.some(r=>{let n=r.trim().toLowerCase();return n&&s.includes(n)})}function Js(e){return!e||typeof e!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(e)&&!yi.includes(e.toLowerCase())}function Vs(e,t){if(!e||!t)return[];let s=[],r=Nt(t),n=new RegExp(`<${r}>([\\s\\S]*?)<\\/${r}>`,"gi");[...e.matchAll(n)].forEach(l=>{l[1]&&s.push(l[1].trim())});let i=(e.match(new RegExp(`<${r}>`,"gi"))||[]).length,a=(e.match(new RegExp(`<\\/${r}>`,"gi"))||[]).length;return i>a&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${i-a} \u4E2A\u672A\u95ED\u5408\u7684 <${t}> \u6807\u7B7E`),s}function Ks(e,t){if(!e||!t)return[];let s=[],r=Nt(t),n=new RegExp(`\\{${r}\\|`,"gi"),o;for(;(o=n.exec(e))!==null;){let i=o.index,a=i+o[0].length,l=1,c=a;for(;c<e.length&&l>0;)e[c]==="{"?l++:e[c]==="}"&&l--,c++;if(l===0){let y=e.substring(a,c-1);y.trim()&&s.push(y.trim())}n.lastIndex=i+1}return s}function mn(e,t){if(!e||!t)return[];let s=t.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${t}`),[];let r=s[0].trim(),n=s[1].trim(),o=n.match(/<\/(\w+)>/);if(!o)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${n}`),[];let i=o[1],a=new RegExp(`${Nt(r)}([\\s\\S]*?)<\\/${i}>`,"gi"),l=[];return[...e.matchAll(a)].forEach(y=>{y[1]&&l.push(y[1].trim())}),l}function bn(e,t){if(!e||!t)return[];let s=t.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${t}`),[];let r=s[1],n=[],o=new RegExp(`<${r}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${r}>`,"gi");[...e.matchAll(o)].forEach(c=>{c[1]&&n.push(c[1].trim())});let a=(e.match(new RegExp(`<${r}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(e.match(new RegExp(`<\\/${r}>`,"gi"))||[]).length;return a>l&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${a-l} \u4E2A\u672A\u95ED\u5408\u7684 <${r}> \u6807\u7B7E`),n}function jt(e,t,s=[]){if(!e)return"";if(!t||t.length===0)return e;let r=t.filter(y=>y.type==="exclude"&&y.enabled),n=t.filter(y=>(y.type==="include"||y.type==="regex_include")&&y.enabled),o=t.filter(y=>y.type==="regex_exclude"&&y.enabled),i=e;for(let y of r)try{let p=new RegExp(`<${Nt(y.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Nt(y.value)}>`,"gi");i=i.replace(p,"")}catch(p){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:y,error:p})}let a=[];if(n.length>0)for(let y of n){let p=[];try{if(y.type==="include")p.push(...Vs(i,y.value)),p.push(...Ks(i,y.value));else if(y.type==="regex_include"){let x=new RegExp(y.value,"gi");[...i.matchAll(x)].forEach(S=>{S[1]&&p.push(S[1])})}}catch(x){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:y,error:x})}p.forEach(x=>a.push(x.trim()))}else a.push(i);let l=[];for(let y of a){for(let p of o)try{let x=new RegExp(p.value,"gi");y=y.replace(x,"")}catch(x){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:p,error:x})}Qs(y,s)||l.push(y)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function Fe(e,t={}){let s=performance.now(),{chunkSize:r=5e4,maxTags:n=100,timeoutMs:o=5e3}=t,i=new Set,a=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let p=0;p<e.length;p+=r){let x=e.slice(p,Math.min(p+r,e.length));if(c++,l+=x.length,performance.now()-s>o){console.warn(`[YouYouToolkit] Tag scanning timed out after ${o}ms`);break}let g;for(;(g=a.exec(x))!==null&&i.size<n;){let S=(g[1]||g[2]).toLowerCase();Js(S)&&i.add(S)}if(i.size>=n)break;c%5===0&&await new Promise(S=>setTimeout(S,0))}let y=performance.now();return{tags:Array.from(i).sort(),stats:{processingTimeMs:Math.round(y-s),processedChars:l,totalChars:e.length,chunkCount:c,tagsFound:i.size}}}function He(e,t=25){let s=e.tags.slice(0,t);return{suggestions:s,stats:{totalFound:e.stats.tagsFound,finalCount:s.length}}}function hn(){return G.length===0&&Ye(),G}function xn(e){return G.find(t=>t.id===e)}function vn(e){let t={id:`rule-${Date.now()}`,name:e.name||"\u65B0\u89C4\u5219",description:e.description||"",type:e.type||"include",value:e.value||"",enabled:e.enabled!==!1,createdAt:new Date().toISOString()};return G.push(t),Xs(),{success:!0,template:t,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function wn(e,t){let s=G.findIndex(r=>r.id===e);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(G[s]={...G[s],...t,updatedAt:new Date().toISOString()},Xs(),{success:!0,template:G[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function Tn(e){let t=G.findIndex(s=>s.id===e);return t===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(G.splice(t,1),Xs(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function Xs(){let e=k();e.ruleTemplates=G,q(e)}function ut(){return R||Ye(),R}function We(e){R=e||[];let t=k();t.tagRules=R,q(t)}function Xt(e){let t={id:`tag-${Date.now()}`,type:e.type||"include",value:e.value||"",enabled:e.enabled!==!1};R.push(t);let s=k();return s.tagRules=R,q(s),{success:!0,rule:t,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function Zt(e,t){if(e<0||e>=R.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};R[e]={...R[e],...t};let s=k();return s.tagRules=R,q(s),{success:!0,rule:R[e],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function pe(e){if(e<0||e>=R.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};R.splice(e,1);let t=k();return t.tagRules=R,q(t),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Ut(){return K||Ye(),K}function ge(e){K=e||[];let t=k();t.contentBlacklist=K,q(t)}function qe(e,t=""){if(!e||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=k();s.tagRulePresets||(s.tagRulePresets={});let r=`preset-${Date.now()}`;return s.tagRulePresets[r]={id:r,name:e.trim(),description:t.trim(),rules:JSON.parse(JSON.stringify(R)),blacklist:JSON.parse(JSON.stringify(K)),createdAt:new Date().toISOString()},q(s),{success:!0,preset:s.tagRulePresets[r],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function Qe(){let t=k().tagRulePresets||{};return Object.values(t)}function Je(e){let t=k(),r=(t.tagRulePresets||{})[e];return r?(R=JSON.parse(JSON.stringify(r.rules||[])),K=JSON.parse(JSON.stringify(r.blacklist||[])),t.tagRules=R,t.contentBlacklist=K,q(t),{success:!0,preset:r,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function En(e){let t=k(),s=t.tagRulePresets||{};return s[e]?(delete s[e],t.tagRulePresets=s,q(t),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Ve(){return JSON.stringify({tagRules:R,contentBlacklist:K,ruleTemplates:G,tagRulePresets:k().tagRulePresets||{}},null,2)}function Ke(e,t={overwrite:!0}){try{let s=JSON.parse(e);if(t.overwrite)R=s.tagRules||[],K=s.contentBlacklist||[],G=s.ruleTemplates||fn;else if(s.tagRules&&R.push(...s.tagRules),s.contentBlacklist){let n=new Set(K.map(o=>o.toLowerCase()));s.contentBlacklist.forEach(o=>{n.has(o.toLowerCase())||K.push(o)})}let r=k();return r.tagRules=R,r.contentBlacklist=K,r.ruleTemplates=G,s.tagRulePresets&&(r.tagRulePresets={...r.tagRulePresets||{},...s.tagRulePresets}),q(r),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function Sn(e,t,s="g",r=0){try{if(!e||typeof e!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let n=new RegExp(e,s),o=[];if(s.includes("g")){let i;for(;(i=n.exec(t))!==null;)i.length>1?o.push({fullMatch:i[0],groups:i.slice(1),index:i.index,extracted:i[r]||i[1]||i[0]}):o.push({fullMatch:i[0],groups:[],index:i.index,extracted:i[0]})}else{let i=n.exec(t);i&&o.push({fullMatch:i[0],groups:i.length>1?i.slice(1):[],index:i.index,extracted:i.length>1?i[r]||i[1]:i[0]})}return{success:!0,matches:o,count:o.length,extracted:o.map(i=>i.extracted)}}catch(n){return{success:!1,error:n.message,matches:[]}}}var yi,fn,G,R,K,_n,ui,Xe=E(()=>{de();yi=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],fn=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],G=[],R=[],K=[];_n={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};Ye();ui={extractTagContent:jt,extractSimpleTag:Vs,extractCurlyBraceTag:Ks,extractComplexTag:mn,extractHtmlFormatTag:bn,escapeRegex:Nt,shouldSkipContent:Qs,isValidTagName:Js,scanTextForTags:Fe,generateTagSuggestions:He,getAllRuleTemplates:hn,getRuleTemplate:xn,createRuleTemplate:vn,updateRuleTemplate:wn,deleteRuleTemplate:Tn,getTagRules:ut,setTagRules:We,addTagRule:Xt,updateTagRule:Zt,deleteTagRule:pe,getContentBlacklist:Ut,setContentBlacklist:ge,saveRulesAsPreset:qe,getAllRulePresets:Qe,loadRulePreset:Je,deleteRulePreset:En,exportRulesConfig:Ve,importRulesConfig:Ke,testRegex:Sn,MESSAGE_MACROS:_n}});var pt,Zs=E(()=>{B();nt();Xe();pt={id:"regexExtractPanel",render(e){let t=ut(),s=Ut(),r=Qe();return`
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
          
          ${this._renderRulesEditor(t,s,r)}
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
    `},_renderRulesEditor(e,t,s){let r=e.length>0?e.map((o,i)=>this._renderRuleItem(o,i)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',n=s.length>0?s.map(o=>`<option value="${o.id}">${f(o.name)}</option>`).join(""):"";return`
      <div class="yyt-tag-rules-editor">
        ${n?`
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${d}-rule-preset-select">
            <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
            ${n}
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
          ${r}
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
                 value="${f(t.join(", "))}" 
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
               value="${f(e.value||"")}">
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
    `},bindEvents(e,t){let s=_();!s||!C(e)||(this._bindRuleEditorEvents(e,s),this._bindPresetEvents(e,s),this._bindTestEvents(e,s),this._bindFileEvents(e,s))},_bindRuleEditorEvents(e,t){e.find(".yyt-rule-type").on("change",function(){let r=t(this).closest(".yyt-rule-item").data("rule-index"),n=t(this).val();Zt(r,{type:n}),u("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),e.find(".yyt-rule-value").on("change",function(){let r=t(this).closest(".yyt-rule-item").data("rule-index"),n=t(this).val().trim();Zt(r,{value:n})}),e.find(".yyt-rule-enabled").on("change",function(){let r=t(this).closest(".yyt-rule-item").data("rule-index"),n=t(this).is(":checked");Zt(r,{enabled:n}),u("info",n?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),e.find(".yyt-rule-delete").on("click",()=>{let r=e.find(".yyt-rule-delete").closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(pe(r),this.renderTo(e),u("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),e.on("click",".yyt-rule-delete",s=>{let n=t(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(pe(n),this.renderTo(e),u("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),e.find(`#${d}-add-rule`).on("click",()=>{Xt({type:"include",value:"",enabled:!0}),this.renderTo(e),u("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),e.find(`#${d}-scan-tags`).on("click",async()=>{let s=e.find(`#${d}-scan-tags`),r=e.find(`#${d}-test-input`).val();if(!r||!r.trim()){u("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let n=await Fe(r,{maxTags:50,timeoutMs:3e3}),{suggestions:o,stats:i}=He(n,25);if(o.length===0){u("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),e.find(`#${d}-tag-suggestions-container`).hide();return}let a=e.find(`#${d}-tag-list`);e.find(`#${d}-tag-scan-stats`).text(`${i.finalCount}/${i.totalFound} \u4E2A\u6807\u7B7E, ${n.stats.processingTimeMs}ms`),a.empty(),o.forEach(c=>{let y=t(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${f(c)}</button>`);y.on("click",()=>{if(ut().some(g=>g.type==="include"&&g.value===c)){u("warning",`\u89C4\u5219 "\u5305\u542B: ${c}" \u5DF2\u5B58\u5728`);return}Xt({type:"include",value:c,enabled:!0}),this.renderTo(e),u("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${c}"`)}),a.append(y)}),e.find(`#${d}-tag-suggestions-container`).show(),u("success",`\u53D1\u73B0 ${o.length} \u4E2A\u6807\u7B7E`)}catch(n){u("error",`\u626B\u63CF\u5931\u8D25: ${n.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),e.find(`#${d}-add-exclude-cot`).on("click",()=>{let s=ut(),r="<!--[\\s\\S]*?-->";if(s.some(o=>o.type==="regex_exclude"&&o.value===r)){u("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}Xt({type:"regex_exclude",value:r,enabled:!0}),this.renderTo(e),u("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),e.find(`#${d}-content-blacklist`).on("change",function(){let r=t(this).val().split(",").map(n=>n.trim()).filter(n=>n);ge(r),u("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${r.length} \u4E2A\u5173\u952E\u8BCD`)}),e.find(`#${d}-show-examples`).on("click",()=>{alert(`
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
      `)})},_bindPresetEvents(e,t){e.find(`#${d}-load-rule-preset`).on("click",()=>{let s=e.find(`#${d}-rule-preset-select`).val();if(!s){u("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let r=Je(s);r.success?(this.renderTo(e),u("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${r.preset.name}`),h.emit(b.REGEX_PRESET_LOADED,{preset:r.preset})):u("error",r.message)}),e.find(`#${d}-save-rule-preset`).on("click",()=>{let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let r=qe(s.trim());r.success?(this.renderTo(e),u("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):u("error",r.message)})},_bindTestEvents(e,t){e.find(`#${d}-test-extract`).on("click",()=>{let s=e.find(`#${d}-test-input`).val();if(!s||!s.trim()){u("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let r=ut(),n=Ut(),o=jt(s,r,n),i=e.find(`#${d}-test-result-container`),a=e.find(`#${d}-test-result`);i.show(),!o||!o.trim()?(a.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),u("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(a.html(`<pre class="yyt-code-block">${f(o)}</pre>`),u("success","\u63D0\u53D6\u5B8C\u6210"),h.emit(b.REGEX_EXTRACTED,{result:o}))}),e.find(`#${d}-test-clear`).on("click",()=>{e.find(`#${d}-test-input`).val(""),e.find(`#${d}-test-result-container`).hide()})},_bindFileEvents(e,t){e.find(`#${d}-import-rules`).on("click",()=>{e.find(`#${d}-import-rules-file`).click()}),e.find(`#${d}-import-rules-file`).on("change",async s=>{let r=s.target.files[0];if(r){try{let n=await At(r),o=Ke(n,{overwrite:!0});o.success?(this.renderTo(e),u("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):u("error",o.message)}catch(n){u("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}t(s.target).val("")}}),e.find(`#${d}-export-rules`).on("click",()=>{try{let s=Ve();_t(s,`youyou_toolkit_rules_${Date.now()}.json`),u("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){u("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),e.find(`#${d}-reset-rules`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(We([]),ge([]),this.renderTo(e),u("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(e){!_()||!C(e)||e.find("*").off()},getStyles(){return`
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
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}}});var Pn={};N(Pn,{DEFAULT_TOOL_PRESETS:()=>it,DEFAULT_TOOL_STRUCTURE:()=>tr,TOOL_STORAGE_KEYS:()=>M,cloneTool:()=>gi,deleteTool:()=>pi,deleteToolPreset:()=>bi,exportTools:()=>rr,getAllToolPresets:()=>sr,getAllTools:()=>Ze,getCurrentToolPresetId:()=>hi,getTool:()=>fe,getToolPreset:()=>fi,importTools:()=>nr,resetTools:()=>or,saveTool:()=>ts,saveToolPreset:()=>mi,setCurrentToolPreset:()=>xi,setToolEnabled:()=>er,validateTool:()=>vi});function Ze(){let e=P.get(M.TOOLS);return e&&typeof e=="object"?{...it,...e}:{...it}}function fe(e){return Ze()[e]||null}function ts(e,t){if(!e||!t)return!1;let s=P.get(M.TOOLS)||{},r=!s[e]&&!it[e],n={...tr,...t,id:e,metadata:{...tr.metadata,...t.metadata,updatedAt:new Date().toISOString()}};return s[e]||(n.metadata.createdAt=new Date().toISOString()),s[e]=n,P.set(M.TOOLS,s),h.emit(r?b.TOOL_REGISTERED:b.TOOL_UPDATED,{toolId:e,tool:n}),!0}function pi(e){if(it[e])return!1;let t=P.get(M.TOOLS)||{};return t[e]?(delete t[e],P.set(M.TOOLS,t),h.emit(b.TOOL_UNREGISTERED,{toolId:e}),!0):!1}function er(e,t){let s=fe(e);if(!s)return!1;let r=P.get(M.TOOLS)||{};return r[e]||(r[e]={...s}),r[e].enabled=t,r[e].metadata={...r[e].metadata,updatedAt:new Date().toISOString()},P.set(M.TOOLS,r),h.emit(t?b.TOOL_ENABLED:b.TOOL_DISABLED,{toolId:e}),!0}function gi(e,t,s){let r=fe(e);if(!r)return!1;let n=JSON.parse(JSON.stringify(r));return n.name=s||`${r.name} (\u526F\u672C)`,n.metadata={...n.metadata,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},ts(t,n)}function sr(){let e=P.get(M.PRESETS);return e&&typeof e=="object"?{...it,...e}:{...it}}function fi(e){return sr()[e]||null}function mi(e,t){if(!e||!t)return!1;let s=P.get(M.PRESETS)||{};return s[e]={...t,metadata:{...t.metadata,updatedAt:new Date().toISOString()}},P.set(M.PRESETS,s),!0}function bi(e){if(it[e])return!1;let t=P.get(M.PRESETS)||{};return t[e]?(delete t[e],P.set(M.PRESETS,t),!0):!1}function hi(){return P.get(M.CURRENT_PRESET)||null}function xi(e){return sr()[e]?(P.set(M.CURRENT_PRESET,e),!0):!1}function rr(){let e=P.get(M.TOOLS)||{},t=P.get(M.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:e,presets:t},null,2)}function nr(e,t=!1){try{let s=typeof t=="object"?!!t?.overwrite:!!t,r=JSON.parse(e);if(!r||typeof r!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let n=s?{}:P.get(M.TOOLS)||{},o=s?{}:P.get(M.PRESETS)||{},i=0,a=0;if(r.tools&&typeof r.tools=="object"){for(let[l,c]of Object.entries(r.tools))it[l]&&!s||c&&typeof c=="object"&&(n[l]=c,i++);P.set(M.TOOLS,n)}if(r.presets&&typeof r.presets=="object"){for(let[l,c]of Object.entries(r.presets))it[l]&&!s||c&&typeof c=="object"&&(o[l]=c,a++);P.set(M.PRESETS,o)}return{success:!0,toolsImported:i,presetsImported:a,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u5DE5\u5177\u548C ${a} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function or(){P.remove(M.TOOLS),P.remove(M.PRESETS),P.remove(M.CURRENT_PRESET)}function vi(e){let t=[];if(!e)return{valid:!1,errors:["\u5DE5\u5177\u5B9A\u4E49\u4E3A\u7A7A"]};if((!e.name||typeof e.name!="string")&&t.push("\u5DE5\u5177\u540D\u79F0\u65E0\u6548"),(!e.category||typeof e.category!="string")&&t.push("\u5DE5\u5177\u5206\u7C7B\u65E0\u6548"),e.config){let{trigger:s,execution:r,api:n,context:o}=e.config;s&&!["manual","event","scheduled"].includes(s.type)&&t.push("\u89E6\u53D1\u7C7B\u578B\u65E0\u6548"),r&&((typeof r.timeout!="number"||r.timeout<0)&&t.push("\u8D85\u65F6\u65F6\u95F4\u5FC5\u987B\u4E3A\u6B63\u6570"),(typeof r.retries!="number"||r.retries<0)&&t.push("\u91CD\u8BD5\u6B21\u6570\u5FC5\u987B\u4E3A\u6B63\u6570")),o&&typeof o.depth!="number"&&t.push("\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u5FC5\u987B\u4E3A\u6570\u5B57")}return{valid:t.length===0,errors:t}}var tr,it,M,ir=E(()=>{Tt();B();tr={id:"",name:"",description:"",category:"utility",config:{trigger:{type:"manual",events:[]},execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!0,bypassPreset:"standard"},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},it={},M={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"}});var gt,ar=E(()=>{nt();ir();gt={id:"toolManagePanel",render(e){let t=Ze();return`
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
            <span class="yyt-tool-name">${f(s.name)}</span>
            <span class="yyt-tool-category">${f(s.category)}</span>
          </div>
          <div class="yyt-tool-controls">
            <label class="yyt-toggle yyt-tool-toggle">
              <input type="checkbox" ${s.enabled?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="yyt-tool-desc">${f(s.description)}</div>
      </div>
    `).join("")},bindEvents(e,t){let s=_();!s||!C(e)||(this._bindToolEvents(e,s),this._bindFileEvents(e,s))},_bindToolEvents(e,t){e.find(".yyt-tool-toggle input").on("change",s=>{let r=t(s.currentTarget).closest(".yyt-tool-item"),n=r.data("tool-id"),o=t(s.currentTarget).is(":checked");er(n,o),r.toggleClass("yyt-enabled",o).toggleClass("yyt-disabled",!o),u("info",o?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),e.find("#yyt-add-tool").on("click",()=>{this._showToolEditDialog(e,t,null)})},_bindFileEvents(e,t){e.find("#yyt-import-tools").on("click",()=>{e.find("#yyt-import-tools-file").click()}),e.find("#yyt-import-tools-file").on("change",async s=>{let r=s.target.files[0];if(r){try{let n=await At(r),o=nr(n,{overwrite:!1});u(o.success?"success":"error",o.message),o.success&&this.renderTo(e)}catch(n){u("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}t(s.target).val("")}}),e.find("#yyt-export-tools").on("click",()=>{try{let s=rr();_t(s,`youyou_toolkit_tools_${Date.now()}.json`),u("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){u("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),e.find("#yyt-reset-tools").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(or(),this.renderTo(e),u("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(e,t,s){let r=s?fe(s):null,n=!!r,o=`
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
                       value="${r?f(r.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${r?f(r.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;t("#yyt-tool-dialog-overlay").remove(),e.append(o);let i=t("#yyt-tool-dialog-overlay"),a=()=>i.remove();i.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",a),i.on("click",function(l){l.target===this&&a()}),i.find("#yyt-tool-dialog-save").on("click",()=>{let l=t("#yyt-tool-name").val().trim(),c=t("#yyt-tool-category").val(),y=t("#yyt-tool-desc").val().trim(),p=parseInt(t("#yyt-tool-timeout").val())||6e4,x=parseInt(t("#yyt-tool-retries").val())||3;if(!l){u("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let g=s||`tool_${Date.now()}`;ts(g,{name:l,category:c,description:y,config:{trigger:{type:"manual",events:[]},execution:{timeout:p,retries:x},api:{preset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0}),a(),this.renderTo(e),u("success",n?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA")})},destroy(e){!_()||!C(e)||e.find("*").off()},getStyles(){return`
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
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}}});var Gn={};N(Gn,{TOOL_CATEGORIES:()=>Cn,TOOL_REGISTRY:()=>es,clearToolApiPreset:()=>On,default:()=>_i,getAllDefaultToolConfigs:()=>ss,getAllToolApiBindings:()=>Ln,getAllToolFullConfigs:()=>pr,getEnabledTools:()=>Un,getToolApiPreset:()=>yr,getToolConfig:()=>cr,getToolFullConfig:()=>O,getToolList:()=>kn,getToolSubTabs:()=>Rn,getToolWindowState:()=>Bn,hasTool:()=>dr,onPresetDeleted:()=>Nn,registerTool:()=>$n,resetToolConfig:()=>jn,resetToolRegistry:()=>In,saveToolConfig:()=>mt,saveToolWindowState:()=>zn,setToolApiPreset:()=>Dn,setToolApiPresetConfig:()=>Ti,setToolBypassConfig:()=>Ei,setToolOutputMode:()=>wi,setToolPromptTemplate:()=>Si,unregisterTool:()=>Mn,updateToolRuntime:()=>ur});function $n(e,t){if(!e||typeof e!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!t||typeof t!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let r of s)if(!t[r])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${r}`),!1;return ft[e]={id:e,...t,order:t.order??Object.keys(ft).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${e}`),!0}function Mn(e){return ft[e]?(delete ft[e],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${e}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${e}`),!1)}function kn(e=!0){let t=Object.values(ft);return e?t.sort((s,r)=>(s.order??0)-(r.order??0)):t}function cr(e){return ft[e]||null}function dr(e){return!!ft[e]}function Rn(e){let t=ft[e];return!t||!t.hasSubTabs?[]:t.subTabs||[]}function In(){ft={...es},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Dn(e,t){if(!dr(e))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${e}`),!1;let s=m.get(at)||{};return s[e]=t||"",m.set(at,s),console.log(`[ToolRegistry] \u5DE5\u5177 "${e}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${t||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function yr(e){return(m.get(at)||{})[e]||""}function On(e){let t=m.get(at)||{};delete t[e],m.set(at,t),console.log(`[ToolRegistry] \u5DE5\u5177 "${e}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function Ln(){return m.get(at)||{}}function Nn(e){let t=m.get(at)||{},s=!1;for(let r in t)t[r]===e&&(t[r]="",s=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${r}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&m.set(at,t)}function O(e){let t=be[e];if(!t)return cr(e);let r=(m.get(me)||{})[e]||{},n=yr(e),o={...t,...r,id:e};o.trigger={...t.trigger||{},...r.trigger||{}},o.output={...t.output||{},...r.output||{}},o.bypass={...t.bypass||{},...r.bypass||{}},o.runtime={...t.runtime||{},...r.runtime||{}},o.extraction={...t.extraction||{},...r.extraction||{}};let i=o.output?.apiPreset||o.apiPreset||n||"";return o.output={...o.output||{},apiPreset:i},o.apiPreset=i,(!Array.isArray(o.extraction.selectors)||o.extraction.selectors.length===0)&&Array.isArray(o.extractTags)&&o.extractTags.length>0&&(o.extraction.selectors=[...o.extractTags]),(!Array.isArray(o.extractTags)||o.extractTags.length===0)&&(o.extractTags=Array.isArray(o.extraction.selectors)?[...o.extraction.selectors]:[]),o}function mt(e,t){if(!e||!be[e])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",e),!1;let s=m.get(me)||{},r=m.get(at)||{},n=t?.output?.apiPreset??t?.apiPreset??"",o=["promptTemplate","enabled","extractTags","apiPreset","trigger","output","bypass","extraction","runtime"];return s[e]={},o.forEach(i=>{if(t[i]!==void 0){if(i==="output"&&t.output){s[e][i]={...t.output,apiPreset:n};return}if(i==="apiPreset"){s[e][i]=n;return}s[e][i]=t[i]}}),s[e].apiPreset===void 0&&(s[e].apiPreset=n),!s[e].output&&t.output!==void 0&&(s[e].output={...t.output||{},apiPreset:n}),m.set(me,s),r[e]=n,m.set(at,r),h.emit(b.TOOL_UPDATED,{toolId:e,config:s[e]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${e}`),!0}function wi(e,t){let s=O(e);return s?mt(e,{...s,output:{...s.output,mode:t}}):!1}function Ti(e,t){let s=O(e);return s?mt(e,{...s,apiPreset:t,output:{...s.output,apiPreset:t}}):!1}function Ei(e,t){let s=O(e);return s?mt(e,{...s,bypass:{...s.bypass,...t}}):!1}function Si(e,t){let s=O(e);return s?mt(e,{...s,promptTemplate:t}):!1}function ur(e,t){let s=O(e);return s?mt(e,{...s,runtime:{...s.runtime,...t,lastRunAt:Date.now()}}):!1}function jn(e){if(!e||!be[e])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",e),!1;let t=m.get(me)||{};return delete t[e],m.set(me,t),h.emit(b.TOOL_UPDATED,{toolId:e,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${e}`),!0}function ss(){return{...be}}function pr(){return Object.keys(be).map(e=>O(e))}function Un(){return pr().filter(e=>e&&e.enabled)}function zn(e,t){let s=m.get(lr)||{};s[e]={...t,updatedAt:Date.now()},m.set(lr,s)}function Bn(e){return(m.get(lr)||{})[e]||null}var me,at,lr,be,es,Cn,ft,_i,he=E(()=>{Tt();B();me="tool_configs",at="tool_api_bindings",lr="tool_window_states",be={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</boo_FM>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["boo_FM"]},statusBlock:{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",description:"\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u4EE3\u7801\u5757",enabled:!0,order:4,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["status_block"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0B\u5BF9\u8BDD\u5185\u5BB9\u751F\u6210\u89D2\u8272\u72B6\u6001\u5757\uFF1A

\u8F93\u51FA\u683C\u5F0F\uFF1A
<status_block>
<name>\u89D2\u8272\u540D</name>
<location>\u4F4D\u7F6E</location>
<condition>\u72B6\u6001</condition>
<equipment>\u88C5\u5907</equipment>
<skills>\u6280\u80FD</skills>
</status_block>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["status_block"]}},es={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{trigger:{type:"manual",events:[]},execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:3,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel"}]},bypass:{id:"bypass",name:"\u7834\u9650\u8BCD",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406\u7834\u9650\u8BCD\u9884\u8BBE",component:"BypassPanel",order:4},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:5}},Cn={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},ft={...es};_i={TOOL_REGISTRY:es,TOOL_CATEGORIES:Cn,registerTool:$n,unregisterTool:Mn,getToolList:kn,getToolConfig:cr,hasTool:dr,getToolSubTabs:Rn,resetToolRegistry:In,setToolApiPreset:Dn,getToolApiPreset:yr,clearToolApiPreset:On,getAllToolApiBindings:Ln,onPresetDeleted:Nn,saveToolWindowState:zn,getToolWindowState:Bn,getToolFullConfig:O,saveToolConfig:mt,resetToolConfig:jn,getAllDefaultToolConfigs:ss,getAllToolFullConfigs:pr,getEnabledTools:Un}});var Yn={};N(Yn,{BypassManager:()=>rs,DEFAULT_BYPASS_PRESETS:()=>ht,addMessage:()=>Li,buildBypassMessages:()=>Bi,bypassManager:()=>w,createPreset:()=>$i,default:()=>Gi,deleteMessage:()=>ji,deletePreset:()=>ki,duplicatePreset:()=>Ri,exportPresets:()=>Ui,getAllPresets:()=>Pi,getDefaultPresetId:()=>Ii,getEnabledMessages:()=>Oi,getPreset:()=>Ci,getPresetList:()=>fr,importPresets:()=>zi,setDefaultPresetId:()=>Di,updateMessage:()=>Ni,updatePreset:()=>Mi});var bt,te,gr,ht,Ai,rs,w,Pi,fr,Ci,$i,Mi,ki,Ri,Ii,Di,Oi,Li,Ni,ji,Ui,zi,Bi,Gi,xe=E(()=>{Tt();B();bt="bypass_presets",te="default_bypass_preset",gr="current_bypass_preset",ht={},Ai=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),rs=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let t=m.get(bt,{});return this._cache={...ht,...t},this._cache}getPresetList(){let t=this.getAllPresets();return Object.values(t).sort((s,r)=>(r.updatedAt||0)-(s.updatedAt||0))}getPreset(t){return t&&this.getAllPresets()[t]||null}presetExists(t){return!!this.getPreset(t)}createPreset(t){let{id:s,name:r,description:n,messages:o}=t;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let i=s.trim();if(this.presetExists(i))return{success:!1,message:`\u9884\u8BBE "${i}" \u5DF2\u5B58\u5728`};let a={id:i,name:r.trim(),description:n||"",enabled:!0,messages:o||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(i,a),h.emit(b.BYPASS_PRESET_CREATED,{presetId:i,preset:a}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${i}`),{success:!0,message:`\u9884\u8BBE "${r}" \u521B\u5EFA\u6210\u529F`,preset:a}}updatePreset(t,s){if(!t)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let r=this.getPreset(t);if(!r)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==t)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let n={...r,...s,id:t,updatedAt:Date.now()};return this._savePreset(t,n),h.emit(b.BYPASS_PRESET_UPDATED,{presetId:t,preset:n}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${t}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u66F4\u65B0\u6210\u529F`,preset:n}}deletePreset(t){if(!t)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(ht[t])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(t);if(!s)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};let r=m.get(bt,{});return delete r[t],m.set(bt,r),this._cache=null,this.getDefaultPresetId()===t&&this.setDefaultPresetId(null),h.emit(b.BYPASS_PRESET_DELETED,{presetId:t}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${t}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(t,s,r){let n=this.getPreset(t);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${t}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(n)),id:s.trim(),name:r||`${n.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),o),h.emit(b.BYPASS_PRESET_CREATED,{presetId:s,preset:o}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${o.name}"`,preset:o}}addMessage(t,s){let r=this.getPreset(t);if(!r)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};let n={id:`msg_${Date.now()}`,role:s.role||"SYSTEM",content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1},o=[...r.messages||[],n];return this.updatePreset(t,{messages:o})}updateMessage(t,s,r){let n=this.getPreset(t);if(!n)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};let o=n.messages||[],i=o.findIndex(l=>l.id===s);if(i===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let a=[...o];return a[i]={...a[i],...r},this.updatePreset(t,{messages:a})}deleteMessage(t,s){let r=this.getPreset(t);if(!r)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};let n=r.messages||[],o=n.find(a=>a.id===s);if(!o)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(o.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let i=n.filter(a=>a.id!==s);return this.updatePreset(t,{messages:i})}getEnabledMessages(t){let s=this.getPreset(t);return!s||!s.enabled?[]:(s.messages||[]).filter(r=>r.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let t=m.get(te,null);return t==="undefined"||t==="null"||t===""?(m.remove(te),null):t}setDefaultPresetId(t){return t&&!this.presetExists(t)?!1:(m.set(te,t),h.emit(b.BYPASS_PRESET_ACTIVATED,{presetId:t}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${t}`),!0)}getDefaultPreset(){let t=this.getDefaultPresetId();return t?this.getPreset(t):null}exportPresets(t=null){if(t){let r=this.getPreset(t);if(!r)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(t,s={}){let{overwrite:r=!1}=s,n;try{n=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let o=Array.isArray(n)?n:n.presets?n.presets:[n];if(o.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let i=m.get(bt,{}),a=0;for(let l of o)!l.id||typeof l.id!="string"||l.name&&(ht[l.id]&&!r||!r&&i[l.id]||(i[l.id]={...l,updatedAt:Date.now()},a++));return a>0&&(m.set(bt,i),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u9884\u8BBE`,imported:a}}getToolBypassPreset(t){if(!t?.bypass?.enabled)return null;let s=t?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(t){let s=this.getToolBypassPreset(t);return s?this.getEnabledMessages(s.id):[]}_savePreset(t,s){let r=m.get(bt,{});r[t]=s,m.set(bt,r),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let t=m.get(bt,{}),s={},r=!1,n=Array.isArray(t)?t.map((o,i)=>[o?.id||o?.name||`legacy_${i}`,o]):Object.entries(t||{});for(let[o,i]of n){let a=this._normalizePreset(o,i,s);if(!a){r=!0;continue}s[a.id]=a,(!t?.[a.id]||t?.[a.id]?.id!==a.id)&&(r=!0)}r&&m.set(bt,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(t,s,r={}){if(!s||typeof s!="object")return null;let n=typeof s.name=="string"?s.name.trim():"",o=typeof s.id=="string"?s.id.trim():"",i=typeof t=="string"?t.trim():"";if(!n&&i&&i!=="undefined"&&i!=="null"&&(n=i),this._isLegacySamplePreset(n,o)||(!o&&i&&i!=="undefined"&&i!=="null"&&(o=i),!o&&n&&n!=="undefined"&&n!=="null"&&(o=this._generatePresetId(n,r)),!n||!o||o==="undefined"||n==="undefined"))return null;let l=Array.isArray(s.messages)?s.messages.filter(c=>c&&typeof c=="object").map((c,y)=>({id:typeof c.id=="string"&&c.id.trim()?c.id.trim():`${o}_msg_${y+1}`,role:c.role||"SYSTEM",content:typeof c.content=="string"?c.content:"",enabled:c.enabled!==!1,deletable:c.deletable!==!1})):[];return{...s,id:o,name:n,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:l,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(t){let s=m.get(te,null),r=m.get(gr,null),n=s??r;(n==="undefined"||n==="null"||n==="")&&(n=null),n&&!t[n]&&(n=Object.values(t).find(i=>i.name===n)?.id||null),n?m.set(te,n):m.remove(te),m.has(gr)&&m.remove(gr)}_isLegacySamplePreset(t,s=""){return t?s==="standard"||s==="enhanced"||s==="jailbreak"||Ai.has(t)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(t):!1}_generatePresetId(t,s={}){let r=String(t).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,n=r,o=1;for(;s[n];)n=`${r}_${o++}`;return n}_log(...t){this.debugMode&&console.log("[BypassManager]",...t)}},w=new rs,Pi=()=>w.getAllPresets(),fr=()=>w.getPresetList(),Ci=e=>w.getPreset(e),$i=e=>w.createPreset(e),Mi=(e,t)=>w.updatePreset(e,t),ki=e=>w.deletePreset(e),Ri=(e,t,s)=>w.duplicatePreset(e,t,s),Ii=()=>w.getDefaultPresetId(),Di=e=>w.setDefaultPresetId(e),Oi=e=>w.getEnabledMessages(e),Li=(e,t)=>w.addMessage(e,t),Ni=(e,t,s)=>w.updateMessage(e,t,s),ji=(e,t)=>w.deleteMessage(e,t),Ui=e=>w.exportPresets(e),zi=(e,t)=>w.importPresets(e,t),Bi=e=>w.buildBypassMessages(e),Gi=w});var qn={};N(qn,{abortAllTasks:()=>qi,abortTask:()=>Wi,buildToolMessages:()=>Wn,clearExecutionHistory:()=>Xi,createExecutionContext:()=>sa,createResult:()=>ns,enhanceMessagesWithBypass:()=>ra,executeBatch:()=>Hi,executeTool:()=>Hn,executeToolWithConfig:()=>os,executeToolsBatch:()=>ia,executorState:()=>I,extractFailed:()=>ea,extractSuccessful:()=>ta,generateTaskId:()=>zt,getExecutionHistory:()=>Ki,getExecutorStatus:()=>Vi,getScheduler:()=>ee,getToolsForEvent:()=>br,mergeResults:()=>Zi,pauseExecutor:()=>Qi,resumeExecutor:()=>Ji,setMaxConcurrent:()=>Fi});function ns(e,t,s,r,n,o,i=0){return{success:s,taskId:e,toolId:t,data:r,error:n,duration:o,retries:i,timestamp:Date.now(),metadata:{}}}function zt(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function Yi(e,t={}){return{id:zt(),toolId:e,options:t,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:t.maxRetries||3}}function ee(){return ve||(ve=new mr(I.maxConcurrent)),ve}function Fi(e){I.maxConcurrent=Math.max(1,Math.min(10,e)),ve&&(ve.maxConcurrent=I.maxConcurrent)}async function Hn(e,t={},s){let r=ee(),n=Yi(e,t);for(;I.isPaused;)await new Promise(o=>setTimeout(o,100));try{let o=await r.enqueue(async i=>{if(i.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(i,t);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},n);return Fn(o),o}catch(o){let i=ns(n.id,e,!1,null,o,Date.now()-n.createdAt,n.retries);return Fn(i),i}}async function Hi(e,t={}){let{failFast:s=!1,concurrency:r=I.maxConcurrent}=t,n=[],o=ee(),i=o.maxConcurrent;o.maxConcurrent=r;try{let a=e.map(({toolId:l,options:c,executor:y})=>Hn(l,c,y));if(s)for(let l of a){let c=await l;if(n.push(c),!c.success){o.abortAll();break}}else{let l=await Promise.allSettled(a);for(let c of l)c.status==="fulfilled"?n.push(c.value):n.push(ns(zt(),"unknown",!1,null,c.reason,0,0))}}finally{o.maxConcurrent=i}return n}function Wi(e){return ee().abort(e)}function qi(){ee().abortAll(),I.executionQueue=[]}function Qi(){I.isPaused=!0}function Ji(){I.isPaused=!1}function Vi(){return{...ee().getStatus(),isPaused:I.isPaused,activeControllers:I.activeControllers.size,historyCount:I.executionHistory.length}}function Fn(e){I.executionHistory.push(e),I.executionHistory.length>100&&I.executionHistory.shift()}function Ki(e={}){let t=[...I.executionHistory];return e.toolId&&(t=t.filter(s=>s.toolId===e.toolId)),e.success!==void 0&&(t=t.filter(s=>s.success===e.success)),e.limit&&(t=t.slice(-e.limit)),t}function Xi(){I.executionHistory=[]}function Zi(e){let t={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of e)t.totalDuration+=s.duration,s.success?(t.successCount++,s.data!==void 0&&s.data!==null&&t.data.push(s.data)):(t.success=!1,t.failureCount++,s.error&&t.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return t}function ta(e){return e.filter(t=>t.success).map(t=>t.data)}function ea(e){return e.filter(t=>!t.success).map(t=>({taskId:t.taskId,toolId:t.toolId,error:t.error}))}function sa(e={}){return{taskId:zt(),startTime:Date.now(),signal:e.signal||null,apiConfig:e.apiConfig||null,bypassMessages:e.bypassMessages||[],context:e.context||{},metadata:e.metadata||{}}}function ra(e,t){return!t||t.length===0?e:[...t,...e]}function na(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Wn(e,t){let s=[],r=e.promptTemplate||"",n={"{{userMessage}}":t.input?.userMessage||"","{{lastAiMessage}}":t.input?.lastAiMessage||"","{{extractedContent}}":t.input?.extractedContent||"","{{previousToolOutput}}":t.input?.previousToolOutput||"","{{context}}":JSON.stringify(t.input?.context||{}),"{{pg}}":t.input?.context?.pg||"1","{{time}}":t.input?.context?.time||"","{{scene}}":t.input?.context?.scene||"","{{plot}}":t.input?.context?.plot||"","{{mq}}":t.input?.context?.mq||"\u2160","{{mqStatus}}":t.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":t.input?.context?.sq||"1","{{sqStatus}}":t.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":t.input?.context?.latestSq||"1","{{completed}}":t.input?.context?.completed||"\u65E0","{{defined}}":t.input?.context?.defined||"","{{status}}":t.input?.context?.status||"","{{seeds}}":t.input?.context?.seeds||"","{{name}}":t.input?.context?.name||"","{{location}}":t.input?.context?.location||"","{{condition}}":t.input?.context?.condition||"","{{equipment}}":t.input?.context?.equipment||"","{{skills}}":t.input?.context?.skills||""};for(let[o,i]of Object.entries(n))r=r.replace(new RegExp(na(o),"g"),i);return s.push({role:"USER",content:r}),s}async function os(e,t,s={}){let r=O(e);if(!r)return{success:!1,taskId:zt(),toolId:e,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!r.enabled)return{success:!1,taskId:zt(),toolId:e,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let n=Date.now(),o=zt();try{h.emit(b.TOOL_EXECUTION_STARTED,{toolId:e,taskId:o,context:t});let i=Wn(r,t);if(typeof s.callApi=="function"){let a=r.output?.apiPreset||r.apiPreset||"",l=a?{preset:a}:null,c=await s.callApi(i,l,s.signal),y=c;r.outputMode==="separate"&&r.extractTags?.length>0&&(y=oa(c,r.extractTags));let p={success:!0,taskId:o,toolId:e,data:y,duration:Date.now()-n};return h.emit(b.TOOL_EXECUTED,{toolId:e,taskId:o,result:p}),p}else return{success:!0,taskId:o,toolId:e,data:{messages:i,config:{apiPreset:r.output?.apiPreset||r.apiPreset||"",outputMode:r.outputMode,extractTags:r.extractTags}},duration:Date.now()-n,needsExecution:!0}}catch(i){let a={success:!1,taskId:o,toolId:e,error:i.message||String(i),duration:Date.now()-n};return h.emit(b.TOOL_EXECUTION_FAILED,{toolId:e,taskId:o,error:i}),a}}function oa(e,t){let s={};for(let r of t){let n=new RegExp(`<${r}[^>]*>([\\s\\S]*?)<\\/${r}>`,"gi"),o=e.match(n);o&&(s[r]=o.map(i=>{let a=i.match(new RegExp(`<${r}[^>]*>([\\s\\S]*?)<\\/${r}>`,"i"));return a?a[1].trim():""}))}return s}async function ia(e,t,s={}){let r=[];for(let n of e){let o=O(n);if(o&&o.enabled){let i=await os(n,t,s);r.push(i)}}return r}function br(e){let t=[],s=["summaryTool","statusBlock"];for(let r of s){let n=O(r),o=n?.trigger?.enabled&&n?.trigger?.event===e,i=Array.isArray(n?.triggerEvents)&&n.triggerEvents.includes(e);n&&n.enabled&&(o||i)&&t.push(n)}return t}var I,mr,ve,hr=E(()=>{he();B();I={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};mr=class{constructor(t=3){this.maxConcurrent=t,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(t,s){return new Promise((r,n)=>{this.queue.push({executor:t,task:s,resolve:r,reject:n}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let t=this.queue.shift();if(!t)continue;let{executor:s,task:r,resolve:n,reject:o}=t,i=new AbortController;r.abortController=i,r.status="running",r.startedAt=Date.now(),this.running.set(r.id,r),I.activeControllers.set(r.id,i),this.executeTask(s,r,i.signal).then(a=>{r.status="completed",r.completedAt=Date.now(),n(a)}).catch(a=>{r.status=a.name==="AbortError"?"aborted":"failed",r.completedAt=Date.now(),o(a)}).finally(()=>{this.running.delete(r.id),I.activeControllers.delete(r.id),I.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(t,s,r){let n=Date.now(),o=null;for(let i=0;i<=s.maxRetries;i++){if(r.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let a=await t(r);return ns(s.id,s.toolId,!0,a,null,Date.now()-n,i)}catch(a){if(o=a,a.name==="AbortError")throw a;i<s.maxRetries&&(await this.delay(1e3*(i+1)),s.retries=i+1)}}throw o}delay(t){return new Promise(s=>setTimeout(s,t))}abort(t){let s=I.activeControllers.get(t);return s?(s.abort(),!0):!1}abortAll(){for(let t of I.activeControllers.values())t.abort();I.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},ve=null});var Qn={};N(Qn,{DEFAULT_SETTINGS:()=>vr,SettingsService:()=>is,default:()=>aa,settingsService:()=>Pt});var vr,xr,is,Pt,aa,as=E(()=>{Tt();B();vr={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},listener:{listenGenerationEnded:!0,ignoreQuietGeneration:!0,ignoreAutoTrigger:!0,debounceMs:300},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue"}},xr="settings_v2",is=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let t=m.get(xr,{});return this._cache=this._mergeWithDefaults(t),this._cache}saveSettings(t){this._cache=this._mergeWithDefaults(t),m.set(xr,this._cache),h.emit(b.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(t){let s=this.getSettings(),r=this._deepMerge(s,t);this.saveSettings(r)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(t){this.updateSettings({executor:t})}getListenerSettings(){return this.getSettings().listener}updateListenerSettings(t){this.updateSettings({listener:t})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(t){this.updateSettings({debug:t})}getUiSettings(){return this.getSettings().ui}updateUiSettings(t){this.updateSettings({ui:t})}resetSettings(){this._cache=JSON.parse(JSON.stringify(vr)),m.set(xr,this._cache),h.emit(b.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(t,s=null){let r=this.getSettings(),n=t.split("."),o=r;for(let i of n)if(o&&typeof o=="object"&&i in o)o=o[i];else return s;return o}set(t,s){let r=JSON.parse(JSON.stringify(this.getSettings())),n=t.split("."),o=r;for(let i=0;i<n.length-1;i++){let a=n[i];a in o||(o[a]={}),o=o[a]}o[n[n.length-1]]=s,this.saveSettings(r)}_mergeWithDefaults(t){return this._deepMerge(JSON.parse(JSON.stringify(vr)),t)}_deepMerge(t,s){let r={...t};for(let n in s)s[n]&&typeof s[n]=="object"&&!Array.isArray(s[n])?r[n]=this._deepMerge(t[n]||{},s[n]):r[n]=s[n];return r}},Pt=new is,aa=Pt});var Vn={};N(Vn,{ContextInjector:()=>cs,DEFAULT_INJECTION_OPTIONS:()=>Jn,contextInjector:()=>ds,default:()=>la});var lt,ls,Jn,cs,ds,la,wr=E(()=>{B();lt="YouYouToolkit_toolOutputs",ls="YouYouToolkit_injectedContext",Jn={overwrite:!0,enabled:!0},cs=class{constructor(){this.debugMode=!1}async inject(t,s,r={}){if(!t||s===void 0||s===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),!1;let n={...Jn,...r},o=this._getCurrentChatId(),i={toolId:t,content:String(s),updatedAt:Date.now(),sourceMessageId:r.sourceMessageId||null,options:n};return h.emit(b.TOOL_CONTEXT_INJECTED,{toolId:t,chatId:o,content:i.content,options:n}),await this._insertToolOutputToLatestAssistantMessage(t,i,n)?(this._log(`\u6CE8\u5165\u6210\u529F: ${t} -> ${o}`),!0):!1}getAggregatedContext(t){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(t=null){try{let{chat:s}=this._getChatRuntime(),r=this._findAssistantMessageIndex(s,t);if(r<0)return"";let n=s[r]||{},o=n[ls];if(typeof o=="string"&&o.trim())return o.trim();let i=n[lt];return i&&typeof i=="object"?this._buildMessageInjectedContext(i).trim():""}catch(s){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",s),""}}_getLatestAssistantMessageOutputs(){try{let{chat:t}=this._getChatRuntime(),s=this._findAssistantMessageIndex(t,null);if(s<0)return{};let n=(t[s]||{})[lt];return n&&typeof n=="object"?n:{}}catch(t){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",t),{}}}getToolContext(t,s){if(!s)return null;try{let{chat:r}=this._getChatRuntime(),n=this._findAssistantMessageIndex(r,null);return n<0?null:r[n]?.[lt]?.[s]||null}catch{return null}}getAllToolContexts(t){return this._getLatestAssistantMessageOutputs()}async clearToolContext(t,s){if(!s)return!1;try{let{api:r,context:n,chat:o}=this._getChatRuntime(),i=this._findAssistantMessageIndex(o,null);if(i<0)return!1;let a=o[i],l=a?.[lt];if(!l||!l[s])return!1;delete l[s],a[lt]=l,a[ls]=this._buildMessageInjectedContext(l);let c=n?.saveChat||r?.saveChat||null;return typeof c=="function"&&await c.call(n||r),h.emit(b.TOOL_CONTEXT_CLEARED,{chatId:t||this._getCurrentChatId(),toolId:s}),!0}catch(r){return this._log("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",r),!1}}async clearAllContext(t){try{let{api:s,context:r,chat:n}=this._getChatRuntime(),o=this._findAssistantMessageIndex(n,null);if(o<0)return!1;let i=n[o];delete i[lt],delete i[ls];let a=r?.saveChat||s?.saveChat||null;return typeof a=="function"&&await a.call(r||s),h.emit(b.TOOL_CONTEXT_CLEARED,{chatId:t||this._getCurrentChatId(),allTools:!0}),!0}catch(s){return this._log("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",s),!1}}clearAllChatsContexts(){this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(t,s){return!!this.getToolContext(t,s)}getContextSummary(t){let s=this._getLatestAssistantMessageOutputs(),r=Object.entries(s).map(([n,o])=>({toolId:n,updatedAt:o.updatedAt,contentLength:o.content?.length||0}));return{chatId:t||this._getCurrentChatId(),tools:r,totalCount:r.length}}exportContext(t){return{chatId:t||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(t,s={}){return!1}_getChatRuntime(){try{let t=typeof window.parent<"u"&&window.parent!==window?window.parent:window,s=t.SillyTavern||null,r=s?.getContext?.()||null,n=Array.isArray(r?.chat)?r.chat:[],o=Array.isArray(s?.chat)?s.chat:[],i=n.length?n:o;return{topWindow:t,api:s,context:r,chat:i,contextChat:n,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_syncMessageToRuntimeChats(t,s,r){let{contextChat:n,apiChat:o}=t||{},i=a=>{!Array.isArray(a)||s<0||s>=a.length||a[s]!==r&&(a[s]={...a[s]||{},...r})};i(n),i(o)}_notifyMessageUpdated(t,s){try{let{api:r,topWindow:n}=t||{},o=r?.eventSource||null,a=(r?.eventTypes||{}).MESSAGE_UPDATED||"MESSAGE_UPDATED";o&&typeof o.emit=="function"&&(o.emit(a,s),typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(()=>{o.emit(a,s)}):typeof n?.setTimeout=="function"&&n.setTimeout(()=>{o.emit(a,s)},30))}catch(r){this._log("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",r)}}_isAssistantMessage(t){if(!t||t.is_user||t.is_system)return!1;let s=String(t.role||"").toLowerCase();return s==="assistant"||s==="ai"||!s}_findAssistantMessageIndex(t,s){let r=Array.isArray(t)?t:[];if(!r.length)return-1;let n=(o,i)=>{if(!this._isAssistantMessage(o)||s==null||s==="")return!1;if(typeof s=="number")return i===s;let a=String(s).trim();return a?[o.id,o.messageId,o.mes_id,o.swipe_id,i].map(c=>c==null?"":String(c).trim()).includes(a):!1};for(let o=r.length-1;o>=0;o-=1)if(n(r[o],o))return o;for(let o=r.length-1;o>=0;o-=1)if(this._isAssistantMessage(r[o]))return o;return-1}_buildMessageInjectedContext(t){let r=Object.entries(t&&typeof t=="object"?t:{}).sort(([,o],[,i])=>(o?.updatedAt||0)-(i?.updatedAt||0));if(!r.length)return"";let n=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[o,i]of r)n.push(`[${o}]`),n.push(i?.content||""),n.push("");return n.join(`
`)}_getWritableMessageField(t){let s=["mes","message","content","text"];for(let r of s)if(typeof t?.[r]=="string")return{key:r,text:t[r]};return{key:"mes",text:""}}_stripExistingToolOutput(t,s=[]){let r=String(t||"");return(Array.isArray(s)?s:[]).forEach(o=>{let i=String(o||"").trim();if(!i)return;if(i.startsWith("regex:")){try{let y=new RegExp(i.slice(6).trim(),"gis");r=r.replace(y,"")}catch(y){this._log("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",i,y)}return}let a=i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${a}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${a}>\\s*`,"gi"),c=new RegExp(`\\{${a}\\|[\\s\\S]*?\\}\\s*`,"gi");r=r.replace(l,""),r=r.replace(c,"")}),r.trimEnd()}async _insertToolOutputToLatestAssistantMessage(t,s,r={}){try{let n=this._getChatRuntime(),{api:o,context:i,chat:a}=n;if(!Array.isArray(a)||!a.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),!1;let l=this._findAssistantMessageIndex(a,r.sourceMessageId);if(l<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),!1;let c=a[l],{key:y,text:p}=this._getWritableMessageField(c),x=r.overwrite===!1?String(p||""):this._stripExistingToolOutput(p,r.extractionSelectors),g=String(s.content||"").trim(),S=[x.trimEnd(),g].filter(Boolean).join(`

`).trim(),z={...c[lt]&&typeof c[lt]=="object"?c[lt]:{},[t]:{toolId:t,content:g,updatedAt:s.updatedAt,sourceMessageId:s.sourceMessageId||null}};c[y]=S,c[lt]=z,c[ls]=this._buildMessageInjectedContext(z),this._syncMessageToRuntimeChats(n,l,c);let V=i?.saveChat||o?.saveChat||i?.saveChatDebounced||o?.saveChatDebounced||null;return typeof V=="function"&&await V.call(i||o),this._notifyMessageUpdated(n,l),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587: ${t} -> #${l}`),!0}catch(n){return this._log("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",n),!1}}_getCurrentChatId(){try{let t=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(t.SillyTavern?.getContext){let s=t.SillyTavern.getContext(),n=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,t.SillyTavern?.chatId,t.SillyTavern?.chat_id,t.SillyTavern?.chat_filename].find(i=>typeof i=="string"&&i.trim());if(n)return n;let o=t.SillyTavern?.this_chid;if(o!=null)return`chat_char_${o}`}return"chat_default"}catch{return"chat_default"}}_log(...t){this.debugMode&&console.log("[ContextInjector]",...t)}},ds=new cs,la=ds});var Xn={};N(Xn,{BUILTIN_VARIABLES:()=>Kn,VariableResolver:()=>ys,default:()=>ca,variableResolver:()=>Ct});var Kn,ys,Ct,ca,Tr=E(()=>{B();Kn={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},ys=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(t,s){if(typeof t!="string")return t;let r=t;return r=this._resolveBuiltinVariables(r,s),r=this._resolveCustomVariables(r,s),r=this._resolveRegexVariables(r,s),r}resolveObject(t,s){if(!t||typeof t!="object")return t;if(Array.isArray(t))return t.map(n=>this.resolveObject(n,s));let r={};for(let[n,o]of Object.entries(t))typeof o=="string"?r[n]=this.resolveTemplate(o,s):typeof o=="object"&&o!==null?r[n]=this.resolveObject(o,s):r[n]=o;return r}buildToolContext(t){return{lastUserMessage:t.lastUserMessage||"",lastAiMessage:t.lastAiMessage||"",chatHistory:t.chatHistory||[],characterCard:t.characterCard||null,characterName:t.characterCard?.name||"",toolName:t.toolName||"",toolId:t.toolId||"",toolPromptMacro:t.toolPromptMacro||"",toolContentMacro:t.toolContentMacro||"",injectedContext:t.injectedContext||"",extractedContent:t.extractedContent||"",recentMessagesText:t.recentMessagesText||"",rawRecentMessagesText:t.rawRecentMessagesText||"",userMessage:t.userMessage||"",previousToolOutput:t.previousToolOutput||"",regexResults:t.regexResults||{},raw:t,timestamp:Date.now()}}registerVariable(t,s){t&&(this.customVariables.set(t,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${t}`))}unregisterVariable(t){this.customVariables.delete(t),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${t}`)}registerHandler(t,s){!t||typeof s!="function"||(this.variableHandlers.set(t,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${t}`))}getAvailableVariables(){let t=[];for(let[,s]of Object.entries(Kn))t.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,r]of this.customVariables)t.push({name:`{{${s}}}`,description:typeof r=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return t}getVariableHelp(){let t=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},r={};for(let n of this.getAvailableVariables())r[n.category]||(r[n.category]=[]),r[n.category].push(n);for(let[n,o]of Object.entries(s))if(r[n]&&r[n].length>0){t.push(`\u3010${o}\u3011`);for(let i of r[n])t.push(`  ${i.name} - ${i.description}`);t.push("")}return t.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),t.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),t.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(t,s)=>(s.regexResults||s.raw?.regexResults||{})[t]||"")}_resolveBuiltinVariables(t,s){let r=t;return r=r.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),r=r.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),r=r.replace(/\{\{chatHistory\}\}/gi,()=>{let n=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(n)}),r=r.replace(/\{\{characterCard\}\}/gi,()=>{let n=s.characterCard||s.raw?.characterCard;return n?this._formatCharacterCard(n):""}),r=r.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),r=r.replace(/\{\{toolId\}\}/gi,s.toolId||s.raw?.toolId||""),r=r.replace(/\{\{toolPromptMacro\}\}/gi,s.toolPromptMacro||s.raw?.toolPromptMacro||""),r=r.replace(/\{\{toolContentMacro\}\}/gi,s.toolContentMacro||s.raw?.toolContentMacro||""),r=r.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),r=r.replace(/\{\{extractedContent\}\}/gi,s.extractedContent||s.raw?.extractedContent||""),r=r.replace(/\{\{recentMessagesText\}\}/gi,s.recentMessagesText||s.raw?.recentMessagesText||""),r=r.replace(/\{\{rawRecentMessagesText\}\}/gi,s.rawRecentMessagesText||s.raw?.rawRecentMessagesText||""),r=r.replace(/\{\{userMessage\}\}/gi,s.userMessage||s.raw?.userMessage||""),r=r.replace(/\{\{previousToolOutput\}\}/gi,s.previousToolOutput||s.raw?.previousToolOutput||""),r}_resolveCustomVariables(t,s){let r=t;for(let[n,o]of this.customVariables){let i=new RegExp(`\\{\\{${this._escapeRegex(n)}\\}\\}`,"gi");typeof o=="function"?r=r.replace(i,()=>{try{return o(s)}catch(a){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${n}:`,a),""}}):r=r.replace(i,String(o))}return r}_resolveRegexVariables(t,s){let r=t;for(let[n,o]of this.variableHandlers){let i=new RegExp(`\\{\\{${n}\\.([^}]+)\\}\\}`,"gi");r=r.replace(i,(a,l)=>{try{return o(l,s)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${n}.${l}:`,c),""}})}return r}_formatChatHistory(t){return!Array.isArray(t)||t.length===0?"":t.map(s=>{let r=s.role||"unknown",n=s.content||s.mes||"";return`[${r}]: ${n}`}).join(`

`)}_formatCharacterCard(t){if(!t)return"";let s=[];return t.name&&s.push(`\u59D3\u540D: ${t.name}`),t.description&&s.push(`\u63CF\u8FF0: ${t.description}`),t.personality&&s.push(`\u6027\u683C: ${t.personality}`),t.scenario&&s.push(`\u573A\u666F: ${t.scenario}`),s.join(`

`)}_escapeRegex(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...t){this.debugMode&&console.log("[VariableResolver]",...t)}},Ct=new ys,ca=Ct});var to={};N(to,{DEFAULT_PROMPT_TEMPLATE:()=>Zn,ToolPromptService:()=>us,default:()=>da,toolPromptService:()=>ps});var Zn,us,ps,da,Er=E(()=>{B();xe();Tr();Zn="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",us=class{constructor(){this.debugMode=!1}_buildVariableContext(t,s={}){let r=this._getPromptTemplate(t),n=Ct.buildToolContext({...s,toolName:t?.name||s?.toolName||"",toolId:t?.id||s?.toolId||""}),o=Ct.resolveTemplate(r,n).trim(),i=String(s?.toolContentMacro||s?.input?.toolContentMacro||"").trim();return Ct.buildToolContext({...s,toolName:t?.name||s?.toolName||"",toolId:t?.id||s?.toolId||"",toolPromptMacro:o,toolContentMacro:i})}buildToolMessages(t,s){if(!t)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let r=[],n=this._buildVariableContext(t,s),o=this._getBypassMessages(t);if(o&&o.length>0)for(let i of o)i.enabled!==!1&&r.push({role:this._normalizeRole(i.role),content:Ct.resolveTemplate(i.content||"",n)});return this._log(`\u6784\u5EFA\u6D88\u606F: ${r.length} \u6761`),r}buildPromptText(t,s){return this._buildVariableContext(t,s).toolPromptMacro||""}getToolPromptTemplate(t){return this._getPromptTemplate(t)}_getPromptTemplate(t){return t.promptTemplate&&typeof t.promptTemplate=="string"?t.promptTemplate:Zn}_getBypassMessages(t){return t.bypass?.enabled?w.buildBypassMessages(t):[]}_buildUserContent(t,s){return!t||!t.trim()?"":Ct.resolveTemplate(t,s).trim()}_normalizeRole(t){if(!t)return"user";switch(String(t).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...t){this.debugMode&&console.log("[ToolPromptService]",...t)}setDebugMode(t){this.debugMode=t}},ps=new us,da=ps});var eo={};N(eo,{LEGACY_OUTPUT_MODES:()=>ya,OUTPUT_MODES:()=>Bt,TOOL_RUNTIME_STATUS:()=>ua,ToolOutputService:()=>gs,default:()=>pa,toolOutputService:()=>Gt});var Bt,ya,ua,gs,Gt,pa,Sr=E(()=>{B();as();wr();Er();Xe();Le();Bt={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},ya={inline:"follow_ai"},ua={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},gs=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(t){return!t||!t.enabled||!t.trigger?.enabled||!t.output?.enabled?!1:t.output?.mode===Bt.POST_RESPONSE_API}shouldRunFollowAi(t){if(!t||!t.enabled||!t.trigger?.enabled||!t.output?.enabled)return!1;let s=t.output?.mode;return s===Bt.FOLLOW_AI||s==="inline"}shouldRunInline(t){return this.shouldRunFollowAi(t)}async runToolPostResponse(t,s){let r=Date.now(),n=t.id;this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${n}`),h.emit(b.TOOL_EXECUTION_STARTED,{toolId:n,mode:Bt.POST_RESPONSE_API});try{let o=await this._buildToolMessages(t,s);if(!o||o.length===0)throw new Error("\u672A\u914D\u7F6E\u53EF\u53D1\u9001\u7684AI\u6307\u4EE4\u9884\u8BBE\u6D88\u606F\u3002\u5DE5\u5177\u73B0\u5728\u53EA\u63D0\u4F9B {{toolPromptMacro}} \u548C {{toolContentMacro}} \u4E24\u4E2A\u5B8F\uFF0C\u8BF7\u5728\u7834\u9650/AI\u6307\u4EE4\u9884\u8BBE\u4E2D\u663E\u5F0F\u5F15\u7528\u3002");this._log(`\u6784\u5EFA\u4E86 ${o.length} \u6761\u6D88\u606F`);let i=t.output?.apiPreset||t.apiPreset||"",a=await this._getRequestTimeout(),l=await this._sendApiRequest(i,o,{timeoutMs:a,signal:s.signal}),c=this._extractOutputContent(l,t);if(c&&!await ds.inject(n,c,{overwrite:t.output?.overwrite!==!1,sourceMessageId:s.messageId||"",extractionSelectors:this._getExtractionSelectors(t)}))throw new Error("\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");let y=Date.now()-r;return h.emit(b.TOOL_EXECUTED,{toolId:n,success:!0,duration:y,mode:Bt.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${n}, \u8017\u65F6 ${y}ms`),{success:!0,toolId:n,output:c,duration:y}}catch(o){let i=Date.now()-r;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${n}`,o),h.emit(b.TOOL_EXECUTION_FAILED,{toolId:n,error:o.message||String(o),duration:i}),{success:!1,toolId:n,error:o.message||String(o),duration:i}}}async runToolInline(t,s){let r=Date.now(),n=t.id;try{let o=await this._buildToolMessages(t,s);return{success:!0,toolId:n,messages:o,duration:Date.now()-r}}catch(o){return{success:!1,toolId:n,error:o.message||String(o),duration:Date.now()-r}}}async previewExtraction(t,s){let r=this._buildRecentMessageExtractionEntries(t,s),n=this._joinMessageBlocks(r,"rawText"),o=this._joinMessageBlocks(r,"filteredText"),i=this._joinMessageBlocks(r,"extractedText",{skipEmpty:!0});return{success:!0,sourceText:n,filteredSourceText:o,extractedText:i,messageEntries:r,selectors:this._getExtractionSelectors(t),maxMessages:t?.extraction?.maxMessages||5}}async _buildToolMessages(t,s){let r=this._buildRecentMessageExtractionEntries(t,s),n=this._joinMessageBlocks(r,"rawText"),o=this._joinMessageBlocks(r,"filteredText"),i=this._joinMessageBlocks(r,"extractedText",{skipEmpty:!0}),a={...s,rawRecentMessagesText:n,recentMessagesText:o,extractedContent:i,toolContentMacro:this._buildToolContentMacro(r),toolName:t.name,toolId:t.id};return ps.buildToolMessages(t,a)}_normalizeRole(t){if(!t)return"user";let s=String(t).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(t){this._apiConnection=t}async _sendApiRequest(t,s,r={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:n=9e4,signal:o}=r,i=null;if(t){if(!Os(t))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${t}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);i=ye(t)}else i=ye();let a=Qt(i||{});if(!a.valid&&!i?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${a.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:n,apiConfig:i},o);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Pt.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(t,s){if(!t)return"";if(typeof t=="string")return this._applyExtractionSelectors(t,s);if(typeof t=="object"){if(t.choices&&t.choices[0]?.message?.content)return this._applyExtractionSelectors(t.choices[0].message.content,s);if(t.content)return this._applyExtractionSelectors(t.content,s);if(t.text)return this._applyExtractionSelectors(t.text,s);if(t.message)return this._applyExtractionSelectors(t.message,s);try{return this._applyExtractionSelectors(JSON.stringify(t,null,2),s)}catch{return this._applyExtractionSelectors(String(t),s)}}return this._applyExtractionSelectors(String(t),s)}_getExtractionSelectors(t){let s=t?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(r=>String(r||"").trim()).filter(Boolean):Array.isArray(t?.extractTags)&&t.extractTags.length>0?t.extractTags.map(r=>String(r||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(t,s){return this._applyExtractionSelectorsInternal(t,s,{strict:!1})}_applyExtractionSelectorsInternal(t,s,r={}){let n=typeof t=="string"?t:String(t||""),o=this._getExtractionSelectors(s),{strict:i=!1}=r;if(!o.length)return n.trim();let a=o.map((c,y)=>{let p=String(c||"").trim(),x=p.startsWith("regex:");return{id:`tool-extract-${y}`,type:x?"regex_include":"include",value:x?p.slice(6).trim():p,enabled:!0}}).filter(c=>c.value),l=jt(n,a,[]);return i?(l||"").trim():l||n.trim()}_extractToolContent(t,s){let r=typeof s=="string"?s:String(s||"");return this._getExtractionSelectors(t).length?this._applyExtractionSelectorsInternal(r,t,{strict:!0}):r.trim()}_applyGlobalContextRules(t){let s=typeof t=="string"?t:String(t||"");if(!s.trim())return"";try{let r=ut()||[],n=Ut()||[];return!Array.isArray(r)||r.length===0?s.trim():jt(s,r,n)||s.trim()}catch(r){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",r),s.trim()}}_getMessageText(t){if(!t)return"";let s=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let r of s)if(typeof r=="string"&&r.trim())return r.trim();return""}_collectRecentAssistantMessages(t,s){return this._collectRecentAssistantMessageEntries(t,s).map(r=>r.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(t,s){let r=Math.max(1,parseInt(t?.extraction?.maxMessages,10)||5),n=Array.isArray(s?.chatMessages)?s.chatMessages:[],o=[];for(let a=n.length-1;a>=0&&o.length<r;a-=1){let l=n[a],c=String(l?.role||"").toLowerCase(),y=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,p=this._getMessageText(l);y&&p&&o.unshift({text:p,message:l,chatIndex:a})}if(o.length>0)return o;let i=s?.lastAiMessage||s?.input?.lastAiMessage||"";return i?[{text:i,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(t,s){return this._collectRecentAssistantMessageEntries(t,s).map((n,o)=>{let i=n.text||"",a=this._applyGlobalContextRules(i),l=this._extractToolContent(t,i);return{...n,order:o+1,rawText:i,filteredText:a,extractedText:l}})}_joinMessageBlocks(t,s,r={}){let n=Array.isArray(t)?t:[],{skipEmpty:o=!1}=r;return n.map(a=>{let l=String(a?.[s]||"").trim();return o&&!l?"":`${`\u3010\u7B2C ${a?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(t){return(Array.isArray(t)?t:[]).map(n=>{let o=`\u3010\u7B2C ${n?.order||0} \u6761 AI \u6D88\u606F\u3011`,i=String(n?.filteredText||"").trim()||"(\u7A7A)",a=String(n?.extractedText||"").trim()||"(\u7A7A)";return`${o}
\u6B63\u6587\uFF1A
${i}

\u5DE5\u5177\uFF1A
${a}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(t){return Array.isArray(t)?t.filter(s=>this.shouldRunPostResponse(s)):[]}filterInlineTools(t){return Array.isArray(t)?t.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(t){this.debugMode=t}_log(...t){this.debugMode&&console.log("[ToolOutputService]",...t)}},Gt=new gs,pa=Gt});var co={};N(co,{EVENT_TYPES:()=>et,checkGate:()=>Cr,destroyToolTriggerManager:()=>ka,getChatContext:()=>$r,getCurrentCharacter:()=>Mr,getFullContext:()=>Sa,getToolTriggerManagerState:()=>Ra,getWorldbookContent:()=>oo,initToolTriggerManager:()=>io,initTriggerModule:()=>lo,previewToolExtraction:()=>Ir,registerEventListener:()=>Yt,registerTriggerHandler:()=>_a,removeAllListeners:()=>Ta,removeAllTriggerHandlers:()=>Pa,resetGateState:()=>Ea,runToolManually:()=>Rr,setDebugMode:()=>Ia,setTriggerHandlerEnabled:()=>Aa,triggerState:()=>$,unregisterEventListener:()=>bs,updateGateState:()=>we});function $t(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function _r(e){if(!e)return"";let t=[e.mes,e.message,e.content,e.text,e?.data?.content];for(let s of t)if(typeof s=="string"&&s.trim())return s;return""}function ga(e){return new Promise(t=>setTimeout(t,e))}function fa(e,t){let s=[e?.messageId,e?.id,e?.mes_id,e?.swipe_id,t];for(let r of s){if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"&&r.trim())return r.trim()}return t}function ma(e,t=null){let r=(Array.isArray(e)?e:[]).map((a,l)=>({role:ro(a),content:_r(a),name:a?.name||"",timestamp:a?.send_date||a?.timestamp||"",isSystem:!!a?.is_system,isUser:!!a?.is_user,sourceId:fa(a,l),chatIndex:l,originalMessage:a})),n=t==null||t===""?null:String(t).trim(),o=null,i=null;for(let a=r.length-1;a>=0;a-=1){let l=r[a];if(!o&&l.role==="assistant"&&l.content&&(!n||String(l.sourceId).trim()===n||l.chatIndex===Number(n)?o=l:o||(o=l)),!i&&l.role==="user"&&l.content&&(i=l),o&&i)break}return{messages:r,lastUserMessage:i,lastAiMessage:o}}async function ba(e={}){let{preferredMessageId:t=null,retries:s=0,retryDelayMs:r=250}=e,n={messages:[],lastUserMessage:null,lastAiMessage:null};for(let o=0;o<=s;o+=1){let i=await no();if(n=ma(i,t),n.lastAiMessage?.content)return n;o<s&&await ga(r)}return n}function fs(){we({lastUserSendIntentAt:Date.now()})}function ha(){let e=$t(),t=e?.document;if(!t?.body)return!1;if(e.__YYT_sendIntentHooksInstalled)return!0;let s=["#send_but","#option_send","#send_button",'button[title*="\u53D1\u9001"]','button[title*="Send"]'],r=["#send_textarea","#send_textarea textarea","textarea#send_textarea",'textarea[data-testid="send_textarea"]'],n=(o,i,a)=>{o.forEach(l=>{let c=t.querySelector(l);c&&c.addEventListener(i,a,!0)})};return n(s,"click",()=>fs()),n(s,"pointerup",()=>fs()),n(s,"touchend",()=>fs()),n(r,"keydown",o=>{let i=o?.key||"";(i==="Enter"||i==="NumpadEnter")&&!o.shiftKey&&fs()}),e.__YYT_sendIntentHooksInstalled=!0,v("\u5DF2\u5B89\u88C5\u53D1\u9001\u610F\u56FE\u6355\u83B7\u94A9\u5B50"),!0}function xa(e,t={},s=!1){return s?!0:String(e||t?.type||"").trim().toLowerCase().includes("quiet")||t?.quiet===!0||t?.isQuiet===!0||t?.quiet_prompt===!0}function se(){return $t().SillyTavern||null}function va(){return $t().TavernHelper||null}function Ar(){let t=$t().SillyTavern;return t&&t.eventSource?t.eventSource:null}function Pr(){let t=$t().SillyTavern;return t&&t.eventTypes?t.eventTypes:et}function v(...e){$.debugMode&&console.log("[YouYouToolkit:Trigger]",...e)}function wa(e,t,s){let n=[t?.chatId,t?.chat_id,t?.chat_filename,t?.chatMetadata?.chatId,t?.chatMetadata?.chat_id,t?.chatMetadata?.file_name,t?.chatMetadata?.name,e?.chatId,e?.chat_id,e?.chat_filename].find(o=>typeof o=="string"&&o.trim());return n||(s?.id!==void 0&&s?.id!==null?`chat_char_${s.id}`:e?.this_chid!==void 0&&e?.this_chid!==null?`chat_char_${e.this_chid}`:"chat_default")}function Yt(e,t,s={}){if(!e||typeof t!="function")return v("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u51FD\u6570"),()=>{};let{once:r=!1,priority:n=0}=s,o=Ar(),a=Pr()[e]||e,l=async(...c)=>{try{if(s.gateCheck&&!await Cr(s.gateCheck)){v(`\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6: ${e}`);return}await t(...c),r&&bs(e,l)}catch(y){console.error("[YouYouToolkit:Trigger] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF:",y)}};if($.listeners.has(e)||$.listeners.set(e,new Set),$.listeners.get(e).add(l),o&&typeof o.on=="function")o.on(a,l),v(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${e}`);else{let c=$t();c.addEventListener&&(c.addEventListener(a,l),v(`\u5DF2\u6CE8\u518CDOM\u4E8B\u4EF6\u76D1\u542C\u5668: ${e}`))}return()=>bs(e,l)}function bs(e,t){let s=$.listeners.get(e);if(s&&s.has(t)){s.delete(t);let r=Ar(),o=Pr()[e]||e;if(r&&typeof r.off=="function")r.off(o,t),v(`\u5DF2\u53D6\u6D88\u4E8B\u4EF6\u76D1\u542C\u5668: ${e}`);else{let i=$t();i.removeEventListener&&i.removeEventListener(o,t)}}}function Ta(){let e=Ar(),t=Pr();for(let[s,r]of $.listeners){let n=t[s]||s;for(let o of r)if(e&&typeof e.off=="function")e.off(n,o);else{let i=$t();i.removeEventListener&&i.removeEventListener(n,o)}}$.listeners.clear(),v("\u5DF2\u79FB\u9664\u6240\u6709\u4E8B\u4EF6\u76D1\u542C\u5668")}async function Cr(e){if(!e)return!0;let t=Date.now(),s=$.gateState;if(e.minInterval&&s.lastGenerationAt&&t-s.lastGenerationAt<e.minInterval)return v("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u77ED"),!1;if(e.maxInterval&&s.lastUserMessageAt&&t-s.lastUserMessageAt>e.maxInterval)return v("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u957F"),!1;if(e.requireUserMessage&&!s.lastUserMessageId)return v("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u7F3A\u5C11\u7528\u6237\u6D88\u606F"),!1;if(e.excludeQuietGeneration&&s.lastGenerationType==="quiet")return v("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: quiet\u751F\u6210\u88AB\u6392\u9664"),!1;if(e.customCheck&&typeof e.customCheck=="function")try{if(!await e.customCheck(s))return v("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u81EA\u5B9A\u4E49\u68C0\u67E5\u8FD4\u56DEfalse"),!1}catch(r){return console.error("[YouYouToolkit:Trigger] \u81EA\u5B9A\u4E49\u95E8\u63A7\u68C0\u67E5\u9519\u8BEF:",r),!1}return!0}function we(e){Object.assign($.gateState,e)}function Ea(){$.gateState={lastUserSendIntentAt:0,lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationType:null,lastGenerationParams:null,lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1}}async function $r(e={}){let{depth:t=3,includeUser:s=!0,includeAssistant:r=!0,includeSystem:n=!1,format:o="messages"}=e;if(!se())return v("\u65E0\u6CD5\u83B7\u53D6SillyTavern API"),null;try{let a=await no(),l=[],c=Math.max(0,a.length-t);for(let y=c;y<a.length;y++){let p=a[y];if(!p)continue;let x=ro(p);if(!(x==="user"&&!s)&&!(x==="system"&&!n)&&!(x==="assistant"&&!r))if(o==="messages"){let g=_r(p);l.push({role:x,content:g,name:p.name||"",timestamp:p.send_date||p.timestamp,isSystem:!!p.is_system,isUser:!!p.is_user})}else l.push(_r(p))}return{messages:l,totalMessages:a.length,startIndex:c,endIndex:a.length-1}}catch(a){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u804A\u5929\u4E0A\u4E0B\u6587\u5931\u8D25:",a),null}}function ro(e){if(!e)return"assistant";if(e.is_user)return"user";if(e.is_system)return"system";let t=String(e.role||"").toLowerCase();return t==="user"||t==="assistant"||t==="system"?t:"assistant"}async function no(){let e=va(),t=se();if(e?.getChatMessages)try{let s=-1;if(typeof e.getLastMessageId=="function"&&(s=e.getLastMessageId()),!Number.isFinite(s)||s<0){let r=t?.getContext?.()||null,n=Array.isArray(r?.chat)?r.chat:[],o=Array.isArray(t?.chat)?t.chat:[];s=(n.length?n:o).length-1}if(Number.isFinite(s)&&s>=0){let r=await e.getChatMessages(`0-${s}`,{include_swipes:!1,include_hidden:!0});if(Array.isArray(r)&&r.length>0)return r}}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 TavernHelper \u8BFB\u53D6\u804A\u5929\u6D88\u606F\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u9ED8\u8BA4\u6765\u6E90:",s)}try{let s=t?.getContext?.()||null;if(Array.isArray(s?.chat)&&s.chat.length>0)return s.chat}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 getContext() \u8BFB\u53D6\u804A\u5929\u5931\u8D25:",s)}return Array.isArray(t?.chat)?t.chat:[]}async function Mr(){let e=se();if(!e)return null;try{let t=e.this_chid,s=e.characters||[];if(t>=0&&t<s.length){let r=s[t];return{id:t,name:r.name||"",description:r.description||"",personality:r.personality||"",scenario:r.scenario||"",firstMes:r.first_mes||"",mesExample:r.mes_example||""}}return null}catch(t){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",t),null}}async function oo(e={}){let{enabledOnly:t=!0,maxLength:s=1e4}=e,r=se();if(!r)return"";try{let o=(r.lorebook||[]).entries||[],i=[],a=0;for(let l of o){if(t&&!l.enabled)continue;let c=l.content||"";c&&a+c.length<=s&&(i.push(c),a+=c.length)}return i.join(`

`)}catch(n){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u5931\u8D25:",n),""}}async function Sa(e={}){let[t,s,r]=await Promise.all([$r(e.chat||{}),Mr(),oo(e.worldbook||{})]);return{chat:t,character:s,worldbook:r,timestamp:Date.now()}}function _a(e,t){if(!e||!t)return v("\u65E0\u6548\u7684\u5904\u7406\u5668ID\u6216\u914D\u7F6E"),()=>{};let{eventType:s,handler:r,gateCondition:n,priority:o=0}=t;if(!s||typeof r!="function")return v("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u5904\u7406\u5668\u51FD\u6570"),()=>{};$.handlers.set(e,{eventType:s,handler:r,gateCondition:n,priority:o,enabled:!0});let i=Yt(s,async(...a)=>{let l=$.handlers.get(e);!l||!l.enabled||l.gateCondition&&!await Cr(l.gateCondition)||await l.handler(...a)},{priority:o});return v(`\u5DF2\u6CE8\u518C\u89E6\u53D1\u5904\u7406\u5668: ${e}`),()=>{i(),$.handlers.delete(e),v(`\u5DF2\u53D6\u6D88\u89E6\u53D1\u5904\u7406\u5668: ${e}`)}}function Aa(e,t){let s=$.handlers.get(e);s&&(s.enabled=t,v(`\u89E6\u53D1\u5904\u7406\u5668 ${e} \u5DF2${t?"\u542F\u7528":"\u7981\u7528"}`))}function Pa(){$.handlers.clear(),v("\u5DF2\u79FB\u9664\u6240\u6709\u89E6\u53D1\u5904\u7406\u5668")}function Ca(e){let t=e?.chatId||"chat_default",s=e?.messageId===void 0||e?.messageId===null||e?.messageId===""?"latest":String(e.messageId);return`${t}::${s}`}async function so(e,t){if(v(`${e}\u89E6\u53D1:`,t),xa($.gateState.lastGenerationType,$.gateState.lastGenerationParams,$.gateState.lastGenerationDryRun)){v("\u68C0\u6D4B\u5230 quiet / dryRun \u751F\u6210\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u81EA\u52A8\u6267\u884C");return}let s=await kr({...typeof t=="object"&&t?t:{},triggerEvent:e,messageId:typeof t=="string"||typeof t=="number"?t:t?.messageId||t?.id||""});if(!s?.lastAiMessage){v(`${e} \u540E\u672A\u8BFB\u53D6\u5230\u6700\u65B0 AI \u56DE\u590D\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u6267\u884C`);return}let r=Ca(s);if(J.lastHandledMessageKey===r){v(`\u68C0\u6D4B\u5230\u91CD\u590D\u81EA\u52A8\u89E6\u53D1\uFF0C\u8DF3\u8FC7: ${r}`);return}let n=Ma(et.GENERATION_ENDED);if(n.length===0){v("\u6CA1\u6709\u9700\u8981\u6267\u884C\u7684\u5DE5\u5177");return}J.lastHandledMessageKey=r,v(`\u9700\u8981\u6267\u884C ${n.length} \u4E2A\u5DE5\u5177:`,n.map(o=>o.id)),rt("info",`\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u5F00\u59CB\u81EA\u52A8\u6267\u884C ${n.length} \u4E2A\u5DE5\u5177`,{duration:2400,noticeId:"yyt-tool-batch-start"});for(let o of n)try{let i=await ao(o,s);i.success?(v(`\u5DE5\u5177 ${o.id} \u6267\u884C\u6210\u529F`),h.emit(b.TOOL_EXECUTED,{toolId:o.id,result:i.result||i.data||i})):v(`\u5DE5\u5177 ${o.id} \u6267\u884C\u5931\u8D25:`,i.error)}catch(i){console.error(`[ToolTrigger] \u5DE5\u5177\u6267\u884C\u5931\u8D25: ${o.id}`,i)}J.lastExecutionContext=s}function io(){if(J.initialized){v("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316");return}$a(),J.initialized=!0,v("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316"),h.emit(b.TOOL_TRIGGER_INITIALIZED)}function $a(){let e=Yt(et.GENERATION_ENDED,async s=>{await so(et.GENERATION_ENDED,s)}),t=Yt(et.MESSAGE_RECEIVED,async s=>{await so(et.MESSAGE_RECEIVED,s)});J.listeners.set(et.GENERATION_ENDED,e),J.listeners.set(et.MESSAGE_RECEIVED,t)}async function kr(e){let t=await Mr(),s=se(),r=s?.getContext?.()||null,n=typeof e=="string"||typeof e=="number"?e:e?.messageId||e?.id||"",o=e?.triggerEvent||"GENERATION_ENDED",i=await ba({preferredMessageId:n,retries:o==="GENERATION_ENDED"?6:2,retryDelayMs:o==="GENERATION_ENDED"?300:120}),a=i.messages||[],l=i.lastUserMessage,c=i.lastAiMessage,y=c?.sourceId??n??"";return{triggeredAt:Date.now(),triggerEvent:o,chatId:wa(s,r,t),messageId:y,lastAiMessage:c?.content||"",userMessage:l?.content||$.gateState.lastUserMessageText||"",chatMessages:a,input:{userMessage:l?.content||$.gateState.lastUserMessageText||"",lastAiMessage:c?.content||"",extractedContent:"",previousToolOutput:"",context:{character:t?.name||"",chatLength:a.length||0}},config:{},status:"pending"}}function Ma(e){return br(e).filter(s=>Gt.shouldRunPostResponse(s))}function ms(e,t){try{ur(e,t)}catch(s){console.warn("[ToolTrigger] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",e,s)}}async function ao(e,t){let s=Date.now(),r=e.id,n=t?.triggerEvent==="MANUAL",o=`yyt-tool-run-${r}`;ms(r,{lastStatus:"running",lastError:"",lastDurationMs:0}),h.emit(b.TOOL_EXECUTION_REQUESTED,{toolId:r,triggerEvent:t?.triggerEvent||"GENERATION_ENDED",context:t}),rt("info",`${n?"\u6B63\u5728\u624B\u52A8\u6267\u884C":"\u5DF2\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u6B63\u5728\u81EA\u52A8\u6267\u884C"} ${e.name}`,{sticky:!0,noticeId:o});try{let i;e.output?.mode===Bt.POST_RESPONSE_API?i=await Gt.runToolPostResponse(e,t):i=await os(r,t);let a=Date.now()-s;if(i?.success){let y=O(r);ms(r,{lastStatus:"success",lastError:"",lastDurationMs:a,successCount:(y?.runtime?.successCount||0)+1});let p=n?`${e.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`:`\u5DF2\u76D1\u542C AI \u56DE\u590D\u5E76\u6267\u884C ${e.name}`;return u("success",p),rt("success",p,{duration:3200,noticeId:o}),{success:!0,duration:a,result:i}}let l=O(r),c=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25";return ms(r,{lastStatus:"error",lastError:c,lastDurationMs:a,errorCount:(l?.runtime?.errorCount||0)+1}),u("error",`${e.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`),rt("error",`${e.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`,{sticky:!0,noticeId:o}),{success:!1,duration:a,error:c,result:i}}catch(i){let a=Date.now()-s,l=O(r),c=i?.message||String(i);throw ms(r,{lastStatus:"error",lastError:c,lastDurationMs:a,errorCount:(l?.runtime?.errorCount||0)+1}),u("error",`${e.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`),rt("error",`${e.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`,{sticky:!0,noticeId:o}),i}}async function Rr(e){if(!e)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let t=O(e);if(!t)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!t.enabled)return rt("warning",`${t.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${e}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};if(!Gt.shouldRunPostResponse(t))return rt("warning",`${t.name} \u5F53\u524D\u4E3A\u201C\u968F AI \u8F93\u51FA\u201D\uFF0C\u4E0D\u4F1A\u6267\u884C\u989D\u5916\u89E3\u6790`,{duration:3200,noticeId:`yyt-tool-run-${e}`}),{success:!1,error:"\u5F53\u524D\u8F93\u51FA\u6A21\u5F0F\u4E0D\u6267\u884C\u989D\u5916\u89E3\u6790"};let s=await kr({triggerEvent:"MANUAL"});return ao(t,s)}async function Ir(e){if(!e)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let t=O(e);if(!t)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await kr({triggerEvent:"MANUAL_PREVIEW"});return Gt.previewExtraction(t,s)}function ka(){for(let[e,t]of J.listeners)bs(e,t);J.listeners.clear(),J.initialized=!1,J.lastExecutionContext=null,J.lastHandledMessageKey="",v("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u9500\u6BC1")}function Ra(){return{initialized:J.initialized,listenersCount:J.listeners.size,lastExecutionContext:J.lastExecutionContext}}async function lo(){if($.isInitialized){v("\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316");return}if(!se()){v("\u65E0\u6CD5\u83B7\u53D6SillyTavern API\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),setTimeout(lo,1e3);return}ha(),Yt(et.MESSAGE_SENT,async t=>{let r=(await $r({depth:10,includeAssistant:!1,includeSystem:!1}))?.messages?.filter(n=>n.role==="user").pop();we({lastUserSendIntentAt:Date.now(),lastUserMessageId:t,lastUserMessageAt:Date.now(),lastUserMessageText:r?.content||$.gateState.lastUserMessageText||""}),v(`\u7528\u6237\u6D88\u606F\u5DF2\u53D1\u9001: ${t}`)}),Yt(et.GENERATION_STARTED,(t,s,r)=>{we({lastGenerationType:t,lastGenerationParams:s||null,lastGenerationDryRun:!!r,isGenerating:!0}),v(`\u751F\u6210\u5F00\u59CB: ${t}`)}),Yt(et.GENERATION_ENDED,()=>{we({lastGenerationAt:Date.now(),isGenerating:!1}),v("\u751F\u6210\u7ED3\u675F")}),io(),$.isInitialized=!0,v("\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function Ia(e){$.debugMode=e}var et,$,J,Dr=E(()=>{B();he();hr();Sr();nt();et={MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHARACTER_LOADED:"CHARACTER_LOADED",CHARACTER_DELETED:"CHARACTER_DELETED",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",WORLDBOOK_UPDATED:"WORLDBOOK_UPDATED",EXTENSIONS_LOADED:"EXTENSIONS_LOADED",SETTINGS_LOADED:"SETTINGS_LOADED"},$={listeners:new Map,handlers:new Map,gateState:{lastUserSendIntentAt:0,lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationType:null,lastGenerationParams:null,lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1},isInitialized:!1,debugMode:!1};J={initialized:!1,listeners:new Map,lastExecutionContext:null,lastHandledMessageKey:""}});function hs(e){let{id:t,toolId:s,postResponseHint:r,extractionPlaceholder:n,previewDialogId:o,previewTitle:i="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=e;return{id:t,toolId:s,render(){let a=O(this.toolId);if(!a)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let l=this._getApiPresets(),c=a.output?.apiPreset||a.apiPreset||"",y=this._getBypassPresets(),p=a.output?.mode||"follow_ai",x=a.bypass?.enabled||!1,g=a.bypass?.presetId||"",S=a.runtime?.lastStatus||"idle",st=a.runtime?.lastRunAt?new Date(a.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",z=a.runtime?.lastError||"",V=a.extraction||{},ie=Array.isArray(V.selectors)?V.selectors.join(`
`):"",xt=p==="post_response_api"?r:"\u968F AI \u8F93\u51FA\u5373\u4E0D\u542F\u7528\u989D\u5916\u5DE5\u5177\u94FE\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\u3002";return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>\u8F93\u51FA\u6A21\u5F0F</span>
            </div>
            <div class="yyt-form-group">
              <label>\u8F93\u51FA\u6A21\u5F0F</label>
              <select class="yyt-select" id="${d}-tool-output-mode">
                <option value="follow_ai" ${p==="follow_ai"?"selected":""}>\u968F AI \u8F93\u51FA\uFF08\u4E0D\u542F\u7528\uFF09</option>
                <option value="post_response_api" ${p==="post_response_api"?"selected":""}>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790</option>
              </select>
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${xt}</div>
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
                ${l.map(F=>`
                  <option value="${f(F.name)}" ${F.name===c?"selected":""}>
                    ${f(F.name)}
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
                <input type="checkbox" id="${d}-tool-bypass-enabled" ${x?"checked":""}>
                <span>\u542F\u7528\u7834\u9650\u8BCD</span>
              </label>
            </div>
            <div class="yyt-form-group yyt-bypass-preset-select ${x?"":"yyt-hidden"}">
              <label>\u7ED1\u5B9A\u7834\u9650\u8BCD\u9884\u8BBE</label>
              <select class="yyt-select" id="${d}-tool-bypass-preset">
                <option value="">\u9009\u62E9\u9884\u8BBE</option>
                ${y.map(F=>`
                  <option value="${f(F.id)}" ${F.id===g?"selected":""}>
                    ${f(F.name)}${F.isDefault?" [\u9ED8\u8BA4]":""}
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
                <input type="number" class="yyt-input" id="${d}-tool-max-messages" min="1" max="50" value="${Number(V.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${d}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${f(n)}">${f(ie)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u63D0\u53D6\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u63D0\u53D6\u3002</div>
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
                        placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${f(a.promptTemplate||"")}</textarea>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${f(S)}">${f(S)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${f(st)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${a.runtime?.successCount||0} / ${a.runtime?.errorCount||0}</span>
                </div>
                ${z?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${f(z)}</span>
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

          <div class="yyt-tool-macro-hint">
            \u8BF4\u660E\uFF1A\u5DE5\u5177\u4E0D\u4F1A\u518D\u81EA\u52A8\u62FC\u63A5\u4EFB\u4F55\u6D88\u606F\uFF0C\u53EA\u4F1A\u63D0\u4F9B\u4E24\u4E2A\u5B8F\u7ED9 AI \u6307\u4EE4\u9884\u8BBE\u4F7F\u7528\uFF1A<code>{{toolPromptMacro}}</code>\uFF08\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\uFF09\u4E0E <code>{{toolContentMacro}}</code>\uFF08\u5904\u7406\u597D\u7684 n \u6761\u6D88\u606F\u6B63\u6587\u4E0E\u5DE5\u5177\u7ED3\u679C\uFF09\u3002
          </div>
        </div>
      `},_getApiPresets(){try{return Jt()||[]}catch{return[]}},_getBypassPresets(){try{return fr()||[]}catch{return[]}},_getFormData(a){let l=a.find(`#${d}-tool-output-mode`).val()||"follow_ai",c=a.find(`#${d}-tool-bypass-enabled`).is(":checked"),y=l==="post_response_api",p=(a.find(`#${d}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(x=>x.trim()).filter(Boolean);return{enabled:!0,promptTemplate:a.find(`#${d}-tool-prompt-template`).val()||"",apiPreset:a.find(`#${d}-tool-api-preset`).val()||"",extractTags:p,trigger:{event:"GENERATION_ENDED",enabled:y},output:{mode:l,apiPreset:a.find(`#${d}-tool-api-preset`).val()||"",overwrite:!0,enabled:y},bypass:{enabled:c,presetId:c&&a.find(`#${d}-tool-bypass-preset`).val()||""},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(a.find(`#${d}-tool-max-messages`).val(),10)||5),selectors:p}}},_showExtractionPreview(a,l){if(!_())return;let y=`${d}-${o}`,p=Array.isArray(l.messageEntries)?l.messageEntries:[],x=p.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${p.map(g=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">\u7B2C ${g.order} \u6761 AI \u6D88\u606F</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${f(g.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${f(g.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${f(g.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";a.append(pn({id:y,title:i,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${f((l.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6700\u8FD1 ${l.maxMessages} \u6761 AI \u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${f(l.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${f(l.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${f(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${x}
        `})),gn(a,y,{onSave:g=>g()}),a.find(`#${y}-save`).text("\u5173\u95ED"),a.find(`#${y}-cancel`).remove()},bindEvents(a){let l=_();!l||!C(a)||(a.find(`#${d}-tool-output-mode`).on("change",()=>{let y=(a.find(`#${d}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?r:"\u968F AI \u8F93\u51FA\u5373\u4E0D\u542F\u7528\u989D\u5916\u5DE5\u5177\u94FE\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\u3002";a.find(".yyt-tool-mode-hint").text(y)}),a.find(`#${d}-tool-bypass-enabled`).on("change",c=>{let y=l(c.currentTarget).is(":checked");a.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!y)}),a.find(`#${d}-tool-save`).on("click",()=>{this._saveConfig(a,{silent:!1})}),a.find(`#${d}-tool-reset-template`).on("click",()=>{let y=ss()[this.toolId];y?.promptTemplate&&(a.find(`#${d}-tool-prompt-template`).val(y.promptTemplate),u("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),a.find(`#${d}-tool-run-manual`).on("click",async()=>{if(this._saveConfig(a,{silent:!0}))try{let y=await Rr(this.toolId);!y?.success&&y?.error&&rt("warning",y.error,{duration:3200,noticeId:`yyt-tool-run-${this.toolId}`})}catch(y){u("error",y?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{this.renderTo(a)}}),a.find(`#${d}-tool-preview-extraction`).on("click",async()=>{if(this._saveConfig(a,{silent:!0}))try{let y=await Ir(this.toolId);if(!y?.success){u("error",y?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}this._showExtractionPreview(a,y)}catch(y){u("error",y?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}))},_saveConfig(a,l={}){let c=this._getFormData(a),{silent:y=!1}=l,p=mt(this.toolId,c);return p?y||u("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):u("error","\u4FDD\u5B58\u5931\u8D25"),p},destroy(a){!_()||!C(a)||a.find("*").off()},getStyles(){return Da},renderTo(a){a.html(this.render({})),this.bindEvents(a,{})}}}var Da,Or=E(()=>{nt();he();ze();xe();Dr();Da=`
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

  .yyt-tool-macro-hint {
    font-size: 12px;
    color: var(--yyt-text-muted);
    line-height: 1.7;
    padding: 12px 14px;
    border-radius: var(--yyt-radius-sm);
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

  @media screen and (max-width: 768px) {
    .yyt-tool-manual-area {
      grid-template-columns: 1fr;
    }

    .yyt-tool-manual-actions {
      min-width: 0;
    }
  }
`});var Mt,Lr=E(()=>{Or();Mt=hs({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var Ft,Nr=E(()=>{Or();Ft=hs({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var yo={};N(yo,{BypassPanel:()=>re,default:()=>Oa});var re,Oa,xs=E(()=>{B();xe();nt();re={id:"bypassPanel",render(e){let t=w.getPresetList(),s=w.getDefaultPresetId();return`
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
            ${t.map(r=>this._renderPresetItem(r,r.id===s)).join("")}
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
    `},_renderPresetItem(e,t){let s=ht&&ht[e.id];return`
      <div class="yyt-bypass-preset-item ${t?"yyt-default":""}" data-preset-id="${e.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${f(e.name)}</span>
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
      `;let t=w.getDefaultPresetId()===e.id,s=ht&&ht[e.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${e.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${f(e.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
                 value="${f(e.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
        </div>
        
        <div class="yyt-bypass-messages-header">
          <span>\u6D88\u606F\u5217\u8868</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-add-message">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u6D88\u606F
          </button>
        </div>
        
        <div class="yyt-bypass-messages" id="yyt-bypass-messages">
          ${(e.messages||[]).map(r=>this._renderMessageItem(r)).join("")}
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${f(e.content||"")}</textarea>
      </div>
    `},bindEvents(e,t){let s=_();!s||!C(e)||(this._bindPresetListEvents(e,s),this._bindEditorEvents(e,s),this._bindFileEvents(e,s))},_bindPresetListEvents(e,t){e.on("click",".yyt-bypass-preset-item",s=>{if(t(s.target).closest(".yyt-bypass-quick-delete").length)return;let r=t(s.currentTarget).data("presetId");this._selectPreset(e,t,r)}),e.on("click",".yyt-bypass-quick-delete",s=>{s.stopPropagation();let r=t(s.currentTarget).data("presetId");if(!r||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let n=w.deletePreset(r);n.success?(e.find(".yyt-bypass-editor-content").data("presetId")===r&&e.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(e,t),u("success","\u9884\u8BBE\u5DF2\u5220\u9664")):u("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),e.find("#yyt-bypass-add").on("click",()=>{this._createNewPreset(e,t)})},_bindEditorEvents(e,t){e.on("click","#yyt-bypass-save",()=>{this._saveCurrentPreset(e,t)}),e.on("click","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(e,t)}),e.on("click","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(e,t)}),e.on("click","#yyt-bypass-set-default",()=>{this._setAsDefault(e,t)}),e.on("click","#yyt-bypass-add-message",()=>{this._addMessage(e,t)}),e.on("click",".yyt-bypass-delete-message",s=>{let r=t(s.currentTarget).closest(".yyt-bypass-message"),n=r.data("messageId");r.remove()}),e.on("change",".yyt-bypass-message-enabled",s=>{t(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!t(s.currentTarget).is(":checked"))})},_bindFileEvents(e,t){e.find("#yyt-bypass-import").on("click",()=>{e.find("#yyt-bypass-import-file").click()}),e.find("#yyt-bypass-import-file").on("change",async s=>{let r=s.target.files[0];if(r){try{let n=await At(r),o=w.importPresets(n);u(o.success?"success":"error",o.message),o.success&&this.renderTo(e)}catch(n){u("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}t(s.target).val("")}}),e.find("#yyt-bypass-export").on("click",()=>{try{let s=w.exportPresets();_t(s,`bypass_presets_${Date.now()}.json`),u("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){u("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(e,t,s){let r=w.getPreset(s);r&&(e.find(".yyt-bypass-preset-item").removeClass("yyt-active"),e.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),e.find("#yyt-bypass-editor").html(this._renderEditor(r)))},_createNewPreset(e,t){let s=`bypass_${Date.now()}`,r=w.createPreset({id:s,name:"\u65B0\u7834\u9650\u8BCD\u9884\u8BBE",description:"",messages:[]});r.success?(this.renderTo(e),this._selectPreset(e,t,s),u("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):u("error",r?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(e,t){let s=e.find(".yyt-bypass-editor-content"),r=s.data("presetId");if(!r)return;let n=s.find(".yyt-bypass-name-input").val().trim(),o=s.find("#yyt-bypass-description").val().trim();if(!n){u("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let i=[];s.find(".yyt-bypass-message").each(function(){let l=t(this);i.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let a=w.updatePreset(r,{name:n,description:o,messages:i});a.success?(u("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(e,t)):u("error",a?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(e,t){let r=e.find(".yyt-bypass-editor-content").data("presetId");if(!r||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let n=w.deletePreset(r);n.success?(this.renderTo(e),u("success","\u9884\u8BBE\u5DF2\u5220\u9664")):u("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(e,t){let r=e.find(".yyt-bypass-editor-content").data("presetId");if(!r)return;let n=`bypass_${Date.now()}`,o=w.duplicatePreset(r,n);o.success?(this.renderTo(e),this._selectPreset(e,t,n),u("success","\u9884\u8BBE\u5DF2\u590D\u5236")):u("error",o?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(e,t){let r=e.find(".yyt-bypass-editor-content").data("presetId");r&&(w.setDefaultPresetId(r),e.find(".yyt-bypass-preset-item").removeClass("yyt-default"),e.find(`.yyt-bypass-preset-item[data-preset-id="${r}"]`).addClass("yyt-default"),e.find(".yyt-bypass-default-badge").remove(),e.find(`.yyt-bypass-preset-item[data-preset-id="${r}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>'),u("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE"))},_addMessage(e,t){let s=e.find("#yyt-bypass-messages"),r={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};s.append(this._renderMessageItem(r))},_refreshPresetList(e,t){let s=w.getPresetList(),r=w.getDefaultPresetId();e.find(".yyt-bypass-preset-list").html(s.map(n=>this._renderPresetItem(n,n.id===r)).join(""))},destroy(e){!_()||!C(e)||e.find("*").off()},getStyles(){return`
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
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}},Oa=re});function vs(){Q.register(yt.id,yt),Q.register(pt.id,pt),Q.register(gt.id,gt),Q.register(Mt.id,Mt),Q.register(Ft.id,Ft),Q.register(re.id,re),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function jr(e={}){Q.init(e),vs(),Q.injectStyles(),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}var uo=E(()=>{Ws();qs();Zs();ar();Lr();Nr();xs();nt();Ws();qs();Zs();ar();Lr();Nr();xs()});var wo={};N(wo,{ApiPresetPanel:()=>yt,RegexExtractPanel:()=>pt,SCRIPT_ID:()=>d,StatusBlockPanel:()=>Ft,SummaryToolPanel:()=>Mt,ToolManagePanel:()=>gt,default:()=>La,escapeHtml:()=>f,fillFormWithConfig:()=>Kt,getCurrentTab:()=>xo,getFormApiConfig:()=>Lt,getJQuery:()=>_,getRegexStyles:()=>bo,getStyles:()=>mo,getToolStyles:()=>ho,initUI:()=>jr,isContainerValid:()=>C,registerComponents:()=>vs,render:()=>po,renderRegex:()=>go,renderTool:()=>fo,setCurrentTab:()=>vo,showToast:()=>u,uiManager:()=>Q});function Ur(e,t){let s=_();return s?e?typeof e=="string"?s(e):e?.jquery?e:s(e):t:(console.error("[YouYouToolkit] jQuery not available"),null)}function po(e){if(Te=Ur(e,Te),!Te||!Te.length){console.error("[YouYouToolkit] Container not found or invalid");return}yt.renderTo(Te)}function go(e){if(Ee=Ur(e,Ee),!Ee||!Ee.length){console.error("[YouYouToolkit] Regex container not found");return}pt.renderTo(Ee)}function fo(e){if(Se=Ur(e,Se),!Se||!Se.length){console.error("[YouYouToolkit] Tool container not found");return}gt.renderTo(Se)}function mo(){return yt.getStyles()}function bo(){return pt.getStyles()}function ho(){return[gt.getStyles(),Mt.getStyles()].join(`
`)}function xo(){return Q.getCurrentTab()}function vo(e){Q.switchTab(e)}var Te,Ee,Se,La,To=E(()=>{uo();Te=null,Ee=null,Se=null;La={render:po,renderRegex:go,renderTool:fo,getStyles:mo,getRegexStyles:bo,getToolStyles:ho,getCurrentTab:xo,setCurrentTab:vo,uiManager:Q,ApiPresetPanel:yt,RegexExtractPanel:pt,ToolManagePanel:gt,SummaryToolPanel:Mt,StatusBlockPanel:Ft,registerComponents:vs,initUI:jr,SCRIPT_ID:d,escapeHtml:f,showToast:u,getJQuery:_,isContainerValid:C,getFormApiConfig:Lt,fillFormWithConfig:Kt}});var So={};N(So,{WindowManager:()=>ws,closeWindow:()=>za,createWindow:()=>Ua,windowManager:()=>Z});function ja(){if(Z.stylesInjected)return;Z.stylesInjected=!0;let e=`
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
  `,t=document.createElement("style");t.id=Na+"_styles",t.textContent=e,(document.head||document.documentElement).appendChild(t)}function Ua(e){let{id:t,title:s="\u7A97\u53E3",content:r="",width:n=900,height:o=700,modal:i=!1,resizable:a=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:y=!0,onClose:p,onReady:x}=e;ja();let g=window.jQuery||window.parent?.jQuery;if(!g)return console.error("[WindowManager] jQuery not available"),null;if(Z.isOpen(t))return Z.bringToFront(t),Z.getWindow(t);let S=window.innerWidth||1200,st=window.innerHeight||800,z=S<=1100,V=null,ie=!1;y&&(V=Z.getState(t),V&&!z&&(ie=!0));let xt,F;ie&&V.width&&V.height?(xt=Math.max(400,Math.min(V.width,S-40)),F=Math.max(300,Math.min(V.height,st-40))):(xt=Math.max(400,Math.min(n,S-40)),F=Math.max(300,Math.min(o,st-40)));let qr=Math.max(20,Math.min((S-xt)/2,S-xt-20)),Qr=Math.max(20,Math.min((st-F)/2,st-F-20)),Fo=l&&!z,Ho=`
    <div class="yyt-window" id="${t}" style="left:${qr}px; top:${Qr}px; width:${xt}px; height:${F}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${Ba(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${Fo?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
          <button class="yyt-window-btn close" title="\u5173\u95ED"><i class="fa-solid fa-times"></i></button>
        </div>
      </div>
      <div class="yyt-window-body">${r}</div>
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
  `,Rt=null;i&&(Rt=g(`<div class="yyt-window-overlay" data-for="${t}"></div>`),g(document.body).append(Rt));let T=g(Ho);g(document.body).append(T),Z.register(t,T),T.on("mousedown",()=>Z.bringToFront(t));let vt=!1,It={left:qr,top:Qr,width:xt,height:F},ke=()=>{It={left:parseInt(T.css("left")),top:parseInt(T.css("top")),width:T.width(),height:T.height()},T.addClass("maximized"),T.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),vt=!0},Wo=()=>{T.removeClass("maximized"),T.css({left:It.left+"px",top:It.top+"px",width:It.width+"px",height:It.height+"px"}),T.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),vt=!1};T.find(".yyt-window-btn.maximize").on("click",()=>{vt?Wo():ke()}),(z&&l||ie&&V.isMaximized&&l||c&&l)&&ke(),T.find(".yyt-window-btn.close").on("click",()=>{if(y&&l){let H={width:vt?It.width:T.width(),height:vt?It.height:T.height(),isMaximized:vt};Z.saveState(t,H)}p&&p(),Rt&&Rt.remove(),T.remove(),Z.unregister(t),g(document).off(".yytWindowDrag"+t),g(document).off(".yytWindowResize"+t)}),Rt&&Rt.on("click",H=>{H.target,Rt[0]});let Re=!1,Jr,Vr,Kr,Xr;if(T.find(".yyt-window-header").on("mousedown",H=>{g(H.target).closest(".yyt-window-controls").length||vt||(Re=!0,Jr=H.clientX,Vr=H.clientY,Kr=parseInt(T.css("left")),Xr=parseInt(T.css("top")),g(document.body).css("user-select","none"))}),g(document).on("mousemove.yytWindowDrag"+t,H=>{if(!Re)return;let W=H.clientX-Jr,Ie=H.clientY-Vr;T.css({left:Math.max(0,Kr+W)+"px",top:Math.max(0,Xr+Ie)+"px"})}),g(document).on("mouseup.yytWindowDrag"+t,()=>{Re&&(Re=!1,g(document.body).css("user-select",""))}),a){let H=!1,W="",Ie,Zr,De,Oe,$s,Ms;T.find(".yyt-window-resize-handle").on("mousedown",function(Ht){vt||(H=!0,W="",g(this).hasClass("se")?W="se":g(this).hasClass("e")?W="e":g(this).hasClass("s")?W="s":g(this).hasClass("w")?W="w":g(this).hasClass("n")?W="n":g(this).hasClass("nw")?W="nw":g(this).hasClass("ne")?W="ne":g(this).hasClass("sw")&&(W="sw"),Ie=Ht.clientX,Zr=Ht.clientY,De=T.width(),Oe=T.height(),$s=parseInt(T.css("left")),Ms=parseInt(T.css("top")),g(document.body).css("user-select","none"),Ht.stopPropagation())}),g(document).on("mousemove.yytWindowResize"+t,Ht=>{if(!H)return;let ks=Ht.clientX-Ie,Rs=Ht.clientY-Zr,tn=400,en=300,Is=De,Ds=Oe,sn=$s,rn=Ms;if(W.includes("e")&&(Is=Math.max(tn,De+ks)),W.includes("s")&&(Ds=Math.max(en,Oe+Rs)),W.includes("w")){let ae=De-ks;ae>=tn&&(Is=ae,sn=$s+ks)}if(W.includes("n")){let ae=Oe-Rs;ae>=en&&(Ds=ae,rn=Ms+Rs)}T.css({width:Is+"px",height:Ds+"px",left:sn+"px",top:rn+"px"})}),g(document).on("mouseup.yytWindowResize"+t,()=>{H&&(H=!1,g(document.body).css("user-select",""))})}return T.on("remove",()=>{g(document).off(".yytWindowDrag"+t),g(document).off(".yytWindowResize"+t)}),x&&setTimeout(()=>x(T),50),T}function za(e){let t=Z.getWindow(e);if(t){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${e}"]`).remove(),s(document).off(".yytWindowDrag"+e),s(document).off(".yytWindowResize"+e)),t.remove(),Z.unregister(e)}}function Ba(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}var Na,Eo,ws,Z,_o=E(()=>{Tt();Na="youyou_toolkit_window_manager",Eo="window_states",ws=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(t,s){this.topZIndex++,this.windows.set(t,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(t){this.windows.delete(t)}bringToFront(t){let s=this.windows.get(t);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(t){return this.windows.get(t)?.$el||null}isOpen(t){return this.windows.has(t)}closeAll(){this.windows.forEach((t,s)=>{t.$el&&t.$el.remove()}),this.windows.clear()}saveState(t,s){let r=this.loadStates();r[t]={...s,updatedAt:Date.now()},le.set(Eo,r)}loadStates(){return le.get(Eo)||{}}getState(t){return this.loadStates()[t]||null}},Z=new ws});var Ao={};N(Ao,{DEFAULT_PROMPT_SEGMENTS:()=>Ts,PromptEditor:()=>Es,default:()=>Ja,getPromptEditorStyles:()=>Ha,messagesToSegments:()=>Qa,segmentsToMessages:()=>qa,validatePromptSegments:()=>Wa});function Ha(){return`
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
  `}function Wa(e){let t=[];return Array.isArray(e)?(e.forEach((s,r)=>{s.id||t.push(`\u6BB5\u843D ${r+1} \u7F3A\u5C11ID`),s.role||t.push(`\u6BB5\u843D ${r+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(s.role)||t.push(`\u6BB5\u843D ${r+1} \u7684role\u503C\u65E0\u6548: ${s.role}`)}),{valid:t.length===0,errors:t}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function qa(e){return e.filter(t=>t.content&&t.content.trim()).map(t=>({role:t.role,content:t.content,deletable:t.deletable,mainSlot:t.mainSlot}))}function Qa(e){return Array.isArray(e)?e.map((t,s)=>({id:`segment_${s}_${Date.now()}`,type:t.role==="SYSTEM"?"system":t.role==="assistant"?"ai":"user",role:t.role,mainSlot:t.mainSlot||"",content:t.content||"",deletable:t.deletable!==!1,expanded:!0,isMain:t.mainSlot==="A"||t.isMain,isMain2:t.mainSlot==="B"||t.isMain2})):[...Ts]}var Ga,Ya,Fa,Ts,Es,Ja,Po=E(()=>{Ga="youyou_toolkit_prompt_editor",Ya={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},Fa={system:"fa-server",ai:"fa-robot",user:"fa-user"},Ts=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],Es=class{constructor(t={}){this.containerId=t.containerId||Ga,this.segments=t.segments||[...Ts],this.onChange=t.onChange||null,this.editable=t.editable!==!1,this.showMainSlot=t.showMainSlot!==!1,this.$container=null,this.$=null}init(t){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=t,this.render(),this.bindEvents()}setSegments(t){this.segments=t&&Array.isArray(t)?[...t]:[...Ts],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(t=>({...t,content:this.getSegmentContent(t.id)}))}getSegmentContent(t){return this.$container&&this.$container.find(`[data-segment-id="${t}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let t=`
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
    `;this.$container.html(t)}renderSegment(t){let s=Ya[t.type]||t.type,r=Fa[t.type]||"fa-file",n=t.mainSlot==="A"||t.isMain,o=t.mainSlot==="B"||t.isMain2,i=n?"var(--yyt-accent, #7bb7ff)":o?"#ffb74d":"",a=this.showMainSlot&&t.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${t.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${t.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${t.expanded?"yyt-expanded":""} ${n?"yyt-main-a":""} ${o?"yyt-main-b":""}" 
           data-segment-id="${t.id}" 
           data-segment-type="${t.type}"
           style="${i?`border-left: 3px solid ${i};`:""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${r}"></i>
            <span class="yyt-prompt-segment-title">${s}</span>
            <div class="yyt-prompt-segment-badges">
              ${l}
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
    `}bindEvents(){this.$container&&(this.$container.find(".yyt-prompt-toggle").on("click",t=>{this.$(t.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(t.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.find(".yyt-prompt-delete").on("click",t=>{let s=this.$(t.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.find(".yyt-prompt-role").on("change",t=>{let s=this.$(t.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),r=this.$(t.currentTarget).val();this.updateSegmentMeta(s,{role:r})}),this.$container.find(".yyt-prompt-main-slot").on("change",t=>{let s=this.$(t.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),r=this.$(t.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:r})}),this.$container.find(".yyt-prompt-textarea").on("input",t=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.find(`#${this.containerId}-add-segment`).on("click",()=>{this.addSegment()}),this.$container.find(`#${this.containerId}-import-prompt`).on("click",()=>{this.importPrompt()}),this.$container.find(`#${this.containerId}-export-prompt`).on("click",()=>{this.exportPrompt()}))}addSegment(t=null){let s=`segment_${Date.now()}`,r=t||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};r.id||(r.id=s),this.segments.push(r),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(t){let s=this.segments.findIndex(n=>n.id===t);if(s===-1)return;if(this.segments[s].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(t,s){let r=this.segments.find(n=>n.id===t);r&&(Object.assign(r,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let t=document.createElement("input");t.type="file",t.accept=".json",t.onchange=s=>{let r=s.target.files[0];if(!r)return;let n=new FileReader;n.onload=o=>{try{let i=JSON.parse(o.target.result);Array.isArray(i)?(this.setSegments(i),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(i){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",i)}},n.readAsText(r)},t.click()}exportPrompt(){let t=this.getSegments(),s=JSON.stringify(t,null,2),r=new Blob([s],{type:"application/json"}),n=URL.createObjectURL(r),o=document.createElement("a");o.href=n,o.download=`prompt_group_${Date.now()}.json`,o.click(),URL.revokeObjectURL(n),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}escapeHtml(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}};Ja=Es});var Br={};N(Br,{SettingsPanel:()=>$o,THEME_CONFIGS:()=>zr,applyTheme:()=>Co,default:()=>Va});function Co(e){let t=document.documentElement,s=zr[e]||zr["dark-blue"];Object.entries(s).forEach(([r,n])=>{t.style.setProperty(r,n)}),t.setAttribute("data-yyt-theme",e),e==="light"?t.style.setProperty("--yyt-text","rgba(15, 23, 42, 0.95)"):t.style.setProperty("--yyt-text","rgba(255, 255, 255, 0.95)")}var zr,$o,Va,Gr=E(()=>{B();as();nt();zr={"dark-blue":{"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.7)","--yyt-text-muted":"rgba(15, 23, 42, 0.45)","--yyt-surface":"rgba(0, 0, 0, 0.03)","--yyt-surface-hover":"rgba(0, 0, 0, 0.06)","--yyt-surface-active":"rgba(0, 0, 0, 0.08)","--yyt-border":"rgba(0, 0, 0, 0.08)","--yyt-border-strong":"rgba(0, 0, 0, 0.15)"}};$o={id:"settingsPanel",render(e){let t=Pt.getSettings();return`
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
    `},bindEvents(e,t){let s=_();!s||!C(e)||(e.find(".yyt-settings-tab").on("click",r=>{let n=s(r.currentTarget).data("tab");e.find(".yyt-settings-tab").removeClass("yyt-active"),s(r.currentTarget).addClass("yyt-active"),e.find(".yyt-settings-tab-content").removeClass("yyt-active"),e.find(`.yyt-settings-tab-content[data-tab="${n}"]`).addClass("yyt-active")}),e.find("#yyt-settings-save").on("click",()=>{this._saveSettings(e,s)}),e.find("#yyt-settings-reset").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(Pt.resetSettings(),this.renderTo(e),u("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}))},_saveSettings(e,t){let s={executor:{maxConcurrent:parseInt(e.find("#yyt-setting-maxConcurrent").val())||3,maxRetries:parseInt(e.find("#yyt-setting-maxRetries").val())||2,retryDelayMs:parseInt(e.find("#yyt-setting-retryDelayMs").val())||5e3,requestTimeoutMs:parseInt(e.find("#yyt-setting-requestTimeoutMs").val())||9e4,queueStrategy:e.find("#yyt-setting-queueStrategy").val()||"fifo"},listener:{listenGenerationEnded:e.find("#yyt-setting-listenGenerationEnded").is(":checked"),ignoreQuietGeneration:e.find("#yyt-setting-ignoreQuietGeneration").is(":checked"),ignoreAutoTrigger:e.find("#yyt-setting-ignoreAutoTrigger").is(":checked"),debounceMs:parseInt(e.find("#yyt-setting-debounceMs").val())||300},debug:{enableDebugLog:e.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:e.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:e.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:e.find("#yyt-setting-theme").val()||"dark-blue",compactMode:e.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:e.find("#yyt-setting-animationEnabled").is(":checked")}};Pt.saveSettings(s),Co(s.ui.theme),document.documentElement.classList.toggle("yyt-compact-mode",s.ui.compactMode),document.documentElement.classList.toggle("yyt-no-animation",!s.ui.animationEnabled),u("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},destroy(e){!_()||!C(e)||e.find("*").off()},getStyles(){return`
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
    `},renderTo(e){let t=this.render({});e.html(t),this.bindEvents(e,{})}},Va=$o});var L="youyou_toolkit",Hr="0.6.2",_e=`${L}-menu-item`,Yr=`${L}-menu-container`,Ka=`${L}-popup`,D=typeof window.parent<"u"?window.parent:window,Ss=null,ct=null,Ae=null,Y=null,ko=null,Ps=null,Ro=null,Pe=null,Ce=null,tt=null,X=null,$e=null,Io=null,Do=null,Oo=null,Lo=null,_s=null;async function ne(){try{return Ss=await Promise.resolve().then(()=>(de(),ln)),ct=await Promise.resolve().then(()=>(Le(),yn)),Ae=await Promise.resolve().then(()=>(ze(),un)),Y=await Promise.resolve().then(()=>(To(),wo)),ko=await Promise.resolve().then(()=>(Xe(),An)),Ps=await Promise.resolve().then(()=>(ir(),Pn)),Ro=await Promise.resolve().then(()=>(hr(),qn)),Pe=await Promise.resolve().then(()=>(Dr(),co)),Ce=await Promise.resolve().then(()=>(_o(),So)),tt=await Promise.resolve().then(()=>(he(),Gn)),X=await Promise.resolve().then(()=>(Po(),Ao)),$e=await Promise.resolve().then(()=>(as(),Qn)),Io=await Promise.resolve().then(()=>(xe(),Yn)),Do=await Promise.resolve().then(()=>(Tr(),Xn)),Oo=await Promise.resolve().then(()=>(wr(),Vn)),Lo=await Promise.resolve().then(()=>(Er(),to)),_s=await Promise.resolve().then(()=>(Sr(),eo)),_s?.toolOutputService&&ct&&_s.toolOutputService.setApiConnection(ct),!0}catch(e){return console.warn(`[${L}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,e),!1}}function U(...e){console.log(`[${L}]`,...e)}function No(...e){console.error(`[${L}]`,...e)}function Mo(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}async function Xa(){let e=`${L}-styles`,t=D.document||document;if(t.getElementById(e))return;let s="";try{let n=await fetch("./styles/main.css");n.ok&&(s=await n.text())}catch{U("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F")}s||(s=Za());let r=t.createElement("style");r.id=e,r.textContent=s,(t.head||t.documentElement).appendChild(r),U("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function Za(){return`
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
    #${Yr} { display: flex; align-items: center; }
    
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
  `}var A=null,kt=null,oe="apiPresets",Cs={};function As(){A&&(A.remove(),A=null),kt&&(kt.remove(),kt=null),U("\u5F39\u7A97\u5DF2\u5173\u95ED")}function jo(e){oe=e;let t=D.jQuery||window.jQuery;if(!t||!A)return;t(A).find(".yyt-main-nav-item").removeClass("active"),t(A).find(`.yyt-main-nav-item[data-tab="${e}"]`).addClass("active");let s=tt?.getToolConfig(e);s?.hasSubTabs?(t(A).find(".yyt-sub-nav").show(),zo(e,s.subTabs)):t(A).find(".yyt-sub-nav").hide(),t(A).find(".yyt-tab-content").removeClass("active"),t(A).find(`.yyt-tab-content[data-tab="${e}"]`).addClass("active"),Bo(e)}function Uo(e,t){Cs[e]=t;let s=D.jQuery||window.jQuery;!s||!A||(s(A).find(".yyt-sub-nav-item").removeClass("active"),s(A).find(`.yyt-sub-nav-item[data-subtab="${t}"]`).addClass("active"),Wr(e,t))}function zo(e,t){let s=D.jQuery||window.jQuery;if(!s||!A||!t)return;let r=Cs[e]||t[0]?.id,n=t.map(o=>`
    <div class="yyt-sub-nav-item ${o.id===r?"active":""}" data-subtab="${o.id}">
      <i class="fa-solid ${o.icon||"fa-file"}"></i>
      <span>${o.name}</span>
    </div>
  `).join("");s(A).find(".yyt-sub-nav").html(n),s(A).find(".yyt-sub-nav-item").on("click",function(){let o=s(this).data("subtab");Uo(e,o)})}async function Bo(e){let t=D.jQuery||window.jQuery;if(!t||!A)return;let s=t(A).find(`.yyt-tab-content[data-tab="${e}"]`);if(!s.length)return;let r=tt?.getToolConfig(e);switch(e){case"apiPresets":Y&&Y.render(s);break;case"regexExtract":Y&&Y.renderRegex(s);break;case"tools":if(r?.hasSubTabs&&r.subTabs?.length>0){let n=Cs[e]||r.subTabs[0].id;Wr(e,n)}else s.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":await tl(s);break;case"settings":await el(s);break;default:sl(e,s);break}}async function tl(e){if(D.jQuery||window.jQuery)try{let{BypassPanel:s}=await Promise.resolve().then(()=>(xs(),yo)),r=`${L}-bypass-styles`,n=D.document||document;if(!n.getElementById(r)&&s.getStyles){let o=n.createElement("style");o.id=r,o.textContent=s.getStyles(),(n.head||n.documentElement).appendChild(o)}s.renderTo(e)}catch(s){console.error(`[${L}] \u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,s),e.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}async function el(e){if(D.jQuery||window.jQuery)try{let{SettingsPanel:s}=await Promise.resolve().then(()=>(Gr(),Br)),r=`${L}-settings-styles`,n=D.document||document;if(!n.getElementById(r)&&s.getStyles){let o=n.createElement("style");o.id=r,o.textContent=s.getStyles(),(n.head||n.documentElement).appendChild(o)}s.renderTo(e)}catch(s){console.error(`[${L}] \u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,s),e.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function Wr(e,t){let s=D.jQuery||window.jQuery;if(!s||!A)return;let r=s(A).find(`.yyt-tab-content[data-tab="${e}"]`);if(!r.length)return;let n=tt?.getToolConfig(e);if(n?.hasSubTabs){let i=n.subTabs?.find(a=>a.id===t);if(i){let a=r.find(".yyt-sub-content");switch(a.length||(r.html('<div class="yyt-sub-content"></div>'),a=r.find(".yyt-sub-content")),i.component){case"SummaryToolPanel":Y?.SummaryToolPanel?Y.SummaryToolPanel.renderTo(a):a.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"StatusBlockPanel":Y?.StatusBlockPanel?Y.StatusBlockPanel.renderTo(a):a.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:a.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}return}let o=r.find(".yyt-sub-content");if(o.length)switch(t){case"config":rl(e,o);break;case"prompts":nl(e,o);break;case"presets":ol(e,o);break;default:o.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}function sl(e,t){if(!(D.jQuery||window.jQuery))return;let r=tt?.getToolConfig(e);if(!r){t.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let n=Cs[e]||r.subTabs?.[0]?.id||"config";t.html(`
    <div class="yyt-tool-window">
      <div class="yyt-sub-content" data-subtab="${n}">
        <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
      </div>
    </div>
  `),Wr(e,n)}function rl(e,t){if(!(D.jQuery||window.jQuery))return;let r=Ps?.getTool(e),n=Ae?.getAllPresets()||[],o=tt?.getToolApiPreset(e)||"",i=n.map(a=>`<option value="${Mo(a.name)}" ${a.name===o?"selected":""}>${Mo(a.name)}</option>`).join("");t.html(`
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
            <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${r?.config?.execution?.timeout||6e4}">
          </div>
          <div class="yyt-form-group yyt-flex-1">
            <label>\u91CD\u8BD5\u6B21\u6570</label>
            <input type="number" class="yyt-input" id="yyt-tool-retries" value="${r?.config?.execution?.retries||3}">
          </div>
        </div>
      </div>
    </div>
  `),t.find("#yyt-save-tool-preset").on("click",function(){let a=t.find("#yyt-tool-api-preset").val();tt?.setToolApiPreset(e,a);let l=D.toastr;l&&l.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}function nl(e,t){if(!(D.jQuery||window.jQuery)||!X){t.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let n=Ps?.getTool(e)?.config?.messages||[],o=X.messagesToSegments?X.messagesToSegments(n):X.DEFAULT_PROMPT_SEGMENTS,i=new X.PromptEditor({containerId:`yyt-prompt-editor-${e}`,segments:o,onChange:l=>{let c=X.segmentsToMessages?X.segmentsToMessages(l):[];U("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",c.length,"\u6761\u6D88\u606F")}});t.html(`<div id="yyt-prompt-editor-${e}" class="yyt-prompt-editor-container"></div>`),i.init(t.find(`#yyt-prompt-editor-${e}`));let a=X.getPromptEditorStyles?X.getPromptEditorStyles():"";if(a){let l="yyt-prompt-editor-styles";if(!document.getElementById(l)){let c=document.createElement("style");c.id=l,c.textContent=a,document.head.appendChild(c)}}}function ol(e,t){(D.jQuery||window.jQuery)&&t.html(`
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
  `)}function Go(){if(A){U("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let e=D.jQuery||window.jQuery,t=D.document||document;if(!e){No("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let s=tt?.getToolList()||[];kt=t.createElement("div"),kt.className="yyt-popup-overlay",kt.addEventListener("click",l=>{l.target===kt&&As()}),t.body.appendChild(kt);let r=s.map(l=>`
    <div class="yyt-main-nav-item ${l.id===oe?"active":""}" data-tab="${l.id}">
      <i class="fa-solid ${l.icon}"></i>
      <span>${l.name}</span>
    </div>
  `).join(""),n=s.map(l=>`
    <div class="yyt-tab-content ${l.id===oe?"active":""}" data-tab="${l.id}">
      <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
    </div>
  `).join(""),o=`
    <div class="yyt-popup" id="${Ka}">
      <div class="yyt-popup-header">
        <div class="yyt-popup-title">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span>YouYou \u5DE5\u5177\u7BB1</span>
          <span style="font-size: 12px; opacity: 0.6;">v${Hr}</span>
        </div>
        <button class="yyt-popup-close" title="\u5173\u95ED">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      
      <div class="yyt-popup-body">
        <div class="yyt-main-nav">
          ${r}
        </div>
        
        <div class="yyt-sub-nav" style="display: none;">
          <!-- \u6B21\u7EA7\u9876\u680F\u5C06\u52A8\u6001\u6E32\u67D3 -->
        </div>
        
        <div class="yyt-content">
          ${n}
        </div>
      </div>
      
      <div class="yyt-popup-footer">
        <button class="yyt-btn yyt-btn-secondary" id="${L}-close-btn">\u5173\u95ED</button>
      </div>
    </div>
  `,i=t.createElement("div");i.innerHTML=o,A=i.firstElementChild,t.body.appendChild(A),e(A).find(".yyt-popup-close").on("click",As),e(A).find(`#${L}-close-btn`).on("click",As),e(A).find(".yyt-main-nav-item").on("click",function(){let l=e(this).data("tab");l&&jo(l)}),Bo(oe);let a=tt?.getToolConfig(oe);a?.hasSubTabs&&(e(A).find(".yyt-sub-nav").show(),zo(oe,a.subTabs)),U("\u5F39\u7A97\u5DF2\u6253\u5F00")}function Me(){let e=D.jQuery||window.jQuery;if(!e){No("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(Me,1e3);return}let t=D.document||document,s=e("#extensionsMenu",t);if(!s.length){U("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(Me,2e3);return}if(e(`#${Yr}`,s).length>0){U("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let n=e(`<div class="extension_container interactable" id="${Yr}" tabindex="0"></div>`),o=`
    <div class="list-group-item flex-container flexGap5 interactable" id="${_e}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
      <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
      <span>YouYou \u5DE5\u5177\u7BB1</span>
    </div>
  `,i=e(o);i.on("click",async function(a){a.stopPropagation(),U("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let l=e("#extensionsMenuButton",t);l.length&&s.is(":visible")&&l.trigger("click"),Go()}),n.append(i),s.append(n),U("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}var Fr={version:Hr,id:L,init:Yo,openPopup:Go,closePopup:As,switchMainTab:jo,switchSubTab:Uo,addMenuItem:Me,getStorage:()=>Ss,getApiConnection:()=>ct,getPresetManager:()=>Ae,getUiComponents:()=>Y,getRegexExtractor:()=>ko,getToolManager:()=>Ps,getToolExecutor:()=>Ro,getToolTrigger:()=>Pe,getWindowManager:()=>Ce,getToolRegistry:()=>tt,getPromptEditor:()=>X,getSettingsService:()=>$e,getBypassManager:()=>Io,getVariableResolver:()=>Do,getContextInjector:()=>Oo,getToolPromptService:()=>Lo,getToolOutputService:()=>_s,async getApiConfig(){return await ne(),Ss?Ss.loadSettings().apiConfig:null},async saveApiConfig(e){return await ne(),ct?(ct.updateApiConfig(e),!0):!1},async getPresets(){return await ne(),Ae?Ae.getAllPresets():[]},async sendApiRequest(e,t){if(await ne(),ct)return ct.sendApiRequest(e,t);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await ne(),ct?ct.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(e,t){return tt?.registerTool(e,t)||!1},unregisterTool(e){return tt?.unregisterTool(e)||!1},getToolList(){return tt?.getToolList()||[]},createWindow(e){return Ce?.createWindow(e)||null},closeWindow(e){Ce?.closeWindow(e)}};async function Yo(){if(U(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${Hr}`),await Xa(),await ne()){if(U("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),Pe&&Pe.initTriggerModule)try{Pe.initTriggerModule(),U("\u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316")}catch(r){console.error(`[${L}] \u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,r)}let s=D.document||document;if(Y){let r=`${L}-ui-styles`;if(!s.getElementById(r)){let i=s.createElement("style");i.id=r,i.textContent=Y.getStyles(),(s.head||s.documentElement).appendChild(i)}let n=`${L}-regex-styles`;if(!s.getElementById(n)&&Y.getRegexStyles){let i=s.createElement("style");i.id=n,i.textContent=Y.getRegexStyles(),(s.head||s.documentElement).appendChild(i)}let o=`${L}-tool-styles`;if(!s.getElementById(o)&&Y.getToolStyles){let i=s.createElement("style");i.id=o,i.textContent=Y.getToolStyles(),(s.head||s.documentElement).appendChild(i)}}if(Ce){let r=`${L}-window-styles`;s.getElementById(r)}if(X&&X.getPromptEditorStyles){let r=`${L}-prompt-styles`;if(!s.getElementById(r)){let n=s.createElement("style");n.id=r,n.textContent=X.getPromptEditorStyles(),(s.head||s.documentElement).appendChild(n)}}try{let{applyTheme:r}=await Promise.resolve().then(()=>(Gr(),Br));if($e&&$e.settingsService){let n=$e.settingsService.getUiSettings();n&&n.theme&&(r(n.theme),U(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${n.theme}`),n.compactMode&&document.documentElement.classList.add("yyt-compact-mode"),n.animationEnabled||document.documentElement.classList.add("yyt-no-animation"))}}catch(r){U("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",r)}}else U("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let t=D.document||document;t.readyState==="loading"?t.addEventListener("DOMContentLoaded",()=>{setTimeout(Me,1e3)}):setTimeout(Me,1e3),U("\u521D\u59CB\u5316\u5B8C\u6210")}if(typeof window<"u"&&(window.YouYouToolkit=Fr,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=Fr}catch{}var Jc=Fr;Yo();U("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210");export{Jc as default};
