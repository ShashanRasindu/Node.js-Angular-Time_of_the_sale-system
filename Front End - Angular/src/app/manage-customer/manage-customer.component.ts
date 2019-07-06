import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Customers} from '../dto/customers';
import {ManageService} from '../services/manage.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent implements OnInit {

  customers: Array<Customers> = [];
  showTableFoot: boolean;
  currentCustomer = new Customers('', '', '');
  selectedCustomer = null;
  hoverCustomer = null;
  buttonText = 'Save';
  loadingStatus=true;
  @ViewChild('txtId', {static: false}) txtId: ElementRef;
  @ViewChild('frmCustomer', {static: false}) frmCustomer: NgForm;
  page = 0;
  readonly pageSize = 10;
  ItemCount = 0;
  constructor(private manageService: ManageService) {
  }

  ngOnInit() {
    // this.manageService.getAllCustomer().subscribe(resp => {
    //   this.customers = resp;
    //   this.showTableFoot = true;
    // }, error1 => {
    //   console.log(error1);
    //   this.showTableFoot = true;
    // });
  }

  onClickRow(customer: Customers): void {
    this.currentCustomer = Object.assign({}, customer);
    this.selectedCustomer = customer;
    this.buttonText = 'Update';
  }


  deleteCustomer(customer: Customers): void {
    if (confirm('Are you sure whether you want to delete this customer?')) {
      this.manageService.deleteCustomer(customer.id).subscribe(resp => {
          alert('Customer deleted successfully');
          const index = this.customers.indexOf(customer);
          this.customers.splice(index, 1);
          // medin ain karanna one nam splice danna one, agin ain karanna one nam pop
          this.currentCustomer = new Customers('', '', '');
          this.clearForm();
        },
        error1 => {
          alert('Failed to delete the customer for some reason, please check the console...!');
          console.log(error1);
        });
    }
  }

  clearForm(): void {
    this.currentCustomer = new Customers('', '', '');
    this.txtId.nativeElement.focus();
    this.buttonText = 'Save';
    this.frmCustomer.resetForm();
  }

  saveCustomer(): void {
    if (this.frmCustomer.valid) {
      if (this.buttonText === 'Save') {
        this.manageService.saveCustomer(this.currentCustomer).subscribe(resp => {
          alert('Customer has been saved successfully');
          this.customers.push(this.currentCustomer);
          this.clearForm();
        }, error1 => {
          alert('Failed to save the customer');
          console.log(error1);
        });
      } else {
        this.manageService.updateCustomer(this.currentCustomer).subscribe(resp =>
        {
          alert('Customer has been Update successfully');
          Object.assign(this.selectedCustomer, this.currentCustomer);
          this.clearForm();
        },
          error1 => {
          alert('Faild to update Customer');
          console.log(error1);

          });
      }
    } else {
      alert('Please enter correct date before submitting');
    }
  }
  onPageChange($event: number) {
    this.customers = [];
    this.loadingStatus = true;
    this.manageService.getCustomersPage($event - 1, this.pageSize)
      .subscribe(page => {

        this.ItemCount = page.page.totalElements;
        this.showTableFoot = false;
        setTimeout(() => {
          this.loadingStatus = false;
          this.customers = page.content;
        }, 2000);
      }, error1 => {
        this.loadingStatus = false;
        this.showTableFoot = true;
        console.log(error1);
      });
  }
}
