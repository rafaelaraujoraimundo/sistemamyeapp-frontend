import request from '@/utils/request'

export function notas() {
  return request({
    url: '/api/v1/nota/',
    method: 'get',
  })
}

export function detalheindicador() {
  return request({
    url: '/api/v1/detalheindicador/',
    method: 'get',
  })
}

export function detalheindicadorid(id) {
  return request({
    url: `/api/v1/detalheindicador/${id}/`,
    method: 'get',
  })
}

export function EditarIndicador(data) {
  return request({
    url: `/api/v1/detalheindicador/${data.id}/`,
    method: 'put',
    data
  })
}

export function NovoIndicador(data) {
  return request({
    url: '/api/v1/detalheindicador/',
    method: 'post',
    data
  })
}

export function IndicadorPrincipal() {
  return request({
    url: '/api/v1/indicadorPrincipial/',
    method: 'get',
  })
}

export function ExcluirIndicador(data) {
  return request({
    url: `/api/v1/detalheindicador/${data}/`,
    method: 'delete',
  })
}

export function Dashboard(data) {
  return request({
    url: `/api/dashboard/`,
    method: 'post',
    data
  })
}