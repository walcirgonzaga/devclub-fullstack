import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

const Container = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px;
`;

const Titulo = styled.h1`
  margin-bottom: 24px;
`;

const Filtros = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;

const BotaoFiltro = styled.button`
  padding: 8px 20px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme, $ativo }) => ($ativo ? theme.colors.primary : "#fff")};
  color: ${({ theme, $ativo }) => ($ativo ? "#fff" : theme.colors.primary)};
  font-weight: 600;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
`;

const Status = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
`;

function Home() {
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      const [resCategorias, resProdutos] = await Promise.all([
        api.get("/categories"),
        api.get("/products"),
      ]);
      setCategorias(resCategorias.data);
      setProdutos(resProdutos.data);
      setCarregando(false);
    }
    carregar();
  }, []);

  const produtosFiltrados = categoriaAtiva
    ? produtos.filter((produto) => produto.category_id === categoriaAtiva)
    : produtos;

  if (carregando) {
    return (
      <Container>
        <Status>Carregando cardápio...</Status>
      </Container>
    );
  }

  return (
    <Container>
      <Titulo>🍔 Cardápio DevBurguer</Titulo>

      <Filtros>
        <BotaoFiltro $ativo={!categoriaAtiva} onClick={() => setCategoriaAtiva(null)}>
          Todos
        </BotaoFiltro>
        {categorias.map((categoria) => (
          <BotaoFiltro
            key={categoria.id}
            $ativo={categoriaAtiva === categoria.id}
            onClick={() => setCategoriaAtiva(categoria.id)}
          >
            {categoria.name}
          </BotaoFiltro>
        ))}
      </Filtros>

      <Grid>
        {produtosFiltrados.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
