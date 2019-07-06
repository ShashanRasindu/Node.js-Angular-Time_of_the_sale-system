import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ManageitemService} from '../services/manageitem.service';
import {Items} from '../dto/items';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.scss']
})
export class ManageItemsComponent implements OnInit {

  items: Array<Items> = [];
  showTableFoot: boolean;
  currentItem = new Items('', '', null, null);
  selectedItem = null;
  hoverItem = null;
  buttonText = 'Save';
  loadingStatus=true;
  @ViewChild('txtcode', {static: false}) txtcode: ElementRef;
  @ViewChild('frmItem', {static: false}) frmItem: NgForm;
  page = 0;
  readonly pageSize = 10;
  itemsCount = 0;
  constructor(private manageItemService: ManageitemService) {
  }

  ngOnInit() {
    // this.manageItemService.getAllItem().subscribe(resp => {
    //   this.items = resp;
    //   this.showTableFoot = true;
    // }, error1 => {
    //   console.log(error1);
    //   this.showTableFoot = true;
    // });
  }
  onPageChange($event: number) {
    this.items = [];
    this.loadingStatus = true;
    this.manageItemService.getItemPage($event - 1, this.pageSize).subscribe(page => {

        this.itemsCount = page.page.totalElements;
        console.log(this.itemsCount);
        this.showTableFoot = false;
        setTimeout(() => {
          this.loadingStatus = false;
          this.items = page.content;
        }, 2000);
      }, error1 => {
        this.loadingStatus = false;
        this.showTableFoot = true;
        console.log(error1);
      });
  }

  onClickRow(items: Items): void {
    this.currentItem = Object.assign({},items);
    this.selectedItem=items;
    this.buttonText = 'Update';
  }

  deleteItems(item: Items): void {
    if (confirm('Are you sure whether you want to delete this Item?')) {
      this.manageItemService.deleteItem(item.code).subscribe(resp => {
          alert('Item deleted successfully');
          const index = this.items.indexOf(item);
          this.items.splice(index, 1);
          this.currentItem = new Items('', '', null, null);
          this.clearForm();
        },
        error1 => {
          alert('Failed to delete the Item for some reason, please check the console...!');
          console.log(error1);
        });
    }
  }

  clearForm(): void {
    this.currentItem = new Items('', '', null, null);
    this.txtcode.nativeElement.focus();
    this.buttonText = 'Save';
    this.frmItem.resetForm();
  }

  saveItems(): void {
    if (this.frmItem.valid) {
      if (this.buttonText === 'Save') {
        this.manageItemService.saveItem(this.currentItem).subscribe(resp => {
          alert('Item has been saved successfully');
          this.items.push(this.currentItem);
          this.clearForm();
        }, error1 => {
          alert('Failed to save the Item');
          console.log(error1);
        });
      } else {
        this.manageItemService.updateCustomer(this.currentItem).subscribe(resp =>
          {
            alert('Item has been Update successfully');
            Object.assign(this.selectedItem, this.currentItem);
            this.clearForm();
          },
          error1 => {
            alert('Item to update Item');
            console.log(error1);

          });
      }
    } else {
      alert('Please enter correct date before submitting');
    }
  }

}
