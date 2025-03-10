declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Request {
      user?: {
        id: string;
        email?: string;
        name?: string;
      };
    }
  }
}

export {};
