//Administrador de ingresos y gastos
let opciones;
const ingresos = [];
const egresos = [];
let detalleIngreso;
let detalleEgreso;
const usuario = (prompt("Bienvenido!\nIngrese su nombre y apellido:").toUpperCase());

class Movimiento {
    constructor(categoria, subcategoria, monto) {
        this.categoria = categoria;
        this.subcategoria = subcategoria;
        this.monto = monto;
    }
}

function menu() {
    opciones = parseInt(prompt("Hola " + usuario + "!" +
        "\nSaldo disponible: $" + suma() +
        "\n\nIngrese opcion:\n" +
        "1 - Añadir ingresos\n2 - Añadir gastos\n3 - Resumen\n4 - Eliminar registros\n5 - Salir"));

    while (opciones !== 1 && opciones !== 2 && opciones !== 3 && opciones !== 4 && opciones !== 5) {
        opciones = parseInt(prompt(usuario +
            "!\n\nVuelva a intentar:\n1 - Añadir ingresos\n2 - Añadir gastos\n3 - Resumen\n4 - Eliminar registros\n5 - Salir"));
    }

}

function suma() {
    let totalIngresos = ingresos.reduce((inicial, saldo) => inicial + saldo.monto, 0);
    let totalEgresos = egresos.reduce((inicial, saldo) => inicial + saldo.monto, 0);
    let saldoTotal = totalIngresos - totalEgresos;
    return (saldoTotal);
}

function resumen() {
    detalleIngreso = "";
    detalleEgreso = "";
    ingresos.forEach(function (ingreso) {
        detalleIngreso += ingreso.subcategoria + ": $" + ingreso.monto + "\n";
    });

    egresos.forEach(function (egreso) {
        detalleEgreso += egreso.subcategoria + ": $" + egreso.monto + "\n";
    });

    alert("Resumen: $" + suma() + "\n\nIngresos:\n" + detalleIngreso + "\nGastos:\n" + detalleEgreso);
}

function eliminarRegistro(opcionEliminar) {
    if (opcionEliminar == 1) {
        detalleIngreso = "";
        ingresos.forEach(function (ingreso) {
            detalleIngreso += ingreso.subcategoria + ": $" + ingreso.monto + "\n";
        });
        let eliminarIngreso = prompt(detalleIngreso + "\nQue registro desea eliminar?").toUpperCase();
        const index = ingresos.findIndex((ingreso) => ingreso.subcategoria == eliminarIngreso);
        if (index != -1) {
            ingresos.splice(index, 1);
            alert("Registro eliminado.");
        } else {
            alert("Registro no encontrado.");
        }

    } else if (opcionEliminar == 2) {
        detalleEgreso = "";
        egresos.forEach(function (egreso) {
            detalleEgreso += egreso.subcategoria + ": $" + egreso.monto + "\n";
        });
        let eliminarEgreso = prompt(detalleEgreso + "\nQue registro desea eliminar?").toUpperCase();
        const index = egresos.findIndex((egreso) => egreso.subcategoria == eliminarEgreso);
        if (index != -1) {
            egresos.splice(index, 1);
            alert("Registro eliminado.");
        } else {
            alert("Registro no encontrado.");
        }
    }
}

let continuar = true;
while (continuar) {
    menu();

    if (opciones == 1) {
        while (continuar) {
            const categoria = "Ingreso";
            const subcategoria = prompt(usuario + "!\n\nTipo de ingreso:").toUpperCase();
            const monto = parseFloat(prompt(usuario + "!\n\nIngrese monto:"));
            ingresos.push(new Movimiento(categoria, subcategoria, monto));
            continuar = confirm("Quiere realizar otro ingreso?");
        }
    } else if (opciones == 2) {
        while (continuar) {
            const categoria = "Egreso";
            const subcategoria = prompt(usuario + "!\n\nTipo de gasto:").toUpperCase();
            const monto = parseFloat(prompt(usuario + "!\n\nIngrese monto:"));
            egresos.push(new Movimiento(categoria, subcategoria, monto));
            continuar = confirm("Quiere realizar otro egreso?");
        }
    } else if (opciones == 3) {
        resumen();
    } else if (opciones == 4) {
        let opcionEliminar = parseInt(prompt("Que desea eliminar?\n1 - Ingreso\n2 - Egreso"));
        if (opcionEliminar != 1 && opcionEliminar != 2) {
            alert("Opcion invalida.")
        }
        eliminarRegistro(opcionEliminar);
    }
    continuar = true;

    if (opciones == 5) {
        alert("Sesion finalizada.");
        continuar = false;
    }
}