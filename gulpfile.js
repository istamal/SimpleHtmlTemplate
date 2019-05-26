var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    autoprefixer   = require('gulp-autoprefixer');


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });
});


gulp.task('sass', function() {
    return gulp
    .src('app/sass/**/*.sass')
    .pipe(sass({outputStyle: 'expand'}).on("error", sass.logError))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function() {
    return gulp
    .src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/js/common.js',
		])
	.pipe(concat('scripts.min.js'))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function () {
    return gulp
    .src('app/*.html')
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('js'));
    gulp.watch('app/*.html', gulp.parallel('html'));
});

gulp.task('default', gulp.parallel('watch', 'html', 'sass', 'js', 'browser-sync'));