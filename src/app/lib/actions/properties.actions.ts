export type Priority = "low" | "medium" | "high";

export interface Property {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  price: number;
  location: string;
  priority: Priority;
  beds: number;
  baths: number;
  area: string;
  imageUrl?: string;
  createdBy: string;
  createdAt: string;
}

export interface PropertyStats {
  totalProperties: number;
  totalCategories: number;
  totalLocations: number;
}

interface GetPropertiesParams {
  search?: string;
  category?: string;
  location?: string; // 🆕 filter field
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  page?: string;
  limit?: string;
}

interface GetPropertiesResponse {
  items: Property[];
  total: number;
  page: number;
  totalPages: number;
}

export async function getMyPropertiesServer(token: string): Promise<{ items: Property[] }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/my-properties`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    }
  );

  if (!res.ok) throw new Error('Failed to fetch your properties');
  return res.json();
}

export async function getProperties(
  params: GetPropertiesParams = {}
): Promise<GetPropertiesResponse> {
  const query = new URLSearchParams();

  if (params.search) query.set('search', params.search);
  if (params.category) query.set('category', params.category);
  if (params.location) query.set('location', params.location); // 🆕
  if (params.minPrice) query.set('minPrice', params.minPrice);
  if (params.maxPrice) query.set('maxPrice', params.maxPrice);
  if (params.sortBy) query.set('sortBy', params.sortBy);
  if (params.page) query.set('page', params.page);
  if (params.limit) query.set('limit', params.limit);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties?${query.toString()}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch properties');
  }

  return res.json();
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/${id}`,
    { cache: 'no-store' }
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch property');

  return res.json();
}

export async function getPropertyStats(): Promise<PropertyStats> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/stats`, {
    cache: 'no-store',
  });
  if (!res.ok) return { totalProperties: 0, totalCategories: 0, totalLocations: 0 };
  return res.json();
}