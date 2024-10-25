import { http } from "../http/Http"

export const productoRepository ={
  async getProductos(){
    const headers   ={
      ...http.headerBase,
    }
    return http.get<any>(
      'https://i2vdxg7l3l.execute-api.us-east-1.amazonaws.com/dev/productos',headers
    )
  }
}