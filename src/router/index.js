import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

function guardMyroute(to, from, next) {
  var isAuthenticated = true;
  //this is just an example. You will have to find a better or
  // centralised way to handle you localstorage data handling
  if (isAuthenticated) {
    isAuthenticated = true;
    console.log("Passou Pelo GuarMyRoute");
  } else {
    isAuthenticated = false;
  }

  if (isAuthenticated) {
    next(); // allow to enter route
  } else {
    next("/login"); // go to '/login';
  }
}

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/alterarSenha/:uid/:token",
    component: () => import("@/views/alterarSenha/index"),
    hidden: true,
    name: 'alterarSenha'
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    modulo: true,
    meta: { title: "Avaliação De Unidades", icon: "dashboard" }
  },
  {
    path: "",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        beforeEnter: guardMyroute,
        component: () => import("@/views/dashboard/index"),
        meta: { title: "Dashboard", icon: "dashboard" }
      }
    ]
  },

  {
    path: "/CadastroAV",
    component: Layout,
    beforeEnter: guardMyroute,
    redirect: "/CadastroAV/indicadores",
    name: "Cadastro",
    meta: { title: "Cadastro", icon: "el-icon-s-help" },
    children: [
      {
        path: "IndicadorPrincipal",
        name: "Indicadores Principais",
        beforeEnter: guardMyroute,
        component: () => import("@/views/indicadorPrincipal/index"),
        meta: { title: "Indicadores Matriz", icon: "el-icon-s-data" },
        children: [
          {
            path: "Lista",
            name: "IndicadoresPrincipalList",
            beforeEnter: guardMyroute,
            component: () =>
              import("@/views/indicadorPrincipal/indicadoresList"),
            meta: { title: "Indicadores Matriz", icon: "el-icon-s-data" }
          },
          {
            path: "novo",
            name: "NovoIndicadorPrincipal",
            beforeEnter: guardMyroute,
            component: () => import("@/views/indicadorPrincipal/novo"),
            meta: {
              title: "Novo Indicador Matriz",
              icon: "el-icon-edit-outline"
            },
            hidden: true
          },
          {
            path: "editar",
            name: "EditarIndicadorPrincipal",
            beforeEnter: guardMyroute,
            component: () => import("@/views/indicadorPrincipal/editar"),
            meta: { title: "Editar Indicador", icon: "el-icon-edit-outline" },
            hidden: true
          }
        ]
      },
      {
        path: "Indicadores",
        name: "Indicadores",
        beforeEnter: guardMyroute,
        component: () => import("@/views/indicadores/index"),
        meta: { title: "Indicadores", icon: "el-icon-s-marketing" },
        children: [
          {
            path: "",
            name: "IndicadoresList",
            beforeEnter: guardMyroute,
            component: () => import("@/views/indicadores/indicadoresList"),
            meta: { title: "Indicadores", icon: "el-icon-s-marketing" }
          },
          {
            path: "novo",
            name: "NovoIndicador",
            beforeEnter: guardMyroute,
            component: () => import("@/views/indicadores/novo"),
            meta: { title: "Novo Indicador", icon: "el-icon-edit-outline" },
            hidden: true
          },
          {
            path: "editar",
            name: "EditarIndicador",
            beforeEnter: guardMyroute,
            component: () => import("@/views/indicadores/editar"),
            meta: { title: "Editar Indicador", icon: "el-icon-edit-outline" },
            hidden: true
          }
        ]
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "processamentoMensal",
        name: "processamentoMensal",
        beforeEnter: guardMyroute,
        component: () => import("@/views/processamentoMensal/index"),
        meta: { title: "Processamento Mensal", icon: "el-icon-data-analysis" }
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    modulo: true,
    meta: { title: "Administração", icon: "dashboard" }
  },
  {
    path: "/administracao/empresas",
    name: "Empresas",
    component: Layout,
    redirect: "/administracao/empresas/lista",
    beforeEnter: guardMyroute,
    meta: { title: "Empresas", icon: "el-icon-s-marketing" },
    children: [
      {
        path: "/administracao/empresas/lista",
        name: "IndicadoresList",
        beforeEnter: guardMyroute,
        component: () => import("@/views/empresas/empresasList"),
        meta: { title: "Empresas", icon: "el-icon-s-cooperation" }
      },
      {
        path: "/administracao/empresa/novo",
        name: "novaempresa",
        beforeEnter: guardMyroute,
        component: () => import("@/views/empresas/novo"),
        meta: { title: "Nova Empresa", icon: "el-icon-edit-outline" },
        hidden: true
      },
      {
        path: "editar",
        name: "EditarEmpresa",
        beforeEnter: guardMyroute,
        component: () => import("@/views/empresas/editar"),
        meta: { title: "Editar Indicador", icon: "el-icon-edit-outline" },
        hidden: true
      }
    ]
  },
  {
    path: "/administracao/filiais",
    name: "filiais",
    component: Layout,
    redirect: "/administracao/filiais/lista",
    beforeEnter: guardMyroute,
    meta: { title: "Filiais", icon: "el-icon-suitcase" },
    children: [
      {
        path: "/administracao/filiais/lista",
        name: "filiaisList",
        beforeEnter: guardMyroute,
        component: () => import("@/views/filiais/filiaisList"),
        meta: { title: "Filiais", icon: "el-icon-suitcase" }
      },
      {
        path: "/administracao/filiais/novo",
        name: "novafilial",
        beforeEnter: guardMyroute,
        component: () => import("@/views/filiais/novo"),
        meta: { title: "Nova Filial", icon: "el-icon-edit-outline" },
        hidden: true
      },
      {
        path: "editar",
        name: "EditarFilial",
        beforeEnter: guardMyroute,
        component: () => import("@/views/filiais/editar"),
        meta: { title: "Editar Filiais", icon: "el-icon-edit-outline" },
        hidden: true
      }
    ]
  },
    {
    path: "/administracao/usuarios",
    name: "usuarios",
    component: Layout,
    redirect: "/administracao/usuarios",
    beforeEnter: guardMyroute,
    meta: { title: "Usuarios", icon: "el-icon-user" },
    children: [
      {
        path: "/administracao/usuarios",
        name: "usuariosList",
        beforeEnter: guardMyroute,
        component: () => import("@/views/usuarios/usuariosList"),
        meta: { title: "Usuarios", icon: "el-icon-user" }
      },
      {
        path: "/administracao/usuarios/novo",
        name: "novousuario",
        beforeEnter: guardMyroute,
        component: () => import("@/views/usuarios/novo"),
        meta: { title: "Novo Usuário", icon: "el-icon-user" },
        hidden: true
      },
      {
        path: "/administracao/usuarios/editar",
        name: "EditarUsuario",
        beforeEnter: guardMyroute,
        component: () => import("@/views/usuarios/editar"),
        meta: { title: "Editar Usuarios", icon: "el-icon-user" },
        hidden: true
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
