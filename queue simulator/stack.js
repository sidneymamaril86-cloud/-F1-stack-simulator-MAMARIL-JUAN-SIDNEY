class Stack {
    constructor() {
        this.items = [];
        this.count = 0;
    }

    // Add element to top of stack
    push(element) {
        this.items[this.count] = element;
        this.count += 1;
        console.log(`${element} added to index ${this.count - 1}`);
        return element;
    }

    // Return and remove top element in stack
    // Return undefined if stack is empty
    pop() {
        if (this.count === 0) { // <-- FIXED: explicit empty check
            console.log('Stack is empty');
            return undefined;
        }
        const deleteItem = this.items[this.count - 1];
        this.count -= 1;
        this.items.length = this.count; // <-- FIXED: truncate array cleanly
        console.log(`${deleteItem} removed`);
        return deleteItem;
    }

    // Check top element in stack
    peek() {
        if (this.count === 0) { // <-- FIXED: handle empty stack safely
            console.log('Stack is empty');
            return undefined;
        }
        const topItem = this.items[this.count - 1];
        console.log(`Top element is ${topItem}`);
        return topItem;
    }

    // Check if stack is empty
    isEmpty() {
        const empty = this.count === 0;
        console.log(empty ? 'Stack is empty' : 'Stack is NOT empty');
        return empty;
    }

    // Check size of stack
    size() {
        console.log(`${this.count} elements in stack`);
        return this.count;
    }

    // Print elements in stack
    print() {
        let str = '';
        for (let i = 0; i < this.count; i++) {
            str += this.items[i] + ' ';
        }
        return str.trim();
    }

    // Clear stack
    clear() {
        this.items = [];
        this.count = 0;
        console.log('Stack cleared..');
        return this.items;
    }
}

const stack = new Stack();

$(document).ready(function () {
    // <-- FIXED: replaced hardcoded prepends with full Push, Pop, Peek, and Clear handlers[cite: 2]
    const highlightClass = 'border border-warning bg-warning text-dark';

    function clearPeekHighlight() {
        $('#stack .stack-item').removeClass(highlightClass); // <-- FIXED: clear prior highlight
    }

    // PUSH: Add input value to the top[cite: 2]
    $('#btnPush').on('click', function () { // <-- FIXED: dynamic Push from input
        const val = $('#valueInput').val().trim();
        if (val === '') {
            alert('Please enter a value to push.');
            return;
        }

        clearPeekHighlight();
        const pushedValue = stack.push(val);
        const colorClass = stack.size() % 2 === 1 ? 'bg-primary text-white' : 'bg-success text-white';

        $('#stack').prepend(
            `<div class="row stack-item p-2 mb-1 ${colorClass}">${pushedValue}</div>`
        );
        $('#valueInput').val('').focus();
    });

    // POP: Remove top value and display it in the deleted area[cite: 2]
    $('#btnPop').on('click', function () { // <-- FIXED: Pop removes top & shows in deleted area[cite: 2]
        clearPeekHighlight();
        const poppedValue = stack.pop();

        if (poppedValue === undefined) {
            $('#deleted').text('Stack is empty. Nothing to pop.');
            return;
        }

        $('#stack .stack-item').first().remove(); // <-- FIXED: matches top item from prepend()
        $('#deleted').append(
            `<span class="badge bg-danger me-1 mb-1">${poppedValue}</span>`
        );
    });

    // PEEK: Highlight top value without removing it[cite: 2]
    $('#btnPeek').on('click', function () { // <-- FIXED: Peek highlights top without removing[cite: 2]
        clearPeekHighlight();
        const topValue = stack.peek();

        if (topValue === undefined) {
            $('#deleted').text('Stack is empty. Nothing to peek.');
            return;
        }

        $('#stack .stack-item').first().addClass(highlightClass);
    });

    // CLEAR: Reset stack and clear displayed blocks[cite: 2]
    $('#btnClear').on('click', function () { // <-- FIXED: Clear resets stack and UI[cite: 2]
        stack.clear();
        $('#stack').empty();
        $('#deleted').empty();
    });
});
