# Buscador-de-Comics

DEPLOYED: https://buscador-de-comics.netlify.app/


En este proyecto hemos realizado una aplicación que permite listar cómics y sus personaje, a la vez que obtener información sobre los mismos. Para eso hemos utilizado una API REST con datos reales, que nos ha permitido hacer consultas a la misma pasándole distintos parámetros que permitan personalizar la búsqueda y mostrar los datos obtenidos como respuesta.

Lo hemos hecho entre:

María Cecilia Teisaire: https://github.com/CeciTeser

ElianaCoria: https://github.com/ElianaCoria

Jhailing Ramos: https://github.com/Jhailing


Para Ada ITW, en el módulo en el que se evalúa Asincronismo.


La API que hemos utilizado para este proyecto es la de Marvel Cómics.


Las funcionalidades que hemos tenido que darle han sido las siguientes:


•	Se debe poder realizar una búsqueda de cómics
  o	Se debe poder realizar una búsqueda por título
  o	Se debe poder ordenar los resultados alfabéticamente y por fecha de lanzamiento, en orden ascendente y descendente
  
  
•	Se debe poder realizar una búsqueda de personajes de cómics
  o	Se debe poder realizar una búsqueda por nombre
  o	Se debe poder ordenar los resultados alfabéticamente, en orden ascendente y descendente
  
  
•	Se debe mostrar la información de un cómic (al clickear sobre el mismo)
  o	Portada
  o	Título
  o	Fecha de lanzamiento
  o	Guionistas
  o	Descripción
  o	Personajes incluidos
  

•	Se debe mostrar la información de un personaje (al clickear sobre el mismo)
  o	Imagen
  o	Nombre
  o	Descripción
  o	Cómics en los que aparece

•	Se debe mostrar el total de resultados en los casos en los que se listen cómics o personajes


•	Debe contar con un paginado
  o	Se debe mostrar 20 resultados por página
  o	Se debe poder ir a la primera página
  o	Se debe poder ir a la última página
  o	Se debe poder ir a la página siguiente
  o	Se debe poder ir a la página anterior
  o	Se deben deshabilitar los botones correspondientes cuando no puedan ser utilizados (por ejemplo, si se está en la última página, no se debe poder utilizar el botón de ir a la última página ni el de avanzar página)
  
  

Desafíos extra opcionales que hemos realizado 


•	Agregar la cantidad de páginas y la página actual en el paginado

•	Agregar la posibilidad de ir a una página específica

•	Cuando se realiza una búsqueda de cómics o personajes, y luego se clickea en uno para ver los detalles, perdemos la búsqueda realizada y la página en la que estábamos

. Agregar un botón que permita ir a la página exacta de la última búsqueda realizada.

•	Agregar modo oscuro

•	Cambio de la imagen de Header dependiendo si has seleccionado un Comic o un Personaje

