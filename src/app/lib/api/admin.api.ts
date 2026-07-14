import type { Property } from '@/app/lib/actions/properties.actions';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

export async function getAllUsers(token: string): Promise<AdminUser[]> {
  const res = await fetch(`${BASE_URL}/api/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch users');
  return data;
}

export async function makeAdmin(
  id: string,
  token: string
): Promise<{ message?: string }> {
  const res = await fetch(`${BASE_URL}/api/admin/users/${id}/make-admin`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update role');
  return data;
}

export async function deleteUser(
  id: string,
  token: string
): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/api/admin/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete user');
  return data;
}

export async function getAllPropertiesAdmin(token: string): Promise<Property[]> {
  const res = await fetch(`${BASE_URL}/api/admin/properties`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch properties');
  return data;
}

export async function deleteAnyProperty(
  id: string,
  token: string
): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/api/admin/properties/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete property');
  return data;
}