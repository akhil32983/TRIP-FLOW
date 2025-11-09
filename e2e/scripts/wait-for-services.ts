import axios from "axios";

const services = [
  process.env.API_URL ? `${process.env.API_URL}/api/health` : "http://localhost:8080/api/health",
  process.env.FRONTEND_URL || "http://localhost:4173"
];

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function checkService(url: string, retries = 15, interval = 4000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        console.log(`✅ Service ready: ${url}`);
        return;
      }
    } catch (err) {
      console.log(`⏳ Waiting for ${url}... (${i + 1}/${retries})`);
    }
    await wait(interval);
  }
  throw new Error(`❌ Service did not respond after ${retries} attempts: ${url}`);
}

(async () => {
  console.log("⏳ Waiting for all services to be ready...");
  for (const s of services) {
    await checkService(s);
  }
  console.log("🚀 All services are ready!");
})();
