import { del, get, post, putImage, put } from "../helpers/api_helper"

const list = (query = '') => get('avatars'+query)

const find = (id) => get('avatars/'+id)

const create = (params) => post('avatars', params)

const updateImage = ({_id, params}) => putImage(`avatars/putImage/${_id}`, params)

const update = ({_id, params}) => put(`avatars/${_id}`, params)

const _delete = (id) => del(`avatars/${id}`)

export const avatarService = {
    list,
    find,
    create,
    updateImage,
    update,
	delete: _delete,
};