"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { HiOutlineShieldCheck, HiOutlineTrash } from "react-icons/hi";
import { useAuth } from "@/app/lib/hooks/useAuth";
import { getAllUsers, makeAdmin, deleteUser, type AdminUser } from "@/app/lib/api/admin.api";

export function ManageUsersClient() {
  const { token, isPending: authPending } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await getAllUsers(token);
      setUsers(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!authPending && token) {
      fetchUsers();
    }
  }, [authPending, token, fetchUsers]);

  const handleMakeAdmin = async (id: string) => {
    if (!token) return;
    setActionId(id);
    try {
      await makeAdmin(id, token);
      toast.success("User promoted to admin");
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: "admin" } : u))
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update role");
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    setActionId(id);
    try {
      await deleteUser(id, token);
      toast.success("User deleted");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete user");
    } finally {
      setActionId(null);
    }
  };

  if (authPending || loading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-16 rounded-2xl animate-pulse"
            style={{ backgroundColor: "var(--card)" }}
          />
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        No users found.
      </p>
    );
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th className="text-left font-medium px-4 py-3" style={{ color: "var(--muted-foreground)" }}>
                User
              </th>
              <th className="text-left font-medium px-4 py-3" style={{ color: "var(--muted-foreground)" }}>
                Email
              </th>
              <th className="text-left font-medium px-4 py-3" style={{ color: "var(--muted-foreground)" }}>
                Role
              </th>
              <th className="text-right font-medium px-4 py-3" style={{ color: "var(--muted-foreground)" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium"
                        style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
                      >
                        {user.name?.charAt(0).toUpperCase() ?? "U"}
                      </div>
                    )}
                    <span style={{ color: "var(--card-foreground)" }}>{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>
                  {user.email}
                </td>
                <td className="px-4 py-3">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full capitalize"
                    style={{
                      backgroundColor: user.role === "admin" ? "var(--accent)" : "var(--secondary)",
                      color: user.role === "admin" ? "var(--accent-foreground)" : "var(--secondary-foreground)",
                    }}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        disabled={actionId === user._id}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-(--radius) transition-colors hover:bg-secondary"
                        style={{ border: "1px solid var(--border)", color: "var(--card-foreground)" }}
                      >
                        <HiOutlineShieldCheck size={14} />
                        Make Admin
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(user._id)}
                      disabled={actionId === user._id}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-(--radius) transition-colors hover:bg-secondary"
                      style={{ border: "1px solid var(--border)", color: "var(--destructive)" }}
                    >
                      <HiOutlineTrash size={14} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}