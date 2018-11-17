var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');


// Browser Sync
gulp.task('browserSync', function(done) {
  browserSync.init({
    server: {
      baseDir: ["./", "./src"]
    },
  });
  done();
});

// Sass Compile

gulp.task('sass', function(done) {
	return gulp.src('src/scss/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.reload({
		stream: true
	})) 
	done();
});


// Watch Function

gulp.task('watch', gulp.series(gulp.parallel('browserSync', 'sass'), function() {
	gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('src/*.html').on('change', browserSync.reload);
	gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
}));


// Build Task

gulp.task('build', function () {
    var plugins = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ];
    return gulp.src('src/css/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('dist/css'));
});
