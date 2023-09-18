import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import config from "@/configs/config";

const app = initializeApp(config.FIRE_BASE);

export const firebaseAuth = getAuth(app);
