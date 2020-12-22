import React from 'react'
import './styles.css'
export default class FormatoFactura extends React.Component {
  render () {
    const formato = new Intl.NumberFormat('en-Us')
    const { datos } = this.props

    let fecha = datos && datos.Header && datos.Header.DocDate.split()

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
            <br />
            <h4>Régimen Común</h4>
            <h4>Resolución DIAN 18764002477877</h4>
            <h4>Fecha: 2020/08/18. Autorización del Nro. 10.001 al 20.000.</h4>
            <h4>Vigencia 18 meses</h4>
          </div>
          <div className='col-3'>
            <img src='logo512.png' />
          </div>
        </div>
        <div className='numeracion'>
          <h3>FACTURA DE VENTA: 00-{datos.Header.Number}</h3>
        </div>
        <div className='cuerpo'>
          <div className='datos-persona'>
            <div className='col-1'>
              <h4>
                <span>FECHA </span>
                {fecha[6] +
                  fecha[7] +
                  '/' +
                  fecha[4] +
                  fecha[5 + '/' + fecha[0] + fecha[1] + fecha[2] + fecha[3]]}
              </h4>
              <h4>
                <span>SEÑOR(ES) </span>
                {datos.Header.Account.FullName}
              </h4>
              <h4>
                <span>RAZÓN SOCIAL </span>
                {datos.Header.Account.FullName}
              </h4>
              <h4>
                <span>DIRECCIÓN </span> {datos.Header.Account.Address}
              </h4>
            </div>
            <div className='col-2'>
              <h4>
                <span>NIT </span> {datos.Header.Account.Identification}
              </h4>
              <h4>
                <span>TEL </span> {datos.Header.Account.Phone.Number}
              </h4>
              <h4>
                <span>FORMA DE PAGO </span>
                {datos.Extras.DiasCredito > 1
                  ? 'CRÉDITO - ' + datos.Extras.DiasCredito + ' días'
                  : 'CONTADO'}
              </h4>
              <h4>
                <span>FECHA DE VENCIMIENTO </span>
              </h4>
            </div>
          </div>
          <div className='tabla'>
            <div className='encabezado'>
              <div className='col-1'>CÓDIGO</div>
              <div className='col-2'>DESCRIPCIÓN</div>
              <div className='col-3'>UND</div>
              <div className='col-4'>DTO</div>
              <div className='col-5'>IVA</div>
              <div className='col-6'>CANT.</div>
              <div className='col-7'>VR. UNIDAD</div>
              <div className='col-8'>VR. PARCIAL</div>
            </div>

            <div className='cuerpo'>
              {datos.Items.map(item => {
                return (
                  <div className='item'>
                    <div className='col-1'>{item.ProductCode}</div>
                    <div className='col-2'>{item.Description}</div>
                    <div className='col-3'>Und.</div>
                    <div className='col-4'>
                      {(item.DiscountPercentage &&
                        formato.format(
                          (item.GrossValue * (item.DiscountPercentage / 100)) /
                            item.Quantity
                        )) ||
                        0}
                    </div>
                    <div className='col-5'>
                      {(item.TaxAddPercentage &&
                        formato.format(item.TaxAddPercentage)) ||
                        0}
                    </div>
                    <div className='col-6'>{formato.format(item.Quantity)}</div>
                    <div className='col-7'>
                      {formato.format(item.UnitValue)}
                    </div>
                    <div className='col-8'>
                      {formato.format(item.BaseValue)}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className='pie'>
              <div className='col-1'>
                <h5 style={{ borderBottom: 'solid 1px black' }}>
                  A partir del 01 de enero del año 2020 NO PRACTICAR RETENCIÓN
                  EN LA FUENTE en conformidad con el artículo 268 de la ley 1955
                  de 2019 y el decreto 2112 de 2019. Fecha de constitución de la
                  empresa 08/01/2019.
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
                <h5>IVA</h5>
                <h4>TOTAL</h4>
              </div>
              <div className='col-3'>
                <h5>{formato.format(datos.Header.TotalBase)}</h5>
                <h5>
                  {(datos.Header.DiscountValue &&
                    formato.format(datos.Header.DiscountValue)) ||
                    0}
                </h5>
                <h5>
                  {(datos.Header.VATTotalValue &&
                    formato.format(datos.Header.VATTotalValue)) ||
                    0}
                </h5>
                <h4>{formato.format(datos.Header.TotalValue)}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className='pie'>
          <h4>
            <span>
              FAVOR CONSIGNAR EN LA CUENTA DE AHORROS Nro. 590-000172-42 DE
              BANCOLOMBIA
            </span>
            <br />
            Esta factura de Venta se asimila en todos sus efectos legales a la
            Letra de cambio (art. 779) de acuerdo a lo previsto en los artículos
            671,455,772,774 y demás concordantes del Código de Comercio. Con
            éste el comprador declara haber recibido de real y las mercancías
            y/o servicios descritos en este título valor. El cumplimiento de las
            obligaciones (demandas y/o prejuicios) será siempre en la ciudad de
            Cúcuta.
            <br />
            <span>DESPUES DE 30 DÍAS NO SE ACEPTAN DEVOLUCIONES</span>
          </h4>
        </div>
      </div>
    ) : (
      <></>
    )
  }
}
