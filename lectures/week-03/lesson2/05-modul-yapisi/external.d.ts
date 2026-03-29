// ============================================
// MODÜL YAPISI — external.d.ts (Declaration File)
// ============================================

// Bu dosya, TypeScript'e harici kütüphanelerin tiplerini öğretir
// Gerçekte @types/... paketlerinden gelir

declare module "external-library" {
  export interface ExternalApi {
    fetch(endpoint: string): Promise<any>;
    send(endpoint: string, data: object): Promise<any>;
  }

  export function connect(apiKey: string): ExternalApi;
}

// Kullanım örneği:
// import { connect } from "external-library";
// const api = connect("my-api-key");
// api.fetch("/users").then(data => console.log(data));
