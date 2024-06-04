const { query } = require("../my database/mysql");

const toCart = async (req, res) => {
  var id = req.params.id;
  var get2 = `select * from products where id=${id}`;
  const got = req.body;
  if (got) {
  }
  query(get2, (err, result2) => {
    if (err) console.log(err);

    switch (typeof data) {
      case "undefined":
        data = [];
        data.push({
          id: id,
          title: result2[0].title,
          qty: 1,
          price: result2[0].price,
          img: result2[0].img,
        });
        break;

      default:
        var cart = data;
        var newItem = true;
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].id == id) {
            cart[i].qty++;
            newItem = false;
            break;
          }
        }

        if (newItem) {
          cart.push({
            id: id,
            title: result2[0].title,
            qty: 1,
            price: parseFloat(result2[0].price).toFixed(2),
            img: result2[0].img,
          });
        }
        break;
    }

    res.send({ data: data, numOfData: data.length });
  });
};
module.exports = {
  toCart,
};
