class Product():
    def __init__(self, id_product,title,price, material, dimensions, in_stock, style, id_purchase_order_fk) -> None:
       self.id_product=id_product
       self.title=title
       self.price=price
       self.material=material
       self.dimensions=dimensions
       self.in_stock=in_stock
       self.style=style
       self.id_purchase_oreder_fk=id_purchase_order_fk