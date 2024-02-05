import { usePathname, useRouter } from "next/navigation";

export const useTableInfo = () => {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => console.log("You clicked on a payment");

  // Services table header
  const tableHeaders = ["S/N", "AMOUNT", "DATE", "TIME"];

  // Services table body
  const tableBody = [
    {
      rowProps: { onClick },
      rowInfo: [
        { text: "01" },
        { text: "#20,000" },
        { text: "12/04/2023" },
        { text: "6:03PM" },
      ],
    },
    {
      rowProps: { onClick },
      rowInfo: [
        { text: "01" },
        { text: "#20,000" },
        { text: "12/04/2023" },
        { text: "6:03PM" },
      ],
    },
    {
      rowProps: { onClick },
      rowInfo: [
        { text: "01" },
        { text: "#20,000" },
        { text: "12/04/2023" },
        { text: "6:03PM" },
      ],
    },
    {
      rowProps: { onClick },
      rowInfo: [
        { text: "01" },
        { text: "#20,000" },
        { text: "12/04/2023" },
        { text: "6:03PM" },
      ],
    },
    {
      rowProps: { onClick },
      rowInfo: [
        { text: "01" },
        { text: "#20,000" },
        { text: "12/04/2023" },
        { text: "6:03PM" },
      ],
    },
    {
      rowProps: { onClick },
      rowInfo: [
        { text: "01" },
        { text: "#20,000" },
        { text: "12/04/2023" },
        { text: "6:03PM" },
      ],
    },
    {
      rowProps: { onClick },
      rowInfo: [
        { text: "01" },
        { text: "#20,000" },
        { text: "12/04/2023" },
        { text: "6:03PM" },
      ],
    },
    {
      rowProps: { onClick },
      rowInfo: [
        { text: "01" },
        { text: "#20,000" },
        { text: "12/04/2023" },
        { text: "6:03PM" },
      ],
    },
  ];

  return {
    tableHeaders,
    tableBody,
  };
};

export const serviceTableNav = [
  {
    name: "payment",
    value: "all",
  },
  {
    name: "payment",
    value: "paid",
  },
  {
    name: "payment",
    value: "unpaid",
  },
];
