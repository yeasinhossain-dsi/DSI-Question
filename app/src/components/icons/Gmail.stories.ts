import type { Meta, StoryObj } from "@storybook/react";
import Gmail from "./Gmail";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Icons/Gmail",
  component: Gmail,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Gmail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const GmailLogo: Story = { args: { size: 50 } };
