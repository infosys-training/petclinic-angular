import httpClient from './httpClient';
import { Visit } from '../types';

const BASE = 'visits';

export const getVisits = () =>
  httpClient.get<Visit[]>(BASE).then((r) => r.data);

export const getVisitById = (id: number) =>
  httpClient.get<Visit>(`${BASE}/${id}`).then((r) => r.data);

export const addVisit = (
  ownerId: number,
  petId: number,
  visit: Partial<Visit>
) =>
  httpClient
    .post<Visit>(`owners/${ownerId}/pets/${petId}/visits`, visit)
    .then((r) => r.data);

export const updateVisit = (id: number, visit: Partial<Visit>) =>
  httpClient.put<Visit>(`${BASE}/${id}`, visit).then((r) => r.data);

export const deleteVisit = (id: number) =>
  httpClient.delete(`${BASE}/${id}`).then((r) => r.data);

export const getVisitsByPetId = (petId: number) =>
  httpClient.get<Visit[]>(BASE, { params: { petId } }).then((r) => r.data);
