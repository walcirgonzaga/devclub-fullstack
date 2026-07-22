import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";

const Container = styled.main`
  display: flex;
  justify-content: center;
  padding: 64px 24px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 360px;
  background: #fff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-top: 12px;
  margin-bottom: 4px;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e0e0f0;
`;

const Erro = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.75rem;
  margin-top: 4px;
`;

const Botao = styled.button`
  margin-top: 24px;
  padding: 14px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 700;
  cursor: pointer;
`;

const Rodape = styled.p`
  margin-top: 16px;
  text-align: center;
  font-size: 0.85rem;

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

function Login() {
  const { login } = useAuth();
  const navegar = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function aoSubmeter(dados) {
    try {
      await login(dados.email, dados.password);
      toast.success("Login realizado!");
      navegar("/");
    } catch {
      toast.error("E-mail ou senha inválidos");
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(aoSubmeter)}>
        <h1>Entrar</h1>

        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          {...register("email", { required: "E-mail é obrigatório" })}
        />
        {errors.email && <Erro>{errors.email.message}</Erro>}

        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          {...register("password", { required: "Senha é obrigatória" })}
        />
        {errors.password && <Erro>{errors.password.message}</Erro>}

        <Botao type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Botao>

        <Rodape>
          Não tem conta? <Link to="/registrar">Cadastre-se</Link>
        </Rodape>
      </Form>
    </Container>
  );
}

export default Login;
