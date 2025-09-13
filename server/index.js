import env from "./src/config/env.js";
import { createApp } from "./src/app.js";


const app = createApp();


app.listen(env.PORT, () => {
console.log(`Server running on http://localhost:${env.PORT}`);
});