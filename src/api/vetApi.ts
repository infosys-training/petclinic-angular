import httpClient from './httpClient';
import type { Vet } from '../types';

export const getVets = () => httpClient.get<Vet[]>('/vets');

export const getVetById = (id: number) => httpClient.get<Vet>(`/vets/${id}`);

export const addVet = (vet: Partial<Vet>) =>
  httpClient.post<Vet>('/vets', vet);

export const updateVet = (id: number, vet: Partial<Vet>) =>
  httpClient.put<Vet>(`/vets/${id}`, vet);

export const deleteVet = (id: number) =>
  httpClient.delete<void>(`/vets/${id}`);
