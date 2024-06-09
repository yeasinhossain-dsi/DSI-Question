import type { Meta, StoryObj } from "@storybook/react";
import ThreeDots from "./ThreeDots";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Icons/ThreeDots",
  component: ThreeDots,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ThreeDots>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ThreeDotsLogo: Story = { args: { size: 50 } };
