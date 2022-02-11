import { del, get, post, put } from "../helpers/api_helper"

const list = (query = '') => get('hair_colors'+query)

const find = (id) => get('hair_colors/'+id)

const create = (params) => post('hair_colors', params)

const update = ({_id, params}) => put(`hair_colors/${_id}`, params)

const _delete = (id) => del(`hair_colors/${id}`)

export const hair_coolorService = {
    list,
    find,
    create,
    update,
	delete: _delete,
};