var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var cleanCSS = require('gulp-clean-css');
var pump = require('pump');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');

var input = ['./public/sass/**/*.scss'];
var output = './public/dist';

var pkg = require('./package.json');

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var sassOptions = {
    outputStyle: 'compact'
};

gulp.task('clean', function() {
    return gulp.src([output], { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('serve', ['simple-sass'], function() {

    browserSync.init({
        port: 3000,
        server: "./public"
    });

    gulp.watch(input, ['simple-sass']);
    gulp.watch("./public/*.html").on('change', browserSync.reload);
});

gulp.task('simple-sass', function() {
    return gulp
        .src(input)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest('./public/dist'))
        .pipe(browserSync.stream());
});

gulp.task('sass', ['clean'], function() {
    return gulp
        .src(input)
        .pipe(sass(sassOptions))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(output));
});

// gulp.task('uglify-js', ['clean'], function(cb) {

//     var uglifyOptions = {
//         mangle: true,
//         preserveComments: 'license'
//     };

//     pump([
//         gulp.src('./src/*.js'),
//         uglify(),
//         gzip(),
//         gulp.dest(output)
//     ], cb);

// });

gulp.task('rename', ['sass'], function() {
    return gulp.src(["./public/dist/*.css", "./public/dist/*.js"])
        .pipe(rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(gulp.dest(output));
});

gulp.task('minify-css', ['rename'], function() {
    return gulp.src('./public/dist/*.min.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gzip())
        .pipe(gulp.dest(output));
});


gulp.task('build:prod', ['clean', 'sass', 'rename', 'minify-css']);
gulp.task('build:dev', ['clean', 'sass', 'serve']);
gulp.task('default', ['build:dev']);
