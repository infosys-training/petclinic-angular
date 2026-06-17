import httpClient from './httpClient';
import type { Pet } from '../types';

export const getPetById = (id: number) => httpClient.get<Pet>(`/pets/${id}`);

export const addPet = (ownerId: number, pet: Partial<Pet>) =>
  httpClient.post<Pet>(`/owners/${ownerId}/pets`, pet);

export const updatePet = (id: number, pet: Partial<Pet>) =>
  httpClient.put<Pet>(`/pets/${id}`, pet);

export const deletePet = (id: number) =>
  httpClient.delete<void>(`/pets/${id}`);
