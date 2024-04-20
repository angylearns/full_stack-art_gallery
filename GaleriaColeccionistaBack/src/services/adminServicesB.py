from src.database.db_mysql import get_connection
from flask import jsonify  
from src.models.userModel import User
from src.models.personModel import Person
from datetime import datetime

class adminServicesB():

    @classmethod
    def get_user(cls):
        try:
            connection = get_connection()
           
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM user')
                result = cursor.fetchall()
                connection.close()
                print("resultadoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo")
                print(result)
                print(jsonify(result))
                print("cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc")
                # Devolver los resultados en formato JSON
                return result
                # return jsonify(result)
               
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
                
                print(result)
                print("TODAS LAS PERSONAS Y USUARIOS")
                print(jsonify(result))
                
                # Devolver los resultados en formato JSON
                return result
                # return jsonify(result)
               
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
                password = user.password
                user_type = user.user_type

                cursor.execute("INSERT INTO user (id_user, user_name, password, user_type )"+
                           "VALUES ('{0}','{1}','{2}','{3}')".format(id_user,user_name,password,user_type))
                connection.commit()
                print("cucucucucucucucucucucucuc")


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
                name =person.name
                last_name = person.last_name
                dni = person.dni
                birth_date = person.birth_date
                email = person.email
                telephone = person.telephone
                id_user_fk = person.id_user_fk

                cursor.execute("INSERT INTO person (id_person, name, last_name, dni, birth_date, email, telephone, id_user_fk)"+
                           "VALUES ('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}')".format(id_person, name, last_name, dni, birth_date, email, telephone, id_user_fk))
                connection.commit()
            print("cucucucuwowowowowowowowowowowowwowowowowowowowowowowowowowowowwocucucucucucucucuc")
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
                #se acaba de crear un usurio y necesitamos saber con que id
                cursor.execute("SELECT MAX(id_user) FROM user")
                result = cursor.fetchone()
                print("ultimo usuario id ............................................................................")
           
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
                print("este es el id que llega y debe estar actualizado")
                print(id_person)

                name =person.name
                print("este es el nombre que llega y debe estar actualizado")
                print(name)
                last_name = person.last_name
                dni = person.dni
                # Cadena de fecha
                fecha_string = person.birth_date
                # Convertir la cadena a objeto de fecha
                fecha_objeto = datetime.strptime(fecha_string, '%a, %d %b %Y %H:%M:%S %Z')
                # Formatear la fecha en YYYY-MM-DD
                fecha_formateada = fecha_objeto.strftime('%Y-%m-%d')
                birth_date = fecha_formateada
                email = person.email
                telephone = person.telephone
                id_user_fk = person.id_user_fk
                
                cursor.execute("UPDATE person SET name='{1}', last_name='{2}', dni ='{3}',birth_date='{4}',email='{5}',telephone='{6}' WHERE person.id_person ='{0}'".format(id_person,name,last_name,dni,birth_date,email,telephone))                           
                connection.commit()

                
                print("persona actualizada ............................................................................")
                connection.close()
                return 0
        except Exception as ex:
            print("error update person 7777777777777777777777777777777777777")
            print(person.birth_date)
            print(ex)
    
    @classmethod
    def patchUser(cls,user:User):
        print("estamos en patch para el usuario")
        try:
            connection = get_connection()
            print(connection)
            with connection.cursor() as cursor:
                id_user = user.id_user
                user_name = user.user_name
                password = user.password
                user_type = user.user_type
                print("actualizar usuario:mmmmmmmmmmmmmmmmmmm")
                print(id_user)
                cursor.execute("UPDATE user SET user_name='{1}', password='{2}', user_type ='{3}' WHERE id_user = {0}".format(id_user,user_name,password,user_type))                           
                connection.commit()

                
                print("usuario actualizado ............................................................................")
                connection.close()
                return 0
        except Exception as ex:
            print(ex)

    @classmethod
    def deleteUser(cls,user:User):
        try:
            connection = get_connection()
            print(connection)
            with connection.cursor() as cursor:
                id_user = user.id_user
                
                
                cursor.execute("DELETE FROM user WHERE id_user='{0}'".format(id_user))                           
                connection.commit()

                print(id_user)
                print("usuario eliminado ............................................................................")
                connection.close()
                return 0
        except Exception as ex:
            print("errorrrrr persona eliminada no funciona 1111111111111111111")
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

                print(id_person)
                print("persona eliminada ............................................................................")
                connection.close()
                return 0
        except Exception as ex:
            print("errorrrrr persona eliminada no funciona")
            print(ex)