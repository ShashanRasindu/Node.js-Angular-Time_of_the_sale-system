import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Customers} from "../dto/customers";
import {ManageService} from "../services/manage.service";
import {ManageitemService} from "../services/manageitem.service";
import {Items} from "../dto/items";
import {OrderService} from "../services/order.service";
import {DetaisRow} from "../dto/detais-row";
import {Order} from "../dto/order";
import {OrderDetail} from "../dto/order-detail";

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {
  customers: Array<Customers> = [];
  items: Array<Items> = [];
  selectedCustomer = new Customers('', '', '');
  selectedItem = new Items('', '', null, null);

  dy= parseInt(new Date().getMonth().toString())+ 1;
  date = new Date().getFullYear() + '-' +this.dy + "-" + new Date().getDate();
  OID = null;
  @ViewChild('qut', {static: false}) itemquts: ElementRef;
  @ViewChild('name', {static: false}) Cname: ElementRef;
  @ViewChild('cmdItem', {static: false}) cmdItem: ElementRef;
  itemDetais: Array<DetaisRow> = [];
  hoverCustomer = null;
  qty = null;
  total = 0;
  Order = new Order(null, '', '', null);
  ODetais=new OrderDetail(null,'',null,null);
  OrderD : Array<OrderDetail>=[];

  constructor(private manageService: ManageService, private manageitem: ManageitemService, private manageOrder: OrderService) {
  }

  ngOnInit() {
    this.manageService.getAllCustomer().subscribe(resp => {
      this.customers = resp;
    }, error1 => {
      console.log(error1);
    });

    this.manageitem.getAllItem().subscribe(value => {
        this.items = value;
      }, error2 => {
        console.log(error2);
      }
    );

    this.manageOrder.getOrderID().subscribe(ids => {
        this.OID = ids;
      }, error3 => {
        console.log(error3);
      }
    );
  }

  getkey($event: KeyboardEvent) {
    console.log($event);
    if ($event.code.includes('Enter')) {

      if (this.qty <= 0 || this.qty > this.selectedItem.qtyOnHand) {

        alert("Invalid qty. Please enter valid Qty");
        this.itemquts.nativeElement.focus();
        return;
      }
      for (let i = 0; i < this.itemDetais.length; i++) {
        if (this.selectedItem.code == this.itemDetais[i].code) {
          this.itemDetais[i].qut += this.qty;
          return;
        }
        break;
      }
      this.itemDetais.push({
        code: this.selectedItem.code,
        description: this.selectedItem.description,
        qut: this.qty,
        Uprice: this.selectedItem.unitPrice,
        price: this.selectedItem.unitPrice * this.qty
      });


      for (let i = 0; i < this.itemDetais.length; i++) {
        this.total = this.total + this.itemDetais[i].price;

      }


      console.log(this.qty);
      this.selectedItem.qtyOnHand -= this.qty;
      // for (let i=0;i<this.items.length;i++){
      //   if (this.items[i].code == this.selectedItem.code)
      //   {
      //     this.items[i].qtyOnHand=this.items[i].qtyOnHand-this.qty;
      //   }
      //   break;
      // }


      this.cmdItem.nativeElement.focus();
      this.qty = null;

    }
  }

  deleteItems(item: DetaisRow): void {
    const index = this.itemDetais.indexOf(item);
    this.total = this.total - this.itemDetais[index].price;


    this.selectedItem.qtyOnHand = this.selectedItem.qtyOnHand + this.itemDetais[index].qut;

    this.itemDetais.splice(index, 1);


  }

  plaseOrde() {
    if (this.selectedCustomer.name == null) {
      this.Cname.nativeElement.focus();
      return;
    }
    if (this.itemDetais.length == null) {
      this.itemquts.nativeElement.focus();
      return;
    }
    for (let i = 0; i < this.itemDetais.length; i++) {
      this.OrderD.push({orderId: this.OID,itemCode: this.itemDetais[i].code,qty :this.itemDetais[i].qut,itemTotalPrice:this.itemDetais[i].price});

    }
    this.Order.orderId=this.OID;
    this.Order.orderDate=this.date;
    this.Order.customerId=this.selectedCustomer.id;
    this.Order.orderDetails=this.OrderD;
    this.manageOrder.SaveOrders(this.Order).subscribe(value => {
      alert('Order has been saved successfully');
      this.clearAll();
    },error1 => {
      alert('Failed to save the order');
      console.log(error1);
    });
  }
  clearAll():void{
    this.selectedCustomer = new Customers('', '', '');
    this.selectedItem = new Items('', '', null, null);
    this.itemDetais=[];

   this.total = 0;
    this.Order = new Order(null, '', '', null);
    this.ODetais=new OrderDetail(null,'',null,null);
    this.OrderD =[];
    this.ngOnInit();
    this.Cname.nativeElement.focus();

  }
}
