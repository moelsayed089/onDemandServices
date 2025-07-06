import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../ui/pagination";

const Pagination = ({
  ...props
}: React.ComponentProps<typeof ShadPagination>) => {
  return <ShadPagination {...props} />;
};

Pagination.Content = PaginationContent;
Pagination.Item = PaginationItem;
Pagination.Link = PaginationLink;
Pagination.Previous = PaginationPrevious;
Pagination.Next = PaginationNext;
Pagination.Ellipsis = PaginationEllipsis;

export { Pagination };
