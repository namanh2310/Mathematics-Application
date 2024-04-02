import json
import uuid
from flask import request, jsonify
from forumController.database.connection import db_connection
from forumController.utilities.query import QueryParamFunc 

class VoteController:
    def addVote():
        if request.method == 'POST':
            conn = db_connection()
            cursor = conn.cursor()
            table_name = "vote"
            try:
                checkExistTable = QueryParamFunc('SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = %s)', (table_name,))
                if not checkExistTable[0]:
                    QueryParamFunc('CREATE TABLE "vote" (id UUID PRIMARY KEY, cmt_id UUID REFERENCES "comment" (id), post_id UUID REFERENCES "post" (id), user_id UUID REFERENCES "user" (id))', ())
            except ValueError:
                return ValueError
            
            data_old = request.json
            data = data_old['payload']
            id = str(uuid.uuid4())
            user_id = data['user_id']
            post_id = data['post_id']
            cmt_id = data['cmt_id']
            voteCount = cursor.execute('SELECT upvote FROM "comment" WHERE id = %s', (cmt_id,))
            voteCount = cursor.fetchone()
            votes = []

            try:
                checkVoteExist = QueryParamFunc('SELECT EXISTS (SELECT 1 FROM "vote" WHERE cmt_id = %s AND user_id = %s)', (cmt_id, user_id,))
                if not checkVoteExist[0]:
                    QueryParamFunc('INSERT INTO "vote" (id, cmt_id, post_id, user_id) VALUES (%s, %s, %s, %s)', (id, cmt_id, post_id, user_id))
                    result = cursor.execute('SELECT * FROM "vote" WHERE id = %s', (id,))
                    result = cursor.fetchall()
                    voteCount = int(voteCount[0] + 1)
                    QueryParamFunc('UPDATE "comment" SET upvote = %s  WHERE id = %s',(voteCount, cmt_id))
                    for row in result:
                        votes.append({
                            'id': row[0],
                            'cmt_id': row[1],
                            'post_id': row[2],
                            'user_id': row[3],
                            
                        })
                    votes[0]['upvote'] = voteCount
                    
                else:
                    existID = cursor.execute('SELECT id FROM "vote" WHERE cmt_id = %s AND user_id = %s', (cmt_id, user_id))
                    existID = cursor.fetchone()
                    print(existID[0])
                    QueryParamFunc('DELETE FROM "vote" WHERE id = %s', (existID[0],))
                    result = cursor.execute('SELECT * FROM "vote" WHERE id = %s', (id,))
                    result = cursor.fetchall()
                    voteCount = int(voteCount[0] - 1)
                    print(voteCount)
                    QueryParamFunc('UPDATE "comment" SET upvote = %s  WHERE id = %s',(voteCount, cmt_id))
                    votes.append({
                            'id':existID[0], 
                            'cmt_id': cmt_id,
                            'post_id': post_id,
                            'user_id': user_id,
                            'upvote': voteCount,
                            'voteList': []
                    })
                result = votes
                print(result)
            except ValueError:
                return ValueError

            cursor.close()
            conn.close()
        return jsonify(result[0])
    
    def getAllVotesByUserID(postID):
        if request.method == 'GET':
            conn = db_connection()
            cursor = conn.cursor()
    
            try:
                

                result = cursor.execute('SELECT * FROM "vote" WHERE post_id = %s', (postID,))
                result = cursor.fetchall()
                if len(result) == 0:
                    return jsonify(result)
                
                votes = []
                for row in result:
                    votes.append(row[3])
                # print(result)
                result = votes
            except ValueError:
                return ValueError

            cursor.close()
            conn.close()
        return jsonify(result)