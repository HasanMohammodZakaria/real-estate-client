const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface Review {
  _id: string;
  propertyId: string;
  reviewerEmail: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface CreateReviewPayload {
  propertyId: string;
  rating: number;
  comment: string;
}

export async function createReview(payload: CreateReviewPayload, token: string) {
  const res = await fetch(`${BASE_URL}/api/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to submit review');
  return data as { message: string; insertedId: string };
}

export async function deleteReview(id: string, token: string) {
  const res = await fetch(`${BASE_URL}/api/reviews/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete review');
  return data as { message: string };
}