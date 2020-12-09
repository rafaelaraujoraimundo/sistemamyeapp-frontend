import request from '@/utils/request'

export function filiaisList() {
  return request({
    url: '/api/v1/filial/',
    method: 'get',
  })
}

export function detalheFilialid(id) {
  return request({
    url: `/api/v1/filial/${id}/`,
    method: 'get',
  })
}

export function filialEditar(data) {
  return request({
    url: `/api/v1/filial/${data.id}/`,
    method: 'put',
    data
  })
}

export function filialNovo(data) {
  return request({
    url: '/api/v1/filial/',
    method: 'post',
    data
  })
}


export function filialExcluir(data) {
  return request({
    url: `/api/v1/filial/${data}/`,
    method: 'delete',
  })
}