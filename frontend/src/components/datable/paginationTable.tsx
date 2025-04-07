import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Pagination, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { useReactTable } from '@tanstack/react-table';

export interface PaginationTableProps {
  table: any;
}

export const PaginationTable = ({ 
  table,
}: PaginationTableProps) => {
  return (
    <div className="right-0 bottom-5 left-0 absolute h-10">
      <div className="flex justify-between items-center gap-2 mx-auto px-4 py-2 container">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <div>Página</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} de{' '}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
          <Select
            onValueChange={(value: string) => table.setPageSize(Number(value))}
            defaultValue={String(table.getState().pagination.pageSize)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar tamaño" />
            </SelectTrigger>
            <SelectContent className="list-none">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={String(pageSize)}>
                  Mostrar {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          {table.getPageCount() > 1 && (
            <Pagination>
              {table.getCanPreviousPage() && (
                <PaginationPrevious
                  onClick={() => table.previousPage()}
                  aria-disabled="false"
                />
              )}
              {table.getState().pagination.pageIndex > 2 && (
                <PaginationItem>
                  <PaginationLink onClick={() => table.setPageIndex(0)}>
                    1
                  </PaginationLink>
                </PaginationItem>
              )}
              {table.getState().pagination.pageIndex > 3 && (
                <span className="px-2">
                  <PaginationEllipsis />
                </span>
              )}
              {Array.from({ length: table.getPageCount() }, (_, index) => {
                const currentPage = table.getState().pagination.pageIndex;
                if (index >= currentPage - 2 && index <= currentPage + 2) {
                  return (
                    <PaginationItem
                      key={index}
                      className={
                        index === currentPage
                          ? 'active bg-primary rounded-full text-white cursor-no-drop'
                          : 'cursor-pointer'
                      }
                    >
                      <PaginationLink onClick={() => table.setPageIndex(index)}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                return null;
              })}
              {table.getState().pagination.pageIndex <
                table.getPageCount() - 4 && <span className="px-2">...</span>}
              {table.getState().pagination.pageIndex <
                table.getPageCount() - 3 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() =>
                      table.setPageIndex(table.getPageCount() - 1)
                    }
                  >
                    {table.getPageCount()}
                  </PaginationLink>
                </PaginationItem>
              )}
              {table.getCanNextPage() && (
                <PaginationNext
                  onClick={() => table.nextPage()}
                  aria-disabled="false"
                />
              )}
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
};
