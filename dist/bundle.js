var mc=Object.defineProperty;var W=(t,e)=>()=>(t&&(e=t(t=0)),e);var ye=(t,e)=>{for(var s in e)mc(t,s,{get:e[s],enumerable:!0})};function oa(){let t=C;return t._getStorage(),t._storage}function na(){return C.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function aa(t){C.set("settings",t)}var vt,C,te,ra,Ls,De=W(()=>{vt=class t{constructor(e="youyou_toolkit"){this.namespaceKey=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespaceKey]||(s.extensionSettings[this.namespaceKey]={}),this._storage={_target:s.extensionSettings[this.namespaceKey],getItem:r=>{let o=s.extensionSettings[this.namespaceKey][r];return typeof o=="string"?o:o?JSON.stringify(o):null},setItem:(r,o)=>{s.extensionSettings[this.namespaceKey][r]=o,this._saveSettings(s)},removeItem:r=>{delete s.extensionSettings[this.namespaceKey][r],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespaceKey}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,s)=>{try{localStorage.setItem(e,s)}catch(r){console.error(`[${this.namespaceKey}] localStorage\u5199\u5165\u5931\u8D25:`,r)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,s=null){let r=`${this.namespaceKey}:${e}`;if(this._cache.has(r))return this._cache.get(r);let o=this._getStorage(),n=this._getFullKey(e),a=o.getItem(n);if(a===null)return s;try{let i=JSON.parse(a);return this._cache.set(r,i),i}catch{return a}}set(e,s){let r=this._getStorage(),o=this._getFullKey(e),n=`${this.namespaceKey}:${e}`;this._cache.set(n,s);try{r.setItem(o,JSON.stringify(s))}catch(a){console.error(`[${this.namespaceKey}] \u5B58\u50A8\u5931\u8D25:`,a)}}remove(e){let s=this._getStorage(),r=this._getFullKey(e),o=`${this.namespaceKey}:${e}`;this._cache.delete(o),s.removeItem(r)}has(e){let s=this._getStorage(),r=this._getFullKey(e);return s.getItem(r)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let r=s.SillyTavern.getContext();r?.extensionSettings?.[this.namespaceKey]&&(r.extensionSettings[this.namespaceKey]={},this._saveSettings(r))}}else{let s=`${this.namespaceKey}_`,r=[];for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);n&&n.startsWith(s)&&r.push(n)}r.forEach(o=>localStorage.removeItem(o))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespaceKey}_${e}`}namespace(e){return new t(`${this.namespaceKey}:${e}`)}getMultiple(e){let s={};return e.forEach(r=>{s[r]=this.get(r)}),s}setMultiple(e){Object.entries(e).forEach(([s,r])=>{this.set(s,r)})}exportAll(){let e=this._getStorage(),s={};if(e._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let n=r.SillyTavern.getContext()?.extensionSettings?.[this.namespaceKey]||{};Object.entries(n).forEach(([a,i])=>{s[a]=typeof i=="string"?JSON.parse(i):i})}}else{let r=`${this.namespaceKey}_`;for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);if(n&&n.startsWith(r)){let a=n.slice(r.length);try{s[a]=JSON.parse(localStorage.getItem(n))}catch{s[a]=localStorage.getItem(n)}}}}return s}},C=new vt("youyou_toolkit"),te=new vt("youyou_toolkit:tools"),ra=new vt("youyou_toolkit:presets"),Ls=new vt("youyou_toolkit:windows")});var la={};ye(la,{DEFAULT_API_PRESETS:()=>hc,DEFAULT_SETTINGS:()=>bc,STORAGE_KEYS:()=>Bs,StorageService:()=>vt,deepMerge:()=>ia,getCurrentPresetName:()=>wc,getStorage:()=>oa,loadApiPresets:()=>vc,loadSettings:()=>na,presetStorage:()=>ra,saveApiPresets:()=>xc,saveSettings:()=>aa,setCurrentPresetName:()=>Sc,storage:()=>C,toolStorage:()=>te,windowStorage:()=>Ls});function vc(){return C.get(Bs.API_PRESETS)||[]}function xc(t){C.set(Bs.API_PRESETS,t)}function wc(){return C.get(Bs.CURRENT_PRESET)||""}function Sc(t){C.set(Bs.CURRENT_PRESET,t||"")}function ia(t,e){let s=o=>o&&typeof o=="object"&&!Array.isArray(o),r={...t};return s(t)&&s(e)&&Object.keys(e).forEach(o=>{s(e[o])?o in t?r[o]=ia(t[o],e[o]):Object.assign(r,{[o]:e[o]}):Object.assign(r,{[o]:e[o]})}),r}var Bs,bc,hc,ca=W(()=>{De();De();Bs={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},bc={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},hc=[]});var ga={};ye(ga,{API_STATUS:()=>kc,fetchAvailableModels:()=>zo,getApiConfig:()=>it,getEffectiveApiConfig:()=>Ks,hasEffectiveApiPreset:()=>zs,sendApiRequest:()=>Us,sendWithPreset:()=>Bo,testApiConnection:()=>Oc,updateApiConfig:()=>ds,validateApiConfig:()=>us});function Ac(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Lo(){return C.get(da,Ac())}function Ec(t){C.set(da,t)}function ua(){return C.get(Tc,[])}function Mc(){return C.get(_c,"")}function No(t,e={}){let s=new Error(t);return s.allowDirectFallback=e.allowDirectFallback===!0,s}function ya(t,e="chat_completions"){let s=String(t||"").trim();if(!s)return"";let r=null;try{r=new URL(s)}catch{return s}let o=r.pathname.replace(/\/+$/,""),n=o;return e==="chat_completions"?!/\/chat\/completions$/i.test(o)&&!/\/completions$/i.test(o)&&(n=`${o||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(o)?n=o.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(o)?n=o.replace(/\/completions$/i,"/models"):/\/models$/i.test(o)||(n=`${o||""}/models`)),r.pathname=n.replace(/\/+/g,"/"),r.toString()}function Ic(t){let e=String(t||"").trim();if(!e)return"";try{let s=new URL(e);return s.pathname=s.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",s.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function it(){return Lo().apiConfig||{}}function ds(t){let e=Lo();e.apiConfig={...e.apiConfig,...t},Ec(e)}function us(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function Ks(t=""){let e=Lo(),s=t||Mc()||"";if(s){let o=ua().find(n=>n.name===s);if(o&&o.apiConfig)return{...o.apiConfig,presetName:o.name}}return e.apiConfig||{}}function zs(t=""){return t?ua().some(s=>s?.name===t):!1}async function Bo(t,e,s={},r=null){let o=Ks(t);return await Us(e,{...s,apiConfig:o},r)}function pa(t,e={}){let s=e.apiConfig||it();return{messages:t,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:s.stream??!1,...e.extraParams}}function Ko(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function Us(t,e={},s=null){let r=e.apiConfig||it(),o=r.useMainApi,n=us(r);if(!n.valid&&!o)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${n.errors.join(", ")}`);return o?await Cc(t,e,s):await Pc(t,r,e,s)}async function Cc(t,e,s){let r=typeof window.parent<"u"?window.parent:window;if(!r.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let o=await r.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.apiConfig?.stream??it().stream??!1,...e.extraParams});if(typeof o!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return o.trim()}catch(o){throw o.name==="AbortError"?o:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${o.message}`)}}async function Pc(t,e,s,r){let o=typeof window.parent<"u"?window.parent:window;if(o.TavernHelper?.generateRaw)try{return await Rc(t,e,s,r,o)}catch(n){console.warn("[youyou_toolkit] TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",n)}if(o.SillyTavern?.getRequestHeaders)try{return await $c(t,e,s,r,o)}catch(n){if(!n?.allowDirectFallback)throw n}return await Dc(t,e,s,r)}async function Rc(t,e,s,r,o){if(r?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let n=await o.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.stream??!1,max_chat_history:0,custom_api:{apiurl:Ic(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...s.extraParams||{}});return typeof n=="string"?n.trim():Ko(n)}async function $c(t,e,s,r,o){let n=String(e.url||"").trim(),a={...pa(t,{apiConfig:e,...s}),chat_completion_source:"custom",reverse_proxy:n,proxy_password:"",custom_url:n,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof o.SillyTavern?.getRequestHeaders=="function"?o.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(a),signal:r})}catch(u){throw u?.name==="AbortError"?u:No(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw No(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:u})}let d=null;try{d=c?JSON.parse(c):{}}catch{let y=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw No(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${y||"(\u7A7A\u54CD\u5E94)"}`)}return Ko(d)}async function Dc(t,e,s,r){let o=pa(t,{apiConfig:e,...s}),n=ya(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(n,{method:"POST",headers:a,body:JSON.stringify(o),signal:r}),l=await i.text().catch(()=>"");if(!i.ok){let d=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${d}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return Ko(c)}async function Oc(t=null){let e=t||it(),s=Date.now();try{await Us([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let o=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${o}ms)`,latency:o}}catch(r){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${r.message}`,latency:Date.now()-s}}}async function zo(t=null){let e=t||it();return e.useMainApi?await Nc():await Lc(e)}async function Nc(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function Lc(t){if(!t.url||!t.apiKey)return[];try{let e=ya(t.url,"models"),s=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!s.ok)return[];let r=await s.json();return r.data&&Array.isArray(r.data)?r.data.map(o=>o.id||o.name).filter(Boolean).sort():[]}catch{return[]}}var da,Tc,_c,kc,Ws=W(()=>{De();da="settings",Tc="api_presets",_c="current_preset";kc={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var ha={};ye(ha,{createPreset:()=>Er,createPresetFromCurrentConfig:()=>jc,deletePreset:()=>Fs,duplicatePreset:()=>Wc,exportPresets:()=>Ho,generateUniquePresetName:()=>qo,getActiveConfig:()=>Fo,getActivePresetName:()=>Mr,getAllPresets:()=>xt,getPreset:()=>Lt,getPresetNames:()=>zc,getStarredPresets:()=>jo,importPresets:()=>Yo,presetExists:()=>js,renamePreset:()=>Uc,switchToPreset:()=>Bt,togglePresetStar:()=>Wo,updatePreset:()=>Uo,validatePreset:()=>Fc});function Kc(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function ba(){return C.get(Bc,Kc())}function Ee(){return C.get(fa,[])}function Nt(t){C.set(fa,t)}function Ar(){return C.get(ma,"")}function _r(t){C.set(ma,t||"")}function xt(){return Ee()}function zc(){return Ee().map(e=>e.name)}function Lt(t){return!t||typeof t!="string"?null:Ee().find(s=>s.name===t)||null}function js(t){return!t||typeof t!="string"?!1:Ee().some(s=>s.name===t)}function Er(t){let{name:e,description:s,apiConfig:r}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let o=e.trim();if(js(o))return{success:!1,message:`\u9884\u8BBE "${o}" \u5DF2\u5B58\u5728`};let n={name:o,description:s||"",apiConfig:{url:r?.url||"",apiKey:r?.apiKey||"",model:r?.model||"",useMainApi:r?.useMainApi??!0,stream:r?.stream??!1,max_tokens:r?.max_tokens||4096,temperature:r?.temperature??.7,top_p:r?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=Ee();return a.push(n),Nt(a),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:n}}function Uo(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=Ee(),r=s.findIndex(a=>a.name===t);if(r===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let o=s[r],n={...o,...e,name:o.name,updatedAt:Date.now()};return e.apiConfig&&(n.apiConfig={...o.apiConfig,...e.apiConfig}),s[r]=n,Nt(s),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:n}}function Fs(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=Ee(),s=e.findIndex(r=>r.name===t);return s===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(s,1),Nt(e),Ar()===t&&_r(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function Uc(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(!js(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(js(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let r=Ee(),o=r.find(n=>n.name===t);return o&&(o.name=s,o.updatedAt=Date.now(),Nt(r),Ar()===t&&_r(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function Wc(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim(),r=Lt(t);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(js(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(r)),name:s,createdAt:Date.now(),updatedAt:Date.now()},n=Ee();return n.push(o),Nt(n),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:o}}function Wo(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=Ee(),s=e.find(r=>r.name===t);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),Nt(e),{success:!0,message:s.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function jo(){return Ee().filter(e=>e.starred===!0)}function Bt(t){if(!t)return _r(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=Lt(t);return e?(_r(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Mr(){return Ar()}function Fo(){let t=Ar();if(t){let s=Lt(t);if(s)return{presetName:t,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:ba().apiConfig||{}}}function Ho(t=null){if(t){let s=Lt(t);if(!s)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let e=Ee();return JSON.stringify(e,null,2)}function Yo(t,e={overwrite:!1}){let s;try{s=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let r=Array.isArray(s)?s:[s];if(r.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let o=Ee(),n=0;for(let a of r){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let i=o.findIndex(l=>l.name===a.name);i>=0?e.overwrite&&(a.updatedAt=Date.now(),o[i]=a,n++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),o.push(a),n++)}return n>0&&Nt(o),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${n} \u4E2A\u9884\u8BBE`,imported:n}}function jc(t,e=""){let s=ba();return Er({name:t,description:e,apiConfig:s.apiConfig})}function Fc(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function qo(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=Ee(),s=new Set(e.map(o=>o.name));if(!s.has(t))return t;let r=1;for(;s.has(`${t} (${r})`);)r++;return`${t} (${r})`}var Bc,fa,ma,Hs=W(()=>{De();Bc="settings",fa="api_presets",ma="current_preset"});var P,Go,$,ge=W(()=>{P={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_RUNTIME_UPDATED:"tool:runtimeUpdated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},Go=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,s,r={}){if(!e||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:o=0}=r;this.listeners.has(e)||this.listeners.set(e,new Set);let n={callback:s,priority:o};return this.listeners.get(e).add(n),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,s)}off(e,s){let r=this.listeners.get(e);if(r){for(let o of r)if(o.callback===s){r.delete(o);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,s),this._addToHistory(e,s);let r=this.listeners.get(e);if(!r||r.size===0)return;let o=Array.from(r).sort((n,a)=>a.priority-n.priority);for(let{callback:n}of o)try{n(s)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,s){let r=o=>{this.off(e,r),s(o)};return this.on(e,r)}wait(e,s=0){return new Promise((r,o)=>{let n=null,a=this.once(e,i=>{n&&clearTimeout(n),r(i)});s>0&&(n=setTimeout(()=>{a(),o(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},s))})}hasListeners(e){let s=this.listeners.get(e);return s&&s.size>0}listenerCount(e){let s=this.listeners.get(e);return s?s.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,s){this.history.push({event:e,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(s=>s.event===e):[...this.history]}clearHistory(){this.history=[]}},$=new Go});function zt(){return typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function x(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function S(t,e,s=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let r=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(r.toastr){r.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}Hc(t,e,s),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${t.toUpperCase()}] ${e}`)}function me(t,e,s={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:r=3500,sticky:o=!1,noticeId:n=""}=s,a=zt();if(!a?.body){S(t,e,r);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",c=a.getElementById(i);if(c||(c=a.createElement("div"),c.id=i,c.style.cssText=`
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
    `,a.body.appendChild(c)),!a.getElementById(l)){let m=a.createElement("style");m.id=l,m.textContent=`
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
    `,a.head.appendChild(m)}if(n){let m=c.querySelector(`[data-notice-id="${n}"]`);m&&m.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=a.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,n&&(u.dataset.noticeId=n);let y=a.createElement("span");y.className="yyt-top-notice__icon",y.textContent=d[t]||d.info;let p=a.createElement("div");p.className="yyt-top-notice__content",p.textContent=e;let f=a.createElement("button");f.className="yyt-top-notice__close",f.type="button",f.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),f.textContent="\xD7";let h=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};f.addEventListener("click",h),u.appendChild(y),u.appendChild(p),u.appendChild(f),c.appendChild(u),o||setTimeout(h,r)}function Hc(t,e,s){let r=zt();if(!r)return;let o=r.getElementById("yyt-fallback-toast");o&&o.remove();let n={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=n[t]||n.info,i=r.createElement("div");if(i.id="yyt-fallback-toast",i.style.cssText=`
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
    `,r.head.appendChild(l)}r.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},s)}function D(){if(Kt)return Kt;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Kt=window.parent.jQuery,Kt}catch{}return window.jQuery&&(Kt=window.jQuery),Kt}function Yc(){Kt=null}function B(t){if(!t||t.length===0)return!1;let e=t[0];if(!e||e.nodeType!==1)return!1;let s=e.ownerDocument||document;return e.isConnected?s?.documentElement?.contains?s.documentElement.contains(e):!0:!1}function wt(...t){return t.flat(1/0).flatMap(e=>String(e||"").split(/\s+/)).map(e=>e.trim()).filter(Boolean).join(" ")}function ys(t={}){return Object.entries(t).filter(([,e])=>e!=null&&e!==!1).map(([e,s])=>s===!0?e:`${e}="${x(String(s))}"`).join(" ")}function Sa(t=[],e="",s=""){let r=String(e??""),o=t.find(n=>n.value===r)||t.find(n=>n.disabled!==!0)||null;return o||{value:r,label:s||r||"\u8BF7\u9009\u62E9",disabled:!1}}function qc(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(e=>e&&e!=="yyt-select"&&e!=="yyt-native-select-bridge")}function va(t,e){let s=D();if(!s||!e?.length)return null;let r=e.attr("id")?`#${e.attr("id")}`:e.attr("data-yyt-select-key")?`[data-yyt-select-key="${e.attr("data-yyt-select-key")}"]`:"";if(!r)return null;let n=t.find("[data-yyt-custom-select]").filter((a,i)=>String(s(i).attr("data-yyt-select-target")||"")===r);return n.length?n.first():null}function Ta(t){let e=t?.[0];return e?.ownerDocument?e.ownerDocument:typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function Gc(t){if(!D()||!B(t))return null;let s=t.find("[data-yyt-custom-select]");return s.length?s:null}function _a(t,e){if(!D()||!e?.length)return null;let r=e.find("[data-yyt-select-native]").first();if(r.length)return r;let o=String(e.attr("data-yyt-select-target")||"").trim();if(!o)return null;let n=t.find(o).first();return n.length?n:null}function Aa(t=null){return t?.jquery&&t[0]?.ownerDocument?t[0].ownerDocument:t?.ownerDocument?t.ownerDocument:t?.nodeType===9?t:zt()}function Xe(t=null){let e=Aa(t),s=xa.get(e);return s||(s={targetDoc:e,layer:null,activeRoot:null,activeDropdown:null,placeholder:null,cleanup:null},xa.set(e,s)),s}function Vc(t=null){let e=Aa(t);if(!e?.body)return null;let s=Xe(e);if(s.layer&&s.layer.isConnected)return s.layer;let r=e.getElementById(wa);return r||(r=e.createElement("div"),r.id=wa,r.className="yyt-select-portal-layer",e.body.appendChild(r)),s.layer=r,r}function kr(t){if(!D()||!t?.length)return null;let s=t.find("[data-yyt-select-trigger]").first();return s.length?s:t.find(".yyt-select-trigger").first()}function Ea(t){let e=D();if(!e||!t?.length)return null;let s=Xe(t);if(s.activeRoot===t[0]&&s.activeDropdown)return e(s.activeDropdown);let r=t.find("[data-yyt-select-dropdown]").first();return r.length?r:t.find(".yyt-select-dropdown").first()}function Jc(t){t&&(t.classList.remove("yyt-floating-open"),t.removeAttribute("data-yyt-floating"),t.removeAttribute("data-yyt-floating-placement"),t.style.position="",t.style.top="",t.style.left="",t.style.right="",t.style.width="",t.style.minWidth="",t.style.maxWidth="",t.style.maxHeight="",t.style.visibility="",t.style.zIndex="")}function Ma(t,e=null){if(!t)return!1;let s=Xe(e||t);return s.activeRoot?.contains?.(t)||s.activeDropdown?.contains?.(t)?!0:!!t.closest?.("[data-yyt-custom-select], .yyt-select-portal-layer")}function Xc(t){if(!t?.targetDoc||typeof t.cleanup=="function")return;let e=t.targetDoc,s=e.defaultView||window,r=i=>{!t.activeRoot||!t.activeDropdown||Ma(i.target,e)||Ie(e)},o=i=>{if(i.key!=="Escape")return;let l=t.activeRoot;Ie(e);let c=D();c&&l&&kr(c(l))?.trigger("focus")},n=()=>{Xo(e)},a=()=>{Xo(e)};e.addEventListener("mousedown",r,!0),e.addEventListener("keydown",o,!0),s.addEventListener("resize",n),e.addEventListener("scroll",a,!0),t.cleanup=()=>{e.removeEventListener("mousedown",r,!0),e.removeEventListener("keydown",o,!0),s.removeEventListener("resize",n),e.removeEventListener("scroll",a,!0)}}function Qc(t){typeof t?.cleanup=="function"&&t.cleanup(),t&&(t.cleanup=null)}function Jo(t){let e=D();if(!e||!t?.activeRoot||!t?.activeDropdown)return;let s=t.targetDoc;if(!s?.body?.contains?.(t.activeRoot)){Ie(s);return}let r=e(t.activeRoot),o=kr(r),n=t.activeDropdown,a=s?.defaultView||window;if(!o?.length||!n?.isConnected||!r[0]?.isConnected){Ie(s);return}let i=o[0].getBoundingClientRect(),l=a.innerWidth||s.documentElement?.clientWidth||0,c=a.innerHeight||s.documentElement?.clientHeight||0,d=12,u=8,y=Math.max(0,c-i.bottom-d-u),p=Math.max(0,i.top-d-u),f=y<220&&p>y,m=Math.max(120,Math.floor((f?p:y)||0));n.setAttribute("data-yyt-floating","true"),n.setAttribute("data-yyt-floating-placement",f?"top":"bottom"),n.classList.add("yyt-floating-open");let _=Math.ceil(i.width),M=Math.max(_,Math.floor(l-d*2)),w=n.style.width,E=n.style.minWidth,k=n.style.maxWidth,I=n.style.visibility;n.style.width="max-content",n.style.minWidth=`${_}px`,n.style.maxWidth=`${M}px`,n.style.visibility="hidden";let N=Math.ceil(n.scrollWidth||n.getBoundingClientRect().width||_),se=Math.max(_,Math.min(M,N)),q=Math.min(n.scrollHeight||m,m);n.style.width=w,n.style.minWidth=E,n.style.maxWidth=k,n.style.visibility=I;let O=Math.round(i.left);O+se>l-d&&(O=Math.max(d,Math.round(l-d-se))),O=Math.max(d,O);let ee=Math.round(f?i.top-u-q:i.bottom+u);ee=Math.max(d,Math.min(ee,Math.round(c-d-q))),n.style.position="fixed",n.style.top=`${ee}px`,n.style.left=`${O}px`,n.style.right="auto",n.style.width=`${se}px`,n.style.minWidth=`${_}px`,n.style.maxWidth=`${M}px`,n.style.maxHeight=`${Math.floor(m)}px`,n.style.visibility="",n.style.zIndex="10050"}function Ie(t=null){let e=D(),s=Xe(t);if(!e||!s?.activeRoot)return;let r=s.activeRoot,o=s.activeDropdown,n=s.placeholder,a=e(r),i=kr(a);o&&(Jc(o),n?.parentNode?n.parentNode.insertBefore(o,n):r?.isConnected?r.appendChild(o):o.remove()),n?.parentNode?.removeChild(n),a.removeClass("yyt-open"),i?.attr("aria-expanded","false"),s.activeRoot=null,s.activeDropdown=null,s.placeholder=null,Qc(s)}function Xo(t=null){let e=Xe(t);!e?.activeRoot||!e?.activeDropdown||Jo(e)}function ka(t){if(!D()||!t?.length)return;let s=t.first(),r=kr(s),o=Ea(s);if(!r?.length||!o?.length||r.prop("disabled"))return;let n=Xe(s);if(n.activeRoot===s[0]){Jo(n);return}Ie(s);let a=Vc(s);if(!a)return;let i=o[0],l=n.targetDoc.createComment("yyt-select-dropdown-placeholder");i.parentNode?.insertBefore(l,i),a.appendChild(i),n.activeRoot=s[0],n.activeDropdown=i,n.placeholder=l,s.addClass("yyt-open"),r.attr("aria-expanded","true"),Xc(n),Jo(n)}function Zc(t,e){let s=D();if(!s||!e?.length)return null;let r=e.closest("[data-yyt-custom-select]");if(r.length)return r.first();let o=Xe(e);if(o.activeRoot&&o.activeDropdown?.contains?.(e[0])){let n=s(o.activeRoot);return t.has(o.activeRoot).length?n:null}return null}function Ys(t){let e=Xe(t);t?.length&&e.activeRoot&&e.activeRoot!==t[0]||Ie(t)}function Ir(t){let e=Xe(t);if(t?.length&&e.activeRoot===t[0]){Ie(t);return}ka(t)}function Vo(t,e,s=null){let r=D();if(!r||!e?.length)return;let o=s||_a(t,e);if(!o?.length)return;let n=Array.isArray(o.data("yytCustomSelectOptions"))?o.data("yytCustomSelectOptions"):[],a=Sa(n,o.val(),e.attr("data-yyt-select-placeholder")||""),i=String(a.value??""),l=String(a.label??""),c=o.is(":disabled");e.find(".yyt-select-value").text(l).attr("data-value",i).data("value",i);let d=Ea(e);(d?.length?d.find("[data-yyt-select-option]"):e.find("[data-yyt-select-option]")).each((p,f)=>{let h=r(f),m=String(h.attr("data-value")||"")===i;h.toggleClass("yyt-selected",m).attr("aria-selected",String(m))});let y=e.find("[data-yyt-select-trigger]").first();y.prop("disabled",c),c&&(Ys(e),e.removeClass("yyt-open"),y.attr("aria-expanded","false"))}function Cr(t=[]){return Array.isArray(t)?t.map(e=>{if(e&&typeof e=="object"&&!Array.isArray(e)){let r=String(e.value??""),o=String(e.label??e.text??e.name??r);return{value:r,label:o,disabled:e.disabled===!0}}let s=String(e??"");return{value:s,label:s,disabled:!1}}):[]}function Pr(t={}){let{selectedValue:e="",options:s=[],placeholder:r="\u8BF7\u9009\u62E9",disabled:o=!1,includeNative:n=!0,nativeTag:a="input",nativeType:i="hidden",rootAttributes:l={},nativeAttributes:c={},triggerAttributes:d={},dropdownAttributes:u={},optionAttributes:y={},optionClass:p="",optionTextClass:f=""}=t,h=Cr(s),m=Sa(h,e,r),_=o===!0||h.length===0,M=ys({...l,class:wt("yyt-custom-select",l.class),"data-yyt-custom-select":l["data-yyt-custom-select"]??"true","data-yyt-select-placeholder":r}),w=ys({type:"button",...d,class:wt("yyt-select-trigger",d.class),"data-yyt-select-trigger":d["data-yyt-select-trigger"]??"true","aria-haspopup":d["aria-haspopup"]??"listbox","aria-expanded":d["aria-expanded"]??"false",disabled:_?!0:d.disabled}),E=ys({...u,class:wt("yyt-select-dropdown",u.class),"data-yyt-select-dropdown":u["data-yyt-select-dropdown"]??"true",role:u.role??"listbox"}),k=n?(()=>{let I={...c,class:wt(c.class),"data-yyt-select-native":c["data-yyt-select-native"]??"true",disabled:_?!0:c.disabled};return a==="select"?`<select ${ys(I)}>${h.map(q=>`
            <option value="${x(q.value)}" ${q.value===String(m.value??"")?"selected":""} ${q.disabled?"disabled":""}>${x(q.label)}</option>
          `).join("")}</select>`:`<input ${ys({type:i,value:m.value,...I})}>`})():"";return`
    <div ${M}>
      ${k}
      <button ${w}>
        <span class="${x(wt("yyt-select-value"))}" data-value="${x(m.value)}">${x(m.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${E}>
        ${h.map(I=>{let N=I.value===String(m.value??"");return`
            <button ${ys({type:"button",...y,class:wt("yyt-select-option",p,y.class,N?"yyt-selected":""),"data-yyt-select-option":y["data-yyt-select-option"]??"true","data-value":I.value,role:y.role??"option","aria-selected":N?"true":"false",disabled:I.disabled?!0:y.disabled})}>
              <span class="${x(wt("yyt-option-text",f))}">${x(I.label)}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function ue(t,e="yytCustomSelect"){let s=D();if(!s||!B(t))return;let r=Ta(t),o=Xe(r);o.activeRoot&&t.has(o.activeRoot).length&&Ie(r),t.off(`.${e}`),s(r).off(`click.${e}`),s(r).off(`mousedown.${e}`),t.find('[data-yyt-enhanced-select="true"]').remove(),t.find(".yyt-native-select-bridge").each((n,a)=>{let i=s(a),l=i.attr("data-yyt-original-style");l!==void 0&&l?i.attr("style",l):i.removeAttr("style"),i.removeClass("yyt-native-select-bridge").removeAttr("data-yyt-original-style").removeAttr("data-yyt-select-key").removeData("yytCustomSelectOptions")})}function we(t,e={}){let s=D();if(!s||!B(t))return;let{namespace:r="yytCustomSelect",selectors:o=[]}=e,n=Array.isArray(o)?o.filter(Boolean):[o].filter(Boolean);if(n.length===0)return;ue(t,r);let a=n.join(", "),i=Ta(t);t.find(a).each((l,c)=>{let d=s(c),u=String(d.attr("id")||"").trim(),y=u||`yyt-select-${Date.now()}-${l}`,p=u?`#${u}`:`[data-yyt-select-key="${y}"]`,f=`${y}-dropdown`,h=qc(d.attr("class")),m=d.attr("style"),_=d.find("option").map((E,k)=>{let I=s(k);return{value:String(I.attr("value")??I.val()??""),label:I.text(),disabled:I.is(":disabled")}}).get();d.attr("data-yyt-original-style",m??"").attr("data-yyt-select-key",y).addClass("yyt-native-select-bridge").css("display","none").data("yytCustomSelectOptions",_);let M=Pr({includeNative:!1,selectedValue:d.val(),options:_,disabled:d.is(":disabled"),placeholder:_[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{class:wt(h),style:m||void 0,"data-yyt-enhanced-select":"true","data-yyt-select-target":p},triggerAttributes:{id:`${y}-trigger`,"aria-controls":f},dropdownAttributes:{id:f}});d.after(M);let w=va(t,d);Vo(t,w,d)}),t.on(`click.${r}`,"[data-yyt-select-trigger]",l=>{l.preventDefault(),l.stopPropagation();let c=s(l.currentTarget);if(c.prop("disabled"))return;let d=c.closest("[data-yyt-custom-select]");Ir(d)}),t.on(`change.${r}`,a,l=>{let c=s(l.currentTarget),d=c.find("option").map((y,p)=>{let f=s(p);return{value:String(f.attr("value")??f.val()??""),label:f.text(),disabled:f.is(":disabled")}}).get();c.data("yytCustomSelectOptions",d);let u=va(t,c);Vo(t,u,c)}),s(i).off(`click.${r}`).on(`click.${r}`,l=>{if(Ma(l.target,i))return;let c=Gc(t);c?.length&&(Ie(i),c.filter(".yyt-open").removeClass("yyt-open").find("[data-yyt-select-trigger]").attr("aria-expanded","false"))}),s(i).off(`mousedown.${r}`,".yyt-select-portal-layer [data-yyt-select-option]").on(`mousedown.${r}`,".yyt-select-portal-layer [data-yyt-select-option]",l=>{l.preventDefault(),l.stopPropagation();let c=s(l.currentTarget);if(c.prop("disabled"))return;let d=Zc(t,c);if(!d?.length)return;let u=_a(t,d);if(!u?.length)return;let y=String(c.attr("data-value")||"");u.val(y).trigger("change"),Vo(t,d,u),Ys(d)})}function qs(t,e=b){if(!D()||!B(t))return{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9};let r=t.find(`#${e}-model`).val()?.trim()||"",o=t.find(`#${e}-model-select`);return o.is(":visible")&&(r=o.val()||r),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:r,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),stream:t.find(`#${e}-stream`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function Rr(t,e,s=b){if(!D()||!B(t)||!e)return;t.find(`#${s}-api-url`).val(e.url||""),t.find(`#${s}-api-key`).val(e.apiKey||""),t.find(`#${s}-model`).val(e.model||""),t.find(`#${s}-stream`).prop("checked",e.stream===!0),t.find(`#${s}-max-tokens`).val(e.max_tokens||4096),t.find(`#${s}-temperature`).val(e.temperature??.7),t.find(`#${s}-top-p`).val(e.top_p??.9);let o=e.useMainApi??!0;t.find(`#${s}-use-main-api`).prop("checked",o);let a=t.find(`#${s}-custom-api-fields`);o?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${s}-model`).show(),t.find(`#${s}-model-select`).hide()}function Gs(t){let{id:e,title:s,body:r,width:o="380px",wide:n=!1,dialogClass:a="",bodyClass:i="",footerClass:l=""}=t;return`
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
  `}function Vs(t,e,s={}){if(!D())return()=>{};let o=t.find(`#${e}-overlay`),n=()=>{o.remove(),s.onClose&&s.onClose()};return o.find(`#${e}-close, #${e}-cancel`).on("click",n),o.on("click",function(a){a.target===this&&n()}),o.find(`#${e}-save`).on("click",function(){s.onSave&&s.onSave(n)}),n}function lt(t,e){let s=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(s),o=document.createElement("a");o.href=r,o.download=e,o.click(),URL.revokeObjectURL(r)}function ct(t){return new Promise((e,s)=>{let r=new FileReader;r.onload=o=>e(o.target.result),r.onerror=o=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),r.readAsText(t)})}var b,Kt,xa,wa,Se=W(()=>{b="youyou_toolkit";Kt=null;xa=new WeakMap,wa="yyt-select-portal-layer"});var Js,de,Qo=W(()=>{ge();Se();Js=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,$.emit(P.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(e,s){return!e||!s?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,s,r={}){let o=D();if(!o){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let n=this.components.get(e);if(!n){console.error(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`),a?.length&&a.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u672A\u6CE8\u518C\uFF1A${e}</span></div>`);return}let a;if(typeof s=="string"?a=o(s):s&&s.jquery?a=s:s&&(a=o(s)),!B(a)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}this.activeInstances.forEach((i,l)=>{i?.container?.length&&a.length&&i.container[0]===a[0]&&l!==e&&this.destroyInstance(l)}),this.destroyInstance(e);try{if(typeof n.renderTo=="function")n.renderTo(a,{...r,dependencies:this.dependencies});else{let i=n.render({...r,dependencies:this.dependencies});a.html(i),n.bindEvents(a,this.dependencies)}}catch(i){console.error(`[UIManager] \u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25: ${e}`,i),a.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25\uFF1A${e}${i?.message?` - ${i.message}`:""}</span></div>`);return}this.activeInstances.set(e,{container:a,component:n,props:r}),$.emit(P.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let s=this.activeInstances.get(e);s&&(s.component.destroy(s.container),this.activeInstances.delete(e))}destroyContainerInstance(e){let s=D();if(!s||!e)return;let r;if(typeof e=="string"?r=s(e):e?.jquery?r=e:r=s(e),!r?.length)return;let o=[];this.activeInstances.forEach((n,a)=>{n?.container?.length&&n.container[0]===r[0]&&o.push(a)}),o.forEach(n=>this.destroyInstance(n))}switchTab(e){let s=this.currentTab;this.currentTab=e,$.emit(P.UI_TAB_CHANGED,{tabId:e,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(e,s){this.currentSubTab[e]=s,$.emit(P.UI_SUBTAB_CHANGED,{mainTab:e,subTab:s})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((s,r)=>{s.getStyles&&(e+=s.getStyles())}),e}injectStyles(e=document){let s="yyt-component-styles";if(e.getElementById(s))return;let r=e.createElement("style");r.id=s,r.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(r)}setDependency(e,s){this.dependencies[e]=s}getDependency(e){return this.dependencies[e]}_subscribeEvents(){$.on(P.PRESET_UPDATED,()=>{}),$.on(P.TOOL_UPDATED,()=>{})}},de=new Js});function Oe(t){return String(t||"").trim()}var Zo,St,en=W(()=>{ge();Se();Ws();Hs();Zo="yytApiPresetPanelState";St={id:"apiPresetPanel",_getSelectedPresetName(t){if(!t?.length)return null;let e=t.data(Zo);return e?e.selectedPresetName:null},_setSelectedPresetName(t,e){t?.length&&t.data(Zo,{selectedPresetName:e===null?null:Oe(e)})},_rerender(t){B(t)&&(Ie(t),this.renderTo(t))},_removeDialog(t){t?.length&&t.find(`#${b}-dialog-overlay`).remove()},render(t={}){let e=Fo(),s=e?.apiConfig||it(),r=Oe(e?.presetName||Mr()),o=xt(),n=jo(),a=t.selectedPresetName??null,l=n.slice(0,8),c=l.length>0?l.map(y=>this._renderPresetItem(y)).join(""):"",d=a===null?r||"":Oe(a),u=d||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
              <div class="yyt-custom-select" id="${b}-preset-dropdown">
                <div class="yyt-select-trigger">
                  <span class="yyt-select-value" data-value="${x(d)}">${x(u)}</span>
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
          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-sliders"></i>
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
      </div>
    `},_renderPresetItem(t){return`
      <div class="yyt-preset-item" data-preset-name="${x(t.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${x(t.name)}</div>
          <div class="yyt-preset-meta">
            ${t.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${x(t.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
      <div class="yyt-select-option ${t.name===e?"yyt-selected":""}" data-value="${x(t.name)}">
        <button class="${r}" data-preset="${x(t.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${o}</button>
        <span class="yyt-option-text">${x(t.name)}</span>
        <button class="yyt-option-delete" data-action="delete" data-preset="${x(t.name)}" title="\u5220\u9664\u9884\u8BBE">
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
                   value="${x(t.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${b}-api-key" 
                     value="${x(t.apiKey||"")}" 
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
                     value="${x(t.model||"")}" 
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
    `},bindEvents(t,e){let s=D();!s||!B(t)||(this._bindDropdownEvents(t,s),this._bindPresetListEvents(t,s),this._bindApiConfigEvents(t,s),this._bindFileEvents(t,s))},_bindDropdownEvents(t,e){let s=t.find(`#${b}-preset-dropdown`),r=s.find(".yyt-select-trigger"),o=s.find(".yyt-select-value"),n=()=>{let a=Oe(o.data("value"));if(!a){this._setSelectedPresetName(t,""),Bt(""),Rr(t,it(),b),t.find(".yyt-preset-item").removeClass("yyt-loaded"),s.find(".yyt-select-option").removeClass("yyt-selected"),s.find('.yyt-select-option[data-value=""]').addClass("yyt-selected"),S("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let i=Lt(a);if(!i){S("error",`\u9884\u8BBE "${a}" \u4E0D\u5B58\u5728`);return}this._setSelectedPresetName(t,a),Bt(a),Rr(t,i.apiConfig,b),t.find(".yyt-preset-item").removeClass("yyt-loaded"),t.find(`.yyt-preset-item[data-preset-name="${a.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),s.find(".yyt-select-option").removeClass("yyt-selected"),s.find(`.yyt-select-option[data-value="${a.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),S("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${a}"\uFF0C\u4FEE\u6539\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u914D\u7F6E\u201D\u4F1A\u8986\u76D6\u8BE5\u9884\u8BBE`)};r.on("click",a=>{a.preventDefault(),a.stopPropagation(),Ir(s)}),s.find(".yyt-select-option").on("click",a=>{if(e(a.target).closest(".yyt-option-star, .yyt-option-delete").length)return;let i=e(a.currentTarget),l=Oe(i.data("value")),c=i.find(".yyt-option-text").text(),d=i.closest(".yyt-select-dropdown").find(".yyt-select-option");this._setSelectedPresetName(t,l),o.text(c).data("value",l),d.removeClass("yyt-selected"),i.addClass("yyt-selected"),Ys(s)}),t.find(`#${b}-load-preset`).on("click",()=>{n()}),s.find(".yyt-option-star").on("click",a=>{a.preventDefault(),a.stopPropagation();let i=Oe(e(a.currentTarget).data("preset"));if(!i)return;let l=Wo(i);l.success?(S("success",l.message),this._rerender(t)):S("error",l.message)}),s.find(".yyt-option-delete").on("click",a=>{a.preventDefault(),a.stopPropagation();let i=Oe(e(a.currentTarget).data("preset"));if(!i||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${i}" \u5417\uFF1F`))return;let l=Fs(i);S(l.success?"info":"error",l.message),l.success&&($.emit(P.PRESET_DELETED,{name:i}),Oe(this._getSelectedPresetName(t))===i&&this._setSelectedPresetName(t,""),Oe(o.data("value"))===i&&o.text("-- \u5F53\u524D\u914D\u7F6E --").data("value",""),this._rerender(t))})},_bindPresetListEvents(t,e){t.find(".yyt-preset-item").on("click",s=>{let r=e(s.currentTarget),o=Oe(r.data("preset-name")),n=e(s.target).closest("[data-action]").data("action");if(n)switch(s.stopPropagation(),n){case"load":this._setSelectedPresetName(t,o),t.find(".yyt-select-value").text(o).data("value",o),t.find(".yyt-select-option").removeClass("yyt-selected"),t.find(`.yyt-select-option[data-value="${o.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),t.find(`#${b}-load-preset`).trigger("click");break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${o}" \u5417\uFF1F`)){let a=Fs(o);S(a.success?"info":"error",a.message),a.success&&($.emit(P.PRESET_DELETED,{name:o}),Oe(this._getSelectedPresetName(t))===o&&this._setSelectedPresetName(t,""),this._rerender(t))}break}})},_bindApiConfigEvents(t,e){t.find(`#${b}-use-main-api`).on("change",function(){let s=e(this).is(":checked"),r=t.find(`#${b}-custom-api-fields`);s?r.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):r.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),t.find(`#${b}-toggle-key-visibility`).on("click",function(){let s=t.find(`#${b}-api-key`),r=s.attr("type");s.attr("type",r==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),t.find(`#${b}-load-models`).on("click",async()=>{let s=t.find(`#${b}-load-models`),r=t.find(`#${b}-model`),o=t.find(`#${b}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let n=qs(t,b),a=await zo(n);if(a.length>0){o.empty(),a.forEach(l=>{o.append(`<option value="${x(l)}">${x(l)}</option>`)}),r.hide(),o.show();let i=r.val();i&&a.includes(i)&&o.val(i),o.off("change").on("change",function(){r.val(e(this).val())}),S("success",`\u5DF2\u52A0\u8F7D ${a.length} \u4E2A\u6A21\u578B`)}else S("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(n){S("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${n.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${b}-model`).on("focus",function(){let s=t.find(`#${b}-model-select`);e(this).show(),s.hide()}),t.find(`#${b}-save-api-config`).on("click",()=>{let s=qs(t,b),r=Oe(Mr()),o=us(s);if(!o.valid&&!s.useMainApi){S("error",o.errors.join(", "));return}if(r){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${r}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230\u201C\u5F53\u524D\u914D\u7F6E\u201D`)){ds(s),Bt(""),this._setSelectedPresetName(t,""),S("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"),this._rerender(t);return}ds(s);let n=Uo(r,{apiConfig:s});n.success?(this._setSelectedPresetName(t,r),S("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${r}"`),Bt(r),$.emit(P.PRESET_UPDATED,{name:r}),this._rerender(t)):S("error",n.message);return}ds(s),S("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),t.find(`#${b}-reset-api-config`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")&&(Bt(""),this._setSelectedPresetName(t,""),ds({url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9}),this._rerender(t),S("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E"))}),t.find(`#${b}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(t,e)})},_bindFileEvents(t,e){t.find(`#${b}-export-presets`).on("click",()=>{try{let s=Ho();lt(s,`youyou_toolkit_presets_${Date.now()}.json`),S("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){S("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${b}-import-presets`).on("click",()=>{t.find(`#${b}-import-file`).click()}),t.find(`#${b}-import-file`).on("change",async s=>{let r=s.target.files[0];if(r){try{let o=await ct(r),n=Yo(o,{overwrite:!0});S(n.success?"success":"error",n.message),n.imported>0&&this._rerender(t)}catch(o){S("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}})},_showSavePresetDialog(t,e){let r=xt().map(d=>d.name),o=qo("\u65B0\u9884\u8BBE"),n=`
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
                     value="${x(o)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
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
    `;this._removeDialog(t),t.append(n);let a=t.find(`#${b}-dialog-overlay`),i=a.find(`#${b}-dialog-preset-name`),l=a.find(`#${b}-dialog-preset-desc`);i.focus().select();let c=()=>a.remove();a.find(`#${b}-dialog-close, #${b}-dialog-cancel`).on("click",c),a.on("click",function(d){d.target===this&&c()}),a.find(`#${b}-dialog-save`).on("click",()=>{let d=i.val().trim(),u=l.val().trim();if(!d){S("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),i.focus();return}if(r.includes(d)){if(!confirm(`\u9884\u8BBE "${d}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;Fs(d),$.emit(P.PRESET_DELETED,{name:d})}let y=qs(t,b),p=Er({name:d,description:u,apiConfig:y});p.success?(S("success",p.message),this._setSelectedPresetName(t,d),c(),$.emit(P.PRESET_CREATED,{preset:p.preset}),this._rerender(t)):S("error",p.message)}),i.on("keypress",function(d){d.which===13&&a.find(`#${b}-dialog-save`).click()})},destroy(t){!D()||!B(t)||(this._removeDialog(t),Ie(t),t.removeData(Zo),t.off())},getStyles(){return`
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
    `},renderTo(t){let e=this.render({selectedPresetName:this._getSelectedPresetName(t)});t.html(e),this.bindEvents(t,{})}}});var za={};ye(za,{MESSAGE_MACROS:()=>Ka,addTagRule:()=>ps,createRuleTemplate:()=>Da,default:()=>sd,deleteRulePreset:()=>La,deleteRuleTemplate:()=>Na,deleteTagRule:()=>Lr,escapeRegex:()=>Ut,exportRulesConfig:()=>Ur,extractComplexTag:()=>Ca,extractCurlyBraceTag:()=>nn,extractHtmlFormatTag:()=>Pa,extractSimpleTag:()=>on,extractTagContent:()=>Wt,generateTagSuggestions:()=>Or,getAllRulePresets:()=>Kr,getAllRuleTemplates:()=>Ra,getContentBlacklist:()=>jt,getRuleTemplate:()=>$a,getTagRules:()=>dt,importRulesConfig:()=>Wr,isValidTagName:()=>rn,loadRulePreset:()=>zr,saveRulesAsPreset:()=>Br,scanTextForTags:()=>Dr,setContentBlacklist:()=>Xs,setTagRules:()=>Nr,shouldSkipContent:()=>sn,testRegex:()=>Ba,updateRuleTemplate:()=>Oa,updateTagRule:()=>gs});function ed(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...tn],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function Ce(){return C.get(Ia,ed())}function Qe(t){C.set(Ia,t)}function $r(){let t=Ce();return be=t.ruleTemplates||[...tn],re=t.tagRules||[],Me=t.contentBlacklist||[],{ruleTemplates:be,tagRules:re,contentBlacklist:Me}}function Ut(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function sn(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let s=t.toLowerCase();return e.some(r=>{let o=r.trim().toLowerCase();return o&&s.includes(o)})}function rn(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!td.includes(t.toLowerCase())}function on(t,e){if(!t||!e)return[];let s=[],r=Ut(e),o=new RegExp(`<${r}>([\\s\\S]*?)<\\/${r}>`,"gi");[...t.matchAll(o)].forEach(l=>{l[1]&&s.push(l[1].trim())});let a=(t.match(new RegExp(`<${r}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${r}>`,"gi"))||[]).length;return a>i&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${a-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),s}function nn(t,e){if(!t||!e)return[];let s=[],r=Ut(e),o=new RegExp(`\\{${r}\\|`,"gi"),n;for(;(n=o.exec(t))!==null;){let a=n.index,i=a+n[0].length,l=1,c=i;for(;c<t.length&&l>0;)t[c]==="{"?l++:t[c]==="}"&&l--,c++;if(l===0){let d=t.substring(i,c-1);d.trim()&&s.push(d.trim())}o.lastIndex=a+1}return s}function Ca(t,e){if(!t||!e)return[];let s=e.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let r=s[0].trim(),o=s[1].trim(),n=o.match(/<\/(\w+)>/);if(!n)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${o}`),[];let a=n[1],i=new RegExp(`${Ut(r)}([\\s\\S]*?)<\\/${a}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(d=>{d[1]&&l.push(d[1].trim())}),l}function Pa(t,e){if(!t||!e)return[];let s=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let r=s[1],o=[],n=new RegExp(`<${r}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${r}>`,"gi");[...t.matchAll(n)].forEach(c=>{c[1]&&o.push(c[1].trim())});let i=(t.match(new RegExp(`<${r}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${r}>`,"gi"))||[]).length;return i>l&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${r}> \u6807\u7B7E`),o}function Wt(t,e,s=[]){if(!t)return"";if(!e||e.length===0)return t;let r=e.filter(d=>d.type==="exclude"&&d.enabled),o=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),n=e.filter(d=>d.type==="regex_exclude"&&d.enabled),a=t;for(let d of r)try{let u=new RegExp(`<${Ut(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Ut(d.value)}>`,"gi");a=a.replace(u,"")}catch(u){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:d,error:u})}let i=[];if(o.length>0)for(let d of o){let u=[];try{if(d.type==="include")u.push(...on(a,d.value)),u.push(...nn(a,d.value));else if(d.type==="regex_include"){let y=new RegExp(d.value,"gi");[...a.matchAll(y)].forEach(f=>{f[1]&&u.push(f[1])})}}catch(y){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:d,error:y})}u.forEach(y=>i.push(y.trim()))}else i.push(a);let l=[];for(let d of i){for(let u of n)try{let y=new RegExp(u.value,"gi");d=d.replace(y,"")}catch(y){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:u,error:y})}sn(d,s)||l.push(d)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function Dr(t,e={}){let s=performance.now(),{chunkSize:r=5e4,maxTags:o=100,timeoutMs:n=5e3}=e,a=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let u=0;u<t.length;u+=r){let y=t.slice(u,Math.min(u+r,t.length));if(c++,l+=y.length,performance.now()-s>n){console.warn(`[YouYouToolkit] Tag scanning timed out after ${n}ms`);break}let p;for(;(p=i.exec(y))!==null&&a.size<o;){let f=(p[1]||p[2]).toLowerCase();rn(f)&&a.add(f)}if(a.size>=o)break;c%5===0&&await new Promise(f=>setTimeout(f,0))}let d=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(d-s),processedChars:l,totalChars:t.length,chunkCount:c,tagsFound:a.size}}}function Or(t,e=25){let s=t.tags.slice(0,e);return{suggestions:s,stats:{totalFound:t.stats.tagsFound,finalCount:s.length}}}function Ra(){return be.length===0&&$r(),be}function $a(t){return be.find(e=>e.id===t)}function Da(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return be.push(e),an(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function Oa(t,e){let s=be.findIndex(r=>r.id===t);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(be[s]={...be[s],...e,updatedAt:new Date().toISOString()},an(),{success:!0,template:be[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function Na(t){let e=be.findIndex(s=>s.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(be.splice(e,1),an(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function an(){let t=Ce();t.ruleTemplates=be,Qe(t)}function dt(){return re||$r(),re}function Nr(t){re=t||[];let e=Ce();e.tagRules=re,Qe(e)}function ps(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};re.push(e);let s=Ce();return s.tagRules=re,Qe(s),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function gs(t,e){if(t<0||t>=re.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};re[t]={...re[t],...e};let s=Ce();return s.tagRules=re,Qe(s),{success:!0,rule:re[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function Lr(t){if(t<0||t>=re.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};re.splice(t,1);let e=Ce();return e.tagRules=re,Qe(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function jt(){return Me||$r(),Me}function Xs(t){Me=t||[];let e=Ce();e.contentBlacklist=Me,Qe(e)}function Br(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=Ce();s.tagRulePresets||(s.tagRulePresets={});let r=`preset-${Date.now()}`;return s.tagRulePresets[r]={id:r,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(re)),blacklist:JSON.parse(JSON.stringify(Me)),createdAt:new Date().toISOString()},Qe(s),{success:!0,preset:s.tagRulePresets[r],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function Kr(){let e=Ce().tagRulePresets||{};return Object.values(e)}function zr(t){let e=Ce(),r=(e.tagRulePresets||{})[t];return r?(re=JSON.parse(JSON.stringify(r.rules||[])),Me=JSON.parse(JSON.stringify(r.blacklist||[])),e.tagRules=re,e.contentBlacklist=Me,Qe(e),{success:!0,preset:r,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function La(t){let e=Ce(),s=e.tagRulePresets||{};return s[t]?(delete s[t],e.tagRulePresets=s,Qe(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Ur(){return JSON.stringify({tagRules:re,contentBlacklist:Me,ruleTemplates:be,tagRulePresets:Ce().tagRulePresets||{}},null,2)}function Wr(t,e={overwrite:!0}){try{let s=JSON.parse(t);if(e.overwrite)re=s.tagRules||[],Me=s.contentBlacklist||[],be=s.ruleTemplates||tn;else if(s.tagRules&&re.push(...s.tagRules),s.contentBlacklist){let o=new Set(Me.map(n=>n.toLowerCase()));s.contentBlacklist.forEach(n=>{o.has(n.toLowerCase())||Me.push(n)})}let r=Ce();return r.tagRules=re,r.contentBlacklist=Me,r.ruleTemplates=be,s.tagRulePresets&&(r.tagRulePresets={...r.tagRulePresets||{},...s.tagRulePresets}),Qe(r),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function Ba(t,e,s="g",r=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let o=new RegExp(t,s),n=[];if(s.includes("g")){let a;for(;(a=o.exec(e))!==null;)a.length>1?n.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[r]||a[1]||a[0]}):n.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=o.exec(e);a&&n.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[r]||a[1]:a[0]})}return{success:!0,matches:n,count:n.length,extracted:n.map(a=>a.extracted)}}catch(o){return{success:!1,error:o.message,matches:[]}}}var Ia,td,tn,be,re,Me,Ka,sd,jr=W(()=>{De();Ia="settings";td=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],tn=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],be=[],re=[],Me=[];Ka={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};$r();sd={extractTagContent:Wt,extractSimpleTag:on,extractCurlyBraceTag:nn,extractComplexTag:Ca,extractHtmlFormatTag:Pa,escapeRegex:Ut,shouldSkipContent:sn,isValidTagName:rn,scanTextForTags:Dr,generateTagSuggestions:Or,getAllRuleTemplates:Ra,getRuleTemplate:$a,createRuleTemplate:Da,updateRuleTemplate:Oa,deleteRuleTemplate:Na,getTagRules:dt,setTagRules:Nr,addTagRule:ps,updateTagRule:gs,deleteTagRule:Lr,getContentBlacklist:jt,setContentBlacklist:Xs,saveRulesAsPreset:Br,getAllRulePresets:Kr,loadRulePreset:zr,deleteRulePreset:La,exportRulesConfig:Ur,importRulesConfig:Wr,testRegex:Ba,MESSAGE_MACROS:Ka}});var Ft,ln=W(()=>{ge();Se();jr();Ft={id:"regexExtractPanel",render(t){let e=dt(),s=jt(),r=Kr();return`
      <div class="yyt-regex-panel">
        <!-- \u89C4\u5219\u7F16\u8F91\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-filter"></i>
            <span>\u6807\u7B7E\u63D0\u53D6\u89C4\u5219</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${b}-show-examples" style="margin-left: auto;">
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
    `},_renderRulesEditor(t,e,s){let r=t.length>0?t.map((n,a)=>this._renderRuleItem(n,a)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',o=s.length>0?s.map(n=>`<option value="${n.id}">${x(n.name)}</option>`).join(""):"";return`
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
                 value="${x(e.join(", "))}" 
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
               value="${x(t.value||"")}">
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
      </div>
    `},bindEvents(t,e){let s=D();!s||!B(t)||(t.off(".yytRegex"),this._bindRuleEditorEvents(t,s),this._bindPresetEvents(t,s),this._bindTestEvents(t,s),this._bindFileEvents(t,s),we(t,{namespace:"yytRegexSelect",selectors:[`#${b}-rule-preset-select`]}))},_bindRuleEditorEvents(t,e){t.on("change.yytRegex",".yyt-rule-type",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).val();gs(r,{type:o}),S("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),t.on("change.yytRegex",".yyt-rule-value",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).val().trim();gs(r,{value:o})}),t.on("change.yytRegex",".yyt-rule-enabled",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).is(":checked");gs(r,{enabled:o}),S("info",o?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),t.on("click.yytRegex",".yyt-rule-delete",s=>{let o=e(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(Lr(o),this.renderTo(t),S("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.on("click.yytRegex",`#${b}-add-rule`,()=>{ps({type:"include",value:"",enabled:!0}),this.renderTo(t),S("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),t.on("click.yytRegex",`#${b}-scan-tags`,async()=>{let s=t.find(`#${b}-scan-tags`),r=t.find(`#${b}-test-input`).val();if(!r||!r.trim()){S("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let o=await Dr(r,{maxTags:50,timeoutMs:3e3}),{suggestions:n,stats:a}=Or(o,25);if(n.length===0){S("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),t.find(`#${b}-tag-suggestions-container`).hide();return}let i=t.find(`#${b}-tag-list`);t.find(`#${b}-tag-scan-stats`).text(`${a.finalCount}/${a.totalFound} \u4E2A\u6807\u7B7E, ${o.stats.processingTimeMs}ms`),i.empty(),n.forEach(c=>{let d=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${x(c)}</button>`);d.on("click",()=>{if(dt().some(p=>p.type==="include"&&p.value===c)){S("warning",`\u89C4\u5219 "\u5305\u542B: ${c}" \u5DF2\u5B58\u5728`);return}ps({type:"include",value:c,enabled:!0}),this.renderTo(t),S("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${c}"`)}),i.append(d)}),t.find(`#${b}-tag-suggestions-container`).show(),S("success",`\u53D1\u73B0 ${n.length} \u4E2A\u6807\u7B7E`)}catch(o){S("error",`\u626B\u63CF\u5931\u8D25: ${o.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.on("click.yytRegex",`#${b}-add-exclude-cot`,()=>{let s=dt(),r="<!--[\\s\\S]*?-->";if(s.some(n=>n.type==="regex_exclude"&&n.value===r)){S("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}ps({type:"regex_exclude",value:r,enabled:!0}),this.renderTo(t),S("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),t.on("change.yytRegex",`#${b}-content-blacklist`,function(){let r=e(this).val().split(",").map(o=>o.trim()).filter(o=>o);Xs(r),S("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${r.length} \u4E2A\u5173\u952E\u8BCD`)}),t.on("click.yytRegex",`#${b}-show-examples`,()=>{alert(`
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
      `)})},_bindPresetEvents(t,e){t.on("click.yytRegex",`#${b}-load-rule-preset`,()=>{let s=t.find(`#${b}-rule-preset-select`).val();if(!s){S("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let r=zr(s);r.success?(this.renderTo(t),S("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${r.preset.name}`),$.emit(P.REGEX_PRESET_LOADED,{preset:r.preset})):S("error",r.message)}),t.on("click.yytRegex",`#${b}-save-rule-preset`,()=>{let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let r=Br(s.trim());r.success?(this.renderTo(t),S("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):S("error",r.message)})},_bindTestEvents(t,e){t.on("click.yytRegex",`#${b}-test-extract`,()=>{let s=t.find(`#${b}-test-input`).val();if(!s||!s.trim()){S("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let r=dt(),o=jt(),n=Wt(s,r,o),a=t.find(`#${b}-test-result-container`),i=t.find(`#${b}-test-result`);a.show(),!n||!n.trim()?(i.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),S("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(i.html(`<pre class="yyt-code-block">${x(n)}</pre>`),S("success","\u63D0\u53D6\u5B8C\u6210"),$.emit(P.REGEX_EXTRACTED,{result:n}))}),t.on("click.yytRegex",`#${b}-test-clear`,()=>{t.find(`#${b}-test-input`).val(""),t.find(`#${b}-test-result-container`).hide()})},_bindFileEvents(t,e){t.on("click.yytRegex",`#${b}-import-rules`,()=>{t.find(`#${b}-import-rules-file`).click()}),t.on("change.yytRegex",`#${b}-import-rules-file`,async s=>{let r=s.target.files[0];if(r){try{let o=await ct(r),n=Wr(o,{overwrite:!0});n.success?(this.renderTo(t),S("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):S("error",n.message)}catch(o){S("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.on("click.yytRegex",`#${b}-export-rules`,()=>{try{let s=Ur();lt(s,`youyou_toolkit_rules_${Date.now()}.json`),S("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){S("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.on("click.yytRegex",`#${b}-reset-rules`,()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(Nr([]),Xs([]),this.renderTo(t),S("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(t){!D()||!B(t)||(ue(t,"yytRegexSelect"),t.off(".yytRegex"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Ga={};ye(Ga,{createDefaultToolDefinition:()=>Ht,default:()=>ad,deleteTool:()=>Yr,deleteToolPreset:()=>Ha,exportTools:()=>Vr,getAllTools:()=>Tt,getCurrentToolPreset:()=>Ya,getTool:()=>fs,getToolPresets:()=>qr,importTools:()=>Jr,normalizeToolDefinitionToRuntimeConfig:()=>Zs,resetTools:()=>Xr,saveTool:()=>Hr,saveToolPreset:()=>Fa,setCurrentToolPreset:()=>qa,setToolEnabled:()=>Gr});function rd(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,s])=>[e,Ht({...s||{},id:e})]))}function Qs(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function cn(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>0?s:e}function Ua(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>=0?s:e}function Wa(t={}){return{enabled:t?.enabled===!0,settleMs:Ua(t?.settleMs,1200),cooldownMs:Ua(t?.cooldownMs,5e3)}}function ja(t={}){return{enabled:t?.enabled===!0,selected:Qs(t?.selected)}}function od(t=[]){let e=Array.isArray(t)?t.map(s=>({role:String(s?.role||"user").trim().toUpperCase(),content:String(s?.content||"").trim()})).filter(s=>s.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(s=>`\u3010${s.role||"USER"}\u3011
${s.content}`).join(`

`)}function nd(t,e={}){let s=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(s)return s;let r=od(e?.config?.messages||[]);return r||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function Ht(t={}){let e=new Date().toISOString(),s=t?.config||{};return{...Ne,...t,id:t?.id||Ne.id,icon:t?.icon||Ne.icon,order:Number.isFinite(t?.order)?t.order:Ne.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:Ne.promptTemplate,extractTags:Qs(t?.extractTags),config:{execution:{...Ne.config.execution,...s.execution||{},timeout:cn(s?.execution?.timeout,Ne.config.execution.timeout),retries:Math.max(0,parseInt(s?.execution?.retries,10)||Ne.config.execution.retries)},api:{...Ne.config.api,...s.api||{}},messages:Array.isArray(s?.messages)?s.messages:[],context:{...Ne.config.context,...s.context||{},depth:cn(s?.context?.depth,Ne.config.context.depth),includeTags:Qs(s?.context?.includeTags),excludeTags:Qs(s?.context?.excludeTags)},automation:Wa(s?.automation),worldbooks:ja(s?.worldbooks)},enabled:t?.enabled!==!1,metadata:{...Ne.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function Zs(t,e={},s={}){let r=Ht({...e,id:t||e?.id||""}),o=Qs(r?.extractTags?.length?r.extractTags:r?.config?.context?.includeTags),n=String(e?.output?.apiPreset||r?.config?.api?.preset||"").trim(),a=nd(t,r),i=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():s.defaultOutputMode||"follow_ai";return{id:r.id||t,name:r.name||t,icon:r.icon||"fa-screwdriver-wrench",description:r.description||"",enabled:r.enabled!==!1,order:Number.isFinite(r.order)?r.order:100,bypass:{enabled:r?.config?.api?.useBypass===!0&&!!r?.config?.api?.bypassPreset,presetId:r?.config?.api?.bypassPreset||""},output:{mode:i,apiPreset:n,overwrite:!0,enabled:!0},automation:Wa(r?.config?.automation),worldbooks:ja(r?.config?.worldbooks),extraction:{enabled:!0,maxMessages:cn(r?.config?.context?.depth,5),selectors:o},promptTemplate:a,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:n,extractTags:o,isCustom:!0,category:r.category||"utility",metadata:{...r.metadata||{}}}}function Tt(){let t=te.get(ae.TOOLS),e=rd(t);return t&&JSON.stringify(t)!==JSON.stringify(e)&&te.set(ae.TOOLS,e),{...Fr,...e}}function fs(t){return Tt()[t]||null}function Hr(t,e){if(!t||!e)return!1;let s=te.get(ae.TOOLS)||{},r=!s[t]&&!Fr[t],o=Ht({...s[t]||{},...e,id:t,metadata:{...s[t]?.metadata||{},...e.metadata||{},createdAt:s[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return s[t]=o,te.set(ae.TOOLS,s),$.emit(r?P.TOOL_REGISTERED:P.TOOL_UPDATED,{toolId:t,tool:o}),!0}function Yr(t){let e=te.get(ae.TOOLS)||{};return!e[t]&&!Fr[t]||Fr[t]?!1:(delete e[t],te.set(ae.TOOLS,e),$.emit(P.TOOL_UNREGISTERED,{toolId:t}),!0)}function qr(){return te.get(ae.PRESETS)||{}}function Fa(t,e){if(!t||!e)return!1;let s=qr(),r=!s[t];return s[t]={...e,name:t,updatedAt:new Date().toISOString()},te.set(ae.PRESETS,s),$.emit(r?P.PRESET_CREATED:P.PRESET_UPDATED,{type:"tool",presetName:t,preset:s[t]}),!0}function Ha(t){let e=qr();return e[t]?(delete e[t],te.set(ae.PRESETS,e),$.emit(P.PRESET_DELETED,{type:"tool",presetName:t}),!0):!1}function Ya(){return te.get(ae.CURRENT_PRESET)||""}function qa(t){return te.set(ae.CURRENT_PRESET,t||""),$.emit(P.PRESET_ACTIVATED,{type:"tool",presetName:t}),!0}function Gr(t,e){let s=fs(t);if(!s)return!1;let r=te.get(ae.TOOLS)||{};return r[t]=Ht({...s,id:t,enabled:e,metadata:{...s?.metadata||{},createdAt:s?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),te.set(ae.TOOLS,r),$.emit(e?P.TOOL_ENABLED:P.TOOL_DISABLED,{toolId:t,enabled:e}),!0}function Vr(){let t=te.get(ae.TOOLS)||{},e=te.get(ae.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function Jr(t,e=!1){try{let s=typeof e=="object"?!!e?.overwrite:!!e,r=JSON.parse(t);if(!r||typeof r!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let o=s?{}:te.get(ae.TOOLS)||{},n=s?{}:te.get(ae.PRESETS)||{},a=0,i=0;if(r.tools&&typeof r.tools=="object"){for(let[l,c]of Object.entries(r.tools))!c||typeof c!="object"||(o[l]=Ht({...c,id:l}),a+=1);te.set(ae.TOOLS,o)}if(r.presets&&typeof r.presets=="object"){for(let[l,c]of Object.entries(r.presets))!c||typeof c!="object"||(n[l]={...c,name:l,updatedAt:new Date().toISOString()},i+=1);te.set(ae.PRESETS,n)}return{success:!0,toolsImported:a,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function Xr(){te.remove(ae.TOOLS),te.remove(ae.PRESETS),te.remove(ae.CURRENT_PRESET)}var Ne,Fr,ae,ad,Qr=W(()=>{De();ge();Ne={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},Fr={},ae={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};ad={getAllTools:Tt,getTool:fs,saveTool:Hr,deleteTool:Yr,setToolEnabled:Gr,exportTools:Vr,importTools:Jr,resetTools:Xr,getToolPresets:qr,saveToolPreset:Fa,deleteToolPreset:Ha,getCurrentToolPreset:Ya,setCurrentToolPreset:qa,createDefaultToolDefinition:Ht,normalizeToolDefinitionToRuntimeConfig:Zs}});var pi={};ye(pi,{TOOL_CATEGORIES:()=>Va,TOOL_REGISTRY:()=>ms,appendToolRuntimeHistory:()=>ii,clearToolApiPreset:()=>oi,default:()=>gd,ensureToolRuntimeConfig:()=>Zr,getAllDefaultToolConfigs:()=>ci,getAllToolApiBindings:()=>ni,getAllToolFullConfigs:()=>sr,getEnabledTools:()=>di,getToolApiPreset:()=>gn,getToolBaseConfig:()=>bs,getToolConfig:()=>tr,getToolFullConfig:()=>Z,getToolList:()=>ei,getToolSubTabs:()=>ti,getToolWindowState:()=>yi,hasTool:()=>pn,onPresetDeleted:()=>ai,patchToolRuntime:()=>_t,registerTool:()=>Qa,resetToolConfig:()=>li,resetToolRegistry:()=>si,saveToolConfig:()=>Be,saveToolWindowState:()=>ui,setToolApiPreset:()=>ri,setToolApiPresetConfig:()=>ud,setToolBypassConfig:()=>yd,setToolOutputMode:()=>dd,setToolPromptTemplate:()=>pd,unregisterTool:()=>Za,updateToolRuntime:()=>fn});function qt(t={}){let e=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(t?.lastRunAt)?t.lastRunAt:0,lastStatus:typeof t?.lastStatus=="string"?t.lastStatus:"idle",lastError:typeof t?.lastError=="string"?t.lastError:"",lastDurationMs:Number.isFinite(t?.lastDurationMs)?t.lastDurationMs:0,successCount:Number.isFinite(t?.successCount)?t.successCount:0,errorCount:Number.isFinite(t?.errorCount)?t.errorCount:0,lastMessageKey:typeof t?.lastMessageKey=="string"?t.lastMessageKey:"",lastExecutionKey:typeof t?.lastExecutionKey=="string"?t.lastExecutionKey:"",lastExecutionPath:typeof t?.lastExecutionPath=="string"?t.lastExecutionPath:"",lastWritebackStatus:typeof t?.lastWritebackStatus=="string"?t.lastWritebackStatus:"",lastFailureStage:typeof t?.lastFailureStage=="string"?t.lastFailureStage:"",lastSlotBindingKey:typeof t?.lastSlotBindingKey=="string"?t.lastSlotBindingKey:"",lastSlotRevisionKey:typeof t?.lastSlotRevisionKey=="string"?t.lastSlotRevisionKey:"",lastSlotTransactionId:typeof t?.lastSlotTransactionId=="string"?t.lastSlotTransactionId:"",lastSourceMessageId:typeof t?.lastSourceMessageId=="string"?t.lastSourceMessageId:"",lastSourceSwipeId:typeof t?.lastSourceSwipeId=="string"?t.lastSourceSwipeId:"",lastContentCommitted:t?.lastContentCommitted===!0,lastHostCommitApplied:t?.lastHostCommitApplied===!0,lastRefreshRequested:t?.lastRefreshRequested===!0,lastRefreshConfirmed:t?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof t?.lastPreferredCommitMethod=="string"?t.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof t?.lastAppliedCommitMethod=="string"?t.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(t?.lastRefreshMethodCount)?t.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(t?.lastRefreshMethods)?t.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(t?.lastRefreshConfirmChecks)?t.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof t?.lastRefreshConfirmedBy=="string"?t.lastRefreshConfirmedBy:"",lastTraceId:typeof t?.lastTraceId=="string"?t.lastTraceId:"",lastAutoRunAt:Number.isFinite(t?.lastAutoRunAt)?t.lastAutoRunAt:0,lastAutoStatus:typeof t?.lastAutoStatus=="string"?t.lastAutoStatus:"idle",lastAutoMessageId:typeof t?.lastAutoMessageId=="string"?t.lastAutoMessageId:"",lastAutoSwipeId:typeof t?.lastAutoSwipeId=="string"?t.lastAutoSwipeId:"",lastAutoRevisionKey:typeof t?.lastAutoRevisionKey=="string"?t.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof t?.lastAutoWritebackStatus=="string"?t.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:t?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof t?.lastAutoSkipReason=="string"?t.lastAutoSkipReason:"",recentWritebackHistory:e}}function id(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function Ja(){let t=Tt()||{};return Object.entries(t).filter(([e])=>!er[e]).map(([e,s])=>[e,s||{}])}function dn(t={}){return t?.toolKind==="script"?"script":t?.toolKind==="ai"?"ai":t?.output?.mode==="local_transform"||t?.processor?.type?"script":"ai"}function Xa(){let t=Array.isArray(ms.tools?.subTabs)?ms.tools.subTabs.map((s,r)=>({...s,order:Number.isFinite(s?.order)?s.order:r,toolKind:dn(s),toolGroupLabel:dn(s)==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"})):[],e=Ja().map(([s,r],o)=>{let n=Zs(s,r),a=dn(n);return{id:s,name:n.name||s,icon:n.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(n.order)?n.order:100+o,isCustom:!0,description:n.description||"",toolKind:a,toolGroupLabel:a==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"}});return[...t,...e].sort((s,r)=>(s.order??0)-(r.order??0))}function ld(t,e={}){let s=Zs(t,e,{defaultOutputMode:"follow_ai"});return{...s,runtime:qt(s.runtime)}}function yn(t){let e=er[t];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:qt(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let r=(Tt()||{})[t]||null;return r?ld(t,r):tr(t)}function bs(t){let e=yn(t);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function cd(t,e={},s=""){if(!t)return null;let r={...t,...e,id:t.id||e.id};r.output={...t.output||{},...e.output||{}},r.automation={enabled:t?.automation?.enabled===!0||e?.automation?.enabled===!0,settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(t?.automation?.settleMs)?t.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(t?.automation?.cooldownMs)?t.automation.cooldownMs:5e3},r.bypass={...t.bypass||{},...e.bypass||{}},r.worldbooks={...t.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(t?.worldbooks?.selected)?[...t.worldbooks.selected]:[]},r.runtime=qt({...t.runtime||{},...e.runtime||{}}),r.extraction={...t.extraction||{},...e.extraction||{}},r.processor={...t.processor||{},...e.processor||{},options:{...t?.processor?.options||{},...e?.processor?.options||{}}};let o=e?.output?.apiPreset||e?.apiPreset||r.output?.apiPreset||r.apiPreset||s||"";return r.output={...r.output||{},apiPreset:o},r.apiPreset=o,(!Array.isArray(r.extraction.selectors)||r.extraction.selectors.length===0)&&Array.isArray(r.extractTags)&&r.extractTags.length>0&&(r.extraction.selectors=[...r.extractTags]),(!Array.isArray(r.extractTags)||r.extractTags.length===0)&&(r.extractTags=Array.isArray(r.extraction.selectors)?[...r.extraction.selectors]:[]),t.isCustom?r.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?r.enabled=e.enabled:r.enabled=t.enabled!==!1,r}function Qa(t,e){if(!t||typeof t!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let r of s)if(!e[r])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${r}`),!1;return Ze[t]={id:t,...e,order:e.order??Object.keys(Ze).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function Za(t){return Ze[t]?(delete Ze[t],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function ei(t=!0){let e=Object.values(Ze).map(s=>s.id==="tools"?{...s,subTabs:Xa()}:s);return t?e.sort((s,r)=>(s.order??0)-(r.order??0)):e}function tr(t){return t==="tools"&&Ze[t]?{...Ze[t],subTabs:Xa()}:Ze[t]||null}function pn(t){return!!Ze[t]}function ti(t){let e=tr(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function si(){Ze={...ms},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function ri(t,e){if(!pn(t))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let s=C.get(Le)||{};return s[t]=e||"",C.set(Le,s),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function gn(t){return(C.get(Le)||{})[t]||""}function oi(t){let e=C.get(Le)||{};delete e[t],C.set(Le,e),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function ni(){return C.get(Le)||{}}function ai(t){let e=C.get(Le)||{},s=!1;for(let r in e)e[r]===t&&(e[r]="",s=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${r}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&C.set(Le,e)}function Z(t){let e=yn(t);if(!e)return tr(t);let r=(C.get(Yt)||{})[t]||{},o=gn(t);return cd({...e,id:t},r,o)}function Zr(t){if(!t)return!1;let e=yn(t);if(!e)return!1;let s=C.get(Yt)||{};if(s[t])return!0;let r={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};s[t]=r,C.set(Yt,s);let o=C.get(Le)||{};return o[t]=r.output?.apiPreset||r.apiPreset||"",C.set(Le,o),$.emit(P.TOOL_UPDATED,{toolId:t,config:r}),!0}function Be(t,e,s={}){if(!t||!Z(t))return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:r=!0}=s,o=C.get(Yt)||{},n=C.get(Le)||{},a=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return o[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){o[t][l]={...e.output,apiPreset:a};return}if(l==="apiPreset"){o[t][l]=a;return}o[t][l]=e[l]}}),o[t].apiPreset===void 0&&(o[t].apiPreset=a),!o[t].output&&e.output!==void 0&&(o[t].output={...e.output||{},apiPreset:a}),C.set(Yt,o),n[t]=a,C.set(Le,n),r&&$.emit(P.TOOL_UPDATED,{toolId:t,config:o[t]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function dd(t,e){let s=Z(t);return s?Be(t,{...s,output:{...s.output,mode:e}}):!1}function ud(t,e){let s=Z(t);return s?Be(t,{...s,apiPreset:e,output:{...s.output,apiPreset:e}}):!1}function yd(t,e){let s=Z(t);return s?Be(t,{...s,bypass:{...s.bypass,...e}}):!1}function pd(t,e){let s=Z(t);return s?Be(t,{...s,promptTemplate:e}):!1}function _t(t,e,s={}){let r=Z(t);if(!r)return!1;let{touchLastRunAt:o=!1,emitEvent:n=!1,emitRuntimeEvent:a=!0}=s,i=qt({...r.runtime||{},...e||{}});o&&(i.lastRunAt=Date.now());let l=Be(t,{...r,runtime:i},{emitEvent:n});return l&&a&&$.emit(P.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:i,previousRuntime:qt(r.runtime||{})}),l}function ii(t,e,s={},r={}){let o=Z(t);if(!o)return!1;let{limit:n=10,emitEvent:a=!1,emitRuntimeEvent:i=!0}=r,l=qt(o.runtime||{}),c=qt(o.runtime||{}),d="recentWritebackHistory",u={id:s?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:s?.at||Date.now(),...s};l[d]=id([...Array.isArray(l[d])?l[d]:[],u],n),u?.traceId&&(l.lastTraceId=u.traceId);let y=Be(t,{...o,runtime:l},{emitEvent:a});return y&&i&&$.emit(P.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:l,previousRuntime:c,historyType:e,historyEntry:u}),y}function fn(t,e,s={}){let{touchLastRunAt:r=!0,emitEvent:o=!1,emitRuntimeEvent:n=!0}=s;return _t(t,e,{touchLastRunAt:r,emitEvent:o,emitRuntimeEvent:n})}function li(t){if(!t||!er[t])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=C.get(Yt)||{};return delete e[t],C.set(Yt,e),$.emit(P.TOOL_UPDATED,{toolId:t,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function ci(){return{...er}}function sr(){let t=new Set([...Object.keys(er),...Ja().map(([e])=>e)]);return Array.from(t).map(e=>Z(e)).filter(Boolean)}function di(){return sr().filter(t=>t&&t.enabled)}function ui(t,e){let s=C.get(un)||{};s[t]={...e,updatedAt:Date.now()},C.set(un,s)}function yi(t){return(C.get(un)||{})[t]||null}var Yt,Le,un,er,ms,Va,Ze,gd,At=W(()=>{De();ge();Qr();Yt="tool_configs",Le="tool_api_bindings",un="tool_window_states";er={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},ms={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},toolManage:{id:"toolManage",name:"\u5DE5\u5177\u5217\u8868",icon:"fa-screwdriver-wrench",hasSubTabs:!1,description:"\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u7BA1\u7406\u81EA\u5B9A\u4E49\u5DE5\u5177",component:"ToolManagePanel",order:3},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel",toolKind:"ai"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel",toolKind:"ai"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel",toolKind:"ai"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel",toolKind:"script"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel",toolKind:"script"}]},tableWorkbench:{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",icon:"fa-table-cells",hasSubTabs:!1,description:"\u7ED3\u6784\u5316\u586B\u8868\u4E0E\u72B6\u6001\u9884\u89C8\u5DE5\u4F5C\u53F0",component:"TableWorkbenchPanel",order:5},bypass:{id:"bypass",name:"Ai\u6307\u4EE4\u9884\u8BBE",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406 Ai \u6307\u4EE4\u9884\u8BBE",component:"BypassPanel",order:6},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:7}},Va={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},Ze={...ms};gd={TOOL_REGISTRY:ms,TOOL_CATEGORIES:Va,registerTool:Qa,unregisterTool:Za,getToolList:ei,getToolConfig:tr,hasTool:pn,getToolSubTabs:ti,resetToolRegistry:si,setToolApiPreset:ri,getToolApiPreset:gn,clearToolApiPreset:oi,getAllToolApiBindings:ni,onPresetDeleted:ai,saveToolWindowState:ui,getToolWindowState:yi,getToolBaseConfig:bs,ensureToolRuntimeConfig:Zr,getToolFullConfig:Z,patchToolRuntime:_t,appendToolRuntimeHistory:ii,saveToolConfig:Be,resetToolConfig:li,getAllDefaultToolConfigs:ci,getAllToolFullConfigs:sr,getEnabledTools:di}});var Gt,mn=W(()=>{Se();Qr();At();Gt={id:"toolManagePanel",_removeDialog(t){if(!t?.length)return;let e=t.find("#yyt-tool-dialog-overlay");ue(e,"yytToolManageDialogSelect"),e.remove()},_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let s=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!s){S("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}s.switchMainTab("tools"),s.switchSubTab("tools",t)},render(t){let e=Tt(),s=Object.entries(e),r=s.filter(([,o])=>o?.enabled!==!1).length;return`
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
            <span class="yyt-tool-name">${x(r.name)}</span>
            <span class="yyt-tool-category">${x(r.category)}</span>
          </div>
          <div class="yyt-tool-controls">
            <label class="yyt-toggle yyt-tool-toggle">
              <input type="checkbox" ${r.enabled?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="yyt-tool-desc">${x(r.description)}</div>
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
      `},bindEvents(t,e){let s=D();!s||!B(t)||(t.off(".yytToolManage"),this._bindToolEvents(t,s),this._bindFileEvents(t,s))},_bindToolEvents(t,e){t.on("change.yytToolManage",".yyt-tool-toggle input",s=>{let r=e(s.currentTarget).closest(".yyt-tool-item"),o=r.data("tool-id"),n=e(s.currentTarget).is(":checked");Gr(o,n),r.toggleClass("yyt-tool-item-enabled",n).toggleClass("yyt-tool-item-disabled",!n),S("info",n?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.on("click.yytToolManage","#yyt-add-tool",()=>{this._showToolEditDialog(t,e,null)}),t.on("click.yytToolManage",'.yyt-tool-item [data-action="config"]',s=>{let r=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._openToolConfig(r)}),t.on("click.yytToolManage",'.yyt-tool-item [data-action="edit"]',s=>{let r=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._showToolEditDialog(t,e,r)}),t.on("click.yytToolManage",'.yyt-tool-item [data-action="delete"]',s=>{let r=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id"),o=fs(r);if(!r||!o||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177\u201C${o.name}\u201D\u5417\uFF1F`))return;if(!Yr(r)){S("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),S("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.on("click.yytToolManage","#yyt-import-tools",()=>{t.find("#yyt-import-tools-file").click()}),t.on("change.yytToolManage","#yyt-import-tools-file",async s=>{let r=s.target.files[0];if(r){try{let o=await ct(r),n=Jr(o,{overwrite:!1});S(n.success?"success":"error",n.message),n.success&&this.renderTo(t)}catch(o){S("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.on("click.yytToolManage","#yyt-export-tools",()=>{try{let s=Vr();lt(s,`youyou_toolkit_tools_${Date.now()}.json`),S("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){S("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.on("click.yytToolManage","#yyt-reset-tools",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(Xr(),this.renderTo(t),S("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,s){let r=s?fs(s):null,o=!!r,n=`
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
                       value="${r?x(r.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${r?x(r.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;this._removeDialog(t),t.append(n);let a=t.find("#yyt-tool-dialog-overlay"),i=a.find("#yyt-tool-name"),l=a.find("#yyt-tool-category"),c=a.find("#yyt-tool-desc"),d=a.find("#yyt-tool-timeout"),u=a.find("#yyt-tool-retries");we(a,{namespace:"yytToolManageDialogSelect",selectors:["#yyt-tool-category"]});let y=()=>{ue(a,"yytToolManageDialogSelect"),a.remove()};a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",y),a.on("click",function(p){p.target===this&&y()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let p=i.val().trim(),f=l.val(),h=c.val().trim(),m=parseInt(d.val())||6e4,_=parseInt(u.val())||3;if(!p){S("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let M=s||`tool_${Date.now()}`;if(!Hr(M,{name:p,category:f,description:h,promptTemplate:r?.promptTemplate||"",extractTags:Array.isArray(r?.extractTags)?r.extractTags:[],config:{execution:{timeout:m,retries:_},api:r?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(r?.config?.messages)?r.config.messages:[],context:{depth:r?.config?.context?.depth||3,includeTags:Array.isArray(r?.config?.context?.includeTags)?r.config.context.includeTags:[],excludeTags:Array.isArray(r?.config?.context?.excludeTags)?r.config.context.excludeTags:[]},worldbooks:{enabled:r?.config?.worldbooks?.enabled===!0,selected:Array.isArray(r?.config?.worldbooks?.selected)?r.config.worldbooks.selected:[]}},enabled:r?.enabled!==!1})){S("error",o?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}Zr(M),y(),this.renderTo(t),S("success",o?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),o||this._openToolConfig(M)})},destroy(t){!D()||!B(t)||(this._removeDialog(t),t.off(".yytToolManage"))},getStyles(){return`
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

      .yyt-dialog-wide {
        width: 480px;
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});function hs(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function eo(){return hs()?.SillyTavern||null}function X(t){return t==null?"":String(t).trim()}function fd(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let s of e)if(typeof s=="string"&&s.trim())return s.trim();return""}function md(t){let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||t?.is_user===!0?"user":t?.is_system===!0?"system":"assistant"}function gi(t=""){let e=String(t||"").trim();if(!e)return"empty";let s=0;for(let r=0;r<e.length;r+=1)s=(s<<5)-s+e.charCodeAt(r),s|=0;return`fp_${Math.abs(s).toString(36)}`}function fi(t={}){let e=X(t.chatId)||"chat_default",s=X(t.messageId)||"latest";return`${e}::${s}`}function mi(t={}){let e=fi(t),s=X(t.effectiveSwipeId)||"swipe:current",r=X(t.assistantContentFingerprint)||"empty";return`${e}::${s}::${r}`}function bd(t={}){let e=mi(t),s=X(t.eventType)||"MANUAL",r=X(t.traceId)||bi("manual");return`${e}::${s}::${r}`}function bi(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function hi(){let t=eo();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function vi(t=[]){let e=[],s=null,r=null;return t.forEach((o,n)=>{let a=md(o),i=fd(o);if(!i)return;let l=X(o?.messageId??o?.message_id??o?.id??o?.mid??o?.mesid??o?.chat_index??n),c=X(o?.swipe_id??o?.swipeId??o?.swipe??""),d={role:a,content:i,sourceId:l,swipeId:c,raw:o,index:n};e.push(d),a==="user"&&(s=d),a==="assistant"&&(r=d)}),{messages:e,lastUserMessage:s,lastAiMessage:r}}function hd(t,e,s){return X(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.this_chid??s?.id??"chat_default")||"chat_default"}async function bn(){let t=eo();if(!t)return null;try{let e=t.this_chid,s=t.characters||[];if(e>=0&&e<s.length){let r=s[e];return{id:e,name:r?.name||"",description:r?.description||"",personality:r?.personality||"",scenario:r?.scenario||"",firstMes:r?.first_mes||"",mesExample:r?.mes_example||""}}}catch(e){console.error("[YouYouToolkit:ExecutionContext] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function vd(t="",e=null){let s=String(t||""),r=e?.YouYouToolkit_toolOutputs;return r&&typeof r=="object"&&Object.values(r).forEach(o=>{let n=String(o?.blockText||o?.content||"").trim();n&&s.includes(n)&&(s=s.replace(n,"").trimEnd())}),s.trim()}function xd(t,e={}){let s=Array.isArray(t?.messages)?t.messages:[],r=X(e.messageId),o=X(e.swipeId);if(!r)return t?.lastAiMessage||null;let n=s.filter(i=>i.role==="assistant"),a=n.find(i=>i.sourceId!==r?!1:o?X(i.swipeId)===o:!0);return a||n.find(i=>i.sourceId===r)||null}function xi({api:t,stContext:e,character:s,conversation:r,targetAssistantMessage:o,runSource:n="MANUAL"}={}){let a=r?.messages||[],i=r?.lastUserMessage||null,l=X(o?.sourceId)||"",c=X(o?.swipeId)||"swipe:current",d=o?.content||"",u=vd(d,o?.raw||null),y=gi(d),p=gi(u),f=hd(t,e,s),h=bi(String(n||"manual").toLowerCase()),m=fi({chatId:f,messageId:l}),_=mi({chatId:f,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:p});return{startedAt:Date.now(),runSource:n,traceId:h,chatId:f,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:m,slotRevisionKey:_,slotTransactionId:bd({chatId:f,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:p,eventType:n,traceId:h}),executionKey:_,lastAiMessage:d,assistantContentFingerprint:y,assistantBaseText:u,assistantBaseFingerprint:p,lastAiMessageSwipeId:c,confirmedAssistantSwipeId:c,effectiveSwipeId:c,sourceMessageId:l,sourceSwipeId:c,lastUserMessage:i?.content||"",userMessage:i?.content||"",targetAssistantMessage:o,chatMessages:a,characterCard:s,chatHistory:a,input:{userMessage:i?.content||"",lastAiMessage:d,assistantBaseText:u,extractedContent:"",previousToolOutput:"",context:{character:s?.name||"",chatLength:a.length||0}},config:{},status:"pending"}}async function Vt({runSource:t="MANUAL"}={}){let e=eo(),s=e?.getContext?.()||null,r=await bn(),o=hi(),n=vi(o),a=n?.lastAiMessage||null;return xi({api:e,stContext:s,character:r,conversation:n,targetAssistantMessage:a,runSource:t})}async function rr({messageId:t,swipeId:e="",runSource:s="AUTO"}={}){let r=eo(),o=r?.getContext?.()||null,n=await bn(),a=hi(),i=vi(a),l=xd(i,{messageId:t,swipeId:e});return xi({api:r,stContext:o,character:n,conversation:i,targetAssistantMessage:l,runSource:s})}var vs=W(()=>{});function wi(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return hs()?.TavernHelper||null}function wd(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return hs()?.SillyTavern||null}function or(t){return Array.isArray(t)?Array.from(new Set(t.map(e=>String(e||"").trim()).filter(Boolean))):[]}function hn(t){if(Array.isArray(t))return t.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(t&&typeof t=="object"){let e={};return Object.keys(t).forEach(s=>{let r=t[s];Array.isArray(r)?e[s]=r.map(o=>typeof o=="string"?o:o&&typeof o=="object"?o.name||o.id||o.title||"[object]":String(o??"")):r&&typeof r=="object"?e[s]="[object]":e[s]=r}),e}return t}function Sd(t={}){let e=typeof t.content=="string"?t.content.trim():"";if(!e)return"";let s=[t.comment,t.key,t.keysecondary,t.text].map(r=>String(r||"").trim()).find(Boolean);return s&&s!==e?`## ${s}
${e}`:e}function nr(){return Array.isArray(vn)?[...vn]:[]}function Si(){return xn?{...xn}:null}async function Td(t){if(!t||typeof t.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(t.getCharLorebooks({type:"all"}));return or([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return console.warn("[ToolWorldbookService] \u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function _d(t,e){if(t&&typeof t.getLorebooks=="function")try{let s=or(await Promise.resolve(t.getLorebooks()));if(s.length>0)return s}catch(s){console.warn("[ToolWorldbookService] \u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",s)}if(e&&typeof e.getWorldBooks=="function")try{let s=await Promise.resolve(e.getWorldBooks()),r=or(Array.isArray(s)?s.map(o=>o?.name??o):[]);if(r.length>0)return r}catch(s){console.warn("[ToolWorldbookService] \u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",s)}return[]}async function Ti(){let t=wi(),e=wd(),s={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!hs()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!hs()?.SillyTavern,helperKeys:t?Object.keys(t).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof t?.getLorebooks,getCharLorebooksType:typeof t?.getCharLorebooks,getLorebookEntriesType:typeof t?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{s.rawResults.getLorebooks=t&&typeof t.getLorebooks=="function"?hn(await Promise.resolve(t.getLorebooks())):"[unavailable]"}catch(a){s.errors.push(`getLorebooks: ${a?.message||a}`)}try{s.rawResults.getCharLorebooks=t&&typeof t.getCharLorebooks=="function"?hn(await Promise.resolve(t.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(a){s.errors.push(`getCharLorebooks: ${a?.message||a}`)}try{s.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?hn(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(a){s.errors.push(`getWorldBooks: ${a?.message||a}`)}let r=await Td(t),o=await _d(t,e),n=or([...r,...o]);return s.characterWorldbooks=[...r],s.allWorldbooks=[...o],s.combinedWorldbooks=[...n],xn=s,vn=n,[...n]}async function _i(t){let e=or(t?.worldbooks?.selected);if(t?.worldbooks?.enabled!==!0||e.length===0)return"";let s=wi();if(!s||typeof s.getLorebookEntries!="function")return console.warn("[ToolWorldbookService] TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let r=[];for(let o of e)try{let n=await s.getLorebookEntries(o),i=(Array.isArray(n)?n.filter(l=>l?.enabled!==!1):[]).map(Sd).filter(Boolean).join(`

`);i&&r.push(`[\u4E16\u754C\u4E66\uFF1A${o}]
${i}`)}catch(n){console.warn(`[ToolWorldbookService] \u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${o}`,n)}return r.join(`

`)}var vn,xn,wn=W(()=>{vs();vn=[],xn=null});var Ai={};ye(Ai,{BypassManager:()=>to,DEFAULT_BYPASS_PRESETS:()=>yt,addMessage:()=>Od,buildBypassMessages:()=>zd,bypassManager:()=>j,createPreset:()=>kd,default:()=>Ud,deleteMessage:()=>Ld,deletePreset:()=>Cd,duplicatePreset:()=>Pd,exportPresets:()=>Bd,getAllPresets:()=>Ed,getDefaultPresetId:()=>Rd,getEnabledMessages:()=>Dd,getPreset:()=>Md,getPresetList:()=>Tn,importPresets:()=>Kd,setDefaultPresetId:()=>$d,updateMessage:()=>Nd,updatePreset:()=>Id});var ut,xs,Sn,yt,Ad,to,j,Ed,Tn,Md,kd,Id,Cd,Pd,Rd,$d,Dd,Od,Nd,Ld,Bd,Kd,zd,Ud,ar=W(()=>{De();ge();ut="bypass_presets",xs="default_bypass_preset",Sn="current_bypass_preset",yt={},Ad=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),to=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=C.get(ut,{});return this._cache={...yt,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((s,r)=>(r.updatedAt||0)-(s.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:s,name:r,description:o,messages:n}=e;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=s.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let i={id:a,name:r.trim(),description:o||"",enabled:!0,messages:n||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,i),$.emit(P.BYPASS_PRESET_CREATED,{presetId:a,preset:i}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${r}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,s){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let o={...r,...s,id:e,updatedAt:Date.now()};return this._savePreset(e,o),$.emit(P.BYPASS_PRESET_UPDATED,{presetId:e,preset:o}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u66F4\u65B0\u6210\u529F`,preset:o}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(yt[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r=C.get(ut,{});return delete r[e],C.set(ut,r),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),$.emit(P.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,s,r){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${e}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(o)),id:s.trim(),name:r||`${o.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),n),$.emit(P.BYPASS_PRESET_CREATED,{presetId:s,preset:n}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${n.name}"`,preset:n}}addMessage(e,s){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o={id:`msg_${Date.now()}`,role:s.role||"SYSTEM",content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1},n=[...r.messages||[],o];return this.updatePreset(e,{messages:n})}updateMessage(e,s,r){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=o.messages||[],a=n.findIndex(l=>l.id===s);if(a===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let i=[...n];return i[a]={...i[a],...r},this.updatePreset(e,{messages:i})}deleteMessage(e,s){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=r.messages||[],n=o.find(i=>i.id===s);if(!n)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(n.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=o.filter(i=>i.id!==s);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let s=this.getPreset(e);return!s||!s.enabled?[]:(s.messages||[]).filter(r=>r.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=C.get(xs,null);return e==="undefined"||e==="null"||e===""?(C.remove(xs),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(C.set(xs,e),$.emit(P.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let r=this.getPreset(e);if(!r)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(e,s={}){let{overwrite:r=!1}=s,o;try{o=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(o)?o:o.presets?o.presets:[o];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let a=C.get(ut,{}),i=0;for(let l of n)!l.id||typeof l.id!="string"||l.name&&(yt[l.id]&&!r||!r&&a[l.id]||(a[l.id]={...l,updatedAt:Date.now()},i++));return i>0&&(C.set(ut,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u9884\u8BBE`,imported:i}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let s=e?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(e){let s=this.getToolBypassPreset(e);return s?this.getEnabledMessages(s.id):[]}_savePreset(e,s){let r=C.get(ut,{});r[e]=s,C.set(ut,r),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=C.get(ut,{}),s={},r=!1,o=Array.isArray(e)?e.map((n,a)=>[n?.id||n?.name||`legacy_${a}`,n]):Object.entries(e||{});for(let[n,a]of o){let i=this._normalizePreset(n,a,s);if(!i){r=!0;continue}s[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(r=!0)}r&&C.set(ut,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(e,s,r={}){if(!s||typeof s!="object")return null;let o=typeof s.name=="string"?s.name.trim():"",n=typeof s.id=="string"?s.id.trim():"",a=typeof e=="string"?e.trim():"";if(!o&&a&&a!=="undefined"&&a!=="null"&&(o=a),this._isLegacySamplePreset(o,n)||(!n&&a&&a!=="undefined"&&a!=="null"&&(n=a),!n&&o&&o!=="undefined"&&o!=="null"&&(n=this._generatePresetId(o,r)),!o||!n||n==="undefined"||o==="undefined"))return null;let l=Array.isArray(s.messages)?s.messages.filter(c=>c&&typeof c=="object").map((c,d)=>({id:typeof c.id=="string"&&c.id.trim()?c.id.trim():`${n}_msg_${d+1}`,role:c.role||"SYSTEM",content:typeof c.content=="string"?c.content:"",enabled:c.enabled!==!1,deletable:c.deletable!==!1})):[];return{...s,id:n,name:o,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:l,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(e){let s=C.get(xs,null),r=C.get(Sn,null),o=s??r;(o==="undefined"||o==="null"||o==="")&&(o=null),o&&!e[o]&&(o=Object.values(e).find(a=>a.name===o)?.id||null),o?C.set(xs,o):C.remove(xs),C.has(Sn)&&C.remove(Sn)}_isLegacySamplePreset(e,s=""){return e?s==="standard"||s==="enhanced"||s==="jailbreak"||Ad.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,s={}){let r=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,o=r,n=1;for(;s[o];)o=`${r}_${n++}`;return o}_log(...e){this.debugMode&&console.log("[BypassManager]",...e)}},j=new to,Ed=()=>j.getAllPresets(),Tn=()=>j.getPresetList(),Md=t=>j.getPreset(t),kd=t=>j.createPreset(t),Id=(t,e)=>j.updatePreset(t,e),Cd=t=>j.deletePreset(t),Pd=(t,e,s)=>j.duplicatePreset(t,e,s),Rd=()=>j.getDefaultPresetId(),$d=t=>j.setDefaultPresetId(t),Dd=t=>j.getEnabledMessages(t),Od=(t,e)=>j.addMessage(t,e),Nd=(t,e,s)=>j.updateMessage(t,e,s),Ld=(t,e)=>j.deleteMessage(t,e),Bd=t=>j.exportPresets(t),Kd=(t,e)=>j.importPresets(t,e),zd=t=>j.buildBypassMessages(t),Ud=j});var Ei={};ye(Ei,{DEFAULT_SETTINGS:()=>ir,SettingsService:()=>so,default:()=>Wd,settingsService:()=>Ke});var ir,_n,so,Ke,Wd,lr=W(()=>{De();ge();ir={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue",startupScreenDismissed:!1}},_n="settings_v2",so=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=C.get(_n,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),C.set(_n,this._cache),$.emit(P.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let s=this.getSettings(),r=this._deepMerge(s,e);this.saveSettings(r)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(ir)),C.set(_n,this._cache),$.emit(P.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,s=null){let r=this.getSettings(),o=e.split("."),n=r;for(let a of o)if(n&&typeof n=="object"&&a in n)n=n[a];else return s;return n}set(e,s){let r=JSON.parse(JSON.stringify(this.getSettings())),o=e.split("."),n=r;for(let a=0;a<o.length-1;a+=1){let i=o[a];i in n||(n[i]={}),n=n[i]}n[o[o.length-1]]=s,this.saveSettings(r)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(ir)),e)}_deepMerge(e,s){let r={...e};for(let o in s)s[o]&&typeof s[o]=="object"&&!Array.isArray(s[o])?r[o]=this._deepMerge(e[o]||{},s[o]):r[o]=s[o];return r}},Ke=new so,Wd=Ke});var ki={};ye(ki,{ContextInjector:()=>oo,DEFAULT_INJECTION_OPTIONS:()=>Mi,WRITEBACK_METHODS:()=>he,WRITEBACK_RESULT_STATUS:()=>ro,contextInjector:()=>Pe,default:()=>Gd});function cr(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function jd(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Fd(t){try{return t?.SillyTavern?.getContext?.()||null}catch{return null}}function Hd(){let t=jd(),e=t?.SillyTavern||null,s=Fd(t),r=e?.eventSource||t?.eventSource||s?.eventSource||null,o=e?.eventTypes||e?.event_types||s?.eventTypes||s?.event_types||t?.eventTypes||t?.event_types||{};return{topWindow:t,api:e,context:s,eventSource:r,eventTypes:o,source:e?.eventSource?"SillyTavern.eventSource":t?.eventSource?"topWindow.eventSource":s?.eventSource?"SillyTavern.getContext().eventSource":"unavailable"}}function et(t,e){let s=String(e||"").trim();return s?Array.isArray(t)?(t.includes(s)||t.push(s),t):[s]:t}function Ss(t={}){if(t?.signal?.aborted)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE";if(typeof t?.shouldAbortWriteback=="function")try{if(t.shouldAbortWriteback()===!0)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}catch{return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}return""}var ke,ws,Mi,ro,he,Yd,qd,oo,Pe,Gd,Jt=W(()=>{ge();ke="YouYouToolkit_toolOutputs",ws="YouYouToolkit_injectedContext",Mi={overwrite:!0,enabled:!0};ro={SUCCESS:"success",FAILED:"failed"},he={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},Yd=60,qd=3;oo=class{constructor(){this.debugMode=!1}async inject(e,s,r={}){return(await this.injectDetailed(e,s,r)).success}async injectDetailed(e,s,r={}){let o={...Mi,...r},n=this._createWritebackResult(e,o);if(!e||s===void 0||s===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),n.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",n;if(!cr(o.sourceMessageId))return this._log("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),n.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",n;if(o?.signal?.aborted)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",n;if(typeof o?.shouldAbortWriteback=="function")try{if(o.shouldAbortWriteback()===!0)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}catch{return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}let a=n.chatId,i={toolId:e,content:String(s),updatedAt:Date.now(),sourceMessageId:o.sourceMessageId||null,sourceSwipeId:o.sourceSwipeId||o.effectiveSwipeId||null,options:o};$.emit(P.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:i.content,sourceMessageId:i.sourceMessageId,sourceSwipeId:i.sourceSwipeId,effectiveSwipeId:i.sourceSwipeId,slotBindingKey:o.slotBindingKey||"",slotRevisionKey:o.slotRevisionKey||"",slotTransactionId:o.slotTransactionId||"",traceId:o.traceId||"",sessionKey:o.sessionKey||"",options:o});let l=await this._insertToolOutputToBoundAssistantSlot(e,i,o,n);return l.success&&this._log(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,l),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:s}=this._getChatRuntime(),r=this._findAssistantMessageIndex(s,e);if(r<0)return"";let o=s[r]||{},n=o[ws];if(typeof n=="string"&&n.trim())return n.trim();let a=o[ke];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(s){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",s),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),s=this._findAssistantMessageIndex(e,null);if(s<0)return{};let o=(e[s]||{})[ke];return o&&typeof o=="object"?o:{}}catch(e){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",e),{}}}getToolContext(e,s){if(!s)return null;try{let{chat:r}=this._getChatRuntime(),o=this._findAssistantMessageIndex(r,null);return o<0?null:r[o]?.[ke]?.[s]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,s){if(!s)return!1;try{let{api:r,context:o,chat:n}=this._getChatRuntime(),a=this._findAssistantMessageIndex(n,null);if(a<0)return!1;let i=n[a],l=i?.[ke];if(!l||!l[s])return!1;delete l[s],i[ke]=l,i[ws]=this._buildMessageInjectedContext(l);let c=o?.saveChat||r?.saveChat||null;return typeof c=="function"&&await c.call(o||r),$.emit(P.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:s}),!0}catch(r){return this._log("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",r),!1}}async clearAllContext(e){try{let{api:s,context:r,chat:o}=this._getChatRuntime(),n=this._findAssistantMessageIndex(o,null);if(n<0)return!1;let a=o[n];delete a[ke],delete a[ws];let i=r?.saveChat||s?.saveChat||null;return typeof i=="function"&&await i.call(r||s),$.emit(P.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(s){return this._log("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",s),!1}}clearAllChatsContexts(){this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,s){return!!this.getToolContext(e,s)}getContextSummary(e){let s=this._getLatestAssistantMessageOutputs(),r=Object.entries(s).map(([o,n])=>({toolId:o,updatedAt:n.updatedAt,contentLength:n.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:r,totalCount:r.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,s={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,s=e.SillyTavern||null,r=s?.getContext?.()||null,o=Array.isArray(r?.chat)?r.chat:[],n=Array.isArray(s?.chat)?s.chat:[],a=o.length?o:n;return{topWindow:e,api:s,context:r,chat:a,contextChat:o,apiChat:n}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,s={}){let r=he.SET_CHAT_MESSAGE;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:s.traceId||"",sessionKey:s.sessionKey||"",sourceMessageId:s.sourceMessageId||null,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId||null,effectiveSwipeId:s.effectiveSwipeId||s.sourceSwipeId||null,slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:he.NONE,commit:{preferredMethod:r,attemptedMethods:[],appliedMethod:he.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:"",eventSource:"",eventName:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:ro.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(s=>setTimeout(s,e))}_collectWritebackVerification(e,s,r,o,n,a=null){let i=e?.contextChat?.[r]||e?.apiChat?.[r]||s?.[r]||a||null,l=this._getWritableMessageField(i).text||"",c=i?.[ke]?.[o],d=n?l.includes(n):!0,u=!!(c&&String(c.content||"").trim()===n);return{latestMessage:i,latestText:l,textIncludesContent:d,mirrorStored:u}}async _confirmRefresh(e,s,r,o,n,a=null){let i=1,l=this._collectWritebackVerification(e,s,r,o,n,a);for(let c=0;c<qd;c+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:i,confirmedBy:"text_and_mirror_present"};await this._wait(Yd),i+=1,l=this._collectWritebackVerification(e,s,r,o,n,a)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:i,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}async _requestAssistantMessageRefresh(e,s,r,o={},n=null){let a=n||this._createWritebackResult("",o),{api:i,context:l}=e||{},c=l?.setChatMessages||i?.setChatMessages||e?.topWindow?.setChatMessages||null,d=l?.setChatMessage||i?.setChatMessage||e?.topWindow?.setChatMessage||null,u=o.replaceFullMessage!==!0;a.commit.preferredMethod=typeof d=="function"?he.SET_CHAT_MESSAGE:typeof c=="function"?he.SET_CHAT_MESSAGES:he.LOCAL_ONLY;let y=!1,p=Ss(o);if(p)return a.error=p,a;if(typeof d=="function"){et(a.commit.attemptedMethods,he.SET_CHAT_MESSAGE);try{let f=Ss(o);if(f)return a.error=f,a;await d.call(l||i||e?.topWindow,{message:r,mes:r,content:r,text:r},s,{swipe_id:cr(o.sourceSwipeId||o.effectiveSwipeId)||"current",refresh:"display_and_render_current"}),a.steps.hostSetChatMessage=!0,a.hostUpdateMethod=he.SET_CHAT_MESSAGE,a.hostCommitApplied=!0,a.commit.appliedMethod=he.SET_CHAT_MESSAGE,a.commit.hostCommitApplied=!0,y=!0}catch(f){this._log("setChatMessage \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",f),a.errors.push(`setChatMessage: ${f?.message||String(f)}`)}}if(!y&&typeof c=="function"){et(a.commit.attemptedMethods,he.SET_CHAT_MESSAGES);try{let f=Ss(o);if(f)return a.error=f,a;await c.call(l||i||e?.topWindow,[{message_id:cr(o.sourceMessageId)||s,chat_index:s,message:r,mes:r,content:r,text:r}],{refresh:"affected"}),a.steps.hostSetChatMessages=!0,a.hostUpdateMethod=he.SET_CHAT_MESSAGES,a.hostCommitApplied=!0,a.commit.appliedMethod=he.SET_CHAT_MESSAGES,a.commit.hostCommitApplied=!0,a.commit.fallbackUsed=!0,y=!0}catch(f){this._log("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",f),a.errors.push(`setChatMessages: ${f?.message||String(f)}`)}}if(y&&(a.refreshRequested=!0,et(a.refresh.requestMethods,a.hostUpdateMethod)),u&&typeof c=="function"){et(a.commit.attemptedMethods,"setChatMessages_refresh_assist");try{let f=Ss(o);if(f)return a.error=f,a;await c.call(l||i||e?.topWindow,[{message_id:cr(o.sourceMessageId)||s,chat_index:s,message:r,mes:r,content:r,text:r}],{refresh:"affected"}),a.refreshRequested=!0,et(a.refresh.requestMethods,"setChatMessages_refresh_assist")}catch(f){this._log("append \u5199\u56DE\u8865\u5145\u5237\u65B0\u5931\u8D25",f),a.errors.push(`setChatMessages_refresh_assist: ${f?.message||String(f)}`)}}return y||(et(a.commit.attemptedMethods,he.LOCAL_ONLY),a.commit.appliedMethod=he.LOCAL_ONLY,a.commit.fallbackUsed=a.commit.preferredMethod!==he.LOCAL_ONLY,a.hostUpdateMethod=a.commit.appliedMethod),a}_inferBlockType(e){let s=String(e||"").trim();if(!s)return"empty";let r=s.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return r?.[1]?r[1]:"plain_text"}_stripExactStoredBlock(e,s,r=""){let o=String(e||""),n=String(s||"").trim(),a=String(r||"").trim();return n?o.includes(n)?a?{text:o.replace(n,a).trimEnd(),removed:!0,replaced:!0}:{text:o.replace(n,"").trimEnd(),removed:!0,replaced:!1}:{text:o,removed:!1,replaced:!1}:{text:o,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,s,r){let{contextChat:o,apiChat:n}=e||{},a=i=>{!Array.isArray(i)||s<0||s>=i.length||i[s]!==r&&(i[s]={...i[s]||{},...r})};a(o),a(n)}_notifyMessageUpdated(e,s){try{let r=Hd(),o=r?.topWindow||e?.topWindow,n=r?.eventSource||null,a=r?.eventTypes||{},i=a.MESSAGE_UPDATED||a.message_updated||"MESSAGE_UPDATED";return n&&typeof n.emit=="function"?(n.emit(i,s),typeof o?.requestAnimationFrame=="function"?o.requestAnimationFrame(()=>{n.emit(i,s)}):typeof o?.setTimeout=="function"&&o.setTimeout(()=>{n.emit(i,s)},30),{emitted:!0,source:r?.source||"unavailable",eventName:i}):{emitted:!1,source:r?.source||"unavailable",eventName:i}}catch(r){return this._log("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",r),{emitted:!1,source:"error",eventName:"",error:r?.message||String(r)}}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let s=String(e.role||"").toLowerCase();return s==="assistant"||s==="ai"||!s}_findAssistantMessageIndex(e,s){let r=Array.isArray(e)?e:[];if(!r.length)return-1;let o=s!=null&&s!=="",n=(a,i)=>{if(!this._isAssistantMessage(a)||s==null||s==="")return!1;let l=String(s).trim();return l?[a.message_id,a.id,a.messageId,a.mes_id,i].map(d=>d==null?"":String(d).trim()).includes(l):!1};for(let a=r.length-1;a>=0;a-=1)if(n(r[a],a))return a;if(o)return-1;for(let a=r.length-1;a>=0;a-=1)if(this._isAssistantMessage(r[a]))return a;return-1}_buildMessageInjectedContext(e){let r=Object.entries(e&&typeof e=="object"?e:{}).filter(([,n])=>n?.blockType!=="full_message").sort(([,n],[,a])=>(n?.updatedAt||0)-(a?.updatedAt||0));if(!r.length)return"";let o=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[n,a]of r)o.push(`[${n}]`),o.push(a?.content||""),o.push("");return o.join(`
`)}_getWritableMessageField(e){let s=["mes","message","content","text"];for(let r of s)if(typeof e?.[r]=="string")return{key:r,text:e[r]};return{key:"mes",text:""}}_applyMessageText(e,s,r={}){let o=e&&typeof e=="object"?e:{},n=["mes","message","content","text"],a=!1;if(n.forEach(i=>{typeof o[i]=="string"&&(o[i]=s,a=!0)}),a||(o.mes=s,o.message=s),Array.isArray(o.swipes)){let i=Number.parseInt(cr(r?.sourceSwipeId||r?.effectiveSwipeId),10),l=Number.isInteger(i)?i:Number.isInteger(o.swipe_id)?o.swipe_id:Number.isInteger(o.swipeId)?o.swipeId:0;l>=0&&l<o.swipes.length&&(o.swipes[l]=s,o.swipe_id=l,o.swipeId=l)}return o}_stripExistingToolOutput(e,s=[]){let r=String(e||"");return(Array.isArray(s)?s:[]).forEach(n=>{let a=String(n||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let d=new RegExp(a.slice(6).trim(),"gis");r=r.replace(d,"")}catch(d){this._log("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",a,d)}return}let i=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),c=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");r=r.replace(l,""),r=r.replace(c,"")}),r.trimEnd()}_stripPreviousStoredToolContent(e,s){let r=String(e||""),o=String(s||"").trim();return o?r.replace(o,"").trimEnd():r.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,s,r={},o=null){let n=o||this._createWritebackResult(e,r);try{let a=this._getChatRuntime(),{context:i,chat:l}=a;if(!Array.isArray(l)||!l.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),n.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",n;let c=this._findAssistantMessageIndex(l,r.sourceMessageId);if(c<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),n.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",n;if(r?.signal?.aborted)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",n;if(typeof r?.shouldAbortWriteback=="function")try{if(r.shouldAbortWriteback()===!0)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}catch{return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}n.messageIndex=c,n.steps.foundTargetMessage=!0;let d=l[c],{key:u,text:y}=this._getWritableMessageField(d);n.textField=u;let p=d[ke]&&typeof d[ke]=="object"?d[ke]:{},f=p?.[e]||{},h=f?.content||"",m=f?.blockText||h||"",_=Object.entries(p).filter(([xe])=>xe!==e).map(([,xe])=>xe||{}),M=String(s.content||"").trim(),w=r.replaceFullMessage===!0,E=w?"full_message":this._inferBlockType(M),k={toolId:e,messageId:r.sourceMessageId||d?.message_id||d?.messageId||c,blockType:E,insertedAt:s.updatedAt,replaceable:r.overwrite!==!1};n.blockIdentity=k;let I=r.overwrite===!1||w?{text:String(y||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(y,m,M),N=I.text,se="";!w&&r.overwrite!==!1&&m&&!I.removed&&(se="previous_block_not_found");let q=r.overwrite===!1||I.replaced||w?N:this._stripExistingToolOutput(N,r.extractionSelectors),O=q!==N;N=q;let ee=r.overwrite===!1||I.replaced||w?N:this._stripPreviousStoredToolContent(N,h),ve=ee!==N;N=ee,n.replacedExistingBlock=w||I.removed||O||ve;let _e=r.overwrite===!1?String(y||""):N,Ge=w?M:I.replaced?N.trim():[_e.trimEnd(),M].filter(Boolean).join(`

`).trim();n.insertedNewBlock=!!M;let G=_.every(xe=>{if(xe?.blockType==="full_message")return!0;let nt=String(xe?.blockText||xe?.content||"").trim();return nt?Ge.includes(nt):!0});n.preservedOtherToolBlocks=G,G?se&&(n.conflictDetected=!0,n.conflictReason=se):(n.conflictDetected=!0,n.conflictReason="other_tool_block_removed");let kt={...p,[e]:{toolId:e,content:M,blockText:M,blockType:E,blockIdentity:k,updatedAt:s.updatedAt,sourceMessageId:s.sourceMessageId||null}},It=Ss(r);if(It)return n.error=It,n;d[u]=Ge,this._applyMessageText(d,Ge,r),d[ke]=kt,d[ws]=this._buildMessageInjectedContext(kt),n.contentCommitted=!0,n.commit.contentCommitted=!0,n.steps.contentCommitted=!0,n.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,c,d),n.steps.runtimeSynced=!0;let Ct=Ss(r);if(Ct)return n.error=Ct,n;await this._requestAssistantMessageRefresh(a,c,Ge,r,n);let ft=i?.saveChat||a?.api?.saveChat||null,le=i?.saveChatDebounced||a?.api?.saveChatDebounced||null;typeof le=="function"&&(le.call(i||api),n.steps.saveChatDebounced=!0,n.refreshRequested=!0,et(n.refresh.requestMethods,"saveChatDebounced")),typeof ft=="function"&&(await ft.call(i||api),n.steps.saveChat=!0,n.refreshRequested=!0,et(n.refresh.requestMethods,"saveChat"));let V=this._notifyMessageUpdated(a,c);n.steps.notifiedMessageUpdated=V?.emitted===!0,n.refresh.eventSource=V?.source||"",n.refresh.eventName=V?.eventName||"",V?.error&&n.errors.push(`MESSAGE_UPDATED: ${V.error}`);let mt=String(s.content||"").trim();(n.steps.hostSetChatMessages||n.steps.hostSetChatMessage)&&(n.refreshRequested=!0,et(n.refresh.requestMethods,n.hostUpdateMethod)),n.steps.notifiedMessageUpdated&&(n.refreshRequested=!0,et(n.refresh.requestMethods,`MESSAGE_UPDATED:${n.refresh.eventName||"MESSAGE_UPDATED"}`)),n.steps.refreshRequested=n.refreshRequested,n.refresh.requested=n.refreshRequested;let ce=await this._confirmRefresh(a,l,c,e,mt,d);return n.verification.textIncludesContent=ce.textIncludesContent,n.verification.mirrorStored=ce.mirrorStored,n.verification.refreshConfirmed=ce.refreshConfirmed,n.steps.verifiedAfterWrite=n.verification.textIncludesContent&&n.verification.mirrorStored,n.refreshConfirmed=n.verification.refreshConfirmed&&n.refreshRequested,n.refresh.confirmChecks=Number(ce.confirmChecks)||0,n.refresh.confirmedBy=ce.confirmedBy||"",n.refresh.confirmed=n.refreshConfirmed,n.steps.refreshConfirmed=n.refreshConfirmed,n.success=n.steps.localTextApplied&&n.steps.runtimeSynced&&n.steps.verifiedAfterWrite&&n.refreshConfirmed,n.writebackStatus=n.success?ro.SUCCESS:ro.FAILED,!n.success&&!n.error&&(n.error=n.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),n.conflictDetected&&!n.error&&(n.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${n.conflictReason}`),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${c}`),n}catch(a){return this._log("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",a),n.error=a?.message||String(a),n.errors.push(n.error),n}}getAssistantMessageSnapshot(e=null){try{let s=this._getChatRuntime(),{chat:r}=s,o=this._findAssistantMessageIndex(r,e);if(o<0)return null;let n=r[o]||null,a=this._getWritableMessageField(n).text||"",i=n?.[ke]&&typeof n[ke]=="object"?n[ke]:{},l=Object.values(i).reduce((c,d)=>{let u=String(d?.blockText||d?.content||"").trim();return!u||!c.includes(u)?c:c.replace(u,"").trimEnd()},String(a||"")).trim();return{messageIndex:o,message:n,messageText:a,baseText:l,toolOutputs:i,injectedContext:typeof n?.[ws]=="string"?n[ws]:this._buildMessageInjectedContext(i)}}catch(s){return this._log("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",s),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext(),o=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(o)return o;let n=e.SillyTavern?.this_chid;if(n!=null)return`chat_char_${n}`}return"chat_default"}catch{return"chat_default"}}_log(...e){this.debugMode&&console.log("[ContextInjector]",...e)}},Pe=new oo,Gd=Pe});var Ci={};ye(Ci,{BUILTIN_VARIABLES:()=>Ii,VariableResolver:()=>no,default:()=>Vd,variableResolver:()=>ze});var Ii,no,ze,Vd,dr=W(()=>{ge();Ii={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},no=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,s){if(typeof e!="string")return e;let r=e;return r=this._resolveBuiltinVariables(r,s),r=this._resolveCustomVariables(r,s),r=this._resolveRegexVariables(r,s),r}resolveObject(e,s){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(o=>this.resolveObject(o,s));let r={};for(let[o,n]of Object.entries(e))typeof n=="string"?r[o]=this.resolveTemplate(n,s):typeof n=="object"&&n!==null?r[o]=this.resolveObject(n,s):r[o]=n;return r}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,s){e&&(this.customVariables.set(e,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,s){!e||typeof s!="function"||(this.variableHandlers.set(e,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,s]of Object.entries(Ii))e.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,r]of this.customVariables)e.push({name:`{{${s}}}`,description:typeof r=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},r={};for(let o of this.getAvailableVariables())r[o.category]||(r[o.category]=[]),r[o.category].push(o);for(let[o,n]of Object.entries(s))if(r[o]&&r[o].length>0){e.push(`\u3010${n}\u3011`);for(let a of r[o])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,s)=>(s.regexResults||s.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,s){let r=e;return r=r.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),r=r.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),r=r.replace(/\{\{chatHistory\}\}/gi,()=>{let o=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(o)}),r=r.replace(/\{\{characterCard\}\}/gi,()=>{let o=s.characterCard||s.raw?.characterCard;return o?this._formatCharacterCard(o):""}),r=r.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),r=r.replace(/\{\{toolId\}\}/gi,s.toolId||s.raw?.toolId||""),r=r.replace(/\{\{toolPromptMacro\}\}/gi,s.toolPromptMacro||s.raw?.toolPromptMacro||""),r=r.replace(/\{\{toolContentMacro\}\}/gi,s.toolContentMacro||s.raw?.toolContentMacro||""),r=r.replace(/\{\{toolWorldbookContent\}\}/gi,s.toolWorldbookContent||s.raw?.toolWorldbookContent||""),r=r.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),r=r.replace(/\{\{extractedContent\}\}/gi,s.extractedContent||s.raw?.extractedContent||""),r=r.replace(/\{\{recentMessagesText\}\}/gi,s.recentMessagesText||s.raw?.recentMessagesText||""),r=r.replace(/\{\{rawRecentMessagesText\}\}/gi,s.rawRecentMessagesText||s.raw?.rawRecentMessagesText||""),r=r.replace(/\{\{userMessage\}\}/gi,s.userMessage||s.raw?.userMessage||""),r=r.replace(/\{\{previousToolOutput\}\}/gi,s.previousToolOutput||s.raw?.previousToolOutput||""),r}_resolveCustomVariables(e,s){let r=e;for(let[o,n]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(o)}\\}\\}`,"gi");typeof n=="function"?r=r.replace(a,()=>{try{return n(s)}catch(i){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}:`,i),""}}):r=r.replace(a,String(n))}return r}_resolveRegexVariables(e,s){let r=e;for(let[o,n]of this.variableHandlers){let a=new RegExp(`\\{\\{${o}\\.([^}]+)\\}\\}`,"gi");r=r.replace(a,(i,l)=>{try{return n(l,s)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}.${l}:`,c),""}})}return r}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(s=>{let r=s.role||"unknown",o=s.content||s.mes||"";return`[${r}]: ${o}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let s=[];return e.name&&s.push(`\u59D3\u540D: ${e.name}`),e.description&&s.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&s.push(`\u6027\u683C: ${e.personality}`),e.scenario&&s.push(`\u573A\u666F: ${e.scenario}`),s.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){this.debugMode&&console.log("[VariableResolver]",...e)}},ze=new no,Vd=ze});var Ri={};ye(Ri,{DEFAULT_PROMPT_TEMPLATE:()=>Pi,ToolPromptService:()=>ao,default:()=>Jd,toolPromptService:()=>Xt});var Pi,ao,Xt,Jd,io=W(()=>{ge();ar();dr();wn();Pi="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",ao=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,s={}){let r=this._getPromptTemplate(e),o=String(s?.toolWorldbookContent||s?.input?.toolWorldbookContent||await _i(e)).trim(),n=ze.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolWorldbookContent:o}),a=ze.resolveTemplate(r,n).trim(),i=String(s?.toolContentMacro||s?.input?.toolContentMacro||"").trim();return ze.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolPromptMacro:a,toolContentMacro:i,toolWorldbookContent:o})}async buildToolMessages(e,s){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let r=[],o=await this._buildVariableContext(e,s),n=this._getBypassMessages(e);if(n&&n.length>0)for(let i of n)i.enabled!==!1&&r.push({role:this._normalizeRole(i.role),content:ze.resolveTemplate(i.content||"",o)});let a=this._buildUserContent(this._getPromptTemplate(e),o);return a&&r.push({role:"user",content:a}),this._log(`\u6784\u5EFA\u6D88\u606F: ${r.length} \u6761`),r}async buildPromptText(e,s){return(await this._buildVariableContext(e,s)).toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:Pi}_getBypassMessages(e){return e.bypass?.enabled?j.buildBypassMessages(e):[]}_buildUserContent(e,s){return!e||!e.trim()?"":ze.resolveTemplate(e,s).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){this.debugMode&&console.log("[ToolPromptService]",...e)}setDebugMode(e){this.debugMode=e}},Xt=new ao,Jd=Xt});var Di={};ye(Di,{LEGACY_OUTPUT_MODES:()=>Xd,OUTPUT_MODES:()=>Ue,TOOL_FAILURE_STAGES:()=>pe,TOOL_RUNTIME_STATUS:()=>Qd,TOOL_WRITEBACK_STATUS:()=>ie,ToolOutputService:()=>lo,default:()=>Zd,toolOutputService:()=>tt});function $i(t){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}function Ts(t=[],e="",s=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!s,contentCommitted:!!s?.contentCommitted,hostCommitApplied:!!s?.hostCommitApplied,writebackStatus:s?.writebackStatus||"",preferredCommitMethod:s?.commit?.preferredMethod||"",appliedCommitMethod:s?.commit?.appliedMethod||"",fallbackUsed:!!s?.commit?.fallbackUsed},refresh:{requested:!!s?.refreshRequested,confirmed:!!s?.refreshConfirmed,requestMethods:Array.isArray(s?.refresh?.requestMethods)?[...s.refresh.requestMethods]:[],confirmChecks:Number(s?.refresh?.confirmChecks)||0,confirmedBy:s?.refresh?.confirmedBy||""}}}var Ue,Xd,Qd,pe,ie,lo,tt,Zd,co=W(()=>{ge();lr();Jt();io();jr();Ws();Ue={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},Xd={inline:"follow_ai"},Qd={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},pe={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},ie={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};lo=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Ue.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let s=e.output?.mode;return s===Ue.FOLLOW_AI||s==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,s){let r=Date.now(),o=e.id,n=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=s?.sessionKey||"",i=s?.executionKey||"",l=this._getExtractionSelectors(e),c=e.output?.apiPreset||e.apiPreset||"",d="",u=ie.NOT_APPLICABLE,y=null,p=[],f="";this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${o}`),$.emit(P.TOOL_EXECUTION_STARTED,{toolId:o,traceId:n,sessionKey:a,mode:Ue.POST_RESPONSE_API});try{if(d=pe.BUILD_MESSAGES,p=await this._buildToolMessages(e,s),!p||p.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");this._log(`\u6784\u5EFA\u4E86 ${p.length} \u6761\u6D88\u606F`);let h=$i(s);if(h){let E=Date.now()-r;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:E,meta:{traceId:n,sessionKey:a,executionKey:i,sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",selectors:l,apiPreset:c,writebackStatus:u,failureStage:d,writebackDetails:y,aborted:h.aborted===!0,stale:h.stale===!0,abortReason:h.reason||"",phases:Ts(p,f,y)}}}let m=await this._getRequestTimeout();d=pe.SEND_API_REQUEST;let _=await this._sendApiRequest(c,p,{timeoutMs:m,signal:s.signal});d=pe.EXTRACT_OUTPUT,f=this._extractOutputContent(_,e);let M=$i(s);if(M){let E=Date.now()-r;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:E,meta:{traceId:n,sessionKey:a,executionKey:i,sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",selectors:l,apiPreset:c,writebackStatus:u,failureStage:d,writebackDetails:y,aborted:M.aborted===!0,stale:M.stale===!0,abortReason:M.reason||"",phases:Ts(p,f,y)}}}if(f){if(d=pe.INJECT_CONTEXT,y=await Pe.injectDetailed(o,f,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.sourceMessageId||s.confirmedAssistantMessageId||s.messageId||"",sourceSwipeId:s.sourceSwipeId||s.confirmedAssistantSwipeId||s.effectiveSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||s.confirmedAssistantSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",extractionSelectors:l,traceId:n,sessionKey:a,signal:s.signal,shouldAbortWriteback:s.shouldAbortWriteback,isAutoRun:s.isAutoRun===!0}),!y?.success)throw u=ie.FAILED,new Error(y?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=ie.SUCCESS}else u=ie.SKIPPED_EMPTY_OUTPUT;d="";let w=Date.now()-r;return $.emit(P.TOOL_EXECUTED,{toolId:o,traceId:n,sessionKey:a,success:!0,duration:w,mode:Ue.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${o}, \u8017\u65F6 ${w}ms`),{success:!0,toolId:o,output:f,duration:w,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:p.length,selectors:l,apiPreset:c,writebackStatus:u,failureStage:"",writebackDetails:y,phases:Ts(p,f,y)}}}catch(h){let m=Date.now()-r,_=d||pe.UNKNOWN,M=u||ie.NOT_APPLICABLE;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${o}`,h),$.emit(P.TOOL_EXECUTION_FAILED,{toolId:o,traceId:n,sessionKey:a,error:h.message||String(h),duration:m}),{success:!1,toolId:o,error:h.message||String(h),duration:m,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:p.length,selectors:l,apiPreset:c,writebackStatus:M,failureStage:_,writebackDetails:y,phases:Ts(p,f,y)}}}}async runToolFollowAiManual(e,s){let r=Date.now(),o=e.id,n=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=s?.sessionKey||"",i=s?.executionKey||"",l=e.output?.apiPreset||e.apiPreset||"",c=this._getExtractionSelectors(e),d="",u=ie.NOT_APPLICABLE,y=null,p=[],f="";$.emit(P.TOOL_EXECUTION_STARTED,{toolId:o,traceId:n,sessionKey:a,mode:Ue.FOLLOW_AI});try{if(d=pe.BUILD_MESSAGES,p=await this._buildToolMessages(e,s),!p||p.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");let h=await this._getRequestTimeout();d=pe.SEND_API_REQUEST;let m=await this._sendApiRequest(l,p,{timeoutMs:h,signal:s.signal});if(d=pe.EXTRACT_OUTPUT,f=this._extractOutputContent(m,e),f){if(d=pe.INJECT_CONTEXT,y=await Pe.injectDetailed(o,f,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.sourceMessageId||s.confirmedAssistantMessageId||s.messageId||"",sourceSwipeId:s.sourceSwipeId||s.confirmedAssistantSwipeId||s.effectiveSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||s.confirmedAssistantSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",extractionSelectors:c,traceId:n,sessionKey:a}),!y?.success)throw u=ie.FAILED,new Error(y?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=ie.SUCCESS}else u=ie.SKIPPED_EMPTY_OUTPUT;d="";let _=Date.now()-r;return $.emit(P.TOOL_EXECUTED,{toolId:o,traceId:n,sessionKey:a,success:!0,duration:_,mode:Ue.FOLLOW_AI}),{success:!0,toolId:o,output:f,duration:_,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:p.length,selectors:c,apiPreset:l,writebackStatus:u,failureStage:"",writebackDetails:y,phases:Ts(p,f,y)}}}catch(h){let m=Date.now()-r,_=d||pe.UNKNOWN,M=u||ie.NOT_APPLICABLE;return $.emit(P.TOOL_EXECUTION_FAILED,{toolId:o,traceId:n,sessionKey:a,error:h.message||String(h),duration:m,mode:Ue.FOLLOW_AI}),{success:!1,toolId:o,error:h.message||String(h),duration:m,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:p.length,selectors:c,apiPreset:l,writebackStatus:M,failureStage:_,writebackDetails:y,phases:Ts(p,f,y)}}}}async runToolInline(e,s){return this.runToolFollowAiManual(e,s)}async previewExtraction(e,s){return{success:!0,...this.getExtractionSnapshot(e,s)}}getExtractionSnapshot(e,s){let r=this._buildRecentMessageExtractionEntries(e,s),o=this._joinMessageBlocks(r,"rawText"),n=this._joinMessageBlocks(r,"filteredText"),a=this._joinMessageBlocks(r,"extractedText",{skipEmpty:!0}),i=(Array.isArray(r)?r:[]).map(c=>String(c?.extractedText||"").trim()).filter(Boolean).join(`

`),l=Array.isArray(r)&&r.length>0?r[r.length-1]:null;return{sourceText:o,filteredSourceText:n,extractedText:a,extractedRawText:i,messageEntries:r,primaryEntry:l,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,s){let r=this._buildRecentMessageExtractionEntries(e,s),o=this._joinMessageBlocks(r,"rawText"),n=this._joinMessageBlocks(r,"filteredText"),a=this._joinMessageBlocks(r,"extractedText",{skipEmpty:!0}),i={...s,rawRecentMessagesText:o,recentMessagesText:n,extractedContent:a,toolContentMacro:this._buildToolContentMacro(r),toolName:e.name,toolId:e.id};return Xt.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let s=String(e).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,s,r={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:o=9e4,signal:n}=r,a=null;if(e){if(!zs(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=Ks(e)}else a=Ks();let i=us(a||{});if(!i.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:o,apiConfig:a},n);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Ke.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,s){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,s);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,s);if(e.content)return this._applyOutputExtractionSelectors(e.content,s);if(e.text)return this._applyOutputExtractionSelectors(e.text,s);if(e.message)return this._applyOutputExtractionSelectors(e.message,s);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),s)}catch{return this._applyOutputExtractionSelectors(String(e),s)}}return this._applyOutputExtractionSelectors(String(e),s)}_applyOutputExtractionSelectors(e,s){let r=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(s);if(!o.length)return r.trim();let n=[];for(let a of o){let i=String(a||"").trim();if(!i)continue;if(i.startsWith("regex:")){let c=i.slice(6).trim();if(!c)continue;try{let d=new RegExp(c,"gi");[...r.matchAll(d)].forEach(y=>{let p=String(y?.[0]||"").trim();p&&n.push(p)})}catch(d){this._log("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:d})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(r.match(c)||[]).forEach(u=>{let y=String(u||"").trim();y&&n.push(y)})}catch(c){this._log("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}}return n.length>0?n.join(`

`).trim():r.trim()}_getExtractionSelectors(e){let s=e?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(r=>String(r||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(r=>String(r||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,s){return this._applyExtractionSelectorsInternal(e,s,{strict:!1})}_applyExtractionSelectorsInternal(e,s,r={}){let o=typeof e=="string"?e:String(e||""),n=this._getExtractionSelectors(s),{strict:a=!1}=r;if(!n.length)return o.trim();let i=n.map((c,d)=>{let u=String(c||"").trim(),y=u.startsWith("regex:");return{id:`tool-extract-${d}`,type:y?"regex_include":"include",value:y?u.slice(6).trim():u,enabled:!0}}).filter(c=>c.value),l=Wt(o,i,[]);return a?(l||"").trim():l||o.trim()}_extractToolContent(e,s){let r=typeof s=="string"?s:String(s||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(r,e,{strict:!0}):r.trim()}_applyGlobalContextRules(e){let s=typeof e=="string"?e:String(e||"");if(!s.trim())return"";try{let r=dt()||[],o=jt()||[];return!Array.isArray(r)||r.length===0?s.trim():Wt(s,r,o)||s.trim()}catch(r){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",r),s.trim()}}_getMessageText(e){if(!e)return"";let s=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let r of s)if(typeof r=="string"&&r.trim())return r.trim();return""}_collectRecentAssistantMessages(e,s){return this._collectRecentAssistantMessageEntries(e,s).map(r=>r.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,s){let r=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),o=Array.isArray(s?.chatMessages)?s.chatMessages:[],n=[];for(let i=o.length-1;i>=0&&n.length<r;i-=1){let l=o[i],c=String(l?.role||"").toLowerCase(),d=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,u=this._getMessageText(l);d&&u&&n.unshift({text:u,message:l,chatIndex:i})}if(n.length>0)return n;let a=s?.lastAiMessage||s?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,s){return this._collectRecentAssistantMessageEntries(e,s).map((o,n)=>{let a=o.text||"",i=this._applyGlobalContextRules(a),l=this._extractToolContent(e,a);return{...o,order:n+1,rawText:a,filteredText:i,extractedText:l,fullMessageText:a}})}_joinMessageBlocks(e,s,r={}){let o=Array.isArray(e)?e:[],{skipEmpty:n=!1}=r;return o.map(i=>{let l=String(i?.[s]||"").trim();return n&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(o=>{let n=`\u3010\u7B2C ${o?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(o?.filteredText||"").trim()||"(\u7A7A)",i=String(o?.extractedText||"").trim()||"(\u7A7A)";return`${n}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)?s?.automation?.enabled===!0:!1):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(e){this.debugMode=e}_log(...e){(this.debugMode||Ke.getDebugSettings()?.enableDebugLog)&&console.log("[ToolOutputService]",...e)}},tt=new lo,Zd=tt});function Ni(t={}){return!t||typeof t!="object"?{}:Object.entries(t).reduce((e,[s,r])=>(e[s]=r===!0,e),{})}function su(t,e={}){let s=e?.direction==="unescape"?"unescape":"escape",r=Ni(e?.options);return eu.reduce((o,n)=>r[n.key]!==!0?o:s==="unescape"?o.replace(n.escaped,n.unescaped):o.replace(n.plain,n.replacement),String(t||""))}function ru(t,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(t||"");let r=Ni(e?.options);return tu.reduce((o,n)=>r[n.key]!==!0?o:o.replace(n.from,n.to),String(t||""))}function Li(t,e){let s=t?.processor||{},r=s?.type||"",o=String(e||"");switch(r){case Oi.ESCAPE_TRANSFORM:return su(o,s);case Oi.PUNCTUATION_TRANSFORM:return ru(o,s);default:return o}}var eu,tu,Oi,Bi=W(()=>{eu=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],tu=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],Oi={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var En={};ye(En,{abortAllTasks:()=>lu,abortTask:()=>iu,buildToolMessages:()=>Ui,clearExecutionHistory:()=>pu,createExecutionContext:()=>bu,createResult:()=>uo,enhanceMessagesWithBypass:()=>hu,executeBatch:()=>au,executeTool:()=>zi,executeToolWithConfig:()=>Wi,executeToolsBatch:()=>wu,executorState:()=>oe,extractFailed:()=>mu,extractSuccessful:()=>fu,generateTaskId:()=>Qt,getExecutionHistory:()=>yu,getExecutorStatus:()=>uu,getScheduler:()=>_s,mergeResults:()=>gu,pauseExecutor:()=>cu,resumeExecutor:()=>du,setMaxConcurrent:()=>nu});function uo(t,e,s,r,o,n,a=0){return{success:s,taskId:t,toolId:e,data:r,error:o,duration:n,retries:a,timestamp:Date.now(),metadata:{}}}function Qt(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function ou(t,e={}){return{id:Qt(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function _s(){return ur||(ur=new An(oe.maxConcurrent)),ur}function nu(t){oe.maxConcurrent=Math.max(1,Math.min(10,t)),ur&&(ur.maxConcurrent=oe.maxConcurrent)}async function zi(t,e={},s){let r=_s(),o=ou(t,e);for(;oe.isPaused;)await new Promise(n=>setTimeout(n,100));try{let n=await r.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},o);return Ki(n),n}catch(n){let a=uo(o.id,t,!1,null,n,Date.now()-o.createdAt,o.retries);return Ki(a),a}}async function au(t,e={}){let{failFast:s=!1,concurrency:r=oe.maxConcurrent}=e,o=[],n=_s(),a=n.maxConcurrent;n.maxConcurrent=r;try{let i=t.map(({toolId:l,options:c,executor:d})=>zi(l,c,d));if(s)for(let l of i){let c=await l;if(o.push(c),!c.success){n.abortAll();break}}else{let l=await Promise.allSettled(i);for(let c of l)c.status==="fulfilled"?o.push(c.value):o.push(uo(Qt(),"unknown",!1,null,c.reason,0,0))}}finally{n.maxConcurrent=a}return o}function iu(t){return _s().abort(t)}function lu(){_s().abortAll(),oe.executionQueue=[]}function cu(){oe.isPaused=!0}function du(){oe.isPaused=!1}function uu(){return{..._s().getStatus(),isPaused:oe.isPaused,activeControllers:oe.activeControllers.size,historyCount:oe.executionHistory.length}}function Ki(t){oe.executionHistory.push(t),oe.executionHistory.length>100&&oe.executionHistory.shift()}function yu(t={}){let e=[...oe.executionHistory];return t.toolId&&(e=e.filter(s=>s.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(s=>s.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function pu(){oe.executionHistory=[]}function gu(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of t)e.totalDuration+=s.duration,s.success?(e.successCount++,s.data!==void 0&&s.data!==null&&e.data.push(s.data)):(e.success=!1,e.failureCount++,s.error&&e.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return e}function fu(t){return t.filter(e=>e.success).map(e=>e.data)}function mu(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function bu(t={}){return{taskId:Qt(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function hu(t,e){return!e||e.length===0?t:[...e,...t]}function vu(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ui(t,e){let s=[],r=t.promptTemplate||"",o={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[n,a]of Object.entries(o))r=r.replace(new RegExp(vu(n),"g"),a);return s.push({role:"USER",content:r}),s}async function Wi(t,e,s={}){let r=Z(t);if(!r)return{success:!1,taskId:Qt(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!r.enabled)return{success:!1,taskId:Qt(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let o=Date.now(),n=Qt();try{$.emit(P.TOOL_EXECUTION_STARTED,{toolId:t,taskId:n,context:e});let a=Ui(r,e);if(typeof s.callApi=="function"){let i=r.output?.apiPreset||r.apiPreset||"",l=i?{preset:i}:null,c=await s.callApi(a,l,s.signal),d=c;r.outputMode==="separate"&&r.extractTags?.length>0&&(d=xu(c,r.extractTags));let u={success:!0,taskId:n,toolId:t,data:d,duration:Date.now()-o};return $.emit(P.TOOL_EXECUTED,{toolId:t,taskId:n,result:u}),u}else return{success:!0,taskId:n,toolId:t,data:{messages:a,config:{apiPreset:r.output?.apiPreset||r.apiPreset||"",outputMode:r.outputMode,extractTags:r.extractTags}},duration:Date.now()-o,needsExecution:!0}}catch(a){let i={success:!1,taskId:n,toolId:t,error:a.message||String(a),duration:Date.now()-o};return $.emit(P.TOOL_EXECUTION_FAILED,{toolId:t,taskId:n,error:a}),i}}function xu(t,e){let s={};for(let r of e){let o=new RegExp(`<${r}[^>]*>([\\s\\S]*?)<\\/${r}>`,"gi"),n=t.match(o);n&&(s[r]=n.map(a=>{let i=a.match(new RegExp(`<${r}[^>]*>([\\s\\S]*?)<\\/${r}>`,"i"));return i?i[1].trim():""}))}return s}async function wu(t,e,s={}){let r=[];for(let o of t){let n=Z(o);if(n&&n.enabled){let a=await Wi(o,e,s);r.push(a)}}return r}var oe,An,ur,Mn=W(()=>{At();ge();oe={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};An=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,s){return new Promise((r,o)=>{this.queue.push({executor:e,task:s,resolve:r,reject:o}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:s,task:r,resolve:o,reject:n}=e,a=new AbortController;r.abortController=a,r.status="running",r.startedAt=Date.now(),this.running.set(r.id,r),oe.activeControllers.set(r.id,a),this.executeTask(s,r,a.signal).then(i=>{r.status="completed",r.completedAt=Date.now(),o(i)}).catch(i=>{r.status=i.name==="AbortError"?"aborted":"failed",r.completedAt=Date.now(),n(i)}).finally(()=>{this.running.delete(r.id),oe.activeControllers.delete(r.id),oe.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,s,r){let o=Date.now(),n=null;for(let a=0;a<=s.maxRetries;a++){if(r.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(r);return uo(s.id,s.toolId,!0,i,null,Date.now()-o,a)}catch(i){if(n=i,i.name==="AbortError")throw i;a<s.maxRetries&&(await this.delay(1e3*(a+1)),s.retries=a+1)}}throw n}delay(e){return new Promise(s=>setTimeout(s,e))}abort(e){let s=oe.activeControllers.get(e);return s?(s.abort(),!0):!1}abortAll(){for(let e of oe.activeControllers.values())e.abort();oe.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},ur=null});async function Su(){return kn||(kn=Promise.resolve().then(()=>(Mn(),En))),kn}async function Tu(t,e,s){return s&&t.output?.mode===Ue.POST_RESPONSE_API?tt.runToolPostResponse(t,e):s&&t.output?.mode===Ue.FOLLOW_AI?tt.runToolFollowAiManual(t,e):(await Su()).executeToolWithConfig(t.id,e)}function _u(t,e){return e?.runSource==="MANUAL"?t.output?.mode==="local_transform"||t.processor?.type?Zt.MANUAL_LOCAL_TRANSFORM:t.output?.mode===Ue.POST_RESPONSE_API?Zt.MANUAL_POST_RESPONSE_API:Zt.MANUAL_COMPATIBILITY:Zt.MANUAL_POST_RESPONSE_API}function yo(t,e){try{fn(t,e)}catch(s){console.warn("[ManualTool] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",t,s)}}function Au(t,e,s){let r=String(t||""),o=String(e||"").trim(),n=String(s||"").trim();return!r.trim()||!o?{nextMessageText:"",replaced:!1}:r.includes(o)?{nextMessageText:r.replace(o,n).trim(),replaced:!0}:{nextMessageText:"",replaced:!1}}async function Eu(t,e){let s=tt.getExtractionSnapshot(t,e),r=s?.primaryEntry||null,o=String(r?.fullMessageText||e?.lastAiMessage||"").trim(),n=String(r?.extractedText||s?.extractedRawText||s?.extractedText||"").trim(),a=Array.isArray(s?.selectors)?s.selectors:[],i=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l=e?.sessionKey||"";if(!n||!o)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:ie.NOT_APPLICABLE,failureStage:pe.EXTRACT_OUTPUT,extraction:s}};let c=String(Li(t,n)||"").trim(),d=Au(o,n,c),u=d.replaced?d.nextMessageText:c,y=null,p=ie.NOT_APPLICABLE;if(u){if(y=await Pe.injectDetailed(t.id,u,{overwrite:!0,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:[],replaceFullMessage:d.replaced,traceId:i,sessionKey:l}),!y?.success)return{success:!1,error:y?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:ie.FAILED,failureStage:pe.INJECT_CONTEXT,writebackDetails:y,extraction:s}};p=ie.SUCCESS}else p=ie.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:c,meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:p,failureStage:"",writebackDetails:y,extraction:s}}}async function Mu(t,e){let s=Date.now(),r=t.id,o=`yyt-tool-run-${r}`,n=_u(t,e),a=e?.executionKey||"";yo(r,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),me("info",`\u6B63\u5728\u624B\u52A8\u6267\u884C ${t.name}`,{sticky:!0,noticeId:o});try{let i=n===Zt.MANUAL_LOCAL_TRANSFORM?await Eu(t,e):await Tu(t,e,!0),l=Date.now()-s;if(i?.success){let y=Z(r),p=i?.meta?.writebackDetails||{};return yo(r,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(y?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:i?.meta?.writebackStatus||ie.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!p.contentCommitted,lastHostCommitApplied:!!p.hostCommitApplied,lastRefreshRequested:!!p.refreshRequested,lastRefreshConfirmed:!!p.refreshConfirmed,lastPreferredCommitMethod:p?.commit?.preferredMethod||"",lastAppliedCommitMethod:p?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(p?.refresh?.requestMethods)?p.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(p?.refresh?.requestMethods)?[...p.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(p?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:p?.refresh?.confirmedBy||""}),S("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`),me("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,{duration:3200,noticeId:o}),{success:!0,duration:l,result:i}}let c=Z(r),d=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",u=i?.meta?.writebackDetails||{};return yo(r,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:i?.meta?.writebackStatus||ie.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||(n===Zt.MANUAL_COMPATIBILITY?pe.COMPATIBILITY_EXECUTE:pe.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),S("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),me("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),{success:!1,duration:l,error:d,result:i}}catch(i){let l=Date.now()-s,c=Z(r),d=i?.message||String(i);throw yo(r,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:ie.NOT_APPLICABLE,lastFailureStage:n===Zt.MANUAL_COMPATIBILITY?pe.COMPATIBILITY_EXECUTE:pe.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),S("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),me("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),i}}async function po(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=Z(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return _t(t,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:ie.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),me("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let s=await Vt({runSource:"MANUAL"});return Mu(e,s)}async function go(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=Z(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await Vt({runSource:"MANUAL_PREVIEW"});return tt.previewExtraction(e,s)}var Zt,kn,In=W(()=>{At();co();vs();Jt();Bi();Se();Zt={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},kn=null});var ji={};ye(ji,{TOOL_CONFIG_PANEL_STYLES:()=>As,createToolConfigPanel:()=>Et,default:()=>ku});function Et(t){let{id:e,toolId:s,postResponseHint:r,extractionPlaceholder:o,previewDialogId:n,previewTitle:a="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",toolKindLabel:i="AI \u5DE5\u5177"}=t;return{id:e,toolId:s,renderSessionId:0,_beginRenderSession(l){return this.renderSessionId=(this.renderSessionId||0)+1,B(l)&&l.data("yytRenderSessionId",this.renderSessionId),this.renderSessionId},_isRenderSessionActive(l,c){return B(l)&&l.data("yytRenderSessionId")===c},_renderIfSessionActive(l,c){return this._isRenderSessionActive(l,c)?(this.renderTo(l),!0):!1},render(){let l=Z(this.toolId);if(!l)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let c=this._getApiPresets(),d=l.output?.apiPreset||l.apiPreset||"",u=this._getBypassPresets(),y=l.output?.mode||"follow_ai",p=l.bypass?.enabled||!1,f=l.bypass?.presetId||"",h=l.runtime?.lastStatus||"idle",m=l.runtime?.lastRunAt?new Date(l.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",_=l.runtime?.lastError||"",M=l.extraction||{},w=l.automation||{},E=l.worldbooks||{},k=Array.isArray(this.draftSelectedWorldbooks)?this.draftSelectedWorldbooks:Array.isArray(E.selected)?E.selected:[],I=Array.isArray(this.availableWorldbooks)?this.availableWorldbooks:[],N=String(this.worldbookFilter||"").trim().toLowerCase(),se=N?I.filter(G=>String(G||"").toLowerCase().includes(N)):I,q=k.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":k.length<=2?k.join("\u3001"):`\u5DF2\u9009 ${k.length} \u9879\uFF1A${k.slice(0,2).join("\u3001")} \u7B49`,O=Array.isArray(M.selectors)?M.selectors.join(`
`):"",ee=y==="post_response_api"?r:"\u968F AI \u8F93\u51FA\u6A21\u5F0F\u4E0D\u4F1A\u989D\u5916\u8BF7\u6C42\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002",ve=y==="post_response_api"?"\u989D\u5916\u89E3\u6790":"\u968F AI \u8F93\u51FA",_e=y==="post_response_api",Ge=d||"\u5F53\u524D\u914D\u7F6E";return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${x(l.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${x(l.description||"\u914D\u7F6E\u6A21\u677F\u3001\u63D0\u53D6\u89C4\u5219\u3001API \u9884\u8BBE\u4E0E\u624B\u52A8\u8C03\u8BD5\u80FD\u529B\u3002")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u6A21\u5F0F ${x(ve)}</span>
              <span class="yyt-tool-hero-chip">\u9884\u8BBE ${x(Ge)}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${x(h)}</span>
              <div class="yyt-tool-panel-hero-actions">
                <button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-tool-save-top" id="${b}-tool-save-top">
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
              <select class="yyt-select" id="${b}-tool-output-mode">
                <option value="follow_ai" ${y==="follow_ai"?"selected":""}>\u968F AI \u8F93\u51FA\uFF08\u652F\u6301\u624B\u52A8\u6267\u884C\uFF09</option>
                <option value="post_response_api" ${y==="post_response_api"?"selected":""}>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790</option>
              </select>
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${ee}${_e?" \u5F53\u524D\u6A21\u5F0F\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\uFF0C\u4ECD\u9700\u5728\u5168\u5C40\u8BBE\u7F6E\u4E2D\u5F00\u542F\u81EA\u52A8\u5316\u3002":""}</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-database"></i>
              <span>API \u9884\u8BBE</span>
            </div>
            <div class="yyt-form-group">
              <label>\u89E3\u6790\u4F7F\u7528\u7684 API \u9884\u8BBE</label>
              <select class="yyt-select" id="${b}-tool-api-preset">
                <option value="">\u4F7F\u7528\u5F53\u524DAPI\u914D\u7F6E</option>
                ${c.map(G=>`
                  <option value="${x(G.name)}" ${G.name===d?"selected":""}>
                    ${x(G.name)}
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
                <input type="checkbox" id="${b}-tool-bypass-enabled" ${p?"checked":""}>
                <span>\u542F\u7528 Ai \u6307\u4EE4\u9884\u8BBE</span>
              </label>
            </div>
            <div class="yyt-form-group yyt-bypass-preset-select ${p?"":"yyt-hidden"}">
              <label>\u7ED1\u5B9A Ai \u6307\u4EE4\u9884\u8BBE</label>
              <select class="yyt-select" id="${b}-tool-bypass-preset">
                <option value="">\u9009\u62E9\u9884\u8BBE</option>
                ${u.map(G=>`
                  <option value="${x(G.id)}" ${G.id===f?"selected":""}>
                    ${x(G.name)}${G.isDefault?" [\u9ED8\u8BA4]":""}
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
                <input type="checkbox" id="${b}-tool-worldbooks-enabled" ${E.enabled?"checked":""}>
                <span>\u542F\u7528\u4E16\u754C\u4E66\u6CE8\u5165</span>
              </label>
            </div>
            <div class="yyt-form-group">
              <label>\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66\uFF08\u53EF\u591A\u9009\uFF09</label>
              <div class="yyt-worldbook-select" id="${b}-tool-worldbook-select">
                <div class="yyt-worldbook-summary">${x(q)}</div>
                <div class="yyt-worldbook-dropdown" id="${b}-tool-worldbook-dropdown">
                  <input type="text" class="yyt-input yyt-worldbook-search" id="${b}-tool-worldbook-search" placeholder="\u641C\u7D22\u4E16\u754C\u4E66..." value="${x(this.worldbookFilter||"")}">
                  <div class="yyt-worldbook-list" id="${b}-tool-worldbooks">
                    ${I.length>0?se.length>0?se.map(G=>`
                      <div class="yyt-worldbook-item">
                        <label class="yyt-checkbox-label">
                          <input type="checkbox" data-worldbook-name="${x(G)}" ${k.includes(G)?"checked":""}>
                          <span>${x(G)}</span>
                        </label>
                      </div>
                    `).join(""):'<div class="yyt-tool-compact-hint yyt-worldbook-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>':`<div class="yyt-tool-compact-hint yyt-worldbook-empty">${this.worldbookLoadState==="loading"?"\u4E16\u754C\u4E66\u52A0\u8F7D\u4E2D\u2026":"\u5F53\u524D\u672A\u8BFB\u53D6\u5230\u53EF\u7528\u4E16\u754C\u4E66\u3002"}</div>`}
                  </div>
                  ${this.worldbookLoadState!=="ready"?`
                    <details class="yyt-worldbook-diagnostics">
                      <summary>\u67E5\u770B\u4E16\u754C\u4E66\u8BCA\u65AD</summary>
                      <pre class="yyt-preview-box yyt-preview-pre">${x(JSON.stringify(Si()||{state:this.worldbookLoadState||"idle",message:"\u5C1A\u672A\u751F\u6210\u8BCA\u65AD\u4FE1\u606F"},null,2))}</pre>
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
                <input type="number" class="yyt-input" id="${b}-tool-max-messages" min="1" max="50" value="${Number(M.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${b}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${x(o)}">${x(O)}</textarea>
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
                <input type="checkbox" id="${b}-tool-automation-enabled" ${w.enabled?"checked":""}>
                <span>\u5141\u8BB8\u5F53\u524D\u5DE5\u5177\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1</span>
              </label>
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4 (ms)</label>
                <input type="number" class="yyt-input" id="${b}-tool-automation-settle-ms" min="0" max="10000" step="100" value="${Number(w.settleMs)||1200}">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u51B7\u5374\u65F6\u95F4 (ms)</label>
                <input type="number" class="yyt-input" id="${b}-tool-automation-cooldown-ms" min="0" max="60000" step="100" value="${Number(w.cooldownMs)||5e3}">
              </div>
            </div>
            <div class="yyt-tool-compact-hint">\u53EA\u6709\u540C\u65F6\u6EE1\u8DB3\u201C\u5F53\u524D\u5DE5\u5177\u542F\u7528\u81EA\u52A8\u89E6\u53D1\u201D\u201C\u8F93\u51FA\u6A21\u5F0F\u4E3A\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u201C\u5168\u5C40\u81EA\u52A8\u5316\u5F00\u542F\u201D\u65F6\uFF0C\u624D\u4F1A\u5728 AI \u56DE\u590D\u540E\u81EA\u52A8\u6267\u884C\u3002</div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-file-code"></i>
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
                        placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${x(l.promptTemplate||"")}</textarea>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${x(h)}">${x(h)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${x(m)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${l.runtime?.successCount||0} / ${l.runtime?.errorCount||0}</span>
                </div>
                ${_?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${x(_)}</span>
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
      `},_getApiPresets(){try{return xt()||[]}catch{return[]}},_getBypassPresets(){try{return Tn()||[]}catch{return[]}},async _loadWorldbooks(){this.worldbookLoadState="loading";for(let d=0;d<10;d+=1){try{let u=await Ti();if(Array.isArray(u)&&u.length>0)return this.availableWorldbooks=u,this.worldbookLoadState="ready",this.availableWorldbooks}catch{this.availableWorldbooks=nr()}d<9&&await new Promise(u=>setTimeout(u,400))}return this.availableWorldbooks=nr(),this.worldbookLoadState="empty",this.availableWorldbooks},_getFormData(l){let c=D(),d=Z(this.toolId)||{};if(!c||!B(l))return d;let u=l.find(`#${b}-tool-output-mode`).val()||"follow_ai",y=l.find(`#${b}-tool-bypass-enabled`).is(":checked"),p=u==="post_response_api",f=p&&l.find(`#${b}-tool-automation-enabled`).is(":checked"),h=(l.find(`#${b}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(_=>_.trim()).filter(Boolean),m=l.find("[data-worldbook-name]:checked").map((_,M)=>String(c(M).data("worldbook-name")||"").trim()).get().filter(Boolean);return{enabled:d?.enabled!==!1,promptTemplate:l.find(`#${b}-tool-prompt-template`).val()||"",apiPreset:l.find(`#${b}-tool-api-preset`).val()||"",extractTags:h,output:{mode:u,apiPreset:l.find(`#${b}-tool-api-preset`).val()||"",overwrite:!0,enabled:p},automation:{enabled:f,settleMs:Math.max(0,parseInt(l.find(`#${b}-tool-automation-settle-ms`).val(),10)||1200),cooldownMs:Math.max(0,parseInt(l.find(`#${b}-tool-automation-cooldown-ms`).val(),10)||5e3)},bypass:{enabled:y,presetId:y&&l.find(`#${b}-tool-bypass-preset`).val()||""},worldbooks:{enabled:l.find(`#${b}-tool-worldbooks-enabled`).is(":checked"),selected:m},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(l.find(`#${b}-tool-max-messages`).val(),10)||5),selectors:h}}},_showExtractionPreview(l,c,d=null){if(!D()||d!==null&&!this._isRenderSessionActive(l,d))return;let y=`${b}-${n}`,p=Array.isArray(c.messageEntries)?c.messageEntries:[],f=p.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${p.map((h,m)=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">${m===p.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${p.length-m} \u6761\u6D88\u606F`}</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${x(h.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${x(h.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${x(h.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";l.append(Gs({id:y,title:a,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${x((c.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6309\u6700\u8FD1\u6D88\u606F\u5230\u66F4\u65E9\u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${x(c.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${x(c.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${x(c.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${f}
        `})),Vs(l,y,{onSave:h=>h()}),l.find(`#${y}-save`).text("\u5173\u95ED"),l.find(`#${y}-cancel`).remove()},bindEvents(l){let c=D();if(!c||!B(l))return;let d=this,u=l.data("yytRenderSessionId"),y=()=>l.find("[data-worldbook-name]:checked").map((h,m)=>String(c(m).data("worldbook-name")||"").trim()).get().filter(Boolean),p=()=>{let h=y(),m=h.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":h.length<=2?h.join("\u3001"):`\u5DF2\u9009 ${h.length} \u9879\uFF1A${h.slice(0,2).join("\u3001")} \u7B49`;l.find(".yyt-worldbook-summary").text(m)},f=()=>{let h=String(this.worldbookFilter||"").trim().toLowerCase(),m=l.find(`#${b}-tool-worldbooks`),_=m.find(".yyt-worldbook-item"),M=0;_.each((w,E)=>{let k=c(E),I=String(k.find("[data-worldbook-name]").data("worldbook-name")||"").toLowerCase(),N=!h||I.includes(h);k.toggleClass("yyt-hidden",!N),N&&(M+=1)}),m.find(".yyt-worldbook-search-empty").remove(),_.length>0&&M===0&&m.append('<div class="yyt-tool-compact-hint yyt-worldbook-empty yyt-worldbook-search-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>')};l.off(".yytToolPanel"),l.on("input.yytToolPanel",`#${b}-tool-worldbook-search`,h=>{this.worldbookFilter=String(c(h.currentTarget).val()||""),f()}),f(),l.on("change.yytToolPanel","[data-worldbook-name]",()=>{this.draftSelectedWorldbooks=y(),p()}),l.on("change.yytToolPanel",`#${b}-tool-output-mode`,()=>{let m=(l.find(`#${b}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?`${r} \u5F53\u524D\u6A21\u5F0F\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\uFF0C\u8BB0\u5F97\u540C\u65F6\u5F00\u542F\u5168\u5C40\u81EA\u52A8\u5316\u3002`:"\u968F AI \u8F93\u51FA\u6A21\u5F0F\u4E0D\u4F1A\u989D\u5916\u8BF7\u6C42\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002";l.find(".yyt-tool-mode-hint").text(m)}),l.on("change.yytToolPanel",`#${b}-tool-bypass-enabled`,h=>{let m=c(h.currentTarget).is(":checked");l.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!m)}),l.on("click.yytToolPanel",`#${b}-tool-save, #${b}-tool-save-top`,()=>{d._saveConfig(l,{silent:!1})}),l.on("click.yytToolPanel",`#${b}-tool-reset-template`,()=>{let h=bs(d.toolId);h?.promptTemplate&&(l.find(`#${b}-tool-prompt-template`).val(h.promptTemplate),S("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),l.on("click.yytToolPanel",`#${b}-tool-run-manual`,async()=>{if(d._saveConfig(l,{silent:!0}))try{let m=await po(d.toolId);if(!d._isRenderSessionActive(l,u))return;!m?.success&&m?.error&&me("warning",m.error,{duration:3200,noticeId:`yyt-tool-run-${d.toolId}`})}catch(m){if(!d._isRenderSessionActive(l,u))return;S("error",m?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{d._renderIfSessionActive(l,u)}}),l.on("click.yytToolPanel",`#${b}-tool-preview-extraction`,async()=>{if(d._saveConfig(l,{silent:!0}))try{let m=await go(d.toolId);if(!d._isRenderSessionActive(l,u))return;if(!m?.success){S("error",m?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}d._showExtractionPreview(l,m,u)}catch(m){if(!d._isRenderSessionActive(l,u))return;S("error",m?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}),we(l,{namespace:"yytToolPanelSelect",selectors:[`#${b}-tool-output-mode`,`#${b}-tool-api-preset`,`#${b}-tool-bypass-preset`]})},_saveConfig(l,c={}){let d=this._getFormData(l),{silent:u=!1}=c,y=Be(this.toolId,d);return y&&(this.draftSelectedWorldbooks=Array.isArray(d.worldbooks?.selected)?[...d.worldbooks.selected]:[]),y?u||S("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):S("error","\u4FDD\u5B58\u5931\u8D25"),y},destroy(l){!D()||!B(l)||(this.renderSessionId=(this.renderSessionId||0)+1,l.removeData("yytRenderSessionId"),ue(l,"yytToolPanelSelect"),l.off(".yytToolPanel"))},getStyles(){return As},renderTo(l){if(!D()||!B(l))return;let d=this._beginRenderSession(l);if(this.worldbookFilter=this.worldbookFilter||"",!Array.isArray(this.draftSelectedWorldbooks)){let y=Z(this.toolId);this.draftSelectedWorldbooks=Array.isArray(y?.worldbooks?.selected)?[...y.worldbooks.selected]:[]}let u=nr();Array.isArray(u)&&u.length>0?(this.availableWorldbooks=u,this.worldbookLoadState="ready"):this.worldbookLoadState="loading",l.html(this.render({})),this.bindEvents(l,{}),this.worldbookLoadState==="loading"&&Promise.resolve(this._loadWorldbooks()).catch(()=>(this.worldbookLoadState="empty",nr())).then(y=>{this._isRenderSessionActive(l,d)&&(this.availableWorldbooks=Array.isArray(y)?y:[],this._updateWorldbookList(l,d))})},_updateWorldbookList(l,c=null){if(!D()||!B(l)||c!==null&&!this._isRenderSessionActive(l,c))return;let u=String(this.worldbookFilter||"").trim().toLowerCase(),y=Array.isArray(this.availableWorldbooks)?this.availableWorldbooks:[],p=Array.isArray(this.draftSelectedWorldbooks)?this.draftSelectedWorldbooks:[],f=u?y.filter(_=>String(_||"").toLowerCase().includes(u)):y,h=l.find(`#${b}-tool-worldbooks`);if(!h.length)return;if(y.length===0){h.html(`<div class="yyt-tool-compact-hint yyt-worldbook-empty">${this.worldbookLoadState==="loading"?"\u4E16\u754C\u4E66\u52A0\u8F7D\u4E2D\u2026":"\u5F53\u524D\u672A\u8BFB\u53D6\u5230\u53EF\u7528\u4E16\u754C\u4E66\u3002"}</div>`);return}h.html(f.length>0?f.map(_=>`
        <div class="yyt-worldbook-item">
          <label class="yyt-checkbox-label">
            <input type="checkbox" data-worldbook-name="${x(_)}" ${p.includes(_)?"checked":""}>
            <span>${x(_)}</span>
          </label>
        </div>
      `).join(""):'<div class="yyt-tool-compact-hint yyt-worldbook-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>');let m=p.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":p.length<=2?p.join("\u3001"):`\u5DF2\u9009 ${p.length} \u9879\uFF1A${p.slice(0,2).join("\u3001")} \u7B49`;l.find(".yyt-worldbook-summary").text(m)}}}var As,ku,es=W(()=>{Se();At();wn();Hs();ar();In();As=`
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
    color: var(--yyt-text);
    caret-color: var(--yyt-accent-strong);
    background:
      linear-gradient(180deg, rgba(7, 11, 18, 0.9) 0%, rgba(9, 13, 18, 0.72) 100%),
      rgba(3, 7, 12, 0.3);
    border-color: rgba(255, 255, 255, 0.12);
    resize: vertical;
    min-height: 180px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 10px 22px rgba(0, 0, 0, 0.18);
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
`;ku=Et});var ts,Cn=W(()=>{es();ts=Et({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var ss,Pn=W(()=>{es();ss=Et({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var rs,Rn=W(()=>{es();rs=Et({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"})});function Fi(t=[],e={}){return t.map(s=>({...s,checked:e?.[s.key]===!0}))}function fo(t){let{id:e,toolId:s,previewDialogId:r,previewTitle:o="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:n=[],processorOptions:a=[],heroHint:i="",extractionPlaceholder:l=""}=t;return{id:e,toolId:s,renderSessionId:0,_beginRenderSession(c){return this.renderSessionId=(this.renderSessionId||0)+1,B(c)&&c.data("yytRenderSessionId",this.renderSessionId),this.renderSessionId},_isRenderSessionActive(c,d){return B(c)&&c.data("yytRenderSessionId")===d},_renderIfSessionActive(c,d){return this._isRenderSessionActive(c,d)?(this.renderTo(c),!0):!1},render(){let c=Z(this.toolId);if(!c)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let d=c.processor||{},u=c.extraction||{},y=c.runtime?.lastStatus||"idle",p=c.runtime?.lastRunAt?new Date(c.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",f=c.runtime?.lastError||"",h=Array.isArray(u.selectors)?u.selectors.join(`
`):"",m=c.output?.overwrite!==!1,_=Fi(n,{[d.direction||n[0]?.key||""]:!0}),M=Fi(a,d.options||{});return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${x(c.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${x(c.description||"")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u672C\u5730\u811A\u672C\u5904\u7406</span>
              <span class="yyt-tool-hero-chip">\u5199\u56DE ${m?"\u8986\u76D6":"\u8FFD\u52A0"}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${x(y)}</span>
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
                <input type="number" class="yyt-input" id="${b}-tool-max-messages" min="1" max="50" value="${Number(u.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${b}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${x(l)}">${x(h)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u5B9A\u4F4D\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u5B9A\u4F4D\u3002\u624B\u52A8\u6267\u884C\u4F1A\u57FA\u4E8E\u6700\u65B0 AI \u6D88\u606F\u5168\u6587\u539F\u4F4D\u66FF\u6362\uFF0C\u5C3D\u91CF\u4FDD\u7559\u5916\u5C42\u6807\u7B7E\u548C\u5176\u4F59\u539F\u6587\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-shuffle"></i>
              <span>\u6267\u884C\u79CD\u7C7B</span>
            </div>
            <div class="yyt-local-output-mode-grid">
              ${_.map(w=>`
                <label class="yyt-local-choice-card">
                  <div class="yyt-checkbox-label">
                    <input type="radio" name="${b}-processor-direction-${this.toolId}" value="${x(w.key)}" ${w.checked?"checked":""}>
                    <span>${x(w.label)}</span>
                  </div>
                  <div class="yyt-local-choice-desc">${x(w.description||"")}</div>
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
              ${M.map(w=>`
                <div class="yyt-local-option-card">
                  <label class="yyt-checkbox-label">
                    <span>${x(w.label)}</span>
                    <input type="checkbox" data-option-key="${x(w.key)}" ${w.checked?"checked":""}>
                  </label>
                  <div class="yyt-tool-compact-hint">${x(w.description||"")}</div>
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
                  <input type="radio" name="${b}-output-mode-${this.toolId}" value="replace" ${m?"checked":""}>
                  <span>\u8986\u76D6\u539F\u5DE5\u5177\u5757</span>
                </div>
                <div class="yyt-local-choice-desc">\u4F18\u5148\u66FF\u6362\u8BE5\u5DE5\u5177\u6B64\u524D\u5199\u5165\u7684\u5185\u5BB9\u3002</div>
              </label>
              <label class="yyt-local-choice-card">
                <div class="yyt-checkbox-label">
                  <input type="radio" name="${b}-output-mode-${this.toolId}" value="append" ${m?"":"checked"}>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${x(y)}">${x(y)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${x(p)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${c.runtime?.successCount||0} / ${c.runtime?.errorCount||0}</span>
                </div>
                ${f?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${x(f)}</span>
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
                <div class="yyt-tool-compact-hint">${x(i||"\u4FDD\u5B58\u540E\u53EF\u76F4\u63A5\u5BF9\u6700\u8FD1 AI \u6D88\u606F\u505A\u672C\u5730\u6587\u672C\u5904\u7406\u3002")}</div>
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
      `},_getFormData(c){let d=D(),u=Z(this.toolId)||{};if(!d||!B(c))return u;let y=(c.find(`#${b}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(m=>m.trim()).filter(Boolean),p=c.find(`input[name="${b}-processor-direction-${this.toolId}"]:checked`).val()||n[0]?.key||"",f=c.find(`input[name="${b}-output-mode-${this.toolId}"]:checked`).val()||"replace",h={};return c.find("[data-option-key]").each((m,_)=>{let M=d(_);h[M.data("option-key")]=M.is(":checked")}),{enabled:c.find(`#${b}-tool-enabled`).is(":checked"),extractTags:y,output:{...u.output||{},mode:"local_transform",overwrite:f!=="append",enabled:!0},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(c.find(`#${b}-tool-max-messages`).val(),10)||5),selectors:y},processor:{...u.processor||{},direction:p,options:h},runtime:{...u.runtime||{}}}},_showExtractionPreview(c,d,u=null){if(!D()||u!==null&&!this._isRenderSessionActive(c,u))return;let p=`${b}-${r}`,f=Array.isArray(d.messageEntries)?d.messageEntries:[],h=f.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${f.map((m,_)=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">${_===f.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${f.length-_} \u6761\u6D88\u606F`}</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${x(m.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${x(m.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${x(m.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";c.append(Gs({id:p,title:o,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${x((d.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6309\u6700\u8FD1\u6D88\u606F\u5230\u66F4\u65E9\u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${x(d.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${x(d.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${x(d.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${h}
        `})),Vs(c,p,{onSave:m=>m()}),c.find(`#${p}-save`).text("\u5173\u95ED"),c.find(`#${p}-cancel`).remove()},bindEvents(c){if(!D()||!B(c))return;let u=this,y=c.data("yytRenderSessionId");c.off(".yytLocalToolPanel"),c.on("click.yytLocalToolPanel",`#${b}-tool-save, #${b}-tool-save-top`,()=>{u._saveConfig(c,{silent:!1})}),c.on("click.yytLocalToolPanel",`#${b}-tool-run-manual`,async()=>{if(u._saveConfig(c,{silent:!0}))try{let f=await po(u.toolId);if(!u._isRenderSessionActive(c,y))return;!f?.success&&f?.error&&me("warning",f.error,{duration:3200,noticeId:`yyt-tool-run-${u.toolId}`})}catch(f){if(!u._isRenderSessionActive(c,y))return;S("error",f?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{u._renderIfSessionActive(c,y)}}),c.on("click.yytLocalToolPanel",`#${b}-tool-preview-extraction`,async()=>{if(u._saveConfig(c,{silent:!0}))try{let f=await go(u.toolId);if(!u._isRenderSessionActive(c,y))return;if(!f?.success){S("error",f?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}u._showExtractionPreview(c,f,y)}catch(f){if(!u._isRenderSessionActive(c,y))return;S("error",f?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}),c.on("click.yytLocalToolPanel",`#${b}-tool-reset-template`,()=>{let p=bs(u.toolId);p?.promptTemplate&&(c.find(`#${b}-tool-prompt-template`).val(p.promptTemplate),S("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))})},_saveConfig(c,d={}){let u=this._getFormData(c),{silent:y=!1}=d,p=Be(this.toolId,u);return p?y||S("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):S("error","\u4FDD\u5B58\u5931\u8D25"),p},destroy(c){!D()||!B(c)||(this.renderSessionId=(this.renderSessionId||0)+1,c.removeData("yytRenderSessionId"),c.off(".yytLocalToolPanel"))},getStyles(){return Iu},renderTo(c){!D()||!B(c)||(this._beginRenderSession(c),c.html(this.render({})),this.bindEvents(c,{}))}}}var Iu,$n=W(()=>{Se();At();In();es();Iu=`${As}
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
`});var os,Dn=W(()=>{$n();os=fo({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]})});var ns,On=W(()=>{$n();ns=fo({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]})});var as,Nn=W(()=>{ge();ar();Se();as={id:"bypassPanel",_getActivePresetId(t){return t.find(".yyt-bypass-editor-content").data("presetId")||null},render(t){let e=j.getPresetList(),s=j.getDefaultPresetId();return`
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
    `},_renderPresetItem(t,e){let s=yt&&yt[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${x(t.name)}</span>
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
      `;let e=j.getDefaultPresetId()===t.id,s=yt&&yt[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${x(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
                 value="${x(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${x(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let s=D();!s||!B(t)||(t.off(".yytBypass"),this._bindPresetListEvents(t,s),this._bindEditorEvents(t,s),this._bindFileEvents(t,s),we(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_bindPresetListEvents(t,e){t.on("click.yytBypass",".yyt-bypass-preset-item",s=>{if(e(s.target).closest(".yyt-bypass-quick-delete").length)return;let r=e(s.currentTarget).data("presetId");this._selectPreset(t,e,r)}),t.on("click.yytBypass",".yyt-bypass-quick-delete",s=>{s.stopPropagation();let r=e(s.currentTarget).data("presetId");if(!r||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let o=j.deletePreset(r);o.success?(t.find(".yyt-bypass-editor-content").data("presetId")===r&&t.find(".yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),S("success","\u9884\u8BBE\u5DF2\u5220\u9664")):S("error",o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.on("click.yytBypass","#yyt-bypass-add",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click.yytBypass","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click.yytBypass","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click.yytBypass",".yyt-bypass-delete-message",s=>{let r=e(s.currentTarget).closest(".yyt-bypass-message"),o=r.data("messageId");r.remove()}),t.on("change.yytBypass",".yyt-bypass-message-enabled",s=>{e(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(s.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.on("click.yytBypass","#yyt-bypass-import",()=>{t.find("#yyt-bypass-import-file").click()}),t.on("change.yytBypass","#yyt-bypass-import-file",async s=>{let r=s.target.files[0];if(r){try{let o=await ct(r),n=j.importPresets(o);S(n.success?"success":"error",n.message),n.success&&this.renderTo(t)}catch(o){S("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.on("click.yytBypass","#yyt-bypass-export",()=>{try{let s=j.exportPresets();lt(s,`bypass_presets_${Date.now()}.json`),S("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){S("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(t,e,s){let r=j.getPreset(s);r&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),t.find(".yyt-bypass-editor").html(this._renderEditor(r)))},_createNewPreset(t,e){let s=`bypass_${Date.now()}`,r=j.createPreset({id:s,name:"\u65B0 Ai \u6307\u4EE4\u9884\u8BBE",description:"",messages:[]});r.success?(this.renderTo(t),this._selectPreset(t,e,s),S("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):S("error",r?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content"),r=s.data("presetId");if(!r)return;let o=s.find(".yyt-bypass-name-input").val().trim(),n=s.find(".yyt-bypass-description-input").val().trim();if(!o){S("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let a=[];s.find(".yyt-bypass-message").each(function(){let l=e(this);a.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let i=j.updatePreset(r,{name:o,description:n,messages:a});i.success?(S("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):S("error",i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let o=j.deletePreset(r);o.success?(this.renderTo(t),S("success","\u9884\u8BBE\u5DF2\u5220\u9664")):S("error",o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r)return;let o=`bypass_${Date.now()}`,n=j.duplicatePreset(r,o);n.success?(this.renderTo(t),this._selectPreset(t,e,o),S("success","\u9884\u8BBE\u5DF2\u590D\u5236")):S("error",n?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r)return;j.setDefaultPresetId(r),this._refreshPresetList(t,e);let o=j.getPreset(r);o&&t.find(".yyt-bypass-editor").html(this._renderEditor(o)),S("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE")},_addMessage(t,e){let s=t.find(".yyt-bypass-messages"),r={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};s.append(this._renderMessageItem(r))},_refreshPresetList(t,e){let s=j.getPresetList(),r=j.getDefaultPresetId(),o=this._getActivePresetId(t);t.find(".yyt-bypass-preset-list").html(s.map(n=>this._renderPresetItem(n,n.id===r)).join("")),o&&t.find(`.yyt-bypass-preset-item[data-preset-id="${o}"]`).addClass("yyt-active")},destroy(t){!D()||!B(t)||(ue(t,"yytBypassSelect"),t.off(".yytBypass"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Vi={};ye(Vi,{SettingsPanel:()=>pt,applyTheme:()=>Gi,applyUiPreferences:()=>Ln,default:()=>Pu});function Es({id:t,checked:e=!1,title:s="",hint:r=""}){return`
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
  `}function Yi(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function yr(){return Yi()?.document||document}function qi(t=yr()){return t?.documentElement||document.documentElement}function Gi(t,e=yr()){let s=qi(e),r={...Cu,...Hi[t]||Hi["dark-blue"]};Object.entries(r).forEach(([o,n])=>{s.style.setProperty(o,n)}),s.setAttribute("data-yyt-theme",t)}function Ln(t={},e=yr()){let s=qi(e),{theme:r="dark-blue",compactMode:o=!1,animationEnabled:n=!0}=t||{};Gi(r,e),s.classList.toggle("yyt-compact-mode",!!o),s.classList.toggle("yyt-no-animation",!n)}var Cu,Hi,pt,Pu,mo=W(()=>{ge();lr();dr();Se();Cu={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)","--yyt-surface":"rgba(255, 255, 255, 0.03)","--yyt-surface-2":"rgba(255, 255, 255, 0.05)","--yyt-surface-3":"rgba(255, 255, 255, 0.075)","--yyt-surface-hover":"rgba(255, 255, 255, 0.08)","--yyt-surface-active":"rgba(255, 255, 255, 0.11)","--yyt-border":"rgba(255, 255, 255, 0.08)","--yyt-border-soft":"rgba(255, 255, 255, 0.05)","--yyt-border-strong":"rgba(255, 255, 255, 0.16)","--yyt-text":"rgba(255, 255, 255, 0.95)","--yyt-text-secondary":"rgba(255, 255, 255, 0.72)","--yyt-text-muted":"rgba(255, 255, 255, 0.5)","--yyt-focus-ring":"0 0 0 3px rgba(123, 183, 255, 0.18)","--yyt-on-accent":"#0b0f15","--yyt-control-bg":"linear-gradient(180deg, #1d2737 0%, #151d2a 100%)","--yyt-control-bg-hover":"linear-gradient(180deg, #243247 0%, #1a2638 100%)","--yyt-control-bg-active":"linear-gradient(180deg, #2a3951 0%, #1d2b3f 100%)","--yyt-control-bg-strong":"linear-gradient(180deg, #243247 0%, #192435 100%)","--yyt-control-bg-focus":"linear-gradient(180deg, #243a57 0%, #1a2a3f 100%)","--yyt-control-border":"rgba(146, 173, 212, 0.24)","--yyt-control-border-hover":"rgba(146, 173, 212, 0.36)","--yyt-control-border-focus":"rgba(123, 183, 255, 0.72)","--yyt-control-shadow":"0 12px 24px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.04)","--yyt-control-shadow-hover":"0 16px 28px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.06)","--yyt-control-shadow-focus":"0 18px 30px rgba(8, 14, 24, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.06)","--yyt-control-shadow-active":"0 10px 20px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.04)","--yyt-select-surface":"#121a26","--yyt-select-option-bg":"#192334","--yyt-select-option-hover-bg":"#233249","--yyt-select-option-selected-bg":"#2a3f60","--yyt-select-option-border":"rgba(123, 183, 255, 0.22)","--yyt-select-option-selected-border":"rgba(123, 183, 255, 0.4)","--yyt-select-dropdown-shadow":"0 24px 44px rgba(0, 0, 0, 0.52), 0 0 0 1px rgba(8, 12, 18, 0.82)","--yyt-select-arrow-color":"rgba(255, 255, 255, 0.52)"},Hi={"dark-blue":{"--yyt-on-accent":"#0b0f15"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#120b1f"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#0b150f"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.72)","--yyt-text-muted":"rgba(15, 23, 42, 0.52)","--yyt-surface":"rgba(255, 255, 255, 0.66)","--yyt-surface-2":"rgba(255, 255, 255, 0.86)","--yyt-surface-3":"rgba(255, 255, 255, 0.94)","--yyt-surface-hover":"rgba(255, 255, 255, 0.92)","--yyt-surface-active":"rgba(255, 255, 255, 0.98)","--yyt-border":"rgba(15, 23, 42, 0.08)","--yyt-border-soft":"rgba(15, 23, 42, 0.05)","--yyt-border-strong":"rgba(15, 23, 42, 0.14)","--yyt-focus-ring":"0 0 0 3px rgba(59, 130, 246, 0.14)","--yyt-on-accent":"#0f172a","--yyt-control-bg":"linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(241, 245, 249, 0.98) 100%)","--yyt-control-bg-hover":"linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(226, 232, 240, 0.98) 100%)","--yyt-control-bg-active":"linear-gradient(180deg, rgba(239, 246, 255, 1) 0%, rgba(219, 234, 254, 0.98) 100%)","--yyt-control-bg-strong":"linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(241, 245, 249, 0.98) 100%)","--yyt-control-bg-focus":"linear-gradient(180deg, rgba(239, 246, 255, 1) 0%, rgba(219, 234, 254, 0.98) 100%)","--yyt-control-border":"rgba(59, 130, 246, 0.18)","--yyt-control-border-hover":"rgba(59, 130, 246, 0.28)","--yyt-control-border-focus":"rgba(59, 130, 246, 0.58)","--yyt-control-shadow":"0 10px 22px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.75)","--yyt-control-shadow-hover":"0 12px 24px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.85)","--yyt-control-shadow-focus":"0 14px 26px rgba(59, 130, 246, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.9)","--yyt-control-shadow-active":"0 8px 18px rgba(15, 23, 42, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.85)","--yyt-select-surface":"#ffffff","--yyt-select-option-bg":"#f8fafc","--yyt-select-option-hover-bg":"#eff6ff","--yyt-select-option-selected-bg":"#dbeafe","--yyt-select-option-border":"rgba(59, 130, 246, 0.16)","--yyt-select-option-selected-border":"rgba(59, 130, 246, 0.34)","--yyt-select-dropdown-shadow":"0 18px 32px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(148, 163, 184, 0.18)","--yyt-select-arrow-color":"rgba(15, 23, 42, 0.45)"}};pt={id:"settingsPanel",render(){let t=Ke.getSettings(),e=t.debug?.enableDebugLog===!0,s=t.automation?.enabled===!0,r=this._getAutomationRuntime();return`
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
    `},_renderAutomationTab(t={},e=null){let s=t.enabled===!0,r=Array.isArray(e?.recentTransactions)?e.recentTransactions.slice().reverse():[],o=e?.hostBinding||{},n=Array.isArray(o.eventBindings)&&o.eventBindings.length>0?o.eventBindings.join(" / "):"\u6682\u65E0\u4E8B\u4EF6\u7ED1\u5B9A",a=r.length>0?r.map(i=>{let l=i?.results?.[0]?.meta?.writebackDetails?.refresh||{},c=Array.isArray(l?.requestMethods)?l.requestMethods.join(" / "):"",d=l?.eventSource||l?.eventName||c||l?.confirmedBy;return`
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
            ${Es({id:"yyt-setting-automationEnabled",checked:t.enabled,title:"\u542F\u7528\u5DE5\u5177\u81EA\u52A8\u89E6\u53D1",hint:"\u8FD9\u91CC\u53EA\u4FDD\u7559\u4E00\u4E2A\u5168\u5C40\u5F00\u5173\u3002\u5F00\u542F\u540E\uFF0C\u6240\u6709\u5904\u4E8E\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u6A21\u5F0F\u7684\u5DE5\u5177\u90FD\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\u3002"})}
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
          <div class="yyt-form-hint">\u4E8B\u4EF6\u7ED1\u5B9A\uFF1A<code>${n}</code></div>
          ${o.lastError?`<div class="yyt-form-hint">\u6700\u8FD1\u9519\u8BEF\uFF1A<code>${o.lastError}</code></div>`:""}
          ${o.retryScheduled?`<div class="yyt-form-hint">\u5DF2\u5B89\u6392\u91CD\u8BD5\uFF1A<code>${o.retryDelayMs||0}ms</code></div>`:""}
          <div class="yyt-form-hint">\u82E5\u81EA\u52A8\u89E6\u53D1\u5931\u8D25\uFF0C\u4F18\u5148\u770B\u6700\u8FD1\u4E8B\u52A1\u7684 verdict\uFF0C\u4F8B\u5982 <code>automation_disabled</code>\u3001<code>no_auto_tools</code>\u3001<code>assistant_message_not_found</code>\u3002</div>
          <div class="yyt-settings-runtime-list">${a}</div>
        </div>
      </div>
    `},_renderDebugTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u65E5\u5FD7\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            ${Es({id:"yyt-setting-enableDebugLog",checked:t.enableDebugLog,title:"\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7",hint:"\u5728\u63A7\u5236\u53F0\u8F93\u51FA\u8BE6\u7EC6\u7684\u8C03\u8BD5\u4FE1\u606F"})}
          </div>

          <div class="yyt-form-group">
            ${Es({id:"yyt-setting-saveExecutionHistory",checked:t.saveExecutionHistory,title:"\u4FDD\u5B58\u6267\u884C\u5386\u53F2",hint:"\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5"})}
          </div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">UI \u663E\u793A</div>
          <div class="yyt-form-group">
            ${Es({id:"yyt-setting-showRuntimeBadge",checked:t.showRuntimeBadge,title:"\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0",hint:"\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668"})}
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
            ${Es({id:"yyt-setting-compactMode",checked:t.compactMode,title:"\u7D27\u51D1\u6A21\u5F0F",hint:"\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9"})}
          </div>

          <div class="yyt-form-group">
            ${Es({id:"yyt-setting-animationEnabled",checked:t.animationEnabled,title:"\u542F\u7528\u52A8\u753B\u6548\u679C",hint:"\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B"})}
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
    `},_renderMacroList(){return ze.getAvailableVariables().map(t=>`
        <div class="yyt-settings-macro-item">
          <code>${t.name}</code>
          <span>${t.description}</span>
        </div>
      `).join("")},bindEvents(t){let e=D();if(!e||!B(t))return;let s=this;t.off(".yytSettings"),t.on("click.yytSettings",".yyt-settings-tab",r=>{let o=e(r.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),e(r.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${o}"]`).addClass("yyt-active")}),t.on("click.yytSettings","#yyt-settings-save",()=>{s._saveSettings(t)}),t.on("click.yytSettings","#yyt-settings-reset",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(Ke.resetSettings(),Ln(ir.ui,yr()),s.renderTo(t),S("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}),we(t,{namespace:"yytSettingsSelect",selectors:["#yyt-setting-queueStrategy","#yyt-setting-theme"]})},_saveSettings(t){let e={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val(),10)||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val(),10)||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val(),10)||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val(),10)||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},automation:{enabled:t.find("#yyt-setting-automationEnabled").is(":checked"),settleMs:parseInt(t.find("#yyt-setting-automationSettleMs").val(),10)||1200,cooldownMs:parseInt(t.find("#yyt-setting-automationCooldownMs").val(),10)||5e3,maxConcurrentSlots:Ke.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};Ke.saveSettings(e),Ln(e.ui,yr()),S("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},_getAutomationRuntime(){try{return Yi()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},destroy(t){!D()||!B(t)||(ue(t,"yytSettingsSelect"),t.off(".yytSettings"))},getStyles(){return`
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
    `},renderTo(t){t.html(this.render({})),this.bindEvents(t,{})}},Pu=pt});function ne(t){return t==null?"":String(t).trim()}function Te(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function Ms(t={}){return{chatId:ne(t.chatId),sourceMessageId:ne(t.sourceMessageId||t.messageId),sourceSwipeId:ne(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:ne(t.effectiveSwipeId||t.sourceSwipeId),slotBindingKey:ne(t.slotBindingKey),slotRevisionKey:ne(t.slotRevisionKey),slotTransactionId:ne(t.slotTransactionId),traceId:ne(t.traceId),resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now()}}function Bn(t={}){return{resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now(),runSource:ne(t.runSource)||st.MANUAL,traceId:ne(t.traceId),chatId:ne(t.chatId),sourceMessageId:ne(t.sourceMessageId||t.messageId),sourceSwipeId:ne(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:ne(t.effectiveSwipeId||t.sourceSwipeId)||"swipe:current",slotBindingKey:ne(t.slotBindingKey),slotRevisionKey:ne(t.slotRevisionKey),slotTransactionId:ne(t.slotTransactionId),assistantContentFingerprint:ne(t.assistantContentFingerprint),assistantBaseFingerprint:ne(t.assistantBaseFingerprint),assistantText:String(t.assistantText||""),assistantBaseText:String(t.assistantBaseText||""),targetMessageIndex:Number.isFinite(t.targetMessageIndex)?t.targetMessageIndex:-1}}function gr(t){return!t||typeof t!="object"?null:{slotBindingKey:ne(t.slotBindingKey),slotRevisionKey:ne(t.slotRevisionKey),sourceMessageId:ne(t.sourceMessageId),sourceSwipeId:ne(t.sourceSwipeId),tables:Array.isArray(t.tables)?Te(t.tables):[],updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0,meta:t.meta&&typeof t.meta=="object"?Te(t.meta):{}}}function ho(t={},e={}){let s=Bn(t);return{slotBindingKey:s.slotBindingKey,slotRevisionKey:s.slotRevisionKey,sourceMessageId:s.sourceMessageId,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId,tables:Array.isArray(e.tables)?Te(e.tables):[],updatedAt:Number.isFinite(e.updatedAt)?e.updatedAt:Date.now(),meta:e.meta&&typeof e.meta=="object"?Te(e.meta):{}}}function vo(t){return!t||typeof t!="object"?{lastResolvedTarget:null,lastCommittedTarget:null,updatedAt:0}:{lastResolvedTarget:t.lastResolvedTarget?Ms(t.lastResolvedTarget):null,lastCommittedTarget:t.lastCommittedTarget?Ms(t.lastCommittedTarget):null,updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0}}var bo,ks,st,pr,Is=W(()=>{bo="YouYouToolkit_tableState",ks="YouYouToolkit_tableBindings",st=Object.freeze({MANUAL:"MANUAL_TABLE",AUTO:"AUTO_TABLE"}),pr=Object.freeze({EXACT:"exact",BINDING_FALLBACK:"binding_fallback",TEMPLATE:"template",EMPTY:"empty"})});function z(t,e=""){return t==null?e:String(t).trim()||e}function $u(t,e=!1){return t==null?e:t===!0}function Du(t){return Array.isArray(t)?Te(t):[]}function xo(t){if(t==null)return"";if(typeof t=="string")return t;try{return JSON.stringify(t,null,2)}catch{return String(t)}}function Ou(t,e="col"){return z(t,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||e}function Zi(t,e=new Set){let s=Ou(t,"col"),r=s,o=2;for(;e.has(r);)r=`${s}_${o}`,o+=1;return e.add(r),r}function Nu(t=[]){let e=[],s=0;return t.forEach(r=>{let o=r&&typeof r=="object"?r:{},n=o.cells&&typeof o.cells=="object"&&!Array.isArray(o.cells)?o.cells:null,a=Array.isArray(o.cells)?o.cells:Array.isArray(o.values)?o.values:null;n&&Object.keys(n).forEach(i=>{e.includes(i)||e.push(i)}),a&&a.length>s&&(s=a.length)}),e.length>0?e.map(r=>({key:r,title:String(r)})):s>0?Array.from({length:s},(r,o)=>({key:`col_${o+1}`,title:`\u5217${o+1}`})):[]}function Un(t,e=Rs){let s=z(t,e);return Xi.some(r=>r.value===s)?s:e}function Lu(t={},e=0,s=new Set){let r=t&&typeof t=="object"?t:{},o=z(r.title||r.name||r.label,`\u5217${e+1}`),n=z(r.key||r.id,""),a=Zi(n||o||`col_${e+1}`,s),i=[n,z(r.title,""),z(r.name,""),z(r.label,"")].filter(Boolean);return{key:a,title:o,description:z(r.description||r.note,""),type:Un(r.type),required:r.required===!0,sourceKeys:i}}function Bu(t={},e={},s=0){let r=t.cells&&typeof t.cells=="object"&&!Array.isArray(t.cells)?t.cells:null,o=Array.isArray(t.cells)?t.cells:Array.isArray(t.values)?t.values:null;if(r){let n=[...Array.isArray(e.sourceKeys)?e.sourceKeys:[],e.key,e.title].filter(Boolean);for(let a of n)if(r[a]!==void 0)return xo(r[a])}return o&&o[s]!==void 0?xo(o[s]):""}function Ku(t={},e=[],s=0){let r=t&&typeof t=="object"?t:{},o={};return e.forEach((n,a)=>{o[n.key]=Bu(r,n,a)}),{name:z(r.name||r.title||r.label,`\u884C${s+1}`),cells:o}}function el(t={},e=0){let s=t&&typeof t=="object"?t:{},r=new Set,n=(Array.isArray(s.columns)&&s.columns.length>0?s.columns:Nu(Array.isArray(s.rows)?s.rows:[])).map((i,l)=>Lu(i,l,r)),a=Array.isArray(s.rows)?s.rows.map((i,l)=>Ku(i,n,l)):[];return{name:z(s.name||s.title,`\u8868${e+1}`),note:z(s.note||s.description,""),columns:n.map(i=>({key:i.key,title:i.title,description:z(i.description,""),type:Un(i.type),required:i.required===!0})),rows:a}}function tl(t={}){let e=t&&typeof t=="object"?t:{},s=Array.isArray(e.lastErrorDetails)?e.lastErrorDetails.map(o=>z(o,"")).filter(Boolean):[],r=e.lastValidationSummary&&typeof e.lastValidationSummary=="object"?{errorCount:Number.isFinite(e.lastValidationSummary.errorCount)?e.lastValidationSummary.errorCount:0,warningCount:Number.isFinite(e.lastValidationSummary.warningCount)?e.lastValidationSummary.warningCount:0}:{errorCount:0,warningCount:0};return{lastStatus:z(e.lastStatus,Ps.IDLE),lastRunAt:Number.isFinite(e.lastRunAt)?e.lastRunAt:0,lastDurationMs:Number.isFinite(e.lastDurationMs)?e.lastDurationMs:0,lastError:z(e.lastError,""),lastErrorDetails:s,lastValidationSummary:r,successCount:Number.isFinite(e.successCount)?e.successCount:0,errorCount:Number.isFinite(e.errorCount)?e.errorCount:0,lastSourceMessageId:z(e.lastSourceMessageId,""),lastSlotRevisionKey:z(e.lastSlotRevisionKey,""),lastLoadMode:z(e.lastLoadMode,""),lastMirrorApplied:e.lastMirrorApplied===!0}}function Wn(t=1,e=[]){let s=new Set((Array.isArray(e)?e:[]).map(o=>z(o?.key,"")).filter(Boolean));return{key:Zi(`col_${t}`,s),title:`\u5217${t}`,description:"",type:Rs,required:!1}}function zu(t=[],e=1){let s={};return(Array.isArray(t)?t:[]).forEach(r=>{let o=z(r?.key,"");o&&(s[o]="")}),{name:`\u884C${e}`,cells:s}}function sl(t=1){let e=Wn(1);return{name:`\u8868${t}`,note:"",columns:[e],rows:[zu([e],1)]}}function Uu(){return{tables:[]}}function rl(t=[]){return!Array.isArray(t)||t.length===0?Uu():{tables:t.map((e,s)=>el(e,s))}}function Wu(t={}){let e=t&&typeof t=="object"?t:{};return(Array.isArray(e.tables)?e.tables:[]).map((r,o)=>el(r,o))}function ol(t="",e={},s={}){let r=Un(e?.type),o=String(t??"").trim(),n=z(s?.label,`${z(s?.tableName,"\u8868\u683C")} / ${z(s?.rowName,"\u884C")} / ${z(e?.title||e?.key,"\u5355\u5143\u683C")}`),a=[],i=[];if(e?.required===!0&&!o&&a.push(`${n} \u4E3A\u5FC5\u586B\uFF0C\u5F53\u524D\u4E3A\u7A7A\u3002`),!o)return{valid:a.length===0,errors:a,warnings:i};if(r==="number"&&!Number.isFinite(Number(o))&&a.push(`${n} \u9700\u8981\u586B\u5199\u6570\u5B57\u3002`),r==="boolean"&&!["true","false","1","0","yes","no"].includes(o.toLowerCase())&&a.push(`${n} \u9700\u8981\u586B\u5199\u5E03\u5C14\u503C\uFF08true / false\uFF09\u3002`),r==="date"&&Number.isNaN(Date.parse(o))&&a.push(`${n} \u9700\u8981\u586B\u5199\u53EF\u89E3\u6790\u7684\u65E5\u671F\u3002`),r==="json")try{JSON.parse(o)}catch(l){a.push(`${n} \u9700\u8981\u586B\u5199\u5408\u6CD5 JSON\uFF1A${l?.message||"\u89E3\u6790\u5931\u8D25"}`)}return{valid:a.length===0,errors:a,warnings:i}}function ju(t={}){let s=Wu(t&&typeof t=="object"?t:{}),r=[];return s.forEach((o,n)=>{let a=z(o?.name,`\u8868${n+1}`),i=Array.isArray(o?.columns)?o.columns:[],l=Array.isArray(o?.rows)?o.rows:[];a||r.push(`\u8868 ${n+1} \u7F3A\u5C11\u540D\u79F0\u3002`),i.length===0&&r.push(`${a} \u81F3\u5C11\u9700\u8981\u4E00\u5217\u3002`);let c=new Set;i.forEach((d,u)=>{let y=z(d?.key,""),p=z(d?.title,`\u5217${u+1}`);if(!y){r.push(`${a} / ${p} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`);return}if(c.has(y)){r.push(`${a} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${y}`);return}c.add(y)}),l.forEach((d,u)=>{let y=z(d?.name,`\u884C${u+1}`),p=d?.cells&&typeof d.cells=="object"&&!Array.isArray(d.cells)?d.cells:{};i.forEach((f,h)=>{let m=z(f?.key,""),_=z(f?.title||m,`\u5217${h+1}`),M=m?xo(p[m]):"",w=ol(M,f,{label:`${a} / ${y} / ${_}`,tableName:a,rowName:y});r.push(...w.errors)})})}),{valid:r.length===0,errors:r,tables:s}}function Cs({severity:t="error",message:e="",tableIndex:s=-1,tableName:r="",columnIndex:o=-1,columnKey:n="",rowIndex:a=-1,rowName:i="",cellKey:l=""}={}){return{severity:t,message:z(e,t==="warning"?"\u5B58\u5728\u8B66\u544A\u3002":"\u5B58\u5728\u9519\u8BEF\u3002"),tableIndex:s,tableName:z(r,""),columnIndex:o,columnKey:z(n,""),rowIndex:a,rowName:z(i,""),cellKey:z(l,"")}}function gt(t={}){let e=ju(t),s=[];if(!e.valid)return{...e,warnings:[],issues:s,summary:{errorCount:e.errors.length,warningCount:0}};let r=Array.isArray(e.tables)?e.tables:[];r.forEach((a,i)=>{let l=z(a?.name,`\u8868${i+1}`),c=Array.isArray(a?.columns)?a.columns:[],d=Array.isArray(a?.rows)?a.rows:[],u=new Set;l||s.push(Cs({severity:"error",message:`\u8868 ${i+1} \u7F3A\u5C11\u540D\u79F0\u3002`,tableIndex:i,tableName:l})),c.forEach((y,p)=>{let f=z(y?.key,""),h=z(y?.title,`\u5217${p+1}`);f||s.push(Cs({severity:"error",message:`${l} / ${h} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`,tableIndex:i,tableName:l,columnIndex:p,columnKey:f,cellKey:f})),f&&(u.has(f)&&s.push(Cs({severity:"error",message:`${l} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${f}`,tableIndex:i,tableName:l,columnIndex:p,columnKey:f,cellKey:f})),u.add(f))}),d.forEach((y,p)=>{let f=z(y?.name,`\u884C${p+1}`),h=y?.cells&&typeof y.cells=="object"&&!Array.isArray(y.cells)?y.cells:{};Object.keys(h).forEach(_=>{c.some(M=>z(M?.key,"")===_)||s.push(Cs({severity:"warning",message:`${l} / ${f} \u5305\u542B\u672A\u5B9A\u4E49\u5217 ${_}\uFF0C\u4FDD\u5B58\u540E\u4F1A\u88AB\u5FFD\u7565\u3002`,tableIndex:i,tableName:l,rowIndex:p,rowName:f,cellKey:_}))}),c.forEach((_,M)=>{let w=z(_?.key,""),E=z(_?.title||w,`\u5217${M+1}`),k=w?xo(h[w]):"",I=ol(k,_,{label:`${l} / ${f} / ${E}`,tableName:l,rowName:f});I.errors.forEach(N=>{s.push(Cs({severity:"error",message:N,tableIndex:i,tableName:l,columnIndex:M,columnKey:w,rowIndex:p,rowName:f,cellKey:w}))}),I.warnings.forEach(N=>{s.push(Cs({severity:"warning",message:N,tableIndex:i,tableName:l,columnIndex:M,columnKey:w,rowIndex:p,rowName:f,cellKey:w}))})})})});let o=s.filter(a=>a.severity!=="warning").map(a=>a.message),n=s.filter(a=>a.severity==="warning").map(a=>a.message);return{valid:o.length===0,errors:o,warnings:n,issues:s,tables:r,summary:{errorCount:o.length,warningCount:n.length}}}function nl(){return{tables:[],promptTemplate:Ji,apiPreset:"",mirrorToMessage:!1,mirrorTag:"yyt-table-workbench",runtime:tl()}}function je(t={}){let e=nl(),s=t&&typeof t=="object"?t:{};return{tables:Du(s.tables),promptTemplate:z(s.promptTemplate,e.promptTemplate),apiPreset:z(s.apiPreset,""),mirrorToMessage:$u(s.mirrorToMessage,e.mirrorToMessage),mirrorTag:z(s.mirrorTag,e.mirrorTag),runtime:tl({...e.runtime,...s.runtime||{}})}}function jn(t={}){let e=je(t),s=[];return Array.isArray(e.tables)||s.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u662F JSON \u6570\u7EC4\u3002"),e.promptTemplate||s.push("\u586B\u8868 Prompt \u4E0D\u80FD\u4E3A\u7A7A\u3002"),e.mirrorTag||s.push("\u6B63\u6587\u955C\u50CF\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A\u3002"),{valid:s.length===0,errors:s,config:e}}function Fe(){let t=Kn.get(zn,nl());return je(t)}function al(t={}){let e=Fe(),s=je({...e,...t||{},runtime:t?.runtime===void 0?e.runtime:t.runtime}),r=jn(s);return r.valid?(Kn.set(zn,r.config),{success:!0,config:r.config}):{success:!1,error:r.errors.join(`
`),errors:r.errors,config:r.config}}function fr(t={}){let e=Fe(),s=je({...e,runtime:{...e.runtime,...t||{}}});return Kn.set(zn,s),s.runtime}function Fu(t={}){let e=je(t);return`${z(e.promptTemplate,Ji)}

${Ru}`.trim()}function il(t={}){return{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",promptTemplate:Fu(t),bypass:{enabled:!1}}}function ll({apiPresets:t=[]}={}){let e=[{value:"",label:"\u5F53\u524D API \u914D\u7F6E"},...t.map(s=>({value:String(s?.name||""),label:String(s?.name||"")})).filter(s=>s.value)];return[{name:"tables",type:"tableDefinitions",label:"\u8868\u5B9A\u4E49",description:"\u901A\u8FC7\u7ED3\u6784\u5316\u7F16\u8F91\u5668\u7EF4\u62A4 tables\u3002\u9996\u6B21\u6267\u884C\u6216\u5F53\u524D\u6D88\u606F\u5C1A\u65E0\u7ED1\u5B9A state \u65F6\uFF0C\u4F1A\u4EE5\u7F16\u8BD1\u540E\u7684 tables \u4F5C\u4E3A merge base\u3002",emptyValue:[]},{name:"promptTemplate",type:"textarea",label:"\u586B\u8868 Prompt",rows:12,description:"\u53EF\u4F7F\u7528 {{lastUserMessage}}\u3001{{lastAiMessage}}\u3001{{chatHistory}}\u3001{{toolContentMacro}} \u7B49\u53D8\u91CF\u3002\u7CFB\u7EDF\u4F1A\u81EA\u52A8\u8FFD\u52A0 JSON \u8F93\u51FA\u7EA6\u675F\u3002"},{name:"apiPreset",type:"select",label:"API \u9884\u8BBE",description:"\u4E3A\u7A7A\u65F6\u4F7F\u7528\u5F53\u524D\u5168\u5C40 API \u914D\u7F6E\u3002",options:e},{name:"mirrorToMessage",type:"checkbox",label:"\u955C\u50CF\u5199\u56DE\u6B63\u6587",description:"\u628A\u5F53\u524D tables \u7684 JSON \u9884\u89C8\u955C\u50CF\u5230\u76EE\u6807 assistant \u6D88\u606F\u6B63\u6587\u4E2D\u3002"}]}var Kn,zn,Ps,Ji,Ru,Xi,Rs,Qi,mr=W(()=>{De();Is();Kn=C.namespace("tableWorkbench"),zn="config",Ps=Object.freeze({IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"}),Ji=`\u8BF7\u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5F53\u524D\u8868\u683C\u57FA\u5E95\uFF0C\u66F4\u65B0\u7ED3\u6784\u5316 tables \u6570\u636E\u3002

\u8981\u6C42\uFF1A
1. \u53EA\u4F9D\u636E\u5F53\u524D\u5BF9\u8BDD\u5185\u5BB9\u66F4\u65B0\uFF0C\u4E0D\u8981\u81C6\u9020\u672A\u51FA\u73B0\u7684\u4FE1\u606F\u3002
2. \u4FDD\u6301\u539F\u6709\u8868\u7ED3\u6784\uFF1B\u6CA1\u6709\u4F9D\u636E\u65F6\u4FDD\u7559\u539F\u503C\u3002
3. \u5982\u679C\u67D0\u5B57\u6BB5\u9700\u8981\u6E05\u7A7A\uFF0C\u8BF7\u663E\u5F0F\u8F93\u51FA\u7A7A\u5B57\u7B26\u4E32\u3001\u7A7A\u6570\u7EC4\u6216 null\u3002
4. \u4F18\u5148\u53C2\u8003\u5F53\u524D assistant \u56DE\u590D\uFF1A{{lastAiMessage}}
5. \u5F53\u524D\u8868\u683C\u57FA\u5E95 JSON\uFF1A
{{toolContentMacro}}`,Ru=`\u8F93\u51FA\u8981\u6C42\uFF1A
- \u53EA\u8FD4\u56DE JSON
- \u4E0D\u8981\u9644\u52A0\u89E3\u91CA\u3001\u6807\u9898\u6216 Markdown
- JSON \u7ED3\u6784\u5FC5\u987B\u662F\uFF1A
{
  "tables": []
}`,Xi=Object.freeze([{value:"text",label:"\u6587\u672C"},{value:"number",label:"\u6570\u5B57"},{value:"boolean",label:"\u5E03\u5C14"},{value:"date",label:"\u65E5\u671F"},{value:"json",label:"JSON"}]),Rs="text",Qi=Object.freeze(Xi.map(t=>Object.freeze({...t})))});function Mt(t=[],e=-1,s=-1){if(!Array.isArray(t))return[];if(!Number.isInteger(e)||!Number.isInteger(s)||e<0||s<0||e>=t.length||s>=t.length||e===s)return[...t];let r=[...t],[o]=r.splice(e,1);return r.splice(s,0,o),r}function br(t,e={},s={}){let r=Number.isInteger(s.size)?s.size:0,o=Number.isInteger(s.currentIndex)?s.currentIndex:-1,n=o<=0,a=o<0||o>=r-1,i=Object.entries(e).filter(([,l])=>Number.isInteger(l)).map(([l,c])=>`data-${l}="${c}"`).join(" ");return`
    <div class="yyt-table-editor-move-controls">
      <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="move-${t}-up" ${i} ${n?"disabled":""}>
        <i class="fa-solid fa-arrow-up"></i>
      </button>
      <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="move-${t}-down" ${i} ${a?"disabled":""}>
        <i class="fa-solid fa-arrow-down"></i>
      </button>
    </div>
  `}function Hu(t=Rs){return Qi.map(e=>`
    <option value="${x(e.value)}" ${e.value===t?"selected":""}>${x(e.label)}</option>
  `).join("")}function cl(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function yl(t=0,e=0){return!Number.isInteger(t)||t<=0||!Number.isInteger(e)||e<0?0:Math.min(e,t-1)}function Fn(t={}){let e=t&&typeof t=="object"?t:{};return rl(Array.isArray(e.tables)?e.tables:[])}function Yu(t,e){if(t.type==="json"){let s=e===void 0?t.emptyValue:e;if(typeof s=="string")return s;try{return JSON.stringify(s??null,null,2)}catch{return String(s??"")}}return String(e??"")}function qu(t={},e=""){let s=String(t.name||"").trim(),r=`yyt-table-field-${s}`,o=`${r}-value`,n=`${r}-dropdown`,a=Cr(t.options||[]);return Pr({selectedValue:e,options:a,placeholder:a[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{"data-table-custom-select":"true"},nativeAttributes:{class:"yyt-table-select-native",id:o,"data-table-field":s,"data-field-type":"select"},triggerAttributes:{id:r,"data-table-select-trigger":"true","aria-controls":n},dropdownAttributes:{id:n,"data-table-select-dropdown":"true"},optionAttributes:{"data-table-select-option":"true"}})}function Gu(t={},e={},s=0){let r=t&&typeof t=="object"?t.cells:null;if(Array.isArray(r))return String(r[s]??"");if(r&&typeof r=="object"){if(r[e.key]!==void 0)return String(r[e.key]??"");if(r[e.title]!==void 0)return String(r[e.title]??"")}return""}function Vu(t={}){return[Number.isInteger(t?.tableIndex)?t.tableIndex:-1,Number.isInteger(t?.rowIndex)?t.rowIndex:-1,Number.isInteger(t?.columnIndex)?t.columnIndex:-1,String(t?.cellKey||"")].join(":")}function Ju(t={},e=6){let s=Array.isArray(t?.issues)?t.issues:[];if(!s.length)return"";let r=Number(t?.summary?.errorCount)||0,o=Number(t?.summary?.warningCount)||0,n=r>0?`\u53D1\u73B0 ${r} \u4E2A\u9519\u8BEF${o>0?`\uFF0C\u53E6\u6709 ${o} \u4E2A\u63D0\u793A`:""}`:`\u5F53\u524D\u6709 ${o} \u4E2A\u63D0\u793A`,a=s.slice(0,Math.max(1,e)).map(c=>`<li>${x(c?.message||"")}</li>`).join(""),i=s.length>e?`<li>\u8FD8\u6709 ${s.length-e} \u6761\u672A\u5C55\u5F00\uFF0C\u8BF7\u5148\u4FEE\u6B63\u4E0A\u9762\u8FD9\u4E9B\u3002</li>`:"";return`
    <div class="yyt-table-editor-validation-summary${r>0?"":" yyt-warning-only"}" data-table-validation-summary>
      <div class="yyt-table-editor-validation-title">${x(n)}</div>
      <ul class="yyt-table-editor-validation-list">${a}${i}</ul>
    </div>
  `}function is(t,e=null){let s=D();if(!s||!t?.length)return e;t.find("[data-table-validation-summary]").remove(),t.find(".yyt-table-cell-error").removeClass("yyt-table-cell-error"),t.find(".yyt-has-error").removeClass("yyt-has-error");let r=e||gt($s(t)),o=Array.isArray(r?.issues)?r.issues:[],n=new Set(o.filter(l=>l?.severity!=="warning").map(l=>Vu(l))),a=new Set(o.filter(l=>l?.severity!=="warning").map(l=>`${l?.tableIndex??-1}:${l?.columnIndex??-1}`)),i=new Set(o.filter(l=>l?.severity!=="warning").map(l=>`${l?.tableIndex??-1}`));return o.length>0&&t.prepend(Ju(r)),t.find("[data-table-editor-table]").each((l,c)=>{let d=s(c);i.has(`${l}`)&&d.addClass("yyt-has-error"),d.find("[data-table-editor-column]").each((u,y)=>{let p=s(y);a.has(`${l}:${u}`)&&(p.addClass("yyt-has-error"),p.find("[data-table-editor-column-title], [data-table-editor-column-key], [data-table-editor-column-type], [data-table-editor-column-description]").addClass("yyt-table-cell-error"))}),d.find("[data-table-editor-row]").each((u,y)=>{let p=s(y),f=!1;p.find("[data-table-editor-cell]").each((h,m)=>{let _=String(d.find(`[data-table-editor-column="${h}"] [data-table-editor-column-key]`).val()||"").trim(),M=[l,u,h,_].join(":");n.has(M)&&(f=!0,s(m).addClass("yyt-table-cell-error"))}),f&&p.addClass("yyt-has-error")})}),r}function Xu(t={},e={},s=0,r=0){let o=Array.isArray(t.columns)?t.columns:[],n=br("row",{"table-index":s,"row-index":r},{currentIndex:r,size:o.length>=0&&Array.isArray(t.rows)?t.rows.length:0});return`
    <tr data-table-editor-row="${r}">
      <td>
        <input type="text" class="yyt-input" data-table-editor-row-name value="${x(String(e?.name||""))}" placeholder="\u53EF\u7559\u7A7A\uFF0C\u9ED8\u8BA4\u4F1A\u81EA\u52A8\u547D\u540D">
      </td>
      ${o.map((a,i)=>{let l=String(a?.key||"").trim();return`
        <td>
          <textarea class="yyt-textarea yyt-code-textarea-small"
                    data-table-editor-cell
                    data-column-index="${i}"
                    data-column-key="${x(l)}"
                    rows="2"
                    placeholder="${x(a.title||a.key||`\u5217${i+1}`)}">${x(Gu(e,a,i))}</textarea>
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
  `}function dl(t={},e=0,s={}){let r=Array.isArray(t.columns)?t.columns:[],o=Array.isArray(t.rows)?t.rows:[],n=String(t?.name||"").trim(),a=s.showDeleteTable!==!1,i=br("table",{"table-index":e},{currentIndex:e,size:Number.isInteger(s.totalTables)?s.totalTables:0}),l=a?`
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
          <input type="text" class="yyt-input" data-table-editor-table-name value="${x(String(t?.name||""))}" placeholder="\u8868\u683C\u540D\u79F0">
        </div>
        <div class="yyt-table-editor-input-group">
          <textarea class="yyt-textarea yyt-code-textarea-small" data-table-editor-table-note rows="2" placeholder="\u5907\u6CE8\uFF08\u53EF\u7559\u7A7A\uFF09">${x(String(t?.note||""))}</textarea>
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
                    <input type="text" class="yyt-input" data-table-editor-column-title value="${x(String(c?.title||""))}" placeholder="\u4F8B\u5982\uFF1A\u5C5E\u6027">
                  </td>
                  <td>
                    <input type="text" class="yyt-input" data-table-editor-column-key value="${x(String(c?.key||""))}" placeholder="\u53EF\u7559\u7A7A\u81EA\u52A8\u751F\u6210">
                  </td>
                  <td>
                    <select class="yyt-select" data-table-editor-column-type>
                      ${Hu(String(c?.type||Rs))}
                    </select>
                  </td>
                  <td>
                    <label class="yyt-table-editor-column-required yyt-table-editor-column-required-inline">
                      <input type="checkbox" data-table-editor-column-required ${c?.required===!0?"checked":""}>
                      <span>\u5FC5\u586B</span>
                    </label>
                  </td>
                  <td>
                    <input type="text" class="yyt-input" data-table-editor-column-description value="${x(String(c?.description||""))}" placeholder="\u53EF\u4E0D\u586B">
                  </td>
                  <td>
                    <div class="yyt-table-editor-column-actions">
                      ${br("column",{"table-index":e,"column-index":d},{currentIndex:d,size:r.length})}
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
                ${r.map((c,d)=>`<th>${x(c?.title||c?.key||`\u5217${d+1}`)}</th>`).join("")}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${o.length?o.map((c,d)=>Xu(t,c,e,d)).join(""):`
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
  `}function pl(t={},e={}){let s=Fn(t),r=Array.isArray(s?.tables)?s.tables:[],o=e.mode==="focused"?"focused":"full",n=yl(r.length,Number.parseInt(e.currentTableIndex,10));if(o==="focused"){let a=r[n]||null;return`
      <div class="yyt-table-editor-shell">
        ${a?dl(a,n,{totalTables:r.length}):`
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
        ${r.length?r.map((a,i)=>dl(a,i,{totalTables:r.length})).join(""):`
          <div class="yyt-table-editor-empty">\u8FD8\u6CA1\u6709\u8868\uFF0C\u5148\u65B0\u5EFA\u4E00\u5F20\u3002</div>
        `}
      </div>
    </div>
  `}function Qu(t={},e={}){let s=String(t.name||"").trim(),r=x(t.label||s),o=t.description?`<div class="yyt-table-form-field-desc">${x(t.description)}</div>`:"",n=Fn({tables:Array.isArray(e[s])?e[s]:[]});return`
    <div class="yyt-table-form-field" data-table-form-item="${x(s)}">
      <label>${r}</label>
      ${Hn(t,n,{description:o})}
    </div>
  `}function Hn(t={},e={},s={}){let r=String(t.name||"").trim(),o=typeof s.description=="string"?s.description:t.description?`<div class="yyt-table-form-field-desc">${x(t.description)}</div>`:"",n=s.mode==="focused"?"focused":"full",a=Number.parseInt(s.currentTableIndex,10);return`
    <div class="yyt-table-editor" data-table-field="${x(r)}" data-field-type="tableDefinitions" data-table-definition-root data-table-editor-mode="${n}" data-current-table-index="${Number.isInteger(a)?a:0}">
      ${pl(e,{mode:n,currentTableIndex:a})}
    </div>
    ${o}
  `}function gl(t=[],e={},s={}){let r=Array.isArray(t)?t:[],o=Array.isArray(s.includeFieldNames)?new Set(s.includeFieldNames.map(i=>String(i||"").trim()).filter(Boolean)):null,n=Array.isArray(s.excludeFieldNames)?new Set(s.excludeFieldNames.map(i=>String(i||"").trim()).filter(Boolean)):null,a=r.filter(i=>{let l=String(i?.name||"").trim();return!l||o&&!o.has(l)||n&&n.has(l)?!1:i.type!=="tableDefinitions"}).map(i=>Zu(i,e)).join("");return a?`
    <div class="yyt-table-form-grid">
      ${a}
    </div>
  `:""}function Zu(t={},e={}){let s=String(t.name||"").trim();if(!s)return"";if(t.type==="tableDefinitions")return Qu(t,e);let r=e[s],o=x(t.label||s),n=t.description?`<div class="yyt-table-form-field-desc">${x(t.description)}</div>`:"",a=Number.isFinite(t.rows)?t.rows:6;return t.type==="checkbox"?`
      <div class="yyt-table-form-field" data-table-form-item="${x(s)}">
        <label class="yyt-table-form-inline-checkbox">
          <input type="checkbox" data-table-field="${x(s)}" data-field-type="checkbox" ${r===!0?"checked":""}>
          <span>${o}</span>
        </label>
        ${n}
      </div>
    `:t.type==="select"?`
      <div class="yyt-table-form-field" data-table-form-item="${x(s)}">
        <label for="yyt-table-field-${x(s)}">${o}</label>
        ${qu(t,r)}
        ${n}
      </div>
    `:`
    <div class="yyt-table-form-field" data-table-form-item="${x(s)}">
      <label for="yyt-table-field-${x(s)}">${o}</label>
      <textarea class="yyt-textarea yyt-code-textarea ${t.type==="json"?"":"yyt-code-textarea-small"}"
                id="yyt-table-field-${x(s)}"
                data-table-field="${x(s)}"
                data-field-type="${x(t.type||"textarea")}"
                rows="${a}">${x(Yu(t,r))}</textarea>
      ${n}
    </div>
  `}function $s(t){let e=D();return!e||!t?.length?{tables:[]}:{tables:t.find("[data-table-editor-table]").map((r,o)=>{let n=e(o),a=n.find("[data-table-editor-column]").map((l,c)=>{let d=e(c);return{title:String(d.find("[data-table-editor-column-title]").val()||""),key:String(d.find("[data-table-editor-column-key]").val()||""),description:String(d.find("[data-table-editor-column-description]").val()||""),type:String(d.find("[data-table-editor-column-type]").val()||Rs),required:d.find("[data-table-editor-column-required]").is(":checked")}}).get(),i=n.find("[data-table-editor-row]").map((l,c)=>{let d=e(c);return{name:String(d.find("[data-table-editor-row-name]").val()||""),cells:d.find("[data-table-editor-cell]").map((u,y)=>String(e(y).val()||"")).get()}}).get();return{name:String(n.find("[data-table-editor-table-name]").val()||""),note:String(n.find("[data-table-editor-table-note]").val()||""),columns:a,rows:i}}).get()}}function ey(t=[],e=1){return{name:`\u884C${e}`,cells:Array.from({length:Array.isArray(t)?t.length:0},()=>"")}}function rt(t,e={},s={}){let r=String(t.attr("data-table-editor-mode")||"").trim()==="focused"?"focused":"full",o=Number.parseInt(t.attr("data-current-table-index")||"0",10),n=Fn(s),a=yl(Array.isArray(n.tables)?n.tables.length:0,o);t.attr("data-current-table-index",String(a)),t.html(pl(n,{mode:r,currentTableIndex:a}))}function fl(t,e=[],s={}){let r=D();if(!r||!B(t))return;let o=Array.isArray(e)?e:[],n=c=>{let d=String(c.attr("data-table-field")||"").trim();return o.find(u=>String(u?.name||"").trim()===d)||{name:d}},a=()=>{typeof s.onChange=="function"&&s.onChange()},i=(c={})=>{typeof s.onTableMutation=="function"&&s.onTableMutation(c)};t.off(".yytTableForm"),t.on("click.yytTableForm","[data-table-definition-root] [data-table-editor-action]",c=>{c.preventDefault();let d=r(c.currentTarget),u=String(d.attr("data-table-editor-action")||"").trim(),y=d.closest("[data-table-definition-root]");if(!y.length)return;let p=n(y),f=$s(y),h=Array.isArray(f.tables)?f.tables:[],m=Number.parseInt(d.attr("data-table-index")||"",10),_=Number.parseInt(d.attr("data-column-index")||"",10),M=Number.parseInt(d.attr("data-row-index")||"",10);if(u==="add-table"){let w=[...h,sl(h.length+1)];rt(y,p,{tables:w}),i({action:"add-table",tableIndex:w.length-1,draft:{tables:w}}),a();return}if(u==="delete-table"&&Number.isInteger(m)&&m>=0&&m<h.length){h.splice(m,1),rt(y,p,{tables:h}),i({action:"delete-table",tableIndex:m,draft:{tables:h}}),a();return}if(u==="move-table-up"&&Number.isInteger(m)){let w=Mt(h,m,m-1);rt(y,p,{tables:w}),i({action:"move-table-up",tableIndex:m,nextTableIndex:Math.max(0,m-1),draft:{tables:w}}),a();return}if(u==="move-table-down"&&Number.isInteger(m)){let w=Mt(h,m,m+1);rt(y,p,{tables:w}),i({action:"move-table-down",tableIndex:m,nextTableIndex:Math.min(w.length-1,m+1),draft:{tables:w}}),a();return}if(u==="add-column"&&Number.isInteger(m)&&m>=0&&m<h.length){let w=h[m]||{},E=Array.isArray(w.columns)?w.columns:[],k=Wn(E.length+1,E);w.columns=[...E,k],w.rows=(Array.isArray(w.rows)?w.rows:[]).map((I,N)=>({name:String(I?.name||`\u884C${N+1}`),cells:[...Array.isArray(I?.cells)?I.cells:[],""]}))}if(u==="delete-column"&&Number.isInteger(m)&&m>=0&&m<h.length){let w=h[m]||{},E=Array.isArray(w.columns)?w.columns:[];Number.isInteger(_)&&_>=0&&_<E.length&&(w.columns=E.filter((k,I)=>I!==_),w.rows=(Array.isArray(w.rows)?w.rows:[]).map((k,I)=>{let N=Array.isArray(k?.cells)?[...k.cells]:[];return N.splice(_,1),{name:String(k?.name||`\u884C${I+1}`),cells:N}}))}if(u==="move-column-up"&&Number.isInteger(m)&&Number.isInteger(_)&&m>=0&&m<h.length){let w=h[m]||{},E=Array.isArray(w.columns)?w.columns:[];w.columns=Mt(E,_,_-1),w.rows=(Array.isArray(w.rows)?w.rows:[]).map((k,I)=>({name:String(k?.name||`\u884C${I+1}`),cells:Mt(Array.isArray(k?.cells)?k.cells:[],_,_-1)})),rt(y,p,{tables:h}),a();return}if(u==="move-column-down"&&Number.isInteger(m)&&Number.isInteger(_)&&m>=0&&m<h.length){let w=h[m]||{},E=Array.isArray(w.columns)?w.columns:[];w.columns=Mt(E,_,_+1),w.rows=(Array.isArray(w.rows)?w.rows:[]).map((k,I)=>({name:String(k?.name||`\u884C${I+1}`),cells:Mt(Array.isArray(k?.cells)?k.cells:[],_,_+1)})),rt(y,p,{tables:h}),a();return}if(u==="add-row"&&Number.isInteger(m)&&m>=0&&m<h.length){let w=h[m]||{},E=Array.isArray(w.columns)?w.columns:[],k=Array.isArray(w.rows)?w.rows:[];w.rows=[...k,ey(E,k.length+1)]}if(u==="delete-row"&&Number.isInteger(m)&&m>=0&&m<h.length){let w=h[m]||{},E=Array.isArray(w.rows)?w.rows:[];Number.isInteger(M)&&M>=0&&M<E.length&&(w.rows=E.filter((k,I)=>I!==M))}if(u==="move-row-up"&&Number.isInteger(m)&&Number.isInteger(M)&&m>=0&&m<h.length){let w=h[m]||{};w.rows=Mt(Array.isArray(w.rows)?w.rows:[],M,M-1),rt(y,p,{tables:h}),a();return}if(u==="move-row-down"&&Number.isInteger(m)&&Number.isInteger(M)&&m>=0&&m<h.length){let w=h[m]||{};w.rows=Mt(Array.isArray(w.rows)?w.rows:[],M,M+1),rt(y,p,{tables:h}),a();return}rt(y,p,{tables:h}),is(y),a()}),t.on("input.yytTableForm","[data-table-definition-root] input, [data-table-definition-root] textarea",c=>{let d=r(c.currentTarget).closest("[data-table-definition-root]");d.length&&is(d),a()}),t.on("click.yytTableForm","[data-table-select-trigger]",c=>{c.preventDefault(),c.stopPropagation();let d=r(c.currentTarget),u=d.closest("[data-table-custom-select]"),y=u.hasClass("yyt-open");t.find("[data-table-custom-select].yyt-open").not(u).removeClass("yyt-open").find("[data-table-select-trigger]").attr("aria-expanded","false"),u.toggleClass("yyt-open",!y),d.attr("aria-expanded",String(!y))}),t.on("click.yytTableForm","[data-table-select-option]",c=>{c.preventDefault(),c.stopPropagation();let d=r(c.currentTarget),u=d.closest("[data-table-custom-select]"),y=String(d.attr("data-value")||""),p=d.find(".yyt-option-text").text();u.find(".yyt-table-select-native").val(y).trigger("change"),u.find(".yyt-select-value").text(p).attr("data-value",y).data("value",y),u.find("[data-table-select-option]").removeClass("yyt-selected").attr("aria-selected","false"),d.addClass("yyt-selected").attr("aria-selected","true"),u.removeClass("yyt-open"),u.find("[data-table-select-trigger]").attr("aria-expanded","false"),a()}),t.on("change.yytTableForm",'[data-table-field][data-field-type="select"]',()=>{a()}),t.on("blur.yytTableForm","[data-table-definition-root] [data-table-editor-cell], [data-table-definition-root] [data-table-editor-column-key], [data-table-definition-root] [data-table-editor-column-title], [data-table-definition-root] [data-table-editor-column-type], [data-table-definition-root] [data-table-editor-column-required]",c=>{let d=r(c.currentTarget).closest("[data-table-definition-root]");d.length&&is(d)}),t.on("change.yytTableForm","[data-table-definition-root] [data-table-editor-column-key], [data-table-definition-root] [data-table-editor-column-title]",c=>{let d=r(c.currentTarget).closest("[data-table-definition-root]");if(!d.length)return;let u=n(d);rt(d,u,$s(d)),a()});let l=zt();r(l).off("click.yytTableFormSelect").on("click.yytTableFormSelect",c=>{r(c.target).closest(t).length||t.find("[data-table-custom-select].yyt-open").removeClass("yyt-open").find("[data-table-select-trigger]").attr("aria-expanded","false")})}function ml(t){let e=D();!e||!B(t)||(t.off(".yytTableForm"),e(zt()).off("click.yytTableFormSelect"))}function Yn(t,e=[]){let s=Array.isArray(e)?e:[],r={},o=[];return s.forEach(n=>{let a=String(n?.name||"").trim();if(!a)return;let i=t.find(`[data-table-field="${a}"]`);if(!i.length)return;if(n.type==="tableDefinitions"){let c=gt($s(i));if(is(i,c),!c.valid){c.errors.forEach(d=>{o.push(`${n.label||a}\uFF1A${d}`)});return}r[a]=cl(c.tables);return}if(n.type==="checkbox"){r[a]=i.is(":checked");return}let l=String(i.val()||"");if(n.type==="json"){let c=l.trim();if(!c){r[a]=cl(n.emptyValue);return}try{r[a]=JSON.parse(c)}catch(d){o.push(`${n.label||a} \u4E0D\u662F\u5408\u6CD5 JSON\uFF1A${d?.message||String(d)}`)}return}r[a]=l}),{values:r,errors:o}}var ul,bl=W(()=>{Se();mr();ul=`
  .yyt-dialog.yyt-table-editor-dialog {
    border-radius: 24px;
    border-color: rgba(123, 183, 255, 0.18);
    background:
      radial-gradient(520px 220px at 0% 0%, rgba(123, 183, 255, 0.12), transparent 62%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 28%),
      var(--yyt-bg-base);
    box-shadow: 0 30px 84px rgba(0, 0, 0, 0.6), 0 0 48px rgba(123, 183, 255, 0.08);
  }

  .yyt-dialog.yyt-table-editor-dialog .yyt-dialog-header {
    padding: 18px 22px;
    border-bottom-color: rgba(255, 255, 255, 0.08);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.018) 100%);
  }

  .yyt-dialog.yyt-table-editor-dialog .yyt-dialog-title {
    font-size: 16px;
    font-weight: 800;
  }

  .yyt-dialog.yyt-table-editor-dialog .yyt-dialog-body.yyt-table-editor-dialog-body {
    padding: 20px;
    background: rgba(255, 255, 255, 0.01);
  }

  .yyt-dialog.yyt-table-editor-dialog .yyt-dialog-footer.yyt-table-editor-dialog-footer {
    justify-content: space-between;
    border-top-color: rgba(255, 255, 255, 0.08);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.014) 100%);
  }

  .yyt-table-editor-dialog-note {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.62);
    line-height: 1.65;
  }

  .yyt-table-form-grid {
    display: grid;
    gap: 14px;
  }

  .yyt-table-form-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .yyt-table-form-field label {
    font-size: 13px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-form-field-desc {
    font-size: 12px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.72);
  }

  .yyt-table-form-field textarea.yyt-textarea,
  .yyt-table-form-field .yyt-input,
  .yyt-table-form-field .yyt-select,
  .yyt-table-form-field .yyt-custom-select {
    width: 100%;
  }

  .yyt-table-form-field button.yyt-select-trigger {
    width: 100%;
    text-align: left;
    font: inherit;
    appearance: none;
    -webkit-appearance: none;
  }

  .yyt-table-form-field button.yyt-select-option {
    width: 100%;
    border: 1px solid transparent;
    background: linear-gradient(180deg, #1c2737 0%, #151e2c 100%);
    color: inherit;
    text-align: left;
    font: inherit;
    appearance: none;
    -webkit-appearance: none;
  }

  .yyt-table-form-field button.yyt-select-option:hover {
    background: linear-gradient(180deg, #243247 0%, #1a2638 100%);
    border-color: rgba(123, 183, 255, 0.22);
    transform: translateY(-1px);
  }

  .yyt-table-form-field button.yyt-select-option.yyt-selected {
    background: linear-gradient(135deg, rgba(123, 183, 255, 0.28) 0%, rgba(72, 119, 190, 0.22) 100%);
    border-color: rgba(123, 183, 255, 0.4);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  .yyt-table-form-field .yyt-select-dropdown {
    z-index: 24;
  }

  .yyt-table-form-inline-checkbox {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    color: var(--yyt-text);
    font-weight: 700;
  }

  .yyt-table-form-inline-checkbox input {
    width: 18px;
    height: 18px;
    margin: 0;
    accent-color: var(--yyt-accent);
  }

  .yyt-table-editor {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .yyt-table-editor-shell {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .yyt-table-editor-shell-compact {
    gap: 12px;
  }


  .yyt-table-editor-toolbar,
  .yyt-table-editor-section-head,
  .yyt-table-editor-card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }

  .yyt-table-editor-toolbar {
    padding: 0;
  }

  .yyt-table-editor-card-actions,
  .yyt-table-editor-row-actions,
  .yyt-table-editor-column-actions,
  .yyt-table-editor-move-controls {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .yyt-table-editor-muted {
    font-size: 12px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.68);
  }

  .yyt-table-editor-stack {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .yyt-table-editor-empty {
    padding: 10px 12px;
    border-radius: 14px;
    border: 1px dashed rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
    color: rgba(255, 255, 255, 0.64);
    font-size: 12px;
    line-height: 1.6;
  }

  .yyt-table-editor-validation-summary {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px 14px;
    border-radius: 16px;
    border: 1px solid rgba(255, 100, 100, 0.28);
    background: rgba(255, 100, 100, 0.08);
  }

  .yyt-table-editor-validation-summary.yyt-warning-only {
    border-color: rgba(255, 196, 87, 0.28);
    background: rgba(255, 196, 87, 0.08);
  }

  .yyt-table-editor-validation-title {
    font-size: 12px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-editor-validation-list {
    margin: 0;
    padding-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: rgba(255, 255, 255, 0.84);
    font-size: 12px;
    line-height: 1.6;
  }

  .yyt-table-editor-card.yyt-has-error,
  .yyt-table-editor-grid tr.yyt-has-error {
    border-color: rgba(255, 100, 100, 0.26);
  }

  .yyt-table-editor-grid tr.yyt-has-error td,
  .yyt-table-editor-grid tr.yyt-has-error th {
    background: rgba(255, 100, 100, 0.04);
  }

  .yyt-table-editor-grid textarea.yyt-table-cell-error,
  .yyt-table-editor-grid input.yyt-table-cell-error,
  .yyt-table-editor-grid select.yyt-table-cell-error,
  .yyt-table-editor-meta input.yyt-table-cell-error,
  .yyt-table-editor-meta textarea.yyt-table-cell-error {
    border-color: rgba(255, 100, 100, 0.55);
    box-shadow: 0 0 0 1px rgba(255, 100, 100, 0.14);
    background: rgba(255, 100, 100, 0.08);
  }

  .yyt-table-editor-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .yyt-table-editor-card-subtitle {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
  }

  .yyt-table-editor-meta {
    display: grid;
    grid-template-columns: minmax(220px, 1fr) minmax(0, 1fr);
    gap: 10px;
  }

  .yyt-table-editor-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .yyt-table-editor-section-title {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 0.82);
  }

  .yyt-table-editor-section-desc {
    font-size: 11px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.56);
  }

  .yyt-table-editor-columns {
    display: grid;
    gap: 10px;
  }

  .yyt-table-editor-column {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(140px, 0.75fr) auto;
    gap: 10px;
    align-items: end;
    padding: 12px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.05);
  }

  .yyt-table-editor-input-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }

  .yyt-table-editor-grid-wrap {
    overflow-x: auto;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(8, 12, 18, 0.58);
  }

  .yyt-table-editor-grid {
    width: 100%;
    min-width: 680px;
    border-collapse: collapse;
    background: rgba(8, 12, 18, 0.84);
  }

  .yyt-table-editor-grid th,
  .yyt-table-editor-grid td {
    padding: 6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    vertical-align: top;
  }

  .yyt-table-editor-grid th {
    text-align: left;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.78);
    background: rgba(255, 255, 255, 0.05);
  }

  .yyt-table-editor-grid td:last-child,
  .yyt-table-editor-grid th:last-child {
    border-right: none;
    width: 60px;
  }

  .yyt-table-editor-grid tr:last-child td {
    border-bottom: none;
  }

  .yyt-table-editor-grid textarea,
  .yyt-table-editor-grid input,
  .yyt-table-editor-column input,
  .yyt-table-editor-meta input,
  .yyt-table-editor-meta textarea {
    width: 100%;
  }

  .yyt-table-editor-grid textarea {
    min-height: 54px;
    resize: vertical;
  }

  @media (max-width: 900px) {
    .yyt-table-editor-meta {
      grid-template-columns: 1fr;
    }

    .yyt-table-editor-column {
      grid-template-columns: 1fr;
    }
  }
`});function ty(t={},e=-1){return[t?.sourceId,t?.messageId,t?.message_id,t?.id,t?.mid,t?.mesid,t?.mes_id,t?.chat_index,t?.index,e].map(s=>X(s))}function sy(t=[],e=""){let s=X(e);if(!s||!Array.isArray(t))return-1;for(let r=t.length-1;r>=0;r-=1){let o=t[r];if(ty(o,r).includes(s))return r}return-1}function wo(t={},e={}){let s=X(t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId);if(!s)return null;let r=Bn({resolvedAt:Date.now(),runSource:e.runSource||t?.runSource||st.MANUAL,traceId:t?.traceId||"",chatId:t?.chatId||"",sourceMessageId:s,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId||"swipe:current",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",assistantContentFingerprint:t?.assistantContentFingerprint||"",assistantBaseFingerprint:t?.assistantBaseFingerprint||"",assistantText:t?.lastAiMessage||"",assistantBaseText:t?.assistantBaseText||"",targetMessageIndex:sy(t?.chatMessages||t?.chatHistory||[],s)});return!r.slotBindingKey||!r.slotRevisionKey?null:r}async function qn({runSource:t=st.MANUAL}={}){let e=await Vt({runSource:t});return wo(e,{runSource:t})}async function ry({messageId:t,swipeId:e="",runSource:s=st.AUTO}={}){let r=await rr({messageId:t,swipeId:e,runSource:s});return wo(r,{runSource:s})}async function hl(t=null,e={}){let s=t||null;if(typeof e.resolveTarget=="function")return await e.resolveTarget(s);let r=X(e.runSource||s?.runSource)||st.MANUAL,o=X(e.messageId||s?.sourceMessageId),n=X(e.swipeId||s?.sourceSwipeId||s?.effectiveSwipeId);return e.useMessageTarget===!0||r===st.AUTO?o?ry({messageId:o,swipeId:n,runSource:r}):null:qn({runSource:r})}function vl(t,e){let s=t||null,r=e||null;return!s||!r?{valid:!1,reason:"missing_target_snapshot"}:X(s.sourceMessageId)!==X(r.sourceMessageId)?{valid:!1,reason:"source_message_changed"}:X(s.sourceSwipeId||s.effectiveSwipeId)!==X(r.sourceSwipeId||r.effectiveSwipeId)?{valid:!1,reason:"source_swipe_changed"}:X(s.slotRevisionKey)!==X(r.slotRevisionKey)?{valid:!1,reason:"slot_revision_changed"}:{valid:!0,reason:"ok"}}var So=W(()=>{vs();Is()});function ot(t){return t==null?"":String(t).trim()}function oy(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function ny(){try{let t=oy(),e=t?.SillyTavern||null,s=e?.getContext?.()||null,r=Array.isArray(s?.chat)?s.chat:[],o=Array.isArray(e?.chat)?e.chat:[],n=r.length?r:o;return{topWindow:t,api:e,context:s,chat:n,contextChat:r,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}function ay(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function iy(t=[],e=""){let s=ot(e);if(!Array.isArray(t)||!s)return-1;for(let r=t.length-1;r>=0;r-=1){let o=t[r];if(!ay(o))continue;if([o?.sourceId,o?.message_id,o?.messageId,o?.id,o?.mes_id,o?.mid,o?.mesid,o?.chat_index,o?.index,r].map(a=>ot(a)).includes(s))return r}return-1}function Gn(t){let e=ny(),s=iy(e.chat,t?.sourceMessageId);return s<0?{runtime:e,messageIndex:s,message:null}:{runtime:e,messageIndex:s,message:e.chat[s]||null}}function xl(t,e,s){let r=o=>{!Array.isArray(o)||e<0||e>=o.length||(o[e]={...o[e]||{},...s})};r(t?.contextChat),r(t?.apiChat)}async function wl(t){let e=t?.context||null,s=t?.api||null,r=e?.saveChatDebounced||s?.saveChatDebounced||null,o=e?.saveChat||s?.saveChat||null;typeof r=="function"&&r.call(e||s),typeof o=="function"&&await o.call(e||s)}function ly(t){let{message:e}=Gn(t);return gr(e?.[bo])}function To(t,e={}){let s=ly(t);return s&&ot(s.slotRevisionKey)===ot(t?.slotRevisionKey)?{loadMode:pr.EXACT,mergeBaseOnly:!1,state:s}:s&&ot(s.slotBindingKey)===ot(t?.slotBindingKey)?{loadMode:pr.BINDING_FALLBACK,mergeBaseOnly:!0,state:gr({...s,slotRevisionKey:ot(t?.slotRevisionKey)||s.slotRevisionKey,sourceSwipeId:ot(t?.sourceSwipeId||t?.effectiveSwipeId)||s.sourceSwipeId,meta:{...s.meta||{},mergeBaseOnly:!0,fallbackFromBinding:!0,fallbackFromRevisionKey:ot(s.slotRevisionKey),requestedRevisionKey:ot(t?.slotRevisionKey)}})}:Array.isArray(e.templateTables)?{loadMode:pr.TEMPLATE,mergeBaseOnly:!1,state:ho(t,{tables:Te(e.templateTables),meta:{fromTemplate:!0}})}:{loadMode:pr.EMPTY,mergeBaseOnly:!1,state:ho(t)}}async function Sl(t){let{runtime:e,messageIndex:s,message:r}=Gn(t);if(!r||s<0)return{success:!1,error:"target_message_not_found"};let o={...vo(r[ks]),lastResolvedTarget:Ms(t),updatedAt:Date.now()};return r[ks]=o,xl(e,s,r),await wl(e),{success:!0,bindings:o}}async function Tl(t,e,s={}){let r=s.skipFreshValidation===!0?t:await hl(t,s),o=s.skipFreshValidation===!0?{valid:!0,reason:"skipped"}:vl(t,r);if(!o.valid)return{success:!1,error:"target_changed_before_commit",validation:o};let n=r||t,{runtime:a,messageIndex:i,message:l}=Gn(n);if(!l||i<0)return{success:!1,error:"target_message_not_found",validation:o};let c=gr({...ho(n),...e,slotBindingKey:n.slotBindingKey,slotRevisionKey:n.slotRevisionKey,sourceMessageId:n.sourceMessageId,sourceSwipeId:n.sourceSwipeId||n.effectiveSwipeId,updatedAt:Date.now()}),d={...vo(l[ks]),lastResolvedTarget:Ms(n),lastCommittedTarget:Ms(n),updatedAt:Date.now()};return l[bo]=c,l[ks]=d,xl(a,i,l),await wl(a),{success:!0,state:c,bindings:d,validation:o,messageIndex:i,sourceMessageId:n.sourceMessageId,slotRevisionKey:n.slotRevisionKey}}function _o(t=null){let e=Pe.getAssistantMessageSnapshot(t);return e?.message?{...e,tableState:gr(e.message[bo]),tableBindings:vo(e.message[ks])}:null}var Ao=W(()=>{Jt();Is();So()});function Vn(t,e=""){return t==null?e:String(t).trim()||e}function dy(t={}){return{tables:Array.isArray(t?.tables)?Te(t.tables):[]}}function uy(t={},e={}){let s=Vn(e.mirrorTag,"yyt-table-workbench"),r=dy(t);return[`<${s}>`,"[\u586B\u8868\u5DE5\u4F5C\u53F0]","```json",JSON.stringify(r,null,2),"```",`</${s}>`].join(`
`)}async function _l({targetSnapshot:t,nextTables:e,config:s,loadResult:r=null}={}){let o=je(s),n=await Tl(t,{tables:Array.isArray(e)?Te(e):[],meta:{lastLoadMode:Vn(r?.loadMode,""),mergeBaseOnly:!1,updatedBy:Vn(t?.runSource,"MANUAL_TABLE")}});if(!n?.success)return{success:!1,error:n?.error||"table_state_commit_failed",commitResult:n,mirrorResult:null,warning:""};let a=null,i="";if(o.mirrorToMessage){let l=uy(n.state,{mirrorTag:o.mirrorTag});a=await Pe.injectDetailed(cy,l,{overwrite:!0,extractionSelectors:[o.mirrorTag],sourceMessageId:n.sourceMessageId,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId,effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId,slotBindingKey:t?.slotBindingKey,slotRevisionKey:t?.slotRevisionKey,slotTransactionId:t?.slotTransactionId,traceId:t?.traceId}),a?.success||(i=a?.error||"\u6B63\u6587\u955C\u50CF\u5199\u56DE\u5931\u8D25")}return{success:!0,state:n.state,bindings:n.bindings,commitResult:n,mirrorResult:a,warning:i}}var cy,Al=W(()=>{Jt();Is();Ao();mr();cy="tableWorkbenchMirror"});function He(t,e=""){return t==null?e:String(t).trim()||e}function El(t=[],e=8){return!Array.isArray(t)||t.length===0?"":t.slice(Math.max(t.length-e,0)).map(s=>`[${He(s?.role,"unknown")}] ${String(s?.content||"").trim()}`).filter(Boolean).join(`

`)}function yy(t,e){return{target:{sourceMessageId:He(t?.sourceMessageId),sourceSwipeId:He(t?.sourceSwipeId||t?.effectiveSwipeId),slotBindingKey:He(t?.slotBindingKey),slotRevisionKey:He(t?.slotRevisionKey),slotTransactionId:He(t?.slotTransactionId)},loadMode:He(e?.loadMode),mergeBaseOnly:e?.mergeBaseOnly===!0,tables:Array.isArray(e?.state?.tables)?Te(e.state.tables):[]}}function py(t=""){let e=String(t||"").trim();if(!e)return[];let s=[],r=c=>{let d=String(c||"").trim();d&&(s.includes(d)||s.push(d))};(e.match(/```(?:json)?\s*([\s\S]*?)```/gi)||[]).forEach(c=>{let d=c.replace(/^```(?:json)?\s*/i,"").replace(/```$/i,"").trim();r(d)}),r(e);let n=e.indexOf("{"),a=e.lastIndexOf("}");n>=0&&a>n&&r(e.slice(n,a+1));let i=e.indexOf("["),l=e.lastIndexOf("]");return i>=0&&l>i&&r(e.slice(i,l+1)),s}function gy(t){if(Array.isArray(t))return t;if(t&&typeof t=="object"){if(Array.isArray(t.tables))return t.tables;if(t.data&&typeof t.data=="object"&&Array.isArray(t.data.tables))return t.data.tables}return null}function fy(t=""){let e=py(t),s=[];for(let r of e)try{let o=JSON.parse(r),n=gy(o);if(!Array.isArray(n)){s.push("JSON \u4E2D\u7F3A\u5C11 tables \u6570\u7EC4\u3002");continue}return{tables:Te(n),parsed:o}}catch(o){s.push(o?.message||String(o))}throw new Error(s[0]||"\u65E0\u6CD5\u4ECE\u6A21\u578B\u54CD\u5E94\u4E2D\u89E3\u6790 tables JSON\u3002")}async function my({executionContext:t,targetSnapshot:e,loadResult:s,config:r,assistantSnapshot:o}={}){let n=je(r),a=il(n),i=yy(e,s),l=Array.isArray(o?.tableState?.tables)?Te(o.tableState.tables):[],c={...t,toolName:"\u586B\u8868\u5DE5\u4F5C\u53F0",toolId:"tableWorkbench",lastAiMessage:t?.assistantBaseText||t?.lastAiMessage||"",recentMessagesText:El(t?.chatHistory||t?.chatMessages||[]),rawRecentMessagesText:El(t?.chatHistory||t?.chatMessages||[],20),injectedContext:o?.injectedContext||Pe.getLatestMessageInjectedContext(e?.sourceMessageId),toolContentMacro:JSON.stringify(i,null,2),extractedContent:JSON.stringify(i,null,2),previousToolOutput:JSON.stringify(l,null,2)},d=await Xt.buildToolMessages(a,c),u=await Xt.buildPromptText(a,c);if(!Array.isArray(d)||d.length===0)throw new Error("\u586B\u8868\u8BF7\u6C42\u6D88\u606F\u6784\u5EFA\u5931\u8D25\u3002");return{toolConfig:a,context:c,requestPayload:i,promptText:u,messages:d}}async function by(t,e={},s=null){let r=je(e),o=He(r.apiPreset,"");if(o){if(!zs(o))throw new Error(`API \u9884\u8BBE\u4E0D\u5B58\u5728: ${o}`);return Bo(o,t,{},s)}return Us(t,{},s)}async function Ml(t=null){let e=je(t||Fe()),s=jn(e),r=gt({tables:Array.isArray(e.tables)?e.tables:[]});if(!s.valid||!r.valid){let a=[...s.errors,...r.errors];return fr({lastStatus:Ps.ERROR,lastRunAt:Date.now(),lastDurationMs:0,lastError:a[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002",lastErrorDetails:a,lastValidationSummary:r.summary||{errorCount:a.length,warningCount:0},errorCount:Number(e?.runtime?.errorCount)||0}),{success:!1,error:a.join(`
`),errors:a}}let o=e.runtime||{},n=Date.now();fr({lastStatus:Ps.RUNNING,lastError:"",lastErrorDetails:[],lastValidationSummary:r.summary||{errorCount:0,warningCount:0}});try{let a=await Vt({runSource:st.MANUAL}),i=wo(a,{runSource:st.MANUAL});if(!i)throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u697C\u5C42\u3002");let l=await Sl(i);if(!l?.success)throw new Error(l?.error||"\u76EE\u6807\u89E3\u6790\u8BB0\u5F55\u5931\u8D25");let c=_o(i.sourceMessageId),d=To(i,{templateTables:e.tables}),u=await my({executionContext:a,targetSnapshot:i,loadResult:d,config:e,assistantSnapshot:c}),y=await by(u.messages,e),p=fy(y),f=await _l({targetSnapshot:i,nextTables:p.tables,config:e,loadResult:d});if(!f?.success)throw new Error(f?.error||"\u7ED3\u6784\u5316\u5199\u56DE\u5931\u8D25");let h=Date.now()-n;return fr({lastStatus:Ps.SUCCESS,lastRunAt:Date.now(),lastDurationMs:h,lastError:"",lastErrorDetails:[],lastValidationSummary:r.summary||{errorCount:0,warningCount:0},successCount:(Number(o.successCount)||0)+1,errorCount:Number(o.errorCount)||0,lastSourceMessageId:He(i.sourceMessageId),lastSlotRevisionKey:He(i.slotRevisionKey),lastLoadMode:He(d.loadMode),lastMirrorApplied:f?.mirrorResult?.success===!0}),{success:!0,targetSnapshot:i,loadResult:d,request:u,responseText:y,parsed:p,state:f.state,bindings:f.bindings,mirrorResult:f.mirrorResult,warning:f.warning||""}}catch(a){let i=Date.now()-n;return fr({lastStatus:Ps.ERROR,lastRunAt:Date.now(),lastDurationMs:i,lastError:a?.message||String(a),lastErrorDetails:[a?.message||String(a)],lastValidationSummary:r.summary||{errorCount:0,warningCount:0},successCount:Number(o.successCount)||0,errorCount:(Number(o.errorCount)||0)+1}),{success:!1,error:a?.message||String(a),errors:[a?.message||String(a)]}}}var kl=W(()=>{vs();Jt();Ws();io();Is();So();Ao();mr();Al()});function hr(){return ll({apiPresets:xt()})}function Eo(t,e=""){return typeof t=="string"&&t.trim()?t.trim():e}function Pl(t){return Number.isFinite(t)&&t>0?new Date(t).toLocaleString():"\u672A\u8BB0\u5F55"}function Mo(t){try{return JSON.stringify(t,null,2)}catch{return String(t??"")}}function Ye(t=[],e=0){let s=Array.isArray(t)?t.length:0;return s<=0||!Number.isInteger(e)||e<0?0:Math.min(e,s-1)}function vy(t=[],e=-1,s=-1){if(!Array.isArray(t))return[];if(!Number.isInteger(e)||!Number.isInteger(s)||e<0||s<0||e>=t.length||s>=t.length||e===s)return[...t];let r=[...t],[o]=r.splice(e,1);return r.splice(s,0,o),r}function xy(t=[]){return(Array.isArray(t)?t:[]).find(e=>e?.type==="tableDefinitions")||{name:"tables",label:"\u8868\u5B9A\u4E49",description:""}}function Jn(t,e={}){let s=D(),r=e&&typeof e=="object"?e:Fe();if(!s||!B(t))return r;let o={...r,runtime:r.runtime||{}},n=t.find("[data-table-definition-root]");if(n.length){let c=$s(n);o.tables=Array.isArray(c?.tables)?c.tables:[]}let a=t.find('[data-table-field="promptTemplate"]');a.length&&(o.promptTemplate=String(a.val()||""));let i=t.find('[data-table-field="apiPreset"]');i.length&&(o.apiPreset=String(i.val()||""));let l=t.find('[data-table-field="mirrorToMessage"]');return l.length&&(o.mirrorToMessage=l.is(":checked")),o}function Rl(t={}){let e=Number(t?.summary?.errorCount)||0,s=Number(t?.summary?.warningCount)||0,r=Array.isArray(t?.issues)?t.issues:[],o=e>0?`\u5F53\u524D\u8868\u683C\u6709 ${e} \u4E2A\u9519\u8BEF${s>0?`\uFF0C\u53E6\u6709 ${s} \u4E2A\u63D0\u793A`:""}`:s>0?`\u5F53\u524D\u8868\u683C\u6709 ${s} \u4E2A\u63D0\u793A`:"\u5F53\u524D\u6570\u636E\u8D28\u91CF\u6B63\u5E38",n=r.slice(0,5).map(l=>`<li>${x(l?.message||"")}</li>`).join(""),a=r.length>5?`<li>\u8FD8\u6709 ${r.length-5} \u6761\uFF0C\u8BF7\u5148\u4FEE\u6B63\u4E0A\u9762\u8FD9\u4E9B\u3002</li>`:"";return`
    <div class="yyt-table-workbench-validation-card${e>0?" yyt-has-error":""}">
      <div class="yyt-table-workbench-panel-title">${x(o)}</div>
      ${r.length?`<ul class="yyt-table-workbench-validation-list">${n}${a}</ul>`:'<div class="yyt-table-workbench-muted">\u6CA1\u6709\u53D1\u73B0\u660E\u663E\u95EE\u9898\u3002</div>'}
    </div>
  `}function Xn(t){if(!D()||!B(t))return;let s=hr(),{values:r,errors:o}=Yn(t,s),n=t.find("[data-table-workbench-compiled-preview]");if(n.length){if(o.length>0){n.text(o.join(`
`));return}n.text(Mo(r.tables||[]))}}function wy(){return`
    <div class="yyt-table-workbench-header">
      <div class="yyt-table-workbench-header-actions">
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-table-workbench-action="save">
          <i class="fa-solid fa-save"></i> \u4FDD\u5B58
        </button>
        <button class="yyt-btn yyt-btn-primary yyt-btn-small" data-table-workbench-action="run">
          <i class="fa-solid fa-play"></i> \u7ACB\u5373\u586B\u8868
        </button>
      </div>
    </div>
  `}function Sy(t=[],e=0){let s=Ye(t,e);return`
    <div>
      <div class="yyt-table-workbench-sidebar-head">
        <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-workbench-action="add-table">
          <i class="fa-solid fa-plus"></i> \u65B0\u589E\u8868\u683C
        </button>
      </div>
      <div class="yyt-table-workbench-sidebar-list">
        ${t.length?t.map((r,o)=>{let n=Array.isArray(r?.columns)?r.columns.length:0,a=Array.isArray(r?.rows)?r.rows.length:0,i=String(r?.name||"").trim()||`\u8868\u683C ${o+1}`,l=String(r?.note||"").trim(),c=o===s;return`
            <div class="yyt-table-workbench-table-item ${c?"active":""}" data-table-workbench-select-table="${o}" role="button" tabindex="0" aria-pressed="${c?"true":"false"}">
              <div class="yyt-table-workbench-table-item-head">
                <div class="yyt-table-workbench-table-name">${x(i)}</div>
                ${br("table",{"table-index":o},{currentIndex:o,size:t.length})}
              </div>
            </div>
          `}).join(""):`
          <div class="yyt-table-workbench-empty-state">\u8FD8\u6CA1\u6709\u8868\uFF0C\u5148\u65B0\u5EFA\u4E00\u5F20\u3002</div>
        `}
      </div>
    </div>
  `}function Ty(t={},e=[],s=0){let r=xy(e),o={tables:Array.isArray(t?.tables)?t.tables:[]},n=gt(o),a=Array.isArray(n?.tables)?n.tables:[],i=Ye(a,s),l=a[i]||null,c=Eo(l?.name,a.length?`\u8868\u683C ${i+1}`:"\u672A\u9009\u62E9");return Hn(r,o,{mode:"focused",currentTableIndex:i,description:""})}function _y(t={}){let e=t.runtime||{},s=Eo(e.lastStatus,"idle"),r=e.lastRunAt?Pl(e.lastRunAt):"\u672A\u8FD0\u884C",o=Number.isFinite(e.lastDurationMs)&&e.lastDurationMs>0?`${e.lastDurationMs} ms`:"\u672A\u8BB0\u5F55",n=e.lastValidationSummary||{},a=`${Number(n.errorCount)||0} \u4E2A\u9519\u8BEF / ${Number(n.warningCount)||0} \u4E2A\u63D0\u793A`,i=Eo(e.lastLoadMode,"\u672A\u8BB0\u5F55"),l=e.lastMirrorApplied===!0?"\u5DF2\u5199\u56DE\u6B63\u6587":"\u672A\u5199\u56DE\u6B63\u6587",c=Eo(e.lastError,"");return`
    <div class="yyt-tool-runtime-card">
      ${[{label:"\u5F53\u524D\u72B6\u6001",value:s,badge:!0},{label:"\u6700\u8FD1\u8FD0\u884C",value:r},{label:"\u8017\u65F6",value:o},{label:"\u6210\u529F / \u5931\u8D25",value:`${Number(e.successCount)||0} / ${Number(e.errorCount)||0}`},{label:"\u6700\u8FD1\u6821\u9A8C",value:a},{label:"\u6700\u8FD1\u8F7D\u5165\u6A21\u5F0F",value:i},{label:"\u6B63\u6587\u955C\u50CF",value:l}].map(u=>`
        <div class="yyt-tool-runtime-line${u.error?" yyt-tool-runtime-error":""}">
          <span class="yyt-tool-runtime-label">${x(u.label)}</span>
          ${u.badge?`<span class="yyt-tool-runtime-badge yyt-status-${x(u.value)}">${x(u.value)}</span>`:`<span class="yyt-tool-runtime-value">${x(u.value)}</span>`}
        </div>
      `).join("")}
      ${c?`
        <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
          <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
          <span class="yyt-tool-runtime-value">${x(c)}</span>
        </div>
      `:""}
    </div>
  `}function Ay(t,e,s={}){let r=s.meta?`<div class="yyt-table-workbench-secondary-summary-meta">${s.meta}</div>`:"";return`
    <details class="yyt-table-workbench-secondary-item" ${s.open?"open":""}>
      <summary>
        <div class="yyt-table-workbench-secondary-summary-title">${x(t)}</div>
        ${r}
      </summary>
      <div class="yyt-table-workbench-secondary-body">
        ${e}
      </div>
    </details>
  `}function Ey(t={}){let e={tables:Array.isArray(t?.tables)?t.tables:[]},s=gt(e),r=ze.getVariableHelp(),o=Number(s?.summary?.errorCount)||0,n=Number(s?.summary?.warningCount)||0;return`
    <div class="yyt-table-workbench-secondary">
      ${Ay("\u66F4\u591A",`
          ${Rl(s)}
          <pre class="yyt-table-workbench-pre" data-table-workbench-compiled-preview>${x(Mo(s.tables||[]))}</pre>
          ${gl(hr(),t)}
          ${_y(t)}
          <div data-table-workbench-target class="yyt-table-workbench-empty-state">\u8BFB\u53D6\u76EE\u6807\u4E2D...</div>
          <div data-table-workbench-load class="yyt-table-workbench-empty-state">\u8BFB\u53D6\u8BCA\u65AD\u4E2D...</div>
          <pre class="yyt-table-workbench-pre" data-table-workbench-load-preview>\u8BFB\u53D6\u8F7D\u5165\u5185\u5BB9\u4E2D...</pre>
          <pre class="yyt-table-workbench-pre">${x(r)}</pre>
        `,{open:o>0,meta:`<span>${o} \u9519\u8BEF</span><span>${n} \u63D0\u793A</span>`})}
    </div>
  `}function My(t={},e=0){let s=hr(),r=Array.isArray(t?.tables)?t.tables:[],o=Ye(r,e);return`
    <div class="yyt-tool-panel yyt-table-workbench-shell" data-tool-id="tableWorkbench">
      ${wy(t,o)}
      <div class="yyt-table-workbench-primary">
        <div class="yyt-table-workbench-stack">
          ${Sy(r,o)}
        </div>
        <div class="yyt-table-workbench-stack">
          ${Ty(t,s,o)}
        </div>
      </div>
      ${Ey(t)}
    </div>
  `}function Il(t=[]){return t.length?`
    <div class="yyt-table-workbench-detail-list">
      ${t.map(e=>`
        <div class="yyt-tool-runtime-line">
          <span class="yyt-tool-runtime-label">${x(e.label||"")}</span>
          <span class="yyt-tool-runtime-value">${x(e.value||"")}</span>
        </div>
      `).join("")}
    </div>
  `:'<div class="yyt-table-workbench-empty-state"><div class="yyt-table-workbench-muted">\u6682\u65E0\u53EF\u663E\u793A\u5185\u5BB9\u3002</div></div>'}async function ky(t){if(!D()||!B(t))return;let s=Fe(),r=t.find("[data-table-workbench-target]"),o=t.find("[data-table-workbench-load]"),n=t.find("[data-table-workbench-load-preview]");try{let a=await qn();if(!B(t))return;if(!a){r.html('<div class="yyt-table-workbench-muted">\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u3002</div>'),o.html('<div class="yyt-table-workbench-muted">\u5C1A\u672A\u89E3\u6790\u5230\u53EF\u6267\u884C\u76EE\u6807\uFF0C\u56E0\u6B64\u4E0D\u4F1A\u52A0\u8F7D bound state\u3002</div>'),n.text(Mo(s.tables||[]));return}let i=_o(a.sourceMessageId),l=To(a,{templateTables:s.tables}),c=gt({tables:Array.isArray(l.state?.tables)?l.state.tables:[]}),d=i?.tableBindings||{},u=[{label:"sourceMessageId",value:a.sourceMessageId||"\u672A\u89E3\u6790"},{label:"sourceSwipeId",value:a.sourceSwipeId||a.effectiveSwipeId||"\u672A\u89E3\u6790"},{label:"slotBindingKey",value:a.slotBindingKey||"\u672A\u89E3\u6790"},{label:"slotRevisionKey",value:a.slotRevisionKey||"\u672A\u89E3\u6790"},{label:"slotTransactionId",value:a.slotTransactionId||"\u672A\u89E3\u6790"},{label:"lastResolvedTarget",value:d?.lastResolvedTarget?.slotRevisionKey||"\u672A\u8BB0\u5F55"},{label:"lastCommittedTarget",value:d?.lastCommittedTarget?.slotRevisionKey||"\u672A\u8BB0\u5F55"}],y=[{label:"loadMode",value:l.loadMode||"empty"},{label:"mergeBaseOnly",value:l.mergeBaseOnly===!0?"true":"false"},{label:"tables \u6570\u91CF",value:String(Array.isArray(l.state?.tables)?l.state.tables.length:0)},{label:"state updatedAt",value:Pl(l.state?.updatedAt)},{label:"\u6570\u636E\u8D28\u91CF",value:c.valid?c.summary?.warningCount>0?`0 \u4E2A\u9519\u8BEF / ${c.summary.warningCount} \u4E2A\u63D0\u793A`:"\u6B63\u5E38":`${c.summary?.errorCount||0} \u4E2A\u9519\u8BEF / ${c.summary?.warningCount||0} \u4E2A\u63D0\u793A`}];r.html(Il(u)),o.html(`${Il(y)}${Rl(c)}`),n.text(Mo(l.state?.tables||[]))}catch(a){if(!B(t))return;r.html(`<div class="yyt-table-workbench-muted">${x(a?.message||"\u76EE\u6807\u8BCA\u65AD\u5931\u8D25")}</div>`),o.html('<div class="yyt-table-workbench-muted">\u65E0\u6CD5\u751F\u6210\u52A0\u8F7D\u8BCA\u65AD\u3002</div>'),n.text("\u65E0\u6CD5\u8BFB\u53D6\u8F7D\u5165\u5185\u5BB9\u3002")}}function Cl(t,{silent:e=!1}={}){let s=hr(),{values:r,errors:o}=Yn(t,s);if(Xn(t),o.length>0)return me("warning",o.join(`
`),{duration:4e3,noticeId:"yyt-table-workbench-form-error"}),{success:!1,errors:o};let n=al(r);return n.success?(e||S("success","\u586B\u8868\u5DE5\u4F5C\u53F0\u914D\u7F6E\u5DF2\u4FDD\u5B58"),n):(S("error",n.error||"\u4FDD\u5B58\u5931\u8D25"),n)}var hy,ls,Qn=W(()=>{Se();es();bl();dr();Hs();mr();So();Ao();kl();hy=`${As}
${ul}
  .yyt-table-workbench-shell {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .yyt-table-workbench-header {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 0;
  }

  .yyt-table-workbench-muted {
    font-size: 12px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.7);
  }

  .yyt-table-workbench-header-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-end;
  }

  .yyt-table-workbench-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 11px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.8);
    font-size: 11px;
    font-weight: 700;
  }

  .yyt-table-workbench-primary {
    display: grid;
    grid-template-columns: minmax(240px, 280px) minmax(0, 1fr);
    gap: 16px;
    align-items: start;
  }

  .yyt-table-workbench-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
  }

  .yyt-table-workbench-panel-copy {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 12px;
  }

  .yyt-table-workbench-panel-title {
    font-size: 13px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-workbench-panel-desc {
    font-size: 12px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.68);
  }

  .yyt-table-workbench-sidebar-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .yyt-table-workbench-sidebar-head,
  .yyt-table-workbench-editor-head,
  .yyt-table-workbench-inline-actions,
  .yyt-table-workbench-table-item-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }

  .yyt-table-workbench-table-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px 14px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    cursor: pointer;
    transition: all 0.18s ease;
  }

  .yyt-table-workbench-table-item:hover {
    border-color: rgba(123, 183, 255, 0.18);
    background: rgba(123, 183, 255, 0.07);
  }

  .yyt-table-workbench-table-item.active {
    border-color: rgba(123, 183, 255, 0.32);
    background: linear-gradient(180deg, rgba(123, 183, 255, 0.15) 0%, rgba(123, 183, 255, 0.08) 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 10px 24px rgba(18, 26, 40, 0.18);
  }

  .yyt-table-workbench-table-name {
    font-size: 13px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-workbench-table-note {
    font-size: 11px;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.62);
  }

  .yyt-table-workbench-table-order {
    font-size: 11px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.56);
  }

  .yyt-table-workbench-table-stats {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .yyt-table-workbench-stat-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 9px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.82);
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.06);
  }

  .yyt-table-workbench-editor-card {
    min-width: 0;
  }

  .yyt-table-workbench-empty-state {
    padding: 10px 12px;
    border-radius: 14px;
    border: 1px dashed rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
    color: rgba(255, 255, 255, 0.64);
    font-size: 12px;
    line-height: 1.6;
  }

  .yyt-table-workbench-pre {
    margin: 0;
    padding: 14px;
    border-radius: 16px;
    min-height: 220px;
    max-height: 520px;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-word;
    background: rgba(8, 12, 18, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.92);
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 12px;
    line-height: 1.7;
  }

  .yyt-table-workbench-secondary {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .yyt-table-workbench-secondary-item {
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255,255,255,0.03);
    overflow: hidden;
  }

  .yyt-table-workbench-secondary-item > summary {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px;
    cursor: pointer;
  }

  .yyt-table-workbench-secondary-item > summary::-webkit-details-marker {
    display: none;
  }

  .yyt-table-workbench-secondary-summary-copy {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .yyt-table-workbench-secondary-summary-title {
    font-size: 13px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-workbench-secondary-summary-desc {
    font-size: 11px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.64);
  }

  .yyt-table-workbench-secondary-summary-meta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    color: rgba(255, 255, 255, 0.66);
    font-size: 11px;
    font-weight: 700;
  }

  .yyt-table-workbench-secondary-body {
    padding: 0 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .yyt-table-workbench-detail-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px 16px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    min-height: 108px;
  }

  .yyt-table-workbench-validation-card {
    padding: 14px 16px;
    border-radius: 16px;
    border: 1px solid rgba(255, 196, 87, 0.22);
    background: rgba(255, 196, 87, 0.08);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .yyt-table-workbench-validation-card.yyt-has-error {
    border-color: rgba(255, 100, 100, 0.26);
    background: rgba(255, 100, 100, 0.08);
  }

  .yyt-table-workbench-validation-list {
    margin: 0;
    padding-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: rgba(255, 255, 255, 0.84);
    font-size: 12px;
    line-height: 1.6;
  }

  @media (max-width: 1100px) {
    .yyt-table-workbench-primary {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;ls={id:"tableWorkbenchPanel",currentTableIndex:0,render({config:t}={}){let e=t&&typeof t=="object"?t:Fe();return this.currentTableIndex=Ye(e.tables,this.currentTableIndex),My(e,this.currentTableIndex)},bindEvents(t){let e=D();if(!e||!B(t))return;let s=this;t.off(".yytTableWorkbench"),t.on("click.yytTableWorkbench",'[data-table-workbench-action="add-table"]',()=>{let r=t.find('[data-table-definition-root] [data-table-editor-action="add-table"]').first();r.length&&r.trigger("click")}),t.on("click.yytTableWorkbench",'[data-table-workbench-select-table] [data-table-editor-action^="move-table-"]',r=>{r.preventDefault(),r.stopPropagation();let o=e(r.currentTarget),n=String(o.attr("data-table-editor-action")||""),a=Number.parseInt(o.attr("data-table-index")||"-1",10),i=Jn(t,Fe()),l=Array.isArray(i.tables)?i.tables:[];if(!Number.isInteger(a)||a<0||a>=l.length)return;let c=n==="move-table-up"?a-1:a+1;i.tables=vy(l,a,c),s.currentTableIndex=Ye(i.tables,c),s.renderTo(t,{config:i})}),t.on("click.yytTableWorkbench","[data-table-workbench-select-table]",r=>{if(e(r.target).closest("[data-table-editor-action]").length)return;let o=Number.parseInt(e(r.currentTarget).attr("data-table-workbench-select-table")||"0",10),n=Jn(t,Fe());s.currentTableIndex=Ye(n.tables,o),s.renderTo(t,{config:n})}),t.on("keydown.yytTableWorkbench","[data-table-workbench-select-table]",r=>{r.key!=="Enter"&&r.key!==" "||e(r.target).closest("[data-table-editor-action]").length||(r.preventDefault(),e(r.currentTarget).trigger("click"))}),t.on("click.yytTableWorkbench",'[data-table-workbench-action="save"]',()=>{let r=Cl(t,{silent:!1});r?.success&&(s.currentTableIndex=Ye(r.config?.tables,s.currentTableIndex),s.renderTo(t,{config:r.config}))}),t.on("click.yytTableWorkbench",'[data-table-workbench-action="refresh"]',()=>{s.renderTo(t)}),t.on("click.yytTableWorkbench",'[data-table-workbench-action="run"]',async()=>{if(Cl(t,{silent:!0}).success)try{let o=await Ml();o?.success?o.warning?me("warning",`\u586B\u8868\u5DF2\u5B8C\u6210\uFF0C\u4F46\u6B63\u6587\u955C\u50CF\u5931\u8D25\uFF1A${o.warning}`,{duration:4200,noticeId:"yyt-table-workbench-run-result"}):me("success","\u624B\u52A8\u586B\u8868\u5B8C\u6210",{duration:2800,noticeId:"yyt-table-workbench-run-result"}):me("warning",o?.error||"\u624B\u52A8\u586B\u8868\u5931\u8D25",{duration:4e3,noticeId:"yyt-table-workbench-run-result"})}catch(o){S("error",o?.message||"\u624B\u52A8\u586B\u8868\u5931\u8D25")}finally{s.renderTo(t)}})},destroy(t){!D()||!B(t)||(ml(t),t.off(".yytTableWorkbench"))},getStyles(){return hy},renderTo(t,{config:e}={}){if(!D()||!B(t))return;let r=e&&typeof e=="object"?e:Fe();this.currentTableIndex=Ye(r.tables,this.currentTableIndex),t.html(this.render({config:r})),fl(t,hr(),{onChange:()=>{Xn(t);let n=t.find("[data-table-definition-root]");n.length&&is(n)},onTableMutation:({action:n,tableIndex:a,nextTableIndex:i,draft:l})=>{let c=Jn(t,r);if(c.tables=Array.isArray(l?.tables)?l.tables:c.tables,n==="add-table"){this.currentTableIndex=Ye(c.tables,a),this.renderTo(t,{config:c});return}if(n==="move-table-up"||n==="move-table-down"){this.currentTableIndex=Ye(c.tables,i),this.renderTo(t,{config:c});return}n==="delete-table"&&(this.currentTableIndex=Ye(c.tables,a),this.renderTo(t,{config:c}))}}),this.bindEvents(t,{}),Xn(t);let o=t.find("[data-table-definition-root]");o.length&&is(o),ky(t)}}});var Yl={};ye(Yl,{ApiPresetPanel:()=>St,BypassPanel:()=>as,EscapeTransformToolPanel:()=>os,PunctuationTransformToolPanel:()=>ns,RegexExtractPanel:()=>Ft,SCRIPT_ID:()=>b,SettingsPanel:()=>pt,StatusBlockPanel:()=>ss,SummaryToolPanel:()=>ts,TableWorkbenchPanel:()=>ls,ToolManagePanel:()=>Gt,UIManager:()=>Js,YouyouReviewPanel:()=>rs,bindDialogEvents:()=>Vs,closeActiveCustomSelectDropdown:()=>Ie,closeCustomSelectDropdown:()=>Ys,createDialogHtml:()=>Gs,default:()=>Cy,destroyEnhancedCustomSelects:()=>ue,downloadJson:()=>lt,enhanceNativeSelects:()=>we,escapeHtml:()=>x,fillFormWithConfig:()=>Rr,getAllStyles:()=>Hl,getFormApiConfig:()=>qs,getJQuery:()=>D,getTargetDocument:()=>zt,initUI:()=>$l,isContainerValid:()=>B,normalizeCustomSelectOptions:()=>Cr,openCustomSelectDropdown:()=>ka,readFileContent:()=>ct,registerComponents:()=>ko,renderApiPanel:()=>Dl,renderBypassPanel:()=>Wl,renderCustomSelectControl:()=>Pr,renderEscapeTransformToolPanel:()=>zl,renderPunctuationTransformToolPanel:()=>Ul,renderRegexPanel:()=>Ol,renderSettingsPanel:()=>jl,renderStatusBlockPanel:()=>Bl,renderSummaryToolPanel:()=>Ll,renderTableWorkbenchPanel:()=>Fl,renderToolPanel:()=>Nl,renderYouyouReviewPanel:()=>Kl,repositionActiveCustomSelectDropdown:()=>Xo,resetJQueryCache:()=>Yc,showToast:()=>S,showTopNotice:()=>me,toggleCustomSelectDropdown:()=>Ir,uiManager:()=>de});function ko(){de.register(St.id,St),de.register(Ft.id,Ft),de.register(Gt.id,Gt),de.register(ts.id,ts),de.register(ss.id,ss),de.register(rs.id,rs),de.register(os.id,os),de.register(ns.id,ns),de.register(as.id,as),de.register(pt.id,pt),de.register(ls.id,ls),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function $l(t={}){let{autoInjectStyles:e=!0,targetDocument:s,...r}=t;de.init(r),ko(),e&&de.injectStyles(s),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function Iy(){de.getComponent(St.id)||ko()}function qe(t,e,s={}){Iy(),de.render(t,e,s)}function Dl(t){qe(St.id,t)}function Ol(t){qe(Ft.id,t)}function Nl(t){qe(Gt.id,t)}function Ll(t){qe(ts.id,t)}function Bl(t){qe(ss.id,t)}function Kl(t){qe(rs.id,t)}function zl(t){qe(os.id,t)}function Ul(t){qe(ns.id,t)}function Wl(t){qe(as.id,t)}function jl(t){qe(pt.id,t)}function Fl(t){qe(ls.id,t)}function Hl(){return de.getAllStyles()}var Cy,ql=W(()=>{Qo();en();ln();mn();Cn();Pn();Rn();Dn();On();Nn();mo();Qn();Se();Qo();en();ln();mn();Cn();Pn();Rn();Dn();On();Nn();mo();Qn();Cy={uiManager:de,ApiPresetPanel:St,RegexExtractPanel:Ft,ToolManagePanel:Gt,SummaryToolPanel:ts,StatusBlockPanel:ss,YouyouReviewPanel:rs,EscapeTransformToolPanel:os,PunctuationTransformToolPanel:ns,BypassPanel:as,SettingsPanel:pt,TableWorkbenchPanel:ls,registerComponents:ko,initUI:$l,renderApiPanel:Dl,renderRegexPanel:Ol,renderToolPanel:Nl,renderSummaryToolPanel:Ll,renderStatusBlockPanel:Bl,renderYouyouReviewPanel:Kl,renderEscapeTransformToolPanel:zl,renderPunctuationTransformToolPanel:Ul,renderBypassPanel:Wl,renderSettingsPanel:jl,renderTableWorkbenchPanel:Fl,getAllStyles:Hl}});var Vl={};ye(Vl,{WindowManager:()=>Io,closeWindow:()=>Dy,createWindow:()=>$y,windowManager:()=>Re});function Ry(){if(Re.stylesInjected)return;Re.stylesInjected=!0;let t=`
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
  `,e=document.createElement("style");e.id=Py+"_styles",e.textContent=t,(document.head||document.documentElement).appendChild(e)}function $y(t){let{id:e,title:s="\u7A97\u53E3",content:r="",width:o=900,height:n=700,modal:a=!1,resizable:i=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:d=!0,onClose:u,onReady:y}=t;Ry();let p=window.jQuery||window.parent?.jQuery;if(!p)return console.error("[WindowManager] jQuery not available"),null;if(Re.isOpen(e))return Re.bringToFront(e),Re.getWindow(e);let f=window.innerWidth||1200,h=window.innerHeight||800,m=f<=1100,_=null,M=!1;d&&(_=Re.getState(e),_&&!m&&(M=!0));let w,E;M&&_.width&&_.height?(w=Math.max(400,Math.min(_.width,f-40)),E=Math.max(300,Math.min(_.height,h-40))):(w=Math.max(400,Math.min(o,f-40)),E=Math.max(300,Math.min(n,h-40)));let k=Math.max(20,Math.min((f-w)/2,f-w-20)),I=Math.max(20,Math.min((h-E)/2,h-E-20)),N=l&&!m,se=`
    <div class="yyt-window" id="${e}" style="left:${k}px; top:${I}px; width:${w}px; height:${E}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${Oy(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${N?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
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
  `,q=null;a&&(q=p(`<div class="yyt-window-overlay" data-for="${e}"></div>`),p(document.body).append(q));let O=p(se);p(document.body).append(O),Re.register(e,O),O.on("mousedown",()=>Re.bringToFront(e));let ee=!1,ve={left:k,top:I,width:w,height:E},_e=()=>{ve={left:parseInt(O.css("left")),top:parseInt(O.css("top")),width:O.width(),height:O.height()},O.addClass("maximized"),O.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),ee=!0},Ge=()=>{O.removeClass("maximized"),O.css({left:ve.left+"px",top:ve.top+"px",width:ve.width+"px",height:ve.height+"px"}),O.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),ee=!1};O.find(".yyt-window-btn.maximize").on("click",()=>{ee?Ge():_e()}),(m&&l||M&&_.isMaximized&&l||c&&l)&&_e(),O.find(".yyt-window-btn.close").on("click",()=>{if(d&&l){let le={width:ee?ve.width:O.width(),height:ee?ve.height:O.height(),isMaximized:ee};Re.saveState(e,le)}u&&u(),q&&q.remove(),O.remove(),Re.unregister(e),p(document).off(".yytWindowDrag"+e),p(document).off(".yytWindowResize"+e)}),q&&q.on("click",le=>{le.target,q[0]});let G=!1,kt,It,Ct,ft;if(O.find(".yyt-window-header").on("mousedown",le=>{p(le.target).closest(".yyt-window-controls").length||ee||(G=!0,kt=le.clientX,It=le.clientY,Ct=parseInt(O.css("left")),ft=parseInt(O.css("top")),p(document.body).css("user-select","none"))}),p(document).on("mousemove.yytWindowDrag"+e,le=>{if(!G)return;let V=le.clientX-kt,mt=le.clientY-It;O.css({left:Math.max(0,Ct+V)+"px",top:Math.max(0,ft+mt)+"px"})}),p(document).on("mouseup.yytWindowDrag"+e,()=>{G&&(G=!1,p(document.body).css("user-select",""))}),i){let le=!1,V="",mt,ce,xe,nt,Ds,bt;O.find(".yyt-window-resize-handle").on("mousedown",function(Ve){ee||(le=!0,V="",p(this).hasClass("se")?V="se":p(this).hasClass("e")?V="e":p(this).hasClass("s")?V="s":p(this).hasClass("w")?V="w":p(this).hasClass("n")?V="n":p(this).hasClass("nw")?V="nw":p(this).hasClass("ne")?V="ne":p(this).hasClass("sw")&&(V="sw"),mt=Ve.clientX,ce=Ve.clientY,xe=O.width(),nt=O.height(),Ds=parseInt(O.css("left")),bt=parseInt(O.css("top")),p(document.body).css("user-select","none"),Ve.stopPropagation())}),p(document).on("mousemove.yytWindowResize"+e,Ve=>{if(!le)return;let cs=Ve.clientX-mt,Pt=Ve.clientY-ce,Rt=400,$t=300,Os=xe,Ns=nt,Sr=Ds,Tr=bt;if(V.includes("e")&&(Os=Math.max(Rt,xe+cs)),V.includes("s")&&(Ns=Math.max($t,nt+Pt)),V.includes("w")){let Dt=xe-cs;Dt>=Rt&&(Os=Dt,Sr=Ds+cs)}if(V.includes("n")){let Dt=nt-Pt;Dt>=$t&&(Ns=Dt,Tr=bt+Pt)}O.css({width:Os+"px",height:Ns+"px",left:Sr+"px",top:Tr+"px"})}),p(document).on("mouseup.yytWindowResize"+e,()=>{le&&(le=!1,p(document.body).css("user-select",""))})}return O.on("remove",()=>{p(document).off(".yytWindowDrag"+e),p(document).off(".yytWindowResize"+e)}),y&&setTimeout(()=>y(O),50),O}function Dy(t){let e=Re.getWindow(t);if(e){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${t}"]`).remove(),s(document).off(".yytWindowDrag"+t),s(document).off(".yytWindowResize"+t)),e.remove(),Re.unregister(t)}}function Oy(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var Py,Gl,Io,Re,Jl=W(()=>{De();Py="youyou_toolkit_window_manager",Gl="window_states",Io=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,s){this.topZIndex++,this.windows.set(e,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let s=this.windows.get(e);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,s)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,s){let r=this.loadStates();r[e]={...s,updatedAt:Date.now()},Ls.set(Gl,r)}loadStates(){return Ls.get(Gl)||{}}getState(e){return this.loadStates()[e]||null}},Re=new Io});var sc={};ye(sc,{TX_PHASE:()=>We,ToolAutomationService:()=>Po,Transaction:()=>Co,default:()=>Wy,toolAutomationService:()=>tc});function Q(t){return t==null?"":String(t).trim()}function ta(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Xl(){try{return ta()?.SillyTavern||null}catch{return null}}function Ro(t){try{return t?.getContext?.()||null}catch{return null}}function Zn(t,e){if(!t)return null;let s=typeof t?.on=="function"||typeof t?.addListener=="function",r=typeof t?.off=="function"||typeof t?.removeListener=="function";return!s||!r?null:{eventSource:t,source:e,capabilities:{on:typeof t?.on=="function",off:typeof t?.off=="function",addListener:typeof t?.addListener=="function",removeListener:typeof t?.removeListener=="function"}}}function Ny(t){let e=ta(),s=Ro(t);return[Zn(t?.eventSource,"SillyTavern.eventSource"),Zn(e?.eventSource,"topWindow.eventSource"),Zn(s?.eventSource,"SillyTavern.getContext().eventSource")].filter(Boolean)[0]||{eventSource:null,source:"unavailable",capabilities:{on:!1,off:!1,addListener:!1,removeListener:!1}}}function Ly(t){let e=Ro(t);return t?.eventTypes||e?.eventTypes||ta()?.event_types||{}}function Ql(t){let e=Ro(t);return Q(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.chat_filename??t?.this_chid??"chat_default")||"chat_default"}function Zl(t){let e=Ro(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function ec(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="user"||e==="system"?!1:e==="assistant"||e==="ai"||!e}function By(t,e){let s=Q(e);if(!s)return null;let r=Zl(t);for(let o=r.length-1;o>=0;o-=1){let n=r[o];if([n?.messageId,n?.message_id,n?.id,n?.mesid,n?.mid,n?.chat_index,o].map(i=>Q(i)).includes(s))return n||null}return null}function Ky(t){let e=Zl(t);if(!Array.isArray(e)||e.length===0)return null;let s=e.length-1,r=e[s]||null;if(!ec(r))return null;let o=Q(r?.messageId??r?.message_id??r?.id??r?.mesid??r?.mid??r?.chat_index??s);return o?{messageId:o,swipeId:Q(r?.swipeId??r?.swipe_id??r?.swipe??r?.swipeIndex),message:r}:null}function ea(t){if(!t)return"";let e=String(t).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function zy(t){let e=String(t||"");if(e.length===0)return"0";let s=5381,r=Math.min(e.length,2e3);for(let o=0;o<r;o++)s=(s<<5)+s+e.charCodeAt(o)|0;return(s>>>0).toString(36)}function Uy(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${t}_${e}`}var We,Co,Po,tc,Wy,rc=W(()=>{lr();ge();At();co();vs();We=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),Co=class{constructor({chatId:e,messageId:s,swipeId:r,sourceEvent:o,generationKey:n}){this.traceId=Uy(),this.chatId=e||"",this.messageId=s||"",this.swipeId=r||"",this.sourceEvent=o||"",this.generationKey=n||"",this.phase=We.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,s={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,s),this}toSnapshot(){return{...this}}},Po=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._completedGenerationKeys=new Map,this._cancelledGenerationKeys=new Map,this._slotQueues=new Map,this._activeTransactions=new Map,this._isProcessing=!1,this._currentChatId="",this._enabled=!1,this._enabledCheckedOnce=!1,this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""},this._initRetryTimer=null,this._messageReceivedThrottleUntil=0}setDebugMode(e){this.debugMode=e===!0}init(e={}){this.stop();let s=Xl(),r=e.retryOnFailure!==!1,o=Number.isFinite(e.retryDelayMs)?e.retryDelayMs:1500,n=Number.isFinite(e.attempt)?e.attempt:1;if(this._hostBindingStatus.initAttempts=n,this._hostBindingStatus.lastInitAt=Date.now(),!s)return this._hostBindingStatus={...this._hostBindingStatus,initialized:!1,lastInitResult:"missing_api",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],lastError:"\u672A\u627E\u5230\u5BBF\u4E3B API (SillyTavern)",retryScheduled:!1,retryDelayMs:0},this._log("\u521D\u59CB\u5316\u5931\u8D25: \u672A\u627E\u5230\u5BBF\u4E3B API (SillyTavern)"),!1;this._currentChatId=Ql(s);let a=Ny(s),i=a?.eventSource||null,l=Ly(s),c=typeof i?.on=="function"?i.on.bind(i):typeof i?.addListener=="function"?i.addListener.bind(i):null,d=typeof i?.off=="function"?i.off.bind(i):typeof i?.removeListener=="function"?i.removeListener.bind(i):null,u=!!(l&&Object.keys(l).length>0);if(this._hostBindingStatus={...this._hostBindingStatus,source:a?.source||"unavailable",hasEventSource:!!i,hasEventTypes:u,eventBindings:[],lastError:"",retryScheduled:!1,retryDelayMs:0,initialized:!1,lastInitResult:"binding"},!c||!d){let f="\u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5";return this._hostBindingStatus={...this._hostBindingStatus,lastInitResult:"missing_event_source",lastError:f},this._log(`\u521D\u59CB\u5316\u5931\u8D25: ${f}`,{source:this._hostBindingStatus.source}),r&&this._scheduleInitRetry(o,n+1),!1}this._log("\u5BBF\u4E3B eventTypes \u6620\u5C04:",JSON.stringify(l,null,2));let y=(f,h)=>{if(!f||typeof h!="function")return;let m=f;c(m,h),this._hostBindingStatus.eventBindings=[...this._hostBindingStatus.eventBindings,`${m} -> ${ea(m)}`],this._stopCallbacks.push(()=>{try{d(m,h)}catch(_){this._log("\u53D6\u6D88\u4E8B\u4EF6\u5931\u8D25",m,_)}}),this._log(`\u5DF2\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${m}" (\u5F52\u4E00\u5316: ${ea(m)})`)},p=(f,...h)=>{let m=ea(f),{messageId:_,swipeId:M}=this._extractIdentitiesFromArgs(h);if(this._log(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${f}" \u2192 "${m}"`,{messageId:_,swipeId:M,argCount:h.length}),!this._checkEnabled())return;if(m==="MESSAGE_RECEIVED"){let N=Date.now();if(N<this._messageReceivedThrottleUntil){this._log(`MESSAGE_RECEIVED \u5728\u8282\u6D41\u7A97\u53E3\u5185\uFF0C\u8DF3\u8FC7\uFF08\u5269\u4F59 ${this._messageReceivedThrottleUntil-N}ms\uFF09`);return}this._messageReceivedThrottleUntil=N+3e3}let w=null,E=_,k=M;if(E&&(w=By(s,E)),!w){let N=Ky(s);N?.messageId&&(w=N.message,E=N.messageId,k=N.swipeId||k)}if(!E||!w){this._log(`\u4E8B\u4EF6 "${m}" \u65E0 assistant \u76EE\u6807\uFF0C\u8DF3\u8FC7`);return}if(!ec(w)){this._log(`\u4E8B\u4EF6 "${m}" \u547D\u4E2D\u975E assistant \u6D88\u606F\uFF0C\u8DF3\u8FC7`,{messageId:E});return}let I=String(w.content||w.mes||"").trim();if(!I||I.length<5){this._log(`\u4E8B\u4EF6 "${m}" \u6D88\u606F\u8FC7\u77ED\uFF08${I.length} \u5B57\u7B26\uFF09\uFF0C\u8DF3\u8FC7`);return}if(this._isProcessing){this._log(`\u4E8B\u4EF6 "${m}" \u6B63\u5728\u5904\u7406\u4E2D\uFF0C\u8DF3\u8FC7`);return}this._scheduleMessageProcessing(E,k,{settleMs:this._getSettleMs(),sourceEvent:m})};return y(l.MESSAGE_SENT||"message_sent",()=>{this._log("MESSAGE_SENT \u2192 \u6E05\u7406\u8C03\u5EA6\u961F\u5217"),this._pendingTimers.forEach(f=>clearTimeout(f)),this._pendingTimers.clear()}),y(l.MESSAGE_RECEIVED||"message_received",(...f)=>{p(l.MESSAGE_RECEIVED||"message_received",...f)}),y(l.GENERATION_ENDED||"generation_ended",(...f)=>{p(l.GENERATION_ENDED||"generation_ended",...f)}),y(l.CHAT_CHANGED||"chat_changed",()=>{this._resetForChatChange()}),y(l.MESSAGE_DELETED||"message_deleted",f=>{this._clearMessageState(Q(f))}),this._stopCallbacks.push($.on(P.SETTINGS_UPDATED,()=>{let f=this._enabled;this._enabled=this._evaluateEnabled(),f!==this._enabled&&this._log(`\u81EA\u52A8\u5316\u72B6\u6001\u53D8\u66F4: ${f} \u2192 ${this._enabled}`)})),this._enabled=this._evaluateEnabled(),this._enabledCheckedOnce=!1,this._hostBindingStatus={...this._hostBindingStatus,initialized:!0,lastInitResult:"ready",retryScheduled:!1,retryDelayMs:0,lastError:""},this._log("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{enabled:this._enabled,chatId:this._currentChatId,source:this._hostBindingStatus.source}),!0}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(s){this._log("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",s)}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._completedGenerationKeys.clear(),this._cancelledGenerationKeys.clear(),this._cancelActiveTransactions("service_stopped"),this._activeTransactions.clear(),this._isProcessing=!1,this._enabled=!1,this._enabledCheckedOnce=!1,this._initRetryTimer&&(clearTimeout(this._initRetryTimer),this._initRetryTimer=null),this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""}}isEnabled(){return this._enabled}getRuntimeSnapshot(){return this._pruneCompletedKeys(),this._pruneCancelledKeys(),{currentChatId:this._currentChatId,enabled:this._enabled,isProcessing:this._isProcessing,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,completedGenerationKeyCount:this._completedGenerationKeys.size,cancelledGenerationKeyCount:this._cancelledGenerationKeys.size,activeTransactionCount:this._activeTransactions.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),hostBinding:{...this._hostBindingStatus,eventBindings:Array.isArray(this._hostBindingStatus?.eventBindings)?[...this._hostBindingStatus.eventBindings]:[]},settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let s=await rr({messageId:"",swipeId:"",runSource:"AUTO"}),r=Q(s?.sourceMessageId||s?.messageId);return r?this.processAssistantMessage(r,{force:e.force===!0,swipeId:Q(s?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:s=!1,swipeId:r="",sourceEvent:o="AUTO"}={}){let n=new Co({chatId:this._currentChatId,messageId:e,swipeId:r,sourceEvent:o});try{if(!e)return this._skipTransaction(n,"missing_message_id");if(!this._checkEnabled()&&!s)return this._skipTransaction(n,"automation_disabled");n.transition(We.CONFIRMED);let a=await rr({messageId:e,swipeId:r,runSource:"AUTO"}),i=a?.targetAssistantMessage||null;if(!i||!a?.sourceMessageId)return this._skipTransaction(n,"assistant_message_not_found");let l=String(i.content||i.mes||"").trim();if(!l||l.length<5)return this._skipTransaction(n,"assistant_message_too_short");n.transition(We.CONTEXT_BUILT);let c=zy(l),d=`${Q(a.sourceMessageId)}::${c}`;if(n.generationKey=d,!s&&this._hasCompletedGeneration(d))return this._skipTransaction(n,"duplicate_generation",{generationKey:d});if(!s&&this._isGenerationCancelled(d))return this._skipTransaction(n,"cancelled_generation",{generationKey:d});let u=tt.filterAutoPostResponseTools(sr());if(!u.length)return this._skipTransaction(n,"no_auto_tools",{tools:u});let y=`${Q(a.sourceMessageId)}::${Q(a.sourceSwipeId||r)}`;return n.slotKey=y,n.slotRevisionKey=a.slotRevisionKey||"",n.sourceMessageId=a.sourceMessageId||e,n.sourceSwipeId=a.sourceSwipeId||r||"",this._enqueueSlot(y,async()=>{if(this._hasCompletedGeneration(d)&&!s)return this._skipTransaction(n,"duplicate_generation_after_queue",{generationKey:d});if(this._isGenerationCancelled(d)&&!s)return this._skipTransaction(n,"cancelled_generation_after_queue",{generationKey:d});this._isProcessing=!0,n.transition(We.REQUEST_STARTED);let p=new AbortController;this._registerActiveTransaction(n,{controller:p,generationKey:d,slotKey:y,sourceMessageId:a.sourceMessageId||e,sourceSwipeId:a.sourceSwipeId||r||""});try{let f=[],h=!1;for(let w of u){let E={...a,signal:p.signal,isAutoRun:!0,abortMeta:{traceId:n.traceId,generationKey:d,slotKey:y,sourceMessageId:a.sourceMessageId||e,sourceSwipeId:a.sourceSwipeId||r||""},shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:n.traceId,generationKey:d}),input:{...a.input||{},lastAiMessage:a.lastAiMessage,assistantBaseText:a.assistantBaseText}},k=await tt.runToolPostResponse(w,E);f.push(k),(k?.writebackState||k?.output)&&(h=!0)}n.transition(We.REQUEST_FINISHED,{toolResults:f}),h&&(n.transition(We.WRITEBACK_STARTED),n.writebackState={messageId:a.sourceMessageId,swipeId:a.sourceSwipeId,hasOutput:!0}),this._markGenerationCompleted(d);let m=f.every(w=>w?.success!==!1),_=f.some(w=>w?.meta?.aborted===!0||w?.meta?.stale===!0||w?.error==="\u8BF7\u6C42\u5DF2\u53D6\u6D88");m&&n.transition(We.WRITEBACK_COMMITTED);let M=m?We.REFRESH_CONFIRMED:We.FAILED;return n.transition(M,{verdict:_?"aborted":m?"success":"partial_failure"}),this._recordTransaction(n),this._updateAutoRuntimeForResults(u,a,n,f),{success:m,traceId:n.traceId,generationKey:d,sourceEvent:o,messageId:a.sourceMessageId||e,phase:n.phase,results:f}}finally{this._unregisterActiveTransaction(n.traceId),this._isProcessing=!1}})}catch(a){return n.transition(We.FAILED,{error:a?.message||String(a)}),this._recordTransaction(n),this._unregisterActiveTransaction(n.traceId),this._isProcessing=!1,this._log("processAssistantMessage \u5F02\u5E38",a),{success:!1,traceId:n.traceId,error:n.error,phase:n.phase}}}_extractIdentitiesFromArgs(e){let s="",r="";for(let o of e)if(o!=null){if(typeof o=="number"&&Number.isFinite(o)&&!s){s=Q(o);continue}if(typeof o=="string"){let n=Q(o);!s&&/^\d+$/.test(n)&&(s=n);continue}typeof o=="object"&&(s||(s=Q(o.messageId??o.message_id??o.id??o.mesid??o.chat_index??o.message?.messageId??o.message?.message_id??o.message?.id??o.message?.mesid??o.message?.chat_index??o.data?.messageId??o.data?.message_id??o.data?.id??o.target?.messageId??o.target?.message_id??o.target?.id)),r||(r=Q(o.swipeId??o.swipe_id??o.swipe??o.swipeIndex??o.currentSwipe??o.message?.swipeId??o.message?.swipe_id??o.message?.swipe??o.data?.swipeId??o.data?.swipe_id??o.data?.swipe??o.target?.swipeId??o.target?.swipe_id??o.target?.swipe)))}return{messageId:s,swipeId:r}}_scheduleMessageProcessing(e,s="",r={}){let o=r.settleMs??this._getSettleMs(),n=`msg::${Q(e)}::${Q(s)}`,a=this._pendingTimers.get(n);a&&clearTimeout(a);let i=setTimeout(()=>{this._pendingTimers.delete(n),this.processAssistantMessage(e,{swipeId:s,sourceEvent:r.sourceEvent||"AUTO"}).catch(l=>{this._log("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:l})})},Math.max(0,o));this._pendingTimers.set(n,i),this._log("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:n,settleMs:o,sourceEvent:r.sourceEvent})}cancelAutomation(e={}){let s=e.reason||"manual_cancel",r=Q(e.messageId),o=Q(e.slotKey),n=Q(e.traceId),a=0;for(let[i,l]of this._pendingTimers){let c=r&&i.includes(`::${r}::`),d=o&&i.includes(o);(c||d||!r&&!o&&!n)&&(clearTimeout(l),this._pendingTimers.delete(i),a+=1)}return a+=this._cancelActiveTransactions(s,{messageId:r,slotKey:o,traceId:n}),{success:a>0,cancelledCount:a,reason:s}}_hasCompletedGeneration(e){if(!e)return!1;this._pruneCompletedKeys();let s=this._completedGenerationKeys.get(e);return s?Date.now()-s<this._getDedupeWindowMs():!1}_markGenerationCompleted(e){e&&(this._completedGenerationKeys.set(e,Date.now()),this._pruneCompletedKeys())}_markGenerationCancelled(e){e&&(this._cancelledGenerationKeys.set(e,Date.now()),this._pruneCancelledKeys())}_isGenerationCancelled(e){if(!e)return!1;this._pruneCancelledKeys();let s=this._cancelledGenerationKeys.get(e);return s?Date.now()-s<this._getDedupeWindowMs():!1}_pruneCompletedKeys(){let e=Date.now()-this._getDedupeWindowMs();for(let[s,r]of this._completedGenerationKeys)(!Number.isFinite(r)||r<e)&&this._completedGenerationKeys.delete(s)}_pruneCancelledKeys(){let e=Date.now()-this._getDedupeWindowMs();for(let[s,r]of this._cancelledGenerationKeys)(!Number.isFinite(r)||r<e)&&this._cancelledGenerationKeys.delete(s)}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),this._log(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,s,r={}){return e.transition(We.SKIPPED,{verdict:s,...r}),this._recordTransaction(e),Array.isArray(r?.tools)&&r.tools.length>0&&this._updateAutoRuntimeForSkip(r.tools,e,s,r),{success:!1,skipped:!0,reason:s,traceId:e.traceId,...r}}_enqueueSlot(e,s){let o=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(s).finally(()=>{this._slotQueues.get(e)===o&&this._slotQueues.delete(e)});return this._slotQueues.set(e,o),o}_registerActiveTransaction(e,s={}){e?.traceId&&this._activeTransactions.set(e.traceId,{traceId:e.traceId,generationKey:s.generationKey||e.generationKey||"",slotKey:s.slotKey||e.slotKey||"",sourceMessageId:s.sourceMessageId||e.sourceMessageId||"",sourceSwipeId:s.sourceSwipeId||e.sourceSwipeId||"",slotRevisionKey:s.slotRevisionKey||e.slotRevisionKey||"",assistantBaseFingerprint:s.assistantBaseFingerprint||"",assistantBaseText:s.assistantBaseText||"",controller:s.controller||null,cancelled:!1,cancelReason:""})}_unregisterActiveTransaction(e){e&&this._activeTransactions.delete(e)}_cancelActiveTransactions(e="manual_cancel",s={}){let r=Q(s.messageId),o=Q(s.slotKey),n=Q(s.traceId),a=0;for(let[i,l]of this._activeTransactions){let c=n&&i===n,d=r&&Q(l?.sourceMessageId)===r,u=o&&Q(l?.slotKey)===o;if(!(!c&&!d&&!u&&!(!n&&!r&&!o))){l.cancelled=!0,l.cancelReason=e,l?.generationKey&&this._markGenerationCancelled(l.generationKey);try{l?.controller?.abort?.()}catch{}a+=1}}return a}_shouldAbortAutoWriteback(e={}){let s=Q(e.traceId),r=Q(e.generationKey);if(s){let o=this._activeTransactions.get(s);if(!o||o.cancelled)return{aborted:!0,reason:"cancelled_before_host_commit"}}return r&&this._isGenerationCancelled(r)?{aborted:!0,reason:"cancelled_before_host_commit"}:!1}_updateAutoRuntimeForSkip(e,s,r,o={}){e.forEach(n=>{n?.id&&_t(n.id,{lastAutoRunAt:Date.now(),lastAutoStatus:"skipped",lastAutoMessageId:s?.sourceMessageId||s?.messageId||"",lastAutoSwipeId:s?.sourceSwipeId||s?.swipeId||"",lastAutoRevisionKey:s?.slotRevisionKey||o?.slotRevisionKey||"",lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:!1,lastAutoSkipReason:r||""},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_updateAutoRuntimeForResults(e,s,r,o=[]){e.forEach((n,a)=>{if(!n?.id)return;let i=o[a]||{},l=i?.meta?.writebackDetails||{},c=i?.meta?.aborted===!0||i?.meta?.stale===!0?"aborted":i?.success===!1?"failed":"success",d=i?.meta?.aborted===!0?i?.meta?.abortReason||(i?.meta?.stale===!0?"stale_base_changed":"cancelled_before_host_commit"):"";_t(n.id,{lastAutoRunAt:Date.now(),lastAutoStatus:c,lastAutoMessageId:s?.sourceMessageId||r?.sourceMessageId||r?.messageId||"",lastAutoSwipeId:s?.sourceSwipeId||r?.sourceSwipeId||r?.swipeId||"",lastAutoRevisionKey:s?.slotRevisionKey||r?.slotRevisionKey||"",lastAutoWritebackStatus:i?.meta?.writebackStatus||"",lastAutoRefreshConfirmed:!!l.refreshConfirmed,lastAutoSkipReason:d},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_resetForChatChange(){let e=Xl(),s=Ql(e);this._log("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:s}),this._currentChatId=s,this._pendingTimers.forEach(r=>clearTimeout(r)),this._pendingTimers.clear(),this._slotQueues.clear(),this._completedGenerationKeys.clear(),this._cancelledGenerationKeys.clear(),this._cancelActiveTransactions("chat_changed"),this._activeTransactions.clear(),this._isProcessing=!1,this._messageReceivedThrottleUntil=0}_scheduleInitRetry(e,s){this._initRetryTimer&&clearTimeout(this._initRetryTimer),this._hostBindingStatus={...this._hostBindingStatus,retryScheduled:!0,retryDelayMs:e},this._initRetryTimer=setTimeout(()=>{this._initRetryTimer=null,this.init({retryOnFailure:!1,retryDelayMs:e,attempt:s})},Math.max(200,e))}_clearMessageState(e){if(e){for(let[s,r]of this._pendingTimers)(s.includes(`::${e}::`)||s.startsWith(`msg::${e}::`))&&(clearTimeout(r),this._pendingTimers.delete(s));for(let s of this._completedGenerationKeys.keys())s.startsWith(`${e}::`)&&this._completedGenerationKeys.delete(s)}}_evaluateEnabled(){return this._getAutomationSettings().enabled===!0}_checkEnabled(){if(this._enabled)return!0;if(!this._enabledCheckedOnce){this._enabledCheckedOnce=!0;let e=this._getAutomationSettings();this._log("\u26A0 \u81EA\u52A8\u5316\u672A\u542F\u7528\uFF0C\u9996\u6B21\u8BCA\u65AD:",{"automation.enabled":e.enabled,"\u5B8C\u6574 automation \u8BBE\u7F6E":e,\u63D0\u793A:"\u8BF7\u786E\u4FDD settings.automation.enabled === true"})}return!1}_getAutomationSettings(){let e=Ke.getSettings()?.automation||{},s=Number.isFinite(e.settleMs)?e.settleMs:800;return{enabled:e.enabled===!0,settleMs:s,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(1200,s+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}_log(...e){console.log("[ToolAutomation]",...e)}},tc=new Po,Wy=tc});function oc(t,e={}){let{constants:s,topLevelWindow:r,modules:o}=t,{SCRIPT_ID:n,SCRIPT_VERSION:a,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=s,c=null,d=!1;function u(...E){console.log(`[${n}]`,...E)}function y(...E){console.error(`[${n}]`,...E)}async function p(){return c||(c=(async()=>{try{return o.storageModule=await Promise.resolve().then(()=>(ca(),la)),o.apiConnectionModule=await Promise.resolve().then(()=>(Ws(),ga)),o.presetManagerModule=await Promise.resolve().then(()=>(Hs(),ha)),o.uiModule=await Promise.resolve().then(()=>(ql(),Yl)),o.regexExtractorModule=await Promise.resolve().then(()=>(jr(),za)),o.toolManagerModule=await Promise.resolve().then(()=>(Qr(),Ga)),o.toolExecutorModule=await Promise.resolve().then(()=>(Mn(),En)),o.windowManagerModule=await Promise.resolve().then(()=>(Jl(),Vl)),o.toolRegistryModule=await Promise.resolve().then(()=>(At(),pi)),o.settingsServiceModule=await Promise.resolve().then(()=>(lr(),Ei)),o.bypassManagerModule=await Promise.resolve().then(()=>(ar(),Ai)),o.variableResolverModule=await Promise.resolve().then(()=>(dr(),Ci)),o.contextInjectorModule=await Promise.resolve().then(()=>(Jt(),ki)),o.toolPromptServiceModule=await Promise.resolve().then(()=>(io(),Ri)),o.toolOutputServiceModule=await Promise.resolve().then(()=>(co(),Di)),o.toolAutomationServiceModule=await Promise.resolve().then(()=>(rc(),sc)),o.toolOutputServiceModule?.toolOutputService&&o.apiConnectionModule&&o.toolOutputServiceModule.toolOutputService.setApiConnection(o.apiConnectionModule),!0}catch(E){return c=null,console.warn(`[${n}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,E),console.warn(`[${n}] \u5DF2\u52A0\u8F7D\u6A21\u5757:`,Object.keys(o).filter(k=>o[k])),!1}})(),c)}function f(){return`
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
    `}async function h(){let E=`${n}-styles`,k=r.document||document;if(k.getElementById(E))return;let I="",N=[];try{N.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{N.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}N.push("./styles/main.css");for(let q of[...new Set(N.filter(Boolean))])try{let O=await fetch(q);if(O.ok){I=await O.text();break}}catch{}I||(u("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),I=f());let se=k.createElement("style");se.id=E,se.textContent=I,(k.head||k.documentElement).appendChild(se),u("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function m(){let E=r.document||document;if(o.uiModule?.getAllStyles){let k=`${n}-ui-styles`;if(!E.getElementById(k)){let I=E.createElement("style");I.id=k,I.textContent=o.uiModule.getAllStyles(),(E.head||E.documentElement).appendChild(I)}}}async function _(){try{let{applyUiPreferences:E}=await Promise.resolve().then(()=>(mo(),Vi));if(o.settingsServiceModule?.settingsService){let k=o.settingsServiceModule.settingsService.getUiSettings();if(k&&k.theme){let I=r.document||document;E(k,I),u(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${k.theme}`)}}}catch(E){u("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",E)}}function M(){let E=r.jQuery||window.jQuery;if(!E){y("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(M,1e3);return}let k=r.document||document,I=E("#extensionsMenu",k);if(!I.length){u("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(M,2e3);return}if(E(`#${l}`,I).length>0){u("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let se=E(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),q=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,O=E(q);O.on("click",function(ve){ve.stopPropagation(),u("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let _e=E("#extensionsMenuButton",k);_e.length&&I.is(":visible")&&_e.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),se.append(O),I.append(se),u("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function w(){u(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await h();let E=await p();if(u(E?"\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F":"\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u53EF\u7528\u529F\u80FD"),!d&&o.uiModule?.initUI)try{o.uiModule.initUI({services:o,autoInjectStyles:!1,targetDocument:r.document||document}),d=!0,u("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(I){console.error(`[${n}] UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,I)}if(o.uiModule&&(m(),await _()),o.toolAutomationServiceModule?.toolAutomationService){let I=o.toolAutomationServiceModule.toolAutomationService.init();u(I?"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316":"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u521D\u59CB\u5316\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u5BBF\u4E3B\u4E8B\u4EF6\u6E90\u91CD\u8BD5")}let k=r.document||document;k.readyState==="loading"?k.addEventListener("DOMContentLoaded",()=>{setTimeout(M,1e3)}):setTimeout(M,1e3),u("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:p,injectStyles:h,addMenuItem:M,init:w,log:u,logError:y}}ge();Se();Se();var jy="youyou_toolkit_prompt_editor",Fy={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},Hy={system:"fa-server",ai:"fa-robot",user:"fa-user"},vr=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],$o=class{constructor(e={}){this.containerId=e.containerId||jy,this.segments=e.segments||[...vr],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...vr],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let s=Fy[e.type]||e.type,r=Hy[e.type]||"fa-file",o=e.mainSlot==="A"||e.isMain,n=e.mainSlot==="B"||e.isMain2,a=o?"var(--yyt-accent, #7bb7ff)":n?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
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
    `}bindEvents(){this.$container&&(ue(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"),this.$container.on("click.yytPromptEditor",".yyt-prompt-toggle",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.on("click.yytPromptEditor",".yyt-prompt-delete",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.on("change.yytPromptEditor",".yyt-prompt-role",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),r=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{role:r})}),this.$container.on("change.yytPromptEditor",".yyt-prompt-main-slot",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),r=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:r})}),this.$container.on("input.yytPromptEditor",".yyt-prompt-textarea",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-add-segment`,()=>{this.addSegment()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-import-prompt`,()=>{this.importPrompt()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-export-prompt`,()=>{this.exportPrompt()}),we(this.$container,{namespace:"yytPromptEditorSelect",selectors:[".yyt-prompt-role",".yyt-prompt-main-slot"]}))}addSegment(e=null){let s=`segment_${Date.now()}`,r=e||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};r.id||(r.id=s),this.segments.push(r),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let s=this.segments.findIndex(o=>o.id===e);if(s===-1)return;if(this.segments[s].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,s){let r=this.segments.find(o=>o.id===e);r&&(Object.assign(r,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=s=>{let r=s.target.files[0];if(!r)return;let o=new FileReader;o.onload=n=>{try{let a=JSON.parse(n.target.result);Array.isArray(a)?(this.setSegments(a),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",a)}},o.readAsText(r)},e.click()}exportPrompt(){let e=this.getSegments(),s=JSON.stringify(e,null,2),r=new Blob([s],{type:"application/json"}),o=URL.createObjectURL(r),n=document.createElement("a");n.href=o,n.download=`prompt_group_${Date.now()}.json`,n.click(),URL.revokeObjectURL(o),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}destroy(){this.$container&&(ue(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"))}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};function nc(){return`
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
  `}function ac(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function ic(t){return Array.isArray(t)?t.map((e,s)=>({id:`segment_${s}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...vr]}function lc(t){let{constants:e,topLevelWindow:s,modules:r,caches:o,uiState:n}=t,{SCRIPT_ID:a,SCRIPT_VERSION:i,POPUP_ID:l}=e,c={cleanup:null},d={cleanups:[]},u={cleanups:[]},y={current:null};function p(...g){console.log(`[${a}]`,...g)}function f(...g){console.error(`[${a}]`,...g)}function h(g){return typeof g!="string"?"":g.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function m(){return s.jQuery||window.jQuery}function _(){return s.document||document}function M(g){if(!g)return"\u672A\u9009\u62E9\u9875\u9762";let v=r.toolRegistryModule?.getToolConfig(g);if(!v)return g;if(!v.hasSubTabs)return v.name||g;let T=E(g),A=v.subTabs?.find(R=>R.id===T);return A?.name?`${v.name} / ${A.name}`:v.name||g}function w(g){if(!g)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let v=r.toolRegistryModule?.getToolConfig(g);if(!v)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!v.hasSubTabs)return v.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let T=E(g);return v.subTabs?.find(R=>R.id===T)?.description||v.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function E(g,v=""){let T=r.toolRegistryModule?.getToolConfig(g);if(!T?.hasSubTabs||!Array.isArray(T.subTabs)||T.subTabs.length===0)return"";let A=String(v||n.currentSubTab[g]||"").trim(),L=A&&T.subTabs.some(U=>U?.id===A)?A:T.subTabs[0]?.id||"";return L&&n.currentSubTab[g]!==L&&(n.currentSubTab[g]=L),L}function k(){let g=n.currentPopup;if(!g)return;let v=M(n.currentMainTab),T=w(n.currentMainTab),A=g.querySelector(".yyt-popup-active-label");A&&(A.textContent=`\u5F53\u524D\uFF1A${v}`);let R=g.querySelector(".yyt-shell-breadcrumb");R&&(R.textContent=v);let L=g.querySelector(".yyt-shell-main-title");L&&(L.textContent=v);let U=g.querySelector(".yyt-shell-main-description");U&&(U.textContent=T)}function I(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function N(){Array.isArray(d.cleanups)&&(d.cleanups.forEach(g=>{typeof g=="function"&&g()}),d.cleanups=[])}function se(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(g=>{typeof g=="function"&&g()}),u.cleanups=[])}function q(g,v){if(!g||!v)return!1;let T=g.jquery?g[0]:g,A=v.jquery?v[0]:v;return!!(T&&A&&T===A)}function O(g={}){let{container:v=null}=g,T=y.current;if(T&&!(v&&!q(T.container,v))){try{typeof T.destroy=="function"&&T.destroy(T.container)}catch(A){f("\u9500\u6BC1\u52A8\u6001\u9762\u677F host \u5931\u8D25",A)}r.uiModule?.uiManager?.destroyContainerInstance&&r.uiModule.uiManager.destroyContainerInstance(T.container),y.current=null}}function ee(g,v={}){y.current={key:v.key||"",container:g,destroy:typeof v.destroy=="function"?v.destroy:null}}function ve(){let g=m();if(!g||!n.currentPopup)return;let v=r.toolRegistryModule?.getToolList()||[],T=g(n.currentPopup).find(".yyt-main-nav");if(!T.length)return;let A=v.map(L=>`
      <div class="yyt-main-nav-item ${L.id===n.currentMainTab?"active":""}" data-tab="${L.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${h(L.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${h(L.name||L.id)}</span>
          <span class="yyt-main-nav-desc">${h(L.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");T.html(A),g(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let U=g(this).data("tab");U&&Ve(U)});let R=g(n.currentPopup).find(".yyt-shell-sidebar-hint");R.length&&R.text(`${v.length} tabs`)}function _e(){let g=m();if(!g||!n.currentPopup)return;let v=r.toolRegistryModule?.getToolList()||[],T=r.toolRegistryModule?.getToolConfig("tools"),A=Array.isArray(T?.subTabs)?T.subTabs:[],R=A.filter(H=>H?.isCustom).length,L=A.filter(H=>!H?.isCustom).length,U=g(n.currentPopup);U.find(".yyt-shell-topbar-meta").text(`\u4E3B\u9875\u9762 ${v.length} / \u9ED8\u8BA4\u5DE5\u5177 ${L} / \u81EA\u5B9A\u4E49\u5DE5\u5177 ${R}`),U.find(".yyt-shell-stat").eq(0).find(".yyt-shell-stat-value").text(String(v.length)),U.find(".yyt-shell-stat").eq(1).find(".yyt-shell-stat-value").text(String(L)),U.find(".yyt-shell-stat").eq(2).find(".yyt-shell-stat-value").text(String(R))}function Ge(){let g=r.toolRegistryModule?.getToolList()||[];return g.length?(g.some(v=>v.id===n.currentMainTab)||(n.currentMainTab=g[0].id),n.currentMainTab):null}async function G(g={}){let{rebuildNavigation:v=!1,reRenderSubNav:T=!1}=g,A=m();if(!A||!n.currentPopup)return;O();let R=Ge();if(!R)return;v&&(ve(),_e());let L=r.toolRegistryModule?.getToolConfig(R),U=!!L?.hasSubTabs,H=A(n.currentPopup).find(".yyt-sub-nav"),K=A(n.currentPopup).find(".yyt-content-inner");if(v&&K.length){let J=new Set(K.find(".yyt-tab-content").map((fe,$e)=>A($e).data("tab")).get());(r.toolRegistryModule?.getToolList()||[]).forEach(fe=>{J.has(fe.id)||K.append(`<div class="yyt-tab-content" data-tab="${h(fe.id)}"></div>`)}),K.find(".yyt-tab-content").each((fe,$e)=>{let at=A($e).data("tab");(r.toolRegistryModule?.getToolList()||[]).some(Je=>Je.id===at)||A($e).remove()})}A(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),A(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${R}"]`).addClass("active"),A(n.currentPopup).find(".yyt-tab-content").removeClass("active"),A(n.currentPopup).find(`.yyt-tab-content[data-tab="${R}"]`).addClass("active"),U?(H.show(),(T||v)&&Pt(R,L.subTabs)):H.hide(),await Rt(R),k(),ce()}function kt(){if(!n.currentPopup)return;N();let g=()=>{if(n.currentMainTab==="apiPresets"){G();return}n.currentMainTab==="tools"&&G({reRenderSubNav:!0})},v=()=>{n.currentMainTab==="tools"?G({rebuildNavigation:!0,reRenderSubNav:!0}):_e()},T=()=>{n.currentMainTab==="tools"&&G({rebuildNavigation:!1,reRenderSubNav:!1})},A=()=>{(n.currentMainTab==="bypass"||n.currentMainTab==="tools")&&G({reRenderSubNav:n.currentMainTab==="tools"})};[P.PRESET_CREATED,P.PRESET_UPDATED,P.PRESET_DELETED].forEach(R=>{d.cleanups.push($.on(R,g))}),[P.TOOL_REGISTERED,P.TOOL_UPDATED,P.TOOL_UNREGISTERED].forEach(R=>{d.cleanups.push($.on(R,v))}),d.cleanups.push($.on(P.TOOL_RUNTIME_UPDATED,T)),[P.BYPASS_PRESET_CREATED,P.BYPASS_PRESET_UPDATED,P.BYPASS_PRESET_DELETED].forEach(R=>{d.cleanups.push($.on(R,A))})}function It(g){return!!g?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown",".yyt-select-portal-layer"].join(","))}function Ct(g){let v=g?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return v?v.scrollHeight>v.clientHeight+2||v.scrollWidth>v.clientWidth+2:!1}function ft(g,v){return v?.closest?.(".yyt-scrollable-surface")===g}function le(g,v){if(!g||!v)return null;let T=v.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return T&&(T.classList?.contains("yyt-select-portal-layer")||g.contains(T))&&(T.scrollHeight>T.clientHeight+2||T.scrollWidth>T.clientWidth+2)?T:[v.closest?.(".yyt-tool-list"),v.closest?.(".yyt-settings-content"),v.closest?.(".yyt-sub-content"),v.closest?.(".yyt-tab-content.active"),g].filter(Boolean).find(R=>R!==g&&!g.contains(R)?!1:R.scrollHeight>R.clientHeight+2||R.scrollWidth>R.clientWidth+2)||g}function V({mainTab:g=null,includeSubContent:v=!1}={}){let T=n.currentPopup;if(!T)return;let A=T.querySelector(".yyt-content");A&&(A.scrollTop=0,A.scrollLeft=0);let R=g?`.yyt-tab-content[data-tab="${g}"]`:".yyt-tab-content.active",L=T.querySelector(R);if(L&&(L.scrollTop=0,L.scrollLeft=0),!v)return;(L?.querySelectorAll(".yyt-sub-content")||[]).forEach(H=>{H.scrollTop=0,H.scrollLeft=0})}function mt(g){let v=_();if(!g||!v)return;g.classList.add("yyt-scrollable-surface");let T=!1,A=!1,R=0,L=0,U=0,H=0,K=!1,J=!1,fe=()=>{T=!1,A=!1,g.classList.remove("yyt-scroll-dragging")},$e=F=>{F.button===0&&(It(F.target)||ft(g,F.target)&&(K=g.scrollWidth>g.clientWidth+2,J=g.scrollHeight>g.clientHeight+2,!(!K&&!J)&&(F.stopPropagation(),T=!0,A=!1,R=F.clientX,L=F.clientY,U=g.scrollLeft,H=g.scrollTop)))},at=F=>{if(!T)return;let Ot=F.clientX-R,Ae=F.clientY-L;!(Math.abs(Ot)>4||Math.abs(Ae)>4)&&!A||(A=!0,g.classList.add("yyt-scroll-dragging"),K&&(g.scrollLeft=U-Ot),J&&(g.scrollTop=H-Ae),F.preventDefault())},Je=()=>{fe()},ht=F=>{if(F.ctrlKey||Ct(F.target)||!g.classList.contains("yyt-content")&&!ft(g,F.target))return;let Ae=le(g,F.target);!Ae||Ae!==g&&!g.contains(Ae)||!(Ae.scrollHeight>Ae.clientHeight+2||Ae.scrollWidth>Ae.clientWidth+2)||(Math.abs(F.deltaY)>0&&(Ae.scrollTop+=F.deltaY),Math.abs(F.deltaX)>0&&(Ae.scrollLeft+=F.deltaX),F.preventDefault(),F.stopPropagation())},Y=F=>{A&&F.preventDefault()};g.addEventListener("mousedown",$e),g.addEventListener("wheel",ht,{passive:!1}),g.addEventListener("dragstart",Y),v.addEventListener("mousemove",at),v.addEventListener("mouseup",Je),u.cleanups.push(()=>{fe(),g.classList.remove("yyt-scrollable-surface"),g.removeEventListener("mousedown",$e),g.removeEventListener("wheel",ht),g.removeEventListener("dragstart",Y),v.removeEventListener("mousemove",at),v.removeEventListener("mouseup",Je)})}function ce(){let g=n.currentPopup;if(!g)return;se();let v=[...g.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...g.querySelectorAll(".yyt-sub-nav"),...g.querySelectorAll(".yyt-content"),...g.querySelectorAll(".yyt-settings-content"),...g.querySelectorAll(".yyt-tool-list")];[...new Set(v)].forEach(mt)}function xe(g){return`
      <div class="yyt-startup-screen" data-yyt-startup-screen>
        <div class="yyt-startup-screen-inner">
          <div class="yyt-startup-screen-kicker">Welcome</div>
          <div class="yyt-startup-screen-title">YouYou \u5DE5\u5177\u7BB1</div>
          <div class="yyt-startup-screen-desc">\u96C6\u4E2D\u7BA1\u7406 API \u9884\u8BBE\u3001\u81EA\u5B9A\u4E49\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001Ai\u6307\u4EE4\u9884\u8BBE\u4E0E\u8BCA\u65AD\u6D41\u7A0B\u3002\u6BCF\u6B21\u5237\u65B0\u540E\u90FD\u4F1A\u91CD\u65B0\u663E\u793A\uFF0C\u4FBF\u4E8E\u5FEB\u901F\u56DE\u5230\u4ECB\u7ECD\u5165\u53E3\u3002</div>
          <div class="yyt-startup-screen-modules">
            ${(g||[]).slice(0,6).map(T=>`
      <div class="yyt-startup-module-chip">
        <i class="fa-solid ${h(T.icon||"fa-file")}"></i>
        <span>${h(T.name||T.id)}</span>
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
    `}function nt(g){let v=m();if(!v||!n.currentPopup||n.startupScreenDismissed)return;let T=v(n.currentPopup).find(".yyt-popup-body"),A=T.find(".yyt-popup-shell");!T.length||!A.length||T.find("[data-yyt-startup-screen]").length||(A.attr("data-yyt-startup-visible","true"),T.prepend(xe(g)),T.find(".yyt-startup-enter").on("click",()=>{T.find("[data-yyt-startup-screen]").remove(),A.removeAttr("data-yyt-startup-visible"),n.startupScreenDismissed=!0,ce()}))}function Ds(){let g=_(),v=n.currentPopup,T=v?.querySelector(".yyt-popup-header");if(!v||!T||!g)return;let A=!1,R=0,L=0,U=0,H=0,K="",J=()=>({width:s.innerWidth||g.documentElement?.clientWidth||window.innerWidth||0,height:s.innerHeight||g.documentElement?.clientHeight||window.innerHeight||0}),fe=(Y,F,Ot)=>Math.min(Math.max(Y,F),Ot),$e=()=>{A&&(A=!1,v.classList.remove("yyt-popup-dragging"),g.body.style.userSelect=K)},at=Y=>{if(!A||!n.currentPopup)return;let F=Y.clientX-R,Ot=Y.clientY-L,{width:Ae,height:Oo}=J(),yc=v.offsetWidth||0,pc=v.offsetHeight||0,gc=Math.max(0,Ae-yc),fc=Math.max(0,Oo-pc);v.style.left=`${fe(U+F,0,gc)}px`,v.style.top=`${fe(H+Ot,0,fc)}px`,v.style.transform="none",v.style.right="auto",v.style.bottom="auto"},Je=()=>{$e()},ht=Y=>{if(Y.button!==0||Y.target?.closest(".yyt-popup-close"))return;A=!0,R=Y.clientX,L=Y.clientY;let F=v.getBoundingClientRect();U=F.left,H=F.top,v.style.left=`${F.left}px`,v.style.top=`${F.top}px`,v.style.transform="none",v.style.right="auto",v.style.bottom="auto",v.classList.add("yyt-popup-dragging"),K=g.body.style.userSelect||"",g.body.style.userSelect="none",Y.preventDefault()};T.addEventListener("mousedown",ht),g.addEventListener("mousemove",at),g.addEventListener("mouseup",Je),c.cleanup=()=>{$e(),T.removeEventListener("mousedown",ht),g.removeEventListener("mousemove",at),g.removeEventListener("mouseup",Je)}}function bt(){O(),I(),N(),se();let g=m();if(g&&n.currentPopup){let v=g(n.currentPopup);ue(v,"yytPopupToolConfigSelect"),ue(v,"yytPromptEditorSelect")}n.currentPopup&&(n.currentPopup.remove(),n.currentPopup=null),n.currentOverlay&&(n.currentOverlay.remove(),n.currentOverlay=null),p("\u5F39\u7A97\u5DF2\u5173\u95ED")}function Ve(g){O(),n.currentMainTab=g;let v=m();if(!v||!n.currentPopup)return;V({mainTab:g,includeSubContent:!0}),v(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),v(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${g}"]`).addClass("active");let T=r.toolRegistryModule?.getToolConfig(g);T?.hasSubTabs?(v(n.currentPopup).find(".yyt-sub-nav").show(),Pt(g,T.subTabs)):v(n.currentPopup).find(".yyt-sub-nav").hide(),v(n.currentPopup).find(".yyt-tab-content").removeClass("active"),v(n.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`).addClass("active"),Rt(g),k(),ce()}function cs(g,v){O(),n.currentSubTab[g]=v;let T=m();!T||!n.currentPopup||(V({mainTab:g,includeSubContent:!0}),T(n.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),T(n.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${v}"]`).addClass("active"),$t(g,v),k(),ce())}function Pt(g,v){let T=m();if(!T||!n.currentPopup||!v)return;let A=E(g,n.currentSubTab[g]||v[0]?.id),L=(g==="tools"?[{key:"ai",title:"AI \u5DE5\u5177",items:v.filter(U=>(U?.toolKind||"ai")!=="script")},{key:"script",title:"\u811A\u672C\u5DE5\u5177",items:v.filter(U=>U?.toolKind==="script")}].filter(U=>U.items.length>0):[{key:"default",title:"",items:v}]).map(U=>{let H=U.title?`<div class="yyt-sub-nav-group-title">${h(U.title)}</div>`:"",K=U.items.map(J=>`
        <div class="yyt-sub-nav-item ${J.id===A?"active":""}" data-subtab="${J.id}">
          <i class="fa-solid ${J.icon||"fa-file"}"></i>
          <span>${h(J.name||J.id)}</span>
        </div>
      `).join("");return`
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${U.key}">
          ${H}
          <div class="yyt-sub-nav-group-items">
            ${K}
          </div>
        </div>
      `}).join("");T(n.currentPopup).find(".yyt-sub-nav").html(L),T(n.currentPopup).find(".yyt-sub-nav-item").on("click",function(){let H=T(this).data("subtab");cs(g,H)}),ce()}async function Rt(g){let v=m();if(!v||!n.currentPopup)return;let T=v(n.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!T.length)return;let A=r.toolRegistryModule?.getToolConfig(g);switch(g){case"apiPresets":r.uiModule?.renderApiPanel?r.uiModule.renderApiPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>API \u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"toolManage":r.uiModule?.renderToolPanel?r.uiModule.renderToolPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u7BA1\u7406\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"regexExtract":r.uiModule?.renderRegexPanel?r.uiModule.renderRegexPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6B63\u5219\u63D0\u53D6\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"tools":{let R=E(g);A?.hasSubTabs&&R?await $t(g,R):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break}case"tableWorkbench":r.uiModule?.renderTableWorkbenchPanel?r.uiModule.renderTableWorkbenchPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u586B\u8868\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":r.uiModule?.renderBypassPanel?r.uiModule.renderBypassPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>Ai\u6307\u4EE4\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"settings":r.uiModule?.renderSettingsPanel?r.uiModule.renderSettingsPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:Ns(g,T);break}ce()}async function $t(g,v){let T=m();if(!T||!n.currentPopup)return;let A=T(n.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!A.length)return;let R=r.toolRegistryModule?.getToolConfig(g);if(R?.hasSubTabs){let U=E(g,v),H=R.subTabs?.find(J=>J.id===U),K=A.find(".yyt-sub-content");if(K.length||(A.html('<div class="yyt-sub-content"></div>'),K=A.find(".yyt-sub-content")),!H){K.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5F53\u524D\u5B50\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u5931\u6548</span></div>'),V({mainTab:g,includeSubContent:!0}),ce();return}switch(H.component){case"SummaryToolPanel":{O({container:K}),r.uiModule?.renderSummaryToolPanel?(r.uiModule.renderSummaryToolPanel(K),ee(K,{key:"SummaryToolPanel"})):K.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>');break}case"StatusBlockPanel":{O({container:K}),r.uiModule?.renderStatusBlockPanel?(r.uiModule.renderStatusBlockPanel(K),ee(K,{key:"StatusBlockPanel"})):K.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>');break}case"YouyouReviewPanel":{O({container:K}),r.uiModule?.renderYouyouReviewPanel?(r.uiModule.renderYouyouReviewPanel(K),ee(K,{key:"YouyouReviewPanel"})):K.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25</span></div>');break}case"EscapeTransformToolPanel":{O({container:K}),r.uiModule?.renderEscapeTransformToolPanel?(r.uiModule.renderEscapeTransformToolPanel(K),ee(K,{key:"EscapeTransformToolPanel"})):K.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>');break}case"PunctuationTransformToolPanel":{O({container:K}),r.uiModule?.renderPunctuationTransformToolPanel?(r.uiModule.renderPunctuationTransformToolPanel(K),ee(K,{key:"PunctuationTransformToolPanel"})):K.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>');break}case"GenericToolConfigPanel":await Os(H,K);break;default:K.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}V({mainTab:g,includeSubContent:!0}),ce();return}let L=A.find(".yyt-sub-content");if(L.length){switch(O({container:L}),v){case"config":Sr(g,L);break;case"prompts":await Tr(g,L);break;case"presets":Dt(g,L);break;default:L.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}V({mainTab:g,includeSubContent:!0}),ce()}}async function Os(g,v){if(!(!m()||!v?.length||!g?.id)){O({container:v});try{let A=o.dynamicToolPanelCache.get(g.id);if(!A){let U=(await Promise.resolve().then(()=>(es(),ji)))?.createToolConfigPanel;if(typeof U!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");A=()=>U({id:`${g.id}Panel`,toolId:g.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${g.name||g.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${g.id}-extraction-preview`,previewTitle:`${g.name||g.id} \u63D0\u53D6\u9884\u89C8`}),o.dynamicToolPanelCache.set(g.id,A)}let R=A();R.renderTo(v),ee(v,{key:g.id,destroy:typeof R?.destroy=="function"?L=>R.destroy(L):null}),ce()}catch(A){y.current=null,console.error(`[${a}] \u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,A),v.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}}function Ns(g,v){if(!m())return;let A=r.toolRegistryModule?.getToolConfig(g);if(!A){v.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let R=n.currentSubTab[g]||A.subTabs?.[0]?.id||"config";v.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${R}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),$t(g,R)}function Sr(g,v){if(!m())return;let A=r.toolManagerModule?.getTool(g),R=r.presetManagerModule?.getAllPresets()||[],L=r.toolRegistryModule?.getToolApiPreset(g)||"",U=R.map(H=>`<option value="${h(H.name)}" ${H.name===L?"selected":""}>${h(H.name)}</option>`).join("");v.html(`
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
              ${U}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${A?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${A?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),we(v,{namespace:"yytPopupToolConfigSelect",selectors:["#yyt-tool-api-preset"]}),v.find("#yyt-save-tool-preset").on("click",function(){let K=v.find("#yyt-tool-api-preset").val();r.toolRegistryModule?.setToolApiPreset(g,K);let J=s.toastr;J&&J.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function Tr(g,v){if(!m()){v.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let R=r.toolManagerModule?.getTool(g)?.config?.messages||[],L=ic(R)||vr,U=new $o({containerId:`yyt-prompt-editor-${g}`,segments:L,onChange:K=>{let J=ac(K);p("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",J.length,"\u6761\u6D88\u606F")}});v.html(`<div id="yyt-prompt-editor-${g}" class="yyt-prompt-editor-container"></div>`),U.init(v.find(`#yyt-prompt-editor-${g}`));let H=nc();if(H){let K="yyt-prompt-editor-styles",J=s.document||document;if(!J.getElementById(K)){let fe=J.createElement("style");fe.id=K,fe.textContent=H,(J.head||J.documentElement).appendChild(fe)}}}function Dt(g,v){m()&&v.html(`
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
    `)}async function uc(){if(n.currentPopup){p("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let g=t?.services?.loadModules;typeof g=="function"&&await g();let v=m(),T=_();if(!v){f("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let A=r.toolRegistryModule?.getToolList()||[];if(!A.length){f("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}A.some(Y=>Y.id===n.currentMainTab)||(n.currentMainTab=A[0].id);let R=r.toolRegistryModule?.getToolConfig("tools"),L=Array.isArray(R?.subTabs)?R.subTabs:[],U=L.filter(Y=>Y?.isCustom).length,H=L.filter(Y=>!Y?.isCustom).length,K=M(n.currentMainTab),J=w(n.currentMainTab);n.currentOverlay=T.createElement("div"),n.currentOverlay.className="yyt-popup-overlay",n.currentOverlay.addEventListener("click",Y=>{Y.target===n.currentOverlay&&bt()}),T.body.appendChild(n.currentOverlay);let fe=A.map(Y=>`
      <div class="yyt-main-nav-item ${Y.id===n.currentMainTab?"active":""}" data-tab="${Y.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${h(Y.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${h(Y.name||Y.id)}</span>
          <span class="yyt-main-nav-desc">${h(Y.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join(""),$e=A.map(Y=>`
      <div class="yyt-tab-content ${Y.id===n.currentMainTab?"active":""}" data-tab="${Y.id}">
        <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
      </div>
    `).join(""),at=`
      <div class="yyt-popup" id="${l}">
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
        </div>

        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-topbar">
              <div class="yyt-shell-topbar-main">
                <div class="yyt-shell-kicker">Workspace</div>
                <div class="yyt-shell-topbar-summary">
                  <div class="yyt-shell-topbar-title">\u5DE5\u4F5C\u53F0\u6982\u89C8</div>
                  <div class="yyt-shell-topbar-meta">\u4E3B\u9875\u9762 ${A.length} / \u9ED8\u8BA4\u5DE5\u5177 ${H} / \u81EA\u5B9A\u4E49\u5DE5\u5177 ${U}</div>
                </div>
              </div>
              <div class="yyt-shell-stats">
                <div class="yyt-shell-stat">
                  <span class="yyt-shell-stat-label">\u4E3B\u9875\u9762</span>
                  <strong class="yyt-shell-stat-value">${A.length}</strong>
                </div>
                <div class="yyt-shell-stat">
                  <span class="yyt-shell-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
                  <strong class="yyt-shell-stat-value">${H}</strong>
                </div>
                <div class="yyt-shell-stat">
                  <span class="yyt-shell-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
                  <strong class="yyt-shell-stat-value">${U}</strong>
                </div>
              </div>
            </div>

            <div class="yyt-shell-workspace">
              <aside class="yyt-shell-sidebar">
                <div class="yyt-shell-sidebar-card">
                  <div class="yyt-shell-sidebar-title-row">
                    <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
                    <span class="yyt-shell-sidebar-hint">${A.length} tabs</span>
                  </div>
                  <div class="yyt-main-nav">
                    ${fe}
                  </div>
                  <div class="yyt-shell-sidebar-note">
                    \u4FDD\u5B58\u540E\uFF0C\u624B\u52A8\u6267\u884C\u4E0E\u5199\u56DE\u94FE\u90FD\u4F1A\u4EE5\u6700\u65B0\u914D\u7F6E\u4E3A\u51C6\u3002
                  </div>
                </div>
              </aside>

              <section class="yyt-shell-main">
                <div class="yyt-shell-main-header">
                  <div class="yyt-shell-main-heading-block">
                    <div class="yyt-shell-main-label-row">
                      <div class="yyt-shell-main-label">\u5F53\u524D\u9875\u9762</div>
                      <div class="yyt-shell-breadcrumb">${h(K)}</div>
                    </div>
                    <div class="yyt-shell-main-title">${h(K)}</div>
                    <div class="yyt-shell-main-description">${h(J)}</div>
                  </div>
                  <div class="yyt-shell-main-actions">
                    <div class="yyt-shell-main-meta">
                      <i class="fa-solid fa-circle-info"></i>
                      <span>\u4FDD\u5B58\u540E\u6267\u884C\u94FE\u4F1A\u7ACB\u5373\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
                    </div>
                  </div>
                </div>

                <div class="yyt-sub-nav" style="display: none;">
                  <!-- \u6B21\u7EA7\u9876\u680F\u5C06\u52A8\u6001\u6E32\u67D3 -->
                </div>

                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${$e}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div class="yyt-popup-footer">
          <div class="yyt-popup-footer-left">
            <div class="yyt-popup-status-cluster">
              <div class="yyt-popup-status">
                <i class="fa-solid fa-compass"></i>
                <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${h(K)}</span>
              </div>
              <div class="yyt-popup-footer-note">
                API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
              </div>
            </div>
          </div>
          <div class="yyt-popup-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${a}-close-btn">\u5173\u95ED</button>
          </div>
        </div>
      </div>
    `,Je=T.createElement("div");Je.innerHTML=at,n.currentPopup=Je.firstElementChild,T.body.appendChild(n.currentPopup),v(n.currentPopup).find(".yyt-popup-close").on("click",bt),v(n.currentPopup).find(`#${a}-close-btn`).on("click",bt),kt(),v(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let F=v(this).data("tab");F&&Ve(F)}),Ds(),Rt(n.currentMainTab);let ht=r.toolRegistryModule?.getToolConfig(n.currentMainTab);ht?.hasSubTabs&&(v(n.currentPopup).find(".yyt-sub-nav").show(),Pt(n.currentMainTab,ht.subTabs)),k(),nt(A),ce(),p("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:uc,closePopup:bt,switchMainTab:Ve,switchSubTab:cs,renderTabContent:Rt,renderSubTabContent:$t}}function cc(t,e={}){let{constants:s,modules:r}=t,{SCRIPT_ID:o,SCRIPT_VERSION:n}=s,{init:a,loadModules:i,addMenuItem:l,popupShell:c}=e;return{version:n,id:o,init:a,openPopup:c?.openPopup,closePopup:c?.closePopup,switchMainTab:c?.switchMainTab,switchSubTab:c?.switchSubTab,addMenuItem:l,getStorage:()=>r.storageModule,getApiConnection:()=>r.apiConnectionModule,getPresetManager:()=>r.presetManagerModule,getUi:()=>r.uiModule,getUiModule:()=>r.uiModule,getRegexExtractor:()=>r.regexExtractorModule,getToolManager:()=>r.toolManagerModule,getToolExecutor:()=>r.toolExecutorModule,getWindowManager:()=>r.windowManagerModule,getToolRegistry:()=>r.toolRegistryModule,getSettingsService:()=>r.settingsServiceModule,getBypassManager:()=>r.bypassManagerModule,getVariableResolver:()=>r.variableResolverModule,getContextInjector:()=>r.contextInjectorModule,getToolPromptService:()=>r.toolPromptServiceModule,getToolOutputService:()=>r.toolOutputServiceModule,getToolAutomationService:()=>r.toolAutomationServiceModule,async getApiConfig(){return await i(),r.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(d){return await i(),r.apiConnectionModule?(r.apiConnectionModule.updateApiConfig(d),!0):!1},async getPresets(){return await i(),r.presetManagerModule?r.presetManagerModule.getAllPresets():[]},async sendApiRequest(d,u){if(await i(),r.apiConnectionModule)return r.apiConnectionModule.sendApiRequest(d,u);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),r.apiConnectionModule?r.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(d,u){return r.toolRegistryModule?.registerTool(d,u)||!1},unregisterTool(d){return r.toolRegistryModule?.unregisterTool(d)||!1},getToolList(){return r.toolRegistryModule?.getToolList()||[]},createWindow(d){return r.windowManagerModule?.createWindow(d)||null},closeWindow(d){r.windowManagerModule?.closeWindow(d)},startAutomation(){return r.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){r.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return r.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},cancelAutomation(d={}){return r.toolAutomationServiceModule?.toolAutomationService?.cancelAutomation?.(d)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}},async processCurrentAssistantMessage(d={}){return r.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(d)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var wr="youyou_toolkit",Yy="1.0.67",qy=`${wr}-menu-item`,Gy=`${wr}-menu-container`,Vy=`${wr}-popup`,Jy=typeof window.parent<"u"?window.parent:window,Do={constants:{SCRIPT_ID:wr,SCRIPT_VERSION:Yy,MENU_ITEM_ID:qy,MENU_CONTAINER_ID:Gy,POPUP_ID:Vy},topLevelWindow:Jy,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"apiPresets",currentSubTab:{},startupScreenDismissed:!1}},dc=lc(Do),xr=oc(Do,{openPopup:dc.openPopup});Do.services.loadModules=xr.loadModules;var sa=cc(Do,{init:xr.init,loadModules:xr.loadModules,addMenuItem:xr.addMenuItem,popupShell:dc});if(typeof window<"u"&&(window.YouYouToolkit=sa,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=sa}catch{}var mm=sa;xr.init();console.log(`[${wr}] \u6A21\u5757\u52A0\u8F7D\u5B8C\u6210`);export{mm as default};
