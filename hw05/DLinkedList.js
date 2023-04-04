"use strict";
var LinkedListNode = (function () {
    function LinkedListNode(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
    return LinkedListNode;
}());
var DLinkedList = (function () {
    function DLinkedList() {
        this.nodes = new Array();
        this.head = null;
        this.tail = null;
    }
    DLinkedList.prototype.add = function (data) {
        var _a, _b;
        var node = new LinkedListNode(data);
        if (((_a = this.nodes) === null || _a === void 0 ? void 0 : _a.length) == 0)
            this.head = this.tail = node;
        else {
            if (((_b = this.head) === null || _b === void 0 ? void 0 : _b.next) == null) {
                if (this.head != null)
                    this.head.next = node;
                node.prev = this.head;
                this.tail = node;
            }
            else {
                var tmp = this.tail;
                this.tail = node;
                if (tmp != null)
                    tmp.next = this.tail;
                node.prev = tmp;
            }
        }
        this.nodes.push(node);
    };
    DLinkedList.prototype.update = function (node, value) {
        node.data = value;
    };
    DLinkedList.prototype.search = function (value) {
        var n = this.head;
        while (n != null) {
            if (n.data === value)
                return n;
            n = n.next;
        }
    };
    DLinkedList.prototype.delete = function (node) {
        var _a, _b, _c;
        var index = this.nodes.indexOf(node);
        if (index !== -1) {
            this.nodes.splice(index, 1);
        }
        if (((_a = this.nodes) === null || _a === void 0 ? void 0 : _a.length) == 1) {
            this.head = null;
            this.tail = null;
        }
        else if (this.head == node) {
            if (node != null)
                this.head = node.next;
            if (this.head != null)
                this.head.prev = null;
        }
        else if (this.tail == node) {
            this.tail = (_b = node === null || node === void 0 ? void 0 : node.prev) !== null && _b !== void 0 ? _b : null;
            if (this.tail != null)
                this.tail.next = null;
        }
        else {
            if ((node === null || node === void 0 ? void 0 : node.prev) != null)
                node.prev.next = (_c = node === null || node === void 0 ? void 0 : node.next) !== null && _c !== void 0 ? _c : null;
            if ((node === null || node === void 0 ? void 0 : node.next) != null)
                node.next.prev = node === null || node === void 0 ? void 0 : node.prev;
        }
    };
    DLinkedList.prototype.length = function () {
        var _a;
        return (_a = this.nodes) === null || _a === void 0 ? void 0 : _a.length;
    };
    DLinkedList.prototype.print = function () {
        console.log(this);
    };
    return DLinkedList;
}());
//# sourceMappingURL=DLinkedList.js.map