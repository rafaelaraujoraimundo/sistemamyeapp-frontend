import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login/',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/auth/user/',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/auth/logout/',
    method: 'post'
  })
}

export function RefreshToken(data) {
  return request({
    url: '/auth/refresh-token/',
    method: 'post',
    data
  })
}


export function usuarioList() {
  return request({
    url: '/api/v1/users/',
    method: 'get',
  })
}

export function usuarioNovo(data) {
  return request({
    url: '/api/v1/users/',
    method: 'post',
    data
  })
}

export function usuarioExcluir(id) {
  return request({
    url: `/api/v1/users/${id}/`,
    method: 'delete',
  })
}

export function detalheusuarioid(data) {
  return request({
    url: `/api/v1/users/${data}/`,
    method: 'get',
    data
  })
}

export function alterarSenhaUsuario(data) {
  return request({
    url: '/auth/password/change/',
    method: 'post',
    data
  })
}
