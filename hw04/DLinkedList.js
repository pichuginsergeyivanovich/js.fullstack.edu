class LinkedListNode{
	constructor(data){
	    this.prev=null;
	    this.next=null;		
	    this.data=data;

	}
}

class DLinkedList{

	constructor(){
		this.nodes = new Array();
   	        this.head=null;
         	this.tail=null;
	}

	add(data){
       		let node = new LinkedListNode(data)

		if (this.nodes?.length==0)
			this.head = this.tail = node;
		else{
			if(this.head?.next==null){
				this.head.next=node;
				node.prev=this.head;
				this.tail=node;

			}
			else{
				let tmp = this.tail;
				this.tail=node;
				tmp.next=this.tail;
				node.prev=tmp;
			}

		}
		this.nodes.push(node);
	}
	update(node, value){
		node.data=value;
	}
	search(value){
		let n = this.head;
		while(n!=null){
			if(n.data===value)
				return n;
			n=n.next;			
		}
	}
	delete(node){
		this.nodes.pop(node);

		if(this.nodes?.length==1){
			this.head=null;
			this.tail=null;
		}
		else if(this.head==node){
			this.head=node.next;
			this.head.prev=null;
		}
		else if(this.tail==node){
			this.tail=node.prev;
			this.tail.next=null;
		}
		else{
			node.prev.next=node.next;
			node.next.prev=node.prev;
		}
	}
	length(){
		return this.nodes?.length;
	}

	print(){
		console.log(this);
	}
}