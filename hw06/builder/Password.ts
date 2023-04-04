class Password{
    private _head: string;
    private _tie: string;
    private _password: string;
    
    constructor(){

    }

    public get password(){
       return this._password
    }
    public set password(value: string){
        this._password=value;
    }
    

}