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