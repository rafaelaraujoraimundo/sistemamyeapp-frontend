import request from '@/utils/request'

export function indicadorPrincipalList() {
  return request({
    url: '/api/v1/indicadorPrincipial/',
    method: 'get',
  })
}

export function detalheindicadorPrincipalid(id) {
  return request({
    url: `/api/v1/indicadorPrincipial/${id}/`,
    method: 'get',
  })
}

export function EditarIndicadorPrincipal(data) {
  return request({
    url: `/api/v1/indicadorPrincipial/${data.id}/`,
    method: 'put',
    data
  })
}

export function NovoIndicadorPrincipal(data) {
  return request({
    url: '/api/v1/indicadorPrincipial/',
    method: 'post',
    data
  })
}


export function ExcluirIndicadorPrincipal(data) {
  return request({
    url: `/api/v1/indicadorPrincipial/${data}/`,
    method: 'delete',
  })
}