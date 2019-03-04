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
    view: 'EditProfile',
  },
  {
    // add test by keith
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
    path: '/dashboard',
    view: 'Dashboard'
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile'
  },
  {
    path: '/table-list',
    name: 'Table List',
    view: 'TableList'
  },
  {
    path: '/typography',
    view: 'Typography'
  },
  {
    path: '/icons',
    view: 'Icons'
  },
  {
    path: '/maps',
    view: 'Maps'
  },
  {
    path: '/notifications',
    view: 'Notifications'
  },
  {
    path: '/upgrade',
    name: 'Upgrade to PRO',
    view: 'Upgrade'
  }
]