class PasswordBuilder //implements IBuilder<Password>
{

    items: Array<PasswordRequirement>;
    maxlen:number;
    constructor(maxlen: number){
        this.maxlen=maxlen;
        this.items=new Array();
        this.items.push(new LettersPasswordRequirement("cap letters",  "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 1));
        this.items.push(new LettersPasswordRequirement("lower case letters",  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase(), 1));
        this.items.push(new LettersPasswordRequirement("digits",  "0123456789", 1));
        this.items.push(new LettersPasswordRequirement("specials",  "_@#%^&()[]~!_-=+$", 1));

    }
    getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
    }
    build(): string {

        let _password="";
        let tie="";

        this.items.forEach(r => {
            let [h,t] = r.build(_password);
            _password+=h;
            tie+=t;
        });
       
        while(_password.length<=this.maxlen){
            let next_index=this.getRandomInt(0, tie.length-1);
            let next=tie[next_index];
            tie=tie.replace(next,"");
            _password+=next;
        }

        return _password;
    }

}