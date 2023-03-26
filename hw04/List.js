class List{
	constructor(){
		this._bag=new Array();
	}
	add(item){
		this._bag.push(item);
	}
	delete(item){
		this._bag=this._bag.filter(function(e,i){
			return e!=item;
		});
	}
	search(item){
		for(let i=0;i<this._bag.length;i++){
			if(this._bag[i]==item)
				return i;
		}
		return -1;
	}
	update(i, item){
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