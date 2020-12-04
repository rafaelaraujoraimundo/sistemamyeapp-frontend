import request from '@/utils/request'

export function processamentoMensal(data) {
  return request({
    url: '/api/calcular/',
    method: 'post',
    data
  })
}