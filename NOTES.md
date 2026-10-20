# Accessibility review: hand-built components vs. shadcn/ui

## What I built by hand

The `playground/` folder contains three React + TypeScript components without using a component library:

- `ModalDialog.tsx`: dialog semantics, Escape handling, Tab / Shift+Tab focus loop, initial focus, body scroll lock, and focus restoration.
- `Tabs.tsx`: tablist/tab/tabpanel roles, selected state, roving `tabIndex`, arrow keys, Home and End, and disabled-tab skipping.
- `Disclosure.tsx`: native button interaction, `aria-expanded`, `aria-controls`, and collapsed panel hiding.

## Concrete gaps found during comparison

1. **Dialog lifecycle and focus edge cases:** my hand-built modal implements a basic focus loop, but it is not a complete focus-management system. It does not use a portal-aware primitive with comprehensive handling for nested overlays, focus guards, and interactions across more complex page structures. Radix Dialog (used by shadcn/ui) encapsulates a more thoroughly tested modal lifecycle and focus behavior.
2. **Background interaction and modal isolation:** the custom dialog sets `aria-modal="true"` and locks body scrolling, but it does not robustly make every outside subtree inert or manage all pointer/focus interactions with the same depth as a mature dialog primitive. `aria-modal` alone does not physically prevent background interaction.
3. **Tabs orientation and activation configuration:** the custom tabs implementation only targets a horizontal tablist with automatic activation. Radix Tabs supports configurable orientation and activation mode, and its primitive handles more of the expected keyboard and directionality behavior for different layouts.
4. **Production edge cases and maintenance:** custom keyboard handlers and focus selectors are code we must maintain and test as browser behavior and requirements evolve. shadcn's Dialog and Tabs wrappers delegate the interaction contract to Radix UI primitives, while keeping the wrapper source available for styling and review.

## What shadcn handles that I initially missed

- A reusable dialog primitive for portal rendering, modal lifecycle, focus management, outside interaction, and focus restoration.
- A reusable tabs primitive for roving focus, orientation / activation configuration, and consistent ARIA relationships.
- Mature primitive-level behavior that avoids duplicating every keyboard and focus edge case in each app.

## Important limitations of this exercise

These are qualitative source-review findings, not a claim that every possible edge case has been exhaustively tested. Before submitting, run the shadcn CLI commands in `README.md`, inspect the generated `src/components/ui/dialog.tsx` and `src/components/ui/tabs.tsx` files for the installed version, and adjust these notes if the generated source differs. The custom components remain intentionally in `playground/`; the demo under “shadcn / Radix demo” uses the Radix-based wrappers in `src/components/ui/`.

## Keyboard test checklist

### Modal dialog

- [ ] Tab enters and cycles within the dialog.
- [ ] Shift+Tab cycles backward within the dialog.
- [ ] Escape closes the dialog.
- [ ] Focus returns to the original trigger after closing.
- [ ] The title labels the dialog and the description is associated when present.
- [ ] Clicking the backdrop closes it; clicking inside does not.

### Tabs

- [ ] Tab enters the active tab; inactive tabs are not in the normal Tab order.
- [ ] Left / Right Arrow moves focus and selection.
- [ ] Home / End selects first / last enabled tab.
- [ ] Disabled tabs are skipped.
- [ ] Tab moves from the active tab into the panel content.

### Disclosure

- [ ] Tab focuses the disclosure button.
- [ ] Enter and Space toggle it using native button behavior.
- [ ] `aria-expanded` tracks visibility.
- [ ] The controlled panel is hidden when collapsed.

## References

- WAI-ARIA APG: Dialog (Modal) Pattern — https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- WAI-ARIA APG: Tabs Pattern — https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- WAI-ARIA APG: Disclosure Pattern — https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
- shadcn/ui Dialog — https://ui.shadcn.com/docs/components/dialog
- shadcn/ui Tabs — https://ui.shadcn.com/docs/components/tabs
