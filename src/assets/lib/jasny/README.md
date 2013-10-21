<a href="http://jasny.github.com/bootstrap">
  <img src="http://jasny.github.com/bootstrap/assets/img/bootstrap-docs-readme.png" width="100px">
</a>
# [Jasny Bootstrap v2.3.1-j6](http://jasny.github.com/bootstrap) [![Build Status](https://travis-ci.org/jasny/bootstrap.png?branch=master)](https://travis-ci.org/jasny/bootstrap)

Bootstrap is a sleek, intuitive, and powerful front-end framework for faster and easier web development, created and maintained by [Mark Otto](http://twitter.com/mdo) and [Jacob Thornton](http://twitter.com/fat).

This version is extended by [Arnold Daniels](http://twitter.com/ArnoldDaniels) of [Jasny](http://www.jasny.net/) and contains a number of extra features.

To get started, checkout http://jasny.github.com/bootstrap!

## Quick start

Three quick start options are available:

* [Download the latest release](https://github.com/jasny/bootstrap/zipball/master).
* Clone the repo: `git clone git://github.com/jasny/bootstrap.git`.
* Install with Twitter's [Bower](http://twitter.github.com/bower): `bower install jasny/bootstrap`.



## Versioning

For transparency and insight into our release cycle, and for striving to maintain backward compatibility, Bootstrap will be maintained under the Semantic Versioning guidelines as much as possible.

Releases will be numbered with the following format:

`<major>.<minor>.<patch>-p<jasny version>`

And constructed with the following guidelines:

* Breaking backward compatibility bumps the major
* New additions without breaking backward compatibility bumps the minor
* Bug fixes and misc changes bump the patch
* Additionally the version for the Jasny extensions will simply be incremented with each release and is prefixed with a 'p'

For more information on SemVer, please visit [http://semver.org/](http://semver.org/).


## Bug tracker

Have a bug or a feature request? [Please open a new issue](https://github.com/jasny/bootstrap/issues). Before opening any issue, please search for existing issues and read the [Issue Guidelines](https://github.com/necolas/issue-guidelines), written by [Nicolas Gallagher](https://github.com/necolas/).



## Community

Keep track of development and community news.

* Follow [@ArnoldDaniels](http://twitter.com/ArnoldDaniels) and [@twbootstrap](http://twitter.com/twbootstrap)  on Twitter.
* Read articles on [jasny.net](http://www,jasny.net).
* Read and subscribe to the [The Official Twitter Bootstrap Blog](http://blog.getbootstrap.com).
* Have a question that's not a feature request or bug report? [Ask on the mailing list.](http://groups.google.com/group/twitter-bootstrap)
* Chat with fellow Bootstrappers in IRC. On the `irc.freenode.net` server, in the `##twitter-bootstrap` channel.



## Compiling CSS and JavaScript

Bootstrap includes a [makefile](Makefile) with convenient methods for working with the framework. Before getting started, be sure to install [the necessary local dependencies](package.json):

```
$ npm install
```

When completed, you'll be able to run the various make commands provided:

#### build - `make`
Runs the recess compiler to rebuild the `/less` files and compiles the docs. Requires recess and uglify-js.

#### test - `make test`
Runs jshint and qunit tests headlessly in [phantomjs](http://code.google.com/p/phantomjs/) (used for ci). Depends on having phantomjs installed.

#### watch - `make watch`
This is a convenience method for watching just Less files and automatically building them whenever you save. Requires the Watchr gem.

Should you encounter problems with installing dependencies or running the makefile commands, be sure to first uninstall any previous versions (global and local) you may have installed, and then rerun `npm install`.



## Contributing

Please submit all pull requests against *-wip branches. If your pull request contains JavaScript patches or features, you must include relevant unit tests. All HTML and CSS should conform to the [Code Guide](http://github.com/mdo/code-guide), maintained by [Mark Otto](http://github.com/mdo).

Don't have time to customize your own fork? You can consider [sponsoring a new feature](https://www.catincan.com/projects/close/jasny-bootstrap).

Thanks!



## Authors

**Mark Otto**

+ [http://twitter.com/mdo](http://twitter.com/mdo)
+ [http://github.com/mdo](http://github.com/mdo)

**Jacob Thornton**

+ [http://twitter.com/fat](http://twitter.com/fat)
+ [http://github.com/fat](http://github.com/fat)

**Arnold Daniels**

+ [http://twitter.com/ArnoldDaniels](http://twitter.com/ArnoldDaniels)
+ [http://github.com/jasny](http://github.com/jasny)
+ [http://www.jasny.net](http://www.jasny.net/)



## Copyright and license

Copyright 2012 Twitter, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this work except in compliance with the License.
You may obtain a copy of the License in the LICENSE file, or at:

  [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
