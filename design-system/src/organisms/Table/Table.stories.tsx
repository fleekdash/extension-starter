import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../../atoms/Badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./index";

const meta = {
  title: "Components/Data Display/Table",
  component: Table,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Semantic table primitives — header/body/footer/caption — used by the table widget panels.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const ROWS = [
  { name: "Revenue chart", type: "chart", size: "hero", status: "published" },
  { name: "Top posts", type: "table", size: "body", status: "published" },
  { name: "World map", type: "map", size: "rail", status: "draft" },
];

export const Basic: Story = {
  render: () => (
    <div className="w-[560px]">
      <Table>
        <TableCaption>Dashboard widgets</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row) => (
            <TableRow key={row.name}>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.size}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    row.status === "published" ? "default" : "secondary"
                  }>
                  {row.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{ROWS.length} widgets</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),
};
