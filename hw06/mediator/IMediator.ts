interface IMediator{
    lang:string;
    CommunicateTo(human: AbstractHuman): boolean;
 
}