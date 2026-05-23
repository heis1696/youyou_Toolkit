/**
 * YouYou Toolkit - QQ App Styles (Phase B)
 *
 * 设计约束 (B5):
 *   - 独立 <style> 元素，document-scoped 不带 PID 前缀
 *   - `.yyt-qq-*` class 前缀，避免与 floating-ball/styles.js 冲突
 *   - 复用现有 `--yyt-*` CSS 变量；不引入新 token
 *   - 幂等：data-yyt-qq-styles 标记复用同一 <style>
 */

const STYLE_MARK = 'data-yyt-qq-styles';

const CSS = `
/* ─── 通用 ─────────────────────────────────────────────── */
.yyt-qq-empty {
  padding: 40px 16px;
  text-align: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.42);
  line-height: 1.6;
}
.yyt-qq-empty-title {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 6px;
}

/* ─── 主页：群列表 ────────────────────────────────────── */
.yyt-qq-home {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}
.yyt-qq-home-list {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
  padding: 6px 0 80px 0;
}
.yyt-qq-home-list::-webkit-scrollbar { display: none; }

.yyt-qq-home-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.12s;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}
.yyt-qq-home-item:hover {
  background: rgba(255, 255, 255, 0.04);
}
.yyt-qq-home-item:active {
  background: rgba(255, 255, 255, 0.07);
}

.yyt-qq-home-item-avatar {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(140deg, #4a90d9 0%, #2c5fa1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.yyt-qq-home-item-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.yyt-qq-home-item-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}
.yyt-qq-home-item-name {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.yyt-qq-home-item-time {
  flex-shrink: 0;
  font-size: 10.5px;
  color: rgba(255, 255, 255, 0.4);
  font-family: 'Consolas', 'Monaco', monospace;
}
.yyt-qq-home-item-preview {
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.5);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.4;
}
.yyt-qq-home-item-preview.is-empty {
  font-style: italic;
  color: rgba(255, 255, 255, 0.32);
}

/* "新建群" 浮动按钮 */
.yyt-qq-home-new-btn {
  position: absolute;
  right: 14px;
  bottom: 16px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: linear-gradient(140deg, #5b9bd9 0%, #3a6db5 100%);
  color: #fff;
  font-size: 24px;
  font-weight: 300;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(91, 155, 217, 0.4), 0 0 0 1px rgba(123, 183, 255, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.18);
  transition: transform 0.15s, box-shadow 0.15s;
  -webkit-tap-highlight-color: transparent;
  z-index: 3;
}
.yyt-qq-home-new-btn:hover {
  transform: translateY(-1px) scale(1.04);
  box-shadow: 0 8px 22px rgba(91, 155, 217, 0.5), 0 0 0 1px rgba(123, 183, 255, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.22);
}
.yyt-qq-home-new-btn:active {
  transform: scale(0.94);
}

/* ─── 群聊页 ──────────────────────────────────────────── */
.yyt-qq-chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background: linear-gradient(180deg, #0d0e12 0%, #0a0b0f 100%);
}

/* 顶部群信息条（群名 + "成员" 按钮） */
.yyt-qq-group-info-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.02);
}
.yyt-qq-group-info-meta {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.yyt-qq-group-info-name {
  font-size: 12.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.yyt-qq-group-info-count {
  font-size: 10.5px;
  color: rgba(255, 255, 255, 0.45);
}
.yyt-qq-group-info-btn {
  flex-shrink: 0;
  padding: 5px 11px;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.78);
  font-size: 11px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.12s, color 0.12s;
}
.yyt-qq-group-info-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
.yyt-qq-group-info-btn:active {
  background: rgba(255, 255, 255, 0.14);
}

/* 消息流 */
.yyt-qq-chat-stream {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
  padding: 10px 12px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.yyt-qq-chat-stream::-webkit-scrollbar { display: none; }

.yyt-qq-chat-empty {
  margin: auto;
  text-align: center;
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.35);
  padding: 32px 16px;
  line-height: 1.6;
}

/* 单条消息 */
.yyt-qq-chat-msg {
  display: flex;
  gap: 8px;
  max-width: 100%;
}
.yyt-qq-chat-msg.is-self {
  flex-direction: row-reverse;
}
.yyt-qq-chat-msg.is-system {
  justify-content: center;
}

.yyt-qq-chat-msg-avatar {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(140deg, #6a6f7a 0%, #3a3d44 100%);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
}
.yyt-qq-chat-msg.is-self .yyt-qq-chat-msg-avatar {
  background: linear-gradient(140deg, #4a90d9 0%, #2c5fa1 100%);
}

.yyt-qq-chat-msg-body {
  display: flex;
  flex-direction: column;
  gap: 3px;
  max-width: calc(100% - 50px);
  min-width: 0;
}
.yyt-qq-chat-msg.is-self .yyt-qq-chat-msg-body {
  align-items: flex-end;
}

.yyt-qq-chat-msg-sender {
  font-size: 10.5px;
  color: rgba(255, 255, 255, 0.45);
  padding: 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.yyt-qq-chat-msg-bubble {
  padding: 7px 11px;
  border-radius: 12px;
  font-size: 12.5px;
  line-height: 1.45;
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.04);
  max-width: 100%;
}
.yyt-qq-chat-msg.is-self .yyt-qq-chat-msg-bubble {
  background: linear-gradient(140deg, #4a90d9 0%, #2c5fa1 100%);
  color: #fff;
  box-shadow: 0 1px 5px rgba(74, 144, 217, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.yyt-qq-chat-msg.is-system .yyt-qq-chat-msg-bubble {
  background: transparent;
  box-shadow: none;
  color: rgba(255, 255, 255, 0.4);
  font-size: 11px;
  font-style: italic;
  padding: 4px 12px;
}

.yyt-qq-chat-msg-time {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.32);
  padding: 0 4px;
  font-family: 'Consolas', 'Monaco', monospace;
}

/* 输入栏 */
.yyt-qq-chat-input-bar {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 8px 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.02);
  flex-shrink: 0;
}
.yyt-qq-chat-input {
  flex: 1;
  min-width: 0;
  resize: none;
  min-height: 34px;
  max-height: 96px;
  padding: 8px 11px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.92);
  font-size: 12.5px;
  line-height: 1.4;
  font-family: inherit;
  outline: none;
  transition: border-color 0.12s, background 0.12s;
}
.yyt-qq-chat-input::placeholder {
  color: rgba(255, 255, 255, 0.32);
}
.yyt-qq-chat-input:focus {
  border-color: rgba(123, 183, 255, 0.45);
  background: rgba(255, 255, 255, 0.06);
}
.yyt-qq-chat-send-btn {
  flex-shrink: 0;
  height: 34px;
  padding: 0 14px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(140deg, #5b9bd9 0%, #3a6db5 100%);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.1s, box-shadow 0.12s, opacity 0.12s;
  box-shadow: 0 2px 6px rgba(91, 155, 217, 0.3);
}
.yyt-qq-chat-send-btn:hover {
  box-shadow: 0 3px 10px rgba(91, 155, 217, 0.4);
}
.yyt-qq-chat-send-btn:active {
  transform: scale(0.95);
}
.yyt-qq-chat-send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: none;
}

/* Phase C1: thinking pill + disabled input */
.yyt-qq-thinking-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 10px;
  border-radius: 10px;
  background: rgba(91, 155, 217, 0.18);
  color: #b3d1f0;
  font-size: 11px;
  font-weight: 500;
  margin-left: 6px;
  animation: yyt-qq-thinking-pulse 1.4s ease-in-out infinite;
  white-space: nowrap;
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.yyt-qq-thinking-pill.is-error {
  background: rgba(248, 113, 113, 0.18);
  color: #f87171;
  animation: none;
}
@keyframes yyt-qq-thinking-pulse {
  0%, 100% { opacity: 0.6; }
  50%      { opacity: 1.0; }
}
.yyt-qq-chat-input.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
.yyt-qq-chat-send-btn.is-disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: none;
}

/* 群配置弹窗：输入校验红边 / API 预设选择器 */
.yyt-qq-input-error,
.yyt-input.yyt-qq-input-error {
  border-color: var(--yyt-danger, #f87171) !important;
  box-shadow: 0 0 0 1px rgba(248, 113, 113, 0.35) !important;
}
.yyt-qq-field-err {
  color: var(--yyt-danger, #f87171);
  font-size: 11.5px;
  margin-top: 4px;
  min-height: 14px;
  line-height: 1.4;
}
.yyt-qq-profile-select {
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
.yyt-qq-profile-select.yyt-qq-input-error {
  border-color: var(--yyt-danger, #f87171) !important;
}
`;

export function injectQQStyles(targetDoc) {
  if (!targetDoc) return null;
  const doc = targetDoc;
  const existing = doc.querySelector(`style[${STYLE_MARK}]`);
  if (existing) return existing;

  const styleEl = doc.createElement('style');
  styleEl.setAttribute(STYLE_MARK, '1');
  styleEl.textContent = CSS;
  (doc.head || doc.documentElement).appendChild(styleEl);
  return styleEl;
}

export function removeQQStyles(targetDoc) {
  if (!targetDoc) return false;
  const existing = targetDoc.querySelector(`style[${STYLE_MARK}]`);
  if (existing && existing.parentNode) {
    existing.parentNode.removeChild(existing);
    return true;
  }
  return false;
}
