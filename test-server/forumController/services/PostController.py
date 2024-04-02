import json
import uuid
from flask import request, jsonify
from forumController.database.connection import db_connection
from forumController.utilities.query import QueryParamFunc

class PostController:
    def createPost():
        if request.method == 'POST':
            conn = db_connection()
            cursor = conn.cursor()
            table_name = "post"
            try:
                checkExistTable = QueryParamFunc('SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = %s)', (table_name,))
                if not checkExistTable[0]:
                    QueryParamFunc('CREATE TABLE "post" (id UUID PRIMARY KEY, category VARCHAR(255), content VARCHAR, image VARCHAR, user_id UUID REFERENCES "user" (id))', ())
            except ValueError:
                return ValueError
            
            data_old = request.json
            data = data_old['payload']
            id = str(uuid.uuid4())
            category = data['category']
            content = data['content']
            image = data['image']
            user_id = data['id']
    
            try:
                QueryParamFunc('INSERT INTO "post" (id, category, content, image, user_id) VALUES (%s, %s, %s, %s, %s)', (id, category, content, image, user_id))
                result = cursor.execute('SELECT * FROM "post" WHERE id = %s', (id,))
                result = cursor.fetchall()
                lastName = cursor.execute('SELECT lastname FROM "user" WHERE id = %s', (user_id,))
                lastName = cursor.fetchone()
                firstName = cursor.execute('SELECT firstname FROM "user" WHERE id = %s', (user_id,))
                firstName = cursor.fetchone()
                print(str(lastName))
                posts = []
                for row in result:
                    posts.append({
                        'id': row[0],
                        'category': row[1],
                        'content': row[2],
                        'image': row[3],
                        'user_id': row[4],
                    })
                posts[0]['lastName'] = lastName[0]
                posts[0]['firstName'] = firstName[0]
                # posts.append(userData[4])
                result = posts
            except ValueError:
                return ValueError

            cursor.close()
            conn.close()
        return jsonify(result[0])
    
    def getAllPosts():
        if request.method == 'GET':
            conn = db_connection()
            cursor = conn.cursor()

            try:
                result = cursor.execute('SELECT * FROM "post"')
                result = cursor.fetchall()

                
                posts = []
                i = 0
                for row in result:
                    posts.append({
                        'id': row[0],
                        'category': row[1],
                        'content': row[2],
                        'image': row[3],
                        'user_id': row[4]
                    })
                    lastName = cursor.execute('SELECT lastname FROM "user" WHERE id = %s', (row[4],))
                    lastName = cursor.fetchone()
                    firstName = cursor.execute('SELECT firstname FROM "user" WHERE id = %s', (row[4],))
                    firstName = cursor.fetchone()
                    posts[i]['lastName'] = lastName[0]
                    posts[i]['firstName'] = firstName[0]
                    i+=1

                result = posts
                # print(result[0])
            except ValueError:
                return ValueError

            cursor.close()
            conn.close()

        return jsonify(result)

    def getPostByID(postID):
        if request.method == 'GET':
            conn = db_connection()
            cursor = conn.cursor()

            try:
                result = cursor.execute('SELECT * FROM "post" WHERE id = %s', (postID,))
                result = cursor.fetchall()
                
                if len(result) == 0:
                    return jsonify('Post not found')
                
                post = []
                for row in result:
                    post.append({
                        'id': row[0],
                        'category': row[1],
                        'content': row[2],
                        'image': row[3],
                        'user_id': row[4]
                    })

                result = post
            except ValueError:
                return ValueError

            cursor.close()
            conn.close()

        return jsonify(result[0])
    
    def deletePost(postID):
        conn = db_connection()
        cursor = conn.cursor()

        try:
            QueryParamFunc('DELETE FROM "vote" WHERE post_id = %s', (postID,))
            QueryParamFunc('DELETE FROM "comment" WHERE post_id = %s', (postID,))
            QueryParamFunc('DELETE FROM "post" WHERE id = %s', (postID,))
            result = 'Successfully delete post'
        except ValueError:
            return ValueError

        cursor.close()
        conn.close()

        return jsonify(postID)
    

    def updatePost(postID):
        if request.method == 'PUT':
            conn = db_connection()
            cursor = conn.cursor()
            
            data_old = request.json
            data = data_old['input']
            id = postID
            category = data['category']
            content = data['content']
            image = data['image']
            user_id = data['user_id']
    
            try:
                QueryParamFunc('UPDATE "post" SET category=%s, content=%s, image=%s, user_id=%s WHERE id=%s',(category, content, image, user_id, id))
                result = cursor.execute('SELECT * FROM "post" WHERE id = %s', (id,))
                result = cursor.fetchall()
                lastName = cursor.execute('SELECT lastname FROM "user" WHERE id = %s', (user_id,))
                lastName = cursor.fetchone()
                firstName = cursor.execute('SELECT firstname FROM "user" WHERE id = %s', (user_id,))
                firstName = cursor.fetchone()
                print(str(lastName))
                posts = []
                for row in result:
                    posts.append({
                        'id': row[0],
                        'category': row[1],
                        'content': row[2],
                        'image': row[3],
                        'user_id': row[4],
                    })
                posts[0]['lastName'] = lastName[0]
                posts[0]['firstName'] = firstName[0]
                # posts.append(userData[4])
                result = posts
            except ValueError:
                return ValueError

            cursor.close()
            conn.close()
        return jsonify(result[0])