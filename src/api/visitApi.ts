import httpClient from './httpClient';
import type { Visit } from '../types';

export const getVisits = () => httpClient.get<Visit[]>('/visits');

export const getVisitById = (id: number) =>
  httpClient.get<Visit>(`/visits/${id}`);

export const addVisit = (ownerId: number, petId: number, visit: Partial<Visit>) =>
  httpClient.post<Visit>(`/owners/${ownerId}/pets/${petId}/visits`, visit);

export const updateVisit = (id: number, visit: Partial<Visit>) =>
  httpClient.put<Visit>(`/visits/${id}`, visit);

export const deleteVisit = (id: number) =>
  httpClient.delete<void>(`/visits/${id}`);

export const getVisitsByPetId = (petId: number) =>
  httpClient.get<Visit[]>('/visits', { params: { petId } });
