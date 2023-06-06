## Requerimientos

Para comenzar la instalación requeriremos los siguientes elementos:

- NodeJS v16.17.0^
- Docker o XAMPP o Alguna entidad que nos permita ejecutar un servidor de MySQL.

## Instalación

1. Clonar el repositorio `git clone https://github.com/rbmsistemas/guardian_back.git`
2. Ingresar a la carpeta del repositorio `cd guardian_back`
3. Instalar dependencias `npm i`
4. Crear una copia del archivo .example.env con el siguiente comando `cp .example.env .env` o solo duplicarlo y renombrarlo.

Nota: para fines de `Development` favor de no alterar los valores del archivo .env, en caso de hacerse, corrija los siguientes pasos con la información que usted haya proporcionado.

## Base de datos

Para crear nuestra base de datos se explicara a través de Docker.

1. Inicializar Docker
2. Abrir una terminal
3. Ejecutar el siguiente comando `docker run --name guardian -e MYSQL_ROOT_PASSWORD=guardian -e MYSQL_DATABASE=guardian -p 3306:3306 -d mysql`

Nota: en caso de usar algún otro tipo de entidad para tener su base de datos como XAMPP o WAMPP solo se deberá crear la base de datos y con los siguientes valores:

- `database: guardian `
- `user: root`
- `password: guardian `

## Ejecución

Para ejecutar el proyecto se deberá tener en cuenta el tipo de ambiente en el que se este trabajando.

### Dev

`npm run dev`

### Prod

`npm run prod`

## Consideraciones

Antes de comenzar a trabajar y crear una `Branch` es necesario verificar que tengamos instalada la ultima versión del proyecto asi como sus dependencias y migraciones actualizadas.

Realizar los siguientes pasos:

- `git fetch`
- `npm install`
- `npx sequelize-cli db:migrate`

## `Sequelize`

Para poder ejecutar los siguientes comandos deberemos tener ejecutado nuestro servidor en alguno de los ambientes anteriormente mencionados.

- Correr migraciones (actualizar base de datos):
  `npx sequelize-cli db:migrate` o `npm run migrate:up`
- Retroceder una migración (retroceder una version atras en la base de datos):
  `npx sequelize-cli db:migrate:undo` o `npm run migrate:undo`
- Retroceder una migración todas las migraciones (borrar toda la base de datos):
  `npx sequelize-cli db:migrate:undo:all` o `npm run migrate:undo:all`
- Crear migración (remplazar los valores):
  `npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string,phone:string,photo:text`

## Modelos

### Agregar modelos

Después de crear una migración y su modelo se requerirá añadir su modelo a la lista de modelos exportables que se encuentra en el `index` de la carpeta `src/models`.

1. Importar el modelo
   `import Ejemplo from "./ejemplo.js";`
2. Añadir el modelo
   ` models.ejemplo = Ejemplo(sequelize, Sequelize.DataTypes);`

Remplazando "ejemplo" por los valores de tu modelo.

### Usar modelos

Para importar el modelo en nuestro controlador deberemos crear una instancia del archivo index con el nombre `db` del cual extraeremos el modelo que requiramos.

1. Importar
   `import db from "../models/index.js`
2. Usar
   `const ejemplo =  db.ejemplo`

Nota: El objeto `db` contiene todos los modelos existentes.

### Crear Seeder

`npx sequelize-cli seed:generate --name demo-user`
`npx sequelize-cli db:seed:all`
`npx sequelize-cli db:seed:undo`
`npm run seed` correr los seeders
