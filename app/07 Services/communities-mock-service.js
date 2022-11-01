const myComms = [
    {
      community_id: 1,
      name: "Groceries",
      num_members: 120,
      image: '~/assets/groceries-img.jpg',
      posts: [
        {
            post_id: 1,
            user_id: '1a2b3c4d',
            body: 'New groceries groupbuy started for Woodlands North folks!',
            image: '~/assets/post-image1.jpg',
            time_posted: '20:00',
        },
    
        {
            post_id: 2,
            user_id: '1a2b3c4d',
            body: 'This is post 2',
            image: '~/assets/post-image2.jpg',
            time_posted: '20:10',
        },
    
        {
            post_id: 3,
            user_id: '1a2b3c4d',
            body: 'This is post 3',
            image: '~/assets/post-image3.jpg',
            time_posted: '21:00',
        }
      ],
    },
    {
      community_id: 2,
      name: "Fashion",
      num_members: 188,
      image: '~/assets/fashion-img.jpg',
      posts: [],
    },
  ];

  exports.getMyCommunities = function() {
    return myComms;
  }

  exports.getCommunityPosts = function(communityName) {
    for (const n of myComms) {
      if (communityName === n.name) {
        return n.posts;
      }
    }
  }
