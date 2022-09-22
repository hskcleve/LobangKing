const Community = require("~/03 Models/Community");

const myComms = [
  {
    community_id: 1,
    name: "Groceries",
    num_members: 120,
    image: "",
    posts: [],
  },
  {
    community_id: 2,
    name: "Fashion",
    num_members: 188,
    image: "",
    posts: [],
  },
];

exports.doGetMyCommunities = function () {
  return myComms;
};
