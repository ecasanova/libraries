import dayjs from "dayjs";

export default function DayjsExample() {
  const formatted = dayjs().format("DD/MM/YYYY");
  return <div>{formatted}</div>;
}
