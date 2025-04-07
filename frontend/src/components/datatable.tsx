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
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from './ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { EmptyState } from '@/app/components/emptyState';
import { Students } from '@/app/home';
import { Pagination, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';


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
      const createdAt = new Date(row.createdAt); // Asumiendo que `row.createdAt` es un campo de tipo fecha
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
              <div className='right-0 bottom-5 left-0 absolute h-10'>
                <div className="flex justify-between items-center gap-2 mx-auto px-4 py-2 container">
                  <div className='flex items-center gap-2'>
                    <span className="flex items-center gap-1">
                      <div>Página</div>
                      <strong>
                        {table.getState().pagination.pageIndex + 1} de{' '}
                        {table.getPageCount().toLocaleString()}
                      </strong>
                    </span>
                    <Select
                      onValueChange={(value) => table.setPageSize(Number(value))}
                      defaultValue={String(table.getState().pagination.pageSize)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Seleccionar tamaño" />
                      </SelectTrigger>
                      <SelectContent className="list-none"> {/* Eliminar bullets */}
                        {[ 10, 20, 30, 40, 50].map(pageSize => (
                          <SelectItem key={pageSize} value={String(pageSize)}>
                            Mostrar {pageSize}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    {
                      table.getPageCount() > 1 && (
                        <Pagination>
                          {table.getCanPreviousPage() && (
                            <PaginationPrevious onClick={() => table.previousPage()} aria-disabled="false" />
                          )}
                          {table.getState().pagination.pageIndex > 2 && (
                            <PaginationItem>
                              <PaginationLink onClick={() => table.setPageIndex(0)}>1</PaginationLink>
                            </PaginationItem>
                          )}
                          {table.getState().pagination.pageIndex > 3 && <span className="px-2">
                            <PaginationEllipsis />
                            </span>}
                          {Array.from({ length: table.getPageCount() }, (_, index) => {
                            const currentPage = table.getState().pagination.pageIndex;
                            if (index >= currentPage - 2 && index <= currentPage + 2) {
                              return (
                                <PaginationItem
                                  key={index}
                                  className={index === currentPage ? 'active bg-primary rounded-full text-white ' : ''}
                                >
                                  <PaginationLink onClick={() => table.setPageIndex(index)}>
                                    {index + 1}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            }
                            return null;
                          })}
                          {table.getState().pagination.pageIndex < table.getPageCount() - 4 && <span className="px-2">...</span>}
                          {table.getState().pagination.pageIndex < table.getPageCount() - 3 && (
                            <PaginationItem>
                              <PaginationLink onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                                {table.getPageCount()}
                              </PaginationLink>
                            </PaginationItem>
                          )}
                          {table.getCanNextPage() && (
                            <PaginationNext onClick={() => table.nextPage()} aria-disabled="false" />
                          )}
                        </Pagination>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
