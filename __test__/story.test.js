import request from 'supertest';
import {app} from "../api/app";
import { base_url } from '../config/config';


// Primer test voy a listar las historias
describe("Lista de historias", () => {
    test("Metodo GET", async () => {
      const result = await request(app)
        .get(`${base_url}/story/read`)
  
      expect(result.status).toBe(200);
      expect(result.ok).toBe(true);
    });
  });

// Ahora vamos a crear una historia
describe("Creando usuario", () => {
    test("Metodo POST", async () => {
      const body = {
        title: "Leandro story",
        author: "leandro gabriel",
        text: "example test",
      };
  
      const result = await request(app)
        .post(`${base_url}/story/create`)
        .send(body);
  
      expect(result.status).toBe(200);
      expect(result.ok).toBe(true);
    });
  });

  //test para editar una historia
  describe("editar usuario", () => {
    test("Metodo PUT", async () => {
      const body = {
        title: "Leandro story",
        author: "leandro gabriel",
        text: "this is the update",
      };
      const result = await request(app)
        .put(`${base_url}/story/update/df43e53d-73f1-45f4-a306-9d46e9a7a444`)
        .send(body);
  
      expect(result.status).toBe(200);
      expect(result.ok).toBe(true);
    });
  });

  //test para eliminar un usuario
  describe("Eliminar usuario", () => {
    test("Metodo DELETE", async () => {
      const result = await request(app)
        .delete(`${base_url}/story/delete/df43e53d-73f1-45f4-a306-9d46e9a7a444`)
  
      expect(result.status).toBe(200);
      expect(result.ok).toBe(true);
    });
  });