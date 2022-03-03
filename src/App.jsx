import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagenCripto from './img/imagen-criptos.png';
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Spiner from './components/Spiner';

const ImagenCripto = styled.img`
  max-width: 400px;
  width: 88%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Contenedor = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Heading = styled.h1`
  font-family: 'Lato';
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setCargando(true);

        const { moneda, criptoMoneda } = monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado.DISPLAY[criptoMoneda][moneda]);

        setCargando(false);
      };

      cotizarCripto();
    }
  }, [monedas]);

  return (
    <Contenedor>
      <ImagenCripto src={imagenCripto} alt="Imagen app" />
      <div>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Formulario setMonedas={setMonedas} setResultado={setResultado} />

        {cargando && <Spiner />}
        {resultado.PRICE && <Resultado resultado={resultado} />}
      </div>
    </Contenedor>
  );
}

export default App;
