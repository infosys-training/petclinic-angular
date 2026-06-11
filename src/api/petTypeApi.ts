import httpClient from './httpClient';
import { PetType } from '../types';

const BASE = 'pettypes';

export const getPetTypes = () =>
  httpClient.get<PetType[]>(BASE).then((r) => r.data);

export const getPetTypeById = (id: number) =>
  httpClient.get<PetType>(`${BASE}/${id}`).then((r) => r.data);

export const addPetType = (pt: Partial<PetType>) =>
  httpClient.post<PetType>(BASE, pt).then((r) => r.data);

export const updatePetType = (id: number, pt: Partial<PetType>) =>
  httpClient.put<PetType>(`${BASE}/${id}`, pt).then((r) => r.data);

export const deletePetType = (id: number) =>
  httpClient.delete(`${BASE}/${id}`).then((r) => r.data);
