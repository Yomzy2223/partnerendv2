"use client";

import { Badge, Table } from "flowbite-react";
import numeral from "numeral";

export const OngoingTable = () => {
  return (
    <div>
      <Table striped hoverable className="drop-shadow-none">
        <Table.Head>
          <Table.HeadCell className="text-gray-500">S/N</Table.HeadCell>
          <Table.HeadCell className="text-gray-500">
            Business name
          </Table.HeadCell>
          <Table.HeadCell className="text-gray-500">
            Service type
          </Table.HeadCell>
          <Table.HeadCell className="text-gray-500">
            Status
          </Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {mockData.map((data, index) => (
            <Table.Row key={index}>
              <Table.Cell>{numeral(index + 1).format("00")}</Table.Cell>
              <Table.Cell>
                <p className="text-gray-900 font-semibold text-sm">
                  {data.businessName}
                </p>
              </Table.Cell>
              <Table.Cell>
                <Badge color={data.color} className="w-fit">
                  {data.serviceType}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Badge  className="w-fit">
                  {data.status}
                </Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="px-4 pt-4 flex justify-between">
        <p className="text-sm text-gray-500">
          Showing <span className="text-gray-900 font-semibold">1-9</span> of{" "}
          <span className="text-gray-900 font-semibold">1000</span>
        </p>
      </div>
    </div>
  );
};

const mockData = [
  {
    businessName: "Sayo oil and gas",
    serviceType: "Business certification",
    color: "green",
    status: "Pending"
  },
  {
    businessName: "Sayo oil and gas",
    serviceType: "TaxMaxPro registration",
    color: "blue",
    status: "In progress"
  },
  {
    businessName: "Sayo oil and gas",
    serviceType: "Business certification",
    color: "green",
    status: "Pending"
  },
  {
    businessName: "Sayo oil and gas",
    serviceType: "TaxMaxPro registration",
    color: "blue",
    status: "Pending"

  },
  {
    businessName: "Sayo oil and gas",
    serviceType: "Business certification",
    color: "green",
    status: "Pending"
  },
  {
    businessName: "Sayo oil and gas",
    serviceType: "TaxMaxPro registration",
    color: "blue",
    status: "Pending"
  },
  {
    businessName: "Sayo oil and gas",
    serviceType: "Business certification",
    color: "green",
    status: "Pending"
  },
  {
    businessName: "Sayo oil and gas",
    serviceType: "TaxMaxPro registration",
    color: "blue",
    status: "Pending"
  },
  {
    businessName: "Sayo oil and gas",
    serviceType: "Business certification",
    color: "green",
    status: "Pending"
  },
];
