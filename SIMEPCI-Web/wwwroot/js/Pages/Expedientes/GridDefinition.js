const notasMedicasColumnDef = [
    { field: "contenido", headerName: "Nota medica" },
    { field: "fechaEmision", headerName: "Fecha del registro" }
];
const notasEnfermeriaColumnDef = [
    { field: "contenido", headerName: "Nota de enfermería" },
    { field: "fechaEmision", headerName: "Fecha del registro" }
];
const historialMedicoColumnDef = [
    { field: "contenido", headerName: "Antecedentes medicos" },
    { field: "fechaEmision", headerName: "Fecha del registro" }
];
const citasColumnDef = [
    { field: "especialidad", headerName: "Especialidad medica" },
    { field: "doctor", headerName: "Medico" },
    { field: "precio", headerName: "Precio" },
    { field: "fecha", headerName: "Fecha de la cita" }
];
const examenesColumnDef = [
    { field: "nombreTipoExamenMedico", headerName: "Tipo de examen" },
    { field: "objetivo", headerName: "Motivo del examen" },
    { field: "resultado", headerName: "Resultado" }
];



const citaGridOptions = {
    columnDefs: citacolumnDef,
    rowData: [],
    rowSelection: 'single',

    defaultColDef: { sortable: true, filter: true }
};

document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#myGridCitas');
    new agGrid.Grid(gridDiv, citaGridOptions);
});