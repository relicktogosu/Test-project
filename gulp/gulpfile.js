const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat      = require('gulp-concat');
const sass        = require('gulp-sass')(require('sass'));
const uglify      = require('gulp-uglify-es').default;
const cleanCss    = require('gulp-clean-css');

function browsersync() {
    browserSync.init({
        server: { baseDir: 'app/' },
        notify: false
    })
}

function scripts() {
	return src([
        'node_modules/jquery/dist/jquery.min.js',
        'app/js/*.js'
    ])
	.pipe(concat('app.min.js')) 
	.pipe(uglify())
	.pipe(dest('app/js/compile')) 
	.pipe(browserSync.stream()) 
}

function styles() {
    return src('app/sass/main.scss')
    .pipe(eval(sass)())
    .pipe(concat('app.min.css'))
    .pipe(cleanCss( { level: { 2: { specialComments: 0, mergeMedia: true } } } ))
    .pipe(dest('app/css/'))
    .pipe(browserSync.stream())
}

function startwatch () {
    watch('app/**/*.scss', styles)
    watch(['app/js/*.js', '!app/**/*.min.js'], scripts);
    watch('app/*.html').on('change', browserSync.reload)
}

exports.browsersync = browsersync;
exports.scripts     = scripts;
exports.styles      = styles;

exports.default = parallel(scripts, styles, browsersync, startwatch);