/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */

// Relative to /src/views
export default [

  {
    // add login by keith
    path: '/login',
    name: 'Log in',
    view: 'Login'
  },
  {
    // add register by keith
    path: '/register',
    name: 'Register',
    view: 'Register'
  },
  {
    // add pixel by keith
    path: '/pixel',
    name: 'Pixel',
    view: 'Pixel'
  },
  {
    // add editprofile by keith
    path: '/edit-profile',
    name: 'Edit Profile',
    view: 'EditProfile'
  },
  {
    // add upload by keith
    path: '/upload',
    name: '上传作品',
    view: 'Upload'
  },
  {
    // add admin user by keith
    path: '/admin-user',
    name: '管理用户',
    view: 'AdminUser'
  },
  {
    path: '/user/:id/type/:type',
    view: 'UserList'
  },
  {
    // 为该页面增加动态路由，从而提高页面复用
    path: '/user-profile/:id/type/:type',
    name: 'User Profile',
    view: 'UserProfile'
  },
  {
    path: '/admin-comment',
    name: '管理评论',
    view: 'AdminComment'
  }, {
    path: '/search/:type',
    name: '搜索作品',
    view: 'Search'
  }

]
