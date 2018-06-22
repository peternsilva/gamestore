
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function() {
      // Inserts seed entries
      return knex('products').insert([
        {id: 1, title: 'Mario Bobblehead', price: 14.99},
        {id: 2, title: 'Blizzard Retro Scarf', price: 24.99},
        {id: 3, title: 'Sonic Toothbrush', price: 10.99}
      ]);
    });
};
