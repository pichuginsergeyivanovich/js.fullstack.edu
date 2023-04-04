class People implements IPeople{
    _humans: Array<AbstractHuman>;
    constructor(){
        this._humans=new Array<AbstractHuman>();
    }
    union(): void {
        throw new Error("Method not implemented.");
    }

    add(human: AbstractHuman): void {
        this._humans.push(human);
        console.log('new human borns. he speaks '+human.Languge.lang);

    }
    communicate(): void {
        this._humans.forEach(human => {
            this._humans.forEach(other => {
                human.Languge.CommunicateTo(other);
        });
    });
}

}