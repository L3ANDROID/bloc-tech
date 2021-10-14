import request from 'supertest';
import {app} from "../api/app";
import { base_url } from '../config/config';

//como aplicamos un token, aqui tenemos uno
const bearer = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlcGl0b0BnbWFpbC5jb20iLCJwYXNzd29yZCI6InBlcGl0bzEyMzQ1NiIsImlhdCI6MTYzMTExMzE1OX0.zrpVB7vfQdCQomGCL4zCVd2Ihbo9epD6kXahETLysMM";

// Primer test voy a listar a los usuarios
describe("Lista de usuarios", () => {
    test("Metodo GET", async () => {
      const result = await request(app)
        .get(`${base_url}/user/users`)
        .set("Authorization", bearer);
  
      expect(result.status).toBe(200);
      expect(result.ok).toBe(true);
    });
  });

// Ahora vamos a crear un usuario
describe("Creando usuario", () => {
    test("Metodo POST", async () => {
      const body = {
        name: "Linder Test",
        last_name: "Hassinger Test",
        email: "linder@gmail.com",
        password: "linder123456",
      };
  
      const result = await request(app)
        .post(`${base_url}/auth/signUp`)
        .send(body);
  
      expect(result.status).toBe(201);
      expect(result.ok).toBe(true);
    });
  });

  //test para editar un usuario
  describe("editar usuario", () => {
    test("Metodo PUT", async () => {
      const body = {
        name: "leandro Test",
        last_name: "Morocho Test",
        email: "linder@gmail.com",
        password: "linder123456",
      };
      const result = await request(app)
        .put(`${base_url}/user/update/6754ee8b-f3e5-4613-82a3-8aa05063bc98`)
        .set("Authorization", bearer)
        .send(body);
  
      expect(result.status).toBe(200);
      expect(result.ok).toBe(true);
    });
  });

  //test para eliminar un usuario
  describe("Eliminar usuario", () => {
    test("Metodo DELETE", async () => {
      const result = await request(app)
        .delete(`${base_url}/user/delete/6754ee8b-f3e5-4613-82a3-8aa05063bc98`)
        .set("Authorization", bearer);
  
      expect(result.status).toBe(200);
      expect(result.ok).toBe(true);
    });
  });