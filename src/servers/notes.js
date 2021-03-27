import axios from 'axios'
const baseUrl = '/api/notes'

const getall = () => {
  const request = axios.get(baseUrl)
  return request.then(res => res.data)
}

const create = (newObj) => {
  const request = axios.post(baseUrl, newObj)
  return request.then(res => res.data)
}

const update = (id, newObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newObj)
  return request.then(res => res.data)
}

export default { getall, create, update }
