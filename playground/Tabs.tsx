import { useId, useRef, useState, type ReactNode } from 'react';

export interface TabItem { id: string; label: string; content: ReactNode; disabled?: boolean }
export interface TabsProps { items: TabItem[]; label: string }

/** Horizontal automatic-activation tabs with roving tabindex and APG arrow/Home/End behavior. */
export function Tabs({ items, label }: TabsProps) {
  const generatedId = useId();
  const enabledItems = items.filter((item) => !item.disabled);
  const [selectedId, setSelectedId] = useState(() => enabledItems[0]?.id ?? '');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  function focusAt(targetIndex: number, direction: 1 | -1 = 1) {
    if (items.length === 0) return;
    let nextIndex = ((targetIndex % items.length) + items.length) % items.length;
    for (let checked = 0; checked < items.length; checked += 1) {
      if (!items[nextIndex]?.disabled) break;
      nextIndex = (nextIndex + direction + items.length) % items.length;
    }
    const item = items[nextIndex];
    if (!item || item.disabled) return;
    setSelectedId(item.id);
    tabRefs.current[nextIndex]?.focus();
  }

  return <div className="tabs-root">
    <div className="tab-list" role="tablist" aria-label={label}>
      {items.map((item, index) => {
        const active = item.id === selectedId;
        const tabId = `${generatedId}-tab-${item.id}`;
        const panelId = `${generatedId}-panel-${item.id}`;
        return <button
          key={item.id} ref={(element) => { tabRefs.current[index] = element; }}
          id={tabId} type="button" role="tab" className={`tab-trigger ${active ? 'is-active' : ''}`}
          aria-selected={active} aria-controls={panelId} tabIndex={active ? 0 : -1} disabled={item.disabled}
          onClick={() => setSelectedId(item.id)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') { event.preventDefault(); focusAt((index + 1) % items.length, 1); }
            else if (event.key === 'ArrowLeft') { event.preventDefault(); focusAt((index - 1 + items.length) % items.length, -1); }
            else if (event.key === 'Home') { event.preventDefault(); focusAt(items.findIndex((entry) => !entry.disabled)); }
            else if (event.key === 'End') { event.preventDefault(); focusAt(items.map((entry, i) => entry.disabled ? -1 : i).filter((i) => i >= 0).at(-1) ?? 0); }
          }}
        >{item.label}</button>;
      })}
    </div>
    {items.map((item) => item.id === selectedId && <div key={item.id} id={`${generatedId}-panel-${item.id}`} role="tabpanel" aria-labelledby={`${generatedId}-tab-${item.id}`} className="tab-panel" tabIndex={0}>{item.content}</div>)}
  </div>;
}