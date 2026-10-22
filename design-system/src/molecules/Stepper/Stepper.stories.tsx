import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../organisms/Button";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "./index";

const meta = {
  title: "Components/Navigation/Stepper",
  component: Stepper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Stepper with numbered indicators, clickable triggers and separators. `value`/`defaultValue` is the 1-based active step.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const STEPS = [
  { title: "Connector", description: "Pick a data source" },
  { title: "Widget", description: "Choose a widget type" },
  { title: "Layout", description: "Place it on the grid" },
];

export const Horizontal: Story = {
  render: () => (
    <Stepper defaultValue={2} className="w-[560px]">
      {STEPS.map((step, i) => (
        <StepperItem key={step.title} step={i + 1} className="flex-1">
          <StepperTrigger>
            <StepperIndicator />
            <div className="space-y-0.5 text-left">
              <StepperTitle>{step.title}</StepperTitle>
              <StepperDescription>{step.description}</StepperDescription>
            </div>
          </StepperTrigger>
          {i < STEPS.length - 1 && <StepperSeparator />}
        </StepperItem>
      ))}
    </Stepper>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Stepper defaultValue={1} orientation="vertical" className="w-72">
      {STEPS.map((step, i) => (
        <StepperItem key={step.title} step={i + 1}>
          <StepperTrigger>
            <StepperIndicator />
            <div className="space-y-0.5 text-left">
              <StepperTitle>{step.title}</StepperTitle>
              <StepperDescription>{step.description}</StepperDescription>
            </div>
          </StepperTrigger>
          {i < STEPS.length - 1 && <StepperSeparator />}
        </StepperItem>
      ))}
    </Stepper>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [step, setStep] = useState(1);
    return (
      <div className="w-[560px] space-y-4">
        <Stepper value={step} onValueChange={setStep}>
          {STEPS.map((s, i) => (
            <StepperItem key={s.title} step={i + 1} className="flex-1">
              <StepperTrigger>
                <StepperIndicator />
                <StepperTitle>{s.title}</StepperTitle>
              </StepperTrigger>
              {i < STEPS.length - 1 && <StepperSeparator />}
            </StepperItem>
          ))}
        </Stepper>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={step <= 1}
            onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
          <Button
            size="sm"
            disabled={step >= STEPS.length}
            onClick={() => setStep((s) => s + 1)}>
            Next
          </Button>
        </div>
      </div>
    );
  },
};
