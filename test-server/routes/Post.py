from flask import Blueprint

from forumController.services.PostController import PostController

Post = Blueprint("Post", __name__)

Post.route("/", methods=["GET"])(PostController.getAllPosts)
Post.route("/<postID>", methods=["GET"])(PostController.getPostByID)
Post.route("/<postID>", methods=["PUT"])(PostController.updatePost)
Post.route("/", methods=["POST"])(PostController.createPost)
Post.route("/<postID>", methods=["DELETE"])(PostController.deletePost)

