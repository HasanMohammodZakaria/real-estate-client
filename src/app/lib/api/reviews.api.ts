const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface CreateReviewPayload {
  propertyId: string;
  rating: number;
  comment: string;
}

export async function createReview(
  payload: CreateReviewPayload,
  token: string
): Promise<{ message: string; insertedId: string }> {
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
  return data;
}

export async function deleteReview(
  id: string,
  token: string
): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/api/reviews/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete review');
  return data;
}