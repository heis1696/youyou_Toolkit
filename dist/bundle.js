var It=Object.defineProperty;var D=(t,e)=>()=>(t&&(e=t(t=0)),e);var Y=(t,e)=>{for(var s in e)It(t,s,{get:e[s],enumerable:!0})};var mt={};Y(mt,{DEFAULT_API_PRESETS:()=>ut,DEFAULT_SETTINGS:()=>q,STORAGE_KEYS:()=>A,deepMerge:()=>W,getCurrentPresetName:()=>I,loadApiPresets:()=>u,loadSettings:()=>x,saveApiPresets:()=>w,saveSettings:()=>G,setCurrentPresetName:()=>T});function Tt(){try{let t=typeof window.parent<"u"?window.parent:window;if(t.SillyTavern?.getContext){let s=t.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings}if(t.extension_settings)return t.extension_settings;let e=t.jQuery||window.jQuery;return null}catch(t){return console.warn("[YouYouToolkit] \u65E0\u6CD5\u83B7\u53D6SillyTavern extensionSettings:",t),null}}function yt(){try{let t=typeof window.parent<"u"?window.parent:window;if(typeof t.saveSettings=="function")return t.saveSettings;if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(typeof e.saveSettings=="function")return e.saveSettings;if(typeof e.saveSettingsDebounced=="function")return e.saveSettingsDebounced}return null}catch{return null}}function S(){let t=Tt(),e="youyou_toolkit";return t?(t[e]||(t[e]={}),{getItem:s=>{let n=t[e][s];return typeof n=="string"?n:n?JSON.stringify(n):null},setItem:(s,n)=>{t[e][s]=n;let i=yt();if(i)try{i()}catch(a){console.warn("[YouYouToolkit] \u4FDD\u5B58\u8BBE\u7F6E\u5931\u8D25:",a)}},removeItem:s=>{delete t[e][s];let n=yt();if(n)try{n()}catch{}},_isTavern:!0}):(console.warn("[YouYouToolkit] \u4F7F\u7528localStorage\u4F5C\u4E3A\u56DE\u9000\u5B58\u50A8"),{getItem:s=>{try{return localStorage.getItem(s)}catch{return null}},setItem:(s,n)=>{try{localStorage.setItem(s,n)}catch(i){console.error("[YouYouToolkit] localStorage\u5199\u5165\u5931\u8D25:",i)}},removeItem:s=>{try{localStorage.removeItem(s)}catch{}},_isTavern:!1})}function ft(t,e=null){if(!t||typeof t!="string")return e;try{return JSON.parse(t)}catch{return e}}function gt(t,e="{}"){try{return JSON.stringify(t)}catch{return e}}function x(){let e=S().getItem(A.SETTINGS);if(e){let s=ft(e,null);if(s&&typeof s=="object")return W(JSON.parse(JSON.stringify(q)),s)}return JSON.parse(JSON.stringify(q))}function G(t){S().setItem(A.SETTINGS,gt(t))}function u(){let e=S().getItem(A.API_PRESETS);if(e){let s=ft(e,null);if(Array.isArray(s))return s}return JSON.parse(JSON.stringify(ut))}function w(t){S().setItem(A.API_PRESETS,gt(t))}function I(){return S().getItem(A.CURRENT_PRESET)||""}function T(t){S().setItem(A.CURRENT_PRESET,t||"")}function W(t,e){let s=i=>i&&typeof i=="object"&&!Array.isArray(i),n={...t};return s(t)&&s(e)&&Object.keys(e).forEach(i=>{s(e[i])?i in t?n[i]=W(t[i],e[i]):Object.assign(n,{[i]:e[i]}):Object.assign(n,{[i]:e[i]})}),n}var A,q,ut,j=D(()=>{A={SETTINGS:"youyou_toolkit_settings",API_PRESETS:"youyou_toolkit_api_presets",CURRENT_PRESET:"youyou_toolkit_current_preset"},q={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},ut=[]});var Z={};Y(Z,{API_STATUS:()=>Et,fetchAvailableModels:()=>X,getApiConfig:()=>b,getEffectiveApiConfig:()=>_t,sendApiRequest:()=>bt,testApiConnection:()=>V,updateApiConfig:()=>U,validateApiConfig:()=>z});function b(){return x().apiConfig||{}}function U(t){let e=x();e.apiConfig={...e.apiConfig,...t},G(e)}function z(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function _t(t=""){let e=x();if(t){let n=(e.apiPresets||[]).find(i=>i.name===t);if(n&&n.apiConfig)return{...n.apiConfig,presetName:n.name}}return e.apiConfig||{}}function jt(t,e={}){let s=e.apiConfig||b();return{messages:t,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:!1,...e.extraParams}}async function bt(t,e={},s=null){let n=e.apiConfig||b(),i=n.useMainApi,a=z(n);if(!a.valid&&!i)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${a.errors.join(", ")}`);return i?await Mt(t,e,s):await Rt(t,n,e,s)}async function Mt(t,e,s){let n=typeof window.parent<"u"?window.parent:window;if(!n.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let i=await n.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,...e.extraParams});if(typeof i!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return i.trim()}catch(i){throw i.name==="AbortError"?i:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${i.message}`)}}async function Rt(t,e,s,n){let i=jt(t,{apiConfig:e,...s}),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let r=await fetch(e.url,{method:"POST",headers:a,body:JSON.stringify(i),signal:n});if(!r.ok){let St=await r.text().catch(()=>"Unknown error");throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${r.status}): ${St}`)}let l=await r.json(),m="";if(l.choices&&l.choices[0]?.message?.content)m=l.choices[0].message.content;else if(l.content)m=l.content;else if(l.text)m=l.text;else if(l.response)m=l.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(l).slice(0,200)}`);return m.trim()}async function V(t=null){let e=t||b(),s=Date.now();try{await bt([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let i=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${i}ms)`,latency:i}}catch(n){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${n.message}`,latency:Date.now()-s}}}async function X(t=null){let e=t||b();return e.useMainApi?await Nt():await Ot(e)}async function Nt(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function Ot(t){if(!t.url||!t.apiKey)return[];try{let s=`${t.url.replace(/\/chat\/completions$/,"").replace(/\/completions$/,"")}/models`,n=await fetch(s,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!n.ok)return[];let i=await n.json();return i.data&&Array.isArray(i.data)?i.data.map(a=>a.id||a.name).filter(Boolean).sort():[]}catch{return[]}}var Et,Q=D(()=>{j();Et={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var xt={};Y(xt,{createPreset:()=>vt,createPresetFromCurrentConfig:()=>rt,deletePreset:()=>nt,duplicatePreset:()=>Yt,exportPresets:()=>at,generateUniquePresetName:()=>N,getActiveConfig:()=>ot,getActivePresetName:()=>J,getAllPresets:()=>tt,getPreset:()=>R,getPresetNames:()=>et,importPresets:()=>L,presetExists:()=>M,renamePreset:()=>Dt,switchToPreset:()=>it,updatePreset:()=>st,validatePreset:()=>Ut});function tt(){return u()}function et(){return u().map(e=>e.name)}function R(t){return!t||typeof t!="string"?null:u().find(s=>s.name===t)||null}function M(t){return!t||typeof t!="string"?!1:u().some(s=>s.name===t)}function vt(t){let{name:e,description:s,apiConfig:n}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let i=e.trim();if(M(i))return{success:!1,message:`\u9884\u8BBE "${i}" \u5DF2\u5B58\u5728`};let a={name:i,description:s||"",apiConfig:{url:n?.url||"",apiKey:n?.apiKey||"",model:n?.model||"",useMainApi:n?.useMainApi??!0,max_tokens:n?.max_tokens||4096,temperature:n?.temperature??.7,top_p:n?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},r=u();return r.push(a),w(r),{success:!0,message:`\u9884\u8BBE "${i}" \u521B\u5EFA\u6210\u529F`,preset:a}}function st(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=u(),n=s.findIndex(r=>r.name===t);if(n===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let i=s[n],a={...i,...e,name:i.name,updatedAt:Date.now()};return e.apiConfig&&(a.apiConfig={...i.apiConfig,...e.apiConfig}),s[n]=a,w(s),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:a}}function nt(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=u(),s=e.findIndex(n=>n.name===t);return s===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(s,1),w(e),I()===t&&T(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function Dt(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(!M(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(M(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n=u(),i=n.find(a=>a.name===t);return i&&(i.name=s,i.updatedAt=Date.now(),w(n),I()===t&&T(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function Yt(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim(),n=R(t);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(M(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let i={...JSON.parse(JSON.stringify(n)),name:s,createdAt:Date.now(),updatedAt:Date.now()},a=u();return a.push(i),w(a),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:i}}function it(t){if(!t)return T(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=R(t);return e?(T(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function J(){return I()}function ot(){let t=I();if(t){let s=R(t);if(s)return{presetName:t,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:x().apiConfig||{}}}function at(t=null){if(t){let s=R(t);if(!s)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let e=u();return JSON.stringify(e,null,2)}function L(t,e={overwrite:!1}){let s;try{s=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(s)?s:[s];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let i=u(),a=0;for(let r of n){if(!r.name||typeof r.name!="string"||!r.apiConfig||typeof r.apiConfig!="object")continue;let l=i.findIndex(m=>m.name===r.name);l>=0?e.overwrite&&(r.updatedAt=Date.now(),i[l]=r,a++):(r.createdAt=r.createdAt||Date.now(),r.updatedAt=Date.now(),i.push(r),a++)}return a>0&&w(i),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u9884\u8BBE`,imported:a}}function rt(t,e=""){let s=x();return vt({name:t,description:e,apiConfig:s.apiConfig})}function Ut(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function N(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=u(),s=new Set(e.map(i=>i.name));if(!s.has(t))return t;let n=1;for(;s.has(`${t} (${n})`);)n++;return`${t} (${n})`}var ct=D(()=>{j()});var ht={};Y(ht,{getCurrentTab:()=>Vt,getStyles:()=>Wt,render:()=>v,setCurrentTab:()=>Xt});function d(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function p(t,e,s=3e3){let n=typeof window.parent<"u"?window.parent:window;if(n.toastr){n.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}console.log(`[${t.toUpperCase()}] ${e}`)}function zt(){return`<div class="yyt-tab-nav">${[{id:"api",name:"API\u914D\u7F6E",icon:"fa-plug"},{id:"presets",name:"\u9884\u8BBE\u7BA1\u7406",icon:"fa-bookmark"},{id:"test",name:"\u8FDE\u63A5\u6D4B\u8BD5",icon:"fa-flask"}].map(s=>`
    <div class="yyt-tab-item ${C===s.id?"active":""}" data-tab="${s.id}">
      <i class="fa-solid ${s.icon}"></i>
      <span>${s.name}</span>
    </div>
  `).join("")}</div>`}function Qt(){switch(C){case"api":return Jt();case"presets":return Lt();case"test":return Ft();default:return""}}function Jt(){let t=b(),s=ot().presetName;return`
    <div class="yyt-panel">
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-circle-info"></i>
          <span>\u5F53\u524D\u72B6\u6001</span>
        </div>
        <div class="yyt-status-bar">
          ${s?`<span class="yyt-badge yyt-badge-info">\u4F7F\u7528\u9884\u8BBE: ${d(s)}</span>`:'<span class="yyt-badge yyt-badge-default">\u4F7F\u7528\u5F53\u524D\u914D\u7F6E</span>'}
        </div>
      </div>
      
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-sliders"></i>
          <span>API\u914D\u7F6E</span>
        </div>
        
        <div class="yyt-form-group">
          <label class="yyt-checkbox-label">
            <input type="checkbox" id="${o}-use-main-api" ${t.useMainApi?"checked":""}>
            <span>\u4F7F\u7528SillyTavern\u4E3BAPI</span>
          </label>
          <div class="yyt-hint">\u52FE\u9009\u540E\u5C06\u4F7F\u7528SillyTavern\u5185\u7F6E\u7684API\u914D\u7F6E</div>
        </div>
        
        <div id="${o}-custom-api-fields" class="${t.useMainApi?"yyt-disabled":""}">
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label for="${o}-api-url">API URL</label>
              <input type="text" class="yyt-input" id="${o}-api-url" 
                     value="${d(t.url||"")}" 
                     placeholder="https://api.openai.com/v1/chat/completions">
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label for="${o}-api-key">API Key</label>
              <div class="yyt-input-group">
                <input type="password" class="yyt-input" id="${o}-api-key" 
                       value="${d(t.apiKey||"")}" 
                       placeholder="sk-...">
                <button class="yyt-btn yyt-btn-icon" id="${o}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                  <i class="fa-solid fa-eye"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label for="${o}-model">\u6A21\u578B</label>
              <div class="yyt-input-group">
                <input type="text" class="yyt-input" id="${o}-model" 
                       value="${d(t.model||"")}" 
                       placeholder="gpt-4">
                <button class="yyt-btn yyt-btn-secondary" id="${o}-load-models" title="\u52A0\u8F7D\u6A21\u578B\u5217\u8868">
                  <i class="fa-solid fa-refresh"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="yyt-form-row yyt-form-row-2col">
            <div class="yyt-form-group">
              <label for="${o}-max-tokens">Max Tokens</label>
              <input type="number" class="yyt-input" id="${o}-max-tokens" 
                     value="${t.max_tokens||4096}" min="1" max="128000">
            </div>
            
            <div class="yyt-form-group">
              <label for="${o}-temperature">Temperature</label>
              <input type="number" class="yyt-input" id="${o}-temperature" 
                     value="${t.temperature??.7}" min="0" max="2" step="0.1">
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label for="${o}-top-p">Top P</label>
              <input type="number" class="yyt-input" id="${o}-top-p" 
                     value="${t.top_p??.9}" min="0" max="1" step="0.1">
            </div>
          </div>
        </div>
      </div>
      
      <div class="yyt-panel-footer">
        <button class="yyt-btn yyt-btn-secondary" id="${o}-reset-api-config">
          <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
        </button>
        <button class="yyt-btn yyt-btn-primary" id="${o}-save-api-config">
          <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
        </button>
      </div>
    </div>
  `}function Lt(){let t=tt(),e=J(),s=t.length>0?t.map(n=>`
        <div class="yyt-preset-item ${n.name===e?"active":""}" data-preset-name="${d(n.name)}">
          <div class="yyt-preset-info">
            <div class="yyt-preset-name">${d(n.name)}</div>
            <div class="yyt-preset-desc">${d(n.description||"\u65E0\u63CF\u8FF0")}</div>
            <div class="yyt-preset-meta">
              ${n.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${d(n.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
            </div>
          </div>
          <div class="yyt-preset-actions">
            <button class="yyt-btn yyt-btn-small yyt-btn-icon" data-action="activate" title="\u6FC0\u6D3B">
              <i class="fa-solid fa-check"></i>
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-icon" data-action="edit" title="\u7F16\u8F91">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-icon" data-action="duplicate" title="\u590D\u5236">
              <i class="fa-solid fa-copy"></i>
            </button>
            <button class="yyt-btn yyt-btn-small yyt-btn-icon yyt-btn-danger" data-action="delete" title="\u5220\u9664">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `).join(""):'<div class="yyt-empty-state"><i class="fa-solid fa-inbox"></i><p>\u6682\u65E0\u9884\u8BBE</p></div>';return`
    <div class="yyt-panel">
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-list"></i>
          <span>\u9884\u8BBE\u5217\u8868</span>
          <span class="yyt-count-badge">${t.length}</span>
        </div>
        
        <div class="yyt-preset-list">
          ${s}
        </div>
      </div>
      
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-plus-circle"></i>
          <span>\u521B\u5EFA\u9884\u8BBE</span>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <input type="text" class="yyt-input" id="${o}-new-preset-name" 
                   placeholder="\u9884\u8BBE\u540D\u79F0" value="${N("\u65B0\u9884\u8BBE")}">
          </div>
          <button class="yyt-btn yyt-btn-primary" id="${o}-create-preset">
            <i class="fa-solid fa-plus"></i> \u4ECE\u5F53\u524D\u914D\u7F6E\u521B\u5EFA
          </button>
        </div>
      </div>
      
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-file-import"></i>
          <span>\u5BFC\u5165/\u5BFC\u51FA</span>
        </div>
        
        <div class="yyt-button-row">
          <button class="yyt-btn yyt-btn-secondary" id="${o}-export-presets">
            <i class="fa-solid fa-download"></i> \u5BFC\u51FA\u5168\u90E8
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${o}-import-presets">
            <i class="fa-solid fa-upload"></i> \u5BFC\u5165
          </button>
          <input type="file" id="${o}-import-file" accept=".json" style="display:none">
        </div>
      </div>
    </div>
  `}function Ft(){let t=b(),e=et(),s=J(),n=e.length>0?e.map(i=>`<option value="${d(i)}" ${i===s?"selected":""}>${d(i)}</option>`).join(""):"";return`
    <div class="yyt-panel">
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-vial"></i>
          <span>\u8FDE\u63A5\u6D4B\u8BD5</span>
        </div>
        
        <div class="yyt-form-group">
          <label for="${o}-test-preset">\u9009\u62E9\u914D\u7F6E</label>
          <select class="yyt-select" id="${o}-test-preset">
            <option value="">\u5F53\u524DAPI\u914D\u7F6E</option>
            ${n}
          </select>
        </div>
        
        <div class="yyt-form-group">
          <label for="${o}-test-message">\u6D4B\u8BD5\u6D88\u606F</label>
          <textarea class="yyt-textarea" id="${o}-test-message" rows="3" 
                    placeholder="\u8F93\u5165\u6D4B\u8BD5\u6D88\u606F...">Hello, this is a test message.</textarea>
        </div>
        
        <div class="yyt-button-row">
          <button class="yyt-btn yyt-btn-primary" id="${o}-run-test">
            <i class="fa-solid fa-play"></i> \u8FD0\u884C\u6D4B\u8BD5
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${o}-test-connection">
            <i class="fa-solid fa-wifi"></i> \u6D4B\u8BD5\u8FDE\u63A5
          </button>
        </div>
      </div>
      
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-terminal"></i>
          <span>\u6D4B\u8BD5\u7ED3\u679C</span>
        </div>
        
        <div class="yyt-result-box" id="${o}-test-result">
          <div class="yyt-result-placeholder">
            <i class="fa-solid fa-arrow-up"></i>
            <p>\u8FD0\u884C\u6D4B\u8BD5\u540E\u7ED3\u679C\u5C06\u663E\u793A\u5728\u8FD9\u91CC</p>
          </div>
        </div>
      </div>
    </div>
  `}function Bt(){let t=(typeof window.parent<"u"?window.parent:window).jQuery||window.jQuery;if(!(!t||!c))switch(c.find(".yyt-tab-item").off("click").on("click",function(){let e=t(this).data("tab");e&&e!==C&&(C=e,v())}),C){case"api":Kt();break;case"presets":Ht();break;case"test":qt();break}}function Kt(){let t=(typeof window.parent<"u"?window.parent:window).jQuery||window.jQuery;c.find(`#${o}-use-main-api`).on("change",function(){let e=t(this).is(":checked"),s=c.find(`#${o}-custom-api-fields`);e?s.addClass("yyt-disabled").find("input, button").prop("disabled",!0):s.removeClass("yyt-disabled").find("input, button").prop("disabled",!1)}),c.find(`#${o}-toggle-key-visibility`).on("click",function(){let e=c.find(`#${o}-api-key`),s=e.attr("type");e.attr("type",s==="password"?"text":"password"),t(this).find("i").toggleClass("fa-eye fa-eye-slash")}),c.find(`#${o}-load-models`).on("click",async function(){let e=t(this),s=c.find(`#${o}-model`);e.prop("disabled",!0).find("i").addClass("fa-spin");try{let n=wt(),i=await X(n);if(i.length>0){let a=c.find(`#${o}-model-select`);a.length===0&&(a=t(`<select class="yyt-select" id="${o}-model-select">`).insertAfter(s),s.hide()),a.empty(),i.forEach(r=>{a.append(`<option value="${d(r)}">${d(r)}</option>`)}),a.off("change").on("change",function(){s.val(t(this).val())}),p("success",`\u5DF2\u52A0\u8F7D ${i.length} \u4E2A\u6A21\u578B`)}else p("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(n){p("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${n.message}`)}finally{e.prop("disabled",!1).find("i").removeClass("fa-spin")}}),c.find(`#${o}-save-api-config`).on("click",function(){let e=wt(),s=z(e);if(!s.valid&&!e.useMainApi){p("error",s.errors.join(", "));return}U(e),p("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),c.find(`#${o}-reset-api-config`).on("click",function(){confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")&&(U({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9}),v(),p("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E"))})}function Ht(){let t=(typeof window.parent<"u"?window.parent:window).jQuery||window.jQuery;c.find(".yyt-preset-item").on("click",function(e){let n=t(this).data("preset-name"),i=t(e.target).closest("[data-action]").data("action");if(i)switch(e.stopPropagation(),i){case"activate":let a=it(n);p(a.success?"success":"error",a.message),a.success&&v();break;case"edit":Gt(n);break;case"duplicate":let r=N(n);confirm(`\u786E\u5B9A\u8981\u590D\u5236\u9884\u8BBE "${n}" \u4E3A "${r}" \u5417\uFF1F`)&&(L(JSON.stringify([{...getPreset(n),name:r}])),v());break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${n}" \u5417\uFF1F`)){let l=nt(n);p(l.success?"info":"error",l.message),l.success&&v()}break}}),c.find(`#${o}-create-preset`).on("click",function(){let e=c.find(`#${o}-new-preset-name`).val().trim();if(!e){p("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let s=rt(e);p(s.success?"success":"error",s.message),s.success&&(c.find(`#${o}-new-preset-name`).val(N("\u65B0\u9884\u8BBE")),v())}),c.find(`#${o}-export-presets`).on("click",function(){try{let e=at(),s=new Blob([e],{type:"application/json"}),n=URL.createObjectURL(s),i=document.createElement("a");i.href=n,i.download=`youyou_toolkit_presets_${Date.now()}.json`,i.click(),URL.revokeObjectURL(n),p("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(e){p("error",`\u5BFC\u51FA\u5931\u8D25: ${e.message}`)}}),c.find(`#${o}-import-presets`).on("click",function(){c.find(`#${o}-import-file`).click()}),c.find(`#${o}-import-file`).on("change",async function(e){let s=e.target.files[0];if(s){try{let n=await s.text(),i=L(n,{overwrite:!0});p(i.success?"success":"error",i.message),i.imported>0&&v()}catch(n){p("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}t(this).val("")}})}function qt(){let t=(typeof window.parent<"u"?window.parent:window).jQuery||window.jQuery;c.find(`#${o}-test-connection`).on("click",async function(){let e=t(this),s=c.find(`#${o}-test-result`),n=c.find(`#${o}-test-preset`).val();e.prop("disabled",!0),s.html('<div class="yyt-loading"><i class="fa-solid fa-spinner fa-spin"></i> \u6B63\u5728\u6D4B\u8BD5\u8FDE\u63A5...</div>');try{let i=n?getPreset(n)?.apiConfig:b(),a=await V(i);s.html(`
        <div class="yyt-result ${a.success?"yyt-result-success":"yyt-result-error"}">
          <i class="fa-solid ${a.success?"fa-check-circle":"fa-times-circle"}"></i>
          <div>
            <div class="yyt-result-title">${a.success?"\u8FDE\u63A5\u6210\u529F":"\u8FDE\u63A5\u5931\u8D25"}</div>
            <div class="yyt-result-message">${d(a.message)}</div>
          </div>
        </div>
      `)}catch(i){s.html(`
        <div class="yyt-result yyt-result-error">
          <i class="fa-solid fa-times-circle"></i>
          <div>
            <div class="yyt-result-title">\u6D4B\u8BD5\u5931\u8D25</div>
            <div class="yyt-result-message">${d(i.message)}</div>
          </div>
        </div>
      `)}finally{e.prop("disabled",!1)}}),c.find(`#${o}-run-test`).on("click",async function(){let e=t(this),s=c.find(`#${o}-test-result`),n=c.find(`#${o}-test-message`),i=c.find(`#${o}-test-preset`).val(),a=n.val().trim();if(!a){p("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6D88\u606F");return}e.prop("disabled",!0),s.html('<div class="yyt-loading"><i class="fa-solid fa-spinner fa-spin"></i> \u6B63\u5728\u53D1\u9001\u8BF7\u6C42...</div>');try{let{sendApiRequest:r}=await Promise.resolve().then(()=>(Q(),Z)),l=i?getPreset(i)?.apiConfig:b(),m=await r([{role:"user",content:a}],{apiConfig:l});s.html(`
        <div class="yyt-result yyt-result-success">
          <div class="yyt-result-title">\u54CD\u5E94\u6210\u529F</div>
          <div class="yyt-result-content">${d(m)}</div>
        </div>
      `)}catch(r){s.html(`
        <div class="yyt-result yyt-result-error">
          <i class="fa-solid fa-times-circle"></i>
          <div>
            <div class="yyt-result-title">\u8BF7\u6C42\u5931\u8D25</div>
            <div class="yyt-result-message">${d(r.message)}</div>
          </div>
        </div>
      `)}finally{e.prop("disabled",!1)}})}function wt(){let t=(typeof window.parent<"u"?window.parent:window).jQuery||window.jQuery;return{url:c.find(`#${o}-api-url`).val().trim(),apiKey:c.find(`#${o}-api-key`).val(),model:c.find(`#${o}-model`).val().trim(),useMainApi:c.find(`#${o}-use-main-api`).is(":checked"),max_tokens:parseInt(c.find(`#${o}-max-tokens`).val())||4096,temperature:parseFloat(c.find(`#${o}-temperature`).val())??.7,top_p:parseFloat(c.find(`#${o}-top-p`).val())??.9}}function Gt(t){let e=getPreset(t);if(!e)return;let s=(typeof window.parent<"u"?window.parent:window).jQuery||window.jQuery,n=prompt("\u7F16\u8F91\u9884\u8BBE\u63CF\u8FF0:",e.description||"");n!==null&&(st(t,{description:n}),p("success","\u9884\u8BBE\u5DF2\u66F4\u65B0"),v())}function v(t){c=typeof t=="string"?$(t):t;let e=`
    <div class="yyt-api-manager">
      ${zt()}
      <div class="yyt-tab-content">
        ${Qt()}
      </div>
    </div>
  `;c.html(e),Bt()}function Wt(){return`
    /* API\u7BA1\u7406\u5668\u6837\u5F0F */
    
    .yyt-api-manager {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    .yyt-tab-nav {
      display: flex;
      gap: 4px;
      padding: 0 0 16px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 16px;
    }
    
    .yyt-tab-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      color: rgba(255, 255, 255, 0.7);
    }
    
    .yyt-tab-item:hover {
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.9);
    }
    
    .yyt-tab-item.active {
      background: rgba(123, 183, 255, 0.15);
      color: rgba(123, 183, 255, 1);
    }
    
    .yyt-tab-content {
      flex: 1;
      overflow: auto;
    }
    
    .yyt-panel {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .yyt-panel-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .yyt-section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.95);
    }
    
    .yyt-section-title i {
      color: rgba(123, 183, 255, 0.85);
    }
    
    .yyt-count-badge {
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 10px;
      background: rgba(123, 183, 255, 0.2);
      color: rgba(123, 183, 255, 1);
    }
    
    .yyt-status-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 8px;
    }
    
    .yyt-badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 500;
    }
    
    .yyt-badge-small {
      padding: 2px 8px;
      font-size: 11px;
    }
    
    .yyt-badge-info {
      background: rgba(123, 183, 255, 0.15);
      color: rgba(123, 183, 255, 1);
    }
    
    .yyt-badge-default {
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.7);
    }
    
    .yyt-form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    
    .yyt-form-group label {
      font-size: 13px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.8);
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
    
    .yyt-input,
    .yyt-select,
    .yyt-textarea {
      padding: 10px 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      transition: all 0.2s ease;
    }
    
    .yyt-input:focus,
    .yyt-select:focus,
    .yyt-textarea:focus {
      outline: none;
      border-color: rgba(123, 183, 255, 0.5);
      background: rgba(255, 255, 255, 0.08);
    }
    
    .yyt-input::placeholder,
    .yyt-textarea::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
    
    .yyt-input-group {
      display: flex;
      gap: 8px;
    }
    
    .yyt-input-group .yyt-input {
      flex: 1;
    }
    
    .yyt-checkbox-label {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }
    
    .yyt-checkbox-label input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    
    .yyt-hint {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
    }
    
    .yyt-disabled {
      opacity: 0.5;
      pointer-events: none;
    }
    
    .yyt-button-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    
    .yyt-panel-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    
    .yyt-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 16px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    
    .yyt-btn-primary {
      background: rgba(123, 183, 255, 0.85);
      color: #0b0f15;
    }
    
    .yyt-btn-primary:hover {
      background: rgba(123, 183, 255, 1);
    }
    
    .yyt-btn-secondary {
      background: rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.85);
    }
    
    .yyt-btn-secondary:hover {
      background: rgba(255, 255, 255, 0.15);
    }
    
    .yyt-btn-danger {
      background: rgba(255, 107, 107, 0.15);
      color: #ff6b6b;
    }
    
    .yyt-btn-danger:hover {
      background: rgba(255, 107, 107, 0.25);
    }
    
    .yyt-btn-icon {
      padding: 8px;
      min-width: 36px;
    }
    
    .yyt-btn-small {
      padding: 6px 10px;
      font-size: 12px;
    }
    
    .yyt-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    /* \u9884\u8BBE\u5217\u8868 */
    .yyt-preset-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 300px;
      overflow-y: auto;
    }
    
    .yyt-preset-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      transition: all 0.2s ease;
    }
    
    .yyt-preset-item:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.12);
    }
    
    .yyt-preset-item.active {
      background: rgba(123, 183, 255, 0.1);
      border-color: rgba(123, 183, 255, 0.3);
    }
    
    .yyt-preset-info {
      flex: 1;
      min-width: 0;
    }
    
    .yyt-preset-name {
      font-weight: 600;
      color: rgba(255, 255, 255, 0.95);
      margin-bottom: 4px;
    }
    
    .yyt-preset-desc {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 6px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .yyt-preset-meta {
      display: flex;
      gap: 6px;
    }
    
    .yyt-preset-actions {
      display: flex;
      gap: 4px;
    }
    
    .yyt-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      color: rgba(255, 255, 255, 0.4);
    }
    
    .yyt-empty-state i {
      font-size: 48px;
      margin-bottom: 16px;
    }
    
    /* \u6D4B\u8BD5\u7ED3\u679C */
    .yyt-result-box {
      min-height: 150px;
      padding: 16px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
    }
    
    .yyt-result-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: rgba(255, 255, 255, 0.4);
    }
    
    .yyt-result-placeholder i {
      font-size: 24px;
      margin-bottom: 8px;
    }
    
    .yyt-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      color: rgba(123, 183, 255, 0.85);
    }
    
    .yyt-result {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }
    
    .yyt-result i {
      font-size: 20px;
      margin-top: 2px;
    }
    
    .yyt-result-success i {
      color: #4caf50;
    }
    
    .yyt-result-error i {
      color: #ff6b6b;
    }
    
    .yyt-result-title {
      font-weight: 600;
      margin-bottom: 4px;
    }
    
    .yyt-result-message {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.7);
    }
    
    .yyt-result-content {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.85);
      white-space: pre-wrap;
      word-break: break-word;
      max-height: 200px;
      overflow-y: auto;
      background: rgba(0, 0, 0, 0.2);
      padding: 10px;
      border-radius: 6px;
      margin-top: 8px;
    }
  `}function Vt(){return C}function Xt(t){C=t}var o,C,c,$t=D(()=>{Q();ct();j();o="youyou_toolkit";C="api",c=null});var f="youyou_toolkit",dt="0.2.0",F=`${f}-menu-item`,lt=`${f}-menu-container`,Zt=`${f}-popup`,P=typeof window.parent<"u"?window.parent:window,B=null,h=null,K=null,_=null;async function E(){try{return B=await Promise.resolve().then(()=>(j(),mt)),h=await Promise.resolve().then(()=>(Q(),Z)),K=await Promise.resolve().then(()=>(ct(),xt)),_=await Promise.resolve().then(()=>($t(),ht)),!0}catch(t){return console.warn(`[${f}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,t),!1}}function g(...t){console.log(`[${f}]`,...t)}function kt(...t){console.error(`[${f}]`,...t)}function te(){let t=`${f}-styles`,e=P.document||document;if(e.getElementById(t))return;let s=`
    /* YouYou Toolkit \u6837\u5F0F */
    
    /* \u83DC\u5355\u9879\u6837\u5F0F */
    #${lt} {
      display: flex;
      align-items: center;
    }
    
    #${F} {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 8px 12px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    #${F}:hover {
      background-color: var(--hover-bg, rgba(255, 255, 255, 0.1));
    }
    
    #${F} .fa-icon {
      font-size: 16px;
      color: var(--accent-color, #7bb7ff);
    }
    
    /* \u5F39\u7A97\u6837\u5F0F */
    .yyt-popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      z-index: 9999;
      animation: yytFadeIn 0.2s ease-out;
    }
    
    @keyframes yytFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .yyt-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 22%), #0b0f15;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.65);
      width: 600px;
      min-height: 400px;
      max-width: 90vw;
      max-height: 90vh;
      z-index: 10000;
      animation: yytSlideIn 0.25s ease-out;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
      color: rgba(255, 255, 255, 0.92);
      display: flex;
      flex-direction: column;
    }
    
    @keyframes yytSlideIn {
      from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
      to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    
    .yyt-popup-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px 16px 0 0;
    }
    
    .yyt-popup-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 16px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.95);
    }
    
    .yyt-popup-title i {
      color: rgba(123, 183, 255, 0.85);
    }
    
    .yyt-popup-close {
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
    
    .yyt-popup-close:hover {
      background: rgba(255, 107, 107, 0.25);
      color: #ff6b6b;
    }
    
    .yyt-popup-body {
      flex: 1;
      padding: 20px;
      overflow: auto;
    }
    
    .yyt-popup-footer {
      padding: 16px 20px;
      background: rgba(255, 255, 255, 0.02);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 0 0 16px 16px;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    
    .yyt-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    
    .yyt-btn-primary {
      background: rgba(123, 183, 255, 0.85);
      color: #0b0f15;
    }
    
    .yyt-btn-primary:hover {
      background: rgba(123, 183, 255, 1);
    }
    
    .yyt-btn-secondary {
      background: rgba(255, 255, 255, 0.06);
      color: rgba(255, 255, 255, 0.7);
    }
    
    .yyt-btn-secondary:hover {
      background: rgba(255, 255, 255, 0.12);
    }
    
    /* \u5BFC\u822A\u6837\u5F0F */
    .yyt-nav {
      display: flex;
      gap: 4px;
      padding: 0 0 16px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 16px;
    }
    
    .yyt-nav-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      color: rgba(255, 255, 255, 0.7);
    }
    
    .yyt-nav-item:hover {
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.9);
    }
    
    .yyt-nav-item.active {
      background: rgba(123, 183, 255, 0.15);
      color: rgba(123, 183, 255, 1);
    }
    
    /* \u9875\u9762\u5185\u5BB9 */
    .yyt-page {
      display: none;
    }
    
    .yyt-page.active {
      display: block;
    }
    
    /* \u6B22\u8FCE\u9875\u9762 */
    .yyt-welcome {
      text-align: center;
      padding: 40px 20px;
    }
    
    .yyt-welcome h2 {
      margin: 0 0 20px 0;
      color: rgba(123, 183, 255, 0.85);
    }
    
    .yyt-welcome p {
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.6;
      margin: 0 0 15px 0;
    }
    
    .yyt-version {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 30px;
    }
    
    .yyt-features {
      text-align: left;
      max-width: 400px;
      margin: 20px auto;
    }
    
    .yyt-feature-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 8px;
      margin-bottom: 8px;
    }
    
    .yyt-feature-item i {
      color: rgba(123, 183, 255, 0.85);
      font-size: 20px;
      width: 24px;
    }
    
    .yyt-feature-item span {
      color: rgba(255, 255, 255, 0.85);
    }
  `,n=e.createElement("style");n.id=t,n.textContent=s,(e.head||e.documentElement).appendChild(n),g("\u6837\u5F0F\u5DF2\u6CE8\u5165")}var y=null,k=null,ee="welcome";function H(){y&&(y.remove(),y=null),k&&(k.remove(),k=null),g("\u5F39\u7A97\u5DF2\u5173\u95ED")}function Pt(t){ee=t;let e=P.jQuery||window.jQuery;if(!(!e||!y)&&(e(y).find(".yyt-nav-item").removeClass("active"),e(y).find(`.yyt-nav-item[data-page="${t}"]`).addClass("active"),e(y).find(".yyt-page").removeClass("active"),e(y).find(`.yyt-page[data-page="${t}"]`).addClass("active"),t==="api"&&_)){let s=e(y).find("#youyou_toolkit-api-container");s.length&&_.render(s)}}function At(){if(y){g("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let t=P.jQuery||window.jQuery,e=P.document||document;if(!t){kt("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}k=e.createElement("div"),k.className="yyt-popup-overlay",k.addEventListener("click",i=>{i.target===k&&H()}),e.body.appendChild(k);let s=`
    <div class="yyt-popup" id="${Zt}">
      <div class="yyt-popup-header">
        <div class="yyt-popup-title">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span>YouYou \u5DE5\u5177\u7BB1</span>
          <span style="font-size: 12px; opacity: 0.6;">v${dt}</span>
        </div>
        <button class="yyt-popup-close" title="\u5173\u95ED">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      
      <div class="yyt-popup-body">
        <div class="yyt-nav">
          <div class="yyt-nav-item active" data-page="welcome">
            <i class="fa-solid fa-home"></i>
            <span>\u9996\u9875</span>
          </div>
          <div class="yyt-nav-item" data-page="api">
            <i class="fa-solid fa-plug"></i>
            <span>API\u7BA1\u7406</span>
          </div>
        </div>
        
        <div class="yyt-page active" data-page="welcome">
          <div class="yyt-welcome">
            <h2>\u{1F6E0}\uFE0F \u6B22\u8FCE\u4F7F\u7528 YouYou \u5DE5\u5177\u7BB1</h2>
            <p>\u8FD9\u662F\u4E00\u4E2A\u4E3A SillyTavern \u8BBE\u8BA1\u7684\u5DE5\u5177\u63D2\u4EF6\u6846\u67B6\u3002</p>
            
            <div class="yyt-features">
              <div class="yyt-feature-item">
                <i class="fa-solid fa-plug"></i>
                <span>API\u8FDE\u63A5\u7BA1\u7406 - \u652F\u6301\u81EA\u5B9A\u4E49API\u548C\u4E3BAPI\u5207\u6362</span>
              </div>
              <div class="yyt-feature-item">
                <i class="fa-solid fa-bookmark"></i>
                <span>\u9884\u8BBE\u7BA1\u7406 - \u4FDD\u5B58\u548C\u5207\u6362\u591A\u5957API\u914D\u7F6E</span>
              </div>
              <div class="yyt-feature-item">
                <i class="fa-solid fa-flask"></i>
                <span>\u8FDE\u63A5\u6D4B\u8BD5 - \u9A8C\u8BC1API\u914D\u7F6E\u662F\u5426\u6B63\u786E</span>
              </div>
              <div class="yyt-feature-item">
                <i class="fa-solid fa-file-import"></i>
                <span>\u5BFC\u5165\u5BFC\u51FA - \u65B9\u4FBF\u5907\u4EFD\u548C\u5206\u4EAB\u914D\u7F6E</span>
              </div>
            </div>
            
            <div class="yyt-version">
              \u63D2\u4EF6ID: ${f}
            </div>
          </div>
        </div>
        
        <div class="yyt-page" data-page="api">
          <div id="${f}-api-container"></div>
        </div>
      </div>
      
      <div class="yyt-popup-footer">
        <button class="yyt-btn yyt-btn-secondary" id="${f}-close-btn">\u5173\u95ED</button>
      </div>
    </div>
  `,n=e.createElement("div");n.innerHTML=s,y=n.firstElementChild,e.body.appendChild(y),t(y).find(".yyt-popup-close").on("click",H),t(y).find(`#${f}-close-btn`).on("click",H),t(y).find(".yyt-nav-item").on("click",function(){let i=t(this).data("page");i&&Pt(i)}),g("\u5F39\u7A97\u5DF2\u6253\u5F00")}function O(){let t=P.jQuery||window.jQuery;if(!t){kt("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(O,1e3);return}let e=P.document||document,s=t("#extensionsMenu",e);if(!s.length){g("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(O,2e3);return}if(t(`#${lt}`,s).length>0){g("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let i=t(`<div class="extension_container interactable" id="${lt}" tabindex="0"></div>`),a=`
    <div class="list-group-item flex-container flexGap5 interactable" id="${F}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
      <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
      <span>YouYou \u5DE5\u5177\u7BB1</span>
    </div>
  `,r=t(a);r.on("click",async function(l){l.stopPropagation(),g("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let m=t("#extensionsMenuButton",e);m.length&&s.is(":visible")&&m.trigger("click"),At()}),i.append(r),s.append(i),g("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}var pt={version:dt,id:f,init:Ct,openPopup:At,closePopup:H,switchPage:Pt,addMenuItem:O,getStorage:()=>B,getApiConnection:()=>h,getPresetManager:()=>K,getUiComponents:()=>_,async getApiConfig(){return await E(),B?B.loadSettings().apiConfig:null},async saveApiConfig(t){return await E(),h?(h.updateApiConfig(t),!0):!1},async getPresets(){return await E(),K?K.getAllPresets():[]},async sendApiRequest(t,e){if(await E(),h)return h.sendApiRequest(t,e);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await E(),h?h.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}}};async function Ct(){if(g(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${dt}`),te(),await E()){if(g("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),_){let s=P.document||document,n=`${f}-ui-styles`;if(!s.getElementById(n)){let i=s.createElement("style");i.id=n,i.textContent=_.getStyles(),(s.head||s.documentElement).appendChild(i)}}}else g("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let e=P.document||document;e.readyState==="loading"?e.addEventListener("DOMContentLoaded",()=>{setTimeout(O,1e3)}):setTimeout(O,1e3),g("\u521D\u59CB\u5316\u5B8C\u6210")}if(typeof window<"u"&&(window.YouYouToolkit=pt,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=pt}catch{}var ye=pt;Ct();g("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210");export{ye as default};
