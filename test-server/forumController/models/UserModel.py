# # from app import db

# class UserModel():
#     _tablename_ = "user"
#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(1000))
#     password = db.Column(db.String(6000))

#     def json(self):
#         return {'id': self.id,'email': self.email, 'password': self.password}

#     db.create_all()
