import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../organisms/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHandle,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./index";

const meta = {
  title: "Components/Overlay/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Vaul drawer primitive — bottom sheet with handle, header/footer composition and scrim. Nested modals inside drawers use `useVaulModal`, never a second `Drawer`.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BottomSheet: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHandle />
        <DrawerHeader>
          <DrawerTitle>Widget settings</DrawerTitle>
          <DrawerDescription>
            Configure how this widget renders on the dashboard.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <p className="text-muted-foreground text-sm">
            Drawer body content — forms, lists or previews go here.
          </p>
        </div>
        <DrawerFooter>
          <Button>Save changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const ModalStyle: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open modal drawer</Button>
      </DrawerTrigger>
      <DrawerContent isModal>
        <DrawerHeader>
          <DrawerTitle>Fade-out close</DrawerTitle>
          <DrawerDescription>
            `isModal` swaps the slide-out animation for a fade.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
