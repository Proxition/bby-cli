##Bears Bot Cli

This Cli is a working process.

##How to install

Use `npm install bby-cli -g` for a global installation, afterwards you can access the cli directly in your shell with e.g. `bby-cli -h`

You can use `-h | --help` to see supported commands.


##Commands

```
Options:
  -v, --version              Output the version number
  -h, --help                 Output usage information

Commands:
  init [options] <name>      Init a project setup
    Options:
    -b, --backend            Init backend for a project
    --bot                    Init of a bot project
    --tn, --typescriptNode   Init a backend with typescript and node
    --info                   Provides info
    -h, --help               Output usage information
  addTemplate <name>         Adds a new template
  addSkill [options] <name>  Adds a new skill to customHandlers - untested module
    -m --middleware          Adds Test going through middleware
    --noTest                 Not adding a test for the handler
    -h, --help               Output usage information
  addService [options]       Can add Services for following types:
    -w, --watson             Add watson Service - not yet included
    -a, --alexa              Add alexa Service - not yet included
    -d, --dialogflow         Add dialogflow Service - not yet included
    -e, --elasticsearch      Add elasticsearch Service
    --mailer                 Add mailer Service based on nodemailer
    --ngB --ngBackendService Add backend service for angular projects
    --userAuth               Add user authentification on routes with mongoose
    -h, --help               Output usage information
  addReadme                  Adds pre written readme
  addUtils [options]         Adds utils
    --customError, --cError  Add customError class
    --fp, --functionalProgramming Adds utils for functional programming.
    -h, --help               Output usage information
```


##What is this Cli for?

* Bot project initialization.
* adding standard Services
* adding new skill-handlers


##Changelog
`V.0.2.1` - removed frontend stuff

`V.0.2.0` - updated bot systems

`V.0.1.6b` - bugfix, changed be, bot init style to tn style

`V.0.1.6` - Fe Init with scss and routing, added init of node+typescript backend

`V.0.1.5c` - command `addService -ngB` changed to `addService --ngB`

`V.0.1.5b` - FE Init fix

`V.0.1.5` - Major bugfix

`V.0.1.4` - updates .env on elasticsearch, service-mailer, userAuth, added dockerfiles on elasticsearch service, added login/usermanagement middleware mit route protection for BE

`V.0.1.3` - bugfixes

`V.0.1.2` - Updated editorconfig, added fp utils, bugfixes

`V.0.0.4` - Added Fe Init (angular) enviromentals, added backendservice for ng projects

`V.0.0.3a` - Added tests for handlers

`V.0.0.2` - Added Backend structure, Fe (`ng new`), mailer service

`V.0.0.1c` - added support for package installation

`V.0.0.1` - Init of projects possible
