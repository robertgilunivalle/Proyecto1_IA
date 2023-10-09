# Bombero inteligente

Proyecto de la asignatura de **Inteligencia Artificial**, séptimo semestre de Ingenieria de Sistemas en la Universidad del Valle.

Consiste en una matriz de juego donde un agente inteligente tiene como objetivo llegar a la meta evitando obstáculos y haciendo misiones.

## Algoritmos de búsqueda

El agente inteligente encuentra la meta usando los siguientes algoritmos de búsqueda:

1. Búsquedas no informadas:

- Preferente por amplitud.
- Preferente por profundidad evitando ciclos.
- De costo uniforme.

2. Búsquedas informadas:

- Avara.
- A\*.

## Especificaciones

### Problema del bombero inteligente

- consiste en un agente que se encarga de apagar dos puntos de fuego en un mundo donde se cuenta con dos cubetas 

- una de 1 litro y la otra de 2 litros, y un solo hidrante. Se puede suponer que cada punto de fuego se apaga con un litro de agua. 

- El bombero debe inicialmente encontrar una de las dos cubetas, luego dirigirse al hidrante, y finalmente proceder a encontrar los puntos de fuego. 

- En caso de que haya tomado la cubeta de un solo litro deberá recargarla nuevamente. 

- El bombero no puede tomar las dos cubetas.

- Tenga en cuenta que si el agente pasa sobre un punto de fuego teniendo agua, éste se apagará automáticamente, es decir, no se puede decidir entre utilizar el agua o conservarla. Además, el agente
no puede pasar por un punto de fuego si no lleva agua. 

- En cada exploración el agente podrá realizar desplazamientos simples como moverse arriba, abajo, izquierda, y derecha. 

- El costo de cada movimiento realizado por el agente cuando no lleva ningún suministro de agua es de **1**. 

- Llevar una cubeta vacía no tiene costo adicional. Sin embargo, cuando se lleva agua en una cubeta, el costo de cada movimiento se aumenta en 1 por cada litro de agua. Por lo tanto, si el agente lleva la cubeta de 1 litro con agua, el costo de cada movimiento será de 2, si lleva la cubeta de 2 litros con un litro de agua el costo de cada movimiento será de 2, y si lleva la cubeta de 2 litros con dos litros de agua el costo será de 3. 

- Al llegar a un hidrante las cubetas se llenan automáticamente. Sin embargo, la cubeta de dos litros no se vuelve a recargar si se pasa nuevamente por el hidrante. 

- La búsqueda termina cuando se apaguen los dos puntos de fuego. 

## Como usar la aplicación

Estando en la interfaz de juego, se te pedirá seleccionar un archivo de texto para cargar una matriz.

Ejemplo:

0 0 0 1 1 0 0 0 0 0 <br> 0 1 0 1 1 0 1 1 1 1 <br> 0 1 0 2 0 0 0 0 0 1 <br> 0 1 0 1 1 1 1 1 0 0 <br> 5 0 0 6 4 0 0 1 0 1 <br> 0 1 1 1 1 1 0 1 0 1 <br> 3 0 0 0 2 0 0 1 0 1 <br> 0 1 0 1 1 1 1 1 0 1 <br> 0 1 0 0 0 0 0 1 0 1 <br> 0 1 0 1 1 1 0 0 0 0 <br>

Donde los números representan:

0 = Si es una casilla libre. <br> 1 = Si es un obstáculo. <br> 2 = Si es un punto de fuego. <br> 3 = Si es la cubeta de un litro. <br> 4 = Si es la cubeta de dos litros. <br> 5 = Si es el punto de inicio. <br> 6 = Si es el hidrante. <br>

## Ejecución de la aplicación

Para ejecutar el código:

1. Descargar el código fuente.
2. Acceder a la carpeta raíz.
3. Tener instalado:
   - nodejs
   - yarn
4. Ejecutar los siguientes comandos:
   - `yarn`
   - `yarn dev`

> Ahora la aplicación se estará ejecutando en `http://127.0.0.1:5173`

### Encontrarás mas ejemplos en:

> `src/games`
