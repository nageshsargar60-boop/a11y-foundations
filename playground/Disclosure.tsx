import { useId, useState, type ReactNode } from 'react';
export interface DisclosureProps { title: string; children: ReactNode; defaultOpen?: boolean }

/** A native button controls a region; Enter and Space work without custom key handlers. */
export function Disclosure({ title, children, defaultOpen = false }: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return <section className="disclosure">
    <h3 className="disclosure-heading"><button type="button" className="disclosure-trigger" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((current) => !current)}><span>{title}</span><span className={`chevron ${open ? 'rotated' : ''}`} aria-hidden="true">⌄</span></button></h3>
    <div id={panelId} className="disclosure-panel" hidden={!open}>{children}</div>
  </section>;
}