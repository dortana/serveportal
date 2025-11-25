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

export interface Expert {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl: string;
  service: string;
  location: string;
  price_per_hour: number;
  rating: number;
  reviewsCount: number;
}

export interface ExpertiseDetails {
  profession: string;
  profession_details: string;
  years_experience: string;
  availability: string;
  price_per_hour: {
    currency: 'USD' | 'EUR' | 'GBP' | 'HUF';
    amount: number;
  };
  rates?: Rate[];
}

export interface Rate {
  star: number;
  comment: string;
}
