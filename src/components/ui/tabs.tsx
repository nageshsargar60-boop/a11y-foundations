import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Tabs = TabsPrimitive.Root;
export const TabsList = forwardRef<ElementRef<typeof TabsPrimitive.List>, ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(
  ({ className, ...props }, ref) => <TabsPrimitive.List ref={ref} className={cn('inline-flex min-h-11 items-center gap-1 rounded-2xl bg-slate-100 p-1', className)} {...props} />,
);
TabsList.displayName = 'TabsList';
export const TabsTrigger = forwardRef<ElementRef<typeof TabsPrimitive.Trigger>, ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>(
  ({ className, ...props }, ref) => <TabsPrimitive.Trigger ref={ref} className={cn('rounded-xl px-4 py-2 text-sm font-semibold text-slate-500 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm disabled:pointer-events-none disabled:opacity-40', className)} {...props} />,
);
TabsTrigger.displayName = 'TabsTrigger';
export const TabsContent = forwardRef<ElementRef<typeof TabsPrimitive.Content>, ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>(
  ({ className, ...props }, ref) => <TabsPrimitive.Content ref={ref} className={cn('focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600', className)} {...props} />,
);
TabsContent.displayName = 'TabsContent';