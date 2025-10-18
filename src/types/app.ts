export interface PaginationType {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface DataFilterType {
  page?: string;
  limit?: string;
  sort?: string;
  order?: string;
  search?: string;
}

export interface Service {
  id: number;
  label: string;
  value: string;
  icon: React.ElementType;
  isPopular: boolean;
}
