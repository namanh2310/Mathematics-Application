import uuid
from flask import request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random
from werkzeug.security import generate_password_hash, check_password_hash
from forumController.database.connection import db_connection
from forumController.utilities.query import QueryParamFunc

class AuthController:
    def Register():
        if request.method == 'POST':
            conn = db_connection()
            cursor = conn.cursor()
            table_name = "user"
            try:
                checkExistTable = QueryParamFunc('SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = %s)', (table_name,))
                if not checkExistTable[0]:
                    QueryParamFunc('CREATE TABLE "user" (id UUID PRIMARY KEY, email VARCHAR(255) UNIQUE, password VARCHAR(255), firstname VARCHAR(255)), lastname VARCHAR(255), role VARCHAR(255)', ())
            except ValueError:
                return ValueError
            
            data_old = request.json
            id = str(uuid.uuid4())
            data = data_old['payload']
            email = data['emailRegister']
            password = data['passwordRegister']
            firstname = data['firstName']
            lastname = data['lastName']
            role = data['role']


            print(data)

            #check exist email
            checkExistEmail = QueryParamFunc('SELECT EXISTS (SELECT 1 FROM "user" WHERE email = %s)', (email,))
            print(checkExistEmail)
            if checkExistEmail[0]:
                return jsonify('Email already exists')

            #check password
            if len(password) < 6:
                return jsonify('Password must be at least 6 characters')
            
            hashed_password = generate_password_hash(password)
            try:
                QueryParamFunc('INSERT INTO "user" (id, email, password, firstname, lastname, role) VALUES (%s, %s, %s, %s, %s, %s)', (id, email, hashed_password, firstname, lastname, role))
            except ValueError:
                return ValueError

            cursor.close()
            conn.close()
        return jsonify({'register': True})
    
    def Login():
        if request.method == 'POST':
            data_old = request.json
            data = data_old['payload']
            email = data['emailSignIn']
            password = data['passwordSignIn']

            #check exist email
            checkExistEmail = QueryParamFunc('SELECT EXISTS (SELECT 1 FROM "user" WHERE email = %s)', (email,))
            if not checkExistEmail[0]:
                # return jsonify('Email not exists')
                return jsonify({'status': False})

            #check password
            checkPasswordHased = QueryParamFunc('SELECT password FROM "user" WHERE email = %s', (email,))
            if not check_password_hash(checkPasswordHased[0], password):
                # return jsonify('Password incorrect')
                return jsonify({'status': False})
            
            result = QueryParamFunc('SELECT * FROM "user" WHERE email = %s', (email,))
            obj = {
                'id': result[0],
                'email': result[1],
                'status': True,
                'lastName': result[3],
                'firstName': result[4],
                'role': result[5]
                # 'message': 'Successfully login'
            }
        return jsonify(obj)
    
    def VerifyCode():
        if request.method == 'POST':
            data = request.json 
            email = data['emailRegister']
            password = data['passwordRegister']
            
            #check exist email
            checkExistEmail = QueryParamFunc('SELECT EXISTS (SELECT 1 FROM "user" WHERE email = %s)', (email,))
            print(checkExistEmail)
            if checkExistEmail[0]:
                return jsonify({"message": "Email has already existed!"})

            #check password
            if len(password) < 6:
                return jsonify({"message": "'Password must be at least 6 characters'"})
            
            server = smtplib.SMTP('smtp.gmail.com', 587)

            server.starttls()

            password = 'vwst dufz mltl scos'

            server.login("aima.app.aiotlabvn@gmail.com", password)

            otp = ''.join([str(random.randint(0, 9)) for i in range(4)])

            html_content = f"""
            <html>
            <head>
            <base target="_top">
            </head>
            <body>
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:80%;padding:20px 0">
            <div style="border-bottom:5px solid #eee">
            <a href="" style="font-size:30px;color: #8252E7;text-decoration:none;font-weight:600">AiMA</a>
            </div>
            <p style="font-size:15px">Hello user,</p>
            <p>Thank you for choosing AiMA. Use this OTP to complete your Sign Up procedures and verify your account on AiMA.</p>
            <p>Remember, Never share this OTP with anyone.</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"><?= otp ?></h2>
            <p style="font-size:15px;">Regards,<br />AIoT Lab VN Team</p>
            <hr style="border:none;border-top:5px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>AIoT Lab VN Inc</p>
            <p>Quarter 6, Linh Trung Ward, Thu Duc District, HCMC</p>
            </div>
            </div>
            </div>
            </body>
            </html>
            """

            msg = MIMEMultipart()
            msg['Subject'] = f'Verification Code: {otp} '
            msg['From'] = 'aima.app.aiotlabvn@gmail.com'
            msg['To'] = email

            # text = f"Hello, Your OTP is {otp}."
            # msg.attach(MIMEText(text, 'plain'))
            msg.attach(MIMEText(html_content, 'html'))

            # Gửi thư
            server.sendmail('aima.app.aiotlabvn@gmail.com', email, msg.as_string())

            # Đóng kết nối SMTP
            server.quit()
        return jsonify(otp)
    
    def VerifyCodeReset():
        if request.method == 'POST':
            data = request.json 
            email = data['email']
            
            #check exist email
            checkExistEmail = QueryParamFunc('SELECT EXISTS (SELECT 1 FROM "user" WHERE email = %s)', (email,))
            print(checkExistEmail)
            if not checkExistEmail[0]:
                return jsonify({"message": "Email has not already existed!"})

            server = smtplib.SMTP('smtp.gmail.com', 587)

            server.starttls()

            password = 'vwst dufz mltl scos'

            server.login("aima.app.aiotlabvn@gmail.com", password)

            otp = ''.join([str(random.randint(0, 9)) for i in range(4)])

            html_content = f"""
            <html>
            <head>
            <base target="_top">
            </head>
            <body>
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:80%;padding:20px 0">
            <div style="border-bottom:5px solid #eee">
            <a href="" style="font-size:30px;color: #8252E7;text-decoration:none;font-weight:600">AiMA</a>
            </div>
            <p style="font-size:15px">Hello user,</p>
            <p>Please input this OTP code into the screen for reseting your password!</p>
            <p>Remember, Never share this OTP with anyone.</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"><?= otp ?></h2>
            <p style="font-size:15px;">Regards,<br />AIoT Lab VN Team</p>
            <hr style="border:none;border-top:5px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>AIoT Lab VN Inc</p>
            <p>Quarter 6, Linh Trung Ward, Thu Duc District, HCMC</p>
            </div>
            </div>
            </div>
            </body>
            </html>
            """

            msg = MIMEMultipart()
            msg['Subject'] = f'Verification Code: {otp} '
            msg['From'] = 'aima.app.aiotlabvn@gmail.com'
            msg['To'] = email

            # text = f"Hello, Your OTP is {otp}."
            # msg.attach(MIMEText(text, 'plain'))
            msg.attach(MIMEText(html_content, 'html'))

            # Gửi thư
            server.sendmail('aima.app.aiotlabvn@gmail.com', email, msg.as_string())

            # Đóng kết nối SMTP
            server.quit()
        return jsonify(otp)

    def ChangePW():
        if request.method == 'POST':
            conn = db_connection()
            cursor = conn.cursor()
            data = request.json 
            email = data['email']
            password = data['newPassword']
            if len(password) < 6:
                return jsonify('Password must be at least 6 characters')
            
            hashed_password = generate_password_hash(password)

            print(email)
            print(password)
            # old_password = QueryParamFunc('SELECT password FROM "user" WHERE email = %s', (email,))
            QueryParamFunc('UPDATE "user" SET password=%s WHERE email=%s',(hashed_password, email))
            result = cursor.execute('SELECT * FROM "user" WHERE email = %s', (email,))
            result = cursor.fetchall()
            return jsonify("Success")
    
    
    