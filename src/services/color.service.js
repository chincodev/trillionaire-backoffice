import { del, get, post, put } from "../helpers/api_helper"

const list = (query = '') => get('colors'+query)

const find = (id) => get('colors/'+id)

const create = (params) => post('colors', params)

const update = ({_id, params}) => put(`colors/${_id}`, params)

const _delete = (id) => del(`colors/${id}`)

export const colorService = {
    list,
    find,
    create,
    update,
	delete: _delete,
};