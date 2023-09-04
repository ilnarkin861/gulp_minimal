const gulp = require('gulp');
const clean = require('gulp-clean');
const pug = require('gulp-pug');
const webpHTML = require('gulp-webp-html');
const htmlclean = require('gulp-htmlclean');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
var webpCss = require('gulp-webp-css');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const babel = require('gulp-babel');
var jsmin = require('gulp-jsmin');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const changed = require('gulp-changed');
const fs = require('fs');



let browserSync = require('browser-sync').create();

const errorsNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: true
		})
	}
}


//Clean
gulp.task('clean:prod', function(done){
	if(fs.existsSync('./prod/')){
		return gulp.src('./prod/', {read: false})
            .pipe(clean());
	}

	done();	
});


//Pug
gulp.task('pug:prod', function(){
	return gulp.src('./src/pug/index.pug')
		.pipe(changed('./prod/', {hasChanged: changed.compareContents}))
		.pipe(plumber(errorsNotify('Pug')))
		.pipe(pug())
		.pipe(webpHTML())
		.pipe(htmlclean())
		.pipe(gulp.dest('./prod/'));
});


// Sass
gulp.task('sass:prod', function(){
	return gulp.src('./src/scss/style.scss')
		.pipe(changed('./prod/css/'))
		.pipe(plumber(errorsNotify('Scss')))
		.pipe(sass())
		.pipe(autoprefixer({cascade: true}))
		.pipe(webpCss())
		.pipe(csso())
		.pipe(gulp.dest('./prod/css/'))
});


//Images
gulp.task('images:prod', function(){
	return gulp.src('./src/img/**/*')
		.pipe(changed('./prod/img'))
		.pipe(webp())
		.pipe(gulp.dest('./prod/img/'))
		
		.pipe(gulp.src('./src/img/**/*'))
		.pipe(changed('./prod/img'))
		.pipe(imagemin({verbose: true}))
		.pipe(gulp.dest('./prod/img/'))
});


//Js
gulp.task('js:prod', function(){
	return gulp.src('./src/js/**/*.js')
		.pipe(changed('./prod/js'))
		.pipe(babel())
		.pipe(jsmin())
		.pipe(gulp.dest('./prod/js/'));
});


//Favicon
gulp.task('favicon:prod', function(){
	return gulp.src('./src/favicon.ico')
		.pipe(gulp.dest('./prod/'));
});


//Examples
gulp.task('examples:prod', function(){
	return gulp.src('./src/examples/**/*')
		.pipe(gulp.dest('./prod/examples/'));
});


//Server
gulp.task('server:prod', function(){
	browserSync.init({
		server: {
		  baseDir: './prod/'
		}
	  });
});