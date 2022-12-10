export type RootStackParam ={
    CrearCuenta : undefined;
    InicioSesion:undefined;
    Principal : undefined;
    Tratos: undefined;
    Menu: {usuario: string};
    Perfil:undefined;
    Detalles: undefined;
    Prueba: undefined;
    Articulos: {usuario: string};
    MisArticulos: {usuario: string};
    CrearArticulo: {usuario: string};
    DetalleArticulo: {idArticulo:string, usuario: string};
    CrearTrato: {idArticulo:string, usuario: string};
    DetalleVendedor: {usuario: string}
}