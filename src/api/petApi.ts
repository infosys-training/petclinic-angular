import httpClient from './httpClient';
import { Pet } from '../types';

const BASE = 'pets';

export const getPetById = (id: number) =>
  httpClient.get<Pet>(`${BASE}/${id}`).then((r) => r.data);

export const addPet = (ownerId: number, pet: Partial<Pet>) =>
  httpClient.post<Pet>(`owners/${ownerId}/pets`, pet).then((r) => r.data);

export const updatePet = (id: number, pet: Partial<Pet>) =>
  httpClient.put<Pet>(`${BASE}/${id}`, pet).then((r) => r.data);

export const deletePet = (id: number) =>
  httpClient.delete(`${BASE}/${id}`).then((r) => r.data);
