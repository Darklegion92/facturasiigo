import React from 'react'
import Moment from 'moment'
import './styles.css'

export default class FormatoFactura extends React.Component {
  render () {
    const formato = new Intl.NumberFormat('en-Us')
    const { datos } = this.props
    console.log(datos)
    let fecha = new Date()

    return datos && datos.Header ? (
      <div className='formato-facturaventa'>
        <div className='encabezado'>
          <div className='col-1'>
            <img src='logo192.png' />
            <h4>NIT. 901.242.865-0</h4>
          </div>
          <div className='col-2'>
            <h4>GRUPO PATER S.A.S</h4>
            <h4>AV.7 No. 0BN-82 SEVILLA TELF.5780489 - 350 7942892</h4>
            <h3>REMISION</h3>
          </div>
          <div className='col-3'>
            <img src='logo512.png' />
          </div>
        </div>
        <div className='cuerpo'>
          <div className='datos-persona'>
            <div className='col-1'>
              <h4>
                <span>FECHA </span>
                {Moment(fecha)
                  .utc()
                  .format('DD/MM/YYYY')}
              </h4>
              <h4>
                <span>SEÑOR(ES) </span>
                {datos.Header.FullName}
              </h4>
              <h4>
                <span>DIRECCIÓN </span> {datos.Header.Address}
              </h4>
            </div>
            <div className='col-2'>
              <h4>
                <span>NIT </span> {datos.Header.Identification}
              </h4>
              <h4>
                <span>TEL </span> {datos.Header.Phone}
              </h4>
              <h4>
                <span>FORMA DE PAGO </span>
                {datos.CreditDays > 1
                  ? 'CRÉDITO - ' + datos.CreditDays + ' días'
                  : 'CONTADO'}
              </h4>
            </div>
          </div>
          <div className='tabla'>
            <div className='encabezado'>
              <div className='col-1'>CÓDIGO</div>
              <div className='col-2'>DESCRIPCIÓN</div>
              <div className='col-3'>UND</div>
              <div className='col-4'>DTO</div>
              <div className='col-6'>CANT.</div>
              <div className='col-7'>VR. UNIDAD</div>
              <div className='col-8'>VR. PARCIAL</div>
            </div>

            <div className='cuerpo'>
              {datos.Items.map(item => {
                return (
                  <div className='item'>
                    <div className='col-1'>{item.Code}</div>
                    <div className='col-2'>{item.Description}</div>
                    <div className='col-3'>Und.</div>
                    <div className='col-4'>
                      {item.DiscountValue
                        ? formato.format(item.DiscountValue / item.Cantidad)
                        : 0}
                    </div>
                    <div className='col-6'>{formato.format(item.Cantidad)}</div>
                    <div className='col-7'>
                      {formato.format(item.PriceList4)}
                    </div>
                    <div className='col-8'>{formato.format(item.Total)}</div>
                  </div>
                )
              })}
            </div>
            <div className='pie'>
              <div className='col-1'>
                <h5 style={{ borderBottom: 'solid 1px black' }}>
                  Documento temporal mientras se expide la factura de venta.
                </h5>

                <h5>
                  NO PRACTICAR RETENCIÓN POR ICA en San José de Cúcuta, somos
                  autoretenedores de ICA en conformidad al acuerdo N°025 de 2018
                </h5>

                <h4>Aceptada y Recibida (Firma y Sello)</h4>
              </div>
              <div className='col-2'>
                <h5>SUBTOTAL</h5>
                <h5>DESCUENTO</h5>
                <h4>TOTAL</h4>
              </div>
              <div className='col-3'>
                <h5>
                  {formato.format(datos.Header.Total - datos.Header.Discount)}
                </h5>
                <h5>{formato.format(datos.Header.Discount)}</h5>
                <h4>{formato.format(datos.Header.Total)}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <></>
    )
  }
}
