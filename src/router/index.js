import { createRouter, createWebHashHistory } from 'vue-router'

import Homepage from '@/views/HomePage.vue'
import MoviesCatalog from '@/views/MoviesCatalog.vue'
import MoviesCatalogFiltered from '@/views/MoviesCatalogFiltered.vue'
import MovieDetails from '@/views/MovieDetails.vue'

import UserRegister from '@/views/auth/UserRegister.vue'
import UserLogin from '@/views/auth/UserLogin.vue'

import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminUsersList from '@/views/admin/AdminUsersList.vue'
import AdminUserEdit from '@/views/admin/AdminUserEdit.vue'
import AdminMoviesList from '@/views/admin/AdminMoviesList.vue'
import AdminMovieAdd from '@/views/admin/AdminMovieAdd.vue'
import AdminMovieEdit from '@/views/admin/AdminMovieEdit.vue'
import AdminCategoriesList from '@/views/admin/AdminCategoriesList.vue'
import AdminCategoryAdd from '@/views/admin/AdminCategoryAdd.vue'
import AdminCategoryEdit from '@/views/admin/AdminCategoryEdit.vue'
import AdminCommentsList from '@/views/admin/AdminCommentsList.vue'

import { useToast } from "vue-toastification";

function requireAdmin(to, from, next) {
  if (localStorage.getItem('isAdmin')!== 'true') {
    useToast().error('Vous devez être administrateur pour accéder à cette page')
    next({ name: 'home' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Homepage
  },

  // Movies routes
  {
    path: '/movies',

    children: [
      {
        path: '',
        name: 'moviesCatalog',
        component: MoviesCatalog,
      },
      {
        path: 'category/:id',
        name: 'moviesCatalogFiltered',
        component: MoviesCatalogFiltered
      },
      {
        path: 'details/:id',
        name: 'movieDetails',
        component: MovieDetails
      }
    ]
  },

  // User auth routes
  {
    path: '/register',
    name:'register',
    component: UserRegister
  },
  {
    path: '/login',
    name: 'login',
    component: UserLogin
  },

  // Admin routes
  {
    path: '/admin',
    beforeEnter: requireAdmin,

    children: [
      {
        path: '',
        name: 'adminDashboard',
        component: AdminDashboard
      },
      {
        path: 'users',
        name: 'adminUsersList',
        component: AdminUsersList
      },
      {
        path: 'users/edit/:id',
        name: 'adminUserEdit',
        component: AdminUserEdit
      },
      {
        path: 'movies',
        name: 'adminMoviesList',
        component: AdminMoviesList
      },
      {
        path: 'movies/add',
        name: 'adminMovieAdd',
        component: AdminMovieAdd
      },
      {
        path: 'movies/edit/:id',
        name: 'adminMovieEdit',
        component: AdminMovieEdit
      },
      {
        path: 'categories',
        name: 'adminCategoriesList',
        component: AdminCategoriesList
      },
      {
        path: 'categories/add',
        name: 'adminCategoryAdd',
        component: AdminCategoryAdd
      },
      {
        path: 'categories/edit/:id',
        name: 'adminCategoryEdit',
        component: AdminCategoryEdit
      },
      {
        path: 'comments',
        name: 'adminCommentsList',
        component: AdminCommentsList
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
