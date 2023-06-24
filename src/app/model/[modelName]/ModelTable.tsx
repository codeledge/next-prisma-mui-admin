"use client";
import { Chip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DMMF } from "@prisma/client/runtime";
import { useState } from "react";

export default function ModelTable({
  modelName,
  rows,
  fields,
}: {
  modelName: string;
  rows: any[];
  fields: DMMF.Field[];
}) {
  const foreignKeys = fields.filter(({ kind }) => kind === "object");

  const [showTable, setShowTable] = useState<any>(null);

  const columns: GridColDef[] = fields.map(({ name, kind, type }) => {
    return {
      field: name,
      headerName: name,
      flex: 1,
      with: "auto",
      renderCell: (params) => {
        const foreignKey = foreignKeys.find(
          ({ name }) => name === params.field
        );
        if (foreignKey) {
          console.log(params, foreignKey);
          return (
            <Chip
              clickable
              variant="outlined"
              label={params.formattedValue}
              onClick={() => {
                const toField = foreignKey.relationToFields?.[0];
                const fromField = foreignKey.relationFromFields?.[0];
                setShowTable({
                  modelName: foreignKey.type,
                  filter: {
                    [toField]: params.row[fromField!],
                  },
                });
              }}
            />
          );
        }
      },
    };
  });

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Model <b>{modelName}</b>
      </Typography>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
