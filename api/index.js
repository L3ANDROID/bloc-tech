import { server } from "./app";
import { port } from "../config/config";

// Index expone las rutas
server.listen(port, () =>
  console.log(`listening on port http://localhost:${port}`)
);