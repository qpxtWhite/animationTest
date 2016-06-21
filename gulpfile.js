var gulp = require('gulp');
var tinypng = require('gulp-tinypng-compress');
var webserver = require('gulp-webserver');
var os=require('os');
var ifaces=os.networkInterfaces();

function getIP(){
	var ip = 'localhost';
	for (var dev in ifaces) {
		ifaces[dev].every(function(details){
			if (details.family=='IPv4' && details.address!='127.0.0.1' && !details.internal) {
				ip = details.address;
				return false;
			}
			return true;
		});
	}
	return ip;
}

gulp.task('tinypng', function () {
	gulp.src('images/**/*.{png,jpg,jpeg}')
		.pipe(tinypng({
			key: 'GmDUo_zqxJjFHVTt-ttrRAQqbm9mZAVP',
			log: true
		}))
		.pipe(gulp.dest('images'));
});

gulp.task('server', function() {
	gulp.src('.')
		.pipe(webserver({
			host: getIP(),
			directoryListing: true,
			livereload: true,
			open: true
		}));
});