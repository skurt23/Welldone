// importamos gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var concat= require('gulp-concat');
var browserify= require('browserify');
var tap=require('gulp-tap');
var buffer=require('gulp-buffer');
var uglify=require('gulp-uglify');
var sourcemaps=require('gulp-sourcemaps');
var postcss=require('gulp-postcss');
var autoprefixer=require('autoprefixer');
var cssnano=require('cssnano');


//variables de patrones de archivos
var jsFiles=["src/js/*.js","src/js/**/*.js"];

// definimos tarea por defecto
gulp.task("default", ["concat-js","compile-sass"], function(){

    // iniciar BrowserSync
    browserSync.init({
        //server: "./", // levanta servidor web en carpeta actual
        //browser: "google chrome" //firefox , opera, google chrome
    });

    // observa cambios en archivos SASS y ejecuta la tarea de compilación
    gulp.watch("src/scss/**/*.scss", ["compile-sass"]);


    //observar cambios en archivos JS
    gulp.watch(jsFiles,["concat-js"]);

});

// se define la tarea para compilar SASS
gulp.task("compile-sass", function(){
    gulp.src("./src/scss/style.scss") // cargamos le archivo
    .pipe(sourcemaps.init()) //comenzamos la captura de sourcemaps
    .pipe(sass().on('error', sass.logError)) // compilamos el archivo SASS

    .pipe(postcss([
      autoprefixer(),
      cssnano()
    ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("./static/css/"))// ruta de destino para el archivo final css generado.
    .pipe(notify({
        title: "SASS",
        message: "Compiled"
    }))
    .pipe(browserSync.stream());
});

//definimos la tarea para concatenar JS
//
//NOTA: Materialize se omite en esta tarea, y se usa directamente en /static porque da error al procesarse con browserify
//+ info: https://github.com/Dogfalo/materialize/issues/1422
//
//TODO: Ahora mismo no está concatenando el JS
gulp.task("concat-js",function(){
    gulp.src("src/js/app.js")
    .pipe(sourcemaps.init())
    .pipe(tap(function(file){
        file.contents=browserify(file.path).bundle();
    }))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("./static/js/")) // ruta de destino para el archivo final js negerado
    .pipe(notify({
        title: "JS",
        message: "Javascript Final Generado"
    }))
    .pipe(browserSync.stream());
});



