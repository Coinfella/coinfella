declare global {
    namespace NodeJS{
        interface ProcesEnv{
            NODE_ENV: "development" | "production"
        }
    }
}

export {}