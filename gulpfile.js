const gulp = require('gulp')
const gutil = require('gulp-util')
const ftp = require('vinyl-ftp')

gulp.task('upload', () => {
    const conn = ftp.create({
        host: 'test3.xiaomaowu.com',
        user: '35g6or65',
        password: '8SE1a0GrKxHEVFHa',
        log: gutil.log,
    })

    return gulp.src(['dist/**/*', '!dist/favicon.ico', '!dist/index.html'])
        .pipe(conn.dest('/public'))
})
