# Distribution
This library is a ES module also distributed as a CommonJS module, UMD module and a compiled script for browsers. It works out of the box in Node when installed with ```npm install riff-chunks```.

## If you are using this lib in a browser:

You may load both **./dist/riff-chunks.umd.js** and **./dist/riff-chunks.min.js** in the browser with ```<script>``` tags. Ideally you should use **riff-chunks.min.js**. You can load it via the https://unpkg.com and https://www.jsdelivr.com/ CDNs:

[unpkg](https://unpkg.com/riff-chunks):
```html
<script src="https://unpkg.com/riff-chunks"></script>
```

[jsDelivr](https://cdn.jsdelivr.net/npm/riff-chunks):
```html
<script src="https://cdn.jsdelivr.net/npm/riff-chunks"></script>
```

## If you are using this lib as a dependency:

- The **CommonJS** dist is **./dist/riff-chunks.cjs.js**. It is the dist file used by Node. It is served in the "main" field of package.json and is the source you are running when you **npm install riff-chunks**. It is not compiled or minified.

- The **UMD** module is **./dist/riff-chunks.umd.js**. It is transpiled to ES5 and compatible with Node, AMD and browsers. It is served in the "browser" field of package.json.

- The **browser-only** dist is **./dist/riff-chunks.min.js**. It is transpiled to ES5 and compiled. It is used in the "unpkg" and "jsdelivr" fields of package.json.

- The **ES6 bundle** is **./dist/riff-chunks.js**, served as "es2015" in package.json. It is not compiled/minified.

- **./main.js** is served as "module" in package.json. This should be the entry point for bundlers.

If your module bundler is using "browser" as the entry point **your dist should work the same** but will be a larger file.
