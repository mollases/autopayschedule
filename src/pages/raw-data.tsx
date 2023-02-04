import React from "react";
import Importer from "../components/Importer";

import { ChakraProvider } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../components/DataTable";
import { BillRow } from "../BillRow";
import { useGlobalContext } from '../context/globalContext';

const columnHelper = createColumnHelper<BillRow>();

const columns = [
  columnHelper.accessor("amount", {
    cell: (info) => info.getValue(),
    header: "amount",
  }),
  columnHelper.accessor("company", {
    cell: (info) => info.getValue(),
    header: "company",
  }),
  columnHelper.accessor("cancellable", {
    cell: (info) => info.getValue(),
    header: "cancellable",
  }),
  columnHelper.accessor("frequency", {
    cell: (info) => info.getValue(),
    header: "frequency",
  }),
  columnHelper.accessor("source", {
    cell: (info) => info.getValue(),
    header: "source",
  }),
  columnHelper.accessor("when", {
    cell: (info) => info.getValue(),
    header: "when",
  }),
];

const RawData = () => {
	const {
		state: { source },
  } = useGlobalContext()

	let dataView
	if(source.length === 0) {
		dataView =  (<Importer />)
	} else {
		dataView = (
      <ChakraProvider>
        <DataTable columns={columns} data={source} />
      </ChakraProvider>
		)
	}

  return (
    <div>
      <header className="App-header">Raw data</header>
      {dataView}
    </div>
  );
};

export default RawData;
