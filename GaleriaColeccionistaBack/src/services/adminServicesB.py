from src.database.db_mysql import get_connection
from flask import jsonify  
from src.models.userModel import User
from src.models.personModel import Person
from datetime import datetime
from werkzeug.security import generate_password_hash

class adminServicesB():

    @classmethod
    def get_user(cls):
        try:
            connection = get_connection()
           
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM user')
                result = cursor.fetchall()
                connection.close()
                return result
                   
        except Exception as ex: 
            print(ex)


    @classmethod
    def get_persons(cls):
        try:
            connection = get_connection()
           
            with connection.cursor() as cursor:
                cursor.execute('SELECT person.*, user.* FROM person JOIN user ON person.id_user_fk = user.id_user')
                result = cursor.fetchall()
                connection.close()
                return result
                              
        except Exception as ex: 
            print(ex)



    @classmethod
    def post_PersonUser(cls, user:User):
        try:
            connection = get_connection()
            print(connection)
            with connection.cursor() as cursor:
                id_user = user.id_user
                user_name = user.user_name
                user_type = user.user_type
                passwordunic = user.password
                password = generate_password_hash (passwordunic,  'pbkdf2:sha256', 30)
                
                cursor.execute("INSERT INTO user (id_user, user_name, password, user_type )"+
                           "VALUES ('{0}','{1}','{2}','{3}')".format(id_user,user_name,password,user_type))
                connection.commit()
        
            connection.close()
            return 0 
        except Exception as ex:
            print(ex)

    @classmethod
    def post_Person(cls, person:Person):
        try:

            connection = get_connection()
            print(connection)
            with connection.cursor() as cursor:
                id_person = person.id_person
                first_name =person.first_name
                last_name = person.last_name
                dni = person.dni
                birth_date = person.birth_date
                email = person.email
                telephone = person.telephone
                id_user_fk = person.id_user_fk

                cursor.execute("INSERT INTO person (id_person, first_name, last_name, dni, birth_date, email, telephone, id_user_fk)"+
                           "VALUES ('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}')".format(id_person, first_name, last_name, dni, birth_date, email, telephone, id_user_fk))
                connection.commit()
            
            connection.close()
            return 0 
        except Exception as ex:
            print(ex)

    @classmethod
    def lastUserId(cls):
        try:
            connection = get_connection()
            print(connection)
            with connection.cursor() as cursor:
                
                cursor.execute("SELECT MAX(id_user) FROM user")
                result = cursor.fetchone()
                           
                return result[0] 
        except Exception as ex:
            print(ex)

    @classmethod
    def patchPerson(cls,person:Person):
        try:
            connection = get_connection()
            print(connection)
            with connection.cursor() as cursor:
                
                id_person = person.id_person
                first_name =person.first_name
                last_name = person.last_name
                dni = person.dni
                fecha_string = person.birth_date
                fecha_objeto = datetime.strptime(fecha_string, '%a, %d %b %Y %H:%M:%S %Z')
                fecha_formateada = fecha_objeto.strftime('%Y-%m-%d')
                birth_date = fecha_formateada
                email = person.email
                telephone = person.telephone
                id_user_fk = person.id_user_fk
                
                cursor.execute("UPDATE person SET first_name='{1}', last_name='{2}', dni ='{3}',birth_date='{4}',email='{5}',telephone='{6}' WHERE person.id_person ='{0}'".format(id_person,first_name,last_name,dni,birth_date,email,telephone))                           
                connection.commit()

                connection.close()
                return 0
        except Exception as ex:
            
            print(ex)
    
    @classmethod
    def patchUser(cls,user:User):

        try:
            connection = get_connection()
            
            with connection.cursor() as cursor:
                id_user = user.id_user
                user_name = user.user_name
                password = user.password
                user_type = user.user_type
                
                cursor.execute("UPDATE user SET user_name='{1}', password='{2}', user_type ='{3}' WHERE id_user = {0}".format(id_user,user_name,password,user_type))                           
                connection.commit()

                connection.close()
                return 0
        except Exception as ex:
            print(ex)

    @classmethod
    def deleteUser(cls,user:User):
        try:
            connection = get_connection()
            
            with connection.cursor() as cursor:
                id_user = user.id_user
                
                cursor.execute("DELETE FROM user WHERE id_user='{0}'".format(id_user))                           
                connection.commit()

                connection.close()
                return 0
        except Exception as ex:
            print(ex)

    @classmethod
    def deletePerson(cls,person:Person):
        try:
            connection = get_connection()
            print(connection)
            with connection.cursor() as cursor:
                id_person = person.id_person
                
                cursor.execute("DELETE FROM person WHERE id_person='{0}'".format(id_person))                           
                connection.commit()

                connection.close()
                return 0
        except Exception as ex:
            print(ex)