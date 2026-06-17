import httpClient from './httpClient';
import type { PetType } from '../types';

export const getPetTypes = () => httpClient.get<PetType[]>('/pettypes');

export const getPetTypeById = (id: number) =>
  httpClient.get<PetType>(`/pettypes/${id}`);

export const addPetType = (pt: Partial<PetType>) =>
  httpClient.post<PetType>('/pettypes', pt);

export const updatePetType = (id: number, pt: Partial<PetType>) =>
  httpClient.put<PetType>(`/pettypes/${id}`, pt);

export const deletePetType = (id: number) =>
  httpClient.delete<void>(`/pettypes/${id}`);
