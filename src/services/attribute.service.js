import { del, get, post, putImage, put } from "../helpers/api_helper"

const list = (query = '') => get('attributes'+query)

const find = (id) => get('attributes/'+id)

const create = (params) => post('attributes', params)

const updateImage = ({_id, params}) => putImage(`attributes/putImage/${_id}`, params)

const update = ({_id, params}) => put(`attributes/${_id}`, params)

const _delete = (id) => del(`attributes/${id}`)

export const attributeService = {
    list,
    find,
    create,
    updateImage,
    update,
	delete: _delete,
};