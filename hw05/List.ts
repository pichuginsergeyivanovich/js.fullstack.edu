class List<T>{
    _bag: Array<T>
	constructor(){
		this._bag=new Array<T>();
	}
	add(item: T){
		this._bag.push(item);
	}
	delete(item: T){
		this._bag=this._bag.filter(function(e,i){
			return e!=item;
		});
	}
	search(item: T){
		for(let i=0;i<this._bag.length;i++){
			if(this._bag[i]==item)
				return i;
		}
		return -1;
	}
	update(i: number, item: T){
		if(this._bag.length>i)
			this._bag[i]=item;
	}
	length(){
		return this._bag.length;
	}

	print(){
		console.log(this);
	}
}