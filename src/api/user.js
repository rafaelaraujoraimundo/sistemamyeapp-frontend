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
