import 'next-auth';

interface IAuth {
  expires: string;
  token: string;
  user:{
    email: string
  }
}

declare module 'next-auth' {
  interface Session extends IAuth {
    user: {
      userId: string;
      name?: string;
      email: string;
      image?: string;
      role: string;
      token: string;
    }
  }
}