## Installation
***
A little intro about the installation. 
Instalar de internet, node.js https://nodejs.org/es/download/
Luego clonar o descargar documentos github.
Primero conectar backend y luego frontend.
Entrar en esa carpeta y abrir un editor ahi, puede ser visual code.
## For the backend
```

$ cd YourPizzaBros3
$ npm init -y
$ npm install firebase nodemon express cors
$ nodemon index.js
```


## For the frontend
Volver una carpeta, un nivel dentro de PizzaBros-FrontEnd
```
$ cd PizzaBrosFE
$ npm update
$ npm install -g typescript
$ npm install -g @angular/cli
$ npm update
$ ng serve
$ npm install bootstrap jquery @popperjs/core
```
En el PizzaBrosFE/angular.json cambiar las líneas 35-43 cambiar a:
```json
      "styles": [
        "node_modules/bootstrap/dist/css/bootstrap.min.css", 
        "src/styles.css"
      ],
      "scripts": [
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/@popperjs/core/dist/umd/popper.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.min.js"
      ]
```
