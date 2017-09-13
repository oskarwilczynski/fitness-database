// Gulp.js configuration
const
    // modules
    gulp = require("gulp"),
    newer = require("gulp-newer"),
    imagemin = require("gulp-imagemin"),
    header = require("gulp-header"),
    htmlmin = require("gulp-htmlmin"),
    cssnano = require("gulp-cssnano"),
    babel = require("gulp-babel"),
    uglify = require("gulp-uglify"),
    pump = require("pump");

    // development mode?
    devBuild = (process.env.NODE_ENV !== "production"),

    // image processing
    gulp.task("images-min", function(cb) {
        pump([
            gulp.src("images/*"),
            imagemin({ optimizationLevel: 5 }),
            gulp.dest("../portfolio-site/dist/projects/fitness-database/images/")
        ], cb);
    });

    // HTML processing
    gulp.task("html-min", function(cb) {
        pump([
            gulp.src("index.html"),
            htmlmin({collapseWhitespace: true}),
            header("<!-- To see the unminified version visit https://github.com/oskarwilczynski/fitness-database/blob/master/index.html -->\n\n"),
            gulp.dest("../portfolio-site/dist/projects/fitness-database/")
        ], cb);
    });

    // CSS processing
    gulp.task("css-min", function(cb) {
        pump([
            gulp.src("styles/main.css"),
            cssnano(),
            header("/* To see the unminified version visit https://github.com/oskarwilczynski/fitness-database/blob/master/styles/main.css */\n\n"),
            gulp.dest("../portfolio-site/dist/projects/fitness-database/styles/")
        ], cb);
    });

    // JS + Babel processing
    gulp.task("js-min", function(cb) {
        pump([
            gulp.src("scripts/main.js"),
            babel({presets: ["env"]}),
            uglify(),
            header("// To see the unminified version visit https://github.com/oskarwilczynski/fitness-database/blob/master/scripts/main.js\n\n"),
            gulp.dest("../portfolio-site/dist/projects/fitness-database/scripts/")
        ], cb);
    });

    // run all tasks
    gulp.task("min-all", ["html-min", "css-min", "js-min"]);
;
