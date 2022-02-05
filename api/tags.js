const express = require('express');
const tagsRouter = express.Router();
const { getPostsByTagName } = require('../db');

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    // read the tagname from the params
    const tagName = req.params.tagName;
    try {
      // use our method to get posts by tag name from the db
      // send out an object to the client { posts: // the posts }
      const postsByTagName = await getPostsByTagName(tagName);
      const filteredPostsByTagName = postsByTagName.filter(post => {
        // keep a post if it is either active, or if it belongs to the current user
        return post.active || (req.user && post.author.id === req.user.id);
    });
      res.send( { posts: filteredPostsByTagName });
    } catch ({ name, message }) {
      // forward the name and message to the error handler
      next({
        name: 'NoPostsError',
        message: 'Cannot find posts with tag name'
    });
    }
  });

module.exports = tagsRouter;