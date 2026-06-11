import httpClient from './httpClient';
import { Owner } from '../types';

const BASE = 'owners';

export const getOwners = () =>
  httpClient.get<Owner[]>(BASE).then((r) => r.data);

export const getOwnerById = (id: number) =>
  httpClient.get<Owner>(`${BASE}/${id}`).then((r) => r.data);

export const addOwner = (owner: Partial<Owner>) =>
  httpClient.post<Owner>(BASE, owner).then((r) => r.data);

export const updateOwner = (id: number, owner: Partial<Owner>) =>
  httpClient.put<Owner>(`${BASE}/${id}`, owner).then((r) => r.data);

export const deleteOwner = (id: number) =>
  httpClient.delete(`${BASE}/${id}`).then((r) => r.data);

export const searchOwners = (lastName: string) =>
  httpClient
    .get<Owner[]>(BASE, { params: lastName ? { lastName } : undefined })
    .then((r) => r.data);
