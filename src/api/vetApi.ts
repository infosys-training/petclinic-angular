import httpClient from './httpClient';
import { Vet } from '../types';

const BASE = 'vets';

export const getVets = () =>
  httpClient.get<Vet[]>(BASE).then((r) => r.data);

export const getVetById = (id: number) =>
  httpClient.get<Vet>(`${BASE}/${id}`).then((r) => r.data);

export const addVet = (vet: Partial<Vet>) =>
  httpClient.post<Vet>(BASE, vet).then((r) => r.data);

export const updateVet = (id: number, vet: Partial<Vet>) =>
  httpClient.put<Vet>(`${BASE}/${id}`, vet).then((r) => r.data);

export const deleteVet = (id: number) =>
  httpClient.delete(`${BASE}/${id}`).then((r) => r.data);
