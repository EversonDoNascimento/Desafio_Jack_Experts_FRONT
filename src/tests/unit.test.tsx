import renderColors from "../CONSTANTS/Colors";
import SchemaLogin from "../zod/SchemaLogin";
import SchemaRegister from "../zod/SchemaRegister";
import SchemaTaskRegister from "../zod/SchemaTaskRegister";

// Testando o retorno da função que retorna as cores
describe("Testing function render colors", () => {
  it("Should return the container bg color", () => {
    const color = renderColors("container-bg");
    expect(color).toEqual("#071739");
  });
});

describe("Testing Zod Login Schema", () => {
  it("Should return false in validation login blank schema ", () => {
    // O teste verifica se o esquema de validação está permitindo dados em vazios
    const info_user = { email: "", password: "" };
    const verifySchema = SchemaLogin.safeParse(info_user);
    expect(verifySchema.success).toBeFalsy();
  });
  it("Should return false in validation login schema when password length is less then or equal to 3 ", () => {
    // O teste verifica se o esquema de validação está permitindo dados em vazios
    const info_user = { email: "teste@email.com", password: "123" };
    const verifySchema = SchemaLogin.safeParse(info_user);
    expect(verifySchema.success).toBeFalsy();
  });
  it("Should return false in validation login schema when incorrectly email ", () => {
    // O teste verifica se o esquema de validação está permitindo dados em vazios
    const info_user = { email: "teste", password: "1234" };
    const verifySchema = SchemaLogin.safeParse(info_user);
    expect(verifySchema.success).toBeFalsy();
  });
});

describe("Testing Zod Register Schema", () => {
  // O teste verifica se a validação do email e confirmar email faz a verificação se ambos correspondem
  it("Should return false in validation register schema when email and email confirm not be correspondent", () => {
    const info_user_register = {
      email: "test@email.com",
      confirm_email: "test2@email.com",
      passsword: "1234",
      confirm_password: "1234",
    };
    const verifyRegisterSchema = SchemaRegister.safeParse(info_user_register);
    expect(verifyRegisterSchema.success).toBeFalsy();
  });
  // O teste verifica se a validação de senha e confirmar senha faz a verificação se ambos correspondem
  it("Should return false in validation register when password and confirm password not be correspondent", () => {
    const info_user_register = {
      email: "test2@test.com",
      confirm_email: "test2@test.com",
      password: "123456",
      confirm_password: "1234",
    };
    const verifyRegisterSchema = SchemaRegister.safeParse(info_user_register);
    expect(verifyRegisterSchema.success).toBeFalsy();
  });
});

describe("Testing Zod Task Register Schema", () => {
  // O teste verifica se a validação que verifica se os campos de registro de tarefa estão vazios
  it("Should return false in validation task register schema when title and description to be blank", () => {
    const info_task = {
      title: "",
      description: "",
    };

    const verifyTaskSchema = SchemaTaskRegister.safeParse(info_task);
    expect(verifyTaskSchema.success).toBeFalsy();
  });
});
