const citacolumnDef = [
    { field: "fecha", headerName: "Fecha y hora" },
    { field: "especialidad", headerName: "Servicio utilizado" },
    { field: "doctor", headerName: "Especialista" },
    { field: "precio", headerName: "Precio final" }
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