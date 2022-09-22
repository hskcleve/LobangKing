const communityPosts = [
    {
        post_id: 1,
        user_id: '1a2b3c4d',
        body: 'This is post 1',
        image: '',
        time_posted: '20:00',
    },

    {
        post_id: 2,
        user_id: '1a2b3c4d',
        body: 'This is post 2',
        image: '',
        time_posted: '20:10',
    },

    {
        post_id: 3,
        user_id: '1a2b3c4d',
        body: 'This is post 3',
        image: '',
        time_posted: '21:00',
    }
];

exports.doGetCommunityPosts = function() {
    return communityPosts;
}
