import { Meta, StoryFn } from "@storybook/react";
import { IntlProvider } from "react-intl";
import TableComponent, { IColumn, IProps, ITableData } from "./Table";

const messages = {
  "base.table.noData": "No data available",
  "base.state.loading": "Loading...",
};

export default {
  title: "Components/Table",
  component: TableComponent,
  decorators: [
    (Story) => (
      <IntlProvider locale="en" messages={messages}>
        <Story />
      </IntlProvider>
    ),
  ],
} as Meta;

const Template: StoryFn<IProps> = (args) => <TableComponent {...args} />;

const headerColumns: IColumn[] = [
  { label: "Name", key: "name" },
  { label: "Age", key: "age" },
  { label: "Email", key: "email" },
];

const data: ITableData[] = [
  { name: "John Doe", age: 30, email: "john@example.com" },
  { name: "Jane Smith", age: 25, email: "jane@example.com" },
];

export const Default = Template.bind({});
Default.args = {
  headerColumns,
  data,
};

export const NoData = Template.bind({});
NoData.args = {
  headerColumns,
  data: [],
};

export const Loading = Template.bind({});
Loading.args = {
  headerColumns,
  data,
  isLoading: true,
};

export const CustomNoDataText = Template.bind({});
CustomNoDataText.args = {
  headerColumns,
  data: [],
  noDataText: "Custom no data message",
};

export const CustomClassName = Template.bind({});
CustomClassName.args = {
  headerColumns,
  data,
  className: "custom-class",
};
