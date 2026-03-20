var si=Object.defineProperty;var T=(t,e)=>()=>(t&&(e=t(t=0)),e);var N=(t,e)=>{for(var s in e)si(t,s,{get:e[s],enumerable:!0})};function dn(){let t=m;return t._getStorage(),t._storage}function R(){return m.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function Q(t){m.set("settings",t)}var Te,m,P,cn,pt,Ee=T(()=>{Te=class t{constructor(e="youyou_toolkit"){this.namespace=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespace]||(s.extensionSettings[this.namespace]={}),this._storage={_target:s.extensionSettings[this.namespace],getItem:r=>{let n=s.extensionSettings[this.namespace][r];return typeof n=="string"?n:n?JSON.stringify(n):null},setItem:(r,n)=>{s.extensionSettings[this.namespace][r]=n,this._saveSettings(s)},removeItem:r=>{delete s.extensionSettings[this.namespace][r],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespace}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,s)=>{try{localStorage.setItem(e,s)}catch(r){console.error(`[${this.namespace}] localStorage\u5199\u5165\u5931\u8D25:`,r)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,s=null){let r=`${this.namespace}:${e}`;if(this._cache.has(r))return this._cache.get(r);let n=this._getStorage(),o=this._getFullKey(e),i=n.getItem(o);if(i===null)return s;try{let a=JSON.parse(i);return this._cache.set(r,a),a}catch{return i}}set(e,s){let r=this._getStorage(),n=this._getFullKey(e),o=`${this.namespace}:${e}`;this._cache.set(o,s);try{r.setItem(n,JSON.stringify(s))}catch(i){console.error(`[${this.namespace}] \u5B58\u50A8\u5931\u8D25:`,i)}}remove(e){let s=this._getStorage(),r=this._getFullKey(e),n=`${this.namespace}:${e}`;this._cache.delete(n),s.removeItem(r)}has(e){let s=this._getStorage(),r=this._getFullKey(e);return s.getItem(r)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let r=s.SillyTavern.getContext();r?.extensionSettings?.[this.namespace]&&(r.extensionSettings[this.namespace]={},this._saveSettings(r))}}else{let s=`${this.namespace}_`,r=[];for(let n=0;n<localStorage.length;n++){let o=localStorage.key(n);o&&o.startsWith(s)&&r.push(o)}r.forEach(n=>localStorage.removeItem(n))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespace}_${e}`}namespace(e){return new t(`${this.namespace}:${e}`)}getMultiple(e){let s={};return e.forEach(r=>{s[r]=this.get(r)}),s}setMultiple(e){Object.entries(e).forEach(([s,r])=>{this.set(s,r)})}exportAll(){let e=this._getStorage(),s={};if(e._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let o=r.SillyTavern.getContext()?.extensionSettings?.[this.namespace]||{};Object.entries(o).forEach(([i,a])=>{s[i]=typeof a=="string"?JSON.parse(a):a})}}else{let r=`${this.namespace}_`;for(let n=0;n<localStorage.length;n++){let o=localStorage.key(n);if(o&&o.startsWith(r)){let i=o.slice(r.length);try{s[i]=JSON.parse(localStorage.getItem(o))}catch{s[i]=localStorage.getItem(o)}}}}return s}},m=new Te("youyou_toolkit"),P=new Te("youyou_toolkit:tools"),cn=new Te("youyou_toolkit:presets"),pt=new Te("youyou_toolkit:windows")});var un={};N(un,{DEFAULT_API_PRESETS:()=>ni,DEFAULT_SETTINGS:()=>ri,STORAGE_KEYS:()=>gt,StorageService:()=>Te,deepMerge:()=>yn,getCurrentPresetName:()=>Se,getStorage:()=>dn,loadApiPresets:()=>U,loadSettings:()=>R,presetStorage:()=>cn,saveApiPresets:()=>ue,saveSettings:()=>Q,setCurrentPresetName:()=>Ke,storage:()=>m,toolStorage:()=>P,windowStorage:()=>pt});function U(){return m.get(gt.API_PRESETS)||[]}function ue(t){m.set(gt.API_PRESETS,t)}function Se(){return m.get(gt.CURRENT_PRESET)||""}function Ke(t){m.set(gt.CURRENT_PRESET,t||"")}function yn(t,e){let s=n=>n&&typeof n=="object"&&!Array.isArray(n),r={...t};return s(t)&&s(e)&&Object.keys(e).forEach(n=>{s(e[n])?n in t?r[n]=yn(t[n],e[n]):Object.assign(r,{[n]:e[n]}):Object.assign(r,{[n]:e[n]})}),r}var gt,ri,ni,ft=T(()=>{Ee();Ee();gt={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},ri={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},ni=[]});var mn={};N(mn,{API_STATUS:()=>oi,fetchAvailableModels:()=>Fs,getApiConfig:()=>_e,getEffectiveApiConfig:()=>mt,hasEffectiveApiPreset:()=>Ys,sendApiRequest:()=>Gs,sendWithPreset:()=>ii,testApiConnection:()=>yi,updateApiConfig:()=>Xe,validateApiConfig:()=>Ze});function Bs(t,e={}){let s=new Error(t);return s.allowDirectFallback=e.allowDirectFallback===!0,s}function pn(t,e="chat_completions"){let s=String(t||"").trim();if(!s)return"";let r=null;try{r=new URL(s)}catch{return s}let n=r.pathname.replace(/\/+$/,""),o=n;return e==="chat_completions"?!/\/chat\/completions$/i.test(n)&&!/\/completions$/i.test(n)&&(o=`${n||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(n)?o=n.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(n)?o=n.replace(/\/completions$/i,"/models"):/\/models$/i.test(n)||(o=`${n||""}/models`)),r.pathname=o.replace(/\/+/g,"/"),r.toString()}function _e(){return R().apiConfig||{}}function Xe(t){let e=R();e.apiConfig={...e.apiConfig,...t},Q(e)}function Ze(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function mt(t=""){let e=R(),s=t||Se()||"";if(s){let n=(U()||[]).find(o=>o.name===s);if(n&&n.apiConfig)return{...n.apiConfig,presetName:n.name}}return e.apiConfig||{}}function Ys(t=""){return t?(U()||[]).some(s=>s?.name===t):!1}async function ii(t,e,s={},r=null){let n=mt(t);return await Gs(e,{...s,apiConfig:n},r)}function gn(t,e={}){let s=e.apiConfig||_e();return{messages:t,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:!1,...e.extraParams}}function fn(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function Gs(t,e={},s=null){let r=e.apiConfig||_e(),n=r.useMainApi,o=Ze(r);if(!o.valid&&!n)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${o.errors.join(", ")}`);return n?await ai(t,e,s):await li(t,r,e,s)}async function ai(t,e,s){let r=typeof window.parent<"u"?window.parent:window;if(!r.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let n=await r.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,...e.extraParams});if(typeof n!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return n.trim()}catch(n){throw n.name==="AbortError"?n:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${n.message}`)}}async function li(t,e,s,r){let n=typeof window.parent<"u"?window.parent:window;if(n.SillyTavern?.getRequestHeaders)try{return await ci(t,e,s,r,n)}catch(o){if(!o?.allowDirectFallback)throw o}return await di(t,e,s,r)}async function ci(t,e,s,r,n){let o=String(e.url||"").trim(),i={...gn(t,{apiConfig:e,...s}),chat_completion_source:"custom",reverse_proxy:o,proxy_password:"",custom_url:o,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},a={...typeof n.SillyTavern?.getRequestHeaders=="function"?n.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:a,body:JSON.stringify(i),signal:r})}catch(p){throw p?.name==="AbortError"?p:Bs(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${p.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let p=[404,405,501,502].includes(l.status);throw Bs(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:p})}let y=null;try{y=c?JSON.parse(c):{}}catch{let b=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw Bs(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${b||"(\u7A7A\u54CD\u5E94)"}`)}return fn(y)}async function di(t,e,s,r){let n=gn(t,{apiConfig:e,...s}),o=pn(e.url,"chat_completions"),i={"Content-Type":"application/json"};e.apiKey&&(i.Authorization=`Bearer ${e.apiKey}`);let a=await fetch(o,{method:"POST",headers:i,body:JSON.stringify(n),signal:r}),l=await a.text().catch(()=>"");if(!a.ok){let y=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${a.status}): ${y}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let p=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${p||"(\u7A7A\u54CD\u5E94)"}`)}return fn(c)}async function yi(t=null){let e=t||_e(),s=Date.now();try{await Gs([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let n=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${n}ms)`,latency:n}}catch(r){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${r.message}`,latency:Date.now()-s}}}async function Fs(t=null){let e=t||_e();return e.useMainApi?await ui():await pi(e)}async function ui(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function pi(t){if(!t.url||!t.apiKey)return[];try{let e=pn(t.url,"models"),s=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!s.ok)return[];let r=await s.json();return r.data&&Array.isArray(r.data)?r.data.map(n=>n.id||n.name).filter(Boolean).sort():[]}catch{return[]}}var oi,Yt=T(()=>{ft();oi={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var bn={};N(bn,{createPreset:()=>Gt,createPresetFromCurrentConfig:()=>bi,deletePreset:()=>Ft,duplicatePreset:()=>mi,exportPresets:()=>Js,generateUniquePresetName:()=>Ks,getActiveConfig:()=>Qs,getActivePresetName:()=>Ht,getAllPresets:()=>et,getPreset:()=>je,getPresetNames:()=>gi,getStarredPresets:()=>qs,importPresets:()=>Vs,presetExists:()=>bt,renamePreset:()=>fi,switchToPreset:()=>Ue,togglePresetStar:()=>Ws,updatePreset:()=>Hs,validatePreset:()=>hi});function et(){return U()}function gi(){return U().map(e=>e.name)}function je(t){return!t||typeof t!="string"?null:U().find(s=>s.name===t)||null}function bt(t){return!t||typeof t!="string"?!1:U().some(s=>s.name===t)}function Gt(t){let{name:e,description:s,apiConfig:r}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let n=e.trim();if(bt(n))return{success:!1,message:`\u9884\u8BBE "${n}" \u5DF2\u5B58\u5728`};let o={name:n,description:s||"",apiConfig:{url:r?.url||"",apiKey:r?.apiKey||"",model:r?.model||"",useMainApi:r?.useMainApi??!0,max_tokens:r?.max_tokens||4096,temperature:r?.temperature??.7,top_p:r?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},i=U();return i.push(o),ue(i),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:o}}function Hs(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=U(),r=s.findIndex(i=>i.name===t);if(r===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let n=s[r],o={...n,...e,name:n.name,updatedAt:Date.now()};return e.apiConfig&&(o.apiConfig={...n.apiConfig,...e.apiConfig}),s[r]=o,ue(s),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:o}}function Ft(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=U(),s=e.findIndex(r=>r.name===t);return s===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(s,1),ue(e),Se()===t&&Ke(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function fi(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(!bt(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(bt(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let r=U(),n=r.find(o=>o.name===t);return n&&(n.name=s,n.updatedAt=Date.now(),ue(r),Se()===t&&Ke(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function mi(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim(),r=je(t);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(bt(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(r)),name:s,createdAt:Date.now(),updatedAt:Date.now()},o=U();return o.push(n),ue(o),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:n}}function Ws(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=U(),s=e.find(r=>r.name===t);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),ue(e),{success:!0,message:s.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function qs(){return U().filter(e=>e.starred===!0)}function Ue(t){if(!t)return Ke(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=je(t);return e?(Ke(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Ht(){return Se()}function Qs(){let t=Se();if(t){let s=je(t);if(s)return{presetName:t,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:R().apiConfig||{}}}function Js(t=null){if(t){let s=je(t);if(!s)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let e=U();return JSON.stringify(e,null,2)}function Vs(t,e={overwrite:!1}){let s;try{s=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let r=Array.isArray(s)?s:[s];if(r.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let n=U(),o=0;for(let i of r){if(!i.name||typeof i.name!="string"||!i.apiConfig||typeof i.apiConfig!="object")continue;let a=n.findIndex(l=>l.name===i.name);a>=0?e.overwrite&&(i.updatedAt=Date.now(),n[a]=i,o++):(i.createdAt=i.createdAt||Date.now(),i.updatedAt=Date.now(),n.push(i),o++)}return o>0&&ue(n),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${o} \u4E2A\u9884\u8BBE`,imported:o}}function bi(t,e=""){let s=R();return Gt({name:t,description:e,apiConfig:s.apiConfig})}function hi(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function Ks(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=U(),s=new Set(e.map(n=>n.name));if(!s.has(t))return t;let r=1;for(;s.has(`${t} (${r})`);)r++;return`${t} (${r})`}var Wt=T(()=>{ft()});var h,Xs,x,G=T(()=>{h={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",TOOL_TRIGGER_INITIALIZED:"tool:triggerInitialized",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",TRIGGER_REGISTERED:"trigger:registered",TRIGGER_UNREGISTERED:"trigger:unregistered",TRIGGER_FIRED:"trigger:fired",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_EXECUTION_REQUESTED:"tool:executionRequested",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},Xs=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,s,r={}){if(!e||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:n=0}=r;this.listeners.has(e)||this.listeners.set(e,new Set);let o={callback:s,priority:n};return this.listeners.get(e).add(o),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,s)}off(e,s){let r=this.listeners.get(e);if(r){for(let n of r)if(n.callback===s){r.delete(n);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,s),this._addToHistory(e,s);let r=this.listeners.get(e);if(!r||r.size===0)return;let n=Array.from(r).sort((o,i)=>i.priority-o.priority);for(let{callback:o}of n)try{o(s)}catch(i){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,i)}}once(e,s){let r=n=>{this.off(e,r),s(n)};return this.on(e,r)}wait(e,s=0){return new Promise((r,n)=>{let o=null,i=this.once(e,a=>{o&&clearTimeout(o),r(a)});s>0&&(o=setTimeout(()=>{i(),n(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},s))})}hasListeners(e){let s=this.listeners.get(e);return s&&s.size>0}listenerCount(e){let s=this.listeners.get(e);return s?s.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,s){this.history.push({event:e,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(s=>s.event===e):[...this.history]}clearHistory(){this.history=[]}},x=new Xs});function f(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function u(t,e,s=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let r=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(r.toastr){r.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}xi(t,e,s),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${t.toUpperCase()}] ${e}`)}function ne(t,e,s={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:r=3500,sticky:n=!1,noticeId:o=""}=s,i=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!i?.body){u(t,e,r);return}let a="yyt-top-notice-container",l="yyt-top-notice-styles",c=i.getElementById(a);if(c||(c=i.createElement("div"),c.id=a,c.style.cssText=`
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
    `,i.body.appendChild(c)),!i.getElementById(l)){let M=i.createElement("style");M.id=l,M.textContent=`
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
    `,i.head.appendChild(M)}if(o){let M=c.querySelector(`[data-notice-id="${o}"]`);M&&M.remove()}let y={success:"\u2713",error:"!",warning:"\u2022",info:"i"},p=i.createElement("div");p.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,o&&(p.dataset.noticeId=o);let b=i.createElement("span");b.className="yyt-top-notice__icon",b.textContent=y[t]||y.info;let g=i.createElement("div");g.className="yyt-top-notice__content",g.textContent=e;let S=i.createElement("button");S.className="yyt-top-notice__close",S.type="button",S.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),S.textContent="\xD7";let te=()=>{p.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>p.remove(),180)};S.addEventListener("click",te),p.appendChild(b),p.appendChild(g),p.appendChild(S),c.appendChild(p),n||setTimeout(te,r)}function xi(t,e,s){let r=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!r)return;let n=r.getElementById("yyt-fallback-toast");n&&n.remove();let o={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},i=o[t]||o.info,a=r.createElement("div");if(a.id="yyt-fallback-toast",a.style.cssText=`
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
  `,a.textContent=e,!r.getElementById("yyt-toast-styles")){let l=r.createElement("style");l.id="yyt-toast-styles",l.textContent=`
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `,r.head.appendChild(l)}r.body.appendChild(a),setTimeout(()=>{a.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{a.remove()},300)},s)}function _(){if(tt)return tt;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return tt=window.parent.jQuery,tt}catch{}return window.jQuery&&(tt=window.jQuery),tt}function C(t){return t&&t.length>0}function ze(t,e=d){if(!_()||!C(t))return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let r=t.find(`#${e}-model`).val()?.trim()||"",n=t.find(`#${e}-model-select`);return n.is(":visible")&&(r=n.val()||r),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:r,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function st(t,e,s=d){if(!_()||!C(t)||!e)return;t.find(`#${s}-api-url`).val(e.url||""),t.find(`#${s}-api-key`).val(e.apiKey||""),t.find(`#${s}-model`).val(e.model||""),t.find(`#${s}-max-tokens`).val(e.max_tokens||4096),t.find(`#${s}-temperature`).val(e.temperature??.7),t.find(`#${s}-top-p`).val(e.top_p??.9);let n=e.useMainApi??!0;t.find(`#${s}-use-main-api`).prop("checked",n);let i=t.find(`#${s}-custom-api-fields`);n?i.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):i.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${s}-model`).show(),t.find(`#${s}-model-select`).hide()}function hn(t){let{id:e,title:s,body:r,width:n="380px",wide:o=!1}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${o?"yyt-dialog-wide":""}" style="${n!=="380px"?`width: ${n};`:""} max-height: calc(100vh - 32px);">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${s}</span>
          <button class="yyt-dialog-close" id="${e}-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body" style="overflow-y: auto; overflow-x: hidden; max-height: calc(100vh - 160px);">
          ${r}
        </div>
        <div class="yyt-dialog-footer">
          <button class="yyt-btn yyt-btn-secondary" id="${e}-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${e}-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `}function xn(t,e,s={}){if(!_())return()=>{};let n=t.find(`#${e}-overlay`),o=()=>{n.remove(),s.onClose&&s.onClose()};return n.find(`#${e}-close, #${e}-cancel`).on("click",o),n.on("click",function(i){i.target===this&&o()}),n.find(`#${e}-save`).on("click",function(){s.onSave&&s.onSave(o)}),o}function Ae(t,e){let s=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(s),n=document.createElement("a");n.href=r,n.download=e,n.click(),URL.revokeObjectURL(r)}function Pe(t){return new Promise((e,s)=>{let r=new FileReader;r.onload=n=>e(n.target.result),r.onerror=n=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),r.readAsText(t)})}var d,tt,oe=T(()=>{d="youyou_toolkit";tt=null});var qt,F,Zs=T(()=>{G();oe();qt=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,x.emit(h.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(e,s){return!e||!s?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,s,r={}){let n=_();if(!n){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let o=this.components.get(e);if(!o){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);return}let i;if(typeof s=="string"?i=n(s):s&&s.jquery?i=s:s&&(i=n(s)),!C(i)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}this.destroyInstance(e);let a=o.render({...r,dependencies:this.dependencies});i.html(a),o.bindEvents(i,this.dependencies),this.activeInstances.set(e,{container:i,component:o,props:r}),x.emit(h.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let s=this.activeInstances.get(e);s&&(s.component.destroy(s.container),this.activeInstances.delete(e))}switchTab(e){let s=this.currentTab;this.currentTab=e,x.emit(h.UI_TAB_CHANGED,{tabId:e,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(e,s){this.currentSubTab[e]=s,x.emit(h.UI_SUBTAB_CHANGED,{mainTab:e,subTab:s})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((s,r)=>{s.getStyles&&(e+=s.getStyles())}),e}injectStyles(){let e="yyt-component-styles";if(document.getElementById(e))return;let s=document.createElement("style");s.id=e,s.textContent=this.getAllStyles(),document.head.appendChild(s)}setDependency(e,s){this.dependencies[e]=s}getDependency(e){return this.dependencies[e]}_subscribeEvents(){x.on(h.PRESET_UPDATED,()=>{}),x.on(h.TOOL_UPDATED,()=>{})}},F=new qt});function Qt(t){return String(t||"").trim()}var ie,pe,er=T(()=>{G();oe();Yt();Wt();ie=null;pe={id:"apiPresetPanel",render(t){let e=Qs(),s=e?.apiConfig||_e(),r=Qt(e?.presetName||Ht()),n=et(),a=qs().slice(0,8),l=a.length>0?a.map(p=>this._renderPresetItem(p)).join(""):"",c=ie===null?r||"":Qt(ie),y=c||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
    `},_renderPresetItem(t){return`
      <div class="yyt-preset-item" data-preset-name="${f(t.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${f(t.name)}</div>
          <div class="yyt-preset-meta">
            ${t.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${f(t.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
    `},_renderSelectOption(t,e){let s=t.starred===!0,r=s?"yyt-option-star yyt-starred":"yyt-option-star",n=s?"\u2605":"\u2606";return`
      <div class="yyt-select-option ${t.name===e?"yyt-selected":""}" data-value="${f(t.name)}">
        <button class="${r}" data-preset="${f(t.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${n}</button>
        <span class="yyt-option-text">${f(t.name)}</span>
      </div>
    `},_renderApiConfigForm(t){return`
      <div class="yyt-form-group">
        <div class="yyt-toggle-row">
          <div class="yyt-toggle-label">
            <span>\u4F7F\u7528SillyTavern\u4E3BAPI</span>
            <span class="yyt-toggle-hint">\u542F\u7528\u540E\u5C06\u4F7F\u7528SillyTavern\u5185\u7F6E\u7684API\u914D\u7F6E</span>
          </div>
          <label class="yyt-toggle">
            <input type="checkbox" id="${d}-use-main-api" ${t.useMainApi?"checked":""}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div id="${d}-custom-api-fields" class="${t.useMainApi?"yyt-disabled":""}">
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API URL</label>
            <input type="text" class="yyt-input" id="${d}-api-url" 
                   value="${f(t.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${d}-api-key" 
                     value="${f(t.apiKey||"")}" 
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
                     value="${f(t.model||"")}" 
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
                   value="${t.max_tokens||4096}" min="1" max="128000">
          </div>
          
          <div class="yyt-form-group">
            <label>Temperature</label>
            <input type="number" class="yyt-input" id="${d}-temperature" 
                   value="${t.temperature??.7}" min="0" max="2" step="0.1">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>Top P</label>
            <input type="number" class="yyt-input" id="${d}-top-p" 
                   value="${t.top_p??.9}" min="0" max="1" step="0.1">
          </div>
        </div>
      </div>
    `},bindEvents(t,e){let s=_();!s||!C(t)||(this._bindDropdownEvents(t,s),this._bindPresetListEvents(t,s),this._bindApiConfigEvents(t,s),this._bindFileEvents(t,s))},_bindDropdownEvents(t,e){let s=t.find(`#${d}-preset-dropdown`),r=s.find(".yyt-select-trigger"),n=s.find(".yyt-select-value"),o=()=>{let i=String(n.data("value")||"").trim();if(!i){ie="",Ue(""),st(t,_e(),d),t.find(".yyt-preset-item").removeClass("yyt-loaded"),u("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let a=je(i);if(!a){u("error",`\u9884\u8BBE "${i}" \u4E0D\u5B58\u5728`);return}ie=i,Ue(i),st(t,a.apiConfig,d),t.find(".yyt-preset-item").removeClass("yyt-loaded"),t.find(`.yyt-preset-item[data-preset-name="${i.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),u("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${i}"\uFF0C\u4FEE\u6539\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u914D\u7F6E\u201D\u4F1A\u8986\u76D6\u8BE5\u9884\u8BBE`)};r.on("click",function(i){i.stopPropagation(),s.toggleClass("yyt-open")}),s.find(".yyt-select-option").on("click",i=>{if(e(i.target).hasClass("yyt-option-star"))return;let a=e(i.currentTarget),l=a.data("value"),c=a.find(".yyt-option-text").text();ie=String(l||"").trim(),n.text(c).data("value",l),s.find(".yyt-select-option").removeClass("yyt-selected"),a.addClass("yyt-selected"),s.removeClass("yyt-open")}),t.find(`#${d}-load-preset`).on("click",()=>{o()}),s.find(".yyt-option-star").on("click",i=>{i.preventDefault(),i.stopPropagation();let a=e(i.currentTarget).data("preset");if(!a)return;let l=Ws(a);if(l.success){u("success",l.message);let c=t.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}else u("error",l.message)}),e(document).on("click.yyt-dropdown",i=>{e(i.target).closest(s).length||s.removeClass("yyt-open")})},_bindPresetListEvents(t,e){t.find(".yyt-preset-item").on("click",s=>{let n=e(s.currentTarget).data("preset-name"),o=e(s.target).closest("[data-action]").data("action");if(o)switch(s.stopPropagation(),o){case"load":t.find(".yyt-select-value").text(n).data("value",n),t.find(".yyt-select-option").removeClass("yyt-selected"),t.find(`.yyt-select-option[data-value="${n.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),t.find(`#${d}-load-preset`).trigger("click");break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${n}" \u5417\uFF1F`)){let i=Ft(n);if(u(i.success?"info":"error",i.message),i.success){Qt(ie)===n&&(ie=null);let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}}break}})},_bindApiConfigEvents(t,e){t.find(`#${d}-use-main-api`).on("change",function(){let s=e(this).is(":checked"),r=t.find(`#${d}-custom-api-fields`);s?r.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):r.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),t.find(`#${d}-toggle-key-visibility`).on("click",function(){let s=t.find(`#${d}-api-key`),r=s.attr("type");s.attr("type",r==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),t.find(`#${d}-load-models`).on("click",async()=>{let s=t.find(`#${d}-load-models`),r=t.find(`#${d}-model`),n=t.find(`#${d}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let o=ze(t,d),i=await Fs(o);if(i.length>0){n.empty(),i.forEach(l=>{n.append(`<option value="${f(l)}">${f(l)}</option>`)}),r.hide(),n.show();let a=r.val();a&&i.includes(a)&&n.val(a),n.off("change").on("change",function(){r.val(e(this).val())}),u("success",`\u5DF2\u52A0\u8F7D ${i.length} \u4E2A\u6A21\u578B`)}else u("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(o){u("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${o.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${d}-model`).on("focus",function(){let s=t.find(`#${d}-model-select`);e(this).show(),s.hide()}),t.find(`#${d}-save-api-config`).on("click",()=>{let s=ze(t,d),r=Qt(Ht()),n=Ze(s);if(!n.valid&&!s.useMainApi){u("error",n.errors.join(", "));return}if(r){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${r}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230\u201C\u5F53\u524D\u914D\u7F6E\u201D`)){Xe(s),Ue(""),ie="",u("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");let i=t.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i);return}Xe(s);let o=Hs(r,{apiConfig:s});if(o.success){ie=r,u("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${r}"`),Ue(r),x.emit(h.PRESET_UPDATED,{name:r});let i=t.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}else u("error",o.message);return}Xe(s),u("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),t.find(`#${d}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){Ue(""),ie="",Xe({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9});let s=t.closest(".yyt-api-manager").parent();s.length&&this.renderTo(s),u("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),t.find(`#${d}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(t,e)})},_bindFileEvents(t,e){t.find(`#${d}-export-presets`).on("click",()=>{try{let s=Js();Ae(s,`youyou_toolkit_presets_${Date.now()}.json`),u("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){u("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${d}-import-presets`).on("click",()=>{t.find(`#${d}-import-file`).click()}),t.find(`#${d}-import-file`).on("change",async s=>{let r=s.target.files[0];if(r){try{let n=await Pe(r),o=Vs(n,{overwrite:!0});if(u(o.success?"success":"error",o.message),o.imported>0){let i=t.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}}catch(n){u("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}e(s.target).val("")}})},_showSavePresetDialog(t,e){let r=et().map(y=>y.name),n=Ks("\u65B0\u9884\u8BBE"),o=`
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
    `;e(`#${d}-dialog-overlay`).remove(),t.append(o);let i=e(`#${d}-dialog-overlay`),a=e(`#${d}-dialog-preset-name`),l=e(`#${d}-dialog-preset-desc`);a.focus().select();let c=()=>i.remove();i.find(`#${d}-dialog-close, #${d}-dialog-cancel`).on("click",c),i.on("click",function(y){y.target===this&&c()}),i.find(`#${d}-dialog-save`).on("click",()=>{let y=a.val().trim(),p=l.val().trim();if(!y){u("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),a.focus();return}if(r.includes(y)){if(!confirm(`\u9884\u8BBE "${y}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;Ft(y)}let b=ze(t,d),g=Gt({name:y,description:p,apiConfig:b});if(g.success){u("success",g.message),c(),x.emit(h.PRESET_CREATED,{preset:g.preset});let S=t.closest(".yyt-api-manager").parent();S.length&&this.renderTo(S)}else u("error",g.message)}),a.on("keypress",function(y){y.which===13&&i.find(`#${d}-dialog-save`).click()})},destroy(t){let e=_();!e||!C(t)||(t.find("*").off(),e(document).off("click.yyt-dropdown"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var kn={};N(kn,{MESSAGE_MACROS:()=>Mn,addTagRule:()=>rt,createRuleTemplate:()=>_n,default:()=>wi,deleteRulePreset:()=>Cn,deleteRuleTemplate:()=>Pn,deleteTagRule:()=>ht,escapeRegex:()=>Be,exportRulesConfig:()=>ss,extractComplexTag:()=>wn,extractCurlyBraceTag:()=>nr,extractHtmlFormatTag:()=>Tn,extractSimpleTag:()=>rr,extractTagContent:()=>Ye,generateTagSuggestions:()=>Kt,getAllRulePresets:()=>es,getAllRuleTemplates:()=>En,getContentBlacklist:()=>Ge,getRuleTemplate:()=>Sn,getTagRules:()=>ge,importRulesConfig:()=>rs,isValidTagName:()=>sr,loadRulePreset:()=>ts,saveRulesAsPreset:()=>Zt,scanTextForTags:()=>Vt,setContentBlacklist:()=>xt,setTagRules:()=>Xt,shouldSkipContent:()=>tr,testRegex:()=>$n,updateRuleTemplate:()=>An,updateTagRule:()=>nt});function Jt(){let t=R();return H=t.ruleTemplates||[...vn],I=t.tagRules||[],K=t.contentBlacklist||[],{ruleTemplates:H,tagRules:I,contentBlacklist:K}}function Be(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function tr(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let s=t.toLowerCase();return e.some(r=>{let n=r.trim().toLowerCase();return n&&s.includes(n)})}function sr(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!vi.includes(t.toLowerCase())}function rr(t,e){if(!t||!e)return[];let s=[],r=Be(e),n=new RegExp(`<${r}>([\\s\\S]*?)<\\/${r}>`,"gi");[...t.matchAll(n)].forEach(l=>{l[1]&&s.push(l[1].trim())});let i=(t.match(new RegExp(`<${r}>`,"gi"))||[]).length,a=(t.match(new RegExp(`<\\/${r}>`,"gi"))||[]).length;return i>a&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${i-a} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),s}function nr(t,e){if(!t||!e)return[];let s=[],r=Be(e),n=new RegExp(`\\{${r}\\|`,"gi"),o;for(;(o=n.exec(t))!==null;){let i=o.index,a=i+o[0].length,l=1,c=a;for(;c<t.length&&l>0;)t[c]==="{"?l++:t[c]==="}"&&l--,c++;if(l===0){let y=t.substring(a,c-1);y.trim()&&s.push(y.trim())}n.lastIndex=i+1}return s}function wn(t,e){if(!t||!e)return[];let s=e.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let r=s[0].trim(),n=s[1].trim(),o=n.match(/<\/(\w+)>/);if(!o)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${n}`),[];let i=o[1],a=new RegExp(`${Be(r)}([\\s\\S]*?)<\\/${i}>`,"gi"),l=[];return[...t.matchAll(a)].forEach(y=>{y[1]&&l.push(y[1].trim())}),l}function Tn(t,e){if(!t||!e)return[];let s=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let r=s[1],n=[],o=new RegExp(`<${r}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${r}>`,"gi");[...t.matchAll(o)].forEach(c=>{c[1]&&n.push(c[1].trim())});let a=(t.match(new RegExp(`<${r}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${r}>`,"gi"))||[]).length;return a>l&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${a-l} \u4E2A\u672A\u95ED\u5408\u7684 <${r}> \u6807\u7B7E`),n}function Ye(t,e,s=[]){if(!t)return"";if(!e||e.length===0)return t;let r=e.filter(y=>y.type==="exclude"&&y.enabled),n=e.filter(y=>(y.type==="include"||y.type==="regex_include")&&y.enabled),o=e.filter(y=>y.type==="regex_exclude"&&y.enabled),i=t;for(let y of r)try{let p=new RegExp(`<${Be(y.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Be(y.value)}>`,"gi");i=i.replace(p,"")}catch(p){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:y,error:p})}let a=[];if(n.length>0)for(let y of n){let p=[];try{if(y.type==="include")p.push(...rr(i,y.value)),p.push(...nr(i,y.value));else if(y.type==="regex_include"){let b=new RegExp(y.value,"gi");[...i.matchAll(b)].forEach(S=>{S[1]&&p.push(S[1])})}}catch(b){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:y,error:b})}p.forEach(b=>a.push(b.trim()))}else a.push(i);let l=[];for(let y of a){for(let p of o)try{let b=new RegExp(p.value,"gi");y=y.replace(b,"")}catch(b){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:p,error:b})}tr(y,s)||l.push(y)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function Vt(t,e={}){let s=performance.now(),{chunkSize:r=5e4,maxTags:n=100,timeoutMs:o=5e3}=e,i=new Set,a=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let p=0;p<t.length;p+=r){let b=t.slice(p,Math.min(p+r,t.length));if(c++,l+=b.length,performance.now()-s>o){console.warn(`[YouYouToolkit] Tag scanning timed out after ${o}ms`);break}let g;for(;(g=a.exec(b))!==null&&i.size<n;){let S=(g[1]||g[2]).toLowerCase();sr(S)&&i.add(S)}if(i.size>=n)break;c%5===0&&await new Promise(S=>setTimeout(S,0))}let y=performance.now();return{tags:Array.from(i).sort(),stats:{processingTimeMs:Math.round(y-s),processedChars:l,totalChars:t.length,chunkCount:c,tagsFound:i.size}}}function Kt(t,e=25){let s=t.tags.slice(0,e);return{suggestions:s,stats:{totalFound:t.stats.tagsFound,finalCount:s.length}}}function En(){return H.length===0&&Jt(),H}function Sn(t){return H.find(e=>e.id===t)}function _n(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return H.push(e),or(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function An(t,e){let s=H.findIndex(r=>r.id===t);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(H[s]={...H[s],...e,updatedAt:new Date().toISOString()},or(),{success:!0,template:H[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function Pn(t){let e=H.findIndex(s=>s.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(H.splice(e,1),or(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function or(){let t=R();t.ruleTemplates=H,Q(t)}function ge(){return I||Jt(),I}function Xt(t){I=t||[];let e=R();e.tagRules=I,Q(e)}function rt(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};I.push(e);let s=R();return s.tagRules=I,Q(s),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function nt(t,e){if(t<0||t>=I.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};I[t]={...I[t],...e};let s=R();return s.tagRules=I,Q(s),{success:!0,rule:I[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function ht(t){if(t<0||t>=I.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};I.splice(t,1);let e=R();return e.tagRules=I,Q(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Ge(){return K||Jt(),K}function xt(t){K=t||[];let e=R();e.contentBlacklist=K,Q(e)}function Zt(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=R();s.tagRulePresets||(s.tagRulePresets={});let r=`preset-${Date.now()}`;return s.tagRulePresets[r]={id:r,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(I)),blacklist:JSON.parse(JSON.stringify(K)),createdAt:new Date().toISOString()},Q(s),{success:!0,preset:s.tagRulePresets[r],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function es(){let e=R().tagRulePresets||{};return Object.values(e)}function ts(t){let e=R(),r=(e.tagRulePresets||{})[t];return r?(I=JSON.parse(JSON.stringify(r.rules||[])),K=JSON.parse(JSON.stringify(r.blacklist||[])),e.tagRules=I,e.contentBlacklist=K,Q(e),{success:!0,preset:r,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Cn(t){let e=R(),s=e.tagRulePresets||{};return s[t]?(delete s[t],e.tagRulePresets=s,Q(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function ss(){return JSON.stringify({tagRules:I,contentBlacklist:K,ruleTemplates:H,tagRulePresets:R().tagRulePresets||{}},null,2)}function rs(t,e={overwrite:!0}){try{let s=JSON.parse(t);if(e.overwrite)I=s.tagRules||[],K=s.contentBlacklist||[],H=s.ruleTemplates||vn;else if(s.tagRules&&I.push(...s.tagRules),s.contentBlacklist){let n=new Set(K.map(o=>o.toLowerCase()));s.contentBlacklist.forEach(o=>{n.has(o.toLowerCase())||K.push(o)})}let r=R();return r.tagRules=I,r.contentBlacklist=K,r.ruleTemplates=H,s.tagRulePresets&&(r.tagRulePresets={...r.tagRulePresets||{},...s.tagRulePresets}),Q(r),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function $n(t,e,s="g",r=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let n=new RegExp(t,s),o=[];if(s.includes("g")){let i;for(;(i=n.exec(e))!==null;)i.length>1?o.push({fullMatch:i[0],groups:i.slice(1),index:i.index,extracted:i[r]||i[1]||i[0]}):o.push({fullMatch:i[0],groups:[],index:i.index,extracted:i[0]})}else{let i=n.exec(e);i&&o.push({fullMatch:i[0],groups:i.length>1?i.slice(1):[],index:i.index,extracted:i.length>1?i[r]||i[1]:i[0]})}return{success:!0,matches:o,count:o.length,extracted:o.map(i=>i.extracted)}}catch(n){return{success:!1,error:n.message,matches:[]}}}var vi,vn,H,I,K,Mn,wi,ns=T(()=>{ft();vi=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],vn=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],H=[],I=[],K=[];Mn={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};Jt();wi={extractTagContent:Ye,extractSimpleTag:rr,extractCurlyBraceTag:nr,extractComplexTag:wn,extractHtmlFormatTag:Tn,escapeRegex:Be,shouldSkipContent:tr,isValidTagName:sr,scanTextForTags:Vt,generateTagSuggestions:Kt,getAllRuleTemplates:En,getRuleTemplate:Sn,createRuleTemplate:_n,updateRuleTemplate:An,deleteRuleTemplate:Pn,getTagRules:ge,setTagRules:Xt,addTagRule:rt,updateTagRule:nt,deleteTagRule:ht,getContentBlacklist:Ge,setContentBlacklist:xt,saveRulesAsPreset:Zt,getAllRulePresets:es,loadRulePreset:ts,deleteRulePreset:Cn,exportRulesConfig:ss,importRulesConfig:rs,testRegex:$n,MESSAGE_MACROS:Mn}});var fe,ir=T(()=>{G();oe();ns();fe={id:"regexExtractPanel",render(t){let e=ge(),s=Ge(),r=es();return`
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
    `},_renderRulesEditor(t,e,s){let r=t.length>0?t.map((o,i)=>this._renderRuleItem(o,i)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',n=s.length>0?s.map(o=>`<option value="${o.id}">${f(o.name)}</option>`).join(""):"";return`
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
                 value="${f(e.join(", "))}" 
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
               value="${f(t.value||"")}">
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
    `},bindEvents(t,e){let s=_();!s||!C(t)||(this._bindRuleEditorEvents(t,s),this._bindPresetEvents(t,s),this._bindTestEvents(t,s),this._bindFileEvents(t,s))},_bindRuleEditorEvents(t,e){t.find(".yyt-rule-type").on("change",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),n=e(this).val();nt(r,{type:n}),u("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),t.find(".yyt-rule-value").on("change",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),n=e(this).val().trim();nt(r,{value:n})}),t.find(".yyt-rule-enabled").on("change",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),n=e(this).is(":checked");nt(r,{enabled:n}),u("info",n?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),t.find(".yyt-rule-delete").on("click",()=>{let r=t.find(".yyt-rule-delete").closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(ht(r),this.renderTo(t),u("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.on("click",".yyt-rule-delete",s=>{let n=e(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(ht(n),this.renderTo(t),u("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.find(`#${d}-add-rule`).on("click",()=>{rt({type:"include",value:"",enabled:!0}),this.renderTo(t),u("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),t.find(`#${d}-scan-tags`).on("click",async()=>{let s=t.find(`#${d}-scan-tags`),r=t.find(`#${d}-test-input`).val();if(!r||!r.trim()){u("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let n=await Vt(r,{maxTags:50,timeoutMs:3e3}),{suggestions:o,stats:i}=Kt(n,25);if(o.length===0){u("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),t.find(`#${d}-tag-suggestions-container`).hide();return}let a=t.find(`#${d}-tag-list`);t.find(`#${d}-tag-scan-stats`).text(`${i.finalCount}/${i.totalFound} \u4E2A\u6807\u7B7E, ${n.stats.processingTimeMs}ms`),a.empty(),o.forEach(c=>{let y=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${f(c)}</button>`);y.on("click",()=>{if(ge().some(g=>g.type==="include"&&g.value===c)){u("warning",`\u89C4\u5219 "\u5305\u542B: ${c}" \u5DF2\u5B58\u5728`);return}rt({type:"include",value:c,enabled:!0}),this.renderTo(t),u("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${c}"`)}),a.append(y)}),t.find(`#${d}-tag-suggestions-container`).show(),u("success",`\u53D1\u73B0 ${o.length} \u4E2A\u6807\u7B7E`)}catch(n){u("error",`\u626B\u63CF\u5931\u8D25: ${n.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${d}-add-exclude-cot`).on("click",()=>{let s=ge(),r="<!--[\\s\\S]*?-->";if(s.some(o=>o.type==="regex_exclude"&&o.value===r)){u("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}rt({type:"regex_exclude",value:r,enabled:!0}),this.renderTo(t),u("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),t.find(`#${d}-content-blacklist`).on("change",function(){let r=e(this).val().split(",").map(n=>n.trim()).filter(n=>n);xt(r),u("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${r.length} \u4E2A\u5173\u952E\u8BCD`)}),t.find(`#${d}-show-examples`).on("click",()=>{alert(`
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
      `)})},_bindPresetEvents(t,e){t.find(`#${d}-load-rule-preset`).on("click",()=>{let s=t.find(`#${d}-rule-preset-select`).val();if(!s){u("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let r=ts(s);r.success?(this.renderTo(t),u("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${r.preset.name}`),x.emit(h.REGEX_PRESET_LOADED,{preset:r.preset})):u("error",r.message)}),t.find(`#${d}-save-rule-preset`).on("click",()=>{let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let r=Zt(s.trim());r.success?(this.renderTo(t),u("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):u("error",r.message)})},_bindTestEvents(t,e){t.find(`#${d}-test-extract`).on("click",()=>{let s=t.find(`#${d}-test-input`).val();if(!s||!s.trim()){u("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let r=ge(),n=Ge(),o=Ye(s,r,n),i=t.find(`#${d}-test-result-container`),a=t.find(`#${d}-test-result`);i.show(),!o||!o.trim()?(a.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),u("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(a.html(`<pre class="yyt-code-block">${f(o)}</pre>`),u("success","\u63D0\u53D6\u5B8C\u6210"),x.emit(h.REGEX_EXTRACTED,{result:o}))}),t.find(`#${d}-test-clear`).on("click",()=>{t.find(`#${d}-test-input`).val(""),t.find(`#${d}-test-result-container`).hide()})},_bindFileEvents(t,e){t.find(`#${d}-import-rules`).on("click",()=>{t.find(`#${d}-import-rules-file`).click()}),t.find(`#${d}-import-rules-file`).on("change",async s=>{let r=s.target.files[0];if(r){try{let n=await Pe(r),o=rs(n,{overwrite:!0});o.success?(this.renderTo(t),u("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):u("error",o.message)}catch(n){u("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}e(s.target).val("")}}),t.find(`#${d}-export-rules`).on("click",()=>{try{let s=ss();Ae(s,`youyou_toolkit_rules_${Date.now()}.json`),u("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){u("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${d}-reset-rules`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(Xt([]),xt([]),this.renderTo(t),u("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(t){!_()||!C(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Rn={};N(Rn,{DEFAULT_TOOL_PRESETS:()=>ae,DEFAULT_TOOL_STRUCTURE:()=>ar,TOOL_STORAGE_KEYS:()=>k,cloneTool:()=>Ei,deleteTool:()=>Ti,deleteToolPreset:()=>Ai,exportTools:()=>dr,getAllToolPresets:()=>cr,getAllTools:()=>Fe,getCurrentToolPresetId:()=>Pi,getTool:()=>vt,getToolPreset:()=>Si,importTools:()=>yr,resetTools:()=>ur,saveTool:()=>os,saveToolPreset:()=>_i,setCurrentToolPreset:()=>Ci,setToolEnabled:()=>lr,validateTool:()=>$i});function Fe(){let t=P.get(k.TOOLS);return t&&typeof t=="object"?{...ae,...t}:{...ae}}function vt(t){return Fe()[t]||null}function os(t,e){if(!t||!e)return!1;let s=P.get(k.TOOLS)||{},r=!s[t]&&!ae[t],n={...ar,...e,id:t,metadata:{...ar.metadata,...e.metadata,updatedAt:new Date().toISOString()}};return s[t]||(n.metadata.createdAt=new Date().toISOString()),s[t]=n,P.set(k.TOOLS,s),x.emit(r?h.TOOL_REGISTERED:h.TOOL_UPDATED,{toolId:t,tool:n}),!0}function Ti(t){if(ae[t])return!1;let e=P.get(k.TOOLS)||{};return e[t]?(delete e[t],P.set(k.TOOLS,e),x.emit(h.TOOL_UNREGISTERED,{toolId:t}),!0):!1}function lr(t,e){let s=vt(t);if(!s)return!1;let r=P.get(k.TOOLS)||{};return r[t]||(r[t]={...s}),r[t].enabled=e,r[t].metadata={...r[t].metadata,updatedAt:new Date().toISOString()},P.set(k.TOOLS,r),x.emit(e?h.TOOL_ENABLED:h.TOOL_DISABLED,{toolId:t}),!0}function Ei(t,e,s){let r=vt(t);if(!r)return!1;let n=JSON.parse(JSON.stringify(r));return n.name=s||`${r.name} (\u526F\u672C)`,n.metadata={...n.metadata,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},os(e,n)}function cr(){let t=P.get(k.PRESETS);return t&&typeof t=="object"?{...ae,...t}:{...ae}}function Si(t){return cr()[t]||null}function _i(t,e){if(!t||!e)return!1;let s=P.get(k.PRESETS)||{};return s[t]={...e,metadata:{...e.metadata,updatedAt:new Date().toISOString()}},P.set(k.PRESETS,s),!0}function Ai(t){if(ae[t])return!1;let e=P.get(k.PRESETS)||{};return e[t]?(delete e[t],P.set(k.PRESETS,e),!0):!1}function Pi(){return P.get(k.CURRENT_PRESET)||null}function Ci(t){return cr()[t]?(P.set(k.CURRENT_PRESET,t),!0):!1}function dr(){let t=P.get(k.TOOLS)||{},e=P.get(k.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function yr(t,e=!1){try{let s=typeof e=="object"?!!e?.overwrite:!!e,r=JSON.parse(t);if(!r||typeof r!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let n=s?{}:P.get(k.TOOLS)||{},o=s?{}:P.get(k.PRESETS)||{},i=0,a=0;if(r.tools&&typeof r.tools=="object"){for(let[l,c]of Object.entries(r.tools))ae[l]&&!s||c&&typeof c=="object"&&(n[l]=c,i++);P.set(k.TOOLS,n)}if(r.presets&&typeof r.presets=="object"){for(let[l,c]of Object.entries(r.presets))ae[l]&&!s||c&&typeof c=="object"&&(o[l]=c,a++);P.set(k.PRESETS,o)}return{success:!0,toolsImported:i,presetsImported:a,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u5DE5\u5177\u548C ${a} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function ur(){P.remove(k.TOOLS),P.remove(k.PRESETS),P.remove(k.CURRENT_PRESET)}function $i(t){let e=[];if(!t)return{valid:!1,errors:["\u5DE5\u5177\u5B9A\u4E49\u4E3A\u7A7A"]};if((!t.name||typeof t.name!="string")&&e.push("\u5DE5\u5177\u540D\u79F0\u65E0\u6548"),(!t.category||typeof t.category!="string")&&e.push("\u5DE5\u5177\u5206\u7C7B\u65E0\u6548"),t.config){let{trigger:s,execution:r,api:n,context:o}=t.config;s&&!["manual","event","scheduled"].includes(s.type)&&e.push("\u89E6\u53D1\u7C7B\u578B\u65E0\u6548"),r&&((typeof r.timeout!="number"||r.timeout<0)&&e.push("\u8D85\u65F6\u65F6\u95F4\u5FC5\u987B\u4E3A\u6B63\u6570"),(typeof r.retries!="number"||r.retries<0)&&e.push("\u91CD\u8BD5\u6B21\u6570\u5FC5\u987B\u4E3A\u6B63\u6570")),o&&typeof o.depth!="number"&&e.push("\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u5FC5\u987B\u4E3A\u6570\u5B57")}return{valid:e.length===0,errors:e}}var ar,ae,k,is=T(()=>{Ee();G();ar={id:"",name:"",description:"",category:"utility",config:{trigger:{type:"manual",events:[]},execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!0,bypassPreset:"standard"},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},ae={},k={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"}});var me,pr=T(()=>{oe();is();me={id:"toolManagePanel",render(t){let e=Fe();return`
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
    `},_renderToolList(t){return Object.entries(t).map(([e,s])=>`
      <div class="yyt-tool-item ${s.enabled?"yyt-enabled":"yyt-disabled"}" data-tool-id="${e}">
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
    `).join("")},bindEvents(t,e){let s=_();!s||!C(t)||(this._bindToolEvents(t,s),this._bindFileEvents(t,s))},_bindToolEvents(t,e){t.find(".yyt-tool-toggle input").on("change",s=>{let r=e(s.currentTarget).closest(".yyt-tool-item"),n=r.data("tool-id"),o=e(s.currentTarget).is(":checked");lr(n,o),r.toggleClass("yyt-enabled",o).toggleClass("yyt-disabled",!o),u("info",o?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.find("#yyt-add-tool").on("click",()=>{this._showToolEditDialog(t,e,null)})},_bindFileEvents(t,e){t.find("#yyt-import-tools").on("click",()=>{t.find("#yyt-import-tools-file").click()}),t.find("#yyt-import-tools-file").on("change",async s=>{let r=s.target.files[0];if(r){try{let n=await Pe(r),o=yr(n,{overwrite:!1});u(o.success?"success":"error",o.message),o.success&&this.renderTo(t)}catch(n){u("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}e(s.target).val("")}}),t.find("#yyt-export-tools").on("click",()=>{try{let s=dr();Ae(s,`youyou_toolkit_tools_${Date.now()}.json`),u("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){u("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find("#yyt-reset-tools").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(ur(),this.renderTo(t),u("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,s){let r=s?vt(s):null,n=!!r,o=`
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
    `;e("#yyt-tool-dialog-overlay").remove(),t.append(o);let i=e("#yyt-tool-dialog-overlay"),a=()=>i.remove();i.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",a),i.on("click",function(l){l.target===this&&a()}),i.find("#yyt-tool-dialog-save").on("click",()=>{let l=e("#yyt-tool-name").val().trim(),c=e("#yyt-tool-category").val(),y=e("#yyt-tool-desc").val().trim(),p=parseInt(e("#yyt-tool-timeout").val())||6e4,b=parseInt(e("#yyt-tool-retries").val())||3;if(!l){u("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let g=s||`tool_${Date.now()}`;os(g,{name:l,category:c,description:y,config:{trigger:{type:"manual",events:[]},execution:{timeout:p,retries:b},api:{preset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0}),a(),this.renderTo(t),u("success",n?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA")})},destroy(t){!_()||!C(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Qn={};N(Qn,{TOOL_CATEGORIES:()=>In,TOOL_REGISTRY:()=>ot,clearToolApiPreset:()=>Yn,default:()=>Oi,getAllDefaultToolConfigs:()=>ls,getAllToolApiBindings:()=>Gn,getAllToolFullConfigs:()=>hr,getEnabledTools:()=>cs,getToolApiPreset:()=>mr,getToolConfig:()=>as,getToolFullConfig:()=>j,getToolList:()=>jn,getToolSubTabs:()=>Un,getToolWindowState:()=>qn,hasTool:()=>fr,onPresetDeleted:()=>Fn,registerTool:()=>Ln,resetToolConfig:()=>Hn,resetToolRegistry:()=>zn,saveToolConfig:()=>be,saveToolWindowState:()=>Wn,setToolApiPreset:()=>Bn,setToolApiPresetConfig:()=>Ri,setToolBypassConfig:()=>Ii,setToolOutputMode:()=>ki,setToolPromptTemplate:()=>Di,unregisterTool:()=>Nn,updateToolRuntime:()=>br});function Dn(){let t=Fe()||{};return Object.entries(t).filter(([e])=>!Tt[e]).map(([e,s])=>[e,s||{}])}function On(){let t=Array.isArray(ot.tools?.subTabs)?[...ot.tools.subTabs]:[],e=Dn().map(([s,r],n)=>({id:s,name:r.name||s,icon:r.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(r.order)?r.order:100+n,isCustom:!0,description:r.description||""}));return[...t,...e].sort((s,r)=>(s.order??0)-(r.order??0))}function Mi(t,e={}){let s=Array.isArray(e?.extractTags)?e.extractTags.map(r=>String(r||"").trim()).filter(Boolean):[];return{id:t,name:e.name||t,icon:e.icon||"fa-screwdriver-wrench",description:e.description||"",enabled:e.enabled!==!1,order:Number.isFinite(e.order)?e.order:100,trigger:{event:"GENERATION_ENDED",enabled:!1},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:e?.config?.api?.preset||"",overwrite:!0,enabled:!1},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(e?.config?.context?.depth,10)||5),selectors:s},promptTemplate:typeof e?.promptTemplate=="string"?e.promptTemplate:`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:e?.config?.api?.preset||"",extractTags:s,isCustom:!0,category:e.category||"utility",metadata:{...e.metadata||{}}}}function Ln(t,e){if(!t||typeof t!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let r of s)if(!e[r])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${r}`),!1;return le[t]={id:t,...e,order:e.order??Object.keys(le).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function Nn(t){return le[t]?(delete le[t],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function jn(t=!0){let e=Object.values(le).map(s=>s.id==="tools"?{...s,subTabs:On()}:s);return t?e.sort((s,r)=>(s.order??0)-(r.order??0)):e}function as(t){return t==="tools"&&le[t]?{...le[t],subTabs:On()}:le[t]||null}function fr(t){return!!le[t]}function Un(t){let e=as(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function zn(){le={...ot},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Bn(t,e){if(!fr(t))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let s=m.get(ce)||{};return s[t]=e||"",m.set(ce,s),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function mr(t){return(m.get(ce)||{})[t]||""}function Yn(t){let e=m.get(ce)||{};delete e[t],m.set(ce,e),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function Gn(){return m.get(ce)||{}}function Fn(t){let e=m.get(ce)||{},s=!1;for(let r in e)e[r]===t&&(e[r]="",s=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${r}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&m.set(ce,e)}function j(t){let e=Tt[t],r=(Fe()||{})[t]||null,n=e||(r?Mi(t,r):null);if(!n)return as(t);let i=(m.get(wt)||{})[t]||{},a=mr(t),l={...n,...i,id:t};l.trigger={...n.trigger||{},...i.trigger||{}},l.output={...n.output||{},...i.output||{}},l.bypass={...n.bypass||{},...i.bypass||{}},l.runtime={...n.runtime||{},...i.runtime||{}},l.extraction={...n.extraction||{},...i.extraction||{}};let c=l.output?.apiPreset||l.apiPreset||a||"";return l.output={...l.output||{},apiPreset:c},l.apiPreset=c,(!Array.isArray(l.extraction.selectors)||l.extraction.selectors.length===0)&&Array.isArray(l.extractTags)&&l.extractTags.length>0&&(l.extraction.selectors=[...l.extractTags]),(!Array.isArray(l.extractTags)||l.extractTags.length===0)&&(l.extractTags=Array.isArray(l.extraction.selectors)?[...l.extraction.selectors]:[]),l}function be(t,e){if(!t||!j(t))return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let s=m.get(wt)||{},r=m.get(ce)||{},n=e?.output?.apiPreset??e?.apiPreset??"",o=["promptTemplate","enabled","extractTags","apiPreset","trigger","output","bypass","extraction","runtime"];return s[t]={},o.forEach(i=>{if(e[i]!==void 0){if(i==="output"&&e.output){s[t][i]={...e.output,apiPreset:n};return}if(i==="apiPreset"){s[t][i]=n;return}s[t][i]=e[i]}}),s[t].apiPreset===void 0&&(s[t].apiPreset=n),!s[t].output&&e.output!==void 0&&(s[t].output={...e.output||{},apiPreset:n}),m.set(wt,s),r[t]=n,m.set(ce,r),x.emit(h.TOOL_UPDATED,{toolId:t,config:s[t]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function ki(t,e){let s=j(t);return s?be(t,{...s,output:{...s.output,mode:e}}):!1}function Ri(t,e){let s=j(t);return s?be(t,{...s,apiPreset:e,output:{...s.output,apiPreset:e}}):!1}function Ii(t,e){let s=j(t);return s?be(t,{...s,bypass:{...s.bypass,...e}}):!1}function Di(t,e){let s=j(t);return s?be(t,{...s,promptTemplate:e}):!1}function br(t,e){let s=j(t);return s?be(t,{...s,runtime:{...s.runtime,...e,lastRunAt:Date.now()}}):!1}function Hn(t){if(!t||!Tt[t])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=m.get(wt)||{};return delete e[t],m.set(wt,e),x.emit(h.TOOL_UPDATED,{toolId:t,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function ls(){return{...Tt}}function hr(){let t=new Set([...Object.keys(Tt),...Dn().map(([e])=>e)]);return Array.from(t).map(e=>j(e)).filter(Boolean)}function cs(){return hr().filter(t=>t&&t.enabled)}function Wn(t,e){let s=m.get(gr)||{};s[t]={...e,updatedAt:Date.now()},m.set(gr,s)}function qn(t){return(m.get(gr)||{})[t]||null}var wt,ce,gr,Tt,ot,In,le,Oi,Et=T(()=>{Ee();G();is();wt="tool_configs",ce="tool_api_bindings",gr="tool_window_states",Tt={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</status_block>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["status_block"]},youyouReview:{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",description:"\u5728\u56DE\u590D\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50",enabled:!0,order:5,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["youyou"]},promptTemplate:`\u8BF7\u57FA\u4E8E\u4EE5\u4E0B\u6700\u65B0\u5267\u60C5\u56DE\u590D\uFF0C\u751F\u6210\u201C\u5C0F\u5E7D\u70B9\u8BC4\u201D\u3002

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]}},ot={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{trigger:{type:"manual",events:[]},execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:3,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel"}]},bypass:{id:"bypass",name:"\u7834\u9650\u8BCD",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406\u7834\u9650\u8BCD\u9884\u8BBE",component:"BypassPanel",order:4},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:5}},In={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},le={...ot};Oi={TOOL_REGISTRY:ot,TOOL_CATEGORIES:In,registerTool:Ln,unregisterTool:Nn,getToolList:jn,getToolConfig:as,hasTool:fr,getToolSubTabs:Un,resetToolRegistry:zn,setToolApiPreset:Bn,getToolApiPreset:mr,clearToolApiPreset:Yn,getAllToolApiBindings:Gn,onPresetDeleted:Fn,saveToolWindowState:Wn,getToolWindowState:qn,getToolFullConfig:j,saveToolConfig:be,resetToolConfig:Hn,getAllDefaultToolConfigs:ls,getAllToolFullConfigs:hr,getEnabledTools:cs}});var Jn={};N(Jn,{BypassManager:()=>ds,DEFAULT_BYPASS_PRESETS:()=>xe,addMessage:()=>Wi,buildBypassMessages:()=>Ki,bypassManager:()=>w,createPreset:()=>Ui,default:()=>Xi,deleteMessage:()=>Qi,deletePreset:()=>Bi,duplicatePreset:()=>Yi,exportPresets:()=>Ji,getAllPresets:()=>Ni,getDefaultPresetId:()=>Gi,getEnabledMessages:()=>Hi,getPreset:()=>ji,getPresetList:()=>vr,importPresets:()=>Vi,setDefaultPresetId:()=>Fi,updateMessage:()=>qi,updatePreset:()=>zi});var he,it,xr,xe,Li,ds,w,Ni,vr,ji,Ui,zi,Bi,Yi,Gi,Fi,Hi,Wi,qi,Qi,Ji,Vi,Ki,Xi,St=T(()=>{Ee();G();he="bypass_presets",it="default_bypass_preset",xr="current_bypass_preset",xe={},Li=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),ds=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=m.get(he,{});return this._cache={...xe,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((s,r)=>(r.updatedAt||0)-(s.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:s,name:r,description:n,messages:o}=e;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let i=s.trim();if(this.presetExists(i))return{success:!1,message:`\u9884\u8BBE "${i}" \u5DF2\u5B58\u5728`};let a={id:i,name:r.trim(),description:n||"",enabled:!0,messages:o||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(i,a),x.emit(h.BYPASS_PRESET_CREATED,{presetId:i,preset:a}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${i}`),{success:!0,message:`\u9884\u8BBE "${r}" \u521B\u5EFA\u6210\u529F`,preset:a}}updatePreset(e,s){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let n={...r,...s,id:e,updatedAt:Date.now()};return this._savePreset(e,n),x.emit(h.BYPASS_PRESET_UPDATED,{presetId:e,preset:n}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u66F4\u65B0\u6210\u529F`,preset:n}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(xe[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r=m.get(he,{});return delete r[e],m.set(he,r),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),x.emit(h.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,s,r){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${e}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(n)),id:s.trim(),name:r||`${n.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),o),x.emit(h.BYPASS_PRESET_CREATED,{presetId:s,preset:o}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${o.name}"`,preset:o}}addMessage(e,s){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n={id:`msg_${Date.now()}`,role:s.role||"SYSTEM",content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1},o=[...r.messages||[],n];return this.updatePreset(e,{messages:o})}updateMessage(e,s,r){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=n.messages||[],i=o.findIndex(l=>l.id===s);if(i===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let a=[...o];return a[i]={...a[i],...r},this.updatePreset(e,{messages:a})}deleteMessage(e,s){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=r.messages||[],o=n.find(a=>a.id===s);if(!o)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(o.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let i=n.filter(a=>a.id!==s);return this.updatePreset(e,{messages:i})}getEnabledMessages(e){let s=this.getPreset(e);return!s||!s.enabled?[]:(s.messages||[]).filter(r=>r.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=m.get(it,null);return e==="undefined"||e==="null"||e===""?(m.remove(it),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(m.set(it,e),x.emit(h.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let r=this.getPreset(e);if(!r)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(e,s={}){let{overwrite:r=!1}=s,n;try{n=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let o=Array.isArray(n)?n:n.presets?n.presets:[n];if(o.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let i=m.get(he,{}),a=0;for(let l of o)!l.id||typeof l.id!="string"||l.name&&(xe[l.id]&&!r||!r&&i[l.id]||(i[l.id]={...l,updatedAt:Date.now()},a++));return a>0&&(m.set(he,i),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u9884\u8BBE`,imported:a}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let s=e?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(e){let s=this.getToolBypassPreset(e);return s?this.getEnabledMessages(s.id):[]}_savePreset(e,s){let r=m.get(he,{});r[e]=s,m.set(he,r),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=m.get(he,{}),s={},r=!1,n=Array.isArray(e)?e.map((o,i)=>[o?.id||o?.name||`legacy_${i}`,o]):Object.entries(e||{});for(let[o,i]of n){let a=this._normalizePreset(o,i,s);if(!a){r=!0;continue}s[a.id]=a,(!e?.[a.id]||e?.[a.id]?.id!==a.id)&&(r=!0)}r&&m.set(he,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(e,s,r={}){if(!s||typeof s!="object")return null;let n=typeof s.name=="string"?s.name.trim():"",o=typeof s.id=="string"?s.id.trim():"",i=typeof e=="string"?e.trim():"";if(!n&&i&&i!=="undefined"&&i!=="null"&&(n=i),this._isLegacySamplePreset(n,o)||(!o&&i&&i!=="undefined"&&i!=="null"&&(o=i),!o&&n&&n!=="undefined"&&n!=="null"&&(o=this._generatePresetId(n,r)),!n||!o||o==="undefined"||n==="undefined"))return null;let l=Array.isArray(s.messages)?s.messages.filter(c=>c&&typeof c=="object").map((c,y)=>({id:typeof c.id=="string"&&c.id.trim()?c.id.trim():`${o}_msg_${y+1}`,role:c.role||"SYSTEM",content:typeof c.content=="string"?c.content:"",enabled:c.enabled!==!1,deletable:c.deletable!==!1})):[];return{...s,id:o,name:n,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:l,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(e){let s=m.get(it,null),r=m.get(xr,null),n=s??r;(n==="undefined"||n==="null"||n==="")&&(n=null),n&&!e[n]&&(n=Object.values(e).find(i=>i.name===n)?.id||null),n?m.set(it,n):m.remove(it),m.has(xr)&&m.remove(xr)}_isLegacySamplePreset(e,s=""){return e?s==="standard"||s==="enhanced"||s==="jailbreak"||Li.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,s={}){let r=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,n=r,o=1;for(;s[n];)n=`${r}_${o++}`;return n}_log(...e){this.debugMode&&console.log("[BypassManager]",...e)}},w=new ds,Ni=()=>w.getAllPresets(),vr=()=>w.getPresetList(),ji=t=>w.getPreset(t),Ui=t=>w.createPreset(t),zi=(t,e)=>w.updatePreset(t,e),Bi=t=>w.deletePreset(t),Yi=(t,e,s)=>w.duplicatePreset(t,e,s),Gi=()=>w.getDefaultPresetId(),Fi=t=>w.setDefaultPresetId(t),Hi=t=>w.getEnabledMessages(t),Wi=(t,e)=>w.addMessage(t,e),qi=(t,e,s)=>w.updateMessage(t,e,s),Qi=(t,e)=>w.deleteMessage(t,e),Ji=t=>w.exportPresets(t),Vi=(t,e)=>w.importPresets(t,e),Ki=t=>w.buildBypassMessages(t),Xi=w});var Zn={};N(Zn,{abortAllTasks:()=>ra,abortTask:()=>sa,buildToolMessages:()=>Xn,clearExecutionHistory:()=>la,createExecutionContext:()=>ua,createResult:()=>ys,enhanceMessagesWithBypass:()=>pa,executeBatch:()=>ta,executeTool:()=>Kn,executeToolWithConfig:()=>us,executeToolsBatch:()=>ma,executorState:()=>D,extractFailed:()=>ya,extractSuccessful:()=>da,generateTaskId:()=>He,getExecutionHistory:()=>aa,getExecutorStatus:()=>ia,getScheduler:()=>at,getToolsForEvent:()=>Tr,mergeResults:()=>ca,pauseExecutor:()=>na,resumeExecutor:()=>oa,setMaxConcurrent:()=>ea});function ys(t,e,s,r,n,o,i=0){return{success:s,taskId:t,toolId:e,data:r,error:n,duration:o,retries:i,timestamp:Date.now(),metadata:{}}}function He(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function Zi(t,e={}){return{id:He(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function at(){return _t||(_t=new wr(D.maxConcurrent)),_t}function ea(t){D.maxConcurrent=Math.max(1,Math.min(10,t)),_t&&(_t.maxConcurrent=D.maxConcurrent)}async function Kn(t,e={},s){let r=at(),n=Zi(t,e);for(;D.isPaused;)await new Promise(o=>setTimeout(o,100));try{let o=await r.enqueue(async i=>{if(i.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(i,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},n);return Vn(o),o}catch(o){let i=ys(n.id,t,!1,null,o,Date.now()-n.createdAt,n.retries);return Vn(i),i}}async function ta(t,e={}){let{failFast:s=!1,concurrency:r=D.maxConcurrent}=e,n=[],o=at(),i=o.maxConcurrent;o.maxConcurrent=r;try{let a=t.map(({toolId:l,options:c,executor:y})=>Kn(l,c,y));if(s)for(let l of a){let c=await l;if(n.push(c),!c.success){o.abortAll();break}}else{let l=await Promise.allSettled(a);for(let c of l)c.status==="fulfilled"?n.push(c.value):n.push(ys(He(),"unknown",!1,null,c.reason,0,0))}}finally{o.maxConcurrent=i}return n}function sa(t){return at().abort(t)}function ra(){at().abortAll(),D.executionQueue=[]}function na(){D.isPaused=!0}function oa(){D.isPaused=!1}function ia(){return{...at().getStatus(),isPaused:D.isPaused,activeControllers:D.activeControllers.size,historyCount:D.executionHistory.length}}function Vn(t){D.executionHistory.push(t),D.executionHistory.length>100&&D.executionHistory.shift()}function aa(t={}){let e=[...D.executionHistory];return t.toolId&&(e=e.filter(s=>s.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(s=>s.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function la(){D.executionHistory=[]}function ca(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of t)e.totalDuration+=s.duration,s.success?(e.successCount++,s.data!==void 0&&s.data!==null&&e.data.push(s.data)):(e.success=!1,e.failureCount++,s.error&&e.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return e}function da(t){return t.filter(e=>e.success).map(e=>e.data)}function ya(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function ua(t={}){return{taskId:He(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function pa(t,e){return!e||e.length===0?t:[...e,...t]}function ga(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Xn(t,e){let s=[],r=t.promptTemplate||"",n={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[o,i]of Object.entries(n))r=r.replace(new RegExp(ga(o),"g"),i);return s.push({role:"USER",content:r}),s}async function us(t,e,s={}){let r=j(t);if(!r)return{success:!1,taskId:He(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!r.enabled)return{success:!1,taskId:He(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let n=Date.now(),o=He();try{x.emit(h.TOOL_EXECUTION_STARTED,{toolId:t,taskId:o,context:e});let i=Xn(r,e);if(typeof s.callApi=="function"){let a=r.output?.apiPreset||r.apiPreset||"",l=a?{preset:a}:null,c=await s.callApi(i,l,s.signal),y=c;r.outputMode==="separate"&&r.extractTags?.length>0&&(y=fa(c,r.extractTags));let p={success:!0,taskId:o,toolId:t,data:y,duration:Date.now()-n};return x.emit(h.TOOL_EXECUTED,{toolId:t,taskId:o,result:p}),p}else return{success:!0,taskId:o,toolId:t,data:{messages:i,config:{apiPreset:r.output?.apiPreset||r.apiPreset||"",outputMode:r.outputMode,extractTags:r.extractTags}},duration:Date.now()-n,needsExecution:!0}}catch(i){let a={success:!1,taskId:o,toolId:t,error:i.message||String(i),duration:Date.now()-n};return x.emit(h.TOOL_EXECUTION_FAILED,{toolId:t,taskId:o,error:i}),a}}function fa(t,e){let s={};for(let r of e){let n=new RegExp(`<${r}[^>]*>([\\s\\S]*?)<\\/${r}>`,"gi"),o=t.match(n);o&&(s[r]=o.map(i=>{let a=i.match(new RegExp(`<${r}[^>]*>([\\s\\S]*?)<\\/${r}>`,"i"));return a?a[1].trim():""}))}return s}async function ma(t,e,s={}){let r=[];for(let n of t){let o=j(n);if(o&&o.enabled){let i=await us(n,e,s);r.push(i)}}return r}function Tr(t){let e=[],s=cs();for(let r of s){let n=r?.trigger?.enabled&&r?.trigger?.event===t,o=Array.isArray(r?.triggerEvents)&&r.triggerEvents.includes(t);r&&r.enabled&&(n||o)&&e.push(r)}return e}var D,wr,_t,Er=T(()=>{Et();G();D={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};wr=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,s){return new Promise((r,n)=>{this.queue.push({executor:e,task:s,resolve:r,reject:n}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:s,task:r,resolve:n,reject:o}=e,i=new AbortController;r.abortController=i,r.status="running",r.startedAt=Date.now(),this.running.set(r.id,r),D.activeControllers.set(r.id,i),this.executeTask(s,r,i.signal).then(a=>{r.status="completed",r.completedAt=Date.now(),n(a)}).catch(a=>{r.status=a.name==="AbortError"?"aborted":"failed",r.completedAt=Date.now(),o(a)}).finally(()=>{this.running.delete(r.id),D.activeControllers.delete(r.id),D.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,s,r){let n=Date.now(),o=null;for(let i=0;i<=s.maxRetries;i++){if(r.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let a=await e(r);return ys(s.id,s.toolId,!0,a,null,Date.now()-n,i)}catch(a){if(o=a,a.name==="AbortError")throw a;i<s.maxRetries&&(await this.delay(1e3*(i+1)),s.retries=i+1)}}throw o}delay(e){return new Promise(s=>setTimeout(s,e))}abort(e){let s=D.activeControllers.get(e);return s?(s.abort(),!0):!1}abortAll(){for(let e of D.activeControllers.values())e.abort();D.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},_t=null});var eo={};N(eo,{DEFAULT_SETTINGS:()=>_r,SettingsService:()=>ps,default:()=>ba,settingsService:()=>Ce});var _r,Sr,ps,Ce,ba,gs=T(()=>{Ee();G();_r={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},listener:{listenGenerationEnded:!0,ignoreQuietGeneration:!0,ignoreAutoTrigger:!0,debounceMs:300},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue"}},Sr="settings_v2",ps=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=m.get(Sr,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),m.set(Sr,this._cache),x.emit(h.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let s=this.getSettings(),r=this._deepMerge(s,e);this.saveSettings(r)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getListenerSettings(){return this.getSettings().listener}updateListenerSettings(e){this.updateSettings({listener:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(_r)),m.set(Sr,this._cache),x.emit(h.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,s=null){let r=this.getSettings(),n=e.split("."),o=r;for(let i of n)if(o&&typeof o=="object"&&i in o)o=o[i];else return s;return o}set(e,s){let r=JSON.parse(JSON.stringify(this.getSettings())),n=e.split("."),o=r;for(let i=0;i<n.length-1;i++){let a=n[i];a in o||(o[a]={}),o=o[a]}o[n[n.length-1]]=s,this.saveSettings(r)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(_r)),e)}_deepMerge(e,s){let r={...e};for(let n in s)s[n]&&typeof s[n]=="object"&&!Array.isArray(s[n])?r[n]=this._deepMerge(e[n]||{},s[n]):r[n]=s[n];return r}},Ce=new ps,ba=Ce});var so={};N(so,{ContextInjector:()=>ms,DEFAULT_INJECTION_OPTIONS:()=>to,contextInjector:()=>bs,default:()=>ha});var de,fs,to,ms,bs,ha,Ar=T(()=>{G();de="YouYouToolkit_toolOutputs",fs="YouYouToolkit_injectedContext",to={overwrite:!0,enabled:!0},ms=class{constructor(){this.debugMode=!1}async inject(e,s,r={}){if(!e||s===void 0||s===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),!1;let n={...to,...r},o=this._getCurrentChatId(),i={toolId:e,content:String(s),updatedAt:Date.now(),sourceMessageId:r.sourceMessageId||null,options:n};return x.emit(h.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:o,content:i.content,options:n}),await this._insertToolOutputToLatestAssistantMessage(e,i,n)?(this._log(`\u6CE8\u5165\u6210\u529F: ${e} -> ${o}`),!0):!1}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:s}=this._getChatRuntime(),r=this._findAssistantMessageIndex(s,e);if(r<0)return"";let n=s[r]||{},o=n[fs];if(typeof o=="string"&&o.trim())return o.trim();let i=n[de];return i&&typeof i=="object"?this._buildMessageInjectedContext(i).trim():""}catch(s){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",s),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),s=this._findAssistantMessageIndex(e,null);if(s<0)return{};let n=(e[s]||{})[de];return n&&typeof n=="object"?n:{}}catch(e){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",e),{}}}getToolContext(e,s){if(!s)return null;try{let{chat:r}=this._getChatRuntime(),n=this._findAssistantMessageIndex(r,null);return n<0?null:r[n]?.[de]?.[s]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,s){if(!s)return!1;try{let{api:r,context:n,chat:o}=this._getChatRuntime(),i=this._findAssistantMessageIndex(o,null);if(i<0)return!1;let a=o[i],l=a?.[de];if(!l||!l[s])return!1;delete l[s],a[de]=l,a[fs]=this._buildMessageInjectedContext(l);let c=n?.saveChat||r?.saveChat||null;return typeof c=="function"&&await c.call(n||r),x.emit(h.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:s}),!0}catch(r){return this._log("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",r),!1}}async clearAllContext(e){try{let{api:s,context:r,chat:n}=this._getChatRuntime(),o=this._findAssistantMessageIndex(n,null);if(o<0)return!1;let i=n[o];delete i[de],delete i[fs];let a=r?.saveChat||s?.saveChat||null;return typeof a=="function"&&await a.call(r||s),x.emit(h.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(s){return this._log("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",s),!1}}clearAllChatsContexts(){this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,s){return!!this.getToolContext(e,s)}getContextSummary(e){let s=this._getLatestAssistantMessageOutputs(),r=Object.entries(s).map(([n,o])=>({toolId:n,updatedAt:o.updatedAt,contentLength:o.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:r,totalCount:r.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,s={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,s=e.SillyTavern||null,r=s?.getContext?.()||null,n=Array.isArray(r?.chat)?r.chat:[],o=Array.isArray(s?.chat)?s.chat:[],i=n.length?n:o;return{topWindow:e,api:s,context:r,chat:i,contextChat:n,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_syncMessageToRuntimeChats(e,s,r){let{contextChat:n,apiChat:o}=e||{},i=a=>{!Array.isArray(a)||s<0||s>=a.length||a[s]!==r&&(a[s]={...a[s]||{},...r})};i(n),i(o)}_notifyMessageUpdated(e,s){try{let{api:r,topWindow:n}=e||{},o=r?.eventSource||null,a=(r?.eventTypes||{}).MESSAGE_UPDATED||"MESSAGE_UPDATED";o&&typeof o.emit=="function"&&(o.emit(a,s),typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(()=>{o.emit(a,s)}):typeof n?.setTimeout=="function"&&n.setTimeout(()=>{o.emit(a,s)},30))}catch(r){this._log("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",r)}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let s=String(e.role||"").toLowerCase();return s==="assistant"||s==="ai"||!s}_findAssistantMessageIndex(e,s){let r=Array.isArray(e)?e:[];if(!r.length)return-1;let n=(o,i)=>{if(!this._isAssistantMessage(o)||s==null||s==="")return!1;let a=String(s).trim();return a?[o.message_id,o.id,o.messageId,o.mes_id,o.swipe_id,i].map(c=>c==null?"":String(c).trim()).includes(a):!1};for(let o=r.length-1;o>=0;o-=1)if(n(r[o],o))return o;for(let o=r.length-1;o>=0;o-=1)if(this._isAssistantMessage(r[o]))return o;return-1}_buildMessageInjectedContext(e){let r=Object.entries(e&&typeof e=="object"?e:{}).sort(([,o],[,i])=>(o?.updatedAt||0)-(i?.updatedAt||0));if(!r.length)return"";let n=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[o,i]of r)n.push(`[${o}]`),n.push(i?.content||""),n.push("");return n.join(`
`)}_getWritableMessageField(e){let s=["mes","message","content","text"];for(let r of s)if(typeof e?.[r]=="string")return{key:r,text:e[r]};return{key:"mes",text:""}}_applyMessageText(e,s){let r=e&&typeof e=="object"?e:{},n=["mes","message","content","text"],o=!1;return n.forEach(i=>{typeof r[i]=="string"&&(r[i]=s,o=!0)}),o||(r.mes=s,r.message=s),r}_stripExistingToolOutput(e,s=[]){let r=String(e||"");return(Array.isArray(s)?s:[]).forEach(o=>{let i=String(o||"").trim();if(!i)return;if(i.startsWith("regex:")){try{let y=new RegExp(i.slice(6).trim(),"gis");r=r.replace(y,"")}catch(y){this._log("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",i,y)}return}let a=i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${a}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${a}>\\s*`,"gi"),c=new RegExp(`\\{${a}\\|[\\s\\S]*?\\}\\s*`,"gi");r=r.replace(l,""),r=r.replace(c,"")}),r.trimEnd()}_stripPreviousStoredToolContent(e,s){let r=String(e||""),n=String(s||"").trim();return n?r.replace(n,"").trimEnd():r.trimEnd()}async _insertToolOutputToLatestAssistantMessage(e,s,r={}){try{let n=this._getChatRuntime(),{api:o,context:i,chat:a}=n;if(!Array.isArray(a)||!a.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),!1;let l=this._findAssistantMessageIndex(a,r.sourceMessageId);if(l<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),!1;let c=a[l],{key:y,text:p}=this._getWritableMessageField(c),b=c[de]&&typeof c[de]=="object"?c[de]:{},g=b?.[e]?.content||"",S=r.overwrite===!1?String(p||""):this._stripPreviousStoredToolContent(this._stripExistingToolOutput(p,r.extractionSelectors),g),te=String(s.content||"").trim(),M=[S.trimEnd(),te].filter(Boolean).join(`

`).trim(),V={...b,[e]:{toolId:e,content:te,updatedAt:s.updatedAt,sourceMessageId:s.sourceMessageId||null}};c[y]=M,this._applyMessageText(c,M),c[de]=V,c[fs]=this._buildMessageInjectedContext(V),this._syncMessageToRuntimeChats(n,l,c);let ve=i?.setChatMessages||o?.setChatMessages||n?.topWindow?.setChatMessages||null,re=i?.setChatMessage||o?.setChatMessage||n?.topWindow?.setChatMessage||null;if(typeof ve=="function")try{await ve.call(i||o||n?.topWindow,[{message_id:l,message:M,mes:M,content:M,text:M}],{refresh:"none"})}catch(Je){this._log("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",Je)}else if(typeof re=="function")try{await re.call(i||o||n?.topWindow,{message:M,mes:M,content:M,text:M},l)}catch(Je){this._log("setChatMessage \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",Je)}let z=i?.saveChat||o?.saveChat||i?.saveChatDebounced||o?.saveChatDebounced||null;return typeof z=="function"&&await z.call(i||o),this._notifyMessageUpdated(n,l),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587: ${e} -> #${l}`),!0}catch(n){return this._log("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",n),!1}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext(),n=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(i=>typeof i=="string"&&i.trim());if(n)return n;let o=e.SillyTavern?.this_chid;if(o!=null)return`chat_char_${o}`}return"chat_default"}catch{return"chat_default"}}_log(...e){this.debugMode&&console.log("[ContextInjector]",...e)}},bs=new ms,ha=bs});var no={};N(no,{BUILTIN_VARIABLES:()=>ro,VariableResolver:()=>hs,default:()=>xa,variableResolver:()=>$e});var ro,hs,$e,xa,Pr=T(()=>{G();ro={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},hs=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,s){if(typeof e!="string")return e;let r=e;return r=this._resolveBuiltinVariables(r,s),r=this._resolveCustomVariables(r,s),r=this._resolveRegexVariables(r,s),r}resolveObject(e,s){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(n=>this.resolveObject(n,s));let r={};for(let[n,o]of Object.entries(e))typeof o=="string"?r[n]=this.resolveTemplate(o,s):typeof o=="object"&&o!==null?r[n]=this.resolveObject(o,s):r[n]=o;return r}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,s){e&&(this.customVariables.set(e,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,s){!e||typeof s!="function"||(this.variableHandlers.set(e,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,s]of Object.entries(ro))e.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,r]of this.customVariables)e.push({name:`{{${s}}}`,description:typeof r=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},r={};for(let n of this.getAvailableVariables())r[n.category]||(r[n.category]=[]),r[n.category].push(n);for(let[n,o]of Object.entries(s))if(r[n]&&r[n].length>0){e.push(`\u3010${o}\u3011`);for(let i of r[n])e.push(`  ${i.name} - ${i.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,s)=>(s.regexResults||s.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,s){let r=e;return r=r.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),r=r.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),r=r.replace(/\{\{chatHistory\}\}/gi,()=>{let n=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(n)}),r=r.replace(/\{\{characterCard\}\}/gi,()=>{let n=s.characterCard||s.raw?.characterCard;return n?this._formatCharacterCard(n):""}),r=r.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),r=r.replace(/\{\{toolId\}\}/gi,s.toolId||s.raw?.toolId||""),r=r.replace(/\{\{toolPromptMacro\}\}/gi,s.toolPromptMacro||s.raw?.toolPromptMacro||""),r=r.replace(/\{\{toolContentMacro\}\}/gi,s.toolContentMacro||s.raw?.toolContentMacro||""),r=r.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),r=r.replace(/\{\{extractedContent\}\}/gi,s.extractedContent||s.raw?.extractedContent||""),r=r.replace(/\{\{recentMessagesText\}\}/gi,s.recentMessagesText||s.raw?.recentMessagesText||""),r=r.replace(/\{\{rawRecentMessagesText\}\}/gi,s.rawRecentMessagesText||s.raw?.rawRecentMessagesText||""),r=r.replace(/\{\{userMessage\}\}/gi,s.userMessage||s.raw?.userMessage||""),r=r.replace(/\{\{previousToolOutput\}\}/gi,s.previousToolOutput||s.raw?.previousToolOutput||""),r}_resolveCustomVariables(e,s){let r=e;for(let[n,o]of this.customVariables){let i=new RegExp(`\\{\\{${this._escapeRegex(n)}\\}\\}`,"gi");typeof o=="function"?r=r.replace(i,()=>{try{return o(s)}catch(a){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${n}:`,a),""}}):r=r.replace(i,String(o))}return r}_resolveRegexVariables(e,s){let r=e;for(let[n,o]of this.variableHandlers){let i=new RegExp(`\\{\\{${n}\\.([^}]+)\\}\\}`,"gi");r=r.replace(i,(a,l)=>{try{return o(l,s)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${n}.${l}:`,c),""}})}return r}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(s=>{let r=s.role||"unknown",n=s.content||s.mes||"";return`[${r}]: ${n}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let s=[];return e.name&&s.push(`\u59D3\u540D: ${e.name}`),e.description&&s.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&s.push(`\u6027\u683C: ${e.personality}`),e.scenario&&s.push(`\u573A\u666F: ${e.scenario}`),s.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){this.debugMode&&console.log("[VariableResolver]",...e)}},$e=new hs,xa=$e});var io={};N(io,{DEFAULT_PROMPT_TEMPLATE:()=>oo,ToolPromptService:()=>xs,default:()=>va,toolPromptService:()=>vs});var oo,xs,vs,va,Cr=T(()=>{G();St();Pr();oo="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",xs=class{constructor(){this.debugMode=!1}_buildVariableContext(e,s={}){let r=this._getPromptTemplate(e),n=$e.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||""}),o=$e.resolveTemplate(r,n).trim(),i=String(s?.toolContentMacro||s?.input?.toolContentMacro||"").trim();return $e.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolPromptMacro:o,toolContentMacro:i})}buildToolMessages(e,s){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let r=[],n=this._buildVariableContext(e,s),o=this._getBypassMessages(e);if(o&&o.length>0)for(let a of o)a.enabled!==!1&&r.push({role:this._normalizeRole(a.role),content:$e.resolveTemplate(a.content||"",n)});let i=this._buildUserContent(this._getPromptTemplate(e),n);return i&&r.push({role:"user",content:i}),this._log(`\u6784\u5EFA\u6D88\u606F: ${r.length} \u6761`),r}buildPromptText(e,s){return this._buildVariableContext(e,s).toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:oo}_getBypassMessages(e){return e.bypass?.enabled?w.buildBypassMessages(e):[]}_buildUserContent(e,s){return!e||!e.trim()?"":$e.resolveTemplate(e,s).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){this.debugMode&&console.log("[ToolPromptService]",...e)}setDebugMode(e){this.debugMode=e}},vs=new xs,va=vs});var ao={};N(ao,{LEGACY_OUTPUT_MODES:()=>wa,OUTPUT_MODES:()=>We,TOOL_RUNTIME_STATUS:()=>Ta,ToolOutputService:()=>ws,default:()=>Ea,toolOutputService:()=>qe});var We,wa,Ta,ws,qe,Ea,$r=T(()=>{G();gs();Ar();Cr();ns();Yt();We={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},wa={inline:"follow_ai"},Ta={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},ws=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled?!1:e.output?.mode===We.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled)return!1;let s=e.output?.mode;return s===We.FOLLOW_AI||s==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,s){let r=Date.now(),n=e.id;this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${n}`),x.emit(h.TOOL_EXECUTION_STARTED,{toolId:n,mode:We.POST_RESPONSE_API});try{let o=await this._buildToolMessages(e,s);if(!o||o.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");this._log(`\u6784\u5EFA\u4E86 ${o.length} \u6761\u6D88\u606F`);let i=e.output?.apiPreset||e.apiPreset||"",a=await this._getRequestTimeout(),l=await this._sendApiRequest(i,o,{timeoutMs:a,signal:s.signal}),c=this._extractOutputContent(l,e);if(c&&!await bs.inject(n,c,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.messageId||"",extractionSelectors:this._getExtractionSelectors(e)}))throw new Error("\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");let y=Date.now()-r;return x.emit(h.TOOL_EXECUTED,{toolId:n,success:!0,duration:y,mode:We.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${n}, \u8017\u65F6 ${y}ms`),{success:!0,toolId:n,output:c,duration:y}}catch(o){let i=Date.now()-r;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${n}`,o),x.emit(h.TOOL_EXECUTION_FAILED,{toolId:n,error:o.message||String(o),duration:i}),{success:!1,toolId:n,error:o.message||String(o),duration:i}}}async runToolInline(e,s){let r=Date.now(),n=e.id;try{let o=await this._buildToolMessages(e,s);return{success:!0,toolId:n,messages:o,duration:Date.now()-r}}catch(o){return{success:!1,toolId:n,error:o.message||String(o),duration:Date.now()-r}}}async previewExtraction(e,s){let r=this._buildRecentMessageExtractionEntries(e,s),n=this._joinMessageBlocks(r,"rawText"),o=this._joinMessageBlocks(r,"filteredText"),i=this._joinMessageBlocks(r,"extractedText",{skipEmpty:!0});return{success:!0,sourceText:n,filteredSourceText:o,extractedText:i,messageEntries:r,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,s){let r=this._buildRecentMessageExtractionEntries(e,s),n=this._joinMessageBlocks(r,"rawText"),o=this._joinMessageBlocks(r,"filteredText"),i=this._joinMessageBlocks(r,"extractedText",{skipEmpty:!0}),a={...s,rawRecentMessagesText:n,recentMessagesText:o,extractedContent:i,toolContentMacro:this._buildToolContentMacro(r),toolName:e.name,toolId:e.id};return vs.buildToolMessages(e,a)}_normalizeRole(e){if(!e)return"user";let s=String(e).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,s,r={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:n=9e4,signal:o}=r,i=null;if(e){if(!Ys(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);i=mt(e)}else i=mt();let a=Ze(i||{});if(!a.valid&&!i?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${a.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:n,apiConfig:i},o);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Ce.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,s){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,s);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,s);if(e.content)return this._applyOutputExtractionSelectors(e.content,s);if(e.text)return this._applyOutputExtractionSelectors(e.text,s);if(e.message)return this._applyOutputExtractionSelectors(e.message,s);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),s)}catch{return this._applyOutputExtractionSelectors(String(e),s)}}return this._applyOutputExtractionSelectors(String(e),s)}_applyOutputExtractionSelectors(e,s){let r=typeof e=="string"?e:String(e||""),n=this._getExtractionSelectors(s);if(!n.length)return r.trim();let o=[];for(let i of n){let a=String(i||"").trim();if(!a)continue;if(a.startsWith("regex:")){let c=a.slice(6).trim();if(!c)continue;try{let y=new RegExp(c,"gi");[...r.matchAll(y)].forEach(b=>{let g=String(b?.[0]||"").trim();g&&o.push(g)})}catch(y){this._log("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:a,error:y})}continue}let l=a.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(r.match(c)||[]).forEach(p=>{let b=String(p||"").trim();b&&o.push(b)})}catch(c){this._log("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:a,error:c})}}return o.length>0?o.join(`

`).trim():r.trim()}_getExtractionSelectors(e){let s=e?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(r=>String(r||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(r=>String(r||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,s){return this._applyExtractionSelectorsInternal(e,s,{strict:!1})}_applyExtractionSelectorsInternal(e,s,r={}){let n=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(s),{strict:i=!1}=r;if(!o.length)return n.trim();let a=o.map((c,y)=>{let p=String(c||"").trim(),b=p.startsWith("regex:");return{id:`tool-extract-${y}`,type:b?"regex_include":"include",value:b?p.slice(6).trim():p,enabled:!0}}).filter(c=>c.value),l=Ye(n,a,[]);return i?(l||"").trim():l||n.trim()}_extractToolContent(e,s){let r=typeof s=="string"?s:String(s||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(r,e,{strict:!0}):r.trim()}_applyGlobalContextRules(e){let s=typeof e=="string"?e:String(e||"");if(!s.trim())return"";try{let r=ge()||[],n=Ge()||[];return!Array.isArray(r)||r.length===0?s.trim():Ye(s,r,n)||s.trim()}catch(r){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",r),s.trim()}}_getMessageText(e){if(!e)return"";let s=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let r of s)if(typeof r=="string"&&r.trim())return r.trim();return""}_collectRecentAssistantMessages(e,s){return this._collectRecentAssistantMessageEntries(e,s).map(r=>r.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,s){let r=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),n=Array.isArray(s?.chatMessages)?s.chatMessages:[],o=[];for(let a=n.length-1;a>=0&&o.length<r;a-=1){let l=n[a],c=String(l?.role||"").toLowerCase(),y=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,p=this._getMessageText(l);y&&p&&o.unshift({text:p,message:l,chatIndex:a})}if(o.length>0)return o;let i=s?.lastAiMessage||s?.input?.lastAiMessage||"";return i?[{text:i,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,s){return this._collectRecentAssistantMessageEntries(e,s).map((n,o)=>{let i=n.text||"",a=this._applyGlobalContextRules(i),l=this._extractToolContent(e,i);return{...n,order:o+1,rawText:i,filteredText:a,extractedText:l}})}_joinMessageBlocks(e,s,r={}){let n=Array.isArray(e)?e:[],{skipEmpty:o=!1}=r;return n.map(a=>{let l=String(a?.[s]||"").trim();return o&&!l?"":`${`\u3010\u7B2C ${a?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(n=>{let o=`\u3010\u7B2C ${n?.order||0} \u6761 AI \u6D88\u606F\u3011`,i=String(n?.filteredText||"").trim()||"(\u7A7A)",a=String(n?.extractedText||"").trim()||"(\u7A7A)";return`${o}
\u6B63\u6587\uFF1A
${i}

\u5DE5\u5177\uFF1A
${a}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(e){this.debugMode=e}_log(...e){this.debugMode&&console.log("[ToolOutputService]",...e)}},qe=new ws,Ea=qe});var mo={};N(mo,{EVENT_TYPES:()=>se,checkGate:()=>Ir,destroyToolTriggerManager:()=>Ya,getChatContext:()=>Dr,getCurrentCharacter:()=>Or,getFullContext:()=>Oa,getToolTriggerManagerState:()=>Ga,getWorldbookContent:()=>uo,initToolTriggerManager:()=>po,initTriggerModule:()=>fo,previewToolExtraction:()=>jr,registerEventListener:()=>Qe,registerTriggerHandler:()=>La,removeAllListeners:()=>Ia,removeAllTriggerHandlers:()=>ja,resetGateState:()=>Da,runToolManually:()=>Nr,setDebugMode:()=>Fa,setTriggerHandlerEnabled:()=>Na,triggerState:()=>$,unregisterEventListener:()=>Ss,updateGateState:()=>At});function Me(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Mr(t){if(!t)return"";let e=[t.mes,t.message,t.content,t.text,t?.data?.content];for(let s of e)if(typeof s=="string"&&s.trim())return s;return""}function Sa(t){return new Promise(e=>setTimeout(e,t))}function _a(t,e){let s=[t?.message_id,t?.messageId,t?.id,t?.mes_id,e];for(let r of s){if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"&&r.trim())return r.trim()}return e}function Aa(t){let e=String(t||"").trim();return!(!e||e.length<5||/^[.。·•…\s]+$/.test(e))}function Pa(t,e=null){let r=(Array.isArray(t)?t:[]).map((a,l)=>({role:co(a),content:Mr(a),name:a?.name||"",timestamp:a?.send_date||a?.timestamp||"",isSystem:!!a?.is_system,isUser:!!a?.is_user,sourceId:_a(a,l),chatIndex:l,originalMessage:a})),n=e==null||e===""?null:String(e).trim(),o=null,i=null;for(let a=r.length-1;a>=0;a-=1){let l=r[a];if(!o&&l.role==="assistant"&&Aa(l.content)&&(!n||String(l.sourceId).trim()===n||l.chatIndex===Number(n)?o=l:o||(o=l)),!i&&l.role==="user"&&l.content&&(i=l),o&&i)break}return{messages:r,lastUserMessage:i,lastAiMessage:o}}async function Ca(t={}){let{preferredMessageId:e=null,retries:s=0,retryDelayMs:r=250}=t,n={messages:[],lastUserMessage:null,lastAiMessage:null};for(let o=0;o<=s;o+=1){let i=await yo();if(n=Pa(i,e),n.lastAiMessage?.content)return n;o<s&&await Sa(r)}return n}function Ts(){At({lastUserSendIntentAt:Date.now()})}function $a(){let t=Me(),e=t?.document;if(!e?.body)return!1;if(t.__YYT_sendIntentHooksInstalled)return!0;let s=["#send_but","#option_send","#send_button",'button[title*="\u53D1\u9001"]','button[title*="Send"]'],r=["#send_textarea","#send_textarea textarea","textarea#send_textarea",'textarea[data-testid="send_textarea"]'],n=(o,i,a)=>{o.forEach(l=>{let c=e.querySelector(l);c&&c.addEventListener(i,a,!0)})};return n(s,"click",()=>Ts()),n(s,"pointerup",()=>Ts()),n(s,"touchend",()=>Ts()),n(r,"keydown",o=>{let i=o?.key||"";(i==="Enter"||i==="NumpadEnter")&&!o.shiftKey&&Ts()}),t.__YYT_sendIntentHooksInstalled=!0,v("\u5DF2\u5B89\u88C5\u53D1\u9001\u610F\u56FE\u6355\u83B7\u94A9\u5B50"),!0}function Ma(t,e={},s=!1){return s?!0:String(t||e?.type||"").trim().toLowerCase().includes("quiet")||e?.quiet===!0||e?.isQuiet===!0||e?.quiet_prompt===!0}function lt(){return Me().SillyTavern||null}function ka(){return Me().TavernHelper||null}function kr(){let e=Me().SillyTavern;return e&&e.eventSource?e.eventSource:null}function Rr(){let e=Me().SillyTavern;return e&&e.eventTypes?e.eventTypes:se}function v(...t){$.debugMode&&console.log("[YouYouToolkit:Trigger]",...t)}function Ra(t,e,s){let n=[e?.chatId,e?.chat_id,e?.chat_filename,e?.chatMetadata?.chatId,e?.chatMetadata?.chat_id,e?.chatMetadata?.file_name,e?.chatMetadata?.name,t?.chatId,t?.chat_id,t?.chat_filename].find(o=>typeof o=="string"&&o.trim());return n||(s?.id!==void 0&&s?.id!==null?`chat_char_${s.id}`:t?.this_chid!==void 0&&t?.this_chid!==null?`chat_char_${t.this_chid}`:"chat_default")}function Qe(t,e,s={}){if(!t||typeof e!="function")return v("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u51FD\u6570"),()=>{};let{once:r=!1,priority:n=0}=s,o=kr(),a=Rr()[t]||t,l=async(...c)=>{try{if(s.gateCheck&&!await Ir(s.gateCheck)){v(`\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6: ${t}`);return}await e(...c),r&&Ss(t,l)}catch(y){console.error("[YouYouToolkit:Trigger] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF:",y)}};if($.listeners.has(t)||$.listeners.set(t,new Set),$.listeners.get(t).add(l),o&&typeof o.on=="function")o.on(a,l),v(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`);else{let c=Me();c.addEventListener&&(c.addEventListener(a,l),v(`\u5DF2\u6CE8\u518CDOM\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`))}return()=>Ss(t,l)}function Ss(t,e){let s=$.listeners.get(t);if(s&&s.has(e)){s.delete(e);let r=kr(),o=Rr()[t]||t;if(r&&typeof r.off=="function")r.off(o,e),v(`\u5DF2\u53D6\u6D88\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`);else{let i=Me();i.removeEventListener&&i.removeEventListener(o,e)}}}function Ia(){let t=kr(),e=Rr();for(let[s,r]of $.listeners){let n=e[s]||s;for(let o of r)if(t&&typeof t.off=="function")t.off(n,o);else{let i=Me();i.removeEventListener&&i.removeEventListener(n,o)}}$.listeners.clear(),v("\u5DF2\u79FB\u9664\u6240\u6709\u4E8B\u4EF6\u76D1\u542C\u5668")}async function Ir(t){if(!t)return!0;let e=Date.now(),s=$.gateState;if(t.minInterval&&s.lastGenerationAt&&e-s.lastGenerationAt<t.minInterval)return v("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u77ED"),!1;if(t.maxInterval&&s.lastUserMessageAt&&e-s.lastUserMessageAt>t.maxInterval)return v("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u957F"),!1;if(t.requireUserMessage&&!s.lastUserMessageId)return v("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u7F3A\u5C11\u7528\u6237\u6D88\u606F"),!1;if(t.excludeQuietGeneration&&s.lastGenerationType==="quiet")return v("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: quiet\u751F\u6210\u88AB\u6392\u9664"),!1;if(t.customCheck&&typeof t.customCheck=="function")try{if(!await t.customCheck(s))return v("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u81EA\u5B9A\u4E49\u68C0\u67E5\u8FD4\u56DEfalse"),!1}catch(r){return console.error("[YouYouToolkit:Trigger] \u81EA\u5B9A\u4E49\u95E8\u63A7\u68C0\u67E5\u9519\u8BEF:",r),!1}return!0}function At(t){Object.assign($.gateState,t)}function Da(){$.gateState={lastUserSendIntentAt:0,lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationType:null,lastGenerationParams:null,lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1}}async function Dr(t={}){let{depth:e=3,includeUser:s=!0,includeAssistant:r=!0,includeSystem:n=!1,format:o="messages"}=t;if(!lt())return v("\u65E0\u6CD5\u83B7\u53D6SillyTavern API"),null;try{let a=await yo(),l=[],c=Math.max(0,a.length-e);for(let y=c;y<a.length;y++){let p=a[y];if(!p)continue;let b=co(p);if(!(b==="user"&&!s)&&!(b==="system"&&!n)&&!(b==="assistant"&&!r))if(o==="messages"){let g=Mr(p);l.push({role:b,content:g,name:p.name||"",timestamp:p.send_date||p.timestamp,isSystem:!!p.is_system,isUser:!!p.is_user})}else l.push(Mr(p))}return{messages:l,totalMessages:a.length,startIndex:c,endIndex:a.length-1}}catch(a){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u804A\u5929\u4E0A\u4E0B\u6587\u5931\u8D25:",a),null}}function co(t){if(!t)return"assistant";if(t.is_user)return"user";if(t.is_system)return"system";let e=String(t.role||"").toLowerCase();return e==="user"||e==="assistant"||e==="system"?e:"assistant"}async function yo(){let t=ka(),e=lt();if(t?.getChatMessages)try{let s=-1;if(typeof t.getLastMessageId=="function"&&(s=t.getLastMessageId()),!Number.isFinite(s)||s<0){let r=e?.getContext?.()||null,n=Array.isArray(r?.chat)?r.chat:[],o=Array.isArray(e?.chat)?e.chat:[];s=(n.length?n:o).length-1}if(Number.isFinite(s)&&s>=0){let r=await t.getChatMessages(`0-${s}`,{include_swipes:!1,include_hidden:!0});if(Array.isArray(r)&&r.length>0)return r}}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 TavernHelper \u8BFB\u53D6\u804A\u5929\u6D88\u606F\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u9ED8\u8BA4\u6765\u6E90:",s)}try{let s=e?.getContext?.()||null;if(Array.isArray(s?.chat)&&s.chat.length>0)return s.chat}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 getContext() \u8BFB\u53D6\u804A\u5929\u5931\u8D25:",s)}return Array.isArray(e?.chat)?e.chat:[]}async function Or(){let t=lt();if(!t)return null;try{let e=t.this_chid,s=t.characters||[];if(e>=0&&e<s.length){let r=s[e];return{id:e,name:r.name||"",description:r.description||"",personality:r.personality||"",scenario:r.scenario||"",firstMes:r.first_mes||"",mesExample:r.mes_example||""}}return null}catch(e){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e),null}}async function uo(t={}){let{enabledOnly:e=!0,maxLength:s=1e4}=t,r=lt();if(!r)return"";try{let o=(r.lorebook||[]).entries||[],i=[],a=0;for(let l of o){if(e&&!l.enabled)continue;let c=l.content||"";c&&a+c.length<=s&&(i.push(c),a+=c.length)}return i.join(`

`)}catch(n){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u5931\u8D25:",n),""}}async function Oa(t={}){let[e,s,r]=await Promise.all([Dr(t.chat||{}),Or(),uo(t.worldbook||{})]);return{chat:e,character:s,worldbook:r,timestamp:Date.now()}}function La(t,e){if(!t||!e)return v("\u65E0\u6548\u7684\u5904\u7406\u5668ID\u6216\u914D\u7F6E"),()=>{};let{eventType:s,handler:r,gateCondition:n,priority:o=0}=e;if(!s||typeof r!="function")return v("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u5904\u7406\u5668\u51FD\u6570"),()=>{};$.handlers.set(t,{eventType:s,handler:r,gateCondition:n,priority:o,enabled:!0});let i=Qe(s,async(...a)=>{let l=$.handlers.get(t);!l||!l.enabled||l.gateCondition&&!await Ir(l.gateCondition)||await l.handler(...a)},{priority:o});return v(`\u5DF2\u6CE8\u518C\u89E6\u53D1\u5904\u7406\u5668: ${t}`),()=>{i(),$.handlers.delete(t),v(`\u5DF2\u53D6\u6D88\u89E6\u53D1\u5904\u7406\u5668: ${t}`)}}function Na(t,e){let s=$.handlers.get(t);s&&(s.enabled=e,v(`\u89E6\u53D1\u5904\u7406\u5668 ${t} \u5DF2${e?"\u542F\u7528":"\u7981\u7528"}`))}function ja(){$.handlers.clear(),v("\u5DF2\u79FB\u9664\u6240\u6709\u89E6\u53D1\u5904\u7406\u5668")}function Ua(t){let e=t?.chatId||"chat_default",s=t?.messageId===void 0||t?.messageId===null||t?.messageId===""?"latest":String(t.messageId);return`${e}::${s}`}async function lo(t,e){if(v(`${t}\u89E6\u53D1:`,e),Ma($.gateState.lastGenerationType,$.gateState.lastGenerationParams,$.gateState.lastGenerationDryRun)){v("\u68C0\u6D4B\u5230 quiet / dryRun \u751F\u6210\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u81EA\u52A8\u6267\u884C");return}let s=await Lr({...typeof e=="object"&&e?e:{},triggerEvent:t,messageId:typeof e=="string"||typeof e=="number"?e:e?.messageId||e?.id||""});if(!s?.lastAiMessage){v(`${t} \u540E\u672A\u8BFB\u53D6\u5230\u6700\u65B0 AI \u56DE\u590D\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u6267\u884C`);return}let r=Ua(s);if(J.lastHandledMessageKey===r){v(`\u68C0\u6D4B\u5230\u91CD\u590D\u81EA\u52A8\u89E6\u53D1\uFF0C\u8DF3\u8FC7: ${r}`);return}let n=Ba(se.GENERATION_ENDED);if(n.length===0){v("\u6CA1\u6709\u9700\u8981\u6267\u884C\u7684\u5DE5\u5177");return}J.lastHandledMessageKey=r,v(`\u9700\u8981\u6267\u884C ${n.length} \u4E2A\u5DE5\u5177:`,n.map(o=>o.id)),ne("info",`\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u5F00\u59CB\u81EA\u52A8\u6267\u884C ${n.length} \u4E2A\u5DE5\u5177`,{duration:2400,noticeId:"yyt-tool-batch-start"});for(let o of n)try{let i=await go(o,s);i.success?(v(`\u5DE5\u5177 ${o.id} \u6267\u884C\u6210\u529F`),x.emit(h.TOOL_EXECUTED,{toolId:o.id,result:i.result||i.data||i})):v(`\u5DE5\u5177 ${o.id} \u6267\u884C\u5931\u8D25:`,i.error)}catch(i){console.error(`[ToolTrigger] \u5DE5\u5177\u6267\u884C\u5931\u8D25: ${o.id}`,i)}J.lastExecutionContext=s}function po(){if(J.initialized){v("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316");return}za(),J.initialized=!0,v("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316"),x.emit(h.TOOL_TRIGGER_INITIALIZED)}function za(){let t=Qe(se.GENERATION_ENDED,async s=>{await lo(se.GENERATION_ENDED,s)}),e=Qe(se.MESSAGE_RECEIVED,async s=>{await lo(se.MESSAGE_RECEIVED,s)});J.listeners.set(se.GENERATION_ENDED,t),J.listeners.set(se.MESSAGE_RECEIVED,e)}async function Lr(t){let e=await Or(),s=lt(),r=s?.getContext?.()||null,n=typeof t=="string"||typeof t=="number"?t:t?.messageId||t?.id||"",o=t?.triggerEvent||"GENERATION_ENDED",i=await Ca({preferredMessageId:n,retries:o==="GENERATION_ENDED"?6:2,retryDelayMs:o==="GENERATION_ENDED"?300:120}),a=i.messages||[],l=i.lastUserMessage,c=i.lastAiMessage,y=c?.sourceId??n??"";return{triggeredAt:Date.now(),triggerEvent:o,chatId:Ra(s,r,e),messageId:y,lastAiMessage:c?.content||"",userMessage:l?.content||$.gateState.lastUserMessageText||"",chatMessages:a,input:{userMessage:l?.content||$.gateState.lastUserMessageText||"",lastAiMessage:c?.content||"",extractedContent:"",previousToolOutput:"",context:{character:e?.name||"",chatLength:a.length||0}},config:{},status:"pending"}}function Ba(t){return Tr(t).filter(s=>qe.shouldRunPostResponse(s))}function Es(t,e){try{br(t,e)}catch(s){console.warn("[ToolTrigger] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",t,s)}}async function go(t,e){let s=Date.now(),r=t.id,n=e?.triggerEvent==="MANUAL",o=`yyt-tool-run-${r}`;Es(r,{lastStatus:"running",lastError:"",lastDurationMs:0}),x.emit(h.TOOL_EXECUTION_REQUESTED,{toolId:r,triggerEvent:e?.triggerEvent||"GENERATION_ENDED",context:e}),ne("info",`${n?"\u6B63\u5728\u624B\u52A8\u6267\u884C":"\u5DF2\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u6B63\u5728\u81EA\u52A8\u6267\u884C"} ${t.name}`,{sticky:!0,noticeId:o});try{let i;t.output?.mode===We.POST_RESPONSE_API?i=await qe.runToolPostResponse(t,e):i=await us(r,e);let a=Date.now()-s;if(i?.success){let y=j(r);Es(r,{lastStatus:"success",lastError:"",lastDurationMs:a,successCount:(y?.runtime?.successCount||0)+1});let p=n?`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`:`\u5DF2\u76D1\u542C AI \u56DE\u590D\u5E76\u6267\u884C ${t.name}`;return u("success",p),ne("success",p,{duration:3200,noticeId:o}),{success:!0,duration:a,result:i}}let l=j(r),c=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25";return Es(r,{lastStatus:"error",lastError:c,lastDurationMs:a,errorCount:(l?.runtime?.errorCount||0)+1}),u("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`),ne("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`,{sticky:!0,noticeId:o}),{success:!1,duration:a,error:c,result:i}}catch(i){let a=Date.now()-s,l=j(r),c=i?.message||String(i);throw Es(r,{lastStatus:"error",lastError:c,lastDurationMs:a,errorCount:(l?.runtime?.errorCount||0)+1}),u("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`),ne("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`,{sticky:!0,noticeId:o}),i}}async function Nr(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=j(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return ne("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};if(!qe.shouldRunPostResponse(e))return ne("warning",`${e.name} \u5F53\u524D\u4E3A\u201C\u968F AI \u8F93\u51FA\u201D\uFF0C\u4E0D\u4F1A\u6267\u884C\u989D\u5916\u89E3\u6790`,{duration:3200,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5F53\u524D\u8F93\u51FA\u6A21\u5F0F\u4E0D\u6267\u884C\u989D\u5916\u89E3\u6790"};let s=await Lr({triggerEvent:"MANUAL"});return go(e,s)}async function jr(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=j(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await Lr({triggerEvent:"MANUAL_PREVIEW"});return qe.previewExtraction(e,s)}function Ya(){for(let[t,e]of J.listeners)Ss(t,e);J.listeners.clear(),J.initialized=!1,J.lastExecutionContext=null,J.lastHandledMessageKey="",v("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u9500\u6BC1")}function Ga(){return{initialized:J.initialized,listenersCount:J.listeners.size,lastExecutionContext:J.lastExecutionContext}}async function fo(){if($.isInitialized){v("\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316");return}if(!lt()){v("\u65E0\u6CD5\u83B7\u53D6SillyTavern API\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),setTimeout(fo,1e3);return}$a(),Qe(se.MESSAGE_SENT,async e=>{let r=(await Dr({depth:10,includeAssistant:!1,includeSystem:!1}))?.messages?.filter(n=>n.role==="user").pop();At({lastUserSendIntentAt:Date.now(),lastUserMessageId:e,lastUserMessageAt:Date.now(),lastUserMessageText:r?.content||$.gateState.lastUserMessageText||""}),v(`\u7528\u6237\u6D88\u606F\u5DF2\u53D1\u9001: ${e}`)}),Qe(se.GENERATION_STARTED,(e,s,r)=>{At({lastGenerationType:e,lastGenerationParams:s||null,lastGenerationDryRun:!!r,isGenerating:!0}),v(`\u751F\u6210\u5F00\u59CB: ${e}`)}),Qe(se.GENERATION_ENDED,()=>{At({lastGenerationAt:Date.now(),isGenerating:!1}),v("\u751F\u6210\u7ED3\u675F")}),po(),$.isInitialized=!0,v("\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function Fa(t){$.debugMode=t}var se,$,J,Ur=T(()=>{G();Et();Er();$r();oe();se={MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHARACTER_LOADED:"CHARACTER_LOADED",CHARACTER_DELETED:"CHARACTER_DELETED",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",WORLDBOOK_UPDATED:"WORLDBOOK_UPDATED",EXTENSIONS_LOADED:"EXTENSIONS_LOADED",SETTINGS_LOADED:"SETTINGS_LOADED"},$={listeners:new Map,handlers:new Map,gateState:{lastUserSendIntentAt:0,lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationType:null,lastGenerationParams:null,lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1},isInitialized:!1,debugMode:!1};J={initialized:!1,listeners:new Map,lastExecutionContext:null,lastHandledMessageKey:""}});var ho={};N(ho,{TOOL_CONFIG_PANEL_STYLES:()=>bo,createToolConfigPanel:()=>ke,default:()=>Ha});function ke(t){let{id:e,toolId:s,postResponseHint:r,extractionPlaceholder:n,previewDialogId:o,previewTitle:i="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:s,render(){let a=j(this.toolId);if(!a)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let l=this._getApiPresets(),c=a.output?.apiPreset||a.apiPreset||"",y=this._getBypassPresets(),p=a.output?.mode||"follow_ai",b=a.bypass?.enabled||!1,g=a.bypass?.presetId||"",S=a.runtime?.lastStatus||"idle",te=a.runtime?.lastRunAt?new Date(a.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",M=a.runtime?.lastError||"",V=a.extraction||{},ve=Array.isArray(V.selectors)?V.selectors.join(`
`):"",re=p==="post_response_api"?r:"\u968F AI \u8F93\u51FA\u5373\u4E0D\u542F\u7528\u989D\u5916\u5DE5\u5177\u94FE\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\u3002";return`
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
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${re}</div>
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
                ${l.map(z=>`
                  <option value="${f(z.name)}" ${z.name===c?"selected":""}>
                    ${f(z.name)}
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
                <input type="checkbox" id="${d}-tool-bypass-enabled" ${b?"checked":""}>
                <span>\u542F\u7528\u7834\u9650\u8BCD</span>
              </label>
            </div>
            <div class="yyt-form-group yyt-bypass-preset-select ${b?"":"yyt-hidden"}">
              <label>\u7ED1\u5B9A\u7834\u9650\u8BCD\u9884\u8BBE</label>
              <select class="yyt-select" id="${d}-tool-bypass-preset">
                <option value="">\u9009\u62E9\u9884\u8BBE</option>
                ${y.map(z=>`
                  <option value="${f(z.id)}" ${z.id===g?"selected":""}>
                    ${f(z.name)}${z.isDefault?" [\u9ED8\u8BA4]":""}
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
                        placeholder="${f(n)}">${f(ve)}</textarea>
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
              <div class="yyt-tool-compact-hint">\u8FD9\u91CC\u76F4\u63A5\u586B\u5199\u53D1\u9001\u7ED9\u989D\u5916\u89E3\u6790\u6A21\u578B\u7684\u5B8C\u6574\u6A21\u677F\uFF1B\u53EF\u5728\u6B63\u6587\u4E2D\u663E\u5F0F\u4F7F\u7528 <code>{{toolContentMacro}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{userMessage}}</code> \u7B49\u5B8F\u3002</div>
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
                  <span class="yyt-tool-runtime-value">${f(te)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${a.runtime?.successCount||0} / ${a.runtime?.errorCount||0}</span>
                </div>
                ${M?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${f(M)}</span>
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
            \u8BF4\u660E\uFF1A\u5DE5\u5177\u4F1A\u628A\u5F53\u524D\u6A21\u677F\u89E3\u6790\u540E\u4F5C\u4E3A\u6700\u7EC8\u7528\u6237\u8BF7\u6C42\u53D1\u9001\u7ED9\u989D\u5916\u6A21\u578B\uFF1B\u82E5\u542F\u7528\u4E86\u7834\u9650\u8BCD\uFF0C\u5219\u4F1A\u4F5C\u4E3A\u524D\u7F6E\u6D88\u606F\u4E00\u5E76\u53D1\u9001\u3002\u53EF\u7528\u5B8F\u5305\u62EC <code>{{toolPromptMacro}}</code>\u3001<code>{{toolContentMacro}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{recentMessagesText}}</code>\u3001<code>{{rawRecentMessagesText}}</code>\u3001<code>{{userMessage}}</code>\u3001<code>{{toolName}}</code>\u3001<code>{{toolId}}</code>\u3002
          </div>
        </div>
      `},_getApiPresets(){try{return et()||[]}catch{return[]}},_getBypassPresets(){try{return vr()||[]}catch{return[]}},_getFormData(a){let l=a.find(`#${d}-tool-output-mode`).val()||"follow_ai",c=a.find(`#${d}-tool-bypass-enabled`).is(":checked"),y=l==="post_response_api",p=(a.find(`#${d}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(b=>b.trim()).filter(Boolean);return{enabled:!0,promptTemplate:a.find(`#${d}-tool-prompt-template`).val()||"",apiPreset:a.find(`#${d}-tool-api-preset`).val()||"",extractTags:p,trigger:{event:"GENERATION_ENDED",enabled:y},output:{mode:l,apiPreset:a.find(`#${d}-tool-api-preset`).val()||"",overwrite:!0,enabled:y},bypass:{enabled:c,presetId:c&&a.find(`#${d}-tool-bypass-preset`).val()||""},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(a.find(`#${d}-tool-max-messages`).val(),10)||5),selectors:p}}},_showExtractionPreview(a,l){if(!_())return;let y=`${d}-${o}`,p=Array.isArray(l.messageEntries)?l.messageEntries:[],b=p.length>0?`
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
        `:"";a.append(hn({id:y,title:i,width:"720px",wide:!0,body:`
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
          ${b}
        `})),xn(a,y,{onSave:g=>g()}),a.find(`#${y}-save`).text("\u5173\u95ED"),a.find(`#${y}-cancel`).remove()},bindEvents(a){let l=_();!l||!C(a)||(a.find(`#${d}-tool-output-mode`).on("change",()=>{let y=(a.find(`#${d}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?r:"\u968F AI \u8F93\u51FA\u5373\u4E0D\u542F\u7528\u989D\u5916\u5DE5\u5177\u94FE\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\u3002";a.find(".yyt-tool-mode-hint").text(y)}),a.find(`#${d}-tool-bypass-enabled`).on("change",c=>{let y=l(c.currentTarget).is(":checked");a.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!y)}),a.find(`#${d}-tool-save`).on("click",()=>{this._saveConfig(a,{silent:!1})}),a.find(`#${d}-tool-reset-template`).on("click",()=>{let y=ls()[this.toolId];y?.promptTemplate&&(a.find(`#${d}-tool-prompt-template`).val(y.promptTemplate),u("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),a.find(`#${d}-tool-run-manual`).on("click",async()=>{if(this._saveConfig(a,{silent:!0}))try{let y=await Nr(this.toolId);!y?.success&&y?.error&&ne("warning",y.error,{duration:3200,noticeId:`yyt-tool-run-${this.toolId}`})}catch(y){u("error",y?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{this.renderTo(a)}}),a.find(`#${d}-tool-preview-extraction`).on("click",async()=>{if(this._saveConfig(a,{silent:!0}))try{let y=await jr(this.toolId);if(!y?.success){u("error",y?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}this._showExtractionPreview(a,y)}catch(y){u("error",y?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}))},_saveConfig(a,l={}){let c=this._getFormData(a),{silent:y=!1}=l,p=be(this.toolId,c);return p?y||u("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):u("error","\u4FDD\u5B58\u5931\u8D25"),p},destroy(a){!_()||!C(a)||a.find("*").off()},getStyles(){return bo},renderTo(a){a.html(this.render({})),this.bindEvents(a,{})}}}var bo,Ha,Pt=T(()=>{oe();Et();Wt();St();Ur();bo=`
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
`;Ha=ke});var Re,zr=T(()=>{Pt();Re=ke({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var Ie,Br=T(()=>{Pt();Ie=ke({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var De,Yr=T(()=>{Pt();De=ke({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"})});var xo={};N(xo,{BypassPanel:()=>ct,default:()=>Wa});var ct,Wa,_s=T(()=>{G();St();oe();ct={id:"bypassPanel",render(t){let e=w.getPresetList(),s=w.getDefaultPresetId();return`
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
        <div class="yyt-bypass-editor" id="yyt-bypass-editor">
          <div class="yyt-bypass-empty">
            <i class="fa-solid fa-shield-halved"></i>
            <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
          </div>
        </div>
      </div>
    `},_renderPresetItem(t,e){let s=xe&&xe[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${f(t.name)}</span>
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
          <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
        </div>
      `;let e=w.getDefaultPresetId()===t.id,s=xe&&xe[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${f(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
          <input type="text" class="yyt-input" id="yyt-bypass-description" 
                 value="${f(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
        </div>
        
        <div class="yyt-bypass-messages-header">
          <span>\u6D88\u606F\u5217\u8868</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-add-message">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u6D88\u606F
          </button>
        </div>
        
        <div class="yyt-bypass-messages" id="yyt-bypass-messages">
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
            <select class="yyt-select yyt-bypass-role-select">
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${f(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let s=_();!s||!C(t)||(this._bindPresetListEvents(t,s),this._bindEditorEvents(t,s),this._bindFileEvents(t,s))},_bindPresetListEvents(t,e){t.on("click",".yyt-bypass-preset-item",s=>{if(e(s.target).closest(".yyt-bypass-quick-delete").length)return;let r=e(s.currentTarget).data("presetId");this._selectPreset(t,e,r)}),t.on("click",".yyt-bypass-quick-delete",s=>{s.stopPropagation();let r=e(s.currentTarget).data("presetId");if(!r||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let n=w.deletePreset(r);n.success?(t.find(".yyt-bypass-editor-content").data("presetId")===r&&t.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),u("success","\u9884\u8BBE\u5DF2\u5220\u9664")):u("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.find("#yyt-bypass-add").on("click",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click",".yyt-bypass-delete-message",s=>{let r=e(s.currentTarget).closest(".yyt-bypass-message"),n=r.data("messageId");r.remove()}),t.on("change",".yyt-bypass-message-enabled",s=>{e(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(s.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.find("#yyt-bypass-import").on("click",()=>{t.find("#yyt-bypass-import-file").click()}),t.find("#yyt-bypass-import-file").on("change",async s=>{let r=s.target.files[0];if(r){try{let n=await Pe(r),o=w.importPresets(n);u(o.success?"success":"error",o.message),o.success&&this.renderTo(t)}catch(n){u("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}e(s.target).val("")}}),t.find("#yyt-bypass-export").on("click",()=>{try{let s=w.exportPresets();Ae(s,`bypass_presets_${Date.now()}.json`),u("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){u("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(t,e,s){let r=w.getPreset(s);r&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),t.find("#yyt-bypass-editor").html(this._renderEditor(r)))},_createNewPreset(t,e){let s=`bypass_${Date.now()}`,r=w.createPreset({id:s,name:"\u65B0\u7834\u9650\u8BCD\u9884\u8BBE",description:"",messages:[]});r.success?(this.renderTo(t),this._selectPreset(t,e,s),u("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):u("error",r?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content"),r=s.data("presetId");if(!r)return;let n=s.find(".yyt-bypass-name-input").val().trim(),o=s.find("#yyt-bypass-description").val().trim();if(!n){u("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let i=[];s.find(".yyt-bypass-message").each(function(){let l=e(this);i.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let a=w.updatePreset(r,{name:n,description:o,messages:i});a.success?(u("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):u("error",a?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let n=w.deletePreset(r);n.success?(this.renderTo(t),u("success","\u9884\u8BBE\u5DF2\u5220\u9664")):u("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r)return;let n=`bypass_${Date.now()}`,o=w.duplicatePreset(r,n);o.success?(this.renderTo(t),this._selectPreset(t,e,n),u("success","\u9884\u8BBE\u5DF2\u590D\u5236")):u("error",o?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");r&&(w.setDefaultPresetId(r),t.find(".yyt-bypass-preset-item").removeClass("yyt-default"),t.find(`.yyt-bypass-preset-item[data-preset-id="${r}"]`).addClass("yyt-default"),t.find(".yyt-bypass-default-badge").remove(),t.find(`.yyt-bypass-preset-item[data-preset-id="${r}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>'),u("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE"))},_addMessage(t,e){let s=t.find("#yyt-bypass-messages"),r={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};s.append(this._renderMessageItem(r))},_refreshPresetList(t,e){let s=w.getPresetList(),r=w.getDefaultPresetId();t.find(".yyt-bypass-preset-list").html(s.map(n=>this._renderPresetItem(n,n.id===r)).join(""))},destroy(t){!_()||!C(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},Wa=ct});function As(){F.register(pe.id,pe),F.register(fe.id,fe),F.register(me.id,me),F.register(Re.id,Re),F.register(Ie.id,Ie),F.register(De.id,De),F.register(ct.id,ct),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function Gr(t={}){F.init(t),As(),F.injectStyles(),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}var vo=T(()=>{Zs();er();ir();pr();zr();Br();Yr();_s();oe();Zs();er();ir();pr();zr();Br();Yr();_s()});var $o={};N($o,{ApiPresetPanel:()=>pe,RegexExtractPanel:()=>fe,SCRIPT_ID:()=>d,StatusBlockPanel:()=>Ie,SummaryToolPanel:()=>Re,ToolManagePanel:()=>me,YouyouReviewPanel:()=>De,default:()=>qa,escapeHtml:()=>f,fillFormWithConfig:()=>st,getCurrentTab:()=>Po,getFormApiConfig:()=>ze,getJQuery:()=>_,getRegexStyles:()=>_o,getStyles:()=>So,getToolStyles:()=>Ao,initUI:()=>Gr,isContainerValid:()=>C,registerComponents:()=>As,render:()=>wo,renderRegex:()=>To,renderTool:()=>Eo,setCurrentTab:()=>Co,showToast:()=>u,uiManager:()=>F});function Fr(t,e){let s=_();return s?t?typeof t=="string"?s(t):t?.jquery?t:s(t):e:(console.error("[YouYouToolkit] jQuery not available"),null)}function wo(t){if(Ct=Fr(t,Ct),!Ct||!Ct.length){console.error("[YouYouToolkit] Container not found or invalid");return}pe.renderTo(Ct)}function To(t){if($t=Fr(t,$t),!$t||!$t.length){console.error("[YouYouToolkit] Regex container not found");return}fe.renderTo($t)}function Eo(t){if(Mt=Fr(t,Mt),!Mt||!Mt.length){console.error("[YouYouToolkit] Tool container not found");return}me.renderTo(Mt)}function So(){return pe.getStyles()}function _o(){return fe.getStyles()}function Ao(){return[me.getStyles(),Re.getStyles(),Ie.getStyles(),De.getStyles()].join(`
`)}function Po(){return F.getCurrentTab()}function Co(t){F.switchTab(t)}var Ct,$t,Mt,qa,Mo=T(()=>{vo();Ct=null,$t=null,Mt=null;qa={render:wo,renderRegex:To,renderTool:Eo,getStyles:So,getRegexStyles:_o,getToolStyles:Ao,getCurrentTab:Po,setCurrentTab:Co,uiManager:F,ApiPresetPanel:pe,RegexExtractPanel:fe,ToolManagePanel:me,SummaryToolPanel:Re,StatusBlockPanel:Ie,YouyouReviewPanel:De,registerComponents:As,initUI:Gr,SCRIPT_ID:d,escapeHtml:f,showToast:u,getJQuery:_,isContainerValid:C,getFormApiConfig:ze,fillFormWithConfig:st}});var Ro={};N(Ro,{WindowManager:()=>Ps,closeWindow:()=>Ka,createWindow:()=>Va,windowManager:()=>Z});function Ja(){if(Z.stylesInjected)return;Z.stylesInjected=!0;let t=`
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
  `,e=document.createElement("style");e.id=Qa+"_styles",e.textContent=t,(document.head||document.documentElement).appendChild(e)}function Va(t){let{id:e,title:s="\u7A97\u53E3",content:r="",width:n=900,height:o=700,modal:i=!1,resizable:a=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:y=!0,onClose:p,onReady:b}=t;Ja();let g=window.jQuery||window.parent?.jQuery;if(!g)return console.error("[WindowManager] jQuery not available"),null;if(Z.isOpen(e))return Z.bringToFront(e),Z.getWindow(e);let S=window.innerWidth||1200,te=window.innerHeight||800,M=S<=1100,V=null,ve=!1;y&&(V=Z.getState(e),V&&!M&&(ve=!0));let re,z;ve&&V.width&&V.height?(re=Math.max(400,Math.min(V.width,S-40)),z=Math.max(300,Math.min(V.height,te-40))):(re=Math.max(400,Math.min(n,S-40)),z=Math.max(300,Math.min(o,te-40)));let Je=Math.max(20,Math.min((S-re)/2,S-re-20)),Xr=Math.max(20,Math.min((te-z)/2,te-z-20)),Zo=l&&!M,ei=`
    <div class="yyt-window" id="${e}" style="left:${Je}px; top:${Xr}px; width:${re}px; height:${z}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${Xa(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${Zo?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
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
  `,Le=null;i&&(Le=g(`<div class="yyt-window-overlay" data-for="${e}"></div>`),g(document.body).append(Le));let E=g(ei);g(document.body).append(E),Z.register(e,E),E.on("mousedown",()=>Z.bringToFront(e));let we=!1,Ne={left:Je,top:Xr,width:re,height:z},Nt=()=>{Ne={left:parseInt(E.css("left")),top:parseInt(E.css("top")),width:E.width(),height:E.height()},E.addClass("maximized"),E.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),we=!0},ti=()=>{E.removeClass("maximized"),E.css({left:Ne.left+"px",top:Ne.top+"px",width:Ne.width+"px",height:Ne.height+"px"}),E.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),we=!1};E.find(".yyt-window-btn.maximize").on("click",()=>{we?ti():Nt()}),(M&&l||ve&&V.isMaximized&&l||c&&l)&&Nt(),E.find(".yyt-window-btn.close").on("click",()=>{if(y&&l){let W={width:we?Ne.width:E.width(),height:we?Ne.height:E.height(),isMaximized:we};Z.saveState(e,W)}p&&p(),Le&&Le.remove(),E.remove(),Z.unregister(e),g(document).off(".yytWindowDrag"+e),g(document).off(".yytWindowResize"+e)}),Le&&Le.on("click",W=>{W.target,Le[0]});let jt=!1,Zr,en,tn,sn;if(E.find(".yyt-window-header").on("mousedown",W=>{g(W.target).closest(".yyt-window-controls").length||we||(jt=!0,Zr=W.clientX,en=W.clientY,tn=parseInt(E.css("left")),sn=parseInt(E.css("top")),g(document.body).css("user-select","none"))}),g(document).on("mousemove.yytWindowDrag"+e,W=>{if(!jt)return;let q=W.clientX-Zr,Ut=W.clientY-en;E.css({left:Math.max(0,tn+q)+"px",top:Math.max(0,sn+Ut)+"px"})}),g(document).on("mouseup.yytWindowDrag"+e,()=>{jt&&(jt=!1,g(document.body).css("user-select",""))}),a){let W=!1,q="",Ut,rn,zt,Bt,Os,Ls;E.find(".yyt-window-resize-handle").on("mousedown",function(Ve){we||(W=!0,q="",g(this).hasClass("se")?q="se":g(this).hasClass("e")?q="e":g(this).hasClass("s")?q="s":g(this).hasClass("w")?q="w":g(this).hasClass("n")?q="n":g(this).hasClass("nw")?q="nw":g(this).hasClass("ne")?q="ne":g(this).hasClass("sw")&&(q="sw"),Ut=Ve.clientX,rn=Ve.clientY,zt=E.width(),Bt=E.height(),Os=parseInt(E.css("left")),Ls=parseInt(E.css("top")),g(document.body).css("user-select","none"),Ve.stopPropagation())}),g(document).on("mousemove.yytWindowResize"+e,Ve=>{if(!W)return;let Ns=Ve.clientX-Ut,js=Ve.clientY-rn,nn=400,on=300,Us=zt,zs=Bt,an=Os,ln=Ls;if(q.includes("e")&&(Us=Math.max(nn,zt+Ns)),q.includes("s")&&(zs=Math.max(on,Bt+js)),q.includes("w")){let ut=zt-Ns;ut>=nn&&(Us=ut,an=Os+Ns)}if(q.includes("n")){let ut=Bt-js;ut>=on&&(zs=ut,ln=Ls+js)}E.css({width:Us+"px",height:zs+"px",left:an+"px",top:ln+"px"})}),g(document).on("mouseup.yytWindowResize"+e,()=>{W&&(W=!1,g(document.body).css("user-select",""))})}return E.on("remove",()=>{g(document).off(".yytWindowDrag"+e),g(document).off(".yytWindowResize"+e)}),b&&setTimeout(()=>b(E),50),E}function Ka(t){let e=Z.getWindow(t);if(e){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${t}"]`).remove(),s(document).off(".yytWindowDrag"+t),s(document).off(".yytWindowResize"+t)),e.remove(),Z.unregister(t)}}function Xa(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}var Qa,ko,Ps,Z,Io=T(()=>{Ee();Qa="youyou_toolkit_window_manager",ko="window_states",Ps=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,s){this.topZIndex++,this.windows.set(e,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let s=this.windows.get(e);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,s)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,s){let r=this.loadStates();r[e]={...s,updatedAt:Date.now()},pt.set(ko,r)}loadStates(){return pt.get(ko)||{}}getState(e){return this.loadStates()[e]||null}},Z=new Ps});var Do={};N(Do,{DEFAULT_PROMPT_SEGMENTS:()=>Cs,PromptEditor:()=>$s,default:()=>il,getPromptEditorStyles:()=>sl,messagesToSegments:()=>ol,segmentsToMessages:()=>nl,validatePromptSegments:()=>rl});function sl(){return`
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
  `}function rl(t){let e=[];return Array.isArray(t)?(t.forEach((s,r)=>{s.id||e.push(`\u6BB5\u843D ${r+1} \u7F3A\u5C11ID`),s.role||e.push(`\u6BB5\u843D ${r+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(s.role)||e.push(`\u6BB5\u843D ${r+1} \u7684role\u503C\u65E0\u6548: ${s.role}`)}),{valid:e.length===0,errors:e}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function nl(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function ol(t){return Array.isArray(t)?t.map((e,s)=>({id:`segment_${s}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...Cs]}var Za,el,tl,Cs,$s,il,Oo=T(()=>{Za="youyou_toolkit_prompt_editor",el={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},tl={system:"fa-server",ai:"fa-robot",user:"fa-user"},Cs=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],$s=class{constructor(e={}){this.containerId=e.containerId||Za,this.segments=e.segments||[...Cs],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...Cs],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let s=el[e.type]||e.type,r=tl[e.type]||"fa-file",n=e.mainSlot==="A"||e.isMain,o=e.mainSlot==="B"||e.isMain2,i=n?"var(--yyt-accent, #7bb7ff)":o?"#ffb74d":"",a=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${n?"yyt-main-a":""} ${o?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
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
    `}bindEvents(){this.$container&&(this.$container.find(".yyt-prompt-toggle").on("click",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.find(".yyt-prompt-delete").on("click",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.find(".yyt-prompt-role").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),r=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{role:r})}),this.$container.find(".yyt-prompt-main-slot").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),r=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:r})}),this.$container.find(".yyt-prompt-textarea").on("input",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.find(`#${this.containerId}-add-segment`).on("click",()=>{this.addSegment()}),this.$container.find(`#${this.containerId}-import-prompt`).on("click",()=>{this.importPrompt()}),this.$container.find(`#${this.containerId}-export-prompt`).on("click",()=>{this.exportPrompt()}))}addSegment(e=null){let s=`segment_${Date.now()}`,r=e||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};r.id||(r.id=s),this.segments.push(r),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let s=this.segments.findIndex(n=>n.id===e);if(s===-1)return;if(this.segments[s].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,s){let r=this.segments.find(n=>n.id===e);r&&(Object.assign(r,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=s=>{let r=s.target.files[0];if(!r)return;let n=new FileReader;n.onload=o=>{try{let i=JSON.parse(o.target.result);Array.isArray(i)?(this.setSegments(i),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(i){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",i)}},n.readAsText(r)},e.click()}exportPrompt(){let e=this.getSegments(),s=JSON.stringify(e,null,2),r=new Blob([s],{type:"application/json"}),n=URL.createObjectURL(r),o=document.createElement("a");o.href=n,o.download=`prompt_group_${Date.now()}.json`,o.click(),URL.revokeObjectURL(n),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}};il=$s});var Wr={};N(Wr,{SettingsPanel:()=>No,THEME_CONFIGS:()=>Hr,applyTheme:()=>Lo,default:()=>al});function Lo(t){let e=document.documentElement,s=Hr[t]||Hr["dark-blue"];Object.entries(s).forEach(([r,n])=>{e.style.setProperty(r,n)}),e.setAttribute("data-yyt-theme",t),t==="light"?e.style.setProperty("--yyt-text","rgba(15, 23, 42, 0.95)"):e.style.setProperty("--yyt-text","rgba(255, 255, 255, 0.95)")}var Hr,No,al,qr=T(()=>{G();gs();oe();Hr={"dark-blue":{"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.7)","--yyt-text-muted":"rgba(15, 23, 42, 0.45)","--yyt-surface":"rgba(0, 0, 0, 0.03)","--yyt-surface-hover":"rgba(0, 0, 0, 0.06)","--yyt-surface-active":"rgba(0, 0, 0, 0.08)","--yyt-border":"rgba(0, 0, 0, 0.08)","--yyt-border-strong":"rgba(0, 0, 0, 0.15)"}};No={id:"settingsPanel",render(t){let e=Ce.getSettings();return`
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
          ${this._renderExecutorTab(e.executor)}
          ${this._renderListenerTab(e.listener)}
          ${this._renderDebugTab(e.debug)}
          ${this._renderUiTab(e.ui)}
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
    `},_renderListenerTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="listener">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u4E8B\u4EF6\u76D1\u542C</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-listenGenerationEnded" 
                     ${t.listenGenerationEnded?"checked":""}>
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
                     ${t.ignoreQuietGeneration?"checked":""}>
              <span>\u5FFD\u7565\u9759\u9ED8\u751F\u6210</span>
            </label>
            <div class="yyt-form-hint">Quiet \u6A21\u5F0F\u7684\u751F\u6210\u4E0D\u4F1A\u89E6\u53D1\u5DE5\u5177</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-ignoreAutoTrigger" 
                     ${t.ignoreAutoTrigger?"checked":""}>
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
                   value="${t.debounceMs}" min="0" max="5000" step="100">
          </div>
        </div>
      </div>
    `},_renderDebugTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u65E5\u5FD7\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-enableDebugLog" 
                     ${t.enableDebugLog?"checked":""}>
              <span>\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7</span>
            </label>
            <div class="yyt-form-hint">\u5728\u63A7\u5236\u53F0\u8F93\u51FA\u8BE6\u7EC6\u7684\u8C03\u8BD5\u4FE1\u606F</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-saveExecutionHistory" 
                     ${t.saveExecutionHistory?"checked":""}>
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
                     ${t.showRuntimeBadge?"checked":""}>
              <span>\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0</span>
            </label>
            <div class="yyt-form-hint">\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668</div>
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
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-compactMode" 
                     ${t.compactMode?"checked":""}>
              <span>\u7D27\u51D1\u6A21\u5F0F</span>
            </label>
            <div class="yyt-form-hint">\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-animationEnabled" 
                     ${t.animationEnabled?"checked":""}>
              <span>\u542F\u7528\u52A8\u753B\u6548\u679C</span>
            </label>
            <div class="yyt-form-hint">\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B</div>
          </div>
        </div>
      </div>
    `},bindEvents(t,e){let s=_();!s||!C(t)||(t.find(".yyt-settings-tab").on("click",r=>{let n=s(r.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),s(r.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${n}"]`).addClass("yyt-active")}),t.find("#yyt-settings-save").on("click",()=>{this._saveSettings(t,s)}),t.find("#yyt-settings-reset").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(Ce.resetSettings(),this.renderTo(t),u("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}))},_saveSettings(t,e){let s={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val())||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val())||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val())||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val())||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},listener:{listenGenerationEnded:t.find("#yyt-setting-listenGenerationEnded").is(":checked"),ignoreQuietGeneration:t.find("#yyt-setting-ignoreQuietGeneration").is(":checked"),ignoreAutoTrigger:t.find("#yyt-setting-ignoreAutoTrigger").is(":checked"),debounceMs:parseInt(t.find("#yyt-setting-debounceMs").val())||300},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};Ce.saveSettings(s),Lo(s.ui.theme),document.documentElement.classList.toggle("yyt-compact-mode",s.ui.compactMode),document.documentElement.classList.toggle("yyt-no-animation",!s.ui.animationEnabled),u("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},destroy(t){!_()||!C(t)||t.find("*").off()},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},al=No});var L="youyou_toolkit",Vr="0.6.2",kt=`${L}-menu-item`,Qr=`${L}-menu-container`,ll=`${L}-popup`,O=typeof window.parent<"u"?window.parent:window,Ms=null,ye=null,Rt=null,Y=null,zo=null,Is=null,Bo=null,It=null,Dt=null,ee=null,X=null,Ot=null,Yo=null,Go=null,Fo=null,Ho=null,ks=null,jo=new Map;async function dt(){try{return Ms=await Promise.resolve().then(()=>(ft(),un)),ye=await Promise.resolve().then(()=>(Yt(),mn)),Rt=await Promise.resolve().then(()=>(Wt(),bn)),Y=await Promise.resolve().then(()=>(Mo(),$o)),zo=await Promise.resolve().then(()=>(ns(),kn)),Is=await Promise.resolve().then(()=>(is(),Rn)),Bo=await Promise.resolve().then(()=>(Er(),Zn)),It=await Promise.resolve().then(()=>(Ur(),mo)),Dt=await Promise.resolve().then(()=>(Io(),Ro)),ee=await Promise.resolve().then(()=>(Et(),Qn)),X=await Promise.resolve().then(()=>(Oo(),Do)),Ot=await Promise.resolve().then(()=>(gs(),eo)),Yo=await Promise.resolve().then(()=>(St(),Jn)),Go=await Promise.resolve().then(()=>(Pr(),no)),Fo=await Promise.resolve().then(()=>(Ar(),so)),Ho=await Promise.resolve().then(()=>(Cr(),io)),ks=await Promise.resolve().then(()=>($r(),ao)),ks?.toolOutputService&&ye&&ks.toolOutputService.setApiConnection(ye),!0}catch(t){return console.warn(`[${L}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,t),!1}}function B(...t){console.log(`[${L}]`,...t)}function Wo(...t){console.error(`[${L}]`,...t)}function Uo(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}async function cl(){let t=`${L}-styles`,e=O.document||document;if(e.getElementById(t))return;let s="";try{let n=await fetch("./styles/main.css");n.ok&&(s=await n.text())}catch{B("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F")}s||(s=dl());let r=e.createElement("style");r.id=t,r.textContent=s,(e.head||e.documentElement).appendChild(r),B("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function dl(){return`
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
    #${Qr} { display: flex; align-items: center; }
    
    #${kt} {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 14px; cursor: pointer;
      transition: all 0.2s ease; border-radius: 8px; margin: 2px;
    }
    
    #${kt}:hover {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
    }
    
    #${kt} .fa-fw {
      font-size: 16px; color: var(--yyt-accent);
      filter: drop-shadow(0 0 6px var(--yyt-accent-glow));
    }
    
    #${kt} span { font-weight: 500; letter-spacing: 0.3px; }
    
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
  `}var A=null,Oe=null,yt="apiPresets",Ds={};function Rs(){A&&(A.remove(),A=null),Oe&&(Oe.remove(),Oe=null),B("\u5F39\u7A97\u5DF2\u5173\u95ED")}function qo(t){yt=t;let e=O.jQuery||window.jQuery;if(!e||!A)return;e(A).find(".yyt-main-nav-item").removeClass("active"),e(A).find(`.yyt-main-nav-item[data-tab="${t}"]`).addClass("active");let s=ee?.getToolConfig(t);s?.hasSubTabs?(e(A).find(".yyt-sub-nav").show(),Jo(t,s.subTabs)):e(A).find(".yyt-sub-nav").hide(),e(A).find(".yyt-tab-content").removeClass("active"),e(A).find(`.yyt-tab-content[data-tab="${t}"]`).addClass("active"),Vo(t)}function Qo(t,e){Ds[t]=e;let s=O.jQuery||window.jQuery;!s||!A||(s(A).find(".yyt-sub-nav-item").removeClass("active"),s(A).find(`.yyt-sub-nav-item[data-subtab="${e}"]`).addClass("active"),Kr(t,e))}function Jo(t,e){let s=O.jQuery||window.jQuery;if(!s||!A||!e)return;let r=Ds[t]||e[0]?.id,n=e.map(o=>`
    <div class="yyt-sub-nav-item ${o.id===r?"active":""}" data-subtab="${o.id}">
      <i class="fa-solid ${o.icon||"fa-file"}"></i>
      <span>${o.name}</span>
    </div>
  `).join("");s(A).find(".yyt-sub-nav").html(n),s(A).find(".yyt-sub-nav-item").on("click",function(){let o=s(this).data("subtab");Qo(t,o)})}async function Vo(t){let e=O.jQuery||window.jQuery;if(!e||!A)return;let s=e(A).find(`.yyt-tab-content[data-tab="${t}"]`);if(!s.length)return;let r=ee?.getToolConfig(t);switch(t){case"apiPresets":Y&&Y.render(s);break;case"regexExtract":Y&&Y.renderRegex(s);break;case"tools":if(r?.hasSubTabs&&r.subTabs?.length>0){let n=Ds[t]||r.subTabs[0].id;Kr(t,n)}else s.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":await yl(s);break;case"settings":await ul(s);break;default:gl(t,s);break}}async function yl(t){if(O.jQuery||window.jQuery)try{let{BypassPanel:s}=await Promise.resolve().then(()=>(_s(),xo)),r=`${L}-bypass-styles`,n=O.document||document;if(!n.getElementById(r)&&s.getStyles){let o=n.createElement("style");o.id=r,o.textContent=s.getStyles(),(n.head||n.documentElement).appendChild(o)}s.renderTo(t)}catch(s){console.error(`[${L}] \u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,s),t.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}async function ul(t){if(O.jQuery||window.jQuery)try{let{SettingsPanel:s}=await Promise.resolve().then(()=>(qr(),Wr)),r=`${L}-settings-styles`,n=O.document||document;if(!n.getElementById(r)&&s.getStyles){let o=n.createElement("style");o.id=r,o.textContent=s.getStyles(),(n.head||n.documentElement).appendChild(o)}s.renderTo(t)}catch(s){console.error(`[${L}] \u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,s),t.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function Kr(t,e){let s=O.jQuery||window.jQuery;if(!s||!A)return;let r=s(A).find(`.yyt-tab-content[data-tab="${t}"]`);if(!r.length)return;let n=ee?.getToolConfig(t);if(n?.hasSubTabs){let i=n.subTabs?.find(a=>a.id===e);if(i){let a=r.find(".yyt-sub-content");switch(a.length||(r.html('<div class="yyt-sub-content"></div>'),a=r.find(".yyt-sub-content")),i.component){case"SummaryToolPanel":Y?.SummaryToolPanel?Y.SummaryToolPanel.renderTo(a):a.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"StatusBlockPanel":Y?.StatusBlockPanel?Y.StatusBlockPanel.renderTo(a):a.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"YouyouReviewPanel":Y?.YouyouReviewPanel?Y.YouyouReviewPanel.renderTo(a):a.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"GenericToolConfigPanel":pl(i,a);break;default:a.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}return}let o=r.find(".yyt-sub-content");if(o.length)switch(e){case"config":fl(t,o);break;case"prompts":ml(t,o);break;case"presets":bl(t,o);break;default:o.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}async function pl(t,e){if(!(!(O.jQuery||window.jQuery)||!e?.length||!t?.id))try{let r=jo.get(t.id);if(!r){let o=(await Promise.resolve().then(()=>(Pt(),ho)))?.createToolConfigPanel;if(typeof o!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");r=o({id:`${t.id}Panel`,toolId:t.id,postResponseHint:`\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${t.name||t.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${t.id}-extraction-preview`,previewTitle:`${t.name||t.id} \u63D0\u53D6\u9884\u89C8`}),jo.set(t.id,r)}r.renderTo(e)}catch(r){console.error(`[${L}] \u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,r),e.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function gl(t,e){if(!(O.jQuery||window.jQuery))return;let r=ee?.getToolConfig(t);if(!r){e.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let n=Ds[t]||r.subTabs?.[0]?.id||"config";e.html(`
    <div class="yyt-tool-window">
      <div class="yyt-sub-content" data-subtab="${n}">
        <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
      </div>
    </div>
  `),Kr(t,n)}function fl(t,e){if(!(O.jQuery||window.jQuery))return;let r=Is?.getTool(t),n=Rt?.getAllPresets()||[],o=ee?.getToolApiPreset(t)||"",i=n.map(a=>`<option value="${Uo(a.name)}" ${a.name===o?"selected":""}>${Uo(a.name)}</option>`).join("");e.html(`
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
  `),e.find("#yyt-save-tool-preset").on("click",function(){let a=e.find("#yyt-tool-api-preset").val();ee?.setToolApiPreset(t,a);let l=O.toastr;l&&l.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}function ml(t,e){if(!(O.jQuery||window.jQuery)||!X){e.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let n=Is?.getTool(t)?.config?.messages||[],o=X.messagesToSegments?X.messagesToSegments(n):X.DEFAULT_PROMPT_SEGMENTS,i=new X.PromptEditor({containerId:`yyt-prompt-editor-${t}`,segments:o,onChange:l=>{let c=X.segmentsToMessages?X.segmentsToMessages(l):[];B("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",c.length,"\u6761\u6D88\u606F")}});e.html(`<div id="yyt-prompt-editor-${t}" class="yyt-prompt-editor-container"></div>`),i.init(e.find(`#yyt-prompt-editor-${t}`));let a=X.getPromptEditorStyles?X.getPromptEditorStyles():"";if(a){let l="yyt-prompt-editor-styles";if(!document.getElementById(l)){let c=document.createElement("style");c.id=l,c.textContent=a,document.head.appendChild(c)}}}function bl(t,e){(O.jQuery||window.jQuery)&&e.html(`
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
  `)}function Ko(){if(A){B("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let t=O.jQuery||window.jQuery,e=O.document||document;if(!t){Wo("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let s=ee?.getToolList()||[];Oe=e.createElement("div"),Oe.className="yyt-popup-overlay",Oe.addEventListener("click",l=>{l.target===Oe&&Rs()}),e.body.appendChild(Oe);let r=s.map(l=>`
    <div class="yyt-main-nav-item ${l.id===yt?"active":""}" data-tab="${l.id}">
      <i class="fa-solid ${l.icon}"></i>
      <span>${l.name}</span>
    </div>
  `).join(""),n=s.map(l=>`
    <div class="yyt-tab-content ${l.id===yt?"active":""}" data-tab="${l.id}">
      <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
    </div>
  `).join(""),o=`
    <div class="yyt-popup" id="${ll}">
      <div class="yyt-popup-header">
        <div class="yyt-popup-title">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span>YouYou \u5DE5\u5177\u7BB1</span>
          <span style="font-size: 12px; opacity: 0.6;">v${Vr}</span>
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
  `,i=e.createElement("div");i.innerHTML=o,A=i.firstElementChild,e.body.appendChild(A),t(A).find(".yyt-popup-close").on("click",Rs),t(A).find(`#${L}-close-btn`).on("click",Rs),t(A).find(".yyt-main-nav-item").on("click",function(){let l=t(this).data("tab");l&&qo(l)}),Vo(yt);let a=ee?.getToolConfig(yt);a?.hasSubTabs&&(t(A).find(".yyt-sub-nav").show(),Jo(yt,a.subTabs)),B("\u5F39\u7A97\u5DF2\u6253\u5F00")}function Lt(){let t=O.jQuery||window.jQuery;if(!t){Wo("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(Lt,1e3);return}let e=O.document||document,s=t("#extensionsMenu",e);if(!s.length){B("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(Lt,2e3);return}if(t(`#${Qr}`,s).length>0){B("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let n=t(`<div class="extension_container interactable" id="${Qr}" tabindex="0"></div>`),o=`
    <div class="list-group-item flex-container flexGap5 interactable" id="${kt}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
      <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
      <span>YouYou \u5DE5\u5177\u7BB1</span>
    </div>
  `,i=t(o);i.on("click",async function(a){a.stopPropagation(),B("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let l=t("#extensionsMenuButton",e);l.length&&s.is(":visible")&&l.trigger("click"),Ko()}),n.append(i),s.append(n),B("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}var Jr={version:Vr,id:L,init:Xo,openPopup:Ko,closePopup:Rs,switchMainTab:qo,switchSubTab:Qo,addMenuItem:Lt,getStorage:()=>Ms,getApiConnection:()=>ye,getPresetManager:()=>Rt,getUiComponents:()=>Y,getRegexExtractor:()=>zo,getToolManager:()=>Is,getToolExecutor:()=>Bo,getToolTrigger:()=>It,getWindowManager:()=>Dt,getToolRegistry:()=>ee,getPromptEditor:()=>X,getSettingsService:()=>Ot,getBypassManager:()=>Yo,getVariableResolver:()=>Go,getContextInjector:()=>Fo,getToolPromptService:()=>Ho,getToolOutputService:()=>ks,async getApiConfig(){return await dt(),Ms?Ms.loadSettings().apiConfig:null},async saveApiConfig(t){return await dt(),ye?(ye.updateApiConfig(t),!0):!1},async getPresets(){return await dt(),Rt?Rt.getAllPresets():[]},async sendApiRequest(t,e){if(await dt(),ye)return ye.sendApiRequest(t,e);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await dt(),ye?ye.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(t,e){return ee?.registerTool(t,e)||!1},unregisterTool(t){return ee?.unregisterTool(t)||!1},getToolList(){return ee?.getToolList()||[]},createWindow(t){return Dt?.createWindow(t)||null},closeWindow(t){Dt?.closeWindow(t)}};async function Xo(){if(B(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${Vr}`),await cl(),await dt()){if(B("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),It&&It.initTriggerModule)try{It.initTriggerModule(),B("\u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316")}catch(r){console.error(`[${L}] \u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,r)}let s=O.document||document;if(Y){let r=`${L}-ui-styles`;if(!s.getElementById(r)){let i=s.createElement("style");i.id=r,i.textContent=Y.getStyles(),(s.head||s.documentElement).appendChild(i)}let n=`${L}-regex-styles`;if(!s.getElementById(n)&&Y.getRegexStyles){let i=s.createElement("style");i.id=n,i.textContent=Y.getRegexStyles(),(s.head||s.documentElement).appendChild(i)}let o=`${L}-tool-styles`;if(!s.getElementById(o)&&Y.getToolStyles){let i=s.createElement("style");i.id=o,i.textContent=Y.getToolStyles(),(s.head||s.documentElement).appendChild(i)}}if(Dt){let r=`${L}-window-styles`;s.getElementById(r)}if(X&&X.getPromptEditorStyles){let r=`${L}-prompt-styles`;if(!s.getElementById(r)){let n=s.createElement("style");n.id=r,n.textContent=X.getPromptEditorStyles(),(s.head||s.documentElement).appendChild(n)}}try{let{applyTheme:r}=await Promise.resolve().then(()=>(qr(),Wr));if(Ot&&Ot.settingsService){let n=Ot.settingsService.getUiSettings();n&&n.theme&&(r(n.theme),B(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${n.theme}`),n.compactMode&&document.documentElement.classList.add("yyt-compact-mode"),n.animationEnabled||document.documentElement.classList.add("yyt-no-animation"))}}catch(r){B("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",r)}}else B("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let e=O.document||document;e.readyState==="loading"?e.addEventListener("DOMContentLoaded",()=>{setTimeout(Lt,1e3)}):setTimeout(Lt,1e3),B("\u521D\u59CB\u5316\u5B8C\u6210")}if(typeof window<"u"&&(window.YouYouToolkit=Jr,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=Jr}catch{}var yd=Jr;Xo();B("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210");export{yd as default};
