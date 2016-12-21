var gulp = require("gulp");
var ts = require("gulp-typescript");
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

// gulp.task('watch', function () {
//     // Endless stream mode
//     return gulp.src("src/*.ts")
//         .pipe(watch('src/*.ts', {ignoreInitial: false}))
//         .pipe(ts({
//             noImplicitAny: true,
//             out: "app.js",
//             module: 'amd'
//         }))
//         .pipe(gulp.dest("public/libs/initium"));
// });

gulp.task('watch', function () {
    watch('src/**/*.ts', batch(function (events, done) {
        gulp.start('build', done);
        gulp.start('livereload', done);
    }));
});

gulp.task("build", function () {
    var tsResult = gulp.src("src/*.ts")
        .pipe(ts({
            noImplicitAny: true,
            out: "app.js",
            module: 'amd'
        }));
    return tsResult.js.pipe(gulp.dest("public/libs/initium"));
});


gulp.task('webserver', function () {
    connect.server({
        name: 'Dist App',
        root: 'public',
        port: 9001,
        livereload: true
    });
});

//livereload
gulp.task('livereload', function() {
    gulp.src("src/*.ts")
        .pipe(connect.reload());
});

gulp.task('serve', ['watch', 'webserver']);

gulp.task('default', ['build', 'webserver']);