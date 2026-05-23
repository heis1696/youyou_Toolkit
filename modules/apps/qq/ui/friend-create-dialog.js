/**
 * YouYou Toolkit - QQ App Phase C1 friend create dialog
 *
 * 快速新建好友的最小弹窗。name + description 两字段。
 * 嵌套在群配置弹窗中调用，确定后返回 friend 对象（已写入 storage）。
 */

import { dialog } from '../../../ui/components/controls/index.js';
import { createDefaultFriend } from '../qq-types.js';

export function openFriendCreateDialog({ qqStorage, logger, targetDoc }) {
  const doc = targetDoc || globalThis.document || document;

  return new Promise((resolve) => {
    const wrap = doc.createElement('div');
    wrap.className = 'yyt-qq-friend-create-body';

    const nameRow = doc.createElement('div');
    nameRow.className = 'yyt-form-row';
    const nameLabel = doc.createElement('div');
    nameLabel.className = 'yyt-form-label';
    nameLabel.textContent = '名字';
    const nameInput = doc.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'yyt-input';
    nameInput.placeholder = '好友名字（必填，最多 30 字）';
    nameInput.maxLength = 30;
    nameRow.appendChild(nameLabel);
    nameRow.appendChild(nameInput);
    wrap.appendChild(nameRow);

    const descRow = doc.createElement('div');
    descRow.className = 'yyt-form-row';
    const descLabel = doc.createElement('div');
    descLabel.className = 'yyt-form-label';
    descLabel.textContent = '描述（人设）';
    const descInput = doc.createElement('textarea');
    descInput.className = 'yyt-input';
    descInput.placeholder = '简短描述这个 NPC 的性格 / 说话风格 / 背景';
    descInput.rows = 4;
    descInput.style.resize = 'vertical';
    descInput.style.minHeight = '80px';
    descRow.appendChild(descLabel);
    descRow.appendChild(descInput);
    wrap.appendChild(descRow);

    const errEl = doc.createElement('div');
    errEl.style.color = 'var(--yyt-danger, #f87171)';
    errEl.style.fontSize = '12px';
    errEl.style.marginTop = '6px';
    errEl.style.minHeight = '14px';
    wrap.appendChild(errEl);

    const inst = dialog.custom({
      title: '新建好友',
      body: wrap,
      width: '420px',
      buttons: [
        {
          label: '取消',
          variant: 'ghost',
          onClick: (close) => close(null),
        },
        {
          label: '创建',
          variant: 'primary',
          onClick: (close) => {
            const name = String(nameInput.value || '').trim();
            const description = String(descInput.value || '').trim();
            if (!name) {
              errEl.textContent = '名字不能为空';
              nameInput.focus();
              return;
            }
            try {
              const friend = qqStorage.addFriend(createDefaultFriend({ name, description }));
              if (!friend) {
                errEl.textContent = '创建失败';
                logger?.warn?.(`[QQ FriendCreate] addFriend 返回空`);
                return;
              }
              close(friend);
            } catch (err) {
              errEl.textContent = err?.message || '创建异常';
              logger?.error?.(`[QQ FriendCreate] 异常: ${err?.message || err}`, err);
            }
          },
        },
      ],
      onMounted: () => {
        try { nameInput.focus(); } catch (_) {}
      },
    });

    inst.result.then((value) => resolve(value || null));
  });
}
