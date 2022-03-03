// REACT
import { useEffect, useState } from 'react';

// STYLED COMPONENTS
import styled from '@emotion/styled';

// Data
import { monedas } from '../data/monedas';

// HOOKS
import useSelectMonedas from '../hooks/useSelectMonedas';

const ErrorContenedor = styled.div`
  background-color: red;
  border-radius: 5px;
`;

const Error = styled.p`
  color: white;
  font-family: 'Lato', sans-serif;
  font-size: 20px;
  text-align: center;
  padding: 15px;
`;

const BotonCotizar = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Formulario = ({ setMonedas, setResultado }) => {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  const [moneda, SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas);
  const [criptoMoneda, SelectCriptoMonedas] = useSelectMonedas(
    'Elige tu Criptomoneda',
    criptos
  );

  const handleCotizar = (e) => {
    e.preventDefault();
    setResultado({});
    if ([moneda, criptoMoneda].includes('')) {
      setError(true);
      return;
    }

    setError(false);
    setMonedas({ moneda, criptoMoneda });
  };

  useEffect(() => {
    const consultarAPI = async () => {
      const URL =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

      const respuesta = await fetch(URL);
      const resultado = await respuesta.json();
      const criptos = resultado.Data.map((cripto) => {
        return { id: cripto.CoinInfo.Name, nombre: cripto.CoinInfo.FullName };
      });
      setCriptos(criptos);
    };

    consultarAPI();
  }, []);

  return (
    <>
      {error && (
        <ErrorContenedor>
          <Error>Todos los campos son requeridos.</Error>
        </ErrorContenedor>
      )}
      <form onSubmit={handleCotizar}>
        <SelectMonedas />
        <SelectCriptoMonedas />

        <BotonCotizar type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Formulario;
