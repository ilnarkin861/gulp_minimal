const gulp = require('gulp');

//Tasks
require('./gulp/dev.js');
require('./gulp/prod.js');


gulp.task('default', 
	gulp.series(
		'clean:dev',
		gulp.parallel('pug:dev','sass:dev', 'images:dev', 'js:dev', 'favicon:dev'),
		gulp.parallel('server:dev', 'watch:dev')
	)
);

gulp.task('prod', 
	gulp.series(
		'clean:prod',
		gulp.parallel('pug:prod','sass:prod', 'images:prod', 'js:prod', 'favicon:prod'),
		gulp.parallel('server:prod')
	)
);