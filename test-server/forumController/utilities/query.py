from forumController.database.connection import db_connection

def QueryParamFunc(query, params):
    try:
        conn = db_connection()
        cursor = conn.cursor()
        cursor.execute(query, params)
        conn.commit()
        data = cursor.fetchone()
        cursor.close()
        conn.close()
        return data
    except Exception as e:
        return e