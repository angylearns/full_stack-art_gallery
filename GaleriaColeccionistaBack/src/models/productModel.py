class Product():
    def __init__(self, id_product, url, title,price, material, dimensions, in_stock, style, id_person_fk) -> None:
       self.id_product=id_product
       self.url=url
       self.title=title
       self.price=price
       self.material=material
       self.dimensions=dimensions
       self.in_stock=in_stock
       self.style=style
       self.id_person_fk=id_person_fk

    @classmethod
    def convert_from_BD(cls, row):
        return cls(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8])         