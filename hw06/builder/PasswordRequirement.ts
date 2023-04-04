abstract class PasswordRequirement{
    text: string;

    abstract build():[string, string] ;


    constructor(text: string){
    }

}