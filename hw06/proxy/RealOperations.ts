
class RealOperations implements IOperations{
    constructor(){

    }
    SomeLongRunningWebRequest():string{
        console.log("call to real operations method started")
        let delay=0;
    while(delay<10000000){
        delay++;
        if(delay%1000==0){
            console.log("working");
        }
    }
    console.log("call to real operations method completed")
    return "1980";
       }   
}
