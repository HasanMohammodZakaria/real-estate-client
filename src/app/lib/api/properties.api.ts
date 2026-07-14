import type { Property } from '@/app/lib/actions/properties.actions';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface CreatePropertyPayload {
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  price: number;
  imageUrl?: string;
}

export async function createProperty(
  payload: CreatePropertyPayload,
  token: string
): Promise<{ message: string; itemId: string }> {
  const res = await fetch(`${BASE_URL}/api/properties`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create property');
  return data;
}

export async function getMyProperties(
  token: string
): Promise<{ items: Property[] }> {
  const res = await fetch(`${BASE_URL}/api/properties/my-properties`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch your properties');
  return data;
}

export async function deleteProperty(
  id: string,
  token: string
): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/api/properties/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete property');
  return data;
}