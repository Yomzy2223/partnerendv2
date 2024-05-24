import TableDetailsSkt from "@/components/tables/skeleton/detailsSkt";
import React from "react";

const loading = () => {
  return (
    <div className="py-6 flex flex-col gap-8 bg-background">
      <TableDetailsSkt />
    </div>
  );
};

export default loading;
