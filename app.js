$(document).ready(function () {
  let edit = false; // cuando un usuario de un click en el elemento a editar cambiará a 'true'
  console.log("jQuery is Working");
  $("#task-result").hide(); // lo ocultamos al iniciar la app
  // fetchTasks();

  // busca la tarea desde el 'search' y lo muestra
  $("#search").keyup(() => { 
    if ($("#search").val()) { // si se obtiene el valor del search realiza la búsqueda (así si le damos al delete no muestra errores)
      let search = $("#search").val(); // obtenemos el valor que se escriba en el 'search'
      $.ajax({
        type: "POST",
        url: "task-search.php",
        data: { search },
        success: (response) => {
          let tasks = JSON.parse(response); // toma un JSON convertido en string y lo vuelve a convertir en JSON
          let template = "";

          tasks.forEach((task) => { // recorre las tareas y cada vez que las recorras obtiene una tarea, y se muestra
            template += `<li>
            ${task.name} 
            </li>`;
          });

          $("#container").html(template); // selecciona el elemento con id container y llenalo con 'template'
          $("#task-result").show(); // lo mostramos
        },
      });
    }
  });

  // envía la nueva tarea, y la guarda en la base de datos
  $("#task-form").submit((e) => {
    e.preventDefault();
    const postData = {
      name: $("#name").val(),
      description: $("#description").val(),
      id: $("#task-id").val(),
    };

    // comprueba si está editando o agregando
    let url = edit === false ? "task-add.php" : "task-edit.php"; 

    $.post(url, postData, (response) => { // recibe la respuesta del servidor y lo muestra por consola
      console.log(response);
      fetchTasks(response); // agrega automaticamente la tarea a la tabla tras crearla
      $("#task-form").trigger("reset"); // reset del formulario al enviar
    });
  });


  // obtener tareas
  function fetchTasks() {
    $.ajax({
      type: "GET",
      url: "task-list.php",
      success: (response) => {
        let tasks = JSON.parse(response);
        let template = "";

        tasks.forEach((task) => { // recorre las tareas y las va listando en la tabla
          template += `
                    <tr taskId="${task.id}">
                        <td>${task.id}</td>
                        <td>
                          <a href="#" class="task-item">${task.name}</a>
                        </td>
                        <td>${task.description}</td>
                        <td>
                            <button class="task-delete btn btn-danger">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
        });
        $("#tasks").html(template);
      },
    });
  }
  fetchTasks();

  // borra una tarea
  $(document).on("click", ".task-delete", () => { // recoge el evento click del document de los elementos con la clase 'task-delete' y ejecuta una función
    if (confirm("are u sure u want to delete it?")) {
      let element = $(this)[0].activeElement.parentElement.parentElement; // $(this) recoge el elemento clickeado. el boton tiene un padre (td) y este otro padre que es la fila. tenemos que acceder a su elemento padre
      let id = $(element).attr("taskId"); // busca el elemento con el atributo taskId
      $.post("task-delete.php", { id }, (response) => { // enviamos los datos al backend y lo mostramos
        fetchTasks(response);
      });
    }
  });

  // obtener y mostrar la tarea a modificar
  $(document).on("click", ".task-item", () => {
    let element = $(this)[0].activeElement.parentElement.parentElement;
    let id = $(element).attr("taskId");
    // console.log(id);
    $.post("task-single.php", { id }, (response) => {
      // console.log(response);
      let task = JSON.parse(response);
      $("#name").val(task.name);
      $("#description").val(task.description);
      $("#task-id").val(task.id); // rellenamos el input oculto con el id de la tarea
      edit = true;
    });
  });
});
