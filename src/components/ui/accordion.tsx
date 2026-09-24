"use client"

import * as React from "react"
import { cn } from "cn"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { Icon } from "@/components/icons/icon"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-line", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex flex-1 items-center justify-between gap-6 py-6 text-left text-lg font-semibold text-ink transition-colors duration-200 hover:text-brass focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink transition-[background-color,border-color] duration-200 group-hover/accordion-trigger:border-ink/30 group-aria-expanded/accordion-trigger:bg-ink group-aria-expanded/accordion-trigger:text-paper">
          <Icon
            name="alt-arrow-down"
            className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [&_path]:stroke-2 group-aria-expanded/accordion-trigger:rotate-180"
          />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div className={cn("max-w-lg pb-7 text-base leading-7 text-ink-soft", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
