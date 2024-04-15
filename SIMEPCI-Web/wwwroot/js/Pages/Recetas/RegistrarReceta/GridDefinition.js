const columnDefinition = [
    { field: "nombre", headerName: "Nombre" },
    { field: "primerApellido", headerName: "Apellido" },
    { field: "cedula", headerName: "Cedula" }
];

const gridOptions = {
    columnDefs: columnDefinition,
    rowData: [],
    rowSelection: 'single',

    defaultColDef: { sortable: true, filter: true },

    onRowDoubleClicked: params => {
        ProcessDoubleClick(params);
    }
}

function ProcessDoubleClick(params) {
    var view = new RegistarReceta();
    view.ElegirPaciente(params.data.id);
}


document.addEventListener('DOMContentLoaded', () => {
    const gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
});