export interface LoginRequest{
    email:string;
    password:string;
}
export interface RegisterRequest extends LoginRequest{
    firstname:string;
    lastname:string;
    pname:string | null;
    univirsity:string;
    roles:string;
}

