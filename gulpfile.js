var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("js/*.js").on("change", reload);
    gulp.watch("*.html").on("change", reload);
    gulp.watch("css/*.css").on("change", reload);
});

gulp.task('default', ['browser-sync']);