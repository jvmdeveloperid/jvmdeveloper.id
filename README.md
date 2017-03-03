# JVMDeveloper.id Website

Website for JVMDeveloper.id. Readme will be updated accordingly.

## Pre Requirement

You must have:

* NodeJS version `6.9.0+`
* Bower
* Polymer-CLI

Download NodeJS at [nodejs.org](https://nodejs.org). Bower and polymer-cli
can be install with:

```
$ npm install -g bower
$ npm install -g polymer-cli
```

### Running Website Locally

This command serves the app at `http://localhost:8080` and provides basic URL
routing for the app:

    polymer serve --open

### Build

This command performs HTML, CSS, and JS minification on the application
dependencies, and generates a service-worker.js file with code to pre-cache the
dependencies based on the entrypoint and fragments specified in `polymer.json`.
The minified files are output to the `build/unbundled` folder, and are suitable
for serving from a HTTP/2+Push compatible server.

In addition the command also creates a fallback `build/bundled` folder,
generated using fragment bundling, suitable for serving from non
H2/push-compatible servers or to clients that do not support H2/Push.

    polymer build

### Preview the build

This command serves the minified version of the app at `http://localhost:8080`
in an unbundled state, as it would be served by a push-compatible server:

    polymer serve build/unbundled

This command serves the minified version of the app at `http://localhost:8080`
generated using fragment bundling:

    polymer serve build/bundled

### Finalize Build for Deployment

TBD (build script needs to be created)
