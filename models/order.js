class Order {
    constructor(id, items, totalAmount, date) {
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
    }
    get readableDate() {
        return this.date.toDateString();
    }
}

export default Order