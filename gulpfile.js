
const gulp         = require('gulp'); // gulp
const sass         = require('gulp-sass'); // compile scss to css
const imageop      = require('gulp-image-optimization'); // image optimization
const include      = require('gulp-include'); //
const browserSync  = require('browser-sync'); // live reload browser
const imagemin     = require('gulp-imagemin'); // Подключаем библиотеку для работы с изображениями
const pngquant     = require('imagemin-pngquant'); // Подключаем библиотеку для работы с png
const debug        = require('gulp-debug');
const del          = require('del');
const sourcemaps   = require('gulp-sourcemaps');
const cleanCSS     = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const babel        = require('gulp-babel');


gulp.task('svg', function() {
    return gulp.src('./src/images/**/*.svg')
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('img',['svg'], function() {
  return gulp.src(['./src/images/*.png','./src/images/*.jpg','./src/images/*.gif','./src/images/*.jpeg']) // Берем все изображения из src
      .pipe(imagemin({ // Сжимаем их с наилучшими настройками
          optimizationLevel: 5,
          interlaced: true,
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
      }))
      .pipe(gulp.dest('./dist/images'));
});

gulp.task('browser-sync', function () {
  browserSync({
      server: './',
      directory: true,
      index: "index.html",
      notify: false
  });
});

gulp.task('html', () =>
    gulp.src('./src/*.html')
        .pipe(include({
            prefix: '@@',
            basepath: './src/modules/'
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({stream: true}))
)

gulp.task('fonts', function() {
  return gulp.src('./src/fonts/**/*.*')
  .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('scripts', function() {
  return gulp.src("./src/js/*.js")
      .pipe(sourcemaps.init())
      .pipe(babel({presets: ['@babel/env']}))
      .pipe(gulp.dest("./dist/js"))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('css', function() {
    return gulp.src("./src/styles/*.css")
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('sass',['css'], function () {
        return gulp.src('./src/styles/**/*.{scss, sass}')
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./dist/css'))
            .pipe(browserSync.reload({stream: true}));
    });


gulp.task('clean', function(){
  return del.sync('dist');
});

gulp.task('build', ['clean', 'sass', 'fonts', 'scripts', 'html', 'img'], function(){
});

gulp.task('watch', ['browser-sync', 'build'], function () {
  gulp.watch('./src/images/*.*', ['img']);
  gulp.watch('./src/**/*.html', ['html']);
  gulp.watch('./src/styles/**/*.{scss, sass}', ['sass']);
  gulp.watch('./src/js/**/*.js', ['scripts']);
})

gulp.task('default', ['watch']);