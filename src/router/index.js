import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/Users/LoginView.vue'
import RegisterView from '../views/Users/RegisterView.vue'

import HomeView from '../views/HomeView.vue'
import StudentsView from '../views/Students/IndexView.vue'
import CoursesView from '../views/Courses/IndexView.vue'
import EnrollmentsView from '../views/Enrollments/IndexView.vue'

const routes = [

  {
    path: '/auth/',
    name: 'auth',
    children: [

      {
        path: 'login',
        name: 'login',
        component: LoginView
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterView
      },

    ]
  },

  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  
  {
    path: '/test/',
    name: 'test',
    children: [

      {
        path: 'students',
        name: 'students',
        component: StudentsView
      },
      {
        path: 'courses',
        name: 'courses',
        component: CoursesView
      },
      {
        path: 'enrollments',
        name: 'enrollments',
        component: EnrollmentsView
      },

    ]
  },



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
