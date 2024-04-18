from src.database.db_mysql import get_connection
from src.models.userModel import User
from werkzeug.security import check_password_hash

class AuthService():

    @classmethod
    def login_user(cls, user:User):
        try:
            connection=get_connection()

            authenticated_user= None

            with connection.cursor() as cursor:
                cursor.execute('CALL sp_login_user(%s)', user.user_name )
                row=cursor.fetchone()
                if (row != None and check_password_hash(row[2], user.password )):
                    authenticated_user= row
                else:
                    authenticated_user= None 

            connection.close()

            return authenticated_user
                
               
        except Exception as ex: 
            print(ex)