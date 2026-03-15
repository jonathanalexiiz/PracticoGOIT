import TasksManager from '@/components/tasks/TasksManager';

export default function TaskPage() {
  return (
    <TasksManager
      tituloFormularioNuevo="Nueva tarea"
      tituloFormularioEditar="Editar tarea"
      subtituloFormulario="Crea, edita y organiza tus tareas por proyecto."
      tituloListado="Mis tareas"
      subtituloListado="Filtra y administra tus tareas por estado y prioridad."
      textoCargando="Cargando tareas..."
      textoVacio="No hay tareas para mostrar."
      textoCrear="Crear tarea"
      textoActualizar="Actualizar tarea"
      textoGuardando="Guardando..."
      textoCancelar="Cancelar edición"
      textoEditar="Editar"
      textoEliminar="Eliminar"
      textoCambioRapidoEstado="Cambio rápido de estado"
      textoFiltroEstado="Filtrar por estado"
      textoFiltroPrioridad="Filtrar por prioridad"
      textoErrorCargarProyectos="Error al cargar proyectos"
      textoErrorCargarTareas="Error al cargar tareas"
      textoErrorGuardar="Error al guardar tarea"
      textoErrorEliminar="Error al eliminar tarea"
      textoErrorActualizarEstado="Error al actualizar estado"
      textoErrorTituloObligatorio="El título de la tarea es obligatorio"
      textoErrorProyectoObligatorio="Debes seleccionar un proyecto"
      textoConfirmacionEliminar="¿Seguro que deseas eliminar esta tarea?"
      textoProyectoSinDisponibles="No hay proyectos disponibles"
      textoSeleccionarProyecto="Selecciona un proyecto"
    />
  );
}