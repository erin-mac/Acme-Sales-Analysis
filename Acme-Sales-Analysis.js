const products = [
    {
        id: 1,
        name: 'foo',
        price: 7
    },
    {
        id: 2,
        name: 'bar',
        price: 2
    },
    {
        id: 5,
        name: 'bazz',
        price: 1
    },
];

const users = [
    {
        id: 1,
        name: 'moe'
    },
    {
        id: 2,
        name: 'larry'
    },
    {
        id: 3,
        name: 'curly'
    }
];

// productId matches up with product in products
// userId matches up with user in users
const orders = [
    {
        id: 1,
        productId: 1,
        quantity: 3,
        userId: 1
    },
    {
        id: 2,
        productId: 1,
        quantity: 7,
        userId: 1
    },
    {
        id: 3,
        productId: 5,
        quantity: 70,
        userId: 3
    },
    {
        id: 3,
        productId: 5,
        quantity: 1,
        userId: 3
    }
];

function productsPurchased(orders, products) {
    productsArray = []
    for (let i = 0; i < orders.length; ++i) {
        if (!productsArray.includes(orders[i].productId)) {
            productsArray.push(orders[i].productId);
        };
    }
    let filtered = products.filter(temp => {
        return productsArray.indexOf(temp.id) != -1;
    });
    return filtered
};

function topSellingProductByQuantity(orders, products) {
    //group orders by product ID
    let productsOrdered = [...new Set(orders.map(s => s.productId))];
    //Add quantities together
    //return ID of largest quantity
    let idTotal = {};
    for (let i = 0; i < productsOrdered.length; ++i) {
        let currentProduct = productsOrdered[i];
        tempOrdersArr = orders.filter(order => order.productId === currentProduct);
        let totalQuant = tempOrdersArr.reduce((order1, order2) => order1.quantity + order2.quantity);
        idTotal[currentProduct] = totalQuant
    };
    let maxQuantId = Object.keys(idTotal).reduce((a, b) => idTotal[a] > idTotal[b] ? a : b);
    maxQuantId = parseInt(maxQuantId);
    //get that object from products
    let finalProduct = products.find(product => product.id === maxQuantId);
    return finalProduct;
};

function usersWithOrders(users, orders) {
    //make array of IDs that exist in orders
    userArray = []
    for (let i = 0; i < orders.length; ++i) {
        if (!userArray.includes(orders[i].userId)) {
            userArray.push(orders[i].userId);
        };
    }
    //return user object from users list
    let filtered = users.filter(temp => {
        return userArray.indexOf(temp.id) != -1;
    });
    return filtered
};

console.log(productsPurchased(orders, products)); // logs foo and bazz products

console.log(topSellingProductByQuantity(orders, products));//logs bazz product

console.log(usersWithOrders(users, orders));//logs info on moe and curly