import React, { useState, useEffect } from "react";
import axios from "axios";
import Alerta from "../alerta";
import { message } from "antd";

export const DataContext = React.createContext();

const DataProvider = (props) => {
  /** esto se debe poner en un archivo de configuracion */
  const URL = "http://45.82.72.196:8085/";

  // const [logeado, setLogeado] = useState(false);
  const [logeado, setLogeado] = useState(false);
  const [visibleModal, setVisibleModal] = useState({ visible: false });

  const [visibleLoading, setVisibleLoading] = useState(false);
  const [columnasPedidos, setcolumnasPedidos] = useState(null);
  const [dataPedidos, setDataPedidos] = useState(null);
  const [visibleDetalle, setVisibleDetalle] = useState(false);

  const [dataPedidoEditar, setDataPedidoEditar] = useState(null);
  const [datosCliente, setDatosCliente] = useState(null);
  const [datosArticulo, setDatosArticulo] = useState(null);
  const [
    columnasPedidosModaldetalle,
    setcolumnasPedidosModaldetalle,
  ] = useState(null);
  const [visibleModalConfirmacion, setVisibleModalConfirmacion] = useState(
    false
  );

  const [
    visibleModalConfirmacionItemFactura,
    setVisibleModalConfirmacionItemFactura,
  ] = useState(false);
  const [dataModalEditar, setDataModalEditar] = useState(null);
  const [mensajeModal, setMensajeModal] = useState("");
  const [borrar, setBorrar] = useState(null);
  const [columnasDataFactura, setColumnasDataFactura] = useState(null);
  const [productosData, setProductosData] = useState([]);
  const [nombresData, setNombresData] = useState(null);
  const [dataTablaProducto, setDataTablaProducto] = useState(null);
  const [editar, setEditar] = useState(null);

  //Inicia al arrancar las validaciones
  useEffect(() => {
    validarSession();
  }, []);

  /// eliminar este codigo cuando se haga la busqueda de nombres desde la db
  useEffect(() => {
    try {
      getNombresData();
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   *se encarga de validar credenciales y enviar token para consultas posteriores
   * @param {{usuario, password}} datos
   * @param {props} props
   */
  const mtdLogin = async (datos, props) => {
    if (datos !== undefined && datos !== null) {
      setVisibleLoading(true);

      try {
        const json = await axios.post(URL + "usuario/login", datos);
        const data = json.data;
        if (json.status === 200) {
          setVisibleLoading(false);
          setLogeado(true);
          localStorage.setItem("usuarioSesion", JSON.stringify(true));
          localStorage.setItem("token", JSON.stringify(data.autorization_key));
          const userName = data.nombre;
          localStorage.setItem("usuarioNombre", JSON.stringify(userName));
          cargarParametros();
          setVisibleLoading(false);
          setVisibleModal({
            visible: true,
            tipo: "SUCCESS",
            colorFondoBtn: '#52c41a"',
            colorText: "black",
            mensaje: `Logeando como: ${userName}`,
            titulo: "Bienvenido!",
            link: "",
          });
          props.history.push("/pedidos");
        } else if (json.status === 201) {
          setVisibleLoading(false);
          setVisibleModal({
            visible: true,
            tipo: "WARNING",
            colorText: "white",
            colorFondoBtn: "#faab02",
            mensaje: `Usuario y/o Contraseña Incorrectos`,
            titulo: "Error al Ingresar!",
            link: "",
          });
        }
      } catch (e) {
        setVisibleLoading(false);
        setVisibleModal({
          visible: true,
          tipo: "ERROR",
          colorFondoBtn: "#fa0202",
          colorText: "black",
          mensaje: `No se ha obtenido una respuesta desde el servidor `,
          titulo: "Error de conexion",
          link: "",
        });
        console.error(e);
      }
    }
  };
  /**
   * se encarga de cargar los parametros usados en la aplicacion
   */
  const cargarParametros = async () => {};

  /**
   * valida el inicio de session con base al token local
   */
  const validarSession = async () => {
    setVisibleLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const json = await axios.get(URL + "usuario/validartoken", {
          headers: { authorization: token },
        });
        if (json.status === 200) {
          setVisibleLoading(false);
          setLogeado(true);
          cargarParametros();
          setVisibleLoading(false);
          return;
        } else if (json.status === 401) {
          localStorage.clear();
          setVisibleLoading(false);
          setVisibleModal({
            visible: true,
            tipo: "WARNING",
            colorText: "white",
            colorFondoBtn: "#faab02",
            mensaje: `Token ha Caducado, Ingrese Nuevamente`,
            titulo: "Error al Ingresar!",
            link: "",
          });
        }
      } catch (e) {
        setVisibleLoading(false);
        setVisibleModal({
          visible: true,
          tipo: "ERROR",
          colorFondoBtn: "#fa0202",
          colorText: "black",
          mensaje: `Error De Seguridad`,
          titulo: "Error de conexion",
          link: "",
        });
        localStorage.clear();
        console.error(e);
      }
    } else {
      setVisibleLoading(false);
      localStorage.clear();
    }
  };

  /**
   * Datos para consulta de ordenes de pedido
   * @param {{buscar,estado,fechas,tipo}} values
   */
  const onFinish = async (values) => {
    const token = localStorage.getItem("token");
    setVisibleLoading(true);
    if (token) {
      try {
        const json = await axios.get(URL + "ordenes/consultar", {
          headers: { authorization: token },
          params: values,
        });

        if (json.status === 200) {
          llenarEncabezado();
          setDataPedidos(json.data);
        } else if (json.status === 201) {
          setVisibleLoading(false);
          setVisibleModal({
            visible: true,
            tipo: "WARNING",
            colorText: "white",
            colorFondoBtn: "#faab02",
            mensaje: `No hay datos para mostrar`,
            titulo: "Sin Datos",
            link: "",
          });
        }
      } catch (e) {
        setVisibleLoading(false);
        setVisibleModal({
          visible: true,
          tipo: "ERROR",
          colorFondoBtn: "#fa0202",
          colorText: "black",
          mensaje: `Error De Seguridad`,
          titulo: "Error de conexion",
          link: "",
        });
        console.error(e);
      }
    } else {
      setVisibleModal({
        visible: true,
        tipo: "ERROR",
        colorFondoBtn: "#fa0202",
        colorText: "black",
        mensaje: `No se encontro validación o ha cadudado. Intentelo nuevamente`,
        titulo: "Error de Seguridad",
        link: "",
      });
      setVisibleLoading(false);
      localStorage.clear();
    }
    setVisibleLoading(false);
  };

  /**
   * Se encarga de consultar el ariculo por le codigo exacto
   * @param {String} codigo
   */
  const consultarArticuloCodigo = async (codigo) => {
    const token = localStorage.getItem("token");
    setVisibleLoading(true);
    try {
      const json = await axios.get(
        URL + "articulos/consultar/codigo/" + codigo,
        {
          headers: { authorization: token },
        }
      );

      if (json.status === 200) {
        setVisibleLoading(false);
        setDatosArticulo(json.data);
        return true;
      } else {
        setVisibleLoading(false);
        setDatosArticulo({});
        setVisibleModal({
          visible: true,
          tipo: "WARNING",
          colorText: "white",
          colorFondoBtn: "#faab02",
          mensaje: `Articulo '` + codigo + "' no encontrado",
          titulo: "Error artículo",
          link: "",
        });

        return false;
      }
    } catch (e) {
      setVisibleLoading(false);
      console.log(e);

      return false;
    }
  };

  /**
   * Se encarga de consultar el ariculo por le codigo exacto
   * @param {String} codigo
   */
  const consultarClienteCodigo = async (codigo) => {
    const token = localStorage.getItem("token");
    setVisibleLoading(true);
    try {
      const json = await axios.get(
        URL + "clientes/consultar/documento/" + codigo,
        {
          headers: { authorization: token },
        }
      );

      if (json.status === 200) {
        setVisibleLoading(false);
        setDatosCliente(json.data);
        return true;
      } else {
        setVisibleLoading(false);
        setDatosCliente({});
        setVisibleModal({
          visible: true,
          tipo: "WARNING",
          colorText: "white",
          colorFondoBtn: "#faab02",
          mensaje: `Cliente '` + codigo + "' no encontrado",
          titulo: "Error cliente",
          link: "",
        });

        return false;
      }
    } catch (e) {
      setVisibleLoading(false);
      console.log(e);

      return false;
    }
  };

  /**
   * Se encarga de consultar el ariculo por le coincidencia en nombre
   * @param {String} nombre
   */
  const cosultarArticuloNombre = async (nombre) => {
    const token = localStorage.getItem("token");

    try {
      const json = await axios.get(
        URL + "articulos/consultar/nombre/" + nombre,
        {
          headers: { authorization: token },
        }
      );

      if (json.status === 200) {
        setProductosData(json.data);
        return true;
      } else {
        setProductosData([]);
        setVisibleModal({
          visible: true,
          tipo: "WARNING",
          colorText: "white",
          colorFondoBtn: "#faab02",
          mensaje: "Sin coincidencias para " + nombre,
          titulo: "Error artículo",
          link: "",
        });

        return false;
      }
    } catch (e) {
      console.log(e);

      return false;
    }
  };

  /**
   * Se encarga de consultar el ariculo por le coincidencia en nombre
   * @param {String} nombre
   */
  const cosultarClienteNombre = async (nombre) => {
    const token = localStorage.getItem("token");
    try {
      const json = await axios.get(
        URL + "clientes/consultar/nombre/" + nombre,
        {
          headers: { authorization: token },
        }
      );

      if (json.status === 200) {
        setDatosCliente(json.data);
        return true;
      } else {
        setDatosCliente([]);
        setVisibleModal({
          visible: true,
          tipo: "WARNING",
          colorText: "white",
          colorFondoBtn: "#faab02",
          mensaje: "Sin coincidencias para " + nombre,
          titulo: "Error artículo",
          link: "",
        });

        return false;
      }
    } catch (e) {
      console.log(e);

      return false;
    }
  };

  /**
   *se encarga de agregar item a los articulos
   * @param {Number} valor
   * @param {Number} cantidad
   * @param {Number} totalArt
   */
  const agregarItem = async (valor, cantidad, totalArt) => {
    try {
      setDataModalEditar([
        ...dataModalEditar,
        {
          Cantidad: cantidad,
          Code: datosArticulo.Code,
          Description: datosArticulo.Description,
          PriceList1: valor,
          Total: totalArt,
        },
      ]);
      setDatosArticulo();
      return true;
    } catch (e) {}
  };

  /**
   *se encarga de agregar item a los articulos
   * @param {Number} valor
   * @param {Number} cantidad
   * @param {Number} totalArt
   */
  const agregarItemFactura = async (valor, cantidad, totalArt) => {
    try {
      setProductosData([
        ...productosData,
        {
          Cantidad: cantidad,
          Code: datosCliente.Code,
          Descripcion: datosCliente.Description,
          Precio: valor,
          Total: totalArt,
        },
      ]);
      setDatosCliente();
      return true;
    } catch (e) {
      console.log(e);
    }
  };

  const calcularDescuento = async (desc) => {
    if (desc && desc > 0) {
      const datos = dataModalEditar;
      datos.forEach((dato) => {
        dato.PriceList1 = dato.PriceList1 - dato.PriceList1 * (desc / 100);
        dato.Total = dato.Total - dato.Total * (desc / 100);
      });
      await setDataModalEditar([]);
      setDataModalEditar(datos);
      message.success("Descuento " + desc + "% se ha asignado correctamente");
    } else {
      message.error("Debe escribir un descuento");
    }
  };

  const seleccionarArticulo = async (id) => {
    try {
      setDatosArticulo(productosData[id]);
      return true;
    } catch (e) {
      console.log(e);
    }
  };

  //// envio los datos de busqueda fin
  const llenarEncabezado = () => {
    setcolumnasPedidos([
      {
        title: "Documento",
        dataIndex: "Identification",
        key: "Identification",
      },
      {
        title: "Nombre",
        dataIndex: "FullName",
        key: "FullName",
      },
      {
        title: "Total",
        dataIndex: "Total",
        key: "Total",
      },
      {
        title: "Estado",
        dataIndex: "Estado",
        key: "Estado",
      },
      {
        title: "Registrado",
        dataIndex: "DocDate",
        key: "DocDate",
      },
    ]);
  };

  /// logica modal detalle pedido

  const enviarDatosModalEditarPedidos = (data) => {
    llenarEncabezadoModalPedido();
    setDataModalEditar(data.Items);
    setDataPedidoEditar(data);
  };

  const llenarEncabezadoModalPedido = () => {
    setcolumnasPedidosModaldetalle([
      {
        title: "Codigo",
        dataIndex: "Code",
        key: "Code",
      },
      {
        title: "Descripción",
        dataIndex: "Description",
        key: "Description",
      },
      {
        title: "Precio",
        dataIndex: "PriceList1",
        key: "PriceList1",
      },
      {
        title: "Cantidad",
        dataIndex: "Cantidad",
        key: "Cantidad",
      },
      {
        title: "Total",
        dataIndex: "Total",
        key: "Total",
      },
    ]);
  };

  const toggleDetalle = () => {
    setVisibleDetalle(!visibleDetalle);
  };

  // activara o desactivara el modal para confirmar una accion
  const toggleConfirmar = () => {
    setVisibleModalConfirmacion(!visibleModalConfirmacion);
  };

  const toggleConfirmarItemFactura = () => {
    setVisibleModalConfirmacionItemFactura(!visibleModalConfirmacion);
  };

  const eliminarLinea = (borrar, i) => {
    setBorrar(i);
    setEditar(borrar);
    setMensajeModal(`Eliminara producto ${borrar.Descripcion}`);
    toggleConfirmar();
  };
  const eliminarItemFactura = (borrar, i) => {
    setBorrar(i);
    setMensajeModal(`Eliminara producto ${borrar.Descripcion}`);
    toggleConfirmarItemFactura();
  };

  const confirmoAccion = () => {
    console.log(borrar);
    let data = [].slice.call(dataModalEditar);
    data.splice(borrar, 1);
    setDataModalEditar(data);
  };

  const editoDatos = () => {
    toggleConfirmar();
  };
  const confirmoAccionItemFactura = () => {
    let data = [].slice.call(dataTablaProducto);
    data.splice(borrar, 1);
    setDataTablaProducto(data);
    toggleConfirmarItemFactura();
  };

  const actualizarDataPedido = async (facturar, direccion, telefono) => {
    setVisibleLoading(true);
    const token = localStorage.getItem("token");
    const json = await axios.post(
      URL + "ordenes/actualizar",
      {
        facturar,
        id: dataPedidoEditar._id,
        items: dataModalEditar,
        direccion,
        telefono,
      },
      {
        headers: { authorization: token },
      }
    );

    if (json.status === 200) {
      if (facturar) {
        setVisibleModal({
          visible: true,
          tipo: "SUCCESS",
          colorFondoBtn: '#52c41a"',
          colorText: "black",
          mensaje: `Factura Registrada En SIIGO Correctamente`,
          titulo: "Factura Registrada",
          link: "",
        });
      } else {
        setVisibleModal({
          visible: true,
          tipo: "SUCCESS",
          colorFondoBtn: '#52c41a"',
          colorText: "black",
          mensaje: `Orden Actualizada Correctamente`,
          titulo: "Orden Actualizada",
          link: "",
        });
      }
      toggleDetalle();
      onFinish();
    } else if (json.status === 201) {
      setVisibleModal({
        visible: true,
        tipo: "WARNING",
        colorText: "white",
        colorFondoBtn: "#faab02",
        mensaje: json.data.mensaje,
        titulo: "Error guardando",
        link: "",
      });
      toggleDetalle();
    }
    setVisibleLoading(false);
    //
  };

  // facturacion inicio

  const llenarEncabezadoFactura = () => {
    setColumnasDataFactura([
      {
        title: "Codigo",
        dataIndex: "codigo",
        key: "codigo",
      },
      {
        title: "Producto",
        dataIndex: "producto",
        key: "producto",
      },
      {
        title: "Cantidad",
        dataIndex: "cantidad",
        key: "cantidad",
      },
      {
        title: "Valor Unidad",
        dataIndex: "valor",
        key: "valor",
      },
    ]);
  };

  const agregarProducto = () => {
    setDataTablaProducto([
      {
        key: "1",
        codigo: "1234",
        producto: "John Brown",
        cantidad: 5,
        valor: 1500,
      },
    ]);
  };

  /// aqui hara la busqueda de los nombres tempoalmente cargamos una lista
  const getNombresData = () => {
    setNombresData([
      { dato: "pepe suarez", id: "pepe" },
      { dato: "carlos perez", id: "carlos" },
    ]);
  };

  /////
  return (
    <DataContext.Provider
      value={{
        editoDatos,
        editar,
        columnasPedidos,
        seleccionarArticulo,
        eliminarItemFactura,
        confirmoAccionItemFactura,
        dataPedidos,
        agregarItem,
        agregarItemFactura,
        visibleLoading,
        mtdLogin,
        consultarClienteCodigo,
        logeado,
        onFinish,
        datosCliente,
        toggleDetalle,
        visibleDetalle,
        cosultarArticuloNombre,
        enviarDatosModalEditarPedidos,
        dataPedidoEditar,
        actualizarDataPedido,
        columnasPedidosModaldetalle,
        dataModalEditar,
        eliminarLinea,
        visibleModalConfirmacion,
        visibleModalConfirmacionItemFactura,
        toggleConfirmar,
        mensajeModal,
        confirmoAccion,
        columnasDataFactura,
        llenarEncabezadoFactura,
        productosData,
        nombresData,
        dataTablaProducto,
        agregarProducto,
        consultarArticuloCodigo,
        cosultarClienteNombre,
        datosArticulo,
        calcularDescuento,
      }}
    >
      {props.children}
      <Alerta modal={visibleModal} setModal={setVisibleModal} />
    </DataContext.Provider>
  );
};

export default DataProvider;
