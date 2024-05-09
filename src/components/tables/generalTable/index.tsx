"use client";

import QueryNav2 from "@/components/navigation/queryNav2";
import SearchComp from "@/components/search";
import CardWrapper from "@/components/wrappers/cardWrapper";
import { cn } from "@/lib/utils";
import { Table } from "flowbite-react";
import React, { HTMLAttributes } from "react";

interface propTypes {
  title?: string;
  tableHeaders: string[];
  tableBody: {
    rowInfo: { text: string; cellProps?: HTMLAttributes<HTMLSpanElement> }[];
    rowProps?: HTMLAttributes<HTMLSpanElement>;
  }[];
  serviceTableNav?: { name: string; value: string }[];
  hideSearch?: boolean;
}

const GeneralTable = ({
  title,
  tableHeaders,
  tableBody,
  serviceTableNav,
  hideSearch,
}: propTypes) => {
  return (
    <CardWrapper className="max-w-full overflow-auto p-0 pb-6">
      {(title || serviceTableNav || !hideSearch) && (
        <div className="flex justify-between gap-6 sticky left-0 px-4 my-6">
          <div>
            {title && <p className="sb-text-24 font-semibold mb-3">{title}</p>}
            {serviceTableNav && (
              <div className="flex flex-col gap-3 text-sm font-normal md:gap-4 md:flex-row md:items-center">
                <span>Show only:</span>
                <QueryNav2 queryNav={serviceTableNav} />
              </div>
            )}
          </div>
          {!hideSearch && (
            <SearchComp onSubmit={() => console.log("searching...")} />
          )}
        </div>
      )}

      <Table hoverable striped>
        <Table.Head>
          {tableHeaders.map((el) => (
            <Table.HeadCell
              key={el}
              className="p-4 border-b border-foreground-2"
            >
              {el}
            </Table.HeadCell>
          ))}
        </Table.Head>

        <Table.Body>
          {tableBody.map((row, i) => (
            <Table.Row
              key={i}
              {...row.rowProps}
              className={cn({ "cursor-pointer": row.rowProps?.onClick })}
            >
              {row.rowInfo.map((cell) => (
                <Table.Cell
                  key={cell.text}
                  {...cell.cellProps}
                  className={cn(
                    "whitespace-nowrap p-4",
                    cell.cellProps?.className
                  )}
                >
                  <span>{cell.text}</span>
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </CardWrapper>
  );
};

export default GeneralTable;

