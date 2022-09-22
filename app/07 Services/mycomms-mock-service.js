const Community = require("~/03 Models/Community");

const myComms = [
  {
    community_id: 1,
    name: "Groceries",
    num_members: 120,
    image: '~/assets/groceries-img.jpg',
    posts: [],
  },
  {
    community_id: 2,
    name: "Fashion",
    num_members: 188,
    image: '~/assets/fashion-img.jpg',
    posts: [],
  },
];

exports.doGetMyCommunities = function () {
  return myComms;
};
