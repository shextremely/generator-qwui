'use strict';

// 加载 yeoman generator 的核心功能模块.
const Generator = require('yeoman-generator');
// 加载文件读写模块.
const fs = require('fs');
// 加载路径模块
const path = require('path');
// 加载输出模块
const chalk = require('chalk');
//加载yeoman语言输出模块
const yosay = require('yosay');

/**
 * Base Module
 */
module.exports = class extends Generator{

	constructor(args,opts){
		super(args,opts);

	    this.name = path.basename(process.cwd());
	    this.author = "Jacobwang";
	    this.description = '';
	}

	initializing() {
	    this.log(yosay('欢迎使用全网数商前端 ' + chalk.red('QWUI') + ' 项目生成器!'));
	}

	prompting(){
		return this.prompt([{
                type: 'input',
                name: 'name',
                message: '请输入项目名称:',
                default: this.name
            }, {
                type: 'input',
                name: 'description',
                message: '请输入项目描述:',
                default: this.description
            }, {
                type: 'input',
                name: 'author',
                message: '请输入开发人员:',
                default: this.author
            }]).then((answers) => {

	      	  this.name = answers.name;
              this.pkgName = answers.name;
              this.author = answers.author;
              this.description = answers.description;
	    });
	}


	writing(){
		let data = {
			name:this.name,
			description:this.description,
			author:this.author
		}

		let _self = this;

		fs.mkdirSync('dist');

	    this.spawnCommand('git', ['clone', 'https://github.com/wenyuking/qwui.git'])
	    	.on('exit',function(){
	    		_self.spawnCommand('rm', ['-rf','qwui/.git'])
	    	})

	    this.fs.copyTpl(
	      this.templatePath('package.json'),
	      this.destinationPath('package.json'),
	      data
	    );

	    this.fs.copy(
	      this.templatePath("gulpfile.js"),
	      this.destinationPath("gulpfile.js")
	    );

	    this.fs.copy(
	      this.templatePath(".gitignore"),
	      this.destinationPath(".gitignore")
	    );

	}

	install() {
	   this.installDependencies({
	      npm: true,
	      bower:false,
	      callback: function() {
	        this.spawnCommand('gulp', ['qwui']);
	      }.bind(this)
	    });
	}
}