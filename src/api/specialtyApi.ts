import httpClient from './httpClient';
import { Specialty } from '../types';

const BASE = 'specialties';

export const getSpecialties = () =>
  httpClient.get<Specialty[]>(BASE).then((r) => r.data);

export const getSpecialtyById = (id: number) =>
  httpClient.get<Specialty>(`${BASE}/${id}`).then((r) => r.data);

export const addSpecialty = (s: Partial<Specialty>) =>
  httpClient.post<Specialty>(BASE, s).then((r) => r.data);

export const updateSpecialty = (id: number, s: Partial<Specialty>) =>
  httpClient.put<Specialty>(`${BASE}/${id}`, s).then((r) => r.data);

export const deleteSpecialty = (id: number) =>
  httpClient.delete(`${BASE}/${id}`).then((r) => r.data);
