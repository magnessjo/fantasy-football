
// Gulpfile

"use strict";

// Dependencies

var gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    include      = require('gulp-include'),
    sass         = require('gulp-sass'),	
    htmlmin      = require('gulp-htmlmin'),
    consolidate  = require('gulp-consolidate'),
    less         = require('gulp-less-sourcemap');

// Tasks

gulp.task('static', function() {
  gulp.src('static/**/*.*')
    .pipe(gulp.dest('build'));
});

gulp.task('views', function() {
  gulp.src(['views/**/*.html', '!views/layouts/**/*.html', '!views/partials/**/*.html'])
    .pipe(consolidate('just'))
    .pipe(htmlmin({ collapseWhitespace: false, removeComments: true }))
    .pipe(gulp.dest('build'))
});

gulp.task('styles', function() {
  gulp.src('styles/master.scss')
    .pipe(sass({ compress: false, sourceMap: true }))
    .pipe(gulp.dest('build/styles'));
});

gulp.task('scripts', function() {
  gulp.src('scripts/app.js')
    .pipe(include({ extensions: 'js' }))
    .pipe(concat('all.js'))
    .pipe(uglify({ preserveComments: 'some' }))
    .pipe(gulp.dest('build/scripts'));
});

gulp.task('watch', function() {
  gulp.watch('views/**/*.*',   ['views']);
  gulp.watch('static/**/*.*',  ['static']);
  gulp.watch('styles/**/*.*',  ['styles']);
  gulp.watch('scripts/**/*.*', ['scripts']);
});

gulp.task('build',   ['static', 'views', 'styles', 'scripts']);
gulp.task('default', ['build', 'watch']);

