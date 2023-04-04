class Language implements IMediator{
    lang: string;
    constructor(lang:string){
        this.lang=lang;
    }
    CommunicateTo(human: Human): boolean {
        let result= human.Languge.lang==this.lang;

        if(result)
            console.log("two people talks and undertand each other.");
        else
            console.log("two people talks and don't undertang each other.");
        
        return result;
    }
}