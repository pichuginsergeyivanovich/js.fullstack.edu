
class CachedOperations implements IOperations{

    _cache:Map<string, string>;
    _iops: IOperations;

    constructor(iops: IOperations){
        this._cache = new Map<string, string>();
        this._iops=iops;
    }
    SomeLongRunningWebRequest(): string {

        console.log("call to proxy operations cached method started")

        let key = "SomeLongRunningWebRequest";

        if(!this._cache.has(key)){
            let result = this._iops.SomeLongRunningWebRequest();
            this._cache.set(key, result)
        }

        console.log("call to proxy operations cached method completed")
        return this._cache.get(key);
        
    }
    
}