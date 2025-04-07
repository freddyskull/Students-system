import React, { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
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
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';


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
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = data.filter(row => {
    const matchesGlobalFilter = Object.values(row).some(value =>
      String(value).toLowerCase().includes(globalFilter.toLowerCase())
    );

    const createdAt = new Date(row.createdAt); // Ahora TypeScript reconoce 'createdAt'
    const matchesDateFilter =
      (!startDate || createdAt >= new Date(startDate)) &&
      (!endDate || createdAt <= new Date(endDate));

    return matchesGlobalFilter && matchesDateFilter;
  });

  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="relative w-full h-[62vh] overflow-hidden">
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
                value={startDate || ''}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-2 py-1 border rounded text-sm"
              />
              <Input
                type="date"
                value={endDate || ''}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-2 py-1 border rounded text-sm"
              />
              <Button variant="outline" onClick={() => { setStartDate(null); setEndDate(null); }}>Limpiar Fechas</Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-auto">
        <div className="w-full h-[40vh] overflow-auto">
          {table.getRowModel().rows.length > 0 ? (
            <div>
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
              <div className='right-0 bottom-2 left-0 absolute h-10'>
                <div className='flex justify-between items-center px-6 h-full'>
                  <div className='text-sm uppercase'>Total de items <b>{data.length}</b></div>
                  <div>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href={page > 1 ? "#" : undefined}
                            onClick={() => {
                              if (page > 1) {
                                setPage((prev) => Math.max(prev - 1, 1));
                              }
                            }}
                            className={page === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-primary hover:rounded-full hover:text-white'}
                          />
                        </PaginationItem>
                        {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => i + 1)
                          .filter((pageNum) => {
                            const totalPages = Math.ceil(filteredData.length / itemsPerPage);
                            return (
                              pageNum === 1 ||
                            pageNum === totalPages ||
                            (pageNum >= page - 1 && pageNum <= page + 1)
                            );
                          })
                          .map((pageNum, index, visiblePages) => (
                            <React.Fragment key={pageNum}>
                              {index > 0 && pageNum > visiblePages[index - 1] + 1 && (
                                <PaginationItem>
                                  <PaginationEllipsis />
                                </PaginationItem>
                              )}
                              <PaginationItem>
                                <PaginationLink
                                  href="#"
                                  onClick={() => setPage(pageNum)}
                                  className={`pagination-link ${page === pageNum ? 'active bg-primary text-white hover:text-primary rounded-full font-bold' : ''}`}
                                >
                                  {pageNum}
                                </PaginationLink>
                              </PaginationItem>
                            </React.Fragment>
                          ))}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => {
                              if (page < Math.ceil(filteredData.length / itemsPerPage)) {
                                setPage((prev) => Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage)));
                              }
                            }}
                            className='hover:bg-primary hover:rounded-full hover:text-white'
                            href={page < Math.ceil(filteredData.length / itemsPerPage) ? "#" : undefined}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
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
