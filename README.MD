1. Webpack.config._[develop environment]_.js
   => option: Config multiple output using filemanager-webpack-plugin npm
   new FileManagerPlugin({
   events: {
   onEnd: {
   copy: [
   {
   // **** Input file that you want to compile
   source: "./src/models/*.ts*",
   // **** Output file that you want to get
   destination: "./build/production/models/",
   // **** Here are some option you can config - Reference: https://github.com/gregnfilemanager-webpack-plugin
   globOptions: {
   ignore: "./src/models/index.ts",
   },
   },
   ],
   },
   },
   }),
