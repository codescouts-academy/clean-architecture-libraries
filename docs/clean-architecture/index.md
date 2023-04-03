# Clean Architecture

La capas no es un concepto novedoso. Ha existido en la industria durante más de un par de años (algunos de ustedes que leen este documento son probablemente más jóvenes que las capas) y es uno de los primeros estilos arquitectónicos creados. En resumen, las capas no son más que dividir las responsabilidades de su aplicación en diferentes capas, donde las capas superiores pueden hablar con las capas inferiores, pero no al revés.

Las capas interactúan a través de fachadas, por lo que una capa no tiene que saber nada sobre los detalles de implementación interna de otras capas.

Traducir esto en una aplicación React, lo que haremos es tener una capa de UI donde vivirán los componentes con la reactividad propia de React, donde escribiremos componentes de react con _nada_ de lógica de negocio. Detras de esta capa tendremos una capa de aplicación donde modelaremos los casos de uso de la aplicación, aquí comenzaremos a interactuar con nuestra lógica de negocio, y por último tendremos nuestra capa de dominio, donde aquí estará lo más importante de nuestra aplicación, porque esta capa _no_ deberá tener ningún tipo de dependencias externas.

Para una pequeña aplicación, tal vez tener una capa de ui y otra de domino o view model alcanzará, y probablemente es cómo hemos estado escribiendo aplicaciones React durante mucho tiempo. Pero a medida que crecen las aplicaciones, estas capas siguen siendo más gruesas y comienzan a hacer demasiado, lo que hace que sean más difíciles de razonar.

Antes de continuar, me gustaría hablar un poco acerca de los beneficios de separar en capas nuestro proyecto.

### **Facilidad de razonamiento**

Divide y conquista: la mejor manera de resolver un gran problema es dividirlo en problemas más pequeños que son más fáciles de resolver. Podemos razonar sobre una capa de forma independiente sin preocuparnos por la implementación de otras capas.

### **Sustitución**

Las capas se pueden sustituir fácilmente con implementaciones alternativas. No es como si estuviéramos cambiando nuestra biblioteca HTTP todos los días, pero cuando llega el momento, el cambio se autónomo dentro de una capa y nunca debe filtrarse fuera de los límites de la capa. La refactorización se vuelve más fácil y menos intrusiva.

### **Evolución**

Las arquitecturas que escala deben tener la capacidad de evolucionar a medida que el software madura y los requisitos cambian. Aunque nos gusta hacer algo de diseño por adelantado, hay cosas que solo aparecerán después de que comience el desarrollo. Al usar capas, podemos retrasar las decisiones sobre los detalles de implementación hasta que tengamos suficiente información para tomar una decisión sensata.

### **Desacoplamiento**

Las dependencias entre capas se controlan ya que son unidireccional. Apuntar a un bajo acoplamiento (mientras se mantiene una alta cohesión) es una buena manera de evitar que nuestra aplicación se convierta en una gran bola de barro.

### **Testability**

Tener una arquitectura en capas permite probar cada componente de forma aislada y fácil. Aunque esto es bueno, en mi opinión no es el mayor beneficio en términos de prueba. Para mí, el mayor beneficio de las arquitecturas en capas es que es más fácil escribir pruebas mientras trabajas en el código. Dado que cada capa debe tener una responsabilidad bien definida, es más fácil pensar en lo que vale la pena probar durante la implementación.

Todas las cosas mencionadas anteriormente nos ayudan a escribir un código que es más fácil de mantener. Una base de código mantenible nos hace más productivos, ya que pasamos menos tiempo luchando contra la deuda técnica y más tiempo trabajando en nuevas características. También reduce el riesgo al introducir cambios. Por último, pero no menos importante, hace que nuestro código sea más fácil de probar, lo que en última instancia nos da más confianza durante el desarrollo y la refactorización.

Ahora que conocemos los beneficios de las capas y las arquitecturas en capas, hablemos sobre qué tipo de arquitectura en capas estamos proponiendo para una gran aplicación React.

# **CLEAN architecture**

![Untitled](layers-diagram.png)

La arquitectura limpia es un tipo de arquitectura en capas compuesta por varias ideas de otras arquitecturas en capas, como arquitectura de cebolla, arquitectura hexagonal y arquitectura de puertos y adaptadores, entre otros.

La idea central detrás de Clean es poner el negocio y las entidades de negocio en el centro de nuestra aplicación. Las capas externas son menos específicas para el negocio, mientras que las capas internas tienen que ver con el negocio.

Describiremos brevemente lo que cada capa hace en arquitectura limpia, para comprender cómo podemos aprovechar algunos de estos conceptos en nuestras aplicaciones React.

Pero antes me gustaría comentar el tipo de relación que habrá entre la vista y los uses cases; Para ello nos basaremos en la estructura MVVM Model-View-ViewModel.

Esta estructura es muy facil de entender, La vista simplemente se encarga de presentar la información resibida por el ViewModel, El ViewModel es el principal responsable de definir la lógica de presentación y el manejo del estado interno de esta vista, y dialogar con el Modelo, donde allí se encontrará la lógica de negocio.

![Untitled](mvvm.jpg)

Arquitectura limpia, un diagrama

![Untitled](clean-architecture.jpg)

### **Entities**

En el centro del diagrama tenemos entidades.En la arquitectura limpia clásica, las entidades son una media de contener el estado relacionado con las reglas de negocio. Las entidades deben ser estructuras de datos simples y no tener conocimiento de nuestro framework o librería de UI.

Para una aplicación frontend, aquí es donde tenemos la lógica relacionada con las entidades de nuestro sistema.

### **Use Cases**

Los casos de uso están cerca de las historias de usuarios en terminología ágil. Aquí es donde viven las reglas del negocio de la aplicación. Un caso de uso debe representar algo que un usuario quiere lograr. Los casos de uso deben tener todo el código para que eso suceda de una manera que tenga sentido para la aplicación. Observe que los casos de uso solo pueden depender de las capas internas, por lo que para que las cosas ocurran dentro de un caso de uso (digamos que haga una solicitud HTTP) tenemos que inyectar dependencias en nuestro caso de uso y aplicar _inversión de control_.

### **Controllers / Presenters / Gateways**

Esta capa contiene código de nuestro framework o librería que implementa los casos de uso. Por lo general, la capa de UI llamaría los métodos expuestos por los controladores o presentadores.

### **Framework & Drivers**

La capa más externa es donde están contenidas todas las operaciones de IO. Entrada del usuario, conexiones HTTP, lectura de un almacenamiento web, etc. Aquí es donde vive nuestro framework de la interfaz de usuario.

Vale la pena señalar que, como cualquier otra arquitectura en capas, podemos agregar tantas capas como sea necesario. Aunque cuanto más simple, mejor!.

## **References**

-   Martin Fowler -- Catalog of Patterns of Enterprise Application Architecture<https://martinfowler.com/eaaCatalog/domainModel.html>
-   Denis Brandi -- Why you need use cases interactors<https://proandroiddev.com/why-you-need-use-cases-interactors-142e8a6fe576>
-   Bob Martin -- The Clean Architecture<https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html>
-   Daniel Mackay -- Clean Architecture, an introduction<https://www.dandoescode.com/blog/clean-architecture-an-introduction/>
-   CodingWithMitch -- 2 Key Concepts of Clean Architecture<https://www.youtube.com/watch?v=NyJLw3sc17M>
-   Frank Bos and Fouad Astitou -- Fuck CLEAN Architecture<https://www.youtube.com/watch?v=zkmcy9WQqUE>
-   Ian Cooper, The Clean Architecture<https://www.youtube.com/watch?v=SxJPQ5qXisw>
