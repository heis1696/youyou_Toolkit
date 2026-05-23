/**
 * YouYou Toolkit - QQ App Phase C1 group config dialog
 *
 * 群配置：触发开关 / 氛围 / Phase 1 prompt / 解析正则 / 速率 / 重试 / 成员 / per-member prompt
 * 嵌套：成员管理可弹"新建好友"和"编辑专属 prompt"三级弹窗。
 * 解析正则实时校验：非法即禁用确定按钮。
 */

import { dialog } from '../../../ui/components/controls/index.js';
import {
  DEFAULT_PHASE1_PROMPT_TEMPLATE,
  DEFAULT_PHASE1_PARSE_REGEX,
  DEFAULT_PER_MEMBER_PROMPT_TEMPLATE,
  DEFAULT_PER_MINUTE,
  DEFAULT_MAX_RETRIES,
} from '../defaults.js';
import { openFriendCreateDialog } from './friend-create-dialog.js';
import { loadStoredApiPresets } from '../../../api-connection.js';

// dialog 挂载到 ST 主 doc，但 QQ 全局样式注入到的是 floating-ball 自己的 doc（不一定同步），
// 为防跨 doc / 注入时序 / STYLE_MARK 幂等导致红边样式拿不到，这里把 dialog 必需的几条
// 样式 inline 写一份，scope 到 .yyt-qq-config-dialog 避免污染其他 dialog。
const DIALOG_INLINE_STYLE = `
.yyt-qq-config-dialog .yyt-qq-input-error,
.yyt-qq-config-dialog .yyt-input.yyt-qq-input-error,
.yyt-qq-config-dialog textarea.yyt-input.yyt-qq-input-error {
  border-color: var(--yyt-danger, #f87171) !important;
  box-shadow: 0 0 0 1px rgba(248, 113, 113, 0.35) !important;
}
.yyt-qq-config-dialog .yyt-qq-field-err {
  color: var(--yyt-danger, #f87171);
  font-size: 11.5px;
  margin-top: 4px;
  min-height: 14px;
  line-height: 1.4;
}
.yyt-qq-config-dialog .yyt-qq-preset-select {
  width: 100%;
  box-sizing: border-box;
  min-height: 36px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--yyt-control-border, rgba(255,255,255,0.12));
  background: var(--yyt-control-bg, rgba(255,255,255,0.04));
  color: var(--yyt-text, #f2f2f2);
  font-size: 12.5px;
  outline: none;
}
.yyt-qq-config-dialog .yyt-qq-preset-select.yyt-qq-input-error {
  border-color: var(--yyt-danger, #f87171) !important;
}
.yyt-qq-config-dialog .yyt-qq-save-blocker {
  display: none;
  padding: 8px 10px;
  margin-top: 4px;
  border-radius: 6px;
  background: rgba(248, 113, 113, 0.12);
  border: 1px solid rgba(248, 113, 113, 0.35);
  color: var(--yyt-danger, #f87171);
  font-size: 11.5px;
  line-height: 1.5;
}
.yyt-qq-config-dialog .yyt-qq-save-blocker.is-visible {
  display: block;
}
.yyt-qq-config-dialog .yyt-qq-group-ops {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.yyt-qq-config-dialog .yyt-qq-group-ops .yyt-btn {
  font-size: 12px;
}
`;

function createLabeledTextarea(doc, { label, value, rows, placeholder, onChange }) {
  const row = doc.createElement('div');
  row.className = 'yyt-form-row';
  const lbl = doc.createElement('div');
  lbl.className = 'yyt-form-label';
  lbl.textContent = label;
  row.appendChild(lbl);
  const ta = doc.createElement('textarea');
  ta.className = 'yyt-input';
  ta.rows = rows || 3;
  ta.placeholder = placeholder || '';
  ta.value = String(value ?? '');
  ta.style.resize = 'vertical';
  ta.addEventListener('input', () => onChange?.(ta.value));
  row.appendChild(ta);
  return { row, input: ta };
}

function createLabeledInput(doc, { label, value, placeholder, type, onChange }) {
  const row = doc.createElement('div');
  row.className = 'yyt-form-row';
  const lbl = doc.createElement('div');
  lbl.className = 'yyt-form-label';
  lbl.textContent = label;
  row.appendChild(lbl);
  const input = doc.createElement('input');
  input.type = type || 'text';
  input.className = 'yyt-input';
  input.placeholder = placeholder || '';
  input.value = String(value ?? '');
  input.addEventListener('input', () => onChange?.(input.value));
  row.appendChild(input);
  return { row, input };
}

function createToggleRow(doc, { label, hint, checked, onChange }) {
  const row = doc.createElement('div');
  row.className = 'yyt-form-row';
  row.style.flexDirection = 'row';
  row.style.alignItems = 'center';
  row.style.justifyContent = 'space-between';
  row.style.gap = '12px';

  const left = doc.createElement('div');
  left.style.flex = '1';
  const lbl = doc.createElement('div');
  lbl.className = 'yyt-form-label';
  lbl.style.marginBottom = '2px';
  lbl.textContent = label;
  left.appendChild(lbl);
  if (hint) {
    const h = doc.createElement('div');
    h.style.cssText = 'font-size:11px;color:var(--yyt-text-secondary,#9aa0a8);line-height:1.4;';
    h.textContent = hint;
    left.appendChild(h);
  }
  row.appendChild(left);

  const cb = doc.createElement('input');
  cb.type = 'checkbox';
  cb.className = 'yyt-checkbox';
  cb.checked = !!checked;
  cb.style.cssText = 'width:18px;height:18px;cursor:pointer;flex-shrink:0;';
  cb.addEventListener('change', () => onChange?.(cb.checked));
  row.appendChild(cb);

  return { row, input: cb };
}

function createZoneTitle(doc, title) {
  const z = doc.createElement('div');
  z.style.cssText = 'font-size:12px;font-weight:600;color:var(--yyt-text-secondary,#9aa0a8);margin:8px 0 2px;text-transform:uppercase;letter-spacing:0.5px;';
  z.textContent = title;
  return z;
}

function createErrEl(doc) {
  const e = doc.createElement('div');
  e.style.cssText = 'color:var(--yyt-danger,#f87171);font-size:11.5px;margin-top:4px;min-height:14px;';
  return e;
}

function isRegexValid(pattern) {
  try {
    new RegExp(String(pattern || ''), 'g');
    return true;
  } catch (_) {
    return false;
  }
}

async function openPerMemberPromptDialog({ doc, friend, currentValue }) {
  return new Promise((resolve) => {
    const wrap = doc.createElement('div');

    const note = doc.createElement('div');
    note.style.cssText = 'font-size:11.5px;color:var(--yyt-text-secondary,#9aa0a8);margin-bottom:8px;line-height:1.5;';
    note.textContent = `为「${friend.name}」编辑专属 Phase 2 prompt（不填则用默认模板）。可用占位：{{atmosphere}} {{selfName}} {{selfDescription}} {{recentMessages}}`;
    wrap.appendChild(note);

    const ta = doc.createElement('textarea');
    ta.className = 'yyt-input';
    ta.rows = 12;
    ta.style.resize = 'vertical';
    ta.style.minHeight = '220px';
    ta.style.fontFamily = 'ui-monospace, "SF Mono", Consolas, monospace';
    ta.style.fontSize = '12.5px';
    ta.value = String(currentValue || '');
    ta.placeholder = DEFAULT_PER_MEMBER_PROMPT_TEMPLATE;
    wrap.appendChild(ta);

    const inst = dialog.custom({
      title: `专属 prompt - ${friend.name}`,
      body: wrap,
      width: '560px',
      wide: true,
      buttons: [
        { label: '清空', variant: 'ghost', onClick: () => { ta.value = ''; } },
        { label: '取消', variant: 'ghost', onClick: (close) => close({ cancelled: true }) },
        { label: '保存', variant: 'primary', onClick: (close) => close({ cancelled: false, value: ta.value }) },
      ],
    });
    inst.result.then((r) => {
      if (!r || r.cancelled) resolve({ cancelled: true });
      else resolve({ cancelled: false, value: String(r.value || '') });
    });
  });
}

export function openGroupConfigDialog({ group, qqStorage, logger, targetDoc }) {
  const doc = targetDoc || globalThis.document || document;

  return new Promise((resolve) => {
    const draft = {
      atmosphere: String(group.atmosphere || ''),
      userMessageEnabled: !!group?.triggerSources?.userMessage,
      phase1Prompt: String(group?.phase1Config?.promptTemplate || ''),
      phase1Regex: String(group?.phase1Config?.parseRegex || ''),
      perMinute: Number.isFinite(group?.rateLimitConfig?.perMinute)
        ? group.rateLimitConfig.perMinute
        : DEFAULT_PER_MINUTE,
      maxRetries: Number.isFinite(group?.failureConfig?.maxRetries)
        ? group.failureConfig.maxRetries
        : DEFAULT_MAX_RETRIES,
      memberIds: Array.isArray(group.memberIds) ? [...group.memberIds] : [],
      perMemberPrompt: { ...(group?.perMemberPrompt || {}) },
      apiPresetName: String(group?.apiPresetName || ''),
    };

    // 字段级有效状态；任一字段无效则禁用保存
    const fieldValid = {
      regex: true,
      perMinute: true,
      maxRetries: true,
      apiPresetName: !!draft.apiPresetName,
    };
    function isValidIntStr(v, allowZero = false) {
      const s = String(v ?? '').trim();
      if (!/^-?\d+$/.test(s)) return false;
      const n = parseInt(s, 10);
      if (!Number.isFinite(n)) return false;
      return allowZero ? n >= 0 : n > 0;
    }
    function setErrClass(inputEl, hasErr) {
      if (!inputEl) return;
      if (hasErr) inputEl.classList.add('yyt-qq-input-error');
      else inputEl.classList.remove('yyt-qq-input-error');
    }
    function refreshConfirmDisabled() {
      if (!confirmBtnRef) return;
      const ok = fieldValid.regex && fieldValid.perMinute && fieldValid.maxRetries && fieldValid.apiPresetName;
      confirmBtnRef.disabled = !ok;
      if (saveBlockerEl) {
        if (ok) {
          saveBlockerEl.classList.remove('is-visible');
          saveBlockerEl.textContent = '';
        } else {
          const reasons = [];
          if (!fieldValid.apiPresetName) reasons.push('未选择 API 预设');
          if (!fieldValid.regex) reasons.push('Phase 1 解析正则非法');
          if (!fieldValid.perMinute) reasons.push('速率限制需为正整数');
          if (!fieldValid.maxRetries) reasons.push('重试次数需为 ≥0 的整数');
          saveBlockerEl.textContent = `无法保存：${reasons.join('；')}`;
          saveBlockerEl.classList.add('is-visible');
        }
      }
    }

    let confirmBtnRef = null;
    let saveBlockerEl = null;
    let dialogCloseRef = null;

    const wrap = doc.createElement('div');
    wrap.className = 'yyt-qq-config-dialog';
    wrap.style.cssText = 'display:flex;flex-direction:column;gap:10px;max-height:70vh;overflow-y:auto;padding-right:4px;';

    // inline style：保证红边 / preset select 等样式跨 doc 一定生效（详见 DIALOG_INLINE_STYLE 注释）
    const styleEl = doc.createElement('style');
    styleEl.textContent = DIALOG_INLINE_STYLE;
    wrap.appendChild(styleEl);

    // ─── 群操作（重命名 / 删除） ────────────────────────
    wrap.appendChild(createZoneTitle(doc, '群操作'));
    const groupOps = doc.createElement('div');
    groupOps.className = 'yyt-qq-group-ops';

    const renameBtn = doc.createElement('button');
    renameBtn.type = 'button';
    renameBtn.className = 'yyt-btn yyt-btn-secondary';
    renameBtn.textContent = '重命名群';
    renameBtn.addEventListener('click', async () => {
      try {
        const next = await dialog.prompt({
          title: '重命名群',
          placeholder: '群名',
          initialValue: String(group.name || ''),
          confirmText: '保存',
          validate: (v) => {
            const t = String(v || '').trim();
            if (!t) return '群名不能为空';
            if (t.length > 30) return '群名最多 30 字';
            return null;
          },
        });
        if (!next) return;
        const trimmed = String(next).trim();
        if (trimmed === group.name) return;
        qqStorage.updateGroup(group.id, { name: trimmed });
        // 本地同步 draft 视图与 dialog title 显示（dialog title 已挂载无法改，但下次打开会刷新）
        group.name = trimmed;
        renameBtn.title = `已重命名为 ${trimmed}`;
      } catch (err) {
        logger?.error?.(`[QQ GroupConfig] 重命名异常: ${err?.message || err}`, err);
      }
    });
    groupOps.appendChild(renameBtn);

    const deleteBtn = doc.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'yyt-btn yyt-btn-danger';
    deleteBtn.textContent = '删除群';
    deleteBtn.addEventListener('click', async () => {
      try {
        const ok = await dialog.confirm({
          title: '删除群？',
          message: `「${group.name}」及该群下所有 chat 的聊天记录都会被永久删除，无法恢复。是否继续？`,
          danger: true,
          confirmText: '删除',
        });
        if (!ok) return;
        const removed = qqStorage.removeGroup(group.id);
        if (!removed) {
          logger?.warn?.(`[QQ GroupConfig] removeGroup 返回 false: id=${group.id}`);
          return;
        }
        if (typeof dialogCloseRef === 'function') {
          dialogCloseRef({ removed: true });
        }
      } catch (err) {
        logger?.error?.(`[QQ GroupConfig] 删除群异常: ${err?.message || err}`, err);
      }
    });
    groupOps.appendChild(deleteBtn);

    wrap.appendChild(groupOps);

    // ─── API 预设 ─────────────────────────────────────────
    wrap.appendChild(createZoneTitle(doc, 'API 预设'));
    const presetRow = doc.createElement('div');
    presetRow.className = 'yyt-form-row';
    const presetLbl = doc.createElement('div');
    presetLbl.className = 'yyt-form-label';
    presetLbl.textContent = 'YouYou Toolkit API 预设（必选；直连预设 URL，不进入主聊天 submit 流程）';
    presetRow.appendChild(presetLbl);

    const presetSelect = doc.createElement('select');
    presetSelect.className = 'yyt-qq-preset-select';
    let presets = [];
    try {
      presets = loadStoredApiPresets() || [];
    } catch (err) {
      logger?.warn?.(`[QQ GroupConfig] 读取 API 预设列表失败: ${err?.message || err}`);
      presets = [];
    }
    const placeholderOpt = doc.createElement('option');
    placeholderOpt.value = '';
    placeholderOpt.textContent = presets.length === 0
      ? '(未发现 API 预设 — 请先在工具箱 API 配置页新建预设)'
      : '(请选择 API 预设)';
    presetSelect.appendChild(placeholderOpt);
    for (const p of presets) {
      const opt = doc.createElement('option');
      const name = String(p?.name || '');
      if (!name) continue;
      opt.value = name;
      const useMain = !!p?.apiConfig?.useMainApi;
      // useMainApi 预设无法绕开 submit，标记并禁用避免误选
      opt.textContent = useMain ? `${name}（主 API · 不可用）` : name;
      if (useMain) opt.disabled = true;
      presetSelect.appendChild(opt);
    }
    presetSelect.value = draft.apiPresetName;
    // 若持久化的 apiPresetName 在当前列表中已找不到（预设被删 / 改名）, 浏览器会重置 value=''；
    // 同步 draft 防止 fieldValid 与 UI 不一致。
    if (draft.apiPresetName && presetSelect.value !== draft.apiPresetName) {
      draft.apiPresetName = '';
      fieldValid.apiPresetName = false;
    }
    presetSelect.addEventListener('change', () => {
      draft.apiPresetName = String(presetSelect.value || '');
      fieldValid.apiPresetName = !!draft.apiPresetName;
      setErrClass(presetSelect, !fieldValid.apiPresetName);
      presetErr.textContent = fieldValid.apiPresetName ? '' : '必须选择一个 API 预设，否则无法触发 AI 响应';
      refreshConfirmDisabled();
    });
    presetRow.appendChild(presetSelect);
    const presetErr = doc.createElement('div');
    presetErr.className = 'yyt-qq-field-err';
    presetRow.appendChild(presetErr);
    wrap.appendChild(presetRow);

    // ─── 触发 ─────────────────────────────────────────────
    wrap.appendChild(createZoneTitle(doc, '触发'));
    const triggerRow = createToggleRow(doc, {
      label: '用户消息触发',
      hint: '在 ST 主聊天框发消息时，触发该群的 Phase 1+2 链路',
      checked: draft.userMessageEnabled,
      onChange: (v) => { draft.userMessageEnabled = v; },
    });
    wrap.appendChild(triggerRow.row);

    // ─── 氛围 ─────────────────────────────────────────────
    wrap.appendChild(createZoneTitle(doc, '基本'));
    const atmosphere = createLabeledTextarea(doc, {
      label: '群氛围',
      value: draft.atmosphere,
      rows: 3,
      placeholder: '描述这个群的氛围/主题/背景（喂给 Phase 1 和 Phase 2）',
      onChange: (v) => { draft.atmosphere = v; },
    });
    wrap.appendChild(atmosphere.row);

    // ─── Phase 1 ──────────────────────────────────────────
    wrap.appendChild(createZoneTitle(doc, 'Phase 1 — 主 AI 选 NPC'));
    const phase1Prompt = createLabeledTextarea(doc, {
      label: 'Phase 1 prompt 模板（留空则用默认）',
      value: draft.phase1Prompt,
      rows: 8,
      placeholder: DEFAULT_PHASE1_PROMPT_TEMPLATE,
      onChange: (v) => { draft.phase1Prompt = v; },
    });
    phase1Prompt.input.style.fontFamily = 'ui-monospace, "SF Mono", Consolas, monospace';
    phase1Prompt.input.style.fontSize = '12.5px';
    wrap.appendChild(phase1Prompt.row);

    const phase1Regex = createLabeledInput(doc, {
      label: 'Phase 1 解析正则（首个捕获组 = friend id）',
      value: draft.phase1Regex,
      placeholder: DEFAULT_PHASE1_PARSE_REGEX,
      onChange: (v) => {
        draft.phase1Regex = v;
        updateRegexValidity();
      },
    });
    phase1Regex.input.style.fontFamily = 'ui-monospace, "SF Mono", Consolas, monospace';
    wrap.appendChild(phase1Regex.row);
    const regexErr = createErrEl(doc);
    wrap.appendChild(regexErr);

    function updateRegexValidity() {
      const v = String(draft.phase1Regex || '');
      if (!v) {
        regexErr.textContent = '';
        setErrClass(phase1Regex.input, false);
        fieldValid.regex = true;
        refreshConfirmDisabled();
        return;
      }
      if (isRegexValid(v)) {
        regexErr.textContent = '';
        setErrClass(phase1Regex.input, false);
        fieldValid.regex = true;
      } else {
        regexErr.textContent = '正则语法错误';
        setErrClass(phase1Regex.input, true);
        fieldValid.regex = false;
      }
      refreshConfirmDisabled();
    }

    // ─── 速率 + 重试 ──────────────────────────────────────
    wrap.appendChild(createZoneTitle(doc, '速率与重试'));
    const perMinute = createLabeledInput(doc, {
      label: '速率限制（每分钟最多触发次数，必须为正整数）',
      value: String(draft.perMinute),
      placeholder: '3',
      type: 'number',
      onChange: (v) => {
        if (isValidIntStr(v, false)) {
          draft.perMinute = parseInt(v, 10);
          fieldValid.perMinute = true;
          setErrClass(perMinute.input, false);
          perMinuteErr.textContent = '';
        } else {
          fieldValid.perMinute = false;
          setErrClass(perMinute.input, true);
          perMinuteErr.textContent = '请输入大于 0 的整数';
        }
        refreshConfirmDisabled();
      },
    });
    perMinute.input.min = '1';
    perMinute.input.step = '1';
    wrap.appendChild(perMinute.row);
    const perMinuteErr = createErrEl(doc);
    wrap.appendChild(perMinuteErr);

    const maxRetries = createLabeledInput(doc, {
      label: '失败重试次数（>= 0 的整数）',
      value: String(draft.maxRetries),
      placeholder: '1',
      type: 'number',
      onChange: (v) => {
        if (isValidIntStr(v, true)) {
          draft.maxRetries = parseInt(v, 10);
          fieldValid.maxRetries = true;
          setErrClass(maxRetries.input, false);
          maxRetriesErr.textContent = '';
        } else {
          fieldValid.maxRetries = false;
          setErrClass(maxRetries.input, true);
          maxRetriesErr.textContent = '请输入大于或等于 0 的整数';
        }
        refreshConfirmDisabled();
      },
    });
    maxRetries.input.min = '0';
    maxRetries.input.step = '1';
    wrap.appendChild(maxRetries.row);
    const maxRetriesErr = createErrEl(doc);
    wrap.appendChild(maxRetriesErr);

    // ─── 成员管理 ────────────────────────────────────────
    wrap.appendChild(createZoneTitle(doc, '成员管理'));
    const membersZone = doc.createElement('div');
    membersZone.style.cssText = 'display:flex;flex-direction:column;gap:6px;';
    wrap.appendChild(membersZone);

    const memberCountEl = doc.createElement('div');
    memberCountEl.style.cssText = 'font-size:11.5px;color:var(--yyt-text-secondary,#9aa0a8);';
    membersZone.appendChild(memberCountEl);

    const membersList = doc.createElement('div');
    membersList.style.cssText = 'display:flex;flex-direction:column;gap:4px;max-height:280px;overflow-y:auto;padding:4px 2px;border:1px solid rgba(255,255,255,0.06);border-radius:6px;';
    membersZone.appendChild(membersList);

    const memberActions = doc.createElement('div');
    memberActions.style.cssText = 'display:flex;gap:6px;margin-top:4px;';
    membersZone.appendChild(memberActions);

    const newFriendBtn = doc.createElement('button');
    newFriendBtn.type = 'button';
    newFriendBtn.className = 'yyt-btn yyt-btn-secondary';
    newFriendBtn.textContent = '+ 新建好友';
    newFriendBtn.style.fontSize = '12px';
    memberActions.appendChild(newFriendBtn);

    function renderMembers() {
      const friends = qqStorage.listFriends();
      memberCountEl.textContent = friends.length === 0
        ? '尚无好友，点击 "+ 新建好友" 添加'
        : `共 ${friends.length} 个好友，已加入 ${draft.memberIds.length}`;

      membersList.innerHTML = '';
      if (friends.length === 0) {
        const empty = doc.createElement('div');
        empty.style.cssText = 'padding:14px 4px;color:var(--yyt-text-secondary,#9aa0a8);font-size:12px;text-align:center;';
        empty.textContent = '暂无好友';
        membersList.appendChild(empty);
        return;
      }

      for (const friend of friends) {
        const inMember = draft.memberIds.includes(friend.id);
        const row = doc.createElement('div');
        row.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;background:rgba(255,255,255,0.03);';

        const cb = doc.createElement('input');
        cb.type = 'checkbox';
        cb.checked = inMember;
        cb.style.cssText = 'width:16px;height:16px;cursor:pointer;flex-shrink:0;';
        cb.addEventListener('change', () => {
          if (cb.checked) {
            if (!draft.memberIds.includes(friend.id)) draft.memberIds.push(friend.id);
          } else {
            draft.memberIds = draft.memberIds.filter((id) => id !== friend.id);
          }
          memberCountEl.textContent = `共 ${friends.length} 个好友，已加入 ${draft.memberIds.length}`;
        });
        row.appendChild(cb);

        const info = doc.createElement('div');
        info.style.cssText = 'flex:1;min-width:0;';
        const name = doc.createElement('div');
        name.style.cssText = 'font-size:13px;color:var(--yyt-text,#f2f2f2);';
        name.textContent = friend.name || '未命名';
        info.appendChild(name);
        const desc = doc.createElement('div');
        desc.style.cssText = 'font-size:11px;color:var(--yyt-text-secondary,#9aa0a8);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';
        desc.textContent = String(friend.description || '').slice(0, 60);
        info.appendChild(desc);
        row.appendChild(info);

        const editBtn = doc.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'yyt-btn yyt-btn-secondary';
        editBtn.style.cssText = 'font-size:11px;padding:3px 8px;flex-shrink:0;';
        const hasCustom = !!draft.perMemberPrompt[friend.id];
        editBtn.textContent = hasCustom ? '编辑专属 prompt ●' : '编辑专属 prompt';
        editBtn.title = hasCustom ? '已设置专属 prompt' : '使用默认 Phase 2 prompt';
        editBtn.addEventListener('click', async () => {
          const result = await openPerMemberPromptDialog({
            doc,
            friend,
            currentValue: draft.perMemberPrompt[friend.id] || '',
          });
          if (result.cancelled) return;
          const v = String(result.value || '').trim();
          if (v) draft.perMemberPrompt[friend.id] = v;
          else delete draft.perMemberPrompt[friend.id];
          const updated = !!draft.perMemberPrompt[friend.id];
          editBtn.textContent = updated ? '编辑专属 prompt ●' : '编辑专属 prompt';
          editBtn.title = updated ? '已设置专属 prompt' : '使用默认 Phase 2 prompt';
        });
        row.appendChild(editBtn);

        membersList.appendChild(row);
      }
    }

    newFriendBtn.addEventListener('click', async () => {
      const friend = await openFriendCreateDialog({ qqStorage, logger, targetDoc: doc });
      if (!friend) return;
      if (!draft.memberIds.includes(friend.id)) draft.memberIds.push(friend.id);
      renderMembers();
    });

    renderMembers();

    // ─── 保存阻塞提示（dialog 底部）──────────────────────
    saveBlockerEl = doc.createElement('div');
    saveBlockerEl.className = 'yyt-qq-save-blocker';
    wrap.appendChild(saveBlockerEl);

    // ─── dialog 包装 ─────────────────────────────────────
    const inst = dialog.custom({
      title: `${group.name} - 群配置`,
      body: wrap,
      width: '560px',
      wide: true,
      buttons: [
        { label: '取消', variant: 'ghost', onClick: (close) => close({ updated: false }) },
        {
          label: '保存',
          variant: 'primary',
          onClick: (close) => {
            try {
              if (!fieldValid.regex || !fieldValid.perMinute || !fieldValid.maxRetries || !fieldValid.apiPresetName) {
                logger?.warn?.(`[QQ GroupConfig] 校验未通过，拒绝保存`);
                return;
              }
              const patch = {
                atmosphere: String(draft.atmosphere || ''),
                apiPresetName: String(draft.apiPresetName || ''),
                triggerSources: {
                  ...(group.triggerSources || {}),
                  userMessage: !!draft.userMessageEnabled,
                },
                phase1Config: {
                  promptTemplate: String(draft.phase1Prompt || ''),
                  parseRegex: String(draft.phase1Regex || ''),
                },
                rateLimitConfig: {
                  ...(group.rateLimitConfig || {}),
                  perMinute: Number.isFinite(draft.perMinute) && draft.perMinute > 0
                    ? draft.perMinute
                    : DEFAULT_PER_MINUTE,
                },
                failureConfig: {
                  ...(group.failureConfig || {}),
                  maxRetries: Number.isFinite(draft.maxRetries) && draft.maxRetries >= 0
                    ? draft.maxRetries
                    : DEFAULT_MAX_RETRIES,
                },
                memberIds: [...draft.memberIds],
                perMemberPrompt: { ...draft.perMemberPrompt },
              };
              qqStorage.updateGroup(group.id, patch);
              close({ updated: true });
            } catch (err) {
              logger?.error?.(`[QQ GroupConfig] 保存异常: ${err?.message || err}`, err);
            }
          },
        },
      ],
      onMounted: ({ overlay, close }) => {
        try {
          dialogCloseRef = close;
          const buttons = overlay.querySelectorAll('.yyt-dialog-footer .yyt-btn');
          confirmBtnRef = buttons[buttons.length - 1] || null;
          // 初次进入：根据当前 apiPresetName 状态高亮 + 调用一次校验
          if (!fieldValid.apiPresetName) {
            setErrClass(presetSelect, true);
            presetErr.textContent = '必须选择一个 API 预设，否则无法触发 AI 响应';
          }
          updateRegexValidity();
          refreshConfirmDisabled();
        } catch (_) {}
      },
    });

    inst.result.then((r) => resolve(r || { updated: false }));
  });
}
