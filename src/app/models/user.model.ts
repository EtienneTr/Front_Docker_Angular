export class User {
  firstname: string;
  lastname: string;
  username: string;
  mail: string;
  password:string;
  token: string;
  role: string;
  images: [{
    _id: string,
    path: string,
    shared: number,
  }]
}
