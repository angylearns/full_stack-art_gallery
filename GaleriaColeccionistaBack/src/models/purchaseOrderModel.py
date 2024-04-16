class PurchaseOrder():
    def __init__(self, id_purchase_order,date, status, id_user_fk, id_product_fk) -> None:
       self.id_purchase_order=id_purchase_order
       self.date=date
       self.status=status
       self.id_user_fk=id_user_fk
       self.id_product_fk=id_product_fk
       