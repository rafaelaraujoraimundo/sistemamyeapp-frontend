const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  logoEmpresa: state => state.user.usuario.empresa.logoempresa,
  user: state => state.user.usuario
}
export default getters
