'use strict';

module.exports = function(grunt) {
	require("load-grunt-tasks")(grunt);
	require("time-grunt")(grunt);

	var config = {
		app: 'public',
		dist: 'dist'
	};

	grunt.initConfig({
		config: config,
		useminPrepare: {
			html: '<%=config.app%>/index.html'
		},
		usemin: {
			html: [
				'<%= config.dist %>/index.html'
			]
		},
		copy: {
			target: {
				src: '<%=config.app%>/index.html',
				dest: '<%=config.dist%>/index.html'
			},
			dist:{
				files: [{
                    expand: true,
                    cwd: '<%=config.app%>/img/',
                    src: ['{,*/}*.{png,jpg,jpeg,gif}'],
                    dest: '<%=config.dist%>/img/'
                },{
                    expand: true,
                    cwd: '<%=config.app%>/js/libs/',
                    src: ['*.js'],
                    dest: '<%=config.dist%>/js/libs/'
                },{
                    expand: true,
                    cwd: '<%=config.app%>/templates/',
                    src: ['*.html'],
                    dest: '<%=config.dist%>/templates/'
                },{
                    expand: true,
                    cwd: '<%=config.app%>/css/',
                    src: 'bootstrap.min.css',
                    dest: '<%=config.dist%>/css/'
                },{
                    expand: true,
                    cwd: '<%=config.app%>/fonts/',
                    src: '*',
                    dest: '<%=config.dist%>/fonts/'
                }]
			}
		},
		rev: {
			dist: {
				files: {
					src: [
						'<%= config.dist %>/js/app.js',
						'<%= config.dist %>/css/main.css'
					]
				}
			}
		},
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%=config.app%>/sass',
					src: ['*.scss'],
					dest: '<%=config.app%>/css',
					ext: '.css'
				}]
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= config.dist %>/*',
					]
				}]
			}
		},
		connect: {
			options: {
				port: 9000,
				open: true,
				livereload: 35729,
				// Change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function(connect) {
						return [
							connect.static(config.app)
						];
					}
				}
			},
			dist: {
				options: {
					middleware: function(connect) {
						return [
							connect.static('.tmp'),
							connect.static(config.dist)
						];
					}
				}
			}
		},
		watch: {
			js: {
				files: ['<%= config.app %>/js/{,*/}*.js'],
				options: {
					livereload: true
				}
			},
			sass: {
				files: ['<%= config.app %>/sass/{,*/}*.{scss,sass}'],
				tasks: ['sass']
			},
			//关键是下面这步，在sass变化时reload,刷新页面
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= config.app %>/css/{,*/}*.css'
				]
			}
		},
		imagemin: {
            dest: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: '<%=config.dist%>/img/',
                    src: ['{,*/}*.{png,jpg,jpeg,gif}'],
                    dest: '<%=config.dist%>/img/'
                }]
            }
        }
	});

	//使用usemin最重要点：在useminPrepare和usemin中一般只需要配置操作的index.html文件即可，
	//在index.html文件中指定的css和js会在执行useminPrepare和usemin之间的concat、cssmin、uglify时进行拼接、压缩并copy到<!-- build:**-->指定的目录下面,usemin会执行将index.html中设置的<!--build:**-->进行替换
	grunt.registerTask('baseUsermin', [
		'clean',
		'copy',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'rev',
		'usemin'
	]);

	//加上其他的task
	grunt.registerTask('build', [
		'clean',
		'sass',
		'copy',
		// 'sprite',
		// 'imagemin',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'rev',
		'usemin'
		// 'connect:livereload',
		// 'watch'
	]);

	//开发阶段使用
	grunt.registerTask('default', [
		'clean',
		'sass',
		// 'connect:livereload',
		'watch'
	]);
}