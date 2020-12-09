import request from '@/utils/request'

export function empresaList() {
  return request({
    url: '/api/v1/empresa/',
    method: 'get',
  })
}

export function detalheEmpresaid(id) {
  return request({
    url: `/api/v1/empresa/${id}/`,
    method: 'get',
  })
}

export function empresaEditar(data, id) {
  return request({
    url: `/api/v1/empresa/${id}/`,
    method: 'put',
    data
  })
}

export function empresaNovo(data) {
  return request({
    url: '/api/v1/empresa/',
    method: 'post',
    data
  })
}


export function empresaExcluir(data) {
  return request({
    url: `/api/v1/empresa/${data}/`,
    method: 'delete',
  })
}