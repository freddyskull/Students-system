import { useState, useMemo } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  PaginationState,
} from '@tanstack/react-table';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/app/components/emptyState';
import { Students } from '@/app/home';
import { PaginationTable } from './paginationTable';


interface DatatableProps<T extends Students> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  data: T[];
  tableTitle?: string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  additionalActions?: { label: string; onClick: (row: Students) => void }[];
  onAddTable?: { label: string; onClick: () => void };
}

export const Datatable = <T extends Students>({
  columns,
  data,
  tableTitle,
  onEdit,
  onDelete,
  additionalActions,
  onAddTable,
}: DatatableProps<T>) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: '',
    endDate: '',
  });

  const filteredData = useMemo(() => {
    if (!dateRange.startDate && !dateRange.endDate) return data;
    return data.filter((row) => {
      const createdAt = new Date(row.createdAt); 
      const startDate = dateRange.startDate ? new Date(dateRange.startDate) : new Date(-8640000000000000);
      const endDate = dateRange.endDate ? new Date(dateRange.endDate) : new Date(8640000000000000);
      return createdAt >= startDate && createdAt <= endDate;
    });
  }, [data, dateRange]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
      pagination
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <Card className="relative w-full h-[63vh] overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-bold text-xl uppercase">
            {tableTitle}
          </CardTitle>
          <Button onClick={() => { onAddTable?.onClick(); }}>Nuevo {onAddTable?.label}</Button>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="gap-8 grid grid-cols-2 w-full">
            <div className='flex gap-2 w-full'>
              <Input
                type="text"
                placeholder="Buscar dentro de la tabla..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="px-2 py-1 border rounded text-sm"
              />
              <Button variant="outline" onClick={() => setGlobalFilter('')}>Limpiar</Button>
            </div>
            <div className='flex gap-2 w-full'>
              <Input
                type="date"
                placeholder="Fecha inicial"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                className="px-2 py-1 border rounded text-sm"
              />
              <Input
                type="date"
                placeholder="Fecha final"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                className="px-2 py-1 border rounded text-sm"
              />
              <Button variant="outline" onClick={() => setDateRange({ startDate: '', endDate: '' })}>
                Limpiar
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-auto">
        <div className="w-full h-[40vh] overflow-auto">
          {table.getRowModel().rows.length > 0 ? (
            <div className=''>
              <Table>
                <TableHeader>
                  <TableRow>
                    {table.getHeaderGroups()[0].headers.map(header => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                    <TableHead className='text-center'>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.map(row => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                      <TableCell className='flex justify-center items-center'>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <div className='text-slate-500 hover:text-primary cursor-pointer'>
                              <EllipsisVertical />
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className='font-bold uppercase'>
                            {onEdit && (
                              <DropdownMenuItem onClick={() => onEdit(row.original)}>
                              Editar
                              </DropdownMenuItem>
                            )}
                            {onDelete && (
                              <DropdownMenuItem onClick={() => onDelete(row.original)}>
                              Eliminar
                              </DropdownMenuItem>
                            )}
                            {additionalActions &&
                            additionalActions.map((action, index) => (
                              <DropdownMenuItem
                                key={index}
                                onClick={() => action.onClick(row.original)}
                              >
                                {action.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
                <PaginationTable table={table} />
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
