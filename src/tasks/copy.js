module.exports = {
  vendor: {
    files: [
      {expand: true, cwd: 'node_modules/jquery/dist', src: ['./**/*.*'], dest: 'public/assets/lib/jquery', filter: 'isFile'},
      {expand: true, cwd: 'node_modules/bootstrap/dist', src: ['./**/*.*'], dest: 'public/assets/lib/bootstrap', filter: 'isFile'},
      {expand: true, cwd: 'node_modules/font-awesome', src: ['./{css,fonts}/*.*'], dest: 'public/assets/lib/font-awesome', filter: 'isFile'},
      {expand: true, cwd: 'node_modules/metismenu/dist', src: ['./**/*.*'], dest: 'public/assets/lib/metismenu', filter: 'isFile'},
      {expand: true, cwd: 'node_modules/screenfull/dist', src: ['./**/*.*'], dest: 'public/assets/lib/screenfull', filter: 'isFile'},
      {expand: true, cwd: 'node_modules/animate.css', src: ['./*.css'], dest: 'public/assets/lib/animate.css', filter: 'isFile'},
    ]
  },


  main: {
    files: [{
      expand: true,
      cwd: 'src/assets/less',
      src: ['theme.less'],
      dest: 'dist/assets/less'
    }, {
      expand: true,
      cwd: 'src/assets/css',
      src: ['./**/*.*'],
      dest: 'dist/assets/css'
    }, {
      expand: true,
      cwd: 'src/assets/img',
      src: ['./**/*.*'],
      dest: 'dist/assets/img'
    }]
  },
  lib: {
    files: [{
      expand: true,
      cwd: 'bower_components',
      src: ['./**/*.*'],
      dest: 'dist/assets/lib'
    }]
  }
};
