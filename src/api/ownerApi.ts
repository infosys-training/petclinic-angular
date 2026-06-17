import httpClient from './httpClient';
import type { Owner } from '../types';

export const getOwners = () => httpClient.get<Owner[]>('/owners');

export const getOwnerById = (id: number) =>
  httpClient.get<Owner>(`/owners/${id}`);

export const addOwner = (owner: Partial<Owner>) =>
  httpClient.post<Owner>('/owners', owner);

export const updateOwner = (id: number, owner: Partial<Owner>) =>
  httpClient.put<Owner>(`/owners/${id}`, owner);

export const deleteOwner = (id: number) =>
  httpClient.delete<void>(`/owners/${id}`);

export const searchOwners = (lastName: string) =>
  httpClient.get<Owner[]>('/owners', { params: { lastName } });
