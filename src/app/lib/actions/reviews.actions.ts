export interface Review {
  _id: string;
  propertyId: string;
  reviewerEmail: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export async function getReviewsByProperty(propertyId: string): Promise<Review[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/property/${propertyId}`,
    { cache: 'no-store' }
  );

  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}