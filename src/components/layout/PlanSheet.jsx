// @ts-nocheck
import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import ROICalculator from '../home/ROICalculator';

/**
 * The "Plan your inspection" side panel. Split out of PlanDock so the dialog
 * code only loads when a visitor first opens it.
 */
export default function PlanSheet({ open, setOpen, label, t, returnFocusTo }) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        data-lenis-prevent
        // The dock button is hidden while the panel is open; send focus back to it on close.
        onCloseAutoFocus={(e) => { e.preventDefault(); requestAnimationFrame(() => returnFocusTo?.current?.focus()); }}
        className="w-full sm:max-w-md overflow-y-auto overscroll-contain p-5 sm:p-6 bg-background"
      >
        <div className="pr-8 mb-5">
          <p className="text-[11px] font-display font-semibold tracking-[0.2em] uppercase text-primary mb-1.5">{t('roi.label')}</p>
          <SheetTitle className="font-display font-bold text-2xl text-foreground tracking-tight">{label}</SheetTitle>
          <SheetDescription className="mt-1.5 text-sm text-foreground/75">{t('roi.description')}</SheetDescription>
        </div>
        {open && <ROICalculator layout="panel" onSubmit={() => setOpen(false)} />}
      </SheetContent>
    </Sheet>
  );
}
