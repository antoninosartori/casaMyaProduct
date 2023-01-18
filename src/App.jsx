import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [articulos, setArticulos] = useState([]);
  const [searchedArticulos, setSearchedArticulos] = useState([]);
  const [busqueda, setBusqueda] = useState('')
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    
    fetch('/articulos.json')
      .then(response => response.json())
      .then(
        response => {
          setIsLoading(false)
          setArticulos(response)
          setSearchedArticulos(response)
        })
  }, [])

  const searchInput = (e) => {
    setInputValue(e.target.value)
    setBusqueda(e.target.value)
    filtrar(e.target.value)
  }

  const filtrar = (terminoBusqueda) => {
    if(!terminoBusqueda && articulos) { setSearchedArticulos(articulos) }
    const resultadoBusqueda = 
      articulos.filter(elemento => {
      
      if(elemento.product_name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()))
      return elemento;
    })
    setSearchedArticulos(resultadoBusqueda)
  }

  const deleteSearch = () => {
    filtrar('')
    setInputValue('')
  }

  return (
    <section>
      <div className="container">
        <form action="">
          <input placeholder='buscar productos' onChange={searchInput} type="text" value={inputValue} />
          <div onClick={deleteSearch} className="spanContainer">
            <span className='closeX'>X</span>
          </div>
        </form>

        {articulos.length < 0 ? <h1>CARGANDO</h1> :
        
            searchedArticulos.map(articulo => {
            return(
              <article
                key={articulo?.product_id}>
                <h2> {articulo?.product_name} </h2>
                <img src={articulo?.product_img} alt={articulo?.product_name} />
                <div className='price-container'>
                  {articulo?.prices.map((price,idx) => {
                    return(
                      <div className='priceItem' key={idx}>
                        <span className='priceItem-priceName'> { price.price_name } </span>
                        <span className='priceItem-priceNumber'> { price.price } </span>
                      </div>
                    )
                  } )}
                </div>
              </article>
            )
          })
        
        }
      </div>
    </section>
  )
}

export default App
