import { createApp } from "./app";
import { env } from "./config/env";

const app = createApp();
const PORT = env.port || 5000;

app.listen(PORT, () => {
    console.log(`🔎 CompareOffer Backend running on http://localhost:${PORT}`);
});
