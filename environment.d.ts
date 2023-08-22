declare global {
    namespace NodeJS {
      interface ProcessEnv {
        FAUNA: string;
      }
    }
  }
  
  export {}