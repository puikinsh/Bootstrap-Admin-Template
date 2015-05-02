module.exports = {
  // Task-level options
  options: {
    flatten: true,
    postprocess: require('pretty'),
    assets: '<%= config.assets %>',
    data: '<%= config.data %>',
    partials: ['<%= config.partials %>'],
    helpers: ['<%= config.helpers %>', 'handlebars-helper-analytics'],
    layoutdir: '<%= config.layoutdir %>',
    layout: 'default',
    layoutext: '.hbs',
    analytics: '<%= config.analytics %>',
    ads: '<%= config.ads %>',
    marked: {
      breaks: false,
      gfm: true,
      langPrefix: 'language-',
      pedantic: false,
      sanitize: false,
      silent: false,
      smartLists: false,
      smartypants: false,
      tables: true
    }
  },
  main: {
    files: [{
      expand: true,
      cwd: '<%= config.pages %>',
      src: ['*.hbs'],
      dest: '<%= config.dest %>'
    }]
  },
  rtl: {
    options: {
      layout: 'default',
      rtl: true
    },
    files: [{
      expand: true,
      cwd: '<%= config.pages %>',
      src: ['*.hbs'],
      dest: '<%= config.dest %>/rtl'
    }]
  }
};
