const citacolumnDef = [
    { field: "fecha", headerName: "Fecha" },
    { field: "procedimiento", headerName: "Procedimiento" },
    { field: "doctor", headerName: "Doctor" },
    { field: "precio", headerName: "Precio" }
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