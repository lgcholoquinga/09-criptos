import styled from '@emotion/styled';

const ContenedorResultado = styled.div`
  margin-top: 30px;
  color: white;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  display: flex;
  align-items: flex-start;
  gap: 2rem;
`;

const TextoSpan = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const Imagen = styled.img`
  display: block;
  width: 150px;
`;

const Resultado = ({ resultado }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    resultado;

  return (
    <ContenedorResultado>
      <Imagen
        src={`https://cryptocompare.com/${IMAGEURL}`}
        alt="Imagen cripto"
      />
      <div>
        <p>
          El precio es de: <TextoSpan>{PRICE}</TextoSpan>
        </p>

        <p>
          El precio mas alto del dia: <TextoSpan>{HIGHDAY}</TextoSpan>
        </p>

        <p>
          El precio mas bajo del dia: <TextoSpan>{LOWDAY}</TextoSpan>
        </p>

        <p>
          Variacion ultimo 24 horas<TextoSpan>{CHANGEPCT24HOUR}</TextoSpan>
        </p>

        <p>
          Ultima actualizacion: <TextoSpan>{LASTUPDATE}</TextoSpan>
        </p>
      </div>
    </ContenedorResultado>
  );
};

export default Resultado;
