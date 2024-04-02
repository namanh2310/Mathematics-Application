import json
import uuid
from flask import request, jsonify
from forumController.database.connection import db_connection
from forumController.utilities.query import QueryParamFunc
from datetime import datetime

class CommentController:
    def createComment(postID):
        if request.method == 'POST':
            conn = db_connection()
            cursor = conn.cursor()
            table_name = "comment"
            try:
                checkExistTable = QueryParamFunc('SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = %s)', (table_name,))
                if not checkExistTable[0]:
                    QueryParamFunc('CREATE TABLE "comment" (id UUID PRIMARY KEY, content_cmt VARCHAR(255), image_cmt VARCHAR, upvote INT, downvote INT, created_at TIMESTAMP, user_id UUID, post_id UUID, FOREIGN KEY (user_id) REFERENCES "user" (id), FOREIGN KEY (post_id) REFERENCES "post" (id))', ())
            except ValueError:
                return ValueError
            
            data_old = request.json
            data = data_old['input']
            id = str(uuid.uuid4())
            created_at = datetime.now()
            
            content_cmt = data['content_cmt']
            image_cmt = str(data['image_cmt'])
            upvote = data['upvote']
            downvote = data['downvote']
            user_id = data['user_id']
            post_id = postID
            comments=[]
            try:
                QueryParamFunc('INSERT INTO "comment" (id, content_cmt, image_cmt, upvote, downvote, created_at, user_id, post_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)', (id, content_cmt, image_cmt, upvote, downvote, created_at, user_id, post_id))
                result = cursor.execute('SELECT * FROM "comment" WHERE id = %s', (id,))
                result = cursor.fetchall()
                lastName = cursor.execute('SELECT lastname FROM "user" WHERE id = %s', (user_id,))
                lastName = cursor.fetchone()
                firstName = cursor.execute('SELECT firstname FROM "user" WHERE id = %s', (user_id,))
                firstName = cursor.fetchone()
                for row in result:
                    comments.append({
                        'id': row[0],
                        'content_cmt': row[1],
                        'image_cmt': row[2],
                        'upvote': row[3],
                        'downvote': row[4],
                        'created_at': row[5],
                        'user_id': row[6],
                        'post_id': row[7],
                        'voteList': []
                    })
                    comments[0]['lastName'] = lastName[0]
                    comments[0]['firstName'] = firstName[0]
                    result = comments
            except ValueError:
                return ValueError

            cursor.close()
            conn.close()
            print(123)
        return jsonify(result[0])
    
    def getAllCommentWithID(postID):
        if request.method == 'GET':
            conn = db_connection()
            cursor = conn.cursor()

            try:
                result = cursor.execute('SELECT * FROM "comment" WHERE post_id = %s', (postID,))
                result = cursor.fetchall()

                # if len(result) == 0:
                #     return jsonify('Comment not found on this post')

                comments = []
                i = 0
                for row in result:
                    comments.append({
                        'id': row[0],
                        'content_cmt': row[1],
                        'image_cmt': row[2],
                        'upvote': row[3],
                        'downvote': row[4],
                        'created_at': row[5],
                        'user_id': row[6],
                        'post_id': row[7]
                    })
                    lastName = cursor.execute('SELECT lastname FROM "user" WHERE id = %s', (row[6],))
                    lastName = cursor.fetchone()
                    firstName = cursor.execute('SELECT firstname FROM "user" WHERE id = %s', (row[6],))
                    firstName = cursor.fetchone()
                    comments[i]['lastName'] = lastName[0]
                    comments[i]['firstName'] = firstName[0]
                    i+=1
                result = comments
            except ValueError:
                return ValueError

            cursor.close()
            conn.close()

        return jsonify(result)  
    
    def deleteCommentWithID(commentID):
        conn = db_connection()
        cursor = conn.cursor()

        try:
            # data = request.json
            # userID = data['user_id']
            # if userID == "":
            #     return jsonify('User ID is required')
            QueryParamFunc('DELETE FROM "vote" WHERE cmt_id = %s', (commentID,))
            
            QueryParamFunc('DELETE FROM "comment" WHERE id = %s', (commentID,))
        except ValueError:
            return ValueError
        
        cursor.close()
        conn.close()

        return jsonify(commentID)
    
    def getAllResponsedComments(userID):
        if request.method == 'GET':
            conn = db_connection()
            cursor = conn.cursor()
            comments = []
            id_array = []
            try:
                cursor.execute('SELECT id FROM "post" WHERE user_id = %s', (userID,))
                id_array = [row[0] for row in cursor.fetchall()]
                # result = cursor.fetchall()
                for id_value in id_array:
                    print(id_value)
                    result = cursor.execute('SELECT * FROM "comment" WHERE post_id = %s', (id_value,))
                    result = cursor.fetchall()
                    i=0
                    for row in result:
                        comments.append({
                            'id': row[0],
                            'content_cmt': row[1],
                            'image_cmt': row[2],
                            'upvote': row[3],
                            'downvote': row[4],
                            'created_at': row[5],
                            'user_id': row[6],
                            'post_id': row[7],
                        })
                        lastName = cursor.execute('SELECT lastname FROM "user" WHERE id = %s', (row[6],))
                        lastName = cursor.fetchone()
                        firstName = cursor.execute('SELECT firstname FROM "user" WHERE id = %s', (row[6],))
                        firstName = cursor.fetchone()
                        comments[i]['lastName'] = lastName[0]
                        comments[i]['firstName'] = firstName[0]
                        i+=1
                # comments = result
                # print(result)
                if len(comments) == 0:
                    return jsonify('Comment not found on this pssssost')
            except ValueError:
                return ValueError

            cursor.close()
            conn.close()

        return jsonify(comments)      