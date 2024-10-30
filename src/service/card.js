import {http} from './http'

export const getCards = () =>{
    return http.get('/')
}

export const getCardById = (id) =>{
    return http.get(`/${id}`)
}

export const createCard = (card) =>{
    return http.post('/', card)
}

export const updateCard = (id, card) =>{
    return http.patch(`/${id}`, card)
}

export const deleteCard = (id) =>{
    return http.delete(`/${id}`)
}