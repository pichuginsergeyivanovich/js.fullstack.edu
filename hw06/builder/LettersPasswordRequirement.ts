class LettersPasswordRequirement extends PasswordRequirement{
    
    letters: string;
    head:string;
    tie:string;
    min: number;
    
    build(): [string, string] {

        this.tie = this.letters;
        while(this.head.length<=this.min){
            let index = this.randomInt(0, this.tie.length-1);
            let s = this.tie.split('')[index];
            this.head+=s;
            this.tie=this.tie.replace(s,""); 
        }
        return [this.head, this.tie]
    }
    randomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
    }
    
    constructor(name:string, letters: string, min: number=1){
        
        super(name)

        this.letters=letters;

        this.min=min;

    }

}