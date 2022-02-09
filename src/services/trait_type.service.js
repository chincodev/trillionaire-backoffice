import { del, get, post, put } from "../helpers/api_helper"

const list = (query = '') => get('trait_types'+query)

const find = (id) => get('trait_types/'+id)

const create = (params) => post('trait_types', params)

const update = ({_id, params}) => put(`trait_types/${_id}`, params)

const _delete = (id) => del(`trait_types/${id}`)

export const trait_typeService = {
    list,
    find,
    create,
    update,
	delete: _delete,
};