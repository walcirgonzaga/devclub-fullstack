import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import api from "../../services/api";

const Form = styled.form`
  max-width: 420px;
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e0e0f0;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e0e0f0;
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
`;

const Botao = styled.button`
  margin-top: 12px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 700;
  cursor: pointer;
`;

function AdminProductForm() {
  const { id } = useParams();
  const editando = !!id;
  const navegar = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    api.get("/categories").then((res) => setCategorias(res.data));
  }, []);

  useEffect(() => {
    if (editando) {
      api.get("/products").then((res) => {
        const produto = res.data.find((item) => item.id === Number(id));
        if (produto) {
          reset({
            name: produto.name,
            price: produto.price,
            category_id: produto.category_id,
            offer: produto.offer,
          });
        }
      });
    }
  }, [id, editando, reset]);

  async function aoSubmeter(dados) {
    const formData = new FormData();
    formData.append("name", dados.name);
    formData.append("price", dados.price);
    formData.append("category_id", dados.category_id);
    formData.append("offer", dados.offer || false);
    if (dados.file?.[0]) {
      formData.append("file", dados.file[0]);
    }

    try {
      if (editando) {
        await api.put(`/products/${id}`, formData);
        toast.success("Produto atualizado!");
      } else {
        await api.post("/products", formData);
        toast.success("Produto criado!");
      }
      navegar("/admin/produtos");
    } catch (erro) {
      toast.error(erro.response?.data?.error || "Erro ao salvar produto");
    }
  }

  return (
    <div>
      <h1>{editando ? "Editar Produto" : "Novo Produto"}</h1>
      <Form onSubmit={handleSubmit(aoSubmeter)}>
        <Label htmlFor="name">Nome</Label>
        <Input id="name" {...register("name", { required: true })} />

        <Label htmlFor="price">Preço</Label>
        <Input id="price" type="number" step="0.01" {...register("price", { required: true })} />

        <Label htmlFor="category_id">Categoria</Label>
        <Select id="category_id" {...register("category_id", { required: true })}>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.name}
            </option>
          ))}
        </Select>

        <Label htmlFor="file">Imagem {editando && "(deixe em branco para manter a atual)"}</Label>
        <Input id="file" type="file" accept="image/*" {...register("file")} />

        <Checkbox>
          <input type="checkbox" {...register("offer")} />
          Em oferta
        </Checkbox>

        <Botao type="submit">{editando ? "Salvar alterações" : "Criar produto"}</Botao>
      </Form>
    </div>
  );
}

export default AdminProductForm;
