from src.database.db_mysql import get_connection
from src.models.personModel import Person

class PersonService():

    @classmethod
    def get_person(cls):
        try:
            connection=get_connection()
           
            with connection.cursor() as cursor:
                cursor.execute('SELECT * FROM person')
                result= cursor.fetchall()
                list_person=[Person.convert_from_BD(row) for row in result]
                print(result)
                connection.close()
                return list_person
               
        except Exception as ex: 
            print(ex)

    @classmethod
    def post_person(cls, person: Person):
        try:
            connection=get_connection()
            print(connection)
        
            with connection.cursor() as cursor:
                id_person = person.id_person
                name = person.name
                last_name = person.last_name
                dni = person.dni
                birth_date = person.birth_date
                email = person.email
                telephone = person.telephone
                id_user_fk = person. id_user_fk

                cursor.execute("CAll sp_InsertPerson (%s, %s, %s, %s, %s, %s, %s, %s)", (id_person, name, last_name, dni, birth_date, email, telephone, id_user_fk ))
                connection.commit()
                connection.close()
                return 'Persona agregado correctamente'
               
        except Exception as ex: 
            print(ex)

    @classmethod
    def delete_person(cls, id_person):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("DELETE FROM person WHERE id_person = %s;", (id_person))
                connection.commit()
            connection.close()
            return 'Persona eliminado correctamente'
        except Exception as ex:
            print(ex)

    @classmethod
    def put_person(cls, id_person, person: Person):
        try:
             connection = get_connection()
             with connection.cursor() as cursor:
              name = person.name
              last_name = person.last_name
              dni = person.dni
              birth_date = person.birth_date
              email = person.email
              telephone = person.telephone
              id_user_fk = person.id_user_fk
              cursor.execute("UPDATE person SET name = %s, last_name = %s, dni = %s, birth_date = %s, email = %s, telephone = %s, id_user_fk = %s WHERE id_person = %s;", (name, last_name, dni, birth_date, email, telephone, id_user_fk, id_person))
              connection.commit()
             connection.close()
             return 'Persona actualizado correctamente'
        except Exception as ex:
               print(ex)
     
