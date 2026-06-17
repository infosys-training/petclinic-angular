import httpClient from './httpClient';
import type { Specialty } from '../types';

export const getSpecialties = () =>
  httpClient.get<Specialty[]>('/specialties');

export const getSpecialtyById = (id: number) =>
  httpClient.get<Specialty>(`/specialties/${id}`);

export const addSpecialty = (s: Partial<Specialty>) =>
  httpClient.post<Specialty>('/specialties', s);

export const updateSpecialty = (id: number, s: Partial<Specialty>) =>
  httpClient.put<Specialty>(`/specialties/${id}`, s);

export const deleteSpecialty = (id: number) =>
  httpClient.delete<void>(`/specialties/${id}`);
