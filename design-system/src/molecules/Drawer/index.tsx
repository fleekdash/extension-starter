"use client";

import { cn } from "../../internal";
import { PORTAL_SCRIM_SURFACE_CLASS } from "../../molecules/PortalOverlay";
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

const Drawer = DrawerPrimitive.Root;
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-100", PORTAL_SCRIM_SURFACE_CLASS, className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    /** When true, uses fade-out animation on close instead of slide */
    isModal?: boolean;
  }
>(({ className, children, isModal, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "z-110 flex h-auto flex-col shadow-lg transition ease-in-out",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        // Modal variant: fade out on close, slide in on open
        isModal
          ? "data-[state=closed]:fade-out-0 data-[state=open]:slide-in-from-top-1/2"
          : "data-[state=closed]:duration-300 data-[state=open]:duration-500",
        className,
      )}
      {...props}>
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-start",
      className,
    )}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg leading-none font-semibold tracking-tight",
      className,
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

const DrawerHandle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Handle>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Handle>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Handle ref={ref} className={cn(className)} {...props} />
));
DrawerHandle.displayName = DrawerPrimitive.Handle.displayName;

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
};
