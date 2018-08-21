const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");

gulp.task("sass", function() {
  return gulp
    .src("scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("serve", ["sass"], function() {
  browserSync.init({
    server: "./dist"
  });

  gulp.watch("scss/*.scss", ["sass"]);
  gulp.watch("dist/*.html").on("change", browserSync.reload);
});

gulp.task("default", ["serve"]);
