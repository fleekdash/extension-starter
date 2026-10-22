import { useForm } from "react-hook-form";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../organisms/Button";
import { Input } from "../../organisms/Input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./index";

const meta = {
  title: "Components/Inputs/Form",
  component: Form,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "react-hook-form field composition: `Form` (FormProvider) + `FormField`/`FormItem`/`FormLabel`/`FormControl`/`FormDescription`/`FormMessage`.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Form>;

export default meta;
// Form is FormProvider — every RHF method is a required prop, so stories
// here render the composed <WidgetForm> instead of wiring controls.
type Story = StoryObj;

interface WidgetFormValues {
  title: string;
  refreshMinutes: string;
}

function WidgetForm() {
  const form = useForm<WidgetFormValues>({
    defaultValues: { title: "", refreshMinutes: "30" },
  });
  return (
    <Form {...form}>
      <form
        className="w-80 space-y-4"
        onSubmit={form.handleSubmit(() => {})}
        noValidate>
        <FormField
          control={form.control}
          name="title"
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Widget title</FormLabel>
              <FormControl>
                <Input placeholder="Monthly revenue" {...field} />
              </FormControl>
              <FormDescription>Shown in the widget header.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="refreshMinutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Refresh interval</FormLabel>
              <FormControl>
                <Input type="number" min={1} {...field} />
              </FormControl>
              <FormDescription>Minutes between refreshes.</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

export const Basic: Story = {
  render: () => <WidgetForm />,
};

export const WithValidationError: Story = {
  render: () => <WidgetForm />,
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector("form");
    form?.requestSubmit();
  },
};
