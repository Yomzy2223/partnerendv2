import ComboBox from "@/components/form/dynamicForm/comboBox";
import SearchComp from "@/components/search";
import { Button } from "flowbite-react";
import React, { Dispatch, MouseEvent, SetStateAction } from "react";

const HeaderSection = ({
  tableNav,
  selectOn,
  setSelectOn,
  selectedRows,
  setSelectedRows,
  onSearchChange,
  onSearchSubmit,
  handleFilter,
}: IProps) => {
  return (
    <div className="flex justify-between gap-6 py-1">
      <div>
        <p className="sb-text-24 font-semibold mb-3">Recent services</p>
        {tableNav && (
          <div className="flex flex-col gap-3 text-sm font-normal mb-6 md:gap-4 md:flex-row md:items-center">
            <span>Show only:</span>
            <ComboBox
              options={tableNav}
              handleSelect={handleFilter}
              fieldName="filter"
              defaultValue={tableNav[0]}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between items-end gap-2 mb-6">
        <SearchComp
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          onSubmit={(e) => onSearchSubmit && onSearchSubmit(e)}
        />
        <div className="flex items-center gap-2">
          {selectOn && (
            <p className="text-foreground-5 text-sm">Selected ({selectedRows.length})</p>
          )}
          <Button
            color="transparent"
            size="fit"
            className="text-primary"
            onClick={() => {
              setSelectOn(selectOn ? false : true);
              selectOn && setSelectedRows && setSelectedRows([]);
            }}
          >
            {selectOn ? "Cancel" : "Select"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;

interface IProps {
  // tableNav: { name: string; value: string; text: string }[];
  tableNav?: string[];
  selectOn: boolean;
  setSelectOn: Dispatch<SetStateAction<boolean>>;
  selectedRows: string[];
  setSelectedRows?: Dispatch<SetStateAction<string[]>>;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (e: MouseEvent<HTMLButtonElement>) => void;
  handleFilter?: (value?: string) => void;
}
