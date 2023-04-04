class LinkedListNode{

    prev: LinkedListNode | null;
    next: LinkedListNode | null;		
    data: string;

	constructor(data: string){
	    this.data=data;
        this.next=null;
        this.prev=null;

	}
}

class DLinkedList{

    nodes: Array<LinkedListNode|null>;
    head: LinkedListNode | null;
    tail: LinkedListNode | null;

	constructor(){
		this.nodes = new Array();
        this.head=null;
        this.tail=null;
	}

	add(data: string){
       		let node = new LinkedListNode(data)

		if (this.nodes?.length==0)
			this.head = this.tail = node;
		else{
			if(this.head?.next==null){
                
                if(this.head!=null)
				    this.head.next=node;

				node.prev=this.head;

				this.tail=node;

			}
			else{
				let tmp = this.tail;
				this.tail=node;
                if(tmp!=null)
				    tmp.next=this.tail;
				node.prev=tmp;
			}

		}
		this.nodes.push(node);
	}
	update(node: LinkedListNode, value: string){
		node.data=value;
	}
	search(value: string){
		let n = this.head;
		while(n!=null){
			if(n.data===value)
				return n;
			n=n.next;			
		}
	}
	delete(node: LinkedListNode | null){
        var index = this.nodes.indexOf(node);
        if (index !== -1) {
            this.nodes.splice(index, 1);
        }

		if(this.nodes?.length==1){
			this.head=null;
			this.tail=null;
		}
		else if(this.head==node){
            if(node!=null)
			    this.head=node.next;
             if(this.head!=null)   
			    this.head.prev=null;
		}
		else if(this.tail==node){

			this.tail=node?.prev??null;
                
            if(this.tail!=null)
			    this.tail.next=null;
		}
		else{
            if(node?.prev!=null)
			    node.prev.next=node?.next??null;
            if(node?.next!=null)
			    node.next.prev=node?.prev;
		}
	}
	length(){
		return this.nodes?.length;
	}

	print(){
		console.log(this);
	}
}