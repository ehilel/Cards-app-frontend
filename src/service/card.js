import {http} from './http'

export function getCards()
{
  return http.get('/')
}

export function getCardById(id)
{
    return http.get(`/${id}`)
}

export function createCard(card)
{
    return http.post('/', card)
}

export function updateCard(id, card)
{
    return http.patch(`/${id}`, card)
}

export function deleteCard(id)
{
    return http.delete(`/${id}`)
}