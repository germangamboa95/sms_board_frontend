export namespace SillyBoard {
  export interface Message {
    id: number;
    message: string;
    source: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    reported_at?: string;
  }
}
