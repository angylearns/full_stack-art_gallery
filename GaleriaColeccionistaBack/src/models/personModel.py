class Person():
    def __init__(self, id_person,first_name,last_name, dni, birth_date, email, telephone, id_user_fk) -> None:
       self.id_person=id_person
       self.first_name=first_name
       self.last_name=last_name
       self.dni=dni
       self.birth_date=birth_date
       self.email=email
       self.telephone=telephone
       self.id_user_fk=id_user_fk

    @classmethod
    def convert_from_BD(cls, row):
        return cls(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7])       
       